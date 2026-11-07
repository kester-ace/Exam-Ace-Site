/* Digital Media Unit 2: Glossary Puzzles (crossword, jigsaw, flashcards) — Developed by Kester Small */
(function () {
  const ROMAN = { M1: '1', M2: '2', M3: '3' };
  const KEYS = ['M1', 'M2', 'M3', 'ALL'];
  const G = () => window.COURSE_GLOSSARY || { cats: {}, terms: [] };
  const RM = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const short = k => k === 'MS' ? 'Manuscript signs' : k === 'ALL' ? 'All modules' : 'Module ' + ROMAN[k];
  const long = k => k === 'ALL' ? 'All modules' : k === 'MS' ? 'Manuscript signs & abbreviations' : `Module ${ROMAN[k]} · ${G().cats[k] || ''}`;
  const normK = k => KEYS.includes(k) ? k : 'ALL';
  const newSeed = () => 1 + Math.floor(Math.random() * 2147483000);
  function rng(seed) { let s = (+seed || 1) % 2147483647; if (s <= 0) s += 2147483646; return () => (s = s * 16807 % 2147483647) / 2147483647; }
  function shuf(a, R) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const deacc = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
  const store = api => { const S = api.S; S.pz = S.pz || {}; ['cw', 'done', 'best', 'jdone'].forEach(x => { S.pz[x] = S.pz[x] || {}; }); return S.pz; };
  let saveT = 0; const lazySave = api => { clearTimeout(saveT); saveT = setTimeout(() => api.save(), 350); };

  /* ---------------- glossary helpers ---------------- */
  const termsOf = k => G().terms.filter(t => k === 'ALL' || t.c === k);
  const baseTerm = t => String(t.t).replace(/\([^)]*\)/g, ' ').replace(/[⁁⁀\][#]/g, ' ').replace(/\s+/g, ' ').trim();
  const showTerm = t => String(t.t).replace(/\s*\(abbreviation\)/i, '').trim();
  function cleanDef(t, max) {
    let d = String((t.d || [''])[0] || '').replace(/^Abbreviation in a draft; key in full as:\s*/i, 'Draft abbreviation; type it in full as: ');
    const names = [baseTerm(t), showTerm(t)].filter(x => x && x.length > 2);
    names.forEach(n => { d = d.replace(new RegExp('(^|[^A-Za-z])' + reEsc(n) + '(e?s)?(?![A-Za-z])', 'gi'), '$1____'); });
    if (d.length > max) {
      const sen = d.match(/^.*?[.;](\s|$)/);
      if (sen && sen[0].trim().length >= 30 && sen[0].trim().length <= max) d = sen[0].trim();
      else { d = d.slice(0, max); d = d.slice(0, d.lastIndexOf(' ')).replace(/[,;:\s]+$/, '') + '…'; }
    }
    d = d.replace(/\s*;\s*$/, '.');
    return d;
  }
  function cwEntry(t) {
    if (/\d/.test(t.t)) return null;
    const b = deacc(baseTerm(t)); if (!b || /\//.test(b)) return null;
    const words = b.split(/\s+/).map(w => w.replace(/[^A-Za-z-]/g, '')).filter(w => /[A-Za-z]/.test(w));
    const ans = words.join('').replace(/[^A-Za-z]/g, '').toUpperCase();
    if (ans.length < 3 || ans.length > 15) return null;
    const en = words.map(w => w.split('-').map(p => p.replace(/[^A-Za-z]/g, '').length).filter(Boolean).join('-')).join(',');
    return { ans, en, clue: cleanDef(t, 150), term: showTerm(t), c: t.c };
  }

  /* ---------------- crossword generator ---------------- */
  const MAXW = 13, MAXH = 15, TARGET = 14, MINW = 10;
  function tryBuild(list, R) {
    const cells = new Map(), placed = []; const key = (r, c) => r * 4096 + c;
    let r0 = 0, r1 = 0, c0 = 0, c1 = 0, crosses = 0;
    const get = (r, c) => cells.get(key(r, c));
    function put(e, r, c, dir) {
      const dr = dir === 'd' ? 1 : 0, dc = dir === 'a' ? 1 : 0, wi = placed.length;
      for (let i = 0; i < e.ans.length; i++) { const rr = r + i * dr, cc = c + i * dc, k = key(rr, cc); const x = cells.get(k) || { ch: e.ans[i], r: rr, c: cc }; x[dir] = wi; cells.set(k, x); }
      placed.push({ e, r, c, dir });
      if (placed.length === 1) { r0 = r; c0 = c; r1 = r + (e.ans.length - 1) * dr; c1 = c + (e.ans.length - 1) * dc; }
      else { r0 = Math.min(r0, r); c0 = Math.min(c0, c); r1 = Math.max(r1, r + (e.ans.length - 1) * dr); c1 = Math.max(c1, c + (e.ans.length - 1) * dc); }
    }
    function fits(w, r, c, dir) {
      const dr = dir === 'd' ? 1 : 0, dc = dir === 'a' ? 1 : 0, L = w.length; let x = 0;
      if (get(r - dr, c - dc) || get(r + L * dr, c + L * dc)) return -1;
      for (let i = 0; i < L; i++) {
        const rr = r + i * dr, cc = c + i * dc, cell = get(rr, cc);
        if (cell) { if (cell.ch !== w[i] || cell[dir] != null) return -1; x++; }
        else if (get(rr + dc, cc + dr) || get(rr - dc, cc - dr)) return -1;
      }
      return x;
    }
    function best(e) {
      let top = null; const w = e.ans;
      cells.forEach(cell => {
        const dir = cell.a != null && cell.d == null ? 'd' : cell.d != null && cell.a == null ? 'a' : null; if (!dir) return;
        for (let i = 0; i < w.length; i++) {
          if (w[i] !== cell.ch) continue;
          const r = dir === 'd' ? cell.r - i : cell.r, c = dir === 'a' ? cell.c - i : cell.c;
          const x = fits(w, r, c, dir); if (x < 1) continue;
          const nr0 = Math.min(r0, r), nc0 = Math.min(c0, c), nr1 = Math.max(r1, dir === 'd' ? r + w.length - 1 : r), nc1 = Math.max(c1, dir === 'a' ? c + w.length - 1 : c);
          const H = nr1 - nr0 + 1, W = nc1 - nc0 + 1; if (W > MAXW || H > MAXH) continue;
          const grow = H * W - (r1 - r0 + 1) * (c1 - c0 + 1);
          const sc = x * 14 - grow * 0.12 - Math.max(0, W - 11) * 3 + R() * 4;
          if (!top || sc > top.sc) top = { r, c, dir, x, sc };
        }
      });
      return top;
    }
    put(list[0], 0, 0, R() < 0.5 ? 'a' : 'd');
    let rest = list.slice(1), prog = true;
    while (placed.length < TARGET && prog) {
      prog = false;
      for (const e of rest.slice()) {
        if (placed.length >= TARGET) break;
        const b = best(e); if (b) { put(e, b.r, b.c, b.dir); crosses += b.x; rest.splice(rest.indexOf(e), 1); prog = true; }
      }
    }
    return { placed, r0, c0, H: r1 - r0 + 1, W: c1 - c0 + 1, crosses };
  }
  function genCross(k, seed) {
    const R = rng(seed);
    const seen = new Set(), all = termsOf(k).map(cwEntry).filter(e => e && !seen.has(e.ans) && seen.add(e.ans));
    let bestRes = null, bestSc = -1e9;
    for (let at = 0; at < 48; at++) {
      let list = shuf(all, R); if (list.length > 70) list = list.slice(0, 70);
      const firsts = list.filter(e => e.ans.length >= 7 && e.ans.length <= 11); const f = firsts[0] || list[0];
      list = [f, ...list.filter(e => e !== f)];
      const res = tryBuild(list, R); if (!res.placed.length) continue;
      const sc = res.placed.length * 100 + res.crosses * 9 - res.W * res.H * 0.35 - Math.max(0, res.W - 11) * 15;
      if (sc > bestSc) { bestSc = sc; bestRes = res; }
      if (at > 14 && bestRes.placed.length >= TARGET && bestRes.crosses >= TARGET + 2) break;
    }
    const { placed, r0, c0, H, W } = bestRes;
    const grid = Array(H * W).fill(null);
    const words = placed.map(p => ({ ans: p.e.ans, en: p.e.en, clue: p.e.clue, term: p.e.term, r: p.r - r0, c: p.c - c0, dir: p.dir }));
    words.forEach((w, wi) => {
      for (let i = 0; i < w.ans.length; i++) {
        const r = w.r + (w.dir === 'd' ? i : 0), c = w.c + (w.dir === 'a' ? i : 0), ix = r * W + c;
        grid[ix] = grid[ix] || { ch: w.ans[i], a: null, d: null, num: 0 }; grid[ix][w.dir] = wi;
      }
    });
    const starts = [...new Set(words.map(w => w.r * W + w.c))].sort((a, b) => a - b);
    starts.forEach((ix, n) => { grid[ix].num = n + 1; });
    words.forEach(w => { w.num = grid[w.r * W + w.c].num; w.cells = []; for (let i = 0; i < w.ans.length; i++) w.cells.push((w.r + (w.dir === 'd' ? i : 0)) * W + w.c + (w.dir === 'a' ? i : 0)); });
    return { k, seed, rows: H, cols: W, grid, words };
  }

  /* ---------------- sound ---------------- */
  let AC = null;
  function snd(api, kind) {
    const P = store(api); if (P.mute || api.S.sound === false) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume();
      const t = AC.currentTime;
      const tone = (f, f2, d, type, vol, at) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = type; o.frequency.setValueAtTime(f, t + at); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + at + d); g.gain.setValueAtTime(0.0001, t + at); g.gain.exponentialRampToValueAtTime(vol, t + at + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + at + d); o.connect(g); g.connect(AC.destination); o.start(t + at); o.stop(t + at + d + 0.02); };
      if (kind === 'snap') { tone(2400, 900, 0.035, 'square', 0.08, 0); tone(220, 70, 0.09, 'sine', 0.35, 0.005); }
      else if (kind === 'wrong') { tone(180, 120, 0.16, 'sawtooth', 0.06, 0); }
      else if (kind === 'pick') { tone(900, 700, 0.04, 'triangle', 0.08, 0); }
      else if (kind === 'win') { [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, 0, 0.35, 'triangle', 0.12, i * 0.09)); }
      else if (kind === 'key') { tone(1300, 1000, 0.02, 'triangle', 0.035, 0); }
    } catch (e) { }
  }
  function confetti() {
    if (RM()) return;
    const L = document.createElement('div'); L.className = 'pz-conf'; L.setAttribute('aria-hidden', 'true');
    const C = ['#FFD766', '#F5C542', '#FFFFFF', '#4FD18B', '#7FB3FF', '#FF9ED1'];
    for (let i = 0; i < 70; i++) { const b = document.createElement('i'); b.style.left = Math.random() * 100 + 'vw'; b.style.background = C[i % C.length]; b.style.animationDelay = (Math.random() * 0.5) + 's'; b.style.animationDuration = (1.6 + Math.random() * 1.2) + 's'; b.style.transform = `rotate(${Math.random() * 360}deg)`; L.appendChild(b); }
    document.body.appendChild(L); setTimeout(() => L.remove(), 3400);
  }
  const live = msg => { const el = document.getElementById('pz-live'); if (el) { el.textContent = ''; setTimeout(() => { el.textContent = msg; }, 30); } };

  /* ---------------- CSS ---------------- */
  function css() {
    if (document.getElementById('pz-css')) return;
    const st = document.createElement('style'); st.id = 'pz-css';
    st.textContent = `
.pz-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.pz-modes{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
.pz-mode{position:relative;text-align:left;display:flex;flex-direction:column;gap:8px;padding:18px;border-radius:18px;border:1px solid var(--line,rgba(245,197,66,.22));background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,0) 45%),var(--surface,#0f1e4a);color:var(--ink,#F1F4FF);font:inherit;cursor:pointer;overflow:hidden;min-width:0}
.pz-mode:hover{border-color:var(--gold,#FFD766)}
.pz-mode h3{margin:0;font-size:1.15rem}.pz-mode p{margin:0;color:var(--muted,#AEB9DD);font-size:.9rem}
.pz-mode .pz-go{margin-top:auto;font-weight:700;color:var(--gold,#FFD766);font-size:.9rem}
.pz-mode svg.pz-art{width:64px;height:64px;flex:none}
.pz-stats{display:flex;flex-wrap:wrap;gap:8px}
.pz-stat{border:1px solid var(--line,rgba(245,197,66,.22));background:var(--raise,rgba(255,255,255,.06));border-radius:12px;padding:6px 12px;font-size:.86rem}
.pz-stat b{font-variant-numeric:tabular-nums;color:var(--gold,#FFD766)}
.pz-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.pz-bar .btn{padding:8px 14px;font-size:.9rem}
.pz-bar .sp{flex:1}
.pz-head{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:baseline;justify-content:space-between}
.pz-head h2{margin:0;font-size:clamp(1.25rem,3.4vw,1.6rem)}
.pz-tag{font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--gold,#FFD766)}
/* crossword */
.pz-cw{display:grid;grid-template-columns:minmax(0,1fr);gap:18px;align-items:start}
@media (min-width:820px){.pz-cw{grid-template-columns:minmax(0,1.12fr) minmax(0,1fr)}}
.pz-clueb{display:flex;align-items:stretch;gap:6px;background:linear-gradient(180deg,#FFF3C9,#FFE08A);color:#0A1433;border-radius:12px;padding:6px;min-height:52px;margin-bottom:10px;box-shadow:0 3px 0 #B98A12}
.pz-clueb button{flex:none;border:0;border-radius:9px;background:rgba(10,20,51,.1);color:#0A1433;width:34px;font-size:1.1rem;font-weight:800;cursor:pointer}
.pz-clueb button:hover{background:rgba(10,20,51,.2)}
.pz-clueb .t{flex:1;align-self:center;font-size:.93rem;line-height:1.35;padding:2px 4px}
.pz-clueb .t b{font-family:var(--f-display,inherit);margin-right:6px}
.pz-gw{container-type:inline-size;position:relative;width:min(100%,calc(var(--cols) * 40px));margin:0 auto}
.pz-grid{display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));gap:2px;user-select:none;-webkit-user-select:none;touch-action:manipulation}
.pz-x{aspect-ratio:1}
.pz-c{position:relative;aspect-ratio:1;background:#FFF9EA;border-radius:3px;box-shadow:0 0 0 1.5px #0A1433,0 2px 0 1px rgba(0,0,0,.35);cursor:pointer;display:grid;place-items:center;color:#0A1433;font-family:var(--f-display,system-ui);font-weight:800;font-size:calc(100cqw / var(--cols) * .56);line-height:1;transition:background .12s}
.pz-c .n{position:absolute;top:1px;left:2px;font-size:max(7px,calc(100cqw / var(--cols) * .25));font-weight:700;line-height:1;color:#33406a;font-family:system-ui,sans-serif}
.pz-c.w{background:#FFE7A3}.pz-c.cur{background:#FFC53D;box-shadow:0 0 0 2px #0A1433,0 0 0 4px var(--gold,#FFD766),0 2px 0 1px rgba(0,0,0,.35);z-index:1}
.pz-c.bad{color:#B42318;background:#FFD5CC}.pz-c.bad.cur{background:#FFB4A6}
.pz-c.rev .l{color:#1B4FBF}.pz-c.rev::after{content:'';position:absolute;right:0;top:0;border:solid transparent;border-width:0 6px 6px 0;border-right-color:#1B4FBF;border-radius:0 3px 0 0}
.pz-gw.won .pz-c{background:#DDF6E7}
.pz-gw.won .pz-c{animation:pzwave .6s ease-out both}
@keyframes pzwave{0%{transform:scale(1)}40%{transform:scale(1.14)}100%{transform:scale(1)}}
.pz-hin{position:absolute;opacity:0;border:0;padding:0;margin:0;background:transparent;color:transparent;caret-color:transparent;font-size:16px;pointer-events:none;width:20px;height:20px;top:0;left:0}
.pz-gw:focus-within .pz-c.cur{outline:3px solid #fff;outline-offset:1px}
.pz-clues{display:grid;grid-template-columns:minmax(0,1fr);gap:14px}
@media (min-width:560px) and (max-width:819px){.pz-clues{grid-template-columns:1fr 1fr}}
@media (min-width:820px){.pz-clues{max-height:640px;overflow:auto;padding-right:4px}}
.pz-clues h3{margin:0 0 6px;font-size:1rem;color:var(--gold,#FFD766);letter-spacing:.06em;text-transform:uppercase}
.pz-clues ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
.pz-cl{display:flex;gap:8px;width:100%;text-align:left;background:transparent;border:0;border-radius:10px;padding:6px 8px;color:var(--ink,#F1F4FF);font:inherit;font-size:.9rem;line-height:1.38;cursor:pointer}
.pz-cl:hover{background:var(--raise,rgba(255,255,255,.06))}
.pz-cl b{flex:none;min-width:1.6em;font-variant-numeric:tabular-nums;color:var(--gold,#FFD766)}
.pz-cl .e{color:var(--muted,#AEB9DD);white-space:nowrap}
.pz-cl.on{background:var(--soft-gold,rgba(255,215,102,.16));box-shadow:inset 3px 0 0 var(--gold,#FFD766)}
.pz-cl.full{opacity:.6}.pz-cl.full span:not(.e){text-decoration:line-through;text-decoration-color:rgba(255,215,102,.5)}
.pz-win{border-radius:16px;padding:16px 18px;background:linear-gradient(135deg,rgba(79,209,139,.22),rgba(255,215,102,.18));border:1px solid rgba(79,209,139,.5);display:flex;flex-direction:column;gap:10px}
.pz-win h3{margin:0}
#pz-print{display:none}
@media print{body *{visibility:hidden!important}#pz-print,#pz-print *{visibility:visible!important}#pz-print{display:block!important;position:absolute;left:0;top:0;width:100%;background:#fff;color:#000;font:12px/1.4 Arial,sans-serif;padding:10px}
#pz-print h1{font-size:18px;margin:0 0 2px}#pz-print table{border-collapse:collapse;margin:10px 0}#pz-print td{width:26px;height:26px;padding:0;position:relative;border:1px solid #000;vertical-align:top}#pz-print td.x{border:0}#pz-print td span{font-size:8px;position:absolute;top:1px;left:2px}#pz-print .cols{columns:2;column-gap:24px}#pz-print .cols div{break-inside:avoid;margin:0 0 4px}#pz-print h2{font-size:13px;margin:8px 0 4px}}
/* jigsaw */
.pz-jig{display:grid;grid-template-columns:minmax(0,1fr);grid-template-areas:"tray" "board";gap:16px;align-items:start}
@media (min-width:760px){.pz-jig{grid-template-columns:minmax(0,1fr) 250px;grid-template-areas:"board tray"}}
.pz-jig.fin{grid-template-columns:minmax(0,1fr);grid-template-areas:"board"}
.pz-jig.fin .pz-row{--slot:34%}
.pz-board{grid-area:board;display:flex;flex-direction:column;gap:22px;padding:10px 4px 10px 2px;position:relative;transition:gap .45s ease}
.pz-tray{grid-area:tray;position:sticky;top:8px;z-index:3;display:flex;flex-wrap:wrap;gap:24px 30px;align-content:flex-start;padding:22px 30px 22px 12px;border-radius:16px;border:1px dashed var(--line,rgba(245,197,66,.3));background:color-mix(in srgb,var(--surface,#0f1e4a) 94%,transparent);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);min-height:80px}
.pz-tray .pz-empty{color:var(--muted,#AEB9DD);font-size:.9rem;align-self:center}
.pz-tray .pz-tt{flex-basis:100%;font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--muted,#AEB9DD);margin:-6px 0 -10px}
.pz-row{display:grid;grid-template-columns:var(--slot,172px) minmax(0,1fr);min-height:64px}
@media (max-width:520px){.pz-row{--slot:38%}}
.pz-slot{position:relative;display:flex}
.pz-slot svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.pz-slot .ph{margin:auto;font-size:.76rem;color:var(--muted,#AEB9DD);text-align:center;padding:0 10px;opacity:.75}
.pz-pc{position:relative;border:0;background:transparent;font:inherit;padding:0;margin:0;text-align:left;cursor:pointer;display:flex;-webkit-tap-highlight-color:transparent;outline:none}
.pz-pc>svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none;filter:drop-shadow(0 3px 0 rgba(0,0,0,.35)) drop-shadow(0 8px 10px rgba(0,0,0,.25))}
.pz-pc>svg>path{stroke-linejoin:round;transition:stroke .15s,stroke-width .15s}
.pz-pc .pz-tx{position:relative;z-index:1;transition:opacity .4s}
.pz-term{touch-action:none;min-width:96px;max-width:100%;min-height:58px;color:#0A1433;font-weight:800;font-family:var(--f-display,inherit);font-size:.95rem;line-height:1.2}
.pz-term .pz-tx{padding:21px 12px 21px 12px;margin:auto 0;overflow-wrap:anywhere}
.pz-term>svg>path{fill:url(#pz-gT);stroke:#8A6408;stroke-width:1.4}
.pz-term:hover>svg>path{stroke:#fff}
.pz-term.sel>svg>path,.pz-term:focus-visible>svg>path{stroke:#fff;stroke-width:3.2}
.pz-term.sel>svg,.pz-term:focus-visible>svg{filter:drop-shadow(0 0 6px rgba(255,255,255,.7)) drop-shadow(0 6px 10px rgba(0,0,0,.4))}
.pz-term.drag{position:fixed!important;z-index:9999;cursor:grabbing;margin:0;pointer-events:none}
.pz-term.drag>svg{filter:drop-shadow(0 14px 16px rgba(0,0,0,.5))}
.pz-term.locked{flex:1;cursor:default;min-width:0}
.pz-term.locked .pz-tx{padding:21px 10px 21px 12px;font-size:.9rem}
.pz-def{flex:1;min-width:0;color:#F4F6FF;font-size:.88rem;line-height:1.4}
.pz-def .pz-tx{padding:21px 14px 21px 30px;margin:auto 0}
.pz-def>svg>path{fill:url(#pz-gD);stroke:rgba(255,215,102,.55);stroke-width:1.4}
.pz-def:hover>svg>path,.pz-row.hot .pz-def>svg>path{stroke:var(--gold,#FFD766);stroke-width:2.6}
.pz-def.sel>svg>path,.pz-def:focus-visible>svg>path{stroke:#fff;stroke-width:3.2}
.pz-row.joined .pz-def{cursor:default}
.pz-row.joined .pz-def>svg>path{stroke:rgba(255,215,102,.85)}
.pz-row.shake .pz-def{animation:pzshake .38s}
@keyframes pzshake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(3px)}}
.pz-board.done{gap:0}
.pz-board.done .pz-row{transition:none}
.pz-board.pic .pz-pc .pz-tx{opacity:0}
.pz-board.pic .pz-pc>svg{filter:none}
.pz-board.pic .pz-pc>svg>path{stroke:rgba(255,255,255,.22);stroke-width:1}
.pz-board.pic .pz-slot .ph{display:none}
.pz-board.pic{filter:drop-shadow(0 18px 24px rgba(0,0,0,.45))}
.pz-time{font-variant-numeric:tabular-nums}
.pz-mute[aria-pressed="true"]{opacity:.7}
.pz-review{display:grid;grid-template-columns:minmax(0,max-content) minmax(0,1fr);gap:6px 14px;font-size:.9rem}
.pz-review dt{font-weight:800;color:var(--gold,#FFD766)}.pz-review dd{margin:0;color:var(--ink,#F1F4FF)}
/* flashcards */
.pz-fcw{perspective:1200px;max-width:620px;width:100%;margin:0 auto}
.pz-fc{position:relative;width:100%;min-height:250px;border:0;background:transparent;padding:0;cursor:pointer;transform-style:preserve-3d;transition:transform .55s cubic-bezier(.2,.7,.2,1);font:inherit;color:inherit;display:grid}
.pz-fc.on{transform:rotateY(180deg)}
.pz-fc .f{grid-area:1/1;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:22px;padding:28px 26px;display:flex;flex-direction:column;justify-content:center;gap:10px;text-align:center;border:1px solid var(--line,rgba(245,197,66,.3));box-shadow:0 18px 40px -18px rgba(0,0,0,.85)}
.pz-fc .f1{background:radial-gradient(420px 200px at 85% 0%,rgba(245,197,66,.32),transparent 70%),linear-gradient(160deg,#122a6b,#0a1638 70%);color:#fff}
.pz-fc .f1 .tt{font-family:var(--f-display,inherit);font-weight:800;font-size:clamp(1.5rem,6vw,2.3rem);line-height:1.15}
.pz-fc .f2{transform:rotateY(180deg);background:linear-gradient(180deg,#FFF8E2,#FFE9A8);color:#0A1433;font-size:1.05rem;line-height:1.5}
.pz-fc .k{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700;opacity:.75}
.pz-fc:focus-visible .f{outline:3px solid var(--gold,#FFD766);outline-offset:3px}
.pz-conf{position:fixed;inset:0;pointer-events:none;z-index:10000;overflow:hidden}
.pz-conf i{position:absolute;top:-14px;width:9px;height:14px;border-radius:2px;animation:pzfall linear forwards}
@keyframes pzfall{to{transform:translateY(105vh) rotate(720deg);opacity:.9}}
@media (prefers-reduced-motion:reduce){.pz-fc,.pz-board,.pz-c,.pz-pc>svg>path,.pz-pc .pz-tx{transition:none!important}.pz-gw.won .pz-c,.pz-row.shake .pz-def{animation:none!important}}
`;
    document.head.appendChild(st);
  }

  /* ---------------- hub ---------------- */
  const ART = {
    cross: `<svg class="pz-art" viewBox="0 0 64 64" aria-hidden="true"><rect x="2" y="2" width="60" height="60" rx="14" fill="#0B1A46" stroke="#F5C542" stroke-opacity=".5"/>${[[1, 0], [1, 1], [1, 2], [1, 3], [0, 1], [2, 1], [3, 1], [3, 2], [3, 3], [2, 3]].map(([r, c]) => `<rect x="${10 + c * 11}" y="${10 + r * 11}" width="10" height="10" rx="2" fill="#FFF9EA"/>`).join('')}<rect x="21" y="21" width="10" height="10" rx="2" fill="#FFC53D"/></svg>`,
    jig: `<svg class="pz-art" viewBox="0 0 64 64" aria-hidden="true"><rect x="2" y="2" width="60" height="60" rx="14" fill="#0B1A46" stroke="#F5C542" stroke-opacity=".5"/><path d="M12 18h12c0-6 8-6 8 0h0v12c6 0 6 8 0 8v8H12z" fill="#F5C542" stroke="#8A6408"/><path d="M33 18h19v28H33v-8c6 0 6-8 0-8z" fill="#1d3a86" stroke="#FFD766" stroke-opacity=".7"/></svg>`,
    flash: `<svg class="pz-art" viewBox="0 0 64 64" aria-hidden="true"><rect x="2" y="2" width="60" height="60" rx="14" fill="#0B1A46" stroke="#F5C542" stroke-opacity=".5"/><rect x="16" y="14" width="34" height="24" rx="4" fill="#1d3a86" stroke="#FFD766" stroke-opacity=".7" transform="rotate(-8 33 26)"/><rect x="14" y="24" width="36" height="26" rx="4" fill="#FFF3C9"/><path d="M21 33h22M21 39h16" stroke="#0A1433" stroke-width="2.4" stroke-linecap="round"/></svg>`
  };
  function hubHTML(api, loc) {
    const P = store(api), esc = api.esc, k = normK(loc.k || P.lastK || 'ALL'); P.lastK = k;
    const n = termsOf(k).length, nx = termsOf(k).map(cwEntry).filter(Boolean).length;
    const solved = Object.keys(P.done).filter(x => x.split(':')[0] === k).length, best = P.best[k];
    return `<div class="hero"><span class="eyebrow">Glossary games</span><h1>Glossary Puzzles</h1><p>Crosswords, a jigsaw matching game and flashcards built from the ${G().terms.length} terms in the Digital Media glossary. Pick a module, then choose a puzzle.</p></div>
    <div class="card" data-notc><div class="pz-head"><h2>1. Choose a module</h2><span class="hint">${n} terms · ${nx} fit a crossword</span></div>
      <div class="chips" role="group" aria-label="Glossary module">${KEYS.map(x => `<button type="button" class="chip ${x === k ? 'sel' : ''}" data-go="puzzles" data-k="${x}" aria-pressed="${x === k}" title="${esc(long(x))}">${esc(short(x))}</button>`).join('')}</div>
      <p class="hint" style="margin:0"><b>${esc(long(k))}</b></p></div>
    <div class="card" data-notc><h2 style="margin:0">2. Choose a puzzle</h2>
      <div class="pz-modes">
        <button type="button" class="pz-mode" data-go="puzzles" data-tab="cross" data-k="${k}">${ART.cross}<h3>Crossword</h3><p>An interlocking grid of 10 to 14 glossary terms. Definitions are the clues.</p><span class="pz-go">Play crossword →</span></button>
        <button type="button" class="pz-mode" data-go="puzzles" data-tab="jig" data-k="${k}">${ART.jig}<h3>Jigsaw match</h3><p>Join each term piece to its definition piece. Beat your best time.</p><span class="pz-go">Play jigsaw →</span></button>
        <button type="button" class="pz-mode" data-go="puzzles" data-tab="flash" data-k="${k}">${ART.flash}<h3>Flashcards</h3><p>Quick revision: see the term, recall the meaning, flip to check.</p><span class="pz-go">Open flashcards →</span></button>
      </div>
      <div class="pz-stats"><span class="pz-stat">Crosswords solved here: <b>${solved}</b></span><span class="pz-stat">Best jigsaw time: <b>${best ? fmt(best) : '—'}</b></span><span class="pz-stat">All crosswords solved: <b>${Object.keys(P.done).length}</b></span></div>
    </div>`;
  }
  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const crumbs = (api, k, title) => `<div class="crumbs"><button type="button" class="linkbtn" data-go="puzzles" data-k="${k}">← Glossary Puzzles</button><span>${api.esc(title)}</span></div>`;

  /* ---------------- crossword view ---------------- */
  let CW = null;
  function cwLoad(api, loc) {
    const P = store(api), k = normK(loc.k); let seed = +loc.seed || 0;
    const saved = P.cw[k];
    if (!seed) seed = saved && saved.seed ? saved.seed : newSeed();
    if (!CW || CW.k !== k || CW.seed !== seed) {
      CW = genCross(k, seed);
      const n = CW.grid.length;
      CW.fill = Array(n).fill(''); CW.rev = new Set(); CW.bad = new Set();
      if (saved && saved.seed === seed && Array.isArray(saved.fill)) { saved.fill.forEach((x, i) => { if (i < n && x && CW.grid[i]) CW.fill[i] = x; }); (saved.rev || []).forEach(i => CW.rev.add(i)); }
      else P.cw[k] = { seed, fill: [], rev: [] };
      const w0 = CW.words.slice().sort((a, b) => a.num - b.num || (a.dir === 'a' ? -1 : 1))[0];
      CW.dir = w0.dir; CW.cur = w0.cells[0];
      CW.won = CW.grid.every((c, i) => !c || CW.fill[i] === c.ch);
    }
    loc.seed = seed; return CW;
  }
  const curWord = () => { const c = CW.grid[CW.cur]; const wi = c[CW.dir] != null ? c[CW.dir] : c[CW.dir === 'a' ? 'd' : 'a']; return wi; };
  const dirName = d => d === 'a' ? 'Across' : 'Down';
  function cwHTML(api, loc) {
    const esc = api.esc; cwLoad(api, loc);
    const { rows, cols, grid, words } = CW;
    const cellsH = grid.map((c, i) => c ? `<div class="pz-c" data-pzc="${i}" aria-hidden="true">${c.num ? `<span class="n">${c.num}</span>` : ''}<span class="l">${esc(CW.fill[i] || '')}</span></div>` : `<div class="pz-x"></div>`).join('');
    const list = d => words.map((w, i) => [w, i]).filter(([w]) => w.dir === d).sort((a, b) => a[0].num - b[0].num).map(([w, i]) => `<li><button type="button" class="pz-cl" data-pzclue="${i}"><b>${w.num}</b><span>${esc(w.clue)} <span class="e">(${w.en})</span></span></button></li>`).join('');
    return `${crumbs(api, CW.k, 'Crossword')}
    <div class="card" data-notc>
      <div class="pz-head"><div><span class="pz-tag">Crossword · ${esc(short(CW.k))}</span><h2>${esc(CW.k === 'ALL' ? 'Whole-glossary crossword' : CW.k === 'MS' ? 'Manuscript signs & abbreviations' : G().cats[CW.k] || '')}</h2></div><span class="hint">${words.length} words · ${cols}×${rows} grid · puzzle #${String(CW.seed).slice(-5)}</span></div>
      <div class="pz-bar" role="toolbar" aria-label="Crossword tools">
        <button type="button" class="btn go" data-pzcw="check">Check</button>
        <button type="button" class="btn ghost" data-pzcw="rl">Reveal letter</button>
        <button type="button" class="btn ghost" data-pzcw="rw">Reveal word</button>
        <span class="sp"></span>
        <button type="button" class="btn ghost" data-pzcw="new">New puzzle</button>
        <button type="button" class="btn ghost" data-pzcw="print">Print</button>
      </div>
      <div id="pz-win" class="pz-win" ${CW.won ? '' : 'hidden'}><h3>Puzzle solved. Well done!</h3><p style="margin:0">Every answer is correct. Try a fresh grid or switch module.</p><div class="row"><button type="button" class="btn go" data-pzcw="new">New puzzle</button><button type="button" class="btn ghost" data-go="puzzles" data-tab="jig" data-k="${CW.k}">Try the jigsaw</button></div></div>
      <div class="pz-cw">
        <div>
          <div class="pz-clueb"><button type="button" data-pzcw="prev" aria-label="Previous clue">‹</button><div class="t" id="pz-cb" aria-hidden="true"></div><button type="button" data-pzcw="next" aria-label="Next clue">›</button></div>
          <div class="pz-gw ${CW.won ? 'won' : ''}" id="pz-gw" style="--cols:${cols}" role="group" aria-label="Crossword grid, ${cols} columns by ${rows} rows. Type letters; use the arrow keys to move; space switches direction.">
            <div class="pz-grid" id="pz-grid">${cellsH}</div>
            <input class="pz-hin" id="pz-hin" type="text" value=" " autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" enterkeyhint="next" aria-label="Crossword answer entry">
          </div>
          <p class="hint" style="text-align:center;margin:10px 0 0">Tap a square to type. Tap it again to switch between Across and Down.</p>
        </div>
        <div class="pz-clues"><div><h3>Across</h3><ol>${list('a')}</ol></div><div><h3>Down</h3><ol>${list('d')}</ol></div></div>
      </div>
      <div id="pz-live" class="pz-sr" aria-live="polite"></div>
    </div>
    <div id="pz-print" aria-hidden="true"></div>`;
  }
  function cwPaint() {
    const gw = document.getElementById('pz-gw'); if (!gw || !CW) return;
    const wi = curWord(), w = CW.words[wi], on = new Set(w.cells);
    gw.querySelectorAll('[data-pzc]').forEach(el => {
      const i = +el.dataset.pzc; el.classList.toggle('w', on.has(i)); el.classList.toggle('cur', i === CW.cur);
      el.classList.toggle('bad', CW.bad.has(i)); el.classList.toggle('rev', CW.rev.has(i));
      const l = el.querySelector('.l'); if (l.textContent !== (CW.fill[i] || '')) l.textContent = CW.fill[i] || '';
    });
    document.querySelectorAll('[data-pzclue]').forEach(b => { const j = +b.dataset.pzclue; b.classList.toggle('on', j === wi); b.classList.toggle('full', CW.words[j].cells.every(i => CW.fill[i])); });
    const cb = document.getElementById('pz-cb'); if (cb) cb.innerHTML = `<b>${w.num} ${dirName(w.dir)}</b>${escH(w.clue)} <span style="opacity:.7">(${w.en})</span>`;
    const inp = document.getElementById('pz-hin'), cel = gw.querySelector(`[data-pzc="${CW.cur}"]`);
    if (inp && cel) {
      inp.style.left = cel.offsetLeft + 'px'; inp.style.top = cel.offsetTop + 'px'; inp.style.width = cel.offsetWidth + 'px'; inp.style.height = cel.offsetHeight + 'px';
      const pos = w.cells.indexOf(CW.cur) + 1;
      inp.setAttribute('aria-label', `${w.num} ${dirName(w.dir)}, ${w.ans.length} letters (${w.en}): ${w.clue}. Square ${pos} of ${w.ans.length}${CW.fill[CW.cur] ? ', contains ' + CW.fill[CW.cur] : ', empty'}.`);
    }
    const clEl = document.querySelector(`[data-pzclue="${wi}"]`), box = clEl && clEl.closest('.pz-clues');
    if (clEl && box && box.scrollHeight > box.clientHeight + 4) { const r = clEl.offsetTop - box.offsetTop; if (r < box.scrollTop || r > box.scrollTop + box.clientHeight - 40) box.scrollTop = r - 60; }
  }
  const escH = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function cwFocus() { const inp = document.getElementById('pz-hin'); if (inp) { try { inp.focus({ preventScroll: true }); } catch (e) { inp.focus(); } inp.value = ' '; try { inp.setSelectionRange(1, 1); } catch (e) { } } }
  function cwSave(api) { const P = store(api); P.cw[CW.k] = { seed: CW.seed, fill: CW.fill.slice(), rev: [...CW.rev] }; lazySave(api); }
  function cwSelect(i, dir) {
    const c = CW.grid[i]; if (!c) return;
    if (dir && c[dir] != null) CW.dir = dir; else if (c[CW.dir] == null) CW.dir = CW.dir === 'a' ? 'd' : 'a';
    CW.cur = i; cwPaint();
  }
  function cwMove(dr, dc) {
    const want = dc ? 'a' : 'd', c = CW.grid[CW.cur];
    if (CW.dir !== want && c[want] != null) { CW.dir = want; cwPaint(); return; }
    let r = Math.floor(CW.cur / CW.cols), col = CW.cur % CW.cols;
    while (true) { r += dr; col += dc; if (r < 0 || col < 0 || r >= CW.rows || col >= CW.cols) return; const ix = r * CW.cols + col; if (CW.grid[ix]) { cwSelect(ix, want); return; } }
  }
  function cwType(api, ch) {
    if (CW.won) return;
    CW.fill[CW.cur] = ch; CW.bad.delete(CW.cur); CW.rev.delete(CW.cur); snd(api, 'key');
    const w = CW.words[curWord()], p = w.cells.indexOf(CW.cur);
    CW.cur = p < w.cells.length - 1 ? w.cells[p + 1] : CW.cur; cwSave(api); cwPaint(); cwWinCheck(api);
  }
  function cwBack(api) {
    if (CW.won) return;
    const w = CW.words[curWord()], p = w.cells.indexOf(CW.cur);
    if (CW.fill[CW.cur]) CW.fill[CW.cur] = '';
    else if (p > 0) { CW.cur = w.cells[p - 1]; CW.fill[CW.cur] = ''; }
    CW.bad.delete(CW.cur); CW.rev.delete(CW.cur); cwSave(api); cwPaint();
  }
  function cwStepWord(d) {
    const order = CW.words.map((w, i) => i).sort((a, b) => (CW.words[a].dir === CW.words[b].dir ? 0 : CW.words[a].dir === 'a' ? -1 : 1) || CW.words[a].num - CW.words[b].num);
    const at = order.indexOf(curWord()), j = order[(at + d + order.length) % order.length], w = CW.words[j];
    CW.dir = w.dir; CW.cur = w.cells.find(i => !CW.fill[i]) ?? w.cells[0]; cwPaint();
    live(`${w.num} ${dirName(w.dir)}: ${w.clue}`);
  }
  function cwWinCheck(api) {
    if (CW.won || !CW.grid.every((c, i) => !c || CW.fill[i] === c.ch)) return;
    CW.won = true; const P = store(api), key = CW.k + ':' + CW.seed;
    const gw = document.getElementById('pz-gw'); if (gw) gw.classList.add('won');
    const wn = document.getElementById('pz-win'); if (wn) wn.hidden = false;
    snd(api, 'win'); confetti(); live('Puzzle solved. Every answer is correct.');
    if (!P.done[key]) { P.done[key] = Date.now(); const pts = CW.rev.size ? 5 : 15; api.save(); setTimeout(() => api.reward(pts, CW.rev.size ? 'Crossword solved (with reveals)' : 'Crossword solved', { xp: pts }), 500); }
    else api.toast('Puzzle solved again. Nice work!');
  }
  function cwAct(api, a) {
    if (a === 'new') { const s = newSeed(); store(api).cw[CW.k] = { seed: s, fill: [], rev: [] }; api.go({ v: 'puzzles', tab: 'cross', k: CW.k, seed: s }); return; }
    if (a === 'print') { cwPrint(api); return; }
    if (a === 'prev' || a === 'next') { cwStepWord(a === 'next' ? 1 : -1); cwFocus(); return; }
    if (CW.won) { api.toast('This puzzle is already solved.'); return; }
    if (a === 'check') {
      CW.bad = new Set(); let empty = 0;
      CW.grid.forEach((c, i) => { if (!c) return; if (!CW.fill[i]) empty++; else if (CW.fill[i] !== c.ch) CW.bad.add(i); });
      cwPaint();
      const msg = CW.bad.size ? `${CW.bad.size} letter${CW.bad.size === 1 ? ' is' : 's are'} wrong (shown in red).` : empty ? `All letters so far are correct. ${empty} square${empty === 1 ? '' : 's'} still empty.` : 'All correct!';
      api.toast(msg); live(msg); cwFocus(); return;
    }
    if (a === 'rl') { const c = CW.grid[CW.cur]; CW.fill[CW.cur] = c.ch; CW.rev.add(CW.cur); CW.bad.delete(CW.cur); cwSave(api); cwPaint(); cwWinCheck(api); cwFocus(); return; }
    if (a === 'rw') { const w = CW.words[curWord()]; w.cells.forEach(i => { if (CW.fill[i] !== CW.grid[i].ch) { CW.fill[i] = CW.grid[i].ch; CW.rev.add(i); } CW.bad.delete(i); }); cwSave(api); cwPaint(); live(`Revealed: ${w.ans}`); cwWinCheck(api); cwFocus(); }
  }
  function cwPrint(api) {
    const el = document.getElementById('pz-print'); if (!el) return; const esc = api.esc;
    let t = '<table>';
    for (let r = 0; r < CW.rows; r++) { t += '<tr>'; for (let c = 0; c < CW.cols; c++) { const x = CW.grid[r * CW.cols + c]; t += x ? `<td>${x.num ? `<span>${x.num}</span>` : ''}</td>` : '<td class="x"></td>'; } t += '</tr>'; }
    t += '</table>';
    const L = d => CW.words.filter(w => w.dir === d).sort((a, b) => a.num - b.num).map(w => `<div><b>${w.num}</b> ${esc(w.clue)} (${w.en})</div>`).join('');
    el.innerHTML = `<h1>Digital Media Glossary Crossword · ${esc(long(CW.k))}</h1><div>Name: ______________________ &nbsp; Class: ________ &nbsp; Puzzle #${String(CW.seed).slice(-5)}</div>${t}<div class="cols"><h2>Across</h2>${L('a')}<h2>Down</h2>${L('d')}</div><p style="margin-top:14px;font-size:10px">Digital Media Unit 2 · Kester Small</p>`;
    try { window.print(); } catch (e) { api.toast('Printing is not available here.'); }
  }
  function cwMount(api, stage) {
    const inp = stage.querySelector('#pz-hin'); if (!inp) return;
    inp.addEventListener('keydown', e => {
      if (e.ctrlKey || e.metaKey || e.altKey) return; const k = e.key;
      if (/^[a-zA-Z]$/.test(k)) { e.preventDefault(); cwType(api, k.toUpperCase()); }
      else if (k === 'Backspace') { e.preventDefault(); cwBack(api); }
      else if (k === 'Delete') { e.preventDefault(); if (!CW.won) { CW.fill[CW.cur] = ''; CW.bad.delete(CW.cur); cwSave(api); cwPaint(); } }
      else if (k === 'ArrowLeft') { e.preventDefault(); cwMove(0, -1); }
      else if (k === 'ArrowRight') { e.preventDefault(); cwMove(0, 1); }
      else if (k === 'ArrowUp') { e.preventDefault(); cwMove(-1, 0); }
      else if (k === 'ArrowDown') { e.preventDefault(); cwMove(1, 0); }
      else if (k === 'Tab') { e.preventDefault(); cwStepWord(e.shiftKey ? -1 : 1); }
      else if (k === ' ' || k === 'Enter') { e.preventDefault(); cwSelect(CW.cur, CW.dir === 'a' ? 'd' : 'a'); }
      else if (k === 'Escape') { inp.blur(); }
    });
    inp.addEventListener('input', () => {
      const v = inp.value;
      if (!v.length) cwBack(api); else { const ch = v.replace(/[^a-zA-Z]/g, '').slice(-1); if (ch) cwType(api, ch.toUpperCase()); }
      inp.value = ' '; try { inp.setSelectionRange(1, 1); } catch (e) { }
    });
    cwPaint();
    let rt = 0; const ro = window.ResizeObserver ? new ResizeObserver(() => { cancelAnimationFrame(rt); rt = requestAnimationFrame(cwPaint); }) : null; if (ro) ro.observe(stage.querySelector('#pz-gw'));
  }

  /* ---------------- jigsaw ---------------- */
  let JG = null, jTimer = 0;
  const K = 16;
  function edge(x0, y0, dx, dy, len, s) {
    const nx = dy, ny = -dx, f = v => v.toFixed(1);
    const P = (u, v) => `${f(x0 + dx * u + nx * v * s)} ${f(y0 + dy * u + ny * v * s)}`;
    if (!s || len < K * 3) return `L${P(len, 0)}`;
    const m = len / 2;
    return `L${P(m - 0.6 * K, 0)}C${P(m - 0.22 * K, 0)} ${P(m - 0.16 * K, 0.18 * K)} ${P(m - 0.3 * K, 0.42 * K)}C${P(m - 0.58 * K, 0.82 * K)} ${P(m - 0.36 * K, 1.16 * K)} ${P(m, 1.16 * K)}C${P(m + 0.36 * K, 1.16 * K)} ${P(m + 0.58 * K, 0.82 * K)} ${P(m + 0.3 * K, 0.42 * K)}C${P(m + 0.16 * K, 0.18 * K)} ${P(m + 0.22 * K, 0)} ${P(m + 0.6 * K, 0)}L${P(len, 0)}`;
  }
  const piecePath = (w, h, e) => `M0 0${edge(0, 0, 1, 0, w, e[0])}${edge(w, 0, 0, 1, h, e[1])}${edge(w, h, -1, 0, w, e[2])}${edge(0, h, 0, -1, h, e[3])}Z`;
  function jgNew(k, seed) {
    const R = rng(seed), seen = new Set();
    const pool = shuf(termsOf(k), R).filter(t => { const d = cleanDef(t, 125), key = showTerm(t).toLowerCase(); if (seen.has(key) || seen.has(d)) return false; seen.add(key); seen.add(d); return true; });
    const n = Math.min(pool.length, 6 + Math.floor(R() * 3));
    const pairs = pool.slice(0, n).map((t, i) => ({ id: i, term: showTerm(t), def: cleanDef(t, 125) }));
    const rows = shuf(pairs.map(p => p.id), R), tray = shuf(pairs.map(p => p.id), R);
    const tbT = rows.map(() => R() < 0.5 ? 1 : -1), tbD = rows.map(() => R() < 0.5 ? 1 : -1);
    return { k, seed, pairs, rows, tray, tbT, tbD, matched: new Set(), sel: null, selDef: null, moves: 0, t0: 0, el: 0, done: false };
  }
  const tEdges = r => [r === 0 ? 0 : -JG.tbT[r - 1], 1, r === JG.rows.length - 1 ? 0 : JG.tbT[r], 0];
  const dEdges = r => [r === 0 ? 0 : -JG.tbD[r - 1], 0, r === JG.rows.length - 1 ? 0 : JG.tbD[r], -1];
  const rowOf = id => JG.rows.indexOf(id);
  function jgLoad(loc) {
    const k = normK(loc.k), seed = +loc.seed || 0;
    if (!JG || JG.k !== k || (seed && JG.seed !== seed)) JG = jgNew(k, seed || newSeed());
    loc.seed = JG.seed; return JG;
  }
  const svgP = (e, cls) => `<svg aria-hidden="true" data-e="${e.join(',')}"${cls ? ` class="${cls}"` : ''}><path d=""/></svg>`;
  const termBtn = (api, p, locked) => { const r = rowOf(p.id); return `<button type="button" class="pz-pc pz-term ${locked ? 'locked' : ''} ${JG.sel === p.id ? 'sel' : ''}" data-pzterm="${p.id}" ${locked ? 'aria-disabled="true" tabindex="-1"' : `aria-pressed="${JG.sel === p.id}"`} aria-label="${locked ? 'Joined term: ' : 'Term piece: '}${api.esc(p.term)}">${svgP(tEdges(r))}<span class="pz-tx">${api.esc(p.term)}</span></button>`; };
  function jgHTML(api, loc) {
    const esc = api.esc; jgLoad(loc); const P = store(api), best = P.best[JG.k];
    const byId = id => JG.pairs[id];
    const rowsH = JG.rows.map((id, r) => { const p = byId(id), m = JG.matched.has(id); return `<div class="pz-row ${m ? 'joined' : ''}" data-pzrow="${r}"><div class="pz-slot" data-pzslot="${r}">${m ? termBtn(api, p, true) : `${svgP(tEdges(r), 'ghost')}<span class="ph" aria-hidden="true">Drop the term here</span>`}</div><button type="button" class="pz-pc pz-def ${JG.selDef === r ? 'sel' : ''}" data-pzdef="${r}" ${m ? 'aria-disabled="true"' : ''} aria-label="${m ? `Joined: ${esc(p.term)} — ` : 'Definition piece: '}${esc(p.def)}">${svgP(dEdges(r))}<span class="pz-tx">${esc(p.def)}</span></button></div>`; }).join('');
    const left = JG.tray.filter(id => !JG.matched.has(id));
    const el = JG.t0 ? (JG.done ? JG.el : (Date.now() - JG.t0) / 1000) : 0;
    return `${crumbs(api, JG.k, 'Jigsaw match')}
    <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
      <linearGradient id="pz-gT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF0B3"/><stop offset=".55" stop-color="#F5C542"/><stop offset="1" stop-color="#D9A21E"/></linearGradient>
      <linearGradient id="pz-gD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22418F"/><stop offset="1" stop-color="#0E2058"/></linearGradient></defs></svg>
    <div class="card" data-notc>
      <div class="pz-head"><div><span class="pz-tag">Jigsaw · ${esc(short(JG.k))}</span><h2>Join each term to its definition</h2></div>
        <div class="pz-stats"><span class="pz-stat">Time <b class="pz-time" id="pz-time">${fmt(el)}</b></span><span class="pz-stat">Moves <b id="pz-moves">${JG.moves}</b></span><span class="pz-stat">Joined <b id="pz-joined">${JG.matched.size}/${JG.pairs.length}</b></span><span class="pz-stat">Best <b id="pz-best">${best ? fmt(best) : '—'}</b></span></div></div>
      <div class="pz-bar"><span class="hint" style="margin:0;flex:1;min-width:200px">Drag a gold term piece onto its definition. No mouse? Select a term, then select its definition.</span>
        <button type="button" class="btn ghost pz-mute" data-pzjg="mute" aria-pressed="${!!P.mute}">${P.mute ? 'Sound off' : 'Sound on'}</button>
        <button type="button" class="btn ghost" data-pzjg="new">New round</button></div>
      <div id="pz-jwin" class="pz-win" ${JG.done ? '' : 'hidden'}>${JG.done ? jgWinHTML(api) : ''}</div>
      <div class="pz-jig ${JG.done ? 'fin' : ''}">
        <div class="pz-board ${JG.done ? 'done pic' : ''}" id="pz-board" role="group" aria-label="Definition board">${rowsH}</div>
        <div class="pz-tray" id="pz-tray" role="group" aria-label="Term pieces" ${JG.done ? 'hidden' : ''}><span class="pz-tt">Term pieces</span>${left.map(id => termBtn(api, byId(id), false)).join('') || '<span class="pz-empty">All pieces placed.</span>'}</div>
      </div>
      <div id="pz-live" class="pz-sr" aria-live="polite"></div>
    </div>`;
  }
  function jgWinHTML(api) {
    const esc = api.esc, P = store(api);
    return `<h3>${esc(short(JG.k))} complete!</h3><p style="margin:0">All ${JG.pairs.length} pairs joined in <b>${fmt(JG.el)}</b> with <b>${JG.moves}</b> moves${P.best[JG.k] === Math.round(JG.el) ? ' (your best time)' : ''}.</p>
      <dl class="pz-review">${JG.rows.map(id => { const p = JG.pairs[id]; return `<dt>${esc(p.term)}</dt><dd>${esc(p.def)}</dd>`; }).join('')}</dl>
      <div class="row"><button type="button" class="btn go" data-pzjg="new">Play another round</button><button type="button" class="btn ghost" data-go="puzzles" data-tab="cross" data-k="${JG.k}">Try the crossword</button></div>`;
  }
  function drawPiece(svg) {
    const host = svg.parentElement; if (!host) return; const w = host.offsetWidth, h = host.offsetHeight; if (!w || !h) return;
    const e = svg.dataset.e.split(',').map(Number), p = svg.querySelector(':scope > path'); p.setAttribute('d', piecePath(w, h, e));
    if (svg.classList.contains('ghost')) { p.setAttribute('fill', 'rgba(255,255,255,.035)'); p.setAttribute('stroke', 'rgba(255,215,102,.45)'); p.setAttribute('stroke-dasharray', '5 5'); p.setAttribute('stroke-width', '1.4'); }
  }
  function drawAll(root) { (root || document).querySelectorAll('.pz-pc>svg[data-e], .pz-slot>svg[data-e]').forEach(drawPiece); if (JG && JG.done) paintPic(); }
  function paintPic() {
    const board = document.getElementById('pz-board'); if (!board || !board.classList.contains('pic')) return;
    const br = board.getBoundingClientRect(), rows = board.querySelectorAll('.pz-row'); if (!rows.length) return;
    const top = rows[0].getBoundingClientRect(), bot = rows[rows.length - 1].getBoundingClientRect();
    const W = bot.right - top.left, H = bot.bottom - top.top, ox0 = top.left, oy0 = top.top;
    const label = short(JG.k), sub = JG.k === 'ALL' ? 'Digital Media glossary' : JG.k === 'MS' ? 'Signs & abbreviations' : (G().cats[JG.k] || '');
    const fs = Math.max(18, Math.min(W / (label.length * 0.6), H / 4.2)), fs2 = fs * 0.62, fs3 = Math.max(12, fs * 0.26);
    const cx = W / 2, cy = H / 2;
    board.querySelectorAll('.pz-pc>svg[data-e]').forEach((svg, i) => {
      const r = svg.parentElement.getBoundingClientRect(), x = r.left - ox0, y = r.top - oy0, id = 'pzpic' + i;
      let defs = svg.querySelector('defs'); if (!defs) { defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs'); svg.insertBefore(defs, svg.firstChild); }
      const rays = Array.from({ length: 14 }, (_, j) => { const a = j / 14 * Math.PI * 2, b = a + 0.09, R2 = Math.max(W, H) * 1.2, sx = W * 0.8, sy = H * 0.22; return `<path d="M${sx} ${sy}L${sx + Math.cos(a) * R2} ${sy + Math.sin(a) * R2}L${sx + Math.cos(b) * R2} ${sy + Math.sin(b) * R2}Z" fill="#FFD766" opacity=".07"/>`; }).join('');
      const waves = [0.78, 0.86, 0.94].map((p, j) => { let d = `M0 ${H * p}`; for (let q = 0; q <= 8; q++) d += ` Q${W * (q + 0.5) / 8} ${H * p + (q % 2 ? -1 : 1) * H * 0.025} ${W * (q + 1) / 8} ${H * p}`; return `<path d="${d}" fill="none" stroke="#FFD766" stroke-opacity="${0.45 - j * 0.1}" stroke-width="${3 - j * 0.6}"/>`; }).join('');
      defs.innerHTML = `<linearGradient id="${id}g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}"><stop offset="0" stop-color="#1B3A8C"/><stop offset=".6" stop-color="#0B1A46"/><stop offset="1" stop-color="#06102E"/></linearGradient>
        <radialGradient id="${id}s" gradientUnits="userSpaceOnUse" cx="${W * 0.8}" cy="${H * 0.22}" r="${Math.min(W, H) * 0.2}"><stop offset="0" stop-color="#FFF6CF"/><stop offset=".45" stop-color="#FFD766"/><stop offset="1" stop-color="#C99A1C"/></radialGradient>
        <pattern id="${id}" patternUnits="userSpaceOnUse" x="${-x}" y="${-y}" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="url(#${id}g)"/>${rays}<circle cx="${W * 0.8}" cy="${H * 0.22}" r="${Math.min(W, H) * 0.15}" fill="url(#${id}s)"/>${waves}
        <text x="${cx}" y="${cy - fs * 0.1}" text-anchor="middle" font-family="Bricolage Grotesque,Segoe UI,system-ui,sans-serif" font-weight="800" font-size="${fs}" fill="#FFFFFF" stroke="#0A1433" stroke-width="${fs * 0.05}" paint-order="stroke">${escH(label)}</text>
        <text x="${cx}" y="${cy + fs2 * 1.05}" text-anchor="middle" font-family="Bricolage Grotesque,Segoe UI,system-ui,sans-serif" font-weight="800" font-size="${fs2}" fill="#FFD766" letter-spacing="${fs2 * 0.04}">complete</text>
        <text x="${cx}" y="${cy + fs2 * 1.05 + fs3 * 2}" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="${fs3}" fill="#DDE5FF" letter-spacing="${fs3 * 0.12}">${escH(sub.toUpperCase())}</text></pattern>`;
      svg.querySelector(':scope > path').setAttribute('style', `fill:url(#${id})`);
    });
  }
  function jgStats() {
    const s = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    s('pz-moves', JG.moves); s('pz-joined', `${JG.matched.size}/${JG.pairs.length}`); s('pz-time', fmt(JG.t0 ? (JG.done ? JG.el : (Date.now() - JG.t0) / 1000) : 0));
  }
  function jgTick() {
    clearInterval(jTimer);
    jTimer = setInterval(() => { if (!JG || JG.done || !document.getElementById('pz-time')) { clearInterval(jTimer); return; } jgStats(); }, 1000);
  }
  function jgStart() { if (!JG.t0) { JG.t0 = Date.now(); jgTick(); } }
  function jgSelTerm(api, id) {
    if (JG.done || JG.matched.has(id)) return;
    if (JG.selDef != null) { const r = JG.selDef; JG.selDef = null; jgTry(api, id, r); return; }
    JG.sel = JG.sel === id ? null : id; snd(api, 'pick');
    document.querySelectorAll('.pz-term').forEach(b => { const on = +b.dataset.pzterm === JG.sel; b.classList.toggle('sel', on); if (!b.classList.contains('locked')) b.setAttribute('aria-pressed', on); });
    if (JG.sel != null) live(`Selected ${JG.pairs[id].term}. Now choose its definition.`);
  }
  function jgSelDef(api, r) {
    if (JG.done || JG.matched.has(JG.rows[r])) return;
    if (JG.sel != null) { const id = JG.sel; JG.sel = null; jgTry(api, id, r); return; }
    JG.selDef = JG.selDef === r ? null : r; snd(api, 'pick');
    document.querySelectorAll('.pz-def').forEach(b => b.classList.toggle('sel', +b.dataset.pzdef === JG.selDef));
    if (JG.selDef != null) live('Definition selected. Now choose the matching term.');
  }
  function jgTry(api, id, r, dragEl) {
    jgStart(); JG.moves++;
    document.querySelectorAll('.pz-term.sel,.pz-def.sel').forEach(b => { b.classList.remove('sel'); if (b.matches('.pz-term:not(.locked)')) b.setAttribute('aria-pressed', 'false'); });
    const el = dragEl || document.querySelector(`.pz-term[data-pzterm="${id}"]`);
    if (JG.rows[r] === id) jgJoin(api, id, r, el);
    else {
      snd(api, 'wrong'); const row = document.querySelector(`[data-pzrow="${r}"]`);
      if (row) { row.classList.remove('shake'); void row.offsetWidth; row.classList.add('shake'); setTimeout(() => row.classList.remove('shake'), 420); }
      if (el && el.classList.contains('drag')) bounceBack(el); else if (el) { el.classList.remove('shake'); }
      live(`Not a match. ${JG.pairs[id].term} does not go with that definition.`);
    }
    jgStats();
  }
  function jgJoin(api, id, r, el) {
    JG.matched.add(id); snd(api, 'snap');
    const slot = document.querySelector(`[data-pzslot="${r}"]`), row = slot && slot.closest('.pz-row');
    if (el && slot) {
      const from = el.getBoundingClientRect();
      if (el._ph) { el._ph.remove(); el._ph = null; }
      el.classList.remove('drag', 'sel'); el.style.left = el.style.top = el.style.width = el.style.height = el.style.transform = el.style.transition = '';
      el.classList.add('locked'); el.setAttribute('aria-disabled', 'true'); el.setAttribute('tabindex', '-1'); el.removeAttribute('aria-pressed'); el.setAttribute('aria-label', 'Joined term: ' + JG.pairs[id].term);
      slot.innerHTML = ''; slot.appendChild(el); row.classList.add('joined');
      const def = row.querySelector('.pz-def'); def.setAttribute('aria-disabled', 'true'); def.setAttribute('aria-label', `Joined: ${JG.pairs[id].term} — ${JG.pairs[id].def}`);
      drawAll(row);
      if (!RM()) { const to = el.getBoundingClientRect(); el.style.transform = `translate(${from.left - to.left}px,${from.top - to.top}px)`; el.style.zIndex = 5; requestAnimationFrame(() => { el.style.transition = 'transform .28s cubic-bezier(.2,.9,.3,1.25)'; el.style.transform = ''; setTimeout(() => { el.style.transition = ''; el.style.zIndex = ''; }, 320); }); }
    }
    const tray = document.getElementById('pz-tray'); if (tray && !tray.querySelector('.pz-term')) tray.insertAdjacentHTML('beforeend', '<span class="pz-empty">All pieces placed.</span>');
    live(`Joined: ${JG.pairs[id].term}. ${JG.pairs.length - JG.matched.size} to go.`);
    const nx = document.querySelector('#pz-tray .pz-term'); if (nx && document.activeElement && (document.activeElement === document.body || document.activeElement.closest('.pz-jig'))) { try { nx.focus({ preventScroll: true }); } catch (e) { } }
    if (JG.matched.size === JG.pairs.length) jgWin(api);
  }
  function jgWin(api) {
    JG.done = true; JG.el = (Date.now() - JG.t0) / 1000; clearInterval(jTimer); jgStats();
    const P = store(api), secs = Math.max(1, Math.round(JG.el)), first = !P.jdone[JG.k], isBest = !P.best[JG.k] || secs < P.best[JG.k];
    if (isBest) P.best[JG.k] = secs; P.jdone[JG.k] = (P.jdone[JG.k] || 0) + 1; api.save();
    const bEl = document.getElementById('pz-best'); if (bEl) bEl.textContent = fmt(P.best[JG.k]);
    const board = document.getElementById('pz-board'), tray = document.getElementById('pz-tray');
    setTimeout(() => {
      if (tray) tray.hidden = true; const jw = document.querySelector('.pz-jig'); if (jw) jw.classList.add('fin');
      if (board) { board.classList.add('done'); setTimeout(() => { board.classList.add('pic'); drawAll(board); snd(api, 'win'); confetti(); }, RM() ? 0 : 480); }
      const w = document.getElementById('pz-jwin'); if (w) { w.innerHTML = jgWinHTML(api); w.hidden = false; }
      live(`${short(JG.k)} complete. All pairs joined in ${fmt(JG.el)} with ${JG.moves} moves.`);
      const pts = first ? 15 : 5; setTimeout(() => api.reward(pts, isBest && !first ? 'Jigsaw complete: new best time' : 'Jigsaw complete', { xp: pts }), 700);
    }, 350);
  }
  function bounceBack(el) {
    const ph = el._ph; if (!ph) return;
    const to = ph.getBoundingClientRect(), from = el.getBoundingClientRect();
    const finish = () => { el.classList.remove('drag'); el.style.left = el.style.top = el.style.width = el.style.height = el.style.transform = el.style.transition = ''; ph.replaceWith(el); el._ph = null; drawAll(el.parentElement); };
    if (RM()) { finish(); return; }
    el.style.transition = 'transform .3s cubic-bezier(.3,1.4,.5,1)'; el.style.transform = `translate(${to.left - from.left}px,${to.top - from.top}px)`;
    setTimeout(finish, 310);
  }
  function jgMount(api, stage) {
    drawAll(stage);
    const ro = window.ResizeObserver ? new ResizeObserver(() => { cancelAnimationFrame(jgMount._rf); jgMount._rf = requestAnimationFrame(() => drawAll(document.getElementById('pz-board') ? document : null)); }) : null;
    if (ro) { stage.querySelectorAll('.pz-pc,.pz-slot').forEach(x => ro.observe(x)); const b = stage.querySelector('#pz-board'); if (b) ro.observe(b); }
    if (JG.t0 && !JG.done) jgTick();
    stage.querySelectorAll('.pz-tray .pz-term').forEach(el => el.addEventListener('pointerdown', e => dragStart(api, el, e)));
  }
  function dragStart(api, el, e) {
    if (JG.done || el.classList.contains('locked') || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const sx = e.clientX, sy = e.clientY, r0 = el.getBoundingClientRect(); let on = false, hot = null, af = 0, lastY = sy;
    const offX = sx - r0.left, offY = sy - r0.top;
    const rowAt = (x, y) => { const t = document.elementFromPoint(x, y); return t && t.closest ? t.closest('[data-pzrow]') : null; };
    const scrollLoop = () => { const m = 70; if (lastY < m) window.scrollBy(0, -12); else if (lastY > innerHeight - m) window.scrollBy(0, 12); af = requestAnimationFrame(scrollLoop); };
    const move = ev => {
      if (!on) {
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
        on = true; jgStart(); snd(api, 'pick');
        const ph = document.createElement('span'); ph.className = 'pz-ph'; ph.style.cssText = `display:inline-block;width:${r0.width}px;height:${r0.height}px;flex:none`; el._ph = ph; el.replaceWith(ph);
        el.classList.add('drag'); el.style.width = r0.width + 'px'; el.style.height = r0.height + 'px'; document.body.appendChild(el); drawPiece(el.querySelector('svg'));
        af = requestAnimationFrame(scrollLoop);
      }
      ev.preventDefault(); lastY = ev.clientY;
      el.style.left = (ev.clientX - offX) + 'px'; el.style.top = (ev.clientY - offY) + 'px';
      const row = rowAt(ev.clientX, ev.clientY), ok = row && !row.classList.contains('joined') ? row : null;
      if (ok !== hot) { if (hot) hot.classList.remove('hot'); hot = ok; if (hot) hot.classList.add('hot'); }
    };
    const up = ev => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); cancelAnimationFrame(af);
      if (hot) hot.classList.remove('hot');
      if (!on) return;
      JG.justDragged = true; setTimeout(() => { JG.justDragged = false; }, 60);
      const row = ev.type === 'pointercancel' ? null : rowAt(ev.clientX, ev.clientY);
      if (row && !row.classList.contains('joined')) jgTry(api, +el.dataset.pzterm, +row.dataset.pzrow, el);
      else bounceBack(el);
    };
    window.addEventListener('pointermove', move, { passive: false }); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  }

  /* ---------------- flashcards ---------------- */
  let FC = null;
  function fcLoad(loc) { const k = normK(loc.k); if (!FC || FC.k !== k) { const T = termsOf(k); FC = { k, list: shuf(T, rng(newSeed())), i: 0, on: false }; } return FC; }
  function fcHTML(api, loc) {
    const esc = api.esc; fcLoad(loc); const t = FC.list[FC.i]; if (!t) return crumbs(api, FC.k, 'Flashcards') + '<div class="card">No terms found.</div>';
    return `${crumbs(api, FC.k, 'Flashcards')}
    <div class="card" data-notc><div class="pz-head"><div><span class="pz-tag">Flashcards · ${esc(short(FC.k))}</span><h2>Recall, then flip</h2></div><span class="hint" id="pz-fcn">Card ${FC.i + 1} of ${FC.list.length}</span></div>
      <div class="pz-fcw"><button type="button" class="pz-fc ${FC.on ? 'on' : ''}" id="pz-fc" data-pzfc="flip" aria-label="Flashcard. ${FC.on ? 'Definition: ' + esc(t.d[0]) : 'Term: ' + esc(showTerm(t)) + '. Press to show the definition.'}">
        <span class="f f1"><span class="k">${esc(long(t.c))}</span><span class="tt">${esc(showTerm(t))}</span><span class="k" style="opacity:.6">Tap or press Space to flip</span></span>
        <span class="f f2"><span class="k">${esc(showTerm(t))}</span><span>${esc(t.d[0])}</span></span></button></div>
      <div class="pz-bar" style="justify-content:center"><button type="button" class="btn ghost" data-pzfc="prev">‹ Previous</button><button type="button" class="btn go" data-pzfc="flip">Flip</button><button type="button" class="btn ghost" data-pzfc="next">Next ›</button><button type="button" class="btn ghost" data-pzfc="shuf">Shuffle</button></div>
      <p class="hint" style="text-align:center;margin:0">Keyboard: Space flips, left and right arrows move between cards.</p>
      <div id="pz-live" class="pz-sr" aria-live="polite"></div></div>`;
  }
  function fcAct(api, a) {
    if (a === 'flip') FC.on = !FC.on;
    else if (a === 'next') { FC.i = (FC.i + 1) % FC.list.length; FC.on = false; }
    else if (a === 'prev') { FC.i = (FC.i - 1 + FC.list.length) % FC.list.length; FC.on = false; }
    else if (a === 'shuf') { FC.list = shuf(FC.list, rng(newSeed())); FC.i = 0; FC.on = false; api.toast('Cards shuffled.'); }
    api.render(); setTimeout(() => { const c = document.getElementById('pz-fc'); if (c && a !== 'shuf') try { c.focus({ preventScroll: true }); } catch (e) { } }, 0);
  }

  /* ---------------- global wiring (once) ---------------- */
  let wired = false, API_ = null;
  function wire() {
    if (wired) return; wired = true;
    document.addEventListener('click', e => {
      const api = API_; if (!api || api.S.loc.v !== 'puzzles' || !e.target.closest) return;
      const t = e.target;
      const c = t.closest('[data-pzc]'); if (c && CW) { const i = +c.dataset.pzc; if (i === CW.cur) cwSelect(i, CW.dir === 'a' ? 'd' : 'a'); else cwSelect(i); cwFocus(); return; }
      const cl = t.closest('[data-pzclue]'); if (cl && CW) { const w = CW.words[+cl.dataset.pzclue]; CW.dir = w.dir; CW.cur = w.cells.find(i => !CW.fill[i]) ?? w.cells[0]; cwPaint(); cwFocus(); return; }
      const a = t.closest('[data-pzcw]'); if (a && CW) { cwAct(api, a.dataset.pzcw); return; }
      const j = t.closest('[data-pzjg]'); if (j && JG) {
        if (j.dataset.pzjg === 'new') { api.go({ v: 'puzzles', tab: 'jig', k: JG.k, seed: newSeed() }); return; }
        if (j.dataset.pzjg === 'mute') { const P = store(api); P.mute = !P.mute; api.save(); j.setAttribute('aria-pressed', P.mute); j.textContent = P.mute ? 'Sound off' : 'Sound on'; if (!P.mute) snd(api, 'snap'); return; }
      }
      const tm = t.closest('[data-pzterm]'); if (tm && JG) { if (JG.justDragged) return; jgSelTerm(api, +tm.dataset.pzterm); return; }
      const df = t.closest('[data-pzdef]'); if (df && JG) {
        if (JG.justDragged) return; const r = +df.dataset.pzdef;
        if (JG.matched.has(JG.rows[r])) return;
        jgSelDef(api, r); return;
      }
      const f = t.closest('[data-pzfc]'); if (f && FC) { fcAct(api, f.dataset.pzfc); return; }
    });
    document.addEventListener('keydown', e => {
      const api = API_; if (!api || api.S.loc.v !== 'puzzles' || api.S.loc.tab !== 'flash' || !FC) return;
      const tg = e.target; if (tg && (tg.matches('input,textarea,select') || (tg.isContentEditable))) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); fcAct(api, 'next'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); fcAct(api, 'prev'); }
      else if (e.key === ' ' && !(tg && tg.matches('button:not(#pz-fc)'))) { e.preventDefault(); fcAct(api, 'flip'); }
    });
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'puzzles',
    title: 'Glossary Puzzles',
    tile: { icon: '🧩', meta: 'Crosswords, a jigsaw matching game and flashcards built from the Digital Media glossary, module by module' },
    render(api, loc) {
      css(); API_ = api; wire();
      if (!G().terms.length) return `<div class="card"><h2>Glossary Puzzles</h2><p>The glossary file did not load.</p></div>`;
      const tab = loc.tab || '';
      if (tab === 'cross') return cwHTML(api, loc);
      if (tab === 'jig') return jgHTML(api, loc);
      if (tab === 'flash') return fcHTML(api, loc);
      return hubHTML(api, loc);
    },
    mount(api, loc, stage) {
      API_ = api;
      if (loc.tab === 'cross') cwMount(api, stage);
      else if (loc.tab === 'jig') jgMount(api, stage);
    }
  });
})();
