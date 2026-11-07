/* CSEC Information Technology · Class Insights and customised class scheme of work (Teacher's Version only) · Developed by Kester Small.
   Students share an anonymous survey code (CSECIT1:…). Paste or upload the codes to see the class profile and a scheme of work
   customised to the class: pacing per section, starting levels, differentiated groups, activities matched to how the class learns. */
(function () {
  if (!window.COURSE_TEACHER_EDITION) return;
  const KEY = 'csecit.classplan';
  let A = null, R = null, VIEW = 'insights';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PL = () => window.CSEC_PLANNER;
  function load() { if (R) return R; try { R = JSON.parse(localStorage.getItem(KEY)) || { cls: 'My class', list: [] }; } catch (e) { R = { cls: 'My class', list: [] }; } return R; }
  function store() { try { localStorage.setItem(KEY, JSON.stringify(R)); } catch (e) { } }
  function addCodes(text) {
    const P = PL(); let n = 0, bad = 0; load();
    (String(text).match(/CSECIT1:[A-Za-z0-9+/=]+/g) || []).forEach(c => { const o = P.decode(c); if (o && o.a) { const key = c.slice(-24); if (!R.list.some(x => x.key === key)) { R.list.push({ key, n: o.n || '', f: o.f || (o.a && o.a.form) || '', a: o.a, d: o.d || {}, t: o.t || Date.now() }); n++; } } else bad++; });
    store(); return [n, bad];
  }
  function demo() {
    load(); const rnd = (() => { let s = 7; return () => (s = s * 16807 % 2147483647) / 2147483647; })();
    const pick = (arr, k) => { const c = arr.slice(), o = []; while (o.length < k && c.length) o.push(c.splice(Math.floor(rnd() * c.length), 1)[0]); return o; };
    const names = ['JR', 'Jaz', 'Kemi', 'DJ', 'Tash', 'Leo', 'Mia', 'Zion', 'Ari', 'Nia', 'Kai', 'Bree', 'Omari', 'Sasha', 'Tre', 'Ivy', 'Malik', 'Rae', 'Eli', 'Joy', 'Nate', 'Cleo', 'Dev', 'Amara'];
    names.forEach((n, i) => {
      const lvl = rnd(), conf = {}, apps = {}, d = {};
      ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'].forEach((s, k) => { conf[s] = String(Math.max(1, Math.min(4, Math.round(1 + lvl * 3 + (rnd() - .5) * 1.6 - (k > 5 ? .6 : 0))))); d[s] = rnd() < .35 + lvl * .5 ? (window.COURSE_SURVEY.check.find(q => q.sec === s) || { a: 0 }).a : Math.floor(rnd() * 4); });
      ['win', 'word', 'excel', 'access', 'pub', 'web', 'blocks', 'code'].forEach((k, j) => { apps[k] = String(Math.max(0, Math.min(3, Math.round(lvl * 3 - j * .25 + (rnd() - .5))))); });
      R.list.push({ key: 'demo' + i, n, f: rnd() < .8 ? 'F4' : 'F5', a: { form: rnd() < .8 ? 'F4' : 'F5', prior: ['none', 'some', 'full'][Math.floor(rnd() * 3)], where: pick(['lab', 'pc', 'tab', 'phone', 'lib'], 1 + Math.floor(rnd() * 3)), time: ['t1', 't2', 't3', 't4'][Math.floor(rnd() * 4)], goal: ['g1', 'g2', 'g3', 'gx'][Math.floor(rnd() * 4)], ways: pick(['video', 'read', 'listen', 'hands', 'games', 'friends', 'examples', 'explore'], 3), pace: ['small', 'mix', 'jump'][Math.floor(rnd() * 3)], group: ['solo', 'pair', 'team'][Math.floor(rnd() * 3)], when: ['am', 'pm', 'eve', 'wk'][Math.floor(rnd() * 4)], conf, apps, likes: pick(['Gaming', 'Music', 'Sports', 'Fashion', 'Business', 'Environment', 'Social media', 'Film', 'Art', 'Science', 'Robots', 'Food', 'Travel', 'Carnival'], 3), career: ['dev', 'web', 'sec', 'net', 'data', 'media', 'biz', 'unsure'][Math.floor(rnd() * 8)] }, d, t: Date.now(), demo: 1 });
    });
    R.cls = R.cls || 'Demo class'; store();
  }
  function stats() {
    const P = PL(), L = load().list, SECS = P.SECS, N = L.length;
    const lv = {}; SECS.forEach(s => { lv[s] = { 1: [], 2: [], 3: [], score: 0, conf: 0, nc: 0, diag: 0, nd: 0 }; });
    const cnt = (k, v) => L.filter(x => { const a = x.a || {}; return Array.isArray(a[k]) ? a[k].includes(v) : a[k] === v; }).length;
    L.forEach((x, i) => {
      const sc = P.sectionScores(x.a, x.d), nm = x.n || 'Student ' + (i + 1);
      SECS.forEach(s => { lv[s][sc[s].l].push(nm); lv[s].score += sc[s].score; if (x.a.conf && x.a.conf[s]) { lv[s].conf += +x.a.conf[s]; lv[s].nc++; } const q = (window.COURSE_SURVEY.check || []).find(c => c.sec === s); if (q && x.d && x.d[s] != null) { lv[s].nd++; if (+x.d[s] === q.a) lv[s].diag++; } });
    });
    SECS.forEach(s => { lv[s].avg = N ? Math.round(lv[s].score / N) : 0; lv[s].confAvg = lv[s].nc ? lv[s].conf / lv[s].nc : 0; lv[s].diagPct = lv[s].nd ? Math.round(lv[s].diag / lv[s].nd * 100) : 0; lv[s].cl = lv[s].avg < 42 ? 1 : lv[s].avg < 74 ? 2 : 3; });
    const Q = id => (window.COURSE_SURVEY.questions || []).find(q => q.id === id) || { opts: [], items: [] };
    const dist = id => Q(id).opts.map(([v, t]) => [t, cnt(id, v)]).sort((a, b) => b[1] - a[1]);
    const apps = Q('apps').items.map(([k, t]) => { const v = L.map(x => x.a.apps && x.a.apps[k]).filter(y => y !== undefined && y !== ''); return [t, v.length ? v.reduce((a, b) => a + +b, 0) / v.length : 0]; });
    return { N, lv, ways: dist('ways'), likes: dist('likes'), where: dist('where'), time: dist('time'), goal: dist('goal'), pace: dist('pace'), group: dist('group'), career: dist('career'), form: dist('form'), apps };
  }
  function bars(rows, max, fmt) { max = max || Math.max(1, ...rows.map(r => r[1])); return `<div class="cp-bars">${rows.map(([t, v]) => `<div class="cp-bar"><span>${esc(t)}</span><div class="cp-track"><i style="width:${Math.round(v / max * 100)}%"></i></div><b>${fmt ? fmt(v) : v}</b></div>`).join('')}</div>`; }
  function css() {
    if (document.getElementById('cp-css')) return;
    const el = document.createElement('style'); el.id = 'cp-css';
    el.textContent = `.cp-bars{display:flex;flex-direction:column;gap:6px}.cp-bar{display:grid;grid-template-columns:minmax(0,1fr) 44px;gap:2px 10px;align-items:center;font-size:.9rem}.cp-bar>span{grid-column:1/-1}.cp-track{height:12px;border-radius:99px;background:var(--raise);border:1px solid var(--line);overflow:hidden}.cp-track i{display:block;height:100%;background:linear-gradient(90deg,var(--gold-deep),var(--gold))}.cp-bar b{text-align:right;font-variant-numeric:tabular-nums;grid-row:2;grid-column:2}.cp-bar .cp-track{grid-row:2;grid-column:1}
.cp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}.cp-ta{width:100%;min-height:120px;font:12px/1.4 ui-monospace,Consolas,monospace;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);padding:10px}
.cp-lv td{vertical-align:top}.cp-names{font-size:.85rem;color:var(--muted)}
@media print{.top,.side,.foot,.cp-noprint,#wb-fab{display:none!important}body{background:#fff!important;color:#000!important}#sky,#fx{display:none!important}.card,.hero{box-shadow:none!important;border:1px solid #bbb!important;background:#fff!important;color:#000!important;break-inside:avoid}}`;
    document.head.appendChild(el);
  }
  function scheme(st) {
    const P = PL(), mods = A.mods(), SECS = P.SECS, L = load().list;
    const fakeA = { form: (st.form[0] || ['Form 4'])[0] === 'Form 5' ? 'F5' : 'F4', conf: {}, apps: {} };
    const E = P.examInfo(fakeA.form);
    const wt = s => { const m = mods.find(x => x.id === s); return (m ? m.units.length : 5) * ({ 1: 1.4, 2: 1, 3: .75 })[st.lv[s].cl] * (s === 'S7' || s === 'S8' ? 1.1 : 1); };
    const order = fakeA.form === 'F5' ? ['S4', 'S5', 'S6', 'S7', 'S8', 'S1', 'S2', 'S3'] : ['S1', 'S4', 'S2', 'S5', 'S3', 'S6', 'S7', 'S8'];
    const tot = order.reduce((a, s) => a + wt(s), 0); let wk = order.map(s => Math.max(1, Math.round(wt(s) / tot * E.weeks)));
    const topWays = st.ways.slice(0, 3).map(x => x[0]).join(', '), topLikes = st.likes.slice(0, 3).map(x => x[0].replace(/^\S+\s/, '')).join(', ');
    const ACT = { '🎬 Watching short videos': 'start lessons with a 3-minute video from the unit page', '📖 Reading clear notes': 'set the plain-words boxes and glossary as pre-reading', '🔊 Listening (read aloud)': 'use Read aloud on the projector for key screens', '🖱️ Hands-on practice in the software': 'run a simulator mission in every double period', '🎮 Games and challenges': 'close units with an arcade game or Class Tournament', '👥 Working with friends': 'use pair and group assignments and peer marking', '🪜 Step-by-step worked examples': 'model one worked example before each activity', '🧩 Figuring things out myself': 'open with a challenge problem, then teach' };
    let wkc = 1, rows = '';
    order.forEach((s, k) => {
      const m = mods.find(x => x.id === s); if (!m) return; const x = st.lv[s];
      rows += `<tr><td><b>Weeks ${wkc}–${wkc + wk[k] - 1}</b><br><span class="hint">${wk[k]} wk</span></td><td><b>${esc(m.code)}: ${esc(m.title)}</b><br><span class="cp-names">${m.units.map(u => esc(u.title)).join(' · ')}</span></td><td>${P.LVI[x.cl]} ${P.LVN[x.cl]}<br><span class="hint">class score ${x.avg}% · check ${x.diagPct}% correct</span></td><td>🪜 ${x[1].length} · ⚙️ ${x[2].length} · 🚀 ${x[3].length}<br><span class="cp-names">${x[1].length ? '🪜 ' + x[1].map(esc).join(', ') : ''}</span></td><td>${(P.SIMS[s] || []).map(y => esc(y[1])).join('<br>')}${m.assignments ? `<br><span class="hint">Assignments: ${m.assignments.filter(a => a.level === x.cl).map(a => esc(a.title)).slice(0, 2).join('; ')}</span>` : ''}</td></tr>`;
      wkc += wk[k];
    });
    return `<div class="card"><h2>Customised class scheme of work</h2><p class="hint">${E.weeks} teaching weeks to revision (from today) · ${st.N} student${st.N === 1 ? '' : 's'} · order ${fakeA.form === 'F5' ? 'puts the SBA sections first (Form 5)' : 'interleaves theory and practical sections (Form 4)'}. Weeks are weighted toward the sections where the class is least confident.</p>
      <p><b>How this class learns best:</b> ${esc(topWays || '—')}. <b>Teaching moves:</b> ${st.ways.slice(0, 3).map(w => ACT[w[0]]).filter(Boolean).map(esc).join('; ') || '—'}.</p>
      <p><b>Class interests for examples and SBA themes:</b> ${esc(topLikes || '—')}.</p>
      <div class="tablewrap"><table class="cp-lv"><thead><tr><th>When</th><th>Section and units</th><th>Class start level</th><th>Groups (🪜 names listed for support)</th><th>Simulators and tasks</th></tr></thead><tbody>${rows}<tr><td><b>Final 3 weeks</b></td><td colspan="4">Revision: mock Paper 01s and Paper 02s under timed conditions; target the lowest-scoring sections above.</td></tr></tbody></table></div></div>`;
  }
  function render(api) {
    A = api; css(); load();
    const st = stats();
    let h = `<section class="hero"><span class="eyebrow">Teacher's Version · Class Insights</span><h1>📊 ${esc(R.cls || 'My class')}: survey insights and custom scheme</h1><p>Students take <b>My Learning Survey</b> and share an anonymous code (initials or a nickname at most). Paste the codes here to see how your class learns and get a scheme of work customised to them. Codes are stored only in this browser.</p></section>`;
    h += `<div class="card cp-noprint"><div class="formgrid"><div class="field"><label for="cp-cls">Class name</label><input id="cp-cls" class="input" maxlength="40" value="${esc(R.cls || '')}" data-cpin="cls"></div></div>
      <label for="cp-ta"><b>Paste student codes</b> (any amount of text: codes are found automatically)</label><textarea id="cp-ta" class="cp-ta" placeholder="CSECIT1:…"></textarea>
      <div class="row"><button type="button" class="btn go" data-cp="add">Add codes</button><label class="btn ghost" style="cursor:pointer">📂 Upload .txt files<input type="file" accept=".txt,text/plain" multiple hidden data-cpfile></label><button type="button" class="btn ghost" data-cp="demo">Load a demo class</button><button type="button" class="btn ghost" data-cp="csv" ${st.N ? '' : 'disabled'}>⬇ Responses (CSV)</button><button type="button" class="btn ghost" data-cp="doc" ${st.N ? '' : 'disabled'}>⬇ Scheme (Word)</button><button type="button" class="btn ghost" data-cp="print" ${st.N ? '' : 'disabled'}>🖨 Print</button><button type="button" class="btn ghost" data-cp="clear" ${st.N ? '' : 'disabled'}>${A._cpArm ? 'Tap again to clear all' : 'Clear all'}</button></div></div>`;
    if (!st.N) return h + `<div class="card"><p>No responses yet. Ask students to open <b>📋 My Learning Survey & Plan</b>, finish it, and send you the code at the bottom of their plan. Or load the demo class to see what you will get.</p></div>`;
    const P = PL();
    h += `<div class="cp-grid"><div class="card"><h3>Class level by section</h3>${bars(P.SECS.map(s => [s + ' · ' + P.LVI[st.lv[s].cl] + ' ' + P.LVN[st.lv[s].cl], st.lv[s].avg]), 100, v => v + '%')}<p class="hint">Readiness score from confidence, the skills check and software experience.</p></div>
      <div class="card"><h3>Skills check: % correct</h3>${bars(P.SECS.map(s => [s + ' · ' + P.SNAME[s].split(' ').slice(0, 3).join(' '), st.lv[s].diagPct]), 100, v => v + '%')}</div>
      <div class="card"><h3>Software experience (0–3)</h3>${bars(st.apps, 3, v => v.toFixed(1))}</div>
      <div class="card"><h3>How they like to learn</h3>${bars(st.ways)}</div>
      <div class="card"><h3>Interests</h3>${bars(st.likes.slice(0, 8))}</div>
      <div class="card"><h3>Where they can practise</h3>${bars(st.where)}<p class="hint">${st.where.find(x => /phone/i.test(x[0])) && st.where.find(x => /phone/i.test(x[0]))[1] ? 'Some students are phone-only: book lab time for Word, Excel and Access missions.' : ''}</p></div>
      <div class="card"><h3>Time outside class</h3>${bars(st.time)}</div><div class="card"><h3>Pace and grouping</h3>${bars(st.pace.concat(st.group))}</div>
      <div class="card"><h3>Goals and careers</h3>${bars(st.goal.concat(st.career.slice(0, 4)))}</div></div>`;
    h += scheme(st);
    h += `<div class="card"><h3>Responses (${st.N})</h3><div class="tablewrap"><table><thead><tr><th>#</th><th>Name</th><th>Form</th>${P.SECS.map(s => `<th>${s}</th>`).join('')}<th></th></tr></thead><tbody>${R.list.map((x, i) => { const sc = P.sectionScores(x.a, x.d); return `<tr><td>${i + 1}</td><td>${esc(x.n || '—')}${x.demo ? ' <span class="hint">demo</span>' : ''}</td><td>${esc(x.f || '')}</td>${P.SECS.map(s => `<td title="${sc[s].score}%">${P.LVI[sc[s].l]}</td>`).join('')}<td><button type="button" class="linkbtn cp-noprint" data-cp="del" data-i="${i}">remove</button></td></tr>`; }).join('')}</tbody></table></div></div>`;
    return h;
  }
  function dl(name, text, type) { try { const b = new Blob([text], { type }), u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 5000); } catch (e) { A.toast('Download is not available here.'); } }
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-cp]'); if (!b || !A) return; const act = b.dataset.cp; load();
    if (act === 'add') { const [n, bad] = addCodes((document.getElementById('cp-ta') || {}).value || ''); A.toast(n ? `Added ${n} response${n === 1 ? '' : 's'}${bad ? ` (${bad} code${bad === 1 ? '' : 's'} could not be read)` : ''}.` : 'No new codes found. Codes start with CSECIT1:'); A.render(); return; }
    if (act === 'demo') { demo(); A.toast('Demo class loaded (24 sample students).'); A.render(); return; }
    if (act === 'del') { R.list.splice(+b.dataset.i, 1); store(); A.render(); return; }
    if (act === 'clear') { if (!A._cpArm) { A._cpArm = 1; A.render(); setTimeout(() => { A._cpArm = 0; }, 3000); return; } A._cpArm = 0; R.list = []; store(); A.render(); return; }
    if (act === 'print') { try { window.print(); } catch (er) { } return; }
    if (act === 'csv') { const P = PL(), q = s => '"' + String(s == null ? '' : s).replace(/"/g, '""') + '"'; const head = ['name', 'form', 'prior', 'time', 'goal', 'pace', 'group', 'ways', 'likes', 'where', 'career'].concat(P.SECS.map(s => s + '_conf')).concat(P.SECS.map(s => s + '_check')).concat(P.SECS.map(s => s + '_level')); const rows = R.list.map(x => { const a = x.a || {}, sc = P.sectionScores(a, x.d); return [x.n, a.form, a.prior, a.time, a.goal, a.pace, a.group, (a.ways || []).join(' '), (a.likes || []).join(' '), (a.where || []).join(' '), a.career].concat(P.SECS.map(s => (a.conf || {})[s] || '')).concat(P.SECS.map(s => x.d && x.d[s] != null ? x.d[s] : '')).concat(P.SECS.map(s => sc[s].l)).map(q).join(','); }); dl((R.cls || 'class') + ' survey responses.csv', head.join(',') + '\n' + rows.join('\n'), 'text/csv'); return; }
    if (act === 'doc') { const el = document.querySelector('#stage .stage-in'); const c = el.cloneNode(true); c.querySelectorAll('.cp-noprint,.foot,button,textarea,input').forEach(n => n.remove()); dl((R.cls || 'class') + ' CSEC IT scheme of work.doc', `<!doctype html><html><head><meta charset="utf-8"><title>Scheme of work</title><style>body{font:10.5pt Calibri,Arial,sans-serif;margin:1.6cm}h1,h2,h3{color:#1F3864}table{border-collapse:collapse;width:100%}th,td{border:1px solid #999;padding:4px 6px;vertical-align:top}th{background:#1F3864;color:#fff}.cp-track{display:none}.hint,.cp-names{color:#555;font-size:9pt}.eyebrow{color:#C9A227;font-weight:bold;text-transform:uppercase}</style></head><body>${c.innerHTML}<p class="hint">Kester Small</p></body></html>`, 'application/msword'); return; }
  });
  document.addEventListener('change', e => {
    const t = e.target; if (!A || !t.dataset) return;
    if (t.dataset.cpin === 'cls') { load().cls = t.value.slice(0, 40); store(); A.render(); }
    if (t.hasAttribute && t.hasAttribute('data-cpfile')) { const fs = Array.from(t.files || []); let tot = 0, done = 0; fs.forEach(f => { const r = new FileReader(); r.onload = () => { tot += addCodes(r.result)[0]; if (++done === fs.length) { A.toast(`Added ${tot} response${tot === 1 ? '' : 's'} from ${fs.length} file${fs.length === 1 ? '' : 's'}.`); A.render(); } }; r.readAsText(f); }); }
  });
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({ view: 'classplan', title: 'Class Insights & Custom Scheme', tile: { icon: '📊', meta: 'Teacher only: paste student survey codes to see the class profile and a scheme of work customised to them.' }, render });
})();
