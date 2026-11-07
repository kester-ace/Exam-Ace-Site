/* Chill Zone: a virtual rec room for calming down between study sessions.
   Plugin view id: recroom. Self-contained: no network, sounds via WebAudio, visuals via canvas/SVG/CSS. */
(function () {
  const CSS = `
.rr-wrap{display:flex;flex-direction:column;gap:16px;min-width:0}
.rr-hero{background:radial-gradient(420px 220px at 90% 0%,rgba(255,215,102,.30),transparent 70%),radial-gradient(380px 260px at 0% 100%,rgba(127,209,255,.16),transparent 70%),linear-gradient(160deg,#132d70,#0a1638 72%)}
.rr-hero h1{margin:0}
.rr-day{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;background:rgba(255,215,102,.14);border:1px solid rgba(255,215,102,.45);color:#FFE9A8;border-radius:99px;padding:5px 12px;font-size:.88rem;font-weight:700}
.rr-day.done{background:rgba(79,209,139,.16);border-color:rgba(79,209,139,.55);color:#BFF5D6}
.rr-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
.rr-tiles .tile{padding:14px;gap:4px;min-height:118px;transform:translateZ(0)}
.rr-tiles .tile:hover{transform:translateY(-3px)}
.rr-tiles .tile .ticon{font-size:1.9rem;line-height:1;width:52px;height:52px;display:grid;place-items:center;border-radius:16px;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.35),rgba(255,215,102,.16) 45%,rgba(10,20,51,.35));box-shadow:0 3px 0 rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.25)}
.rr-tiles .tile h3{margin:6px 0 0;font-size:1rem}
.rr-tiles .tile .meta{font-size:.84rem}
.rr-top{display:flex;flex-wrap:wrap;align-items:center;gap:10px;justify-content:space-between}
.rr-top h2{margin:0;font-size:clamp(1.2rem,4.4vw,1.6rem)}
.rr-top .rr-tl{display:flex;flex-wrap:wrap;align-items:center;gap:10px;min-width:0}
.rr-stage{position:relative;border-radius:20px;padding:8px;background:radial-gradient(120% 90% at 50% 0%,#18357f,#0a1638 70%);border:1px solid rgba(255,215,102,.35);box-shadow:inset 0 2px 18px rgba(0,0,0,.55),0 10px 26px -14px rgba(0,0,0,.8),0 3px 0 rgba(0,0,0,.35);max-width:680px;width:100%;margin:0 auto;box-sizing:border-box}
.rr-cv{display:block;width:100%;height:auto;border-radius:14px;touch-action:none;-webkit-user-select:none;user-select:none;cursor:pointer}
.rr-cv:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.rr-stats{align-items:center}
.rr-stat{display:inline-flex;align-items:center;gap:6px;background:var(--raise);border:1px solid var(--line);border-radius:12px;padding:7px 12px;font-weight:700}
.rr-stat b{color:var(--gold);font-variant-numeric:tabular-nums;min-width:2ch}
.rr-sw{width:38px;height:38px;border-radius:50%;border:3px solid rgba(255,255,255,.25);box-shadow:0 3px 0 rgba(0,0,0,.35),inset 0 -4px 6px rgba(0,0,0,.18),inset 0 3px 5px rgba(255,255,255,.35);padding:0;flex:0 0 auto}
.rr-sw.sel{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 0 0 3px rgba(255,215,102,.35),0 4px 0 rgba(0,0,0,.35)}
.rr-sw.erase{background:repeating-linear-gradient(45deg,#fff 0 6px,#d9dce6 6px 12px)}
.rr-pal{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
/* bubble wrap */
.rr-bw{display:grid;grid-template-columns:repeat(8,1fr);gap:clamp(4px,1.4vw,9px);padding:clamp(10px,2.5vw,16px);border-radius:16px;background:linear-gradient(135deg,rgba(220,235,255,.18),rgba(160,190,240,.08));box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}
.rr-bb{aspect-ratio:1;width:100%;min-width:0;border-radius:50%;border:1px solid rgba(255,255,255,.45);padding:0;cursor:pointer;background:radial-gradient(circle at 34% 28%,#fff 0 9%,rgba(225,238,255,.75) 18%,rgba(150,185,240,.45) 55%,rgba(70,105,190,.6) 100%);box-shadow:inset -3px -5px 8px rgba(20,40,110,.35),inset 2px 3px 5px rgba(255,255,255,.55),0 3px 5px rgba(0,0,0,.35);transition:transform .08s}
.rr-bb:hover{transform:scale(1.05)}
.rr-bb:active{transform:scale(.9)}
.rr-bb.rr-popd{background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.10),rgba(255,255,255,.03) 70%);border-color:rgba(255,255,255,.18);box-shadow:inset 0 2px 4px rgba(0,0,0,.35),inset 0 -1px 0 rgba(255,255,255,.08);transform:scale(.86);cursor:default}
.rr-bb.rr-boom{animation:rr-burst .28s ease-out}
@keyframes rr-burst{0%{transform:scale(1.15)}60%{transform:scale(.78)}100%{transform:scale(.86)}}
/* breathing */
.rr-bst{height:clamp(250px,62vw,320px);display:grid;place-items:center;overflow:hidden}
.rr-bub{width:clamp(190px,52vw,250px);aspect-ratio:1;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-align:center;color:#0A1433;font-weight:800;background:radial-gradient(circle at 35% 30%,#fff 0 6%,#cfeeff 22%,#7fc8f2 62%,#3f86c9 100%);box-shadow:0 0 0 10px rgba(127,209,255,.12),0 0 60px rgba(127,209,255,.45),inset -10px -14px 26px rgba(10,40,110,.35);transform:scale(.6);transition:transform 1s ease-in-out,background-color .6s}
.rr-bub span{font-size:1.15rem}
.rr-bub b{font-size:2rem;font-variant-numeric:tabular-nums;min-height:1.2em}
.rr-bub[data-ph="hold"]{box-shadow:0 0 0 10px rgba(255,215,102,.22),0 0 60px rgba(255,215,102,.5),inset -10px -14px 26px rgba(10,40,110,.35)}
.rr-bub.rm{transform:none!important;transition:none!important}
.rr-bub.rm[data-ph="out"]{opacity:.78}
/* mandala */
.rr-man{display:block;width:100%;max-width:520px;height:auto;margin:0 auto;border-radius:50%;filter:drop-shadow(0 8px 16px rgba(0,0,0,.45))}
.rr-man path{stroke:#0A1433;stroke-width:1.6;stroke-linejoin:round;cursor:pointer;transition:fill .2s}
.rr-man path:hover{stroke-width:2.6}
.rr-man path:focus{outline:none;stroke:#C99A1C;stroke-width:3.4}
/* jar */
.rr-jarwrap{position:relative;display:grid;place-items:center;padding:6px 0;overflow:hidden}
.rr-jar{width:min(230px,62vw);height:auto;display:block;filter:drop-shadow(0 10px 14px rgba(0,0,0,.45))}
.rr-jar .lid{transition:transform .5s cubic-bezier(.3,1.6,.5,1)}
.rr-jarwrap.open .lid{transform:translate(-6px,-26px) rotate(-8deg)}
.rr-note{position:absolute;left:50%;top:0;max-width:180px;background:#FFF6CC;color:#3a2c00;border-radius:6px;padding:8px 10px;font-size:.82rem;font-weight:700;box-shadow:0 6px 12px rgba(0,0,0,.35);transform:translateX(-50%);pointer-events:none;overflow:hidden;max-height:70px}
.rr-note.go{animation:rr-drop 1.1s ease-in forwards}
@keyframes rr-drop{0%{transform:translate(-50%,-10px) rotate(-4deg) scale(1);opacity:1}55%{transform:translate(-50%,60px) rotate(8deg) scale(.6);opacity:1}100%{transform:translate(-50%,150px) rotate(16deg) scale(.15);opacity:0}}
.rr-in{width:100%;box-sizing:border-box;border-radius:12px;border:2px solid var(--line);background:var(--raise);color:var(--ink);padding:10px 12px;font:inherit;resize:vertical}
.rr-glist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.rr-glist li{display:flex;gap:10px;align-items:flex-start;justify-content:space-between;background:var(--soft-gold);border:1px solid var(--line);border-radius:12px;padding:8px 10px;overflow-wrap:anywhere}
.rr-glist li button{flex:0 0 auto}
/* timer */
.rr-tim{display:grid;place-items:center;position:relative}
.rr-tim svg{width:min(240px,64vw);height:auto;display:block}
.rr-tim .num{position:absolute;inset:0;display:grid;place-items:center;font-size:clamp(2.2rem,10vw,3rem);font-weight:800;font-variant-numeric:tabular-nums;color:#FFE38A;text-shadow:0 2px 0 rgba(0,0,0,.4)}
.rr-ring{transition:stroke-dashoffset .3s linear}
.rr-done{text-align:center;display:flex;flex-direction:column;gap:12px;align-items:center}
/* pick-me-up */
.rr-lift{font-size:clamp(1.1rem,4.4vw,1.45rem);line-height:1.45;font-weight:700;text-align:center;padding:clamp(18px,5vw,34px);border-radius:18px;background:radial-gradient(circle at 20% 0%,rgba(255,215,102,.25),transparent 60%),linear-gradient(160deg,#16337a,#0b1a46);color:#F6F2DC;border:1px solid rgba(255,215,102,.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 10px 22px -12px rgba(0,0,0,.8);min-height:120px;display:grid;place-items:center}
.rr-lift small{display:block;margin-top:10px;font-size:.95rem;color:#FFE38A}
@media (prefers-reduced-motion: reduce){.rr-bb,.rr-bb.rr-boom,.rr-note.go,.rr-jar .lid,.rr-ring,.rr-tiles .tile{animation:none!important;transition:none!important}.rr-tiles .tile:hover{transform:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ---------- shared helpers ---------- */
  let API = null, AC = null;
  const ACTS = [
    ['ball', '🟡', 'Squishy stress ball', 'Press, drag and squeeze it'],
    ['wrap', '🫧', 'Bubble wrap', 'Pop a whole sheet'],
    ['spin', '🌀', 'Fidget spinner', 'Flick it and watch it go'],
    ['zen', '🏝️', 'Zen sand garden', 'Rake lines, place stones'],
    ['colour', '🎨', 'Calm colouring', 'Tap to fill a mandala'],
    ['breathe', '🫁', 'Breathing bubble', 'Breathe in, hold, breathe out'],
    ['doodle', '✏️', 'Doodle pad', 'Draw freely, save a PNG'],
    ['jar', '🫙', 'Worry & gratitude jar', 'Seal a worry, keep a thank-you'],
    ['timer', '⏳', '5-minute break', 'Countdown with a gentle chime'],
    ['lift', '✨', 'Pick-me-up', 'Affirmations and clean jokes']
  ];
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  function R() {
    const S = API.S; if (!S.rec || typeof S.rec !== 'object') S.rec = {};
    if (!Array.isArray(S.rec.grat)) S.rec.grat = [];
    return S.rec;
  }
  const RM = () => { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
  const buzz = p => { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { } };
  const $ = id => document.getElementById(id);
  const raf = f => (window.requestAnimationFrame ? window.requestAnimationFrame(f) : setTimeout(() => f(Date.now()), 16));
  const now = () => (window.performance && performance.now ? performance.now() : Date.now());
  function ctx2d(cv) { try { return cv.getContext ? cv.getContext('2d') : null; } catch (e) { return null; } }
  function loop(cv, step) { let last = now(); const f = t => { if (!cv.isConnected) return; const n = now(), dt = Math.min(0.05, Math.max(0, (n - last) / 1000)); last = n; step(dt); raf(f); }; raf(f); }
  function pos(cv, e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / (r.width || cv.width), (e.clientY - r.top) * cv.height / (r.height || cv.height)]; }
  function drag(cv, h) {
    cv.addEventListener('pointerdown', e => { e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch (x) { } cv._pid = e.pointerId; h.down(pos(cv, e), e); });
    cv.addEventListener('pointermove', e => { if (cv._pid !== e.pointerId) return; h.move(pos(cv, e), e); });
    const end = e => { if (cv._pid !== e.pointerId) return; cv._pid = null; if (h.up) h.up(pos(cv, e), e); };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  }

  /* ---------- sound (WebAudio only; respects the course sound switch) ---------- */
  function ac() {
    if (API && API.S.sound === false) return null;
    try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); return AC; } catch (e) { return null; }
  }
  function noise(a, dur) { const b = a.createBuffer(1, Math.max(1, Math.floor(a.sampleRate * dur)), a.sampleRate), d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; const s = a.createBufferSource(); s.buffer = b; return s; }
  function env(a, g, t, peak, dur) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); }
  function tone(f1, f2, dur, type, peak, delay) {
    const a = ac(); if (!a) return;
    try { const t = a.currentTime + (delay || 0), o = a.createOscillator(), g = a.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f1, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur); env(a, g, t, peak || 0.15, dur); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.05); } catch (e) { }
  }
  const SND = {
    pop() {
      const a = ac(); if (!a) return;
      try { const t = a.currentTime, n = noise(a, 0.07), f = a.createBiquadFilter(), g = a.createGain(); f.type = 'bandpass'; f.frequency.value = 900 + Math.random() * 1100; f.Q.value = 2.2; env(a, g, t, 0.7, 0.06); n.connect(f); f.connect(g); g.connect(a.destination); n.start(t); n.stop(t + 0.08); } catch (e) { }
      tone(1500 + Math.random() * 400, 260, 0.05, 'sine', 0.22);
    },
    squish(depth) {
      const a = ac(); if (!a) return;
      try {
        const t = a.currentTime, n = noise(a, 0.32), f = a.createBiquadFilter(), g = a.createGain();
        f.type = 'lowpass'; f.Q.value = 6; f.frequency.setValueAtTime(1400, t); f.frequency.exponentialRampToValueAtTime(220, t + 0.3);
        env(a, g, t, 0.25 + 0.25 * (depth || 1), 0.3); n.connect(f); f.connect(g); g.connect(a.destination); n.start(t); n.stop(t + 0.33);
      } catch (e) { }
      tone(210, 95, 0.22, 'sine', 0.18);
    },
    unsquish() { tone(120, 260, 0.16, 'sine', 0.12); },
    tok() { tone(240, 150, 0.12, 'triangle', 0.22); },
    whoosh() {
      const a = ac(); if (!a) return;
      try { const t = a.currentTime, n = noise(a, 0.4), f = a.createBiquadFilter(), g = a.createGain(); f.type = 'bandpass'; f.Q.value = 1.2; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(2200, t + 0.35); env(a, g, t, 0.18, 0.38); n.connect(f); f.connect(g); g.connect(a.destination); n.start(t); n.stop(t + 0.42); } catch (e) { }
    },
    soft(f) { tone(f || 392, 0, 0.9, 'sine', 0.06); },
    chime() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, 0, 1.6, 'sine', 0.12, i * 0.32)); },
    seal() { tone(180, 90, 0.18, 'triangle', 0.25); [659.25, 880].forEach((f, i) => tone(f, 0, 0.9, 'sine', 0.08, 0.25 + i * 0.18)); }
  };

  /* ---------- once-a-day mindful break reward ---------- */
  function dayHTML() {
    const done = R().day === today();
    return `<span class="rr-day ${done ? 'done' : ''}" id="rr-day">${done ? '✓ Mindful break logged today' : '🪙 Take a mindful break today for 2 coins'}</span>`;
  }
  function mindful(why) {
    const r = R(), d = today(); if (r.day === d) return false;
    r.day = d; API.save(); API.reward(2, '🛋️ Mindful break: ' + why, { xp: 2, noBonus: true });
    const el = $('rr-day'); if (el) el.outerHTML = dayHTML();
    return true;
  }

  /* ---------- 1. stress ball ---------- */
  const HUES = [45, 200, 330, 140, 270, 22, 175];
  const BALL = { n: 44, r: [], v: [], ox: 0, oy: 0, vx: 0, vy: 0, press: 0, down: false, px: 0, py: 0, sx: 0, sy: 0, col: 0, auto: 0 };
  const R0 = 128, BCX = 300, BCY = 205;
  function ballReset() { BALL.r = []; BALL.v = []; for (let i = 0; i < BALL.n; i++) { BALL.r.push(R0); BALL.v.push(0); } }
  ballReset();
  function ballStep(dt) {
    const B = BALL, n = B.n;
    if (B.auto > 0) { B.auto -= dt; if (B.auto <= 0) { B.down = false; SND.unsquish(); } }
    B.press += ((B.down ? 1 : 0) - B.press) * Math.min(1, dt * 9);
    let dx = 0, dy = 0; if (B.down) { dx = B.px - B.sx; dy = B.py - B.sy; const L = Math.hypot(dx, dy); if (L > 120) { dx *= 120 / L; dy *= 120 / L; } }
    const sub = 3, h = dt / sub;
    for (let s = 0; s < sub; s++) {
      B.vx += ((dx * 0.25 - B.ox) * 140 - B.vx * 11) * h; B.vy += ((dy * 0.25 - B.oy) * 140 - B.vy * 11) * h; B.ox += B.vx * h; B.oy += B.vy * h;
      const cx = BCX + B.ox, cy = BCY + B.oy, L = Math.hypot(dx, dy), dp = Math.atan2(B.py - cy, B.px - cx), dist = Math.hypot(B.px - cx, B.py - cy), edge = Math.min(1, dist / R0);
      const old = B.r.slice();
      for (let i = 0; i < n; i++) {
        const th = i / n * Math.PI * 2, ux = Math.cos(th), uy = Math.sin(th);
        let t = R0 * (1 + B.press * 0.07);
        if (B.down) {
          if (L > 1) { const dot = (ux * dx + uy * dy) / L; t += Math.max(0, dot) ** 2 * L * 0.45 - (1 - Math.abs(dot)) * L * 0.1; }
          let d = Math.abs(th - (dp < 0 ? dp + Math.PI * 2 : dp)); if (d > Math.PI) d = Math.PI * 2 - d;
          t -= B.press * edge * 46 * Math.exp(-d * d / 0.2);
          t += B.press * edge * 12 * Math.exp(-((Math.PI - d) ** 2) / 0.6);
        }
        const a = 260 * (t - old[i]) - 8 * B.v[i] + 160 * (old[(i + n - 1) % n] + old[(i + 1) % n] - 2 * old[i]);
        B.v[i] += a * h; B.r[i] += B.v[i] * h;
      }
    }
  }
  function ballDraw(c) {
    const B = BALL, n = B.n, cx = BCX + B.ox, cy = BCY + B.oy, hue = HUES[B.col % HUES.length], sq = 1 - B.press * 0.08;
    c.clearRect(0, 0, 600, 440);
    const bg = c.createRadialGradient(300, 140, 20, 300, 220, 380); bg.addColorStop(0, '#1d3d8f'); bg.addColorStop(1, '#0a1638'); c.fillStyle = bg; c.fillRect(0, 0, 600, 440);
    c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(cx, BCY + R0 + 42, R0 * (0.9 + B.press * 0.2), 16, 0, 0, Math.PI * 2); c.fill();
    const P = []; for (let i = 0; i < n; i++) { const th = i / n * Math.PI * 2; P.push([cx + Math.cos(th) * B.r[i], cy + Math.sin(th) * B.r[i] * sq + B.press * 8]); }
    c.beginPath(); const m0 = [(P[n - 1][0] + P[0][0]) / 2, (P[n - 1][1] + P[0][1]) / 2]; c.moveTo(m0[0], m0[1]);
    for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); }
    c.closePath();
    const g = c.createRadialGradient(cx - 45, cy - 55, 10, cx, cy, R0 * 1.45); g.addColorStop(0, `hsl(${hue},95%,84%)`); g.addColorStop(0.5, `hsl(${hue},85%,60%)`); g.addColorStop(1, `hsl(${hue},70%,34%)`);
    c.fillStyle = g; c.fill(); c.lineWidth = 3; c.strokeStyle = `hsla(${hue},70%,22%,.55)`; c.stroke();
    c.fillStyle = 'rgba(255,255,255,.38)'; c.beginPath(); c.ellipse(cx - 48, cy - 62 + B.press * 10, 34, 18, -0.6, 0, Math.PI * 2); c.fill();
    const fy = cy + 8 + B.press * 10; c.strokeStyle = 'rgba(10,20,51,.8)'; c.fillStyle = 'rgba(10,20,51,.8)'; c.lineWidth = 5; c.lineCap = 'round';
    if (B.press > 0.45) { [-1, 1].forEach(s => { c.beginPath(); c.moveTo(cx + s * 40, fy - 22); c.lineTo(cx + s * 26, fy - 14); c.lineTo(cx + s * 40, fy - 6); c.stroke(); }); c.beginPath(); c.ellipse(cx, fy + 22, 10, 12 * B.press, 0, 0, Math.PI * 2); c.fill(); }
    else { [-1, 1].forEach(s => { c.beginPath(); c.arc(cx + s * 32, fy - 16, 10, 0.15 * Math.PI, 0.85 * Math.PI); c.stroke(); }); c.beginPath(); c.arc(cx, fy + 6, 18, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke(); }
    c.fillStyle = 'rgba(255,120,150,.28)'; [-1, 1].forEach(s => { c.beginPath(); c.ellipse(cx + s * 56, fy + 4, 14, 8, 0, 0, Math.PI * 2); c.fill(); });
  }
  function ballRelease() {
    const r = R(); r.sq = (r.sq || 0) + 1; BALL.col++; API.save();
    const el = $('rr-sq'); if (el) el.textContent = r.sq;
    if (r.sq % 25 === 0) API.toast(`${r.sq} squeezes. Feeling lighter?`);
  }
  function mountBall() {
    const cv = $('rr-ball'); if (!cv) return; const c = ctx2d(cv);
    drag(cv, {
      down(p) { Object.assign(BALL, { down: true, px: p[0], py: p[1], sx: p[0], sy: p[1], auto: 0 }); BALL.t0 = now(); SND.squish(1); buzz(15); },
      move(p) { BALL.px = p[0]; BALL.py = p[1]; },
      up() { if (!BALL.down) return; BALL.down = false; SND.unsquish(); buzz(8); ballRelease(); }
    });
    cv.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); squeezeKey(); } });
    if (c) loop(cv, dt => { ballStep(dt); ballDraw(c); });
  }
  function squeezeKey() { Object.assign(BALL, { down: true, px: BCX + 20, py: BCY - 60, sx: BCX, sy: BCY - 60, auto: 0.4 }); SND.squish(0.8); buzz(15); ballRelease(); }

  /* ---------- 2. bubble wrap ---------- */
  const NB = 48; let popped = new Array(NB).fill(false);
  function popEl(b) {
    const i = +b.dataset.i; if (popped[i]) return; popped[i] = true;
    b.classList.add('rr-popd'); if (!RM()) b.classList.add('rr-boom'); b.setAttribute('aria-pressed', 'true'); b.setAttribute('aria-label', `Bubble ${i + 1}, popped`);
    SND.pop(); buzz(10);
    const left = popped.filter(x => !x).length, el = $('rr-pc'); if (el) el.textContent = NB - left;
    if (!left) { const m = $('rr-wmsg'); if (m) m.innerHTML = `<p class="fb good">Whole sheet popped. Nice and calm. Refill for another round?</p>`; mindful('popped a full sheet'); }
  }
  function mountWrap() {
    const g = $('rr-bw'); if (!g) return; let down = false;
    g.addEventListener('pointerdown', e => { const b = e.target.closest('.rr-bb'); down = true; if (b) popEl(b); try { if (e.target.releasePointerCapture) e.target.releasePointerCapture(e.pointerId); } catch (x) { } });
    g.addEventListener('pointerover', e => { if (!down || !e.buttons) return; const b = e.target.closest('.rr-bb'); if (b) popEl(b); });
    const stop = () => { down = false; }; g.addEventListener('pointerup', stop); g.addEventListener('pointerleave', stop); g.addEventListener('pointercancel', stop);
  }

  /* ---------- 3. fidget spinner ---------- */
  const SP = { ang: 0, vel: 0, down: false, last: 0, lt: 0, est: 0, shown: -1 };
  const rpm = () => Math.round(Math.abs(SP.vel) * 60 / (Math.PI * 2));
  function spinDraw(c) {
    const cx = 300, cy = 220; c.clearRect(0, 0, 600, 440);
    const bg = c.createRadialGradient(300, 120, 20, 300, 220, 380); bg.addColorStop(0, '#1d3d8f'); bg.addColorStop(1, '#0a1638'); c.fillStyle = bg; c.fillRect(0, 0, 600, 440);
    const sp = Math.min(1, Math.abs(SP.vel) / 40);
    if (sp > 0.05) { c.fillStyle = `rgba(255,215,102,${0.18 * sp})`; c.beginPath(); c.arc(cx, cy, 178, 0, Math.PI * 2); c.fill(); }
    c.save(); c.translate(cx, cy); c.rotate(SP.ang);
    c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 18; c.shadowOffsetY = 8;
    c.strokeStyle = '#C99A1C'; c.lineWidth = 78; c.lineCap = 'round';
    for (let k = 0; k < 3; k++) { const a = k * Math.PI * 2 / 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * 110, Math.sin(a) * 110); c.stroke(); }
    c.shadowColor = 'transparent';
    for (let k = 0; k < 3; k++) {
      const a = k * Math.PI * 2 / 3, x = Math.cos(a) * 110, y = Math.sin(a) * 110;
      const g = c.createRadialGradient(x - 20, y - 22, 6, x, y, 66); g.addColorStop(0, '#FFF3C4'); g.addColorStop(0.55, '#FFD766'); g.addColorStop(1, '#A97A0E');
      c.fillStyle = g; c.beginPath(); c.arc(x, y, 62, 0, Math.PI * 2); c.fill();
      const b = c.createRadialGradient(x - 10, y - 12, 3, x, y, 38); b.addColorStop(0, '#E8EEFF'); b.addColorStop(0.5, '#7E8CB8'); b.addColorStop(1, '#0A1433');
      c.fillStyle = b; c.beginPath(); c.arc(x, y, 36, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 26, 0, Math.PI * 2); c.stroke();
    }
    const g2 = c.createRadialGradient(-10, -12, 4, 0, 0, 52); g2.addColorStop(0, '#FFFFFF'); g2.addColorStop(0.45, '#B8C3E6'); g2.addColorStop(1, '#13286a');
    c.fillStyle = g2; c.beginPath(); c.arc(0, 0, 46, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#FFD766'; c.beginPath(); c.arc(0, 0, 16, 0, Math.PI * 2); c.fill();
    c.restore();
  }
  function spinStep(dt) {
    if (!SP.down) { SP.ang += SP.vel * dt; SP.vel *= Math.exp(-0.32 * dt); if (Math.abs(SP.vel) < 0.04) SP.vel = 0; }
    const r = rpm(); if (r !== SP.shown) { SP.shown = r; const el = $('rr-rpm'); if (el) el.textContent = r; if (r > (R().best || 0) && !SP.down) { R().best = r; const b = $('rr-best'); if (b) b.textContent = r; } }
  }
  function mountSpin() {
    const cv = $('rr-spin'); if (!cv) return; const c = ctx2d(cv);
    const angAt = p => Math.atan2(p[1] - 220, p[0] - 300);
    drag(cv, {
      down(p) { SP.down = true; SP.last = angAt(p); SP.lt = now(); SP.est = 0; SP.vel = 0; },
      move(p) { const a = angAt(p); let d = a - SP.last; if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; const t = now(), dt = Math.max(0.008, (t - SP.lt) / 1000); SP.ang += d; SP.est = SP.est * 0.5 + (d / dt) * 0.5; SP.vel = SP.est; SP.last = a; SP.lt = t; },
      up() { SP.down = false; if (now() - SP.lt > 120) SP.est *= 0.3; SP.vel = Math.max(-70, Math.min(70, SP.est)); if (Math.abs(SP.vel) > 6) { SND.whoosh(); buzz(12); } API.save(); }
    });
    cv.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); flick(1); } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); flick(-1); } else if (e.key === ' ') { e.preventDefault(); SP.vel *= 0.3; } });
    SP.shown = -1;
    if (c) loop(cv, dt => { spinStep(dt); spinDraw(c); }); else spinStep(0);
  }
  function flick(dir) { SP.vel = Math.max(-70, Math.min(70, SP.vel + dir * 9)); SND.whoosh(); buzz(12); spinStep(0); }

  /* ---------- 4. zen sand garden (persistent canvas) ---------- */
  let ZEN = null, zMode = 'rake';
  function sand(c) {
    c.fillStyle = '#E8D5AE'; c.fillRect(0, 0, 720, 480);
    for (let i = 0; i < 2600; i++) { c.fillStyle = Math.random() < 0.5 ? 'rgba(160,125,80,.18)' : 'rgba(255,250,235,.35)'; c.fillRect(Math.random() * 720, Math.random() * 480, 1.6, 1.6); }
  }
  function groove(c, pts, closed) {
    [['rgba(140,105,60,.55)', 3.2, 0], ['rgba(255,249,232,.7)', 1.4, 1.6]].forEach(([col, w, off]) => {
      c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath();
      pts.forEach((p, i) => i ? c.lineTo(p[0] + off, p[1] + off) : c.moveTo(p[0] + off, p[1] + off)); if (closed) c.closePath(); c.stroke();
    });
  }
  function rakeSeg(c, a, b) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    for (let k = -2; k <= 2; k++) groove(c, [[a[0] + nx * k * 10, a[1] + ny * k * 10], [b[0] + nx * k * 10, b[1] + ny * k * 10]]);
  }
  function stone(c, x, y) {
    const r = 16 + Math.random() * 14;
    [r + 14, r + 26, r + 38].forEach(rr => { const pts = []; for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI * 2; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.82]); } groove(c, pts, true); });
    c.fillStyle = 'rgba(60,45,25,.35)'; c.beginPath(); c.ellipse(x + 5, y + 7, r * 1.05, r * 0.75, 0, 0, Math.PI * 2); c.fill();
    const g = c.createRadialGradient(x - r * 0.4, y - r * 0.45, 2, x, y, r * 1.2); g.addColorStop(0, '#C9CED8'); g.addColorStop(0.55, '#6E7486'); g.addColorStop(1, '#2C3040');
    c.fillStyle = g; c.beginPath(); c.ellipse(x, y, r * 1.1, r * 0.8, Math.random() - 0.5, 0, Math.PI * 2); c.fill();
  }
  function zenCanvas() {
    if (ZEN) return ZEN;
    const cv = document.createElement('canvas'); cv.width = 720; cv.height = 480; cv.className = 'rr-cv'; cv.id = 'rr-zen'; cv.tabIndex = 0;
    cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', 'Zen sand garden. Drag to rake lines; switch to stones to place stones. Use the buttons below for keyboard options.');
    const c = ctx2d(cv); if (c) sand(c);
    let lastP = null;
    drag(cv, {
      down(p) { if (!c) return; if (zMode === 'stone') { stone(c, p[0], p[1]); SND.tok(); buzz(10); lastP = null; } else lastP = p; },
      move(p) { if (!c || !lastP) return; if (Math.hypot(p[0] - lastP[0], p[1] - lastP[1]) < 4) return; rakeSeg(c, lastP, p); lastP = p; },
      up() { lastP = null; }
    });
    ZEN = { cv, c }; return ZEN;
  }
  function zenWaves() {
    const Z = zenCanvas(); if (!Z.c) return; const ph = Math.random() * 6, amp = 10 + Math.random() * 14;
    for (let row = 30; row < 480; row += 18) { const pts = []; for (let x = -10; x <= 730; x += 12) pts.push([x, row + Math.sin(x / 70 + ph + row / 90) * amp]); groove(Z.c, pts); }
  }

  /* ---------- 5. calm colouring mandala ---------- */
  const MPAL = ['#FFD766', '#F4A261', '#E76F51', '#FF9ED1', '#C9A7FF', '#7FC8F2', '#2A9D8F', '#8BE3A7', '#1D3D8F', '#FFFDF6'];
  let mFill = {}, mCol = MPAL[5];
  const MREG = (() => {
    const P = (r, a) => (r * Math.cos(a)).toFixed(1) + ' ' + (r * Math.sin(a)).toFixed(1), out = [];
    const circ = (x, y, r) => `M ${(x - r).toFixed(1)} ${y.toFixed(1)} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
    const petal = (r1, r2, a, w) => `M ${P(r1, a)} Q ${P((r1 + r2) / 2, a - w)} ${P(r2, a)} Q ${P((r1 + r2) / 2, a + w)} ${P(r1, a)} Z`;
    const D = Math.PI / 180;
    out.push(['bg', circ(0, 0, 196)]);
    for (let k = 0; k < 16; k++) { const a0 = (k * 22.5 - 90) * D, a1 = ((k + 1) * 22.5 - 90) * D; out.push(['s' + k, `M ${P(160, a0)} L ${P(192, a0)} A 192 192 0 0 1 ${P(192, a1)} L ${P(160, a1)} A 160 160 0 0 0 ${P(160, a0)} Z`]); }
    for (let k = 0; k < 12; k++) out.push(['o' + k, petal(60, 156, (k * 30 - 90) * D, 0.3)]);
    for (let k = 0; k < 12; k++) { const a = (k * 30 - 75) * D; out.push(['d' + k, circ(140 * Math.cos(a), 140 * Math.sin(a), 11)]); }
    for (let k = 0; k < 8; k++) out.push(['m' + k, petal(28, 112, (k * 45 - 67.5) * D, 0.42)]);
    for (let k = 0; k < 8; k++) out.push(['i' + k, petal(16, 70, (k * 45 - 90) * D, 0.34)]);
    out.push(['c', circ(0, 0, 20)]);
    return out;
  })();
  function mandalaSVG() {
    return `<svg class="rr-man" id="rr-man" viewBox="-200 -200 400 400" role="group" aria-label="Mandala to colour. Choose a colour, then tap or press Enter on a shape.">${MREG.map(([id, d], i) => `<path data-r="${id}" d="${d}" fill="${mFill[id] || (id === 'bg' ? '#F6F1E4' : '#FFFDF6')}" tabindex="0" role="button" aria-label="Shape ${i + 1}"></path>`).join('')}</svg>`;
  }
  function mPaint(p) {
    const id = p.getAttribute('data-r'); mFill[id] = mCol; p.setAttribute('fill', mCol); tone(520 + Math.random() * 260, 0, 0.35, 'sine', 0.07); buzz(6);
    const n = Object.keys(mFill).filter(k => mFill[k] !== '#FFFDF6').length, el = $('rr-mc'); if (el) el.textContent = n;
    if (n === MREG.length) { API.toast('Every shape is coloured. Beautiful work.'); mindful('finished a mandala'); }
  }
  function mountColour() {
    const s = $('rr-man'); if (!s) return;
    s.addEventListener('click', e => { const p = e.target.closest && e.target.closest('[data-r]'); if (p) mPaint(p); });
    s.addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return; const p = e.target.closest && e.target.closest('[data-r]'); if (p) { e.preventDefault(); mPaint(p); } });
  }

  /* ---------- 6. breathing bubble ---------- */
  const PATS = {
    calm: { n: 'Calm 4-2-6', ph: [['Breathe in', 4, 'in'], ['Hold', 2, 'hold'], ['Breathe out', 6, 'out']] },
    box: { n: 'Box 4-4-4-4', ph: [['Breathe in', 4, 'in'], ['Hold', 4, 'hold'], ['Breathe out', 4, 'out'], ['Hold', 4, 'hold']] },
    relax: { n: 'Relax 4-7-8', ph: [['Breathe in', 4, 'in'], ['Hold', 7, 'hold'], ['Breathe out', 8, 'out']] }
  };
  const BR = { pat: 'calm', on: false, i: 0, left: 0, cycles: 0, int: null };
  function bPaint() {
    const bub = $('rr-bub'); if (!bub) return;
    const p = PATS[BR.pat].ph[BR.i], rm = RM();
    bub.classList.toggle('rm', rm);
    $('rr-bl').textContent = BR.on ? p[0] : 'Ready when you are'; $('rr-bc').textContent = BR.on ? BR.left : '';
    bub.setAttribute('data-ph', BR.on ? p[2] : '');
    if (!rm && BR.on) { if (p[2] !== 'hold') { bub.style.transition = `transform ${p[1]}s ease-in-out`; bub.style.transform = `scale(${p[2] === 'in' ? 1 : 0.6})`; } }
    else if (!rm) { bub.style.transition = 'transform 1s ease-in-out'; bub.style.transform = 'scale(.6)'; }
    const cy = $('rr-bcy'); if (cy) cy.textContent = BR.cycles;
    const go = $('rr-bgo'); if (go) go.textContent = BR.on ? '■ Stop' : '▶ Start breathing';
  }
  function bStop() { BR.on = false; clearInterval(BR.int); BR.int = null; bPaint(); }
  function bStart() { BR.on = true; BR.i = 0; BR.cycles = 0; BR.left = PATS[BR.pat].ph[0][1]; clearInterval(BR.int); BR.int = setInterval(bTick, 1000); SND.soft(392); bPaint(); }
  function bTick() {
    if (!$('rr-bub')) { bStop(); return; }
    BR.left--;
    if (BR.left <= 0) {
      const ph = PATS[BR.pat].ph; BR.i++;
      if (BR.i >= ph.length) { BR.i = 0; BR.cycles++; if (BR.cycles === 3) mindful('3 calm breaths'); }
      BR.left = ph[BR.i][1]; SND.soft(ph[BR.i][2] === 'in' ? 392 : ph[BR.i][2] === 'out' ? 330 : 349); buzz(20);
    }
    bPaint();
  }

  /* ---------- 7. doodle pad (persistent canvas) ---------- */
  const DPAL = ['#0A1433', '#1D3D8F', '#7FC8F2', '#2A9D8F', '#8BE3A7', '#FFD766', '#F4A261', '#E76F51', '#FF9ED1', '#C9A7FF'];
  let DOO = null, dCol = DPAL[1], dSize = 6;
  function doodleCanvas() {
    if (DOO) return DOO;
    const cv = document.createElement('canvas'); cv.width = 800; cv.height = 560; cv.className = 'rr-cv'; cv.id = 'rr-doodle'; cv.tabIndex = 0;
    cv.style.cursor = 'crosshair'; cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', 'Doodle pad. Drag to draw.');
    const c = ctx2d(cv); if (c) { c.fillStyle = '#FFFFFF'; c.fillRect(0, 0, 800, 560); }
    let lp = null;
    const dot = (p, w) => { c.fillStyle = dCol; c.beginPath(); c.arc(p[0], p[1], w / 2, 0, Math.PI * 2); c.fill(); };
    drag(cv, {
      down(p, e) { if (!c) return; lp = p; dot(p, dSize * (e.pointerType === 'pen' && e.pressure ? 0.4 + e.pressure : 1)); },
      move(p, e) { if (!c || !lp) return; c.strokeStyle = dCol; c.lineCap = 'round'; c.lineJoin = 'round'; c.lineWidth = dSize * (e.pointerType === 'pen' && e.pressure ? 0.4 + e.pressure : 1); c.beginPath(); c.moveTo(lp[0], lp[1]); c.lineTo(p[0], p[1]); c.stroke(); lp = p; },
      up() { lp = null; }
    });
    DOO = { cv, c }; return DOO;
  }

  /* ---------- 8. worry & gratitude jar ---------- */
  function jarSVG(n) {
    const rng = API.seeded ? API.seeded(7) : Math.random, cols = ['#FFD766', '#FF9ED1', '#7FC8F2', '#8BE3A7', '#C9A7FF', '#F4A261'];
    let slips = '';
    for (let i = 0; i < Math.min(n, 30); i++) { const row = Math.floor(i / 5), x = 62 + (i % 5) * 18 + rng() * 6, y = 196 - row * 13 - rng() * 4; slips += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="16" height="11" rx="2" fill="${cols[i % cols.length]}" transform="rotate(${((rng() - 0.5) * 40).toFixed(0)} ${(x + 8).toFixed(1)} ${(y + 5).toFixed(1)})" opacity=".95"/>`; }
    return `<svg class="rr-jar" viewBox="0 -30 200 270" aria-hidden="true">
      <defs><linearGradient id="rr-glass" x1="0" x2="1"><stop offset="0" stop-color="#bfe3ff" stop-opacity=".35"/><stop offset=".25" stop-color="#ffffff" stop-opacity=".22"/><stop offset=".6" stop-color="#9cc7f0" stop-opacity=".14"/><stop offset="1" stop-color="#4c7fc0" stop-opacity=".35"/></linearGradient>
      <linearGradient id="rr-lid" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFF0B3"/><stop offset=".5" stop-color="#FFD766"/><stop offset="1" stop-color="#A97A0E"/></linearGradient></defs>
      <path d="M58 44 h84 v14 c0 8 22 18 22 44 v104 c0 14 -10 22 -24 22 h-80 c-14 0 -24 -8 -24 -22 v-104 c0 -26 22 -36 22 -44 z" fill="url(#rr-glass)" stroke="rgba(255,255,255,.55)" stroke-width="2.5"/>
      ${slips}
      <path d="M48 120 c0 -14 4 -22 12 -30" stroke="rgba(255,255,255,.6)" stroke-width="5" stroke-linecap="round" fill="none"/>
      <g class="lid"><rect x="50" y="26" width="100" height="22" rx="6" fill="url(#rr-lid)" stroke="#7a5600" stroke-width="1.5"/><rect x="56" y="31" width="88" height="3" rx="1.5" fill="rgba(255,255,255,.55)"/></g>
    </svg>`;
  }
  function sealWorry() {
    const ta = $('rr-win'); if (!ta) return; const txt = (ta.value || '').trim();
    if (!txt) { API.toast('Type a worry first, then seal it away.'); ta.focus(); return; }
    const r = R(); r.sealed = (r.sealed || 0) + 1; API.save(); ta.value = '';
    const wrap = $('rr-jw'), msg = $('rr-wmsg');
    const done = () => { if (wrap) wrap.classList.remove('open'); SND.seal(); buzz([20, 40, 20]); if (msg) msg.innerHTML = `<p class="fb good">Sealed. That worry is in the jar now, so you do not have to carry it this minute. (${r.sealed} sealed so far.)</p>`; const c = $('rr-sealed'); if (c) c.textContent = r.sealed; mindful('sealed a worry'); };
    if (!wrap || RM()) { done(); return; }
    wrap.classList.add('open');
    const note = document.createElement('div'); note.className = 'rr-note'; note.textContent = txt.length > 60 ? txt.slice(0, 57) + '…' : txt; wrap.appendChild(note);
    setTimeout(() => note.classList.add('go'), 350);
    setTimeout(() => { note.remove(); done(); }, 1500);
  }
  function addGrat() {
    const inp = $('rr-gin'); if (!inp) return;
    const txt = String(inp.value || '').replace(/[\u0000-\u001f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);
    if (!txt) { API.toast('Write one small thing you are grateful for.'); inp.focus(); return; }
    const r = R(); r.grat.unshift(txt); if (r.grat.length > 30) r.grat = r.grat.slice(0, 30); API.save();
    SND.seal(); buzz(15); mindful('wrote a gratitude note'); API.render();
    const n = $('rr-gin'); if (n) n.focus();
  }

  /* ---------- 9. break timer ---------- */
  const TM = { total: 300, left: 300, end: 0, run: false, int: null, done: false };
  const CIRC = 2 * Math.PI * 92;
  function tPaint() {
    const s = Math.ceil(TM.left), el = $('rr-tt'); if (el) el.textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    const ring = $('rr-ring'); if (ring) ring.setAttribute('stroke-dashoffset', (CIRC * (1 - TM.left / TM.total)).toFixed(1));
    const b = $('rr-tgo'); if (b) b.textContent = TM.run ? '⏸ Pause' : (TM.left < TM.total ? '▶ Resume' : '▶ Start my break');
  }
  function tTick() {
    if (!TM.run) return;
    TM.left = Math.max(0, (TM.end - Date.now()) / 1000); tPaint();
    if (TM.left <= 0) {
      TM.run = false; TM.done = true; clearInterval(TM.int); TM.int = null;
      SND.chime(); buzz([60, 80, 60]);
      setTimeout(() => { try { if (API.S.sound !== false) API.speak('Break is over. Back to work?'); } catch (e) { } }, 1300);
      mindful('took a 5-minute break');
      const L = API.S.loc || {}; if (L.v === 'recroom' && L.tab === 'timer') API.render(); else API.toast("⏳ Break's over. Back to work?");
    }
  }
  function tToggle() {
    if (TM.done) { TM.done = false; TM.left = TM.total; }
    if (TM.run) { TM.run = false; TM.left = Math.max(0, (TM.end - Date.now()) / 1000); clearInterval(TM.int); TM.int = null; }
    else { TM.run = true; TM.end = Date.now() + TM.left * 1000; clearInterval(TM.int); TM.int = setInterval(tTick, 250); SND.soft(523); }
    tPaint();
  }

  /* ---------- 10. pick-me-ups ---------- */
  const AFF = ['Rest is part of the work, not a break from it.', 'Progress, not perfection.', 'One paragraph at a time is still moving forward.', 'Your voice matters: in class, in your documents and in life.', 'Mistakes are proof that you are trying.', 'Breathe in calm. Breathe out pressure.', 'You have handled hard days before, and you can handle this one.', 'Asking for help is a strength, not a weakness.', 'Small steps every day add up to big results.', 'You are more than a grade.', 'It is okay not to have everything figured out yet.', 'Your ideas are worth writing down.', 'Like the tide, focus comes back. Let it return gently.', 'Be as kind to yourself as you are to your friends.', 'You are learning, growing and getting stronger.', 'Today, do your best. Your best is enough.'];
  const JOKES = [['Why did the sentence go to the doctor?', 'It had a bad case of run-ons.'], ['What do you call a dinosaur with a huge vocabulary?', 'A thesaurus.'], ['Why are fish so smart?', 'They live in schools.'], ['How does the Caribbean Sea say hello?', 'It waves.'], ['Why was the maths book sad?', 'It had too many problems.'], ['What do you call a fake noodle?', 'An impasta.'], ['Why did the scarecrow win an award?', 'He was outstanding in his field.'], ['I am reading a book about anti-gravity.', 'It is impossible to put down.'], ['Why did the bicycle fall over?', 'It was two-tired.'], ["What is a computer's favourite snack?", 'Microchips.'], ['Why did the pencil get promoted?', 'It always made its point.'], ['What do you call a group of musical whales?', 'An orca-stra.'], ['Why did the student bring a ladder to class?', 'To reach the higher grades.'], ['Why did the comma break up with the full stop?', 'It wanted to keep things going.'], ['What do you call a sleeping bull?', 'A bulldozer.'], ['Why do bees have sticky hair?', 'Because they use honeycombs.']];
  let lift = { k: 'aff', i: 0, rev: false };
  function liftHTML() {
    if (lift.k === 'joke') { const j = JOKES[lift.i % JOKES.length]; return `${API.esc(j[0])}${lift.rev ? `<small>${API.esc(j[1])}</small>` : ''}`; }
    return API.esc(AFF[lift.i % AFF.length]);
  }
  function liftNext(k) { const L = k === 'joke' ? JOKES : AFF; let i; do { i = Math.floor(Math.random() * L.length); } while (L.length > 1 && i === lift.i && lift.k === k); lift = { k, i, rev: false }; }
  liftNext('aff');

  /* ---------- views ---------- */
  function topHTML(a) {
    const snd = API.S.sound === false;
    return `<div class="rr-top"><div class="rr-tl"><button type="button" class="btn ghost" data-go="recroom">← Chill Zone</button><h2>${a[1]} ${API.esc(a[2])}</h2></div>
      <button type="button" class="tool" data-px="snd" aria-pressed="${!snd}">${snd ? '🔇 Sound off' : '🔊 Sound on'}</button></div>`;
  }
  function homeHTML() {
    const S = API.S;
    return `<section class="hero rr-hero"><span class="eyebrow">Rec room · De-stress zone</span>
      <h1>Chill Zone 🛋️</h1>
      <p>Studying hard? Step away for a few minutes${S.name ? ', ' + API.esc(S.name) : ''}. Squeeze, pop, spin, rake, colour or just breathe. Your brain files what you learned while you rest.</p>
      ${dayHTML()}</section>
      <div class="rr-tiles">${ACTS.map(a => `<button type="button" class="tile" data-go="recroom" data-tab="${a[0]}"><span class="ticon" aria-hidden="true">${a[1]}</span><h3>${API.esc(a[2])}</h3><span class="meta">${API.esc(a[3])}</span></button>`).join('')}</div>
      <div class="card"><p class="hint" style="margin:0">Tip: a good study break is 5 to 10 minutes, away from your notes. When you come back, start with one small task. If stress is feeling bigger than a break can fix, talk to someone you trust, such as a parent, guidance counsellor or teacher.</p></div>`;
  }
  const VIEWS = {
    ball: () => `<p class="hint">Press and drag the ball to squish and stretch it. Every squeeze changes its colour. Keyboard: focus the ball and press Space or Enter.</p>
      <div class="rr-stage"><canvas id="rr-ball" class="rr-cv" width="600" height="440" tabindex="0" role="img" aria-label="Squishy stress ball. Press Space or Enter to squeeze."></canvas></div>
      <div class="row rr-stats"><span class="rr-stat">Squeezes <b id="rr-sq">${R().sq || 0}</b></span><button type="button" class="btn gold" data-px="squeeze">Squeeze</button><button type="button" class="btn ghost" data-px="ballcol">🎨 New colour</button></div>`,
    wrap: () => `<p class="hint">Pop them one by one, or hold the mouse and sweep across. Every bubble is a real button, so Tab and Enter work too.</p>
      <div class="rr-stage"><div class="rr-bw" id="rr-bw">${popped.map((p, i) => `<button type="button" class="rr-bb ${p ? 'rr-popd' : ''}" data-px="pop" data-i="${i}" aria-label="Bubble ${i + 1}${p ? ', popped' : ''}"${p ? ' aria-pressed="true"' : ''}></button>`).join('')}</div></div>
      <div class="row rr-stats"><span class="rr-stat">Popped <b id="rr-pc">${popped.filter(Boolean).length}</b> / ${NB}</span><button type="button" class="btn gold" data-px="refill">↻ Fresh sheet</button></div><div id="rr-wmsg"></div>`,
    spin: () => `<p class="hint">Grab the spinner and flick it round. It keeps its momentum and slows down gently. Keyboard: focus it and use the arrow keys; Space brakes.</p>
      <div class="rr-stage"><canvas id="rr-spin" class="rr-cv" width="600" height="440" tabindex="0" role="img" aria-label="Fidget spinner. Arrow keys spin it, Space slows it down."></canvas></div>
      <div class="row rr-stats"><span class="rr-stat">Speed <b id="rr-rpm">${rpm()}</b> RPM</span><span class="rr-stat">Best <b id="rr-best">${R().best || 0}</b></span><button type="button" class="btn gold" data-px="sflick">⟳ Flick</button><button type="button" class="btn ghost" data-px="sbrake">✋ Brake</button></div>`,
    zen: () => `<p class="hint">Drag to rake slow lines in the sand. Switch to stones and tap to set a stone with ripples around it.</p>
      <div class="row"><button type="button" class="chip ${zMode === 'rake' ? 'sel' : ''}" data-px="zmode" data-k="rake" aria-pressed="${zMode === 'rake'}">🪮 Rake</button><button type="button" class="chip ${zMode === 'stone' ? 'sel' : ''}" data-px="zmode" data-k="stone" aria-pressed="${zMode === 'stone'}">🪨 Stones</button></div>
      <div class="rr-stage" id="rr-zhost"></div>
      <div class="row"><button type="button" class="btn gold" data-px="zwave">〰 Rake waves for me</button><button type="button" class="btn ghost" data-px="zstone">🪨 Drop a stone</button><button type="button" class="btn ghost" data-px="zclear">Smooth the sand</button></div>`,
    colour: () => `<p class="hint">Pick a colour, then tap a shape to fill it. There is no wrong way. Coloured: <b id="rr-mc">${Object.keys(mFill).filter(k => mFill[k] !== '#FFFDF6').length}</b> of ${MREG.length} shapes.</p>
      <div class="rr-pal" role="group" aria-label="Colours">${MPAL.map(c => `<button type="button" class="rr-sw ${c === mCol ? 'sel' : ''} ${c === '#FFFDF6' ? 'erase' : ''}" style="${c === '#FFFDF6' ? '' : 'background:' + c}" data-px="ccol" data-c="${c}" aria-label="${c === '#FFFDF6' ? 'Eraser (white)' : 'Colour ' + c}" aria-pressed="${c === mCol}"></button>`).join('')}</div>
      <div class="rr-stage">${mandalaSVG()}</div>
      <div class="row"><button type="button" class="btn gold" data-px="cfill">✨ Surprise me</button><button type="button" class="btn ghost" data-px="cclear">Start again</button></div>`,
    breathe: () => `<p class="hint">Follow the bubble: breathe in as it grows, hold, and breathe out slowly as it shrinks. Three rounds is a great reset.${RM() ? ' Reduced motion is on, so the bubble stays still and the words and count guide you.' : ''}</p>
      <div class="chips" role="group" aria-label="Breathing pattern">${Object.entries(PATS).map(([k, p]) => `<button type="button" class="chip ${BR.pat === k ? 'sel' : ''}" data-px="bpat" data-k="${k}" aria-pressed="${BR.pat === k}">${p.n}</button>`).join('')}</div>
      <div class="rr-stage rr-bst"><div class="rr-bub ${RM() ? 'rm' : ''}" id="rr-bub" aria-live="polite"><span id="rr-bl">Ready when you are</span><b id="rr-bc"></b></div></div>
      <div class="row rr-stats"><button type="button" class="btn go" id="rr-bgo" data-px="btoggle">▶ Start breathing</button><span class="rr-stat">Rounds <b id="rr-bcy">${BR.cycles}</b></span></div>`,
    doodle: () => `<p class="hint">Draw anything. Nobody is marking this one.</p>
      <div class="rr-pal" role="group" aria-label="Pen colour">${DPAL.map(c => `<button type="button" class="rr-sw ${c === dCol ? 'sel' : ''}" style="background:${c}" data-px="dcol" data-c="${c}" aria-label="Pen colour ${c}" aria-pressed="${c === dCol}"></button>`).join('')}<button type="button" class="rr-sw erase ${dCol === '#FFFFFF' ? 'sel' : ''}" data-px="dcol" data-c="#FFFFFF" aria-label="Eraser" aria-pressed="${dCol === '#FFFFFF'}"></button></div>
      <div class="chips" role="group" aria-label="Pen size">${[[3, 'Fine'], [6, 'Medium'], [14, 'Thick'], [28, 'Marker']].map(([s, n]) => `<button type="button" class="chip ${dSize === s ? 'sel' : ''}" data-px="dsize" data-k="${s}" aria-pressed="${dSize === s}">${n}</button>`).join('')}</div>
      <div class="rr-stage" id="rr-dhost"></div>
      <div class="row"><button type="button" class="btn gold" data-px="dsave">⬇ Save as PNG</button><button type="button" class="btn ghost" data-px="dclear">Clear page</button></div>`,
    jar: loc => {
      const k = loc.k === 'grat' ? 'grat' : 'worry', r = R();
      let h = `<div class="chips" role="tablist"><button type="button" class="chip ${k === 'worry' ? 'sel' : ''}" role="tab" aria-selected="${k === 'worry'}" data-go="recroom" data-tab="jar" data-k="worry">🫙 Worry jar</button><button type="button" class="chip ${k === 'grat' ? 'sel' : ''}" role="tab" aria-selected="${k === 'grat'}" data-go="recroom" data-tab="jar" data-k="grat">💛 Gratitude jar</button></div>`;
      if (k === 'worry') h += `<p class="hint">Write down what is bothering you, then seal it in the jar. Worries are never saved or sent anywhere. Putting a worry into words helps your brain set it aside so you can focus.</p>
        <div class="rr-stage rr-jarwrap" id="rr-jw">${jarSVG(Math.min(r.sealed || 0, 30))}</div>
        <div class="field"><label for="rr-win">My worry</label><textarea id="rr-win" class="rr-in" rows="3" maxlength="200" placeholder="e.g. I'm nervous about my Paper 2 essay."></textarea></div>
        <div class="row rr-stats"><button type="button" class="btn go" data-px="seal">🔒 Seal it in the jar</button><span class="rr-stat">Sealed <b id="rr-sealed">${r.sealed || 0}</b></span></div><div id="rr-wmsg"></div>`;
      else h += `<p class="hint">Add one small thing you are grateful for. Notes stay in your browser (up to 30, newest first).</p>
        <div class="rr-stage rr-jarwrap">${jarSVG(r.grat.length)}</div>
        <div class="field"><label for="rr-gin">I'm grateful for…</label><input id="rr-gin" class="rr-in" type="text" maxlength="80" autocomplete="off" placeholder="e.g. my friend explaining register to me"></div>
        <div class="row rr-stats"><button type="button" class="btn go" data-px="gadd">💛 Add to jar</button><span class="rr-stat">Notes <b>${r.grat.length}</b> / 30</span></div>
        ${r.grat.length ? `<ul class="rr-glist">${r.grat.map((g, i) => `<li><span>${API.esc(g)}</span><button type="button" class="tool" data-px="gdel" data-i="${i}" aria-label="Remove note ${i + 1}">✕</button></li>`).join('')}</ul>` : '<p class="hint">Your jar is empty. What went well today?</p>'}`;
      return h;
    },
    timer: () => TM.done ? `<div class="rr-stage rr-done" style="padding:24px 16px"><div style="font-size:3rem" aria-hidden="true">🔔</div><h2 style="margin:0;color:#FFE38A">Break's over. Back to work?</h2><p style="margin:0;color:#F1F4FF">You rested for 5 minutes. Pick one small task to start with.</p>
        <div class="row" style="justify-content:center"><button type="button" class="btn go" data-go="home">Back to work →</button><button type="button" class="btn ghost" style="color:#F1F4FF" data-px="treset">Another 5 minutes</button></div></div>`
      : `<p class="hint">Set your phone down, stretch, get some water, look out of a window. A gentle chime will tell you when the break is over.</p>
        <div class="rr-stage rr-tim"><svg viewBox="0 0 220 220" aria-hidden="true"><circle cx="110" cy="110" r="92" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="14"/><circle id="rr-ring" class="rr-ring" cx="110" cy="110" r="92" fill="none" stroke="#FFD766" stroke-width="14" stroke-linecap="round" stroke-dasharray="${CIRC.toFixed(1)}" stroke-dashoffset="${(CIRC * (1 - TM.left / TM.total)).toFixed(1)}" transform="rotate(-90 110 110)"/></svg><div class="num" id="rr-tt" role="timer" aria-live="off">${Math.floor(Math.ceil(TM.left) / 60)}:${String(Math.ceil(TM.left) % 60).padStart(2, '0')}</div></div>
        <div class="row" style="justify-content:center"><button type="button" class="btn go" id="rr-tgo" data-px="tgo">${TM.run ? '⏸ Pause' : TM.left < TM.total ? '▶ Resume' : '▶ Start my break'}</button><button type="button" class="btn ghost" data-px="treset">↺ Reset</button></div>
        <p class="hint" style="text-align:center">The timer keeps running if you open another Chill Zone activity.</p>`,
    lift: () => `<div class="chips" role="group"><button type="button" class="chip ${lift.k === 'aff' ? 'sel' : ''}" data-px="lift" data-k="aff" aria-pressed="${lift.k === 'aff'}">💛 Affirmation</button><button type="button" class="chip ${lift.k === 'joke' ? 'sel' : ''}" data-px="lift" data-k="joke" aria-pressed="${lift.k === 'joke'}">😄 Joke</button></div>
      <div class="rr-lift" id="rr-lift" aria-live="polite"><div>${liftHTML()}</div></div>
      <div class="row">${lift.k === 'joke' && !lift.rev ? `<button type="button" class="btn gold" data-px="reveal">Tell me the answer</button>` : ''}<button type="button" class="btn ${lift.k === 'joke' && !lift.rev ? 'ghost' : 'gold'}" data-px="lift" data-k="${lift.k}">Another one</button>${API.listenBtn ? API.listenBtn('Read it to me') : ''}</div>`
  };

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'recroom',
    title: 'Chill Zone',
    tile: { icon: '🛋️', meta: 'Rec room for study breaks: stress ball, bubble wrap, breathing and more' },
    render(api, loc) {
      API = api; R();
      const a = ACTS.find(x => x[0] === loc.tab);
      if (!a) return `<div class="rr-wrap">${homeHTML()}</div>`;
      return `<div class="rr-wrap"><div class="card">${topHTML(a)}${VIEWS[a[0]](loc)}</div></div>`;
    },
    mount(api, loc) {
      API = api; const t = loc.tab;
      if (t === 'ball') mountBall();
      else if (t === 'wrap') mountWrap();
      else if (t === 'spin') mountSpin();
      else if (t === 'zen') { const h = $('rr-zhost'); if (h) h.appendChild(zenCanvas().cv); }
      else if (t === 'doodle') { const h = $('rr-dhost'); if (h) h.appendChild(doodleCanvas().cv); }
      else if (t === 'colour') mountColour();
      else if (t === 'breathe') bPaint();
      else if (t === 'timer') tPaint();
      else if (t === 'jar') {
        const g = $('rr-gin'); if (g) g.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addGrat(); } });
        const w = $('rr-win'); if (w) w.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); sealWorry(); } });
      }
    },
    click(action, el, api) {
      API = api; const k = el.dataset.k;
      switch (action) {
        case 'snd': api.S.sound = api.S.sound === false; api.save(); if (api.S.sound) SND.soft(523); api.render(); return;
        case 'squeeze': squeezeKey(); return;
        case 'ballcol': BALL.col++; tone(660, 0, 0.3, 'sine', 0.08); return;
        case 'pop': popEl(el); return;
        case 'refill': popped = new Array(NB).fill(false); tone(300, 600, 0.25, 'sine', 0.08); api.render(); return;
        case 'sflick': flick(1); return;
        case 'sbrake': SP.vel *= 0.3; spinStep(0); return;
        case 'zmode': zMode = k === 'stone' ? 'stone' : 'rake'; document.querySelectorAll('[data-px="zmode"]').forEach(b => { const on = b.dataset.k === zMode; b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on); }); return;
        case 'zwave': zenWaves(); SND.whoosh(); return;
        case 'zstone': { const Z = zenCanvas(); if (Z.c) stone(Z.c, 80 + Math.random() * 560, 70 + Math.random() * 340); SND.tok(); buzz(10); return; }
        case 'zclear': { const Z = zenCanvas(); if (Z.c) sand(Z.c); SND.whoosh(); return; }
        case 'ccol': mCol = el.dataset.c; document.querySelectorAll('[data-px="ccol"]').forEach(b => { const on = b.dataset.c === mCol; b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on); }); return;
        case 'cfill': MREG.forEach(([id]) => { mFill[id] = MPAL[Math.floor(Math.random() * (MPAL.length - 1))]; }); api.render(); return;
        case 'cclear': mFill = {}; api.render(); return;
        case 'bpat': if (PATS[k]) { BR.pat = k; bStop(); api.render(); } return;
        case 'btoggle': if (BR.on) bStop(); else bStart(); return;
        case 'dcol': dCol = el.dataset.c; document.querySelectorAll('[data-px="dcol"]').forEach(b => { const on = b.dataset.c === dCol; b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on); }); return;
        case 'dsize': dSize = +k || 6; document.querySelectorAll('[data-px="dsize"]').forEach(b => { const on = +b.dataset.k === dSize; b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on); }); return;
        case 'dclear': { const D = doodleCanvas(); if (D.c) { D.c.fillStyle = '#FFFFFF'; D.c.fillRect(0, 0, 800, 560); } return; }
        case 'dsave': {
          try { const D = doodleCanvas(), url = D.cv.toDataURL('image/png'); if (!url) throw new Error('no image'); const a = document.createElement('a'); a.download = 'chill-zone-doodle.png'; a.href = url; document.body.appendChild(a); a.click(); a.remove(); api.toast('Doodle saved as a PNG'); }
          catch (e) { api.toast('Saving is not available here. Try a screenshot instead.'); }
          return;
        }
        case 'seal': sealWorry(); return;
        case 'gadd': addGrat(); return;
        case 'gdel': { const r = R(), i = +el.dataset.i; if (i >= 0 && i < r.grat.length) { r.grat.splice(i, 1); api.save(); api.render(); } return; }
        case 'tgo': tToggle(); return;
        case 'treset': TM.run = false; TM.done = false; TM.left = TM.total; clearInterval(TM.int); TM.int = null; api.render(); return;
        case 'lift': liftNext(k === 'joke' ? 'joke' : 'aff'); tone(700, 0, 0.3, 'sine', 0.06); api.render(); return;
        case 'reveal': lift.rev = true; tone(523, 784, 0.3, 'sine', 0.08); api.render(); return;
      }
    }
  });
})();
