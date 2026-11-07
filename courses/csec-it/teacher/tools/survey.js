/* CSEC Information Technology · My Learning Survey and personalised learning plan · Developed by Kester Small.
   Student view: 'survey' (loc.k = 'plan' shows the plan). The plan generator is shared with the teacher's Class Insights
   (tools/classplan.js, Teacher's Version only) through window.CSEC_PLANNER. Answers stay on this device (and in the LMS
   suspend data when run as SCORM) unless the student chooses to share their code. */
(function () {
  const SV = () => window.COURSE_SURVEY || { steps: [], questions: [], check: [] };
  const LVN = { 1: 'Foundation', 2: 'Core', 3: 'Challenge' }, LVI = { 1: '🪜', 2: '⚙️', 3: '🚀' };
  const SECS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];
  const SNAME = { S1: 'Computer Fundamentals and Information Processing', S2: 'Computer Networks and Web Technologies', S3: 'Social and Economic Impact of ICT', S4: 'Word-Processing and Web Page Design', S5: 'Spreadsheets', S6: 'Database Management', S7: 'Problem-Solving and Program Design', S8: 'Program Implementation' };
  const APPMAP = { S1: ['win'], S4: ['word', 'pub', 'web'], S5: ['excel'], S6: ['access'], S7: ['blocks'], S8: ['code', 'blocks'] };
  const SIMS = { S1: [['winsim', '🪟 Windows Desktop Lab'], ['pcbuild', '🖥️ PC Build Lab']], S2: [['websim', '🌐 Web Page Builder (URLs, FTP)'], ['inbox', '✉️ Inbox Hero']], S3: [['winsim', '🛡️ Windows Desktop Lab (security missions)'], ['emergency', '🚨 Emergency Meeting']], S4: [['wordsim', '🟦 Word Lab'], ['websim', '🌐 Web Page Builder'], ['publishersim', '🟩 Publisher Lab']], S5: [['excelsim', '🟩 Excel Lab']], S6: [['accesssim', '🟥 Access Lab']], S7: [['codelab', '🧮 Code Lab'], ['robolab', '🤖 Robo Lab']], S8: [['codelab', '🐍 Code Lab'], ['robolab', '🤖 Robo Lab']] };
  const SIMFILE = { winsim: 'winsim', pcbuild: 'pcbuildlab', websim: 'websim', inbox: 'inboxhero', emergency: 'emergency', wordsim: 'wordsim', publishersim: 'publishersim', excelsim: 'excelsim', accesssim: 'accesssim', codelab: 'codelab', robolab: 'robolab' };
  const LEVELSIM = { winsim: 1, websim: 1, wordsim: 1, publishersim: 1, excelsim: 1, accesssim: 1, codelab: 1, robolab: 1 };
  const THEMES = {
    Gaming: ['Island Esports League', 'You love games, so your SBA can run an inter-school esports league: player registrations, match results, a league table and a points program.'],
    Music: ['Soca Monarch Fan Club', 'Music is your thing, so build your SBA around a fan club: member letters by mail merge, a fan page, ticket sales, a member database and a vote counter.'],
    Sports: ['Inter-School Football League', 'Sport fits perfectly: fixtures, results, a league table spreadsheet, a players database and a program that works out points.'],
    Fashion: ['Market Street Boutique', 'Your eye for style becomes a boutique project: a catalogue page, stock spreadsheet, customer database and a discount program.'],
    Business: ['Market Street Boutique', 'Think like an owner: sales, stock, customers and promotions make a strong SBA story.'],
    Environment: ['Carlisle Bay Clean-Up Volunteers', 'Care about the island? Track volunteers, rubbish collected, a volunteer database and a program that totals each clean-up.'],
    'Social media': ['Market Street Boutique', 'Social media skills suit a business that promotes itself online: a web page, campaign letters and sales analysis.'],
    Film: ['Soca Monarch Fan Club', 'Media fans can run a fan club with a web page, newsletters and event data.'],
    Art: ['Market Street Boutique', 'Design-minded? A boutique brand gives you room for a stylish web page and flyers.'],
    Science: ['Carlisle Bay Clean-Up Volunteers', 'Collect real data about the beach, analyse it and present your findings.'],
    Robots: ['Island Esports League', 'Tech lovers enjoy the league project: lots of data, rankings and a program to code.'],
    Food: ['Market Street Boutique', 'Turn it into a food business: menu, orders, customers and daily sales work just like the boutique project.'],
    Travel: ['Carlisle Bay Clean-Up Volunteers', 'Tourism and the beach go together: volunteers, visitors and clean-up data.'],
    Carnival: ['Soca Monarch Fan Club', 'Carnival season gives you troupes, fans, tickets and votes: perfect SBA data.']
  };
  const CAREER = { dev: ['S7', 'S8'], web: ['S4', 'S2'], sec: ['S3', 'S2'], net: ['S2', 'S1'], data: ['S5', 'S6'], media: ['S4'], biz: ['S5', 'S3'], unsure: [] };
  const CAREERN = { dev: 'app or game developer', web: 'web designer', sec: 'cybersecurity analyst', net: 'network technician', data: 'data or database analyst', media: 'digital media designer', biz: 'tech business owner' };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtD = t => new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  /* ---------------- the planner ---------------- */
  function sectionScores(a, d) {
    a = a || {}; d = d || {};
    const C = SV().check || [], out = {};
    SECS.forEach(sec => {
      const parts = [], why = [];
      const c = a.conf && a.conf[sec] ? (+a.conf[sec] - 1) / 3 : null;
      if (c != null) { parts.push([c, .45]); why.push(['New to me', 'A little', 'Fairly okay', 'Very confident'][+a.conf[sec] - 1] + ' (confidence)'); }
      const q = C.find(x => x.sec === sec);
      if (q && d[sec] != null) { const ok = +d[sec] === q.a; parts.push([ok ? 1 : 0, .35]); why.push(ok ? 'skills check correct' : 'skills check missed'); }
      const ap = (APPMAP[sec] || []).map(k => a.apps && a.apps[k] != null && a.apps[k] !== '' ? +a.apps[k] / 3 : null).filter(x => x != null);
      if (ap.length) { const v = ap.reduce((x, y) => x + y, 0) / ap.length; parts.push([v, .2]); why.push(v >= .66 ? 'knows the software well' : v >= .33 ? 'has tried the software' : 'new to the software'); }
      let sc = parts.length ? parts.reduce((x, p) => x + p[0] * p[1], 0) / parts.reduce((x, p) => x + p[1], 0) : .5;
      if (a.prior === 'none') sc -= .08; if (a.prior === 'full') sc += .08;
      if (a.pace === 'small') sc -= .07; if (a.pace === 'jump') sc += .05;
      if (a.goal === 'g1') sc += .04;
      sc = Math.max(0, Math.min(1, sc));
      const l = sc < .42 ? 1 : sc < .74 ? 2 : 3;
      out[sec] = { l, score: Math.round(sc * 100), why: why.length ? why.join(' · ') : 'no answers yet, so starting at Core' };
    });
    return out;
  }
  function examInfo(form, now) {
    now = now || Date.now(); const d = new Date(now), y = d.getFullYear(), m = d.getMonth();
    const yrs = form === 'F3' ? 2 : form === 'F4' || form === 'OT' || !form ? 1 : 0;
    let ey = (m >= 4 ? y + 1 : y) + yrs;
    if (form === 'F5' || form === 'PC') ey = m >= 4 ? y + 1 : y;
    const exam = Date.UTC(ey, 4, 4, 12), sba = Date.UTC(ey, 3, 30, 12), revise = exam - 21 * 864e5;
    const weeks = Math.max(8, Math.floor((revise - now) / (7 * 864e5) * .85));
    return { examYear: ey, exam, sba, revise, weeks };
  }
  function persona(a) {
    const w = a.ways || [], sc = { build: 0, chase: 0, watch: 0, step: 0, team: 0 };
    if (w.includes('hands')) sc.build += 2; if (w.includes('explore')) sc.build += 1.5; if (a.pace === 'jump') sc.build += 1;
    if (w.includes('games')) sc.chase += 2.5; if (a.goal === 'g1') sc.chase += .5;
    if (w.includes('video')) sc.watch += 2; if (w.includes('listen')) sc.watch += 2;
    if (w.includes('read')) sc.step += 1.5; if (w.includes('examples')) sc.step += 2; if (a.pace === 'small') sc.step += 1.5;
    if (w.includes('friends')) sc.team += 2.5; if (a.group === 'team') sc.team += 1; if (a.group === 'pair') sc.team += .5;
    const P = { build: ['🛠️', 'Hands-on Builder', 'You learn by doing. Every unit links to a simulator mission: open it as soon as you finish the first two lesson screens.'], chase: ['🎮', 'Challenge Chaser', 'Points, stars and streaks keep you going. Use the arcade games for revision and push your dial up to 🚀 whenever a screen feels easy.'], watch: ['🎧', 'Watch-and-Listen Learner', 'Videos and audio make it click. Watch the "Watch first" videos before each unit and press 🔊 Listen on long screens.'], step: ['🪜', 'Step-by-Step Strategist', 'You like clear structure. Read the plain-words box first, follow the worked examples, then try the activity.'], team: ['👥', 'Team Player', 'You think best out loud with others. Do pair and group assignments, join the Class Tournament and explain each answer to a study buddy.'] };
    const k = Object.keys(sc).sort((x, y) => sc[y] - sc[x])[0];
    return { id: k, icon: P[k][0], name: sc[k] ? P[k][1] : 'All-Rounder', tip: sc[k] ? P[k][2] : 'You are happy learning in different ways. Mix lessons, simulators and games each week.' };
  }
  function makePlan(a, d, mods, now) {
    a = a || {}; mods = (mods || []).filter(m => SECS.includes(m.id));
    const L = sectionScores(a, d), E = examInfo(a.form, now);
    const form = a.form || 'F4';
    let order = (form === 'F5' || form === 'PC') ? ['S4', 'S5', 'S6', 'S7', 'S8', 'S1', 'S2', 'S3'] : ['S1', 'S4', 'S2', 'S5', 'S3', 'S6', 'S7', 'S8'];
    const units = sec => { const m = mods.find(x => x.id === sec); return m ? m.units.length : 5; };
    const wt = sec => units(sec) * ({ 1: 1.4, 2: 1, 3: .75 })[L[sec].l] * (sec === 'S7' || sec === 'S8' ? 1.1 : 1);
    const tot = order.reduce((x, s) => x + wt(s), 0);
    let wk = order.map(s => Math.max(1, Math.round(wt(s) / tot * E.weeks)));
    let diff = E.weeks - wk.reduce((x, y) => x + y, 0), i = 0;
    while (diff !== 0 && i < 200) { const j = i % wk.length; if (diff > 0) { wk[j]++; diff--; } else if (wk[j] > 1) { wk[j]--; diff++; } i++; }
    const start = now || Date.now(); let cursor = start;
    const roadmap = order.map((sec, k) => { const from = cursor, to = cursor + wk[k] * 7 * 864e5 - 864e5; cursor = to + 864e5; return { sec, weeks: wk[k], from, to, l: L[sec].l }; });
    const hrs = ({ t1: .75, t2: 1.5, t3: 3.5, t4: 5 })[a.time] || 1.5;
    const P = persona(a), w = a.ways || [];
    const supports = [];
    if (w.includes('video')) supports.push(['🎬', 'Videos first', 'Open "Watch first" on each unit page and the Video library before you start a unit.']);
    if (w.includes('listen')) supports.push(['🔊', 'Read aloud', 'Press 🔊 Listen on any screen; change the speed with the 🔊 button at the top.']);
    if (w.includes('read')) supports.push(['📖', 'Notes and glossary', 'Keep the Glossary open and add your own Caribbean example to every new term.']);
    if (w.includes('hands')) supports.push(['🖱️', 'Simulators', 'Do the simulator mission linked on each unit page straight after the lesson screens.']);
    if (w.includes('games')) supports.push(['🎮', 'Games for revision', 'Use Emergency Meeting, Street Racer and CSEC OPS to revise each section.']);
    if (w.includes('friends')) supports.push(['👥', 'Study buddy', 'Choose pair and group assignments and try the Class Tournament.']);
    if (w.includes('examples')) supports.push(['🪜', 'Worked examples', 'Read the plain-words box and the model answers before you write your own.']);
    if (w.includes('explore')) supports.push(['🧩', 'Free practice', 'Try each simulator\'s Free practice mode and the Robo Lab sandbox before the missions.']);
    if (!supports.length) supports.push(['🎚️', 'Use the dial', 'Every screen has 🪜 Foundation, ⚙️ Core and 🚀 Challenge. Move it whenever you need to.']);
    const where = a.where || [], tips = [];
    if (where.includes('phone') && !where.includes('pc') && !where.includes('tab')) tips.push('Most of your practice is on a phone: do lessons, quizzes, the glossary and Robo Lab on your phone, and save the Word, Excel and Access missions for lab time (they need a bigger screen).');
    if (!where.includes('pc') && where.includes('lab')) tips.push('Plan your simulator missions for school lab time, and ask your teacher about lunchtime or after-school lab access in SBA season.');
    if (where.includes('lib')) tips.push('Library or community-centre computers work well: the course runs in any modern browser, so log in and pick up where you left off.');
    if (a.time === 't1') tips.push('Short on time? Aim for three 15-minute sessions a week: one lesson set, one activity set, one game. Little and often beats cramming.');
    if (a.goal === 'g1') tips.push('Aiming for Grade I: finish every Level 3 simulator mission, sit each mock paper under timed conditions and self-mark against the mark schemes.');
    if (form === 'F5') tips.push(`Form 5: your SBA marks go to CXC by ${fmtD(E.sba)}. Your plan puts the SBA sections (Word, web page, Excel, Access, programming) first.`);
    if (form === 'PC') tips.push('Private candidate: you sit Paper 032 instead of the SBA. Your plan starts with the practical sections; use the Paper 032 Centre every week.');
    const likes = a.likes || [];
    const th = likes.map(x => THEMES[x]).find(Boolean) || THEMES.Sports;
    const careerSecs = CAREER[a.career] || [];
    const routine = [];
    const mins = Math.round(hrs * 60);
    if (mins <= 60) routine.push([`${Math.max(15, Math.round(mins / 3))} min × 3`, 'one session of lesson screens, one of activities at your level, one simulator mission or game']);
    else routine.push([`${Math.round(mins / 3)} min × 3`, 'lessons and activities; a simulator mission; one assignment or structured question']);
    if (hrs >= 3) routine.push(['Weekend 45 min', 'section test practice, a mock-paper section or SBA work']);
    routine.push(['Every week', `log in on ${({ am: 'mornings before school', pm: 'afternoons after school', eve: 'evenings', wk: 'weekends' })[a.when] || 'the same days'} so it becomes a habit (and keep your daily-chest streak)`]);
    return { v: 1, gen: start, levels: L, order, roadmap, exam: E, hrs, persona: P, supports, tips, sba: { theme: th[0], why: th[1] }, career: a.career && a.career !== 'unsure' ? { name: CAREERN[a.career], secs: careerSecs } : null, routine };
  }
  function encode(o) { try { return 'CSECIT1:' + btoa(unescape(encodeURIComponent(JSON.stringify(o)))); } catch (e) { return ''; } }
  function decode(t) { try { t = String(t || '').trim(); if (!t.startsWith('CSECIT1:')) return null; return JSON.parse(decodeURIComponent(escape(atob(t.slice(8))))); } catch (e) { return null; } }
  window.CSEC_PLANNER = { makePlan, sectionScores, examInfo, persona, encode, decode, SECS, SNAME, LVN, LVI, SIMS, SIMFILE, THEMES };

  /* ---------------- student plugin ---------------- */
  let A = null, W = { step: 0, warn: '' };
  const S = () => A.S;
  function st() { const s = S(); s.survey = s.survey || { ans: {}, diag: {} }; s.survey.ans = s.survey.ans || {}; s.survey.diag = s.survey.diag || {}; return s.survey; }
  function css() {
    if (document.getElementById('sv-css')) return;
    const el = document.createElement('style'); el.id = 'sv-css';
    el.textContent = `.sv-steps{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}.sv-steps span{flex:1 1 60px;height:8px;border-radius:99px;background:var(--raise);border:1px solid var(--line)}.sv-steps span.on{background:var(--gold)}
.sv-q{margin:16px 0;display:flex;flex-direction:column;gap:8px}.sv-q>b{font-size:1.02rem}
.sv-opts{display:flex;flex-wrap:wrap;gap:8px}.sv-opt{border:2px solid var(--line);background:transparent;border-radius:12px;padding:9px 14px;font-weight:600;text-align:left}.sv-opt.on{border-color:var(--gold);background:var(--soft-gold);box-shadow:inset 0 0 0 1px var(--gold)}
.sv-scale{display:grid;grid-template-columns:minmax(0,1.4fr) repeat(4,minmax(0,1fr));gap:6px;align-items:center}.sv-scale .h{font-size:.78rem;text-align:center;color:var(--muted)}.sv-scale .lab{font-weight:600}
.sv-dot{border:2px solid var(--line);background:transparent;border-radius:12px;padding:8px 2px;font-size:1.25rem;line-height:1}.sv-dot.on{border-color:var(--gold);background:var(--soft-gold)}
.sv-priv{border:1.5px dashed var(--line);border-radius:14px;padding:12px 14px;background:var(--raise)}
.sv-lv{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line)}
.sv-road{display:flex;flex-direction:column;gap:10px;position:relative}.sv-road .wk{display:grid;grid-template-columns:110px minmax(0,1fr);gap:12px;align-items:start;padding:10px 12px;border-radius:12px;border:1.5px solid var(--line);background:var(--raise)}
.sv-road .wk .d{font-weight:800;color:var(--gold);font-size:.86rem}.sv-code{width:100%;min-height:90px;font:12px/1.4 ui-monospace,Consolas,monospace;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);padding:10px;word-break:break-all}
.sv-persona{display:flex;gap:14px;align-items:center}.sv-persona .big{font-size:3rem;line-height:1}
@media (max-width:560px){.sv-scale{grid-template-columns:minmax(0,1fr) repeat(4,40px)}.sv-scale .h{font-size:.62rem}.sv-road .wk{grid-template-columns:1fr}}
@media print{.top,.side,.foot,#wb-fab,.sv-noprint,.scrim{display:none!important}body{background:#fff!important;color:#000!important}#sky,#fx{display:none!important}.shell{display:block!important}.stage{padding:0!important}.card,.hero{box-shadow:none!important;border:1px solid #bbb!important;background:#fff!important;color:#000!important;break-inside:avoid}}`;
    document.head.appendChild(el);
  }
  function qHTML(q) {
    const a = st().ans;
    if (q.type === 'one' || q.type === 'many') {
      const cur = a[q.id], on = v => q.type === 'one' ? cur === v : (cur || []).includes(v);
      return `<div class="sv-q"><b>${esc(q.q)}</b><div class="sv-opts" role="group" aria-label="${esc(q.q)}">${q.opts.map(([v, t]) => `<button type="button" class="sv-opt ${on(v) ? 'on' : ''}" data-sv="ans" data-q="${q.id}" data-v="${esc(v)}" aria-pressed="${on(v)}">${esc(t)}</button>`).join('')}</div>${q.max ? `<span class="hint">Choose up to ${q.max}.</span>` : ''}</div>`;
    }
    if (q.type === 'scale') {
      const cur = a[q.id] || {};
      return `<div class="sv-q"><b>${esc(q.q)}</b><div class="sv-scale"><span></span>${q.scale.map(s => `<span class="h">${s[1]}<br>${esc(s[2])}</span>`).join('')}${q.items.map(([k, t]) => `<span class="lab">${esc(t)}</span>${q.scale.map(s => `<button type="button" class="sv-dot ${cur[k] === s[0] ? 'on' : ''}" data-sv="scale" data-q="${q.id}" data-k="${k}" data-v="${s[0]}" aria-pressed="${cur[k] === s[0]}" aria-label="${esc(t)}: ${esc(s[2])}">${s[1]}</button>`).join('')}`).join('')}</div></div>`;
    }
    return '';
  }
  function checkHTML() {
    const dg = st().diag;
    return (SV().check || []).map((q, i) => `<div class="sv-q"><b>${i + 1}. ${esc(q.q)}</b><div class="sv-opts">${q.opts.map((o, oi) => `<button type="button" class="sv-opt ${+dg[q.sec] === oi && dg[q.sec] != null ? 'on' : ''}" data-sv="diag" data-k="${q.sec}" data-v="${oi}">${'ABCD'[oi]}. ${esc(o)}</button>`).join('')}<button type="button" class="sv-opt ${dg[q.sec] === -1 ? 'on' : ''}" data-sv="diag" data-k="${q.sec}" data-v="-1">🤷 Not sure yet</button></div></div>`).join('');
  }
  function wizardHTML() {
    const steps = SV().steps, n = steps.length, i = Math.min(W.step, n - 1), sp = steps[i];
    let h = `<section class="hero sv-noprint"><span class="eyebrow">My Learning Plan · step ${i + 1} of ${n}</span><h1>${sp.icon} ${esc(sp.title)}</h1><p>${esc(sp.blurb)}</p><div class="sv-steps" aria-hidden="true">${steps.map((_, k) => `<span class="${k <= i ? 'on' : ''}"></span>`).join('')}</div></section>`;
    if (i === 0) h += `<div class="card sv-priv"><b>🔒 Your privacy.</b> This survey asks nothing personal: no name, address, family, health or money questions, and every question is optional. Your answers stay on this device (and in your class learning platform if your teacher uses one). You decide whether to share a code with your teacher at the end.</div>`;
    h += `<div class="card">`;
    if (sp.id === 'check') h += checkHTML();
    else h += SV().questions.filter(q => q.step === sp.id).map(qHTML).join('');
    if (W.warn) h += `<p class="warn">${esc(W.warn)}</p>`;
    h += `<div class="nav">${i > 0 ? `<button type="button" class="btn ghost" data-sv="prev">← Back</button>` : `<button type="button" class="btn ghost" data-go="home">Not now</button>`}${i < n - 1 ? `<button type="button" class="btn go" data-sv="next">Next →</button>` : `<button type="button" class="btn gold" data-sv="finish">✨ Build my learning plan</button>`}</div></div>`;
    return h;
  }
  function simBtn(id, label, l) { return `<button type="button" class="btn ghost" data-gx="opengame" data-page="games/${SIMFILE[id] || id}.html${LEVELSIM[id] ? '?level=' + l : ''}" data-id="${id}">${label}</button>`; }
  function planHTML() {
    const sv = st(), mods = A.mods ? A.mods() : [];
    const P = makePlan(sv.ans, sv.diag, mods, sv.at || Date.now());
    const mod = id => mods.find(m => m.id === id);
    const cur = id => (S().secLv && S().secLv[id]) || S().level || 2;
    let h = `<section class="hero"><span class="eyebrow">My Learning Plan · made ${fmtD(P.gen)}</span><h1>${S().name ? esc(S().name) + "'s" : 'Your'} personalised CSEC IT plan</h1><p>Built from your survey: a starting level for every section, the order to work in, a week-by-week roadmap to the ${P.exam.examYear} exams, the simulators to use and an SBA theme that fits your interests. It is a plan, not a cage: change any level whenever you like.</p>
      <div class="row sv-noprint"><button type="button" class="btn gold" data-sv="apply">${sv.applied ? '✓ Levels applied · apply again' : '🎚️ Apply my section levels'}</button><button type="button" class="btn ghost" data-sv="print">🖨 Print</button><button type="button" class="btn ghost" data-sv="doc">⬇ Download (Word)</button><button type="button" class="btn ghost" data-sv="redo">↻ Retake the survey</button></div></section>`;
    h += `<div class="card"><div class="sv-persona"><span class="big" aria-hidden="true">${P.persona.icon}</span><div><span class="kicker">Your learner type</span><h2>${esc(P.persona.name)}</h2><p>${esc(P.persona.tip)}</p></div></div></div>`;
    h += `<div class="card"><h3>🎚️ Your starting level in each section</h3><p class="hint">Worked out from your confidence, the quick skills check and the software you know. Tap a level to change it.</p>${SECS.filter(mod).map(sec => { const x = P.levels[sec], c = cur(sec); return `<div class="sv-lv"><div><b>${esc(mod(sec).code)}: ${esc(mod(sec).title)}</b><br><span class="hint">Suggested ${LVI[x.l]} ${LVN[x.l]} · ${esc(x.why)}</span></div><div class="row sv-noprint" style="gap:4px">${[1, 2, 3].map(l => `<button type="button" class="chip ${c === l ? 'sel' : ''}" data-act="seclv" data-m="${sec}" data-l="${l}" aria-pressed="${c === l}" title="${LVN[l]}">${LVI[l]}</button>`).join('')}</div></div>`; }).join('')}</div>`;
    h += `<div class="card"><h3>🗺️ Your roadmap</h3><p class="hint">${P.exam.weeks} study weeks before revision starts (school holidays allowed for) · exams from about ${fmtD(P.exam.exam)}${(sv.ans.form === 'F5') ? ` · SBA marks due ${fmtD(P.exam.sba)}` : ''}. Sections where you start at 🪜 get extra time; 🚀 sections are fast-tracked.</p><div class="sv-road">${P.roadmap.map((r, k) => { const m = mod(r.sec); if (!m) return ''; return `<div class="wk"><span class="d">${fmtD(r.from)}<br>→ ${fmtD(r.to)}<br>${r.weeks} week${r.weeks === 1 ? '' : 's'}</span><div><b>${k + 1}. ${esc(m.code)}: ${esc(m.title)}</b> <span class="ribbon">${LVI[cur(r.sec)]} ${LVN[cur(r.sec)]}</span><br><span class="hint">${m.units.map(u => esc(u.title)).join(' · ')}</span><div class="row sv-noprint" style="margin-top:8px"><button type="button" class="btn go" data-go="module" data-m="${r.sec}">Open ${esc(m.code)}</button>${(SIMS[r.sec] || []).map(([id, lab]) => simBtn(id, lab, cur(r.sec))).join('')}</div></div></div>`; }).join('')}<div class="wk"><span class="d">${fmtD(P.exam.revise)}<br>→ exams</span><div><b>Revision</b><br><span class="hint">Mock Paper 01s and Paper 02s under timed conditions, section tests, glossary puzzles and the arcade games.</span><div class="row sv-noprint" style="margin-top:8px"><button type="button" class="btn ghost" data-go="assess">Exam practice</button></div></div></div></div></div>`;
    h += `<div class="card"><h3>⏱️ Your weekly routine (about ${P.hrs} hours)</h3><ul>${P.routine.map(r => `<li><b>${esc(r[0])}:</b> ${esc(r[1])}.</li>`).join('')}</ul></div>`;
    h += `<div class="card"><h3>💡 What will help you most</h3><div class="tiles">${P.supports.map(s => `<div class="tile static"><span class="ticon">${s[0]}</span><h3>${esc(s[1])}</h3><span class="meta">${esc(s[2])}</span></div>`).join('')}</div>${P.tips.length ? `<ul style="margin-top:12px">${P.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}</div>`;
    const asg = SECS.map(sec => { const m = mod(sec); if (!m || !m.assignments) return null; const l = cur(sec), a = m.assignments.find(x => x.level === l) || m.assignments[0]; return a ? [m, a] : null; }).filter(Boolean);
    if (asg.length) h += `<div class="card"><h3>📝 An assignment at your level in each section</h3><div class="list">${asg.map(([m, a]) => `<button type="button" class="lrow" data-go="tasks" data-k="${m.id}"><span class="t"><b>${esc(m.code)} · ${esc(a.title)}</b><br><span class="hint">${LVI[a.level]} ${LVN[a.level]} · 🧠 ${esc(a.bloom)} · about ${a.time} min</span></span></button>`).join('')}</div></div>`;
    h += `<div class="card"><h3>🗂️ Your SBA theme idea: ${esc(P.sba.theme)}</h3><p>${esc(P.sba.why)}</p><div class="row sv-noprint"><button type="button" class="btn ghost" data-go="sba">Open the SBA Studio</button>${sv.ans.form === 'PC' ? '<button type="button" class="btn ghost" data-go="p032">Open the Paper 032 Centre</button>' : ''}</div></div>`;
    if (P.career) h += `<div class="card"><h3>🚀 Future ${esc(P.career.name)}?</h3><p>The sections that build those skills most are ${P.career.secs.map(s => `<b>${esc((mod(s) || {}).code || s)}</b> (${esc(SNAME[s])})`).join(' and ')}. Try a Challenge-level mission there, and look at the careers lesson in Section 3.</p></div>`;
    const code = encode({ v: 1, n: sv.nick || '', f: sv.ans.form || '', a: sv.ans, d: sv.diag, t: sv.at || Date.now() });
    h += `<div class="card sv-noprint"><h3>📤 Share with your teacher (optional)</h3><p class="hint">This code contains only your survey answers${sv.nick ? ' and the nickname or initials you typed' : ''}. Paste it into Microsoft Teams, Google Classroom or an e-mail to your teacher so they can plan the class around everyone's needs.</p>
      <div class="formgrid"><div class="field"><label for="sv-nick">Initials or nickname (optional)</label><input id="sv-nick" class="input" maxlength="16" value="${esc(sv.nick || '')}" placeholder="e.g. JR or Jaz" data-svin="nick"></div></div>
      <label for="sv-code" class="sr">Your survey code</label><textarea id="sv-code" class="sv-code" readonly>${esc(code)}</textarea><div class="row"><button type="button" class="btn go" data-sv="copy">Copy my code</button><button type="button" class="btn ghost" data-sv="dlcode">⬇ Save as a text file</button></div></div>`;
    return h;
  }
  function render(api, loc) {
    A = api; css();
    const sv = st();
    if (loc.k === 'plan' && sv.done) return planHTML();
    if (sv.done && !W.redo && loc.k !== 'retake') return planHTML();
    return wizardHTML();
  }
  function stepValid() {
    const sp = SV().steps[W.step]; if (!sp) return '';
    return '';
  }
  function docHTML() {
    const el = document.querySelector('#stage .stage-in'); if (!el) return '';
    const c = el.cloneNode(true); c.querySelectorAll('.sv-noprint,.foot,button,textarea,input,script').forEach(n => n.remove());
    return `<!doctype html><html><head><meta charset="utf-8"><title>My CSEC IT learning plan</title><style>body{font:11pt Calibri,Arial,sans-serif;color:#111;margin:2cm}h1,h2,h3{color:#1F3864;font-family:Calibri,Arial,sans-serif}h1{font-size:20pt}.hero,.card{border:1px solid #C9A227;border-radius:8px;padding:10px 14px;margin:0 0 12px}.hint{color:#555}.ribbon{background:#FFF2C9;border-radius:8px;padding:1px 6px;font-size:9pt}.wk{border-top:1px solid #ddd;padding:6px 0}.d{font-weight:bold;color:#2E5C8A}.kicker,.eyebrow{text-transform:uppercase;font-size:9pt;color:#C9A227;font-weight:bold}</style></head><body>${c.innerHTML}<p class="hint">Kester Small</p></body></html>`;
  }
  function download(name, text, type) {
    try { const b = new Blob([text], { type }), u = URL.createObjectURL(b), a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 5000); } catch (e) { A.toast('Download is not available here. Use Print instead.'); }
  }
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-sv]'); if (!b || !A) return;
    const sv = st(), d = b.dataset, act = d.sv, steps = SV().steps;
    if (act === 'ans') {
      const q = SV().questions.find(x => x.id === d.q); if (!q) return;
      if (q.type === 'one') sv.ans[q.id] = sv.ans[q.id] === d.v ? '' : d.v;
      else { const arr = (sv.ans[q.id] || []).slice(), k = arr.indexOf(d.v); if (k >= 0) arr.splice(k, 1); else { if (q.max && arr.length >= q.max) { A.toast(`Pick up to ${q.max}. Untick one first.`); return; } arr.push(d.v); } sv.ans[q.id] = arr; }
      W.warn = ''; A.save(); A.render(); return;
    }
    if (act === 'scale') { sv.ans[d.q] = sv.ans[d.q] || {}; sv.ans[d.q][d.k] = sv.ans[d.q][d.k] === d.v ? '' : d.v; A.save(); A.render(); return; }
    if (act === 'diag') { sv.diag[d.k] = +d.v; A.save(); A.render(); return; }
    if (act === 'next') { W.step = Math.min(steps.length - 1, W.step + 1); W.warn = stepValid(); A.render(); window.scrollTo({ top: 0 }); return; }
    if (act === 'prev') { W.step = Math.max(0, W.step - 1); A.render(); window.scrollTo({ top: 0 }); return; }
    if (act === 'finish') {
      const answered = Object.keys(sv.ans).filter(k => { const v = sv.ans[k]; return v && (typeof v !== 'object' || Object.values(v).some(Boolean) || v.length); }).length;
      if (answered < 3) { W.warn = 'Answer a few more questions first (at least three) so your plan is useful. Everything is optional, but the more you answer, the better it fits.'; A.render(); return; }
      sv.done = true; sv.at = Date.now(); W.redo = false; W.step = 0;
      const P = makePlan(sv.ans, sv.diag, A.mods ? A.mods() : [], sv.at);
      const o = {}; SECS.forEach(s => { o[s] = P.levels[s].l; }); A.setSectionLevels(o); sv.applied = true;
      A.save(); A.reward(30, 'Learning plan created', { xp: 25, noBonus: true }); A.go({ v: 'survey', k: 'plan' }); window.scrollTo({ top: 0 }); return;
    }
    if (act === 'apply') { const P = makePlan(sv.ans, sv.diag, A.mods ? A.mods() : [], sv.at); const o = {}; SECS.forEach(s => { o[s] = P.levels[s].l; }); sv.applied = true; A.setSectionLevels(o); A.toast('🎚️ Your section levels are set. Dial any screen up or down whenever you like.'); return; }
    if (act === 'redo') { W.redo = true; W.step = 0; A.go({ v: 'survey', k: 'retake' }); return; }
    if (act === 'print') { try { window.print(); } catch (er) { } return; }
    if (act === 'doc') { download('My CSEC IT learning plan.doc', docHTML(), 'application/msword'); return; }
    if (act === 'copy') { const ta = document.getElementById('sv-code'); try { navigator.clipboard.writeText(ta.value).then(() => A.toast('Code copied. Paste it to your teacher.')).catch(() => { ta.select(); A.toast('Select the code and copy it.'); }); } catch (er) { ta.select(); A.toast('Select the code and copy it.'); } return; }
    if (act === 'dlcode') { const ta = document.getElementById('sv-code'); download('my-csec-it-survey-code.txt', ta ? ta.value : '', 'text/plain'); return; }
  });
  document.addEventListener('change', e => { const t = e.target; if (!A || !t.dataset || t.dataset.svin !== 'nick') return; st().nick = t.value.replace(/[^\p{L}\p{N} .'-]/gu, '').slice(0, 16); A.save(); A.render(); });

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'survey', title: 'My Learning Survey & Plan', tile: { icon: '📋', meta: 'A 5-minute, non-personal survey that builds your own plan: levels, order, roadmap, simulators and SBA theme.' }, render
  });
})();
