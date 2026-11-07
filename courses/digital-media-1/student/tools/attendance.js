/* Attendance register: the daily class register for the Teacher Edition only. — Developed by Kester Small
   Storage: the artifact `db` capability when the online Teacher Edition grants it, otherwise this browser's localStorage.
   db paths:  register/classes                  {classes:[{id,name,students:[{id,name,active}]}]}
              attendance/<classId>__<YYYY-MM-DD> {classId,date,marks:{sid:'P'|'L'|'A'|'E'},notes:{sid:'...'},lesson,updatedAt}
   No student names are stored in this file: the register starts empty and the teacher types her own class lists. */
(function () {
  'use strict';
  const TZ = 'America/Lower_Princes';
  const LSK = 'capeDM1.att.';
  const REG = 'register/classes';
  const MARKS = [['P', 'Present'], ['L', 'Late'], ['A', 'Absent'], ['E', 'Excused']];
  const MW = { P: 'Present', L: 'Late', A: 'Absent', E: 'Excused' };
  const DEBOUNCE = 600;
  const LOCAL_BANNER = 'Saved on this device only — open the online Teacher Edition to save permanently.';
  let API = null;

  /* ---------- small helpers ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clone = o => JSON.parse(JSON.stringify(o));
  const lsGet = k => { try { const v = localStorage.getItem(LSK + k); return v == null ? null : JSON.parse(v); } catch (e) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(LSK + k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  const lsDel = k => { try { localStorage.removeItem(LSK + k); } catch (e) { } };
  const lsKeys = pre => { const out = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf(LSK + pre) === 0) out.push(k.slice(LSK.length)); } } catch (e) { } return out; };
  function rid(p) {
    let s = '';
    try { const a = new Uint32Array(2); crypto.getRandomValues(a); s = a[0].toString(36) + a[1].toString(36); } catch (e) { s = Math.random().toString(36).slice(2) + Date.now().toString(36); }
    return p + s.slice(0, 12);
  }
  function today() {
    try {
      const p = {}; new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).forEach(x => { p[x.type] = x.value; });
      if (p.year && p.month && p.day) return p.year + '-' + p.month + '-' + p.day;
    } catch (e) { }
    return new Date(Date.now() - 4 * 3600e3).toISOString().slice(0, 10); /* Sint Maarten is UTC-4 all year */
  }
  const isDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s || '');
  const dUTC = s => { const [y, m, d] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  const iso = dt => dt.toISOString().slice(0, 10);
  const addDays = (s, n) => { const d = dUTC(s); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
  const isWeekend = s => [0, 6].includes(dUTC(s).getUTCDay());
  const schoolStep = (s, dir) => { let d = addDays(s, dir); while (isWeekend(d)) d = addDays(d, dir); return d; };
  const fmt = (s, o) => { try { return dUTC(s).toLocaleDateString('en-GB', Object.assign({ timeZone: 'UTC' }, o)); } catch (e) { return s; } };
  const fmtLong = s => fmt(s, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const fmtMonth = ym => fmt(ym + '-01', { month: 'long', year: 'numeric' });
  const wkShort = s => fmt(s, { weekday: 'short' });
  const addMonth = (ym, n) => { const [y, m] = ym.split('-').map(Number); return iso(new Date(Date.UTC(y, m - 1 + n, 1))).slice(0, 7); };
  function schoolYear(s) { const [y, m] = s.split('-').map(Number); const start = m >= 8 ? y : y - 1; return { from: start + '-08-01', to: (start + 1) + '-07-31', start }; }
  const monthDays = ym => { const out = []; let d = ym + '-01'; while (d.slice(0, 7) === ym) { out.push(d); d = addDays(d, 1); } return out; };
  const toast = m => { try { API ? API.toast(m) : null; } catch (e) { } };
  const pctOf = (a, b) => b ? Math.round(a / b * 100) : null;
  const slug = s => String(s || 'class').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'class';

  /* ---------- state ---------- */
  const UI = lsGet('ui') || {};
  const ST = {
    mode: 'pending', db: null, readonly: false, err: '', notice: '',
    classes: [], regReady: false, days: {}, daysFor: null, daysReady: false, unsubReg: null, unsubDays: null,
    tab: ['take', 'history', 'classes', 'export'].includes(UI.tab) ? UI.tab : 'take',
    classId: UI.classId || null, date: today(), month: today().slice(0, 7), period: UI.period === 'year' ? 'year' : 'month',
    confirm: null, localHas: null, migrating: false, mo: null
  };
  const saveUI = () => lsSet('ui', { tab: ST.tab, classId: ST.classId, period: ST.period });
  const curClass = () => ST.classes.find(c => c.id === ST.classId) || null;
  const dayId = (cid, date) => cid + '__' + date;
  const dayPath = d => 'attreg/' + dayId(d.classId, d.date);
  const rootEl = () => document.getElementById('att-root');

  /* ---------- access: Teacher Edition always; the student course only for the owner or an editor ---------- */
  const isTE = () => !!window.COURSE_TEACHER_EDITION;
  const ACC = { state: 'pending', p: null };
  let USER, userP = null; /* undefined = not asked yet, null = unavailable */
  function getUser() {
    if (!userP) userP = Promise.resolve().then(() => window.claude?.use?.('user')).catch(() => null).then(u => { USER = u || null; return USER; });
    return userP;
  }
  const allowed = () => isTE() || ACC.state === 'yes';
  function checkAccess() {
    if (isTE()) { ACC.state = 'yes'; return Promise.resolve(true); }
    if (ACC.p) return ACC.p;
    ACC.p = getUser().then(async u => {
      let ok = false;
      if (u) { try { const r = await Promise.all([u.isOwner(), u.canEdit()]); ok = !!(r[0] || r[1]); } catch (e) { ok = false; } }
      ACC.state = ok ? 'yes' : 'no';
      const A = window.COURSE_API, v = A && A.S && A.S.loc ? A.S.loc.v : '';
      if (A && (v === 'home' || v === 'attendance')) { try { A.go(A.S.loc); } catch (e) { } } /* menu entry appears now; elsewhere it appears on the next navigation */
      return ok;
    });
    return ACC.p;
  }
  setTimeout(checkAccess, 0); /* after engine.js has run, so COURSE_TEACHER_EDITION is known */

  /* display names: enrolled students are resolved with user.profiles() at render time and never stored */
  const NAMES = {};
  const dispName = s => (s.userId && NAMES[s.userId]) || s.name || (s.userId ? 'Enrolled student (name hidden)' : 'Unnamed student');
  let namesBusy = false;
  function resolveNames() {
    const ids = [...new Set(ST.classes.flatMap(c => c.students.filter(s => s.userId).map(s => s.userId)))];
    if (!ids.length || namesBusy) return;
    if (USER === undefined) { getUser().then(u => { if (u) resolveNames(); }); return; }
    if (!USER || typeof USER.profiles !== 'function') return;
    namesBusy = true;
    USER.profiles(ids).then(ps => {
      let ch = false;
      ids.forEach(id => { const n = (ps && ps[id] && ps[id].name) || ''; if (NAMES[id] !== n) { NAMES[id] = n; ch = true; } });
      namesBusy = false; if (ch) paint();
    }).catch(() => { namesBusy = false; });
  }

  /* LMS enrolments (written by the LMS at lms/classes and lms/enrol/{classId}/{userId}); read lazily, only when the Classes tab is open */
  const LMS = { checked: 0, busy: false, classes: [] };
  const okSeg = s => typeof s === 'string' && s.length > 0 && s.length < 200 && /^[A-Za-z0-9_\-.~:@+]+$/.test(s) && s !== '.' && s !== '..';
  function normLms(d) {
    if (!d) return [];
    const src = Array.isArray(d.classes) ? d.classes : d.classes && typeof d.classes === 'object' ? Object.entries(d.classes).map(([id, v]) => Object.assign({ id }, v && typeof v === 'object' ? v : { name: String(v) })) : [];
    return src.filter(x => x && okSeg(String(x.id))).slice(0, 40).map(x => ({ id: String(x.id), name: String(x.name || x.title || x.id), n: 0, ids: [] }));
  }
  async function checkLMS() {
    if (ST.mode !== 'db' || LMS.busy || ST.readonly) return;
    if (LMS.checked && Date.now() - LMS.checked < 60000) return;
    LMS.busy = true;
    try {
      const s = await ST.db.doc('lms/classes').get();
      const list = s && s.exists ? normLms(s.data()) : [];
      for (const lc of list) {
        try { const qs = await ST.db.collection('lms/enrol/' + lc.id).get(); lc.ids = [...new Set((qs.docs || []).filter(d => d.exists).map(d => { const b = d.data() || {}; return typeof b.userId === 'string' && b.userId ? b.userId : d.id; }).filter(Boolean))]; lc.n = lc.ids.length; } catch (e) { lc.n = 0; }
      }
      LMS.classes = list.filter(x => x.n > 0);
    } catch (e) { LMS.classes = []; }
    LMS.busy = false; LMS.checked = Date.now(); paint();
  }
  function importLMS() {
    const c = curClass(), sel = document.getElementById('att-lms'); if (!c || !sel || ST.readonly) return;
    const lc = LMS.classes.find(x => x.id === sel.value); if (!lc) return;
    let n = 0;
    lc.ids.forEach(u => { if (!c.students.some(s => s.userId === u)) { c.students.push({ id: rid('s'), userId: u, name: '', active: true }); n++; } });
    c.lmsClassId = lc.id; saveReg(); paint(); focusFk('lmsimport');
    toast(n ? n + ' enrolled student' + (n === 1 ? '' : 's') + ' added.' : 'Everyone enrolled in ' + lc.name + ' is already on this class list.');
    LMS.checked = 0;
  }

  /* ---------- storage: resolve db asynchronously, fall back to localStorage ---------- */
  let dbP = null;
  function resolveDb() {
    if (dbP) return dbP;
    const has = !!(window.claude && typeof window.claude.use === 'function');
    if (!has) { ST.mode = 'local'; dbP = Promise.resolve(null); return dbP; }
    dbP = Promise.resolve().then(() => window.claude?.use?.('db')).catch(() => null).then(db => {
      ST.db = db || null; ST.mode = db ? 'db' : 'local';
      ST.regReady = false; ST.daysFor = null; ST.daysReady = false;
      ST.localHas = db ? localSummary() : null;
      if (rootEl()) { ensureSubs(); paint(); }
      return db;
    });
    return dbP;
  }
  function localSummary() {
    const reg = lsGet(REG), days = lsKeys('attreg/').length, n = reg && Array.isArray(reg.classes) ? reg.classes.length : 0;
    return n || days ? { classes: n, days } : null;
  }

  /* writes: one document at a time, only on change, debounced */
  const W = { pend: new Map(), timers: new Map(), ready: new Set(), inflight: null, running: false, last: new Map(), err: '', idle: [] };
  const isDirty = p => W.pend.has(p) || W.inflight === p;
  function queueWrite(path, body, delay) {
    if (ST.readonly) return;
    W.pend.set(path, body == null ? null : clone(body));
    clearTimeout(W.timers.get(path));
    W.timers.set(path, setTimeout(() => { W.timers.delete(path); W.ready.add(path); pump(); }, delay == null ? DEBOUNCE : delay));
    status();
  }
  function flushNow() { [...W.timers.keys()].forEach(p => { clearTimeout(W.timers.get(p)); W.timers.delete(p); W.ready.add(p); }); pump(); }
  async function rawWrite(path, body) {
    if (ST.mode === 'db') { const ref = ST.db.doc(path); return body == null ? ref.delete() : ref.set(body); }
    if (body == null) { lsDel(path); return; }
    if (!lsSet(path, body)) throw { code: 'local_full', message: 'This browser would not store the register.' };
  }
  async function pump() {
    if (W.running) return; W.running = true; status();
    try {
      while (W.ready.size) {
        const path = W.ready.values().next().value; W.ready.delete(path);
        if (!W.pend.has(path)) continue;
        const body = W.pend.get(path); W.pend.delete(path);
        const sig = body == null ? 'null' : JSON.stringify(body);
        if (W.last.get(path) === sig) continue; /* unchanged: no write */
        W.inflight = path; status();
        try { await rawWrite(path, body); W.last.set(path, sig); W.err = ''; }
        catch (e) {
          const code = (e && e.code) || 'unavailable';
          if (code === 'invalid_argument' && ST.mode === 'db') { ST.readonly = true; W.err = 'You can see this register, but your changes cannot be saved. Only the course owner and editors can change it.'; W.pend.clear(); W.ready.clear(); }
          else if (code === 'quota_exceeded') W.err = 'The online register is full, so this change was not saved. Export old months to CSV, then clear some days.';
          else if (code === 'revoked') { W.err = 'Online saving has stopped on this page. Reload the Teacher Edition.'; }
          else {
            await new Promise(r => setTimeout(r, 500 + Math.random() * 900));
            try { await rawWrite(path, body); W.last.set(path, sig); W.err = ''; }
            catch (e2) { W.err = 'Not saved: check your connection, then make the change again.'; if (!W.pend.has(path)) W.pend.set(path, body); }
          }
        }
        W.inflight = null;
      }
    } finally { W.running = false; W.inflight = null; status(); if (!W.pend.size && !W.ready.size) { const q = W.idle.splice(0); q.forEach(f => f()); } }
    if (W.err && ST.readonly) paint();
  }
  const whenIdle = () => new Promise(r => { if (!W.running && !W.pend.size && !W.ready.size) r(); else W.idle.push(r); });
  try { window.addEventListener('pagehide', flushNow); document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushNow(); }); } catch (e) { }

  let lastStatus = '';
  function status() {
    const el = document.getElementById('att-status'); if (!el) return;
    let t, k;
    if (W.err) { t = W.err; k = 'bad'; }
    else if (W.running || W.pend.size || W.ready.size) { t = 'Saving…'; k = 'busy'; }
    else if (ST.mode === 'pending') { t = 'Connecting to the online register…'; k = 'busy'; }
    else { t = ST.mode === 'db' ? 'Saved ✓' : 'Saved on this device ✓'; k = 'ok'; }
    if (t === lastStatus && el.textContent === t) return;
    lastStatus = t; el.textContent = t; el.dataset.k = k;
  }

  /* subscriptions: once per view; never from render */
  function onReg(snap) {
    if (isDirty(REG)) return;
    const data = snap && snap.exists ? snap.data() : null;
    const list = data && Array.isArray(data.classes) ? clone(data.classes) : [];
    W.last.set(REG, JSON.stringify({ classes: list }));
    const changed = !ST.regReady || JSON.stringify(list) !== JSON.stringify(ST.classes);
    ST.classes = list; ST.regReady = true;
    if (changed) { ensureSubs(); paint(); }
  }
  function onDays(qs) {
    const next = {};
    (qs.docs || []).forEach(d => { if (!d.exists) return; const b = d.data(); if (b && b.classId === ST.daysFor) { next[d.id] = clone(b); W.last.set('attreg/' + d.id, JSON.stringify(b)); } });
    Object.keys(ST.days).forEach(id => { if (isDirty('attreg/' + id)) next[id] = ST.days[id]; });
    W.pend.forEach((b, p) => { if (p.indexOf('attreg/' + ST.daysFor + '__') === 0) { const id = p.slice(7); if (b) next[id] = clone(b); else delete next[id]; } });
    const changed = !ST.daysReady || JSON.stringify(next) !== JSON.stringify(ST.days);
    ST.days = next; ST.daysReady = true;
    if (changed) paint();
  }
  function onSubErr(e) {
    const code = (e && e.code) || 'unavailable';
    ST.err = code === 'revoked' ? 'The online register is no longer available on this page.' : 'The online register could not be loaded (' + code + '). Reload the page to try again.';
    ST.unsubReg = null; ST.unsubDays = null; ST.daysFor = null; paint();
  }
  function ensureSubs() {
    if (ST.mode === 'pending') return;
    if (ST.mode === 'db') {
      if (!ST.unsubReg) { try { ST.unsubReg = ST.db.doc(REG).onSnapshot(onReg, onSubErr); } catch (e) { onSubErr(e); return; } }
    } else if (!ST.regReady) {
      const r = lsGet(REG); ST.classes = r && Array.isArray(r.classes) ? r.classes : []; ST.regReady = true;
    }
    if (!ST.regReady) return;
    if (!curClass()) ST.classId = ST.classes.length ? ST.classes[0].id : null;
    if (!ST.classId) { ST.days = {}; ST.daysFor = null; ST.daysReady = true; return; }
    if (ST.daysFor === ST.classId) return;
    if (ST.unsubDays) { try { ST.unsubDays(); } catch (e) { } ST.unsubDays = null; }
    ST.days = {}; ST.daysReady = false; ST.daysFor = ST.classId;
    if (ST.mode === 'db') {
      try { ST.unsubDays = ST.db.collection('attreg').where('classId', '==', ST.classId).onSnapshot(onDays, onSubErr); } catch (e) { onSubErr(e); }
    } else {
      const pre = 'attreg/' + ST.classId + '__';
      lsKeys(pre).forEach(k => { const b = lsGet(k); if (b) ST.days[k.slice(7)] = b; });
      W.pend.forEach((b, p) => { if (p.indexOf(pre) === 0) { if (b) ST.days[p.slice(7)] = clone(b); else delete ST.days[p.slice(7)]; } });
      ST.daysReady = true;
    }
  }
  function unsubAll() {
    if (ST.unsubReg) { try { ST.unsubReg(); } catch (e) { } }
    if (ST.unsubDays) { try { ST.unsubDays(); } catch (e) { } }
    ST.unsubReg = null; ST.unsubDays = null; ST.daysFor = null;
    if (ST.mode === 'local') ST.regReady = false;
    flushNow();
  }

  /* ---------- data changes ---------- */
  const saveReg = (delay) => queueWrite(REG, { classes: ST.classes }, delay == null ? 300 : delay);
  function dayDoc(create) {
    const id = dayId(ST.classId, ST.date); let d = ST.days[id];
    if (!d && create) d = ST.days[id] = { classId: ST.classId, date: ST.date, marks: {}, notes: {}, lesson: '', updatedAt: '' };
    return d;
  }
  function touchDay(d) {
    d.marks = d.marks || {}; d.notes = d.notes || {};
    Object.keys(d.notes).forEach(k => { if (!String(d.notes[k]).trim()) delete d.notes[k]; });
    const empty = !Object.keys(d.marks).length && !Object.keys(d.notes).length && !String(d.lesson || '').trim();
    const path = dayPath(d);
    if (empty) { delete ST.days[dayId(d.classId, d.date)]; queueWrite(path, null); return; }
    d.updatedAt = new Date().toISOString();
    queueWrite(path, d);
  }
  function setMark(sid, m, toggle) {
    if (ST.readonly) return;
    const d = dayDoc(true);
    if (toggle && d.marks[sid] === m) delete d.marks[sid]; else d.marks[sid] = m;
    touchDay(d);
  }
  function rosterFor(d) {
    const c = curClass(); if (!c) return [];
    return c.students.filter(s => s.active !== false || (d && ((d.marks || {})[s.id] || (d.notes || {})[s.id])));
  }
  function recordedDays(cid) { return Object.values(ST.days).filter(d => d.classId === cid).sort((a, b) => a.date < b.date ? -1 : 1); }
  function studentHasRecords(sid) { return recordedDays(ST.classId).some(d => (d.marks || {})[sid] || (d.notes || {})[sid]); }
  function stats(sid, days) {
    const o = { n: 0, P: 0, L: 0, A: 0, E: 0 };
    days.forEach(d => { const m = (d.marks || {})[sid]; if (m && o[m] != null) { o[m]++; o.n++; } });
    o.pct = pctOf(o.P + o.L, o.n); return o;
  }
  const flag = pct => pct == null ? '' : pct < 80 ? '<span class="ribbon att-flag att-f80">⚠ Below 80%</span>' : pct < 90 ? '<span class="ribbon att-flag att-f90">Below 90%</span>' : '';

  async function migrate() {
    if (ST.mode !== 'db' || ST.migrating) return;
    ST.migrating = true; paint();
    try {
      const reg = lsGet(REG), keys = lsKeys('attreg/');
      const byId = new Map(ST.classes.map(c => [c.id, c]));
      ((reg && reg.classes) || []).forEach(c => { const ex = byId.get(c.id); if (!ex) ST.classes.push(clone(c)); else (c.students || []).forEach(s => { if (!ex.students.some(x => x.id === s.id)) ex.students.push(clone(s)); }); });
      saveReg(0);
      for (const k of keys) {
        const b = lsGet(k); if (!b || !b.classId || !b.date) continue;
        const snap = await ST.db.doc(k).get();
        if (!snap.exists) { queueWrite(k, b, 0); if (b.classId === ST.daysFor) ST.days[k.slice(7)] = clone(b); }
      }
      flushNow(); await whenIdle();
      if (!W.err) { lsDel(REG); keys.forEach(lsDel); ST.localHas = null; toast('Device records copied to the online register.'); }
    } catch (e) { W.err = 'The device records could not be copied: ' + ((e && e.message) || 'try again'); status(); }
    ST.migrating = false; ensureSubs(); paint();
  }

  /* ---------- CSV and print ---------- */
  function csvCell(v) {
    let s = String(v == null ? '' : v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function csvFor(from, to) {
    const c = curClass(); if (!c) return null;
    const rows = [['Date', 'Class', 'Student', 'Mark', 'Note']];
    recordedDays(c.id).filter(d => d.date >= from && d.date <= to).forEach(d => {
      c.students.forEach(s => { const m = (d.marks || {})[s.id] || '', n = (d.notes || {})[s.id] || ''; if (m || n) rows.push([d.date, c.name, dispName(s), m, n]); });
    });
    return { text: '﻿' + rows.map(r => r.map(csvCell).join(',')).join('\r\n') + '\r\n', n: rows.length - 1 };
  }
  async function download(filename, data) {
    let dl = null;
    try { dl = await window.claude?.use?.('downloads'); } catch (e) { dl = null; }
    if (dl) {
      try { await dl.save({ filename, data }); toast('Saved ' + filename); return; }
      catch (e) {
        const code = e && e.code;
        if (code === 'declined') return;
        if (code === 'rate_limited') { toast('A save is already waiting for you. Try again in a moment.'); return; }
        if (!['unavailable', 'not_granted', 'capability_disabled', 'capability_removed'].includes(code)) { toast('The download did not work: ' + ((e && e.message) || code || 'try again')); return; }
      }
    }
    try {
      const url = URL.createObjectURL(new Blob([data], { type: 'text/csv;charset=utf-8' }));
      const a = document.createElement('a'); a.href = url; a.download = filename; a.rel = 'noopener'; a.style.display = 'none';
      document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
      toast('Downloading ' + filename);
    } catch (e) { toast('This browser blocked the download.'); }
  }
  function exportCSV(kind) {
    const c = curClass(); if (!c) return;
    let from, to, name;
    if (kind === 'year') { const y = schoolYear(ST.month + '-01'); from = y.from; to = y.to; name = 'attendance_' + slug(c.name) + '_school-year-from-' + y.start + '-08.csv'; }
    else { from = ST.month + '-01'; to = ST.month + '-31'; name = 'attendance_' + slug(c.name) + '_' + ST.month + '.csv'; }
    const out = csvFor(from, to);
    if (!out.n) { toast('There are no records to export for that period.'); return; }
    download(name, out.text);
  }
  function printHTML() {
    const c = curClass(); if (!c) return '';
    const dates = monthDays(ST.month).filter(d => !isWeekend(d) || ST.days[dayId(c.id, d)]);
    const docs = dates.map(d => ST.days[dayId(c.id, d)] || null);
    const mdocs = docs.filter(Boolean);
    const studs = c.students.filter(s => s.active !== false || mdocs.some(d => (d.marks || {})[s.id]));
    return `<div class="attp"><div class="attp-h"><div><b>CAPE Digital Media Unit 1</b><br>Attendance register: <b>${esc(c.name)}</b> · ${esc(fmtMonth(ST.month))}</div><div class="attp-r">Teacher: Ms. Kester Small<br>Printed ${esc(fmtLong(today()))}</div></div>
      <table class="attp-t"><thead><tr><th class="attp-n">#</th><th class="attp-s">Student</th>${dates.map(d => `<th>${+d.slice(8)}<br><small>${esc(wkShort(d).slice(0, 2))}</small></th>`).join('')}<th>P</th><th>L</th><th>A</th><th>E</th><th>%</th></tr></thead>
      <tbody>${studs.map((s, i) => { const st = stats(s.id, mdocs); return `<tr><td class="attp-n">${i + 1}</td><td class="attp-s">${esc(dispName(s))}${s.active === false ? ' (left)' : ''}</td>${docs.map(d => `<td>${d && (d.marks || {})[s.id] ? esc(d.marks[s.id]) : ''}</td>`).join('')}<td>${st.P}</td><td>${st.L}</td><td>${st.A}</td><td>${st.E}</td><td>${st.pct == null ? '' : st.pct + '%'}</td></tr>`; }).join('')}</tbody></table>
      <p class="attp-k">Key: P = Present · L = Late · A = Absent · E = Excused. Attendance % = (Present + Late) ÷ days recorded; Late counts as present. Weekdays without a record are left blank for handwritten entries.</p>
      ${mdocs.some(d => d.lesson) ? `<p class="attp-k"><b>Lessons:</b> ${mdocs.filter(d => d.lesson).map(d => esc(+d.date.slice(8) + ' ' + wkShort(d.date) + ': ' + d.lesson)).join(' · ')}</p>` : ''}
      <div class="attp-sig"><span>Teacher's signature: ______________________</span><span>Checked by: ______________________</span></div></div>`;
  }
  const PRINT_CSS = `@page{size:A4 landscape;margin:10mm}
@media print{html,body{background:#fff!important;color:#000!important}body>*:not(#att-print){display:none!important}#att-print{display:block!important}
.attp{font:10pt/1.3 Arial,Helvetica,sans-serif;color:#000}.attp-h{display:flex;justify-content:space-between;gap:12px;margin-bottom:6mm;font-size:11pt}.attp-r{text-align:right}
.attp-t{width:100%;border-collapse:collapse;table-layout:auto}.attp-t th,.attp-t td{border:1px solid #444;padding:2px 3px;text-align:center;font-size:8.5pt;color:#000;background:#fff}
.attp-t th{background:#eee!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}.attp-t .attp-s{text-align:left;white-space:nowrap;min-width:38mm}.attp-t tr{break-inside:avoid}.attp-t thead{display:table-header-group}
.attp-k{font-size:8.5pt;margin:3mm 0 0}.attp-sig{display:flex;justify-content:space-between;margin-top:10mm;font-size:10pt}}`;
  function printMonth() {
    const c = curClass(); if (!c) return;
    let host = document.getElementById('att-print');
    if (!host) { host = document.createElement('div'); host.id = 'att-print'; document.body.appendChild(host); }
    host.innerHTML = printHTML();
    let st = document.getElementById('att-print-css');
    if (!st) { st = document.createElement('style'); st.id = 'att-print-css'; document.head.appendChild(st); }
    st.textContent = PRINT_CSS;
    const clean = () => { try { st.remove(); host.innerHTML = ''; } catch (e) { } window.removeEventListener('afterprint', clean); };
    window.addEventListener('afterprint', clean);
    try { window.print(); } catch (e) { clean(); toast('Printing is not available here. Download the CSV instead.'); }
  }

  /* ---------- views ---------- */
  const dis = () => ST.readonly ? ' disabled' : '';
  function classSelect(id) {
    return `<div class="field att-f-class"><label for="${id}">Class</label><select id="${id}" class="select" data-att-in="class" data-fk="${id}">${ST.classes.map(c => `<option value="${esc(c.id)}"${c.id === ST.classId ? ' selected' : ''}>${esc(c.name)}</option>`).join('')}</select></div>`;
  }
  function newClassForm(first) {
    return `<div class="att-newclass"><div class="field"><label for="att-newclass">${first ? 'Name your first class' : 'New class name'}</label><div class="att-inline"><input id="att-newclass" class="input" data-fk="newclass" maxlength="60" placeholder="For example, DME1 Upper Six A" autocomplete="off"${dis()}><button type="button" class="btn go" data-att="newclass"${dis()}>Create class</button></div></div></div>`;
  }
  function headHTML() {
    const tabs = [['take', 'Take the register'], ['history', 'History'], ['classes', 'Classes and students'], ['export', 'Export and print']];
    let h = `<div class="card att-head"><div class="att-top"><div><span class="kicker">${isTE() ? 'Teacher Edition' : 'Teachers only'}</span><h1>Attendance register</h1></div></div>
      <p class="hint att-priv">🔒 ${isTE() ? 'This register is private to the Teacher Edition: only people the Teacher Edition is shared with can see it. Students never see it in their course.' : 'This register is private: only the course owner and editors can open it or read its records. Students never see it.'}</p>`;
    if (ST.mode === 'local') h += `<p class="fb note att-banner" role="note">💾 <span><b>${esc(isTE() ? LOCAL_BANNER : 'Saved on this device only — open the online course to save permanently.')}</b></span></p>`;
    if (ST.readonly) h += `<p class="fb bad" role="alert">${esc(W.err || 'Your changes cannot be saved here.')}</p>`;
    if (ST.err) h += `<p class="fb bad" role="alert">${esc(ST.err)}</p>`;
    if (ST.mode === 'db' && ST.localHas && !ST.readonly) h += `<div class="fb note"><span>This browser also holds ${ST.localHas.classes} class${ST.localHas.classes === 1 ? '' : 'es'} and ${ST.localHas.days} recorded day${ST.localHas.days === 1 ? '' : 's'} saved on this device only.</span><div class="row"><button type="button" class="btn ghost" data-att="migrate"${ST.migrating ? ' disabled' : ''}>${ST.migrating ? 'Copying…' : 'Copy them to the online register'}</button></div></div>`;
    h += `<div class="tabs att-tabs" role="tablist" aria-label="Register sections">${tabs.map(([k, n]) => `<button type="button" role="tab" id="att-tab-${k}" aria-selected="${ST.tab === k}" aria-controls="att-panel" tabindex="${ST.tab === k ? 0 : -1}" class="chip ${ST.tab === k ? 'sel' : ''}" data-att="tab" data-t="${k}" data-fk="tab-${k}">${n}</button>`).join('')}</div></div>`;
    return h;
  }
  function takeHTML() {
    const c = curClass();
    if (!c) return `<div class="card"><h2>Start your register</h2><p>Create a class, then add your students. The register starts empty: nobody's name is added for you.</p>${newClassForm(true)}</div>`;
    const d = ST.days[dayId(c.id, ST.date)] || null, marks = (d && d.marks) || {}, notes = (d && d.notes) || {};
    const roster = rosterFor(d);
    const cnt = { P: 0, L: 0, A: 0, E: 0 }; roster.forEach(s => { const m = marks[s.id]; if (m) cnt[m]++; });
    const marked = cnt.P + cnt.L + cnt.A + cnt.E, un = roster.length - marked, pct = pctOf(cnt.P + cnt.L, marked);
    const t = today();
    let h = `<div class="card att-take"><div class="att-bar">${classSelect('att-class')}
      <div class="field att-f-date"><label for="att-date">Date</label><div class="att-inline"><button type="button" class="tool att-step" data-att="prevday" data-fk="prevday" aria-label="Previous school day">‹</button><input type="date" id="att-date" class="input" data-att-in="date" data-fk="date" value="${esc(ST.date)}"><button type="button" class="tool att-step" data-att="nextday" data-fk="nextday" aria-label="Next school day">›</button><button type="button" class="tool" data-att="today" data-fk="today"${ST.date === t ? ' disabled' : ''}>Today</button></div></div></div>
      <p class="att-when"><b>${esc(fmtLong(ST.date))}</b>${ST.date === t ? ' · today' : ''}${isWeekend(ST.date) ? ' · <span class="att-warn">this is a weekend</span>' : ''}${ST.date > t ? ' · <span class="att-warn">this date is in the future</span>' : ''}${d && d.updatedAt ? ` · <span class="hint">last changed ${esc(new Date(d.updatedAt).toLocaleString('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }))}</span>` : ''}</p>
      <div class="field"><label for="att-lesson">Lesson or topic (optional)</label><input id="att-lesson" class="input" data-att-in="lesson" data-fk="lesson" maxlength="160" autocomplete="off" placeholder="For example, Module 1: types of digital media" value="${esc((d && d.lesson) || '')}"${dis()}></div>`;
    if (!ST.daysReady) return h + `<p class="hint">Loading this class's records…</p></div>`;
    if (!roster.length) return h + `<div class="fb note"><span>This class has no students yet.</span><div class="row"><button type="button" class="btn go" data-att="tab" data-t="classes">Add students</button></div></div></div>`;
    h += `<div class="att-counts" aria-label="Counts for this day">
        <span class="att-cnt att-c-P"><b>${cnt.P}</b> Present</span><span class="att-cnt att-c-L"><b>${cnt.L}</b> Late</span><span class="att-cnt att-c-A"><b>${cnt.A}</b> Absent</span><span class="att-cnt att-c-E"><b>${cnt.E}</b> Excused</span>${un ? `<span class="att-cnt att-c-none"><b>${un}</b> not marked</span>` : ''}<span class="att-cnt att-c-pct"><b>${pct == null ? '–' : pct + '%'}</b> present${pct == null ? '' : ' (late counts as present)'}</span></div>
      <div class="row att-actions"><button type="button" class="btn go" data-att="allp" data-fk="allp"${un ? '' : ' disabled'}${dis()}>${!un ? 'Everyone is marked' : marked ? `Mark the other ${un} present` : 'Mark all present'}</button>
      ${d ? (ST.confirm === 'clearday' ? `<span class="att-confirm">Clear every mark, note and the lesson for this day? <button type="button" class="btn no" data-att="clearday-yes" data-fk="clearyes">Yes, clear the day</button><button type="button" class="btn ghost" data-att="cancel" data-fk="clearno">Keep it</button></span>` : `<button type="button" class="btn ghost" data-att="clearday" data-fk="clearday"${dis()}>Clear this day</button>`) : ''}</div>
      <p class="hint att-keys">Keyboard: ↑ ↓ move between students · ← → move between P, L, A and E · press <kbd>P</kbd>, <kbd>L</kbd>, <kbd>A</kbd> or <kbd>E</kbd> to mark the student and move to the next one. Select a mark again to remove it.</p>
      <ol class="att-list">${roster.map((s, i) => {
        const m = marks[s.id] || '', tab = m || 'P';
        return `<li class="att-row ${m ? 'att-r-' + m : 'att-r-none'}" data-sid="${esc(s.id)}"><span class="att-num" aria-hidden="true">${i + 1}</span><span class="att-name" id="att-n-${esc(s.id)}">${esc(dispName(s))}${s.active === false ? ' <span class="ribbon">left the class</span>' : ''}</span>
          <div class="att-marks" role="group" aria-labelledby="att-n-${esc(s.id)}">${MARKS.map(([k, w]) => `<button type="button" class="att-m att-m-${k}${m === k ? ' on' : ''}" data-att="mark" data-m="${k}" data-fk="m-${esc(s.id)}-${k}" aria-pressed="${m === k}" title="${w} (${k})" tabindex="${k === tab ? 0 : -1}"${dis()}><b>${k}</b><span class="att-mw">${w}</span></button>`).join('')}</div>
          <input class="input att-note" data-att-in="note" data-fk="n-${esc(s.id)}" maxlength="200" autocomplete="off" placeholder="Note (optional)" aria-label="Note for ${esc(dispName(s))}" value="${esc(notes[s.id] || '')}"${dis()}></li>`;
      }).join('')}</ol></div>`;
    return h;
  }
  function classesHTML() {
    let h = `<div class="card"><h2>Classes</h2>${ST.classes.length ? `<div class="chips att-cl" role="group" aria-label="Choose a class to edit">${ST.classes.map(c => `<button type="button" class="chip ${c.id === ST.classId ? 'sel' : ''}" aria-pressed="${c.id === ST.classId}" data-att="pickclass" data-c="${esc(c.id)}" data-fk="pc-${esc(c.id)}">${esc(c.name)} · ${c.students.filter(s => s.active !== false).length}</button>`).join('')}</div>` : '<p>No classes yet. The register starts empty; create a class and type in your own class list.</p>'}${newClassForm(!ST.classes.length)}</div>`;
    const c = curClass(); if (!c) return h;
    const act = c.students.filter(s => s.active !== false), ina = c.students.filter(s => s.active === false);
    const nDays = recordedDays(c.id).length;
    h += `<div class="card"><h2>${esc(c.name)}</h2>
      <div class="field"><label for="att-rename">Class name</label><input id="att-rename" class="input" data-att-in="rename" data-fk="rename" maxlength="60" value="${esc(c.name)}"${dis()}></div>
      <div class="att-grid2"><div class="field"><label for="att-addstu">Add a student</label><div class="att-inline"><input id="att-addstu" class="input" data-fk="addstu" maxlength="80" autocomplete="off" placeholder="Type the student's name"${dis()}><button type="button" class="btn go" data-att="addstu"${dis()}>Add</button></div></div>
      <div class="field"><label for="att-paste">Or paste a class list (one name per line)</label><textarea id="att-paste" class="input" data-fk="paste" rows="4" placeholder="One name per line"${dis()}></textarea><div class="row"><button type="button" class="btn ghost" data-att="paste"${dis()}>Add these students</button></div></div></div>
      ${lmsHTML(c)}
      <h3>Students (${act.length})</h3>${act.length ? `<ol class="att-roster">${act.map((s, i) => stuRow(s, i, act.length)).join('')}</ol>` : '<p class="hint">No students yet.</p>'}
      ${ina.length ? `<h3>Left the class (${ina.length})</h3><p class="hint">Deactivated students are hidden from the daily register but keep their history.</p><ol class="att-roster">${ina.map((s, i) => stuRow(s, i, ina.length)).join('')}</ol>` : ''}
      <div class="att-danger">${ST.confirm === 'delclass' ? `<p class="fb bad"><span>Delete <b>${esc(c.name)}</b>, its ${c.students.length} student name${c.students.length === 1 ? '' : 's'} and ${nDays} recorded day${nDays === 1 ? '' : 's'}? This cannot be undone. Export a CSV first if you need a copy.</span><span class="row"><button type="button" class="btn no" data-att="delclass-yes" data-fk="delyes">Yes, delete the class</button><button type="button" class="btn ghost" data-att="cancel" data-fk="delno">Cancel</button></span></p>` : `<button type="button" class="btn ghost" data-att="delclass" data-fk="delclass"${dis()}${ST.daysReady ? '' : ' disabled'}>Delete this class…</button>`}</div></div>`;
    return h;
  }
  function lmsHTML(c) {
    if (ST.mode !== 'db' || !LMS.classes.length) return '';
    const pick = LMS.classes.find(x => x.id === c.lmsClassId) || LMS.classes[0];
    return `<div class="att-lms field"><label for="att-lms">Import enrolled students from the online course</label><div class="att-inline"><select id="att-lms" class="select" data-fk="lmssel"${dis()}>${LMS.classes.map(x => `<option value="${esc(x.id)}"${x.id === pick.id ? ' selected' : ''}>${esc(x.name)} (${x.n} enrolled)</option>`).join('')}</select><button type="button" class="btn ghost" data-att="lmsimport" data-fk="lmsimport"${dis()}>Import enrolled students</button></div><p class="hint">Adds everyone enrolled who is not already on this list. Their names come from their own accounts when you view the register and are not saved in it; you can type a fallback name.</p></div>`;
  }
  function stuRow(s, i, n) {
    const id = esc(s.id), on = s.active !== false;
    return `<li class="att-srow" data-sid="${id}">${s.userId ? `<span class="att-enr"><b>${esc(NAMES[s.userId] || 'Enrolled student')}</b> <span class="ribbon">enrolled online</span></span>` : ''}<input class="input" data-att-in="stuname" data-fk="sn-${id}" maxlength="80" value="${esc(s.name)}" ${s.userId ? `placeholder="Name to show if the account name is hidden" aria-label="Fallback name for ${esc(dispName(s))}"` : `aria-label="Name of student ${i + 1}"`}${dis()}>
      <span class="att-sbtn">${on ? `<button type="button" class="tool" data-att="up" data-fk="up-${id}" aria-label="Move ${esc(dispName(s))} up"${i === 0 ? ' disabled' : ''}${dis()}>↑</button><button type="button" class="tool" data-att="down" data-fk="down-${id}" aria-label="Move ${esc(dispName(s))} down"${i === n - 1 ? ' disabled' : ''}${dis()}>↓</button><button type="button" class="tool" data-att="deact" data-fk="de-${id}"${dis()}>Deactivate</button>` : `<button type="button" class="tool" data-att="react" data-fk="re-${id}"${dis()}>Reactivate</button>`}
      ${!studentHasRecords(s.id) && ST.daysReady ? `<button type="button" class="tool" data-att="rmstu" data-fk="rm-${id}" aria-label="Remove ${esc(dispName(s))} (no records yet)"${dis()}>Remove</button>` : ''}</span></li>`;
  }
  function monthNav() {
    return `<div class="att-mnav"><button type="button" class="tool att-step" data-att="mprev" data-fk="mprev" aria-label="Previous month">‹</button><b class="att-mlabel">${esc(fmtMonth(ST.month))}</b><button type="button" class="tool att-step" data-att="mnext" data-fk="mnext" aria-label="Next month">›</button>${ST.month !== today().slice(0, 7) ? '<button type="button" class="tool" data-att="mnow" data-fk="mnow">This month</button>' : ''}</div>`;
  }
  function historyHTML() {
    const c = curClass(); if (!c) return `<div class="card"><h2>History</h2><p>Create a class first.</p></div>`;
    let h = `<div class="card"><div class="att-bar">${classSelect('att-hclass')}${monthNav()}</div>`;
    if (!ST.daysReady) return h + '<p class="hint">Loading records…</p></div>';
    const mdocs = recordedDays(c.id).filter(d => d.date.slice(0, 7) === ST.month);
    const studs = c.students.filter(s => s.active !== false || mdocs.some(d => (d.marks || {})[s.id]));
    if (!mdocs.length) h += `<p>No days recorded for ${esc(c.name)} in ${esc(fmtMonth(ST.month))}.</p>`;
    else h += `<h2>Month grid</h2><p class="hint">Select a date to open and edit that day's register.</p><div class="tablewrap att-gridwrap"><table class="att-grid"><thead><tr><th scope="col" class="att-sticky">Student</th>${mdocs.map(d => `<th scope="col"><button type="button" class="att-dbtn" data-att="editday" data-d="${d.date}" data-fk="ed-${d.date}" aria-label="Edit ${esc(fmtLong(d.date))}">${+d.date.slice(8)}<small>${esc(wkShort(d.date))}</small></button></th>`).join('')}</tr></thead>
      <tbody>${studs.map(s => `<tr><th scope="row" class="att-sticky">${esc(dispName(s))}${s.active === false ? ' <span class="hint">(left)</span>' : ''}</th>${mdocs.map(d => { const m = (d.marks || {})[s.id], n = (d.notes || {})[s.id]; return `<td>${m ? `<span class="att-cell att-c-${m}" title="${MW[m]}${n ? ': ' + esc(n) : ''}">${m}${n ? '<sup aria-label="has a note">*</sup>' : ''}</span>` : n ? `<span class="att-cell" title="${esc(n)}">*</span>` : '<span class="att-cell att-c-none" aria-label="not marked">·</span>'}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div>
      <p class="hint">P = Present · L = Late · A = Absent · E = Excused · * = a note (hover or long-press to read it) · · = not marked.</p>`;
    const y = schoolYear(ST.month + '-01');
    const pdocs = ST.period === 'year' ? recordedDays(c.id).filter(d => d.date >= y.from && d.date <= y.to) : mdocs;
    const pstuds = c.students.filter(s => s.active !== false || pdocs.some(d => (d.marks || {})[s.id]));
    const rows = pstuds.map(s => ({ s, st: stats(s.id, pdocs) }));
    const tot = rows.reduce((a, r) => { a.n += r.st.n; a.pl += r.st.P + r.st.L; return a; }, { n: 0, pl: 0 });
    const low80 = rows.filter(r => r.st.pct != null && r.st.pct < 80).length, low90 = rows.filter(r => r.st.pct != null && r.st.pct >= 80 && r.st.pct < 90).length;
    h += `</div><div class="card"><h2>Student summary</h2><div class="chips" role="group" aria-label="Summary period"><button type="button" class="chip ${ST.period === 'month' ? 'sel' : ''}" aria-pressed="${ST.period === 'month'}" data-att="period" data-p="month" data-fk="per-m">${esc(fmtMonth(ST.month))}</button><button type="button" class="chip ${ST.period === 'year' ? 'sel' : ''}" aria-pressed="${ST.period === 'year'}" data-att="period" data-p="year" data-fk="per-y">School year from August ${y.start}</button></div>
      <p class="hint"><b>How the % works:</b> attendance % = (Present + Late) ÷ days recorded for that student. Late counts as present. Excused and Absent both count as days missed; Excused is shown separately so you can explain it. Students below 90% and below 80% are flagged.</p>
      ${pdocs.length ? `<div class="tablewrap"><table class="att-sum"><thead><tr><th scope="col">Student</th><th scope="col">Days recorded</th><th scope="col">Present</th><th scope="col">Late</th><th scope="col">Absent</th><th scope="col">Excused</th><th scope="col">Attendance</th></tr></thead>
      <tbody>${rows.map(({ s, st }) => `<tr class="${st.pct != null && st.pct < 80 ? 'att-low80' : st.pct != null && st.pct < 90 ? 'att-low90' : ''}"><th scope="row">${esc(dispName(s))}${s.active === false ? ' <span class="hint">(left)</span>' : ''}</th><td data-l="Days recorded">${st.n}</td><td data-l="Present">${st.P}</td><td data-l="Late">${st.L}</td><td data-l="Absent">${st.A}</td><td data-l="Excused">${st.E}</td><td data-l="Attendance" class="att-pctc"><b>${st.pct == null ? '–' : st.pct + '%'}</b> ${flag(st.pct)}</td></tr>`).join('')}</tbody></table></div>
      <p>Class attendance: <b>${tot.n ? Math.round(tot.pl / tot.n * 100) + '%' : '–'}</b> across ${pdocs.length} recorded day${pdocs.length === 1 ? '' : 's'}${low80 || low90 ? ` · ${low80} below 80% · ${low90} between 80% and 90%` : ''}.</p>` : '<p class="hint">No records in this period yet.</p>'}</div>`;
    return h;
  }
  function exportHTML() {
    const c = curClass(); if (!c) return `<div class="card"><h2>Export and print</h2><p>Create a class first.</p></div>`;
    const y = schoolYear(ST.month + '-01');
    const nm = ST.daysReady ? csvFor(ST.month + '-01', ST.month + '-31').n : 0, ny = ST.daysReady ? csvFor(y.from, y.to).n : 0;
    return `<div class="card"><div class="att-bar">${classSelect('att-eclass')}${monthNav()}</div>
      <h2>Download a CSV</h2><p class="hint">Columns: date, class, student, mark (P, L, A or E) and note. Opens in Excel, Numbers or Google Sheets.</p>
      <div class="row"><button type="button" class="btn go" data-att="csv-month" data-fk="csvm"${nm ? '' : ' disabled'}>CSV for ${esc(fmtMonth(ST.month))} (${nm} row${nm === 1 ? '' : 's'})</button><button type="button" class="btn ghost" data-att="csv-year" data-fk="csvy"${ny ? '' : ' disabled'}>CSV for the school year from August ${y.start} (${ny} row${ny === 1 ? '' : 's'})</button></div>
      <h2>Print the month register</h2><p class="hint">A4 landscape: every weekday of ${esc(fmtMonth(ST.month))} with the marks, totals and attendance %, plus space for a signature. Blank cells are days without a record.</p>
      <div class="row"><button type="button" class="btn ghost" data-att="print" data-fk="print">🖨️ Print ${esc(fmtMonth(ST.month))}</button></div></div>`;
  }
  function inner() {
    if (!allowed()) return `<div class="card"><h2>Not available</h2><p>This page is only for the course's teachers.</p></div>`;
    let h = headHTML();
    if (ST.mode === 'pending' || !ST.regReady) return h + `<div class="card"><p>Opening the register…</p></div>`;
    h += `<div id="att-panel" role="tabpanel" aria-labelledby="att-tab-${ST.tab}">`;
    h += ST.tab === 'history' ? historyHTML() : ST.tab === 'classes' ? classesHTML() : ST.tab === 'export' ? exportHTML() : takeHTML();
    return h + '</div>';
  }
  function paint() {
    const body = document.getElementById('att-body'); if (!body) return;
    const a = document.activeElement; let fk = null, ss = null, se = null;
    if (a && body.contains(a)) { fk = a.getAttribute('data-fk'); try { if (typeof a.selectionStart === 'number') { ss = a.selectionStart; se = a.selectionEnd; } } catch (e) { } }
    const y = window.scrollY;
    body.innerHTML = inner();
    status();
    if (fk) focusFk(fk, ss, se);
    resolveNames(); if (ST.tab === 'classes' && ST.regReady) checkLMS();
    try { if (Math.abs(window.scrollY - y) > 2) window.scrollTo(0, y); } catch (e) { }
  }
  function focusFk(fk, ss, se) {
    const el = document.querySelector('#att-body [data-fk="' + (window.CSS && CSS.escape ? CSS.escape(fk) : fk) + '"]');
    if (!el) return false;
    try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); }
    if (ss != null) { try { el.setSelectionRange(ss, se); } catch (e) { } }
    try { const r = el.getBoundingClientRect(); if (r.bottom > window.innerHeight - 8 || r.top < 8) el.scrollIntoView({ block: 'nearest' }); } catch (e) { }
    return true;
  }

  /* ---------- events ---------- */
  function setClass(id) { if (!ST.classes.some(c => c.id === id)) return; ST.classId = id; ST.confirm = null; saveUI(); ensureSubs(); paint(); }
  function addStudents(names) {
    const c = curClass(); if (!c || ST.readonly) return 0;
    const clean = names.map(n => n.replace(/\s+/g, ' ').trim().slice(0, 80)).filter(Boolean);
    clean.forEach(n => c.students.push({ id: rid('s'), name: n, active: true }));
    if (clean.length) saveReg();
    return clean.length;
  }
  function moveStudent(sid, dir) {
    const c = curClass(); if (!c) return;
    const act = c.students.filter(s => s.active !== false), i = act.findIndex(s => s.id === sid), j = i + dir;
    if (i < 0 || j < 0 || j >= act.length) return;
    const a = c.students.indexOf(act[i]), b = c.students.indexOf(act[j]);
    [c.students[a], c.students[b]] = [c.students[b], c.students[a]];
    saveReg();
  }
  function onClick(ev) {
    const b = ev.target.closest('[data-att]'); if (!b || b.disabled) return;
    const act = b.dataset.att, row = b.closest('[data-sid]'), sid = row ? row.dataset.sid : null, c = curClass();
    switch (act) {
      case 'tab': ST.tab = b.dataset.t; ST.confirm = null; saveUI(); paint(); focusFk('tab-' + ST.tab); return;
      case 'prevday': ST.date = schoolStep(ST.date, -1); ST.confirm = null; break;
      case 'nextday': ST.date = schoolStep(ST.date, 1); ST.confirm = null; break;
      case 'today': ST.date = today(); ST.confirm = null; paint(); focusFk('date'); return;
      case 'mark': setMark(sid, b.dataset.m, true); break;
      case 'allp': { const d = dayDoc(true); rosterFor(d).forEach(s => { if (s.active !== false && !d.marks[s.id]) d.marks[s.id] = 'P'; }); touchDay(d); paint(); focusFk('allp') || focusFk('m-' + (rosterFor(d)[0] || {}).id + '-P'); return; }
      case 'clearday': ST.confirm = 'clearday'; paint(); focusFk('clearno'); return;
      case 'clearday-yes': { const d = dayDoc(false); if (d) { d.marks = {}; d.notes = {}; d.lesson = ''; touchDay(d); } ST.confirm = null; paint(); focusFk('allp'); toast('Day cleared.'); return; }
      case 'cancel': { const was = ST.confirm; ST.confirm = null; paint(); focusFk(was === 'delclass' ? 'delclass' : 'clearday'); return; }
      case 'newclass': {
        const inp = document.getElementById('att-newclass'), name = inp ? inp.value.replace(/\s+/g, ' ').trim().slice(0, 60) : '';
        if (!name) { toast('Type a class name first.'); if (inp) inp.focus(); return; }
        const nc = { id: rid('c'), name, students: [] }; ST.classes.push(nc); ST.classId = nc.id; ST.tab = 'classes'; saveUI(); saveReg(0); ensureSubs(); paint(); focusFk('addstu'); toast('Class created: ' + name); return;
      }
      case 'pickclass': setClass(b.dataset.c); focusFk('pc-' + b.dataset.c); return;
      case 'addstu': { const inp = document.getElementById('att-addstu'); const n = addStudents([inp ? inp.value : '']); if (!n) { toast('Type a name first.'); if (inp) inp.focus(); return; } paint(); focusFk('addstu'); return; }
      case 'paste': { const ta = document.getElementById('att-paste'); const n = addStudents((ta ? ta.value : '').split(/\r?\n/)); if (!n) { toast('Paste one name per line first.'); if (ta) ta.focus(); return; } paint(); focusFk('paste'); toast(n + ' student' + (n === 1 ? '' : 's') + ' added.'); return; }
      case 'up': case 'down': moveStudent(sid, act === 'up' ? -1 : 1); paint(); if (!focusFk(act + '-' + sid) || document.activeElement.disabled) focusFk((act === 'up' ? 'down-' : 'up-') + sid); return;
      case 'deact': case 'react': { const s = c && c.students.find(x => x.id === sid); if (!s) return; s.active = act === 'react'; saveReg(); paint(); focusFk((act === 'react' ? 'de-' : 're-') + sid); toast(s.active ? dispName(s) + ' is back on the register.' : dispName(s) + ' is hidden from the daily register. Their history is kept.'); return; }
      case 'rmstu': { if (!c || studentHasRecords(sid)) return; c.students = c.students.filter(x => x.id !== sid); saveReg(); paint(); focusFk('addstu'); return; }
      case 'delclass': ST.confirm = 'delclass'; paint(); focusFk('delno'); return;
      case 'delclass-yes': {
        if (!c) return;
        const pre = 'attreg/' + c.id + '__';
        const paths = new Set(recordedDays(c.id).map(dayPath));
        if (ST.mode === 'local') lsKeys(pre).forEach(k => paths.add(k));
        W.pend.forEach((v, p) => { if (p.indexOf(pre) === 0) paths.add(p); });
        paths.forEach(p => queueWrite(p, null, 0));
        ST.classes = ST.classes.filter(x => x.id !== c.id); ST.days = {}; ST.daysFor = null; ST.classId = null; ST.confirm = null;
        saveReg(0); ensureSubs(); saveUI(); paint(); focusFk('newclass'); toast('Class deleted.'); return;
      }
      case 'mprev': ST.month = addMonth(ST.month, -1); break;
      case 'mnext': ST.month = addMonth(ST.month, 1); break;
      case 'mnow': ST.month = today().slice(0, 7); paint(); focusFk('mnext'); return;
      case 'editday': ST.date = b.dataset.d; ST.tab = 'take'; saveUI(); paint(); focusFk('date'); try { window.scrollTo({ top: 0 }); } catch (e) { } return;
      case 'period': ST.period = b.dataset.p === 'year' ? 'year' : 'month'; saveUI(); break;
      case 'csv-month': exportCSV('month'); return;
      case 'csv-year': exportCSV('year'); return;
      case 'print': printMonth(); return;
      case 'migrate': migrate(); return;
      case 'lmsimport': importLMS(); return;
      default: return;
    }
    paint();
  }
  const noteTimers = {};
  function onInput(ev) {
    const t = ev.target, k = t.dataset && t.dataset.attIn; if (!k || ST.readonly) return;
    if (k === 'lesson') { const d = dayDoc(true); d.lesson = t.value.slice(0, 160); touchDay(d); return; }
    if (k === 'note') { const sid = t.closest('[data-sid]').dataset.sid, d = dayDoc(true); d.notes[sid] = t.value.slice(0, 200); touchDay(d); clearTimeout(noteTimers.x); return; }
  }
  function onChange(ev) {
    const t = ev.target, k = t.dataset && t.dataset.attIn; if (!k) return;
    if (k === 'class') { setClass(t.value); focusFk(t.id); return; }
    if (k === 'date') { if (isDate(t.value)) { ST.date = t.value; ST.confirm = null; paint(); } return; }
    if (ST.readonly) return;
    const c = curClass(); if (!c) return;
    if (k === 'rename') { const v = t.value.replace(/\s+/g, ' ').trim().slice(0, 60); if (!v) { t.value = c.name; return; } if (v !== c.name) { c.name = v; saveReg(); paint(); } return; }
    if (k === 'stuname') { const s = c.students.find(x => x.id === t.closest('[data-sid]').dataset.sid), v = t.value.replace(/\s+/g, ' ').trim().slice(0, 80); if (!s) return; if (!v && !s.userId) { t.value = s.name; return; } if (v !== s.name) { s.name = v; saveReg(); } return; }
  }
  function onKey(ev) {
    const t = ev.target;
    if (ev.key === 'Enter' && (t.id === 'att-newclass' || t.id === 'att-addstu')) { ev.preventDefault(); const b = t.parentElement.querySelector('[data-att]'); if (b) b.click(); return; }
    const tl = t.closest && t.closest('[role="tablist"]');
    if (tl && (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft')) { const it = [...tl.querySelectorAll('[role="tab"]')], i = it.indexOf(t); if (i >= 0) { ev.preventDefault(); it[(i + (ev.key === 'ArrowRight' ? 1 : -1) + it.length) % it.length].focus(); } return; }
    const row = t.closest && t.closest('.att-row'); if (!row || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const isNote = t.matches('input,textarea'), sid = row.dataset.sid;
    const rows = [...document.querySelectorAll('#att-body .att-row')], ri = rows.indexOf(row);
    const markFk = r => { const on = r.querySelector('.att-m.on') || r.querySelector('.att-m[data-m="P"]'); return on ? on.dataset.fk : null; };
    if (!isNote && /^[plae]$/i.test(ev.key) && !ev.shiftKey) {
      ev.preventDefault(); if (ST.readonly) return;
      setMark(sid, ev.key.toUpperCase(), false);
      const next = rows[ri + 1] ? rows[ri + 1].dataset.sid : sid;
      paint();
      const nr = document.querySelector('#att-body .att-row[data-sid="' + (window.CSS && CSS.escape ? CSS.escape(next) : next) + '"]');
      if (nr) focusFk(markFk(nr));
      return;
    }
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
      const nr = rows[ri + (ev.key === 'ArrowDown' ? 1 : -1)]; if (!nr) return;
      ev.preventDefault();
      if (isNote) { nr.querySelector('.att-note').focus(); return; }
      const want = nr.querySelector('.att-m[data-m="' + t.dataset.m + '"]');
      (want || nr.querySelector('.att-m')).focus(); return;
    }
    if (!isNote && (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft')) {
      const bs = [...row.querySelectorAll('.att-m')], i = bs.indexOf(t); if (i < 0) return;
      ev.preventDefault(); const n = bs[(i + (ev.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length];
      bs.forEach(x => x.tabIndex = -1); n.tabIndex = 0; n.focus(); return;
    }
  }

  /* ---------- styles ---------- */
  const CSS_TXT = `
@media screen{#att-print{display:none}}
.att{display:flex;flex-direction:column;gap:18px}
.att-body{display:flex;flex-direction:column;gap:18px}
.att h1{margin:4px 0 0}
.att-head{gap:12px}
.att-status{position:sticky;top:8px;z-index:3;align-self:flex-end;margin:0 0 -8px;padding:5px 14px;border-radius:99px;font-weight:700;font-size:.9rem;background:var(--surface);border:2px solid var(--line);box-shadow:var(--shadow);min-height:1.6em}
.att-status:empty{visibility:hidden}
.att-status[data-k="ok"]{border-color:var(--ok)}
.att-status[data-k="busy"]{border-color:var(--gold)}
.att-status[data-k="bad"]{border-color:var(--bad);background:var(--soft-bad)}
.att-banner{flex-direction:row;align-items:flex-start;gap:8px}
.att-priv{margin:0}
.att select:focus-visible,.att .att-m:focus-visible,.att .att-dbtn:focus-visible,.att .tool:focus-visible,.att .chip:focus-visible{outline:3px solid #FFE38A;outline-offset:2px}
.att-bar{display:flex;flex-wrap:wrap;gap:12px 18px;align-items:flex-end}
.att-f-class{flex:1 1 220px;max-width:420px}
.att-f-date{flex:0 1 auto}
.att-inline{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.att-inline .input{flex:1 1 160px}
.att-step{min-width:44px;min-height:44px;font-size:1.2rem;line-height:1}
.att .tool{min-height:40px}
.att .tool[disabled]{opacity:.5;cursor:not-allowed}
.att-when{margin:0}
.att-warn{color:var(--bad);font-weight:700}
.att-counts{display:flex;flex-wrap:wrap;gap:8px}
.att-cnt{display:inline-flex;gap:6px;align-items:baseline;padding:6px 12px;border-radius:12px;border:2px solid var(--line);background:var(--raise);font-size:.92rem}
.att-cnt b{font-size:1.15rem}
.att-c-P{--mc:#4FD18B}.att-c-L{--mc:#FFC24D}.att-c-A{--mc:#FF7A6B}.att-c-E{--mc:#8FB8FF}
.att-cnt.att-c-P,.att-cnt.att-c-L,.att-cnt.att-c-A,.att-cnt.att-c-E{border-color:var(--mc)}
.att-c-pct{border-style:dashed}
.att-actions{gap:12px}
.att-confirm{display:inline-flex;flex-wrap:wrap;gap:8px;align-items:center;font-weight:700}
.att-keys kbd{font:inherit;font-weight:700;border:1px solid var(--line);border-radius:5px;padding:0 5px;background:var(--raise)}
.att-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.att-row{display:grid;grid-template-columns:2rem minmax(9rem,1fr) auto minmax(9rem,15rem);gap:8px 12px;align-items:center;padding:8px 10px;border-radius:14px;border:2px solid var(--line);border-left-width:8px;background:var(--raise)}
.att-r-P{border-left-color:#4FD18B}.att-r-L{border-left-color:#FFC24D}.att-r-A{border-left-color:#FF7A6B}.att-r-E{border-left-color:#8FB8FF}
.att-num{color:var(--muted);font-weight:700;text-align:right}
.att-name{font-weight:700;overflow-wrap:anywhere}
.att-marks{display:flex;gap:6px}
.att-m{--mc:#4FD18B;min-width:56px;min-height:48px;padding:4px 8px;border-radius:12px;border:2px solid var(--line);background:transparent;color:var(--ink);display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.1;cursor:pointer}
.att-m b{font-size:1.25rem}
.att-mw{font-size:.68rem;font-weight:700;letter-spacing:.02em}
.att-m-L{--mc:#FFC24D}.att-m-A{--mc:#FF7A6B}.att-m-E{--mc:#8FB8FF}
.att-m:hover{border-color:var(--mc)}
.att-m.on{background:var(--mc);border-color:var(--mc);color:#0A1433;box-shadow:0 3px 0 rgba(0,0,0,.35)}
.att-m.on b::after{content:" ✓";font-size:.8rem}
.att-m[disabled]{cursor:not-allowed;opacity:.6}
.att-note{padding:8px 10px;width:100%}
.att-newclass .att-inline .input{max-width:420px}
.att-grid2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.att-roster{margin:0;padding-left:1.6rem;display:flex;flex-direction:column;gap:8px}
.att-srow{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.att-srow .input{flex:1 1 200px;padding:7px 10px}
.att-enr{flex:1 1 100%;display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.att-lms{border:2px dashed var(--line);border-radius:14px;padding:12px}
.att-sbtn{display:flex;gap:6px;flex-wrap:wrap}
.att-danger{border-top:1px solid var(--line);padding-top:14px}
.att-mnav{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.att-mlabel{min-width:9.5rem;text-align:center;font-size:1.05rem}
.att-gridwrap table{min-width:0}
.att-grid{border-collapse:separate;border-spacing:0;font-size:.92rem}
.att-grid th,.att-grid td{padding:4px 5px;text-align:center;border-bottom:1px solid var(--line);white-space:nowrap}
.att-grid .att-sticky{position:sticky;left:0;z-index:1;text-align:left;background:var(--bg2);max-width:11rem;overflow:hidden;text-overflow:ellipsis}
.att-dbtn{display:flex;flex-direction:column;align-items:center;min-width:38px;min-height:40px;padding:3px 4px;border-radius:9px;border:2px solid var(--line);background:transparent;color:var(--ink);font-weight:700;cursor:pointer}
.att-dbtn small{font-size:.66rem;color:var(--muted)}
.att-dbtn:hover{border-color:var(--blue)}
.att-cell{display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:28px;border-radius:7px;font-weight:800;border:1px solid var(--line)}
.att-cell.att-c-P,.att-cell.att-c-L,.att-cell.att-c-A,.att-cell.att-c-E{background:var(--mc);color:#0A1433;border-color:var(--mc)}
.att-cell.att-c-none{color:var(--muted);border-color:transparent}
.att-cell sup{font-size:.7rem}
.att-sum td,.att-sum th{white-space:nowrap}
.att-sum td{text-align:center}
.att-sum thead th:not(:first-child){text-align:center}
.att-sum tr.att-low90 th{box-shadow:inset 4px 0 0 #FFC24D}
.att-sum tr.att-low80 th{box-shadow:inset 4px 0 0 #FF7A6B}
.att-flag{margin-left:4px}
.att-f90{background:rgba(255,194,77,.22);border-color:#FFC24D}
.att-f80{background:var(--soft-bad);border-color:var(--bad)}
@media (max-width:760px){
  .att-row{grid-template-columns:1.6rem 1fr;padding:8px}
  .att-marks{grid-column:1 / -1}
  .att-m{flex:1 1 0;min-width:0}
  .att-note{grid-column:1 / -1}
  .att-grid2{grid-template-columns:1fr}
}
@media (max-width:560px){
  .att-sum{min-width:0!important;width:100%}
  .att-sum thead{display:none}
  .att-sum tr{display:grid;grid-template-columns:repeat(5,1fr);gap:2px 4px;padding:8px 0;border-bottom:1px solid var(--line)}
  .att-sum th[scope=row]{grid-column:1 / -1;white-space:normal;border:0;padding:2px 6px}
  .att-sum td{border:0;padding:2px;display:flex;flex-direction:column;align-items:center;font-size:.95rem}
  .att-sum td::before{content:attr(data-l);font-size:.66rem;color:var(--muted);font-weight:700;text-align:center;line-height:1.1}
  .att-sum td.att-pctc{grid-column:1 / -1;flex-direction:row;justify-content:flex-start;gap:8px;padding-left:6px}
  .att-sum td.att-pctc::before{content:'Attendance:'}
}
@media (max-width:420px){
  .att-mw{display:none}
  .att-m{min-height:52px}
  .att-m b{font-size:1.4rem}
  .att-f-class{max-width:none}
  .att-mlabel{min-width:0}
  .att-grid .att-sticky{max-width:7.5rem}
}
:root[data-skin="daylight"] .att-grid .att-sticky{background:#fff}
:root[data-skin="daylight"] .att-m.on{color:#0A1433}
`;
  function injectCSS() { if (document.getElementById('att-css')) return; const st = document.createElement('style'); st.id = 'att-css'; st.textContent = CSS_TXT; document.head.appendChild(st); }

  /* ---------- plugin ---------- */
  const TILE = { icon: '🗓️', meta: 'Take the daily register, see each month at a glance, and export or print it. Teachers only.' };
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'attendance',
    title: 'Attendance register',
    /* a getter: the engine only lists plugins that have a tile, so students never get a menu entry */
    get tile() { return allowed() ? TILE : undefined; },
    render(api, loc) {
      API = api;
      if (!allowed()) { checkAccess(); return ACC.state === 'pending' ? `<div class="card"><p>Checking access…</p></div>` : `<div class="card"><h2>Not available</h2><p>This page is only for the course's teachers.</p><div class="row"><button type="button" class="btn go" data-go="home">Go to course home</button></div></div>`; }
      injectCSS(); resolveDb();
      if (ST.mode === 'local') ensureSubs();
      return `<div id="att-root" class="att" aria-live="off"><p id="att-status" class="att-status" role="status" aria-live="polite"></p><div id="att-body" class="att-body">${inner()}</div></div>`;
    },
    mount(api, loc, stageEl) {
      API = api;
      const root = stageEl && stageEl.querySelector('#att-root'); if (!root || !allowed()) return;
      root.addEventListener('click', onClick);
      root.addEventListener('input', onInput);
      root.addEventListener('change', onChange);
      root.addEventListener('keydown', onKey);
      if (!ST.mo && window.MutationObserver) { ST.mo = new MutationObserver(() => { if (!document.getElementById('att-root')) unsubAll(); }); ST.mo.observe(stageEl, { childList: true }); }
      const before = ST.regReady + '|' + ST.daysFor;
      ensureSubs();
      if (before !== ST.regReady + '|' + ST.daysFor) paint(); else { status(); resolveNames(); if (ST.tab === 'classes') checkLMS(); }
    }
  });

  /* for the LMS dashboard: attendance per student for one class and date range. Keys are the student's userId when the
     student was imported from the LMS, otherwise the register's own student id. classId may be the register class id or
     the LMS class id it was imported from. Returns {} when there is nothing to report or this viewer cannot read the register. */
  window.DM_ATTENDANCE = {
    summary: async (classId, fromDate, toDate) => {
      try {
        if (typeof classId !== 'string' || !classId) return {};
        if (!allowed() && !(await checkAccess())) return {};
        await resolveDb();
        let classes;
        if (ST.regReady && ST.classes.length) classes = ST.classes;
        else if (ST.mode === 'db') { const r = await ST.db.doc(REG).get(); classes = r && r.exists && Array.isArray((r.data() || {}).classes) ? r.data().classes : []; }
        else { const r = lsGet(REG); classes = r && Array.isArray(r.classes) ? r.classes : []; }
        const c = classes.find(x => x.id === classId) || classes.find(x => x.lmsClassId === classId); if (!c) return {};
        const pre = 'attreg/' + c.id + '__', docs = {};
        if (ST.mode === 'db') { const qs = await ST.db.collection('attreg').where('classId', '==', c.id).get(); (qs.docs || []).forEach(d => { if (d.exists) docs[d.id] = d.data(); }); }
        else lsKeys(pre).forEach(k => { const b = lsGet(k); if (b) docs[k.slice(7)] = b; });
        W.pend.forEach((b, p) => { if (p.indexOf(pre) === 0) { if (b) docs[p.slice(7)] = b; else delete docs[p.slice(7)]; } });
        const from = isDate(fromDate) ? fromDate : '0000-00-00', to = isDate(toDate) ? toDate : '9999-99-99';
        const list = Object.values(docs).filter(d => d && d.date >= from && d.date <= to);
        const out = {};
        (c.students || []).forEach(s => { const st = stats(s.id, list); if (!st.n && s.active === false) return; out[s.userId || s.id] = { present: st.P, late: st.L, absent: st.A, excused: st.E, days: st.n, pct: st.pct }; });
        return out;
      } catch (e) { return {}; }
    }
  };
})();
