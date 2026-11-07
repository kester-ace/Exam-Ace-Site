/* CSEC Information Technology: Practical Labs — Developed by Kester Small */
(function () {
  const APPS = { windows: ['Windows and files', '🪟'], word: ['Word-processing', '🟦'], publisher: ['Desktop publishing', '🟩'], web: ['Web page design', '🌐'], excel: ['Spreadsheet', '📊'], access: ['Database', '🗄️'], code: ['Algorithms and programming', '🧮'], diagram: ['Diagrams and flowcharts', '🗺️'], research: ['Research and data', '🔎'], present: ['Presentation and report', '📽️'], network: ['Networking', '🖧'], sheet: ['Spreadsheet', '📊'], plan: ['Planning and writing', '📝'] };
  const SECN = { S1: 'Section 1 · Computer Fundamentals and Information Processing', S2: 'Section 2 · Computer Networks and Web Technologies', S3: 'Section 3 · Social and Economic Impact of ICT', S4: 'Section 4 · Word-Processing and Web Page Design', S5: 'Section 5 · Spreadsheets', S6: 'Section 6 · Database Management', S7: 'Section 7 · Problem-Solving and Program Design', S8: 'Section 8 · Program Implementation' };
  const ROMAN = { S1: '1', S2: '2', S3: '3', S4: '4', S5: '5', S6: '6', S7: '7', S8: '8' };
  const PNAME = {};

  const LABS = () => window.EDPM_LABS || [];
  let DL = null; try { if (window.claude && window.claude.use) window.claude.use('downloads').then(d => { DL = d; }).catch(() => { }); } catch (e) { }

  function css() {
    if (document.getElementById('labs-css')) return;
    const st = document.createElement('style'); st.id = 'labs-css';
    st.textContent = `.lx-doc{background:#fffdf6;color:#1a1a1a;border-radius:12px;padding:18px 20px;border:1px solid #e3d9bd;font:15px/1.55 Georgia,'Times New Roman',serif;overflow-x:auto}
.lx-doc table{border-collapse:collapse;margin:8px 0;font:14px/1.35 Arial,sans-serif}.lx-doc th,.lx-doc td{border:1px solid #9aa3ad;padding:4px 8px;text-align:left;vertical-align:top}.lx-doc th{background:#eef1f4}
.lx-doc small{color:#5a5a5a}.lx-doc del{color:#a33}.lx-doc u{text-decoration-thickness:2px}
.lx-tasks{margin:0;padding-left:1.4em;display:flex;flex-direction:column;gap:6px}.lx-tasks li{padding-left:4px}
.lx-check{width:100%;border-collapse:collapse}.lx-check td,.lx-check th{padding:8px;border-bottom:1px solid var(--line,#33415a);text-align:left;vertical-align:top}.lx-check td.m{text-align:center;white-space:nowrap;font-variant-numeric:tabular-nums}
.lx-check input{width:20px;height:20px;accent-color:var(--gold,#f5c542)}
.lx-pill{display:inline-block;border-radius:99px;padding:1px 9px;font-size:.72rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border:1px solid currentColor;margin-right:4px}
.lx-links{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}.lx-links a{text-decoration:none}.lx-links a:hover b{text-decoration:underline}.lx-yt{display:inline-block;font-size:.78rem;font-weight:700;padding:1px 8px;border-radius:99px;background:#c4302b;color:#fff!important;margin-left:4px;white-space:nowrap}.lx-yt:hover{filter:brightness(1.1)}
.lx-meta{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.lx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.lx-card{text-align:left;display:flex;flex-direction:column;gap:6px;padding:14px;border-radius:14px;border:1px solid var(--line,#33415a);background:var(--raise,rgba(255,255,255,.04));color:inherit;cursor:pointer;font:inherit}
.lx-card:hover{border-color:var(--gold,#f5c542)}.lx-card h4{margin:0;font-size:1.02rem}.lx-card .hint{margin:0}
.lx-card.done{box-shadow:inset 4px 0 0 #3fbf7f}
.lx-score{font-size:2rem;font-weight:800;font-variant-numeric:tabular-nums}
.lx-bar{height:10px;border-radius:99px;background:rgba(127,127,127,.25);overflow:hidden}.lx-bar i{display:block;height:100%;background:linear-gradient(90deg,#f5c542,#3fbf7f)}
@media print{body *{visibility:hidden}#lx-print,#lx-print *{visibility:visible}#lx-print{position:absolute;left:0;top:0;width:100%;color:#000;background:#fff}}`;
    document.head.appendChild(st);
  }
  const store = api => { const S = api.S; S.labs = S.labs || {}; return S; };
  const TOOLS = () => (window.DM_TOOLS || { groups: [] });
  const tutName = n => n.replace(/\s*\(.*?\)\s*/g, ' ').replace(/^ArtCraft: all apps$/, 'ArtCraft craft apps').replace(/ \(download\)$/, '').replace(/:\s*/, ' ').trim();
  const tutURL = n => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(tutName(n) + ' tutorial for beginners');
  const linkRow = (t, esc) => `<li><a href="${esc(t[1])}" target="_blank" rel="noopener noreferrer"><b>${esc(t[0])}</b> ↗</a> <a class="lx-yt" href="${esc(tutURL(t[0]))}" target="_blank" rel="noopener noreferrer" aria-label="Beginner tutorials on YouTube for ${esc(tutName(t[0]))}">▶ Beginner tutorials</a> <span class="hint">· ${esc(t[2])}${t[3] ? ' · <i>' + esc(t[3]) + '</i>' : ''}</span></li>`;
  const appPill = a => `<span class="lx-pill">${APPS[a][1]} ${APPS[a][0]}</span>`;

  function sheetHTML(title, sub, body) {
    return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>body{font:15px/1.5 Georgia,serif;max-width:800px;margin:24px auto;padding:0 20px;color:#111}h1{font:700 22px Arial,sans-serif;margin:0 0 4px}h2{font:700 16px Arial,sans-serif;margin:22px 0 6px;border-bottom:2px solid #222}table{border-collapse:collapse;margin:8px 0;font:13px Arial,sans-serif}th,td{border:1px solid #777;padding:4px 7px;text-align:left;vertical-align:top}th{background:#eee}.doc{border:1px solid #bbb;padding:14px 18px;background:#fffef8}.sub{color:#555;font:13px Arial,sans-serif}.foot{margin-top:30px;color:#666;font:12px Arial,sans-serif}</style></head><body><h1>${title}</h1><div class="sub">${sub}</div>${body}<div class="foot">CSEC Information Technology · Kester Small</div></body></html>`;
  }
  function checkTable(rows, ticks, key, withP) {
    return `<div class="tablewrap"><table class="lx-check"><thead><tr><th style="width:44px">Done</th><th>Criterion</th>${withP ? '<th>Profile</th>' : ''}<th class="m">Marks</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td><input type="checkbox" data-lxtick="${key}" data-i="${i}" ${ticks[i] ? 'checked' : ''} aria-label="Done: ${r.c.replace(/"/g, '')}"></td><td>${r.c}</td>${withP ? `<td>${PNAME[r.p] ? r.p : ''}</td>` : ''}<td class="m">${r.m}</td></tr>`).join('')}</tbody></table></div>`;
  }
  const sum = (rows, ticks) => rows.reduce((a, r, i) => a + (ticks[i] ? r.m : 0), 0);
  const tot = rows => rows.reduce((a, r) => a + r.m, 0);

  /* ---------------- Practical Labs ---------------- */
  function labsHome(api, loc) {
    const S = store(api), esc = api.esc, f = loc.tab || 'all', sec = loc.sub || '';
    let L = LABS(); const all = L.length, done = L.filter(x => S.labs[x.id] && S.labs[x.id].done).length;
    if (f !== 'all') L = L.filter(x => x.app === f); if (sec) L = L.filter(x => x.sec === sec);
    let h = `<div class="hero"><span class="eyebrow">CSEC Information Technology · Practical Labs</span><h1>Hands-on labs: Windows, Word, web pages, Excel, Access and programming</h1><p>${all} practical exercises across the eight sections at 🪜 Foundation, ⚙️ Core and 🚀 Challenge level, written like SBA and Paper 032 tasks. Do them in the real software or in the course simulators. Read the brief, gather or use the supplied material, follow every setting exactly, then tick the marking checklist the way your teacher will. <b>${done}</b> of ${all} completed.</p></div>`;
    h += `<div class="card"><div class="chips" role="group" aria-label="Filter by software"><button type="button" class="chip ${f === 'all' ? 'sel' : ''}" data-go="labs" data-tab="all" ${sec ? `data-sub="${sec}"` : ''}>All software</button>${Object.entries(APPS).map(([k, v]) => `<button type="button" class="chip ${f === k ? 'sel' : ''}" data-go="labs" data-tab="${k}" ${sec ? `data-sub="${sec}"` : ''}>${v[1]} ${v[0]}</button>`).join('')}</div>
      <div class="chips" role="group" aria-label="Filter by section" style="margin-top:8px"><button type="button" class="chip ${!sec ? 'sel' : ''}" data-go="labs" data-tab="${f}">All sections</button>${Object.keys(SECN).map(k => `<button type="button" class="chip ${sec === k ? 'sel' : ''}" data-go="labs" data-tab="${f}" data-sub="${k}">Section ${ROMAN[k]}</button>`).join('')}</div></div>`;
    const by = {}; L.forEach(x => (by[x.sec] = by[x.sec] || []).push(x));
    Object.keys(SECN).filter(k => by[k]).forEach(k => {
      h += `<div class="card"><h3>${esc(SECN[k])}</h3><div class="lx-grid">${by[k].map(x => { const st = S.labs[x.id] || {}; const t = tot(x.check); return `<button type="button" class="lx-card ${st.done ? 'done' : ''}" data-go="labs" data-k="${x.id}"><div class="lx-meta">${appPill(x.app)}<span class="lx-pill">${esc(x.level)}</span></div><h4>${esc(x.title)}</h4><p class="hint">${x.time} min · ${t} marks${st.done ? ` · ✓ ${sum(x.check, st.ticks || {})}/${t}` : ''}</p></button>`; }).join('')}</div></div>`;
    });
    if (!L.length) h += `<div class="card"><p>No labs match that filter yet.</p></div>`;
    return h;
  }
  function labView(api, x) {
    const S = store(api), esc = api.esc, st = S.labs[x.id] || {}, ticks = st.ticks || {}, t = tot(x.check), got = sum(x.check, ticks);
    const list = LABS(), i = list.indexOf(x), nx = list[i + 1];
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="labs">← Practical Labs</button><span>${esc(SECN[x.sec])}</span></div>`;
    h += `<div id="lx-print"><div class="card"><div class="lx-meta">${appPill(x.app)}<span class="lx-pill">${esc(x.level)}</span><span class="lx-pill">⏱ ${x.time} min</span><span class="lx-pill">${t} marks</span></div><h2 style="margin-top:8px">${esc(x.title)}</h2><div class="html-body">${x.brief}</div>
      <div class="lx-meta" style="margin-top:6px">${x.skills.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div></div>`;
    if (x.data) h += `<div class="card"><h3>Material to use</h3><div class="lx-doc">${x.data}</div></div>`;
    const LG = TOOLS().groups.filter(g => (g.app || []).includes(x.app) || (x.app === 'plan' && g.id === 'pre'));
    if (LG.length || x.app) h += `<div class="card"><h3>Software for this lab</h3><ul class="lx-links">${LG.flatMap(g => g.tools.slice(0, 6)).concat((TOOLS().groups.find(g => g.id === 'artcraft') || { tools: [] }).tools.filter(t => (t[4] || []).includes(x.app))).map(t => linkRow(t, esc)).join('')}</ul></div>`;
    h += `<div class="card"><h3>Instructions</h3><ol class="lx-tasks">${x.tasks.map(tk => `<li>${tk}</li>`).join('')}</ol></div>`;
    h += `<div class="card"><h3>Marking checklist</h3><p class="hint">When your product is finished, tick each point you can prove in your exported file. Be honest: this is exactly how your teacher will mark it.</p>${checkTable(x.check, ticks, 'lab:' + x.id)}<p><b>Your self-check: ${got} / ${t}</b></p></div></div>`;
    h += `<div class="card"><div class="tip"><b>Teacher's tip:</b> ${x.tip}</div>
      <div class="row" style="margin-top:12px"><button type="button" class="btn go" data-lxact="labdone" data-k="${x.id}">${st.done ? '✓ Completed (update)' : 'Mark this lab complete'}</button><button type="button" class="btn ghost" data-lxact="print">🖨 Print task sheet</button><button type="button" class="btn ghost" data-lxact="dl" data-k="${x.id}">⬇ Download task sheet</button>${nx ? `<button type="button" class="btn ghost" data-go="labs" data-k="${nx.id}">Next lab →</button>` : ''}</div></div>`;
    return h;
  }


  function download(api, title, sub, body) {
    const name = title.replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 60) + '.html';
    const html = sheetHTML(title, sub, body);
    if (DL) { DL.save({ filename: name, data: html }).catch(e => { if (e && e.code !== 'declined') api.toast('Download is not available here. Use Print instead.'); }); }
    else api.toast('Download is not available here. Use Print instead.');
  }
  function onClick(api, e) {
    const b = e.target.closest('[data-lxact]'); if (!b) return false;
    const S = store(api), k = b.dataset.k, act = b.dataset.lxact;
    if (act === 'print') { window.print(); return true; }
    if (act === 'labdone') { const st = S.labs[k] = S.labs[k] || { ticks: {} }; const first = !st.done; st.done = 1; api.save(); try { const x = LABS().find(z => z.id === k); if (x) window.dispatchEvent(new CustomEvent('dm:result', { detail: { kind: 'lab', id: x.id, title: 'Lab ' + x.id + ': ' + x.title, score: sum(x.check, st.ticks || {}), max: tot(x.check), module: x.sec || '', at: Date.now() } })); } catch (e) { } /* LMS hook */ if (first) api.reward(15, 'Practical lab complete', { xp: 15 }); else api.toast('Lab updated'); api.render(); return true; }
    if (act === 'dl') { const x = LABS().find(z => z.id === k); if (x) download(api, x.title, `${SECN[x.sec]} · ${APPS[x.app][0]} · ${x.level} · ${x.time} minutes`, `${x.brief}${x.data ? '<h2>Draft / data</h2><div class="doc">' + x.data + '</div>' : ''}<h2>Instructions</h2><ol>${x.tasks.map(t => '<li>' + t + '</li>').join('')}</ol><h2>Marking checklist</h2><table><tr><th>Criterion</th><th>Marks</th></tr>${x.check.map(r => '<tr><td>' + r.c + '</td><td>' + r.m + '</td></tr>').join('')}<tr><th>Total</th><th>${tot(x.check)}</th></tr></table>`); return true; }
    return false;
  }
  function onField(api, e) {
    return false;
  }
  function onChange(api, e) {
    if (onField(api, e)) return;
    const c = e.target.closest('[data-lxtick]'); if (!c) return;
    const S = store(api), key = c.dataset.lxtick, i = +c.dataset.i;
    if (key.startsWith('lab:')) { const id = key.slice(4); const st = S.labs[id] = S.labs[id] || { ticks: {} }; st.ticks = st.ticks || {}; st.ticks[i] = c.checked ? 1 : 0; }
    api.save(); api.render();
  }
  let wired = false;
  function wire(api) {
    if (wired) return; wired = true;
    document.addEventListener('click', e => { if (onClick(api, e)) { e.preventDefault(); e.stopPropagation(); } }, true);
    document.addEventListener('change', e => onChange(api, e));
    document.addEventListener('input', e => onField(api, e));
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'labs', title: 'Practical Labs',
    tile: { icon: '🧪', meta: 'Networking, HTML, spreadsheet, diagram and algorithm practicals for every module' },
    render(api, loc) { css(); wire(api); const x = LABS().find(z => z.id === loc.k); return x ? labView(api, x) : labsHome(api, loc); }
  });
})();
