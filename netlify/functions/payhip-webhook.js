// Payhip → your site. Payhip calls this address after each payment, refund or cancellation.
// In Payhip: Settings → Developer → Webhooks, add:  https://<your-site>.netlify.app/.netlify/functions/payhip-webhook
// Netlify environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PAYHIP_API_KEY
const crypto = require("crypto");

const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PAYHIP_KEY = process.env.PAYHIP_API_KEY || "";
const svc = { apikey: KEY, Authorization: "Bearer " + KEY, "Content-Type": "application/json" };
const ok = (msg) => ({ statusCode: 200, body: msg || "ok" });

async function sb(path, opts = {}) {
  const res = await fetch(URL_ + path, { ...opts, headers: { ...svc, ...(opts.headers || {}) } });
  const t = await res.text(); let d = null; try { d = t ? JSON.parse(t) : null; } catch (e) { d = t; }
  if (!res.ok) throw new Error((d && (d.message || d.msg)) || res.statusText);
  return d;
}
const lower = (s) => String(s || "").trim().toLowerCase();
function examYearEnd() { const d = new Date(); const y = d.getMonth() >= 6 ? d.getFullYear() + 1 : d.getFullYear(); return new Date(Date.UTC(y, 6, 1)).toISOString(); }

async function findUser(email) {
  if (!email) return null;
  const e = encodeURIComponent(lower(email));
  const p = await sb(`/rest/v1/profiles?select=id,role&contact_email=ilike.${e}&limit=1`);
  return p[0] || null;
}

async function grant(userId, line, orderId) {
  if (line.kind !== "plan") return; // books are files Payhip delivers by email
  const slugs = Array.isArray(line.slugs) && line.slugs.length ? line.slugs : ["all"];
  const edition = line.teacher ? "teacher" : "student";
  const rows = slugs.filter(s => /^[a-z0-9-]+$/.test(s)).map(s => ({
    user_id: userId, course_slug: s, edition, source: "payhip", books: !!line.books, order_id: orderId,
    expires_at: line.billing === "year" ? examYearEnd() : null
  }));
  if (rows.length) await sb("/rest/v1/entitlements?on_conflict=user_id,course_slug,edition", {
    method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: JSON.stringify(rows) });
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };
  if (!URL_ || !KEY) return { statusCode: 500, body: "Not configured" };

  let p; try { p = JSON.parse(event.body || "{}"); } catch (e) { return { statusCode: 400, body: "Bad JSON" }; }

  // Payhip signs each message with sha256(your Payhip API key)
  const expected = crypto.createHash("sha256").update(PAYHIP_KEY).digest("hex");
  if (!PAYHIP_KEY || !p.signature || p.signature.length !== expected.length ||
      !crypto.timingSafeEqual(Buffer.from(p.signature), Buffer.from(expected))) {
    return { statusCode: 401, body: "Bad signature" };
  }

  try {
    if (p.type === "paid") {
      const email = p.email, user = await findUser(email);
      const keys = (p.items || []).map(i => i.product_key);
      const amount = (Number(p.price) || 0) / 100;
      // already handled? (Payhip retries)
      const seen = await sb(`/rest/v1/orders?select=id&payhip_order_id=eq.${encodeURIComponent(p.id)}&limit=1`);
      if (seen.length) return ok("duplicate");

      // find the waiting order from the shop that holds these products
      let order = null;
      if (user) {
        const pending = await sb(`/rest/v1/orders?select=id,lines&user_id=eq.${user.id}&status=eq.pending&order=created_at.desc&limit=10`);
        order = pending.find(o => (o.lines || []).some(l => !l.paid && keys.includes(l.payhipKey))) || null;
      }
      if (user && order) {
        const lines = order.lines.map(l => ({ ...l }));
        for (const l of lines) if (!l.paid && keys.includes(l.payhipKey)) { l.paid = true; l.payhip_id = p.id; await grant(user.id, l, order.id); }
        const allPaid = lines.every(l => l.paid);
        await sb(`/rest/v1/orders?id=eq.${order.id}`, { method: "PATCH", body: JSON.stringify({
          lines, status: allPaid ? "paid" : "pending", paid_at: allPaid ? new Date().toISOString() : null,
          payhip_order_id: allPaid ? p.id : null }) });
        // each Payhip payment also gets its own receipt row so retries are recognised
        if (!allPaid) await sb("/rest/v1/orders", { method: "POST", body: JSON.stringify({ user_id: user.id, buyer_email: email, payhip_order_id: p.id, amount_usd: amount, status: "paid", paid_at: new Date().toISOString(),
          lines: (p.items || []).map(i => ({ kind: "receipt", label: i.product_name, payhipKey: i.product_key, paid: true, part_of: order.id })) }) });
        await sb("/rest/v1/activity_log", { method: "POST", body: JSON.stringify({ user_id: user.id, event: "payment_received", detail: { order: order.id, payhip: p.id } }) });
      } else {
        // paid, but no account or no matching cart: keep it for you to sort out on the Accounts page
        await sb("/rest/v1/orders", { method: "POST", body: JSON.stringify({
          user_id: user ? user.id : null, buyer_email: email, payhip_order_id: p.id, amount_usd: amount, status: "paid_unmatched", paid_at: new Date().toISOString(),
          lines: (p.items || []).map(i => ({ kind: "unknown", label: i.product_name, payhipKey: i.product_key })) }) });
      }
      return ok();
    }

    if (p.type === "refunded") {
      const orders = await sb(`/rest/v1/orders?select=id,lines&lines=cs.${encodeURIComponent(JSON.stringify([{ payhip_id: p.id }]))}`).catch(() => []);
      const direct = await sb(`/rest/v1/orders?select=id&payhip_order_id=eq.${encodeURIComponent(p.id)}`);
      const ids = [...new Set([...orders.map(o => o.id), ...direct.map(o => o.id)])];
      const full = Number(p.amount_refunded) >= Number(p.price);
      for (const id of ids) {
        if (full) await sb(`/rest/v1/entitlements?order_id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ expires_at: new Date().toISOString() }) });
        await sb(`/rest/v1/orders?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ status: full ? "refunded" : "paid" }) });
      }
      return ok();
    }

    if (p.type === "subscription.deleted") {
      // a monthly plan was cancelled: end access to the courses that plan gave
      const user = await findUser(p.customer_email);
      if (!user) return ok("no account");
      const paid = await sb(`/rest/v1/orders?select=id,lines&user_id=eq.${user.id}&status=in.(paid,pending)&order=created_at.desc&limit=30`);
      const name = lower(p.product_name), planName = lower(p.plan_name);
      for (const o of paid) {
        const hit = (o.lines || []).some(l => l.kind === "plan" && l.billing === "month" && l.paid && [name, planName].includes(lower(l.payhipName)));
        if (hit) await sb(`/rest/v1/entitlements?order_id=eq.${o.id}&expires_at=is.null`, { method: "PATCH", body: JSON.stringify({ expires_at: new Date().toISOString() }) });
      }
      await sb("/rest/v1/activity_log", { method: "POST", body: JSON.stringify({ user_id: user.id, event: "subscription_cancelled", detail: { plan: p.product_name } }) });
      return ok();
    }

    return ok("ignored");
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "Error: " + e.message }; // Payhip retries hourly for 3 hours
  }
};
