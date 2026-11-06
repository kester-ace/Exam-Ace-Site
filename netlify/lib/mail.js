// Sends email from your own domain mailbox (Google Workspace, Zoho, Microsoft 365 or any provider with SMTP).
// Netlify environment variables:
//   ADMIN_EMAIL   where alerts go, e.g. admin@yourdomain.com
//   SMTP_HOST     smtp.gmail.com (Google Workspace) · smtp.zoho.com (Zoho) · smtp.office365.com (Microsoft 365)
//   SMTP_PORT     465 for Google and Zoho, 587 for Microsoft 365
//   SMTP_USER     the full mailbox address that sends, e.g. admin@yourdomain.com
//   SMTP_PASS     an app password for that mailbox (not your normal password)
//   MAIL_FROM     optional display name and address, e.g. "Exam Ace Tutorials <admin@yourdomain.com>"
//   SITE_URL      your site's address, e.g. https://www.yourdomain.com
const nodemailer = require("nodemailer");

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const SITE = (process.env.SITE_URL || process.env.URL || "").replace(/\/$/, "");

let transport = null;
function getTransport() {
  if (transport) return transport;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) throw new Error("Email isn't set up: add SMTP_HOST, SMTP_USER and SMTP_PASS in Netlify.");
  const port = Number(SMTP_PORT || 465);
  transport = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, pool: true, maxConnections: 2, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  return transport;
}

/* Branded email: the same starry navy, gold and KS seal as the site and the courses.
   Images come from the live site (assets/email/), with solid navy behind them for mail apps that block images.
   rows: [[label, value], ...]  button: { text, href } */
const C = { night: "#060D26", deep: "#0B1A46", panel: "#0F1E4A", line: "#2A3A72", ink: "#F1F4FF", muted: "#AEB9DD", gold: "#F5C542", goldLt: "#FFD766", onGold: "#0A1433" };
const DISPLAY = "'Bricolage Grotesque','Segoe UI',Arial,sans-serif";
const BODY = "'Atkinson Hyperlegible',Verdana,'Segoe UI',Arial,sans-serif";
function layout({ eyebrow, title, intro, rows = [], button, footer, brand }) {
  const img = (f) => (SITE ? SITE + "/assets/email/" + f : "");
  const name = brand || process.env.SITE_NAME || "Exam Ace Tutorials";
  const r = rows.map(([k, v]) => `<tr>
      <td style="padding:10px 0;border-bottom:1px dashed ${C.line};color:${C.muted};font:14px/1.45 ${BODY};vertical-align:top;width:36%">${esc(k)}</td>
      <td style="padding:10px 0;border-bottom:1px dashed ${C.line};color:${C.ink};font:bold 15px/1.45 ${BODY}">${v}</td></tr>`).join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light"><meta name="supported-color-schemes" content="dark light">
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap" rel="stylesheet">
<title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${C.night}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${C.night}" background="${img("stars-tile.png")}" style="background:${C.night} url('${img("stars-tile.png")}') repeat;padding:28px 12px"><tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px">
    <!-- brand row: KS seal + site name -->
    <tr><td style="padding:0 4px 16px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="width:40px;height:40px;border-radius:50%;background:${C.gold};padding:2px">
          <div style="width:36px;height:36px;line-height:36px;border-radius:50%;background:${C.deep};color:${C.goldLt};text-align:center;font:800 14px/36px ${DISPLAY}">EA</div></td>
        <td style="padding-left:12px;color:#FFFFFF;font:800 17px/1.2 ${DISPLAY}">${esc(name)}<div style="color:${C.goldLt};font:bold 10px/1.4 ${BODY};letter-spacing:1.6px;text-transform:uppercase;margin-top:3px">E-learning Ecosystem</div></td>
      </tr></table></td></tr>
    <!-- card with gold rim -->
    <tr><td style="background:${C.gold};border-radius:20px;padding:2px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:18px;overflow:hidden;background:${C.panel}">
        <tr><td bgcolor="#122a6b" background="${img("header.png")}" style="background:#122a6b url('${img("header.png")}') center/cover no-repeat;padding:26px 28px 24px;border-bottom:3px solid ${C.gold}">
          <div style="color:${C.goldLt};font:bold 11px/1 ${BODY};letter-spacing:2.4px;text-transform:uppercase">${esc(eyebrow || "Admin alert")}</div>
          <div style="color:#FFFFFF;font:800 24px/1.2 ${DISPLAY};margin-top:10px">${esc(title)}</div>
        </td></tr>
        <tr><td style="padding:24px 28px 26px;background:${C.panel}">
          ${intro ? `<p style="margin:0 0 16px;color:${C.ink};font:15px/1.6 ${BODY}">${intro}</p>` : ""}
          ${r ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px dashed ${C.line}">${r}</table>` : ""}
          ${button ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px"><tr>
            <td style="border-radius:12px;background:${C.gold};box-shadow:0 4px 0 #A97A0E">
              <a href="${esc(button.href)}" style="display:inline-block;padding:13px 24px;color:${C.onGold};font:bold 15px/1 ${BODY};text-decoration:none;border-radius:12px">${esc(button.text)}</a></td></tr></table>` : ""}
        </td></tr>
      </table></td></tr>
    <tr><td style="padding:18px 8px 0;color:${C.muted};font:12px/1.6 ${BODY};text-align:center">${footer || "You're receiving this because you're the administrator of this e-course site."}<br>© ${new Date().getFullYear()} Exam Ace Tutorials. All rights reserved.</td></tr>
  </table>
</td></tr></table></body></html>`;
}

const plain = (content) => [content.title, content.intro ? content.intro.replace(/<[^>]+>/g, "") : "",
  ...(content.rows || []).map(([k, v]) => `${k}: ${String(v).replace(/<br>/g, ", ").replace(/<[^>]+>/g, "")}`),
  content.button ? `${content.button.text}: ${content.button.href}` : "", content.footer ? content.footer.replace(/<[^>]+>/g, "") : ""].filter(Boolean).join("\n\n");

/* Any branded email to anyone (invites to students and teachers) */
async function sendMail({ to, subject, replyTo, attachments, ...content }) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  await getTransport().sendMail({ from, to, subject, replyTo: replyTo || process.env.ADMIN_EMAIL || undefined, text: plain(content), html: layout(content), attachments });
}
/* Alerts to you */
async function sendAdmin({ subject, ...content }) {
  const to = process.env.ADMIN_EMAIL;
  if (!to) throw new Error("ADMIN_EMAIL isn't set in Netlify.");
  await sendMail({ to, subject, ...content });
}

/* The invitation a student or teacher receives with their login */
const COURSE_NAMES = {
  "comm-studies": "CAPE Communication Studies", "digital-media-1": "CAPE Digital Media Unit 1", "digital-media-2": "CAPE Digital Media Unit 2",
  "cape-it-1": "CAPE Information Technology Unit 1", "csec-it": "CSEC Information Technology", "edpm": "CSEC EDPM", "all": "All courses"
};
async function sendInvite({ to, full_name, username, password, role, courses, resent }) {
  const first = String(full_name || "").trim().split(/\s+/)[0] || "there";
  const teacher = role === "teacher" || role === "admin";
  const signin = (SITE || "") + "/?signin=1&role=" + (teacher ? "teacher" : "student");
  await sendMail({
    to, subject: resent ? "Your new sign-in details" : "Your e-course login is ready",
    eyebrow: resent ? "New sign-in details" : "You're invited",
    title: resent ? `Here's a fresh login, ${first}` : `Welcome, ${first}`,
    intro: resent
      ? "Your teacher issued you a new temporary password. Use it to sign in, then choose your own."
      : "Your account is set up and your courses are waiting. Sign in with the details below. The first time you sign in, you'll choose your own password.",
    rows: [
      ["Sign in as", teacher ? "Teacher" : "Student"],
      ["Username", `<span style="font-family:Consolas,Menlo,monospace;font-size:16px;color:#FFD766">${esc(username)}</span>`],
      ["Temporary password", `<span style="font-family:Consolas,Menlo,monospace;font-size:16px;color:#FFD766">${esc(password)}</span>`],
      ...(courses && courses.length ? [["Your courses", courses.map(c => esc(COURSE_NAMES[c] || c)).join("<br>")]] : [])
    ],
    button: { text: "Sign in now", href: signin },
    footer: "Keep this email private: it contains your login. If you weren't expecting it, you can ignore it."
  });
}

module.exports = { sendAdmin, sendMail, sendInvite, esc, SITE };
