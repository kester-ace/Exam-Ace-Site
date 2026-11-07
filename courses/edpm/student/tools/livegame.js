/* Live Quiz: live class quiz games (host on the projector, students on their phones), quiz homework with a due date, solo practice, and Quest Modes (player-paced game worlds: Treasure Reef, Reef Defenders, Snack Shack Rush) for solo, live class and homework play, all built from this course's own questions. — Developed by Kester Small */
(function () {
  'use strict';
  const CSS = `
.lg{display:flex;flex-direction:column;gap:18px;min-width:0}
.lg .card h2{font-size:1.35rem}
.lg-tabs{display:flex;gap:8px;flex-wrap:wrap}
.lg-tabs .chip{font-size:.92rem;padding:8px 14px}
.lg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:14px}
.lg-f{display:flex;flex-direction:column;gap:6px;min-width:0}
.lg-f>label,.lg-f>.lgx-lab{font-weight:700;font-size:.92rem}
.lg-f select,.lg-f input{width:100%;font:inherit;border:2px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--raise);color:var(--ink);min-width:0;max-width:100%}
.lg-f select option,.lg-f select optgroup{background:var(--bg);color:var(--ink)}
.lg-tog{display:flex;flex-wrap:wrap;gap:8px}
.lg-tog label{display:inline-flex;align-items:center;gap:8px;border:2px solid var(--line);border-radius:99px;padding:6px 12px;font-weight:700;font-size:.88rem;cursor:pointer;background:var(--raise)}
.lg-tog input{width:18px;height:18px;accent-color:var(--blue);margin:0;flex:none}
.lg-seg{display:flex;flex-wrap:wrap;gap:6px}
.lg-mix{display:flex;flex-direction:column;gap:10px;max-height:360px;overflow:auto;border:2px solid var(--line);border-radius:14px;padding:12px;background:var(--raise)}
.lg-mrow{display:flex;flex-direction:column;gap:4px;border-bottom:1px solid var(--line);padding-bottom:8px}
.lg-mrow:last-child{border-bottom:0;padding-bottom:0}
.lg-mix label{display:flex;gap:8px;align-items:flex-start;font-size:.9rem;cursor:pointer;min-width:0}
.lg-mix label.lgx-mod{font-weight:700;font-size:.95rem}
.lg-mix details label{padding:3px 0 3px 26px}
.lg-mix summary{cursor:pointer;font-size:.86rem;color:var(--muted);font-weight:700;padding-left:26px}
.lg-mix input{width:18px;height:18px;flex:none;accent-color:var(--blue);margin:2px 0 0}
.lg-count{font-weight:700}
.lg-pinin{font-family:var(--f-display);font-size:2rem !important;letter-spacing:.25em;text-align:center;font-weight:800}
.lg-avs{display:grid;grid-template-columns:repeat(auto-fill,minmax(48px,1fr));gap:8px}
.lg-av{font-size:1.6rem;line-height:1;aspect-ratio:1;border-radius:14px;border:2px solid var(--line);background:var(--raise);display:grid;place-items:center;padding:0;min-width:0}
.lg-av.lgx-sel{border-color:var(--gold);box-shadow:0 0 0 3px var(--gold)}
.lg-err{color:var(--bad);font-weight:700}
.lg-okt{color:var(--ok);font-weight:700}
.lg-open{display:flex;flex-direction:column;gap:8px}
.lg-orow{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;border:2px solid var(--line);border-radius:14px;padding:10px 14px;background:var(--raise);min-width:0}
.lg-orow b{overflow-wrap:anywhere}
.lg-dot{display:inline-block;width:10px;height:10px;border-radius:50%;background:#E5484D;margin-right:6px;vertical-align:middle;animation:lgPulse 1.6s infinite}
@keyframes lgPulse{0%{box-shadow:0 0 0 0 rgba(229,72,77,.55)}70%{box-shadow:0 0 0 10px rgba(229,72,77,0)}100%{box-shadow:0 0 0 0 rgba(229,72,77,0)}}
.lg-items{display:flex;flex-direction:column;gap:10px}
.lg-item{border:2px solid var(--line);border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;background:var(--raise);min-width:0}
.lg-item .lgx-top{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:baseline}
.lg-item .lgx-top b{overflow-wrap:anywhere}
.lg-pill{display:inline-block;font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:99px;background:var(--soft-blue);white-space:nowrap}
.lg-pill.lgx-ok{background:var(--soft-ok)}.lg-pill.lgx-bad{background:var(--soft-bad)}.lg-pill.lgx-gold{background:var(--soft-gold)}
.lg-num{font-variant-numeric:tabular-nums;text-align:right;white-space:nowrap}
.lg-note{border-radius:14px;padding:14px 16px;background:var(--soft-gold);display:flex;flex-direction:column;gap:8px}
.lg-sm{border:2px solid var(--line);background:transparent;border-radius:99px;padding:4px 12px;font-size:.84rem;font-weight:700;color:inherit}
.lg-sm:hover{border-color:var(--blue)}
.lg-sm.lgx-go{background:var(--blue);border-color:var(--blue);color:var(--on-blue)}
.lg-sm.lgx-bad{border-color:var(--bad)}
.lg-tw{overflow-x:auto;max-width:100%}
.lg-tw table{min-width:560px}
.lg-me td{background:var(--soft-gold);font-weight:700}
.lg-qa{display:flex;flex-direction:column;gap:10px}
.lg-qa .lgx-r{display:flex;flex-direction:column;gap:4px}
.lg-qa .lgx-r span{font-size:.9rem;overflow-wrap:anywhere}
.lg-qa .lgx-bar{height:8px;border-radius:9px;background:var(--line);overflow:hidden}
.lg-qa .lgx-bar i{display:block;height:100%;background:var(--ok)}
.lg-modes{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr));gap:10px}
@media (max-width:560px){.lg-pinin{font-size:1.6rem !important;letter-spacing:.16em}}
html.lg-lock,html.lg-lock body{overflow:hidden !important}
html.lg-lock .toast{z-index:9995 !important}
.lg-arena{position:fixed;inset:0;z-index:9990;display:flex;flex-direction:column;color:#fff;background:radial-gradient(1100px 650px at 88% -12%,#6A35C9 0%,transparent 62%),radial-gradient(900px 650px at -12% 112%,#0F62B0 0%,transparent 58%),#2A1063;font-family:var(--f-body);overflow:hidden;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px);outline:none;line-height:1.35}
.lg-arena *{box-sizing:border-box}
.lg-arena.lgx-ok{background:radial-gradient(900px 600px at 50% -10%,#3DBB63 0%,transparent 65%),#1C7A36}
.lg-arena.lgx-bad{background:radial-gradient(900px 600px at 50% -10%,#E0533F 0%,transparent 65%),#A5231B}
.lg-arena.lgx-none{background:radial-gradient(900px 600px at 50% -10%,#6E6E92 0%,transparent 65%),#41415E}
.lg-bg{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0}
.lg-bg i{position:absolute;opacity:.09;animation:lgFloat 16s ease-in-out infinite}
.lg-bg i svg{width:100%;height:100%;fill:#fff;display:block}
@keyframes lgFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-36px) rotate(24deg)}}
.lg-arena>.lg-top,.lg-arena>.lg-main,.lg-arena>.lg-foot,.lg-arena>.lg-banner{position:relative;z-index:1}
.lg-top{display:flex;align-items:center;gap:8px;padding:10px 14px;flex-wrap:wrap;background:rgba(0,0,0,.22);flex:none}
.lg-top .lgx-ttl{font-family:var(--f-display);font-weight:800;font-size:1.02rem;flex:1 1 70px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lg-cx{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.26);color:#fff;border-radius:99px;padding:6px 12px;font-weight:800;font-size:.9rem;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;font-family:var(--f-body);line-height:1.2}
button.lg-cx{cursor:pointer}
button.lg-cx:hover{background:rgba(255,255,255,.26)}
.lg-main{flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(10px,2vh,18px);padding:clamp(12px,2.4vh,24px) clamp(12px,3vw,40px);overflow-y:auto;overflow-x:hidden}
.lg-foot{display:flex;gap:10px;justify-content:flex-end;align-items:center;flex-wrap:wrap;padding:10px 14px;background:rgba(0,0,0,.22);flex:none}
.lg-foot .lgx-sp{flex:1;min-width:0;font-weight:700;opacity:.9;font-size:.92rem}
.lg-btn{border:0;border-radius:12px;padding:12px 22px;font-weight:800;font-size:1rem;font-family:var(--f-display);background:#fff;color:#2A1063;box-shadow:0 4px 0 rgba(0,0,0,.35);cursor:pointer;transition:transform .08s,box-shadow .08s;line-height:1.2}
.lg-btn:active{transform:translateY(3px);box-shadow:0 1px 0 rgba(0,0,0,.35)}
.lg-btn.lgx-ghost{background:rgba(255,255,255,.12);color:#fff;border:2px solid rgba(255,255,255,.38);box-shadow:none}
.lg-btn.lgx-gold{background:#FFD54A;color:#1B1035}
.lg-btn.lgx-big{font-size:1.2rem;padding:14px 30px}
.lg-btn[disabled]{opacity:.5;cursor:not-allowed}
.lg-arena :focus-visible{outline:3px solid #FFD54A;outline-offset:3px}
.lg-q{background:#fff;color:#1B1035;border-radius:16px;padding:clamp(14px,2.4vh,26px) clamp(14px,2.4vw,30px);font-family:var(--f-display);font-weight:700;font-size:clamp(1.08rem,2.4vw,1.6rem);line-height:1.3;text-align:center;white-space:pre-line;overflow-wrap:anywhere;box-shadow:0 8px 0 rgba(0,0,0,.18);animation:lgDrop .45s cubic-bezier(.2,1.4,.4,1);flex:none}
.lgx-host .lg-q{font-size:clamp(1.3rem,2.9vw,2.6rem)}
.lg-q.lgx-long{font-size:clamp(1rem,2vw,1.3rem)}
.lgx-host .lg-q.lgx-long{font-size:clamp(1.1rem,2.2vw,1.9rem)}
.lg-q small{display:block;font-family:var(--f-body);font-weight:700;font-size:.6em;color:#5B4D7A;margin-top:8px;white-space:normal}
@keyframes lgDrop{from{transform:translateY(-24px) scale(.96);opacity:0}to{transform:none;opacity:1}}
.lg-tiles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(8px,1.4vw,14px);flex:none}
.lg-tile{display:flex;align-items:center;gap:clamp(10px,1.4vw,18px);min-height:clamp(74px,13vh,140px);border:0;border-radius:14px;padding:12px 16px;color:#fff;font-weight:700;font-size:clamp(1rem,1.9vw,1.6rem);line-height:1.25;text-align:left;box-shadow:0 5px 0 rgba(0,0,0,.3);position:relative;overflow-wrap:break-word;hyphens:auto;font-family:var(--f-body);animation:lgPop .35s cubic-bezier(.2,1.5,.4,1) both;transition:transform .12s,opacity .3s,filter .3s;min-width:0}
.lg-tile:nth-child(2){animation-delay:.06s}.lg-tile:nth-child(3){animation-delay:.12s}.lg-tile:nth-child(4){animation-delay:.18s}.lg-tile:nth-child(5){animation-delay:.24s}.lg-tile:nth-child(6){animation-delay:.3s}
@keyframes lgPop{from{transform:scale(.85);opacity:0}to{transform:none;opacity:1}}
button.lg-tile{cursor:pointer}
button.lg-tile:hover:not([disabled]){transform:translateY(-2px);filter:brightness(1.08)}
button.lg-tile:active:not([disabled]){transform:translateY(3px);box-shadow:0 2px 0 rgba(0,0,0,.3)}
button.lg-tile[disabled]{cursor:default}
.lg-tile .lgx-shp{flex:none;width:clamp(30px,3.4vw,52px);height:clamp(30px,3.4vw,52px)}
.lg-tile .lgx-shp svg{width:100%;height:100%;fill:currentColor;display:block;filter:drop-shadow(0 2px 0 rgba(0,0,0,.2))}
.lg-tile .lgx-tt{flex:1;min-width:0}
.lg-tile kbd{position:absolute;top:6px;right:8px;font:700 .72rem/1 var(--f-body);background:rgba(0,0,0,.22);color:inherit;border-radius:6px;padding:3px 6px}
.lg-tile.lgx-c0{background:#D7263D}.lg-tile.lgx-c1{background:#1565C0}.lg-tile.lgx-c2{background:#F2B400;color:#1A1300}.lg-tile.lgx-c3{background:#2E7D32}.lg-tile.lgx-c4{background:#6A1B9A}.lg-tile.lgx-c5{background:#00838F}
.lg-tile.lgx-dim{opacity:.3;filter:saturate(.3)}
.lg-tile.lgx-gone{visibility:hidden}
.lg-tile.lgx-right{box-shadow:0 0 0 4px #fff,0 5px 0 rgba(0,0,0,.3);animation:lgWiggle .6s ease}
.lg-tile .lgx-mk{flex:none;font-size:1.5em;font-weight:900;line-height:1}
.lg-tile.lgx-pick{box-shadow:0 0 0 5px #fff,0 0 0 9px rgba(255,255,255,.35)}
.lg-tile.lgx-pick::after{content:'✓';position:absolute;bottom:6px;right:8px;font-size:.9rem;background:#fff;color:#1B1035;border-radius:50%;width:22px;height:22px;display:grid;place-items:center}
@keyframes lgWiggle{0%,100%{transform:none}25%{transform:rotate(-1.5deg) scale(1.03)}75%{transform:rotate(1.5deg) scale(1.03)}}
.lg-tiles.lgx-n2 .lg-tile{min-height:clamp(100px,24vh,240px);font-size:clamp(1.2rem,2.6vw,2rem)}
.lg-tiles.lgx-n3 .lg-tile:last-child,.lg-tiles.lgx-n5 .lg-tile:last-child{grid-column:1/-1}
.lg-tiles.lgx-big .lg-tile{min-height:clamp(110px,26vh,260px);justify-content:center}
.lg-tiles.lgx-big .lg-tile .lgx-shp{width:clamp(56px,13vw,110px);height:clamp(56px,13vw,110px)}
@media (max-width:640px){.lg-tiles.lgx-n2:not(.lgx-big){grid-template-columns:minmax(0,1fr)}.lg-tiles.lgx-n2:not(.lgx-big) .lg-tile{min-height:76px;font-size:1.1rem}.lg-tile{padding:10px 12px;gap:10px}.lg-tile .lgx-shp{width:26px;height:26px}.lg-tiles.lgx-long{grid-template-columns:minmax(0,1fr)}.lg-tiles.lgx-long .lg-tile{min-height:56px;font-size:1rem;padding:10px 14px}.lg-tiles.lgx-long .lg-tile .lgx-shp{width:28px;height:28px}.lg-tiles.lgx-long.lgx-n3 .lg-tile:last-child,.lg-tiles.lgx-long.lgx-n5 .lg-tile:last-child{grid-column:auto}}
.lg-mid{display:flex;align-items:center;justify-content:space-between;gap:16px;flex:none}
.lg-ringw{position:relative;width:clamp(64px,8.5vw,108px);height:clamp(64px,8.5vw,108px);flex:none}
.lg-ringw svg{width:100%;height:100%;transform:rotate(-90deg);display:block}
.lg-ringw circle{fill:none;stroke-width:9}
.lg-ringw .lgx-bgc{stroke:rgba(255,255,255,.18)}
.lg-ringw .lgx-fgc{stroke:#FFD54A;stroke-linecap:round;transition:stroke-dashoffset .2s linear,stroke .3s}
.lg-ringw.lgx-low .lgx-fgc{stroke:#FF6B6B}
.lg-ringw b{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--f-display);font-size:clamp(1.5rem,3.4vw,2.8rem);font-weight:800}
.lg-ringw.lgx-low b{animation:lgBeat 1s infinite}
@keyframes lgBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
.lg-acnt{display:flex;flex-direction:column;align-items:center;font-weight:800;text-align:center}
.lg-acnt b{font-family:var(--f-display);font-size:clamp(1.5rem,3.4vw,2.8rem);line-height:1}
.lg-acnt span{font-size:.9rem;opacity:.85}
.lg-qmeta{font-weight:800;font-size:clamp(.9rem,1.4vw,1.1rem);opacity:.92;text-align:center;letter-spacing:.04em}
.lg-hint{font-weight:700;text-align:center;opacity:.92}
.lg-lobby{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:clamp(12px,2vw,24px);align-items:start}
.lg-joinbox{background:#fff;color:#1B1035;border-radius:20px;padding:clamp(16px,2.4vw,28px);display:flex;flex-direction:column;gap:14px;box-shadow:0 8px 0 rgba(0,0,0,.18);min-width:0}
.lg-joinbox .lgx-how{font-size:clamp(1rem,1.6vw,1.3rem);font-weight:700}
.lg-pinrow{display:flex;gap:18px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.lg-lab{font-weight:800;text-transform:uppercase;letter-spacing:.12em;font-size:.78rem;color:#5B4D7A}
.lg-pin{font-family:var(--f-display);font-weight:800;font-size:clamp(2.4rem,7vw,5.6rem);letter-spacing:.05em;line-height:1;font-variant-numeric:tabular-nums;white-space:nowrap}
.lg-badge{width:clamp(92px,12vw,160px);flex:none}
.lg-badge svg{width:100%;height:auto;display:block}
.lg-side{display:flex;flex-direction:column;gap:12px;min-width:0}
.lg-roster{display:flex;flex-wrap:wrap;gap:10px;align-content:flex-start}
.lg-pl{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.26);border-radius:99px;padding:6px 14px 6px 8px;font-weight:800;font-size:clamp(.95rem,1.4vw,1.2rem);color:#fff;animation:lgPop .4s cubic-bezier(.2,1.5,.4,1) both;max-width:100%;font-family:var(--f-body)}
.lg-pl .lgx-e{font-size:1.35em;line-height:1}
.lg-pl .lgx-n{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
button.lg-pl{cursor:pointer}
button.lg-pl:hover{background:rgba(255,90,90,.38)}
.lg-wait{display:inline-flex;gap:6px;align-items:center;font-weight:800;opacity:.92}
.lg-wait i{width:10px;height:10px;border-radius:50%;background:#fff;animation:lgDots 1.2s infinite}
.lg-wait i:nth-child(2){animation-delay:.2s}.lg-wait i:nth-child(3){animation-delay:.4s}
@keyframes lgDots{0%,80%,100%{opacity:.25;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
.lg-big{font-family:var(--f-display);font-weight:800;font-size:clamp(1.5rem,4vw,3.2rem);text-align:center;line-height:1.1;overflow-wrap:anywhere}
@media (max-width:820px){.lg-lobby{grid-template-columns:minmax(0,1fr)}}
.lg-dist{display:flex;gap:clamp(8px,1.6vw,22px);align-items:flex-end;justify-content:center;height:clamp(84px,15vh,170px);flex:none}
.lg-tiles.lgx-compact .lg-tile{min-height:clamp(48px,8vh,84px);font-size:clamp(.95rem,1.6vw,1.3rem);padding:10px 14px}
.lg-tiles.lgx-compact .lg-tile .lgx-shp{width:clamp(24px,2.6vw,36px);height:clamp(24px,2.6vw,36px)}
.lg-dcol{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;height:100%;width:clamp(44px,9vw,110px)}
.lg-dcol .lgx-bar{width:100%;border-radius:10px 10px 4px 4px;min-height:8px;height:0;transition:height .8s cubic-bezier(.2,1,.3,1)}
.lg-dcol b{font-family:var(--f-display);font-size:clamp(1.05rem,2vw,1.6rem)}
.lg-dcol .lgx-lb{display:flex;align-items:center;gap:4px;font-weight:800}
.lg-dcol .lgx-lb svg{width:22px;height:22px;fill:#fff}
.lg-stack{display:flex;height:16px;border-radius:99px;overflow:hidden;background:rgba(255,255,255,.15);flex:none}
.lg-stack i{display:block;height:100%}
.lg-why{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.24);border-radius:14px;padding:12px 16px;font-size:clamp(.95rem,1.5vw,1.2rem);overflow-wrap:anywhere;flex:none}
.lg-legend{display:flex;gap:14px;flex-wrap:wrap;font-weight:800;font-size:.95rem;justify-content:center}
.lg-legend span{display:inline-flex;align-items:center;gap:6px}
.lg-legend i{width:12px;height:12px;border-radius:3px;display:inline-block}
.lg-lb{display:flex;flex-direction:column;gap:10px;max-width:920px;width:100%;margin:0 auto}
.lg-row{text-align:left;display:grid;grid-template-columns:2.2em 2.2em minmax(0,1fr) auto;align-items:center;gap:10px;background:#fff;color:#1B1035;border-radius:14px;padding:10px 14px;font-weight:800;font-size:clamp(1rem,1.8vw,1.5rem);position:relative;overflow:hidden;animation:lgSlide .5s cubic-bezier(.2,1.2,.4,1) both}
.lg-row:nth-child(2){animation-delay:.08s}.lg-row:nth-child(3){animation-delay:.16s}.lg-row:nth-child(4){animation-delay:.24s}.lg-row:nth-child(5){animation-delay:.32s}
.lg-row .lgx-fill{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#FFE7A3,#FFF6DB);transition:width 1s cubic-bezier(.2,1,.3,1);z-index:0}
.lg-row>*:not(.lgx-fill){position:relative;z-index:1}
.lg-row .lgx-rk{font-family:var(--f-display);text-align:center}
.lg-row .lgx-av{font-size:1.35em;line-height:1;text-align:center}
.lg-row .lgx-nm{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.lg-row .lgx-sc{font-variant-numeric:tabular-nums;white-space:nowrap}
.lg-row .lgx-mv{font-size:.68em;color:#1E7B34;margin-left:6px}
.lg-row .lgx-mv.lgx-dn{color:#B3261E}
.lg-row .lgx-fire{font-size:.72em;margin-left:6px;white-space:nowrap}
.lg-row.lgx-me{box-shadow:0 0 0 4px #FFD54A}
@keyframes lgSlide{from{transform:translateX(-30px);opacity:0}to{transform:none;opacity:1}}
.lg-podium{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:end;gap:clamp(8px,2vw,24px);max-width:900px;width:100%;margin:auto auto 0;flex:1;min-height:250px}
.lg-pc{display:flex;flex-direction:column;align-items:center;gap:8px;min-width:0;justify-content:flex-end;height:100%}
.lg-pc .lgx-who{display:flex;flex-direction:column;align-items:center;gap:4px;opacity:0;animation:lgFade .5s ease forwards;min-width:0;max-width:100%}
.lg-pc .lgx-e{font-size:clamp(2.1rem,5vw,4rem);line-height:1;animation:lgBounce 1.2s ease-in-out infinite}
.lg-pc .lgx-nm{font-weight:800;font-size:clamp(.95rem,2vw,1.6rem);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lg-pc .lgx-sc{font-weight:800;opacity:.92;font-variant-numeric:tabular-nums}
.lg-pc .lgx-ped{width:100%;border-radius:14px 14px 0 0;display:flex;justify-content:center;padding-top:10px;font-family:var(--f-display);font-weight:800;font-size:clamp(1.9rem,5vw,4rem);color:#1B1035;transform-origin:bottom;animation:lgGrow .9s cubic-bezier(.2,1.2,.4,1) both}
.lg-pc.lgx-p1 .lgx-ped{height:clamp(140px,32vh,300px);background:linear-gradient(180deg,#FFE58A,#F5C542)}
.lg-pc.lgx-p2 .lgx-ped{height:clamp(104px,24vh,220px);background:linear-gradient(180deg,#F4F6FA,#C4CBD8)}
.lg-pc.lgx-p3 .lgx-ped{height:clamp(76px,17vh,160px);background:linear-gradient(180deg,#F3C9A0,#C98B57)}
.lg-pc.lgx-p3 .lgx-ped{animation-delay:.3s}.lg-pc.lgx-p3 .lgx-who{animation-delay:.9s}
.lg-pc.lgx-p2 .lgx-ped{animation-delay:1.2s}.lg-pc.lgx-p2 .lgx-who{animation-delay:1.8s}
.lg-pc.lgx-p1 .lgx-ped{animation-delay:2.3s}.lg-pc.lgx-p1 .lgx-who{animation-delay:2.9s}
.lg-pc.lgx-empty .lgx-ped{opacity:.35}
@keyframes lgFill{from{width:0}to{width:100%}}
.lg-ready{width:min(560px,100%);height:14px;border-radius:99px;background:rgba(255,255,255,.18);overflow:hidden}
.lg-ready i{display:block;height:100%;width:0;background:linear-gradient(90deg,#FFD54A,#FF8A3D);border-radius:99px;animation:lgFill linear forwards}
@keyframes lgGrow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes lgFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes lgBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.lg-pbar{height:10px;border-radius:99px;background:rgba(255,255,255,.2);overflow:hidden;flex:none}
.lg-pbar i{display:block;height:100%;background:#FFD54A;border-radius:99px;width:100%}
.lg-pbar.lgx-low i{background:#FF6B6B}
.lg-prow{display:flex;justify-content:space-between;align-items:center;gap:8px;font-weight:800;flex:none;flex-wrap:wrap}
.lg-center{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;min-height:min-content}
.lg-center .lgx-e{font-size:clamp(3rem,14vw,5rem);line-height:1}
.lg-center p{max-width:46ch;margin:0}
.lg-mark{width:clamp(84px,24vw,130px);height:clamp(84px,24vw,130px);border-radius:50%;display:grid;place-items:center;background:#fff;font-size:clamp(2.6rem,10vw,4rem);font-weight:900;animation:lgPop .5s cubic-bezier(.2,1.6,.4,1);flex:none}
.lg-arena.lgx-ok .lg-mark{color:#1C7A36}.lg-arena.lgx-bad .lg-mark{color:#A5231B}.lg-arena.lgx-none .lg-mark{color:#41415E}
.lg-plus{font-family:var(--f-display);font-weight:800;font-size:clamp(1.5rem,7vw,2.6rem);background:rgba(0,0,0,.25);border-radius:12px;padding:6px 16px}
.lg-streak{display:inline-flex;align-items:center;gap:6px;background:rgba(0,0,0,.25);border-radius:99px;padding:6px 14px;font-weight:800}
.lg-card{background:#fff;color:#1B1035;border-radius:16px;padding:14px 18px;font-weight:700;display:flex;flex-direction:column;gap:4px;max-width:440px;width:100%}
.lg-card big{font-family:var(--f-display);font-size:1.6rem;font-weight:800}
.lg-lockin{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.lg-lockin .lg-tile{width:min(40vw,170px);min-height:min(30vw,120px);justify-content:center;animation:lgBounce 1.4s ease-in-out infinite}
.lg-ov{position:absolute;inset:0;z-index:5;background:rgba(16,6,40,.95);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:20px}
.lg-drawer{position:absolute;right:0;top:0;bottom:0;width:min(400px,100%);z-index:6;background:#1E0C4C;border-left:1px solid rgba(255,255,255,.2);display:flex;flex-direction:column;gap:10px;padding:14px;overflow:auto;box-shadow:-20px 0 40px rgba(0,0,0,.4)}
.lg-drow{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border-radius:12px;padding:8px 10px;flex-wrap:wrap}
.lg-drow .lgx-n{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:800}
.lg-off{opacity:.5}
.lg-banner{background:#FFD54A;color:#1B1035;font-weight:800;text-align:center;padding:6px 10px;font-size:.92rem;flex:none}
.lg-pw{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;flex:none}
.lg-pwb{border:2px solid rgba(255,255,255,.4);background:rgba(255,255,255,.12);color:#fff;border-radius:14px;padding:8px 14px;font-weight:800;font-size:.95rem;cursor:pointer;font-family:var(--f-body);animation:lgPop .4s both}
.lg-pwb:hover{background:rgba(255,255,255,.24)}
.lg-pwb.lgx-on{background:#FFD54A;color:#1B1035;border-color:#FFD54A}
.lg-fb{border-radius:16px;padding:14px 18px;display:flex;flex-direction:column;gap:8px;font-weight:700;animation:lgDrop .35s cubic-bezier(.2,1.4,.4,1);flex:none;overflow-wrap:anywhere}
.lg-fb.lgx-ok{background:#1C7A36}.lg-fb.lgx-bad{background:#A5231B}
.lg-fb h3{font-family:var(--f-display);font-size:1.35rem;margin:0;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.lg-fb p{margin:0;font-weight:400;line-height:1.45}
.lg-sum{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,130px),1fr));gap:10px;flex:none}
.lg-sum div{background:rgba(255,255,255,.12);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:2px;text-align:center}
.lg-sum b{font-family:var(--f-display);font-size:1.8rem;line-height:1.1}
.lg-rev{display:flex;flex-direction:column;gap:8px;flex:none}
.lg-rev details{background:rgba(255,255,255,.1);border-radius:12px;padding:10px 14px}
.lg-rev summary{cursor:pointer;font-weight:800;overflow-wrap:anywhere}
.lg-rev p{margin:6px 0 0;line-height:1.45;overflow-wrap:anywhere}
.lg-toast{position:absolute;left:50%;top:64px;transform:translateX(-50%);z-index:9;background:#FFD54A;color:#1B1035;font-weight:800;border-radius:99px;padding:8px 18px;box-shadow:0 8px 24px rgba(0,0,0,.35);pointer-events:none;max-width:90%;text-align:center;animation:lgDrop .35s ease both}
.lg-cf{position:fixed;inset:0;z-index:9994;pointer-events:none;width:100%;height:100%}
.lg-res{background:#fff;color:#1B1035;border-radius:16px;padding:14px;overflow:auto;flex:none}
.lg-res table{width:100%;border-collapse:collapse;min-width:540px;font-size:.95rem}
.lg-res th,.lg-res td{padding:8px 10px;border-bottom:1px solid #E3DEF0;text-align:left;vertical-align:top}
.lg-res th{background:#F3F0FA;font-family:var(--f-display)}
.lg-white{color:#fff}
.lg .sr,.lg-arena .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.lg-q.lgx-small{font-size:clamp(1rem,1.8vw,1.5rem)}
@media (max-width:600px){.lg-top{padding:8px 10px;gap:6px}.lg-cx{padding:5px 10px;font-size:.82rem}.lg-foot{padding:8px 10px}.lg-btn{padding:11px 16px}.lg-main{padding:10px 12px}.lg-row{grid-template-columns:1.8em 1.8em minmax(0,1fr) auto;padding:8px 10px;gap:8px}}
@media (max-width:700px){.lgx-kh{display:none}}
@media (prefers-reduced-motion:reduce){.lg-arena *,.lg-arena *::before,.lg-arena *::after,.lg-dot{animation:none !important;transition:none !important}.lg-pc .lgx-who{opacity:1}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ---------- small helpers ---------- */
  const VIEW = 'live';
  let API = null;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const RM = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
  const RNG = s => { let a = s >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  const shuf = (arr, rng) => { const b = arr.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const hnum = s => { let h = 5381; s = String(s); for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; return h; };
  const hid = s => hnum(s).toString(36) + hnum('x' + s).toString(36).slice(0, 3);
  const rseed = () => (Math.random() * 2147483647) | 0;
  const rid = n => { const A = 'abcdefghijkmnpqrstuvwxyz23456789'; let s = ''; for (let i = 0; i < n; i++) s += A[Math.floor(Math.random() * A.length)]; return s; };
  const fmt = n => (Math.round(Number(n) || 0)).toLocaleString('en-US');
  const ord = n => { const s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const same = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.slice().sort().every((x, i) => x === b.slice().sort()[i]);
  const bytes = o => { try { return new TextEncoder().encode(JSON.stringify(o)).length; } catch (e) { return JSON.stringify(o).length * 2; } };
  const ss = {
    get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { if (v == null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
  };
  const vib = p => { try { if (navigator.vibrate && !RM()) navigator.vibrate(p); } catch (e) { } };
  const pinFmt = p => String(p).replace(/^(\d{3})(\d{3})$/, '$1 $2');
  const dec = document.createElement('textarea');
  function plain(h) {
    let s = String(h == null ? '' : h);
    s = s.replace(/<\/?(b|i|em|strong|span|a|u|sup|sub|code|small|mark|abbr|cite|q|s|del|ins|font|kbd|var)\b[^>]*>/gi, '').replace(/<\s*br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|h[1-6]|blockquote|tr|ol|ul)\s*>/gi, '\n').replace(/<li[^>]*>/gi, '• ').replace(/<[^>]+>/g, ' ');
    dec.innerHTML = s; s = dec.value;
    return s.replace(/[ \t\u00A0]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{2,}/g, '\n').trim();
  }
  const teacherEd = () => !!((API && (API.teacherEdition || (API.S && API.S.teacher))) || window.COURSE_TEACHER_EDITION);

  /* ---------- shapes, colours, avatars ---------- */
  const SHAPES = [
    ['Triangle', '<path d="M12 2.5 22.5 20.5H1.5Z"/>'],
    ['Diamond', '<path d="M12 1.5 22.5 12 12 22.5 1.5 12Z"/>'],
    ['Circle', '<circle cx="12" cy="12" r="10"/>'],
    ['Square', '<rect x="2.5" y="2.5" width="19" height="19" rx="2"/>'],
    ['Star', '<path d="M12 1.8l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.9l-6.4 3.5L7 14.3 1.7 9.3l7.2-.9z"/>'],
    ['Hexagon', '<path d="M12 1.5 21.5 7v10L12 22.5 2.5 17V7z"/>']
  ];
  const TCOL = ['#D7263D', '#1565C0', '#F2B400', '#2E7D32', '#6A1B9A', '#00838F'];
  const shp = i => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${SHAPES[i % 6][1]}</svg>`;
  const AVS = ['🐢', '🦜', '🐠', '🦩', '🐙', '🦀', '🐬', '🦎', '🐝', '🦋', '🐒', '🦈', '🐳', '🦉', '🦊', '🐸', '🦁', '🐼', '🐨', '🦄', '🐧', '🦕', '🌺', '🥭'];
  const cleanAv = a => AVS.includes(a) ? a : AVS[0];
  function badge(pin) {
    const rng = RNG(hnum('badge' + pin)), N = 9, c = 8, o = 4, cols = TCOL.slice(0, 4);
    const fin = (x, y) => (x < 3 && y < 3) || (x > N - 4 && y < 3) || (x < 3 && y > N - 4);
    let r = '';
    for (let y = 0; y < N; y++) for (let x = 0; x < Math.ceil(N / 2); x++) {
      if (fin(x, y) || fin(N - 1 - x, y)) continue;
      if (rng() < 0.56) { const col = cols[Math.floor(rng() * 4)]; [x, N - 1 - x].filter((v, i, a) => a.indexOf(v) === i).forEach(xx => { if (!fin(xx, y)) r += `<rect x="${o + xx * c}" y="${o + y * c}" width="7" height="7" rx="1.6" fill="${col}"/>`; }); }
    }
    [[0, 0], [N - 3, 0], [0, N - 3]].forEach(([x, y], i) => { r += `<rect x="${o + x * c + 1}" y="${o + y * c + 1}" width="21" height="21" rx="4" fill="none" stroke="#1B1035" stroke-width="3"/><rect x="${o + x * c + 7}" y="${o + y * c + 7}" width="9" height="9" rx="2" fill="${cols[(hnum(pin) + i) % 4]}"/>`; });
    return `<svg viewBox="0 0 80 80" role="img" aria-label="Game badge for PIN ${esc(pinFmt(pin))}"><rect width="80" height="80" rx="12" fill="#fff"/>${r}</svg>`;
  }
  const BGSH = () => `<div class="lg-bg" aria-hidden="true">${[[6, 12, 90, 0], [78, 8, 120, 1], [12, 70, 110, 2], [84, 66, 80, 3], [46, 40, 60, 4]].map(([x, y, s, k], i) => `<i style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;animation-delay:${-i * 3}s">${shp(k)}</i>`).join('')}</div>`;

  /* ---------- nickname filter (word list stored ROT13 so it never displays as plain text) ---------- */
  const r13 = s => s.replace(/[a-z]/g, c => String.fromCharCode((c.charCodeAt(0) - 97 + 13) % 26 + 97));
  const BAD_SUB = 'shpx fuvg phag ovgpu juber fyhg avtt snttbg sntbg onfgneq jnax gjng obyybpx cravf intvan cbea encvfg anmv uvgyre oybbqpynng oybbqpybg ohzobpynng obzobpynng ohzonpynng enffpynng ennfpynng enfpynng chffl pynng chzchz chanav onggl zna onggloj puvpuvzna zbgureshp qvpxurnq nffubyr nefrubyr wnpxnff ergneq zbyrfg ubeal frkl obbof gvggvrf qvyqb qnexvr pbpxfhpx oybjwbo unaqwbo betl betnfz grfgvpyr fpebghz fcrez'.split(' ').map(r13);
  const BAD_WORD = 'nff nefr qvpx pbpx phz frk sns ubr gvg gvgf chff onggl ohzob enff ennf ybyb gbgrr pbba fcvp xvxr pubbyvr pbbyvr puvax wvm xvyy zheqre'.split(' ').map(r13);
  const LEET = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '9': 'g', '@': 'a', '$': 's', '!': 'i', '|': 'i', '+': 't' };
  const collapse = s => s.replace(/(.)\1+/g, '$1');
  function rude(nick) {
    const n = String(nick || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[0-9@$!|+]/g, c => LEET[c] || c);
    const flat = n.replace(/[^a-z]/g, ''), toks = n.split(/[^a-z]+/).filter(Boolean);
    const subs = BAD_SUB.map(w => w.replace(/[^a-z]/g, ''));
    if (subs.some(w => flat.includes(w) || collapse(flat).includes(collapse(w)))) return true;
    if (toks.concat([flat]).some(t => BAD_WORD.includes(t) || BAD_WORD.includes(collapse(t)))) return true;
    return false;
  }
  const cleanNick = s => String(s == null ? '' : s).normalize('NFC').replace(/[\u0000-\u001f\u007f-\u009f\u00ad\u200b-\u200f\u2028-\u202e\u2060-\u206f\ufeff\ufe00-\ufe0f]/g, '').replace(/[^\p{L}\p{N} '._\-!?]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 16);

  /* ---------- the course's own question bank ---------- */
  let BK = null;
  const VISUAL = /<\s*(img|svg|table|canvas|video|audio|iframe|object|picture)\b/i;
  const REFS = /\b(in|from|shown in|refer to|look at|study|using|use|based on|according to) (the |this )?(figure|diagram|image|picture|graph|chart|screenshot|illustration|table|extract|passage|stimulus|excerpt|poster|advertisement|photograph)\b|\b(above|below) (figure|diagram|image|table|extract|passage)\b|\b(figure|diagram|image|table|extract|passage) (above|below)\b/i;
  const FIXED = /\b(all|none|both|neither) of (the )?(above|these|them|those)\b|^(both|all|none|neither)\b|\b(I|II|III|IV|[A-D])\s*(,|and|&)\s*(I|II|III|IV|[A-D])\b|^\(?\d+[.)]\s|^\(?[a-dA-D][.)]\s/;
  function mkQ(text, options, correct, why, kind, tag) {
    if (VISUAL.test(String(text || '')) || (options || []).some(o => VISUAL.test(String(o || '')))) return null;
    const t = plain(text); if (!t || t.length > 520 || REFS.test(t)) return null;
    const o = (options || []).map(plain);
    if (o.length < 2 || o.length > 6 || o.some(x => !x || x.length > 180)) return null;
    if (new Set(o.map(x => x.toLowerCase())).size !== o.length) return null;
    const a = [...new Set((correct || []).map(Number))].filter(i => Number.isInteger(i) && i >= 0 && i < o.length).sort((x, y) => x - y);
    if (!a.length || (kind !== 'ma' && a.length !== 1) || (kind === 'ma' && a.length === o.length)) return null;
    const k = kind === 'ma' ? 'ma' : o.length === 2 ? 'tf' : 'mc';
    return { id: hid(t + '|' + o.join('|')), t, o, a, k, why: plain(why).replace(/^(correct|well spotted|well done|yes|right|exactly|great|good job|nice)\b[.!,:]*\s+/i, '').slice(0, 420), tag: tag || '', fixed: k === 'tf' || o.some(x => FIXED.test(x)) };
  }
  function convertQuiz(qz, tag) {
    const out = []; let stim = false;
    (qz.items || []).forEach((it, ii) => {
      if (!it || typeof it !== 'object') return;
      if (it.t === 'text') { stim = true; return; }
      if (stim || it.t === 'essay') return;
      if (it.t === 'mc') { const q = mkQ(it.q, it.options, [it.correct], it.why || (Array.isArray(it.fb) ? '' : it.fb), 'mc', tag); if (q) out.push(q); }
      else if (it.t === 'ma') { const q = mkQ(it.q, it.options, Array.isArray(it.correct) ? it.correct : [], it.why, 'ma', tag); if (q) out.push(q); }
      else if (it.t === 'match') {
        const L = it.left || [], Rr = it.right || []; if (L.length < 2 || Rr.length < 2 || VISUAL.test(String(it.q || ''))) return;
        const cor = Array.isArray(it.correct) && it.correct.length === L.length ? it.correct : L.map((_, i) => i);
        let stem = plain(it.q).replace(/\n/g, ' ');
        if (stem.length > 220) { const parts = stem.match(/[^.!?]+[.!?]+/g) || [stem]; stem = ''; for (let i = parts.length - 1; i >= 0; i--) { if ((parts[i] + stem).length > 220) break; stem = parts[i].trim() + ' ' + stem; } stem = stem.trim() || plain(it.q).slice(0, 200); }
        const rng = RNG(hnum(stem + ii)), steps = Rr.every(r => /^(step|stage|position|order)\s*\d+$/i.test(plain(r)));
        shuf(L.map((_, i) => i), rng).slice(0, 2).forEach(i => {
          const right = cor[i]; if (Rr[right] == null) return;
          let opts = shuf([right].concat(shuf(Rr.map((_, j) => j).filter(j => j !== right), rng).slice(0, 3)), rng);
          if (steps) opts = opts.sort((x, y) => parseInt(plain(Rr[x]).replace(/\D/g, ''), 10) - parseInt(plain(Rr[y]).replace(/\D/g, ''), 10));
          const q = mkQ(stem + '\n“' + plain(L[i]) + '”', opts.map(j => Rr[j]), [opts.indexOf(right)], it.why || (plain(L[i]) + ' → ' + plain(Rr[right])), 'mc', tag);
          if (q) { if (steps) q.fixed = true; out.push(q); }
        });
      }
    });
    return out;
  }
  function bank() {
    if (BK && BK.n === ((window.COURSE_QUIZBANK || []).length + ':' + (window.COURSE_MODULES || []).length)) return BK;
    const mods = (window.COURSE_MODULES || []).filter(m => m && m.id);
    const word = mods.length && /^section/i.test(mods[0].code || '') ? 'Section' : 'Module';
    const modRe = mods.map(m => [m.id, m.code ? new RegExp('(^|[^A-Za-z0-9])' + String(m.code).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-z0-9])', 'i') : null]);
    const modOf = s => { for (const [id, re] of modRe) if (re && re.test(String(s || ''))) return id; return ''; };
    const sets = [];
    (window.COURSE_QUIZBANK || []).forEach((p, pi) => (p && p.quizzes || []).forEach((qz, qi) => {
      if (!qz) return; const mod = modOf(qz.title) || modOf(p.pkg);
      const tag = mod ? (mods.find(m => m.id === mod) || {}).code || '' : '';
      const qs = convertQuiz(qz, tag); if (qs.length < 2) return;
      sets.push({ key: 'b' + pi + '.' + qi, group: String(p.pkg || 'Quizzes'), title: String(qz.title || 'Quiz'), mod, qs, past: /\bpast\b/i.test(p.pkg || '') || /\bpast paper\b/i.test(qz.title || ''), test: /\btests?\b/i.test(p.pkg || '') && /\btest\b/i.test(qz.title || '') });
    }));
    const tests = [];
    mods.forEach(m => {
      const fromBank = sets.find(s => s.test && s.mod === m.id);
      if (fromBank) { tests.push(fromBank); return; }
      const qs = []; ((m.test && m.test.items) || []).forEach(it => { if (!it || it.passage) return; const q = mkQ(it.q, it.options, [it.answer], it.why, 'mc', m.code || m.id); if (q) qs.push(q); });
      if (qs.length >= 2) { const s = { key: 't.' + m.id, group: word + ' tests', title: (m.code || m.id) + ' Test', mod: m.id, qs, past: false, test: true }; tests.push(s); sets.push(s); }
    });
    const setBy = {}, byId = {}; sets.forEach(s => { setBy[s.key] = s; s.qs.forEach(q => { if (!byId[q.id]) byId[q.id] = q; }); });
    BK = { n: (window.COURSE_QUIZBANK || []).length + ':' + (window.COURSE_MODULES || []).length, sets, tests, setBy, byId, mods, word };
    return BK;
  }
  const isHostCtx = ctx => ctx === 'cfg' || ctx === 'hcfg' || CAP.admin || teacherEd();
  const visSets = ctx => bank().sets.filter(s => isHostCtx(ctx) || !s.past);
  const visTests = ctx => bank().tests.filter(s => isHostCtx(ctx) || !s.past);
  function curKey(c, ctx) {
    if (c.kind === 'test') { const L = visTests(ctx); return (L.find(s => s.key === c.test) || L[0] || {}).key || ''; }
    const L = visSets(ctx); return (L.find(s => s.key === c.set) || L.find(s => /topic/i.test(s.group)) || L[0] || {}).key || '';
  }
  function poolOf(c, ctx) {
    const B = bank(); let keys = [];
    if (c.kind === 'mix') { const ok = {}; visSets(ctx).forEach(s => ok[s.key] = 1); keys = (c.mix || []).filter(k => ok[k]); }
    else { const k = curKey(c, ctx); if (k) keys = [k]; }
    const seen = {}, out = [];
    keys.forEach(k => B.setBy[k].qs.forEach(q => { if (!seen[q.id]) { seen[q.id] = 1; out.push(q); } }));
    return out;
  }
  function srcLabel(c, ctx) {
    const B = bank();
    if (c.kind === 'mix') { const ks = (c.mix || []).filter(k => B.setBy[k]); const mods = [...new Set(ks.map(k => B.setBy[k].mod).filter(Boolean))].map(id => (B.mods.find(m => m.id === id) || {}).code).filter(Boolean); return ks.length === 1 ? B.setBy[ks[0]].title : 'Mixed topics' + (mods.length ? ': ' + mods.slice(0, 3).join(', ') + (mods.length > 3 ? '…' : '') : ''); }
    const s = B.setBy[curKey(c, ctx)]; return s ? s.title : 'Live Quiz';
  }
  function prep(q, shuffleA, rng) {
    const idx = q.fixed || !shuffleA ? q.o.map((_, i) => i) : shuf(q.o.map((_, i) => i), rng);
    return { id: q.id, t: q.t, o: idx.map(i => q.o[i]), a: q.a.map(i => idx.indexOf(i)).sort((x, y) => x - y), k: q.k, why: q.why, tag: q.tag };
  }
  const clipW = (t, n) => { t = String(t || '').trim(); if (t.length <= n) return t; const c = t.slice(0, n - 1); return c.slice(0, Math.max(c.lastIndexOf(' '), n - 12)).replace(/[\s·:,;-]+$/, '') + '…'; };
  const autoDur = q => clamp(Math.round((8 + (q.t + ' ' + q.o.join(' ')).split(/\s+/).length / 3) / 5) * 5, 10, 60);

  /* ---------- per-student preferences (course state) ---------- */
  function LG() {
    const S = API.S; S.livegame = S.livegame && typeof S.livegame === 'object' ? S.livegame : {}; const g = S.livegame;
    g.cfg = Object.assign({ kind: 'set', set: '', test: '', mix: [], n: '10', t: '20', shq: true, sha: true, sq: true, streak: true, music: true, auto: false, title: '' }, g.cfg || {});
    g.scfg = Object.assign({ kind: 'set', set: '', test: '', mix: [], n: '10', t: '20', pw: true, music: true }, g.scfg || {});
    g.hcfg = Object.assign({ kind: 'set', set: '', test: '', mix: [], n: '10', t: '0', pw: true, att: '0', due: '', title: '' }, g.hcfg || {});
    g.qcfg = Object.assign({ kind: 'set', set: '', test: '', mix: [], mode: 'gold', lv: String([1, 2, 3].includes(S.level) ? S.level : 2), end: 'time', mins: S.level === 1 ? '7' : '5', goal: '1000', music: true, title: '', due: '', att: '0' }, g.qcfg || {});
    ['cfg', 'scfg', 'hcfg', 'qcfg'].forEach(k => { if (!Array.isArray(g[k].mix)) g[k].mix = []; });
    g.best = g.best && typeof g.best === 'object' ? g.best : {};
    return g;
  }

  /* ---------- sound: WebAudio only, no audio files ---------- */
  const AU = { ctx: null, out: null, mg: null, kind: '', timer: 0, step: 0, next: 0 };
  const muted = () => !API || !API.S || API.S.sound === false || !!(API.S.livegame && API.S.livegame.mute);
  function ac() {
    if (muted()) return null;
    try {
      if (!AU.ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AU.ctx = new C(); AU.out = AU.ctx.createGain(); AU.out.gain.value = 0.34; const comp = AU.ctx.createDynamicsCompressor(); AU.out.connect(comp); comp.connect(AU.ctx.destination); }
      if (AU.ctx.state === 'suspended') AU.ctx.resume().catch(() => { });
      return AU.ctx;
    } catch (e) { return null; }
  }
  const NOTE = n => 440 * Math.pow(2, (n - 69) / 12);
  function env(g, t, a, peak, d) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); }
  function osc(f, t, d, type, vol, dest) { const c = AU.ctx, o = c.createOscillator(), g = c.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); env(g, t, 0.008, vol, d); o.connect(g); g.connect(dest || AU.out); o.start(t); o.stop(t + d + 0.05); }
  function pan(f, t, d, vol, dest) {
    const c = AU.ctx, car = c.createOscillator(), mod = c.createOscillator(), mg = c.createGain(), g = c.createGain();
    car.frequency.value = f; mod.frequency.value = f * 2.76; mg.gain.setValueAtTime(f * 1.4, t); mg.gain.exponentialRampToValueAtTime(f * 0.02 + 0.01, t + d);
    mod.connect(mg); mg.connect(car.frequency); env(g, t, 0.004, vol, d); car.connect(g); g.connect(dest || AU.out);
    car.start(t); mod.start(t); car.stop(t + d + 0.05); mod.stop(t + d + 0.05);
  }
  let NB = null;
  function noise(t, d, vol, hp, dest) {
    const c = AU.ctx; if (!NB) { NB = c.createBuffer(1, Math.floor(c.sampleRate * 0.5), c.sampleRate); const x = NB.getChannelData(0); for (let i = 0; i < x.length; i++) x[i] = Math.random() * 2 - 1; }
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = NB; f.type = 'highpass'; f.frequency.value = hp || 6000; env(g, t, 0.002, vol, d); s.connect(f); f.connect(g); g.connect(dest || AU.out); s.start(t); s.stop(t + d + 0.05);
  }
  function kick(t, vol, dest) { const c = AU.ctx, o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.13); env(g, t, 0.002, vol || 0.5, 0.2); o.connect(g); g.connect(dest || AU.out); o.start(t); o.stop(t + 0.3); }
  function sfx(kind) {
    const c = ac(); if (!c) return; const t = c.currentTime + 0.01;
    try {
      switch (kind) {
        case 'join': pan(NOTE(84), t, 0.25, 0.16); pan(NOTE(91), t + 0.06, 0.3, 0.13); break;
        case 'lock': osc(NOTE(76), t, 0.08, 'triangle', 0.2); osc(NOTE(83), t + 0.06, 0.14, 'triangle', 0.2); break;
        case 'pick': osc(NOTE(79), t, 0.06, 'triangle', 0.14); break;
        case 'ok': [72, 76, 79, 84].forEach((n, i) => pan(NOTE(n), t + i * 0.07, 0.45, 0.2)); break;
        case 'bad': osc(220, t, 0.22, 'sawtooth', 0.1); osc(155, t + 0.17, 0.35, 'sawtooth', 0.1); break;
        case 'last': osc(NOTE(88), t, 0.05, 'square', 0.07); break;
        case 'go': kick(t, 0.5); pan(NOTE(79), t, 0.4, 0.15); pan(NOTE(86), t + 0.08, 0.5, 0.13); break;
        case 'reveal': noise(t, 0.45, 0.1, 1200); [60, 64, 67, 72].forEach(n => osc(NOTE(n), t + 0.12, 0.9, 'triangle', 0.08)); break;
        case 'board': [67, 72, 76].forEach((n, i) => pan(NOTE(n), t + i * 0.1, 0.45, 0.17)); break;
        case 'drum': for (let i = 0; i < 34; i++) noise(t + i * 0.075, 0.06, 0.06 + i * 0.006, 1400); break;
        case 'fanfare': [[60, 0], [64, 0.12], [67, 0.24], [72, 0.36], [67, 0.6], [72, 0.72], [76, 0.84], [79, 1.02]].forEach(([n, d]) => { osc(NOTE(n), t + d, 0.5, 'sawtooth', 0.05); pan(NOTE(n + 12), t + d, 0.6, 0.12); }); kick(t + 1.02, 0.5); [72, 76, 79, 84].forEach(n => osc(NOTE(n), t + 1.05, 1.6, 'triangle', 0.05)); break;
        case 'power': [84, 88, 91, 96].forEach((n, i) => pan(NOTE(n), t + i * 0.05, 0.25, 0.12)); break;
        case 'kick': osc(300, t, 0.3, 'square', 0.06); osc(150, t + 0.12, 0.3, 'square', 0.06); break;
      }
    } catch (e) { }
  }
  const MEL = [72, 0, 76, 0, 79, 0, 76, 0, 81, 0, 79, 76, 0, 74, 72, 0, 74, 0, 79, 0, 83, 0, 79, 0, 81, 79, 0, 74, 0, 71, 74, 0, 76, 0, 72, 0, 76, 0, 81, 0, 79, 76, 0, 72, 0, 74, 76, 0, 77, 0, 81, 0, 77, 0, 74, 0, 72, 0, 74, 0, 76, 0, 79, 0];
  const BASS = [36, 43, 45, 41];
  function playStep(kind, s, t) {
    const d = AU.mg;
    if (kind === 'think') {
      const st = s % 32, bar = Math.floor(st / 16);
      if (st % 8 === 0) kick(t, 0.35, d);
      noise(t, 0.025, st % 2 ? 0.03 : 0.05, 7000, d);
      if (st % 2 === 0) osc(NOTE(bar ? (st > 23 ? 40 : 41) : 45), t, 0.12, 'triangle', 0.16, d);
      const arp = [69, 72, 76, 72, 69, 72, 76, 79];
      osc(NOTE(arp[st % 8] + (bar ? -4 : 0)), t, 0.07, 'square', 0.025, d);
    } else {
      const st = s % 64, bar = Math.floor(st / 16), b16 = st % 16;
      if (b16 % 4 === 0) kick(t, 0.32, d);
      noise(t, 0.02, b16 % 4 === 2 ? 0.07 : 0.03, 6500, d);
      if ([0, 3, 6, 8, 11, 14].includes(b16)) osc(NOTE(BASS[bar] + (b16 === 6 || b16 === 14 ? 12 : 0)), t, 0.14, 'triangle', 0.2, d);
      const m = MEL[st]; if (m) pan(NOTE(m), t, 0.32, kind === 'solo' ? 0.08 : 0.1, d);
    }
  }
  function music(kind) {
    if (kind && muted()) kind = null;
    if ((AU.kind || null) === (kind || null) && (AU.timer || !kind)) return;
    stopMusic(); if (!kind) return;
    const c = ac(); if (!c) return;
    AU.kind = kind; AU.step = 0; AU.next = c.currentTime + 0.08;
    const sp = 60 / (kind === 'think' ? 132 : kind === 'solo' ? 108 : 118) / 4;
    AU.mg = c.createGain(); AU.mg.gain.value = kind === 'think' ? 0.8 : 0.6; AU.mg.connect(AU.out);
    AU.timer = setInterval(() => {
      if (!AU.ctx || document.hidden) { if (AU.ctx) AU.next = Math.max(AU.next, AU.ctx.currentTime + 0.05); return; }
      try { let n = 0; while (AU.next < AU.ctx.currentTime + 0.15 && n++ < 8) { playStep(AU.kind, AU.step, AU.next); AU.step++; AU.next += sp; } } catch (e) { }
    }, 40);
  }
  function stopMusic() {
    if (AU.timer) clearInterval(AU.timer); AU.timer = 0; AU.kind = '';
    if (AU.mg) { const g = AU.mg; AU.mg = null; try { g.gain.setTargetAtTime(0.0001, AU.ctx.currentTime, 0.05); setTimeout(() => { try { g.disconnect(); } catch (e) { } }, 500); } catch (e) { } }
  }
  function musicFor() {
    if (QR || QH) { let q = null; if (QR) q = QR.music && QR.ph === 'play' ? 'solo' : null; else if (QH.view !== 'results' && QH.cfg.music !== false) q = QH.srv.ph === 'lobby' ? 'lobby' : QH.srv.ph === 'play' && !QH.paused ? 'solo' : null; if (q) { try { const M = window.COURSE_MUSIC; if (M && M.isPlaying && M.isPlaying()) M.stop(); } catch (e) { } } music(q); return; }
    let k = null;
    if (R) k = R.music && (R.ph === 'q' || R.ph === 'fb') ? 'solo' : null;
    else if (H && H.view !== 'results' && H.cfg.music !== false) k = H.ph === 'lobby' ? 'lobby' : (H.ph === 'q' && !H.paused) ? 'think' : null;
    if (k) { try { const M = window.COURSE_MUSIC; if (M && M.isPlaying && M.isPlaying()) M.stop(); } catch (e) { } }
    music(k);
  }
  function confetti(ms) {
    if (RM()) return;
    try {
      const cv = document.createElement('canvas'); cv.className = 'lg-cf'; cv.setAttribute('aria-hidden', 'true'); document.body.appendChild(cv);
      const dpr = Math.min(2, window.devicePixelRatio || 1), W = innerWidth, Hh = innerHeight; cv.width = W * dpr; cv.height = Hh * dpr; const x = cv.getContext('2d'); x.scale(dpr, dpr);
      const cols = TCOL.concat(['#FFFFFF', '#FFD54A']);
      const P0 = Array.from({ length: Math.min(220, Math.round(W / 6)) }, (_, i) => ({ x: Math.random() * W, y: -20 - Math.random() * Hh * 0.7, vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 3, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, w: 6 + Math.random() * 7, h: 8 + Math.random() * 10, c: cols[i % cols.length] }));
      const t0 = performance.now(), dur = ms || 4500;
      const f = now => { x.clearRect(0, 0, W, Hh); P0.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.r += p.vr; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); x.restore(); }); if (now - t0 < dur) requestAnimationFrame(f); else cv.remove(); };
      requestAnimationFrame(f); setTimeout(() => { if (cv.isConnected) cv.remove(); }, dur + 1500);
    } catch (e) { }
  }

  /* ---------- runtime capabilities (all optional; the page works without them) ---------- */
  const CAP = { st: 'idle', room: null, db: null, user: null, dl: null, uid: null, admin: false, owner: false };
  async function capInit() {
    if (CAP.st !== 'idle') return; CAP.st = 'loading';
    const c = window.claude;
    if (c && typeof c.use === 'function') {
      const use = n => Promise.resolve().then(() => c.use(n)).catch(() => null);
      const [room, db, user, dl] = await Promise.all([use('room'), use('db'), use('user'), use('downloads')]);
      CAP.room = room || null; CAP.db = db || null; CAP.user = user || null; CAP.dl = dl || null;
      if (user) { try { const me = await user.me(); CAP.uid = me && me.id || null; CAP.admin = !!(me && me.canEdit); CAP.owner = !!(me && me.isOwner); } catch (e) { } }
    }
    CAP.st = 'ready';
    const rj = ss.get('lg.rejoin');
    if (rj && CAP.room && !P && !H && Date.now() - (rj.at || 0) < 3 * 3600e3) { JF.pin = String(rj.pin || ''); JF.nick = String(rj.nick || ''); JF.av = cleanAv(rj.av); TAB = 'join'; pJoin(true); }
    paint();
  }
  const SUB = {};
  const NAMES = {};
  function names(ids) {
    if (!CAP.user || !ids.length) return;
    const need = ids.filter(id => id && !(id in NAMES)); if (!need.length) return;
    need.forEach(id => NAMES[id] = '');
    Promise.resolve(CAP.user.profiles(need)).then(ps => { let ch = false; need.forEach(id => { const n = ps && ps[id] && ps[id].name || ''; if (n !== NAMES[id]) { NAMES[id] = n; ch = true; } }); if (ch) paint(); }).catch(() => { });
  }
  function offerCSV(name, text) {
    const file = name.toLowerCase().replace(/[^a-z0-9\- ]+/g, '').trim().replace(/\s+/g, '-').slice(0, 80) + '.csv';
    const data = '\ufeff' + text;
    const direct = () => { try { const u = URL.createObjectURL(new Blob([data], { type: 'text/csv' })), a = document.createElement('a'); a.href = u; a.download = file; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); } catch (e) { flash('Download is not available here.'); } };
    if (CAP.dl) CAP.dl.save({ filename: file, data }).then(() => flash('CSV ready: ' + file)).catch(e => { if (e && e.code === 'declined') return; if (e && e.code === 'rate_limited') { flash('A download prompt is already open.'); return; } direct(); });
    else direct();
  }
  const csvCell = v => { let s = String(v == null ? '' : v); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const csv = rows => rows.map(r => r.map(csvCell).join(',')).join('\r\n');

  /* ---------- UI state ---------- */
  let TAB = '';
  const JF = { pin: '', nick: '', av: '', err: '', busy: false };
  const HS = { busy: false, err: '', note: '', cleaned: false };
  let OPEN = [];
  let FLASH = { m: '', at: 0 };
  function flash(m) { FLASH = { m, at: Date.now() }; const el = $('lg-flash'); if (el) { el.textContent = m; el.hidden = false; } else try { API.toast(m); } catch (e) { } }

  /* =====================================================================
     LIVE GAME: HOST (teacher on the projector)
     The host is the only authority: it emits absolute state on admin-only
     topics, reads answers from each player's presence, times them on its
     own clock (presence updatedAt) and computes every score itself.
     ===================================================================== */
  let H = null;
  const DBQ = { busy: false, next: null };
  function dbLive(body) { if (!CAP.db) return; DBQ.next = body; if (!DBQ.busy) dbPump(); }
  async function dbPump() {
    DBQ.busy = true;
    while (DBQ.next) {
      const b = DBQ.next; DBQ.next = null;
      try { await CAP.db.doc('live/' + b.pin).set(b); }
      catch (e) { if (e && e.code === 'unavailable') { await sleep(300 + Math.random() * 500); if (!DBQ.next) { try { await CAP.db.doc('live/' + b.pin).set(b); } catch (e2) { } } } }
    }
    DBQ.busy = false;
  }
  const players = () => H ? Object.values(H.players) : [];
  const active = () => players().filter(p => p.online);
  const ranked = () => players().slice().sort((a, b) => b.score - a.score || a.ms - b.ms || a.join - b.join);
  function fitState(s) {
    let n = 0;
    while (bytes(s) > 3800 && n++ < 6) {
      if (s.rv && s.rv.why && s.rv.why.length > 60) s.rv.why = s.rv.why.slice(0, Math.floor(s.rv.why.length / 2)) + '…';
      else if (s.q && s.q.o && s.q.o.some(o => o.length > 60)) s.q.o = s.q.o.map(o => o.length > 60 ? o.slice(0, 58) + '…' : o);
      else if (s.q && s.q.t && s.q.t.length > 200) s.q.t = s.q.t.slice(0, 200) + '…';
      else if (s.top) s.top = s.top.slice(0, 3);
    }
    return s;
  }
  function hostState() {
    const q = H.qs[H.qi] || null, ph = H.ph, now = Date.now();
    const s = { v: 1, ep: H.ep, pin: H.pin, ph, ti: H.title, qi: H.qi, n: H.qs.length, tok: H.tok || '', dur: H.dur || 0, sq: H.cfg.sq === false ? 0 : 1, pc: active().length, ac: Object.keys(H.cur || {}).length, pz: H.paused ? 1 : 0, at: now };
    if (ph === 'pre' && q) { s.left = H.paused ? H.paused.left : Math.max(0, H.preEnd - now); s.preEnd = H.preEnd; s.q = { t: q.t, k: q.k, no: q.o.length, na: q.a.length }; }
    if (ph === 'q' && q) { s.left = H.paused ? H.paused.left : Math.max(0, H.qAt + H.dur * 1000 - now); s.qAt = H.qAt; s.q = { t: q.t, o: q.o, k: q.k, na: q.a.length }; }
    if (ph === 'rev' && q) { s.q = { t: q.t, o: q.o, k: q.k, na: q.a.length }; s.rv = { a: q.a, d: H.dist || [], ok: H.nOk || 0, why: (q.why || '').slice(0, 300) }; }
    if (ph === 'board' || ph === 'podium' || ph === 'end') s.top = ranked().slice(0, 5).map(p => [p.nick, p.av, p.score, p.streak]);
    return fitState(s);
  }
  function youMap() {
    const r = ranked(), m = {}, tok = H.tok;
    r.forEach((pl, i) => {
      if (!pl.peer) return; const ah = i > 0 ? r[i - 1] : null, L = pl.last && pl.last.tok === tok && tok ? pl.last : null;
      m[pl.peer] = [pl.nick, pl.score, L ? L.gained : 0, i + 1, pl.streak, L ? L.ok : -1, ah ? ah.nick : '', ah ? ah.score - pl.score : 0, H.cur && H.cur[pl.key] ? 1 : 0, 0, L ? L.bonus : 0, r.length];
    });
    Object.keys(H.kickedPeers).forEach(p => { m[p] = ['', 0, 0, 0, 0, -1, '', 0, 0, H.kickedPeers[p], 0, 0]; });
    return m;
  }
  function publish(change) {
    if (!H) return;
    const s = hostState(); H.lastEmit = Date.now();
    if (H.room && !H.dead) H.room.emit('lq.state', s).catch(() => { });
    if (change) { const b = Object.assign({}, s, { open: s.ph !== 'end', you: youMap() }); delete b.left; dbLive(b); hostSave(); }
  }
  async function emitYou() {
    if (!H || !H.room || H.dead) return;
    const m = youMap(), parts = []; let cur = {}, size = 80;
    Object.keys(m).forEach(k => { const e = bytes(m[k]) + k.length + 6; if (size + e > 3500 && Object.keys(cur).length) { parts.push(cur); cur = {}; size = 80; } cur[k] = m[k]; size += e; });
    parts.push(cur);
    for (const c of parts) { try { await H.room.emit('lq.you', { ep: H.ep, tok: H.tok || '', ph: H.ph, m: c }); } catch (e) { } }
  }
  function hostSave() {
    if (!H) return;
    const o = {}; ['pin', 'ep', 'title', 'cfg', 'qs', 'qi', 'ph', 'players', 'banned', 'kickedKeys', 'kickedPeers', 'locked', 'hist', 'saved'].forEach(k => o[k] = H[k]);
    o.at = Date.now(); ss.set('lg.host', o);
  }
  function uniqueNick(nick, key) {
    const taken = {}; players().forEach(p => { if (p.key !== key) taken[p.nick.toLowerCase()] = 1; });
    if (!taken[nick.toLowerCase()]) return nick;
    for (let i = 2; i < 99; i++) { const n = (nick.slice(0, 13) + ' ' + i); if (!taken[n.toLowerCase()]) return n; }
    return nick;
  }
  function validChoice(c, q) {
    if (!Array.isArray(c) || !q) return null;
    const v = [...new Set(c.map(Number))].filter(i => Number.isInteger(i) && i >= 0 && i < q.o.length).sort((a, b) => a - b);
    if (!v.length || v.length !== c.length) return null;
    if (q.k !== 'ma' && v.length !== 1) return null;
    return v;
  }
  function syncPlayers() {
    if (!H || !H.room) return;
    let ps; try { ps = H.room.peers(); } catch (e) { return; }
    const now = Date.now(), seen = {}, here = {}; let joined = false, answered = false;
    (ps || []).forEach(p => { if (p && p.peer) here[p.peer] = 1; });
    (ps || []).forEach(p => {
      if (!p || p.sameTab || p.kind !== 'viewer') return;
      const pr = p.presence || {}; if (pr.host) return;
      const nick0 = cleanNick(pr.nick); if (nick0.length < 2) return;
      const key = p.by ? 'u:' + p.by : 'p:' + p.peer;
      if (H.kickedKeys[key]) { if (!H.kickedPeers[p.peer]) { H.kickedPeers[p.peer] = 1; H.youDirty = true; } return; }
      let pl = H.players[key];
      if (!pl) {
        if (H.ph === 'podium' || H.ph === 'end') return;
        if (H.locked) { if (!H.kickedPeers[p.peer]) { H.kickedPeers[p.peer] = 2; H.youDirty = true; } return; }
        let nick = rude(nick0) ? 'Player ' + (players().length + 1) : nick0;
        if (H.banned[nick.toLowerCase()]) { if (!H.kickedPeers[p.peer]) { H.kickedPeers[p.peer] = 1; H.youDirty = true; } return; }
        nick = uniqueNick(nick, key);
        pl = H.players[key] = { key, uid: p.by || null, peer: p.peer, nick, av: cleanAv(pr.av), score: 0, streak: 0, best: 0, correct: 0, ms: 0, ans: {}, join: now, online: true };
        joined = true;
      }
      if (pl.peer !== p.peer && !here[pl.peer]) { pl.peer = p.peer; H.youDirty = true; }
      seen[key] = 1;
      const av = cleanAv(pr.av); if (pr.av && av !== pl.av) pl.av = av;
      const a = pr.a;
      if (H.ph === 'q' && H.tok && a && typeof a === 'object' && a.r === H.tok && !H.cur[key]) {
        const at = Number(p.updatedAt) || now;
        if (at >= H.qAt) {
          let t = at - H.qAt; if (H.paused) t = Math.min(t, H.paused.el);
          if (t <= H.dur * 1000 + 800) { const c = validChoice(a.c, H.qs[H.qi]); if (c) { H.cur[key] = { c, ms: clamp(t, 0, H.dur * 1000) }; answered = true; } }
        }
      }
    });
    players().forEach(pl => { pl.online = !!seen[pl.key]; });
    if (joined) { H.youDirty = true; sfx('join'); }
    if (joined || answered) updHost(true);
  }
  function joinErr(e) {
    const c = e && e.code;
    if (c === 'not_permitted') return 'Live games are not available for your account in this view.';
    if (c === 'limit_reached') return 'Too many live rooms are open on this page. Close one and try again.';
    if (c === 'not_granted' || c === 'revoked' || c === 'capability_disabled' || c === 'capability_removed') return 'Live play needs the online course link.';
    return 'Could not connect to the live game. Check your connection and try again.';
  }
  function wireHost() {
    const r = H.room;
    H.unsub = [
      r.onPeers(ch => { if (!H) return; syncPlayers(); if (ch && ch.joined && ch.joined.length) { H.youDirty = true; clearTimeout(H.rejoinT); H.rejoinT = setTimeout(() => { if (H) publish(false); }, 300); } }, e => { if (H) { H.dead = e && e.code || 'error'; paint(); } }),
      r.onConnection(c => { if (!H) return; H.conn = c; if (c) publish(false); updHost(true); }, () => { })
    ];
    r.presence({ host: 1 }).catch(() => { });
  }
  async function hostCreate() {
    if (!CAP.room || !CAP.admin || HS.busy) return;
    const c = LG().cfg, P0 = poolOf(c, 'cfg');
    if (!P0.length) { HS.err = 'Choose a question source that has questions first.'; paint(); return; }
    const want = c.n === 'all' ? 50 : (+c.n || 10), n = Math.min(want, P0.length), rng = RNG(rseed());
    const qs = (c.shq === false ? P0.slice(0, n) : shuf(P0, rng).slice(0, n)).map(q => { const x = prep(q, c.sha !== false, rng); x.dur = c.t === 'auto' ? autoDur(x) : clamp(+c.t || 20, 5, 240); return x; });
    const pin = String(100000 + Math.floor(Math.random() * 900000));
    HS.busy = true; HS.err = ''; paint();
    let room; try { room = await CAP.room.join('lq-' + pin); } catch (e) { HS.busy = false; HS.err = joinErr(e); paint(); return; }
    H = { pin, ep: rid(6), title: clipW(String(c.title || '').trim() || srcLabel(c, 'cfg'), 60), cfg: Object.assign({}, c), qs, qi: -1, ph: 'lobby', tok: '', players: {}, banned: {}, kickedKeys: {}, kickedPeers: {}, cur: {}, hist: [], room, conn: true, lastEmit: 0, youAt: 0, youDirty: false, phAt: Date.now(), locked: false, view: 'game', drawer: false, saved: '', paused: null, dur: 0 };
    HS.busy = false; wireHost(); publish(true); sfx('go'); paint();
    if (CAP.db) cleanupLive();
  }
  async function hostResume() {
    const s = ss.get('lg.host'); if (!s || !CAP.room || !CAP.admin || HS.busy) return;
    HS.busy = true; paint();
    let room; try { room = await CAP.room.join('lq-' + s.pin); } catch (e) { HS.busy = false; HS.err = joinErr(e); paint(); return; }
    H = Object.assign({ cur: {}, conn: true, lastEmit: 0, youAt: 0, youDirty: true, view: 'game', drawer: false, paused: null, hist: [], kickedPeers: {}, banned: {}, kickedKeys: {}, players: {} }, s, { room, tok: '', cur: {}, phAt: Date.now() });
    players().forEach(p => p.online = false);
    HS.busy = false; wireHost();
    if (H.ph === 'pre' || H.ph === 'q') { H.qi--; hostStartQ(); }
    else { if (H.ph === 'rev') H.ph = 'board'; publish(true); paint(); }
  }
  function hostStartQ() {
    H.qi++; if (H.qi >= H.qs.length) { hostPodium(); return; }
    const q = H.qs[H.qi]; H.dur = q.dur || 20; H.cur = {}; H.allAt = 0; H.tok = ''; H.ph = 'pre'; H.paused = null; H.lastSec = -1;
    H.preEnd = Date.now() + (H.qi === 0 ? 4000 : 3000); H.phAt = Date.now();
    publish(true); sfx('go'); paint();
  }
  function hostOpenQ() { H.tok = rid(6); H.ph = 'q'; H.qAt = Date.now(); H.phAt = H.qAt; H.lastSec = -1; publish(true); paint(); }
  function hostReveal() {
    const q = H.qs[H.qi]; if (!q) return;
    const before = {}; ranked().forEach((p, i) => before[p.key] = i + 1); H.before = before;
    const d = q.o.map(() => 0); let ok = 0, bad = 0;
    players().forEach(pl => {
      const r = H.cur[pl.key]; let gained = 0, bonus = 0, good = false;
      if (r) { r.c.forEach(i => { d[i] = (d[i] || 0) + 1; }); good = same(r.c, q.a); }
      if (good) { pl.streak++; const base = Math.round(1000 * (1 - Math.min(r.ms, H.dur * 1000) / (H.dur * 1000) / 2)); bonus = H.cfg.streak !== false && pl.streak >= 2 ? Math.min(500, (pl.streak - 1) * 100) : 0; gained = base + bonus; pl.correct++; ok++; }
      else { pl.streak = 0; if (r) bad++; }
      pl.best = Math.max(pl.best || 0, pl.streak); pl.score += gained; pl.ms += r ? r.ms : H.dur * 1000;
      pl.ans[H.qi] = r ? { c: r.c, ms: r.ms, ok: good, pts: gained } : null;
      pl.last = { tok: H.tok, gained, ok: r ? (good ? 1 : 0) : -1, bonus };
    });
    H.dist = d; H.nOk = ok; H.nBad = bad; H.nNone = Math.max(0, players().length - ok - bad);
    H.hist[H.qi] = { ok, bad, none: H.nNone, d };
    H.ph = 'rev'; H.phAt = Date.now(); H.paused = null;
    publish(true); H.youDirty = true; H.youAt = 0; sfx('reveal'); paint();
  }
  function hostBoard() { H.ph = 'board'; H.phAt = Date.now(); publish(true); H.youDirty = true; H.youAt = 0; sfx('board'); paint(); }
  function hostPodium() {
    H.ph = 'podium'; H.phAt = Date.now(); H.tok = ''; H.podFx = false; publish(true); H.youDirty = true; H.youAt = 0; sfx('drum'); paint();
    hostSaveResults();
  }
  function hostNext() {
    if (!H) return;
    if (H.ph === 'lobby') { if (!players().length) { flash('Wait for at least one player to join.'); return; } H.locked = H.locked || false; hostStartQ(); }
    else if (H.ph === 'pre') hostOpenQ();
    else if (H.ph === 'q') hostReveal();
    else if (H.ph === 'rev') hostBoard();
    else if (H.ph === 'board') hostStartQ();
    else if (H.ph === 'podium') { H.view = 'results'; paint(); }
  }
  function hostPause() {
    if (!H || !(H.ph === 'q' || H.ph === 'pre')) return; const now = Date.now();
    if (H.paused) { if (H.ph === 'q') H.qAt = now - H.paused.el; else H.preEnd = now + H.paused.left; H.paused = null; }
    else H.paused = H.ph === 'q' ? { el: now - H.qAt, left: Math.max(0, H.qAt + H.dur * 1000 - now) } : { el: 0, left: Math.max(0, H.preEnd - now) };
    publish(true); paint();
  }
  function hostKick(key) {
    const pl = H && H.players[key]; if (!pl) return;
    H.kickedKeys[key] = 1; if (pl.peer) H.kickedPeers[pl.peer] = 1; H.banned[pl.nick.toLowerCase()] = 1;
    delete H.players[key]; if (H.cur) delete H.cur[key];
    H.askKick = ''; sfx('kick'); emitYou(); publish(true); paint();
  }
  function hostClose() {
    if (!H) return;
    H.ph = 'end'; publish(true); emitYou();
    const r = H.room, un = H.unsub || []; setTimeout(() => { try { un.forEach(f => f()); } catch (e) { } try { r.leave(); } catch (e) { } }, 1500);
    stopMusic(); ss.set('lg.host', null); H = null; TAB = 'host'; paint();
  }
  function resultRows() {
    const r = ranked(), n = H.qs.length;
    const head = ['Rank', 'Nickname', 'Score', 'Correct', 'Questions', 'Accuracy (%)', 'Average time (s)', 'Best streak'].concat(H.qs.map((_, i) => 'Q' + (i + 1) + ' points'));
    const asked = Math.max(1, H.hist.filter(Boolean).length);
    const rows = r.map((p, i) => { const times = Object.values(p.ans).filter(a => a && a.ms != null).map(a => a.ms); return [i + 1, p.nick, p.score, p.correct, asked, Math.round(p.correct / asked * 100), times.length ? (times.reduce((a, b) => a + b, 0) / times.length / 1000).toFixed(1) : '', p.best || 0].concat(H.qs.map((_, k) => p.ans[k] ? p.ans[k].pts : (H.hist[k] ? 0 : ''))); });
    return { head, rows };
  }
  function hostCSV() {
    const { head, rows } = resultRows();
    const qrows = H.qs.map((q, i) => { const h = H.hist[i]; const tot = h ? h.ok + h.bad + h.none : 0; return ['Q' + (i + 1), q.t.replace(/\n/g, ' '), q.a.map(k => q.o[k]).join(' | '), h && tot ? Math.round(h.ok / tot * 100) + '%' : 'not asked']; });
    const date = new Date().toISOString().slice(0, 10);
    offerCSV('live-quiz-' + H.title + '-' + date, csv([[H.title + ' (PIN ' + H.pin + ', ' + date + ')'], head].concat(rows, [[], ['Question', 'Text', 'Correct answer', 'Class % correct']], qrows)));
  }
  async function hostSaveResults() {
    if (!H || !CAP.db) return;
    const body = {
      title: H.title, pin: H.pin, at: Date.now(), n: H.qs.length, asked: H.hist.filter(Boolean).length, course: String(document.title || '').slice(0, 80),
      qs: H.qs.map((q, i) => { const h = H.hist[i]; return { t: q.t.slice(0, 300), a: q.a.map(k => q.o[k]).join(' | ').slice(0, 300), ok: h ? h.ok : 0, of: h ? h.ok + h.bad + h.none : 0 }; }),
      pl: ranked().map(p => ({ nick: p.nick, uid: p.uid || null, score: p.score, correct: p.correct, ms: Math.round(p.ms), best: p.best || 0, pts: H.qs.map((_, k) => p.ans[k] ? p.ans[k].pts : 0) }))
    };
    try { await CAP.db.doc('liveres/' + H.pin + '-' + H.ep).set(body); if (H) { H.saved = 'ok'; hostSave(); if (H.view === 'results') paint(); } }
    catch (e) { if (H) { H.saved = e && e.code === 'quota_exceeded' ? 'full' : 'err'; if (H.view === 'results') paint(); } }
  }
  async function cleanupLive() {
    if (HS.cleaned || !CAP.db || !CAP.admin) return; HS.cleaned = true;
    try { const s = await CAP.db.collection('live').where('at', '<', Date.now() - 12 * 3600e3).limit(25).get(); for (const d of s.docs) { try { await CAP.db.doc('live/' + d.id).delete(); } catch (e) { } } } catch (e) { }
  }
  function hostTick(now) {
    if (!H) return;
    syncPlayers();
    if (H.ph === 'pre' && !H.paused && now >= H.preEnd) { hostOpenQ(); return; }
    if (H.ph === 'q' && !H.paused) {
      const act = active(), all = act.length > 0 && act.every(p => H.cur[p.key]);
      if (all && !H.allAt) H.allAt = now;
      if (now - H.qAt >= H.dur * 1000 || (H.allAt && now - H.allAt > 700)) { hostReveal(); return; }
    }
    if (H.cfg.auto && !H.paused) { if (H.ph === 'rev' && now - H.phAt > 7000) { hostBoard(); return; } if (H.ph === 'board' && now - H.phAt > 5500) { hostStartQ(); return; } }
    if (now - H.lastEmit > 2000) publish(false);
    if ((H.youDirty && now - H.youAt > 500) || (now - H.youAt > 5000 && H.ph !== 'q' && H.ph !== 'pre')) { H.youDirty = false; H.youAt = now; emitYou(); }
  }

  /* =====================================================================
     LIVE GAME: PLAYER (student on a phone)
     ===================================================================== */
  let P = null;
  const PHASES = ['lobby', 'pre', 'q', 'rev', 'board', 'podium', 'end'];
  function myPeer() { try { const me = P.room.peers().find(p => p.sameTab); return me ? me.peer : ''; } catch (e) { return ''; } }
  function jerr(m) { JF.err = m; JF.busy = false; paint(); }
  function okState(d) {
    if (!d || typeof d !== 'object' || d.v !== 1 || !PHASES.includes(d.ph) || typeof d.ep !== 'string') return null;
    const q = d.q && typeof d.q === 'object' ? { t: String(d.q.t || '').slice(0, 600), o: Array.isArray(d.q.o) ? d.q.o.slice(0, 6).map(x => String(x).slice(0, 200)) : [], k: ['mc', 'ma', 'tf'].includes(d.q.k) ? d.q.k : 'mc', na: clamp(+d.q.na || 1, 1, 6), no: clamp(+d.q.no || 0, 0, 6) } : null;
    const rv = d.rv && typeof d.rv === 'object' ? { a: Array.isArray(d.rv.a) ? d.rv.a.map(Number).filter(i => i >= 0 && i < 6) : [], d: Array.isArray(d.rv.d) ? d.rv.d.slice(0, 6).map(x => +x || 0) : [], ok: +d.rv.ok || 0, why: String(d.rv.why || '').slice(0, 400) } : null;
    const top = Array.isArray(d.top) ? d.top.slice(0, 5).filter(Array.isArray).map(r => [cleanNick(r[0]), cleanAv(r[1]), +r[2] || 0, +r[3] || 0]) : null;
    return { v: 1, ep: d.ep.slice(0, 16), pin: String(d.pin || ''), ph: d.ph, ti: String(d.ti || 'Live Quiz').slice(0, 60), qi: clamp(+d.qi || 0, -1, 99), n: clamp(+d.n || 0, 0, 99), tok: String(d.tok || '').slice(0, 16), dur: clamp(+d.dur || 0, 0, 600), sq: d.sq ? 1 : 0, pc: +d.pc || 0, ac: +d.ac || 0, pz: d.pz ? 1 : 0, at: +d.at || 0, left: typeof d.left === 'number' ? clamp(d.left, 0, 600000) : null, qAt: +d.qAt || 0, preEnd: +d.preEnd || 0, q, rv, top, you: d.you && typeof d.you === 'object' ? d.you : null };
  }
  function onState(raw, via) {
    if (!P || P.kicked) return;
    const d = okState(raw); if (!d || d.pin !== P.pin) return;
    const prev = P.st, now = Date.now();
    if (prev && d.ep === prev.ep && d.at < prev.at) return;
    P.st = d; P.seenAt = now;
    if (d.ph === 'q' || d.ph === 'pre') {
      const fresh = !prev || prev.ph !== d.ph || prev.qi !== d.qi || prev.tok !== d.tok;
      if (via === 'room' && d.left != null) { P.deadline = now + d.left; P.viaRoom = d.ph + d.qi + d.tok; }
      else if (fresh || P.viaRoom !== d.ph + d.qi + d.tok) P.deadline = d.ph === 'q' ? d.qAt + d.dur * 1000 : (d.preEnd || now + 3000);
      if (d.pz) P.frozen = d.left != null ? d.left : Math.max(0, P.deadline - now); else P.frozen = null;
    }
    if (!prev || prev.qi !== d.qi || prev.ep !== d.ep) { P.sel = []; if (!P.ans || P.ans.qi !== d.qi) P.ans = null; }
    if (via === 'db' && d.you) { const e = d.you[myPeer()]; if (Array.isArray(e)) { P.you = e.slice(0, 12).map((x, i) => i === 0 || i === 6 ? cleanNick(x) : +x || 0); P.youTok = d.tok; P.youPh = d.ph; } }
    const changed = !prev || prev.ph !== d.ph || prev.qi !== d.qi || prev.tok !== d.tok || prev.pz !== d.pz || prev.ep !== d.ep;
    if (changed) { pPhaseFx(prev, d); paint(); } else updPlayer();
  }
  function onYou(msg) {
    if (!P || !msg || !msg.data || typeof msg.data !== 'object') return;
    const d = msg.data; if (!d.m || typeof d.m !== 'object' || (P.st && d.ep !== P.st.ep)) return;
    const e = d.m[myPeer()]; if (!Array.isArray(e)) return;
    const was = JSON.stringify(P.you); P.you = e.slice(0, 12).map((x, i) => i === 0 || i === 6 ? cleanNick(x) : +x || 0); P.youTok = String(d.tok || ''); P.youPh = PHASES.includes(d.ph) ? d.ph : '';
    if (P.you[9]) { pKicked(P.you[9]); return; }
    if (was !== JSON.stringify(P.you)) { if (!P.st || ['lobby', 'rev', 'board', 'podium', 'end'].includes(P.st.ph)) paint(); else updPlayer(); }
  }
  function pPhaseFx(prev, d) {
    if (d.ph === 'q' && (!prev || prev.ph !== 'q')) { sfx('go'); vib(20); }
    if (d.ph === 'rev' && (!prev || prev.ph !== 'rev')) { const r = pResult(); sfx(r.ok === 1 ? 'ok' : 'bad'); vib(r.ok === 1 ? 40 : [60, 50, 60]); }
    if (d.ph === 'podium' && (!prev || prev.ph !== 'podium')) { sfx('fanfare'); const me = P.you; if (me && me[3] >= 1 && me[3] <= 3) setTimeout(() => confetti(4000), 300); if (!P.rewarded && me && me[1] > 0) { P.rewarded = true; try { API.reward(Math.max(3, Math.round(me[1] / 500)), '🎉 Live Quiz'); } catch (e) { } } }
    if (d.ph === 'end' && P.room) { const r = P.room, un = P.unsub || []; P.unsub = []; P.room = null; setTimeout(() => { try { un.forEach(f => f()); } catch (e) { } try { r.leave(); } catch (e) { } }, 300); ss.set('lg.rejoin', null); }
  }
  function pResult() {
    const d = P.st || {}, me = P.you, fresh = me && P.youTok === d.tok && d.tok && ['rev', 'board', 'podium', 'end'].includes(P.youPh);
    let ok = -1; const mine = P.ans && P.ans.qi === d.qi ? P.ans.c : null;
    if (fresh) ok = me[5]; else if (mine && d.rv) ok = same(mine, d.rv.a) ? 1 : 0;
    return { ok, gained: fresh ? me[2] : null, bonus: fresh ? me[10] : 0, streak: fresh ? me[4] : null, rank: me ? me[3] : 0, of: me ? me[11] : 0, ahead: me ? me[6] : '', gap: me ? me[7] : 0, score: me ? me[1] : 0, mine };
  }
  async function pJoin(auto) {
    if (JF.busy || P) return;
    const pin = String(JF.pin || '').replace(/\D/g, ''), nick = cleanNick(JF.nick), av = cleanAv(JF.av || LG().av);
    if (!/^\d{6}$/.test(pin)) return jerr('Enter the 6-digit game PIN from the big screen.');
    if (nick.length < 2) return jerr('Choose a nickname of 2 to 16 letters or numbers.');
    if (rude(nick)) return jerr('Please choose a different nickname. Keep it classroom-friendly.');
    if (!CAP.room) return jerr('Live play needs the online course link. Ask your teacher for it.');
    JF.busy = true; JF.err = ''; paint();
    if (CAP.db) {
      try { const s = await CAP.db.doc('live/' + pin).get(); const d = s && s.exists ? s.data() : null; if (!d || d.ph === 'end' || d.open === false) { if (auto) ss.set('lg.rejoin', null); return jerr(auto ? '' : 'No live game has that PIN right now. Check the big screen and try again.'); } } catch (e) { }
    }
    let nr; try { nr = await CAP.room.join('lq-' + pin); } catch (e) { return jerr(joinErr(e)); }
    P = { pin, nick, av, room: nr, st: null, you: null, youTok: '', ans: null, sel: [], conn: true, at: Date.now(), unsub: [], deadline: 0 };
    const g = LG(); g.nick = nick; g.av = av; try { API.save(); } catch (e) { }
    P.unsub.push(nr.on('lq.state', m => onState(m && m.data, 'room'), e => { if (P) { P.dead = e && e.code || 'error'; paint(); } }));
    P.unsub.push(nr.on('lq.you', m => onYou(m), () => { }));
    P.unsub.push(nr.on('qm.state', m => qmOnState(m && m.data, 'room'), () => { }));
    P.unsub.push(nr.on('qm.you', m => qmOnYou(m), () => { }));
    P.unsub.push(nr.on('qm.pack', m => qmOnPack(m), () => { }));
    P.unsub.push(nr.onConnection(c => { if (!P) return; P.conn = c; updPlayer(); }, () => { }));
    if (CAP.db) { try { P.unsub.push(CAP.db.doc('live/' + pin).onSnapshot(s => { if (s && s.exists) { const v = s.data(); onState(v, 'db'); qmOnState(v, 'db'); } }, () => { })); } catch (e) { } }
    nr.presence({ nick, av }).catch(() => { });
    ss.set('lg.rejoin', { pin, nick, av, at: Date.now() });
    JF.busy = false; JF.err = ''; sfx('join'); paint();
  }
  function pDrop() { if (!P) return; const r = P.room, un = P.unsub || []; P.unsub = []; P.room = null; try { un.forEach(f => f()); } catch (e) { } if (r) { try { r.leave(); } catch (e) { } } }
  function pKicked(kind) { if (!P) return; P.kicked = kind === 2 ? 'locked' : 'removed'; pDrop(); ss.set('lg.rejoin', null); sfx('bad'); paint(); }
  function pLeave() { pDrop(); P = null; ss.set('lg.rejoin', null); paint(); }
  function pAnswer(i) {
    const d = P && P.st; if (!d || d.ph !== 'q' || d.pz || !P.room || (P.ans && P.ans.qi === d.qi)) return;
    if (P.deadline && Date.now() > P.deadline + 300) return;
    const q = d.q || {}, no = (q.o || []).length || q.no || 4; if (!(i >= 0 && i < no)) return;
    if (q.k === 'ma') { const k = P.sel.indexOf(i); if (k >= 0) P.sel.splice(k, 1); else P.sel.push(i); sfx('pick'); paint(); return; }
    pSend([i]);
  }
  function pSend(c) {
    const d = P.st; if (!c.length) return;
    P.ans = { qi: d.qi, tok: d.tok, c: c.slice().sort((a, b) => a - b), at: Date.now() };
    P.room.presence({ a: { r: d.tok, c: P.ans.c } }).catch(() => { });
    sfx('lock'); vib(25); paint();
  }

  /* =====================================================================
     SOLO PRACTICE + HOMEWORK RUNNER (self-paced, Quizizz style)
     ===================================================================== */
  let R = null;
  const PWS = { fifty: ['✂️', '50:50', 'Removes some wrong answers'], x2: ['✨', 'Double points', 'Doubles the points for this question'], frz: ['❄️', 'Time freeze', 'Stops the clock for this question'], sh: ['🛡️', 'Streak shield', 'A wrong answer will not break your streak'] };
  const PWK = Object.keys(PWS);
  function rStart(qs, o) {
    if (!qs.length) { flash('No questions to play.'); return; }
    R = Object.assign({ mode: 'solo', title: 'Practice', key: '', qs, i: 0, dur: 20, pw: true, music: true, held: [], use: {}, hide: [], score: 0, streak: 0, best: 0, correct: 0, ms: 0, log: [], ph: 'ready', qAt: 0, sel: [], hw: '', fb: null }, o);
    if (R.pw) R.held = [PWK[Math.floor(Math.random() * PWK.length)]];
    R.readyAt = Date.now(); sfx('go'); paint();
  }
  function rBegin() { if (!R) return; R.ph = 'q'; R.qAt = Date.now(); R.lastTick = R.qAt; R.sel = []; R.hide = []; R.use = {}; R.lastSec = -1; paint(); }
  function rElapsed(now) { return R.use.frz ? (R.frzEl || 0) : Math.max(0, now - R.qAt); }
  function rAnswer(c) {
    if (!R || R.ph !== 'q') return;
    const q = R.qs[R.i], now = Date.now(), el = rElapsed(now), T = R.dur * 1000;
    const ok = !!c && same(c, q.a); let base = 0, bonus = 0;
    if (ok) { R.streak++; base = R.dur ? Math.round(1000 * (1 - Math.min(el, T) / T / 2)) : Math.max(600, Math.round(1000 - Math.max(0, el - 5000) / 100)); bonus = R.streak >= 2 ? Math.min(500, (R.streak - 1) * 100) : 0; if (R.use.x2) { base *= 2; bonus *= 2; } R.correct++; }
    else if (!R.use.sh) R.streak = 0;
    const pts = base + bonus; R.score += pts; R.best = Math.max(R.best, R.streak); R.ms += R.dur ? Math.min(el, T) : el;
    R.log.push({ id: q.id, c: c || null, ok, pts, ms: el, t: q.t, o: q.o, a: q.a, why: q.why });
    R.fb = { ok, pts, bonus, to: !c, x2: !!R.use.x2, sh: !ok && !!R.use.sh, award: '' };
    if (ok && R.pw && R.streak % 3 === 0 && R.held.length < 3) { const p = PWK[Math.floor(Math.random() * PWK.length)]; R.held.push(p); R.fb.award = p; }
    R.picked = c; R.ph = 'fb'; R.fbAt = now;
    sfx(ok ? 'ok' : 'bad'); if (R.fb.award) setTimeout(() => sfx('power'), 450); vib(ok ? 25 : [40, 60, 40]); paint();
  }
  function rPower(id) {
    if (!R || R.ph !== 'q' || R.use[id]) return; const k = R.held.indexOf(id); if (k < 0) return;
    const q = R.qs[R.i];
    if (id === 'fifty') { const wrong = q.o.map((_, i) => i).filter(i => !q.a.includes(i)); if (q.k === 'tf' || wrong.length < 2) { flash('50:50 needs at least three answers.'); return; } R.hide = shuf(wrong, Math.random).slice(0, Math.max(1, Math.floor(wrong.length * 2 / 3))); }
    if (id === 'frz') { if (!R.dur) { flash('There is no timer to freeze.'); return; } R.frzEl = Math.max(0, Date.now() - R.qAt); }
    R.held.splice(k, 1); R.use[id] = true; sfx('power'); paint();
  }
  function rNext() { if (!R) return; R.i++; if (R.i >= R.qs.length) { rFinish(); return; } rBegin(); }
  function rFinish() {
    R.ph = 'done'; stopMusic();
    const acc = R.qs.length ? R.correct / R.qs.length : 0;
    sfx(acc >= 0.7 ? 'fanfare' : 'board'); if (acc >= 0.8) setTimeout(() => confetti(4000), 200);
    const g = LG(), k = R.key || 'solo'; R.pb = !g.best[k] || R.score > g.best[k]; if (R.mode === 'solo' && R.pb) g.best[k] = R.score; g.plays = (g.plays || 0) + 1;
    try { API.save(); } catch (e) { }
    R.coins = R.mode !== 'prev' && R.correct > 0 ? Math.max(2, R.correct * 2) : 0;
    if (R.mode === 'hw') hwSubmit();
    paint();
  }
  function rPayout() { if (R && R.coins) { const n = R.coins, m = R.mode; R.coins = 0; setTimeout(() => { try { API.reward(n, m === 'hw' ? '📚 Quiz homework' : '🎯 Live Quiz practice'); } catch (e) { } }, 250); } }
  function runTick(now) {
    if (!R) return;
    const inView = API && API.S.loc && API.S.loc.v === VIEW;
    if (R.ph === 'q') {
      if (!inView && R.dur) { R.qAt += now - (R.lastTick || now); R.lastTick = now; return; }
      R.lastTick = now;
      if (R.dur && !R.use.frz && now - R.qAt >= R.dur * 1000) rAnswer(null);
    }
    if (R && R.ph === 'fb' && R.fb && R.fb.ok && inView && now - R.fbAt > 2600) rNext();
  }

  /* =====================================================================
     HOMEWORK (db): homework/<id> set by the teacher; hwres/<uid> per student
     ===================================================================== */
  const HW = { list: {}, all: {}, mine: null, sel: '', ask: '', err: '', busy: false, preview: false };
  function hwSubs() {
    if (!CAP.db) return;
    if (!SUB.hw) SUB.hw = CAP.db.collection('homework').onSnapshot(s => { const o = {}; s.docs.forEach(d => { if (d.exists) o[d.id] = d.data(); }); HW.list = o; if (!R) paint(); }, () => { });
    if (CAP.admin && !SUB.hwall) SUB.hwall = CAP.db.collection('hwres').onSnapshot(s => { const o = {}; s.docs.forEach(d => { if (d.exists) o[d.id] = d.data(); }); HW.all = o; names(Object.keys(o)); if (!R) paint(); }, () => { });
    if (CAP.uid && !SUB.hwme) { try { SUB.hwme = CAP.db.doc('hwres/' + CAP.uid).onSnapshot(s => { HW.mine = s && s.exists ? s.data() : null; if (!R) paint(); }, () => { }); } catch (e) { } }
  }
  const hwOf = id => { const h = HW.list[id]; return h && typeof h === 'object' ? h : null; };
  const myHw = id => { const m = HW.mine && HW.mine.hw && HW.mine.hw[id]; return m && typeof m === 'object' ? m : null; };
  function nextFriday() { const d = new Date(); d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7 || 7)); d.setHours(23, 59, 0, 0); const p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T23:59`; }
  const localStamp = ms => { const d = new Date(ms), p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };
  const fmtDate = ms => { try { return new Date(ms).toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }); } catch (e) { return new Date(ms).toString().slice(0, 21); } };
  async function hwCreate() {
    if (!CAP.db || !CAP.admin || HW.busy) return;
    const c = LG().hcfg, P0 = poolOf(c, 'hcfg');
    if (!P0.length) { HW.err = 'Choose a question source that has questions first.'; paint(); return; }
    const due = new Date(c.due || nextFriday()).getTime();
    if (!isFinite(due)) { HW.err = 'Pick a due date and time.'; paint(); return; }
    const n = c.n === 'all' ? Math.min(60, P0.length) : Math.min(+c.n || 10, P0.length);
    const qs = shuf(P0, RNG(rseed())).slice(0, n);
    const id = 'h' + Date.now().toString(36) + rid(3);
    const body = { title: clipW(String(c.title || '').trim() || srcLabel(c, 'hcfg'), 60), src: clipW(srcLabel(c, 'hcfg'), 80), qids: qs.map(q => q.id), n: qs.length, t: clamp(+c.t || 0, 0, 240), due, att: clamp(+c.att || 0, 0, 9), pw: c.pw !== false, open: true, created: Date.now(), by: CAP.uid || null };
    HW.busy = true; HW.err = ''; paint();
    try { await CAP.db.doc('homework/' + id).set(body); HW.busy = false; c.title = ''; try { API.save(); } catch (e) { } flash('Homework set. Students see it under Homework.'); HW.sel = id; }
    catch (e) { HW.busy = false; HW.err = e && e.code === 'quota_exceeded' ? 'The class database is full. Delete an old homework first.' : 'The homework did not save. Try again.'; }
    paint();
  }
  function hwQs(h, seedStr) {
    const B = bank(), rng = RNG(hnum(seedStr));
    const qs = (Array.isArray(h.qids) ? h.qids : []).map(id => B.byId[String(id)]).filter(Boolean);
    return shuf(qs, rng).map(q => prep(q, true, rng));
  }
  function hwStart(id, preview) {
    const h = hwOf(id); if (!h) return;
    const mine = myHw(id), tries = mine ? +mine.tries || 0 : 0, att = +h.att || 0;
    if (!preview) {
      if (!CAP.uid) { flash('Sign in through the course link to save homework.'); return; }
      if (h.open === false) { flash('This homework is closed.'); return; }
      if (att && tries >= att) { flash('You have used all your attempts.'); return; }
    }
    const qs = hwQs(h, (CAP.uid || 'x') + id + tries + (preview ? Math.random() : ''));
    if (!qs.length) { flash('The questions for this homework are no longer in the course.'); return; }
    if (h.qm && QMODES[h.qm]) { qHwStart(h, id, preview, qs); return; }
    rStart(qs, { mode: preview ? 'prev' : 'hw', hw: id, title: String(h.title || 'Homework').slice(0, 60), key: 'hw:' + id, dur: clamp(+h.t || 0, 0, 240), pw: h.pw !== false, music: LG().scfg.music !== false });
  }
  async function hwSubmit() {
    if (!R || R.mode !== 'hw' || !CAP.db || !CAP.uid) { if (R) { R.postErr = 'Sign in through the course link to save homework.'; } return; }
    const h = hwOf(R.hw) || {}, now = Date.now();
    const res = { score: R.score, correct: R.correct, n: R.qs.length, ms: Math.round(R.ms), at: now, late: !!(h.due && now > h.due), q: {} };
    R.log.forEach(l => { res.q[l.id] = l.ok ? 1 : 0; });
    R.posting = true; R.postErr = ''; paint();
    let body = HW.mine ? JSON.parse(JSON.stringify(HW.mine)) : {};
    try { const snap = await CAP.db.doc('hwres/' + CAP.uid).get(); body = snap && snap.exists ? JSON.parse(JSON.stringify(snap.data())) : {}; } catch (e) { }
    if (!R) return;
    body.nick = cleanNick(LG().nick || (API.S.name || '').split(' ')[0] || '') || 'Student'; body.hw = body.hw && typeof body.hw === 'object' ? body.hw : {};
    const cur = body.hw[R.hw] && typeof body.hw[R.hw] === 'object' ? body.hw[R.hw] : { tries: 0 };
    cur.tries = (+cur.tries || 0) + 1; cur.last = res; if (!cur.first) cur.first = res; if (!cur.best || res.score > (+cur.best.score || 0)) cur.best = res;
    body.hw[R.hw] = cur; body.at = now;
    try { await CAP.db.doc('hwres/' + CAP.uid).set(body); if (R) { R.posted = true; HW.mine = body; } }
    catch (e) { if (R) R.postErr = e && e.code === 'invalid_argument' ? 'Your account can see the course but cannot save homework. Ask your teacher to share the course with you as a Contributor.' : e && e.code === 'quota_exceeded' ? 'The class database is full. Tell your teacher.' : 'Your result did not save. Check your connection and tap Try again.'; }
    if (R) R.posting = false; paint();
  }
  function hwRows(id) {
    return Object.keys(HW.all).map(uid => { const d = HW.all[uid] || {}, x = d.hw && d.hw[id]; if (!x || typeof x !== 'object' || !x.best) return null; return { uid, name: NAMES[uid] || cleanNick(d.nick) || 'Student', b: x.best, last: x.last || x.best, first: x.first || x.best, tries: +x.tries || 1 }; }).filter(Boolean).sort((a, b) => (+b.b.score || 0) - (+a.b.score || 0));
  }
  function hwCSV(id) {
    const h = hwOf(id) || {}, rows = hwRows(id);
    const qids = Array.isArray(h.qids) ? h.qids : [], B = bank();
    offerCSV('homework-' + (h.title || id), csv([[String(h.title || 'Homework') + ' (due ' + fmtDate(+h.due || 0) + ')'], ['Student', 'Best score', 'Correct', 'Questions', 'Accuracy (%)', 'Attempts', 'Time (s)', 'Last submitted', 'Late'].concat(qids.map((_, i) => 'Q' + (i + 1)))].concat(rows.map(r => [r.name, r.b.score, r.b.correct, r.b.n, r.b.n ? Math.round(r.b.correct / r.b.n * 100) : 0, r.tries, Math.round((+r.b.ms || 0) / 1000), localStamp(+r.last.at || 0), r.b.late ? 'Yes' : 'No'].concat(qids.map(q => r.b.q && q in r.b.q ? (r.b.q[q] ? 'right' : 'wrong') : '')))), [[], ['Question', 'Text', 'Class % correct']], qids.map((q, i) => { const Q = B.byId[q]; const got = rows.filter(r => r.b.q && q in r.b.q); return ['Q' + (i + 1), Q ? Q.t.replace(/\n/g, ' ') : '(removed)', got.length ? Math.round(got.filter(r => r.b.q[q]).length / got.length * 100) + '%' : '']; })));
  }

  /* ---------- past live games (db: liveres) ---------- */
  const PAST = { list: {}, sel: '', ask: '' };
  function pastSub() { if (!CAP.db || !CAP.admin || SUB.past) return; SUB.past = CAP.db.collection('liveres').onSnapshot(s => { const o = {}; s.docs.forEach(d => { if (d.exists) o[d.id] = d.data(); }); PAST.list = o; if (!R && !H) paint(); }, () => { }); }
  function pastCSV(id) {
    const g = PAST.list[id]; if (!g) return; const qs = Array.isArray(g.qs) ? g.qs : [], pl = Array.isArray(g.pl) ? g.pl : [];
    offerCSV('live-quiz-' + (g.title || id), csv([[String(g.title || 'Live Quiz') + ' (' + new Date(+g.at || 0).toISOString().slice(0, 10) + ')'], ['Rank', 'Nickname', 'Score', 'Correct', 'Best streak'].concat(qs.map((_, i) => 'Q' + (i + 1) + ' points'))].concat(pl.map((p, i) => [i + 1, p.nick, p.score, p.correct, p.best].concat(Array.isArray(p.pts) ? p.pts : []))), [[], ['Question', 'Text', 'Correct answer', 'Class % correct']], qs.map((q, i) => ['Q' + (i + 1), q.t, q.a, q.of ? Math.round(q.ok / q.of * 100) + '%' : ''])));
  }

  /* =====================================================================
     RENDERING
     ===================================================================== */
  const BTN = (a, label, cls, attrs) => `<button type="button" class="${cls || 'btn ghost'}" data-px="${a}" data-pv="${VIEW}" ${attrs || ''}>${label}</button>`;
  const tilesHTML = (q, opt) => {
    const o = q.o || [], n = o.length || q.no || 4, long = o.some(x => x.length > 40 || /\S{10,}/.test(x));
    const cls = `lg-tiles lgx-n${n} ${long ? 'lgx-long' : ''} ${opt.big ? 'lgx-big' : ''} ${opt.compact ? 'lgx-compact' : ''}`;
    let h = `<div class="${cls}" role="group" aria-label="Answers">`;
    for (let i = 0; i < n; i++) {
      const txt = o[i] || '', st = opt.state ? opt.state(i) : '', inner = `<span class="lgx-shp">${shp(i)}</span>${opt.big ? `<span class="sr">${SHAPES[i][0]}</span>` : `<span class="lgx-tt" lang="en">${esc(txt)}</span>`}${st.indexOf('lgx-right') >= 0 ? '<span class="lgx-mk" aria-label="correct">✓</span>' : st.indexOf('lgx-wpick') >= 0 ? '<span class="lgx-mk" aria-label="your answer, wrong">✗</span>' : ''}`;
      if (opt.act) h += `<button type="button" class="lg-tile lgx-c${i} ${st}" data-px="${opt.act}" data-pv="${VIEW}" data-i="${i}" data-key="${i + 1}" aria-label="${esc('Answer ' + (i + 1) + ', ' + SHAPES[i][0] + (txt ? ': ' + txt : ''))}" ${opt.dis ? 'disabled' : ''} ${st.indexOf('lgx-pick') >= 0 ? 'aria-pressed="true"' : ''}>${inner}<kbd aria-hidden="true">${i + 1}</kbd></button>`;
      else h += `<div class="lg-tile lgx-c${i} ${st}" aria-label="${esc(SHAPES[i][0] + ': ' + txt)}">${inner}</div>`;
    }
    return h + '</div>';
  };
  const ringHTML = (id, sec, frac) => { const C = 2 * Math.PI * 44; return `<div class="lg-ringw ${sec <= 5 ? 'lgx-low' : ''}" id="${id}w" role="timer" aria-label="Seconds left"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="lgx-bgc" cx="50" cy="50" r="44"/><circle class="lgx-fgc" id="${id}c" cx="50" cy="50" r="44" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - clamp(frac, 0, 1))).toFixed(1)}"/></svg><b id="${id}">${sec}</b></div>`; };
  const qbox = (t, sub, cls) => `<div class="lg-q ${t.length > 220 ? 'lgx-long' : ''} ${cls || ''}">${esc(t)}${sub ? `<small>${sub}</small>` : ''}</div>`;
  const maHint = q => q && q.k === 'ma' ? `Select every correct answer (${q.na || (q.a || []).length} correct)` : '';
  const lb = (rows, meName, prevRanks) => {
    const max = Math.max(1, ...rows.map(r => r[2]));
    return `<div class="lg-lb" role="list">${rows.map((r, i) => { const mv = prevRanks ? prevRanks[i] : 0; return `<div class="lg-row ${meName && r[0] === meName ? 'lgx-me' : ''}" role="listitem"><i class="lgx-fill" style="width:0%" data-w="${Math.round(r[2] / max * 100)}"></i><span class="lgx-rk">${i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</span><span class="lgx-av" aria-hidden="true">${esc(r[1])}</span><span class="lgx-nm">${esc(r[0])}${r[3] >= 2 ? `<span class="lgx-fire" title="Answer streak">🔥${r[3]}</span>` : ''}${mv > 0 ? `<span class="lgx-mv" aria-label="up ${mv}">▲${mv}</span>` : mv < 0 ? `<span class="lgx-mv lgx-dn" aria-label="down ${-mv}">▼${-mv}</span>` : ''}</span><span class="lgx-sc">${fmt(r[2])}</span></div>`; }).join('')}</div>`;
  };
  const podiumHTML = top => {
    const slot = (k, cls) => { const r = top[k]; return `<div class="lg-pc ${cls} ${r ? '' : 'lgx-empty'}"><div class="lgx-who">${r ? `<span class="lgx-e" aria-hidden="true">${esc(r[1])}</span><span class="lgx-nm">${esc(r[0])}</span><span class="lgx-sc">${fmt(r[2])} pts</span>` : ''}</div><div class="lgx-ped" aria-label="${ord(k + 1)} place">${k + 1}</div></div>`; };
    return `<div class="lg-podium">${slot(1, 'lgx-p2')}${slot(0, 'lgx-p1')}${slot(2, 'lgx-p3')}</div>`;
  };

  /* ---------- host arena ---------- */
  function hostArena() {
    const h = H, q = h.qs[h.qi], ph = h.ph, now = Date.now();
    const top = `<div class="lg-top"><span class="lgx-ttl">🎉 ${esc(h.title)}</span>${ph !== 'lobby' && h.qi >= 0 && h.qi < h.qs.length && ph !== 'podium' ? `<span class="lg-cx">${h.qi + 1} / ${h.qs.length}</span>` : ''}<span class="lg-cx" aria-label="Game PIN">PIN ${esc(pinFmt(h.pin))}</span>${BTN('hdrawer', `👥 <span id="lg-pc">${active().length}</span>`, 'lg-cx', 'aria-label="Players"')}${BTN('mute', muted() ? '🔇' : '🔊', 'lg-cx', `aria-label="${muted() ? 'Turn sound on' : 'Turn sound off'}" data-kbd="mute"`)}${BTN('fs', '⛶', 'lg-cx', 'aria-label="Full screen" data-kbd="fs"')}${BTN('hask', '✕ End', 'lg-cx', 'aria-label="End game"')}</div>`;
    let main = '', foot = '';
    const banner = h.dead ? `<div class="lg-banner">The live connection was lost. Scores so far are kept: open Results to export them.</div>` : h.conn === false ? `<div class="lg-banner">Reconnecting…</div>` : '';
    if (h.view === 'results') {
      const { head, rows } = resultRows();
      main = `<h2 class="lg-big">Results</h2><div class="lg-res lg-tw"><table><thead><tr>${head.slice(0, 8).map(x => `<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.slice(0, 8).map((c, i) => `<td class="${i > 1 ? 'lg-num' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('') || '<tr><td colspan="8">No players.</td></tr>'}</tbody></table></div>
        ${h.hist.length ? `<div class="lg-res"><b>Question check</b><div class="lg-qa" style="margin-top:8px">${h.qs.map((x, i) => { const s = h.hist[i]; if (!s) return ''; const tot = s.ok + s.bad + s.none, p = tot ? Math.round(s.ok / tot * 100) : 0; return `<div class="lgx-r"><span><b>Q${i + 1}</b> · ${p}% correct · ${esc(x.t.slice(0, 120))}${x.t.length > 120 ? '…' : ''}</span><div class="lgx-bar"><i style="width:${p}%"></i></div></div>`; }).join('')}</div></div>` : ''}
        <p class="lg-hint">${!CAP.db ? 'Download the CSV to keep these results.' : h.saved === 'ok' ? '✓ Saved to Past games in the class records.' : h.saved === 'full' ? 'The class database is full, so these results were not saved. Download the CSV.' : h.saved === 'err' ? 'These results did not save. Use Save again or download the CSV.' : 'Saving…'}</p>`;
      foot = `${BTN('hback', '← Podium', 'lg-btn lgx-ghost')}<span class="lgx-sp"></span>${BTN('hcsv', '⬇ Export CSV', 'lg-btn lgx-ghost')}${CAP.db ? BTN('hsave', '💾 Save again', 'lg-btn lgx-ghost') : ''}${BTN('hclose', 'Close game', 'lg-btn lgx-gold', 'data-kbd="next"')}`;
    } else if (ph === 'lobby') {
      const L = players();
      main = `<div class="lg-lobby"><div class="lg-joinbox"><div class="lgx-how">On your phone or laptop: open this course, tap <b>Live Quiz</b>, then <b>Join a game</b>.</div><div class="lg-pinrow"><div><div class="lg-lab">Game PIN</div><div class="lg-pin">${esc(pinFmt(h.pin))}</div></div><div class="lg-badge">${badge(h.pin)}</div></div><div class="lg-lab">${h.qs.length} questions · ${h.cfg.t === 'auto' ? 'timed by length' : (h.qs[0] && h.qs[0].dur) + ' s each'}${h.locked ? ' · 🔒 locked' : ''}</div></div>
        <div class="lg-side"><div class="lg-big" style="text-align:left"><span id="lg-cnt">${L.length}</span> player${L.length === 1 ? '' : 's'}</div><div class="lg-roster" id="lg-roster">${rosterHTML()}</div></div></div>`;
      foot = `<span class="lgx-sp">Tap a name to remove it.<span class="lgx-kh"> Keys: Enter starts.</span></span>${BTN('hlock', h.locked ? '🔓 Unlock' : '🔒 Lock', 'lg-btn lgx-ghost')}${BTN('hnext', '▶ Start', 'lg-btn lgx-gold lgx-big', `data-kbd="next" ${L.length ? '' : 'disabled'} id="lg-start"`)}`;
    } else if (ph === 'pre') {
      const left = h.paused ? h.paused.left : Math.max(0, h.preEnd - now);
      main = `<div class="lg-qmeta">Question ${h.qi + 1} of ${h.qs.length}${q.tag ? ' · ' + esc(q.tag) : ''}</div>${qbox(q.t, maHint(q))}<div class="lg-center" style="flex:none"><div class="lg-big" id="lg-pre">${Math.ceil(left / 1000)}</div><div class="lg-ready" aria-hidden="true"><i style="animation-duration:${left}ms;${h.paused ? 'animation-play-state:paused' : ''}"></i></div><div class="lg-hint">${h.paused ? '❚❚ Paused' : `Get ready… ${q.o.length} answers${q.k === 'ma' ? ', pick every correct one' : ''}, ${h.dur} seconds`}</div></div>`;
      foot = `${BTN('hpause', h.paused ? '▶ Resume' : '❚❚ Pause', 'lg-btn lgx-ghost', 'data-kbd="pause"')}<span class="lgx-sp"></span>${BTN('hnext', '⏭ Start answering now', 'lg-btn', 'data-kbd="next"')}`;
    } else if (ph === 'q') {
      const left = h.paused ? h.paused.left : Math.max(0, h.qAt + h.dur * 1000 - now), sec = Math.ceil(left / 1000);
      main = `${qbox(q.t, maHint(q))}<div class="lg-mid">${ringHTML('lg-sec', sec, left / (h.dur * 1000))}<div class="lg-hint">${h.paused ? '❚❚ Paused' : q.k === 'tf' ? 'True or false?' : ''}</div><div class="lg-acnt"><b id="lg-ac">${Object.keys(h.cur).length}</b><span>of <span id="lg-pc2">${active().length}</span> answered</span></div></div>${tilesHTML(q, { compact: q.o.length > 4 || q.t.length > 160 })}`;
      foot = `${BTN('hpause', h.paused ? '▶ Resume' : '❚❚ Pause', 'lg-btn lgx-ghost', 'data-kbd="pause"')}<span class="lgx-sp"><span class="lgx-kh">Keys: P pause · S skip</span></span>${BTN('hnext', '⏭ Skip to answer', 'lg-btn', 'data-kbd="skip"')}`;
    } else if (ph === 'rev') {
      const d = h.dist || [], mx = Math.max(1, ...d), tot = h.nOk + h.nBad + h.nNone || 1;
      main = `${qbox(q.t, '', 'lgx-small')}<div class="lg-dist" aria-label="How the class answered">${q.o.map((_, i) => `<div class="lg-dcol"><b>${d[i] || 0}</b><div class="lgx-bar" style="background:${TCOL[i]}" data-h="${Math.round((d[i] || 0) / mx * 100)}"></div><span class="lgx-lb">${q.a.includes(i) ? '✓' : ''}<svg viewBox="0 0 24 24" aria-hidden="true">${SHAPES[i][1]}</svg><span class="sr">${SHAPES[i][0]}</span></span></div>`).join('')}</div>
        <div class="lg-stack" role="img" aria-label="${h.nOk} correct, ${h.nBad} wrong, ${h.nNone} no answer"><i style="width:${h.nOk / tot * 100}%;background:#3DDC84"></i><i style="width:${h.nBad / tot * 100}%;background:#FF6B6B"></i><i style="width:${h.nNone / tot * 100}%;background:rgba(255,255,255,.35)"></i></div>
        <div class="lg-legend"><span><i style="background:#3DDC84"></i>${h.nOk} correct</span><span><i style="background:#FF6B6B"></i>${h.nBad} wrong</span><span><i style="background:rgba(255,255,255,.35)"></i>${h.nNone} no answer</span></div>
        ${tilesHTML(q, { compact: true, state: i => q.a.includes(i) ? 'lgx-right' : 'lgx-dim' })}${q.why ? `<div class="lg-why"><b>Why:</b> ${esc(q.why)}</div>` : ''}`;
      foot = `<span class="lgx-sp"></span>${BTN('hnext', 'Leaderboard ▶', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}`;
    } else if (ph === 'board') {
      const r = ranked().slice(0, 5), b = h.before || {};
      main = `<h2 class="lg-big">Leaderboard</h2>${r.length ? lb(r.map(p => [p.nick, p.av, p.score, p.streak]), '', r.map((p, i) => b[p.key] ? b[p.key] - (i + 1) : 0)) : '<p class="lg-hint">No players yet.</p>'}<p class="lg-hint">${h.qi + 1 < h.qs.length ? `${h.qs.length - h.qi - 1} question${h.qs.length - h.qi - 1 === 1 ? '' : 's'} to go` : 'That was the last question!'}</p>`;
      foot = `<span class="lgx-sp"></span>${BTN('hnext', h.qi + 1 < h.qs.length ? 'Next question ▶' : '🏆 Podium', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}`;
    } else if (ph === 'podium') {
      const r = ranked().slice(0, 3).map(p => [p.nick, p.av, p.score]);
      main = `<h2 class="lg-big">🏆 Podium</h2><p class="lg-hint" style="margin:-6px 0 0">${esc(h.title)}</p>${podiumHTML(r)}`;
      foot = `<span class="lgx-sp">${players().length} player${players().length === 1 ? '' : 's'} · ${h.qs.length} questions</span>${BTN('hnext', '📊 Results', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}`;
    }
    let ov = '';
    if (h.ask === 'end') ov = `<div class="lg-ov" role="dialog" aria-label="End game"><div class="lg-big">End this game?</div><p>Players will see the final scores. You can still export the results first.</p><div class="lg-foot" style="background:none">${BTN('hnoask', 'Keep playing', 'lg-btn lgx-ghost')}${ph !== 'podium' && h.view !== 'results' ? BTN('hresults', '📊 Results first', 'lg-btn lgx-ghost') : ''}${BTN('hclose', 'End game', 'lg-btn lgx-gold')}</div></div>`;
    if (h.askKick && h.players[h.askKick]) { const p = h.players[h.askKick]; ov = `<div class="lg-ov" role="dialog" aria-label="Remove player"><div class="lgx-e" style="font-size:3rem">${esc(p.av)}</div><div class="lg-big">Remove ${esc(p.nick)}?</div><p>They leave the game and cannot rejoin with this nickname.</p><div class="lg-foot" style="background:none">${BTN('hnokick', 'Cancel', 'lg-btn lgx-ghost')}${BTN('hkickyes', 'Remove', 'lg-btn lgx-gold', `data-k="${esc(p.key)}"`)}</div></div>`; }
    const drawer = h.drawer ? `<div class="lg-drawer" role="dialog" aria-label="Players"><div class="lg-prow"><b>Players (${players().length})</b>${BTN('hdrawer', '✕', 'lg-cx', 'aria-label="Close players"')}</div>${ranked().map(p => `<div class="lg-drow ${p.online ? '' : 'lg-off'}"><span aria-hidden="true">${esc(p.av)}</span><span class="lgx-n">${esc(p.nick)}</span><span class="lg-num">${fmt(p.score)}</span>${BTN('hkick', 'Remove', 'lg-cx', `data-k="${esc(p.key)}" aria-label="Remove ${esc(p.nick)}"`)}</div>`).join('') || '<p>No players yet.</p>'}<p style="opacity:.8;font-size:.9rem">Faded names have closed the game on their device.</p></div>` : '';
    const flashH = `<div class="lg-toast" id="lg-flash" role="status" ${FLASH.m && Date.now() - FLASH.at < 2600 ? '' : 'hidden'}>${esc(FLASH.m)}</div>`;
    return `<div class="lg-arena lgx-host" tabindex="-1" role="region" aria-label="Live Quiz host screen" data-sig="h${ph}${h.qi}${h.view}">${BGSH()}${banner}${top}<div class="lg-main">${main}</div><div class="lg-foot">${foot}</div>${drawer}${ov}${flashH}<div class="sr" aria-live="polite" id="lg-live">${ph === 'q' ? 'Question ' + (h.qi + 1) + ' is open' : ph === 'rev' ? 'Answers revealed' : ''}</div></div>`;
  }
  function rosterHTML() {
    const L = players().sort((a, b) => a.join - b.join);
    return L.length ? L.map(p => `<button type="button" class="lg-pl ${p.online ? '' : 'lg-off'}" data-px="hkick" data-pv="${VIEW}" data-k="${esc(p.key)}" aria-label="Remove ${esc(p.nick)}"><span class="lgx-e" aria-hidden="true">${esc(p.av)}</span><span class="lgx-n">${esc(p.nick)}</span></button>`).join('') : `<div class="lg-wait" aria-live="polite">Waiting for players <i></i><i></i><i></i></div>`;
  }

  /* ---------- player arena ---------- */
  function playerArena() {
    const d = P.st, me = P.you, now = Date.now();
    let cls = '', main = '', foot = '';
    const nick = me && me[0] ? me[0] : P.nick;
    const top = `<div class="lg-top"><span class="lgx-ttl"><span aria-hidden="true">${esc(P.av)}</span> ${esc(nick)}</span>${me ? `<span class="lg-cx" aria-label="Your score">${fmt(me[1])} pts</span>` : ''}${me && me[4] >= 2 ? `<span class="lg-cx" aria-label="Answer streak">🔥 ${me[4]}</span>` : ''}${BTN('mute', muted() ? '🔇' : '🔊', 'lg-cx', `aria-label="${muted() ? 'Turn sound on' : 'Turn sound off'}" data-kbd="mute"`)}${BTN('pask', 'Leave', 'lg-cx')}</div>`;
    if (P.kicked) {
      main = `<div class="lg-center"><div class="lgx-e" aria-hidden="true">${P.kicked === 'locked' ? '🔒' : '🚫'}</div><div class="lg-big">${P.kicked === 'locked' ? 'This game is locked' : 'You were removed from this game'}</div><p>${P.kicked === 'locked' ? 'The host is not letting new players in right now.' : 'Ask your teacher if you think this was a mistake.'}</p>${BTN('pleave', 'OK', 'lg-btn lgx-gold lgx-big')}</div>`;
    } else if (P.dead) {
      main = `<div class="lg-center"><div class="lgx-e" aria-hidden="true">📡</div><div class="lg-big">Connection lost</div><p>Your score is kept by the host. Leave, then join again with the same PIN and nickname.</p>${BTN('pleave', 'Leave', 'lg-btn lgx-gold lgx-big')}</div>`;
    } else if (!d) {
      const slow = now - P.at > 9000;
      main = `<div class="lg-center"><div class="lgx-e" aria-hidden="true">${esc(P.av)}</div><div class="lg-big">Joining game ${esc(pinFmt(P.pin))}</div><div class="lg-wait">Connecting <i></i><i></i><i></i></div>${slow ? '<p>Still looking for the game. Check the PIN on the big screen, or ask your teacher to open the game.</p>' : ''}</div>`;
    } else if (d.ph === 'lobby') {
      main = `<div class="lg-center"><div class="lgx-e" aria-hidden="true">${esc(P.av)}</div><div class="lg-big">${me ? "You're in!" : 'Almost in…'}</div><p>${me ? `See <b>${esc(nick)}</b> on the big screen? The game starts soon.` : 'Waiting for the host to add you.'}</p><div class="lg-badge" style="width:96px">${badge(P.pin)}</div><p style="opacity:.85;font-size:.9rem">This badge matches the one on the big screen.</p><div class="lg-wait">Waiting for the host <i></i><i></i><i></i></div></div>`;
    } else if (d.ph === 'pre') {
      const left = d.pz ? (P.frozen || 0) : Math.max(0, P.deadline - now);
      main = `<div class="lg-qmeta">Question ${d.qi + 1} of ${d.n}</div>${d.sq && d.q && d.q.t ? qbox(d.q.t, maHint(d.q)) : ''}<div class="lg-center"><div class="lg-big" id="lg-ppre">${Math.ceil(left / 1000)}</div><div class="lg-ready" aria-hidden="true"><i style="animation-duration:${left}ms;${d.pz ? 'animation-play-state:paused' : ''}"></i></div><div class="lg-hint">${d.pz ? '❚❚ Paused by your teacher' : 'Get ready!'}</div></div>`;
    } else if (d.ph === 'q') {
      const q = d.q || { o: [], k: 'mc', na: 1 }, done = P.ans && P.ans.qi === d.qi, left = d.pz ? (P.frozen || 0) : Math.max(0, P.deadline - now), late = !d.pz && P.deadline && left <= 0;
      if (done) {
        main = `<div class="lg-center"><div class="lg-lockin">${P.ans.c.map(i => `<div class="lg-tile lgx-c${i}" aria-label="${SHAPES[i][0]}"><span class="lgx-shp">${shp(i)}</span></div>`).join('')}</div><div class="lg-big">Answer locked in!</div><div class="lg-wait">Waiting for the others <i></i><i></i><i></i></div><p id="lg-pac">${d.ac} of ${d.pc} answered</p></div>`;
      } else {
        const sel = P.sel || [];
        main = `<div class="lg-pbar ${left <= 5000 ? 'lgx-low' : ''}" role="timer" aria-label="Time left"><i id="lg-pbar" style="width:${d.dur ? clamp(left / (d.dur * 1000) * 100, 0, 100) : 100}%"></i></div><div class="lg-prow"><span>Q${d.qi + 1} / ${d.n}</span><span id="lg-psec">${Math.ceil(left / 1000)} s</span></div>${d.sq && q.t ? qbox(q.t, maHint(q)) : q.k === 'ma' ? `<div class="lg-hint">${maHint(q)}</div>` : '<div class="lg-hint">Look at the big screen and tap your answer</div>'}${tilesHTML(d.sq ? q : { o: [], no: q.o.length || q.no || 4 }, { act: 'pans', big: !d.sq, dis: !!d.pz || late, state: i => sel.includes(i) ? 'lgx-pick' : '' })}${q.k === 'ma' ? `<div class="lg-foot" style="background:none;padding:0">${BTN('psubmit', `Submit ${sel.length ? '(' + sel.length + ')' : ''}`, 'lg-btn lgx-gold lgx-big', `${sel.length ? '' : 'disabled'} data-kbd="next"`)}</div>` : ''}`;
        if (d.pz) main += `<div class="lg-ov"><div class="lgx-e" style="font-size:3rem" aria-hidden="true">⏸️</div><div class="lg-big">Paused</div><p>Your teacher paused the game.</p></div>`;
        else if (late) main += `<div class="lg-ov"><div class="lgx-e" style="font-size:3rem" aria-hidden="true">⏰</div><div class="lg-big">Time's up!</div></div>`;
      }
    } else if (d.ph === 'rev') {
      const r = pResult(); cls = r.ok === 1 ? 'lgx-ok' : r.ok === 0 ? 'lgx-bad' : 'lgx-none';
      const q = d.q || { o: [] };
      main = `<div class="lg-center"><div class="lg-mark" aria-hidden="true">${r.ok === 1 ? '✓' : r.ok === 0 ? '✗' : '⏰'}</div><div class="lg-big">${r.ok === 1 ? 'Correct!' : r.ok === 0 ? 'Not this time' : r.mine ? 'Checking…' : "Time's up"}</div>
        ${r.ok === 1 && r.gained != null ? `<div class="lg-plus">+${fmt(r.gained)}</div>` : ''}${r.ok === 1 && r.bonus ? `<div class="lg-streak">🔥 Answer streak ${r.streak} · +${fmt(r.bonus)} bonus</div>` : r.ok === 1 && r.streak ? `<div class="lg-streak">🔥 Answer streak ${r.streak}</div>` : r.ok !== 1 && r.gained != null ? `<div class="lg-streak">Streak lost. Keep going!</div>` : ''}
        ${d.rv && d.rv.a && q.o.length ? `<div class="lg-card"><span>Correct answer${d.rv.a.length > 1 ? 's' : ''}:</span>${d.rv.a.map(i => `<b>${SHAPES[i][0]}: ${esc(q.o[i] || '')}</b>`).join('')}</div>` : ''}
        ${r.rank ? `<div class="lg-card"><big>${ord(r.rank)} place</big><span>${r.rank === 1 ? "You're in the lead!" : r.ahead ? `${fmt(r.gap)} pts behind ${esc(r.ahead)}` : ''}</span></div>` : ''}</div>`;
    } else if (d.ph === 'board') {
      const r = pResult();
      main = `<div class="lg-center"><div class="lgx-e" aria-hidden="true">${r.rank === 1 ? '👑' : r.rank && r.rank <= 3 ? '🔥' : '💪'}</div><div class="lg-big">${r.rank ? ord(r.rank) + ' place' : 'Leaderboard'}</div><div class="lg-card"><big>${fmt(r.score)} pts</big><span>${r.rank === 1 ? "You're in the lead. Stay sharp!" : r.ahead ? `Only ${fmt(r.gap)} pts behind ${esc(r.ahead)}.` : ''}</span></div>${d.top ? lb(d.top, nick) : ''}</div>`;
    } else if (d.ph === 'podium' || d.ph === 'end') {
      const r = pResult(), medal = r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : '🎉';
      main = `<div class="lg-center"><div class="lgx-e" aria-hidden="true">${medal}</div><div class="lg-big">${r.rank ? `You finished ${ord(r.rank)}${r.of ? ' of ' + r.of : ''}` : 'Game over'}</div><div class="lg-card"><big>${fmt(r.score)} pts</big><span>${r.rank && r.rank <= 3 ? "You're on the podium!" : 'Great game! Every question makes you sharper.'}</span></div>${d.top ? lb(d.top.slice(0, 3), nick) : ''}${d.ph === 'end' ? BTN('pleave', 'Done', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"') : '<p class="lg-hint">Look at the big screen for the podium!</p>'}</div>`;
    }
    const banner = P.conn === false && !P.kicked && !P.dead ? `<div class="lg-banner" id="lg-pban">Reconnecting…</div>` : '';
    const ov = P.ask ? `<div class="lg-ov" role="dialog" aria-label="Leave game"><div class="lg-big">Leave the game?</div><p>You can join again with the same PIN.</p><div class="lg-foot" style="background:none">${BTN('pnoask', 'Stay', 'lg-btn lgx-ghost')}${BTN('pleave', 'Leave', 'lg-btn lgx-gold')}</div></div>` : '';
    return `<div class="lg-arena lgx-phone ${cls}" tabindex="-1" role="region" aria-label="Live Quiz" data-sig="p${d ? d.ph + d.qi + d.pz : 'w'}${P.kicked || ''}">${cls ? '' : BGSH()}${banner}${top}<div class="lg-main">${main}</div>${foot ? `<div class="lg-foot">${foot}</div>` : ''}${ov}<div class="sr" aria-live="polite">${d && d.ph === 'q' ? 'Question ' + (d.qi + 1) + ' is open' : d && d.ph === 'rev' ? (pResult().ok === 1 ? 'Correct' : 'Incorrect') : ''}</div></div>`;
  }

  /* ---------- solo / homework arena ---------- */
  function runArena() {
    const r = R, q = r.qs[r.i], now = Date.now();
    const top = `<div class="lg-top"><span class="lgx-ttl">${r.mode === 'hw' ? '📚' : r.mode === 'prev' ? '👀' : '🎯'} ${esc(r.title)}</span>${r.ph !== 'done' ? `<span class="lg-cx">${Math.min(r.i + 1, r.qs.length)} / ${r.qs.length}</span>` : ''}<span class="lg-cx" aria-label="Score">${fmt(r.score)} pts</span>${r.streak >= 2 ? `<span class="lg-cx" aria-label="Answer streak">🔥 ${r.streak}</span>` : ''}${BTN('mute', muted() ? '🔇' : '🔊', 'lg-cx', `aria-label="${muted() ? 'Turn sound on' : 'Turn sound off'}" data-kbd="mute"`)}${BTN('rquit', r.ph === 'done' ? '✕ Close' : '✕ Quit', 'lg-cx')}</div>`;
    let main = '', foot = '';
    if (r.ph === 'ready') {
      main = `<div class="lg-center"><div class="lgx-e" aria-hidden="true">${r.mode === 'hw' ? '📚' : '🎯'}</div><div class="lg-big">${esc(r.title)}</div><p>${r.qs.length} questions · ${r.dur ? r.dur + ' seconds each' : 'no timer'}${r.pw ? ' · power-ups on' : ''}. Faster correct answers score more, up to 1,000 points, plus streak bonuses.</p>${r.pw ? `<div class="lg-pw">${PWK.map(k => `<span class="lg-pwb" style="cursor:default" title="${esc(PWS[k][2])}">${PWS[k][0]} ${PWS[k][1]}</span>`).join('')}</div><p style="opacity:.85;font-size:.92rem">Earn a power-up every 3 correct in a row. Tap one before you answer.</p>` : ''}${BTN('rgo', "▶ Let's go", 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}<p style="opacity:.8;font-size:.9rem">Keys: 1 to ${Math.min(6, Math.max(...r.qs.map(x => x.o.length)))} answer · Enter next</p></div>`;
    } else if (r.ph === 'q' || r.ph === 'fb') {
      const fb = r.ph === 'fb' ? r.fb : null, el = r.ph === 'q' ? rElapsed(now) : 0, left = r.dur ? Math.max(0, r.dur * 1000 - el) : 0;
      const sel = r.sel || [];
      const state = i => { if (fb) { const mine = r.picked || []; return q.a.includes(i) ? 'lgx-right' : mine.includes(i) ? 'lgx-wpick lgx-dim' : 'lgx-dim'; } return (r.hide.includes(i) ? 'lgx-gone ' : '') + (sel.includes(i) ? 'lgx-pick' : ''); };
      main = `${r.dur && !fb ? `<div class="lg-pbar ${left <= 5000 ? 'lgx-low' : ''}" role="timer" aria-label="Time left"><i id="lg-rbar" style="width:${clamp(left / (r.dur * 1000) * 100, 0, 100)}%"></i></div><div class="lg-prow"><span>${q.tag ? esc(q.tag) : ''}</span><span id="lg-rsec">${r.use.frz ? '❄️ frozen' : Math.ceil(left / 1000) + ' s'}</span></div>` : ''}${qbox(q.t, maHint(q))}${tilesHTML(q, { act: fb ? '' : 'rans', state })}`;
      if (!fb && q.k === 'ma') main += `<div class="lg-foot" style="background:none;padding:0">${BTN('rsubmit', `Submit ${sel.length ? '(' + sel.length + ')' : ''}`, 'lg-btn lgx-gold lgx-big', `${sel.length ? '' : 'disabled'} data-kbd="next"`)}</div>`;
      if (!fb && r.pw && r.held.length) main += `<div class="lg-pw" aria-label="Your power-ups">${r.held.map(k => `${BTN('rpow', `${PWS[k][0]} ${PWS[k][1]}`, 'lg-pwb', `data-k="${k}" title="${esc(PWS[k][2])}"`)}`).join('')}</div>`;
      if (!fb && Object.keys(r.use).length) main += `<p class="lg-hint">${Object.keys(r.use).map(k => PWS[k][0] + ' ' + PWS[k][1] + ' active').join(' · ')}</p>`;
      if (fb) main += `<div class="lg-fb ${fb.ok ? 'lgx-ok' : 'lgx-bad'}" role="status"><h3>${fb.ok ? '✓ Correct!' : fb.to ? "⏰ Time's up" : '✗ Not quite'}${fb.ok ? ` <span class="lg-plus" style="font-size:1.2rem">+${fmt(fb.pts)}</span>` : ''}</h3>${fb.ok && r.streak >= 2 ? `<p>🔥 Answer streak ${r.streak}${fb.bonus ? ` · +${fmt(fb.bonus)} bonus` : ''}${fb.x2 ? ' · ✨ doubled' : ''}</p>` : fb.sh ? '<p>🛡️ Your shield saved your streak.</p>' : ''}${fb.award ? `<p><b>Power-up earned: ${PWS[fb.award][0]} ${PWS[fb.award][1]}!</b></p>` : ''}${!fb.ok ? `<p><b>Answer:</b> ${esc(q.a.map(i => q.o[i]).join(' · '))}</p>` : ''}${q.why ? `<p>${esc(q.why)}</p>` : ''}</div>`;
      foot = fb ? `<span class="lgx-sp">${fb.ok ? 'Moving on…' : ''}</span>${BTN('rnext', r.i + 1 < r.qs.length ? 'Next ▶' : 'See results ▶', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}` : '';
    } else if (r.ph === 'done') {
      const acc = r.qs.length ? Math.round(r.correct / r.qs.length * 100) : 0, wrong = r.log.filter(l => !l.ok);
      main = `<div class="lg-center" style="flex:none"><div class="lgx-e" aria-hidden="true">${acc >= 80 ? '🏆' : acc >= 50 ? '🌟' : '💪'}</div><div class="lg-big">${acc >= 80 ? 'Outstanding!' : acc >= 50 ? 'Good work!' : 'Keep practising!'}</div>${r.mode === 'solo' && r.pb ? '<div class="lg-streak">🎉 New personal best</div>' : ''}</div>
        <div class="lg-sum"><div><b>${fmt(r.score)}</b>points</div><div><b>${r.correct}/${r.qs.length}</b>correct</div><div><b>${acc}%</b>accuracy</div><div><b>🔥 ${r.best}</b>best streak</div></div>
        ${r.mode === 'hw' ? `<p class="lg-hint" role="status">${r.posting ? 'Saving your result…' : r.posted ? '✓ Your result is saved for your teacher.' : r.postErr ? esc(r.postErr) : ''}</p>` : r.mode === 'prev' ? '<p class="lg-hint">Preview only: nothing was saved.</p>' : ''}
        ${wrong.length ? `<div class="lg-rev"><b>Review what you missed</b>${wrong.map(l => `<details><summary>${esc(l.t.length > 140 ? l.t.slice(0, 140) + '…' : l.t)}</summary><p><b>Answer:</b> ${esc(l.a.map(i => l.o[i]).join(' · '))}${l.c ? `<br><b>You chose:</b> ${esc(l.c.map(i => l.o[i]).join(' · '))}` : '<br>No answer in time.'}</p>${l.why ? `<p>${esc(l.why)}</p>` : ''}</details>`).join('')}</div>` : ''}`;
      foot = `${r.mode === 'hw' && r.postErr && !r.posting ? BTN('rretry', 'Try again', 'lg-btn lgx-ghost') : ''}<span class="lgx-sp"></span>${r.mode === 'solo' && wrong.length ? BTN('rmissed', '🔁 Practise missed', 'lg-btn lgx-ghost') : ''}${r.mode === 'solo' ? BTN('ragain', '▶ Play again', 'lg-btn lgx-ghost') : ''}${BTN('rquit', 'Done', 'lg-btn lgx-gold', 'data-kbd="next"')}`;
    }
    const flashH = `<div class="lg-toast" id="lg-flash" role="status" ${FLASH.m && Date.now() - FLASH.at < 2600 ? '' : 'hidden'}>${esc(FLASH.m)}</div>`;
    return `<div class="lg-arena lgx-solo" tabindex="-1" role="region" aria-label="Quiz" data-sig="r${r.ph}${r.i}">${BGSH()}${top}<div class="lg-main">${main}</div>${foot ? `<div class="lg-foot">${foot}</div>` : ''}${flashH}</div>`;
  }

  /* ---------- setup pages (inline, course styling) ---------- */
  function srcPicker(cn, ctx) {
    const c = LG()[cn], B = bank(), sets = visSets(ctx), tests = visTests(ctx);
    const kinds = [['set', '📚 Quiz set'], ['test', '🧪 ' + B.word + ' test'], ['mix', '🎛️ Mix topics']];
    let h = `<div class="lg-f"><span class="lgx-lab">Questions from</span><div class="lg-seg" role="group" aria-label="Question source">${kinds.map(([k, l]) => `<button type="button" class="chip ${c.kind === k ? 'sel' : ''}" aria-pressed="${c.kind === k}" data-px="kind" data-pv="${VIEW}" data-k="${cn}" data-v="${k}">${l}</button>`).join('')}</div></div>`;
    if (c.kind === 'set') {
      const cur = curKey(c, ctx), groups = {}; sets.forEach(s => (groups[s.group] = groups[s.group] || []).push(s));
      h += `<div class="lg-f"><label for="lg-${cn}-set">Quiz set</label><select id="lg-${cn}-set" data-lgc="${cn}.set">${Object.keys(groups).map(g => `<optgroup label="${esc(g)}">${groups[g].map(s => `<option value="${esc(s.key)}" ${s.key === cur ? 'selected' : ''}>${esc(s.title)} (${s.qs.length})</option>`).join('')}</optgroup>`).join('')}</select></div>`;
    } else if (c.kind === 'test') {
      const cur = curKey(c, ctx);
      h += `<div class="lg-f"><label for="lg-${cn}-test">${B.word} test</label><select id="lg-${cn}-test" data-lgc="${cn}.test">${tests.map(s => `<option value="${esc(s.key)}" ${s.key === cur ? 'selected' : ''}>${esc(s.title)} (${s.qs.length})</option>`).join('')}</select></div>`;
    } else {
      const byMod = B.mods.map(m => ({ m, L: sets.filter(s => s.mod === m.id) })).filter(x => x.L.length), other = sets.filter(s => !s.mod);
      const grp = (id, label, L) => { const all = L.every(s => c.mix.includes(s.key)), some = L.some(s => c.mix.includes(s.key)); return `<div class="lg-mrow"><label class="lgx-mod"><input type="checkbox" data-lgmm="${cn}" value="${esc(id)}" ${all ? 'checked' : ''} ${some && !all ? 'data-ind="1"' : ''}> <span>${esc(label)} <span class="hint">(${L.reduce((a, s) => a + s.qs.length, 0)} questions)</span></span></label><details ${some && !all ? 'open' : ''}><summary>Choose topics (${L.length})</summary>${L.map(s => `<label><input type="checkbox" data-lgm="${cn}" value="${esc(s.key)}" ${c.mix.includes(s.key) ? 'checked' : ''}> <span>${esc(s.title)} <span class="hint">(${s.qs.length})</span></span></label>`).join('')}</details></div>`; };
      h += `<div class="lg-f"><span class="lgx-lab">Tick whole ${B.word.toLowerCase()}s or open one to pick topics</span><div class="lg-mix">${byMod.map(x => grp(x.m.id, (x.m.code || x.m.id) + (x.m.title ? ': ' + x.m.title : ''), x.L)).join('')}${other.length ? grp('_other', 'Exam practice', other) : ''}</div></div>`;
    }
    const n = poolOf(c, ctx).length;
    h += `<p class="hint lg-count" id="lg-${cn}-count" aria-live="polite">${n ? `${n} question${n === 1 ? '' : 's'} available` : '<span class="lg-err">No questions chosen yet.</span>'}</p>`;
    return h;
  }
  const selF = (cn, f, label, opts) => { const v = String(LG()[cn][f]); return `<div class="lg-f"><label for="lg-${cn}-${f}">${label}</label><select id="lg-${cn}-${f}" data-lgc="${cn}.${f}">${opts.map(([k, l]) => `<option value="${k}" ${String(k) === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>`; };
  const togF = (cn, f, label) => `<label><input type="checkbox" data-lgc="${cn}.${f}" ${LG()[cn][f] !== false ? 'checked' : ''}> ${label}</label>`;
  const NOPTS = [['5', '5'], ['10', '10'], ['15', '15'], ['20', '20'], ['25', '25'], ['30', '30'], ['all', 'All (up to 50)']];
  const notice = (t, b) => `<div class="lg-note" role="note"><b>${t}</b><span>${b}</span></div>`;
  const NEEDLINK = 'Live play needs the online course link. Open the course from the link your teacher shared, signed in, to host or join a live game.';
  const tabList = () => CAP.admin ? [['host', '🎤 Host live'], ['join', '📱 Join a game'], ['quest', '⚔️ Quest Modes'], ['hw', '📚 Homework'], ['solo', '🎯 Solo practice'], ['past', '🗂️ Past games']] : [['join', '📱 Join a game'], ['quest', '⚔️ Quest Modes'], ['hw', '📚 Homework'], ['solo', '🎯 Solo practice']];
  const curTab = () => { const L = tabList(); if (TAB && L.some(x => x[0] === TAB)) return TAB; return CAP.st !== 'ready' ? 'solo' : CAP.admin && CAP.room ? 'host' : CAP.room ? 'join' : 'solo'; };
  function tabsHTML() {
    const L = tabList(), TAB = curTab();
    return `<div class="lg-tabs" role="tablist" aria-label="Live Quiz modes">${L.map(([k, l]) => `<button type="button" role="tab" class="chip ${TAB === k ? 'sel' : ''}" aria-selected="${TAB === k}" data-px="tab" data-pv="${VIEW}" data-k="${k}">${l}</button>`).join('')}</div>`;
  }
  function hostTab() {
    if (CAP.st !== 'ready') return `<div class="card"><p class="hint">Connecting to your class…</p></div>`;
    if (!CAP.room) return `<div class="card">${notice('Live games need the course link', NEEDLINK + ' You can still run Solo practice on the projector here.')}<div class="row">${BTN('tab', '🎯 Solo practice', 'btn go', 'data-k="solo"')}</div></div>`;
    const s = ss.get('lg.host'), c = LG().cfg;
    let h = '';
    if (s && s.pin && s.ph !== 'end' && Date.now() - (s.at || 0) < 3 * 3600e3) h += `<div class="card"><span class="kicker">Game in progress</span><h2>${esc(s.title || 'Live Quiz')} · PIN ${esc(pinFmt(s.pin))}</h2><p class="hint">${s.ph === 'lobby' ? 'Still in the lobby.' : 'Question ' + ((+s.qi || 0) + 1) + ' of ' + ((s.qs || []).length)}. Players keep their scores when you resume.</p><div class="row">${BTN('hresume', '▶ Resume game', 'btn go', HS.busy ? 'disabled' : '')}${BTN('hdiscard', 'Discard it', 'btn ghost')}</div></div>`;
    h += `<div class="card"><span class="kicker">Host a live game</span><h2>Put a quiz on the big screen</h2><p class="hint">Students join on their phones with a game PIN. Questions, timer, answer counts, leaderboard and podium all show on your projector.</p>
      ${srcPicker('cfg', 'cfg')}
      <div class="lg-grid">${selF('cfg', 'n', 'Number of questions', NOPTS)}${selF('cfg', 't', 'Time per question', [['auto', 'Auto (by length)'], ['10', '10 seconds'], ['15', '15 seconds'], ['20', '20 seconds'], ['30', '30 seconds'], ['45', '45 seconds'], ['60', '60 seconds'], ['90', '90 seconds'], ['120', '2 minutes']])}<div class="lg-f"><label for="lg-cfg-title">Game title (optional)</label><input id="lg-cfg-title" type="text" maxlength="60" data-lgi="cfg.title" value="${esc(c.title)}" placeholder="${esc(srcLabel(c, 'cfg'))}"></div></div>
      <div class="lg-tog">${togF('cfg', 'shq', 'Shuffle questions')}${togF('cfg', 'sha', 'Shuffle answers')}${togF('cfg', 'sq', 'Show questions on phones')}${togF('cfg', 'streak', 'Streak bonus')}${togF('cfg', 'music', 'Music')}<label><input type="checkbox" data-lgc="cfg.auto" ${c.auto ? 'checked' : ''}> Auto-advance</label></div>
      ${HS.err ? `<p class="lg-err" role="alert">${esc(HS.err)}</p>` : ''}
      <div class="row">${BTN('hcreate', HS.busy ? 'Opening the game…' : '🎉 Create game', 'btn gold', HS.busy ? 'disabled' : '')}<span class="hint">Tip: press F on the game screen for full screen.</span></div></div>`;
    return h;
  }
  function joinTab() {
    if (CAP.st !== 'ready') return `<div class="card"><p class="hint">Connecting…</p></div>`;
    if (!CAP.room) return `<div class="card">${notice('Live play needs the course link', NEEDLINK)}<div class="row">${BTN('tab', '🎯 Try Solo practice', 'btn go', 'data-k="solo"')}</div></div>`;
    subLive();
    const g = LG(); if (!JF.nick) JF.nick = g.nick || String(API.S.name || '').split(' ')[0] || ''; if (!JF.av) JF.av = cleanAv(g.av || AVS[Math.floor(Math.random() * 8)]);
    return `${CAP.db ? `<div class="card" id="lg-openc">${openHTML()}</div>` : ''}<div class="card"><span class="kicker">Join a live game</span><h2>Enter the game PIN</h2>
      <div class="lg-grid"><div class="lg-f"><label for="lg-pin">Game PIN</label><input id="lg-pin" class="lg-pinin" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="7" autocomplete="off" data-lgi="j.pin" value="${esc(JF.pin)}" placeholder="000000"></div>
      <div class="lg-f"><label for="lg-nick">Nickname</label><input id="lg-nick" type="text" maxlength="16" autocomplete="off" data-lgi="j.nick" value="${esc(JF.nick)}" placeholder="e.g. Jada R"><span class="hint">Your first name or a fun, classroom-friendly name.</span></div></div>
      <div class="lg-f"><span class="lgx-lab">Pick your avatar</span><div class="lg-avs" role="radiogroup" aria-label="Avatar">${AVS.map(a => `<button type="button" class="lg-av ${JF.av === a ? 'lgx-sel' : ''}" role="radio" aria-checked="${JF.av === a}" aria-label="Avatar ${a}" data-px="av" data-pv="${VIEW}" data-k="${a}">${a}</button>`).join('')}</div></div>
      ${JF.err ? `<p class="lg-err" role="alert">${esc(JF.err)}</p>` : ''}
      <div class="row">${BTN('pjoin', JF.busy ? 'Joining…' : '▶ Join game', 'btn gold', JF.busy ? 'disabled' : '')}</div></div>`;
  }
  function subLive() {
    if (!CAP.db || SUB.live) return;
    try {
      SUB.live = CAP.db.collection('live').where('open', '==', true).onSnapshot(s => {
        const o = []; s.docs.forEach(x => { const v = x.exists && x.data(); if (v && +v.at > Date.now() - 4 * 3600e3 && v.ph !== 'end' && /^\d{6}$/.test(String(v.pin))) o.push({ pin: String(v.pin), ti: String(v.ti || 'Live Quiz').slice(0, 60), ph: String(v.ph), pc: +v.pc || 0, at: +v.at || 0 }); });
        o.sort((a, b) => b.at - a.at); OPEN = o; const el2 = $('lg-openc'); if (el2) el2.innerHTML = openHTML();
      }, () => { });
    } catch (e) { }
  }
  function openHTML() {
    const L = OPEN.filter(x => !H || x.pin !== H.pin);
    return `<span class="kicker"><span class="lg-dot" aria-hidden="true"></span>Live now</span>${L.length ? `<div class="lg-open">${L.slice(0, 6).map(x => `<div class="lg-orow"><span><b>${esc(x.ti)}</b><br><span class="hint">PIN ${esc(pinFmt(x.pin))} · ${x.ph === 'lobby' ? 'waiting to start' : 'in progress'} · ${x.pc} player${x.pc === 1 ? '' : 's'}</span></span>${BTN('popen', 'Use this PIN', 'lg-sm lgx-go', `data-k="${esc(x.pin)}"`)}</div>`).join('')}</div>` : '<p class="hint">No live games right now. When your teacher opens one, it appears here.</p>'}`;
  }
  function soloTab() {
    const c = LG().scfg, best = LG().best;
    const bests = Object.keys(best).filter(k => bank().setBy[k]).slice(0, 8);
    return `<div class="card"><span class="kicker">Solo practice</span><h2>Play at your own pace</h2><p class="hint">Same tiles, timer and points as a live game, with power-ups and music. Works offline too.</p>
      ${srcPicker('scfg', 'scfg')}
      <div class="lg-grid">${selF('scfg', 'n', 'Number of questions', NOPTS)}${selF('scfg', 't', 'Timer', [['0', 'No timer'], ['10', '10 seconds'], ['20', '20 seconds'], ['30', '30 seconds'], ['60', '60 seconds']])}</div>
      <div class="lg-tog">${togF('scfg', 'pw', 'Power-ups')}${togF('scfg', 'music', 'Music')}</div>
      <div class="row">${BTN('sgo', '🎯 Start practice', 'btn gold')}</div>
      ${bests.length ? `<div class="lg-f"><span class="lgx-lab">Your best scores</span><div class="lg-best">${bests.map(k => `<span class="pill lgx-ok">${esc(bank().setBy[k].title.slice(0, 40))}: ${fmt(best[k])}</span>`).join('')}</div></div>` : ''}</div>`;
  }
  function hwTab() {
    if (CAP.st !== 'ready') return `<div class="card"><p class="hint">Connecting…</p></div>`;
    if (!CAP.db) return `<div class="card">${notice('Homework needs the course link', 'Quiz homework saves results for your teacher, so it needs the online course link. Open the course from the link your teacher shared, signed in. Solo practice works here.')}<div class="row">${BTN('tab', '🎯 Solo practice', 'btn go', 'data-k="solo"')}</div></div>`;
    hwSubs();
    const ids = Object.keys(HW.list).sort((a, b) => (+HW.list[b].created || 0) - (+HW.list[a].created || 0));
    if (CAP.admin) {
      if (HW.sel && hwOf(HW.sel)) return hwResultsHTML(HW.sel);
      const c = LG().hcfg; if (!c.due) c.due = nextFriday();
      let h = `<div class="card"><span class="kicker">Set quiz homework</span><h2>Assign a self-paced quiz</h2><p class="hint">Students play it on their own time before the due date. Each student's result saves for you here.</p>
        ${srcPicker('hcfg', 'hcfg')}
        <div class="lg-grid">${selF('hcfg', 'n', 'Number of questions', NOPTS.slice(0, 6).concat([['all', 'All (up to 60)']]))}${selF('hcfg', 't', 'Timer per question', [['0', 'No timer'], ['20', '20 seconds'], ['30', '30 seconds'], ['60', '60 seconds'], ['90', '90 seconds']])}${selF('hcfg', 'att', 'Attempts', [['1', '1 attempt'], ['2', '2 attempts'], ['3', '3 attempts'], ['0', 'Unlimited (best counts)']])}
        <div class="lg-f"><label for="lg-due">Due</label><input id="lg-due" type="datetime-local" data-lgi="hcfg.due" value="${esc(c.due)}"></div><div class="lg-f"><label for="lg-hcfg-title">Title (optional)</label><input id="lg-hcfg-title" type="text" maxlength="60" data-lgi="hcfg.title" value="${esc(c.title)}" placeholder="${esc(srcLabel(c, 'hcfg'))}"></div></div>
        <div class="lg-tog">${togF('hcfg', 'pw', 'Power-ups')}</div>
        ${HW.err ? `<p class="lg-err" role="alert">${esc(HW.err)}</p>` : ''}
        <div class="row">${BTN('hwnew', HW.busy ? 'Saving…' : '📚 Assign homework', 'btn gold', HW.busy ? 'disabled' : '')}</div></div>`;
      h += `<div class="card"><h2>Homework you have set</h2>${ids.length ? `<div class="lg-items">${ids.map(id => { const x = HW.list[id], rows = hwRows(id), avg = rows.length ? Math.round(rows.reduce((a, r) => a + (r.b.n ? r.b.correct / r.b.n : 0), 0) / rows.length * 100) : null, past = +x.due < Date.now(), open = x.open !== false; return `<div class="lg-item"><div class="lgx-top"><b>${esc(x.title || 'Homework')}</b><span class="lg-pill ${!open ? 'lgx-bad' : past ? 'lgx-gold' : 'lgx-ok'}">${!open ? 'Closed' : past ? 'Past due' : 'Open'}</span></div><span class="hint">Due ${esc(fmtDate(+x.due || 0))} · ${x.qm ? esc(qHwLabel(x)) + ' · ' : ''}${+x.n || 0} questions · ${rows.length} submitted${avg != null ? ' · class average ' + avg + '%' : ''}</span><div class="row">${BTN('hwsel', '📊 Results', 'lg-sm lgx-go', `data-k="${esc(id)}"`)}${BTN('hwprev', '👀 Preview', 'lg-sm', `data-k="${esc(id)}"`)}${BTN('hwtog', open ? 'Close' : 'Reopen', 'lg-sm', `data-k="${esc(id)}"`)}${HW.ask === id ? `<span class="lg-err">Delete it and its results list?</span>${BTN('hwdel', 'Yes, delete', 'lg-sm lgx-bad', `data-k="${esc(id)}"`)}${BTN('hwnoask', 'Keep', 'lg-sm')}` : BTN('hwask', 'Delete', 'lg-sm', `data-k="${esc(id)}"`)}</div></div>`; }).join('')}</div>` : '<p class="lgx-empty">No homework yet.</p>'}</div>`;
      return h;
    }
    if (!CAP.uid) return `<div class="card">${notice('Sign in to see homework', 'Open the course from the link your teacher shared, signed in, so your results can be saved.')}</div>`;
    const now = Date.now(), vis = ids.filter(id => HW.list[id].open !== false || myHw(id));
    return `<div class="card"><span class="kicker">Quiz homework</span><h2>Your homework</h2>${vis.length ? `<div class="lg-items">${vis.map(id => { const x = HW.list[id], m = myHw(id), tries = m ? +m.tries || 0 : 0, att = +x.att || 0, left = att ? Math.max(0, att - tries) : Infinity, open = x.open !== false, past = +x.due < now; return `<div class="lg-item"><div class="lgx-top"><b>${esc(x.title || 'Homework')}</b>${m ? `<span class="lg-pill lgx-ok">Done${m.best && m.best.late ? ' · late' : ''}</span>` : past ? '<span class="lg-pill lgx-bad">Past due</span>' : '<span class="lg-pill lgx-gold">To do</span>'}</div><span class="hint">Due ${esc(fmtDate(+x.due || 0))} · ${x.qm ? esc(qHwLabel(x)) + ' · ' : ''}${+x.n || 0} questions${+x.t ? ' · ' + x.t + ' s each' : ''}${att ? ' · ' + att + ' attempt' + (att === 1 ? '' : 's') : ''}</span>${m && m.best ? `<span>Best: <b>${x.qm ? esc(qUnit(x.qm, +m.best.score || 0)) : fmt(m.best.score) + ' pts'}</b> · ${+m.best.correct || 0}/${+m.best.n || 0} correct · ${tries} attempt${tries === 1 ? '' : 's'}</span>` : ''}<div class="row">${open && left > 0 ? BTN('hwplay', m ? '🔁 Try again' : '▶ Start', 'lg-sm lgx-go', `data-k="${esc(id)}"`) : `<span class="hint">${!open ? 'Closed by your teacher.' : 'No attempts left.'}</span>`}${past && open && !m ? '<span class="hint">You can still hand it in. It will be marked late.</span>' : ''}</div></div>`; }).join('')}</div>` : '<p class="lgx-empty">No homework right now. When your teacher sets a quiz, it appears here.</p>'}</div>`;
  }
  function hwResultsHTML(id) {
    const x = hwOf(id), rows = hwRows(id), B = bank(), qids = Array.isArray(x.qids) ? x.qids : [];
    const qa = qids.map((q, i) => { const got = rows.filter(r => r.b.q && q in r.b.q), p = got.length ? Math.round(got.filter(r => r.b.q[q]).length / got.length * 100) : null; return { i, q: B.byId[q], p }; }).filter(r => r.p != null).sort((a, b) => a.p - b.p);
    return `<div class="card"><div class="crumbs">${BTN('hwback', '← All homework', 'linkbtn')}<span>Due ${esc(fmtDate(+x.due || 0))}</span></div><h2>${esc(x.title || 'Homework')}</h2><p class="hint">${rows.length} student${rows.length === 1 ? '' : 's'} submitted · ${x.qm ? esc(qHwLabel(x)) + ' · ' : ''}${+x.n || 0} questions · updates live</p>
      ${rows.length ? `<div class="lg-tw"><table><thead><tr><th>#</th><th>Student</th><th class="lg-num">${x.qm ? 'Best game score' : 'Best score'}</th><th class="lg-num">Correct</th><th class="lg-num">Attempts</th><th class="lg-num">Time</th><th>Submitted</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${esc(r.name)}</td><td class="lg-num"><b>${x.qm ? esc(qUnit(x.qm, +r.b.score || 0)) : fmt(r.b.score)}</b></td><td class="lg-num">${+r.b.correct || 0}/${+r.b.n || 0} (${r.b.n ? Math.round(r.b.correct / r.b.n * 100) : 0}%)</td><td class="lg-num">${r.tries}</td><td class="lg-num">${Math.round((+r.b.ms || 0) / 1000)} s</td><td>${esc(fmtDate(+r.last.at || 0))}${r.b.late ? ' <span class="lg-pill lgx-bad">late</span>' : ''}</td></tr>`).join('')}</tbody></table></div>` : '<p class="lgx-empty">No submissions yet.</p>'}
      ${qa.length ? `<h3>Question check (hardest first)</h3><div class="lg-qa">${qa.slice(0, 12).map(r => `<div class="lgx-r"><span><b>${r.p}% correct</b> · ${esc(r.q ? (r.q.t.length > 140 ? r.q.t.slice(0, 140) + '…' : r.q.t) : '(question removed)')}${r.q ? ` <span class="hint">Answer: ${esc(r.q.a.map(k => r.q.o[k]).join(' · '))}</span>` : ''}</span><div class="lgx-bar"><i style="width:${r.p}%"></i></div></div>`).join('')}</div>` : ''}
      <div class="row">${BTN('hwcsv', '⬇ Export CSV', 'btn ghost', `data-k="${esc(id)}"`)}${BTN('hwprev', '👀 Preview', 'btn ghost', `data-k="${esc(id)}"`)}</div></div>`;
  }
  function pastTab() {
    if (!CAP.db) return `<div class="card">${notice('Past games need the course link', 'Saved live game results live in the class records of the online course.')}</div>`;
    pastSub();
    const ids = Object.keys(PAST.list).sort((a, b) => (+PAST.list[b].at || 0) - (+PAST.list[a].at || 0));
    if (PAST.sel && PAST.list[PAST.sel]) {
      const g = PAST.list[PAST.sel], pl = Array.isArray(g.pl) ? g.pl : [], qs = Array.isArray(g.qs) ? g.qs : [];
      return `<div class="card"><div class="crumbs">${BTN('pastback', '← Past games', 'linkbtn')}<span>${esc(fmtDate(+g.at || 0))}</span></div><h2>${esc(g.title || 'Live Quiz')}</h2>
        <div class="lg-tw"><table><thead><tr><th>#</th><th>Player</th><th class="lg-num">${g.qm && QMODES[g.qm] ? esc(QMODES[g.qm].name) + ' score' : 'Score'}</th><th class="lg-num">Correct</th><th class="lg-num">Best streak</th></tr></thead><tbody>${pl.map((p, i) => `<tr><td>${i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</td><td>${esc(cleanNick(p.nick))}</td><td class="lg-num"><b>${g.qm && QMODES[g.qm] ? esc(qUnit(g.qm, +p.score || 0)) : fmt(p.score)}</b></td><td class="lg-num">${+p.correct || 0}/${p.n != null ? +p.n : (+g.asked || qs.length)}</td><td class="lg-num">${+p.best || 0}</td></tr>`).join('') || '<tr><td colspan="5">No players.</td></tr>'}</tbody></table></div>
        ${qs.length ? `<h3>Question check</h3><div class="lg-qa">${qs.map((q, i) => { const p = q.of ? Math.round(q.ok / q.of * 100) : null; return p == null ? '' : `<div class="lgx-r"><span><b>Q${i + 1} · ${p}% correct</b> · ${esc(clipW(q.t, 140))}</span><div class="lgx-bar"><i style="width:${p}%"></i></div></div>`; }).join('')}</div>` : ''}
        <div class="row">${BTN('pastcsv', '⬇ Export CSV', 'btn ghost', `data-k="${esc(PAST.sel)}"`)}${PAST.ask === PAST.sel ? `<span class="lg-err">Delete these results?</span>${BTN('pastdel', 'Yes, delete', 'btn ghost', `data-k="${esc(PAST.sel)}"`)}${BTN('pastnoask', 'Keep', 'btn ghost')}` : BTN('pastask', 'Delete', 'btn ghost', `data-k="${esc(PAST.sel)}"`)}</div></div>`;
    }
    return `<div class="card"><span class="kicker">Class records</span><h2>Past live games</h2>${ids.length ? `<div class="lg-items">${ids.map(id => { const g = PAST.list[id], pl = Array.isArray(g.pl) ? g.pl : []; return `<div class="lg-item"><div class="lgx-top"><b>${esc(g.title || 'Live Quiz')}</b><span class="hint">${esc(fmtDate(+g.at || 0))}</span></div><span class="hint">${pl.length} player${pl.length === 1 ? '' : 's'} · ${g.qm && QMODES[g.qm] ? esc(QMODES[g.qm].ic + ' ' + QMODES[g.qm].name) + ' · ' + fmt(+g.asked || 0) + ' answers' : (+g.asked || +g.n || 0) + ' questions'}${pl[0] ? ' · winner ' + esc(cleanNick(pl[0].nick)) + ' (' + fmt(pl[0].score) + ')' : ''}</span><div class="row">${BTN('pastsel', 'View', 'lg-sm lgx-go', `data-k="${esc(id)}"`)}${BTN('pastcsv', '⬇ CSV', 'lg-sm', `data-k="${esc(id)}"`)}</div></div>`; }).join('')}</div>` : '<p class="lgx-empty">Results of each live game are saved here when it reaches the podium.</p>'}</div>`;
  }
  const arenaHTML = () => R ? runArena() : QR ? qArena(qc()) : H ? hostArena() : QH ? qhArena() : P ? (P.qm && !P.kicked && !P.dead ? qArena(qc()) : playerArena()) : '';
  function inner() {
    const n = Object.keys(bank().byId).length;
    let h = `<section class="hero"><span class="eyebrow">Play &amp; Compete</span><h1>Live Quiz</h1><p>Play a live quiz with the whole class on the big screen, answer on your phone, take quiz homework, practise solo, or play Quest Modes, where every correct answer powers your game. ${fmt(n)} questions from this course's own quizzes and tests.</p></section>`;
    if (CAP.st === 'ready' && !CAP.room && !CAP.db) h += notice('Playing offline', NEEDLINK + ' Solo practice works everywhere.');
    h += tabsHTML();
    const tb = curTab();
    h += tb === 'host' ? hostTab() : tb === 'join' ? joinTab() : tb === 'quest' ? questTab() : tb === 'hw' ? hwTab() : tb === 'past' ? pastTab() : soloTab();
    return h;
  }

  /* =====================================================================
     QUEST MODES: player-paced game worlds built on the same questions.
     Everyone answers at their own pace and every correct answer powers
     their game. Three worlds:
       gold  Treasure Reef     answer, then open one of three chests
       td    Reef Defenders    answer for coins, build towers, survive waves
       cafe  Snack Shack Rush  answer to restock, serve customers, upgrade
     The game server (qs*) is plain JSON. Solo practice and quest homework
     run it in this page with computer rivals; in a live class game it runs
     on the host page only, which is the only authority: phones get the
     questions without answers ('qm.pack'), send actions through their
     presence ({qa:[[seq, type, a, b], ...]}), and get back their own view
     ('qm.you') and the shared game state ('qm.state', db live/<pin>).
     ===================================================================== */
  const QCSS = `
.qm-modes{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:10px}
.qm-mode{display:flex;flex-direction:column;gap:6px;text-align:left;border:2px solid var(--line);border-radius:16px;padding:14px;background:var(--raise);color:var(--ink);font:inherit;cursor:pointer;min-width:0}
.qm-mode:hover{border-color:var(--blue)}
.qm-mode[aria-pressed="true"]{border-color:var(--gold);box-shadow:0 0 0 3px var(--gold)}
.qm-mode .qmx-ic{font-size:2rem;line-height:1}
.qm-mode b{font-family:var(--f-display);font-size:1.08rem}
.qm-mode span:not(.qmx-ic){font-size:.88rem;color:var(--muted);overflow-wrap:anywhere}
.qm-lvd{font-size:.9rem;color:var(--muted)}
.lg-arena.qmx-gold{background:radial-gradient(900px 600px at 85% -10%,#2BB5A0 0%,transparent 60%),radial-gradient(800px 600px at -10% 110%,#C98A2B 0%,transparent 55%),#0D5C63}
.lg-arena.qmx-td{background:radial-gradient(900px 600px at 90% -10%,#1E88A8 0%,transparent 60%),radial-gradient(800px 600px at -10% 110%,#16397A 0%,transparent 55%),#0A3A60}
.lg-arena.qmx-cafe{background:radial-gradient(900px 600px at 85% -10%,#F08A4B 0%,transparent 60%),radial-gradient(800px 600px at -10% 110%,#C2366B 0%,transparent 55%),#7A2848}
.qm-bub i{position:absolute;border-radius:50%;border:2px solid rgba(255,255,255,.5);opacity:.16;animation:qmRise 14s linear infinite}
@keyframes qmRise{from{transform:translateY(0)}to{transform:translateY(-110vh)}}
.qm-stats{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;flex:none}
.qm-stat{background:rgba(0,0,0,.24);border-radius:99px;padding:6px 12px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap;font-size:.95rem}
.qm-stat.qmx-hi{background:#FFD54A;color:#1B1035}
.qm-play{display:grid;grid-template-columns:minmax(0,1fr) minmax(200px,280px);gap:16px;align-items:start;flex:none}
.qm-col{display:flex;flex-direction:column;gap:clamp(10px,2vh,16px);min-width:0}
@media (max-width:820px){.qm-play{grid-template-columns:minmax(0,1fr)}}
.qm-lb{display:flex;flex-direction:column;gap:6px}
.qm-lb h3{margin:0;font-family:var(--f-display);font-size:1rem;opacity:.9}
.qm-lbr{display:grid;grid-template-columns:1.7em 1.5em minmax(0,1fr) auto;gap:8px;align-items:center;background:rgba(255,255,255,.12);border-radius:12px;padding:6px 10px;font-weight:800;font-size:.95rem}
.qm-lbr.qmx-me{background:#FFD54A;color:#1B1035}
.qm-lbr .qmx-n{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.qm-lbr .qmx-s{font-variant-numeric:tabular-nums;white-space:nowrap}
.qm-nt{display:flex;flex-direction:column;gap:6px;flex:none}
.qm-nt:empty{display:none}
.qm-nt p{margin:0;background:#FFD54A;color:#1B1035;border-radius:12px;padding:8px 12px;font-weight:800;animation:lgDrop .35s both;overflow-wrap:anywhere}
.qm-how{margin:0;padding-left:1.3em;text-align:left;display:flex;flex-direction:column;gap:4px;max-width:46ch;font-weight:700}
.qm-chests{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(8px,2vw,18px);flex:none}
.qm-chest{border:0;background:rgba(255,255,255,.12);border-radius:18px;padding:12px 6px;display:flex;flex-direction:column;align-items:center;gap:6px;color:#fff;font:800 1rem var(--f-display);position:relative;min-width:0;box-shadow:0 5px 0 rgba(0,0,0,.25);animation:lgPop .4s cubic-bezier(.2,1.5,.4,1) both;transition:transform .12s,background .2s}
button.qm-chest{cursor:pointer}
.qm-chest:nth-child(2){animation-delay:.08s}.qm-chest:nth-child(3){animation-delay:.16s}
button.qm-chest:hover{background:rgba(255,255,255,.22);transform:translateY(-3px)}
.qm-chest svg{width:min(100%,130px);height:auto;display:block;overflow:visible}
.qm-chest kbd{position:absolute;top:6px;right:8px;font:700 .72rem/1 var(--f-body);background:rgba(0,0,0,.25);border-radius:6px;padding:3px 6px}
.qm-chest .qmx-lid{transform-box:fill-box;transform-origin:0% 100%;transition:transform .5s cubic-bezier(.2,1.4,.4,1)}
.qm-chest.qmx-open .qmx-lid{transform:rotate(-28deg) translate(-2px,-4px)}
.qm-chest .qmx-glow{opacity:0;transition:opacity .4s .15s}
.qm-chest.qmx-open .qmx-glow{opacity:1}
.qm-chest.qmx-pick{box-shadow:0 0 0 4px #FFD54A,0 5px 0 rgba(0,0,0,.25);background:rgba(255,213,74,.22)}
.qm-chest.qmx-dim{opacity:.6}
.qm-chest .qmx-out{font-size:clamp(.78rem,2.6vw,1.05rem);text-align:center;overflow-wrap:anywhere;line-height:1.2;min-height:2.4em}
.qm-res{background:#fff;color:#1B1035;border-radius:16px;padding:14px 18px;font-weight:800;text-align:center;font-family:var(--f-display);font-size:clamp(1.1rem,3.6vw,1.6rem);animation:lgDrop .4s both;overflow-wrap:anywhere;flex:none}
.qm-res.qmx-bad{background:#FFD9D6}
.qm-res.qmx-good{background:#E3F8E6}
.qm-tgts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:10px;flex:none}
.qm-tgt{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:10px;align-items:center;border:0;border-radius:14px;padding:12px 14px;background:#fff;color:#1B1035;font:800 1.05rem var(--f-body);cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.25);text-align:left;position:relative}
.qm-tgt:hover{background:#FFF3C4}
.qm-tgt .lgx-e{font-size:1.5em;line-height:1}
.qm-tgt .lgx-n{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.qm-tgt kbd{position:absolute;top:-7px;left:-5px;font:700 .68rem/1 var(--f-body);background:#E8E3F3;border-radius:6px;padding:2px 5px}
.qm-map{position:relative;width:min(100%,calc(60vh*5/3),900px);margin:0 auto;aspect-ratio:5/3;border-radius:16px;overflow:hidden;box-shadow:0 6px 0 rgba(0,0,0,.25);flex:none;background:#0B3D6B}
.qm-map .qmx-slot,.qm-map canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.qm-pad{position:absolute;width:10.5%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;border:2px dashed rgba(255,255,255,.6);background:transparent;color:#fff;cursor:pointer;padding:0;min-width:28px;min-height:28px}
.qm-pad.qmx-has{border-color:transparent}
.qm-pad.qmx-sel{border:3px solid #FFD54A;box-shadow:0 0 0 3px rgba(255,213,74,.45)}
.qm-pad[disabled]{cursor:default}
.qm-pad span{position:absolute;top:-5px;left:-5px;background:#1B1035;color:#fff;border-radius:99px;min-width:18px;height:18px;font:800 .68rem/18px var(--f-body);text-align:center;padding:0 4px}
.qm-panel{background:#fff;color:#1B1035;border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;gap:10px;flex:none;animation:lgDrop .3s both}
.qm-panel b{font-family:var(--f-display)}
.qm-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:8px}
.qm-opt{display:flex;flex-direction:column;gap:2px;align-items:flex-start;text-align:left;border:2px solid #D8D1EA;border-radius:12px;padding:8px 10px;background:#F7F4FD;color:#1B1035;font:700 .95rem var(--f-body);cursor:pointer;min-width:0}
.qm-opt:hover:not([disabled]){border-color:#6A35C9}
.qm-opt[disabled]{opacity:.5;cursor:not-allowed}
.qm-opt small{font-weight:600;color:#5B4D7A;font-size:.8rem}
.qm-banner{background:rgba(0,0,0,.3);border-radius:14px;padding:10px 14px;font-weight:800;text-align:center;flex:none;display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center}
.qm-banner.qmx-ok{background:#1C7A36}.qm-banner.qmx-bad{background:#A5231B}
.qm-cust{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;flex:none}
.qm-cu{background:#fff;color:#1B1035;border-radius:14px;padding:8px 6px;display:flex;flex-direction:column;gap:6px;align-items:center;min-width:0;animation:lgPop .35s both;text-align:center}
.qm-cu .qmx-av{font-size:clamp(1.6rem,7vw,2.4rem);line-height:1}
.qm-cu .qmx-ord{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;font-weight:800;font-size:.95rem}
.qm-cu .qmx-ord span{background:#F1ECFA;border-radius:8px;padding:2px 5px;white-space:nowrap}
.qm-cu .qmx-ord span.qmx-need{background:#FFD9D6}
.qm-cu.qmx-empty{background:rgba(255,255,255,.12);color:#fff;justify-content:center;font-weight:700;font-size:.9rem;min-height:120px}
.qm-cu .lg-sm{width:100%;padding:6px 4px;border-color:#D8D1EA}
.qm-pat{width:100%;height:8px;border-radius:9px;background:#E3DEF0;overflow:hidden}
.qm-pat i{display:block;height:100%;background:#2E7D32;transition:width .25s linear}
.qm-pat.qmx-low i{background:#D7263D}
.qm-shelf{display:flex;flex-wrap:wrap;gap:6px;flex:none;justify-content:center}
.qm-it{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);border-radius:12px;padding:6px 10px;font-weight:800;min-width:0;font-size:.92rem}
.qm-it b{font-variant-numeric:tabular-nums}
.qm-it.qmx-out b{color:#FFB3B3}
.qm-it.qmx-lock{opacity:.65;border-style:dashed}
.qm-it small{opacity:.85;font-weight:700}
.qm-sw{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;flex:none}
.qm-sw div{background:rgba(255,255,255,.12);border-radius:14px;padding:12px;display:flex;flex-direction:column;gap:6px;min-width:0}
.qm-sw h3{margin:0;font-family:var(--f-display);font-size:1.05rem}
.qm-sw p{margin:0;line-height:1.45;overflow-wrap:anywhere}
@media (max-width:760px){.qm-sw{grid-template-columns:minmax(0,1fr)}}
.qh-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:clamp(12px,2vw,24px);align-items:start}
@media (max-width:820px){.qh-grid{grid-template-columns:minmax(0,1fr)}}
.qh-clock{font-family:var(--f-display);font-weight:800;font-size:clamp(2.4rem,7vw,5rem);text-align:center;line-height:1;font-variant-numeric:tabular-nums}
.qh-ev{display:flex;flex-direction:column;gap:8px}
.qh-ev p{margin:0;background:rgba(255,255,255,.12);border-radius:12px;padding:8px 12px;font-weight:700;overflow-wrap:anywhere}
.lg-row.qmx-still{animation:none}
.lg-row .lgx-sub{font-size:.65em;opacity:.75;margin-left:6px;white-space:nowrap}
.qm-prog{height:14px;border-radius:99px;background:#E3DEF0;overflow:hidden}
.qm-prog i{display:block;height:100%;background:linear-gradient(90deg,#FFD54A,#FF8A3D)}
@media (max-width:420px){#qm-score{display:none}}
@media (max-width:600px){.qm-stat{padding:5px 10px;font-size:.88rem}.qm-chest{padding:10px 4px}.qm-cu{padding:6px 4px}}
@media (prefers-reduced-motion:reduce){.qm-bub i{animation:none}}
`;
  { const qcss = document.createElement('style'); qcss.textContent = QCSS; document.head.appendChild(qcss); }

  const QMK = ['gold', 'td', 'cafe'];
  const QMODES = {
    gold: { name: 'Treasure Reef', ic: '🏝️', blurb: 'Each correct answer opens one of three treasure chests: gold, doubles, storms, crab grabs and swaps. Most gold wins.', goals: [500, 1000, 2500, 5000], goal: 1000, how: ['Answer each question at your own pace.', 'Right answer: pick one of three chests.', 'Some chests let you grab gold from another player or swap with them.'] },
    td: { name: 'Reef Defenders', ic: '🛡️', blurb: 'Answer to earn coins, build cannons, nets and catapults, and stop invaders reaching the coral reef. Waves get harder.', goals: [5, 8, 10, 15], goal: 8, how: ['Answer questions to earn coins.', 'Tap a pad on the map to build or upgrade a tower.', 'Start the next wave and protect the reef for as long as you can.'] },
    cafe: { name: 'Snack Shack Rush', ic: '🥥', blurb: 'Answer to restock your beach snack shack, serve hungry customers before they give up, and upgrade your menu. Most cash wins.', goals: [150, 300, 600, 1200], goal: 300, how: ['Answer a question to restock every dish on your menu.', 'Serve customers whose orders you have in stock.', 'Spend cash on new dishes and better prices.'] }
  };
  const QLV = { 1: ['Foundation', '🪜', 'Easier questions, a hint on every question, a gentler game and more time.'], 2: ['Core', '⚙️', 'The full question mix at a steady pace.'], 3: ['Challenge', '🚀', 'Harder and multi-select questions, no hints and a tougher game.'] };
  const QMINS = [3, 5, 7, 10, 15];
  const qLvOf = c => clamp(+c.lv || 2, 1, 3);
  const qModeOf = c => QMODES[c.mode] ? c.mode : 'gold';
  const qMins = c => QMINS.includes(+c.mins) ? +c.mins : (qLvOf(c) === 1 ? 7 : 5);
  const qGoal = c => { const M = QMODES[qModeOf(c)]; return M.goals.includes(+c.goal) ? +c.goal : M.goal; };
  const qUnit = (mode, n) => mode === 'cafe' ? '$' + fmt(n) : mode === 'td' ? fmt(n) + (Math.round(n) === 1 ? ' wave' : ' waves') : fmt(n) + ' gold';
  const qGoalTxt = (mode, g) => mode === 'td' ? 'First to survive ' + g + ' waves' : 'First to ' + qUnit(mode, g);
  const qEndTxt = (mode, end, mins, goal) => end === 'goal' ? qGoalTxt(mode, goal) : mins + ' minute game';
  const qClock = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const rnd = (a, b) => a + Math.random() * (b - a);
  const rint = (a, b) => Math.floor(rnd(a, b + 1));

  /* ---------- Reef Defenders: map, towers, invaders, a deterministic wave simulation ---------- */
  const TDP = [[-4, 10], [20, 10], [20, 46], [46, 46], [46, 14], [72, 14], [72, 46], [104, 46]];
  const TDSEG = []; let TDLEN = 0;
  for (let i = 0; i < TDP.length - 1; i++) { const [x0, y0] = TDP[i], [x1, y1] = TDP[i + 1], L = Math.abs(x1 - x0) + Math.abs(y1 - y0); TDSEG.push([x0, y0, x1, y1, TDLEN, L]); TDLEN += L; }
  function tdPos(d) { for (const [x0, y0, x1, y1, s, L] of TDSEG) if (d <= s + L) { const f = (d - s) / L; return [x0 + (x1 - x0) * f, y0 + (y1 - y0) * f]; } const e = TDP[TDP.length - 1]; return [e[0], e[1]]; }
  const TDPADS = [[10, 24], [8, 40], [33, 24], [33, 37], [59, 25], [59, 37], [86, 30], [60, 55]];
  const TT = {
    c: { name: 'Conch Cannon', ic: '💥', cost: 100, up: [90, 150], dmg: [5, 9, 14], rng: [16, 18, 21], cd: [0.8, 0.7, 0.6], tip: 'Strong single shots' },
    n: { name: 'Net Boat', ic: '🕸️', cost: 80, up: [70, 120], dmg: [1.5, 2.5, 3.5], rng: [14, 16, 18], cd: [1, 0.9, 0.8], slow: [0.45, 0.55, 0.65], tg: 3, tip: 'Slows up to 3 invaders' },
    k: { name: 'Coconut Catapult', ic: '🥥', cost: 150, up: [130, 210], dmg: [6, 10, 15], rng: [20, 22, 25], cd: [1.7, 1.5, 1.3], spl: [7, 8, 9], tip: 'Splash hits a group' }
  };
  const TTK = ['c', 'n', 'k'];
  const EN = { l: ['Lionfish', 10, 21, 1, 1], j: ['Jellyfish', 6, 30, 1, 1], s: ['Sargassum mat', 30, 13, 2, 1], b: ['Storm crab', 110, 10, 10, 4] };
  const TD_DT = 0.05, TD_START = [200, 150, 150], TD_LIVES = [20, 15, 12], TD_PERQ = [60, 50, 45], TD_NEED = [1, 2, 2];
  function tdList(w) { const n = Math.min(40, 5 + 2 * w), L = []; for (let i = 0; i < n; i++) L.push(w >= 3 && i % 4 === 3 ? 's' : w >= 2 && i % 3 === 1 ? 'j' : 'l'); if (w % 5 === 0) L.push('b'); return L; }
  function tdSim(tw, w, lv) {
    const hm = (1 + 0.3 * (w - 1) + 0.012 * (w - 1) * (w - 1)) * [0.85, 1, 1.15][lv - 1], sm = Math.min(1.4, 1 + 0.02 * (w - 1)) * [0.9, 1, 1.1][lv - 1];
    const towers = []; (tw || []).forEach((t, p) => { if (!t || !TT[t[0]] || !TDPADS[p]) return; const T = TT[t[0]], i = clamp((t[1] | 0) - 1, 0, 2); towers.push({ p, ty: t[0], x: TDPADS[p][0], y: TDPADS[p][1], dmg: T.dmg[i], r2: T.rng[i] * T.rng[i], cd: Math.round(T.cd[i] / TD_DT), k: 0, sl: T.slow ? T.slow[i] : 0, tg: T.tg || 1, sp2: T.spl ? T.spl[i] * T.spl[i] : 0 }); });
    return { w, k: 0, list: tdList(w), gap: Math.round(Math.max(0.35, 0.7 - 0.025 * w) / TD_DT), hm, sm, towers, tw: (tw || []).slice(), en: [], sp: 0, lost: 0, leak: 0, kills: 0, kc: 0, done: false, fx: [] };
  }
  function tdHit(S, e, d) { if (e.dead || e.out) return; e.hp -= d; if (e.hp <= 0) { e.dead = true; S.kills++; S.kc += EN[e.ty][3]; } }
  function tdStep(S) {
    S.k++; S.fx = [];
    while (S.sp < S.list.length && S.k >= S.sp * S.gap + 1) { const ty = S.list[S.sp++], E = EN[ty], hp = E[1] * S.hm + (ty === 'b' ? 25 * S.w : 0); S.en.push({ id: S.sp, ty, hp, mx: hp, d: 0, v: E[2] * S.sm, sl: 0, st: 0, x: TDP[0][0], y: TDP[0][1] }); }
    for (const e of S.en) { if (e.dead || e.out) continue; e.d += e.v * (e.st > 0 ? 1 - e.sl : 1) * TD_DT; if (e.st > 0 && --e.st <= 0) e.sl = 0; if (e.d >= TDLEN) { e.out = true; S.leak++; S.lost += EN[e.ty][4]; continue; } const p = tdPos(e.d); e.x = p[0]; e.y = p[1]; }
    for (const T of S.towers) {
      if (T.k > 0) { T.k--; continue; }
      const c = S.en.filter(e => !e.dead && !e.out && (e.x - T.x) * (e.x - T.x) + (e.y - T.y) * (e.y - T.y) <= T.r2).sort((a, b) => b.d - a.d || a.id - b.id);
      if (!c.length) continue;
      if (T.ty === 'n') c.slice(0, T.tg).forEach(e => { tdHit(S, e, T.dmg); e.sl = Math.max(e.sl, T.sl); e.st = Math.round(1.6 / TD_DT); S.fx.push([T.p, e.x, e.y, 'n']); });
      else if (T.ty === 'k') { const x0 = c[0].x, y0 = c[0].y; S.en.forEach(e => { if (!e.dead && !e.out && (e.x - x0) * (e.x - x0) + (e.y - y0) * (e.y - y0) <= T.sp2) tdHit(S, e, T.dmg); }); S.fx.push([T.p, x0, y0, 'k']); }
      else { tdHit(S, c[0], T.dmg); S.fx.push([T.p, c[0].x, c[0].y, 'c']); }
      T.k = T.cd - 1;
    }
    if (S.sp >= S.list.length && S.en.every(e => e.dead || e.out)) S.done = true;
  }
  function tdRun(tw, w, lv) { const S = tdSim(tw, w, lv); while (!S.done && S.k < 24000) tdStep(S); return { lost: S.lost, leak: S.leak, kills: S.kills, kc: S.kc, n: S.list.length }; }

  /* ---------- Snack Shack Rush: dishes from around the region ---------- */
  const CF = [['Coconut water', '🥥', 3, 'across the Caribbean'], ['Beef patty', '🥟', 4, 'Jamaica'], ['Sorrel', '🍹', 4, 'across the Caribbean'], ['Doubles', '🍛', 5, 'Trinidad and Tobago'], ['Fish cakes', '🐟', 5, 'Barbados'], ['Pastechi', '🥐', 6, 'Curaçao and Aruba'], ['Conch fritters', '🐚', 7, 'The Bahamas'], ['Roti', '🌯', 8, 'Guyana and Suriname']];
  const CF_UNL = [0, 0, 25, 50, 90, 140, 200, 270], CF_UP = [6, 14], CF_COOL = [40, 100], CF_RE = [4, 3, 3], CF_PAT = [55, 42, 32], CF_GAP = [[3000, 6000], [2500, 5000], [2000, 4000]];
  const cfPrice = (i, l) => Math.round(CF[i][2] * [1, 1.5, 2][clamp(l || 1, 1, 3) - 1]);
  const cfOrd = o => o.map(([i, n]) => n + ' ' + CF[i][0]).join(', ');

  /* ---------- Treasure Reef: chests ---------- */
  const CHW = { g: [46, 36, 28], G: [10, 9, 8], p: [6, 6, 5], x2: [9, 8, 7], x3: [3, 3, 3], l: [5, 10, 12], L: [0, 3, 6], tk: [7, 8, 9], sw: [3, 5, 7], n: [5, 6, 8] };
  const CHL = { g: ['💰', v => '+' + fmt(v) + ' gold'], G: ['💎', v => '+' + fmt(v) + ' gold!'], p: ['📈', () => '+15% bonus'], x2: ['✨', () => 'Double gold'], x3: ['🌟', () => 'Triple gold'], l: ['🌧️', () => 'Storm: lose 25%'], L: ['🌊', () => 'Big wave: lose 50%'], tk: ['🦀', () => 'Crab grab: take 25%'], sw: ['🔄', () => 'Swap gold'], n: ['🐚', () => 'Just shells'] };
  const QBOTN = ['Shanice', 'Dwayne', 'Keisha', 'Ravi', 'Marisol', 'Tevin', 'Anika', 'Jerome', 'Priya', 'Kofi', 'Leandra', 'Nadia', 'Ezra', 'Yolanda', 'Kareem', 'Annelise', 'Dariel', 'Sasha', 'Malik', 'Renée'];
  const QACC = [0.6, 0.72, 0.84];

  /* ---------- questions for a quest: level filter, topics, hints ---------- */
  let QTOP = null;
  function qTopics() { const B = bank(); if (QTOP && QTOP.n === B.n) return QTOP.m; const m = {}; B.sets.forEach(s => s.qs.forEach(q => { if (!m[q.id]) m[q.id] = s.title; })); QTOP = { n: B.n, m }; return m; }
  const qDiff = q => (q.k === 'ma' ? 3 : 0) + (q.k === 'tf' ? -1 : 0) + Math.max(0, q.o.length - 3) * 0.6 + Math.min(2, q.t.length / 160) + (q.o.some(x => x.length > 60) ? 0.5 : 0);
  function qLevelPool(P0, lv) {
    if (P0.length < 10 || lv === 2) return P0.slice();
    const s = P0.map(q => [q, qDiff(q)]).sort((a, b) => a[1] - b[1]);
    if (lv === 1) { let L = s.filter(x => x[0].k !== 'ma'); if (L.length < 8) L = s; return L.slice(0, Math.max(8, Math.ceil(L.length * 0.65))).map(x => x[0]); }
    return s.slice(Math.floor(s.length * 0.3)).map(x => x[0]);
  }
  function qHint(q) { if (q.k === 'tf' || q.o.length < 3) return -1; const wrong = q.o.map((_, i) => i).filter(i => !q.a.includes(i)); return wrong.length ? wrong[Math.floor(Math.random() * wrong.length)] : -1; }
  function qTag(qs, lv) { const tm = qTopics(), tp = [], ti = {}; qs.forEach(x => { const t = clipW(tm[x.id] || x.tag || 'Course questions', 60); if (!(t in ti)) { ti[t] = tp.length; tp.push(t); } x.tp = ti[t]; x.hw = lv === 1 ? qHint(x) : -1; }); return tp; }
  function qBuild(P0, lv) { const rng = RNG(rseed()), qs = shuf(qLevelPool(P0, lv), rng).slice(0, 50).map(q => prep(q, true, rng)); return { qs, tp: qTag(qs, lv) }; }

  /* ---------- the game server (plain JSON) ---------- */
  function qsNew(o) { return { v: 1, mode: o.mode, lv: o.lv, end: o.end, ms: o.ms, goal: o.goal, cap: o.end === 'goal' ? 15 * 60000 : o.ms, t: 0, ph: o.ph || 'play', qs: o.qs, tp: o.tp, players: {}, ev: [], qst: o.qs.map(() => [0, 0]), n: 0, win: '', why: '', solo: !!o.solo }; }
  function qsAdd(srv, key, nick, av, bot) {
    const lv = srv.lv, pl = { key, nick, av, bot: !!bot, join: srv.t, seq: 0, qn: 0, ok: 0, st: 0, best: 0, ms: 0, qAt: srv.t, ord: [], oi: 0, cur: 0, fb: null, hist: [], nt: [], nx: srv.t + rnd(3000, 7000) };
    if (srv.mode === 'gold') Object.assign(pl, { g: 0, off: null, res: null, tp: null, bc: '' });
    if (srv.mode === 'td') Object.assign(pl, { c: TD_START[lv - 1], hp: TD_LIVES[lv - 1], w: 0, tw: [0, 0, 0, 0, 0, 0, 0, 0], wv: null, out: false, need: 0, kills: 0 });
    if (srv.mode === 'cafe') Object.assign(pl, { cash: 0, stock: CF.map(() => 0), il: CF.map(() => 1), un: 2, cool: 0, cu: [], nxt: srv.t + 1200, cid: 0, sv: 0, lo: 0, last: null });
    if (!bot) qsNextQ(srv, pl);
    srv.players[key] = pl; return pl;
  }
  function qsNextQ(srv, pl) {
    const n = srv.qs.length; if (!n) return;
    if (pl.oi >= pl.ord.length) { const last = pl.ord[pl.ord.length - 1], o = shuf(srv.qs.map((_, i) => i), Math.random); if (n > 1 && o[0] === last) o.push(o.shift()); pl.ord = o; pl.oi = 0; }
    pl.cur = pl.ord[pl.oi++]; pl.qAt = srv.t;
  }
  const qsScore = (srv, p) => srv.mode === 'gold' ? p.g : srv.mode === 'td' ? p.w : p.cash;
  const qsRanked = srv => Object.values(srv.players).sort((a, b) => qsScore(srv, b) - qsScore(srv, a) || (srv.mode === 'td' ? b.hp - a.hp : 0) || b.ok - a.ok || a.join - b.join);
  function qsEv(srv, txt) { srv.ev.push([++srv.n, txt]); if (srv.ev.length > 14) srv.ev.shift(); }
  function qsNote(srv, pl, txt) { if (pl.bot) return; pl.nt.push([++srv.n, txt]); if (pl.nt.length > 4) pl.nt.shift(); }
  function qsRoll(srv, pl) {
    const L = Object.keys(CHW), tot = L.reduce((a, k) => a + CHW[k][srv.lv - 1], 0); let r = Math.random() * tot, k = 'g';
    for (const kk of L) { r -= CHW[kk][srv.lv - 1]; if (r < 0) { k = kk; break; } }
    const mult = Math.min(5, 1 + 0.25 * Math.floor(pl.ok / 3));
    const v = k === 'g' ? Math.round([10, 15, 20, 25, 30, 40, 50][rint(0, 6)] * mult / 5) * 5 : k === 'G' ? Math.round([60, 75, 100][rint(0, 2)] * mult / 5) * 5 : k === 'L' ? 50 : k === 'p' ? 15 : 25;
    return [k, v];
  }
  function qsPick(srv, pl, i, dirty) {
    const off = pl.off; if (!off || !(i >= 0 && i < 3)) return false;
    const [k, v] = off.ch[i], g0 = pl.g;
    let d = k === 'g' || k === 'G' ? v : k === 'p' ? Math.max(5, Math.round(g0 * 0.15)) : k === 'x2' ? g0 : k === 'x3' ? g0 * 2 : k === 'l' ? -Math.round(g0 * 0.25) : k === 'L' ? -Math.round(g0 * 0.5) : 0;
    pl.off = null; pl.res = { id: off.id, pick: i, ch: off.ch, k, v, d, who: '' };
    if (k === 'tk' || k === 'sw') {
      const others = Object.values(srv.players).filter(p => p.key !== pl.key);
      if (!others.length) { pl.res.d = 20; pl.g += 20; return true; }
      if (pl.bot) { const rich = others.slice().sort((a, b) => b.g - a.g)[0], t = Math.random() < 0.5 ? rich : others[rint(0, others.length - 1)]; pl.tp = { k, keys: [t.key] }; qsTarget(srv, pl, 0, dirty); return true; }
      pl.tp = { k, keys: qsRanked(srv).filter(x => x.key !== pl.key).slice(0, 8).map(x => x.key) }; return true;
    }
    pl.g = Math.max(0, g0 + d);
    if (['x3', 'x2', 'G'].includes(k) && d > 0) { const rk = { x3: 3, x2: 2, G: 1 }; if (!pl.bc || rk[k] > (rk[pl.bc] || 0)) pl.bc = k; }
    if ((k === 'x3' || k === 'L') && Math.abs(d) >= 20) qsEv(srv, `${pl.av} ${pl.nick} ${k === 'x3' ? 'tripled their gold' : 'lost half their gold to a big wave'}!`);
    return true;
  }
  function qsTarget(srv, pl, h, dirty) {
    const tp = pl.tp, key = tp && tp.keys[h | 0], t = key && srv.players[key]; if (!t || t.key === pl.key) return false;
    if (tp.k === 'tk') { const amt = Math.round(t.g * 0.25); t.g -= amt; pl.g += amt; pl.res.d = amt; qsNote(srv, t, `🦀 ${pl.nick} grabbed ${fmt(amt)} gold from you!`); qsEv(srv, `🦀 ${pl.av} ${pl.nick} grabbed ${fmt(amt)} gold from ${t.av} ${t.nick}`); }
    else { const a = pl.g; pl.g = t.g; t.g = a; pl.res.d = pl.g - a; qsNote(srv, t, `🔄 ${pl.nick} swapped gold with you! You now have ${fmt(t.g)}.`); qsEv(srv, `🔄 ${pl.av} ${pl.nick} swapped gold with ${t.av} ${t.nick}`); }
    pl.res.who = t.nick; pl.tp = null; if (dirty) dirty.add(t.key); return true;
  }
  function qsAnswer(srv, pl, q, c) {
    if ((srv.mode === 'gold' && (pl.off || pl.tp)) || (srv.mode === 'td' && pl.out)) return false;
    const Q = srv.qs[q]; if (!Q || q !== pl.cur) return false;
    const v = validChoice(c, Q); if (!v) return false;
    const ok = same(v, Q.a); let g = 0;
    pl.qn++; pl.ms += Math.max(0, srv.t - pl.qAt); srv.qst[q][1]++; if (ok) srv.qst[q][0]++;
    pl.hist.push([q, ok ? 1 : 0]); if (pl.hist.length > 400) pl.hist.shift();
    if (ok) {
      pl.ok++; pl.st++; pl.best = Math.max(pl.best, pl.st);
      if (srv.mode === 'gold') pl.off = { id: ++srv.n, ch: [qsRoll(srv, pl), qsRoll(srv, pl), qsRoll(srv, pl)] };
      if (srv.mode === 'td') { g = TD_PERQ[srv.lv - 1] + (pl.st >= 3 ? 10 : 0); pl.c += g; }
      if (srv.mode === 'cafe') { g = CF_RE[srv.lv - 1] + pl.cool; for (let i = 0; i < pl.un; i++) pl.stock[i] += g; }
      if (pl.st > 0 && pl.st % 5 === 0) qsEv(srv, `🔥 ${pl.av} ${pl.nick} is on a run of ${pl.st} correct answers`);
    } else pl.st = 0;
    if (srv.mode === 'td') pl.need = Math.max(0, pl.need - 1);
    pl.fb = { s: pl.seq, q, c: v, ok: ok ? 1 : 0, a: Q.a.slice(), w: Q.why || '', g };
    qsNextQ(srv, pl); return true;
  }
  function qsBuild(srv, pl, pad, ty) { if (pl.out || !(pad >= 0 && pad < TDPADS.length) || pl.tw[pad] || !TT[ty]) return false; const c = TT[ty].cost; if (pl.c < c) return false; pl.c -= c; pl.tw[pad] = [ty, 1, c]; return true; }
  function qsUp(srv, pl, pad) { const t = pl.tw[pad]; if (pl.out || !t || t[1] >= 3) return false; const c = TT[t[0]].up[t[1] - 1]; if (pl.c < c) return false; pl.c -= c; t[1]++; t[2] += c; return true; }
  function qsSell(srv, pl, pad) { const t = pl.tw[pad]; if (pl.out || !t) return false; pl.c += Math.floor(t[2] * 0.6); pl.tw[pad] = 0; return true; }
  function qsWave(srv, pl) {
    if (pl.out || pl.need > 0) return false;
    const w = pl.w + 1, r = tdRun(pl.tw, w, srv.lv);
    pl.hp = Math.max(0, pl.hp - r.lost); pl.c += r.kc; pl.kills += r.kills;
    pl.wv = { id: ++srv.n, w, lost: r.lost, leak: r.leak, kills: r.kills, kc: r.kc, n: r.n, hp: pl.hp, ok: pl.hp > 0 ? 1 : 0 };
    if (pl.hp > 0) { pl.w = w; pl.need = TD_NEED[srv.lv - 1]; if (w % 5 === 0) qsEv(srv, `🛡️ ${pl.av} ${pl.nick} held off wave ${w}`); }
    else { pl.out = true; pl.outAt = srv.t; qsEv(srv, `🌊 ${pl.av} ${pl.nick}'s reef was overrun on wave ${w}`); }
    return true;
  }
  function qsServe(srv, pl, id) {
    const k = pl.cu.findIndex(c => c.id === id); if (k < 0) return false; const cu = pl.cu[k];
    if (!cu.o.every(([i, n]) => pl.stock[i] >= n)) return false;
    let pay = 0; cu.o.forEach(([i, n]) => { pl.stock[i] -= n; pay += cfPrice(i, pl.il[i]) * n; });
    const tip = srv.t - cu.at < (cu.dl - cu.at) * 0.5 ? Math.max(1, Math.round(pay * 0.25)) : 0;
    pl.cash += pay + tip; pl.sv++; pl.cu.splice(k, 1); pl.nxt = Math.max(pl.nxt, srv.t + rnd(...CF_GAP[srv.lv - 1]) * 0.6); pl.last = { id: ++srv.n, pay, tip };
    if (pl.sv % 10 === 0) qsEv(srv, `🥥 ${pl.av} ${pl.nick} has served ${pl.sv} customers`);
    return true;
  }
  function qsBuy(srv, pl, id) {
    let cost = 0;
    if (id === 'un') { if (pl.un >= CF.length) return false; cost = CF_UNL[pl.un]; if (pl.cash < cost) return false; pl.cash -= cost; pl.un++; return true; }
    if (id === 'cool') { if (pl.cool >= CF_COOL.length) return false; cost = CF_COOL[pl.cool]; if (pl.cash < cost) return false; pl.cash -= cost; pl.cool++; return true; }
    const m = /^i([0-7])$/.exec(String(id)); if (!m) return false; const i = +m[1];
    if (i >= pl.un || pl.il[i] >= 3) return false; cost = CF[i][2] * CF_UP[pl.il[i] - 1]; if (pl.cash < cost) return false; pl.cash -= cost; pl.il[i]++; return true;
  }
  function cfCust(srv, pl) {
    const lv = srv.lv, k = Math.min(pl.un, 1 + (pl.un >= 3 && Math.random() < 0.5 ? 1 : 0) + (pl.un >= 5 && Math.random() < 0.3 ? 1 : 0));
    const o = shuf(Array.from({ length: pl.un }, (_, i) => i), Math.random).slice(0, k).sort((a, b) => a - b).map(i => [i, rint(1, lv === 3 ? 3 : 2)]);
    const units = o.reduce((a, x) => a + x[1], 0), pat = (CF_PAT[lv - 1] + 4 * units) * 1000;
    pl.cu.push({ id: ++pl.cid, av: rint(0, AVS.length - 1), o, at: srv.t, dl: srv.t + pat });
  }
  function qsAct(srv, key, act, dirty) {
    if (srv.ph !== 'play') return false;
    const pl = srv.players[key]; if (!pl || pl.bot || !Array.isArray(act)) return false;
    const [seq, ty, a1, a2] = act; if (!(seq > pl.seq)) return false; pl.seq = seq;
    let ok = false;
    if (ty === 'a') ok = qsAnswer(srv, pl, a1, a2);
    else if (srv.mode === 'gold' && ty === 'c') ok = qsPick(srv, pl, a1, dirty);
    else if (srv.mode === 'gold' && ty === 't') ok = qsTarget(srv, pl, a1, dirty);
    else if (srv.mode === 'td' && ty === 'b') ok = qsBuild(srv, pl, a1, a2);
    else if (srv.mode === 'td' && ty === 'u') ok = qsUp(srv, pl, a1);
    else if (srv.mode === 'td' && ty === 'x') ok = qsSell(srv, pl, a1);
    else if (srv.mode === 'td' && ty === 'w') ok = qsWave(srv, pl);
    else if (srv.mode === 'cafe' && ty === 's') ok = qsServe(srv, pl, a1);
    else if (srv.mode === 'cafe' && ty === 'p') ok = qsBuy(srv, pl, a1);
    if (dirty) dirty.add(key);
    qsCheck(srv); return ok;
  }
  function qsEnd(srv, why, key) { if (srv.ph === 'end') return; srv.ph = 'end'; srv.why = why; srv.win = key || ((qsRanked(srv)[0] || {}).key || ''); }
  function qsCheck(srv) {
    if (srv.ph !== 'play') return;
    if (srv.t >= srv.cap) { qsEnd(srv, 'time'); return; }
    const L = Object.values(srv.players), hum = L.filter(p => !p.bot);
    if (srv.end === 'goal') { const w = qsRanked(srv).find(p => (!srv.solo || !p.bot) && qsScore(srv, p) >= srv.goal); if (w) { qsEnd(srv, 'goal', w.key); return; } }
    if (srv.mode === 'td' && hum.length && hum.every(p => p.out) && srv.t - Math.max(...hum.map(p => p.outAt || 0)) > 9000) qsEnd(srv, 'out');
  }
  function qsTick(srv, dt, dirty) {
    if (srv.ph !== 'play') return;
    srv.t += dt; const lv = srv.lv;
    Object.values(srv.players).forEach(pl => {
      if (pl.bot) {
        if (!srv.solo || srv.t < pl.nx) return;
        const acc = QACC[lv - 1];
        if (srv.mode === 'gold') { pl.nx = srv.t + rnd(4000, 9000) * [1.15, 1, 0.85][lv - 1]; pl.qn++; if (Math.random() < acc) { pl.ok++; pl.off = { id: ++srv.n, ch: [qsRoll(srv, pl), qsRoll(srv, pl), qsRoll(srv, pl)] }; qsPick(srv, pl, rint(0, 2), dirty); } }
        else if (srv.mode === 'td') { pl.nx = srv.t + rnd(17000, 28000); if (pl.out) return; pl.qn += 2; pl.ok += Math.random() < acc ? 2 : 1; if (Math.random() < Math.max(0, (pl.w - 3) * 0.07) * [1.3, 1, 0.75][lv - 1]) { pl.out = true; pl.hp = 0; } else pl.w++; }
        else { pl.nx = srv.t + rnd(3500, 8000); pl.qn++; if (Math.random() < acc) pl.ok++; pl.cash += Math.round((3 + srv.t / 60000 * 3) * rnd(0.6, 1.5) * acc * 1.3); pl.sv++; }
        return;
      }
      if (srv.mode === 'cafe') {
        let ch = false;
        pl.cu = pl.cu.filter(c => { if (srv.t >= c.dl) { pl.lo++; ch = true; return false; } return true; });
        if (pl.cu.length < 3 && srv.t >= pl.nxt) { cfCust(srv, pl); pl.nxt = srv.t + rnd(...CF_GAP[lv - 1]); ch = true; }
        if (ch && dirty) dirty.add(pl.key);
      }
    });
    qsCheck(srv);
  }
  function qsFin(srv, p) {
    const T = {}; p.hist.forEach(([q, ok]) => { const t = srv.qs[q] ? srv.qs[q].tp : 0, x = T[t] = T[t] || [0, 0]; x[1]++; x[0] += ok; });
    const miss = []; for (let i = p.hist.length - 1; i >= 0 && miss.length < 4; i--) { const [q, ok] = p.hist[i]; if (!ok && !miss.some(m => m[0] === q) && srv.qs[q]) miss.push([q, srv.qs[q].a.slice(), clipW(srv.qs[q].why || '', 200)]); }
    const r = qsRanked(srv);
    return { tps: Object.keys(T).map(t => [+t, T[t][0], T[t][1]]), miss, rk: r.indexOf(p) + 1, of: r.length, why: srv.why, win: srv.win === p.key ? 1 : 0, wn: (srv.players[srv.win] || {}).nick || '', x: { bc: p.bc || '', kills: p.kills || 0, sv: p.sv || 0, lo: p.lo || 0 } };
  }
  function qsView(srv, key) {
    const p = srv.players[key]; if (!p) return null;
    const v = { s: p.seq, cq: p.cur, qn: p.qn, ok: p.ok, st: p.st, best: p.best, sc: qsScore(srv, p), nk: p.nick, nt: p.nt.slice(-3) };
    if (p.fb) v.fb = p.fb;
    if (srv.mode === 'gold') { v.g = p.g; if (p.off) v.off = { id: p.off.id }; if (p.res) v.res = p.res; if (p.tp) v.tp = { k: p.tp.k, L: p.tp.keys.map((k, i) => { const t = srv.players[k]; return t ? [i, t.nick, t.av, t.g] : null; }).filter(Boolean) }; }
    if (srv.mode === 'td') { v.c = p.c; v.hp = p.hp; v.w = p.w; v.tw = p.tw; if (p.wv) v.wv = p.wv; v.out = p.out ? 1 : 0; v.need = p.need; v.kills = p.kills; }
    if (srv.mode === 'cafe') { v.cash = p.cash; v.stock = p.stock; v.il = p.il; v.un = p.un; v.cool = p.cool; v.cu = p.cu.map(c => [c.id, c.av, c.o, Math.max(0, c.dl - srv.t), c.dl - c.at]); v.sv = p.sv; v.lo = p.lo; if (p.last) v.last = p.last; }
    if (srv.ph === 'end') v.fin = qsFin(srv, p);
    return v;
  }

  /* ---------- shared client state: solo / homework (QR) and phones in a live game (P.qm) ---------- */
  let QR = null, QSIG = '';
  const qUi = mode => ({ scr: mode === 'td' ? 'game' : 'q', ackS: 0, sel: [], hide: [], hq: -1, hint: false, pad: -1, anim: null, resAck: 0, shop: false, ask: false, seen: {}, nts: [], fsTried: false });
  const qActive = () => !!(QR || QH || (P && P.qm && !P.kicked && !P.dead));
  function qc() {
    const now = Date.now();
    if (QR) {
      const s = QR.srv, v = qsView(s, 'me'), r = qsRanked(s);
      return { live: false, mode: s.mode, lv: s.lv, ph: QR.ph === 'ready' ? 'ready' : QR.ph === 'done' ? 'end' : s.ph, qs: s.qs, tp: s.tp, v, end: s.end, goal: s.goal, mins: Math.round(s.ms / 60000), left: Math.max(0, s.cap - s.t), top: r.map(p => [p.nick, p.av, qsScore(s, p), p.key === 'me' ? 1 : 0]), rk: r.findIndex(p => p.key === 'me') + 1, of: r.length, pz: false, ui: QR.ui, title: QR.title, pending: null, av: s.players.me.av, cuAt: now, rivals: r.length - 1 };
    }
    if (P && P.qm) {
      const Q = P.qm, d = Q.st, nk = Q.view ? Q.view.nk : P.nick;
      return { live: true, mode: d.qm, lv: d.lv, ph: d.ph, qs: Q.pack ? Q.pack.qs : null, tp: Q.pack ? Q.pack.tp : [], v: Q.view, end: d.end, goal: d.goal, mins: d.mins, left: d.pz ? (Q.frozen || 0) : Math.max(0, Q.deadline - now), top: (d.top || []).map(x => [x[0], x[1], x[0] === nk && Q.view ? Q.view.sc : x[2], x[0] === nk ? 1 : 0]), rk: Q.rk, of: d.of || 0, pz: !!d.pz, ui: Q.ui, title: d.ti, pending: Q.pending, av: P.av, cuAt: Q.viewAt || now, rivals: 0 };
    }
    return null;
  }
  function qSig(c) {
    const v = c.v || {}, u = c.ui;
    return [c.mode, c.ph, u.scr, u.ask ? 1 : 0, c.pending ? 1 : 0, c.qs ? 1 : 0, c.v ? 1 : 0, v.cq, v.fb ? v.fb.s : 0, u.ackS, v.off ? v.off.id : 0, v.res ? v.res.id : 0, u.resAck, v.tp ? 1 : 0, u.pad, v.tw ? JSON.stringify(v.tw) : '', v.wv ? v.wv.id : 0, u.anim ? (u.anim.done ? 2 : 1) : 0, u.wvAck || 0, v.c, v.hp, v.out, v.need, v.cu ? v.cu.map(x => x[0]).join(',') : '', v.stock ? v.stock.join(',') : '', v.un, v.il ? v.il.join('') : '', v.cool, v.cash, u.shop ? 1 : 0, c.pz ? 1 : 0, u.sel.join(''), u.hide.join(''), P && P.ask ? 1 : 0, v.fin ? 1 : 0, QR ? (QR.posting ? 1 : 0) + (QR.posted ? 2 : 0) + (QR.postErr ? 4 : 0) : 0].join('|');
  }
  /* sounds and screen-reader announcements for what just changed */
  function qEvents(c) {
    const v = c.v, u = c.ui, sn = u.seen; if (!v) return;
    const init = !sn.init; sn.init = true;
    if (init) { if (v.fb) u.ackS = Math.max(u.ackS, v.fb.s); if (v.res) u.resAck = v.res.id; if (v.wv) u.wvAck = v.wv.id; }
    if (v.fb && v.fb.s !== sn.fb) { sn.fb = v.fb.s; if (!init) { const q = c.qs && c.qs[v.fb.q]; sfx(v.fb.ok ? 'ok' : 'bad'); vib(v.fb.ok ? 25 : [40, 60, 40]); say(v.fb.ok ? (c.mode === 'gold' ? 'Correct! Pick a treasure chest.' : c.mode === 'td' ? `Correct! Plus ${v.fb.g} coins.` : `Correct! Every dish restocked by ${v.fb.g}.`) : 'Not quite. The answer is ' + (q ? v.fb.a.map(i => q.o[i]).join(', ') : '') + '.'); } }
    if (v.res && !v.tp && v.res.id !== sn.res) { sn.res = v.res.id; if (!init) { const r = v.res; qsfx(r.d > 0 ? (['x2', 'x3', 'G'].includes(r.k) || r.d >= 100 ? 'big' : r.k === 'tk' || r.k === 'sw' ? 'swap' : 'coin') : r.d < 0 ? 'lose' : 'chest'); say(qResLine(r)); } }
    (v.nt || []).forEach(([id, txt]) => { if (id > (sn.nt || 0)) { sn.nt = id; if (!init) { u.nts.push([id, txt, Date.now()]); if (u.nts.length > 3) u.nts.shift(); qsfx('alert'); vib([30, 40, 30]); say(txt); } } });
    if (v.wv && v.wv.id !== sn.wv) { sn.wv = v.wv.id; if (!init) qAnimStart(c); else u.wvAck = v.wv.id; }
    if (v.cu) { const ids = v.cu.map(x => x[0]), prev = sn.cu || []; if (!init && ids.some(id => !prev.includes(id))) { qsfx('bell'); say('A new customer is waiting.'); } sn.cu = ids; }
    if (v.lo != null) { if (!init && v.lo > (sn.lo || 0)) { qsfx('gone'); say('A customer gave up waiting.'); } sn.lo = v.lo; }
    if (v.last && v.last.id !== sn.last) { sn.last = v.last.id; if (!init) { qsfx('serve'); say(`Served. Plus $${v.last.pay + v.last.tip}${v.last.tip ? ' including a tip' : ''}.`); } }
  }
  function qRefresh() {
    if (!API || !API.S.loc || API.S.loc.v !== VIEW) return;
    const c = qc(); if (!c) return; qEvents(c);
    const sig = qSig(c);
    if (sig !== QSIG) paint(); else qPartial(c);
  }
  function say(msg) { const el = qSr(); el.textContent = ''; setTimeout(() => { el.textContent = String(msg || ''); }, 60); }
  let QSR = null;
  function qSr() { if (!QSR) { QSR = document.createElement('div'); QSR.id = 'qm-sr'; QSR.className = 'sr'; QSR.setAttribute('role', 'status'); QSR.setAttribute('aria-live', 'polite'); QSR.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;left:0;top:0'; } return QSR; }
  function qsfx(kind) {
    const c = ac(); if (!c) return; const t = c.currentTime + 0.01;
    try {
      switch (kind) {
        case 'coin': pan(NOTE(88), t, 0.12, 0.14); pan(NOTE(93), t + 0.07, 0.3, 0.14); break;
        case 'chest': noise(t, 0.18, 0.06, 900); osc(NOTE(55), t, 0.18, 'triangle', 0.12); [76, 79, 84].forEach((n, i) => pan(NOTE(n), t + 0.16 + i * 0.05, 0.3, 0.1)); break;
        case 'big': kick(t, 0.4); [72, 76, 79, 84, 88, 91].forEach((n, i) => pan(NOTE(n), t + i * 0.06, 0.4, 0.13)); break;
        case 'lose': [64, 59, 55].forEach((n, i) => osc(NOTE(n), t + i * 0.15, 0.22, 'sawtooth', 0.07)); break;
        case 'swap': for (let i = 0; i < 6; i++) osc(NOTE(70 + i * 3), t + i * 0.035, 0.08, 'square', 0.04); noise(t, 0.25, 0.05, 3000); break;
        case 'alert': osc(NOTE(81), t, 0.1, 'square', 0.06); osc(NOTE(77), t + 0.12, 0.16, 'square', 0.06); break;
        case 'build': kick(t, 0.35); osc(NOTE(60), t, 0.12, 'square', 0.06); pan(NOTE(84), t + 0.06, 0.25, 0.1); break;
        case 'wave': for (let i = 0; i < 4; i++) kick(t + i * 0.18, 0.4); pan(NOTE(67), t + 0.72, 0.4, 0.12); break;
        case 'leak': osc(110, t, 0.2, 'sawtooth', 0.06); break;
        case 'clear': [72, 76, 79, 84].forEach((n, i) => pan(NOTE(n), t + i * 0.08, 0.45, 0.15)); break;
        case 'bell': pan(NOTE(91), t, 0.6, 0.11); pan(NOTE(96), t + 0.1, 0.5, 0.08); break;
        case 'serve': osc(NOTE(84), t, 0.06, 'square', 0.05); pan(NOTE(96), t + 0.05, 0.5, 0.14); noise(t, 0.05, 0.05, 5000); break;
        case 'gone': osc(NOTE(67), t, 0.15, 'triangle', 0.1); osc(NOTE(62), t + 0.14, 0.3, 'triangle', 0.1); break;
        case 'buy': [79, 83, 86].forEach((n, i) => pan(NOTE(n), t + i * 0.06, 0.3, 0.12)); break;
      }
    } catch (e) { }
  }
  function qFs() { const el = $('lg-portal'); try { if (!document.fullscreenElement && el && el.requestFullscreen && document.fullscreenEnabled !== false) { const pr = el.requestFullscreen(); if (pr && pr.catch) pr.catch(() => { }); } } catch (e) { } }

  /* actions from the player: applied at once in solo, sent through presence in a live game */
  function qSend(ty, a1, a2) {
    if (QR) { if (QR.ph !== 'play') return; qsAct(QR.srv, 'me', [++QR.seq, ty, a1 == null ? 0 : a1, a2 == null ? 0 : a2], null); if (QR.srv.ph === 'end') { qSoloEnd(); return; } qRefresh(); return; }
    if (!P || !P.qm || !P.room) return; const Q = P.qm;
    if (Q.pending || !Q.view || Q.st.ph !== 'play' || Q.st.pz) return;
    const seq = ++Q.seq; Q.acts.push([seq, ty, a1 == null ? 0 : a1, a2 == null ? 0 : a2]); if (Q.acts.length > 8) Q.acts.shift();
    P.room.presence({ qa: Q.acts }).catch(() => { });
    Q.pending = { seq, ty, at: Date.now() }; paint();
  }

  /* ---------- solo practice and quest homework ---------- */
  function qSoloStart(o) {
    if (!o.qs.length) { flash('No questions to play.'); return; }
    const srv = qsNew({ mode: o.mode, lv: o.lv, end: o.end, ms: o.mins * 60000, goal: o.goal, qs: o.qs, tp: o.tp, ph: 'play', solo: true });
    const g = LG(), nick = cleanNick(g.nick || String(API.S.name || '').split(' ')[0] || '') || 'You', av = cleanAv(g.av || AVS[0]);
    qsAdd(srv, 'me', nick.length >= 2 ? nick : 'You', av, false);
    const avs = shuf(AVS.filter(a => a !== av), Math.random);
    shuf(QBOTN, Math.random).slice(0, o.mode === 'gold' ? 4 : 3).forEach((n, i) => qsAdd(srv, 'b' + i, n, avs[i], true));
    QR = { srv, ph: 'ready', mode: o.mode, title: o.title, hw: o.hw || '', kind: o.hw ? (o.prev ? 'prev' : 'hw') : 'solo', music: o.music !== false, seq: 0, last: 0, ui: qUi(o.mode), src: o.src || null };
    sfx('go'); paint();
  }
  function qSoloFromCfg() {
    const c = LG().qcfg, P0 = poolOf(c, 'qcfg'); if (!P0.length) { HS.qerr = 'Choose a question source that has questions first.'; paint(); return; }
    const lv = qLvOf(c), mode = qModeOf(c), pk = qBuild(P0, lv);
    HS.qerr = ''; qSoloStart({ mode, lv, end: c.end === 'goal' ? 'goal' : 'time', mins: qMins(c), goal: qGoal(c), qs: pk.qs, tp: pk.tp, title: QMODES[mode].name, music: c.music !== false, src: { c: JSON.parse(JSON.stringify(c)) } });
  }
  function qHwStart(h, id, preview, qs) {
    const lv = clamp(+h.lv || 2, 1, 3), mode = QMODES[h.qm] ? h.qm : 'gold', tp = qTag(qs, lv);
    qSoloStart({ mode, lv, end: h.end === 'goal' ? 'goal' : 'time', mins: QMINS.includes(+h.mins) ? +h.mins : 5, goal: QMODES[mode].goals.includes(+h.goal) ? +h.goal : QMODES[mode].goal, qs, tp, title: String(h.title || QMODES[mode].name).slice(0, 60), hw: id, prev: preview, music: LG().qcfg.music !== false });
  }
  function qRunTick(now) {
    if (!QR || QR.ph !== 'play') { if (QR) QR.last = now; return; }
    const dt = Math.min(1000, Math.max(0, now - (QR.last || now))); QR.last = now;
    const inView = API && API.S.loc && API.S.loc.v === VIEW;
    if (!inView || document.hidden || QR.ui.ask) return;
    qsTick(QR.srv, dt, null);
    if (QR.srv.ph === 'end') { qSoloEnd(); return; }
    qRefresh();
  }
  function qSoloEnd() {
    const R0 = QR, srv = R0.srv, me = srv.players.me; if (R0.ph === 'done') return;
    R0.ph = 'done'; stopMusic(); const a = R0.ui.anim; if (a) a.done = true;
    const r = qsRanked(srv), rk = r.indexOf(me) + 1, sc = qsScore(srv, me);
    sfx(rk === 1 ? 'fanfare' : 'board'); if (rk === 1) setTimeout(() => confetti(4000), 200);
    const g = LG(), bk = srv.mode + srv.lv; g.qbest = g.qbest && typeof g.qbest === 'object' ? g.qbest : {};
    R0.pb = R0.kind === 'solo' && me.qn > 0 && (!(bk in g.qbest) || sc > g.qbest[bk]); if (R0.pb) g.qbest[bk] = sc; g.plays = (g.plays || 0) + 1;
    try { API.save(); } catch (e) { }
    R0.coins = R0.kind !== 'prev' && me.ok > 0 ? Math.max(2, me.ok * 2) : 0;
    if (R0.kind !== 'prev' && me.qn) {
      const d = { kind: 'game', id: 'quest-' + srv.mode + (R0.hw ? '-' + R0.hw : ''), title: 'Quest Modes: ' + QMODES[srv.mode].name + ' (' + QLV[srv.lv][0] + ')' + (R0.hw ? ' · ' + R0.title : ''), score: me.ok, max: me.qn, level: srv.lv, secs: Math.round(srv.t / 1000), loc: { v: VIEW, tab: R0.hw ? 'hw' : 'quest' } };
      try { window.dispatchEvent(new CustomEvent('course:result', { detail: d })); } catch (e) { }
      R0.saved = !!d.saved;
    }
    say(`Game over. You finished ${ord(rk)} of ${r.length} with ${qUnit(srv.mode, sc)}.`);
    if (R0.kind === 'hw') qHwSubmit(R0);
    paint();
  }
  async function qHwSubmit(R0) {
    if (!R0 || R0.kind !== 'hw') return;
    if (!CAP.db || !CAP.uid) { R0.postErr = 'Sign in through the course link to save homework.'; if (QR === R0) paint(); return; }
    const srv = R0.srv, me = srv.players.me, h = hwOf(R0.hw) || {}, now = Date.now(), r = qsRanked(srv);
    const res = { score: qsScore(srv, me), correct: me.ok, n: me.qn, ms: Math.round(me.ms), at: now, late: !!(h.due && now > h.due), q: {}, qm: srv.mode, lv: srv.lv, rk: r.indexOf(me) + 1 };
    me.hist.forEach(([q, ok]) => { const Q = srv.qs[q]; if (Q) res.q[Q.id] = ok ? 1 : 0; });
    R0.posting = true; R0.postErr = ''; if (QR === R0) paint();
    let body = HW.mine ? JSON.parse(JSON.stringify(HW.mine)) : {};
    try { const snap = await CAP.db.doc('hwres/' + CAP.uid).get(); body = snap && snap.exists ? JSON.parse(JSON.stringify(snap.data())) : {}; } catch (e) { }
    body.nick = cleanNick(LG().nick || String(API.S.name || '').split(' ')[0] || '') || 'Student'; body.hw = body.hw && typeof body.hw === 'object' ? body.hw : {};
    const cur = body.hw[R0.hw] && typeof body.hw[R0.hw] === 'object' ? body.hw[R0.hw] : { tries: 0 };
    cur.tries = (+cur.tries || 0) + 1; cur.last = res; if (!cur.first) cur.first = res; if (!cur.best || res.score > (+cur.best.score || 0)) cur.best = res;
    body.hw[R0.hw] = cur; body.at = now;
    try { await CAP.db.doc('hwres/' + CAP.uid).set(body); R0.posted = true; HW.mine = body; }
    catch (e) { R0.postErr = e && e.code === 'invalid_argument' ? 'Your account can see the course but cannot save homework. Ask your teacher to share the course with you as a Contributor.' : e && e.code === 'quota_exceeded' ? 'The class database is full. Tell your teacher.' : 'Your result did not save. Check your connection and tap Try again.'; }
    R0.posting = false; if (QR === R0) paint();
  }
  function qClose() { if (!QR) return; const R0 = QR; if (R0.coins) { const n = R0.coins; R0.coins = 0; setTimeout(() => { try { API.reward(n, R0.kind === 'hw' ? '📚 Quest homework' : '⚔️ Quest Modes'); } catch (e) { } }, 250); } QR = null; QSIG = ''; stopMusic(); TAB = R0.hw ? 'hw' : 'quest'; }
  async function qHwCreate() {
    if (!CAP.db || !CAP.admin || HW.busy) return;
    const c = LG().qcfg, P0 = poolOf(c, 'qcfg'); if (!P0.length) { HW.qerr = 'Choose a question source that has questions first.'; paint(); return; }
    if (!c.due) c.due = nextFriday(); const due = new Date(c.due).getTime(); if (!isFinite(due)) { HW.qerr = 'Pick a due date and time.'; paint(); return; }
    const lv = qLvOf(c), mode = qModeOf(c), qs = shuf(qLevelPool(P0, lv), RNG(rseed())).slice(0, 50), id = 'h' + Date.now().toString(36) + rid(3), M = QMODES[mode];
    const body = { title: clipW(String(c.title || '').trim() || M.name + ': ' + srcLabel(c, 'qcfg'), 60), src: clipW(srcLabel(c, 'qcfg'), 80), qids: qs.map(q => q.id), n: qs.length, t: 0, due, att: clamp(+c.att || 0, 0, 9), pw: false, open: true, created: Date.now(), by: CAP.uid || null, qm: mode, lv, end: c.end === 'goal' ? 'goal' : 'time', mins: qMins(c), goal: qGoal(c) };
    HW.busy = true; HW.qerr = ''; paint();
    try { await CAP.db.doc('homework/' + id).set(body); HW.busy = false; c.title = ''; try { API.save(); } catch (e) { } flash('Quest homework set. Students see it under Homework.'); TAB = 'hw'; HW.sel = id; }
    catch (e) { HW.busy = false; HW.qerr = e && e.code === 'quota_exceeded' ? 'The class database is full. Delete an old homework first.' : 'The homework did not save. Try again.'; }
    paint();
  }
  const qHwLabel = x => `⚔️ ${(QMODES[x.qm] || QMODES.gold).name} · ${QLV[clamp(+x.lv || 2, 1, 3)][0]} · ${qEndTxt(x.qm, x.end, +x.mins || 5, +x.goal || 0)}`;

  /* ---------- live class game: HOST (the only authority) ---------- */
  let QH = null;
  async function qhCreate() {
    if (!CAP.room || !CAP.admin || HS.busy || H) return;
    const c = LG().qcfg, P0 = poolOf(c, 'qcfg');
    if (!P0.length) { HS.qerr = 'Choose a question source that has questions first.'; paint(); return; }
    const lv = qLvOf(c), mode = qModeOf(c), pk = qBuild(P0, lv), pin = String(100000 + Math.floor(Math.random() * 900000));
    HS.busy = true; HS.qerr = ''; paint();
    let room; try { room = await CAP.room.join('lq-' + pin); } catch (e) { HS.busy = false; HS.qerr = joinErr(e); paint(); return; }
    QH = { pin, ep: rid(6), pk: rid(6), title: clipW(String(c.title || '').trim() || QMODES[mode].name + ': ' + srcLabel(c, 'qcfg'), 60), cfg: JSON.parse(JSON.stringify(c)), srv: qsNew({ mode, lv, end: c.end === 'goal' ? 'goal' : 'time', ms: qMins(c) * 60000, goal: qGoal(c), qs: pk.qs, tp: pk.tp, ph: 'lobby' }), room, conn: true, kickedKeys: {}, kickedPeers: {}, banned: {}, locked: false, dirty: new Set(), sent: {}, lastEmit: 0, lastFlush: 0, lastFull: 0, packAt: 0, last: Date.now(), view: 'game', saved: '', paused: false, savedAt: 0, ended: false };
    HS.busy = false; qhWire(); qhPublish(true); sfx('go'); paint(); qFs();
    if (CAP.db) cleanupLive();
  }
  function qhWire() {
    const r = QH.room;
    QH.unsub = [
      r.onPeers(ch => { if (!QH) return; qhSync(); if (ch && ch.joined && ch.joined.length) { QH.lastFull = 0; clearTimeout(QH.rejoinT); QH.rejoinT = setTimeout(() => { if (QH) qhPublish(false); }, 300); } }, e => { if (QH) { QH.dead = e && e.code || 'error'; paint(); } }),
      r.onConnection(c => { if (!QH) return; QH.conn = c; if (c) qhPublish(false); paint(); }, () => { })
    ];
    r.presence({ host: 1 }).catch(() => { });
  }
  function qUniqueNick(srv, nick, key) { const taken = {}; Object.values(srv.players).forEach(p => { if (p.key !== key) taken[p.nick.toLowerCase()] = 1; }); if (!taken[nick.toLowerCase()]) return nick; for (let i = 2; i < 99; i++) { const n = nick.slice(0, 13) + ' ' + i; if (!taken[n.toLowerCase()]) return n; } return nick; }
  function qClean(a) {
    const ty = String(a[1] || '').slice(0, 1); let a1 = a[2], a2 = a[3];
    if (ty === 'a') { a1 = Number.isInteger(+a1) ? +a1 : -1; a2 = Array.isArray(a2) ? a2.slice(0, 6).map(Number) : null; }
    else if (ty === 'b') { a1 = +a1 | 0; a2 = String(a2 || '').slice(0, 1); }
    else if (ty === 'p') a1 = String(a1 || '').slice(0, 6);
    else a1 = +a1 | 0;
    return [+a[0] | 0, ty, a1, a2];
  }
  function qhSync() {
    if (!QH || !QH.room) return; let ps; try { ps = QH.room.peers(); } catch (e) { return; }
    const srv = QH.srv, seen = {}, here = {}; let joined = false;
    (ps || []).forEach(p => { if (p && p.peer) here[p.peer] = 1; });
    (ps || []).forEach(p => {
      if (!p || p.sameTab || p.kind !== 'viewer') return; const pr = p.presence || {}; if (pr.host) return;
      const nick0 = cleanNick(pr.nick); if (nick0.length < 2) return;
      const key = p.by ? 'u:' + p.by : 'p:' + p.peer;
      if (QH.kickedKeys[key]) { if (!QH.kickedPeers[p.peer]) { QH.kickedPeers[p.peer] = 1; QH.kickDirty = true; } return; }
      let pl = srv.players[key];
      if (!pl) {
        if (srv.ph === 'end') return;
        if (QH.locked) { if (!QH.kickedPeers[p.peer]) { QH.kickedPeers[p.peer] = 2; QH.kickDirty = true; } return; }
        let nick = rude(nick0) ? 'Player ' + (Object.keys(srv.players).length + 1) : nick0;
        if (QH.banned[nick.toLowerCase()]) { if (!QH.kickedPeers[p.peer]) { QH.kickedPeers[p.peer] = 1; QH.kickDirty = true; } return; }
        pl = qsAdd(srv, key, qUniqueNick(srv, nick, key), cleanAv(pr.av), false); pl.uid = p.by || null; pl.peer = p.peer; pl.online = true; joined = true;
      }
      if (pl.peer !== p.peer && !here[pl.peer]) { pl.peer = p.peer; delete QH.sent[key]; }
      if (!pl.online) delete QH.sent[key];
      seen[key] = 1; pl.online = true;
      if (pr.av && cleanAv(pr.av) !== pl.av && srv.ph === 'lobby') pl.av = cleanAv(pr.av);
      if (srv.ph !== 'lobby' && pr.pk !== QH.pk) QH.needPack = true;
      if (!QH.sent[key]) QH.dirty.add(key);
      if (srv.ph === 'play' && !QH.paused && Array.isArray(pr.qa)) pr.qa.filter(a => Array.isArray(a) && Number.isInteger(a[0]) && a[0] > pl.seq).sort((a, b) => a[0] - b[0]).slice(0, 8).forEach(a => { qsAct(srv, key, qClean(a), QH.dirty); QH.scoreDirty = true; });
    });
    Object.values(srv.players).forEach(pl => { pl.online = !!seen[pl.key]; });
    if (joined) { sfx('join'); qhUpd(true); }
    if (srv.ph === 'end' && !QH.ended) qhEnded();
  }
  function qhState() {
    const srv = QH.srv, r = qsRanked(srv);
    const s = { v: 2, qm: srv.mode, ep: QH.ep, pin: QH.pin, ph: srv.ph, ti: QH.title, lv: srv.lv, end: srv.end, goal: srv.goal, mins: Math.round(srv.ms / 60000), left: Math.max(0, srv.cap - srv.t), pz: QH.paused ? 1 : 0, pc: r.filter(p => p.online).length, pk: QH.pk, pn: srv.qs.length, at: Date.now(), of: r.length, top: r.slice(0, 5).map(p => [p.nick, p.av, qsScore(srv, p)]), rk: [] };
    r.forEach((p, i) => { if (p.online && p.peer) s.rk.push([p.peer, i + 1]); });
    while (bytes(s) > 3800 && s.rk.length) s.rk = s.rk.slice(0, Math.floor(s.rk.length * 0.8));
    return s;
  }
  function qhPublish(change) {
    if (!QH) return; const s = qhState(); QH.lastEmit = Date.now();
    if (QH.room && !QH.dead) QH.room.emit('qm.state', s).catch(() => { });
    if (change) { const b = Object.assign({}, s, { open: s.ph !== 'end' }); delete b.rk; dbLive(b); qhSave(); }
  }
  async function qhFlush(force) {
    if (!QH) return; const srv = QH.srv, now = Date.now(); QH.lastFlush = now; if (force) QH.lastFull = now;
    const m = {}, keys = force ? Object.keys(srv.players) : [...QH.dirty]; QH.dirty.clear();
    keys.forEach(k => {
      const pl = srv.players[k]; if (!pl || pl.bot || !pl.peer || !pl.online) return;
      const v = qsView(srv, k); if (v.fb && v.fb.w && bytes(v) > 3000) v.fb = Object.assign({}, v.fb, { w: v.fb.w.slice(0, 160) + '…' });
      const j = JSON.stringify(v); if (!force && QH.sent[k] === j) return; QH.sent[k] = j; m[pl.peer] = v;
    });
    if (QH.kickDirty || force) { Object.keys(QH.kickedPeers).forEach(p => { m[p] = { kick: QH.kickedPeers[p] }; }); QH.kickDirty = false; }
    if (!Object.keys(m).length || !QH.room || QH.dead) return;
    const parts = []; let cur = {}, size = 60;
    Object.keys(m).forEach(k => { const e = bytes(m[k]) + k.length + 6; if (size + e > 3600 && Object.keys(cur).length) { parts.push(cur); cur = {}; size = 60; } cur[k] = m[k]; size += e; });
    parts.push(cur);
    const r = QH.room, ep = QH.ep;
    for (const c of parts) { try { await r.emit('qm.you', { ep, m: c }); } catch (e) { } }
  }
  async function qhPack() {
    if (!QH || !QH.room || QH.dead) return; QH.needPack = false; QH.packAt = Date.now();
    const srv = QH.srv, parts = [{ tp: srv.tp.map(t => String(t).slice(0, 60)).slice(0, 60) }]; let cur = [], size = 200;
    srv.qs.forEach(q => { const x = [q.t, q.o, q.k, q.a.length, q.tp, q.hw == null ? -1 : q.hw], b = bytes(x) + 2; if (size + b > 3300 && cur.length) { parts.push({ q: cur }); cur = []; size = 200; } cur.push(x); size += b; });
    if (cur.length) parts.push({ q: cur });
    const r = QH.room, ep = QH.ep, pk = QH.pk;
    for (let i = 0; i < parts.length; i++) { try { await r.emit('qm.pack', Object.assign({ ep, pk, i, n: parts.length }, parts[i])); } catch (e) { } }
  }
  function qhSave() {
    if (!QH) return; QH.savedAt = Date.now();
    ss.set('lg.qhost', { pin: QH.pin, ep: QH.ep, pk: QH.pk, title: QH.title, cfg: QH.cfg, srv: QH.srv, kickedKeys: QH.kickedKeys, banned: QH.banned, locked: QH.locked, saved: QH.saved, paused: QH.paused, at: Date.now() });
  }
  async function qhResume() {
    const s = ss.get('lg.qhost'); if (!s || !s.srv || !CAP.room || !CAP.admin || HS.busy || H) return;
    HS.busy = true; paint();
    let room; try { room = await CAP.room.join('lq-' + s.pin); } catch (e) { HS.busy = false; HS.qerr = joinErr(e); paint(); return; }
    QH = Object.assign({ kickedKeys: {}, banned: {}, locked: false, saved: '', paused: false }, s, { room, conn: true, kickedPeers: {}, dirty: new Set(), sent: {}, lastEmit: 0, lastFlush: 0, lastFull: 0, packAt: 0, last: Date.now(), view: 'game', savedAt: 0, ended: s.srv.ph === 'end' });
    Object.values(QH.srv.players).forEach(p => { p.online = false; });
    HS.busy = false; qhWire(); qhPublish(true); if (QH.srv.ph === 'play') qhPack(); paint(); qFs();
  }
  function qhStart() {
    const srv = QH.srv; if (!Object.keys(srv.players).length) { flash('Wait for at least one player to join.'); return; }
    srv.ph = 'play'; srv.t = 0; QH.last = Date.now();
    Object.values(srv.players).forEach(p => { p.qAt = 0; if (srv.mode === 'cafe') p.nxt = 1200; });
    qhPack(); qhPublish(true); qhFlush(true); sfx('go'); paint();
  }
  function qhEnded() {
    if (!QH || QH.ended) return; QH.ended = true; QH.paused = false;
    qhPublish(true); qhFlush(true); sfx('drum'); paint(); qhSaveResults();
    setTimeout(() => { if (QH && QH.srv.ph === 'end') { sfx('fanfare'); confetti(5000); } }, RM() ? 0 : 2400);
  }
  function qhEndNow() { if (!QH || QH.srv.ph === 'end') return; if (QH.srv.ph === 'lobby') { qhClose(); return; } qsEnd(QH.srv, 'host'); qhEnded(); }
  function qhClose() {
    if (!QH) return; if (QH.srv.ph !== 'end') { QH.srv.ph = 'end'; QH.srv.why = 'host'; }
    qhPublish(true); qhFlush(true);
    const r = QH.room, un = QH.unsub || []; setTimeout(() => { try { un.forEach(f => f()); } catch (e) { } try { r.leave(); } catch (e) { } }, 1500);
    stopMusic(); ss.set('lg.qhost', null); QH = null; QSIG = ''; TAB = 'quest'; paint();
  }
  function qhKick(key) {
    const pl = QH && QH.srv.players[key]; if (!pl) return;
    QH.kickedKeys[key] = 1; if (pl.peer) QH.kickedPeers[pl.peer] = 1; QH.banned[pl.nick.toLowerCase()] = 1; QH.kickDirty = true;
    delete QH.srv.players[key]; QH.askKick = ''; sfx('kick'); qhFlush(false); qhPublish(true); paint();
  }
  function qhTick(now) {
    if (!QH) return; const srv = QH.srv;
    qhSync(); if (!QH) return;
    const dt = Math.min(1000, Math.max(0, now - QH.last)); QH.last = now;
    if (srv.ph === 'play' && !QH.paused) { qsTick(srv, dt, QH.dirty); if (srv.ph === 'end' && !QH.ended) { qhEnded(); return; } }
    if (QH.needPack && now - QH.packAt > 1500) qhPack();
    if (now - QH.lastEmit > (srv.ph === 'play' ? (QH.scoreDirty ? 300 : 1000) : 2000)) { QH.scoreDirty = false; qhPublish(false); }
    if ((QH.dirty.size || QH.kickDirty) && now - QH.lastFlush > 150) qhFlush(false);
    if (now - QH.lastFull > 6000) qhFlush(true);
    if (now - QH.savedAt > 3000) qhSave();
  }
  function qhRows() {
    const s = QH.srv, r = qsRanked(s), ex = s.mode === 'td' ? ['Lives left', 'Invaders caught'] : s.mode === 'cafe' ? ['Customers served', 'Customers lost'] : [];
    const head = ['Rank', 'Nickname', s.mode === 'cafe' ? 'Cash ($)' : s.mode === 'td' ? 'Waves survived' : 'Gold', 'Answered', 'Correct', 'Accuracy (%)', 'Best streak'].concat(ex);
    const rows = r.map((p, i) => [i + 1, p.nick, qsScore(s, p), p.qn, p.ok, p.qn ? Math.round(p.ok / p.qn * 100) : 0, p.best].concat(s.mode === 'td' ? [p.hp, p.kills] : s.mode === 'cafe' ? [p.sv, p.lo] : []));
    return { head, rows };
  }
  function qhCSV() {
    const { head, rows } = qhRows(), s = QH.srv, date = new Date().toISOString().slice(0, 10);
    const qrows = s.qs.map((q, i) => { const [ok, of] = s.qst[i] || [0, 0]; return ['Q' + (i + 1), q.t.replace(/\n/g, ' '), q.a.map(k => q.o[k]).join(' | '), of, of ? Math.round(ok / of * 100) + '%' : 'not answered']; });
    offerCSV('quest-' + QH.title + '-' + date, csv([[QH.title + ' (' + QMODES[s.mode].name + ', ' + QLV[s.lv][0] + ', PIN ' + QH.pin + ', ' + date + ')'], head].concat(rows, [[], ['Question', 'Text', 'Correct answer', 'Times answered', 'Class % correct']], qrows)));
  }
  async function qhSaveResults() {
    if (!QH || !CAP.db) return; const s = QH.srv, r = qsRanked(s);
    const body = { title: QH.title, pin: QH.pin, at: Date.now(), n: s.qs.length, asked: r.reduce((a, p) => a + p.qn, 0), course: String(document.title || '').slice(0, 80), qm: s.mode, lv: s.lv,
      qs: s.qs.map((q, i) => ({ t: q.t.slice(0, 300), a: q.a.map(k => q.o[k]).join(' | ').slice(0, 300), ok: (s.qst[i] || [0, 0])[0], of: (s.qst[i] || [0, 0])[1] })).filter(x => x.of),
      pl: r.map(p => ({ nick: p.nick, uid: p.uid || null, score: qsScore(s, p), correct: p.ok, n: p.qn, ms: Math.round(p.ms), best: p.best || 0, pts: [] })) };
    try { await CAP.db.doc('liveres/' + QH.pin + '-' + QH.ep).set(body); if (QH) { QH.saved = 'ok'; qhSave(); paint(); } }
    catch (e) { if (QH) { QH.saved = e && e.code === 'quota_exceeded' ? 'full' : 'err'; paint(); } }
  }

  /* ---------- live class game: PHONE ---------- */
  const qn0 = x => typeof x === 'number' && isFinite(x) ? x : 0;
  const qarr = (x, n) => Array.isArray(x) ? x.slice(0, n) : [];
  function qOkState(d) {
    if (!QMODES[d.qm] || !['lobby', 'play', 'end'].includes(d.ph) || typeof d.ep !== 'string') return null;
    return { v: 2, qm: d.qm, ep: d.ep.slice(0, 16), pin: String(d.pin || ''), ph: d.ph, ti: String(d.ti || 'Quest Modes').slice(0, 60), lv: clamp(qn0(d.lv) || 2, 1, 3), end: d.end === 'goal' ? 'goal' : 'time', goal: qn0(d.goal), mins: qn0(d.mins), left: clamp(qn0(d.left), 0, 3600e3), pz: d.pz ? 1 : 0, pc: qn0(d.pc), pk: String(d.pk || '').slice(0, 16), pn: qn0(d.pn), at: qn0(d.at), of: qn0(d.of), top: qarr(d.top, 5).filter(Array.isArray).map(x => [cleanNick(x[0]), cleanAv(x[1]), qn0(x[2])]), rk: qarr(d.rk, 400).filter(x => Array.isArray(x) && typeof x[0] === 'string').map(x => [x[0], qn0(x[1])]) };
  }
  function qOkView(e, mode) {
    const v = { s: qn0(e.s), cq: qn0(e.cq) | 0, qn: qn0(e.qn), ok: qn0(e.ok), st: qn0(e.st), best: qn0(e.best), sc: qn0(e.sc), nk: cleanNick(e.nk), nt: qarr(e.nt, 4).filter(Array.isArray).map(x => [qn0(x[0]), String(x[1] || '').slice(0, 160)]) };
    if (e.fb && typeof e.fb === 'object') v.fb = { s: qn0(e.fb.s), q: qn0(e.fb.q) | 0, ok: e.fb.ok ? 1 : 0, c: qarr(e.fb.c, 6).map(qn0), a: qarr(e.fb.a, 6).map(qn0), w: String(e.fb.w || '').slice(0, 440), g: qn0(e.fb.g) };
    if (mode === 'gold') {
      v.g = qn0(e.g); if (e.off && typeof e.off === 'object') v.off = { id: qn0(e.off.id) };
      if (e.res && typeof e.res === 'object') v.res = { id: qn0(e.res.id), pick: qn0(e.res.pick), ch: qarr(e.res.ch, 3).map(x => [Array.isArray(x) && CHW[x[0]] ? x[0] : 'n', Array.isArray(x) ? qn0(x[1]) : 0]), k: CHW[e.res.k] ? e.res.k : 'n', v: qn0(e.res.v), d: qn0(e.res.d), who: cleanNick(e.res.who) };
      if (e.tp && typeof e.tp === 'object') v.tp = { k: e.tp.k === 'sw' ? 'sw' : 'tk', L: qarr(e.tp.L, 8).filter(Array.isArray).map(x => [qn0(x[0]), cleanNick(x[1]), cleanAv(x[2]), qn0(x[3])]) };
    }
    if (mode === 'td') {
      v.c = qn0(e.c); v.hp = qn0(e.hp); v.w = qn0(e.w); v.out = e.out ? 1 : 0; v.need = qn0(e.need); v.kills = qn0(e.kills);
      v.tw = TDPADS.map((_, i) => { const t = qarr(e.tw, 8)[i]; return Array.isArray(t) && TT[t[0]] ? [t[0], clamp(qn0(t[1]), 1, 3), qn0(t[2])] : 0; });
      if (e.wv && typeof e.wv === 'object') { const w = e.wv; v.wv = { id: qn0(w.id), w: qn0(w.w), lost: qn0(w.lost), leak: qn0(w.leak), kills: qn0(w.kills), kc: qn0(w.kc), n: qn0(w.n), hp: qn0(w.hp), ok: w.ok ? 1 : 0 }; }
    }
    if (mode === 'cafe') {
      v.cash = qn0(e.cash); v.stock = CF.map((_, i) => qn0(qarr(e.stock, 8)[i])); v.il = CF.map((_, i) => clamp(qn0(qarr(e.il, 8)[i]) || 1, 1, 3)); v.un = clamp(qn0(e.un) || 2, 2, CF.length); v.cool = clamp(qn0(e.cool), 0, 2); v.sv = qn0(e.sv); v.lo = qn0(e.lo);
      v.cu = qarr(e.cu, 3).filter(Array.isArray).map(x => [qn0(x[0]), clamp(qn0(x[1]), 0, AVS.length - 1), qarr(x[2], 3).filter(Array.isArray).map(o => [clamp(qn0(o[0]), 0, CF.length - 1), clamp(qn0(o[1]), 1, 9)]), qn0(x[3]), qn0(x[4])]);
      if (e.last && typeof e.last === 'object') v.last = { id: qn0(e.last.id), pay: qn0(e.last.pay), tip: qn0(e.last.tip) };
    }
    if (e.fin && typeof e.fin === 'object') { const f = e.fin; v.fin = { tps: qarr(f.tps, 80).filter(Array.isArray).map(x => [qn0(x[0]), qn0(x[1]), qn0(x[2])]), miss: qarr(f.miss, 4).filter(Array.isArray).map(x => [qn0(x[0]), qarr(x[1], 6).map(qn0), String(x[2] || '').slice(0, 220)]), rk: qn0(f.rk), of: qn0(f.of), why: String(f.why || '').slice(0, 8), win: f.win ? 1 : 0, wn: cleanNick(f.wn), x: f.x && typeof f.x === 'object' ? { bc: CHW[f.x.bc] ? f.x.bc : '', kills: qn0(f.x.kills), sv: qn0(f.x.sv), lo: qn0(f.x.lo) } : {} }; }
    return v;
  }
  function qmOnState(raw, via) {
    if (!P || P.kicked || !raw || typeof raw !== 'object' || raw.v !== 2) return;
    const d = qOkState(raw); if (!d || d.pin !== P.pin) return;
    const now = Date.now();
    if (!P.qm || P.qm.st.ep !== d.ep) { P.qm = { st: d, view: null, pack: null, chunks: null, acts: [], seq: 0, pending: null, deadline: 0, frozen: null, rk: 0, viewAt: 0, viaRoom: false, ui: qUi(d.qm) }; if (P.qmView) { const e = P.qmView; P.qmView = null; qmApplyView(e); } }
    const Q = P.qm, prev = Q.st;
    if (prev !== d && prev.ep === d.ep && d.at < prev.at) return;
    Q.st = d;
    if (via === 'room') { Q.deadline = now + d.left; Q.viaRoom = true; } else if (!Q.viaRoom || !Q.deadline) Q.deadline = (d.at || now) + d.left;
    Q.frozen = d.pz ? d.left : null;
    const me = myPeer(), r = d.rk.find(x => x[0] === me); if (r) Q.rk = r[1];
    if (Q.pack && Q.pack.pk !== d.pk) Q.pack = null;
    if (d.ph === 'end' && (!prev || prev.ph !== 'end' || prev === d)) { ss.set('lg.rejoin', null); sfx('fanfare'); if (Q.rk >= 1 && Q.rk <= 3) setTimeout(() => confetti(4000), 300); if (!P.rewarded && Q.view && Q.view.ok > 0) { P.rewarded = true; try { API.reward(Math.max(2, Q.view.ok * 2), '⚔️ Quest Modes'); } catch (e) { } } }
    if (d.ph === 'play' && prev && prev.ph === 'lobby') { sfx('go'); vib(20); say('The game has started. Answer at your own pace.'); }
    qRefresh();
  }
  function qmApplyView(e) {
    const Q = P.qm, v = qOkView(e, Q.st.qm); Q.view = v; Q.viewAt = Date.now(); Q.seq = Math.max(Q.seq, v.s);
    if (Q.pending && v.s >= Q.pending.seq) Q.pending = null;
  }
  function qmOnYou(msg) {
    if (!P || !msg || !msg.data || typeof msg.data !== 'object') return; const d = msg.data;
    if (!d.m || typeof d.m !== 'object' || (P.qm && d.ep !== P.qm.st.ep)) return;
    const e = d.m[myPeer()]; if (!e || typeof e !== 'object') return;
    if (e.kick) { pKicked(+e.kick); return; }
    if (!P.qm) { P.qmView = e; return; }
    qmApplyView(e); qRefresh();
  }
  function qmOnPack(msg) {
    const d = msg && msg.data; if (!P || !P.qm || !d || typeof d !== 'object' || d.ep !== P.qm.st.ep) return;
    const Q = P.qm, pk = String(d.pk || '').slice(0, 16); if (Q.pack && Q.pack.pk === pk) return;
    if (!Q.chunks || Q.chunks.pk !== pk) Q.chunks = { pk, n: clamp(qn0(d.n), 1, 64), got: {} };
    Q.chunks.got[clamp(qn0(d.i), 0, 63)] = d;
    const c = Q.chunks; if (Object.keys(c.got).length < c.n) return;
    const tp = [], qs = [];
    for (let i = 0; i < c.n; i++) { const x = c.got[i]; if (!x) return; qarr(x.tp, 60).forEach(t => tp.push(String(t).slice(0, 80))); qarr(x.q, 60).forEach(e => { if (!Array.isArray(e)) return; const o = qarr(e[1], 6).map(s => String(s).slice(0, 200)); qs.push({ t: String(e[0] || '').slice(0, 600), o, k: ['mc', 'ma', 'tf'].includes(e[2]) ? e[2] : 'mc', na: clamp(qn0(e[3]), 1, 6), tp: qn0(e[4]), hw: Number.isInteger(e[5]) && e[5] < o.length ? e[5] : -1 }); }); }
    Q.pack = { pk, qs, tp }; Q.chunks = null;
    if (P.room) P.room.presence({ pk }).catch(() => { });
    qRefresh();
  }
  function qmPhoneTick(now) {
    if (!P || !P.qm) return; const Q = P.qm;
    if (Q.pending && now - Q.pending.at > 12000) { Q.pending = null; paint(); return; }
    if (API && API.S.loc && API.S.loc.v === VIEW) qPartial(qc());
  }

  /* ---------- drawing the reef map ---------- */
  let QCV = null, QANIM = 0, QDRAWQ = 0;
  function qCanvas() { if (!QCV) { QCV = document.createElement('canvas'); QCV.setAttribute('aria-hidden', 'true'); } return QCV; }
  function qDrawSoon() { if (QDRAWQ) return; QDRAWQ = requestAnimationFrame(() => { QDRAWQ = 0; const c = qc(); if (c && c.mode === 'td') qDraw(c); }); }
  function qDraw(c) {
    const cv = QCV, slot = $('qm-cvslot'); if (!cv || !slot || cv.parentNode !== slot) return;
    const W = slot.clientWidth, Hh = slot.clientHeight; if (!W || !Hh) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1); if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(Hh * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(Hh * dpr); }
    const x = cv.getContext('2d'); if (!x) return; const s = W / 100 * dpr; x.setTransform(s, 0, 0, s, 0, 0);
    const a = c.ui.anim && !c.ui.anim.done ? c.ui.anim : null, tw = a ? a.S.tw : (c.v && c.v.tw) || [], P2 = Math.PI * 2;
    const g = x.createLinearGradient(0, 0, 100, 0); g.addColorStop(0, '#0B3D6B'); g.addColorStop(0.7, '#126E92'); g.addColorStop(1, '#1FA7A0'); x.fillStyle = g; x.fillRect(0, 0, 100, 60);
    x.strokeStyle = 'rgba(255,255,255,.1)'; x.lineWidth = 0.4; for (let i = 0; i < 16; i++) { const yy = 3 + (i * 7.3) % 56, xx = (i * 23.7) % 96; x.beginPath(); x.moveTo(xx, yy); x.quadraticCurveTo(xx + 2, yy - 1.2, xx + 4, yy); x.quadraticCurveTo(xx + 6, yy + 1.2, xx + 8, yy); x.stroke(); }
    [[97, 40, 4.2, '#FF7A8A'], [99, 50, 5, '#FFB067'], [93, 55, 3.4, '#F25F9A'], [100, 32, 3.2, '#FFD36E'], [94, 46, 2.2, '#FF9EC4']].forEach(([cx, cy, r, col]) => { x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, P2); x.fill(); x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.arc(cx - r * 0.3, cy - r * 0.3, r * 0.3, 0, P2); x.fill(); });
    const path = () => { x.beginPath(); TDP.forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.stroke(); };
    x.lineJoin = 'round'; x.lineCap = 'round'; x.strokeStyle = '#B8955A'; x.lineWidth = 8.6; path(); x.strokeStyle = '#EED9A4'; x.lineWidth = 7; path();
    x.setLineDash([1.5, 2.5]); x.strokeStyle = 'rgba(150,110,50,.5)'; x.lineWidth = 0.5; path(); x.setLineDash([]);
    const sel = c.ui.pad;
    if (sel >= 0 && tw[sel]) { const t = tw[sel], [px, py] = TDPADS[sel]; x.beginPath(); x.arc(px, py, TT[t[0]].rng[t[1] - 1], 0, P2); x.fillStyle = 'rgba(255,213,74,.12)'; x.fill(); x.strokeStyle = 'rgba(255,213,74,.7)'; x.lineWidth = 0.4; x.stroke(); }
    TDPADS.forEach(([px, py], i) => {
      const t = tw[i]; x.beginPath(); x.arc(px, py, 4.4, 0, P2); x.fillStyle = t ? 'rgba(20,12,45,.55)' : 'rgba(255,255,255,.14)'; x.fill();
      if (!t) return; const ty = t[0];
      if (ty === 'c') { x.fillStyle = '#3A3F4B'; x.beginPath(); x.arc(px, py + 0.6, 3.1, 0, P2); x.fill(); x.fillStyle = '#22252D'; x.fillRect(px - 0.9, py - 4, 1.8, 3.6); x.fillStyle = '#F7B5A8'; x.beginPath(); x.ellipse(px, py + 0.4, 1.9, 1.4, 0, 0, P2); x.fill(); x.strokeStyle = '#C97F70'; x.lineWidth = 0.35; x.beginPath(); x.arc(px, py + 0.4, 0.8, 0, P2 * 0.8); x.stroke(); }
      else if (ty === 'n') { x.fillStyle = '#8D5A2B'; x.beginPath(); x.moveTo(px - 3.4, py); x.lineTo(px + 3.4, py); x.lineTo(px + 2.2, py + 2.4); x.lineTo(px - 2.2, py + 2.4); x.closePath(); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 0.3; for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(px + k, py - 3); x.lineTo(px + k * 0.6, py); x.stroke(); } x.beginPath(); x.moveTo(px - 2.4, py - 1.5); x.lineTo(px + 2.4, py - 1.5); x.stroke(); }
      else { x.strokeStyle = '#A06A35'; x.lineWidth = 0.9; x.beginPath(); x.moveTo(px - 2.8, py + 2.4); x.lineTo(px, py - 2.2); x.lineTo(px + 2.8, py + 2.4); x.stroke(); x.fillStyle = '#5B3A1E'; x.beginPath(); x.arc(px + 1.2, py - 2.4, 1.6, 0, P2); x.fill(); x.fillStyle = 'rgba(255,255,255,.3)'; x.beginPath(); x.arc(px + 0.7, py - 2.9, 0.5, 0, P2); x.fill(); }
      for (let k = 0; k < t[1]; k++) { x.fillStyle = '#FFD54A'; x.beginPath(); x.arc(px - 1.6 + k * 1.6, py + 3.6, 0.55, 0, P2); x.fill(); }
    });
    if (!a) return;
    a.S.fx.forEach(([p, ex, ey, ty]) => { const [px, py] = TDPADS[p]; if (ty === 'c') { x.strokeStyle = '#FFE066'; x.lineWidth = 0.6; x.beginPath(); x.moveTo(px, py - 3); x.lineTo(ex, ey); x.stroke(); } else if (ty === 'n') { x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 0.35; x.setLineDash([0.6, 0.6]); x.beginPath(); x.arc(ex, ey, 2.4, 0, P2); x.stroke(); x.setLineDash([]); } else { x.strokeStyle = 'rgba(160,100,50,.9)'; x.lineWidth = 0.6; x.beginPath(); x.arc(ex, ey, TT.k.spl[0], 0, P2); x.stroke(); } });
    a.S.en.forEach(e => {
      if (e.dead || e.out || e.d <= 0) return; const ex = e.x, ey = e.y;
      if (e.ty === 'l') { x.fillStyle = '#F28C38'; x.beginPath(); x.ellipse(ex, ey, 2.3, 1.5, 0, 0, P2); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 0.35; for (let k = -1; k <= 1; k++) { x.beginPath(); x.moveTo(ex + k * 0.8, ey - 1.3); x.lineTo(ex + k * 0.8, ey + 1.3); x.stroke(); } x.strokeStyle = '#B5541A'; for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(ex + k * 0.6, ey - 1.4); x.lineTo(ex + k * 0.9, ey - 2.8); x.stroke(); } }
      else if (e.ty === 'j') { x.fillStyle = '#F7A6D8'; x.beginPath(); x.arc(ex, ey, 1.8, Math.PI, 0); x.fill(); x.strokeStyle = '#F7A6D8'; x.lineWidth = 0.35; for (let k = -1; k <= 1; k++) { x.beginPath(); x.moveTo(ex + k * 0.9, ey); x.lineTo(ex + k * 0.9 + 0.3, ey + 2); x.stroke(); } }
      else if (e.ty === 's') { [[0, 0, 2], [-1.4, 0.8, 1.4], [1.3, 0.9, 1.3], [0.4, -1.2, 1.2]].forEach(([dx, dy, r], k) => { x.fillStyle = k % 2 ? '#6E7426' : '#8A8F2E'; x.beginPath(); x.arc(ex + dx, ey + dy, r, 0, P2); x.fill(); }); }
      else { x.fillStyle = '#D7263D'; x.beginPath(); x.ellipse(ex, ey, 3.4, 2.4, 0, 0, P2); x.fill(); x.beginPath(); x.arc(ex - 3.6, ey - 1.6, 1.2, 0, P2); x.arc(ex + 3.6, ey - 1.6, 1.2, 0, P2); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.arc(ex - 0.9, ey - 1.6, 0.5, 0, P2); x.arc(ex + 0.9, ey - 1.6, 0.5, 0, P2); x.fill(); }
      if (e.st > 0) { x.strokeStyle = 'rgba(255,255,255,.7)'; x.lineWidth = 0.25; x.beginPath(); x.arc(ex, ey, 2.8, 0, P2); x.stroke(); }
      if (e.hp < e.mx) { x.fillStyle = 'rgba(0,0,0,.5)'; x.fillRect(ex - 2.5, ey - 4.2, 5, 0.8); x.fillStyle = '#3DDC84'; x.fillRect(ex - 2.5, ey - 4.2, 5 * clamp(e.hp / e.mx, 0, 1), 0.8); }
    });
  }
  function qAnimStart(c) {
    const v = c.v, u = c.ui, wv = v.wv; if (!wv) return;
    u.anim = { id: wv.id, w: wv.w, S: tdSim(v.tw, wv.w, c.lv), sp: 2, acc: 0, last: performance.now(), done: false, leak0: 0, wv };
    u.pad = -1; qsfx('wave'); say(`Wave ${wv.w} is coming.`);
    if (RM()) qAnimFinish(u.anim, true); else if (!QANIM) QANIM = requestAnimationFrame(qAnimFrame);
  }
  function qAnimFinish(a, quiet) {
    while (!a.S.done && a.S.k < 24000) tdStep(a.S);
    a.done = true; const w = a.wv;
    if (!quiet || RM()) { qsfx(w.ok ? 'clear' : 'lose'); say(w.ok ? `Wave ${w.w} cleared. ${w.lost ? w.lost + ' lives lost.' : 'No lives lost.'} You caught ${w.kills} invaders.` : `The reef was overrun on wave ${w.w}.`); }
  }
  function qAnimFrame(now) {
    QANIM = 0; const c = qc(); if (!c || c.mode !== 'td') return; const a = c.ui.anim; if (!a || a.done) return;
    const dt = Math.min(0.1, Math.max(0, (now - a.last) / 1000)); a.last = now; a.acc += dt * a.sp;
    let n = 0; while (a.acc >= TD_DT && !a.S.done && n++ < 400) { tdStep(a.S); a.acc -= TD_DT; }
    if (a.S.leak > a.leak0) { a.leak0 = a.S.leak; qsfx('leak'); }
    const hp = $('qm-hp'); if (hp) hp.textContent = Math.max(0, a.wv.hp + a.wv.lost - a.S.lost);
    if (a.S.done) { qAnimFinish(a, false); paint(); return; }
    if ($('qm-cvslot')) qDraw(c);
    QANIM = requestAnimationFrame(qAnimFrame);
  }

  /* ---------- rendering: solo and phone ---------- */
  const qBub = () => `<div class="lg-bg qm-bub" aria-hidden="true">${[[8, 90, 26, 0], [22, 100, 14, 4], [48, 95, 20, 8], [70, 105, 12, 2], [88, 92, 22, 6], [35, 110, 10, 10]].map(([l, t, s, d]) => `<i style="left:${l}%;top:${t}%;width:${s}px;height:${s}px;animation-delay:${-d}s"></i>`).join('')}</div>`;
  function qChestSVG(i, open) {
    const W = [['#9C5B2E', '#B5703A'], ['#2E7D80', '#3C9A9D'], ['#B4436C', '#CC5A84']][i % 3];
    return `<svg viewBox="0 0 120 104" aria-hidden="true" focusable="false"><ellipse cx="60" cy="96" rx="46" ry="6" fill="rgba(0,0,0,.25)"/><ellipse class="qmx-glow" cx="60" cy="48" rx="40" ry="12" fill="#FFE58A"/><rect x="14" y="46" width="92" height="46" rx="6" fill="${W[0]}"/><path d="M14 62h92M14 76h92" stroke="rgba(0,0,0,.18)" stroke-width="2"/><rect x="26" y="46" width="9" height="46" fill="#E3B341"/><rect x="85" y="46" width="9" height="46" fill="#E3B341"/><g class="qmx-lid"><path d="M14 48V34Q14 14 60 14Q106 14 106 34V48Z" fill="${W[1]}"/><path d="M26 48V20M94 48V20" stroke="#E3B341" stroke-width="9"/><path d="M14 40Q60 30 106 40" stroke="rgba(0,0,0,.15)" stroke-width="2" fill="none"/></g><rect x="51" y="44" width="18" height="20" rx="3" fill="#F2C94C" stroke="#9C7A1E" stroke-width="2"/><circle cx="60" cy="52" r="3" fill="#5B3A1E"/><rect x="58.6" y="53" width="2.8" height="6" fill="#5B3A1E"/>${open ? '' : ''}</svg>`;
  }
  const qResLine = r => {
    if (r.k === 'tk') return r.who ? `You grabbed ${fmt(r.d)} gold from ${r.who}!` : `Nobody to grab from, so +${fmt(r.d)} gold`;
    if (r.k === 'sw') return r.who ? `You swapped gold with ${r.who}: ${r.d >= 0 ? '+' : '−'}${fmt(Math.abs(r.d))}` : `Nobody to swap with, so +${fmt(r.d)} gold`;
    if (r.k === 'n') return 'Just shells this time. Nothing gained, nothing lost.';
    const t = CHL[r.k][1](r.v);
    return r.d > 0 ? `${t}: +${fmt(r.d)} gold` : r.d < 0 ? `${t}: −${fmt(-r.d)} gold` : `${t}, but there was nothing to ${r.k === 'l' || r.k === 'L' ? 'lose' : 'multiply'} yet`;
  };
  function qScoreChip(c) { const v = c.v || {}; return c.mode === 'gold' ? '💰 ' + fmt(v.g || 0) : c.mode === 'td' ? '🌊 ' + fmt(v.w || 0) : '💵 $' + fmt(v.cash || 0); }
  function qMiniLb(c) {
    const top = c.top || []; if (!top.length) return '';
    let rows = top.slice(0, 5); const mi = top.findIndex(x => x[3]);
    if (!c.live && mi >= 5) rows = rows.slice(0, 4).concat([top[mi]]);
    return `<h3>${c.live ? 'Class leaderboard' : 'Leaderboard'}</h3>${rows.map(r => { const rk = top.indexOf(r) + 1; return `<div class="qm-lbr ${r[3] ? 'qmx-me' : ''}"><span>${rk <= 3 ? ['🥇', '🥈', '🥉'][rk - 1] : rk}</span><span aria-hidden="true">${esc(r[1])}</span><span class="qmx-n">${esc(r[0])}${r[3] && r[0] !== 'You' ? ' (you)' : ''}</span><span class="qmx-s">${esc(qUnit(c.mode, r[2]))}</span></div>`; }).join('')}${c.live && c.rk > 5 ? `<div class="qm-lbr qmx-me"><span>${c.rk}</span><span aria-hidden="true">${esc(c.av)}</span><span class="qmx-n">You</span><span class="qmx-s">${esc(qUnit(c.mode, (c.v || {}).sc || 0))}</span></div>` : ''}`;
  }
  function qNtHTML(c) { const now = Date.now(); return (c.ui.nts || []).filter(x => now - x[2] < 6000).map(x => `<p>${esc(x[1])}</p>`).join(''); }
  function qStats(c) {
    const v = c.v || {}, rk = c.rk ? `<span class="qm-stat" id="qm-rank">🏅 ${ord(c.rk)}${c.of ? ' of ' + c.of : ''}</span>` : '';
    if (c.mode === 'gold') return `<div class="qm-stats"><span class="qm-stat qmx-hi" id="qm-gold">💰 ${fmt(v.g || 0)} gold</span>${rk}${v.st >= 2 ? `<span class="qm-stat">🔥 ${v.st}</span>` : ''}${c.end === 'goal' ? `<span class="qm-stat">🎯 ${fmt(c.goal)}</span>` : ''}</div>`;
    if (c.mode === 'td') { const a = c.ui.anim && !c.ui.anim.done ? c.ui.anim : null; return `<div class="qm-stats"><span class="qm-stat qmx-hi">${a ? `🌊 Wave ${a.w} in play` : `🌊 ${fmt(v.w || 0)} survived`}</span><span class="qm-stat">❤️ <span id="qm-hp">${a ? Math.max(0, a.wv.hp + a.wv.lost - a.S.lost) : v.hp}</span></span><span class="qm-stat">🪙 ${fmt(v.c || 0)}</span>${rk}${c.end === 'goal' ? `<span class="qm-stat">🎯 ${c.goal} waves</span>` : ''}</div>`; }
    return `<div class="qm-stats"><span class="qm-stat qmx-hi">💵 $${fmt(v.cash || 0)}</span><span class="qm-stat">😀 ${fmt(v.sv || 0)} served</span>${v.lo ? `<span class="qm-stat">😞 ${fmt(v.lo)}</span>` : ''}${rk}${c.end === 'goal' ? `<span class="qm-stat">🎯 $${fmt(c.goal)}</span>` : ''}</div>`;
  }
  function qQuestion(c) {
    const v = c.v, q = c.qs[v.cq], u = c.ui; if (!q) return '<p class="lg-hint">Loading the next question…</p>';
    if (u.hq !== v.cq || u.hqS !== v.s) { u.hq = v.cq; u.hqS = v.s; u.hide = []; u.sel = []; u.hint = false; }
    const hintOk = c.lv === 1 && !u.hint && q.hw >= 0 && !c.pending;
    const st = i => (u.hide.includes(i) ? 'lgx-gone ' : '') + (u.sel.includes(i) ? 'lgx-pick' : '');
    const lab = c.mode === 'gold' ? 'Right answer: open a chest' : c.mode === 'td' ? `Right answer: +${TD_PERQ[c.lv - 1]} coins` : `Right answer: restock ${CF_RE[c.lv - 1] + ((c.v || {}).cool || 0)} of every dish`;
    return `<div class="lg-qmeta">${c.lv === 1 && c.tp[q.tp] ? esc(c.tp[q.tp]) + ' · ' : ''}${esc(lab)}</div>${qbox(q.t, maHint(q))}${tilesHTML(q, { act: c.pending ? '' : 'qmans', state: st })}${q.k === 'ma' && !c.pending ? `<div class="lg-foot" style="background:none;padding:0">${BTN('qmsub', `Submit ${u.sel.length ? '(' + u.sel.length + ')' : ''}`, 'lg-btn lgx-gold lgx-big', `${u.sel.length ? '' : 'disabled'} data-kbd="next"`)}</div>` : ''}${hintOk ? `<div class="lg-pw">${BTN('qmhint', '💡 Hint: remove a wrong answer', 'lg-pwb', 'data-kbd="hint"')}</div>` : ''}${c.pending ? '<div class="lg-wait" role="status">Checking your answer <i></i><i></i><i></i></div>' : ''}`;
  }
  function qFb(c, fb, gain) {
    const q = c.qs[fb.q] || { o: [], t: '' };
    return `${!fb.ok ? qbox(q.t, '', 'lgx-small') + tilesHTML(q, { compact: true, state: i => fb.a.includes(i) ? 'lgx-right' : fb.c.includes(i) ? 'lgx-wpick lgx-dim' : 'lgx-dim' }) : ''}<div class="lg-fb ${fb.ok ? 'lgx-ok' : 'lgx-bad'}" role="status"><h3>${fb.ok ? '✓ Correct!' : '✗ Not quite'}${gain ? ` <span class="lg-plus" style="font-size:1.1rem">${gain}</span>` : ''}</h3>${!fb.ok ? `<p><b>Answer:</b> ${esc(fb.a.map(i => q.o[i]).filter(Boolean).join(' · '))}</p>` : ''}${fb.w ? `<p>${esc(fb.w)}</p>` : ''}</div>`;
  }
  function qGold(c) {
    const v = c.v, u = c.ui; let main = '', foot = '';
    if (v.tp) {
      const tk = v.tp.k === 'tk';
      main = `<div class="lg-big">${tk ? '🦀 Crab grab!' : '🔄 Swap!'}</div><p class="lg-hint">${tk ? 'Choose a player. You take 25% of their gold.' : 'Choose a player to swap all your gold with.'}</p><div class="qm-tgts" role="group" aria-label="Choose a player">${v.tp.L.map(([h, nk, av, g], j) => `<button type="button" class="qm-tgt" data-px="qmtgt" data-pv="${VIEW}" data-k="${h}" ${j < 6 ? `data-key="${j + 1}"` : ''} ${c.pending ? 'disabled' : ''} aria-label="${esc(nk + ', ' + fmt(g) + ' gold')}"><span class="lgx-e" aria-hidden="true">${esc(av)}</span><span class="lgx-n">${esc(nk)}</span><span class="lg-num">💰 ${fmt(g)}</span>${j < 6 ? `<kbd aria-hidden="true">${j + 1}</kbd>` : ''}</button>`).join('')}</div>`;
    } else if (v.off) {
      main = `<div class="lg-fb lgx-ok" role="status"><h3>✓ Correct! Pick a chest</h3>${v.fb && v.fb.w ? `<p>${esc(v.fb.w)}</p>` : ''}</div><div class="qm-chests" role="group" aria-label="Treasure chests">${[0, 1, 2].map(i => `<button type="button" class="qm-chest" data-px="qmchest" data-pv="${VIEW}" data-k="${i}" data-key="${i + 1}" ${c.pending ? 'disabled' : ''} aria-label="Chest ${i + 1}">${qChestSVG(i, false)}<span>Chest ${i + 1}</span><kbd aria-hidden="true">${i + 1}</kbd></button>`).join('')}</div>${c.pending ? '<div class="lg-wait">Opening <i></i><i></i><i></i></div>' : '<p class="lg-hint">Keys: 1, 2 or 3</p>'}`;
    } else if (v.res && v.res.id !== u.resAck) {
      const r = v.res, good = r.d > 0, bad = r.d < 0;
      main = `<div class="qm-chests">${r.ch.map(([k, val], i) => `<div class="qm-chest qmx-open ${i === r.pick ? 'qmx-pick' : 'qmx-dim'}">${qChestSVG(i, true)}<span class="qmx-out"><span aria-hidden="true">${CHL[k][0]}</span> ${esc(CHL[k][1](val))}</span>${i === r.pick ? '<span class="lg-pill lgx-gold" style="color:#1B1035">Your pick</span>' : ''}</div>`).join('')}</div><div class="qm-res ${good ? 'qmx-good' : bad ? 'qmx-bad' : ''}" role="status"><span aria-hidden="true">${CHL[r.k][0]}</span> ${esc(qResLine(r))}</div>`;
      foot = `<span class="lgx-sp">Gold now: ${fmt(v.g)}</span>${BTN('qmnext', 'Next question ▶', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}`;
    } else if (v.fb && v.fb.s > u.ackS && !v.fb.ok) {
      main = qFb(c, v.fb, ''); foot = `<span class="lgx-sp">No chest this time. Keep going!</span>${BTN('qmnext', 'Next question ▶', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}`;
    } else main = qQuestion(c);
    return { main, foot };
  }
  function qTd(c) {
    const v = c.v, u = c.ui, a = u.anim && !u.anim.done ? u.anim : null; let main = '', foot = '';
    if (u.scr === 'q' && !v.out && !a) {
      if (v.fb && v.fb.s > u.ackS) { main = qFb(c, v.fb, v.fb.ok ? '+' + v.fb.g + ' coins' : ''); foot = `${BTN('qmmap', '🗺️ To the map', 'lg-btn lgx-ghost', 'data-kbd="back"')}<span class="lgx-sp">🪙 ${fmt(v.c)} coins</span>${BTN('qmnext', 'Next question ▶', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}`; }
      else { main = qQuestion(c); foot = `${BTN('qmmap', '🗺️ To the map', 'lg-btn lgx-ghost', 'data-kbd="back"')}<span class="lgx-sp">${v.need ? `Answer ${v.need} more to unlock wave ${v.w + 1}` : `Wave ${v.w + 1} is ready`}</span>`; }
      return { main, foot };
    }
    const tw = a ? a.S.tw : v.tw;
    main = `<div class="qm-map" id="qm-map" role="img" aria-label="${esc(`Reef map. ${tw.filter(Boolean).length} of 8 pads have towers.` + (a ? ` Wave ${a.w} in progress.` : ''))}"><div class="qmx-slot" id="qm-cvslot"></div>${TDPADS.map(([px, py], i) => { const t = tw[i], lab = t ? `${TT[t[0]].name} level ${t[1]}` : 'empty, build here'; return `<button type="button" class="qm-pad ${t ? 'qmx-has' : ''} ${u.pad === i ? 'qmx-sel' : ''}" style="left:${px}%;top:${(py / 60 * 100).toFixed(2)}%" data-px="qmpad" data-pv="${VIEW}" data-k="${i}" aria-label="Pad ${i + 1}: ${esc(lab)}" aria-pressed="${u.pad === i}" ${a || v.out || c.pending ? 'disabled' : ''}><span aria-hidden="true">${i + 1}</span></button>`; }).join('')}</div>`;
    if (a) { main += `<div class="qm-banner" role="status">🌊 Wave ${a.w}: ${a.S.list.length} invaders heading for the reef</div>`; foot = `<span class="lgx-sp">Speed ×${a.sp}</span>${BTN('qmfast', a.sp >= 4 ? '⏩ ×1' : '⏩ Faster', 'lg-btn lgx-ghost')}${BTN('qmskip', '⏭ Skip to the end', 'lg-btn lgx-gold', 'data-kbd="skip"')}`; return { main, foot }; }
    if (v.wv && v.wv.id !== u.wvAck) { const w = v.wv; main += `<div class="qm-banner ${w.ok ? 'qmx-ok' : 'qmx-bad'}" role="status">${w.ok ? `✓ Wave ${w.w} cleared! ${w.lost ? `−${w.lost} ${w.lost === 1 ? 'life' : 'lives'}` : 'No lives lost'} · caught ${w.kills} of ${w.n} · +${w.kc} coins` : `🌊 The reef was overrun on wave ${w.w}`}${BTN('qmwvok', 'OK', 'lg-sm', '')}</div>`; }
    if (v.out) { main += `<div class="qm-banner qmx-bad">Your reef held for ${qUnit('td', v.w)}. ${c.live ? 'Watch the leaderboard until the game ends.' : ''}</div>`; return { main: main + `<div class="qm-lb" id="qm-lb">${qMiniLb(c)}</div>`, foot: c.live ? '' : BTN('qmfinish', 'See my results ▶', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"') }; }
    if (u.pad >= 0) {
      const i = u.pad, t = v.tw[i];
      if (!t) main += `<div class="qm-panel" role="group" aria-label="Build on pad ${i + 1}"><b>Pad ${i + 1}: build a tower</b><div class="qm-opts">${TTK.map(k => { const T = TT[k], can = v.c >= T.cost; return `<button type="button" class="qm-opt" data-px="qmbuild" data-pv="${VIEW}" data-k="${k}" ${can && !c.pending ? '' : 'disabled'} aria-label="${esc(`Build ${T.name} for ${T.cost} coins. ${T.tip}.${can ? '' : ' Not enough coins.'}`)}"><span><span aria-hidden="true">${T.ic}</span> ${T.name}</span><b>🪙 ${T.cost}</b><small>${T.tip}</small></button>`; }).join('')}</div>${BTN('qmpad', 'Close', 'lg-sm', `data-k="${i}"`)}</div>`;
      else { const T = TT[t[0]], up = t[1] < 3 ? T.up[t[1] - 1] : 0, sell = Math.floor(t[2] * 0.6); main += `<div class="qm-panel" role="group" aria-label="Pad ${i + 1}"><b>Pad ${i + 1}: <span aria-hidden="true">${T.ic}</span> ${T.name}, level ${t[1]}</b><span style="font-size:.9rem">${T.tip}. Range ${T.rng[t[1] - 1]}, power ${T.dmg[t[1] - 1]}.</span><div class="qm-opts">${up ? `<button type="button" class="qm-opt" data-px="qmup" data-pv="${VIEW}" ${v.c >= up && !c.pending ? '' : 'disabled'} aria-label="Upgrade to level ${t[1] + 1} for ${up} coins"><span>⬆️ Upgrade to level ${t[1] + 1}</span><b>🪙 ${up}</b></button>` : '<span class="qm-opt" aria-disabled="true">⭐ Top level</span>'}<button type="button" class="qm-opt" data-px="qmsell" data-pv="${VIEW}" ${c.pending ? 'disabled' : ''} aria-label="Sell for ${sell} coins"><span>💱 Sell</span><b>+🪙 ${sell}</b></button></div>${BTN('qmpad', 'Close', 'lg-sm', `data-k="${i}"`)}</div>`; }
    } else main += `<p class="lg-hint">${tw.some(Boolean) ? 'Tap a tower to upgrade it, or an empty pad to build.' : 'Tap a numbered pad to build your first tower.'}</p>`;
    foot = `${BTN('qmask', `📝 Answer (+${TD_PERQ[c.lv - 1]} coins)`, 'lg-btn lgx-ghost', 'data-kbd="ask"')}<span class="lgx-sp">${v.need ? `Answer ${v.need} more to unlock wave ${v.w + 1}` : ''}</span>${BTN('qmwave', `🌊 Start wave ${v.w + 1}`, 'lg-btn lgx-gold lgx-big', `data-kbd="wave" ${v.need || c.pending ? 'disabled' : ''}`)}`;
    return { main, foot };
  }
  function qCafe(c) {
    const v = c.v, u = c.ui; let main = '', foot = '';
    if (u.scr === 'q') {
      if (v.fb && v.fb.s > u.ackS) { main = qFb(c, v.fb, v.fb.ok ? `+${v.fb.g} of every dish` : ''); foot = `${BTN('qmmap', '🥥 To the shack', 'lg-btn lgx-ghost', 'data-kbd="back"')}<span class="lgx-sp">${(v.cu || []).length} waiting</span>${BTN('qmnext', 'Next question ▶', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}`; }
      else { main = qQuestion(c); foot = `${BTN('qmmap', '🥥 To the shack', 'lg-btn lgx-ghost', 'data-kbd="back"')}<span class="lgx-sp">${(v.cu || []).length} customer${(v.cu || []).length === 1 ? '' : 's'} waiting</span>`; }
      return { main, foot };
    }
    const now = Date.now(), cus = v.cu || [];
    main = `<div class="qm-cust" role="list" aria-label="Customers">${[0, 1, 2].map(k => { const cu = cus[k]; if (!cu) return `<div class="qm-cu qmx-empty" role="listitem">Next customer soon…</div>`; const [id, av, o, left, pat] = cu, have = o.every(([i, n]) => v.stock[i] >= n), miss = o.filter(([i, n]) => v.stock[i] < n).map(([i, n]) => (n - v.stock[i]) + ' ' + CF[i][0]), l2 = Math.max(0, left - (now - c.cuAt)), pc = pat ? l2 / pat * 100 : 0; return `<div class="qm-cu" role="listitem"><span class="qmx-av" aria-hidden="true">${esc(AVS[av])}</span><div class="qmx-ord">${o.map(([i, n]) => `<span class="${v.stock[i] >= n ? '' : 'qmx-need'}" title="${esc(CF[i][0])}"><span aria-hidden="true">${CF[i][1]}</span>×${n}</span>`).join('')}</div><div class="qm-pat ${pc < 30 ? 'qmx-low' : ''}" aria-hidden="true"><i id="qm-pat-${id}" style="width:${pc.toFixed(1)}%"></i></div>${BTN('qmserve', have ? 'Serve' : 'Need stock', 'lg-sm ' + (have ? 'lgx-go' : ''), `data-k="${id}" ${have && !c.pending ? '' : 'disabled'} aria-label="${esc('Serve: ' + cfOrd(o) + (have ? '' : '. Missing ' + miss.join(', ')))}"`)}</div>`; }).join('')}</div>`;
    main += `<div class="qm-shelf" aria-label="Your stock">${CF.map((f, i) => i < v.un ? `<span class="qm-it ${v.stock[i] ? '' : 'qmx-out'}" title="${esc(f[0] + ' (' + f[3] + ')')}"><span aria-hidden="true">${f[1]}</span> ${esc(f[0])} <b>${v.stock[i]}</b> <small>$${cfPrice(i, v.il[i])}</small></span>` : i === v.un ? `<span class="qm-it qmx-lock"><span aria-hidden="true">🔒</span> ${esc(f[0])} <small>$${CF_UNL[i]} to add</small></span>` : '').join('')}</div>`;
    if (u.shop) {
      const opts = [];
      if (v.un < CF.length) opts.push(['un', `<span><span aria-hidden="true">${CF[v.un][1]}</span> Add ${esc(CF[v.un][0])}</span><b>$${CF_UNL[v.un]}</b><small>From ${esc(CF[v.un][3])}. New orders, bigger bills.</small>`, CF_UNL[v.un], 'Add ' + CF[v.un][0] + ' to the menu']);
      for (let i = 0; i < v.un; i++) if (v.il[i] < 3) { const cost = CF[i][2] * CF_UP[v.il[i] - 1]; opts.push(['i' + i, `<span><span aria-hidden="true">${CF[i][1]}</span> Better ${esc(CF[i][0])}</span><b>$${cost}</b><small>Price $${cfPrice(i, v.il[i])} → $${cfPrice(i, v.il[i] + 1)}</small>`, cost, 'Upgrade ' + CF[i][0]]); }
      if (v.cool < CF_COOL.length) opts.push(['cool', `<span><span aria-hidden="true">🧊</span> Bigger cooler</span><b>$${CF_COOL[v.cool]}</b><small>+1 of every dish each restock</small>`, CF_COOL[v.cool], 'Buy a bigger cooler']);
      main += `<div class="qm-panel" role="group" aria-label="Upgrades"><b>🛠️ Upgrades (you have $${fmt(v.cash)})</b><div class="qm-opts">${opts.map(([id, h, cost, lab]) => `<button type="button" class="qm-opt" data-px="qmbuy" data-pv="${VIEW}" data-k="${id}" ${v.cash >= cost && !c.pending ? '' : 'disabled'} aria-label="${esc(lab + ' for $' + cost + (v.cash >= cost ? '' : '. Not enough cash'))}">${h}</button>`).join('') || '<span>Everything is upgraded!</span>'}</div></div>`;
    }
    main += `<div class="qm-lb" id="qm-lb">${qMiniLb(c)}</div>`;
    foot = `${BTN('qmshop', u.shop ? '✕ Close upgrades' : '🛠️ Upgrades', 'lg-btn lgx-ghost')}<span class="lgx-sp"></span>${BTN('qmask', `📝 Restock: answer`, 'lg-btn lgx-gold lgx-big', 'data-kbd="ask"')}`;
    return { main, foot };
  }
  function qSandwich(c) {
    const v = c.v || {}, f = v.fin || { tps: [], miss: [], x: {} }, qn = v.qn || 0, ok = v.ok || 0, acc = qn ? Math.round(ok / qn * 100) : 0, x = f.x || {};
    const tps = (f.tps || []).map(([t, r, n]) => ({ t: (c.tp || [])[t] || 'Mixed questions', r, n })).filter(t => t.n);
    const strong = tps.filter(t => t.n >= 2 && t.r / t.n >= 0.75).sort((a, b) => b.r / b.n - a.r / a.n || b.n - a.n)[0];
    const weak = tps.filter(t => t.r < t.n).sort((a, b) => (b.n - b.r) - (a.n - a.r) || a.r / a.n - b.r / b.n).slice(0, 3);
    let good = !qn ? 'You joined the game and found out how it works. That is the first step.' : strong ? `You were strongest on <b>${esc(strong.t)}</b>, with ${strong.r} of ${strong.n} right.` : (v.best || 0) >= 3 ? `You put together a run of <b>${v.best} correct answers in a row</b>.` : ok ? `You answered <b>${ok} question${ok === 1 ? '' : 's'}</b> correctly and kept going to the end.` : `You kept going and tried <b>${qn} question${qn === 1 ? '' : 's'}</b>. Every attempt shows you something new.`;
    if (qn) good += ' ' + (c.mode === 'gold' ? (x.bc === 'x3' ? 'Your Triple gold chest was a brilliant moment.' : x.bc === 'x2' ? 'Doubling your gold was a smart pick.' : `You finished with ${fmt(v.g || 0)} gold.`) : c.mode === 'td' ? `You protected the reef for ${qUnit('td', v.w || 0)} and caught ${fmt(x.kills || v.kills || 0)} invaders.` : `You served ${fmt(x.sv || v.sv || 0)} customer${(x.sv || v.sv) === 1 ? '' : 's'}${(x.lo || v.lo || 0) === 0 && (x.sv || v.sv) ? ' and nobody left hungry' : ''}.`);
    let fix;
    if (!qn) fix = 'Answer some questions next time so the game can show you what to practise.';
    else if (!weak.length) fix = `Nothing to fix from this game: ${acc}% accuracy. Choose a harder level next time so the questions stretch you.`;
    else { const m = (f.miss || [])[0], q = m && c.qs && c.qs[m[0]]; fix = `Look again at what you missed on ${weak.map(t => `<b>${esc(t.t)}</b> (${t.n - t.r} question${t.n - t.r === 1 ? '' : 's'})`).join(', ')}.` + (q ? ` For example, “${esc(clipW(q.t.replace(/\n/g, ' '), 140))}”: the answer is <b>${esc(m[1].map(i => q.o[i]).filter(Boolean).join(' · '))}</b>.` : ''); }
    let next;
    if (qn && acc >= 85 && c.lv < 3) next = `You are ready for <b>${QLV[c.lv + 1][0]}</b> level. Try it next time and see how far you get.`;
    else if (qn && acc >= 85) next = 'Superb work at Challenge level. Try a new topic or a different Quest Mode next.';
    else if (qn && acc >= 60) next = weak[0] ? `Revisit <b>${esc(weak[0].t)}</b> in the course, then play again to beat ${esc(qUnit(c.mode, v.sc || 0))}.` : `Play again and try to beat ${esc(qUnit(c.mode, v.sc || 0))}.`;
    else next = `${c.live ? 'Try these questions again in <b>Solo practice</b>' : 'Use <b>Practise missed</b> to go over these questions'}${c.lv > 1 ? ', or play at <b>Foundation</b> level with hints' : ''}. Small steps add up fast.`;
    return { good, fix, next, acc };
  }
  function qEnd(c) {
    const v = c.v || {}, f = v.fin || {}, rk = f.rk || c.rk || 0, of = f.of || c.of || 0, sw = qSandwich(c), M = QMODES[c.mode];
    const medal = rk === 1 ? '🥇' : rk === 2 ? '🥈' : rk === 3 ? '🥉' : '🎉';
    const why = f.why === 'goal' ? (f.win ? 'You reached the goal first!' : (f.wn ? esc(f.wn) + ' reached the goal first.' : 'The goal was reached.')) : f.why === 'out' ? 'Every reef was overrun.' : f.why === 'host' ? 'Your teacher ended the game.' : "Time's up!";
    const miss = (f.miss || []).map(([q, a, w]) => { const Q = c.qs && c.qs[q]; return Q ? `<details><summary>${esc(clipW(Q.t.replace(/\n/g, ' '), 140))}</summary><p><b>Answer:</b> ${esc(a.map(i => Q.o[i]).filter(Boolean).join(' · '))}</p>${w ? `<p>${esc(w)}</p>` : ''}</details>` : ''; }).join('');
    const extra = c.mode === 'td' ? `<div><b>${fmt(v.w || 0)}</b>waves survived</div>` : c.mode === 'cafe' ? `<div><b>${fmt(v.sv || 0)}</b>customers served</div>` : `<div><b>${fmt(v.g || 0)}</b>gold</div>`;
    let main = `<div class="lg-center" style="flex:none"><div class="lgx-e" aria-hidden="true">${medal}</div><div class="lg-big">${rk ? `You finished ${ord(rk)}${of > 1 ? ' of ' + of : ''}` : 'Game over'}</div><p>${why} ${esc(M.name)} · ${QLV[c.lv][0]} · ${esc(qUnit(c.mode, v.sc || 0))}</p>${QR && QR.pb ? '<div class="lg-streak">🎉 New personal best</div>' : ''}</div>
      <div class="qm-sw" aria-label="Your feedback"><div><h3>⭐ What went well</h3><p>${sw.good}</p></div><div><h3>🔧 What to work on</h3><p>${sw.fix}</p></div><div><h3>🚀 Your next step</h3><p>${sw.next}</p></div></div>
      <div class="lg-sum">${extra}<div><b>${fmt(v.ok || 0)}/${fmt(v.qn || 0)}</b>correct</div><div><b>${sw.acc}%</b>accuracy</div><div><b>🔥 ${v.best || 0}</b>best run</div></div>`;
    if (QR && QR.kind === 'hw') main += `<p class="lg-hint" role="status">${QR.posting ? 'Saving your result…' : QR.posted ? '✓ Your result is saved for your teacher.' : QR.postErr ? esc(QR.postErr) : ''}</p>`;
    else if (QR && QR.kind === 'prev') main += '<p class="lg-hint">Preview only: nothing was saved.</p>';
    else if (QR && QR.saved) main += `<p class="lg-hint" role="status">✓ Saved to your assessment history.</p>`;
    if (miss) main += `<div class="lg-rev"><b>Review what you missed</b>${miss}</div>`;
    main += `<div class="qm-lb">${qMiniLb(c)}</div>`;
    let foot;
    if (QR) foot = `${QR.kind === 'hw' && QR.postErr && !QR.posting ? BTN('qmretry', 'Try again', 'lg-btn lgx-ghost') : ''}<span class="lgx-sp"></span>${QR.kind === 'solo' && (f.miss || []).length ? BTN('qmmissed', '🔁 Practise missed', 'lg-btn lgx-ghost') : ''}${QR.kind === 'solo' ? BTN('qmagain', '▶ Play again', 'lg-btn lgx-ghost') : ''}${BTN('qmdone', 'Done', 'lg-btn lgx-gold', 'data-kbd="next"')}`;
    else foot = `<span class="lgx-sp">Final results</span>${BTN('pleave', 'Done', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}`;
    return { main, foot };
  }
  function qArena(c) {
    const M = QMODES[c.mode], v = c.v, u = c.ui, sig = qSig(c); QSIG = sig;
    let main = '', foot = '';
    const top = `<div class="lg-top"><span class="lgx-ttl"><span aria-hidden="true">${M.ic}</span> ${esc(M.name)}</span>${c.ph === 'play' && v ? `<span class="lg-cx" id="qm-score" aria-label="Your score">${qScoreChip(c)}</span>` : ''}${c.ph === 'play' ? `<span class="lg-cx" aria-label="Time left">⏱ <span id="qm-time">${qClock(c.left)}</span></span>` : ''}${BTN('mute', muted() ? '🔇' : '🔊', 'lg-cx', `aria-label="${muted() ? 'Turn sound on' : 'Turn sound off'}" data-kbd="mute"`)}${BTN('fs', '⛶', 'lg-cx', 'aria-label="Full screen" data-kbd="fs"')}${c.live ? BTN('pask', '✕ Leave', 'lg-cx') : BTN(c.ph === 'end' ? 'qmdone' : 'qmexit', '✕ Exit', 'lg-cx', 'aria-label="Exit the game"')}</div>`;
    if (c.ph === 'ready' || c.ph === 'lobby') {
      const endTxt = qEndTxt(c.mode, c.end, c.mins, c.goal);
      main = `<div class="lg-center"><div class="lgx-e" aria-hidden="true">${c.live ? esc(c.av) : M.ic}</div><div class="lg-big">${c.live ? (v ? "You're in!" : 'Almost in…') : esc(M.name)}</div><p>${c.live ? `Get ready for <b>${M.ic} ${esc(M.name)}</b>.` : esc(M.blurb)}</p><ol class="qm-how">${M.how.map(x => `<li>${esc(x)}</li>`).join('')}</ol><div class="qm-stats"><span class="qm-stat">${QLV[c.lv][1]} ${QLV[c.lv][0]}</span><span class="qm-stat">⏱ ${esc(endTxt)}</span>${c.live ? '' : `<span class="qm-stat">👥 ${c.rivals} practice rivals</span>`}</div><p style="opacity:.9;font-size:.95rem">${esc(QLV[c.lv][2])}</p>`;
      if (c.live) main += `<div class="lg-badge" style="width:96px">${badge(P.pin)}</div><div class="lg-wait">Waiting for the host to start <i></i><i></i><i></i></div>${BTN('qmfs', '⛶ Full screen', 'lg-btn lgx-ghost')}</div>`;
      else main += `${BTN('qmgo', "▶ Let's play", 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}<p style="opacity:.8;font-size:.9rem">Keys: 1 to 6 answer${c.lv === 1 ? ' · H hint' : ''} · Enter next · M sound · F full screen</p></div>`;
    } else if (c.ph === 'end') { const r = qEnd(c); main = r.main; foot = r.foot; }
    else if (!c.qs) main = `<div class="lg-center"><div class="lg-big">Loading the questions…</div><div class="lg-wait">One moment <i></i><i></i><i></i></div></div>`;
    else if (!v) main = `<div class="lg-center"><div class="lg-big">Joining the game…</div><div class="lg-wait">Syncing with the big screen <i></i><i></i><i></i></div></div>`;
    else {
      const r = c.mode === 'gold' ? qGold(c) : c.mode === 'td' ? qTd(c) : qCafe(c);
      const side = c.mode === 'gold' ? `<div class="qm-lb" id="qm-lb">${qMiniLb(c)}</div>` : '';
      main = `<div class="qm-nt" id="qm-nt" aria-hidden="true">${qNtHTML(c)}</div>${qStats(c)}${side ? `<div class="qm-play"><div class="qm-col">${r.main}</div>${side}</div>` : r.main}`; foot = r.foot;
    }
    let ov = '';
    if (c.pz && c.ph === 'play') ov = `<div class="lg-ov"><div class="lgx-e" style="font-size:3rem" aria-hidden="true">⏸️</div><div class="lg-big">Paused</div><p>Your teacher paused the game.</p></div>`;
    if (u.ask) ov = `<div class="lg-ov" role="dialog" aria-label="Exit the game"><div class="lg-big">${QR && QR.kind === 'hw' ? 'Finish now?' : 'Exit the game?'}</div><p>${QR && QR.kind === 'hw' ? 'Your game ends here and your result is handed in.' : 'This game ends and its score is not kept.'}</p><div class="lg-foot" style="background:none">${BTN('qmnoexit', 'Keep playing', 'lg-btn lgx-ghost')}${BTN('qmquit', QR && QR.kind === 'hw' ? 'Finish and hand in' : 'Exit', 'lg-btn lgx-gold')}</div></div>`;
    if (P && P.ask && c.live) ov = `<div class="lg-ov" role="dialog" aria-label="Leave game"><div class="lg-big">Leave the game?</div><p>You can join again with the same PIN and keep your score.</p><div class="lg-foot" style="background:none">${BTN('pnoask', 'Stay', 'lg-btn lgx-ghost')}${BTN('pleave', 'Leave', 'lg-btn lgx-gold')}</div></div>`;
    const banner = c.live && P.conn === false ? `<div class="lg-banner" id="lg-pban">Reconnecting…</div>` : '';
    const flashH = `<div class="lg-toast" id="lg-flash" role="status" ${FLASH.m && Date.now() - FLASH.at < 2600 ? '' : 'hidden'}>${esc(FLASH.m)}</div>`;
    return `<div class="lg-arena qmx-${c.mode} ${c.live ? 'lgx-phone' : 'lgx-solo'}" tabindex="-1" role="region" aria-label="${esc(M.name)}" data-sig="${esc(sig.slice(0, 120))}">${qBub()}${banner}${top}<div class="lg-main" id="qm-main">${main}</div>${foot ? `<div class="lg-foot">${foot}</div>` : ''}${ov}${flashH}</div>`;
  }
  function qPartial(c) {
    if (!c) return; const v = c.v || {};
    const set = (id, h) => { const el = $(id); if (el && el.innerHTML !== h) el.innerHTML = h; };
    const tx = (id, t) => { const el = $(id); if (el && el.textContent !== t) el.textContent = t; };
    if (c.ph === 'play') { tx('qm-time', qClock(c.left)); set('qm-score', qScoreChip(c)); if (c.rk) tx('qm-rank', '🏅 ' + ord(c.rk) + (c.of ? ' of ' + c.of : '')); if (c.mode === 'gold') tx('qm-gold', '💰 ' + fmt(v.g || 0) + ' gold'); }
    set('qm-lb', qMiniLb(c)); set('qm-nt', qNtHTML(c));
    if (c.mode === 'cafe' && v.cu) { const now = Date.now(); v.cu.forEach(cu => { const el = $('qm-pat-' + cu[0]); if (!el) return; const l = Math.max(0, cu[3] - (now - c.cuAt)), p = cu[4] ? l / cu[4] * 100 : 0; el.style.width = p.toFixed(1) + '%'; el.parentNode.classList.toggle('qmx-low', p < 30); }); }
  }

  /* ---------- rendering: host on the projector ---------- */
  function qhLbHTML() {
    const s = QH.srv, r = qsRanked(s).slice(0, 10); if (!r.length) return '<p class="lg-hint">No players yet.</p>';
    const mx = Math.max(1, ...r.map(p => qsScore(s, p)));
    return `<div class="lg-lb" role="list">${r.map((p, i) => `<div class="lg-row qmx-still ${p.online ? '' : 'lg-off'}" role="listitem"><i class="lgx-fill" style="width:${Math.round(qsScore(s, p) / mx * 100)}%"></i><span class="lgx-rk">${i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</span><span class="lgx-av" aria-hidden="true">${esc(p.av)}</span><span class="lgx-nm">${esc(p.nick)}${p.st >= 3 ? `<span class="lgx-fire">🔥${p.st}</span>` : ''}${s.mode === 'td' ? `<span class="lgx-sub">${p.out ? 'overrun' : '❤️ ' + p.hp}</span>` : s.mode === 'cafe' ? `<span class="lgx-sub">😀 ${p.sv}</span>` : ''}</span><span class="lgx-sc">${esc(qUnit(s.mode, qsScore(s, p)))}</span></div>`).join('')}</div>`;
  }
  function qhStatsHTML() { const s = QH.srv, L = Object.values(s.players), n = L.reduce((a, p) => a + p.qn, 0), ok = L.reduce((a, p) => a + p.ok, 0); return `<span class="qm-stat">📝 ${fmt(n)} answers</span><span class="qm-stat">✓ ${n ? Math.round(ok / n * 100) : 0}% correct</span><span class="qm-stat">👥 ${L.filter(p => p.online).length} playing</span>`; }
  const qhEvHTML = () => QH.srv.ev.slice(-6).reverse().map(e => `<p>${esc(e[1])}</p>`).join('') || '<p>Big moments appear here as students play.</p>';
  const qhRosterHTML = () => { const L = Object.values(QH.srv.players).sort((a, b) => a.join - b.join); return L.length ? L.map(p => `<button type="button" class="lg-pl ${p.online ? '' : 'lg-off'}" data-px="qhkick" data-pv="${VIEW}" data-k="${esc(p.key)}" aria-label="Remove ${esc(p.nick)}"><span class="lgx-e" aria-hidden="true">${esc(p.av)}</span><span class="lgx-n">${esc(p.nick)}</span></button>`).join('') : `<div class="lg-wait" aria-live="polite">Waiting for players <i></i><i></i><i></i></div>`; };
  function qhArena() {
    const h = QH, s = h.srv, M = QMODES[s.mode], ph = s.ph, r = qsRanked(s);
    const top = `<div class="lg-top"><span class="lgx-ttl"><span aria-hidden="true">${M.ic}</span> ${esc(h.title)}</span><span class="lg-cx">${QLV[s.lv][1]} ${QLV[s.lv][0]}</span><span class="lg-cx" aria-label="Game PIN">PIN ${esc(pinFmt(h.pin))}</span>${BTN('qhdrawer', `👥 <span id="qh-pc">${r.filter(p => p.online).length}</span>`, 'lg-cx', 'aria-label="Players"')}${BTN('mute', muted() ? '🔇' : '🔊', 'lg-cx', `aria-label="${muted() ? 'Turn sound on' : 'Turn sound off'}" data-kbd="mute"`)}${BTN('fs', '⛶', 'lg-cx', 'aria-label="Full screen" data-kbd="fs"')}${BTN('qhask', ph === 'end' ? '✕ Close' : '✕ End', 'lg-cx', 'aria-label="End game"')}</div>`;
    let main = '', foot = '';
    const banner = h.dead ? `<div class="lg-banner">The live connection was lost. Scores so far are kept: open Results to export them.</div>` : h.conn === false ? `<div class="lg-banner">Reconnecting…</div>` : '';
    const endTxt = qEndTxt(s.mode, s.end, Math.round(s.ms / 60000), s.goal);
    if (h.view === 'results') {
      const { head, rows } = qhRows();
      main = `<h2 class="lg-big">Results</h2><div class="lg-res lg-tw"><table><thead><tr>${head.map(x => `<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(rw => `<tr>${rw.map((c, i) => `<td class="${i > 1 ? 'lg-num' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('') || `<tr><td colspan="${head.length}">No players.</td></tr>`}</tbody></table></div>
        <div class="lg-res"><b>Question check (hardest first)</b><div class="lg-qa" style="margin-top:8px">${s.qs.map((q, i) => [q, s.qst[i] || [0, 0], i]).filter(x => x[1][1]).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1]).slice(0, 15).map(([q, [ok, of], i]) => { const p = Math.round(ok / of * 100); return `<div class="lgx-r"><span><b>${p}% correct</b> · ${of} answer${of === 1 ? '' : 's'} · ${esc(clipW(q.t.replace(/\n/g, ' '), 120))}</span><div class="lgx-bar"><i style="width:${p}%"></i></div></div>`; }).join('') || '<p>No answers yet.</p>'}</div></div>
        <p class="lg-hint">${!CAP.db ? 'Download the CSV to keep these results.' : h.saved === 'ok' ? '✓ Saved to Past games in the class records.' : h.saved === 'full' ? 'The class database is full, so these results were not saved. Download the CSV.' : h.saved === 'err' ? 'These results did not save. Use Save again or download the CSV.' : 'Saving…'}</p>`;
      foot = `${BTN('qhback', '← Podium', 'lg-btn lgx-ghost')}<span class="lgx-sp"></span>${BTN('qhcsv', '⬇ Export CSV', 'lg-btn lgx-ghost')}${CAP.db ? BTN('qhsave', '💾 Save again', 'lg-btn lgx-ghost') : ''}${BTN('qhclose', 'Close game', 'lg-btn lgx-gold', 'data-kbd="next"')}`;
    } else if (ph === 'lobby') {
      const L = Object.values(s.players);
      main = `<div class="lg-lobby"><div class="lg-joinbox"><div class="lgx-how">On your phone or laptop: open this course, tap <b>Live Quiz</b>, then <b>Join a game</b>.</div><div class="lg-pinrow"><div><div class="lg-lab">Game PIN</div><div class="lg-pin">${esc(pinFmt(h.pin))}</div></div><div class="lg-badge">${badge(h.pin)}</div></div><div class="lg-lab">${M.ic} ${esc(M.name)} · ${QLV[s.lv][0]} · ${esc(endTxt)} · ${s.qs.length} questions${h.locked ? ' · 🔒 locked' : ''}</div><div style="font-weight:700">${esc(M.blurb)}</div></div>
        <div class="lg-side"><div class="lg-big" style="text-align:left"><span id="qh-cnt">${L.length}</span> player${L.length === 1 ? '' : 's'}</div><div class="lg-roster" id="qh-roster">${qhRosterHTML()}</div></div></div>`;
      foot = `<span class="lgx-sp">Tap a name to remove it.<span class="lgx-kh"> Keys: Enter starts.</span></span>${BTN('qhlock', h.locked ? '🔓 Unlock' : '🔒 Lock', 'lg-btn lgx-ghost')}${BTN('qhstart', '▶ Start', 'lg-btn lgx-gold lgx-big', `data-kbd="next" ${L.length ? '' : 'disabled'} id="qh-start"`)}`;
    } else if (ph === 'play') {
      const lead = r[0], prog = s.end === 'goal' && lead ? clamp(qsScore(s, lead) / s.goal * 100, 0, 100) : 0;
      main = `<div class="qh-grid"><div class="qm-col"><h2 class="lg-big" style="text-align:left">Leaderboard</h2><div id="qh-lb">${qhLbHTML()}</div></div><div class="qm-col"><div class="lg-joinbox"><div class="lg-lab">${h.paused ? '❚❚ Paused' : 'Time left'}</div><div class="qh-clock" id="qh-time" role="timer">${qClock(s.cap - s.t)}</div>${s.end === 'goal' ? `<div class="lg-lab">${esc(qGoalTxt(s.mode, s.goal))}</div><div class="qm-prog" aria-hidden="true"><i id="qh-prog" style="width:${prog.toFixed(0)}%"></i></div>` : ''}<div class="lg-lab">Join late with PIN <b>${esc(pinFmt(h.pin))}</b></div></div><div class="qm-stats" id="qh-stat">${qhStatsHTML()}</div><div class="lg-lab lg-white">Live feed</div><div class="qh-ev" id="qh-ev">${qhEvHTML()}</div></div></div>`;
      foot = `${BTN('qhpause', h.paused ? '▶ Resume' : '❚❚ Pause', 'lg-btn lgx-ghost', 'data-kbd="pause"')}<span class="lgx-sp">${M.ic} ${esc(M.name)} · ${QLV[s.lv][0]} · ${esc(endTxt)}</span>${BTN('qhendnow', '⏹ End now', 'lg-btn lgx-gold')}`;
    } else {
      const t3 = r.slice(0, 3);
      main = `<h2 class="lg-big">🏆 Podium</h2><p class="lg-hint" style="margin:-6px 0 0">${esc(h.title)} · ${esc(M.name)}</p><div class="lg-podium">${[[1, 'lgx-p2'], [0, 'lgx-p1'], [2, 'lgx-p3']].map(([k, cls]) => { const p = t3[k]; return `<div class="lg-pc ${cls} ${p ? '' : 'lgx-empty'}"><div class="lgx-who">${p ? `<span class="lgx-e" aria-hidden="true">${esc(p.av)}</span><span class="lgx-nm">${esc(p.nick)}</span><span class="lgx-sc">${esc(qUnit(s.mode, qsScore(s, p)))}</span>` : ''}</div><div class="lgx-ped" aria-label="${ord(k + 1)} place">${k + 1}</div></div>`; }).join('')}</div>`;
      foot = `<span class="lgx-sp">${r.length} player${r.length === 1 ? '' : 's'} · ${fmt(r.reduce((a, p) => a + p.qn, 0))} answers</span>${BTN('qhresults', '📊 Results', 'lg-btn lgx-gold lgx-big', 'data-kbd="next"')}`;
    }
    let ov = '';
    if (h.ask) ov = `<div class="lg-ov" role="dialog" aria-label="End game"><div class="lg-big">${ph === 'end' ? 'Close this game?' : 'End this game now?'}</div><p>${ph === 'end' ? 'Players keep their final screen. Export the results first if you need them.' : 'Everyone sees their final score and feedback.'}</p><div class="lg-foot" style="background:none">${BTN('qhnoask', 'Keep going', 'lg-btn lgx-ghost')}${BTN(ph === 'end' ? 'qhclose' : 'qhendnow', ph === 'end' ? 'Close game' : 'End game', 'lg-btn lgx-gold')}</div></div>`;
    if (h.askKick && s.players[h.askKick]) { const p = s.players[h.askKick]; ov = `<div class="lg-ov" role="dialog" aria-label="Remove player"><div class="lgx-e" style="font-size:3rem">${esc(p.av)}</div><div class="lg-big">Remove ${esc(p.nick)}?</div><p>They leave the game and cannot rejoin with this nickname.</p><div class="lg-foot" style="background:none">${BTN('qhnokick', 'Cancel', 'lg-btn lgx-ghost')}${BTN('qhkickyes', 'Remove', 'lg-btn lgx-gold', `data-k="${esc(p.key)}"`)}</div></div>`; }
    const drawer = h.drawer ? `<div class="lg-drawer" role="dialog" aria-label="Players"><div class="lg-prow"><b>Players (${r.length})</b>${BTN('qhdrawer', '✕', 'lg-cx', 'aria-label="Close players"')}</div>${r.map(p => `<div class="lg-drow ${p.online ? '' : 'lg-off'}"><span aria-hidden="true">${esc(p.av)}</span><span class="lgx-n">${esc(p.nick)}</span><span class="lg-num">${esc(qUnit(s.mode, qsScore(s, p)))}</span>${BTN('qhkick', 'Remove', 'lg-cx', `data-k="${esc(p.key)}" aria-label="Remove ${esc(p.nick)}"`)}</div>`).join('') || '<p>No players yet.</p>'}<p style="opacity:.8;font-size:.9rem">Faded names have closed the game on their device.</p></div>` : '';
    const flashH = `<div class="lg-toast" id="lg-flash" role="status" ${FLASH.m && Date.now() - FLASH.at < 2600 ? '' : 'hidden'}>${esc(FLASH.m)}</div>`;
    return `<div class="lg-arena lgx-host qmx-${s.mode}" tabindex="-1" role="region" aria-label="${esc(M.name)} host screen" data-sig="qh${ph}${h.view}${h.paused ? 1 : 0}">${qBub()}${banner}${top}<div class="lg-main">${main}</div><div class="lg-foot">${foot}</div>${drawer}${ov}${flashH}<div class="sr" aria-live="polite">${ph === 'play' ? 'The game is running' : ph === 'end' ? 'Game over' : ''}</div></div>`;
  }
  function qhUpd(force) {
    if (!QH || !API || API.S.loc.v !== VIEW) return; const s = QH.srv;
    const set = (id, h) => { const el = $(id); if (el && el.innerHTML !== h) el.innerHTML = h; };
    const pc = $('qh-pc'); if (pc) pc.textContent = Object.values(s.players).filter(p => p.online).length;
    if (s.ph === 'lobby') { set('qh-roster', qhRosterHTML()); const c = $('qh-cnt'); if (c) c.textContent = Object.keys(s.players).length; const b = $('qh-start'); if (b) b.disabled = !Object.keys(s.players).length; }
    if (s.ph === 'play') {
      const t = $('qh-time'); if (t) t.textContent = qClock(s.cap - s.t);
      if (force || !QH.updAt || Date.now() - QH.updAt > 450) { QH.updAt = Date.now(); set('qh-lb', qhLbHTML()); set('qh-ev', qhEvHTML()); set('qh-stat', qhStatsHTML()); const pg = $('qh-prog'), lead = qsRanked(s)[0]; if (pg && lead) pg.style.width = clamp(qsScore(s, lead) / s.goal * 100, 0, 100).toFixed(0) + '%'; }
    }
  }

  /* ---------- the Quest Modes tab ---------- */
  function questTab() {
    const c = LG().qcfg, mode = qModeOf(c), M = QMODES[mode], lv = qLvOf(c);
    let h = '';
    const s = ss.get('lg.qhost');
    if (CAP.admin && CAP.room && s && s.pin && s.srv && s.srv.ph !== 'end' && Date.now() - (s.at || 0) < 3 * 3600e3) h += `<div class="card"><span class="kicker">Quest game in progress</span><h2>${esc(s.title || 'Quest game')} · PIN ${esc(pinFmt(s.pin))}</h2><p class="hint">${s.srv.ph === 'lobby' ? 'Still in the lobby.' : 'The game was running.'} Players keep their scores when you resume.</p><div class="row">${BTN('qhresume', '▶ Resume game', 'btn go', HS.busy ? 'disabled' : '')}${BTN('qhdiscard', 'Discard it', 'btn ghost')}</div></div>`;
    h += `<div class="card"><span class="kicker">⚔️ Quest Modes</span><h2>Play a game world with your questions</h2><p class="hint">Everyone answers at their own pace. Every correct answer powers your game, so the more you know, the further you go.</p>
      <div class="lg-f"><span class="lgx-lab">Choose a game</span><div class="qm-modes" role="group" aria-label="Quest Mode">${QMK.map(k => { const m = QMODES[k]; return `<button type="button" class="qm-mode" data-px="qmmode" data-pv="${VIEW}" data-k="${k}" aria-pressed="${mode === k}"><span class="qmx-ic" aria-hidden="true">${m.ic}</span><b>${m.name}</b><span>${esc(m.blurb)}</span></button>`; }).join('')}</div></div>
      <div class="lg-f"><span class="lgx-lab">Level</span><div class="lg-seg" role="group" aria-label="Level">${[1, 2, 3].map(l => `<button type="button" class="chip ${lv === l ? 'sel' : ''}" aria-pressed="${lv === l}" data-px="qmlv" data-pv="${VIEW}" data-k="${l}">${QLV[l][1]} ${QLV[l][0]}</button>`).join('')}</div><span class="qm-lvd">${esc(QLV[lv][2])}</span></div>
      <div class="lg-grid"><div class="lg-f"><span class="lgx-lab">The game ends</span><div class="lg-seg" role="group" aria-label="The game ends">${[['time', '⏱ On a timer'], ['goal', '🎯 At a goal']].map(([k, l]) => `<button type="button" class="chip ${(c.end === 'goal' ? 'goal' : 'time') === k ? 'sel' : ''}" aria-pressed="${(c.end === 'goal' ? 'goal' : 'time') === k}" data-px="qmend" data-pv="${VIEW}" data-k="${k}">${l}</button>`).join('')}</div></div>${c.end === 'goal' ? selF('qcfg', 'goal', 'Goal', M.goals.map(g => [String(g), qGoalTxt(mode, g)])) : selF('qcfg', 'mins', 'Game length', QMINS.map(m => [String(m), m + ' minutes']))}</div>
      ${srcPicker('qcfg', 'qcfg')}
      <div class="lg-tog">${togF('qcfg', 'music', 'Music')}</div>
      ${HS.qerr ? `<p class="lg-err" role="alert">${esc(HS.qerr)}</p>` : ''}
      <div class="row">${BTN('qmsolo', '▶ Play solo', 'btn gold')}${CAP.admin && CAP.room ? BTN('qmhost', HS.busy ? 'Opening the game…' : '🎤 Host for the class', 'btn go', HS.busy ? 'disabled' : '') : ''}<span class="hint">Solo games are against practice rivals and work offline too.</span></div>
      ${CAP.admin && !CAP.room && CAP.st === 'ready' ? `<p class="hint">${esc(NEEDLINK)}</p>` : ''}</div>`;
    if (CAP.admin && CAP.db) {
      if (!c.due) c.due = nextFriday();
      h += `<div class="card"><span class="kicker">Quest homework</span><h2>Set ${esc(M.name)} as homework</h2><p class="hint">Students play it on their own against practice rivals before the due date, with the level, length and questions chosen above. Their game score, answers and accuracy save for you under Homework.</p>
        <div class="lg-grid"><div class="lg-f"><label for="lg-qdue">Due</label><input id="lg-qdue" type="datetime-local" data-lgi="qcfg.due" value="${esc(c.due)}"></div>${selF('qcfg', 'att', 'Attempts', [['1', '1 attempt'], ['2', '2 attempts'], ['3', '3 attempts'], ['0', 'Unlimited (best counts)']])}<div class="lg-f"><label for="lg-qcfg-title">Title (optional)</label><input id="lg-qcfg-title" type="text" maxlength="60" data-lgi="qcfg.title" value="${esc(c.title)}" placeholder="${esc(M.name + ': ' + srcLabel(c, 'qcfg'))}"></div></div>
        ${HW.qerr ? `<p class="lg-err" role="alert">${esc(HW.qerr)}</p>` : ''}
        <div class="row">${BTN('qmhw', HW.busy ? 'Saving…' : '📚 Assign as homework', 'btn gold', HW.busy ? 'disabled' : '')}</div></div>`;
    }
    const b = LG().qbest || {}, bl = QMK.flatMap(k => [1, 2, 3].filter(l => (k + l) in b).map(l => `<span class="pill lgx-ok">${QMODES[k].ic} ${QMODES[k].name} (${QLV[l][0]}): ${esc(qUnit(k, b[k + l]))}</span>`));
    if (bl.length) h += `<div class="card"><span class="kicker">Your best Quest scores</span><div class="lg-best">${bl.join(' ')}</div></div>`;
    return h;
  }

  /* ---------- clicks for Quest Modes (actions start with qm or qh) ---------- */
  function qmClick(a, el, api) {
    const d = el.dataset, k = d.k, c = qc(), u = c && c.ui;
    if (c && u && !u.fsTried && c.live && a !== 'qmfs') { u.fsTried = true; qFs(); }
    switch (a) {
      case 'qmmode': { const g = LG().qcfg; if (QMODES[k]) { g.mode = k; g.goal = String(QMODES[k].goal); api.save(); } break; }
      case 'qmlv': { const g = LG().qcfg, l = clamp(+k || 2, 1, 3); g.lv = String(l); if (l === 1 && String(g.mins) === '5') g.mins = '7'; else if (l !== 1 && String(g.mins) === '7') g.mins = '5'; api.save(); break; }
      case 'qmend': { const g = LG().qcfg; g.end = k === 'goal' ? 'goal' : 'time'; if (!QMODES[qModeOf(g)].goals.includes(+g.goal)) g.goal = String(QMODES[qModeOf(g)].goal); api.save(); break; }
      case 'qmsolo': qSoloFromCfg(); return;
      case 'qmhost': qhCreate(); return;
      case 'qmhw': qHwCreate(); return;
      case 'qmgo': if (QR && QR.ph === 'ready') { QR.ph = 'play'; QR.last = Date.now(); QR.ui.fsTried = true; qEvents(qc()); sfx('go'); paint(); qFs(); say('Game on. ' + QMODES[QR.mode].how[0]); } return;
      case 'qmfs': if (u) u.fsTried = true; qFs(); return;
      case 'qmans': {
        if (!c || !c.v || c.pending || c.ph !== 'play') return; const q = c.qs && c.qs[c.v.cq], i = +d.i; if (!q || u.hide.includes(i)) return;
        if (q.k === 'ma') { const j = u.sel.indexOf(i); if (j >= 0) u.sel.splice(j, 1); else u.sel.push(i); sfx('pick'); break; }
        qSend('a', c.v.cq, [i]); return;
      }
      case 'qmsub': if (c && c.v && u.sel.length) qSend('a', c.v.cq, u.sel.slice().sort((x, y) => x - y)); return;
      case 'qmhint': { if (!c || !c.v || c.lv !== 1 || u.hint) return; const q = c.qs[c.v.cq]; if (!q || !(q.hw >= 0)) return; u.hint = true; u.hide = [q.hw]; u.sel = u.sel.filter(x => x !== q.hw); sfx('power'); say('One wrong answer removed.'); break; }
      case 'qmnext': if (!c || !c.v) return; if (c.v.res) u.resAck = c.v.res.id; if (c.v.fb) u.ackS = Math.max(u.ackS, c.v.fb.s); u.scr = 'q'; break;
      case 'qmchest': qSend('c', +k); qsfx('chest'); return;
      case 'qmtgt': qSend('t', +k); return;
      case 'qmask': if (!u) return; if (c.v && c.v.fb) u.ackS = Math.max(u.ackS, c.v.fb.s); u.scr = 'q'; u.pad = -1; break;
      case 'qmmap': if (!u) return; if (c.v && c.v.fb) u.ackS = Math.max(u.ackS, c.v.fb.s); u.scr = 'game'; break;
      case 'qmpad': if (!u) return; u.pad = u.pad === +k ? -1 : +k; break;
      case 'qmbuild': if (u && u.pad >= 0) { qSend('b', u.pad, String(k)); qsfx('build'); } return;
      case 'qmup': if (u && u.pad >= 0) { qSend('u', u.pad); qsfx('buy'); } return;
      case 'qmsell': if (u && u.pad >= 0) { const p = u.pad; u.pad = -1; qSend('x', p); qsfx('coin'); } return;
      case 'qmwave': if (u && c.v && !c.v.need && !(u.anim && !u.anim.done)) { u.pad = -1; if (c.v.wv) u.wvAck = c.v.wv.id; qSend('w'); } return;
      case 'qmfast': if (u && u.anim) { u.anim.sp = u.anim.sp >= 4 ? 1 : u.anim.sp * 2; } break;
      case 'qmskip': if (u && u.anim && !u.anim.done) { qAnimFinish(u.anim, false); } break;
      case 'qmwvok': if (u && c.v && c.v.wv) u.wvAck = c.v.wv.id; break;
      case 'qmserve': qSend('s', +k); return;
      case 'qmbuy': qSend('p', String(k)); qsfx('buy'); return;
      case 'qmshop': if (u) u.shop = !u.shop; break;
      case 'qmexit': if (u) u.ask = true; break;
      case 'qmnoexit': if (u) u.ask = false; break;
      case 'qmquit': if (!QR) return; QR.ui.ask = false; if (QR.kind === 'hw' && QR.ph === 'play') { qsEnd(QR.srv, 'time'); qSoloEnd(); return; } QR.coins = 0; qClose(); break;
      case 'qmfinish': if (QR && QR.ph === 'play') { qsEnd(QR.srv, 'out'); qSoloEnd(); } return;
      case 'qmdone': qClose(); break;
      case 'qmretry': if (QR) qHwSubmit(QR); return;
      case 'qmagain': { if (!QR || !QR.src) return; const o = QR, cfg = o.src.c; qClose(); const P0 = poolOf(cfg, 'qcfg'), lv = qLvOf(cfg), mode = qModeOf(cfg), pk = qBuild(P0, lv); qSoloStart({ mode, lv, end: cfg.end === 'goal' ? 'goal' : 'time', mins: qMins(cfg), goal: qGoal(cfg), qs: pk.qs, tp: pk.tp, title: o.title, music: o.music, src: o.src }); return; }
      case 'qmmissed': { if (!QR) return; const s = QR.srv, ids = [...new Set(s.players.me.hist.filter(h => !h[1]).map(h => s.qs[h[0]] && s.qs[h[0]].id).filter(Boolean))], B = bank(), qs = ids.map(id => B.byId[id]).filter(Boolean); qClose(); const rng = RNG(rseed()); rStart(shuf(qs, rng).map(q => prep(q, true, rng)), { mode: 'solo', title: 'Missed questions', key: '', dur: 0, pw: true, music: LG().scfg.music !== false }); return; }
      case 'qhstart': if (QH && QH.srv.ph === 'lobby') qhStart(); return;
      case 'qhpause': if (QH && QH.srv.ph === 'play') { QH.paused = !QH.paused; QH.last = Date.now(); qhPublish(true); } break;
      case 'qhask': if (QH) QH.ask = true; break;
      case 'qhnoask': if (QH) QH.ask = false; break;
      case 'qhendnow': if (QH) { QH.ask = false; qhEndNow(); } return;
      case 'qhresults': if (QH) QH.view = 'results'; break;
      case 'qhback': if (QH) QH.view = 'game'; break;
      case 'qhcsv': if (QH) qhCSV(); return;
      case 'qhsave': if (QH) { QH.saved = ''; qhSaveResults(); } break;
      case 'qhclose': if (QH) { QH.ask = false; qhClose(); } return;
      case 'qhlock': if (QH) { QH.locked = !QH.locked; qhSave(); } break;
      case 'qhdrawer': if (QH) QH.drawer = !QH.drawer; break;
      case 'qhkick': if (QH) QH.askKick = k; break;
      case 'qhkickyes': qhKick(k); return;
      case 'qhnokick': if (QH) QH.askKick = ''; break;
      case 'qhresume': qhResume(); return;
      case 'qhdiscard': ss.set('lg.qhost', null); break;
      default: return;
    }
    paint();
  }
  function qPre() {
    if (!qActive()) return null;
    const ar = document.querySelector('#lg-portal .lg-arena'), m = ar && ar.querySelector('.lg-main'), a = document.activeElement;
    const f = a && ar && ar.contains(a) && a !== ar && a.dataset ? { px: a.dataset.px, k: a.dataset.k, i: a.dataset.i, id: a.id } : null;
    return { f, sc: m ? m.scrollTop : 0, sig: ar ? ar.dataset.sig : '' };
  }
  function qPost(keep) {
    if (!qActive()) return;
    const ar = document.querySelector('#lg-portal .lg-arena'), pe = $('lg-portal'); if (!ar || !pe) return;
    const slot = $('qm-cvslot'); if (slot) { const cv = qCanvas(); if (cv.parentNode !== slot) slot.appendChild(cv); }
    pe.appendChild(qSr());
    if (keep) {
      const m = ar.querySelector('.lg-main'); if (m && keep.sig === ar.dataset.sig) m.scrollTop = keep.sc;
      if (keep.f) { let el = keep.f.id ? document.getElementById(keep.f.id) : null; if (!el && keep.f.px) el = ar.querySelector(`[data-px="${CSS_ESC(keep.f.px)}"]${keep.f.k != null ? `[data-k="${CSS_ESC(keep.f.k)}"]` : ''}${keep.f.i != null ? `[data-i="${CSS_ESC(keep.f.i)}"]` : ''}`); if (el && !el.disabled && ar.contains(el)) { try { el.focus({ preventScroll: true }); } catch (e) { } } }
    }
    if (slot) qDrawSoon();
  }
  window.addEventListener('resize', () => { if (QCV && QCV.isConnected) qDrawSoon(); });
  const qErr = e => { try { if (!qErr.n) { qErr.n = 1; console.error('Quest Modes:', e); } } catch (x) { } };

  /* ---------- painting and live updates ---------- */
  let LASTSIG = '';
  function paint() {
    if (!API) return; const loc = API.S.loc || {};
    if (loc.v !== VIEW) { portal(null); unlock(); return; }
    const root = $('lg-root'); if (!root) { try { API.render(); } catch (e) { } return; }
    root.innerHTML = inner(); paintArena();
  }
  /* The game screen lives in a body-level portal so it covers the whole course (header, sidebar and floating buttons). */
  function portal(html) {
    let el = $('lg-portal');
    if (!html) { if (el) { if (document.fullscreenElement === el) { try { document.exitFullscreen(); } catch (e) { } } el.remove(); } return null; }
    if (!el) { el = document.createElement('div'); el.id = 'lg-portal'; el.setAttribute('data-notc', ''); document.body.appendChild(el); }
    el.innerHTML = html; return el;
  }
  function paintArena() { const keep = qPre(); portal(arenaHTML()); qPost(keep); after(); }
  function unlock() { if (!document.querySelector('#lg-portal .lg-arena')) document.documentElement.classList.remove('lg-lock'); }
  function after() {
    const ar = document.querySelector('#lg-portal .lg-arena');
    document.documentElement.classList.toggle('lg-lock', !!ar);
    if (ar) { const sig = ar.dataset.sig || ''; if (sig !== LASTSIG) { LASTSIG = sig; const act = document.activeElement; if (!act || act === document.body || !ar.contains(act)) { try { ar.focus({ preventScroll: true }); } catch (e) { } } } }
    else LASTSIG = '';
    document.querySelectorAll('#lg-root [data-ind="1"]').forEach(el => { el.indeterminate = true; });
    const go = () => { document.querySelectorAll('.lg-row .lgx-fill[data-w]').forEach(el => { el.style.width = el.dataset.w + '%'; }); document.querySelectorAll('.lg-dcol .lgx-bar[data-h]').forEach(el => { el.style.height = Math.max(4, +el.dataset.h) + '%'; }); };
    if (RM()) go(); else requestAnimationFrame(() => requestAnimationFrame(go));
    if (H && H.ph === 'podium' && H.view !== 'results' && !H.podFx) { H.podFx = true; const delay = RM() ? 0 : 2400; setTimeout(() => { if (H && H.ph === 'podium') { sfx('fanfare'); confetti(5000); } }, delay); }
    musicFor();
  }
  function updHost(force) {
    if (!H || !API || API.S.loc.v !== VIEW) return; const now = Date.now();
    const pc = $('lg-pc'); if (pc) pc.textContent = active().length;
    const pc2 = $('lg-pc2'); if (pc2) pc2.textContent = active().length;
    if (H.ph === 'lobby') {
      const sig = players().map(p => p.key + p.nick + p.av + (p.online ? 1 : 0)).join('|');
      if (force || sig !== H.rsig) { H.rsig = sig; const r = $('lg-roster'); if (r) r.innerHTML = rosterHTML(); const c = $('lg-cnt'); if (c) c.textContent = players().length; const b = $('lg-start'); if (b) b.disabled = !players().length; }
    }
    if (H.ph === 'pre') { const el = $('lg-pre'); if (el) el.textContent = Math.max(1, Math.ceil((H.paused ? H.paused.left : H.preEnd - now) / 1000)); }
    if (H.ph === 'q') {
      const left = H.paused ? H.paused.left : Math.max(0, H.qAt + H.dur * 1000 - now), sec = Math.ceil(left / 1000);
      const s = $('lg-sec'), c = $('lg-secc'), w = $('lg-secw');
      if (s) s.textContent = sec; if (c) { const C = 2 * Math.PI * 44; c.setAttribute('stroke-dashoffset', (C * (1 - clamp(left / (H.dur * 1000), 0, 1))).toFixed(1)); } if (w) w.classList.toggle('lgx-low', sec <= 5);
      if (!H.paused && sec <= 5 && sec > 0 && sec !== H.lastSec) { H.lastSec = sec; sfx('last'); }
      const ac2 = $('lg-ac'); if (ac2) ac2.textContent = Object.keys(H.cur).length;
    }
  }
  function updPlayer() {
    if (!P || !API || API.S.loc.v !== VIEW) return; const d = P.st, now = Date.now();
    const ban = $('lg-pban'); if ((P.conn === false) !== !!ban && !P.kicked) { paint(); return; }
    if (!d) { if (now - P.at > 9000 && !P.slowShown) { P.slowShown = true; paint(); } return; }
    if (d.ph === 'pre') { const el = $('lg-ppre'); if (el) el.textContent = Math.max(1, Math.ceil((d.pz ? (P.frozen || 0) : P.deadline - now) / 1000)); }
    if (d.ph === 'q') {
      const left = d.pz ? (P.frozen || 0) : Math.max(0, P.deadline - now);
      const b = $('lg-pbar'); if (b) { b.style.width = (d.dur ? clamp(left / (d.dur * 1000) * 100, 0, 100) : 100) + '%'; b.parentNode.classList.toggle('lgx-low', left <= 5000); }
      const s = $('lg-psec'); if (s) s.textContent = Math.ceil(left / 1000) + ' s';
      const ac2 = $('lg-pac'); if (ac2) ac2.textContent = d.ac + ' of ' + d.pc + ' answered';
      if (!d.pz && left <= 0 && !(P.ans && P.ans.qi === d.qi) && !P.lateShown) { P.lateShown = d.qi + 1; paint(); }
      if (P.lateShown && P.lateShown !== d.qi + 1) P.lateShown = 0;
    }
  }
  function updRun() {
    if (!R || R.ph !== 'q' || !R.dur || !API || API.S.loc.v !== VIEW) return; const now = Date.now();
    const left = Math.max(0, R.dur * 1000 - rElapsed(now)), b = $('lg-rbar'), s = $('lg-rsec');
    if (b) { b.style.width = clamp(left / (R.dur * 1000) * 100, 0, 100) + '%'; b.parentNode.classList.toggle('lgx-low', left <= 5000); }
    if (s) s.textContent = R.use.frz ? '❄️ frozen' : Math.ceil(left / 1000) + ' s';
    const sec = Math.ceil(left / 1000); if (!R.use.frz && sec <= 5 && sec > 0 && sec !== R.lastSec) { R.lastSec = sec; sfx('last'); }
  }
  function uiTick() {
    const now = Date.now();
    try { if (H) hostTick(now); } catch (e) { }
    try { if (R) runTick(now); } catch (e) { }
    try { if (QH) qhTick(now); } catch (e) { qErr(e); }
    try { if (QR) qRunTick(now); } catch (e) { qErr(e); }
    if (!API || !API.S || !API.S.loc || API.S.loc.v !== VIEW) { if (AU.kind) stopMusic(); if ($('lg-portal')) portal(null); unlock(); return; }
    try { if (R) updRun(); else if (QR) { if (QR.ph !== 'play') qPartial(qc()); } else if (H) updHost(false); else if (QH) qhUpd(false); else if (P) { if (P.qm) qmPhoneTick(now); else updPlayer(); } } catch (e) { qErr(e); }
    const f = $('lg-flash'); if (f && !f.hidden && now - FLASH.at > 2600) f.hidden = true;
  }
  setInterval(uiTick, 100);

  /* ---------- input events ---------- */
  document.addEventListener('input', e => {
    const t = e.target; if (!t || !t.dataset || !t.dataset.lgi || !t.closest('#lg-root')) return;
    const [g, f] = t.dataset.lgi.split('.');
    if (g === 'j') { JF[f] = f === 'pin' ? t.value.replace(/\D/g, '').slice(0, 6) : t.value; if (f === 'pin' && t.value !== JF.pin) t.value = JF.pin; if (JF.err) { JF.err = ''; } return; }
    if (API && LG()[g]) { LG()[g][f] = t.value.slice(0, 60); try { API.save(); } catch (er) { } }
  });
  document.addEventListener('change', e => {
    const t = e.target; if (!t || !t.closest || !t.closest('#lg-root') || !API) return;
    if (t.dataset.lgc) {
      const [g, f] = t.dataset.lgc.split('.'), c = LG()[g]; if (!c) return;
      c[f] = t.type === 'checkbox' ? t.checked : t.value; try { API.save(); } catch (er) { }
      if (f === 'set' || f === 'test') { const el = $('lg-' + g + '-count'), n = poolOf(c, g).length; if (el) el.textContent = n + ' question' + (n === 1 ? '' : 's') + ' available'; const ti = $('lg-' + g + '-title'); if (ti) ti.placeholder = srcLabel(c, g); }
      return;
    }
    if (t.dataset.lgm || t.dataset.lgmm) {
      const g = t.dataset.lgm || t.dataset.lgmm, c = LG()[g]; if (!c) return; const set = new Set(c.mix);
      if (t.dataset.lgm) { if (t.checked) set.add(t.value); else set.delete(t.value); }
      else { const L = visSets(g).filter(s => t.value === '_other' ? !s.mod : s.mod === t.value); L.forEach(s => { if (t.checked) set.add(s.key); else set.delete(s.key); }); }
      c.mix = [...set]; try { API.save(); } catch (er) { } paint();
      const back = document.querySelector(`#lg-root input[data-${t.dataset.lgm ? 'lgm' : 'lgmm'}="${g}"][value="${CSS_ESC(t.value)}"]`); if (back) try { back.focus({ preventScroll: true }); } catch (er) { }
    }
  });
  const CSS_ESC = s => (window.CSS && CSS.escape) ? CSS.escape(s) : String(s).replace(/["\\]/g, '\\$&');
  document.addEventListener('keydown', e => {
    if (!API || !API.S || !API.S.loc || API.S.loc.v !== VIEW) return;
    const t = e.target;
    if (t && t.closest && t.closest('#lg-root') && e.key === 'Enter' && (t.id === 'lg-pin' || t.id === 'lg-nick')) { e.preventDefault(); pJoin(false); return; }
    if (e.ctrlKey || e.metaKey || e.altKey || !document.querySelector('#lg-portal .lg-arena')) return;
    if (t && t.closest && t.closest('input,textarea,select,[contenteditable="true"]')) return;
    const k = e.key, q = s => document.querySelector('#lg-portal .lg-arena ' + s), click = s => { const b = q(s); if (b && !b.disabled) { e.preventDefault(); b.click(); return true; } return false; };
    if (/^[1-6]$/.test(k)) { click(`[data-key="${k}"]`); return; }
    if ((k === 'Enter' || k === ' ') && t && t.tagName === 'BUTTON' && t.closest('.lg-arena')) return;
    if (k === 'Enter' || k === ' ' || k === 'ArrowRight') { click('[data-kbd="next"]'); return; }
    if (k === 'p' || k === 'P') { click('[data-kbd="pause"]'); return; }
    if (k === 's' || k === 'S') { click('[data-kbd="skip"]') || click('[data-kbd="next"]'); return; }
    if (k === 'm' || k === 'M') { click('[data-kbd="mute"]'); return; }
    if (k === 'f' || k === 'F') { click('[data-kbd="fs"]'); return; }
    if (k === 'h' || k === 'H') { click('[data-kbd="hint"]'); return; }
    if (k === 'q' || k === 'Q') { click('[data-kbd="ask"]'); return; }
    if (k === 'w' || k === 'W') { click('[data-kbd="wave"]'); return; }
    if (k === 'Escape' || k === 'b' || k === 'B') { click('[data-kbd="back"]'); return; }
  });
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) setTimeout(paint, 50); });

  /* ---------- plugin ---------- */
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: VIEW,
    title: 'Live Quiz',
    tile: { icon: '🎉', meta: 'Live class quiz on the big screen, quiz homework, solo practice with power-ups, and Quest Modes game worlds' },
    render(api, loc) {
      API = api; if (CAP.st === 'idle') capInit();
      if (!TAB && loc && loc.tab && ['host', 'join', 'quest', 'hw', 'solo', 'past'].includes(loc.tab)) TAB = loc.tab;
      return `<div id="lg-root" class="lg" data-notc>${inner()}</div>`;
    },
    mount(api) { API = api; paintArena(); },
    click(a, el, api) {
      API = api; const d = el.dataset, k = d.k;
      ac();
      if (/^q[mh]/.test(a)) { qmClick(a, el, api); return; }
      switch (a) {
        case 'tab': TAB = k; JF.err = ''; HS.err = ''; HW.err = ''; break;
        case 'kind': { const c = LG()[k]; if (c) { c.kind = d.v; if (d.v === 'mix' && !c.mix.length) { const cur = curKey(Object.assign({}, c, { kind: 'set' }), k); if (cur) c.mix = [cur]; } api.save(); } break; }
        case 'av': JF.av = cleanAv(k); break;
        case 'popen': JF.pin = String(k || ''); JF.err = ''; break;
        case 'pjoin': pJoin(false); return;
        case 'pans': pAnswer(+d.i); return;
        case 'psubmit': if (P && P.sel && P.sel.length) pSend(P.sel); return;
        case 'pask': if (P) P.ask = true; break;
        case 'pnoask': if (P) P.ask = false; break;
        case 'pleave': pLeave(); return;
        case 'hcreate': hostCreate(); return;
        case 'hresume': hostResume(); return;
        case 'hdiscard': ss.set('lg.host', null); break;
        case 'hnext': hostNext(); return;
        case 'hpause': hostPause(); return;
        case 'hlock': if (H) { H.locked = !H.locked; hostSave(); } break;
        case 'hdrawer': if (H) H.drawer = !H.drawer; break;
        case 'hkick': if (H) { H.askKick = k; } break;
        case 'hkickyes': hostKick(k); return;
        case 'hnokick': if (H) H.askKick = ''; break;
        case 'hask': if (H) H.ask = 'end'; break;
        case 'hnoask': if (H) H.ask = ''; break;
        case 'hresults': if (H) { H.ask = ''; H.view = 'results'; } break;
        case 'hback': if (H) H.view = 'game'; break;
        case 'hcsv': if (H) hostCSV(); return;
        case 'hsave': if (H) { H.saved = ''; hostSaveResults(); } break;
        case 'hclose': hostClose(); return;
        case 'mute': { const g = LG(); g.mute = !g.mute; api.save(); if (g.mute) stopMusic(); break; }
        case 'fs': { const elf = $('lg-portal'); try { if (document.fullscreenElement) document.exitFullscreen(); else if (elf && elf.requestFullscreen) { const pr = elf.requestFullscreen(); if (pr && pr.catch) pr.catch(() => flash('Full screen is not allowed here. The game already fills this window.')); } } catch (er) { } return; }
        case 'sgo': { const c = LG().scfg, P0 = poolOf(c, 'scfg'); if (!P0.length) { flash('Choose some questions first.'); return; } const rng = RNG(rseed()), n = c.n === 'all' ? 50 : +c.n || 10; rStart(shuf(P0, rng).slice(0, n).map(q => prep(q, true, rng)), { mode: 'solo', title: clipW(srcLabel(c, 'scfg'), 60), key: c.kind === 'mix' ? 'mix' : curKey(c, 'scfg'), dur: +c.t || 0, pw: c.pw !== false, music: c.music !== false }); return; }
        case 'rgo': rBegin(); return;
        case 'rans': { if (!R || R.ph !== 'q') return; const i = +d.i, q = R.qs[R.i]; if (R.hide.includes(i)) return; if (q.k === 'ma') { const j = R.sel.indexOf(i); if (j >= 0) R.sel.splice(j, 1); else R.sel.push(i); sfx('pick'); break; } rAnswer([i]); return; }
        case 'rsubmit': if (R && R.sel.length) rAnswer(R.sel.slice().sort((x, y) => x - y)); return;
        case 'rpow': rPower(k); return;
        case 'rnext': rNext(); return;
        case 'rretry': hwSubmit(); return;
        case 'ragain': if (R) { rPayout(); const o = R; rStart(shuf(o.qs, Math.random).map(q => Object.assign({}, q)), { mode: 'solo', title: o.title, key: o.key, dur: o.dur, pw: o.pw, music: o.music }); } return;
        case 'rmissed': if (R) { rPayout(); const o = R, ids = o.log.filter(l => !l.ok).map(l => l.id); rStart(o.qs.filter(q => ids.includes(q.id)), { mode: 'solo', title: 'Missed questions', key: '', dur: o.dur, pw: o.pw, music: o.music }); } return;
        case 'rquit': if (R) { rPayout(); const m = R.mode; R = null; stopMusic(); TAB = m === 'solo' ? 'solo' : 'hw'; } break;
        case 'hwnew': hwCreate(); return;
        case 'hwsel': HW.sel = k; break;
        case 'hwback': HW.sel = ''; break;
        case 'hwprev': hwStart(k, true); return;
        case 'hwplay': hwStart(k, false); return;
        case 'hwtog': { const x = hwOf(k); if (x && CAP.db) CAP.db.doc('homework/' + k).update({ open: x.open === false }).catch(() => flash('That change did not save. Try again.')); return; }
        case 'hwask': HW.ask = k; break;
        case 'hwnoask': HW.ask = ''; break;
        case 'hwdel': if (CAP.db) CAP.db.doc('homework/' + k).delete().then(() => flash('Homework deleted')).catch(() => flash('The homework was not deleted. Try again.')); HW.ask = ''; if (HW.sel === k) HW.sel = ''; break;
        case 'hwcsv': hwCSV(k); return;
        case 'pastsel': PAST.sel = k; break;
        case 'pastback': PAST.sel = ''; break;
        case 'pastcsv': pastCSV(k); return;
        case 'pastask': PAST.ask = k; break;
        case 'pastnoask': PAST.ask = ''; break;
        case 'pastdel': if (CAP.db) CAP.db.doc('liveres/' + k).delete().then(() => flash('Results deleted')).catch(() => flash('The results were not deleted. Try again.')); PAST.ask = ''; PAST.sel = ''; break;
        default: return;
      }
      paint();
    }
  });
  window.COURSE_LIVEGAME = { _state: () => ({ cap: { st: CAP.st, room: !!CAP.room, db: !!CAP.db, admin: CAP.admin, uid: CAP.uid }, host: H ? { pin: H.pin, ph: H.ph, qi: H.qi, n: H.qs.length, players: players().map(p => ({ nick: p.nick, score: p.score, online: p.online, streak: p.streak })), cur: Object.keys(H.cur || {}).length, correct: H.qs[H.qi] ? H.qs[H.qi].a : null, k: H.qs[H.qi] ? H.qs[H.qi].k : null, saved: H.saved } : null, player: P ? { pin: P.pin, ph: P.st && P.st.ph, qi: P.st && P.st.qi, you: P.you, kicked: P.kicked || '' } : null, run: R ? { ph: R.ph, i: R.i, n: R.qs.length, score: R.score, correct: R.correct, a: R.qs[R.i] ? R.qs[R.i].a : null, k: R.qs[R.i] ? R.qs[R.i].k : null, held: R.held.slice(), posted: !!R.posted, postErr: R.postErr || '' } : null, bank: { sets: bank().sets.length, qs: Object.keys(bank().byId).length } }), _sets: () => bank().sets.map(x => ({ key: x.key, title: x.title, n: x.qs.length, firstMa: x.qs.findIndex(q => q.k === 'ma') })) };
  window.COURSE_LIVEGAME._qm = () => {
    const pv = (srv, p) => p ? { key: p.key, nick: p.nick, peer: p.peer || '', online: p.online !== false, bot: p.bot, cur: p.cur, a: srv.qs[p.cur] ? srv.qs[p.cur].a : null, k: srv.qs[p.cur] ? srv.qs[p.cur].k : null, sc: qsScore(srv, p), qn: p.qn, ok: p.ok, seq: p.seq, off: !!p.off, tp: p.tp ? p.tp.k : '', res: p.res ? p.res.k : '', g: p.g, c: p.c, hp: p.hp, w: p.w, out: !!p.out, need: p.need, tw: p.tw, cash: p.cash, stock: p.stock, cu: p.cu ? p.cu.map(x => [x.id, x.o]) : null, un: p.un, sv: p.sv } : null;
    const hp = (srv, p) => Object.assign(pv(srv, p), { offc: p.off ? p.off.ch.map(x => x[0]) : null });
    return { solo: QR ? Object.assign({ ph: QR.ph, mode: QR.srv.mode, lv: QR.srv.lv, t: QR.srv.t, cap: QR.srv.cap, sph: QR.srv.ph, posted: !!QR.posted, postErr: QR.postErr || '', saved: !!QR.saved, rivals: Object.keys(QR.srv.players).length - 1 }, { me: pv(QR.srv, QR.srv.players.me) }) : null,
      host: QH ? { pin: QH.pin, ph: QH.srv.ph, mode: QH.srv.mode, lv: QH.srv.lv, t: QH.srv.t, saved: QH.saved, view: QH.view, players: Object.values(QH.srv.players).map(p => hp(QH.srv, p)), ev: QH.srv.ev.map(e => e[1]) } : null,
      phone: P && P.qm ? { ph: P.qm.st.ph, mode: P.qm.st.qm, pack: P.qm.pack ? P.qm.pack.qs.length : 0, view: P.qm.view, pending: !!P.qm.pending, rk: P.qm.rk, anim: P.qm.ui.anim ? (P.qm.ui.anim.done ? 'done' : 'run') : '' } : null,
      ui: (QR || (P && P.qm)) ? (QR ? QR.ui : P.qm.ui) : null };
  };
  window.COURSE_LIVEGAME._qmff = ms => { if (QR) QR.srv.t += ms; if (QH) QH.srv.t += ms; };
})();
