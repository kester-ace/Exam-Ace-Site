// Exam Ace invoice as a PDF (A4), made on the server so it can be emailed and downloaded from the dashboard.
// One document, two states:
//   awaiting payment → "AWAITING PAYMENT" stamp, how to pay (MoneyGram / Western Union) and a second page of wire instructions
//   paid             → "PAID" stamp, payment details, receipt number, balance 0.00
// Private payment details come from Netlify environment variables (this repository is public):
//   PAY_RECEIVER_NAME        Kester Denise Small
//   PAY_RECEIVER_ADDRESS     street, area, town and country, one line
//   WIRE_BENEFICIARY_ACCOUNT your Republic Bank account number
//   WIRE_TRANSIT             your branch transit number
//   COMPANY_EMAIL, COMPANY_PHONE, COMPANY_WHATSAPP   shown on the contact strip (optional)
const PDFDocument = require("pdfkit");
const Inv = require("../../assets/invoice-core.js");

const C = { navy: "#0B2A5B", navy2: "#13407F", gold: "#D4A72C", goldSoft: "#F6EBC8", ink: "#1C2333", muted: "#5E6779", line: "#E3E7EF", wash: "#F5F7FB", green: "#1E8E5A", red: "#C0392B", white: "#FFFFFF", sky: "#C9D4EA" };
const W = 595.28, H = 841.89, M = 40, CW = W - M * 2;
const env = k => (process.env[k] || "").trim();
const money = n => (Math.round(Number(n || 0) * 100) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const day = x => x ? new Date(/^\d{4}-\d{2}-\d{2}$/.test(x) ? x + "T12:00:00Z" : x).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "America/Lower_Princes" }) : "";
// the built-in PDF fonts can't draw some characters: swap them for safe ones
const safe = s => String(s == null ? "" : s).replace(/[−‐‑]/g, "-").replace(/[→←]/g, ">").replace(/[^\x00-\xFF–—‘’“”•…€]/g, "");

function header(doc, title, sub) {
  doc.rect(0, 0, W, 104).fill(C.navy);
  doc.save(); doc.rect(W * 0.55, 0, W * 0.45, 104).fillOpacity(0.35).fill(C.navy2); doc.restore();
  doc.rect(0, 104, W, 4).fill(C.gold);
  // EA monogram
  doc.circle(M + 28, 52, 27).lineWidth(2.5).strokeColor(C.gold).stroke();
  doc.font("Times-Bold").fontSize(20).fillColor(C.gold).text("EA", M + 1, 41, { width: 54, align: "center" });
  doc.font("Times-Bold").fontSize(19).fillColor(C.white).text("Exam Ace Tutorials", M + 68, 30, { lineBreak: false });
  doc.font("Helvetica").fontSize(7.5).fillColor(C.sky).text("EXAM ACE TUTORIALS LLC  ·  E-LEARNING ECOSYSTEM", M + 68, 54, { characterSpacing: 1, lineBreak: false });
  doc.font("Helvetica-Oblique").fontSize(9).fillColor(C.gold).text("Your success starts here", M + 68, 67, { lineBreak: false });
  const long = title.length > 8;
  doc.font("Times-Roman").fontSize(long ? 14 : 26).fillColor(C.white).text(title, W - M - 220, long ? 26 : 30, { width: 220, align: "right", characterSpacing: long ? 2 : 5 });
  doc.font("Helvetica-Bold").fontSize(10).fillColor(C.gold).text(sub, W - M - 220, long ? 72 : 66, { width: 220, align: "right" });
}

function contact(doc, y) {
  doc.rect(0, y, W, 26).fill(C.wash);
  const bits = [["Web", "www.examace.org"], ["Email", env("COMPANY_EMAIL") || "examacetutorials@gmail.com"], ["Phone", env("COMPANY_PHONE")], ["WhatsApp", env("COMPANY_WHATSAPP")], ["", "Philipsburg, Sint Maarten"]].filter(b => b[1]);
  let x = M; doc.fontSize(8);
  bits.forEach(([k, v]) => {
    if (k) { doc.font("Helvetica-Bold").fillColor(C.navy).text(k + " ", x, y + 9, { lineBreak: false }); x += doc.widthOfString(k + " "); }
    doc.font("Helvetica").fillColor(C.muted).text(v, x, y + 9, { lineBreak: false }); x += doc.widthOfString(v) + 16;
  });
  return y + 26;
}

function label(doc, t, x, y, w) { doc.font("Helvetica-Bold").fontSize(7.5).fillColor(C.gold).text(t.toUpperCase(), x, y, { width: w, characterSpacing: 1.3 }); return y + 13; }

function kvBox(doc, x, y, w, rows) {
  const rh = 20, h = rows.length * rh;
  doc.roundedRect(x, y, w, h, 6).lineWidth(0.8).strokeColor(C.line).stroke();
  rows.forEach(([k, v, color], i) => {
    const ry = y + i * rh;
    if (i) doc.moveTo(x, ry).lineTo(x + w, ry).lineWidth(0.6).strokeColor(C.line).stroke();
    doc.font("Helvetica").fontSize(8.5).fillColor(C.muted).text(k, x + 10, ry + 6, { width: w * 0.48, lineBreak: false });
    doc.font("Helvetica-Bold").fontSize(8.5).fillColor(color || C.ink).text(safe(v), x + w * 0.4, ry + 6, { width: w * 0.6 - 10, align: "right", lineBreak: false, ellipsis: true });
  });
  return y + h;
}

function stamp(doc, x, y, text, sub, color, rot) {
  doc.save(); doc.rotate(rot, { origin: [x, y] });
  doc.font("Helvetica-Bold").fontSize(text.length > 6 ? 13 : 20);
  const tw = doc.widthOfString(text, { characterSpacing: text.length > 6 ? 1.5 : 4 }), bw = tw + 26, bh = text.length > 6 ? 36 : 42;
  doc.roundedRect(x - bw / 2, y - bh / 2, bw, bh, 5).lineWidth(2.2).strokeColor(color).fillColor(C.white).fillAndStroke(C.white, color);
  doc.fillColor(color).text(text, x - bw / 2, y - bh / 2 + (text.length > 6 ? 7 : 7), { width: bw, align: "center", characterSpacing: text.length > 6 ? 1.5 : 4, lineBreak: false });
  doc.font("Helvetica-Bold").fontSize(6.5).text(sub, x - bw / 2, y + bh / 2 - 12, { width: bw, align: "center", characterSpacing: 1, lineBreak: false });
  doc.restore();
}

function footer(doc, thanks) {
  const y = H - 58;
  doc.rect(0, y, W, 58).fill(C.navy);
  doc.font("Times-Roman").fontSize(12).fillColor(C.gold).text(thanks, 0, y + 14, { width: W, align: "center" });
  doc.font("Helvetica").fontSize(8).fillColor(C.sky).text("Kester Small  ·  Exam Ace Tutorials LLC  ·  www.examace.org  ·  " + (env("COMPANY_EMAIL") || "examacetutorials@gmail.com"), 0, y + 34, { width: W, align: "center" });
}

/* inv: a row from the invoices table. Returns a Promise<Buffer>. */
function invoicePdf(inv) {
  return new Promise((resolve, reject) => {
    const paid = inv.status === "paid";
    const c = Inv.calc(inv), cur = inv.currency || "USD";
    const total = c.total, paidAmt = paid ? (inv.paid_amount != null ? Number(inv.paid_amount) : total) : 0;
    const doc = new PDFDocument({ size: "A4", margin: 0, info: { Title: `Invoice ${inv.number}`, Author: "Exam Ace Tutorials LLC", Subject: paid ? "Paid invoice" : "Invoice" }, autoFirstPage: true });
    const chunks = []; doc.on("data", d => chunks.push(d)); doc.on("end", () => resolve(Buffer.concat(chunks))); doc.on("error", reject);

    header(doc, "INVOICE", "No. " + safe(inv.number));
    let y = contact(doc, 108) + 22;

    /* billed to + details */
    const colW = CW / 2 - 14;
    let ly = label(doc, "Billed to", M, y, colW);
    doc.font("Helvetica-Bold").fontSize(13).fillColor(C.navy).text(safe(inv.bill_name || "—"), M, ly, { width: colW }); ly = doc.y + 3;
    doc.font("Helvetica").fontSize(9.5).fillColor(C.muted);
    [inv.bill_email, inv.bill_phone, inv.bill_territory].filter(Boolean).forEach(t => { doc.text(safe(t), M, ly, { width: colW }); ly = doc.y + 1; });
    if (inv.account_id) { doc.text("Account: " + safe(inv.account_id), M, ly, { width: colW }); ly = doc.y + 1; }

    const meta = [["Invoice number", inv.number], ["Date issued", day(inv.sent_at || inv.created_at)]];
    if (paid) { meta.push(["Payment received", day(inv.proof_at || inv.paid_at)], ["Payment verified", day(inv.paid_at)]); if (inv.receipt_no) meta.push(["Receipt number", inv.receipt_no]); }
    else { meta.push(["Payment due", day(inv.due_date)], ["Status", inv.status === "proof" ? "Pending approval" : "Awaiting payment", inv.status === "proof" ? C.navy2 : C.red]); }
    meta.push(["Currency", cur]);
    const my = kvBox(doc, M + CW / 2 + 14, y, colW, meta);
    y = Math.max(ly, my) + 22;

    /* items */
    const cols = [{ t: "#", w: 26 }, { t: "DESCRIPTION", w: CW - 26 - 44 - 80 - 80 }, { t: "QTY", w: 44, r: 1 }, { t: "UNIT PRICE", w: 80, r: 1 }, { t: "AMOUNT", w: 80, r: 1 }];
    doc.rect(M, y, CW, 22).fill(C.navy);
    let x = M; cols.forEach(cl => { doc.font("Helvetica-Bold").fontSize(7.5).fillColor(C.white).text(cl.t, x + 8, y + 7.5, { width: cl.w - 16, align: cl.r ? "right" : "left", characterSpacing: 1 }); x += cl.w; });
    y += 22;
    c.items.forEach((it, i) => {
      doc.font("Helvetica-Bold").fontSize(9.5); const dh = doc.heightOfString(safe(it.desc), { width: cols[1].w - 16 });
      const rh = Math.max(26, dh + 14);
      if (i % 2) doc.rect(M, y, CW, rh).fill("#FAFBFD");
      x = M; const vals = [String(i + 1), safe(it.desc), String(it.qty), money(it.unit), money(it.line)];
      cols.forEach((cl, k) => { doc.font(k === 1 ? "Helvetica-Bold" : "Helvetica").fontSize(9.5).fillColor(k === 1 ? C.navy : C.ink).text(vals[k], x + 8, y + 8, { width: cl.w - 16, align: cl.r ? "right" : "left" }); x += cl.w; });
      y += rh; doc.moveTo(M, y).lineTo(M + CW, y).lineWidth(0.6).strokeColor(C.line).stroke();
    });
    y += 16;

    /* payment box (left) + totals (right) */
    const bx = M, bw = CW * 0.56, tx = M + CW * 0.6, tw = CW * 0.4, top = y;
    let by = y;
    if (paid) {
      const rows = [["Method", inv.proof_method || "—"], ["MTCN / transfer no.", inv.proof_ref || "—"], ["Receipt", inv.receipt_no || "—"], ["Amount received", cur + " " + money(paidAmt)]];
      const h = 22 + rows.length * 17 + 10;
      doc.roundedRect(bx, by, bw, h, 5).fill(C.wash); doc.rect(bx, by, 3.5, h).fill(C.gold);
      let ry = label(doc, "Payment details", bx + 14, by + 10, bw - 28);
      rows.forEach(([k, v]) => { doc.font("Helvetica").fontSize(8.5).fillColor(C.muted).text(k, bx + 14, ry, { width: 110, lineBreak: false }); doc.font("Helvetica-Bold").fillColor(C.ink).text(safe(v), bx + 130, ry, { width: bw - 144, lineBreak: false, ellipsis: true }); ry += 17; });
      by += h;
      stamp(doc, bx + 70, by + 34, "PAID", day(inv.paid_at).toUpperCase(), C.green, -12);
      by += 64;
    } else {
      const name = env("PAY_RECEIVER_NAME") || "Kester Denise Small", addr = env("PAY_RECEIVER_ADDRESS");
      const rows = [["Receiver name", name], ...(addr ? [["Receiver address", addr]] : []), ["Amount to send", cur + " " + money(total)], ["Your reference", inv.number]];
      doc.font("Helvetica-Bold").fontSize(8.5);
      const heights = rows.map(([, v]) => Math.max(15, doc.heightOfString(safe(v), { width: bw - 144 }) + 4));
      const notes = "After sending, upload your receipt and the MTCN / reference number on your dashboard (My invoices).";
      const wire = "Paying by wire transfer (USD)? The full bank instructions are on page 2.";
      doc.font("Helvetica").fontSize(8);
      const h = 24 + heights.reduce((a, b) => a + b, 0) + doc.heightOfString(notes, { width: bw - 28 }) + doc.heightOfString(wire, { width: bw - 28 }) + 20;
      doc.roundedRect(bx, by, bw, h, 5).fill(C.wash); doc.rect(bx, by, 3.5, h).fill(C.gold);
      let ry = label(doc, "How to pay - MoneyGram / Western Union", bx + 14, by + 10, bw - 28);
      rows.forEach(([k, v], i) => { doc.font("Helvetica").fontSize(8.5).fillColor(C.muted).text(k, bx + 14, ry, { width: 110 }); doc.font("Helvetica-Bold").fillColor(k === "Your reference" ? C.red : C.ink).text(safe(v), bx + 130, ry, { width: bw - 144 }); ry += heights[i]; });
      doc.font("Helvetica").fontSize(8).fillColor(C.muted).text(notes, bx + 14, ry + 4, { width: bw - 28 });
      doc.font("Helvetica-Bold").fillColor(C.navy).text(wire, bx + 14, doc.y + 4, { width: bw - 28 });
      by += h;
    }

    // totals
    let ty = top;
    const trow = (k, v, o = {}) => {
      const rh = o.big ? 26 : 20;
      if (o.fill) doc.rect(tx, ty, tw, rh).fill(o.fill);
      if (o.rule) doc.moveTo(tx, ty).lineTo(tx + tw, ty).lineWidth(1.6).strokeColor(C.navy).stroke();
      doc.font(o.bold || o.big ? "Helvetica-Bold" : "Helvetica").fontSize(o.big ? 12 : 9.5).fillColor(o.color || C.ink);
      doc.text(k, tx + 6, ty + (o.big ? 8 : 5.5), { width: tw / 2, lineBreak: false });
      doc.font(o.big ? "Helvetica-Bold" : "Helvetica-Bold").text(v, tx + tw / 2, ty + (o.big ? 8 : 5.5), { width: tw / 2 - 6, align: "right", lineBreak: false });
      ty += rh;
    };
    trow("Subtotal", money(c.subtotal));
    if (c.discount) trow("Discount", "- " + money(c.discount));
    if (c.tax) trow(`Tax (${Number(inv.tax_pct)}%)`, money(c.tax));
    if (c.total !== c.auto) trow("Adjustment", (c.total < c.auto ? "- " : "+ ") + money(Math.abs(c.total - c.auto)));
    ty += 4; trow("Total", cur + " " + money(total), { big: 1, rule: 1, color: C.navy });
    trow("Amount paid", money(paidAmt), { color: C.green });
    trow("Balance due", money(Math.max(0, total - paidAmt)), { fill: C.goldSoft, bold: 1, color: C.navy });
    if (!paid) { ty += 26; stamp(doc, tx + tw / 2, ty + 10, inv.status === "proof" ? "PENDING APPROVAL" : "AWAITING PAYMENT", inv.status === "proof" ? "PROOF RECEIVED " + day(inv.proof_at).toUpperCase() : "DUE " + day(inv.due_date).toUpperCase(), inv.status === "proof" ? C.navy2 : C.red, -4); ty += 30; }

    y = Math.max(by, ty) + 14;

    /* notes + terms */
    const nw = CW / 2 - 14;
    let ny = label(doc, "Notes", M, y, nw);
    const note = paid ? `Your course access is now active. Sign in at www.examace.org with the account registered to ${inv.bill_email || "your email"} to begin.`
      : `Your course opens as soon as your payment is verified, and this invoice marked PAID will be emailed to you and added to your dashboard.`;
    doc.font("Helvetica").fontSize(8.5).fillColor(C.muted).text(safe(note), M, ny, { width: nw });
    if (inv.notes) doc.moveDown(0.4).text(safe(inv.notes), { width: nw });
    let sy = label(doc, "Terms", M + CW / 2 + 14, y, nw);
    ["Access is personal to the account holder and may not be shared.", "Course materials remain the property of Exam Ace Tutorials LLC.", `For billing questions, quote invoice no. ${inv.number}.`].forEach(t => {
      doc.font("Helvetica").fontSize(8.5).fillColor(C.muted).text("•  " + safe(t), M + CW / 2 + 14, sy, { width: nw }); sy = doc.y + 2;
    });
    y = Math.max(doc.y, sy) + 12;

    // e-signature, if the invoice was signed
    if (inv.signature && /^data:image\/png;base64,/.test(inv.signature) && y < H - 140) {
      try { doc.image(Buffer.from(inv.signature.split(",")[1], "base64"), M, y, { fit: [150, 44] }); } catch (e) { }
      doc.moveTo(M, y + 48).lineTo(M + 170, y + 48).lineWidth(0.8).strokeColor(C.ink).stroke();
      doc.font("Helvetica").fontSize(8).fillColor(C.muted).text((inv.signed_by || "Kester Small") + "  ·  Exam Ace Tutorials", M, y + 52);
    }

    footer(doc, "Thank you for learning with Exam Ace Tutorials");

    /* page 2: wire transfer instructions (only while unpaid) */
    if (!paid) {
      doc.addPage({ size: "A4", margin: 0 });
      header(doc, "PAYMENT INSTRUCTIONS", "Invoice " + safe(inv.number));
      y = 140;
      doc.font("Times-Roman").fontSize(18).fillColor(C.navy).text("Wire transfer - U.S. Dollars (USD)", M, y); y = doc.y + 4;
      doc.font("Helvetica").fontSize(9).fillColor(C.muted).text("Give these details to your bank. Payments are sent via SWIFT MT103 to Republic Bank St Maarten N.V.  Amount to send: ", M, y, { width: CW, continued: true }).font("Helvetica-Bold").fillColor(C.navy).text(`USD ${money(total)}`);
      y = doc.y + 14;
      const acct = env("WIRE_BENEFICIARY_ACCOUNT"), transit = env("WIRE_TRANSIT"), name = env("PAY_RECEIVER_NAME") || "Kester Denise Small", addr = env("PAY_RECEIVER_ADDRESS");
      const rows = [
        ["Field 56", "Intermediary bank\n(pay through bank)", "Bank of America\n701 Brickell Avenue, Miami, FL 33131\nFedwire ABA: 026009593\nSWIFT: BOFAUS3M"],
        ["Field 57", "Account with institution", "Republic Bank St Maarten N.V.\nAccount no. 1901-6-79005\nBack Street #62, Philipsburg, St. Maarten, Dutch West Indies\nSWIFT: RBNKSXSM"],
        ["Field 59", "Beneficiary account no.", acct || "Contact us for the account number"],
        ["", "Beneficiary name", name],
        ...(addr ? [["", "Beneficiary address", addr]] : []),
        ...(transit ? [["", "Beneficiary transit no.", transit]] : []),
        ["Field 70", "Details of payment\n(required)", `${inv.number}\nPlease quote exactly so your payment can be matched to your invoice.`]
      ];
      doc.rect(M, y, CW, 22).fill(C.navy);
      doc.font("Helvetica-Bold").fontSize(7.5).fillColor(C.white).text("WIRE TRANSFER DETAILS", M + 12, y + 7.5, { characterSpacing: 1 }); y += 22;
      const c1 = 66, c2 = 150, c3 = CW - c1 - c2;
      rows.forEach(([f, k, v], i) => {
        doc.font("Helvetica-Bold").fontSize(9);
        const rh = Math.max(doc.heightOfString(v, { width: c3 - 20 }), doc.heightOfString(k, { width: c2 - 16 })) + 16;
        if (f === "Field 70") doc.rect(M, y, CW, rh).fill(C.goldSoft);
        doc.font("Helvetica-Bold").fontSize(7.5).fillColor(C.gold).text(f.toUpperCase(), M + 12, y + 9, { width: c1 - 14, characterSpacing: 0.8 });
        doc.font("Helvetica-Bold").fontSize(8.5).fillColor(C.muted).text(k, M + c1, y + 8, { width: c2 - 16 });
        const lines = v.split("\n");
        doc.font("Helvetica-Bold").fontSize(9).fillColor(C.navy).text(safe(lines[0]), M + c1 + c2, y + 8, { width: c3 - 20 });
        if (lines.length > 1) doc.font(f === "Field 70" ? "Helvetica" : "Helvetica-Bold").fontSize(f === "Field 70" ? 8.5 : 9).fillColor(f === "Field 70" ? C.muted : C.ink).text(safe(lines.slice(1).join("\n")), M + c1 + c2, doc.y + 1, { width: c3 - 20 });
        y += rh; doc.moveTo(M, y).lineTo(M + CW, y).lineWidth(0.6).strokeColor(C.line).stroke();
      });
      y += 18;
      const after = "After paying: sign in at www.examace.org, open My invoices on your dashboard and upload your wire confirmation (or your MoneyGram / Western Union receipt with the MTCN). Your course opens as soon as the payment is verified, and this invoice marked PAID is emailed to you.";
      doc.font("Helvetica").fontSize(8.5); const ah = doc.heightOfString(after, { width: CW - 30 }) + 20;
      doc.roundedRect(M, y, CW, ah, 5).fill(C.wash); doc.rect(M, y, 3.5, ah).fill(C.gold);
      doc.fillColor(C.muted).text(after, M + 16, y + 10, { width: CW - 30 });
      footer(doc, "Your success starts here");
    }
    doc.end();
  });
}

const pdfName = inv => `Invoice-${String(inv.number || "draft").replace(/[^A-Za-z0-9-]/g, "")}${inv.status === "paid" ? "-PAID" : ""}.pdf`;

module.exports = { invoicePdf, pdfName };
