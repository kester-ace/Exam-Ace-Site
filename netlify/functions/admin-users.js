// Secure account service for the Accounts page (admin.html).
// Runs on Netlify, never in the browser, so the Supabase service key stays private.
// Netlify → Site configuration → Environment variables:
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, STUDENT_LOGIN_DOMAIN
const crypto = require("crypto");
const { sendInvite } = require("../lib/mail");

const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DOMAIN = process.env.STUDENT_LOGIN_DOMAIN || "students.kestersmall.com";
const svc = { apikey: KEY, Authorization: "Bearer " + KEY, "Content-Type": "application/json" };

const json = (status, body) => ({ statusCode: status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify(body) });

async function sb(path, opts = {}) {
  const res = await fetch(URL_ + path, { ...opts, headers: { ...svc, ...(opts.headers || {}) } });
  const text = await res.text();
  let data = null; try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
  if (!res.ok) { const msg = (data && (data.msg || data.message || data.error_description || data.error)) || res.statusText; throw new Error(msg); }
  return data;
}

function tempPassword() {
  const words = ["Star", "Coral", "Palm", "Wave", "Comet", "Reef", "Sun", "Orbit", "Isle", "Bay"];
  return words[crypto.randomInt(words.length)] + "-" + crypto.randomInt(1000, 10000) + "-" + words[crypto.randomInt(words.length)].toLowerCase();
}
const clean = (s) => String(s || "").trim();
const validSlug = (s) => /^[a-z0-9-]+$/.test(s);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Use POST." });
  if (!URL_ || !KEY) return json(500, { error: "The account service isn't set up yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify's environment variables." });

  // 1. Who is calling? Must be a signed-in administrator.
  const token = (event.headers.authorization || event.headers.Authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return json(401, { error: "Sign in again to continue." });
  let caller;
  try {
    const r = await fetch(URL_ + "/auth/v1/user", { headers: { apikey: KEY, Authorization: "Bearer " + token } });
    if (!r.ok) return json(401, { error: "Your session has ended. Sign in again." });
    caller = await r.json();
    const p = await sb(`/rest/v1/profiles?select=role&id=eq.${caller.id}`);
    if (!p.length || p[0].role !== "admin") return json(403, { error: "Only administrators can manage accounts." });
  } catch (e) { return json(500, { error: "Couldn't check your account: " + e.message }); }

  let body = {}; try { body = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "Bad request." }); }

  try {
    switch (body.action) {
      case "list": {
        const [profiles, ents, logs, reqs, orders, quotes] = await Promise.all([
          sb("/rest/v1/profiles?select=id,full_name,username,contact_email,role,must_change_password,created_at&order=full_name.asc"),
          sb("/rest/v1/entitlements?select=user_id,course_slug,edition,source,expires_at"),
          sb("/rest/v1/activity_log?select=user_id,event,detail,created_at&order=created_at.desc&limit=50"),
          sb("/rest/v1/course_requests?select=id,user_id,course_slug,subject_text,note,status,created_at&order=created_at.desc&limit=200"),
          sb("/rest/v1/orders?select=id,invoice_number,user_id,buyer_email,lines,amount_usd,status,created_at,paid_at&order=created_at.desc&limit=80"),
          sb("/rest/v1/quote_requests?select=*&order=created_at.desc&limit=80")
        ]);
        const byId = Object.fromEntries(profiles.map(p => [p.id, p]));
        return json(200, {
          users: profiles.map(p => ({ ...p, email: p.contact_email, courses: ents.filter(e => e.user_id === p.id) })), logs,
          orders: orders.map(o => ({ ...o, full_name: (byId[o.user_id] || {}).full_name })), quotes,
          requests: reqs.map(r => ({ ...r, full_name: (byId[r.user_id] || {}).full_name, username: (byId[r.user_id] || {}).username, role: (byId[r.user_id] || {}).role }))
        });
      }

      case "quote_status": {
        if (!["new", "quoted", "closed"].includes(body.status)) return json(400, { error: "Unknown status." });
        await sb(`/rest/v1/quote_requests?id=eq.${Number(body.id)}`, { method: "PATCH", body: JSON.stringify({ status: body.status }) });
        return json(200, { ok: true });
      }

      case "decide": {
        const rows = await sb(`/rest/v1/course_requests?select=id,user_id,course_slug&id=eq.${Number(body.id)}`);
        if (!rows.length) return json(404, { error: "Request not found." });
        const r = rows[0];
        await sb(`/rest/v1/course_requests?id=eq.${r.id}`, { method: "PATCH", body: JSON.stringify({ status: body.approve ? "approved" : "declined", decided_at: new Date().toISOString() }) });
        if (body.approve && r.course_slug && validSlug(r.course_slug)) {
          const p = await sb(`/rest/v1/profiles?select=role&id=eq.${r.user_id}`);
          const edition = p.length && p[0].role !== "student" ? "teacher" : "student";
          await sb("/rest/v1/entitlements?on_conflict=user_id,course_slug,edition", { method: "POST", headers: { Prefer: "resolution=merge-duplicates" },
            body: JSON.stringify([{ user_id: r.user_id, course_slug: r.course_slug, edition, source: "manual" }]) });
        }
        return json(200, { ok: true });
      }

      case "create": {
        const out = [];
        for (const a of (body.accounts || []).slice(0, 25)) { // the page sends large class lists in batches
          const username = clean(a.username).toLowerCase();
          const full_name = clean(a.full_name);
          if (!/^[a-z0-9._-]+$/.test(username) || !full_name) { out.push({ ...a, error: "Name and username needed" }); continue; }
          const role = ["student", "teacher", "admin"].includes(a.role) ? a.role : "student";
          const email = clean(a.email).toLowerCase();
          if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { out.push({ ...a, error: "Email address doesn't look right" }); continue; }
          const password = tempPassword();
          try {
            const user = await sb("/auth/v1/admin/users", { method: "POST", body: JSON.stringify({
              email: `${username}@${DOMAIN}`, password, email_confirm: true,
              user_metadata: { full_name },
              app_metadata: { role, username, must_change_password: true, contact_email: email || null }
            }) });
            await sb(`/rest/v1/profiles?id=eq.${user.id}`, { method: "PATCH", body: JSON.stringify({ full_name, username, role, must_change_password: true, contact_email: email || null, school: clean(a.school) || null }) });
            const courses = (a.courses || []).filter(validSlug);
            if (courses.length) await sb("/rest/v1/entitlements?on_conflict=user_id,course_slug,edition", {
              method: "POST", headers: { Prefer: "resolution=merge-duplicates" },
              body: JSON.stringify(courses.map(c => ({ user_id: user.id, course_slug: c, edition: a.edition === "teacher" ? "teacher" : "student", source: ["school", "payhip", "manual"].includes(a.source) ? a.source : "school", books: a.books !== false })))
            });
            // email the login when asked and an address was given
            let invited = "no email";
            if (body.sendInvites && email) {
              try { await sendInvite({ to: email, full_name, username, password, role, courses }); invited = "sent"; }
              catch (e) { invited = "not sent: " + e.message; }
            } else if (email) invited = "not requested";
            out.push({ full_name, username, email, temp_password: password, invited });
          } catch (e) {
            out.push({ full_name, username, error: /already/i.test(e.message) ? "Username already taken" : e.message });
          }
        }
        return json(200, { created: out });
      }

      case "invite": {
        // resend: a fresh temporary password, emailed to the address on the account
        const p = await sb(`/rest/v1/profiles?select=full_name,username,contact_email,role&id=eq.${body.user_id}`);
        if (!p.length) return json(404, { error: "Account not found." });
        const acc = p[0];
        if (!acc.contact_email || /@/.test(acc.contact_email) === false) return json(400, { error: "This account has no email address. Use Reset password and give them the new one." });
        const ents = await sb(`/rest/v1/entitlements?select=course_slug&user_id=eq.${body.user_id}`);
        const password = tempPassword();
        await sb(`/auth/v1/admin/users/${body.user_id}`, { method: "PUT", body: JSON.stringify({ password, app_metadata: { must_change_password: true } }) });
        await sb(`/rest/v1/profiles?id=eq.${body.user_id}`, { method: "PATCH", body: JSON.stringify({ must_change_password: true }) });
        await sendInvite({ to: acc.contact_email, full_name: acc.full_name, username: acc.username, password, role: acc.role, courses: ents.map(e => e.course_slug), resent: true });
        return json(200, { sent: acc.contact_email });
      }

      case "reset": {
        const password = tempPassword();
        await sb(`/auth/v1/admin/users/${body.user_id}`, { method: "PUT", body: JSON.stringify({ password, app_metadata: { must_change_password: true } }) });
        await sb(`/rest/v1/profiles?id=eq.${body.user_id}`, { method: "PATCH", body: JSON.stringify({ must_change_password: true }) });
        return json(200, { temp_password: password });
      }

      case "grant": {
        const courses = (body.courses || []).filter(validSlug);
        await sb("/rest/v1/entitlements?on_conflict=user_id,course_slug,edition", {
          method: "POST", headers: { Prefer: "resolution=merge-duplicates" },
          body: JSON.stringify(courses.map(c => ({ user_id: body.user_id, course_slug: c, edition: body.edition === "teacher" ? "teacher" : "student", source: ["school", "payhip", "manual"].includes(body.source) ? body.source : "manual", books: body.books !== false, expires_at: body.expires_at || null })))
        });
        return json(200, { ok: true });
      }

      case "revoke": {
        if (!validSlug(body.course_slug)) return json(400, { error: "Unknown course." });
        await sb(`/rest/v1/entitlements?user_id=eq.${body.user_id}&course_slug=eq.${body.course_slug}`, { method: "DELETE" });
        return json(200, { ok: true });
      }

      default:
        return json(400, { error: "Unknown action." });
    }
  } catch (e) {
    return json(500, { error: e.message });
  }
};
