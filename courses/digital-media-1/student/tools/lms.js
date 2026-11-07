/* Digital Media Unit 1 LMS: classes, join codes, results, progress sync, assignments, announcements and My grades.
   Developed by Kester Small.

   Runs only in the ONLINE course (the published course page) with the `db` and `user` capabilities. Everywhere else
   (offline zip, a saved file, signed out) `claude.use()` resolves null and every LMS view hides itself or shows a
   "Sign in to the online course" card. Nothing here blocks first paint.

   STORE ONLY USER IDS. Names (and, at export time only, emails) are resolved with user.profiles(ids) when drawing.

   DATA MODEL (db paths; even segment counts are documents)
     lms/classes                         {classes:[{id,name,code,term,weights:{mode,p1,p2,sba,cw},colCats:{colKey:cat}}], courseUrl}   teacher only
     lms/classinfo/{classId}/info        {name,term,weights,colCats}                              students read (their class header + My grades weighting)
     lms/codes/{CODE}/class              {classId}                                                students read: join-code lookup
     lms/enrol/{classId}/{userId}        {userId, joinedAt}                                       written by the student on join; read by tools/attendance.js
     lms/assign/{classId}/{assignId}     {id,title,instructions,due,points,linkTo,cat,createdAt}  teacher writes, students read
     lms/news/{classId}/{newsId}         {id,title,body,pinned,at}                                teacher writes, students read
     lms/users/{userId}/me               {type:'me',classes:[classId],joined:{classId:at}}        the student's own subtree ({self})
     lms/users/{userId}/progress         {type:'progress',units,labs,tests,papers,p2,pct,xp,at,log:[...]}  synced from localStorage S, at most once a minute, only on change
     lms/users/{userId}/grade:{attemptId} {type:'grade',kind,id,title,score,max,pct,module,at,integrity:'clean'|'flagged',attemptId}
     lms/users/{userId}/sub:{assignId}   {type:'sub',assignId,classId,text,link,files:[{id,name,type,size}],submittedAt,late,count}
     lms/marks/{userId}/a:{assignId}     {score,max,feedback,rubric,status:'returned',at}         teacher writes, the student reads their own
     lms/marks/{userId}/ovr:{colKey}     {pct,reason,at}                                          gradebook override, teacher writes, the student reads their own
   (The brief's lms/users/{userId}/grades/{autoId} and /subs/{assignId} have an odd segment count, so they cannot be
   documents; grades and submissions live as prefixed document ids in the student's one collection instead. One query per
   student then returns everything the teacher needs.)

   RESULT EVENTS (the hook the engine, tools and games use; this file is the listener)
     window.dispatchEvent(new CustomEvent('dm:result', {detail:{kind,id,title,score,max,pct,module,at,integrity,attemptId}}))
     iframe games: parent.postMessage({type:'dm:result', kind,id,title,score,max,pct,module}, '*')
     kind: 'test' (module test) | 'paper' (Paper 01 past or mock) | 'paper2' (Paper 02 bank, self-marked) | 'lab' | 'game'
           | 'unit' (unit completed) | 'write' (a write task saved)   unit and write go to the progress timeline, not grades. */
(function () {
  'use strict';
  const VERSION = 1;
  const TZ = 'America/Lower_Princes';
  const LSK = 'capeDM1.lms.';
  const GRADED = ['test', 'paper', 'paper2', 'lab', 'game'];
  const LOGGED = ['unit', 'write', 'essay'];
  const KINDS = GRADED.concat(LOGGED);
  const CATS = { p1: 'Paper 01', p2: 'Paper 02', sba: 'SBA', cw: 'Internal coursework', none: 'Not counted' };
  const PRESETS = { cape: { mode: 'cape', p1: 20, p2: 20, sba: 60, cw: 0 }, internal: { mode: 'internal', p1: 25, p2: 25, sba: 30, cw: 20 } };
  const BANDS = [[70, 'I'], [60, 'II'], [50, 'III'], [40, 'IV'], [30, 'V'], [20, 'VI'], [0, 'VII']];
  const SYNC_MS = 60000;

  /* ---------------- helpers ---------------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const okSeg = s => typeof s === 'string' && s.length > 0 && s.length <= 190 && /^[A-Za-z0-9_\-.~:@+]+$/.test(s) && s !== '.' && s !== '..';
  const seg = s => (String(s == null ? '' : s).replace(/[^A-Za-z0-9_\-.~:@+]/g, '_').slice(0, 150)) || 'x';
  const num = (v, d) => { const n = Number(v); return Number.isFinite(n) ? n : d; };
  const clampStr = (s, n) => String(s == null ? '' : s).slice(0, n);
  function rid(p) {
    let s = '';
    try { const a = new Uint32Array(2); crypto.getRandomValues(a); s = a[0].toString(36) + a[1].toString(36); } catch (e) { s = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2); }
    return (p || '') + Date.now().toString(36) + s.slice(0, 8);
  }
  function code6() { const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; let s = ''; try { const a = new Uint32Array(6); crypto.getRandomValues(a); a.forEach(x => { s += A[x % A.length]; }); } catch (e) { for (let i = 0; i < 6; i++) s += A[Math.floor(Math.random() * A.length)]; } return s; }
  const lsGet = k => { try { const v = localStorage.getItem(LSK + k); return v == null ? null : JSON.parse(v); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(LSK + k, JSON.stringify(v)); } catch (e) { } };
  function fmtDate(ms, withTime) {
    if (!ms) return '';
    try { return new Date(ms).toLocaleString('en-GB', Object.assign({ timeZone: TZ, day: 'numeric', month: 'short', year: 'numeric' }, withTime ? { hour: '2-digit', minute: '2-digit' } : {})); } catch (e) { return new Date(ms).toISOString().slice(0, 16).replace('T', ' '); }
  }
  function band(pct) { if (pct == null || !Number.isFinite(pct)) return ''; for (const [c, b] of BANDS) if (pct >= c) return b; return 'VII'; }
  const pctStr = p => p == null || !Number.isFinite(p) ? '–' : Math.round(p) + '%';
  const colKey = (kind, id) => seg(kind + '-' + id);
  const safeUrl = u => { const s = String(u || '').trim(); return /^https?:\/\/[^\s<>"']+$/i.test(s) ? s : ''; };

  /* ---------------- course catalogue (for linkTo, column order and titles) ---------------- */
  function catalogue() {
    const out = [];
    const MODS = window.COURSE_MODULES || [];
    ['M1', 'M2', 'M3'].forEach(mid => { const m = MODS.find(x => x.id === mid); if (m) out.push({ key: 'test:' + m.id, col: colKey('test', m.id), kind: 'test', title: (m.test && m.test.title) || (m.code + ' test'), module: m.id, group: 'Module tests' }); });
    (window.COURSE_PAPERS || []).forEach(p => out.push({ key: 'paper:' + p.id, col: colKey('paper', p.id), kind: 'paper', title: p.title || p.id, module: '', group: 'Paper 01 past and mock papers' }));
    MODS.forEach(m => (m.units || []).forEach((u, ui) => { if ((u.screens || []).some(s => s.type === 'write')) out.push({ key: 'write:' + u.id, kind: 'write', title: m.code + ' · Unit ' + (ui + 1) + ' write task: ' + u.title, module: m.id, m: m.id, u: ui, group: 'Unit write tasks' }); }));
    (window.EDPM_LABS || []).forEach(x => out.push({ key: 'lab:' + x.id, col: colKey('lab', x.id), kind: 'lab', title: 'Lab ' + x.id + ': ' + x.title, module: x.sec || '', group: 'Practical labs' }));
    ((window.DM_SBA && window.DM_SBA.phases) || []).forEach((p, i) => out.push({ key: 'sba:' + p.id, kind: 'sba', title: 'SBA milestone ' + (i + 1) + ': ' + p.name, module: 'M3', group: 'SBA milestones' }));
    [['dmquiz1', 'Class quiz: What Is Digital Media?'], ['dmtest1', 'Digital Media Test 1'], ['p2bank', 'Paper 02 Practice Bank'], ['arcade', 'Digital Media Unit 1 Arcade']].forEach(([id, t]) => out.push({ key: 'game:' + id, kind: 'game', title: t, module: '', group: 'Course games' }));
    return out;
  }
  let CAT = null; const cat = () => CAT || (CAT = catalogue());
  const linkInfo = k => cat().find(x => x.key === k) || null;
  function courseOrder(kind, id) {
    const c = cat(), i = c.findIndex(x => x.col === colKey(kind, id));
    if (i >= 0) return i;
    const base = { test: 0, paper: 100, paper2: 400, lab: 500, game: 800 }[kind] || 900;
    return base + 1000;
  }
  function defaultCat(kind, id) {
    if (kind === 'test' || kind === 'paper') return 'p1';
    if (kind === 'paper2') return 'p2';
    if (kind === 'lab') return 'cw';
    if (kind === 'game') return /^arcade/.test(String(id)) ? 'none' : 'cw';
    return 'cw';
  }
  function linkGo(k) {
    const x = linkInfo(k); if (!x) return '';
    const id = k.slice(k.indexOf(':') + 1);
    if (x.kind === 'lab') return `data-go="labs" data-k="${esc(id)}"`;
    if (x.kind === 'write') return `data-go="unit" data-m="${esc(x.m)}" data-u="${x.u}"`;
    if (x.kind === 'sba') return `data-go="portfolio" data-tab="${esc(id)}"`;
    if (x.kind === 'game') return `data-go="edpmgames" data-k="${esc(id === 'p2bank' ? 'p2bank' : id)}"`;
    if (x.kind === 'test') return `data-go="test" data-m="${esc(id)}"`;
    if (x.kind === 'paper') return `data-go="paper" data-p="${esc(id)}"`;
    return '';
  }

  /* ---------------- state ---------------- */
  const L = {
    st: 'pending', db: null, user: null, uid: null, owner: false, editor: false, teacher: false,
    me: null, own: { grades: [], subs: {}, progress: null, loaded: false }, marks: { a: {}, ovr: {}, loaded: false },
    info: {}, assign: {}, news: {}, classes: null, classesDoc: null, err: '', unsubs: {}, readonly: false
  };
  let API = null;
  const readyCbs = [];
  let readyResolve; const ready = new Promise(r => { readyResolve = r; });

  /* ---------------- painting ---------------- */
  const VIEWS = {};
  let paintT = 0;
  function curView() { const A = API || window.COURSE_API; return A && A.S && A.S.loc ? A.S.loc.v : ''; }
  function schedule() { if (paintT) return; paintT = setTimeout(() => { paintT = 0; paintNow(); }, 30); }
  function paintNow() {
    const root = document.getElementById('lms-root');
    if (root && VIEWS[root.dataset.view]) {
      const A = API || window.COURSE_API, loc = A && A.S ? A.S.loc : {};
      const ae = document.activeElement, fid = ae && ae.id && root.contains(ae) ? ae.id : null;
      let sel = null; try { if (fid && ae.setSelectionRange && typeof ae.selectionStart === 'number') sel = [ae.selectionStart, ae.selectionEnd]; } catch (e) { }
      root.innerHTML = safeInner(root.dataset.view, loc);
      if (fid) { const el = document.getElementById(fid); if (el) { try { el.focus({ preventScroll: true }); if (sel && el.setSelectionRange) el.setSelectionRange(sel[0], sel[1]); } catch (e) { } } }
      afterPaint(root.dataset.view, loc);
    }
    const hc = document.getElementById('lms-home'); if (hc) hc.innerHTML = homeInner();
    navBadge();
  }
  function safeInner(view, loc) { try { return VIEWS[view].inner(loc || {}); } catch (e) { return `<div class="card"><h2>Something went wrong</h2><p class="hint">${esc(e && e.message)}</p></div>`; } }
  let navSig = '';
  function navBadge() {
    const sig = [L.st, L.teacher, unreadTotal()].join('|');
    if (sig === navSig) return; navSig = sig; refreshNav();
  }
  function refreshNav() {
    const A = API || window.COURSE_API; if (!A) return;
    try { if (typeof A.refreshNav === 'function') { A.refreshNav(); return; } } catch (e) { }
    try { if (A.S && A.S.loc && A.S.loc.v === 'home') A.go(A.S.loc); } catch (e) { }
  }
  function announce(msg) { const el = document.getElementById('lms-live'); if (el) { el.textContent = ''; setTimeout(() => { el.textContent = msg; }, 40); } }
  function toast(m) { try { (API || window.COURSE_API).toast(m); } catch (e) { } announce(m); }
  function afterPaint(view) { if (view === 'lmsclass') markNewsRead(); }

  /* ---------------- boot ---------------- */
  async function boot() {
    if (window.COURSE_TEACHER_EDITION) return finish('te'); /* a different artifact with its own db: no live class data there */
    const C = window.claude;
    if (!C || typeof C.use !== 'function') return finish('offline');
    let db = null, user = null;
    try { [db, user] = await Promise.all([Promise.resolve(C.use('db')).catch(() => null), Promise.resolve(C.use('user')).catch(() => null)]); } catch (e) { }
    if (!db || !user) return finish('offline');
    L.db = db; L.user = user;
    let me = null; try { me = await user.me(); } catch (e) { me = null; }
    if (!me) return finish('offline');
    L.uid = me.id || null; L.owner = !!me.isOwner; L.editor = !!me.canEdit;
    if (!L.owner && !L.editor) { try { const r = await Promise.all([user.isOwner(), user.canEdit()]); L.owner = !!r[0]; L.editor = !!r[1]; } catch (e) { } }
    L.teacher = L.owner || L.editor;
    if (!L.uid && !L.teacher) return finish('signedout');
    finish('ready');
    if (L.uid) subscribeOwn();
    if (L.teacher) subscribeClasses();
  }
  function finish(st) { L.st = st; readyResolve(st); readyCbs.splice(0).forEach(f => { try { f(st); } catch (e) { } }); schedule(); navSig = ''; navBadge(); }
  function sub(key, ref, next) {
    if (L.unsubs[key]) return;
    try { L.unsubs[key] = ref.onSnapshot(next, err => { delete L.unsubs[key]; if (err && err.code === 'revoked') { L.st = 'offline'; schedule(); } }); } catch (e) { }
  }
  function unsub(key) { const u = L.unsubs[key]; if (u) { try { u(); } catch (e) { } delete L.unsubs[key]; } }

  function subscribeOwn() {
    sub('own', L.db.collection('lms/users/' + L.uid), qs => {
      const grades = [], subs = {}; let prog = null, me = null;
      (qs.docs || []).forEach(d => { if (!d.exists) return; const b = d.data() || {};
        if (d.id === 'me') me = b; else if (d.id === 'progress') prog = b;
        else if (d.id.indexOf('grade:') === 0) grades.push(Object.assign({}, b, { _doc: d.id }));
        else if (d.id.indexOf('sub:') === 0) subs[b.assignId || d.id.slice(4)] = b; });
      L.own = { grades, subs, progress: prog, loaded: true };
      L.me = me || { type: 'me', classes: [], joined: {} };
      if (!LOG.loaded) { LOG.list = Array.isArray(prog && prog.log) ? prog.log.slice(-60) : []; LOG.loaded = true; LAST.sig = prog ? sigOf(prog) : ''; }
      syncClasses(); schedule(); kickSync();
    });
    sub('marks', L.db.collection('lms/marks/' + L.uid), qs => {
      const a = {}, ovr = {};
      (qs.docs || []).forEach(d => { if (!d.exists) return; const b = d.data() || {}; if (d.id.indexOf('a:') === 0) a[d.id.slice(2)] = b; else if (d.id.indexOf('ovr:') === 0) ovr[d.id.slice(4)] = b; });
      L.marks = { a, ovr, loaded: true }; schedule();
    });
  }
  function myClassIds() { return ((L.me && Array.isArray(L.me.classes)) ? L.me.classes : []).filter(okSeg).slice(0, 6); }
  function syncClasses() {
    const want = myClassIds();
    Object.keys(L.unsubs).forEach(k => { const m = k.match(/^(info|assign|news):(.+)$/); if (m && !want.includes(m[2])) { unsub(k); delete L[m[1] === 'info' ? 'info' : m[1]][m[2]]; } });
    want.forEach(cid => {
      sub('info:' + cid, L.db.doc('lms/classinfo/' + cid + '/info'), d => { L.info[cid] = d.exists ? d.data() : { name: '', gone: true }; schedule(); });
      sub('assign:' + cid, L.db.collection('lms/assign/' + cid), qs => { L.assign[cid] = (qs.docs || []).filter(d => d.exists).map(d => Object.assign({ id: d.id }, d.data())); schedule(); });
      sub('news:' + cid, L.db.collection('lms/news/' + cid), qs => { L.news[cid] = (qs.docs || []).filter(d => d.exists).map(d => Object.assign({ id: d.id }, d.data())); schedule(); });
    });
  }
  function subscribeClasses() {
    sub('classes', L.db.doc('lms/classes'), d => {
      const b = d.exists ? (d.data() || {}) : {};
      L.classesDoc = b;
      L.classes = (Array.isArray(b.classes) ? b.classes : []).filter(c => c && okSeg(String(c.id))).map(c => Object.assign({}, c, { weights: Object.assign({}, PRESETS.cape, c.weights || {}), colCats: Object.assign({}, c.colCats || {}) }));
      schedule();
    });
  }

  /* one write at a time per document */
  const WQ = new Map();
  function writeDoc(path, data, mode) {
    const prev = WQ.get(path) || Promise.resolve();
    const p = prev.catch(() => { }).then(() => { const ref = L.db.doc(path); return mode === 'update' ? ref.update(data) : mode === 'delete' ? ref.delete() : ref.set(data); });
    WQ.set(path, p); p.finally(() => { if (WQ.get(path) === p) WQ.delete(path); }).catch(() => { });
    return p.catch(e => { if (e && e.code === 'unavailable') return new Promise(r => setTimeout(r, 600 + Math.random() * 600)).then(() => { const ref = L.db.doc(path); return mode === 'update' ? ref.update(data) : mode === 'delete' ? ref.delete() : ref.set(data); }); throw e; });
  }
  function errMsg(e) {
    const c = e && e.code;
    if (c === 'invalid_argument') return 'The course would not accept that change. You may only have view access: ask your teacher to share the course with you as a Contributor.';
    if (c === 'quota_exceeded') return 'The class storage is full. Tell your teacher.';
    if (c === 'resource_exhausted' || c === 'rate_limited') return 'Too many changes at once. Wait a moment and try again.';
    return 'That did not save. Check your connection and try again.';
  }

  /* ---------------- results: engine, tools and games ---------------- */
  const LOG = { list: [], loaded: false };
  const RECENT = {};
  /* integrity comes from tools/lockdown.js (window.COURSE_LOCKDOWN); its test ids are p1-<id> | mock-<id> | mtest-<M> | p2bank-<id> | dmtest1 | dmquiz1 */
  function testIdFor(kind, id) {
    id = String(id);
    if (kind === 'test') return 'mtest-' + id;
    if (kind === 'paper') return (/MOCK/i.test(id) ? 'mock-' : 'p1-') + id;
    return id; /* paper2: p2bank-<id>; game: dmtest1, dmquiz1 */
  }
  function colForTestId(tid) {
    tid = String(tid || ''); let m;
    if ((m = tid.match(/^mtest-(.+)$/))) return colKey('test', m[1]);
    if ((m = tid.match(/^(?:p1|mock)-(.+)$/))) return colKey('paper', m[1]);
    if (/^p2bank-/.test(tid)) return colKey('paper2', tid);
    return colKey('game', tid);
  }
  function integrityFor(kind, id) {
    try {
      const X = window.COURSE_LOCKDOWN; if (!X) return 'clean';
      const tid = testIdFor(kind, id), s = X.session;
      if (s && s.testId === tid) return (s.violations > 0 || s.status === 'flagged') ? 'flagged' : 'clean';
      const h = typeof X.history === 'function' ? X.history() : [];
      for (let i = h.length - 1; i >= 0; i--) { const a = h[i]; if (a && a.testId === tid) { const t = Date.parse(a.end || a.start || ''); if (!t || Date.now() - t < 15 * 60000) return a.status === 'flagged' || a.violations > 0 ? 'flagged' : 'clean'; break; } }
      if (typeof X.getLock === 'function' && X.getLock(tid)) return 'flagged';
    } catch (e) { }
    return 'clean';
  }
  function normResult(d) {
    if (!d || typeof d !== 'object') return null;
    const kind = String(d.kind || ''); if (!KINDS.includes(kind)) return null;
    const id = clampStr(d.id, 120); if (!id) return null;
    let score = num(d.score, null), max = num(d.max, null), pct = num(d.pct, null);
    if (pct == null && score != null && max) pct = Math.round(score / max * 100);
    if (pct != null) pct = Math.max(0, Math.min(100, Math.round(pct)));
    const integ = d.integrity === 'flagged' || d.integrity === 'clean' ? d.integrity : integrityFor(kind, id);
    return { kind, id, title: clampStr(d.title || id, 140), score, max, pct, module: clampStr(d.module || '', 8), at: num(d.at, Date.now()), integrity: integ, attemptId: d.attemptId && okSeg(String(d.attemptId)) ? String(d.attemptId) : '' };
  }
  function onResult(detail, via) {
    const r = normResult(detail); if (!r) return;
    if (via === 'frame' && r.kind !== 'game' && r.kind !== 'paper2') r.kind = 'game';
    ready.then(st => {
      if (st !== 'ready' || !L.uid) return;
      if (L.teacher && !myClassIds().length) return; /* the teacher previewing the course does not fill the gradebook */
      if (GRADED.includes(r.kind) && r.pct != null) {
        const k = r.kind + '|' + r.id, last = RECENT[k];
        if (!r.attemptId) r.attemptId = (last && Date.now() - last.t < 20000) ? last.a : seg(rid(r.kind.slice(0, 2) + '-'));
        RECENT[k] = { t: Date.now(), a: r.attemptId };
        const doc = Object.assign({ type: 'grade', v: VERSION }, r);
        writeDoc('lms/users/' + L.uid + '/grade:' + r.attemptId, doc).catch(() => { });
      }
      LOG.list.push({ kind: r.kind, id: r.id, title: r.title, pct: r.pct, at: r.at });
      if (LOG.list.length > 60) LOG.list = LOG.list.slice(-60);
      kickSync(true);
    });
  }
  window.addEventListener('dm:result', e => onResult(e && e.detail, 'event'));
  window.addEventListener('message', ev => {
    const d = ev && ev.data; if (!d || typeof d !== 'object' || d.type !== 'dm:result') return;
    let ok = false; try { ok = [...document.querySelectorAll('iframe')].some(f => f.contentWindow === ev.source); } catch (e) { }
    if (ok) onResult(d, 'frame');
  });

  /* ---------------- progress sync (localStorage S -> lms/users/{id}/progress) ---------------- */
  const LAST = { sig: '', t: 0, timer: 0 };
  function summary() {
    const A = window.COURSE_API; if (!A || !A.S) return null;
    const S = A.S, units = {};
    try { A.modules().forEach(m => { units[m.id] = { done: m.units.filter(u => u.done >= u.screens).length, total: m.units.length }; }); } catch (e) { }
    const labs = Object.keys(S.labs || {}).filter(k => S.labs[k] && S.labs[k].done).sort();
    const tests = {}; Object.keys(S.tests || {}).forEach(k => { if (okSeg(k)) tests[k] = num(S.tests[k], 0); });
    const papers = {}; Object.keys(S.pscore || {}).forEach(k => { if (okSeg(k)) papers[k] = num(S.pscore[k], 0); });
    const p2 = Object.keys(S.p2 || {}).filter(k => S.p2[k]);
    let pct = 0; try { pct = A.progress().pct; } catch (e) { }
    return { units, labs, labsDone: labs.length, tests, papers, p2, pct, xp: num(S.xp, 0) };
  }
  function sigOf(o) { const c = Object.assign({}, o); delete c.at; delete c.type; delete c.v; return JSON.stringify(c); }
  function kickSync(soon) {
    if (L.st !== 'ready' || !L.uid || !L.own.loaded) return;
    if (L.teacher && !myClassIds().length) return;
    if (LAST.timer) return;
    const wait = Math.max(soon ? 1500 : 4000, LAST.t + SYNC_MS - Date.now());
    LAST.timer = setTimeout(doSync, wait);
  }
  function doSync() {
    LAST.timer = 0;
    const s = summary(); if (!s) return;
    s.log = LOG.list.slice(-60);
    const sig = sigOf(s); if (sig === LAST.sig) return;
    LAST.t = Date.now();
    writeDoc('lms/users/' + L.uid + '/progress', Object.assign({ type: 'progress', v: VERSION, at: Date.now() }, s)).then(() => { LAST.sig = sig; }).catch(() => { });
  }
  window.addEventListener('course:save', () => kickSync(false));
  window.addEventListener('pagehide', () => { if (LAST.timer && Date.now() - LAST.t >= SYNC_MS) { clearTimeout(LAST.timer); doSync(); } });

  /* ---------------- grade maths (shared with the teacher views) ---------------- */
  function weightsOf(w) { const o = Object.assign({}, PRESETS.cape, w || {}); ['p1', 'p2', 'sba', 'cw'].forEach(k => { o[k] = Math.max(0, num(o[k], 0)); }); return o; }
  /* grades: one student's grade docs; ovr: {colKey:{pct,reason}}; marks: {assignId:{score,max,...}}; subs: {assignId:sub}; assigns: list */
  function studentRow(grades, ovr, marks, subs, assigns, cls) {
    const cols = {}, now = Date.now(), colCats = (cls && cls.colCats) || {};
    (grades || []).forEach(g => {
      if (!GRADED.includes(g.kind) || g.pct == null) return;
      const k = colKey(g.kind, g.id), c = cols[k] = cols[k] || { key: k, kind: g.kind, id: g.id, title: g.title, attempts: [], order: courseOrder(g.kind, g.id) };
      c.attempts.push(g);
    });
    Object.values(cols).forEach(c => {
      c.attempts.sort((a, b) => a.at - b.at);
      c.best = Math.max(...c.attempts.map(a => a.pct)); c.latest = c.attempts[c.attempts.length - 1].pct; c.latestAt = c.attempts[c.attempts.length - 1].at;
      c.flagged = c.attempts.some(a => a.integrity === 'flagged');
      const o = ovr && ovr[c.key]; if (o && Number.isFinite(+o.pct)) { c.override = +o.pct; c.reason = o.reason || ''; }
      c.value = c.override != null ? c.override : c.best;
      c.cat = colCats[c.key] || defaultCat(c.kind, c.id);
    });
    let missing = 0, late = 0, submitted = 0;
    (assigns || []).forEach(a => {
      const k = 'a:' + a.id, m = marks && marks[a.id], s = subs && subs[a.id];
      const c = cols[k] = { key: k, kind: 'assign', id: a.id, title: a.title, assign: a, order: 5000 + (num(a.due, 0) / 1e10), cat: a.cat || (String(a.linkTo || '').indexOf('sba:') === 0 ? 'sba' : 'cw') };
      if (s) { submitted++; if (s.late) late++; c.sub = s; }
      if (m && m.status === 'returned' && Number.isFinite(+m.score)) { c.mark = m; c.value = Math.max(0, Math.min(100, +m.score / Math.max(1, num(m.max, num(a.points, 100))) * 100)); }
      else if (!s && a.due && a.due < now) { missing++; c.missing = true; c.value = 0; }
      const o = ovr && ovr[k]; if (o && Number.isFinite(+o.pct)) { c.override = +o.pct; c.reason = o.reason || ''; c.value = c.override; }
    });
    const w = weightsOf(cls && cls.weights), catAvg = {};
    ['p1', 'p2', 'sba', 'cw'].forEach(ct => { const vs = Object.values(cols).filter(c => c.cat === ct && c.value != null).map(c => c.value); catAvg[ct] = vs.length ? vs.reduce((a, b) => a + b, 0) / vs.length : null; });
    let tw = 0, tv = 0, all = 0; ['p1', 'p2', 'sba', 'cw'].forEach(ct => { all += w[ct]; if (catAvg[ct] != null && w[ct] > 0) { tw += w[ct]; tv += w[ct] * catAvg[ct]; } });
    const total = tw ? tv / tw : null;
    const tests = Object.values(cols).filter(c => (c.kind === 'test' || c.kind === 'paper') && c.value != null).map(c => c.value);
    return { cols, catAvg, total, coverage: all ? Math.round(tw / all * 100) : 0, band: band(total), missing, late, submitted, avgTest: tests.length ? tests.reduce((a, b) => a + b, 0) / tests.length : null };
  }

  /* ---------------- student: join ---------------- */
  async function joinClass(raw) {
    const code = String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (code.length < 4 || code.length > 12) { announce('Type the join code your teacher gave you.'); return { ok: false, msg: 'Type the join code your teacher gave you.' }; }
    if (L.st !== 'ready' || !L.uid) return { ok: false, msg: 'Sign in to the online course to join a class.' };
    let snap; try { snap = await L.db.doc('lms/codes/' + code + '/class').get(); } catch (e) { return { ok: false, msg: errMsg(e) }; }
    const cid = snap && snap.exists ? String((snap.data() || {}).classId || '') : '';
    if (!okSeg(cid)) return { ok: false, msg: 'That code did not match a class. Check it with your teacher.' };
    const me = L.me || { classes: [], joined: {} }, list = myClassIds();
    if (list.includes(cid)) return { ok: true, msg: 'You are already in this class.' };
    const at = Date.now();
    try {
      await writeDoc('lms/enrol/' + cid + '/' + L.uid, { userId: L.uid, joinedAt: at });
      await writeDoc('lms/users/' + L.uid + '/me', { type: 'me', v: VERSION, classes: list.concat(cid).slice(-6), joined: Object.assign({}, me.joined || {}, { [cid]: at }) });
    } catch (e) { return { ok: false, msg: errMsg(e) }; }
    kickSync(true);
    return { ok: true, msg: 'You joined the class. Welcome!' };
  }
  async function leaveClass(cid) {
    if (!okSeg(cid) || !L.uid) return;
    const me = L.me || {}; const list = myClassIds().filter(x => x !== cid), joined = Object.assign({}, me.joined || {}); delete joined[cid];
    try { await writeDoc('lms/users/' + L.uid + '/me', { type: 'me', v: VERSION, classes: list, joined }); await writeDoc('lms/enrol/' + cid + '/' + L.uid, null, 'delete'); toast('You left the class.'); } catch (e) { toast(errMsg(e)); }
  }

  /* ---------------- student: announcements read state (this device) ---------------- */
  function readMap() { return (L.uid && lsGet('read.' + L.uid)) || {}; }
  function unreadFor(cid) { const seen = num(readMap()[cid], 0); return (L.news[cid] || []).filter(n => num(n.at, 0) > seen).length; }
  function unreadTotal() { return L.st === 'ready' ? myClassIds().reduce((a, c) => a + unreadFor(c), 0) : 0; }
  let readT = 0;
  function markNewsRead() {
    if (!L.uid || !unreadTotal()) return;
    clearTimeout(readT); readT = setTimeout(() => { const m = readMap(); myClassIds().forEach(c => { const mx = Math.max(0, ...(L.news[c] || []).map(n => num(n.at, 0))); if (mx) m[c] = mx; }); lsSet('read.' + L.uid, m); navSig = ''; navBadge(); }, 2500);
  }

  /* ---------------- student: to do ---------------- */
  function todo() {
    const now = Date.now(), out = [];
    myClassIds().forEach(cid => (L.assign[cid] || []).forEach(a => {
      const s = L.own.subs[a.id], m = L.marks.a[a.id];
      let st = 'upcoming';
      if (m && m.status === 'returned') st = 'marked';
      else if (s) st = 'submitted';
      else if (a.due && a.due < now) st = 'overdue';
      else if (a.due && a.due - now < 3 * 864e5) st = 'soon';
      out.push({ a, cid, s, m, st });
    }));
    const rank = { overdue: 0, soon: 1, upcoming: 2, submitted: 3, marked: 4 };
    return out.sort((x, y) => rank[x.st] - rank[y.st] || num(x.a.due, 9e15) - num(y.a.due, 9e15));
  }
  const ST_LABEL = { overdue: ['Overdue', 'bad'], soon: ['Due soon', 'warn'], upcoming: ['Upcoming', ''], submitted: ['Submitted', 'ok'], marked: ['Marked', 'ok'] };
  function stPill(st, late) { const [t, c] = ST_LABEL[st]; return `<span class="lms-pill ${c}">${t}</span>${late ? '<span class="lms-pill warn">Late</span>' : ''}`; }

  /* ---------------- student: submissions ---------------- */
  const DRAFT = {}; /* assignId -> {text, link, files:[...]} unsent, this visit only */
  let ASSETS; /* undefined = not asked; null = unavailable */
  function getAssets() { if (ASSETS !== undefined) return Promise.resolve(ASSETS); return Promise.resolve().then(() => window.claude && window.claude.use ? window.claude.use('assets') : null).catch(() => null).then(a => { ASSETS = a || null; schedule(); return ASSETS; }); }
  function draftFor(a) { const s = L.own.subs[a.id]; return DRAFT[a.id] || (DRAFT[a.id] = { text: s ? s.text || '' : '', link: s ? s.link || '' : '', files: s && Array.isArray(s.files) ? s.files.slice() : [], busy: false }); }
  const TYPES = { pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', mp4: 'video/mp4', webm: 'video/webm', txt: 'text/plain', csv: 'text/csv', md: 'text/markdown', json: 'application/json', svg: 'image/svg+xml' };
  async function uploadFiles(a, files) {
    const as = await getAssets(); const d = draftFor(a);
    if (!as) { toast('File upload is not available here. Paste a link to your file instead.'); return; }
    for (const f of [...files].slice(0, 5)) {
      const ext = (f.name.split('.').pop() || '').toLowerCase(), type = TYPES[ext];
      if (!type) { toast(f.name + ': use a PDF, image, video or text file.'); continue; }
      d.busy = true; schedule(); announce('Uploading ' + f.name + '…');
      try { const r = await as.upload(f, { type }); d.files.push({ id: r.id, name: clampStr(f.name, 120), type: r.contentType || type, size: r.sizeBytes || f.size }); announce(f.name + ' uploaded. Press Submit to hand it in.'); }
      catch (e) { const c = e && e.code; toast(c === 'too_large' ? f.name + ' is too large (20 MB limit).' : c === 'unsupported_type' ? f.name + ' is a file type the course cannot store.' : c === 'quota_or_state' ? 'Class storage is full. Tell your teacher.' : 'Upload failed. Try again, or paste a link instead.'); }
      d.busy = false; schedule();
    }
  }
  async function submit(a, cid) {
    const d = draftFor(a), m = L.marks.a[a.id];
    if (m && m.status === 'returned') { toast('This work has been marked, so it is closed.'); return; }
    const link = d.link.trim();
    if (link && !safeUrl(link)) { toast('The link must start with https://'); return; }
    if (!d.text.trim() && !link && !d.files.length) { toast('Add some writing, a link or a file first.'); return; }
    const prev = L.own.subs[a.id], at = Date.now();
    const body = { type: 'sub', v: VERSION, assignId: a.id, classId: cid, text: clampStr(d.text, 20000), link: safeUrl(link), files: d.files.slice(0, 10), submittedAt: at, late: !!(a.due && at > a.due), count: num(prev && prev.count, 0) + 1 };
    d.busy = true; schedule();
    try { await writeDoc('lms/users/' + L.uid + '/sub:' + seg(a.id), body); delete DRAFT[a.id]; toast(body.late ? 'Submitted (late). Your teacher can see it.' : 'Submitted. Your teacher can see it.'); }
    catch (e) { toast(errMsg(e)); }
    d.busy = false; schedule();
  }
  function savedWriting(unitId) {
    let D = {}; try { D = JSON.parse(localStorage.getItem('capeDM1.v1.drafts')) || {}; } catch (e) { }
    const keys = Object.keys(D).filter(k => k.indexOf(unitId + '-') === 0 && D[k] && D[k].text).sort((x, y) => +x.split('-').pop() - +y.split('-').pop());
    return keys.length ? D[keys[keys.length - 1]].text : '';
  }

  /* ---------------- student views ---------------- */
  function statusCard(what) {
    if (L.st === 'pending') return `<div class="card"><p role="status">Connecting to your class…</p></div>`;
    if (L.st === 'offline') return `<div class="card lms-gate"><h2>Sign in to the online course to ${what}</h2><p>This copy of the course works offline, so your progress stays on this device. Your class, announcements, assignments and grades live in the online course. Open the course link your teacher posted in Google Classroom or Teams while you are signed in to your own account.</p></div>`;
    if (L.st === 'signedout') return `<div class="card lms-gate"><h2>Sign in to the online course to ${what}</h2><p>Sign in to your own account, then open the course link again. Your teacher must also share the course with you as a <b>Contributor</b>.</p></div>`;
    return '';
  }
  function newsHTML(cid, limit) {
    const seen = num(readMap()[cid], 0);
    const list = (L.news[cid] || []).slice().sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || num(b.at, 0) - num(a.at, 0)).slice(0, limit || 50);
    if (!list.length) return `<p class="hint">No announcements yet.</p>`;
    return `<ul class="lms-news">${list.map(n => `<li class="${n.pinned ? 'pin' : ''}"><div class="lms-nh"><b>${n.pinned ? '<span aria-hidden="true">📌 </span><span class="sr">Pinned: </span>' : ''}${esc(n.title)}</b>${num(n.at, 0) > seen ? '<span class="lms-pill gold">New</span>' : ''}<span class="hint">${esc(fmtDate(n.at, true))}</span></div>${n.body ? `<p class="lms-pre">${esc(n.body)}</p>` : ''}</li>`).join('')}</ul>`;
  }
  function todoHTML(limit, onlyOpen) {
    let list = todo(); if (onlyOpen) list = list.filter(x => x.st !== 'marked' && x.st !== 'submitted');
    if (limit) list = list.slice(0, limit);
    if (!list.length) return `<p class="hint">${onlyOpen ? 'Nothing to hand in right now.' : 'No assignments yet.'}</p>`;
    return `<ul class="lms-todo">${list.map(x => `<li><button type="button" class="lms-row" data-go="lmsclass" data-k="${esc(x.a.id)}" data-sub="${esc(x.cid)}"><span class="lms-rt"><b>${esc(x.a.title)}</b><span class="hint">${x.a.due ? 'Due ' + esc(fmtDate(x.a.due, true)) : 'No due date'}${x.a.points ? ' · ' + esc(x.a.points) + ' points' : ''}</span></span><span class="lms-rs">${stPill(x.st, x.s && x.s.late)}${x.st === 'marked' ? `<span class="lms-pill">${esc(x.m.score)}/${esc(x.m.max || x.a.points)}</span>` : ''}</span></button></li>`).join('')}</ul>`;
  }
  function myClassInner(loc) {
    const gate = statusCard('join your class'); if (gate) return hero() + gate;
    if (!L.uid) return hero() + `<div class="card"><p>This view is for students. Open the <button type="button" class="linkbtn" data-go="lmsteach">Teacher dashboard</button> instead.</p></div>`;
    if (loc.k && loc.sub) return assignView(loc.sub, loc.k);
    const ids = myClassIds();
    let h = hero();
    h += `<div class="card"><h2>${ids.length ? 'Join another class' : 'Join your class'}</h2><p class="hint">Your teacher gives you a short join code. You only need to enter it once.</p>
      <form class="lms-join" data-lmsform="join"><div class="field"><label for="lms-code">Class join code</label><input id="lms-code" class="input lms-code" maxlength="12" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="e.g. 7KQ2MX" value="${esc(F.code || '')}" aria-describedby="lms-join-msg"></div><button type="submit" class="btn go">Join class</button></form>
      <p id="lms-join-msg" class="hint" aria-live="polite">${esc(F.joinMsg || '')}</p></div>`;
    if (!L.own.loaded) return h + `<div class="card"><p role="status">Loading your class…</p></div>`;
    ids.forEach(cid => {
      const info = L.info[cid] || {};
      h += `<div class="card"><div class="card-top"><div><span class="kicker">My class</span><h2>${esc(info.name || 'Class')}${info.term ? ` <small class="hint">· ${esc(info.term)}</small>` : ''}</h2></div>${unreadFor(cid) ? `<span class="lms-pill gold">${unreadFor(cid)} new</span>` : ''}</div>
        ${info.gone ? '<p class="fb note">This class was removed by your teacher.</p>' : ''}
        <h3>Announcements</h3>${newsHTML(cid)}
        <h3>To do</h3>${todoHTML(0, false)}
        <details class="fold"><summary>Leave this class</summary><p class="hint">Only do this if you joined the wrong class.</p><button type="button" class="btn ghost" data-lms="leave" data-c="${esc(cid)}">Leave ${esc(info.name || 'class')}</button></details></div>`;
    });
    return h;
  }
  function hero() { return `<div class="hero"><span class="eyebrow">Digital Media Unit 1 · My class</span><h1>My class</h1><p>Join your class, read announcements and hand in your assignments.</p></div><p id="lms-live" class="sr" role="status" aria-live="polite"></p>`; }
  function assignView(cid, aid) {
    const a = (L.assign[cid] || []).find(x => x.id === aid);
    const back = `<div class="crumbs"><button type="button" class="linkbtn" data-go="lmsclass">← My class</button><span>${esc((L.info[cid] || {}).name || '')}</span></div>`;
    if (!a) return hero() + `<div class="card">${back}<p>${L.assign[cid] ? 'This assignment is no longer available.' : 'Loading…'}</p></div>`;
    const s = L.own.subs[a.id], m = L.marks.a[a.id], marked = m && m.status === 'returned', d = draftFor(a), now = Date.now();
    const st = marked ? 'marked' : s ? 'submitted' : a.due && a.due < now ? 'overdue' : a.due && a.due - now < 3 * 864e5 ? 'soon' : 'upcoming';
    const li = a.linkTo ? linkInfo(a.linkTo) : null;
    let h = hero() + `<div class="card">${back}<div class="card-top"><h2>${esc(a.title)}</h2><span>${stPill(st, s && s.late)}</span></div>
      <p class="hint">${a.due ? 'Due ' + esc(fmtDate(a.due, true)) : 'No due date'}${a.points ? ' · ' + esc(a.points) + ' points' : ''}</p>
      ${a.instructions ? `<p class="lms-pre">${esc(a.instructions)}</p>` : ''}
      ${li ? `<div class="row"><button type="button" class="btn ghost" ${linkGo(a.linkTo)}>Open: ${esc(li.title)} →</button></div>` : ''}</div>`;
    if (marked) h += `<div class="card"><h3>Your mark</h3><p class="lms-big">${esc(m.score)} / ${esc(m.max || a.points)}</p>${m.feedback ? `<h4>Feedback from your teacher</h4><p class="lms-pre">${esc(m.feedback)}</p>` : ''}${rubricView(m.rubric)}<p class="hint">Returned ${esc(fmtDate(m.at, true))}. This work is now closed.</p></div>`;
    if (s) h += `<div class="card"><h3>What you handed in</h3><p class="hint">Submitted ${esc(fmtDate(s.submittedAt, true))}${s.late ? ' · Late' : ''}${s.count > 1 ? ' · version ' + esc(s.count) : ''}</p>${subBody(s)}</div>`;
    if (!marked) {
      if (ASSETS === undefined) getAssets();
      const canUp = !!ASSETS;
      h += `<div class="card"><h3>${s ? 'Resubmit' : 'Hand in your work'}</h3>${a.due && a.due < now ? '<p class="fb note">The due date has passed. You can still hand in: it will be marked <b>Late</b>.</p>' : ''}
        <form data-lmsform="submit" data-a="${esc(a.id)}" data-c="${esc(cid)}">
        <div class="field"><label for="lms-text">Your answer or notes</label><textarea id="lms-text" class="ta" rows="8" maxlength="20000" data-lmsd="text" data-a="${esc(a.id)}">${esc(d.text)}</textarea></div>
        ${li && li.kind === 'write' && savedWriting(a.linkTo.slice(6)) ? `<div class="row"><button type="button" class="btn ghost" data-lms="insertw" data-a="${esc(a.id)}" data-c="${esc(cid)}">Insert my saved writing from this unit</button></div>` : ''}
        <div class="field"><label for="lms-link">Link to your work (optional)</label><input id="lms-link" class="input" type="url" inputmode="url" placeholder="https://" value="${esc(d.link)}" data-lmsd="link" data-a="${esc(a.id)}"></div>
        <div class="field"><label for="lms-file">Files (optional)</label>${canUp ? `<input id="lms-file" class="input" type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.mp4,.webm,.txt,.csv,.md" data-lmsfile="${esc(a.id)}" data-c="${esc(cid)}" ${d.busy ? 'disabled' : ''}><span class="hint">PDF, images, video or text, up to 20 MB each.</span>` : `<p class="hint">${ASSETS === undefined ? 'Checking file upload…' : 'File upload is not available for your account here. Put your file in Google Drive or OneDrive and paste the share link above.'}</p>`}
        ${d.files.length ? `<ul class="lms-files">${d.files.map((f, i) => `<li><a href="/_blob/${esc(f.id)}" target="_blank" rel="noopener">${esc(f.name)}</a> <button type="button" class="linkbtn" data-lms="rmfile" data-a="${esc(a.id)}" data-i="${i}" aria-label="Remove ${esc(f.name)}">Remove</button></li>`).join('')}</ul>` : ''}</div>
        <div class="row"><button type="submit" class="btn go" ${d.busy ? 'disabled' : ''}>${d.busy ? 'Working…' : s ? 'Resubmit' : 'Submit'}</button><span class="hint">You can resubmit until your teacher marks it.</span></div></form></div>`;
    }
    return h;
  }
  function subBody(s) {
    return `${s.text ? `<p class="lms-pre lms-subtext">${esc(s.text)}</p>` : ''}${safeUrl(s.link) ? `<p><a href="${esc(safeUrl(s.link))}" target="_blank" rel="noopener noreferrer">${esc(s.link)}</a></p>` : ''}${Array.isArray(s.files) && s.files.length ? `<ul class="lms-files">${s.files.filter(f => f && okSeg(String(f.id))).map(f => `<li><a href="/_blob/${esc(f.id)}" target="_blank" rel="noopener">${esc(f.name || 'file')}</a> <span class="hint">${esc(Math.round(num(f.size, 0) / 1024))} KB</span></li>`).join('')}</ul>` : ''}${!s.text && !s.link && !(s.files || []).length ? '<p class="hint">Empty submission.</p>' : ''}`;
  }
  function rubricView(r) {
    if (!r || typeof r !== 'object' || !Object.keys(r).length) return '';
    return `<details class="fold"><summary>Rubric breakdown</summary><div class="tablewrap"><table class="lms-t"><thead><tr><th>Criterion</th><th>Level</th><th>Marks</th></tr></thead><tbody>${Object.entries(r).map(([k, v]) => `<tr><td>${esc(v && v.c || k)}</td><td>${esc(v && v.level || '')}</td><td>${esc(v && v.m)}/${esc(v && v.max)}</td></tr>`).join('')}</tbody></table></div></details>`;
  }
  function myGradesInner() {
    const gate = statusCard('see your grades'); if (gate) return gradesHero() + gate;
    if (!L.uid) return gradesHero() + `<div class="card"><p>This view is for students.</p></div>`;
    if (!L.own.loaded) return gradesHero() + `<div class="card"><p role="status">Loading your grades…</p></div>`;
    const ids = myClassIds(), cid = ids[0], info = (cid && L.info[cid]) || {};
    const assigns = ids.flatMap(c => L.assign[c] || []);
    const row = studentRow(L.own.grades, L.marks.ovr, L.marks.a, L.own.subs, assigns, info);
    const cols = Object.values(row.cols).sort((a, b) => a.order - b.order);
    let h = gradesHero();
    h += `<div class="card"><h2>Indicative overall</h2><div class="lms-kpis"><div><small>Weighted total</small><b>${pctStr(row.total)}</b></div><div><small>Indicative band</small><b>${esc(row.band || '–')}</b></div><div><small>Assignments handed in</small><b>${row.submitted}/${assigns.length}</b></div><div><small>Missing</small><b>${row.missing}</b></div></div>
      <p class="hint">Weighting${info.name ? ' for ' + esc(info.name) : ''}: ${['p1', 'p2', 'sba', 'cw'].filter(k => weightsOf(info.weights)[k] > 0).map(k => esc(CATS[k]) + ' ' + weightsOf(info.weights)[k] + '%').join(' · ')}. Based on ${row.coverage}% of the weighting so far. Bands I to VII here are an indicative guide from your teacher's gradebook, not CXC's grade boundaries.</p></div>`;
    const ac = cols.filter(c => c.kind === 'assign'), cc = cols.filter(c => c.kind !== 'assign');
    h += `<div class="card"><h2>Assignments</h2>${ac.length ? `<div class="tablewrap"><table class="lms-t"><thead><tr><th scope="col">Assignment</th><th scope="col">Status</th><th scope="col">Mark</th><th scope="col">Feedback</th></tr></thead><tbody>${ac.map(c => { const a = c.assign; const st = c.mark ? 'marked' : c.sub ? 'submitted' : c.missing ? 'overdue' : 'upcoming'; return `<tr><td><button type="button" class="linkbtn" data-go="lmsclass" data-k="${esc(a.id)}" data-sub="${esc(ids.find(x => (L.assign[x] || []).includes(a)) || cid)}">${esc(a.title)}</button></td><td>${st === 'overdue' ? '<span class="lms-pill bad">Missing</span>' : stPill(st, c.sub && c.sub.late)}</td><td>${c.mark ? esc(c.mark.score) + '/' + esc(c.mark.max || a.points) : '–'}${c.override != null ? ` <span class="hint">(adjusted to ${pctStr(c.override)})</span>` : ''}</td><td>${c.mark && c.mark.feedback ? `<span class="lms-pre">${esc(c.mark.feedback)}</span>` : c.reason ? esc(c.reason) : ''}</td></tr>`; }).join('')}</tbody></table></div>` : '<p class="hint">No assignments yet.</p>'}</div>`;
    h += `<div class="card"><h2>Course tests, papers and labs</h2>${cc.length ? `<div class="tablewrap"><table class="lms-t"><thead><tr><th scope="col">Assessment</th><th scope="col">Best</th><th scope="col">Latest</th><th scope="col">Attempts</th><th scope="col">Teacher note</th></tr></thead><tbody>${cc.map(c => `<tr><td>${esc(c.title)}<br><span class="hint">${esc(CATS[c.cat] || '')}</span></td><td><b>${pctStr(c.best)}</b>${c.override != null ? `<br><span class="hint">Teacher mark: ${pctStr(c.override)}</span>` : ''}</td><td>${pctStr(c.latest)}<br><span class="hint">${esc(fmtDate(c.latestAt))}</span></td><td>${c.attempts.length}</td><td>${esc(c.reason || '')}</td></tr>`).join('')}</tbody></table></div>` : '<p class="hint">Finish a module test, a Paper 01 or a lab in the online course and your results appear here.</p>'}</div>`;
    return h;
  }
  function gradesHero() { return `<div class="hero"><span class="eyebrow">Digital Media Unit 1 · My grades</span><h1>My grades</h1><p>Your results, marks and feedback from your teacher.</p></div><p id="lms-live" class="sr" role="status" aria-live="polite"></p>`; }

  /* home page card (engine hook window.COURSE_HOME_CARDS) */
  function homeInner() {
    if (L.st !== 'ready' || !L.uid || !L.own.loaded) return '';
    const ids = myClassIds();
    if (!ids.length) return L.teacher ? '' : `<div class="card lms-homecard"><div class="card-top"><h3>My class</h3></div><p class="hint">Got a join code from your teacher? Join your class to see announcements and hand in work.</p><div class="row"><button type="button" class="btn go" data-go="lmsclass">Join my class</button></div></div>`;
    const news = ids.flatMap(c => (L.news[c] || []).map(n => Object.assign({ cid: c }, n))).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || num(b.at, 0) - num(a.at, 0)).slice(0, 2);
    const seen = readMap(), un = unreadTotal();
    return `<div class="card lms-homecard"><div class="card-top"><h3>My class${un ? ` <span class="lms-pill gold">${un} new</span>` : ''}</h3><button type="button" class="btn ghost" data-go="lmsclass">Open My class →</button></div>
      ${news.length ? `<ul class="lms-news">${news.map(n => `<li class="${n.pinned ? 'pin' : ''}"><div class="lms-nh"><b>${n.pinned ? '📌 ' : ''}${esc(n.title)}</b>${num(n.at, 0) > num(seen[n.cid], 0) ? '<span class="lms-pill gold">New</span>' : ''}<span class="hint">${esc(fmtDate(n.at))}</span></div></li>`).join('')}</ul>` : ''}
      <h4>To do</h4>${todoHTML(3, true)}</div>`;
  }
  (window.COURSE_HOME_CARDS = window.COURSE_HOME_CARDS || []).push(() => `<div id="lms-home" class="lms" style="display:contents">${homeInner()}</div>`);

  /* ---------------- forms and clicks ---------------- */
  const F = { code: '', joinMsg: '' };
  document.addEventListener('submit', e => {
    const f = e.target.closest && e.target.closest('[data-lmsform]'); if (!f) return;
    e.preventDefault();
    const k = f.dataset.lmsform;
    if (k === 'join') { const v = (document.getElementById('lms-code') || {}).value || ''; F.code = v; F.joinMsg = 'Checking the code…'; schedule(); joinClass(v).then(r => { F.joinMsg = r.msg; if (r.ok) F.code = ''; schedule(); announce(r.msg); }); return; }
    if (k === 'submit') { const cid = f.dataset.c, a = (L.assign[cid] || []).find(x => x.id === f.dataset.a); if (a) submit(a, cid); return; }
    const h = HANDLERS.submit[k]; if (h) h(f, e);
  });
  document.addEventListener('input', e => {
    const t = e.target; if (!t || !t.closest) return;
    if (t.id === 'lms-code') { F.code = t.value; return; }
    if (t.dataset && t.dataset.lmsd) { const a = Object.values(L.assign).flat().find(x => x.id === t.dataset.a); if (a) draftFor(a)[t.dataset.lmsd] = t.value; return; }
    const h = HANDLERS.input; h.forEach(fn => { try { fn(t, e); } catch (err) { } });
  });
  document.addEventListener('change', e => {
    const t = e.target; if (!t || !t.dataset) return;
    if (t.dataset.lmsfile) { const cid = t.dataset.c, a = (L.assign[cid] || []).find(x => x.id === t.dataset.lmsfile); if (a && t.files && t.files.length) uploadFiles(a, t.files); return; }
    HANDLERS.change.forEach(fn => { try { fn(t, e); } catch (err) { } });
  });
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-lms]'); if (!b) return;
    const k = b.dataset.lms;
    if (k === 'leave') { if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = 'Tap again to leave'; setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; } }, 3000); return; } leaveClass(b.dataset.c); return; }
    if (k === 'rmfile') { const a = Object.values(L.assign).flat().find(x => x.id === b.dataset.a); if (a) { draftFor(a).files.splice(+b.dataset.i, 1); schedule(); announce('File removed. Press Submit to save the change.'); } return; }
    if (k === 'insertw') { const cid = b.dataset.c, a = (L.assign[cid] || []).find(x => x.id === b.dataset.a); if (a) { const d = draftFor(a), t = savedWriting(a.linkTo.slice(6)); if (t) { d.text = d.text ? d.text + '\n\n' + t : t; schedule(); announce('Your saved writing was added.'); } } return; }
    const h = HANDLERS.click[k]; if (h) { try { h(b, e); } catch (err) { toast('Error: ' + err.message); } }
  });
  const HANDLERS = { click: {}, submit: {}, input: [], change: [] };

  /* ---------------- plugin registration ---------------- */
  function register(o) {
    VIEWS[o.view] = o;
    (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
      view: o.view,
      get title() { return typeof o.title === 'function' ? o.title() : o.title; },
      /* a getter: the engine lists only plugins with a tile, so hidden views get no menu entry */
      get tile() { return o.visible() ? o.tile : undefined; },
      render(api, loc) { API = api; ensureCSS(); return `<div id="lms-root" class="lms" data-view="${o.view}">${safeInner(o.view, loc)}</div>`; },
      mount(api, loc) { API = api; afterPaint(o.view, loc); if (o.mount) { try { o.mount(loc); } catch (e) { } } }
    });
  }
  const studentVisible = () => (L.st === 'ready' && !!L.uid) || L.st === 'signedout';
  register({ view: 'lmsclass', title: () => 'My class' + (unreadTotal() ? ' · ' + unreadTotal() + ' new' : ''), tile: { icon: '🏫', meta: 'Join your class with a code, read announcements and hand in assignments' }, visible: studentVisible, inner: myClassInner });
  register({ view: 'lmsgrades', title: 'My grades', tile: { icon: '📊', meta: 'Your marks, feedback and an indicative weighted total' }, visible: studentVisible, inner: myGradesInner });

  /* ---------------- styles ---------------- */
  function ensureCSS() {
    if (document.getElementById('lms-css')) return;
    const st = document.createElement('style'); st.id = 'lms-css';
    st.textContent = `.lms{display:flex;flex-direction:column;gap:16px;min-width:0}
.lms .select,.lms .input,.lms textarea{max-width:100%;min-width:0}
.lms select:focus-visible,.lms [tabindex]:focus-visible,.lms .lms-row:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.lms-pill{display:inline-block;border-radius:99px;padding:1px 9px;font-size:.74rem;font-weight:700;letter-spacing:.03em;border:1px solid var(--line);background:var(--raise);white-space:nowrap;margin:2px 4px 2px 0}
.lms-pill.ok{background:var(--soft-ok);border-color:transparent}.lms-pill.bad{background:var(--soft-bad);border-color:transparent}.lms-pill.warn,.lms-pill.gold{background:var(--soft-gold);border-color:var(--gold)}
.lms-news,.lms-todo,.lms-files{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.lms-news li{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--raise)}.lms-news li.pin{border-color:var(--gold)}
.lms-nh{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:baseline}
.lms-pre{white-space:pre-wrap;overflow-wrap:anywhere}
.lms-row{display:flex;justify-content:space-between;gap:10px;align-items:center;width:100%;text-align:left;border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--raise);color:inherit;flex-wrap:wrap}
.lms-row:hover{border-color:var(--blue)}.lms-rt{display:flex;flex-direction:column;min-width:0;flex:1 1 200px}.lms-rs{display:flex;flex-wrap:wrap;gap:4px}
.lms-join{display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap}.lms-join .field{flex:1 1 200px}
.lms-code{text-transform:uppercase;letter-spacing:.2em;font-weight:700;font-size:1.2rem}
.lms-big{font-size:2rem;font-weight:800;font-family:var(--f-display)}
.lms-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}.lms-kpis>div{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--raise);display:flex;flex-direction:column}.lms-kpis b{font-size:1.5rem;font-family:var(--f-display)}.lms-kpis small{color:var(--muted)}
.lms-t{width:100%;border-collapse:collapse;font-size:.92rem}.lms-t th,.lms-t td{padding:8px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
.lms-t thead th{position:sticky;top:0;background:var(--surface);z-index:1}
.lms-t .num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.lms-t tr.risk td:first-child{box-shadow:inset 4px 0 0 var(--bad)}
.lms-t th button{background:none;border:0;padding:0;font:inherit;font-weight:700;color:inherit;text-decoration:underline dotted}
.lms-flag{color:var(--bad);font-weight:700}
.lms-sticky{position:sticky;left:0;background:var(--surface);z-index:2}
.lms-cell{display:flex;flex-direction:column;gap:2px;min-width:72px}.lms-cell b{font-size:1rem}.lms-cell button{text-align:left}
.lms-toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end}.lms-toolbar .field{flex:1 1 180px}
.lms-tabs{display:flex;flex-wrap:wrap;gap:6px}
.lms-copy{width:100%;min-height:140px;font:13px/1.45 ui-monospace,Menlo,Consolas,monospace}
.lms-steps{margin:0;padding-left:1.3em;display:flex;flex-direction:column;gap:6px}
.lms-timeline{list-style:none;margin:0;padding:0;border-left:3px solid var(--line);display:flex;flex-direction:column;gap:10px}.lms-timeline li{padding-left:12px;position:relative}.lms-timeline li:before{content:'';position:absolute;left:-8px;top:.55em;width:13px;height:13px;border-radius:50%;background:var(--blue)}
.lms-rub td{vertical-align:top}.lms-rub label{display:flex;gap:6px;align-items:flex-start;font-size:.86rem}
.lms-gate{border-color:var(--gold)}
@media (max-width:600px){.lms-t{font-size:.86rem}.lms-t th,.lms-t td{padding:6px}.lms-kpis b{font-size:1.25rem}.lms-big{font-size:1.6rem}}`;
    document.head.appendChild(st);
  }

  /* ---------------- exports for tools/lms_teacher.js ---------------- */
  window.DM_LMS = {
    VERSION, L, CATS, PRESETS, BANDS, ready, esc, okSeg, seg, num, rid, code6, fmtDate, band, pctStr, colKey, safeUrl, lsGet, lsSet,
    catalogue: cat, linkInfo, linkGo, testIdFor, colForTestId, courseOrder, defaultCat, weightsOf, studentRow, writeDoc, errMsg, schedule, announce, toast,
    register, HANDLERS, F, subBody, rubricView, sub, unsub, refreshNav: () => { navSig = ''; navBadge(); },
    get api() { return API || window.COURSE_API; },
    /* for tests and the console: what this viewer is */
    status: () => ({ st: L.st, teacher: L.teacher, signedIn: !!L.uid, classes: myClassIds().length })
  };
  setTimeout(() => { boot().catch(() => finish('offline')); }, 0);
})();
