// Morning summary email. Netlify runs this every day at 7:00 a.m. Sint Maarten time (see netlify.toml).
// Skipped when NOTIFY_MODE is "instant", and when nothing happened in the last 24 hours.
const { sendAdmin, esc, SITE } = require("../lib/mail");

const URL_ = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const get = async (path) => {
  const r = await fetch(URL_ + path, { headers: { apikey: KEY, Authorization: "Bearer " + KEY } });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
};

exports.handler = async () => {
  if ((process.env.NOTIFY_MODE || "both") === "instant") return { statusCode: 200, body: "instant only" };
  if (!URL_ || !KEY) return { statusCode: 500, body: "Not configured" };
  const since = encodeURIComponent(new Date(Date.now() - 864e5).toISOString());

  const [signups, requests, waiting, paid, unmatched, active] = await Promise.all([
    get(`/rest/v1/profiles?select=full_name&created_at=gte.${since}&must_change_password=eq.false`),
    get(`/rest/v1/course_requests?select=id&created_at=gte.${since}`),
    get(`/rest/v1/course_requests?select=id&status=eq.pending`),
    get(`/rest/v1/orders?select=amount_usd,lines&status=eq.paid&paid_at=gte.${since}`),
    get(`/rest/v1/orders?select=id&status=eq.paid_unmatched`),
    get(`/rest/v1/activity_log?select=user_id&event=eq.sign_in&created_at=gte.${since}`)
  ]);
  const sales = paid.filter(o => !(o.lines || []).every(l => l.kind === "receipt"));
  const revenue = sales.reduce((t, o) => t + Number(o.amount_usd || 0), 0);
  const learners = new Set(active.map(a => a.user_id)).size;

  if (!signups.length && !requests.length && !sales.length && !unmatched.length && !learners) return { statusCode: 200, body: "quiet day" };

  const date = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Lower_Princes" });
  const flag = (n, txt) => n ? `<span style="color:#BF3B27">${n} ${txt}</span>` : "None";
  await sendAdmin({
    subject: `Daily summary: ${sales.length} sale${sales.length === 1 ? "" : "s"}, ${waiting.length} request${waiting.length === 1 ? "" : "s"} waiting`,
    eyebrow: "Daily summary", title: date,
    intro: "Here's the last 24 hours on your e-course site.",
    rows: [
      ["Sales", `${sales.length} · US$${revenue.toFixed(2)}`],
      ["Learners who signed in", String(learners)],
      ["New sign-ups", signups.length ? esc(signups.map(s => s.full_name).filter(Boolean).slice(0, 8).join(", ")) + (signups.length > 8 ? ` and ${signups.length - 8} more` : "") : "None"],
      ["New subject requests", String(requests.length)],
      ["Requests waiting for you", flag(waiting.length, "to approve or decline")],
      ["Payments needing attention", flag(unmatched.length, "to match to an account")]
    ],
    button: { text: "Open Accounts", href: (SITE || "") + "/admin.html" }
  });
  return { statusCode: 200, body: "sent" };
};
