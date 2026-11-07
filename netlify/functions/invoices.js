// Invoices and receipts.
// Someone registers → a draft invoice is made from their plan and you're emailed to check it.
// You check the amounts (worked out automatically, all editable), sign, tick "I've checked this amount" and send it.
// They upload proof of payment → you're emailed → you confirm → a signed receipt is emailed and their courses open.
// Every invoice email carries the invoice as a PDF (netlify/lib/invoice-pdf.js): awaiting payment when sent, PAID when confirmed.
// Proof of payment goes to PAYMENTS_EMAIL (default examacetutorials@gmail.com) with the file attached and a link to it.
// Netlify environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, PAYMENTS_EMAIL, PAY_INFO (optional), the payment details listed in invoice-pdf.js, plus the email settings.
// Supabase: run supabase/invoices.sql once.
const { json, whoIs, sb } = require("../lib/user");
const { sendMail, sendAdmin, esc, SITE } = require("../lib/mail");
const Inv = require("../../assets/invoice-core.js");
const { invoicePdf, pdfName } = require("../lib/invoice-pdf");
const PAY_ALERTS = process.env.PAYMENTS_EMAIL || "examacetutorials@gmail.com";
const METHODS = ["MoneyGram", "Western Union", "Wire transfer", "Bank deposit", "Cash", "Other"];
const pdfAtt = async inv => ({ filename: pdfName(inv), content: await invoicePdf(inv), contentType: "application/pdf" });
const withPdf = async (inv, more) => { const a = (more || []).slice(); try { a.push(await pdfAtt(inv)); } catch (e) { console.error("PDF", e); } return a.length ? a : undefined; };
const URL_ = process.env.SUPABASE_URL;
const one = r => (Array.isArray(r) && r[0]) || null;
const ret = { Prefer: "return=representation" };
const PLANS = { single: ["Single Subject", 12, 1, false, false], plus: ["Subject Plus", 18, 1, true, false], two: ["Two Subjects", 28, 2, true, false], all: ["All Access", 45, 6, true, false], teacher1: ["Teacher, one subject", 25, 1, true, true], teacherA: ["Teacher, all subjects", 60, 6, true, true] };
const YEAR_MONTHS = 8;
const PAY_INFO = process.env.PAY_INFO || "Pay by MoneyGram or Western Union, or by wire transfer in US dollars. The full details are on the invoice PDF. Use your invoice number as the reference.";
const ADMIN_URL = (SITE || "") + "/admin.html#invoices", DASH = (SITE || "") + "/dashboard.html#invoices";

async function nextNumber(prefix) {
  const y = new Date().getFullYear(), rows = await sb(`/rest/v1/invoices?select=number&number=like.${prefix}-${y}-*&order=number.desc&limit=1`);
  const n = rows[0] ? Number(rows[0].number.split("-").pop()) + 1 : 1; return `${prefix}-${y}-${String(n).padStart(4, "0")}`;
}
async function nextReceipt() { const y = new Date().getFullYear(), rows = await sb(`/rest/v1/invoices?select=receipt_no&receipt_no=like.RC-${y}-*&order=receipt_no.desc&limit=1`); const n = rows[0] ? Number(rows[0].receipt_no.split("-").pop()) + 1 : 1; return `RC-${y}-${String(n).padStart(4, "0")}`; }
function itemsFor(plan, billing) {
  const P = PLANS[plan] || PLANS.single;
  return billing === "year" ? [{ desc: `${P[0]}: exam-year pass (September to June)`, qty: YEAR_MONTHS, unit: P[1] }] : [{ desc: `${P[0]}: one month`, qty: 1, unit: P[1] }];
}
const table = (inv) => { const c = Inv.calc(inv), m = n => Inv.money(n, inv.currency);
  return `<table style="width:100%;border-collapse:collapse;margin:6px 0 4px">${c.items.map(i => `<tr><td style="padding:6px 0;color:#F1F4FF">${esc(i.desc)} × ${i.qty}</td><td style="padding:6px 0;text-align:right;color:#F1F4FF;white-space:nowrap">${m(i.line)}</td></tr>`).join("")}
  ${c.discount ? `<tr><td style="padding:4px 0;color:#AEB9DD">Discount</td><td style="text-align:right;color:#AEB9DD">−${m(c.discount)}</td></tr>` : ""}${c.tax ? `<tr><td style="padding:4px 0;color:#AEB9DD">Tax (${inv.tax_pct}%)</td><td style="text-align:right;color:#AEB9DD">${m(c.tax)}</td></tr>` : ""}${c.total !== c.auto ? `<tr><td style="padding:4px 0;color:#AEB9DD">Adjustment</td><td style="text-align:right;color:#AEB9DD">${c.total < c.auto ? "−" : "+"}${m(Math.abs(c.total - c.auto))}</td></tr>` : ""}</table>`; };
const sig = inv => inv.signature && /^data:image\/png;base64,/.test(inv.signature) ? [{ filename: "signature.png", content: Buffer.from(inv.signature.split(",")[1], "base64"), cid: "sig@examace" }] : undefined;
const sigHtml = inv => inv.signature ? `<br><img src="cid:sig@examace" alt="Signature" style="max-height:60px;background:#fff;border-radius:6px;padding:4px"><br><span style="color:#AEB9DD;font-size:13px">${esc(inv.signed_by || "Kester Small")}</span>` : "";
const clean = (b) => {
  const o = {};
  if ("bill_name" in b) o.bill_name = String(b.bill_name || "").slice(0, 120);
  if ("bill_email" in b) o.bill_email = String(b.bill_email || "").trim().toLowerCase().slice(0, 160);
  if ("items" in b) o.items = (Array.isArray(b.items) ? b.items : []).slice(0, 20).map(i => ({ desc: String(i.desc || "").slice(0, 200), qty: Math.max(0, Number(i.qty) || 0), unit: Math.max(0, Number(i.unit) || 0) })).filter(i => i.desc);
  ["discount", "tax_pct", "total"].forEach(k => { if (k in b) o[k] = Math.max(0, Number(b[k]) || 0); });
  if ("total_manual" in b) o.total_manual = !!b.total_manual;
  if ("due_date" in b) o.due_date = /^\d{4}-\d{2}-\d{2}$/.test(b.due_date || "") ? b.due_date : null;
  ["notes", "pay_info"].forEach(k => { if (k in b) o[k] = String(b[k] || "").slice(0, 2000); });
  if ("courses" in b) o.courses = (Array.isArray(b.courses) ? b.courses : []).filter(s => /^[a-z0-9-]+$/.test(s)).slice(0, 10);
  if ("edition" in b) o.edition = b.edition === "teacher" ? "teacher" : "student";
  if ("books" in b) o.books = !!b.books;
  if ("billing" in b) o.billing = b.billing === "year" ? "year" : "month";
  if ("checked" in b) o.checked = !!b.checked;
  if ("signature" in b) o.signature = /^data:image\/png;base64,/.test(b.signature || "") && b.signature.length < 300000 ? b.signature : null;
  if ("signed_by" in b) o.signed_by = String(b.signed_by || "").slice(0, 120);
  return o;
};
const totalOf = inv => Inv.calc(inv).total;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Use POST." });
  let user; try { user = await whoIs(event); } catch (e) { return json(e.status || 500, { error: e.message }); }
  let b = {}; try { b = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "Bad request." }); }
  try {
    const me = one(await sb(`/rest/v1/profiles?id=eq.${user.id}&select=role,full_name,contact_email`)) || {};
    const admin = me.role === "admin";
    const get = async id => /^[0-9a-f-]{36}$/i.test(id || "") ? one(await sb(`/rest/v1/invoices?id=eq.${id}&select=*`)) : null;

    /* ---- the new account's invoice ---- */
    if (b.action === "create") {
      const plan = PLANS[b.plan] ? b.plan : "single", billing = b.billing === "year" ? "year" : "month";
      const open = one(await sb(`/rest/v1/invoices?user_id=eq.${user.id}&plan=eq.${plan}&status=in.(draft,sent)&select=id,number`));
      if (open) return json(200, { id: open.id, number: open.number, existing: true });
      const P = PLANS[plan], items = itemsFor(plan, billing), due = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
      const inv = one(await sb(`/rest/v1/invoices`, { method: "POST", headers: ret, body: JSON.stringify({ number: await nextNumber("EA"), user_id: user.id, bill_name: me.full_name || "", bill_email: me.contact_email || user.email, plan, billing, items, edition: P[4] ? "teacher" : "student", books: P[3], courses: P[2] >= 6 ? ["all"] : [], due_date: due, pay_info: PAY_INFO, total: totalOf({ items }) }) }));
      try { await sendAdmin({ subject: `Invoice to check: ${inv.number} · ${inv.bill_name}`, eyebrow: "New registration", title: "An invoice is ready for you to check",
        intro: `${esc(inv.bill_name)} registered for <b>${esc(P[0])}</b>. The amounts are worked out for you: check them, choose the course${P[2] > 1 ? "s" : ""}, sign and send.`,
        rows: [["Invoice", esc(inv.number)], ["Student", esc(inv.bill_name) + "<br>" + esc(inv.bill_email || "")], ["Plan", esc(P[0]) + (billing === "year" ? " · exam-year pass" : " · monthly")], ["Amount", Inv.money(inv.total)]],
        button: { text: "Check and sign the invoice", href: ADMIN_URL } }); } catch (e) { }
      return json(200, { id: inv.id, number: inv.number });
    }
    /* ---- a student's own invoices ---- */
    if (b.action === "mine") {
      const rows = await sb(`/rest/v1/invoices?user_id=eq.${user.id}&status=neq.void&select=*&order=created_at.desc`);
      return json(200, { rows: rows.map(r => r.status === "draft" ? { id: r.id, number: r.number, status: "draft", plan: r.plan, created_at: r.created_at } : Object.assign({}, r, { proof_path: undefined })) });
    }
    if (b.action === "proof") {
      const inv = await get(b.id); if (!inv || inv.user_id !== user.id) return json(404, { error: "That invoice wasn't found." });
      if (!["sent", "proof"].includes(inv.status)) return json(409, { error: inv.status === "paid" ? "This invoice is already paid." : "This invoice isn't ready for payment yet." });
      const f = String(b.file || ""), m = f.match(/^data:(image\/(?:jpeg|png|webp)|application\/pdf);base64,/); if (!m) return json(400, { error: "Upload a photo or PDF of your receipt or bank transfer." });
      if (f.length > 9 * 1024 * 1024) return json(413, { error: "That file is too large. Try a smaller photo." });
      const path = `${inv.id}/proof-${Date.now()}.${m[1] === "application/pdf" ? "pdf" : m[1].split("/")[1].replace("jpeg", "jpg")}`;
      await sb(`/storage/v1/object/payment-proofs/${path}`, { method: "POST", raw: true, headers: { "Content-Type": m[1], "x-upsert": "true" }, body: Buffer.from(f.split(",")[1], "base64") });
      const method = METHODS.includes(b.method) ? b.method : "Other", ref = String(b.ref || "").trim().slice(0, 80);
      const upd = one(await sb(`/rest/v1/invoices?id=eq.${inv.id}`, { method: "PATCH", headers: ret, body: JSON.stringify({ status: "proof", proof_path: path, proof_note: String(b.note || "").slice(0, 500), proof_method: method, proof_ref: ref || null, proof_at: new Date().toISOString() }) })) || inv;
      /* the name and email they signed up with */
      const name = me.full_name || inv.bill_name || "A student", email = me.contact_email || user.email || inv.bill_email || "";
      let link = ""; try { const r = await sb(`/storage/v1/object/sign/payment-proofs/${path}`, { method: "POST", body: JSON.stringify({ expiresIn: 7 * 86400 }) }); link = URL_ + "/storage/v1" + (r.signedURL || r.signedUrl); } catch (e) { }
      const ext = path.split(".").pop(), file = { filename: `Proof-of-payment-${inv.number}-${String(name).replace(/[^A-Za-z0-9]+/g, "-")}.${ext}`, content: Buffer.from(f.split(",")[1], "base64"), contentType: m[1] };
      try { await sendMail({ to: PAY_ALERTS, replyTo: email || undefined, subject: `Proof of payment: ${name} · ${inv.number} · ${Inv.money(totalOf(inv), inv.currency)}`, eyebrow: "Pending approval", title: "Proof of payment to approve",
        intro: `<b>${esc(name)}</b> uploaded proof of payment for invoice <b>${esc(inv.number)}</b>. The file is attached to this email.`,
        rows: [["Student", esc(name) + (email ? "<br>" + esc(email) : "")], ["Invoice", esc(inv.number)], ["Amount due", Inv.money(totalOf(inv), inv.currency)], ["Paid by", esc(method)], ["MTCN / reference", esc(ref || "—")], ["Their note", esc(b.note || "—")],
          ["Uploaded file", link ? `<a href="${esc(link)}" style="color:#FFD766">Open the proof of payment</a><br><span style="color:#AEB9DD;font-size:12px">Link works for 7 days. The file is also attached.</span>` : "Attached to this email"]],
        button: { text: "Approve or reject on the dashboard", href: ADMIN_URL }, footer: "You're receiving this because you manage payments for Exam Ace Tutorials.", attachments: [file] }); } catch (e) { console.error("proof mail", e); }
      try { await sendMail({ to: email || inv.bill_email, subject: `We received your proof of payment · ${inv.number}`, eyebrow: "Pending approval", title: "Proof of payment received",
        intro: `Hi ${esc(String(name).split(" ")[0])}, thank you. We've received your proof of payment for invoice <b>${esc(inv.number)}</b> and it's now pending approval. Your course opens as soon as the payment is verified, and your invoice marked <b>PAID</b> will be emailed to you and added to your dashboard.`,
        rows: [["Invoice", esc(inv.number)], ["Amount", Inv.money(totalOf(inv), inv.currency)], ["Paid by", esc(method)], ["MTCN / reference", esc(ref || "—")]],
        button: { text: "Open my dashboard", href: DASH }, footer: "You're receiving this because you uploaded a payment to Exam Ace Tutorials." }); } catch (e) { }
      return json(200, { ok: true, status: upd.status });
    }

    /* the invoice as a PDF: for the student it belongs to (once it's been sent) or for you */
    if (b.action === "pdf") {
      const inv = await get(b.id); if (!inv || (!admin && (inv.user_id !== user.id || inv.status === "draft" || inv.status === "void"))) return json(404, { error: "That invoice wasn't found." });
      return json(200, { filename: pdfName(inv), data: (await invoicePdf(inv)).toString("base64") });
    }

    if (!admin) return json(403, { error: "Only the administrator manages invoices." });

    /* how many proofs are waiting for you (the dashboard notification) */
    if (b.action === "pending") { const rows = await sb(`/rest/v1/invoices?status=eq.proof&select=id,number,bill_name,total,currency,proof_at,proof_method&order=proof_at.asc`); return json(200, { count: rows.length, rows }); }

    if (b.action === "list") { const st = ["draft", "sent", "proof", "paid", "void"].includes(b.status) ? `&status=eq.${b.status}` : ""; return json(200, { rows: await sb(`/rest/v1/invoices?select=id,number,bill_name,bill_email,plan,status,total,currency,created_at,sent_at,paid_at,receipt_no${st}&order=created_at.desc&limit=300`) }); }
    if (b.action === "get") { const inv = await get(b.id); if (!inv) return json(404, { error: "Not found." }); let proof = null;
      if (inv.proof_path) { try { const r = await sb(`/storage/v1/object/sign/payment-proofs/${inv.proof_path}`, { method: "POST", body: JSON.stringify({ expiresIn: 900 }) }); proof = URL_ + "/storage/v1" + (r.signedURL || r.signedUrl); } catch (e) { } }
      return json(200, Object.assign(inv, { proof_url: proof })); }
    if (b.action === "new") { /* an invoice you make yourself */
      const inv = one(await sb(`/rest/v1/invoices`, { method: "POST", headers: ret, body: JSON.stringify(Object.assign({ number: await nextNumber("EA"), items: [{ desc: "Exam Ace Tutorials", qty: 1, unit: 0 }], pay_info: PAY_INFO, due_date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10) }, clean(b))) }));
      return json(200, inv); }
    if (b.action === "save") {
      const inv = await get(b.id); if (!inv) return json(404, { error: "Not found." }); if (inv.status === "paid") return json(409, { error: "A paid invoice can't be changed." });
      const patch = clean(b); const merged = Object.assign({}, inv, patch); if (!merged.total_manual) patch.total = totalOf(Object.assign(merged, { total_manual: false }));
      return json(200, one(await sb(`/rest/v1/invoices?id=eq.${inv.id}`, { method: "PATCH", headers: ret, body: JSON.stringify(patch) }))); }
    if (b.action === "send") {
      const inv = await get(b.id); if (!inv) return json(404, { error: "Not found." });
      if (!inv.checked) return json(400, { error: "Tick “I've checked this amount” first." }); if (!inv.signature) return json(400, { error: "Sign the invoice first." });
      if (!inv.bill_email) return json(400, { error: "Add the student's email address." });
      const total = totalOf(inv), first = String(inv.bill_name || "").split(" ")[0] || "there";
      const asSent = Object.assign({}, inv, { status: inv.status === "proof" ? "proof" : "sent", sent_at: inv.sent_at || new Date().toISOString(), total });
      await sendMail({ to: inv.bill_email, subject: `Your invoice ${inv.number} from Exam Ace Tutorials`, eyebrow: "Invoice", title: `Invoice ${inv.number}`, attachments: await withPdf(asSent, sig(inv)),
        intro: `Hi ${esc(first)}, here is your invoice. ${table(inv)}<b style="font-size:18px;color:#FFD766">Total due: ${Inv.money(total, inv.currency)}</b>${sigHtml(inv)}`,
        rows: [["Due by", esc(inv.due_date || "—")], ["How to pay", esc(inv.pay_info || "").replace(/\n/g, "<br>")], ["Your invoice", "Attached as a PDF, and in <b>My invoices</b> on your dashboard."], ["After paying", "Sign in and upload your proof of payment from your dashboard. Your courses open when it's confirmed."]],
        button: { text: "Open my dashboard", href: DASH }, footer: "You're receiving this because you registered with Exam Ace Tutorials." });
      return json(200, one(await sb(`/rest/v1/invoices?id=eq.${inv.id}`, { method: "PATCH", headers: ret, body: JSON.stringify({ status: inv.status === "proof" ? "proof" : "sent", sent_at: new Date().toISOString(), total }) }))); }
    if (b.action === "reject_proof") {
      const inv = await get(b.id); if (!inv) return json(404, { error: "Not found." });
      await sb(`/rest/v1/invoices?id=eq.${inv.id}`, { method: "PATCH", body: JSON.stringify({ status: "sent" }) });
      try { await sendMail({ to: inv.bill_email, subject: `Invoice ${inv.number}: we couldn't confirm your payment yet`, eyebrow: "Payment", title: "We couldn't confirm your payment yet", intro: esc(b.note || "The proof you sent couldn't be matched to a payment. Please check it and upload it again, or contact us."), button: { text: "Open my dashboard", href: DASH }, footer: "You're receiving this because you registered with Exam Ace Tutorials." }); } catch (e) { }
      return json(200, { ok: true }); }
    if (b.action === "void") { await sb(`/rest/v1/invoices?id=eq.${b.id}`, { method: "PATCH", body: JSON.stringify({ status: "void" }) }); return json(200, { ok: true }); }
    if (b.action === "confirm") {
      const inv = await get(b.id); if (!inv) return json(404, { error: "Not found." }); if (inv.status === "paid") return json(409, { error: "Already confirmed." });
      if (!inv.signature) return json(400, { error: "Sign the invoice first: your signature goes on the receipt." });
      const courses = (inv.courses || []).length ? inv.courses : null; if (!courses) return json(400, { error: "Choose the course(s) this payment opens." });
      const paid = b.paid_amount != null && b.paid_amount !== "" ? Math.max(0, Number(b.paid_amount)) : totalOf(inv), now = new Date();
      const receipt = await nextReceipt();
      const out = one(await sb(`/rest/v1/invoices?id=eq.${inv.id}`, { method: "PATCH", headers: ret, body: JSON.stringify({ status: "paid", paid_at: now.toISOString(), paid_amount: paid, receipt_no: receipt }) }));
      if (inv.user_id) { const yEnd = () => { const y = now.getMonth() >= 6 ? now.getFullYear() + 1 : now.getFullYear(); return new Date(Date.UTC(y, 6, 1)).toISOString(); };
        const exp = inv.billing === "year" ? yEnd() : new Date(now.getTime() + 31 * 86400000).toISOString();
        await sb("/rest/v1/entitlements?on_conflict=user_id,course_slug,edition", { method: "POST", headers: { Prefer: "resolution=merge-duplicates" }, body: JSON.stringify(courses.map(s => ({ user_id: inv.user_id, course_slug: s, edition: inv.edition || "student", source: "manual", books: !!inv.books, expires_at: exp }))) }); }
      try { await sendMail({ to: inv.bill_email, subject: `Paid: invoice ${inv.number} from Exam Ace Tutorials`, eyebrow: "Payment confirmed", title: "Payment received. Thank you!", attachments: await withPdf(out, sig(out)),
        intro: `Hi ${esc(String(inv.bill_name || "").split(" ")[0] || "there")}, we've confirmed your payment and your course${courses.length > 1 || courses[0] === "all" ? "s are" : " is"} open now. ${table(inv)}<b style="font-size:18px;color:#FFD766">Amount paid: ${Inv.money(paid, inv.currency)}</b>${sigHtml(out)}`,
        rows: [["Receipt", esc(receipt)], ["For invoice", esc(inv.number)], ["Paid on", now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })], ["Your invoice", "Attached as a PDF marked <b>PAID</b>, and in <b>My invoices</b> on your dashboard."]],
        button: { text: "Open my courses", href: DASH }, footer: "You're receiving this because you paid Exam Ace Tutorials." }); } catch (e) { }
      return json(200, out); }
    return json(400, { error: "Unknown request." });
  } catch (e) { console.error(e); return json(500, { error: "Invoices didn't respond. Try again in a moment." }); }
};
