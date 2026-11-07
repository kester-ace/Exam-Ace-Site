/* Rebuilding After the Apocalypse: post-apocalyptic Caribbean atmosphere for the zombie unit views.
   Self-contained: everything is scoped under html[data-zone="apoc"], which the engine sets on the
   'zombie', 'zday' and 'zc' views. No network, original inline SVG/CSS/canvas only. */
(function () {
  'use strict';
  if (window.__apxLoaded) return; window.__apxLoaded = true;
  const P = 'html:root[data-zone="apoc"]';
  const RM = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
  const uri = s => `url("data:image/svg+xml,${encodeURIComponent(s)}")`;

  /* ---------- textures (inline data URIs) ---------- */
  const NOISE = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .75 0 0 0 0 .7 0 0 0 0 .62 0 0 0 .7 -.22"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`);
  const WEAR = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="w"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="4" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -14 9.6"/></filter><rect width="100%" height="100%" filter="url(#w)"/></svg>`);
  const CRACK = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="230" fill="none" stroke="#fff" stroke-linecap="round"><g stroke-width="1.3" opacity=".42"><path d="M250 46 L190 20 L120 0M250 46 L170 70 L96 64 L30 92M250 46 L214 112 L180 160 L150 230M250 46 L300 120 L320 150M250 46 L320 30M250 46 L276 0"/></g><g stroke-width=".7" opacity=".3"><path d="M212 30 L206 62 L222 92 L244 98 L272 84 L284 60 L268 34 Z"/><path d="M170 70 L176 100 L214 112M190 20 L176 44 L170 70M300 120 L262 150 L214 112M96 64 L104 40 L120 0"/></g><circle cx="250" cy="46" r="4" stroke-width="1.2" opacity=".5"/></svg>`);
  const TORN = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="18" preserveAspectRatio="none"><path d="M0 18 L0 9 L9 5 L17 10 L26 3 L38 8 L47 2 L58 9 L66 6 L77 11 L86 4 L97 8 L108 1 L117 7 L129 4 L138 10 L150 3 L160 8 L171 5 L180 11 L192 3 L201 8 L213 2 L222 9 L232 5 L240 9 L240 18 Z"/></svg>`);
  const TAPE = `linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,0) 40%,rgba(0,0,0,.12)),repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 2px,transparent 2px 5px),linear-gradient(#a9a49b,#8d877d)`;
  const STRIPES = 'repeating-linear-gradient(-45deg,#F2B33D 0 14px,#17120d 14px 28px)';

  const CSS = `
@Z{--bg:#141012;--bg2:#3a1f1c;--surface:rgba(34,28,26,.94);--raise:rgba(255,236,210,.05);--ink:#F2E8D8;--muted:#CDBDA5;--line:rgba(214,128,62,.38);
  --blue:#F2B33D;--blue-deep:#8A5A10;--on-blue:#17110A;--gold:#FFD766;--gold-deep:#B8861A;--on-gold:#17110A;--ok:#7ED957;--bad:#FF8A70;
  --soft-blue:rgba(242,179,61,.16);--soft-gold:rgba(255,215,102,.15);--soft-ok:rgba(126,217,87,.15);--soft-bad:rgba(255,138,112,.16);
  --head:linear-gradient(180deg,#2a1813,#120d0c);--glow:rgba(255,128,48,.4);--particle:#d8c8b8;
  --f-display:Impact,Haettenschweiler,"Arial Narrow Bold","Franklin Gothic Heavy","League Gothic","Oswald","DejaVu Sans Condensed","Arial Black",sans-serif;
  --bezel:conic-gradient(from 210deg,#E7B36A,#B5602A 12%,#5A2C14 26%,#D9944A 38%,#7A3A18 52%,#F0C27A 64%,#4A2410 78%,#B5602A 90%,#E7B36A);
  --solid:linear-gradient(180deg,#332c28,#211c1a);color-scheme:dark}
@Z body{background:linear-gradient(180deg,#141116 0%,#2a1a22 22%,#4d2422 46%,#8a3f1d 70%,#5a2a17 84%,#18120f 100%)!important;background-attachment:fixed!important;color:var(--ink)}
@Z #sky{display:none}
.apx-fx{display:none}
@Z .apx-fx{display:block;position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.apx-fx>*{position:absolute;pointer-events:none}
.apx-fx canvas{inset:0;width:100%;height:100%}
.apx-fog{left:0;width:200%;height:34vh;background:radial-gradient(28% 50% at 12% 50%,rgba(205,180,165,.13),transparent 70%),radial-gradient(22% 40% at 38% 60%,rgba(190,160,150,.10),transparent 70%),radial-gradient(30% 45% at 62% 45%,rgba(205,180,165,.12),transparent 70%),radial-gradient(22% 40% at 88% 55%,rgba(190,160,150,.10),transparent 70%);animation:apx-drift 90s linear infinite}
.apx-fog.f1{top:18vh}.apx-fog.f2{top:52vh;animation-duration:130s;animation-direction:reverse;opacity:.8}.apx-fog.f3{top:76vh;animation-duration:70s}
.apx-vig{inset:0;background:radial-gradient(ellipse 75% 70% at 50% 42%,transparent 45%,rgba(0,0,0,.66) 100%)}
.apx-scan{inset:0;background:repeating-linear-gradient(0deg,rgba(0,0,0,.09) 0 1px,transparent 1px 3px);opacity:.55}
.apx-flk{inset:0;background:#000;opacity:0;animation:apx-flick 13s ease-in-out infinite}
@keyframes apx-drift{to{transform:translateX(-50%)}}
@keyframes apx-flick{0%,58%,100%{opacity:0}61%{opacity:.07}64%{opacity:.02}68%{opacity:.08}73%{opacity:0}}
/* header + sidebar */
@Z .top::after{height:7px;bottom:-7px;background:${STRIPES};opacity:.9;box-shadow:0 3px 8px rgba(0,0,0,.6)}
@Z .side{background:linear-gradient(180deg,rgba(30,24,22,.95),rgba(20,16,15,.95))}
@Z .side::after{background:linear-gradient(180deg,#B5602A,#5A2C14 60%,transparent)}
/* headings: stencil */
@Z #stage h1,@Z #stage h2{background:none!important;-webkit-background-clip:border-box!important;background-clip:border-box!important;color:#F4E9D6!important;-webkit-text-fill-color:#F4E9D6;letter-spacing:.035em!important;font-stretch:condensed;text-shadow:2px 2px 0 rgba(0,0,0,.6),0 0 14px rgba(255,120,40,.25);filter:none!important;-webkit-mask:${WEAR},linear-gradient(rgba(0,0,0,.62),rgba(0,0,0,.62));mask:${WEAR},linear-gradient(rgba(0,0,0,.62),rgba(0,0,0,.62))}
@Z #stage h3{color:#FFCF73;letter-spacing:.03em!important;text-shadow:1px 1px 0 rgba(0,0,0,.6)}
@Z #stage summary{letter-spacing:.02em}
/* panels: weathered metal with duct-tape corners */
@Z .card{border-radius:7px!important;border:1px solid rgba(0,0,0,.65)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;
  background-image:${NOISE},repeating-linear-gradient(112deg,transparent 0 23px,rgba(255,240,220,.028) 23px 24px),repeating-linear-gradient(-28deg,transparent 0 47px,rgba(0,0,0,.14) 47px 48px),
  radial-gradient(150px 70px at 93% 6%,rgba(160,72,24,.38),transparent 70%),radial-gradient(190px 90px at 4% 97%,rgba(128,58,20,.32),transparent 70%),
  radial-gradient(circle at 13px calc(100% - 13px),#9b9083 0 2.5px,#2b2522 3px,transparent 4px),radial-gradient(circle at calc(100% - 13px) calc(100% - 13px),#9b9083 0 2.5px,#2b2522 3px,transparent 4px),
  linear-gradient(172deg,#3b3532,#2b2624 55%,#221d1c)!important;
  box-shadow:inset 0 1px 0 rgba(255,235,210,.12),inset 0 -2px 0 rgba(0,0,0,.4),0 6px 0 -2px rgba(0,0,0,.45),0 26px 44px -20px #000!important}
@Z .card::before,@Z .card::after{content:''!important;position:absolute!important;inset:auto!important;width:76px;height:24px;padding:0!important;-webkit-mask:none!important;mask:none!important;opacity:.93!important;background:${TAPE}!important;border-radius:0!important;
  clip-path:polygon(0 12%,6% 0,12% 14%,20% 2%,30% 10%,100% 0,100% 0,96% 22%,100% 40%,94% 62%,100% 82%,95% 100%,0 100%,4% 78%,0 56%,5% 36%);box-shadow:0 2px 3px rgba(0,0,0,.35);z-index:3;pointer-events:none;transition:none!important;animation:none!important}
@Z .card::before{top:-8px!important;left:-18px!important;transform:rotate(-38deg)}
@Z .card::after{top:-8px!important;right:-18px!important;transform:rotate(38deg)}
@Z .card p,@Z .card li{color:var(--ink)}
@Z .stage-in{gap:22px}
/* hero: rusted shutter with caution tape + cracked glass */
@Z .hero{border-radius:8px!important;color:#F4E9D6;background:${CRACK} right -10px top -6px/340px 245px no-repeat,${NOISE},radial-gradient(520px 260px at 88% 0%,rgba(255,118,40,.30),transparent 70%),repeating-linear-gradient(180deg,rgba(0,0,0,0) 0 26px,rgba(0,0,0,.22) 26px 28px,rgba(255,220,190,.05) 28px 29px),linear-gradient(165deg,#4a2a1f,#2a2020 55%,#1a1516)!important;box-shadow:inset 0 0 0 1px rgba(0,0,0,.6),inset 0 0 60px rgba(0,0,0,.55),0 26px 44px -20px #000!important;padding-top:clamp(34px,5vw,48px)!important}
@Z .hero::before{inset:0 0 auto 0!important;height:14px;padding:0!important;-webkit-mask:none!important;mask:none!important;background:${STRIPES}!important;border-radius:8px 8px 0 0!important;box-shadow:0 2px 6px rgba(0,0,0,.55)}
@Z .hero::after{display:none!important}
@Z .hero .eyebrow{color:#FFC94D!important}
@Z .hero h1{filter:none!important}
/* kickers, ribbons, crumbs */
@Z #stage .kicker{background:#F2B33D!important;color:#17110A!important;border:0!important;border-radius:2px!important;box-shadow:2px 2px 0 rgba(0,0,0,.5)!important;font-weight:800;transform:rotate(-1.2deg);align-self:flex-start;width:max-content;max-width:100%}
@Z .ribbon{background:rgba(0,0,0,.35)!important;border:1px dashed rgba(242,179,61,.55)!important;color:#FFE1A0;border-radius:3px!important}
@Z .crumbs{color:var(--muted)}
@Z .linkbtn{color:#FFC94D}
/* list rows: charred plywood boards */
@Z .lrow{border:2px solid #120c08!important;border-radius:5px!important;background:${NOISE},repeating-linear-gradient(179deg,transparent 0 6px,rgba(0,0,0,.13) 6px 7px,transparent 7px 13px,rgba(255,220,170,.04) 13px 14px),radial-gradient(60px 12px at 70% 40%,rgba(0,0,0,.22),transparent 70%),linear-gradient(180deg,#4b3624,#3a2919)!important;background-clip:border-box!important;box-shadow:0 3px 0 rgba(0,0,0,.5),inset 0 1px 0 rgba(255,220,170,.12)!important}
@Z .lrow:hover{border-color:#F2B33D!important}
@Z .lrow.locked{background:${STRIPES.replace('#F2B33D', 'rgba(242,179,61,.10)').replace('#17120d', 'rgba(0,0,0,0)')},linear-gradient(#2c2420,#231c19)!important;opacity:.85}
@Z .lrow .s{color:#E4D3B8}
@Z .ico.open{border-color:#F2B33D}
@Z .ico.done{background:#7ED957;color:#13200c}
/* buttons: worn stencilled tags */
@Z .btn.go,@Z .btn.gold{border-radius:4px!important;letter-spacing:.05em;font-weight:800;padding-left:30px!important;text-shadow:none!important}
@Z .btn.go{background:${NOISE},linear-gradient(180deg,#F6C451,#E3A42C)!important;color:#17110A!important;border:2px solid #4a3208!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.45),0 4px 0 #6b4a10,0 10px 18px -8px rgba(0,0,0,.8)!important}
@Z .btn.gold{background:${NOISE},linear-gradient(180deg,#FFE58A,#F5C542 55%,#D9A21E)!important;color:#17110A!important;border:2px solid #6b4a10!important}
@Z .btn.go::after,@Z .btn.gold::after{content:''!important;left:10px!important;right:auto!important;top:50%!important;width:10px!important;height:10px!important;margin-top:-5px;border-radius:50%!important;background:#1b1513!important;box-shadow:0 0 0 2px #9b8f7f,inset 0 1px 2px #000}
@Z .btn.ghost{border-radius:4px!important;letter-spacing:.04em;background-image:${NOISE},var(--solid),var(--bezel)!important;background-clip:padding-box,padding-box,border-box!important;color:var(--ink)}
@Z .tool{border-radius:4px}
/* skill tiles + battery meters + tally */
@Z .tile{border-radius:6px!important;background-image:${NOISE},radial-gradient(90px 50px at 90% 0,rgba(160,72,24,.3),transparent 70%),linear-gradient(170deg,#3a3431,#262120)!important;border:1px solid rgba(0,0,0,.7)!important;box-shadow:inset 0 1px 0 rgba(255,235,210,.1),0 4px 0 rgba(0,0,0,.45)!important}
@Z .tile::before{content:''!important;inset:7px auto auto 50%!important;width:12px;height:12px;margin-left:-6px;padding:0!important;-webkit-mask:none!important;mask:none!important;border-radius:50%!important;background:#141010!important;box-shadow:0 0 0 2px #8f8476,inset 0 1px 2px #000;opacity:1!important}
@Z .tile::after{display:none!important}
@Z .ticon{background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.35),transparent 45%) padding-box,linear-gradient(160deg,#8a3f1d,#3a1c10) padding-box,var(--bezel) border-box!important}
@Z .pbar{position:relative;overflow:visible!important;height:16px!important;margin-right:7px;border:2px solid #cfc3b0!important;border-radius:4px!important;background:#120e0d!important;box-shadow:inset 0 2px 4px #000!important;padding:2px}
@Z .pbar::after{content:'';position:absolute;right:-7px;top:2px;width:4px;height:8px;border-radius:0 2px 2px 0;background:#cfc3b0}
@Z .pbar>i{border-radius:1px!important;min-width:0;background:repeating-linear-gradient(90deg,#8BE063 0 9px,transparent 9px 12px)!important;box-shadow:0 0 8px rgba(126,217,87,.45)!important}
.apx-tally{display:inline-flex;align-items:center;gap:6px;margin-left:8px;vertical-align:middle}
.apx-tally svg{height:18px;width:auto;overflow:visible}
/* challenge sheet: torn-paper top edge */
@Z article.card{-webkit-mask:${TORN} 0 0/240px 18px repeat-x,linear-gradient(#000,#000) 0 17px/100% calc(100% - 17px) no-repeat;mask:${TORN} 0 0/240px 18px repeat-x,linear-gradient(#000,#000) 0 17px/100% calc(100% - 17px) no-repeat;padding-top:clamp(28px,4vw,40px)!important;border-top:0!important}
@Z article.card::before,@Z article.card::after{display:none!important}
@Z .opt,@Z .blk{border-radius:5px!important}
@Z .opt.sel{border-color:#F2B33D!important}
@Z .nav{border-radius:5px;background:${NOISE},linear-gradient(#2e2826,#211c1a);border-top:5px solid transparent;border-image:${STRIPES} 5}
@Z details.fold{border-radius:5px;border:1px dashed rgba(214,128,62,.5);background:rgba(0,0,0,.22)}
@Z .fb{border-radius:5px}
@Z .clue{border-left-color:#F2B33D;background:rgba(0,0,0,.25)}
/* banner */
.apx-banner{margin:0;position:relative;border-radius:8px;overflow:hidden;background:#140f0e;box-shadow:inset 0 0 0 2px #0b0807,0 0 0 1px rgba(214,128,62,.45),0 26px 44px -20px #000}
.apx-banner svg{display:block;width:100%;height:auto;aspect-ratio:3/1}
.apx-banner::after{content:'';position:absolute;left:0;right:0;bottom:0;height:9px;background:${STRIPES};opacity:.92}
.apx-tag{position:absolute;left:12px;top:10px;z-index:2;background:#F2B33D;color:#17110A;font:800 .72rem/1 var(--f-display);letter-spacing:.14em;padding:6px 9px 5px;border-radius:2px;transform:rotate(-2deg);box-shadow:2px 2px 0 rgba(0,0,0,.55)}
@media (max-width:600px){.apx-banner svg{height:215px;aspect-ratio:auto}.apx-banner{margin-inline:-4px}}
.apx-banner .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.apx-banner svg *{transform-box:fill-box}
.apx-smk{transform-origin:50% 100%;animation:apx-rise 10s linear infinite;opacity:0}
@keyframes apx-rise{0%{transform:translate(0,0) scale(.5);opacity:0}12%{opacity:.75}100%{transform:translate(26px,-150px) scale(2.6);opacity:0}}
.apx-br{transform-origin:50% 100%;animation:apx-breathe 4.6s ease-in-out infinite}
@keyframes apx-breathe{50%{transform:scale(1.012,1.022)}}
.apx-sw{transform-origin:50% 100%;animation:apx-sway 6s ease-in-out infinite}
@keyframes apx-sway{50%{transform:rotate(1.4deg)}}
.apx-palm{transform-origin:50% 100%;animation:apx-palm 7s ease-in-out infinite}
@keyframes apx-palm{50%{transform:rotate(-2.2deg)}}
.apx-zw{transform-origin:50% 100%;animation:apx-shamble 5.5s ease-in-out infinite}
@keyframes apx-shamble{0%,100%{transform:translateX(0) rotate(-4deg)}50%{transform:translateX(6px) rotate(3deg)}}
.apx-lamp{animation:apx-lamp 8s linear infinite}
@keyframes apx-lamp{0%,40%,100%{opacity:.95}44%{opacity:.45}48%{opacity:.85}52%{opacity:.35}58%{opacity:.95}}
.apx-flag{transform-origin:0 50%;animation:apx-flag 3.2s ease-in-out infinite}
@keyframes apx-flag{50%{transform:skewY(-6deg) scaleX(.9)}}
.apx-led{animation:apx-led 2.4s steps(2,jump-none) infinite}
@keyframes apx-led{50%{opacity:.25}}
.apx-ray{transform-origin:50% 100%;animation:apx-ray 9s ease-in-out infinite}
@keyframes apx-ray{50%{opacity:.55}}
@media (prefers-reduced-motion:reduce){.apx-fx *,.apx-banner *{animation:none!important}.apx-smk{transform:translate(calc(var(--i) * 4px),calc(var(--i) * -20px)) scale(calc(.7 + var(--i) * .3));opacity:calc(.7 - var(--i) * .08)}}
@media (max-width:520px){@Z .card::before,@Z .card::after{width:52px;height:18px}@Z .card::before{left:-9px!important}@Z .card::after{right:-9px!important}}
@Z .stage{overflow-x:clip}
@Z .top .hbtn,@Z .top .coinpill{background-image:var(--solid),var(--bezel)!important}
@media print{.apx-fx,.apx-banner{display:none!important}}
`.replace(/@Z/g, P);

  const st = document.createElement('style'); st.id = 'apx-style'; st.textContent = CSS; (document.head || document.documentElement).appendChild(st);

  /* ---------- SVG scene helpers ---------- */
  const R = (x, y, w, h, f, a) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${a ? ' ' + a : ''}/>`;
  const Pa = (d, f, a) => `<path d="${d}" fill="${f}"${a ? ' ' + a : ''}/>`;
  const E = (cx, cy, rx, ry, f, a) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${a ? ' ' + a : ''}/>`;
  const Ln = (x1, y1, x2, y2, s, w, a) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${s}" stroke-width="${w}" stroke-linecap="round"${a ? ' ' + a : ''}/>`;
  const G = (inner, a) => `<g${a ? ' ' + a : ''}>${inner}</g>`;

  function house(x, w, h, col, o) {
    o = o || {}; const b = 300, t = b - h, rp = o.roof || '#5d4a3e';
    let s = R(x, t, w, h, col) + R(x, t, w, h, 'url(#apx-grime)');
    // clapboard lines
    for (let yy = t + 6; yy < b; yy += 6) s += Ln(x + 1, yy, x + w - 1, yy, 'rgba(0,0,0,.18)', .6);
    // roof
    if (o.collapsed) {
      s += Pa(`M${x - 4} ${t} L${x + w * .3} ${t - 20} L${x + w * .48} ${t - 8} L${x + w * .56} ${t + 10} L${x + w * .7} ${t - 6} L${x + w + 4} ${t + 4} L${x + w} ${t} Z`, rp);
      s += Pa(`M${x + w * .42} ${t} L${x + w * .5} ${t + 22} L${x + w * .64} ${t + 6} L${x + w * .7} ${t} Z`, '#120d0b');
      s += Ln(x + w * .44, t - 4, x + w * .6, t + 20, '#2a201a', 1.6) + Ln(x + w * .58, t - 2, x + w * .52, t + 18, '#2a201a', 1.4);
    } else {
      s += Pa(`M${x - 5} ${t} L${x + w / 2} ${t - 22} L${x + w + 5} ${t} Z`, rp);
      for (let i = 1; i < 5; i++) s += Ln(x + w / 2, t - 22, x - 5 + (w + 10) * i / 5, t, 'rgba(0,0,0,.25)', .7);
      if (o.patch) s += R(x + w * .55, t - 10, 14, 7, '#9aa3a8', 'transform="rotate(-24 ' + (x + w * .55) + ' ' + (t - 10) + ')"');
    }
    // gingerbread fretwork under eaves
    s += R(x - 3, t, w + 6, 6, 'url(#apx-gb)');
    // windows + door
    const wy = t + Math.max(12, h * .28);
    [x + w * .18, x + w * .62].forEach((wx, i) => {
      s += R(wx, wy, w * .2, 14, '#16100d') + R(wx - 3, wy, 3, 14, col, 'opacity=".7"') + R(wx + w * .2, wy, 3, 14, col, 'opacity=".7"');
      if (o.boarded || (o.collapsed && i)) s += Ln(wx - 2, wy, wx + w * .2 + 2, wy + 14, '#8b6b4a', 2.4) + Ln(wx + w * .2 + 2, wy + 1, wx - 2, wy + 13, '#7a5c3e', 2.4);
      if (o.lit && !i) s += R(wx, wy, w * .2, 14, '#ffbf5a', 'opacity=".75"');
    });
    s += R(x + w * .42, b - 22, w * .16, 22, '#2a1d16');
    if (o.hole) s += Pa(`M${x + 6} ${b - 30} l8 -6 l6 5 l-2 9 l-9 2 Z`, '#120d0b');
    return s;
  }
  function palm(x, y, h, lean, broken) {
    const tx = x + lean, ty = y - h;
    let s = Pa(`M${x - 4} ${y} Q${x + lean * .3} ${y - h * .55} ${tx - 2} ${ty} L${tx + 3} ${ty} Q${x + lean * .3 + 6} ${y - h * .55} ${x + 5} ${y} Z`, '#7a6048', 'stroke="#3a2a1e" stroke-width="1"');
    for (let i = 0; i < 8; i++) s += Ln(x + lean * (i / 8) * .9, y - h * i / 8, x + lean * (i / 8) * .9 + 4, y - h * i / 8, '#2c2119', 1);
    const fr = broken ? [[-40, 14], [-20, 28], [30, 24], [44, 34]] : [[-46, 10], [-30, 26], [-8, 30], [26, 26], [46, 12], [38, -10], [-36, -12]];
    let f = '';
    fr.forEach(([dx, dy], i) => { f += Pa(`M${tx} ${ty} Q${tx + dx * .55} ${ty - 14 + dy * .2} ${tx + dx} ${ty + dy} Q${tx + dx * .5} ${ty - 4 + dy * .3} ${tx} ${ty + 2} Z`, i % 2 ? '#3f5a2b' : '#4d6a30'); });
    if (broken) f += Pa(`M${tx} ${ty} L${tx - 8} ${ty + 30} L${tx - 4} ${ty + 30} Z`, '#6b5a2e');
    f += E(tx - 2, ty + 4, 4, 4, '#5a4020') + E(tx + 4, ty + 5, 4, 4, '#4a3418');
    return s + G(f, 'class="apx-palm"');
  }
  function seagrape(x, y, k) {
    let s = ''; const pts = [[0, 0], [-12, -6], [12, -5], [-6, -16], [7, -15], [0, -24], [-18, 4], [18, 3]];
    pts.forEach(([dx, dy], i) => s += `<circle cx="${x + dx * k}" cy="${y + dy * k}" r="${8 * k}" fill="${i % 3 ? '#4f6b2f' : '#5d7a35'}"/>` + Ln(x + dx * k - 3 * k, y + dy * k, x + dx * k + 3 * k, y + dy * k, '#8a3a2a', .8));
    return s;
  }
  function smoke(x, y, n, dark) {
    let s = '';
    for (let i = 0; i < n; i++) s += E(x + (i % 2 ? 4 : -4), y, 13, 10, dark ? '#4a4041' : '#8a7f7a', `class="apx-smk" style="--i:${i};animation-delay:-${(i * 10 / n).toFixed(2)}s" filter="url(#apx-blur)"`);
    return s + E(x, y - 4, 8, 6, '#3a3030', 'opacity=".7" filter="url(#apx-blur)"');
  }
  function zombie(x, y, tone, hair, k, d) {
    // distant, softened silhouette in a muted tone; arms forward; never gory
    let s = Pa(`M${-4} ${-10} L${-3} 0 L${-1} 0 L0 ${-9} L1 0 L3 0 L4 ${-10} Z`, '#2b2727') +
      Pa(`M-5 -10 Q-6 -20 -4 -22 L4 -22 Q6 -20 5 -10 Z`, tone) +
      Ln(-3, -20, 9, -17, tone, 2.4) + Ln(3, -20, 11, -15, tone, 2.4) + `<circle cx="0" cy="-26" r="4" fill="${tone}"/>`;
    const H = { afro: `<circle cx="0" cy="-28" r="5.2" fill="#1d1816"/>`, long: Pa('M-4 -29 Q0 -32 4 -29 L5 -19 L3 -21 L-3 -21 L-5 -19 Z', '#2a2018'), locs: Pa('M-4 -29 Q0 -32 4 -29 L6 -18 L4 -18 L3 -24 L-3 -24 L-4 -18 L-6 -18 Z', '#1d1816'), bun: `<circle cx="0" cy="-32" r="2.4" fill="#2a2018"/>` + Pa('M-4 -27 Q0 -32 4 -27 Z', '#2a2018'), cap: Pa('M-5 -27 Q0 -33 5 -27 L9 -27 L9 -26 L-5 -26 Z', '#3a3532'), short: Pa('M-4 -27 Q0 -32 4 -27 Z', '#1d1816') };
    s = s.replace(`r="4" fill="${tone}"/>`, `r="4" fill="${tone}"/>` + (H[hair] || ''));
    return G(G(s, `class="apx-zw" style="animation-delay:-${d}s"`), `transform="translate(${x} ${y}) scale(${k})" opacity=".82"`);
  }

  /* survivors: origin at feet; tired, patched, determined */
  function person(o) {
    const sk = o.skin, sh = o.shirt, pt = o.pants, dk = 'rgba(40,20,10,.38)';
    let back = '', body = '', front = '';
    if (o.pack) back += R(-30, -112, 22, 40, '#5b5a3a', 'rx="5"') + R(-28, -96, 18, 10, '#4a492f', 'rx="3"') + Ln(-26, -108, -12, -108, '#33321f', 1.5);
    if (o.braid) back += Pa('M6 -142 Q20 -120 14 -84 L9 -84 Q14 -118 2 -138 Z', o.hairc);
    if (o.locs) for (let i = -3; i <= 3; i++) back += Ln(i * 4.2, -146, i * 5.6, -112 + Math.abs(i) * 3, o.hairc, 4.6);
    // legs
    if (o.skirt) body += Pa('M-20 -60 L-24 -8 L24 -8 L20 -60 Z', pt) + Pa('M-6 -30 l5 4 l-2 6 l6 3 l-1 9 l-10 0 Z', 'rgba(0,0,0,.35)') + R(-12, -8, 6, 6, sk) + R(6, -8, 6, 6, sk);
    else body += R(-15, -62, 12, 56, pt) + R(3, -62, 12, 56, pt) + Pa('M5 -36 l4 -3 l4 3 l-1 5 l-6 1 Z', sk) + Pa('M-13 -24 l9 0 l0 8 l-9 0 Z', o.patchc || '#8a6a4a', 'stroke="#e8d9b8" stroke-width=".8" stroke-dasharray="2 1.5"');
    body += E(-9, -4, 10, 5, '#231a15') + E(9, -4, 10, 5, '#231a15');
    // torso (breathes)
    let tor = Pa('M-20 -58 L-22 -104 Q-20 -116 -8 -118 L8 -118 Q20 -116 22 -104 L20 -58 Z', sh) + R(-20, -66, 40, 8, 'rgba(0,0,0,.18)');
    if (o.jacket) tor += Pa('M-20 -58 L-22 -104 Q-20 -116 -8 -118 L-3 -118 L-2 -58 Z', o.jacket) + Pa('M20 -58 L22 -104 Q20 -116 8 -118 L3 -118 L2 -58 Z', o.jacket);
    if (o.plaid) for (let i = -16; i < 20; i += 8) tor += Ln(i, -116, i, -60, 'rgba(255,214,90,.35)', 1.6) + Ln(-20, -112 + (i + 16) * 1.4, 20, -112 + (i + 16) * 1.4, 'rgba(30,20,60,.3)', 1.6);
    tor += Pa('M8 -78 l6 -4 l-1 7 l6 2 l-6 4 l-3 6 l-3 -8 Z', 'rgba(0,0,0,.45)'); // tear
    tor += R(-16, -92, 10, 10, o.patchc || '#c79a4a', 'stroke="#efe2c4" stroke-width=".8" stroke-dasharray="2 1.5" transform="rotate(-8 -11 -87)"');
    tor += E(o.gx || -10, -100, 4, 2.6, dk) + E(-(o.gx || -10) / 2, -72, 5, 2.4, dk); // grime
    if (o.pack) tor += Ln(-14, -116, -10, -64, '#33321f', 3.4) + Ln(14, -116, 10, -64, '#33321f', 3.4);
    if (o.satchel) tor += Ln(-16, -116, 18, -70, '#1f5b5a', 3.4);
    // arms
    const arm = (sx, sy, ex, ey, hx, hy, bandage) => {
      let a = Ln(sx, sy, ex, ey, o.jacket || sh, 10) + Ln(ex, ey, hx, hy, sk, 7.5) + `<circle cx="${hx}" cy="${hy}" r="4.6" fill="${sk}"/>`;
      if (bandage) a += Ln(ex + (hx - ex) * .2, ey + (hy - ey) * .2, ex + (hx - ex) * .8, ey + (hy - ey) * .8, '#e9e1cf', 8.2) + Ln(ex + (hx - ex) * .3, ey + (hy - ey) * .3 - 2, ex + (hx - ex) * .7, ey + (hy - ey) * .7 + 2, '#bdb39d', .8) + E(ex + (hx - ex) * .55, ey + (hy - ey) * .55, 2.4, 1.8, '#c7a989');
      return a;
    };
    const L = o.armL || [-22, -110, -27, -86, -24, -64], Rr = o.armR || [22, -110, 27, -86, 24, -64];
    if (o.sling) tor += Ln(-14, -114, 8, -82, '#e9e1cf', 4);
    tor += arm(...L, o.bandL) + arm(...Rr, o.bandR);
    if (o.sling) tor += Pa('M-22 -92 Q-6 -78 10 -84 L8 -76 Q-6 -70 -22 -84 Z', '#e9e1cf');
    // neck + head
    tor += R(-5, -126, 10, 10, sk) + E(-15, -140, 3, 4.5, sk) + E(15, -140, 3, 4.5, sk) + E(0, -140, 14, 16, sk);
    if (o.freckles) [-8, -6, -4, 4, 6, 8].forEach((fx, i) => tor += `<circle cx="${fx}" cy="${-133 + (i % 2)}" r=".8" fill="#a0603a" opacity=".8"/>`);
    // tired eyes: half lids + bags; brows set in determination
    [-5.5, 5.5].forEach(ex => {
      tor += E(ex, -140, 2.6, 1.6, '#f1ece2') + `<circle cx="${ex}" cy="-139.6" r="1.4" fill="#1a110c"/>` + Pa(`M${ex - 3.2} -140.6 Q${ex} -143.4 ${ex + 3.2} -140.6 L${ex + 3.2} -141.4 Q${ex} -144.4 ${ex - 3.2} -141.4 Z`, sk, 'opacity=".95"') + Ln(ex - 3.6, -141, ex + 3.6, -141, 'rgba(30,15,8,.75)', .9);
      tor += Pa(`M${ex - 3} -136.8 Q${ex} -134.6 ${ex + 3} -136.8`, 'none', 'stroke="rgba(60,25,30,.45)" stroke-width="1.1"');
      tor += Ln(ex - (ex < 0 ? 3.4 : -3.4), -146.4, ex + (ex < 0 ? 3.2 : -3.2), -145, o.hairc, 1.6);
    });
    tor += Pa('M-3.5 -129.5 Q0 -130.6 3.5 -129.2', 'none', 'stroke="#4a2018" stroke-width="1.3" stroke-linecap="round"');
    tor += E(o.smudge || 7, -132, 4.5, 2.6, 'rgba(50,30,15,.4)') + E(-6, -150, 3, 1.6, 'rgba(50,30,15,.3)');
    if (o.plaster) tor += R(-8, -154, 9, 4, '#e2c9a2', 'transform="rotate(-18 -4 -152)"');
    if (o.mous) tor += Pa('M-6 -131.6 Q0 -134 6 -131.6 Q0 -132.4 -6 -131.6 Z', o.hairc, 'stroke="' + o.hairc + '" stroke-width="1.6"');
    if (o.stubble) tor += E(0, -128, 9, 5, 'rgba(30,20,15,.25)');
    // hair
    const hc = o.hairc, H = {
      locs: Pa('M-15 -142 Q-16 -160 0 -160 Q16 -160 15 -142 Q12 -152 0 -153 Q-12 -152 -15 -142 Z', hc) + R(-14, -152, 28, 4, o.band || '#d9692e', 'rx="2"') + `<circle cx="0" cy="-163" r="6" fill="${hc}"/>`,
      short: Pa('M-14 -144 Q-15 -158 0 -158 Q15 -158 14 -144 Q10 -151 0 -151 Q-10 -151 -14 -144 Z', hc),
      straight: Pa('M-15 -136 Q-17 -160 0 -159 Q17 -160 15 -136 L13 -144 Q6 -147 -2 -146 L-6 -149 L-10 -145 L-13 -143 Z', hc),
      braid: Pa('M-15 -138 Q-16 -159 0 -158 Q16 -159 15 -138 Q12 -150 0 -151 Q-12 -150 -15 -138 Z', hc) + Pa('M-12 -152 Q0 -158 12 -152', 'none', 'stroke="#b8b2a6" stroke-width="1.6"') + R(-15, -153, 30, 4, o.band || '#7a3a1c', 'rx="2"'),
      curly: [[-12, -152], [-6, -157], [1, -158], [8, -156], [13, -150], [-14, -144], [14, -143]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="6" fill="${hc}"/>`).join('') + Pa('M-14 -150 Q0 -162 14 -150 L13 -146 Q0 -154 -13 -146 Z', o.band || '#1f6f6a')
    };
    tor += H[o.hair] || '';
    if (o.glasses) tor += `<g fill="none" stroke="#1a1a1a" stroke-width="1.3"><circle cx="-5.5" cy="-140" r="4"/><circle cx="5.5" cy="-140" r="4"/><line x1="-1.5" y1="-140" x2="1.5" y2="-140"/></g>` + R(-2, -142, 4, 4, '#efe9dc', 'transform="rotate(12 0 -140)"') + Ln(1, -137, 9, -143, 'rgba(255,255,255,.7)', .5);
    // props
    if (o.radio) front += R(-6, -98, 22, 15, '#3b3f3c', 'rx="2"') + R(-3, -95, 9, 9, '#202322') + `<circle cx="11" cy="-91" r="2.6" fill="#8d918c"/>` + Ln(12, -98, 20, -124, '#9aa09a', 1.4) + `<circle class="apx-led" cx="20" cy="-125" r="1.8" fill="#ff7a3a"/>` + R(-6, -92, 22, 2.4, '#c7a07a', 'opacity=".7"');
    if (o.toolbox) front += R(10, -66, 30, 18, '#a3362a', 'rx="2"') + R(10, -66, 30, 4, '#7a2820') + Pa('M18 -66 Q25 -76 32 -66', 'none', 'stroke="#3a3a3a" stroke-width="2"') + Ln(30, -68, 42, -82, '#9ca3a6', 3) + `<circle cx="43" cy="-84" r="3.2" fill="none" stroke="#9ca3a6" stroke-width="2"/>` + R(12, -58, 12, 3, 'rgba(0,0,0,.3)');
    if (o.clip) front += R(-14, -100, 28, 34, '#b98d55', 'rx="2" transform="rotate(-6 0 -83)"') + R(-11, -96, 22, 27, '#efe6d2', 'transform="rotate(-6 0 -83)"') + Pa('M-8 -88 l14 -2 M-8 -82 l10 -1 M-8 -76 l16 -2', 'none', 'stroke="#5a4a3a" stroke-width="1"') + Pa('M0 -78 l6 -6 l3 4', 'none', 'stroke="#c0392b" stroke-width="1.3"') + R(-4, -102, 8, 4, '#7a7a7a');
    if (o.calabash) front += E(18, -66, 12, 9, '#8a6a2e') + Pa('M7 -68 Q18 -60 29 -68', 'none', 'stroke="#5a431a" stroke-width="1.2"') + Pa('M9 -70 l4 -2 l4 2 l4 -2 l4 2 l4 -2', 'none', 'stroke="#d9c08a" stroke-width=".9"') + R(-36, -86, 22, 18, '#a8803f', 'rx="3"') + Pa('M-36 -82 h22 M-36 -77 h22 M-36 -72 h22 M-31 -86 v18 M-25 -86 v18 M-19 -86 v18', 'none', 'stroke="#6e5126" stroke-width="1"') + Pa('M-34 -86 Q-25 -100 -16 -86', 'none', 'stroke="#6e5126" stroke-width="1.6"');
    if (o.satchel) front += R(8, -76, 22, 18, '#1f6f6a', 'rx="3"') + R(8, -76, 22, 6, '#195a56', 'rx="2"') + Pa('M17 -70 h4 v3 h3 v4 h-3 v3 h-4 v-3 h-3 v-4 h3 Z', '#f2ede2');
    return G(back + body + G(tor, `class="apx-br" style="animation-delay:-${o.dl || 0}s"`) + front, `transform="translate(${o.x} 398) scale(${(o.k || 1) * .9})"`);
  }

  function scene(stg, view) {
    const hope = stg / 4; // 0 = Day 1 (worst) ... 1 = Day 5 (rebuilding)
    const mix = (a, b) => { const p = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * hope).toString(16).padStart(2, '0')).join(''); };
    const sky = [mix('#17121a', '#20203a'), mix('#36202a', '#4a2f4a'), mix('#6e2e22', '#b5502a'), mix('#a64a1f', '#ffb347')];
    let s = `<defs><linearGradient id="apx-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".35" stop-color="${sky[1]}"/><stop offset=".7" stop-color="${sky[2]}"/><stop offset="1" stop-color="${sky[3]}"/></linearGradient>
<radialGradient id="apx-sun"><stop offset="0" stop-color="${mix('#ffb27a', '#fff3c4')}"/><stop offset=".35" stop-color="${mix('#e0662a', '#ffc04d')}" stop-opacity=".8"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>
<linearGradient id="apx-grime" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".1"/><stop offset=".6" stop-color="#2a1a10" stop-opacity=".25"/><stop offset="1" stop-color="#1a0f08" stop-opacity=".6"/></linearGradient>
<linearGradient id="apx-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#5a3a34', '#c47a4a')}"/><stop offset="1" stop-color="#1f2a2e"/></linearGradient>
<linearGradient id="apx-haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[2]}" stop-opacity="0"/><stop offset="1" stop-color="${sky[3]}" stop-opacity=".45"/></linearGradient>
<pattern id="apx-gb" width="8" height="6" patternUnits="userSpaceOnUse"><path d="M0 0 h8 v1.4 a4 4 0 0 1 -8 0 Z" fill="#e9e0cc" opacity=".85"/><circle cx="4" cy="2.4" r=".9" fill="#2a1f18"/></pattern>
<filter id="apx-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2"/></filter></defs>`;
    s += R(0, 0, 1200, 400, 'url(#apx-sky)');
    // sun + (Day 5) rays breaking through
    s += `<circle cx="700" cy="${222 - 40 * hope}" r="${70 + 30 * hope}" fill="url(#apx-sun)"/>`;
    if (stg >= 3) for (let i = 0; i < 7; i++) s += Pa(`M700 ${222 - 40 * hope} L${520 + i * 60} 0 L${548 + i * 60} 0 Z`, '#ffd98a', `class="apx-ray" opacity="${stg === 4 ? .16 : .08}" style="animation-delay:-${i * 1.3}s"`);
    // smoke-filled cloud bands
    s += E(260, 70, 300, 26, '#1b1416', `opacity="${.6 - .35 * hope}"`) + E(980, 46, 360, 30, '#1b1416', `opacity="${.55 - .35 * hope}"`) + E(560, 120, 260, 14, '#3a2424', 'opacity=".45"');
    // sea
    s += R(0, 248, 1200, 60, 'url(#apx-sea)') + Ln(150, 262, 330, 262, 'rgba(255,190,140,.25)', 1) + Ln(200, 274, 300, 274, 'rgba(255,190,140,.18)', 1);
    // far hills
    s += Pa('M300 260 Q420 214 520 236 Q600 222 660 212 Q760 150 880 118 Q930 108 990 130 Q1080 160 1200 150 L1200 300 L300 300 Z', mix('#2a1c1c', '#3c2a26'));
    s += Pa('M560 262 Q700 236 820 226 Q960 214 1200 230 L1200 300 L560 300 Z', mix('#3a2520', '#4d3528'));
    // hill settlement + council flag (more lights each day)
    const huts = [[860, 132], [884, 124], [930, 120], [956, 128], [982, 136]];
    huts.forEach(([hx, hy], i) => { s += R(hx, hy, 16, 11, '#5b4a3c') + Pa(`M${hx - 2} ${hy} L${hx + 8} ${hy - 7} L${hx + 18} ${hy} Z`, '#8a8f92'); if (i <= stg) s += R(hx + 5, hy + 3, 5, 5, '#ffcc66', 'opacity=".9"'); });
    s += Ln(906, 122, 906, 74, '#2a2420', 2) + G(Pa('M907 75 L942 80 L907 92 Z', stg >= 2 ? '#F2B33D' : '#c9b68a') + `<circle cx="918" cy="83" r="3" fill="#2a6a4a"/>`, 'class="apx-flag"');
    // sugar-mill tower ruin with broken sails + great-house ruin
    s += Pa('M752 214 L758 168 L782 168 L788 214 Z', '#7a6a5a') + Pa('M758 168 l4 -5 l6 3 l5 -4 l5 4 l4 2 Z', '#7a6a5a') + Pa('M766 214 v-14 a4 4 0 0 1 8 0 v14 Z', '#2a201a') + Ln(770, 176, 742, 150, '#3a2e24', 2.2) + Ln(770, 176, 790, 196, '#3a2e24', 2.2) + Ln(770, 176, 784, 146, '#3a2e24', 1.6) + R(753, 182, 34, 3, 'rgba(0,0,0,.2)');
    s += R(1010, 196, 90, 10, '#6a5e52') + [1016, 1034, 1052, 1070, 1088].map(cx => R(cx, 170, 5, 26, '#c9bfae')).join('') + Pa('M1006 170 L1040 154 L1060 166 L1075 158 L1104 170 Z', '#4a3a30') + R(1030, 178, 10, 18, '#1a1410') + R(1062, 178, 10, 18, '#1a1410');
    // colonial stone fort on the headland, cannons to sea
    s += Pa('M0 200 Q60 196 120 214 Q150 236 170 252 L0 252 Z', '#3a2b24');
    s += R(10, 176, 120, 26, '#7d7064') + [10, 26, 42, 58, 74, 90, 106, 122].map(cx => R(cx, 170, 9, 7, '#7d7064')).join('') + R(10, 194, 120, 8, 'rgba(0,0,0,.25)');
    s += Pa('M118 176 h16 v-14 a8 8 0 0 0 -16 0 Z', '#8a7d70') + R(122, 164, 3, 8, '#1a1410') + Pa('M40 186 L58 188 L58 196 L40 194 Z', '#1a1410');
    [[134, 188], [134, 176]].forEach(([cx, cy]) => s += Ln(cx - 6, cy, cx + 16, cy - 3, '#262220', 5) + `<circle cx="${cx - 4}" cy="${cy + 3}" r="3.4" fill="#4a3a2a"/>`);
    // salt pond
    s += E(690, 252, 70, 6, mix('#a86a7a', '#e8a0a8'), 'opacity=".75"') + E(690, 251, 50, 2, '#f2d0d8', 'opacity=".35"');
    // distant shambling figures: varied tones and hairstyles, nobody singled out
    const Zs = [[452, 244, '#5b4636', 'afro'], [478, 241, '#a68a6e', 'long'], [612, 240, '#3f2e24', 'locs'], [636, 238, '#c0a487', 'cap'], [500, 246, '#8c7158', 'bun'], [588, 243, '#6e5a44', 'short'], [662, 236, '#9a7c62', 'long']].slice(0, [7, 6, 5, 3, 2][stg]);
    s += G(Zs.map(([zx, zy, t, h], i) => zombie(zx, zy, t, h, 1.25, i * .8)).join(''), 'filter="saturate(.55)"');
    // fishing pirogues on the beach + rusted trawler
    s += Pa('M0 292 Q120 282 300 296 L300 320 L0 320 Z', '#8a7458');
    s += Pa('M168 266 L300 258 L292 282 L180 288 Z', '#7a3a1e', 'transform="rotate(-7 230 274)"') + R(250, 238, 28, 22, '#6a3a22', 'transform="rotate(-7 260 250)"') + Ln(214, 266, 206, 222, '#3a2a20', 2.4) + Pa('M180 280 l20 -2 l-4 4 Z M232 276 l14 -1', '#3a1a10', 'opacity=".6"');
    [[36, 300, '#2f6fa8', '#F2B33D'], [118, 304, '#c8402f', '#e8e0c8']].forEach(([bx, by, c1, c2], i) => s += G(Pa(`M${bx} ${by} Q${bx + 34} ${by + 16} ${bx + 74} ${by - 2} L${bx + 70} ${by - 8} L${bx + 2} ${by - 7} Z`, c1) + Pa(`M${bx + 2} ${by - 7} L${bx + 70} ${by - 8} L${bx + 71} ${by - 5} L${bx + 3} ${by - 4} Z`, c2) + (stg === 4 && !i ? `<text x="${bx + 26}" y="${by + 3}" font-size="7" font-weight="700" fill="#fff" font-family="sans-serif">HOPE</text>` : ''), i ? 'transform="rotate(8 150 300)"' : ''));
    // town of chattel / gingerbread houses (rebuilding patches appear over the days)
    s += palm(318, 300, 90, 22, stg < 2);
    s += house(300, 58, 56, '#3f8f8a', { collapsed: stg < 3, patch: stg >= 3 });
    s += house(362, 52, 64, '#c86a86', { boarded: true });
    // market with fallen sign
    s += R(420, 262, 66, 38, '#2a201a') + Pa('M414 262 L492 256 L490 262 L414 266 Z', '#8d8f8a') + Ln(418, 264, 418, 300, '#5a4a3a', 3) + Ln(486, 260, 486, 300, '#5a4a3a', 3) + R(426, 282, 18, 14, '#7a5a34') + R(450, 286, 14, 10, '#7a5a34') + E(434, 282, 7, 3, '#7a8a3a') + E(456, 286, 5, 2.4, '#c8702a');
    s += G(R(0, 0, 56, 14, '#e3d39b') + `<text x="28" y="10.5" text-anchor="middle" font-size="9" font-weight="800" letter-spacing="1.5" fill="#7a2a1a" font-family="Impact,'DejaVu Sans Condensed',sans-serif">MARKET</text>`, 'transform="translate(412 254) rotate(-16)"');
    s += house(494, 54, 60, '#5a7fc0', { collapsed: stg < 4, patch: stg >= 4, hole: true });
    s += smoke(512, 236, 6, stg < 2);
    // church with broken bell tower
    s += R(556, 236, 56, 64, '#8a8278') + Pa('M552 236 L584 212 L616 236 Z', '#5a4d44') + R(612, 196, 22, 104, '#958c80') + Pa('M612 196 L623 172 L630 186 L634 182 L634 196 Z', '#5a4d44') + Pa('M577 300 v-26 a7 7 0 0 1 14 0 v26 Z', '#2a201a') + Pa('M618 226 v-12 a5 5 0 0 1 10 0 v12 Z', '#1e1814') + R(582, 244, 4, 14, '#2a201a') + R(578, 248, 12, 4, '#2a201a') + Pa('M556 260 l14 -6 l6 10 l-8 8 Z', 'rgba(0,0,0,.25)');
    s += smoke(626, 160, 7, stg < 1);
    // house with gallery and an abandoned steelpan
    s += house(642, 76, 70, '#e08a4a', { lit: stg >= 3 });
    s += R(640, 270, 80, 3, '#e9e0cc') + [644, 660, 676, 692, 708, 716].map(gx => R(gx, 270, 2.4, 30, '#e9e0cc')).join('') + Ln(640, 284, 720, 284, '#e9e0cc', 1.4);
    s += E(668, 276, 9, 3, '#c9cdd0') + E(668, 275, 7, 2, '#7a7f84') + Ln(662, 278, 660, 296, '#3a3a3a', 1.4) + Ln(674, 278, 676, 296, '#3a3a3a', 1.4) + Ln(684, 290, 690, 276, '#c4a46a', 1);
    // rum shop
    s += house(724, 58, 58, '#6f9e52', {});
    s += R(726, 252, 54, 12, '#2a1d16') + `<text x="753" y="261.5" text-anchor="middle" font-size="8" font-weight="800" letter-spacing="1" fill="${stg >= 2 ? '#F2B33D' : '#a8936a'}" font-family="Impact,'DejaVu Sans Condensed',sans-serif">RUM SHOP</text>`;
    s += house(786, 62, 64, '#b65a4a', { collapsed: stg < 2, patch: stg >= 2, boarded: true });
    s += smoke(820, 226, 5, false);
    s += house(852, 58, 52, '#d9c27a', { boarded: stg < 3, lit: stg >= 1 });
    if (stg < 3) s += smoke(380, 238, 5, true);
    if (!stg) s += smoke(880, 244, 6, true);
    // Day 5 bunting across the street
    if (stg === 4) { let bt = Pa('M300 246 Q560 274 910 250', 'none', 'stroke="#2a2420" stroke-width="1"'); const cols = ['#F2B33D', '#c8402f', '#2f6fa8', '#3f8f8a', '#e9e0cc']; for (let i = 0; i < 26; i++) { const t = i / 25, bx = 300 + 610 * t, by = 246 + 4 * (1 - (2 * t - 1) ** 2) * 6.4 + (t < .43 ? 0 : 0); bt += Pa(`M${bx - 6} ${by} L${bx + 6} ${by + .5} L${bx} ${by + 11} Z`, cols[i % 5]); } s += bt; }
    // streetlight (gentle flicker)
    s += Ln(952, 300, 952, 214, '#2b2624', 3.4) + Ln(952, 216, 974, 214, '#2b2624', 2.6) + Pa('M968 214 h14 l-3 6 h-8 Z', '#3a3330') + G(E(975, 232, 32, 24, '#ffbf6a', 'opacity=".22" filter="url(#apx-blur)"') + E(975, 221, 5, 2.4, '#ffe0a0'), 'class="apx-lamp"');
    // right palm, sea grape
    s += palm(1110, 314, 120, -30, false) + seagrape(1010, 304, 1.3) + seagrape(150, 318, 1);
    // ground: cracked road and rubble
    s += Pa('M0 316 Q300 304 600 312 Q900 320 1200 306 L1200 400 L0 400 Z', mix('#2a221e', '#33291f'));
    s += Pa('M0 346 Q400 334 800 344 Q1000 350 1200 338 L1200 400 L0 400 Z', '#1d1816');
    s += Pa('M160 356 l40 4 l18 -6 l30 8 M520 366 l26 -6 l20 8 l34 -4 M880 352 l22 8 l30 -6', 'none', 'stroke="#0e0b0a" stroke-width="1.4"');
    [[220, 340], [270, 344], [860, 338], [1050, 346], [1130, 340]].forEach(([rx, ry], i) => s += Pa(`M${rx} ${ry} l8 -7 l10 2 l4 7 Z`, i % 2 ? '#5a4e46' : '#6a5a4a'));
    s += `<circle cx="1160" cy="356" r="13" fill="#181414"/><circle cx="1160" cy="356" r="6" fill="#2a2420"/>` + R(240, 352, 30, 20, '#6a4e30') + Ln(240, 362, 270, 362, '#4a3420', 1);
    // fence with a torn carnival costume
    s += Ln(1030, 360, 1030, 318, '#4a3a2a', 3) + Ln(1090, 362, 1090, 316, '#4a3a2a', 3) + Ln(1030, 326, 1090, 324, '#8a8a8a', 1) + Ln(1030, 340, 1090, 338, '#8a8a8a', 1);
    let cos = ''; ['#c8402f', '#F2B33D', '#2f9a8a', '#8a3fa8', '#e8628a', '#F2B33D', '#2f6fa8'].forEach((c, i) => cos += Pa(`M1060 338 Q${1030 + i * 10} ${310} ${1036 + i * 8} ${296 + (i % 2) * 6} Q${1044 + i * 8} ${312} 1060 338 Z`, c, `opacity="${i === 3 ? .55 : .9}"`));
    cos += Pa('M1050 336 L1072 336 L1076 352 L1062 348 L1058 358 L1046 350 Z', '#c8a83a') + [1052, 1058, 1064, 1070].map((cx, i) => `<circle cx="${cx}" cy="${342 + (i % 2) * 4}" r="1.3" fill="#fff4c0"/>`).join('');
    s += G(cos, 'class="apx-sw" style="animation-duration:8s"');
    // hand-painted safe-zone sign
    s += Ln(300, 352, 300, 266, '#3a2a1e', 4) + Ln(398, 352, 398, 266, '#3a2a1e', 4) + G(R(272, 258, 156, 40, '#c9b48a') + R(272, 258, 156, 40, 'url(#apx-grime)') + Ln(272, 278, 428, 278, 'rgba(60,40,20,.35)', 1) + `<text x="350" y="274" text-anchor="middle" font-size="12.5" font-weight="800" letter-spacing="1" fill="#2a1a10" font-family="Impact,'DejaVu Sans Condensed',sans-serif">NEW CALABASH BAY —</text><text x="350" y="292" text-anchor="middle" font-size="12.5" font-weight="800" letter-spacing="1.5" fill="#a3361e" font-family="Impact,'DejaVu Sans Condensed',sans-serif">SAFE ZONE ↑</text>`, 'transform="rotate(-3 350 278)"');
    // survivors: African-, Indo-, Chinese-Caribbean, Kalinago elder, mixed Latin/European heritage
    const ppl = [
      { x: 466, skin: '#5a3522', hair: 'locs', locs: 1, hairc: '#1b1310', band: '#d9692e', shirt: '#d8b44a', jacket: '#3f5f86', pants: '#2e2a28', radio: 1, armR: [22, -110, 18, -94, 4, -92], bandL: 1, patchc: '#a8432f', dl: .3 },
      { x: 556, skin: '#9a6440', hair: 'short', hairc: '#141010', shirt: '#a8432f', plaid: 1, pants: '#6d5f45', pack: 1, toolbox: 1, mous: 1, plaster: 1, armR: [22, -110, 27, -86, 26, -66], dl: 1.4, k: 1.05 },
      { x: 644, skin: '#e8c39e', hair: 'straight', hairc: '#15110f', shirt: '#3d6b4f', pants: '#334155', glasses: 1, clip: 1, armL: [-22, -110, -20, -88, -10, -84], armR: [22, -110, 20, -88, 10, -86], k: .92, smudge: -7, dl: 2.2 },
      { x: 732, skin: '#b8835a', hair: 'braid', braid: 1, hairc: '#3a3330', shirt: '#d8c7a5', pants: '#7a4a2a', skirt: 1, calabash: 1, armL: [-22, -110, -26, -92, -25, -84], armR: [22, -110, 24, -86, 18, -70], patchc: '#5a8a6a', dl: .9 },
      { x: 818, skin: '#efcfb2', hair: 'curly', hairc: '#7a3b1e', band: '#1f6f6a', freckles: 1, shirt: '#c9b48a', pants: '#4a5a3a', satchel: 1, sling: 1, bandR: 1, armL: [-22, -110, -16, -88, 4, -84], k: .98, dl: 3 }
    ];
    s += R(400, 392, 480, 8, 'rgba(0,0,0,.35)', 'rx="5" filter="url(#apx-blur)"');
    s += ppl.map(person).join('');
    // haze + dark foreground edges
    s += R(0, 200, 1200, 120, 'url(#apx-haze)') + R(0, 0, 1200, 400, 'none', 'stroke="#000" stroke-opacity=".35" stroke-width="10"');
    return `<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false" class="apx-scene apx-d${stg}" data-view="${view}">${s}</svg>`;
  }

  /* ---------- placement on the zombie views ---------- */
  function info() {
    let v = '', d = 0, done = 0, total = 5;
    try {
      const S = window.COURSE_API && window.COURSE_API.S; const Z = window.COURSE_ZOMBIE;
      v = (S && S.loc && S.loc.v) || ''; d = Math.max(0, Math.min(4, Number(S && S.loc && S.loc.d) || 0));
      if (Z && Z.days) { total = Z.days.length; done = Z.days.filter(day => day.challenges.every(c => S.zdone && S.zdone[c.id])).length; }
    } catch (e) { }
    const stg = (v === 'zday' || v === 'zc') ? d : Math.min(4, done);
    return { v, d, stg, total };
  }
  const CAPS = ['Day 1: smoke still hangs over the broken harbour town', 'Day 2: fires dying down along the harbour', 'Day 3: first roofs patched and lamps relit', 'Day 4: the hill settlement lights up', 'Day 5: sunrise and bunting as the town rebuilds'];
  function tally(n) {
    let s = '', x = 0; n = Math.max(1, Math.min(15, n));
    for (let i = 0; i < n; i++) { if (i % 5 === 4) { s += `<line x1="${x - 22}" y1="15" x2="${x - 1}" y2="3" stroke="#FFCF73" stroke-width="2" stroke-linecap="round"/>`; x += 6; } else { s += `<line x1="${x}" y1="${2 + (i % 2)}" x2="${x + (i % 3) - 1}" y2="16" stroke="#F2E8D8" stroke-width="2" stroke-linecap="round"/>`; x += 6; } }
    return `<span class="apx-tally" aria-hidden="true"><svg viewBox="-2 0 ${x + 2} 18">${s}</svg></span>`;
  }
  function decorate() {
    if (document.documentElement.dataset.zone !== 'apoc') return;
    const stage = document.getElementById('stage'); if (!stage) return;
    const si = stage.querySelector('.stage-in') || stage; if (si.querySelector('.apx-banner')) return;
    const I = info();
    const fig = document.createElement('figure'); fig.className = 'apx-banner';
    const tag = I.v === 'zombie' || !I.v ? 'NEW CALABASH BAY · COUNCIL HQ' : `NEW CALABASH BAY · DAY ${I.d + 1} OF ${I.total}`;
    fig.innerHTML = `<span class="apx-tag" aria-hidden="true">${tag}</span>${scene(I.stg, I.v)}<figcaption class="sr">Illustration: survivors of many Caribbean backgrounds in the ruined harbour of New Calabash Bay. ${CAPS[I.stg]}.</figcaption>`;
    si.insertBefore(fig, si.firstChild);
    si.querySelectorAll('.tile .ribbon').forEach(rb => { const m = /Skill level (\d+)/i.exec(rb.textContent); if (m && !rb.parentNode.querySelector('.apx-tally')) rb.insertAdjacentHTML('afterend', tally(+m[1])); });
  }

  /* ---------- atmosphere layer: ash + embers ---------- */
  let fx = null, cv = null, cx = null, parts = [], raf = 0, running = false;
  function buildFx() {
    if (fx || !document.body) return;
    fx = document.createElement('div'); fx.className = 'apx-fx'; fx.setAttribute('aria-hidden', 'true');
    fx.innerHTML = '<canvas></canvas><i class="apx-fog f1"></i><i class="apx-fog f2"></i><i class="apx-fog f3"></i><i class="apx-scan"></i><i class="apx-flk"></i><i class="apx-vig"></i>';
    document.body.insertBefore(fx, document.body.firstChild);
    cv = fx.querySelector('canvas'); try { cx = cv.getContext && cv.getContext('2d'); } catch (e) { cx = null; }
  }
  function spawn(any) {
    const W = innerWidth, H = innerHeight, ember = Math.random() < .18;
    return { e: ember, x: Math.random() * W, y: any ? Math.random() * H : (ember ? H + 8 : -8), r: ember ? Math.random() * 1.4 + .8 : Math.random() * 1.8 + .6, vy: ember ? -(Math.random() * .45 + .2) : Math.random() * .55 + .25, vx: (Math.random() - .5) * .3, ph: Math.random() * 6.28, a: Math.random() * .45 + .3 };
  }
  function size() { if (!cv) return; cv.width = innerWidth; cv.height = innerHeight; const n = Math.min(120, Math.round(innerWidth * innerHeight / 11000)); parts = Array.from({ length: n }, () => spawn(true)); }
  function draw() {
    if (!cx) return; const W = innerWidth, H = innerHeight; cx.clearRect(0, 0, W, H);
    for (const p of parts) {
      if (p.e) { cx.globalAlpha = p.a * .35; cx.fillStyle = '#ff7a2a'; cx.beginPath(); cx.arc(p.x, p.y, p.r * 3.2, 0, 6.283); cx.fill(); cx.globalAlpha = Math.min(1, p.a + .3); cx.fillStyle = '#ffc070'; }
      else { cx.globalAlpha = p.a; cx.fillStyle = '#cfc4b8'; }
      cx.beginPath(); cx.ellipse(p.x, p.y, p.r, p.r * .7, p.ph, 0, 6.283); cx.fill();
    }
    cx.globalAlpha = 1;
  }
  function step() {
    const W = innerWidth, H = innerHeight;
    parts.forEach((p, i) => { p.ph += .012; p.x += p.vx + Math.sin(p.ph) * .35; p.y += p.vy; if (p.y > H + 10 || p.y < -12 || p.x < -12 || p.x > W + 12) parts[i] = spawn(false); });
  }
  function loop() { if (!running) return; step(); draw(); raf = requestAnimationFrame(loop); }
  function sync() {
    const on = document.documentElement.dataset.zone === 'apoc';
    if (on) { buildFx(); if (!parts.length) size(); }
    const go = on && !RM() && !document.hidden && !!cx;
    if (on && !go) draw(); // still frame under reduced motion
    if (go && !running) { running = true; raf = requestAnimationFrame(loop); }
    if (!go && running) { running = false; cancelAnimationFrame(raf); }
  }

  function init() {
    buildFx();
    try { new MutationObserver(() => { sync(); decorate(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-zone'] }); } catch (e) { }
    const stage = document.getElementById('stage');
    if (stage) try { new MutationObserver(decorate).observe(stage, { childList: true }); } catch (e) { }
    addEventListener('resize', () => { if (cv && document.documentElement.dataset.zone === 'apoc') { size(); if (!running) draw(); } });
    document.addEventListener('visibilitychange', sync);
    try { matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', sync); } catch (e) { }
    sync(); decorate();
  }
  if (document.getElementById('stage')) init(); else document.addEventListener('DOMContentLoaded', init);
})();
