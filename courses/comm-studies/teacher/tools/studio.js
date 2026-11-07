/* Writers' Studio + Open Mic Lounge (with Poetry Craft and Persona Maker).
   CAPE Communication Studies e-course plugin. Self-contained: no network, inline SVG art, WebAudio effects,
   optional AI feedback through api.sample. Student pieces, personae and the playbill live in localStorage
   (cs-studio-pieces / cs-studio-personae / cs-studio-playbill / cs-studio-drafts); only tiny counters and ids
   are mirrored to api.S.studio because SCORM suspend data is limited. All model texts and examples are original. */
(function () {
  'use strict';
  const CSS = `
.st{display:flex;flex-direction:column;gap:16px;min-width:0}
.st *{min-width:0;box-sizing:border-box}
.st-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.st-nav{display:flex;flex-wrap:wrap;gap:6px}
.st-between{justify-content:space-between;align-items:center}
.st-center{justify-content:center}
.st-crumbs{align-items:center;gap:10px}
.st-hero .ribbon{background:rgba(255,215,102,.16);color:#FFE9A8;border-color:rgba(255,215,102,.4)}
.st-searchcard{gap:12px}
.st-jump .chip{font-size:.84rem}
.st-tiles{grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}
.st-tile{cursor:pointer;color:inherit;font:inherit}
.st-tile[hidden],.st-grp[hidden]{display:none!important}
.st-tile .meta{flex:1}
.st-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}
.ribbon.st-ok{background:var(--soft-ok,rgba(80,200,120,.2));border-color:var(--ok,#4ade80)}
.st-crafttile{background:radial-gradient(260px 120px at 90% 0%,rgba(255,215,102,.25),transparent 70%),linear-gradient(160deg,#16306f,#0a1638);color:#F1F4FF;border-color:rgba(255,215,102,.5)}
.st-crafttile .meta{color:#C9D3F5}
.st-head{display:flex;gap:14px;align-items:center}
.st-bigic{width:58px;height:58px;flex:none;display:grid;place-items:center;font-size:1.9rem;border-radius:16px;background:linear-gradient(145deg,#FFF0B3,var(--gold) 55%,var(--gold-deep,#C99A1C));box-shadow:0 4px 0 var(--gold-deep,#9A7412),0 10px 20px -8px rgba(0,0,0,.6)}
.st-ol{margin:0;padding-left:1.3em}
.st-ol li{margin:3px 0}
.st-cape{margin:0}
.st-about h4{margin:12px 0 4px}
.st-about .grid2 > div > h4:first-child{margin-top:0}
.st-about p{margin:0}
.st-prompts{display:flex;flex-direction:column;gap:8px}
.st-prompt{width:100%;align-items:center;color:inherit;font:inherit}
.st-prompt.sel{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold),0 3px 0 rgba(0,0,0,.3)}
.st-pn{flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-weight:800;background:var(--raise);border:1px solid var(--line)}
.st-prompt.sel .st-pn{background:var(--gold);color:var(--on-gold,#0A1433)}
.st-perrow{display:grid;grid-template-columns:minmax(0,240px) minmax(0,1fr);gap:14px;align-items:start}
@media (max-width:640px){.st-perrow{grid-template-columns:minmax(0,1fr)}}
.st-pmini{display:flex;gap:10px;align-items:center}
.st-pmini p{margin:2px 0}
.st-pmav{width:56px;height:56px;flex:none;display:block}
.st-pmav svg,.st-pcav svg{width:100%;height:100%;display:block}
.st-plan{border:1px solid var(--line);border-radius:14px;padding:10px 14px;background:var(--raise)}
.st-plan summary{cursor:pointer;font-weight:700}
.st-planbody{display:flex;flex-direction:column;gap:10px;margin-top:10px}
.st-plta{width:100%;resize:vertical;font:inherit}
.st-extra{border:1px dashed var(--line);border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:10px}
.st-extra p{margin:0}
.st-ta{width:100%;min-height:280px;font:inherit;line-height:1.7;border:2px solid var(--line);border-radius:14px;padding:14px 16px;background:var(--raise);color:var(--ink);resize:vertical;box-shadow:inset 0 2px 8px rgba(0,0,0,.25)}
.st-ta:focus{border-color:var(--gold);outline:none;box-shadow:0 0 0 3px rgba(255,215,102,.25),inset 0 2px 8px rgba(0,0,0,.25)}
.st-ta.st-poem{min-height:240px;line-height:1.9}
.st-scan{min-height:140px}
.st-paste{min-height:150px}
.st-wcrow{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center}
.st-wc{font-weight:700}
.st-wc.ok{color:var(--ok,#4ade80)}
.st-wc.hi{color:var(--bad,#ff7a6b)}
.st-wbar{flex:1;min-width:120px}
.st-checks{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}
.st-ck{display:flex;gap:10px;align-items:flex-start;padding:9px 12px;border:1px solid var(--line);border-radius:12px;background:var(--raise);cursor:pointer}
.st-ck input{width:20px;height:20px;flex:none;accent-color:var(--gold);margin-top:2px}
.st-actions .btn{display:inline-flex;align-items:center;gap:6px}
.st-pills{display:flex;flex-wrap:wrap;gap:6px}
.st-pill{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:99px;font-weight:700;font-size:.86rem;border:1px solid var(--line);background:var(--raise);white-space:nowrap}
.st-pill.ok{background:var(--soft-ok,rgba(80,200,120,.18));border-color:var(--ok,#4ade80)}
.st-pill.no{background:var(--soft-bad,rgba(255,122,107,.16));border-color:var(--bad,#ff7a6b)}
.st-pill.self{background:var(--soft-gold,rgba(255,215,102,.16));border-color:var(--gold)}
.st-pill.mark{background:var(--gold);color:var(--on-gold,#0A1433);border-color:var(--gold-deep,#C99A1C)}
.st-feats{display:flex;flex-direction:column;gap:8px}
.st-frow{display:grid;grid-template-columns:118px minmax(0,1fr);gap:10px;align-items:start}
.st-frow p{margin:2px 0 0}
@media (max-width:480px){.st-frow{grid-template-columns:max-content minmax(0,1fr);gap:8px}.st-frow .st-pill{font-size:.78rem;padding:3px 8px}}
.st-marked{white-space:pre-wrap;overflow-wrap:anywhere;background:var(--raise);border:1px solid var(--line);border-radius:12px;padding:12px 14px;line-height:1.8;max-height:340px;overflow:auto}
.st-m{background:rgba(255,122,107,.22);color:inherit;border-bottom:2px solid #FF7A6B;border-radius:3px;padding:0 1px}
.st-m-spelling{background:rgba(255,122,107,.25);border-color:#FF7A6B}
.st-m-grammar{background:rgba(122,170,255,.25);border-color:#7AAAFF}
.st-m-register,.st-m-style{background:rgba(255,215,102,.22);border-color:#FFD766}
.st-m-creole{background:rgba(180,140,255,.24);border-color:#B48CFF}
.st-m-punctuation,.st-m-capitalisation{background:rgba(110,231,183,.2);border-color:#6EE7B7}
.st-issues{margin:0;padding-left:1.1em;display:flex;flex-direction:column;gap:6px}
.st-issues .ribbon{margin-right:4px}
.st-score{font:800 1.6rem/1 var(--f-display);color:var(--gold)}
.st-spin{display:inline-block;width:16px;height:16px;border-radius:50%;border:3px solid var(--line);border-top-color:var(--gold);margin-right:8px;vertical-align:-3px;animation:st-rot .8s linear infinite}
@keyframes st-rot{to{transform:rotate(360deg)}}
.st-rw .kicker{margin-bottom:6px}
.st-lockcard{background:repeating-linear-gradient(135deg,rgba(255,255,255,.03) 0 12px,transparent 12px 24px),var(--surface);border-style:dashed}
.st-model,.st-ex{white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.75;padding:14px 16px;border-radius:12px;border-left:4px solid var(--gold);background:rgba(255,215,102,.07)}
.st-found{columns:2 220px;margin:0}
.st-ptools{display:flex;flex-direction:column;gap:10px;border:1px solid var(--line);border-radius:14px;padding:12px;background:rgba(0,0,0,.12)}
.st-pstats{display:flex;flex-wrap:wrap;gap:6px}
.st-prows{display:flex;flex-direction:column;gap:2px;max-height:360px;overflow:auto}
.st-pr{display:grid;grid-template-columns:2em 4.6em 3.4em minmax(0,1fr);gap:8px;align-items:center;padding:4px 6px;border-radius:8px}
.st-pr.alt{background:rgba(255,255,255,.04)}
.st-prh{font-size:.8rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.st-syl{font-weight:800;font-variant-numeric:tabular-nums}
.st-syl small{font-weight:600;color:var(--muted);margin-left:1px}
@media (max-width:480px){.st-pr{grid-template-columns:1.5em 2.8em 2.4em minmax(0,1fr);gap:6px;padding:4px 2px}.st-syl small{display:block;font-size:.7rem;margin:0}.st-prh{font-size:.68rem}}
.st-pstats .st-pill{white-space:normal}
.st-syl.ok{color:var(--ok,#4ade80)}
.st-syl.near{color:var(--gold)}
.st-syl.no{color:var(--bad,#ff7a6b)}
.st-rl{display:inline-grid;place-items:center;min-width:26px;height:26px;border-radius:8px;font-weight:800;background:hsl(var(--h) 70% 45% / .18);border:2px solid hsl(var(--h) 75% 62% / .55)}
.st-rl[data-on="1"]{background:hsl(var(--h) 75% 55%);color:#0A1433;border-color:hsl(var(--h) 80% 70%)}
.st-ln{overflow-wrap:anywhere}
.st-rw{background:hsl(var(--h) 80% 60% / .35);color:inherit;border-radius:4px;padding:0 2px}
.st-cons{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
.st-cons li{display:flex;gap:8px}
.st-cons li.ok span{color:var(--ok,#4ade80);font-weight:800}
.st-cons li.no span{color:var(--gold);font-weight:800}
.st-shape{font-family:ui-monospace,Menlo,Consolas,monospace;line-height:1.5;padding:14px;border-radius:12px;background:linear-gradient(180deg,rgba(127,211,255,.08),rgba(255,215,102,.06));border:1px solid var(--line);white-space:pre-wrap;overflow-wrap:anywhere}
.st-shape-diamond{text-align:center}
.st-devs{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;align-items:start}
.st-dev{border:1px solid var(--line);border-radius:14px;padding:10px 14px;background:var(--raise)}
.st-dev summary{cursor:pointer;font-weight:700}
.st-dev[open]{background:linear-gradient(160deg,rgba(255,215,102,.08),transparent 60%),var(--raise)}
.st-dev > div{display:flex;flex-direction:column;gap:8px;margin-top:8px}
.st-dev p{margin:0}
.st-poets{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}
.st-poet{display:flex;flex-direction:column;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:var(--raise)}
.st-pieces{display:flex;flex-direction:column;gap:12px}
.st-piece{border:1px solid var(--line);border-radius:16px;padding:14px;background:var(--raise);display:flex;flex-direction:column;gap:8px}
.st-piece-h{display:flex;gap:12px;align-items:center}
.st-piece-h p{margin:0}
.st-pic{font-size:1.6rem;width:46px;height:46px;flex:none;display:grid;place-items:center;border-radius:12px;background:rgba(255,215,102,.12);border:1px solid var(--line)}
.st-snip{margin:0;color:var(--muted);white-space:pre-wrap;overflow-wrap:anywhere}
.st-empty{display:flex;flex-direction:column;gap:10px}
/* ---------- lounge ---------- */
.st-lhero{background:radial-gradient(500px 260px at 85% 0%,rgba(233,79,134,.28),transparent 70%),linear-gradient(160deg,#2a0f3e,#0a1638 70%)}
.st-stagewrap{position:relative;border-radius:22px;overflow:hidden;border:2px solid rgba(255,215,102,.5);background:#0A1640;box-shadow:0 2px 0 rgba(255,255,255,.12) inset,0 22px 44px -20px rgba(0,0,0,.9),0 7px 0 #071030;transform:perspective(1200px) rotateX(2deg)}
.st-stage-svg{display:block;width:100%;height:auto;aspect-ratio:16/9}
@media (max-width:560px){.st-stage-svg{aspect-ratio:5/4}.st-live{font-size:.76rem;bottom:6px}.st-float{font-size:1.5rem}.st-stagewrap{transform:none}}
.st-live{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);margin:0;max-width:92%;padding:5px 14px;border-radius:99px;background:rgba(5,8,24,.78);border:1px solid rgba(255,215,102,.45);color:#FFE9A8;font-weight:700;font-size:.86rem;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.st-fx{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.st-float{position:absolute;bottom:14%;font-size:2rem;animation:st-up 1.8s ease-out forwards;filter:drop-shadow(0 4px 6px rgba(0,0,0,.5))}
.st-float.st-still{animation:st-fade .9s ease-out forwards;bottom:40%;transform:translateX(-50%)}
@keyframes st-up{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:1;transform:translateY(-20px) scale(1.1)}100%{transform:translateY(-220px) scale(.9) rotate(12deg);opacity:0}}
@keyframes st-fade{0%{opacity:0}30%{opacity:1}100%{opacity:0}}
.st-react{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.st-rbtn{display:inline-flex;align-items:center;gap:6px}
.st-rc{display:inline-grid;place-items:center;min-width:24px;height:22px;padding:0 6px;border-radius:99px;background:var(--gold);color:var(--on-gold,#0A1433);font-size:.8rem;font-weight:800}
.st-lgrid{align-items:start}
.st-sliders{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
@media (max-width:420px){.st-sliders{grid-template-columns:minmax(0,1fr)}}
.st-sliders input[type=range]{width:100%;accent-color:var(--gold)}
.st-recout{display:flex;flex-direction:column;gap:10px}
.st-recout audio{width:100%}
.st-recout a.btn{text-decoration:none;display:inline-flex;align-items:center}
.st-lyrics{max-height:300px;overflow:auto;display:flex;flex-direction:column;gap:4px;padding:12px;border-radius:14px;background:linear-gradient(180deg,#0B1433,#120A26);border:1px solid rgba(255,215,102,.3);color:#E8ECFF;scroll-behavior:smooth}
.st-lyrics p{margin:0;padding:6px 10px;border-radius:10px;transition:background .2s,color .2s,transform .2s;line-height:1.6;overflow-wrap:anywhere}
.st-lyrics p.on{background:linear-gradient(180deg,#FFF0B3,#FFD766);color:#0A1433;font-weight:700;transform:scale(1.015);box-shadow:0 4px 14px -4px rgba(255,215,102,.7)}
.st-lyrics .hint{color:#AEB9DD}
.st-nrows{display:flex;flex-direction:column;gap:10px}
.st-nrow{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--line)}
.st-nrow p{margin:0}
@media (max-width:700px){.st-nrow{grid-template-columns:minmax(0,1fr)}}
.st-bill{border:3px double var(--gold);background:radial-gradient(400px 200px at 50% 0%,rgba(255,215,102,.12),transparent 70%),var(--surface)}
.st-billhead{text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.st-billhead p{margin:0}
.st-billlist{margin:0;padding-left:1.4em;display:flex;flex-direction:column;gap:12px}
.st-billlist li{padding:10px 12px;border-radius:12px;background:var(--raise);border:1px solid var(--line);display:flex;flex-direction:column;gap:6px}
.st-billlist p{margin:0}
.st-billrow{display:flex;flex-direction:column}
/* ---------- persona maker ---------- */
.st-pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.st-pcard{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;padding:14px;border-radius:18px;border:1px solid var(--line);background:linear-gradient(160deg,rgba(255,255,255,.07),transparent 50%),var(--raise);box-shadow:0 4px 0 rgba(0,0,0,.3)}
.st-pcard p{margin:0}
.st-pcard .row{justify-content:center}
.st-pcav{width:110px;height:110px;display:block;filter:drop-shadow(0 6px 10px rgba(0,0,0,.45))}
.st-cat{font-style:italic;color:var(--gold);margin:0}
.st-pnew{min-height:200px;border:2px dashed var(--gold);border-radius:18px;background:rgba(255,215,102,.06);color:var(--ink);font:inherit;font-weight:700;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer}
.st-pnew span{font-size:2.2rem;line-height:1;color:var(--gold)}
.st-pnew:hover{background:rgba(255,215,102,.12)}
.st-pmgrid{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:18px;align-items:start}
@media (max-width:760px){.st-pmgrid{grid-template-columns:minmax(0,1fr)}}
.st-pmprev{position:sticky;top:12px;display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px;border-radius:20px;background:radial-gradient(240px 180px at 50% 20%,rgba(255,215,102,.18),transparent 70%),linear-gradient(170deg,#16306f,#0a1638);border:1px solid rgba(255,215,102,.4);color:#F1F4FF}
@media (max-width:760px){.st-pmprev{top:6px;z-index:3;flex-direction:row;flex-wrap:wrap;justify-content:center;gap:4px 12px;padding:10px;box-shadow:0 10px 20px -10px rgba(0,0,0,.8)}.st-pmprev .st-avbox{width:104px}.st-pminfo{flex:1 1 150px;align-items:flex-start!important}.st-pminfo .st-pename,.st-pminfo .st-cat{text-align:left}.st-pminfo .row{justify-content:flex-start}}
.st-pminfo{display:flex;flex-direction:column;align-items:center;gap:6px}
.st-avbox{width:min(240px,70vw);aspect-ratio:1;filter:drop-shadow(0 10px 16px rgba(0,0,0,.5))}
.st-avbox svg{width:100%;height:100%;display:block}
.st-pename{font-weight:800;margin:0;text-align:center;color:#FFFFFF}
.st-pmprev .st-cat{color:#FFE38A;text-align:center}
.st-pmprev .btn.ghost{color:#F1F4FF;border-color:rgba(255,255,255,.4)}
.st-pmform{display:flex;flex-direction:column;gap:10px}
.st-pmform details{border:1px solid var(--line);border-radius:14px;padding:10px 14px;background:var(--raise)}
.st-pmform summary{cursor:pointer;font-weight:700}
.st-fbody{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.st-fbody p{margin:0}
.st-fbody textarea{width:100%;resize:vertical;font:inherit}
.st-opts .chip{font-size:.86rem}
.st-sws{display:flex;flex-wrap:wrap;gap:8px}
.st-sw{width:36px;height:36px;border-radius:50%;border:3px solid rgba(255,255,255,.28);box-shadow:0 3px 0 rgba(0,0,0,.35);cursor:pointer;padding:0}
.st-sw.sel{border-color:#FFFFFF;box-shadow:0 0 0 3px var(--gold),0 3px 0 rgba(0,0,0,.35);transform:scale(1.08)}
.st-biop{padding:10px 12px;border-radius:12px;border-left:4px solid var(--gold);background:rgba(255,215,102,.07)}
/* ---------- stage animation ---------- */
.st-bk{animation:st-tw 4s ease-in-out infinite}
@keyframes st-tw{0%,100%{opacity:.18}50%{opacity:.45}}
.st-bulb{fill:#FFE9A8;animation:st-blink 1s steps(1) infinite}
@keyframes st-blink{0%{fill:#FFE9A8}50%{fill:#7A5A12}}
.st-beam{animation:st-beam 5s ease-in-out infinite;transform-origin:400px 0}
@keyframes st-beam{0%,100%{opacity:.7}50%{opacity:.88}}
.st-mouth{transform-box:fill-box;transform-origin:center}
.is-talking .st-mouth{animation:st-talk .24s ease-in-out infinite}
@keyframes st-talk{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.25)}}
.st-performer .st-sway{transform-box:view-box;transform-origin:100px 200px}
.is-talking .st-performer .st-sway{animation:st-sway 2.6s ease-in-out infinite}
@keyframes st-sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
.is-talking .st-crowd{animation:st-bob 1.2s ease-in-out infinite}
@keyframes st-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
@media (prefers-reduced-motion:reduce){
  .st *,.st-float{animation:none!important;transition:none!important}
  .st-stagewrap{transform:none}
  .st-lyrics{scroll-behavior:auto}
}
:root[data-skin="daylight"] .st-lyrics{background:linear-gradient(180deg,#0E1F55,#0B1736)}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  /* ===================== GENRE LIBRARY =====================
     Each genre: id, n (name), g (group), ic, pa (purpose & audience), ft (features "label|detector"),
     st (structure), rg (register & tone), md (ORIGINAL model excerpt), pr (prompts), w [min,max],
     cape (syllabus link), pm (min paragraphs), fm (formal register for the spelling/grammar check).
     Every model excerpt was written for this course; any works, bands or people named inside a model were created for this course
     unless the model is a factual biography. */
  const GROUPS = [
    ['nf', 'Narrative & Fiction', '📖'], ['de', 'Descriptive', '🎨'], ['ex', 'Expository', '🧭'], ['pe', 'Persuasive & Argumentative', '📣'],
    ['rp', 'Reflective & Personal', '🪞'], ['lw', 'Life Writing', '🧬'], ['jm', 'Journalism & Media', '📰'], ['tw', 'Transactional & Workplace', '💼'],
    ['dp', 'Drama & Performance', '🎭'], ['po', 'Poetry', '🪶']
  ];
  const GENRES = [
    /* ---------- Narrative & Fiction ---------- */
    { id: 'narrative', n: 'Narrative', g: 'nf', ic: '📖', w: [350, 600], pm: 4, fm: false,
      pa: 'To tell a connected sequence of events so that readers live through what happened and why it matters. Audience: general readers, classmates, a competition panel or an examiner.',
      ft: ['Clear narrator and point of view|pov', 'An opening hook that pulls the reader in|hook', 'Events in sequence with time markers|time', 'A conflict or problem that drives the story|conflict', 'Sensory details that build the scene|sense', 'Dialogue that reveals character|dlg', 'A climax or turning point|twist', 'A resolution that shows change or meaning|end'],
      st: ['Orientation: who, where and when', 'Complication: the problem begins', 'Rising action: tension builds', 'Climax: the turning point', 'Resolution: what changed and why it matters'],
      rg: 'Usually semi-formal and vivid, mostly in the past tense. Creole can be used deliberately in dialogue to build character and setting; keep the narration consistent.',
      md: `The power went at seven, just as Ma Hazel lifted the pot of fish broth off the stove. In the sudden dark, the whole of Gouyave seemed to hold its breath.

"Tamika, find the lamp," she said, calm as Sunday.

I felt along the shelf, fingers brushing a cold tin, a box of matches, the rough edge of the Bible. Outside, a dog barked twice and stopped. Then I heard it: a low knocking at the back door, slow and patient, the way nobody we knew ever knocked.`,
      pr: ['Write a story that begins with a power cut on a stormy night in your district.', 'Write a narrative about a teenager who must choose between loyalty to a friend and doing what is right.', 'Write a story titled "The Last Ferry Home".'],
      cape: 'Module 1: narrative is a literary form; analyse how writers use point of view, sequence and tension. Paper 3 Section B: a short narrative can be your reflective piece.' },
    { id: 'shortstory', n: 'Short Story', g: 'nf', ic: '📚', w: [400, 750], pm: 4, fm: false,
      pa: 'To create a complete fictional world in a few pages, with one main conflict and a single strong effect on the reader. Audience: magazine and anthology readers, competition judges, classmates.',
      ft: ['A small cast: one or two main characters|name', 'One main setting, sketched economically|setting', 'A central conflict|conflict', 'Character shown through action and dialogue|dlg', 'A clear theme or message|self', 'Deliberate pacing towards a climax|twist', 'A satisfying or thought-provoking ending|end', 'A title that hints at the theme|self'],
      st: ['Hook and setting in the first lines', 'Introduce the main character and their desire', 'Conflict and complications', 'Climax', 'Brief resolution or open ending'],
      rg: 'Literary and controlled. Show rather than tell. Dialogue can switch between Creole and Standard English to reveal who characters are.',
      md: `Every Saturday, Jerome set up his cart on Bay Street before the first cruise ship blew its horn. Coconuts, cutlass, cups. His grandfather's hands had taught his hands.

A woman in a wide straw hat stopped and watched him split a nut in three clean strokes. "You should be in school," she said.

"It's Saturday, Miss."

"Then you should be in school on Monday." She paid with a twenty and did not wait for change.

On Monday, Jerome found the twenty folded inside his exercise book, and on it, in neat blue ink, the name and number of the principal of Frangipani Hill Academy.`,
      pr: ['Write a short story about a market vendor who discovers something unexpected among the goods.', 'Write a short story in which one voice note changes everything for a group of friends.', 'Write a short story set during Carnival, in which a costume hides a secret.'],
      cape: 'Module 1: identify characterisation, conflict and theme in literary extracts. Paper 3 Section B: a short story is a popular reflective piece; justify your audience, purpose and context.' },
    { id: 'flash', n: 'Flash Fiction', g: 'nf', ic: '⚡', w: [100, 300], pm: 1, fm: false,
      pa: 'To tell a whole story in very few words, trusting the reader to fill the gaps. Audience: online readers, literary magazines, timed-writing competitions.',
      ft: ['Starts in the middle of the action|hook', 'Very few characters|self', 'Every word earns its place (tight word count)|short', 'One strong central image|sense', 'Backstory implied, not explained|self', 'A twist or resonant final line|twist', 'A title that does extra work|self'],
      st: ['Drop straight into a moment', 'One small turn or discovery', 'A final line that echoes or overturns the opening'],
      rg: 'Compressed and precise. Cut adverbs and explanations; choose concrete nouns and strong verbs.',
      md: `The hurricane shutters were still up in October. Nobody wanted to be the one to take them down.

Grandpa said they kept the house cool. Mommy said she would do it Saturday. My brother said, "What if another one comes?"

So we lived in a dim house, eating by the light from the fridge, until the morning I unscrewed the first bolt myself and the sun fell across the kitchen floor like something that had been waiting all along.`,
      pr: ['In under 250 words, tell the story of the moment someone decides to leave the island, or to stay.', 'Write a flash fiction piece in which an object (a key, a domino, a school tie) tells the story.', 'Write a 200-word story whose last line changes how we read the first line.'],
      cape: 'Module 1: economy of language and the effect of a writer\'s choices. Paper 3 Section B: a flash piece can be a sharp, memorable reflective piece.' },
    { id: 'fable', n: 'Fable & Folktale Retelling', g: 'nf', ic: '🕷️', w: [250, 500], pm: 3, fm: false,
      pa: 'To entertain and teach a lesson, carrying on the oral storytelling tradition. Anansi stories travelled to the Caribbean from West Africa with the Akan people and survived as a form of wit and resistance. Audience: younger listeners, a family gathering, a school assembly or a radio story slot.',
      ft: ['Animal or trickster characters|animal', 'A storyteller\'s voice that speaks to listeners|aud', 'A simple problem and a clever plan|conflict', 'Repetition or a pattern of three|rep', 'Dialogue with rhythm and humour|dlg', 'The trickster is caught out, or wins by wit|twist', 'A clear moral or "that is why" ending|moral', 'Respectful use of Creole or oral phrases|self'],
      st: ['Traditional opening (for example "Crick crack" or "Once upon a time")', 'Introduce the trickster and the problem', 'The plan and how it unfolds (often in threes)', 'The twist', 'Moral or "that is why" ending, and a closing formula'],
      rg: 'Oral and rhythmic, written to be read aloud. Creole phrases and call-and-response are welcome; keep it clear for young listeners.',
      md: `Crick crack! One time, when the mango trees were heavy and the river was low, Bredda Anansi decided he would not lift a finger for his food.

"Bredda Goat," he said, "you have the strongest horns in the hills. Shake the mango tree, and I will guard the mangoes for you."

Goat shook. Mangoes fell like rain. Anansi guarded them all right: into his own belly, one by one.

But Goat was no fool. Next morning, he shook the tree with Anansi sitting on the topmost branch.

And that is why, to this day, you will see a spider hanging from a high branch, waiting for somebody else to do the work.`,
      pr: ['Retell an Anansi story you know, setting it in a modern Caribbean school.', 'Write an original fable in which a mongoose, a parrot and a crab compete for something valuable. End with a moral.', 'Retell a folktale from your territory (for example a jumbie, Papa Bois or Mama Dlo story) for a primary-school audience.'],
      cape: 'Module 2: oral tradition, Creole and identity. Module 1: the folktale as a literary form with a purpose and an audience. Paper 3 Section B: a retold folktale can be a reflective piece for young listeners.' },
    /* ---------- Descriptive ---------- */
    { id: 'descriptive', n: 'Descriptive Essay', g: 'de', ic: '🎨', w: [300, 500], pm: 3, fm: true,
      pa: 'To paint a person, place, object or event so clearly that readers can see, hear and feel it. Audience: magazine readers, examiners, anyone who has never been there.',
      ft: ['A clear focus (a place, person, object or event)|self', 'Details from several senses|sense', 'Figurative language: simile and metaphor|fig', 'Precise, vivid vocabulary|vivid', 'A logical spatial or time order|space', 'A dominant impression or mood|mood', 'Paragraphs that each focus on one aspect|paras', 'A closing image that lingers|end'],
      st: ['Introduction: the subject and your overall impression', 'Body 1: first aspect (for example sight and sound)', 'Body 2: second aspect (smell, touch, taste)', 'Body 3: people and movement', 'Conclusion: a final image'],
      rg: 'Formal or semi-formal, rich but controlled. Avoid piling up adjectives; one exact word beats three vague ones.',
      md: `By six in the morning, the Kingstown fish market is already loud. Boats knock against the pier like impatient knuckles, and the air is thick with salt, diesel and the sharp green smell of limes.

Snapper lie in silver rows on beds of ice, their eyes still bright, while a vendor in white rubber boots calls out prices in three languages at once. Behind her, the hills are only beginning to turn gold.`,
      pr: ['Describe a Caribbean market at the busiest hour of the day.', 'Describe your school compound in the five minutes before the first bell.', 'Describe a beach on the morning after a storm.'],
      cape: 'Module 1: identify and comment on imagery and sensory language using PEEL. Paper 3 Section B: description can strengthen a reflective piece.' },
    { id: 'character', n: 'Character Sketch', g: 'de', ic: '🧑🏾', w: [250, 450], pm: 3, fm: false,
      pa: 'To bring one person to life through appearance, habits, speech and actions. Audience: readers of a story or magazine; a writer planning fiction.',
      ft: ['A striking first impression|hook', 'Physical details that reveal character|phys', 'Habits, mannerisms and speech|dlg', 'An anecdote that shows (not tells) a trait|time', 'How others react to the person|self', 'One dominant trait or theme|self', 'A closing reflection on what the person means|end'],
      st: ['Introduce the person with a vivid snapshot', 'Appearance and how it reflects personality', 'Habits, speech and relationships', 'A revealing anecdote', 'Closing impression'],
      rg: 'Descriptive and warm; reported speech or dialogue can be in Creole to keep the person\'s real voice.',
      md: `Mr. Hodge drives the number 4 bus as if it were a ship he captains. He wears a pressed khaki shirt every day, even in August, and he greets every passenger by name or by nickname: "Morning, Professor," to the boy with the thick glasses; "Mind your step, Queen," to the old lady from Belmont.

His hands, broad and scarred from years of fishing, rest lightly on the wheel. Once, when a schoolgirl was a dollar short, he waved her on and announced to the whole bus, "Education is a toll road. I paying today."`,
      pr: ['Write a character sketch of an elder in your community whom everyone knows.', 'Sketch a character for a story: a teenage steelpan player with a secret ambition.', 'Write a character sketch of a person you admire, revealing them through one memorable incident.'],
      cape: 'Module 1: characterisation techniques in literary extracts. Module 2: how a person\'s speech (Creole or Standard English) signals identity.' },
    { id: 'setting', n: 'Setting Description', g: 'de', ic: '🏝️', w: [200, 400], pm: 2, fm: false,
      pa: 'To establish a time, place and atmosphere, often as the opening of a story. Audience: readers of fiction, film and drama audiences, game players.',
      ft: ['Establishes time and place quickly|setting', 'Sensory detail beyond sight|sense', 'Atmosphere and mood words|mood', 'Movement through space (near to far, left to right)|space', 'Figurative language|fig', 'A hint of story or conflict to come|conflict', 'Specific Caribbean details (plants, food, weather, sounds)|carib'],
      st: ['Wide view: time of day, weather, light', 'Move closer: buildings, plants, objects', 'Sounds, smells and textures', 'A detail that hints at what is coming'],
      rg: 'Literary and atmospheric. Present or past tense, but stay consistent.',
      md: `Barrouallie sits in the crook of the hill like a cupped hand. At noon nothing moves except the heat, shimmering above the galvanise roofs, and a goat tugging patiently at its rope beneath the almond tree.

From the rum shop comes the slap of dominoes and a burst of laughter that rolls downhill to where the sea lies flat and blue as a plate. Somewhere a radio is playing an old calypso, and the chorus drifts in and out on the trade wind. Only the dogs have noticed the dark line of cloud on the horizon.`,
      pr: ['Describe the setting for the opening of a ghost story in an old plantation great house.', 'Describe a bus terminal at rush hour as the opening of a story.', 'Describe your district during a blackout, as the setting for a mystery.'],
      cape: 'Module 1: how setting and imagery create mood in literary extracts. Paper 3 Section B: setting can anchor a reflective piece in your territory.' },
    /* ---------- Expository ---------- */
    { id: 'expository', n: 'Expository Essay', g: 'ex', ic: '🧭', w: [350, 500], pm: 4, fm: true,
      pa: 'To explain a topic clearly and objectively so the reader understands it. Audience: examiners, students, the general public.',
      ft: ['A clear thesis statement in the introduction|thesis', 'Topic sentences that open each body paragraph|self', 'Facts, examples and explanations|evid', 'Logical order of ideas|trans', 'Objective, neutral tone (no "I think")|objective', 'Transitions between paragraphs|trans', 'A conclusion that synthesises rather than repeats|concl', 'At least four paragraphs|paras4'],
      st: ['Introduction: context and thesis', 'Body 1: first main point with evidence', 'Body 2: second main point with evidence', 'Body 3: third main point with evidence', 'Conclusion: synthesis and significance'],
      rg: 'Formal Standard English, third person, no contractions or slang. Define technical terms.',
      md: `Sargassum seaweed has become one of the most visible environmental challenges facing the Caribbean. Since 2011, huge mats of the brown algae have drifted from the tropical Atlantic onto beaches from Barbados to Sint Maarten.

Scientists link the blooms to warmer sea temperatures and to nutrients carried into the ocean by large rivers such as the Amazon. The effects are serious. Rotting sargassum releases hydrogen sulphide, which smells of rotten eggs and can irritate the eyes and lungs, while thick mats block sunlight from the seagrass and coral below.`,
      pr: ['Explain how social media has changed the way Caribbean teenagers communicate.', 'Explain the main causes and effects of brain drain in a small island state.', 'Explain the role of Creole languages in Caribbean identity.'],
      cape: 'Module 3 and Paper 3 Section B: the expository piece. Module 1: expository texts and organisational strategies. Your guide marks module essays out of 25 (maximum 500 words).' },
    { id: 'process', n: 'Process & How-To Writing', g: 'ex', ic: '🛠️', w: [200, 400], pm: 2, fm: true,
      pa: 'To guide someone through a task step by step so they can do it successfully. Audience: beginners, younger students, customers, colleagues.',
      ft: ['A clear statement of what will be achieved|purp', 'A list of materials or requirements|bullets', 'Numbered or sequenced steps|seq', 'Imperative verbs (Mix, Fold, Check)|imp', 'Tips and warnings|warn', 'Times, quantities or measurements|num', 'A final result or check|self'],
      st: ['Title and purpose', 'What you need', 'Steps in order', 'Tips, warnings and troubleshooting', 'How to know you have succeeded'],
      rg: 'Clear, direct and friendly. Short sentences; one action per step.',
      md: `How to Make Johnnycakes for Six
You will need: 2 cups flour, 2 teaspoons baking powder, 1 teaspoon sugar, a pinch of salt, 2 tablespoons butter, about ¾ cup water, and oil for frying.
1. Mix the flour, baking powder, sugar and salt in a large bowl.
2. Rub in the butter with your fingertips until the mixture looks like breadcrumbs.
3. Add the water a little at a time and knead to a soft, smooth dough.
4. Rest the dough for 10 minutes, then shape it into small flat rounds.
5. Fry in hot oil for 2 to 3 minutes on each side until golden.
Tip: do not crowd the pan, or the johnnycakes will soak up oil instead of puffing up.`,
      pr: ['Write instructions for a younger student on how to prepare a household for a hurricane.', 'Explain step by step how to research and reference a source for a school project.', 'Write a how-to guide for a traditional Caribbean craft, dish or game (for example dominoes, kite-making or sorrel).'],
      cape: 'Module 3: organisational communication and giving directions; choosing clear, audience-friendly language. Module 1: process as an organisational strategy.' },
    { id: 'compare', n: 'Compare & Contrast Essay', g: 'ex', ic: '⚖️', w: [350, 500], pm: 4, fm: true,
      pa: 'To show the similarities and differences between two subjects so the reader can understand or judge them. Audience: examiners, decision-makers, curious readers.',
      ft: ['Both subjects named in the thesis|thesis', 'A clear basis of comparison (criteria)|self', 'Point-by-point or block structure|paras', 'Similarity signals (similarly, both, likewise)|similar', 'Contrast signals (whereas, however, unlike)|contrast', 'Balanced attention to each subject|self', 'Evidence and examples for both|evid', 'A conclusion that evaluates|concl'],
      st: ['Introduction: the two subjects and the thesis', 'Point 1: compare both subjects', 'Point 2: compare both subjects', 'Point 3: compare both subjects', 'Conclusion: evaluation or recommendation'],
      rg: 'Formal and balanced. Avoid favouring one side until the conclusion.',
      md: `Both radio and social media keep Caribbean communities informed, yet they do so in very different ways. Radio remains the voice of the region during a hurricane: when the power and internet fail, a battery radio still carries the latest advisory.

Social media, by contrast, is faster and more interactive; a video of flooding in one district can reach thousands within minutes. However, while a radio announcer is accountable to a station, a viral post may come from anyone, which makes verification far more difficult.`,
      pr: ['Compare and contrast Creole and Standard English as languages of the classroom.', 'Compare and contrast traditional calypso and modern soca as forms of social commentary.', 'Compare and contrast studying at a Caribbean university with studying abroad.'],
      cape: 'Module 1: comparison and contrast as an organisational strategy. Module 2: comparing language varieties. Module 3: choosing the right medium.' },
    { id: 'cause', n: 'Cause & Effect Essay', g: 'ex', ic: '🔗', w: [350, 500], pm: 4, fm: true,
      pa: 'To explain why something happens and what results from it. Audience: examiners, policy-makers, the public.',
      ft: ['A clear statement of the issue|thesis', 'Causes explained with evidence|cause', 'Effects explained with evidence|evid', 'Causal signal words (because, as a result, consequently)|cause', 'A chain of reasoning, not just a list|trans', 'Immediate and long-term effects distinguished|longterm', 'A conclusion with a solution or implication|concl'],
      st: ['Introduction: the issue and thesis', 'Cause 1 and its effect', 'Cause 2 and its effect', 'Long-term consequences', 'Conclusion: implications or solutions'],
      rg: 'Formal and analytical. Be careful not to claim certainty without evidence ("may contribute to" is often more accurate than "causes").',
      md: `Why do so many talented young people leave the smaller islands after secondary school? The most immediate cause is opportunity: many territories do not offer the full range of tertiary programmes, so students must travel for degrees in medicine, engineering or law. As a result, families invest heavily in education abroad.

The long-term effect, however, is a loss of skills at home. When graduates build careers in Toronto, Miami or The Hague, the islands lose the very doctors, teachers and innovators who could drive their development.`,
      pr: ['Discuss the causes and effects of the increasing use of mobile phones among secondary-school students.', 'Discuss the causes and effects of coastal erosion in your territory.', 'Discuss the causes and effects of the decline of a traditional Caribbean art form or festival.'],
      cape: 'Module 1: cause and effect as an organisational strategy. Module 3: technology, culture and globalisation.' },
    { id: 'definition', n: 'Definition Essay', g: 'ex', ic: '📘', w: [300, 500], pm: 4, fm: true,
      pa: 'To explore what a word or idea really means, beyond the dictionary. Audience: readers unfamiliar with the term, examiners, students.',
      ft: ['The term clearly named in the introduction|thesis', 'A formal (dictionary-style) definition|defn', 'Origin or history of the term|ety', 'Examples that illustrate the meaning|evid', 'What the term is NOT|negdef', 'An extended, personal or cultural meaning|self', 'A conclusion on why the definition matters|concl'],
      st: ['Introduction: the term and why it matters', 'Formal definition and origin', 'Examples in use', 'What it is not', 'Conclusion: your extended definition'],
      rg: 'Formal, with room for a personal or cultural angle. Quote the term in quotation marks.',
      md: `"Liming" is often translated as "hanging out", but the word means much more to a Trinbagonian. At its simplest, to lime is to spend time with others without a fixed purpose.

Yet a lime is not idleness. It is an art of conversation, humour and shared food, whether on a street corner, at a beach or in a backyard around a pot of pelau. Some writers trace the word to British sailors nicknamed "limeys" who idled on the docks, though its exact origin is still debated.`,
      pr: ['Define "community" as it is lived in your territory.', 'Define "respect" for an audience of first-form students.', 'Write an extended definition of a Caribbean word that has no exact Standard English equivalent (for example "liming", "bacchanal" or "fete").'],
      cape: 'Module 2: lexical features of Caribbean Creoles; language and identity. Module 1: definition as an organisational strategy.' },
    /* ---------- Persuasive & Argumentative ---------- */
    { id: 'persuasive', n: 'Persuasive Essay', g: 'pe', ic: '📣', w: [350, 500], pm: 4, fm: true,
      pa: 'To move readers to agree with you and to act. Audience: a specific group you want to change (students, parents, voters, leaders).',
      ft: ['A clear position stated early|thesis', 'Appeals to logic (logos): facts and reasons|evid', 'Appeals to emotion (pathos)|emotion', 'Appeals to credibility (ethos)|ethos', 'Rhetorical questions|q', 'Repetition or the rule of three|rep', 'Direct address to the reader|aud', 'A strong call to action|cta'],
      st: ['Hook and position', 'Reason 1 with evidence', 'Reason 2 with evidence', 'Reason 3 or answer to an objection', 'Call to action'],
      rg: 'Formal but passionate. Inclusive pronouns (we, our) build connection; avoid insults or false claims.',
      md: `Imagine a Caribbean where every beach is lined with plastic instead of sea grape. That future is closer than we think. Every year our islands import millions of single-use bottles, and most of them never reach a recycling plant.

We cannot recycle our way out of this; we must refuse, reduce and replace. Our grandparents carried water in calabashes and goods in crocus bags. If they could live without throwaway plastic, so can we. Ban the bottle, bring your own, and let our beaches breathe again.`,
      pr: ['Persuade your school board to introduce a four-day school week.', 'Persuade young people in your territory to register to vote.', 'Persuade your community to buy from local farmers instead of imported produce.'],
      cape: 'Module 3: persuasion and the rhetorical appeals (ethos, pathos, logos). Module 1: identifying persuasive techniques and their effect. Module 3 responses are capped at 300 words.' },
    { id: 'argument', n: 'Argumentative Essay', g: 'pe', ic: '🧠', w: [400, 500], pm: 4, fm: true,
      pa: 'To defend a debatable claim with reasons and evidence while fairly answering the other side. Audience: thoughtful, possibly sceptical readers; examiners.',
      ft: ['A debatable claim (thesis)|thesis', 'Reasons supported by evidence|evid', 'A counter-argument acknowledged|counter', 'A rebuttal of the counter-argument|rebut', 'Logical transitions|trans', 'A formal, measured tone|formal', 'A conclusion that reaffirms the claim|concl', 'Four or more paragraphs|paras4'],
      st: ['Introduction: context and claim', 'Reason 1 with evidence', 'Reason 2 with evidence', 'Counter-argument and rebuttal', 'Conclusion'],
      rg: 'Formal, reasoned and fair. Let evidence, not emotion, carry the weight.',
      md: `Some argue that Creole has no place in the Caribbean classroom because students must master Standard English for examinations and employment. This concern is understandable, yet it overlooks a key finding of language research: children learn a second language more effectively when their first language is respected and used as a bridge.

Bilingual programmes that use Creole alongside English have reported gains in reading and in confidence. Therefore, the question is not whether to choose between Creole and English, but how to use both well.`,
      pr: ['"Social media does more harm than good to Caribbean youth." Argue for or against.', '"Caribbean territories should adopt a single regional currency." Argue your position.', '"Secondary-school students should be allowed to use phones in class for learning." Argue your position.'],
      cape: 'Module 2 essay: language attitudes and Creole in education. Module 3: argument, evidence and ethics. Marked out of 25: Content 10, Organization 7, Expression 8.' },
    { id: 'debate', n: 'Debate Speech', g: 'pe', ic: '🎤', w: [300, 500], pm: 4, fm: true,
      pa: 'To win over adjudicators and an audience in a formal debate. Audience: the chair, adjudicators, opponents and the floor.',
      ft: ['Greeting to the chair, adjudicators and opponents|aud', 'The motion and your side stated clearly|motion', 'Signposting (firstly, my second point)|seq', 'Arguments supported by evidence|evid', 'Rebuttal of opponents|rebutopp', 'Rhetorical devices (questions, triads)|q', 'Short, punchy sentences for listeners|self', 'Summary and strong close|concl'],
      st: ['Greetings and motion', 'Your team line and roadmap', 'Argument 1', 'Argument 2 (and rebuttal)', 'Summary and close'],
      rg: 'Formal spoken register: confident, clear and courteous, even when attacking an argument.',
      md: `Madam Chair, honourable adjudicators, worthy opponents and fellow students, good afternoon. I rise in support of the motion that "Homework does more harm than good."

My first point is simple: rest is not laziness. My second point: homework widens the gap between students with quiet desks and those who share one room with four siblings. And my third: learning sticks best when it is practised in class, with a teacher present.

My opponents will tell you that homework builds discipline. But discipline built on exhaustion is not discipline; it is survival.`,
      pr: ['Prepare a speech for the motion: "This House believes that school uniforms should be abolished."', 'Prepare an opposition speech: "This House would make Creole an official language of instruction."', 'Prepare a speech for the motion: "Tourism does more harm than good to small islands."'],
      cape: 'Module 3: speech writing, rhetorical appeals and delivery. Paper 3: oral skills and justifying your choices.' },
    { id: 'editorletter', n: 'Letter to the Editor', g: 'pe', ic: '✉️', w: [250, 400], pm: 3, fm: true,
      pa: 'To respond publicly to an issue or article and influence public opinion. Audience: newspaper readers and the people responsible for the issue.',
      ft: ['Sender\'s address and date|date', '"The Editor" and the newspaper\'s address|editor', 'Salutation (Dear Editor, Dear Sir or Madam)|sal', 'An opening that states the issue and your view|purp', 'Evidence or local examples|evid', 'Respectful but firm tone|formal', 'A suggested solution or call to action|cta', 'Formal sign-off and name|sign'],
      st: ['Addresses and date', 'Salutation', 'Issue and your position', 'Evidence and examples', 'Solution or call to action', 'Sign-off'],
      rg: 'Formal and concise. Firm but never rude; editors cut long letters.',
      md: `The Editor
The Island Voice
Roseau, Dominica

Dear Editor,

I write to express concern about the lack of safe pedestrian crossings near our secondary schools. Every afternoon, hundreds of students cross the busy road outside Sea-Almond Secondary School while traffic speeds past. Last month alone, two students were nearly struck.

A painted crossing and a crossing guard during peak hours would cost little compared with a single young life. I urge the Ministry to act before the new term.

Yours faithfully,
A Concerned Student`,
      pr: ['Write a letter to the editor about noise from late-night parties in your neighbourhood.', 'Write a letter to the editor responding to an article that called young people lazy.', 'Write a letter to the editor proposing a solution to litter on your beaches.'],
      cape: 'Module 3: formal letter conventions, register and persuasion; the Module 3 response (300 words that count).' },
    { id: 'speech', n: 'Speech', g: 'pe', ic: '🗣️', w: [300, 500], pm: 4, fm: true,
      pa: 'To inform, inspire or persuade a live audience on an occasion such as a graduation, assembly, national day or campaign launch. Audience: listeners who hear it once.',
      ft: ['A greeting suited to the occasion|aud', 'A hook: anecdote, question or striking fact|hook', 'Purpose made clear|purp', 'Signposting for listeners|seq', 'Rhetorical devices (triads, repetition, questions)|rep', 'Inclusive language (we, us, our)|inclusive', 'A personal anecdote|fp', 'A memorable close and thanks|thanks'],
      st: ['Greeting and hook', 'Purpose and roadmap', 'Main point 1', 'Main point 2', 'Main point 3', 'Memorable close and thanks'],
      rg: 'Formal spoken English, warm and rhythmic. Write for the ear: short sentences, repetition, pauses.',
      md: `Good evening, parents, teachers and my fellow graduates. Five years ago, we walked through those gates with oversized blazers and undersized confidence. Tonight we leave with something better: the knowledge that we can begin again.

We learned to fail at algebra and try again. We learned to lose a football match and shake hands. We learned that a community is not a place but a promise.

So wherever life takes us, to Kingston or Curaçao or Canada, let us keep that promise. Thank you.`,
      pr: ['Write a graduation speech for your secondary-school class.', 'Write a speech to welcome visiting students from another Caribbean territory.', 'Write a speech for Emancipation Day addressed to your school assembly.'],
      cape: 'Module 3: speech writing, audience profiling, the rhetorical appeals and delivery. Paper 3: presentation skills.' },
    /* ---------- Reflective & Personal ---------- */
    { id: 'reflective', n: 'Reflective Essay', g: 'rp', ic: '🪞', w: [300, 500], pm: 4, fm: false,
      pa: 'To look back on an experience and explore what it taught you. Audience: your teacher, an examiner, readers who value honest insight.',
      ft: ['A specific experience described|time', 'A first-person voice|fp', 'Feelings at the time|emotion', 'Analysis: why it happened and what it meant|cause', 'A change in understanding or growth|refl', 'A link to wider life or the future|future', 'An honest, thoughtful tone|self', 'A conclusion that looks forward|concl'],
      st: ['The experience (what happened)', 'Your feelings and reactions', 'Analysis: why it mattered', 'What you learned', 'How it shapes what you will do next'],
      rg: 'Personal but controlled. First person is expected; keep the language standard unless quoting.',
      md: `I used to think confidence was something you were born with, like dimples. Then I was chosen to read the lesson at the Emancipation service. My hands shook so badly that the paper rattled into the microphone.

Halfway through, I looked up and saw my grandmother in the third pew, mouthing the words along with me. She had heard that passage every August for sixty years. In that moment I understood that confidence is not the absence of fear; it is remembering who you are speaking for.`,
      pr: ['Reflect on a time you failed at something and what it taught you.', 'Reflect on how your use of language changes between home, school and social media.', 'Reflect on an experience that changed how you see your community.'],
      cape: 'Paper 3 Section B: the reflective piece and its 50 to 100-word justification. Module 2: reflecting on language and identity.' },
    { id: 'personal', n: 'Personal Essay', g: 'rp', ic: '💭', w: [300, 550], pm: 3, fm: false,
      pa: 'To explore a larger idea through your own life and voice. Audience: magazine and blog readers, college admissions panels, classmates.',
      ft: ['A personal story or observation as the spine|fp', 'A larger idea or question explored|self', 'A distinct, conversational voice|self', 'Vivid scene-setting|sense', 'A mix of narration and reflection|refl', 'Humour or warmth|humour', 'An insight at the end|end'],
      st: ['Open with a scene or a surprising statement', 'Tell the story', 'Step back and reflect', 'Widen out to the bigger idea', 'Close with an insight'],
      rg: 'Personal and natural, but polished. Contractions and Creole phrases can work if they fit your voice.',
      md: `My mother has a rule: nobody leaves the house without eating. Not a full breakfast, necessarily, but something: a slice of hard-dough bread, a cup of bush tea, a single fried dumpling pressed into your palm at the door.

For years I thought it was fussing. Now that I am old enough to pack my own lunch, I notice that I do the same thing to my little brother. I think the rule was never about food. It was a way of saying: whatever happens out there today, you started here, and you were fed.`,
      pr: ['Write a personal essay about a family rule or ritual and what it really means.', 'Write a personal essay about a place that feels like home.', 'Write a personal essay about the language you dream in.'],
      cape: 'Module 2: language, identity and voice. Paper 3 Section B: a personal essay can be your reflective piece.' },
    { id: 'journal', n: 'Journal & Diary Entry', g: 'rp', ic: '📓', w: [150, 350], pm: 2, fm: false,
      pa: 'To record events, thoughts and feelings privately, or as a character in fiction. Audience: yourself (or readers of a story told in diary form).',
      ft: ['A date (and sometimes a time or place)|date', 'An informal, first-person voice|fp', 'Present-moment detail|sense', 'Honest feelings|emotion', 'Reflection on events|refl', 'Questions to yourself or hopes for later|q', 'A natural, conversational register|informal'],
      st: ['Date', 'What happened today', 'How you feel about it', 'What you are thinking about next'],
      rg: 'Informal and honest. Creole, contractions and fragments are natural here.',
      md: `Tuesday, 14 October
Mock exams start Monday and I have not even opened my Module 2 notes. Mommy says I spend more time on my phone than on my books, and tonight, honestly, she is right. I scrolled for two hours. Two hours!

Tomorrow I am leaving the phone in the kitchen after seven. I wonder if I can actually do it. Keisha says the trick is to study with music that has no words. Maybe I'll try some old steelpan instrumentals. Tomorrow. For real.`,
      pr: ['Write a diary entry about the night before an important exam.', 'Write a journal entry as a character in a story you are writing.', 'Write a diary entry on the day your district was hit by a storm.'],
      cape: 'Paper 3 Section B: a diary or journal entry can be a reflective piece. Module 2: informal register and code-switching.' },
    /* ---------- Life Writing ---------- */
    { id: 'autobio', n: 'Autobiography', g: 'lw', ic: '🧬', w: [350, 600], pm: 4, fm: false,
      pa: 'To tell the story of your own life, or a large part of it, and what shaped you. Audience: family, future readers, scholarship panels.',
      ft: ['A first-person account of your own life|fp', 'A chronological structure|time', 'Key life events and turning points|life', 'Family and cultural background|family', 'Reflection on influences and lessons|refl', 'Specific places and dates|place', 'An honest, authentic voice|self'],
      st: ['Birth, family and place', 'Childhood moments', 'Turning points', 'Who you are now', 'Who you hope to become'],
      rg: 'Personal and reflective, mostly past tense. Choose standard or Creole phrasing deliberately.',
      md: `I was born in Antigua in the year of a hurricane, and my mother says that explains a lot. My father's people came from Dominica, my mother's from Anguilla, so I grew up between two kinds of Creole and a third one we invented at our dinner table.

At five, I sold limeade on our front step. At ten, I read every book in the children's room of the library, twice. At fourteen, I discovered I could make people laugh on stage, and nothing has been quite the same since.`,
      pr: ['Write the opening chapter of your autobiography, beginning with where and when you were born.', 'Write an autobiographical account of the three moments that shaped you most.', 'Write your autobiography as told through the languages you speak.'],
      cape: 'Module 2: language and identity. Module 1: life writing as a literary form. Paper 3 Section B: reflective life writing.' },
    { id: 'memoir', n: 'Memoir', g: 'lw', ic: '🕰️', w: [300, 550], pm: 3, fm: false,
      pa: 'To explore one period, theme or relationship from your life in depth. Audience: general readers who connect through shared feeling.',
      ft: ['A focus on one period, theme or relationship|self', 'A first-person, reflective voice|fp', 'Vivid scenes with dialogue|dlg', 'Sensory memory|sense', 'An older narrator looking back|lookback', 'Emotional truth and insight|refl', 'A meaningful ending|end'],
      st: ['A vivid scene from the past', 'The people and the place', 'What happened', 'What you understand now that you did not then'],
      rg: 'Literary and intimate. Dialogue keeps people\'s real voices, including Creole.',
      md: `The summer I was twelve, I spent every afternoon on my grandfather's boat off Bequia, learning to read the water. "See how it darken there?" he would say, pointing. "Reef. Never trust pretty water."

I did not know then that he was teaching me about more than the sea. Years later, when a friend offered me something too good to be true, I heard his voice and stepped back. I remember the smell of his pipe, the creak of the oars, and the way he never once raised his voice.`,
      pr: ['Write a memoir piece about one summer that changed you.', 'Write a memoir about a relative and the lesson they taught you without meaning to.', 'Write a memoir piece about moving to a new island or a new school.'],
      cape: 'Paper 3 Section B: a memoir can be your reflective piece. Module 2: representing Creole speech in writing.' },
    { id: 'biography', n: 'Biography', g: 'lw', ic: '🏛️', w: [300, 500], pm: 4, fm: true,
      pa: 'To tell the life story of another person, based on research. Audience: students, the public, readers of a magazine or exhibition.',
      ft: ['A third-person account of someone else\'s life|tp', 'Birth, background and early influences|life', 'Chronological order with dates|year', 'Major achievements and challenges|self', 'Researched facts and named sources|attr', 'A balanced, objective tone|objective', 'Significance and legacy|legacy'],
      st: ['Introduction: who and why they matter', 'Early life', 'Achievements and challenges', 'Later life', 'Legacy'],
      rg: 'Formal and factual. Check every date and name, and acknowledge your sources.',
      md: `Sir William Arthur Lewis was born in Saint Lucia in 1915, the son of two schoolteachers. A gifted student, he finished secondary school early and won a government scholarship to study at the London School of Economics.

Lewis became one of the most important development economists of the twentieth century, writing about how poorer countries could grow their economies. He later led the University of the West Indies, and in 1979 he shared the Nobel Memorial Prize in Economic Sciences. Today, a community college in Saint Lucia carries his name, a reminder that world-class ideas can begin on a small island.`,
      pr: ['Write a short biography of a Caribbean figure you admire, using at least two sources.', 'Write a biography of an elder in your community based on an interview.', 'Write a biography of a national hero of your territory for a primary-school magazine.'],
      cape: 'Module 1: research, evaluating sources and acknowledging sources (plagiarism). Module 3: writing for a specific audience.' },
    { id: 'profile', n: 'Profile & Interview Write-Up', g: 'lw', ic: '🎙️', w: [300, 500], pm: 4, fm: true,
      pa: 'To introduce a real person through observation and their own words. Audience: newspaper, magazine or school-newsletter readers.',
      ft: ['An engaging opening scene or quotation|hook', 'Direct quotations from the interviewee|quote', 'Attribution verbs (said, explained, laughs)|attr', 'Background information|life', 'The person described in their setting|sense', 'A consistent Q&A or narrative structure|self', 'A closing quotation or insight|end'],
      st: ['Scene or quotation to open', 'Who they are and why they matter', 'Their story, in their words', 'Challenges and hopes', 'Closing quotation'],
      rg: 'Journalistic and lively. Quote accurately, including Creole, and attribute every quotation.',
      md: `At 5 a.m., when most of Holetown is still asleep, Marisol Richardson is already elbow-deep in dough. "Bread doesn't wait for anybody," she laughs, sliding a tray of salt bread into the oven.

Richardson, 34, opened her bakery three years ago with a borrowed oven and her grandmother's recipes. Today she employs four young people from the neighbourhood. "I hire the ones who show up early," she explained. "Talent you can teach. Showing up, that's character."`,
      pr: ['Interview a family member about their first job and write it up as a profile.', 'Profile a young entrepreneur or artist in your community.', 'Write a Q&A interview with a teacher about how communication has changed during their career.'],
      cape: 'Module 1: the interview as a method of data collection; acknowledging sources. Module 3: forms of communication.' },
    { id: 'tribute', n: 'Obituary & Tribute', g: 'lw', ic: '🕊️', w: [200, 400], pm: 3, fm: true,
      pa: 'To honour a life: an obituary informs the public; a tribute celebrates the person with personal memories. Audience: family, community, newspaper readers, a memorial service.',
      ft: ['Name and dates|year', 'Life-story highlights|life', 'Personal qualities with examples|self', 'Contributions to the community|tribute', 'Family or personal memories|family', 'A respectful, warm tone|self', 'A closing farewell|farewell'],
      st: ['Name, age and passing', 'Early life and family', 'Work and contributions', 'Qualities and memories', 'Survived by / farewell'],
      rg: 'Respectful and warm; formal in an obituary, more personal in a tribute.',
      md: `Mrs. Ivy Euphemia Carty, affectionately known as "Teacher Ivy", passed away peacefully on 3 March at the age of 91. Born in Charlestown, Nevis, in 1934, she taught generations of children to read under the almond tree beside the old schoolhouse.

Teacher Ivy believed every child could learn and every child deserved a second chance; many of her former pupils are now teachers, nurses and ministers. She is survived by her daughter, four grandchildren and a community that will never forget her firm voice and her soft heart. Walk good, Teacher.`,
      pr: ['Write a tribute to a teacher, coach or elder who shaped your community (real, or created for this task).', 'Write an obituary for a character from a story you have read.', 'Write a tribute to a Caribbean musician, writer or athlete whose work has inspired you.'],
      cape: 'Module 3: audience, purpose and register for a sensitive occasion. Module 1: biographical writing.' },
    /* ---------- Journalism & Media ---------- */
    { id: 'news', n: 'News Report', g: 'jm', ic: '📰', w: [250, 400], pm: 4, fm: true,
      pa: 'To inform the public quickly and accurately about a recent event. Audience: newspaper, website or broadcast audiences.',
      ft: ['A headline|headline', 'A lead paragraph answering who, what, when and where|when', 'Inverted pyramid: most important facts first|self', 'Quotations from sources|quote', 'Attribution (said, according to)|attr', 'An objective, third-person tone|objective', 'Short paragraphs|shortparas', 'Background and next steps at the end|self'],
      st: ['Headline', 'Lead: who, what, when, where (why, how)', 'Key details and quotations', 'Background', 'What happens next'],
      rg: 'Formal, neutral and concise. No opinion; attribute every claim.',
      md: `Students Turn Sargassum Into Garden Fertiliser

SCARBOROUGH — A group of sixth-form students has found a use for the seaweed piling up on Store Bay beach. On Friday, the school's Environmental Club unveiled a compost project that turns washed, dried sargassum into fertiliser for the school garden.

"We kept complaining about the smell, so we decided to do something about it," said club president Daniel Brooks, 17.

According to the club's adviser, the first batch has already been used on tomato and sweet-pepper beds. The students plan to present their results at a regional science fair in April.`,
      pr: ['Write a news report on a fire drill that uncovered a serious safety problem at a school.', 'Write a news report on your school team winning a regional competition.', 'Write a news report about a community clean-up after a storm.'],
      cape: 'Module 1: fact, opinion and bias; the reliability of sources. Module 3: old and new media; ethics and fake news.' },
    { id: 'feature', n: 'Feature Article', g: 'jm', ic: '🗞️', w: [350, 600], pm: 4, fm: true,
      pa: 'To explore a person, place, trend or issue in depth, with human interest. Audience: magazine and weekend-paper readers.',
      ft: ['A catchy headline (and stand-first)|headline', 'An engaging lead (anecdote, scene or question)|hook', 'A human-interest angle|self', 'Quotations and voices|quote', 'Facts or statistics for context|evid', 'Subheadings or clear sections|head', 'A personal, lively tone|self', 'A memorable ending that circles back|end'],
      st: ['Headline and stand-first', 'Scene-setting lead', 'Nut graph: why this matters now', 'Voices, facts and stories', 'Circular ending'],
      rg: 'Semi-formal and engaging; more voice and colour than a news report.',
      md: `The Pan Yard Never Sleeps

On a Tuesday night in Port of Spain, the pan yard is a cathedral of steel. Fifty players, from a nine-year-old on the tenor pan to a retired policeman on the bass, hammer out the same phrase for the twentieth time.

"Again!" the arranger shouts, and nobody complains.

For eight weeks before Panorama, this is their life: practice from seven until past midnight, fuelled by bake and saltfish and a stubborn love for an instrument born in these very yards.`,
      pr: ['Write a feature article about a young person keeping a traditional craft alive.', 'Write a feature article about how Caribbean teenagers spend their weekends.', 'Write a feature article on the people who keep Carnival running behind the scenes.'],
      cape: 'Module 1: non-literary texts, purpose and organisational strategies. Module 3: audience and medium.' },
    { id: 'editorial', n: 'Editorial & Opinion Column', g: 'jm', ic: '🖋️', w: [300, 500], pm: 4, fm: true,
      pa: 'To argue a clear position on a current issue on behalf of a publication (editorial) or a named writer (column). Audience: the paper\'s readers and decision-makers.',
      ft: ['A clear stance on a current issue|thesis', 'A hook tied to recent news|hook', 'Evidence and examples|evid', 'The opposing view acknowledged|counter', 'Persuasive language and rhetorical questions|q', 'A confident, authoritative voice|inclusive', 'A proposed action|cta', 'A punchy conclusion|concl'],
      st: ['News hook', 'Position', 'Supporting arguments', 'Opposing view and response', 'What must happen now'],
      rg: 'Formal and assertive. Editorials often use "we" for the publication.',
      md: `Once again, the rains came and the roads became rivers. Once again, residents waded through brown water to reach work and school. And once again, officials promised a study.

We do not need another study. We need cleared drains, enforced building codes and an end to construction in natural waterways. Yes, these measures cost money, but every flood costs more: in damaged homes, lost school days and, too often, lives. The time for promises has passed. The time for drains is now.`,
      pr: ['Write an editorial on whether your territory should ban single-use plastics.', 'Write an opinion column arguing for or against later school start times.', 'Write an editorial on how Creole speakers are treated in job interviews.'],
      cape: 'Module 1: fact versus opinion and persuasive techniques. Module 2: language attitudes. Module 3: persuasion and ethics.' },
    { id: 'review', n: 'Review (Book, Film & Music)', g: 'jm', ic: '⭐', w: [250, 450], pm: 3, fm: true,
      pa: 'To evaluate a book, film, album, show or event and help readers decide whether to experience it. Audience: readers of a magazine, blog or school newsletter.',
      ft: ['Names the work, the creator and the genre|self', 'A brief summary without spoilers|self', 'A clear evaluative judgement|opinion', 'Evaluation of specific elements (plot, acting, lyrics, sound)|evalw', 'Examples from the work|quote', 'Comparison with similar works|similar', 'A rating or recommendation|rating', 'An engaging, lively voice|self'],
      st: ['Hook and basic details', 'Short summary (no spoilers)', 'Strengths with examples', 'Weaknesses with examples', 'Verdict and rating'],
      rg: 'Semi-formal and opinionated, but backed by examples.',
      md: `Rating: 4 out of 5

Tide Line, a new short film by a young Bahamian director, follows a sixteen-year-old fisherman's daughter who secretly enters a regatta. The plot is simple, but the performances are anything but. The lead actress carries whole scenes with a single look, and the regatta sequences, shot from inside the boats, are genuinely thrilling.

The film does stumble in its final act, which rushes a family reconciliation that deserved more time. Still, with its rake-and-scrape soundtrack and luminous Exuma waters, Tide Line is a proud, fresh piece of Caribbean cinema. Recommended for anyone who has ever been told to know their place. (The film in this model was created for this course.)`,
      pr: ['Review a Caribbean album, song or music video you know well.', 'Review a book you studied or read for pleasure, for your school magazine.', 'Review a local restaurant, festival or event for a tourism website.'],
      cape: 'Module 1: evaluating information; fact versus opinion. Module 3: audience, purpose and medium.' },
    { id: 'blog', n: 'Blog Post', g: 'jm', ic: '💻', w: [250, 450], pm: 3, fm: false,
      pa: 'To share ideas, experiences or advice online and build a community of readers. Audience: online readers, often peers.',
      ft: ['A catchy, searchable title|headline', 'A conversational, personal voice|fp', 'Short paragraphs and a scannable layout|shortparas', 'Subheadings or lists|bullets', 'Engagement with readers (questions, comments)|blog', 'Calls to share, comment or follow|blog', 'Personality and opinion|opinion'],
      st: ['Title', 'Friendly hook', 'Main content in short sections or a list', 'Question for readers', 'Sign-off'],
      rg: 'Informal to semi-formal. Emojis and contractions are fine, but keep spelling accurate.',
      md: `5 Things Nobody Tells You About Sixth Form
So you survived fifth form. Congrats! Here's what I wish someone had told me.
1. Free periods are a trap. That "free" hour disappears into your phone faster than you can say Paper 2.
2. Your teachers become your allies. Seriously, ask questions. They actually want you to.
3. Group chats are a blessing and a curse. Mute them during study time.
Which one surprised you most? Drop your own tips in the comments below. 👇`,
      pr: ['Write a blog post giving survival tips to new CAPE students.', 'Write a travel blog post about a day trip on your island for visiting teenagers.', 'Write a blog post about a cause you care about, ending with a call for readers to act.'],
      cape: 'Module 3: new media and choosing the right medium. Module 2: technology and language.' },
    { id: 'travel', n: 'Travel Writing', g: 'jm', ic: '🧳', w: [300, 500], pm: 3, fm: false,
      pa: 'To share the experience of a place and journey so readers feel they have travelled too. Audience: travel magazines, blogs, tourism sites, curious readers.',
      ft: ['A strong sense of place|place', 'Sensory, descriptive language|sense', 'A first-person traveller\'s perspective|fp', 'Cultural detail (food, people, language, history)|carib', 'A narrative of a journey or experience|time', 'Practical or reflective insight|refl', 'Respectful portrayal of local people|self'],
      st: ['Arrival or departure scene', 'First impressions', 'Encounters and discoveries', 'Reflection on the place'],
      rg: 'Personal and descriptive. Avoid clichés ("paradise", "hidden gem") and stereotypes.',
      md: `The ferry from Marigot to Anguilla takes barely half an hour, but it feels like crossing into a slower clock. On the upper deck, a grandmother fans herself with a newspaper and tells me, unprompted, that I must try the johnnycakes at Sandy Ground.

By the time we dock, the water has turned from navy to a clear, impossible turquoise. In the village, goats wander past a pink church, and a man selling crayfish tells me the best beaches are the ones without signs.`,
      pr: ['Write a travel piece introducing your island to a visiting student from another region.', 'Write about a journey between two Caribbean territories.', 'Write a travel piece about a place in your district that tourists never see.'],
      cape: 'Module 3: the global village and Caribbean culture. Module 1: descriptive and narrative organisational strategies.' },
    { id: 'satire', n: 'Satire', g: 'jm', ic: '🃏', w: [250, 450], pm: 3, fm: false,
      pa: 'To expose foolishness or wrongdoing through humour, exaggeration and irony, and so push for change. Audience: readers who share enough context to get the joke.',
      ft: ['A clear target (an issue, institution or behaviour)|self', 'Exaggeration (hyperbole)|hyper', 'Irony: saying the opposite of what is meant|irony', 'A mock-serious tone|self', 'Humour with a serious point|self', 'Parody of a familiar format (news, advert, speech)|headline', 'A message the reader can uncover|self'],
      st: ['Set up the familiar format', 'Introduce the absurd situation', 'Escalate the exaggeration', 'Land the serious point'],
      rg: 'Deadpan and controlled. Punch up at powerful people and ideas, never down at the vulnerable.',
      md: `BREAKING: Ministry Announces Bold Plan to Fix Potholes by Naming Them

In a historic move, officials confirmed yesterday that the 4,327 potholes on the main road will no longer be repaired but will instead receive official names. "Repairs are expensive and temporary," a spokesperson explained, "but a name is forever."

Residents can now report damage to their vehicles through the new Pothole Appreciation Portal. The largest crater, near the roundabout, has been named Lake Hope, and early reports suggest it is already home to several fish.`,
      pr: ['Write a satirical news report about a school that bans all fun to improve exam results.', 'Write a satirical advertisement for a "miracle" app that does your homework.', 'Write a satirical speech by a politician who promises everything and delivers nothing.'],
      cape: 'Module 1: tone, irony and purpose in literary and non-literary texts. Module 3: ethics in persuasion and media.' },
    /* ---------- Transactional & Workplace ---------- */
    { id: 'formalletter', n: 'Formal Letter', g: 'tw', ic: '📨', w: [200, 350], pm: 3, fm: true,
      pa: 'To communicate officially with an organisation or person in authority: to request, apply, complain or inform. Audience: principals, managers, officials.',
      ft: ['Sender\'s address and date|date', 'The recipient\'s title and address|recipient', 'A formal salutation|sal', 'A subject line|subj', 'Purpose stated in the first paragraph|purp', 'Polite, formal register (no contractions)|formal', 'A request or next step|cta', 'The correct sign-off (Yours faithfully or sincerely)|sign'],
      st: ['Sender\'s address and date', 'Recipient\'s address', 'Salutation and subject line', 'Purpose', 'Details', 'Request and close', 'Sign-off'],
      rg: 'Formal Standard English. "Dear Sir or Madam" pairs with "Yours faithfully"; "Dear Mr Lake" pairs with "Yours sincerely".',
      md: `14 Church Street
Basseterre
St. Kitts
17 October 2026

The Principal
[Name of School]
Basseterre

Dear Sir or Madam,

Re: Request to Establish a Debate Club

I am writing on behalf of thirty Lower Sixth students to request permission to establish a debate club that would meet on Thursday afternoons. Debating would strengthen the oral communication skills required for CAPE Communication Studies and prepare us for regional competitions.

A teacher has agreed to supervise, and we would require only the use of the library after 3:00 p.m. Thank you for considering this request. I look forward to your response.

Yours faithfully,
Jordan Hassell
Lower Sixth Representative`,
      pr: ['Write a formal letter to your principal requesting a change to the school timetable.', 'Write a letter of application for a summer job at a hotel or radio station.', 'Write a formal letter of complaint to a company about a faulty product.'],
      cape: 'Module 3: formal letter conventions, register and audience; the Module 3 response (maximum 300 words).' },
    { id: 'informalletter', n: 'Informal Letter', g: 'tw', ic: '💌', w: [200, 350], pm: 3, fm: false,
      pa: 'To keep in touch with family or friends and share news and feelings. Audience: someone you know well.',
      ft: ['Address and date (often shortened)|date', 'A friendly salutation (Dear Aaliyah, Hi Gran)|sal', 'A warm, personal opening|fp', 'A conversational register|informal', 'News, feelings and shared memories|emotion', 'Questions to the reader|q', 'A friendly sign-off (Love, Take care)|sign'],
      st: ['Address and date', 'Greeting', 'Warm opening', 'News and feelings', 'Questions and plans', 'Friendly close'],
      rg: 'Informal and warm. Contractions, Creole sayings and humour are welcome.',
      md: `Tunapuna, 12 October

Dear Gran,

How are you keeping? Mommy says your knee is better and you're back in the garden, which is the best news I've had all week!

School is busy. I joined the drama club, and guess what? I'm playing a market woman in our Emancipation play. I'm using all your sayings, so don't be surprised if you hear "Every day bucket go a well" in my best voice.

Do you still make guava cheese at Christmas? Save me a piece, please.

Love you plenty,
Shanice`,
      pr: ['Write a letter to a cousin abroad describing how your island has changed this year.', 'Write a letter to a younger sibling giving advice about starting secondary school.', 'Write a letter to a friend apologising for a misunderstanding.'],
      cape: 'Module 2: register, code-switching and language varieties. Module 3: forms of communication.' },
    { id: 'email', n: 'Email', g: 'tw', ic: '📧', w: [120, 250], pm: 3, fm: true,
      pa: 'To communicate quickly and clearly in writing, from casual to professional. Audience: teachers, employers, clients, classmates.',
      ft: ['A specific subject line|subj', 'An appropriate greeting|sal', 'Purpose in the first line|purp', 'Short, focused paragraphs|shortparas', 'A clear request or action|cta', 'A polite closing and signature|sign', 'Register suited to the recipient|self', 'No text-speak|notext'],
      st: ['Subject line', 'Greeting', 'Purpose', 'Details', 'Request or next step', 'Closing and signature'],
      rg: 'Match the recipient: formal for teachers and employers, relaxed for friends. Never "u" or "pls" in a professional email.',
      md: `Subject: Request for Extension: Module 1 Research Assignment

Good afternoon Ms. Gumbs,

I am writing to request a two-day extension for the Module 1 research assignment due on Friday.

I was absent on Tuesday and Wednesday because of a family emergency, and I missed the session on questionnaire design. I have attached a note from my parent.

Would it be possible to submit the assignment on Monday instead? I have already completed the introduction.

Thank you for your understanding.

Kind regards,
Tariq Williams
Lower Sixth`,
      pr: ['Write an email to a teacher requesting feedback on a draft.', 'Write an email to a company enquiring about a summer internship.', 'Write an email to your class group organising a study session.'],
      cape: 'Module 3: forms of communication and choosing the right medium; directions of flow. Module 2: technology and language.' },
    { id: 'memo', n: 'Memo', g: 'tw', ic: '📋', w: [120, 250], pm: 2, fm: true,
      pa: 'To share information or instructions inside an organisation. Audience: staff, members or students of the same organisation.',
      ft: ['A MEMO or MEMORANDUM heading|memohead', 'To, From, Date and Subject lines|memo', 'Purpose stated in the first sentence|purp', 'Concise, direct language|self', 'Bullets or numbered points where useful|bullets', 'Action required and a deadline|deadline', 'No salutation or formal sign-off (initials only)|self'],
      st: ['MEMORANDUM heading', 'To / From / Date / Subject', 'Purpose', 'Details (bullets)', 'Action and deadline', 'Initials'],
      rg: 'Formal, concise and impersonal. Get to the point in the first line.',
      md: `MEMORANDUM
To: All Sixth Form Students
From: Student Council President
Date: 17 October 2026
Subject: Careers Day Volunteers

The Student Council needs twelve volunteers to help run Careers Day on Friday, 7 November.
Volunteers will:
• welcome visiting professionals at the main gate
• guide guests to their classrooms
• help set up and clear the hall
Please sign up with your form representative no later than Friday, 24 October.
J.H.`,
      pr: ['Write a memo from the Student Council announcing a new recycling policy.', 'Write a memo to hotel staff about new hurricane-preparedness procedures.', 'Write a memo to club members announcing a change in meeting times and the reason.'],
      cape: 'Module 3: academic and organisational communication; directions of flow (downward, upward and lateral).' },
    { id: 'report', n: 'Report', g: 'tw', ic: '📊', w: [300, 500], pm: 4, fm: true,
      pa: 'To present findings on an issue and recommend action. Audience: the person or body that requested it (principal, board, council).',
      ft: ['A title and terms of reference|purp', 'Headings and numbered sections|head', 'Method: how information was gathered|method', 'Findings with data|stat', 'An objective, impersonal tone|objective', 'Conclusions|concl', 'Recommendations|rec', 'Name and date of the writer|date'],
      st: ['Title', '1. Terms of reference', '2. Method', '3. Findings', '4. Conclusions', '5. Recommendations', 'Name and date'],
      rg: 'Formal and impersonal; the passive voice is common ("A questionnaire was given...").',
      md: `Report on Canteen Use at the School
1. Terms of Reference
At the request of the Principal, the Student Council investigated why fewer students are buying lunch at the canteen.
2. Method
A questionnaire was given to 120 students across all forms, and the canteen manager was interviewed.
3. Findings
3.1 Sixty-two per cent of respondents said the lines were too long.
3.2 Forty-five per cent wanted more local options such as pumpkin soup or fish and fungi.
4. Recommendations
It is recommended that a second serving counter be opened and that one local dish be offered daily.`,
      pr: ['Write a report on student use of the school library, with findings and recommendations.', 'Write a report on a community problem (for example flooding or litter) for your local council.', 'Write a report on how students in your form use social media, based on a short survey.'],
      cape: 'Module 1: research, data collection (questionnaires, interviews) and presenting findings. Module 3: organisational communication. Paper 3: research and audience.' },
    { id: 'proposal', n: 'Proposal', g: 'tw', ic: '💡', w: [300, 500], pm: 4, fm: true,
      pa: 'To persuade a decision-maker to approve and support a plan. Audience: principals, boards, funders, councils.',
      ft: ['A clear title and purpose|purp', 'Background: the problem or need|cause', 'Objectives|objectives', 'A plan of action or method|seq', 'A timeline|timeline', 'A budget or resources|budget', 'Expected benefits and evaluation|benefit', 'A persuasive, professional tone|formal'],
      st: ['Title', 'Background', 'Objectives', 'Plan of action', 'Timeline', 'Budget', 'Evaluation and benefits'],
      rg: 'Formal and persuasive, with headings. Be specific: numbers, dates and costs build credibility.',
      md: `Proposal: A Peer-Tutoring Programme for Fourth-Form Mathematics
Background: Last year, 40 per cent of fourth-form students scored below 50 in their end-of-term mathematics examination.
Objectives: The programme aims to raise the average mark by ten points and to build confidence through peer support.
Plan: Sixth-form volunteers will tutor small groups twice a week during lunch, beginning in January.
Budget: US$400 for worksheets, snacks and certificates, to be raised through a bake sale.
Evaluation: Marks from the January and June examinations will be compared, and students will complete a short survey.`,
      pr: ['Write a proposal to your principal for a school garden.', 'Write a proposal to the tourism board for a youth heritage-tour programme.', 'Write a proposal for a campaign to reduce cyberbullying in your school.'],
      cape: 'Module 3: proposals, campaigns and the Module 3 response. Paper 3: planning for audience and purpose.' },
    { id: 'press', n: 'Press Release', g: 'tw', ic: '📢', w: [200, 350], pm: 3, fm: true,
      pa: 'To give the media ready-to-use news about an organisation\'s event or achievement. Audience: journalists and editors (and, through them, the public).',
      ft: ['"For Immediate Release" line|release', 'A headline|headline', 'A dateline (place and date)|date', 'A lead with who, what, when, where and why|when', 'A quotation from a spokesperson|quote', 'Background details|self', 'Contact information|contact', 'An end mark (### or -ends-)|ends'],
      st: ['FOR IMMEDIATE RELEASE', 'Headline', 'Dateline and lead', 'Details and quotation', 'Background', 'Contact and ###'],
      rg: 'Formal, factual and third person, written as a journalist would write it.',
      md: `FOR IMMEDIATE RELEASE

Students Launch "Speak Your Truth" Spoken Word Festival

BELMOPAN, 17 October 2026 — The Lower Sixth Communication Studies class will host the first "Speak Your Truth" Spoken Word Festival on Friday, 21 November, at 6:00 p.m. in the school auditorium. The free event will feature poetry, monologues and short speeches by students from four secondary schools.

"We want young people to see that their voices, in English and in Creole, are worth hearing," said festival coordinator Aaliyah Brooks.

Media contact: festival.team@example.edu
###`,
      pr: ['Write a press release announcing your school\'s anti-litter campaign.', 'Write a press release for a youth art exhibition.', 'Write a press release announcing a scholarship won by a student in your community.'],
      cape: 'Module 3: forms of communication, campaigns and the media. Paper 3: message points and slogans.' },
    /* ---------- Drama & Performance ---------- */
    { id: 'monologue', n: 'Monologue', g: 'dp', ic: '🎭', w: [250, 450], pm: 2, fm: false,
      pa: 'To reveal a character\'s thoughts and feelings through one extended speech. Audience: a theatre or classroom audience; listeners (monologues are used for CAPE listening comprehension).',
      ft: ['One speaker addressing an audience or a silent listener|fp', 'A distinct voice and personality|self', 'Inner thoughts and motives revealed|emotion', 'Stage directions in brackets|stage', 'A dramatic arc that builds to a turn|twist', 'Rhythm suited to speaking aloud|rep', 'A strong final line|end', 'Deliberate use of Creole or Standard English|self'],
      st: ['Setting and character (stage direction)', 'Hook: what the character wants', 'Build: memories, conflict', 'Turning point', 'Final line'],
      rg: 'Spoken and character-driven. Creole can be the whole point: it is the character\'s real voice.',
      md: `(A market stall at dawn. MISS ROSE, sixties, arranges christophene and dasheen. She speaks to the audience as if they are early customers.)

Morning, morning. Yes, the dasheen fresh. Dug it myself, yesterday, with these same two hands. (She holds them up.) Forty years I sell in this market. Forty years! I sell through hurricane, through election, through the time the government move the whole market and forget to tell we.

My daughter say, "Mammy, retire." Retire to do what? Sit down and watch television tell me lies? (She laughs, then stops.) No. When I stop selling, it is because the Lord say, "Rose, close the stall." And so far, He ain't say nothing.`,
      pr: ['Write a monologue for a teenager explaining to their parents why they want to study the arts.', 'Write a monologue for an elder who has watched their village change over sixty years.', 'Write a monologue for a character waiting for exam results.'],
      cape: 'Paper 1: monologues are used for listening comprehension; analyse voice and purpose. Module 2: Creole for characterisation. Paper 3 Section B: a monologue can be a reflective piece.' },
    { id: 'script', n: 'Dialogue & Script Scene', g: 'dp', ic: '🎬', w: [250, 500], pm: 3, fm: false,
      pa: 'To tell a story through characters\' conversation and action on stage or screen. Audience: actors, directors and, finally, a watching audience.',
      ft: ['A scene heading or setting description|scenehead', 'Character names before each line|speaker', 'Stage directions in brackets|stage', 'Conflict between characters|conflict', 'Distinct voices for each character|self', 'Subtext: what is not said|self', 'A clear ending or cliffhanger|end'],
      st: ['Scene heading and setting', 'Characters enter; situation', 'Conflict rises', 'Turning point', 'Exit, blackout or cliffhanger'],
      rg: 'Natural speech. Each character should sound different (age, region, mood, Creole or Standard English).',
      md: `SCENE 2. A school corridor after the bell. KEMAR waits by the lockers. ANYA enters, scrolling her phone.
KEMAR: You saw the list?
ANYA: (not looking up) What list?
KEMAR: Anya. The drama list. For the regional festival.
ANYA: (finally looking at him) And?
KEMAR: And you're on it. Lead role.
(Pause. ANYA lowers the phone.)
ANYA: My mother will never let me go to Barbados.
KEMAR: Then we'll have to give her a reason to say yes.
(Lights fade.)`,
      pr: ['Write a scene in which two friends disagree about leaving the Caribbean to study.', 'Write a scene set in a barbershop or hair salon where a rumour spreads.', 'Write a scene in which a grandparent and grandchild argue about the use of Creole.'],
      cape: 'Module 2: code-switching and attitudes to language, shown through characters. Module 3: verbal and non-verbal communication.' },
    { id: 'radio', n: 'Radio Script', g: 'dp', ic: '📻', w: [200, 400], pm: 3, fm: false,
      pa: 'To inform or entertain listeners through sound alone: a segment, a public-service announcement or a radio drama. Audience: listeners who cannot see anything.',
      ft: ['Programme title and timing|seg', 'Speaker labels (PRESENTER, GUEST)|speaker', 'Sound effects and music cues (SFX, MUSIC)|sfx', 'Spoken, conversational language|self', 'Short sentences for the ear|self', 'Signposting for listeners|seq', 'A clear call to action or sign-off|cta'],
      st: ['Programme, segment and duration', 'Music in', 'Presenter hook', 'Content with sound cues', 'Call to action', 'Music out'],
      rg: 'Spoken register: friendly, clear and paced for listening. Paint pictures with sound.',
      md: `PROGRAMME: Youth Voices Live | SEGMENT 2 | DURATION: 2 min
MUSIC: Upbeat soca bed, fade under.
PRESENTER: Good morning, Cayman! You're listening to Youth Voices Live, and today we're talking water. Did you know that most of the water in your tap was once seawater?
SFX: Running tap, then a splash.
PRESENTER: That's right. Our island depends on desalination, and that costs energy and money. So here's your challenge this week: turn off the tap while you brush. Two minutes, every morning.
MUSIC: Swell, then fade.
PRESENTER: Stay with us. After the break, we meet the students building a rainwater tank.`,
      pr: ['Write a two-minute radio public-service announcement about road safety.', 'Write a radio segment interviewing a young farmer.', 'Write the opening of a radio drama: a mystery set in a hurricane shelter.'],
      cape: 'Module 3: the communication process, choosing the medium and barriers (noise). Paper 3: justifying media choices.' },
    { id: 'podcast', n: 'Podcast Script', g: 'dp', ic: '🎧', w: [250, 450], pm: 3, fm: false,
      pa: 'To hold an engaging, on-demand conversation on a topic for regular listeners. Audience: subscribers and online listeners, often young.',
      ft: ['A show intro with name and hosts|seg', 'Episode topic and hook|hook', 'Host speaker labels|speaker', 'A conversational, natural register|informal', 'Segments or timestamps|seg', 'Music or sound cues|sfx', 'Listener engagement (subscribe, send questions)|blog', 'An outro previewing the next episode|outro'],
      st: ['Intro music and welcome', 'Episode hook', 'Segment 1', 'Segment 2', 'Listener questions', 'Outro'],
      rg: 'Relaxed and natural; banter is fine, but plan the key points.',
      md: `[INTRO MUSIC: steelpan loop, 5 seconds]
HOST 1 (ZARA): Welcome back to Island Frequencies, the podcast where we talk about how the Caribbean talks. I'm Zara.
HOST 2 (DEV): And I'm Dev. Today's episode: why do we switch to "proper English" the minute we answer the phone?
ZARA: Guilty! My mom goes from full Creole to newsreader voice in two seconds.
DEV: (laughs) Linguists call that code-switching, and by the end of this episode you'll know exactly why we do it.
[SEGMENT 1: 00:45 | What is code-switching?]`,
      pr: ['Write the script for the first five minutes of a podcast episode about Caribbean slang.', 'Script a podcast episode in which you interview a classmate about exam stress.', 'Write a podcast script reviewing three local foods for international listeners.'],
      cape: 'Module 2: code-switching, technology and language. Module 3: new media and audience.' },
    /* ---------- Poetry ---------- */
    { id: 'poetry', n: 'Poetry (Any Form)', g: 'po', ic: '🪶', w: [40, 250], pm: 1, fm: false, poem: true,
      pa: 'To express feeling and meaning through compressed, musical language and deliberate line breaks. Audience: readers and listeners; an open-mic crowd; a poetry competition.',
      ft: ['Line breaks used for effect|lines', 'Imagery|sense', 'Figurative language|fig', 'Sound devices (rhyme, alliteration)|sound', 'A clear speaker or voice|self', 'A theme or feeling|emotion', 'Stanzas or a deliberate shape|stanzas', 'A strong final line|self'],
      st: ['Image or moment that starts the poem', 'Develop the image or feeling', 'Turn (a shift in thought)', 'Closing line'],
      rg: 'Any register. Nation language and Creole are powerful poetic choices in Caribbean poetry.',
      md: `My grandmother's hands
are maps of every island she has crossed:
a scar from the cane at harvest,
a callus from the sewing machine in Curaçao,
a ring she never takes off
though the man is twenty years gone.

When she plaits my hair on Sunday evenings
I feel the ocean in her fingers,
patient, salt-sure, pulling me
straight.`,
      pr: ['Write a poem about a sound that means home to you.', 'Write a poem in which an island speaks to the people who have left it.', 'Write a poem about the moment before a storm.'],
      cape: 'Module 1: poetry is a literary form; analyse devices with PEEL. Paper 3 Section B: a poem can be your reflective piece, with a 50 to 100-word justification.' }
  ];
  /* ===================== POETRY CRAFT ===================== (all examples are original) */
  const DEVICES = [
    { n: 'Imagery', d: 'Language that appeals to the senses (sight, sound, smell, taste, touch) so the reader experiences the scene.', ex: 'The smell of hot bake and cocoa tea\ncurls under my bedroom door like a cat.', ef: 'Places the reader inside the moment; strong images carry feeling without naming it.', try: 'Write two lines about your kitchen using smell and sound only.' },
    { n: 'Metaphor', d: 'A direct comparison that says one thing IS another, without "like" or "as".', ex: 'The bus terminal is a beehive at five o\'clock,\nevery worker humming home.', ef: 'Creates a bold, compressed link; the reader transfers the qualities of one thing to the other.', try: 'Complete: "My school is a ..." and extend the metaphor for two more lines.' },
    { n: 'Simile', d: 'A comparison using "like" or "as".', ex: 'The rain came down like coins\nthrown on a galvanise roof.', ef: 'Makes the unfamiliar vivid by linking it to something the reader knows.', try: 'Write a simile for the sound of a steelpan.' },
    { n: 'Personification', d: 'Giving human qualities to an object, animal or idea.', ex: 'The breadfruit tree leans over the fence,\ngossiping with the neighbour\'s mango.', ef: 'Brings the setting to life and can reveal the speaker\'s mood.', try: 'Make the sea speak to a fisherman in two lines.' },
    { n: 'Alliteration', d: 'The repetition of the same consonant sound at the start of nearby words.', ex: 'Salt and sun and sweet sea-grapes,\nboys bouncing balls by the bay.', ef: 'Creates rhythm and makes lines memorable; harsh or soft sounds set the tone.', try: 'Write one line about Carnival where at least four words start with the same sound.' },
    { n: 'Assonance', d: 'The repetition of vowel sounds inside nearby words.', ex: 'Low, slow boats float home\nacross the gold of evening.', ef: 'Creates internal music; long vowels slow a line down, short ones speed it up.', try: 'Write a line about the moon using a repeated long "oo" sound.' },
    { n: 'Consonance', d: 'The repetition of consonant sounds, especially at the ends or middles of words.', ex: 'The pick and click and tick of dominoes\nstacked on the plank table.', ef: 'Adds texture and rhythm without full rhyme.', try: 'Write a line about rain using repeated "t" or "k" sounds.' },
    { n: 'Onomatopoeia', d: 'Words that imitate the sounds they describe.', ex: 'Whoosh goes the bus, beep-beep,\nand the conch shell\'s long hoooom.', ef: 'Makes the poem audible; excellent for performance and spoken word.', try: 'List five sound words from a Caribbean street at noon.' },
    { n: 'Rhyme Scheme', d: 'The pattern of end rhymes, labelled with letters: lines that rhyme share a letter (ABAB, AABB, ABCB).', ex: 'The tide comes in (A)\nthe boats go out (B)\nmy cousin grins (A)\nwe dance and shout (B)', ef: 'Gives shape and musicality; breaking the pattern can signal a shift.', try: 'Write four lines in AABB about the first day of school.' },
    { n: 'Metre & Rhythm', d: 'The beat of a line: the pattern of stressed and unstressed syllables. Iambic pentameter has five da-DUM beats per line.', ex: 'The SUN goes DOWN beHIND the SUGar HILL', ef: 'A steady beat feels calm or song-like; a broken beat creates tension or speech-like realism.', try: 'Clap out the beat of a line, then rewrite it with exactly five da-DUM beats.' },
    { n: 'Enjambment', d: 'When a sentence runs on past the end of a line without punctuation.', ex: 'She waited by the gate until\nthe last bus passed and still\nhe did not come.', ef: 'Creates suspense, momentum or surprise as the reader moves to the next line.', try: 'Take one sentence and break it across three lines so each break creates a small surprise.' },
    { n: 'Caesura', d: 'A strong pause in the middle of a line, often marked by punctuation.', ex: 'We waited. Nothing. Then the thunder spoke.', ef: 'Slows the reader, adds emphasis or drama, imitates hesitation.', try: 'Write a line about waiting for exam results with a full stop in the middle.' },
    { n: 'Refrain', d: 'A line or phrase repeated at intervals through a poem or song.', ex: 'Hold on, the water rising...\n(and later) Hold on, the water rising.', ef: 'Builds emphasis and unity; common in ballads, calypso choruses and villanelles.', try: 'Write a one-line refrain about home that could be repeated three times.' },
    { n: 'Line Breaks', d: 'Where the poet chooses to end each line. The last word of a line gets extra weight.', ex: 'I am not\nlost.\nI am\nfinding.', ef: 'Controls pace and emphasis; white space becomes part of the meaning.', try: 'Rewrite a sentence of prose as a poem, breaking lines to highlight key words.' },
    { n: 'Stanza Forms', d: 'Groups of lines, separated by a blank line: couplet (2), tercet (3), quatrain (4), quintain (5), sestet (6), octave (8).', ex: 'A couplet:\nThe kite went up, the string went tight,\nmy little brother held on with all his might.', ef: 'Stanzas work like paragraphs, organising ideas and controlling rhythm.', try: 'Write the same idea as a couplet and then as a quatrain. Which works better?' }
  ];
  /* Forms: syl = syllable target per line ([min,max] or n); lines = exact line count; scheme = rhyme pattern (spaces = stanza breaks). */
  const FORMS = [
    { id: 'haiku', n: 'Haiku', ic: '🌺', lines: 3, syl: [5, 7, 5],
      about: 'A three-line poem from Japan that captures a single moment in nature, usually with a seasonal reference and a "cut" (a shift) between images.',
      rules: ['3 lines', '5, 7, 5 syllables', 'A seasonal or natural image', 'A cut or contrast between two images', 'Present tense, no title needed'],
      ex: 'Flamboyant in bloom\nred petals drift on the road\nschool is out for June', tip: 'Count syllables, not words. Avoid "I": let the image speak.' },
    { id: 'tanka', n: 'Tanka', ic: '🌊', lines: 5, syl: [5, 7, 5, 7, 7],
      about: 'A five-line Japanese form, older than haiku. The first three lines present an image; the last two turn towards feeling or reflection.',
      rules: ['5 lines', '5, 7, 5, 7, 7 syllables', 'An image in lines 1 to 3', 'A turn to personal feeling in lines 4 and 5'],
      ex: 'Grey clouds over Saba\nthe ferry rocks on the swell\nseabirds hold their breath\nI count the days till Christmas\nwhen you come home on this boat', tip: 'Make line 4 the hinge: the moment the outer world becomes inner feeling.' },
    { id: 'cinquain', n: 'Cinquain', ic: '✋', lines: 5, syl: [2, 4, 6, 8, 2],
      about: 'A five-line form (the American cinquain) that grows and then snaps shut.',
      rules: ['5 lines', '2, 4, 6, 8, 2 syllables', 'Line 1 names the subject', 'Line 5 renames or surprises'],
      ex: 'Steelpan\nsilver and round\nhammered from oil barrels\nthe island sings through its bright skin\nreborn', tip: 'Let the last two syllables land like a drumbeat.' },
    { id: 'limerick', n: 'Limerick', ic: '😄', lines: 5, syl: [[7, 10], [7, 10], [4, 7], [4, 7], [7, 10]], scheme: 'AABBA',
      about: 'A five-line comic poem with a bouncy rhythm and a punchline in the last line.',
      rules: ['5 lines', 'Rhyme scheme AABBA', 'Lines 1, 2 and 5 are longer (about 8 to 9 syllables)', 'Lines 3 and 4 are shorter (about 5 to 6 syllables)', 'A funny twist at the end'],
      ex: 'A fellow from Montego Bay\nate twenty-two johnnycakes a day.\nHe said, "I\'m not full,\nthey\'re light as a gull!"\nThen floated right out to the cay.', tip: 'Read it aloud: if it does not bounce, change the word order.' },
    { id: 'sonnet', n: 'Sonnet', ic: '💛', lines: 14, syl: [[9, 11]], schemes: { shakespearean: 'ABAB CDCD EFEF GG', petrarchan: 'ABBAABBA CDECDE' }, scheme: 'ABAB CDCD EFEF GG',
      about: 'A fourteen-line poem, traditionally about love but now used for any serious subject. It turns (the "volta") at line 9 (Petrarchan) or in the final couplet (Shakespearean).',
      rules: ['14 lines', 'About 10 syllables per line (iambic pentameter)', 'Shakespearean: ABAB CDCD EFEF GG', 'Petrarchan: ABBAABBA CDECDE', 'A volta (turn) in thought'],
      ex: 'My island wakes before the morning light,\nthe roosters argue with the passing breeze,\nthe fishers push their boats out into night\nand coffee steams beneath the almond trees.\n...\n(Lines 5 to 12 continue the pattern.)\n...\nSo if I leave, then let me leave like spray:\npart of the sea that sent me on my way.', tip: 'Choose the pattern first, then collect rhyme pairs before you write.' },
    { id: 'villanelle', n: 'Villanelle', ic: '🔁', lines: 19, syl: [[8, 11]], scheme: 'ABA ABA ABA ABA ABA ABAA', refrains: true,
      about: 'A nineteen-line poem with two refrains that keep returning, perfect for obsession, grief or longing.',
      rules: ['19 lines: five tercets and a final quatrain', 'Only two rhyme sounds: ABA', 'Line 1 (Refrain 1) repeats as lines 6, 12 and 18', 'Line 3 (Refrain 2) repeats as lines 9, 15 and 19'],
      ex: 'Refrain 1: The sea will keep the names we cannot say.\nRefrain 2: and I will wait for you another day.\n\nThe sea will keep the names we cannot say,\nthe boats, the songs, the ones who sailed too far,\nand I will wait for you another day.\n(The refrains then alternate at the end of each tercet.)', tip: 'Write the two refrains first: they must rhyme with each other and bear repeating.' },
    { id: 'ballad', n: 'Ballad', ic: '🎻', syl: [[7, 9], [5, 7], [7, 9], [5, 7]], scheme: 'ABCB', stanza: 4,
      about: 'A song-like narrative poem in four-line stanzas, passed down orally. Ballads tell dramatic stories of love, loss, heroes and the sea.',
      rules: ['Quatrains (4-line stanzas)', 'Rhyme scheme ABCB in each stanza', 'Alternating longer and shorter lines (about 8 and 6 syllables)', 'Tells a story', 'Often has a refrain'],
      ex: 'The fisherman went out at dawn\nwhen clouds were low and grey;\nhis daughter waited on the sand\nand watched him sail away.', tip: 'Tell the story in scenes; let each stanza move the action on.' },
    { id: 'free', n: 'Free Verse', ic: '🕊️',
      about: 'Poetry without a fixed metre or rhyme scheme. Its music comes from line breaks, repetition, imagery and the rhythms of natural speech.',
      rules: ['No required rhyme or metre', 'Line breaks chosen for emphasis', 'Strong images', 'Repetition and sound used deliberately'],
      ex: 'Nobody told the hummingbird\nabout the hurricane.\nShe came back anyway,\nto the one hibiscus left standing,\nand drank.', tip: 'Free does not mean careless: every break must earn its place.' },
    { id: 'ode', n: 'Ode', ic: '🏆',
      about: 'A poem of praise addressed to a person, place, object or idea, often celebrating something ordinary as if it were magnificent.',
      rules: ['Addresses its subject directly ("O..." or "you")', 'Celebrates and elevates the subject', 'Rich imagery', 'Elevated, heartfelt tone'],
      ex: 'O breadfruit, green moon of the backyard,\nyou who fed the hungry after every storm,\nroasted black on the coal pot, sweet inside,\nhumble king of the Sunday plate.', tip: 'Pick something everyday and praise it with absolute seriousness.' },
    { id: 'elegy', n: 'Elegy', ic: '🕯️',
      about: 'A reflective poem of mourning that moves from grief towards consolation or remembrance.',
      rules: ['A loss (a person, place or way of life)', 'Moves from grief through praise to consolation', 'A serious, tender tone', 'Specific memories'],
      ex: 'They pulled down the old market today.\nI still hear Miss Ivy calling "Fresh fish!"\nunder a roof that is only sky now.\nBut every Saturday my mother still whistles\nthe tune she learned there, and so the market stands.', tip: 'Specific details (a voice, a smell) make grief real.' },
    { id: 'acrostic', n: 'Acrostic', ic: '🔤', acrostic: true,
      about: 'A poem in which the first letters of each line spell a word or phrase, read downwards.',
      rules: ['Choose a word or name', 'Each line begins with the next letter', 'Lines should flow as a poem, not a list'],
      ex: 'Steel drums at sunset\nAnd salt on every breeze\nBlue hills wrapped in mist\nA small island, a big heart', tip: 'Avoid one-word lines: make each line a real image.' },
    { id: 'concrete', n: 'Concrete & Shape Poem', ic: '🌴', shape: true,
      about: 'A poem whose visual shape on the page reflects its subject (a palm tree, a wave, a diamond).',
      rules: ['The layout itself creates meaning', 'Line lengths are chosen to build a shape', 'Words and shape work together'],
      ex: '        sun\n      on the\n    green palm\n  leaves waving\nhello to the sea', tip: 'Plan the shape first, then fit your words to the line lengths.' },
    { id: 'spoken', n: 'Spoken Word', ic: '🎤', perform: true,
      about: 'Poetry written to be performed aloud, using rhythm, repetition, wordplay and direct address. It often explores identity, justice and community.',
      rules: ['Written for the ear', 'Repetition and rhythm', 'Direct address to the audience', 'Personal and social themes', 'Plan pauses and emphasis for performance'],
      ex: 'They ask me where I\'m from\nlike the answer fits in a box.\nI\'m from the hill and the harbour,\nfrom my grandmother\'s Creole and my teacher\'s red pen,\nI\'m from both, I\'m from both, I\'m from both.', tip: 'Read it aloud ten times. Mark where you breathe, pause and punch.' },
    { id: 'dub', n: 'Dub Poetry', ic: '🔊', perform: true, culture: true,
      about: 'A Caribbean performance poetry that grew up in Jamaica in the 1970s, performed to (or with) a reggae rhythm. Dub poets often write in nation language (Jamaican Creole) and speak about social justice, history and everyday struggle.',
      rules: ['Built on a reggae or dub beat', 'Nation language or Creole used with pride', 'Social and political themes', 'Strong rhythm and repetition', 'Written to be performed'],
      ex: 'Mi seh one drop, one drop,\nfi di gyal dem a walk to school,\none drop, one drop,\nfi di bwoy dem who learn di rule,\nbut who learn di rule fi we?', tip: 'Tap a one-drop beat (DOOM-tak) and fit your lines to it. Respect the tradition: speak your truth, not a stereotype.' },
    { id: 'kaiso', n: 'Calypso & Kaiso Lyric', ic: '🥁', perform: true, culture: true,
      about: 'Calypso (kaiso) grew from West African song traditions in Trinidad and Tobago and became the Caribbean\'s great form of social commentary. Kaisonians use wit, double meaning, picong (playful teasing) and a singable chorus to comment on politics and daily life; extempo singers improvise verses on the spot.',
      rules: ['Verse and chorus structure', 'Rhyming couplets or quatrains', 'Topical social commentary', 'Humour, wit and picong', 'A catchy, repeated chorus'],
      ex: 'Verse:\nThe Ministry say the road go fix by June,\nbut June come and gone like a passing moon,\nthe pothole so deep it have fish inside,\nwe ketching snapper on the main road ride!\nChorus:\nFix it, fix it, fix the road for we,\nbefore the whole island fall in the sea!', tip: 'Keep the chorus short enough for the crowd to sing back after one hearing.' }
  ];
  const POETS = [
    ['Derek Walcott', 'Saint Lucia', 'poet and playwright; Nobel Prize in Literature, 1992'],
    ['Kamau Brathwaite', 'Barbados', 'poet and historian who championed "nation language"'],
    ['Louise Bennett-Coverley', 'Jamaica', '"Miss Lou", who brought Jamaican Creole to the stage and page'],
    ['Olive Senior', 'Jamaica', 'poet and short-story writer of Caribbean landscapes and lives'],
    ['Lorna Goodison', 'Jamaica', 'poet and memoirist, a former Poet Laureate of Jamaica'],
    ['Mervyn Morris', 'Jamaica', 'poet and critic, Jamaica\'s first Poet Laureate in the modern era'],
    ['Grace Nichols', 'Guyana', 'poet of migration, memory and women\'s voices'],
    ['John Agard', 'Guyana', 'poet, playwright and performer of playful, political verse'],
    ['Lasana M. Sekou', 'St. Martin', 'poet and publisher writing about St. Martin\'s nationhood and culture'],
    ['Jean "Binta" Breeze', 'Jamaica', 'dub and performance poet'],
    ['Linton Kwesi Johnson', 'Jamaica / UK', 'pioneer of dub poetry'],
    ['Mutabaruka', 'Jamaica', 'dub poet and broadcaster'],
    ['Calypso Rose', 'Trinidad & Tobago', 'calypsonian and songwriter'],
    ['The Mighty Sparrow', 'Trinidad & Tobago', 'calypsonian famous for witty social commentary'],
    ['David Rudder', 'Trinidad & Tobago', 'calypsonian and songwriter']
  ];
  /* ===================== HELPERS ===================== */
  const RM = () => { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } };
  const LS = {
    get(k, d) { try { const v = window.localStorage.getItem(k); if (v == null) return d; const o = JSON.parse(v); return o == null ? d : o; } catch (e) { return d; } },
    set(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  };
  const K_PIECES = 'cs-studio-pieces', K_PERS = 'cs-studio-personae', K_BILL = 'cs-studio-playbill', K_DRAFT = 'cs-studio-drafts';
  const MAXP = 40, MAXC = 8000, MAXPER = 6, MAXBILL = 30;
  let A = null;
  let ESC = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const esc = s => ESC(s);
  const uid = () => Date.now().toString(36).slice(-5) + Math.random().toString(36).slice(2, 5);
  const wc = t => (String(t || '').match(/[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9'’-]*/g) || []).length;
  const paras = t => String(t || '').split(/\n\s*\n|\n/).map(x => x.trim()).filter(Boolean);
  const blocks = t => String(t || '').split(/\n\s*\n/).map(x => x.trim()).filter(Boolean);
  const lines = t => String(t || '').split('\n').map(x => x.trim()).filter(Boolean);
  const sentences = t => String(t || '').replace(/\n+/g, ' ').split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => wc(s) > 0);
  const firstLine = t => lines(t)[0] || '';
  const fmtDate = ts => { try { return new Date(ts).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }); } catch (e) { return ''; } };
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const GBY = {}; GENRES.forEach((g, i) => { g.ix = i; GBY[g.id] = g; });
  const FBY = {}; FORMS.forEach((f, i) => { f.ix = i; FBY[f.id] = f; });
  const grpName = id => (GROUPS.find(g => g[0] === id) || ['', 'Other'])[1];
  const TRANS = ['firstly', 'secondly', 'thirdly', 'finally', 'furthermore', 'moreover', 'in addition', 'additionally', 'however', 'nevertheless', 'on the other hand', 'in contrast', 'conversely', 'although', 'whereas', 'similarly', 'likewise', 'therefore', 'consequently', 'as a result', 'thus', 'hence', 'because', 'for example', 'for instance', 'such as', 'in particular', 'in conclusion', 'overall', 'ultimately', 'to conclude', 'in summary', 'meanwhile', 'subsequently', 'then', 'next', 'afterwards', 'later', 'suddenly', 'yet', 'still', 'instead', 'after that'];
  const transitions = t => { const low = String(t || '').toLowerCase(); return TRANS.filter(w => new RegExp('\\b' + w.replace(/ /g, '\\s+') + '\\b').test(low)); };

  /* ---------- syllables & rhyme (simple heuristics) ---------- */
  const SYLX = { every: 2, everything: 3, evening: 2, family: 3, poem: 2, poems: 2, poet: 2, poetry: 3, quiet: 2, people: 2, fire: 1, hour: 1, hours: 1, our: 1, caribbean: 4, being: 2, idea: 3, ideas: 3, area: 3, video: 3, radio: 3, piano: 3, science: 2, lion: 2, diet: 2, real: 1, create: 2, created: 3, island: 2, islands: 2, the: 1, are: 1, were: 1, there: 1, where: 1, here: 1, sure: 1, one: 1, once: 1, done: 1, gone: 1, some: 1, come: 1, love: 1, give: 1, live: 1, have: 1, move: 1, prove: 1, above: 2, alive: 2, steelpan: 2, calypso: 3, soca: 2, anansi: 3, jouvert: 2, sorrel: 2, mango: 2, mangoes: 2, breadfruit: 2, hibiscus: 3, bougainvillea: 5, christophene: 3, dasheen: 2, pelau: 2, roti: 2, guava: 2, maybe: 2, coconut: 3, coconuts: 3, business: 2, different: 3, beautiful: 3, interesting: 3, chocolate: 2, vegetable: 4, naturally: 4, usually: 4, actually: 4, really: 2, liming: 2, flamboyant: 3, hurricane: 3, carnival: 3, curaçao: 3, saba: 2, statia: 3, sargassum: 3, tamarind: 3, bacchanal: 3, fete: 1, galvanise: 3 };
  function syl(word) {
    let w = String(word || '').toLowerCase().replace(/[^a-zà-ÿ']/g, '').replace(/'/g, '');
    if (!w) return 0;
    if (SYLX[w] != null) return SYLX[w];
    if (w.length <= 3) return 1;
    let base = w;
    if (/(ed)$/.test(base) && !/(ted|ded)$/.test(base)) base = base.replace(/ed$/, 'd');
    base = base.replace(/(?:[^laeiouy]es)$/, m => m[0]).replace(/([^aeiouy])e$/, '$1').replace(/^y/, '');
    const m = base.match(/[aeiouyà-ÿ]{1,2}/g);
    let n = m ? m.length : 1;
    if (/[^aeiou]le$/.test(w)) n += 0;
    if (/ia|io|iu|ua|uo|eo/.test(base) && !/tion|sion|cia|gio|qua|quo/.test(base)) n += 1;
    return Math.max(1, n);
  }
  const sylLine = line => (String(line || '').match(/[A-Za-zÀ-ÿ']+/g) || []).reduce((a, w) => a + syl(w), 0);
  const lastWord = line => { const m = String(line || '').match(/[A-Za-zÀ-ÿ']+(?=[^A-Za-zÀ-ÿ']*$)/); return m ? m[0] : ''; };
  function rhymeKey(word) {
    let k = String(word || '').toLowerCase().replace(/[^a-z]/g, '');
    if (!k) return '';
    k = k.replace(/igh/g, 'I');
    k = k.replace(/([^aeiou])y$/, (m, c, off) => (/[aeiou]/.test(k.slice(0, off)) ? c + 'E' : c + 'I'));
    k = k.replace(/(ee|ea)/g, 'E').replace(/^([^aeiou]+)e$/, '$1E').replace(/(ai|ay)/g, 'A').replace(/a([^aeiou]+)e$/, 'A$1').replace(/i([^aeiou]+)e$/, 'I$1').replace(/oa/g, 'O').replace(/o([^aeiou]+)e$/, 'O$1').replace(/u([^aeiou]+)e$/, 'U$1').replace(/oo/g, 'U').replace(/ew$/, 'U').replace(/([^aeiou])e$/, '$1').replace(/s$/, k.length > 3 && !/ss$/.test(k) ? '' : 's');
    const m = k.match(/[aeiouyAEIOU]+[^aeiouyAEIOU]*$/);
    return m ? m[0] : k.slice(-2);
  }
  function alliteration(t) {
    return lines(t).some(l => { const ws = (l.toLowerCase().match(/[a-z]+/g) || []).filter(w => w.length > 2); for (let i = 0; i + 2 < ws.length; i++) { const c = ws[i][0]; if (/[aeiou]/.test(c)) continue; const win = ws.slice(i, i + 5).filter(w => w[0] === c).length; if (win >= 3) return true; } return false; });
  }
  function rhymePairs(t) { const ks = lines(t).map(l => rhymeKey(lastWord(l))).filter(Boolean); let n = 0; for (let i = 0; i < ks.length; i++) for (let j = i + 1; j < Math.min(ks.length, i + 4); j++) if (ks[i] === ks[j] && lastWord(lines(t)[i]).toLowerCase() !== lastWord(lines(t)[j]).toLowerCase()) n++; return n; }
  function repeated(t) {
    const ws = (String(t || '').toLowerCase().match(/[a-z']+/g) || []);
    const STOPW = new Set('the a an and of to in on is it i was for at as that with my we our you be by this'.split(' '));
    const tri = {}, bi = {};
    for (let i = 0; i + 1 < ws.length; i++) { const b = ws[i] + ' ' + ws[i + 1]; if (!(STOPW.has(ws[i]) && STOPW.has(ws[i + 1]))) bi[b] = (bi[b] || 0) + 1; if (i + 2 < ws.length) { const c = b + ' ' + ws[i + 2]; tri[c] = (tri[c] || 0) + 1; } }
    if (Object.values(tri).some(v => v >= 2) || Object.values(bi).some(v => v >= 3)) return true;
    if (/\b\w+, \w+,? (and|or) \w+/i.test(t)) return true;
    const starts = {}; sentences(t).concat(lines(t)).forEach(s => { const w = (s.toLowerCase().match(/^[a-z']+( [a-z']+)?/) || [''])[0]; if (w && !STOPW.has(w)) starts[w] = (starts[w] || 0) + 1; });
    return Object.values(starts).some(v => v >= 3);
  }

  /* ---------- feature detectors (keyword / pattern heuristics) ---------- */
  const MON = 'january|february|march|april|may|june|july|august|september|october|november|december';
  const DATE = new RegExp(`\\b(\\d{1,2}(st|nd|rd|th)?\\s+(${MON})|(${MON})\\s+\\d{1,2}|\\d{1,2}[/.-]\\d{1,2}[/.-]\\d{2,4}|(monday|tuesday|wednesday|thursday|friday|saturday|sunday))\\b`, 'i');
  const PLACE = /\b(Philipsburg|Marigot|Kingston|Port of Spain|Bridgetown|Castries|Georgetown|Basseterre|Roseau|Nassau|Belmopan|Willemstad|Oranjestad|The Valley|Plymouth|St\.? ?Maarten|Sint Maarten|St\.? ?Martin|Saint Martin|Jamaica|Trinidad|Tobago|Barbados|Guyana|Antigua|Barbuda|Dominica|Grenada|St\.? Lucia|Saint Lucia|St\.? Vincent|Bahamas|Belize|Anguilla|Saba|Statia|St\.? Eustatius|Aruba|Cura[cç]ao|Bonaire|Montserrat|Nevis|St\.? Kitts|Haiti|Cuba|Puerto Rico|Suriname|Caribbean|Simpson Bay|Cole Bay|Grand Case|Dutch Quarter|Middle Region|Great Bay|Front Street|Back Street|Exuma|Sandy Ground)\b/i;
  const CARIB = /\b(mango|breadfruit|almond tree|flamboyant|sea ?grape|hibiscus|bougainvillea|steelpan|pan yard|soca|calypso|kaiso|zouk|reggae|creole|rum shop|gallery|veranda|trade ?wind|hurricane|sargassum|coconut|johnny ?cakes?|roti|pat[eé]s?|guavaberry|dominoes|jumbie|carnival|j'?ouvert|island|callaloo|pelau|saltfish|bake|sorrel|cassava|dasheen|plantain|christophene|liming|fete|kite|galvanise|conch|ackee|fungi|doubles)\w*/i;
  const DET = {
    pov: /\b(I|he|she|they|we)\b/,
    hook: t => { const s = sentences(t)[0] || ''; return /[?!"“]/.test(s) || (wc(s) > 0 && wc(s) <= 16); },
    time: /\b(when|then|later|after|before|suddenly|that (morning|night|day|evening)|the next (day|morning)|meanwhile|finally|at last|years? (ago|later)|once|one (day|time|night)|at (dawn|noon|midnight|seven|six)|by the time|every (saturday|sunday|morning|day)|as soon as)\b/i,
    conflict: /\b(but|problem|trouble|afraid|fear|worr\w*|argu\w*|fight\w*|lost|danger\w*|could not|couldn't|refus\w*|secret|until|struggl\w*|never|no one|nobody|against|threat\w*|storm|won't|will not|no fool)\b/i,
    sense: /\b(smell\w*|scent|aroma|taste\w*|sweet|salt\w*|bitter|sour|sound\w*|heard|hear|noise|whisper\w*|hum\w*|roar\w*|loud|quiet|silen\w*|warm|hot|cold|cool|rough|smooth|soft|sharp|bright|glow\w*|shimmer\w*|golden|silver|sticky|damp|slap|knock\w*|creak\w*|steam\w*)\b/i,
    dlg: /["“][^"”\n]{3,}["”]/, quote: /["“][^"”\n]{3,}["”]/,
    twist: /\b(suddenly|but then|until|turned out|realis\w*|realiz\w*|instead|without warning|at that moment|in that moment|all along|that was when|then I (heard|saw)|just as|but \w+ was no|then)\b/i,
    end: t => { const P = paras(t); const last = P[P.length - 1] || ''; return P.length >= 2 && /\b(learn\w*|realis\w*|realiz\w*|never|always|from that day|since then|now|finally|at last|remember\w*|understood|still|forever|again|home|to this day|nothing|anything|yes)\b/i.test(last); },
    name: t => (String(t).match(/[a-z,;:]\s+([A-Z][a-z]{2,})/g) || []).length >= 1,
    setting: t => PLACE.test(t) || /\b(morning|night|evening|noon|dawn|dusk|afternoon|street|road|beach|market|school|village|town|house|yard|kitchen|church|harbour|hill|bay|corridor|stall|sea)\b/i.test(t),
    short: t => wc(t) <= 320,
    animal: /\b(anansi|spider|tiger|monkey|goat|dog|crab|mongoose|turtle|parrot|donkey|bird|fish|frog|cockerel|rooster|hen|cat|rabbit|snake|lizard|iguana|pelican|agouti|manicou|cow|pig|rat|mouse|bredda|brer|compere|tortoise)\b/i,
    aud: /\b(you|listen|ladies and gentlemen|fellow|good (morning|afternoon|evening)|honourable|madam chair|mister chair|chairperson|children|friends|crick crack|once upon|parents|teachers)\b/i,
    rep: repeated,
    moral: /\b(moral|lesson|and that is why|that is why|that's why|from that day|so remember|to this day|learn(ed|t)? that)\b/i,
    fig: /\b(like (a|an|the|some|something|someone|coins|knuckles)|as \w+ as|a sea of|a river of|a blanket of|a wall of|is a \w+ of|was a \w+ of|calm as)\b/i,
    vivid: t => { const ws = (String(t).toLowerCase().match(/[a-z']+/g) || []); if (ws.length < 30) return false; const long = ws.filter(w => w.length >= 7).length / ws.length; const uniq = new Set(ws).size / ws.length; return long >= 0.1 && uniq >= 0.5; },
    space: /\b(above|below|behind|beside|beyond|across|in front of|in the distance|nearby|far|next to|around|under|over|inside|outside|left|right|overhead|beneath|downhill|uphill|horizon)\b/i,
    mood: /\b(calm\w*|peace\w*|tense|eerie|still|lonely|joy\w*|cheer\w*|gloom\w*|dark|bright|warm|heavy|lazy|lively|quiet|restless|sleepy|alive|haunt\w*|cosy|tranquil|chaotic|busy|loud|impatient|holds? its breath)\b/i,
    paras: t => paras(t).length >= 3, paras4: t => paras(t).length >= 4,
    phys: /\b(eyes|hands|hair|voice|face|smile|walk\w*|shoulders|skin|laugh\w*|fingers|forehead|beard|glasses|shirt|dress|khaki|scar\w*)\b/i,
    carib: t => PLACE.test(t) || CARIB.test(t), place: PLACE,
    thesis: t => { const p = paras(t)[0] || ''; return wc(p) >= 15 && /\b(this essay|will (explain|discuss|examine|argue|show|explore)|should|must|because|therefore|I (believe|argue|contend)|it is (clear|evident|essential|important)|the (main|key) (reasons?|causes?|effects?)|both|differ\w*|similar\w*|one of the most|means|is often|why|yet|cannot)\b/i.test(p); },
    evid: /\b(for example|for instance|such as|according to|research|survey|study|studies|statistic\w*|data|per ?cent|evidence|report(ed|s)?|in \d{4}|since \d{4}|scientists|experts?|\d{2,})\b|%/i,
    trans: t => transitions(t).length >= 3,
    objective: t => !/\b(I think|I believe|in my opinion|I feel|personally|I'm|imo)\b/i.test(t),
    concl: t => { const P = paras(t); return P.length >= 2 && /\b(in conclusion|to conclude|overall|ultimately|in summary|therefore|thus|clearly|in short|finally|it is clear|the time|let us|we must|so|today|the question is|recommend\w*|that is why)\b/i.test(P[P.length - 1]); },
    purp: /\b(purpose of this|this (report|proposal|memo|letter|email|guide|release) (is|aims|seeks|will)|I am writing to|I write to|we are writing|aims? to|in order to|will show you|how to|to request|to inform|terms of reference|you will learn|investigated|needs? (\w+ )?volunteers|proposal:|will host)\b/i,
    bullets: t => (String(t).match(/^\s*([-•*–]|\d+(\.\d+)*[.)]?|[a-z][.)])\s+\S/gm) || []).length >= 2,
    seq: /\b(first(ly)?|second(ly)?|third(ly)?|next|then|after that|afterwards|finally|lastly|step \d|to begin|my (first|second|third|final) point|begin(ning)? in|my third|and my third)\b|^\s*\d+[.)]/im,
    imp: /(^|[.!?:]\s+|\n\s*(\d+[.)]\s*)?)(add|place|mix|cut|pour|take|open|click|stir|wash|choose|remember|make sure|check|select|fill|put|use|keep|turn|fold|press|write|go|bring|ask|start|stop|store|rest|fry|bake|boil|shape|knead|rub|tie|pack|plan|find|read|tap|list|cover|move|do not|don't)\b/i,
    warn: /\b(tip|note|warning|careful|caution|make sure|be sure|avoid|do not|don't|never|remember)\b/i,
    num: /\d/,
    similar: /\b(similarly|likewise|both|in the same way|just as|equally|alike|share|same)\b/i,
    contrast: /\b(whereas|however|unlike|in contrast|on the other hand|while|by contrast|conversely|differ\w*|but)\b/i,
    cause: /\b(because|as a result|therefore|consequently|leads? to|led to|caus\w*|due to|so that|result(s|ed)? in|owing to|since|thus|hence|link\w*)\b/i,
    longterm: /\b(long[- ]term|short[- ]term|immediate|in the future|over time|eventually|for years|for decades|generations?)\b/i,
    defn: /\b(is defined as|refers to|means|can be (described|defined) as|is a (kind|type|form) of|definition|at its simplest|is the (act|state|practice)|translated as)\b/i,
    ety: /\b(comes from|derived|derives|origin\w*|latin|greek|french|african|spanish|dutch|portuguese|etymology|first used|trace\w*)\b/i,
    negdef: /\b(is not|does not mean|isn't|rather than|not simply|not just|not merely|not the same as|is no)\b/i,
    emotion: /\b(feel\w*|felt|fear\w*|afraid|scared|happy|joy\w*|sad\w*|angry|anger|proud|pride|love\w*|hope\w*|lonely|nervous|anxious|excited|ashamed|grateful|heart\w*|tears|cry|cried|smile\w*|laugh\w*|worried|calm|shook|hurt|miss\w*|honestly|imagine|breathe)\b/i,
    ethos: /\b(as a (student|young|teenager|member|resident|citizen|caribbean)|as someone|experts?|doctors?|scientists?|teachers?|research|according to|ministry|organi[sz]ation|years of experience|studies|our grandparents)\b/i,
    q: /\?/,
    cta: /\b(must|should|let us|let's|I urge|we urge|we need to|join|act now|call on|sign|vote|support|ban|bring|choose|start|stop|demand|take action|do your part|I ask|please|I look forward|would it be possible)\b/i,
    counter: /\b(some (people )?(argue|say|believe|claim|may|might|will)|critics|opponents?|on the other hand|admittedly|while it is true|others (may|might|argue|believe)|it (may|might|could) be argued|of course|granted|yes,|will tell you|this concern)\b/i,
    rebut: /\b(however|nevertheless|yet|this (ignores|overlooks|fails)|but this|although|on the contrary|in fact|nonetheless|overlooks)\b/i,
    formal: t => !/\b(don't|can't|won't|didn't|isn't|doesn't|it's|I'm|we're|they're|wasn't|aren't|gonna|wanna|kinda|u|ur|lol|pls)\b/i.test(t),
    motion: /\b(motion|this house|we (strongly )?(propose|oppose)|I (stand|rise) (to|in))\b/i,
    rebutopp: /\b(my opponents?|the opposition|the proposition|they (claim|say|argue|will tell)|the previous speaker|our opponents|worthy opponents)\b/i,
    date: t => DATE.test(t), year: /\b(1[5-9]\d\d|20\d\d)\b/,
    editor: /\b(editor)\b/i,
    sal: /^\s*(dear|hi|hello|hey|good (morning|afternoon|evening)|greetings|to whom)\b/im,
    sign: /\b(yours (sincerely|faithfully|truly)|regards|best wishes|kind regards|sincerely|love( you)?( plenty)?|cheers|take care|warmly|respectfully|your (friend|grand(daughter|son)|cousin))\b/i,
    inclusive: t => (String(t).match(/\b(we|us|our)\b/gi) || []).length >= 3,
    fp: /\b(I|me|my|mine|we|our)\b/,
    tp: t => (String(t).match(/\b(he|she|his|her|they|their|him)\b/gi) || []).length >= 2,
    thanks: /\b(thank you|thanks|god bless|bless up|good night|goodnight)\b/i,
    refl: /\b(I (learned|learnt|realised|realized|understood|understand|now see|now know|wonder|discovered|think)|looking back|in hindsight|taught me|I have grown|it made me|I began to|showed me|lesson|I used to think|in that moment|I notice|now that I)\b/i,
    future: /\b(future|from now on|next time|will|going forward|one day|someday|tomorrow|wherever)\b/i,
    humour: /(!|\bhaha|laugh\w*|joke\w*|funny|grin\w*|teas\w*|giggl\w*)/i,
    informal: t => /\b\w+['’](s|t|re|ll|ve|m|d)\b/i.test(t) || /!/.test(t),
    life: /\b(born|grew up|childhood|died|passed away|years? old|age of|at (five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|\d+)|early life|raised|career|retired|graduat\w*|opened|founded)\b/i,
    family: /\b(mother|father|mom|mum|mommy|mammy|dad|daddy|grand(ma|pa|mother|father|daughter|son|children)?|gran|aunt|auntie|uncle|sister|brother|cousin|family|ancestors?|daughter|son|survived by|parents?|people came from)\b/i,
    lookback: /\b(back then|I remember|years later|now I|looking back|at the time|I did not know|I didn't know|I still|those days|that summer|when I was|the summer I was)\b/i,
    attr: /\b(said|says|explained|told|according to|added|stated|laughs|laughed|recalls|recalled|noted|wrote|reported|source\w*)\b/i,
    legacy: /\b(legacy|remembered|influence\w*|inspired|today|continues|carries (his|her|their) name|honou?red|named after|reminder)\b/i,
    tribute: /\b(remember\w*|will be missed|survived by|legacy|life of|rest in peace|loved|devoted|served|taught|gave|contribut\w*|community|generations)\b/i,
    farewell: /\b(rest in peace|rest well|farewell|walk good|we will miss|will be missed|may (her|his|their) soul|goodbye|sleep well|until we meet)\b/i,
    headline: t => { const L = lines(t); const l = L[0] || ''; return L.length > 1 && wc(l) >= 2 && wc(l) <= 14 && !/[.,;]$/.test(l); },
    when: t => DATE.test(t) || /\b(yesterday|today|tonight|last (week|night|month|year|weekend)|this (morning|week|weekend)|on (monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b/i.test(t),
    shortparas: t => { const P = paras(t); return P.length >= 3 && P.every(p => wc(p) <= 80); },
    head: t => lines(t).filter(l => wc(l) <= 8 && !/[.,;!?]$/.test(l) && /^[A-Z0-9]/.test(l)).length >= 2,
    opinion: /\b(I (think|believe|feel|love|loved|hate|recommend|wish)|in my (view|opinion)|for me|honestly|personally|must-see|worth\w*|disappoint\w*|brilliant|best|worst|recommended|stumble\w*|thrilling|seriously)\b/i,
    evalw: /\b(plot|characters?|acting|performances?|lyrics|beat|production|pacing|dialogue|soundtrack|vocals|cinematography|chorus|verse|melody|ending|writing|style|setting|scenes?|chapters?|sequences?|final act)\b/i,
    rating: /(\b\d(\.\d)?\s*\/\s*(5|10)\b|\b\d+ stars?\b|\bout of (five|ten|5|10)\b|\brecommend\w*|\brating\b|must-see|skip it|\bworth\b|⭐)/i,
    blog: /(#\w+|\bcomments?\b|\bshare\b|\bsubscribe\b|\bfollow\b|let me know|drop (your|a)|tell me|what do you think|send (us|me) your|leave a)/i,
    hyper: /\b(every single|millions?|billions?|always|never|entire|forever|absolutely|thousands?|\d{1,3},\d{3}|world'?s|ever|historic)\b/i,
    irony: /\b(of course|naturally|obviously|brilliant|genius|clearly|surely|what could possibly|bold plan|historic|proudly|generous\w*|wonderful|appreciation)\b/i,
    recipient: /\b(the (principal|manager|director|minister|editor|chair(man|person)?|president|secretary|registrar|human resources)|Mr\.?|Mrs\.?|Ms\.?|Dr\.?|Sir or Madam)\b/i,
    subj: /^\s*(subject|re)\s*:/im,
    notext: t => !/\b(u|ur|pls|plz|thx|lol|tbh|idk|btw|gonna|wanna)\b/i.test(t),
    memohead: /\bmemo(randum)?\b/i,
    memo: t => ['to', 'from', 'date', 'subject|re'].filter(k => new RegExp('^\\s*(' + k + ')\\s*:', 'im').test(t)).length >= 3,
    deadline: new RegExp(`\\b(by|before|no later than|deadline|due)\\b[^.\\n]{0,40}\\b(\\d|monday|tuesday|wednesday|thursday|friday|saturday|sunday|${MON}|tomorrow|end of)`, 'i'),
    method: /\b(survey\w*|questionnaire|interview\w*|observ\w*|data (was|were)|collected|method|respondents|sample|focus group)\b/i,
    stat: /(\b\d+(\.\d+)?\s?(%|per ?cent)|\b\d+ (out of|of the) \d+|\b(one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)[- ]?\w* per ?cent|\bmajority\b|\bhalf of\b|\bmost respondents\b)/i,
    rec: /\b(recommend\w*|should be|we propose|suggest\w*)\b/i,
    objectives: /\b(objectives?|aims?|goals?|will (increase|reduce|improve|provide|raise|build))\b/i,
    timeline: new RegExp(`\\b(weeks?|months?|terms?|phase|timeline|schedule|by (${MON})|beginning in|starting in|twice a week|in (${MON}))\\b`, 'i'),
    budget: /(\$|€|£|\bbudget\b|\bcosts?\b|\bfunding\b|\bprice\b|\bNAf\b|\bANG\b|\bXCD\b)/i,
    benefit: /\b(benefit\w*|outcomes?|impact|results?|evaluat\w*|measure\w*|success\w*|improve\w*|compared)\b/i,
    release: /\b(for immediate release|embargo\w*)\b/i,
    contact: /(\bcontact\b|\btel\b|\bphone\b|\be-?mail\b|@|\.com|\.edu|for more information|\bcall\b)/i,
    ends: /(###|-\s?ends\s?-)/i,
    stage: /[(\[][^)\]\n]{3,}[)\]]/,
    scenehead: /\b(scene|INT\.|EXT\.|setting|lights up|act \d|act one)\b/i,
    speaker: t => (String(t).match(/^\s*[A-Z][A-Za-z .()0-9]{1,24}:/gm) || []).length >= 2,
    seg: /\b(segment|programme|program|episode|intro|outro|duration|\d{1,2}:\d{2}|welcome (back )?to)\b/i,
    sfx: /\b(SFX|SOUND|MUSIC|FX|FADE|JINGLE|AMBIENCE|BED|BEAT|INTRO MUSIC)\b/,
    outro: /\b(next (week|time|episode)|see you|until next|catch you|that's (all|it) for|thanks for listening|by the end of this episode)\b/i,
    lines: t => lines(t).length >= 4,
    sound: t => alliteration(t) || rhymePairs(t) >= 1,
    stanzas: t => /\n\s*\n/.test(String(t).trim()) || lines(t).length >= 8
  };
  function detect(key, t) {
    const d = DET[key]; if (!d) return null;
    try { return typeof d === 'function' ? !!d(t) : d.test(t); } catch (e) { return null; }
  }
  /* fallback mark-up if the Word Desk tool is not loaded */
  function miniCheck(t, formal) {
    const out = [], R = [[/\balot\b/gi, 'spelling', 'Write "a lot" as two words.', 'a lot'], [/\b(could|should|would) of\b/gi, 'grammar', 'Write "could have", not "could of".', null], [/(^|[.!?]\s+)i\b/g, 'capitalisation', 'The pronoun "I" is always a capital letter.', null], [/\b(recieve|definately|seperate|occured|untill|wich|becuase|beleive|goverment|enviroment|arguement)\b/gi, 'spelling', 'Check the spelling of this word.', null]];
    if (formal) R.push([/\b(don't|can't|won't|didn't|isn't|doesn't|it's|I'm|gonna|wanna)\b/gi, 'register', 'Use the full form in formal writing.', null]);
    R.forEach(([re, kind, msg, fix]) => { let m; re.lastIndex = 0; while ((m = re.exec(t))) { out.push({ start: m.index, end: m.index + m[0].length, kind, msg, fix, rule: kind }); if (!re.global) break; } });
    return out.sort((a, b) => a.start - b.start);
  }

  /* ===================== STATE & STORAGE ===================== */
  function SS(api) {
    const S = api.S; if (!S.studio || typeof S.studio !== 'object') S.studio = {};
    const t = S.studio; if (typeof t.g !== 'string') t.g = ''; if (typeof t.f !== 'string') t.f = ''; t.n = t.n | 0; t.pf = t.pf | 0; if (!Array.isArray(t.p)) t.p = [];
    return t;
  }
  const inCsv = (csv, x) => String(csv || '').split(',').includes(String(x));
  const addCsv = (csv, x) => inCsv(csv, x) ? csv : (csv ? csv + ',' + x : String(x));
  const submitted = (api, G) => inCsv(SS(api).g, G.ix);
  const loadPieces = () => { const a = LS.get(K_PIECES, []); return Array.isArray(a) ? a.filter(p => p && p.id && typeof p.x === 'string') : []; };
  const loadPers = () => { const a = LS.get(K_PERS, []); return Array.isArray(a) ? a.filter(p => p && p.id).slice(0, MAXPER) : []; };
  const loadBill = () => { const a = LS.get(K_BILL, []); return Array.isArray(a) ? a.filter(Boolean) : []; };
  let DRAFTS = null;
  const drafts = () => { if (!DRAFTS) { const d = LS.get(K_DRAFT, {}); DRAFTS = d && typeof d === 'object' && !Array.isArray(d) ? d : {}; } return DRAFTS; };
  let dTimer = null;
  function saveDraftSoon() { clearTimeout(dTimer); dTimer = setTimeout(saveDraftNow, 350); }
  function saveDraftNow() {
    if (!DK || !D) return; const all = drafts();
    all[DK] = { x: String(D.x || '').slice(0, MAXC), ck: D.ck, pr: D.pr, own: String(D.own || '').slice(0, 400), pl: D.pl, pe: D.pe, pid: D.pid, ti: String(D.ti || '').slice(0, 80), word: D.word, sch: D.sch, r1: D.r1, r2: D.r2, shape: D.shape };
    const keys = Object.keys(all); if (keys.length > 70) delete all[keys[0]];
    if (!LS.set(K_DRAFT, all)) { delete all[DK]; LS.set(K_DRAFT, all); }
  }
  function savePiece(api, kind, id, label) {
    const text = String(D.x || '').trim(); if (!text) { api.toast('Write something before saving.'); return null; }
    const pieces = loadPieces();
    let p = D.pid && pieces.find(x => x.id === D.pid);
    if (!p) {
      if (pieces.length >= MAXP) { api.toast(`Your portfolio is full (${MAXP} pieces). Delete an old piece first.`); return null; }
      p = { id: uid(), kind, g: id }; pieces.unshift(p);
    }
    p.x = text.slice(0, MAXC); p.t = (String(D.ti || '').trim() || label + ' · ' + fmtDate(Date.now())).slice(0, 80); p.ts = Date.now(); p.pe = D.pe || ''; p.pr = currentPrompt();
    if (!LS.set(K_PIECES, pieces)) { api.toast('Could not save: browser storage is full or blocked. Download your piece instead.'); return null; }
    D.pid = p.id; saveDraftNow(); SS(api).n = pieces.length; api.save();
    return p;
  }

  /* ===================== DESK STATE ===================== */
  let DK = null, D = null, AI_OFF = false;
  function desk(key) {
    if (DK !== key) {
      if (DK && D) saveDraftNow();
      DK = key; const d = drafts()[key] || {};
      D = { x: d.x || '', ck: d.ck || {}, pr: d.pr != null ? d.pr : 0, own: d.own || '', pl: d.pl || {}, pe: d.pe || '', pid: d.pid || '', ti: d.ti || '', word: d.word || 'ISLAND', sch: d.sch || 'shakespearean', r1: d.r1 || '', r2: d.r2 || '', shape: d.shape || 'diamond', fb: null, ai: { st: 'idle' }, warn: '' };
      if (D.pid && !loadPieces().some(p => p.id === D.pid)) D.pid = '';
    }
    return D;
  }
  let CUR_G = null;
  const currentPrompt = () => { if (!CUR_G) return ''; return D.pr === -1 ? String(D.own || '') : (CUR_G.pr[D.pr] || ''); };
  /* ===================== AVATAR ART (layered inline SVG) ===================== */
  const SKIN = [['#3B2219', 'Deep ebony'], ['#4B2C20', 'Ebony'], ['#5E3A26', 'Deep brown'], ['#70452D', 'Rich brown'], ['#8A5636', 'Chestnut'], ['#A0673F', 'Caramel'], ['#B57A4E', 'Honey'], ['#C68C5E', 'Golden tan'], ['#D6A27A', 'Light tan'], ['#E5B994', 'Sand'], ['#F0CDAE', 'Light'], ['#F8E0CB', 'Fair']];
  const HAIRC = [['#16100D', 'Black'], ['#2E1D14', 'Dark brown'], ['#5A3824', 'Brown'], ['#8B4A2B', 'Auburn'], ['#C9A15A', 'Golden blonde'], ['#8E8E8E', 'Grey'], ['#E6E2DA', 'Silver white'], ['#7A1F3D', 'Burgundy'], ['#1F4FA8', 'Electric blue'], ['#C2457F', 'Pink']];
  const OUTC = [['#0E1F55', 'Navy'], ['#F5C542', 'Gold'], ['#C8102E', 'Red'], ['#00843D', 'Green'], ['#FF7A00', 'Orange'], ['#7B2CBF', 'Purple'], ['#00A6A6', 'Teal'], ['#F2F2F2', 'White'], ['#1A1A1A', 'Black'], ['#E94F86', 'Pink'], ['#3A86FF', 'Sky blue'], ['#8C5A2B', 'Brown']];
  const OPT = {
    face: [['oval', 'Oval'], ['round', 'Round'], ['square', 'Square'], ['heart', 'Heart'], ['long', 'Long']],
    hair: [['afro', 'Afro'], ['locs', 'Locs'], ['braids', 'Braids'], ['cornrows', 'Cornrows'], ['twists', 'Twists'], ['curls', 'Curls'], ['straight', 'Straight'], ['bun', 'Bun'], ['fade', 'Fade'], ['bald', 'Bald'], ['headwrap', 'Headwrap'], ['hijab', 'Hijab']],
    eyes: [['round', 'Round'], ['almond', 'Almond'], ['smile', 'Smiling'], ['wide', 'Wide'], ['sleepy', 'Sleepy']],
    brows: [['soft', 'Soft'], ['arched', 'Arched'], ['straight', 'Straight'], ['bold', 'Bold']],
    mouth: [['smile', 'Smile'], ['grin', 'Big grin'], ['calm', 'Calm']],
    fh: [['none', 'None'], ['stubble', 'Stubble'], ['moustache', 'Moustache'], ['goatee', 'Goatee'], ['beard', 'Full beard']],
    gl: [['none', 'None'], ['round', 'Round'], ['square', 'Square'], ['cateye', 'Cat-eye'], ['shades', 'Shades']],
    ear: [['none', 'None'], ['studs', 'Studs'], ['hoops', 'Hoops'], ['drops', 'Drops']],
    out: [['tee', 'T-shirt'], ['dashiki', 'Dashiki-print'], ['buttonup', 'Button-up'], ['hoodie', 'Hoodie'], ['carnival', 'Carnival-inspired'], ['uniform', 'School uniform']],
    bg: [['spot', 'Spotlight'], ['sunset', 'Sunset'], ['sea', 'Sea'], ['studio', 'Studio'], ['confetti', 'Carnival'], ['pan', 'Pan yard']]
  };
  const AV0 = { face: 'oval', skin: 4, hair: 'afro', hc: 0, eyes: 'round', brows: 'soft', mouth: 'smile', fh: 'none', gl: 'none', ear: 'none', out: 'tee', c1: 0, c2: 1, bg: 'spot' };
  function normAv(a) {
    const o = Object.assign({}, AV0, a || {});
    Object.keys(OPT).forEach(k => { if (!OPT[k].some(x => x[0] === o[k])) o[k] = AV0[k]; });
    o.skin = clamp(o.skin | 0, 0, SKIN.length - 1); o.hc = clamp(o.hc | 0, 0, HAIRC.length - 1); o.c1 = clamp(o.c1 | 0, 0, OUTC.length - 1); o.c2 = clamp(o.c2 | 0, 0, OUTC.length - 1);
    return o;
  }
  function randAv() {
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const a = {}; Object.keys(OPT).forEach(k => a[k] = pick(OPT[k])[0]);
    a.skin = Math.floor(Math.random() * SKIN.length); a.hc = Math.random() < 0.6 ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * HAIRC.length);
    a.c1 = Math.floor(Math.random() * OUTC.length); do { a.c2 = Math.floor(Math.random() * OUTC.length); } while (a.c2 === a.c1);
    if (Math.random() < 0.6) a.fh = 'none'; if (Math.random() < 0.5) a.gl = 'none';
    return normAv(a);
  }
  function shade(hex, f) {
    const n = parseInt(String(hex).slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const t = f < 0 ? 0 : 255, p = Math.abs(f);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  let AVN = 0;
  const FACE = {
    oval: ['<ellipse cx="100" cy="96" rx="40" ry="48"/>', 60], round: ['<ellipse cx="100" cy="98" rx="44" ry="45"/>', 56],
    square: ['<path d="M60 72 Q60 50 82 48 L118 48 Q140 50 140 72 L140 112 Q139 138 100 144 Q61 138 60 112 Z"/>', 60],
    heart: ['<path d="M58 84 Q57 48 100 47 Q143 48 142 84 Q140 118 100 145 Q60 118 58 84 Z"/>', 58], long: ['<ellipse cx="100" cy="94" rx="37" ry="52"/>', 63]
  };
  function avBg(a, u) {
    const c1 = OUTC[a.c1][0];
    switch (a.bg) {
      case 'sunset': return `<defs><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A0F3E"/><stop offset=".55" stop-color="#C2457F"/><stop offset="1" stop-color="#FF9F6B"/></linearGradient></defs><rect width="200" height="200" fill="url(#${u}g)"/><circle cx="150" cy="150" r="34" fill="#FFD766" opacity=".85"/><path d="M0 172 Q50 160 100 172 T200 172 V200 H0Z" fill="#3A1240" opacity=".7"/>`;
      case 'sea': return `<defs><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FD3FF"/><stop offset=".6" stop-color="#BDEBFF"/><stop offset=".6" stop-color="#0094C6"/><stop offset="1" stop-color="#005A8C"/></linearGradient></defs><rect width="200" height="200" fill="url(#${u}g)"/><path d="M0 132 Q25 126 50 132 T100 132 T150 132 T200 132" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><circle cx="36" cy="38" r="14" fill="#FFE38A"/>`;
      case 'studio': return `<rect width="200" height="200" fill="#0E1F55"/><circle cx="100" cy="100" r="92" fill="none" stroke="#FFD766" stroke-opacity=".18" stroke-width="10"/><circle cx="100" cy="100" r="70" fill="none" stroke="#FFD766" stroke-opacity=".12" stroke-width="8"/>`;
      case 'confetti': { let s = `<rect width="200" height="200" fill="#4A0B4F"/>`; const cols = ['#FFD766', '#E94F86', '#00A6A6', '#FF7A00', '#7FD3FF']; for (let i = 0; i < 26; i++) { const x = (i * 53) % 200, y = (i * 37) % 200; s += `<rect x="${x}" y="${y}" width="7" height="3.5" rx="1" fill="${cols[i % 5]}" transform="rotate(${(i * 47) % 180} ${x} ${y})" opacity=".85"/>`; } return s; }
      case 'pan': return `<rect width="200" height="200" fill="#1A1206"/><g fill="none" stroke="#FFD766" stroke-opacity=".35"><ellipse cx="40" cy="44" rx="34" ry="30" stroke-width="5"/><ellipse cx="40" cy="44" rx="18" ry="15" stroke-width="3"/><ellipse cx="168" cy="40" rx="30" ry="27" stroke-width="5"/><ellipse cx="168" cy="40" rx="14" ry="12" stroke-width="3"/></g><circle cx="100" cy="96" r="80" fill="${shade(c1, .1)}" opacity=".18"/>`;
      default: return `<defs><radialGradient id="${u}g" cx=".5" cy=".38" r=".7"><stop offset="0" stop-color="#FFF2C2"/><stop offset=".45" stop-color="#F5C542"/><stop offset="1" stop-color="#0B1A46"/></radialGradient></defs><rect width="200" height="200" fill="url(#${u}g)"/>`;
    }
  }
  function avatarSVG(raw, o) {
    o = o || {}; const a = normAv(raw), u = 'stv' + (++AVN);
    const sk = SKIN[a.skin][0], skD = shade(sk, -0.2), skDD = shade(sk, -0.42), hc = HAIRC[a.hc][0], hcD = shade(hc, a.hc >= 5 && a.hc <= 6 ? -0.35 : -0.3), hcL = shade(hc, 0.18);
    const c1 = OUTC[a.c1][0], c2 = OUTC[a.c2][0], c1D = shade(c1, -0.28), c1L = shade(c1, 0.3);
    const [facePath, earX] = FACE[a.face]; const eR = 200 - earX, hijab = a.hair === 'hijab', wrap = a.hair === 'headwrap';
    const browCol = (a.hair === 'bald' || hijab || wrap) ? '#2A1A12' : (a.hc >= 4 && a.hc <= 6 ? shade(hc, -0.45) : hcD);
    let s = `<svg class="st-av ${o.cls || ''}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" ${o.label ? `role="img" aria-label="${esc(o.label)}"` : 'aria-hidden="true" focusable="false"'}>`;
    if (o.bg !== false) s += `<clipPath id="${u}c"><rect width="200" height="200" rx="${o.square ? 18 : 100}"/></clipPath><g clip-path="url(#${u}c)">` + avBg(a, u);
    else s += '<g>';
    s += `<g class="st-sway">`;
    /* back hair */
    if (a.hair === 'afro') s += `<circle cx="100" cy="84" r="64" fill="${hc}"/><g fill="${hcD}" opacity=".35"><circle cx="62" cy="62" r="6"/><circle cx="140" cy="70" r="5"/><circle cx="100" cy="30" r="6"/><circle cx="48" cy="100" r="5"/><circle cx="152" cy="104" r="6"/></g>`;
    if (a.hair === 'curls') { s += `<g fill="${hc}">`; for (let i = 0; i <= 12; i++) { const ang = Math.PI * (0.95 + i * 0.09); s += `<circle cx="${(100 + Math.cos(ang) * 50).toFixed(1)}" cy="${(92 + Math.sin(ang) * 52).toFixed(1)}" r="15"/>`; } s += `<circle cx="56" cy="122" r="13"/><circle cx="144" cy="122" r="13"/></g>`; }
    if (a.hair === 'straight') s += `<path d="M54 92 Q50 38 100 34 Q150 38 146 92 L150 168 Q132 176 122 160 L120 112 Q100 102 80 112 L78 160 Q68 176 50 168 Z" fill="${hc}"/>`;
    if (a.hair === 'bun') s += `<circle cx="100" cy="30" r="19" fill="${hc}"/><path d="M84 40 Q100 46 116 40" stroke="${c2}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    if (wrap) s += `<path d="M64 40 Q100 -4 136 40 Q120 30 100 32 Q80 30 64 40Z" fill="${shade(c2, -0.15)}"/>`;
    /* body + outfit */
    s += `<path d="M86 124 L86 156 Q100 164 114 156 L114 124 Z" fill="${skD}"/>`;
    s += `<path d="M24 200 C26 168 54 151 86 149 L114 149 C146 151 174 168 176 200 Z" fill="${c1}"/>`;
    s += `<path d="M24 200 C26 176 40 162 58 156 C48 170 44 186 46 200Z" fill="${c1D}" opacity=".55"/><path d="M176 200 C174 176 160 162 142 156 C152 170 156 186 154 200Z" fill="${c1D}" opacity=".55"/>`;
    if (a.out === 'tee') s += `<path d="M86 149 Q100 166 114 149 Z" fill="${skD}"/><path d="M85 149 Q100 168 115 149" fill="none" stroke="${c1D}" stroke-width="3"/>`;
    if (a.out === 'dashiki') { s += `<path d="M86 149 L100 172 L114 149 Z" fill="${skD}"/><path d="M80 149 L100 180 L120 149" fill="none" stroke="${c2}" stroke-width="8" stroke-linejoin="round"/><path d="M80 149 L100 180 L120 149" fill="none" stroke="${c1D}" stroke-width="2" stroke-dasharray="3 4"/>`; for (let i = 0; i < 6; i++) s += `<path d="M${52 + i * 19} 192 l7 -9 l7 9z" fill="${c2}"/>`; s += `<path d="M44 196 H156" stroke="${c2}" stroke-width="2"/>`; }
    if (a.out === 'buttonup') s += `<path d="M86 149 L100 170 L114 149Z" fill="${skD}"/><path d="M84 148 L95 170 L100 153Z" fill="${c1L}"/><path d="M116 148 L105 170 L100 153Z" fill="${c1L}"/><path d="M100 168 V200" stroke="${c1D}" stroke-width="2"/><g fill="${c2}"><circle cx="100" cy="176" r="2.4"/><circle cx="100" cy="188" r="2.4"/></g>`;
    if (a.out === 'hoodie') s += `<path d="M66 158 Q100 136 134 158 Q120 176 100 176 Q80 176 66 158Z" fill="${c1D}"/><path d="M84 152 Q100 166 116 152 Z" fill="${skD}"/><path d="M92 166 L90 190 M108 166 L110 190" stroke="${c2}" stroke-width="2.5" stroke-linecap="round"/><path d="M70 196 Q100 184 130 196" fill="none" stroke="${c1D}" stroke-width="3"/>`;
    if (a.out === 'carnival') { s += `<path d="M86 149 L100 168 L114 149Z" fill="${skD}"/><g opacity=".95">`; [[34, 168, -40], [44, 160, -20], [166, 168, 40], [156, 160, 20]].forEach(([x, y, r], i) => { s += `<ellipse cx="${x}" cy="${y}" rx="7" ry="22" fill="${i % 2 ? c2 : '#FFD766'}" transform="rotate(${r} ${x} ${y})"/>`; }); s += `</g><path d="M84 150 Q100 176 116 150" fill="none" stroke="#FFD766" stroke-width="5"/>`; for (let i = 0; i < 18; i++) s += `<circle cx="${50 + (i * 37) % 100}" cy="${170 + (i * 13) % 28}" r="2.2" fill="${i % 3 ? '#FFE9A8' : c2}"/>`; }
    if (a.out === 'uniform') s += `<path d="M86 149 L100 166 L114 149Z" fill="${skD}"/><path d="M84 148 L96 168 L100 154Z" fill="${c1L}"/><path d="M116 148 L104 168 L100 154Z" fill="${c1L}"/><path d="M96 154 L104 154 L106 162 L102 194 L100 197 L98 194 L94 162 Z" fill="${c2}"/><path d="M95 168 L105 164 M95 178 L105 174 M96 188 L104 184" stroke="${shade(c2, 0.4)}" stroke-width="2"/><path d="M126 168 h14 v8 q-7 8 -14 0z" fill="#FFD766" stroke="${c1D}" stroke-width="1"/>`;
    /* long hair over shoulders */
    if (a.hair === 'locs') { s += `<g fill="${hc}" stroke="${hcD}" stroke-width="1.2">`; [58, 67, 76, 124, 133, 142].forEach((x, i) => { s += `<rect x="${x - 4.5}" y="64" width="9" height="${100 + (i % 3) * 8}" rx="4.5"/>`; }); s += `</g><g stroke="${hcD}" stroke-width="1.2" opacity=".6">`; [58, 67, 76, 124, 133, 142].forEach(x => { for (let y = 84; y < 160; y += 14) s += `<path d="M${x - 4} ${y} h8"/>`; }); s += `</g>`; }
    if (a.hair === 'braids') { [60, 68, 132, 140].forEach((x, i) => { s += `<path d="M${x} 70 V${170 + (i % 2) * 8}" stroke="${hc}" stroke-width="8" stroke-linecap="round"/><path d="M${x} 74 V${168 + (i % 2) * 8}" stroke="${hcD}" stroke-width="8" stroke-dasharray="3 5" opacity=".55"/><circle cx="${x}" cy="${176 + (i % 2) * 8}" r="4" fill="${c2}"/>`; }); }
    if (hijab) s += `<path d="M44 112 Q38 26 100 24 Q162 26 156 112 L166 176 Q134 160 100 164 Q66 160 34 176 Z" fill="${c2}"/><path d="M60 150 Q100 176 140 150" fill="none" stroke="${shade(c2, -0.2)}" stroke-width="3" opacity=".6"/>`;
    /* ears */
    if (!hijab) {
      s += `<g fill="${sk}"><ellipse cx="${earX}" cy="100" rx="7.5" ry="11"/><ellipse cx="${eR}" cy="100" rx="7.5" ry="11"/></g><g fill="${skD}"><ellipse cx="${earX + 1}" cy="100" rx="3.5" ry="6"/><ellipse cx="${eR - 1}" cy="100" rx="3.5" ry="6"/></g>`;
      if (a.ear === 'studs') s += `<g fill="#FFD766" stroke="#9C6F07" stroke-width=".8"><circle cx="${earX}" cy="110" r="3"/><circle cx="${eR}" cy="110" r="3"/></g>`;
      if (a.ear === 'hoops') s += `<g fill="none" stroke="#FFD766" stroke-width="2.4"><circle cx="${earX}" cy="117" r="7"/><circle cx="${eR}" cy="117" r="7"/></g>`;
      if (a.ear === 'drops') s += `<g><path d="M${earX} 109 v6 M${eR} 109 v6" stroke="#FFD766" stroke-width="1.6"/><path d="M${earX} 115 q-4 6 0 10 q4 -4 0 -10z M${eR} 115 q-4 6 0 10 q4 -4 0 -10z" fill="${c2}" stroke="#FFD766" stroke-width="1"/></g>`;
    }
    /* face */
    s += `<g fill="${sk}">${facePath}</g>`;
    s += `<path d="M72 130 Q100 152 128 130" fill="none" stroke="${skD}" stroke-width="3" opacity=".35"/>`;
    s += `<ellipse cx="78" cy="112" rx="7" ry="4.5" fill="#FF6B6B" opacity=".13"/><ellipse cx="122" cy="112" rx="7" ry="4.5" fill="#FF6B6B" opacity=".13"/>`;
    /* eyes */
    const eye = (x) => {
      if (a.eyes === 'smile') return `<path d="M${x - 7} 96 Q${x} 89 ${x + 7} 96" fill="none" stroke="#21140E" stroke-width="2.8" stroke-linecap="round"/>`;
      if (a.eyes === 'almond') return `<path d="M${x - 8} 95 Q${x} 87 ${x + 8} 95 Q${x} 100 ${x - 8} 95Z" fill="#FBF7F2"/><circle cx="${x}" cy="94.5" r="3.4" fill="#2A1A12"/><circle cx="${x + 1.2}" cy="93.3" r="1.1" fill="#fff"/>`;
      if (a.eyes === 'wide') return `<ellipse cx="${x}" cy="94" rx="7" ry="7.6" fill="#FBF7F2"/><circle cx="${x}" cy="94.6" r="4.2" fill="#2A1A12"/><circle cx="${x + 1.5}" cy="93" r="1.4" fill="#fff"/>`;
      if (a.eyes === 'sleepy') return `<ellipse cx="${x}" cy="95" rx="6.5" ry="4.6" fill="#FBF7F2"/><circle cx="${x}" cy="96" r="3.2" fill="#2A1A12"/><path d="M${x - 7.5} 95 Q${x} 88 ${x + 7.5} 95 Z" fill="${skD}"/><path d="M${x - 7.5} 95 Q${x} 92 ${x + 7.5} 95" fill="none" stroke="#21140E" stroke-width="1.6"/>`;
      return `<ellipse cx="${x}" cy="94" rx="6" ry="6.4" fill="#FBF7F2"/><circle cx="${x}" cy="94.6" r="3.7" fill="#2A1A12"/><circle cx="${x + 1.3}" cy="93.2" r="1.2" fill="#fff"/>`;
    };
    s += eye(84) + eye(116);
    const brow = { soft: ['M76 83 Q84 79 92 82', 2.8], arched: ['M75 85 Q83 75 93 81', 2.8], straight: ['M76 82 L92 81', 3.2], bold: ['M75 84 Q84 77 93 81', 5] }[a.brows];
    s += `<g fill="none" stroke="${browCol}" stroke-width="${brow[1]}" stroke-linecap="round"><path d="${brow[0]}"/><path d="${brow[0]}" transform="matrix(-1 0 0 1 200 0)"/></g>`;
    s += `<path d="M100 99 Q95 110 99 114 Q103 115.5 106 112" fill="none" stroke="${skDD}" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>`;
    /* facial hair */
    const fhc = a.hair === 'bald' || hijab || wrap ? '#2A1A12' : hc;
    if (a.fh === 'stubble') s += `<path d="M64 112 Q70 142 100 146 Q130 142 136 112 Q124 134 100 136 Q76 134 64 112Z" fill="${fhc}" opacity=".28"/>`;
    if (a.fh === 'beard') s += `<path d="M62 100 Q60 144 100 152 Q140 144 138 100 Q134 128 116 128 Q100 120 84 128 Q66 128 62 100Z" fill="${fhc}"/>`;
    if (a.fh === 'goatee') s += `<path d="M91 131 Q100 148 109 131 Q100 135 91 131Z" fill="${fhc}"/>`;
    if (a.fh === 'moustache' || a.fh === 'goatee' || a.fh === 'beard') s += `<path d="M85 118 Q100 110 115 118 Q108 122 100 119 Q92 122 85 118Z" fill="${fhc}"/>`;
    /* mouth */
    const mc = shade(sk, -0.5);
    s += `<g class="st-mouth">` + (a.mouth === 'grin' ? `<path d="M86 121 Q100 138 114 121 Z" fill="#5A1F1F"/><path d="M89 122 Q100 126 111 122 L110 125 Q100 128 90 125Z" fill="#fff"/>` : a.mouth === 'calm' ? `<path d="M90 125 Q100 128 110 125" fill="none" stroke="${mc}" stroke-width="3" stroke-linecap="round"/>` : `<path d="M87 122 Q100 133 113 122" fill="none" stroke="${mc}" stroke-width="3.2" stroke-linecap="round"/>`) + `</g>`;
    /* front hair */
    const cap = `M58 88 Q56 44 100 40 Q144 44 142 88 Q138 64 120 58 Q100 52 80 58 Q62 64 58 88 Z`;
    if (a.hair === 'afro') s += `<path d="M56 90 Q50 38 100 32 Q150 38 144 90 Q140 68 124 61 Q100 53 76 61 Q60 68 56 90 Z" fill="${hc}"/>`;
    if (a.hair === 'locs') s += `<path d="${cap}" fill="${hc}"/><path d="M80 46 Q84 56 80 64 M100 41 V58 M120 46 Q116 56 120 64" stroke="${hcD}" stroke-width="2" fill="none"/>`;
    if (a.hair === 'braids') s += `<path d="${cap}" fill="${hc}"/><path d="M100 41 V58" stroke="${hcD}" stroke-width="2"/><path d="M70 52 Q84 46 98 44 M102 44 Q116 46 130 52" stroke="${hcD}" stroke-width="2" stroke-dasharray="4 3" fill="none"/>`;
    if (a.hair === 'cornrows') { s += `<path d="M60 84 Q58 46 100 42 Q142 46 140 84 Q136 64 100 58 Q64 64 60 84Z" fill="${hc}"/>`; for (let i = 0; i < 6; i++) { const x = 70 + i * 12; s += `<path d="M${x} ${66 - Math.abs(x - 100) * 0.12} Q${x + (x < 100 ? -3 : 3)} 52 ${100 + (x - 100) * 0.55} 43" stroke="${hcD}" stroke-width="2" fill="none" stroke-dasharray="3 2"/>`; } }
    if (a.hair === 'twists') { s += `<path d="${cap}" fill="${hc}"/><g fill="${hc}" stroke="${hcD}" stroke-width="1.2">`; for (let i = 0; i <= 9; i++) { const ang = Math.PI * (1.08 + i * 0.093); s += `<ellipse cx="${(100 + Math.cos(ang) * 44).toFixed(1)}" cy="${(80 + Math.sin(ang) * 40).toFixed(1)}" rx="7" ry="11" transform="rotate(${(ang * 180 / Math.PI + 90).toFixed(0)} ${(100 + Math.cos(ang) * 44).toFixed(1)} ${(80 + Math.sin(ang) * 40).toFixed(1)})"/>`; } s += `</g>`; }
    if (a.hair === 'curls') s += `<path d="${cap}" fill="${hc}"/><g fill="${hcL}" opacity=".5"><circle cx="76" cy="58" r="5"/><circle cx="96" cy="50" r="5"/><circle cx="118" cy="54" r="5"/></g>`;
    if (a.hair === 'straight') s += `<path d="M58 88 Q58 42 100 38 Q142 42 142 82 Q124 54 94 60 Q72 66 58 88Z" fill="${hc}"/><path d="M96 42 Q86 54 70 66" stroke="${hcL}" stroke-width="2" fill="none" opacity=".6"/>`;
    if (a.hair === 'bun') s += `<path d="M58 86 Q56 44 100 40 Q144 44 142 86 Q136 62 100 56 Q64 62 58 86Z" fill="${hc}"/><path d="M76 50 Q100 44 124 50" stroke="${hcL}" stroke-width="2" fill="none" opacity=".5"/>`;
    if (a.hair === 'fade') s += `<path d="M60 90 Q58 46 100 42 Q142 46 140 90 Q136 66 100 60 Q64 66 60 90Z" fill="${hc}" opacity=".45"/><path d="M64 70 Q64 44 100 40 Q136 44 136 70 Q128 58 100 56 Q72 58 64 70Z" fill="${hc}"/>`;
    if (a.hair === 'bald') s += `<ellipse cx="86" cy="62" rx="12" ry="5" fill="#fff" opacity=".18" transform="rotate(-18 86 62)"/>`;
    if (wrap) s += `<path d="M54 94 Q44 26 100 18 Q156 26 146 94 Q140 66 100 62 Q60 66 54 94Z" fill="${c2}"/><path d="M60 70 Q100 40 140 70 M58 82 Q100 54 142 82" fill="none" stroke="${shade(c2, -0.25)}" stroke-width="3" opacity=".7"/><g fill="${c1}" opacity=".8"><circle cx="80" cy="40" r="3"/><circle cx="104" cy="32" r="3"/><circle cx="126" cy="44" r="3"/><circle cx="92" cy="54" r="2.5"/><circle cx="116" cy="56" r="2.5"/></g><ellipse cx="122" cy="22" rx="16" ry="10" fill="${shade(c2, 0.1)}" transform="rotate(-25 122 22)"/>`;
    if (hijab) s += `<path d="M58 80 Q60 40 100 38 Q140 40 142 80 Q124 58 100 58 Q76 58 58 80Z" fill="${c2}"/><path d="M58 80 Q54 120 76 146 M142 80 Q146 120 124 146" fill="none" stroke="${shade(c2, -0.2)}" stroke-width="4" stroke-linecap="round"/>`;
    /* glasses */
    if (a.gl === 'round') s += `<g fill="#fff" fill-opacity=".1" stroke="#141414" stroke-width="2.6"><circle cx="84" cy="94" r="11"/><circle cx="116" cy="94" r="11"/><path d="M95 93 Q100 89 105 93" fill="none"/><path d="M73 92 L${earX + 4} 96 M127 92 L${eR - 4} 96" fill="none"/></g>`;
    if (a.gl === 'square') s += `<g fill="#fff" fill-opacity=".1" stroke="#141414" stroke-width="2.8"><rect x="72" y="85" width="24" height="18" rx="3"/><rect x="104" y="85" width="24" height="18" rx="3"/><path d="M96 92 H104 M72 91 L${earX + 4} 95 M128 91 L${eR - 4} 95" fill="none"/></g>`;
    if (a.gl === 'cateye') s += `<g fill="#fff" fill-opacity=".1" stroke="${c2 === '#F2F2F2' ? '#C2457F' : c2}" stroke-width="3"><path d="M72 90 Q72 84 80 85 L94 87 Q97 96 90 102 Q76 104 73 96 Q70 92 66 86 Z"/><path d="M128 90 Q128 84 120 85 L106 87 Q103 96 110 102 Q124 104 127 96 Q130 92 134 86 Z"/><path d="M94 91 H106" fill="none"/></g>`;
    if (a.gl === 'shades') s += `<g stroke="#0A0A0A" stroke-width="2.4"><path d="M71 87 H96 V96 Q94 104 84 104 Q72 104 71 95Z" fill="#0F1220"/><path d="M104 87 H129 V95 Q128 104 116 104 Q106 104 104 96Z" fill="#0F1220"/><path d="M96 89 H104 M71 89 L${earX + 4} 93 M129 89 L${eR - 4} 93" fill="none"/></g><path d="M75 90 l8 0" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><path d="M108 90 l8 0" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`;
    s += `</g></g></svg>`;
    return s;
  }
  /* audience silhouettes: diverse Caribbean crowd, original shapes */
  function audienceSVG() {
    const kinds = ['afro', 'wrap', 'locs', 'cap', 'bun', 'hijab', 'short', 'pony', 'puffs', 'fade', 'afro', 'wrap'];
    let s = '<g class="st-crowd">';
    const n = 11;
    for (let i = 0; i < n; i++) {
      const x = 20 + i * (760 / (n - 1)) + (i % 2 ? 8 : -6), y = 410 + (i % 3) * 8, k = kinds[i % kinds.length], r = 24 + (i % 4) * 2;
      s += `<g transform="translate(${x.toFixed(0)} ${y})" fill="#070A1C" stroke="#FFD766" stroke-opacity=".28" stroke-width="2">`;
      s += `<path d="M${-r * 2.1} 60 Q${-r * 2} ${r * 0.9} 0 ${r * 0.8} Q${r * 2} ${r * 0.9} ${r * 2.1} 60Z"/>`;
      if (k === 'afro') s += `<circle cx="0" cy="${-r * 0.3}" r="${r * 1.45}"/>`;
      if (k === 'wrap') s += `<path d="M${-r} ${-r * 0.2} Q${-r * 1.2} ${-r * 2.6} 0 ${-r * 2.7} Q${r * 1.3} ${-r * 2.6} ${r} ${-r * 0.2}Z"/>`;
      if (k === 'locs') s += `<path d="M${-r * 1.15} ${-r * 0.4} V${r * 1.4} M${-r * 0.8} 0 V${r * 1.6} M${r * 0.8} 0 V${r * 1.6} M${r * 1.15} ${-r * 0.4} V${r * 1.4}" stroke-width="${r * 0.32}" stroke="#070A1C" stroke-linecap="round"/>`;
      if (k === 'bun') s += `<circle cx="0" cy="${-r * 1.45}" r="${r * 0.55}"/>`;
      if (k === 'pony') s += `<ellipse cx="${r * 1.1}" cy="${-r * 0.1}" rx="${r * 0.45}" ry="${r * 0.9}" transform="rotate(25 ${r * 1.1} ${-r * 0.1})"/>`;
      if (k === 'puffs') s += `<circle cx="${-r * 0.85}" cy="${-r * 1.05}" r="${r * 0.55}"/><circle cx="${r * 0.85}" cy="${-r * 1.05}" r="${r * 0.55}"/>`;
      if (k === 'hijab') s += `<path d="M${-r * 1.35} ${r * 0.9} Q${-r * 1.5} ${-r * 1.5} 0 ${-r * 1.55} Q${r * 1.5} ${-r * 1.5} ${r * 1.35} ${r * 0.9}Z"/>`;
      s += `<circle cx="0" cy="0" r="${r}"/>`;
      if (k === 'cap') s += `<path d="M${-r} ${-r * 0.35} Q0 ${-r * 1.5} ${r} ${-r * 0.35} L${r * 1.9} ${-r * 0.25} L${r * 0.9} ${-r * 0.05}Z"/>`;
      if (k === 'fade') s += `<path d="M${-r * 0.9} ${-r * 0.5} Q0 ${-r * 1.35} ${r * 0.9} ${-r * 0.5}" fill="none"/>`;
      s += `</g>`;
      if (i === 7) s += `<rect x="${(x + 30).toFixed(0)}" y="${y - 2}" width="12" height="20" rx="2" fill="#7FD3FF" opacity=".75" transform="rotate(-12 ${(x + 36).toFixed(0)} ${y + 8})"/>`;
    }
    return s + '</g>';
  }
  function stageSVG(per, title) {
    const who = per ? per.name : 'Guest Performer';
    const av = normAv(per ? per.av : { hair: 'locs', skin: 3, out: 'dashiki', c1: 0, c2: 1, mouth: 'smile', ear: 'studs', bg: 'spot' });
    const c1 = OUTC[av.c1][0];
    let bok = ''; const bc = ['#FFD766', '#FF9F6B', '#F5C542', '#FFE9A8', '#E94F86'];
    for (let i = 0; i < 16; i++) { const x = (i * 97 + 40) % 800, y = 40 + (i * 61) % 200, r = 8 + (i * 7) % 16; bok += `<circle class="st-bk" style="animation-delay:${(i % 6) * 0.45}s" cx="${x}" cy="${y}" r="${r}" fill="${bc[i % 5]}" opacity=".32"/>`; }
    let bulbs = ''; for (let i = 0; i < 14; i++) { bulbs += `<circle class="st-bulb" style="animation-delay:${(i % 2) * 0.5}s" cx="${282 + i * 18}" cy="22" r="3.6"/><circle class="st-bulb" style="animation-delay:${((i + 1) % 2) * 0.5}s" cx="${282 + i * 18}" cy="86" r="3.6"/>`; }
    let planks = ''; for (let i = 0; i <= 12; i++) { const xb = i * (800 / 12), xt = 110 + i * (580 / 12); planks += `<path d="M${xt.toFixed(0)} 330 L${xb.toFixed(0)} 450"/>`; }
    return `<svg class="st-stage-svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc('Lounge stage: ' + who + ' at the microphone under a spotlight, with a crowd in silhouette')}" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="stWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A1640"/><stop offset=".7" stop-color="#1B0F33"/><stop offset="1" stop-color="#2A1220"/></linearGradient>
<linearGradient id="stCurtL" x1="0" x2="1"><stop offset="0" stop-color="#4A0B1E"/><stop offset=".25" stop-color="#8E1B3A"/><stop offset=".5" stop-color="#5A0F25"/><stop offset=".75" stop-color="#9E2444"/><stop offset="1" stop-color="#4A0B1E"/></linearGradient>
<linearGradient id="stFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B3D1A"/><stop offset="1" stop-color="#2A160A"/></linearGradient>
<linearGradient id="stBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6D6" stop-opacity=".55"/><stop offset="1" stop-color="#FFD766" stop-opacity=".06"/></linearGradient>
<radialGradient id="stPool" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF2C2" stop-opacity=".7"/><stop offset="1" stop-color="#FFD766" stop-opacity="0"/></radialGradient>
<filter id="stBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
</defs>
<rect width="800" height="450" fill="url(#stWall)"/>
<g stroke="#FFD766" stroke-opacity=".06" stroke-width="2">${[1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${i * 100} 0 V330"/>`).join('')}</g>
<g filter="url(#stBlur)">${bok}</g>
<path d="M0 0 H130 Q110 120 135 330 H0Z" fill="url(#stCurtL)"/><path d="M800 0 H670 Q690 120 665 330 H800Z" fill="url(#stCurtL)"/>
<path d="M0 0 H800 V34 Q760 52 720 34 Q680 52 640 34 Q600 52 560 34 Q520 52 480 34 Q440 52 400 34 Q360 52 320 34 Q280 52 240 34 Q200 52 160 34 Q120 52 80 34 Q40 52 0 34Z" fill="#7A1530"/><path d="M0 34 Q40 52 80 34 Q120 52 160 34 Q200 52 240 34 Q280 52 320 34 Q360 52 400 34 Q440 52 480 34 Q520 52 560 34 Q600 52 640 34 Q680 52 720 34 Q760 52 800 34" fill="none" stroke="#FFD766" stroke-width="3"/>
<g class="st-marq"><rect x="270" y="12" width="260" height="84" rx="12" fill="#140B04" stroke="#FFD766" stroke-width="3"/>${bulbs}<text x="400" y="47" text-anchor="middle" fill="#FFD766" font-size="13" font-weight="800" letter-spacing="4">NOW PERFORMING</text><text x="400" y="72" text-anchor="middle" fill="#FFFFFF" font-size="17" font-weight="700">${esc(who.slice(0, 24))}</text></g>
<polygon points="0,450 800,450 690,330 110,330" fill="url(#stFloor)"/>
<g stroke="#000" stroke-opacity=".25" stroke-width="2">${planks}</g>
<path d="M110 330 H690" stroke="#FFD766" stroke-opacity=".35" stroke-width="3"/>
<polygon class="st-beam" points="372,0 428,0 560,372 240,372" fill="url(#stBeam)" opacity=".75"/>
<ellipse cx="400" cy="372" rx="170" ry="34" fill="url(#stPool)"/>
<g><ellipse cx="560" cy="350" rx="30" ry="8" fill="#7A4420" stroke="#3A1E0C" stroke-width="2"/><path d="M538 352 L524 430 M582 352 L596 430 M560 356 V432 M532 398 H588" stroke="#3A1E0C" stroke-width="5" stroke-linecap="round"/></g>
<g class="st-performer"><path d="M330 330 L470 330 L462 398 L338 398 Z" fill="${shade(c1, -0.18)}"/><rect x="350" y="396" width="40" height="52" rx="8" fill="#151A30"/><rect x="410" y="396" width="40" height="52" rx="8" fill="#151A30"/><svg x="310" y="152" width="180" height="180" viewBox="0 0 200 200">${avatarSVG(av, { bg: false }).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg></g>
<g><ellipse cx="318" cy="446" rx="34" ry="7" fill="#0A0A0A"/><path d="M318 446 L338 300 L362 286" stroke="#2B2B2B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M318 446 L338 300" stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" opacity=".5"/><g transform="rotate(-55 364 280) translate(364 280) scale(1.45) translate(-364 -280)"><rect x="356" y="266" width="16" height="30" rx="8" fill="#1B1B1B"/><rect x="357.5" y="267" width="13" height="13" rx="6.5" fill="#9A9A9A"/><path d="M359 270 h10 M359 273.5 h10 M359 277 h10" stroke="#555" stroke-width="1"/></g></g>
${audienceSVG()}
</svg>`;
  }
  /* ===================== SHARED UI BITS ===================== */
  const KLABEL = { spelling: 'Spelling', confusable: 'Word choice', grammar: 'Grammar', creole: 'Creole feature', capitalisation: 'Capital letter', punctuation: 'Punctuation', register: 'Formal register', style: 'Style hint' };
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  function navS(active) {
    const items = [['library', '📚 Genre Library'], ['poetry', '🪶 Poetry Craft'], ['portfolio', '🗂️ My Portfolio']];
    return `<nav class="chips st-nav" aria-label="Writers' Studio sections">${items.map(([k, l]) => `<button type="button" class="chip ${active === k ? 'sel' : ''}" data-go="studio" data-tab="${k}" ${active === k ? 'aria-current="page"' : ''}>${l}</button>`).join('')}<button type="button" class="chip" data-go="lounge" data-tab="personae">🎭 Persona Maker</button><button type="button" class="chip" data-go="lounge" data-tab="stage">🎙️ Open Mic Lounge</button></nav>`;
  }
  function navL(active) {
    const items = [['stage', '🎙️ The Stage'], ['personae', '🎭 Persona Maker'], ['playbill', '🎟️ Playbill']];
    return `<nav class="chips st-nav" aria-label="Open Mic Lounge sections">${items.map(([k, l]) => `<button type="button" class="chip ${active === k ? 'sel' : ''}" data-go="lounge" data-tab="${k}" ${active === k ? 'aria-current="page"' : ''}>${l}</button>`).join('')}<button type="button" class="chip" data-go="studio">✍️ Writers' Studio</button><button type="button" class="chip" data-go="studio" data-tab="portfolio">🗂️ My Portfolio</button></nav>`;
  }
  const shortPurpose = g => { const s = g.pa.split(/(?<=\.)\s/)[0]; return s.length > 96 ? s.slice(0, 93).replace(/\s+\S*$/, '') + '…' : s; };
  function personaMini(p) {
    if (!p) return '';
    return `<div class="st-pmini"><span class="st-pmav">${avatarSVG(p.av)}</span><div><b data-notc>${esc(p.name)}</b>${p.spec ? `<span class="hint"> · ${esc(p.spec)}</span>` : ''}${p.cat ? `<p class="hint">“${esc(p.cat)}”</p>` : ''}${p.bio && p.bio.voice ? `<p class="hint">Voice: ${esc(String(p.bio.voice).slice(0, 140))}</p>` : ''}</div></div>`;
  }
  function dlText(name, text) {
    try {
      const blob = new Blob([String(text || '')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = url; a.download = String(name || 'my-writing').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-').slice(0, 60) + '.txt';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => { try { URL.revokeObjectURL(url); } catch (e) { } }, 1500);
      return true;
    } catch (e) { return false; }
  }
  function markHTML(t, issues) {
    let h = '', pos = 0;
    issues.slice().sort((a, b) => a.start - b.start).forEach(x => {
      if (x.start < pos || x.end > t.length) return;
      h += esc(t.slice(pos, x.start)) + `<mark class="st-m st-m-${esc(x.kind)}" title="${esc(x.msg || '')}">${esc(t.slice(x.start, x.end))}</mark>`; pos = x.end;
    });
    return h + esc(t.slice(pos));
  }

  /* ===================== LIBRARY ===================== */
  function libraryHTML(api) {
    const t = SS(api), done = t.g ? t.g.split(',').filter(Boolean).length : 0, pieces = loadPieces().length;
    let h = `<section class="hero st-hero"><span class="eyebrow">Create & Perform</span><h1>Writers' Studio</h1><p>${GENRES.length} literary and non-literary genres, each with a purpose, a features checklist, a planning frame, three Caribbean prompts, instant feedback and an original model to compare with once you submit. Then take your piece to the Open Mic Lounge.</p><div class="row"><span class="ribbon">✍️ ${done} of ${GENRES.length} genres submitted</span><span class="ribbon">🗂️ ${pieces}/${MAXP} pieces saved</span><span class="ribbon">🪶 ${FORMS.length} poetry forms</span></div></section>`;
    h += navS('library');
    h += `<div class="card st-searchcard"><label class="st-sr" for="st-q">Search genres</label><input id="st-q" class="search" type="search" placeholder="Search: memoir, speech, report, sonnet…" autocomplete="off"><div class="chips st-jump" aria-label="Jump to a group">${GROUPS.map(([id, n, ic]) => `<button type="button" class="chip" data-px="jump" data-k="${id}">${ic} ${esc(n)}</button>`).join('')}</div><p class="hint st-none" hidden>No genre matches that search. Try a broader word such as "letter" or "essay".</p></div>`;
    GROUPS.forEach(([gid, gname, gic]) => {
      const L = GENRES.filter(g => g.g === gid);
      h += `<section class="card st-grp" id="st-g-${gid}"><h2>${gic} ${esc(gname)}</h2><div class="tiles st-tiles">${L.map(g => {
        const sub = inCsv(t.g, g.ix);
        return `<button type="button" class="tile st-tile" data-go="studio" data-tab="desk" data-k="${g.id}" data-name="${esc((g.n + ' ' + gname + ' ' + g.pa).toLowerCase())}"><span class="ticon" aria-hidden="true">${g.ic}</span><h3>${esc(g.n)}</h3><span class="meta">${esc(shortPurpose(g))}</span><span class="st-tags"><span class="ribbon">${g.w[0]}–${g.w[1]} words</span>${sub ? '<span class="ribbon st-ok">✓ Submitted</span>' : ''}</span></button>`;
      }).join('')}${gid === 'po' ? `<button type="button" class="tile st-tile st-crafttile" data-go="studio" data-tab="poetry" data-name="poetry craft devices forms haiku sonnet villanelle limerick tanka ballad ode elegy acrostic spoken word dub calypso kaiso"><span class="ticon" aria-hidden="true">🪶</span><h3>Poetry Craft</h3><span class="meta">${DEVICES.length} devices and ${FORMS.length} forms with guided builders, syllable counter and rhyme highlighter.</span><span class="st-tags"><span class="ribbon">Builders</span></span></button>` : ''}</div></section>`;
    });
    return h;
  }

  /* ===================== WRITING DESK ===================== */
  function wcInfo(min, max, plain) {
    const n = wc(D.x);
    if (plain) { const L = lines(D.x).length; return { n, pct: 0, msg: `${L} line${L === 1 ? '' : 's'} · ${n} words`, cls: '', plain: true }; }
    const pct = clamp(Math.round(n / Math.max(1, max) * 100), 0, 100);
    const msg = n < min ? `${n} words · aim for ${min}–${max}` : n > max ? `${n} words · ${n - max} over the ${max}-word limit` : `${n} words · within ${min}–${max} ✓`;
    return { n, pct, msg, cls: n < min ? 'lo' : n > max ? 'hi' : 'ok' };
  }
  function writeCard(api, P) {
    const pers = loadPers(), per = pers.find(p => p.id === D.pe);
    if (D.pe && !per) D.pe = '';
    const W = wcInfo(P.w[0], P.w[1], P.kind === 'f'); CUR_W = P.w; CUR_WP = P.kind === 'f'; CUR_F = P.form; CUR_POEM = !!P.poem;
    let h = `<section class="card st-write" aria-label="Writing desk">`;
    h += `<h3>1. Choose a Prompt</h3><div class="st-prompts" role="radiogroup" aria-label="Prompts" data-notc>${P.prompts.map((p, i) => `<button type="button" class="opt st-prompt ${D.pr === i ? 'sel' : ''}" role="radio" aria-checked="${D.pr === i}" data-px="prompt" data-i="${i}"><span class="st-pn" aria-hidden="true">${i + 1}</span><span>${esc(p)}</span></button>`).join('')}<button type="button" class="opt st-prompt ${D.pr === -1 ? 'sel' : ''}" role="radio" aria-checked="${D.pr === -1}" data-px="prompt" data-i="-1"><span class="st-pn" aria-hidden="true">✎</span><span>My own prompt</span></button></div>`;
    if (D.pr === -1) h += `<div class="field"><label for="st-own">Your own prompt or task</label><input id="st-own" class="input" maxlength="300" value="${esc(D.own)}" placeholder="Write your own task here"></div>`;
    h += `<h3>2. Write as…</h3><div class="st-perrow"><div class="field"><label for="st-pe">Persona (optional)</label><select id="st-pe" class="select"><option value="">Myself</option>${pers.map(p => `<option value="${esc(p.id)}" ${p.id === D.pe ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select></div>${per ? personaMini(per) + '<p class="hint">Write in this persona\'s voice: their background, influences and catchphrase.</p>' : `<p class="hint">Create a stage persona in the <button type="button" class="linkbtn" data-go="lounge" data-tab="personae">Persona Maker</button> and write in their voice.</p>`}</div>`;
    h += `<details class="st-plan"${D.planOpen ? ' open' : ''}><summary>3. Planning Frame</summary><div class="st-planbody"><p class="hint">Jot a few words for each stage. Planning first makes the Organization mark much easier.</p>${P.plan.map((s, i) => `<div class="field"><label for="st-pl${i}">${esc(s)}</label><textarea id="st-pl${i}" class="input st-plta" data-pl="${i}" rows="2" maxlength="600">${esc(D.pl[i] || '')}</textarea></div>`).join('')}<div class="row"><button type="button" class="btn ghost" data-px="plan2draft">Copy my plan into the editor</button></div></div></details>`;
    if (P.extra) h += P.extra;
    h += `<h3>4. Write</h3><div class="field"><label for="st-ti">Title</label><input id="st-ti" class="input" maxlength="80" value="${esc(D.ti)}" placeholder="Give your piece a title"></div>`;
    h += `<label class="st-sr" for="st-ta">Your ${esc(P.label)}</label><textarea id="st-ta" class="st-ta${P.poem ? ' st-poem' : ''}" maxlength="${MAXC}" spellcheck="true" placeholder="${esc(P.ph)}">${esc(D.x)}</textarea>`;
    h += `<div class="st-wcrow"><span id="st-wc" class="st-wc ${W.cls}" aria-live="polite">${W.msg}</span>${W.plain ? '' : `<span class="pbar st-wbar" aria-hidden="true"><i id="st-wbar" style="width:${W.pct}%"></i></span>`}</div>`;
    if (P.poem) h += `<div id="st-ptools" class="st-ptools" aria-live="polite">${poemPanelHTML(P.form)}</div>`;
    h += `<h3>5. ${P.kind === 'f' ? 'Form' : 'Genre'} Checklist</h3><p class="hint">Tick each feature when you are sure your piece has it. The checker compares your ticks with what it can spot.</p><div class="st-checks">${P.checks.map((c, i) => `<label class="st-ck"><input type="checkbox" data-ck="${i}" ${D.ck[i] ? 'checked' : ''}><span>${esc(c)}</span></label>`).join('')}</div>`;
    h += `<div class="row st-actions"><button type="button" class="btn gold" data-px="check">✅ ${P.kind === 'f' ? 'Check My Poem' : 'Check My Writing'}</button><button type="button" class="btn go" data-px="save">💾 Save to My Portfolio</button><button type="button" class="btn ghost" data-px="say">🔊 Read Aloud</button><button type="button" class="btn ghost" data-px="perform">🎙️ Perform in the Lounge</button><button type="button" class="btn ghost" data-px="dl">⬇ Download</button></div>`;
    if (D.warn) h += `<p class="fb bad" id="st-warn" role="alert">${esc(D.warn)}</p>`;
    if (D.pid) h += `<p class="hint">✓ Saved in My Portfolio. Saving again updates the same piece.</p>`;
    return h + `</section>`;
  }
  function deskHTML(api, G) {
    CUR_G = G; desk('g:' + G.id);
    const open = submitted(api, G) || !!api.S.teacher;
    let h = navS('');
    h += `<div class="row st-crumbs"><button type="button" class="linkbtn" data-go="studio">← All genres</button><span class="kicker">${esc(grpName(G.g))}</span></div>`;
    h += `<section class="card st-about"><div class="st-head"><span class="st-bigic" aria-hidden="true">${G.ic}</span><div><h2>${esc(G.n)}</h2><p class="hint">${G.w[0]}–${G.w[1]} words · ${G.fm ? 'formal register' : 'flexible register'}${open ? ' · model unlocked' : ''}</p></div></div>
      <div class="grid2"><div><h4>Purpose & Audience</h4><p>${esc(G.pa)}</p><h4>Register & Tone</h4><p>${esc(G.rg)}</p></div><div><h4>Typical Structure</h4><ol class="st-ol">${G.st.map(s => `<li>${esc(s)}</li>`).join('')}</ol></div></div>
      <p class="fb note st-cape"><b>CAPE link:</b> ${esc(G.cape)}</p>${G.poem ? `<div class="row"><button type="button" class="btn ghost" data-go="studio" data-tab="poetry">🪶 Open Poetry Craft: devices, forms and builders</button></div>` : ''}</section>`;
    h += writeCard(api, { kind: 'g', id: G.id, prompts: G.pr, checks: G.ft.map(f => f.split('|')[0]), plan: G.st, w: G.w, poem: !!G.poem, form: null, label: G.n.toLowerCase(), ph: G.poem ? 'Type your poem here, one line per line. Leave a blank line between stanzas.' : `Start your ${G.n.toLowerCase()} here. Leave a blank line between paragraphs.` });
    if (D.fb && D.fb.g === G.id) h += feedbackHTML(api, G, D.fb);
    h += aiHTML(api);
    h += modelHTML(api, G, open);
    return h;
  }
  function analyseText(t, G, ck) {
    const words = wc(t), P = paras(t), S = sentences(t);
    const feats = G.ft.map((f, i) => { const [label, key] = f.split('|'); return { i, label, key, found: key === 'self' ? null : detect(key, t), ticked: !!ck[i] }; });
    const starts = {}; S.forEach(s => { const w = (s.match(/^[“"']?([A-Za-z']+)/) || [])[1]; if (w) { const k = w.toLowerCase(); starts[k] = (starts[k] || 0) + 1; } });
    const top = Object.entries(starts).sort((a, b) => b[1] - a[1])[0];
    let issues = [];
    const WD = window.COURSE_WORDDESK;
    if (WD && typeof WD.check === 'function') { try { issues = (WD.check(t, { formal: G.fm !== false }) || []).filter(x => x && x.end > x.start && x.end <= t.length).slice(0, 80); } catch (e) { issues = miniCheck(t, G.fm); } }
    else issues = miniCheck(t, G.fm);
    return { g: G.id, words, P, nS: S.length, avg: words / Math.max(1, S.length), feats, trans: transitions(t), top, issues, text: t, wd: !!(WD && WD.check) };
  }
  function langHTML(R) {
    let h = '';
    if (R.issues.length) {
      h += `<p>${R.issues.length} point${R.issues.length === 1 ? '' : 's'} to check${R.wd ? ' (from the Word Desk checker)' : ''}. Hover or tap a highlighted word to see why.</p><div class="st-marked" data-notc>${markHTML(R.text, R.issues)}</div>`;
      h += `<ul class="st-issues">${R.issues.slice(0, 12).map(x => `<li><span class="ribbon">${esc(x.label || KLABEL[x.kind] || x.kind)}</span> “${esc(x.original || R.text.slice(x.start, x.end))}”: ${esc(x.msg || '')}${x.fix ? ` <i>Try: “${esc(x.fix)}”</i>` : ''}</li>`).join('')}</ul>${R.issues.length > 12 ? `<p class="hint">…and ${R.issues.length - 12} more highlighted above.</p>` : ''}`;
    } else h += `<p class="fb good">No spelling or grammar slips spotted. Still read it aloud once: your ear catches what a checker misses.</p>`;
    return h;
  }
  function feedbackHTML(api, G, R) {
    const spotted = R.feats.filter(f => f.found === true).length, checkable = R.feats.filter(f => f.found !== null).length;
    const [mn, mx] = G.w, inRange = R.words >= mn && R.words <= mx;
    let h = `<section class="card st-fb" id="st-fb" tabindex="-1" aria-label="Feedback on your writing"><h3>Feedback on Your ${esc(G.n)}</h3>`;
    h += `<div class="st-pills"><span class="st-pill ${inRange ? 'ok' : 'no'}">📏 ${R.words} words</span><span class="st-pill ${spotted >= checkable * 0.7 ? 'ok' : 'no'}">🔎 ${spotted}/${checkable} features spotted</span><span class="st-pill">¶ ${R.P.length} paragraph${R.P.length === 1 ? '' : 's'}</span><span class="st-pill ${R.issues.length ? 'no' : 'ok'}">✍️ ${R.issues.length} language point${R.issues.length === 1 ? '' : 's'}</span></div>`;
    if (R.unlocked) h += `<p class="fb good">🔓 First submission complete! The model excerpt below is now unlocked. Compare it with your draft.</p>`;
    h += `<h4>Content: Genre Features</h4><div class="st-feats">${R.feats.map(f => {
      const st = f.found === true ? ['ok', '✓ Spotted'] : f.found === false ? ['no', '○ Not yet'] : ['self', '✎ Self-check'];
      const note = f.found === false && f.ticked ? 'You ticked this, but the checker could not spot it. Double-check.' : f.found === true && !f.ticked ? 'This looks present: tick it if you agree.' : f.found === null ? (f.ticked ? 'You say this is done.' : 'Only you can judge this one: tick it when you are sure.') : '';
      return `<div class="st-frow"><span class="st-pill ${st[0]}">${st[1]}</span><div><b>${esc(f.label)}</b>${note ? `<p class="hint">${note}</p>` : ''}</div></div>`;
    }).join('')}</div>`;
    const org = [];
    if (!G.poem) {
      if (R.P.length < G.pm) org.push(`Your piece has ${R.P.length} paragraph${R.P.length === 1 ? '' : 's'}; a ${esc(G.n.toLowerCase())} usually needs at least ${G.pm}. Give each stage of the structure its own paragraph.`);
      else org.push(`✓ ${R.P.length} paragraphs: a clear shape. Check that each opens with a sentence that signals its point.`);
      if (!['dp', 'tw'].includes(G.g)) org.push(R.trans.length >= 3 ? `✓ Good cohesion: you used ${R.trans.slice(0, 6).map(x => `<i>${esc(x)}</i>`).join(', ')}.` : `Add more linking words (for example <i>however</i>, <i>as a result</i>, <i>meanwhile</i>, <i>finally</i>) to guide the reader.${R.trans.length ? ' You used ' + R.trans.map(x => `<i>${esc(x)}</i>`).join(', ') + '.' : ''}`);
      if (G.pm >= 4 && !DET.concl(R.text)) org.push('Your final paragraph does not yet signal a conclusion. Round it off with a synthesis, a call to action or a final image.');
    } else org.push(`${lines(R.text).length} lines in ${blocks(R.text).length} stanza${blocks(R.text).length === 1 ? '' : 's'}. Check that every line break earns its place.`);
    org.push(`Compare your order with the typical structure: ${G.st.map(esc).join(' → ')}.`);
    h += `<h4>Organization: Structure</h4><ul>${org.map(x => `<li>${x}</li>`).join('')}</ul>`;
    const ex = [];
    ex.push(inRange ? `✓ ${R.words} words is within the ${mn}–${mx} range.` : R.words < mn ? `At ${R.words} words you are below the ${mn}-word guide. Develop your strongest idea with one more example or detail.` : `At ${R.words} words you are over the ${mx}-word guide. Cut repetition; in CAPE, writing beyond the limit is not rewarded.`);
    if (!G.poem && R.nS > 2) ex.push(R.avg > 28 ? `Your sentences average about ${Math.round(R.avg)} words; some may be running on. Split the longest ones.` : R.avg < 8 && R.words > 60 ? `Many sentences are very short (about ${Math.round(R.avg)} words). Combine some with <i>because</i>, <i>although</i> or <i>which</i>.` : `✓ Good control of sentence length (about ${Math.round(R.avg)} words on average).`);
    if (R.top && R.top[1] >= 3 && R.top[1] / Math.max(1, R.nS) > 0.3 && !G.poem) ex.push(`${R.top[1]} of your ${R.nS} sentences begin with “${esc(R.top[0])}”. Vary your sentence openings.`);
    h += `<h4>Expression: Language</h4><ul>${ex.map(x => `<li>${x}</li>`).join('')}</ul>` + langHTML(R);
    const weak = R.feats.find(f => f.found === false);
    h += `<div class="fb note"><b>Your next step:</b> ${weak ? `work in <b>${esc(weak.label.toLowerCase())}</b>, then check again.` : R.issues.length ? 'fix the highlighted language points, then read your piece aloud.' : 'polish word choice and try the piece aloud in the Open Mic Lounge.'}</div>`;
    h += `<p class="hint">This offline checker looks for patterns, so it can miss things or be fooled. Your teacher's judgement and the rubric (Content 10, Organization 7, Expression 8) are what count.</p></section>`;
    return h;
  }
  function modelHTML(api, G, open) {
    if (!open) return `<section class="card st-lockcard"><h3>🔒 Model Excerpt</h3><p>The model unlocks after your first submission for this genre. Write your own version first, press <b>Check My Writing</b>, then compare.</p><p class="hint">Why? Writers who draft before reading a model produce more original work and notice more when they compare.</p></section>`;
    const found = G.ft.map(f => f.split('|')).filter(([, k]) => k !== 'self' && detect(k, G.md)).map(([l]) => l);
    return `<section class="card st-modelcard"><div class="row st-between"><h3>Model Excerpt</h3><button type="button" class="tool" data-px="saymodel">🔊 Listen</button></div><div class="st-model" data-notc>${esc(G.md)}</div><p class="hint">${G.id === 'biography' ? 'A factual model written for this course. Always check facts against your own sources.' : 'An original excerpt written for this course; the works and people in it were created for practice.'}</p>${found.length ? `<h4>Features You Can Spot in the Model</h4><ul class="st-found">${found.map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : ''}<p class="fb note"><b>Compare:</b> Which feature is strongest in your draft? Which technique could you borrow (not copy) to improve it?</p></section>`;
  }
  function aiHTML(api) {
    if (!api.sample || AI_OFF) return '';
    const ai = D.ai || { st: 'idle' };
    if (ai.st === 'busy') return `<section class="card st-ai" aria-live="polite"><h3>AI Feedback</h3><p><span class="st-spin" aria-hidden="true"></span>Reading your piece and marking it against the rubric… <span id="st-ai-live" class="hint"></span></p></section>`;
    let h = `<section class="card st-ai"><h3>AI Feedback</h3><p class="hint">Optional. The course marker marks your piece like a CAPE teacher: Content 10, Organization 7, Expression 8 (total 25).</p>`;
    if (ai.st === 'error') h += `<p class="fb bad">${esc(ai.msg)}</p>`;
    if (ai.st === 'done' && ai.r) {
      const r = ai.r, rows = [['Content', r.content, 10], ['Organization', r.organization, 7], ['Expression', r.expression, 8]];
      h += `<div class="row st-between"><h4>Detailed Marking</h4><span class="st-score">${esc(r.total)}/25</span></div>${r.summary ? `<p>${esc(r.summary)}</p>` : ''}<div class="st-feats">${rows.map(([n, c, o]) => `<div class="st-frow"><span class="st-pill mark">${esc(c && c.mark != null ? c.mark : '–')}/${o}</span><div><b>${n}</b><p>${esc(c && c.comment || '')}</p></div></div>`).join('')}</div>`;
      if (Array.isArray(r.strengths) && r.strengths.length) h += `<h4>What You Did Well</h4><ul>${r.strengths.slice(0, 4).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
      if (Array.isArray(r.nextSteps) && r.nextSteps.length) h += `<h4>How to Improve</h4><ul>${r.nextSteps.slice(0, 4).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
      if (r.rewrite && r.rewrite.original) h += `<h4>One Sentence, Improved</h4><div class="grid2 st-rw"><div><span class="kicker">You wrote</span><p>${esc(r.rewrite.original)}</p></div><div><span class="kicker">Stronger version</span><p>${esc(r.rewrite.improved || '')}</p></div></div>`;
      h += `<p class="hint">AI marking is a guide to help you revise. Your teacher's mark is the one that counts.</p>`;
    }
    return h + `<div class="row"><button type="button" class="btn gold" data-px="ai">${ai.st === 'done' ? '🤖 Mark It Again After Revising' : '🤖 Get AI Feedback'}</button></div></section>`;
  }
  function parseAI(r) {
    let data = r;
    if (r && typeof r === 'object' && typeof r.text === 'string' && !r.content) data = r.text;
    if (r && typeof r === 'object' && r.json && typeof r.json === 'object') data = r.json;
    if (typeof data === 'string') { const m = data.match(/\{[\s\S]*\}/); data = m ? JSON.parse(m[0]) : null; }
    if (!data || typeof data !== 'object') throw Object.assign(new Error('invalid_json'), { code: 'invalid_json' });
    const fix = (c, o) => { c = c && typeof c === 'object' ? c : { comment: String(c || '') }; c.mark = clamp(Math.round(+c.mark || 0), 0, o); c.comment = String(c.comment || ''); return c; };
    data.content = fix(data.content, 10); data.organization = fix(data.organization, 7); data.expression = fix(data.expression, 8);
    data.total = data.content.mark + data.organization.mark + data.expression.mark;
    return data;
  }
  async function runAI(api, label, purpose) {
    const s = api.sample, key = DK, dd = D; if (!s || AI_OFF) return;
    const text = String(dd.x || '').trim();
    if (wc(text) < 20) { api.toast('Write at least 20 words before asking for AI feedback.'); return; }
    dd.ai = { st: 'busy' }; api.render();
    const per = loadPers().find(p => p.id === dd.pe);
    const prompt = `You are an experienced, encouraging CAPE Communication Studies teacher in the Caribbean giving feedback to a student aged 16 to 19.
Mark the piece against this rubric (total 25): Content 10 (ideas, development, genre features, suitability for purpose and audience), Organization 7 (structure, paragraphing or stanza/line control, cohesion), Expression 8 (register, grammar, spelling, punctuation, word choice).
GENRE OR FORM: ${label}
${purpose}
TASK THE STUDENT CHOSE: ${currentPrompt() || '(the student did not choose a prompt)'}
${per ? `The student is writing in the voice of an original stage persona called "${per.name}"${per.cat ? ' (catchphrase: "' + per.cat + '")' : ''}. Judge how well the voice is sustained.` : ''}
Rules: be specific and quote the student's own words; use British/Caribbean spelling; treat Caribbean Creole respectfully as a language and comment only on whether its use suits the genre, audience and purpose; never use letter grades; if you refer to CAPE grades, call the top grade "Grade One".
STUDENT PIECE:
"""
${text.slice(0, MAXC)}
"""
Reply with ONLY a JSON object in this shape: {"content":{"mark":0,"comment":"2-3 sentences"},"organization":{"mark":0,"comment":"2-3 sentences"},"expression":{"mark":0,"comment":"2-3 sentences"},"total":0,"summary":"2 sentences","strengths":["...","..."],"nextSteps":["...","...","..."],"rewrite":{"original":"one weak sentence copied exactly from the piece","improved":"your stronger version"}}`;
    let acc = '';
    const onText = t => { t = String(t || ''); acc = t.startsWith(acc) ? t : acc + t; const el = document.getElementById('st-ai-live'); if (el) el.textContent = '(' + acc.length + ' characters received)'; };
    try {
      const msgs = [{ role: 'user', content: prompt }], opts = { cache: false, modelTier: 'quick', onText };
      let r;
      if (typeof s === 'function') r = await s(msgs, opts);
      else if (s && typeof s.create === 'function') r = await s.create(msgs, opts);
      else if (s && typeof s.json === 'function') r = await s.json(prompt, opts);
      else throw Object.assign(new Error('not_granted'), { code: 'not_granted' });
      if ((r == null || (typeof r === 'object' && !r.text && !r.content && !r.json)) && acc) r = { text: acc };
      dd.ai = { st: 'done', r: parseAI(r) };
    } catch (e) {
      const code = String((e && (e.code || e.reason || e.name)) || '') + ' ' + String((e && e.message) || e || '');
      if (/not_granted|sampling_disabled|not_declared|capability_disabled|capability_removed/.test(code)) { AI_OFF = true; dd.ai = { st: 'idle' }; api.toast('AI feedback is not available here. The offline checker still works.'); }
      else if (/rate_limited/.test(code)) dd.ai = { st: 'error', msg: 'Lots of students are asking for AI feedback right now. Wait a minute and try again; your offline feedback still applies.' };
      else dd.ai = { st: 'error', msg: 'The AI feedback did not work this time. Try again, or use the offline feedback above.' };
    }
    if (DK === key && D === dd) api.render();
  }

  /* ===================== POETRY CRAFT ===================== */
  function sylTarget(F, i) { if (!F || !F.syl) return null; if (F.lines && F.syl.length === F.lines) return F.syl[i]; if (F.stanza) return F.syl[i % F.stanza]; return F.syl[0]; }
  function poemAnalysis(t, F) {
    const raw = String(t || '').replace(/\r/g, '').split('\n'), rows = []; let st = 0, prevBlank = true, started = false;
    raw.forEach(line => { if (!line.trim()) { if (started && !prevBlank) st++; prevBlank = true; return; } started = true; prevBlank = false; rows.push({ text: line, st, syl: sylLine(line), lw: lastWord(line), rk: rhymeKey(lastWord(line)) }); });
    const cnt = {}; rows.forEach(r => { if (r.rk) cnt[r.rk] = (cnt[r.rk] || 0) + 1; });
    const map = {}; let next = 0;
    rows.forEach((r, i) => { if (!r.rk) r.rl = '–'; else { if (map[r.rk] == null) map[r.rk] = String.fromCharCode(65 + (next++ % 26)); r.rl = map[r.rk]; } r.rh = !!(r.rk && cnt[r.rk] > 1); const tg = sylTarget(F, i); r.tg = tg; r.ok = tg == null ? null : Array.isArray(tg) ? r.syl >= tg[0] && r.syl <= tg[1] : r.syl === tg; r.near = tg != null && !Array.isArray(tg) && Math.abs(r.syl - tg) === 1; });
    const pattern = []; rows.forEach(r => { (pattern[r.st] = pattern[r.st] || []).push(r.rl); });
    return { rows, lines: rows.length, stanzas: rows.length ? rows[rows.length - 1].st + 1 : 0, pattern: pattern.map(p => p.join('')).join(' ') };
  }
  const hue = l => l === '–' ? 0 : ((l.charCodeAt(0) - 65) * 47) % 360;
  function expectedScheme(F) { if (!F) return ''; if (F.schemes) return F.schemes[D.sch] || F.scheme; return F.scheme || ''; }
  const normLine = s => String(s || '').toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim();
  function formChecks(F, A) {
    const out = [], R = A.rows;
    if (!F) return out;
    if (F.lines) out.push({ ok: A.lines === F.lines, t: `${A.lines} of ${F.lines} lines` });
    if (F.stanza) { const bad = []; for (let s = 0; s < A.stanzas; s++) { const n = R.filter(r => r.st === s).length; if (n !== F.stanza) bad.push(s + 1); } out.push({ ok: A.stanzas >= 2 && !bad.length, t: A.stanzas < 2 ? 'Write at least two quatrains (4-line stanzas)' : bad.length ? `Stanza ${bad.join(', ')} ${bad.length === 1 ? 'is' : 'are'} not 4 lines` : `${A.stanzas} quatrains` }); }
    if (F.syl) { const chk = R.filter(r => r.ok != null), good = chk.filter(r => r.ok).length, near = chk.filter(r => !r.ok && r.near).length; out.push({ ok: chk.length > 0 && good + near === chk.length, t: `Syllables on target in ${good} of ${chk.length} lines${near ? ` (${near} more within one syllable; the counter is approximate)` : ''}` }); }
    let sch = expectedScheme(F).replace(/\s/g, '');
    if (F.stanza && F.scheme) sch = Array(Math.max(1, A.stanzas)).fill(F.scheme).join('').replace(/\s/g, '');
    if (sch && R.length >= 2) {
      let pairs = 0, hits = 0; const n = Math.min(R.length, sch.length);
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const sameStanzaBallad = !F.stanza || Math.floor(i / F.stanza) === Math.floor(j / F.stanza); if (sch[i] === sch[j] && sameStanzaBallad && (F.stanza ? sch[i] === 'B' : true)) { pairs++; if (R[i].rk && R[i].rk === R[j].rk) hits++; } }
      if (pairs) out.push({ ok: hits / pairs >= 0.7, t: `Rhyme pattern: ${hits} of ${pairs} expected rhyme pairs found (target ${F.stanza ? F.scheme + ' in each stanza' : expectedScheme(F)})` });
    }
    if (F.refrains) {
      const L = R.map(r => normLine(r.text)), r1 = normLine(D.r1) || L[0], r2 = normLine(D.r2) || L[2];
      const a = [0, 5, 11, 17].filter(i => L[i] && L[i] === r1).length, b = [2, 8, 14, 18].filter(i => L[i] && L[i] === r2).length;
      out.push({ ok: a === 4 && b === 4, t: `Refrain 1 appears ${a} of 4 times (lines 1, 6, 12, 18); Refrain 2 appears ${b} of 4 times (lines 3, 9, 15, 19)` });
    }
    if (F.acrostic) { const w = String(D.word || '').toUpperCase().replace(/[^A-Z]/g, ''), firsts = R.map(r => (r.text.trim()[0] || '').toUpperCase()).join(''); const good = [...w].filter((c, i) => firsts[i] === c).length; out.push({ ok: !!w && good === w.length && R.length === w.length, t: w ? `First letters spell “${firsts.slice(0, 20)}” (target “${w}”): ${good} of ${w.length} letters match` : 'Type the word for your acrostic above' }); }
    if (F.shape) { const lens = R.map(r => r.text.trim().length); out.push({ ok: lens.length >= 4 && Math.max(...lens) - Math.min(...lens) >= 8, t: lens.length ? `Line lengths range from ${Math.min(...lens)} to ${Math.max(...lens)} characters; a shape needs clear variation` : 'Write at least four lines' }); }
    const t = R.map(r => r.text).join('\n');
    if (F.id === 'ode') out.push({ ok: /\b(O|oh|you|your|thou|thee)\b/i.test(t), t: 'Addresses its subject directly (“O…”, “you”)' });
    if (F.id === 'elegy') out.push({ ok: DET.emotion.test(t) && /\b(remember|still|gone|lost|miss|used to|once|no more|today)\b/i.test(t), t: 'Moves through loss and memory' });
    if (F.id === 'spoken' || F.id === 'dub') out.push({ ok: repeated(t), t: 'Repetition and rhythm for performance' });
    if (F.id === 'spoken') out.push({ ok: /\b(you|we|they ask|listen)\b/i.test(t), t: 'Direct address to the audience' });
    if (F.id === 'kaiso') { out.push({ ok: /chorus/i.test(t) || repeated(t), t: 'A repeated chorus (label it “Chorus:”)' }); out.push({ ok: rhymePairs(t) >= 2, t: 'Rhyming couplets or quatrains' }); }
    if (F.id === 'free') out.push({ ok: A.lines >= 5 && DET.sense.test(t), t: 'At least five lines with sensory imagery' });
    return out;
  }
  function poemPanelHTML(F, text) {
    const A = poemAnalysis(text != null ? text : D.x, F);
    if (!A.lines) return `<p class="hint">Live tools: syllables per line, rhyme letters and line/stanza counts appear here as you type.</p>`;
    const sch = F && (F.stanza ? F.scheme : expectedScheme(F));
    let h = `<div class="st-pstats"><span class="st-pill">📝 ${A.lines} line${A.lines === 1 ? '' : 's'}${F && F.lines ? ' / ' + F.lines : ''}</span><span class="st-pill">🧱 ${A.stanzas} stanza${A.stanzas === 1 ? '' : 's'}</span><span class="st-pill">🔤 Rhyme: ${esc(A.pattern)}</span>${sch ? `<span class="st-pill">🎯 Target: ${esc(sch)}</span>` : ''}</div>`;
    h += `<div class="st-prows" role="table" aria-label="Line by line: syllables and rhyme"><div class="st-pr st-prh" role="row"><span role="columnheader" title="Line number">#</span><span role="columnheader" title="Syllables">Syl</span><span role="columnheader" title="Rhyme letter">Rh</span><span role="columnheader">Line</span></div>${A.rows.map((r, i) => {
      const tg = r.tg == null ? '' : Array.isArray(r.tg) ? `${r.tg[0]}–${r.tg[1]}` : r.tg;
      const cls = r.ok == null ? '' : r.ok ? 'ok' : r.near ? 'near' : 'no';
      const txt = esc(r.text.trim()), lw = esc(r.lw);
      const ix = r.lw && r.rh ? txt.lastIndexOf(lw) : -1;
      const shown = ix >= 0 ? txt.slice(0, ix) + `<mark class="st-rw" style="--h:${hue(r.rl)}">${lw}</mark>` + txt.slice(ix + lw.length) : txt;
      return `<div class="st-pr ${r.st % 2 ? 'alt' : ''}" role="row"><span role="cell">${i + 1}</span><span role="cell" class="st-syl ${cls}" title="${tg ? 'Target ' + tg : ''}">${r.syl}${tg ? `<small>/${tg}</small>` : ''}</span><span role="cell"><span class="st-rl" style="--h:${hue(r.rl)}" data-on="${r.rh ? 1 : 0}">${r.rl}</span></span><span role="cell" class="st-ln" data-notc>${shown}</span></div>`;
    }).join('')}</div>`;
    const C = formChecks(F, A);
    if (C.length) h += `<ul class="st-cons">${C.map(c => `<li class="${c.ok ? 'ok' : 'no'}"><span aria-hidden="true">${c.ok ? '✓' : '○'}</span> ${esc(c.t)}</li>`).join('')}</ul>`;
    if (F && F.shape) h += `<div class="st-shape st-shape-${esc(D.shape)}" aria-label="Shape preview" data-notc>${A.rows.map((r, i) => `<div style="${D.shape === 'wave' ? `padding-left:${(Math.sin(i / 1.3) + 1) * 3}em` : ''}">${esc(r.text.trim())}</div>`).join('')}</div>`;
    return h + `<p class="hint">Syllable counts and rhymes are estimated by simple rules; trust your ear when they disagree.</p>`;
  }
  function poetryHome(api) {
    const t = SS(api);
    let h = `<section class="hero st-hero"><span class="eyebrow">Writers' Studio</span><h1>Poetry Craft</h1><p>Learn the devices, try the forms, and build poems with live tools: a syllable counter for every line, a rhyme-ending highlighter, line and stanza counts, and read-aloud. Every example here is original.</p><div class="row"><span class="ribbon">🪶 ${t.f ? t.f.split(',').filter(Boolean).length : 0} of ${FORMS.length} forms tried</span></div></section>`;
    h += navS('poetry');
    h += `<section class="card"><h2>Forms & Guided Builders</h2><div class="tiles st-tiles">${FORMS.map(F => `<button type="button" class="tile st-tile" data-go="studio" data-tab="poetry" data-k="${F.id}"><span class="ticon" aria-hidden="true">${F.ic}</span><h3>${esc(F.n)}</h3><span class="meta">${esc(F.about.split(/(?<=\.)\s/)[0])}</span><span class="st-tags">${F.lines ? `<span class="ribbon">${F.lines} lines</span>` : ''}${F.scheme ? `<span class="ribbon">${esc(F.stanza ? F.scheme : F.scheme.replace(/\s/g, ' '))}</span>` : ''}${inCsv(t.f, F.ix) ? '<span class="ribbon st-ok">✓ Tried</span>' : ''}</span></button>`).join('')}</div></section>`;
    h += `<section class="card"><h2>Poetic Devices</h2><p class="hint">Open a device to see its definition, an original example, its effect and a quick challenge. Module 1 link: name the device, quote it, and explain its effect (PEEL).</p><div class="st-devs">${DEVICES.map(d => `<details class="st-dev"><summary>${esc(d.n)}</summary><div><p>${esc(d.d)}</p><div class="st-ex" data-notc>${esc(d.ex)}</div><p><b>Effect:</b> ${esc(d.ef)}</p><p class="hint"><b>Try it:</b> ${esc(d.try)}</p></div></details>`).join('')}</div></section>`;
    h += `<section class="card"><h2>Quick Scanner</h2><p class="hint">Paste any lines (yours, or a poem you are studying) to count syllables and highlight rhyme endings.</p><label class="st-sr" for="st-scan">Lines to scan</label><textarea id="st-scan" class="st-ta st-poem st-scan" maxlength="3000" placeholder="Type or paste lines here…">${esc(SCAN)}</textarea><div id="st-scanout" aria-live="polite">${scanHTML()}</div><div class="row"><button type="button" class="btn ghost" data-px="sayscan">🔊 Read Aloud</button></div></section>`;
    h += `<section class="card"><h2>Caribbean Poets to Explore</h2><p class="hint">Look up these writers and performers in your library or anthology. Read and listen widely, then find your own voice.</p><div class="st-poets">${POETS.map(([n, c, w]) => `<div class="st-poet"><b>${esc(n)}</b><span class="hint">${esc(c)} · ${esc(w)}</span></div>`).join('')}</div></section>`;
    return h;
  }
  let SCAN = '';
  function scanHTML() { return poemPanelHTML(null, SCAN); }
  const FORM_PROMPTS = F => F.acrostic ? ['Write an acrostic on the name of your island, town or district.', 'Write an acrostic on a word that describes your generation.', 'Write an acrostic on the name of a Caribbean food or festival.'] : F.culture ? [`Write a ${F.n.toLowerCase()} about an issue young people face in your territory.`, `Write a ${F.n.toLowerCase()} celebrating the people who keep your community going.`, `Write a ${F.n.toLowerCase()} about language: who gets to speak, and how.`] : [`Write a ${F.n.toLowerCase()} about a sound that means home to you.`, `Write a ${F.n.toLowerCase()} about the sea as a messenger between islands.`, `Write a ${F.n.toLowerCase()} about a moment at school that nobody else noticed.`];
  function builderHTML(api, F) {
    CUR_G = { pr: FORM_PROMPTS(F) }; desk('f:' + F.id);
    let h = navS('poetry') + `<div class="row st-crumbs"><button type="button" class="linkbtn" data-go="studio" data-tab="poetry">← Poetry Craft</button><span class="kicker">Poetry form</span></div>`;
    h += `<section class="card st-about"><div class="st-head"><span class="st-bigic" aria-hidden="true">${F.ic}</span><div><h2>${esc(F.n)}</h2><p class="hint">${F.lines ? F.lines + ' lines · ' : ''}${F.scheme ? 'rhyme ' + esc(F.stanza ? F.scheme + ' per stanza' : F.scheme) : 'no fixed rhyme'}</p></div></div>
      <div class="grid2"><div><p>${esc(F.about)}</p><h4>The Rules</h4><ul>${F.rules.map(r => `<li>${esc(r)}</li>`).join('')}</ul><p class="fb note"><b>Tip:</b> ${esc(F.tip)}</p></div><div><h4>Original Example</h4><div class="st-ex" data-notc>${esc(F.ex)}</div>${F.culture ? `<p class="hint">This is a living Caribbean oral tradition. Write from your own experience and voice; avoid imitating or mocking accents. Poets and performers to explore: ${esc(POETS.filter(p => F.id === 'dub' ? /dub/.test(p[2]) || p[0] === 'Louise Bennett-Coverley' : /calypso/.test(p[2])).map(p => p[0]).join(', '))}.</p>` : ''}<p class="hint">CAPE link: Module 1 (literary devices and form, PEEL analysis); Paper 3 Section B (a poem can be your reflective piece).${F.perform ? ' Module 3: oral delivery when you perform it.' : ''}</p></div></div></section>`;
    let extra = '';
    if (F.acrostic) extra = `<div class="field st-extra"><label for="st-word">Acrostic word</label><input id="st-word" class="input" maxlength="20" value="${esc(D.word)}"></div>`;
    if (F.schemes) extra = `<div class="st-extra"><p><b>Rhyme-scheme helper</b></p><div class="chips" role="radiogroup" aria-label="Sonnet type">${Object.keys(F.schemes).map(k => `<button type="button" class="chip ${D.sch === k ? 'sel' : ''}" role="radio" aria-checked="${D.sch === k}" data-px="sch" data-k="${k}">${k === 'shakespearean' ? 'Shakespearean' : 'Petrarchan'}: ${F.schemes[k]}</button>`).join('')}</div><p class="hint">Lines that share a letter should rhyme. The panel under the editor labels each line's rhyme so you can compare.</p></div>`;
    if (F.refrains) extra = `<div class="st-extra"><p><b>Refrain helper</b></p><div class="grid2"><div class="field"><label for="st-r1">Refrain 1 (A1): lines 1, 6, 12, 18</label><input id="st-r1" class="input" maxlength="120" value="${esc(D.r1)}" placeholder="The sea will keep the names we cannot say"></div><div class="field"><label for="st-r2">Refrain 2 (A2): lines 3, 9, 15, 19</label><input id="st-r2" class="input" maxlength="120" value="${esc(D.r2)}" placeholder="and I will wait for you another day"></div></div><div class="row"><button type="button" class="btn ghost" data-px="skeleton">Insert the 19-line skeleton</button></div><p class="hint">The skeleton places your refrains for you; replace each “…” with a new line. Both refrains should rhyme with each other (A).</p></div>`;
    if (F.shape) extra = `<div class="st-extra"><p><b>Shape helper</b></p><div class="chips" role="radiogroup" aria-label="Shape">${[['diamond', 'Centred (diamond, tree)'], ['wave', 'Wave'], ['left', 'Left-aligned']].map(([k, l]) => `<button type="button" class="chip ${D.shape === k ? 'sel' : ''}" role="radio" aria-checked="${D.shape === k}" data-px="shape" data-k="${k}">${l}</button>`).join('')}</div><p class="hint">For a diamond, grow your lines (1, 2, 3, 4 words…) then shrink them. The preview under the editor shows the shape.</p></div>`;
    h += writeCard(api, { kind: 'f', id: F.id, prompts: CUR_G.pr, checks: F.rules, plan: ['Subject or moment', 'Key images and senses', 'Feeling or message', 'Sound plan: rhyme, refrain or repetition', 'Idea for the final line'], w: [F.lines ? Math.max(3, F.lines * 2) : 15, 400], poem: true, form: F, extra, label: F.n.toLowerCase(), ph: 'Type your poem here, one line per line. Leave a blank line between stanzas.' });
    if (D.fb && D.fb.f === F.id) {
      const R = D.fb, C = R.checks;
      h += `<section class="card st-fb" id="st-fb" tabindex="-1" aria-label="Feedback on your poem"><h3>Feedback on Your ${esc(F.n)}</h3>${R.first ? `<p class="fb good">🪶 New form unlocked in your poetry record!</p>` : ''}<h4>Form Check</h4><ul class="st-cons">${C.map(c => `<li class="${c.ok ? 'ok' : 'no'}"><span aria-hidden="true">${c.ok ? '✓' : '○'}</span> ${esc(c.t)}</li>`).join('')}</ul>`;
      const imgs = [['Imagery', DET.sense.test(R.text)], ['Figurative language', DET.fig.test(R.text)], ['Sound devices (alliteration or rhyme)', DET.sound(R.text)], ['Feeling or theme', DET.emotion.test(R.text)], ['Repetition or refrain', repeated(R.text)]];
      h += `<h4>Craft</h4><div class="st-pills">${imgs.map(([l, ok]) => `<span class="st-pill ${ok ? 'ok' : 'self'}">${ok ? '✓' : '○'} ${l}</span>`).join('')}</div><h4>Language</h4>${langHTML(R)}<div class="fb note"><b>Your next step:</b> ${(C.find(c => !c.ok) || { t: '' }).t ? 'work on: ' + esc(C.find(c => !c.ok).t.toLowerCase()) + '.' : 'read it aloud, then perform it in the Open Mic Lounge.'}</div></section>`;
    }
    h += aiHTML(api);
    return h;
  }
  function poetryHTML(api, loc) { const F = loc.k && FBY[loc.k]; return F ? builderHTML(api, F) : poetryHome(api); }

  /* ===================== PORTFOLIO ===================== */
  let PDEL = '';
  function pieceLabel(p) { return p.kind === 'f' ? (FBY[p.g] ? FBY[p.g].n : 'Poem') : (GBY[p.g] ? GBY[p.g].n : 'Writing'); }
  function pieceIcon(p) { return p.kind === 'f' ? (FBY[p.g] ? FBY[p.g].ic : '🪶') : (GBY[p.g] ? GBY[p.g].ic : '✍️'); }
  function portfolioHTML(api) {
    const P = loadPieces().sort((a, b) => (b.ts || 0) - (a.ts || 0)), pers = loadPers();
    let h = navS('portfolio') + `<section class="card"><div class="row st-between"><h2>My Portfolio</h2><span class="ribbon">${P.length}/${MAXP} pieces</span></div><p class="hint">Your saved pieces live in this browser only (up to ${MAXP}, ${MAXC.toLocaleString()} characters each). Download anything you want to keep or hand in.</p>`;
    if (!P.length) h += `<div class="st-empty"><p>No pieces yet. Choose a genre, write, then press <b>Save to My Portfolio</b>.</p><div class="row"><button type="button" class="btn gold" data-go="studio">📚 Open the Genre Library</button><button type="button" class="btn ghost" data-go="studio" data-tab="poetry">🪶 Try a Poetry Form</button></div></div>`;
    else h += `<div class="st-pieces">${P.map(p => { const per = pers.find(x => x.id === p.pe); return `<article class="st-piece"><div class="st-piece-h"><span class="st-pic" aria-hidden="true">${pieceIcon(p)}</span><div><h3 data-notc>${esc(p.t || 'Untitled')}</h3><p class="hint">${esc(pieceLabel(p))} · ${wc(p.x)} words · ${esc(fmtDate(p.ts))}${per ? ' · as ' + esc(per.name) : ''}</p></div></div><p class="st-snip" data-notc>${esc(p.x.slice(0, 170))}${p.x.length > 170 ? '…' : ''}</p><div class="row"><button type="button" class="btn ghost" data-px="popen" data-k="${esc(p.id)}">✏️ Open</button><button type="button" class="btn ghost" data-go="lounge" data-tab="stage" data-k="${esc(p.id)}">🎙️ Perform</button><button type="button" class="btn ghost" data-px="pdl" data-k="${esc(p.id)}">⬇ Download</button>${PDEL === p.id ? `<button type="button" class="btn no" data-px="pdel2" data-k="${esc(p.id)}">Confirm delete</button><button type="button" class="btn ghost" data-px="pdelx">Keep it</button>` : `<button type="button" class="btn ghost" data-px="pdel" data-k="${esc(p.id)}">🗑 Delete</button>`}</div></article>`; }).join('')}</div>`;
    return h + `</section>`;
  }
  /* ===================== OPEN MIC LOUNGE ===================== */
  const PF = { pid: '', lk: '', per: '', paste: '', mode: 'tts', rate: 1, pitch: 1, voice: '', playing: false, i: -1, tok: 0, performed: false, done: false, react: { snap: 0, clap: 0, fire: 0, encore: 0 }, notes: {}, note: '', saved: false };
  const REC = { state: 'idle', mr: null, chunks: [], url: '', ext: 'webm', err: '', t0: 0, timer: null, secs: 0 };
  const REACT = [['snap', '👌', 'Snaps'], ['clap', '👏', 'Applause'], ['fire', '🔥', 'Bless Up'], ['encore', '🌟', 'Encore!']];
  const NOTES = [['pace', 'Pace', 'Not too fast: could listeners keep up?'], ['pause', 'Pauses', 'Did you pause at line breaks and before key lines?'], ['emph', 'Emphasis', 'Did you stress the words that matter most?'], ['eye', 'Eye contact', 'Did you look up at your audience (or the camera)?'], ['proj', 'Voice projection', 'Could the back row hear every word?'], ['gest', 'Gestures', 'Did your hands and face support the meaning?']];
  const RATES = ['Developing', 'Fair', 'Good', 'Strong'];
  let PER_PDEL = '', PE = null, BILL_CLR = false;
  const perfPiece = () => PF.pid ? loadPieces().find(p => p.id === PF.pid) || null : null;
  const perfText = () => { const p = perfPiece(); return p ? p.x : PF.paste; };
  function perfLines() {
    const t = String(perfText() || '').trim(); if (!t) return [];
    let L = lines(t);
    if (L.length < 2) L = sentences(t);
    const out = []; L.forEach(l => { if (l.length <= 220) out.push(l); else sentences(l).forEach(s => out.push(s)); });
    return out.slice(0, 150);
  }
  const ttsOK = () => typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined';
  function stopPerformance() {
    PF.tok++; if (PF.playing) { PF.playing = false; try { window.speechSynthesis.cancel(); } catch (e) { } }
    if (REC.state === 'rec') recStop();
    setTalking(false);
  }
  function setTalking(on) { const st = document.getElementById('st-stage'); if (st) st.classList.toggle('is-talking', !!on); }
  function setLive(msg) { const el = document.getElementById('st-live'); if (el) el.textContent = msg; }
  function hiLine(i) {
    $$('#st-lyrics [data-l]').forEach(el => { const on = +el.dataset.l === i; el.classList.toggle('on', on); if (on) { const box = el.parentNode; try { box.scrollTop = Math.max(0, el.offsetTop - box.offsetTop - box.clientHeight / 2 + el.clientHeight / 2); } catch (e) { } } });
  }
  function pickVoice() { try { const vs = window.speechSynthesis.getVoices() || []; return vs.find(v => v.name === PF.voice) || vs.find(v => /^en[-_](TT|JM|GB)/i.test(v.lang || '')) || vs.find(v => /^en/i.test(v.lang || '')) || null; } catch (e) { return null; } }
  function perform(api) {
    if (!ttsOK()) { api.toast('Read-aloud is not available in this browser. Try “Perform It Myself” instead.'); return; }
    const L = perfLines(); if (!L.length) { api.toast('Choose a piece or paste some text first.'); return; }
    stopPerformance(); try { window.speechSynthesis.cancel(); } catch (e) { }
    const tok = ++PF.tok; PF.playing = true; PF.done = false; PF.i = -1;
    setTalking(true); syncPlayBtns();
    const v = pickVoice();
    const next = i => {
      if (A && A.S.loc && A.S.loc.v !== 'lounge') { PF.playing = false; return; }
      if (tok !== PF.tok || !PF.playing) return;
      if (i >= L.length) { PF.playing = false; PF.done = true; PF.performed = true; PF.i = -1; setTalking(false); hiLine(-1); setLive('Take a bow! 🎉 The crowd is on its feet.'); syncPlayBtns(); burst('clap', 6); sfx('clap'); return; }
      PF.i = i; hiLine(i); setLive(`Performing line ${i + 1} of ${L.length}`);
      let u;
      try { u = new window.SpeechSynthesisUtterance(L[i]); } catch (e) { PF.playing = false; setTalking(false); return; }
      u.rate = PF.rate; u.pitch = PF.pitch; if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-GB';
      let moved = false; const go = () => { if (moved) return; moved = true; setTimeout(() => next(i + 1), /[.!?]$/.test(L[i]) ? 380 : 220); };
      u.onend = go; u.onerror = go;
      try { window.speechSynthesis.speak(u); } catch (e) { go(); }
    };
    next(0);
  }
  function syncPlayBtns() { const b = document.getElementById('st-play'), s = document.getElementById('st-stop'); if (b) b.disabled = !!PF.playing; if (s) s.disabled = !PF.playing; }
  async function recStart(api) {
    const md = navigator.mediaDevices;
    if (!md || typeof md.getUserMedia !== 'function' || typeof window.MediaRecorder === 'undefined') { REC.err = 'Recording is not available in this browser or window (it may be blocked in some embedded views). You can still rehearse with “Read It for Me” and fill in your performance notes.'; api.render(); return; }
    REC.err = '';
    try {
      const stream = await md.getUserMedia({ audio: true });
      const mr = new window.MediaRecorder(stream); REC.chunks = [];
      mr.ondataavailable = e => { if (e && e.data && e.data.size) REC.chunks.push(e.data); };
      mr.onstop = () => {
        try { stream.getTracks().forEach(t => t.stop()); } catch (e) { }
        const type = mr.mimeType || (REC.chunks[0] && REC.chunks[0].type) || 'audio/webm';
        try { const blob = new Blob(REC.chunks, { type }); if (REC.url) { try { URL.revokeObjectURL(REC.url); } catch (e) { } } REC.url = URL.createObjectURL(blob); } catch (e) { REC.url = ''; }
        REC.ext = /ogg/.test(type) ? 'ogg' : /mp4|aac|m4a/.test(type) ? 'm4a' : 'webm';
        REC.state = REC.url ? 'done' : 'idle'; PF.performed = true; clearInterval(REC.timer);
        if (A && A.S.loc && A.S.loc.v === 'lounge') A.render();
      };
      mr.start(); REC.mr = mr; REC.state = 'rec'; REC.t0 = Date.now(); REC.secs = 0;
      clearInterval(REC.timer); REC.timer = setInterval(() => { if (A && A.S.loc && A.S.loc.v !== 'lounge') { recStop(); return; } REC.secs = Math.round((Date.now() - REC.t0) / 1000); setLive(`🔴 Recording ${String(Math.floor(REC.secs / 60)).padStart(2, '0')}:${String(REC.secs % 60).padStart(2, '0')}`); }, 500);
      api.render(); setTalking(true);
    } catch (e) {
      REC.err = e && (e.name === 'NotAllowedError' || e.name === 'SecurityError') ? 'Microphone permission was blocked. Allow the microphone in your browser settings, or use “Read It for Me” instead.' : 'The microphone could not start. Check that one is connected, or use “Read It for Me” instead.';
      REC.state = 'idle'; api.render();
    }
  }
  function recStop() { clearInterval(REC.timer); if (REC.mr && REC.state === 'rec') { REC.state = 'stopping'; try { REC.mr.stop(); } catch (e) { REC.state = 'idle'; } } setTalking(false); }

  /* ---------- sound + floating reactions ---------- */
  let AC = null;
  function ac() { if (A && A.S.sound === false) return null; try { if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); } if (AC.state === 'suspended' && AC.resume) AC.resume(); return AC; } catch (e) { return null; } }
  function sfx(kind) {
    const ctx = ac(); if (!ctx) return;
    try {
      const sr = ctx.sampleRate, dur = kind === 'encore' ? 2.6 : kind === 'clap' ? 1.7 : kind === 'fire' ? 1.0 : 0.6;
      const buf = ctx.createBuffer(1, Math.floor(sr * dur), sr), d = buf.getChannelData(0);
      const burstAt = (t0, len, amp) => { const s0 = Math.floor(t0 * sr), n = Math.floor(len * sr); for (let k = 0; k < n && s0 + k < d.length; k++) d[s0 + k] += (Math.random() * 2 - 1) * amp * Math.exp(-k / (n / 5)); };
      if (kind === 'clap' || kind === 'encore') { for (let t = 0; t < dur - 0.05; t += 0.008 + Math.random() * 0.03) { const env = Math.min(1, t / 0.15) * Math.min(1, (dur - t) / 0.7); burstAt(t, 0.025 + Math.random() * 0.02, 0.5 * env); } }
      else if (kind === 'snap') { [0, 0.2, 0.4].forEach(t => burstAt(t, 0.018, 0.9)); }
      else { for (let k = 0; k < d.length; k++) { const x = k / d.length; d[k] = (Math.random() * 2 - 1) * Math.sin(Math.PI * x) * 0.5; } }
      const src = ctx.createBufferSource(); src.buffer = buf;
      const f = ctx.createBiquadFilter(); f.type = kind === 'snap' ? 'highpass' : 'bandpass'; f.frequency.value = kind === 'snap' ? 2400 : kind === 'fire' ? 400 : 1400; f.Q.value = kind === 'fire' ? 2 : 0.7;
      if (kind === 'fire' && f.frequency.exponentialRampToValueAtTime) { f.frequency.setValueAtTime(400, ctx.currentTime); f.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + dur); }
      const g = ctx.createGain(); g.gain.value = 0.55;
      src.connect(f); f.connect(g); g.connect(ctx.destination); src.start();
    } catch (e) { }
  }
  function burst(kind, n) {
    const fx = document.getElementById('st-fx'); if (!fx) return;
    const em = (REACT.find(r => r[0] === kind) || REACT[1])[1];
    if (RM()) { const s = document.createElement('span'); s.className = 'st-float st-still'; s.textContent = em; s.style.left = '50%'; fx.appendChild(s); setTimeout(() => s.remove(), 900); return; }
    for (let i = 0; i < (n || 3); i++) { const s = document.createElement('span'); s.className = 'st-float'; s.textContent = em; s.style.left = (8 + Math.random() * 84) + '%'; s.style.animationDelay = (i * 0.09) + 's'; fx.appendChild(s); setTimeout(() => s.remove(), 1900 + i * 90); }
  }

  /* ---------- stage view ---------- */
  function stageHTML(api, loc) {
    if (loc.k && loc.k !== PF.lk) { PF.lk = loc.k; const p = loadPieces().find(x => x.id === loc.k); if (p) { PF.pid = p.id; if (p.pe) PF.per = p.pe; resetPerf(); } }
    const pieces = loadPieces().sort((a, b) => (b.ts || 0) - (a.ts || 0)), pers = loadPers();
    if (PF.pid && !pieces.some(p => p.id === PF.pid)) PF.pid = '';
    if (PF.per && !pers.some(p => p.id === PF.per)) PF.per = '';
    const piece = perfPiece(), per = pers.find(p => p.id === PF.per) || null, L = perfLines();
    const talking = PF.playing || REC.state === 'rec';
    const status = PF.playing ? `Performing line ${PF.i + 1} of ${L.length}` : REC.state === 'rec' ? '🔴 Recording…' : PF.done ? 'Take a bow! 🎉 The crowd is on its feet.' : L.length ? `Ready: ${L.length} line${L.length === 1 ? '' : 's'} on the teleprompter` : 'Choose a piece to begin';
    let h = `<section class="hero st-hero st-lhero"><span class="eyebrow">Create & Perform</span><h1>Open Mic Lounge</h1><p>Step into the spotlight. Choose a piece from your portfolio (or paste one), choose a persona, then let the lounge read it for you or record yourself performing it. Module 3 and Paper 3: this is oral communication practice.</p></section>`;
    h += navL('stage');
    h += `<section class="st-stagewrap ${talking ? 'is-talking' : ''}" id="st-stage">${stageSVG(per, piece ? piece.t : '')}<div class="st-fx" id="st-fx" aria-hidden="true"></div><p class="st-live" id="st-live" aria-live="polite">${esc(status)}</p></section>`;
    h += `<div class="st-react" role="group" aria-label="Audience reactions">${REACT.map(([k, e, l]) => `<button type="button" class="btn ghost st-rbtn" data-px="react" data-k="${k}"><span aria-hidden="true">${e}</span> ${l} <span class="st-rc" id="st-rc-${k}">${PF.react[k] || 0}</span></button>`).join('')}</div>`;
    h += `<div class="grid2 st-lgrid"><section class="card"><h3>1. Choose Your Piece</h3><div class="field"><label for="st-piece">Piece</label><select id="st-piece" class="select"><option value="">✎ Paste my own text</option>${pieces.map(p => `<option value="${esc(p.id)}" ${p.id === PF.pid ? 'selected' : ''}>${esc((p.t || 'Untitled').slice(0, 50))} (${esc(pieceLabel(p))})</option>`).join('')}</select></div>${piece ? `<p class="hint">${esc(pieceLabel(piece))} · ${wc(piece.x)} words</p>` : `<div class="field"><label for="st-paste">Paste or type your piece</label><textarea id="st-paste" class="st-ta st-paste" maxlength="${MAXC}" placeholder="Paste a poem, monologue or speech. Each line becomes a line on the teleprompter.">${esc(PF.paste)}</textarea></div>${pieces.length ? '' : '<p class="hint">Tip: save pieces from the Writers\' Studio to choose them here.</p>'}`}
      <h3>2. Choose Your Persona</h3><div class="field"><label for="st-per">Performer</label><select id="st-per" class="select"><option value="">🎤 Guest Performer</option>${pers.map(p => `<option value="${esc(p.id)}" ${p.id === PF.per ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select></div>${per ? personaMini(per) : ''}<p class="hint"><button type="button" class="linkbtn" data-go="lounge" data-tab="personae">${pers.length ? 'Edit or create personae' : 'Create your first persona'} in the Persona Maker →</button></p></section>`;
    h += `<section class="card"><h3>3. Perform</h3><div class="chips" role="radiogroup" aria-label="Performance mode"><button type="button" class="chip ${PF.mode === 'tts' ? 'sel' : ''}" role="radio" aria-checked="${PF.mode === 'tts'}" data-px="mode" data-k="tts">🔊 Read It for Me</button><button type="button" class="chip ${PF.mode === 'self' ? 'sel' : ''}" role="radio" aria-checked="${PF.mode === 'self'}" data-px="mode" data-k="self">🎙️ Perform It Myself</button></div>`;
    if (PF.mode === 'tts') {
      if (!ttsOK()) h += `<p class="fb note">Read-aloud is not available in this browser. Switch to “Perform It Myself”, or try another browser.</p>`;
      else h += `<div class="field"><label for="st-voice">Voice</label><select id="st-voice" class="select"><option value="">Default voice</option></select></div><div class="st-sliders"><div class="field"><label for="st-rate">Speed <span id="st-ratev">${PF.rate.toFixed(1)}×</span></label><input id="st-rate" type="range" min="0.6" max="1.4" step="0.1" value="${PF.rate}"></div><div class="field"><label for="st-pitch">Pitch <span id="st-pitchv">${PF.pitch.toFixed(1)}</span></label><input id="st-pitch" type="range" min="0.5" max="1.6" step="0.1" value="${PF.pitch}"></div></div><div class="row"><button type="button" class="btn gold" id="st-play" data-px="play" ${PF.playing ? 'disabled' : ''}>▶ Perform</button><button type="button" class="btn ghost" id="st-stop" data-px="stop" ${PF.playing ? '' : 'disabled'}>⏹ Stop</button></div><p class="hint">The lounge reads each line while the teleprompter highlights it, karaoke-style. Listen for pace and pauses, then perform it yourself.</p>`;
    } else {
      h += `<p class="hint">Record yourself reading from the teleprompter below. Your recording stays on this device until you download it.</p>`;
      if (REC.err) h += `<p class="fb note" role="alert">${esc(REC.err)}</p>`;
      h += `<div class="row">${REC.state === 'rec' ? `<button type="button" class="btn no" data-px="recstop">⏹ Stop Recording</button>` : `<button type="button" class="btn gold" data-px="rec">⏺ Start Recording</button>`}</div>`;
      if (REC.state === 'done' && REC.url) h += `<div class="st-recout"><audio controls src="${esc(REC.url)}"></audio><div class="row"><a class="btn go" href="${esc(REC.url)}" download="${esc(((piece && piece.t) || 'my-performance').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-').slice(0, 50) || 'my-performance')}.${REC.ext}">⬇ Download Recording</a><button type="button" class="btn ghost" data-px="recclear">Discard</button></div></div>`;
    }
    h += `</section></div>`;
    h += `<section class="card"><div class="row st-between"><h3>Teleprompter</h3><span class="hint">${L.length} line${L.length === 1 ? '' : 's'}</span></div><div class="st-lyrics" id="st-lyrics" data-notc>${L.length ? L.map((l, i) => `<p data-l="${i}" class="${PF.playing && PF.i === i ? 'on' : ''}">${esc(l)}</p>`).join('') : '<p class="hint">Your lines will appear here.</p>'}</div></section>`;
    h += notesHTML();
    return h;
  }
  function notesHTML() {
    return `<section class="card st-notes"><h3>Performance Notes</h3><p class="hint">Self-review after each run. Module 3 (oral communication: verbal and non-verbal delivery) and Paper 3 (presentation skills).</p><div class="st-nrows">${NOTES.map(([k, n, q]) => `<div class="st-nrow"><div><b>${n}</b><p class="hint">${q}</p></div><div class="chips" role="radiogroup" aria-label="${n}">${RATES.map((r, i) => `<button type="button" class="chip ${PF.notes[k] === i + 1 ? 'sel' : ''}" role="radio" aria-checked="${PF.notes[k] === i + 1}" data-px="note" data-k="${k}" data-i="${i + 1}">${r}</button>`).join('')}</div></div>`).join('')}</div><div class="field"><label for="st-note">One thing I will do better next time</label><textarea id="st-note" class="input" rows="2" maxlength="300">${esc(PF.note)}</textarea></div><div class="row"><button type="button" class="btn gold" data-px="billsave">🎟️ Save to My Playbill</button>${PF.saved ? '<span class="hint">✓ Saved to your playbill.</span>' : ''}</div></section>`;
  }
  function resetPerf() { PF.react = { snap: 0, clap: 0, fire: 0, encore: 0 }; PF.notes = {}; PF.note = ''; PF.saved = false; PF.performed = false; PF.done = false; }
  function playbillHTML(api) {
    const B = loadBill();
    let h = navL('playbill') + `<section class="card st-bill"><div class="st-billhead"><span class="kicker">Open Mic Lounge presents</span><h2>My Playbill</h2><p class="hint">${B.length} performance${B.length === 1 ? '' : 's'} logged on this device</p></div>`;
    if (!B.length) h += `<p>No performances yet. Head to the stage, perform a piece, fill in your performance notes and save them here.</p><div class="row"><button type="button" class="btn gold" data-go="lounge" data-tab="stage">🎙️ Go to the Stage</button></div>`;
    else h += `<ol class="st-billlist">${B.map(b => { const vals = Object.values(b.n || {}).filter(Boolean), avg = vals.length ? vals.reduce((a, c) => a + c, 0) / vals.length : 0; const r = b.r || {}; return `<li><div class="st-billrow"><b data-notc>${esc(b.t || 'Untitled')}</b><span class="hint">${esc(fmtDate(b.ts))} · ${esc(b.pn || 'Guest Performer')} · ${b.m === 'self' ? '🎙️ performed live' : '🔊 read by the lounge'}</span></div><div class="st-pills"><span class="st-pill">👌 ${r.snap || 0}</span><span class="st-pill">👏 ${r.clap || 0}</span><span class="st-pill">🔥 ${r.fire || 0}</span><span class="st-pill">🌟 ${r.encore || 0}</span>${avg ? `<span class="st-pill ok">Self-review: ${esc(RATES[clamp(Math.round(avg) - 1, 0, 3)])}</span>` : ''}</div>${b.note ? `<p class="hint">Next time: ${esc(b.note)}</p>` : ''}</li>`; }).join('')}</ol><div class="row">${BILL_CLR ? `<button type="button" class="btn no" data-px="billclr2">Confirm: clear playbill</button><button type="button" class="btn ghost" data-px="billclrx">Cancel</button>` : `<button type="button" class="btn ghost" data-px="billclr">Clear playbill</button>`}</div>`;
    return h + `</section>`;
  }

  /* ---------- persona maker ---------- */
  const SPECS = () => GENRES.filter(g => !g.poem).map(g => g.n).concat(FORMS.map(f => f.n + ' (poetry)'));
  function newPE() { return { id: '', name: '', bio: { bg: '', inf: '', voice: '' }, spec: '', cat: '', av: randAv(), isNew: true, warn: '' }; }
  function bioPreview(p) {
    const parts = [p.bio.bg, p.bio.inf, p.bio.voice].map(x => String(x || '').trim()).filter(Boolean);
    if (!parts.length) return '<p class="hint">Your biography preview appears here as you write.</p>';
    const fp = /\b(I|me|my)\b/.test(parts.join(' '));
    return `<p data-notc><b>${esc(p.name || 'Your persona')}</b>${p.spec ? `, ${esc(p.spec.toLowerCase())} specialist` : ''}. ${esc(parts.join(' '))}</p>${fp ? '<p class="hint">Biography tip: you used “I” or “my”. A biography is written in the third person (“she grew up…”, “his influences include…”).</p>' : ''}`;
  }
  const chipGroup = (k, label) => `<div class="chips st-opts" data-grp="${k}" role="group" aria-label="${esc(label)}">${OPT[k].map(([v, l]) => `<button type="button" class="chip ${PE.av[k] === v ? 'sel' : ''}" aria-pressed="${PE.av[k] === v}" data-px="pav" data-k="${k}" data-v="${v}">${l}</button>`).join('')}</div>`;
  const swatches = (k, arr, label) => `<div class="st-sws" data-grp="${k}" role="group" aria-label="${esc(label)}">${arr.map(([hex, n], i) => `<button type="button" class="st-sw ${PE.av[k] === i ? 'sel' : ''}" style="background:${hex}" aria-pressed="${PE.av[k] === i}" aria-label="${esc(n)}" title="${esc(n)}" data-px="pav" data-k="${k}" data-v="${i}"></button>`).join('')}</div>`;
  function personaHTML(api) {
    const L = loadPers();
    let h = navL('personae') + `<section class="card"><div class="row st-between"><h2>Persona Maker</h2><span class="ribbon">${L.length}/${MAXPER} personae</span></div><p>Create up to ${MAXPER} original stage personae with a name, a biography, a specialty and a custom avatar. Use them to <b>write as</b> someone in the Writers' Studio and to perform in the lounge.</p><p class="hint">Keep characters original and respectful: no real celebrities, no known characters, no stereotypes.</p>`;
    h += `<div class="st-pgrid">${L.map(p => `<article class="st-pcard"><span class="st-pcav">${avatarSVG(p.av, { label: 'Avatar of ' + p.name })}</span><div><h3 data-notc>${esc(p.name)}</h3>${p.spec ? `<p class="hint">${esc(p.spec)}</p>` : ''}${p.cat ? `<p class="st-cat" data-notc>“${esc(p.cat)}”</p>` : ''}</div><div class="row"><button type="button" class="btn ghost" data-px="peedit" data-k="${esc(p.id)}">✏️ Edit</button><button type="button" class="btn ghost" data-px="peperf" data-k="${esc(p.id)}">🎙️ Perform</button>${PER_PDEL === p.id ? `<button type="button" class="btn no" data-px="pedel2" data-k="${esc(p.id)}">Confirm delete</button><button type="button" class="btn ghost" data-px="pedelx">Keep</button>` : `<button type="button" class="btn ghost" data-px="pedel" data-k="${esc(p.id)}">🗑 Delete</button>`}</div></article>`).join('')}${L.length < MAXPER && !(PE && PE.isNew) ? `<button type="button" class="st-pnew" data-px="penew"><span aria-hidden="true">＋</span>New Persona</button>` : ''}</div></section>`;
    if (!PE && !L.length) PE = newPE();
    if (PE) {
      const specs = SPECS();
      h += `<section class="card st-pm" id="st-pm" aria-label="Persona editor"><h3>${PE.isNew ? 'New Persona' : 'Edit Persona'}</h3><div class="st-pmgrid"><div class="st-pmprev"><div class="st-avbox" id="st-pe-prev">${avatarSVG(PE.av, { label: 'Avatar preview' })}</div><div class="st-pminfo"><p class="st-pename" id="st-pe-name" data-notc>${esc(PE.name || 'Your stage name')}</p><p class="st-cat" id="st-pe-cat" data-notc>${PE.cat ? '“' + esc(PE.cat) + '”' : ''}</p><div class="row st-center"><button type="button" class="btn ghost" data-px="perand">🎲 Randomise Look</button></div></div></div><div class="st-pmform">
        <details open><summary>Identity</summary><div class="st-fbody"><div class="field"><label for="st-pn">Stage name</label><input id="st-pn" class="input" maxlength="30" value="${esc(PE.name)}" placeholder="e.g. Lyric Tide"></div><div class="field"><label for="st-ps">Genre specialty</label><select id="st-ps" class="select"><option value="">Choose a specialty</option>${specs.map(s => `<option ${PE.spec === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></div><div class="field"><label for="st-pc">Catchphrase</label><input id="st-pc" class="input" maxlength="80" value="${esc(PE.cat)}" placeholder="e.g. Every island has a voice."></div></div></details>
        <details open><summary>Biography Practice</summary><div class="st-fbody"><p class="hint">Write as a biographer, in the third person. Real or created for practice, but always original.</p><div class="field"><label for="st-pb1">Background: where did they grow up? What languages do they speak?</label><textarea id="st-pb1" class="input" rows="2" maxlength="400" data-bio="bg">${esc(PE.bio.bg)}</textarea></div><div class="field"><label for="st-pb2">Influences: who and what shaped their art?</label><textarea id="st-pb2" class="input" rows="2" maxlength="400" data-bio="inf">${esc(PE.bio.inf)}</textarea></div><div class="field"><label for="st-pb3">Voice: how do they sound on stage (register, rhythm, Creole or Standard English)?</label><textarea id="st-pb3" class="input" rows="2" maxlength="400" data-bio="voice">${esc(PE.bio.voice)}</textarea></div><div class="st-biop" id="st-biop">${bioPreview(PE)}</div></div></details>
        <details open><summary>Face & Skin</summary><div class="st-fbody"><p class="hint">Face shape</p>${chipGroup('face', 'Face shape')}<p class="hint">Skin tone</p>${swatches('skin', SKIN, 'Skin tone')}</div></details>
        <details><summary>Hair</summary><div class="st-fbody"><p class="hint">Style</p>${chipGroup('hair', 'Hair style')}<p class="hint">Colour</p>${swatches('hc', HAIRC, 'Hair colour')}</div></details>
        <details><summary>Eyes, Brows & Mouth</summary><div class="st-fbody"><p class="hint">Eyes</p>${chipGroup('eyes', 'Eyes')}<p class="hint">Brows</p>${chipGroup('brows', 'Brows')}<p class="hint">Mouth</p>${chipGroup('mouth', 'Mouth')}</div></details>
        <details><summary>Extras</summary><div class="st-fbody"><p class="hint">Facial hair</p>${chipGroup('fh', 'Facial hair')}<p class="hint">Glasses</p>${chipGroup('gl', 'Glasses')}<p class="hint">Earrings</p>${chipGroup('ear', 'Earrings')}</div></details>
        <details><summary>Outfit</summary><div class="st-fbody"><p class="hint">Style</p>${chipGroup('out', 'Outfit')}<p class="hint">Main colour</p>${swatches('c1', OUTC, 'Main outfit colour')}<p class="hint">Accent colour (also headwrap and hijab)</p>${swatches('c2', OUTC, 'Accent colour')}</div></details>
        <details><summary>Background</summary><div class="st-fbody">${chipGroup('bg', 'Background')}</div></details>
      </div></div>${PE.warn ? `<p class="fb bad" role="alert">${esc(PE.warn)}</p>` : ''}<div class="row"><button type="button" class="btn gold" data-px="pesave">💾 Save Persona</button><button type="button" class="btn ghost" data-px="pecancel">Cancel</button></div></section>`;
    }
    return h;
  }
  function mirrorPers(api, L) { SS(api).p = L.map(p => [p.id, String(p.name).slice(0, 20)]); api.save(); }
  /* ===================== EVENTS ===================== */
  let CUR_W = [100, 500], CUR_WP = false, CUR_F = null, CUR_POEM = false, PE_AUTO = false;
  function ctx(api) {
    const L = api.S.loc || {};
    if (L.v === 'studio' && L.tab === 'poetry' && FBY[L.k]) { const F = FBY[L.k]; return { kind: 'f', id: F.id, F, label: F.n, purpose: `FORM: ${F.about} Rules: ${F.rules.join('; ')}.` }; }
    const G = GBY[L.k] || CUR_G || GENRES[0];
    return { kind: 'g', id: G.id, G, label: G.n, purpose: `PURPOSE AND AUDIENCE: ${G.pa}\nKEY FEATURES: ${G.ft.map(f => f.split('|')[0]).join('; ')}.\nTYPICAL STRUCTURE: ${G.st.join(' > ')}.\nREGISTER: ${G.rg}\nWORD RANGE: ${G.w[0]}-${G.w[1]} words.` };
  }
  function saveCurrent(api) { const c = ctx(api); return savePiece(api, c.kind, c.id, c.label); }
  function focusFb() { setTimeout(() => { const f = document.getElementById('st-fb'); if (f) { try { f.focus({ preventScroll: true }); f.scrollIntoView({ behavior: RM() ? 'auto' : 'smooth', block: 'start' }); } catch (e) { } } }, 40); }
  function doCheck(api) {
    const c = ctx(api), t = String(D.x || '').trim(), S = SS(api);
    if (c.kind === 'g') {
      const G = c.G, n = wc(t), need = G.poem ? 15 : Math.max(30, Math.round(G.w[0] * 0.3));
      if (n < need) { D.warn = `Write at least ${need} words before checking (you have ${n}). The full guide for a ${G.n.toLowerCase()} is ${G.w[0]}–${G.w[1]} words.`; D.fb = null; api.render(); scrollTo('st-warn'); return; }
      D.warn = ''; const R = analyseText(t, G, D.ck), first = !inCsv(S.g, G.ix);
      if (first) { S.g = addCsv(S.g, G.ix); api.save(); R.unlocked = true; }
      D.fb = R; saveDraftNow(); api.render(); focusFb();
      if (first) api.reward(5, `First ${G.n} submitted`);
      return;
    }
    const F = c.F, A = poemAnalysis(t, F);
    if (A.lines < 3) { D.warn = 'Write at least three lines before checking your poem.'; D.fb = null; api.render(); scrollTo('st-warn'); return; }
    D.warn = '';
    const minL = F.acrostic ? Math.max(3, String(D.word || '').replace(/[^A-Za-z]/g, '').length) : (F.lines || (F.stanza ? 8 : 4));
    let issues = []; const WD = window.COURSE_WORDDESK;
    try { issues = WD && typeof WD.check === 'function' ? (WD.check(t, { formal: false }) || []).filter(x => x && x.end > x.start && x.end <= t.length).slice(0, 60) : miniCheck(t, false); } catch (e) { issues = miniCheck(t, false); }
    const first = A.lines >= minL && !inCsv(S.f, F.ix);
    if (first) { S.f = addCsv(S.f, F.ix); api.save(); }
    D.fb = { f: F.id, checks: formChecks(F, A).concat(A.lines < minL ? [{ ok: false, t: `Complete the poem: at least ${minL} lines for a ${F.n.toLowerCase()}` }] : []), text: t, issues, wd: !!(WD && WD.check), first };
    saveDraftNow(); api.render(); focusFb();
    if (first) api.reward(5, `New poetry form: ${F.n}`);
  }
  function refreshPE() {
    const prev = document.getElementById('st-pe-prev'); if (prev && PE) prev.innerHTML = avatarSVG(PE.av, { label: 'Avatar preview' });
    $$('#st-pm [data-grp]').forEach(g => { const k = g.dataset.grp; $$('button', g).forEach(b => { const v = ['skin', 'hc', 'c1', 'c2'].includes(k) ? +b.dataset.v : b.dataset.v; const on = PE.av[k] === v; b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on); }); });
  }
  function scrollTo(id) { setTimeout(() => { const el = document.getElementById(id); if (el) { try { el.scrollIntoView({ behavior: RM() ? 'auto' : 'smooth', block: 'start' }); } catch (e) { } } }, 40); }
  function onClick(action, el, api, ev) {
    A = api;
    const k = el.dataset.k, i = el.dataset.i != null ? +el.dataset.i : null;
    switch (action) {
      /* ---- studio ---- */
      case 'jump': scrollTo('st-g-' + k); return;
      case 'prompt': D.pr = i; saveDraftNow(); api.render(); return;
      case 'plan2draft': { const pl = Object.keys(D.pl).sort((a, b) => a - b).map(x => D.pl[x]).filter(x => x && String(x).trim()); if (!pl.length) { api.toast('Fill in at least one planning box first.'); return; } D.x = (D.x.trim() ? D.x.trim() + '\n\n' : '') + pl.join('\n\n'); D.planOpen = true; saveDraftNow(); api.render(); return; }
      case 'check': doCheck(api); return;
      case 'save': { const p = saveCurrent(api); if (p) { api.render(); api.toast('Saved to My Portfolio'); } return; }
      case 'say': if (!String(D.x || '').trim()) api.toast('Write something first.'); else api.speak(D.x); return;
      case 'saymodel': if (CUR_G && CUR_G.md) api.speak(CUR_G.md); return;
      case 'sayscan': if (SCAN.trim()) api.speak(SCAN); else api.toast('Paste some lines first.'); return;
      case 'perform': { const p = saveCurrent(api); if (p) api.go({ v: 'lounge', tab: 'stage', k: p.id }); return; }
      case 'dl': { if (!String(D.x || '').trim()) { api.toast('Nothing to download yet.'); return; } const c = ctx(api); if (!dlText(D.ti || c.label, (D.ti ? D.ti + '\n\n' : '') + D.x)) api.toast('Download is not available here; copy your text instead.'); return; }
      case 'ai': { const c = ctx(api); runAI(api, c.label, c.purpose); return; }
      case 'sch': D.sch = k; saveDraftNow(); api.render(); return;
      case 'shape': D.shape = k; saveDraftNow(); api.render(); return;
      case 'skeleton': {
        if (D.x.trim() && !D.skelOK) { D.skelOK = true; api.toast('Your editor is not empty. Press again to replace it with the skeleton.'); return; }
        const r1 = String(D.r1 || '').trim() || 'Refrain 1 …', r2 = String(D.r2 || '').trim() || 'Refrain 2 …', x = '…';
        D.x = [[r1, x, r2], [x, x, r1], [x, x, r2], [x, x, r1], [x, x, r2], [x, x, r1, r2]].map(s => s.join('\n')).join('\n\n'); D.skelOK = false; saveDraftNow(); api.render(); return;
      }
      case 'popen': {
        const p = loadPieces().find(x => x.id === k); if (!p) return;
        const key = (p.kind === 'f' ? 'f:' : 'g:') + p.g; saveDraftNow();
        drafts()[key] = Object.assign({}, drafts()[key] || {}, { x: p.x, ti: p.t, pe: p.pe || '', pid: p.id }); LS.set(K_DRAFT, drafts()); if (DK === key) DK = null;
        api.go({ v: 'studio', tab: p.kind === 'f' ? 'poetry' : 'desk', k: p.g }); return;
      }
      case 'pdl': { const p = loadPieces().find(x => x.id === k); if (p && !dlText(p.t, (p.t ? p.t + '\n\n' : '') + p.x)) api.toast('Download is not available here.'); return; }
      case 'pdel': PDEL = k; api.render(); return;
      case 'pdelx': PDEL = ''; api.render(); return;
      case 'pdel2': { const P = loadPieces().filter(x => x.id !== k); LS.set(K_PIECES, P); SS(api).n = P.length; api.save(); if (D && D.pid === k) D.pid = ''; Object.values(drafts()).forEach(d => { if (d && d.pid === k) d.pid = ''; }); LS.set(K_DRAFT, drafts()); if (PF.pid === k) PF.pid = ''; PDEL = ''; api.render(); api.toast('Piece deleted'); return; }
      /* ---- lounge ---- */
      case 'react': { PF.react[k] = (PF.react[k] || 0) + 1; const c = document.getElementById('st-rc-' + k); if (c) c.textContent = PF.react[k]; burst(k, k === 'encore' ? 10 : 4); sfx(k === 'snap' ? 'snap' : k === 'fire' ? 'fire' : k === 'encore' ? 'encore' : 'clap'); if (k === 'encore' && !PF.playing && perfLines().length && PF.mode === 'tts') api.toast('Encore! Press Perform to take it from the top.'); return; }
      case 'mode': stopPerformance(); PF.mode = k === 'self' ? 'self' : 'tts'; api.render(); return;
      case 'play': PF.saved = false; perform(api); return;
      case 'stop': stopPerformance(); PF.i = -1; hiLine(-1); setLive('Stopped. Press Perform to start again.'); syncPlayBtns(); return;
      case 'rec': PF.saved = false; recStart(api); return;
      case 'recstop': recStop(); return;
      case 'recclear': if (REC.url) { try { URL.revokeObjectURL(REC.url); } catch (e) { } } REC.url = ''; REC.state = 'idle'; api.render(); return;
      case 'note': { PF.notes[k] = i; const g = el.parentNode; $$('button', g).forEach(b => { const on = b === el; b.classList.toggle('sel', on); b.setAttribute('aria-checked', on); }); return; }
      case 'billsave': {
        if (!PF.performed) { api.toast('Perform first (Read It for Me to the end, or record yourself), then save your notes.'); return; }
        const piece = perfPiece(), per = loadPers().find(p => p.id === PF.per);
        const B = loadBill(); B.unshift({ id: uid(), ts: Date.now(), t: piece ? piece.t : (lines(PF.paste)[0] || 'Pasted piece').slice(0, 60), pn: per ? per.name : 'Guest Performer', m: PF.mode, r: Object.assign({}, PF.react), n: Object.assign({}, PF.notes), note: String(PF.note || '').slice(0, 300) });
        if (!LS.set(K_BILL, B.slice(0, MAXBILL))) { api.toast('Could not save the playbill (browser storage is blocked).'); return; }
        PF.saved = true; PF.performed = false; const S = SS(api); const pay = S.pf < 10; if (pay) { S.pf++; api.save(); }
        api.render(); if (pay) api.reward(3, 'Performance logged'); else api.toast('Saved to your playbill');
        return;
      }
      case 'billclr': BILL_CLR = true; api.render(); return;
      case 'billclrx': BILL_CLR = false; api.render(); return;
      case 'billclr2': LS.set(K_BILL, []); BILL_CLR = false; api.render(); api.toast('Playbill cleared'); return;
      /* ---- persona maker ---- */
      case 'penew': if (loadPers().length >= MAXPER) { api.toast(`You already have ${MAXPER} personae. Delete one to make room.`); return; } PE = newPE(); api.render(); scrollTo('st-pm'); return;
      case 'peedit': { const p = loadPers().find(x => x.id === k); if (!p) return; PE = { id: p.id, name: p.name || '', bio: Object.assign({ bg: '', inf: '', voice: '' }, p.bio || {}), spec: p.spec || '', cat: p.cat || '', av: normAv(p.av), isNew: false, warn: '' }; api.render(); scrollTo('st-pm'); return; }
      case 'peperf': PF.per = k; api.go({ v: 'lounge', tab: 'stage' }); return;
      case 'pedel': PER_PDEL = k; api.render(); return;
      case 'pedelx': PER_PDEL = ''; api.render(); return;
      case 'pedel2': { const L = loadPers().filter(x => x.id !== k); LS.set(K_PERS, L); mirrorPers(api, L); if (PE && PE.id === k) PE = null; if (PF.per === k) PF.per = ''; if (D && D.pe === k) D.pe = ''; PER_PDEL = ''; api.render(); api.toast('Persona deleted'); return; }
      case 'pav': { if (!PE) return; const kk = el.dataset.k, v = el.dataset.v; PE.av[kk] = ['skin', 'hc', 'c1', 'c2'].includes(kk) ? +v : v; refreshPE(); return; }
      case 'perand': if (!PE) return; PE.av = randAv(); refreshPE(); return;
      case 'pecancel': PE = null; PE_AUTO = true; api.render(); return;
      case 'pesave': {
        if (!PE) return; const name = String(PE.name || '').trim();
        if (name.length < 2) { PE.warn = 'Give your persona a stage name (at least 2 characters).'; api.render(); scrollTo('st-pm'); return; }
        const L = loadPers(); let isNew = PE.isNew;
        const obj = { id: PE.id || uid(), name: name.slice(0, 30), bio: { bg: String(PE.bio.bg || '').slice(0, 400), inf: String(PE.bio.inf || '').slice(0, 400), voice: String(PE.bio.voice || '').slice(0, 400) }, spec: PE.spec, cat: String(PE.cat || '').slice(0, 80), av: normAv(PE.av) };
        const ix = L.findIndex(x => x.id === obj.id);
        if (ix >= 0) { L[ix] = obj; isNew = false; } else { if (L.length >= MAXPER) { PE.warn = `You already have ${MAXPER} personae.`; api.render(); return; } L.push(obj); }
        if (!LS.set(K_PERS, L)) { PE.warn = 'Could not save: browser storage is full or blocked.'; api.render(); return; }
        mirrorPers(api, L); PE = null; PE_AUTO = true;
        const S = SS(api), pay = isNew && (S.pc | 0) < MAXPER; if (pay) { S.pc = (S.pc | 0) + 1; api.save(); }
        api.render(); if (pay) api.reward(5, 'Persona created: ' + obj.name); else api.toast('Persona saved');
        return;
      }
    }
  }

  /* ===================== MOUNT ===================== */
  function filterLib(q) {
    q = String(q || '').toLowerCase().trim(); let any = false;
    $$('.st-grp').forEach(sec => { let vis = 0; $$('.st-tile', sec).forEach(t => { const on = !q || (t.dataset.name || '').includes(q); t.hidden = !on; if (on) vis++; }); sec.hidden = !vis; if (vis) any = true; });
    const n = $('.st-none'); if (n) n.hidden = any;
  }
  function liveWrite() {
    const W = wcInfo(CUR_W[0], CUR_W[1], CUR_WP), wcEl = document.getElementById('st-wc'), bar = document.getElementById('st-wbar');
    if (wcEl) { wcEl.textContent = W.msg; wcEl.className = 'st-wc ' + W.cls; } if (bar) bar.style.width = W.pct + '%';
    const pt = document.getElementById('st-ptools'); if (pt && CUR_POEM) pt.innerHTML = poemPanelHTML(CUR_F);
  }
  function studioMount(api, loc, root) {
    A = api; root = root || document;
    const q = $('#st-q', root); if (q) q.addEventListener('input', () => filterLib(q.value));
    const ta = $('#st-ta', root); if (ta) ta.addEventListener('input', () => { D.x = ta.value; D.skelOK = false; liveWrite(); saveDraftSoon(); });
    const bind = (id, fn, ev) => { const el = $('#' + id, root); if (el) el.addEventListener(ev || 'input', () => fn(el)); };
    bind('st-ti', el => { D.ti = el.value; saveDraftSoon(); });
    bind('st-own', el => { D.own = el.value; saveDraftSoon(); });
    bind('st-pe', el => { D.pe = el.value; saveDraftNow(); api.render(); }, 'change');
    bind('st-word', el => { D.word = el.value; saveDraftSoon(); liveWrite(); });
    bind('st-r1', el => { D.r1 = el.value; saveDraftSoon(); liveWrite(); });
    bind('st-r2', el => { D.r2 = el.value; saveDraftSoon(); liveWrite(); });
    bind('st-scan', el => { SCAN = el.value.slice(0, 3000); const o = $('#st-scanout'); if (o) o.innerHTML = scanHTML(); });
    $$('[data-pl]', root).forEach(el => el.addEventListener('input', () => { D.pl[el.dataset.pl] = el.value; saveDraftSoon(); }));
    $$('[data-ck]', root).forEach(el => el.addEventListener('change', () => { D.ck[el.dataset.ck] = el.checked; saveDraftSoon(); }));
    const pl = $('.st-plan', root); if (pl) pl.addEventListener('toggle', () => { D.planOpen = pl.open; });
  }
  let VOICE_L = false;
  function populateVoices() {
    const sel = document.getElementById('st-voice'); if (!sel || !ttsOK()) return;
    let vs = []; try { vs = window.speechSynthesis.getVoices() || []; } catch (e) { }
    vs = vs.slice().sort((a, b) => (/^en/i.test(b.lang || '') - /^en/i.test(a.lang || '')) || String(a.name).localeCompare(String(b.name)));
    sel.innerHTML = `<option value="">Default voice</option>` + vs.map(v => `<option value="${esc(v.name)}" ${v.name === PF.voice ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang || '')})</option>`).join('');
  }
  function loungeMount(api, loc, root) {
    A = api; root = root || document;
    const bind = (id, fn, ev) => { const el = $('#' + id, root); if (el) el.addEventListener(ev || 'input', () => fn(el)); };
    bind('st-piece', el => { stopPerformance(); PF.pid = el.value; PF.lk = ''; resetPerf(); const p = perfPiece(); if (p && p.pe) PF.per = p.pe; api.render(); }, 'change');
    bind('st-paste', el => { PF.paste = el.value.slice(0, MAXC); const L = perfLines(), box = $('#st-lyrics'); if (box) box.innerHTML = L.length ? L.map((l, i) => `<p data-l="${i}">${esc(l)}</p>`).join('') : '<p class="hint">Your lines will appear here.</p>'; if (!PF.playing && REC.state !== 'rec') setLive(L.length ? `Ready: ${L.length} line${L.length === 1 ? '' : 's'} on the teleprompter` : 'Choose a piece to begin'); });
    bind('st-per', el => { PF.per = el.value; api.render(); }, 'change');
    bind('st-voice', el => { PF.voice = el.value; }, 'change');
    bind('st-rate', el => { PF.rate = clamp(+el.value || 1, 0.5, 2); const v = $('#st-ratev'); if (v) v.textContent = PF.rate.toFixed(1) + '×'; });
    bind('st-pitch', el => { PF.pitch = clamp(+el.value || 1, 0, 2); const v = $('#st-pitchv'); if (v) v.textContent = PF.pitch.toFixed(1); });
    bind('st-note', el => { PF.note = el.value; });
    bind('st-pn', el => { if (!PE) return; PE.name = el.value; const n = $('#st-pe-name'); if (n) n.textContent = el.value || 'Your stage name'; const b = $('#st-biop'); if (b) b.innerHTML = bioPreview(PE); });
    bind('st-ps', el => { if (!PE) return; PE.spec = el.value; const b = $('#st-biop'); if (b) b.innerHTML = bioPreview(PE); }, 'change');
    bind('st-pc', el => { if (!PE) return; PE.cat = el.value; const n = $('#st-pe-cat'); if (n) n.textContent = el.value ? '“' + el.value + '”' : ''; });
    $$('[data-bio]', root).forEach(el => el.addEventListener('input', () => { if (!PE) return; PE.bio[el.dataset.bio] = el.value; const b = $('#st-biop'); if (b) b.innerHTML = bioPreview(PE); }));
    populateVoices();
    if (!VOICE_L && ttsOK()) { VOICE_L = true; try { window.speechSynthesis.addEventListener('voiceschanged', populateVoices); } catch (e) { } }
    if (PF.playing) { hiLine(PF.i); syncPlayBtns(); }
  }

  /* ===================== REGISTER ===================== */
  function studioRender(api, loc) {
    A = api; if (api.esc) ESC = api.esc; SS(api);
    if (PF.playing || REC.state === 'rec') stopPerformance();
    const tab = loc.tab || 'library';
    let h = '<div class="st">';
    if (tab === 'desk') h += deskHTML(api, GBY[loc.k] || GENRES[0]);
    else if (tab === 'poetry') h += poetryHTML(api, loc);
    else if (tab === 'portfolio') h += portfolioHTML(api);
    else h += libraryHTML(api);
    if (tab !== 'desk' && !(tab === 'poetry' && FBY[loc.k])) { CUR_POEM = false; }
    return h + '</div>';
  }
  function loungeRender(api, loc) {
    A = api; if (api.esc) ESC = api.esc; SS(api);
    const tab = loc.tab || 'stage';
    if (tab !== 'stage' && (PF.playing || REC.state === 'rec')) stopPerformance();
    let h = '<div class="st st-lounge">';
    if (tab === 'personae') { if (!PE && !PE_AUTO && !loadPers().length) { PE = newPE(); } PE_AUTO = true; h += personaHTML(api); }
    else if (tab === 'playbill') h += playbillHTML(api);
    else h += stageHTML(api, loc);
    return h + '</div>';
  }
  const STUDIO = { view: 'studio', title: "Writers' Studio", tile: { icon: '✍️', meta: `${GENRES.length} genres, Poetry Craft builders and your own portfolio` }, render: studioRender, mount: studioMount, click: onClick };
  const LOUNGE = { view: 'lounge', title: 'Open Mic Lounge', tile: { icon: '🎙️', meta: 'Perform your writing on a virtual stage with your own personae' }, render: loungeRender, mount: loungeMount, click: onClick };
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push(STUDIO, LOUNGE);
  window.COURSE_STUDIO = { genres: GENRES, forms: FORMS, devices: DEVICES, syl, sylLine, rhymeKey, avatarSVG, detect };
})();
