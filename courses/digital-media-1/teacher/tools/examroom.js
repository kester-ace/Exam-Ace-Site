/* Exam room tab: sit (or, in the Teacher's Version, run) a live test inside the course.
   Kester Small */
(function () {
  if (window.__examRoomTab) return; window.__examRoomTab = true;
  var me = document.currentScript, course = (me && me.dataset.course) || '', teacher = (me && me.dataset.edition) === 'teacher';
  var CSS = '.xm-frame{display:block;width:100%;height:calc(100vh - 170px);min-height:620px;border:0;border-radius:18px;background:#060D26}' +
    '.xm-row{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 12px}.xm-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}.xm-steps div{border:1px dashed var(--line);border-radius:12px;padding:10px}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  var avail = null;
  function check() {
    if (avail !== null) return Promise.resolve(avail);
    return fetch('/exam.html', { method: 'HEAD', cache: 'no-store' }).then(function (r) { avail = r.ok; return avail; }, function () { avail = false; return false; });
  }
  function frame(page) { return '<iframe class="xm-frame" title="Exam room" src="/' + page + '?embed=1&course=' + encodeURIComponent(course) + '" allow="microphone; autoplay; fullscreen"></iframe>'; }
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'examroom',
    title: 'Exam room',
    tile: { icon: '🪑', meta: teacher ? 'Run a live test: every student gets a different paper.' : 'Join a live test with the code from your teacher.' },
    render: function () {
      var how = teacher
        ? '<div class="xm-steps"><div><b>1. Set up</b><p>Pick past papers and tests from this course, or type your own questions.</p></div><div><b>2. Invite</b><p>Share the room code. Students join with their login, or their name, email and the code.</p></div><div><b>3. Run it</b><p>Start, lock, add time, type or record instructions. Entry closes 20 minutes after the start.</p></div><div><b>4. Results</b><p>Scores, written answers to mark and who left the page, with a CSV download.</p></div></div>'
        : '<p>Your teacher gives you a room code. Take a seat, wait for the start, then answer your own paper: everyone gets different questions. Entry closes 20 minutes after the test starts.</p>';
      return '<section class="hero"><span class="eyebrow">Live tests</span><h1>Exam room</h1>' + how + '</section>' +
        '<div class="card" id="xm-host"><p class="hint">Opening the exam room…</p></div>';
    },
    mount: function (api, loc, stage) {
      var host = stage && stage.querySelector('#xm-host'); if (!host) return;
      check().then(function (ok) {
        if (!ok) { host.innerHTML = '<h2>The exam room opens from your Exam Ace sign-in</h2><p>Live tests need your Exam Ace Tutorials account, so the exam room works when you open this course after signing in on the Exam Ace site.</p>'; return; }
        if (!teacher) { host.innerHTML = frame('exam.html'); return; }
        host.innerHTML = '<div class="xm-row" role="tablist"><button type="button" class="btn gold" data-xm="exam-teacher.html" aria-selected="true">Run a test</button><button type="button" class="btn" data-xm="exam.html" aria-selected="false">See the student view</button></div><div id="xm-f">' + frame('exam-teacher.html') + '</div>';
        host.querySelectorAll('[data-xm]').forEach(function (b) { b.addEventListener('click', function () {
          host.querySelectorAll('[data-xm]').forEach(function (x) { x.setAttribute('aria-selected', x === b); x.classList.toggle('gold', x === b); });
          host.querySelector('#xm-f').innerHTML = frame(b.dataset.xm); }); });
      });
    }
  });
})();
