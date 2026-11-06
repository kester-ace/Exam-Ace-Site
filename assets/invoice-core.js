/* Invoices and receipts: the sums and the printable page, shared by the site and the invoices function. Kester Small */
(function (root, factory) { if (typeof module === "object" && module.exports) module.exports = factory(); else root.InvoiceCore = factory(); })(typeof self !== "undefined" ? self : this, function () {
  const money = (n, cur) => (cur === "USD" || !cur ? "US$" : cur + " ") + (Math.round(Number(n || 0) * 100) / 100).toFixed(2);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const r2 = n => Math.round(Number(n || 0) * 100) / 100;
  /* the automatic sums; total can be overridden (total_manual) */
  function calc(inv) {
    const items = (inv.items || []).map(i => ({ desc: String(i.desc || ""), qty: Number(i.qty) || 0, unit: Number(i.unit) || 0 })).map(i => Object.assign(i, { line: r2(i.qty * i.unit) }));
    const subtotal = r2(items.reduce((a, i) => a + i.line, 0)), discount = r2(Math.min(Number(inv.discount) || 0, subtotal));
    const tax = r2((subtotal - discount) * (Number(inv.tax_pct) || 0) / 100), auto = r2(subtotal - discount + tax);
    return { items, subtotal, discount, tax, auto, total: inv.total_manual ? r2(inv.total) : auto };
  }
  /* the document: kind = invoice | receipt */
  function doc(inv, kind, site) {
    const c = calc(inv), cur = inv.currency || "USD", rec = kind === "receipt", S = site || {};
    const d = x => x ? new Date(x).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
    return `<div class="inv"><div class="inv-top"><div><div class="inv-brand">${esc(S.name || "Exam Ace Tutorials")}</div><div class="inv-small">${esc(S.tagline || "E-learning Ecosystem")}${S.email ? " · " + esc(S.email) : ""}</div></div>
      <div class="inv-kind"><div>${rec ? "RECEIPT" : "INVOICE"}</div><div class="inv-small">${esc(rec ? inv.receipt_no : inv.number)}</div></div></div>
      <div class="inv-meta"><div><div class="inv-lbl">${rec ? "Received from" : "Bill to"}</div><b>${esc(inv.bill_name || "")}</b><div>${esc(inv.bill_email || "")}</div></div>
        <div><div class="inv-lbl">${rec ? "Paid on" : "Date"}</div>${esc(d(rec ? inv.paid_at : (inv.sent_at || inv.created_at)))}${rec ? "" : `<div class="inv-lbl" style="margin-top:6px">Due</div>${esc(d(inv.due_date))}`}${rec ? `<div class="inv-lbl" style="margin-top:6px">For invoice</div>${esc(inv.number)}` : ""}</div></div>
      <table class="inv-t"><thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead><tbody>
      ${c.items.map(i => `<tr><td>${esc(i.desc)}</td><td>${i.qty}</td><td>${money(i.unit, cur)}</td><td>${money(i.line, cur)}</td></tr>`).join("")}</tbody></table>
      <table class="inv-sum"><tr><td>Subtotal</td><td>${money(c.subtotal, cur)}</td></tr>${c.discount ? `<tr><td>Discount</td><td>−${money(c.discount, cur)}</td></tr>` : ""}${c.tax ? `<tr><td>Tax (${Number(inv.tax_pct)}%)</td><td>${money(c.tax, cur)}</td></tr>` : ""}${c.total !== c.auto ? `<tr><td>Adjustment</td><td>${c.total < c.auto ? "−" : "+"}${money(Math.abs(c.total - c.auto), cur)}</td></tr>` : ""}
        <tr class="inv-tot"><td>${rec ? "Amount paid" : "Total due"}</td><td>${money(rec ? (inv.paid_amount != null ? inv.paid_amount : c.total) : c.total, cur)}</td></tr></table>
      ${!rec && inv.pay_info ? `<div class="inv-box"><div class="inv-lbl">How to pay</div><div style="white-space:pre-wrap">${esc(inv.pay_info)}</div><div class="inv-small" style="margin-top:6px">After paying, sign in and upload your proof of payment from your dashboard. Your courses open when the payment is confirmed.</div></div>` : ""}
      ${rec ? `<div class="inv-box"><b>Thank you.</b> Your payment has been received and your courses are open on your Exam Ace Tutorials dashboard.</div>` : ""}
      ${inv.notes ? `<div class="inv-small" style="white-space:pre-wrap;margin-top:8px">${esc(inv.notes)}</div>` : ""}
      <div class="inv-sign">${inv.signature ? `<img src="${esc(inv.signature)}" alt="Signature">` : '<div style="height:50px"></div>'}<div class="inv-line"></div><div class="inv-small">${esc(inv.signed_by || "Kester Small")} · Exam Ace Tutorials</div></div></div>`;
  }
  const CSS = `.inv{background:#fff;color:#0B1736;border-radius:14px;padding:28px;font:15px/1.5 "Atkinson Hyperlegible",Verdana,sans-serif;max-width:760px}
.inv-top{display:flex;justify-content:space-between;gap:12px;border-bottom:4px solid #F5C542;padding-bottom:14px;margin-bottom:16px;flex-wrap:wrap}
.inv-brand{font:800 1.5rem "Bricolage Grotesque","Segoe UI",sans-serif;color:#0B1A46}.inv-kind{text-align:right;font:800 1.5rem "Bricolage Grotesque",sans-serif;color:#0B1A46;letter-spacing:.08em}
.inv-small{font-size:.82rem;color:#4A5677;letter-spacing:0;font-weight:400;font-family:"Atkinson Hyperlegible",Verdana,sans-serif}.inv-lbl{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#86620A}
.inv-meta{display:flex;justify-content:space-between;gap:16px;margin-bottom:16px;flex-wrap:wrap}
.inv-t{width:100%;border-collapse:collapse;margin-bottom:10px}.inv-t th{background:#0B1A46;color:#fff;text-align:left;padding:8px;font-size:.82rem}.inv-t td{padding:8px;border-bottom:1px solid #D3DAEA}.inv-t td:not(:first-child),.inv-t th:not(:first-child){text-align:right;white-space:nowrap}
.inv-sum{margin-left:auto;border-collapse:collapse;min-width:260px}.inv-sum td{padding:5px 8px}.inv-sum td:last-child{text-align:right}.inv-tot td{font-weight:800;font-size:1.1rem;border-top:2px solid #0B1A46}
.inv-box{background:#FFF7DC;border:1px solid #E9C45A;border-radius:10px;padding:12px;margin-top:14px}
.inv-sign{margin-top:22px;width:260px}.inv-sign img{max-height:70px;max-width:240px;display:block}.inv-line{border-top:1.5px solid #0B1736;margin-top:4px}
@media print{body *{visibility:hidden}.inv,.inv *{visibility:visible}.inv{position:absolute;left:0;top:0;max-width:none;border-radius:0}}`;
  return { calc, doc, money, CSS };
});
