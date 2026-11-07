/* CSEC Information Technology · Assignment Board: tiered assignments for every section at three levels and six thinking skills · Developed by Kester Small. */
(function () {
  const LVN = { 1: 'Foundation', 2: 'Core', 3: 'Challenge' }, LVI = { 1: '🪜', 2: '⚙️', 3: '🚀' };
  const BLOOM = ['Remember', 'Understand', 'Apply', 'Analyse', 'Evaluate', 'Create'];
  const SIMF = { winsim: ['winsim', '🪟 Windows Desktop Lab'], wordsim: ['wordsim', '🟦 Word Lab'], excelsim: ['excelsim', '🟩 Excel Lab'], accesssim: ['accesssim', '🟥 Access Lab'], publishersim: ['publishersim', '🟩 Publisher Lab'], websim: ['websim', '🌐 Web Page Builder'], codelab: ['codelab', '🧮 Code Lab'], robolab: ['robolab', '🤖 Robo Lab'], pcbuild: ['pcbuildlab', '🖥️ PC Build Lab'], print: ['printlab', '🖨️ Print Lab'], inbox: ['inboxhero', '✉️ Inbox Hero'], emergency: ['emergency', '🚨 Emergency Meeting'], racer: ['streetracer', '🏎️ Street Racer'], ops: ['ops', '🎯 CSEC OPS'], shortcuts: ['shortcuts', '⌨️ Shortcut Sprint'], tz: ['timezones', '🌐 Time Zone Navigator'] };
  let A = null, F = { sec: '', lv: 0, bloom: '', open: '' };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const T = () => { const S = A.S; S.tasks = S.tasks || {}; return S.tasks; };
  function all() { return (A.mods ? A.mods() : []).flatMap(m => (m.assignments || []).map(a => Object.assign({ m }, a))); }
  function card(x) {
    const t = T()[x.id] || {}, open = F.open === x.id, total = (x.rubric || []).reduce((s, r) => s + (+r.marks || 0), 0);
    const self = (x.rubric || []).reduce((s, r, i) => s + (+((t.self || {})[i]) || 0), 0);
    const sim = x.sim && SIMF[x.sim];
    let h = `<div class="card tk ${open ? 'open' : ''}"><button type="button" class="tk-head" data-tk="open" data-id="${esc(x.id)}" aria-expanded="${open}"><span class="tk-lv l${x.level}">${LVI[x.level]}</span><span class="t"><b>${esc(x.title)}</b><br><span class="hint">${esc(x.m.code)} · ${LVN[x.level]} · 🧠 ${esc(x.bloom)} · about ${esc(x.time)} min${total ? ' · ' + total + ' marks' : ''}</span></span><span class="pill ${t.st === 'done' ? 'ok' : ''}">${t.st === 'done' ? '✓ Done' : t.st === 'doing' ? 'In progress' : 'To do'}</span></button>`;
    if (!open) return h + '</div>';
    h += `<div class="html-body">${x.brief || ''}</div>`;
    if (x.tasks && x.tasks.length) h += `<h4>What to do</h4><ol>${x.tasks.map(s => `<li>${s}</li>`).join('')}</ol>`;
    if (x.deliverable) h += `<p><b>Hand in:</b> ${x.deliverable}</p>`;
    if (sim) h += `<div class="row"><button type="button" class="btn ghost" data-gx="opengame" data-page="games/${sim[0]}.html?level=${x.level}" data-id="${esc(x.sim)}">${sim[1]} (Level ${x.level})</button></div>`;
    if (x.rubric && x.rubric.length) h += `<h4>How it is marked · rate yourself</h4><div class="tablewrap"><table><thead><tr><th>Criterion</th><th>What full marks looks like</th><th>Marks</th><th>My mark</th></tr></thead><tbody>${x.rubric.map((r, i) => `<tr><td><b>${esc(r.criterion)}</b></td><td>${esc(r.descriptor || '')}</td><td>${esc(r.marks)}</td><td><select class="select" data-tkself="${esc(x.id)}" data-i="${i}" aria-label="My mark for ${esc(r.criterion)}"><option value="">–</option>${Array.from({ length: (+r.marks || 0) + 1 }, (_, k) => `<option ${String((t.self || {})[i]) === String(k) ? 'selected' : ''}>${k}</option>`).join('')}</select></td></tr>`).join('')}<tr><td colspan="3"><b>My total</b></td><td><b>${self}/${total}</b></td></tr></tbody></table></div>`;
    h += `<label for="tk-${esc(x.id)}"><b>My work and notes</b> <span class="hint">(saved on this device)</span></label><textarea id="tk-${esc(x.id)}" class="ta" style="min-height:160px" data-tkta="${esc(x.id)}" placeholder="Plan, answer or paste your work here.">${esc(t.text || '')}</textarea>
      <div class="row"><button type="button" class="btn ghost" data-tk="st" data-id="${esc(x.id)}" data-v="doing">Mark in progress</button><button type="button" class="btn go" data-tk="st" data-id="${esc(x.id)}" data-v="done">Mark done</button><button type="button" class="btn ghost" data-tk="doc" data-id="${esc(x.id)}">⬇ Download as Word</button></div>`;
    return h + '</div>';
  }
  function render(api, loc) {
    A = api;
    if (!document.getElementById('tk-css')) { const st = document.createElement('style'); st.id = 'tk-css'; st.textContent = `.tk-head{display:flex;gap:12px;align-items:center;width:100%;background:none;border:0;text-align:left;padding:0;color:inherit}.tk-head .t{flex:1;min-width:0}.tk-lv{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-size:1.3rem;flex:none;border:1.5px solid var(--line)}.tk-lv.l1{background:var(--soft-ok)}.tk-lv.l2{background:var(--soft-blue)}.tk-lv.l3{background:var(--soft-gold)}.tk.open{border-color:var(--gold)}.tk h4{margin-top:12px}`; document.head.appendChild(st); }
    if (loc.k && loc.k !== F._k) { F.sec = loc.k; F._k = loc.k; }
    const mods = api.mods ? api.mods() : [];
    let L = all().filter(x => (!F.sec || x.m.id === F.sec) && (!F.lv || x.level === F.lv) && (!F.bloom || x.bloom === F.bloom));
    L.sort((a, b) => a.m.id.localeCompare(b.m.id) || a.level - b.level);
    const done = all().filter(x => (T()[x.id] || {}).st === 'done').length;
    let h = `<section class="hero"><span class="eyebrow">Simulators & Practicals</span><h1>📝 Assignment Board</h1><p>${all().length} assignments across the eight sections, at three levels (🪜 Foundation, ⚙️ Core, 🚀 Challenge) and six thinking skills, from remembering to creating. Individual, pair and group tasks; written, practical and creative. ${done} done so far.</p></section>`;
    h += `<div class="card"><div class="chips" role="group" aria-label="Section"><button type="button" class="chip ${!F.sec ? 'sel' : ''}" data-tk="sec" data-v="">All sections</button>${mods.map(m => `<button type="button" class="chip ${F.sec === m.id ? 'sel' : ''}" data-tk="sec" data-v="${m.id}">${esc(m.code)}</button>`).join('')}</div>
      <div class="chips" role="group" aria-label="Level" style="margin-top:8px"><button type="button" class="chip ${!F.lv ? 'sel' : ''}" data-tk="lv" data-v="0">All levels</button>${[1, 2, 3].map(l => `<button type="button" class="chip ${F.lv === l ? 'sel' : ''}" data-tk="lv" data-v="${l}">${LVI[l]} ${LVN[l]}</button>`).join('')}</div>
      <div class="chips" role="group" aria-label="Thinking skill" style="margin-top:8px"><button type="button" class="chip ${!F.bloom ? 'sel' : ''}" data-tk="bloom" data-v="">All thinking skills</button>${BLOOM.map(b => `<button type="button" class="chip ${F.bloom === b ? 'sel' : ''}" data-tk="bloom" data-v="${b}">🧠 ${b}</button>`).join('')}</div></div>`;
    h += L.length ? L.map(card).join('') : `<div class="card"><p>No assignments match those filters.</p></div>`;
    return h;
  }
  function dl(x) {
    const t = T()[x.id] || {};
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(x.title)}</title><style>body{font:11pt Calibri,Arial,sans-serif;margin:2cm}h1,h2{color:#1F3864}table{border-collapse:collapse;width:100%}th,td{border:1px solid #999;padding:4px 6px}th{background:#1F3864;color:#fff}</style></head><body><p style="color:#C9A227;font-weight:bold">CSEC Information Technology · ${esc(x.m.code)} · ${LVN[x.level]} · ${esc(x.bloom)}</p><h1>${esc(x.title)}</h1><p>Name: ____________________ &nbsp; Class: ________ &nbsp; Date: __________</p>${x.brief || ''}<h2>Tasks</h2><ol>${(x.tasks || []).map(s => `<li>${s}</li>`).join('')}</ol><p><b>Hand in:</b> ${x.deliverable || ''}</p><h2>Marking</h2><table><tr><th>Criterion</th><th>Descriptor</th><th>Marks</th></tr>${(x.rubric || []).map(r => `<tr><td>${esc(r.criterion)}</td><td>${esc(r.descriptor || '')}</td><td>${esc(r.marks)}</td></tr>`).join('')}</table><h2>My work</h2><p>${esc(t.text || '').replace(/\n/g, '<br>')}</p><p style="color:#777;font-size:9pt">Kester Small</p></body></html>`;
    try { const b = new Blob([html], { type: 'application/msword' }), u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = x.title.replace(/[^\w\- ]+/g, '') + '.doc'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 5000); } catch (e) { A.toast('Download is not available here.'); }
  }
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-tk]'); if (!b || !A) return; const d = b.dataset;
    if (d.tk === 'sec') { F.sec = d.v; F._k = d.v; A.render(); return; }
    if (d.tk === 'lv') { F.lv = +d.v; A.render(); return; }
    if (d.tk === 'bloom') { F.bloom = d.v; A.render(); return; }
    if (d.tk === 'open') { F.open = F.open === d.id ? '' : d.id; A.render(); return; }
    if (d.tk === 'st') { const t = T()[d.id] = T()[d.id] || {}; const was = t.st; t.st = d.v; A.save(); if (d.v === 'done' && was !== 'done') { const x = all().find(y => y.id === d.id); A.reward(x && x.level === 3 ? 25 : x && x.level === 1 ? 10 : 15, 'Assignment done', { xp: 20 }); } A.render(); return; }
    if (d.tk === 'doc') { const x = all().find(y => y.id === d.id); if (x) dl(x); return; }
  });
  let tmr; document.addEventListener('input', e => { const t = e.target; if (!A || !t.dataset || !t.dataset.tkta) return; const o = T()[t.dataset.tkta] = T()[t.dataset.tkta] || {}; o.text = t.value; if (!o.st) o.st = 'doing'; clearTimeout(tmr); tmr = setTimeout(() => A.save(), 500); });
  document.addEventListener('change', e => { const t = e.target; if (!A || !t.dataset || !t.dataset.tkself) return; const o = T()[t.dataset.tkself] = T()[t.dataset.tkself] || {}; o.self = o.self || {}; o.self[t.dataset.i] = t.value; A.save(); A.render(); });
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({ view: 'tasks', title: 'Assignment Board', tile: { icon: '📝', meta: 'Tiered assignments for every section: three levels, six thinking skills, individual and group, with rubrics.' }, render });
})();
