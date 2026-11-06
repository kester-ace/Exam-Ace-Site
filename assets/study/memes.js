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
