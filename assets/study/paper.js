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
