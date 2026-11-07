/* Digital Media Unit 1 LMS: teacher views (owner or editor only). Developed by Kester Small.
   Teacher dashboard, Gradebook, Assignments, Announcements, and Exports and LMS integration (Google Classroom, Microsoft Teams).
   Needs tools/lms.js (window.DM_LMS). Every view is gated on user.isOwner() || user.canEdit(); students never get a menu
   entry and see a "for teachers" card if they open one by URL. The db rules also refuse teacher paths to students.
   In the Teacher Edition (teacher.html, a different artifact with its own db) the live class data is not available, so
   only an information card is shown there. Names and emails are resolved with user.profiles() at render or export time
   and never stored. */
(function () {
  'use strict';
  const X = window.DM_LMS; if (!X) return;
  const { L, esc, okSeg, seg, num, rid, code6, fmtDate, band, pctStr, colKey, safeUrl, lsGet, lsSet, CATS, PRESETS } = X;
  const TE = () => !!window.COURSE_TEACHER_EDITION;
  const isT = () => L.st === 'ready' && L.teacher && !TE();
  const T = { cid: lsGet('t.cid') || '', data: {}, busy: {}, names: {}, sort: lsGet('t.sort') || { k: 'name', dir: 1 }, filter: 'all', q: '', ovr: null, form: {}, confirm: {}, exportIncl: lsGet('t.incl') !== false, msg: '' };

  /* ---------------- classes ---------------- */
  const classes = () => L.classes || [];
  function curClass() { const c = classes(); return c.find(x => x.id === T.cid) || c[0] || null; }
  function setCid(id) { T.cid = id; lsSet('t.cid', id); T.ovr = null; X.schedule(); const c = curClass(); if (c) { loadClass(c.id); subClass(c.id); } }
  async function saveClasses(list, extra) {
    const body = Object.assign({ v: 1, courseUrl: (L.classesDoc && L.classesDoc.courseUrl) || '' }, extra || {}, { classes: list.map(c => ({ id: c.id, name: c.name, code: c.code, term: c.term || '', weights: X.weightsOf(c.weights), colCats: c.colCats || {} })) });
    await X.writeDoc('lms/classes', body);
  }
  const infoOf = c => ({ v: 1, name: c.name, term: c.term || '', weights: X.weightsOf(c.weights), colCats: c.colCats || {} });
  async function freeCode() { for (let i = 0; i < 6; i++) { const c = code6(); try { const s = await L.db.doc('lms/codes/' + c + '/class').get(); if (!s.exists) return c; } catch (e) { return c; } } return code6() + code6().slice(0, 2); }
  async function createClass(name, term) {
    name = String(name || '').trim().slice(0, 80); term = String(term || '').trim().slice(0, 40);
    if (!name) { X.toast('Give the class a name first.'); return; }
    const c = { id: seg(rid('c')), name, term, code: await freeCode(), weights: Object.assign({}, PRESETS.cape), colCats: {} };
    try {
      await X.writeDoc('lms/codes/' + c.code + '/class', { v: 1, classId: c.id });
      await X.writeDoc('lms/classinfo/' + c.id + '/info', infoOf(c));
      await saveClasses(classes().concat(c));
      T.form.cname = ''; T.form.cterm = ''; setCid(c.id); X.toast('Class created. Its join code is ' + c.code + '.');
    } catch (e) { X.toast(X.errMsg(e)); }
  }
  async function newCode(c) {
    const code = await freeCode();
    try { await X.writeDoc('lms/codes/' + code + '/class', { v: 1, classId: c.id }); if (c.code) await X.writeDoc('lms/codes/' + c.code + '/class', null, 'delete'); await saveClasses(classes().map(x => x.id === c.id ? Object.assign({}, x, { code }) : x)); X.toast('New join code: ' + code + '. The old code no longer works.'); }
    catch (e) { X.toast(X.errMsg(e)); }
  }
  async function deleteClass(c) {
    try { await saveClasses(classes().filter(x => x.id !== c.id)); if (c.code) await X.writeDoc('lms/codes/' + c.code + '/class', null, 'delete'); await X.writeDoc('lms/classinfo/' + c.id + '/info', null, 'delete'); X.toast('Class deleted. Student work stays in the course storage.'); if (T.cid === c.id) setCid(''); }
    catch (e) { X.toast(X.errMsg(e)); }
  }
  async function updateClass(id, patch) {
    const list = classes().map(x => x.id === id ? Object.assign({}, x, patch) : x), c = list.find(x => x.id === id);
    try { await saveClasses(list); await X.writeDoc('lms/classinfo/' + id + '/info', infoOf(c)); } catch (e) { X.toast(X.errMsg(e)); throw e; }
  }

  /* ---------------- class data (read on demand, refreshed at most once a minute) ---------------- */
  async function pool(items, n, fn) { const out = []; let i = 0; await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k]); } })); return out; }
  const safeGet = ref => ref.get().catch(() => null);
  async function loadClass(cid, force, maxAge) {
    if (!isT() || !okSeg(cid) || T.busy[cid]) return;
    const D = T.data[cid]; if (D && !force && Date.now() - D.at < (maxAge || 60000)) return;
    T.busy[cid] = true; X.schedule();
    try {
      const es = await L.db.collection('lms/enrol/' + cid).get();
      const uids = [...new Set((es.docs || []).filter(d => d.exists).map(d => { const b = d.data() || {}; return typeof b.userId === 'string' && okSeg(b.userId) ? b.userId : d.id; }).filter(okSeg))];
      const users = {}, marks = {}, ex = {}, joined = {};
      (es.docs || []).forEach(d => { if (d.exists) joined[d.id] = num((d.data() || {}).joinedAt, 0); });
      await pool(uids, 4, async uid => {
        const [own, mk, at, lk] = await Promise.all([safeGet(L.db.collection('lms/users/' + uid)), safeGet(L.db.collection('lms/marks/' + uid)), safeGet(L.db.collection('examlogs/' + uid + '/attempts')), safeGet(L.db.collection('examlogs/' + uid + '/locks'))]);
        const u = users[uid] = { grades: [], subs: {}, progress: null };
        ((own && own.docs) || []).forEach(d => { if (!d.exists) return; const b = d.data() || {}; if (d.id === 'progress') u.progress = b; else if (d.id.indexOf('grade:') === 0) u.grades.push(b); else if (d.id.indexOf('sub:') === 0) u.subs[b.assignId || d.id.slice(4)] = b; });
        const m = marks[uid] = { a: {}, ovr: {} };
        ((mk && mk.docs) || []).forEach(d => { if (!d.exists) return; if (d.id.indexOf('a:') === 0) m.a[d.id.slice(2)] = d.data(); else if (d.id.indexOf('ovr:') === 0) m.ovr[d.id.slice(4)] = d.data(); });
        ex[uid] = { attempts: ((at && at.docs) || []).filter(d => d.exists).map(d => d.data()), locks: ((lk && lk.docs) || []).filter(d => d.exists).map(d => d.data()) };
      });
      let att = {};
      try { if (window.DM_ATTENDANCE && typeof window.DM_ATTENDANCE.summary === 'function') att = (await window.DM_ATTENDANCE.summary(cid)) || {}; } catch (e) { att = {}; }
      T.data[cid] = { at: Date.now(), uids, users, marks, ex, att, joined };
      resolveNames(uids);
    } catch (e) { T.data[cid] = T.data[cid] || { at: Date.now(), uids: [], users: {}, marks: {}, ex: {}, att: {}, joined: {}, err: X.errMsg(e) }; }
    T.busy[cid] = false; X.schedule();
  }
  async function resolveNames(uids) {
    if (!uids.length || !L.user) return;
    try { const ps = await L.user.profiles(uids); let ch = false; uids.forEach(id => { const n = (ps[id] && ps[id].name) || ''; if (T.names[id] !== n) { T.names[id] = n; ch = true; } }); if (ch) X.schedule(); } catch (e) { }
  }
  function nameOf(uid, D) { const n = T.names[uid]; if (n) return n; const i = D ? D.uids.indexOf(uid) : -1; return 'Student ' + (i >= 0 ? i + 1 : '') + ' (name hidden)'; }
  function subClass(cid) {
    if (!isT() || !okSeg(cid)) return;
    X.sub('tassign:' + cid, L.db.collection('lms/assign/' + cid), qs => { T['assign:' + cid] = (qs.docs || []).filter(d => d.exists).map(d => Object.assign({ id: d.id }, d.data())); X.schedule(); });
    X.sub('tnews:' + cid, L.db.collection('lms/news/' + cid), qs => { T['news:' + cid] = (qs.docs || []).filter(d => d.exists).map(d => Object.assign({ id: d.id }, d.data())); X.schedule(); });
  }
  const assignsOf = cid => (T['assign:' + cid] || []).slice().sort((a, b) => num(a.due, 9e15) - num(b.due, 9e15) || num(a.createdAt, 0) - num(b.createdAt, 0));
  const newsOf = cid => (T['news:' + cid] || []).slice().sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || num(b.at, 0) - num(a.at, 0));

  /* integrity from tools/lockdown.js data: flagged attempts and current locks, by gradebook column */
  function exFor(D, uid) {
    const e = (D && D.ex[uid]) || { attempts: [], locks: [] }, flagged = {}, locked = {};
    e.attempts.forEach(a => { if (a && (a.status === 'flagged' || a.violations > 0)) { const k = X.colForTestId(a.testId); flagged[k] = (flagged[k] || 0) + 1; } });
    e.locks.forEach(l => { if (l && l.testId) locked[X.colForTestId(l.testId)] = l.title || l.testId; });
    return { flagged, locked, nFlag: Object.values(flagged).reduce((a, b) => a + b, 0), nLock: Object.keys(locked).length };
  }
  function rowFor(D, uid, c) {
    const u = D.users[uid] || { grades: [], subs: {} }, m = D.marks[uid] || { a: {}, ovr: {} };
    const r = X.studentRow(u.grades, m.ovr, m.a, u.subs, assignsOf(c.id), c), ex = exFor(D, uid);
    Object.values(r.cols).forEach(col => { if (ex.flagged[col.key]) col.flagged = true; if (ex.locked[col.key]) col.locked = true; });
    const att = D.att && D.att[uid] && Number.isFinite(+D.att[uid].pct) ? +D.att[uid].pct : null;
    const reasons = [];
    if (r.avgTest != null && r.avgTest < 50) reasons.push('average below 50%');
    if (r.missing >= 2) reasons.push(r.missing + ' missing');
    if (att != null && att < 80) reasons.push('attendance ' + Math.round(att) + '%');
    return Object.assign(r, { uid, name: nameOf(uid, D), progress: u.progress, ex, att, risk: reasons.length > 0, reasons, flags: ex.nFlag + Object.values(r.cols).filter(x => x.flagged && !ex.flagged[x.key]).length });
  }
  function columnsFor(D, c) {
    const map = {};
    D.uids.forEach(uid => Object.values(rowFor(D, uid, c).cols).forEach(col => { if (!map[col.key]) map[col.key] = { key: col.key, title: col.title, kind: col.kind, id: col.id, order: col.order, cat: col.cat, assign: col.assign }; }));
    assignsOf(c.id).forEach(a => { const k = 'a:' + a.id; if (!map[k]) map[k] = { key: k, title: a.title, kind: 'assign', id: a.id, order: 5000 + num(a.due, 0) / 1e10, assign: a, cat: a.cat || 'cw' }; });
    return Object.values(map).sort((a, b) => (a.kind === 'assign') - (b.kind === 'assign') || a.order - b.order || String(a.title).localeCompare(String(b.title)));
  }

  /* ---------------- shared bits ---------------- */
  function hero(eyebrow, title, p) { return `<div class="hero"><span class="eyebrow">Teacher tools · ${esc(eyebrow)}</span><h1>${esc(title)}</h1><p>${p}</p></div><p id="lms-live" class="sr" role="status" aria-live="polite"></p>`; }
  function gate() {
    if (TE()) return `<div class="card lms-gate"><h2>Gradebook and LMS tools</h2><p><b>Open the online student course while signed in as the owner to use the gradebook and LMS tools.</b></p><p class="hint">The Teacher Edition is a separate copy with its own storage, so your classes, join codes, assignments, submissions and grades live only in the online student course. Open that link while you are signed in to your own account: the Teacher dashboard, Gradebook, Assignments, Announcements and Exports appear in its menu for you, and never for students.</p></div>`;
    if (L.st === 'pending') return `<div class="card"><p role="status">Checking your access…</p></div>`;
    if (L.st !== 'ready') return `<div class="card lms-gate"><h2>Sign in to the online course</h2><p>The teacher tools work only in the online course, opened while you are signed in as its owner or an editor.</p></div>`;
    if (!L.teacher) return `<div class="card"><h2>For teachers</h2><p>This page is only for the course's teachers.</p><div class="row"><button type="button" class="btn go" data-go="lmsclass">Go to My class</button></div></div>`;
    return '';
  }
  function classPicker(view) {
    const c = classes(), cur = curClass();
    if (L.classes === null) return loading();
    if (!c.length) return `<div class="card"><p>No classes yet. <button type="button" class="linkbtn" data-go="lmsteach">Create your first class on the Teacher dashboard →</button></p></div>`;
    return `<div class="card"><div class="lms-toolbar"><div class="field"><label for="lms-cpick-${view}">Class</label><select id="lms-cpick-${view}" class="select" data-lmsc="cpick">${c.map(x => `<option value="${esc(x.id)}" ${cur && cur.id === x.id ? 'selected' : ''}>${esc(x.name)}${x.term ? ' · ' + esc(x.term) : ''}</option>`).join('')}</select></div>
      <button type="button" class="btn ghost" data-lms="trefresh" ${cur && T.busy[cur.id] ? 'disabled' : ''}>${cur && T.busy[cur.id] ? 'Loading…' : 'Refresh'}</button><span class="hint" aria-live="polite">${cur && T.data[cur.id] ? 'Updated ' + esc(fmtDate(T.data[cur.id].at, true)) : ''}</span></div></div>`;
  }
  function needData(c) { if (!c) return null; const D = T.data[c.id]; if (!D) { loadClass(c.id); subClass(c.id); return null; } subClass(c.id); if (Date.now() - D.at > 60000) loadClass(c.id); return D; }
  const loading = () => `<div class="card"><p role="status">Loading the class…</p></div>`;
  const viewExists = v => (window.COURSE_PLUGINS || []).some(p => p && p.view === v && p.tile);

  /* ---------------- Teacher dashboard ---------------- */
  function dashInner(loc) {
    const g = gate(); if (g) return hero('Dashboard', 'Teacher dashboard', 'Classes, join codes and who needs help.') + g;
    if (loc.k) return studentDetail(loc.k);
    let h = hero('Dashboard', 'Teacher dashboard', 'Create classes, share join codes, and see every student\'s progress, missing work, attendance and exam integrity at a glance.');
    const c = classes(), cur = curClass();
    h += `<div class="card"><h2>Your classes</h2>${c.length ? `<div class="tablewrap"><table class="lms-t"><thead><tr><th scope="col">Class</th><th scope="col">Join code</th><th scope="col">Students</th><th scope="col">Actions</th></tr></thead><tbody>${c.map(x => { const D = T.data[x.id]; return `<tr><td><b>${esc(x.name)}</b>${x.term ? `<br><span class="hint">${esc(x.term)}</span>` : ''}</td><td><span class="lms-code" aria-label="Join code ${esc(x.code.split('').join(' '))}">${esc(x.code)}</span></td><td class="num">${D ? D.uids.length : '…'}</td><td><div class="row"><button type="button" class="btn ghost" data-lms="copycode" data-c="${esc(x.id)}">Copy code</button><button type="button" class="btn ghost" data-lms="newcode" data-c="${esc(x.id)}">New code</button><button type="button" class="btn ghost" data-lms="delclass" data-c="${esc(x.id)}">${T.confirm['del' + x.id] ? 'Tap again to delete' : 'Delete'}</button></div></td></tr>`; }).join('')}</tbody></table></div>` : '<p class="hint">No classes yet.</p>'}
      <form data-lmsform="newclass" class="lms-toolbar" aria-label="Create a class"><div class="field"><label for="lms-cname">New class name</label><input id="lms-cname" class="input" maxlength="80" placeholder="e.g. Lower Six Digital Media" value="${esc(T.form.cname || '')}" data-lmst="cname"></div><div class="field"><label for="lms-cterm">Term or year (optional)</label><input id="lms-cterm" class="input" maxlength="40" placeholder="e.g. Term 1, 2026–27" value="${esc(T.form.cterm || '')}" data-lmst="cterm"></div><button type="submit" class="btn go">Create class</button></form>
      <p class="hint">Students open <b>My class</b>, type the code once and they are enrolled. Share the course with them as <b>Contributors</b> first (the share menu), or they cannot join or hand in work.</p></div>`;
    h += `<div class="card"><h2>Course link</h2><p class="hint">Paste the course link from the share menu once. It goes into "Copy for Classroom/Teams" and the export page.</p><form data-lmsform="courseurl" class="lms-toolbar"><div class="field"><label for="lms-curl">Online course link</label><input id="lms-curl" class="input" type="url" inputmode="url" placeholder="https://… (your class course link)" value="${esc(T.form.curl != null ? T.form.curl : (L.classesDoc && L.classesDoc.courseUrl) || '')}" data-lmst="curl"></div><button type="submit" class="btn ghost">Save link</button></form></div>`;
    h += `<div class="card"><h2>More teacher tools</h2><div class="row"><button type="button" class="btn ghost" data-go="lmsbook">📒 Gradebook</button><button type="button" class="btn ghost" data-go="lmsassign">📝 Assignments</button><button type="button" class="btn ghost" data-go="lmsnews">📣 Announcements</button><button type="button" class="btn ghost" data-go="lmsexport">⬇ Exports and LMS integration</button>${viewExists('ldxlog') ? '<button type="button" class="btn ghost" data-go="ldxlog">🛡️ Exam integrity log</button>' : ''}${viewExists('attendance') ? '<button type="button" class="btn ghost" data-go="attendance">🗓️ Attendance register</button>' : ''}</div></div>`;
    if (!cur) return h;
    h += classPicker('dash');
    const D = needData(cur); if (!D) return h + loading();
    if (D.err) h += `<p class="fb bad">${esc(D.err)}</p>`;
    let rows = D.uids.map(uid => rowFor(D, uid, cur));
    const risk = rows.filter(r => r.risk);
    h += `<div class="card"><div class="card-top"><h2>At risk in ${esc(cur.name)}</h2><span class="lms-pill ${risk.length ? 'bad' : 'ok'}">${risk.length} of ${rows.length}</span></div>${risk.length ? `<ul class="lms-todo">${risk.map(r => `<li><button type="button" class="lms-row" data-go="lmsteach" data-k="${esc(r.uid)}"><span class="lms-rt"><b>${esc(r.name)}</b><span class="hint">${esc(r.reasons.join(' · '))}</span></span><span class="lms-rs"><span class="lms-pill bad">At risk</span></span></button></li>`).join('')}</ul>` : '<p class="hint">Nobody is flagged right now.</p>'}<p class="hint">At risk means a test average below 50%, two or more missing assignments, or attendance below 80%.</p></div>`;
    rows = filterSort(rows);
    const th = (k, t) => { const on = T.sort.k === k; return `<th scope="col" aria-sort="${on ? (T.sort.dir > 0 ? 'ascending' : 'descending') : 'none'}"><button type="button" data-lms="sort" data-k="${k}">${t}${on ? (T.sort.dir > 0 ? ' ▲' : ' ▼') : ''}</button></th>`; };
    const u = (r, m) => { const x = r.progress && r.progress.units && r.progress.units[m]; return x ? x.done + '/' + x.total : '–'; };
    h += `<div class="card"><h2>Progress</h2><div class="lms-toolbar"><div class="field"><label for="lms-q">Find a student</label><input id="lms-q" class="input" type="search" value="${esc(T.q)}" data-lmst="q" placeholder="Name"></div><div class="field"><label for="lms-filter">Show</label><select id="lms-filter" class="select" data-lmsc="filter">${[['all', 'Everyone'], ['risk', 'At risk only'], ['missing', 'Missing work'], ['flag', 'Integrity flags or locks']].map(([v, t]) => `<option value="${v}" ${T.filter === v ? 'selected' : ''}>${t}</option>`).join('')}</select></div></div>
      ${rows.length ? `<div class="tablewrap"><table class="lms-t"><thead><tr>${th('name', 'Student')}${th('M1', 'M1 units')}${th('M2', 'M2 units')}${th('M3', 'M3 units')}${th('labs', 'Labs')}${th('avg', 'Avg test')}${th('sub', 'Handed in')}${th('miss', 'Missing')}${th('late', 'Late')}${th('att', 'Attendance')}${th('flag', 'Flags')}${th('lock', 'Locked')}${th('total', 'Weighted')}</tr></thead><tbody>${rows.map(r => `<tr class="${r.risk ? 'risk' : ''}"><td class="lms-sticky"><button type="button" class="linkbtn" data-go="lmsteach" data-k="${esc(r.uid)}">${esc(r.name)}</button>${r.risk ? '<br><span class="lms-pill bad">At risk</span>' : ''}</td><td class="num">${u(r, 'M1')}</td><td class="num">${u(r, 'M2')}</td><td class="num">${u(r, 'M3')}</td><td class="num">${r.progress ? num(r.progress.labsDone, 0) : '–'}</td><td class="num">${pctStr(r.avgTest)}</td><td class="num">${r.submitted}</td><td class="num">${r.missing ? `<b class="lms-flag">${r.missing}</b>` : 0}</td><td class="num">${r.late}</td><td class="num">${r.att == null ? '–' : pctStr(r.att)}</td><td class="num">${r.flags ? `<span class="lms-flag" title="Flagged attempts">⚑ ${r.flags}</span>` : 0}</td><td class="num">${r.ex.nLock ? `<span class="lms-flag">🔒 ${r.ex.nLock}</span>` : 0}</td><td class="num">${pctStr(r.total)}</td></tr>`).join('')}</tbody></table></div>` : `<p class="hint">${D.uids.length ? 'No students match.' : 'No students have joined yet. Give them the join code ' + esc(cur.code) + '.'}</p>`}
      <p class="hint">Progress syncs from each student's device at most once a minute while they use the course. Attendance comes from the Attendance register${viewExists('attendance') ? '' : ' (not available on this page)'}; flags and locks come from the Exam integrity log.</p></div>`;
    return h;
  }
  function filterSort(rows) {
    const q = T.q.trim().toLowerCase();
    rows = rows.filter(r => (!q || r.name.toLowerCase().includes(q)) && (T.filter === 'all' || (T.filter === 'risk' && r.risk) || (T.filter === 'missing' && r.missing > 0) || (T.filter === 'flag' && (r.flags || r.ex.nLock))));
    const k = T.sort.k, d = T.sort.dir, uv = (r, m) => { const x = r.progress && r.progress.units && r.progress.units[m]; return x ? x.done : -1; };
    const val = r => ({ name: r.name.toLowerCase(), M1: uv(r, 'M1'), M2: uv(r, 'M2'), M3: uv(r, 'M3'), labs: r.progress ? num(r.progress.labsDone, 0) : -1, avg: r.avgTest == null ? -1 : r.avgTest, sub: r.submitted, miss: r.missing, late: r.late, att: r.att == null ? -1 : r.att, flag: r.flags, lock: r.ex.nLock, total: r.total == null ? -1 : r.total })[k];
    return rows.sort((a, b) => { const x = val(a), y = val(b); return (x < y ? -1 : x > y ? 1 : 0) * d || a.name.localeCompare(b.name); });
  }
  function studentDetail(uid) {
    const cur = curClass(), back = `<div class="crumbs"><button type="button" class="linkbtn" data-go="lmsteach">← Teacher dashboard</button></div>`;
    let h = hero('Student', 'Student detail', 'Results, hand-ins, attendance and integrity in one timeline.');
    if (!cur) return h + `<div class="card">${back}<p>No class selected.</p></div>`;
    const D = needData(cur); if (!D) return h + loading();
    if (!D.uids.includes(uid)) return h + `<div class="card">${back}<p>This student is not in ${esc(cur.name)}.</p></div>`;
    const r = rowFor(D, uid, cur), u = D.users[uid] || {}, ev = [];
    (u.grades || []).forEach(g => ev.push({ at: g.at, t: `${esc(g.title)}: <b>${pctStr(g.pct)}</b>${g.score != null && g.max ? ` (${esc(g.score)}/${esc(g.max)})` : ''}${g.integrity === 'flagged' ? ' <span class="lms-flag">⚑ flagged</span>' : ''}`, k: 'Result' }));
    ((u.progress && u.progress.log) || []).filter(x => x.kind === 'unit' || x.kind === 'write' || x.kind === 'essay').forEach(x => ev.push({ at: x.at, t: `${x.kind === 'unit' ? 'Completed unit' : 'Saved writing'}: ${esc(x.title)}`, k: x.kind === 'unit' ? 'Progress' : 'Writing' }));
    const A = assignsOf(cur.id);
    Object.values(u.subs || {}).forEach(s => { const a = A.find(x => x.id === s.assignId); ev.push({ at: s.submittedAt, t: `Handed in ${esc(a ? a.title : 'an assignment')}${s.late ? ' <span class="lms-pill warn">Late</span>' : ''}`, k: 'Assignment' }); });
    Object.entries((D.marks[uid] || {}).a || {}).forEach(([aid, m]) => { const a = A.find(x => x.id === aid); if (m && m.status === 'returned') ev.push({ at: m.at, t: `Marked ${esc(a ? a.title : 'assignment')}: <b>${esc(m.score)}/${esc(m.max)}</b>`, k: 'Mark' }); });
    ((D.ex[uid] || {}).attempts || []).forEach(a => ev.push({ at: Date.parse(a.start) || 0, t: `Lockdown attempt: ${esc(a.title || a.testId)} · ${a.status === 'flagged' ? '<span class="lms-flag">⚑ flagged</span>' : esc(a.status || '')}${a.violations ? ' · ' + esc(a.violations) + ' violations' : ''}${a.locked ? ' · locked' : ''}`, k: 'Integrity' }));
    ev.sort((a, b) => num(b.at, 0) - num(a.at, 0));
    h += `<div class="card">${back}<div class="card-top"><h2>${esc(r.name)}</h2>${r.risk ? `<span class="lms-pill bad">At risk: ${esc(r.reasons.join(', '))}</span>` : '<span class="lms-pill ok">On track</span>'}</div>
      <div class="lms-kpis"><div><small>Weighted total</small><b>${pctStr(r.total)}</b><small>Band ${esc(r.band || '–')} (indicative)</small></div><div><small>Average test</small><b>${pctStr(r.avgTest)}</b></div><div><small>Handed in</small><b>${r.submitted}/${A.length}</b></div><div><small>Missing</small><b>${r.missing}</b></div><div><small>Attendance</small><b>${r.att == null ? '–' : pctStr(r.att)}</b></div><div><small>Flags / locks</small><b>${r.flags} / ${r.ex.nLock}</b></div></div>
      <p class="hint">Joined ${esc(fmtDate(D.joined[uid]))}${u.progress ? ' · last synced ' + esc(fmtDate(u.progress.at, true)) + ' · course ' + esc(num(u.progress.pct, 0)) + '% complete' : ' · no progress synced yet'}.</p>
      <div class="row"><button type="button" class="btn ghost" data-go="lmsbook">Open the gradebook</button>${viewExists('ldxlog') && r.ex.nLock ? '<button type="button" class="btn ghost" data-go="ldxlog">Unlock in the Exam integrity log</button>' : ''}</div></div>`;
    h += `<div class="card"><h2>Timeline</h2>${ev.length ? `<ol class="lms-timeline">${ev.slice(0, 120).map(e => `<li><span class="hint">${esc(fmtDate(e.at, true))} · ${esc(e.k)}</span><br>${e.t}</li>`).join('')}</ol>` : '<p class="hint">Nothing yet.</p>'}</div>`;
    return h;
  }

  /* ---------------- Gradebook ---------------- */
  function bookInner() {
    const g = gate(); if (g) return hero('Gradebook', 'Gradebook', 'Marks for every student and assessment.') + g;
    let h = hero('Gradebook', 'Gradebook', 'Rows are students, columns are assessments. Each cell shows the best attempt and the latest one. Press a cell to override a mark with a reason.');
    const cur = curClass(); h += classPicker('book'); if (!cur) return h;
    const D = needData(cur); if (!D) return h + loading();
    const cols = columnsFor(D, cur), w = X.weightsOf(cur.weights), rows = D.uids.map(uid => rowFor(D, uid, cur)).sort((a, b) => a.name.localeCompare(b.name));
    h += `<div class="card"><h2>Weighting for ${esc(cur.name)}</h2><form data-lmsform="weights" class="lms-toolbar" aria-label="Category weights">${['p1', 'p2', 'sba', 'cw'].map(k => `<div class="field"><label for="lms-w-${k}">${esc(CATS[k])} %</label><input id="lms-w-${k}" class="input" type="number" min="0" max="100" step="1" inputmode="numeric" value="${esc(w[k])}" name="${k}"></div>`).join('')}<button type="submit" class="btn go">Save weights</button></form>
      <div class="row"><button type="button" class="btn ghost" data-lms="preset" data-k="cape" aria-pressed="${w.mode === 'cape'}">CAPE: Paper 01 20 · Paper 02 20 · SBA 60</button><button type="button" class="btn ghost" data-lms="preset" data-k="internal" aria-pressed="${w.mode === 'internal'}">Internal coursework: 25 · 25 · 30 · coursework 20</button></div>
      <p class="hint">Each category is the average of its columns; the weighted total uses the categories a student has marks in. Overdue assignments not handed in count as 0. <b>Bands I to VII are indicative only and are not CXC's grade boundaries</b> (I ≥ 70, II 60–69, III 50–59, IV 40–49, V 30–39, VI 20–29, VII below 20).</p>
      <details class="fold"><summary>Column categories</summary><div class="tablewrap"><table class="lms-t"><thead><tr><th scope="col">Column</th><th scope="col">Counts towards</th></tr></thead><tbody>${cols.filter(c => c.kind !== 'assign').map((c, i) => `<tr><td><label for="lms-cc-${i}">${esc(c.title)}</label></td><td><select id="lms-cc-${i}" class="select" data-lmsc="colcat" data-k="${esc(c.key)}">${Object.keys(CATS).map(k => `<option value="${k}" ${c.cat === k ? 'selected' : ''}>${esc(CATS[k])}</option>`).join('')}</select></td></tr>`).join('') || '<tr><td colspan="2" class="hint">No course results yet.</td></tr>'}</tbody></table></div><p class="hint">Assignment categories are set on each assignment.</p></details></div>`;
    if (T.ovr) h += overrideEditor(D, cur, cols);
    if (!rows.length) return h + `<div class="card"><p class="hint">No students yet. Share the join code ${esc(cur.code)}.</p></div>`;
    if (!cols.length) h += `<div class="card"><p class="hint">No results yet. Results appear when students finish a module test, a Paper 01, a lab or an assignment in the online course.</p></div>`;
    h += `<div class="card"><h2>Marks</h2><div class="tablewrap"><table class="lms-t lms-book"><caption class="sr">Gradebook for ${esc(cur.name)}</caption><thead><tr><th scope="col" class="lms-sticky">Student</th>${cols.map(c => `<th scope="col">${esc(c.title)}<br><span class="hint">${esc(CATS[c.cat] || '')}${c.kind === 'assign' ? ' · /' + esc(c.assign.points || 100) : ''}</span></th>`).join('')}<th scope="col">Weighted total</th><th scope="col">Band</th></tr></thead><tbody>${rows.map(r => `<tr class="${r.risk ? 'risk' : ''}"><th scope="row" class="lms-sticky"><button type="button" class="linkbtn" data-go="lmsteach" data-k="${esc(r.uid)}">${esc(r.name)}</button></th>${cols.map(c => cellHTML(r, c)).join('')}<td class="num"><b>${pctStr(r.total)}</b><br><span class="hint">${r.coverage}% of weight</span></td><td class="num"><b>${esc(r.band || '–')}</b></td></tr>`).join('')}</tbody></table></div><p class="hint">⚑ = flagged in lockdown exam mode · 🔒 = test locked · ✎ = overridden mark. Bands are indicative, not CXC's.</p></div>`;
    return h;
  }
  function cellHTML(r, c) {
    const x = r.cols[c.key], lab = esc(r.name + ', ' + c.title);
    if (c.kind === 'assign') {
      let t = '–';
      if (x && x.override != null) t = `<b>${pctStr(x.override)}</b> ✎`;
      else if (x && x.mark) t = `<b>${esc(x.mark.score)}/${esc(x.mark.max || c.assign.points)}</b>`;
      else if (x && x.sub) t = '<span class="lms-pill warn">To mark</span>';
      else if (x && x.missing) t = '<span class="lms-pill bad">Missing</span>';
      return `<td><div class="lms-cell"><button type="button" class="linkbtn" data-go="lmsassign" data-k="${esc(c.id)}" data-tab="${esc(r.uid)}" aria-label="Open ${lab}">${t}</button>${x && x.sub && x.sub.late ? '<span class="lms-pill warn">Late</span>' : ''}</div></td>`;
    }
    if (!x || x.best == null) return `<td><div class="lms-cell"><button type="button" class="linkbtn" data-lms="ovr" data-u="${esc(r.uid)}" data-k="${esc(c.key)}" aria-label="Set a mark for ${lab}">–</button>${x && x.locked ? '<span class="lms-flag">🔒</span>' : ''}</div></td>`;
    return `<td><div class="lms-cell"><button type="button" class="linkbtn" data-lms="ovr" data-u="${esc(r.uid)}" data-k="${esc(c.key)}" aria-label="Override ${lab}"><b>${pctStr(x.value)}</b>${x.override != null ? ' ✎' : ''}</button><span class="hint">best ${pctStr(x.best)} · latest ${pctStr(x.latest)}${x.attempts.length > 1 ? ' · ×' + x.attempts.length : ''}</span>${x.flagged ? '<span class="lms-flag">⚑ <span class="sr">integrity </span>flagged</span>' : ''}${x.locked ? '<span class="lms-flag">🔒 locked</span>' : ''}</div></td>`;
  }
  function overrideEditor(D, cur, cols) {
    const { uid, key } = T.ovr, c = cols.find(x => x.key === key), r = rowFor(D, uid, cur), x = r.cols[key] || {};
    if (!c) { T.ovr = null; return ''; }
    return `<div class="card lms-gate" id="lms-ovr"><h2>Override: ${esc(r.name)} · ${esc(c.title)}</h2><p class="hint">${x.best != null ? `Best attempt ${pctStr(x.best)}, latest ${pctStr(x.latest)}.` : 'No attempt recorded.'} The student sees the override and your reason in My grades.</p>
      <form data-lmsform="ovr" class="lms-toolbar"><div class="field"><label for="lms-ovr-pct">Mark (%)</label><input id="lms-ovr-pct" class="input" type="number" min="0" max="100" step="1" required value="${esc(x.override != null ? x.override : '')}"></div><div class="field" style="flex:2 1 260px"><label for="lms-ovr-why">Reason (required)</label><input id="lms-ovr-why" class="input" maxlength="300" required value="${esc(x.reason || '')}" placeholder="e.g. Retake under supervision on 12 Nov"></div><button type="submit" class="btn go">Save override</button>${x.override != null ? '<button type="button" class="btn ghost" data-lms="ovrdel">Remove override</button>' : ''}<button type="button" class="btn ghost" data-lms="ovrcancel">Cancel</button></form></div>`;
  }

  /* ---------------- Assignments ---------------- */
  const PHASE_SEC = { 'phase-1': 's1', 'phase-2': 's1', 'phase-3': 's1', 'phase-4': 's2', 'phase-5': 's3', 'phase-6': 's3', 'phase-7': 's3', 'phase-8': 's4', 'phase-9': 's4', 'phase-10': 's5' };
  function linkOptions(sel) {
    const groups = {}; X.catalogue().forEach(x => { (groups[x.group] = groups[x.group] || []).push(x); });
    return `<option value="">None</option>` + Object.entries(groups).map(([g, l]) => `<optgroup label="${esc(g)}">${l.map(x => `<option value="${esc(x.key)}" ${sel === x.key ? 'selected' : ''}>${esc(x.title)}</option>`).join('')}</optgroup>`).join('');
  }
  function toLocalInput(ms) { if (!ms) return ''; const d = new Date(ms), p = n => String(n).padStart(2, '0'); return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + 'T' + p(d.getHours()) + ':' + p(d.getMinutes()); }
  function assignInner(loc) {
    const g = gate(); if (g) return hero('Assignments', 'Assignments', 'Set work, collect it and mark it.') + g;
    const cur = curClass();
    if (loc.k && cur) return assignDetail(cur, loc.k, loc.tab);
    let h = hero('Assignments', 'Assignments', 'Set work with a due date, link it to a lab, a write task, an SBA milestone or a game, then collect and mark the hand-ins.');
    h += classPicker('assign'); if (!cur) return h;
    const D = needData(cur), A = assignsOf(cur.id), f = T.form.a || {}, editing = f.id && A.find(x => x.id === f.id);
    h += `<div class="card"><h2>${editing ? 'Edit assignment' : 'New assignment'}</h2><form data-lmsform="assign" aria-label="${editing ? 'Edit' : 'New'} assignment">
      <div class="formgrid"><div class="field"><label for="lms-at">Title</label><input id="lms-at" class="input" maxlength="120" required data-lmsa="title" value="${esc(f.title || '')}"></div>
      <div class="field"><label for="lms-ad">Due date and time (Atlantic time, UTC-4)</label><input id="lms-ad" class="input" type="datetime-local" data-lmsa="due" value="${esc(f.due || '')}"></div>
      <div class="field"><label for="lms-ap">Points</label><input id="lms-ap" class="input" type="number" min="1" max="1000" step="1" inputmode="numeric" data-lmsa="points" value="${esc(f.points || 20)}"></div>
      <div class="field"><label for="lms-ac">Counts towards</label><select id="lms-ac" class="select" data-lmsa="cat">${['sba', 'p2', 'p1', 'cw', 'none'].map(k => `<option value="${k}" ${(f.cat || 'cw') === k ? 'selected' : ''}>${esc(CATS[k])}</option>`).join('')}</select></div></div>
      <div class="field"><label for="lms-al">Link to a course item (optional)</label><select id="lms-al" class="select" data-lmsa="linkTo">${linkOptions(f.linkTo || '')}</select></div>
      <div class="field"><label for="lms-ai">Instructions</label><textarea id="lms-ai" class="ta" rows="6" maxlength="6000" data-lmsa="instructions">${esc(f.instructions || '')}</textarea></div>
      <div class="row"><button type="submit" class="btn go">${editing ? 'Save changes' : 'Post assignment'}</button>${editing ? '<button type="button" class="btn ghost" data-lms="acancel">Cancel editing</button>' : ''}</div></form></div>`;
    h += `<div class="card"><h2>Assignments in ${esc(cur.name)}</h2>${A.length ? `<div class="tablewrap"><table class="lms-t"><thead><tr><th scope="col">Assignment</th><th scope="col">Due</th><th scope="col">Handed in</th><th scope="col">Late</th><th scope="col">Marked</th><th scope="col">Actions</th></tr></thead><tbody>${A.map(a => { const st = D ? stats(D, a) : null; return `<tr><td><button type="button" class="linkbtn" data-go="lmsassign" data-k="${esc(a.id)}"><b>${esc(a.title)}</b></button><br><span class="hint">${esc(a.points)} points · ${esc(CATS[a.cat] || '')}${a.linkTo && X.linkInfo(a.linkTo) ? ' · ' + esc(X.linkInfo(a.linkTo).title) : ''}</span></td><td>${a.due ? esc(fmtDate(a.due, true)) : '–'}</td><td class="num">${st ? st.sub + '/' + st.n : '…'}</td><td class="num">${st ? st.late : '…'}</td><td class="num">${st ? st.marked : '…'}</td><td><div class="row"><button type="button" class="btn ghost" data-go="lmsassign" data-k="${esc(a.id)}">Submissions</button><button type="button" class="btn ghost" data-lms="copyassign" data-k="${esc(a.id)}">Copy for Classroom/Teams</button><button type="button" class="btn ghost" data-lms="aedit" data-k="${esc(a.id)}">Edit</button><button type="button" class="btn ghost" data-lms="adel" data-k="${esc(a.id)}">${T.confirm['adel' + a.id] ? 'Tap again to delete' : 'Delete'}</button></div></td></tr>`; }).join('')}</tbody></table></div>` : '<p class="hint">No assignments yet.</p>'}
      <p class="hint"><b>Copy for Classroom/Teams</b> copies the title, instructions, due date and the course link as plain text, ready to paste into a new Google Classroom or Teams assignment as a due-date reminder.</p></div>`;
    return h;
  }
  function stats(D, a) { let sub = 0, late = 0, marked = 0; D.uids.forEach(uid => { const s = (D.users[uid] || { subs: {} }).subs[a.id], m = ((D.marks[uid] || {}).a || {})[a.id]; if (s) { sub++; if (s.late) late++; } if (m && m.status === 'returned') marked++; }); return { n: D.uids.length, sub, late, marked }; }
  function assignDetail(cur, aid, openUid) {
    const back = `<div class="crumbs"><button type="button" class="linkbtn" data-go="lmsassign">← Assignments</button><span>${esc(cur.name)}</span></div>`;
    let h = hero('Assignments', 'Submissions', 'Open each hand-in, mark it with a score and feedback, and return it.');
    const a = assignsOf(cur.id).find(x => x.id === aid);
    if (!a) return h + `<div class="card">${back}<p>${T['assign:' + cur.id] ? 'This assignment was deleted.' : 'Loading…'}</p></div>`;
    const D = needData(cur); if (!D) return h + loading();
    h += `<div class="card">${back}<h2>${esc(a.title)}</h2><p class="hint">${a.due ? 'Due ' + esc(fmtDate(a.due, true)) : 'No due date'} · ${esc(a.points)} points · ${esc(CATS[a.cat] || '')}</p>${a.instructions ? `<details class="fold"><summary>Instructions</summary><p class="lms-pre">${esc(a.instructions)}</p></details>` : ''}<div class="row"><button type="button" class="btn ghost" data-lms="copyassign" data-k="${esc(a.id)}">Copy for Classroom/Teams</button></div></div>`;
    if (openUid && D.uids.includes(openUid)) h += markEditor(D, cur, a, openUid);
    const rows = D.uids.map(uid => { const s = (D.users[uid] || { subs: {} }).subs[a.id], m = ((D.marks[uid] || {}).a || {})[a.id]; return { uid, name: nameOf(uid, D), s, m, st: m && m.status === 'returned' ? 'Marked' : s ? 'To mark' : a.due && a.due < Date.now() ? 'Missing' : 'Not yet' }; }).sort((x, y) => ({ 'To mark': 0, Missing: 1, 'Not yet': 2, Marked: 3 }[x.st] - { 'To mark': 0, Missing: 1, 'Not yet': 2, Marked: 3 }[y.st]) || x.name.localeCompare(y.name));
    h += `<div class="card"><h2>Hand-ins</h2>${rows.length ? `<div class="tablewrap"><table class="lms-t"><thead><tr><th scope="col">Student</th><th scope="col">Status</th><th scope="col">Handed in</th><th scope="col">Mark</th><th scope="col"><span class="sr">Open</span></th></tr></thead><tbody>${rows.map(r => `<tr><td class="lms-sticky">${esc(r.name)}</td><td><span class="lms-pill ${r.st === 'Marked' ? 'ok' : r.st === 'Missing' ? 'bad' : r.st === 'To mark' ? 'warn' : ''}">${r.st}</span>${r.s && r.s.late ? '<span class="lms-pill warn">Late</span>' : ''}</td><td>${r.s ? esc(fmtDate(r.s.submittedAt, true)) + (r.s.count > 1 ? ' · v' + esc(r.s.count) : '') : '–'}</td><td class="num">${r.m && r.m.status === 'returned' ? esc(r.m.score) + '/' + esc(r.m.max) : '–'}</td><td><button type="button" class="btn ghost" data-go="lmsassign" data-k="${esc(a.id)}" data-tab="${esc(r.uid)}" aria-label="Open ${esc(r.name)}'s hand-in">${r.s ? 'Open and mark' : 'Mark'}</button></td></tr>`).join('')}</tbody></table></div>` : '<p class="hint">No students yet.</p>'}</div>`;
    return h;
  }
  function markEditor(D, cur, a, uid) {
    const s = (D.users[uid] || { subs: {} }).subs[a.id], m = ((D.marks[uid] || {}).a || {})[a.id] || {}, key = a.id + '|' + uid;
    const f = T.form.mark && T.form.mark.key === key ? T.form.mark : (T.form.mark = { key, score: m.score != null ? m.score : '', feedback: m.feedback || '', rubric: Object.assign({}, m.rubric || {}), sec: '' });
    const isSba = String(a.linkTo || '').indexOf('sba:') === 0 || a.cat === 'sba';
    let rub = '';
    if (isSba && window.DM_SBA_GUIDE && Array.isArray(window.DM_SBA_GUIDE.sections)) {
      const secs = window.DM_SBA_GUIDE.sections, sec = f.sec || PHASE_SEC[String(a.linkTo || '').slice(4)] || 'all', use = sec === 'all' ? secs : secs.filter(x => x.id === sec);
      let tot = 0, got = 0;
      const body = use.map(sc => `<tr><th colspan="2" scope="colgroup">${esc(sc.name)}</th></tr>` + sc.items.map((it, i) => { const id = sc.id + '-' + i, v = f.rubric[id] ? num(f.rubric[id].m, '') : ''; tot += it[1]; if (v !== '') got += +v; return `<tr><td><label for="lms-rb-${id}"><b>${esc(it[0])}</b></label><details class="fold"><summary>Descriptors</summary><p class="hint"><b>Full:</b> ${esc(it[2])}<br><b>Partial:</b> ${esc(it[3])}<br><b>None:</b> ${esc(it[4])}</p></details></td><td><select id="lms-rb-${id}" class="select" data-lmsc="rub" data-k="${esc(id)}" data-c="${esc(it[0])}" data-max="${it[1]}"><option value="">–</option>${Array.from({ length: it[1] + 1 }, (_, n) => `<option value="${n}" ${String(v) === String(n) ? 'selected' : ''}>${n} / ${it[1]}${n === it[1] ? ' · full' : n === 0 ? ' · none' : ''}</option>`).join('')}</select></td></tr>`; }).join('')).join('');
      rub = `<div class="card"><h3>SBA rubric</h3><div class="lms-toolbar"><div class="field"><label for="lms-rsec">Criteria from the SBA guide</label><select id="lms-rsec" class="select" data-lmsc="rsec"><option value="all" ${sec === 'all' ? 'selected' : ''}>Whole SBA</option>${secs.map(x => `<option value="${esc(x.id)}" ${sec === x.id ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select></div></div><div class="tablewrap"><table class="lms-t lms-rub"><tbody>${body}</tbody></table></div><p class="hint" aria-live="polite">Rubric total <b>${got} / ${tot}</b> → <b>${tot ? Math.round(got / tot * num(a.points, 100)) : 0} / ${esc(a.points)}</b> points. <button type="button" class="linkbtn" data-lms="rubuse" data-v="${tot ? Math.round(got / tot * num(a.points, 100)) : 0}">Use this as the score</button></p></div>`;
    }
    return `<div class="card lms-gate" id="lms-mark"><h2>${esc(nameOf(uid, D))}</h2>${s ? `<p class="hint">Handed in ${esc(fmtDate(s.submittedAt, true))}${s.late ? ' · <b>Late</b>' : ''}${s.count > 1 ? ' · version ' + esc(s.count) : ''}</p>${X.subBody(s)}` : '<p class="hint">Nothing handed in. You can still record a mark (for example, work handed in on paper).</p>'}</div>${rub}
      <div class="card"><h3>Mark and return</h3><form data-lmsform="mark" data-a="${esc(a.id)}" data-u="${esc(uid)}"><div class="formgrid"><div class="field"><label for="lms-ms">Score out of ${esc(a.points)}</label><input id="lms-ms" class="input" type="number" min="0" max="${esc(a.points)}" step="0.5" inputmode="decimal" required data-lmsm="score" value="${esc(f.score)}"></div></div>
      <div class="field"><label for="lms-mf">Feedback for the student</label><textarea id="lms-mf" class="ta" rows="5" maxlength="6000" data-lmsm="feedback">${esc(f.feedback)}</textarea></div>
      <div class="row"><button type="submit" class="btn go">${m.status === 'returned' ? 'Update and return' : 'Return to student'}</button>${m.status === 'returned' ? `<span class="hint">Returned ${esc(fmtDate(m.at, true))}. The student can no longer resubmit.</span>` : '<span class="hint">After you return it, the student sees the mark and feedback and can no longer resubmit.</span>'}</div></form></div>`;
  }

  /* ---------------- Announcements ---------------- */
  function newsInner() {
    const g = gate(); if (g) return hero('Announcements', 'Announcements', 'Post news to a class.') + g;
    let h = hero('Announcements', 'Announcements', 'Post news to a class. Students see it on the course home and in My class, with a "New" badge until they read it.');
    const cur = curClass(); h += classPicker('news'); if (!cur) return h;
    subClass(cur.id);
    const f = T.form.n || {};
    h += `<div class="card"><h2>New announcement</h2><form data-lmsform="news"><div class="field"><label for="lms-nt">Title</label><input id="lms-nt" class="input" maxlength="140" required data-lmsn="title" value="${esc(f.title || '')}"></div><div class="field"><label for="lms-nb">Message</label><textarea id="lms-nb" class="ta" rows="5" maxlength="4000" data-lmsn="body">${esc(f.body || '')}</textarea></div><label class="row"><input type="checkbox" id="lms-np" data-lmsn="pinned" ${f.pinned ? 'checked' : ''}> <span>Pin to the top</span></label><div class="row"><button type="submit" class="btn go">Post to ${esc(cur.name)}</button></div></form></div>`;
    const N = newsOf(cur.id);
    h += `<div class="card"><h2>Posted</h2>${N.length ? `<ul class="lms-news">${N.map(n => `<li class="${n.pinned ? 'pin' : ''}"><div class="lms-nh"><b>${n.pinned ? '📌 ' : ''}${esc(n.title)}</b><span class="hint">${esc(fmtDate(n.at, true))}</span></div>${n.body ? `<p class="lms-pre">${esc(n.body)}</p>` : ''}<div class="row"><button type="button" class="btn ghost" data-lms="npin" data-k="${esc(n.id)}">${n.pinned ? 'Unpin' : 'Pin'}</button><button type="button" class="btn ghost" data-lms="ndel" data-k="${esc(n.id)}">${T.confirm['ndel' + n.id] ? 'Tap again to delete' : 'Delete'}</button></div></li>`).join('')}</ul>` : '<p class="hint">Nothing posted yet.</p>'}</div>`;
    return h;
  }

  /* ---------------- Exports and LMS integration ---------------- */
  function exportInner() {
    const g = gate(); if (g) return hero('Exports', 'Exports and LMS integration', 'Google Classroom and Microsoft Teams.') + g;
    let h = hero('Exports', 'Exports and LMS integration', 'Download the gradebook ready to import into Google Classroom or Microsoft Teams, and post the course link where your students already are.');
    const cur = curClass(); h += classPicker('export');
    if (cur) {
      const D = needData(cur), cols = D ? exportCols(D, cur) : [];
      h += `<div class="card"><h2>Download grades for ${esc(cur.name)}</h2><label class="row"><input type="checkbox" id="lms-incl" data-lmsc="incl" ${T.exportIncl ? 'checked' : ''}> <span>Include course tests, papers and labs as well as LMS assignments</span></label>
        <p class="hint">${D ? cols.length + ' columns, ' + D.uids.length + ' students, in course order.' : 'Loading…'} Emails are fetched from each student's account only when you download, and are never stored in the course.</p>
        <div class="lms-tabs"><button type="button" class="btn go" data-lms="exgc" ${D ? '' : 'disabled'}>Google Classroom CSV</button><button type="button" class="btn go" data-lms="exteams" ${D ? '' : 'disabled'}>Teams Assignments / Excel CSV</button></div>
        <h3>One assignment for Classroom</h3><div class="lms-toolbar"><div class="field"><label for="lms-exone">Assignment or assessment</label><select id="lms-exone" class="select" data-lmsc="exone">${cols.map(c => `<option value="${esc(c.key)}" ${T.form.exone === c.key ? 'selected' : ''}>${esc(c.title)}</option>`).join('')}</select></div><button type="button" class="btn ghost" data-lms="exone" ${D && cols.length ? '' : 'disabled'}>Download Email, Grade CSV</button></div>
        <p class="hint" aria-live="polite">${esc(T.msg || '')}</p>
        <details class="fold"><summary>What is in each file</summary><ul>
          <li><b>Google Classroom CSV:</b> Email, Student name, then one column per assignment in course order. Classroom matches students by email. Import it with a grades add-on in Google Sheets, or copy each column into the assignment's grades.</li>
          <li><b>Email, Grade CSV:</b> one assignment, for pasting into a single Classroom assignment's grades.</li>
          <li><b>Teams Assignments / Excel CSV:</b> Email, Name, one column per assignment, then the weighted total. It opens in Excel; Teams matches students by email.</li>
          <li>LMS assignments are in points (column header shows the maximum). Course tests and papers are percentages. Blank means no mark yet.</li></ul></details></div>`;
    }
    const url = (L.classesDoc && L.classesDoc.courseUrl) || '';
    h += `<div class="card"><h2>Share course link</h2>${url ? `<p>Course link: <a href="${esc(safeUrl(url))}" target="_blank" rel="noopener">${esc(url)}</a> <button type="button" class="btn ghost" data-lms="copyurl">Copy link</button></p>` : '<p class="fb note">Paste the course link on the <button type="button" class="linkbtn" data-go="lmsteach">Teacher dashboard</button> first, so the buttons below can copy it.</p>'}
      <p class="fb note"><b>Students must open the link signed in to their own account.</b> Share the course with them as <b>Contributors</b> in the share menu first, so they can join their class and hand in work.</p>
      <div class="grid2"><div><h3>Google Classroom</h3><ol class="lms-steps"><li>Open your class and go to <b>Classwork</b>.</li><li>Choose <b>Create → Material</b>, give it a title such as "Digital Media Unit 1 online course".</li><li>Press <b>Add → Link</b> (the link icon), paste the course link and press <b>Add link</b>.</li><li>Press <b>Post</b>. It stays in Classwork for the whole term.</li><li>Or, inside an <b>Assignment</b>, add the link and leave the setting on <b>Students can view</b> (not "make a copy").</li></ol></div>
      <div><h3>Microsoft Teams</h3><ol class="lms-steps"><li>Open the class team and go to the <b>General</b> channel.</li><li>Press <b>+</b> (Add a tab) at the top and choose <b>Website</b>.</li><li>Name the tab "Digital Media course", paste the course link and press <b>Save</b>. If the page will not show inside Teams, students press the tab's "Open in browser" button.</li><li>Or, in <b>Assignments → Create → Assignment</b>, choose <b>Attach → Link</b> and paste the course link.</li><li>Press <b>Assign</b>.</li></ol></div></div>
      <p class="hint">For each LMS assignment, use <b>Copy for Classroom/Teams</b> on the Assignments page to paste the same title, instructions and due date into Classroom or Teams, so students get that platform's due-date reminders.</p></div>`;
    return h;
  }
  function exportCols(D, cur) { return columnsFor(D, cur).filter(c => c.kind === 'assign' || T.exportIncl).sort((a, b) => a.order - b.order); }
  function cellVal(r, c) {
    const x = r.cols[c.key]; if (!x) return '';
    if (c.kind === 'assign') { if (x.override != null) return Math.round(x.override / 100 * num(c.assign.points, 100) * 10) / 10; if (x.mark) return num(x.mark.score, ''); return ''; }
    return x.value == null ? '' : Math.round(x.value);
  }
  const hdr = c => c.title + (c.kind === 'assign' ? ' (/' + num(c.assign.points, 100) + ')' : ' (%)');
  function csvCell(v) { if (v == null) return ''; if (typeof v === 'number') return String(v); let s = String(v); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
  const toCSV = rows => '﻿' + rows.map(r => r.map(csvCell).join(',')).join('\r\n') + '\r\n';
  async function people(uids) {
    let ps = {}; try { ps = await L.user.profiles(uids); } catch (e) { ps = {}; }
    const out = {}; let noEmail = 0; uids.forEach(id => { const p = ps[id] || {}; out[id] = { name: p.name || '', email: p.email || '' }; if (!p.email) noEmail++; });
    return { out, noEmail };
  }
  let DL; function getDL() { if (DL !== undefined) return Promise.resolve(DL); return Promise.resolve().then(() => window.claude && window.claude.use ? window.claude.use('downloads') : null).catch(() => null).then(d => { DL = d || null; return DL; }); }
  async function saveFile(filename, text) {
    const d = await getDL();
    if (d) { try { await d.save({ filename, data: text }); return 'saved'; } catch (e) { if (e && e.code === 'declined') return 'declined'; } }
    try { const blob = new Blob([text], { type: 'text/csv' }), u = URL.createObjectURL(blob), a = document.createElement('a'); a.href = u; a.download = filename; a.dataset.direct = '1'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); return 'saved'; } catch (e) { return 'failed'; }
  }
  const fileSafe = s => String(s || 'class').replace(/[^A-Za-z0-9 _-]+/g, '').trim().replace(/\s+/g, '-').slice(0, 40) || 'class';
  async function doExport(kind) {
    const cur = curClass(), D = cur && T.data[cur.id]; if (!D) return;
    T.msg = 'Preparing the file…'; X.schedule();
    const { out, noEmail } = await people(D.uids);
    const rows = D.uids.map(uid => Object.assign(rowFor(D, uid, cur), { p: out[uid] })).sort((a, b) => (a.p.name || a.name).localeCompare(b.p.name || b.name));
    const cols = exportCols(D, cur), nm = r => r.p.name || r.name;
    let data, fname;
    if (kind === 'gc') { data = toCSV([['Email', 'Student name'].concat(cols.map(hdr))].concat(rows.map(r => [r.p.email, nm(r)].concat(cols.map(c => cellVal(r, c)))))); fname = fileSafe(cur.name) + '-Google-Classroom-grades.csv'; }
    else if (kind === 'teams') { data = toCSV([['Email', 'Name'].concat(cols.map(hdr), ['Weighted total (%)'])].concat(rows.map(r => [r.p.email, nm(r)].concat(cols.map(c => cellVal(r, c)), [r.total == null ? '' : Math.round(r.total * 10) / 10])))); fname = fileSafe(cur.name) + '-Teams-grades.csv'; }
    else { const c = columnsFor(D, cur).find(x => x.key === (T.form.exone || (exportCols(D, cur)[0] || {}).key)); if (!c) { T.msg = 'Choose an assignment first.'; X.schedule(); return; } data = toCSV([['Email', 'Grade']].concat(rows.map(r => [r.p.email, cellVal(r, c)]))); fname = fileSafe(cur.name) + '-' + fileSafe(c.title) + '-grades.csv'; }
    window.DM_LMS_LAST_EXPORT = { filename: fname, data }; /* for the test harness; this page's memory only */
    const st = await saveFile(fname, data);
    T.msg = (st === 'saved' ? 'Downloaded ' + fname + '.' : st === 'declined' ? 'Download cancelled.' : 'Download is not available here.') + (noEmail ? ` ${noEmail} student${noEmail === 1 ? ' has' : 's have'} no email: turn on the email scope for this course, and check your organisation allows sharing emails.` : '');
    X.schedule(); X.announce(T.msg);
  }
  async function copyText(t) {
    try { await navigator.clipboard.writeText(t); return true; } catch (e) { }
    try { const ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;left:-9999px;top:0'; document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok; } catch (e) { return false; }
  }
  function assignText(a) {
    const url = (L.classesDoc && L.classesDoc.courseUrl) || '[paste the course link here]';
    return [a.title, '', a.due ? 'Due: ' + fmtDate(a.due, true) + ' (Atlantic time, UTC-4)' : 'No due date', 'Points: ' + num(a.points, 0), '', a.instructions || '', '', 'Hand it in on the online course (sign in to your own account first): ' + url, 'Open My class, then choose "' + a.title + '".'].join('\n').replace(/\n{3,}/g, '\n\n');
  }

  /* ---------------- events ---------------- */
  const H = X.HANDLERS;
  H.submit.newclass = () => createClass(T.form.cname, T.form.cterm);
  H.submit.courseurl = () => { const v = String(T.form.curl != null ? T.form.curl : '').trim(); if (v && !safeUrl(v)) { X.toast('The link must start with https://'); return; } saveClasses(classes(), { courseUrl: safeUrl(v) }).then(() => { T.form.curl = null; X.toast('Course link saved.'); }).catch(e => X.toast(X.errMsg(e))); };
  H.submit.weights = f => { const c = curClass(); if (!c) return; const w = { mode: 'custom' }; ['p1', 'p2', 'sba', 'cw'].forEach(k => { w[k] = Math.max(0, Math.min(100, num(f.elements[k].value, 0))); }); const s = w.p1 + w.p2 + w.sba + w.cw; if (!s) { X.toast('At least one weight must be above 0.'); return; } updateClass(c.id, { weights: w }).then(() => X.toast('Weights saved' + (s !== 100 ? ' (they add up to ' + s + '%, so they are scaled)' : '') + '.')).catch(() => { }); };
  H.submit.ovr = () => {
    const c = curClass(), o = T.ovr; if (!c || !o) return;
    const pct = num((document.getElementById('lms-ovr-pct') || {}).value, NaN), why = String((document.getElementById('lms-ovr-why') || {}).value || '').trim();
    if (!Number.isFinite(pct) || pct < 0 || pct > 100) { X.toast('Enter a mark from 0 to 100.'); return; }
    if (!why) { X.toast('Give a reason for the override.'); return; }
    X.writeDoc('lms/marks/' + o.uid + '/ovr:' + seg(o.key), { v: 1, pct, reason: why.slice(0, 300), at: Date.now() }).then(() => { const D = T.data[c.id]; if (D) { D.marks[o.uid] = D.marks[o.uid] || { a: {}, ovr: {} }; D.marks[o.uid].ovr[o.key] = { pct, reason: why }; } T.ovr = null; X.toast('Override saved.'); X.schedule(); }).catch(e => X.toast(X.errMsg(e)));
  };
  H.submit.assign = () => {
    const c = curClass(), f = T.form.a || {}; if (!c) return;
    const title = String(f.title || '').trim(); if (!title) { X.toast('Give the assignment a title.'); return; }
    const due = f.due ? new Date(f.due).getTime() : 0;
    const id = f.id || seg(rid('a'));
    const old = assignsOf(c.id).find(x => x.id === id);
    const body = { v: 1, id, title: title.slice(0, 120), instructions: String(f.instructions || '').slice(0, 6000), due: Number.isFinite(due) ? due : 0, points: Math.max(1, Math.min(1000, Math.round(num(f.points, 20)))), linkTo: X.linkInfo(f.linkTo) ? f.linkTo : '', cat: CATS[f.cat] ? f.cat : 'cw', createdAt: old ? num(old.createdAt, Date.now()) : Date.now() };
    X.writeDoc('lms/assign/' + c.id + '/' + id, body).then(() => { T.form.a = {}; X.toast(old ? 'Assignment updated.' : 'Assignment posted to ' + c.name + '.'); X.schedule(); }).catch(e => X.toast(X.errMsg(e)));
  };
  H.submit.mark = fm => {
    const c = curClass(); if (!c) return; const a = assignsOf(c.id).find(x => x.id === fm.dataset.a), uid = fm.dataset.u; if (!a || !okSeg(uid)) return;
    const f = T.form.mark || {}, score = num(f.score, NaN);
    if (!Number.isFinite(score) || score < 0 || score > num(a.points, 100)) { X.toast('Enter a score from 0 to ' + a.points + '.'); return; }
    const rubric = {}; Object.entries(f.rubric || {}).forEach(([k, v]) => { if (v && v.m !== '' && v.m != null) rubric[seg(k)] = { c: String(v.c || '').slice(0, 80), m: num(v.m, 0), max: num(v.max, 0), level: num(v.m, 0) >= num(v.max, 0) ? 'Full' : num(v.m, 0) === 0 ? 'None' : 'Partial' }; });
    const body = { v: 1, assignId: a.id, score, max: num(a.points, 100), feedback: String(f.feedback || '').slice(0, 6000), rubric, status: 'returned', at: Date.now() };
    X.writeDoc('lms/marks/' + uid + '/a:' + seg(a.id), body).then(() => { const D = T.data[c.id]; if (D) { D.marks[uid] = D.marks[uid] || { a: {}, ovr: {} }; D.marks[uid].a[a.id] = body; } T.form.mark = null; X.toast('Returned to the student.'); const A = X.api; if (A) A.go({ v: 'lmsassign', k: a.id }); }).catch(e => X.toast(X.errMsg(e)));
  };
  H.submit.news = () => {
    const c = curClass(), f = T.form.n || {}; if (!c) return;
    const title = String(f.title || '').trim(); if (!title) { X.toast('Give the announcement a title.'); return; }
    const id = seg(rid('n'));
    X.writeDoc('lms/news/' + c.id + '/' + id, { v: 1, id, title: title.slice(0, 140), body: String(f.body || '').slice(0, 4000), pinned: !!f.pinned, at: Date.now() }).then(() => { T.form.n = {}; X.toast('Posted to ' + c.name + '.'); X.schedule(); }).catch(e => X.toast(X.errMsg(e)));
  };
  H.input.push(t => {
    if (t.dataset.lmst) { T.form[t.dataset.lmst] = t.value; if (t.dataset.lmst === 'q') { T.q = t.value; X.schedule(); } return; }
    if (t.dataset.lmsa) { T.form.a = T.form.a || {}; T.form.a[t.dataset.lmsa] = t.value; return; }
    if (t.dataset.lmsn) { T.form.n = T.form.n || {}; T.form.n[t.dataset.lmsn] = t.type === 'checkbox' ? t.checked : t.value; return; }
    if (t.dataset.lmsm) { T.form.mark = T.form.mark || {}; T.form.mark[t.dataset.lmsm] = t.value; }
  });
  H.change.push(t => {
    const k = t.dataset.lmsc;
    if (t.dataset.lmsa) { T.form.a = T.form.a || {}; T.form.a[t.dataset.lmsa] = t.value; return; }
    if (t.dataset.lmsn) { T.form.n = T.form.n || {}; T.form.n[t.dataset.lmsn] = t.type === 'checkbox' ? t.checked : t.value; return; }
    if (!k) return;
    if (k === 'cpick') setCid(t.value);
    else if (k === 'filter') { T.filter = t.value; X.schedule(); }
    else if (k === 'incl') { T.exportIncl = t.checked; lsSet('t.incl', t.checked); X.schedule(); }
    else if (k === 'exone') { T.form.exone = t.value; }
    else if (k === 'rsec') { T.form.mark = T.form.mark || {}; T.form.mark.sec = t.value; X.schedule(); }
    else if (k === 'rub') { const f = T.form.mark = T.form.mark || {}; f.rubric = f.rubric || {}; f.rubric[t.dataset.k] = { c: t.dataset.c, m: t.value === '' ? '' : +t.value, max: +t.dataset.max }; X.schedule(); }
    else if (k === 'colcat') { const c = curClass(); if (!c) return; const cc = Object.assign({}, c.colCats || {}, { [t.dataset.k]: t.value }); updateClass(c.id, { colCats: cc }).then(() => X.announce('Category saved.')).catch(() => { }); }
  });
  const arm = (b, key, fn) => { if (!T.confirm[key]) { T.confirm[key] = 1; X.schedule(); setTimeout(() => { delete T.confirm[key]; X.schedule(); }, 3500); return; } delete T.confirm[key]; fn(); };
  Object.assign(H.click, {
    trefresh: () => { const c = curClass(); if (c) loadClass(c.id, true); },
    copycode: b => { const c = classes().find(x => x.id === b.dataset.c); if (c) copyText(c.code).then(ok => X.toast(ok ? 'Join code ' + c.code + ' copied.' : 'Join code: ' + c.code)); },
    newcode: b => { const c = classes().find(x => x.id === b.dataset.c); if (c) newCode(c); },
    delclass: b => { const c = classes().find(x => x.id === b.dataset.c); if (c) arm(b, 'del' + c.id, () => deleteClass(c)); },
    sort: b => { const k = b.dataset.k; T.sort = { k, dir: T.sort.k === k ? -T.sort.dir : (k === 'name' ? 1 : -1) }; lsSet('t.sort', T.sort); X.schedule(); },
    preset: b => { const c = curClass(), p = PRESETS[b.dataset.k]; if (c && p) updateClass(c.id, { weights: Object.assign({}, p) }).then(() => X.toast('Weighting set to ' + (b.dataset.k === 'cape' ? 'CAPE' : 'internal coursework') + '.')).catch(() => { }); },
    ovr: b => { T.ovr = { uid: b.dataset.u, key: b.dataset.k }; X.schedule(); setTimeout(() => { const el = document.getElementById('lms-ovr-pct'); if (el) { el.focus(); try { el.scrollIntoView({ block: 'center' }); } catch (e) { } } }, 60); },
    ovrcancel: () => { T.ovr = null; X.schedule(); },
    ovrdel: () => { const c = curClass(), o = T.ovr; if (!c || !o) return; X.writeDoc('lms/marks/' + o.uid + '/ovr:' + seg(o.key), null, 'delete').then(() => { const D = T.data[c.id]; if (D && D.marks[o.uid]) delete D.marks[o.uid].ovr[o.key]; T.ovr = null; X.toast('Override removed.'); X.schedule(); }).catch(e => X.toast(X.errMsg(e))); },
    aedit: b => { const c = curClass(), a = c && assignsOf(c.id).find(x => x.id === b.dataset.k); if (!a) return; T.form.a = { id: a.id, title: a.title, due: toLocalInput(a.due), points: a.points, cat: a.cat, linkTo: a.linkTo, instructions: a.instructions }; X.schedule(); setTimeout(() => { const el = document.getElementById('lms-at'); if (el) { el.focus(); try { el.scrollIntoView({ block: 'center' }); } catch (e) { } } }, 60); },
    acancel: () => { T.form.a = {}; X.schedule(); },
    adel: b => { const c = curClass(); if (!c) return; arm(b, 'adel' + b.dataset.k, () => X.writeDoc('lms/assign/' + c.id + '/' + seg(b.dataset.k), null, 'delete').then(() => X.toast('Assignment deleted. Hand-ins stay in student storage.')).catch(e => X.toast(X.errMsg(e)))); },
    copyassign: b => { const c = curClass(), a = c && assignsOf(c.id).find(x => x.id === b.dataset.k); if (!a) return; const t = assignText(a); copyText(t).then(ok => { X.toast(ok ? 'Copied. Paste it into a new Classroom or Teams assignment.' : 'Copy did not work here. Select the text and copy it.'); if (!ok) { T.msg = t; } }); },
    copyurl: () => { const u = (L.classesDoc && L.classesDoc.courseUrl) || ''; if (u) copyText(u).then(ok => X.toast(ok ? 'Course link copied.' : u)); },
    rubuse: b => { T.form.mark = T.form.mark || {}; T.form.mark.score = b.dataset.v; X.schedule(); X.announce('Score set to ' + b.dataset.v + '.'); },
    npin: b => { const c = curClass(), n = c && newsOf(c.id).find(x => x.id === b.dataset.k); if (n) X.writeDoc('lms/news/' + c.id + '/' + seg(n.id), Object.assign({}, n, { pinned: !n.pinned })).catch(e => X.toast(X.errMsg(e))); },
    ndel: b => { const c = curClass(); if (!c) return; arm(b, 'ndel' + b.dataset.k, () => X.writeDoc('lms/news/' + c.id + '/' + seg(b.dataset.k), null, 'delete').then(() => X.toast('Announcement deleted.')).catch(e => X.toast(X.errMsg(e)))); },
    exgc: () => doExport('gc'), exteams: () => doExport('teams'), exone: () => { const s = document.getElementById('lms-exone'); if (s) T.form.exone = s.value; doExport('one'); }
  });

  /* ---------------- register ---------------- */
  const tv = () => isT();
  const fresh = () => { const c = curClass(); if (c && isT()) { subClass(c.id); loadClass(c.id, false, 10000); } }; /* on every navigation to a teacher view */
  X.register({ view: 'lmsteach', mount: fresh, title: 'Teacher dashboard', tile: { icon: '🧑‍🏫', meta: 'Classes, join codes, progress and at-risk students. Teachers only.' }, visible: tv, inner: dashInner });
  X.register({ view: 'lmsbook', mount: fresh, title: 'Gradebook', tile: { icon: '📒', meta: 'Best and latest marks, overrides, CAPE weighting and indicative bands. Teachers only.' }, visible: tv, inner: bookInner });
  X.register({ view: 'lmsassign', mount: fresh, title: 'Assignments', tile: { icon: '📝', meta: 'Set work, collect hand-ins and mark them with feedback. Teachers only.' }, visible: tv, inner: assignInner });
  X.register({ view: 'lmsnews', mount: fresh, title: 'Announcements', tile: { icon: '📣', meta: 'Post news to a class, with pinning. Teachers only.' }, visible: tv, inner: newsInner });
  X.register({ view: 'lmsexport', mount: fresh, title: 'Exports and LMS integration', tile: { icon: '⬇️', meta: 'Google Classroom and Teams grade files, and how to post the course link. Teachers only.' }, visible: tv, inner: exportInner });
  /* Teacher Edition only: the information card */
  X.register({ view: 'lmsinfo', title: 'Gradebook and LMS', tile: { icon: '📒', meta: 'Where to find the gradebook, assignments and class tools.' }, visible: TE, inner: () => hero('Gradebook', 'Gradebook and LMS', 'Classes, assignments and grades.') + gate() });
  X.ready.then(() => { if (isT()) { const c = curClass(); if (c) subClass(c.id); } });
})();
