/* CAPE Communication Studies course player
   Developed by Kester Small. Runs as a web page or as a SCORM 1.2 package. */
(function () {
'use strict';

/* ---------------- helpers ---------------- */
const ORDER = ['M1', 'M2', 'M3', 'P3'];
const MODS = (window.COURSE_MODULES || []).slice().sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const strip = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const wc = t => (t.trim() ? t.trim().split(/\s+/).length : 0);
const yt = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } if (b.length > 1 && b.every((x, i) => x === a[i])) [b[0], b[1]] = [b[1], b[0]]; return b; }
const INTERACTIVE = ['mcq', 'multi', 'sort', 'pick', 'order', 'match', 'scenario', 'write'];

/* ---------------- sound effects manager ---------------- */
const SFXM = {
  enabled: true,
  counters: { click: 0, alert: 0, zombie: 0, success: 0, reward: 0, vault: 0 },
  play(name, volume = 0.5) {
    if (!this.enabled) return;
    try {
      const url = `audio/${name}.mp3`;
      const audio = new Audio(url);
      audio.volume = Math.max(0, Math.min(1, volume));
      audio.play().catch(() => {});
    } catch (e) {}
  },
  rotate(name, variants = 1, volume = 0.5) {
    const idx = (this.counters[name] || 0) % (variants + 1) || 0;
    this.counters[name] = (this.counters[name] || 0) + 1;
    const variant = idx === 0 ? name : `${name}${idx + 1}`;
    this.play(variant, volume);
  },
  click() { this.rotate('click', 1, 0.25); },
  success() { this.rotate('success', 1, 0.6); },
  reward() { this.play('reward', 0.7); },
  alert() { this.rotate('alert', 2, 0.65); },
  zombie() { this.rotate('zombie', 2, 0.35); },
  wrong() { this.play('wrong', 0.45); },
  vault() { this.rotate('vault', 3, 0.7); },
  applause() { this.play('reward', 0.8); }
};

/* ---------------- state ---------------- */
const LS = 'capeCS.v1';
const BLANK = () => ({ name: '', xp: 0, prog: {}, tests: {}, p2: {}, easy: {}, lv: {}, level: 2, secLv: {}, teacher: false, loc: { v: 'home' }, last: null, seen: {} });
function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
let S = Object.assign(BLANK(), lsGet(LS) || {});
const TEACHER_ED = !!window.COURSE_TEACHER_EDITION;
const OPEN_ALL = TEACHER_ED || !!window.COURSE_OPEN_ALL; // Student's Version with every section open (no release dates or step-by-step locks) // set only by the Teacher's Version build
S.teacher = TEACHER_ED;
S.lv = S.lv || {}; S.secLv = S.secLv || {}; if (![1, 2, 3].includes(S.level)) S.level = 2;
const DRAFTS = Object.assign({}, lsGet(LS + '.drafts') || {});
const ATTEMPTS = {};
let T = {};

/* ---------------- SCORM 1.2 adapter ---------------- */
const SCORM = {
  api: null,
  find(w) { let n = 0; while (w && n < 12) { try { if (w.API) return w.API; } catch (e) { return null; } if (w.parent === w) break; w = w.parent; n++; } return null; },
  init() {
    this.api = this.find(window) || (window.opener ? this.find(window.opener) : null);
    if (!this.api) return;
    try {
      this.api.LMSInitialize('');
      const raw = this.api.LMSGetValue('cmi.suspend_data');
      if (raw) { const d = JSON.parse(raw); Object.assign(S, { prog: d.p || {}, tests: d.t || {}, p2: d.w || {}, xp: d.x || 0, loc: d.l || S.loc, name: d.n || S.name, pscore: d.ps || {}, pdone: d.pd || {}, coins: d.c || 0, owned: d.o || {}, profile: d.pr || {}, skin: d.sk || '', zdone: d.z || {}, zskill: d.zs || {}, dayStreak: d.ds || 0, lastDaily: d.ld || '', seenCarib: d.sc || 0, ach: d.ac || {}, cdates: d.cd || {}, facilitator: d.fa || '', zexpert: d.zx || '', zexpertOwn: d.zo || '', level: d.gl || 2, secLv: d.sl || {} }); }
      const nm = this.api.LMSGetValue('cmi.core.student_name');
      if (nm && !S.name) { const parts = nm.split(','); S.name = (parts[1] || parts[0]).trim(); }
      if (this.api.LMSGetValue('cmi.core.lesson_status') === 'not attempted') this.api.LMSSetValue('cmi.core.lesson_status', 'incomplete');
      this.api.LMSCommit('');
    } catch (e) { this.api = null; }
  },
  save() {
    if (!this.api) return;
    try {
      const d = JSON.stringify({ p: S.prog, t: S.tests, w: S.p2, x: S.xp, l: S.loc, n: S.name, ps: S.pscore || {}, pd: S.pdone || {}, c: S.coins || 0, o: S.owned || {}, pr: S.profile || {}, sk: S.skin || '', z: S.zdone || {}, zs: S.zskill || {}, ds: S.dayStreak || 0, ld: S.lastDaily || '', sc: S.seenCarib ? 1 : 0, ac: S.ach || {}, cd: S.cdates || {}, fa: S.facilitator || '', zx: S.zexpert || '', zo: S.zexpertOwn || '', gl: S.level || 2, sl: S.secLv || {} });
      let dd = d;
      if (dd.length > 4000) { const o = JSON.parse(dd); delete o.l; delete o.pd; delete o.zs; dd = JSON.stringify(o); }
      if (dd.length <= 4000) this.api.LMSSetValue('cmi.suspend_data', dd);
      const scores = MODS.map(m => S.tests[m.id] || 0);
      this.api.LMSSetValue('cmi.core.score.min', '0');
      this.api.LMSSetValue('cmi.core.score.max', '100');
      this.api.LMSSetValue('cmi.core.score.raw', String(Math.round(scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length))));
      this.api.LMSSetValue('cmi.core.lesson_location', JSON.stringify(S.loc).slice(0, 250));
      if (courseComplete()) this.api.LMSSetValue('cmi.core.lesson_status', 'passed');
      this.api.LMSCommit('');
    } catch (e) { }
  },
  finish() { if (!this.api) return; try { this.save(); this.api.LMSFinish(''); } catch (e) { } this.api = null; }
};
let saveTimer;
function save() { try { window.dispatchEvent(new CustomEvent('course:save')); } catch (e) { } lsSet(LS, S); clearTimeout(saveTimer); saveTimer = setTimeout(() => SCORM.save(), 400); }
function saveDrafts() { lsSet(LS + '.drafts', DRAFTS); }
/* ---- assessment history (tools/tracker.js listens) ----
   One window event 'course:result' per finished attempt of anything scored, dispatched synchronously BEFORE the result
   screen is drawn, so the attempt is in the student's history when the result appears:
     detail {kind, id, title, module, unit, score, max, pct, level, secs, at (ISO time), loc (where to retake it), est, practice}
     kind: activity | write | test | paper | paper2 | quiz | escape | zombie | game | lab
   A listener that stores the attempt sets detail.saved = true (and detail.key); the result screen then shows
   "✓ Saved to your assessment history" with a "See my history" button. Games and simulators post
   {type:'dm:result', kind, id, title, score, max, pct, level} to this page; tools/labs.js dispatches 'dm:result' (kind lab). */
function courseResult(d) {
  const o = Object.assign({ module: '', unit: '', score: null, max: null, pct: null, level: null, secs: null }, d);
  ['score', 'max', 'pct', 'secs'].forEach(k => { o[k] = o[k] == null || o[k] === '' || !isFinite(+o[k]) ? null : +o[k]; });
  if (o.pct == null && o.score != null && o.max > 0) o.pct = Math.round(o.score / o.max * 100);
  o.id = String(o.id == null ? '' : o.id); o.title = String(o.title || o.id || o.kind); o.at = new Date().toISOString();
  try { window.dispatchEvent(new CustomEvent('course:result', { detail: o })); } catch (e) { }
  return o;
}
const tSecs = t0 => { t0 = t0 || (T && T.t0); return t0 ? Math.max(0, Math.round((Date.now() - t0) / 1000)) : null; };
function savedHTML(r) { if (r === undefined) r = T.saved; if (!r) return ''; return (r.saved ? `<p class="saved-note" role="status"><span>✓ Saved to your assessment history</span><button type="button" class="btn ghost sm" data-go="tracker" data-k="${esc(r.key || '')}">See my history</button></p>` : '') + wsBarHTML(r); }
function wsBarHTML(r) { r = r || {}; const n = v => v == null || v === '' || !isFinite(+v) ? '' : +v; return `<div class="ws-row"><span>📄 Keep a copy or hand in this work</span><span class="ws-bar" data-title="${esc(r.title || '')}" data-score="${n(r.score)}" data-max="${n(r.max)}" data-pct="${n(r.pct)}"><button type="button" class="btn ghost sm" data-ws="pdf">🖨 Save as PDF</button><button type="button" class="btn ghost sm" data-ws="doc">⬇ Word</button><button type="button" class="btn gold sm" data-ws="submit">📤 Submit</button></span></div>`; }
function locCopy() { const o = {}; Object.keys(S.loc || {}).forEach(k => { const x = S.loc[k]; if (x != null && /^(string|number|boolean)$/.test(typeof x)) o[k] = x; }); return o; }
function screenResult(v, ok, end) {
  const L = S.loc, n = x => Array.isArray(x) ? x.length : 0;
  let max = 1, score = ok ? 1 : 0;
  if (v.type === 'scenario') { max = 2; score = end === 'good' ? 2 : end === 'ok' ? 1 : 0; }
  else if (v.type === 'multi' || v.type === 'sort') { max = n(v.items); score = max - n(T.wrong); }
  else if (v.type === 'match') { max = n(v.pairs); score = max - n(T.wrong); }
  else if (v.type === 'order') { max = n(v.blocks); score = (T.order || []).filter((b, i) => b === i).length; }
  if (ok && v.type !== 'scenario') score = max;
  const base = { score, max, secs: tSecs(), loc: locCopy() };
  if (L.v === 'screen') { const { m, u, s } = cur(); return courseResult(Object.assign(base, { kind: 'activity', id: skey(), title: v.title || (s && s.title) || 'Activity', module: m ? m.id : '', unit: u ? u.id : '', level: curLv() })); }
  if (L.v === 'zc') { const c = Z && Z.days[L.d] && Z.days[L.d].challenges[L.c]; return courseResult(Object.assign(base, { kind: 'zombie', id: c ? c.id : skey(), title: (Z && Z.title ? Z.title + ': ' : '') + (c ? c.title : v.title || '') })); }
  if (L.v === 'lq') return courseResult(Object.assign(base, { kind: 'quiz', id: skey(), title: 'Practice quiz: ' + (v.title || '') }));
  if (L.v === 'xq') return courseResult(Object.assign(base, { kind: 'game', id: 'xq-' + L.sub, title: v.title || 'Jargon Match', loc: { v: 'xc', sub: L.sub } }));
  return null;
}
function writeResult(v) {
  const L = S.loc, crit = (T.result && T.result.crit) || [];
  const max = (v.rubric || []).reduce((a, r) => a + (+r.marks || 0), 0), score = crit.filter(c => c.ok).reduce((a, c) => a + (+(c.r && c.r.marks) || 0), 0);
  const base = { score: max ? score : null, max: max || null, secs: tSecs(), est: true, loc: locCopy() };
  if (L.v === 'screen') { const { m, u } = cur(); return courseResult(Object.assign(base, { kind: 'write', id: skey(), title: v.title || 'Writing task', module: m ? m.id : '', unit: u ? u.id : '', level: curLv() })); }
  if (L.v === 'paper2') { const m = mod(L.m); return courseResult(Object.assign(base, { kind: 'paper2', id: L.m + '-p2', title: (m ? m.code + ' · ' : '') + (v.title || 'Paper 02 task'), module: L.m || '', level: curLv() })); }
  if (L.v === 'pq') { const P = paper(L.p); return courseResult(Object.assign(base, { kind: 'paper2', id: skey(), title: (P ? P.title + ' · ' : '') + 'Q' + ((+L.q || 0) + 1) + (v.title ? ': ' + v.title : ''), level: curLv() })); }
  if (L.v === 'zc') { const c = Z && Z.days[L.d] && Z.days[L.d].challenges[L.c]; return courseResult(Object.assign(base, { kind: 'zombie', id: c ? c.id : skey(), title: (Z && Z.title ? Z.title + ': ' : '') + (v.title || '') })); }
  return null;
}
const RES_KINDS = ['activity', 'write', 'test', 'paper', 'paper2', 'quiz', 'escape', 'zombie', 'game', 'lab'];
/* game and simulator results: accepted only from this page or a frame inside it (not from the host page or other windows) */
window.addEventListener('message', ev => {
  const d = ev && ev.data; if (!d || typeof d !== 'object' || d.type !== 'dm:result') return;
  let ok = ev.source === window; try { if (!ok) ok = Array.prototype.some.call(document.querySelectorAll('iframe'), f => f.contentWindow === ev.source); } catch (e) { ok = false; }
  if (!ok) return;
  const str = (x, n) => String(x == null ? '' : x).slice(0, n);
  const r = courseResult({ kind: RES_KINDS.includes(d.kind) ? d.kind : 'game', id: str(d.id || 'game', 80), title: str(d.title || d.id || 'Game', 160), module: str(d.module, 16), score: d.score, max: d.max, pct: d.pct, level: d.level == null || d.level === '' ? null : str(d.level, 24), secs: d.secs, loc: locCopy(), src: 'game' });
  if (r.saved) toast('✓ Saved to your assessment history');
});
window.addEventListener('dm:result', e => {
  const d = e && e.detail; if (!d || d.kind !== 'lab') return;
  const r = courseResult({ kind: 'lab', id: String(d.id || ''), title: d.title, module: d.module || '', score: d.score, max: d.max, pct: d.pct, loc: locCopy() });
  if (r.saved) toast('✓ Saved to your assessment history');
});
(function () { try { if (document.getElementById('savedcss')) return; const st = document.createElement('style'); st.id = 'savedcss'; st.textContent = '.saved-note{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center;justify-content:space-between;margin:10px 0;padding:8px 12px;border-radius:12px;background:var(--soft-ok);border:1px solid var(--line);font-weight:700;font-size:.92rem}.saved-note .btn{white-space:nowrap}'; document.head.appendChild(st); } catch (e) { } })();
window.addEventListener('pagehide', () => SCORM.finish());
window.addEventListener('beforeunload', () => SCORM.finish());

/* ---------------- AI feedback (web version only) ---------------- */
let SAMPLE = null;
if (window.claude && typeof window.claude.use === 'function') {
  window.claude.use('sample').then(s => { SAMPLE = s; if (s && T.kind === 'write') renderStage(); }).catch(() => { SAMPLE = null; });
}

/* ---------------- course lookups ---------------- */
const mod = id => MODS.find(m => m.id === id);
const unitDone = u => S.teacher || OPEN_ALL || (S.prog[u.id] || 0) >= u.screens.length;
/* ---- weekly release schedule (Student's Version) ----
   Topic 1 of every module opens Friday 23 October 2026 at 6:00 pm (Sint Maarten, UTC-4).
   Each later topic in that module opens 7 days after the one before it.
   Activities inside a topic still open one at a time as students complete them. */
const REL_START = Date.UTC(2026, 9, 23, 22, 0, 0), REL_WEEK = 7 * 864e5;
let CLOCK_OFF = 0;
const nowMs = () => Date.now() + CLOCK_OFF;
const schedAt = ui => REL_START + ui * REL_WEEK;
/* Release control: teacher changes saved online (release/overrides), applied to every signed-in student */
let OVR = {}, ADMIN = false, RELDB = null, REL_BUSY = false;
const unitReleaseAt = (m, ui) => { const o = OVR[m.units[ui].id]; if (o && typeof o === 'object') { if (o.mode === 'open') return 0; if (o.mode === 'hold') return Infinity; if (o.mode === 'date' && isFinite(+o.at)) return +o.at; } return schedAt(ui); };
const unitReleased = (m, ui) => S.teacher || OPEN_ALL || nowMs() >= unitReleaseAt(m, ui);
const unitOpen = (m, ui) => S.teacher || OPEN_ALL || (unitReleased(m, ui) && (ui === 0 || unitDone(m.units[ui - 1])));
const relDate = t => { try { return new Date(t).toLocaleString('en-GB', { timeZone: 'America/Lower_Princes', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true }).replace(' at', ','); } catch (e) { return new Date(t).toDateString(); } };
const cdText = t => { let d = Math.max(0, t - nowMs()); const dd = Math.floor(d / 864e5); d -= dd * 864e5; const hh = Math.floor(d / 36e5); d -= hh * 36e5; const mm = Math.ceil(d / 6e4); return dd ? `${dd}d ${hh}h` : hh ? `${hh}h ${mm}m` : `${Math.max(1, mm)}m`; };
const cdSpan = t => isFinite(t) ? `<span class="cdown" data-at="${t}">${cdText(t)}</span>` : 'TBA';
const opensText = t => isFinite(t) ? `Opens ${relDate(t)}` : 'Opening date to be announced';
const lockWhy = (m, ui) => { const t = unitReleaseAt(m, ui); return !unitReleased(m, ui) ? (isFinite(t) ? `⏳ Opens ${esc(relDate(t))} · in ${cdSpan(t)}` : `⏳ Your teacher will announce when this unit opens.`) : `🔒 Finish Unit ${ui} to open this unit.`; };
const screenOpen = (u, si) => S.teacher || OPEN_ALL || si <= (S.prog[u.id] || 0);
const screenDone = (u, si) => S.teacher || OPEN_ALL || si < (S.prog[u.id] || 0);
const unitsDone = m => m.units.every(unitDone);
const testPassed = m => (S.tests[m.id] || 0) >= (m.test.pass || 70);
const modComplete = m => unitsDone(m) && testPassed(m) && !!S.p2[m.id];
const courseComplete = () => MODS.length > 0 && MODS.every(modComplete);
function totals() {
  let all = 0, done = 0;
  MODS.forEach(m => { m.units.forEach(u => { all += u.screens.length; done += Math.min(S.prog[u.id] || 0, u.screens.length); }); all += 2; done += (testPassed(m) ? 1 : 0) + (S.p2[m.id] ? 1 : 0); });
  return { all, done, pct: all ? Math.round(done / all * 100) : 0 };
}
function cur() { const L = S.loc; const m = mod(L.m); if (!m) return {}; const u = L.u != null ? m.units[L.u] : null; const s = u && L.s != null ? u.screens[L.s] : null; return { m, u, s }; }
const PAPERS = (window.COURSE_PAPERS || []).slice();
const IMAGES = window.COURSE_IMAGES || {};
const paper = id => PAPERS.find(p => p.id === id);
function pq() { const L = S.loc, P = paper(L.p); if (!P) return null; const q = P.questions[L.q]; return q ? Object.assign({ stimulus: P.stimulus }, q) : null; }
function skey() { const L = S.loc; if (L.v === 'zc') { const c = Z && Z.days[L.d] && Z.days[L.d].challenges[L.c]; return 'z-' + (c ? c.id : 'x'); } if (L.v === 'lq') return 'lq-' + L.k + L.i; if (L.v === 'xq') return 'xq-' + L.sub + '-' + L.seed; if (L.v === 'pq') return 'pp-' + L.p + '-' + L.q; if (L.v === 'paper2') return L.m + '-p2'; const { u } = cur(); return u ? u.id + '-' + L.s : 'x'; }
/* ---- three-level dial: 1 Foundation (s.easy) · 2 Core (base) · 3 Challenge (s.up) ----
   Ported from the CSEC Information Technology player. Precedence: this screen's own dial (S.lv[key]; an old
   "Dial it down" choice saved as S.easy[key] still counts as Foundation) → the module's level (S.secLv, set on the
   module page) → the course level (S.level). Screens without an `easy` / `up` (or learn screens without `plain` /
   `deeper`) stay at Core and the missing level's button is disabled; the UI lights up as soon as the data exists. */
const LVN = { 1: 'Foundation', 2: 'Core', 3: 'Challenge' }, LVI = { 1: '🪜', 2: '⚙️', 3: '🚀' };
const secLvOf = id => (id && S.secLv && S.secLv[id]) || S.level || 2;
function rawSrc() { const L = S.loc; if (L.v === 'paper2') return mod(L.m) && mod(L.m).paper2; if (L.v === 'pq') return pq(); if (L.v === 'screen') return cur().s; return null; }
function baseLevel() { const L = S.loc; if (L.v === 'pq') return 2; return (L.m && S.secLv && S.secLv[L.m]) || S.level || 2; }
function lvWanted() { const k = skey(); if (S.lv && S.lv[k]) return S.lv[k]; if (S.easy && S.easy[k]) return 1; return baseLevel(); }
function hasLv(s, l) { if (!s) return l === 2; if (s.type === 'learn') return l === 2 || (l === 1 && !!s.plain) || (l === 3 && !!s.deeper); return l === 2 || (l === 1 && !!s.easy) || (l === 3 && !!s.up); }
function effLv(s) { const l = lvWanted(); return hasLv(s, l) ? l : 2; }
function curLv() { return effLv(rawSrc()); }
function isEasy() { return curLv() === 1; }
/* The "(N marks)" label must describe the version being shown: an overlay that brings its own rubric but keeps the
   base genre / title / marks would otherwise show the full task's mark (e.g. "(15 marks)" over a 6-mark Foundation task). */
function lvMarks(v, ov) {
  if (!v || !ov || !Array.isArray(ov.rubric)) return v;
  const t = ov.rubric.reduce((a, r) => a + (+r.marks || 0), 0); if (!(t > 0)) return v;
  const fix = x => String(x).replace(/\((\d+)(\s*)marks?\b/i, (m0, n, sp) => '(' + t + sp + (t === 1 ? 'mark' : 'marks'));
  if (ov.genre == null && v.genre) v.genre = fix(v.genre);
  if (ov.title == null && v.title) v.title = fix(v.title);
  if (ov.marks == null && v.marks != null) v.marks = t;
  return v;
}
function applyLv(s) {
  if (!s) return s; const l = effLv(s); if (l === 2 || s.type === 'learn') return s;
  const ov = l === 1 ? s.easy : s.up; if (!ov) return s;
  const base = Object.assign({}, s); delete base.easy; delete base.up; delete base.tutor; delete base.title;
  const v = Object.assign(base, ov); if (!v.title) v.title = s.title; return lvMarks(v, ov);
}
function setLv(l) { const k = skey(); S.lv = S.lv || {}; S.lv[k] = l; if (S.easy) delete S.easy[k]; save(); resetT(); renderStage(); toast(`${LVI[l]} ${LVN[l]} level`); }
function lvDialHTML(s) {
  if (!s || s.type === 'checkin') return '';
  const cl = effLv(s);
  return `<span class="lvdial" role="group" aria-label="Level for this screen">${[1, 2, 3].map(l => `<button type="button" class="lvb ${cl === l ? 'on' : ''}" data-act="setlv" data-l="${l}" ${hasLv(s, l) ? '' : 'disabled'} aria-pressed="${cl === l}" title="${LVN[l]} level${l === 1 ? ': smaller, easier steps' : l === 3 ? ': harder, Grade One depth' : ': CAPE exam standard'}${hasLv(s, l) ? '' : ' (not written for this screen yet)'}">${LVI[l]}<span class="hide-sm"> ${LVN[l]}</span></button>`).join('')}</span>`;
}
function lvSecHTML(m) { const c = secLvOf(m.id); return `<div class="lvsec"><b>🎚️ Level for ${esc(m.code)}:</b> ${[1, 2, 3].map(l => `<button type="button" class="chip ${c === l ? 'sel' : ''}" data-act="seclv" data-m="${m.id}" data-l="${l}" aria-pressed="${c === l}">${LVI[l]} ${LVN[l]}</button>`).join('')}</div>`; }
function bloomChip(v) { return v && v.bloom ? `<span class="ribbon bloom" title="Thinking skill (Bloom's taxonomy)">🧠 ${esc(v.bloom)}</span>` : ''; }
/* level styles and the header level pill (the CSEC IT page has them in index.html; here the engine adds them) */
const LVCSS = `.lvdial{display:inline-flex;border:2px solid var(--line);border-radius:99px;overflow:hidden;box-shadow:0 3px 0 rgba(0,0,0,.28);flex:none}
.lvdial .lvb{background:transparent;border:0;padding:5px 10px;font-size:.84rem;font-weight:700;color:inherit;border-right:1px solid var(--line)}
.lvdial .lvb:last-child{border-right:0}.lvdial .lvb.on{background:var(--gold);color:var(--on-gold)}.lvdial .lvb:disabled{opacity:.35;cursor:not-allowed}
.lvdial.big .lvb{padding:9px 16px;font-size:.95rem}
.lvbox{border-radius:14px;padding:12px 16px;margin:12px 0;border:1.5px solid var(--line);background:var(--raise)}
.lvbox .lbl{display:block;font-weight:800;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px;color:var(--gold)}
.lv1box{border-color:rgba(79,209,139,.55);background:var(--soft-ok)}.lv3box{border-color:rgba(245,197,66,.6);background:var(--soft-gold)}
.up-banner{background:var(--soft-blue)!important;border:1px solid var(--line)}
.ribbon.bloom{background:var(--soft-blue)}
.lvsec{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px}
.lvcard h3{margin-bottom:4px}
@media (max-width:520px){.lvdial.big .lvb{padding:8px 10px;font-size:.85rem}}`;
(function lvSetup() {
  try {
    if (!document.getElementById('lvcss')) { const st = document.createElement('style'); st.id = 'lvcss'; st.textContent = LVCSS; document.head.appendChild(st); }
    if (!document.getElementById('hlv')) {
      const a = document.querySelector('header [data-go="assess"]');
      if (a && a.parentNode) { const b = document.createElement('button'); b.type = 'button'; b.className = 'hbtn'; b.dataset.act = 'cyclelv'; b.title = 'Course level: tap to switch between Foundation, Core and Challenge'; b.setAttribute('aria-label', 'Course level'); b.innerHTML = '<span id="hlv">⚙️ Core</span>'; a.parentNode.insertBefore(b, a); }
    }
  } catch (e) { }
})();
function variant() {
  const L = S.loc;
  if (L.v === 'paper2') return applyLv(mod(L.m).paper2);
  if (L.v === 'pq') return applyLv(pq());
  if (L.v === 'zc') return zVariant();
  if (L.v === 'lq') return labVariant();
  if (L.v === 'xq') return xcVariant();
  return applyLv(cur().s);
}
function resetT() {
  T = { t0: Date.now(), saved: null, kind: null, answer: null, submitted: false, correct: false, msg: '', warn: '', picks: {}, order: [], checks: {}, note: '', wrong: [], mood: null, match: { sel: null, pairs: {} }, scene: { node: 'start', hist: [] }, ai: null, aiState: 'idle', showModel: false, ans: {} };
  const L = S.loc;
  if (!['screen', 'paper2', 'pq', 'zc', 'lq', 'xq'].includes(L.v)) return;
  const v = variant(); if (!v) return;
  T.kind = v.type;
  if (v.type === 'order') T.pool = shuffle(v.blocks.map((_, i) => i));
  if (v.type === 'match') T.rorder = shuffle(v.pairs.map((_, i) => i));
  if (v.type === 'write') { const d = DRAFTS[skey()]; T.text = d ? d.text || '' : ''; T.checks = d ? d.checks || {} : {}; if (d && d.submitted) { T.submitted = true; T.correct = true; T.result = analyse(T.text, v); T.ai = d.ai || null; if (T.ai) T.aiState = 'done'; } }
}

/* ---------------- navigation ---------------- */
const NAVPOS = {}; let NAVKEY = null, NAVBACK = null;
const VIEWS0 = ['home', 'module', 'unit', 'screen', 'test', 'paper2', 'assess', 'paper', 'pq', 'glossary', 'toolkit', 'profile', 'shop', 'games', 'lab', 'xc', 'carib', 'creds', 'release', 'zombie', 'zday', 'zc', 'escape', 'lq', 'xq', 'resources', 'report'];
function locKey(l) { l = l || {}; return [l.v, l.m || '', l.u != null ? l.u : '', l.s != null ? l.s : '', l.tab || '', l.k || '', l.sub || ''].join('|'); }
function locHash(l) { const p = new URLSearchParams(); Object.keys(l || {}).forEach(k => { const v = l[k]; if (k !== 'sec' && v != null && /^(string|number|boolean)$/.test(typeof v)) p.set(k, String(v)); }); return '#' + p.toString(); }
function hashLoc(h) {
  h = String(h || '').replace(/^#/, ''); if (!/(^|&)v=/.test(h)) return null;
  const p = new URLSearchParams(h), l = {}; p.forEach((v, k) => { l[k] = (k === 'u' || k === 's') && /^\d+$/.test(v) ? +v : v; });
  if (!l.v || (!VIEWS0.includes(l.v) && !PLUGS[l.v])) return null;
  if (['module', 'unit', 'screen', 'test', 'paper2'].includes(l.v) && !mod(l.m)) return null;
  if ((l.v === 'unit' || l.v === 'screen') && !mod(l.m).units[l.u]) return null;
  if (l.v === 'screen' && !mod(l.m).units[l.u].screens[l.s]) return null;
  return l;
}
function navAfter(loc, fromHash) {
  const k = locKey(loc); NAVKEY = k;
  if (!fromHash) { try { const h = locHash(loc); if (location.hash !== h) { const hs = history.state; try { if (hs && hs.gx && !document.getElementById('gx-full')) history.replaceState(null, '', h); else history.pushState(null, '', h); } catch (e1) { location.hash = h; } } } catch (e) { } }
  const back = NAVBACK; NAVBACK = null;
  if (BACKY != null) { const y = BACKY; BACKY = null; const to = () => { try { window.scrollTo(0, y); } catch (e) { } }; to(); setTimeout(to, 0); setTimeout(to, 150); setTimeout(to, 450); return; }
  const target = (loc.sec && document.getElementById(loc.sec)) || (back && document.querySelector(back));
  if (target) { setTimeout(() => { try { target.scrollIntoView({ block: 'start' }); if (target.tagName === 'DETAILS') target.open = true; target.classList.add('flash'); setTimeout(() => target.classList.remove('flash'), 1400); } catch (e) { } }, 30); return; }
  if (NAVPOS[k] != null && loc.v !== 'screen') { const y = NAVPOS[k]; setTimeout(() => window.scrollTo(0, y), 0); return; }
  try { window.scrollTo({ top: 0 }); } catch (e) { }
}
window.addEventListener('popstate', () => { if (document.getElementById('gx-full')) { try { closeGameFull(true); } catch (e) { } } const l = hashLoc(location.hash) || { v: 'home' }; if (locKey(l) === locKey(S.loc)) return; const t = BACKSTACK[BACKSTACK.length - 1]; if (t && locKey(t.loc) === locKey(l)) { BACKSTACK.pop(); go(l, { fromHash: true, back: true, y: t.y }); } else go(l, { fromHash: true }); });
/* Back buttons at the top and bottom of every view; Back returns to the exact scroll position of the previous view */
let BACKSTACK = [], BACKY = null;
function backBarHTML(pos) { const prev = BACKSTACK[BACKSTACK.length - 1]; return `<div class="backbar backbar-${pos}"><button type="button" class="btn ghost sm" data-back="1" aria-label="${prev ? 'Go back to the previous screen' : 'Go to the home page'}">← ${prev ? 'Back' : 'Home'}</button></div>`; }
function goBack() { const b = BACKSTACK.pop(); if (!b) { go({ v: 'home' }); return; } go(b.loc, { back: true, y: b.y }); }
document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-back]'); if (!b) return; e.preventDefault(); e.stopPropagation(); goBack(); }, true);
(function () { try { const st = document.createElement('style'); st.textContent = '.backbar{display:flex;align-items:center;margin:0 0 10px}.backbar-bottom{margin:16px 0 4px}.backbar .btn{min-height:40px}@media print{.backbar{display:none}}'; document.head.appendChild(st); } catch (e) { } })();
function go(loc, opt) {
  if (NAVKEY) NAVPOS[NAVKEY] = window.scrollY;
  try { const P0 = S.loc; if (!(opt && (opt.back || opt.fromHash)) && P0 && loc && locKey(P0) !== locKey(loc)) { BACKSTACK.push({ loc: JSON.parse(JSON.stringify(P0)), y: window.scrollY }); if (BACKSTACK.length > 80) BACKSTACK.shift(); } if (opt && opt.back) BACKY = opt.y || 0; } catch (e) { }
  try { const P0 = S.loc || {}; if (loc && loc.v === 'module' && P0.m === loc.m && P0.u != null && typeof UACC !== 'undefined') { (UACC[loc.m] = UACC[loc.m] || {})[P0.u] = true; NAVBACK = `details[data-uacc="${loc.m}:${P0.u}"]`; } } catch (e) { }
  if (typeof CMOD !== 'undefined' && CMOD) closeCountry();
  stopSpeak(); if (timerInt) { clearInterval(timerInt); timerInt = null; }
  S.loc = loc;
  if (loc.v === 'screen') S.last = loc;
  resetT(); save(); render();
  try { navAfter(loc, opt && opt.fromHash); } catch (e) { }
  if (loc.v === 'xc' && loc.sub) setTimeout(() => { const el = document.getElementById('xcsub'); if (el) { el.scrollIntoView({ behavior: window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); el.classList.add('flash'); try { el.focus({ preventScroll: true }); } catch (e) { } setTimeout(() => el.classList.remove('flash'), 1400); } }, 40);
  closeSide();
}
function nextLoc() {
  const L = S.loc, m = mod(L.m), u = m.units[L.u];
  if (L.s < u.screens.length - 1) return { v: 'screen', m: m.id, u: L.u, s: L.s + 1 };
  if (L.u < m.units.length - 1) return { v: 'unit', m: m.id, u: L.u + 1 };
  return { v: 'module', m: m.id };
}
function resumeLoc() {
  if (S.last && mod(S.last.m)) return S.last;
  for (const m of MODS) for (let ui = 0; ui < m.units.length; ui++) { const u = m.units[ui]; if (!unitDone(u)) return { v: 'screen', m: m.id, u: ui, s: Math.min(S.prog[u.id] || 0, u.screens.length - 1) }; }
  return { v: 'report' };
}

/* ---------------- top + sidebar ---------------- */
/* student mode: no coins, everything unlocked */
const studentMode = () => !S.teacher;
function globalLvHTML() { const g = S.level || 2; return `<span class="lvdial big" role="group" aria-label="Course level">${[1, 2, 3].map(l => `<button type="button" class="lvb ${g === l ? 'on' : ''}" data-act="glv" data-l="${l}" aria-pressed="${g === l}">${LVI[l]} ${LVN[l]}</button>`).join('')}</span>`; }
function lvCardHTML() { return `<div class="card lvcard"><div class="row" style="justify-content:space-between;gap:12px"><div><h3>🎚️ Your course level</h3><p class="hint">Sets every module at once. Each module page and each screen also has its own dial.</p></div>${globalLvHTML()}</div></div>`; }
function renderTop() {
  const t = totals();
  $('#hbar').style.width = t.pct + '%'; $('#hpct').textContent = t.pct + '%'; $('#hxp').textContent = S.xp;
  const lv = levelOf(S.xp); $('#hlevel').textContent = 'Lv ' + lv.n + ' · ' + lv.title + ' · ' + lv.pct + '%'; $('#hlevel').title = lv.pct + '% of the way to Level ' + (lv.n + 1) + ' (' + lv.next + ' XP to go)'; $('#hlvl').style.width = lv.pct + '%';
  { const gp = $('#hlv'); if (gp) { const g = S.level || 2; gp.innerHTML = LVI[g] + '<span class="hide-sm"> ' + LVN[g] + '</span>'; const pb = gp.closest('button'); if (pb) { pb.setAttribute('aria-label', 'Course level: ' + LVN[g] + '. Tap to change'); } } }
  const cn = $('#hcoinn'); if (cn) cn.parentElement.hidden = studentMode(); $('#havatar').innerHTML = avatarHTML((S.profile || {}).avatar).replace(/^<span class="avatar [^"]*"[^>]*>|<\/span>$/g, '');
  $('#havatar').style.background = (AVATARS.find(a => a.id === (S.profile || {}).avatar) || AVATARS[0]).bg;
}
function ico(state) { return state === 'done' ? '<span class="ico done" aria-label="done">✓</span>' : state === 'lock' ? '<span class="ico lock" aria-label="locked">🔒</span>' : '<span class="ico open" aria-hidden="true"></span>'; }
const SIDEOPEN = {};
document.addEventListener('click', ev => { const gm = ev.target.closest && ev.target.closest('[data-go][data-m]'); if (gm && gm.dataset.m) SIDEOPEN[gm.dataset.m] = true; const b = ev.target.closest && ev.target.closest('[data-side-tog]'); if (!b) return; ev.stopPropagation(); const mid = b.dataset.sideTog, g = b.closest('.sgroup'); SIDEOPEN[mid] = !(g && g.classList.contains('sopen')); renderSide(); }, true);
function renderSide() {
  const L = S.loc;
  let h = `<button type="button" class="slink ${L.v === 'home' ? 'on' : ''}" data-go="home"><span class="t">Course home</span></button>`;
  h += `<div class="slabel">Modules</div>`;
  MODS.forEach(m => {
    const active = L.m === m.id;
    const dn = m.units.filter(unitDone).length;
    const shown = SIDEOPEN[m.id] != null ? SIDEOPEN[m.id] : active;
    h += `<div class="sgroup ${shown ? 'sopen' : ''}"><div class="smodrow"><button type="button" class="slink smod ${active && L.v === 'module' ? 'on' : ''}" data-go="module" data-m="${m.id}"><span class="t"><span class="code">${esc(m.code)}</span><span class="modname">${esc(m.title)}</span></span><span class="n">${dn}/${m.units.length}</span></button><button type="button" class="stog" data-side-tog="${m.id}" aria-expanded="${shown}" aria-label="${shown ? 'Collapse' : 'Expand'} ${esc(m.code)} units">▾</button></div>`;
    if (shown) {
      m.units.forEach((u, ui) => {
        const open = unitOpen(m, ui), d = Math.min(S.prog[u.id] || 0, u.screens.length);
        h += `<button type="button" class="slink sunit ${open ? '' : 'locked'} ${L.v === 'unit' && L.u === ui ? 'on' : ''}" data-go="unit" data-m="${m.id}" data-u="${ui}">${ico(unitDone(u) ? 'done' : open ? 'open' : 'lock')}<span class="t">${ui + 1}. ${esc(u.title)}</span><span class="n">${S.teacher ? u.screens.length + '/' + u.screens.length : !unitReleased(m, ui) ? '⏳ ' + cdSpan(unitReleaseAt(m, ui)) : d + '/' + u.screens.length}</span></button>`;
        if (L.v === 'screen' && L.u === ui) {
          u.screens.forEach((s, si) => {
            const st = screenDone(u, si) ? 'done' : screenOpen(u, si) ? 'open' : 'lock';
            h += `<button type="button" class="slink sscreen ${st === 'lock' ? 'locked' : ''} ${L.s === si ? 'on' : ''}" data-go="screen" data-m="${m.id}" data-u="${ui}" data-s="${si}">${ico(st)}<span class="t">${esc(s.title || 'Check-in')}</span></button>`;
          });
        }
      });
      const to = S.teacher || OPEN_ALL || unitsDone(m);
      h += `<button type="button" class="slink sunit ${to ? '' : 'locked'} ${L.v === 'test' ? 'on' : ''}" data-go="test" data-m="${m.id}">${ico(testPassed(m) ? 'done' : to ? 'open' : 'lock')}<span class="t">${esc(m.test.title || 'Module test')}</span>${S.tests[m.id] != null ? `<span class="n">${S.tests[m.id]}%</span>` : ''}</button>`;
      h += `<button type="button" class="slink sunit ${to ? '' : 'locked'} ${L.v === 'paper2' ? 'on' : ''}" data-go="paper2" data-m="${m.id}">${ico(S.p2[m.id] ? 'done' : to ? 'open' : 'lock')}<span class="t">Exam essay practice</span></button>`;
    }
    h += `</div>`;
  });
  h += `<div class="slabel">Play and practise</div>
    ${soleArcade() ? '' : `<button type="button" class="slink ${L.v === 'games' ? 'on' : ''}" data-go="games"><span class="t">🎮 Games hub</span></button>`}
    <button type="button" class="slink ${['zombie', 'zday', 'zc'].includes(L.v) ? 'on' : ''}" data-go="zombie"><span class="t">🧟 <span class="apoc-title"><span style="display:block">Rebuilding</span><span style="display:block">After the Apocalypse</span></span></span></button>
    <button type="button" class="slink ${L.v === 'escape' ? 'on' : ''}" data-go="escape"><span class="t">🗝️ Escape rooms</span></button>
    <button type="button" class="slink ${L.v === 'lab' || L.v === 'lq' ? 'on' : ''}" data-go="lab"><span class="t">🧪 Language Lab</span></button>
    <button type="button" class="slink ${L.v === 'xc' || L.v === 'xq' ? 'on' : ''}" data-go="xc"><span class="t">🔭 Your subjects</span></button>

    <button type="button" class="slink ${L.v === 'shop' ? 'on' : ''}" data-go="shop"><span class="t">🛍️ Rewards shop</span></button>
    <button type="button" class="slink ${L.v === 'profile' ? 'on' : ''}" data-go="profile"><span class="t">🪪 My player card</span></button>
    ${pluginsByGroup().map(([g, L2]) => `<div class="slabel">${esc(g)}</div>` + L2.map(p => `<button type="button" class="slink ${L.v === p.view ? 'on' : ''}" data-go="${p.view}"><span class="t">${p.tile.icon} ${esc(p.title)}</span></button>`).join('')).join('')}
    <div class="slabel">Assessments · always open</div>
    <button type="button" class="slink ${L.v === 'assess' || L.v === 'paper' || L.v === 'pq' ? 'on' : ''}" data-go="assess"><span class="t">Past-paper practice and marking keys</span></button>
    <div class="slabel">Tools</div>
    <button type="button" class="slink ${L.v === 'toolkit' ? 'on' : ''}" data-go="toolkit"><span class="t">Exam toolkit</span></button>
    <button type="button" class="slink ${L.v === 'glossary' ? 'on' : ''}" data-go="glossary"><span class="t">Glossary</span></button>
    <button type="button" class="slink ${L.v === 'resources' ? 'on' : ''}" data-go="resources"><span class="t">Video library</span></button>
    <button type="button" class="slink ${L.v === 'report' ? 'on' : ''}" data-go="report"><span class="t">My progress</span></button>
    <button type="button" class="slink ${L.v === 'creds' ? 'on' : ''}" data-go="creds"><span class="t">🎓 Credentials & Certificate</span></button>${ADMIN ? `<div class="slabel">Course owner</div><button type="button" class="slink ${L.v === 'release' ? 'on' : ''}" data-go="release"><span class="t">🗓️ Release control</span></button>` : ''}`;
  $('#side').innerHTML = h;
}
function openSide() { $('#side').classList.add('open'); $('#scrim').hidden = false; $('#menuBtn').setAttribute('aria-expanded', 'true'); }
function closeSide() { $('#side').classList.remove('open'); $('#scrim').hidden = true; $('#menuBtn').setAttribute('aria-expanded', 'false'); }

/* ---------------- views ---------------- */
/* One games area: if the hub would only show the arcade tile, the arcade is the games area. */
function soleArcade() { try { const L = gameTiles(); return L.length === 1 && L[0].go && (window.COURSE_PLUGINS || []).some(p => p.view === L[0].go) ? L[0].go : ''; } catch (e) { return ''; } }
function render() { try { if (stampDates()) save(); } catch (e) { } try { const a = S.loc && S.loc.v === 'games' && soleArcade(); if (a) S.loc = { v: a }; } catch (e) { } renderTop(); renderSide(); renderStage(); }
function renderStage() {
  setTimeout(tickTimer, 0);
  const v = S.loc.v;
  try { if (['zombie', 'zday', 'zc'].includes(v)) document.documentElement.dataset.zone = 'apoc'; else delete document.documentElement.dataset.zone; } catch (e) { }
  let h = '';
  if (!MODS.length) h = `<div class="card"><h2>No course content found</h2><p>The module files did not load.</p></div>`;
  else if (v === 'home') h = homeHTML();
  else if (v === 'module') h = moduleHTML();
  else if (v === 'unit') h = unitHTML();
  else if (v === 'screen') h = screenHTML();
  else if (v === 'test') h = testHTML();
  else if (v === 'paper2') h = paper2HTML();
  else if (v === 'assess') h = assessHTML();
  else if (v === 'paper') h = paperHTML();
  else if (v === 'pq') h = pqHTML();
  else if (v === 'glossary') h = glossaryHTML();
  else if (v === 'toolkit') h = toolkitHTML();
  else if (v === 'profile') h = profileHTML();
  else if (v === 'shop') h = shopHTML();
  else if (v === 'games') h = gamesHTML();
  else if (v === 'lab') h = labHTML();
  else if (v === 'xc') h = xcHTML();
  else if (v === 'carib') h = caribHTML();
  else if (v === 'creds') h = credsHTML();
  else if (v === 'release') h = releaseHTML();
  else if (PLUGS[v]) { try { h = PLUGS[v].render(API, S.loc); } catch (e) { h = `<div class="card"><h2>${esc(PLUGS[v].title)}</h2><p>This tool hit an error: ${esc(e.message)}</p></div>`; } }
  else if (v === 'zombie') h = zombieHTML();
  else if (v === 'zday') h = zdayHTML();
  else if (v === 'zc') h = zcHTML();
  else if (v === 'escape') h = escapeHTML();
  else if (v === 'lq' || v === 'xq') h = practiceHTML();
  else if (v === 'resources') h = resourcesHTML();
  else if (v === 'report') h = reportHTML();
  if (v !== 'home') h = backBarHTML('top') + h + backBarHTML('bottom');
  h += footHTML();
  $('#stage').innerHTML = `<div class="stage-in">${h}</div>`;
  if (PLUGS[v] && PLUGS[v].mount) { try { PLUGS[v].mount(API, S.loc, $('#stage')); } catch (e) { } }
  /* the bottom Back button only shows when the page is long enough to be apart from the top one */
  try { const bb = document.querySelector('#stage .backbar-bottom'), bt = document.querySelector('#stage .backbar-top'); if (bb && bt) { const fix = () => { bb.style.display = ''; bb.style.display = (bb.getBoundingClientRect().top - bt.getBoundingClientRect().bottom) < window.innerHeight * 0.6 ? 'none' : ''; }; fix(); setTimeout(fix, 600); setTimeout(fix, 2000); } } catch (e) { }
  try { window.dispatchEvent(new CustomEvent('course:render', { detail: { v } })); } catch (e) { } /* tools/tracker.js: Quiz Centre results */
}
function footHTML() {
  return `<div class="foot">Kester Small<br>
  ${TEACHER_ED ? `<b>Teacher's Version</b> · everything is unlocked · ` : ''}<button type="button" data-act="reset">Reset my progress</button></div>`;
}
function vidsHTML(list) {
  if (!list || !list.length) return '';
  return `<div class="vids">${list.map(v => `<a class="vid" href="${yt(v.q)}" target="_blank" rel="noopener"><span class="play" aria-hidden="true"></span><span>${esc(v.title)}<small>Watch on YouTube</small></span></a>`).join('')}</div>`;
}
function emoteStrip() { try { const E = window.COURSE_EMOTES; if (!E) return ''; const ids = E.showcase() || []; return ids.length ? `<button type="button" class="emstrip" data-go="trophies" aria-label="Open the Trophy Room">${ids.map(id => `<span class="em">${E.svg(id)}</span>`).join('')}</button>` : `<button type="button" class="ribbon" data-go="trophies">🏆 Trophy Room</button>`; } catch (e) { return ''; } }
function homeHTML() {
  const t = totals(), started = t.done > 0;
  let h = `<section class="hero"><span class="eyebrow">CAPE Communication Studies</span><h1>${S.name ? 'Welcome back, ' + esc(S.name) + '.' : 'Your Journey to <span style="white-space:nowrap">Grade One</span> Starts Here.'}</h1><p class="lead" style="font-size:1.15rem;font-weight:700;margin:6px 0 10px">Read, research, speak and write like a CAPE Grade One candidate.</p>
    <p>Modules 1, 2 and 3 plus Paper 3, broken into short lessons with games, exam-style questions and writing tasks that get detailed teacher feedback.</p>
    <div class="row"><button type="button" class="btn gold" data-act="resume">${started ? 'Continue where you left off' : 'Start Module 1'}</button><button type="button" class="btn ghost" data-go="assess">Go to past-paper practice</button>${CARIB ? '<button type="button" class="btn ghost" data-go="carib">🌴 Caribbean welcome tour</button>' : ''}</div></section>`;
  h += lvCardHTML();
  const lv = levelOf(S.xp), P = S.profile || {};
  h += `<div class="card"><div class="row" style="justify-content:space-between;gap:16px"><div class="row" style="gap:14px">${avatarHTML(P.avatar, 'lg')}<div style="display:flex;flex-direction:column;gap:6px;min-width:0"><h2>${esc(S.name || 'Create your player card')}</h2><span class="hint">${esc([P.school === 'Other' ? P.schoolOther : P.school, P.year].filter(Boolean).join(' · ') || 'Add your name, avatar, school, year and major.')}</span><div class="row">${S.teacher ? coinHTML(S.coins || 0) : ''}<span class="ribbon">Level ${lv.n} · ${lv.title} · ${lv.pct}%</span>${S.dayStreak ? `<span class="ribbon">🔥 ${S.dayStreak}-day streak</span>` : ''}${emoteStrip()}</div><div class="pbar" style="width:min(300px,60vw)"><i style="width:${lv.pct}%"></i></div></div></div>
    ${dailyReady() ? `<div class="chest"><span class="lid" aria-hidden="true">🎁</span><button type="button" class="btn gold" data-gx="daily">Open today's chest</button></div>` : `<button type="button" class="btn ghost" data-go="profile">${S.profileDone ? 'Edit my card' : 'Create my card (+20 coins)'}</button>`}</div></div>`;
  h += `<div class="tiles">
    ${CARIB ? '<button type="button" class="tile" data-go="carib"><span class="ticon">🌴</span><h3>Caribbean welcome tour</h3><span class="meta">Flags, coats of arms, national birds, folklore, music, food, festivals and slang.</span></button>' : ''}
    <button type="button" class="tile" data-go="games"><span class="ticon">🎮</span><h3>Games hub</h3><span class="meta">Escape rooms, Spelling Bee, Mic Drop debates, Lyric Lab and more.</span></button>
    <button type="button" class="tile" data-go="zombie"><span class="ticon">🧟</span><h3 class="apoc-title"><span style="display:block">Rebuilding</span><span style="display:block">After the Apocalypse</span></h3><span class="meta">The unit as a game: five days of Council missions.</span></button>
    <button type="button" class="tile" data-go="escape"><span class="ticon">🗝️</span><h3>Escape rooms</h3><span class="meta">Crack Module 1, 2 and 3 puzzles to unlock the door.</span></button>
    <button type="button" class="tile" data-go="lab"><span class="ticon">🧪</span><h3>Language Lab</h3><span class="meta">Spelling rules and tests, grammar, mechanics, verbs.</span></button>
    <button type="button" class="tile" data-go="xc"><span class="ticon">🔭</span><h3>Your subjects</h3><span class="meta">Use Comm Studies in Biology, Accounting, Law and more. Jargon lists included.</span></button>

    <button type="button" class="tile" data-go="shop"><span class="ticon">🛍️</span><h3>Rewards shop</h3><span class="meta">Unlock games, themes and avatars with your coins.</span></button></div>`;
  if (false) h += `<div class="card"><label for="nm"><b>What should we call you?</b> Your name appears on your certificate.</label><div class="row"><input id="nm" class="search" style="flex:1 1 220px" maxlength="40" autocomplete="name" placeholder="First name"><button type="button" class="btn go" data-act="setname">Save name</button></div></div>`;
  h += pluginsByGroup().map(([g, L2]) => `<h2 class="hgrp">${esc(g)}</h2><div class="tiles">${L2.map(p => `<button type="button" class="tile" data-go="${p.view}"><span class="ticon">${p.tile.icon}</span><h3>${esc(p.title)}</h3><span class="meta">${esc(p.tile.meta || '')}</span></button>`).join('')}</div>`).join('');
  h += `<h2 class="hgrp">Your Modules</h2>`;
  h += `<div class="grid2">${MODS.map(m => {
    const d = m.units.filter(unitDone).length, scr = m.units.reduce((a, u) => a + u.screens.length, 0);
    return `<button type="button" class="mcardx" data-go="module" data-m="${m.id}"><span class="code">${esc(m.code)}</span><h3 class="modname">${esc(m.title)}</h3><span class="meta">${m.units.length} units · ${scr} screens · test + exam essay · ${LVI[secLvOf(m.id)]} ${LVN[secLvOf(m.id)]}</span><div class="pbar"><i style="width:${d / m.units.length * 100}%"></i></div><span class="meta">${modComplete(m) ? 'Complete ✓' : d + ' of ' + m.units.length + ' units done' + (S.tests[m.id] != null ? ' · test best ' + S.tests[m.id] + '%' : '')}</span></button>`;
  }).join('')}</div>`;
  h += `<button type="button" class="mcardx" data-go="assess" style="width:100%"><span class="code">Assessments · always open</span><h3>Past-paper practice with marking keys</h3><span class="meta">${PAPERS.filter(p => p.kind === 'p1').length} Paper 01 papers · ${PAPERS.filter(p => p.kind === 'p2').length} Paper 02 papers · ${PAPERS.filter(p => p.kind === 'p032').length} Paper 032 papers · module tests and exam essays. Skip straight here at any time.</span></button>`;
  h += `<div class="card"><h3>How this course works</h3><ul>
    <li><b>Read aloud.</b> Press 🔊 Listen on any screen, passage or glossary term to hear it. Change the speed with the 🔊 button at the top.</li>
    <li><b>Locked steps.</b> Each screen unlocks the next one when you get it right.</li>
    <li><b>Be honest.</b> After every activity you say whether you really got it. Say no and a mini tutorial opens.</li>
    <li><b>Three levels everywhere.</b> 🪜 Foundation gives smaller steps and plain words, ⚙️ Core is CAPE exam standard, 🚀 Challenge is Grade One depth. Set the level for the whole course, for each module or for any single screen; dial up or down at any time, there is never a penalty.</li>
    <li><b>Check-ins.</b> Each unit asks how you are doing and gives you a recap if you are struggling.</li>
    <li><b>Writing with feedback.</b> Every unit ends with a writing task in a different genre. You get teacher feedback on each criterion${SAMPLE ? ', plus a detailed AI marking option' : ''}.</li>
    <li><b>Exam practice.</b> Each module ends with a Paper 1-style test and a Paper 2-style essay.</li></ul></div>`;
  return h;
}
const UACC = {};
document.addEventListener('toggle', ev => { const d = ev.target; if (!d || !d.dataset || !d.dataset.uacc) return; const [mid, ui] = d.dataset.uacc.split(':'); (UACC[mid] = UACC[mid] || {})[ui] = d.open; }, true);
document.addEventListener('click', ev => { const b = ev.target.closest && ev.target.closest('[data-uacc-all]'); if (!b) return; const mid = b.dataset.uaccAll, on = b.dataset.on === '1'; document.querySelectorAll(`details[data-uacc^="${mid}:"]`).forEach(d => { d.open = on; }); });
function moduleHTML() {
  const m = mod(S.loc.m); if (!m) return '';
  const to = S.teacher || OPEN_ALL || unitsDone(m);
  let h = `<div class="card"><span class="kicker">${esc(m.code)}</span><h1 class="modname">${esc(m.title)}</h1>${AUD['mod-' + m.id] ? `<div class="row">${clipBtn('mod-' + m.id, 'Hear the overview', '')}</div>` : ''}<div class="html-body">${m.overview}</div>
    <details class="fold" open><summary>What you will learn</summary><div><ul>${m.objectives.map(o => `<li>${o}</li>`).join('')}</ul></div></details>
    <div class="row"><button type="button" class="btn ghost" data-go="glossary" data-gsec="${m.id === 'P3' ? 'P' : m.id.slice(1)}">${esc(m.code)} key terms (${GL.terms.filter(e => e.m.includes(m.id === 'P3' ? 'P' : m.id.slice(1)) || (m.id === 'P3' && e.m.includes('S'))).length})</button></div>${lvSecHTML(m)}</div>`;
  { const EX = window.COURSE_EXAMINER, tips = EX && EX.tips && EX.tips[m.id]; if (tips && tips.length) h += `<div class="card extips"><details class="fold"><summary>📝 Examiner tips for ${esc(m.code)}</summary><div><ul>${tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul><p class="hint">From CXC subject reports, 2016–2025 (paraphrased). <button type="button" class="linkbtn" data-go="examiner">Open Examiner's Corner →</button></p></div></details></div>`; }
  if (UACC[m.id] == null) { const f = m.units.findIndex((u, ui) => unitOpen(m, ui) && !unitDone(u)); UACC[m.id] = { [f < 0 ? 0 : f]: true }; }
  const UO = UACC[m.id];
  h += `<div class="card"><div class="row" style="justify-content:space-between;align-items:center"><h3 style="margin:0">Units</h3><div class="row" style="gap:6px"><button type="button" class="btn ghost sm" data-uacc-all="${m.id}" data-on="1">Expand all</button><button type="button" class="btn ghost sm" data-uacc-all="${m.id}" data-on="0">Collapse all</button></div></div><div class="uacc-list">${m.units.map((u, ui) => {
    const open = unitOpen(m, ui), d = Math.min(S.prog[u.id] || 0, u.screens.length), pct = Math.round(d / Math.max(1, u.screens.length) * 100);
    const stat = S.teacher ? 'unlocked' : !unitReleased(m, ui) ? '⏳ ' + cdSpan(unitReleaseAt(m, ui)) : d + '/' + u.screens.length;
    const body = `<div class="uacc-body">${!S.teacher && !unitReleased(m, ui) ? `<p class="hint">${esc(opensText(unitReleaseAt(m, ui)))}</p>` : ''}${(u.objectives || []).length ? `<h4>In this unit you will</h4><ul>${u.objectives.map(o => `<li>${o}</li>`).join('')}</ul>` : ''}
      <h4>Screens</h4><div class="list">${u.screens.map((s, si) => { const st = !open ? 'lock' : screenDone(u, si) ? 'done' : screenOpen(u, si) ? 'open' : 'lock'; return `<button type="button" class="lrow ${st === 'lock' ? 'locked' : ''}" data-go="screen" data-m="${m.id}" data-u="${ui}" data-s="${si}"${st === 'lock' ? ' disabled' : ''}>${ico(st)}<span class="t">${esc(s.title || 'Check-in')}</span><span class="s">${kicker(s)[0]}</span></button>`; }).join('')}</div>
      <div class="row" style="margin-top:10px">${open ? `<button type="button" class="btn go" data-go="screen" data-m="${m.id}" data-u="${ui}" data-s="${Math.min(S.prog[u.id] || 0, u.screens.length - 1)}">${(S.prog[u.id] || 0) ? 'Continue unit' : 'Start unit'} →</button>` : ''}<button type="button" class="btn ghost" data-go="unit" data-m="${m.id}" data-u="${ui}">Unit page (videos and overview)</button></div>${open ? '' : `<p class="fb note">${lockWhy(m, ui)}</p>`}</div>`;
    return `<details class="uacc ${open ? '' : 'locked'} ${unitDone(u) ? 'done' : ''}" data-uacc="${m.id}:${ui}"${UO[ui] ? ' open' : ''}><summary data-notc>${ico(unitDone(u) ? 'done' : open ? 'open' : 'lock')}<span class="t"><b>Unit ${ui + 1}: ${esc(u.title)}</b><span class="uacc-bar" aria-hidden="true"><i style="width:${S.teacher ? 100 : pct}%"></i></span></span><span class="s">${stat}</span><span class="uacc-chev" aria-hidden="true">▾</span></summary>${body}</details>`;
  }).join('')}</div><div class="list" style="margin-top:12px">
  <button type="button" class="lrow ${to ? '' : 'locked'}" data-go="test" data-m="${m.id}">${ico(testPassed(m) ? 'done' : to ? 'open' : 'lock')}<span class="t"><b>${esc(m.test.title || 'Module test')}</b> · Paper 1 style, pass mark ${m.test.pass || 70}%</span><span class="s">${S.tests[m.id] != null ? 'best ' + S.tests[m.id] + '%' : ''}</span></button>
  <button type="button" class="lrow ${to ? '' : 'locked'}" data-go="paper2" data-m="${m.id}">${ico(S.p2[m.id] ? 'done' : to ? 'open' : 'lock')}<span class="t"><b>Exam essay practice</b> · ${esc(m.paper2.genre || 'Paper 2 style')}</span><span class="s">${S.p2[m.id] ? 'submitted' : ''}</span></button>
  ${PLUGS.ww ? `<button type="button" class="lrow" data-go="ww">${ico('open')}<span class="t"><b>Essay Writing Workshop</b> · prewriting, research, thesis, hooks and the four genres</span><span class="s">always open</span></button>` : ''}
  ${PLUGS.genres ? `<button type="button" class="lrow" data-go="genres" data-tab="${m.id.toLowerCase()}">${ico('open')}<span class="t"><b>Sample essays for ${esc(m.code)}</b> · Grade One exemplars, annotated and marked</span><span class="s">always open</span></button>` : ''}
  </div>${to ? '' : '<p class="hint">The test and essay unlock when you finish every unit.</p>'}</div>`;
  return h;
}
function unitHTML() {
  const m = mod(S.loc.m), ui = S.loc.u, u = m.units[ui];
  const open = unitOpen(m, ui);
  let h = `<div class="crumbs"><span>${esc(m.code)} · Unit ${ui + 1} of ${m.units.length}</span><span>${u.screens.length} screens</span></div>`;
  h += `<div class="card"><span class="kicker">Unit ${ui + 1}</span><h1>${esc(u.title)}</h1>${AUD['unit-' + u.id] ? `<div class="row">${clipBtn('unit-' + u.id, 'Hear the unit intro', '')}</div>` : ''}
    <div><h4>In this unit you will</h4><ul>${u.objectives.map(o => `<li>${o}</li>`).join('')}</ul></div>
    ${figHTML(u.id)}
    <div><h4>Watch first (opens YouTube)</h4>${vidsHTML(u.videos)}</div>
    ${open ? `<div class="row"><button type="button" class="btn go" data-go="screen" data-m="${m.id}" data-u="${ui}" data-s="${Math.min(S.prog[u.id] || 0, u.screens.length - 1)}">${(S.prog[u.id] || 0) ? 'Continue unit' : 'Start unit'} →</button></div>` : `<p class="fb note">${lockWhy(m, ui)}</p>`}</div>`;
  h += `<div class="card"><h3>Screens</h3><div class="list">${u.screens.map((s, si) => {
    const st = screenDone(u, si) ? 'done' : screenOpen(u, si) ? 'open' : 'lock';
    return `<button type="button" class="lrow ${st === 'lock' ? 'locked' : ''}" data-go="screen" data-m="${m.id}" data-u="${ui}" data-s="${si}">${ico(st)}<span class="t">${esc(s.title || 'Check-in')}</span><span class="s">${kicker(s)[0]}</span></button>`;
  }).join('')}</div></div>`;
  return h;
}
function kicker(s) {
  if (s.type === 'learn') return ['Learn', ''];
  if (s.type === 'checkin') return ['Check-in', 'k-check'];
  if (s.type === 'write') return ['Write · ' + (s.genre || ''), 'k-write'];
  if (s.type === 'mcq') return ['Practice', ''];
  if (s.type === 'scenario') return ['Scenario game', 'k-game'];
  if (s.game) return ['Mini game', 'k-game'];
  return ['Practice', ''];
}

/* ---------------- screen ---------------- */
function screenHTML() {
  const { m, u, s } = cur(); if (!s) return '';
  const L = S.loc, k = skey(), done = screenDone(u, L.s), v = variant();
  if (!unitOpen(m, L.u)) return `<div class="card"><h2>This unit is not open yet</h2><p class="fb note">${lockWhy(m, L.u)}</p><div class="row"><button type="button" class="btn ghost" data-go="module" data-m="${m.id}">Back to ${esc(m.code)}</button></div></div>`;
  if (!screenOpen(u, L.s)) return `<div class="card"><h2>This screen is locked</h2><p>Finish the screens before it first.</p><div class="row"><button type="button" class="btn go" data-go="screen" data-m="${m.id}" data-u="${L.u}" data-s="${Math.min(S.prog[u.id] || 0, u.screens.length - 1)}">Go to my current screen</button></div></div>`;
  const [kick, kcls] = kicker(v || s);
  let h = `<div class="crumbs"><span>${esc(m.code)} · Unit ${L.u + 1}: ${esc(u.title)}</span><span>Screen ${L.s + 1} of ${u.screens.length}</span></div><div class="pbar"><i style="width:${(L.s + 1) / u.screens.length * 100}%"></i></div>`;
  h += `<article class="card"><div class="card-top"><span class="kicker ${kcls}">${esc(kick)}</span><span class="tools">`;
  h += listenBtn();
  if (s.type !== 'checkin') h += `<button type="button" class="tool" data-act="tutor">Mini tutorial</button>`;
  h += lvDialHTML(s);
  h += `</span></div>`;
  { const lv = effLv(s); if (lv === 1) h += `<div class="easy-banner"><b>🪜 Foundation level.</b> Same idea, smaller steps. Dial up whenever you are ready.</div>`; else if (lv === 3) h += `<div class="easy-banner up-banner"><b>🚀 Challenge level.</b> Grade One depth. Dial down any time; there is no penalty.</div>`; }
  if (v.bloom) h += `<div class="row" style="gap:6px;margin:-4px 0 6px">${bloomChip(v)}<span class="ribbon">${LVI[effLv(s)]} ${LVN[effLv(s)]}</span></div>`;
  h += `<h2>${esc(v.title || s.title || 'Quick check-in')}</h2>`;
  if ((ATTEMPTS[k] || 0) >= 2 && !done && effLv(s) > 1 && hasLv(s, effLv(s) - 1)) h += `<div class="fb note"><p>This one is tricky, and that is fine. Try a simpler version first?</p><div class="row"><button type="button" class="tool" data-act="setlv" data-l="${effLv(s) - 1}">🪜 Dial it down</button></div></div>`;
  h += activityHTML(v, done, s);
  if (s.videos) h += `<div><h4>Go deeper (YouTube)</h4>${vidsHTML(s.videos)}</div>`;
  h += `</article>`;
  const nx = nextLoc();
  h += `<div class="nav">${L.s > 0 ? `<button type="button" class="btn ghost" data-go="screen" data-m="${m.id}" data-u="${L.u}" data-s="${L.s - 1}">← Back</button>` : `<button type="button" class="btn ghost" data-go="unit" data-m="${m.id}" data-u="${L.u}">← Unit page</button>`}`;
  h += done ? `<button type="button" class="btn go" data-act="next">${nx.v === 'screen' ? 'Next →' : nx.v === 'unit' ? 'Next unit →' : 'Module test →'}</button>` : `<span class="locked-note">🔒 Next unlocks when you finish this screen</span>`;
  h += `</div>`;
  return h;
}
function activityHTML(v, done, s) {
  let h = '';
  if (v.intro) h += `<div class="lead html-body">${v.intro}</div>`;
  switch (v.type) {
    case 'learn': {
      const lv = s ? effLv(s) : 2;
      const plainBox = v.plain ? `<div class="lvbox lv1box"><span class="lbl">🪜 In plain words</span><div class="html-body">${v.plain}</div></div>` : '';
      const deepBox = v.deeper ? `<div class="lvbox lv3box"><span class="lbl">🚀 Challenge: go further</span><div class="html-body">${v.deeper}</div></div>` : '';
      if (lv === 1) h += plainBox + `<details class="fold"><summary>Read the full notes (Core level)</summary><div class="html-body">${v.html}</div></details>` + (v.deeper ? `<details class="fold"><summary>🚀 Challenge: go further</summary><div class="html-body">${v.deeper}</div></details>` : '');
      else if (lv === 3) h += `<div class="html-body">${v.html}</div>` + deepBox + (v.plain ? `<details class="fold"><summary>🪜 Quick recap in plain words</summary><div class="html-body">${v.plain}</div></details>` : '');
      else h += `<div class="html-body">${v.html}</div>` + (v.plain ? `<details class="fold"><summary>🪜 Need it simpler? In plain words</summary><div class="html-body">${v.plain}</div></details>` : '') + (v.deeper ? `<details class="fold"><summary>🚀 Ready for more? Challenge: go further</summary><div class="html-body">${v.deeper}</div></details>` : '');
    }
      if (S.loc.v === 'screen' && cur().u && cur().u.screens.findIndex(x => x.type === 'learn') === S.loc.s) h += figHTML(cur().u.id);
      h += done ? `<p class="done-note">Screen complete.</p>` : `<div class="selfcheck"><p>Do you understand this?</p><div class="row"><button type="button" class="btn yes" data-act="learn-yes">Yes, I've got it</button><button type="button" class="btn no" data-act="learn-no">Not yet, explain it again</button></div></div>`;
      return h;
    case 'checkin': return h + checkinHTML();
    case 'write': return h + writeHTML(v, done);
    case 'mcq': h += mcqHTML(v); break;
    case 'multi': h += multiHTML(v); break;
    case 'sort': h += sortHTML(v); break;
    case 'pick': h += pickHTML(v); break;
    case 'order': h += orderHTML(v); break;
    case 'match': h += matchHTML(v); break;
    case 'scenario': return h + scenarioHTML(v, done);
    case 'fix': h += fixHTML(v); break;
  }
  if (!T.submitted) h += `<div class="row"><button type="button" class="btn go" data-act="submit">Check my answer</button></div>`;
  if (T.warn && !T.submitted) h += `<p class="warn">${esc(T.warn)}</p>`;
  h += feedbackHTML(done);
  return h;
}
function mcqHTML(v) {
  let h = v.passage ? `<blockquote class="passage">${v.passage}</blockquote>` : '';
  h += `<p class="q">${v.q}</p><div class="opts">`;
  h += v.options.map((o, i) => {
    let c = T.answer === i ? 'sel' : '';
    if (T.submitted && T.answer === i) c = o.ok ? 'right' : 'wrong';
    return `<button type="button" class="opt ${c}" data-act="opt" data-i="${i}" aria-pressed="${T.answer === i}"><span class="letter">${'ABCDEF'[i]}</span><span>${o.t}</span></button>`;
  }).join('');
  return h + `</div>`;
}
function multiHTML(v) {
  return `<div class="items">${v.items.map((it, i) => `<div class="item ${T.wrong.includes(i) ? 'wrong' : ''} ${T.submitted && T.correct ? 'good' : ''}"><p>${it.text}</p><div class="chips">${it.options.map((o, oi) => `<button type="button" class="chip ${T.picks[i] === oi ? 'sel' : ''}" data-act="mpick" data-i="${i}" data-o="${oi}" aria-pressed="${T.picks[i] === oi}">${o}</button>`).join('')}</div>${T.submitted && T.wrong.includes(i) && it.fb ? `<p class="why">${it.fb}</p>` : ''}</div>`).join('')}</div>`;
}
function sortHTML(v) {
  let h = v.main ? `<div class="mainline">${v.main}</div>` : '';
  h += `<div class="items">${v.items.map((it, i) => `<div class="item ${T.wrong.includes(i) ? 'wrong' : ''} ${T.submitted && T.correct ? 'good' : ''}"><p>${it.t}</p><div class="chips">${v.bins.map((b, bi) => `<button type="button" class="chip ${T.picks[i] === bi ? 'sel' : ''}" data-act="sbin" data-i="${i}" data-b="${bi}" aria-pressed="${T.picks[i] === bi}">${b}</button>`).join('')}</div>${T.submitted && T.wrong.includes(i) && it.fb ? `<p class="why">${it.fb}</p>` : ''}</div>`).join('')}</div>`;
  return h;
}
const pickMany = v => v.correct && v.correct.length > 1 && /\b(every|all)\b/i.test(v.q || '');
function pickHTML(v) {
  const many = pickMany(v), on = i => many ? Array.isArray(T.answer) && T.answer.includes(i) : T.answer === i;
  let h = `<p class="q">${v.q}</p>${many ? '<p class="hint">Select all that apply, then check.</p>' : ''}<div class="pickpass ${v.poem ? 'poem' : ''}">`;
  h += v.lines.map((ln, i) => ln === '' ? '<span class="gap"></span>' : `<button type="button" class="ps ${on(i) ? 'sel' : ''}" data-act="pick" data-i="${i}" aria-pressed="${on(i)}">${ln}</button>`).join(v.poem ? '' : ' ');
  return h + `</div>`;
}
function blockHTML(b) { return `${b.tag ? `<span class="btag">${b.tag}</span>` : ''}<span>${b.t}</span>`; }
function orderHTML(v) {
  let h = `<p class="hint">Tap the blocks in the right order. Tap a placed block to send it back.</p>`;
  h += `<div class="olane" aria-label="Your order">${T.order.length ? T.order.map((b, pos) => `<button type="button" class="blk placed" data-act="orem" data-pos="${pos}"><span class="pos">${pos + 1}</span>${blockHTML(v.blocks[b])}</button>`).join('') : '<p class="empty">Your sequence builds here.</p>'}</div>`;
  const left = T.pool.filter(b => !T.order.includes(b));
  if (left.length) h += `<div class="opool">${left.map(b => `<button type="button" class="blk" data-act="oadd" data-b="${b}">${blockHTML(v.blocks[b])}</button>`).join('')}</div>`;
  return h;
}
function matchHTML(v) {
  const P = T.match.pairs, tagOf = {}; let n = 0;
  Object.keys(P).sort((a, b) => a - b).forEach(l => { tagOf['l' + l] = tagOf['r' + P[l]] = ++n; });
  const wrongL = T.wrong;
  let h = `<p class="hint">Tap an item on the left, then its match on the right. Tap a matched item to undo it.</p><div class="match">`;
  h += `<div class="mcol">${v.pairs.map((p, i) => `<button type="button" class="mcard ${T.match.sel === i ? 'sel' : ''} ${P[i] != null ? 'paired' : ''} ${wrongL.includes(i) ? 'wrong' : ''}" data-act="ml" data-i="${i}"><span class="mtag ${tagOf['l' + i] ? '' : 'none'}">${tagOf['l' + i] || '·'}</span><span>${p.l}</span></button>`).join('')}</div>`;
  h += `<div class="mcol">${T.rorder.map(ri => `<button type="button" class="mcard ${tagOf['r' + ri] ? 'paired' : ''}" data-act="mr" data-r="${ri}"><span class="mtag ${tagOf['r' + ri] ? '' : 'none'}">${tagOf['r' + ri] || '·'}</span><span>${v.pairs[ri].r}</span></button>`).join('')}</div>`;
  return h + `</div>`;
}
function scenarioHTML(v, done) {
  const sc = T.scene, nodes = v.nodes;
  let h = `<div class="scene">`;
  sc.hist.forEach(st => { h += `<div class="snode past"><div>${nodes[st.node].text}</div><p class="schoice">Your choice: ${nodes[st.node].choices[st.choice].t}</p>${nodes[st.node].choices[st.choice].fb ? `<p class="hint">${nodes[st.node].choices[st.choice].fb}</p>` : ''}</div>`; });
  const node = nodes[sc.node];
  if (node.end) {
    h += `<div class="send ${node.end}"><b>${node.end === 'good' ? 'Outcome: success' : 'Outcome: this did not go well'}</b><div>${node.text}</div></div>`;
  } else {
    h += `<div class="snode"><div>${node.text}</div><div class="opts">${node.choices.map((c, i) => `<button type="button" class="opt" data-act="schoice" data-i="${i}"><span class="letter">${'ABCDEF'[i]}</span><span>${c.t}</span></button>`).join('')}</div></div>`;
  }
  h += `</div>`;
  if (node.end) {
    if (node.end === 'bad') h += `<div class="row"><button type="button" class="btn go" data-act="srestart">Restart the scenario</button></div>`;
    h += feedbackHTML(done);
  }
  return h;
}
function feedbackHTML(done) {
  if (!T.submitted) return '';
  let h = T.kind === 'scenario' ? '' : `<div class="fb ${T.correct ? 'good' : 'bad'}"><b>${T.correct ? 'Correct!' : 'Not quite yet.'}</b><div>${T.msg}</div></div>`;
  h += savedHTML();
  if (done) return h + `<p class="done-note">Screen complete. Press Next when you are ready.</p>`;
  if (T.note === 'checker') h += `<div class="fb note">The answer checker says this is not right yet, so the next screen stays locked. Have another look, or open the mini tutorial.</div>`;
  h += `<div class="selfcheck"><p>Be honest: did you get this step right?</p><div class="row"><button type="button" class="btn yes" data-act="self-yes">Yes, I got it</button><button type="button" class="btn no" data-act="self-no">No, I need help</button></div></div>`;
  if (!T.correct && T.kind !== 'scenario') { const cs = rawSrc(), cl = cs ? effLv(cs) : 2; h += `<div class="row"><button type="button" class="btn ghost" data-act="retry">Try again</button>${cs && cl > 1 && hasLv(cs, cl - 1) ? `<button type="button" class="btn ghost" data-act="setlv" data-l="${cl - 1}">🪜 Dial it down</button>` : ''}</div>`; }
  if (T.correct) { const cs = rawSrc(), cl = cs ? effLv(cs) : 2; if (cs && cl < 3 && hasLv(cs, cl + 1)) h += `<div class="row"><button type="button" class="btn ghost" data-act="setlv" data-l="${cl + 1}">🚀 Dial it up: try the ${LVN[cl + 1]} version</button></div>`; }
  return h;
}
function checkinHTML() {
  const { m, u } = cur();
  const moods = [['great', '😎', "I've got this"], ['okay', '🙂', 'Mostly okay'], ['stuck', '😕', "I'm struggling"]];
  let h = `<p class="lead">How are you feeling about <b>${esc(u.title)}</b> so far?</p><div class="moods">${moods.map(x => `<button type="button" class="mood ${T.mood === x[0] ? 'sel' : ''}" data-act="mood" data-m="${x[0]}" aria-pressed="${T.mood === x[0]}"><span class="face" aria-hidden="true">${x[1]}</span>${x[2]}</button>`).join('')}</div>`;
  const recap = `<div class="recap"><h4>Quick recap of this unit</h4><ul>${u.objectives.map(o => `<li>${o}</li>`).join('')}</ul><p class="hint">Rewatch a video if you need to:</p>${vidsHTML(u.videos)}</div>`;
  if (T.mood === 'great') h += `<div class="fb good"><b>Excellent.</b> Keep that momentum. The next screen is unlocked.</div>`;
  if (T.mood === 'okay') h += `<div class="fb note"><b>That is completely normal.</b> Every activity has a level dial (🪜 Foundation · ⚙️ Core · 🚀 Challenge) and a Mini tutorial. Here is a quick recap.</div>` + recap;
  if (T.mood === 'stuck') {
    const L = S.loc; let prev = null;
    for (let i = L.s - 1; i >= 0; i--) if (u.screens[i].easy && u.screens[i].type !== 'learn') { prev = i; break; }
    h += `<div class="fb note"><b>Thank you for being honest.</b> Strong students say when they are stuck. Read the recap, then redo the last activity in an easier version.</div>` + recap;
    if (prev != null) h += `<div class="row"><button type="button" class="btn go" data-act="redo-easy" data-i="${prev}">Redo "${esc(u.screens[prev].title)}" in dial-down mode</button></div>`;
  }
  return h;
}

/* ---------------- writing ---------------- */
const TRANSITIONS = ['firstly', 'secondly', 'thirdly', 'finally', 'furthermore', 'moreover', 'in addition', 'additionally', 'also', 'however', 'nevertheless', 'on the other hand', 'in contrast', 'conversely', 'although', 'whereas', 'similarly', 'likewise', 'therefore', 'consequently', 'as a result', 'thus', 'hence', 'because', 'for example', 'for instance', 'such as', 'in particular', 'in conclusion', 'overall', 'ultimately', 'to conclude', 'in summary', 'meanwhile', 'subsequently', 'then', 'next', 'afterwards'];
const STOP = new Set('about above after again against their there these those which while would could should being other through where whose because before between during every under until within without what when your yours they them that this with from have will were been than then into also just very more most much such some only over many make made like said each'.split(' '));
function analyse(text, task) {
  const words = wc(text);
  const paras = text.split(/\n\s*\n|\n/).filter(p => p.trim()).length;
  const sentences = text.split(/[.!?]+(?:\s|$)/).filter(x => x.trim().split(/\s+/).length > 1).length || (words ? 1 : 0);
  const avg = words / Math.max(1, sentences);
  const low = text.toLowerCase();
  const trans = TRANSITIONS.filter(t => new RegExp('\\b' + t.replace(/ /g, '\\s+') + '\\b', 'i').test(low));
  const P = text.split(/\n\s*\n|\n/).filter(x => x.trim());
  const formal = /essay|report|letter|memo|summary|proposal|analysis|evaluation|response|article|justification/i.test(task.genre || '');
  const crit = (task.rubric || []).map(r => {
    const hits = (r.look || []).filter(src => { try { return new RegExp(src, 'i').test(text); } catch (e) { return false; } }).length;
    let ok = hits >= (r.min || 1), extra = '';
    if (/organi[sz]ation|structure/i.test(r.criterion)) {
      const iss = [], introW = P.length ? wc(P[0]) : 0, concW = P.length > 1 ? wc(P[P.length - 1]) : 0;
      if (task.max >= 400 && P.length < 4) iss.push(`there ${P.length === 1 ? 'is only 1 paragraph' : 'are only ' + P.length + ' paragraphs'}; a full essay needs an introduction, at least two body paragraphs and a conclusion`);
      else if (task.max < 400 && words > 150 && P.length < 3) iss.push('break your response into clear paragraphs');
      if (trans.length < 3) iss.push('use more transitions between and within paragraphs');
      if (P.length > 2 && concW > introW) iss.push(`your conclusion (${concW} words) is longer than your introduction (${introW} words); it should be shorter`);
      if (P.length > 2 && !/in conclusion|to conclude|overall|ultimately|in summary|therefore/i.test(P[P.length - 1])) iss.push('your final paragraph does not signal that it is concluding');
      ok = ok && iss.length <= 1;
      extra = iss.length ? 'Specifically: ' + iss.join('; ') + '.' : 'Structure check: clear paragraphs, linked with transitions, and a conclusion shorter than your introduction.';
    }
    if (/expression|language use|mechanics/i.test(r.criterion)) {
      const E = [[/\balot\b/i, '"alot" should be "a lot"'], [/\b(could|should|would) of\b/i, '"could of" should be "could have"'], [/\b(dont|cant|wont|didnt|isnt|doesnt|im|thats)\b/, 'a contraction is missing its apostrophe'], [/(^|[.!?]\s+)i\b|\si\s/, '"i" on its own should be a capital "I"'], [/\b(u|ur|bcuz|cuz|gonna|wanna|kinda|lol|tbh)\b/i, 'text-speak or slang appears; use Standard English unless it is deliberate dialogue'], [/[.!?]\s+[a-z]/, 'at least one sentence starts with a lowercase letter'], [/\b(\w{3,})\s+\1\b/i, 'a word is repeated by mistake'], [/\s+[,.;:]/, 'there is a space before a punctuation mark']];
      if (formal) E.push([/\b(don't|can't|won't|didn't|isn't|doesn't|it's|I'm|we're|they're)\b/i, 'contractions such as "don\'t" are too informal here; write "do not"']);
      const iss = E.filter(([re]) => re.test(text)).map(x => x[1]);
      ok = ok && iss.length === 0;
      extra = iss.length ? 'Proofreading points: ' + iss.join('; ') + '.' : 'Proofreading check: no common slips found. Still read it aloud once for tense and subject-verb agreement.';
    }
    return { r, hits, ok, extra };
  });
  const freq = {};
  (low.match(/[a-z']{5,}/g) || []).forEach(w => { if (!STOP.has(w)) freq[w] = (freq[w] || 0) + 1; });
  const rep = Object.entries(freq).sort((a, b) => b[1] - a[1])[0];
  const general = [];
  const span = task.max - task.min;
  if (words < task.min + span * 0.25) general.push(`<b>Length:</b> you have ${words} words, just above the minimum of ${task.min}. Develop your strongest point with one more example or explanation; thin answers usually lose marks on development.`);
  else if (words > task.max - span * 0.1) general.push(`<b>Length:</b> at ${words} words you are close to the limit of ${task.max}. Check every sentence earns its place; cutting repetition makes writing sharper.`);
  else general.push(`<b>Length:</b> ${words} words is a well-judged length for this task.`);
  if (words > 120 && paras < 2) general.push(`<b>Paragraphing:</b> your response is one block of text. Break it into paragraphs, one main point each, so the examiner can follow your structure.`);
  else if (paras >= 3) general.push(`<b>Paragraphing:</b> ${paras} paragraphs gives your writing a clear shape. Make sure each one opens with a sentence that signals its point.`);
  if (avg > 30) general.push(`<b>Sentences:</b> your sentences average about ${Math.round(avg)} words. Some are probably running on. Split the longest ones so each idea lands clearly.`);
  else if (avg < 9 && words > 60) general.push(`<b>Sentences:</b> many of your sentences are very short (about ${Math.round(avg)} words on average). Combine some with words like <i>because</i>, <i>although</i> or <i>which</i> to show how ideas connect.`);
  else if (words > 40) general.push(`<b>Sentences:</b> good control of sentence length (about ${Math.round(avg)} words on average).`);
  if (trans.length >= 3) general.push(`<b>Cohesion:</b> you used linking words well (${trans.slice(0, 6).map(t => '<i>' + esc(t) + '</i>').join(', ')}). They guide the reader through your ideas.`);
  else general.push(`<b>Cohesion:</b> add more transitional words and phrases to link ideas, for example <i>furthermore</i>, <i>however</i>, <i>as a result</i> or <i>for instance</i>.${trans.length ? ' You used ' + trans.map(t => '<i>' + esc(t) + '</i>').join(', ') + '.' : ''}`);
  if (rep && rep[1] >= 4 && words < 600) general.push(`<b>Word choice:</b> you used "<i>${esc(rep[0])}</i>" ${rep[1]} times. Vary it with a synonym or a pronoun to keep the writing fresh.`);
  return { words, paras, sentences, avg, trans, crit, general };
}
/* ---------------- model comparison, error mark-up and dial-down ---------------- */
const MISSPELL = { recieve: 'receive', recieved: 'received', definately: 'definitely', definatly: 'definitely', seperate: 'separate', occured: 'occurred', untill: 'until', wich: 'which', becuase: 'because', beleive: 'believe', goverment: 'government', enviroment: 'environment', arguement: 'argument', accomodate: 'accommodate', acheive: 'achieve', begining: 'beginning', beggining: 'beginning', calender: 'calendar', comming: 'coming', concious: 'conscious', dissapoint: 'disappoint', embarass: 'embarrass', existance: 'existence', finaly: 'finally', foward: 'forward', freind: 'friend', grammer: 'grammar', independant: 'independent', intresting: 'interesting', knowlege: 'knowledge', libary: 'library', neccessary: 'necessary', necessery: 'necessary', noticable: 'noticeable', occassion: 'occasion', persue: 'pursue', posession: 'possession', prefered: 'preferred', realy: 'really', recomend: 'recommend', refered: 'referred', relevent: 'relevant', sucess: 'success', succesful: 'successful', suprise: 'surprise', tommorow: 'tomorrow', truely: 'truly', wierd: 'weird', writting: 'writing', thier: 'their', adress: 'address', carribean: 'Caribbean', caribean: 'Caribbean', comunication: 'communication', communciation: 'communication', therfore: 'therefore', responsiblity: 'responsibility', langauge: 'language', languge: 'language', sentance: 'sentence', paragragh: 'paragraph', conclution: 'conclusion', beautifull: 'beautiful', usefull: 'useful', wether: 'whether', alot: 'a lot', aswell: 'as well', infact: 'in fact', everytime: 'every time', tought: 'taught', heared: 'heard', writter: 'writer', purpous: 'purpose', purpouse: 'purpose', persuation: 'persuasion', technic: 'technique', technics: 'techniques', organisational: null, metaphore: 'metaphor', similie: 'simile', personnification: 'personification', alliterration: 'alliteration', exagerate: 'exaggerate', exageration: 'exaggeration', critisism: 'criticism', occurence: 'occurrence', publically: 'publicly', reccomend: 'recommend', maintainance: 'maintenance', priviledge: 'privilege', judgement: null };
const ERR_RULES = [
  [/\b(could|should|would|must) of\b/gi, 'grammar', m => `"${m[0]}" should be "${m[1]} have".`, m => m[1] + ' have', 'confusable'],
  [/\b(he|she|it) (have|do|go|say|make|show|use|want|need|think|seem|try)\b/gi, 'grammar', m => `Subject–verb agreement: "${m[1]}" takes "${({ have: 'has', do: 'does', go: 'goes', say: 'says', make: 'makes', show: 'shows', use: 'uses', want: 'wants', need: 'needs', think: 'thinks', seem: 'seems', try: 'tries' })[m[2].toLowerCase()]}".`, m => m[1] + ' ' + ({ have: 'has', do: 'does', go: 'goes', say: 'says', make: 'makes', show: 'shows', use: 'uses', want: 'wants', need: 'needs', think: 'thinks', seem: 'seems', try: 'tries' })[m[2].toLowerCase()], 'sva'],
  [/\b(they|we|you) (is|was|has|does)\b/gi, 'grammar', m => `Subject–verb agreement: "${m[1]}" takes "${({ is: 'are', was: 'were', has: 'have', does: 'do' })[m[2].toLowerCase()]}".`, m => m[1] + ' ' + ({ is: 'are', was: 'were', has: 'have', does: 'do' })[m[2].toLowerCase()], 'sva'],
  [/\b(he|she|it|they|we|I) does (go|come|say|do|make|want|like|eat|live|work)\b/g, 'creole', m => `Creole habitual "does + verb". In Standard English write the simple present.`, null, 'creole'],
  [/\bmore (better|worse|bigger|smaller|easier|harder)\b/gi, 'grammar', m => `Double comparative: write "${m[1]}" on its own.`, m => m[1], 'compar'],
  [/\b(more|less|better|worse|greater|rather|other|larger|smaller) then\b/gi, 'confusable', m => `Use "than" for comparisons.`, m => m[1] + ' than', 'confusable'],
  [/\byour (welcome|going|right|wrong|not)\b/gi, 'confusable', m => `"your" shows possession; here you need "you're" (you are).`, m => "you're " + m[1], 'confusable'],
  [/\btheir (is|are|was|were)\b/gi, 'confusable', m => `"their" shows possession; here you need "there".`, m => 'there ' + m[1], 'confusable'],
  [/\bits (a|an|the|not|very|important|clear|true)\b/g, 'confusable', m => `"its" is possessive. If you mean "it is", write "it is" (no contractions in formal essays).`, m => 'it is ' + m[1], 'apos'],
  [/(^|[.!?]\s+)([a-z])/g, 'capitalisation', m => `Start every sentence with a capital letter.`, m => m[1] + m[2].toUpperCase(), 'caps'],
  [/(^|\s)i(?=[\s,.'])/g, 'capitalisation', m => `The pronoun "I" is always a capital letter.`, m => m[1] + 'I', 'caps'],
  [/\b(\w{2,})\s+\1\b/gi, 'style', m => `Repeated word "${m[1]}".`, m => m[1], 'repeat'],
  [/\s+([,.;:!?])/g, 'punctuation', m => `No space before a punctuation mark.`, m => m[1], 'punct'],
  [/\b(dont|cant|wont|didnt|isnt|doesnt|im|thats|wasnt|arent)\b/gi, 'punctuation', m => `Missing apostrophe, and contractions are too informal for an exam essay: write the full form.`, null, 'apos'],
  [/\b(don't|can't|won't|didn't|isn't|doesn't|it's|I'm|we're|they're|wasn't|aren't|you're)\b/g, 'register', m => `Contraction: write the full form (e.g. "do not") in formal writing.`, null, 'apos'],
  [/\b(gonna|wanna|kinda|gotta|u|ur|bcuz|cuz|lol|tbh|stuff|things like that|a bunch of|kids)\b/gi, 'register', m => `"${m[0]}" is informal. Choose a formal word for an exam essay.`, null, 'register'],
  [/\b(me and (he|she|him|her|them))\b/gi, 'grammar', m => `Pronoun case: put the other person first and use the subject form, e.g. "he and I".`, null, 'pron'],
  [/\b(them) (boys|girls|people|students|things|ones)\b/gi, 'creole', m => `In Standard English write "those ${m[2]}".`, m => 'those ' + m[2], 'creole']
];
const LEARN = {
  spelling: ['Spelling rules', { go: 'lab', tab: 'rules' }], sva: ['Subject–verb agreement', { go: 'lq', k: 'grammar', i: 0 }], tense: ['Tense consistency', { go: 'lq', k: 'grammar', i: 1 }],
  pron: ['Pronoun agreement and case', { go: 'lq', k: 'grammar', i: 2 }], runon: ['Run-ons and comma splices', { go: 'lq', k: 'grammar', i: 4 }], passive: ['Active and passive voice', { go: 'lq', k: 'grammar', i: 7 }],
  caps: ['Capitalisation', { go: 'lq', k: 'mechanics', i: 3 }], apos: ['Apostrophes', { go: 'lq', k: 'mechanics', i: 1 }], punct: ['Commas and punctuation', { go: 'lq', k: 'mechanics', i: 0 }],
  para: ['Paragraphing', { go: 'lq', k: 'mechanics', i: 7 }], confusable: ['Common errors', { go: 'lab', tab: 'errors' }], creole: ['Creole and Standard English (Module 2)', { go: 'lab', tab: 'errors' }],
  register: ['Register and formal writing', { go: 'lab', tab: 'errors' }], repeat: ['Proofreading', { go: 'lab', tab: 'errors' }], compar: ['Common errors', { go: 'lab', tab: 'errors' }], style: ['Proofreading', { go: 'lab', tab: 'errors' }]
};
function learnBtn(rule) {
  const L = LEARN[rule] || LEARN[(rule || '').split(/[-_:]/)[0]] || LEARN.confusable; const a = L[1];
  return `<button type="button" class="linkbtn" data-go="${a.go}"${a.tab ? ` data-tab="${a.tab}"` : ''}${a.k ? ` data-k="${a.k}"` : ''}${a.i != null ? ` data-i="${a.i}"` : ''}>Learn: ${esc(L[0])} →</button>`;
}
function findErrors(text, formal) {
  let out = [];
  const WD = window.COURSE_WORDDESK;
  if (WD && typeof WD.check === 'function') {
    try { out = (WD.check(text, { formal: formal !== false }) || []).map(e => ({ start: e.start, end: e.end, kind: e.kind || 'grammar', msg: e.msg, fix: e.fix, rule: /spell/.test(e.kind) ? 'spelling' : /^(sva|there-is)|agree/i.test(e.rule || e.msg) ? 'sva' : /comma-splice|run-on|long-sentence/.test(e.rule || '') ? 'runon' : /passive/.test(e.rule || '') ? 'passive' : /pronoun|them-those/.test(e.rule || '') ? 'pron' : /agree|sva/i.test(e.msg) ? 'sva' : /capital/.test(e.kind) ? 'caps' : /apostroph/i.test(e.msg) ? 'apos' : /creole/.test(e.kind) ? 'creole' : /register/.test(e.kind) ? 'register' : /comma splice|run-on/i.test(e.msg) ? 'runon' : /punct/.test(e.kind) ? 'punct' : e.kind })); } catch (err) { out = []; }
  }
  const re = /[A-Za-z']+/g; let m;
  while ((m = re.exec(text))) { const w = m[0].toLowerCase(); if (MISSPELL[w]) out.push({ start: m.index, end: m.index + m[0].length, kind: 'spelling', msg: `Spelling: did you mean "${MISSPELL[w]}"?`, fix: MISSPELL[w], rule: 'spelling' }); }
  ERR_RULES.forEach(([rx, kind, msg, fix, rule]) => { rx.lastIndex = 0; let mm; while ((mm = rx.exec(text))) { if (!mm[0].length) { rx.lastIndex++; continue; } let st = mm.index, en = mm.index + mm[0].length; if (rule === 'caps' && mm[1]) st += mm[1].length; out.push({ start: st, end: en, kind, msg: msg(mm), fix: fix ? fix(mm).slice(rule === 'caps' && mm[1] ? mm[1].length : 0) : null, rule }); } });
  const sre = /[^.!?]+[.!?]*/g; let sm;
  while ((sm = sre.exec(text))) { const n = sm[0].trim().split(/\s+/).length; if (n > 40) { const lead = sm[0].length - sm[0].trimStart().length; out.push({ start: sm.index + lead, end: sm.index + sm[0].length, kind: 'style', msg: `This sentence is ${n} words long. It probably runs on: split it into two or three sentences.`, fix: null, rule: 'runon' }); } }
  if (formal === false) out = out.filter(e => e.kind !== 'register');
  out.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
  const res = []; let last = -1;
  out.forEach(e => { if (e.start >= last && e.end > e.start) { res.push(e); last = e.end; } });
  return res;
}
function markupHTML(text, errs) {
  let h = '', pos = 0;
  errs.forEach((e, i) => { h += esc(text.slice(pos, e.start)); h += `<mark class="err err-${esc(e.kind)}" title="${esc(e.msg)}"><sup>${i + 1}</sup>${esc(text.slice(e.start, e.end))}</mark>`; pos = e.end; });
  h += esc(text.slice(pos));
  return h.split(/\n\s*\n|\n/).map(p => `<p>${p}</p>`).join('');
}
const DEVICES = ['simile', 'metaphor', 'personification', 'hyperbole', 'alliteration', 'imagery', 'rhetorical question', 'repetition', 'anaphora', 'irony', 'juxtaposition', 'onomatopoeia', 'symbolism', 'allusion', 'emotive language', 'statistics', 'anecdote', 'expert opinion', 'diction', 'tone', 'contrast', 'direct address', 'inclusive language', 'tricolon', 'rule of three', 'understatement', 'pun', 'oxymoron', 'paradox', 'euphemism', 'sarcasm', 'idiom', 'flashback', 'foreshadowing', 'dialogue'];
const STRATS = ['cause and effect', 'compare and contrast', 'comparison and contrast', 'problem and solution', 'problem-solution', 'chronological', 'definition', 'exemplification', 'illustration', 'classification', 'division and classification', 'narration', 'description', 'process analysis', 'general to specific', 'specific to general', 'order of importance', 'spatial order', 'sequence', 'argument'];
const EVID = /["“”']\s*[^"“”]{4,}["“”]|\b(for example|for instance|such as|according to|in line|the writer states|the writer writes|evident when|as seen in|illustrated by)\b/i;
const EXPL = /\b(this (shows|suggests|highlights|reveals|demonstrates|implies|emphasi[sz]es|creates|helps|means|allows)|which (shows|suggests|highlights|reveals|creates|helps)|because|thereby|in order to|so that)\b/i;
const LINKW = /\b(purpose|thesis|therefore|thus|ultimately|overall|as a result|consequently|in this way|achiev|persuad|inform|convinc|reinforc)\w*/i;
function peelCheck(p) { const s = (p.match(/[^.!?]+[.!?]*/g) || [p]); return { P: s[0] && s[0].trim().split(/\s+/).length >= 6, E: EVID.test(p), Ex: EXPL.test(p), L: LINKW.test(s.slice(-2).join(' ')) }; }
function namedIn(text, list) { const low = text.toLowerCase(); return [...new Set(list.filter(d => new RegExp('\\b' + d.replace(/ /g, '\\s+') + '(s|es)?\\b').test(low)).map(d => d === 'comparison and contrast' ? 'compare and contrast' : d === 'problem-solution' ? 'problem and solution' : d === 'rule of three' ? 'tricolon' : d))]; }
function keyIdeas(model, mine) {
  const low = strip(model).toLowerCase(), me = mine.toLowerCase(), f = {};
  (low.match(/[a-z]{6,}/g) || []).forEach(w => { if (!STOP.has(w)) f[w] = (f[w] || 0) + 1; });
  return Object.entries(f).filter(([w, n]) => n >= 2 && !me.includes(w.slice(0, Math.max(5, w.length - 3)))).sort((a, b) => b[1] - a[1]).slice(0, 8).map(x => x[0]);
}
const GAMES_FOR = { devices: [['hooks', 'Hook, Line and Genre'], ['crossword', 'Word Nerd Crossword'], ['jigsaw', 'Device Puzzle Rush'], ['songs', 'Lyric Lab']], strats: [['orgstrat', 'Blueprint Breakers'], ['discourse', 'Discourse Detective'], ['hooks', 'Hook, Line and Genre'], ['transitions', 'Causeway Crew: Transitions']], argument: [['argpers', 'Prove It or Move It']], expository: [['funnel', 'Funnel Vision'], ['funnelbuilder', 'Funnel Builder'], ['mindmap', 'Mind Map Maker']], mainidea: [['mainidea', 'Main Idea Quest']] };
function gameLinks(kind) { return (GAMES_FOR[kind] || []).map(([id, name]) => { const g = (typeof IMPORTED !== 'undefined' ? IMPORTED : []).find(x => x.id === id); const have = !g || !g.price || owns('g-' + id); return have ? `<button type="button" class="chip" data-gx="opengame" data-page="games/${id}.html" data-id="${id}">🎮 ${esc(name)}</button>` : `<button type="button" class="chip" data-go="games">🔒 ${esc(name)} (Games hub)</button>`; }).join(''); }
function compareHTML(v, text) {
  const model = strip(v.model || ''), mine = text || '';
  const P = mine.split(/\n\s*\n|\n/).filter(x => x.trim()), MP = (v.model || '').split(/<\/p>|\n\s*\n/).map(strip).filter(x => x.trim().split(/\s+/).length > 4);
  const A = analyse(mine, v), B = analyse(model, v);
  const dM = namedIn(mine, DEVICES), dX = namedIn(model, DEVICES), sM = namedIn(mine, STRATS), sX = namedIn(model, STRATS);
  const body = P.length > 2 ? P.slice(1, -1) : P, mbody = MP.length > 2 ? MP.slice(1, -1) : MP;
  const peel = body.map(peelCheck), mpeel = mbody.map(peelCheck);
  const peelScore = L => L.length ? Math.round(L.reduce((a, c) => a + [c.P, c.E, c.Ex, c.L].filter(Boolean).length, 0) / (L.length * 4) * 100) : 0;
  const errs = findErrors(mine, /essay|report|letter|memo|summary|proposal|analysis|evaluation|response|article|justification/i.test(v.genre || '') || !v.genre), miss = keyIdeas(v.model || '', mine);
  const row = (k, a, b, good) => `<tr><td>${k}</td><td class="${good === true ? 'ok' : good === false ? 'no' : ''}">${a}</td><td>${b}</td></tr>`;
  const imp = [];
  if (P.length < Math.min(MP.length, 5) - 1) imp.push({ t: `<b>Structure:</b> the model uses ${MP.length} paragraphs; you used ${P.length}. Give each main point its own PEEL paragraph.`, l: learnBtn('para') });
  if (peelScore(peel) < Math.max(60, peelScore(mpeel) - 15)) { const w = peel.map((c, i) => [i, c]).filter(([, c]) => !(c.P && c.E && c.Ex && c.L)).map(([i, c]) => `body paragraph ${i + 1} is missing ${[!c.P && 'a clear Point', !c.E && 'Evidence (a short quotation or example)', !c.Ex && 'Explanation (this shows… because…)', !c.L && 'a Link back to the purpose or thesis'].filter(Boolean).join(', ')}`); imp.push({ t: `<b>PEEL:</b> ${w.slice(0, 3).join('; ') || 'tighten each paragraph so it has a Point, Evidence, Explanation and Link'}.`, l: '' }); }
  const lostD = dX.filter(d => !dM.includes(d));
  if (lostD.length) imp.push({ t: `<b>Literary devices:</b> the model names and explains ${dX.map(x => '<i>' + esc(x) + '</i>').join(', ')}. ${dM.length ? 'You named ' + dM.map(x => '<i>' + esc(x) + '</i>').join(', ') + '. ' : 'You did not name a device. '}Name the device, quote it, then explain its effect on the reader.`, l: gameLinks('devices') });
  const lostS = sX.filter(d => !sM.includes(d));
  if (lostS.length) imp.push({ t: `<b>Organisational strategies:</b> the model identifies ${sX.map(x => '<i>' + esc(x) + '</i>').join(', ')}. ${sM.length ? 'You identified ' + sM.map(x => '<i>' + esc(x) + '</i>').join(', ') + '. ' : 'You did not name a strategy. '}Name it and show how it helps the writer's purpose.`, l: gameLinks('strats') });
  if (A.trans.length + 2 < B.trans.length) imp.push({ t: `<b>Cohesion:</b> the model uses ${B.trans.length} different transitions; you used ${A.trans.length}. Try ${B.trans.filter(t => !A.trans.includes(t)).slice(0, 5).map(t => '<i>' + esc(t) + '</i>').join(', ')}.`, l: '' });
  if (miss.length >= 3) imp.push({ t: `<b>Content:</b> key ideas the model develops that your answer does not mention: ${miss.map(w => '<i>' + esc(w) + '</i>').join(', ')}. Check whether you have covered the main point and purpose fully.`, l: gameLinks('mainidea') });
  if (errs.length) imp.push({ t: `<b>Expression:</b> ${errs.length} language point${errs.length > 1 ? 's' : ''} to fix (marked in your writing below). Expression is worth 8 marks.`, l: '' });
  if (P.length > 2 && wc(P[P.length - 1]) > wc(P[0])) imp.push({ t: `<b>Conclusion:</b> your conclusion is longer than your introduction. Keep it short: restate the thesis and close.`, l: '' });
  let h = `<section class="cmp" aria-label="Compare with the model"><h3>Compare your essay with the model</h3><p class="hint">The model is now unlocked because you made a full attempt. Use the comparison to see exactly what to improve, then revise and resubmit.</p>
    <div class="tablewrap"><table class="rubric cmpt"><thead><tr><th></th><th>Yours</th><th>Model</th></tr></thead><tbody>
    ${row('Words', A.words, B.words)}${row('Paragraphs', P.length, MP.length, P.length >= Math.min(MP.length, 5) - 1)}${row('Average sentence length', Math.round(A.avg) + ' words', Math.round(B.avg) + ' words', A.avg <= 30 && A.avg >= 9)}
    ${row('Transitions', A.trans.length, B.trans.length, A.trans.length + 2 >= B.trans.length)}${row('PEEL in body paragraphs', peelScore(peel) + '%', peelScore(mpeel) + '%', peelScore(peel) >= Math.max(60, peelScore(mpeel) - 15))}
    ${dX.length || dM.length ? row('Literary devices named', dM.length ? dM.map(esc).join(', ') : 'none', dX.map(esc).join(', ') || 'none', !lostD.length) : ''}
    ${sX.length || sM.length ? row('Organisational strategies named', sM.length ? sM.map(esc).join(', ') : 'none', sX.map(esc).join(', ') || 'none', !lostS.length) : ''}
    ${row('Language points to fix', errs.length, '—', errs.length === 0)}</tbody></table></div>`;
  h += `<h4>Areas for improvement</h4>${imp.length ? `<ol class="imp">${imp.map(x => `<li>${x.t}${x.l ? `<div class="chips" style="margin-top:6px">${x.l}</div>` : ''}</li>`).join('')}</ol>` : `<p class="fb good">Your essay matches the model on every check. Polish your word choice and resubmit for a Grade One finish.</p>`}`;
  h += `<details class="fold" open><summary>Your writing, marked up (${errs.length} point${errs.length === 1 ? '' : 's'})</summary><div><div class="passage marked">${markupHTML(mine, errs)}</div>
    ${errs.length ? `<ol class="errlist">${errs.map((e, i) => `<li><span class="ribbon err-${esc(e.kind)}">${esc(e.kind)}</span> <b>${i + 1}.</b> "${esc(mine.slice(e.start, e.end).slice(0, 80))}" — ${esc(e.msg)}${e.fix ? ` <span class="hint">Try: <b>${esc(e.fix)}</b></span>` : ''} ${learnBtn(e.rule)}</li>`).join('')}</ol>` : '<p class="hint">No language slips found by the checker. Read it aloud once to catch anything it missed.</p>'}
    <div class="row">${TTS.ok ? `<button type="button" class="tool" data-act="speak" data-t="${esc(mine)}" data-l="🔊 Hear my essay as written">🔊 Hear my essay as written</button>` : ''}${PLUGS.words ? '<button type="button" class="tool" data-go="words">📖 Open the Word Desk</button>' : ''}</div></div></details>`;
  h += `<details class="fold"><summary>🎚️ Dial it down: rebuild one paragraph with PEEL</summary><div>${peelBuilderHTML(peel)}</div></details>`;
  h += `<details class="fold"><summary>Model answer (unlocked)</summary><div class="html-body modelx">${v.model}</div></details></section>`;
  return h;
}
function peelBuilderHTML(peel) {
  const Q = T.peel || (T.peel = { p: '', e: '', x: '', l: '' });
  const weak = peel ? peel.findIndex(c => !(c.P && c.E && c.Ex && c.L)) : -1;
  const c = { P: Q.p.trim().split(/\s+/).length >= 6, E: EVID.test(Q.e), Ex: EXPL.test(Q.x), L: LINKW.test(Q.l) };
  const f = (k, ck, lab, ph, tip) => `<div class="field"><label for="peel-${k}"><b>${lab}</b> ${ck ? '✅' : '⬜'}</label><textarea id="peel-${k}" class="ta sm" data-peel="${k}" rows="2" placeholder="${esc(ph)}">${esc(Q[k])}</textarea><span class="hint">${tip}</span></div>`;
  return `<p>${weak >= 0 ? `Start with <b>body paragraph ${weak + 1}</b>: it is missing part of PEEL.` : 'Practise one paragraph at a time.'} Fill in each box. Ticks appear when each part is there.</p>
    ${f('p', c.P, 'Point', 'The writer uses … to …', 'One sentence that makes your claim about the extract.')}
    ${f('e', c.E, 'Evidence', 'For example, the writer states, "…"', 'A short quotation in quotation marks, or "for example…".')}
    ${f('x', c.Ex, 'Explanation', 'This shows/suggests … because …', 'Explain HOW the evidence proves your point and its effect on the reader.')}
    ${f('l', c.L, 'Link', 'Therefore, this helps the writer achieve the purpose of …', 'Tie the point back to the writer\'s purpose or your thesis.')}
    <div class="row"><button type="button" class="btn go" data-gx="peelins" ${c.P && c.E && c.Ex && c.L ? '' : 'disabled'}>Add this paragraph to my essay</button><span class="hint">Then resubmit for new feedback.</span></div>`;
}

function writeHTML(v, done) {
  const k = skey(), w = wc(T.text || '');
  let h = `<div class="html-body"><div class="q">${v.prompt}</div></div>`;
  if (v.stimulus) h += `<details class="fold" ${T.submitted ? '' : 'open'}><summary>Read the stimulus</summary><div><div class="passage">${v.stimulus}</div></div></details>`;
  if (v.frame) h += `<details class="fold"><summary>Planning frame and sentence starters</summary><div class="html-body">${v.frame}</div></details>`;
  h += `<details class="fold"><summary>How this will be marked (${v.rubric.reduce((a, r) => a + r.marks, 0)} marks)</summary><div><div class="tablewrap"><table class="rubric"><thead><tr><th>Criterion</th><th>Marks</th></tr></thead><tbody>${v.rubric.map(r => `<tr><td>${esc(r.criterion)}</td><td>${r.marks}</td></tr>`).join('')}</tbody></table></div></div></details>`;
  h += `<label for="ta-${k}" class="sr">Your ${esc(v.genre)}</label><textarea id="ta-${k}" class="ta" data-ta placeholder="Write your ${esc(v.genre.toLowerCase())} here. Leave a blank line between paragraphs.">${esc(T.text || '')}</textarea>`;
  h += `<div class="wstats"><span><span id="wcn" class="${w > v.max ? 'over' : ''}">${w}</span> words (aim for ${v.min}–${v.max})</span><span>Drafts save automatically on this device</span></div>`;
  h += `<fieldset class="checklist"><legend>Before you submit, tick each box once your writing does it</legend>${v.checklist.map((c, i) => `<label><input type="checkbox" id="chk-${k}-${i}" data-chk="${i}" ${T.checks[i] ? 'checked' : ''}> <span>${c}</span></label>`).join('')}</fieldset>`;
  h += `<div class="row"><button type="button" class="btn go" data-act="wsubmit">${T.submitted ? 'Resubmit for new feedback' : 'Submit for feedback'}</button></div>`;
  if (T.warn) h += `<p class="warn">${esc(T.warn)}</p>`;
  if (T.submitted && T.result) h += savedHTML() + teacherFeedbackHTML(v, T.result) + aiHTML(v);
  if (!T.submitted && v.model) h += `<div class="lockbox" role="note">🔒 <b>Model answer locked.</b> Write and submit your own attempt first. Then the model unlocks and you get a side-by-side comparison, your errors marked up, and a dial-down PEEL builder.</div>`;
  if (T.submitted) {
    h += v.model ? compareHTML(v, T.text || '') : '';
    if (v.key) h += `<details class="fold" open><summary>Marking key</summary><div class="html-body">${v.key}</div></details>`;
    if (v.teacherTip) h += `<div class="tip"><b>Teacher's tip:</b> ${v.teacherTip}</div>`;
    if (S.loc.v === 'screen' || S.loc.v === 'zc') {
      if (done) h += `<p class="done-note">Writing task complete. You can keep revising and resubmitting.</p>`;
      else h += `<div class="selfcheck"><p>Be honest: does your piece meet the task requirements?</p><div class="row"><button type="button" class="btn yes" data-act="self-yes">Yes, it does</button><button type="button" class="btn no" data-act="self-no">No, I need help</button></div></div>`;
    }
  }
  return h;
}
function teacherFeedbackHTML(v, R) {
  const ok = R.crit.filter(c => c.ok).length;
  const firstWeak = R.crit.find(c => !c.ok);
  let h = `<section class="tfb" aria-label="Teacher feedback"><h3>Teacher feedback <span class="pill ${ok === R.crit.length ? 'ok' : 'no'}">${ok} of ${R.crit.length} criteria evident</span></h3>`;
  h += `<p>${ok === R.crit.length ? `${S.name ? esc(S.name) + ', this' : 'This'} is a strong submission: I can see evidence of every criterion. Read the comments below to push it from good to excellent.` : ok >= R.crit.length / 2 ? `A solid start. You are meeting ${ok} of the ${R.crit.length} criteria. Focus your revision on the areas marked "Not yet".` : `You have made a start, but several key features of a ${esc(v.genre.toLowerCase())} are not yet showing. Work through the comments one at a time, then resubmit.`}</p>`;
  h += `<div class="crit">${R.crit.map(c => `<div class="critrow"><span class="pill ${c.ok ? 'ok' : 'no'}">${c.ok ? 'Evident' : 'Not yet'}</span><div><b>${esc(c.r.criterion)}</b> <span class="hint">(${c.r.marks} marks)</span><p>${c.ok ? c.r.strong : c.r.weak}</p>${c.extra ? `<p class="hint">${c.extra}</p>` : ''}</div></div>`).join('')}</div>`;
  h += `<div><h4>Your writing in numbers</h4><ul>${R.general.map(g => `<li>${g}</li>`).join('')}</ul></div>`;
  if (firstWeak) h += `<div class="fb note"><b>Your next step:</b> ${firstWeak.r.weak}</div>`;
  h += `<p class="hint">This feedback checks for the features your teacher looks for. It cannot judge everything, so use the model comparison below as well.</p></section>`;
  return h;
}
function aiHTML(v) {
  if (!SAMPLE) return '';
  if (T.aiState === 'idle') return `<div class="aibox"><h3>Want a full marking?</h3><p>The course marker can read your whole piece like a CAPE teacher, give a mark for each criterion and show you how to improve a sentence.</p><div class="row"><button type="button" class="btn gold" data-act="ai">Get detailed AI feedback</button></div></div>`;
  if (T.aiState === 'busy') return `<div class="aibox"><p><span class="spin"></span>Reading your work and marking it against the rubric… this can take up to a minute.</p><div class="row"><button type="button" class="btn ghost" data-act="aistop">Stop</button></div></div>`;
  if (T.aiState === 'error') return `<div class="aibox"><p class="warn">${esc(T.aiError)}</p><div class="row"><button type="button" class="btn ghost" data-act="ai">Try again</button></div></div>`;
  const a = T.ai || {};
  let h = `<section class="aibox" aria-label="AI feedback"><div class="row" style="justify-content:space-between"><h3>Detailed marking</h3><span class="score">${esc(a.total)}/${esc(a.outOf)}</span></div>`;
  if (a.band) h += `<p><span class="pill mark">${esc(a.band)}</span></p>`;
  if (a.summary) h += `<p>${esc(a.summary)}</p>`;
  if (Array.isArray(a.criteria)) h += `<div class="crit">${a.criteria.map(c => `<div class="critrow"><span class="pill mark">${esc(c.mark)}/${esc(c.outOf)}</span><div><b>${esc(c.criterion)}</b><p>${esc(c.comment)}</p></div></div>`).join('')}</div>`;
  if (Array.isArray(a.strengths) && a.strengths.length) h += `<div><h4>What you did well</h4><ul>${a.strengths.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  if (Array.isArray(a.nextSteps) && a.nextSteps.length) h += `<div><h4>How to improve</h4><ul>${a.nextSteps.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
  if (a.rewrite && a.rewrite.original) h += `<div><h4>One sentence, improved</h4><div class="compare"><div><span class="lbl">You wrote</span><p>${esc(a.rewrite.original)}</p></div><div><span class="lbl">Stronger version</span><p>${esc(a.rewrite.improved)}</p></div></div></div>`;
  h += `<p class="hint">AI marking is a guide to help you revise. Your teacher's mark is the one that counts.</p><div class="row"><button type="button" class="btn ghost" data-act="ai">Mark it again after revising</button></div></section>`;
  return h;
}
let aiCtl = null;
async function runAI(v) {
  if (!SAMPLE) return;
  T.aiState = 'busy'; renderStage();
  aiCtl = new AbortController();
  const outOf = v.rubric.reduce((a, r) => a + r.marks, 0);
  const prompt = `You are an experienced CAPE Communication Studies teacher in the Caribbean marking a student's work (students are 16-19). Be encouraging, honest and specific, quote the student's own words where useful, and mark fairly against the rubric. Use British/Caribbean spelling.

TASK GENRE: ${v.genre}
TASK: ${strip(v.prompt).slice(0, 2500)}
${v.stimulus ? 'STIMULUS (extract the student responded to): ' + strip(v.stimulus).slice(0, 4000) : ''}
RUBRIC (criterion: marks):
${v.rubric.map(r => '- ' + r.criterion + ': ' + r.marks).join('\n')}
TOTAL: ${outOf}

STUDENT RESPONSE:
"""
${(T.text || '').slice(0, 12000)}
"""

Reply with only a JSON object in this shape:
{"total": number, "outOf": ${outOf}, "band": "Excellent" | "Good" | "Satisfactory" | "Needs improvement", "summary": "2-3 sentences", "criteria": [{"criterion": "name from the rubric", "mark": number, "outOf": number, "comment": "2-3 specific sentences"}], "strengths": ["...", "..."], "nextSteps": ["...", "...", "..."], "rewrite": {"original": "one weak sentence copied exactly from the student", "improved": "your improved version"}}`;
  try {
    const a = await SAMPLE.json(prompt, { signal: aiCtl.signal, cache: false });
    if (!a || typeof a !== 'object') throw { code: 'invalid_json' };
    T.ai = a; T.aiState = 'done';
    const d = DRAFTS[skey()] || {}; d.ai = a; DRAFTS[skey()] = d; saveDrafts();
  } catch (e) {
    const code = e && e.code;
    if (code === 'cancelled') { T.aiState = 'idle'; }
    else if (code === 'not_granted' || code === 'sampling_disabled' || code === 'not_declared' || code === 'capability_disabled' || code === 'capability_removed') { SAMPLE = null; T.aiState = 'idle'; toast('AI feedback is not available here. Your teacher feedback is above.'); }
    else { T.aiState = 'error'; T.aiError = code === 'rate_limited' ? 'Too many requests right now. Wait a few minutes, then try again.' : code === 'invalid_json' ? 'The marking came back in an unexpected format. Try again.' : 'The marking could not be completed. Check your connection and try again.'; }
  }
  renderStage();
}

/* ---------------- test ---------------- */
function testHTML() {
  const m = mod(S.loc.m), t = m.test;
  if (!(S.teacher || OPEN_ALL || unitsDone(m) || S.loc.free)) return `<div class="card"><span class="kicker k-test">Module test</span><h2>${esc(t.title)}</h2><p class="fb note">🔒 The test unlocks when you finish every unit in ${esc(m.code)}.</p></div>`;
  let h = `<div class="card"><div class="card-top"><span class="kicker k-test">Paper 1 practice</span><span class="hint">${t.items.length} questions · pass mark ${t.pass || 70}%${S.tests[m.id] != null ? ' · your best ' + S.tests[m.id] + '%' : ''}</span></div><h2>${esc(t.title)}</h2>`;
  if (T.submitted) {
    const right = t.items.filter((it, i) => T.ans[i] === it.answer).length, pct = Math.round(right / t.items.length * 100);
    h += `<div class="fb ${pct >= (t.pass || 70) ? 'good' : 'bad'}"><b>You scored ${right}/${t.items.length} (${pct}%).</b> ${pct >= (t.pass || 70) ? 'You passed. Review any questions you missed below.' : 'Not a pass yet. Read each explanation, revisit the units you found hard, then retake the test.'}</div>`;
  } else h += `<p class="lead">Answer every question, then submit. You will see your score and a full explanation for each answer.</p>`;
  h += t.items.map((it, i) => {
    const a = T.ans[i], sub = T.submitted, cls = sub ? (a === it.answer ? 'right' : 'wrong') : '';
    return `<div class="titem ${cls}"><span class="qnum">Question ${i + 1}</span>${it.passage ? `<blockquote class="passage">${it.passage}</blockquote>` : ''}<p class="q">${it.q}</p><div class="opts">${it.options.map((o, oi) => {
      let c = a === oi ? 'sel' : ''; if (sub && oi === it.answer) c = 'right'; else if (sub && a === oi) c = 'wrong';
      return `<button type="button" class="opt ${c}" data-act="tans" data-i="${i}" data-o="${oi}" ${sub ? 'disabled' : ''} aria-pressed="${a === oi}"><span class="letter">${'ABCDE'[oi]}</span><span>${o}</span></button>`;
    }).join('')}</div>${sub ? `<div class="fb ${a === it.answer ? 'good' : 'bad'}"><b>${a === it.answer ? 'Correct.' : 'The answer is ' + 'ABCDE'[it.answer] + '.'}</b><div>${it.why}</div></div>` : ''}</div>`;
  }).join('');
  h += T.submitted ? `${savedHTML()}<div class="row"><button type="button" class="btn go" data-act="tretake">Retake the test</button><button type="button" class="btn ghost" data-go="paper2" data-m="${m.id}">Go to the exam essay →</button></div>` : `<div class="row"><button type="button" class="btn go" data-act="tsubmit">Submit my answers</button><span class="hint">${Object.keys(T.ans).length} of ${t.items.length} answered</span></div>`;
  if (T.warn) h += `<p class="warn">${esc(T.warn)}</p>`;
  return h + `</div>`;
}
function paper2HTML() {
  const m = mod(S.loc.m), v = m.paper2;
  if (!(S.teacher || OPEN_ALL || unitsDone(m) || S.loc.free)) return `<div class="card"><span class="kicker k-write">Exam essay</span><h2>${esc(v.title)}</h2><p class="fb note">🔒 The exam essay unlocks when you finish every unit in ${esc(m.code)}.</p></div>`;
  const raw = m.paper2, lvx = effLv(raw), vx = variant() || raw;
  return `<div class="card"><div class="card-top"><span class="kicker k-write">Paper 2 practice · ${esc(vx.genre)}</span><span class="tools"><button type="button" class="tool" data-act="tutor">Mini tutorial</button>${lvDialHTML(raw)}</span></div>${lvx !== 2 ? `<div class="easy-banner ${lvx === 3 ? 'up-banner' : ''}"><b>${LVI[lvx]} ${LVN[lvx]} version.</b> ${lvx === 1 ? 'Fewer parts and sentence starters.' : 'Extended Grade One version.'}</div>` : ''}<h2>${esc(vx.title)}</h2>${bloomChip(vx)}${writeHTML(vx, !!S.p2[m.id])}${S.p2[m.id] ? `<p class="done-note">Essay submitted. ${modComplete(m) ? esc(m.code) + ' complete!' : ''}</p>` : ''}</div>`;
}

/* ---------------- tools ---------------- */
const GL = window.COURSE_GLOSSARY || { cats: {}, refs: {}, terms: [] };
const GSEC = [['1', 'Module 1'], ['2', 'Module 2'], ['3', 'Module 3'], ['P', 'Paper 3'], ['V', 'Exam verbs'], ['S', 'Syllabus & assessment']];
const GSRC = { X: 'CXC glossary', A: 'Added', L: 'Lesson handout', C: 'Course' };
GL.terms.forEach(e => { e.L = (e.t.match(/[A-Za-z]/) || ['#'])[0].toUpperCase(); e.hay = (e.t + ' ' + e.d.join(' ') + ' ' + (e.ex || '') + ' ' + (e.fx || '')).toLowerCase(); });
function refLabel(r) {
  if (!r) return '';
  const name = GL.refs[r] || '';
  if (r.charAt(0) === 'S') return 'Syllabus overview' + (name ? ': ' + name : '');
  const x = r.split('-')[1] || '', md = { '1': 'Module 1', '2': 'Module 2', '3': 'Module 3' }[r.charAt(1)] || r;
  const lab = x === 'G' ? 'general objectives' : x.charAt(0) === 'A' ? 'activity ' + x.slice(1) : 'objective ' + x;
  return md + ', ' + lab + (name ? ' (' + name + ')' : '');
}
function glossFilter() {
  const G = T.g || (T.g = { q: '', sec: S.loc.gsec || '', cat: '', src: '', letter: '', limit: 120 });
  const q = G.q.trim().toLowerCase();
  return GL.terms.filter(e => (!q || e.hay.includes(q)) && (!G.sec || e.m.includes(G.sec) || (G.sec === 'P' && e.m.includes('S'))) && (!G.cat || e.c === G.cat) && (!G.src || e.s === G.src) && (!G.letter || e.L === G.letter));
}
function glossListHTML() {
  const G = T.g, list = glossFilter(), shown = list.slice(0, G.limit);
  const hl = t => { const q = G.q.trim(); if (!q) return esc(t); const i = t.toLowerCase().indexOf(q.toLowerCase()); return i < 0 ? esc(t) : esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + q.length)) + '</mark>' + esc(t.slice(i + q.length)); };
  let h = `<p class="hint" role="status">${list.length} term${list.length === 1 ? '' : 's'}${list.length > shown.length ? ', showing the first ' + shown.length : ''}</p><div class="gloss">`;
  h += shown.map(e => `<div class="gterm"><div class="row" style="justify-content:space-between;gap:6px"><b>${hl(e.t)}</b>${e.p ? ` <i class="hint">${esc(e.p)}</i>` : ''}<span class="gtags">${TTS.ok ? `<button type="button" class="tool listen" data-act="speak" data-t="${esc(e.t + '. ' + e.d.join(' '))}" aria-label="Read ${esc(e.t)} aloud">🔊</button>` : ''}${e.m.map(m => `<span class="gtag g${m}">${(GSEC.find(x => x[0] === m) || [m, m])[1]}</span>`).join('')}<span class="gtag gs">${GSRC[e.s] || ''}</span></span></div>
    ${e.d.map(d => `<p>${hl(d)}</p>`).join('')}
    ${e.ex ? `<p class="gex"><span class="lbl">Example</span> ${esc(e.ex)}</p>` : ''}${e.fx ? `<p class="gex"><span class="lbl">Effect</span> ${esc(e.fx)}</p>` : ''}
    ${e.see ? `<p class="hint">See <button type="button" class="linkbtn" data-act="gsee" data-t="${esc(e.see)}">${esc(e.see)}</button></p>` : ''}
    ${e.r && e.r.length ? `<p class="hint">Syllabus link: ${e.r.map(refLabel).map(esc).join('; ')}</p>` : ''}${e.c && GL.cats[e.c] ? `<p class="hint">Topic: ${esc(GL.cats[e.c])}</p>` : ''}</div>`).join('');
  h += `</div>`;
  if (list.length > shown.length) h += `<div class="row"><button type="button" class="btn ghost" data-act="gmore">Show ${Math.min(120, list.length - shown.length)} more</button></div>`;
  return h;
}
function glossaryHTML() {
  if (!T.g) T.g = { q: '', sec: S.loc.gsec || '', cat: '', src: '', letter: '', limit: 120 };
  const G = T.g, letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), have = new Set(GL.terms.map(e => e.L));
  let h = `<div class="card"><span class="kicker">Tools</span><h2>CAPE Communication Studies Glossary</h2>
    <p class="lead">${GL.terms.length} terms: the syllabus glossary and examination verbs, added literary, language, grammar, communication, research and assessment terms linked to the syllabus objectives, and the Organizational Strategies and Literary Techniques lesson handouts.</p>
    <label for="gq" class="sr">Search terms and definitions</label><input id="gq" class="search" data-gq type="search" placeholder="Search terms and definitions" value="${esc(G.q)}" autocomplete="off">
    <div class="chips" role="group" aria-label="Filter by section"><button type="button" class="chip ${!G.sec ? 'sel' : ''}" data-act="gsec" data-k="">All</button>${GSEC.map(([k, n]) => `<button type="button" class="chip ${G.sec === k ? 'sel' : ''}" data-act="gsec" data-k="${k}" aria-pressed="${G.sec === k}">${n}</button>`).join('')}</div>
    <div class="row"><label class="hint">Topic <select data-gsel="cat" class="gselect"><option value="">All topics</option>${Object.entries(GL.cats).map(([k, n]) => `<option value="${k}" ${G.cat === k ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
    <label class="hint">Source <select data-gsel="src" class="gselect"><option value="">All sources</option>${Object.entries(GSRC).map(([k, n]) => `<option value="${k}" ${G.src === k ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
    <button type="button" class="tool" data-act="greset">Reset</button></div>
    <div class="chips az" role="group" aria-label="Letters A to Z"><button type="button" class="chip ${!G.letter ? 'sel' : ''}" data-act="glet" data-l="">All</button>${letters.map(l => `<button type="button" class="chip ${G.letter === l ? 'sel' : ''}" data-act="glet" data-l="${l}" ${have.has(l) ? '' : 'disabled'}>${l}</button>`).join('')}</div></div>`;
  h += `<div class="card" id="glist">${glossListHTML()}</div>`;
  h += `<div class="card"><h3>About this glossary</h3><p class="hint">Entries tagged “CXC glossary” use the syllabus wording (CXC A2/U1/24, Western Zone Office, 26 August 2024). Entries tagged “Added” are supplementary definitions written to support the syllabus objectives named on each entry; they are not CXC text. Entries tagged “Lesson handout” come from the Organizational Strategies and Literary Techniques lesson materials. Entries tagged “Course” come from this course's units.</p>
    <p class="hint">Sources for meanings in the syllabus glossary: Allsopp, R., <i>Dictionary of Caribbean English</i> (OUP, 1996); Devonish, H., <i>Language and Liberation</i> (2nd ed., Arawak, 2007); <i>Merriam Webster's Collegiate Dictionary</i> (10th ed., 1996); Tubbs, S. L. and Moss, S., <i>Human Communication</i> (10th ed., McGraw Hill, 2007); Young, C., <i>Language and education in Belize</i> (Angelus Press, 2002).</p></div>`;
  return h;
}
function toolkitHTML() {
  return `<div class="card"><span class="kicker">Tools</span><h2>Exam toolkit</h2><p class="lead">Keep this page open while you write. Everything here comes from how your essays are marked.</p></div>
  <div class="card"><h3>How every module essay is marked: 25 marks</h3><div class="tablewrap"><table><thead><tr><th>Area</th><th>Marks</th><th>What it covers</th></tr></thead><tbody>
    <tr><td><b>Content</b></td><td>10</td><td>Main point, purpose, devices, strategies, source evaluation, evidence. Answer exactly what is asked.</td></tr>
    <tr><td><b>Organization</b></td><td>7</td><td>Thesis, sequencing, paragraphing, transitions, conclusion.</td></tr>
    <tr><td><b>Expression</b></td><td>8</td><td>Standard English, word choice, sentence construction, grammar.</td></tr></tbody></table></div>
    <p class="tip"><b>Word limits:</b> Module 1 and Module 2 essays, maximum 500 words. Module 3 responses, maximum 300 words. Going over wastes time; going under signals underdeveloped ideas.</p></div>
  <div class="card"><h3>PEEL: how a device earns marks</h3><div class="trio"><div class="tcard"><span class="lbl">P · E</span><p><b>Point:</b> name the technique. <b>Evidence:</b> quote it exactly from the passage.</p></div><div class="tcard"><span class="lbl">E</span><p><b>Explanation:</b> what the technique is <i>doing</i>, not just what it means.</p></div><div class="tcard"><span class="lbl">L</span><p><b>Link:</b> connect it back to the author's purpose.</p></div></div><p>If any part of the chain is missing, that point earns zero. Ask yourself: "I found it. Now how do I earn the mark?"</p></div>
  <div class="card"><h3>Building the essay</h3><ol><li><b>Thesis</b>: your roadmap. Body paragraphs follow the same order.</li><li><b>Introduction</b>: context → main point → author's purpose → thesis.</li><li><b>Body paragraphs</b>: PEEL, with transitions between and within paragraphs.</li><li><b>Conclusion</b>: no new analysis, and shorter than your introduction.</li></ol><p><b>Routine for every passage:</b> Read → Identify the marks → Annotate → Plan → Write.</p></div>
  <div class="card"><h3>Paper 3 (Paper 032) at a glance</h3><ul><li>Three compulsory questions covering the three modules, all based on a central stimulus. 60 marks, 20% of your final grade. Marks are awarded for content, organisation and expression.</li><li><b>Section A (20 marks):</b> Question 1 (Module 1) and Question 2 (Module 2), short structured answers on the stimulus.</li><li><b>Section B (40 marks):</b> a reflective or expository piece of 200–250 words (25 marks) and a 50–100 word justification of purpose, intended audience and context of communication (15 marks).</li><li>Creative (poetry, drama, prose fiction) or expository (journalistic piece, journal entry, essay).</li><li>One 4 × 6 inch cue card with no more than 10 points related to your topic. Nothing else is allowed.</li></ul>
  <div class="tablewrap"><table><thead><tr><th>Year</th><th>Topic</th><th>Intended audience</th></tr></thead><tbody>
  <tr><td>2025</td><td>Climate change</td><td>Teenagers</td></tr><tr><td>2026</td><td>Natural disasters</td><td>Homeowners</td></tr><tr><td>2027</td><td>Non-communicable diseases in children</td><td>Parents</td></tr><tr><td>2028</td><td>Single parenthood</td><td>Teenagers</td></tr><tr><td>2029</td><td>Mental health challenges</td><td>Community groups</td></tr><tr><td>2030</td><td>Cyberbullying</td><td>Parents</td></tr><tr><td>2031</td><td>The increase in street children</td><td>Ministry of Youth</td></tr><tr><td>2032</td><td>Autism</td><td>Teachers</td></tr><tr><td>2033</td><td>The challenges of having acne</td><td>Teenagers</td></tr></tbody></table></div>
  <p class="hint">Source: CAPE Communication Studies syllabus (revised 2024), regulations for Paper 032.</p></div>
  <div class="card"><h3>The exam papers</h3><div class="tablewrap"><table><thead><tr><th>Paper</th><th>What it is</th><th>Weighting</th></tr></thead><tbody>
    <tr><td><b>Paper 01</b> (1 hour 30 minutes)</td><td>Multiple-choice items covering all three modules equally.</td><td>30%</td></tr>
    <tr><td><b>Paper 02</b> (2 hours 30 minutes)</td><td>Three compulsory essays, one per module, each marked out of 25 (Content 10, Organization 7, Expression 8). Modules 1 and 2: no more than 500 words. Module 3: no more than 300 words.</td><td>50%</td></tr>
    <tr><td><b>Paper 032</b></td><td>The Paper 3 written paper (2 hours 15 minutes, 60 marks): three compulsory questions on a central stimulus.</td><td>20%</td></tr></tbody></table></div></div>
  <div class="card"><h3>Command words: what the question is really asking</h3><div class="tablewrap"><table><thead><tr><th>Word</th><th>What to do</th></tr></thead><tbody>
    <tr><td><b>Analyse</b></td><td>Examine the structure methodically and interpret it, for example dialectal varieties, attitudes to language, authorial tone.</td></tr>
    <tr><td><b>Comment</b></td><td>Give your view or reaction, usually on how effective a device is.</td></tr>
    <tr><td><b>Compose</b></td><td>Make up or create, for example questionnaire items.</td></tr>
    <tr><td><b>Compare and contrast</b></td><td>Compare = similarities; contrast = differences. Do both.</td></tr>
    <tr><td><b>Define</b></td><td>State the precise meaning, often with an illustration.</td></tr>
    <tr><td><b>Describe</b></td><td>Give an account including significant characteristics.</td></tr>
    <tr><td><b>Discuss</b></td><td>An extended answer exploring related ideas with detailed examples; a conclusion is not required.</td></tr>
    <tr><td><b>Explain</b></td><td>Make an idea clear by giving more detail or information.</td></tr>
    <tr><td><b>Evaluate</b></td><td>Judge the value of material, usually information and its sources, for a purpose.</td></tr>
    <tr><td><b>Give / State</b></td><td>Short, concise answers, for example the main point in no more than 30 words.</td></tr>
    <tr><td><b>Identify</b></td><td>Pick out the relevant information without explanation.</td></tr>
    <tr><td><b>Justify</b></td><td>Give the reason for your choice or response.</td></tr>
    <tr><td><b>Suggest</b></td><td>Put forward ideas, for example non-verbal cues to use.</td></tr></tbody></table></div>
    <p class="hint">Adapted from the glossary of behavioural verbs in the CAPE Communication Studies syllabus (revised 2024).</p></div>
  <div class="card"><h3>Self-check before you hand in</h3><ul><li>Is my main point a complete idea, not just a topic?</li><li>Is my purpose statement accurate and complete?</li><li>Have I quoted my evidence exactly?</li><li>Have I explained how the device or strategy works, not just named it?</li><li>Have I linked every point back to the author's purpose?</li><li>Does my body follow my thesis in the same order?</li><li>Is my conclusion shorter than my introduction?</li><li>Am I within the word count, with every sentence earning its place?</li><li>Is this Standard English? Have I checked grammar, tense and spelling?</li><li>Am I keeping my glossary and reflective journal up to date?</li></ul></div>
  <div class="card"><h3>Your reflective journal and personal glossary</h3><div class="trio"><div class="tcard"><span class="lbl">Journal</span><p>What I found difficult · what I understood · what mistake I made and how I corrected it.</p></div><div class="tcard"><span class="lbl">Glossary</span><p>Word → meaning → synonym → a correct sentence of my own.</p></div><div class="tcard"><span class="lbl">Pair teaching</span><p>What evidence supports your answer? Is that the complete main point? Does your thesis include everything the question requires?</p></div></div><p class="tip"><b>Exam tip:</b> examiners often change one or two words in a question. Read every question carefully, and go with the syllabus and mark scheme over any textbook.</p></div>`;
}
function resourcesHTML() {
  let h = `<div class="card"><span class="kicker">Tools</span><h2>Video library</h2><p class="lead">Each link opens YouTube results for that exact topic in a new tab. Watch one or two short videos, then come back and try the activity.</p></div>`;
  MODS.forEach(m => { h += `<div class="card"><h3 class="modname">${esc(m.code)}: ${esc(m.title)}</h3>${m.units.map((u, ui) => `<div><h4>Unit ${ui + 1}: ${esc(u.title)}</h4>${vidsHTML(u.videos)}</div>`).join('')}</div>`; });
  return h;
}
function reportHTML() {
  const t = totals();
  let h = `<div class="card"><span class="kicker">My progress</span><h2>${S.name ? esc(S.name) + "'s progress" : 'Your progress'}</h2><p>${t.pct}% of the course complete · ${S.xp} XP${SCORM.api ? ' · progress is being saved to your learning platform' : ''}</p><div class="pbar"><i style="width:${t.pct}%"></i></div>
    <div class="tablewrap"><table><thead><tr><th>Module</th><th>Level</th><th>Units</th><th>Test (best)</th><th>Exam essay</th></tr></thead><tbody>${MODS.map(m => `<tr><td><b>${esc(m.code)}</b> ${esc(m.title)}</td><td>${LVI[secLvOf(m.id)]} ${LVN[secLvOf(m.id)]}</td><td>${m.units.filter(unitDone).length}/${m.units.length}</td><td>${S.tests[m.id] != null ? S.tests[m.id] + '%' + (testPassed(m) ? ' ✓' : '') : '—'}</td><td>${S.p2[m.id] ? 'Submitted ✓' : '—'}</td></tr>`).join('')}</tbody></table></div></div>`;
  h += `<div class="card"><h3>Credentials</h3><p>${MODS.filter(realModDone).length} of ${MODS.length} micro-credentials earned${realCourseDone() ? ' · Certificate of Achievement unlocked 🎓' : ''}.</p><div class="row"><button type="button" class="btn gold" data-go="creds">Open my credentials</button></div></div>`;
  return h;
}


/* ---------------- read aloud (text to speech) ---------------- */
const TTS = { ok: typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined', on: false, rate: 1 };
function listenBtn(label) { return TTS.ok ? `<button type="button" class="tool listen" data-act="speak" aria-label="Read this aloud">${TTS.on ? '■ Stop' : '🔊 ' + (label || 'Listen')}</button>` : ''; }
function pickVoice() {
  try {
    const vs = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang || '')); if (!vs.length) return null;
    let want = null; try { want = localStorage.getItem('course.voice'); } catch (e) { }
    if (want) { const w = vs.find(v => v.name === want); if (w) return w; }
    const score = v => { const n = v.name || '', l = (v.lang || '').replace('_', '-'); let k = 0; if (/natural|neural|online|premium|enhanced|wavenet|studio/i.test(n)) k += 50; if (/google/i.test(n)) k += 20; if (/siri|samantha|daniel|serena|karen|moira|tessa|libby|sonia|ryan|aria|jenny|guy|emma|brian|ava|andrew/i.test(n)) k += 15; if (/en-(TT|JM|BB|GB)/i.test(l)) k += 10; else if (/en-(US|CA|AU|IE|ZA|NZ)/i.test(l)) k += 5; if (/compact|espeak|zarvox|bad news|bells|bubbles|cellos|good news|jester|organ|trinoids|boing|deranged|hysterical|superstar|whisper|albert|fred|junior|ralph/i.test(n)) k -= 100; return k; };
    return vs.slice().sort((a, b) => score(b) - score(a))[0];
  } catch (e) { }
  return null;
}
function textOf(el) {
  const c = el.cloneNode(true);
  c.querySelectorAll('.card-top,.tools,.nav,textarea,input,select,.selfcheck,.row,script,style,svg,.sr,details:not([open])').forEach(n => n.remove());
  return (c.textContent || '').replace(/\s+/g, ' ').trim();
}
function speak(text) {
  if (!TTS.ok) { toast('Read aloud is not supported in this browser.'); return; }
  stopSpeak();
  const chunks = (text.match(/[^.!?;:]+[.!?;:]*\s*/g) || [text]).reduce((a, c) => { if (a.length && (a[a.length - 1] + c).length < 220) a[a.length - 1] += c; else a.push(c); return a; }, []);
  const voice = pickVoice();
  TTS.on = true; refreshListen();
  chunks.forEach((c, i) => {
    const u = new SpeechSynthesisUtterance(c.trim()); u.rate = TTS.rate; if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-GB';
    if (i === chunks.length - 1) u.onend = () => { TTS.on = false; refreshListen(); };
    u.onerror = () => { TTS.on = false; refreshListen(); };
    speechSynthesis.speak(u);
  });
}
function stopSpeak() { if (typeof curAudio !== 'undefined' && curAudio) { try { curAudio.pause(); } catch (e) { } curAudio = null; } if (TTS.ok) { try { speechSynthesis.cancel(); } catch (e) { } } TTS.on = false; refreshListen(); }
function refreshListen() { document.querySelectorAll('[data-act="speak"]').forEach(b => { if (b.dataset.l) b.textContent = TTS.on ? '■ Stop' : b.dataset.l; else if (!b.dataset.t) b.textContent = TTS.on ? '■ Stop' : '🔊 Listen'; }); const r = $('#ttsRate'); if (r) r.textContent = TTS.rate + '×'; }
if (TTS.ok) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => { }; } catch (e) { } }

/* ---------------- illustrations ---------------- */
function figHTML(id) {
  const im = IMAGES[id]; if (!im || !im.svg) return '';
  return `<figure class="fig">${im.svg.replace('<svg', `<svg aria-label="${esc(im.alt || '')}"`)}${im.caption ? `<figcaption>${esc(im.caption)}</figcaption>` : ''}</figure>`;
}

/* ---------------- assessments (always open) ---------------- */
const PKIND = { p1: 'Paper 01', p2: 'Paper 02', p032: 'Paper 032' };
function paperStatus(P) {
  S.pscore = S.pscore || {}; S.pdone = S.pdone || {};
  if (P.kind === 'p1') return S.pscore[P.id] != null ? 'best ' + S.pscore[P.id] + '%' : P.items.length + ' items';
  const n = P.questions.filter((_, i) => S.pdone['pp-' + P.id + '-' + i]).length;
  return n + ' of ' + P.questions.length + ' answered';
}
function assessHTML() {
  const by = k => PAPERS.filter(p => p.kind === k);
  const card = P => `<button type="button" class="lrow" data-go="paper" data-p="${P.id}"><span class="t"><b>${esc(P.title)}</b><br><span class="hint">${P.time ? Math.floor(P.time / 60) + ' h ' + (P.time % 60 ? (P.time % 60) + ' min' : '') : ''}</span></span><span class="s">${paperStatus(P)}</span></button>`;
  let h = `<div class="card"><span class="kicker k-test">Assessments · always open</span><h1>Past-paper practice</h1>
    ${PLUGS.qc ? `<div class="row" style="margin:0 0 10px"><button type="button" class="btn gold" data-go="qc">📝 Open the Quiz Centre: every quiz, test and paper</button></div>` : ''}
    <p class="lead">Skip straight to exam practice at any time. Nothing here needs to be unlocked. Every paper follows the 2024 CAPE Communication Studies specimen format and comes with a full marking key, model answers and feedback.</p>
    ${figHTML('P3U1')}</div>`;
  h += `<div class="card"><h3>Paper 01 · Multiple choice</h3><p class="hint">45 items, 15 per module, 1 hour 30 minutes. Optional timer. Answer key with explanations after you submit.</p><div class="list">${by('p1').filter(p => !p.past).map(card).join('')}
    ${MODS.map(m => `<button type="button" class="lrow" data-go="ptest" data-m="${m.id}"><span class="t"><b>${esc(m.test.title || m.code + ' test')}</b><br><span class="hint">${m.test.items.length} items · ${esc(m.code)} only</span></span><span class="s">${S.tests[m.id] != null ? 'best ' + S.tests[m.id] + '%' : ''}</span></button>`).join('')}</div></div>`;
  { const pp1 = by('p1').filter(p => p.past).sort((a, b) => (b.year || 0) - (a.year || 0)); if (pp1.length) h += `<div class="card"><h3>Real past papers · Paper 01</h3><p class="hint">${pp1.length} CXC Paper 01 examinations with the extracts, cartoons and adverts as printed. Items 1–7 play the Examiner's Script recording where one exists. © Caribbean Examinations Council.</p><div class="list">${pp1.map(card).join('')}</div></div>`; }
  h += `<div class="card"><h3>Paper 02 · Essays</h3><p class="hint">Three essays, one per module, each marked out of 25 (Content 10, Organization 7, Expression 8). Modules 1 and 2: no more than 500 words. Module 3: no more than 300 words.</p><div class="list">${by('p2').filter(p => !p.past).map(card).join('')}
    ${MODS.filter(m => m.id !== 'P3').map(m => `<button type="button" class="lrow" data-go="paper2" data-m="${m.id}" data-free="1"><span class="t"><b>${esc(m.code)} exam essay</b><br><span class="hint">${esc(m.paper2.title || '')}</span></span><span class="s">${S.p2[m.id] ? 'submitted' : ''}</span></button>`).join('')}</div></div>`;
  const past = by('p2').filter(p => p.past).sort((a, b) => a.year - b.year || a.id.localeCompare(b.id));
  if (past.length) h += `<div class="card"><h3>Real past papers · Paper 02 (${past[0].year}–${past[past.length - 1].year})</h3><p class="hint">${past.length} real CAPE Paper 02 examinations, ${past.length * 3} questions. Each question has the original extract, a "Dial it down" helper for main idea and author's purpose, a marking guide and a model answer.</p><div class="list">${past.map(card).join('')}</div></div>`;
  const scripts = [2015, 2016, 2017, 2018, 2019].filter(y => AUD['examiner-script-' + y]);
  if (scripts.length) h += `<div class="card"><h3>Examiner's Scripts</h3><p class="hint">Listen as you would in the examination: the first time for the main idea and the speaker's purpose, the second time to take notes on details, tone and techniques.</p>${scripts.map(y => `<div class="escript"><b>Examiner's Script ${y}</b><audio controls preload="none" src="${AUD['examiner-script-' + y]}" style="width:100%;margin-top:6px"></audio></div>`).join('')}</div>`;
  h += `<div class="card"><h3>Paper 032</h3><p class="hint">Section A (20 marks): short answers on a central stimulus. Section B (40 marks): a 200–250 word reflective or expository piece plus a 50–100 word justification.</p><div class="list">${by('p032').map(card).join('')}
    ${PLUGS.x032 ? `<button type="button" class="lrow" data-go="x032"><span class="t"><b>🏅 Paper 032 exemplars · marked out of 20</b><br><span class="hint">Grade One model responses for every question, 2016–2025, built from the examiners' subject reports</span></span><span class="s"></span></button>` : ''}
    ${PLUGS.ww ? `<button type="button" class="lrow" data-go="ww"><span class="t"><b>🖋️ Essay Writing Workshop</b><br><span class="hint">Prewriting, research, thesis statements, hooks, topic sentences, transitions, conclusions and the four genres, with step-by-step sample builds</span></span><span class="s"></span></button>` : ''}
    ${PLUGS.genres ? `<button type="button" class="lrow" data-go="genres"><span class="t"><b>✍️ Sample essays · Modules 1–3 and Paper 3</b><br><span class="hint">Grade One Paper 02 essays, genre essays and Paper 032 Section B pieces, annotated and marked</span></span><span class="s"></span></button>` : ''}
    ${mod('P3') ? `<button type="button" class="lrow" data-go="paper2" data-m="P3" data-free="1"><span class="t"><b>Paper 3 unit practice: Section B</b><br><span class="hint">${esc(mod('P3').paper2.title || '')}</span></span><span class="s">${S.p2.P3 ? 'submitted' : ''}</span></button>` : ''}</div></div>`;
  const QTI = window.COURSE_QTI || [];
  if (S.teacher && QTI.length) h += `<div class="card" style="border:2px dashed var(--gold)"><span class="kicker k-test">Teacher version only</span><h3>Teacher downloads · QTI quiz packages</h3><p class="hint">Import these into Canvas, Schoology, Brightspace (D2L), Blackboard or any LMS that accepts IMS QTI 1.2. Multiple-choice, matching and multiple-answer items are auto-marked with answer keys and feedback. Essay questions carry their marks, with the marking guide and model or exemplar answer as feedback. Each package holds several quizzes. Students never see this panel.</p><div class="list">${QTI.map((f, i) => `<button type="button" class="lrow" data-gx="qtidl" data-i="${i}"><span class="t"><b>⬇️ ${esc(f.title)}</b><br><span class="hint">${f.quizzes.length} quiz${f.quizzes.length === 1 ? '' : 'zes'} · ${f.quizzes.reduce((a, q) => a + q.items, 0)} items · ${Math.max(1, Math.round(f.size / 1024))} KB</span></span><span class="s">${esc(f.name)}</span></button>`).join('')}</div><details style="margin-top:10px"><summary><b>How to import</b></summary><div class="html-body"><ul><li><b>Canvas:</b> Course Settings → Import Course Content → Content type "QTI .zip file" → choose the file → Import. Quizzes appear under Quizzes; publish each one.</li><li><b>Schoology:</b> Resources → Import → QTI. <b>Brightspace:</b> Quizzes → Question Library → Import → Upload a file. <b>Blackboard:</b> Course Tools → Tests, Surveys and Pools → Pools → Import QTI 1.2 Package.</li><li><b>Moodle:</b> needs the free "IMS QTI" question-import plugin. <b>Google Classroom and Microsoft Teams</b> cannot import QTI; use the course itself or Forms for those classes.</li><li>Essay items are marked by hand in the LMS. The feedback (marking guide and model answer) shows to students after they submit, so hide feedback in the quiz settings if you want to release it later.</li></ul></div></details></div>`;
  h += `<div class="card"><h3>About the specimen papers</h3><p class="hint">${by('p2').some(p => p.past) ? 'Apart from the real past papers above, these' : 'These'} are specimen-style papers written for this course: they follow the official 2024 format, command words and mark allocations exactly, with original passages and scenarios. The official CXC specimen papers and mark schemes are copyright of the Caribbean Examinations Council; your teacher can share them with you, or you can find them through <a href="https://www.cxc.org/" target="_blank" rel="noopener">cxc.org</a>.</p></div>`;
  return h;
}
function timerHTML(P) {
  if (!P.time) return '';
  if (!T.timerEnd) return `<button type="button" class="tool" data-act="tstart">⏱ Start ${P.time}-minute timer</button>`;
  return `<span class="timer" id="timer" aria-live="off"></span><button type="button" class="tool" data-act="tstop">Stop timer</button>`;
}
let timerInt = null;
function tickTimer() {
  const el = $('#timer'); if (!el || !T.timerEnd) return;
  const left = Math.max(0, T.timerEnd - Date.now()), m = Math.floor(left / 60000), sec = Math.floor(left % 60000 / 1000);
  el.textContent = `${m}:${String(sec).padStart(2, '0')} left`; el.classList.toggle('low', left < 10 * 60000);
  if (!left) { clearInterval(timerInt); timerInt = null; toast('Time is up. Finish your sentence and submit.'); }
}
function paperHTML() {
  const P = paper(S.loc.p); if (!P) return `<div class="card"><p>Paper not found.</p></div>`;
  let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="assess">← All assessments</button><span>${PKIND[P.kind]}</span></div>`;
  h += `<div class="card"><div class="card-top"><span class="kicker k-test">${PKIND[P.kind]} · ${P.past ? 'real past paper' : 'specimen style'}</span><span class="tools">${listenBtn('Listen to instructions')}${timerHTML(P)}</span></div><h2>${esc(P.title)}</h2><div class="html-body">${P.intro}</div></div>`;
  if (P.kind === 'p1') {
    const sub = T.submitted;
    if (sub) {
      const right = P.items.filter((it, i) => T.ans[i] === it.answer).length, pct = Math.round(right / P.items.length * 100);
      const bym = ['1', '2', '3'].map(m => { const its = P.items.map((it, i) => [it, i]).filter(([it]) => String(it.module) === m); return `<td>${its.filter(([it, i]) => T.ans[i] === it.answer).length}/${its.length}</td>`; }).join('');
      h += `<div class="card"><div class="fb ${pct >= 70 ? 'good' : 'bad'}"><b>You scored ${right}/${P.items.length} (${pct}%).</b> Read the key explanation under every item you missed.</div>${savedHTML()}<div class="tablewrap"><table><thead><tr><th>Module 1</th><th>Module 2</th><th>Module 3</th></tr></thead><tbody><tr>${bym}</tr></tbody></table></div><div class="row"><button type="button" class="btn go" data-act="tretake">Try the paper again</button><button type="button" class="btn ghost" data-act="pkey">${T.showKey ? 'Hide' : 'Show'} answer grid</button></div></div>`;
    } else h += `<div class="card"><div class="row"><span class="hint">${Object.keys(T.ans).length} of ${P.items.length} answered</span><button type="button" class="btn ghost" data-act="pkey">${T.showKey ? 'Hide' : 'Show'} marking key</button></div></div>`;
    if (T.showKey) h += `<div class="card"><h3>Marking key</h3><div class="keygrid">${P.items.map((it, i) => `<span><b>${i + 1}</b> ${'ABCD'[it.answer]}</span>`).join('')}</div></div>`;
    let lastPassage = null, mod_ = null;
    h += `<div class="card">` + P.items.map((it, i) => {
      let pre = '';
      if (String(it.module) !== mod_) { mod_ = String(it.module); pre += `<h3>Module ${mod_}</h3>`; }
      if (it.passage && it.passage !== lastPassage) { pre += `<blockquote class="passage">${it.passage}</blockquote>`; }
      lastPassage = it.passage || null;
      const a = T.ans[i], cls = sub ? (a === it.answer ? 'right' : 'wrong') : '';
      return pre + `<div class="titem ${cls}"><span class="qnum">${i + 1}.</span><p class="q">${it.q}</p><div class="opts">${it.options.map((o, oi) => { let c = a === oi ? 'sel' : ''; if (sub && oi === it.answer) c = 'right'; else if (sub && a === oi) c = 'wrong'; return `<button type="button" class="opt ${c}" data-act="tans" data-i="${i}" data-o="${oi}" ${sub ? 'disabled' : ''}><span class="letter">${'ABCD'[oi]}</span><span>${o}</span></button>`; }).join('')}</div>${sub ? `<div class="fb ${a === it.answer ? 'good' : 'bad'}"><b>${a === it.answer ? 'Correct.' : 'Key: ' + 'ABCD'[it.answer] + '.'}</b><div>${it.why}</div></div>` : ''}</div>`;
    }).join('') + `</div>`;
    if (!sub) h += `<div class="nav"><span class="hint">${Object.keys(T.ans).length} of ${P.items.length} answered</span><button type="button" class="btn go" data-act="psubmit">Submit and see the key</button></div>`;
    if (T.warn) h += `<p class="warn">${esc(T.warn)}</p>`;
    return h;
  }
  if (P.stimulus) h += `<div class="card"><div class="card-top"><h3>Central stimulus</h3><span class="tools">${listenBtn()}</span></div><div class="passage">${P.stimulus}</div></div>`;
  let sec = null;
  h += `<div class="card"><h3>Questions</h3><div class="list">` + P.questions.map((q, i) => {
    let pre = '';
    if (q.section && q.section !== sec) { sec = q.section; pre = `<div class="slabel">Section ${esc(sec)}</div>`; }
    const done = S.pdone && S.pdone['pp-' + P.id + '-' + i];
    return pre + `<button type="button" class="lrow" data-go="pq" data-p="${P.id}" data-q="${i}">${ico(done ? 'done' : 'open')}<span class="t"><b>${esc(q.title)}</b>${q.marks ? ' · ' + q.marks + ' marks' : q.rubric ? ' · ' + q.rubric.reduce((a, r) => a + r.marks, 0) + ' marks' : ''}<br><span class="hint">${esc(strip(q.prompt).slice(0, 140))}${strip(q.prompt).length > 140 ? '…' : ''}</span></span><span class="s">${done ? 'submitted' : ''}</span></button>`;
  }).join('') + `</div></div>`;
  return h;
}
function pqHTML() {
  const P = paper(S.loc.p), v = variant(); if (!P || !v) return `<div class="card"><p>Question not found.</p></div>`;
  const i = S.loc.q, n = P.questions.length;
  let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="paper" data-p="${P.id}">← ${esc(P.title)}</button><span>Question ${i + 1} of ${n}</span></div>`;
  if (v.dial) h += `<details class="card dial"><summary><b>Dial it down</b> · ${v.module === '1' ? 'main idea and author\'s purpose, step by step' : 'clues and a step-by-step approach'}</summary><div class="html-body">${v.dial}</div></details>`;
  h += `<article class="card"><div class="card-top"><span class="kicker k-write">${PKIND[P.kind]}${v.section ? ' · Section ' + esc(v.section) : ''}${v.marks ? ' · ' + v.marks + ' marks' : ''}</span><span class="tools">${listenBtn()}<button type="button" class="tool" data-act="tutor">Mini tutorial</button>${lvDialHTML(pq())}</span></div>${effLv(pq()) !== 2 ? `<div class="easy-banner ${effLv(pq()) === 3 ? 'up-banner' : ''}"><b>${LVI[effLv(pq())]} ${LVN[effLv(pq())]} version</b> of this question. Dial back to ⚙️ Core for the exam-standard wording.</div>` : ''}<h2>${esc(v.title)}</h2>${writeHTML(v, false)}</article>`;
  h += `<div class="nav">${i > 0 ? `<button type="button" class="btn ghost" data-go="pq" data-p="${P.id}" data-q="${i - 1}">← Previous question</button>` : '<span></span>'}${i < n - 1 ? `<button type="button" class="btn go" data-go="pq" data-p="${P.id}" data-q="${i + 1}">Next question →</button>` : `<button type="button" class="btn go" data-go="paper" data-p="${P.id}">Back to the paper</button>`}</div>`;
  return h;
}


/* =====================================================================
   WORLD, PLAYER CARD AND REWARDS
   Classical conditioning: the same bright two-note chime + gold glow is
   paired with every success, so the cue itself becomes motivating.
   Operant conditioning: coins for effort (continuous reinforcement),
   streak bonuses (fixed ratio), surprise chests (variable ratio) and a
   daily chest (fixed interval). Coins buy games, themes and avatars.
   ===================================================================== */
const SKINS = [
  { id: 'navy', name: 'Navy & Gold', price: 0, bg: 'linear-gradient(160deg,#0B1A46,#060D26)', fg: '#F5C542', fx: 'stars' },
  { id: 'daylight', name: 'Daylight', price: 0, bg: 'linear-gradient(160deg,#FFFFFF,#DCE3F3)', fg: '#0E1F55', fx: 'dots', light: 1 },
  { id: 'space', name: 'Deep Space', price: 60, bg: 'linear-gradient(160deg,#1A0E3D,#05030F)', fg: '#FFD766', fx: 'galaxy' },
  { id: 'sea', name: 'Caribbean Sea', price: 80, bg: 'linear-gradient(160deg,#064452,#02212B)', fg: '#FFC857', fx: 'bubbles' },
  { id: 'emerald', name: 'Emerald Isle', price: 80, bg: 'linear-gradient(160deg,#0A3B29,#031A12)', fg: '#F5C542', fx: 'fireflies' },
  { id: 'carnival', name: 'Carnival Night', price: 120, bg: 'linear-gradient(160deg,#4A0B4F,#1A0524)', fg: '#FFD45A', fx: 'confetti' }
];
const AVATARS = [
  { id: 'parrot', e: '🦜', name: 'Parrot', bg: '#1E5BB8', price: 0 }, { id: 'turtle', e: '🐢', name: 'Turtle', bg: '#14805E', price: 0 },
  { id: 'dolphin', e: '🐬', name: 'Dolphin', bg: '#0F6E99', price: 0 }, { id: 'owl', e: '🦉', name: 'Owl', bg: '#6B4A1E', price: 0 },
  { id: 'palm', e: '🌴', name: 'Palm', bg: '#1C6B3A', price: 0 }, { id: 'mic', e: '🎤', name: 'Speaker', bg: '#5B2A86', price: 0 },
  { id: 'books', e: '📚', name: 'Scholar', bg: '#8A2D2D', price: 0 }, { id: 'rocket', e: '🚀', name: 'Rocket', bg: '#22305E', price: 0 },
  { id: 'flamingo', e: '🦩', name: 'Flamingo', bg: '#B23A6E', price: 40 }, { id: 'lion', e: '🦁', name: 'Lion', bg: '#A3650C', price: 40 },
  { id: 'planet', e: '🪐', name: 'Planet', bg: '#3B2A7A', price: 60 }, { id: 'masks', e: '🎭', name: 'Drama', bg: '#6A1E4F', price: 60 },
  { id: 'compass', e: '🧭', name: 'Navigator', bg: '#1D4E5E', price: 60 }, { id: 'star', e: '🌟', name: 'Star', bg: '#7A5A06', price: 100 },
  { id: 'crown', e: '👑', name: 'Royalty', bg: '#5E4307', price: 120 }, { id: 'dragon', e: '🐉', name: 'Dragon', bg: '#1E5E2F', price: 150 }
];
const SCHOOLS = ['St. Maarten Academy', 'Milton Peters College', 'St. Dominic High School', 'Charlotte Brookson Academy', 'Learning Unlimited', 'Caribbean International Academy', 'University of St. Martin', 'Other'];
const TERR = (window.COURSE_TERRITORIES && window.COURSE_TERRITORIES.length) ? window.COURSE_TERRITORIES : [{ id: 'sxm', name: 'Sint Maarten', tz: 'America/Lower_Princes', schools: SCHOOLS.filter(x => x !== 'Other').map(name => ({ name })) }];
const terr = id => TERR.find(t => t.id === id) || null;
const defTerr = () => (TERR.find(t => /sint maarten/i.test(t.name)) || TERR[0]).id;
function schoolOpts(tid, cur) { const t = terr(tid); const L = (t ? t.schools || [] : []).map(x => x.name + (x.town ? ' (' + x.town + ')' : '')); return `<option value="">Choose your sixth form</option>${L.map(x => `<option ${cur === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}<option ${cur === 'Other' ? 'selected' : ''} value="Other">Other (type it)</option>`; }
const YEARS = ['CAPE Year 1 (Lower Sixth)', 'CAPE Year 2 (Upper Sixth)', 'Form 5 (getting ready for CAPE)', 'Tertiary / associate degree', 'Private candidate', 'Other'];
const INTERESTS = {
  Music: ['Explain how a Caribbean genre such as soca or dancehall has changed over the last twenty years (cause and effect).', 'Argue whether local radio should play more Caribbean music.'],
  Sports: ['Explain the process of training for a school sports day event.', 'Argue whether sport should count towards CAPE grades.'],
  Gaming: ['Classify the types of gamers you know and what each values.', 'Argue whether video games can teach communication skills.'],
  Fashion: ['Compare and contrast school uniforms with free dress days.', 'Argue whether fast fashion should be taxed in the Caribbean.'],
  Food: ['Explain the process of making a dish your family is known for.', 'Argue whether schools should ban sugary drinks.'],
  Technology: ['Define "digital footprint" for a younger student.', 'Argue whether phones should be allowed in class.'],
  Film: ['Compare a book and its film adaptation.', 'Argue whether Caribbean stories are under-represented in film.'],
  'Social media': ['Explain the effects of social media on how teenagers speak and write.', 'Argue whether teenagers should verify news before sharing it.'],
  Environment: ['Explain the causes and effects of sargassum on Caribbean beaches.', 'Argue for a ban on single-use plastics on the island.'],
  Business: ['Explain the process of starting a small business in your territory.', 'Argue whether entrepreneurship should be compulsory in school.'],
  Health: ['Explain the causes and effects of non-communicable diseases in children.', 'Argue whether school canteens should list calories.'],
  Travel: ['Compare cruise tourism and stay-over tourism for the island.', 'Argue whether tourists should pay an environmental fee.'],
  Art: ['Define street art and explain its role in a community.', 'Argue whether art should be compulsory up to Form 5.'],
  Science: ['Explain the process of hurricane formation for a Form 1 class.', 'Argue whether the Caribbean should invest in solar power.'],
  Carnival: ['Explain how a Carnival troupe plans its costumes (process).', 'Argue whether Carnival is good for the economy.'],
  Animals: ['Classify the sea creatures found around the island.', 'Argue whether stray-animal programmes need government funding.']
};
const LEVELS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000];
const LTITLES = ['Listener', 'Note-taker', 'Reader', 'Researcher', 'Analyst', 'Writer', 'Speaker', 'Rhetorician', 'Communicator', 'Master Communicator', 'Legend'];
function levelOf(xp) { let i = 0; while (i < LEVELS.length - 1 && xp >= LEVELS[i + 1]) i++; const lo = LEVELS[i], hi = LEVELS[i + 1] || lo + 1000; return { n: i + 1, title: LTITLES[i], pct: Math.min(100, Math.round((xp - lo) / (hi - lo) * 100)), next: hi - xp }; }
const IMPORTED = [
  { id: 'mainidea', title: 'Main Idea Quest', icon: '🔎', price: 0, mod: '1', blurb: 'Three-level quest on topic, main idea, purpose and the CAPE essay.' },
  { id: 'debate', title: 'Mic Drop: Debate Showdown', icon: '🎙️', price: 0, mod: '3', blurb: 'Draw a motion, plan fast and argue your side.' },
  { id: 'crossword', title: 'Word Nerd Crossword', icon: '🧩', price: 0, mod: '1', blurb: 'Solve the crossword of literary techniques.' },
  { id: 'orgstrat', title: 'Blueprint Breakers', icon: '🗂️', price: 0, mod: '1', blurb: 'Spot and explain organisational strategies.' },
  { id: 'pasttenses', title: 'Time Travellers: Past Tense Challenge', icon: '⏳', price: 0, mod: 'all', blurb: 'Master the past tenses for formal writing.' },
  { id: 'jigsaw', title: 'Device Puzzle Rush', icon: '🧠', price: 60, mod: '1', blurb: 'Fit techniques, examples and effects together.' },
  { id: 'songs', title: 'Lyric Lab', icon: '🎶', price: 80, mod: '1', blurb: 'Hunt for techniques in songs you know.' },
  { id: 'discourse', title: 'Discourse Detective', icon: '🕵️', price: 80, mod: '1', blurb: 'Investigate the elements of discourse.' },
  { id: 'resilience', title: 'Wheel of Resilience', icon: '🎡', price: 100, mod: '1', blurb: 'Spin for a poem theme and write two stanzas using four literary devices.' },
  { id: 'transitions', title: 'Causeway Crew: Transitions', icon: '🌉', price: 0, mod: 'all', blurb: 'Transitional words and phrases: the word bank, punctuation rules and five levels that build a bridge.' },
  { id: 'hooks', title: 'Hook, Line and Genre', icon: '🎣', price: 0, mod: '1', blurb: 'Features of each genre, choosing the right hook, and identifying and matching rhetorical devices.' },
  { id: 'datacollection', title: 'Data Hunters', icon: '📋', price: 0, mod: '1', blurb: 'Interviews, focus groups, surveys, observation and document analysis, with review questions.', tag: 'Study notes' },
  { id: 'media', title: 'Old School vs New School Media', icon: '📺', price: 0, mod: '3', blurb: 'Characteristics and assumptions of traditional and new media, with Caribbean contexts.', tag: 'Study notes' },
  { id: 'argpers', title: 'Prove It or Move It', icon: '⚖️', price: 0, mod: '3', blurb: 'How proving a claim differs from moving a reader to act.', tag: 'Study notes' },
  { id: 'ncdessay', title: 'Plate Power: The NCD Essay Mission', icon: '🩺', price: 0, mod: 'P3', blurb: 'Write an expository essay for parents, with research pack, plan and rubric.', tag: 'Assignment' },
  { id: 'ncdassign', title: 'Mic & Story: The NCD Challenge', icon: '🎤', price: 0, mod: 'P3', blurb: 'Research, write a speech or short story for parents, then justify and evaluate it.', tag: 'Assignment' },
  { id: 'wordsim', title: 'Word Lab: Exam Writer', icon: '📝', price: 0, mod: '1', blurb: 'Write Paper 02 essays and Paper 03/2 answers in a realistic Word window, build Grade One responses step by step, and fill in your research file.', tag: 'Study notes' },
  { id: 'notelab', title: 'Note Lab: Memory Builders and Note-Making', icon: '📓', price: 0, mod: '1', blurb: 'Seven note-making formats with annotated Caribbean examples, strategy notes, memory builders and listen-or-read practice with model notes.', tag: 'Study notes' },
  { id: 'thesislab', title: 'Thesis and Strategy Studio', icon: '🧱', price: 0, mod: '1', blurb: 'Build exam-ready theses, study annotated PEEL samples for every strategy and technique, plan essays to the mark scheme and test yourself.', tag: 'Study notes' },
  { id: 'p1strategies', title: 'Paper 01 Strategy Lab', icon: '🎧', price: 0, mod: '1', blurb: 'Main-idea and listening (Items 1–7) strategies linked to literary techniques, practice sets with comics and adverts, and full timed papers, including every past paper.', tag: 'Study notes' },
  { id: 'p032bank', title: 'Paper 03/2 Sample Bank and Cue Cards', icon: '🗂️', price: 0, mod: 'P3', blurb: 'More Paper 03/2 practice papers and Grade One samples organised by strategy, past topics with equivalent samples, and sample cue cards with a Cue Card Builder.', tag: 'Assignment' },
  { id: 'essayorder', title: 'Essay Builder: Put It in Order', icon: '🧩', price: 0, mod: '1', blurb: 'Drag paragraphs and sentences into order, see what is out of place and why, and open a mini tutorial or the notes for each mistake.', tag: 'Study notes' },
  { id: 'funnel', title: 'Funnel Vision', icon: '🔻', price: 0, mod: 'all', blurb: 'Sort questions into the seven types of expository essay, build the introduction funnel, judge full sample essays as strong or weak, and plan your own mind map that heats up from cold to hot. Download everything as PDF.', tag: 'Study notes' },
  { id: 'funnelbuilder', title: 'Funnel Builder', icon: '🏗️', price: 0, mod: 'all', blurb: 'Write your own expository essay layer by layer, from hook to supporting details and conclusion, with hints and a cold-warm-hot rigour meter, then check it and download it as PDF, PNG or JPEG.', tag: 'Study notes' },
  { id: 'mindmap', title: 'Mind Map Maker', icon: '🧠', price: 0, mod: 'all', blurb: 'Plan an expository essay as a mind map, from the topic list or from scratch, with hints and a cold-warm-hot rigour meter. Download it as PDF, PNG or JPEG.', tag: 'Study notes' }
];
let AC = null;
function chime(kind) {
  if (S.sound === false) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const now = AC.currentTime, N = kind === 'buy' ? [523.25, 659.25, 783.99, 1046.5] : kind === 'chest' ? [659.25, 830.61, 987.77, 1318.51] : kind === 'level' ? [523.25, 659.25, 783.99, 1046.5, 1318.51] : kind === 'soft' ? [392, 523.25] : [783.99, 1174.66];
    N.forEach((f, i) => { const o = AC.createOscillator(), g = AC.createGain(), t = now + i * 0.09; o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 0.55); });
  } catch (e) { }
}
function floatText(txt) {
  const p = $('#hcoins'); if (!p) return;
  const r = p.getBoundingClientRect(), el = document.createElement('div');
  el.className = 'burst'; el.textContent = txt; el.style.left = (r.left + r.width / 2) + 'px'; el.style.top = (r.top + r.height + 4) + 'px';
  document.body.appendChild(el); setTimeout(() => el.remove(), 1300);
  p.classList.remove('pop'); void p.offsetWidth; p.classList.add('pop');
}
function glowCard() { const c = document.querySelector('.stage article.card, .stage .room, .stage .card'); if (c) { c.classList.remove('glowok'); void c.offsetWidth; c.classList.add('glowok'); } }
function reward(n, label, opt) {
  try { window.dispatchEvent(new CustomEvent('course:reward', { detail: { n, label, opt } })); } catch (e) { }
  opt = opt || {};
  const before = levelOf(S.xp).n;
  S.coins = (S.coins || 0) + n; S.xp += opt.xp || 0;
  let bonus = 0;
  if (!opt.noBonus && Math.random() < 0.18) { bonus = [5, 10, 15, 25][Math.floor(Math.random() * 4)]; S.coins += bonus; }
  save(); renderTop();
  chime(bonus ? 'chest' : 'ok'); floatText('+' + n); glowCard();
  if (bonus) { SFXM.reward(); setTimeout(() => { floatText('+' + bonus); toast(`🎁 Surprise chest! +${bonus} bonus coins`); }, 650); }
  else if (label) { SFXM.success(); toast(`${label} +${n} coins`); }
  if (levelOf(S.xp).n > before) setTimeout(() => { chime('level'); confetti(); SFXM.applause(); toast(`Level up! You are now a ${levelOf(S.xp).title}`); }, 900);
}
function streakHit(ok) {
  if (!ok) { S.run = 0; return; }
  S.run = (S.run || 0) + 1;
  if (S.run % 5 === 0) setTimeout(() => reward(10, `🔥 ${S.run} in a row!`, { noBonus: true }), 400);
}
function owns(id) { return S.teacher || !!(S.owned && S.owned[id]); }
function buy(id, price, name) {
  if (owns(id)) return true;
  if ((S.coins || 0) < price) { toast(`You need ${price - (S.coins || 0)} more coins to unlock ${name}.`); return false; }
  S.coins -= price; S.owned = S.owned || {}; S.owned[id] = true; save(); renderTop(); chime('buy'); SFXM.applause(); confetti(); toast(`Unlocked: ${name}`); return true;
}
const todayStr = () => new Date().toISOString().slice(0, 10);
function dailyReady() { return S.lastDaily !== todayStr(); }
function claimDaily() {
  if (!dailyReady()) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  S.dayStreak = S.lastDaily === y ? (S.dayStreak || 0) + 1 : 1; S.lastDaily = todayStr();
  const amt = 10 + 5 * Math.min(S.dayStreak, 6);
  reward(amt, `Daily chest (day ${S.dayStreak} streak)`, { noBonus: true });
  render();
}
function coinHTML(n) { return `<span class="coinpill"><span class="coin">C</span>${n}</span>`; }
function avatarHTML(id, cls) {
  if (typeof id === 'string' && id.indexOf('photo:') === 0) { const P0 = S.profile || {}, ph = window.COURSE_PHOTO; if (ph && P0.avatar === id) return `<span class="avatar ${cls || ''} photo"><img src="${ph}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block"></span>`; id = null; } const a = AVATARS.find(x => x.id === id) || AVATARS[0]; return `<span class="avatar ${cls || ''}" style="background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.4),transparent 60%),${a.bg}"><span style="font-size:${cls === 'lg' ? 3 : 1.25}rem;line-height:1" aria-hidden="true">${a.e}</span></span>`; }
function applySkin() {
  const k = S.skin && SKINS.find(x => x.id === S.skin) ? S.skin : 'navy';
  if (k === 'navy') document.documentElement.removeAttribute('data-skin'); else document.documentElement.setAttribute('data-skin', k);
  SKY.mode = (SKINS.find(x => x.id === k) || SKINS[0]).fx; SKY.init();
  refreshSkinPop();
  const mb = document.getElementById('modeBtn'); if (mb) { const light = k === 'daylight'; mb.textContent = light ? '🌙' : '☀️'; mb.title = light ? 'Switch to dark mode' : 'Switch to light mode'; }
}
function tickClock(tid) {
  const el = document.getElementById('hclock'); if (!el) return;
  const t = terr(tid || (S.profile && S.profile.territory) || defTerr()); const tz = t && t.tz;
  try { const d = new Date(); const o = tz ? { timeZone: tz } : {}; el.innerHTML = `<b>${d.toLocaleTimeString('en-GB', Object.assign({ hour: 'numeric', minute: '2-digit', hour12: true }, o))}</b>${t ? `<span class="hide-sm"> · ${esc(t.name)}</span>` : ''}`; el.title = 'Local time' + (t ? ' in ' + t.name : ''); } catch (e) { el.textContent = new Date().toLocaleTimeString(); }
}
setInterval(() => tickClock(), 20000);
/* release countdowns: refresh labels; re-render when a topic opens */
function relKey() { return MODS.map(m => m.units.filter((u, ui) => unitReleased(m, ui)).length).join(','); }
let REL_SEEN = '';
function tickRelease() {
  if (S.teacher) return;
  document.querySelectorAll('.cdown').forEach(el => { el.textContent = cdText(+el.dataset.at); });
  const k = relKey(); if (REL_SEEN && k !== REL_SEEN) { REL_SEEN = k; try { render(); } catch (e) { } toast('🎉 A new topic is now open.'); } else REL_SEEN = k;
}
setInterval(tickRelease, 30000);
/* use the server's clock when online, so changing the device clock does not open topics early */
(function syncClock() {
  if (S.teacher || location.protocol === 'file:') return;
  try {
    const t0 = Date.now();
    fetch('engine.js?clock=' + t0, { method: 'HEAD', cache: 'no-store' }).then(r => {
      const hd = r.headers.get('date'); if (!hd) return; const srv = Date.parse(hd); if (isNaN(srv)) return;
      const t1 = Date.now(); CLOCK_OFF = srv - (t0 + t1) / 2; REL_SEEN = relKey(); try { render(); } catch (e) { }
    }).catch(() => { });
  } catch (e) { }
  setTimeout(syncClock, 15 * 6e4);
})();
/* ---- Release control (owner only) ---- */
const AST = 4 * 36e5; // Sint Maarten is UTC-4 all year
const toLocalInput = t => isFinite(t) && t > 0 ? new Date(t - AST).toISOString().slice(0, 16) : '';
const fromLocalInput = v => { const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(v || ''); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) + AST : NaN; };
function relStatus(m, ui) {
  const o = OVR[m.units[ui].id], t = unitReleaseAt(m, ui), live = nowMs() >= t;
  if (o && o.mode === 'open') return ['ok', 'Opened early by you'];
  if (o && o.mode === 'hold') return ['no', 'Held back · date to be announced'];
  if (live) return ['ok', `Open since ${relDate(t)}${o ? ' (your date)' : ''}`];
  return ['', `${o ? 'Your date: ' : ''}Opens ${relDate(t)} · in ${cdText(t)}`];
}
function releaseHTML() {
  if (!ADMIN) return `<div class="card"><h2>Release control</h2><p>This page is only for the course owner.</p></div>`;
  let h = `<section class="hero"><span class="eyebrow">Course owner</span><h1>Release control</h1><p>Topics open every Friday at 6:00 pm (Sint Maarten time), starting Friday 23 October 2026, one topic per week in each module. Use this page to open a topic early, hold one back or move its date. Changes save online and reach every signed-in student within a minute.</p></section>`;
  if (!RELDB) h += `<div class="card"><p class="fb note">The online database is not connected in this view, so changes cannot be saved right now. Reload the page while signed in and try again.</p></div>`;
  h += `<div class="card"><div class="row" style="justify-content:space-between"><p class="hint" style="margin:0">Students still have to finish the topic before it to move on, and activities inside a topic still open one at a time. Students who are not signed in, or who use an offline copy, follow the normal Friday schedule.</p><button type="button" class="btn ghost" data-rel="resetall" ${Object.keys(OVR).length ? '' : 'disabled'}>Reset everything to the schedule</button></div></div>`;
  MODS.forEach(m => {
    h += `<div class="card"><span class="kicker">${esc(m.code)}</span><h3>${esc(m.title)}</h3><div class="relgrid">`;
    m.units.forEach((u, ui) => {
      const [cls, txt] = relStatus(m, ui), o = OVR[u.id], t = unitReleaseAt(m, ui), id = 'rd-' + u.id;
      h += `<div class="relrow"><div class="relhead"><b>Unit ${ui + 1}: ${esc(u.title)}</b><span class="pill ${cls}">${esc(txt)}</span><span class="hint">Schedule: ${esc(relDate(schedAt(ui)))}</span></div>
      <div class="row relbtns"><button type="button" class="btn go sm" data-rel="open" data-u="${u.id}" ${o && o.mode === 'open' ? 'disabled' : ''}>Open now</button><button type="button" class="btn ghost sm" data-rel="hold" data-u="${u.id}" ${o && o.mode === 'hold' ? 'disabled' : ''}>Hold back</button>
      <label class="sr" for="${id}">New opening date and time for Unit ${ui + 1}</label><input type="datetime-local" id="${id}" value="${toLocalInput(isFinite(t) && t > 0 ? t : schedAt(ui))}"><button type="button" class="btn ghost sm" data-rel="date" data-u="${u.id}" data-in="${id}">Set date</button>
      ${ui < m.units.length - 1 ? `<button type="button" class="btn ghost sm" data-rel="shift" data-m="${m.id}" data-ui="${ui}" title="Move this topic and every later topic in ${esc(m.code)} one week later">+1 week from here</button>` : ''}
      <button type="button" class="btn ghost sm" data-rel="reset" data-u="${u.id}" ${o ? '' : 'disabled'}>Back to schedule</button></div></div>`;
    });
    h += `</div></div>`;
  });
  return h;
}
async function relSave(units, msg) {
  if (!RELDB) { toast('Not connected. Reload while signed in.'); return; }
  if (REL_BUSY) { toast('Still saving the last change…'); return; }
  REL_BUSY = true;
  try { await RELDB.doc('release/overrides').set({ units, updatedAt: Date.now() }); OVR = units; render(); toast(msg); }
  catch (e) { toast(e && (e.code === 'permission_denied' || e.code === 'not_granted') ? 'Only the course owner can change releases.' : 'Could not save. Check your connection and try again.'); }
  finally { REL_BUSY = false; }
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-rel]'); if (!b || !ADMIN) return;
  e.preventDefault(); const d = b.dataset, U = Object.assign({}, OVR);
  if (d.rel === 'open') { U[d.u] = { mode: 'open' }; relSave(U, 'Opened for the class.'); }
  else if (d.rel === 'hold') { U[d.u] = { mode: 'hold' }; relSave(U, 'Held back until you set a date.'); }
  else if (d.rel === 'reset') { delete U[d.u]; relSave(U, 'Back on the normal schedule.'); }
  else if (d.rel === 'resetall') { if (confirm('Put every topic back on the normal Friday schedule?')) relSave({}, 'Every topic is back on the schedule.'); }
  else if (d.rel === 'date') { const el = document.getElementById(d.in), t = fromLocalInput(el && el.value); if (!isFinite(t)) { toast('Pick a date and time first.'); return; } U[d.u] = { mode: 'date', at: t }; relSave(U, `Now opens ${relDate(t)}.`); }
  else if (d.rel === 'shift') { const m = mod(d.m), from = +d.ui; let n = 0; for (let j = from; j < m.units.length; j++) { const t = unitReleaseAt(m, j); if (isFinite(t) && t > nowMs()) { U[m.units[j].id] = { mode: 'date', at: t + REL_WEEK }; n++; } } if (!n) { toast('Those topics are already open or held.'); return; } relSave(U, `Moved ${n} topic${n === 1 ? '' : 's'} one week later.`); }
}, true);
(async function relConnect() {
  try {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
    if (user) { try { ADMIN = !!(await user.canEdit()); } catch (e) { ADMIN = false; } if (ADMIN) { try { renderSide(); if (S.loc.v === 'release') renderStage(); } catch (e) { } } }
    if (!db) return; RELDB = db; let first = true;
    db.doc('release/overrides').onSnapshot(snap => {
      const before = relKey(); const d = snap && snap.exists ? snap.data() : null;
      OVR = d && d.units && typeof d.units === 'object' ? Object.assign({}, d.units) : {};
      const after = relKey(); REL_SEEN = after;
      try { render(); } catch (e) { }
      if (!first && !S.teacher && after !== before && !ADMIN) toast('🎉 Your teacher has updated which topics are open.');
      first = false;
    }, () => { });
  } catch (e) { }
})();
function setSkin(id) { if (!SKINS.find(x => x.id === id)) return false; if (id !== 'daylight') S.darkSkin = id; S.skin = id; save(); applySkin(); return true; }

/* ---------------- star / particle sky ---------------- */
const SKY = {
  mode: 'stars', P: [], t: 0, raf: 0,
  init() {
    const c = $('#sky'); if (!c || !c.getContext) return;
    this.c = c; this.x = c.getContext('2d'); if (!this.x) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1); c.width = innerWidth * dpr; c.height = innerHeight * dpr; this.x.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = this.mode === 'galaxy' ? 220 : this.mode === 'dots' ? 70 : this.mode === 'confetti' ? 90 : 150;
    this.P = Array.from({ length: n }, () => this.spawn(true));
    this.col = getComputedStyle(document.documentElement).getPropertyValue('--particle').trim() || '#fff';
    cancelAnimationFrame(this.raf);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { this.draw(); return; }
    const loop = () => { this.t++; this.step(); this.draw(); this.raf = requestAnimationFrame(loop); }; loop();
  },
  spawn(any) {
    const W = innerWidth, H = innerHeight, m = this.mode;
    const p = { x: Math.random() * W, y: any ? Math.random() * H : (m === 'bubbles' ? H + 10 : -10), r: Math.random() * 1.6 + 0.3, a: Math.random(), tw: Math.random() * 0.03 + 0.005, vx: 0, vy: 0, h: Math.random() * 360 };
    if (m === 'bubbles') { p.r = Math.random() * 4 + 1; p.vy = -(Math.random() * 0.4 + 0.15); }
    if (m === 'confetti') { p.r = Math.random() * 3 + 1.5; p.vy = Math.random() * 0.5 + 0.2; p.vx = (Math.random() - .5) * 0.3; }
    if (m === 'fireflies') { p.r = Math.random() * 2 + 1; p.vx = (Math.random() - .5) * 0.25; p.vy = (Math.random() - .5) * 0.25; }
    if (m === 'galaxy') { p.r = Math.random() * 1.8 + 0.2; }
    return p;
  },
  step() {
    const W = innerWidth, H = innerHeight;
    this.P.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.a += p.tw;
      if (p.y < -20 || p.y > H + 20 || p.x < -20 || p.x > W + 20) this.P[i] = this.spawn(false);
    });
    if (this.mode !== 'bubbles' && this.mode !== 'confetti' && Math.random() < 0.004 && !this.shoot) this.shoot = { x: Math.random() * W * 0.7, y: Math.random() * H * 0.3, l: 0 };
    if (this.shoot) { this.shoot.l += 1; if (this.shoot.l > 40) this.shoot = null; }
  },
  draw() {
    const x = this.x; if (!x) return;
    x.clearRect(0, 0, innerWidth, innerHeight);
    const m = this.mode, col = this.col;
    this.P.forEach(p => {
      const tw = 0.35 + 0.65 * Math.abs(Math.sin(p.a));
      x.globalAlpha = m === 'dots' ? 0.18 * tw : tw * (m === 'bubbles' ? 0.45 : 0.9);
      if (m === 'confetti') { x.fillStyle = `hsl(${p.h},90%,65%)`; x.fillRect(p.x, p.y, p.r * 2, p.r); return; }
      x.fillStyle = col;
      if (m === 'bubbles') { x.strokeStyle = col; x.lineWidth = 1; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.stroke(); return; }
      if (m === 'fireflies') { x.shadowColor = '#F5E27A'; x.shadowBlur = 8; x.fillStyle = '#F5E27A'; }
      x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill(); x.shadowBlur = 0;
    });
    if (this.shoot) { const s = this.shoot, len = 90; x.globalAlpha = 1 - s.l / 40; const g = x.createLinearGradient(s.x + s.l * 9, s.y + s.l * 4, s.x + s.l * 9 - len, s.y + s.l * 4 - len * 0.45); g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,255,255,0)'); x.strokeStyle = g; x.lineWidth = 2; x.beginPath(); x.moveTo(s.x + s.l * 9, s.y + s.l * 4); x.lineTo(s.x + s.l * 9 - len, s.y + s.l * 4 - len * 0.45); x.stroke(); }
    x.globalAlpha = 1;
  }
};
window.addEventListener('resize', () => { clearTimeout(SKY.rt); SKY.rt = setTimeout(() => SKY.init(), 200); });

/* ---------------- views: profile, shop, games ---------------- */
function practiceHTML() {
  const L = S.loc, v = variant(); if (!v) return '<div class="card"><p>Not found.</p></div>';
  const back = L.v === 'lq' ? `<button type="button" class="linkbtn" data-go="lab" data-tab="${L.k}">← Language Lab</button>` : `<button type="button" class="linkbtn" data-go="xc" data-sub="${L.sub}">← Your subjects</button>`;
  const done = !!(S.labdone && S.labdone[L.v === 'lq' ? L.k + L.i : 'xq' + L.sub]) && T.submitted && T.correct;
  return `<div class="crumbs">${back}<span>${L.v === 'lq' ? (L.k === 'grammar' ? 'Grammar' : 'Mechanics') : 'Jargon Match'}</span></div><article class="card"><div class="card-top"><span class="kicker k-game">${L.v === 'lq' ? 'Lesson + quiz' : 'Mini game'}</span><span class="tools">${listenBtn()}<button type="button" class="tool" data-act="tutor">Mini tutorial</button></span></div><h2>${esc(v.title)}</h2>${activityHTML(v, done, null)}</article>`;
}
function profileHTML() {
  const P = S.profile || {}, majors = (window.COURSE_XC && COURSE_XC.majors) || [];
  const lv = levelOf(S.xp);
  let h = `<div class="card"><span class="kicker">Player card</span><div class="row" style="gap:18px">${avatarHTML(P.avatar, 'lg')}<div style="display:flex;flex-direction:column;gap:6px;min-width:0"><h1>${esc(S.name || 'New player')}</h1><p class="hint">${esc([P.school === 'Other' ? P.schoolOther : P.school, P.year, (majors.find(m => m.id === P.major) || {}).name].filter(Boolean).join(' · ') || 'Fill in your card below.')}</p><div class="row">${coinHTML(S.coins || 0)}<span class="ribbon">Level ${lv.n} · ${lv.title} · ${lv.pct}%</span>${S.dayStreak ? `<span class="ribbon">🔥 ${S.dayStreak}-day streak</span>` : ''}</div><div class="pbar" style="width:min(320px,70vw)"><i style="width:${lv.pct}%"></i></div><span class="hint">${lv.next} XP to the next level</span><div class="row">${emoteStrip()}</div></div></div></div>`;
  h += `<div class="card"><h3>About you</h3><div class="formgrid">
    <div class="field"><label for="pf-name">Name</label><input id="pf-name" class="input" maxlength="40" autocomplete="name" value="${esc(S.name || '')}" placeholder="First name"></div>
    <div class="field"><label for="pf-terr">Territory</label><select id="pf-terr" class="select">${TERR.map(t => `<option value="${esc(t.id)}" ${(P.territory || defTerr()) === t.id ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></div>
    <div class="field"><label for="pf-school">Sixth form <span class="hint">(schools offering CAPE)</span></label><select id="pf-school" class="select">${schoolOpts(P.territory || defTerr(), P.school)}</select></div>
    <div class="field" ${P.school === 'Other' ? '' : 'hidden'} id="pf-otherwrap"><label for="pf-other">School name</label><input id="pf-other" class="input" maxlength="60" value="${esc(P.schoolOther || '')}"></div>
    <div class="field"><label for="pf-year">Year</label><select id="pf-year" class="select"><option value="">Choose your year</option>${YEARS.map(x => `<option ${P.year === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select></div>
    <div class="field"><label for="pf-major">Major or pathway</label><select id="pf-major" class="select"><option value="">Choose your pathway</option>${majors.slice().sort((a, b) => (a.id === 'undecided') - (b.id === 'undecided') || a.name.localeCompare(b.name)).map(m => `<option value="${m.id}" ${P.major === m.id ? 'selected' : ''}>${esc(m.name)}</option>`).join('')}</select></div>
    </div>
    <div class="field"><label>Your interests <span class="hint">(pick any; your writing prompts use them)</span></label><div class="chips">${Object.keys(INTERESTS).map(k => `<button type="button" class="chip ${(P.interests || []).includes(k) ? 'sel' : ''}" data-gx="interest" data-k="${esc(k)}" aria-pressed="${(P.interests || []).includes(k)}">${esc(k)}</button>`).join('')}</div></div>
    <div class="row"><button type="button" class="btn go" data-gx="saveprofile">Save my card</button><button type="button" class="tool" data-gx="sound">${S.sound === false ? '🔇 Sounds off' : '🔊 Sounds on'}</button></div></div>`;
  h += `<div class="card"><h3>Choose your avatar</h3><div class="avgrid">${AVATARS.map(a => { const have = !a.price || owns('av-' + a.id); return `<button type="button" class="avpick ${P.avatar === a.id ? 'sel' : ''}" data-gx="avatar" data-id="${a.id}" aria-pressed="${P.avatar === a.id}">${avatarHTML(a.id)}<span>${esc(a.name)}</span>${have ? '' : `<span class="lock">🔒 ${a.price}</span>`}</button>`; }).join('')}</div><p class="hint">Locked avatars cost coins. Tap one to unlock it.</p></div>`;
  h += lvCardHTML();
  h += (window.COURSE_PROFILE_CARDS || []).map(f => { try { return f(API) || ''; } catch (e) { return ''; } }).join(''); /* tools/tracker.js: Recent results */
  h += `<div class="card"><h3>Theme</h3>${skinsHTML()}</div>`;
  return h;
}
function skinPopEl() { return document.getElementById('skinPop'); }
function refreshSkinPop() {
  const p = skinPopEl(); if (!p || p.hidden) return;
  p.innerHTML = `<div class="sp-head"><b>Background</b><span>Your coins: ${S.coins || 0}</span></div>` + skinsHTML();
}
function placeSkinPop() {
  const p = skinPopEl(), b = document.getElementById('skinBtn'); if (!p || !b || p.hidden) return;
  const r = b.getBoundingClientRect(), w = p.offsetWidth, vw = document.documentElement.clientWidth;
  p.style.top = Math.round(r.bottom + 8) + 'px';
  p.style.left = Math.round(Math.max(16, Math.min(r.right - w, vw - w - 16))) + 'px';
}
function closeSkinPop() {
  const p = skinPopEl(), b = document.getElementById('skinBtn'); if (p) p.hidden = true; if (b) b.setAttribute('aria-expanded', 'false');
}
function toggleSkinPop() {
  let p = skinPopEl(); const b = document.getElementById('skinBtn');
  if (p && !p.hidden) { closeSkinPop(); return; }
  if (!p) { p = document.createElement('div'); p.id = 'skinPop'; p.className = 'skinpop'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Choose a background'); document.body.appendChild(p); }
  p.hidden = false; if (b) b.setAttribute('aria-expanded', 'true');
  refreshSkinPop(); placeSkinPop();
  const sel = p.querySelector('.skin.sel') || p.querySelector('.skin'); if (sel) sel.focus();
}
document.addEventListener('click', ev => { const p = skinPopEl(); if (!p || p.hidden) return; if (ev.target.closest('#skinPop,#skinBtn')) return; closeSkinPop(); }, true);
document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && skinPopEl() && !skinPopEl().hidden) { closeSkinPop(); const b = document.getElementById('skinBtn'); if (b) b.focus(); } });
window.addEventListener('resize', placeSkinPop);
window.addEventListener('scroll', placeSkinPop, true);
function skinsHTML() {
  return `<div class="skinpick">${SKINS.map(k => { const have = !k.price || owns('skin-' + k.id); return `<button type="button" class="skin ${(S.skin || 'navy') === k.id ? 'sel' : ''}" data-gx="skin" data-id="${k.id}" style="background:${k.bg};color:${k.light ? '#0B1736' : '#fff'}"><b style="color:${k.fg}">${esc(k.name)}</b><span style="font-size:.8rem;opacity:.85">${k.fx === 'bubbles' ? 'Rising bubbles' : k.fx === 'confetti' ? 'Carnival sparkles' : k.fx === 'fireflies' ? 'Fireflies' : k.fx === 'dots' ? 'Light and calm' : k.fx === 'galaxy' ? 'Dense starfield' : 'Twinkling stars'}</span>${have ? '' : `<span style="position:absolute;bottom:10px;right:10px">${coinHTML(k.price)}</span>`}</button>`; }).join('')}</div>`;
}
function gameTiles(filter) {
  const ER = (window.COURSE_ESCAPE && COURSE_ESCAPE.rooms) || [], Z = window.COURSE_ZOMBIE;
  const list = [];
  if (Z) list.push({ id: 'zombie', title: Z.title || 'Rebuilding After the Apocalypse', icon: '🧟', price: 0, blurb: 'Join the Rebuilding Council: five days of missions, skills and expository writing.', go: 'zombie', tag: 'Unit game' });
  ER.forEach((r, i) => list.push({ id: 'esc-' + r.id, title: 'Escape: ' + r.title, icon: ['🗝️', '🔐', '📡'][i % 3], price: [0, 120, 150][i] ?? 150, blurb: `Module ${r.module} escape room · ${r.minutes} minutes`, go: 'escape', room: i, tag: 'Escape room' }));
  list.push({ id: 'spell', title: 'Spelling Bee', icon: '🐝', price: 0, blurb: 'Hear the word, spell it, earn coins.', go: 'lab', tab: 'test', tag: 'Language Lab' });
  list.push({ id: 'verbs', title: 'Verb Sprint', icon: '⚡', price: 40, blurb: 'Race through irregular verb forms.', go: 'lab', tab: 'verbs', tag: 'Language Lab' });
  list.push({ id: 'grammar', title: 'Grammar Gauntlet', icon: '🛡️', price: 0, blurb: 'Ten grammar topics, five questions each.', go: 'lab', tab: 'grammar', tag: 'Language Lab' });
  list.push({ id: 'jargon', title: 'Jargon Match', icon: '🔗', price: 30, blurb: 'Match terms from your other subjects.', go: 'xc', tag: 'Your subjects' });
  IMPORTED.forEach(g => list.push(Object.assign({ page: 'games/' + g.id + '.html', tag: 'Classic games' }, g)));
  return list.filter(filter || (() => true));
}
function tileHTML(g) {
  const have = !g.price || owns('g-' + g.id);
  const attrs = !have ? `data-gx="buygame" data-id="${g.id}" data-price="${g.price}" data-name="${esc(g.title)}"` : g.page ? `data-gx="opengame" data-page="${g.page}" data-id="${g.id}"` : `data-go="${g.go}" ${g.tab ? `data-tab="${g.tab}"` : ''} ${g.room != null ? `data-room="${g.room}"` : ''}`;
  return `<button type="button" class="tile ${have ? '' : 'locked'}" ${attrs}><span class="ticon" aria-hidden="true">${g.icon}</span><span class="ribbon">${esc(g.tag || '')}</span><h3>${esc(g.title)}</h3><span class="meta">${esc(g.blurb || '')}</span>${have ? '' : `<span class="price">${coinHTML(g.price)}</span><span class="meta">🔒 Reward: unlock with coins</span>`}</button>`;
}
function gamesHTML() {
  const L = gameTiles(), free = L.filter(g => !g.price || owns('g-' + g.id)), locked = L.filter(g => g.price && !owns('g-' + g.id));
  let h = `<div class="card"><span class="kicker k-game">Games hub</span><h1>Play to learn</h1><p class="lead">Every game teaches a Communication Studies skill. Earn coins in lessons, tests and games, then spend them to unlock reward games, themes and avatars.</p><div class="row">${coinHTML(S.coins || 0)}<button type="button" class="btn ghost" data-go="shop">Open the rewards shop</button></div></div>`;
  h += `<div class="card"><h3>Ready to play</h3><div class="tiles">${free.map(tileHTML).join('')}</div></div>`;
  if (locked.length) h += `<div class="card"><h3>Reward games 🔒</h3><p class="hint">Keep earning. These unlock with coins.</p><div class="tiles">${locked.map(tileHTML).join('')}</div></div>`;
  return h;
}
function shopHTML() {
  let h = `<div class="card"><span class="kicker k-game">Rewards shop</span><h1>Spend your coins</h1><div class="row">${coinHTML(S.coins || 0)}<span class="ribbon">Level ${levelOf(S.xp).n} · ${levelOf(S.xp).title}</span></div>
    ${dailyReady() ? `<div class="chest"><span class="lid" aria-hidden="true">🎁</span><div><b>Your daily chest is ready.</b><p class="hint">Come back every day to grow your streak and the chest.</p></div><button type="button" class="btn gold" data-gx="daily">Open it</button></div>` : `<p class="hint">Daily chest opened. Come back tomorrow${S.dayStreak ? ` to keep your 🔥 ${S.dayStreak}-day streak` : ''}.</p>`}</div>`;
  const lockedGames = gameTiles(g => g.price);
  h += `<div class="card"><h3>Reward games</h3><div class="tiles">${lockedGames.map(tileHTML).join('')}</div></div>`;
  h += `<div class="card"><h3>Themes</h3>${skinsHTML()}</div>`;
  h += `<div class="card"><h3>Avatars</h3><div class="avgrid">${AVATARS.filter(a => a.price).map(a => { const have = owns('av-' + a.id); return `<button type="button" class="avpick" data-gx="avatar" data-id="${a.id}">${avatarHTML(a.id)}<span>${esc(a.name)}</span>${have ? '<span class="lock">✓</span>' : `<span class="lock">🔒 ${a.price}</span>`}</button>`; }).join('')}</div></div>`;
  h += `<div class="card"><h3>Power-ups</h3><div class="tiles"><button type="button" class="tile" data-gx="buyhint"><span class="ticon">💡</span><h3>Escape-room hint token</h3><span class="meta">Use one to reveal a hint without spending coins in the room. You have ${S.hintTokens || 0}.</span><span class="price">${coinHTML(15)}</span></button></div></div>`;
  h += `<div class="card"><h3>How you earn</h3><ul><li>Finish a lesson screen: 5–15 coins (🚀 Challenge 15, ⚙️ Core 10, 🪜 Foundation 6). Finish a unit: 25 coins.</li><li>Every 5 correct answers in a row: a 10-coin streak bonus.</li><li>Pass a module test: 40 coins. Submit an essay: 15–30 coins.</li><li>Surprise chests can appear after any reward. Nobody knows when!</li><li>Open the daily chest every day: the longer your streak, the bigger it gets.</li></ul>
    <details class="fold"><summary>For teachers: the psychology behind it</summary><div><p><b>Classical conditioning:</b> the same chime and gold glow are paired with every success, so the cue becomes motivating in itself. A softer tone marks the start of study.</p><p><b>Operant conditioning:</b> coins reinforce effort immediately (continuous schedule), streak bonuses reward persistence (fixed ratio), surprise chests keep motivation high (variable ratio) and the daily chest builds a habit (fixed interval). There are no penalties, so mistakes stay safe.</p></div></details></div>`;
  return h;
}

/* ---------------- Language Lab ---------------- */
const LAB = window.COURSE_LAB || null;
function labHTML() {
  if (!LAB) return `<div class="card"><p>The Language Lab content did not load.</p></div>`;
  const tab = S.loc.tab || 'rules';
  const tabs = [['rules', 'Spelling rules'], ['test', 'Spelling Bee'], ['grammar', 'Grammar'], ['mechanics', 'Mechanics'], ['verbs', 'Verbs'], ['errors', 'Common errors']];
  let h = `<div class="card"><span class="kicker">Language Lab</span><h1>Spelling, grammar and mechanics</h1><p class="lead">Expression is worth 8 of the 25 marks on every essay. Sharpen it here and earn coins.</p><div class="tabs" role="tablist">${tabs.map(([k, n]) => `<button type="button" role="tab" aria-selected="${tab === k}" class="chip ${tab === k ? 'sel' : ''}" data-go="lab" data-tab="${k}">${n}</button>`).join('')}</div></div>`;
  if (tab === 'rules') h += LAB.spellingRules.map(r => `<div class="card"><div class="card-top"><h3>${esc(r.rule)}</h3>${listenBtn()}</div><div class="html-body">${r.explain}</div>${r.examples && r.examples.length ? `<p><b>Examples:</b> ${r.examples.map(esc).join(', ')}</p>` : ''}${r.exceptions && r.exceptions.length ? `<p class="hint"><b>Watch out for:</b> ${r.exceptions.map(esc).join(', ')}</p>` : ''}</div>`).join('');
  if (tab === 'test') h += spellHTML();
  if (tab === 'grammar' || tab === 'mechanics') h += `<div class="card"><div class="tiles">${LAB[tab].map((g, i) => `<button type="button" class="tile" data-go="lq" data-k="${tab}" data-i="${i}"><span class="ticon">${tab === 'grammar' ? '✍️' : '❗'}</span><h3>${esc(g.topic)}</h3><span class="meta">${S.labdone && S.labdone[tab + i] ? '✓ Completed · ' : ''}Lesson + 5 questions</span></button>`).join('')}</div></div>`;
  if (tab === 'verbs') h += verbsHTML();
  if (tab === 'errors') h += `<div class="card"><p class="hint">Tap a card to flip it.</p><div class="tiles">${LAB.commonErrors.map((e, i) => `<button type="button" class="flip" data-gx="flip" aria-label="Flip card"><span class="inner"><span class="face"><span class="ribbon">Not for exams</span><b style="text-decoration:line-through">${esc(e.wrong)}</b></span><span class="face back"><span class="ribbon">Standard English</span><b>${esc(e.right)}</b><span class="hint">${esc(e.why)}</span></span></span></button>`).join('')}</div></div>`;
  return h;
}
function spellLists() {
  const out = (LAB ? LAB.spellingLists : []).map((l, i) => ({ id: 'L' + i, title: l.title, words: l.words }));
  const XC = window.COURSE_XC;
  if (XC) XC.subjects.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach(s => out.push({ id: 'S' + s.id, title: s.name + ' words', words: s.spell.slice().sort((a, b) => a.localeCompare(b)).map(w => ({ w, sentence: '', tip: '' })) }));
  return out;
}
function spellHTML() {
  const sp = T.sp;
  if (!sp) {
    const P = S.profile || {}, XC = window.COURSE_XC, mine = XC && P.major ? ((XC.majors.find(m => m.id === P.major) || {}).subjects || []) : [];
    const L = spellLists();
    return `<div class="card"><h3>Choose a list</h3><p class="hint">You will hear 10 words. Type each one, then check. ${TTS.ok ? '' : 'Your browser cannot read words aloud, so the word is shown blurred: tap to reveal it briefly.'}</p><div class="tiles">${L.filter(l => l.id[0] === 'L' || mine.includes(l.id.slice(1))).map(l => `<button type="button" class="tile" data-gx="spellstart" data-id="${l.id}"><span class="ticon">🐝</span><h3>${esc(l.title)}</h3><span class="meta">${l.words.length} words${S.spellBest && S.spellBest[l.id] != null ? ' · best ' + S.spellBest[l.id] + '/10' : ''}</span></button>`).join('')}</div>
      <details class="fold"><summary>Lists from other subjects</summary><div><div class="tiles">${L.filter(l => l.id[0] === 'S' && !mine.includes(l.id.slice(1))).map(l => `<button type="button" class="tile" data-gx="spellstart" data-id="${l.id}"><span class="ticon">📘</span><h3>${esc(l.title)}</h3></button>`).join('')}</div></div></details></div>`;
  }
  const w = sp.words[sp.i];
  if (sp.i >= sp.words.length) {
    return `<div class="card"><h2>You spelt ${sp.score} of ${sp.words.length} correctly</h2>${savedHTML(sp.saved || null)}${sp.miss.length ? `<p><b>Practise these:</b></p><ul>${sp.miss.map(m => `<li><b>${esc(m.w)}</b> (you wrote "${esc(m.a)}")${m.tip ? ' · ' + esc(m.tip) : ''}</li>`).join('')}</ul>` : '<p>Perfect score!</p>'}<div class="row"><button type="button" class="btn go" data-gx="spellagain">Try another list</button></div></div>`;
  }
  return `<div class="card"><div class="card-top"><span class="kicker k-game">Spelling Bee · word ${sp.i + 1} of ${sp.words.length}</span><span class="hint">Score ${sp.score}</span></div>
    <div class="row"><button type="button" class="btn gold" data-gx="sayword">🔊 Hear the word</button>${TTS.ok ? '' : `<button type="button" class="tool" data-gx="peek">Peek (2 seconds)</button>`}</div>
    ${w.sentence ? `<p class="hint">In a sentence: ${esc(w.sentence).replace(new RegExp(w.w.replace(/[.*+?^$()|[\]\\]/g, '\\$&'), 'ig'), '_____')}</p>` : ''}
    ${sp.peek ? `<p class="bigword">${esc(w.w)}</p>` : ''}
    <label for="spin" class="sr">Type the word</label><input id="spin" class="input bigword" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type it here">
    <div class="row"><button type="button" class="btn go" data-gx="spellcheck">Check</button></div>
    ${sp.last ? `<div class="fb ${sp.last.ok ? 'good' : 'bad'}"><b>${sp.last.ok ? 'Correct!' : 'Not quite.'}</b> ${sp.last.ok ? '' : `The spelling is <b>${esc(sp.last.w)}</b>.`} ${sp.last.tip ? esc(sp.last.tip) : ''}</div>` : ''}</div>`;
}
function verbsHTML() {
  const vs = T.vs, V = LAB.verbs;
  if (!vs) {
    const q = (T.vq || '').toLowerCase();
    const rows = V.irregular.concat(V.regular).filter(v => !q || (v.base + ' ' + v.past + ' ' + v.pp).toLowerCase().includes(q));
    return `<div class="card"><div class="row" style="justify-content:space-between"><h3>Verb Sprint</h3>${(!owns('g-verbs')) ? `<button type="button" class="btn gold" data-gx="buygame" data-id="verbs" data-price="40" data-name="Verb Sprint">🔒 Unlock for 40 coins</button>` : `<button type="button" class="btn go" data-gx="vstart">Start a 10-verb sprint</button>`}</div><p class="hint">Type the simple past and past participle for each verb. Irregular verbs are the ones that trip people up in exams.</p></div>
      <div class="card"><label for="vq" class="sr">Search verbs</label><input id="vq" class="search" data-gx-in="vq" placeholder="Search verbs" value="${esc(T.vq || '')}"><div class="tablewrap" id="vtable"><table><thead><tr><th>Base</th><th>Simple past</th><th>Past participle</th><th>Example</th></tr></thead><tbody>${rows.map(v => `<tr><td><b>${esc(v.base)}</b></td><td>${esc(v.past)}</td><td>${esc(v.pp)}</td><td>${esc(v.sentence)}${v.note ? `<br><span class="hint">${esc(v.note)}</span>` : ''}</td></tr>`).join('')}</tbody></table></div></div>`;
  }
  if (vs.i >= vs.list.length) return `<div class="card"><h2>Sprint finished: ${vs.score}/${vs.list.length * 2} forms correct</h2>${savedHTML(vs.saved || null)}<p class="hint">Time: ${Math.round((Date.now() - vs.start) / 1000)} seconds${S.verbBest ? ' · your best ' + S.verbBest + '/20' : ''}</p>${vs.miss.length ? `<ul>${vs.miss.map(m => `<li><b>${esc(m.base)}</b>: ${esc(m.past)}, ${esc(m.pp)}</li>`).join('')}</ul>` : ''}<div class="row"><button type="button" class="btn go" data-gx="vstart">Sprint again</button><button type="button" class="btn ghost" data-gx="vquit">See all verbs</button></div></div>`;
  const v = vs.list[vs.i];
  return `<div class="card"><div class="card-top"><span class="kicker k-game">Verb ${vs.i + 1} of ${vs.list.length}</span><span class="hint">Score ${vs.score}</span></div><p class="bigword">${esc(v.base)}</p>
    <div class="formgrid"><div class="field"><label for="vp">Simple past</label><input id="vp" class="input" autocomplete="off" autocapitalize="off" spellcheck="false"></div><div class="field"><label for="vpp">Past participle</label><input id="vpp" class="input" autocomplete="off" autocapitalize="off" spellcheck="false"></div></div>
    <div class="row"><button type="button" class="btn go" data-gx="vcheck">Check</button></div>
    ${vs.last ? `<div class="fb ${vs.last.ok ? 'good' : 'bad'}"><b>${vs.last.ok ? 'Both correct!' : 'Correct forms:'}</b> ${esc(vs.last.v.base)} → ${esc(vs.last.v.past)} → ${esc(vs.last.v.pp)}</div>` : ''}</div>`;
}
function labVariant() {
  const L = S.loc, g = LAB && LAB[L.k] && LAB[L.k][L.i]; if (!g) return null;
  return { type: 'multi', title: g.topic, intro: g.explain, items: g.quiz.map(q => ({ text: q.q, options: q.options, answer: q.answer, fb: q.why })), win: `All five correct. ${g.topic} mastered!`, tutor: [{ h: g.topic, p: g.explain }] };
}

/* ---------------- Your subjects (cross-curricular) ---------------- */
function seeded(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = s * 16807 % 2147483647) / 2147483647; }
function xcHTML() {
  const XC = window.COURSE_XC; if (!XC) return `<div class="card"><p>Subject content did not load.</p></div>`;
  const P = S.profile || {}, major = XC.majors.find(m => m.id === P.major), mine = major ? major.subjects : [];
  const AZ = XC.subjects.slice().sort((a, b) => a.name.localeCompare(b.name)); const sub = XC.subjects.find(s => s.id === S.loc.sub) || AZ.find(s => mine.includes(s.id)) || AZ[0];
  let h = `<div class="card"><span class="kicker">Your subjects</span><h1>Communication Studies everywhere</h1><p class="lead">The skills you build here earn marks in every subject. ${major ? `Subjects are listed A–Z; ★ marks your <b>${esc(major.name)}</b> subjects.` : '<button type="button" class="linkbtn" data-go="profile">Set your major</button> to see your subjects first.'}</p>
    <div class="azacc">${Object.entries(AZ.reduce((g, x) => { const L0 = x.name.charAt(0).toUpperCase(); (g[L0] = g[L0] || []).push(x); return g; }, {})).map(([L0, list]) => `<details class="fold azgrp"${list.some(x => x.id === sub.id) ? ' open' : ''}><summary data-notc><span class="azl">${L0}</span> <span class="hint">${list.map(x => (mine.includes(x.id) ? '★ ' : '') + esc(x.name)).join(' · ')}</span></summary><div class="chips">${list.map(s => `<button type="button" class="chip ${s.id === sub.id ? 'sel' : ''}" data-go="xc" data-sub="${s.id}">${mine.includes(s.id) ? '★ ' : ''}${s.icon || ''} ${esc(s.name)}</button>`).join('')}</div></details>`).join('')}</div></div>`;
  h += `<div class="card xcsub" id="xcsub" tabindex="-1"><div class="card-top"><h2>${sub.icon || ''} ${esc(sub.name)}</h2>${listenBtn()}</div><h3>How to use Communication Studies in ${esc(sub.name)}</h3><ul>${sub.hints.map(x => `<li>${x}</li>`).join('')}</ul><div class="tip"><b>Try this:</b> ${sub.task}</div>
    <div class="row"><button type="button" class="btn go" data-go="xq" data-sub="${sub.id}" data-seed="${Date.now() % 100000}">${owns('g-jargon') ? '🔗 Play Jargon Match' : '🔒 Jargon Match (30 coins)'}</button><button type="button" class="btn ghost" data-gx="spellstart" data-id="S${sub.id}">🐝 Spell ${esc(sub.name)} words</button></div></div>`;
  const jt = j => `<div class="gterm"><div class="row" style="justify-content:space-between"><b>${esc(j.term)}</b>${TTS.ok ? `<button type="button" class="tool listen" data-act="speak" data-t="${esc(j.term + '. ' + j.def)}" aria-label="Read ${esc(j.term)} aloud">🔊</button>` : ''}</div><p>${esc(j.def)}</p></div>`;
  const byT = (a, b) => a.term.localeCompare(b.term); const jUnits = [...new Set(sub.jargon.map(j => j.unit).filter(Boolean))], jLoose = sub.jargon.filter(j => !j.unit).sort(byT);
  h += `<div class="card"><h3>${esc(sub.name)} jargon</h3>${jLoose.length ? `<div class="gloss">${jLoose.map(jt).join('')}</div>` : ''}${jUnits.map((u, i) => { const js = sub.jargon.filter(j => j.unit === u).sort(byT); return `<details class="fold"${i === 0 ? ' open' : ''}><summary>${esc(u)} (${js.length} terms)</summary><div><div class="gloss">${js.map(jt).join('')}</div></div></details>`; }).join('')}</div>`;
  const ints = (P.interests || []);
  h += `<div class="card"><h3>Writing prompts from your interests</h3>${ints.length ? `<ul>${ints.flatMap(k => (INTERESTS[k] || []).map(p => `<li><span class="ribbon">${esc(k)}</span> ${esc(p)}</li>`)).join('')}</ul>` : `<p class="hint">Pick your interests on your <button type="button" class="linkbtn" data-go="profile">player card</button> to get prompts made for you.</p>`}</div>`;
  return h;
}
function xcVariant() {
  const XC = window.COURSE_XC, sub = XC && XC.subjects.find(s => s.id === S.loc.sub); if (!sub) return null;
  const r = seeded(+S.loc.seed || 7), pool = sub.jargon.slice().sort(() => r() - 0.5).slice(0, 6);
  return { type: 'match', title: 'Jargon Match: ' + sub.name, intro: 'Match each term to its meaning.', pairs: pool.map(j => ({ l: j.term, r: j.def })), win: 'All matched! You can now use these terms precisely in ' + sub.name + '.', tutor: [{ h: 'Tip', p: '<p>Look for a key word in each definition that echoes the term, then rule out the ones you are sure of first.</p>' }] };
}

/* ---------------- Rebuilding After the Apocalypse (unit game) ---------------- */
const Z = window.COURSE_ZOMBIE || null;
const zDoneSet = () => (S.zdone = S.zdone || {});
const zDayDone = d => Z.days[d].challenges.every(c => zDoneSet()[c.id]);
const zDayOpen = d => S.teacher || OPEN_ALL || d === 0 || zDayDone(d - 1);
const ZX = window.COURSE_ZEXPERT || [];
const ZX_TASKS = ['d1-write', 'd3-write', 'd5-speech', 'd5-manual'];
const zxOf = () => ZX.find(x => x.id === S.zexpert) || null;
function zxPickerHTML(required) {
  const cur = zxOf();
  return `<div class="card zxcard"><h3>🛠 ${required ? 'First, Choose Your Survivor Expertise' : 'Your Survivor Expertise'}</h3><p class="hint">Every survivor must show the Council what they can contribute. Your choice sets the checklist for your expository essay.</p>
    <div class="row"><label for="zx-sel" class="sr">Survivor expertise</label><select id="zx-sel" class="select" style="flex:1 1 260px"><option value="">Select your skill…</option>${ZX.slice().sort((a, b) => (a.id === 'other') - (b.id === 'other') || a.name.localeCompare(b.name)).map(x => `<option value="${x.id}" ${S.zexpert === x.id ? 'selected' : ''}>${x.icon} ${esc(x.name)}</option>`).join('')}</select>${S.zexpert === 'other' ? `<label for="zx-own" class="sr">Name your skill</label><input id="zx-own" class="input" maxlength="40" placeholder="Name your skill" value="${esc(S.zexpertOwn || '')}" style="flex:1 1 200px">` : ''}${S.zexpert === 'other' ? '<button type="button" class="btn gold" data-gx="zxset">Save my skill</button>' : ''}</div>
    ${cur ? zxChecklistHTML(cur) : ''}</div>`;
}
function zxChecklistHTML(x) {
  return `<div class="zxlist" data-notc><h4>${x.icon} ${esc(x.id === 'other' && S.zexpertOwn ? S.zexpertOwn : x.name)}: Your Essay Checklist</h4><p class="hint">Suggested method of exposition: <b>${esc(x.method)}</b>.</p><ol>${x.checklist.map(c => `<li>${esc(c)}</li>`).join('')}</ol><p class="hint">Key terms to use accurately: ${x.terms.map(t => `<span class="chip">${esc(t)}</span>`).join(' ')}</p></div>`;
}
function zxAugment(c) {
  const x = zxOf(); if (!x || !ZX_TASKS.includes(c.id)) return {};
  const nm = x.id === 'other' && S.zexpertOwn ? S.zexpertOwn : x.name;
  const extra = c.id === 'd3-write' ? x.checklist : x.checklist.slice(0, c.id === 'd1-write' ? 2 : 3);
  return { prompt: `<div class="fb note">🛠 <b>Your expertise: ${esc(nm)}.</b> Use the checklist below; every box must be true before you submit. Suggested method: ${esc(x.method)}.</div>` + c.prompt, checklist: c.checklist.concat(extra.map(t => '🛠 ' + t)), zx: x };
}
function zombieHTML() {
  if (!Z) return `<div class="card"><p>The unit did not load.</p></div>`;
  const sk = S.zskill || {};
  let h = `<section class="hero"><span class="eyebrow">Unit game · Rebuilding Council</span><h1 class="apoc-title">${/^Rebuilding After the Apocalypse$/.test(Z.title) ? '<span style="display:block">Rebuilding</span><span style="display:block">After the Apocalypse</span>' : esc(Z.title)}</h1><div>${Z.story}</div><p><b>Your question:</b> ${esc(Z.question || '')}</p></section>`;
  if (ZX.length) h += zxPickerHTML(!S.zexpert);
  h += `<div class="card"><h3>Your skills</h3><div class="tiles">${Z.skills.map(s => { const xp = sk[s.id] || 0, lvl = Math.floor(xp / 40) + 1; return `<div class="tile" style="cursor:default"><span class="ticon">${s.icon}</span><h3>${esc(s.name)}</h3><span class="meta">${esc(s.desc)}</span><span class="ribbon">Skill level ${lvl}</span><div class="pbar"><i style="width:${Math.min(100, (xp % 40) / 40 * 100)}%"></i></div></div>`; }).join('')}</div></div>`;
  h += `<div class="card"><h3>The week</h3><div class="list">${Z.days.map((d, i) => { const open = zDayOpen(i), done = zDayDone(i), n = d.challenges.filter(c => zDoneSet()[c.id]).length; return `<button type="button" class="lrow ${open ? '' : 'locked'}" data-go="zday" data-d="${i}">${ico(done ? 'done' : open ? 'open' : 'lock')}<span class="t"><b>Day ${i + 1}: ${esc(d.title)}</b><br><span class="hint">${esc(d.focus || '')}</span></span><span class="s">${n}/${d.challenges.length}${done && d.badge ? ' · 🏅' : ''}</span></button>`; }).join('')}</div></div>`;
  if (Z.outcomes) h += `<div class="card"><details class="fold"><summary>Learning outcomes</summary><div><ul>${Z.outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul></div></details></div>`;
  if (Z.days.every((_, i) => zDayDone(i)) && Z.finale) h += `<div class="card"><h2>Council complete</h2><div class="html-body">${Z.finale}</div></div>`;
  return h;
}
function zdayHTML() {
  const d = Z.days[S.loc.d]; if (!d) return '';
  if (!zDayOpen(S.loc.d)) return `<div class="card"><p class="fb note">🔒 Finish Day ${S.loc.d} first.</p><button type="button" class="btn ghost" data-go="zombie">Back to the Council</button></div>`;
  const KIND = { choice: '🎯 Quick decision', sort: '🗃️ Sort it', order: '🔢 Sequence', fix: '✂️ Field edit', write: '📝 Writing task' };
  let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="zombie">← Rebuilding Council</button><span>Day ${S.loc.d + 1} of ${Z.days.length}</span></div>`;
  h += `<div class="card"><span class="kicker k-game">Day ${S.loc.d + 1}</span><h1>${esc(d.title)}</h1><div class="html-body">${d.briefing}</div><details class="fold"><summary>Today's lesson</summary><div class="html-body">${d.learn}</div></details></div>`;
  h += `<div class="card"><h3>Challenges</h3><div class="list">${d.challenges.map((c, i) => { const done = zDoneSet()[c.id], sk = Z.skills.find(s => s.id === c.skill) || {}; return `<button type="button" class="lrow" data-go="zc" data-d="${S.loc.d}" data-c="${i}">${ico(done ? 'done' : 'open')}<span class="t"><b>${esc(c.title)}</b><br><span class="hint">${KIND[c.kind] || ''} · ${sk.icon || ''} ${esc(sk.name || '')} · +${c.xp} XP</span></span><span class="s">${done ? 'done' : ''}</span></button>`; }).join('')}</div>
    ${zDayDone(S.loc.d) ? `<div class="fb good"><b>Day complete!</b> ${d.badge ? 'Badge earned: 🏅 ' + esc(d.badge) : ''}</div>${S.loc.d < Z.days.length - 1 ? `<div class="row"><button type="button" class="btn go" data-go="zday" data-d="${S.loc.d + 1}">Day ${S.loc.d + 2} →</button></div>` : ''}` : ''}</div>`;
  return h;
}
function zVariant() {
  const d = Z && Z.days[S.loc.d], c = d && d.challenges[S.loc.c]; if (!c) return null;
  const tutor = [{ h: 'From today\'s lesson', p: d.learn }];
  if (c.kind === 'write') return Object.assign({ tutor }, c, zxAugment(c));
  if (c.kind === 'choice') return { type: 'mcq', title: c.title, q: c.prompt, options: c.options.map((t, i) => ({ t, ok: i === c.answer, fb: i === c.answer ? c.why : 'Not quite. Think again about what the Council needs. ' + c.why })), tutor };
  if (c.kind === 'sort') return { type: 'sort', title: c.title, main: c.prompt, bins: c.bins, items: c.items, win: c.why, tutor };
  if (c.kind === 'order') return { type: 'order', title: c.title, intro: c.prompt, blocks: c.items.map(t => ({ t })), win: c.why, tutor };
  if (c.kind === 'fix') return { type: 'fix', title: c.title, prompt: c.prompt, text: c.text, model: c.model, banned: c.banned || [], why: c.why, tutor };
  return null;
}
function zcHTML() {
  const v = zVariant(); if (!v) return '';
  { const c0 = Z.days[S.loc.d].challenges[S.loc.c]; if (ZX.length && c0 && ZX_TASKS.includes(c0.id) && !S.zexpert) return `<div class="crumbs"><button type="button" class="linkbtn" data-go="zday" data-d="${S.loc.d}">← Day ${S.loc.d + 1}</button></div>` + zxPickerHTML(true); var ZXTOP = (ZX.length && c0 && ZX_TASKS.includes(c0.id)) ? `<details class="fold zxfold" open><summary>🛠 Your expertise and essay checklist</summary><div>${zxPickerHTML(false)}</div></details>` : ''; }
  const d = Z.days[S.loc.d], c = d.challenges[S.loc.c], done = !!zDoneSet()[c.id], sk = Z.skills.find(s => s.id === c.skill) || {};
  let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="zday" data-d="${S.loc.d}">← Day ${S.loc.d + 1}: ${esc(d.title)}</button><span>${sk.icon || ''} ${esc(sk.name || '')} · +${c.xp} XP</span></div>`;
  h += ZXTOP;
  h += `<article class="card"><div class="card-top"><span class="kicker k-game">Challenge ${S.loc.c + 1} of ${d.challenges.length}</span><span class="tools">${listenBtn()}<button type="button" class="tool" data-act="tutor">Mini tutorial</button></span></div><h2>${esc(c.title)}</h2>${activityHTML(v, done, null)}</article>`;
  const nx = S.loc.c < d.challenges.length - 1;
  h += `<div class="nav"><button type="button" class="btn ghost" data-go="zday" data-d="${S.loc.d}">Back to Day ${S.loc.d + 1}</button>${done ? (nx ? `<button type="button" class="btn go" data-go="zc" data-d="${S.loc.d}" data-c="${S.loc.c + 1}">Next challenge →</button>` : `<button type="button" class="btn go" data-go="zday" data-d="${S.loc.d}">Finish the day →</button>`) : '<span class="locked-note">Complete this challenge to continue</span>'}</div>`;
  return h;
}
function fixHTML(v) {
  return `<div class="html-body"><p class="q">${v.prompt}</p></div><div class="clue"><span class="lbl">Field report extract</span><p>${esc(v.text)}</p></div><label for="fixta" class="sr">Your edited version</label><textarea id="fixta" class="ta" style="min-height:110px" data-fix>${esc(T.fix != null ? T.fix : v.text)}</textarea><p class="hint">Cut redundant pairs and stock phrases. Keep the meaning.</p>`;
}
function zDone(viaTutor) {
  const d = Z.days[S.loc.d], c = d.challenges[S.loc.c];
  if (zDoneSet()[c.id]) { render(); return; }
  S.zdone[c.id] = true; S.zskill = S.zskill || {}; S.zskill[c.skill] = (S.zskill[c.skill] || 0) + c.xp;
  reward(viaTutor ? 5 : Math.max(5, Math.round(c.xp / 2)), 'Challenge complete', { xp: c.xp });
  if (zDayDone(S.loc.d)) setTimeout(() => { reward(d.reward || 40, `Day ${S.loc.d + 1} complete${d.badge ? ' · 🏅 ' + d.badge : ''}`, { noBonus: true }); confetti(); }, 1200);
  save(); render();
}

/* ---------------- Escape rooms ---------------- */
const ER = (window.COURSE_ESCAPE && COURSE_ESCAPE.rooms) || [];
function escapeHTML() {
  if (S.loc.room == null || !ER[S.loc.room]) {
    return `<div class="card"><span class="kicker k-game">Escape rooms</span><h1>Can you get out?</h1><p class="lead">Solve every puzzle to collect the digits of the final lock. Hints cost 5 coins, or use a hint token.</p></div><div class="card"><div class="tiles">${gameTiles(g => g.go === 'escape').map(tileHTML).join('')}</div></div>`;
  }
  const R = ER[S.loc.room], g = gameTiles(x => x.room === S.loc.room)[0];
  if (g && g.price && !owns('g-' + g.id)) return `<div class="card"><p class="fb note">🔒 This room is a reward. Unlock it for ${g.price} coins.</p><div class="row"><button type="button" class="btn gold" data-gx="buygame" data-id="${g.id}" data-price="${g.price}" data-name="${esc(g.title)}">Unlock</button><button type="button" class="btn ghost" data-go="escape">All rooms</button></div></div>`;
  const E = T.er, G = window.ESCAPE_GFX, n = R.puzzles.length, rc = `room eg-room eg-r-${esc(R.id)}`;
  egWire();
  if (!E) return `<div class="${rc} eg-intro">${G ? `<div class="eg-scene">${G.scene(R.id)}</div>` : ''}<span class="ribbon">Module ${esc(R.module)} · about ${R.minutes} minutes</span><h1 style="color:#FFE38A">${esc(R.title)}</h1><div class="html-body">${R.story}</div>${S.escBest && S.escBest[R.id] ? `<p class="hint" style="color:#C9D2F0">Your best escape: ${fmtTime(S.escBest[R.id])}</p>` : ''}<div class="row"><button type="button" class="btn gold" data-gx="estart">Enter the room</button><button type="button" class="btn ghost" data-go="escape" style="color:#F1F4FF">All rooms</button></div></div>`;
  const fx = E.fx || ''; E.fx = '';
  let h = `<div class="${rc}"><div class="eg-head"><b>${esc(R.title)}</b><span class="eg-tokens">💡 ${S.hintTokens || 0} hint token${S.hintTokens === 1 ? '' : 's'}</span><span class="timer" id="etimer">⏱ ${fmtTime(E.out || Date.now() - E.start)}</span></div>`;
  if (E.out) {
    // escaped: the door swings open with light pouring in, then the finale
    h += `<div class="eg-final">${egDoorHTML(R, E, 'open')}<div class="eg-finale" role="status"><h2 class="eg-escaped">You escaped in ${fmtTime(E.out)}!</h2>${savedHTML(E.saved)}<div class="html-body">${R.finale || ''}</div>${egInvHTML(R, E)}<div class="row"><button type="button" class="btn go" data-go="escape">More rooms</button><button type="button" class="btn ghost" data-go="games" style="color:#F1F4FF">Games hub</button></div></div></div>`;
  } else if (E.open && E.i >= n) {
    h += `<div class="eg-final eg-close"><div class="eg-bar"><button type="button" class="tool" data-eg="back" style="color:#F1F4FF">← Back to the room</button><span class="ribbon">The final lock</span></div><h2 tabindex="-1" style="color:#F1F4FF">The Final Lock</h2>
      <div class="eg-clue"><span aria-hidden="true">📜</span><div>${esc(R.finalPrompt || 'Enter the digits you collected, in order.')}</div></div>${egInvHTML(R, E)}${egDoorHTML(R, E, fx)}${E.msg ? `<div class="fb bad">${E.msg}</div>` : ''}</div>`;
  } else if (E.open && E.i < n) {
    const p = R.puzzles[E.i], sp = (G && G.spots(R.id)[p.spot]) || {};
    h += `<div class="eg-close"><div class="eg-bar"><button type="button" class="tool" data-eg="back" style="color:#F1F4FF">← Back to the room</button><span class="ribbon">Puzzle ${E.i + 1} of ${n}</span></div><h2 tabindex="-1">${esc(p.title)}</h2>
      <div class="eg-prop eg-p-${esc(p.prop || 'note')}"><span class="eg-pl">${esc(sp.label || 'Clue')}</span>${p.clue}</div><p class="q">${p.prompt || ''}</p>`;
    if (p.type === 'choice') h += `<div class="eg-drawers" role="group" aria-label="Answer drawers">${p.options.map((o, i) => `<button type="button" class="eg-drawer ${E.pick === i ? 'sel' : ''} ${E.solvedNow && i === p.answer ? 'right' : ''}" data-gx="epick" data-i="${i}" aria-pressed="${E.pick === i}"><span class="eg-knob">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
    else if (p.type === 'order') {
      const ord = E.ord || [], cab = ['#FF4B4B', '#FFD23C', '#3CA0FF', '#3CFF8A', '#C77DFF', '#FF9A3C'], cable = b => R.id === 'signal' ? `<span class="eg-cable" style="--c:${cab[b % cab.length]}" aria-hidden="true"></span>` : '';
      h += `<p class="hint" style="color:#C9D2F0">Tap a piece to put it in the next empty slot. Tap a placed piece to take it back.</p><div class="eg-shelf" role="group" aria-label="Slots">${p.items.map((_, pos) => `<div class="eg-socket"><span class="eg-sn" aria-hidden="true">${pos + 1}</span>${ord[pos] != null ? `<button type="button" class="eg-tile placed" data-gx="eorem" data-pos="${pos}" aria-label="Slot ${pos + 1}: ${esc(p.items[ord[pos]])}. Remove">${cable(ord[pos])}<span>${esc(p.items[ord[pos]])}</span><span class="eg-x" aria-hidden="true">✕</span></button>` : `<span class="eg-empty">Slot ${pos + 1} is empty</span>`}</div>`).join('')}</div>`;
      const left = E.pool.filter(b => !ord.includes(b));
      if (left.length) h += `<div class="eg-pool" role="group" aria-label="Pieces to place">${left.map((b, k) => `<button type="button" class="eg-tile" data-gx="eoadd" data-b="${b}" style="--r:${[-1.2, .8, -.5, 1.1, -.9][k % 5]}deg">${cable(b)}<span>${esc(p.items[b])}</span></button>`).join('')}</div>`;
    } else if (p.type === 'code') h += egLockHTML(E.m, false, E.solvedNow ? 'open' : fx, R, p.answer);
    else h += egTypewriterHTML(E);
    if (!E.solvedNow) h += `<div class="row">${p.type === 'code' ? '' : `<button type="button" class="btn gold" data-gx="echeck">${p.type === 'choice' ? 'Pull this drawer' : p.type === 'order' ? 'Test the order' : 'Ring the bell'}</button>`}<button type="button" class="tool" data-gx="ehint" style="color:#F1F4FF">💡 Hint ${E.hint[E.i] >= 2 ? '(all used)' : S.hintTokens ? '(token)' : '(5 coins)'}</button></div>`;
    if (E.hint[E.i] >= 1) h += `<p class="clue"><b>Hint:</b> ${esc(p.hint1)}</p>`;
    if (E.hint[E.i] >= 2) h += `<p class="clue"><b>Hint 2:</b> ${esc(p.hint2)}</p>`;
    if (E.msg) h += `<div class="fb ${E.ok ? 'good' : 'bad'}">${E.msg}</div>`;
    if (E.solvedNow) { const it = egItem(R); h += `<div class="eg-found" role="status"><div class="eg-item">${it.svg}<span class="eg-dg">${esc(p.digit)}</span></div><div><p class="fb good"><b>Solved! You found a ${esc(it.name.toLowerCase())} stamped ${esc(p.digit)}.</b></p><div>${p.explain || ''}</div><div class="row"><button type="button" class="btn go" data-gx="enext">Back to the room →</button></div></div></div>`; }
    h += `</div>`;
  } else {
    // the room itself: point-and-click scene with hotspots
    const live = E.i < n ? ((G && G.spots(R.id)[R.puzzles[E.i].spot]) || {}).label || R.puzzles[E.i].title : (R.doorLabel || 'door');
    h += egSceneHTML(R, E) + `<div class="eg-status" role="status">${E.i < n ? `<span><span class="eg-arrow" aria-hidden="true">👉</span> Something glints near the <b>${esc(live.toLowerCase())}</b>. ${E.i ? `${E.i} of ${n} items found.` : 'Investigate it to find your first item.'}</span><button type="button" class="btn gold" data-eg="hot" data-i="${E.i}">Investigate</button>` : `<span>🔓 All ${n} items found. The <b>${esc(live.toLowerCase())}</b> is waiting.</span><button type="button" class="btn gold" data-eg="door">Go to the door</button>`}</div>` + egInvHTML(R, E, E.got);
    E.got = null;
  }
  return h + `</div>`;
}
/* ---- escape-room graphics helpers (art lives in tools/escapegfx.js as window.ESCAPE_GFX) ---- */
function egItem(R) { const G = window.ESCAPE_GFX; return G ? G.item(G.roomItem(R.id)) : { name: 'Digit card', svg: '' }; }
function egSceneHTML(R, E) {
  const G = window.ESCAPE_GFX, n = R.puzzles.length;
  const spots = G ? G.spots(R.id) : {}, pos = sp => `left:${sp.x / 10}%;top:${sp.y / 6}%;width:${sp.w / 10}%;height:${sp.h / 6}%`;
  let hs = R.puzzles.map((p, i) => {
    const sp = spots[p.spot] || { x: 40 + i * 150, y: 470, w: 120, h: 90, label: p.title };
    const st = E.solved[i] ? 'done' : i === E.i ? 'live' : 'locked';
    const al = `${sp.label}: puzzle ${i + 1}, ${p.title}${st === 'done' ? ' (solved)' : st === 'locked' ? ' (locked: solve the glowing clue first)' : ''}`;
    return `<button type="button" class="eg-hot ${st}${sp.y < 90 ? ' eg-top' : ''}${sp.x < 150 ? ' eg-l' : sp.x + sp.w > 850 ? ' eg-r' : ''}" style="${pos(sp)}" data-eg="hot" data-i="${i}" aria-label="${esc(al)}"${st === 'live' ? '' : ' aria-disabled="true"'}><span class="eg-tag" aria-hidden="true">${esc(sp.label)}</span>${st === 'done' ? '<span class="eg-badge" aria-hidden="true">✓</span>' : st === 'locked' ? '<span class="eg-badge" aria-hidden="true">🔒</span>' : ''}</button>`;
  }).join('');
  const d = spots.door || { x: 430, y: 200, w: 140, h: 230, label: 'Door' }, open = E.i >= n;
  hs += `<button type="button" class="eg-hot door ${open ? 'live' : 'locked'}" style="${pos(d)}" data-eg="door" aria-label="${esc(R.doorLabel || d.label)}${open ? '' : ' (locked: find every item first)'}"${open ? '' : ' aria-disabled="true"'}><span class="eg-tag" aria-hidden="true">${esc(R.doorLabel || d.label)}</span>${open ? '' : '<span class="eg-badge" aria-hidden="true">🔒</span>'}</button>`;
  return `<div class="eg-scene" role="group" aria-label="${esc(R.title)}: the room. Choose an object to investigate.">${G ? G.scene(R.id) : ''}${hs}</div>`;
}
function egInvHTML(R, E, fresh) {
  const it = egItem(R);
  return `<div class="eg-inv" role="list" aria-label="Inventory"><span class="eg-invl" aria-hidden="true">INVENTORY</span>${R.puzzles.map((p, i) => E.solved[i]
    ? `<span role="listitem" class="eg-slot got${fresh === i ? ' new' : ''}" title="${esc(it.name)} ${esc(p.digit)}" aria-label="Item ${i + 1}: ${esc(it.name)} stamped ${esc(p.digit)}"><span class="eg-n" aria-hidden="true">${i + 1}</span>${it.svg}<span class="eg-dg" aria-hidden="true">${esc(p.digit)}</span></span>`
    : `<span role="listitem" class="eg-slot" aria-label="Item ${i + 1}: not found yet"><span class="eg-n" aria-hidden="true">${i + 1}</span>?</span>`).join('')}</div>`;
}
function egTypewriterHTML(E) {
  const key = k => `<button type="button" class="eg-twk" data-eg="tw" data-k="${k}" tabindex="-1" aria-label="${k}">${k}</button>`;
  return `<div class="eg-tw"><div class="eg-twpaper"><label for="ein">Type your answer on the paper</label><input id="ein" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(E.tw || '')}"></div><div class="eg-twbody" aria-hidden="true">${['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map(r => `<div class="eg-twrow">${r.split('').map(key).join('')}</div>`).join('')}<div class="eg-twrow"><button type="button" class="eg-twk space" data-eg="tw" data-k=" " tabindex="-1">space</button><button type="button" class="eg-twk wide" data-eg="twbs" tabindex="-1">⌫ back</button></div></div></div>`;
}
const EG_AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), EG_09 = '0123456789'.split('');
function egNewLock(kind, code, keys) {
  const c = String(code || '').replace(/[^a-z0-9]/gi, '').toUpperCase(), chars = keys ? String(keys).toUpperCase().split('') : /^\d+$/.test(c) ? EG_09 : EG_AZ;
  return { kind: kind || 'padlock', chars, len: c.length, w: Array(c.length).fill(0), seq: [], ang: 0, buf: '' };
}
const egStep = m => 360 / m.chars.length;
const egIdx = m => { const k = m.chars.length; return ((Math.round(-m.ang / egStep(m)) % k) + k) % k; };
const egVal = m => !m ? '' : m.kind === 'padlock' ? m.w.map(i => m.chars[i]).join('') : m.kind === 'vault' ? m.seq.join('') : m.buf;
function egSink(m, fin) { const v = egVal(m); return fin ? Array.from({ length: m.len }, (_, i) => `<input type="hidden" data-lk="${i}" value="${esc(v[i] || '')}">`).join('') : `<input type="hidden" id="ein" value="${esc(v)}">`; }
function egWheelInner(m, i) { const k = m.chars.length, v = m.w[i]; return `<span class="pv">${esc(m.chars[(v + k - 1) % k])}</span><span class="cu">${esc(m.chars[v])}</span><span class="nx">${esc(m.chars[(v + 1) % k])}</span>`; }
function egTumblers(m) { return Array.from({ length: m.len }, (_, i) => `<span class="${m.seq[i] != null ? 'set' : ''}${i === m.seq.length ? ' cur' : ''}"><small>${i % 2 ? 'L' : 'R'}${i + 1}</small>${m.seq[i] != null ? esc(m.seq[i]) : ''}</span>`).join(''); }
function egVaultTip(m) { return m.seq.length < m.len ? `Turn ${m.seq.length + 1} of ${m.len}: turn ${m.seq.length % 2 ? 'left' : 'right'} until the number sits under the red marker, then press Set.` : 'Every number is set. Pull the handle.'; }
function egLcd(m, st) { return st === 'bad' ? 'DENIED' : st === 'open' ? 'OPEN' : (m.buf + '_'.repeat(Math.max(0, m.len - m.buf.length))).slice(0, Math.max(m.len, m.buf.length)); }
/* the three lock mechanisms. part: 'stage' (the physical lock), 'ctl' (controls + hidden answer inputs) */
function egLockParts(m, fin, st, R) {
  const sub = fin ? 'efinal' : 'echeck', k = m.chars.length, reveal = st === 'open' && !fin && R ? `<span class="eg-reveal" aria-hidden="true">${egItem(R).svg}</span>` : '';
  if (m.kind === 'vault') {
    const bolts = Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `<i style="left:calc(${(50 + Math.cos(a) * 45).toFixed(1)}% - 6px);top:calc(${(50 + Math.sin(a) * 45).toFixed(1)}% - 6px)"></i>`; }).join('');
    const cur = m.chars[egIdx(m)];
    return {
      stage: `<div class="eg-vaultbay${fin ? ' hole' : ''}">${fin && window.ESCAPE_GFX && window.ESCAPE_GFX.beyond ? `<div class="eg-vhole" aria-hidden="true">${window.ESCAPE_GFX.beyond(R && R.id)}</div>` : ''}${reveal}<div class="eg-vault"><span class="eg-bolts">${bolts}</span><div class="eg-spokes" aria-hidden="true"><i></i><i style="transform:rotate(60deg)"></i><i style="transform:rotate(120deg)"></i></div><div class="eg-vread" aria-hidden="true">${esc(cur)}</div><span class="eg-ind" aria-hidden="true"></span><div class="eg-dialwrap"><div class="eg-dial" tabindex="0" role="slider" aria-label="Vault dial: arrow keys turn it, Enter sets the number" aria-valuemin="0" aria-valuemax="${k - 1}" aria-valuenow="${egIdx(m)}" aria-valuetext="${esc(cur)}" data-eg-dial style="transform:rotate(${m.ang}deg)">${window.ESCAPE_GFX ? window.ESCAPE_GFX.dialFace(m.chars) : ''}<span class="eg-knurl"></span></div></div></div></div>`,
      ctl: `<div class="eg-tumblers" aria-label="Numbers set so far">${egTumblers(m)}</div><p class="eg-tip" aria-live="polite">${egVaultTip(m)}</p><div class="eg-ctl"><button type="button" class="tool" data-eg="vl" style="color:#F1F4FF" aria-label="Turn the dial left">⟲ Left</button><button type="button" class="btn gold" data-eg="vset">Set number</button><button type="button" class="tool" data-eg="vr" style="color:#F1F4FF" aria-label="Turn the dial right">Right ⟳</button><button type="button" class="tool" data-eg="vundo" style="color:#F1F4FF">Undo</button></div><div class="eg-ctl"><button type="button" class="btn go" data-gx="${sub}">Pull the handle</button></div>${egSink(m, fin)}`
    };
  }
  if (m.kind === 'keypad') {
    const keys = (m.chars === EG_09 ? '123456789'.split('').concat(['CLR', '0']) : m.chars.concat(['⌫', 'CLR'])).map(c => c === 'CLR' ? `<button type="button" class="eg-key fn" data-eg="kclr">CLR</button>` : c === '⌫' ? `<button type="button" class="eg-key fn" data-eg="kbs" aria-label="Delete">⌫</button>` : `<button type="button" class="eg-key" data-eg="kp" data-k="${esc(c)}">${esc(c)}</button>`).join('');
    return {
      stage: `<div class="eg-keypad" role="group" aria-label="Keypad"><span class="eg-screws" aria-hidden="true"><i style="left:6px;top:6px"></i><i style="right:6px;top:6px"></i><i style="left:6px;bottom:6px"></i><i style="right:6px;bottom:6px"></i></span><span class="eg-bolt" aria-hidden="true"></span><div class="eg-kp-top"><span class="eg-led" aria-hidden="true"></span><div class="eg-lcd" aria-live="polite">${esc(egLcd(m, st))}</div></div><div class="eg-keys">${keys}<button type="button" class="eg-key ent" data-gx="${sub}">ENTER</button></div></div>`,
      ctl: `<p class="eg-tip">Press the keys (or type on your keyboard), then ENTER.</p>${egSink(m, fin)}`
    };
  }
  const brand = { library: 'ST. JOHN’S · 1863', creole: 'MARKET STREET', signal: 'ISLAND WAVE' }[R && R.id] || 'BRASS';
  const wheels = m.w.map((_, i) => `<div class="eg-wh"><button type="button" class="eg-whb" data-eg="wup" data-w="${i}" tabindex="-1" aria-label="Wheel ${i + 1} up">▲</button><div class="eg-wheel" tabindex="0" role="spinbutton" aria-label="Wheel ${i + 1}" aria-valuemin="0" aria-valuemax="${k - 1}" aria-valuenow="${m.w[i]}" aria-valuetext="${esc(m.chars[m.w[i]])}" data-eg-wheel="${i}">${egWheelInner(m, i)}</div><button type="button" class="eg-whb" data-eg="wdn" data-w="${i}" tabindex="-1" aria-label="Wheel ${i + 1} down">▼</button></div>`).join('');
  return {
    stage: `<div class="eg-chained">${reveal}<span class="eg-chain a" aria-hidden="true"></span><span class="eg-chain b" aria-hidden="true"></span><div class="eg-padlock"><div class="eg-shackle" aria-hidden="true"></div><div class="eg-plbody"><span class="eg-brand" aria-hidden="true">${brand}</span><div class="eg-wheels" role="group" aria-label="Padlock wheels: arrow keys or typing spin them">${wheels}</div></div></div></div>`,
    ctl: `<p class="eg-tip">Spin each wheel with ▲ ▼, the arrow keys or by typing, then pull the shackle.</p><div class="eg-ctl"><button type="button" class="btn gold" data-gx="${sub}">Pull the shackle</button></div>${egSink(m, fin)}`
  };
}
function egSetTo(m, code) { const c = String(code || '').replace(/[^a-z0-9]/gi, '').toUpperCase().split(''); if (m.kind === 'padlock') m.w = c.map(ch => Math.max(0, m.chars.indexOf(ch))); else if (m.kind === 'vault') { m.seq = c; m.ang = -Math.max(0, m.chars.indexOf(c[c.length - 1])) * egStep(m); } else m.buf = c.join(''); }
function egLockHTML(m, fin, st, R, code) { if (st === 'open' && code != null) egSetTo(m, code); const P = egLockParts(m, fin, st, R); return `<div class="eg-mech eg-m-${m.kind} ${st || ''}" data-eg-lock="${fin ? 'f' : 'p'}">${P.stage}${st === 'open' ? egSink(m, fin) : P.ctl}</div>`; }
function egDoorHTML(R, E, st) {
  if (!E.fm) E.fm = egNewLock(R.finalLock || 'padlock', R.finalCode);
  if (st === 'open') egSetTo(E.fm, R.finalCode);
  const m = E.fm, P = egLockParts(m, true, st, R), leaf = m.kind === 'vault' ? 'wall' : m.kind === 'keypad' ? 'steel' : 'iron';
  const extra = m.kind === 'keypad' ? '<span class="eg-porthole" aria-hidden="true"></span><span class="eg-handle" aria-hidden="true"></span>' : '';
  return `<div class="eg-mech eg-m-${m.kind} ${st || ''}" data-eg-lock="f"><div class="eg-doorway ${m.kind}${st === 'open' ? ' opening' : ''}" role="img" aria-label="${esc(R.doorLabel || 'The door')}${st === 'open' ? ' swinging open' : ''}"><div class="eg-beyond">${window.ESCAPE_GFX && window.ESCAPE_GFX.beyond ? window.ESCAPE_GFX.beyond(R.id) : ''}</div><div class="eg-leaf ${leaf}">${extra}${P.stage}</div></div>${st === 'open' ? egSink(m, true) : P.ctl}</div>`;
}
/* sound effects: WebAudio only, gated by the course sound setting */
function egSfx(kind) {
  if (S.sound === false) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = AC.currentTime;
    const click = (f, d, v, at) => { const len = Math.max(1, Math.floor(AC.sampleRate * d)), b = AC.createBuffer(1, len, AC.sampleRate), ch = b.getChannelData(0); for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); const s = AC.createBufferSource(), bp = AC.createBiquadFilter(), g = AC.createGain(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 2; g.gain.value = v; s.buffer = b; s.connect(bp).connect(g).connect(AC.destination); s.start(t0 + (at || 0)); };
    const tone = (type, f1, f2, d, v, at) => { const o = AC.createOscillator(), g = AC.createGain(), t = t0 + (at || 0); o.type = type; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + d); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.connect(g).connect(AC.destination); o.start(t); o.stop(t + d + 0.02); };
    if (kind === 'tick') click(3200, 0.012, 0.5);
    else if (kind === 'type') { click(1800, 0.025, 0.7); click(500, 0.04, 0.4, 0.01); }
    else if (kind === 'beep') tone('sine', 1250, 1250, 0.08, 0.14);
    else if (kind === 'set') { click(1400, 0.03, 0.8); tone('triangle', 660, 880, 0.08, 0.08, 0.02); }
    else if (kind === 'step') { click(700, 0.06, 0.5); click(500, 0.06, 0.4, 0.12); }
    else if (kind === 'bad') { tone('sawtooth', 170, 110, 0.3, 0.09); tone('square', 120, 90, 0.25, 0.05, 0.12); }
    else if (kind === 'unlock') { click(2600, 0.02, 0.9); click(900, 0.06, 0.9, 0.09); tone('triangle', 520, 1040, 0.3, 0.1, 0.16); }
    else if (kind === 'creak') { tone('sawtooth', 70, 140, 1.1, 0.04); tone('sine', 55, 40, 0.5, 0.12, 1.0); click(220, 0.2, 0.6, 1.05); }
  } catch (e) { }
}
/* in-place updates so dials turn smoothly without re-rendering the room */
function egLockOf(el) { const c = el && el.closest && el.closest('[data-eg-lock]'); if (!c || !T.er) return null; return { c, m: c.dataset.egLock === 'f' ? T.er.fm : T.er.m, fin: c.dataset.egLock === 'f' }; }
function egPaint(L, dir, wi) {
  const { c, m } = L, v = egVal(m), ein = c.querySelector('#ein'); if (ein) ein.value = v;
  c.querySelectorAll('[data-lk]').forEach((x, i) => { x.value = v[i] || ''; });
  if (m.kind === 'padlock' && wi != null) { const w = c.querySelector(`[data-eg-wheel="${wi}"]`); if (w) { w.innerHTML = egWheelInner(m, wi); w.setAttribute('aria-valuenow', m.w[wi]); w.setAttribute('aria-valuetext', m.chars[m.w[wi]]); w.classList.remove('up', 'dn'); void w.offsetWidth; w.classList.add(dir > 0 ? 'up' : 'dn'); } }
  if (m.kind === 'vault') {
    const d = c.querySelector('[data-eg-dial]'), cur = m.chars[egIdx(m)];
    if (d) { d.style.transform = `rotate(${m.ang}deg)`; d.setAttribute('aria-valuenow', egIdx(m)); d.setAttribute('aria-valuetext', cur); }
    const r = c.querySelector('.eg-vread'); if (r) r.textContent = cur;
    const tb = c.querySelector('.eg-tumblers'); if (tb) tb.innerHTML = egTumblers(m);
    const tp = c.querySelector('.eg-tip'); if (tp) tp.textContent = egVaultTip(m);
  }
  if (m.kind === 'keypad') { const l = c.querySelector('.eg-lcd'); if (l) l.textContent = egLcd(m, ''); c.classList.remove('bad'); }
}
function egTurn(L, d) { const m = L.m; m.ang += d * egStep(m); egPaint(L); egSfx('tick'); }
function egAct(a, el) {
  const E = T.er; if (!E) return;
  const R = ER[S.loc.room]; if (!R) return;
  if (a === 'hot') {
    const i = +el.dataset.i;
    if (E.out) return;
    if (E.solved[i]) { toast('Already solved. Its item is in your inventory.'); return; }
    if (i !== E.i) { toast('Locked for now. Solve the glowing clue first.'); return; }
    E.open = true; renderStage(); egSfx('step'); egFocus('.eg-close h2'); return;
  }
  if (a === 'door') { if (E.i < R.puzzles.length) { toast('The door is locked. Find every item first.'); return; } E.open = true; renderStage(); egSfx('step'); egFocus('.eg-close h2'); return; }
  if (a === 'back') { E.open = false; E.msg = ''; renderStage(); egFocus('.eg-hot.live'); return; }
  if (a === 'tw' || a === 'twbs') { const inp = $('#ein'); if (!inp) return; inp.value = a === 'tw' ? inp.value + el.dataset.k : inp.value.slice(0, -1); E.tw = inp.value; egSfx('type'); el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit'); return; }
  const L = egLockOf(el); if (!L || !L.m || E.solvedNow) return; const m = L.m;
  if (a === 'wup' || a === 'wdn') { const wi = +el.dataset.w, d = a === 'wup' ? 1 : -1; m.w[wi] = (m.w[wi] + d + m.chars.length) % m.chars.length; egPaint(L, d, wi); egSfx('tick'); }
  else if (a === 'vl') egTurn(L, -1);
  else if (a === 'vr') egTurn(L, 1);
  else if (a === 'vset') { if (m.seq.length < m.len) { m.seq.push(m.chars[egIdx(m)]); egPaint(L); egSfx('set'); } }
  else if (a === 'vundo') { m.seq.pop(); egPaint(L); egSfx('tick'); }
  else if (a === 'kp') { if (m.buf.length < Math.max(m.len, 8)) m.buf += el.dataset.k; egPaint(L); egSfx('beep'); }
  else if (a === 'kclr') { m.buf = ''; egPaint(L); egSfx('beep'); }
  else if (a === 'kbs') { m.buf = m.buf.slice(0, -1); egPaint(L); egSfx('beep'); }
}
function egFocus(sel) { setTimeout(() => { const x = document.querySelector(sel); if (x) { try { x.focus({ preventScroll: false }); if (x.scrollIntoView) x.scrollIntoView({ block: 'nearest' }); } catch (e) { } } }, 30); }
let egWired = false;
function egWire() {
  if (egWired) return; egWired = true;
  document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-eg]'); if (b && S.loc.v === 'escape') egAct(b.dataset.eg, b); });
  document.addEventListener('input', e => { if (e.target.id === 'ein' && T.er && S.loc.v === 'escape') T.er.tw = e.target.value; });
  document.addEventListener('keydown', e => {
    if (S.loc.v !== 'escape' || !T.er || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target, L = egLockOf(t), K = e.key, up = K.length === 1 ? K.toUpperCase() : '';
    if (t.id === 'ein' && K.length === 1) { egSfx('type'); return; }
    if (!L || !L.m || T.er.solvedNow) return; const m = L.m;
    if (t.matches('[data-eg-wheel]')) {
      const wi = +t.dataset.egWheel, k = m.chars.length;
      if (K === 'ArrowUp' || K === 'ArrowDown') { e.preventDefault(); const d = K === 'ArrowUp' ? 1 : -1; m.w[wi] = (m.w[wi] + d + k) % k; egPaint(L, d, wi); egSfx('tick'); }
      else if (K === 'ArrowLeft' || K === 'ArrowRight') { e.preventDefault(); const nx = L.c.querySelector(`[data-eg-wheel="${wi + (K === 'ArrowRight' ? 1 : -1)}"]`); if (nx) nx.focus(); }
      else if (up && m.chars.includes(up)) { e.preventDefault(); m.w[wi] = m.chars.indexOf(up); egPaint(L, 1, wi); egSfx('tick'); const nx = L.c.querySelector(`[data-eg-wheel="${wi + 1}"]`); if (nx) nx.focus(); }
      else if (K === 'Enter') { e.preventDefault(); const s = L.c.querySelector(L.fin ? '[data-gx="efinal"]' : '[data-gx="echeck"]'); if (s) s.click(); }
    } else if (t.matches('[data-eg-dial]')) {
      if (K === 'ArrowRight' || K === 'ArrowUp') { e.preventDefault(); egTurn(L, 1); }
      else if (K === 'ArrowLeft' || K === 'ArrowDown') { e.preventDefault(); egTurn(L, -1); }
      else if (K === 'Enter' || K === ' ') { e.preventDefault(); egAct('vset', t); }
      else if (K === 'Backspace') { e.preventDefault(); egAct('vundo', t); }
      else if (up && m.chars.includes(up)) { e.preventDefault(); const st = egStep(m), want = -m.chars.indexOf(up) * st; m.ang = want + Math.round((m.ang - want) / 360) * 360; egPaint(L); egSfx('tick'); }
    } else if (m.kind === 'keypad' && t.closest('.eg-keypad')) {
      if (up && m.chars.includes(up)) { e.preventDefault(); const kb = L.c.querySelector(`[data-eg="kp"][data-k="${up}"]`); if (kb) { kb.classList.remove('hit'); void kb.offsetWidth; kb.classList.add('hit'); egAct('kp', kb); } }
      else if (K === 'Backspace') { e.preventDefault(); egAct('kbs', t); }
    }
  });
  // drag to turn: the vault dial rotates with the pointer, padlock wheels roll with a vertical drag
  let drag = null;
  document.addEventListener('pointerdown', e => {
    const t = e.target.closest && e.target.closest('[data-eg-dial],[data-eg-wheel]'); if (!t || !T.er || T.er.solvedNow) return;
    const L = egLockOf(t); if (!L || !L.m) return;
    const r = t.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    drag = { t, L, cx, cy, a: Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI, ang0: L.m.ang, acc: 0, y: e.clientY, wi: t.dataset.egWheel != null ? +t.dataset.egWheel : null };
    try { t.setPointerCapture(e.pointerId); } catch (x) { }
    t.focus(); e.preventDefault();
  });
  document.addEventListener('pointermove', e => {
    if (!drag) return; const { L, wi } = drag, m = L.m;
    if (wi != null) { const dy = drag.y - e.clientY; if (Math.abs(dy) >= 22) { const d = dy > 0 ? 1 : -1; m.w[wi] = (m.w[wi] + d + m.chars.length) % m.chars.length; drag.y = e.clientY; egPaint(L, d, wi); egSfx('tick'); } return; }
    const a = Math.atan2(e.clientY - drag.cy, e.clientX - drag.cx) * 180 / Math.PI; let da = a - drag.a; if (da > 180) da -= 360; if (da < -180) da += 360; drag.acc += da; drag.a = a;
    const st = egStep(m), na = Math.round((drag.ang0 + drag.acc) / st) * st; if (na !== m.ang) { m.ang = na; egPaint(L); egSfx('tick'); }
  });
  const end = () => { drag = null; };
  document.addEventListener('pointerup', end); document.addEventListener('pointercancel', end);
}
const fmtTime = ms => { const s = Math.round(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
function tickEscape() { const el = $('#etimer'); if (!el || !T.er) return; el.textContent = '⏱ ' + fmtTime((T.er.out || Date.now() - T.er.start)); }
setInterval(tickEscape, 1000);
const normA = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');


/* ---------------- micro-credentials + certificate (PDF) ---------------- */
const realModDone = m => m.units.every(u => (S.prog[u.id] || 0) >= u.screens.length) && testPassed(m) && !!S.p2[m.id];
const realCourseDone = () => MODS.length > 0 && MODS.every(realModDone);
const MICRO = { M1: ['Information Researcher', '🔎'], M2: ['Language & Community Analyst', '🗣️'], M3: ['Strategic Communicator', '📣'], P3: ['Research & Production Specialist', '🎬'] };
const FACIL = () => S.facilitator || 'Ms. Kester Small';
function stampDates() {
  S.cdates = S.cdates || {}; let ch = false; const today = new Date().toISOString().slice(0, 10);
  MODS.forEach(m => { if (realModDone(m) && !S.cdates[m.id]) { S.cdates[m.id] = today; ch = true; setTimeout(() => toast(`🎖️ Micro-credential earned: ${(MICRO[m.id] || [m.title])[0]}`), 600); } });
  if (realCourseDone() && !S.cdates.all) { S.cdates.all = today; ch = true; setTimeout(() => { toast('🎓 Certificate of Achievement unlocked!'); confetti(); }, 1400); }
  return ch;
}
const fmtDate = iso => { try { return new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return iso; } };
function certId(name, kind, date) { let h = 2166136261; const s = name + '|' + kind + '|' + date; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return 'CS-' + (h >>> 0).toString(36).toUpperCase().padStart(7, '0').slice(0, 7) + '-' + date.replace(/-/g, '').slice(2); }
function drawCert(o) {
  const W = 2000, H = 1414, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); if (!x) return null;
  const serif = 'Georgia, "Times New Roman", serif', sans = '"Inter", "Segoe UI", Arial, sans-serif';
  const gold = (y0, y1) => { const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#FFF3B0'); g.addColorStop(.35, '#E6B53A'); g.addColorStop(.6, '#A9790F'); g.addColorStop(1, '#F5D36B'); return g; };
  x.fillStyle = '#FFFDF5'; x.fillRect(0, 0, W, H);
  const rg = x.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, 1300); rg.addColorStop(0, 'rgba(255,255,255,0)'); rg.addColorStop(1, 'rgba(14,31,85,.10)'); x.fillStyle = rg; x.fillRect(0, 0, W, H);
  x.save(); x.globalAlpha = .07; x.strokeStyle = '#B08A1E'; x.lineWidth = 2;
  for (let k = 0; k < 26; k++) { x.beginPath(); for (let i = 0; i <= W; i += 8) { const y = H / 2 + Math.sin(i / 90 + k * .45) * (260 + k * 9) * Math.cos(i / 520); i ? x.lineTo(i, y) : x.moveTo(i, y); } x.stroke(); }
  x.restore();
  x.fillStyle = '#0E1F55'; x.fillRect(0, 0, W, 34); x.fillRect(0, H - 34, W, 34); x.fillRect(0, 0, 34, H); x.fillRect(W - 34, 0, 34, H);
  x.lineWidth = 16; x.strokeStyle = gold(0, H); x.strokeRect(50, 50, W - 100, H - 100);
  x.lineWidth = 3; x.strokeStyle = '#0E1F55'; x.strokeRect(80, 80, W - 160, H - 160);
  x.lineWidth = 2; x.strokeStyle = '#C9971A'; x.strokeRect(92, 92, W - 184, H - 184);
  [[92, 92], [W - 92, 92], [92, H - 92], [W - 92, H - 92]].forEach(([cx, cy]) => { x.save(); x.translate(cx, cy); x.rotate(Math.PI / 4); x.fillStyle = gold(-24, 24); x.fillRect(-22, -22, 44, 44); x.fillStyle = '#0E1F55'; x.fillRect(-9, -9, 18, 18); x.restore(); });
  x.textAlign = 'center'; x.textBaseline = 'alphabetic';
  x.fillStyle = '#0E1F55'; x.font = `700 34px ${sans}`; const tracked = (t, y, sp) => { const w = [...t].reduce((a, ch) => a + x.measureText(ch).width + sp, -sp); let px = W / 2 - w / 2; x.textAlign = 'left'; [...t].forEach(ch => { x.fillText(ch, px, y); px += x.measureText(ch).width + sp; }); x.textAlign = 'center'; };
  tracked('CAPE COMMUNICATION STUDIES', 210, 9);
  const rr = (rx, ry, rw, rh, r) => { x.beginPath(); x.moveTo(rx + r, ry); x.arcTo(rx + rw, ry, rx + rw, ry + rh, r); x.arcTo(rx + rw, ry + rh, rx, ry + rh, r); x.arcTo(rx, ry + rh, rx, ry, r); x.arcTo(rx, ry, rx + rw, ry, r); x.closePath(); };
  x.font = `italic 700 ${o.micro ? 92 : 104}px ${serif}`;
  x.fillStyle = gold(230, 330); x.shadowColor = 'rgba(14,31,85,.25)'; x.shadowOffsetY = 4; x.shadowBlur = 6;
  x.shadowColor = 'rgba(14,31,85,.45)'; x.shadowOffsetY = 5; x.shadowBlur = 10; x.fillText(o.title, W / 2, 330); x.shadowColor = 'transparent'; x.lineWidth = 2.2; x.strokeStyle = '#1B3480'; x.strokeText(o.title, W / 2, 330);
  if (o.subtitle) { x.font = `600 40px ${sans}`; x.fillStyle = '#0E1F55'; x.fillText(o.subtitle, W / 2, 414); }
  x.font = `italic 400 40px ${serif}`; x.fillStyle = '#3A4A78'; x.fillText('This certifies that', W / 2, o.micro ? 492 : 466);
  const NY = o.micro ? 650 : 620; let ns = 120; x.font = `700 ${ns}px ${serif}`; while (x.measureText(o.name).width > 1450 && ns > 60) { ns -= 4; x.font = `700 ${ns}px ${serif}`; }
  x.fillStyle = '#0E1F55'; x.shadowColor = 'rgba(169,121,15,.55)'; x.shadowOffsetY = 5; x.shadowBlur = 8; x.fillText(o.name, W / 2, NY); x.shadowColor = 'transparent'; x.lineWidth = 2.6; x.strokeStyle = gold(NY - ns, NY); x.strokeText(o.name, W / 2, NY);
  x.strokeStyle = gold(0, 10); x.lineWidth = 4; x.beginPath(); x.moveTo(W / 2 - 600, NY + 35); x.lineTo(W / 2 + 600, NY + 35); x.stroke();
  x.font = `400 38px ${serif}`; x.fillStyle = '#26345E';
  const wrap = (t, y, maxW, lh) => { const words = t.split(' '); let line = ''; const lines = []; words.forEach(w => { const tt = line ? line + ' ' + w : w; if (x.measureText(tt).width > maxW) { lines.push(line); line = w; } else line = tt; }); lines.push(line); lines.forEach((l, i) => x.fillText(l, W / 2, y + i * lh)); return y + lines.length * lh; };
  let y = wrap(o.body, NY + 115, 1500, 54);
  if (o.list) { x.font = `600 32px ${sans}`; x.fillStyle = '#0E1F55'; o.list.forEach((l, i) => x.fillText(l, W / 2, y + 20 + i * 44)); y += 20 + o.list.length * 44; }
  const by = 1150;
  x.textAlign = 'center'; x.strokeStyle = '#0E1F55'; x.lineWidth = 2;
  x.beginPath(); x.moveTo(260, by); x.lineTo(820, by); x.stroke(); x.beginPath(); x.moveTo(W - 820, by); x.lineTo(W - 260, by); x.stroke();
  x.font = `italic 400 64px "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive`; x.fillStyle = '#1B2E73'; x.fillText(o.facil, 540, by - 18);
  x.font = `700 32px ${sans}`; x.fillStyle = '#0E1F55'; x.fillText(o.facil, 540, by + 46); x.font = `400 28px ${sans}`; x.fillStyle = '#3A4A78'; x.fillText('Course Facilitator', 540, by + 84);
  x.font = `700 44px ${serif}`; x.fillStyle = '#0E1F55'; x.fillText(o.date, W - 540, by - 22); x.font = `700 32px ${sans}`; x.fillText('Date of Completion', W - 540, by + 46);
  x.font = `400 26px ${sans}`; x.fillStyle = '#3A4A78'; x.fillText('Certificate ID: ' + o.id, W / 2, H - 104);
  const sx = W / 2, sy = by - 34, R = 84; x.save(); x.translate(sx, sy);
  x.beginPath(); for (let i = 0; i < 48; i++) { const a = i / 48 * Math.PI * 2, r = i % 2 ? R : R + 11; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fillStyle = gold(-R, R); x.fill(); x.lineWidth = 3; x.strokeStyle = '#8A6210'; x.stroke();
  x.beginPath(); x.arc(0, 0, R - 9, 0, Math.PI * 2); x.fillStyle = '#0E1F55'; x.fill(); x.lineWidth = 4; x.strokeStyle = '#F5C542'; x.stroke();
  x.beginPath(); x.arc(0, 0, R - 16, 0, Math.PI * 2); x.lineWidth = 1.5; x.stroke();
  x.fillStyle = '#F5C542'; x.font = `800 22px ${sans}`; x.fillText(o.micro ? 'MICRO' : 'CAPE', 0, -22); x.font = `800 ${o.micro ? 16 : 15}px ${sans}`; x.fillText(o.micro ? 'CREDENTIAL' : 'COMM STUDIES', 0, 2);
  x.font = `700 24px ${serif}`; x.fillText('★ ★ ★', 0, 34); x.restore();
  if (o.preview) { x.save(); x.translate(W / 2, H / 2); x.rotate(-0.42); x.font = `900 260px ${sans}`; x.fillStyle = 'rgba(200,40,40,.16)'; x.fillText('PREVIEW', 0, 90); x.restore(); }
  return c;
}
function certSpec(kind, preview, nameOverride) {
  const name = (nameOverride || S.name || 'Student Name').trim();
  if (kind === 'all') { const date = (S.cdates && S.cdates.all) || new Date().toISOString().slice(0, 10); return { title: 'Certificate of Achievement', name, body: 'has successfully completed the CAPE Communication Studies interactive course, including every lesson, module test and exam essay in:', list: MODS.map(m => m.title.toLowerCase().startsWith(m.code.toLowerCase()) ? m.title : `${m.code}: ${m.title}`), facil: FACIL(), date: fmtDate(date), id: certId(name, 'all', date), preview, file: `Certificate - ${name}.pdf` }; }
  const m = mod(kind), mc = MICRO[kind] || [m.title], date = (S.cdates && S.cdates[kind]) || new Date().toISOString().slice(0, 10);
  return { micro: 1, title: 'Micro-Credential', subtitle: mc[0], name, body: `has earned this micro-credential by completing ${m.title.toLowerCase().startsWith(m.code.toLowerCase()) ? m.title : m.code + ': ' + m.title}, passing the module test${S.tests[m.id] != null ? ' (best score ' + S.tests[m.id] + '%)' : ''} and submitting the exam essay.`, facil: FACIL(), date: fmtDate(date), id: certId(name, kind, date), preview, file: `Micro-credential ${m.code} - ${name}.pdf` };
}
function jpegToPdf(dataUrl, wPx, hPx) {
  const b64 = dataUrl.split(',')[1], bin = atob(b64), img = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) img[i] = bin.charCodeAt(i);
  const PW = 842, PH = 595, enc = s => new TextEncoder().encode(s), parts = [], offs = []; let len = 0;
  const push = u => { parts.push(u); len += u.length; };
  push(enc('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n'));
  const obj = (n, body) => { offs[n] = len; push(enc(`${n} 0 obj\n`)); body.forEach(push); push(enc('\nendobj\n')); };
  obj(1, [enc('<< /Type /Catalog /Pages 2 0 R >>')]);
  obj(2, [enc('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')]);
  obj(3, [enc(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`)]);
  obj(4, [enc(`<< /Type /XObject /Subtype /Image /Width ${wPx} /Height ${hPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.length} >>\nstream\n`), img, enc('\nendstream')]);
  const cs = `q ${PW} 0 0 ${PH} 0 0 cm /Im0 Do Q`; obj(5, [enc(`<< /Length ${cs.length} >>\nstream\n${cs}\nendstream`)]);
  const xref = len; let t = `xref\n0 6\n0000000000 65535 f \n`; for (let n = 1; n <= 5; n++) t += String(offs[n]).padStart(10, '0') + ' 00000 n \n';
  push(enc(t + `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`));
  const out = new Uint8Array(len); let p = 0; parts.forEach(u => { out.set(u, p); p += u.length; }); return out;
}
let DLNS; if (window.claude && typeof window.claude.use === 'function') { try { window.claude.use('downloads').then(d => { DLNS = d; }).catch(() => { DLNS = null; }); } catch (e) { } }
async function offerFile(filename, blob) {
  if (DLNS) { try { await DLNS.save({ filename, data: blob }); return true; } catch (e) { if (e && e.code === 'declined') return false; } }
  try { const u = URL.createObjectURL(blob), a = document.createElement('a'); a.href = u; a.download = filename; a.dataset.direct = '1'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); return true; } catch (e) { toast('Download is not available here. Use Print instead.'); return false; }
}
window.offerFile = offerFile;
/* games and simulators: files they make (dm:file) and links back to the notes (dm:nav) */
window.addEventListener('message', ev => {
  const d = ev && ev.data; if (!d || typeof d !== 'object' || (d.type !== 'dm:file' && d.type !== 'dm:nav')) return;
  let ok = false; try { ok = Array.prototype.some.call(document.querySelectorAll('iframe'), f => f.contentWindow === ev.source); } catch (e) { ok = false; }
  if (!ok) return;
  if (d.type === 'dm:file') { if (typeof Blob !== 'undefined' && d.data instanceof Blob) offerFile(String(d.filename || 'download').replace(/[\\/:*?"<>|]+/g, '_').slice(0, 120), d.data); return; }
  const l = hashLoc(locHash(d.loc || {})); if (!l) return;
  if ((l.v === 'unit' || l.v === 'screen') && !unitReleased(mod(l.m), l.u)) { toast('That lesson is not open yet.'); return; }
  try { closeGameFull(true); } catch (e) { }
  go(l);
});
/* route every <a download> in the course (and tools) through the artifact downloads capability when present */
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[download]'); if (!a || a.dataset.direct || !DLNS) return;
  const href = a.getAttribute('href') || ''; if (!/^(blob:|data:)/.test(href)) return;
  e.preventDefault(); fetch(href).then(r => r.blob()).then(b => DLNS.save({ filename: a.getAttribute('download') || 'download', data: b })).catch(() => { a.dataset.direct = '1'; a.click(); delete a.dataset.direct; });
}, true);
let CPREV = { kind: 'all', name: '', wm: true };
function certPreviewHTML(spec) { const c = drawCert(spec); const src = c ? c.toDataURL('image/jpeg', .9) : ''; return src ? `<img class="certimg" alt="${esc(spec.title + ' for ' + spec.name)}" src="${src}">` : `<div class="cert"><span class="lbl">${esc(spec.title)}</span><p class="who">${esc(spec.name)}</p><p>${esc(spec.date)}</p></div>`; }
function credsHTML() {
  stampDates();
  const T0 = S.teacher, all = realCourseDone();
  let h = `<section class="hero"><span class="eyebrow">Credentials</span><h1>Micro-Credentials & Certificate</h1><p>Earn a micro-credential for each module you complete (every lesson, the module test at 70% or more, and the exam essay). Earn all four and your Certificate of Achievement unlocks, ready to download as a PDF.</p></section>`;
  h += `<div class="card"><h2>Your Micro-Credentials</h2><div class="tiles">${MODS.map(m => { const got = realModDone(m), mc = MICRO[m.id] || [m.title, '🎖️'], d = S.cdates && S.cdates[m.id]; const steps = [m.units.filter(u => (S.prog[u.id] || 0) >= u.screens.length).length + '/' + m.units.length + ' units', testPassed(m) ? 'test passed ✓' : 'test ' + (S.tests[m.id] != null ? S.tests[m.id] + '%' : 'not taken'), S.p2[m.id] ? 'essay ✓' : 'essay to do']; return `<div class="tile static credtile ${got ? 'earned' : 'locked'}"><span class="ticon">${got ? mc[1] : '🔒'}</span><h3>${esc(mc[0])}</h3><span class="meta">${esc(m.code)} · ${got ? 'Earned ' + esc(fmtDate(d)) : steps.join(' · ')}</span>${got ? `<div class="row"><button type="button" class="btn gold" data-gx="certdl" data-k="${m.id}">⬇ PDF</button><button type="button" class="btn ghost" data-gx="certview" data-k="${m.id}">View</button></div>` : ''}</div>`; }).join('')}</div></div>`;
  h += `<div class="card"><h2>Certificate of Achievement</h2>${all ? `<p class="fb good">🎓 Complete! Completed on <b>${esc(fmtDate(S.cdates.all))}</b>.</p>${S.name ? '' : '<p class="fb note">Add your name on your player card first so it prints on your certificate. <button type="button" class="linkbtn" data-go="profile">Open my player card →</button></p>'}<div class="row"><button type="button" class="btn gold" data-gx="certdl" data-k="all">⬇ Download PDF</button><button type="button" class="btn ghost" data-gx="certview" data-k="all">Preview</button><button type="button" class="btn ghost" data-gx="certprint" data-k="all">🖨 Print</button></div>` : `<p>🔒 Locked. Earn all ${MODS.length} micro-credentials to unlock it. You have ${MODS.filter(realModDone).length} of ${MODS.length}.</p><div class="pbar"><i style="width:${MODS.filter(realModDone).length / MODS.length * 100}%"></i></div>`}
    ${T.certView ? `<div class="certwrap">${certPreviewHTML(certSpec(T.certView, false))}</div>` : ''}</div>`;
  h += `<div class="card ${T0 ? '' : 'facil-locked'}"><h2>Facilitator Preview</h2>${T0 ? `<p class="hint">Teacher mode is on. Preview any certificate or micro-credential with any name. Previews are always watermarked PREVIEW, so they cannot be passed off as earned certificates.</p>
    <div class="formgrid"><div class="field"><label for="cp-name">Student name</label><input id="cp-name" class="input" maxlength="60" value="${esc(CPREV.name)}" placeholder="e.g. Jada Richardson"></div>
    <div class="field"><label for="cp-kind">Credential</label><select id="cp-kind" class="select"><option value="all" ${CPREV.kind === 'all' ? 'selected' : ''}>Certificate of Achievement</option>${MODS.map(m => `<option value="${m.id}" ${CPREV.kind === m.id ? 'selected' : ''}>Micro-credential: ${esc((MICRO[m.id] || [m.title])[0])}</option>`).join('')}</select></div>
    <div class="field"><label for="cp-fac">Facilitator name on certificates</label><input id="cp-fac" class="input" maxlength="60" value="${esc(FACIL())}"></div></div>
    <div class="row"><button type="button" class="btn go" data-gx="cprev">Show preview</button><button type="button" class="btn ghost" data-gx="cprevdl">⬇ Download preview PDF</button></div>
    ${T.cprev ? `<div class="certwrap">${certPreviewHTML(certSpec(CPREV.kind, true, CPREV.name))}</div>` : ''}` : `<p class="hint">Certificate and micro-credential previews are available to teachers in the Teacher's Version of this course.</p>`}</div>`;
  return h;
}

/* ---------------- plugins (separate tool files register views here) ---------------- */
const PLUGS = {};
const PGROUPS = [['Play & Compete', ['live', 'arcade', 'board', 'speakup', 'brain', 'trophies']], ['Create & Perform', ['studio', 'lounge']], ['Learn Smarter', ['tracker', 'find', 'ww', 'books', 'eb', 'eorder', 'qc', 'examiner', 'x032', 'genres', 'didyouknow', 'study', 'memorylab', 'words', 'reading', 'college']], ['Wellbeing & Me', ['me', 'coach', 'sleep', 'recroom', 'music', 'stream', 'memories']]];
function pgroupOf(v) { const g = PGROUPS.find(x => x[1].includes(v)); return g ? g[0] : 'More Tools'; }
function pluginsByGroup() { const out = {}; Object.values(PLUGS).filter(p => p.tile).forEach(p => { const g = pgroupOf(p.view); (out[g] = out[g] || []).push(p); }); Object.values(out).forEach(L => L.sort((a, b) => { const o = v => { const g = PGROUPS.find(x => x[1].includes(v)); return g ? g[1].indexOf(v) : 99; }; return o(a.view) - o(b.view); })); return [...PGROUPS.map(g => g[0]), 'More Tools'].filter(g => out[g]).map(g => [g, out[g]]); }
(window.COURSE_PLUGINS || []).forEach(p => { if (p && p.view) PLUGS[p.view] = p; });
const API = { LVN, LVI, setSectionLevels: o => { S.secLv = Object.assign({}, o || {}); save(); render(); }, setCourseLevel: l => { if ([1, 2, 3].includes(+l)) { S.level = +l; save(); render(); } }, get S() { return S; }, progress: () => totals(), level: () => levelOf(S.xp || 0), modules: () => MODS.map(m => ({ id: m.id, code: m.code, title: m.title, level: secLvOf(m.id), units: m.units.map(u => ({ id: u.id, title: u.title, screens: u.screens.length, done: Math.min(S.prog[u.id] || 0, u.screens.length) })), testPassed: testPassed(m), essay: !!S.p2[m.id], complete: modComplete(m) })), save, reward: (...a) => reward(...a), esc, go: loc => go(loc), render: () => renderStage(), toast: m => toast(m), shuffle, chime: k => chime(k), coinHTML, owns, buy: (...a) => buy(...a), listenBtn, speak, stopSpeak, seeded, setSkin: id => setSkin(id), get skins() { return SKINS.map(k => ({ id: k.id, name: k.name, price: k.price, light: !!k.light })); }, get sample() { return SAMPLE; }, strip: x => String(x || '').replace(/<[^>]+>/g, ' ') };
window.COURSE_API = API;

/* ---------------- Caribbean welcome tour + recorded narration ---------------- */
const CARIB = window.COURSE_CARIB || null;
const AUD = window.COURSE_AUDIO || {};
const WELCOME = "Welcome to CAPE Communication Studies. I'll be your guide on this journey. Communication is how the Caribbean tells its story: in calypso and soca, in Anansi stories told on the gallery at night, and in the way we switch from Creole with our friends to Standard English in the exam room. In this course, you will learn to gather and judge information, to understand our languages and our communities, and to speak and write for any audience. Before you begin, take a tour of our region: the flags, the folklore, the food, the music and the festivals that make us who we are. Then create your player card, choose your avatar, and step into Module One. Let's go!";
let curAudio = null;
function playClip(id, fallback) {
  stopSpeak();
  if (!AUD[id]) { speak(fallback || ''); return; }
  try {
    curAudio = new Audio(AUD[id]); curAudio.playbackRate = TTS.rate;
    curAudio.onended = curAudio.onerror = () => { curAudio = null; TTS.on = false; refreshListen(); };
    TTS.on = true; refreshListen();
    const p = curAudio.play(); if (p && p.catch) p.catch(() => { curAudio = null; TTS.on = false; refreshListen(); speak(fallback || ''); });
  } catch (e) { curAudio = null; speak(fallback || ''); }
}
function clipBtn(id, label, text) {
  if (!AUD[id] && !TTS.ok) return '';
  return `<button type="button" class="btn gold" data-act="speak" data-clip="${esc(id)}" data-t="${esc(text)}" data-l="${esc((AUD[id] ? '▶ ' : '🔊 ') + label)}">${AUD[id] ? '▶ ' : '🔊 '}${esc(label)}</button>`;
}
const CTABS = [['flags', '🏳️ Flags & symbols'], ['history', '📜 History'], ['landmarks', '🏰 Landmarks & sites'], ['sea', '🌊 Caribbean Sea'], ['folk', '🕷️ Folklore & legends'], ['music', '🥁 Music'], ['food', '🍲 Food & festivals'], ['quiz', '❓ Quiz']];
let CQ = null;
function cRow(label, val) { if (val == null || val === '' || (Array.isArray(val) && !val.length)) return ''; return `<div class="crow"><b>${esc(label)}</b><span>${Array.isArray(val) ? val.map(esc).join(', ') : esc(val)}</span></div>`; }
const imgQ = (t, ctx) => 'https://www.google.com/search?tbm=isch&safe=active&q=' + encodeURIComponent((String(t).replace(/\s*\([^)]*\)/g, '').replace(/['"“”]/g, '').trim() + (ctx ? ' ' + ctx : '')).slice(0, 120));
function imgA(t, ctx, label) { return `<a class="imglink" href="${esc(imgQ(t, ctx))}" target="_blank" rel="noopener" title="See pictures of ${esc(String(t).replace(/\s*\([^)]*\)/g, ''))}">${esc(label || t)}<span class="imgic" aria-hidden="true">🖼</span></a>`; }
function cRowImg(label, val, ctx) { if (val == null || val === '' || (Array.isArray(val) && !val.length)) return ''; return `<div class="crow"><b>${esc(label)}</b><span>${(Array.isArray(val) ? val : [val]).map(v => imgA(v, ctx)).join(', ')}</span></div>`; }
const CTRY_TABS = [['🏳️', 'Flags & Symbols'], ['📜', 'History'], ['🏰', 'Landmarks & Sites'], ['🌊', 'Caribbean Sea'], ['🕷️', 'Folklore & Legends'], ['🥁', 'Music'], ['🍲', 'Foods & Festivals'], ['💬', 'Slang'], ['❓', 'Quiz']];
let CCQ = null;
function countryQuiz(c, C) {
  const others = C.filter(x => x.id !== c.id), pick = (arr, n) => shuffle(arr).slice(0, n), Q = [];
  const mk = (q, right, pool, why) => { const wrong = pick([...new Set(pool.filter(v => v && v !== right))], 3); if (wrong.length < 3) return; const opts = shuffle([right, ...wrong]); Q.push({ q, options: opts, answer: opts.indexOf(right), why }); };
  if (c.capital) mk(`What is the capital of ${c.name}?`, c.capital, others.map(x => x.capital), `${c.capital} is the capital of ${c.name}.`);
  if (c.bird) mk(`Which is the national bird of ${c.name}?`, c.bird, others.map(x => x.bird), `The national bird of ${c.name} is the ${c.bird}.`);
  if (c.motto) mk(`Which is the motto of ${c.name}?`, c.motto, others.map(x => x.motto), `${c.name}'s motto: ${c.motto}.`);
  if (c.flower) mk(`Which is the national flower of ${c.name}?`, c.flower, others.map(x => x.flower), `${c.name}'s national flower is ${c.flower}.`);
  if ((c.landmarks || []).length) { const L = c.landmarks[0]; mk(`Which landmark or site is in ${c.name}?`, L.name, others.flatMap(x => (x.landmarks || []).map(l => l.name)), `${L.name}: ${L.about}`); }
  if ((c.celebrations || []).length) { const F = c.celebrations[0]; mk(`Which celebration belongs to ${c.name}?`, F.name, others.flatMap(x => (x.celebrations || []).map(l => l.name)).filter(n => !/emancipation|independence|christmas|easter|new year|carnival$/i.test(n)), `${F.name}: ${F.about}`); }
  if ((c.folklore || []).length) { const F = c.folklore[0]; mk(`Which folklore figure or legend comes from ${c.name}?`, F.name, others.flatMap(x => (x.folklore || []).map(l => l.name)), `${F.name}: ${F.about}`); }
  if (!1 && (c.slang || []).length) { const S2 = c.slang[0]; mk(`In ${c.name}, what does "${S2.say}" mean?`, S2.means, others.flatMap(x => (x.slang || []).map(l => l.means)), `"${S2.say}" means: ${S2.means}.`); }
  if ((c.history || []).length) { const H = c.history[Math.min(1, c.history.length - 1)]; mk(`In ${c.name}'s history, what happened in ${H.year}?`, H.event, others.flatMap(x => (x.history || []).map(l => l.event)), `${H.year}: ${H.event}`); }
  if (c.region) mk(`Which part of the Caribbean is ${c.name} in?`, c.region, [...new Set(C.map(x => x.region))], `${c.name} is in the ${c.region}.`);
  return Q;
}
function countryHTML(c, C, ti, modal) {
  const lst = (arr, f) => `<ul>${arr.map(f).join('')}</ul>`;
  let h = `<div class="card country"><div class="row" style="justify-content:space-between">${modal ? `<span class="row" style="gap:6px"><button type="button" class="tool" data-gx="cpop" data-k="${esc(C[(C.indexOf(c) - 1 + C.length) % C.length].id)}" aria-label="Previous territory">‹</button><button type="button" class="tool" data-gx="cpop" data-k="${esc(C[(C.indexOf(c) + 1) % C.length].id)}" aria-label="Next territory">›</button></span>` : `<button type="button" class="linkbtn" data-go="carib" data-tab="flags">← All flags</button>`}<span class="row" style="gap:6px">${listenBtn('Listen')}${modal ? '<button type="button" class="tool" data-gx="cclose" aria-label="Close">✕ Close</button>' : ''}</span></div>
    <div class="chead"><span class="fl big">${c.flag || ''}</span><div><span class="kicker">${esc(c.region || '')}</span><h2>${esc(c.name)}</h2>${c.motto ? `<p class="motto">“${esc(c.motto)}”</p>` : ''}</div></div>
    <div class="chips ctabs" role="tablist">${CTRY_TABS.map(([ic, n], i) => n === 'Slang' ? '' : `<button type="button" class="chip ${ti === i ? 'sel' : ''}" role="tab" aria-selected="${ti === i}" ${modal ? `data-gx="ctab" data-i="${i}"` : `data-go="carib" data-tab="country" data-k="${esc(c.id)}" data-i="${i}"`}>${ic} ${n}</button>`).join('')}</div>`;
  const none = msg => `<p class="hint">${msg}</p>`;
  if (ti === 0) h += `<p class="hint">🖼 Tap any underlined name to see pictures of it (opens in a new tab).</p><div class="cgrid">${cRowImg('Capital', c.capital, c.name)}${cRow('Languages', c.languages)}${cRow('Motto', c.motto)}<div class="crow"><b>Coat of arms</b><span>${esc(c.coatOfArms || '')} ${imgA('coat of arms', c.name, 'See the coat of arms')}</span></div><div class="crow"><b>Flag</b><span>${imgA('flag', c.name, 'See the official flag')}</span></div>${cRowImg('National bird', c.bird, c.name)}${cRowImg('National animal', c.animal, c.name)}${cRowImg('National flower', c.flower, c.name)}${cRow('Time zone', c.tz)}</div>${c.flagNote ? `<p class="hint">${esc(c.flagNote)}</p>` : ''}`;
  if (ti === 1) h += (c.history || []).length ? `<ol class="tl">${c.history.map(x => `<li><b>${esc(String(x.year))}</b> ${esc(x.event)}</li>`).join('')}</ol>` : none('No history timeline yet for this territory.');
  if (ti === 2) h += (c.landmarks || []).length ? lst(c.landmarks, x => `<li><b>${imgA(x.name, c.name)}</b>: ${esc(x.about || '')}</li>`) : none('No landmarks listed yet.');
  if (ti === 3) { const coast = (c.landmarks || []).filter(x => /beach|bay|reef|harbour|harbor|coast|sea|island|pond|lagoon|marine|cay|point/i.test(x.name + ' ' + x.about)); h += `<p>${esc(c.name)} is in the <b>${esc(c.region || 'Caribbean')}</b>.${coast.length ? ' Coastal and sea sites:' : ''}</p>${coast.length ? lst(coast, x => `<li><b>${imgA(x.name, c.name)}</b>: ${esc(x.about || '')}</li>`) : ''}<h4>About the Caribbean Sea</h4>${lst((CARIB.sea && CARIB.sea.facts || []).slice(0, 5), f => `<li>${esc(f)}</li>`)}`; }
  if (ti === 4) h += (c.folklore || []).length ? lst(c.folklore, x => `<li><b>${imgA(x.name, c.name + ' folklore')}</b>: ${esc(x.about || '')}</li>`) + `<p class="hint">Oral tradition is communication: each tale has a purpose, an audience and a lesson.</p>` : none('No folklore listed yet for this territory. See the region-wide folktales on the Caribbean Tour.');
  if (ti === 5) h += (c.instruments || []).length ? `<div class="cgrid">${c.instruments.map(n => { const I = (CARIB.instruments || []).find(x => n.toLowerCase().includes(x.name.toLowerCase().split(' ')[0])); return `<div class="crow"><b>${imgA(n, 'instrument ' + c.name)}</b><span>${I ? esc(I.about || '') : ''}</span></div>`; }).join('')}</div>` : none('No instruments listed yet.');
  if (ti === 6) h += `<div class="cgrid">${cRowImg('National dish', c.nationalDish, c.name + ' food')}${cRowImg('Foods', c.foods, c.name + ' food')}</div>${(c.celebrations || []).length ? `<h4>Festivals and celebrations</h4>` + lst(c.celebrations, x => `<li><b>${imgA(x.name, c.name)}</b>${x.when ? ` (${esc(x.when)})` : ''}: ${esc(x.about || '')}</li>`) : ''}`;
  if (ti === 7 && !1) h += (c.slang || []).length ? `<p class="hint">Tap a card to flip it. Translate into Standard English before you flip.</p><div class="tiles">${c.slang.map(x => `<button type="button" class="flip" data-gx="flip" aria-label="Flip card"><span class="inner"><span class="face"><span class="ribbon">Slang</span><b>${esc(x.say)}</b></span><span class="face back"><span class="ribbon">Means</span><span>${esc(x.means)}</span></span></span></button>`).join('')}</div>` : none('No slang listed yet for this territory.');
  if (ti === 8) {
    if (!CCQ || CCQ.id !== c.id) CCQ = { id: c.id, name: c.name, Q: countryQuiz(c, C), i: 0, pick: null, score: 0 };
    const Q = CCQ.Q;
    if (!Q.length) h += none('Not enough information for a quiz yet.');
    else if (CCQ.i >= Q.length) h += `<p class="fb good">You scored <b>${CCQ.score} of ${Q.length}</b> on ${esc(c.name)}.</p>${savedHTML(CCQ.saved || null)}<div class="row"><button type="button" class="btn go" data-gx="ccqagain">Try again</button>${modal ? '<button type="button" class="btn ghost" data-gx="cclose">Pick another flag</button>' : '<button type="button" class="btn ghost" data-go="carib" data-tab="flags">Pick another flag</button>'}</div>`;
    else { const q = Q[CCQ.i], done = CCQ.pick != null; h += `<span class="kicker">Question ${CCQ.i + 1} of ${Q.length} · score ${CCQ.score}</span><p class="q"><b>${esc(q.q)}</b></p><div class="opts">${q.options.map((o, i) => `<button type="button" class="opt ${done ? (i === q.answer ? 'right' : i === CCQ.pick ? 'wrong' : '') : ''}" data-gx="ccqpick" data-i="${i}" ${done ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>${done ? `<p class="fb ${CCQ.pick === q.answer ? 'good' : 'bad'}">${CCQ.pick === q.answer ? 'Correct!' : 'Not quite.'} ${esc(q.why || '')}</p><div class="row"><button type="button" class="btn go" data-gx="ccqnext">Next →</button></div>` : ''}`; }
  }
  return h + `</div>`;
}
let CMOD = null, CMODlast = null;
function cRe() { if (CMOD) openCountry(CMOD.k, CMOD.i, true); else renderStage(); }
function openCountry(k, i, keep) {
  const C = (CARIB && CARIB.countries) || [], c = C.find(x => x.id === k); if (!c) return;
  if (!keep) CMODlast = document.activeElement;
  CMOD = { k, i: i || 0 };
  let m = document.getElementById('cmodal');
  if (!m) { m = document.createElement('div'); m.id = 'cmodal'; m.className = 'cmodal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); document.body.appendChild(m); m.addEventListener('click', e => { if (e.target === m) closeCountry(); }); }
  m.setAttribute('aria-label', c.name); m.hidden = false; document.body.classList.add('cmodal-open');
  const sc = m.querySelector('.cmodal-in'); const top = keep && sc ? sc.scrollTop : 0;
  m.innerHTML = `<div class="cmodal-in">${countryHTML(c, C, CMOD.i, true)}</div>`;
  const inn = m.querySelector('.cmodal-in'); if (inn) inn.scrollTop = top;
  try { applyTitleCase(m); } catch (e) { }
  if (!keep) setTimeout(() => { const f = m.querySelector('[data-gx="cclose"]'); if (f) f.focus(); }, 30);
}
function closeCountry() { stopSpeak(); CMOD = null; const m = document.getElementById('cmodal'); if (m) { m.hidden = true; m.innerHTML = ''; } document.body.classList.remove('cmodal-open'); if (CMODlast && CMODlast.focus) try { CMODlast.focus(); } catch (e) { } }
document.addEventListener('keydown', e => { if (e.key === 'Escape' && CMOD) closeCountry(); });
function caribHTML() {
  if (!CARIB) return `<div class="card"><h2>Caribbean tour</h2><p>The tour content did not load.</p></div>`;
  const L = S.loc, tab = L.tab || 'flags', C = CARIB.countries || [];
  if (!S.seenCarib) { S.seenCarib = 1; save(); }
  let h = `<section class="hero carib-hero"><span class="eyebrow">Start here · Welcome</span><h1>Welcome to the Caribbean classroom${S.name ? ', ' + esc(S.name) : ''}.</h1>
    <p>Before Module 1, take a tour of the region whose languages and stories you will study: flags and coats of arms, national birds, folklore and legends, our sea, our music, our food and our festivals.</p>
    <div class="flagstrip">${C.map(c => `<button type="button" class="fl flbtn" data-gx="cpop" data-k="${esc(c.id)}" title="${esc(c.name)}" aria-label="${esc(c.name)}">${c.flag || ''}</button>`).join('')}</div>
    <div class="row">${clipBtn('welcome', 'Play the welcome', WELCOME)}<button type="button" class="btn ghost" data-go="${S.profileDone ? 'home' : 'profile'}">${S.profileDone ? 'Go to my course' : 'Create my player card'} →</button></div></section>`;
  h += `<div class="chips ctabs" role="tablist">${CTABS.map(([k, n]) => `<button type="button" class="chip ${tab === k ? 'sel' : ''}" role="tab" aria-selected="${tab === k}" data-go="carib" data-tab="${k}">${n}</button>`).join('')}</div>`;
  if (tab === 'country') {
    const c = C.find(x => x.id === L.k) || C[0];
    h += `<div class="card"><div class="flaggrid mini">${C.map(x => `<button type="button" class="flagbtn ${x === c ? 'sel' : ''}" data-go="carib" data-tab="country" data-k="${esc(x.id)}" data-i="${L.i || 0}" aria-pressed="${x === c}" title="${esc(x.name)}"><span class="fl">${x.flag || ''}</span><span>${esc(x.name)}</span></button>`).join('')}</div></div>`;
    h += countryHTML(c, C, Math.max(0, Math.min(CTRY_TABS.length - 1, L.i || 0)));
  } else if (tab === 'flags') {
    h += `<div class="card"><h3>Tap a flag to explore that territory</h3><p class="hint">Each flag pops up its symbols, history, landmarks, sea, folklore, music, food and festivals, slang and a quiz.</p><div class="flaggrid">${C.map(x => `<button type="button" class="flagbtn" data-gx="cpop" data-k="${esc(x.id)}" aria-haspopup="dialog"><span class="fl">${x.flag || ''}</span><span>${esc(x.name)}</span></button>`).join('')}</div></div>`;
  } else if (tab === 'history') {
    h += `<div class="card"><h2>The Caribbean story</h2><ol class="tl">${(CARIB.regionHistory || []).map(x => `<li><b>${esc(x.period)}</b> ${esc(x.about)}</li>`).join('')}</ol><div class="row">${listenBtn()}</div><p class="hint">Module 2 link: this history of colonisation, the plantation system and migration is why the region speaks the languages and creoles it does.</p></div>`;
    h += `<div class="card"><h3>Country by country</h3>${C.filter(c => (c.history || []).length).map(c => `<details class="fold"><summary><span class="fl sm">${c.flag || ''}</span> ${esc(c.name)}</summary><div><ol class="tl">${c.history.map(x => `<li><b>${esc(String(x.year))}</b> ${esc(x.event)}</li>`).join('')}</ol></div></details>`).join('')}</div>`;
  } else if (tab === 'landmarks') {
    h += `<div class="card"><h2>Landmarks, heritage and national sites</h2><p class="hint">Paper 3 idea: choose one site and research how it communicates national identity to visitors.</p>${C.filter(c => (c.landmarks || []).length).map(c => `<details class="fold"><summary><span class="fl sm">${c.flag || ''}</span> ${esc(c.name)}</summary><div><ul>${c.landmarks.map(x => `<li><b>${imgA(x.name, c.name)}</b>: ${esc(x.about || '')}</li>`).join('')}</ul></div></details>`).join('')}</div>`;
  } else if (tab === 'sea') {
    h += `<div class="card"><h2>The Caribbean Sea</h2><ul>${(CARIB.sea && CARIB.sea.facts || []).map(f => `<li>${esc(f)}</li>`).join('')}</ul><div class="row">${listenBtn()}</div></div>`;
  } else if (tab === 'folk') {
    h += `<div class="card"><h2>Folktales and legends</h2><p class="hint">Oral tradition is communication too: every tale has a purpose, an audience and a lesson.</p><div class="tiles">${(CARIB.folktales || []).map(f => `<div class="tile static"><h3>${imgA(f.name, 'Caribbean folklore')}</h3>${f.where ? `<span class="ribbon">${esc(f.where)}</span>` : ''}<span class="meta">${esc(f.about || '')}</span>${f.lesson ? `<span class="meta"><b>Lesson:</b> ${esc(f.lesson)}</span>` : ''}</div>`).join('')}</div><div class="row">${listenBtn()}</div></div>`;
    const local = C.filter(c => (c.folklore || []).length);
    if (local.length) h += `<div class="card"><h3>Legends by country</h3><ul>${local.map(c => `<li><b>${esc(c.name)}</b>: ${c.folklore.map(x => esc(x.name)).join(', ')}</li>`).join('')}</ul></div>`;
  } else if (tab === 'music') {
    h += `<div class="card"><h2>Musical instruments</h2><div class="tiles">${(CARIB.instruments || []).map(f => `<div class="tile static"><h3>${imgA(f.name, 'instrument')}</h3>${f.origin ? `<span class="ribbon">${esc(f.origin)}</span>` : ''}<span class="meta">${esc(f.about || '')}</span></div>`).join('')}</div><div class="row">${listenBtn()}</div></div>`;
  } else if (tab === 'food') {
    h += `<div class="card"><h2>Food, holidays and celebrations</h2><div class="cgrid">${C.map(c => `<div class="crow"><b><span class="fl sm">${c.flag || ''}</span> ${esc(c.name)}</b><span>${c.nationalDish ? `<b>${esc(c.nationalDish)}</b><br>` : ''}${esc((c.foods || []).join(', '))}${(c.celebrations || []).length ? `<br><span class="hint">🎉 ${c.celebrations.map(x => esc(x.name)).join(' · ')}</span>` : ''}</span></div>`).join('')}</div></div>`;
  } else if (tab === 'slang' && !1) {
    h += `<div class="card"><h2>Caribbean slang</h2><p class="hint">Tap a card to flip it. Module 2 link: these are lexical features of Caribbean Creoles and casual registers. Translate each into Standard English before you flip.</p><div class="tiles">${C.flatMap(c => (c.slang || []).map(x => `<button type="button" class="flip" data-gx="flip" aria-label="Flip card"><span class="inner"><span class="face"><span class="ribbon">${esc(c.name)}</span><b>${esc(x.say)}</b></span><span class="face back"><span class="ribbon">Standard English</span><span>${esc(x.means)}</span></span></span></button>`)).join('')}</div></div>`;
  } else if (tab === 'quiz') {
    const Q = CARIB.quiz || [];
    if (!CQ) CQ = { i: 0, pick: null, score: 0, order: shuffle(Q.map((_, i) => i)) };
    if (CQ.i >= Q.length) {
      h += `<div class="card"><h2>Tour quiz complete</h2><p>You scored <b>${CQ.score} of ${Q.length}</b>.</p>${savedHTML(CQ.saved || null)}<div class="row"><button type="button" class="btn go" data-gx="cqagain">Try again</button><button type="button" class="btn ghost" data-go="${S.profileDone ? 'home' : 'profile'}">Continue →</button></div></div>`;
    } else {
      const q = Q[CQ.order[CQ.i]], done = CQ.pick != null;
      h += `<div class="card"><span class="kicker">Question ${CQ.i + 1} of ${Q.length} · score ${CQ.score}</span><h3>${esc(q.q)}</h3><div class="opts">${q.options.map((o, i) => `<button type="button" class="opt ${done ? (i === q.answer ? 'right' : i === CQ.pick ? 'wrong' : '') : ''}" data-gx="cqpick" data-i="${i}" ${done ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>
        ${done ? `<p class="fb ${CQ.pick === q.answer ? 'good' : 'bad'}">${CQ.pick === q.answer ? 'Correct!' : 'Not quite.'} ${esc(q.why || '')}</p><div class="row"><button type="button" class="btn go" data-gx="cqnext">Next →</button></div>` : ''}</div>`;
    }
  }
  return h;
}

/* ---------------- events for the new modes ---------------- */
document.addEventListener('click', e => {
  const pb = e.target.closest('[data-px]'); if (!pb) return;
  const pv = PLUGS[pb.dataset.pv || S.loc.v]; if (pv && pv.click) { try { pv.click(pb.dataset.px, pb, API, e); } catch (err) { toast('Error: ' + err.message); } }
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-gx]'); if (!b) return;
  const a = b.dataset.gx;
  switch (a) {
    case 'interest': { S.profile = S.profile || {}; const k = b.dataset.k, L = S.profile.interests = S.profile.interests || []; const i = L.indexOf(k); if (i >= 0) L.splice(i, 1); else L.push(k); b.classList.toggle('sel'); b.setAttribute('aria-pressed', i < 0); save(); return; }
    case 'saveprofile': {
      S.profile = S.profile || {};
      const nm = ($('#pf-name').value || '').trim(); if (nm) S.name = nm.slice(0, 40);
      S.profile.territory = ($('#pf-terr') || {}).value || S.profile.territory || ''; S.profile.school = $('#pf-school').value; S.profile.schoolOther = ($('#pf-other') && $('#pf-other').value || '').trim().slice(0, 60);
      S.profile.year = $('#pf-year').value; S.profile.major = $('#pf-major').value;
      const first = !S.profileDone; S.profileDone = true; save(); render();
      if (first) reward(20, 'Player card created'); else toast('Player card saved'); return;
    }
    case 'sound': S.sound = S.sound === false; save(); if (S.sound) chime('ok'); renderStage(); return;
    case 'avatar': {
      const av = AVATARS.find(x => x.id === b.dataset.id); if (!av) return;
      if (av.price && !owns('av-' + av.id) && !buy('av-' + av.id, av.price, av.name + ' avatar')) return;
      S.profile = S.profile || {}; S.profile.avatar = av.id; save(); render(); return;
    }
    case 'skin': {
      const k = SKINS.find(x => x.id === b.dataset.id); if (!k) return;
      if (k.price && !owns('skin-' + k.id) && !buy('skin-' + k.id, k.price, k.name + ' theme')) return;
      S.skin = k.id; save(); applySkin(); render(); return;
    }
    case 'buygame': if (buy('g-' + b.dataset.id, +b.dataset.price, b.dataset.name)) render(); return;
    case 'opengame': { openGameFull(b.dataset.page, b.dataset.id); return; }
    case 'qtidl': {
      const f = (window.COURSE_QTI || [])[+b.dataset.i]; if (!f || !S.teacher) return;
      try { const bin = atob(f.data), arr = new Uint8Array(bin.length); for (let k = 0; k < bin.length; k++) arr[k] = bin.charCodeAt(k);
        const url = URL.createObjectURL(new Blob([arr], { type: 'application/zip' })), a = document.createElement('a'); a.href = url; a.download = f.name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 2000); toast('Downloading ' + f.name);
      } catch (e) { toast('Download failed: ' + e.message); }
      return;
    }
    case 'daily': claimDaily(); return;
    case 'buyhint': if ((S.coins || 0) < 15) { toast('You need 15 coins for a hint token.'); return; } S.coins -= 15; S.hintTokens = (S.hintTokens || 0) + 1; save(); chime('buy'); render(); return;
    case 'flip': return; /* toggled by the main click handler */
    case 'zxset': { const v = ($('#zx-sel') || {}).value; if (!v) { toast('Choose a skill from the menu first.'); return; } const own = $('#zx-own'); if (own) S.zexpertOwn = own.value.trim().slice(0, 40); const was = S.zexpert; S.zexpert = v; save(); if (!was) reward(5, 'Expertise chosen'); toast('Expertise saved: ' + ((ZX.find(x => x.id === v) || {}).name || '')); renderStage(); return; }
    case 'certview': T.certView = T.certView === b.dataset.k ? null : b.dataset.k; renderStage(); setTimeout(() => { const el = document.querySelector('.certwrap'); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 60); return;
    case 'certdl': case 'cprevdl': {
      const prev = a === 'cprevdl'; if (prev) { CPREV.name = ($('#cp-name') || {}).value || ''; CPREV.kind = ($('#cp-kind') || {}).value || 'all'; }
      if (!prev && !(b.dataset.k === 'all' ? realCourseDone() : realModDone(mod(b.dataset.k)))) { toast('Not earned yet.'); return; }
      const sp = prev ? certSpec(CPREV.kind, true, CPREV.name) : certSpec(b.dataset.k, false); const c = drawCert(sp); if (!c) { toast('Your browser cannot draw the certificate here. Use Print instead.'); return; }
      const pdf = jpegToPdf(c.toDataURL('image/jpeg', .92), c.width, c.height); offerFile(prev ? 'PREVIEW - ' + sp.file : sp.file, new Blob([pdf], { type: 'application/pdf' })).then(ok => { if (ok) toast('Certificate PDF ready'); }); return;
    }
    case 'certprint': { const c = drawCert(certSpec(b.dataset.k, false)); if (!c) return; const w = window.open('', '_blank'); if (!w) { toast('Pop-ups are blocked. Use Download PDF instead.'); return; } w.document.write(`<!doctype html><title>Certificate</title><style>@page{size:A4 landscape;margin:0}body{margin:0}img{width:100%;display:block}</style><img src="${c.toDataURL('image/jpeg', .92)}" onload="setTimeout(()=>print(),200)">`); w.document.close(); return; }
    case 'cprev': { CPREV.name = ($('#cp-name') || {}).value || ''; CPREV.kind = ($('#cp-kind') || {}).value || 'all'; const f = (($('#cp-fac') || {}).value || '').trim(); if (f) { S.facilitator = f.slice(0, 60); save(); } T.cprev = 1; renderStage(); setTimeout(() => { const el = document.querySelectorAll('.certwrap'); const last = el[el.length - 1]; if (last && last.scrollIntoView) last.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 60); return; }
    case 'peelins': { const Q = T.peel; if (!Q) return; const para = [Q.p, Q.e, Q.x, Q.l].map(x => x.trim()).filter(Boolean).join(' '); const P = (T.text || '').split(/\n\s*\n/); if (P.length > 2) P.splice(P.length - 1, 0, para); else P.push(para); T.text = P.join('\n\n'); T.peel = null; const d = DRAFTS[skey()] || {}; d.text = T.text; DRAFTS[skey()] = d; saveDrafts(); toast('Paragraph added above your conclusion. Read it through, then resubmit.'); renderStage(); setTimeout(() => { const ta = document.querySelector('[data-ta]'); if (ta && ta.scrollIntoView) ta.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 60); return; }
    case 'skinmenu': toggleSkinPop(); return;
    case 'mode': { const light = S.skin === 'daylight'; setSkin(light ? (S.darkSkin && S.darkSkin !== 'daylight' && owns('skin-' + S.darkSkin) || ['navy'].includes(S.darkSkin) ? S.darkSkin : 'navy') : 'daylight'); toast(light ? 'Dark mode on' : 'Light mode on'); if (S.loc.v === 'shop') renderStage(); return; }
    case 'ccqpick': { const q = CCQ.Q[CCQ.i]; CCQ.pick = +b.dataset.i; if (CCQ.pick === q.answer) { CCQ.score++; reward(2, 'Caribbean quiz'); } cRe(); return; }
    case 'ccqnext': CCQ.i++; CCQ.pick = null; if (CCQ.i >= CCQ.Q.length && !CCQ.saved) CCQ.saved = courseResult({ kind: 'game', id: 'country-' + CCQ.id, title: 'Country quiz: ' + (CCQ.name || CCQ.id), score: CCQ.score, max: CCQ.Q.length, loc: locCopy() }); cRe(); return;
    case 'ccqagain': CCQ = null; cRe(); return;
    case 'cpop': openCountry(b.dataset.k, CMOD ? CMOD.i : 0, !!CMOD); return;
    case 'ctab': if (CMOD) { CMOD.i = +b.dataset.i; openCountry(CMOD.k, CMOD.i, true); const inn = document.querySelector('.cmodal-in'); if (inn) inn.scrollTop = 0; } return;
    case 'cclose': closeCountry(); return;
    case 'cqpick': { const q = CARIB.quiz[CQ.order[CQ.i]]; CQ.pick = +b.dataset.i; if (CQ.pick === q.answer) { CQ.score++; reward(2, 'Caribbean quiz'); } renderStage(); return; }
    case 'cqnext': CQ.i++; CQ.pick = null; { const Q = (CARIB && CARIB.quiz) || []; if (CQ.i >= Q.length && !CQ.saved) CQ.saved = courseResult({ kind: 'game', id: 'tourquiz', title: 'Caribbean tour quiz', score: CQ.score, max: Q.length, loc: locCopy() }); } renderStage(); return;
    case 'cqagain': CQ = null; renderStage(); return;
    case 'spellstart': {
      if (S.loc.v !== 'lab' || S.loc.tab !== 'test') { go({ v: 'lab', tab: 'test' }); }
      const L = spellLists().find(l => l.id === b.dataset.id); if (!L) return;
      const words = shuffle(L.words).slice(0, 10);
      T.sp = { id: L.id, title: L.title, words, i: 0, score: 0, miss: [], last: null, t0: Date.now() }; renderStage(); setTimeout(() => { sayWord(); const i = $('#spin'); if (i) i.focus(); }, 150); return;
    }
    case 'sayword': sayWord(); return;
    case 'peek': T.sp.peek = true; renderStage(); setTimeout(() => { if (T.sp) { T.sp.peek = false; renderStage(); } }, 2000); return;
    case 'spellcheck': {
      const sp = T.sp, w = sp.words[sp.i], ans = ($('#spin').value || '').trim();
      if (!ans) { toast('Type the word first.'); return; }
      const ok = ans.toLowerCase() === w.w.toLowerCase();
      sp.last = { ok, w: w.w, tip: w.tip }; if (ok) sp.score++; else sp.miss.push({ w: w.w, a: ans, tip: w.tip });
      streakHit(ok); if (ok) { chime('ok'); S.coins = (S.coins || 0) + 2; floatText('+2'); }
      sp.i++;
      if (sp.i >= sp.words.length) { sp.saved = courseResult({ kind: 'game', id: 'spell-' + sp.id, title: 'Spelling Bee: ' + (sp.title || sp.id), score: sp.score, max: sp.words.length, secs: tSecs(sp.t0), loc: locCopy() }); S.spellBest = S.spellBest || {}; S.spellBest[sp.id] = Math.max(S.spellBest[sp.id] || 0, sp.score); save(); renderStage(); reward(sp.score >= 8 ? 15 : 5, `Spelling Bee ${sp.score}/10`); return; }
      save(); renderTop(); renderStage(); setTimeout(() => { sayWord(); const i = $('#spin'); if (i) i.focus(); }, 300); return;
    }
    case 'spellagain': T.sp = null; renderStage(); return;
    case 'vstart': T.vs = { list: shuffle(LAB.verbs.irregular).slice(0, 10), i: 0, score: 0, miss: [], start: Date.now() }; renderStage(); setTimeout(() => { const i = $('#vp'); if (i) i.focus(); }, 50); return;
    case 'vquit': T.vs = null; renderStage(); return;
    case 'vcheck': {
      const vs = T.vs, v = vs.list[vs.i], p = ($('#vp').value || '').trim().toLowerCase(), pp = ($('#vpp').value || '').trim().toLowerCase();
      const okP = v.past.toLowerCase().split('/').map(x => x.trim()).includes(p), okPP = v.pp.toLowerCase().split('/').map(x => x.trim()).includes(pp);
      vs.score += (okP ? 1 : 0) + (okPP ? 1 : 0); vs.last = { ok: okP && okPP, v }; if (!(okP && okPP)) vs.miss.push(v);
      streakHit(okP && okPP); if (okP && okPP) chime('ok');
      vs.i++;
      if (vs.i >= vs.list.length) { vs.saved = courseResult({ kind: 'game', id: 'verbsprint', title: 'Verb Sprint', score: vs.score, max: vs.list.length * 2, secs: tSecs(vs.start), loc: locCopy() }); S.verbBest = Math.max(S.verbBest || 0, vs.score); save(); renderStage(); reward(Math.max(5, vs.score), `Verb Sprint ${vs.score}/20`); return; }
      renderStage(); setTimeout(() => { const i = $('#vp'); if (i) i.focus(); }, 50); return;
    }
    case 'estart': { const R = ER[S.loc.room]; T.er = { i: 0, solved: [], hint: R.puzzles.map(() => 0), start: Date.now() }; prepPuzzle(); renderStage(); chime('soft'); return; }
    case 'epick': if (T.er.solvedNow) return; T.er.pick = +b.dataset.i; T.er.msg = ''; renderStage(); egSfx('set'); return;
    case 'eoadd': if (T.er.solvedNow) return; T.er.ord = (T.er.ord || []).concat(+b.dataset.b); T.er.msg = ''; renderStage(); egSfx('set'); return;
    case 'eorem': if (T.er.solvedNow) return; T.er.ord.splice(+b.dataset.pos, 1); renderStage(); egSfx('tick'); return;
    case 'ehint': {
      const E = T.er; if (E.hint[E.i] >= 2) return;
      if (S.hintTokens) S.hintTokens--; else { if ((S.coins || 0) < 5) { toast('You need 5 coins or a hint token.'); return; } S.coins -= 5; }
      E.hint[E.i]++; save(); renderTop(); renderStage(); return;
    }
    case 'echeck': {
      const E = T.er, R = ER[S.loc.room], p = R.puzzles[E.i]; if (E.solvedNow) return;
      let ok = false;
      if (p.type === 'choice') { if (E.pick == null) { E.msg = 'Choose an answer.'; renderStage(); return; } ok = E.pick === p.answer; }
      else if (p.type === 'order') { const ord = E.ord || []; if (ord.length < p.items.length) { E.msg = 'Place every item.'; renderStage(); return; } ok = ord.every((x, i) => x === i); }
      else { const v = normA($('#ein').value); if (!v) { E.msg = p.type === 'code' ? 'Set the lock first.' : 'Type an answer.'; renderStage(); return; } ok = [p.answer].concat(p.accept || []).some(x => normA(x) === v); }
      E.ok = ok; E.msg = ok ? '' : 'The lock does not budge. Read the clue again, or take a hint.';
      if (ok) { E.solved[E.i] = true; E.solvedNow = true; chime('ok'); streakHit(true); SFXM.vault(); egSfx(p.type === 'code' ? 'unlock' : 'set'); }
      else { streakHit(false); E.fx = 'bad'; egSfx('bad'); SFXM.wrong(); if (E.m) { E.m.buf = ''; E.m.seq = []; } }
      renderStage(); if (ok) egFocus('.eg-found'); return;
    }
    case 'enext': T.er.got = T.er.i; T.er.i++; prepPuzzle(); renderStage(); egFocus('.eg-hot.live'); return;
    case 'efinal': {
      const E = T.er, R = ER[S.loc.room], code = Array.from(document.querySelectorAll('[data-lk]')).map(x => x.value).join('');
      if (normA(code) === normA(R.finalCode)) {
        E.out = Date.now() - E.start; { const em = MODS.find(x => x.id === String(R.module) || x.id.slice(1) === String(R.module)); E.saved = courseResult({ kind: 'escape', id: R.id, title: 'Escape room: ' + R.title, module: em ? em.id : '', score: R.puzzles.filter((p, i) => !E.hint[i]).length, max: R.puzzles.length, secs: Math.round(E.out / 1000), loc: { v: 'escape', room: S.loc.room } }); } S.escBest = S.escBest || {}; S.escBest[R.id] = Math.min(S.escBest[R.id] || Infinity, E.out); save(); renderStage(); egSfx('unlock'); setTimeout(() => egSfx('creak'), 1700); setTimeout(confetti, 2600);
        reward(40 + Math.max(0, 20 - E.hint.reduce((a, b) => a + b, 0) * 4), `Escaped ${R.title}`, { xp: 60 });
      } else { E.msg = 'Wrong code. Check the order of your digits.'; E.fx = 'bad'; egSfx('bad'); if (E.fm) { E.fm.buf = ''; E.fm.seq = []; } renderStage(); }
      return;
    }
  }
});
function prepPuzzle() { const E = T.er, R = ER[S.loc.room], p = R.puzzles[E.i]; E.pick = null; E.ord = []; E.msg = ''; E.ok = false; E.solvedNow = false; E.open = false; E.tw = ''; E.m = p && p.type === 'code' ? egNewLock(p.lock, p.answer, p.keys) : null; if (p && p.type === 'order') E.pool = shuffle(p.items.map((_, i) => i)); }
function sayWord() { const sp = T.sp; if (!sp || sp.i >= sp.words.length) return; const w = sp.words[sp.i]; if (TTS.ok) speak(w.w + '. ' + (w.sentence ? w.sentence + '. ' : '') + w.w + '.'); }
document.addEventListener('input', e => {
  if (e.target.matches('[data-gx-in="vq"]')) { T.vq = e.target.value; const tb = $('#vtable'); if (tb) { const pos = e.target.selectionStart; renderStage(); const n = $('#vq'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) { } } } }
  if (e.target.matches('[data-fix]')) { T.fix = e.target.value; if (T.submitted && !T.correct) T.submitted = false; }
  if (e.target.matches('[data-lk]') && e.target.value) { const n = document.querySelector(`[data-lk="${+e.target.dataset.lk + 1}"]`); if (n) n.focus(); }
});
document.addEventListener('input', e => { const k = e.target.dataset && e.target.dataset.peel; if (!k) return; T.peel = T.peel || { p: '', e: '', x: '', l: '' }; T.peel[k] = e.target.value; const lab = e.target.closest('.field').querySelector('label'); const ok = k === 'p' ? T.peel.p.trim().split(/\s+/).length >= 6 : k === 'e' ? EVID.test(T.peel.e) : k === 'x' ? EXPL.test(T.peel.x) : LINKW.test(T.peel.l); lab.lastChild.textContent = ok ? ' ✅' : ' ⬜'; const Q = T.peel, all = Q.p.trim().split(/\s+/).length >= 6 && EVID.test(Q.e) && EXPL.test(Q.x) && LINKW.test(Q.l); const btn = document.querySelector('[data-gx="peelins"]'); if (btn) btn.disabled = !all; });
document.addEventListener('change', e => {
  if (e.target.id !== 'zx-sel' || !e.target.value) return;
  const was = S.zexpert; S.zexpert = e.target.value; save(); if (!was) reward(5, 'Expertise chosen');
  renderStage();
  setTimeout(() => { const el = document.querySelector('.zxlist'); if (el) { el.scrollIntoView({ behavior: window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1400); } const own = document.getElementById('zx-own'); if (own && S.zexpert === 'other') own.focus({ preventScroll: true }); }, 40);
});
document.addEventListener('change', e => { if (e.target.id === 'pf-terr') { const sc = $('#pf-school'); if (sc) sc.innerHTML = schoolOpts(e.target.value, ''); const w = $('#pf-otherwrap'); if (w) w.hidden = true; tickClock(e.target.value); } if (e.target.id === 'pf-school') { const w = $('#pf-otherwrap'); if (w) w.hidden = e.target.value !== 'Other'; } });
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (e.target.id === 'spin') { e.preventDefault(); const b = document.querySelector('[data-gx="spellcheck"]'); if (b) b.click(); }
  if (e.target.id === 'vpp') { e.preventDefault(); const b = document.querySelector('[data-gx="vcheck"]'); if (b) b.click(); }
  if (e.target.id === 'ein') { e.preventDefault(); const b = document.querySelector('[data-gx="echeck"]'); if (b) b.click(); }
});

/* ---------------- checking ---------------- */
function check(v) {
  switch (v.type) {
    case 'mcq': { if (T.answer == null) return { need: 'Choose an answer first.' }; const o = v.options[T.answer]; return { ok: !!o.ok, msg: o.fb }; }
    case 'multi': {
      if (Object.keys(T.picks).length < v.items.length) return { need: 'Answer every question first.' };
      T.wrong = v.items.map((it, i) => T.picks[i] === it.answer ? -1 : i).filter(i => i >= 0);
      return { ok: !T.wrong.length, msg: T.wrong.length ? `${v.items.length - T.wrong.length} of ${v.items.length} correct. Look again at the ones in red.` : v.win || 'All correct!' };
    }
    case 'sort': {
      if (Object.keys(T.picks).length < v.items.length) return { need: 'Place every card first.' };
      T.wrong = v.items.map((it, i) => T.picks[i] === it.bin ? -1 : i).filter(i => i >= 0);
      return { ok: !T.wrong.length, msg: T.wrong.length ? `${v.items.length - T.wrong.length} of ${v.items.length} sorted correctly. Check the cards in red.` : v.win || 'All sorted!' };
    }
    case 'pick': { if (pickMany(v)) { const A = Array.isArray(T.answer) ? T.answer : []; if (!A.length) return { need: 'Tap at least one line first.' }; const ok = A.length === v.correct.length && v.correct.every(i => A.includes(i)); const missing = v.correct.filter(i => !A.includes(i)).length, extra = A.filter(i => !v.correct.includes(i)).length; return { ok, msg: ok ? v.win : v.miss + (missing || extra ? `<p class="hint">${missing ? missing + ' still to find' : ''}${missing && extra ? ' · ' : ''}${extra ? extra + ' selected that should not be' : ''}.</p>` : '') }; } if (T.answer == null) return { need: 'Tap a line first.' }; const ok = v.correct.includes(T.answer); return { ok, msg: ok ? v.win : v.miss }; }
    case 'order': {
      if (T.order.length < v.blocks.length) return { need: 'Place every block first.' };
      const ok = T.order.every((b, i) => b === i), right = T.order.filter((b, i) => b === i).length;
      return { ok, msg: ok ? v.win : `${right} of ${v.blocks.length} blocks are in the right place. Tap blocks to send them back and rearrange.` };
    }
    case 'fix': {
      const txt = (T.fix != null ? T.fix : v.text).trim(), low = txt.toLowerCase();
      if (!txt || txt === v.text.trim()) return { need: 'Edit the sentence first: cut the redundant or stock wording.' };
      const left = (v.banned || []).filter(x => low.includes(String(x).toLowerCase()));
      const ok = !left.length && wc(txt) < wc(v.text);
      return { ok, msg: ok ? `${v.why || 'Concise and clear.'}<p class="hint">One model answer: ${esc(v.model || '')}</p>` : left.length ? `Still there: ${left.map(x => '<b>' + esc(x) + '</b>').join(', ')}. Cut or replace ${left.length > 1 ? 'them' : 'it'}.` : 'Your version is not shorter yet. Remove every word that repeats meaning.' };
    }
    case 'match': {
      if (Object.keys(T.match.pairs).length < v.pairs.length) return { need: 'Match every item first.' };
      T.wrong = v.pairs.map((_, i) => +T.match.pairs[i] === i ? -1 : i).filter(i => i >= 0);
      return { ok: !T.wrong.length, msg: T.wrong.length ? `${v.pairs.length - T.wrong.length} of ${v.pairs.length} matched correctly. The items in red need another look; tap them to undo.` : v.win || 'All matched!' };
    }
  }
  return { ok: false, msg: '' };
}
const locked = () => T.submitted && T.correct;
function clearSub() { T.submitted = false; T.note = ''; T.warn = ''; }
function complete(viaTutor) {
  const L = S.loc;
  if (L.v === 'zc') { zDone(viaTutor); return; }
  if (L.v === 'lq' || L.v === 'xq') { S.labdone = S.labdone || {}; const k = L.v === 'lq' ? L.k + L.i : 'xq' + L.sub; const first = !S.labdone[k]; S.labdone[k] = true; reward(viaTutor ? 5 : first ? 15 : 8, L.v === 'lq' ? 'Quiz complete' : 'Jargon Match complete', { xp: 15 }); save(); render(); return; }
  if (L.v === 'screen') {
    const { u } = cur();
    if (!S.teacher && (S.prog[u.id] || 0) === L.s) { S.prog[u.id] = L.s + 1; const lvx = curLv(), pts = viaTutor ? 5 : lvx === 3 ? 15 : lvx === 1 ? 6 : 10; reward(pts, 'Screen complete', { xp: pts }); if (unitDone(u)) { setTimeout(() => { confetti(); reward(25, 'Unit complete', { xp: 20, noBonus: true }); }, 900); } }
  }
  save(); render();
}

/* ---------------- events ---------------- */
document.addEventListener('click', e => {
  const flip = e.target.closest('[data-gx="flip"]');
  if (flip) { flip.classList.toggle('on'); SFXM.click(); return; }
  const g = e.target.closest('[data-go]');
  if (g) {
    SFXM.click();
    const d = g.dataset, loc = { v: d.go };
    ['tab', 'sub', 'seed', 'k'].forEach(x => { if (d[x] != null) loc[x] = d[x]; }); ['d', 'c', 'room', 'i'].forEach(x => { if (d[x] != null) loc[x] = +d[x]; });
    if (loc.v === 'xq' && !owns('g-jargon') && !buy('g-jargon', 30, 'Jargon Match')) return;
    if (d.gsec != null) loc.gsec = d.gsec; if (d.p) loc.p = d.p; if (d.q != null) loc.q = +d.q; if (d.free) loc.free = 1;
    if (loc.v === 'ptest') { loc.v = 'test'; loc.free = 1; } if (d.m) loc.m = d.m; if (d.u != null) loc.u = +d.u; if (d.s != null) loc.s = +d.s;
    if ((loc.v === 'unit' || loc.v === 'screen') && !unitReleased(mod(loc.m), loc.u)) { { const t = unitReleaseAt(mod(loc.m), loc.u); toast(isFinite(t) ? `Unit ${loc.u + 1} opens ${relDate(t)}.` : `Your teacher will announce when Unit ${loc.u + 1} opens.`); } if (loc.v === 'screen') return; }
    else if (loc.v === 'unit' && !unitOpen(mod(loc.m), loc.u)) { toast(`Finish Unit ${loc.u} first.`); return; }
    if (loc.v === 'screen' && (!unitOpen(mod(loc.m), loc.u) || !screenOpen(mod(loc.m).units[loc.u], loc.s))) { toast('Finish the earlier screens first.'); return; }
    if (loc.v === 'zombie') { setTimeout(() => SFXM.zombie(), 200); }
    if (loc.v === 'escape') { setTimeout(() => SFXM.alert(), 300); }
    go(loc); return;
  }
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act;
  const v = ['screen', 'paper2', 'pq', 'zc', 'lq', 'xq'].includes(S.loc.v) ? variant() : null;
  switch (act) {
    case 'resume': go(resumeLoc()); return;
    case 'setname': { const n = ($('#nm').value || '').trim(); if (n) { S.name = n.slice(0, 40); save(); render(); toast('Name saved'); } return; }
    case 'tutor': openTutor(null); return;
    case 'cyclelv': { const l = ((S.level || 2) % 3) + 1; S.level = l; S.secLv = {}; S.lv = {}; S.easy = {}; save(); resetT(); render(); toast(`${LVI[l]} Course level: ${LVN[l]}`); return; }
    case 'dial': { setLv(curLv() === 1 ? 2 : 1); return; }
    case 'setlv': { const l = +b.dataset.l; if ([1, 2, 3].includes(l)) setLv(l); return; }
    case 'glv': { const l = +b.dataset.l; if (![1, 2, 3].includes(l)) return; S.level = l; S.secLv = {}; S.lv = {}; S.easy = {}; save(); resetT(); render(); toast(`${LVI[l]} Every module is now at ${LVN[l]} level. You can still dial any screen up or down.`); return; }
    case 'seclv': { const l = +b.dataset.l, m = b.dataset.m; if (![1, 2, 3].includes(l) || !mod(m)) return; S.secLv = S.secLv || {}; S.secLv[m] = l; save(); render(); toast(`${LVI[l]} ${mod(m).code} set to ${LVN[l]} level`); return; }
    case 'learn-yes': complete(false); return;
    case 'learn-no': openTutor(() => complete(true)); return;
    case 'mood': T.mood = b.dataset.m; if (!screenDone(cur().u, S.loc.s)) { complete(false); } else renderStage(); return;
    case 'redo-easy': { const i = +b.dataset.i; const L = S.loc; S.lv[cur().u.id + '-' + i] = 1; go({ v: 'screen', m: L.m, u: L.u, s: i }); toast('🪜 Foundation level on'); return; }
    case 'opt': if (locked()) return; T.answer = +b.dataset.i; clearSub(); renderStage(); return;
    case 'pick': { if (locked()) return; const v0 = variant(), i = +b.dataset.i; if (v0 && pickMany(v0)) { const A = Array.isArray(T.answer) ? T.answer.slice() : []; const k = A.indexOf(i); if (k >= 0) A.splice(k, 1); else A.push(i); T.answer = A; } else T.answer = i; clearSub(); renderStage(); return; }
    case 'mpick': if (locked()) return; T.picks[+b.dataset.i] = +b.dataset.o; T.wrong = T.wrong.filter(x => x !== +b.dataset.i); clearSub(); renderStage(); return;
    case 'sbin': if (locked()) return; T.picks[+b.dataset.i] = +b.dataset.b; T.wrong = T.wrong.filter(x => x !== +b.dataset.i); clearSub(); renderStage(); return;
    case 'oadd': if (locked()) return; T.order.push(+b.dataset.b); clearSub(); renderStage(); return;
    case 'orem': if (locked()) return; T.order.splice(+b.dataset.pos, 1); clearSub(); renderStage(); return;
    case 'ml': { if (locked()) return; const i = +b.dataset.i; if (T.match.pairs[i] != null) { delete T.match.pairs[i]; T.wrong = T.wrong.filter(x => x !== i); T.match.sel = null; } else T.match.sel = T.match.sel === i ? null : i; clearSub(); renderStage(); return; }
    case 'mr': {
      if (locked()) return; const r = +b.dataset.r;
      const owner = Object.keys(T.match.pairs).find(l => +T.match.pairs[l] === r);
      if (owner != null) { delete T.match.pairs[owner]; T.wrong = T.wrong.filter(x => x !== +owner); }
      if (T.match.sel != null) { T.match.pairs[T.match.sel] = r; T.match.sel = null; } else if (owner == null) toast('Tap an item on the left first.');
      clearSub(); renderStage(); return;
    }
    case 'schoice': {
      const i = +b.dataset.i, nodes = v.nodes, node = nodes[T.scene.node], c = node.choices[i];
      T.scene.hist.push({ node: T.scene.node, choice: i }); T.scene.node = c.to;
      const nn = nodes[c.to];
      if (nn.end) { T.submitted = true; T.correct = nn.end === 'good'; T.saved = screenResult(v, T.correct, nn.end); if (!T.correct) { const k = skey(); ATTEMPTS[k] = (ATTEMPTS[k] || 0) + 1; } }
      renderStage(); return;
    }
    case 'srestart': T.scene = { node: 'start', hist: [] }; clearSub(); T.correct = false; renderStage(); return;
    case 'submit': {
      const r = check(v);
      if (r.need) { T.warn = r.need; renderStage(); return; }
      T.submitted = true; T.correct = r.ok; T.msg = r.msg; T.note = ''; T.warn = ''; T.saved = screenResult(v, r.ok);
      if (!r.ok) { const k = skey(); ATTEMPTS[k] = (ATTEMPTS[k] || 0) + 1; SFXM.wrong(); }
      streakHit(r.ok); renderStage(); if (r.ok) { chime('ok'); glowCard(); SFXM.success(); } return;
    }
    case 'retry': { const p = T.pool, ro = T.rorder; resetT(); if (p) T.pool = p; if (ro) T.rorder = ro; renderStage(); return; }
    case 'self-yes':
      if (T.correct) { if (['screen', 'zc', 'lq', 'xq'].includes(S.loc.v)) complete(false); }
      else { T.note = 'checker'; renderStage(); }
      return;
    case 'self-no':
      if (T.correct) openTutor(() => { if (['screen', 'zc', 'lq', 'xq'].includes(S.loc.v)) complete(true); });
      else openTutor(() => { const p = T.pool, ro = T.rorder; resetT(); if (p) T.pool = p; if (ro) T.rorder = ro; renderStage(); });
      return;
    case 'next': go(nextLoc()); return;
    case 'wsubmit': {
      const w = wc(T.text || '');
      if (w < v.min) { T.warn = `Write at least ${v.min} words before submitting. You have ${w}.`; renderStage(); return; }
      if (w > v.max) { T.warn = `Your piece is ${w} words. Cut it to ${v.max} or fewer; staying within limits is part of the skill.`; renderStage(); return; }
      if (v.checklist.some((_, i) => !T.checks[i])) { T.warn = 'Tick each checklist box once your writing does that thing. If you cannot tick one, improve your writing first.'; renderStage(); return; }
      T.warn = ''; T.submitted = true; T.correct = true; T.result = analyse(T.text, v); T.ai = null; T.aiState = 'idle'; T.saved = writeResult(v);
      const d = DRAFTS[skey()] || {}; d.text = T.text; d.checks = T.checks; d.submitted = true; d.ai = null; DRAFTS[skey()] = d; saveDrafts();
      if (S.loc.v === 'pq') { S.pdone = S.pdone || {}; if (!S.pdone[skey()]) { S.pdone[skey()] = true; S.xp += 10; save(); renderTop(); } }
      if (S.loc.v === 'paper2' && !S.p2[S.loc.m]) { S.p2[S.loc.m] = true; reward(30, 'Essay submitted', { xp: 30 }); if (modComplete(mod(S.loc.m))) setTimeout(confetti, 300); renderSide(); }
      else if (S.loc.v === 'pq' || S.loc.v === 'screen') reward(10, 'Writing submitted', { noBonus: true });
      renderStage();
      setTimeout(() => { const el = document.querySelector('.tfb'); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
      return;
    }
    case 'ai': runAI(v); return;
    case 'aistop': if (aiCtl) aiCtl.abort(); return;
    case 'gsec': T.g.sec = b.dataset.k; T.g.limit = 120; renderStage(); return;
    case 'glet': T.g.letter = b.dataset.l; T.g.limit = 120; renderStage(); return;
    case 'gmore': T.g.limit += 120; { const el = $('#glist'); if (el) el.innerHTML = glossListHTML(); } return;
    case 'greset': T.g = null; S.loc.gsec = ''; renderStage(); return;
    case 'gsee': T.g = { q: b.dataset.t, sec: '', cat: '', src: '', letter: '', limit: 120 }; renderStage(); return;
    case 'speak': {
      if (TTS.on) { stopSpeak(); return; }
      if (b.dataset.clip && AUD[b.dataset.clip]) { playClip(b.dataset.clip, b.dataset.t); return; }
      if (b.dataset.t) { speak(b.dataset.t); return; }
      const box = b.closest('.card, article, .gterm, .titem') || $('#stage'); speak(textOf(box)); return;
    }
    case 'ttsrate': TTS.rate = TTS.rate >= 1.4 ? 0.8 : Math.round((TTS.rate + 0.2) * 10) / 10; refreshListen(); toast('Reading speed ' + TTS.rate + '×'); return;
    case 'tstart': { const P = paper(S.loc.p); T.timerEnd = Date.now() + P.time * 60000; renderStage(); tickTimer(); timerInt = setInterval(tickTimer, 1000); return; }
    case 'tstop': T.timerEnd = null; if (timerInt) clearInterval(timerInt); timerInt = null; renderStage(); return;
    case 'pkey': T.showKey = !T.showKey; renderStage(); return;
    case 'psubmit': {
      const P = paper(S.loc.p);
      if (Object.keys(T.ans).length < P.items.length) { T.warn = `Answer all ${P.items.length} items first. You have answered ${Object.keys(T.ans).length}.`; renderStage(); return; }
      T.submitted = true; T.timerEnd = null; if (timerInt) clearInterval(timerInt); timerInt = null;
      const pct = Math.round(P.items.filter((it, i) => T.ans[i] === it.answer).length / P.items.length * 100);
      T.saved = courseResult({ kind: 'paper', id: P.id, title: P.title || P.id, score: P.items.filter((it, i) => T.ans[i] === it.answer).length, max: P.items.length, pct, secs: tSecs(), loc: { v: 'paper', p: P.id } });
      S.pscore = S.pscore || {}; S.pscore[P.id] = Math.max(S.pscore[P.id] || 0, pct); save(); render(); reward(Math.round(pct / 4), 'Paper 01 submitted', { xp: 20 }); window.scrollTo({ top: 0 }); return;
    }
    case 'tans': if (T.submitted) return; T.ans[+b.dataset.i] = +b.dataset.o; T.warn = ''; renderStage(); return;
    case 'tsubmit': {
      const m = mod(S.loc.m), t = m.test;
      if (Object.keys(T.ans).length < t.items.length) { T.warn = `Answer all ${t.items.length} questions first. You have answered ${Object.keys(T.ans).length}.`; renderStage(); return; }
      T.submitted = true;
      const pct = Math.round(t.items.filter((it, i) => T.ans[i] === it.answer).length / t.items.length * 100);
      T.saved = courseResult({ kind: 'test', id: m.id, title: t.title || (m.code + ' test'), module: m.id, score: t.items.filter((it, i) => T.ans[i] === it.answer).length, max: t.items.length, pct, secs: tSecs(), practice: !!S.loc.free, loc: S.loc.free ? { v: 'test', m: m.id, free: 1 } : { v: 'test', m: m.id } });
      const prev = S.tests[m.id]; const wasPassed = testPassed(m);
      S.tests[m.id] = Math.max(prev || 0, pct);
      if (!wasPassed && testPassed(m)) { setTimeout(() => { confetti(); reward(40, 'Test passed', { xp: 50 }); }, 300); } else reward(Math.round(pct / 10), 'Test submitted', { noBonus: true });
      save(); render(); window.scrollTo({ top: 0 }); return;
    }
    case 'tretake': resetT(); renderStage(); window.scrollTo({ top: 0 }); return;
    case 'teacher': {
      if (!TEACHER_ED) { S.teacher = false; return; }
      if (S.teacher) { S.teacher = false; save(); render(); toast('Teacher unlock turned off'); return; }
      if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = 'Tap again to unlock every screen'; setTimeout(() => { delete b.dataset.armed; if (!S.teacher) b.textContent = 'Teacher preview: unlock all'; }, 3000); return; }
      S.teacher = true; save(); render(); toast('Everything is unlocked'); return;
    }
    case 'reset': {
      if (!b.dataset.armed) { b.dataset.armed = '1'; b.textContent = 'Tap again to erase all progress'; setTimeout(() => { delete b.dataset.armed; b.textContent = 'Reset my progress'; }, 3000); return; }
      S = BLANK(); S.teacher = TEACHER_ED; Object.keys(DRAFTS).forEach(k => delete DRAFTS[k]); saveDrafts(); save(); resetT(); render(); toast('Progress reset'); return;
    }
  }
});
document.addEventListener('input', e => {
  if (e.target.matches('[data-ta]')) {
    T.text = e.target.value;
    const v = variant(), w = wc(T.text), el = $('#wcn');
    if (el) { el.textContent = w; el.classList.toggle('over', w > v.max); }
    const d = DRAFTS[skey()] || {}; d.text = T.text; d.checks = T.checks; DRAFTS[skey()] = d;
    clearTimeout(input.t); input.t = setTimeout(saveDrafts, 500);
  }
  if (e.target.matches('[data-gq]')) { T.g.q = e.target.value; T.g.limit = 120; const el = $('#glist'); if (el) el.innerHTML = glossListHTML(); }
});
const input = {};
document.addEventListener('change', e => {
  if (e.target.matches('[data-gsel]')) { T.g[e.target.dataset.gsel] = e.target.value; T.g.limit = 120; const el = $('#glist'); if (el) el.innerHTML = glossListHTML(); }
  if (e.target.matches('[data-chk]')) { T.checks[+e.target.dataset.chk] = e.target.checked; const d = DRAFTS[skey()] || {}; d.checks = T.checks; d.text = T.text; DRAFTS[skey()] = d; saveDrafts(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (!$('#modal').hidden) closeModal(false); else closeSide(); }
  if (e.key === 'Enter' && e.target.id === 'nm') { e.preventDefault(); const b = document.querySelector('[data-act="setname"]'); if (b) b.click(); }
});
$('#menuBtn').addEventListener('click', () => ($('#side').classList.contains('open') ? closeSide() : openSide()));
$('#scrim').addEventListener('click', closeSide);

/* ---------------- tutor modal ---------------- */
let slides = [], si = 0, tcb = null;
function openTutor(cb) {
  const L = S.loc;
  let v = null, s = null;
  if (L.v === 'screen') { s = cur().s; v = variant(); if (s && v && !v.tutor) v = Object.assign({}, v, { tutor: s.tutor }); }
  if (L.v === 'paper2') v = mod(L.m).paper2;
  if (L.v === 'pq') v = pq();
  if (['zc', 'lq', 'xq'].includes(L.v)) v = variant();
  slides = (v && v.tutor) || (s && s.tutor) || null;
  if (!slides && v && v.type === 'write') {
    slides = [{ h: 'What the task wants', p: `<p>${v.prompt}</p>` }];
    if (v.frame) slides.push({ h: 'Use this structure', p: v.frame });
    slides.push({ h: 'What the marker looks for', p: `<ul>${v.rubric.map(r => `<li><b>${esc(r.criterion)}</b> (${r.marks} marks): ${r.weak}</li>`).join('')}</ul>` });
    if (v.teacherTip) slides.push({ h: "Teacher's tip", p: `<p>${v.teacherTip}</p>` });
  }
  if (!slides) slides = [{ h: 'Quick recap', p: `<ul>${(cur().u ? cur().u.objectives : []).map(o => `<li>${o}</li>`).join('')}</ul>` }];
  si = 0; tcb = cb; renderTutor(); $('#modal').hidden = false; $('.mbox').focus();
}
function renderTutor() {
  const s = slides[si], last = si === slides.length - 1;
  $('#mdots').innerHTML = slides.map((_, i) => `<i class="${i <= si ? 'on' : ''}"></i>`).join('');
  $('#mbody').innerHTML = `<span class="lbl">Tip ${si + 1} of ${slides.length}</span><h3>${s.h}</h3><div class="html-body">${s.p}</div>`;
  $('#mbtns').innerHTML = `${si > 0 ? '<button type="button" class="btn ghost" id="mprev">← Back</button>' : ''}${last ? `<button type="button" class="btn go" id="mdone">${tcb ? 'Got it, let me continue' : 'Got it'}</button>` : '<button type="button" class="btn go" id="mnext">Next tip →</button>'}`;
}
function closeModal(finish) { $('#modal').hidden = true; const cb = tcb; tcb = null; if (finish && cb) cb(); }
$('#modal').addEventListener('click', e => {
  const id = e.target.id;
  if (id === 'mnext') { si++; renderTutor(); }
  else if (id === 'mprev') { si--; renderTutor(); }
  else if (id === 'mdone') closeModal(true);
  else if (id === 'mclose' || id === 'modal') closeModal(false);
});

/* ---------------- toast + confetti ---------------- */
let tt;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => { t.hidden = true; }, 2400); }
function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = $('#fx'), x = c.getContext('2d'), dpr = window.devicePixelRatio || 1;
  c.width = innerWidth * dpr; c.height = innerHeight * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
  const cs = getComputedStyle(document.documentElement), cols = ['--blue', '--gold', '--gold-deep', '--ok'].map(k => cs.getPropertyValue(k).trim());
  const P = Array.from({ length: 140 }, () => ({ x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - .5) * 12, vy: Math.random() * -11 - 3, r: Math.random() * 6 + 4, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6 }));
  let f = 0;
  (function tick() { x.clearRect(0, 0, innerWidth, innerHeight); P.forEach(p => { p.vx *= .985; p.vy = p.vy * .985 + .26; p.x += p.vx + Math.sin(p.a * .7) * .9; p.y += p.vy; p.a += .12 + p.r * .01; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.scale(1, Math.cos(p.a * 1.6)); x.globalAlpha = Math.max(0, Math.min(1, (200 - f) / 40)); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); x.restore(); }); if (++f < 200) requestAnimationFrame(tick); else x.clearRect(0, 0, innerWidth, innerHeight); })();
}

/* ---------------- Initial Caps for titles, tabs and headings ---------------- */
const MINOR = new Set('a an the and but or nor for so yet at by in of on to up as vs via per off out'.split(' '));
function capWord(w, force) {
  if (!w || /^(e\.g\.|i\.e\.|etc\.?|vs\.?|www\.|https?:)/i.test(w)) return w;
  const core = w.replace(/[^A-Za-z]/g, '').toLowerCase();
  if (!force && MINOR.has(core)) return w;
  return w.split('-').map(p => (!p || !/^[^A-Za-z]*[a-z]/.test(p) || /[A-Z]/.test(p.slice(1))) ? p : p.replace(/[a-z]/, c => c.toUpperCase())).join('-');
}
function titleCaseEl(el) {
  if (!el || el.dataset.tc === '1' || el.closest('[data-notc],.opts,.q,.passage,.html-body,textarea,input,.ce')) return;
  const full = (el.textContent || '').trim();
  if (!full || full.split(/\s+/).length > 9 || (/[?!.]$/.test(full) && full.split(/\s+/).length > 4 && !el.matches('.chip,[role="tab"],.slink .t,.tile h3'))) { el.dataset.tc = '1'; return; }
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let first = true, n;
  const nodes = []; while ((n = walker.nextNode())) nodes.push(n);
  nodes.forEach(t => {
    const parts = t.nodeValue.split(/(\s+)/);
    for (let i = 0; i < parts.length; i++) {
      const w = parts[i]; if (!w || /^\s+$/.test(w)) continue;
      const prev = parts.slice(0, i).join('').trim(); const after = /[&:·—–|/]$/.test(prev) || (!prev && /[&:·—–|]\s*$/.test(t.previousSibling ? '' : ''));
      const nextIsLast = !parts.slice(i + 1).join('').trim() && t === nodes[nodes.length - 1];
      if (/^[&:·—–|/]$/.test(w)) { parts[i] = w; first = true; continue; }
      parts[i] = capWord(w, first || after || nextIsLast);
      first = /[:·—–]$/.test(w);
    }
    const nv = parts.join(''); if (nv !== t.nodeValue) t.nodeValue = nv;
  });
  el.dataset.tc = '1';
}
const TC_SEL = '#stage h1,#stage h2,#stage h3,#stage h4,#stage summary,#stage .chip,#stage .ctabs .chip,#stage [role="tab"],#side .slink .t,#side .slabel,#stage .tile h3,#stage .lrow .t b';
function applyTitleCase(root) { try { (root || document).querySelectorAll(TC_SEL).forEach(titleCaseEl); } catch (e) { } }
(function () { let q = 0; const mo = new MutationObserver(() => { if (q) return; q = requestAnimationFrame(() => { q = 0; applyTitleCase(); }); }); const start = () => { const st = document.getElementById('stage'), sd = document.getElementById('side'); if (st) mo.observe(st, { childList: true, subtree: true }); if (sd) mo.observe(sd, { childList: true, subtree: true }); }; start(); })();

/* ---------------- 3D tilt + light that follows the pointer ---------------- */
(function () {
  const RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; let cur = null;
  const SEL = '.tile,.mcardx,.flagbtn,.hero,.avpick,.skin';
  document.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const el = e.target.closest && e.target.closest(SEL);
    if (cur && cur !== el) { cur.style.transform = ''; cur = null; }
    if (!el) return;
    const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', (x * 100) + '%'); el.style.setProperty('--my', (y * 100) + '%');
    if (RM) return;
    el.classList.add('tilt'); const k = el.classList.contains('hero') ? 3 : 9;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * k}deg) rotateY(${(x - 0.5) * k}deg) translateY(-4px)`; cur = el;
  }, { passive: true });
  document.addEventListener('pointerleave', () => { if (cur) { cur.style.transform = ''; cur = null; } }, true);
})();

/* ---------------- boot ---------------- */
SCORM.init();
if (S.loc && S.loc.m && !mod(S.loc.m)) S.loc = { v: 'home' };
if (location.hash === '#games') S.loc = { v: 'games' };
else if (PLUGS[location.hash.slice(1)]) S.loc = { v: location.hash.slice(1) };
else if (location.hash === '#welcome' || (CARIB && !S.seenCarib && (!S.loc || S.loc.v === 'home'))) S.loc = { v: 'carib' };
{ const HL = hashLoc(location.hash); if (HL) S.loc = HL; }
applySkin();
resetT(); render(); try { NAVKEY = locKey(S.loc); if (S.loc.sec) navAfter(S.loc, true); } catch (e) { } try { const h0 = locHash(S.loc); if (location.hash !== h0) { try { history.replaceState(null, '', h0); } catch (e1) { location.replace(h0); } } } catch (e) { } tickClock(); applyTitleCase();
})();
/* Full-screen game player: games open over the whole course window and go browser full screen where allowed */
function openGameFull(page, id) {
  closeGameFull(true);
  let src = page, blob = null;
  if (window.GAME_HTML && window.GAME_HTML[id]) { blob = URL.createObjectURL(new Blob([window.GAME_HTML[id]], { type: 'text/html' })); src = blob; }
  if (!document.getElementById('gx-full-css')) {
    const st = document.createElement('style'); st.id = 'gx-full-css';
    st.textContent = '#gx-full{position:fixed;inset:0;width:100vw;height:100vh;height:100dvh;z-index:2147483000;background:#000;display:block}' +
      '#gx-full iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:#000}' +
      '#gx-full .gx-bar{position:absolute;left:calc(8px + env(safe-area-inset-left,0px));bottom:calc(8px + env(safe-area-inset-bottom,0px));display:flex;gap:6px;z-index:2;opacity:.55;transition:opacity .2s}' +
      '#gx-full .gx-bar:hover,#gx-full .gx-bar:focus-within{opacity:1}' +
      '#gx-full .gx-bar button{font:700 12px/1 system-ui,sans-serif;color:#fff;background:rgba(10,20,51,.85);border:1px solid rgba(245,197,66,.7);border-radius:99px;padding:6px 10px;cursor:pointer}' +
      '#gx-full .gx-bar button:hover{background:#F5C542;color:#0A1433}' +
      'body.gx-open{overflow:hidden}';
    document.head.appendChild(st);
  }
  const ov = document.createElement('div'); ov.id = 'gx-full'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Game');
  const fr = document.createElement('iframe');
  fr.setAttribute('allow', 'fullscreen; autoplay; encrypted-media; gamepad; pointer-lock; accelerometer; gyroscope; xr-spatial-tracking; camera');
  fr.setAttribute('allowfullscreen', ''); fr.title = 'Game'; fr.src = src;
  const bar = document.createElement('div'); bar.className = 'gx-bar';
  bar.innerHTML = '<button type="button" data-gxa="fs">⛶ Full screen</button><button type="button" data-gxa="x">✕ Exit game</button>';
  ov.appendChild(fr); ov.appendChild(bar); document.body.appendChild(ov); document.body.classList.add('gx-open');
  ov._blob = blob;
  const fsBtn = bar.querySelector('[data-gxa="fs"]');
  const canFs = !!(ov.requestFullscreen || ov.webkitRequestFullscreen) && document.fullscreenEnabled !== false;
  if (!canFs) fsBtn.hidden = true;
  const goFs = () => { try { const r = (ov.requestFullscreen || ov.webkitRequestFullscreen).call(ov); if (r && r.catch) r.catch(() => { fsBtn.hidden = true; }); } catch (e) { fsBtn.hidden = true; } };
  bar.addEventListener('click', ev => { const a = ev.target.closest('[data-gxa]'); if (!a) return; if (a.dataset.gxa === 'x') closeGameFull(); else { const fe = document.fullscreenElement || document.webkitFullscreenElement; if (fe) (document.exitFullscreen || document.webkitExitFullscreen).call(document); else goFs(); } });
  const sync = () => { const fe = document.fullscreenElement || document.webkitFullscreenElement; fsBtn.textContent = fe ? '⤢ Exit full screen' : '⛶ Full screen'; };
  ov._sync = sync; document.addEventListener('fullscreenchange', sync); document.addEventListener('webkitfullscreenchange', sync);
  fr.addEventListener('load', () => { try { fr.focus(); fr.contentWindow && fr.contentWindow.focus(); } catch (e) { } });
  try { const hs = history.state; if (!(hs && hs.gx)) history.pushState({ gx: 1 }, '', location.href); } catch (e) { }
  if (canFs) goFs();
}
function closeGameFull(nohist) {
  const ov = document.getElementById('gx-full'); if (!ov) return;
  try { const fe = document.fullscreenElement || document.webkitFullscreenElement; if (fe) (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) { }
  if (ov._sync) { document.removeEventListener('fullscreenchange', ov._sync); document.removeEventListener('webkitfullscreenchange', ov._sync); }
  ov.remove(); document.body.classList.remove('gx-open');
  if (ov._blob) setTimeout(() => URL.revokeObjectURL(ov._blob), 1000);
  if (!nohist) { try { const hs = history.state; if (hs && hs.gx) history.back(); } catch (e) { } }
}
window.openGameFull = openGameFull; window.closeGameFull = closeGameFull;
