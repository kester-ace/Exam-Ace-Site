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
