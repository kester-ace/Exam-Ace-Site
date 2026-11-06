/* Memory Palace — the method of loci.
   Build a palace room by room, place what you must remember at each locus with a vivid image,
   then walk through it (read aloud, on repeat) and test your recall.
   Palace.mount(el, { courses:[{slug,title,level}], course }) */
(function () {
  'use strict';
  if (window.Palace) return;
  /* where the 3D/VR/AR palace file lives: next to this script (assets/study/ on the site, tools/ in a course) */
  var BASE = (function () { try { var src = document.currentScript && document.currentScript.src; return src ? src.replace(/[^\/]*$/, '') : ''; } catch (e) { return ''; } })();
  var loading3D = null;
  function load3D() {
    if (window.Palace3D) return Promise.resolve();
    if (loading3D) return loading3D;
    loading3D = new Promise(function (ok, bad) { var sc = document.createElement('script'); sc.src = BASE + 'palace3d.js'; sc.onload = function () { window.Palace3D ? ok() : bad(); }; sc.onerror = function () { loading3D = null; bad(); }; document.head.appendChild(sc); });
    return loading3D;
  }
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var SPOTS = [[17, 24], [50, 17], [83, 24], [83, 74], [50, 82], [17, 74]];
  var TEMPLATES = {
    bedroom: { name: 'My house', rooms: [
      ['My bedroom', ['Door', 'Bed', 'Desk', 'Wardrobe', 'Window', 'Gaming setup']],
      ['Bathroom', ['Mirror', 'Sink', 'Shower', 'Towel rail', 'Shelf', 'Bin']],
      ['Kitchen', ['Fridge', 'Stove', 'Snack cupboard', 'Microwave', 'Fruit bowl', 'Back door']],
      ['Living room', ['TV', 'Sofa', 'Fan', 'Window', 'Family photo', 'Front door']],
      ['Yard', ['Gate', 'Mango tree', 'Car', 'Steps', 'Clothesline', 'Dog house']]] },
    phone: { name: 'My phone', rooms: [
      ['Home screen', ['Clock', 'Camera', 'Music app', 'Game app', 'Group chat', 'Settings']],
      ['Group chat', ['Pinned message', 'Voice note', 'Sticker', 'Meme', 'Poll', 'Typing dots']],
      ['Photo gallery', ['Selfie', 'Beach pic', 'Screenshot', 'Food pic', 'Video', 'Trash folder']],
      ['Playlist', ['Track 1', 'Track 2', 'Track 3', 'Track 4', 'Track 5', 'Track 6']]] },
    game: { name: 'Video game level', rooms: [
      ['Spawn zone', ['Spawn point', 'Map table', 'Weapon rack', 'Health pack', 'Portal', 'Locked door']],
      ['Shop', ['Shopkeeper', 'Skins wall', 'Power-ups', 'Coin chest', 'Mystery box', 'Exit']],
      ['Boss room', ['Entrance', 'Boss throne', 'Lava pit', 'Pillar', 'Treasure', 'Save point']]] },
    mall: { name: 'Mall and food court', rooms: [
      ['Entrance', ['Sliding doors', 'Security guard', 'Map board', 'Escalator', 'Fountain', 'ATM']],
      ['Food court', ['Pizza place', 'Chicken spot', 'Smoothie bar', 'Table', 'Bin', 'Napkins']],
      ['Shoe store', ['Window display', 'Sneaker wall', 'Bench', 'Mirror', 'Cash register', 'Shoe box']]] },
    carnival: { name: 'Carnival road', rooms: [
      ['Carnival village', ['Main stage', 'Food booth', 'Drinks booth', 'Ferris wheel', 'Lights', 'Exit gate']],
      ['On the road', ['Music truck', 'Costume band', 'Steel pan side', 'Judging point', 'Water truck', 'Last lap']]] },
    court: { name: 'Basketball court', rooms: [
      ['The court', ['Hoop', 'Foul line', 'Three-point line', 'Half court', 'Bench', 'Scoreboard']],
      ['Locker room', ['Locker', 'Coach board', 'Water cooler', 'Shower', 'Trophy shelf', 'Door']]] },
    campus: { name: 'School campus', rooms: [
      ['Front gate', ['Gate post', 'Security booth', 'Notice board', 'Flag pole', 'Bicycle rack', 'Bus stop']],
      ['Courtyard', ['Bench', 'Tree', 'Water fountain', 'Stage', 'Mural', 'Tuck shop']],
      ['Classroom', ['Door', 'Whiteboard', "Teacher's desk", 'Window', 'Back wall', 'Your desk']],
      ['Computer lab', ['Door', 'Projector', 'Printer', 'Server cabinet', 'Front row', 'Back row']]] },
    beach: { name: 'Beach lime', rooms: [
      ['Car park', ['Entrance', 'Palm tree', 'Food van', 'Shower', 'Bin', 'Steps']],
      ['Shoreline', ['Lifeguard tower', 'Umbrella', 'Sandcastle', 'Rock pool', 'Jetty', 'Boat']]] },
    blank: { name: 'Make my own place', rooms: [['Room 1', ['Locus 1', 'Locus 2', 'Locus 3', 'Locus 4', 'Locus 5', 'Locus 6']]] }
  };
  var CSS = [
    '.mp{display:flex;flex-direction:column;gap:14px;color:var(--ink,#F1F4FF);font-family:var(--f-body,"Atkinson Hyperlegible",Verdana,sans-serif)}',
    '.mp-card{background:var(--surface,#0E1B44);border:1px solid var(--line,rgba(245,197,66,.25));border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:12px;min-width:0}',
    '.mp h3{margin:0;font:800 1.15rem var(--f-display,"Bricolage Grotesque","Segoe UI",sans-serif)}',
    '.mp-lbl{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--muted,#AEB9DD)}',
    '.mp-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}',
    '.mp input,.mp select,.mp textarea{font:inherit;color:var(--ink,#F1F4FF);background:var(--raise,rgba(255,255,255,.06));border:1.5px solid var(--field-line,rgba(245,197,66,.5));border-radius:10px;padding:9px 11px;width:100%;box-sizing:border-box;-webkit-user-select:text;user-select:text}',
    '.mp input:focus,.mp select:focus,.mp textarea:focus{outline:3px solid var(--gold,#F5C542);outline-offset:1px}',
    '.mp-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1.5px solid var(--field-line,rgba(245,197,66,.5));background:transparent;color:var(--ink,#F1F4FF);border-radius:10px;padding:8px 12px;font:700 .86rem var(--f-body,system-ui,sans-serif);cursor:pointer}',
    '.mp-btn.go{background:var(--blue,#F5C542);color:var(--on-blue,#0A1433);border-color:var(--blue,#F5C542)}',
    '.mp-btn:disabled{opacity:.5;cursor:not-allowed}.mp-btn:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:2px}',
    '.mp-modes{display:inline-flex;padding:4px;border-radius:12px;background:var(--raise,rgba(255,255,255,.06));border:1px solid var(--line,rgba(245,197,66,.25))}',
    '.mp-modes button{border:0;background:none;color:var(--muted,#AEB9DD);font:700 .88rem var(--f-body,system-ui,sans-serif);padding:8px 14px;border-radius:9px;cursor:pointer}',
    '.mp-modes button[aria-pressed=true]{background:var(--blue,#F5C542);color:var(--on-blue,#0A1433)}',
    '.mp-rooms{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px}',
    '.mp-room{flex:none;border:1.5px solid var(--field-line,rgba(245,197,66,.5));background:transparent;color:var(--ink,#F1F4FF);border-radius:999px;padding:7px 13px;font:700 .84rem var(--f-body,system-ui,sans-serif);cursor:pointer}',
    '.mp-room[aria-pressed=true]{background:color-mix(in srgb,var(--gold,#F5C542) 16%,transparent);border-color:var(--gold,#F5C542)}',
    '.mp-stage{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:14px}@media (max-width:820px){.mp-stage{grid-template-columns:1fr}}',
    '.mp-scene{width:100%;height:auto;border-radius:14px;display:block;background:#071030}',
    '.mp-scene .locus{cursor:pointer}.mp-scene .locus:focus{outline:none}.mp-scene .locus:focus .ring{stroke:#FFFFFF;stroke-width:3}',
    '.mp-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}',
    '.mp-pal{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:6px;padding:14px;border-radius:14px;border:1px solid var(--line,rgba(245,197,66,.25));background:var(--raise,rgba(255,255,255,.04))}',
    '.mp-pal:hover,.mp-pal:focus-visible{border-color:var(--gold,#F5C542)}.mp-pal b{font-size:1rem}.mp-pal span{font-size:.8rem;color:var(--muted,#AEB9DD)}',
    '.mp-meter{height:8px;border-radius:99px;background:var(--raise,rgba(255,255,255,.08));overflow:hidden}.mp-meter i{display:block;height:100%;background:var(--blue,#F5C542)}',
    '.mp-cue{font-size:1.05rem;line-height:1.55;padding:12px 14px;border-radius:12px;background:var(--raise,rgba(255,255,255,.06));border-left:4px solid var(--gold,#F5C542)}',
    '.mp-ans{font:800 1.4rem var(--f-display,"Bricolage Grotesque",sans-serif);color:var(--gold,#FFD766)}',
    '.mp-ok{color:var(--ok,#4FD18B);font-weight:700}.mp-bad{color:var(--bad,#FF7A6B);font-weight:700}.mp-hint{font-size:.84rem;color:var(--muted,#AEB9DD)}'
  ].join('\n');
  function css() { if (document.getElementById('mp-css')) return; var s = document.createElement('style'); s.id = 'mp-css'; s.textContent = CSS; document.head.appendChild(s); }

  function fromTemplate(key) { var t = TEMPLATES[key]; return t.rooms.map(function (r) { return { name: r[0], loci: r[1].map(function (l) { return { label: l, term: '', cue: '', details: '', box: 0 }; }) }; }); }
  function filled(p) { var out = []; p.rooms.forEach(function (r, ri) { r.loci.forEach(function (l, li) { if ((l.term || '').trim()) out.push({ ri: ri, li: li, room: r, locus: l }); }); }); return out; }

  /* a simple, clear floor plan: walls, door, window, numbered loci */
  function scene(room, ri, active, reveal) {
    var W = 600, H = 380, svg = '<svg class="mp-scene" viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="' + esc(room.name) + '">' +
      '<defs><radialGradient id="mpg' + ri + '" cx="80%" cy="0%" r="90%"><stop offset="0" stop-color="#F5C542" stop-opacity=".22"/><stop offset=".6" stop-color="#122a6b" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="mpf' + ri + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#122a6b"/><stop offset="1" stop-color="#0a1638"/></linearGradient></defs>' +
      '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#071030"/>' +
      '<rect x="30" y="30" width="540" height="320" rx="10" fill="url(#mpf' + ri + ')" stroke="#F5C542" stroke-width="3"/>' +
      '<rect x="30" y="30" width="540" height="320" rx="10" fill="url(#mpg' + ri + ')"/>' +
      '<path d="M270 350h60" stroke="#071030" stroke-width="6"/><path d="M270 350a30 30 0 0 1 30 -30" fill="none" stroke="#AEB9DD" stroke-dasharray="4 4"/>' +
      '<path d="M210 30h180" stroke="#9DB4E6" stroke-width="6"/>' +
      '<text x="300" y="205" text-anchor="middle" fill="rgba(241,244,255,.12)" font-size="40" font-weight="800" font-family="Bricolage Grotesque,Segoe UI,sans-serif">' + esc(room.name) + '</text>';
    room.loci.forEach(function (l, i) {
      var p = SPOTS[i % 6], x = p[0] * 6, y = p[1] * 3.8, has = !!(l.term || '').trim(), on = active === i;
      var showTerm = has && (reveal || active == null);
      svg += '<g class="locus" tabindex="0" role="button" data-locus="' + i + '" aria-label="Locus ' + (i + 1) + ': ' + esc(l.label) + (has ? ', has an item' : ', empty') + '">' +
        (on ? '<circle cx="' + x + '" cy="' + y + '" r="34" fill="none" stroke="#FFD766" stroke-width="2" opacity=".6"><animate attributeName="r" values="26;38;26" dur="1.8s" repeatCount="indefinite"/></circle>' : '') +
        '<circle class="ring" cx="' + x + '" cy="' + y + '" r="20" fill="' + (has ? '#F5C542' : 'rgba(255,255,255,.08)') + '" stroke="' + (on ? '#FFFFFF' : '#F5C542') + '" stroke-width="2"/>' +
        '<text x="' + x + '" y="' + (y + 6) + '" text-anchor="middle" font-size="16" font-weight="800" fill="' + (has ? '#0A1433' : '#FFD766') + '" font-family="system-ui,sans-serif">' + (i + 1) + '</text>' +
        '<text x="' + x + '" y="' + (y + 40) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#DCE3FF" font-family="system-ui,sans-serif">' + esc(l.label) + '</text>' +
        (showTerm ? '<text x="' + x + '" y="' + (y - 30) + '" text-anchor="middle" font-size="13" font-weight="800" fill="#FFD766" font-family="system-ui,sans-serif">' + esc(l.term.length > 22 ? l.term.slice(0, 21) + '…' : l.term) + '</text>' : '') +
        '</g>';
    });
    return svg + '</svg>';
  }

  function mount(host, opts) {
    css(); opts = opts || {};
    var courses = opts.courses || [], store, palaces = [], P = null, mode = 'build', room = 0, locus = 0, walk = null, quiz = null;
    var root = document.createElement('div'); root.className = 'mp'; host.appendChild(root);
    var $ = function (s) { return root.querySelector(s); };
    function courseName(s) { var c = courses.find(function (x) { return x.slug === s; }); return c ? (c.level ? c.level + ' ' : '') + c.title : 'Any course'; }
    function speak(t, done) { if (!('speechSynthesis' in window)) { done && done(); return; } speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.rate = .95; u.onend = function () { done && done(); }; u.onerror = function () { done && done(); }; speechSynthesis.speak(u); }

    async function load() {
      try { store = await NotebookStore.open(); palaces = await store.listPalaces(); } catch (e) { palaces = []; root.innerHTML = '<p class="mp-bad">' + esc(e.message) + '</p>'; return; }
      home();
    }
    function home() {
      P = null; stopWalk();
      root.innerHTML = '<div class="mp-card"><div class="mp-row" style="justify-content:space-between"><div><p class="mp-lbl">Method of loci</p><h3>Memory palace</h3></div></div>' +
        '<p class="mp-hint">Pick a place you know by heart. Put each fact at a spot in it (a locus) and give it a picture that is weird, funny or over the top. Weird sticks. Then walk through it in your head.</p>' +
        '<div class="mp-row"><select id="mp-tpl" style="width:auto">' + Object.keys(TEMPLATES).map(function (k) { return '<option value="' + k + '">' + esc(TEMPLATES[k].name) + '</option>'; }).join('') + '</select>' +
        '<select id="mp-course" style="width:auto"><option value="">Any course</option>' + courses.map(function (c) { return '<option value="' + esc(c.slug) + '">' + esc((c.level ? c.level + ' ' : '') + c.title) + '</option>'; }).join('') + '</select>' +
        '<input id="mp-name" placeholder="Name it, e.g. Module 2 key terms" style="flex:1;min-width:200px"><button type="button" class="mp-btn go" data-a="create">Build a palace</button></div></div>' +
        '<div class="mp-card"><h3>My palaces</h3><div class="mp-list">' + (palaces.length ? palaces.map(function (p) {
          var f = filled(p).length, tot = p.rooms.reduce(function (t, r) { return t + r.loci.length; }, 0), strong = filled(p).filter(function (x) { return (x.locus.box || 0) >= 3; }).length;
          return '<button type="button" class="mp-pal" data-open="' + esc(p.id) + '"><b>' + esc(p.name) + '</b><span>' + esc(courseName(p.course_slug)) + ' · ' + p.rooms.length + ' rooms · ' + f + ' of ' + tot + ' loci filled</span><div class="mp-meter" aria-hidden="true"><i style="width:' + (f ? Math.round(strong / f * 100) : 0) + '%"></i></div><span>' + (f ? strong + ' remembered well' : 'Not started') + '</span></button>';
        }).join('') : '<p class="mp-hint">No palaces yet. Choose a place above and build your first one.</p>') + '</div></div>';
      if (opts.course) $('#mp-course').value = opts.course;
    }
    async function save() { try { var s = await store.savePalace(P); P.id = s.id; P.updated_at = s.updated_at; var i = palaces.findIndex(function (x) { return x.id === P.id; }); if (i >= 0) palaces[i] = P; else palaces.unshift(P); } catch (e) { msg(e.message, true); } }
    var saveT; function queueSave() { clearTimeout(saveT); saveT = setTimeout(save, 700); }
    function msg(t, bad) { var m = $('#mp-msg'); if (m) { m.textContent = t; m.className = bad ? 'mp-bad' : 'mp-hint'; } }

    function open(p) {
      P = p; room = 0; locus = 0; mode = 'build'; stopWalk();
      root.innerHTML = '<div class="mp-card"><div class="mp-row" style="justify-content:space-between"><div><p class="mp-lbl">' + esc(courseName(P.course_slug)) + '</p><h3>' + esc(P.name) + '</h3></div>' +
        '<div class="mp-row"><div class="mp-modes" role="group" aria-label="Mode"><button type="button" data-mode="build">Build</button><button type="button" data-mode="walk">Walk through</button><button type="button" data-mode="recall">Test my recall</button></div><button type="button" class="mp-btn go" data-a="go3d" title="Walk this palace in 3D, in a VR headset, or pin it around your room with AR">🥽 3D · VR · AR</button><button type="button" class="mp-btn" data-a="home">All palaces</button></div></div>' +
        '<div class="mp-rooms" id="mp-rooms"></div><div id="mp-body"></div><p class="mp-hint" id="mp-msg" role="status"></p></div>';
      render();
    }
    function render() {
      root.querySelectorAll('[data-mode]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === mode)); });
      $('#mp-rooms').innerHTML = mode === 'build' ? P.rooms.map(function (r, i) { return '<button type="button" class="mp-room" data-room="' + i + '" aria-pressed="' + (i === room) + '">' + esc(r.name) + '</button>'; }).join('') + '<button type="button" class="mp-room" data-a="addroom">+ Room</button>' : '';
      if (mode === 'build') renderBuild(); else if (mode === 'walk') renderWalk(); else renderRecall();
    }
    function renderBuild() {
      var r = P.rooms[room], l = r.loci[locus];
      $('#mp-body').innerHTML = '<div class="mp-stage"><div>' + scene(r, room, locus) + '<p class="mp-hint">Tap a numbered locus, then fill it in. Always go round in the same order, 1 to 6.</p><div id="mp-meme"></div></div>' +
        '<div style="display:flex;flex-direction:column;gap:10px"><div class="mp-row"><label class="mp-lbl" for="mp-rname" style="flex:1">Room name</label></div><input id="mp-rname" value="' + esc(r.name) + '">' +
        '<p class="mp-lbl" style="margin:6px 0 0">Locus ' + (locus + 1) + '</p><input id="mp-lname" aria-label="Locus name" value="' + esc(l.label) + '">' +
        '<label class="mp-lbl" for="mp-term">What to remember</label><input id="mp-term" placeholder="e.g. Primary source" value="' + esc(l.term) + '">' +
        '<label class="mp-lbl" for="mp-cue">Your memory image</label><textarea id="mp-cue" rows="3" placeholder="Make it ridiculous: a giant talking mango on your bed shouting the answer…">' + esc(l.cue) + '</textarea>' +
        '<label class="mp-lbl" for="mp-det">Details</label><textarea id="mp-det" rows="3" placeholder="Definition, example or the full answer">' + esc(l.details) + '</textarea>' +
        '<button type="button" class="mp-btn" data-a="meme" style="align-self:flex-start">' + (l.meme ? 'Edit my meme' : 'Make it a meme') + '</button>' +
        '<div class="mp-row"><button type="button" class="mp-btn" data-a="prevloc">Previous locus</button><button type="button" class="mp-btn go" data-a="nextloc">Next locus</button>' + (r.loci.length < 9 ? '<button type="button" class="mp-btn" data-a="addloc">+ Locus</button>' : '') + '</div>' +
        (P.rooms.length > 1 ? '<button type="button" class="mp-btn" data-a="delroom" style="align-self:flex-start">Remove this room</button>' : '') + '</div></div>';
      var bind = function (id, fn) { $(id).addEventListener('input', function (e) { fn(e.target.value); queueSave(); refreshScene(); }); };
      bind('#mp-rname', function (v) { r.name = v; root.querySelector('[data-room="' + room + '"]') && (root.querySelector('[data-room="' + room + '"]').textContent = v); });
      bind('#mp-lname', function (v) { l.label = v; }); bind('#mp-term', function (v) { l.term = v; }); bind('#mp-cue', function (v) { l.cue = v; }); bind('#mp-det', function (v) { l.details = v; });
    }
    function refreshScene() { var sc = root.querySelector('.mp-scene'); if (sc && mode === 'build') sc.outerHTML = scene(P.rooms[room], room, locus); }

    /* ---------- walk through ---------- */
    function renderWalk() {
      var list = filled(P);
      if (!list.length) { $('#mp-body').innerHTML = '<p class="mp-hint">Fill in some loci first (Build), then walk through them here.</p>'; return; }
      walk = walk || { i: 0, reveal: false, auto: false, reps: 1, n: 0 };
      var s = list[Math.min(walk.i, list.length - 1)];
      $('#mp-body').innerHTML = '<div class="mp-stage"><div>' + scene(s.room, s.ri, s.li, walk.reveal) + '</div><div style="display:flex;flex-direction:column;gap:10px">' +
        '<p class="mp-lbl">Stop ' + (walk.i + 1) + ' of ' + list.length + ' · ' + esc(s.room.name) + ' · Locus ' + (s.li + 1) + ': ' + esc(s.locus.label) + '</p>' +
        '<div class="mp-cue">' + (s.locus.cue ? esc(s.locus.cue) : '<span class="mp-hint">No image yet. Picture something here.</span>') + '</div>' +
        (walk.reveal ? '<div class="mp-ans">' + esc(s.locus.term) + '</div>' + (s.locus.details ? '<p style="margin:0;line-height:1.55">' + esc(s.locus.details) + '</p>' : '') + (s.locus.meme ? '<canvas class="mp-memecv" style="width:100%;max-width:320px;border-radius:12px;border:2px solid rgba(245,197,66,.6)" role="img" aria-label="Your meme"></canvas>' : '') : '<p class="mp-hint">See the image. What does it stand for?</p>') +
        '<div class="mp-row"><button type="button" class="mp-btn" data-a="wprev">Back</button>' + (walk.reveal ? '' : '<button type="button" class="mp-btn go" data-a="wreveal">Reveal</button>') + '<button type="button" class="mp-btn' + (walk.reveal ? ' go' : '') + '" data-a="wnext">Next stop</button></div>' +
        '<div class="mp-row" style="border-top:1px dashed var(--line,rgba(245,197,66,.3));padding-top:10px"><button type="button" class="mp-btn" data-a="auto">' + (walk.auto ? 'Stop the guided walk' : 'Guided walk, read aloud') + '</button>' +
        '<label class="mp-hint">Repeat <select id="mp-reps" style="width:auto;padding:4px 6px"><option value="1">once</option><option value="2">twice</option><option value="3">3 times</option><option value="0">on loop</option></select></label></div></div></div>';
      drawMeme(s.locus);
      $('#mp-reps').value = String(walk.reps);
      $('#mp-reps').addEventListener('change', function (e) { walk.reps = Number(e.target.value); });
    }
    function stopWalk() { if (walk) walk.auto = false; if ('speechSynthesis' in window) speechSynthesis.cancel(); }
    function autoStep() {
      if (!walk || !walk.auto || mode !== 'walk') return;
      var list = filled(P), s = list[walk.i]; walk.reveal = false; renderWalk();
      speak(s.room.name + '. ' + s.locus.label + '. ' + (s.locus.cue || ''), function () {
        if (!walk.auto) return;
        setTimeout(function () {
          if (!walk.auto) return; walk.reveal = true; renderWalk();
          speak(s.locus.term + '. ' + (s.locus.details || ''), function () {
            if (!walk.auto) return;
            if (walk.i < list.length - 1) { walk.i++; setTimeout(autoStep, 900); }
            else { walk.n++; if (walk.reps === 0 || walk.n < walk.reps) { walk.i = 0; setTimeout(autoStep, 1600); } else { walk.auto = false; renderWalk(); msg('Walk complete. Try Test my recall next.'); } }
          });
        }, 2500);
      });
    }

    /* ---------- recall (spaced: weakest first) ---------- */
    function renderRecall() {
      var list = filled(P);
      if (!list.length) { $('#mp-body').innerHTML = '<p class="mp-hint">Fill in some loci first (Build), then test yourself here.</p>'; return; }
      if (!quiz) { var order = list.slice().sort(function (a, b) { return (a.locus.box || 0) - (b.locus.box || 0) || Math.random() - .5; }); quiz = { list: order.slice(0, 12), i: 0, right: 0, checked: null }; }
      if (quiz.i >= quiz.list.length) {
        $('#mp-body').innerHTML = '<div class="mp-card" style="align-items:flex-start"><p class="mp-lbl">Round complete</p><div class="mp-ans">' + quiz.right + ' of ' + quiz.list.length + '</div><p class="mp-hint">' + (quiz.right === quiz.list.length ? 'Perfect round. Your palace is solid.' : 'The ones you missed come up first next time.') + '</p><div class="mp-row"><button type="button" class="mp-btn go" data-a="again">New round</button><button type="button" class="mp-btn" data-mode="walk">Walk through again</button></div></div>';
        return;
      }
      var s = quiz.list[quiz.i];
      $('#mp-body').innerHTML = '<div class="mp-stage"><div>' + scene(s.room, s.ri, s.li, !!quiz.checked) + '</div><div style="display:flex;flex-direction:column;gap:10px">' +
        '<p class="mp-lbl">Did it stick? ' + (quiz.i + 1) + ' of ' + quiz.list.length + ' · ' + esc(s.room.name) + ' · ' + esc(s.locus.label) + '</p>' +
        '<div class="mp-cue">' + (s.locus.cue ? esc(s.locus.cue) : 'What did you place at the ' + esc(s.locus.label.toLowerCase()) + '?') + '</div>' +
        '<label class="mp-lbl" for="mp-guess">What is stored here?</label><input id="mp-guess" autocomplete="off"' + (quiz.checked ? ' disabled' : '') + '>' +
        (quiz.checked ? '<p class="' + (quiz.checked === 'right' ? 'mp-ok">Correct' : 'mp-bad">Not quite') + '</p><div class="mp-ans">' + esc(s.locus.term) + '</div>' + (s.locus.details ? '<p style="margin:0;line-height:1.55">' + esc(s.locus.details) + '</p>' : '') + (s.locus.meme ? '<canvas class="mp-memecv" style="width:100%;max-width:280px;border-radius:12px;border:2px solid rgba(245,197,66,.6)" role="img" aria-label="Your meme"></canvas>' : '') +
          '<div class="mp-row">' + (quiz.checked === 'wrong' ? '<button type="button" class="mp-btn" data-a="iknew">I knew it</button>' : '') + '<button type="button" class="mp-btn go" data-a="qnext">Next</button></div>'
          : '<div class="mp-row"><button type="button" class="mp-btn go" data-a="check">Check</button><button type="button" class="mp-btn" data-a="dunno">Show me</button></div>') + '</div></div>';
      if (quiz.checked) drawMeme(s.locus);
      var g = $('#mp-guess'); if (!quiz.checked) { g.focus(); g.addEventListener('keydown', function (e) { if (e.key === 'Enter') root.querySelector('[data-a="check"]').click(); }); }
    }
    function drawMeme(l) { var cv = root.querySelector('.mp-memecv'); if (cv && l.meme && window.Memes) Memes.render(cv, l.meme); }
    function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(); }
    function grade(right) { var s = quiz.list[quiz.i]; s.locus.box = right ? Math.min(5, (s.locus.box || 0) + 1) : 0; if (right) quiz.right++; queueSave(); }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('button, .locus'); if (!b) return;
      if (b.dataset.open) { var p = palaces.find(function (x) { return x.id === b.dataset.open; }); if (p) open(JSON.parse(JSON.stringify(p))); return; }
      if (b.dataset.mode) { stopWalk(); mode = b.dataset.mode; walk = null; quiz = null; render(); return; }
      if (b.dataset.room != null) { room = Number(b.dataset.room); locus = 0; render(); return; }
      if (b.dataset.locus != null && mode === 'build') { locus = Number(b.dataset.locus); render(); return; }
      var a = b.dataset.a, list = P ? filled(P) : [];
      if (a === 'create') {
        var key = $('#mp-tpl').value;
        open({ id: null, name: $('#mp-name').value.trim() || TEMPLATES[key].name, course_slug: $('#mp-course').value, template: key, rooms: fromTemplate(key) });
        save();
      }
      if (a === 'home') home();
      if (a === 'go3d') {
        if (!filled(P).length) { msg('Fill in some loci first (Build), then walk them in 3D.', true); return; }
        stopWalk(); b.disabled = true; var lbl = b.textContent; b.textContent = 'Loading 3D…';
        load3D().then(function () {
          b.disabled = false; b.textContent = lbl;
          window.Palace3D.open(JSON.parse(JSON.stringify(P)), { mode: mode === 'recall' ? 'recall' : 'walk', start: [room, 0],
            onRecall: function (ri, li, knew) { var L = P.rooms[ri] && P.rooms[ri].loci[li]; if (L) { L.box = knew ? Math.min(5, (L.box || 0) + 1) : 0; queueSave(); } },
            onClose: function () { render(); } });
        }).catch(function () { b.disabled = false; b.textContent = lbl; msg('The 3D view could not load. Check your connection and try again.', true); });
        return;
      }
      if (a === 'meme') {
        var L = P.rooms[room].loci[locus], box = $('#mp-meme');
        if (!window.Memes) { msg('The meme maker isn\'t loaded on this page.', true); return; }
        if (!(L.term || '').trim()) { msg('Fill in What to remember first, then make it a meme.', true); return; }
        Memes.editor(box, { term: L.term, cue: L.cue, spec: L.meme, onSave: function (sp) { L.meme = sp; queueSave(); box.innerHTML = ''; msg('Meme saved as your memory image for this locus.'); render(); }, onClose: function () { box.innerHTML = ''; } });
        box.scrollIntoView({ block: 'nearest' });
      }
      if (a === 'nextloc') { if (locus < P.rooms[room].loci.length - 1) locus++; else if (room < P.rooms.length - 1) { room++; locus = 0; } render(); }
      if (a === 'prevloc') { if (locus > 0) locus--; else if (room > 0) { room--; locus = P.rooms[room].loci.length - 1; } render(); }
      if (a === 'addloc') { var r = P.rooms[room]; r.loci.push({ label: 'Locus ' + (r.loci.length + 1), term: '', cue: '', details: '', box: 0 }); locus = r.loci.length - 1; queueSave(); render(); }
      if (a === 'addroom') { P.rooms.push({ name: 'Room ' + (P.rooms.length + 1), loci: [1, 2, 3, 4, 5, 6].map(function (n) { return { label: 'Locus ' + n, term: '', cue: '', details: '', box: 0 }; }) }); room = P.rooms.length - 1; locus = 0; queueSave(); render(); }
      if (a === 'delroom') { if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Remove this room and its loci?'; return; } P.rooms.splice(room, 1); room = Math.max(0, room - 1); locus = 0; queueSave(); render(); }
      if (a === 'wreveal') { walk.reveal = true; renderWalk(); speak(list[walk.i].locus.term); }
      if (a === 'wnext') { walk.i = (walk.i + 1) % list.length; walk.reveal = false; renderWalk(); }
      if (a === 'wprev') { walk.i = (walk.i - 1 + list.length) % list.length; walk.reveal = false; renderWalk(); }
      if (a === 'auto') { if (walk.auto) { stopWalk(); renderWalk(); } else { walk.auto = true; walk.n = 0; autoStep(); } }
      if (a === 'check') { var ok = norm($('#mp-guess').value) && (norm($('#mp-guess').value) === norm(quiz.list[quiz.i].locus.term) || norm(quiz.list[quiz.i].locus.term).indexOf(norm($('#mp-guess').value)) >= 0 && norm($('#mp-guess').value).length >= 4); quiz.checked = ok ? 'right' : 'wrong'; grade(!!ok); renderRecall(); }
      if (a === 'dunno') { quiz.checked = 'wrong'; grade(false); renderRecall(); }
      if (a === 'iknew') { var s = quiz.list[quiz.i]; s.locus.box = Math.min(5, (s.locus.box || 0) + 1); quiz.right++; queueSave(); quiz.checked = 'right'; renderRecall(); }
      if (a === 'qnext') { quiz.i++; quiz.checked = null; renderRecall(); }
      if (a === 'again') { quiz = null; renderRecall(); }
    });
    root.addEventListener('keydown', function (e) { var l = e.target.closest && e.target.closest('.locus'); if (l && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); l.dispatchEvent(new MouseEvent('click', { bubbles: true })); } });
    root.addEventListener('dblclick', function () {});
    load();
    return { el: root };
  }
  window.Palace = { mount: mount, TEMPLATES: TEMPLATES, css: css };
})();
