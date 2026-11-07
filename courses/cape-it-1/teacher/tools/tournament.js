/* Class Tournament: knockout brackets, round-robin leagues, team rounds and a live class leaderboard, built from the course's own question bank. — Developed by Kester Small */
(function () {
  const CSS = `
.tn{display:flex;flex-direction:column;gap:18px;min-width:0}
.tn .tiles .tile{cursor:pointer}
.tn-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.tn-field{display:flex;flex-direction:column;gap:6px;min-width:0}
.tn-field label{font-weight:700;font-size:.9rem}
.tn-field select,.tn-field input,.tn-field textarea{width:100%;border:2px solid var(--line);border-radius:12px;padding:9px 12px;font:inherit;background:var(--surface);color:var(--ink)}
.tn-field textarea{min-height:150px;resize:vertical}
.tn-pill{display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:99px;background:var(--raise)}
.tn-pill.open{background:var(--soft-ok)} .tn-pill.closed{background:var(--soft-bad)}
.tn-champ{display:flex;gap:16px;align-items:center;background:var(--soft-gold);border-radius:16px;padding:16px 18px}
.tn-champ .cup{font-size:2.6rem;line-height:1}
.tn-champ h2{font-size:1.7rem}
.tn-scroll{overflow-x:auto;max-width:100%;padding-bottom:6px}
.tn-br{display:flex;gap:18px;min-width:max-content;align-items:stretch}
.tn-col{display:flex;flex-direction:column;gap:12px;justify-content:space-around;width:220px}
.tn-col h4{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.tn-m{border:2px solid var(--line);border-radius:12px;background:var(--surface);display:flex;flex-direction:column;overflow:hidden}
.tn-m.ready{border-color:var(--blue)}
.tn-pl{display:flex;justify-content:space-between;gap:8px;padding:7px 10px;font-size:.92rem}
.tn-pl + .tn-pl{border-top:1px solid var(--line)}
.tn-pl.win{background:var(--soft-ok);font-weight:700}
.tn-pl.out{color:var(--muted)}
.tn-pl b{font-variant-numeric:tabular-nums}
.tn-m .acts{display:flex;gap:6px;flex-wrap:wrap;padding:7px 10px;border-top:1px solid var(--line);background:var(--raise)}
.tn-sm{border:2px solid var(--line);background:transparent;border-radius:99px;padding:3px 10px;font-size:.8rem;font-weight:700}
.tn-sm:hover{border-color:var(--blue)}
.tn-sm.go{background:var(--blue);border-color:var(--blue);color:var(--on-blue)}
.tn-num{font-variant-numeric:tabular-nums;text-align:right}
.tn-me td{background:var(--soft-gold);font-weight:700}
.tn-teams{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.tn-team{border:2px solid var(--line);border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;background:var(--surface)}
.tn-team.lead{border-color:var(--gold)}
.tn-team .pts{font-family:var(--f-display);font-weight:800;font-size:2rem;font-variant-numeric:tabular-nums;line-height:1}
.tn-team .mem{font-size:.86rem;color:var(--muted)}
.tn-qhead{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:space-between}
.tn-time{font-family:var(--f-display);font-weight:800;font-size:1.3rem;font-variant-numeric:tabular-nums;min-width:3ch;text-align:right}
.tn-tb{height:8px;border-radius:99px;background:var(--raise);overflow:hidden}
.tn-tb i{display:block;height:100%;background:linear-gradient(90deg,var(--gold),var(--blue));transition:width .2s linear}
.tn-prompt{font-size:1.12rem;font-weight:700;max-width:70ch}
.tn-score{display:flex;gap:10px;flex-wrap:wrap}
.tn-score span{background:var(--raise);border-radius:99px;padding:4px 12px;font-weight:700;font-size:.9rem;font-variant-numeric:tabular-nums}
.tn-result{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.tn-result div{border-radius:14px;padding:14px;background:var(--raise);display:flex;flex-direction:column;gap:4px}
.tn-result div.win{background:var(--soft-ok)}
.tn-result b{font-family:var(--f-display);font-size:2rem;font-variant-numeric:tabular-nums;line-height:1.1}
.tn-big .tn-prompt{font-size:1.6rem}
.tn-big .opt{font-size:1.25rem;padding:14px 18px}
.tn-big table{font-size:1.35rem}
.tn-big h2{font-size:2.2rem}
@media (prefers-reduced-motion: reduce){.tn-tb i{transition:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ---------- helpers ---------- */
  let API = null;
  const RNG = s => { let a = s >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  const shuf = (arr, rng) => { const b = arr.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const dec = document.createElement('textarea');
  const txt = x => { dec.innerHTML = String(x == null ? '' : x).replace(/<[^>]+>/g, ' '); return dec.value.replace(/\s+/g, ' ').trim(); };
  const val = id => { const el = document.getElementById(id); return el ? el.value : ''; };
  const LET = 'ABCDEFGH';
  let SRC_ = null;
  function srcMap() {
    if (SRC_ && Object.keys(SRC_).length > 1) return SRC_;
    const mods = (window.COURSE_MODULES || []).filter(m => m && m.id);
    const w = mods.length && /^section/i.test(mods[0].code || '') ? 'sections' : 'modules';
    SRC_ = { all: 'All ' + w }; mods.forEach(m => { SRC_[m.id] = m.code || m.id; });
    return SRC_;
  }
  const TIMERS = [0, 10, 15, 20, 30, 45];
  const TEAM_NAMES = ['Pelicans', 'Flamboyants', 'Guavaberries', 'Sea Grapes', 'Hummingbirds', 'Steelpans', 'Iguanas', 'Sandpipers'];
  const fmtS = ms => (Math.max(0, Number(ms) || 0) / 1000).toFixed(1) + 's';
  const plural = (n, w) => n + ' ' + (n === 1 ? w : w === 'match' ? 'matches' : w === 'entry' ? 'entries' : w + 's');

  /* ---------- question bank (deterministic, so every device builds the same one) ---------- */
  const cache = {};
  function bank(src) {
    if (cache[src]) return cache[src];
    const out = [];
    (window.COURSE_MODULES || []).forEach(m => {
      if (!m || (src !== 'all' && m.id !== src)) return;
      const tag = m.code || m.id;
      ((m.test && m.test.items) || []).forEach(it => {
        if (Array.isArray(it.options) && it.options.length > 1 && typeof it.answer === 'number' && it.options[it.answer] != null) out.push({ p: txt(it.q), o: it.options.map(txt), a: it.answer, why: txt(it.why), tag });
      });
      (m.units || []).forEach(u => (u.screens || []).forEach(s => {
        if (s.type === 'mcq' && Array.isArray(s.options)) { const a = s.options.findIndex(o => o && o.ok); if (a >= 0) out.push({ p: txt(s.q), o: s.options.map(o => txt(o && o.t)), a, why: txt(s.options[a].fb), tag }); }
        if (s.type === 'multi' && Array.isArray(s.items)) s.items.forEach(it => { if (Array.isArray(it.options) && typeof it.answer === 'number' && it.options[it.answer] != null) out.push({ p: txt(it.text), o: it.options.map(txt), a: it.answer, why: txt(it.fb), tag }); });
      }));
    });
    const G = window.COURSE_GLOSSARY, rng = RNG(20261018);
    if (G && Array.isArray(G.terms)) {
      const terms = G.terms.filter(t => t && t.t && Array.isArray(t.d) && t.d[0] && (src === 'all' || t.c === src || (Array.isArray(t.m) && t.m.map(String).includes(src.replace(/\D/g, '')))));
      terms.forEach(t => {
        let d = txt(t.d[0]); if (d.length > 260) return;
        const base = t.t.split(/\s*[\/(]/)[0].trim();
        if (base.length > 2) d = d.replace(new RegExp(base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '_____');
        const same = terms.filter(x => x !== t && x.c === t.c), pool = same.length >= 3 ? same : terms.filter(x => x !== t);
        const ds = [], used = new Set([t.t.toLowerCase()]); let guard = 0;
        while (ds.length < 3 && pool.length && guard++ < 60) { const x = pool[Math.floor(rng() * pool.length)]; const k = x.t.toLowerCase(); if (!used.has(k)) { used.add(k); ds.push(x.t); } }
        if (ds.length < 3) return;
        out.push({ lead: 'Which term matches this definition?', p: d, o: [t.t].concat(ds), a: 0, why: t.t + ': ' + txt(t.d[0]), tag: srcMap()[t.c] ? srcMap()[t.c] + ' · Glossary' : 'Glossary' });
      });
    }
    return (cache[src] = out.filter(q => q.p && q.o.length > 1 && q.o.every(Boolean)));
  }
  function pick(src, n, seed) {
    const rng = RNG(seed), b = bank(srcMap()[src] ? src : 'all');
    return shuf(b, rng).slice(0, Math.min(n, b.length)).map(q => { const idx = shuf(q.o.map((_, i) => i), rng); return { lead: q.lead || '', p: q.p, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a), why: q.why, tag: q.tag }; });
  }
  const rseed = () => (Math.random() * 2147483647) | 0;

  /* ---------- state ---------- */
  function T() {
    const S = API.S; S.tourney = S.tourney || {}; const t = S.tourney;
    t.cfg = Object.assign({ src: 'all', n: 5, timer: 20, style: 'pass', teams: 4, rounds: 3 }, t.cfg || {});
    if (typeof t.names !== 'string') t.names = '';
    return t;
  }
  let setup = null, M = null, TQ = null, tab = 'hub', home = false, ask = '', note = '';
  let clock = null; // {deadline,total,onEnd}
  function startClock(sec, onEnd) { clock = sec ? { deadline: Date.now() + sec * 1000, total: sec * 1000, onEnd } : null; }
  setInterval(() => {
    if (!clock || !API) return;
    const el = document.getElementById('tn-time'); if (!el) return;
    const left = clock.deadline - Date.now();
    if (left <= 0) { const f = clock.onEnd; clock = null; try { f(); } catch (e) { } API.render(); return; }
    el.textContent = Math.ceil(left / 1000) + 's';
    const bar = document.getElementById('tn-tbar'); if (bar) bar.style.width = (100 * left / clock.total) + '%';
  }, 200);
  const clockHTML = () => {
    if (!clock) return '';
    const left = Math.max(0, clock.deadline - Date.now());
    return `<span class="tn-time" id="tn-time" aria-live="off">${Math.ceil(left / 1000)}s</span>`;
  };
  const barHTML = () => clock ? `<div class="tn-tb" aria-hidden="true"><i id="tn-tbar" style="width:${100 * Math.max(0, clock.deadline - Date.now()) / clock.total}%"></i></div>` : '';

  function parseNames(raw) {
    const seen = {}, out = [];
    raw.split(/\n|,/).map(s => s.trim().slice(0, 30)).filter(Boolean).forEach(n => { const k = n.toLowerCase(); if (seen[k]) { seen[k]++; out.push(n + ' ' + seen[k]); } else { seen[k] = 1; out.push(n); } });
    return out;
  }

  /* ---------- bracket ---------- */
  function mkBracket(names) {
    const p = shuf(names, Math.random); let size = 2; while (size < p.length) size *= 2;
    const slots = Array(size).fill(null); let k = 0;
    for (let i = 0; i < size && k < p.length; i += 2) slots[i] = p[k++];
    for (let i = 1; i < size && k < p.length; i += 2) slots[i] = p[k++];
    const rounds = []; let cnt = size / 2, r = 0;
    while (cnt >= 1) { rounds.push(Array.from({ length: cnt }, (_, i) => r === 0 ? { a: slots[2 * i], b: slots[2 * i + 1], w: null, sa: null, sb: null } : { a: null, b: null, w: null, sa: null, sb: null })); cnt /= 2; r++; }
    return rounds;
  }
  function settle(ev) {
    const R = ev.rounds;
    R.forEach((rd, r) => rd.forEach((m, i) => {
      if (r > 0) { m.a = R[r - 1][2 * i].w || null; m.b = R[r - 1][2 * i + 1].w || null; }
      if (m.w && m.w !== m.a && m.w !== m.b) { m.w = null; m.sa = m.sb = null; }
      if (r > 0 && (!m.a || !m.b) && !m.bye) { m.w = null; m.sa = m.sb = null; }
      m.bye = false;
      if (r === 0 && (m.a == null) !== (m.b == null)) { m.w = m.a || m.b; m.bye = true; }
    }));
  }
  function roundLabel(r, n) { const f = n - 1 - r; return f === 0 ? 'Final' : f === 1 ? 'Semi-finals' : f === 2 ? 'Quarter-finals' : f === 3 ? 'Round of 16' : 'Round ' + (r + 1); }

  /* ---------- round robin ---------- */
  function mkRR(names) {
    const list = shuf(names, Math.random); if (list.length % 2) list.push(null);
    const n = list.length, out = [];
    for (let r = 0; r < n - 1; r++) {
      for (let i = 0; i < n / 2; i++) { const a = list[i], b = list[n - 1 - i]; if (a && b) out.push({ a, b, r, sa: null, sb: null, w: null }); }
      list.splice(1, 0, list.pop());
    }
    return out;
  }
  function standings(ev) {
    const t = {}; ev.players.forEach(p => t[p] = { p, P: 0, W: 0, D: 0, L: 0, Pts: 0, Q: 0 });
    ev.matches.forEach(m => {
      if (!m.w) return; const A = t[m.a], B = t[m.b]; if (!A || !B) return;
      A.P++; B.P++; A.Q += m.sa || 0; B.Q += m.sb || 0;
      if (m.w === 'draw') { A.D++; B.D++; A.Pts++; B.Pts++; } else if (m.w === m.a) { A.W++; B.L++; A.Pts += 3; } else { B.W++; A.L++; B.Pts += 3; }
    });
    return Object.values(t).sort((x, y) => y.Pts - x.Pts || y.W - x.W || y.Q - x.Q || x.p.localeCompare(y.p));
  }

  /* ---------- matches (one device) ---------- */
  function newMatch(players, ref, cfg, qs) {
    M = { players, ref, cfg, qs: qs || pick(cfg.src, cfg.n, rseed()), sc: players.map(() => 0), ok: players.map(() => 0), ms: 0, who: 0, qi: 0, start: 0, ans: null, revealed: false, judge: players.map(() => false), phase: cfg.style === 'judge' ? 'q' : 'ready', forced: null };
    if (!M.qs.length) { M = null; note = 'There are no questions for that module yet. Choose another question source.'; return; }
    if (M.phase === 'q') beginQ();
  }
  function beginQ() { M.ans = null; M.revealed = false; M.judge = M.players.map(() => false); M.qt = Date.now(); startClock(M.cfg.timer, () => { if (M.cfg.style === 'judge') M.revealed = true; else answer(-1); }); }
  function answer(i) {
    if (!M || M.ans) return; const q = M.qs[M.qi], ok = i === q.a, el = Date.now() - M.qt;
    let pts = 0; if (ok) { pts = 100; if (M.cfg.timer && clock) pts += Math.round(50 * Math.max(0, clock.deadline - Date.now()) / clock.total); }
    clock = null; M.ms += Math.min(el, (M.cfg.timer || 600) * 1000);
    M.ans = { i, ok, pts }; M.sc[M.who] += pts; if (ok) M.ok[M.who]++;
    try { API.chime(ok ? 'ok' : 'soft'); } catch (e) { }
  }
  function nextQ() {
    if (M.cfg.style === 'judge') { M.judge.forEach((g, i) => { if (g) { M.sc[i] += 100; M.ok[i]++; } }); }
    M.qi++;
    if (M.qi < M.qs.length) { if (M.cfg.style === 'judge') beginQ(); else beginQ(); return; }
    if (M.cfg.style !== 'judge' && M.who < M.players.length - 1) { M.who++; M.qi = M.start; M.phase = 'ready'; clock = null; return; }
    M.phase = 'done'; clock = null;
    if (M.ref.live) submitLive();
  }
  function winnerIdx() { if (M.forced != null) return M.forced; if (M.players.length < 2) return 0; if (M.sc[0] === M.sc[1]) return -1; return M.sc[0] > M.sc[1] ? 0 : 1; }
  function saveMatch() {
    const t = T(), ev = t.ev, ref = M.ref; if (!ev || ev.id !== ref.ev) { M = null; return; }
    const w = winnerIdx();
    if (ev.kind === 'bracket') { if (w < 0) return; const m = ev.rounds[ref.r][ref.i]; m.sa = M.sc[0]; m.sb = M.sc[1]; m.w = M.players[w]; settle(ev); }
    if (ev.kind === 'rr') { const m = ev.matches[ref.i]; m.sa = M.sc[0]; m.sb = M.sc[1]; m.w = w < 0 ? 'draw' : M.players[w]; }
    API.save(); M = null; clock = null; try { API.chime('level'); } catch (e) { }
    API.toast('Result saved');
  }

  /* ---------- team rounds (projector) ---------- */
  function startTeamRound() {
    const ev = T().ev; TQ = { qs: pick(ev.cfg.src, ev.cfg.n, rseed()), qi: 0, revealed: false, hits: ev.teams.map(() => false) };
    if (!TQ.qs.length) { TQ = null; note = 'There are no questions for that module yet.'; return; }
    teamBegin();
  }
  function teamBegin() { TQ.revealed = false; TQ.hits = T().ev.teams.map(() => false); startClock(T().ev.cfg.timer, () => { if (TQ) TQ.revealed = true; }); }
  function teamNext() {
    const ev = T().ev; TQ.hits.forEach((h, i) => { if (h) ev.teams[i].pts += 100; });
    TQ.qi++;
    if (TQ.qi < TQ.qs.length) { teamBegin(); API.save(); return; }
    ev.round++; TQ = null; clock = null; API.save(); try { API.chime('level'); } catch (e) { }
  }

  /* ---------- live class board (db) ---------- */
  const L = { state: 'idle', db: null, user: null, uid: null, admin: false, owner: false, events: {}, scores: {}, err: '', sel: null, join: null, big: false, readonly: false };
  function rerender() { if (!API) return; const loc = API.S.loc || {}; if (loc.v === 'tournament' && !(M && M.phase === 'q') && !TQ) API.render(); }
  async function liveInit() {
    if (L.state !== 'idle') return; L.state = 'connecting';
    try {
      const c = window.claude; if (!c || !c.use) { L.state = 'off'; rerender(); return; }
      const [db, user] = await Promise.all([c.use('db'), c.use('user')]);
      if (!db) { L.state = 'off'; rerender(); return; }
      L.db = db; L.user = user;
      if (user) { L.uid = await user.id(); L.admin = await user.canEdit(); L.owner = await user.isOwner(); }
      L.state = 'on';
      const fail = e => { L.err = e && e.code === 'revoked' ? 'The class board is no longer available in this view.' : 'The class board stopped updating. Reopen the course to reconnect.'; rerender(); };
      db.collection('events').onSnapshot(s => { const o = {}; s.docs.forEach(d => { if (d.exists) o[d.id] = d.data(); }); L.events = o; rerender(); }, fail);
      db.collection('scores').onSnapshot(s => { const o = {}; s.docs.forEach(d => { if (d.exists) o[d.id] = d.data(); }); L.scores = o; rerender(); }, fail);
      rerender();
    } catch (e) { L.state = 'off'; rerender(); }
  }
  const evCfg = e => ({ src: srcMap()[e.src] ? e.src : 'all', n: Math.max(3, Math.min(20, Number(e.n) || 10)), timer: TIMERS.includes(Number(e.timer)) ? Number(e.timer) : 20, style: 'pass', seed: (Number(e.seed) || 1) | 0 });
  const entry = (uid, id) => { const d = L.scores[uid]; const x = d && d.ev && typeof d.ev === 'object' ? d.ev[id] : null; return x && typeof x === 'object' ? x : null; };
  function board(id) {
    return Object.keys(L.scores).map(u => ({ u, d: L.scores[u], x: entry(u, id) })).filter(r => r.x)
      .map(r => ({ u: r.u, nick: String(r.d.nick || 'Player').slice(0, 24), score: Number(r.x.score) || 0, correct: Number(r.x.correct) || 0, n: Number(r.x.n) || 0, ms: Number(r.x.ms) || 0 }))
      .sort((a, b) => b.score - a.score || a.ms - b.ms);
  }
  async function submitLive() {
    const id = M.ref.live; M.posting = true; M.subErr = '';
    const mine = L.scores[L.uid]; const body = mine ? JSON.parse(JSON.stringify(mine)) : {};
    body.nick = M.players[0]; body.ev = body.ev && typeof body.ev === 'object' ? body.ev : {};
    if (body.ev[id]) { M.posting = false; M.subErr = 'You already have a score on this board. Only your first sprint counts.'; API.render(); return; }
    body.ev[id] = { score: M.sc[0], correct: M.ok[0], n: M.qs.length, ms: Math.round(M.ms), at: Date.now() };
    try { await L.db.doc('scores/' + L.uid).set(body); M.posted = true; try { API.reward(Math.max(5, M.ok[0] * 3), '🏆 Tournament sprint'); } catch (e) { } }
    catch (e) { if (e && (e.code === 'invalid_argument')) { L.readonly = true; M.subErr = 'Your account can see the board but cannot post to it. Ask your teacher to share the course with you as a Contributor.'; } else if (e && e.code === 'quota_exceeded') M.subErr = 'The class board is full. Ask your teacher to clear an old event.'; else M.subErr = 'Your score did not post. Check your connection and tap Try again.'; }
    M.posting = false; if (API.S.loc && API.S.loc.v === 'tournament') API.render();
  }

  /* ---------- views ---------- */
  const crumbs = (label, back) => `<div class="crumbs"><button type="button" class="linkbtn" data-px="${back || 'home'}">← ${back === 'quit' ? 'Leave' : 'Class Tournament'}</button><span>${label}</span></div>`;
  function rHub() {
    const esc = API.esc, t = T(), ev = t.ev;
    const FORMATS = [
      ['bracket', '🏆', 'Knockout bracket', 'Pairs face off and winners move on until one champion is left. Byes are added for odd numbers.'],
      ['rr', '🔁', 'Round-robin league', 'Everyone plays everyone. Win 3 points, draw 1. The table decides the winner.'],
      ['teams', '👥', 'Team rounds', 'Split the class into teams. Put each question on the projector and award points to every team that gets it right.'],
      ['live', '📡', 'Live class board', 'Every student plays the same timed sprint on their own device. Scores post to one shared leaderboard.']
    ];
    let h = `<section class="hero"><span class="eyebrow">Play &amp; Compete</span><h1>Class Tournament</h1><p>Run a class competition with ${bank('all').length} questions from this course's tests, practice questions and glossary. The first three formats run on one screen. The live board connects every student's device.</p></section>`;
    if (note) h += `<p class="fb note">${esc(note)}</p>`;
    if (ev) h += `<div class="card"><div class="card-top"><span class="kicker k-game">In progress</span><span class="hint">${esc(srcMap()[ev.cfg.src])} · ${plural(ev.cfg.n, 'question')} per ${ev.kind === 'teams' ? 'round' : 'match'}</span></div><h2>${esc(ev.title)}</h2>
      <div class="row"><button type="button" class="btn go" data-px="open">Continue tournament</button>${ask === 'end' ? `<span class="warn">End it and clear all results?</span><button type="button" class="btn ghost" data-px="end">Yes, end it</button><button type="button" class="btn ghost" data-px="noask">Keep it</button>` : `<button type="button" class="btn ghost" data-px="askend">End tournament</button>`}</div></div>`;
    h += `<div class="card"><h2>Choose a Format</h2><div class="tiles">${FORMATS.map(f => `<button type="button" class="tile" data-px="${f[0] === 'live' ? 'live' : 'new'}" data-k="${f[0]}"><span class="ticon" aria-hidden="true">${f[1]}</span><h3>${f[2]}</h3><span class="meta">${f[3]}</span><span class="meta">${f[0] === 'live' ? 'Open the board →' : 'Set it up →'}</span></button>`).join('')}</div>
      ${ev ? '<p class="hint">Starting a new format replaces the tournament in progress on this device.</p>' : ''}</div>`;
    h += `<div class="card"><h3>How Scoring Works</h3><ul><li><b>Pass the device:</b> each player answers the same questions in turn. A correct answer earns 100 points plus up to 50 for speed when the timer is on.</li><li><b>Teacher scores on the projector:</b> everyone sees the question, you reveal the answer and tap who got it right (100 points each).</li><li>Bracket ties go to a sudden-death question, or you pick the winner.</li></ul></div>`;
    return h;
  }
  function rSetup() {
    const esc = API.esc, t = T(), c = t.cfg, k = setup;
    const title = { bracket: 'Knockout Bracket', rr: 'Round-Robin League', teams: 'Team Rounds' }[k];
    const max = k === 'rr' ? 12 : k === 'bracket' ? 32 : 60;
    const opt = (arr, cur, lab) => arr.map(v => `<option value="${v}"${String(v) === String(cur) ? ' selected' : ''}>${lab(v)}</option>`).join('');
    let h = crumbs(title) + `<div class="card"><span class="kicker k-game">Set up</span><h2>${title}</h2>`;
    if (note) h += `<p class="fb bad">${esc(note)}</p>`;
    h += `<div class="tn-field"><label for="tn-title">Tournament name</label><input id="tn-title" maxlength="50" value="${esc(t.lastTitle || 'Unit 1 Showdown')}"></div>
      <div class="tn-field"><label for="tn-names">${k === 'teams' ? 'Students (one per line)' : 'Players (one per line)'}</label><textarea id="tn-names" placeholder="Amara&#10;Jaden&#10;Keisha&#10;Malik">${esc(t.names)}</textarea><span class="hint">${k === 'rr' ? 'Between 3 and 12 players, so everyone can play everyone.' : k === 'bracket' ? 'Between 2 and 32 players. Pairs or small groups can enter as one name.' : 'At least 2 students. Teams are dealt out at random.'}</span></div>
      <div class="tn-grid">
      <div class="tn-field"><label for="tn-src">Questions from</label><select id="tn-src">${opt(Object.keys(srcMap()), c.src, v => srcMap()[v] + ' (' + bank(v).length + ')')}</select></div>
      <div class="tn-field"><label for="tn-n">${k === 'teams' ? 'Questions per round' : 'Questions per match'}</label><select id="tn-n">${opt([3, 5, 7, 10, 15], c.n, v => v)}</select></div>
      <div class="tn-field"><label for="tn-timer">Timer per question</label><select id="tn-timer">${opt(TIMERS, c.timer, v => v ? v + ' seconds' : 'Off')}</select></div>`;
    if (k === 'teams') h += `<div class="tn-field"><label for="tn-teams">Number of teams</label><select id="tn-teams">${opt([2, 3, 4, 5, 6, 7, 8], c.teams, v => v)}</select></div><div class="tn-field"><label for="tn-rounds">Rounds</label><select id="tn-rounds">${opt([1, 2, 3, 4, 5], c.rounds, v => v)}</select></div>`;
    else h += `<div class="tn-field"><label for="tn-style">How matches are played</label><select id="tn-style">${opt(['pass', 'judge'], c.style, v => v === 'pass' ? 'Pass the device' : 'Teacher scores on projector')}</select></div>`;
    h += `</div><div class="row"><button type="button" class="btn go" data-px="start" data-k="${k}">Start tournament</button><button type="button" class="btn ghost" data-px="home">Cancel</button></div><span class="hint">Up to ${max} names. Results are saved on this device.</span></div>`;
    return h;
  }
  function startEvent(k) {
    const t = T(); note = '';
    const names = parseNames(val('tn-names'));
    const cfg = { src: srcMap()[val('tn-src')] ? val('tn-src') : 'all', n: Number(val('tn-n')) || 5, timer: TIMERS.includes(Number(val('tn-timer'))) ? Number(val('tn-timer')) : 20, style: val('tn-style') === 'judge' ? 'judge' : 'pass' };
    const title = (val('tn-title').trim() || 'Unit 1 Showdown').slice(0, 50);
    t.names = names.join('\n'); t.lastTitle = title;
    if (k === 'teams') { cfg.style = 'judge'; cfg.teams = Number(val('tn-teams')) || 4; cfg.rounds = Number(val('tn-rounds')) || 3; }
    Object.assign(t.cfg, cfg);
    const min = k === 'rr' ? 3 : 2, max = k === 'rr' ? 12 : k === 'bracket' ? 32 : 60;
    if (names.length < min) { note = `Add at least ${min} names, one per line.`; return; }
    if (names.length > max) { note = `That is ${names.length} names. This format takes up to ${max}.`; return; }
    if (!bank(cfg.src).length) { note = 'There are no questions for that module yet. Choose another question source.'; return; }
    const ev = { id: Date.now(), kind: k, title, cfg, players: names };
    if (k === 'bracket') { ev.rounds = mkBracket(names); settle(ev); }
    if (k === 'rr') ev.matches = mkRR(names);
    if (k === 'teams') {
      const nt = Math.max(2, Math.min(cfg.teams, names.length)), deal = shuf(names, Math.random);
      ev.teams = Array.from({ length: nt }, (_, i) => ({ n: TEAM_NAMES[i], m: [], pts: 0 }));
      deal.forEach((p, i) => ev.teams[i % nt].m.push(p)); ev.round = 0;
    }
    t.ev = ev; setup = null; home = false; API.save(); API.toast('Tournament started');
  }
  function evHead(ev, kicker, extra) {
    const esc = API.esc;
    return crumbs(esc(ev.title)) + `<div class="card"><div class="card-top"><span class="kicker k-game">${kicker}</span><span class="hint">${esc(srcMap()[ev.cfg.src])} · ${plural(ev.cfg.n, 'question')} · ${ev.cfg.timer ? ev.cfg.timer + 's timer' : 'no timer'}${ev.kind !== 'teams' ? ' · ' + (ev.cfg.style === 'judge' ? 'teacher scores' : 'pass the device') : ''}</span></div><h2>${esc(ev.title)}</h2>${extra || ''}</div>`;
  }
  function rBracket(ev) {
    const esc = API.esc, R = ev.rounds, champ = R[R.length - 1][0].w;
    const left = R.reduce((a, rd) => a + rd.filter(m => m.a && m.b && !m.w).length, 0);
    let h = evHead(ev, 'Knockout bracket', champ ? `<div class="tn-champ"><span class="cup" aria-hidden="true">🏆</span><div><span class="lbl">Champion</span><h2>${esc(champ)}</h2></div></div>` : `<p class="hint">${plural(ev.players.length, 'player')} · ${plural(left, 'match')} ready to play. Tap Play on a highlighted match.</p>`);
    h += `<div class="card"><div class="tn-scroll"><div class="tn-br">${R.map((rd, r) => `<div class="tn-col"><h4>${roundLabel(r, R.length)}</h4>${rd.map((m, i) => {
      const ready = m.a && m.b && !m.w;
      const row = (p, s) => `<div class="tn-pl ${m.w && p && m.w === p ? 'win' : m.w && p ? 'out' : ''}"><span>${p ? esc(p) : (r === 0 ? '<i class="hint">Bye</i>' : '<i class="hint">To be decided</i>')}</span><b>${s != null && !m.bye ? s : ''}</b></div>`;
      let acts = '';
      if (ready) acts = `<div class="acts"><button type="button" class="tn-sm go" data-px="playbr" data-r="${r}" data-i="${i}">Play</button><button type="button" class="tn-sm" data-px="setw" data-r="${r}" data-i="${i}" data-s="a" title="Record a result played elsewhere">${esc(m.a).slice(0, 10)} won</button><button type="button" class="tn-sm" data-px="setw" data-r="${r}" data-i="${i}" data-s="b">${esc(m.b).slice(0, 10)} won</button></div>`;
      else if (m.w && !m.bye) acts = `<div class="acts"><button type="button" class="tn-sm" data-px="clrbr" data-r="${r}" data-i="${i}">Undo result</button></div>`;
      return `<div class="tn-m ${ready ? 'ready' : ''}">${row(m.a, m.sa)}${row(m.b, m.sb)}${acts}</div>`;
    }).join('')}</div>`).join('')}</div></div><p class="hint">Scroll sideways on a small screen. Undoing a result also clears any later matches that depended on it.</p></div>`;
    return h;
  }
  function rRR(ev) {
    const esc = API.esc, tb = standings(ev), done = ev.matches.filter(m => m.w).length, all = done === ev.matches.length;
    let h = evHead(ev, 'Round-robin league', all ? `<div class="tn-champ"><span class="cup" aria-hidden="true">🏆</span><div><span class="lbl">League winner</span><h2>${esc(tb[0].p)}</h2><span class="hint">${tb[0].Pts} points</span></div></div>` : `<p class="hint">${done} of ${ev.matches.length} matches played.</p>`);
    h += `<div class="card"><h3>League Table</h3><div class="tablewrap"><table><thead><tr><th>#</th><th>Player</th><th class="tn-num">P</th><th class="tn-num">W</th><th class="tn-num">D</th><th class="tn-num">L</th><th class="tn-num">Points</th><th class="tn-num">Quiz score</th></tr></thead><tbody>${tb.map((s, i) => `<tr><td>${i + 1}</td><td>${esc(s.p)}</td><td class="tn-num">${s.P}</td><td class="tn-num">${s.W}</td><td class="tn-num">${s.D}</td><td class="tn-num">${s.L}</td><td class="tn-num"><b>${s.Pts}</b></td><td class="tn-num">${s.Q}</td></tr>`).join('')}</tbody></table></div><p class="hint">Ranked by points, then wins, then total quiz score.</p></div>`;
    const rounds = [...new Set(ev.matches.map(m => m.r))];
    const cur = rounds.find(r => ev.matches.some(m => m.r === r && !m.w));
    h += `<div class="card"><h3>Fixtures</h3>${rounds.map(r => `<details ${r === cur ? 'open' : ''}><summary><b>Round ${r + 1}</b> <span class="hint">${ev.matches.filter(m => m.r === r && m.w).length}/${ev.matches.filter(m => m.r === r).length} played</span></summary><div class="items" style="margin-top:8px">${ev.matches.map((m, i) => [m, i]).filter(([m]) => m.r === r).map(([m, i]) => `<div class="item ${m.w ? 'good' : ''}"><div class="row" style="justify-content:space-between"><span><b>${esc(m.a)}</b> vs <b>${esc(m.b)}</b></span><span>${m.w ? (m.sa != null ? `${m.sa} – ${m.sb} · ` : '') + (m.w === 'draw' ? 'Draw' : esc(m.w) + ' won') : ''}</span></div><div class="row">${m.w ? `<button type="button" class="tn-sm" data-px="clrrr" data-i="${i}">Undo result</button>` : `<button type="button" class="tn-sm go" data-px="playrr" data-i="${i}">Play</button><button type="button" class="tn-sm" data-px="setrr" data-i="${i}" data-s="a">${esc(m.a).slice(0, 10)} won</button><button type="button" class="tn-sm" data-px="setrr" data-i="${i}" data-s="d">Draw</button><button type="button" class="tn-sm" data-px="setrr" data-i="${i}" data-s="b">${esc(m.b).slice(0, 10)} won</button>`}</div></div>`).join('')}</div></details>`).join('')}</div>`;
    return h;
  }
  function rTeams(ev) {
    const esc = API.esc, top = Math.max(...ev.teams.map(x => x.pts)), fin = ev.round >= ev.cfg.rounds;
    const leaders = ev.teams.filter(x => x.pts === top);
    let extra = fin ? `<div class="tn-champ"><span class="cup" aria-hidden="true">🏆</span><div><span class="lbl">${leaders.length > 1 ? 'Joint winners' : 'Winning team'}</span><h2>${leaders.map(x => esc(x.n)).join(' & ')}</h2><span class="hint">${top} points</span></div></div>`
      : `<p class="hint">Round ${ev.round + 1} of ${ev.cfg.rounds} is next.</p><div class="row"><button type="button" class="btn go" data-px="tround">Start round ${ev.round + 1}</button>${ev.round === 0 && ev.teams.every(x => !x.pts) ? '<button type="button" class="btn ghost" data-px="tshuf">Shuffle teams</button>' : ''}</div>`;
    let h = evHead(ev, 'Team rounds', extra);
    h += `<div class="card"><h3>Scoreboard</h3><div class="tn-teams">${ev.teams.map(x => `<div class="tn-team ${x.pts === top && top > 0 ? 'lead' : ''}"><span class="lbl">${esc(x.n)}</span><span class="pts">${x.pts}</span><span class="mem">${x.m.map(esc).join(', ')}</span></div>`).join('')}</div></div>`;
    return h;
  }
  function rTeamQ() {
    const esc = API.esc, ev = T().ev, q = TQ.qs[TQ.qi];
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-px="tquit">← Back to scoreboard</button><span>${esc(ev.title)} · Round ${ev.round + 1}</span></div>`;
    h += `<div class="card tn-big"><div class="tn-qhead"><span class="kicker k-game">Round ${ev.round + 1} · Question ${TQ.qi + 1} of ${TQ.qs.length}</span><span class="hint">${esc(q.tag)}</span>${TQ.revealed ? '' : clockHTML()}</div>${TQ.revealed ? '' : barHTML()}
      ${q.lead ? `<p class="hint">${esc(q.lead)}</p>` : ''}<p class="tn-prompt">${esc(q.p)}</p>
      <div class="opts">${q.o.map((o, i) => `<div class="opt ${TQ.revealed && i === q.a ? 'right' : ''}"><span class="letter">${LET[i]}</span><span>${esc(o)}</span></div>`).join('')}</div>`;
    if (!TQ.revealed) h += `<div class="row"><button type="button" class="btn gold" data-px="treveal">Reveal answer</button></div>`;
    else h += `<div class="fb good"><b>Answer: ${LET[q.a]}. ${esc(q.o[q.a])}</b>${q.why ? `<span>${esc(q.why)}</span>` : ''}</div><p class="q">Which teams got it right?</p><div class="chips">${ev.teams.map((x, i) => `<button type="button" class="chip ${TQ.hits[i] ? 'sel' : ''}" data-px="thit" data-i="${i}" aria-pressed="${TQ.hits[i]}">${TQ.hits[i] ? '✓ ' : ''}${esc(x.n)}</button>`).join('')}</div><div class="row"><button type="button" class="btn go" data-px="tnext">${TQ.qi + 1 < TQ.qs.length ? 'Award points and next question' : 'Award points and finish round'}</button></div>`;
    h += `</div><div class="tn-score">${ev.teams.map(x => `<span>${esc(x.n)}: ${x.pts}</span>`).join('')}</div>`;
    return h;
  }
  function rMatch() {
    const esc = API.esc, nm = i => esc(M.players[i]), judge = M.cfg.style === 'judge', live = !!M.ref.live;
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-px="askquit">✕ Leave ${live ? 'sprint' : 'match'}</button><span>${live ? 'Live sprint · ' + esc((L.events[M.ref.live] || {}).title || '') : M.players.map(esc).join(' vs ')}</span></div>`;
    if (ask === 'quit') h += `<div class="fb note"><b>Leave now? ${live ? 'Your score will not be posted.' : 'This match will not be saved.'}</b><div class="row"><button type="button" class="btn ghost" data-px="quit">Yes, leave</button><button type="button" class="btn go" data-px="noask">Keep playing</button></div></div>`;
    if (M.phase === 'ready') {
      const others = M.players.filter((_, i) => i !== M.who), cnt = M.qs.length - M.start, sd = M.start > 0;
      return h + `<div class="card"><span class="kicker k-game">${M.who > 0 ? 'Hand over' : sd ? 'Sudden death' : 'Get ready'}</span><h2>${M.players.length > 1 ? 'Pass the device to ' + nm(M.who) : 'Ready, ' + nm(0) + '?'}</h2>
        <p class="lead">${plural(cnt, 'question')}. ${M.cfg.timer ? `${M.cfg.timer} seconds each. Correct answers earn 100 points, plus up to 50 more for speed.` : 'No timer. Each correct answer earns 100 points.'}${others.length ? ' ' + others.map(esc).join(', ') + ', look away until it is your turn.' : ''}</p>
        <div class="row"><button type="button" class="btn go" data-px="go">I'm ${nm(M.who)}. Start</button></div></div>`;
    }
    if (M.phase === 'done') return h + rDone();
    const q = M.qs[M.qi], k = M.qi - M.start + 1, n = M.qs.length - M.start, settled = judge ? M.revealed : !!M.ans;
    h += `<div class="card ${judge ? 'tn-big' : ''}"><div class="tn-qhead"><span class="kicker k-game">${judge ? 'Projector match' : nm(M.who)}</span><span>Question ${k} of ${n}</span><span class="hint">${esc(q.tag)}</span>${settled ? '' : clockHTML()}</div>${settled ? '' : barHTML()}
      ${q.lead ? `<p class="hint">${esc(q.lead)}</p>` : ''}<p class="tn-prompt">${esc(q.p)}</p>`;
    if (!judge) {
      h += `<div class="opts">${q.o.map((o, i) => { const c = M.ans ? (i === q.a ? 'right' : i === M.ans.i ? 'wrong' : '') : ''; return `<button type="button" class="opt ${c}" data-px="ans" data-i="${i}" ${M.ans ? 'disabled' : ''}><span class="letter">${LET[i]}</span><span>${esc(o)}</span></button>`; }).join('')}</div>`;
      if (M.ans) h += `<div class="fb ${M.ans.ok ? 'good' : 'bad'}"><b>${M.ans.ok ? `Correct! +${M.ans.pts} points` : M.ans.i < 0 ? `Time is up. The answer is ${LET[q.a]}.` : `Not this time. The answer is ${LET[q.a]}.`}</b>${q.why ? `<span>${esc(q.why)}</span>` : ''}</div><div class="row"><button type="button" class="btn go" data-px="next">${M.qi + 1 < M.qs.length ? 'Next question' : 'Finish'}</button><span class="hint">Your score: ${M.sc[M.who]}</span></div>`;
    } else {
      h += `<div class="opts">${q.o.map((o, i) => `<div class="opt ${M.revealed && i === q.a ? 'right' : ''}"><span class="letter">${LET[i]}</span><span>${esc(o)}</span></div>`).join('')}</div>`;
      if (!M.revealed) h += `<div class="row"><button type="button" class="btn gold" data-px="reveal">Reveal answer</button></div>`;
      else h += `<div class="fb good"><b>Answer: ${LET[q.a]}. ${esc(q.o[q.a])}</b>${q.why ? `<span>${esc(q.why)}</span>` : ''}</div><p class="q">Who got it right?</p><div class="chips">${M.players.map((p, i) => `<button type="button" class="chip ${M.judge[i] ? 'sel' : ''}" data-px="jt" data-i="${i}" aria-pressed="${M.judge[i]}">${M.judge[i] ? '✓ ' : ''}${esc(p)}</button>`).join('')}</div><div class="row"><button type="button" class="btn go" data-px="next">${M.qi + 1 < M.qs.length ? 'Next question' : 'Finish'}</button></div>`;
    }
    h += `</div>`;
    if (judge) h += `<div class="tn-score">${M.players.map((p, i) => `<span>${esc(p)}: ${M.sc[i]}</span>`).join('')}</div>`;
    return h;
  }
  function rDone() {
    const esc = API.esc;
    if (M.ref.live) {
      let s = `<div class="card"><span class="kicker k-game">Sprint complete</span><h2>${M.sc[0]} points</h2><div class="tn-result"><div><span class="lbl">Correct</span><b>${M.ok[0]}/${M.qs.length}</b></div><div><span class="lbl">Time</span><b>${fmtS(M.ms)}</b></div></div>`;
      if (M.posting) s += `<p class="fb note">Posting your score…</p>`;
      else if (M.posted) s += `<p class="fb good"><b>Your score is on the class board.</b></p>`;
      else if (M.subErr) s += `<p class="fb bad">${esc(M.subErr)}</p>${L.readonly ? '' : '<div class="row"><button type="button" class="btn gold" data-px="retry">Try again</button></div>'}`;
      s += `<div class="row"><button type="button" class="btn go" data-px="toboard">See the class board</button></div></div>`;
      return s;
    }
    const w = winnerIdx(), ev = T().ev, needWin = ev && ev.kind === 'bracket';
    let s = `<div class="card"><span class="kicker k-game">Match complete</span><h2>${w >= 0 ? esc(M.players[w]) + ' wins!' : 'It is a tie!'}</h2>
      <div class="tn-result">${M.players.map((p, i) => `<div class="${i === w ? 'win' : ''}"><span class="lbl">${esc(p)}</span><b>${M.sc[i]}</b><span class="hint">${M.ok[i]} of ${M.qs.length} correct</span></div>`).join('')}</div>`;
    if (w < 0 && needWin) s += `<p class="lead">A knockout match needs a winner. Play one sudden-death question, or decide it yourself.</p><div class="row"><button type="button" class="btn gold" data-px="sd">Sudden-death question</button>${M.players.map((p, i) => `<button type="button" class="btn ghost" data-px="force" data-i="${i}">${esc(p)} goes through</button>`).join('')}</div>`;
    else s += `<div class="row"><button type="button" class="btn go" data-px="save">${w < 0 ? 'Save as a draw' : 'Save result'}</button></div>`;
    return s + `</div>`;
  }
  function rLive() {
    const esc = API.esc;
    if (L.state === 'idle') liveInit();
    let h = crumbs('Live class board');
    if (L.state === 'idle' || L.state === 'connecting') return h + `<div class="card"><h2>Live Class Board</h2><p class="fb note">Connecting to the class board…</p></div>`;
    if (L.state === 'off') return h + `<div class="card"><h2>Live Class Board</h2><p class="lead">The class board works when the course is opened from its online link while signed in. In this view it cannot connect.</p><p>You can still run a knockout bracket, a league or team rounds on one screen.</p><div class="row"><button type="button" class="btn go" data-px="home">Choose a one-screen format</button></div></div>`;
    if (L.err) h += `<p class="fb bad">${esc(L.err)}</p>`;
    if (L.join && L.events[L.join]) {
      const e = L.events[L.join], c = evCfg(e);
      return h + `<div class="card"><span class="kicker k-game">Join</span><h2>${esc(e.title || 'Class sprint')}</h2><p class="lead">${plural(c.n, 'question')} from ${esc(srcMap()[c.src])}${c.timer ? `, ${c.timer} seconds each` : ''}. Everyone gets the same questions. Highest score wins; the faster time breaks a tie. You get one try.</p>
        <div class="tn-field" style="max-width:340px"><label for="tn-nick">Name on the board</label><input id="tn-nick" maxlength="24" value="${esc(T().nick || API.S.name || '')}" placeholder="First name and initial"></div>
        <div class="row"><button type="button" class="btn go" data-px="ljoin">Start my sprint</button><button type="button" class="btn ghost" data-px="lback">Cancel</button></div></div>`;
    }
    if (L.sel && L.events[L.sel]) return h + rBoard(L.sel);
    const evs = Object.keys(L.events).map(id => ({ id, e: L.events[id] })).sort((a, b) => (Number(b.e.created) || 0) - (Number(a.e.created) || 0));
    h += `<div class="card"><h2>Live Class Board</h2><p class="lead">Your teacher opens a sprint. Everyone joins on their own device, answers the same questions, and the board updates as scores come in.</p>${!L.uid ? '<p class="fb note">Sign in to join a sprint. You can still watch the boards.</p>' : ''}</div>`;
    if (L.admin) {
      const opt = (arr, cur, lab) => arr.map(v => `<option value="${v}"${String(v) === String(cur) ? ' selected' : ''}>${lab(v)}</option>`).join('');
      h += `<div class="card"><h3>Open a New Sprint</h3><div class="tn-grid"><div class="tn-field"><label for="tn-ltitle">Sprint name</label><input id="tn-ltitle" maxlength="50" value="Unit 1 Sprint"></div><div class="tn-field"><label for="tn-lsrc">Questions from</label><select id="tn-lsrc">${opt(Object.keys(srcMap()), 'all', v => srcMap()[v])}</select></div><div class="tn-field"><label for="tn-ln">Questions</label><select id="tn-ln">${opt([5, 10, 15, 20], 10, v => v)}</select></div><div class="tn-field"><label for="tn-lt">Timer</label><select id="tn-lt">${opt(TIMERS, 20, v => v ? v + ' seconds' : 'Off')}</select></div></div><div class="row"><button type="button" class="btn go" data-px="lnew">Open sprint</button><span class="hint">Only you and course editors see this panel.</span></div></div>`;
    }
    h += `<div class="card"><h3>Sprints</h3>${evs.length ? `<div class="items">${evs.map(({ id, e }) => {
      const c = evCfg(e), mine = L.uid ? entry(L.uid, id) : null, cnt = board(id).length, open = e.open !== false;
      return `<div class="item"><div class="row" style="justify-content:space-between"><span><b>${esc(e.title || 'Class sprint')}</b> <span class="tn-pill ${open ? 'open' : 'closed'}">${open ? 'Open' : 'Closed'}</span></span><span class="hint">${esc(srcMap()[c.src])} · ${plural(c.n, 'question')} · ${plural(cnt, 'entry')}</span></div>
        <div class="row"><button type="button" class="tn-sm" data-px="lsel" data-k="${esc(id)}">View board</button>${mine ? `<span class="hint">Your score: <b>${Number(mine.score) || 0}</b></span>` : open && L.uid && !L.readonly ? `<button type="button" class="tn-sm go" data-px="lpre" data-k="${esc(id)}">Join</button>` : ''}
        ${L.admin ? `<button type="button" class="tn-sm" data-px="ltog" data-k="${esc(id)}">${open ? 'Close entries' : 'Reopen'}</button>${ask === 'del:' + id ? `<span class="warn">Delete this sprint?</span><button type="button" class="tn-sm" data-px="ldel" data-k="${esc(id)}">Yes, delete</button><button type="button" class="tn-sm" data-px="noask">Keep</button>` : `<button type="button" class="tn-sm" data-px="laskdel" data-k="${esc(id)}">Delete</button>`}` : ''}</div></div>`;
    }).join('')}</div>` : `<p class="empty">No sprints yet. ${L.admin ? 'Open one above, then ask the class to open Class Tournament and choose Live class board.' : 'When your teacher opens a sprint it appears here, ready to join.'}</p>`}</div>`;
    return h;
  }
  function rBoard(id) {
    const esc = API.esc, e = L.events[id], rows = board(id), open = e.open !== false, mine = L.uid ? entry(L.uid, id) : null;
    let h = `<div class="card ${L.big ? 'tn-big' : ''}"><div class="card-top"><span class="kicker k-game">Class board</span><span class="tn-pill ${open ? 'open' : 'closed'}">${open ? 'Entries open' : 'Entries closed'}</span></div><h2>${esc(e.title || 'Class sprint')}</h2>
      <div class="row"><button type="button" class="btn ghost" data-px="lback">← All sprints</button><button type="button" class="btn ghost" data-px="lbig" aria-pressed="${L.big}">${L.big ? 'Normal size' : 'Projector size'}</button>${!mine && open && L.uid && !L.readonly ? `<button type="button" class="btn go" data-px="lpre" data-k="${esc(id)}">Join this sprint</button>` : ''}</div>`;
    if (!rows.length) h += `<p class="empty">No scores yet. Scores appear here the moment each student finishes.</p>`;
    else h += `<div class="tablewrap"><table><thead><tr><th>#</th><th>Player</th><th class="tn-num">Score</th><th class="tn-num">Correct</th><th class="tn-num">Time</th>${L.owner ? '<th><span class="sr">Remove</span></th>' : ''}</tr></thead><tbody>${rows.map((r, i) => `<tr class="${r.u === L.uid ? 'tn-me' : ''}"><td>${i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</td><td>${esc(r.nick)}${r.u === L.uid ? ' (you)' : ''}</td><td class="tn-num"><b>${r.score}</b></td><td class="tn-num">${r.correct}/${r.n}</td><td class="tn-num">${fmtS(r.ms)}</td>${L.owner ? `<td><button type="button" class="tn-sm" data-px="lrm" data-k="${esc(id)}" data-u="${esc(r.u)}" aria-label="Remove ${esc(r.nick)}">✕</button></td>` : ''}</tr>`).join('')}</tbody></table></div>`;
    return h + `<p class="hint">Updates live. Ties are broken by the faster total time.</p></div>`;
  }

  /* ---------- plugin ---------- */
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'tournament',
    title: 'Class Tournament',
    tile: { icon: '🏆', meta: 'Knockout brackets, round-robin leagues, team rounds and a live class leaderboard' },
    render(api) {
      API = api; const t = T(); let body;
      if (M) body = rMatch();
      else if (tab === 'live') body = rLive();
      else if (TQ && t.ev) body = rTeamQ();
      else if (setup) body = rSetup();
      else if (t.ev && !home) body = t.ev.kind === 'bracket' ? rBracket(t.ev) : t.ev.kind === 'rr' ? rRR(t.ev) : rTeams(t.ev);
      else body = rHub();
      return `<div class="tn" data-notc>${body}</div>`;
    },
    click(a, el, api) {
      API = api; const t = T(), ev = t.ev, d = el.dataset, r = +d.r, i = +d.i;
      const done = () => api.render();
      if (!['askend', 'askquit', 'laskdel'].includes(a)) ask = '';
      switch (a) {
        case 'home': setup = null; tab = 'hub'; home = true; note = ''; L.sel = L.join = null; break;
        case 'open': home = false; break;
        case 'new': setup = d.k; note = ''; tab = 'hub'; break;
        case 'start': startEvent(d.k); break;
        case 'askend': ask = 'end'; break;
        case 'noask': ask = ''; break;
        case 'end': t.ev = null; TQ = null; api.save(); api.toast('Tournament ended'); break;
        case 'playbr': { const m = ev.rounds[r][i]; newMatch([m.a, m.b], { ev: ev.id, r, i }, ev.cfg); break; }
        case 'setw': { const m = ev.rounds[r][i]; m.w = d.s === 'a' ? m.a : m.b; m.sa = m.sb = null; settle(ev); api.save(); break; }
        case 'clrbr': { const m = ev.rounds[r][i]; m.w = null; m.sa = m.sb = null; settle(ev); api.save(); break; }
        case 'playrr': { const m = ev.matches[i]; newMatch([m.a, m.b], { ev: ev.id, i }, ev.cfg); break; }
        case 'setrr': { const m = ev.matches[i]; m.w = d.s === 'd' ? 'draw' : d.s === 'a' ? m.a : m.b; m.sa = m.sb = null; api.save(); break; }
        case 'clrrr': { const m = ev.matches[i]; m.w = null; m.sa = m.sb = null; api.save(); break; }
        case 'tshuf': { const all = shuf(ev.teams.flatMap(x => x.m), Math.random); ev.teams.forEach(x => x.m = []); all.forEach((p, k) => ev.teams[k % ev.teams.length].m.push(p)); api.save(); break; }
        case 'tround': startTeamRound(); window.scrollTo({ top: 0, behavior: 'smooth' }); break;
        case 'treveal': if (TQ) { TQ.revealed = true; clock = null; } break;
        case 'thit': if (TQ) TQ.hits[i] = !TQ.hits[i]; break;
        case 'tnext': if (TQ) teamNext(); break;
        case 'tquit': TQ = null; clock = null; break;
        case 'go': if (M) { M.phase = 'q'; M.qi = M.start; beginQ(); } break;
        case 'ans': answer(i); break;
        case 'reveal': if (M) { M.revealed = true; clock = null; } break;
        case 'jt': if (M) M.judge[i] = !M.judge[i]; break;
        case 'next': if (M) { if (M.cfg.style === 'judge' && !M.revealed) return; if (M.cfg.style !== 'judge' && !M.ans) return; nextQ(); } break;
        case 'sd': { const q = pick(M.cfg.src, 1, rseed())[0]; if (q) { M.qs.push(q); M.start = M.qs.length - 1; M.qi = M.start; M.who = 0; if (M.cfg.style === 'judge') { M.phase = 'q'; beginQ(); } else M.phase = 'ready'; } break; }
        case 'force': M.forced = i; saveMatch(); break;
        case 'save': saveMatch(); break;
        case 'askquit': ask = 'quit'; break;
        case 'quit': { const lv = M && M.ref.live; M = null; clock = null; if (lv) tab = 'live'; break; }
        case 'live': tab = 'live'; setup = null; L.sel = L.join = null; break;
        case 'lsel': L.sel = d.k; L.join = null; break;
        case 'lback': L.sel = null; L.join = null; break;
        case 'lbig': L.big = !L.big; break;
        case 'lpre': L.join = d.k; break;
        case 'ljoin': {
          const e = L.events[L.join]; if (!e || !L.uid) break;
          if (e.open === false) { api.toast('Entries for this sprint are closed'); break; }
          if (entry(L.uid, L.join)) { L.sel = L.join; L.join = null; break; }
          const nick = (val('tn-nick').trim() || api.S.name || 'Player').slice(0, 24); t.nick = nick; api.save();
          const c = evCfg(e); newMatch([nick], { live: L.join }, c, pick(c.src, c.n, c.seed)); L.sel = L.join; L.join = null; break;
        }
        case 'retry': if (M && M.ref.live) submitLive(); break;
        case 'toboard': { const id = M && M.ref.live; M = null; clock = null; tab = 'live'; L.sel = id || null; break; }
        case 'lnew': {
          if (!L.db || !L.admin) break; const id = 'e' + Date.now().toString(36);
          const body = { title: (val('tn-ltitle').trim() || 'Unit 1 Sprint').slice(0, 50), src: srcMap()[val('tn-lsrc')] ? val('tn-lsrc') : 'all', n: Number(val('tn-ln')) || 10, timer: TIMERS.includes(Number(val('tn-lt'))) ? Number(val('tn-lt')) : 20, seed: rseed(), open: true, created: Date.now() };
          L.db.doc('events/' + id).set(body).then(() => { api.toast('Sprint opened'); L.sel = id; rerender(); }).catch(e => { api.toast(e && e.code === 'quota_exceeded' ? 'The board is full. Delete an old sprint first.' : 'The sprint did not open. Try again.'); });
          break;
        }
        case 'ltog': { const e = L.events[d.k]; if (!e || !L.db) break; L.db.doc('events/' + d.k).update({ open: e.open === false }).catch(() => api.toast('That change did not save. Try again.')); break; }
        case 'laskdel': ask = 'del:' + d.k; break;
        case 'ldel': { if (!L.db) break; L.db.doc('events/' + d.k).delete().then(() => api.toast('Sprint deleted')).catch(() => api.toast('The sprint was not deleted. Try again.')); if (L.sel === d.k) L.sel = null; break; }
        case 'lrm': {
          const cur = L.scores[d.u]; if (!cur || !L.db) break; const body = JSON.parse(JSON.stringify(cur)); if (body.ev) delete body.ev[d.k];
          L.db.doc('scores/' + d.u).set(body).then(() => api.toast('Entry removed')).catch(() => api.toast('The entry was not removed. Try again.')); break;
        }
        default: return;
      }
      done();
    }
  });
})();
