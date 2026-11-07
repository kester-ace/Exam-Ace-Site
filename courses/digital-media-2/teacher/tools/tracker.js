/* My Assessment History (view 'tracker') · Developed by Kester Small.
   Keeps every finished, scored attempt in the student's saved course state and shows it as a history and tracker.

   WHERE ATTEMPTS COME FROM
     engine.js dispatches window 'course:result' {kind,id,title,module,unit,score,max,pct,level,secs,at,loc,est,practice}
     synchronously, BEFORE it draws the result screen, for: unit activity screens (every submit), writing tasks,
     Paper 02 tasks and paper questions, module/section tests (also as practice), Paper 01 past papers and mocks,
     escape rooms, zombie challenges, Language Lab and Caribbean quizzes, Jargon Match, and every game or simulator that
     posts {type:'dm:result', ...} to the course page. This file stores the attempt and sets detail.saved = true and
     detail.key, so the result screen can confirm "✓ Saved to your assessment history" with a "See my history" button.
     Quiz Centre (tools/quizcentre.js, not edited): its "Submit and see feedback" click is noted here and the score is read
     from the results card on the engine's 'course:render' event, which fires in the same task, before the browser paints.

   LOCAL STATE (inside the course's saved state, so it survives reloads and travels with SCORM-free copies)
     api.S.hist     [attempt]  newest first, at most 1,000
                    attempt = {id, key, kind, aid, title, module, unit, score, max, pct, level, secs, at, n, loc, est, practice, sync}
     api.S.histSum  {key: {t, k, m, u, n, b, l, at, f, loc}}  one line per assessment (attempt count, best, latest, dates),
                    kept even when old attempts fall off the 1,000 list

   SHARED DATABASE (Student's editions only, when claude.use('db') and claude.use('user') resolve and the viewer has an id)
     tracker/{uid}                          summary {v, name (the course profile name), course, updated, last, avg,
                                            counts {attempts, scored, assessments, byKind}, best {key: {t,k,m,n,b,l,at}},
                                            units {unitId: {m, n, s, avg}}}
     tracker/{uid}/attempts/{attemptId}     one document per attempt (every kind except activity screens)
     tracker/{uid}/attempts/u~{unitId}      activity-screen attempts of one unit, grouped as {type:'unit', unit, module, at,
                                            items:[attempt]} (newest 300), so a whole course stays far inside the
                                            25,000-document limit of the course database
     Every attempt is queued (sync: 0, saved with the course state) the moment it is recorded and sent shortly after;
     offline or busy it retries quietly with back-off and when the browser comes back online. Nothing blocks the page.
     Rules: the student reads and writes only tracker/{their uid}; the owner and editors read every student.

   TEACHER VIEW  shown only when user.canEdit() is true (the course owner or an editor): Class tracker = students from the
     tracker collection, a students × assessments grid of best %, filters, drill-down into one student's history, CSV.
   CSV downloads use the downloads capability; without it the buttons are hidden. */
(function () {
  'use strict';
  const CAP = 1000, PAGE = 50, UNIT_ITEMS = 300, GRID_MAX = 60;
  const TEACHER_ED = !!window.COURSE_TEACHER_EDITION;
  const COURSE = (document.title || 'Course').split(' · ')[0].trim() || 'Course';
  const LVN = { 1: 'Foundation', 2: 'Core', 3: 'Challenge' }, LVI = { 1: '🪜', 2: '⚙️', 3: '🚀' };
  const KORDER = ['test', 'paper', 'paper2', 'quiz', 'write', 'activity', 'escape', 'zombie', 'lab', 'game'];
  const KICON = { test: '🧪', paper: '📄', paper2: '📝', quiz: '❓', write: '✍️', activity: '🧩', escape: '🔐', zombie: '🧟', lab: '🔬', game: '🎮' };
  const MODS = () => window.COURSE_MODULES || [];
  const UNITW = () => (MODS().some(m => /^S\d/.test(m.id)) ? 'Section' : 'Module');
  function kindName(k, plural) {
    const n = (plural ? { test: UNITW() + ' tests', paper: 'Paper 01 papers and mocks', paper2: 'Paper 02 tasks', quiz: 'Quizzes', write: 'Writing tasks', activity: 'Activity screens', escape: 'Escape rooms', zombie: 'Zombie challenges', lab: 'Practical labs', game: 'Games and simulators' }
      : { test: UNITW() + ' test', paper: 'Paper 01 / mock', paper2: 'Paper 02', quiz: 'Quiz', write: 'Writing task', activity: 'Activity screen', escape: 'Escape room', zombie: 'Zombie challenge', lab: 'Practical lab', game: 'Game or simulator' })[k];
    return n || 'Other';
  }
  const API = () => window.COURSE_API || null;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const str = (x, n) => String(x == null ? '' : x).slice(0, n);
  const num = x => (x == null || x === '' || typeof x === 'boolean' || !isFinite(+x) ? null : +x);
  const seg = s => (String(s == null ? '' : s).replace(/[^A-Za-z0-9_\-.~:@+]/g, '_').slice(0, 150)) || 'x';
  function rid() { let s = ''; try { const a = new Uint32Array(2); crypto.getRandomValues(a); s = a[0].toString(36) + a[1].toString(36); } catch (e) { s = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2); } return 'a' + Date.now().toString(36) + s.slice(0, 8); }
  const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { } };

  /* ---------------- local store ---------------- */
  function hist() { const A = API(); if (!A) return []; if (!Array.isArray(A.S.hist)) A.S.hist = []; return A.S.hist; }
  function sums() { const A = API(); if (!A) return {}; if (!A.S.histSum || typeof A.S.histSum !== 'object' || Array.isArray(A.S.histSum)) A.S.histSum = {}; return A.S.histSum; }
  function save() { const A = API(); if (A) { try { A.save(); } catch (e) { } } }
  function lvOf(x) { if (x == null || x === '') return null; const n = +x; if ([1, 2, 3].includes(n)) return n; return str(x, 24); }
  function isoOf(x) { if (!x) return null; const d = new Date(typeof x === 'number' ? x : String(x)); return isNaN(d) ? null : d.toISOString(); }
  const LOCKEYS = ['v', 'm', 'u', 's', 'p', 'q', 'd', 'c', 'room', 'i', 'tab', 'sub', 'k', 'free', 'seed'];
  function cleanLoc(L) { if (!L || typeof L !== 'object' || !L.v) return null; const o = {}; LOCKEYS.forEach(k => { const x = L[k]; if (x != null && /^(string|number|boolean)$/.test(typeof x)) o[k] = typeof x === 'string' ? x.slice(0, 120) : x; }); return o.v === 'tracker' ? null : o; }
  function addSum(e) {
    const M = sums(), s = M[e.key] = M[e.key] || { t: e.title, k: e.kind, m: e.module, u: e.unit, n: 0, b: null, l: null, at: e.at, f: e.at, loc: e.loc };
    s.n++; if (!s.f || e.at < s.f) s.f = e.at;
    if (!s.at || e.at >= s.at) { s.at = e.at; s.t = e.title; s.l = e.pct; if (e.loc) s.loc = e.loc; if (e.module) s.m = e.module; if (e.unit) s.u = e.unit; }
    if (e.pct != null) s.b = s.b == null ? e.pct : Math.max(s.b, e.pct);
    return s;
  }
  function record(d) {
    if (!API() || !d || !d.kind) return null;
    const kind = KORDER.includes(d.kind) ? d.kind : 'game';
    const aid = str(d.id || d.title || kind, 120), key = kind + ':' + aid;
    const score = num(d.score), max = num(d.max); let pct = num(d.pct);
    if (pct == null && score != null && max > 0) pct = score / max * 100;
    if (pct != null) pct = Math.max(0, Math.min(100, Math.round(pct)));
    const e = { id: rid(), key, kind, aid, title: str(d.title || aid, 160), module: str(d.module, 16), unit: str(d.unit, 24), score, max, pct, level: lvOf(d.level), secs: num(d.secs), at: isoOf(d.at) || new Date().toISOString(), n: 1, loc: cleanLoc(d.loc), est: !!d.est, practice: !!d.practice, sync: TEACHER_ED ? 1 : 0 };
    if (e.secs != null) e.secs = Math.max(0, Math.round(e.secs));
    e.n = addSum(e).n;
    const H = hist(); H.unshift(e); if (H.length > CAP) H.length = CAP;
    save();
    d.saved = true; d.key = key; d.attempt = e.n; d.attemptId = e.id;
    if (!TEACHER_ED) { API().S.trkDirty = 1; kick(kind === 'activity' ? 2500 : 600); }
    return e;
  }
  window.addEventListener('course:result', ev => { try { record(ev && ev.detail); } catch (e) { } });

  const savedNote = key => `<p class="saved-note" role="status"><span>✓ Saved to your assessment history</span><button type="button" class="btn ghost sm" data-go="tracker" data-k="${esc(key || '')}">See my history</button></p>`;

  /* ---------------- Quiz Centre (tools/quizcentre.js is not changed) ---------------- */
  let QCP = null, QCO = null, QCL = null; /* pending submit · the open quiz and when it opened · the last saved attempt */
  const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
  function modFrom(...txt) {
    const ids = MODS().map(m => m.id);
    for (const t of txt) {
      if (!t) continue;
      let m = /\b(Module|Section)\s+(\d+|[IVX]+)\b/i.exec(t); if (m) { const n = /^\d+$/.test(m[2]) ? +m[2] : ROMAN[m[2].toUpperCase()]; const id = (/^m/i.test(m[1]) ? 'M' : 'S') + n; if (ids.includes(id)) return id; }
      m = /\bPaper\s*0?3\b/i.exec(t); if (m && ids.includes('P3')) return 'P3';
    }
    return '';
  }
  document.addEventListener('click', e => {
    const b = e.target && e.target.closest && e.target.closest('[data-pv="qc"][data-px]'); if (!b) return;
    const A = API(); if (!A) return; const L = A.S.loc || {};
    if (b.dataset.px === 'submit') QCP = { tab: String(L.tab), k: String(L.k) };
    else if (b.dataset.px === 'retry') { QCO = null; QCL = null; }
  }, true);
  window.addEventListener('course:render', ev => {
    const A = API(); if (!A) return; const v = ev && ev.detail && ev.detail.v, L = A.S.loc || {};
    if (v !== 'qc' || L.tab == null || L.k == null) { QCO = null; QCP = null; QCL = null; return; }
    const k = L.tab + '/' + L.k; if (!QCO || QCO.k !== k) { QCO = { k, t0: Date.now() }; QCL = null; }
    const stage = document.getElementById('stage'); if (!stage) return;
    const card = Array.from(stage.querySelectorAll('.card')).find(c => { const h = c.querySelector('h3'); return h && /Your results/i.test(h.textContent); });
    const note = key => { if (!card || card.querySelector('.saved-note')) return; const row = card.querySelector('.row'); if (row) row.insertAdjacentHTML('beforebegin', savedNote(key)); else card.insertAdjacentHTML('beforeend', savedNote(key)); };
    if (!QCP) { if (QCL && QCL.k === k && card) note(QCL.key); return; } /* the same result drawn again (a reward or chest re-rendered the page) */
    const P = QCP; QCP = null;
    if (P.tab !== String(L.tab) || P.k !== String(L.k) || !card) return;
    let score = null, max = null; const sc = card.querySelector('.qc-score');
    if (sc) { const m = /(\d+)\s*\/\s*(\d+)/.exec(sc.textContent); if (m) { score = +m[1]; max = +m[2]; } }
    const B = window.COURSE_QUIZBANK || [], pk = B[+L.tab], q = pk && pk.quizzes && pk.quizzes[+L.k];
    const d = { kind: 'quiz', id: 'qc:' + (pk ? pk.pkg : L.tab) + ' :: ' + (q ? q.title : L.k), title: (q ? q.title : 'Quiz') + (pk ? ' (' + pk.pkg + ')' : ''), module: modFrom(q && q.title, pk && pk.pkg), score, max, secs: Math.round((Date.now() - QCO.t0) / 1000), loc: { v: 'qc', tab: String(L.tab), k: String(L.k) } };
    QCO.t0 = Date.now();
    try { window.dispatchEvent(new CustomEvent('course:result', { detail: Object.assign(d, { at: new Date().toISOString() }) })); } catch (e) { }
    if (!d.saved) record(d);
    if (d.saved) { QCL = { k, key: d.key }; note(d.key); }
  });

  /* ---------------- capabilities (all optional) ---------------- */
  const C = { db: null, user: null, uid: null, admin: false, dl: null, state: TEACHER_ED ? 'local' : 'off', err: '', last: lsGet('course.trk.last.' + COURSE) || '', pulled: false, busy: false, timer: 0, wait: 0, sumAt: 0 };
  const hasUse = () => !!(window.claude && typeof window.claude.use === 'function');
  async function init() {
    if (!hasUse()) return;
    try { C.dl = await window.claude.use('downloads'); } catch (e) { C.dl = null; }
    if (C.dl) rerender();
    if (TEACHER_ED) return;
    try {
      const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
      if (!db || !user) return;
      let uid = null; try { uid = await user.id(); } catch (e) { uid = null; }
      C.user = user; try { C.admin = !!(await user.canEdit()); } catch (e) { C.admin = false; }
      if (!uid) { C.db = C.admin ? db : null; rerender(); return; }
      C.db = db; C.uid = uid; C.state = 'on'; rerender();
      await pull(); kick(50);
    } catch (e) { }
  }
  const BLOCK = ['invalid_argument', 'quota_exceeded', 'revoked', 'not_granted', 'capability_disabled', 'capability_removed', 'transform_error'];
  function failed(err) {
    const code = (err && err.code) || 'unavailable';
    if (BLOCK.includes(code)) { C.state = 'blocked'; C.err = code; rerender(); return; }
    C.state = 'retry'; C.err = code; C.wait = Math.min(300000, C.wait ? C.wait * 2 : 5000); kick(C.wait + Math.random() * 1500);
  }
  function kick(ms) { if (TEACHER_ED || C.state === 'blocked') return; clearTimeout(C.timer); C.timer = setTimeout(flush, ms == null ? 600 : ms); }
  window.addEventListener('online', () => { if (C.state === 'retry') { C.wait = 0; kick(400); } });
  const attemptsCol = uid => 'tracker/' + uid + '/attempts';
  function forDb(e) { const o = {}; ['id', 'key', 'kind', 'aid', 'title', 'module', 'unit', 'score', 'max', 'pct', 'level', 'secs', 'at', 'n', 'est', 'practice'].forEach(k => { o[k] = e[k] == null ? null : e[k]; }); o.loc = e.loc || null; return o; }
  function fromDb(o) { if (!o || !o.id || !o.kind) return null; return { id: str(o.id, 40), key: str(o.key || (o.kind + ':' + o.aid), 140), kind: String(o.kind), aid: str(o.aid, 120), title: str(o.title, 160), module: str(o.module, 16), unit: str(o.unit, 24), score: num(o.score), max: num(o.max), pct: num(o.pct), level: lvOf(o.level), secs: num(o.secs), at: isoOf(o.at) || '', n: num(o.n) || 1, loc: cleanLoc(o.loc), est: !!o.est, practice: !!o.practice, sync: 1 }; }
  function flattenDocs(docs) { const out = []; docs.forEach(d => { if (!d.exists) return; const x = d.data() || {}; if (x.type === 'unit' && Array.isArray(x.items)) x.items.forEach(i => { const e = fromDb(i); if (e) out.push(e); }); else { const e = fromDb(x); if (e) out.push(e); } }); out.sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0)); return out; }
  async function pull() {
    if (!C.db || !C.uid) return;
    try {
      const qs = await C.db.collection(attemptsCol(C.uid)).orderBy('at', 'desc').limit(1000).get();
      const remote = flattenDocs(qs.docs || []), H = hist(), have = new Map(H.map(e => [e.id, e]));
      const oldest = H.length >= CAP ? H[H.length - 1].at : '';
      let added = 0;
      remote.forEach(r => { const l = have.get(r.id); if (l) { l.sync = 1; return; } if (oldest && r.at < oldest) return; H.push(r); addSum(r); have.set(r.id, r); added++; });
      if (added) { H.sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0)); if (H.length > CAP) H.length = CAP; API().S.trkDirty = 1; }
      C.pulled = true; save(); if (added) rerender();
    } catch (e) { C.pulled = true; if (e && BLOCK.includes(e.code)) failed(e); }
  }
  async function flush() {
    if (!C.db || !C.uid || C.busy || C.state === 'blocked') return;
    if (!C.pulled) { kick(800); return; }
    C.busy = true;
    try {
      const H = hist(), pend = H.filter(e => !e.sync);
      for (const e of pend.filter(x => x.kind !== 'activity')) { await C.db.doc(attemptsCol(C.uid) + '/' + seg(e.id)).set(forDb(e)); e.sync = 1; save(); }
      const units = Array.from(new Set(pend.filter(x => x.kind === 'activity').map(x => x.unit || x.module || 'other')));
      for (const u of units) {
        const all = H.filter(x => x.kind === 'activity' && (x.unit || x.module || 'other') === u);
        await C.db.doc(attemptsCol(C.uid) + '/u~' + seg(u)).set({ type: 'unit', unit: u, module: (all[0] && all[0].module) || '', at: (all[0] && all[0].at) || new Date().toISOString(), items: all.slice(0, UNIT_ITEMS).map(forDb) });
        all.forEach(x => { x.sync = 1; }); save();
      }
      /* the summary (up to ~100 KB) is rewritten at once after a test, paper, quiz or game, and at most once a minute
         while the student works through activity screens */
      const A = API(), since = Date.now() - C.sumAt;
      let later = 0;
      if (A && A.S.trkDirty) { if (pend.some(x => x.kind !== 'activity') || since > 60000) { await C.db.doc('tracker/' + C.uid).set(summary()); A.S.trkDirty = 0; C.sumAt = Date.now(); save(); } else later = 60000 - since; }
      C.state = 'on'; C.err = ''; C.wait = 0; if (pend.length) { C.last = new Date().toISOString(); lsSet('course.trk.last.' + COURSE, C.last); }
      C.busy = false;
      if (hist().some(e => !e.sync)) kick(1200); else { if (later) kick(later + 500); rerender('sync'); }
    } catch (err) { C.busy = false; failed(err); }
  }
  function summary() {
    const A = API(), M = sums(), best = {}, units = {}, byKind = {};
    let attempts = 0, scored = 0, sum = 0, last = '';
    Object.keys(M).forEach(k => {
      const s = M[k]; attempts += s.n || 0; byKind[s.k] = (byKind[s.k] || 0) + (s.n || 0); if (s.at > last) last = s.at;
      if (s.k === 'activity') { const u = s.u || s.m || 'other', U = units[u] = units[u] || { m: s.m || '', n: 0, s: 0, t: 0 }; U.n += s.n || 0; if (s.b != null) { U.s++; U.t += s.b; } }
      else if (Object.keys(best).length < 800) best[k] = { t: str(s.t, 120), k: s.k, m: s.m || '', n: s.n || 0, b: s.b, l: s.l, at: s.at || '' };
    });
    hist().forEach(e => { if (e.pct != null) { scored++; sum += e.pct; } });
    Object.keys(units).forEach(u => { const U = units[u]; U.avg = U.s ? Math.round(U.t / U.s) : null; delete U.t; });
    return { v: 1, name: str(A && A.S.name, 60), course: COURSE, updated: new Date().toISOString(), last, avg: scored ? Math.round(sum / scored) : null, counts: { attempts, scored, assessments: Object.keys(best).length, byKind }, best, units };
  }
  let RR = 0;
  function rerender(why) {
    const A = API(); if (!A || !A.S || !A.S.loc) return;
    if (A.S.loc.v !== 'tracker' && A.S.loc.v !== 'profile') return;
    if (why === 'sync') { const el = document.getElementById('trk-sync'); if (el) el.outerHTML = syncHTML(); return; }
    const ae = document.activeElement; if (ae && ae.closest && ae.closest('#stage') && /^(INPUT|SELECT|TEXTAREA)$/.test(ae.tagName)) return;
    cancelAnimationFrame(RR); RR = requestAnimationFrame(() => { try { A.render(); } catch (e) { } });
  }

  /* ---------------- formatting ---------------- */
  const pad = n => String(n).padStart(2, '0');
  function fmtWhen(iso) { const d = new Date(iso); if (isNaN(d)) return ''; return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' · ' + pad(d.getHours()) + ':' + pad(d.getMinutes()); }
  function whenHTML(iso) { const d = new Date(iso); if (isNaN(d)) return ''; return `<span><span class="nw">${esc(d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }))}</span> <span class="nw trk-meta-i">${pad(d.getHours())}:${pad(d.getMinutes())}</span></span>`; }
  function fmtDay(iso) { const d = new Date(iso); return isNaN(d) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); }
  function fmtSecs(s) { if (s == null) return '—'; s = Math.round(s); if (s < 60) return s + ' s'; const m = Math.floor(s / 60); if (m < 60) return m + ' min ' + pad(s % 60) + ' s'; return Math.floor(m / 60) + ' h ' + pad(m % 60) + ' min'; }
  function lvHTML(l) { if (l == null || l === '') return '—'; if (LVN[l]) return `<span class="trk-lv" title="${LVN[l]} level">${LVI[l]} ${LVN[l]}</span>`; return esc(l); }
  const lvText = l => (l == null || l === '' ? '' : LVN[l] || String(l));
  const pctCls = p => (p == null ? '' : p >= 70 ? 'hi' : p >= 50 ? 'mid' : 'lo');
  function scoreHTML(e) { if (e.score == null || e.max == null) return e.pct == null ? '<span class="hint">submitted</span>' : '—'; return `${e.score} / ${e.max}${e.est ? ' <span class="hint" title="Estimated from the checklist and rubric">est.</span>' : ''}`; }
  function pctHTML(p) { return p == null ? '—' : `<span class="trk-pct ${pctCls(p)}">${p}%</span>`; }
  function modName(id) { const m = MODS().find(x => x.id === id); return m ? m.code : id || ''; }
  function spark(vals) {
    const v = vals.filter(x => x != null); if (v.length < 2) return '';
    const W = 110, H = 30, n = v.length, pts = v.map((p, i) => [Math.round(i / (n - 1) * (W - 6) + 3), Math.round(H - 3 - p / 100 * (H - 6))]);
    return `<svg class="trk-spark" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Trend over ${n} attempts: ${v.join('%, ')}%"><polyline points="${pts.map(p => p.join(',')).join(' ')}"/>${pts.map((p, i) => i === n - 1 ? `<circle cx="${p[0]}" cy="${p[1]}" r="2.6"/>` : '').join('')}</svg>`;
  }
  const LOCATTR = { m: 'm', u: 'u', s: 's', p: 'p', q: 'q', d: 'd', c: 'c', room: 'room', i: 'i', tab: 'tab', sub: 'sub', k: 'k', seed: 'seed' };
  function retakeBtn(loc, label) {
    if (!loc || !loc.v) return '';
    let a = `data-go="${esc(loc.v)}"`; Object.keys(LOCATTR).forEach(k => { if (loc[k] != null && loc[k] !== '') a += ` data-${LOCATTR[k]}="${esc(loc[k])}"`; }); if (loc.free) a += ' data-free="1"';
    return `<button type="button" class="btn ghost sm trk-retake" ${a}>${label || '↻ Retake'}</button>`;
  }

  /* ---------------- filters ---------------- */
  const F = { kind: '', mod: '', from: '', to: '', q: '', key: '', limit: PAGE, lastK: null };
  const CF = { kind: '', mod: '', q: '', uid: '', limit: PAGE };
  function applyF(list, f) {
    const q = (f.q || '').trim().toLowerCase(), from = f.from ? new Date(f.from + 'T00:00:00').toISOString() : '', to = f.to ? new Date(f.to + 'T23:59:59.999').toISOString() : '';
    return list.filter(e => (!f.key || e.key === f.key) && (!f.kind || e.kind === f.kind) && (!f.mod || (f.mod === '-' ? !e.module : e.module === f.mod)) && (!from || e.at >= from) && (!to || e.at <= to) && (!q || (e.title + ' ' + kindName(e.kind) + ' ' + modName(e.module)).toLowerCase().includes(q)));
  }
  function optsKinds(list, cur, extra) { const ks = KORDER.filter(k => list.some(e => e.kind === k)); return `<option value="">All types</option>${ks.map(k => `<option value="${k}" ${cur === k ? 'selected' : ''}>${KICON[k]} ${esc(kindName(k, true))}</option>`).join('')}${extra || ''}`; }
  function optsMods(cur, other) { return `<option value="">All ${UNITW().toLowerCase()}s</option>${MODS().map(m => `<option value="${esc(m.id)}" ${cur === m.id ? 'selected' : ''}>${esc(m.code)}: ${esc(m.title)}</option>`).join('')}${other ? `<option value="-" ${cur === '-' ? 'selected' : ''}>Other (games, quizzes without a ${UNITW().toLowerCase()})</option>` : ''}`; }
  function filterBar(list) {
    return `<div class="trk-filters" role="search" aria-label="Filter your history">
      <div class="field"><label for="trk-kind">Type</label><select id="trk-kind" class="select" data-tf="kind">${optsKinds(list, F.kind)}</select></div>
      <div class="field"><label for="trk-mod">${UNITW()}</label><select id="trk-mod" class="select" data-tf="mod">${optsMods(F.mod, true)}</select></div>
      <div class="field"><label for="trk-from">From</label><input id="trk-from" class="input" type="date" data-tf="from" value="${esc(F.from)}"></div>
      <div class="field"><label for="trk-to">To</label><input id="trk-to" class="input" type="date" data-tf="to" value="${esc(F.to)}"></div>
      <div class="field trk-q"><label for="trk-q">Search</label><input id="trk-q" class="input" type="search" data-tf="q" value="${esc(F.q)}" placeholder="Title, type or ${UNITW().toLowerCase()}" autocomplete="off"></div>
    </div>`;
  }

  /* ---------------- student views ---------------- */
  function groupByKey(list) {
    const G = new Map();
    list.forEach(e => { let g = G.get(e.key); if (!g) { g = { key: e.key, kind: e.kind, title: e.title, module: e.module, items: [] }; G.set(e.key, g); } g.items.push(e); });
    return Array.from(G.values()).map(g => {
      const M = sums()[g.key] || {}, sc = g.items.filter(e => e.pct != null).map(e => e.pct);
      const latest = g.items[0];
      return Object.assign(g, { n: Math.max(M.n || 0, g.items.length), best: M.b != null ? M.b : sc.length ? Math.max(...sc) : null, latest: latest.pct, avg: sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : null, at: latest.at, loc: latest.loc || M.loc, trend: g.items.slice(0, 12).map(e => e.pct).reverse() });
    }).sort((a, b) => (a.at < b.at ? 1 : -1));
  }
  function statsHTML(list) {
    const sc = list.filter(e => e.pct != null), wk = Date.now() - 7 * 864e5;
    const avg = sc.length ? Math.round(sc.reduce((a, e) => a + e.pct, 0) / sc.length) : null;
    const keys = new Set(list.map(e => e.key)).size, week = list.filter(e => new Date(e.at).getTime() >= wk).length;
    return `<div class="trk-stats">${[[list.length, 'attempts'], [keys, 'assessments'], [avg == null ? '—' : avg + '%', 'average score'], [week, 'this week']].map(x => `<div class="trk-stat"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>`;
  }
  function rowsHTML(list, opt) {
    opt = opt || {};
    if (!list.length) return `<p class="trk-empty">${opt.empty || 'No attempts match these filters.'}</p>`;
    const shown = list.slice(0, opt.limit || PAGE);
    let h = `<div class="trk-wrap"><table class="trk-tbl"><caption class="sr-only">${esc(opt.caption || 'Attempts, newest first')}</caption><thead><tr><th scope="col">Date</th><th scope="col">Assessment</th><th scope="col">Score</th><th scope="col">%</th><th scope="col">Level</th><th scope="col">Time taken</th><th scope="col">Attempt</th>${opt.noRetake ? '' : '<th scope="col"><span class="sr-only">Retake</span></th>'}</tr></thead><tbody>`;
    h += shown.map(e => `<tr><td data-l="Date">${whenHTML(e.at)}</td><td data-l="Assessment" class="trk-t"><b>${esc(e.title)}</b><span class="trk-meta">${KICON[e.kind] || '•'} ${esc(kindName(e.kind))}${e.module ? ' · ' + esc(modName(e.module)) : ''}${e.practice ? ' · practice' : ''}</span></td><td data-l="Score">${scoreHTML(e)}</td><td data-l="%">${pctHTML(e.pct)}</td><td data-l="Level">${lvHTML(e.level)}</td><td data-l="Time taken" class="nw">${fmtSecs(e.secs)}</td><td data-l="Attempt">#${e.n || 1}</td>${opt.noRetake ? '' : `<td class="trk-act">${retakeBtn(e.loc)}</td>`}</tr>`).join('');
    h += `</tbody></table></div>`;
    if (list.length > shown.length) h += `<div class="row"><button type="button" class="btn ghost" data-px="${opt.moreAct || 'more'}" data-pv="tracker">Show ${Math.min(PAGE, list.length - shown.length)} more (${list.length - shown.length} hidden)</button></div>`;
    return h;
  }
  function sumHTML(groups, opt) {
    opt = opt || {};
    if (!groups.length) return `<p class="trk-empty">Nothing to summarise yet.</p>`;
    return `<div class="trk-wrap"><table class="trk-tbl trk-sum"><caption class="sr-only">One row per assessment</caption><thead><tr><th scope="col">Assessment</th><th scope="col">Attempts</th><th scope="col">Best</th><th scope="col">Latest</th><th scope="col">Average</th><th scope="col">Trend</th><th scope="col">Last attempt</th>${opt.noRetake ? '' : '<th scope="col"><span class="sr-only">Retake</span></th>'}</tr></thead><tbody>${groups.slice(0, opt.limit || 200).map(g => `<tr class="${F.key === g.key && !opt.noRetake ? 'trk-focus' : ''}"><td data-l="Assessment" class="trk-t"><b>${esc(g.title)}</b><span class="trk-meta">${KICON[g.kind] || '•'} ${esc(kindName(g.kind))}${g.module ? ' · ' + esc(modName(g.module)) : ''}</span></td><td data-l="Attempts">${g.n}</td><td data-l="Best">${pctHTML(g.best)}</td><td data-l="Latest">${pctHTML(g.latest)}</td><td data-l="Average">${pctHTML(g.avg)}</td><td data-l="Trend">${spark(g.trend) || '<span class="hint">—</span>'}</td><td data-l="Last attempt">${whenHTML(g.at)}</td>${opt.noRetake ? '' : `<td class="trk-act">${retakeBtn(g.loc)}${F.key === g.key ? '' : `<button type="button" class="btn ghost sm" data-go="tracker" data-k="${esc(g.key)}">Attempts</button>`}</td>`}</tr>`).join('')}</tbody></table></div>`;
  }
  function weekStart(t) { const d = new Date(t); d.setHours(0, 0, 0, 0); const wd = (d.getDay() + 6) % 7; d.setDate(d.getDate() - wd); return d; }
  function weeksHTML(list) {
    if (!list.length) return `<p class="trk-empty">Your weekly progress appears here after your first attempt.</p>`;
    const W = new Map();
    list.forEach(e => { const k = weekStart(e.at).getTime(); const w = W.get(k) || { k, n: 0, s: 0, c: 0 }; w.n++; if (e.pct != null) { w.s += e.pct; w.c++; } W.set(k, w); });
    const first = Math.min(...W.keys()), lastW = weekStart(Date.now()).getTime(), weeks = [];
    for (let t = Math.max(first, lastW - 11 * 7 * 864e5); t <= lastW; t = weekStart(t + 8 * 864e5).getTime()) weeks.push(W.get(t) || { k: t, n: 0, s: 0, c: 0 });
    const maxN = Math.max(1, ...weeks.map(w => w.n)), VW = 640, VH = 230, L0 = 46, B0 = 196, bw = (VW - L0 - 10) / weeks.length;
    let svg = `<svg class="trk-chart" viewBox="0 0 ${VW} ${VH}" role="img" aria-labelledby="trk-ch-t"><title id="trk-ch-t">Average score and number of attempts per week, last ${weeks.length} weeks</title>`;
    [0, 50, 70, 100].forEach(p => { const y = B0 - p / 100 * 170; svg += `<line class="${p === 70 ? 'g70' : 'grid'}" x1="${L0}" x2="${VW - 6}" y1="${y}" y2="${y}"/><text class="ax" x="${L0 - 6}" y="${y + 4}" text-anchor="end">${p}%</text>`; });
    const pts = [];
    weeks.forEach((w, i) => {
      const x = L0 + i * bw, cx = x + bw / 2, bh = w.n / maxN * 60;
      if (w.n) svg += `<rect class="cnt" x="${(x + bw * 0.18).toFixed(1)}" y="${(B0 - bh).toFixed(1)}" width="${(bw * 0.64).toFixed(1)}" height="${bh.toFixed(1)}" rx="3"><title>${w.n} attempt${w.n > 1 ? 's' : ''}</title></rect><text class="n" x="${cx.toFixed(1)}" y="${(B0 - bh - 4).toFixed(1)}" text-anchor="middle">${w.n}</text>`;
      if (w.c) pts.push([cx, B0 - (w.s / w.c) / 100 * 170, Math.round(w.s / w.c)]);
      if (weeks.length <= 8 || i % 2 === (weeks.length - 1) % 2) svg += `<text class="ax" x="${cx.toFixed(1)}" y="${VH - 14}" text-anchor="middle">${esc(fmtDay(w.k))}</text>`;
    });
    if (pts.length > 1) svg += `<polyline class="avg" points="${pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}"/>`;
    pts.forEach(p => { svg += `<circle class="avgd" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4.5"><title>Average ${p[2]}%</title></circle>`; });
    svg += `</svg>`;
    const tbl = `<details class="fold"><summary>Show the numbers</summary><div class="trk-wrap"><table class="trk-tbl trk-mini"><thead><tr><th scope="col">Week of</th><th scope="col">Attempts</th><th scope="col">Average</th></tr></thead><tbody>${weeks.slice().reverse().map(w => `<tr><td data-l="Week of">${esc(fmtDay(w.k))}</td><td data-l="Attempts">${w.n}</td><td data-l="Average">${w.c ? Math.round(w.s / w.c) + '%' : '—'}</td></tr>`).join('')}</tbody></table></div></details>`;
    return `<div class="trk-legend"><span><i class="lg-cnt"></i>Attempts that week</span><span><i class="lg-avg"></i>Average score</span><span><i class="lg-70"></i>70% (pass mark)</span></div>${svg}${tbl}`;
  }
  function syncHTML() {
    if (TEACHER_ED) return `<p id="trk-sync" class="trk-sync">💾 Kept on this device (Teacher's Version: your own practice).</p>`;
    const H = hist(), pend = H.filter(e => !e.sync).length;
    if (C.state === 'on' && C.uid) return `<p id="trk-sync" class="trk-sync ok">☁️ ${pend ? `Sending ${pend} result${pend > 1 ? 's' : ''} to your teacher…` : 'Shared with your teacher' + (C.last ? ' · last sent ' + esc(fmtWhen(C.last)) : '')}</p>`;
    if (C.state === 'retry') return `<p id="trk-sync" class="trk-sync">⏳ ${pend} result${pend === 1 ? '' : 's'} waiting to send. They go automatically when the connection is back. <button type="button" class="linkbtn" data-px="sync" data-pv="tracker">Try now</button></p>`;
    if (C.state === 'blocked') return `<p id="trk-sync" class="trk-sync">💾 Saved on this device. ${C.err === 'quota_exceeded' ? 'The class record is full; tell your teacher.' : 'This view cannot send results to your teacher.'}</p>`;
    return `<p id="trk-sync" class="trk-sync">💾 Saved on this device${pend ? ` · ${pend} result${pend > 1 ? 's' : ''} will be sent when you open the online course` : ''}.</p>`;
  }
  function tabsHTML(tab) {
    const T = [['all', '📋 All attempts'], ['sum', '📊 By assessment'], ['week', '📈 Progress by week']];
    if (C.admin && C.db) T.push(['class', '👩🏽‍🏫 Class tracker']);
    return `<div class="tabs trk-tabs" role="tablist" aria-label="History views">${T.map(t => `<button type="button" role="tab" class="chip ${tab === t[0] ? 'sel' : ''}" aria-selected="${tab === t[0]}" data-go="tracker" data-tab="${t[0]}">${t[1]}</button>`).join('')}</div>`;
  }
  function bodyHTML(tab) {
    const all = hist(), list = applyF(all, F);
    if (tab === 'sum') return sumHTML(groupByKey(list));
    if (tab === 'week') return weeksHTML(list);
    let h = '';
    if (F.key) {
      const g = groupByKey(all.filter(e => e.key === F.key))[0], M = sums()[F.key];
      if (g || M) {
        const kind = g ? g.kind : M.k, title = g ? g.title : M.t;
        h += `<div class="trk-focusbox"><div><span class="trk-meta">${KICON[kind] || '•'} ${esc(kindName(kind))}</span><h3>${esc(title)}</h3><p class="trk-line">${[['Attempts', g ? g.n : M.n], ['Best', pctHTML(g ? g.best : M.b)], ['Latest', pctHTML(g ? g.latest : M.l)], ['Average', pctHTML(g ? g.avg : null)]].map(x => `<span><span class="hint">${x[0]}</span> <b>${x[1]}</b></span>`).join('')}${g ? spark(g.trend) : ''}</p></div><div class="row">${retakeBtn((g && g.loc) || (M && M.loc))}<button type="button" class="btn ghost sm" data-px="unfocus" data-pv="tracker">Show every assessment</button></div></div>`;
      }
    }
    return h + rowsHTML(list, { limit: F.limit, empty: all.length ? 'No attempts match these filters.' : 'Nothing yet. Finish an activity, quiz or test and it is saved here straight away.' });
  }
  function studentHTML(api, loc, tab) {
    const all = hist();
    let h = `<section class="hero"><span class="eyebrow">Your record</span><h1>My Assessment History</h1><p>Every activity, quiz, test, paper and game you finish is saved here the moment you submit it: your score, the level you worked at, how long it took and which attempt it was. Filter it, watch your trend, and retake anything with one tap.</p></section>`;
    h += `<div class="card">${statsHTML(all)}${syncHTML()}</div>`;
    h += `<div class="card">${tabsHTML(tab)}${filterBar(all)}<div class="row trk-tools"><button type="button" class="btn ghost sm" data-px="clear" data-pv="tracker">Clear filters</button>${C.dl ? `<button type="button" class="btn ghost sm" data-px="csv" data-pv="tracker">⬇ Download CSV</button>` : ''}<span class="hint" id="trk-count" aria-live="polite">${countText()}</span></div><div id="trk-body">${bodyHTML(tab)}</div></div>`;
    if (TEACHER_ED && api.S.teacher) h += `<div class="card"><h3>👩🏽‍🏫 Class tracker</h3><p class="hint">Your students' results are collected in the Student's Version. Open the Student's Version from its link as the course owner and the Class tracker tab appears here, with every student's history and a students × assessments grid.</p></div>`;
    return h;
  }
  function countText() { const all = hist(), n = applyF(all, F).length; return n === all.length ? `${all.length} attempt${all.length === 1 ? '' : 's'}` : `${n} of ${all.length} attempts`; }

  /* ---------------- class tracker (owner / editors) ---------------- */
  const CL = { sub: null, docs: [], loaded: false, err: '', names: {}, asked: new Set(), drill: null };
  function classStart() {
    if (CL.sub || CL.err || !C.db || !C.admin) return;
    try {
      CL.sub = C.db.collection('tracker').onSnapshot(qs => { CL.docs = (qs.docs || []).filter(d => d.exists).map(d => Object.assign({ uid: d.id }, d.data() || {})); CL.loaded = true; CL.err = ''; names(); rerender(); },
        err => { CL.err = (err && err.code) || 'unavailable'; CL.sub = null; rerender(); });
    } catch (e) { CL.err = 'unavailable'; CL.sub = null; }
  }
  function names() {
    if (!C.user) return; const ids = CL.docs.map(d => d.uid).filter(id => !CL.asked.has(id)); if (!ids.length) return;
    ids.forEach(id => CL.asked.add(id));
    C.user.profiles(ids).then(ps => { ids.forEach(id => { CL.names[id] = (ps && ps[id] && ps[id].name) || ''; }); rerender(); }).catch(() => { });
  }
  const who = d => CL.names[d.uid] || d.name || 'Student';
  function stuName(d) { const p = CL.names[d.uid], c = d.name; return `<b>${esc(p || c || 'Student')}</b>${p && c && p.toLowerCase() !== c.toLowerCase() ? ` <span class="hint">(${esc(c)} in the course)</span>` : ''}${d.uid === C.uid ? ' <span class="hint">(you)</span>' : ''}`; }
  function gridCols(docs) {
    const cols = new Map();
    if (CF.kind === 'activity') docs.forEach(d => Object.keys(d.units || {}).forEach(u => { const U = d.units[u]; if (CF.mod && (U.m || '') !== CF.mod) return; if (!cols.has(u)) cols.set(u, { key: u, t: u + ' activities', k: 'activity', m: U.m || '' }); }));
    else docs.forEach(d => Object.keys(d.best || {}).forEach(k => { const b = d.best[k]; if (CF.kind && b.k !== CF.kind) return; if (CF.mod && (CF.mod === '-' ? b.m : b.m !== CF.mod)) return; if (!cols.has(k)) cols.set(k, { key: k, t: b.t, k: b.k, m: b.m || '' }); }));
    const q = CF.q.trim().toLowerCase(), mi = id => { const i = MODS().findIndex(m => m.id === id); return i < 0 ? 99 : i; };
    return Array.from(cols.values()).filter(c => !q || docs.some(d => who(d).toLowerCase().includes(q)) || c.t.toLowerCase().includes(q)).sort((a, b) => mi(a.m) - mi(b.m) || KORDER.indexOf(a.k) - KORDER.indexOf(b.k) || String(a.t).localeCompare(String(b.t), undefined, { numeric: true }));
  }
  function cell(d, c) {
    if (c.k === 'activity' && CF.kind === 'activity') { const U = (d.units || {})[c.key]; return U ? { p: U.avg, n: U.n, x: U.s + ' screens' } : null; }
    const b = (d.best || {})[c.key]; return b ? { p: b.b, n: b.n, x: 'latest ' + (b.l == null ? '—' : b.l + '%') } : null;
  }
  function classDocs() { const q = CF.q.trim().toLowerCase(); return CL.docs.filter(d => !q || who(d).toLowerCase().includes(q) || Object.values(d.best || {}).some(b => String(b.t).toLowerCase().includes(q))).sort((a, b) => who(a).localeCompare(who(b))); }
  function classHTML() {
    classStart();
    if (CF.uid) return drillHTML();
    let h = `<div class="trk-filters c3"><div class="field"><label for="trk-ckind">Type</label><select id="trk-ckind" class="select" data-cf="kind"><option value="">All assessments</option>${KORDER.filter(k => k !== 'activity').map(k => `<option value="${k}" ${CF.kind === k ? 'selected' : ''}>${KICON[k]} ${esc(kindName(k, true))}</option>`).join('')}<option value="activity" ${CF.kind === 'activity' ? 'selected' : ''}>${KICON.activity} Activity screens (average per unit)</option></select></div>
      <div class="field"><label for="trk-cmod">${UNITW()}</label><select id="trk-cmod" class="select" data-cf="mod">${optsMods(CF.mod, true)}</select></div>
      <div class="field trk-q"><label for="trk-cq">Search</label><input id="trk-cq" class="input" type="search" data-cf="q" value="${esc(CF.q)}" placeholder="Student or assessment" autocomplete="off"></div></div>`;
    h += `<div class="row trk-tools"><button type="button" class="btn ghost sm" data-px="crefresh" data-pv="tracker">↻ Refresh</button>${C.dl ? `<button type="button" class="btn ghost sm" data-px="csvclass" data-pv="tracker">⬇ Class CSV</button>` : ''}</div><div id="trk-cbody">${classBody()}</div>`;
    return h;
  }
  function classBody() {
    if (CL.err) return `<p class="fb bad">The class record could not be read right now (${esc(CL.err)}). <button type="button" class="linkbtn" data-px="crefresh" data-pv="tracker">Try again</button></p>`;
    if (!CL.loaded) return `<p class="trk-empty">Loading the class record…</p>`;
    if (!CL.docs.length) return `<p class="trk-empty">No student results yet. They appear here as soon as students submit work in the online Student's Version.</p>`;
    const docs = classDocs(), cols = gridCols(docs), show = cols.slice(0, GRID_MAX);
    let h = `<p class="hint">${docs.length} student${docs.length === 1 ? '' : 's'} · ${cols.length} assessment${cols.length === 1 ? '' : 's'}${cols.length > show.length ? ` (first ${show.length} shown; narrow the filters to see the rest)` : ''}. Cells show the best %; tap a student for their full history.</p>`;
    h += `<div class="trk-wrap trk-gridwrap" tabindex="0" aria-label="Class grid, scrolls sideways"><table class="trk-grid"><thead><tr><th scope="col" class="stk">Student</th><th scope="col">Attempts</th><th scope="col">Average</th><th scope="col">Last active</th>${show.map(c => `<th scope="col" title="${esc(c.t)}"><span class="trk-ch">${KICON[c.k] || ''} ${esc(c.t)}</span></th>`).join('')}</tr></thead><tbody>`;
    h += docs.map(d => `<tr><th scope="row" class="stk"><button type="button" class="linkbtn" data-px="stu" data-pv="tracker" data-uid="${esc(d.uid)}">${stuName(d)}</button></th><td>${(d.counts && d.counts.attempts) || 0}</td><td>${pctHTML(d.avg)}</td><td>${esc(d.last ? fmtDay(d.last) : '—')}</td>${show.map(c => { const x = cell(d, c); return x ? `<td class="gc ${pctCls(x.p)}" title="${esc(c.t)}: ${x.p == null ? 'submitted' : 'best ' + x.p + '%'} · ${x.n} attempt${x.n === 1 ? '' : 's'} · ${esc(x.x)}">${x.p == null ? '✓' : x.p + '%'}</td>` : `<td class="gc none" title="Not attempted">·</td>`; }).join('')}</tr>`).join('');
    return h + `</tbody></table></div>`;
  }
  async function drillLoad(uid) {
    CL.drill = { uid, items: null, err: '' }; rerender();
    try { const qs = await C.db.collection(attemptsCol(uid)).orderBy('at', 'desc').limit(1000).get(); if (CL.drill && CL.drill.uid === uid) { CL.drill.items = flattenDocs(qs.docs || []); rerender(); } }
    catch (e) { if (CL.drill && CL.drill.uid === uid) { CL.drill.err = (e && e.code) || 'unavailable'; rerender(); } }
  }
  function drillHTML() {
    const d = CL.docs.find(x => x.uid === CF.uid) || { uid: CF.uid };
    if (!CL.drill || CL.drill.uid !== CF.uid) drillLoad(CF.uid);
    const D = CL.drill || {};
    let h = `<div class="row trk-tools"><button type="button" class="btn ghost sm" data-px="cback" data-pv="tracker">← All students</button>${C.dl && D.items ? `<button type="button" class="btn ghost sm" data-px="csvstu" data-pv="tracker">⬇ This student's CSV</button>` : ''}</div><h3>${stuName(d)}</h3>`;
    if (D.err) return h + `<p class="fb bad">This history could not be loaded (${esc(D.err)}).</p>`;
    if (!D.items) return h + `<p class="trk-empty">Loading…</p>`;
    const list = applyF(D.items, { kind: CF.kind, mod: CF.mod, q: '' });
    h += statsHTML(D.items);
    h += `<h4>By assessment</h4>${sumHTML(groupByKey(list), { noRetake: true })}<h4>Every attempt</h4>${rowsHTML(list, { noRetake: true, limit: CF.limit, moreAct: 'cmore', caption: 'This student’s attempts, newest first' })}`;
    return h;
  }

  /* ---------------- CSV ---------------- */
  function csvCell(x) { let s = x == null ? '' : String(x); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
  const csv = rows => '﻿' + rows.map(r => r.map(csvCell).join(',')).join('\r\n') + '\r\n';
  function attemptsCSV(list) {
    const rows = [['Date', 'Time', 'Type', 'Assessment', UNITW(), 'Unit', 'Score', 'Out of', 'Percent', 'Level', 'Time taken (seconds)', 'Attempt', 'Estimated', 'Practice']];
    list.forEach(e => { const d = new Date(e.at); rows.push([isNaN(d) ? '' : d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()), isNaN(d) ? '' : pad(d.getHours()) + ':' + pad(d.getMinutes()), kindName(e.kind), e.title, modName(e.module), e.unit, e.score, e.max, e.pct, lvText(e.level), e.secs, e.n, e.est ? 'yes' : '', e.practice ? 'yes' : '']); });
    return csv(rows);
  }
  const fname = s => (COURSE + ' ' + s).replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120) + '.csv';
  async function offer(filename, data) {
    const A = API(); if (!C.dl) return;
    try { await C.dl.save({ filename, data }); A && A.toast('CSV ready: ' + filename); }
    catch (e) { const c = e && e.code; if (c === 'declined') return; if (c === 'rate_limited') { A && A.toast('A download is already waiting for you. Try again in a moment.'); return; } if (c === 'unavailable' || c === 'not_granted' || c === 'capability_disabled' || c === 'capability_removed') { C.dl = null; rerender(); } A && A.toast('The download did not start (' + (c || 'error') + ').'); }
  }

  /* ---------------- profile card ---------------- */
  (window.COURSE_PROFILE_CARDS = window.COURSE_PROFILE_CARDS || []).push(api => {
    const H = hist().slice(0, 5);
    return `<div class="card trk-recent"><div class="row" style="justify-content:space-between;gap:10px"><h3>📈 Recent results</h3><button type="button" class="btn ghost sm" data-go="tracker">See my history</button></div>${H.length ? `<ul class="trk-rlist">${H.map(e => `<li><span class="trk-t"><b>${esc(e.title)}</b><span class="trk-meta">${KICON[e.kind] || '•'} ${esc(kindName(e.kind))} · ${esc(fmtWhen(e.at))}${e.n > 1 ? ' · attempt ' + e.n : ''}</span></span>${pctHTML(e.pct)}</li>`).join('')}</ul>` : `<p class="hint">Finish any activity, quiz or test and your result is saved here straight away.</p>`}</div>`;
  });

  /* ---------------- plugin ---------------- */
  const CSS = `
.sr-only{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.saved-note{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center;justify-content:space-between;margin:10px 0;padding:8px 12px;border-radius:12px;background:var(--soft-ok);border:1px solid var(--line);font-weight:700;font-size:.92rem}
.saved-note .btn{white-space:nowrap}
.trk-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.trk-stat{background:var(--raise);border:1px solid var(--line);border-radius:14px;padding:10px 12px;min-width:0}
.trk-stat b{display:block;font-family:var(--f-display);font-size:1.6rem;line-height:1.1;color:var(--gold);font-variant-numeric:tabular-nums}
.trk-stat span{font-size:.85rem;color:var(--muted)}
.trk-sync{margin:12px 0 0;font-size:.9rem;color:var(--muted)}.trk-sync.ok{color:inherit}
.trk-tabs{margin-bottom:12px}
.trk-filters{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:4px 0 10px}
.trk-filters.c3{grid-template-columns:repeat(3,minmax(0,1fr))}
.trk-filters .field{min-width:0}.trk-filters .select,.trk-filters .input{width:100%;min-width:0;box-sizing:border-box}
.trk-filters .input{font:inherit;border:2px solid var(--line);border-radius:12px;padding:9px 11px;background:var(--raise);color:var(--ink)}
.trk-tools{gap:8px;align-items:center;margin:0 0 10px}
.trk-wrap{max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}
.trk-tbl{width:100%;min-width:0;border-collapse:collapse;font-size:.93rem}
.trk-tbl th{text-align:left;font-size:.82rem;white-space:nowrap}
.trk-tbl td,.trk-tbl th{padding:8px 9px;border-bottom:1px solid var(--line);vertical-align:middle}
.trk-tbl td{line-height:1.4;font-variant-numeric:tabular-nums}
.trk-t b{display:block;font-weight:700;overflow-wrap:anywhere}
.trk-meta{display:block;font-size:.8rem;color:var(--muted)}
.nw{white-space:nowrap}.trk-meta-i{color:var(--muted);font-size:.85em}
.trk-act{white-space:nowrap;text-align:right}.trk-act .btn{margin:2px 0 2px 4px}
.trk-pct{display:inline-block;min-width:44px;text-align:center;padding:2px 7px;border-radius:99px;font-weight:800;font-size:.86rem;border:1px solid var(--line)}
.trk-pct.hi{background:var(--soft-ok)}.trk-pct.mid{background:var(--soft-gold)}.trk-pct.lo{background:var(--soft-bad)}
.trk-lv{white-space:nowrap}
.trk-spark{display:block;overflow:visible}.trk-spark polyline{fill:none;stroke:var(--gold);stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round}.trk-spark circle{fill:var(--gold)}
.trk-focus td{background:var(--soft-gold)}
.trk-empty{padding:18px;text-align:center;color:var(--muted);border:1.5px dashed var(--line);border-radius:14px;margin:6px 0}
.trk-focusbox{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;border:2px solid var(--gold);border-radius:14px;padding:12px 14px;margin:0 0 12px;background:var(--raise)}
.trk-focusbox h3{margin:2px 0 6px}.trk-focusbox>div{min-width:0}
.trk-line{display:flex;flex-wrap:wrap;gap:6px 16px;align-items:center;margin:0}
.trk-chart{width:100%;height:auto;display:block;margin:6px 0 4px}
.trk-chart .grid{stroke:var(--line);stroke-width:1}.trk-chart .g70{stroke:var(--ok);stroke-width:1.5;stroke-dasharray:5 4}
.trk-chart .ax{fill:var(--muted);font:600 12px var(--f-body,system-ui)}.trk-chart .n{fill:var(--ink);font:700 11px var(--f-body,system-ui)}
.trk-chart .cnt{fill:var(--blue);opacity:.55}.trk-chart .avg{fill:none;stroke:var(--gold);stroke-width:3;stroke-linejoin:round}.trk-chart .avgd{fill:var(--gold);stroke:var(--surface);stroke-width:2}
.trk-legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:.85rem;color:var(--muted)}.trk-legend i{display:inline-block;width:14px;height:10px;border-radius:3px;margin-right:6px;vertical-align:middle}
.lg-cnt{background:var(--blue);opacity:.55}.lg-avg{background:var(--gold)}.lg-70{border-top:2px dashed var(--ok);height:0!important;border-radius:0!important}
.trk-mini{max-width:420px}
.trk-recent h3{margin:0}.trk-rlist{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:8px}
.trk-rlist li{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--line);border-radius:12px;background:var(--raise)}.trk-rlist .trk-t{min-width:0}
.trk-gridwrap{border:1px solid var(--line);border-radius:12px}
.trk-grid{border-collapse:separate;border-spacing:0;font-size:.88rem;min-width:100%}
.trk-grid th,.trk-grid td{padding:7px 9px;border-bottom:1px solid var(--line);white-space:nowrap;text-align:center}
.trk-grid thead th{vertical-align:bottom;background:var(--raise);font-size:.8rem}
.trk-ch{display:inline-block;max-width:150px;white-space:normal;text-align:left;line-height:1.25;overflow-wrap:anywhere}
.trk-grid .stk{position:sticky;left:0;z-index:1;background:var(--surface);text-align:left;white-space:normal;min-width:150px;max-width:220px;box-shadow:1px 0 0 var(--line)}
.trk-grid thead .stk{background:var(--raise);z-index:2}
.trk-grid .gc{font-weight:800;font-variant-numeric:tabular-nums}.trk-grid .gc.hi{background:var(--soft-ok)}.trk-grid .gc.mid{background:var(--soft-gold)}.trk-grid .gc.lo{background:var(--soft-bad)}.trk-grid .gc.none{color:var(--muted);font-weight:400}
.trk-grid .linkbtn{text-align:left}
@media (max-width:900px){.trk-filters,.trk-filters.c3{grid-template-columns:repeat(2,minmax(0,1fr))}.trk-filters .trk-q{grid-column:1/-1}}
@media (max-width:640px){
 .trk-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
 .trk-tbl thead{display:none}
 .trk-tbl,.trk-tbl tbody,.trk-tbl tr,.trk-tbl td{display:block;width:100%;box-sizing:border-box}
 .trk-tbl tr{border:1.5px solid var(--line);border-radius:14px;margin:0 0 10px;padding:6px 10px;background:var(--raise)}
 .trk-tbl td{border:0;padding:4px 0;display:flex;gap:10px;justify-content:space-between;align-items:center;text-align:right}
 .trk-tbl td::before{content:attr(data-l);font-size:.78rem;font-weight:700;color:var(--muted);text-align:left;flex:none}
 .trk-tbl td.trk-t{display:block;text-align:left}.trk-tbl td.trk-t::before{display:block}
 .trk-tbl td.trk-act{justify-content:flex-end;padding-top:6px}.trk-tbl td.trk-act::before{content:none}
}
@media (max-width:420px){.trk-filters{gap:8px}.trk-filters .field label{font-size:.82rem}.trk-filters .select,.trk-filters .input{padding:8px 9px;font-size:.92rem}}`;
  try { const st = document.createElement('style'); st.id = 'trk-css'; st.textContent = CSS; document.head.appendChild(st); } catch (e) { }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'tracker',
    title: 'My Assessment History',
    tile: { icon: '📈', meta: 'Every quiz, test, paper and activity you finish: scores, levels, time taken, trends and retakes.' },
    render(api, loc) {
      if ((loc.k || null) !== F.lastK) { F.lastK = loc.k || null; F.key = loc.k || ''; F.limit = PAGE; if (loc.k) { F.kind = ''; F.mod = ''; F.from = ''; F.to = ''; F.q = ''; } }
      let tab = loc.tab || 'all'; if (tab === 'class' && !(C.admin && C.db)) tab = 'all';
      if (tab === 'class') return `<section class="hero"><span class="eyebrow">Course owner</span><h1>Class tracker</h1><p>Every student's results from the online Student's Version, live: a grid of best scores per assessment, filters, and each student's full history.</p></section><div class="card">${tabsHTML(tab)}${classHTML()}</div>`;
      return studentHTML(api, loc, tab);
    },
    mount(api, loc, stage) {
      if (!stage) return;
      const tab = loc.tab || 'all';
      const redraw = () => { const b = stage.querySelector('#trk-body'); if (b) b.innerHTML = bodyHTML(tab); const c = stage.querySelector('#trk-count'); if (c) c.textContent = countText(); };
      stage.querySelectorAll('[data-tf]').forEach(el => el.addEventListener(el.dataset.tf === 'q' ? 'input' : 'change', () => { F[el.dataset.tf] = el.value; F.limit = PAGE; redraw(); }));
      const credraw = () => { const b = stage.querySelector('#trk-cbody'); if (b) b.innerHTML = classBody(); };
      stage.querySelectorAll('[data-cf]').forEach(el => el.addEventListener(el.dataset.cf === 'q' ? 'input' : 'change', () => { CF[el.dataset.cf] = el.value; CF.limit = PAGE; if (CF.uid) api.render(); else credraw(); }));
    },
    click(action, el, api) {
      if (action === 'more') { F.limit += PAGE; const b = document.getElementById('trk-body'); if (b) b.innerHTML = bodyHTML(api.S.loc.tab || 'all'); return; }
      if (action === 'clear') { F.kind = F.mod = F.from = F.to = F.q = ''; F.limit = PAGE; api.render(); return; }
      if (action === 'unfocus') { F.key = ''; api.go({ v: 'tracker', tab: 'all' }); return; }
      if (action === 'sync') { C.wait = 0; kick(10); api.toast('Sending your results…'); return; }
      if (action === 'csv') { const tab = api.S.loc.tab || 'all'; offer(fname('assessment history'), attemptsCSV(applyF(hist(), tab === 'all' ? F : Object.assign({}, F, { key: '' })))); return; }
      if (action === 'stu') { CF.uid = el.dataset.uid || ''; CF.limit = PAGE; CL.drill = null; api.render(); window.scrollTo(0, 0); return; }
      if (action === 'cback') { CF.uid = ''; CL.drill = null; api.render(); return; }
      if (action === 'cmore') { CF.limit += PAGE; api.render(); return; }
      if (action === 'crefresh') { if (CL.sub) { try { CL.sub(); } catch (e) { } } CL.sub = null; CL.loaded = false; CL.err = ''; CL.drill = null; api.render(); return; }
      if (action === 'csvclass') {
        const docs = classDocs(), cols = gridCols(docs);
        const rows = [['Student', 'Name in the course', 'Attempts', 'Average %', 'Last active'].concat(cols.map(c => c.t + ' (best %)'))];
        docs.forEach(d => rows.push([CL.names[d.uid] || '', d.name || '', (d.counts && d.counts.attempts) || 0, d.avg, d.last ? d.last.slice(0, 10) : ''].concat(cols.map(c => { const x = cell(d, c); return x ? (x.p == null ? 'submitted' : x.p) : ''; }))));
        offer(fname('class tracker'), csv(rows)); return;
      }
      if (action === 'csvstu') { const d = CL.docs.find(x => x.uid === CF.uid) || {}; if (CL.drill && CL.drill.items) offer(fname((who(d) || 'student') + ' history'), attemptsCSV(applyF(CL.drill.items, { kind: CF.kind, mod: CF.mod }))); return; }
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0)); else setTimeout(init, 0);
})();
