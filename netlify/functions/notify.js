// Instant admin alerts. Supabase calls this the moment something happens in the database
// (set up under Supabase → Database → Webhooks; see SETUP-GUIDE.md, Step 7).
// Netlify environment variables: NOTIFY_SECRET (any long random text, also typed into the Supabase webhook),
// NOTIFY_MODE (instant | daily | both — default both), plus the email settings in netlify/lib/mail.js
const { sendAdmin, esc, SITE } = require("../lib/mail");

const URL_ = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const COURSES = {
  "comm-studies": "CAPE Communication Studies", "digital-media-1": "CAPE Digital Media Unit 1", "digital-media-2": "CAPE Digital Media Unit 2",
  "cape-it-1": "CAPE Information Technology Unit 1", "csec-it": "CSEC Information Technology", "edpm": "CSEC EDPM", "all": "All courses"
};
const admin = SITE ? SITE + "/admin.html" : "/admin.html";

async function profile(id) {
  if (!id || !URL_ || !KEY) return {};
  const r = await fetch(`${URL_}/rest/v1/profiles?select=full_name,username,contact_email,role&id=eq.${id}`, { headers: { apikey: KEY, Authorization: "Bearer " + KEY } });
  const d = await r.json().catch(() => []);
  return (Array.isArray(d) && d[0]) || {};
}
const who = (p) => `${esc(p.full_name || "Someone")}${p.username ? ` <span style="color:#6B7699;font-weight:400">(${esc(p.username)})</span>` : ""}`;
const money = (n) => "US$" + Number(n || 0).toFixed(2);
const lines = (ls) => (ls || []).filter(l => l.kind !== "receipt").map(l => esc(l.label) + (l.detail ? ` · ${esc(l.detail)}` : "")).join("<br>") || "—";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };
  if (!process.env.NOTIFY_SECRET || event.headers["x-notify-secret"] !== process.env.NOTIFY_SECRET) return { statusCode: 401, body: "Bad secret" };
  if ((process.env.NOTIFY_MODE || "both") === "daily") return { statusCode: 200, body: "daily only" };

  let p; try { p = JSON.parse(event.body || "{}"); } catch (e) { return { statusCode: 400, body: "Bad JSON" }; }
  const { type, table, record: r = {}, old_record: old = {} } = p;

  try {
    /* someone asked for a subject */
    if (table === "course_requests" && type === "INSERT") {
      const u = await profile(r.user_id);
      const what = r.course_slug ? esc(COURSES[r.course_slug] || r.course_slug) : `<b>New subject:</b> ${esc(r.subject_text)}`;
      await sendAdmin({ subject: `Subject request: ${r.course_slug ? (COURSES[r.course_slug] || r.course_slug) : r.subject_text}`,
        eyebrow: "Subject request", title: r.course_slug ? "Someone wants a course added" : "Someone suggested a new subject",
        rows: [["From", who(u)], ["Account type", esc(u.role || "student")], ["Subject", what], ["Note", esc(r.note || "—")]],
        button: { text: "Approve or decline", href: admin } });
    }

    /* a quote request from the poster form */
    if (table === "quote_requests" && type === "INSERT") {
      const subj = (r.subjects || []).map(x => COURSES[x] || x).map(esc).join("<br>") || "—";
      await sendAdmin({ subject: `Quote request: ${r.organisation || r.full_name} (${r.learners || "?"} learners)`,
        eyebrow: "Quote request", title: `${r.full_name} would like a quote`,
        rows: [["From", `${esc(r.full_name)} · ${esc(r.who || "")}`], ["Email", esc(r.email)], ["Phone", esc(r.phone || "—")],
          ["School or organisation", esc(r.organisation || "—")], ["Country or island", esc(r.island || "—")], ["Subjects", subj],
          ["Learners", esc(r.learners || "—")], ["Teacher logins", esc(r.teachers || "—")], ["Include", esc((r.extras || []).join(", ") || "—")],
          ["Start", esc(r.start || "—")], ["Billing", esc(r.billing || "—")], ["Message", esc(r.message || "—")]],
        button: { text: "Reply with a quote", href: "mailto:" + encodeURIComponent(r.email) + "?subject=" + encodeURIComponent("Your Exam Ace Tutorials quote") } });
    }

    /* someone created their own account (logins you issue yourself don't send an alert) */
    if (table === "profiles" && type === "INSERT" && !r.must_change_password) {
      await sendAdmin({ subject: `New account: ${r.full_name || r.contact_email}`,
        eyebrow: "New account", title: "Someone signed up",
        rows: [["Name", esc(r.full_name || "—")], ["Email", esc(r.contact_email || "—")], ["Plan they looked at", esc(r.plan || "—")]],
        button: { text: "See accounts", href: admin } });
    }

    /* payments */
    if (table === "orders") {
      const became = (s) => r.status === s && (type === "INSERT" || old.status !== s);
      const isReceipt = (r.lines || []).every(l => l.kind === "receipt");
      if (became("paid") && !isReceipt) {
        const u = await profile(r.user_id);
        await sendAdmin({ subject: `Sale: ${money(r.amount_usd)} from ${u.full_name || r.buyer_email}`,
          eyebrow: "New sale", title: `${money(r.amount_usd)} received`,
          intro: "The courses have been unlocked on the buyer's account automatically.",
          rows: [["Buyer", who(u)], ["Email", esc(r.buyer_email || "—")], ["Order", esc(r.invoice_number || "")], ["Items", lines(r.lines)]],
          button: { text: "See orders", href: admin } });
      }
      if (became("paid_unmatched")) {
        await sendAdmin({ subject: `Action needed: payment from ${r.buyer_email} didn't match an account`,
          eyebrow: "Needs attention", title: "A payment needs you",
          intro: "Payhip took this payment, but it didn't match a cart on the site (often the buyer used a different email at Payhip). Find their account and use <b>Add course</b>.",
          rows: [["Payhip email", esc(r.buyer_email || "—")], ["Amount", money(r.amount_usd)], ["Bought", lines(r.lines)]],
          button: { text: "Open Accounts", href: admin } });
      }
      if (became("refunded")) {
        await sendAdmin({ subject: `Refund: order ${r.invoice_number}`, eyebrow: "Refund", title: "An order was refunded",
          intro: "Access to the courses from this order has been closed.",
          rows: [["Order", esc(r.invoice_number || "")], ["Email", esc(r.buyer_email || "—")], ["Items", lines(r.lines)]] });
      }
    }
    return { statusCode: 200, body: "ok" };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: e.message };
  }
};
