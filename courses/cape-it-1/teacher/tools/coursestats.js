/* Statistics tab: who's in this course now, time spent, days active and the attendance register (Teacher's Version);
   a student's own time and activity (Student's Version). Kester Small */
(function () {
  if (window.__courseStats) return; window.__courseStats = true;
  var me = document.currentScript, course = (me && me.dataset.course) || '', teacher = (me && me.dataset.edition) === 'teacher';
  var CSS = '.cs-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}.cs-kpis div{padding:14px;border-radius:14px;background:var(--surface,rgba(255,255,255,.05));border:1px solid var(--line)}' +
    '.cs-kpis b{display:block;font:800 1.7rem/1.1 "Bricolage Grotesque",sans-serif;color:var(--gold,#F5C542)}.cs-kpis span{font-size:.85rem;opacity:.8}' +
    '.cs-bars{display:grid;grid-template-columns:repeat(14,minmax(0,1fr));gap:4px;align-items:end;height:120px;margin-top:8px}.cs-bars i{display:block;background:var(--gold,#F5C542);border-radius:4px 4px 0 0;min-height:2px}' +
    '.cs-days{display:grid;grid-template-columns:repeat(14,minmax(0,1fr));gap:4px;font-size:.66rem;opacity:.75;text-align:center}' +
    '.cs-tbl{width:100%;border-collapse:collapse;font-size:.9rem}.cs-tbl th,.cs-tbl td{padding:8px 6px;border-bottom:1px dashed var(--line);text-align:left}.cs-tbl th{opacity:.75}.cs-wrap{overflow-x:auto}' +
    '.cs-on{display:inline-block;width:9px;height:9px;border-radius:50%;background:#4FD18B;margin-right:6px}.cs-who{display:flex;gap:6px;flex-wrap:wrap}.cs-who span{padding:3px 10px;border-radius:999px;border:1px solid var(--line);font-size:.85rem}' +
    '.cs-row{display:flex;gap:10px;flex-wrap:wrap;align-items:end}.cs-row input{font:inherit;padding:6px 8px;border-radius:10px;border:1.5px solid var(--line);background:transparent;color:inherit}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  function token() { var m = document.cookie.match(/(?:^|;\s*)ks-access=([^;]+)/); return m ? decodeURIComponent(m[1]) : ''; }
  function call(action, body) {
    var t = token(); if (!t) return Promise.reject(Object.assign(new Error('signin'), { signin: true }));
    return fetch('/.netlify/functions/presence', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t }, body: JSON.stringify(Object.assign({ action: action }, body || {})) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (o) { if (!r.ok) throw Object.assign(new Error(o.error || 'Statistics didn\'t load.'), { status: r.status }); return o; }); });
  }
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var dur = function (m) { m = m || 0; return m >= 60 ? Math.floor(m / 60) + ' h ' + (m % 60) + ' min' : m + ' min'; };
  var dshort = function (d) { var x = new Date(d + 'T12:00:00'); return x.toLocaleDateString([], { weekday: 'narrow' }); };
  function bars(days, key) {
    var max = Math.max.apply(null, days.map(function (d) { return d[key]; }).concat(1));
    return '<div class="cs-bars" role="img" aria-label="' + esc(days.map(function (d) { return d.day + ': ' + d[key]; }).join(', ')) + '">' + days.map(function (d) { return '<i title="' + esc(d.day + ': ' + d[key]) + '" style="height:' + Math.round(100 * d[key] / max) + '%"></i>'; }).join('') + '</div><div class="cs-days" aria-hidden="true">' + days.map(function (d) { return '<span>' + dshort(d.day) + '</span>'; }).join('') + '</div>';
  }
  function last14(byDay) { var out = [], M = {}; (byDay || []).forEach(function (r) { M[r.day] = r.minutes; }); for (var i = 13; i >= 0; i--) { var d = new Date(Date.now() - i * 86400000).toLocaleDateString('en-CA'); out.push({ day: d, minutes: M[d] || 0 }); } return out; }
  function csv(rows, name) {
    var q = function (v) { return /[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : v; };
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([rows.map(function (r) { return r.map(q).join(','); }).join('\n')], { type: 'text/csv' })); a.download = name; document.body.appendChild(a); a.click(); a.remove();
  }
  var lastData = null;
  function paintStudent(host, d) {
    var m = d.me;
    host.innerHTML = '<div class="card"><h2>My time in this course</h2><div class="cs-kpis"><div><b>' + dur(m.today) + '</b><span>today</span></div><div><b>' + dur(m.week) + '</b><span>last 7 days</span></div><div><b>' + dur(m.month) + '</b><span>last 30 days</span></div><div><b>' + m.days + '</b><span>days active this month</span></div></div></div>' +
      '<div class="card"><h2>The last two weeks</h2><p class="hint">Minutes each day.</p>' + bars(last14(m.byDay), 'minutes') + '</div>' +
      '<div class="card"><p><span class="cs-on" aria-hidden="true"></span><b>' + d.online + '</b> ' + (d.online === 1 ? 'person is' : 'people are') + ' in this course right now.</p></div>';
  }
  function paintStaff(host, d) {
    lastData = d; var P = d.people || [], today = d.days[d.days.length - 1] || { students: 0 }, week = P.filter(function (p) { return p.week > 0; }).length;
    var avg = week ? Math.round(P.reduce(function (a, p) { return a + p.week; }, 0) / week) : 0;
    var todayStr = new Date().toLocaleDateString('en-CA');
    host.innerHTML = '<div class="card"><h2>Right now</h2><div class="cs-kpis"><div><b>' + d.online.length + '</b><span>in this course now</span></div><div><b>' + today.students + '</b><span>students today</span></div><div><b>' + week + '</b><span>active in the last 7 days</span></div><div><b>' + dur(avg) + '</b><span>average per active student this week</span></div></div>' +
      (d.online.length ? '<p class="hint" style="margin-top:10px">In the course now:</p><div class="cs-who">' + d.online.map(function (o) { return '<span><span class="cs-on" aria-hidden="true"></span>' + esc(o.name) + '</span>'; }).join('') + '</div>' : '') + '</div>' +
      '<div class="card"><h2>Students each day</h2><p class="hint">The last 14 days.</p>' + bars(d.days, 'students') + '</div>' +
      '<div class="card"><h2>Every student</h2><div class="cs-wrap"><table class="cs-tbl"><thead><tr><th>Name</th><th>Today</th><th>7 days</th><th>30 days</th><th>Days active</th><th>Last active</th></tr></thead><tbody>' +
      (P.length ? P.map(function (p) { return '<tr><td>' + (p.online ? '<span class="cs-on" title="Online now"></span>' : '') + esc(p.name) + '</td><td>' + dur(p.today) + '</td><td>' + dur(p.week) + '</td><td>' + dur(p.month) + '</td><td>' + p.days + '</td><td>' + esc(p.last || '—') + '</td></tr>'; }).join('') : '<tr><td colspan="6">No student activity in this course yet.</td></tr>') + '</tbody></table></div>' +
      '<div class="xm-row" style="margin-top:10px"><button type="button" class="btn" data-px="timecsv" data-pv="coursestats">Download course time (CSV)</button></div></div>' +
      '<div class="card"><h2>Attendance register</h2><p class="hint">Every student sign-in: first name, last name, email, time in, time out and total time.</p><div class="cs-row"><label>From<br><input type="date" id="cs-from" value="' + todayStr + '"></label><label>To<br><input type="date" id="cs-to" value="' + todayStr + '"></label><button type="button" class="btn gold" data-px="attcsv" data-pv="coursestats">Download attendance (CSV)</button></div></div>';
  }
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'coursestats',
    title: teacher ? 'Class statistics' : 'My statistics',
    tile: { icon: '📊', meta: teacher ? 'Who is online, time spent, days active and the attendance register.' : 'Your time in this course, day by day.' },
    render: function () { return '<section class="hero"><span class="eyebrow">Statistics</span><h1>' + (teacher ? 'Class statistics' : 'My statistics') + '</h1><p>' + (teacher ? 'Who is in this course now, how much time each student spends, and the attendance register.' : 'How much time you spend in this course, and on which days.') + '</p></section><div id="cs-host"><div class="card"><p class="hint">Loading…</p></div></div>'; },
    mount: function (api, loc, stage) {
      var host = stage && stage.querySelector('#cs-host'); if (!host) return;
      call('course', { course: course }).then(function (d) { if (d.role === 'staff') paintStaff(host, d); else paintStudent(host, d); }, function (e) {
        host.innerHTML = '<div class="card"><h2>Statistics come from your Exam Ace sign-in</h2><p>' + (e.signin || e.status === 401 || e.status === 404 || e.status === 405 ? 'Open this course after signing in on the Exam Ace site to see statistics here.' : esc(e.message)) + '</p></div>';
      });
    },
    click: function (action, el, api) {
      if (action === 'timecsv' && lastData) csv([['Name', 'Email', 'Minutes today', 'Minutes last 7 days', 'Minutes last 30 days', 'Days active', 'Last active']].concat(lastData.people.map(function (p) { return [p.name, p.email || '', p.today, p.week, p.month, p.days, p.last]; })), 'Course time ' + course + '.csv');
      if (action === 'attcsv') {
        var from = document.getElementById('cs-from').value, to = document.getElementById('cs-to').value;
        var t = function (x) { return x ? new Date(x).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : ''; };
        call('attendance', { from: from, to: to }).then(function (r) {
          csv([['First name', 'Last name', 'Email', 'Logged in', 'Logged out', 'How it ended', 'Total minutes']].concat(r.rows.map(function (x) { return [x.first, x.last, x.email, t(x.in), x.still ? '' : t(x.out), x.how, x.minutes]; })), 'Attendance ' + from + (to !== from ? ' to ' + to : '') + '.csv');
          api.toast(r.rows.length + ' sign-in' + (r.rows.length === 1 ? '' : 's') + ' downloaded.');
        }, function (e) { api.toast(e.message); });
      }
    }
  });
})();
