/* Flipbook: the course notes as a page-turning textbook.
   Every notes screen, real-world photo, colour example and diagram, laid out as printed pages with a contents list,
   unit openers, module glossaries, page turning, text size and full screen. Opens from the Flipbook button in the course,
   or on its own as the offline download. Kester Small. */
(function () {
  'use strict';
  if (window.__flipbook) return; window.__flipbook = true;
  const SA = window.FLIPBOOK_STANDALONE || null;
  const CFG = window.FLIPBOOK_CONFIG || {};
  const PART = CFG.part || ((SA && SA.part) || 'Module');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const strip = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const ACC = ['#B7791F', '#0F7C8C', '#A63D6B', '#4D6BD8', '#2F855A'];
  const meta = () => {
    const t = CFG.title || (SA && SA.title) || document.title || 'Course';
    const course = t.split('·')[0].trim();
    return { course, teacher: /teacher/i.test(t), key: 'fb:' + course + (/teacher/i.test(t) ? ':T' : ':S') };
  };

  /* ---------- styles ---------- */
  function css() {
    if (document.getElementById('fb-css')) return;
    const s = document.createElement('style'); s.id = 'fb-css';
    s.textContent = `
.fb-root{position:fixed;inset:0;z-index:2147480000;display:flex;flex-direction:column;background:radial-gradient(ellipse at 50% 40%,#16244f 0%,#081131 60%,#040a1f 100%);color:#EEF1FB;font-family:"Atkinson Hyperlegible",Verdana,"Segoe UI",system-ui,sans-serif;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;overscroll-behavior:contain}
.fb-root *{box-sizing:border-box}
.fb-flow .fb-xu:first-child{border-top:0;margin-top:0;padding-top:0}
.fb-flow ol.tq{padding-left:1.6em}.fb-flow ol.tq>li{margin:.2em 0 .7em;break-inside:avoid}.fb-flow ol.tq>li>p{margin:0 0 .25em}.fb-flow ol.tq ol{margin:0;padding-left:1.4em}.fb-flow ol.tq ol li{margin:.05em 0}.fb-flow .tq-p{background:var(--raise);border-radius:8px;padding:.4em .6em;margin:.2em 0 .4em;font-size:.94em}
.fb-flow table.akey td:first-child,.fb-flow table.akey td:nth-child(2){white-space:nowrap;text-align:center}.fb-flow ul.pf-list{list-style:none;padding-left:0}.fb-flow ul.pf-list li{margin:.15em 0}
.fb-flow .fb-u{margin-top:1.4em;padding-top:.9em;border-top:3px solid var(--acc)}.fb-flow .fb-u>.fb-hero,.fb-flow .fb-u>.op-k,.fb-flow .fb-u>.op-t{break-after:avoid}
.fb-flow .tablewrap{overflow:visible!important;max-width:none!important}.fb-flow table,.fb-flow .tablewrap table{min-width:0!important;max-width:100%}
.fb-root button,.fb-root input{text-transform:none!important;letter-spacing:normal!important;text-shadow:none!important;box-shadow:none;font-family:inherit}
.fb-root .fb-btn{color:#EEF1FB!important;background:rgba(255,255,255,.08)!important}
.fb-root .fb-btn.gold{background:#FFD766!important;color:#1a1300!important}
.fb-root .fb-btn:hover{background:rgba(255,215,102,.16)!important}.fb-root .fb-btn.gold:hover{background:#ffe08a!important}
.fb-bar{flex:none;display:flex;align-items:center;gap:6px;padding:8px 10px;min-height:52px}
.fb-bar .t{flex:1;min-width:0;font-family:"Bricolage Grotesque","Atkinson Hyperlegible",system-ui,sans-serif;font-weight:700;font-size:1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 6px}
.fb-bar .t small{font-weight:400;opacity:.7;margin-left:8px;font-family:"Atkinson Hyperlegible",system-ui,sans-serif}
.fb-btn{flex:none;font:inherit;font-size:.9rem;font-weight:700;color:#EEF1FB;background:rgba(255,255,255,.08);border:1px solid rgba(255,215,102,.35);border-radius:999px;min-height:38px;min-width:38px;padding:0 12px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px}
.fb-btn:hover{background:rgba(255,215,102,.16)}
.fb-btn:focus-visible{outline:3px solid #FFD766;outline-offset:2px}
.fb-btn.gold{background:#FFD766;color:#1a1300;border-color:#FFD766}
.fb-btn[disabled]{opacity:.4;cursor:default}
.fb-stage{flex:1;min-height:0;position:relative;display:grid;place-items:center;overflow:hidden;touch-action:pan-y}
.fb-book{position:relative;perspective:2600px}
.fb-book::before{content:'';position:absolute;inset:-2px;border-radius:6px;box-shadow:0 30px 70px -20px rgba(0,0,0,.75),0 8px 22px rgba(0,0,0,.35);pointer-events:none}
.fb-book.spread::after{content:'';position:absolute;top:0;bottom:0;left:calc(50% - 22px);width:44px;background:linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.13) 45%,rgba(0,0,0,.2) 50%,rgba(0,0,0,.13) 55%,rgba(0,0,0,0) 100%);pointer-events:none;z-index:6}
.fb-slot{position:absolute;top:0;overflow:hidden}
.fb-leaf{position:absolute;top:0;transform-style:preserve-3d;z-index:8;will-change:transform}
.fb-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden}
.fb-face.back{transform:rotateY(180deg)}
.fb-face::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:var(--sh,0);background:linear-gradient(90deg,rgba(0,0,0,.28),rgba(0,0,0,0) 60%)}
.fb-face.back::after{background:linear-gradient(270deg,rgba(0,0,0,.28),rgba(0,0,0,0) 60%)}
.fb-low{position:absolute;inset:auto 0 0 0;display:flex;align-items:center;gap:8px;padding:8px 12px 10px}
.fb-foot{flex:none;display:flex;align-items:center;gap:10px;padding:6px 12px 12px}
.fb-foot input[type=range]{flex:1;min-width:0;accent-color:#FFD766;height:28px}
.fb-foot .fb-pgno{flex:none;font-size:.88rem;opacity:.9;min-width:9.5em;text-align:center;font-variant-numeric:tabular-nums}
.fb-toc{position:absolute;inset:0;z-index:20;background:rgba(4,8,24,.82);display:flex;justify-content:center;align-items:flex-start;padding:12px;overflow:auto}
.fb-toc[hidden]{display:none}
.fb-toc .box{width:min(560px,100%);background:#0d1a44;border:1px solid rgba(255,215,102,.35);border-radius:16px;padding:14px 14px 10px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.fb-toc h2{margin:2px 4px 10px;font-family:"Bricolage Grotesque",system-ui,sans-serif;font-size:1.25rem;color:#FFD766;display:flex;justify-content:space-between;align-items:center}
.fb-toc button.e{display:flex;width:100%;gap:10px;text-align:left;font:inherit;color:#EEF1FB;background:transparent;border:0;border-radius:10px;padding:8px 10px;cursor:pointer;align-items:baseline}
.fb-toc button.e:hover,.fb-toc button.e:focus-visible{background:rgba(255,215,102,.12);outline:none}
.fb-toc button.e.m{font-weight:700;color:#FFD766;margin-top:6px}
.fb-toc button.e span:first-child{flex:1}
.fb-toc button.e span:last-child{opacity:.7;font-variant-numeric:tabular-nums}
.fb-busy[hidden]{display:none!important}
.fb-busy{position:absolute;inset:0;display:grid;place-items:center;font-size:1rem;z-index:30;background:rgba(4,8,24,.6)}
.fb-zoom{position:absolute;inset:0;z-index:40;background:rgba(3,6,18,.94);display:grid;place-items:center;padding:16px;overflow:auto}
.fb-zoom .in{max-width:min(1200px,100%);display:flex;flex-direction:column;gap:10px;align-items:center}
.fb-zoom img,.fb-zoom svg{max-width:100%;max-height:calc(100vh - 120px);height:auto;border-radius:8px;background:#fff}
.fb-zoom svg{width:min(1100px,94vw)}
.fb-zoom p{margin:0;text-align:center;font-size:.92rem;max-width:70ch}

/* the printed page */
.fb-page{--ink:#1E2230;--muted:#586076;--gold:#A86E00;--blue:#2457C5;--ok:#1C7A3E;--bad:#B42318;--surface:#FFFFFF;--raise:#F7F2E7;--line:#DCD3C1;--soft-gold:#FBEFCF;--soft-blue:#E4ECFA;--soft-ok:#DFF3E5;--soft-bad:#FBE4E2;--on-gold:#FFFFFF;--acc:#B7791F;
position:absolute;inset:0;background:#FFFDF8;color:var(--ink);font-size:var(--fs,15px);line-height:1.46;font-family:"Atkinson Hyperlegible",Verdana,"Segoe UI",system-ui,sans-serif;overflow:hidden}
.fb-page.l{background:linear-gradient(270deg,#efe9dc 0,#FFFDF8 26px)}
.fb-page.r{background:linear-gradient(90deg,#efe9dc 0,#FFFDF8 26px)}
.fb-page.single{background:#FFFDF8}
.fb-page .hd{position:absolute;left:var(--px);right:var(--px);top:14px;height:22px;display:flex;justify-content:space-between;gap:12px;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--line);white-space:nowrap;overflow:hidden}
.fb-page .hd span{overflow:hidden;text-overflow:ellipsis}
.fb-page .hd b{color:var(--acc)}
.fb-page .ft{position:absolute;left:var(--px);right:var(--px);bottom:12px;height:20px;display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--muted)}
.fb-page.l .ft{flex-direction:row-reverse}
.fb-page .ft b{font-size:13px;color:var(--ink);font-variant-numeric:tabular-nums}
.fb-page .tab{position:absolute;top:var(--tabtop,90px);width:7px;height:74px;background:var(--acc);border-radius:4px 0 0 4px;right:0}
.fb-page.l .tab{left:0;right:auto;border-radius:0 4px 4px 0}
.fb-frame{position:absolute;overflow:hidden}
.fb-flow{column-count:1;column-fill:auto;overflow:visible}
.fb-flow>*:first-child{margin-top:0!important}

/* content */
.fb-flow p,.fb-flow ul,.fb-flow ol,.fb-flow table,.fb-flow pre,.fb-flow figure,.fb-flow .tablewrap{margin:0 0 .6em}
.fb-flow ul,.fb-flow ol{padding-left:1.35em}
.fb-flow li{margin:.18em 0}
.fb-flow b,.fb-flow strong{font-weight:700;color:#121624}
.fb-flow h2{font-family:"Bricolage Grotesque","Atkinson Hyperlegible",system-ui,sans-serif;font-size:1.32em;line-height:1.2;margin:1.15em 0 .5em;color:#141a33;break-after:avoid;page-break-after:avoid}
.fb-flow h2 .n{display:inline-block;font-size:.72em;font-weight:800;color:#fff;background:var(--acc);border-radius:6px;padding:.1em .45em;margin-right:.45em;vertical-align:.12em;letter-spacing:.02em}
.fb-flow h3{font-family:"Bricolage Grotesque",system-ui,sans-serif;font-size:1.12em;margin:1em 0 .4em;color:#141a33;break-after:avoid}
.fb-flow h4{font-size:1em;margin:.9em 0 .35em;color:#141a33;break-after:avoid}
.fb-flow .tablewrap{overflow:visible}
.fb-flow table{width:100%;border-collapse:collapse;font-size:.84em;line-height:1.4}
.fb-flow th{background:var(--soft-gold);text-align:left;font-weight:700;color:#141a33}
.fb-flow th,.fb-flow td{border:1px solid var(--line);padding:.35em .5em;vertical-align:top;overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto}
.fb-flow .tablewrap,.fb-flow table{break-inside:auto}
.fb-flow thead,.fb-flow p:has(+.tablewrap),.fb-flow p:has(+ul),.fb-flow p:has(+ol){break-after:avoid}
.fb-flow .fb-box .fb-lbl{break-after:avoid}
.fb-flow tr{break-inside:avoid}
.fb-flow pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:.8em;line-height:1.45;background:#F3EEE3;border:1px solid var(--line);border-radius:8px;padding:.6em .75em;break-inside:avoid}
.fb-flow code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.92em}
.fb-flow .passage{border-left:4px solid var(--acc);background:var(--raise);padding:.55em .8em;border-radius:0 8px 8px 0}
.fb-flow .tip{border:1px solid #E8CF8E;background:#FFF7E2;padding:.55em .8em;border-radius:10px;break-inside:avoid}
.fb-flow .say{display:block;background:#F7F2E7;border-left:4px solid var(--acc);padding:.4em .7em;border-radius:0 8px 8px 0;font-weight:700;margin:0 0 .5em;break-inside:avoid}
.fb-flow .hint,.fb-flow .credit{font-size:.86em;color:var(--muted)}
.fb-flow figure{break-inside:avoid}
.fb-flow figure.fig svg,.fb-flow .fb-svg svg{display:block;width:100%;height:auto;max-height:var(--figmax,420px)}
.fb-flow figure svg text{fill:var(--ink)}
.fb-flow figcaption{font-size:.84em;color:var(--muted);margin-top:.45em;line-height:1.45}
.fb-flow figcaption b{color:var(--ink)}
.fb-flow .fb-svg{border:1px solid var(--line);border-radius:10px;padding:.6em;background:#fff}
.fb-flow .fb-ph{margin:.4em 0 .9em}
.fb-flow .fb-ph img,.fb-flow .fb-card img,.fb-flow .fb-hero img{display:block;width:100%;height:auto;object-fit:cover;border-radius:8px;background:#e9e3d6;max-height:var(--imgmax,300px)}
.fb-flow .fb-ph .lb{font-weight:700;color:var(--acc)}
.fb-flow .cr{display:block;font-size:.86em;opacity:.8;margin-top:2px}
.fb-flow .f-ink{fill:var(--ink)}.fb-flow .f-muted{fill:var(--muted)}.fb-flow .f-gold{fill:var(--gold)}.fb-flow .f-blue{fill:var(--blue)}.fb-flow .f-ok{fill:var(--ok)}.fb-flow .f-bad{fill:var(--bad)}.fb-flow .f-surface{fill:var(--surface)}.fb-flow .f-soft{fill:var(--soft-gold)}.fb-flow .f-softb{fill:var(--soft-blue)}.fb-flow .f-softok{fill:var(--soft-ok)}.fb-flow .f-softbad{fill:var(--soft-bad)}.fb-flow .f-none{fill:none}
.fb-flow svg text.f-ongold,.fb-flow svg .f-ongold{fill:var(--on-gold)}.fb-flow svg text.f-muted{fill:var(--muted)}.fb-flow svg text.f-gold{fill:var(--gold)}.fb-flow svg text.f-ok{fill:var(--ok)}.fb-flow svg text.f-bad{fill:var(--bad)}
.fb-flow .s-ink{stroke:var(--ink)}.fb-flow .s-muted{stroke:var(--muted)}.fb-flow .s-gold{stroke:var(--gold)}.fb-flow .s-line{stroke:var(--line)}.fb-flow .s-ok{stroke:var(--ok)}.fb-flow .s-bad{stroke:var(--bad)}
.fb-flow .fb-ex-h{font-family:"Bricolage Grotesque",system-ui,sans-serif;font-size:1.08em;margin:1em 0 .45em;display:flex;align-items:center;gap:.45em;break-after:avoid;color:#141a33}
.fb-flow .fb-ex-h::before{content:'';width:1.1em;height:1.1em;border-radius:50%;flex:none;background:conic-gradient(#E53935,#FDD835,#43A047,#1E88E5,#8E24AA,#E53935)}
.fb-flow .fb-card{border:1px solid var(--line);border-radius:12px;padding:.6em;margin:0 0 .7em;background:#fff;break-inside:auto}
.fb-flow .fb-card .tag{display:inline-block;font-size:.7em;font-weight:800;letter-spacing:.09em;text-transform:uppercase;padding:.15em .6em;border-radius:99px;background:var(--soft-gold);color:#5b3b00}
.fb-flow .fb-card h4{margin:.35em 0 .45em}
.fb-flow .fb-card .an{font-size:.93em}
.fb-flow .fb-card .an p{margin:0 0 .5em}
.fb-flow .fb-card .q{background:var(--soft-blue);border-radius:8px;padding:.45em .65em;font-size:.9em;margin-top:.3em}
.fb-flow .pal{display:flex;gap:3px;margin:.45em 0 .5em;flex-wrap:wrap}
.fb-flow .pal .sw{flex:1 1 52px;min-width:48px;border:1px solid var(--line);border-radius:6px;overflow:hidden;background:#fff}
.fb-flow .pal .sw i{display:block;height:22px}
.fb-flow .pal .sw span{display:block;padding:2px 4px;font:700 .66em/1.25 ui-monospace,Menlo,Consolas,monospace}
.fb-flow .pal .sw small{display:block;font-weight:400;font-family:"Atkinson Hyperlegible",system-ui,sans-serif;color:var(--muted)}
.fb-flow .hexchip{display:inline-flex;align-items:center;gap:3px;padding:0 5px 0 3px;border-radius:5px;background:#F3EEE3;border:1px solid var(--line);font:700 .8em/1.6 ui-monospace,Menlo,Consolas,monospace;white-space:nowrap}
.fb-flow .hexchip i{width:.9em;height:.9em;border-radius:3px;background:var(--c);border:1px solid rgba(0,0,0,.25)}
.fb-flow .fb-box{border-radius:12px;padding:.65em .85em .3em;margin:.4em 0 1em;border:1px solid}
.fb-flow .fb-box .fb-lbl{display:block;font-weight:800;font-size:.78em;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.35em}
.fb-flow .fb-box.sup{background:#ECF7EF;border-color:#B9DFC4}.fb-flow .fb-box.sup .fb-lbl{color:#1C6B39}
.fb-flow .fb-box.ch{background:#EEF2FC;border-color:#C3D0F2}.fb-flow .fb-box.ch .fb-lbl{color:#2A4FA8}
.fb-flow .fb-box p{margin:0 0 .6em}
.fb-flow .fb-x{border-radius:10px;padding:.5em .75em .25em;margin:.4em 0 .7em;border:1px solid;break-inside:auto}
.fb-flow .fb-x.dyk,.fb-flow .fb-x.qc,.fb-flow .fb-x.tipnote,.fb-flow .fb-x.vid,.fb-flow .fb-x.tt{break-inside:avoid}
.fb-flow .pgrid{display:grid;grid-template-columns:1fr 1fr;gap:.5em;margin:0 0 .7em}.fb-flow .pgrid figure{margin:0;break-inside:avoid}.fb-flow .pgrid img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border-radius:6px;background:#e9e3d6}.fb-flow .pgrid figcaption{font-size:.84em;line-height:1.35;margin-top:.25em}.fb-flow .pgrid .cr{font-size:.9em}
.fb-flow .fb-x .fb-lbl{display:block;font-weight:800;font-size:.78em;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.3em;break-after:avoid}
.fb-flow .fb-x h4{margin:.1em 0 .35em}.fb-flow .fb-x p{margin:0 0 .5em}.fb-flow .fb-x ul,.fb-flow .fb-x ol{margin:0 0 .5em}
.fb-flow .fb-x.carib{background:#E6F6F4;border-color:#A9DCD5}.fb-flow .fb-x.carib .fb-lbl{color:#0F6E66}
.fb-flow .fb-x.use{background:#ECF7EF;border-color:#B9DFC4}.fb-flow .fb-x.use .fb-lbl{color:#1C6B39}
.fb-flow .fb-x.mis{background:#FDEEEC;border-color:#F2C4BE}.fb-flow .fb-x.mis .fb-lbl{color:#A8261A}
.fb-flow .fb-x.brain{background:#F3EEFC;border-color:#D5C6F2}.fb-flow .fb-x.brain .fb-lbl{color:#5B35A8}.fb-flow .fb-x.brain .bq{font-weight:700}
.fb-flow .fb-x.brain .ans{border-top:1px dashed #C9B6EE;padding-top:.4em;font-size:.93em}
.fb-flow .fb-x.act{background:#FFF3E6;border-color:#F2D2AE}.fb-flow .fb-x.act .fb-lbl{color:#9A4D00}
.fb-flow .fb-x.vid{background:#FFF;border-color:#F2C4BE;display:flex;gap:.8em;align-items:center}.fb-flow .fb-x.vid .fb-lbl{color:#C4302B}
.fb-flow .fb-x.vid a{color:#1E2230;font-weight:700;text-decoration:underline;text-underline-offset:2px;pointer-events:auto}
.fb-flow .fb-x.vid .qr{flex:none;width:5.6em;height:5.6em;background:#fff}.fb-flow .fb-x.vid .qr svg{width:100%;height:100%;display:block}
.fb-flow .fb-ccchart td svg{display:block;max-width:100%;height:auto}
.fb-flow .fb-ccchart td{font-size:.95em}
.fb-flow .ecl{font-size:.78em;color:var(--muted);margin:-.35em 0 .45em}
.fb-flow .fb-x.ecu{background:#EEF4FF;border-color:#C7D7F5}.fb-flow .fb-x.ecu .fb-lbl{color:#2A4FA8}
.fb-flow .tip,.fb-flow .fb-x.tipnote{font-family:"Caveat","Segoe Print","Bradley Hand",cursive;font-size:1.22em;line-height:1.3;background:#FFF6B8;border:0;border-radius:2px;box-shadow:0 3px 8px rgba(0,0,0,.12);transform:rotate(-.6deg);padding:.55em .8em}
.fb-flow .tip b,.fb-flow .fb-x.tipnote .fb-lbl{font-family:"Caveat",cursive;font-weight:700;letter-spacing:0;text-transform:none;font-size:1.05em;color:#7A5200}
.fb-flow .solo{background:#fff;border-radius:8px;padding:.35em .55em;font-size:.92em;margin-top:.2em}
.fb-flow .comic{border:2.5px solid #1E2230;border-radius:12px;padding:.5em;margin:.5em 0 .8em;background:#FFFDF2;break-inside:auto}.fb-flow .cpanel{break-inside:avoid}
.fb-flow .comic>.fb-lbl{display:block;font-weight:800;font-size:.8em;letter-spacing:.06em;text-transform:uppercase;color:#C4302B;margin-bottom:.35em}
.fb-flow .cgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:.45em}
.fb-flow .cpanel{border:2px solid #1E2230;border-radius:6px;background:#fff;padding:.4em;display:flex;flex-direction:column;gap:.3em}
.fb-flow .cscene{font-size:.7em;font-weight:800;text-transform:uppercase;letter-spacing:.06em;background:#FFD766;align-self:flex-start;padding:.05em .45em;border:1.5px solid #1E2230}
.fb-flow .cline{display:flex;gap:.35em;align-items:flex-end}.fb-flow .cline.r{flex-direction:row-reverse}
.fb-flow .cline .av{width:2.6em;height:2.8em;flex:none}
.fb-flow .bub{position:relative;background:#F3F6FF;border:1.5px solid #1E2230;border-radius:12px;padding:.25em .5em;font-size:.82em;line-height:1.3}
.fb-flow .bub b{display:block;font-size:.85em;color:#C4302B}
.fb-flow .ccap{font-size:.78em;font-style:italic;background:#FFF3CC;border:1.5px solid #1E2230;padding:.15em .4em}
.fb-flow ul.chk{list-style:none;padding-left:.2em}

.fb-flow .fb-x.dyk{background:#FFF8D6;border-color:#EBD77E}.fb-flow .fb-x.dyk .fb-lbl{color:#8A6A00}
.fb-flow .fb-x.qc{background:#EAF4FF;border-color:#B8D5F5}.fb-flow .fb-x.qc .fb-lbl{color:#1D5FA8}.fb-flow .fb-x.qc .bq{font-weight:700}
.fb-flow .fb-x.qc .flipans{transform:rotate(180deg);text-align:right;font-size:.82em;color:var(--muted);margin-top:.3em}
.fb-flow .fb-x.tt{background:#FFF;border-color:#C9C9D6;display:flex;gap:.8em;align-items:center}.fb-flow .fb-x.tt .fb-lbl{color:#111}
.fb-flow .fb-x.tt a,.fb-flow .fb-x.rm a{color:#1E2230;font-weight:700;text-decoration:underline;text-underline-offset:2px}
.fb-flow .fb-x.tt .qr{flex:none;width:5.6em;height:5.6em}.fb-flow .fb-x.tt .qr svg{width:100%;height:100%;display:block}
.fb-flow .fb-x.rm{background:#F4F6F8;border-color:#D5DCE3}.fb-flow .fb-x.rm .fb-lbl{color:#41546B}
.fb-flow .fb-x.media{background:#fff;border-color:#F2C4BE;break-inside:avoid}.fb-flow .fb-x.media .fb-lbl{color:#C4302B}.fb-flow .mrow{display:grid;grid-template-columns:1fr 1fr;gap:.6em}.fb-flow .mi{display:flex;gap:.5em;align-items:center;font-size:.9em}.fb-flow .mi .qr{flex:none;width:4.4em;height:4.4em}.fb-flow .mi .qr svg{width:100%;height:100%;display:block}.fb-flow .mi a{color:#1E2230;font-weight:700;text-decoration:underline}
.fb-flow .kw{display:flex;flex-wrap:wrap;gap:.3em;margin:-.15em 0 .7em;break-after:avoid}.fb-flow .kw span{font-size:.72em;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);align-self:center;margin-right:.2em}
.fb-flow .kw i{font-style:normal;font-size:.8em;font-weight:700;padding:.12em .6em;border-radius:99px;background:color-mix(in srgb,var(--acc) 16%,#fff);color:#1E2230;border:1px solid color-mix(in srgb,var(--acc) 40%,#fff)}

/* openers */
.fb-flow .op-k{font-size:.78em;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);margin:0 0 .25em}
.fb-flow .op-t{font-family:"Bricolage Grotesque","Atkinson Hyperlegible",system-ui,sans-serif;font-size:2.05em;line-height:1.08;margin:0 0 .5em;color:#141a33;letter-spacing:-.01em}
.fb-flow .fb-hero{margin:0 0 1em}
.fb-flow .fb-hero img{max-height:var(--heromax,300px)}
.fb-flow .fb-hero figcaption{font-size:.8em}
.fb-flow .obj{background:var(--raise);border-radius:12px;padding:.7em .9em .2em;margin-bottom:1em}
.fb-flow .obj h3{margin:0 0 .35em;font-size:1em;color:var(--acc);text-transform:uppercase;letter-spacing:.08em}
.fb-flow .obj li{margin:.25em 0}
.fb-flow .src{font-size:.82em;color:var(--muted)}
.fb-flow .bigno{font-family:"Bricolage Grotesque",system-ui,sans-serif;font-size:5.4em;line-height:.9;font-weight:800;color:var(--acc);opacity:.95;margin:.25em 0 .1em}
.fb-flow .ulist{list-style:none;padding:0;margin:.4em 0 1em;border-top:1px solid var(--line)}
.fb-flow .ulist li{display:flex;gap:.7em;padding:.45em 0;border-bottom:1px solid var(--line);margin:0}
.fb-flow .ulist li b{color:var(--acc);min-width:2.6em}
.fb-flow .toc-m{font-family:"Bricolage Grotesque",system-ui,sans-serif;font-weight:700;font-size:1.05em;margin:.9em 0 .3em;color:#141a33;break-after:avoid;border-bottom:2px solid var(--acc);padding-bottom:.15em}
.fb-flow .toc-e{display:flex;gap:.5em;align-items:baseline;padding:.22em 0;cursor:pointer}
.fb-flow .toc-e .no{color:var(--acc);font-weight:700;min-width:2.4em}
.fb-flow .toc-e .nm{flex:1}
.fb-flow .toc-e .dots{flex:1 1 1em;border-bottom:1.5px dotted #c8bfae;transform:translateY(-.3em);min-width:1em}
.fb-flow .toc-e .pg{font-variant-numeric:tabular-nums;font-weight:700}
.fb-flow .toc-e .nm{flex:0 1 auto}
.fb-flow dl{margin:0}
.fb-flow dt{font-weight:700;color:#141a33;margin-top:.55em;break-after:avoid}
.fb-flow dd{margin:.1em 0 0 0;font-size:.94em}
.fb-flow .key{display:flex;gap:.6em;align-items:flex-start;margin:.5em 0}
.fb-flow .key i{flex:none;width:1.2em;height:1.2em;border-radius:4px;margin-top:.2em;border:1px solid}
/* cover */
.fb-cover{position:absolute;inset:0;background:linear-gradient(160deg,#0b1a4a 0%,#081131 55%,#05091d 100%);color:#F3F5FF;display:flex;flex-direction:column;padding:8% 9%;overflow:hidden}
.fb-cover .grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;border-radius:12px;overflow:hidden;margin-bottom:7%;flex:0 1 auto;aspect-ratio:16/10.5}
.fb-cover .grid img{width:100%;height:100%;object-fit:cover;display:block}
.fb-cover .k{font-size:.8em;letter-spacing:.2em;text-transform:uppercase;color:#FFD766;font-weight:700}
.fb-cover h1{font-family:"Bricolage Grotesque",system-ui,sans-serif;font-size:2.7em;line-height:1.02;margin:.2em 0 .25em;letter-spacing:-.015em}
.fb-cover .sub{font-size:1.05em;opacity:.88;max-width:28em}
.fb-cover .ed{display:inline-block;margin-top:1em;padding:.3em .9em;border-radius:99px;background:#FFD766;color:#1a1300;font-weight:800;font-size:.85em;letter-spacing:.06em;text-transform:uppercase;align-self:flex-start}
.fb-cover .by{margin-top:auto;font-size:1.05em;font-weight:700;color:#FFD766;border-top:1px solid rgba(255,215,102,.35);padding-top:.7em}
.fb-cover .stripe{position:absolute;right:0;top:0;bottom:0;width:10px;background:linear-gradient(180deg,#B7791F,#0F7C8C,#A63D6B)}
.fb-cover.back{justify-content:center}
.fb-cover.back h2{font-family:"Bricolage Grotesque",system-ui,sans-serif;font-size:1.6em;margin:0 0 .5em;color:#FFD766}
.fb-cover.back ul{padding-left:1.1em;margin:0 0 1.2em}
.fb-cover.back li{margin:.3em 0}
.fb-cover.ec{background:radial-gradient(120% 80% at 80% -10%,#0B1A46 0%,transparent 60%),radial-gradient(90% 60% at -10% 110%,#0B1A46 0%,transparent 55%),#060D26;padding:0}
.fb-cover.ec .stars i{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff}
.fb-cover.ec .sun{position:absolute;right:-12%;top:-9%;width:46%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 35%,#FFF3C4,#F5C542 40%,#9C6F07 75%);box-shadow:0 0 60px 12px rgba(245,197,66,.45)}
.fb-cover.ec .bezel{position:absolute;inset:3.5%;border-radius:18px;padding:3px;background:conic-gradient(from 210deg,#FFF6C8,#F5C542 12%,#B07A12 26%,#FFE38A 38%,#C8901A 52%,#FFF3B0 64%,#9A6B0F 78%,#F5C542 90%,#FFF6C8);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.fb-cover.ec .inner{position:absolute;inset:3.5%;padding:7% 8%;display:flex;flex-direction:column}
.fb-cover.ec .brandrow{display:flex;align-items:center;gap:.6em;margin-bottom:6%}
.fb-cover.ec .mark{width:2.4em;height:2.4em;border-radius:.7em;background:linear-gradient(145deg,#FFE58A,#F5C542 45%,#B8860B);color:#0A1433;display:grid;place-items:center;font:800 1em "Bricolage Grotesque",system-ui;box-shadow:0 3px 0 #7A5806,0 0 18px rgba(245,197,66,.45);flex:none}
.fb-cover.ec .bt{font:800 1em "Bricolage Grotesque",system-ui;color:#fff}.fb-cover.ec .bt small{display:block;font:400 .72em "Atkinson Hyperlegible",system-ui;opacity:.8}
.fb-cover.ec .grid{border:2px solid rgba(255,215,102,.6);box-shadow:0 18px 40px -16px rgba(0,0,0,.8)}
.fb-cover.ec h1{background:linear-gradient(180deg,#FFFFFF 20%,#FFE38A);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 2px 0 rgba(0,0,0,.5))}
.fb-cover.ec h1 span{display:block;font-size:.6em}
.fb-cover.ec.back .inner{justify-content:flex-start;gap:.4em}.fb-cover.ec.back h2{font-family:"Bricolage Grotesque",system-ui;color:#FFD766;margin:.3em 0}
.fb-cover.ec .author{margin-top:auto;background:rgba(255,255,255,.07);border:1px solid rgba(255,215,102,.35);border-radius:12px;padding:.6em .8em;font-size:.86em;line-height:1.45}
.fb-cover.ec .author h3{margin:0 0 .3em;color:#FFD766;font-family:"Bricolage Grotesque",system-ui}
.fb-cover.ec .by{margin-top:.8em}
.fb-blank{position:absolute;inset:0;background:#FFFDF8}
@media (prefers-reduced-motion:reduce){.fb-leaf{transition:none!important}}
@media (max-width:640px){.fb-bar .t small{display:none}.fb-btn .fb-lbl{display:none}}
`;
    document.head.appendChild(s);
  }

  /* ---------- content model ---------- */
  function sections(M, opt) {
    const D = window.COURSE_MODULES || [], FIGS = window.COURSE_FIGS || {}, UF = window.COURSE_FIGURES || {}, NP = window.COURSE_NOTE_PHOTOS || {};
    const S = [];
    const course = M.course;
    S.push({ kind: 'cover', fixed: true });
    S.push({ kind: 'toc', head: 'Contents', acc: ACC[0] });
    S.push({ kind: 'about', head: 'About this book', acc: ACC[0], html: aboutHTML(M) });
    D.forEach((mod, mi) => {
      const acc = ACC[mi % ACC.length], mno = mi + 1;
      const m0 = S.length, parts = [moduleHTML(mod, mno, M)], kids = [];
      S.push({ kind: 'module', mi, acc, head: `${PART} ${mno} · ${mod.title}`, label: `${PART} ${mno}: ${mod.title}`, toc: 'm', html: '', kids });
      mod.units.forEach((u, ui) => {
        const n = `${mno}.${ui + 1}`, head = `Unit ${n} · ${u.title}`;
        const learn = u.screens.filter(s => s.type === 'learn'), vi = S.length;
        S.push({ kind: 'unit', virtual: true, parent: m0, mi, acc, head, label: u.title, no: n, toc: 'u' }); kids.push(vi);
        parts.push(`<div class="fb-u" data-si="${vi}">` + unitOpenHTML(u, n, UF[u.id], M) + learn.map((s, k) => topicHTML(u, s, `${n}.${k + 1}`, FIGS[u.id] || [], NP[u.id] || [], M, mno, mod)).join('') + `</div>`);
      });
      const TST = (window.COURSE_BOOK_TESTS || {})[mod.id];
      if (TST) { const vi = S.length; S.push({ kind: 'test', virtual: true, parent: m0, mi, acc, head: `${PART} ${mno} · Test`, label: `${PART} ${mno} test`, toc: 't' }); kids.push(vi); parts.push(`<div class="fb-u fb-tst" data-si="${vi}">` + TST + `</div>`); }
      if (mod.glossary && mod.glossary.length) { const vi = S.length; S.push({ kind: 'gloss', virtual: true, parent: m0, mi, acc, head: `${PART} ${mno} · Glossary`, label: `${PART} ${mno} glossary`, toc: 'g' }); kids.push(vi); parts.push(`<div class="fb-u fb-gl" data-si="${vi}">` + glossHTML(mod, mno) + `</div>`); }
      S[m0].html = parts.join('');
    });
    const XS = window.COURSE_BOOK_EXTRAS || [];
    if (XS.length) {
      const x0 = S.length, xk = [], xp = [];
      S.push({ kind: 'xflow', acc: XS[0].acc || ACC[3], head: XS[0].label, html: '', kids: xk });
      XS.forEach((x, i) => { const vi = S.length; S.push({ kind: 'extra', virtual: true, parent: x0, acc: x.acc || ACC[(i + 3) % ACC.length], head: x.label, label: x.label, toc: 'x' }); xk.push(vi); xp.push(`<div class="fb-u fb-xu" data-si="${vi}" style="--acc:${x.acc || ACC[(i + 3) % ACC.length]}">` + x.html + `</div>`); });
      S[x0].html = xp.join('');
    }
    S.push({ kind: 'backcover', fixed: true });
    return S;
  }
  const ar = (w, h) => `aspect-ratio:${+w || 3}/${+h || 2}`;
  const IMG = (src, alt, w, h, cls) => `<img class="${cls || ''}" data-src="${esc(src)}" src="${BLANK}" alt="${esc(alt || '')}" width="${+w || 1000}" height="${+h || 667}" style="${ar(w, h)}" draggable="false">`;
  function aboutHTML(M) {
    const D = window.COURSE_MODULES || [], all = D.map(m => m.units.map(u => u.screens.map(s => (s.html || '') + (s.deeper || '')).join('')).join('')).join('');
    const hasPh = Object.keys(window.COURSE_NOTE_PHOTOS || {}).length || Object.keys(window.COURSE_FIGURES || {}).length, hasTip = /class="tip"/.test(all), hasPas = /class="passage"/.test(all), hasCh = /deeper/.test('') || D.some(m => m.units.some(u => u.screens.some(s => s.deeper)));
    return `<p class="op-k">Before you start</p><h1 class="op-t">About this book</h1>
<p>This book holds every set of notes from the ${esc(M.course)} e-course, laid out as printed pages. Each unit opens with its learning outcomes, then works through the notes topic by topic, with ${hasPh ? 'real photographs, ' : ''}diagrams and worked examples from the Caribbean and beyond.</p>
<p>Look out for these features as you read:</p>
${hasTip ? `<div class="key"><i style="background:#FFF7E2;border-color:#E8CF8E"></i><div><b>Tips</b> show how to use an idea in an exam answer.</div></div>` : ''}
${hasPas ? `<div class="key"><i style="background:#F7F2E7;border-color:#B7791F"></i><div><b>Key passages</b> give definitions, quotations and texts to read.</div></div>` : ''}
${hasPh ? `<div class="key"><i style="background:#fff;border-color:#DCD3C1"></i><div><b>Real-world photos and examples</b> link each topic to something you can see in everyday life.</div></div>` : ''}
${M.teacher ? `<div class="key"><i style="background:#ECF7EF;border-color:#B9DFC4"></i><div><b>Support: in simpler words</b> restates the topic in plain language for students who need it (Teacher Edition).</div></div>` : ''}
${hasCh ? `<div class="key"><i style="background:#EEF2FC;border-color:#C3D0F2"></i><div><b>Challenge: go further</b> stretches strong students further.</div></div>` : ''}
${Object.keys(window.COURSE_ENRICH || {}).length ? `<h3>Colour key</h3><div class="tablewrap"><table><tbody>
<tr><td style="background:#FFF6B8;font-family:Caveat,cursive;font-size:1.15em">✏️ Margin note / tip</td><td>Exam and study tips, handwritten as if by your teacher.</td></tr>
<tr><td style="background:#FFF8D6">💡 Did you know?</td><td>A surprising true fact linked to the topic.</td></tr>
<tr><td style="background:#E6F6F4">🌴 Caribbean connection</td><td>How the idea shows up in our region.</td></tr>
<tr><td style="background:#ECF7EF">✅ Good use</td><td>A real case (or a labelled scenario) where it was done well.</td></tr>
<tr><td style="background:#FDEEEC">⚠️ Misuse</td><td>A real case (or a labelled scenario) where it went wrong.</td></tr>
<tr><td style="background:#F3EEFC">🧠 Brain challenge</td><td>A debate question to think about${M.teacher ? ', with a model answer for teachers' : ''}.</td></tr>
<tr><td style="background:#FFF3E6">🛠️ Try it</td><td>A step-by-step activity for class, with a 📚 version for students studying alone.</td></tr>
<tr><td style="background:#EAF4FF">✔ Quick check</td><td>A one-question self-test; the answer is printed upside down.</td></tr>
<tr><td style="background:#FFFDF2;border:2px solid #1E2230">💬 Comic</td><td>A short story that makes the idea click.</td></tr>
<tr><td style="background:#FFF;border:1px solid #F2C4BE">▶ Watch · ♪ TikTok</td><td>Videos and clips: scan the QR code or tap the title.</td></tr>
<tr><td style="background:#EEF4FF">📲 Linked e-course</td><td>Where to find this topic, its games and quizzes in your e-course.</td></tr>
${M.teacher ? `<tr><td style="background:#ECF7EF">Support: in simpler words</td><td>The topic in plain language (Teacher Edition).</td></tr>` : ''}
${hasCh ? `<tr><td style="background:#EEF2FC">Challenge: go further</td><td>Stretch work for top-band answers.</td></tr>` : ''}
</tbody></table></div>` : ''}
<p>Turn pages with the arrows, the arrow keys, or by tapping or swiping the page. Use <b>Contents</b> to jump to any unit, and <b>A−</b> and <b>A+</b> to change the text size. ${hasPh ? 'Tap any photo or diagram to see it larger.' : ''}</p>
<p class="src">Kester Small</p>`;
  }
  function objList(arr, M) {
    return (arr || []).map(o => {
      let t = String(o), src = '';
      const m = t.match(/\s*\[([^\]]+)\]\s*$/);
      if (m) { t = t.slice(0, m.index); src = m[1]; }
      t = t.replace(/^By the end you will be able to\s*/i, '');
      t = t.charAt(0).toUpperCase() + t.slice(1);
      return `<li>${esc(t)}${src && M.teacher ? ` <span class="src">[${esc(src)}]</span>` : ''}</li>`;
    }).join('');
  }
  function moduleHTML(mod, mno, M) {
    return `<p class="op-k">${esc(M.course)}</p><div class="bigno">${mno}</div><h1 class="op-t">${PART} ${mno}<br>${esc(mod.title)}</h1>
${mod.overview || ''}
${mod.objectives && mod.objectives.length ? `<div class="obj"><h3>${PART} outcomes</h3><ul>${objList(mod.objectives, M)}</ul></div>` : ''}
<h3>Units in this module</h3><ul class="ulist">${mod.units.map((u, i) => `<li><b>${mno}.${i + 1}</b><span>${esc(u.title)}</span></li>`).join('')}</ul>`;
  }
  function unitOpenHTML(u, n, f, M) {
    const hero = f ? `<figure class="fb-hero fb-zoomable">${IMG(f.src, f.alt, f.w, f.h)}<figcaption><b>Figure ${esc(n)}</b> ${esc(f.cap)}<span class="cr">Photo: ${esc(f.by)}</span></figcaption></figure>` : '';
    return `${hero}<p class="op-k">Unit ${esc(n)}</p><h1 class="op-t">${esc(u.title)}</h1>
${u.objectives && u.objectives.length ? `<div class="obj"><h3>In this unit you will learn to</h3><ul>${objList(u.objectives, M)}</ul></div>` : ''}${ecUnit(u, n)}`;
  }
  function ecUnit(u, n) {
    const R = (window.DM_UNIT_RESOURCES || {})[u.id] || {}, GM = window.DM_UNIT_GAME_META || {};
    const games = (R.games || []).map(g => (GM[g.id] && (GM[g.id].name || GM[g.id].title)) || g.id).filter(Boolean);
    const vids = (u.videos || []).map(v => v.title).filter(Boolean);
    return `<div class="fb-x ecu"><span class="fb-lbl">📲 Linked e-course: Unit ${esc(n)}</span><p>Every topic in this unit matches a notes screen in your e-course, where you can also practise, play and test yourself.</p>${games.length ? `<p><b>Games and practice:</b> ${games.map(esc).join(' · ')}</p>` : ''}${vids.length ? `<p><b>Videos in the e-course:</b> ${vids.map(esc).join(' · ')}</p>` : ''}</div>`;
  }
  function topicHTML(u, s, no, figs, photos, M, mno, mod) {
    const host = document.createElement('div');
    host.innerHTML = s.html || '';
    host.querySelectorAll('a').forEach(a => { const sp = document.createElement('span'); sp.innerHTML = a.innerHTML; a.replaceWith(sp); });
    host.querySelectorAll('button,script,iframe,video,audio,input,select,textarea').forEach(e => e.remove());
    host.querySelectorAll('figure.fig').forEach(f => f.classList.add('fb-zoomable'));
    host.querySelectorAll('table').forEach(t => {
      if (t.tHead) return; const r = t.rows[0];
      if (r && r.cells.length && [...r.cells].every(c => c.tagName === 'TH')) { const th = t.createTHead(); th.appendChild(r); }
    });
    const mine = photos.filter(p => p.screen === s.title);
    const ph = mine.filter(p => p.kind !== 'example'), ex = mine.filter(p => p.kind === 'example');
    if (ph.length) {
      const html = ph.map(p => `<figure class="fb-ph fb-zoomable">${IMG(p.src, p.alt, p.w, p.h)}${p.pal ? palHTML(p.pal) : ''}<figcaption><span class="lb">${esc(p.title || 'Real world:')}</span> ${esc(p.cap)}<span class="cr">Photo: ${esc(p.by)}</span></figcaption></figure>`).join('');
      const first = [...host.children].find(e => e.tagName === 'P' && (e.textContent || '').trim().length > 40);
      if (first) first.insertAdjacentHTML('afterend', html); else host.insertAdjacentHTML('afterbegin', html);
    }
    let extra = '';
    if (ex.length) {
      extra += `<h3 class="fb-ex-h">Real-world examples</h3><p>${ex[0].intro || 'Each photo below is a real scene. The swatches show the main colours measured from the photo, with their hex codes and how much of the image each one covers.'}</p>`;
      extra += ex.map(f => `<div class="fb-card">${f.tag ? `<span class="tag">${esc(f.tag)}</span>` : ''}<h4>${esc(f.title || '')}</h4><div class="fb-zoomable">${IMG(f.src, f.alt, f.w, f.h)}</div>${palHTML(f.pal)}<div class="an">${f.html || ''}</div>${f.q ? `<div class="q"><b>Try it:</b> ${f.q}</div>` : ''}<span class="cr">Photo: ${esc(f.by)}</span></div>`).join('');
    }
    const fg = figs.filter(f => f.screen === s.title).map(f => f.img
      ? `<figure class="fb-ph fb-zoomable">${IMG(f.img, f.alt, f.w || 1000, f.h || 667)}<figcaption><b>${esc(f.title || '')}</b> ${esc(f.caption || '')}</figcaption></figure>`
      : `<figure class="fb-svg fb-zoomable" role="group" aria-label="${esc(f.title || 'Figure')}">${f.svg}<figcaption><b>${esc(f.title || '')}</b> ${esc(f.caption || '')}</figcaption></figure>`).join('');
    const tips = [...host.children].filter(e => e.classList && e.classList.contains('tip'));
    const lastTip = tips.length && tips[tips.length - 1] === host.lastElementChild ? host.lastElementChild : null;
    if (lastTip) { lastTip.insertAdjacentHTML('beforebegin', fg + extra); } else host.insertAdjacentHTML('beforeend', fg + extra);
    let boxes = '';
    if (M.teacher && s.plain) boxes += `<div class="fb-box sup"><span class="fb-lbl">Support: in simpler words</span>${s.plain}</div>`;
    if (s.deeper) boxes += `<div class="fb-box ch"><span class="fb-lbl">Challenge: go further</span>${s.deeper}</div>`;
    const kw = [...new Set([...host.querySelectorAll('b,strong')].map(b => (b.textContent || '').trim().replace(/[:.,;]+$/, '')).filter(t => t.length > 2 && t.length < 34 && !/^(teacher|tip|note|example|answer)/i.test(t)))].slice(0, 8);
    const chips = kw.length >= 3 ? `<div class="kw"><span>Key words</span>${kw.map(k => `<i>${esc(k)}</i>`).join('')}</div>` : '';
    const ec = `<p class="ecl">📲 In your e-course: ${PART} ${mno} › Unit ${esc(no.split('.').slice(0, 2).join('.'))} ${esc(u.title)} › “${esc(s.title)}”</p>`;
    return `<h2><span class="n">${esc(no)}</span>${esc(s.title)}</h2>${ec}${chips}${host.innerHTML}${enrichHTML(u, s, M)}${boxes}`;
  }
  const SKIN = { light: '#F3D3B8', medium: '#E0AC84', tan: '#C68A5E', brown: '#9A6240', dark: '#6B4128' };
  function avatar(c, mood) {
    const sk = SKIN[c.skin] || SKIN.brown, sh = /^#[0-9a-f]{3,6}$/i.test(c.shirt || '') ? c.shirt : '#2457C5', hc = '#2B1B12';
    const hair = { short: `<path d="M14 24 Q14 8 30 8 Q46 8 46 24 Q42 16 30 15 Q18 16 14 24Z" fill="${hc}"/>`, long: `<path d="M12 40 Q10 8 30 8 Q50 8 48 40 L44 40 Q46 18 30 16 Q14 18 16 40Z" fill="${hc}"/>`, curly: `<g fill="${hc}"><circle cx="18" cy="16" r="7"/><circle cx="30" cy="11" r="8"/><circle cx="42" cy="16" r="7"/><circle cx="14" cy="25" r="5"/><circle cx="46" cy="25" r="5"/></g>`, bun: `<g fill="${hc}"><circle cx="30" cy="6" r="6"/><path d="M14 24 Q14 10 30 10 Q46 10 46 24 Q40 16 30 16 Q20 16 14 24Z"/></g>`, locs: `<g stroke="${hc}" stroke-width="4" stroke-linecap="round"><path d="M16 14 V38"/><path d="M22 10 V36"/><path d="M38 10 V36"/><path d="M44 14 V38"/><path d="M18 12 Q30 4 42 12"/></g>`, bald: '' }[c.hair] || '';
    const mouth = { happy: '<path d="M24 32 Q30 38 36 32" stroke="#4a2a1a" stroke-width="2" fill="none" stroke-linecap="round"/>', surprised: '<ellipse cx="30" cy="34" rx="3" ry="4" fill="#4a2a1a"/>', thinking: '<path d="M25 34 H35" stroke="#4a2a1a" stroke-width="2" stroke-linecap="round"/>', worried: '<path d="M24 36 Q30 31 36 36" stroke="#4a2a1a" stroke-width="2" fill="none" stroke-linecap="round"/>', neutral: '<path d="M25 34 Q30 36 35 34" stroke="#4a2a1a" stroke-width="2" fill="none" stroke-linecap="round"/>' }[mood] || '';
    return `<svg viewBox="0 0 60 64" class="av" aria-hidden="true"><path d="M8 64 Q8 46 30 46 Q52 46 52 64Z" fill="${sh}"/><circle cx="30" cy="26" r="16" fill="${sk}"/>${hair}<circle cx="24" cy="25" r="2" fill="#2b1b12"/><circle cx="36" cy="25" r="2" fill="#2b1b12"/>${mouth}</svg>`;
  }
  function comicHTML(c) {
    const cast = {}; (c.cast || []).forEach(p => cast[p.name] = p);
    return `<div class="comic"><span class="fb-lbl">💬 Comic: ${esc(c.title || '')}</span><div class="cgrid">${c.panels.map((p, i) => `<div class="cpanel"><div class="cscene">${i + 1} · ${esc(p.scene || '')}</div>${(p.lines || []).map((l, j) => `<div class="cline ${j % 2 ? 'r' : ''}">${avatar(cast[l.who] || { skin: 'brown', hair: 'short' }, l.mood)}<div class="bub"><b>${esc(l.who)}</b>${esc(l.say)}</div></div>`).join('')}${p.caption ? `<div class="ccap">${esc(p.caption)}</div>` : ''}</div>`).join('')}</div></div>`;
  }
  function enrichHTML(u, s, M) {
    const E = window.COURSE_ENRICH || {}; let h = '';
    (E._figs || []).filter(f => f.match === s.title).forEach(f => { h += f.comic ? comicHTML(f.comic) : f.html ? f.html : `<figure class="fb-svg fb-zoomable" role="group" aria-label="${esc(f.title || 'Figure')}">${f.svg}<figcaption><b>${esc(f.title || '')}</b> ${esc(f.caption || '')}</figcaption></figure>`; });
    const e = (E[u.id] || []).find(x => x.screen === s.title); if (!e) return h;
    if (e.photos && e.photos.length) {
      h += `<h3 class="fb-ex-h fb-more">More real-world examples</h3><div class="pgrid">` + e.photos.map(p => `<figure class="fb-zoomable">${IMG(p.src, p.alt, 4, 3)}<figcaption>${esc(p.cap)}<span class="cr">Photo: ${esc(p.by)}</span></figcaption></figure>`).join('') + `</div>`;
    }
    if (e.caribbean) h += `<div class="fb-x carib"><span class="fb-lbl">🌴 Caribbean connection</span><p>${esc(e.caribbean)}</p></div>`;
    if (e.case && e.case.html) h += `<div class="fb-x ${e.case.type === 'misuse' ? 'mis' : 'use'}"><span class="fb-lbl">${e.case.type === 'misuse' ? '⚠️ Misuse' : '✅ Good use'}${e.case.real === false ? ' · Scenario' : ' · Real case'}</span><h4>${esc(e.case.title || '')}</h4>${e.case.html}</div>`;
    if (e.challenge && e.challenge.q) h += `<div class="fb-x brain"><span class="fb-lbl">🧠 Brain challenge</span><p class="bq">${esc(e.challenge.q)}</p>${(e.challenge.hints || []).length ? `<ul>${e.challenge.hints.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${M.teacher && e.challenge.answer ? `<p class="ans"><b>Model answer:</b> ${esc(e.challenge.answer)}</p>` : ''}</div>`;
    if (e.activity && e.activity.title) h += `<div class="fb-x act"><span class="fb-lbl">🛠️ Try it${e.activity.minutes ? ` · ${+e.activity.minutes} min` : ''}</span><h4>${esc(e.activity.title)}</h4><ol>${(e.activity.steps || []).map(x => `<li>${esc(x)}</li>`).join('')}</ol>${(e.activity.solo || e.solo) ? `<p class="solo"><b>📚 Studying alone?</b> ${esc(e.activity.solo || e.solo)}</p>` : ''}</div>`;
    if (e.tip) h += `<div class="fb-x tipnote"><span class="fb-lbl">✏️ Teacher's margin note</span><p>${esc(e.tip)}</p></div>`;
    if (e.comic && (e.comic.panels || []).length) h += comicHTML(e.comic);
    if (e.didyouknow) h += `<div class="fb-x dyk"><span class="fb-lbl">💡 Did you know?</span><p>${esc(e.didyouknow)}</p></div>`;
    const qc = e.quickcheck;
    if (qc && qc.q && (qc.options || []).length) h += `<div class="fb-x qc"><span class="fb-lbl">✔ Quick check</span><p class="bq">${esc(qc.q)}</p><ol type="A">${qc.options.map(o => `<li>${esc(o)}</li>`).join('')}</ol><p class="flipans">Answer: <b>${'ABC'[+qc.answer] || ''}</b>. ${esc(qc.why || '')}</p></div>`;
    const qrBox = (cls, lbl, v, base) => { const url = v.url || (base + encodeURIComponent(v.search || v.title || '')); return `<div class="fb-x ${cls}">${v.qr ? `<div class="qr" aria-hidden="true">${v.qr}</div>` : ''}<div><span class="fb-lbl">${lbl}${v.url ? '' : ' · search'}</span><p><a href="${esc(url)}" target="_blank" rel="noopener">${esc(v.title || 'Open')}</a>${v.channel || v.creator ? ` <span class="cr">${esc(v.channel || v.creator)}</span>` : ''}</p><p class="cr">Scan the code with your phone or tap the title.</p></div></div>`; };
    const vlink = (v, base) => v && (v.url || v.search) ? { url: v.url || (base + encodeURIComponent(v.search)), title: v.title, qr: v.qr, who: v.channel || v.creator } : null;
    const yv = vlink(e.video, 'https://www.youtube.com/results?search_query='), tv = vlink(e.tiktok, 'https://www.tiktok.com/search?q=');
    if (yv || tv) h += `<div class="fb-x media"><span class="fb-lbl">▶ Watch and scroll</span><div class="mrow">${[[yv, 'YouTube'], [tv, 'TikTok']].filter(x => x[0]).map(([v, n]) => `<div class="mi">${v.qr ? `<div class="qr" aria-hidden="true">${v.qr}</div>` : ''}<div><b>${n}</b><br><a href="${esc(v.url)}" target="_blank" rel="noopener">${esc(v.title || 'Open')}</a>${v.who ? ` <span class="cr">${esc(v.who)}</span>` : ''}</div></div>`).join('')}</div></div>`;
    if (false) {
    if ((e.readmore || []).length) h += `<div class="fb-x rm"><span class="fb-lbl">🔗 Read more</span><ul>${e.readmore.filter(r => r.url).map(r => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title || r.url)}</a>${r.site ? ` <span class="cr">${esc(r.site)}</span>` : ''}</li>`).join('')}</ul></div>`;
    }
    if (false && e.video) {
      const url = e.video.url || ('https://www.youtube.com/results?search_query=' + encodeURIComponent(e.video.search));
      h += `<div class="fb-x vid">${e.video.qr ? `<div class="qr" aria-hidden="true">${e.video.qr}</div>` : ''}<div><span class="fb-lbl">▶ Watch${e.video.url ? '' : ' · search YouTube'}</span><p><a href="${esc(url)}" target="_blank" rel="noopener">${esc(e.video.title || 'Watch on YouTube')}</a>${e.video.channel ? ` <span class="cr">${esc(e.video.channel)}</span>` : ''}</p><p class="cr">Scan the code with your phone or tap the title.</p></div></div>`;
    }
    return h;
  }
  function palHTML(p) {
    if (!p || !p.length) return '';
    return `<div class="pal">${p.map(c => `<div class="sw"><i style="background:${esc(c[0])}"></i><span>${esc(String(c[0]).toUpperCase())}${c[2] ? `<small>${esc(c[2])}</small>` : ''}<small>${+c[1]}% of photo</small></span></div>`).join('')}</div>`;
  }
  function glossHTML(mod, mno) {
    const g = [...mod.glossary].sort((a, b) => String(a.term).localeCompare(String(b.term)));
    return `<p class="op-k">${PART} ${mno}</p><h1 class="op-t" style="font-size:1.7em">Glossary</h1><dl>${g.map(x => `<dt>${esc(x.term)}</dt><dd>${esc(strip(x.def))}</dd>`).join('')}</dl>`;
  }
  function tocHTML(S, starts) {
    let h = `<p class="op-k">${esc(META.course)}</p><h1 class="op-t" style="font-size:1.8em">Contents</h1>`;
    const e = (i, no, nm) => `<div class="toc-e" data-go="${starts[i]}"><span class="no">${no}</span><span class="nm">${esc(nm)}</span><span class="dots"></span><span class="pg">${starts[i]}</span></div>`;
    S.forEach((s, i) => {
      if (s.kind === 'about') h += e(i, '', 'About this book');
      if (s.kind === 'module') h += `<div class="toc-m">${esc(s.label)}</div>`;
      if (s.kind === 'unit') h += e(i, s.no, s.label);
      if (s.kind === 'test') h += e(i, '', `${PART} test`);
      if (s.kind === 'gloss') h += e(i, '', 'Glossary');
      if (s.kind === 'extra') { if (!S.slice(0, i).some(z => z.kind === 'extra')) h += `<div class="toc-m">Practical and assessment sections</div>`; h += e(i, '★', s.label); }
    });
    return h;
  }
  function coverHTML(back) {
    const UF = window.COURSE_FIGURES || {}, D = window.COURSE_MODULES || [];
    const stars = Array.from({ length: 40 }, (_, k) => `<i style="left:${(k * 37) % 100}%;top:${(k * 53) % 100}%;opacity:${0.25 + ((k * 7) % 10) / 14}"></i>`).join('');
    const m = META.course.match(/^(.*?)\s+(Unit\s+\d+)$/i);
    const exam = /CSEC|EDPM/i.test(META.course) ? 'CSEC' : /ESL|English as/i.test(META.course) ? 'ESL' : 'CAPE';
    const subj = m ? m[1] : META.course;
    if (back) {
      return `<div class="fb-cover ec back"><div class="stars">${stars}</div><div class="bezel"></div><div class="inner"><div class="mark">G1</div><h2>${esc(META.course)}</h2><p class="sub">The complete illustrated textbook for the e-course: every notes topic with real-world photos, cases, comics, brain challenges, activities, videos and exam help.</p><ul>${D.map((md, i) => `<li><b>${PART} ${i + 1}:</b> ${esc(md.title)}</li>`).join('')}</ul><div class="author"><h3>About the author</h3><p><b>Kester Small</b> is an educator and curriculum developer based in Philipsburg, Sint Maarten, with an MA in Instructional Design and Technology. She works at St. Maarten Academy, where she teaches Electronic Document Preparation and Management (EDPM), Digital Media, Information Technology (CAPE and CSEC), Communication Studies, English A and Social Studies, and develops CSEC and CAPE courses, e-courses and textbooks in these subjects.</p></div><div class="by">Kester Small</div></div></div>`;
    }
    const ims = Object.values(UF).filter(f => f && f.src);
    const pick = [0, Math.floor(ims.length / 3), Math.floor(2 * ims.length / 3), ims.length - 1].map(i => ims[i]).filter(Boolean);
    return `<div class="fb-cover ec"><div class="stars">${stars}</div><div class="sun"></div><div class="bezel"></div><div class="inner"><div class="brandrow"><span class="mark">G1</span><span class="bt">${esc(META.course)}<small>Earn that Grade One in ${esc(subj)}</small></span></div>${pick.length === 4 ? `<div class="grid">${pick.map(f => `<img data-src="${esc(f.src)}" src="${BLANK}" alt="" draggable="false">`).join('')}</div>` : ''}<div class="k">${esc(exam)}${m ? ' · ' + esc(m[2]) : ''} · Illustrated textbook</div><h1>${esc(subj)}${m ? `<span>${esc(m[2])}</span>` : ''}</h1><div class="sub">Notes, real-world photos, Caribbean examples, comics, activities and exam help for every topic.</div>${META.teacher ? `<span class="ed">Teacher's Edition</span>` : ''}<div class="by">Kester Small</div></div></div>`;
  }


  /* ---------- layout & pagination ---------- */
  let META = meta(), ROOT = null, STAGE = null, BOOK = null, S = [], FLOWS = [], PAGES = [], STARTS = [], COUNTS = [], L = null;
  const headAt = p => { const pg = PAGES[p]; if (!pg) return ''; const sec = S[pg.s]; let h = sec.head || ''; (sec.kids || []).forEach(i => { if (STARTS[i] <= p) h = S[i].head; }); return h; };
  let cur = 0, busy = false, fs = 15, cloneN = 0, leafAnim = null;
  try { const v = +localStorage.getItem('fb:fs'); if (v >= 12 && v <= 22) fs = v; } catch (e) { }

  function geometry() {
    const r = STAGE.getBoundingClientRect(), vw = r.width, vh = r.height;
    const spread = vw >= 900 && vw > vh * 1.1;
    let w, h;
    if (spread) { h = Math.min(vh - 20, 1100); w = Math.min(h * 0.72, (vw - 80) / 2); h = Math.min(h, w / 0.66); }
    else { w = Math.min(vw - 16, 680); h = Math.min(vh - 12, w * 1.75); }
    w = Math.floor(Math.max(280, w)); h = Math.floor(Math.max(380, h));
    const px = w < 420 ? 18 : Math.round(w * 0.075), top = 46, bot = 42;
    return { spread, w, h, px, cw: w - 2 * px, ch: h - top - bot, top, gap: 60 };
  }
  function flowEl(html, g, acc) {
    const f = document.createElement('div'); f.className = 'fb-flow';
    f.style.cssText = `width:${g.cw}px;height:${g.ch}px;column-width:${g.cw}px;column-gap:${g.gap}px;--imgmax:${Math.round(g.ch * 0.3)}px;--figmax:${Math.round(g.ch * 0.5)}px;--heromax:${Math.round(g.ch * 0.34)}px;--acc:${acc || ACC[0]}`;
    f.innerHTML = html; return f;
  }
  function measure(g) {
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-30000px;top:0;visibility:hidden;pointer-events:none;contain:layout style';
    const pg = document.createElement('div'); pg.className = 'fb-page'; pg.style.cssText = `position:relative;width:${g.w}px;height:${g.h}px;--fs:${fs}px`;
    host.appendChild(pg); ROOT.appendChild(host);
    const count = f => Math.max(1, Math.round((f.scrollWidth + g.gap) / (g.cw + g.gap)));
    FLOWS = S.map((s, i) => { if (s.fixed || s.virtual) return null; const f = flowEl(s.kind === 'toc' ? tocHTML(S, S.map(() => 999)) : s.html, g, s.acc); pg.appendChild(f); return f; });
    let counts = S.map((s, i) => s.virtual ? 0 : s.fixed ? 1 : count(FLOWS[i]));
    const offs = {};
    S.forEach((s, i) => { if (s.kids && FLOWS[i]) { const fl = FLOWS[i].getBoundingClientRect().left; FLOWS[i].querySelectorAll('.fb-u[data-si]').forEach(el => { const c = el.firstElementChild || el; offs[+el.dataset.si] = Math.max(0, Math.floor((c.getBoundingClientRect().left - fl + 2) / (g.cw + g.gap))); }); } });
    const mkStarts = () => { const st = []; let p = 0; S.forEach((s, i) => { if (!s.virtual) { st[i] = p; p += counts[i]; } }); S.forEach((s, i) => { if (s.virtual) st[i] = st[s.parent] + Math.min(offs[i] || 0, counts[s.parent] - 1); }); return st; };
    for (let pass = 0; pass < 3; pass++) {
      STARTS = mkStarts();
      const ti = S.findIndex(s => s.kind === 'toc'); const f = flowEl(tocHTML(S, STARTS), g, S[ti].acc);
      pg.replaceChild(f, FLOWS[ti]); FLOWS[ti] = f; const c = count(f);
      if (c === counts[ti]) break; counts[ti] = c;
    }
    PAGES = []; S.forEach((s, i) => { for (let k = 0; k < counts[i]; k++) PAGES.push({ s: i, k }); }); STARTS = mkStarts(); COUNTS = counts;
    FLOWS.forEach(f => f && f.remove()); host.remove();
  }
  function uniq(node) {
    const n = ++cloneN, map = {};
    node.querySelectorAll('[id]').forEach(e => { const o = e.id, nn = o + '-fb' + n; map[o] = nn; e.id = nn; });
    if (!Object.keys(map).length) return;
    node.querySelectorAll('*').forEach(e => {
      for (const a of [...e.attributes]) {
        let v = a.value, ch = false;
        if (v.indexOf('url(#') >= 0) { v = v.replace(/url\(#([^)]+)\)/g, (m, id) => map[id] ? `url(#${map[id]})` : m); ch = true; }
        if ((a.name === 'href' || a.name === 'xlink:href') && v[0] === '#' && map[v.slice(1)]) { v = '#' + map[v.slice(1)]; ch = true; }
        if ((a.name === 'aria-labelledby' || a.name === 'aria-describedby')) { v = v.split(/\s+/).map(t => map[t] || t).join(' '); ch = true; }
        if (ch) e.setAttribute(a.name, v);
      }
    });
  }
  const FBI = {};
  function fbImg(k) {
    const tab = window.FB_IMG || (window.FB_IMG = {}); if (tab[k]) return Promise.resolve(tab[k]);
    const c = k.split('/')[0];
    if (!FBI[c]) FBI[c] = new Promise(res => { const sc = document.createElement('script'); sc.src = (CFG.imgBase || 'content/fb_img_') + c + '.js'; sc.onload = res; sc.onerror = res; document.head.appendChild(sc); });
    return FBI[c].then(() => (window.FB_IMG || {})[k]);
  }
  function loadImgs(node) { node.querySelectorAll('img[data-src]').forEach(im => { const v = im.getAttribute('data-src'); im.removeAttribute('data-src'); if (v.indexOf('fbimg:') === 0) fbImg(v.slice(6)).then(u => { if (u) im.src = u; }); else im.src = v; }); }
  function pageEl(p, side) {
    const g = L, el = document.createElement('div');
    if (p < 0 || p >= PAGES.length) { el.className = 'fb-blank'; return el; }
    const { s, k } = PAGES[p], sec = S[s];
    if (sec.kind === 'cover' || sec.kind === 'backcover') { el.className = 'fb-page ' + side; el.style.setProperty('--fs', Math.max(13, Math.min(18, g.w / 32)) + 'px'); el.innerHTML = coverHTML(sec.kind === 'backcover'); loadImgs(el); return el; }
    el.className = 'fb-page ' + side; el.style.setProperty('--fs', fs + 'px'); el.style.setProperty('--px', g.px + 'px'); el.style.setProperty('--acc', sec.acc || ACC[0]);
    el.style.setProperty('--tabtop', (60 + ((sec.mi || 0) * 84)) + 'px');
    const showHead = !(k === 0 && (sec.kind === 'unit' || sec.kind === 'module' || sec.kind === 'toc' || sec.kind === 'about'));
    el.innerHTML = `${showHead ? `<div class="hd"><span>${sec.mi != null ? `<b>${PART} ${sec.mi + 1}</b> · ` : ''}${esc(headAt(p))}</span><span>${esc(META.course)}</span></div>` : ''}${sec.mi != null ? '<div class="tab"></div>' : ''}<div class="ft"><span>${esc(META.course)}${META.teacher ? " · Teacher's Edition" : ''}</span><b>${p}</b></div>`;
    const fr = document.createElement('div'); fr.className = 'fb-frame'; fr.style.cssText = `left:${g.px}px;top:${g.top}px;width:${g.cw}px;height:${g.ch}px`;
    const f = flowEl(sec.kind === 'toc' ? tocHTML(S, STARTS) : sec.html, g, sec.acc);
    f.style.transform = `translateX(${-k * (g.cw + g.gap)}px)`;
    uniq(f); loadImgs(f); fr.appendChild(f); el.appendChild(fr);
    return el;
  }

  /* ---------- spreads & turning ---------- */
  const spreadOf = p => L.spread ? Math.floor((p + 1) / 2) : p;
  const lastSpread = () => spreadOf(PAGES.length - 1);
  const pagesOf = sp => L.spread ? [sp * 2 - 1, sp * 2] : [sp];
  function slot(x, page, side) {
    const d = document.createElement('div'); d.className = 'fb-slot'; d.style.cssText = `left:${x}px;width:${L.w}px;height:${L.h}px`;
    d.appendChild(pageEl(page, side)); return d;
  }
  function render() {
    BOOK.innerHTML = ''; BOOK.className = 'fb-book' + (L.spread ? ' spread' : '');
    BOOK.style.width = (L.spread ? 2 * L.w : L.w) + 'px'; BOOK.style.height = L.h + 'px';
    const [a, b] = pagesOf(cur);
    if (L.spread) { BOOK.appendChild(slot(0, a, 'l')); BOOK.appendChild(slot(L.w, b, 'r')); }
    else BOOK.appendChild(slot(0, a, 'single'));
    if (L.spread && cur === 0) BOOK.firstChild.style.visibility = 'hidden';
    if (L.spread && b >= PAGES.length) BOOK.lastChild.style.visibility = 'hidden';
    status(); save();
  }
  function status() {
    const r = ROOT.querySelector('.fb-range'), pg = ROOT.querySelector('.fb-pgno');
    const ps = pagesOf(cur).filter(p => p >= 0 && p < PAGES.length);
    r.max = lastSpread(); r.value = cur;
    pg.textContent = ps.length ? (ps.length > 1 ? `Pages ${ps[0]}–${ps[1]} of ${PAGES.length - 1}` : (ps[0] === 0 ? 'Cover' : `Page ${ps[0]} of ${PAGES.length - 1}`)) : '';
    ROOT.querySelector('[data-fb=prev]').disabled = cur <= 0; ROOT.querySelector('[data-fb=next]').disabled = cur >= lastSpread();
    ROOT.querySelector('.fb-bar .t small').textContent = headAt(Math.max(0, ps[ps.length - 1] || 0));
  }
  function finishAnim() { if (leafAnim) { const f = leafAnim; leafAnim = null; f(); } }
  function turn(dir) {
    finishAnim();
    const to = Math.max(0, Math.min(lastSpread(), cur + dir)); if (to === cur) return;
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || Math.abs(to - cur) > 1) { cur = to; render(); return; }
    const from = pagesOf(cur), next = pagesOf(to), w = L.w;
    const leaf = document.createElement('div'); leaf.className = 'fb-leaf'; leaf.style.width = w + 'px'; leaf.style.height = L.h + 'px';
    const face = (p, side, back) => { const f = document.createElement('div'); f.className = 'fb-face' + (back ? ' back' : ''); f.appendChild(pageEl(p, side)); return f; };
    let endT;
    if (L.spread) {
      const slots = BOOK.querySelectorAll('.fb-slot');
      if (dir > 0) {
        slots[1].replaceWith(slot(w, next[1], 'r')); if (next[1] >= PAGES.length) BOOK.querySelectorAll('.fb-slot')[1].style.visibility = 'hidden';
        leaf.style.left = w + 'px'; leaf.style.transformOrigin = '0 50%';
        leaf.appendChild(face(from[1], 'r', false)); leaf.appendChild(face(next[0], 'l', true)); endT = 'rotateY(-180deg)';
      } else {
        slots[0].replaceWith(slot(0, next[0], 'l')); if (to === 0) BOOK.querySelectorAll('.fb-slot')[0].style.visibility = 'hidden';
        leaf.style.left = '0px'; leaf.style.transformOrigin = '100% 50%';
        leaf.appendChild(face(from[0], 'l', false)); leaf.appendChild(face(next[1], 'r', true)); endT = 'rotateY(180deg)';
      }
    } else {
      leaf.style.left = '0px'; leaf.style.transformOrigin = '0 50%';
      if (dir > 0) { BOOK.firstChild.replaceWith(slot(0, next[0], 'single')); leaf.appendChild(face(from[0], 'single', false)); const b = document.createElement('div'); b.className = 'fb-face back'; b.innerHTML = '<div class="fb-blank"></div>'; leaf.appendChild(b); endT = 'rotateY(-180deg)'; }
      else { leaf.appendChild(face(next[0], 'single', false)); leaf.style.transform = 'rotateY(-180deg)'; endT = 'rotateY(0deg)'; }
    }
    BOOK.appendChild(leaf);
    cur = to; status();
    const done = () => { leaf.remove(); render(); };
    leafAnim = done;
    leaf.getBoundingClientRect();
    requestAnimationFrame(() => {
      leaf.style.transition = 'transform .62s cubic-bezier(.33,.06,.2,1)'; leaf.style.transform = endT;
      leaf.querySelectorAll('.fb-face').forEach(f => { f.style.transition = '--sh .62s'; f.style.setProperty('--sh', '1'); });
    });
    leaf.addEventListener('transitionend', e => { if (e.target === leaf && leafAnim === done) { leafAnim = null; done(); } });
    setTimeout(() => { if (leafAnim === done) { leafAnim = null; done(); } }, 1100);
  }
  function goPage(p) { finishAnim(); cur = spreadOf(Math.max(0, Math.min(PAGES.length - 1, p))); render(); }

  /* ---------- persistence ---------- */
  function save() { try { const p = pagesOf(cur).filter(x => x >= 0)[0] || 0, pg = PAGES[p]; if (pg) localStorage.setItem(META.key, JSON.stringify({ s: pg.s, f: pg.k / Math.max(1, countOf(pg.s)) })); } catch (e) { } }
  function load() { try { return JSON.parse(localStorage.getItem(META.key) || 'null'); } catch (e) { return null; } }
  const countOf = s => (S[s] && S[s].virtual) ? 1 : Math.max(1, COUNTS[s] || 1);
  function posNow() { const p = pagesOf(cur).filter(x => x >= 0)[0] || 0, pg = PAGES[p]; return pg ? { s: pg.s, f: pg.k / Math.max(1, countOf(pg.s)) } : null; }
  function toPos(pos) { if (!pos || STARTS[pos.s] == null) return 0; if (S[pos.s] && S[pos.s].virtual) return STARTS[pos.s]; return STARTS[pos.s] + Math.min(countOf(pos.s) - 1, Math.floor(pos.f * countOf(pos.s) + 0.001)); }

  /* ---------- build UI ---------- */
  function layout(pos) {
    const busyEl = ROOT.querySelector('.fb-busy'); busyEl.hidden = false;
    return new Promise(res => setTimeout(() => {
      L = geometry(); measure(L);
      cur = spreadOf(toPos(pos)); render(); busyEl.hidden = true; res();
    }, 30));
  }
  function tocPanel() {
    const box = ROOT.querySelector('.fb-toc');
    box.innerHTML = `<div class="box" role="dialog" aria-label="Contents"><h2>Contents <button type="button" class="fb-btn" data-fb="tocx" aria-label="Close contents">✕</button></h2>${S.map((s, i) => {
      if (s.kind === 'about') return `<button type="button" class="e" data-go="${STARTS[i]}"><span>About this book</span><span>${STARTS[i]}</span></button>`;
      if (s.kind === 'module') return `<button type="button" class="e m" data-go="${STARTS[i]}"><span>${esc(s.label)}</span><span>${STARTS[i]}</span></button>`;
      if (s.kind === 'unit') return `<button type="button" class="e" data-go="${STARTS[i]}"><span>${esc(s.no)}&nbsp;&nbsp;${esc(s.label)}</span><span>${STARTS[i]}</span></button>`;
      if (s.kind === 'test') return `<button type="button" class="e" data-go="${STARTS[i]}"><span>${PART} test</span><span>${STARTS[i]}</span></button>`;
      if (s.kind === 'gloss') return `<button type="button" class="e" data-go="${STARTS[i]}"><span>Glossary</span><span>${STARTS[i]}</span></button>`;
      if (s.kind === 'extra') return `<button type="button" class="e m" data-go="${STARTS[i]}"><span>★ ${esc(s.label)}</span><span>${STARTS[i]}</span></button>`;
      return '';
    }).join('')}</div>`;
    box.hidden = false; const f = box.querySelector('button.e'); if (f) f.focus();
  }
  function zoom(el) {
    const z = document.createElement('div'); z.className = 'fb-zoom'; z.setAttribute('role', 'dialog'); z.setAttribute('aria-label', 'Enlarged figure');
    const img = el.querySelector('img'), svg = el.querySelector('svg'), cap = el.querySelector('figcaption');
    z.innerHTML = `<div class="in">${svg ? svg.outerHTML : img ? `<img src="${esc(img.src)}" alt="${esc(img.alt)}">` : ''}${cap ? `<p>${cap.innerHTML}</p>` : ''}<button type="button" class="fb-btn gold">Close</button></div>`;
    if (svg) { const s2 = z.querySelector('svg'); s2.classList.add('fb-flow'); s2.style.cssText = 'column-count:auto;height:auto'; z.querySelector('.in').classList.add('fb-flow'); z.querySelector('.in').style.cssText = 'column-count:auto;max-width:min(1200px,100%);display:flex;flex-direction:column;gap:10px;align-items:center;--ink:#1E2230;--muted:#586076;--gold:#A86E00;--blue:#2457C5;--ok:#1C7A3E;--bad:#B42318;--surface:#FFFFFF;--line:#DCD3C1;--soft-gold:#FBEFCF;--soft-blue:#E4ECFA;--soft-ok:#DFF3E5;--soft-bad:#FBE4E2;--on-gold:#FFFFFF;color:#EEF1FB'; s2.style.background = '#fff'; s2.style.padding = '10px'; }
    z.addEventListener('click', e => { if (e.target === z || e.target.closest('button')) z.remove(); });
    ROOT.appendChild(z); z.querySelector('button').focus();
  }
  function open(startAt) {
    META = meta(); css();
    if (ROOT) { ROOT.remove(); ROOT = null; }
    S = sections(META);
    ROOT = document.createElement('div'); ROOT.className = 'fb-root'; ROOT.setAttribute('role', 'dialog'); ROOT.setAttribute('aria-label', META.course + ' flipbook');
    ROOT.innerHTML = `<div class="fb-bar"><button type="button" class="fb-btn" data-fb="toc" aria-label="Contents">☰ <span class="fb-lbl">Contents</span></button><div class="t">${esc(META.course)}<small></small></div><button type="button" class="fb-btn" data-fb="fs-" aria-label="Smaller text">A−</button><button type="button" class="fb-btn" data-fb="fs+" aria-label="Larger text">A+</button><button type="button" class="fb-btn" data-fb="full" aria-label="Full screen">⛶</button>${SA ? '' : '<button type="button" class="fb-btn gold" data-fb="close" aria-label="Close the flipbook">✕ <span class="fb-lbl">Close</span></button>'}</div>
<div class="fb-stage"><div class="fb-book"></div><div class="fb-toc" hidden></div><div class="fb-busy">Laying out the pages…</div></div>
<div class="fb-foot"><button type="button" class="fb-btn" data-fb="prev" aria-label="Previous page">◀</button><input class="fb-range" type="range" min="0" value="0" step="1" aria-label="Go to page"><span class="fb-pgno"></span><button type="button" class="fb-btn" data-fb="next" aria-label="Next page">▶</button></div>`;
    document.body.appendChild(ROOT);
    STAGE = ROOT.querySelector('.fb-stage'); BOOK = ROOT.querySelector('.fb-book');
    if (!SA) document.documentElement.style.overflow = 'hidden';
    const FL = ['400 16px "Atkinson Hyperlegible"', '700 16px "Atkinson Hyperlegible"', 'italic 400 16px "Atkinson Hyperlegible"', '700 16px "Bricolage Grotesque"', '800 16px "Bricolage Grotesque"', '600 16px Caveat', '700 16px Caveat'];
    const fontsReady = (document.fonts && document.fonts.load) ? Promise.all(FL.map(f => document.fonts.load(f).catch(() => { }))).then(() => document.fonts.ready).catch(() => { }) : Promise.resolve();
    fontsReady.then(() => layout(null)).then(() => {
      if (startAt) { const i = S.findIndex(s => s.kind === 'unit' && s.uid === startAt); }
      const want = startAt != null ? startAt : load();
      if (want && typeof want === 'object') goPage(toPos(want));
    });
    wire();
  }
  function close() { finishAnim(); if (ROOT) ROOT.remove(); ROOT = null; document.documentElement.style.overflow = ''; if (document.fullscreenElement) document.exitFullscreen().catch(() => { }); }
  function wire() {
    ROOT.addEventListener('click', e => {
      const b = e.target.closest('[data-fb]'), go = e.target.closest('[data-go]');
      if (e.target.closest('a[href]')) return;
      if (go) { e.preventDefault(); ROOT.querySelector('.fb-toc').hidden = true; goPage(+go.dataset.go); return; }
      if (b) {
        const a = b.dataset.fb;
        if (a === 'prev') turn(-1); else if (a === 'next') turn(1);
        else if (a === 'toc') tocPanel(); else if (a === 'tocx') ROOT.querySelector('.fb-toc').hidden = true;
        else if (a === 'close') close();
        else if (a === 'fs-' || a === 'fs+') { fs = Math.max(12, Math.min(22, fs + (a === 'fs+' ? 1 : -1))); try { localStorage.setItem('fb:fs', fs); } catch (er) { } layout(posNow()); }
        else if (a === 'full') { const el = SA ? document.documentElement : ROOT; if (document.fullscreenElement) document.exitFullscreen().catch(() => { }); else if (el.requestFullscreen) el.requestFullscreen().catch(() => { }); }
        return;
      }
      if (e.target.closest('.fb-toc')) { if (e.target.classList.contains('fb-toc')) ROOT.querySelector('.fb-toc').hidden = true; return; }
      if (e.target.closest('.fb-zoom')) return;
      const z = e.target.closest('.fb-zoomable'); if (z && e.target.closest('.fb-book')) { zoom(z); return; }
      if (e.target.closest('.fb-book') && !moved) { const r = BOOK.getBoundingClientRect(); turn(e.clientX > r.left + r.width / 2 ? 1 : -1); }
    });
    ROOT.querySelector('.fb-range').addEventListener('input', e => { finishAnim(); cur = +e.target.value; render(); });
    let sx = 0, sy = 0, moved = false, down = false;
    STAGE.addEventListener('pointerdown', e => { down = true; moved = false; sx = e.clientX; sy = e.clientY; });
    STAGE.addEventListener('pointermove', e => { if (down && (Math.abs(e.clientX - sx) > 12 || Math.abs(e.clientY - sy) > 12)) moved = true; });
    STAGE.addEventListener('pointerup', e => { if (!down) return; down = false; const dx = e.clientX - sx, dy = e.clientY - sy; if (moved && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) turn(dx < 0 ? 1 : -1); setTimeout(() => { moved = false; }, 0); });
    const key = e => {
      if (!ROOT) { document.removeEventListener('keydown', key, true); return; }
      const z = ROOT.querySelector('.fb-zoom'), t = ROOT.querySelector('.fb-toc');
      if (e.key === 'Escape') { e.preventDefault(); if (z) z.remove(); else if (!t.hidden) t.hidden = true; else if (!SA) close(); return; }
      if (z || !t.hidden) return;
      if (e.target && e.target.classList && e.target.classList.contains('fb-range')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) { e.preventDefault(); turn(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) { e.preventDefault(); turn(-1); }
      else if (e.key === 'Home') { e.preventDefault(); goPage(0); } else if (e.key === 'End') { e.preventDefault(); goPage(PAGES.length - 1); }
      if ((e.ctrlKey || e.metaKey) && /^[acsux]$/i.test(e.key)) e.preventDefault();
    };
    document.addEventListener('keydown', key, true);
    ['copy', 'cut', 'contextmenu', 'selectstart', 'dragstart'].forEach(t => ROOT.addEventListener(t, e => e.preventDefault()));
    let rz = 0, lastW = innerWidth, lastH = innerHeight;
    const onR = () => { if (!ROOT) { removeEventListener('resize', onR); return; } clearTimeout(rz); rz = setTimeout(() => { if (Math.abs(innerWidth - lastW) < 2 && Math.abs(innerHeight - lastH) < 60) return; lastW = innerWidth; lastH = innerHeight; layout(posNow()); }, 250); };
    addEventListener('resize', onR);
  }

  /* ---------- entry points ---------- */
  function unitPos() {
    try {
      const A = window.COURSE_API, Lc = (A && A.S && A.S.loc) || {};
      if (!Lc.m || Lc.u == null) return null;
      const D = window.COURSE_MODULES || []; const mi = D.findIndex(m => m.id === Lc.m); if (mi < 0) return null;
      const U = D[mi].units[+Lc.u]; if (!U) return null;
      const t = U.title; const si = S.findIndex(s => s.kind === 'unit' && s.mi === mi && s.label === t);
      return si >= 0 ? { s: si, f: 0 } : null;
    } catch (e) { return null; }
  }
  window.COURSE_FLIPBOOK = { open: () => open(null), close };
  if (SA) {
    const go = () => { open(null); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
    return;
  }
  let dataP = null, dataDone = false;
  function loadData() {
    if (dataP) return dataP;
    const files = (CFG.data || []).filter(Boolean);
    dataP = Promise.all(files.map(f => new Promise(res => { const sc = document.createElement('script'); sc.src = f; sc.onload = res; sc.onerror = res; document.head.appendChild(sc); }))).then(() => { dataDone = true; });
    return dataP;
  }
  function waitBox(on) {
    let w = document.getElementById('fb-wait');
    if (!on) { if (w) w.remove(); return; }
    if (w) return;
    w = document.createElement('div'); w.id = 'fb-wait';
    w.style.cssText = 'position:fixed;inset:0;z-index:2147480001;display:grid;place-items:center;background:rgba(4,8,24,.82);color:#EEF1FB;font:700 1.05rem "Atkinson Hyperlegible",system-ui,sans-serif';
    w.textContent = 'Opening the book…'; document.body.appendChild(w);
  }
  function launcher() {
    const top = document.querySelector('header.top .top-in'); if (!top || top.querySelector('[data-fbopen]')) return;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'hbtn'; b.setAttribute('data-fbopen', '1'); b.title = 'Read the notes as a page-turning textbook'; b.textContent = '📖 Flipbook';
    const g = top.querySelector('[data-go="glossary"]'); if (g) top.insertBefore(b, g); else top.appendChild(b);
    b.addEventListener('click', async () => { if ((CFG.data || []).length && !dataDone) { waitBox(true); await loadData(); waitBox(false); } open(null); setTimeout(() => { }, 0); const up = unitPos(); if (up) { const tryGo = () => { if (PAGES.length && ROOT && ROOT.querySelector('.fb-busy').hidden) goPage(toPos(up)); else setTimeout(tryGo, 120); }; setTimeout(tryGo, 150); } });
  }
  const startL = () => { launcher(); setTimeout(launcher, 1500); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startL); else setTimeout(startL, 0);
})();

/* The flipbook stays inside the course: it cannot be printed, saved or downloaded. Kester Small */
(function () {
  if (window.__fbGuard) return; window.__fbGuard = true;
  var st = document.createElement('style');
  st.textContent = '@media print{body:has(.fb-root) *{display:none!important}body:has(.fb-root)::after{content:"The flipbook can be read inside the course only.";display:block;font:16px sans-serif;padding:40px}}' +
    '.fb-root img,.fb-root canvas,.fb-root svg{-webkit-user-drag:none;user-drag:none;-webkit-touch-callout:none}';
  (document.head || document.documentElement).appendChild(st);
  var open = function () { return !!document.querySelector('.fb-root'); };
  document.addEventListener('keydown', function (e) {
    if (!(e.ctrlKey || e.metaKey) || !open()) return;
    var k = (e.key || '').toLowerCase(); if (k === 'p' || k === 's') { e.preventDefault(); e.stopPropagation(); }
  }, true);
  ['contextmenu', 'dragstart'].forEach(function (t) { document.addEventListener(t, function (e) { if (e.target && e.target.closest && e.target.closest('.fb-root')) e.preventDefault(); }, true); });
})();
