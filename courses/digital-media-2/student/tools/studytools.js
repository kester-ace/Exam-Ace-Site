/* Exam Ace study tools: notebook, infinite paper, voice notes, memory palace, Thanks for the Memeries, study hourglass. */
/* Infinite paper: pan, zoom and write by hand, with paper styles and colour palettes.
   Paper.mount(el, { data, onChange }) → { get(), set(data), toPng(), fullscreen(), destroy() }
   data = { type, palette, strokes: [{ t:'pen'|'hl', c, w, p:[x,y,...] }], view:{x,y,z} } */
(function () {
  'use strict';
  if (window.Paper) return;

  var TYPES = [
    ['ruled', 'Ruled lines'], ['french', 'French ruled (Seyès)'], ['graph', 'Graph paper'],
    ['squared', 'Squared'], ['dots', 'Dot grid'], ['iso', 'Isometric'], ['plain', 'Plain']
  ];
  /* bg, minor line, major line, margin line, inks */
  var PALETTES = {
    night:     { name: 'Starry navy', bg: '#0B1A46', minor: 'rgba(174,185,221,.16)', major: 'rgba(245,197,66,.30)', margin: 'rgba(255,122,107,.55)', ink: ['#F1F4FF', '#FFD766', '#9DB4E6', '#FF9E8F', '#7FE0A8'] },
    classic:   { name: 'Classic white', bg: '#FFFFFF', minor: 'rgba(46,92,138,.22)', major: 'rgba(46,92,138,.45)', margin: 'rgba(191,59,39,.6)', ink: ['#0B1736', '#1F4FA8', '#BF3B27', '#17703D', '#86620A'] },
    cream:     { name: 'Cream', bg: '#FBF5E6', minor: 'rgba(120,90,40,.20)', major: 'rgba(120,90,40,.40)', margin: 'rgba(170,60,50,.55)', ink: ['#2B2116', '#1F4FA8', '#A23B2A', '#2E6B3A', '#7A4FA0'] },
    chalk:     { name: 'Chalkboard', bg: '#1E3B2E', minor: 'rgba(255,255,255,.12)', major: 'rgba(255,255,255,.26)', margin: 'rgba(255,214,120,.5)', ink: ['#F4F4EE', '#FFE38A', '#9FD3FF', '#FFB3C1', '#B9F5A7'] },
    blueprint: { name: 'Blueprint', bg: '#123E7A', minor: 'rgba(255,255,255,.14)', major: 'rgba(255,255,255,.32)', margin: 'rgba(255,214,120,.55)', ink: ['#FFFFFF', '#FFE38A', '#A9D6FF', '#FFB3A8', '#B9F5A7'] },
    sepia:     { name: 'Sepia', bg: '#F1E3C8', minor: 'rgba(90,60,30,.18)', major: 'rgba(90,60,30,.36)', margin: 'rgba(150,50,40,.5)', ink: ['#3A2A18', '#7A3B1A', '#1F4FA8', '#2E6B3A', '#7A4FA0'] }
  };

  var CSS = [
    '.pp{position:relative;display:flex;flex-direction:column;border:1px solid var(--line,rgba(245,197,66,.25));border-radius:14px;overflow:hidden;background:var(--surface,#0E1B44);min-height:380px}',
    '.pp.full{position:fixed;inset:0;z-index:2147480100;border-radius:0;padding-top:env(safe-area-inset-top,0px)}',
    '.pp-bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px 10px;border-bottom:1px solid var(--line,rgba(245,197,66,.25));background:var(--raise,rgba(255,255,255,.04))}',
    '.pp-bar .sep{width:1px;height:24px;background:var(--line,rgba(245,197,66,.25));margin:0 2px}',
    '.pp-b{display:inline-flex;align-items:center;justify-content:center;gap:5px;min-width:36px;height:36px;padding:0 9px;border-radius:9px;border:1.5px solid var(--field-line,rgba(245,197,66,.5));background:transparent;color:var(--ink,#F1F4FF);font:700 .82rem var(--f-body,system-ui,sans-serif);cursor:pointer}',
    '.pp-b[aria-pressed=true]{background:var(--blue,#F5C542);color:var(--on-blue,#0A1433);border-color:var(--blue,#F5C542)}',
    '.pp-b:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:2px}',
    '.pp-sel{height:36px;border-radius:9px;border:1.5px solid var(--field-line,rgba(245,197,66,.5));background:var(--raise,rgba(255,255,255,.06));color:var(--ink,#F1F4FF);font:700 .82rem var(--f-body,system-ui,sans-serif);padding:0 8px;max-width:170px}',
    '.pp-sw{width:26px;height:26px;border-radius:50%;border:2px solid rgba(255,255,255,.35);cursor:pointer;padding:0}',
    '.pp-sw[aria-pressed=true]{outline:3px solid var(--gold,#F5C542);outline-offset:2px}',
    '.pp-stage{position:relative;flex:1;min-height:320px;touch-action:none;cursor:crosshair}',
    '.pp-stage canvas{position:absolute;inset:0;width:100%;height:100%;display:block}',
    '.pp-stage.hand{cursor:grab}.pp-stage.hand:active{cursor:grabbing}',
    '.pp-zoom{position:absolute;right:10px;bottom:10px;display:flex;gap:6px;align-items:center;background:rgba(6,13,38,.75);border:1px solid rgba(245,197,66,.35);border-radius:10px;padding:4px 6px;color:#F1F4FF;font:700 .78rem system-ui,sans-serif}',
    '.pp-zoom button{background:none;border:0;color:#FFD766;font:800 1rem system-ui;cursor:pointer;width:28px;height:28px}',
    '.pp-hint{position:absolute;left:10px;bottom:10px;color:#AEB9DD;font:.74rem system-ui,sans-serif;background:rgba(6,13,38,.6);padding:4px 8px;border-radius:8px;pointer-events:none}'
  ].join('\n');

  function css() { if (document.getElementById('pp-css')) return; var s = document.createElement('style'); s.id = 'pp-css'; s.textContent = CSS; document.head.appendChild(s); }
  var I = {
    pen: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/></svg>',
    hl: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 15l-3 5h6l1-2"/><path d="M8 14l9-9 3 3-9 9z"/></svg>',
    er: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 20h11"/><path d="M4 15l9-10 7 7-7 8H9z"/></svg>',
    hand: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 12V6a1.5 1.5 0 013 0v5V4.5a1.5 1.5 0 013 0V11V5.5a1.5 1.5 0 013 0V12v-3a1.5 1.5 0 013 0v5a7 7 0 01-7 7h-1a7 7 0 01-6-3l-3-5a1.5 1.5 0 012.5-1.5z"/></svg>',
    undo: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 010 12h-3"/></svg>',
    redo: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14l5-5-5-5"/><path d="M20 9H10a6 6 0 000 12h3"/></svg>',
    full: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'
  };

  function mount(host, opts) {
    css(); opts = opts || {};
    var data = norm(opts.data);
    var tool = 'pen', ink = 0, width = 3, undoStack = [], redoStack = [];
    var root = document.createElement('div'); root.className = 'pp';
    root.innerHTML =
      '<div class="pp-bar" role="toolbar" aria-label="Paper tools">' +
        '<button type="button" class="pp-b" data-tool="pen" title="Pen" aria-label="Pen">' + I.pen + '</button>' +
        '<button type="button" class="pp-b" data-tool="hl" title="Highlighter" aria-label="Highlighter">' + I.hl + '</button>' +
        '<button type="button" class="pp-b" data-tool="er" title="Eraser (removes whole strokes)" aria-label="Eraser">' + I.er + '</button>' +
        '<button type="button" class="pp-b" data-tool="hand" title="Move the paper" aria-label="Move the paper">' + I.hand + '</button>' +
        '<span class="sep"></span><span class="pp-inks"></span>' +
        '<select class="pp-sel pp-w" aria-label="Line thickness"><option value="2">Fine</option><option value="3" selected>Medium</option><option value="6">Bold</option><option value="10">Marker</option></select>' +
        '<span class="sep"></span>' +
        '<select class="pp-sel pp-type" aria-label="Paper style">' + TYPES.map(function (t) { return '<option value="' + t[0] + '">' + t[1] + '</option>'; }).join('') + '</select>' +
        '<select class="pp-sel pp-pal" aria-label="Paper colours">' + Object.keys(PALETTES).map(function (k) { return '<option value="' + k + '">' + PALETTES[k].name + '</option>'; }).join('') + '</select>' +
        '<span class="sep"></span>' +
        '<button type="button" class="pp-b" data-act="undo" title="Undo" aria-label="Undo">' + I.undo + '</button>' +
        '<button type="button" class="pp-b" data-act="redo" title="Redo" aria-label="Redo">' + I.redo + '</button>' +
        '<button type="button" class="pp-b" data-act="clear" title="Clear the page">Clear</button>' +
        '<button type="button" class="pp-b" data-act="full" title="Full screen" aria-label="Full screen">' + I.full + '</button>' +
        (opts.extraButtons || '') +
      '</div>' +
      '<div class="pp-stage"><canvas aria-label="Writing paper. Draw with a pen, finger or mouse." role="img"></canvas>' +
        '<div class="pp-hint">Two fingers or the hand tool to move · pinch or Ctrl + scroll to zoom</div>' +
        '<div class="pp-zoom"><button type="button" data-act="out" aria-label="Zoom out">−</button><span class="pp-z">100%</span><button type="button" data-act="in" aria-label="Zoom in">+</button><button type="button" data-act="home" aria-label="Back to start" style="font-size:.75rem;width:auto;padding:0 4px">Reset</button></div>' +
      '</div>';
    host.appendChild(root);
    var stage = root.querySelector('.pp-stage'), cv = stage.querySelector('canvas'), g = cv.getContext('2d');
    var q = function (s) { return root.querySelector(s); };
    q('.pp-type').value = data.type; q('.pp-pal').value = data.palette;

    function pal() { return PALETTES[data.palette] || PALETTES.night; }
    function paintInks() {
      q('.pp-inks').innerHTML = pal().ink.map(function (c, i) { return '<button type="button" class="pp-sw" data-ink="' + i + '" style="background:' + c + '" aria-label="Ink colour ' + (i + 1) + '" aria-pressed="' + (i === ink) + '"></button>'; }).join(' ');
    }
    function pressTools() { root.querySelectorAll('[data-tool]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.tool === tool)); }); stage.classList.toggle('hand', tool === 'hand'); }

    /* ---------- drawing ---------- */
    var W = 0, H = 0, dpr = 1;
    function size() { var r = stage.getBoundingClientRect(); dpr = Math.min(window.devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; draw(); }
    function toWorld(x, y) { return [(x - data.view.x) / data.view.z, (y - data.view.y) / data.view.z]; }
    function grid() {
      var p = pal(), v = data.view, z = v.z, t = data.type;
      g.fillStyle = p.bg; g.fillRect(0, 0, W, H);
      if (t === 'plain') return;
      var x0 = -v.x / z, y0 = -v.y / z, x1 = x0 + W / z, y1 = y0 + H / z;
      function hLines(step, col, lw, from) { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); for (var y = Math.floor(y0 / step) * step; y < y1; y += step) { var sy = Math.round(y * z + v.y) + .5; g.moveTo(0, sy); g.lineTo(W, sy); } g.stroke(); }
      function vLines(step, col, lw) { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); for (var x = Math.floor(x0 / step) * step; x < x1; x += step) { var sx = Math.round(x * z + v.x) + .5; g.moveTo(sx, 0); g.lineTo(sx, H); } g.stroke(); }
      function margin(xw) { var sx = xw * z + v.x; if (sx > -2 && sx < W + 2) { g.strokeStyle = p.margin; g.lineWidth = 1.5; g.beginPath(); g.moveTo(sx, 0); g.lineTo(sx, H); g.stroke(); } }
      if (t === 'ruled') { hLines(32, p.major, 1); margin(-60); }
      else if (t === 'french') { hLines(8, p.minor, 1); hLines(32, p.major, 1.2); vLines(32, p.major, 1.2); margin(-64); }
      else if (t === 'graph') { if (z > .5) { hLines(8, p.minor, 1); vLines(8, p.minor, 1); } hLines(40, p.major, 1.2); vLines(40, p.major, 1.2); }
      else if (t === 'squared') { hLines(20, p.minor, 1); vLines(20, p.minor, 1); }
      else if (t === 'dots') { g.fillStyle = p.major; var s = 24, r = Math.max(1, 1.3 * Math.min(z, 1.6)); for (var yy = Math.floor(y0 / s) * s; yy < y1; yy += s) for (var xx = Math.floor(x0 / s) * s; xx < x1; xx += s) { g.beginPath(); g.arc(xx * z + v.x, yy * z + v.y, r, 0, 6.283); g.fill(); } }
      else if (t === 'iso') { var h = 24, w = h * Math.sqrt(3); g.fillStyle = p.major; for (var yi = Math.floor(y0 / h) - 1; yi * h < y1; yi++) for (var xi = Math.floor(x0 / w) - 1; xi * w < x1; xi++) { var ox = xi * w + (yi % 2 ? w / 2 : 0); g.beginPath(); g.arc(ox * z + v.x, yi * h * z + v.y, Math.max(1, 1.2 * Math.min(z, 1.6)), 0, 6.283); g.fill(); } }
    }
    function stroke(s) {
      var p = s.p; if (p.length < 2) return;
      g.globalAlpha = s.t === 'hl' ? .32 : 1; g.strokeStyle = s.c; g.lineCap = 'round'; g.lineJoin = 'round';
      g.lineWidth = (s.t === 'hl' ? s.w * 4 : s.w) * data.view.z;
      g.beginPath(); g.moveTo(p[0] * data.view.z + data.view.x, p[1] * data.view.z + data.view.y);
      if (p.length === 2) g.lineTo(p[0] * data.view.z + data.view.x + .1, p[1] * data.view.z + data.view.y);
      for (var i = 2; i < p.length; i += 2) g.lineTo(p[i] * data.view.z + data.view.x, p[i + 1] * data.view.z + data.view.y);
      g.stroke(); g.globalAlpha = 1;
    }
    function draw() { g.setTransform(dpr, 0, 0, dpr, 0, 0); grid(); data.strokes.forEach(stroke); if (cur) stroke(cur); q('.pp-z').textContent = Math.round(data.view.z * 100) + '%'; }

    var pts = new Map(), cur = null, pinch = null, panStart = null;
    function changed() { if (opts.onChange) opts.onChange(get()); }
    function hit(wx, wy, r) {
      for (var i = data.strokes.length - 1; i >= 0; i--) { var p = data.strokes[i].p, rr = r + data.strokes[i].w; for (var j = 0; j < p.length; j += 2) { var dx = p[j] - wx, dy = p[j + 1] - wy; if (dx * dx + dy * dy < rr * rr) return i; } }
      return -1;
    }
    stage.addEventListener('pointerdown', function (e) {
      stage.setPointerCapture(e.pointerId);
      pts.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
      if (pts.size === 2) { cur = null; var a = Array.from(pts.values()); pinch = { d: Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y), cx: (a[0].x + a[1].x) / 2, cy: (a[0].y + a[1].y) / 2, view: Object.assign({}, data.view) }; draw(); return; }
      if (tool === 'hand' || e.button === 1) { panStart = { x: e.offsetX, y: e.offsetY, vx: data.view.x, vy: data.view.y }; return; }
      var w = toWorld(e.offsetX, e.offsetY);
      if (tool === 'er') { var i = hit(w[0], w[1], 8 / data.view.z); if (i >= 0) { undoStack.push(JSON.stringify(data.strokes)); redoStack = []; data.strokes.splice(i, 1); draw(); changed(); } return; }
      cur = { t: tool === 'hl' ? 'hl' : 'pen', c: pal().ink[ink], w: width, p: [round(w[0]), round(w[1])] };
    });
    stage.addEventListener('pointermove', function (e) {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x: e.offsetX, y: e.offsetY });
      if (pinch && pts.size === 2) {
        var a = Array.from(pts.values()), d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y), cx = (a[0].x + a[1].x) / 2, cy = (a[0].y + a[1].y) / 2;
        var z = clamp(pinch.view.z * d / (pinch.d || 1)); var wx = (pinch.cx - pinch.view.x) / pinch.view.z, wy = (pinch.cy - pinch.view.y) / pinch.view.z;
        data.view = { z: z, x: cx - wx * z, y: cy - wy * z }; draw(); return;
      }
      if (panStart) { data.view.x = panStart.vx + e.offsetX - panStart.x; data.view.y = panStart.vy + e.offsetY - panStart.y; draw(); return; }
      if (tool === 'er' && e.buttons) { var w2 = toWorld(e.offsetX, e.offsetY), i2 = hit(w2[0], w2[1], 8 / data.view.z); if (i2 >= 0) { undoStack.push(JSON.stringify(data.strokes)); data.strokes.splice(i2, 1); draw(); changed(); } return; }
      if (cur) { var w = toWorld(e.offsetX, e.offsetY); cur.p.push(round(w[0]), round(w[1])); draw(); }
    });
    function end(e) {
      pts.delete(e.pointerId);
      if (pinch && pts.size < 2) { pinch = null; changed(); }
      if (panStart) { panStart = null; changed(); }
      if (cur) { undoStack.push(JSON.stringify(data.strokes)); redoStack = []; data.strokes.push(cur); cur = null; draw(); changed(); }
    }
    stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) { zoomAt(e.offsetX, e.offsetY, Math.exp(-e.deltaY * .01)); }
      else { data.view.x -= e.deltaX; data.view.y -= e.deltaY; draw(); }
      clearTimeout(stage._t); stage._t = setTimeout(changed, 400);
    }, { passive: false });
    function zoomAt(x, y, f) { var z = clamp(data.view.z * f); var wx = (x - data.view.x) / data.view.z, wy = (y - data.view.y) / data.view.z; data.view = { z: z, x: x - wx * z, y: y - wy * z }; draw(); }
    function clamp(z) { return Math.max(.2, Math.min(5, z)); }
    function round(n) { return Math.round(n * 10) / 10; }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.tool) { tool = b.dataset.tool; pressTools(); }
      if (b.dataset.ink != null) { ink = Number(b.dataset.ink); paintInks(); if (tool === 'er' || tool === 'hand') { tool = 'pen'; pressTools(); } }
      var a = b.dataset.act;
      if (a === 'undo' && undoStack.length) { redoStack.push(JSON.stringify(data.strokes)); data.strokes = JSON.parse(undoStack.pop()); draw(); changed(); }
      if (a === 'redo' && redoStack.length) { undoStack.push(JSON.stringify(data.strokes)); data.strokes = JSON.parse(redoStack.pop()); draw(); changed(); }
      if (a === 'clear') { if (!data.strokes.length) return; if (b.dataset.confirm !== '1') { b.dataset.confirm = '1'; b.textContent = 'Clear all?'; setTimeout(function () { b.dataset.confirm = ''; b.textContent = 'Clear'; }, 2500); return; } undoStack.push(JSON.stringify(data.strokes)); data.strokes = []; b.dataset.confirm = ''; b.textContent = 'Clear'; draw(); changed(); }
      if (a === 'full') { root.classList.toggle('full'); setTimeout(size, 30); }
      if (a === 'in') zoomAt(W / 2, H / 2, 1.25);
      if (a === 'out') zoomAt(W / 2, H / 2, .8);
      if (a === 'home') { data.view = { x: 80, y: 40, z: 1 }; draw(); changed(); }
    });
    q('.pp-w').addEventListener('change', function (e) { width = Number(e.target.value); });
    q('.pp-type').addEventListener('change', function (e) { data.type = e.target.value; draw(); changed(); });
    q('.pp-pal').addEventListener('change', function (e) {
      var old = pal(); data.palette = e.target.value; var nw = pal();
      data.strokes.forEach(function (s) { var i = old.ink.indexOf(s.c); if (i >= 0) s.c = nw.ink[i]; }); /* inks follow the new palette */
      paintInks(); draw(); changed();
    });
    document.addEventListener('keydown', function onKey(e) {
      if (!root.isConnected) { document.removeEventListener('keydown', onKey); return; }
      if (e.key === 'Escape' && root.classList.contains('full')) { root.classList.remove('full'); setTimeout(size, 30); }
    });

    var ro = new ResizeObserver(size); ro.observe(stage);
    paintInks(); pressTools(); size();

    function get() { return JSON.parse(JSON.stringify(data)); }
    return {
      el: root, get: get,
      set: function (d) { data = norm(d); undoStack = []; redoStack = []; q('.pp-type').value = data.type; q('.pp-pal').value = data.palette; paintInks(); draw(); },
      isEmpty: function () { return !data.strokes.length; },
      /* dark ink on white, cropped to the writing: what handwriting recognition reads best */
      toPng: function (forReading) {
        var s = data.strokes; if (!s.length) return null;
        var mnx = 1e9, mny = 1e9, mxx = -1e9, mxy = -1e9;
        s.forEach(function (k) { for (var i = 0; i < k.p.length; i += 2) { mnx = Math.min(mnx, k.p[i]); mxx = Math.max(mxx, k.p[i]); mny = Math.min(mny, k.p[i + 1]); mxy = Math.max(mxy, k.p[i + 1]); } });
        var pad = 24, w = mxx - mnx + pad * 2, h = mxy - mny + pad * 2, sc = Math.min(2, 2400 / Math.max(w, h));
        var c = document.createElement('canvas'); c.width = Math.ceil(w * sc); c.height = Math.ceil(h * sc); var x = c.getContext('2d');
        x.fillStyle = forReading ? '#FFFFFF' : pal().bg; x.fillRect(0, 0, c.width, c.height);
        s.forEach(function (k) { if (forReading && k.t === 'hl') return; x.globalAlpha = k.t === 'hl' ? .32 : 1; x.strokeStyle = forReading ? '#111111' : k.c; x.lineCap = x.lineJoin = 'round'; x.lineWidth = (k.t === 'hl' ? k.w * 4 : Math.max(k.w, 2.5)) * sc; x.beginPath(); x.moveTo((k.p[0] - mnx + pad) * sc, (k.p[1] - mny + pad) * sc); for (var i = 2; i < k.p.length; i += 2) x.lineTo((k.p[i] - mnx + pad) * sc, (k.p[i + 1] - mny + pad) * sc); x.stroke(); });
        return c.toDataURL('image/png');
      },
      strokes: function () { return data.strokes; },
      destroy: function () { ro.disconnect(); root.remove(); }
    };
  }
  function norm(d) {
    d = d || {};
    return { type: d.type || 'ruled', palette: PALETTES[d.palette] ? d.palette : 'night', strokes: Array.isArray(d.strokes) ? d.strokes : [], view: d.view && d.view.z ? d.view : { x: 80, y: 40, z: 1 } };
  }

  window.Paper = { mount: mount, TYPES: TYPES, PALETTES: PALETTES };
})();
/* My Notebook: where notes, sketches and voice notes are kept.
   Signed in on the live site → the student's Exam Ace account (database + private audio storage).
   Demo or offline → this device (IndexedDB). Same functions either way. */
(function () {
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "n" + Date.now().toString(36) + Math.random().toString(36).slice(2));

  /* ---------- this device ---------- */
  function idb() {
    return new Promise((res, rej) => {
      const r = indexedDB.open("ea-notebook", 2);
      r.onupgradeneeded = () => { const d = r.result;
        if (!d.objectStoreNames.contains("notes")) d.createObjectStore("notes", { keyPath: "id" });
        if (!d.objectStoreNames.contains("voice")) { const v = d.createObjectStore("voice", { keyPath: "id" }); v.createIndex("note", "note_id"); }
        if (!d.objectStoreNames.contains("palaces")) d.createObjectStore("palaces", { keyPath: "id" }); };
      r.onsuccess = () => res(r.result); r.onerror = () => rej(new Error("This browser can't save notes on the device. Try another browser, or sign in to save to your account."));
    });
  }
  const tx = async (store, mode, fn) => { const d = await idb(); return new Promise((res, rej) => { const t = d.transaction(store, mode); const s = t.objectStore(store); const out = fn(s); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error); }); };
  const all = (store) => tx(store, "readonly", s => s.getAll());

  const Local = {
    mode: "device",
    async listNotes() { return (await all("notes")).map(({ id, course_slug, topic, kind, title, updated_at }) => ({ id, course_slug, topic, kind, title, updated_at })).sort((a, b) => b.updated_at.localeCompare(a.updated_at)); },
    async getNote(id) { return tx("notes", "readonly", s => s.get(id)); },
    async saveNote(n) { n.updated_at = new Date().toISOString(); if (!n.id) { n.id = uid(); n.created_at = n.updated_at; } await tx("notes", "readwrite", s => s.put(n)); return n; },
    async deleteNote(id) { const v = await this.listVoice(id); await tx("voice", "readwrite", s => v.forEach(x => s.delete(x.id))); await tx("notes", "readwrite", s => s.delete(id)); },
    async listVoice(noteId) { return (await all("voice")).filter(v => v.note_id === noteId).sort((a, b) => a.created_at.localeCompare(b.created_at)).map(v => ({ ...v })); },
    async addVoice(noteId, blob, meta) { const v = { id: uid(), note_id: noteId, blob, created_at: new Date().toISOString(), ...meta }; await tx("voice", "readwrite", s => s.put(v)); return v; },
    async updateVoice(v, patch) { const cur = await tx("voice", "readonly", s => s.get(v.id)); Object.assign(cur, patch); await tx("voice", "readwrite", s => s.put(cur)); return cur; },
    async deleteVoice(v) { await tx("voice", "readwrite", s => s.delete(v.id)); },
    async voiceUrl(v) { return URL.createObjectURL(v.blob); },
    async transcribe() { throw new Error("Transcribing uploaded recordings works on the live Exam Ace site, once you're signed in."); },
    async handwriting(png, strokes) { const t = await localInk(strokes); if (t != null) return t; throw new Error("Converting handwriting works on the live Exam Ace site, once you're signed in."); },
    async listPalaces() { return (await all("palaces")).sort((a, b) => b.updated_at.localeCompare(a.updated_at)); },
    async savePalace(p) { p.updated_at = new Date().toISOString(); if (!p.id) p.id = uid(); await tx("palaces", "readwrite", s => s.put(p)); return p; },
    async deletePalace(id) { await tx("palaces", "readwrite", s => s.delete(id)); }
  };

  /* Some devices (for example Chromebooks) can read handwriting themselves, at no cost */
  async function localInk(strokes) {
    try {
      if (!navigator.createHandwritingRecognizer || !strokes || !strokes.length) return null;
      const rec = await navigator.createHandwritingRecognizer({ languages: ["en"] });
      const drawing = rec.startDrawing({ recognitionType: "text" });
      strokes.forEach(s => { if (s.t === "hl") return; const st = new HandwritingStroke(); for (let i = 0; i < s.p.length; i += 2) st.addPoint({ x: s.p[i], y: s.p[i + 1], t: i * 8 }); drawing.addStroke(st); });
      const res = await drawing.getPrediction(); drawing.clear(); rec.finish();
      return res && res[0] ? res[0].text : null;
    } catch (e) { return null; }
  }

  /* ---------- the student's account ---------- */
  function Live(sb, getToken) {
    const BUCKET = "voice-notes";
    const me = async () => { const { data: { session } } = await sb.auth.getSession(); if (!session) throw new Error("Sign in again to save your notes."); return session.user.id; };
    const fail = (e, what) => { if (e) throw new Error(what + " Check your connection and try again."); };
    const post = async (fn, body) => {
      const r = await fetch("/.netlify/functions/" + fn, { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + (await getToken()) }, body: JSON.stringify(body) });
      const out = await r.json().catch(() => ({})); if (!r.ok) throw new Error(out.error || "That didn't work. Try again in a minute."); return out;
    };
    return {
      mode: "account",
      async listNotes() { const { data, error } = await sb.from("notes").select("id,course_slug,topic,kind,title,updated_at").order("updated_at", { ascending: false }); fail(error, "Your notes didn't load."); return data || []; },
      async getNote(id) { const { data, error } = await sb.from("notes").select("*").eq("id", id).single(); fail(error, "That note didn't open."); return data; },
      async saveNote(n) {
        const row = { course_slug: n.course_slug, topic: n.topic, kind: n.kind, title: n.title, body: n.body || {}, sketch: n.sketch || [] };
        if (n.id) { const { data, error } = await sb.from("notes").update({ ...row, updated_at: new Date().toISOString() }).eq("id", n.id).select().single(); fail(error, "Your note didn't save."); return data; }
        const { data, error } = await sb.from("notes").insert(row).select().single(); fail(error, "Your note didn't save."); return data;
      },
      async deleteNote(id) { const v = await this.listVoice(id); if (v.length) await sb.storage.from(BUCKET).remove(v.map(x => x.path)); const { error } = await sb.from("notes").delete().eq("id", id); fail(error, "That note wasn't deleted."); },
      async listVoice(noteId) { const { data, error } = await sb.from("voice_notes").select("*").eq("note_id", noteId).order("created_at"); fail(error, "Voice notes didn't load."); return data || []; },
      async addVoice(noteId, blob, meta) {
        const id = me && (await me()); const ext = (blob.type.includes("mp4") || blob.type.includes("m4a")) ? "m4a" : blob.type.includes("mpeg") ? "mp3" : blob.type.includes("wav") ? "wav" : blob.type.includes("ogg") ? "ogg" : "webm";
        const path = `${id}/${noteId}/${uid()}.${ext}`;
        const up = await sb.storage.from(BUCKET).upload(path, blob, { contentType: blob.type || "audio/webm" }); fail(up.error, "The recording didn't upload.");
        const { data, error } = await sb.from("voice_notes").insert({ note_id: noteId, path, ...meta }).select().single(); fail(error, "The recording didn't save."); return data;
      },
      async updateVoice(v, patch) { const { data, error } = await sb.from("voice_notes").update(patch).eq("id", v.id).select().single(); fail(error, "That change didn't save."); return data; },
      async deleteVoice(v) { await sb.storage.from(BUCKET).remove([v.path]); const { error } = await sb.from("voice_notes").delete().eq("id", v.id); fail(error, "The recording wasn't deleted."); },
      async voiceUrl(v) { const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(v.path, 3600); fail(error, "The recording didn't load."); return data.signedUrl; },
      async transcribe(v) { const out = await post("transcribe", { voice_id: v.id }); return out.text || ""; },
      async handwriting(pngDataUrl, strokes) { const t = await localInk(strokes); if (t != null) return t; const out = await post("handwriting", { image: pngDataUrl }); return out.text || ""; },
      async listPalaces() { const { data, error } = await sb.from("palaces").select("*").order("updated_at", { ascending: false }); fail(error, "Your memory palaces didn't load."); return (data || []).map(r => ({ ...r.data, id: r.id, updated_at: r.updated_at })); },
      async savePalace(p) {
        const row = { course_slug: p.course_slug || null, name: p.name, data: p };
        if (p.id && !String(p.id).startsWith("tmp")) { const { data, error } = await sb.from("palaces").update({ ...row, updated_at: new Date().toISOString() }).eq("id", p.id).select().single(); fail(error, "Your palace didn't save."); return { ...data.data, id: data.id, updated_at: data.updated_at }; }
        const { data, error } = await sb.from("palaces").insert(row).select().single(); fail(error, "Your palace didn't save."); return { ...data.data, id: data.id, updated_at: data.updated_at };
      },
      async deletePalace(id) { const { error } = await sb.from("palaces").delete().eq("id", id); fail(error, "That palace wasn't deleted."); }
    };
  }

  window.NotebookStore = {
    async open() {
      /* a course opened from the hub borrows the hub's sign-in, so notes made inside a course
         land in the same account; a course opened on its own saves on this device */
      let A = window.Auth;
      if (!A || !A.client) { try { if (window.parent !== window && window.parent.Auth) A = window.parent.Auth; } catch (e) { A = null; } }
      if (!A || !A.client) return Local;
      try {
        const sb = await A.client();
        if (sb) { const { data: { session } } = await sb.auth.getSession(); if (session) return Live(sb, () => A.token()); }
      } catch (e) {}
      return Local;
    }
  };
})();
/* Thanks for the Memeries: students make their own memes to remember things.
   Upload a picture (or take one), pick a layout, type your own captions, save it.
   Memes.render(canvas, spec)          draws a saved meme (pictures are kept inside the spec)
   Memes.editor(el, { term, spec, onSave(spec), onClose })
   spec = { layout, img, img2, z, x, y, z2, x2, y2, a, b, size, color } */
(function () {
  'use strict';
  if (window.Memes) return;
  var LAYOUTS = {
    classic: { name: 'Top and bottom text', fields: ['Top text', 'Bottom text'], pics: 1 },
    caption: { name: 'Caption above', fields: ['Caption'], pics: 1 },
    panels: { name: 'Two pictures', fields: ['Left label', 'Right label'], pics: 2 }
  };
  var COLORS = { white: ['#FFFFFF', '#000000'], black: ['#000000', '#FFFFFF'], gold: ['#FFD766', '#0A1433'] };
  var SIZES = { s: 38, m: 50, l: 64 };
  var W = 600, H = 600, cache = {};
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* older palaces saved {f:'classic', a, b}: show those as top/bottom text on Ace */
  function norm(s) {
    s = s ? JSON.parse(JSON.stringify(s)) : {};
    if (!s.layout) { s.layout = 'classic'; if (s.f && !s.img) s.img = 'ace'; }
    if (!LAYOUTS[s.layout]) s.layout = 'classic';
    s.z = s.z || 1; s.x = s.x || 0; s.y = s.y || 0; s.z2 = s.z2 || 1; s.x2 = s.x2 || 0; s.y2 = s.y2 || 0;
    s.size = SIZES[s.size] ? s.size : 'm'; s.color = COLORS[s.color] ? s.color : 'white';
    return s;
  }

  /* ---------- drawing ---------- */
  function load(src, then) {
    if (!src || src === 'ace') return null;
    var c = cache[src];
    if (c && c.complete && c.naturalWidth) return c;
    if (!c) { c = cache[src] = new Image(); if (then) c.addEventListener('load', then, { once: true }); c.src = src; }
    else if (then) c.addEventListener('load', then, { once: true });
    return null;
  }
  function backdrop(g, x, y, w, h) {
    var gr = g.createLinearGradient(x, y, x + w, y + h); gr.addColorStop(0, '#122a6b'); gr.addColorStop(1, '#0a1638'); g.fillStyle = gr; g.fillRect(x, y, w, h);
    var r = 7; function rnd() { r = (r * 9301 + 49297) % 233280; return r / 233280; }
    for (var i = 0; i < 40; i++) { g.globalAlpha = .3 + rnd() * .7; g.fillStyle = rnd() < .2 ? '#FFD766' : '#fff'; g.beginPath(); g.arc(x + rnd() * w, y + rnd() * h, rnd() * 1.6 + .3, 0, 6.283); g.fill(); }
    g.globalAlpha = 1;
  }
  /* Ace, the Exam Ace gold star, for anyone without a picture to hand */
  function ace(g, cx, cy, R) {
    g.save(); g.translate(cx, cy); g.beginPath();
    for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? R * .5 : R; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    g.closePath(); var sg = g.createLinearGradient(0, -R, 0, R); sg.addColorStop(0, '#FFF3B0'); sg.addColorStop(.5, '#F5C542'); sg.addColorStop(1, '#C99A1C');
    g.fillStyle = sg; g.fill(); g.lineWidth = R * .06; g.strokeStyle = '#7A5605'; g.stroke();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(-R * .18, -R * .08, R * .14, 0, 6.283); g.arc(R * .18, -R * .08, R * .14, 0, 6.283); g.fill();
    g.fillStyle = '#0A1433'; g.beginPath(); g.arc(-R * .16, -R * .06, R * .07, 0, 6.283); g.arc(R * .2, -R * .06, R * .07, 0, 6.283); g.fill();
    g.beginPath(); g.ellipse(0, R * .24, R * .07, R * .1, 0, 0, 6.283); g.fill(); g.restore();
  }
  /* a picture filling its box; z zooms in, x/y (-1..1) move it */
  function picture(g, src, bx, by, bw, bh, z, ox, oy, redraw) {
    g.save(); g.beginPath(); g.rect(bx, by, bw, bh); g.clip();
    backdrop(g, bx, by, bw, bh);
    if (src === 'ace') ace(g, bx + bw / 2, by + bh / 2, Math.min(bw, bh) * .3);
    else if (src) {
      var im = load(src, redraw);
      if (im) {
        var s = Math.max(bw / im.naturalWidth, bh / im.naturalHeight) * z, dw = im.naturalWidth * s, dh = im.naturalHeight * s;
        g.drawImage(im, bx + (bw - dw) / 2 + ox * (dw - bw) / 2, by + (bh - dh) / 2 + oy * (dh - bh) / 2, dw, dh);
      }
    } else {
      g.fillStyle = 'rgba(255,215,102,.85)'; g.font = '700 22px "Atkinson Hyperlegible",Verdana,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('Add a picture', bx + bw / 2, by + bh / 2);
    }
    g.restore();
  }
  function wrap(g, text, maxW) {
    var words = String(text || '').split(/\s+/).filter(Boolean), lines = [], line = '';
    words.forEach(function (w) { var t = line ? line + ' ' + w : w; if (g.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; });
    if (line) lines.push(line); return lines;
  }
  /* classic meme lettering: bold capitals with an outline, shrinks to fit */
  function shout(g, text, x, y, maxW, size, color, fromBottom) {
    if (!String(text || '').trim()) return;
    var lines;
    do { g.font = '900 ' + size + 'px Impact,"Anton","Arial Black","Bricolage Grotesque",sans-serif'; lines = wrap(g, String(text).toUpperCase(), maxW); size -= 3; } while (lines.length > 3 && size > 16);
    size += 3; var lh = size * 1.08, y0 = fromBottom ? y - lines.length * lh : y;
    g.textAlign = 'center'; g.textBaseline = 'top'; g.lineJoin = 'round'; g.lineWidth = Math.max(4, size / 7); g.strokeStyle = COLORS[color][1]; g.fillStyle = COLORS[color][0];
    lines.forEach(function (l, i) { g.strokeText(l, x, y0 + i * lh); g.fillText(l, x, y0 + i * lh); });
  }
  function render(cv, spec, redraw) {
    var s = norm(spec), L = s.layout, g = cv.getContext('2d'), size = SIZES[s.size];
    var again = redraw || function () { render(cv, spec); };
    if (L === 'caption') {
      var fs = Math.round(size * .62);
      g.font = '700 ' + fs + 'px "Atkinson Hyperlegible",Verdana,sans-serif';
      var lines = wrap(g, s.a || 'Your caption', W - 48), lh = Math.round(fs * 1.3), bar = Math.max(90, lines.length * lh + 44);
      cv.width = W; cv.height = bar + 460; g = cv.getContext('2d');
      g.fillStyle = '#fff'; g.fillRect(0, 0, W, bar);
      g.font = '700 ' + fs + 'px "Atkinson Hyperlegible",Verdana,sans-serif'; g.fillStyle = s.a ? '#0A1433' : '#8A93AE'; g.textAlign = 'left'; g.textBaseline = 'top';
      lines.forEach(function (l, i) { g.fillText(l, 24, 22 + i * lh); });
      picture(g, s.img, 0, bar, W, 460, s.z, s.x, s.y, again);
    } else if (L === 'panels') {
      cv.width = W; cv.height = 420; g = cv.getContext('2d');
      picture(g, s.img, 0, 0, W / 2 - 2, 420, s.z, s.x, s.y, again);
      picture(g, s.img2, W / 2 + 2, 0, W / 2 - 2, 420, s.z2, s.x2, s.y2, again);
      g.fillStyle = '#F5C542'; g.fillRect(W / 2 - 2, 0, 4, 420);
      shout(g, s.a, W / 4, 16, W / 2 - 28, size * .72, s.color); shout(g, s.b, W * 3 / 4, 16, W / 2 - 28, size * .72, s.color);
    } else {
      cv.width = W; cv.height = H; g = cv.getContext('2d');
      picture(g, s.img, 0, 0, W, H, s.z, s.x, s.y, again);
      shout(g, s.a, W / 2, 18, W - 40, size, s.color); shout(g, s.b, W / 2, H - 18, W - 40, size, s.color, true);
    }
    return cv;
  }

  /* shrink uploads so they save quickly and fit in a memory palace */
  function shrink(file) {
    return new Promise(function (res, rej) {
      if (!/^image\//.test(file.type)) return rej(new Error('Choose a picture file (JPG, PNG, GIF or WebP).'));
      var url = URL.createObjectURL(file), im = new Image();
      im.onload = function () {
        var k = Math.min(1, 900 / Math.max(im.naturalWidth, im.naturalHeight)), c = document.createElement('canvas');
        c.width = Math.round(im.naturalWidth * k); c.height = Math.round(im.naturalHeight * k);
        var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', .85));
      };
      im.onerror = function () { URL.revokeObjectURL(url); rej(new Error('That picture could not be opened. Try a JPG or PNG.')); };
      im.src = url;
    });
  }

  var CSS = [
    '.mm{display:flex;flex-direction:column;gap:12px}',
    '.mm-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:start}',
    '@media (max-width:760px){.mm-grid{grid-template-columns:1fr}}',
    '.mm canvas{width:100%;height:auto;border-radius:14px;border:2px solid rgba(245,197,66,.6);touch-action:none;cursor:grab;display:block}',
    '.mm canvas:active{cursor:grabbing}',
    '.mm-side{display:flex;flex-direction:column;gap:10px;min-width:0}',
    '.mm-chips{display:flex;flex-wrap:wrap;gap:6px}',
    '.mm-chips button{border:1.5px solid var(--field-line,rgba(245,197,66,.5));background:transparent;color:var(--ink,#F1F4FF);border-radius:999px;padding:6px 11px;font:700 .8rem var(--f-body,system-ui,sans-serif);cursor:pointer}',
    '.mm-chips button[aria-pressed=true]{background:var(--blue,#F5C542);color:var(--on-blue,#0A1433);border-color:var(--blue,#F5C542)}',
    '.mm-chips button:focus-visible,.mm-up:focus-within{outline:3px solid var(--gold,#F5C542);outline-offset:2px}',
    '.mm-up{position:relative;display:inline-flex;align-items:center;gap:6px;border:1.5px dashed var(--field-line,rgba(245,197,66,.6));border-radius:10px;padding:8px 12px;font:700 .86rem var(--f-body,system-ui,sans-serif);cursor:pointer;color:var(--ink,#F1F4FF)}',
    '.mm-up input{position:absolute;width:1px;height:1px;opacity:0}',
    '.mm input[type=range]{width:100%;accent-color:#F5C542;padding:0;border:0;background:none}',
    '.mm-note{font-size:.8rem;color:var(--muted,#AEB9DD);margin:0;line-height:1.45}'
  ].join('\n');
  function css() { if (document.getElementById('mm-css')) return; var s = document.createElement('style'); s.id = 'mm-css'; s.textContent = CSS; document.head.appendChild(s); }

  function editor(host, o) {
    css(); o = o || {};
    var spec = norm(o.spec), term = (o.term || '').trim();
    function pics() {
      var n = LAYOUTS[spec.layout].pics, out = '';
      for (var i = 1; i <= n; i++) {
        var k = i === 1 ? '' : '2', label = n === 1 ? 'Picture' : (i === 1 ? 'Left picture' : 'Right picture');
        out += '<div style="display:flex;flex-direction:column;gap:6px"><span class="mp-lbl">' + label + '</span><div class="mp-row">' +
          '<label class="mm-up">Upload a picture<input type="file" accept="image/*" data-pic="' + k + '"></label>' +
          '<button type="button" class="mp-btn" data-ace="' + k + '">Use Ace instead</button>' +
          (spec['img' + k] ? '<button type="button" class="mp-btn" data-rm="' + k + '">Remove</button>' : '') + '</div>' +
          (spec['img' + k] && spec['img' + k] !== 'ace' ? '<label class="mp-lbl" for="mm-z' + k + '">Zoom</label><input type="range" id="mm-z' + k + '" min="1" max="3" step="0.05" value="' + spec['z' + k] + '" data-z="' + k + '">' : '') + '</div>';
      }
      return out;
    }
    function fields() {
      return LAYOUTS[spec.layout].fields.map(function (lab, i) {
        var k = 'ab'[i];
        return '<label class="mp-lbl" for="mm-' + k + '">' + lab + '</label><input id="mm-' + k + '" data-k="' + k + '" maxlength="140" value="' + esc(spec[k] || '') + '" placeholder="Type your own' + (term && i === 0 ? ', e.g. mention ' + esc(term) : '') + '">';
      }).join('');
    }
    function paint() {
      host.innerHTML = '<div class="mm"><p class="mp-lbl" style="margin:0">Thanks for the Memeries · make your own meme</p>' +
        '<div class="mm-grid"><div><canvas role="img" aria-label="Your meme"></canvas><p class="mm-note" style="margin-top:6px">Drag the picture to move it.</p></div><div class="mm-side">' +
        '<span class="mp-lbl">Layout</span><div class="mm-chips" role="group" aria-label="Layout">' + Object.keys(LAYOUTS).map(function (k) { return '<button type="button" data-l="' + k + '" aria-pressed="' + (k === spec.layout) + '">' + LAYOUTS[k].name + '</button>'; }).join('') + '</div>' +
        pics() + fields() +
        (spec.layout !== 'caption' ? '<span class="mp-lbl">Text</span><div class="mm-chips" role="group" aria-label="Text size">' + [['s', 'Small'], ['m', 'Medium'], ['l', 'Large']].map(function (z) { return '<button type="button" data-sz="' + z[0] + '" aria-pressed="' + (spec.size === z[0]) + '">' + z[1] + '</button>'; }).join('') + '</div>' +
          '<div class="mm-chips" role="group" aria-label="Text colour">' + [['white', 'White'], ['black', 'Black'], ['gold', 'Gold']].map(function (c) { return '<button type="button" data-c="' + c[0] + '" aria-pressed="' + (spec.color === c[0]) + '">' + c[1] + '</button>'; }).join('') + '</div>' : '') +
        '<p class="mm-note">' + (term ? 'Make it about <b>' + esc(term) + '</b>. ' : '') + 'The funnier or stranger the picture, the better it sticks.</p>' +
        '<p class="mm-note">Use your own photos or pictures you have permission to use. Ask before using a photo of someone else.</p>' +
        '<p class="mm-note" data-err role="alert" style="color:var(--bad,#FF7A6B)"></p>' +
        '<div class="mp-row">' + (o.onSave ? '<button type="button" class="mp-btn go" data-m="save">Use as my memory image</button>' : '') +
        '<button type="button" class="mp-btn' + (o.onSave ? '' : ' go') + '" data-m="png">Save picture</button>' +
        (o.onClose ? '<button type="button" class="mp-btn" data-m="close">Close</button>' : '') + '</div></div></div></div>';
      draw(); hookCanvas();
    }
    function draw() { var cv = host.querySelector('canvas'); if (cv) render(cv, spec, draw); }
    function err(t) { var e = host.querySelector('[data-err]'); if (e) e.textContent = t || ''; }

    /* drag to move the picture; in Two pictures, the side you grab is the one that moves */
    function hookCanvas() {
      var cv = host.querySelector('canvas'), drag = null;
      cv.addEventListener('pointerdown', function (e) {
        var r = cv.getBoundingClientRect(), k = spec.layout === 'panels' && (e.clientX - r.left) > r.width / 2 ? '2' : '';
        if (!spec['img' + k] || spec['img' + k] === 'ace') return;
        drag = { k: k, x: e.clientX, y: e.clientY, sx: spec['x' + k], sy: spec['y' + k], w: r.width, h: r.height };
        try { cv.setPointerCapture(e.pointerId); } catch (x) {}
      });
      cv.addEventListener('pointermove', function (e) {
        if (!drag) return; var f = 2 * spec['z' + drag.k];
        spec['x' + drag.k] = Math.max(-1, Math.min(1, drag.sx + (e.clientX - drag.x) / drag.w * f));
        spec['y' + drag.k] = Math.max(-1, Math.min(1, drag.sy + (e.clientY - drag.y) / drag.h * f)); draw();
      });
      ['pointerup', 'pointercancel'].forEach(function (t) { cv.addEventListener(t, function () { drag = null; }); });
    }

    host.onclick = function (e) {
      var b = e.target.closest('button'); if (!b || !host.contains(b)) return;
      if (b.dataset.l) { spec.layout = b.dataset.l; paint(); }
      if (b.dataset.sz) { spec.size = b.dataset.sz; paint(); }
      if (b.dataset.c) { spec.color = b.dataset.c; paint(); }
      if (b.dataset.ace != null) { spec['img' + b.dataset.ace] = 'ace'; paint(); }
      if (b.dataset.rm != null) { spec['img' + b.dataset.rm] = null; paint(); }
      var m = b.dataset.m;
      if (m === 'save') {
        var need = LAYOUTS[spec.layout].pics;
        if (!spec.img || (need === 2 && !spec.img2)) return err('Add ' + (need === 2 ? 'both pictures' : 'a picture') + ' first.');
        if (!(spec.a || spec.b)) return err('Type your caption first.');
        o.onSave(JSON.parse(JSON.stringify(spec)));
      }
      if (m === 'png') { try { var a = document.createElement('a'); a.download = 'my-meme.png'; a.href = host.querySelector('canvas').toDataURL('image/png'); document.body.appendChild(a); a.click(); a.remove(); } catch (x) { err('This browser could not save the picture.'); } }
      if (m === 'close' && o.onClose) o.onClose();
    };
    host.oninput = function (e) {
      var t = e.target;
      if (t.dataset.k) { spec[t.dataset.k] = t.value; draw(); }
      if (t.dataset.z != null) { spec['z' + t.dataset.z] = Number(t.value); draw(); }
    };
    host.onchange = async function (e) {
      var t = e.target; if (t.dataset.pic == null || !t.files || !t.files[0]) return;
      try { err(''); spec['img' + t.dataset.pic] = await shrink(t.files[0]); spec['z' + t.dataset.pic] = 1; spec['x' + t.dataset.pic] = 0; spec['y' + t.dataset.pic] = 0; paint(); }
      catch (x) { err(x.message); }
    };
    paint();
  }

  window.Memes = { render: render, editor: editor, LAYOUTS: LAYOUTS };
})();
/* My Notebook: note taking and note making by course and topic, infinite paper, voice notes, read-aloud.
   Notebook.mount(el, { courses:[{slug,title,level}], course, topic }) */
(function () {
  'use strict';
  if (window.Notebook) return;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var KINDS = {
    taking: { name: 'Note taking', hint: 'Cornell notes: record what you read or hear, then question and summarise it.',
      fields: [['cues', 'Cue questions and key words', 'Questions this section answers, key terms…', 5], ['notes', 'Notes', 'What the lesson, text or speaker says…', 10], ['summary', 'Summary', 'Two or three sentences in your own words…', 4]] },
    making: { name: 'Note making', hint: 'Process what you learned: rework it in your own words and connect it.',
      fields: [['idea', 'Key idea', 'The main point…', 3], ['own', 'In my own words', 'Explain it as you would to a friend…', 6], ['example', 'Example', 'A real or Caribbean example…', 4], ['links', 'Links to other topics', 'Where else does this connect?', 3], ['questions', 'Questions I still have', 'What to ask or look up…', 3]] },
    free: { name: 'Blank page', hint: 'Anything goes.', fields: [['text', 'Notes', 'Write anything…', 14]] }
  };
  var CSS = [
    '.nb{display:grid;grid-template-columns:280px minmax(0,1fr);gap:16px;color:var(--ink,#F1F4FF);font-family:var(--f-body,"Atkinson Hyperlegible",Verdana,sans-serif)}',
    '@media (max-width:860px){.nb{grid-template-columns:1fr}}',
    '.nb-side,.nb-main{background:var(--surface,#0E1B44);border:1px solid var(--line,rgba(245,197,66,.25));border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:12px;min-width:0}',
    '.nb h3{margin:0;font:800 1.08rem var(--f-display,"Bricolage Grotesque","Segoe UI",sans-serif)}',
    '.nb-lbl{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--muted,#AEB9DD)}',
    '.nb input,.nb select,.nb textarea{font:inherit;color:var(--ink,#F1F4FF);background:var(--raise,rgba(255,255,255,.06));border:1.5px solid var(--field-line,rgba(245,197,66,.5));border-radius:10px;padding:9px 11px;width:100%;box-sizing:border-box;-webkit-user-select:text;user-select:text}',
    '.nb textarea{resize:vertical;line-height:1.55}',
    '.nb input:focus,.nb select:focus,.nb textarea:focus{outline:3px solid var(--gold,#F5C542);outline-offset:1px}',
    '.nb-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1.5px solid var(--field-line,rgba(245,197,66,.5));background:transparent;color:var(--ink,#F1F4FF);border-radius:10px;padding:8px 12px;font:700 .86rem var(--f-body,system-ui,sans-serif);cursor:pointer;white-space:nowrap}',
    '.nb-btn.go{background:var(--blue,#F5C542);color:var(--on-blue,#0A1433);border-color:var(--blue,#F5C542)}',
    '.nb-btn.rec{background:#C0392B;border-color:#C0392B;color:#fff}',
    '.nb-btn:disabled{opacity:.5;cursor:not-allowed}.nb-btn:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:2px}',
    '.nb-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}',
    '.nb-list{display:flex;flex-direction:column;gap:4px;max-height:58vh;overflow:auto}',
    '.nb-topic{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--gold,#FFD766);margin:10px 4px 2px}',
    '.nb-item{all:unset;box-sizing:border-box;display:flex;flex-direction:column;gap:2px;padding:9px 10px;border-radius:10px;cursor:pointer;border:1px solid transparent}',
    '.nb-item:hover{background:var(--raise,rgba(255,255,255,.06))}.nb-item[aria-current=true]{border-color:var(--gold,#F5C542);background:color-mix(in srgb,var(--gold,#F5C542) 8%,transparent)}',
    '.nb-item b{font-size:.92rem}.nb-item span{font-size:.76rem;color:var(--muted,#AEB9DD)}',
    '.nb-item:focus-visible{outline:3px solid var(--gold,#F5C542)}',
    '.nb-kinds{display:inline-flex;padding:4px;border-radius:12px;background:var(--raise,rgba(255,255,255,.06));border:1px solid var(--line,rgba(245,197,66,.25));flex-wrap:wrap}',
    '.nb-kinds button{border:0;background:none;color:var(--muted,#AEB9DD);font:700 .85rem var(--f-body,system-ui,sans-serif);padding:8px 12px;border-radius:9px;cursor:pointer}',
    '.nb-kinds button[aria-pressed=true]{background:var(--blue,#F5C542);color:var(--on-blue,#0A1433)}',
    '.nb-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,2fr);gap:10px}',
    '.nb-grid .full{grid-column:1/-1}@media (max-width:620px){.nb-grid{grid-template-columns:1fr}}',
    '.nb-field{display:flex;flex-direction:column;gap:5px}.nb-field label{font-weight:700;font-size:.86rem}',
    '.nb-sec{border-top:1px dashed var(--line,rgba(245,197,66,.3));padding-top:12px;display:flex;flex-direction:column;gap:10px}',
    '.nb-sec > summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:8px;font:800 1rem var(--f-display,"Bricolage Grotesque",sans-serif)}',
    '.nb-sec > summary::-webkit-details-marker{display:none}.nb-sec > summary .ch{margin-left:auto;color:var(--gold,#F5C542);transition:transform .2s}.nb-sec[open] > summary .ch{transform:rotate(180deg)}',
    '.nb-voice{display:flex;flex-direction:column;gap:8px}',
    '.nb-clip{border:1px solid var(--line,rgba(245,197,66,.25));border-radius:12px;padding:10px;display:flex;flex-direction:column;gap:8px;background:var(--raise,rgba(255,255,255,.04))}',
    '.nb-clip audio{width:100%;height:36px}',
    '.nb-player{display:flex;align-items:center;gap:10px;flex-wrap:wrap}',
    '.nb-player .nb-pp{min-width:96px;font-weight:800}',
    '.nb .nb-player input[type=range]{flex:1;min-width:140px;width:auto;height:24px;padding:0;border:0;background:transparent;accent-color:var(--gold,#F5C542)}',
    '.nb-time{font-variant-numeric:tabular-nums;font-size:.85rem;color:var(--muted,#AEB9DD);min-width:88px;text-align:right}',
    '.nb-draft{border:2px solid var(--gold,#F5C542);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:10px;background:var(--raise,rgba(255,255,255,.05))}',
    '.nb-draft h4{margin:0;font:800 .98rem var(--f-display,"Bricolage Grotesque",sans-serif)}',
    '.nb-clip input.nb-name{font-weight:700;background:transparent;border:1px solid transparent;border-radius:8px;padding:3px 6px;color:inherit;font-size:.95rem;min-width:0;flex:1}',
    '.nb-clip input.nb-name:hover,.nb-clip input.nb-name:focus{border-color:var(--line,rgba(245,197,66,.4))}',
    '.nb-field .nb-lab{display:flex;align-items:center;justify-content:space-between;gap:8px}',
    '.nb-mic{border:1.5px solid var(--field-line,rgba(245,197,66,.5));background:transparent;color:var(--ink,#F1F4FF);border-radius:999px;padding:3px 10px;font:700 .78rem var(--f-body,system-ui,sans-serif);cursor:pointer;white-space:nowrap}',
    '.nb-mic[aria-pressed=true]{background:#C0392B;border-color:#C0392B;color:#fff}',
    '.nb-mic:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:2px}',
    '.nb-dict{font-size:.82rem;color:var(--muted,#AEB9DD);min-height:1.1em}',
    '.nb-rectime{font-variant-numeric:tabular-nums;font-weight:800}',
    '.nb-live{min-height:42px;padding:8px 10px;border-radius:10px;background:var(--raise,rgba(255,255,255,.06));color:var(--muted,#AEB9DD);font-size:.9rem}',
    '.nb-status{font-size:.8rem;color:var(--muted,#AEB9DD)}.nb-err{color:var(--bad,#FF7A6B);font-size:.86rem}',
    '.nb-dot{width:10px;height:10px;border-radius:50%;background:#FF5A4F;display:inline-block;animation:nbp 1s infinite}@keyframes nbp{50%{opacity:.25}}',
    '.nb-empty{color:var(--muted,#AEB9DD);font-size:.9rem;padding:10px 4px}'
  ].join('\n');
  function css() { if (document.getElementById('nb-css')) return; var s = document.createElement('style'); s.id = 'nb-css'; s.textContent = CSS; document.head.appendChild(s); }

  function mount(host, opts) {
    css(); opts = opts || {};
    var courses = opts.courses || [];
    var store, notes = [], note = null, paper = null, saveT = null, filter = opts.course || '';
    var root = document.createElement('div'); root.className = 'nb';
    root.innerHTML =
      '<aside class="nb-side">' +
        '<div class="nb-row" style="justify-content:space-between"><h3>My notes</h3><button type="button" class="nb-btn go" data-a="new">New note</button></div>' +
        '<label class="nb-lbl" for="nb-course">Course</label><select id="nb-course"><option value="">All courses</option>' + courses.map(function (c) { return '<option value="' + esc(c.slug) + '">' + esc((c.level ? c.level + ' ' : '') + c.title) + '</option>'; }).join('') + '<option value="other">Other</option></select>' +
        '<input id="nb-search" type="search" placeholder="Search notes" aria-label="Search notes">' +
        '<div class="nb-list" id="nb-list"></div><p class="nb-status" id="nb-where"></p>' +
      '</aside>' +
      '<section class="nb-main" id="nb-main"><p class="nb-empty">Choose a note on the left, or start a new one.</p></section>';
    host.appendChild(root);
    var $ = function (s) { return root.querySelector(s); };
    if (filter) $('#nb-course').value = filter;

    function courseName(slug) { var c = courses.find(function (x) { return x.slug === slug; }); return c ? (c.level ? c.level + ' ' : '') + c.title : (slug === 'other' || !slug ? 'Other' : slug); }
    function renderList() {
      var q = $('#nb-search').value.trim().toLowerCase();
      var list = notes.filter(function (n) { return (!filter || n.course_slug === filter) && (!q || (n.title + ' ' + n.topic).toLowerCase().indexOf(q) >= 0); });
      if (!list.length) { $('#nb-list').innerHTML = '<p class="nb-empty">' + (notes.length ? 'No notes match.' : 'No notes yet. Click New note to start.') + '</p>'; return; }
      var groups = {}; list.forEach(function (n) { var k = (filter ? '' : courseName(n.course_slug) + ' · ') + (n.topic || 'General'); (groups[k] = groups[k] || []).push(n); });
      $('#nb-list').innerHTML = Object.keys(groups).sort().map(function (k) {
        return '<div class="nb-topic">' + esc(k) + '</div>' + groups[k].map(function (n) {
          return '<button type="button" class="nb-item" data-id="' + esc(n.id) + '" aria-current="' + (note && note.id === n.id) + '"><b>' + esc(n.title || 'Untitled note') + '</b><span>' + esc(KINDS[n.kind] ? KINDS[n.kind].name : 'Notes') + ' · ' + new Date(n.updated_at).toLocaleDateString([], { day: 'numeric', month: 'short' }) + '</span></button>';
        }).join('');
      }).join('');
    }
    async function load() {
      try { store = await NotebookStore.open(); notes = await store.listNotes(); $('#nb-where').textContent = store.mode === 'account' ? 'Saved to your Exam Ace account.' : 'Saved on this device.'; renderList(); }
      catch (e) { $('#nb-list').innerHTML = '<p class="nb-err">' + esc(e.message) + '</p>'; }
      if (opts.topic || opts.newNote) newNote();
    }

    function newNote() {
      note = { id: null, course_slug: filter || opts.course || (courses[0] && courses[0].slug) || 'other', topic: opts.topic || '', kind: 'taking', title: '', body: {}, sketch: {} };
      openEditor();
    }
    async function openNote(id) { try { note = await store.getNote(id); openEditor(); renderList(); } catch (e) { flash(e.message, true); } }

    function openEditor() {
      if (paper) { paper.destroy(); paper = null; }
      var topics = Array.from(new Set(notes.filter(function (n) { return n.course_slug === note.course_slug; }).map(function (n) { return n.topic; }).filter(Boolean)));
      $('#nb-main').innerHTML =
        '<div class="nb-row"><input id="nb-title" placeholder="Note title" aria-label="Note title" style="flex:1;min-width:200px;font-weight:700;font-size:1.05rem" value="' + esc(note.title) + '"><span class="nb-status" id="nb-saved"></span></div>' +
        '<div class="nb-row"><div class="nb-field" style="flex:1;min-width:180px"><label for="nb-ncourse">Course</label><select id="nb-ncourse">' + courses.map(function (c) { return '<option value="' + esc(c.slug) + '">' + esc((c.level ? c.level + ' ' : '') + c.title) + '</option>'; }).join('') + '<option value="other">Other</option></select></div>' +
          '<div class="nb-field" style="flex:1;min-width:180px"><label for="nb-topic">Topic</label><input id="nb-topic" list="nb-topics" placeholder="e.g. Module 1 · Sampling methods" value="' + esc(note.topic) + '"><datalist id="nb-topics">' + topics.map(function (t) { return '<option value="' + esc(t) + '">'; }).join('') + '</datalist></div></div>' +
        '<div class="nb-row" style="justify-content:space-between"><div class="nb-kinds" role="group" aria-label="Kind of notes">' + Object.keys(KINDS).map(function (k) { return '<button type="button" data-kind="' + k + '" aria-pressed="' + (note.kind === k) + '">' + KINDS[k].name + '</button>'; }).join('') + '</div>' +
          '<div class="nb-row"><button type="button" class="nb-btn" data-a="speak">Read aloud</button><select id="nb-rep" aria-label="Repeat" style="width:auto"><option value="1">Once</option><option value="2">×2</option><option value="3">×3</option><option value="5">×5</option><option value="0">Loop</option></select><select id="nb-rate" aria-label="Speed" style="width:auto"><option value=".8">Slow</option><option value="1" selected>Normal</option><option value="1.2">Fast</option></select></div></div>' +
        '<p class="nb-status" id="nb-kindhint"></p><div class="nb-grid" id="nb-fields"></div>' +
        '<details class="nb-sec" open><summary>Paper <span class="nb-status" style="font-weight:400">write, sketch or work it out by hand</span><span class="ch" aria-hidden="true">⌄</span></summary><div id="nb-paper"></div></details>' +
        '<details class="nb-sec" open><summary>Voice notes <span class="nb-status" style="font-weight:400">record, replay on repeat, turn into text</span><span class="ch" aria-hidden="true">⌄</span></summary><div class="nb-voice" id="nb-voice"></div></details>' +
        '<div class="nb-row" style="justify-content:space-between;border-top:1px dashed var(--line,rgba(245,197,66,.3));padding-top:12px"><span class="nb-status" id="nb-msg" role="status"></span><button type="button" class="nb-btn" data-a="delete">Delete note</button></div>';
      $('#nb-ncourse').value = note.course_slug || 'other';
      renderFields();
      paper = Paper.mount($('#nb-paper'), { data: note.sketch, onChange: function (d) { note.sketch = d; queueSave(); },
        extraButtons: '<span class="sep"></span><button type="button" class="pp-b" data-ink2text="1" title="Turn your handwriting into typed text">Handwriting → text</button>' });
      $('#nb-paper').addEventListener('click', function (e) { if (e.target.closest('[data-ink2text]')) inkToText(e.target.closest('[data-ink2text]')); });
      renderVoice();
      ['nb-title', 'nb-topic'].forEach(function (id) { $('#' + id).addEventListener('input', function () { note.title = $('#nb-title').value; note.topic = $('#nb-topic').value.trim(); queueSave(); }); });
      $('#nb-ncourse').addEventListener('change', function (e) { note.course_slug = e.target.value; queueSave(); });
    }
    function renderFields() {
      var k = KINDS[note.kind] || KINDS.taking; note.body = note.body || {};
      $('#nb-kindhint').textContent = k.hint;
      $('#nb-fields').innerHTML = k.fields.map(function (f, i) {
        var cls = note.kind === 'taking' ? (f[0] === 'cues' ? '' : f[0] === 'notes' ? '' : 'full') : 'full';
        return '<div class="nb-field ' + cls + '"><div class="nb-lab"><label for="nb-f-' + f[0] + '">' + f[1] + '</label>' + (DSR ? '<button type="button" class="nb-mic" data-a="dictate" data-f="' + f[0] + '" aria-pressed="false" title="Speak and your words are typed here">🎤 Speak to type</button>' : '') + '</div><div class="nb-dict" id="nb-d-' + f[0] + '" aria-live="polite"></div><textarea id="nb-f-' + f[0] + '" data-f="' + f[0] + '" rows="' + f[3] + '" placeholder="' + esc(f[2]) + '">' + esc(note.body[f[0]] || '') + '</textarea></div>';
      }).join('');
      stopDictation();
      root.querySelectorAll('#nb-fields textarea').forEach(function (t) { t.addEventListener('input', function () { note.body[t.dataset.f] = t.value; queueSave(); }); });
      root.querySelectorAll('[data-kind]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.kind === note.kind)); });
    }

    /* ---------- speech to text: speak and the words are typed into the box ---------- */
    var DSR = window.SpeechRecognition || window.webkitSpeechRecognition, dict = null;
    function srLang() { var l = (navigator.language || 'en-US'); return /^en/i.test(l) ? l : 'en-US'; }
    function tidy(t) { t = t.replace(/\s+/g, ' ').trim(); return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
    function insertAtCursor(ta, text) {
      var a = ta.selectionStart != null ? ta.selectionStart : ta.value.length, b = ta.selectionEnd != null ? ta.selectionEnd : a;
      var before = ta.value.slice(0, a), after = ta.value.slice(b);
      var sep = before && !/[\s\n]$/.test(before) ? (/[.!?]$/.test(before.trim()) ? ' ' : ' ') : '';
      if (/[.!?]\s*$/.test(before) || !before.trim()) text = tidy(text);
      ta.value = before + sep + text + after; var pos = (before + sep + text).length; ta.setSelectionRange(pos, pos);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }
    function stopDictation() {
      if (!dict) return; var d = dict; dict = null; try { d.r.stop(); } catch (e) {}
      if (d.btn) { d.btn.setAttribute('aria-pressed', 'false'); d.btn.textContent = '🎤 Speak to type'; }
      if (d.out) d.out.textContent = '';
    }
    function startDictation(btn) {
      var f = btn.dataset.f, ta = $('#nb-f-' + f), out = $('#nb-d-' + f);
      if (dict && dict.f === f) { stopDictation(); return; } stopDictation();
      if (rec) { flash('Stop the voice recording first, then use Speak to type.', true); return; }
      var r = new DSR(); r.continuous = true; r.interimResults = true; r.lang = srLang();
      dict = { r: r, f: f, btn: btn, out: out };
      btn.setAttribute('aria-pressed', 'true'); btn.textContent = '■ Stop'; out.textContent = 'Listening… speak now.'; ta.focus();
      r.onresult = function (e) {
        var tmp = '';
        for (var i = e.resultIndex; i < e.results.length; i++) { var t = e.results[i][0].transcript; if (e.results[i].isFinal) insertAtCursor(ta, t.trim()); else tmp += t; }
        out.textContent = tmp ? '… ' + tmp : 'Listening…';
      };
      r.onerror = function (e) { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { flash('Allow the microphone for this page, then press Speak to type again.', true); stopDictation(); } else if (e.error === 'network') { flash('Speak to type needs the internet in this browser.', true); stopDictation(); } };
      r.onend = function () { if (dict && dict.r === r) { try { r.start(); } catch (x) { stopDictation(); } } };
      try { r.start(); } catch (x) { stopDictation(); }
    }

    /* turn a saved recording into text on this device: play it aloud and listen (Chrome and Edge) */
    function listenTranscribe(url, onText) {
      return new Promise(function (resolve, reject) {
        if (!DSR) return reject(new Error('Turning a recording into text on this device needs Chrome or Edge. You can type it in the box instead.'));
        var a = new Audio(url), r = new DSR(), text = '', done = false;
        r.continuous = true; r.interimResults = true; r.lang = srLang();
        function finish() { if (done) return; done = true; try { r.stop(); } catch (e) {} a.pause(); setTimeout(function () { resolve(tidy(text)); }, 400); }
        r.onresult = function (e) { var fin = '', tmp = ''; for (var i = 0; i < e.results.length; i++) { (e.results[i].isFinal ? (fin += e.results[i][0].transcript + ' ') : (tmp += e.results[i][0].transcript)); } text = fin; onText && onText(tidy(fin + tmp)); };
        r.onerror = function (e) { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { done = true; a.pause(); reject(new Error('Allow the microphone so the recording can be heard and turned into text.')); } };
        r.onend = function () { if (!done) { try { r.start(); } catch (e) {} } };
        a.onended = function () { setTimeout(finish, 1200); };
        a.onerror = function () { done = true; try { r.stop(); } catch (e) {} reject(new Error('The recording could not play.')); };
        try { r.start(); } catch (e) {}
        setTimeout(function () { a.play().catch(function () { done = true; try { r.stop(); } catch (e) {} reject(new Error('Press play once, then try Turn into text again.')); }); }, 500);
      });
    }
    async function transcribeClip(v, url, ta, btn) {
      btn.disabled = true; var lbl = btn.textContent; btn.textContent = 'Turning into text…';
      try {
        var t = '';
        if (store.mode === 'account') { try { t = await store.transcribe(v); } catch (x) { t = ''; if (!DSR) throw x; } }
        if (!t) { flash('Playing the recording to turn it into text. Turn your volume up and keep the room quiet.'); t = await listenTranscribe(url, function (p) { ta.value = p; }); }
        if (!t) throw new Error('No words were heard. Turn the volume up and try again, or type it in the box.');
        ta.value = t; ta.dispatchEvent(new Event('change')); flash('Done. Check the text over.');
      } catch (x) { flash(x.message, true); }
      btn.disabled = false; btn.textContent = lbl;
    }

    /* ---------- saving ---------- */
    function queueSave() { $('#nb-saved') && ($('#nb-saved').textContent = 'Saving…'); clearTimeout(saveT); saveT = setTimeout(save, 800); }
    async function save() {
      try {
        var saved = await store.saveNote(note); note.id = saved.id; note.updated_at = saved.updated_at;
        var i = notes.findIndex(function (n) { return n.id === note.id; }); var row = { id: note.id, course_slug: note.course_slug, topic: note.topic, kind: note.kind, title: note.title, updated_at: note.updated_at };
        if (i >= 0) notes[i] = row; else notes.unshift(row);
        renderList(); $('#nb-saved') && ($('#nb-saved').textContent = 'Saved');
      } catch (e) { $('#nb-saved') && ($('#nb-saved').textContent = ''); flash(e.message, true); }
    }
    async function ensureSaved() { if (!note.id) { clearTimeout(saveT); await save(); } return note.id; }
    function flash(t, bad) { var m = $('#nb-msg'); if (!m) return; m.textContent = t; m.className = bad ? 'nb-err' : 'nb-status'; clearTimeout(m._t); m._t = setTimeout(function () { m.textContent = ''; }, 6000); }

    /* ---------- read aloud, with repeats ---------- */
    var speaking = false;
    function speakText() {
      var k = KINDS[note.kind] || KINDS.taking;
      return [note.title].concat(k.fields.map(function (f) { var v = (note.body[f[0]] || '').trim(); return v ? f[1] + '. ' + v : ''; })).filter(Boolean).join('. \n');
    }
    function speak(btn) {
      if (!('speechSynthesis' in window)) { flash('Read-aloud isn\'t available in this browser.', true); return; }
      if (speaking) { speaking = false; speechSynthesis.cancel(); btn.textContent = 'Read aloud'; return; }
      var text = speakText(); if (!text.trim()) { flash('Write something first, then press Read aloud.', true); return; }
      var reps = Number($('#nb-rep').value), rate = Number($('#nb-rate').value), n = 0;
      speaking = true; btn.textContent = 'Stop reading';
      (function next() {
        if (!speaking) return;
        if (reps && n >= reps) { speaking = false; btn.textContent = 'Read aloud'; return; }
        n++; var u = new SpeechSynthesisUtterance(text); u.rate = rate; u.lang = 'en';
        var v = speechSynthesis.getVoices().find(function (x) { return /en[-_](GB|JM|TT|US)/i.test(x.lang); }); if (v) u.voice = v;
        u.onend = function () { setTimeout(next, 900); }; u.onerror = function () { speaking = false; btn.textContent = 'Read aloud'; };
        speechSynthesis.speak(u);
      })();
    }

    /* ---------- handwriting → text ---------- */
    async function inkToText(btn) {
      if (paper.isEmpty()) { flash('Write on the paper first.', true); return; }
      btn.disabled = true; var old = btn.textContent; btn.textContent = 'Reading…';
      try {
        var text = await store.handwriting(paper.toPng(true), paper.strokes());
        if (!text.trim()) { flash('No writing could be read. Try writing a little larger.', true); return; }
        var field = note.kind === 'taking' ? 'notes' : note.kind === 'making' ? 'own' : 'text';
        note.body[field] = (note.body[field] ? note.body[field].replace(/\s+$/, '') + '\n\n' : '') + text.trim();
        renderFields(); queueSave(); flash('Added your handwriting as text. Check it over.');
      } catch (e) { flash(e.message, true); }
      finally { btn.disabled = false; btn.textContent = old; }
    }

    /* ---------- voice notes ---------- */
    var rec = null, recStream = null, chunks = [], recog = null, liveText = '', clips = [], urls = [];
    var recPaused = false, recMs = 0, recTick = null, recLast = 0, draft = null;
    function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
    function extFor(type) { type = type || ''; return /mp4|m4a|aac/.test(type) ? 'm4a' : /mpeg|mp3/.test(type) ? 'mp3' : /wav/.test(type) ? 'wav' : /ogg/.test(type) ? 'ogg' : 'webm'; }
    function safeName(n) { return (n || 'Voice note').replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim().slice(0, 80) || 'Voice note'; }
    async function saveBlob(blob, name) {
      var SS = window.SimSave || (function () { try { return window.parent.SimSave; } catch (e) { return null; } })();
      if (SS && SS.save) { try { await SS.save(name, blob); return; } catch (e) {} }
      var u = URL.createObjectURL(blob), a = document.createElement('a'); a.href = u; a.download = name; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
    }
    async function downloadClip(v, url) {
      try {
        var blob = v.blob; if (!blob) { var r = await fetch(url); if (!r.ok) throw new Error(); blob = await r.blob(); }
        await saveBlob(blob, safeName(v.name) + '.' + extFor(blob.type || v.mime)); flash('Download started.');
      } catch (e) { flash('That recording could not be downloaded. Check your connection and try again.', true); }
    }
    /* a play / pause player wired to an <audio> element inside host */
    function player(host) {
      var a = host.querySelector('audio'), pp = host.querySelector('.nb-pp'), bar = host.querySelector('input[type=range]'), tm = host.querySelector('.nb-time'), seeking = false;
      function dur() { return isFinite(a.duration) ? a.duration : 0; }
      function paint() { pp.textContent = a.paused ? '▶ Play' : '❚❚ Pause'; pp.setAttribute('aria-label', a.paused ? 'Play' : 'Pause'); tm.textContent = fmt(a.currentTime) + ' / ' + (dur() ? fmt(dur()) : '–:––'); if (!seeking) bar.value = dur() ? Math.round(a.currentTime / dur() * 1000) : 0; }
      /* webm from MediaRecorder often reports Infinity until it is scanned once */
      a.addEventListener('loadedmetadata', function () { if (a.duration === Infinity) { a.currentTime = 1e7; a.addEventListener('timeupdate', function f() { a.removeEventListener('timeupdate', f); a.currentTime = 0; paint(); }); } paint(); });
      ['play', 'pause', 'timeupdate', 'ended', 'durationchange'].forEach(function (ev) { a.addEventListener(ev, paint); });
      pp.addEventListener('click', function () { if (a.paused) { a.play().catch(function () { flash('The recording could not play here.', true); }); } else a.pause(); });
      bar.addEventListener('input', function () { seeking = true; if (dur()) tm.textContent = fmt(bar.value / 1000 * dur()) + ' / ' + fmt(dur()); });
      bar.addEventListener('change', function () { if (dur()) a.currentTime = bar.value / 1000 * dur(); seeking = false; });
      paint(); return a;
    }
    var PLAYER = '<div class="nb-player"><button type="button" class="nb-btn nb-pp">▶ Play</button><input type="range" min="0" max="1000" value="0" aria-label="Position in the recording"><span class="nb-time">0:00 / –:––</span></div>';
    function stopAllAudio(except) { root.querySelectorAll('audio').forEach(function (x) { if (x !== except && !x.paused) x.pause(); }); }

    async function renderVoice() {
      var canRec = !!(navigator.mediaDevices && window.MediaRecorder);
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      $('#nb-voice').innerHTML =
        '<div class="nb-row" id="nb-recrow"><button type="button" class="nb-btn rec" data-a="rec"' + (canRec ? '' : ' disabled') + '>● Record</button>' +
        '<button type="button" class="nb-btn" data-a="recpause" hidden>❚❚ Pause</button>' +
        '<span class="nb-rectime" id="nb-rectime" hidden>0:00</span>' +
        '<label class="nb-btn" style="cursor:pointer">Upload audio<input type="file" accept="audio/*" data-a="upload" hidden></label>' +
        '<span class="nb-status" id="nb-recstat">' + (canRec ? (SR ? 'Your words appear as text while you speak.' : 'Recording works here; live text needs Chrome or Edge.') : 'Recording isn\'t available here. You can still upload a recording.') + '</span></div>' +
        '<div class="nb-live" id="nb-livebox" hidden></div><div id="nb-draft"></div><div id="nb-clips" class="nb-voice"></div>';
      urls.forEach(function (u) { if (u.startsWith('blob:')) URL.revokeObjectURL(u); }); urls = [];
      renderDraft();
      if (!note.id) { $('#nb-clips').innerHTML = '<p class="nb-status">Recordings are kept with this note.</p>'; return; }
      try { clips = await store.listVoice(note.id); } catch (e) { flash(e.message, true); clips = []; }
      $('#nb-clips').innerHTML = clips.length ? '' : '<p class="nb-status">No saved recordings yet.</p>';
      for (var i = 0; i < clips.length; i++) {
        var v = clips[i], url = ''; try { url = await store.voiceUrl(v); urls.push(url); } catch (e) {}
        var d = document.createElement('div'); d.className = 'nb-clip'; d.dataset.id = v.id;
        d.innerHTML = '<div class="nb-row" style="justify-content:space-between;flex-wrap:nowrap"><input class="nb-name" data-name value="' + esc(v.name || 'Voice note') + '" aria-label="Name of this recording"><span class="nb-status" style="white-space:nowrap">' + (v.source === 'uploaded' ? 'Uploaded' : 'Recorded') + ' · ' + new Date(v.created_at).toLocaleDateString([], { day: 'numeric', month: 'short' }) + '</span></div>' +
          '<audio preload="metadata" src="' + esc(url) + '"></audio>' + PLAYER +
          '<div class="nb-row"><label class="nb-status">Play <select data-rep style="width:auto;padding:4px 6px"><option value="1">once</option><option value="3">3 times</option><option value="5">5 times</option><option value="0">on loop</option></select></label>' +
          '<label class="nb-status">Speed <select data-speed style="width:auto;padding:4px 6px"><option value=".75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option></select></label>' +
          '<button type="button" class="nb-btn" data-a="play">Play with repeats</button><button type="button" class="nb-btn" data-a="dlclip">⬇ Download</button></div>' +
          '<label class="nb-status" for="tr-' + esc(v.id) + '">Text of this recording</label><textarea id="tr-' + esc(v.id) + '" data-tr rows="3" placeholder="Press Turn into text, or type it yourself.">' + esc(v.transcript || '') + '</textarea>' +
          '<div class="nb-row"><button type="button" class="nb-btn" data-a="transcribe">Turn into text</button>' +
          '<button type="button" class="nb-btn" data-a="addtr">Add text to my notes</button><button type="button" class="nb-btn" data-a="delclip">Delete</button></div>';
        $('#nb-clips').appendChild(d);
        (function (v, d, url) {
          d.querySelector('[data-tr]').addEventListener('change', function (e) { store.updateVoice(v, { transcript: e.target.value }).catch(function (x) { flash(x.message, true); }); v.transcript = e.target.value; });
          d.querySelector('[data-name]').addEventListener('change', function (e) { var n = e.target.value.trim() || 'Voice note'; e.target.value = n; v.name = n; store.updateVoice(v, { name: n }).then(function () { flash('Name saved.'); }).catch(function (x) { flash(x.message, true); }); });
          var a = player(d); a.addEventListener('play', function () { stopAllAudio(a); });
          d.querySelector('[data-speed]').addEventListener('change', function (e) { a.playbackRate = Number(e.target.value); });
          d._url = url;
        })(v, d, url);
      }
    }

    /* the recording you just made: listen back, then save, download or record again */
    function renderDraft() {
      var box = $('#nb-draft'); if (!box) return;
      if (!draft) { box.innerHTML = ''; return; }
      box.innerHTML = '<div class="nb-draft"><h4>Listen back before you save</h4>' +
        '<input class="nb-name" data-dname value="' + esc(draft.name) + '" aria-label="Name for this recording" style="border-color:var(--line,rgba(245,197,66,.4))">' +
        '<audio preload="metadata" src="' + esc(draft.url) + '"></audio>' + PLAYER +
        '<label class="nb-status" for="nb-dtext">Text of this recording</label><textarea id="nb-dtext" rows="3" placeholder="Press Turn into text, or type it yourself.">' + esc(draft.transcript || '') + '</textarea>' +
        '<div class="nb-row"><button type="button" class="nb-btn go" data-a="dsave">✓ Save to this note</button>' +
        '<button type="button" class="nb-btn" data-a="dtranscribe">Turn into text</button><button type="button" class="nb-btn" data-a="ddl">⬇ Download</button><button type="button" class="nb-btn" data-a="ddiscard">Discard</button></div></div>';
      var a = player(box); a.addEventListener('play', function () { stopAllAudio(a); });
      box.querySelector('[data-dname]').addEventListener('input', function (e) { draft.name = e.target.value; });
      box.querySelector('#nb-dtext').addEventListener('input', function (e) { draft.transcript = e.target.value; });
    }
    async function transcribeDraft(btn, ta) {
      btn.disabled = true; var lbl = btn.textContent; btn.textContent = 'Turning into text…';
      try { flash('Playing the recording to turn it into text. Turn your volume up and keep the room quiet.'); var t = await listenTranscribe(draft.url, function (p) { ta.value = p; }); if (!t) throw new Error('No words were heard. Turn the volume up and try again, or type it in the box.'); ta.value = t; draft.transcript = t; flash('Done. Check the text over, then save.'); }
      catch (x) { flash(x.message, true); }
      btn.disabled = false; btn.textContent = lbl;
    }
    function clearDraft() { if (draft && draft.url) URL.revokeObjectURL(draft.url); draft = null; renderDraft(); }
    async function saveDraft(btn) {
      if (!draft) return; btn.disabled = true; btn.textContent = 'Saving…';
      try { await ensureSaved(); await store.addVoice(note.id, draft.blob, { name: (draft.name || '').trim() || 'Voice note', source: 'recorded', transcript: (draft.transcript || '').trim() }); clearDraft(); flash('Recording saved to this note.'); renderVoice(); }
      catch (e) { flash(e.message, true); btn.disabled = false; btn.textContent = '✓ Save to this note'; }
    }

    function recUI(state) {
      var r = $('[data-a=rec]'), p = $('[data-a=recpause]'), t = $('#nb-rectime'), s = $('#nb-recstat'); if (!r) return;
      if (state === 'idle') { r.innerHTML = '● Record'; p.hidden = true; t.hidden = true; s.hidden = false; return; }
      r.innerHTML = '■ Stop'; p.hidden = false; t.hidden = false; s.hidden = true;
      p.innerHTML = state === 'paused' ? '● Resume' : '❚❚ Pause';
      t.innerHTML = (state === 'paused' ? 'Paused · ' : '<span class="nb-dot" aria-hidden="true"></span> ') + fmt(recMs / 1000);
    }
    function tick() { if (!recPaused) { var n = Date.now(); recMs += n - recLast; recLast = n; } recUI(recPaused ? 'paused' : 'rec'); }
    function startRecog() {
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition, box = $('#nb-livebox'); if (!SR) return;
      var base = liveText;
      recog = new SR(); recog.continuous = true; recog.interimResults = true; recog.lang = 'en-US';
      box.hidden = false; box.textContent = base || 'Listening…';
      recog.onresult = function (e) { var fin = '', tmp = ''; for (var i = 0; i < e.results.length; i++) { (e.results[i].isFinal ? (fin += e.results[i][0].transcript + ' ') : (tmp += e.results[i][0].transcript)); } liveText = base + fin; box.textContent = (liveText + tmp) || 'Listening…'; };
      recog.onend = function () { if (rec && rec.state === 'recording' && recog) { base = liveText; try { recog.start(); } catch (e) {} } };
      try { recog.start(); } catch (e) {}
    }
    function stopRecog() { var r = recog; recog = null; if (r) try { r.stop(); } catch (e) {} }
    async function startRec() {
      stopDictation(); if (draft) clearDraft();
      try {
        recStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        var type = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'].find(function (t) { return MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t); }) || '';
        rec = new MediaRecorder(recStream, type ? { mimeType: type } : undefined); chunks = []; liveText = '';
        rec.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); };
        rec.onstop = function () {
          var mt = (rec && rec.mimeType) || type || 'audio/webm';
          if (recStream) recStream.getTracks().forEach(function (t) { t.stop(); }); recStream = null;
          var blob = new Blob(chunks, { type: mt.split(';')[0] }); rec = null;
          if (!blob.size) { flash('Nothing was recorded. Try again.', true); return; }
          draft = { blob: blob, url: URL.createObjectURL(blob), transcript: tidy(liveText), name: 'Voice note ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
          renderDraft(); flash('Recording stopped. Listen back, then save or download it.');
        };
        rec.start(1000);
        recPaused = false; recMs = 0; recLast = Date.now(); clearInterval(recTick); recTick = setInterval(tick, 250); recUI('rec');
        startRecog();
      } catch (e) { rec = null; flash(/denied|NotAllowed/i.test(e.name + e.message) ? 'Allow the microphone for this page, then press Record again.' : 'Recording didn\'t start: ' + e.message, true); }
    }
    function pauseRec() {
      if (!rec || !rec.pause) return;
      if (rec.state === 'recording') { rec.pause(); recPaused = true; tick(); stopRecog(); var bx = $('#nb-livebox'); if (bx) bx.textContent = (liveText || '') + ' (paused)'; }
      else if (rec.state === 'paused') { rec.resume(); recPaused = false; recLast = Date.now(); startRecog(); }
      recUI(recPaused ? 'paused' : 'rec');
    }
    function stopRec() {
      clearInterval(recTick); recTick = null; stopRecog();
      if (rec && rec.state !== 'inactive') rec.stop();
      recPaused = false; recUI('idle'); var box = $('#nb-livebox'); if (box) box.hidden = true;
    }
    async function upload(file) {
      if (!file) return; if (!/^audio\//.test(file.type) && !/\.(mp3|m4a|wav|ogg|webm|aac)$/i.test(file.name)) { flash('Choose an audio file (mp3, m4a, wav, ogg or webm).', true); return; }
      if (file.size > 25 * 1024 * 1024) { flash('That recording is over 25 MB. Upload a shorter one.', true); return; }
      try { await ensureSaved(); flash('Uploading…'); await store.addVoice(note.id, file, { name: file.name.replace(/\.[^.]+$/, ''), source: 'uploaded', transcript: '' }); flash('Recording added.'); renderVoice(); }
      catch (e) { flash(e.message, true); }
    }
    function playRepeats(clipEl) {
      var a = clipEl.querySelector('audio'), reps = Number(clipEl.querySelector('[data-rep]').value), n = 1;
      a.loop = reps === 0; a.currentTime = 0; a.playbackRate = Number(clipEl.querySelector('[data-speed]').value);
      a.onended = function () { if (reps && n < reps) { n++; setTimeout(function () { a.currentTime = 0; a.play(); }, 700); } };
      a.play().catch(function () { flash('Press play on the recording to start it.', true); });
    }

    /* ---------- clicks ---------- */
    root.addEventListener('click', async function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.id) return openNote(b.dataset.id);
      if (b.dataset.kind) { note.kind = b.dataset.kind; renderFields(); queueSave(); return; }
      var a = b.dataset.a, clip = b.closest('.nb-clip'), v = clip && clips.find(function (x) { return x.id === clip.dataset.id; });
      if (a === 'new') newNote();
      if (a === 'speak') speak(b);
      if (a === 'rec') { rec ? stopRec() : startRec(); }
      if (a === 'recpause') pauseRec();
      if (a === 'dsave') saveDraft(b);
      if (a === 'ddl' && draft) { saveBlob(draft.blob, safeName(draft.name) + '.' + extFor(draft.blob.type)).then(function () { flash('Download started.'); }); }
      if (a === 'ddiscard') { if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Discard for good?'; return; } clearDraft(); flash('Recording discarded.'); }
      if (a === 'dlclip' && v) downloadClip(v, clip._url);
      if (a === 'play' && clip) playRepeats(clip);
      if (a === 'transcribe' && v) transcribeClip(v, clip._url, clip.querySelector('[data-tr]'), b);
      if (a === 'dictate') startDictation(b);
      if (a === 'dtranscribe' && draft) { var dta = $('#nb-dtext'); transcribeDraft(b, dta); }
      if (a === 'addtr' && v) { var t2 = clip.querySelector('[data-tr]').value.trim(); if (!t2) { flash('There\'s no text for this recording yet.', true); return; } var f = note.kind === 'taking' ? 'notes' : note.kind === 'making' ? 'own' : 'text'; note.body[f] = (note.body[f] ? note.body[f].replace(/\s+$/, '') + '\n\n' : '') + t2; renderFields(); queueSave(); flash('Added to your notes.'); }
      if (a === 'delclip' && v) { if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Delete for good?'; return; } try { await store.deleteVoice(v); renderVoice(); } catch (x) { flash(x.message, true); } }
      if (a === 'delete') {
        if (!note.id) { note = null; $('#nb-main').innerHTML = '<p class="nb-empty">Choose a note on the left, or start a new one.</p>'; return; }
        if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Delete this note and its recordings?'; return; }
        try { await store.deleteNote(note.id); notes = notes.filter(function (n) { return n.id !== note.id; }); note = null; if (paper) { paper.destroy(); paper = null; } $('#nb-main').innerHTML = '<p class="nb-empty">Note deleted.</p>'; renderList(); } catch (x) { flash(x.message, true); }
      }
    });
    root.addEventListener('change', function (e) { if (e.target.dataset && e.target.dataset.a === 'upload') { upload(e.target.files[0]); e.target.value = ''; } });
    $('#nb-course').addEventListener('change', function (e) { filter = e.target.value; renderList(); });
    $('#nb-search').addEventListener('input', renderList);

    load();
    return { el: root, newNote: function (o) { if (o) { if (o.course) note && (note.course_slug = o.course); opts.topic = o.topic || opts.topic; } newNote(); } };
  }
  window.Notebook = { mount: mount, KINDS: KINDS };
})();
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
/* Hourglass study timer: switch on, 30 minutes by default, trickling-sand sound,
   then a "Break time" overlay with a sandstorm. Keeps counting across pages and reloads.
   Hourglass.toggle()  Hourglass.show()  Hourglass.hide() */
(function () {
  'use strict';
  if (window.Hourglass) return;
  /* a course opened inside the course hub uses the hub's hourglass, so only one timer ever runs */
  try { if (window.parent !== window && window.parent.Hourglass) { window.Hourglass = window.parent.Hourglass; return; } } catch (e) {}
  var KEY = 'ea-hourglass', st = load(), timer = null, audio = null, root = null;
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  st.mins = st.mins || 30; st.breakMins = st.breakMins || 5; if (st.sound == null) st.sound = true;

  var CSS = [
    '.hg{position:fixed;left:max(14px,env(safe-area-inset-left,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:2147480200;font-family:var(--f-body,"Atkinson Hyperlegible",Verdana,sans-serif);color:#F1F4FF}',
    '.hg-card{width:250px;padding:2px;border-radius:20px;background:linear-gradient(160deg,#FFF3B0,#F5C542 30%,#A97A0E 60%,#FFD766);box-shadow:0 18px 40px -16px rgba(0,0,0,.8)}',
    '.hg-in{border-radius:18px;background:radial-gradient(220px 140px at 85% 0%,rgba(245,197,66,.25),transparent 70%),linear-gradient(160deg,#122a6b,#0a1638 75%);padding:12px 14px;display:flex;flex-direction:column;gap:10px}',
    '.hg-top{display:flex;align-items:center;gap:10px}.hg-top b{font:800 .95rem "Bricolage Grotesque","Segoe UI",sans-serif;flex:1}',
    '.hg-x{background:none;border:0;color:#C8D0EE;font-size:1.3rem;cursor:pointer;padding:2px 6px;border-radius:6px}',
    '.hg-main{display:flex;align-items:center;gap:12px}.hg-time{font:800 2rem/1 "Bricolage Grotesque","Segoe UI",sans-serif;font-variant-numeric:tabular-nums;color:#FFD766}',
    '.hg-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center}',
    '.hg-b{border:1.5px solid rgba(245,197,66,.55);background:transparent;color:#F1F4FF;border-radius:9px;padding:6px 10px;font:700 .8rem system-ui,sans-serif;cursor:pointer}',
    '.hg-b.go{background:#F5C542;color:#0A1433;border-color:#F5C542}.hg-b:focus-visible,.hg-x:focus-visible{outline:3px solid #FFD766;outline-offset:2px}',
    '.hg select{background:rgba(255,255,255,.08);color:#F1F4FF;border:1.5px solid rgba(245,197,66,.55);border-radius:9px;padding:5px 6px;font:700 .8rem system-ui,sans-serif}',
    '.hg-mini{display:flex;align-items:center;gap:8px;border-radius:999px;padding:6px 12px 6px 8px;background:linear-gradient(160deg,#122a6b,#0a1638);border:2px solid #F5C542;color:#FFD766;font:800 .95rem "Bricolage Grotesque",sans-serif;cursor:pointer;box-shadow:0 10px 26px -10px rgba(0,0,0,.8)}',
    '.hg-storm{position:fixed;inset:0;z-index:2147480300;display:grid;place-items:center;background:rgba(6,13,38,.55);animation:hgin .6s ease}',
    '@keyframes hgin{from{opacity:0}to{opacity:1}}',
    '.hg-storm canvas{position:absolute;inset:0;width:100%;height:100%}',
    '.hg-bk{position:relative;max-width:min(520px,calc(100vw - 32px));padding:2px;border-radius:26px;background:linear-gradient(160deg,#FFF3B0,#F5C542 30%,#A97A0E 60%,#FFD766)}',
    '.hg-bk > div{border-radius:24px;background:linear-gradient(160deg,#122a6b,#0a1638 75%);padding:28px 26px;display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center;color:#F1F4FF}',
    '.hg-bk h2{margin:0;font:800 2.4rem/1 "Bricolage Grotesque","Segoe UI",sans-serif;background:linear-gradient(180deg,#FFF3B0,#F5C542 55%,#C99A1C);-webkit-background-clip:text;background-clip:text;color:transparent}',
    '.hg-bk ul{list-style:none;margin:0;padding:0;display:grid;gap:6px;text-align:left;font-size:.95rem;color:#DCE3FF}',
    '.hg-bk li{display:flex;gap:8px}.hg-bk li::before{content:"";flex:none;width:8px;height:8px;margin-top:7px;border-radius:50%;background:#F5C542}',
    '@media (prefers-reduced-motion:reduce){.hg-storm{animation:none}}'
  ].join('\n');
  function css() { if (document.getElementById('hg-css')) return; var s = document.createElement('style'); s.id = 'hg-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* hourglass picture: sand drains from the top bulb into the bottom one */
  function glass(frac, size) {
    var f = Math.max(0, Math.min(1, frac)), top = 46 * (1 - f), bot = 46 * f;
    return '<svg width="' + size + '" height="' + (size * 1.4) + '" viewBox="0 0 60 84" aria-hidden="true">' +
      '<defs><clipPath id="hgT"><path d="M12 8h36c0 18-14 22-18 34C26 30 12 26 12 8z"/></clipPath><clipPath id="hgB"><path d="M12 76h36c0-18-14-22-18-34-4 12-18 16-18 34z"/></clipPath></defs>' +
      '<rect x="6" y="2" width="48" height="6" rx="3" fill="#F5C542"/><rect x="6" y="76" width="48" height="6" rx="3" fill="#F5C542"/>' +
      '<path d="M12 8h36c0 18-14 22-18 34 4 12 18 16 18 34H12c0-18 14-22 18-34C26 30 12 26 12 8z" fill="rgba(255,255,255,.08)" stroke="#9DB4E6" stroke-width="1.6"/>' +
      '<rect clip-path="url(#hgT)" x="10" y="' + (8 + (34 - top * .74)) + '" width="40" height="40" fill="#FFD766"/>' +
      '<rect clip-path="url(#hgB)" x="10" y="' + (76 - bot * .74) + '" width="40" height="40" fill="#F5C542"/>' +
      (f > 0 && f < 1 ? '<rect x="29.2" y="42" width="1.6" height="' + (34 - bot * .3) + '" fill="#FFD766"><animate attributeName="opacity" values="1;.5;1" dur=".6s" repeatCount="indefinite"/></rect>' : '') + '</svg>';
  }
  function fmt(ms) { var s = Math.max(0, Math.ceil(ms / 1000)), m = Math.floor(s / 60); return m + ':' + String(s % 60).padStart(2, '0'); }

  /* ---------- sound: trickling sand, and a whoosh for the sandstorm ---------- */
  function sandSound(on) {
    try {
      if (!on) { if (audio) { audio.g.gain.setTargetAtTime(0, audio.ctx.currentTime, .3); } return; }
      if (!audio) {
        var ctx = new (window.AudioContext || window.webkitAudioContext)(), len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0), last = 0;
        for (var i = 0; i < len; i++) { var w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = (Math.random() < .015 ? w * .9 : 0) + last * 3; } /* soft grains over a low hiss */
        var src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
        var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 3200; bp.Q.value = .7;
        var g = ctx.createGain(); g.gain.value = 0; src.connect(bp); bp.connect(g); g.connect(ctx.destination); src.start();
        audio = { ctx: ctx, g: g, bp: bp };
      }
      audio.ctx.resume(); audio.g.gain.setTargetAtTime(.05, audio.ctx.currentTime, .4);
    } catch (e) {}
  }
  function whoosh() {
    try {
      if (!st.sound) return; sandSound(true);
      var t = audio.ctx.currentTime; audio.bp.frequency.setValueAtTime(900, t); audio.bp.frequency.linearRampToValueAtTime(2600, t + 2.5);
      audio.g.gain.setValueAtTime(.02, t); audio.g.gain.linearRampToValueAtTime(.22, t + 1.2); audio.g.gain.linearRampToValueAtTime(0, t + 4);
      setTimeout(function () { audio && audio.bp.frequency.setValueAtTime(3200, audio.ctx.currentTime); }, 4200);
    } catch (e) {}
  }

  /* ---------- the widget ---------- */
  function paint() {
    css(); if (!root) { root = document.createElement('div'); root.className = 'hg'; document.body.appendChild(root); }
    if (!st.visible) { root.innerHTML = ''; return; }
    var running = !!st.end, left = running ? st.end - Date.now() : (st.paused != null ? st.paused : st.mins * 60000), total = st.mins * 60000, frac = 1 - left / total;
    if (st.mini) { root.innerHTML = '<button type="button" class="hg-mini" data-h="expand" aria-label="Study timer, ' + fmt(left) + ' left. Open">' + glass(frac, 18) + '<span>' + fmt(left) + '</span></button>'; return; }
    root.innerHTML = '<div class="hg-card"><div class="hg-in" role="region" aria-label="Study timer">' +
      '<div class="hg-top"><b>Study hourglass</b><button type="button" class="hg-x" data-h="mini" aria-label="Shrink">–</button><button type="button" class="hg-x" data-h="off" aria-label="Turn the timer off">×</button></div>' +
      '<div class="hg-main">' + glass(frac, 44) + '<div><div class="hg-time" role="timer" aria-live="off">' + fmt(left) + '</div><div style="font-size:.8rem;color:#AEB9DD">' + (running ? 'Focus time' : st.paused != null ? 'Paused' : 'Ready') + '</div></div></div>' +
      '<div class="hg-row">' + (running ? '<button type="button" class="hg-b" data-h="pause">Pause</button>' : '<button type="button" class="hg-b go" data-h="start">' + (st.paused != null ? 'Resume' : 'Start') + '</button>') +
      '<button type="button" class="hg-b" data-h="reset">Reset</button><button type="button" class="hg-b" data-h="sound" aria-pressed="' + st.sound + '">' + (st.sound ? 'Sand sound on' : 'Sand sound off') + '</button></div>' +
      '<div class="hg-row"><label style="font-size:.78rem;color:#AEB9DD">Focus <select data-h="mins">' + [15, 20, 25, 30, 45, 60].map(function (m) { return '<option value="' + m + '"' + (m === st.mins ? ' selected' : '') + '>' + m + ' min</option>'; }).join('') + '</select></label>' +
      '<label style="font-size:.78rem;color:#AEB9DD">Break <select data-h="breakMins">' + [5, 10, 15].map(function (m) { return '<option value="' + m + '"' + (m === st.breakMins ? ' selected' : '') + '>' + m + ' min</option>'; }).join('') + '</select></label></div>' +
      '</div></div>';
  }
  function tick() {
    clearInterval(timer);
    if (!st.end) { paint(); return; }
    timer = setInterval(function () {
      if (Date.now() >= st.end) { clearInterval(timer); st.end = null; st.paused = null; save(); sandSound(false); paint(); storm(); return; }
      if (root && !st.mini) { var t = root.querySelector('.hg-time'); if (t) t.textContent = fmt(st.end - Date.now()); var g = root.querySelector('.hg-main svg'); if (g) g.outerHTML = glass(1 - (st.end - Date.now()) / (st.mins * 60000), 44); }
      else paint();
    }, 1000);
    paint();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-h]'); if (!b || !root || !root.contains(b)) return; var h = b.dataset.h;
    if (h === 'start') { var left = st.paused != null ? st.paused : st.mins * 60000; st.end = Date.now() + left; st.paused = null; save(); if (st.sound) sandSound(true); tick(); }
    if (h === 'pause') { st.paused = st.end - Date.now(); st.end = null; save(); sandSound(false); tick(); }
    if (h === 'reset') { st.end = null; st.paused = null; save(); sandSound(false); tick(); }
    if (h === 'sound') { st.sound = !st.sound; save(); sandSound(st.sound && !!st.end); paint(); }
    if (h === 'mini') { st.mini = true; save(); paint(); }
    if (h === 'expand') { st.mini = false; save(); paint(); }
    if (h === 'off') { st.visible = false; st.end = null; st.paused = null; save(); sandSound(false); clearInterval(timer); paint(); }
  });
  document.addEventListener('change', function (e) {
    var s = e.target.closest('[data-h]'); if (!s || !root || !root.contains(s)) return;
    st[s.dataset.h] = Number(s.value); if (s.dataset.h === 'mins' && !st.end) st.paused = null; save(); paint();
  });

  /* ---------- break time: the sandstorm ---------- */
  function storm() {
    css(); whoosh();
    var ov = document.createElement('div'); ov.className = 'hg-storm'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Break time');
    var breakEnd = Date.now() + st.breakMins * 60000;
    ov.innerHTML = '<canvas aria-hidden="true"></canvas><div class="hg-bk"><div>' + glass(1, 54) + '<h2>Break time!</h2>' +
      '<p style="margin:0;color:#DCE3FF">You focused for ' + st.mins + ' minutes. Let the sand settle.</p>' +
      '<ul><li>Stand up and stretch for a minute</li><li>Drink some water</li><li>Look at something far away for 20 seconds</li><li>Say one thing you just learned out loud</li></ul>' +
      '<div class="hg-time" style="font:800 2.2rem/1 Bricolage Grotesque,sans-serif;color:#FFD766" data-bk>' + fmt(st.breakMins * 60000) + '</div>' +
      '<div class="hg-row" style="justify-content:center"><button type="button" class="hg-b go" data-s="next">Start next focus session</button><button type="button" class="hg-b" data-s="close">Close</button></div></div></div>';
    document.body.appendChild(ov);
    var cv = ov.querySelector('canvas'), g = cv.getContext('2d'), parts = [], W, H, raf, still = matchMedia('(prefers-reduced-motion: reduce)').matches, t0 = performance.now();
    function size() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
    size(); addEventListener('resize', size);
    for (var i = 0; i < (still ? 0 : 900); i++) parts.push({ x: Math.random() * -W, y: Math.random() * H, v: 4 + Math.random() * 9, r: Math.random() * 2.2 + .4, w: Math.random() * 6.28, c: Math.random() < .5 ? '255,215,102' : (Math.random() < .5 ? '245,197,66' : '214,170,90') });
    (function frame(now) {
      var age = (now - t0) / 1000, dens = age < 3 ? 1 : Math.max(.12, 1 - (age - 3) / 4);
      g.clearRect(0, 0, W, H);
      parts.forEach(function (p) { p.x += p.v; p.y += Math.sin(p.w += .05) * 1.2 + .4; if (p.x > W + 10) { p.x = -10 - Math.random() * 200; p.y = Math.random() * H; } g.fillStyle = 'rgba(' + p.c + ',' + (.75 * dens) + ')'; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.fill(); });
      raf = requestAnimationFrame(frame);
    })(t0);
    var bt = setInterval(function () { var el = ov.querySelector('[data-bk]'); if (!el) return clearInterval(bt); var left = breakEnd - Date.now(); el.textContent = left > 0 ? fmt(left) : 'Ready when you are'; }, 1000);
    function close(next) { cancelAnimationFrame(raf); clearInterval(bt); removeEventListener('resize', size); ov.remove(); if (next) { st.end = Date.now() + st.mins * 60000; st.paused = null; save(); if (st.sound) sandSound(true); tick(); } }
    ov.addEventListener('click', function (e) { var b = e.target.closest('[data-s]'); if (b) close(b.dataset.s === 'next'); });
    ov.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(false); });
    setTimeout(function () { var b = ov.querySelector('[data-s="next"]'); b && b.focus(); }, 50);
  }

  window.Hourglass = {
    show: function () { st.visible = true; st.mini = false; save(); tick(); },
    hide: function () { st.visible = false; save(); paint(); },
    toggle: function () { st.visible ? this.hide() : this.show(); return st.visible; },
    isOn: function () { return !!st.visible; },
    storm: storm
  };
  /* pick up a running timer when a page loads */
  if (st.visible) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tick); else tick(); }
})();
/* Study tools: My Notebook, Memory Palace, Thanks for the Memeries and the Study Hourglass in one panel.
   StudyTools.open(tab, {course, topic, newNote})   tab = notebook | palace | memes
   StudyTools.menu()   adds the "Study tools" tab to a course's side menu (#side)
   Courses: <script src="tools/studytools.js" data-course="comm-studies"></script> */
(function () {
  'use strict';
  if (window.StudyTools) return;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var me = document.currentScript, COURSE = (me && me.dataset.course) || '';
  var ICON = {
    notebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M5 17a2 2 0 0 1 2-2h12M9 7h6M9 11h4"/></svg>',
    palace: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 10 12 4l9 6M5 10v9h14v-9M9 19v-5h6v5"/></svg>',
    memes: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2.5 4 2.5 4-2.5 4-2.5M9 9.5h.01M15 9.5h.01"/></svg>',
    glass: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 3h12M6 21h12M7 3c0 6 10 6 10 9s-10 3-10 9M17 3c0 6-10 6-10 9s10 3 10 9"/></svg>'
  };
  var TABS = { notebook: 'My notebook', palace: 'Memory palace', memes: 'Thanks for the Memeries' };

  var CSS = [
    '.st-ov{position:fixed;inset:0;z-index:2147480000;background:rgba(3,8,26,.72);display:flex;align-items:stretch;justify-content:center;padding:max(10px,env(safe-area-inset-top,0px)) 10px 10px}',
    '.st-ov[hidden]{display:none}',
    '.st-box{width:min(1180px,100%);display:flex;flex-direction:column;border-radius:20px;overflow:hidden;background:var(--bg,#060D26);color:var(--ink,#F1F4FF);border:2px solid rgba(245,197,66,.6);box-shadow:0 30px 80px -20px rgba(0,0,0,.8);font-family:var(--f-body,"Atkinson Hyperlegible",Verdana,sans-serif)}',
    '.st-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 14px;background:radial-gradient(260px 120px at 90% 0%,rgba(245,197,66,.22),transparent 70%),linear-gradient(160deg,#122a6b,#0a1638 75%);border-bottom:3px solid #F5C542;color:#F1F4FF}',
    '.st-head h2{margin:0;font:800 1.15rem "Bricolage Grotesque","Segoe UI",sans-serif;color:#FFD766;margin-right:6px}',
    '.st-tabs{display:flex;gap:4px;flex-wrap:wrap;flex:1}',
    '.st-tab,.st-hg,.st-x{display:inline-flex;align-items:center;gap:7px;border:1.5px solid rgba(245,197,66,.45);background:transparent;color:#F1F4FF;border-radius:999px;padding:7px 13px;font:700 .86rem system-ui,sans-serif;cursor:pointer}',
    '.st-tab[aria-selected=true]{background:#F5C542;color:#0A1433;border-color:#F5C542}',
    '.st-hg[aria-pressed=true]{background:rgba(245,197,66,.18);border-color:#F5C542;color:#FFD766}',
    '.st-x{padding:6px 11px;font-size:1.1rem}',
    '.st-tab:focus-visible,.st-hg:focus-visible,.st-x:focus-visible{outline:3px solid #FFD766;outline-offset:2px}',
    '.st-ctx{width:100%;font-size:.78rem;color:#AEB9DD}.st-ctx b{color:#DCE3FF}',
    '.st-body{flex:1;overflow:auto;padding:14px}',
    '.st-body input,.st-body textarea{-webkit-user-select:text;user-select:text}',
    '.st-body [hidden]{display:none!important}',
    /* drop-down menus: navy, in every study tool */
    '.st-ov select,.st-ov option,.st-ov optgroup,.mp select,.mp option,.nb select,.nb option,.hg select,.hg option,select.pp-sel,.pp-sel option{background-color:#0B1A46!important;color:#F1F4FF!important;color-scheme:dark}',
    /* course menu tab */
    '.st-menu{margin:14px 12px 0;border:2px solid rgba(245,197,66,.6);border-radius:16px;overflow:hidden;background:var(--surface,#0A1638);color:var(--ink,#F1F4FF)}',
    '.st-menu > summary{display:flex;gap:10px;align-items:center;padding:12px 16px;cursor:pointer;list-style:none;font:700 .95rem var(--f-body,"Atkinson Hyperlegible",Verdana,sans-serif)}',
    '.st-menu > summary::-webkit-details-marker{display:none}.st-menu > summary .t{flex:1}',
    '.st-menu > summary:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:-3px}',
    '.st-menu > summary .ch{color:var(--gold,#F5C542);transition:transform .2s}.st-menu[open] > summary .ch{transform:rotate(180deg)}',
    '.st-menu[open] > summary{border-bottom:1px solid var(--line,rgba(245,197,66,.25))}',
    '.st-menu .l{display:flex;flex-direction:column;padding:8px}',
    '.st-menu .l button{display:flex;align-items:center;gap:10px;text-align:left;border:0;background:none;color:inherit;padding:9px 10px;border-radius:10px;font:600 .9rem var(--f-body,system-ui,sans-serif);cursor:pointer}',
    '.st-menu .l button:hover{background:color-mix(in srgb,var(--gold,#F5C542) 10%,transparent)}',
    '.st-menu .l button:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:-2px}',
    '.st-menu .l button svg{color:var(--gold,#F5C542);flex:none}',
    '.st-menu .l .sw{margin-left:auto;width:34px;height:20px;border-radius:999px;background:rgba(255,255,255,.18);position:relative;flex:none}',
    '.st-menu .l .sw::after{content:"";position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#fff;transition:left .2s}',
    '.st-menu .l [aria-pressed=true] .sw{background:#F5C542}.st-menu .l [aria-pressed=true] .sw::after{left:17px;background:#0A1433}',
    '.st-tab{white-space:nowrap}',
    '@media (max-width:640px){.st-ov{padding:0}.st-box{border-radius:0;border-width:0}.st-head h2{flex:1}.st-tabs{order:5;flex:0 0 100%;flex-wrap:nowrap;overflow-x:auto;padding-bottom:2px}.st-ctx{order:6}.st-hg{padding:6px 10px}}'
  ].join('\n');
  function css() { if (document.getElementById('st-css')) return; var s = document.createElement('style'); s.id = 'st-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ---------- where am I? ---------- */
  function courses() {
    var C = window.SITE_CONFIG; if (!C) try { C = window.parent.SITE_CONFIG; } catch (e) {}
    if (C && C.courses) return C.courses.map(function (c) { return { slug: c.slug, title: c.title, level: c.level }; });
    var t = document.title || 'This course';
    return [{ slug: COURSE || 'this-course', title: t, level: '' }];
  }
  function headingIn(doc) {
    try {
      var h = doc.querySelector('#stage h1, #stage h2, main h1, main h2');
      return h ? h.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) : '';
    } catch (e) { return ''; }
  }
  /* on the course hub, read the lesson open in the course frame (same site) */
  function guess() {
    var ctx = { course: COURSE, topic: '' };
    var fr = document.getElementById('frame');
    if (fr && !fr.hidden) { try { ctx.topic = headingIn(fr.contentDocument); } catch (e) {} }
    else if (COURSE) ctx.topic = headingIn(document);
    if (!ctx.course) { var cur = document.querySelector('.tab[aria-current="page"]'); if (cur) ctx.course = cur.dataset.slug || ''; }
    return ctx;
  }

  /* ---------- the panel ---------- */
  var ov = null, mounted = {}, nb = null, lastFocus = null;
  function open(tab, ctx) {
    css(); ctx = Object.assign(guess(), ctx || {}); tab = TABS[tab] ? tab : 'notebook';
    lastFocus = document.activeElement;
    if (!ov) build(ctx);
    ov.hidden = false; document.documentElement.style.overflow = 'hidden';
    var c = ov.querySelector('.st-ctx'), list = courses(), cn = list.find(function (x) { return x.slug === ctx.course; });
    c.innerHTML = (cn || ctx.topic) ? 'Linked to <b>' + esc(cn ? ((cn.level ? cn.level + ' ' : '') + cn.title) : '') + '</b>' + (ctx.topic ? ' · <b>' + esc(ctx.topic) + '</b>' : '') : '';
    show(tab, ctx);
    setTimeout(function () { var b = ov.querySelector('.st-tab[aria-selected=true]'); b && b.focus(); }, 30);
  }
  function build(ctx) {
    ov = document.createElement('div'); ov.className = 'st-ov'; ov.hidden = true;
    ov.innerHTML = '<div class="st-box" role="dialog" aria-modal="true" aria-label="Study tools">' +
      '<div class="st-head"><h2>Study tools</h2><div class="st-tabs" role="tablist">' +
      Object.keys(TABS).map(function (k) { return '<button type="button" class="st-tab" role="tab" id="st-t-' + k + '" aria-controls="st-p-' + k + '" data-tab="' + k + '" aria-selected="false">' + ICON[k] + esc(TABS[k]) + '</button>'; }).join('') +
      '</div><button type="button" class="st-hg" data-hg aria-pressed="false">' + ICON.glass + 'Hourglass</button><button type="button" class="st-x" data-close aria-label="Close study tools">×</button>' +
      '<div class="st-ctx"></div></div>' +
      '<div class="st-body">' + Object.keys(TABS).map(function (k) { return '<div role="tabpanel" id="st-p-' + k + '" aria-labelledby="st-t-' + k + '" hidden></div>'; }).join('') + '</div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) {
      var t = e.target.closest('[data-tab]'); if (t) show(t.dataset.tab);
      if (e.target.closest('[data-close]') || e.target === ov) close();
      if (e.target.closest('[data-hg]')) { window.Hourglass && Hourglass.toggle(); syncHg(); }
    });
    ov.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !e.defaultPrevented) { close(); }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && e.target.classList.contains('st-tab')) {
        var all = [].slice.call(ov.querySelectorAll('.st-tab')), i = all.indexOf(e.target) + (e.key === 'ArrowRight' ? 1 : -1);
        var n = all[(i + all.length) % all.length]; show(n.dataset.tab); n.focus();
      }
    });
  }
  function syncHg() { if (!ov) return; var on = !!(window.Hourglass && Hourglass.isOn()); ov.querySelector('[data-hg]').setAttribute('aria-pressed', String(on)); syncMenu(); }
  function show(tab, ctx) {
    ctx = ctx || guess();
    Object.keys(TABS).forEach(function (k) {
      ov.querySelector('#st-t-' + k).setAttribute('aria-selected', String(k === tab));
      ov.querySelector('#st-p-' + k).hidden = k !== tab;
    });
    var p = ov.querySelector('#st-p-' + tab), list = courses();
    if (!mounted[tab]) {
      mounted[tab] = true;
      if (tab === 'notebook') nb = Notebook.mount(p, { courses: list, course: ctx.course, topic: ctx.newNote ? ctx.topic : '', newNote: !!ctx.newNote });
      if (tab === 'palace') Palace.mount(p, { courses: list, course: ctx.course });
      if (tab === 'memes') {
        Palace.css(); p.innerHTML = '<div class="mp"><div class="mp-card"><p class="mp-hint" style="margin:0">Make your own meme about something you need to remember: upload a picture, choose a layout, type your caption. Funny sticks. Save it to your phone, or build it into a memory palace.</p></div><div class="mp-card" id="st-mm"></div></div>';
        Memes.editor(p.querySelector('#st-mm'), {});
      }
    } else if (tab === 'notebook' && ctx.newNote && nb) nb.newNote({ course: ctx.course, topic: ctx.topic });
    syncHg();
  }
  function close() {
    if (!ov) return; ov.hidden = true; document.documentElement.style.overflow = '';
    try { speechSynthesis.cancel(); } catch (e) {}
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- the "Study tools" tab in a course menu ---------- */
  function menuEl() {
    var d = document.createElement('details'); d.className = 'st-menu'; d.id = 'st-menu';
    d.innerHTML = '<summary><span class="t">Study tools</span><span class="ch" aria-hidden="true">&#8964;</span></summary><div class="l">' +
      '<button type="button" data-st="note">' + ICON.notebook + 'New note for this lesson</button>' +
      '<button type="button" data-st="notebook">' + ICON.notebook + 'My notebook</button>' +
      '<button type="button" data-st="palace">' + ICON.palace + 'Memory palace</button>' +
      '<button type="button" data-st="memes">' + ICON.memes + 'Thanks for the Memeries</button>' +
      '<button type="button" data-st="hg" aria-pressed="false">' + ICON.glass + 'Study hourglass<span class="sw" aria-hidden="true"></span></button></div>';
    d.addEventListener('click', function (e) {
      var b = e.target.closest('[data-st]'); if (!b) return; var a = b.dataset.st;
      if (a === 'hg') { Hourglass.toggle(); syncMenu(); return; }
      if (a === 'note') open('notebook', { newNote: true }); else open(a);
    });
    return d;
  }
  function syncMenu() { var b = document.querySelector('#st-menu [data-st="hg"]'); if (b) b.setAttribute('aria-pressed', String(!!(window.Hourglass && Hourglass.isOn()))); }
  function place() {
    var side = document.getElementById('side'); if (!side) return null;
    var el = document.getElementById('st-menu') || menuEl(), about = document.getElementById('ea-about');
    if (about && about.parentNode === side) { if (el.nextElementSibling !== about) side.insertBefore(el, about); }
    else if (side.lastElementChild !== el) side.appendChild(el);
    syncMenu(); return side;
  }
  function menu() {
    css();
    var side = place();
    if (side) { new MutationObserver(function () { place(); }).observe(side, { childList: true }); return; }
    var wait = new MutationObserver(function () { var s = place(); if (s) { wait.disconnect(); new MutationObserver(function () { place(); }).observe(s, { childList: true }); } });
    wait.observe(document.body, { childList: true, subtree: true });
  }

  window.StudyTools = { open: open, close: close, menu: menu };
  /* inside a course: add the menu tab automatically */
  if (COURSE) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', menu); else menu(); }
  /* any element with data-study="notebook|palace|memes|hourglass" opens that tool */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-study]'); if (!b) return; e.preventDefault();
    if (b.dataset.study === 'hourglass') { Hourglass.toggle(); syncHg(); return; }
    open(b.dataset.study);
  });
})();
