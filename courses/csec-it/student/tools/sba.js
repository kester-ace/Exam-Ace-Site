/* CSEC Information Technology · SBA Studio (Paper 031) — Developed by Kester Small */
(function () {
  const D = () => window.COURSE_SBA || { components: [], scenarios: [], timeline: [], templates: [], pdfChecklist: [], integrity: { ok: [], no: [], habits: [] }, overview: { facts: [] } };
  const TKEY = 'csecit.sba.teacher';
  const LEVELS = [[1, '🪜', 'Foundation'], [2, '⚙️', 'Core'], [3, '🚀', 'Challenge']];
  const PROD = ['wp', 'web', 'ss', 'db'];
  let API = null, memT = null;

  /* ---------------- styles ---------------- */
  function css() {
    if (document.getElementById('sba-css')) return;
    const st = document.createElement('style'); st.id = 'sba-css';
    st.textContent = `.sba-tabs{display:flex;flex-wrap:wrap;gap:6px}
.sba-t{width:100%;border-collapse:collapse;font-size:.92rem}.sba-t caption{caption-side:top;text-align:left;font-weight:700;padding:4px 0}
.sba-t th,.sba-t td{border:1px solid var(--line,#33415a);padding:6px 8px;text-align:left;vertical-align:top}.sba-t th{background:var(--raise,rgba(255,255,255,.05))}
.sba-sheet{background:#fffdf6;color:#1a1a1a;border-radius:12px;padding:18px 20px;border:1px solid #e3d9bd;font:15px/1.55 Georgia,'Times New Roman',serif;display:flex;flex-direction:column;gap:8px;min-width:0}
.sba-sheet h3,.sba-sheet h4{font-family:Arial,sans-serif;color:#10224f;margin:6px 0 0}.sba-sheet h4{font-size:1rem;border-bottom:2px solid #10224f;padding-bottom:2px}
.sba-sheet ul,.sba-sheet ol{margin:0;padding-left:1.4em;display:flex;flex-direction:column;gap:4px}.sba-sheet code{font-size:.85em;background:#efe8d2;padding:0 4px;border-radius:4px}
.sba-sheet .sba-t{font:13px/1.35 Arial,sans-serif;color:#1a1a1a}.sba-sheet .sba-t th,.sba-sheet .sba-t td{border-color:#9aa3ad}.sba-sheet .sba-t th{background:#eef1f4}
.sba-sheet .hint{color:#555}.sba-sheet-h{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap;border-bottom:3px double #10224f;padding-bottom:8px}
.sba-sk{font:700 .72rem Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#8a6a00}.sba-sm{font:700 .9rem Arial,sans-serif;background:#10224f;color:#fff;border-radius:99px;padding:4px 12px;white-space:nowrap}
.sba-brief{background:#f3eedc;border-left:4px solid #c99a1a;padding:8px 12px;border-radius:6px}
.sba-formula{font-weight:700;font-size:1.08rem;background:var(--soft-gold);border-radius:12px;padding:10px 14px;text-align:center}
.sba-dial{display:inline-flex;border:2px solid var(--line);border-radius:99px;padding:3px;gap:3px;flex-wrap:wrap}
.sba-dial button{border:0;background:transparent;color:inherit;border-radius:99px;padding:7px 14px;font-weight:700;font:inherit;font-weight:700}
.sba-dial button.on{background:var(--gold,#f5c542);color:var(--on-gold,#1a1300)}
.sba-steps{display:flex;flex-direction:column;gap:12px;margin:0;padding:0;list-style:none;counter-reset:st}
.sba-step{border:1px solid var(--line);border-radius:14px;padding:12px 14px 12px 52px;position:relative;background:var(--raise)}
.sba-step::before{counter-increment:st;content:counter(st);position:absolute;left:12px;top:12px;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-weight:800;background:var(--gold,#f5c542);color:var(--on-gold,#1a1300)}
.sba-step h4{margin:0 0 4px}.sba-shot{font-size:.9rem;color:var(--muted);border-left:3px solid var(--blue,#7fb2ff);padding-left:8px;margin:6px 0}
.sba-ticks{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px}.sba-ticks label{display:flex;gap:10px;align-items:flex-start;cursor:pointer}
.sba-ticks input{width:20px;height:20px;flex:0 0 auto;margin-top:2px;accent-color:var(--gold,#f5c542)}
.sba-mini{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:6px}.sba-mini label{display:flex;gap:6px;align-items:center;font-size:.9rem;cursor:pointer}.sba-mini input{width:18px;height:18px;accent-color:var(--gold,#f5c542)}
.sba-lv{margin:0;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:3px;font-size:.9rem}.sba-lv b{display:inline-block;min-width:1.6em}
.sba-calc{max-width:680px;display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:8px 10px;align-items:center}
.sba-calc .input{width:5.2em;text-align:center;padding:8px}.sba-calc .g{grid-column:1/-1;font-weight:700;margin-top:6px;color:var(--muted);font-size:.85rem;text-transform:uppercase;letter-spacing:.06em}
.sba-big{font-size:2rem;font-weight:800;font-variant-numeric:tabular-nums}
.sba-stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}.sba-stat{border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--raise)}
.sba-stat .n{font-size:1.4rem;font-weight:800;font-variant-numeric:tabular-nums}
.sba-tl{list-style:none;margin:0;padding:0 0 0 18px;border-left:3px solid var(--line);display:flex;flex-direction:column;gap:14px}
.sba-tl li{position:relative}.sba-tl li::before{content:'';position:absolute;left:-27px;top:6px;width:14px;height:14px;border-radius:50%;background:var(--blue,#7fb2ff);border:3px solid var(--bg,#0a1638)}
.sba-tl li.past::before{background:var(--ok,#3fbf7f)}.sba-tl li.now::before{background:var(--gold,#f5c542);box-shadow:0 0 0 4px rgba(245,197,66,.35)}
.sba-pre{width:100%;min-height:220px;font:13px/1.4 ui-monospace,Consolas,'Courier New',monospace;white-space:pre;overflow:auto;resize:vertical}
.sba-scn{display:flex;flex-direction:column;gap:8px}.sba-scn.sel{box-shadow:0 0 0 3px var(--gold,#f5c542)}
.sba-mk input.input{width:3.6em;padding:6px;text-align:center}.sba-mk td,.sba-mk th{white-space:nowrap}.sba-mk td.nm{white-space:normal;min-width:140px}
.sba-mk .tot{font-weight:800;font-variant-numeric:tabular-nums}
#sba-pz-wrap{display:contents}
@media (max-width:560px){.sba-step{padding-left:14px;padding-top:46px}.sba-calc{grid-template-columns:minmax(0,1fr) auto}.sba-calc .mx{display:none}.sba-sheet{padding:14px 12px}}
@media print{body.sba-printing *{visibility:hidden!important}body.sba-printing #sba-pz,body.sba-printing #sba-pz *{visibility:visible!important}body.sba-printing #sba-pz{position:absolute;left:0;top:0;width:100%;background:#fff;color:#000}body.sba-printing #sba-pz .noprint{display:none}body.sba-printing #sba-pz input{border:0}}`;
    document.head.appendChild(st);
  }

  /* ---------------- state ---------------- */
  function st(api) {
    const S = api.S; S.sba = S.sba || {};
    const b = S.sba; b.ticks = b.ticks || {}; b.est = b.est || {}; b.got = b.got || {};
    if (b.level == null) b.level = [1, 2, 3].includes(+S.sbaLevel) ? +S.sbaLevel : 2;
    return b;
  }
  const comp = id => D().components.find(c => c.id === id);
  const scn = id => D().scenarios.find(s => s.id === id);
  const clamp = (v, mx) => { v = parseFloat(v); if (!isFinite(v) || v < 0) return 0; return Math.min(v, mx); };
  const fmt = n => (Math.round(n * 10) / 10).toString();

  /* component score from {critIndex: marks}; WP counts the best two of each option group */
  function compScore(c, m) {
    m = m || {};
    if (c.id !== 'wp') return c.criteria.reduce((a, cr, i) => a + clamp(m[i], cr.marks), 0);
    let base = 0; const A = [], B = [];
    c.criteria.forEach((cr, i) => { const v = clamp(m[i], cr.marks); if (cr.group === 'A') A.push(v); else if (cr.group === 'B') B.push(v); else base += v; });
    const top2 = a => a.sort((x, y) => y - x).slice(0, 2).reduce((p, q) => p + q, 0);
    return base + top2(A) + top2(B);
  }
  function overall(byComp) {
    const C = D().components, s = {};
    C.forEach(c => { s[c.id] = compScore(c, byComp[c.id]); });
    const prod = PROD.reduce((a, k) => a + (s[k] || 0), 0);
    return { s, prod, half: prod / 2, total: prod / 2 + (s.ps || 0) };
  }

  /* ---------------- teacher store ---------------- */
  function tLoad() {
    if (memT) return memT;
    let d = null; try { d = JSON.parse(localStorage.getItem(TKEY) || 'null'); } catch (e) { d = null; }
    memT = d && Array.isArray(d.students) ? d : { cls: '', students: [], sel: 0 };
    return memT;
  }
  function tSave() { try { localStorage.setItem(TKEY, JSON.stringify(memT)); } catch (e) { } }

  /* ---------------- shared bits ---------------- */
  function interestsMatch(s, api) {
    const I = (api.S.survey && Array.isArray(api.S.survey.interests)) ? api.S.survey.interests.map(x => String(x).toLowerCase()) : [];
    return s.interests.filter(x => I.includes(x.toLowerCase()));
  }
  function simBtns(c, esc) {
    return c.sims.map(([id, name, lv]) => `<button type="button" class="btn ghost" data-gx="opengame" data-page="games/${id}.html?level=${lv}" data-id="${id}">▶ Practise this in the simulator: ${esc(name)}</button>`).join('');
  }
  function tickList(b, key, items, esc, cls) {
    const t = b.ticks[key] || {};
    return `<ul class="${cls || 'sba-ticks'}">${items.map((x, i) => `<li><label><input type="checkbox" data-sba-tick="${key}" data-i="${i}" ${t[i] ? 'checked' : ''}><span>${esc(x)}</span></label></li>`).join('')}</ul>`;
  }
  const doneCount = (b, key, n) => { const t = b.ticks[key] || {}; let k = 0; for (let i = 0; i < n; i++) if (t[i]) k++; return k; };
  function tabs(loc, api) {
    const C = D().components, k = loc.k || 'overview';
    const T = [['overview', '🏁 Overview & marks'], ['choose', '🎯 Choose my project']].concat(C.map(c => [c.id, c.icon + ' ' + c.name])).concat([['timeline', '🗓️ Timeline'], ['docs', '📄 Templates'], ['integrity', '🤝 Integrity']]);
    if (api.teacherEdition) T.push(['marking', '🧑‍🏫 Marking sheet']);
    return `<nav class="card" aria-label="SBA Studio sections"><div class="sba-tabs chips">${T.map(([id, l]) => `<button type="button" class="chip ${k === id ? 'sel' : ''}" data-go="sba" data-k="${id}" ${k === id ? 'aria-current="page"' : ''}>${l}</button>`).join('')}</div></nav>`;
  }
  function hero(api, eyebrow, h1, p) {
    return `<div class="hero"><span class="eyebrow">${eyebrow}</span><h1>${h1}</h1><p>${p}</p>${api.listenBtn ? `<div class="row">${api.listenBtn('Listen')}</div>` : ''}</div>`;
  }

  /* ---------------- views ---------------- */
  function overviewView(api) {
    const W = D(), O = W.overview, b = st(api), esc = api.esc, R = overall(b.est), cur = scn(b.scn);
    const eff = c => PROD.includes(c.id) ? c.raw / 2 : c.raw;
    let h = hero(api, 'Paper 031 · School-Based Assessment', 'SBA Studio', `Everything you need for your CSEC Information Technology SBA: what is marked, how many marks each part is worth, five complete sample projects, step-by-step support at three levels, templates and a self-assessment calculator.`);
    h += `<div class="card"><h2>${esc(O.title)}</h2><div class="html-body">${O.html}</div></div>`;
    h += `<div class="card"><h3>Key facts</h3><div class="tablewrap"><table class="sba-t"><tbody>${O.facts.map(f => `<tr><th scope="row">${esc(f[0])}</th><td>${esc(f[1])}</td></tr>`).join('')}</tbody></table></div></div>`;
    h += `<div class="card"><h3>The five components</h3><div class="html-body">${O.rule}</div>
      <div class="tablewrap"><table class="sba-t"><thead><tr><th>Component</th><th>Raw marks</th><th>Counts towards /50</th><th>My estimate</th><th>Checklist</th></tr></thead><tbody>${W.components.map(c => { const n = c.progress.length, d = doneCount(b, 'p:' + c.id, n); return `<tr><td><button type="button" class="linkbtn" data-go="sba" data-k="${c.id}">${c.icon} ${esc(c.name)}</button></td><td>${c.raw}</td><td>${fmt(eff(c))}${PROD.includes(c.id) ? ' (÷2)' : ''}</td><td>${b.est[c.id] ? fmt(R.s[c.id]) + ' / ' + c.raw : '<span class="hint">not yet</span>'}</td><td>${d}/${n}</td></tr>`; }).join('')}
      <tr><th>Total</th><th>70 + 15</th><th>50</th><th>${fmt(R.total)} / 50</th><th></th></tr></tbody></table></div></div>`;
    h += `<div class="card"><h3>My estimated SBA mark</h3><p class="hint">Built from the self-assessment calculators on each component tab. Be honest: CXC moderation is not generous.</p>
      <div class="sba-stats"><div class="sba-stat"><div class="meta">Productivity raw</div><div class="n">${fmt(R.prod)} / 70</div></div><div class="sba-stat"><div class="meta">Halved</div><div class="n">${fmt(R.half)} / 35</div></div><div class="sba-stat"><div class="meta">Programming</div><div class="n">${fmt(R.s.ps || 0)} / 15</div></div><div class="sba-stat"><div class="meta">SBA total</div><div class="n">${fmt(R.total)} / 50</div></div></div>
      <div class="pbar" style="margin-top:10px"><i style="width:${R.total / 50 * 100}%"></i></div>
      <p>${cur ? `Your project: <b>${cur.icon} ${esc(cur.title)}</b>. <button type="button" class="linkbtn" data-go="sba" data-k="wp">Start with Word-Processing →</button>` : `You have not chosen a project yet. <button type="button" class="linkbtn" data-go="sba" data-k="choose">Choose my project →</button>`}</p></div>`;
    return h;
  }

  function chooseView(api) {
    const W = D(), b = st(api), esc = api.esc;
    const I = (api.S.survey && Array.isArray(api.S.survey.interests)) ? api.S.survey.interests : [];
    let h = hero(api, 'SBA Studio · Choose my project', 'Pick the project that fits you', `Five complete sample projects, each with a brief and five task sheets written like your teacher's SBA handout. ${I.length ? 'Projects that match the interests in your survey are marked with a star.' : 'Pick the one that sounds most like you: you will spend months with it.'} If your teacher sets a different brief, use these as practice and as models.`);
    h += `<div class="tiles">${W.scenarios.map(s => { const m = interestsMatch(s, api), sel = b.scn === s.id; return `<div class="card sba-scn ${sel ? 'sel' : ''}"><div class="row"><span class="ticon" aria-hidden="true" style="font-size:1.8rem">${s.icon}</span>${m.length ? `<span class="pill ok">⭐ Matches: ${esc(m.join(', '))}</span>` : ''}${sel ? '<span class="pill mark">My project</span>' : ''}</div>
      <h3>${esc(s.title)}</h3><p class="meta">${esc(s.tagline)}</p><div class="chips">${s.interests.map(x => `<span class="chip" style="cursor:default">${esc(x)}</span>`).join('')}</div>
      <details class="fold"><summary>Read the project brief</summary><div class="html-body">${s.brief}<ul>${W.components.map(c => `<li>${c.icon} <b>${esc(c.name)}:</b> ${c.id === 'wp' ? esc(s.wp.doc) : c.id === 'web' ? esc(s.web.title) : c.id === 'ss' ? esc(s.ss.file) + ' workbook' : c.id === 'db' ? esc(s.db.file) + ' database' : esc(s.ps.title) + ' program'}</li>`).join('')}</ul></div></details>
      <div class="row">${sel ? `<button type="button" class="btn go" data-go="sba" data-k="wp">Open my task sheets →</button>` : `<button type="button" class="btn gold" data-sba="pick" data-id="${s.id}">Choose this project</button>`}</div></div>`; }).join('')}</div>`;
    return h;
  }

  function markScheme(c, esc) {
    return `<div class="tablewrap"><table class="sba-t"><thead><tr><th>Criterion</th><th>Marks</th><th>What earns the marks</th></tr></thead><tbody>${c.criteria.map(cr => `<tr><td><b>${esc(cr.c)}</b>${cr.group ? `<br><span class="hint">${cr.group === 'A' ? 'Option group A (choose two)' : cr.group === 'B' ? 'Option group B (choose two)' : esc(cr.group)}</span>` : ''}${cr.cg ? `<br><span class="hint"><i>${esc(D().CG)}</i></span>` : ''}</td><td>${cr.marks}</td><td><ul class="sba-lv">${cr.lv.map(([m, d]) => `<li><b>${m}</b> ${esc(d)}</li>`).join('')}</ul></td></tr>`).join('')}</tbody></table></div>`;
  }

  function calc(c, b, esc) {
    const m = b.est[c.id] || {};
    let lastG = null, rows = '';
    c.criteria.forEach((cr, i) => {
      const g = cr.group === 'A' ? 'Option group A · best two count' : cr.group === 'B' ? 'Option group B · best two count' : cr.group || '';
      if (g !== lastG && g) rows += `<div class="g">${esc(g)}</div>`; lastG = g;
      rows += `<label for="sba-e-${c.id}-${i}">${esc(cr.c)}</label><input class="input" id="sba-e-${c.id}-${i}" type="number" inputmode="decimal" min="0" max="${cr.marks}" step="1" value="${m[i] != null ? esc(String(m[i])) : ''}" placeholder="0" data-sba-est="${c.id}" data-i="${i}"><span class="hint mx">/ ${cr.marks}</span>`;
    });
    const R = overall(b.est);
    return `<div class="sba-calc">${rows}</div>
      <div class="sba-stats" style="margin-top:12px"><div class="sba-stat"><div class="meta">${esc(c.name)}</div><div class="n"><span data-sba-out="comp">${fmt(R.s[c.id])}</span> / ${c.raw}</div></div>
      <div class="sba-stat"><div class="meta">${PROD.includes(c.id) ? 'Worth on the /50 (÷2)' : 'Worth on the /50'}</div><div class="n" data-sba-out="eff">${fmt(PROD.includes(c.id) ? R.s[c.id] / 2 : R.s[c.id])}</div></div>
      <div class="sba-stat"><div class="meta">Overall SBA estimate</div><div class="n"><span data-sba-out="total">${fmt(R.total)}</span> / 50</div></div></div>
      <p class="hint">Overall = (WP + Web + Spreadsheet + Database) ÷ 2 + Programming, using the estimates you have entered on every component tab. Marks above the maximum are capped.</p>`;
  }

  function supportView(c, s, b, esc) {
    const L = b.level, S = c.support;
    let h = `<div class="row" style="justify-content:space-between"><h3 style="margin:0">Support level</h3><div class="sba-dial" role="group" aria-label="Support level">${LEVELS.map(([n, ic, nm]) => `<button type="button" class="${L === n ? 'on' : ''}" aria-pressed="${L === n}" data-sba="level" data-l="${n}">${ic} ${nm}</button>`).join('')}</div></div>`;
    if (L === 1) {
      h += `<p class="hint">Level 1 · Foundation: a step-by-step walkthrough${s ? ` for the ${esc(s.title)} project` : ''}. Tick each mini-check as you go and take the screenshot described: it becomes your evidence.</p><ol class="sba-steps">${S[1].map((x, i) => { const key = `l1:${c.id}:${i}`, t = b.ticks[key] || {}; return `<li class="sba-step"><h4>${esc(x.t)}</h4><div>${x.how}</div><p class="sba-shot">📷 <b>Screenshot / what you should see:</b> ${esc(x.shot)}</p><div class="sba-mini">${x.check.map((k, j) => `<label><input type="checkbox" data-sba-tick="${key}" data-i="${j}" ${t[j] ? 'checked' : ''}>${esc(k)}</label>`).join('')}</div></li>`; }).join('')}</ol>`;
    } else if (L === 2) {
      const n = S[2].length, d = doneCount(b, 'l2:' + c.id, n);
      h += `<p class="hint">Level 2 · Core: the requirement checklist. Every line is something the moderator looks for. <b data-sba-cnt="l2:${c.id}">${d}</b> of ${n} ticked.</p>${tickList(b, 'l2:' + c.id, S[2], esc)}`;
    } else {
      h += `<p class="hint">Level 3 · Challenge: Grade One extension tips, then review your work against the top descriptors.</p><h4>Grade One extension tips</h4><ul>${S[3].tips.map(x => `<li>${x}</li>`).join('')}</ul><h4>Self-review against the mark scheme</h4><p class="hint">Tick only when the honest answer is yes.</p>${tickList(b, 'l3:' + c.id, S[3].review.map(x => x.replace(/<[^>]+>/g, '')), esc)}`;
    }
    return h;
  }

  function compView(api, c) {
    const b = st(api), esc = api.esc, s = scn(b.scn);
    const n = c.progress.length, d = doneCount(b, 'p:' + c.id, n);
    let h = `<div class="hero"><span class="eyebrow">${c.icon} Component · ${c.raw} raw marks${PROD.includes(c.id) ? ' (÷2 = ' + fmt(c.raw / 2) + ' of the 50)' : ' (all count on the 50)'}${s ? ' · ' + esc(s.title) : ''}</span><h1>${esc(c.name)}</h1><p>${esc(c.summary)}</p><div class="row">${simBtns(c, esc)}${api.listenBtn ? api.listenBtn('Listen') : ''}</div></div>`;
    h += `<div class="card"><h3>What CXC requires</h3><div class="html-body">${c.reqs}</div></div>`;
    if (s) h += `<div class="card" id="sba-pz"><div class="row noprint" style="justify-content:space-between"><h3 style="margin:0">My task sheet</h3><div class="row"><button type="button" class="btn ghost" data-sba="print">🖨 Print task sheet</button><button type="button" class="btn ghost" data-go="sba" data-k="choose">Change project</button></div></div><div class="sba-sheet" style="margin-top:10px">${D().sheet(s, c.id)}</div></div>`;
    else h += `<div class="card"><h3>My task sheet</h3><p class="fb note">Choose a sample project first and your full task sheet for this component appears here, with the exact data to use.</p><div class="row"><button type="button" class="btn gold" data-go="sba" data-k="choose">Choose my project</button></div></div>`;
    h += `<div class="card">${supportView(c, s, b, esc)}</div>`;
    h += `<div class="card"><h3>My progress checklist</h3><div class="pbar"><i data-sba-bar="p:${c.id}" style="width:${d / n * 100}%"></i></div><p class="hint"><b data-sba-cnt="p:${c.id}">${d}</b> of ${n} done. Your ticks are saved on this device.</p>${tickList(b, 'p:' + c.id, c.progress, esc)}</div>`;
    h += `<div class="card"><h3>Mark scheme</h3><p class="hint">Criteria marked “course guide” are our breakdown aligned to the CXC scheme. Always check the current syllabus and your teacher's mark scheme.</p>${markScheme(c, esc)}</div>`;
    h += `<div class="card"><h3>Self-assessment calculator</h3><p class="hint">Enter the mark you honestly think you would get for each criterion.</p>${calc(c, b, esc)}</div>`;
    h += `<div class="card"><h3>Common mistakes that lose marks</h3><ul>${c.mistakes.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
    if (c.id === 'ps') h += `<div class="card"><h3>PDF evidence checklist</h3><p class="hint">Your programming PDF, page by page, in this order.</p>${evidenceList(b, esc)}</div>`;
    const C = D().components, i = C.indexOf(c);
    h += `<div class="row">${i > 0 ? `<button type="button" class="btn ghost" data-go="sba" data-k="${C[i - 1].id}">← ${esc(C[i - 1].name)}</button>` : ''}${i < C.length - 1 ? `<button type="button" class="btn go" data-go="sba" data-k="${C[i + 1].id}">${esc(C[i + 1].name)} →</button>` : `<button type="button" class="btn go" data-go="sba" data-k="docs">Templates →</button>`}</div>`;
    return h;
  }

  function evidenceList(b, esc) {
    const P = D().pdfChecklist, t = b.ticks.pdf || {};
    return `<ol class="sba-ticks">${P.map(([a, d], i) => `<li><label><input type="checkbox" data-sba-tick="pdf" data-i="${i}" ${t[i] ? 'checked' : ''}><span><b>${i + 1}. ${esc(a)}</b><br><span class="hint">${esc(d)}</span></span></label></li>`).join('')}</ol>`;
  }

  function deadlineYear(b) {
    const now = new Date(), y = now.getFullYear(), dl = new Date(y, 3, 30, 23, 59);
    const def = now <= dl ? y : y + 1;
    return { def, y: b.year && b.year >= def - 1 && b.year <= def + 2 ? b.year : def };
  }
  function timelineView(api) {
    const b = st(api), esc = api.esc, { def, y } = deadlineYear(b), dl = new Date(y, 3, 30), now = new Date();
    const days = Math.ceil((dl - now) / 864e5);
    const dstr = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    let h = hero(api, 'SBA Studio · Timeline & deadlines', 'Plan backwards from 30 April', `Your school must send your SBA marks to CXC by 30 April of your exam year. Your school deadline will be earlier. Work back from it, one component at a time.`);
    h += `<div class="card"><div class="formgrid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))"><div class="field"><label for="sba-year">My exam year</label><select class="select" id="sba-year" data-sba-year="1">${[def - 1, def, def + 1, def + 2].map(x => `<option value="${x}" ${x === y ? 'selected' : ''}>May–June ${x}</option>`).join('')}</select></div>
      <div class="sba-stat"><div class="meta">CXC deadline</div><div class="n">${esc(dstr(dl))}</div><div class="hint">${days > 0 ? days + ' days to go' : 'This deadline has passed'}</div></div></div>
      <p class="hint">Dates below are suggested targets counted back from 30 April ${y}. Your teacher's dates always win.</p></div>`;
    let curSet = false;
    h += `<div class="card"><ol class="sba-tl">${D().timeline.map(t => {
      let when = esc(t.when), cls = '';
      if (t.weeks != null) { const d = new Date(dl.getTime() - t.weeks * 7 * 864e5); const past = d < now; if (!past && !curSet) { cls = 'now'; curSet = true; } else if (past) cls = 'past'; when += t.weeks ? ` · <b>start by ${esc(dstr(d))}</b> (${t.weeks} weeks before the deadline)` : ` · <b>${esc(dstr(d))}</b>`; }
      else when += ` · school year ${y - 2}–${y - 1}`;
      return `<li class="${cls}"><span class="kicker">${esc(t.phase)}</span><h3 style="margin:6px 0 2px">${esc(t.title)}</h3><p class="hint" style="margin:0 0 6px">${when}</p><ul>${t.tasks.map(x => `<li>${esc(x)}</li>`).join('')}</ul></li>`;
    }).join('')}</ol></div>`;
    return h;
  }

  function docsView(api) {
    const b = st(api), esc = api.esc;
    let h = hero(api, 'SBA Studio · Documentation templates', 'Templates you can copy', 'Copy a template, paste it into your word processor, then fill in the blanks. Templates are allowed: they are layouts, not answers.');
    h += D().templates.map(t => `<div class="card"><h3>${esc(t.title)}</h3><p class="hint">${esc(t.note)}</p><textarea class="input sba-pre" id="sba-tpl-${t.id}" readonly aria-label="${esc(t.title)}">${esc(t.text)}</textarea><div class="row"><button type="button" class="btn gold" data-sba="copy" data-id="${t.id}">📋 Copy</button></div></div>`).join('');
    h += `<div class="card"><h3>Trace table: worked layout</h3><p class="hint">Example using a tiny loop (not any project's answer): total ← 0; FOR i ← 1 TO 3: INPUT n; total ← total + n; ENDFOR; PRINT total. Data: 4, 7, 2.</p>
      <div class="tablewrap"><table class="sba-t"><thead><tr><th>Step</th><th>i</th><th>n</th><th>total</th><th>Output</th></tr></thead><tbody><tr><td>1</td><td></td><td></td><td>0</td><td></td></tr><tr><td>2</td><td>1</td><td>4</td><td>4</td><td></td></tr><tr><td>3</td><td>2</td><td>7</td><td>11</td><td></td></tr><tr><td>4</td><td>3</td><td>2</td><td>13</td><td></td></tr><tr><td>5</td><td></td><td></td><td></td><td>13</td></tr></tbody></table></div></div>`;
    h += `<div class="card"><h3>PDF evidence checklist (programming)</h3>${evidenceList(b, esc)}</div>`;
    return h;
  }

  function integrityView(api) {
    const b = st(api), esc = api.esc, I = D().integrity;
    let h = hero(api, 'SBA Studio · Academic integrity', 'Your work, your name, your grade', 'The SBA is a promise that the work is yours. Here is how to keep it honest and still get all the help you are allowed.');
    h += `<div class="card"><div class="html-body">${I.html}</div></div>`;
    h += `<div class="card"><div class="tablewrap"><table class="sba-t"><thead><tr><th>✅ Allowed</th><th>⛔ Not allowed</th></tr></thead><tbody>${I.ok.map((x, i) => `<tr><td>${esc(x)}</td><td>${esc(I.no[i] || '')}</td></tr>`).join('')}</tbody></table></div></div>`;
    h += `<div class="card"><h3>Habits that protect you</h3><ul>${I.habits.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
    h += `<div class="card"><h3>My integrity pledge</h3><label class="row" style="align-items:flex-start;flex-wrap:nowrap"><input type="checkbox" data-sba-pledge="1" ${b.pledge ? 'checked' : ''} style="width:22px;height:22px;flex:0 0 auto;accent-color:var(--gold)"><span>I will hand in only my own work, credit every source I use, and be ready to explain any part of my project.</span></label>${b.pledge ? `<p class="fb good">Pledge made on ${esc(new Date(b.pledge).toLocaleDateString('en-GB'))}.</p>` : ''}</div>`;
    return h;
  }

  /* ---------------- teacher marking sheet ---------------- */
  function tTotals(stu) { return overall(stu.marks || {}); }
  function modSample(T) {
    const L = T.students.map((s, i) => ({ i, name: s.name, t: tTotals(s).total })).sort((a, b) => b.t - a.t);
    if (!L.length) return [];
    if (L.length <= 3) return L.map((x, k) => ({ ...x, why: ['Top', 'Middle', 'Bottom'][k] || '' }));
    const pick = [['Top', 0], ['Upper middle', Math.round((L.length - 1) * .25)], ['Middle', Math.round((L.length - 1) / 2)], ['Lower middle', Math.round((L.length - 1) * .75)], ['Bottom', L.length - 1]];
    const seen = new Set(), out = [];
    pick.forEach(([w, k]) => { if (L.length < 5 && (w === 'Upper middle' || w === 'Lower middle')) return; if (!seen.has(k)) { seen.add(k); out.push({ ...L[k], why: w }); } });
    return out;
  }
  function markingView(api) {
    const esc = api.esc, T = tLoad(), C = D().components;
    if (T.sel >= T.students.length) T.sel = 0;
    const cur = T.students[T.sel];
    let h = `<div class="hero"><span class="eyebrow">Teacher Edition · Paper 031</span><h1>SBA marking sheet</h1><p>Enter your class list, mark each student criterion by criterion, and the sheet applies the CXC rule: (WP + Web + Spreadsheet + Database) ÷ 2 + Programming = /50. Saved in this browser only. Export a CSV regularly as your backup.</p></div>`;
    h += `<div class="card"><h3>Class list</h3><div class="formgrid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))"><div class="field"><label for="sba-cls">Class / group</label><input class="input" id="sba-cls" data-sbat-cls="1" value="${esc(T.cls || '')}" placeholder="e.g. 5B IT"></div>
      <div class="field"><label for="sba-names">Add students (one name per line)</label><textarea class="input" id="sba-names" rows="4" placeholder="Surname, First name"></textarea></div></div>
      <div class="row" style="margin-top:10px"><button type="button" class="btn gold" data-sba="t-add">Add to class list</button><button type="button" class="btn ghost" data-sba="t-csv" ${T.students.length ? '' : 'disabled'}>⬇ Export CSV</button><button type="button" class="btn ghost" data-sba="t-print" ${T.students.length ? '' : 'disabled'}>🖨 Print view</button></div></div>`;
    if (!T.students.length) return h + `<div class="card"><p class="hint">No students yet. Add names above to start marking.</p></div>`;
    h += `<div class="card"><h3>Mark a student</h3><div class="field"><label for="sba-stu">Student</label><select class="select" id="sba-stu" data-sbat-sel="1">${T.students.map((s, i) => `<option value="${i}" ${i === T.sel ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select></div>`;
    h += C.map(c => { const m = (cur.marks || {})[c.id] || {}; return `<details class="fold" style="margin-top:10px" ${c.id === 'wp' ? 'open' : ''}><summary>${c.icon} ${esc(c.name)} · <span data-sbat-ctot="${c.id}">${fmt(compScore(c, m))}</span> / ${c.raw}</summary><div><div class="sba-calc">${c.criteria.map((cr, i) => `<label for="sba-t-${c.id}-${i}">${esc(cr.c)}${cr.group === 'A' || cr.group === 'B' ? ` <span class="hint">(option ${cr.group}, best two count)</span>` : ''}</label><input class="input" id="sba-t-${c.id}-${i}" type="number" inputmode="decimal" min="0" max="${cr.marks}" step="1" value="${m[i] != null ? esc(String(m[i])) : ''}" data-sbat="${c.id}" data-i="${i}"><span class="hint mx">/ ${cr.marks}</span>`).join('')}</div></div></details>`; }).join('');
    const R = tTotals(cur);
    h += `<div class="sba-stats" style="margin-top:12px"><div class="sba-stat"><div class="meta">Productivity raw</div><div class="n"><span data-sbat-out="prod">${fmt(R.prod)}</span> / 70</div></div><div class="sba-stat"><div class="meta">Halved</div><div class="n"><span data-sbat-out="half">${fmt(R.half)}</span> / 35</div></div><div class="sba-stat"><div class="meta">Total</div><div class="n"><span data-sbat-out="total">${fmt(R.total)}</span> / 50</div></div></div>
      <div class="row" style="margin-top:10px"><button type="button" class="btn ghost" data-sba="t-remove">Remove this student</button></div></div>`;
    h += `<div class="card" id="sba-pz"><h3>Class summary${T.cls ? ' · ' + esc(T.cls) : ''}</h3><div class="tablewrap"><table class="sba-t sba-mk"><thead><tr><th>Student</th>${C.map(c => `<th>${c.short} /${c.raw}</th>`).join('')}<th>Prod. ÷2 /35</th><th>Total /50</th><th>Rounded</th></tr></thead><tbody>${T.students.map((s, i) => { const r = tTotals(s); return `<tr><td class="nm">${i === T.sel ? '<b>' + esc(s.name) + '</b>' : `<button type="button" class="linkbtn noprint-link" data-sba="t-pick" data-i="${i}">${esc(s.name)}</button>`}</td>${C.map(c => `<td>${fmt(r.s[c.id])}</td>`).join('')}<td>${fmt(r.half)}</td><td class="tot">${fmt(r.total)}</td><td>${Math.round(r.total)}</td></tr>`; }).join('')}</tbody></table></div>
      <p class="hint">Halving can give a half mark. Follow the current CXC instructions for rounding before you submit; the Rounded column rounds .5 up.</p>`;
    const MS = modSample(T);
    h += `<h3>Moderation sample suggestion</h3><p class="hint">CXC usually requests a sample of projects across the mark range. Check the current CXC moderation instructions for the exact number. Suggested from your current totals:</p><ul>${MS.map(x => `<li><b>${esc(x.why)}:</b> ${esc(x.name)} · ${fmt(x.t)} / 50</li>`).join('')}</ul></div>`;
    return h;
  }
  function csv() {
    const T = tLoad(), C = D().components, q = v => `"${String(v).replace(/"/g, '""')}"`;
    const head = ['Student'];
    C.forEach(c => c.criteria.forEach(cr => head.push(`${c.short}: ${cr.c} (/${cr.marks})`)));
    C.forEach(c => head.push(`${c.short} total (/${c.raw})`)); head.push('Productivity raw (/70)', 'Productivity halved (/35)', 'SBA total (/50)', 'Rounded');
    const rows = T.students.map(s => { const m = s.marks || {}, r = tTotals(s), row = [s.name]; C.forEach(c => c.criteria.forEach((cr, i) => row.push(m[c.id] && m[c.id][i] != null ? clamp(m[c.id][i], cr.marks) : ''))); C.forEach(c => row.push(fmt(r.s[c.id]))); row.push(fmt(r.prod), fmt(r.half), fmt(r.total), Math.round(r.total)); return row; });
    return [head].concat(rows).map(r => r.map(q).join(',')).join('\r\n');
  }
  function download(name, text) {
    const blob = new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' }), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; a.style.display = 'none'; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
  }
  function printZone() {
    document.body.classList.add('sba-printing');
    const off = () => { document.body.classList.remove('sba-printing'); window.removeEventListener('afterprint', off); };
    window.addEventListener('afterprint', off);
    try { window.print(); } catch (e) { }
    setTimeout(off, 1500);
  }

  /* ---------------- events (one delegated listener per event type) ---------------- */
  function liveEst(el) {
    const api = API, b = st(api), id = el.dataset.sbaEst, i = +el.dataset.i, c = comp(id); if (!c) return;
    const m = b.est[id] = b.est[id] || {};
    if (el.value === '') delete m[i]; else m[i] = clamp(el.value, c.criteria[i].marks);
    api.save();
    const R = overall(b.est), root = el.closest('.card') || document;
    const o = (k, v) => { const e = root.querySelector(`[data-sba-out="${k}"]`); if (e) e.textContent = v; };
    o('comp', fmt(R.s[id])); o('eff', fmt(PROD.includes(id) ? R.s[id] / 2 : R.s[id])); o('total', fmt(R.total));
  }
  function liveTeacher(el) {
    const T = tLoad(), stu = T.students[T.sel]; if (!stu) return;
    const id = el.dataset.sbat, i = +el.dataset.i, c = comp(id); if (!c) return;
    stu.marks = stu.marks || {}; const m = stu.marks[id] = stu.marks[id] || {};
    if (el.value === '') delete m[i]; else m[i] = clamp(el.value, c.criteria[i].marks);
    tSave();
    const R = tTotals(stu), set = (sel, v) => { const e = document.querySelector(sel); if (e) e.textContent = v; };
    set(`[data-sbat-ctot="${id}"]`, fmt(R.s[id])); set('[data-sbat-out="prod"]', fmt(R.prod)); set('[data-sbat-out="half"]', fmt(R.half)); set('[data-sbat-out="total"]', fmt(R.total));
  }
  function onTick(el) {
    const api = API, b = st(api), key = el.dataset.sbaTick, i = +el.dataset.i;
    const t = b.ticks[key] = b.ticks[key] || {}; if (el.checked) t[i] = 1; else delete t[i];
    api.save();
    const list = Array.from(document.querySelectorAll(`[data-sba-tick="${key}"]`)), n = list.length, d = list.filter(x => x.checked).length;
    document.querySelectorAll(`[data-sba-cnt="${key}"]`).forEach(e => { e.textContent = d; });
    document.querySelectorAll(`[data-sba-bar="${key}"]`).forEach(e => { e.style.width = (n ? d / n * 100 : 0) + '%'; });
    if (n && d === n && !b.got[key]) {
      b.got[key] = 1; api.save();
      if (key.startsWith('p:')) { const c = comp(key.slice(2)); api.reward(15, (c ? c.name : 'SBA') + ' checklist complete', { xp: 15 }); }
      else if (key.startsWith('l2:')) api.reward(8, 'Core requirement checklist complete', { xp: 8 });
      else if (key === 'pdf') api.reward(8, 'Programming PDF ready', { xp: 8 });
    }
  }
  function copyTpl(id) {
    const ta = document.getElementById('sba-tpl-' + id); if (!ta) return;
    const ok = () => API.toast('Copied. Paste it into your document.');
    const fallback = () => { try { ta.focus(); ta.select(); document.execCommand('copy'); ok(); } catch (e) { API.toast('Select the text and copy it with Ctrl+C.'); } };
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(ok, fallback); else fallback(); } catch (e) { fallback(); }
  }
  function onClick(e) {
    const el = e.target.closest('[data-sba]'); if (!el || !API) return;
    const api = API, b = st(api), act = el.dataset.sba;
    if (act === 'level') { b.level = +el.dataset.l || 2; api.save(); api.render(); return; }
    if (act === 'pick') { const s = scn(el.dataset.id); if (!s) return; const first = !b.scn; b.scn = s.id; api.save(); if (first) api.reward(10, 'SBA project chosen', { xp: 10 }); else api.toast('Project changed to ' + s.title); api.render(); return; }
    if (act === 'print') { printZone(); return; }
    if (act === 'copy') { copyTpl(el.dataset.id); return; }
    if (!api.teacherEdition) return;
    const T = tLoad();
    if (act === 't-add') { const ta = document.getElementById('sba-names'); const names = (ta ? ta.value : '').split(/\r?\n/).map(x => x.trim()).filter(Boolean); if (!names.length) { api.toast('Type at least one name.'); return; } const have = new Set(T.students.map(s => s.name.toLowerCase())); let k = 0; names.forEach(n => { if (!have.has(n.toLowerCase())) { T.students.push({ name: n.slice(0, 80), marks: {} }); have.add(n.toLowerCase()); k++; } }); tSave(); api.toast(k ? `${k} student${k > 1 ? 's' : ''} added` : 'Those names are already on the list'); api.render(); return; }
    if (act === 't-pick') { T.sel = +el.dataset.i || 0; tSave(); api.render(); return; }
    if (act === 't-remove') { const s = T.students[T.sel]; if (!s) return; if (el.dataset.confirm !== '1') { el.dataset.confirm = '1'; el.textContent = 'Tap again to remove ' + s.name; el.classList.add('gold'); return; } T.students.splice(T.sel, 1); T.sel = 0; tSave(); api.toast('Student removed'); api.render(); return; }
    if (act === 't-csv') { download(`SBA_marks_${(T.cls || 'class').replace(/[^A-Za-z0-9]+/g, '_')}.csv`, csv()); api.toast('CSV downloaded'); return; }
    if (act === 't-print') { printZone(); return; }
  }
  function onInput(e) {
    const el = e.target; if (!API || !el || !el.dataset) return;
    if (el.dataset.sbaEst) return liveEst(el);
    if (el.dataset.sbat && API.teacherEdition) return liveTeacher(el);
    if (el.dataset.sbatCls && API.teacherEdition) { tLoad().cls = el.value.slice(0, 60); tSave(); }
  }
  function onChange(e) {
    const el = e.target; if (!API || !el || !el.dataset) return;
    if (el.dataset.sbaTick != null) return onTick(el);
    if (el.dataset.sbaYear) { st(API).year = +el.value; API.save(); API.render(); return; }
    if (el.dataset.sbaPledge) { const b = st(API); if (el.checked) { const first = !b.got.pledge; b.pledge = Date.now(); b.got.pledge = 1; API.save(); if (first) API.reward(5, 'Integrity pledge made', { xp: 5 }); } else { b.pledge = 0; API.save(); } API.render(); return; }
    if (el.dataset.sbatSel && API.teacherEdition) { tLoad().sel = +el.value || 0; tSave(); API.render(); }
  }
  let wired = false;
  function wire() {
    if (wired) return; wired = true;
    document.addEventListener('click', onClick);
    document.addEventListener('input', onInput);
    document.addEventListener('change', onChange);
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'sba', title: 'SBA Studio',
    tile: { icon: '🗂️', meta: 'Paper 031 project: mark schemes, five sample projects, step-by-step support, templates and a self-assessment calculator' },
    render(api, loc) {
      API = api; css(); wire(); st(api);
      loc = loc || {}; let k = loc.k || 'overview';
      if (k === 'marking' && !api.teacherEdition) k = 'overview';
      const c = comp(k);
      let body;
      if (c) body = compView(api, c);
      else if (k === 'choose') body = chooseView(api);
      else if (k === 'timeline') body = timelineView(api);
      else if (k === 'docs') body = docsView(api);
      else if (k === 'integrity') body = integrityView(api);
      else if (k === 'marking') body = markingView(api);
      else { k = 'overview'; body = overviewView(api); }
      return tabs({ k }, api) + body;
    }
  });
})();
