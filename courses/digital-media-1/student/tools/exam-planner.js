/* Exam & Class Timetable Planner — shared component for every e-course.
   Needs subjects.js (window.EXAM_PLANNER_DATA) loaded first.
   Use:  ExamPlanner.mount(element, { course: 'CAPE|Digital Media (Unit 1)', edition: 'student' | 'teacher' })
   Optional: store: { load(), save(state) } to keep the planner in the course's own saved progress; onChange(planner).
   Everything runs in the page: no network, no outside libraries. */
(function () {
  'use strict';
  if (window.ExamPlanner) return;

  var CSS = [
    '.ep{--ep-navy:var(--ink,#F1F4FF);--ep-gold:var(--blue,#F5C542);--ep-on-gold:var(--on-blue,#0A1433);--ep-blue:var(--ink,#F1F4FF);--ep-bg:var(--surface,#0E1B44);--ep-soft:var(--raise,rgba(255,255,255,.06));--ep-line:var(--line,rgba(245,197,66,.22));--ep-field:var(--field-line,rgba(245,197,66,.5));--ep-ink:var(--ink,#F1F4FF);--ep-mute:var(--muted,#AEB9DD);--ep-bad:var(--bad,#FF7A6B);',
    'font:15px/1.5 var(--f-body,"Atkinson Hyperlegible",Verdana,"Segoe UI",sans-serif);color:var(--ep-ink);background:var(--ep-bg);border:1px solid var(--ep-line);border-radius:16px;box-shadow:var(--shadow,none);overflow:hidden;-webkit-user-select:none;user-select:none}',
    '@media print{.ep{--ep-bg:#fff;--ep-soft:#f3f5f9;--ep-line:#c8cfdc;--ep-field:#8a93ae;--ep-ink:#111;--ep-mute:#444;--ep-navy:#111;--ep-blue:#111;--ep-gold:#86620A;--ep-on-gold:#fff;box-shadow:none}}',
    '.ep *{box-sizing:border-box}.ep input,.ep select,.ep textarea{-webkit-user-select:text;user-select:text;font:inherit;color:inherit;background:var(--ep-soft);border:1.5px solid var(--ep-field);border-radius:8px;padding:6px 8px}.ep input:focus,.ep select:focus,.ep textarea:focus{outline:3px solid var(--ep-gold);outline-offset:1px}',
    '.ep-head{background:radial-gradient(420px 200px at 90% 0%,rgba(245,197,66,.26),transparent 70%),linear-gradient(160deg,#122a6b,#0a1638 75%);color:#fff;padding:16px 18px;border-bottom:3px solid #F5C542}.ep-head h2{margin:0;font:800 1.3em/1.15 var(--f-display,"Bricolage Grotesque","Segoe UI",sans-serif);color:#fff}.ep-head p{margin:4px 0 0;color:#DCE3FF;font-size:.92em}',
    '.ep-tabs{display:flex;gap:2px;overflow-x:auto;background:var(--ep-soft);border-bottom:1px solid var(--ep-line)}',
    '.ep-tab{flex:0 0 auto;border:0;background:none;padding:10px 14px;font:inherit;color:var(--ep-mute);cursor:pointer;border-bottom:3px solid transparent}',
    '.ep-tab[aria-selected=true]{color:var(--ep-ink);border-bottom-color:var(--ep-gold);font-weight:700}.ep-tab:focus-visible,.ep-btn:focus-visible,.ep-letter:focus-visible{outline:3px solid var(--ep-gold);outline-offset:2px}',
    '.ep-body{padding:16px}.ep h3{margin:0 0 6px;color:var(--ep-navy);font:700 1.12em var(--f-display,"Bricolage Grotesque","Segoe UI",sans-serif)}.ep .ep-hint{color:var(--ep-mute);font-size:.9em;margin:4px 0 10px}',
    '.ep-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0}',
    '.ep-btn{border:1.5px solid var(--ep-field);background:var(--ep-soft);color:var(--ep-ink);border-radius:10px;padding:7px 12px;font:inherit;font-weight:700;cursor:pointer}',
    '.ep-btn:hover{border-color:var(--ep-gold)}.ep-btn.on,.ep-btn.pri,.ep-btn.gold{background:var(--ep-gold);color:var(--ep-on-gold);border-color:var(--ep-gold)}',
    '.ep-btn:disabled{opacity:.45;cursor:not-allowed}.ep-btn.sm{padding:3px 8px;font-size:.85em}',
    '.ep-chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 12px}',
    '.ep-chip{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:4px 6px 4px 10px;font-size:.88em;border:1px solid var(--ep-line);background:var(--ep-soft)}',
    '.ep-chip i{width:10px;height:10px;border-radius:50%;display:inline-block}.ep-chip button{border:0;background:none;cursor:pointer;color:var(--ep-mute);font-size:1.05em;padding:0 4px}',
    '.ep-lv{font-size:.72em;font-weight:700;letter-spacing:.04em;color:var(--ep-mute)}',
    '.ep-letters{display:flex;flex-wrap:wrap;gap:3px;margin:8px 0}',
    '.ep-letter{min-width:30px;padding:5px 0;text-align:center;border:1.5px solid var(--ep-field);background:var(--ep-soft);border-radius:7px;cursor:pointer;font:inherit;font-weight:700;color:var(--ep-ink)}',
    '.ep-letter.on{background:var(--ep-gold);color:var(--ep-on-gold);border-color:var(--ep-gold)}.ep-letter:disabled{opacity:.3;cursor:default}',
    '.ep-sec{margin:6px 0 10px}.ep-sec h4{margin:8px 0 4px;color:var(--ep-blue);font-size:1em;border-bottom:2px solid var(--ep-gold);padding-bottom:2px}',
    '.ep-sub{display:flex;align-items:center;gap:8px;padding:5px 6px;border-radius:6px;cursor:pointer}.ep-sub:hover{background:var(--ep-soft)}',
    '.ep-sub input{width:18px;height:18px;margin:0;accent-color:var(--ep-gold)}.ep-sub small{color:var(--ep-mute)}',
    '.ep-scroll{overflow:auto;max-height:70vh;border:1px solid var(--ep-line);border-radius:8px}',
    '.ep table{border-collapse:collapse;width:100%}.ep th,.ep td{border:1px solid var(--ep-line);padding:6px 8px;text-align:left;vertical-align:top}',
    '.ep th{background:var(--ep-soft);color:var(--ep-navy);position:sticky;top:0;z-index:1}',
    '.ep-cd{display:inline-block;margin-left:6px;font-size:.78em;font-weight:700;background:var(--ep-gold);color:var(--ep-on-gold);border-radius:999px;padding:1px 7px}',
    '.ep-cd.past{background:var(--ep-line);color:var(--ep-mute)}',
    '.ep-clash{color:var(--ep-bad);font-weight:700;font-size:.85em}',
    '.ep-cal{min-width:640px}.ep-cal td{height:84px;width:14.28%;font-size:.82em}.ep-cal td.off{background:var(--ep-soft)}.ep-cal .dn{font-weight:700;color:var(--ep-mute)}',
    '.ep-ex{display:block;margin-top:3px;padding:2px 5px;border-radius:5px;color:#fff;font-size:.95em;line-height:1.25}',
    '.ep-grid{min-width:680px}.ep-grid td{padding:3px}.ep-grid select{width:100%;padding:4px;border:1px solid var(--ep-line);border-radius:6px;font-size:.88em}',
    '.ep-grid th.ep-p{white-space:nowrap;font-size:.82em}.ep-grid th.ep-p input{width:104px;padding:2px 4px;font-size:.95em}',
    '.ep-note{background:var(--ep-soft);border-left:4px solid var(--ep-gold);padding:8px 12px;border-radius:6px;margin:10px 0;font-size:.92em}',
    '.ep-form{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;align-items:end;background:var(--ep-soft);padding:10px;border-radius:8px;margin:8px 0}',
    '.ep-form label{display:flex;flex-direction:column;font-size:.82em;color:var(--ep-mute);gap:3px}',
    '@media print{body.ep-printing>*:not(.ep-print-host){display:none!important}body.ep-printing .ep-print-host{display:block!important}.ep-noprint{display:none!important}.ep-scroll{max-height:none;overflow:visible}.ep{border:0}}'
  ].join('\n');

  /* exam colours: navy-and-gold family, each at least 5:1 with the white text drawn on it */
  var PALETTE = ['#2E5C8A', '#8A6408', '#1F7A80', '#5B4FA0', '#A0522D', '#2E7D4F', '#7A4FA0', '#9C5B00', '#3F5F9F', '#6B5A2E', '#8F2F5F', '#2F6F6F'];
  var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function E(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function fromIso(s) { var a = String(s).split('-'); return new Date(+a[0], +a[1] - 1, +a[2]); }
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function daysTo(s) { return Math.round((fromIso(s) - today()) / 864e5); }
  function pretty(s) { var d = fromIso(s); return DAYS[(d.getDay() + 6) % 7].slice(0, 3) + ' ' + d.getDate() + ' ' + MON[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear(); }
  function when(p) { if (!p.to) return pretty(p.d); var a = fromIso(p.d), b = fromIso(p.to); return a.getDate() + '–' + b.getDate() + ' ' + MON[b.getMonth()].slice(0, 3) + ' ' + b.getFullYear(); }
  function short(name) { return String(name).replace(/\s*\(Unit (\d)\)/, ' U$1'); }
  function mins(l) { var h = /(\d+)\s*hr/.exec(l || ''), m = /(\d+)\s*min/.exec(l || ''); return (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0) || 60; }
  function color(id) { var h = 0; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return PALETTE[h % PALETTE.length]; }
  function lvl(id) { return id.split('|')[0]; }
  function nm(id) { return id.split('|').slice(1).join('|'); }

  function blank() {
    return {
      v: 1, name: '', subs: [], other: [], own: [], locked: false, cd: true, view: 'list', level: null,
      week: { sat: false, periods: [['08:00', '08:45'], ['08:45', '09:30'], ['09:30', '10:15'], ['10:30', '11:15'], ['11:15', '12:00'], ['12:45', '13:30'], ['13:30', '14:15'], ['14:15', '15:00']], cells: {} }
    };
  }

  function Planner(el, opts) {
    this.el = el; this.o = opts || {};
    this.D = window.EXAM_PLANNER_DATA || { CSEC: [], CAPE: [], sitting: '' };
    this.key = this.o.storageKey || 'examPlanner.v1';
    this.tab = 'subjects'; this.letter = null; this.filter = ''; this.month = null;
    this.s = this.load();
    if (!this.s.level) this.s.level = (this.o.course ? lvl(this.o.course) : 'CSEC');
    if (this.o.course && !this.s.seeded) { if (this.s.subs.indexOf(this.o.course) < 0) this.s.subs.push(this.o.course); this.s.seeded = 1; this.save(); }
    el.classList.add('ep');
    var me = this;
    el.addEventListener('click', function (e) { me.onClick(e); });
    el.addEventListener('change', function (e) { me.onChange(e); });
    el.addEventListener('input', function (e) { if (e.target.dataset.f === 'filter') { me.filter = e.target.value; me.applyFilter(); } });
    this.render();
  }

  var P = Planner.prototype;
  P.load = function () {
    if (this.o.store && this.o.store.load) {
      try { var got = this.o.store.load(); if (got && typeof got === 'object') { var o = JSON.parse(JSON.stringify(got)), bb = blank(); for (var kk in bb) if (!(kk in o)) o[kk] = bb[kk]; return o; } } catch (e) { }
      return blank();
    }
    try { var raw = localStorage.getItem(this.key); if (raw) { var s = JSON.parse(raw), b = blank(); for (var k in b) if (!(k in s)) s[k] = b[k]; return s; } } catch (e) { }
    return blank();
  };
  P.save = function () {
    if (this.o.store && this.o.store.save) { try { this.o.store.save(JSON.parse(JSON.stringify(this.s))); } catch (e) { } }
    else { try { localStorage.setItem(this.key, JSON.stringify(this.s)); } catch (e) { } }
    if (this.o.onChange) { try { this.o.onChange(this); } catch (e) { } }
  };
  P.T = function () { return this.o.edition === 'teacher'; };

  P.catalog = function (level) { return (this.D[level] || []).slice().sort(function (a, b) { return a.s.localeCompare(b.s); }); };
  P.find = function (id) { var L = this.D[lvl(id)] || []; for (var i = 0; i < L.length; i++) if (L[i].s === nm(id)) return L[i]; return null; };
  P.allSubs = function () { return this.s.subs.concat(this.s.other.map(function (o) { return 'Other|' + o; })); };

  /* every paper of every chosen subject, official plus the student's own */
  P.papers = function () {
    var me = this, out = [];
    this.s.subs.forEach(function (id) {
      var c = me.find(id); (c ? c.p : []).forEach(function (p) { out.push({ id: id, n: p.n, d: p.d, to: p.to, se: p.se, st: p.st || '', l: p.l, o: p.o, h: p.h, nb: p.nb, off: 1 }); });
    });
    this.s.own.forEach(function (p, i) { if (me.s.subs.indexOf(p.id) >= 0) out.push({ id: p.id, n: p.n, d: p.d, se: p.se, st: p.st, l: p.l, own: i }); });
    out.sort(function (a, b) { return (a.d + a.st) < (b.d + b.st) ? -1 : (a.d + a.st) > (b.d + b.st) ? 1 : 0; });
    var seen = {};
    out.forEach(function (p) { if (p.st) { var k = p.d + p.se; seen[k] = (seen[k] || 0) + 1; } });
    out.forEach(function (p) { p.clash = !!p.st && seen[p.d + p.se] > 1; });
    return out;
  };

  P.render = function () {
    var T = this.T(), tabs = [['subjects', '1. My subjects'], ['exams', '2. Exam timetable'], ['week', '3. Class timetable'], ['save', '4. Save & download']];
    var h = '<div class="ep-head"><h2>Exam & Class Timetable Planner</h2><p>' +
      (T ? 'Build a student’s full exam timetable and weekly class timetable across all of their subjects.' : 'Add every subject you do, then get your full exam timetable and your weekly class timetable.') +
      (this.D.sitting ? ' Exam dates: ' + E(this.D.sitting) + '.' : '') + '</p></div>';
    h += '<div class="ep-tabs ep-noprint" role="tablist">' + tabs.map(function (t) {
      return '<button type="button" class="ep-tab" role="tab" aria-selected="' + (this.tab === t[0]) + '" data-a="tab" data-v="' + t[0] + '">' + t[1] + '</button>';
    }, this).join('') + '</div><div class="ep-body">';
    h += this['view_' + this.tab]() + '</div>';
    this.el.innerHTML = h;
    if (this.tab === 'subjects') this.applyFilter();
  };

  P.chipsHTML = function (removable) {
    var ids = this.allSubs();
    if (!ids.length) return '<p class="ep-hint">No subjects added yet.</p>';
    return '<div class="ep-chips">' + ids.map(function (id) {
      return '<span class="ep-chip"><i style="background:' + color(id) + '"></i><span><span class="ep-lv">' + E(lvl(id) === 'Other' ? 'SCHOOL' : lvl(id)) + '</span> ' + E(nm(id)) + '</span>' +
        (removable && !this.s.locked ? '<button type="button" aria-label="Remove ' + E(nm(id)) + '" data-a="rm" data-v="' + E(id) + '">×</button>' : '') + '</span>';
    }, this).join('') + '</div>';
  };

  P.view_subjects = function () {
    var T = this.T(), L = this.s.level, cat = this.catalog(L), have = {};
    cat.forEach(function (c) { have[c.s.charAt(0).toUpperCase()] = 1; });
    var h = '<div class="ep-row"><label>' + (T ? 'Student’s name' : 'Your name') + ' <input data-f="name" value="' + E(this.s.name) + '" placeholder="Optional" style="max-width:16em"></label></div>';
    h += '<h3>' + (T ? 'Subjects this student does' : 'Subjects you do') + ' (' + this.allSubs().length + ')</h3>' + this.chipsHTML(true);
    if (this.s.locked) h += '<div class="ep-note">🔒 The exam timetable is locked, so subjects are fixed. Unlock it on the Exam timetable tab to make changes.</div>';
    h += '<div class="ep-row ep-noprint"><span>Exam level:</span>' + ['CSEC', 'CAPE'].map(function (x) {
      return '<button type="button" class="ep-btn' + (x === L ? ' on' : '') + '" data-a="level" data-v="' + x + '">' + x + '</button>';
    }).join('') + '<input data-f="filter" placeholder="Type to find a subject" value="' + E(this.filter) + '" style="max-width:16em"></div>';
    h += '<div class="ep-letters ep-noprint" role="tablist" aria-label="Subjects by letter"><button type="button" class="ep-letter' + (this.letter === null ? ' on' : '') + '" data-a="letter" data-v="" style="min-width:42px">All</button>' +
      LETTERS.map(function (c) { return '<button type="button" class="ep-letter' + (this.letter === c ? ' on' : '') + '" data-a="letter" data-v="' + c + '"' + (have[c] ? '' : ' disabled') + '>' + c + '</button>'; }, this).join('') + '</div>';
    var groups = {};
    cat.forEach(function (c) { var k = c.s.charAt(0).toUpperCase(); (groups[k] = groups[k] || []).push(c); });
    h += '<div data-f="list">' + Object.keys(groups).sort().map(function (k) {
      return '<div class="ep-sec" data-letter="' + k + '"><h4>' + k + '</h4>' + groups[k].map(function (c) {
        var id = L + '|' + c.s, on = this.s.subs.indexOf(id) >= 0;
        return '<label class="ep-sub" data-name="' + E(c.s.toLowerCase()) + '"><input type="checkbox" data-a="pick" value="' + E(id) + '"' + (on ? ' checked' : '') + (this.s.locked ? ' disabled' : '') + '> <span>' + E(c.s) +
          (c.p.length ? ' <small>· ' + c.p.length + ' paper' + (c.p.length > 1 ? 's' : '') + ' dated</small>' : ' <small>· dates not loaded yet</small>') + '</span></label>';
      }, this).join('') + '</div>';
    }, this).join('') + '<p class="ep-hint" data-f="none" hidden>No subject matches that.</p></div>';
    h += '<h3 style="margin-top:14px">Other school subjects</h3><p class="ep-hint">For the class timetable only: subjects or periods that have no CXC exam, such as Form Time, PE, Library, Guidance or Study Hall.</p>' +
      '<div class="ep-row ep-noprint"><input data-f="other" placeholder="e.g. Form Time" style="max-width:16em"' + (this.s.locked ? ' disabled' : '') + '><button type="button" class="ep-btn" data-a="addother"' + (this.s.locked ? ' disabled' : '') + '>Add</button></div>';
    h += '<div class="ep-row ep-noprint" style="margin-top:12px"><button type="button" class="ep-btn gold" data-a="tab" data-v="exams"' + (this.s.subs.length ? '' : ' disabled') + '>Next: see the exam timetable →</button></div>';
    return h;
  };

  P.applyFilter = function () {
    var list = this.el.querySelector('[data-f=list]'); if (!list) return;
    var q = this.filter.trim().toLowerCase(), any = false, L = this.letter;
    list.querySelectorAll('.ep-sec').forEach(function (sec) {
      var vis = 0;
      sec.querySelectorAll('.ep-sub').forEach(function (r) { var ok = !q || r.dataset.name.indexOf(q) >= 0; r.style.display = ok ? '' : 'none'; if (ok) vis++; });
      var show = vis && (q || L === null || sec.dataset.letter === L);
      sec.style.display = show ? '' : 'none'; if (show) any = true;
    });
    list.querySelector('[data-f=none]').hidden = any;
  };

  P.view_exams = function () {
    var ps = this.papers(), me = this, T = this.T();
    var h = '<h3>' + (this.s.name ? E(this.s.name) + '’s exam timetable' : (T ? 'Personal exam timetable' : 'My exam timetable')) + '</h3>' + this.chipsHTML(false);
    var nodates = this.s.subs.filter(function (id) { return !ps.some(function (p) { return p.id === id; }); });
    var clashes = ps.filter(function (p) { return p.clash; }).length;
    h += '<div class="ep-row ep-noprint">' + [['list', 'List'], ['month', 'Month']].map(function (v) {
      return '<button type="button" class="ep-btn' + (me.s.view === v[0] ? ' on' : '') + '" data-a="view" data-v="' + v[0] + '">' + v[1] + '</button>';
    }).join('') + '<label class="ep-sub" style="display:inline-flex"><input type="checkbox" data-a="cd"' + (this.s.cd ? ' checked' : '') + '> Days-to-go countdown</label>' +
      '<button type="button" class="ep-btn" data-a="lock">' + (this.s.locked ? '🔓 Unlock' : '🔒 Lock') + ' timetable</button></div>';
    if (!this.s.subs.length) return h + '<div class="ep-note">Add your subjects on the first tab to see your exams here.</div>';
    if (clashes) h += '<div class="ep-note"><span class="ep-clash">⚠ ' + clashes + ' papers share a session.</span> Check with your school about the CXC clash arrangement for these.</div>';
    if (ps.length) {
      var next = ps.filter(function (p) { return p.st && daysTo(p.d) >= 0; })[0];
      if (next && this.s.cd) h += '<p><b>Next exam:</b> ' + E(short(nm(next.id))) + ' ' + E(next.n) + ' on ' + pretty(next.d) + ' — <b>' + daysTo(next.d) + '</b> days to go.</p>';
      h += this.s.view === 'month' ? this.monthHTML(ps) : this.listHTML(ps);
    }
    if (nodates.length) h += '<div class="ep-note"><b>No official dates loaded yet for:</b> ' + nodates.map(function (id) { return E(nm(id)); }).join(', ') + '. Add the dates from your CXC timetable below.</div>';
    if (!this.s.locked) {
      h += '<div class="ep-form ep-noprint"><label>Subject<select data-f="o_id">' + this.s.subs.map(function (id) { return '<option value="' + E(id) + '">' + E(short(nm(id))) + '</option>'; }).join('') + '</select></label>' +
        '<label>Paper<input data-f="o_n" placeholder="Paper 02"></label><label>Date<input type="date" data-f="o_d" min="2026-01-01"></label>' +
        '<label>Session<select data-f="o_se"><option>Morning</option><option>Afternoon</option></select></label><label>Length<input data-f="o_l" placeholder="2 hr"></label>' +
        '<button type="button" class="ep-btn pri" data-a="addpaper">Add exam paper</button></div>';
    }
    return h;
  };

  P.badge = function (d, to) {
    if (!this.s.cd) return ''; var n = daysTo(d); if (to && n < 0 && daysTo(to) >= 0) return '<span class="ep-cd">on now</span>';
    return n > 0 ? '<span class="ep-cd">' + n + 'd</span>' : n === 0 ? '<span class="ep-cd">today</span>' : '<span class="ep-cd past">done</span>';
  };

  P.listHTML = function (ps) {
    var me = this;
    return '<div class="ep-scroll"><table><thead><tr><th>Date</th><th>Session</th><th>Subject</th><th>Paper</th><th>Length</th><th class="ep-noprint"></th></tr></thead><tbody>' +
      ps.map(function (p) {
        return '<tr><td style="white-space:nowrap">' + when(p) + me.badge(p.d, p.to) + '</td><td>' + E(p.se) + (p.st ? ' (' + E(p.st) + ')' : '') + (p.clash ? ' <span class="ep-clash">clash</span>' : '') + '</td>' +
          '<td><i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + color(p.id) + '"></i> ' + E(nm(p.id)) + ' <span class="ep-lv">' + E(lvl(p.id)) + '</span></td>' +
          '<td>' + E(p.n) + (p.o ? ' <small>(online)</small>' : '') + (p.h ? ' <small>(hybrid)</small>' : '') + (p.nb ? '<br><small class="ep-clash">⚠ ' + E(p.nb) + '</small>' : '') + (p.own != null ? ' <small>(added)</small>' : '') + '</td><td>' + E(p.l || '') + '</td>' +
          '<td class="ep-noprint">' + (p.own != null && !me.s.locked ? '<button type="button" class="ep-btn sm" data-a="rmpaper" data-v="' + p.own + '">Remove</button>' : '') + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  };

  P.monthHTML = function (ps) {
    var months = [];
    ps.forEach(function (p) { [p.d, p.to || p.d].forEach(function (x) { var k = x.slice(0, 7); if (months.indexOf(k) < 0) months.push(k); }); }); months.sort();
    if (this.month === null || months.indexOf(this.month) < 0) this.month = months[0];
    var i = months.indexOf(this.month), y = +this.month.slice(0, 4), m = +this.month.slice(5, 7) - 1;
    var first = new Date(y, m, 1), lead = (first.getDay() + 6) % 7, dim = new Date(y, m + 1, 0).getDate(), byD = {}, me = this;
    ps.forEach(function (p) { var x = fromIso(p.d), end = fromIso(p.to || p.d); for (; x <= end; x.setDate(x.getDate() + 1)) { var k = iso(x); (byD[k] = byD[k] || []).push(p); } });
    var h = '<div class="ep-row ep-noprint"><button type="button" class="ep-btn sm" data-a="mon" data-v="-1"' + (i > 0 ? '' : ' disabled') + '>←</button><b>' + MON[m] + ' ' + y + '</b>' +
      '<button type="button" class="ep-btn sm" data-a="mon" data-v="1"' + (i < months.length - 1 ? '' : ' disabled') + '>→</button></div>';
    h += '<div class="ep-scroll"><table class="ep-cal"><thead><tr>' + DAYS.concat(['Sunday']).map(function (d) { return '<th>' + d.slice(0, 3) + '</th>'; }).join('') + '</tr></thead><tbody><tr>';
    var cell = 0;
    for (var b = 0; b < lead; b++, cell++) h += '<td class="off"></td>';
    for (var d = 1; d <= dim; d++, cell++) {
      if (cell && cell % 7 === 0) h += '</tr><tr>';
      var k = y + '-' + pad(m + 1) + '-' + pad(d), ex = byD[k] || [];
      h += '<td><span class="dn">' + d + '</span>' + (ex.length ? me.badge(k) : '') + ex.map(function (p) {
        return '<span class="ep-ex" style="background:' + color(p.id) + '">' + E(short(nm(p.id))) + ' ' + E(p.n) + ' · ' + E(p.st || p.se) + (p.clash || p.nb ? ' ⚠' : '') + '</span>';
      }).join('') + '</td>';
    }
    while (cell % 7) { h += '<td class="off"></td>'; cell++; }
    return h + '</tr></tbody></table></div>';
  };

  P.view_week = function () {
    var w = this.s.week, days = DAYS.slice(0, w.sat ? 6 : 5), ids = this.allSubs(), T = this.T();
    var h = '<h3>' + (this.s.name ? E(this.s.name) + '’s class timetable' : (T ? 'Weekly class timetable' : 'My weekly class timetable')) + '</h3>' +
      '<p class="ep-hint">Pick a subject for each period. Change the period times to match your school day.</p>';
    if (!ids.length) return h + '<div class="ep-note">Add your subjects on the first tab, then fill in your week here.</div>';
    h += '<div class="ep-row ep-noprint"><button type="button" class="ep-btn" data-a="addp">+ Period</button><button type="button" class="ep-btn" data-a="delp"' + (w.periods.length > 1 ? '' : ' disabled') + '>− Period</button>' +
      '<label class="ep-sub" style="display:inline-flex"><input type="checkbox" data-a="sat"' + (w.sat ? ' checked' : '') + '> Include Saturday</label>' +
      '<button type="button" class="ep-btn" data-a="clearweek">Clear the grid</button></div>';
    var opts = '<option value="">—</option>' + ids.map(function (id) { return '<option value="' + E(id) + '">' + E(short(nm(id))) + '</option>'; }).join('') + '<option value="Break|Break">Break / Lunch</option><option value="Free|Free">Free period</option>';
    h += '<div class="ep-scroll"><table class="ep-grid"><thead><tr><th>Period</th>' + days.map(function (d) { return '<th>' + d + '</th>'; }).join('') + '</tr></thead><tbody>';
    w.periods.forEach(function (p, r) {
      h += '<tr><th class="ep-p">' + (r + 1) + '<br><input type="time" data-f="ps" data-r="' + r + '" value="' + E(p[0]) + '"><br><input type="time" data-f="pe" data-r="' + r + '" value="' + E(p[1]) + '"></th>';
      days.forEach(function (d, c) {
        var v = w.cells[r + '-' + c] || '', bg = v && lvl(v) !== 'Break' && lvl(v) !== 'Free' ? color(v) : '';
        h += '<td><select data-f="cell" data-k="' + r + '-' + c + '" aria-label="' + d + ' period ' + (r + 1) + '" style="' + (bg ? 'background:' + bg + ';color:#fff' : '') + '">' +
          opts.replace('value="' + E(v) + '"', 'value="' + E(v) + '" selected') + '</select></td>';
      });
      h += '</tr>';
    });
    return h + '</tbody></table></div>';
  };

  P.view_save = function () {
    var T = this.T();
    return '<h3>Download</h3><p class="ep-hint">Everything is made on this device. Nothing is sent anywhere.</p>' +
      '<div class="ep-row"><button type="button" class="ep-btn pri" data-a="ics"' + (this.papers().length ? '' : ' disabled') + '>📅 Exams to calendar (.ics)</button>' +
      '<button type="button" class="ep-btn" data-a="csvex"' + (this.papers().length ? '' : ' disabled') + '>Exam timetable spreadsheet (.csv)</button>' +
      '<button type="button" class="ep-btn" data-a="csvwk">Class timetable spreadsheet (.csv)</button></div>' +
      '<div class="ep-row"><button type="button" class="ep-btn" data-a="print" data-v="exams">🖨 Print or save exam timetable as PDF</button>' +
      '<button type="button" class="ep-btn" data-a="print" data-v="week">🖨 Print or save class timetable as PDF</button></div>' +
      '<h3 style="margin-top:16px">Take it to another course</h3><p class="ep-hint">Save a planner file, then open it in the planner inside any other course so ' + (T ? 'the student’s' : 'your') + ' subjects and timetables come with ' + (T ? 'them' : 'you') + '.</p>' +
      '<div class="ep-row"><button type="button" class="ep-btn" data-a="backup">💾 Save planner file</button><label class="ep-btn" style="display:inline-block">📂 Open planner file<input type="file" accept=".json,application/json" data-f="restore" hidden></label>' +
      '<button type="button" class="ep-btn" data-a="reset">Start over</button></div>';
  };

  P.onClick = function (e) {
    var b = e.target.closest('[data-a]'); if (!b || b.disabled) return;
    var a = b.dataset.a, v = b.dataset.v, s = this.s, me = this;
    if (b.tagName === 'INPUT' && b.type === 'checkbox') return; /* handled on change */
    if (a === 'tab') { this.tab = v; }
    else if (a === 'level') { s.level = v; this.letter = null; }
    else if (a === 'letter') { this.letter = v || null; this.el.querySelectorAll('.ep-letter').forEach(function (x) { x.classList.toggle('on', (x.dataset.v || null) === me.letter); }); this.applyFilter(); return; }
    else if (a === 'rm') { s.subs = s.subs.filter(function (x) { return x !== v; }); s.other = s.other.filter(function (x) { return 'Other|' + x !== v; }); this.cleanCells(); }
    else if (a === 'addother') { var inp = this.el.querySelector('[data-f=other]'), t = inp.value.trim(); if (t && s.other.indexOf(t) < 0) s.other.push(t); }
    else if (a === 'view') { s.view = v; }
    else if (a === 'lock') { s.locked = !s.locked; }
    else if (a === 'mon') { var ps = this.papers(), ms = []; ps.forEach(function (p) { [p.d, p.to || p.d].forEach(function (x) { var k = x.slice(0, 7); if (ms.indexOf(k) < 0) ms.push(k); }); }); ms.sort(); this.month = ms[Math.max(0, Math.min(ms.length - 1, ms.indexOf(this.month) + (+v)))]; }
    else if (a === 'addpaper') {
      var g = function (f) { return me.el.querySelector('[data-f=' + f + ']').value.trim(); }, se = g('o_se');
      if (!g('o_d') || !g('o_n')) { alert('Add the paper name and the date.'); return; }
      s.own.push({ id: g('o_id'), n: g('o_n'), d: g('o_d'), se: se, st: se === 'Morning' ? '09:00' : '13:00', l: g('o_l') || '' });
    }
    else if (a === 'rmpaper') { s.own.splice(+v, 1); }
    else if (a === 'addp') { var last = s.week.periods[s.week.periods.length - 1] || ['08:00', '08:45']; s.week.periods.push([last[1], last[1]]); }
    else if (a === 'delp') { var r = s.week.periods.length - 1; s.week.periods.pop(); Object.keys(s.week.cells).forEach(function (k) { if (+k.split('-')[0] === r) delete s.week.cells[k]; }); }
    else if (a === 'clearweek') { if (!confirm('Clear every period in the class timetable?')) return; s.week.cells = {}; }
    else if (a === 'ics') { this.download('exam-timetable.ics', this.ics(), 'text/calendar'); return; }
    else if (a === 'csvex') { this.download('exam-timetable.csv', this.csvExams(), 'text/csv'); return; }
    else if (a === 'csvwk') { this.download('class-timetable.csv', this.csvWeek(), 'text/csv'); return; }
    else if (a === 'print') { this.print(v); return; }
    else if (a === 'backup') { this.download('my-planner.json', JSON.stringify(s), 'application/json'); return; }
    else if (a === 'reset') { if (!confirm('Remove all subjects and timetables from this planner?')) return; this.s = blank(); this.s.level = this.o.course ? lvl(this.o.course) : 'CSEC'; this.s.seeded = 1; }
    else return;
    this.save(); this.render();
  };

  P.onChange = function (e) {
    var t = e.target, s = this.s, f = t.dataset.f, a = t.dataset.a, me = this;
    if (a === 'pick') { var id = t.value; if (t.checked) { if (s.subs.indexOf(id) < 0) s.subs.push(id); } else { s.subs = s.subs.filter(function (x) { return x !== id; }); this.cleanCells(); } this.save(); this.render(); return; }
    if (a === 'cd') { s.cd = t.checked; }
    else if (a === 'sat') { s.week.sat = t.checked; }
    else if (f === 'name') { s.name = t.value.trim(); this.save(); return; }
    else if (f === 'cell') { if (t.value) s.week.cells[t.dataset.k] = t.value; else delete s.week.cells[t.dataset.k]; }
    else if (f === 'ps' || f === 'pe') { s.week.periods[+t.dataset.r][f === 'ps' ? 0 : 1] = t.value; this.save(); return; }
    else if (f === 'restore') {
      var file = t.files && t.files[0]; if (!file) return;
      var rd = new FileReader();
      rd.onload = function () {
        try { var o = JSON.parse(rd.result); if (!o || !Array.isArray(o.subs)) throw 0; var b = blank(); for (var k in b) if (!(k in o)) o[k] = b[k]; me.s = o; me.save(); me.tab = 'subjects'; me.render(); }
        catch (x) { alert('That file is not a planner file.'); }
      };
      rd.readAsText(file); return;
    }
    else return;
    this.save(); this.render();
  };

  P.cleanCells = function () {
    var ok = this.allSubs(), c = this.s.week.cells;
    Object.keys(c).forEach(function (k) { var v = c[k]; if (ok.indexOf(v) < 0 && lvl(v) !== 'Break' && lvl(v) !== 'Free') delete c[k]; });
  };

  P.download = function (name, text, type) {
    var blob = new Blob([type === 'text/csv' ? '﻿' + text : text], { type: type + ';charset=utf-8' }), u = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = u; a.download = (this.s.name ? this.s.name.replace(/[^\w\- ]+/g, '').replace(/\s+/g, '-') + '-' : '') + name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 500);
  };

  function csvq(v) { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }

  P.csvExams = function () {
    return [['Date', 'End date', 'Day', 'Session', 'Start', 'Level', 'Subject', 'Paper', 'Length', 'Format', 'Clash', 'Note']].concat(this.papers().map(function (p) {
      return [p.d, p.to || '', DAYS[(fromIso(p.d).getDay() + 6) % 7], p.se, p.st, lvl(p.id), nm(p.id), p.n, p.l || '', p.o ? 'Online only' : p.h ? 'Hybrid' : '', p.clash ? 'Yes' : '', p.nb || ''];
    })).map(function (r) { return r.map(csvq).join(','); }).join('\r\n');
  };

  P.csvWeek = function () {
    var w = this.s.week, days = DAYS.slice(0, w.sat ? 6 : 5);
    return [['Period', 'Time'].concat(days)].concat(w.periods.map(function (p, r) {
      return [r + 1, p[0] + '-' + p[1]].concat(days.map(function (d, c) { var v = w.cells[r + '-' + c]; return v ? nm(v) : ''; }));
    })).map(function (r) { return r.map(csvq).join(','); }).join('\r\n');
  };

  P.ics = function () {
    var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    var lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Exam Planner//EN', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:Exam timetable'];
    this.papers().forEach(function (p, i) {
      var f = function (x) { return iso(x).replace(/-/g, '') + 'T' + pad(x.getHours()) + pad(x.getMinutes()) + '00'; }, startL, endL;
      if (p.st) { var st = p.st.split(':'), d = fromIso(p.d); d.setHours(+st[0], +st[1]); startL = 'DTSTART:' + f(d); endL = 'DTEND:' + f(new Date(d.getTime() + mins(p.l) * 6e4)); }
      else { var e2 = fromIso(p.to || p.d); e2.setDate(e2.getDate() + 1); startL = 'DTSTART;VALUE=DATE:' + p.d.replace(/-/g, ''); endL = 'DTEND;VALUE=DATE:' + iso(e2).replace(/-/g, ''); }
      lines.push('BEGIN:VEVENT', 'UID:exam-' + i + '-' + p.d + '-' + stamp + '@planner', 'DTSTAMP:' + stamp, startL, endL,
        'SUMMARY:' + (lvl(p.id) + ' ' + nm(p.id) + ' ' + p.n).replace(/[,;]/g, '\\$&'),
        'DESCRIPTION:' + ((p.st ? p.se + ' session' : p.se) + (p.l ? ', ' + p.l : '') + (p.o ? ', sat online' : p.h ? ', hybrid' : '') + (p.nb ? '. ' + p.nb : '')).replace(/[,;]/g, '\\$&'),
        'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Exam tomorrow', 'END:VALARM', 'END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  };

  P.print = function (which) {
    var keep = this.tab; this.tab = which; this.render();
    var host = document.createElement('div'); host.className = 'ep-print-host';
    var parent = this.el.parentNode, next = this.el.nextSibling;
    host.appendChild(this.el); document.body.appendChild(host); document.body.classList.add('ep-printing');
    var me = this, done = function () {
      document.body.classList.remove('ep-printing'); parent.insertBefore(me.el, next); host.remove();
      me.tab = keep; me.render(); window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    setTimeout(function () { window.print(); setTimeout(function () { if (host.isConnected) done(); }, 1000); }, 50);
  };

  window.ExamPlanner = {
    version: '1.0',
    mount: function (el, opts) {
      if (typeof el === 'string') el = document.querySelector(el);
      if (!document.getElementById('ep-style')) { var st = document.createElement('style'); st.id = 'ep-style'; st.textContent = CSS; document.head.appendChild(st); }
      return new Planner(el, opts);
    }
  };
})();
