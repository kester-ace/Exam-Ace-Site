/* Digital Media Unit 1: Practical Labs + SBA Project Studio — Developed by Kester Small */
(function () {
  const APPS = { image: ['Photo editing', '🖼️'], audio: ['Audio editing', '🎙️'], video: ['Video editing', '🎬'], design: ['Graphic design', '🎨'], present: ['Presentation', '📽️'], web: ['Web and blog', '🌐'], plan: ['Planning and writing', '📝'] };
  const SECN = { M1: 'Module 1 · Understanding Digital Media', M2: 'Module 2 · The Digital Media Ecosystem', M3: 'Module 3 · Creative Solution Design' };
  const ROMAN = { M1: '1', M2: '2', M3: '3' };
  const PNAME = {};

  const LABS = () => window.EDPM_LABS || [];
  const SBA = () => window.DM_SBA || { ideas: [], phases: [], checklist: [] };
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
  const store = api => { const S = api.S; S.labs = S.labs || {}; S.sba = S.sba || {}; S.sba.ev = S.sba.ev || {}; S.sba.cl = S.sba.cl || {}; S.sba.prop = S.sba.prop || {}; return S; };
  const appPill = a => `<span class="lx-pill">${APPS[a][1]} ${APPS[a][0]}</span>`;

  function sheetHTML(title, sub, body) {
    return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>body{font:15px/1.5 Georgia,serif;max-width:800px;margin:24px auto;padding:0 20px;color:#111}h1{font:700 22px Arial,sans-serif;margin:0 0 4px}h2{font:700 16px Arial,sans-serif;margin:22px 0 6px;border-bottom:2px solid #222}table{border-collapse:collapse;margin:8px 0;font:13px Arial,sans-serif}th,td{border:1px solid #777;padding:4px 7px;text-align:left;vertical-align:top}th{background:#eee}.doc{border:1px solid #bbb;padding:14px 18px;background:#fffef8}.sub{color:#555;font:13px Arial,sans-serif}.foot{margin-top:30px;color:#666;font:12px Arial,sans-serif}</style></head><body><h1>${title}</h1><div class="sub">${sub}</div>${body}<div class="foot">Digital Media Unit 1 · Kester Small</div></body></html>`;
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
    let h = `<div class="hero"><span class="eyebrow">Digital Media Unit 1 · Practical Labs</span><h1>Hands-on labs: photo, audio, video, design and web</h1><p>${all} practical exercises across the three modules, written like CAPE Paper 02 practicals. Read the brief, gather or use the supplied material, follow every setting exactly, then tick the marking checklist the way your teacher will. <b>${done}</b> of ${all} completed.</p></div>`;
    h += `<div class="card"><div class="chips" role="group" aria-label="Filter by software"><button type="button" class="chip ${f === 'all' ? 'sel' : ''}" data-go="labs" data-tab="all" ${sec ? `data-sub="${sec}"` : ''}>All software</button>${Object.entries(APPS).map(([k, v]) => `<button type="button" class="chip ${f === k ? 'sel' : ''}" data-go="labs" data-tab="${k}" ${sec ? `data-sub="${sec}"` : ''}>${v[1]} ${v[0]}</button>`).join('')}</div>
      <div class="chips" role="group" aria-label="Filter by module" style="margin-top:8px"><button type="button" class="chip ${!sec ? 'sel' : ''}" data-go="labs" data-tab="${f}">All modules</button>${Object.keys(SECN).map(k => `<button type="button" class="chip ${sec === k ? 'sel' : ''}" data-go="labs" data-tab="${f}" data-sub="${k}">Module ${ROMAN[k]}</button>`).join('')}</div></div>`;
    const by = {}; L.forEach(x => (by[x.sec] = by[x.sec] || []).push(x));
    Object.keys(SECN).filter(k => by[k]).forEach(k => {
      h += `<div class="card"><h3>${esc(SECN[k])}</h3><div class="lx-grid">${by[k].map(x => { const st = S.labs[x.id] || {}; const t = tot(x.check); return `<button type="button" class="lx-card ${st.done ? 'done' : ''}" data-go="labs" data-k="${x.id}"><div class="lx-meta">${appPill(x.app)}<span class="lx-pill">${esc(x.level)}</span></div><h4>${esc(x.title)}</h4><p class="hint">${x.time} min · ${t} marks${st.done ? ` · ✓ ${sum(x.check, st.ticks || {})}/${t}` : ''}</p></button>`; }).join('')}</div></div>`;
    });
    if (!sec || sec === 'M3') h += `<div class="card"><span class="kicker">Guided workbook · Module 3</span><h3>Photo Editing Unit: simple blemish removal in Photoshop</h3><p>The step-by-step workbook. Retouch on a separate layer, keep the real person, get consent, then export a PSD and a JPEG. Answer yes or no at each step: a no opens help.</p><div class="row" style="margin-top:8px"><button type="button" class="btn go" data-go="edpmgames" data-k="blemish">▶ Open the workbook</button></div></div>`;
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

  /* ---------------- SBA Project Studio ---------------- */
  const PROP = [
    ['xa', 'Title page and name of the product', 'The product name, project title, group members, candidate numbers, school, centre code, subject, unit and year.'],
    ['xb', 'Overview: introduction and summary', 'A brief introduction to the product or service and its context, then a summary of the content of the whole proposal.'],
    ['xc', 'Purpose and target audience', 'What the product or service is for, the need it meets, and exactly who it is designed for.'],
    ['xd', 'Rationale: the problem being solved', 'An overview of the problem, supported by your own research.'],
    ['xe', 'Research: instrument, data and analysis', 'Your data capture instrument, how and from whom you collected the data, the charts or tables that present it, and your analysis.'],
    ['xf', 'Concept (draft designs)', 'State the idea, show with draft designs how it works, and explain its impact on the audience and the community.'],
    ['xg', 'Methodology, tools and techniques', 'Every tool and technique you used, and a thorough explanation of your method.'],
    ['xh', 'Budget breakdown', 'A thorough, itemised and justified budget with totals (cash and in kind).'],
    ['xi', 'Timeline, production schedule and milestones', 'The timeline, the schedule of tasks (dates, duration, deliverable, owner) and the dated milestones.'],
    ['xj', 'Digital presentation and the 5-minute pitch', 'How you present the concept with digital tools, and the outline of your 5-minute pitch: the problem and situation, the solution and the target audience.'],
    ['xk', 'Appendices and bibliography', 'The data capture instrument, results, storyboards, drafts, permissions and APA references.']];
  /* headings used before the proposal builder followed the CXC SBA scheme: drafts saved under them are still shown, read-only, at the end of the builder */
  const OLD_PROP = [['a', 'Title page'], ['b', 'Executive summary'], ['c', 'Introduction and background'], ['d', 'Problem statement'], ['e', 'Objectives'], ['f', 'Plan of action'], ['g', 'Budget'], ['h', 'Benefits'], ['i', 'Evaluation'], ['j', 'Conclusion'], ['k', 'Appendices']];
  const STABS = [['overview', 'Overview & tracker'], ['guide', 'SBA guide & mark scheme'], ['ideas', 'Project ideas'], ['phases', 'Roadmap'], ['tools', 'Software & websites'], ['proposal', 'Proposal builder'], ['checklist', 'SBA checklist']];
  const L2 = x => Array.isArray(x) ? x : (x ? [x] : []);
  const LET = k => String(k).replace(/^x/, '');
  function stabsHTML(cur) { return `<div class="card"><div class="chips" role="tablist" aria-label="SBA Project Studio">${STABS.map(([k, n]) => `<button type="button" role="tab" class="chip ${cur === k ? 'sel' : ''}" aria-selected="${cur === k}" data-go="portfolio" data-sub="${k}">${n}</button>`).join('')}</div></div>`; }
  function shero() { return `<div class="hero"><span class="eyebrow">Digital Media Unit 1 · SBA Project Studio (Paper 031)</span><h1>Build a Grade One SBA</h1><p>The School-Based Assessment is <b>60%</b> of your Unit 1 grade. You design a <b>product or service</b> that solves a real problem, write a <b>proposal</b>, show your <b>progress</b> step by step and the <b>process</b> you used, and sell the idea in a <b>5-minute pitch</b>. Pick a project, follow the roadmap, draft your proposal here, then tick the checklist.</p></div>`; }
  function evCount(S) { const P = SBA().phases || []; let all = 0, done = 0; P.forEach(p => L2(p.evidence).forEach((_, i) => { all++; if (S.sba.ev[p.id + ':' + i]) done++; })); return { all, done }; }
  function propCount(S) { return PROP.filter(([k]) => (S.sba.prop[k] || '').trim().length > 20).length; }
  function sbaHome(api, loc) {
    const S = store(api), esc = api.esc, D = SBA(), sub = loc.sub || 'overview';
    let h = shero() + stabsHTML(sub);
    const idea = (D.ideas || []).find(x => x.id === S.sba.idea);
    if (sub === 'overview') {
      const E = evCount(S), pc = propCount(S); let cA = 0, cD = 0; (D.checklist || []).forEach((g, gi) => L2(g.items).forEach((_, i) => { cA++; if (S.sba.cl[gi + '-' + i]) cD++; }));
      const pct = Math.round(((E.all ? E.done / E.all : 0) + pc / PROP.length + (cA ? cD / cA : 0)) / 3 * 100);
      h += `<div class="card"><div class="row" style="justify-content:space-between;gap:16px;align-items:center"><div><span class="kicker">My SBA tracker</span><div class="lx-score">${pct}%</div><p class="hint">Evidence ${E.done}/${E.all} · Proposal sections drafted ${pc}/${PROP.length} · Checklist ${cD}/${cA}</p></div><div style="flex:1;min-width:200px"><div class="lx-bar"><i style="width:${pct}%"></i></div></div></div>
        <p><b>My project:</b> ${idea ? `<button type="button" class="linkbtn" data-go="portfolio" data-k="${idea.id}">${esc(idea.title)}</button>` : (S.sba.own ? esc(S.sba.own) : '<span class="hint">Not chosen yet. Open Project ideas, or type your own below.</span>')}</p>
        <div class="field"><label for="sba-own">Or my own project title</label><input id="sba-own" class="input" data-lxf="own" maxlength="140" value="${esc(S.sba.own || '')}"></div></div>`;
      h += `<div class="card"><h3>The roadmap at a glance</h3><ol class="lx-tasks">${(D.phases || []).map(p => { const ev = L2(p.evidence), d = ev.filter((_, i) => S.sba.ev[p.id + ':' + i]).length; return `<li><button type="button" class="linkbtn" data-go="portfolio" data-tab="${esc(p.id)}">${esc(p.name)}</button> <span class="hint">· ${d}/${ev.length} evidence</span></li>`; }).join('')}</ol></div>`;
      h += `<div class="card"><span class="kicker">Example digital solution</span><h3>LoloGo: a local food-ordering app</h3><p>An original, working mobile app prototype: the problem (long waits at busy roadside lolos), the audience (residents, students and visitors) and the solution (order ahead for pick-up or delivery). Explore it, then ask: how does it meet its audience's needs, what would you test with users, and what evidence would its creator keep in a portfolio?</p><div class="row" style="margin-top:10px"><button type="button" class="btn go" data-go="edpmgames" data-k="lologo">▶ Open LoloGo</button><button type="button" class="btn gold" data-go="edpmgames" data-k="lologo-case">📐 Case study: lo-fi to hi-fi</button><button type="button" class="btn ghost" data-go="edpmgames" data-k="lologo-pair">📝 Sample Pair Assignment</button><button type="button" class="btn ghost" data-go="edpmgames" data-k="lologo-sba">📘 Sample final IA (SBA)</button><button type="button" class="btn ghost" data-go="portfolio" data-sub="tools">Software used for prototypes</button></div><p class="hint" style="margin-top:8px">All businesses in LoloGo are sample businesses for teaching. Demo sign-in code: 1721. In Owner mode, try "Add dish photo" with your own photos of local food.</p></div>`;
      if (D.note) h += `<div class="card"><p class="hint">${D.note}</p></div>`;
    }
    if (sub === 'ideas') {
      const secs = [...new Set((D.ideas || []).map(x => x.sector))];
      h += secs.map(sc => `<div class="card"><h3>${esc(sc || 'Other')}</h3><div class="lx-grid">${D.ideas.filter(x => x.sector === sc).map(x => `<button type="button" class="lx-card ${S.sba.idea === x.id ? 'done' : ''}" data-go="portfolio" data-k="${x.id}"><h4>${esc(x.title)}</h4><p class="hint">${esc(x.audience || '')}${S.sba.idea === x.id ? ' · ✓ my project' : ''}</p></button>`).join('')}</div></div>`).join('');
    }
    if (sub === 'phases') {
      h += `<div class="card"><div class="lx-grid">${(D.phases || []).map((p, i) => { const ev = L2(p.evidence), d = ev.filter((_, j) => S.sba.ev[p.id + ':' + j]).length; return `<button type="button" class="lx-card ${ev.length && d === ev.length ? 'done' : ''}" data-go="portfolio" data-tab="${esc(p.id)}"><span class="lx-pill">Phase ${i + 1}</span><h4>${esc(p.name)}</h4><p class="hint">${d}/${ev.length} evidence saved</p></button>`; }).join('')}</div></div>`;
    }
    if (sub === 'proposal') h += propHTML(api);
    if (sub === 'tools') h += toolsHTML(api);
    if (sub === 'guide') h += guideHTML(api);
    if (sub === 'checklist') {
      let all = 0, done = 0;
      const body = (D.checklist || []).map((g, gi) => `<div class="card"><h3>${esc(g.group)}</h3>${L2(g.items).map((t, i) => { const k = gi + '-' + i; all++; if (S.sba.cl[k]) done++; return `<label class="row" style="gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--line,#33415a)"><input type="checkbox" data-lxcl="${k}" ${S.sba.cl[k] ? 'checked' : ''} style="width:20px;height:20px;margin-top:2px;accent-color:var(--gold,#f5c542)"><span>${typeof t === 'string' ? esc(t) : esc(t.t || t.text || '')}</span></label>`; }).join('')}</div>`).join('');
      h += `<div class="card"><span class="kicker">Ready to submit?</span><div class="lx-score">${done} / ${all}</div><div class="lx-bar"><i style="width:${all ? Math.round(done / all * 100) : 0}%"></i></div><p class="hint">${D.note ? D.note : 'Tick each point when it is true of your finished SBA.'}</p></div>` + body;
    }
    return h;
  }
  function ideaView(api, x) {
    const S = store(api), esc = api.esc, mine = S.sba.idea === x.id;
    return `<div class="crumbs"><button type="button" class="linkbtn" data-go="portfolio" data-sub="ideas">← Project ideas</button><span>${esc(x.sector || '')}</span></div>
    <div id="lx-print"><div class="card"><span class="kicker">SBA project idea · ${esc(x.sector || '')}</span><h2>${esc(x.title)}</h2><p><b>The problem:</b> ${esc(x.problem || '')}</p><p><b>Audience:</b> ${esc(x.audience || '')}</p><p><b>Possible digital solutions:</b> ${L2(x.solutionTypes).map(esc).join(' · ')}</p><p><b>Realistic scope:</b> ${esc(x.scope || '')}</p><h3>Start your research with</h3><ol class="lx-tasks">${L2(x.startingQuestions).map(q => `<li>${esc(q)}</li>`).join('')}</ol></div></div>
    <div class="card"><div class="row"><button type="button" class="btn ${mine ? 'ghost' : 'go'}" data-lxact="pick" data-k="${x.id}">${mine ? '✓ This is my project' : 'Make this my project'}</button><button type="button" class="btn ghost" data-go="portfolio" data-sub="proposal">Start my proposal →</button><button type="button" class="btn ghost" data-lxact="print">🖨 Print</button></div></div>`;
  }
  function phaseView(api, p) {
    const S = store(api), esc = api.esc, P = SBA().phases || [], i = P.indexOf(p), nx = P[i + 1];
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="portfolio" data-sub="phases">← Roadmap</button><span>Phase ${i + 1}</span></div>`;
    h += `<div class="card"><span class="kicker">Phase ${i + 1} of ${P.length}</span><h2>${esc(p.name)}</h2><div class="html-body"><p>${p.description || ''}</p></div></div>`;
    if (L2(p.elements).length) h += `<div class="card"><h3>Proposal elements</h3><div class="tablewrap"><table class="lx-check"><tbody>${L2(p.elements).map(e => typeof e === 'string' ? `<tr><td>${esc(e)}</td></tr>` : `<tr><td><b>${esc(e.name || e.element || e.title || '')}</b><br>${esc(e.description || e.desc || '')}${e.sample ? `<br><i>“${esc(e.sample)}”</i>` : ''}</td></tr>`).join('')}</tbody></table></div></div>`;
    if (L2(p.deliverables).length) h += `<div class="card"><h3>Deliverables</h3><ul>${L2(p.deliverables).map(d => `<li>${esc(typeof d === 'string' ? d : (d.t || d.name || ''))}</li>`).join('')}</ul></div>`;
    h += `<div class="card"><h3>Portfolio evidence to save</h3><p class="hint">Tick each item once it is saved in your portfolio folder, dated and labelled.</p>${L2(p.evidence).map((t, j) => `<label class="row" style="gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--line,#33415a)"><input type="checkbox" data-lxev="${esc(p.id)}:${j}" ${S.sba.ev[p.id + ':' + j] ? 'checked' : ''} style="width:20px;height:20px;margin-top:2px;accent-color:var(--gold,#f5c542)"><span>${esc(typeof t === 'string' ? t : (t.t || ''))}</span></label>`).join('')}</div>`;
    const PG = TOOLS().groups.filter(g => (g.phase || []).includes(p.id));
    if (PG.length) h += `<div class="card"><h3>Software and websites for this phase</h3>${PG.map(g => `<h4 style="margin-top:8px">${g.i} ${esc(g.n)}</h4><ul class="lx-links">${g.tools.map(t => linkRow(t, esc)).join('')}</ul>`).join('')}</div>`;
    if (L2(p.tips).length) h += `<div class="card"><div class="tip"><b>Teacher's tip:</b> ${L2(p.tips).map(esc).join(' ')}</div></div>`;
    h += `<div class="card"><div class="row">${p.id && /propos/i.test(p.name) ? '<button type="button" class="btn go" data-go="portfolio" data-sub="proposal">Open the proposal builder</button>' : ''}${nx ? `<button type="button" class="btn ghost" data-go="portfolio" data-tab="${esc(nx.id)}">Next: ${esc(nx.name)} →</button>` : ''}</div></div>`;
    return h;
  }
  const TOOLS = () => (window.DM_TOOLS || { groups: [] });
  const tutName = n => n.replace(/\s*\(.*?\)\s*/g, ' ').replace(/^ArtCraft: all apps$/, 'ArtCraft craft apps').replace(/ \(download\)$/, '').replace(/:\s*/, ' ').trim();
  const tutURL = n => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(tutName(n) + ' tutorial for beginners');
  const linkRow = (t, esc) => `<li><a href="${esc(t[1])}" target="_blank" rel="noopener noreferrer"><b>${esc(t[0])}</b> ↗</a> <a class="lx-yt" href="${esc(tutURL(t[0]))}" target="_blank" rel="noopener noreferrer" aria-label="Beginner tutorials on YouTube for ${esc(tutName(t[0]))}">▶ Beginner tutorials</a> <span class="hint">· ${esc(t[2])}${t[3] ? ' · <i>' + esc(t[3]) + '</i>' : ''}</span></li>`;
  function findTool(name) { for (const g of TOOLS().groups) { const t = g.tools.find(x => x[0] === name || x[0].startsWith(name)); if (t) return t; } return null; }
  function toolsHTML(api) {
    const esc = api.esc, T = TOOLS();
    return `<div class="card"><h3>Software and websites for your SBA</h3><p class="hint">${esc(T.note || '')}</p><div class="chips">${T.groups.map(g => `<a class="chip" href="#tg-${g.id}">${g.i} ${esc(g.n)}</a>`).join('')}</div></div>` +
      T.groups.map(g => `<div class="card" id="tg-${g.id}"><h3>${g.i} ${esc(g.n)}</h3><ul class="lx-links">${g.tools.map(t => linkRow(t, esc)).join('')}</ul></div>`).join('');
  }
  const GUIDE = () => window.DM_SBA_GUIDE;
  function allocCalc(t) { t = Math.max(0, Math.round(+t || 0)); const b = Math.floor(t / 3), r = t % 3; return [b, b + (r === 2 ? 1 : 0), b + (r >= 1 ? 1 : 0)]; }
  const SBA_CAP = 45;
  function guideHTML(api) {
    const S = store(api), esc = api.esc, G = GUIDE(); if (!G) return '';
    if (S.sba.selfv !== (G.version || '')) { S.sba.self = {}; S.sba.selfv = G.version || ''; } /* a new mark scheme starts the self-assessment afresh */
    const self = S.sba.self = S.sba.self || {};
    let tot = 0, secTot = {};
    G.sections.forEach(sec => { secTot[sec.id] = [0, 0]; sec.items.forEach((it, i) => { const k = sec.id + '-' + i, v = Math.min(it[1], +self[k] || 0); secTot[sec.id][0] += v; secTot[sec.id][1] += it[1]; tot += v; }); });
    const raw = tot; tot = Math.min(SBA_CAP, tot); /* the SBA is marked out of 45: the calculator never goes above it */
    let h = `<div class="card"><span class="kicker">60% of your Unit 1 grade</span><h2>What is the SBA?</h2><p>${esc(G.intro)}</p>
      <div class="lx-grid" style="margin-top:12px">${G.aims.map(a => `<div class="lx-card" style="cursor:default"><span class="lx-pill">${esc(a[0])}</span><p style="margin:0">${esc(a[1])}</p></div>`).join('')}</div></div>`;
    h += `<div class="card"><h3>Purpose of the SBA</h3><div class="lx-grid">${G.purpose.map(a => `<div class="lx-card" style="cursor:default"><h4>${esc(a[0])}</h4><p class="hint">${esc(a[1])}</p></div>`).join('')}</div></div>`;
    h += `<div class="card"><h3>Rules you must follow</h3><div class="tablewrap"><table class="lx-check"><tbody>${G.rules.map(r => `<tr><td style="width:150px"><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td></tr>`).join('')}</tbody></table></div></div>`;
    h += `<div class="card"><h3>What your SBA must include</h3><div class="lx-meta">${G.requiredSections.map((x, i) => `<span class="chip">${i + 1}. ${esc(x)}</span>`).join('')}</div>
      <h3 style="margin-top:14px">Research component</h3><ul>${G.research.map(r => `<li><b>${esc(r[0])}:</b> ${esc(r[1])}</li>`).join('')}</ul>
      <h3 style="margin-top:14px">Progress and process</h3><ul>${G.process.map(r => `<li><b>${esc(r[0])}:</b> ${esc(r[1])}</li>`).join('')}</ul>
      <h3 style="margin-top:14px">${esc(G.product.title || 'The product')}</h3><p>${esc(G.product.text)}</p><div class="lx-grid">${G.product.items.map(a => `<div class="lx-card" style="cursor:default"><h4>${esc(a[0])}</h4><p class="hint">${esc(a[1])}</p></div>`).join('')}</div></div>`;
    h += `<div class="card" id="sg-score"><span class="kicker">Mark scheme · self-assessment</span><div class="row" style="justify-content:space-between;gap:16px;align-items:center"><div><div class="lx-score">${tot} / 45</div><p class="hint">Weighted by CXC to 135: about <b>${tot * 3} / 135</b>. Pick the mark you honestly think each part earns now.</p></div><div style="flex:1;min-width:200px"><div class="lx-bar"><i style="width:${Math.round(tot / 45 * 100)}%"></i></div></div></div>
      <div class="lx-meta" style="margin-top:8px">${G.sections.map(sec => `<span class="lx-pill">${esc(sec.name.split(' · ')[1] || sec.name)}: ${secTot[sec.id][0]}/${secTot[sec.id][1]}</span>`).join('')}</div></div>`;
    h += G.sections.map(sec => `<div class="card"><h3>${esc(sec.name)} <span class="hint">· ${secTot[sec.id][1]} marks</span></h3><div class="tablewrap"><table class="lx-check"><thead><tr><th>Component</th><th>Full marks</th><th>Partial</th><th>No mark</th><th class="m">My mark</th></tr></thead><tbody>${sec.items.map((it, i) => { const k = sec.id + '-' + i, v = +self[k] || 0; return `<tr><td><b>${esc(it[0])}</b><br><span class="hint">${it[1]} mark${it[1] > 1 ? 's' : ''}</span></td><td>${esc(it[2])}</td><td class="hint">${esc(it[3])}</td><td class="hint">${esc(it[4])}</td><td class="m"><select class="input" style="width:auto" data-lxself="${k}" aria-label="My mark for ${esc(it[0])}">${(Array.isArray(it[5]) ? it[5] : Array.from({ length: it[1] + 1 }, (_, n) => n)).map(n => `<option value="${n}" ${n === v ? 'selected' : ''} ${n !== v && raw - v + n > SBA_CAP ? 'disabled' : ''}>${n}</option>`).join('')}</select> / ${it[1]}</td></tr>`; }).join('')}</tbody></table></div></div>`).join('');
    const a = allocCalc(S.sba.alloc != null ? S.sba.alloc : tot);
    h += `<div class="card"><h3>How your score is shared across the modules</h3><p>${esc(G.allocation)}</p><div class="row" style="gap:12px;align-items:center;margin-top:8px"><label for="sg-alloc"><b>Total SBA score</b></label><input id="sg-alloc" class="input" type="number" min="0" max="45" style="width:100px" value="${esc(String(S.sba.alloc != null ? S.sba.alloc : tot))}" data-lxalloc="1"><span id="sg-alloc-out" aria-live="polite">Module 1: <b>${a[0]}</b> · Module 2: <b>${a[1]}</b> · Module 3: <b>${a[2]}</b></span></div></div>`;
    h += `<div class="card"><p class="hint">${esc(G.source)}</p><div class="row"><button type="button" class="btn ghost" data-go="portfolio" data-sub="checklist">Open the SBA checklist</button><button type="button" class="btn ghost" data-go="portfolio" data-sub="proposal">Open the proposal builder</button><button type="button" class="btn ghost" data-lxact="print">🖨 Print</button></div></div>`;
    return h;
  }
  function propHTML(api) {
    const S = store(api), esc = api.esc, P = S.sba.prop, idea = (SBA().ideas || []).find(x => x.id === S.sba.idea);
    let h = `<div class="card"><h3>Proposal builder</h3><p class="hint">Draft each element (${LET(PROP[0][0])}) to (${LET(PROP[PROP.length - 1][0])}). Your words save automatically on this device. ${idea ? `Project: <b>${esc(idea.title)}</b>.` : ''} When you are done, download the draft and finish it in your word processor.</p></div>`;
    const EL = {}; (SBA().phases || []).forEach(p => L2(p.elements).forEach(e => { if (e && e.k) EL[e.k] = e; }));
    h += PROP.map(([k, n, d]) => `<div class="card"><div class="field"><label for="sp-${k}"><b>(${LET(k)}) ${n}</b> <span class="hint">· ${esc(EL[k] && EL[k].desc ? EL[k].desc : d)}</span></label>${EL[k] && EL[k].sample ? `<p class="hint"><i>Example: ${esc(EL[k].sample)}</i></p>` : ''}<textarea id="sp-${k}" class="ta" rows="${k === 'a' ? 3 : 5}" data-lxf="prop.${k}">${esc(P[k] || '')}</textarea><p class="hint">${(P[k] || '').trim().split(/\s+/).filter(Boolean).length} words</p></div></div>`).join('');
    const OLD = OLD_PROP.filter(([k]) => (P[k] || '').trim());
    if (OLD.length) h += `<div class="card"><h3>Text from your earlier draft</h3><p class="hint">The proposal builder now follows the CXC SBA mark scheme, so its headings have changed. Your earlier text is kept here: copy what you need into the new headings above.</p>${OLD.map(([k, n]) => `<div class="field"><label for="sp-old-${k}"><b>Earlier heading: ${esc(n)}</b></label><textarea id="sp-old-${k}" class="ta" rows="4" readonly>${esc(P[k] || '')}</textarea></div>`).join('')}</div>`;
    h += `<div class="card"><div class="field"><label for="sp-refs"><b>References (APA 7)</b> <span class="hint">· one reference per line, alphabetical by surname. Build them in <button type="button" class="linkbtn" data-go="cite" data-sub="builder">Cite It Right</button> and send them here.</span></label><textarea id="sp-refs" class="ta" rows="5" data-lxf="refs">${esc(S.sba.refs || '')}</textarea></div></div>`;
    h += `<div class="card"><div class="row"><button type="button" class="btn go" data-lxact="pbdl">⬇ Download my proposal draft</button><button type="button" class="btn ghost" data-lxact="pbprint">🖨 Print preview</button></div></div>`;
    return h;
  }
  function propDoc(api) {
    const S = store(api), esc = api.esc, P = S.sba.prop;
    return PROP.map(([k, n]) => `<h2>(${LET(k)}) ${n}</h2>${(P[k] || '').split(/\n+/).filter(x => x.trim()).map(x => `<p>${esc(x)}</p>`).join('') || '<p style="color:#888">[to be written]</p>'}`).join('') + ((S.sba.refs || '').trim() ? `<h2>References</h2>${S.sba.refs.split(/\n+/).filter(x => x.trim()).map(x => `<p style="padding-left:2em;text-indent:-2em">${esc(x)}</p>`).join('')}` : '');
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
    if (act === 'pbdl') { download(api, 'SBA Proposal ' + (S.name || ''), 'CAPE Digital Media Unit 1 · Paper 031 proposal draft', propDoc(api)); return true; }
    if (act === 'pbprint') { const w = document.createElement('div'); w.id = 'lx-print'; w.style.cssText = 'position:fixed;left:-99999px;top:0;width:800px;background:#fff;color:#000;font:15px Georgia,serif;padding:20px'; w.innerHTML = propDoc(api); document.querySelectorAll('#lx-print').forEach(x => x.id = ''); document.body.appendChild(w); setTimeout(() => { window.print(); setTimeout(() => w.remove(), 500); }, 50); return true; }
    if (act === 'labdone') { const st = S.labs[k] = S.labs[k] || { ticks: {} }; const first = !st.done; st.done = 1; api.save(); if (first) api.reward(15, 'Practical lab complete', { xp: 15 }); else api.toast('Lab updated'); api.render(); return true; }
    if (act === 'pick') { S.sba.idea = k; api.save(); api.toast('Set as your SBA project'); api.render(); return true; }
    if (act === 'dl') { const x = LABS().find(z => z.id === k); if (x) download(api, x.title, `${SECN[x.sec]} · ${APPS[x.app][0]} · ${x.level} · ${x.time} minutes`, `${x.brief}${x.data ? '<h2>Draft / data</h2><div class="doc">' + x.data + '</div>' : ''}<h2>Instructions</h2><ol>${x.tasks.map(t => '<li>' + t + '</li>').join('')}</ol><h2>Marking checklist</h2><table><tr><th>Criterion</th><th>Marks</th></tr>${x.check.map(r => '<tr><td>' + r.c + '</td><td>' + r.m + '</td></tr>').join('')}<tr><th>Total</th><th>${tot(x.check)}</th></tr></table>`); return true; }
    return false;
  }
  function onField(api, e) {
    const al = e.target.closest && e.target.closest('[data-lxalloc]'); if (al) { const S = store(api); S.sba.alloc = al.value === '' ? null : +al.value; api.save(); const a = allocCalc(al.value); const o = document.getElementById('sg-alloc-out'); if (o) o.innerHTML = `Module 1: <b>${a[0]}</b> · Module 2: <b>${a[1]}</b> · Module 3: <b>${a[2]}</b>`; return true; }
    const f = e.target.closest('[data-lxf]'); if (!f) return false;
    const S = store(api), [a, b] = f.dataset.lxf.split('.');
    if (a === 'own') S.sba.own = f.value; else if (a === 'refs') S.sba.refs = f.value; else { S.sba[a] = S.sba[a] || {}; S.sba[a][b] = f.value; }
    api.save(); return true;
  }
  function onChange(api, e) {
    if (onField(api, e)) return;
    const sf = e.target.closest('[data-lxself]'); if (sf) { const S = store(api); S.sba.self = S.sba.self || {}; S.sba.self[sf.dataset.lxself] = +sf.value; { const G = GUIDE(), cur = {}; ((G && G.sections) || []).forEach(sc => sc.items.forEach((it, i) => { cur[sc.id + '-' + i] = it[1]; })); const sum = Object.keys(S.sba.self).reduce((a, x) => a + (x in cur ? Math.min(cur[x], +S.sba.self[x] || 0) : 0), 0); if (sum > SBA_CAP) S.sba.self[sf.dataset.lxself] = Math.max(0, +sf.value - (sum - SBA_CAP)); } if (S.sba.alloc == null) {} api.save(); api.render(); return; }
    const cl = e.target.closest('[data-lxcl]'); if (cl) { const S = store(api); S.sba.cl[cl.dataset.lxcl] = cl.checked ? 1 : 0; api.save(); api.render(); return; }
    const ev = e.target.closest('[data-lxev]'); if (ev) { const S = store(api); S.sba.ev[ev.dataset.lxev] = ev.checked ? 1 : 0; api.save(); api.render(); return; }
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
    tile: { icon: '🧪', meta: 'Photo, audio, video, design and web practicals for every module' },
    render(api, loc) { css(); wire(api); const x = LABS().find(z => z.id === loc.k); return x ? labView(api, x) : labsHome(api, loc); }
  }, {
    view: 'portfolio', title: 'SBA Project Studio',
    tile: { icon: '📁', meta: 'Project ideas, the SBA roadmap, software links, a proposal builder and a checklist' },
    render(api, loc) { css(); wire(api); const D = SBA(); const x = (D.ideas || []).find(z => z.id === loc.k); if (x) return ideaView(api, x); const p = loc.tab && (D.phases || []).find(z => String(z.id) === String(loc.tab)); if (p) return phaseView(api, p); return sbaHome(api, loc); }
  });
})();
