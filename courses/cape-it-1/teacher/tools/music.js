/* Music Room: study music generated live with the Web Audio API (no audio files, no network).
   Audio graph lives in module scope so playback continues while the student moves around the course. */
(function () {
  const CSS = `
.mu-hero h1{display:flex;align-items:center;gap:10px}
.mu-wrap{display:flex;flex-direction:column;gap:16px;min-width:0}
.mu-player{perspective:1100px;padding:clamp(14px,3vw,24px)}
.mu-radio{position:relative;display:grid;grid-template-columns:minmax(0,260px) minmax(0,1fr);gap:clamp(14px,3vw,26px);align-items:center;padding:clamp(14px,3vw,22px);border-radius:22px;
  background:radial-gradient(420px 200px at 20% 0%,rgba(255,215,102,.18),transparent 70%),linear-gradient(160deg,#16306f,#0a1638 72%);
  border:2px solid rgba(255,215,102,.45);box-shadow:0 2px 0 rgba(255,255,255,.12) inset,0 -6px 0 rgba(0,0,0,.35) inset,0 22px 40px -18px rgba(0,0,0,.9),0 10px 0 #071030,0 12px 0 rgba(201,154,28,.55);
  transform:rotateX(7deg);transform-origin:50% 100%;color:#F1F4FF;min-width:0}
.mu-radio::before{content:"";position:absolute;inset:8px;border-radius:16px;border:1px dashed rgba(255,215,102,.25);pointer-events:none}
.mu-deck{position:relative;aspect-ratio:1;width:100%;max-width:260px;border-radius:18px;background:linear-gradient(145deg,#2a1d0e,#140d05);box-shadow:0 2px 0 rgba(255,255,255,.1) inset,0 10px 20px -8px rgba(0,0,0,.8);display:grid;place-items:center;overflow:hidden}
.mu-rec{width:84%;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;
  background:radial-gradient(circle at 50% 50%,transparent 0 30%,rgba(255,255,255,.05) 31%,transparent 32%),repeating-radial-gradient(circle at 50% 50%,#0b0b0f 0 2px,#17171d 2px 3px),#0d0d12;
  box-shadow:0 0 0 3px #000,0 8px 18px rgba(0,0,0,.7);position:relative}
.mu-rec::after{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 20deg,transparent 0 30deg,rgba(255,255,255,.13) 45deg,transparent 60deg 200deg,rgba(255,255,255,.08) 215deg,transparent 230deg)}
.mu-label{width:36%;aspect-ratio:1;border-radius:50%;display:grid;place-items:center;font-size:clamp(1.3rem,4vw,2rem);background:radial-gradient(circle,#0d0d12 0 7%,var(--mu-lab,#FFD766) 8% 100%);box-shadow:0 0 0 2px rgba(0,0,0,.5) inset;z-index:1}
.mu-rec.on{animation:mu-spin 3.2s linear infinite}
@keyframes mu-spin{to{transform:rotate(360deg)}}
.mu-arm{position:absolute;right:7%;top:6%;width:10%;height:62%;transform-origin:50% 8%;transform:rotate(8deg);transition:transform .8s;z-index:2}
.mu-arm::before{content:"";position:absolute;left:50%;top:0;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff7cf,#c99a1c);box-shadow:0 2px 4px rgba(0,0,0,.6)}
.mu-arm::after{content:"";position:absolute;left:50%;top:9px;width:5px;height:calc(100% - 9px);margin-left:-2.5px;border-radius:3px;background:linear-gradient(90deg,#e8e8ee,#9a9aa6);box-shadow:-6px 100% 0 2px #c99a1c}
.mu-arm.on{transform:rotate(26deg)}
.mu-side{display:flex;flex-direction:column;gap:12px;min-width:0}
.mu-now h2{font-size:clamp(1.25rem,3.4vw,1.6rem);color:#FFE38A}
.mu-now p{color:#C9D3F5;font-size:.93rem}
.mu-vis{width:100%;height:84px;display:block;border-radius:12px;background:linear-gradient(180deg,#050b20,#0a1638);border:1px solid rgba(255,215,102,.3);box-shadow:0 2px 8px rgba(0,0,0,.6) inset}
.mu-ctl{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center}
.mu-play{min-width:128px;font-size:1.05rem}
.mu-rng{display:flex;align-items:center;gap:8px;flex:none;min-width:0;font-weight:700;font-size:.9rem}
.mu-ctl .mu-rng{flex:1 1 180px}
.mu-rng input{flex:1;min-width:0;accent-color:var(--gold)}
.mu-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}
.mu-st{cursor:pointer;padding:14px}
.mu-st[aria-pressed="true"]{outline:3px solid var(--gold);outline-offset:1px;box-shadow:0 0 0 1px var(--gold),0 10px 26px -10px var(--glow)}
.mu-st.locked{opacity:.86}
.mu-st .mu-tag{font-size:.74rem;font-weight:700;color:var(--gold)}
.mu-grp{font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:700;grid-column:1/-1;margin-top:4px}
.mu-pt{font:800 clamp(2.2rem,8vw,3.2rem)/1 var(--f-display);letter-spacing:.02em;color:var(--gold);text-shadow:0 3px 0 rgba(0,0,0,.35)}
.mu-num{width:5.2em;border:2px solid var(--line);border-radius:10px;padding:6px 8px;background:var(--surface);color:var(--ink);font:inherit}
.mu-mini{position:fixed;right:max(12px,env(safe-area-inset-right,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:22;display:flex;align-items:center;gap:4px;padding:5px;border-radius:99px;
  background:linear-gradient(180deg,#16306f,#0a1638);border:1px solid rgba(255,215,102,.55);box-shadow:0 10px 24px -8px rgba(0,0,0,.85),0 3px 0 #050b20;color:#F1F4FF;max-width:calc(100vw - 24px)}
.mu-mini[hidden]{display:none}
.mu-mini button{border:0;background:transparent;color:inherit;border-radius:99px;min-width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;gap:6px;font-weight:700;font-size:.88rem;padding:0 8px}
.mu-mini button:hover{background:rgba(255,215,102,.16)}
.mu-mini .mu-mgo{max-width:230px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.mu-mini .mu-mname{overflow:hidden;text-overflow:ellipsis}
.mu-mini .mu-mtime{color:#FFE38A;font-variant-numeric:tabular-nums}
.mu-eq{display:inline-flex;gap:2px;align-items:flex-end;height:14px}
.mu-eq i{width:3px;height:40%;background:var(--gold);border-radius:2px}
.mu-mini.on .mu-eq i{animation:mu-eq .9s ease-in-out infinite alternate}
.mu-mini.on .mu-eq i:nth-child(2){animation-delay:-.3s}.mu-mini.on .mu-eq i:nth-child(3){animation-delay:-.6s}
@keyframes mu-eq{from{height:20%}to{height:100%}}
@media (max-width:640px){
  .mu-radio{grid-template-columns:minmax(0,1fr);transform:none}
  .mu-deck{max-width:200px;justify-self:center}
  .mu-tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
  .mu-st{padding:12px}
  .mu-st .meta{display:none}
  .mu-mini .mu-mname{display:none}
}
@media (prefers-reduced-motion:reduce){.mu-rec.on,.mu-mini.on .mu-eq i{animation:none}.mu-radio{transform:none}.mu-arm{transition:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ---------------- stations ---------------- */
  const STATIONS = [
    { id: 'lofi', name: 'Lo-fi Beats', icon: '☕', grp: 'Music', col: '#E9A86B', d: 'Dusty swing drums, vinyl crackle and jazzy electric-piano chords.' },
    { id: 'relax', name: 'Chill & Relax', icon: '🌙', grp: 'Music', col: '#9DB7FF', d: 'Slow warm pads with a gentle echoing arpeggio.' },
    { id: 'caribbean', name: 'Island Chill', icon: '🏝️', grp: 'Music', col: '#4FD1C5', price: 30, d: 'Steelpan melodies over a soft, slow reggae-calypso skank.' },
    { id: 'classical', name: 'Baroque Study', icon: '🎻', grp: 'Music', col: '#F5C542', price: 40, d: 'Generative harpsichord counterpoint in a bright major key.' },
    { id: 'ambient', name: 'Ambient Drift', icon: '🌌', grp: 'Atmosphere', col: '#B79CFF', price: 20, d: 'Evolving drones, long reverb and sparse glassy bells.' },
    { id: 'rain', name: 'Rain & Piano', icon: '🌧️', grp: 'Atmosphere', col: '#7FB2D9', d: 'Soft rainfall, far-off thunder and a sparse pentatonic piano.' },
    { id: 'ocean', name: 'Caribbean Sea', icon: '🌊', grp: 'Atmosphere', col: '#3FB6E0', d: 'Slow swells rolling in on a quiet Caribbean beach.' },
    { id: 'noise', name: 'Focus Noise', icon: '🌫️', grp: 'Focus', col: '#B07A4F', d: 'Steady brown, pink or white noise that masks chatter.' }
  ];
  const SBY = {}; STATIONS.forEach(s => SBY[s.id] = s);
  const AMBS = [['rain', '🌧️ Rain'], ['ocean', '🌊 Ocean'], ['cafe', '☕ Café murmur']];

  /* ---------------- helpers ---------------- */
  const rnd = Math.random, pick = a => a[Math.floor(rnd() * a.length)], mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  const reduced = () => { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } };
  const fold = (m, lo, hi) => { while (m < lo) m += 12; while (m > hi) m -= 12; return m; };
  const LOOK = 1.5;
  const IC = { play: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style="vertical-align:-1px"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg>', pause: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style="vertical-align:-1px"><path d="M2.5 1.5h3.2v11H2.5zM8.3 1.5h3.2v11H8.3z" fill="currentColor"/></svg>' };

  /* ---------------- audio core (module scope: survives view changes) ---------------- */
  let A = null, cur = null, curId = null, amb = null, ambId = null, playing = false, started = false, closed = false, API = null;
  function prefs() { const S = API && API.S; if (!S) return { st: 'lofi', vol: 0.55, mix: 0, amb: 'rain', pm: '25', cw: 30, cb: 5, nz: 'brown' }; S.music = Object.assign({ st: 'lofi', vol: 0.55, mix: 0, amb: 'rain', pm: '25', cw: 30, cb: 5, nz: 'brown' }, S.music || {}); return S.music; }
  function saveP() { try { API && API.save(); } catch (e) { } }

  function ensure() {
    if (A) return A;
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
    let ctx; try { ctx = new C(); } catch (e) { return null; }
    const G = v => { const g = ctx.createGain(); g.gain.value = v; return g; };
    const master = G(0), music = G(1), ambBus = G(0), comp = ctx.createDynamicsCompressor(), an = ctx.createAnalyser();
    comp.threshold.value = -20; comp.knee.value = 18; comp.ratio.value = 3; comp.attack.value = 0.01; comp.release.value = 0.3;
    an.fftSize = 256; an.smoothingTimeConstant = 0.8;
    music.connect(master); ambBus.connect(master); master.connect(comp); comp.connect(an); an.connect(ctx.destination);
    A = { ctx, G, master, music, ambBus, an, ir: makeIR(ctx, 3.4, 2.4), nb: {}, hw: null };
    setInterval(schedTick, 200);
    return A;
  }
  function schedTick() {
    if (!A || A.ctx.state !== 'running') return;
    const h = A.ctx.currentTime + LOOK;
    try { if (cur) cur.tick(h); } catch (e) { }
    try { if (amb) amb.tick(h); } catch (e) { }
  }
  function makeIR(ctx, secs, decay) {
    const n = Math.floor(ctx.sampleRate * secs), b = ctx.createBuffer(2, n, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c); let y = 0;
      for (let i = 0; i < n; i++) { const k = i / n, x = (rnd() * 2 - 1) * Math.pow(1 - k, decay); y += (0.25 + 0.6 * (1 - k)) * (x - y); d[i] = y; }
    }
    return b;
  }
  function noiseBuf(type) {
    if (A.nb[type]) return A.nb[type];
    const ctx = A.ctx, n = Math.floor(ctx.sampleRate * (type === 'crackle' ? 7 : 10)), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
    for (let i = 0; i < n; i++) {
      const w = rnd() * 2 - 1;
      if (type === 'white') d[i] = w * 0.5;
      else if (type === 'pink') { b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852; b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898; d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11; b6 = w * 0.115926; }
      else if (type === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      else { d[i] = 0; if (rnd() < 0.00045) { const a = (rnd() * 0.9 + 0.1) * (rnd() < 0.5 ? -1 : 1); d[i] = a; if (i + 1 < n) d[i + 1] = -a * 0.6; if (i + 2 < n) d[i + 2] = a * 0.3; i += 2; } }
    }
    // smooth the loop seam
    const f = Math.min(2000, n >> 4); for (let i = 0; i < f; i++) { const k = i / f; d[n - f + i] = d[n - f + i] * (1 - k) + d[i] * k; }
    return (A.nb[type] = b);
  }
  function harpWave() {
    if (A.hw) return A.hw;
    const N = 28, re = new Float32Array(N), im = new Float32Array(N);
    for (let k = 1; k < N; k++) im[k] = Math.abs(Math.sin(k * Math.PI * 0.14)) / Math.pow(k, 0.9);
    return (A.hw = A.ctx.createPeriodicWave(re, im));
  }

  /* station context: in -> (dry, wet->reverb) -> out -> bus */
  function mkX(bus, wetAmt, cut) {
    const ctx = A.ctx, G = A.G, out = G(0), dry = G(1), wet = G(wetAmt), conv = ctx.createConvolver(), inp = ctx.createBiquadFilter();
    conv.buffer = A.ir; inp.type = 'lowpass'; inp.frequency.value = cut || 18000; inp.Q.value = 0.4;
    inp.connect(dry); inp.connect(wet); dry.connect(out); wet.connect(conv); conv.connect(out); out.connect(bus);
    const now = ctx.currentTime; out.gain.setValueAtTime(0, now); out.gain.linearRampToValueAtTime(1, now + 1.2);
    return { ctx, G, out, inp, wet, srcs: [], t: now + 0.15 };
  }
  function stopX(X) {
    if (!X) return;
    const now = X.ctx.currentTime, g = X.out.gain;
    try { g.cancelScheduledValues(now); g.setValueAtTime(g.value, now); g.linearRampToValueAtTime(0, now + 0.8); } catch (e) { }
    setTimeout(() => { X.srcs.forEach(s => { try { s.stop(); } catch (e) { } }); try { X.out.disconnect(); } catch (e) { } }, 1100);
  }
  function loopNoise(X, type, dest, gain, rate) {
    const s = X.ctx.createBufferSource(); s.buffer = noiseBuf(type); s.loop = true; if (rate) s.playbackRate.value = rate;
    const g = X.G(gain); s.connect(g); g.connect(dest); s.start(X.ctx.currentTime, rnd() * 5); X.srcs.push(s); return g;
  }
  function filt(X, type, f, q) { const b = X.ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q != null) b.Q.value = q; return b; }
  function env(g, t, a, peak, hold, rel) { g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.setTargetAtTime(0.0001, t + a + hold, rel); }

  /* ---------------- instruments ---------------- */
  function kick(X, t, v) {
    const o = X.ctx.createOscillator(), g = X.G(0); o.frequency.setValueAtTime(115, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.16);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
    o.connect(g); g.connect(X.inp); o.start(t); o.stop(t + 0.45);
  }
  function hit(X, t, type, f, q, v, d, dest) {
    const s = X.ctx.createBufferSource(); s.buffer = noiseBuf('white');
    const b = filt(X, type, f, q), g = X.G(0);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    s.connect(b); b.connect(g); g.connect(dest || X.inp); s.start(t, rnd() * 8); s.stop(t + d + 0.05);
  }
  function snare(X, t, v) {
    hit(X, t, 'bandpass', 1700, 0.8, v, 0.2);
    const o = X.ctx.createOscillator(), g = X.G(0); o.type = 'triangle'; o.frequency.setValueAtTime(200, t); o.frequency.exponentialRampToValueAtTime(150, t + 0.08);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v * 0.6, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g); g.connect(X.inp); o.start(t); o.stop(t + 0.14);
  }
  function hat(X, t, v, open) { hit(X, t, 'highpass', 7500, 0.7, v, open ? 0.22 : 0.05); }
  function osc(X, type, f, t, stop) { const o = X.ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); o.start(t); o.stop(stop); return o; }
  function epiano(X, t, m, dur, v) {
    const f = mtof(m), end = t + dur + 1.6, c = osc(X, 'sine', f, t, end), mo = osc(X, 'sine', f, t, end), mg = X.G(0), g = X.G(0);
    mg.gain.setValueAtTime(f * 1.4, t); mg.gain.exponentialRampToValueAtTime(f * 0.12, t + 0.9);
    mo.connect(mg); mg.connect(c.frequency);
    if (X.wow) { X.wow.connect(c.detune); X.wow.connect(mo.detune); c.onended = () => { try { X.wow.disconnect(c.detune); X.wow.disconnect(mo.detune); } catch (e) { } }; }
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.008); g.gain.setTargetAtTime(v * 0.35, t + 0.01, 0.5); g.gain.setTargetAtTime(0.0001, t + dur, 0.28);
    c.connect(g); g.connect(X.inp);
  }
  function pad(X, t, ms, dur, v, cut) {
    const lp = filt(X, 'lowpass', cut * 0.6, 0.6), g = X.G(0), end = t + dur + 6;
    lp.frequency.setValueAtTime(cut * 0.55, t); lp.frequency.linearRampToValueAtTime(cut, t + dur * 0.5); lp.frequency.linearRampToValueAtTime(cut * 0.6, t + dur + 3);
    ms.forEach(m => [-7, 7].forEach(dt => { const o = osc(X, 'sawtooth', mtof(m), t, end); o.detune.value = dt + (rnd() * 4 - 2); o.connect(lp); }));
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v / ms.length, t + 2.2); g.gain.setValueAtTime(v / ms.length, t + dur); g.gain.setTargetAtTime(0.0001, t + dur, 1.1);
    lp.connect(g); g.connect(X.inp);
  }
  function pluck(X, t, m, v, d, type, extra) {
    const o = osc(X, type || 'triangle', mtof(m), t, t + d + 0.1), g = X.G(0);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(X.inp); if (extra) g.connect(extra);
  }
  function bell(X, t, m, v) {
    const f = mtof(m), c = osc(X, 'sine', f, t, t + 5), mo = osc(X, 'sine', f * 3.5, t, t + 5), mg = X.G(0), g = X.G(0);
    mg.gain.setValueAtTime(f * 1.8, t); mg.gain.exponentialRampToValueAtTime(f * 0.05, t + 2.5); mo.connect(mg); mg.connect(c.frequency);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 4.8);
    c.connect(g); g.connect(X.wet); const dg = X.G(0.35); g.connect(dg); dg.connect(X.inp);
  }
  function piano(X, t, m, v, d) {
    const f = mtof(m), lp = filt(X, 'lowpass', 1600 + 3000 * v * 8, 0.5), g = X.G(0), end = t + d + 0.4;
    [[1, 1], [2, 0.45], [3, 0.22], [4, 0.12], [5, 0.06]].forEach(([n, a]) => {
      const o = osc(X, 'sine', f * n * Math.sqrt(1 + 0.0004 * n * n), t, end), pg = X.G(0);
      pg.gain.setValueAtTime(a, t); pg.gain.exponentialRampToValueAtTime(a * 0.001, t + d / (1 + n * 0.35)); o.connect(pg); pg.connect(lp);
    });
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.005); g.gain.setTargetAtTime(0.0001, t + 0.02, d / 4);
    lp.connect(g); g.connect(X.inp);
  }
  function harpsi(X, t, m, v) {
    const d = Math.max(0.5, 1.7 - (m - 48) * 0.025), g = X.G(0), hp = filt(X, 'highpass', 160, 0.5), lp = filt(X, 'lowpass', 5200, 0.4);
    [0, 4].forEach(dt => { const o = X.ctx.createOscillator(); o.setPeriodicWave(harpWave()); o.frequency.value = mtof(m); o.detune.value = dt; o.connect(hp); o.start(t); o.stop(t + d + 0.1); });
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    hp.connect(lp); lp.connect(g); g.connect(X.inp);
  }
  function steel(X, t, m, v, d) {
    const f = mtof(m), end = t + d + 0.2, g = X.G(0), mo = osc(X, 'sine', f, t, end), mg = X.G(0);
    mg.gain.setValueAtTime(f * 0.9, t); mg.gain.exponentialRampToValueAtTime(f * 0.01, t + 0.18); mo.connect(mg);
    [[1, 1], [2.004, 0.45], [3.0, 0.16], [4.01, 0.06]].forEach(([n, a], i) => { const o = osc(X, 'sine', f * n, t, end), pg = X.G(a); if (!i) mg.connect(o.frequency); o.connect(pg); pg.connect(g); });
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.005); g.gain.exponentialRampToValueAtTime(v * 0.25, t + 0.25); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    g.connect(X.inp);
  }
  function bass(X, t, m, dur, v) {
    const f = mtof(m), lp = filt(X, 'lowpass', 520, 0.7), g = X.G(0), end = t + dur + 0.5;
    osc(X, 'sine', f, t, end).connect(lp); const tr = osc(X, 'triangle', f, t, end), tg = X.G(0.4); tr.connect(tg); tg.connect(lp);
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.015); g.gain.setTargetAtTime(v * 0.6, t + 0.05, 0.25); g.gain.setTargetAtTime(0.0001, t + dur, 0.08);
    lp.connect(g); g.connect(X.inp);
  }
  function organ(X, t, ms, v, d) {
    const lp = filt(X, 'lowpass', 1500, 0.8), g = X.G(0);
    ms.forEach(m => [-5, 5].forEach(dt => { const o = osc(X, 'square', mtof(m), t, t + d + 0.15); o.detune.value = dt; o.connect(lp); }));
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v / ms.length, t + 0.01); g.gain.setTargetAtTime(0.0001, t + d * 0.6, d * 0.25);
    lp.connect(g); g.connect(X.inp);
  }

  /* chords: intervals above the chord root */
  const Q = { M: [0, 4, 7], m: [0, 3, 7], M6: [0, 4, 7, 9], M7: [0, 4, 7, 11], M9: [4, 7, 11, 14], m7: [0, 3, 7, 10], m9: [3, 7, 10, 14], m11: [3, 10, 14, 17], d9: [4, 10, 14], d13: [4, 10, 14, 21], s4: [5, 7, 10, 14] };
  const voice = (root, q, lo, hi) => Q[q].map(i => fold(root + i, lo, hi)).sort((a, b) => a - b);
  const MAJ = [0, 2, 4, 5, 7, 9, 11], PENT = [0, 2, 4, 7, 9];
  const inScale = (key, sc, lo, hi) => { const r = []; for (let m = lo; m <= hi; m++) if (sc.includes(((m - key) % 12 + 12) % 12)) r.push(m); return r; };

  /* ---------------- generators ---------------- */
  const GEN = {};
  GEN.lofi = X => {
    const PROGS = [[[2, 'm9'], [7, 'd9'], [0, 'M9'], [9, 'm9']], [[5, 'M9'], [4, 'm7'], [2, 'm9'], [0, 'M9']], [[9, 'm9'], [2, 'm9'], [7, 'd13'], [0, 'M7']], [[0, 'M9'], [9, 'm11'], [5, 'M9'], [7, 'd9']], [[4, 'm7'], [9, 'm9'], [2, 'm11'], [7, 'd13']]];
    let key = pick([0, 2, 3, 5, 7, 10]), prog = pick(PROGS), n = 0, drop = false, kickPat = [0, 10];
    const sd = 60 / (72 + rnd() * 8) / 4;
    X.inp.frequency.value = 4300;
    const ws = X.G(1); X.wow = ws;
    [[0.33, 9], [5.6, 2.2]].forEach(([r, a]) => { const l = X.ctx.createOscillator(), g = X.G(a); l.frequency.value = r; l.connect(g); g.connect(ws); l.start(); X.srcs.push(l); });
    loopNoise(X, 'crackle', X.out, 0.07);
    const hiss = filt(X, 'bandpass', 3000, 0.4); hiss.connect(X.out); loopNoise(X, 'pink', hiss, 0.02);
    X.tick = h => {
      while (X.t < h) {
        const s = n % 16, bar = Math.floor(n / 16), t = X.t + (s % 2 ? sd * 0.3 : 0);
        if (s === 0) {
          if (bar && bar % 8 === 0 && rnd() < 0.55) prog = pick(PROGS);
          if (bar && bar % 32 === 0 && rnd() < 0.5) key = pick([0, 2, 3, 5, 7, 10]);
          if (bar % 4 === 0) { drop = bar > 0 && rnd() < 0.12; kickPat = pick([[0, 10], [0, 7, 10], [0, 3, 10], [0, 10, 13]]); }
        }
        const [r, q] = prog[bar % 4], root = 48 + key + r;
        if (s === 0) { voice(root, q, 55, 74).forEach((m, i) => epiano(X, t + i * 0.014, m, sd * (rnd() < 0.3 ? 9 : 15), 0.075)); bass(X, t, fold(root, 33, 45), sd * 6, 0.16); }
        if (s === 10 && rnd() < 0.35) voice(root, q, 55, 74).forEach((m, i) => epiano(X, t + i * 0.012, m, sd * 5, 0.05));
        if (s === 10 && rnd() < 0.6) bass(X, t, fold(root + pick([0, 7, 12]), 33, 47), sd * 4, 0.13);
        if (s % 2 === 0 && s && rnd() < 0.13) { const pool = voice(root, q, 72, 86).concat(fold(root + 14, 72, 86)); epiano(X, t, pick(pool), sd * 3, 0.04); }
        if (!drop) {
          if (kickPat.includes(s)) kick(X, t, 0.32);
          if (s === 4 || s === 12) snare(X, t, 0.11);
          if (s === 15 && rnd() < 0.2) snare(X, t, 0.035);
          if (s % 2 === 0) hat(X, t, s % 4 === 0 ? 0.035 : 0.022, s === 14 && rnd() < 0.25);
          else if (rnd() < 0.14) hat(X, t, 0.012);
        }
        n++; X.t += sd;
      }
    };
  };
  GEN.relax = X => {
    const NEXT = { 0: [5, 9, 2, 4], 2: [7, 5, 0], 4: [9, 5], 5: [0, 7, 2, 9], 7: [0, 9, 5], 9: [5, 2, 4, 7] }, QY = { 0: 'M7', 2: 'm9', 4: 'm7', 5: 'M9', 7: 's4', 9: 'm9' };
    let key = pick([0, 2, 5, 7, 9, 10]), deg = 0, cnt = 0;
    const be = 60 / 64 / 2, dl = X.ctx.createDelay(2), fb = X.G(0.32), dlp = filt(X, 'lowpass', 2400, 0.5), dg = X.G(0.5);
    dl.delayTime.value = be * 3; dg.connect(dl); dl.connect(dlp); dlp.connect(fb); fb.connect(dl); dlp.connect(X.inp);
    X.tick = h => {
      while (X.t < h) {
        const t = X.t, dur = be * 16, root = 48 + key + deg, q = QY[deg];
        pad(X, t, voice(root, q, 52, 71), dur + 1, 0.11, 900 + rnd() * 500);
        bass(X, t, fold(root, 36, 47), dur * 0.9, 0.07);
        const tones = voice(root, q, 64, 81), pat = pick([[0, 1, 2, 3, 2, 1], [0, 2, 1, 3], [3, 2, 1, 0, 1, 2], [0, 1, 2, 3]]);
        for (let i = 0; i < 16; i++) if (rnd() > 0.22) pluck(X, t + i * be, tones[pat[i % pat.length] % tones.length] + (rnd() < 0.08 ? 12 : 0), 0.035, 1.1, 'triangle', dg);
        cnt++; if (cnt % 16 === 0 && rnd() < 0.5) key = pick([0, 2, 5, 7, 9, 10]);
        deg = pick(NEXT[deg]); X.t += dur;
      }
    };
  };
  GEN.ambient = X => {
    X.wet.gain.value = 0.85;
    let root = 38 + pick([0, 2, 5, 7]);
    const lp = filt(X, 'lowpass', 800, 0.7), lg = X.G(0.9); lp.connect(lg); lg.connect(X.inp);
    const lfo = X.ctx.createOscillator(), la = X.G(380); lfo.frequency.value = 0.045; lfo.connect(la); la.connect(lp.frequency); lfo.start(); X.srcs.push(lfo);
    const D = [[0, 'sine', 0.06, 0], [7, 'triangle', 0.035, 3], [12, 'sine', 0.035, -4], [19, 'sawtooth', 0.008, 2], [24, 'sine', 0.01, 5]].map(([iv, ty, v, dt]) => {
      const o = X.ctx.createOscillator(), g = X.G(v), tr = X.ctx.createOscillator(), tg = X.G(v * 0.5); o.type = ty; o.frequency.value = mtof(root + iv); o.detune.value = dt;
      tr.frequency.value = 0.03 + rnd() * 0.08; tr.connect(tg); tg.connect(g.gain); o.connect(g); g.connect(lp); o.start(); tr.start(); X.srcs.push(o, tr); return [o, iv];
    });
    let nb = X.t + 1.5, ns = X.t + 35 + rnd() * 25, sc = pick([PENT, [0, 3, 5, 7, 10]]);
    X.tick = h => {
      while (nb < h) { const pool = inScale(root, sc, 72, 91), k = rnd() < 0.25 ? 3 : rnd() < 0.4 ? 2 : 1; for (let i = 0; i < k; i++) bell(X, nb + i * (0.25 + rnd() * 0.5), pick(pool), 0.045 + rnd() * 0.04); nb += 2 + rnd() * 6.5; }
      while (ns < h) { root = 38 + ((root - 38 + pick([5, 7, -5, 2, -2, 3])) % 12 + 12) % 12; sc = pick([PENT, [0, 3, 5, 7, 10], [0, 2, 4, 7, 11]]); D.forEach(([o, iv]) => o.frequency.setTargetAtTime(mtof(root + iv), ns, 2.5)); ns += 35 + rnd() * 30; }
      X.t = h;
    };
  };
  function rainBed(X, lvl) {
    const hp = filt(X, 'highpass', 450, 0.4), lp = filt(X, 'lowpass', 6500, 0.3), rg = X.G(1); hp.connect(lp); lp.connect(rg); rg.connect(X.inp);
    loopNoise(X, 'pink', hp, 0.55 * lvl);
    const lo = filt(X, 'lowpass', 320, 0.5); lo.connect(X.inp); loopNoise(X, 'brown', lo, 0.28 * lvl);
    let nd = X.t, nm = X.t;
    return h => {
      while (nm < h) { rg.gain.setTargetAtTime(0.7 + rnd() * 0.5, nm, 1.5); nm += 2 + rnd() * 3; }
      while (nd < h) { hit(X, nd, 'bandpass', 1800 + rnd() * 4200, 9, (0.012 + rnd() * 0.03) * lvl, 0.03 + rnd() * 0.03); nd += 0.04 + rnd() * 0.22; }
    };
  }
  function oceanBed(X, lvl) {
    const bed = filt(X, 'lowpass', 220, 0.5); bed.connect(X.inp); loopNoise(X, 'brown', bed, 0.2 * lvl);
    const V = [-0.55, 0.5].map((p, i) => {
      const lp = filt(X, 'lowpass', 400, 0.6), g = X.G(0.01), pn = X.ctx.createStereoPanner ? X.ctx.createStereoPanner() : X.G(1);
      if (pn.pan) pn.pan.value = p; lp.connect(g); g.connect(pn); pn.connect(X.inp); loopNoise(X, 'pink', lp, 1, 0.9 + i * 0.13);
      const fhp = filt(X, 'highpass', 2600, 0.4), fg = X.G(0.0005); fhp.connect(fg); fg.connect(pn); loopNoise(X, 'white', fhp, 1);
      return { lp, g, fg, next: X.t + i * 4.5 };
    });
    return h => V.forEach(v => {
      while (v.next < h) {
        const P = 6.5 + rnd() * 6, t = v.next, pk = (0.11 + rnd() * 0.09) * lvl;
        v.g.gain.setTargetAtTime(pk, t, P * 0.16); v.g.gain.setTargetAtTime(0.012 * lvl, t + P * 0.45, P * 0.2);
        v.lp.frequency.setTargetAtTime(1300 + rnd() * 900, t, P * 0.18); v.lp.frequency.setTargetAtTime(330, t + P * 0.5, P * 0.2);
        v.fg.gain.setTargetAtTime(0.03 * lvl, t + P * 0.35, 0.35); v.fg.gain.setTargetAtTime(0.0005, t + P * 0.55, 0.9);
        v.next += P * (0.75 + rnd() * 0.4);
      }
    });
  }
  function cafeBed(X, lvl) {
    X.wet.gain.value = 0.4;
    const B = [380, 950, 2300].map((f, i) => { const b = filt(X, 'bandpass', f, 1.6), g = X.G(0.3); b.connect(g); g.connect(X.inp); loopNoise(X, 'pink', b, [1.1, 0.8, 0.35][i] * lvl, 0.97 + i * 0.03); return { b, g, n: X.t, f }; });
    const room = filt(X, 'lowpass', 260, 0.5); room.connect(X.inp); loopNoise(X, 'brown', room, 0.12 * lvl);
    let nc = X.t + 4 + rnd() * 6;
    return h => {
      B.forEach(x => { while (x.n < h) { x.g.gain.setTargetAtTime(0.15 + rnd() * 0.75, x.n, 0.08 + rnd() * 0.12); x.b.frequency.setTargetAtTime(x.f * (0.85 + rnd() * 0.3), x.n, 0.2); x.n += 0.12 + rnd() * 0.3; } });
      while (nc < h) { const f = 2300 + rnd() * 1500; [1, 2.71].forEach((k, i) => { const o = osc(X, 'sine', f * k, nc, nc + 0.6), g = X.G(0); g.gain.setValueAtTime(0.0001, nc); g.gain.linearRampToValueAtTime((i ? 0.004 : 0.01) * lvl, nc + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, nc + 0.5); o.connect(g); g.connect(X.inp); }); nc += 6 + rnd() * 14; }
    };
  }
  GEN.rain = X => {
    X.wet.gain.value = 0.38;
    const bed = rainBed(X, 1), key = 60 + pick([0, 2, 5, 7, -3]), pool = inScale(key, PENT, 57, 84);
    let idx = Math.floor(pool.length / 2), left = 0, nn = X.t + 2, nt = X.t + 25 + rnd() * 35;
    X.tick = h => {
      bed(h);
      while (nn < h) {
        if (left <= 0) { left = 3 + Math.floor(rnd() * 4); nn += 4 + rnd() * 6; if (rnd() < 0.5) piano(X, nn, fold(key + pick([0, 5, 7, 9]), 40, 52), 0.05, 5); continue; }
        idx = Math.max(0, Math.min(pool.length - 1, idx + pick([-2, -1, -1, 1, 1, 2, 0])));
        piano(X, nn, pool[idx], 0.045 + rnd() * 0.035, 3.5); if (rnd() < 0.18) piano(X, nn + 0.02, pool[Math.max(0, idx - 2)], 0.03, 3);
        left--; nn += 0.55 + rnd() * 1.3;
      }
      while (nt < h) {
        const s = X.ctx.createBufferSource(), lp = filt(X, 'lowpass', 140, 0.6), g = X.G(0), d = 7 + rnd() * 5;
        s.buffer = noiseBuf('brown'); g.gain.setValueAtTime(0.0001, nt); g.gain.setTargetAtTime(0.5, nt, 0.6);
        for (let k = 1; k < 5; k++) g.gain.setTargetAtTime(0.18 + rnd() * 0.35, nt + k * d / 6, 0.4);
        g.gain.setTargetAtTime(0.0001, nt + d * 0.75, d * 0.18);
        s.connect(lp); lp.connect(g); g.connect(X.inp); s.start(nt, rnd() * 3); s.stop(nt + d + 2); nt += 50 + rnd() * 80;
      }
      X.t = h;
    };
  };
  GEN.ocean = X => { X.wet.gain.value = 0.15; const bed = oceanBed(X, 1); X.tick = h => { bed(h); X.t = h; }; };
  GEN.caribbean = X => {
    X.wet.gain.value = 0.22;
    const PROGS = [[[0, 'M'], [5, 'M'], [7, 'M'], [0, 'M']], [[0, 'M'], [9, 'm'], [5, 'M'], [7, 'M']], [[0, 'M6'], [5, 'M'], [0, 'M'], [7, 'M']], [[5, 'M'], [7, 'M'], [4, 'm'], [9, 'm']]];
    const BL = [[[0, 0, 3], [6, 0, 2], [8, 7, 3], [12, 12, 2], [14, 7, 2]], [[0, 0, 5], [6, 7, 2], [10, 0, 2], [12, 4, 3]], [[2, 0, 3], [6, 0, 2], [8, 7, 4], [14, 12, 2]]];
    const RH = [[0, 3, 6, 8, 12, 16, 19, 22, 24], [0, 2, 4, 6, 10, 16, 18, 20, 24, 28], [0, 4, 6, 8, 14, 16, 20, 22, 24], [2, 4, 8, 11, 14, 16, 18, 22, 24]];
    let key = pick([0, 5, 7, -2]), prog = pick(PROGS), bl = pick(BL), n = 0, mot = null, motB = null, rest = false;
    const sd = 60 / 78 / 4;
    const mkMot = () => { const r = pick(RH); let d = Math.floor(rnd() * 5) + 4; return r.map(s => { d = Math.max(0, Math.min(11, d + pick([-2, -1, -1, 0, 1, 1, 2]))); return [s, d]; }); };
    X.tick = h => {
      while (X.t < h) {
        const s = n % 16, bar = Math.floor(n / 16), t = X.t, [r, q] = prog[bar % 4], root = 48 + key + r;
        if (s === 0) {
          if (bar % 8 === 0) { mot = mkMot(); motB = mkMot(); if (bar && rnd() < 0.4) prog = pick(PROGS); bl = pick(BL); rest = bar > 0 && rnd() < 0.18; }
          if (bar && bar % 32 === 0 && rnd() < 0.5) key = pick([0, 5, 7, -2]);
        }
        bl.forEach(([ps, iv, len]) => { if (ps === s) bass(X, t, fold(root + iv, 36, 50), sd * len, 0.15); });
        if (s === 4 || s === 12) organ(X, t, voice(root, q, 60, 72), 0.07, sd * 1.6);
        if (s === 14 && rnd() < 0.3) organ(X, t, voice(root, q, 60, 72), 0.04, sd);
        if (s === 8) { kick(X, t, 0.2); hit(X, t, 'bandpass', 2400, 3, 0.05, 0.05); }
        if (s === 0 && rnd() < 0.5) kick(X, t, 0.12);
        hat(X, t, s % 4 === 2 ? 0.022 : 0.009);
        if (!rest && mot) {
          const ph = bar % 8, m = ph < 4 ? mot : ph < 6 ? motB : mot, off = (ph % 2) * 16;
          m.forEach(([ms, d], i) => {
            if (ms !== s + off) return;
            let dd = d; if (ph === 2 || ph === 3) dd = d + (i >= m.length - 2 ? 1 : 0); if (ph === 7 && i === m.length - 1) dd = 7;
            const scale = inScale(key + 60, MAJ, 67, 88), midi = scale[Math.min(scale.length - 1, dd)];
            const gap = (m[i + 1] ? m[i + 1][0] : 32) - ms;
            steel(X, t, midi, 0.07, 1.1);
            if (gap >= 4 && rnd() < 0.5) for (let k = 1; k < gap - 1; k++) steel(X, t + k * sd, midi, 0.025, 0.4);
          });
        }
        n++; X.t += sd;
      }
    };
  };
  GEN.classical = X => {
    X.wet.gain.value = 0.2;
    const NEXT = { 0: [5, 7, 9, 2, 4], 2: [7, 7, 5], 4: [9, 5], 5: [7, 2, 0], 7: [0, 0, 9], 9: [2, 5, 4] }, QY = { 0: 'M', 2: 'm', 4: 'm', 5: 'M', 7: 'M', 9: 'm' };
    const RH = [[0, 4, 8, 12], [0, 2, 4, 6, 8, 10, 12, 14], [0, 2, 4, 6, 8, 12], [0, 1, 2, 3, 4, 6, 8, 10, 12, 14], [0, 4, 6, 8, 10, 12, 13, 14, 15], [0, 2, 3, 4, 8, 10, 11, 12]];
    let key = pick([0, 2, 7, 5, -3]), deg = 0, n = 0, mel = 76, lh = 0, third = false, rh = RH[1], phrase = 0;
    const sd = 60 / 88 / 4;
    X.tick = h => {
      while (X.t < h) {
        const s = n % 16, bar = Math.floor(n / 16), pb = bar % 8, t = X.t;
        if (s === 0) {
          if (pb === 0) { lh = Math.floor(rnd() * 3); third = rnd() < 0.35; phrase++; if (phrase % 3 === 0) key = (key + pick([7, 5, 7]) + 12) % 12; }
          deg = pb === 0 ? 0 : pb === 6 ? 7 : pb === 7 ? 0 : pb === 5 ? pick([2, 5]) : pick(NEXT[deg]);
          rh = pb === 7 ? [0, 4, 8] : pick(RH);
        }
        const root = 48 + key + deg, ct = Q[QY[deg]].map(i => (root + i) % 12), scale = inScale(60 + key, MAJ, 64, 88);
        const lo = voice(root, QY[deg], 43, 57);
        if (lh === 0 && s % 2 === 0) harpsi(X, t, [lo[0], lo[2], lo[1], lo[2]][(s / 2) % 4], 0.05);
        if (lh === 1) harpsi(X, t, (lo.concat(lo.map(x => x + 12)))[[0, 1, 2, 3, 4, 5, 4, 3][s % 8] % 6], 0.042);
        if (lh === 2 && s % 4 === 0) { harpsi(X, t, s === 0 ? fold(root, 36, 47) : lo[s / 4 % 3], 0.055); }
        if (rh.includes(s) && !(pb === 7 && s > 8)) {
          let i = scale.indexOf(fold(mel, 64, 88)); if (i < 0) i = 6;
          i = Math.max(0, Math.min(scale.length - 1, i + pick([-1, -1, 1, 1, -2, 2, 0, 1, -1])));
          let m = scale[i];
          if (s % 4 === 0) { let b = m, best = 99; scale.forEach(x => { if (ct.includes(x % 12) && Math.abs(x - m) < best) { best = Math.abs(x - m); b = x; } }); m = b; }
          if (pb === 7 && s === 0) { let b = m, best = 99; scale.forEach(x => { if ((x - key) % 12 === 0 && Math.abs(x - m) < best) { best = Math.abs(x - m); b = x; } }); m = b; }
          mel = m; harpsi(X, t, m, 0.065);
          if (third && s % 2 === 0) { const j = scale.indexOf(m); if (j > 1) harpsi(X, t, scale[j - 2], 0.035); }
        }
        n++; X.t += sd;
      }
    };
  };
  const noiseGen = (type, g, cut) => X => { const lp = filt(X, 'lowpass', cut, 0.3); lp.connect(X.inp); loopNoise(X, type, lp, g); X.wet.gain.value = 0; X.tick = h => { X.t = h; }; };
  const NZ = { brown: noiseGen('brown', 0.55, 1200), pink: noiseGen('pink', 0.42, 9000), white: noiseGen('white', 0.12, 7000) };
  GEN.noise = X => { const k = prefs().nz; X.nz = NZ[k] ? k : 'brown'; NZ[X.nz](X); };
  const NZL = [['brown', '🟤 Brown', 'Deep and rumbly'], ['pink', '🌸 Pink', 'Like a soft waterfall'], ['white', '⚪ White', 'Bright, kept low']];
  const AMBGEN = { rain: X => { const b = rainBed(X, 0.9); X.tick = h => b(h); }, ocean: X => { const b = oceanBed(X, 0.9); X.tick = h => b(h); }, cafe: X => { const b = cafeBed(X, 1); X.tick = h => b(h); } };

  /* ---------------- transport ---------------- */
  function setVol(v) { if (!A) return; A.master.gain.setTargetAtTime(Math.pow(v, 1.6) * 0.95, A.ctx.currentTime, 0.08); }
  function setMix(v) { if (A) A.ambBus.gain.setTargetAtTime(v * 0.9, A.ctx.currentTime, 0.1); syncAmb(); }
  function startStation(id) {
    if (!ensure()) { API && API.toast('Your browser cannot play generated audio here.'); return false; }
    if (cur) stopX(cur);
    const X = mkX(A.music, 0.25); try { GEN[id](X); } catch (e) { } cur = X; curId = id;
    return true;
  }
  function syncAmb() {
    if (!A) return; const p = prefs();
    if (playing && p.mix > 0.001) { if (!amb || ambId !== p.amb) { if (amb) stopX(amb); amb = mkX(A.ambBus, 0.3); ambId = p.amb; try { AMBGEN[p.amb](amb); } catch (e) { } } }
    else if (amb) { stopX(amb); amb = null; ambId = null; }
  }
  function play(id) {
    const p = prefs(); id = id || p.st;
    if (!ensure()) { API && API.toast('Audio is not available in this browser.'); return; }
    try { A.ctx.resume(); } catch (e) { }
    setVol(p.vol);
    if (curId !== id || !cur || (id === 'noise' && cur.nz !== p.nz)) startStation(id);
    playing = true; started = true; closed = false; syncAmb(); sync();
  }
  function pause() {
    playing = false; if (A) { const now = A.ctx.currentTime; A.master.gain.setTargetAtTime(0, now, 0.12); setTimeout(() => { if (!playing && A) { try { A.ctx.suspend(); } catch (e) { } } }, 600); }
    sync();
  }
  function closeAll() { pause(); closed = true; if (cur) { stopX(cur); cur = null; curId = null; } if (amb) { stopX(amb); amb = null; ambId = null; } sync(); }
  function softChime() {
    if (A && A.ctx.state === 'running') {
      const ctx = A.ctx, now = ctx.currentTime;
      [76, 83, 88].forEach((m, i) => { const t = now + i * 0.28, o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = mtof(m); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.12, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4); o.connect(g); g.connect(A.master); o.start(t); o.stop(t + 2.5); });
    } else if (API) API.chime('soft');
  }

  /* ---------------- pomodoro ---------------- */
  const P = { phase: 'idle', end: 0, left: 0, paused: false, done: 0, work: 25, brk: 5 };
  const fmt = s => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const pLeft = () => P.phase === 'idle' ? P.work * 60 : P.paused ? P.left : (P.end - Date.now()) / 1000;
  function pomoCfg() { const p = prefs(); if (p.pm === '50') { P.work = 50; P.brk = 10; } else if (p.pm === 'custom') { P.work = Math.max(1, Math.min(120, +p.cw || 30)); P.brk = Math.max(1, Math.min(60, +p.cb || 5)); } else { P.work = 25; P.brk = 5; } }
  function musicFade(to, secs) { if (A) A.music.gain.setTargetAtTime(to, A.ctx.currentTime, secs / 3); }
  function pomoTick() {
    if (P.phase === 'idle' || P.paused) return;
    if (Date.now() < P.end) return;
    softChime();
    if (P.phase === 'work') {
      P.done++; P.phase = 'break'; P.end = Date.now() + P.brk * 60000; musicFade(0.18, 3);
      if (API) { if (P.work >= 15) API.reward(3, 'Focus session complete'); else API.toast('Focus session complete. Take a short break.'); }
    } else { P.phase = 'work'; P.end = Date.now() + P.work * 60000; musicFade(1, 3); API && API.toast('Break over. Back to focus mode.'); }
    sync();
  }
  setInterval(() => { pomoTick(); syncTimer(); }, 500);

  /* ---------------- UI sync (no full re-render) ---------------- */
  const $ = s => document.querySelector(s);
  function phaseLabel() { return P.phase === 'idle' ? 'Ready' : (P.phase === 'work' ? 'Focus' : 'Break') + (P.paused ? ' (paused)' : ''); }
  function syncTimer() {
    const t = fmt(pLeft()), el = $('#mu-ptime'); if (el && el.textContent !== t) el.textContent = t;
    const ph = $('#mu-pphase'); if (ph) ph.textContent = phaseLabel();
    const mt = $('#mu-mini .mu-mtime'); if (mt) { const v = P.phase === 'idle' ? '' : t; if (mt.textContent !== v) mt.textContent = v; }
    updateMini();
  }
  function updateMini() {
    const mini = document.getElementById('mu-mini'); if (!mini) return;
    const inView = API && API.S.loc && API.S.loc.v === 'music';
    const show = started && !closed && !inView && (playing || cur);
    if (mini.hidden === !!show) mini.hidden = !show;
    mini.classList.toggle('on', playing);
  }
  function sync() {
    const p = prefs(), s = SBY[curId || p.st] || STATIONS[0];
    document.querySelectorAll('.mu-st').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === (curId || p.st))));
    const nm = $('#mu-name'); if (nm) nm.textContent = s.name;
    const ds = $('#mu-desc'); if (ds) ds.textContent = s.d;
    const rad = $('.mu-radio'); if (rad) rad.style.setProperty('--mu-lab', s.col);
    const lab = $('.mu-label'); if (lab) lab.textContent = s.icon;
    const rec = $('.mu-rec'); if (rec) rec.classList.toggle('on', playing);
    const arm = $('.mu-arm'); if (arm) arm.classList.toggle('on', playing);
    const pb = $('.mu-play'); if (pb) { pb.innerHTML = playing ? IC.pause + ' Pause' : IC.play + ' Play'; pb.setAttribute('aria-pressed', String(playing)); }
    const mini = document.getElementById('mu-mini');
    if (mini) {
      mini.querySelector('.mu-mname').textContent = s.name; mini.querySelector('.mu-micon').textContent = s.icon;
      const t = mini.querySelector('[data-px="toggle"]'); t.innerHTML = playing ? IC.pause : IC.play; t.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    }
    const ps = $('#mu-pstart'); if (ps) ps.textContent = P.phase === 'idle' ? '▶ Start focus' : P.paused ? '▶ Resume' : '⏸ Pause timer';
    syncTimer(); if (reduced()) drawOnce();
  }

  /* ---------------- visualiser ---------------- */
  let drawTok = 0, fbuf = null;
  function draw(cv) {
    const g = cv.getContext && cv.getContext('2d'); if (!g) return;
    const W = cv.width, H = cv.height; g.clearRect(0, 0, W, H);
    const N = 48; let data = null;
    if (A && playing) { if (!fbuf) fbuf = new Uint8Array(A.an.frequencyBinCount); A.an.getByteFrequencyData(fbuf); data = fbuf; }
    const bw = W / N, grad = g.createLinearGradient(0, H, 0, 0); grad.addColorStop(0, '#C99A1C'); grad.addColorStop(1, '#FFF0B3');
    g.fillStyle = grad;
    for (let i = 0; i < N; i++) {
      let v = 0.04;
      if (data) { const a = Math.floor(Math.pow(i / N, 1.6) * (data.length * 0.75)), b = Math.max(a + 1, Math.floor(Math.pow((i + 1) / N, 1.6) * (data.length * 0.75))); let s = 0; for (let k = a; k < b; k++) s += data[k]; v = Math.max(0.04, s / (b - a) / 255); }
      const bh = v * (H - 8); g.globalAlpha = 0.9; g.fillRect(i * bw + 1.5, H - bh - 2, bw - 3, bh);
    }
    g.globalAlpha = 1;
  }
  function drawOnce() { const cv = $('.mu-vis'); if (cv) draw(cv); }
  function loop(cv, tok) {
    if (tok !== drawTok || !cv.isConnected) return;
    draw(cv); requestAnimationFrame(() => loop(cv, tok));
  }

  /* ---------------- mini player ---------------- */
  function ensureMini() {
    if (document.getElementById('mu-mini')) return;
    const d = document.createElement('div'); d.id = 'mu-mini'; d.className = 'mu-mini'; d.hidden = true; d.setAttribute('role', 'region'); d.setAttribute('aria-label', 'Music mini-player');
    d.innerHTML = `<button type="button" class="mu-mgo" data-go="music" aria-label="Open the Music Room"><span class="mu-eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="mu-micon" aria-hidden="true">🎧</span><span class="mu-mname">Music</span><span class="mu-mtime"></span></button><button type="button" data-px="toggle" data-pv="music" aria-label="Pause music">${IC.pause}</button><button type="button" data-px="close" data-pv="music" aria-label="Stop music and close the mini-player">✕</button>`;
    document.body.appendChild(d);
  }

  /* ---------------- view ---------------- */
  function render(api) {
    API = api; const p = prefs(), s = SBY[curId || p.st] || STATIONS[0]; pomoCfg();
    const owned = x => !x.price || api.owns('mu-' + x.id);
    let grp = '', tiles = '';
    STATIONS.forEach(x => {
      if (x.grp !== grp) { grp = x.grp; tiles += `<div class="mu-grp" role="presentation">${api.esc(grp)}</div>`; }
      const lk = !owned(x);
      tiles += `<button type="button" class="tile mu-st ${lk ? 'locked' : ''}" data-px="station" data-k="${x.id}" aria-pressed="${x.id === (curId || p.st)}" aria-label="${api.esc(x.name + (lk ? ', locked, unlock for ' + x.price + ' coins' : ''))}">
        <span class="ticon" aria-hidden="true">${x.icon}</span><h3>${api.esc(x.name)}</h3><span class="meta">${api.esc(x.d)}</span>${lk ? `<span class="mu-tag">🔒 ${x.price} coins</span>` : x.price ? '<span class="mu-tag">✓ Unlocked</span>' : ''}</button>`;
    });
    return `<section class="hero mu-hero"><span class="eyebrow">Study space</span><h1><span aria-hidden="true">🎧</span> Music Room</h1>
      <p>Every note here is generated live by your browser, so it never repeats exactly and works offline. Pick a station, keep the volume low, and let it play while you move through the course.</p></section>
    <div class="mu-wrap">
      <div class="card mu-player"><div class="mu-radio" style="--mu-lab:${s.col}">
        <div class="mu-deck" aria-hidden="true"><div class="mu-rec ${playing ? 'on' : ''}"><div class="mu-label">${s.icon}</div></div><div class="mu-arm ${playing ? 'on' : ''}"></div></div>
        <div class="mu-side">
          <div class="mu-now"><span class="kicker" style="color:#FFE38A">Now playing</span><h2 id="mu-name">${api.esc(s.name)}</h2><p id="mu-desc">${api.esc(s.d)}</p></div>
          <canvas class="mu-vis" width="640" height="120" aria-hidden="true"></canvas>
          <div class="mu-ctl"><button type="button" class="btn gold mu-play" data-px="toggle" aria-pressed="${playing}">${playing ? IC.pause + ' Pause' : IC.play + ' Play'}</button>
            <label class="mu-rng"><span aria-hidden="true">🔉</span><span class="sr-only" style="position:absolute;left:-9999px">Volume</span><input type="range" id="mu-vol" min="0" max="1" step="0.01" value="${p.vol}" aria-label="Music volume"></label></div>
        </div></div></div>
      <div class="card"><div class="row" style="justify-content:space-between"><h2>Stations</h2><span class="hint">Locked stations are rewards: unlock them with coins.</span></div>
        <div class="mu-tiles">${tiles}</div>
        <div class="row"><span class="hint">Focus noise colour:</span><div class="chips" role="group" aria-label="Focus noise colour">${NZL.map(([k, n, t]) => `<button type="button" class="chip ${p.nz === k ? 'sel' : ''}" data-px="nz" data-k="${k}" aria-pressed="${p.nz === k}" title="${t}">${n}</button>`).join('')}</div></div></div>
      <div class="grid2">
        <div class="card"><h3>Ambience layer</h3><p class="hint">Blend background sound with any station. Slide to zero to turn it off.</p>
          <div class="chips" role="group" aria-label="Ambience sound">${AMBS.map(([k, n]) => `<button type="button" class="chip ${p.amb === k ? 'sel' : ''}" data-px="amb" data-k="${k}" aria-pressed="${p.amb === k}">${n}</button>`).join('')}</div>
          <label class="mu-rng"><span>Mix</span><input type="range" id="mu-mix" min="0" max="1" step="0.01" value="${p.mix}" aria-label="Ambience mix level"></label></div>
        <div class="card"><h3>Focus timer</h3>
          <div class="chips" role="group" aria-label="Timer length">${[['25', '25 / 5'], ['50', '50 / 10'], ['custom', 'Custom']].map(([k, n]) => `<button type="button" class="chip ${p.pm === k ? 'sel' : ''}" data-px="pmode" data-k="${k}" aria-pressed="${p.pm === k}">${n}</button>`).join('')}</div>
          ${p.pm === 'custom' ? `<div class="row"><label class="field" style="flex-direction:row;align-items:center;gap:6px">Focus <input class="mu-num" type="number" id="mu-cw" min="1" max="120" value="${P.work}"> min</label><label class="field" style="flex-direction:row;align-items:center;gap:6px">Break <input class="mu-num" type="number" id="mu-cb" min="1" max="60" value="${P.brk}"> min</label></div>` : ''}
          <div class="row" style="align-items:baseline"><span class="mu-pt" id="mu-ptime" role="timer" aria-live="off">${fmt(pLeft())}</span><span class="kicker" id="mu-pphase">${phaseLabel()}</span></div>
          <div class="row"><button type="button" class="btn go" id="mu-pstart" data-px="pstart">${P.phase === 'idle' ? '▶ Start focus' : P.paused ? '▶ Resume' : '⏸ Pause timer'}</button><button type="button" class="btn ghost" data-px="pskip">Skip phase</button><button type="button" class="btn ghost" data-px="preset">Reset</button></div>
          <p class="hint">Music fades down during breaks and a soft chime marks each change. Sessions completed today: <b>${P.done}</b>.</p></div>
      </div>
      <p class="hint">Study tip: songs with lyrics compete with the words you are reading. For close reading or keying in documents, choose an instrumental station or focus noise, and keep it quiet.</p>
    </div>`;
  }
  function mount(api, loc, stage) {
    API = api; ensureMini(); sync();
    const v = stage.querySelector('#mu-vol'), m = stage.querySelector('#mu-mix');
    if (v) { v.addEventListener('input', () => { prefs().vol = +v.value; if (playing) setVol(+v.value); }); v.addEventListener('change', saveP); }
    if (m) { m.addEventListener('input', () => { prefs().mix = +m.value; setMix(+m.value); }); m.addEventListener('change', saveP); }
    ['#mu-cw', '#mu-cb'].forEach((id, i) => { const el = stage.querySelector(id); if (el) el.addEventListener('change', () => { prefs()[i ? 'cb' : 'cw'] = Math.max(1, +el.value || 1); saveP(); if (P.phase === 'idle') { pomoCfg(); syncTimer(); } }); });
    const cv = stage.querySelector('.mu-vis');
    if (cv) { drawTok++; if (reduced()) draw(cv); else loop(cv, drawTok); }
  }
  function click(action, el, api) {
    API = api; const p = prefs();
    if (action === 'station') {
      const s = SBY[el.dataset.k]; if (!s) return;
      if (s.price && !api.owns('mu-' + s.id)) { let ok = false; try { ok = api.buy('mu-' + s.id, s.price, s.name + ' station'); } catch (e) { ok = api.owns('mu-' + s.id); } if (!ok) return; p.st = s.id; saveP(); play(s.id); api.render(); return; }
      p.st = s.id; saveP(); play(s.id); return;
    }
    if (action === 'nz') { p.nz = el.dataset.k; p.st = 'noise'; saveP(); document.querySelectorAll('[data-px="nz"]').forEach(b => { const on = b.dataset.k === p.nz; b.classList.toggle('sel', on); b.setAttribute('aria-pressed', String(on)); }); play('noise'); return; }
    if (action === 'toggle') { if (playing) pause(); else play(curId || p.st); return; }
    if (action === 'close') { closeAll(); return; }
    if (action === 'amb') { p.amb = el.dataset.k; saveP(); document.querySelectorAll('[data-px="amb"]').forEach(b => { const on = b.dataset.k === p.amb; b.classList.toggle('sel', on); b.setAttribute('aria-pressed', String(on)); }); if (p.mix < 0.05) { p.mix = 0.35; const mx = document.getElementById('mu-mix'); if (mx) mx.value = 0.35; setMix(0.35); } else syncAmb(); return; }
    if (action === 'pmode') { if (P.phase !== 'idle') { P.phase = 'idle'; P.paused = false; musicFade(1, 1); } p.pm = el.dataset.k; saveP(); pomoCfg(); api.render(); return; }
    if (action === 'pstart') {
      if (P.phase === 'idle') { pomoCfg(); P.phase = 'work'; P.paused = false; P.end = Date.now() + P.work * 60000; if (!playing) play(curId || p.st); api.toast(`Focus for ${P.work} minutes. You've got this.`); }
      else if (P.paused) { P.paused = false; P.end = Date.now() + P.left * 1000; }
      else { P.paused = true; P.left = (P.end - Date.now()) / 1000; }
      sync(); return;
    }
    if (action === 'pskip') { if (P.phase === 'idle') return; P.paused = false; P.end = Date.now() - 1; pomoTick(); return; }
    if (action === 'preset') { P.phase = 'idle'; P.paused = false; musicFade(1, 1); pomoCfg(); sync(); return; }
  }

  /* public API for other tools (play() must run inside a user click handler) */
  const unlocked = s => !s.price || !!(API ? API.owns('mu-' + s.id) : (window.COURSE_API && window.COURSE_API.owns('mu-' + s.id)));
  window.COURSE_MUSIC = {
    get stations() { return STATIONS.map(s => ({ id: s.id, name: s.name, icon: s.icon, locked: !unlocked(s), price: s.price || 0 })); },
    play(id) { if (!API && window.COURSE_API) API = window.COURSE_API; const s = SBY[id] || SBY[prefs().st]; if (!s || !unlocked(s)) return false; ensureMini(); prefs().st = s.id; saveP(); play(s.id); return playing; },
    stop() { closeAll(); },
    isPlaying() { return playing; },
    // diagnostics used by tests
    state: () => (A ? A.ctx.state : 'none'), station: () => curId,
    level: () => { if (!A) return 0; const b = new Uint8Array(A.an.frequencyBinCount); A.an.getByteFrequencyData(b); let t = 0; for (let i = 0; i < b.length; i++) t += b[i]; return t; },
    pomo: P
  };

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'music', title: 'Music Room', tile: { icon: '🎧', meta: 'Live-generated study music, ambience and a focus timer' },
    render, mount, click
  });
})();
