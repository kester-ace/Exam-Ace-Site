/* Student ID records: a photo of the student and a photo of a valid ID document.
   Identity.picker(host, opts) draws the "photo + ID" form; Identity.mine/view/find/verify/list talk to the identity function
   (or to this browser's demo accounts). Kester Small */
(function () {
  if (window.Identity) return;
  const LIVE = !!(window.Auth && Auth.live);
  const TYPES = ["School ID", "Passport", "National ID card", "Driver's licence", "Other"];
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* shrink a photo before it leaves the device */
  function shrink(file, max = 1000) {
    return new Promise((ok, bad) => {
      if (!file || !/^image\//.test(file.type)) return bad(new Error("Choose a photo (JPG or PNG)."));
      const url = URL.createObjectURL(file), img = new Image();
      img.onload = () => { const k = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement("canvas"); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); ok(c.toDataURL("image/jpeg", 0.82)); };
      img.onerror = () => bad(new Error("That picture couldn't be opened. Try another one."));
      img.src = url;
    });
  }

  /* ---------- demo accounts in this browser ---------- */
  const DB = () => { try { return JSON.parse(localStorage.getItem("ks-demo-db")) || { users: [] }; } catch (e) { return { users: [] }; } };
  const SAVE = d => { try { localStorage.setItem("ks-demo-db", JSON.stringify(d)); } catch (e) { throw new Error("This browser is out of space for demo photos. Use smaller pictures."); } };
  const rec = u => u ? { user: u.id, name: u.full_name || u.username, email: u.contact_email || "", role: u.role, status: u.id_status || "none", id_type: u.id_type || null, checked_at: u.id_checked_at || null, checked_by: u.id_checked_by || null, note: u.id_note || null, photo: u.id_photo || null, doc: u.id_doc || null } : null;
  async function meId() { const m = await Auth.current(); if (!m) throw new Error("Sign in first."); return m; }
  const demo = {
    async mine() { const m = await meId(); return rec(DB().users.find(u => u.id === m.user.id)); },
    async upload(b) { const m = await meId(), d = DB(), u = d.users.find(x => x.id === m.user.id); if (!u) throw new Error("Sign in first.");
      if (b.kind === "doc") { u.id_doc = b.image; u.id_type = TYPES.includes(b.id_type) ? b.id_type : "Other"; } else u.id_photo = b.image;
      u.id_status = "submitted"; u.id_checked_at = u.id_checked_by = u.id_note = null; SAVE(d); return rec(u); },
    async view(b) { return rec(DB().users.find(u => u.id === b.user)); },
    async find(b) { const em = String(b.email || "").toLowerCase(); return rec(DB().users.find(u => (u.contact_email || "").toLowerCase() === em || (u.email || "").toLowerCase() === em)); },
    async verify(b) { const m = await meId(), d = DB(), u = d.users.find(x => x.id === b.user); if (!u) throw new Error("That student wasn't found.");
      u.id_status = b.status === "verified" ? "verified" : "rejected"; u.id_checked_at = new Date().toISOString(); u.id_checked_by = (m.profile && m.profile.full_name) || "Teacher"; u.id_note = b.note || null; SAVE(d); return rec(u); },
    async list(b) { const st = b.status || "submitted"; return { rows: DB().users.filter(u => (u.role || "student") === "student" && (u.id_status || "none") === st).map(rec) }; }
  };
  async function call(action, body) {
    if (!LIVE) return demo[action](body || {});
    const t = await Auth.token();
    const r = await fetch("/.netlify/functions/identity", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + (t || "") }, body: JSON.stringify(Object.assign({ action }, body || {})) });
    const out = await r.json().catch(() => ({})); if (!r.ok) throw new Error(out.error || "The ID records didn't respond."); return out;
  }

  /* ---------- the form: your photo + your ID ---------- */
  const CSS = `.idp{display:grid;gap:12px}.idp-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}.idp-row>*{min-width:0}
.idp-box{border:1.5px dashed rgba(245,197,66,.55);border-radius:14px;padding:12px;display:grid;gap:8px;background:#0B1A46}
.idp-box b{font-family:"Bricolage Grotesque",sans-serif}.idp-prev{aspect-ratio:4/3;max-height:170px;width:100%;border-radius:10px;background:#060D26;display:grid;place-items:center;overflow:hidden;color:#AEB9DD;font-size:.85rem;text-align:center;padding:6px}
.idp-prev img{width:100%;height:100%;object-fit:contain}.idp label.btn{cursor:pointer;justify-self:start;max-width:100%;white-space:normal}.idp select{width:100%}.idp-st{font-size:.88rem}.idp-st.ok{color:var(--ok,#4FD18B)}.idp-st.bad{color:var(--bad,#FF7A6B)}`;
  function css() { if (document.getElementById("idp-css")) return; const s = document.createElement("style"); s.id = "idp-css"; s.textContent = CSS; document.head.appendChild(s); }
  const ST = { none: "Not added yet", submitted: "Sent · waiting to be checked", verified: "✓ Verified", rejected: "Not verified · please send clearer pictures" };
  /* opts: { pending:true } holds the pictures until save(); otherwise each one uploads straight away */
  function picker(host, opts = {}) {
    css(); const held = {};
    host.innerHTML = `<div class="idp"><p class="idp-st" data-st></p><div class="idp-row">
      <div class="idp-box"><b>Your photo</b><div class="idp-prev" data-pv="photo">A clear photo of your face, like a passport photo.</div><label class="btn ghost sm">📷 Take or choose a photo<input type="file" accept="image/*" capture="user" data-f="photo" hidden></label></div>
      <div class="idp-box"><b>Your ID document</b><div class="idp-prev" data-pv="doc">A photo of a valid ID: school ID, passport, national ID card or driver's licence.</div>
        <select data-t aria-label="Type of ID">${TYPES.map(t => `<option>${t}</option>`).join("")}</select>
        <label class="btn ghost sm">🪪 Take or choose a photo<input type="file" accept="image/*" capture="environment" data-f="doc" hidden></label></div></div>
      <p class="hint">Only your teachers and the administrator can see these. They're used to check it's really you in an exam.</p></div>`;
    const show = (kind, src) => { host.querySelector(`[data-pv="${kind}"]`).innerHTML = src ? `<img alt="${kind === "doc" ? "Your ID document" : "Your photo"}" src="${esc(src)}">` : host.querySelector(`[data-pv="${kind}"]`).innerHTML; };
    const status = r => { const el = host.querySelector("[data-st]"); if (!r) { el.textContent = ""; return; } el.className = "idp-st " + (r.status === "verified" ? "ok" : r.status === "rejected" ? "bad" : ""); el.textContent = "ID check: " + (ST[r.status] || r.status) + (r.note ? " · " + r.note : ""); };
    host.addEventListener("change", async e => {
      const f = e.target.closest("[data-f]"); if (!f || !f.files[0]) return; const kind = f.dataset.f;
      try { const img = await shrink(f.files[0], kind === "doc" ? 1400 : 900); show(kind, img);
        if (opts.pending) { held[kind] = img; opts.onChange && opts.onChange(held); return; }
        const r = await call("upload", { kind, image: img, id_type: host.querySelector("[data-t]").value }); status(r); opts.onSaved && opts.onSaved(r);
      } catch (x) { opts.onError ? opts.onError(x.message) : alert(x.message); }
      f.value = "";
    });
    if (!opts.pending) call("mine").then(r => { if (!r) return; status(r); if (r.photo) show("photo", r.photo); if (r.doc) show("doc", r.doc); if (r.id_type) host.querySelector("[data-t]").value = r.id_type; }).catch(() => { });
    return { held, async save() { const t = host.querySelector("[data-t]").value; let r = null; if (held.photo) r = await call("upload", { kind: "photo", image: held.photo }); if (held.doc) r = await call("upload", { kind: "doc", image: held.doc, id_type: t }); return r; } };
  }

  window.Identity = { TYPES, shrink, picker, mine: () => call("mine"), view: user => call("view", { user }), find: email => call("find", { email }), verify: (user, status, note) => call("verify", { user, status, note }), list: status => call("list", { status }), STATUS: ST };
})();
