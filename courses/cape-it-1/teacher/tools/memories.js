/* My Memories: a private photo scrapbook and journal. Photos stay in this browser (IndexedDB), never uploaded. */
(function () {
  const CSS = `
.me-tip[hidden],#me-tip[hidden]{display:none}
.me-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.me-priv{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:16px;border:1px solid var(--line);background:var(--soft-gold)}
.me-priv b{color:var(--gold)}
.me-priv .me-lock{font-size:1.5rem;line-height:1}
.me-warn{border-color:var(--bad);background:var(--soft-bad)}
.me-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between}
.me-bar .search{flex:1 1 220px;min-width:0;width:auto}
.me-file{display:inline-flex;align-items:center;gap:6px;position:relative}
.me-file:focus-within{outline:3px solid var(--gold);outline-offset:2px}
.me-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:26px 22px;perspective:1200px;padding:6px 4px 10px}
.me-pol{position:relative;display:flex;flex-direction:column;gap:6px;padding:10px 10px 14px;background:linear-gradient(180deg,#fffdf6,#f4eedd);color:#1f1a10;border:0;border-radius:4px;text-align:left;
  transform:rotate(var(--r,0deg)) rotateX(5deg);transform-style:preserve-3d;box-shadow:0 1px 0 #fff inset,0 18px 28px -14px rgba(0,0,0,.85),0 4px 0 #d9cfb4,0 6px 10px rgba(0,0,0,.35);transition:transform .25s,box-shadow .25s;min-width:0}
.me-pol:hover,.me-pol:focus-visible{transform:rotate(0) translateY(-6px) rotateX(0) scale(1.03);box-shadow:0 1px 0 #fff inset,0 26px 36px -14px rgba(0,0,0,.9),0 4px 0 #d9cfb4}
.me-pol::before{content:"";position:absolute;top:-10px;left:50%;width:76px;height:22px;margin-left:-38px;background:rgba(255,215,102,.55);transform:rotate(calc(var(--r,0deg) * -2));box-shadow:0 1px 2px rgba(0,0,0,.25)}
.me-ph{display:block;aspect-ratio:1;width:100%;background:#1a1a22;overflow:hidden;border-radius:2px;position:relative}
.me-ph img{width:100%;height:100%;object-fit:cover;display:block}
.me-note{display:flex;align-items:center;justify-content:center;padding:12px;background:repeating-linear-gradient(180deg,#fffdf6 0 25px,#c9d6f0 25px 26px);color:#28304a;font:1rem/1.6 "Segoe Print","Bradley Hand","Chalkboard SE","Comic Sans MS",cursive;text-align:center;overflow:hidden}
.me-cap{font:700 1.02rem/1.25 "Segoe Print","Bradley Hand","Chalkboard SE","Comic Sans MS",cursive;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.me-sub{font-size:.8rem;color:#5d5340;display:flex;justify-content:space-between;gap:6px}
.me-badge{position:absolute;right:6px;top:6px;background:rgba(10,20,51,.85);color:#FFE38A;border-radius:99px;padding:1px 8px;font-size:.78rem;font-weight:700}
.me-empty{text-align:center;display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px 8px}
.me-drop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;padding:22px 14px;border:2px dashed var(--gold);border-radius:16px;background:var(--soft-gold);cursor:pointer;transition:background .2s}
.me-drop.over,.me-drop:focus-within{background:rgba(255,215,102,.3);outline:3px solid var(--gold);outline-offset:2px}
.me-drop .me-big{font-size:2rem}
.me-thumbs{display:flex;flex-wrap:wrap;gap:10px}
.me-th{position:relative;width:86px;height:86px;border-radius:10px;overflow:hidden;border:2px solid var(--line);background:#111}
.me-th img{width:100%;height:100%;object-fit:cover}
.me-th button{position:absolute;right:3px;top:3px;width:28px;height:28px;border-radius:50%;border:0;background:rgba(0,0,0,.75);color:#fff;font-weight:700}
.me-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,220px);gap:14px}
.me-form input[type=text],.me-form input[type=date],.me-ta,.me-tagin{width:100%;border:2px solid var(--line);border-radius:12px;padding:10px 12px;font:inherit;background:var(--surface);color:var(--ink);min-width:0}
.me-ta{min-height:190px;resize:vertical;line-height:1.55}
.me-mood{font-size:1.25rem;min-width:44px}
.me-prompts{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.me-prompt{text-align:left;display:flex;flex-direction:column;gap:4px;padding:12px;border-radius:14px;border:1px solid var(--line);background:var(--raise);color:var(--ink)}
.me-prompt b{font-family:var(--f-display)}
.me-prompt span{font-size:.84rem;color:var(--muted)}
.me-det{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:20px;align-items:start}
.me-frame{background:linear-gradient(180deg,#fffdf6,#f4eedd);padding:12px 12px 16px;border-radius:4px;box-shadow:0 18px 30px -14px rgba(0,0,0,.85),0 4px 0 #d9cfb4;transform:rotate(-1.2deg)}
.me-frame img{width:100%;max-height:70vh;object-fit:contain;background:#14141a;display:block}
.me-text{white-space:pre-wrap;overflow-wrap:anywhere}
.me-tl{position:relative;display:flex;flex-direction:column;gap:12px;padding-left:22px;border-left:3px solid var(--gold);margin-left:8px}
.me-mon{font-family:var(--f-display);font-size:1.2rem;color:var(--gold);position:relative;margin-top:6px}
.me-mon::before{content:"";position:absolute;left:-31px;top:.35em;width:15px;height:15px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 4px var(--bg)}
.me-tli{display:grid;grid-template-columns:76px minmax(0,1fr);gap:12px;align-items:center;text-align:left;padding:10px;border-radius:14px;border:1px solid var(--line);background:var(--surface);color:var(--ink);box-shadow:var(--shadow)}
.me-tli .me-ph{width:76px;height:76px;aspect-ratio:auto;border-radius:10px}
.me-tli .me-snip{color:var(--muted);font-size:.88rem;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.me-show{position:relative;border-radius:18px;overflow:hidden;background:#07091a;border:1px solid var(--line);min-height:240px;display:flex;align-items:center;justify-content:center}
.me-show img{width:100%;height:min(62vh,560px);object-fit:contain;display:block;animation:me-fade .6s}
.me-show .me-note{width:100%;height:min(50vh,420px)}
.me-showcap{position:absolute;left:0;right:0;bottom:0;padding:28px 16px 12px;background:linear-gradient(180deg,transparent,rgba(0,0,0,.82));color:#fff}
.me-showcap h3{color:#FFE38A}
@keyframes me-fade{from{opacity:.2}to{opacity:1}}
.me-conf{display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:12px;border-radius:12px;background:var(--soft-bad);border:1px solid var(--bad)}
@media (max-width:700px){.me-form,.me-det{grid-template-columns:minmax(0,1fr)}.me-frame{transform:none}}
@media (max-width:480px){.me-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 12px}.me-pol{padding:7px 7px 10px}.me-cap{font-size:.9rem}.me-sub{font-size:.72rem;flex-direction:column;gap:0}.me-pol::before{width:50px;margin-left:-25px}}
@media (prefers-reduced-motion:reduce){.me-pol,.me-pol:hover,.me-pol:focus-visible{transition:none;transform:rotate(var(--r,0deg))}.me-show img{animation:none}.me-frame{transform:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  const TAGS = ['Class trip', 'Carnival', 'Friends', 'Achievements', 'Family', 'Sports', 'School life', 'Culture', 'Beach'];
  const MOODS = [['😊', 'Happy'], ['😂', 'Funny'], ['🥰', 'Loved'], ['😎', 'Cool'], ['🤩', 'Excited'], ['😌', 'Calm'], ['🙏', 'Grateful'], ['🏆', 'Proud'], ['😢', 'Sad'], ['😤', 'Determined']];
  const PROMPTS = {
    senses: { t: 'Five senses', d: 'Descriptive writing: let a reader experience the moment.', s: 'I saw …\nI heard …\nI smelled …\nI tasted …\nI felt (touch) …\n', tip: 'Descriptive writing: swap each … for one concrete, specific detail. Use vivid verbs and precise nouns rather than piling up adjectives.' },
    journal: { t: 'Reflective journal', d: 'Reflect on what it meant to you and what you learned.', s: 'What happened: …\nHow I felt, and why: …\nWhat it taught me: …\nWhat I would do next time: …\n', tip: 'Reflective writing: use the first person and a thoughtful register. Explain why you felt as you did, not just what happened.' },
    narrative: { t: 'Short narrative', d: 'Tell it as a story with a clear main point.', s: 'Main point (one sentence): …\nOpening hook: …\nWhat happened next: …\nTurning point: …\nEnding that links back to my main point: …\n', tip: 'Narrative writing: decide your main point first, then pick only the events that build towards it. Open with a hook and end by echoing the point.' }
  };
  const MAXPH = 8, DBN = 'cape-cs-memories', STORE = 'memories';

  /* ---------------- state ---------------- */
  let API = null, DB = null, mode = 'loading', why = '', items = [], loaded = false, loading = false;
  let draft = null, q = '', tagF = '', slide = 0, slidePlay = !reduced(), slideInt = null, confirmId = null, photoIdx = 0, tipK = '', lastView = null;
  function reduced() { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } }
  const esc = s => API ? API.esc(s) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const newId = () => 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const prettyDate = s => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ''); return m ? `${+m[3]} ${MON[+m[2] - 1]} ${m[1]}` : (s || ''); };
  const tilt = id => { let h = 0; for (const c of String(id)) h = (h * 31 + c.charCodeAt(0)) | 0; return ((Math.abs(h) % 70) / 10 - 3.5).toFixed(1) + 'deg'; };
  const sorted = () => items.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.created || 0) - (a.created || 0));
  function filtered() {
    const k = q.trim().toLowerCase();
    return sorted().filter(m => (!tagF || (m.tags || []).includes(tagF)) && (!k || [m.title, m.text, (m.tags || []).join(' '), prettyDate(m.date)].join(' ').toLowerCase().includes(k)));
  }

  /* ---------------- storage (IndexedDB with in-memory fallback) ---------------- */
  function openDB() {
    return new Promise((res, rej) => {
      let done = false; const fin = (f, v) => { if (!done) { done = true; f(v); } };
      setTimeout(() => fin(rej, new Error('timeout')), 3000);
      try {
        if (!window.indexedDB) return fin(rej, new Error('IndexedDB is not available'));
        const r = indexedDB.open(DBN, 1);
        r.onupgradeneeded = () => { const db = r.result; if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' }); };
        r.onsuccess = () => fin(res, r.result);
        r.onerror = () => fin(rej, r.error || new Error('open failed'));
        r.onblocked = () => fin(rej, new Error('blocked'));
      } catch (e) { fin(rej, e); }
    });
  }
  function tx(kind, fn) {
    return new Promise((res, rej) => {
      try { const t = DB.transaction(STORE, kind), s = t.objectStore(STORE), r = fn(s); t.oncomplete = () => res(r && r.result); t.onerror = () => rej(t.error); t.onabort = () => rej(t.error || new Error('aborted')); } catch (e) { rej(e); }
    });
  }
  const clean = m => ({ id: m.id, title: m.title, date: m.date, text: m.text, tags: m.tags || [], mood: m.mood || '', created: m.created, updated: m.updated, photos: (m.photos || []).map(p => ({ blob: p.blob, w: p.w || 0, h: p.h || 0 })) });
  async function dbPut(m) { if (DB) { try { await tx('readwrite', s => s.put(clean(m))); return true; } catch (e) { fallback('Saving failed: ' + (e && e.message || e)); } } return false; }
  async function dbDel(id) { if (DB) { try { await tx('readwrite', s => s.delete(id)); } catch (e) { } } }
  function fallback(msg) { DB = null; mode = 'mem'; why = msg || ''; }
  async function load() {
    if (loading || loaded) return; loading = true;
    try { DB = await openDB(); const all = await tx('readonly', s => s.getAll()); items = Array.isArray(all) ? all : []; mode = 'idb'; try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch (e) { } }
    catch (e) { fallback(e && e.message || String(e)); items = items || []; }
    await prepUrls(items); loaded = true; loading = false;
    if (API && API.S.loc && API.S.loc.v === 'memories') API.render();
  }
  function blobToDataURL(b) { return new Promise((res, rej) => { try { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(b); } catch (e) { rej(e); } }); }
  function dataURLToBlob(u) { const m = /^data:([^;,]+)?(;base64)?,(.*)$/.exec(u || ''); if (!m) return null; const bin = m[2] ? atob(m[3]) : decodeURIComponent(m[3]), a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return new Blob([a], { type: m[1] || 'image/jpeg' }); }
  async function urlFor(p) {
    if (p.url) return p.url;
    try { if (window.URL && URL.createObjectURL) p.url = URL.createObjectURL(p.blob); } catch (e) { }
    if (!p.url) { try { p.url = await blobToDataURL(p.blob); } catch (e) { p.url = ''; } }
    return p.url;
  }
  async function prepUrls(list) { for (const m of list) for (const p of (m.photos || [])) await urlFor(p); }
  function revoke(m) { (m.photos || []).forEach(p => { try { if (p.url && p.url.startsWith('blob:')) URL.revokeObjectURL(p.url); } catch (e) { } }); }

  /* ---------------- images ---------------- */
  function loadImg(file) {
    return new Promise((res, rej) => {
      const img = new Image(); let u = ''; const to = setTimeout(() => rej(new Error('timeout')), 6000);
      img.onload = () => { clearTimeout(to); res({ img, u }); }; img.onerror = () => { clearTimeout(to); rej(new Error('decode')); };
      try { u = URL.createObjectURL(file); img.src = u; } catch (e) { blobToDataURL(file).then(d => { img.src = d; }, rej); }
    });
  }
  async function downscale(file) {
    const c = document.createElement('canvas'); let g = null; try { g = c.getContext && c.getContext('2d'); } catch (e) { }
    if (g) {
      try {
        let src, w, h, u = '';
        if (window.createImageBitmap) { try { src = await createImageBitmap(file); w = src.width; h = src.height; } catch (e) { src = null; } }
        if (!src) { const r = await loadImg(file); src = r.img; u = r.u; w = src.naturalWidth; h = src.naturalHeight; }
        const k = Math.min(1, 1280 / Math.max(w, h)); c.width = Math.max(1, Math.round(w * k)); c.height = Math.max(1, Math.round(h * k));
        g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(src, 0, 0, c.width, c.height);
        try { if (src.close) src.close(); if (u) URL.revokeObjectURL(u); } catch (e) { }
        const blob = await new Promise(r => { try { c.toBlob(r, 'image/jpeg', 0.8); } catch (e) { r(null); } });
        if (blob) return { blob, w: c.width, h: c.height };
      } catch (e) { }
    }
    if (file.size < 5e6 && /^image\/(jpeg|png|gif|webp)$/.test(file.type || '')) return { blob: file, w: 0, h: 0 };
    throw new Error('This photo format could not be read.');
  }
  async function addFiles(list) {
    const files = Array.from(list || []).filter(f => /^image\//.test(f.type || '') || /\.(jpe?g|png|gif|webp|heic|bmp)$/i.test(f.name || ''));
    if (!files.length) { API && API.toast('Choose image files (JPG, PNG, GIF or WebP).'); return; }
    if (!draft) newDraft();
    let bad = 0, over = 0;
    for (const f of files) {
      if (draft.photos.length >= MAXPH) { over++; continue; }
      try { const p = await downscale(f); await urlFor(p); draft.photos.push(p); if (!draft.title && draft.photos.length === 1) draft.title = (f.name || '').replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').slice(0, 60); } catch (e) { bad++; }
    }
    if (bad) API.toast(`${bad} photo${bad > 1 ? 's' : ''} could not be read. Try JPG or PNG.`);
    if (over) API.toast(`A memory can hold up to ${MAXPH} photos.`);
    const L = API.S.loc; if (L.v === 'memories' && (L.tab === 'new' || L.tab === 'edit')) refreshEditor(); else API.go({ v: 'memories', tab: 'new' });
  }

  /* ---------------- drafts ---------------- */
  function newDraft() { draft = { id: null, title: '', date: today(), text: '', tags: [], mood: '', photos: [] }; tipK = ''; }
  function editDraft(m) { draft = { id: m.id, title: m.title || '', date: m.date || today(), text: m.text || '', tags: (m.tags || []).slice(), mood: m.mood || '', photos: (m.photos || []).slice(), created: m.created }; tipK = ''; }
  async function saveDraft() {
    const d = draft; if (!d) return;
    if (!d.photos.length && !d.text.trim() && !d.title.trim()) { API.toast('Add a photo, a title or a few words first.'); return; }
    const now = Date.now(), isNew = !d.id;
    const m = { id: d.id || newId(), title: d.title.trim() || 'Untitled memory', date: d.date || today(), text: d.text, tags: d.tags, mood: d.mood, photos: d.photos, created: d.created || now, updated: now };
    const i = items.findIndex(x => x.id === m.id); if (i >= 0) items[i] = m; else items.push(m);
    const ok = await dbPut(m);
    draft = null;
    if (isNew) {
      const S = API.S, t = today(); S.mem = S.mem || {};
      if (S.mem.d !== t) { S.mem.d = t; API.save(); API.reward(5, 'First memory of the day'); }
      else API.toast(ok ? 'Memory saved on this device' : 'Memory kept for this session');
    } else API.toast('Memory updated');
    API.go({ v: 'memories', tab: 'view', k: m.id });
  }

  /* ---------------- downloads ---------------- */
  function download(name, blob) {
    try {
      const a = document.createElement('a'); let u = '';
      try { u = URL.createObjectURL(blob); } catch (e) { }
      const fin = href => { a.href = href; a.download = name; a.rel = 'noopener'; document.body.appendChild(a); a.click(); setTimeout(() => { a.remove(); if (u) try { URL.revokeObjectURL(u); } catch (e) { } }, 1500); };
      if (u) fin(u); else blobToDataURL(blob).then(fin);
      return true;
    } catch (e) { API.toast('Downloads are blocked here. Try the offline copy of the course.'); return false; }
  }
  const slug = s => (String(s || 'memory').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'memory').slice(0, 40);
  async function exportOne(m) {
    const imgs = []; for (const p of m.photos || []) imgs.push(await blobToDataURL(p.blob));
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(m.title)}</title>
<style>body{margin:0;background:#0a1638;color:#1f1a10;font-family:Georgia,serif;padding:24px}.p{max-width:760px;margin:0 auto;background:#fffdf6;padding:22px;border-radius:6px;box-shadow:0 20px 40px rgba(0,0,0,.6)}img{width:100%;margin:0 0 12px;border-radius:3px}h1{margin:.2em 0}.m{color:#6b5f45}.t{white-space:pre-wrap;line-height:1.6}.g{display:inline-block;background:#ffe9a6;border-radius:99px;padding:2px 10px;margin:2px;font-size:.85em}</style></head>
<body><div class="p">${imgs.map(s => `<img src="${s}" alt="">`).join('')}<h1>${esc(m.mood || '')} ${esc(m.title)}</h1><p class="m">${esc(prettyDate(m.date))}</p><p>${(m.tags || []).map(t => `<span class="g">${esc(t)}</span>`).join('')}</p><div class="t">${esc(m.text || '')}</div><p class="m" style="margin-top:20px;font-size:.85em">Saved from My Memories, Information Technology Unit 1.</p></div></body></html>`;
    if (download(`${slug(m.title)}-${m.date || today()}.html`, new Blob([html], { type: 'text/html' }))) API.toast('Keepsake page downloaded');
  }
  async function exportAll() {
    if (!items.length) { API.toast('There are no memories to back up yet.'); return; }
    const out = { app: 'cape-cs-memories', version: 1, exported: new Date().toISOString(), items: [] };
    for (const m of sorted()) { const c = clean(m), ph = []; for (const p of c.photos) ph.push({ data: await blobToDataURL(p.blob), w: p.w, h: p.h }); c.photos = ph; out.items.push(c); }
    if (download(`my-memories-backup-${today()}.json`, new Blob([JSON.stringify(out)], { type: 'application/json' }))) API.toast(`Backup of ${out.items.length} memories downloaded`);
  }
  async function importFile(file) {
    let data; try { data = JSON.parse(await (file.text ? file.text() : new Promise((r, j) => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.onerror = j; fr.readAsText(file); }))); } catch (e) { API.toast('That file is not a My Memories backup.'); return; }
    if (!data || data.app !== 'cape-cs-memories' || !Array.isArray(data.items)) { API.toast('That file is not a My Memories backup.'); return; }
    let n = 0, skip = 0;
    for (const it of data.items) {
      if (!it || !it.id) continue;
      const ex = items.find(x => x.id === it.id); if (ex && (ex.updated || 0) >= (it.updated || 0)) { skip++; continue; }
      const m = { id: String(it.id), title: String(it.title || 'Untitled memory').slice(0, 120), date: String(it.date || today()).slice(0, 10), text: String(it.text || ''), tags: Array.isArray(it.tags) ? it.tags.map(String).slice(0, 12) : [], mood: String(it.mood || '').slice(0, 8), created: +it.created || Date.now(), updated: +it.updated || Date.now(), photos: [] };
      for (const p of (it.photos || []).slice(0, MAXPH)) { const b = dataURLToBlob(p && p.data); if (b) m.photos.push({ blob: b, w: +p.w || 0, h: +p.h || 0 }); }
      await prepUrls([m]); if (ex) { revoke(ex); items[items.indexOf(ex)] = m; } else items.push(m); await dbPut(m); n++;
    }
    API.toast(`Imported ${n} memor${n === 1 ? 'y' : 'ies'}${skip ? ` (${skip} already here)` : ''}`);
    API.go({ v: 'memories', tab: API.S.loc.tab === 'slides' || API.S.loc.tab === 'timeline' ? API.S.loc.tab : 'grid' });
  }

  /* ---------------- views ---------------- */
  const thumb = (m, cls) => { const p = (m.photos || [])[0]; return p && p.url ? `<span class="me-ph ${cls || ''}"><img src="${p.url}" alt="" loading="lazy"></span>` : `<span class="me-ph me-note ${cls || ''}">${esc((m.text || m.title || '').slice(0, 90)) || '📝'}</span>`; };
  function privacy() {
    return `<div class="me-priv" role="note"><span class="me-lock" aria-hidden="true">🔒</span><p><b>Private to this device.</b> Your photos and memories are saved only in this browser. They are not uploaded anywhere and your teacher cannot see them. Clearing browser data, using private browsing or switching devices can erase them, so <b>export a backup</b> now and then.</p></div>
    ${mode === 'mem' ? `<div class="me-priv me-warn" role="status"><span class="me-lock" aria-hidden="true">⚠️</span><p><b>Storage is blocked here</b> (for example in a private window or an embedded preview). You can still add memories, but they last only until you close or reload this page. Use <b>Export all</b> to keep a copy, then import it later.</p></div>` : ''}`;
  }
  function gridHTML(list) {
    if (!list.length) return items.length ? `<p class="hint">No memories match your search.</p>` : `<div class="me-empty"><span style="font-size:2.6rem" aria-hidden="true">📸</span><h3>Your scrapbook is empty</h3><p class="hint">Start with a photo from a class trip, Carnival, a match or a day with friends.</p><button type="button" class="btn gold" data-px="new">+ Add your first memory</button></div>`;
    return `<div class="me-grid">${list.map(m => `<button type="button" class="me-pol" style="--r:${tilt(m.id)}" data-go="memories" data-tab="view" data-k="${esc(m.id)}" aria-label="${esc(m.title + ', ' + prettyDate(m.date))}">${thumb(m)}${(m.photos || []).length > 1 ? `<span class="me-badge">+${m.photos.length - 1}</span>` : ''}<span class="me-cap">${esc(m.title)}</span><span class="me-sub"><span>${esc(prettyDate(m.date))}</span><span aria-hidden="true">${esc(m.mood || '')}</span></span></button>`).join('')}</div>`;
  }
  function timelineHTML(list) {
    if (!list.length) return gridHTML(list);
    let h = '<div class="me-tl">', cur = '';
    list.forEach(m => {
      const k = (m.date || '').slice(0, 7); if (k !== cur) { cur = k; const [y, mo] = k.split('-'); h += `<h3 class="me-mon">${MON[+mo - 1] || ''} ${esc(y || '')}</h3>`; }
      h += `<button type="button" class="me-tli" data-go="memories" data-tab="view" data-k="${esc(m.id)}">${thumb(m)}<span style="min-width:0"><b>${esc(m.mood || '')} ${esc(m.title)}</b><br><span class="hint">${esc(prettyDate(m.date))}${(m.tags || []).length ? ' · ' + esc(m.tags.join(', ')) : ''}</span><span class="me-snip">${esc((m.text || '').slice(0, 160))}</span></span></button>`;
    });
    return h + '</div>';
  }
  function slides(list) { const out = []; list.slice().reverse().forEach(m => { if ((m.photos || []).length) m.photos.forEach((p, i) => out.push({ m, p, i })); else out.push({ m, p: null }); }); return out; }
  function slideInner(S) {
    if (!S.length) return `<p class="hint" style="padding:20px">No memories to show yet.</p>`;
    slide = ((slide % S.length) + S.length) % S.length; const s = S[slide], m = s.m;
    return `${s.p && s.p.url ? `<img src="${s.p.url}" alt="${esc(m.title)}">` : `<div class="me-note">${esc((m.text || m.title).slice(0, 400))}</div>`}<div class="me-showcap" data-notc><h3>${esc(m.mood || '')} ${esc(m.title)}</h3><span>${esc(prettyDate(m.date))} · ${slide + 1} / ${S.length}</span></div>`;
  }
  function slidesHTML(list) {
    const S = slides(list);
    return `<div class="me-show" id="me-show" aria-live="polite" tabindex="0" aria-label="Slideshow. Use the left and right arrow keys to move.">${slideInner(S)}</div>
      <div class="row" style="justify-content:center"><button type="button" class="btn ghost" data-px="prev" aria-label="Previous slide">◀ Prev</button><button type="button" class="btn gold" data-px="playpause" id="me-pp" aria-pressed="${slidePlay}">${slidePlay ? '⏸ Pause' : '▶ Play'}</button><button type="button" class="btn ghost" data-px="next" aria-label="Next slide">Next ▶</button></div>
      <p class="hint" style="text-align:center">Tip: use the ← and → arrow keys.</p>`;
  }
  function resultsHTML(tab) { const list = filtered(); return tab === 'timeline' ? timelineHTML(list) : tab === 'slides' ? slidesHTML(list) : gridHTML(list); }
  function galleryHTML(api, tab) {
    const allTags = Array.from(new Set(TAGS.filter(t => items.some(m => (m.tags || []).includes(t))).concat(...items.map(m => m.tags || [])))).slice(0, 24);
    return `${privacy()}
    <div class="card">
      <div class="me-bar"><button type="button" class="btn gold" data-px="new">+ New memory</button>
        <div class="chips" role="tablist" aria-label="Layout">${[['grid', '🖼️ Polaroids'], ['timeline', '🗓️ Timeline'], ['slides', '▶️ Slideshow']].map(([k, n]) => `<button type="button" class="chip ${tab === k ? 'sel' : ''}" role="tab" aria-selected="${tab === k}" data-go="memories" data-tab="${k}">${n}</button>`).join('')}</div></div>
      <div class="me-bar"><label class="me-sr" for="me-q">Search memories</label><input type="search" class="search" id="me-q" placeholder="Search titles, words or tags…" value="${esc(q)}">
        <div class="row"><button type="button" class="btn ghost" data-px="exportall">⬇ Export all</button><label class="btn ghost me-file">⬆ Import backup<input type="file" id="me-imp" class="me-sr" accept=".json,application/json"></label></div></div>
      ${allTags.length ? `<div class="chips" role="group" aria-label="Filter by tag" data-notc><button type="button" class="chip ${!tagF ? 'sel' : ''}" data-px="tagf" data-k="" aria-pressed="${!tagF}">All</button>${allTags.map(t => `<button type="button" class="chip ${tagF === t ? 'sel' : ''}" data-px="tagf" data-k="${esc(t)}" aria-pressed="${tagF === t}">${esc(t)}</button>`).join('')}</div>` : ''}
      <span class="hint" id="me-count">${items.length} memor${items.length === 1 ? 'y' : 'ies'} · drop photos anywhere on this page to start a new one</span>
    </div>
    <div id="me-res">${resultsHTML(tab)}</div>`;
  }
  function thumbsHTML() { return draft.photos.map((p, i) => `<div class="me-th"><img src="${p.url}" alt="Photo ${i + 1}"><button type="button" data-px="rmph" data-i="${i}" aria-label="Remove photo ${i + 1}">✕</button></div>`).join(''); }
  const wc = t => (String(t || '').match(/[A-Za-z0-9’']+/g) || []).length;
  function editorHTML(api, isEdit) {
    const d = draft;
    return `${privacy()}
    <div class="card"><div class="row" style="justify-content:space-between"><h2>${isEdit ? 'Edit memory' : 'New memory'}</h2><button type="button" class="btn ghost" data-px="cancel">Cancel</button></div>
      <label class="me-drop" id="me-drop"><span class="me-big" aria-hidden="true">📷</span><b>Drop photos here or tap to choose</b><span class="hint">Up to ${MAXPH} photos. Large photos are shrunk on your device to save space.</span><input type="file" id="me-file" class="me-sr" accept="image/*" multiple></label>
      <div class="me-thumbs" id="me-thumbs">${thumbsHTML()}</div>
      <div class="me-form">
        <div class="field"><label for="me-title">Title</label><input type="text" id="me-title" maxlength="120" value="${esc(d.title)}" placeholder="e.g. Sports Day relay win"></div>
        <div class="field"><label for="me-date">Date</label><input type="date" id="me-date" value="${esc(d.date)}"></div>
      </div>
      <div class="field"><span style="font-weight:700;font-size:.92rem" id="me-moodl">Mood</span><div class="chips" role="group" aria-labelledby="me-moodl">${MOODS.map(([e, n]) => `<button type="button" class="chip me-mood ${d.mood === e ? 'sel' : ''}" data-px="mood" data-k="${e}" aria-pressed="${d.mood === e}" aria-label="${n}" title="${n}">${e}</button>`).join('')}</div></div>
      <div class="field"><span style="font-weight:700;font-size:.92rem" id="me-tagl">Tags</span><div class="chips" role="group" aria-labelledby="me-tagl" id="me-tags" data-notc>${Array.from(new Set(TAGS.concat(d.tags))).map(t => `<button type="button" class="chip ${d.tags.includes(t) ? 'sel' : ''}" data-px="tag" data-k="${esc(t)}" aria-pressed="${d.tags.includes(t)}">${esc(t)}</button>`).join('')}</div>
        <div class="row"><label class="me-sr" for="me-tagin">New tag</label><input type="text" class="me-tagin" id="me-tagin" maxlength="24" placeholder="Add your own tag" style="flex:1 1 160px;width:auto"><button type="button" class="btn ghost" data-px="addtag">Add tag</button></div></div>
      <div class="field"><span style="font-weight:700;font-size:.92rem">Need a writing prompt?</span>
        <div class="me-prompts">${Object.entries(PROMPTS).map(([k, p]) => `<button type="button" class="me-prompt" data-px="prompt" data-k="${k}"><b>${p.t}</b><span>${p.d}</span></button>`).join('')}</div>
        <p class="fb note" id="me-tip" ${tipK ? '' : 'hidden'}>${tipK ? esc(PROMPTS[tipK].tip) : ''}</p></div>
      <div class="field"><label for="me-text">Your memory</label><textarea id="me-text" class="me-ta" placeholder="What happened? Who was there? Why does it matter to you?">${esc(d.text)}</textarea><span class="hint" id="me-wc">${wc(d.text)} words</span></div>
      <div class="row"><button type="button" class="btn go" data-px="save">💾 Save memory</button><button type="button" class="btn ghost" data-px="cancel">Cancel</button></div>
    </div>`;
  }
  function detailHTML(api, m) {
    const ph = m.photos || []; photoIdx = Math.min(photoIdx, Math.max(0, ph.length - 1)); const p = ph[photoIdx];
    return `<div class="row"><button type="button" class="btn ghost" data-go="memories">← All memories</button></div>
    <div class="card"><div class="me-det">
      <div>${p ? `<div class="me-frame"><img src="${p.url}" alt="${esc(m.title)}${ph.length > 1 ? `, photo ${photoIdx + 1} of ${ph.length}` : ''}"></div>` : `<div class="me-frame"><div class="me-note" style="min-height:220px">${esc((m.text || m.title).slice(0, 300))}</div></div>`}
        ${ph.length > 1 ? `<div class="me-thumbs" style="margin-top:14px">${ph.map((x, i) => `<button type="button" class="me-th" data-px="ph" data-i="${i}" aria-label="Show photo ${i + 1}" aria-pressed="${i === photoIdx}" style="${i === photoIdx ? 'border-color:var(--gold)' : ''}"><img src="${x.url}" alt=""></button>`).join('')}</div>` : ''}</div>
      <div style="display:flex;flex-direction:column;gap:12px;min-width:0"><span class="kicker">${esc(prettyDate(m.date))}</span><h2 data-notc>${esc(m.mood || '')} ${esc(m.title)}</h2>
        ${(m.tags || []).length ? `<div class="chips" data-notc>${m.tags.map(t => `<button type="button" class="chip" data-px="tagf" data-k="${esc(t)}" aria-label="Show all memories tagged ${esc(t)}">${esc(t)}</button>`).join('')}</div>` : ''}
        <div class="me-text">${esc(m.text || '') || '<span class="hint">No words yet. Edit to add the story behind this memory.</span>'}</div>
        <div class="row"><button type="button" class="btn gold" data-px="edit" data-k="${esc(m.id)}">✏️ Edit</button><button type="button" class="btn ghost" data-px="dl" data-k="${esc(m.id)}">⬇ Keepsake page</button>${p ? `<button type="button" class="btn ghost" data-px="dlph" data-k="${esc(m.id)}">⬇ Photo</button>` : ''}<button type="button" class="btn ghost" data-px="del" data-k="${esc(m.id)}">🗑 Delete</button></div>
        ${confirmId === m.id ? `<div class="me-conf" role="alert"><b>Delete this memory forever?</b><span class="hint">This cannot be undone.</span><button type="button" class="btn" style="background:var(--bad);color:#fff" data-px="delyes" data-k="${esc(m.id)}">Yes, delete</button><button type="button" class="btn ghost" data-px="delno">Keep it</button></div>` : ''}
      </div></div></div>`;
  }
  function render(api, loc) {
    API = api; const tab = loc.tab || 'grid';
    const hero = `<section class="hero"><span class="eyebrow">Private scrapbook</span><h1><span aria-hidden="true">📸</span> My Memories</h1><p>Keep photos and write about the moments that matter. Every memory is a chance to practise descriptive, reflective and narrative writing.</p></section>`;
    if (!loaded) { load(); return hero + `<div class="card"><p class="hint">Opening your scrapbook…</p></div>`; }
    if (tab === 'new' || tab === 'edit') {
      if (tab === 'edit') { const m = items.find(x => x.id === loc.k); if (!m) return hero + `<div class="card"><p>That memory was not found.</p><button type="button" class="btn ghost" data-go="memories">Back</button></div>`; if (!draft || draft.id !== m.id) editDraft(m); }
      else if (!draft || draft.id) newDraft();
      return hero + editorHTML(api, tab === 'edit');
    }
    if (tab === 'view') {
      const m = items.find(x => x.id === loc.k);
      if (!m) return hero + `<div class="card"><p>That memory was not found.</p><button type="button" class="btn ghost" data-go="memories">Back</button></div>`;
      if (m.id !== lastView) { lastView = m.id; photoIdx = 0; confirmId = null; }
      return hero + detailHTML(api, m);
    }
    return hero + galleryHTML(api, tab);
  }

  /* ---------------- partial refreshes ---------------- */
  function refreshResults() { const r = document.getElementById('me-res'); if (r) r.innerHTML = resultsHTML(API.S.loc.tab || 'grid'); syncSlide(); }
  function refreshEditor() {
    const th = document.getElementById('me-thumbs'); if (th) th.innerHTML = thumbsHTML();
    const t = document.getElementById('me-title'); if (t && !t.value && draft.title) t.value = draft.title;
  }
  function syncSlide() { const pp = document.getElementById('me-pp'); if (pp) { pp.textContent = slidePlay ? '⏸ Pause' : '▶ Play'; pp.setAttribute('aria-pressed', String(slidePlay)); } }
  function moveSlide(d) { const el = document.getElementById('me-show'); if (!el) return; slide += d; el.innerHTML = slideInner(slides(filtered())); }
  setInterval(() => { if (slidePlay && document.getElementById('me-show') && !document.hidden) moveSlide(1); }, 5000);
  document.addEventListener('keydown', e => {
    if (!document.getElementById('me-show')) return;
    const tg = e.target && e.target.tagName; if (/INPUT|TEXTAREA|SELECT/.test(tg || '')) return;
    if (e.key === 'ArrowRight') { moveSlide(1); e.preventDefault(); } else if (e.key === 'ArrowLeft') { moveSlide(-1); e.preventDefault(); }
  });

  function mount(api, loc, stage) {
    API = api; const tab = loc.tab || 'grid';
    const qi = stage.querySelector('#me-q'); if (qi) qi.addEventListener('input', () => { q = qi.value; slide = 0; refreshResults(); });
    const imp = stage.querySelector('#me-imp'); if (imp) imp.addEventListener('change', () => { if (imp.files && imp.files[0]) importFile(imp.files[0]); imp.value = ''; });
    const fi = stage.querySelector('#me-file'); if (fi) fi.addEventListener('change', () => { const f = Array.from(fi.files || []); fi.value = ''; if (f.length) addFiles(f); });
    const bind = (id, key, after) => { const el = stage.querySelector(id); if (el && draft) el.addEventListener('input', () => { draft[key] = el.value; if (after) after(el); }); };
    bind('#me-title', 'title'); bind('#me-date', 'date'); bind('#me-text', 'text', el => { const w = document.getElementById('me-wc'); if (w) w.textContent = wc(el.value) + ' words'; });
    const ti = stage.querySelector('#me-tagin'); if (ti) ti.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addTag(ti.value); } });
    // drag and drop: editor dropzone, and anywhere on gallery views
    if (!stage.__meDnD) {
      stage.__meDnD = true;
      const isMe = () => API && API.S.loc.v === 'memories' && API.S.loc.tab !== 'view';
      stage.addEventListener('dragover', e => { if (!isMe()) return; const dt = e.dataTransfer; if (dt && Array.from(dt.types || []).includes('Files')) { e.preventDefault(); const dz = document.getElementById('me-drop'); if (dz) dz.classList.add('over'); } });
      stage.addEventListener('dragleave', e => { const dz = document.getElementById('me-drop'); if (dz && !dz.contains(e.relatedTarget)) dz.classList.remove('over'); });
      stage.addEventListener('drop', e => { if (!isMe()) return; const f = e.dataTransfer && e.dataTransfer.files; if (f && f.length) { e.preventDefault(); const dz = document.getElementById('me-drop'); if (dz) dz.classList.remove('over'); if (API.S.loc.tab !== 'new' && API.S.loc.tab !== 'edit') newDraft(); addFiles(f); } });
    }
    if (tab === 'slides') { const sh = stage.querySelector('#me-show'); if (sh && !reduced()) sh.focus({ preventScroll: true }); }
  }
  function addTag(v) {
    v = String(v || '').trim().replace(/\s+/g, ' ').slice(0, 24); if (!v || !draft) return;
    if (!draft.tags.includes(v)) draft.tags.push(v);
    const box = document.getElementById('me-tags'); if (box) box.innerHTML = Array.from(new Set(TAGS.concat(draft.tags))).map(t => `<button type="button" class="chip ${draft.tags.includes(t) ? 'sel' : ''}" data-px="tag" data-k="${esc(t)}" aria-pressed="${draft.tags.includes(t)}">${esc(t)}</button>`).join('');
    const ti = document.getElementById('me-tagin'); if (ti) ti.value = '';
  }
  function click(action, el, api) {
    API = api; const k = el.dataset.k;
    switch (action) {
      case 'new': newDraft(); api.go({ v: 'memories', tab: 'new' }); return;
      case 'cancel': { const id = draft && draft.id; draft = null; api.go(id ? { v: 'memories', tab: 'view', k: id } : { v: 'memories' }); return; }
      case 'save': saveDraft(); return;
      case 'rmph': { const i = +el.dataset.i; if (draft && draft.photos[i]) { draft.photos.splice(i, 1); refreshEditor(); } return; }
      case 'mood': if (!draft) return; draft.mood = draft.mood === k ? '' : k; document.querySelectorAll('[data-px="mood"]').forEach(b => { const on = b.dataset.k === draft.mood; b.classList.toggle('sel', on); b.setAttribute('aria-pressed', String(on)); }); return;
      case 'tag': { if (!draft) return; const i = draft.tags.indexOf(k); if (i >= 0) draft.tags.splice(i, 1); else draft.tags.push(k); const on = i < 0; el.classList.toggle('sel', on); el.setAttribute('aria-pressed', String(on)); return; }
      case 'addtag': addTag((document.getElementById('me-tagin') || {}).value); return;
      case 'prompt': {
        const p = PROMPTS[k]; if (!p || !draft) return; const ta = document.getElementById('me-text');
        if (ta) draft.text = ta.value; draft.text = draft.text.trim() ? draft.text.replace(/\s*$/, '') + '\n\n' + p.s : p.s; tipK = k;
        if (ta) { ta.value = draft.text; ta.focus(); try { const i = ta.value.indexOf('…', ta.value.length - p.s.length); if (i >= 0) ta.setSelectionRange(i, i + 1); } catch (e) { } }
        const tip = document.getElementById('me-tip'); if (tip) { tip.textContent = p.tip; tip.hidden = false; }
        const w = document.getElementById('me-wc'); if (w) w.textContent = wc(draft.text) + ' words'; return;
      }
      case 'tagf': tagF = k || ''; slide = 0; if (api.S.loc.tab === 'view') { api.go({ v: 'memories' }); return; } api.render(); return;
      case 'edit': { const m = items.find(x => x.id === k); if (m) { editDraft(m); api.go({ v: 'memories', tab: 'edit', k }); } return; }
      case 'ph': photoIdx = +el.dataset.i || 0; api.render(); return;
      case 'del': confirmId = k; api.render(); return;
      case 'delno': confirmId = null; api.render(); return;
      case 'delyes': { const m = items.find(x => x.id === k); confirmId = null; if (m) { items.splice(items.indexOf(m), 1); revoke(m); dbDel(k); api.toast('Memory deleted'); } api.go({ v: 'memories' }); return; }
      case 'dl': { const m = items.find(x => x.id === k); if (m) exportOne(m); return; }
      case 'dlph': { const m = items.find(x => x.id === k); const p = m && m.photos[photoIdx]; if (p) download(`${slug(m.title)}-${photoIdx + 1}.jpg`, p.blob); return; }
      case 'exportall': exportAll(); return;
      case 'prev': moveSlide(-1); return;
      case 'next': moveSlide(1); return;
      case 'playpause': slidePlay = !slidePlay; syncSlide(); return;
    }
  }
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'memories', title: 'My Memories', tile: { icon: '📸', meta: 'Your private photo scrapbook and journal' },
    render, mount, click
  });
  window.COURSE_MEMORIES = { _state: () => ({ mode, loaded, count: items.length, why }), _addFiles: f => addFiles(f) };
})();
