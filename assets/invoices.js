/* Invoices and receipts on the site: the admin's fillable invoice (auto-calculated, every amount editable, e-signature,
   "I've checked this amount"), and the student's invoices with proof-of-payment upload. Kester Small */
(function () {
  if (window.Invoices) return;
  const LIVE = !!(window.Auth && Auth.live), C = window.SITE_CONFIG || {}, IC = window.InvoiceCore;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const PAY_INFO = C.paymentInstructions || "Pay by bank transfer or at the office. Use your invoice number as the reference.";
  const plan = id => (C.plans || []).find(p => p.id === id) || null;
  const mailed = (to, subject) => { try { window.dispatchEvent(new CustomEvent("ea-demo-mail", { detail: { to, subject } })); } catch (e) { } };

  /* ---------- demo: this browser ---------- */
  const K = "ea-invoices-demo";
  const D = () => { try { return JSON.parse(localStorage.getItem(K)) || { rows: [] }; } catch (e) { return { rows: [] }; } };
  const W = d => { try { localStorage.setItem(K, JSON.stringify(d)); } catch (e) { throw new Error("This browser is out of space for demo invoices."); } };
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "i" + Date.now().toString(36) + Math.random().toString(36).slice(2));
  const num = (rows, pfx, key) => { const y = new Date().getFullYear(); const n = rows.map(r => r[key]).filter(x => x && x.startsWith(pfx + "-" + y)).map(x => Number(x.split("-").pop())).sort((a, b) => b - a)[0] || 0; return `${pfx}-${y}-${String(n + 1).padStart(4, "0")}`; };
  function items(p, billing) { if (!p) return [{ desc: "Exam Ace Tutorials", qty: 1, unit: 0 }]; return billing === "year" ? [{ desc: `${p.name}: exam-year pass (September to June)`, qty: C.examYearMonths || 8, unit: p.price }] : [{ desc: `${p.name}: one month`, qty: 1, unit: p.price }]; }
  async function who() { const m = await Auth.current(); if (!m) throw new Error("Sign in first."); return m; }
  const demo = {
    async create(b) { const m = await who(), d = D(), p = plan(b.plan) || plan("single");
      const open = d.rows.find(r => r.user_id === m.user.id && r.plan === p.id && ["draft", "sent"].includes(r.status)); if (open) return { id: open.id, number: open.number, existing: true };
      const it = items(p, b.billing), inv = { id: uid(), number: num(d.rows, "EA", "number"), user_id: m.user.id, bill_name: (m.profile && m.profile.full_name) || "", bill_email: (m.profile && m.profile.contact_email) || m.user.email, plan: p.id, billing: b.billing === "year" ? "year" : "month", items: it, discount: 0, tax_pct: 0, total_manual: false, currency: "USD", courses: p.subjects >= 6 ? ["all"] : [], edition: p.teacher ? "teacher" : "student", books: !!p.books, due_date: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10), pay_info: PAY_INFO, status: "draft", checked: false, created_at: new Date().toISOString() };
      inv.total = IC.calc(inv).total; d.rows.unshift(inv); W(d); mailed(C.contactEmail || "you", "Invoice to check: " + inv.number); return { id: inv.id, number: inv.number }; },
    async mine() { const m = await who(); return { rows: D().rows.filter(r => r.user_id === m.user.id && r.status !== "void").map(r => r.status === "draft" ? { id: r.id, number: r.number, status: "draft", plan: r.plan, created_at: r.created_at } : r) }; },
    async proof(b) { const m = await who(), d = D(), inv = d.rows.find(r => r.id === b.id && r.user_id === m.user.id); if (!inv) throw new Error("That invoice wasn't found."); if (!["sent", "proof"].includes(inv.status)) throw new Error("This invoice isn't ready for payment yet.");
      inv.status = "proof"; inv.proof_url = b.file; inv.proof_note = b.note || ""; inv.proof_method = b.method || ""; inv.proof_ref = b.ref || ""; inv.proof_at = new Date().toISOString(); W(d); mailed(C.contactEmail || "you", "Proof of payment: " + inv.number); return { ok: true }; },
    async list(b) { return { rows: D().rows.filter(r => !b.status || r.status === b.status) }; },
    async pending() { const rows = D().rows.filter(r => r.status === "proof"); return { count: rows.length, rows }; },
    async pdf() { throw new Error("PDF invoices work on the live site. In demo mode, use your browser's Print and choose Save as PDF."); },
    async get(b) { return D().rows.find(r => r.id === b.id) || null; },
    async new(b) { const d = D(), inv = Object.assign({ id: uid(), number: num(d.rows, "EA", "number"), items: [{ desc: "Exam Ace Tutorials", qty: 1, unit: 0 }], discount: 0, tax_pct: 0, currency: "USD", courses: [], edition: "student", billing: "month", pay_info: PAY_INFO, due_date: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10), status: "draft", created_at: new Date().toISOString() }, b); delete inv.action; inv.total = IC.calc(inv).total; d.rows.unshift(inv); W(d); return inv; },
    async save(b) { const d = D(), inv = d.rows.find(r => r.id === b.id); if (!inv) throw new Error("Not found."); if (inv.status === "paid") throw new Error("A paid invoice can't be changed."); Object.assign(inv, b); delete inv.action; if (!inv.total_manual) inv.total = IC.calc(inv).auto; W(d); return inv; },
    async send(b) { const d = D(), inv = d.rows.find(r => r.id === b.id); if (!inv.checked) throw new Error("Tick “I've checked this amount” first."); if (!inv.signature) throw new Error("Sign the invoice first."); if (!inv.bill_email) throw new Error("Add the student's email address.");
      inv.status = inv.status === "proof" ? "proof" : "sent"; inv.sent_at = new Date().toISOString(); inv.total = IC.calc(inv).total; W(d); mailed(inv.bill_email, "Your invoice " + inv.number); return inv; },
    async reject_proof(b) { const d = D(), inv = d.rows.find(r => r.id === b.id); inv.status = "sent"; W(d); mailed(inv.bill_email, "We couldn't confirm your payment yet"); return { ok: true }; },
    async void(b) { const d = D(), inv = d.rows.find(r => r.id === b.id); inv.status = "void"; W(d); return { ok: true }; },
    async confirm(b) { const d = D(), inv = d.rows.find(r => r.id === b.id); if (inv.status === "paid") throw new Error("Already confirmed."); if (!inv.signature) throw new Error("Sign the invoice first: your signature goes on the receipt."); if (!(inv.courses || []).length) throw new Error("Choose the course(s) this payment opens.");
      inv.status = "paid"; inv.paid_at = new Date().toISOString(); inv.paid_amount = b.paid_amount !== "" && b.paid_amount != null ? Number(b.paid_amount) : IC.calc(inv).total; inv.receipt_no = num(d.rows, "RC", "receipt_no"); W(d);
      try { const db = JSON.parse(localStorage.getItem("ks-demo-db")); if (db && inv.user_id) { inv.courses.forEach(s => { if (!db.entitlements.some(e => e.user_id === inv.user_id && e.course_slug === s && e.edition === inv.edition)) db.entitlements.push({ user_id: inv.user_id, course_slug: s, edition: inv.edition, source: "manual", books: !!inv.books }); }); localStorage.setItem("ks-demo-db", JSON.stringify(db)); } } catch (e) { }
      mailed(inv.bill_email, "Your receipt " + inv.receipt_no); return inv; }
  };
  async function call(action, body) {
    if (!LIVE) return demo[action](body || {});
    const t = await Auth.token();
    const r = await fetch("/.netlify/functions/invoices", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + (t || "") }, body: JSON.stringify(Object.assign({ action }, body || {})) });
    const out = await r.json().catch(() => ({})); if (!r.ok) throw new Error(out.error || "Invoices didn't respond."); return out;
  }

  /* ---------- shared bits ---------- */
  const CSS = (IC ? IC.CSS : "") + `
.ivx{display:grid;gap:14px}.ivx h3{font-size:1.05rem}.ivx .g2{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
.ivx table.it{width:100%;border-collapse:collapse}.ivx table.it th{text-align:left;font-size:.8rem;color:var(--muted);padding:4px}.ivx table.it td{padding:3px}
.ivx input,.ivx select,.ivx textarea{width:100%;font:inherit;color:#F1F4FF;background:#0B1A46!important;border:1.5px solid rgba(245,197,66,.55);border-radius:10px;padding:7px 9px}
.ivx .num{text-align:right;font-variant-numeric:tabular-nums}.ivx .auto{font-size:.75rem;color:var(--gold)}
.ivx .sum{display:grid;grid-template-columns:1fr 150px;gap:6px 10px;align-items:center;max-width:420px;margin-left:auto}.ivx .sum .tot{font:800 1.2rem "Bricolage Grotesque",sans-serif;color:var(--gold)}
.ivx .sigpad{background:#fff;border-radius:12px;touch-action:none;width:100%;height:150px;display:block;cursor:crosshair}
.ivx .chips{display:flex;gap:8px;flex-wrap:wrap}.ivx .chips label{display:flex;gap:6px;align-items:center;padding:6px 10px;border:1px solid var(--line);border-radius:999px;font-size:.88rem}
.ivx .chips input{width:auto}.ivx .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
dialog.modal#iv-dlg{width:min(960px,calc(100vw - 24px))}#iv-dlg .inner{max-height:calc(100vh - 40px);overflow:auto}
.ivst{font-size:.75rem;font-weight:800;border-radius:999px;padding:2px 9px;border:1px solid currentColor;white-space:nowrap}.ivst.draft{color:var(--muted)}.ivst.sent{color:var(--gold)}.ivst.proof{color:#63B3ED}.ivst.paid{color:var(--ok)}.ivst.void{color:var(--bad)}`;
  function css() { if (document.getElementById("iv-css")) return; const s = document.createElement("style"); s.id = "iv-css"; s.textContent = CSS; document.head.appendChild(s); }
  const ST = { draft: "Needs your check", sent: "Sent · waiting for payment", proof: "Pending approval", paid: "Paid", void: "Cancelled" };
  const STU = { draft: "Being prepared", sent: "Ready to pay", proof: "Pending approval", paid: "Paid", void: "Cancelled" };
  const site = { name: C.siteName || "Exam Ace Tutorials", tagline: C.tagline || "E-learning Ecosystem", email: C.contactEmail || "" };
  const METHODS = ["MoneyGram", "Western Union", "Wire transfer", "Bank deposit", "Cash", "Other"];
  async function downloadPdf(id, btn) {
    const old = btn && btn.textContent; if (btn) { btn.disabled = true; btn.textContent = "Preparing PDF…"; }
    try { const r = await call("pdf", { id }); const bin = atob(r.data), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      const url = URL.createObjectURL(new Blob([u8], { type: "application/pdf" })), a = document.createElement("a"); a.href = url; a.download = r.filename || "invoice.pdf"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    } finally { if (btn) { btn.disabled = false; btn.textContent = old; } }
  }
  /* the "pending approval" notification at the top of the admin page */
  function pendingBar(onOpen) {
    if (!document.getElementById("iv-bar-css")) { const s = document.createElement("style"); s.id = "iv-bar-css"; s.textContent = `.iv-bar{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center;background:linear-gradient(90deg,#F5C542,#FFD766);color:#0A1433;padding:10px 16px;font-weight:700;box-shadow:0 4px 14px rgba(0,0,0,.25)}.iv-bar button{background:#0B1A46;color:#FFD766;border:0;border-radius:999px;padding:7px 16px;font:inherit;font-weight:800;cursor:pointer}.iv-bell{display:inline-grid;place-items:center;min-width:22px;height:22px;padding:0 6px;border-radius:999px;background:#C0392B;color:#fff;font-size:.78rem;font-weight:800;margin-left:8px;vertical-align:middle}`; document.head.appendChild(s); }
    let bar = document.getElementById("iv-bar");
    if (!bar) { bar = document.createElement("div"); bar.id = "iv-bar"; bar.className = "iv-bar"; bar.setAttribute("role", "status"); bar.hidden = true; const top = document.querySelector("header.top"); (top && top.parentNode ? top.parentNode.insertBefore(bar, top.nextSibling) : document.body.prepend(bar)); }
    let last = -1;
    async function check() {
      let r; try { r = await call("pending"); } catch (e) { return; }
      const n = r.count || 0; bar.hidden = !n;
      if (n) { const names = (r.rows || []).slice(0, 3).map(x => esc(x.bill_name || x.number)).join(", ") + (n > 3 ? " and " + (n - 3) + " more" : "");
        bar.innerHTML = `<span>🔔 ${n} payment${n > 1 ? "s" : ""} pending approval: ${names}</span><button type="button">Review now</button>`; bar.querySelector("button").onclick = onOpen; }
      const h = document.getElementById("ivh"); if (h) { const b = h.querySelector(".iv-bell"); if (n) { (b || h.appendChild(Object.assign(document.createElement("span"), { className: "iv-bell" }))).textContent = n; } else if (b) b.remove(); }
      if (last >= 0 && n > last) { try { document.title = "(" + n + ") Pending approval · " + document.title.replace(/^\(\d+\) Pending approval · /, ""); } catch (e) { } }
      if (!n) document.title = document.title.replace(/^\(\d+\) Pending approval · /, "");
      last = n;
    }
    check(); setInterval(check, 60000); document.addEventListener("visibilitychange", () => { if (!document.hidden) check(); });
    return { check };
  }
  function readFile(f) { return new Promise((ok, bad) => { if (!f) return bad(new Error("Choose a file.")); if (f.size > 8 * 1024 * 1024) return bad(new Error("That file is over 8 MB.")); if (/^image\//.test(f.type) && window.Identity) return Identity.shrink(f, 1600).then(ok, bad); const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = () => bad(new Error("That file couldn't be read.")); r.readAsDataURL(f); }); }

  /* ---------- the signature pad ---------- */
  function sigPad(cv, onChange) {
    const x = cv.getContext("2d"); let draw = false, last = null, dirty = false;
    const fit = () => { const r = cv.getBoundingClientRect(); const img = dirty ? cv.toDataURL() : null; cv.width = Math.max(300, r.width * 2); cv.height = 300; x.lineWidth = 5; x.lineCap = "round"; x.lineJoin = "round"; x.strokeStyle = "#0B1736"; if (img) { const i = new Image(); i.onload = () => x.drawImage(i, 0, 0, cv.width, cv.height); i.src = img; } };
    fit();
    const pt = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]; };
    cv.addEventListener("pointerdown", e => { draw = true; last = pt(e); cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointermove", e => { if (!draw) return; const p = pt(e); x.beginPath(); x.moveTo(...last); x.lineTo(...p); x.stroke(); last = p; dirty = true; });
    const up = () => { if (draw) { draw = false; onChange && onChange(); } }; cv.addEventListener("pointerup", up); cv.addEventListener("pointerleave", up);
    return {
      clear() { x.clearRect(0, 0, cv.width, cv.height); dirty = false; onChange && onChange(); },
      typed(name) { const font = `italic ${Math.round(cv.height * 0.38)}px "Brush Script MT","Segoe Script","Snell Roundhand",cursive`; x.font = font; const w = x.measureText(name).width + 60; if (cv.width < w) { cv.width = w; x.lineWidth = 5; x.lineCap = "round"; x.strokeStyle = "#0B1736"; } x.clearRect(0, 0, cv.width, cv.height); x.fillStyle = "#0B1736"; x.font = font; x.textBaseline = "middle"; x.fillText(name, 20, cv.height / 2); dirty = true; onChange && onChange(); },
      refit() { if (!dirty) fit(); },
      load(src) { if (!src) return; const i = new Image(); i.onload = () => { x.clearRect(0, 0, cv.width, cv.height); x.drawImage(i, 0, 0, cv.width, cv.height); dirty = true; }; i.src = src; },
      get empty() { return !dirty; }, data() { return dirty ? cv.toDataURL("image/png") : null; }
    };
  }

  /* ---------- the admin's invoices (admin.html) ---------- */
  function adminSection(host, opt = {}) {
    css(); const toast = opt.toast || (m => alert(m));
    host.innerHTML = `<div class="tools"><h2 id="ivh" style="margin-right:auto">Invoices and receipts</h2><select id="iv-f" aria-label="Show"><option value="">All invoices</option><option value="draft">Needs your check</option><option value="sent">Sent · waiting for payment</option><option value="proof">Pending approval</option><option value="paid">Paid</option></select><button class="btn go sm" type="button" id="iv-new">+ New invoice</button></div>
      <p class="hint">When someone registers, their invoice is made here automatically and you're emailed. Check the amounts (worked out for you, all editable), sign, tick that you've checked it, then send. When they upload proof of payment you're emailed at examacetutorials@gmail.com and it shows here as <b>Pending approval</b>. Approve it and the invoice marked PAID is emailed to them as a PDF, added to their dashboard, and their course opens.</p>
      <div class="tbl"><table><thead><tr><th>Invoice</th><th>Student</th><th>Total</th><th>Status</th><th></th></tr></thead><tbody id="iv-body"><tr><td colspan="5" class="muted">Loading…</td></tr></tbody></table></div>
      <dialog class="modal" id="iv-dlg" aria-labelledby="iv-t"><div class="box"><div class="inner"><button class="x" type="button" data-ivx aria-label="Close">×</button><div id="iv-ed"></div></div></div></dialog>`;
    const $ = s => host.querySelector(s);
    let load = async function () {
      try { const r = await call("list", { status: $("#iv-f").value });
        $("#iv-body").innerHTML = r.rows.length ? r.rows.map(x => `<tr><td><b>${esc(x.number)}</b><div class="hint">${esc(new Date(x.created_at).toLocaleDateString())}</div></td><td>${esc(x.bill_name || "—")}<div class="hint">${esc(x.bill_email || "")}</div></td><td>${IC.money(x.total, x.currency)}</td><td><span class="ivst ${x.status}">${esc(ST[x.status] || x.status)}</span></td><td><button class="btn ${x.status === "draft" || x.status === "proof" ? "go" : "ghost"} sm" type="button" data-ivo="${esc(x.id)}">${x.status === "draft" ? "Check and sign" : x.status === "proof" ? "Review payment" : "Open"}</button></td></tr>`).join("") : '<tr><td colspan="5" class="muted">No invoices here yet.</td></tr>';
      } catch (e) { $("#iv-body").innerHTML = `<tr><td colspan="5" class="muted">${esc(e.message)}</td></tr>`; }
    };
    host.addEventListener("click", async e => {
      const o = e.target.closest("[data-ivo]"); if (o) { try { edit(await call("get", { id: o.dataset.ivo })); } catch (x) { toast(x.message); } }
      if (e.target.closest("[data-ivx]")) { $("#iv-dlg").close(); load(); }
    });
    $("#iv-f").onchange = () => load();
    const bar = pendingBar(() => { $("#iv-f").value = "proof"; load(); host.scrollIntoView({ behavior: "smooth" }); });
    const reload = load; load = async () => { await reload(); bar.check(); };
    $("#iv-new").onclick = async () => { try { edit(await call("new", { bill_name: "", bill_email: "" })); } catch (x) { toast(x.message); } };

    function edit(inv) {
      const ed = $("#iv-ed"), paid = inv.status === "paid", P = plan(inv.plan), saved = (() => { try { return localStorage.getItem("ea-my-signature"); } catch (e) { return null; } })();
      const courseBoxes = (C.courses || []).map(c => `<label><input type="checkbox" value="${esc(c.slug)}" ${(inv.courses || []).includes(c.slug) || (inv.courses || []).includes("all") ? "checked" : ""} ${paid ? "disabled" : ""}> ${esc(c.level + " " + c.title)}</label>`).join("") + `<label><input type="checkbox" value="all" ${(inv.courses || []).includes("all") ? "checked" : ""} ${paid ? "disabled" : ""}> Every course</label>`;
      ed.innerHTML = `<div class="ivx">
        <div class="head"><div><p class="eyebrow">${esc(ST[inv.status] || inv.status)}</p><h2 id="iv-t">Invoice ${esc(inv.number)}</h2></div>${P ? `<span class="chip">${esc(P.name)} · ${inv.billing === "year" ? "exam-year pass" : "monthly"}</span>` : ""}</div>
        ${inv.status === "proof" ? `<div class="panel" style="padding:12px;display:grid;gap:8px"><h3>Proof of payment</h3>${inv.proof_url ? (/^data:application\/pdf|\.pdf/i.test(inv.proof_url) ? `<a class="btn ghost sm" href="${esc(inv.proof_url)}" target="_blank" rel="noopener">Open the PDF</a>` : `<img src="${esc(inv.proof_url)}" alt="Proof of payment" style="max-width:100%;max-height:360px;border-radius:10px;background:#fff">`) : '<p class="hint">The file couldn\'t be opened.</p>'}<p class="hint">Paid by <b>${esc(inv.proof_method || "—")}</b> · MTCN / reference <b class="selectable">${esc(inv.proof_ref || "—")}</b>${inv.proof_at ? " · uploaded " + esc(new Date(inv.proof_at).toLocaleString()) : ""}</p>${inv.proof_note ? `<p class="hint">Their note: ${esc(inv.proof_note)}</p>` : ""}<p class="hint">Check the amount and MTCN / reference against your MoneyGram, Western Union or bank record before approving.</p>
          <div class="row"><label style="max-width:220px">Amount received<input id="iv-paid" class="num" type="number" step="0.01" min="0" value="${IC.calc(inv).total}"></label><button class="btn go" type="button" id="iv-confirm">✓ Approve: email the PAID invoice and open the course</button><button class="btn ghost" type="button" id="iv-rej">Reject proof</button></div></div>` : ""}
        <div class="g2"><label>Bill to<input id="iv-n" value="${esc(inv.bill_name || "")}" ${paid ? "disabled" : ""}></label><label>Email<input id="iv-e" type="email" value="${esc(inv.bill_email || "")}" ${paid ? "disabled" : ""}></label><label>Due date<input id="iv-due" type="date" value="${esc(inv.due_date || "")}" ${paid ? "disabled" : ""}></label></div>
        <div><h3>Items</h3><table class="it"><thead><tr><th>Description</th><th style="width:80px">Qty</th><th style="width:120px">Unit price</th><th style="width:120px" class="num">Amount</th><th style="width:40px"></th></tr></thead><tbody id="iv-items"></tbody></table>${paid ? "" : '<button class="btn ghost sm" type="button" id="iv-add">+ Add a line</button>'}</div>
        <div class="sum"><span>Subtotal <span class="auto">auto</span></span><b class="num" id="iv-sub"></b>
          <span>Discount</span><input id="iv-disc" class="num" type="number" step="0.01" min="0" value="${Number(inv.discount) || 0}" ${paid ? "disabled" : ""}>
          <span>Tax %</span><input id="iv-tax" class="num" type="number" step="0.01" min="0" value="${Number(inv.tax_pct) || 0}" ${paid ? "disabled" : ""}>
          <span>Total due <span class="auto" id="iv-mode"></span></span><input id="iv-tot" class="num tot" type="number" step="0.01" min="0" ${paid ? "disabled" : ""}>
          <span></span><button class="btn ghost sm" type="button" id="iv-auto" ${paid ? "hidden" : ""}>↺ Use the calculated total</button></div>
        <div><h3>Opens these courses when paid</h3><div class="chips" id="iv-c">${courseBoxes}</div><div class="row" style="margin-top:6px"><label style="max-width:200px">Edition<select id="iv-ed2" ${paid ? "disabled" : ""}><option value="student" ${inv.edition !== "teacher" ? "selected" : ""}>Student's Version</option><option value="teacher" ${inv.edition === "teacher" ? "selected" : ""}>Teacher's Version</option></select></label><label style="max-width:200px">Access<select id="iv-bill" ${paid ? "disabled" : ""}><option value="month" ${inv.billing !== "year" ? "selected" : ""}>One month</option><option value="year" ${inv.billing === "year" ? "selected" : ""}>Exam year (to 1 July)</option></select></label><label class="row" style="gap:6px"><input type="checkbox" id="iv-books" style="width:auto" ${inv.books ? "checked" : ""} ${paid ? "disabled" : ""}> Flipbook textbook</label></div></div>
        <div class="g2"><label>How to pay<textarea id="iv-pay" rows="3" ${paid ? "disabled" : ""}>${esc(inv.pay_info || PAY_INFO)}</textarea></label><label>Note on the invoice (optional)<textarea id="iv-notes" rows="3" ${paid ? "disabled" : ""}>${esc(inv.notes || "")}</textarea></label></div>
        <div><h3>Your e-signature</h3><canvas class="sigpad" id="iv-sig" aria-label="Sign here with your finger, pen or mouse"></canvas>
          <div class="row" style="margin-top:6px">${paid ? "" : `<button class="btn ghost sm" type="button" id="iv-sclear">Clear</button><input id="iv-sname" placeholder="Or type your name" value="${esc(inv.signed_by || "Kester Small")}" style="max-width:220px"><button class="btn ghost sm" type="button" id="iv-stype">Use typed name</button>${saved ? '<button class="btn ghost sm" type="button" id="iv-ssaved">Use my saved signature</button>' : ""}<label class="row" style="gap:6px"><input type="checkbox" id="iv-skeep" style="width:auto" checked> Save it for next time</label>`}</div></div>
        <label class="row" style="gap:8px;font-weight:700"><input type="checkbox" id="iv-chk" style="width:auto" ${inv.checked ? "checked" : ""} ${paid ? "disabled" : ""}> I've checked this amount and it's correct</label>
        <div class="msg bad" id="iv-err" hidden></div>
        <div class="row">${paid ? "" : `<button class="btn ghost" type="button" id="iv-save">Save</button><button class="btn go" type="button" id="iv-send">${inv.status === "draft" ? "Sign and send to the student" : "Send again"}</button>`}<button class="btn ghost" type="button" id="iv-view">👁 Preview / print</button>${inv.status !== "draft" ? '<button class="btn ghost" type="button" id="iv-pdf">⬇ Download PDF</button>' : ""}${paid ? '<button class="btn ghost" type="button" id="iv-rec">🧾 Receipt</button>' : ""}${!paid && inv.status !== "void" ? '<button class="btn ghost" type="button" id="iv-void">Cancel invoice</button>' : ""}</div>
        <div id="iv-prev"></div></div>`;
      const q = s => ed.querySelector(s);
      let list = (inv.items || []).map(i => Object.assign({}, i)), manual = !!inv.total_manual;
      const rowsHtml = () => list.map((i, k) => `<tr><td><input data-k="${k}" data-f="desc" value="${esc(i.desc)}" ${paid ? "disabled" : ""}></td><td><input class="num" data-k="${k}" data-f="qty" type="number" min="0" step="1" value="${i.qty}" ${paid ? "disabled" : ""}></td><td><input class="num" data-k="${k}" data-f="unit" type="number" min="0" step="0.01" value="${i.unit}" ${paid ? "disabled" : ""}></td><td class="num" data-line="${k}"></td><td>${paid ? "" : `<button class="btn ghost sm" type="button" data-del="${k}" aria-label="Remove line">×</button>`}</td></tr>`).join("");
      const cur = () => ({ items: list, discount: q("#iv-disc").value, tax_pct: q("#iv-tax").value, total: q("#iv-tot").value, total_manual: manual, currency: inv.currency });
      function recalc() { const c = IC.calc(cur()); c.items.forEach((i, k) => { const td = ed.querySelector(`[data-line="${k}"]`); if (td) td.textContent = IC.money(i.line, inv.currency); }); q("#iv-sub").textContent = IC.money(c.subtotal, inv.currency); if (!manual) q("#iv-tot").value = c.auto.toFixed(2); q("#iv-mode").textContent = manual ? "changed by you (calculated: " + IC.money(c.auto, inv.currency) + ")" : "auto"; }
      function drawRows() { q("#iv-items").innerHTML = rowsHtml(); recalc(); }
      q("#iv-tot").value = Number(inv.total || 0).toFixed(2); drawRows();
      ed.addEventListener("input", e => { const f = e.target.dataset.f; if (f) { list[+e.target.dataset.k][f] = f === "desc" ? e.target.value : Number(e.target.value); recalc(); }
        if (e.target.id === "iv-disc" || e.target.id === "iv-tax") recalc(); if (e.target.id === "iv-tot") { manual = true; recalc(); } if (e.target.id !== "iv-chk") { const c = q("#iv-chk"); if (c && c.checked && !paid && e.target.closest(".it,.sum")) { c.checked = false; } } });
      ed.addEventListener("click", e => { const d = e.target.closest("[data-del]"); if (d) { list.splice(+d.dataset.del, 1); drawRows(); } });
      const pad = sigPad(q("#iv-sig")); if (inv.signature) setTimeout(() => pad.load(inv.signature), 50);
      const err = t => { q("#iv-err").textContent = t || ""; q("#iv-err").hidden = !t; };
      if (!paid) {
        q("#iv-add").onclick = () => { list.push({ desc: "", qty: 1, unit: 0 }); drawRows(); };
        q("#iv-auto").onclick = () => { manual = false; recalc(); };
        q("#iv-sclear").onclick = () => pad.clear(); q("#iv-stype").onclick = () => pad.typed(q("#iv-sname").value || "Kester Small");
        if (q("#iv-ssaved")) q("#iv-ssaved").onclick = () => pad.load(saved);
      }
      const body = () => { const sig = pad.data(); if (sig && q("#iv-skeep") && q("#iv-skeep").checked) { try { localStorage.setItem("ea-my-signature", sig); } catch (e) { } }
        let cs = Array.from(ed.querySelectorAll("#iv-c input:checked")).map(i => i.value); if (cs.includes("all")) cs = ["all"];
        return { id: inv.id, bill_name: q("#iv-n").value, bill_email: q("#iv-e").value, due_date: q("#iv-due").value, items: list, discount: Number(q("#iv-disc").value) || 0, tax_pct: Number(q("#iv-tax").value) || 0, total: Number(q("#iv-tot").value) || 0, total_manual: manual,
          courses: cs, edition: q("#iv-ed2").value, billing: q("#iv-bill").value, books: q("#iv-books").checked, pay_info: q("#iv-pay").value, notes: q("#iv-notes").value, checked: q("#iv-chk").checked, signature: sig, signed_by: (q("#iv-sname") && q("#iv-sname").value) || inv.signed_by || "Kester Small" }; };
      const save = async () => { err(""); const r = await call("save", body()); Object.assign(inv, r); return r; };
      if (!paid) {
        q("#iv-save").onclick = async () => { try { await save(); toast("Saved."); } catch (x) { err(x.message); } };
        q("#iv-send").onclick = async () => { try { if (pad.empty) throw new Error("Sign the invoice first: draw your signature or use your typed name."); if (!q("#iv-chk").checked) throw new Error("Tick “I've checked this amount” first."); await save(); const r = await call("send", { id: inv.id }); Object.assign(inv, r); toast("Invoice " + inv.number + " emailed to " + inv.bill_email + "."); $("#iv-dlg").close(); load(); } catch (x) { err(x.message); } };
        if (q("#iv-void")) q("#iv-void").onclick = async () => { const b = q("#iv-void"); if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = "Choose again to cancel it"; return; } try { await call("void", { id: inv.id }); $("#iv-dlg").close(); load(); } catch (x) { err(x.message); } };
      }
      if (q("#iv-confirm")) q("#iv-confirm").onclick = async () => { try { await save(); const r = await call("confirm", { id: inv.id, paid_amount: q("#iv-paid").value }); Object.assign(inv, r); toast("Approved. The PAID invoice (receipt " + r.receipt_no + ") was emailed and the courses are open."); edit(inv); load(); } catch (x) { err(x.message); } };
      if (q("#iv-rej")) q("#iv-rej").onclick = async () => { const note = prompt("What should the student be told?", "The proof you sent couldn't be matched to a payment. Please check it and upload it again."); if (note === null) return; try { await call("reject_proof", { id: inv.id, note }); toast("The student has been emailed."); $("#iv-dlg").close(); load(); } catch (x) { err(x.message); } };
      q("#iv-view").onclick = () => { const b = body(); q("#iv-prev").innerHTML = `<div style="margin-top:10px">${IC.doc(Object.assign({}, inv, b, { signature: b.signature || inv.signature }), "invoice", site)}</div><div class="row" style="margin-top:8px"><button class="btn ghost sm" type="button" onclick="window.print()">🖨 Print or save as PDF</button></div>`; q("#iv-prev").scrollIntoView({ behavior: "smooth" }); };
      if (q("#iv-pdf")) q("#iv-pdf").onclick = async e => { try { await downloadPdf(inv.id, e.currentTarget); } catch (x) { err(x.message); } };
      if (q("#iv-rec")) q("#iv-rec").onclick = () => { q("#iv-prev").innerHTML = `<div style="margin-top:10px">${IC.doc(inv, "receipt", site)}</div><div class="row" style="margin-top:8px"><button class="btn ghost sm" type="button" onclick="window.print()">🖨 Print or save as PDF</button></div>`; };
      if (!$("#iv-dlg").open) $("#iv-dlg").showModal();
      requestAnimationFrame(() => { pad.refit(); if (inv.signature) pad.load(inv.signature); });
    }
    load(); if (location.hash === "#invoices") setTimeout(() => host.scrollIntoView({ behavior: "smooth" }), 600);
    return { load };
  }

  /* ---------- the student's invoices (dashboard) ---------- */
  function studentPanel(host, opt = {}) {
    css(); const toast = opt.toast || (m => alert(m));
    async function load() {
      let r; try { r = await call("mine"); } catch (e) { host.innerHTML = `<p class="hint">${esc(e.message)}</p>`; return; }
      host.innerHTML = r.rows.length ? `<ul class="log">${r.rows.map(x => `<li><span><b>${esc(x.number)}</b>${x.status !== "draft" ? " · " + IC.money(x.total, x.currency) : ""}<br><span class="hint">${esc(STU[x.status] || x.status)}</span></span><span class="row" style="gap:6px">${x.status === "draft" ? "" : `<button class="btn ${x.status === "sent" ? "go" : "ghost"} sm" type="button" data-ivs="${esc(x.id)}">${x.status === "sent" ? "Pay / upload proof" : "View"}</button><button class="btn ghost sm" type="button" data-ivp="${esc(x.id)}" title="Download the invoice as a PDF">⬇ PDF</button>`}</span></li>`).join("")}</ul><div id="iv-one"></div>` : '<p class="hint">No invoices yet.</p>';
      host.querySelectorAll("[data-ivs]").forEach(b => b.onclick = () => show(r.rows.find(x => x.id === b.dataset.ivs)));
      host.querySelectorAll("[data-ivp]").forEach(b => b.onclick = async () => { try { await downloadPdf(b.dataset.ivp, b); } catch (x) { toast(x.message); } });
    }
    function show(inv) {
      const box = host.querySelector("#iv-one"), paid = inv.status === "paid";
      box.innerHTML = `<div style="margin-top:12px;overflow:auto">${IC.doc(inv, paid ? "receipt" : "invoice", site)}</div>
        ${inv.status === "sent" ? `<div class="ivx" style="margin-top:10px"><h3>Upload your proof of payment</h3><p class="hint">A photo or PDF of your MoneyGram or Western Union receipt, wire confirmation or deposit slip.</p>
          <label>How did you pay?<select id="iv-pm">${METHODS.map(x => `<option>${x}</option>`).join("")}</select></label>
          <label>MTCN / transfer reference number<input id="iv-pr" placeholder="e.g. the 10-digit MTCN on your receipt" autocomplete="off"></label>
          <label>Receipt (photo or PDF)<input type="file" id="iv-pf" accept="image/*,application/pdf"></label>
          <input id="iv-pn" placeholder="Note (optional), e.g. sent from my mother's name"><button class="btn go sm" type="button" id="iv-pgo">Send my proof of payment</button></div>` : ""}
        ${inv.status === "proof" ? '<p class="hint" style="margin-top:8px"><b>Pending approval.</b> Your proof of payment has been sent. Your invoice marked PAID will be emailed to you and appear here once it\'s approved.</p>' : ""}
        <div class="row" style="margin-top:8px"><button class="btn ghost sm" type="button" id="iv-dl">⬇ Download PDF</button></div>`;
      box.querySelector("#iv-dl").onclick = async e => { try { await downloadPdf(inv.id, e.currentTarget); } catch (x) { toast(x.message); } };
      const go = box.querySelector("#iv-pgo"); if (go) go.onclick = async () => { go.disabled = true; try { const f = await readFile(box.querySelector("#iv-pf").files[0]); const ref = box.querySelector("#iv-pr").value.trim(), method = box.querySelector("#iv-pm").value; if (!ref && /MoneyGram|Western Union|Wire/.test(method)) throw new Error("Type the MTCN / transfer reference number from your receipt.");
          await call("proof", { id: inv.id, file: f, note: box.querySelector("#iv-pn").value, method, ref }); toast("Sent. Your payment is pending approval: you'll get your PAID invoice by email once it's approved."); load(); } catch (x) { toast(x.message); go.disabled = false; } };
      box.scrollIntoView({ behavior: "smooth" });
    }
    load(); return { load };
  }

  window.Invoices = { create: (planId, billing) => call("create", { plan: planId, billing }), adminSection, studentPanel, call };
})();
