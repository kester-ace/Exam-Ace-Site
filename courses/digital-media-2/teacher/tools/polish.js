/* Shared course polish: accordions styling, obvious selected answers, overflow-safe text,
   read-aloud on every page with a voice picker, profile picture, textbook figures in the notes,
   full screen for games embedded in tool pages, collapsible sidebar sections.
   Loaded before engine.js in every course. */
(function () {
  'use strict';
  const ACC_CSS = `/* sidebar outline */
.smodrow{display:flex;align-items:stretch;gap:4px}
.smodrow .smod{flex:1;min-width:0}
.stog{flex:none;width:34px;border-radius:10px;border:1.5px solid transparent;background:transparent;color:inherit;font-size:1rem;cursor:pointer;transition:transform .2s}
.stog:hover{border-color:var(--gold)}
.sgroup:not(.sopen) .stog{transform:rotate(-90deg)}
.sgroup.sopen>.sunit,.sgroup.sopen>.sscreen{animation:sdrop .18s ease-out}
@keyframes sdrop{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.stog{transition:none}.sgroup.sopen>.sunit,.sgroup.sopen>.sscreen{animation:none}}
.uacc-list{display:grid;gap:10px;margin-top:12px}
.uacc{border:2px solid var(--line);border-radius:14px;background:var(--raise);overflow:hidden}
.uacc[open]{border-color:var(--gold)}
.uacc.done{border-left:6px solid var(--ok)}
.uacc>summary{display:flex;gap:12px;align-items:center;padding:12px 14px;cursor:pointer;list-style:none}
.uacc>summary::-webkit-details-marker{display:none}
.uacc>summary:hover{background:color-mix(in srgb,var(--gold) 8%,transparent)}
.uacc>summary:focus-visible{outline:3px solid var(--gold);outline-offset:-3px}
.uacc>summary .t{flex:1;min-width:0}
.uacc>summary .s{font-size:.82rem;color:var(--muted);font-variant-numeric:tabular-nums}
.uacc-chev{transition:transform .2s;font-size:1.1rem}
.uacc[open] .uacc-chev{transform:rotate(180deg)}
.uacc.locked>summary{opacity:.7}
.uacc-bar{display:block;height:5px;border-radius:9px;background:var(--line);margin-top:6px;max-width:260px;overflow:hidden}
.uacc-bar i{display:block;height:100%;background:var(--gold);border-radius:9px}
.uacc-body{padding:4px 16px 16px;border-top:1.5px solid var(--line)}
.uacc-body h4{margin:12px 0 6px}
.uacc-body .lrow{background:var(--surface)}
@media (prefers-reduced-motion:reduce){.uacc-chev{transition:none}}`;
  const CSS = ACC_CSS + `
/* ---- selected answers: unmistakable in every question type and skin ---- */
.opt.sel,.qc-opt.sel,.chip.sel,.mcard.sel,.pickline.sel,.pline.sel,.pick-line.sel,[data-pk].sel,.lineopt.sel,.sitem.sel,.tok.sel,.blk.sel,.oitem.sel{outline:3px solid var(--gold)!important;outline-offset:2px;position:relative}
.opt.sel::after,.qc-opt.sel::after{content:"✓ Selected";position:absolute;right:10px;top:50%;transform:translateY(-50%);font:800 .72rem/1 var(--f-body,system-ui),sans-serif;letter-spacing:.02em;padding:4px 8px;border-radius:99px;background:var(--gold);color:var(--on-gold,#0A1433);pointer-events:none}
.opt.sel,.qc-opt.sel{padding-right:96px!important}
.opt.right::after,.qc-opt.right::after{content:"✓ Correct";position:absolute;right:10px;top:50%;transform:translateY(-50%);font:800 .72rem/1 var(--f-body,system-ui),sans-serif;padding:4px 8px;border-radius:99px;background:var(--ok);color:#06210F;pointer-events:none}
.opt.wrong::after,.qc-opt.wrong::after{content:"✗ Your answer";position:absolute;right:10px;top:50%;transform:translateY(-50%);font:800 .72rem/1 var(--f-body,system-ui),sans-serif;padding:4px 8px;border-radius:99px;background:var(--bad);color:#2A0702;pointer-events:none}
.opt.right,.opt.wrong,.qc-opt.right,.qc-opt.wrong{position:relative;padding-right:110px!important}
#stage .mcard.sel{background:linear-gradient(180deg,#FFF0B3,var(--gold) 60%)!important;background-image:linear-gradient(180deg,#FFF0B3,var(--gold) 60%)!important;border-color:var(--gold)!important;box-shadow:0 0 0 3px rgba(255,215,102,.45),0 8px 18px -8px rgba(0,0,0,.6)!important}
#stage .mcard.sel,#stage .mcard.sel *{color:var(--on-gold,#0A1433)!important}
#stage article.card .chip.sel::before,#stage .mcard.sel::before{content:"✓";font-weight:900;margin-right:6px}
#stage .ps.sel{box-shadow:inset 4px 0 0 var(--gold-deep,#C99A1C)}
#stage .ps.sel::before{content:"✓ ";font-weight:900}
select.sel,select:not([value=""]):focus{outline:3px solid var(--gold);outline-offset:1px}
@media (max-width:520px){.opt.sel,.qc-opt.sel,.opt.right,.opt.wrong,.qc-opt.right,.qc-opt.wrong{padding-right:14px!important;padding-top:28px!important}.opt.sel::after,.qc-opt.sel::after,.opt.right::after,.opt.wrong::after,.qc-opt.right::after,.qc-opt.wrong::after{top:6px;right:8px;transform:none}}
/* ---- text never overflows its card ---- */
#stage .card,#stage .html-body,#stage .tile,#stage .lrow,#stage .opt,#stage .btn,#stage .chip,#stage td,#stage th,#stage li,#stage p,#stage h1,#stage h2,#stage h3,#stage h4,#stage summary,.side .slink{overflow-wrap:break-word;word-break:normal}
#stage .card,#stage .lrow .t,#stage .tile{min-width:0}
#stage .btn,#stage .chip,#stage .lrow,#stage .opt{white-space:normal;height:auto}
#stage h1{font-size:clamp(1.35rem,1rem + 2.2vw,2.2rem);line-height:1.18}
#stage h2{font-size:clamp(1.15rem,.95rem + 1.4vw,1.7rem);line-height:1.22}
#stage h3{font-size:clamp(1.02rem,.9rem + .8vw,1.3rem)}
#stage .html-body table,#stage .card>table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}
#stage pre,#stage code{white-space:pre-wrap;overflow-wrap:anywhere}
#stage pre{max-width:100%;overflow-x:auto}
#stage img,#stage video,#stage iframe,#stage svg,#stage canvas{max-width:100%}
#stage .tile,#stage .card{overflow:hidden}
#stage .tile b,#stage .tile .meta{display:block}

/* ---- flip cards: real card faces that turn over ---- */
#stage .flip{display:block!important;position:relative!important;perspective:1100px;min-height:170px;width:100%;padding:0!important;margin:0;border:0!important;background:none!important;background-image:none!important;box-shadow:none!important;text-align:left;color:inherit;font:inherit;cursor:pointer}
#stage .flip::before,#stage .flip::after{display:none!important;content:none!important}
#stage .flip>.inner{display:grid!important;position:relative;min-height:170px;height:100%;transition:transform .6s cubic-bezier(.2,.75,.25,1);transform-style:preserve-3d}
#stage .flip.on>.inner{transform:rotateY(180deg)}
#stage .flip .face{position:relative!important;inset:auto!important;grid-area:1/1;display:flex!important;flex-direction:column;justify-content:center;align-items:flex-start;gap:8px;padding:16px 18px!important;border-radius:16px;border:1.5px solid var(--line)!important;background:var(--surface)!important;box-shadow:var(--shadow);backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:visible;color:var(--ink);text-align:left;width:auto!important;height:auto!important;min-height:170px}
#stage .flip .face>*{flex:none!important;white-space:normal!important;max-width:100%}
#stage .flip .face b{font-size:1.05rem;line-height:1.35}
#stage .flip .face .ribbon{white-space:nowrap!important;width:auto!important;align-self:flex-start;font-size:.72rem}
#stage .flip .back{transform:rotateY(180deg);background:linear-gradient(160deg,rgba(245,197,66,.2),transparent),var(--surface)!important;border-color:var(--gold)!important}
#stage .flip:focus-visible>.inner .face{outline:3px solid var(--gold);outline-offset:2px}
#stage .flip:not(.on) .face:not(.back)::after{content:"Tap to flip ↻";position:absolute;right:12px;bottom:10px;font-size:.72rem;color:var(--muted)}
@media (prefers-reduced-motion:reduce){#stage .flip>.inner{transition:none}}
/* ---- textbook figures ---- */
.nfig{margin:18px 0 6px;padding:14px;border:1.5px solid var(--line);border-radius:14px;background:var(--raise,rgba(255,255,255,.04))}
.nfig svg{display:block;width:100%;height:auto;max-height:70vh}
.nfig svg text{fill:var(--ink);font-family:var(--f-body,system-ui),sans-serif}
.nfig figcaption{margin-top:10px;font-size:.92rem;color:var(--muted)}
.nfig figcaption b{color:var(--ink);display:block;margin-bottom:2px}
.nfig .nfig-zoom{float:right;margin:-4px -4px 6px 8px}
.nfig.photo img{display:block;width:100%;height:auto;border-radius:10px}
.nfig-full{position:fixed;inset:0;z-index:2147482000;background:rgba(3,8,24,.94);display:grid;place-items:center;padding:16px;overflow:auto}
.nfig-full svg{width:min(1100px,96vw);height:auto;max-height:90vh}
.f-ink{fill:var(--ink)}.f-muted{fill:var(--muted)}.f-gold{fill:var(--gold)}.f-blue{fill:var(--blue)}.f-ok{fill:var(--ok)}.f-bad{fill:var(--bad)}.f-surface{fill:var(--surface)}.f-soft{fill:var(--soft-gold)}.f-softb{fill:var(--soft-blue)}.f-softok{fill:var(--soft-ok)}.f-softbad{fill:var(--soft-bad)}.f-none{fill:none}
.nfig svg text.f-ongold,.nfig svg .f-ongold{fill:var(--on-gold)}.nfig svg text.f-muted{fill:var(--muted)}.nfig svg text.f-gold{fill:var(--gold)}.nfig svg text.f-ok{fill:var(--ok)}.nfig svg text.f-bad{fill:var(--bad)}
.s-ink{stroke:var(--ink)}.s-muted{stroke:var(--muted)}.s-gold{stroke:var(--gold)}.s-line{stroke:var(--line)}.s-ok{stroke:var(--ok)}.s-bad{stroke:var(--bad)}
/* ---- read aloud on every page ---- */
#rd-fab{position:fixed;right:14px;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:22;display:flex;gap:6px;align-items:center}
#rd-fab button{font:700 .9rem/1 var(--f-body,system-ui),sans-serif;border:2px solid var(--gold);border-radius:99px;background:var(--surface);color:var(--ink);padding:10px 14px;cursor:pointer;box-shadow:0 6px 18px -6px rgba(0,0,0,.6);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
#rd-fab button:hover,#rd-fab button:focus-visible{background:var(--gold);color:var(--on-gold)}
#rd-fab .rd-set{padding:10px 11px}
#rd-pop{position:fixed;right:14px;bottom:calc(72px + env(safe-area-inset-bottom,0px));z-index:23;width:min(340px,calc(100vw - 28px));background:var(--surface);color:var(--ink);border:2px solid var(--gold);border-radius:16px;padding:14px;box-shadow:var(--shadow,0 10px 30px rgba(0,0,0,.5));-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
#rd-pop label{display:block;font-weight:700;margin:6px 0 4px}
#rd-pop select{width:100%;font:inherit;padding:8px;border-radius:10px;border:2px solid var(--line);background:var(--bg2,#0B1A46);color:var(--ink)}
#rd-pop .row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
#rd-pop p{margin:6px 0 0;font-size:.85rem;color:var(--muted)}
body.gx-open #rd-fab,body.gx-open #rd-pop{display:none}
@media print{#rd-fab,#rd-pop{display:none!important}}
/* ---- sidebar sections fold ---- */
.side .slabel.fold-h{cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:8px;user-select:none}
.side .slabel.fold-h::after{content:"▾";transition:transform .2s;font-size:1rem;flex:none;width:34px;text-align:center;line-height:1;letter-spacing:0;color:var(--ink);opacity:.9;font-weight:300;margin-right:-9px}
.side .slabel.fold-h.shut::after{transform:rotate(-90deg)}
.side .slabel.fold-h:focus-visible{outline:2px solid var(--gold);outline-offset:2px;border-radius:6px}
.side .fold-hide{display:none!important}
/* ---- photo avatar + misc ---- */
.avatar.photo{overflow:hidden;padding:0!important}
.pf-photo{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
.pf-photo .prev{width:96px;height:96px;border-radius:50%;overflow:hidden;border:3px solid var(--gold);display:grid;place-items:center;background:var(--raise);font-size:2.4rem;flex:none}
.pf-photo .prev img{width:100%;height:100%;object-fit:cover}
.btn.sm{padding:6px 12px;font-size:.86rem}
.flash{animation:pzflash 1.3s ease-out}
@keyframes pzflash{0%{box-shadow:0 0 0 0 rgba(255,215,102,.0)}20%{box-shadow:0 0 0 6px rgba(255,215,102,.55)}100%{box-shadow:0 0 0 0 rgba(255,215,102,0)}}
.ifr-fs-wrap{position:relative}
.ifr-fs{position:absolute;right:8px;top:8px;z-index:3;font:700 12px/1 system-ui,sans-serif;color:#fff;background:rgba(10,20,51,.85);border:1px solid rgba(245,197,66,.8);border-radius:99px;padding:7px 11px;cursor:pointer}
.ifr-fs:hover{background:#F5C542;color:#0A1433}
.stage-in{animation:pzin .28s cubic-bezier(.2,.8,.2,1)}
@keyframes pzin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.stage-in{animation:none}}
`;
  const st = document.createElement('style'); st.id = 'course-polish'; st.textContent = CSS; (document.head || document.documentElement).appendChild(st);

  /* Late rules: added after the page's own styles so they win. Softer selected answer (custard, navy letter) and lighter type. */
  const LATE_CSS = `
:root{--f-body:"Atkinson Hyperlegible Next","Atkinson Hyperlegible","Verdana","Segoe UI",system-ui,sans-serif;--sel-bg:#F8EDC6;--sel-bg2:#F3E2AA;--sel-line:#D9BD6A;--sel-ink:#1B2433;--navy:#1F3864}
html body{font-weight:300}
html body b,html body strong,html body th,html body summary,html body label{font-weight:600}
html body h1,html body h2,html body h3,html body h4,html body #stage h1,html body #stage h2,html body #stage h3,html body #stage h4,html body #stage summary{font-weight:600!important}
html body .brand,html body .tile h3,html body .mcardx h3,html body .smod{font-weight:600!important}
html body .btn,html body .chip,html body .tool,html body .hbtn,html body .kicker,html body .eyebrow,html body .ribbon,html body .pill,html body .lx-pill,html body .slink.on,html body .q,html body .qnum,html body .mtag,html body .letter{font-weight:600!important}
html body .score,html body .lx-score,html body .coinpill,html body .cdown{font-weight:700!important}
html body .opt.sel,html body .opt.sel:hover,html body .opt.sel:focus,html body .opt.sel:active,html body .qc-opt.sel,html body .mcard.sel,html body .blk.sel{background-image:linear-gradient(180deg,var(--sel-bg),var(--sel-bg2))!important;background-color:var(--sel-bg)!important;background-clip:padding-box!important;border:2px solid var(--sel-line)!important;outline:2px solid var(--navy)!important;outline-offset:1px!important;box-shadow:0 2px 0 rgba(0,0,0,.18),0 6px 14px -8px rgba(0,0,0,.35)!important;color:var(--sel-ink)!important;font-weight:400!important}
html body .opt.sel *:not(.letter):not(.letter *),html body .qc-opt.sel *:not(.L),html body .mcard.sel *:not(.mtag){color:var(--sel-ink)!important}
html body .opt.sel .letter,html body .qc-opt.sel .L,html body .mcard.sel .mtag{background:var(--navy)!important;color:#fff!important;border-color:var(--navy)!important;box-shadow:0 0 0 2px rgba(31,56,100,.25)!important}
html body .opt.sel::after,html body .qc-opt.sel::after{background:var(--navy)!important;color:#fff!important;font-weight:600!important}
details.hfold{border:1px solid var(--line);border-radius:16px;background:var(--surface);box-shadow:var(--shadow);overflow:hidden}
details.hfold>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:10px;padding:14px 18px;font-family:var(--f-display);font-weight:600;font-size:1.12rem}
details.hfold>summary::-webkit-details-marker{display:none}
details.hfold>summary::before{content:'▸';display:inline-block;transition:transform .2s;color:var(--gold)}
details.hfold[open]>summary::before{transform:rotate(90deg)}
details.hfold>summary .hf-t{flex:1;min-width:0}
details.hfold>summary .hf-n{font:600 .78rem var(--f-body);padding:2px 9px;border-radius:99px;background:var(--soft-gold);color:var(--ink)}
details.hfold>summary:hover{background:var(--raise)}
details.hfold>summary:focus-visible{outline:3px solid var(--gold);outline-offset:-3px}
details.hfold .hf-body{padding:4px 16px 18px;display:flex;flex-direction:column;gap:14px}
details.hfold.hsec{border-color:var(--line)}
html body #side .slink.on,html body #side .slink.on:hover,html body #side .smod.on{border:0!important;border-color:transparent!important;background-image:none!important;background:rgba(255,255,255,.09)!important;box-shadow:none!important;outline:none!important}
:root[data-skin="daylight"] html body #side .slink.on,html body:has(:root[data-skin="daylight"]) #side .slink.on{background:rgba(14,31,85,.08)!important}
html body #side .stog,html body #side .stog:hover,html body #side .stog:focus{border-color:transparent!important;box-shadow:none!important;background:transparent!important;background-image:none!important}
html body #side .stog:focus-visible{outline:2px solid var(--line)!important}
details.hfold>summary::before{color:inherit!important;opacity:.8}
.flagstrip{gap:12px 10px!important;align-items:flex-start}
.flitem{display:inline-flex;flex-direction:column;align-items:center;gap:5px;width:78px}
.flitem .fl{width:64px!important}
.flcap{font:500 .74rem/1.2 var(--f-body);text-align:center;color:inherit;opacity:.95;overflow-wrap:break-word;max-width:78px}
`;
  function late() { if (document.getElementById('course-polish-late')) return; const s2 = document.createElement('style'); s2.id = 'course-polish-late'; s2.textContent = LATE_CSS; (document.body || document.documentElement).appendChild(s2); }
  try { if (!document.querySelector('link[data-fnext]')) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.dataset.fnext = '1'; l.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:ital,wght@0,200..800;1,200..800&display=swap'; (document.head || document.documentElement).appendChild(l); } } catch (e) { }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', late); else late();

  const COURSE = (document.title || 'course').split(' · ')[0].trim();
  const LSG = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const LSS = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { } };
  const PH_KEY = 'course.photo.' + COURSE;
  window.COURSE_PHOTO = LSG(PH_KEY) || null;
  const API = () => window.COURSE_API;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- figures in the notes ---------- */
  function curScreen() {
    const A = API(); if (!A) return null; const L = A.S.loc || {};
    if (L.v !== 'screen') return null;
    const m = (window.COURSE_MODULES || []).find(x => x.id === L.m); if (!m) return null;
    const u = m.units[L.u]; if (!u) return null; const s = u.screens[L.s]; if (!s) return null;
    return { m, u, s };
  }
  function figHTML(f, i) {
    if (f.img) return `<figure class="nfig photo" data-fig="${i}"><img src="${esc(f.img)}" alt="${esc(f.alt || '')}" loading="lazy"><figcaption><b>${esc(f.title || '')}</b>${esc(f.caption || '')}${f.credit ? ` <span class="hint">${esc(f.credit)}</span>` : ''}</figcaption></figure>`;
    return `<figure class="nfig" data-fig="${i}" role="group" aria-label="${esc(f.title || 'Figure')}"><button type="button" class="btn ghost sm nfig-zoom" data-figzoom="${i}" aria-label="Enlarge figure">⤢ Enlarge</button>${f.svg}<figcaption><b>${esc(f.title || '')}</b>${esc(f.caption || '')}</figcaption><span class="sr" style="position:absolute;left:-9999px">${esc(f.alt || '')}</span></figure>`;
  }
  function placeFigures() {
    const c = curScreen(); if (!c || c.s.type !== 'learn') return;
    const figs = ((window.COURSE_FIGS || {})[c.u.id] || []).filter(f => f.screen === c.s.title);
    if (!figs.length) return;
    const body = document.querySelector('#stage article.card .html-body') || document.querySelector('#stage .card .html-body');
    if (!body || body.querySelector('.nfig')) return;
    body.insertAdjacentHTML('beforeend', figs.map((f, i) => figHTML(f, (window.COURSE_FIGS[c.u.id] || []).indexOf(f))).join(''));
  }
  document.addEventListener('click', e => {
    const z = e.target.closest && e.target.closest('[data-figzoom]'); if (!z) return;
    const c = curScreen(); if (!c) return; const f = (window.COURSE_FIGS[c.u.id] || [])[+z.dataset.figzoom]; if (!f) return;
    const ov = document.createElement('div'); ov.className = 'nfig-full'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', f.title || 'Figure');
    ov.innerHTML = `<div style="max-width:100%"><div class="nfig" style="border:0;background:transparent">${f.svg}<figcaption><b>${esc(f.title || '')}</b>${esc(f.caption || '')}</figcaption></div><div class="row" style="justify-content:center;margin-top:10px"><button type="button" class="btn gold">Close</button></div></div>`;
    ov.addEventListener('click', ev => { if (ev.target === ov || ev.target.closest('button')) ov.remove(); });
    document.addEventListener('keydown', function k(ev) { if (ev.key === 'Escape') { ov.remove(); document.removeEventListener('keydown', k); } });
    document.body.appendChild(ov); const b = ov.querySelector('button'); if (b) b.focus();
  });

  /* ---------- profile picture ---------- */
  function photoCard() {
    const A = API(); if (!A || (A.S.loc || {}).v !== 'profile') return;
    const stage = document.querySelector('#stage .stage-in'); if (!stage || stage.querySelector('.pf-photo')) return;
    const P = A.S.profile || {}, on = window.COURSE_PHOTO && String(P.avatar || '').indexOf('photo:') === 0;
    const html = `<div class="card"><h3>Profile picture</h3><div class="pf-photo"><div class="prev">${window.COURSE_PHOTO ? `<img src="${window.COURSE_PHOTO}" alt="Your profile picture">` : '🙂'}</div><div style="display:flex;flex-direction:column;gap:8px;min-width:0;flex:1"><p class="hint" style="margin:0">Upload a photo or picture to use as your avatar. It is resized and kept on this device only.</p><div class="row"><label class="btn gold" style="cursor:pointer">📷 ${window.COURSE_PHOTO ? 'Change picture' : 'Upload a picture'}<input type="file" accept="image/*" id="pf-photo-in" style="position:absolute;left:-9999px"></label>${window.COURSE_PHOTO ? `<button type="button" class="btn ghost" data-pfph="${on ? 'off' : 'use'}">${on ? 'Use an emoji avatar instead' : 'Use my picture as avatar'}</button><button type="button" class="btn ghost" data-pfph="del">Remove picture</button>` : ''}</div></div></div></div>`;
    const first = stage.querySelector('.card');
    if (first) first.insertAdjacentHTML('afterend', html); else stage.insertAdjacentHTML('afterbegin', html);
    const inp = stage.querySelector('#pf-photo-in');
    if (inp) inp.addEventListener('change', () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      if (!/^image\//.test(f.type)) { A.toast('Please choose an image file.'); return; }
      const img = new Image(), url = URL.createObjectURL(f);
      img.onload = () => {
        const N = 192, cv = document.createElement('canvas'); cv.width = N; cv.height = N; const x = cv.getContext('2d');
        const sz = Math.min(img.width, img.height); x.drawImage(img, (img.width - sz) / 2, (img.height - sz) / 2, sz, sz, 0, 0, N, N);
        const data = cv.toDataURL('image/jpeg', .84); URL.revokeObjectURL(url);
        window.COURSE_PHOTO = data; LSS(PH_KEY, data);
        A.S.profile = A.S.profile || {}; A.S.profile.avatar = 'photo:' + (Date.now() % 1e8).toString(36); A.save(); A.toast('Profile picture saved'); A.render(); refreshTop();
      };
      img.onerror = () => { URL.revokeObjectURL(url); A.toast('That picture could not be read. Try a JPG or PNG.'); };
      img.src = url;
    });
  }
  function refreshTop() { const A = API(); if (!A) return; const h = document.getElementById('havatar'), P = A.S.profile || {}; if (h && window.COURSE_PHOTO && String(P.avatar || '').indexOf('photo:') === 0) { const im = h.querySelector('img'); if (im && im.getAttribute('src') === window.COURSE_PHOTO && h.children.length === 1) return; h.innerHTML = `<img src="${window.COURSE_PHOTO}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block">`; h.style.overflow = 'hidden'; } }
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-pfph]'); if (!b) return; const A = API(); if (!A) return;
    A.S.profile = A.S.profile || {};
    if (b.dataset.pfph === 'del') { window.COURSE_PHOTO = null; LSS(PH_KEY, null); if (String(A.S.profile.avatar || '').indexOf('photo:') === 0) A.S.profile.avatar = null; }
    else if (b.dataset.pfph === 'use') A.S.profile.avatar = 'photo:' + (Date.now() % 1e8).toString(36);
    else A.S.profile.avatar = null;
    A.save(); A.render(); try { const h = document.getElementById('havatar'); if (h && !window.COURSE_PHOTO) h.style.overflow = ''; } catch (e) { }
  });

  /* ---------- read aloud on every page ---------- */
  function pageText() {
    const st = document.querySelector('#stage .stage-in'); if (!st) return '';
    const c = st.cloneNode(true);
    c.querySelectorAll('button,select,textarea,input,script,style,svg,.foot,.crumbs,.pbar,.nav,.tools,[aria-hidden="true"],.sr,details:not([open])>:not(summary)').forEach(n => n.remove());
    return (c.innerText || c.textContent || '').replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, ' ').replace(/\s+/g, ' ').trim();
  }
  let reading = false;
  function fab() {
    if (document.getElementById('rd-fab') || typeof speechSynthesis === 'undefined') return;
    const d = document.createElement('div'); d.id = 'rd-fab';
    d.innerHTML = '<button type="button" class="rd-go" aria-label="Read this page aloud">🔊 Read page</button><button type="button" class="rd-set" aria-label="Reading voice settings" title="Voice settings">⚙</button>';
    document.body.appendChild(d);
    d.querySelector('.rd-go').addEventListener('click', () => {
      const A = API(); if (!A) return;
      if (reading || speechSynthesis.speaking) { A.stopSpeak(); reading = false; paint(); return; }
      const t = pageText(); if (!t) { A.toast('Nothing to read on this page.'); return; }
      reading = true; paint(); A.speak(t);
      const poll = setInterval(() => { if (!speechSynthesis.speaking && !speechSynthesis.pending) { clearInterval(poll); reading = false; paint(); } }, 600);
    });
    d.querySelector('.rd-set').addEventListener('click', togglePop);
  }
  function paint() { const b = document.querySelector('#rd-fab .rd-go'); if (b) b.textContent = reading ? '■ Stop reading' : '🔊 Read page'; }
  function togglePop() {
    let p = document.getElementById('rd-pop'); if (p) { p.remove(); return; }
    const vs = (speechSynthesis.getVoices() || []).filter(v => /^en/i.test(v.lang || ''));
    const cur = LSG('course.voice') || '';
    p = document.createElement('div'); p.id = 'rd-pop'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Reading voice');
    p.innerHTML = `<b>Reading voice</b><label for="rd-voice">Voice</label><select id="rd-voice"><option value="">Best available (automatic)</option>${vs.map(v => `<option value="${esc(v.name)}"${v.name === cur ? ' selected' : ''}>${esc(v.name)} · ${esc(v.lang)}${/natural|neural|online|premium|enhanced/i.test(v.name) ? ' ★' : ''}</option>`).join('')}</select><p>★ marks the most natural-sounding voices on this device. Microsoft Edge offers "Natural" voices; Chrome offers Google voices; iPhone and Mac offer "Enhanced" and "Premium" voices (download them in Settings → Accessibility → Spoken Content → Voices).</p><div class="row"><button type="button" class="btn gold" data-rd="test">▶ Try it</button><button type="button" class="btn ghost" data-rd="close">Close</button></div>`;
    document.body.appendChild(p);
    p.querySelector('#rd-voice').addEventListener('change', e => LSS('course.voice', e.target.value || null));
    p.addEventListener('click', e => { const b = e.target.closest('[data-rd]'); if (!b) return; if (b.dataset.rd === 'close') p.remove(); else { const A = API(); if (A) A.speak('Welcome back. Let us earn that Grade One together.'); } });
  }
  try { if (typeof speechSynthesis !== 'undefined') speechSynthesis.onvoiceschanged = () => { const p = document.getElementById('rd-pop'); if (p) { p.remove(); togglePop(); } }; } catch (e) { }

  /* ---------- a file saved from a game in browser full screen: leave full screen so the download prompt can be seen ---------- */
  window.addEventListener('message', ev => {
    const d = ev && ev.data; if (!d || typeof d !== 'object' || d.type !== 'dm:file') return;
    try { const fe = document.fullscreenElement || document.webkitFullscreenElement; if (fe) { const r = (document.exitFullscreen || document.webkitExitFullscreen).call(document); if (r && r.catch) r.catch(() => { }); } } catch (e) { }
  });

  /* ---------- full screen for games embedded in tool pages ---------- */
  function iframeFs() {
    document.querySelectorAll('#stage iframe').forEach(fr => {
      if (fr.dataset.fs || fr.closest('#gx-full')) return; fr.dataset.fs = '1';
      if (fr.offsetHeight < 160) return;
      fr.setAttribute('allowfullscreen', ''); const al = fr.getAttribute('allow') || ''; if (!/fullscreen/.test(al)) fr.setAttribute('allow', (al ? al + '; ' : '') + 'fullscreen; autoplay');
      const par = fr.parentElement; if (!par) return; if (getComputedStyle(par).position === 'static') par.classList.add('ifr-fs-wrap');
      if (par.querySelector(':scope > .ifr-fs')) return;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'ifr-fs'; b.textContent = '⛶ Full screen';
      b.addEventListener('click', () => {
        const src = fr.getAttribute('src');
        if (src && !/^(about:|javascript:)/.test(src) && typeof window.openGameFull === 'function' && !/youtube|vimeo|spotify/i.test(src)) { window.openGameFull(src); return; }
        try { const r = (fr.requestFullscreen || fr.webkitRequestFullscreen).call(fr); if (r && r.catch) r.catch(() => { }); } catch (e) { }
      });
      par.appendChild(b);
    });
  }

  /* ---------- sidebar sections fold ---------- */
  /* every section starts closed (accordion); the student opens what they need, and that choice is remembered */
  const SOPEN = (() => { try { return new Set(JSON.parse(LSG('course.sideopen.' + COURSE) || '[]')); } catch (e) { return new Set(); } })();
  function foldSide() {
    const side = document.getElementById('side'); if (!side) return;
    const kids = Array.from(side.children); let cur = null, curEls = [];
    const flush = () => { if (cur) { const shut = !SOPEN.has(cur.dataset.fk); cur.classList.toggle('shut', shut); cur.setAttribute('aria-expanded', String(!shut)); curEls.forEach(el => el.classList.toggle('fold-hide', shut && !el.classList.contains('on') && !el.querySelector('.on'))); } };
    kids.forEach(el => {
      if (el.classList.contains('slabel')) { flush(); cur = el; curEls = []; el.classList.add('fold-h'); el.dataset.fk = el.textContent.trim(); el.tabIndex = 0; el.setAttribute('role', 'button'); }
      else if (cur) curEls.push(el);
    });
    flush();
  }
  function sideToggle(e) {
    const h = e.target.closest && e.target.closest('#side .slabel.fold-h'); if (!h) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return; e.preventDefault();
    const k = h.dataset.fk; if (SOPEN.has(k)) SOPEN.delete(k); else SOPEN.add(k); LSS('course.sideopen.' + COURSE, JSON.stringify([...SOPEN])); foldSide();
  }

  /* ---------- arcades and hubs: each group of tiles is an accordion, closed until the student opens it ---------- */
  const COPEN = (() => { try { return new Set(JSON.parse(LSG('course.cardfold.' + COURSE) || '[]')); } catch (e) { return new Set(); } })();
  function foldCards() {
    const api = window.COURSE_API, v = api && api.S && api.S.loc && api.S.loc.v; if (!v || v === 'home') return;
    const root = document.querySelector('#stage .stage-in'); if (!root || root.querySelector(':scope > details.tfold')) return;
    const cards = Array.from(root.children).filter(el => el.classList.contains('card') && el.querySelector(':scope > .tiles .tile'));
    const total = cards.reduce((a, c) => a + c.querySelectorAll('.tile').length, 0);
    if (!cards.length || total < 6) return;
    const groups = [];
    if (cards.length === 1) {
      const card = cards[0], grid = card.querySelector(':scope > .tiles'), tiles = Array.from(grid.children).filter(t => t.classList.contains('tile'));
      const keyOf = t => { const r = t.querySelector('.ribbon'); return ((r ? r.textContent : '').split(' · ')[0].replace(/\s*\(.*$/, '').trim()) || 'More'; };
      const by = new Map(); tiles.forEach(t => { const k = keyOf(t); if (!by.has(k)) by.set(k, []); by.get(k).push(t); });
      if (by.size >= 2 && by.size <= 9) {
        const h = card.querySelector(':scope > h2, :scope > h3'); if (h) h.remove();
        const anchor = document.createElement('div'); anchor.className = 'tfold-set'; card.before(anchor);
        const rank = k => /^all\b/i.test(k) ? 0 : /^modules?\s+(\d+)/i.test(k) ? 1 + +k.match(/(\d+)/)[1] / 100 : /^sections?\s/i.test(k) ? 2 : 3;
        const keys = Array.from(by.keys()); keys.sort((a, b) => rank(a) - rank(b) || keys.indexOf(a) - keys.indexOf(b));
        new Map(keys.map(k => [k, by.get(k)])).forEach((ts, k) => { const g = document.createElement('div'); g.className = 'tiles'; ts.forEach(t => g.appendChild(t)); groups.push({ title: k, at: anchor, nodes: [g], n: ts.length }); });
        if (!grid.children.length) grid.remove();
        const rest = Array.from(card.children); if (rest.length) groups.push({ title: 'More', at: anchor, nodes: rest, n: 0 });
        card.remove();
        groups.forEach(g => g.at = anchor);
      } else groups.push({ card });
    } else cards.forEach(c => groups.push({ card: c }));
    groups.forEach(g => {
      let title = g.title, nodes = g.nodes, n = g.n, at = g.at;
      if (g.card) { const h = g.card.querySelector(':scope > h2, :scope > h3'); title = h ? h.textContent.trim() : 'More'; if (h) h.remove(); nodes = Array.from(g.card.children); n = g.card.querySelectorAll('.tile').length; at = g.card; }
      const key = v + '|' + title;
      const d = document.createElement('details'); d.className = 'hfold tfold'; d.dataset.tk = key; d.open = COPEN.has(key);
      const sm = document.createElement('summary'); sm.innerHTML = '<span class="hf-t"></span>' + (n ? '<span class="hf-n">' + n + '</span>' : '');
      sm.querySelector('.hf-t').textContent = title; d.appendChild(sm);
      const box = document.createElement('div'); box.className = 'hf-body'; d.appendChild(box); nodes.forEach(x => box.appendChild(x));
      if (g.card) { g.card.before(d); g.card.remove(); } else at.before(d);
      d.addEventListener('toggle', () => { if (d.open) COPEN.add(key); else COPEN.delete(key); LSS('course.cardfold.' + COURSE, JSON.stringify([...COPEN])); });
    });
    const set = root.querySelector(':scope > .tfold-set'); if (set) set.remove();
  }
  document.addEventListener('click', sideToggle); document.addEventListener('keydown', sideToggle);

  /* ---------- home page: one heading per group, each opens on tap (less on screen at once) ---------- */
  const HOPEN = new Set(JSON.parse(LSG('course.homefold.' + COURSE) || '[]')); /* every group starts closed; the student opens what they need */
  function foldHome() {
    const api = window.COURSE_API; if (!api || !api.S || !api.S.loc || api.S.loc.v !== 'home') return;
    const root = document.querySelector('#stage .stage-in') || document.getElementById('stage'); if (!root || root.querySelector('.hfold')) return;
    const kids = Array.from(root.children);
    const groups = [];
    kids.forEach((el, i) => {
      if (el.tagName === 'H2' && el.classList.contains('hgrp')) {
        const body = []; let j = i + 1; while (kids[j] && !(kids[j].tagName === 'H2' && kids[j].classList.contains('hgrp')) && !kids[j].classList.contains('foot') && !(kids[j].classList.contains('card') && !kids[j].querySelector('.tile'))) { body.push(kids[j]); j++; }
        const isSec = /Sections|Modules|Units/i.test(el.textContent) || body.some(b => b.classList.contains('grid2'));
        groups.push({ h: el, body, key: isSec ? '__sections' : el.textContent.trim(), sec: isSec });
      }
    });
    const firstTiles = kids.find(el => el.classList.contains('tiles') && !(el.previousElementSibling && el.previousElementSibling.classList.contains('hgrp')));
    if (firstTiles) groups.unshift({ h: null, title: 'Explore', body: [firstTiles], key: '__start', sec: false });
    const how = kids.find(el => el.classList.contains('card') && /How this course works/i.test((el.querySelector('h2,h3') || {}).textContent || ''));
    if (how) groups.push({ h: null, title: 'How this course works', body: [how], key: '__how', sec: false, tail: true });
    let secDet = null; const made = [];
    groups.forEach(g => {
      const d = document.createElement('details'); d.className = 'hfold' + (g.sec ? ' hsec' : ''); d.dataset.hk = g.key; d.open = HOPEN.has(g.key);
      const n = g.body.reduce((a, b) => a + b.querySelectorAll('.tile,.mcardx').length + (b.classList.contains('mcardx') ? 1 : 0), 0);
      const sm = document.createElement('summary'); sm.innerHTML = '<span class="hf-t"></span>' + (n ? '<span class="hf-n">' + n + '</span>' : '');
      sm.querySelector('.hf-t').textContent = g.h ? g.h.textContent.trim() : g.title; d.appendChild(sm);
      const box = document.createElement('div'); box.className = 'hf-body'; d.appendChild(box);
      (g.h || g.body[0]).before(d); if (g.h) g.h.remove(); g.body.forEach(b => box.appendChild(b));
      d.addEventListener('toggle', () => { if (d.open) HOPEN.add(g.key); else HOPEN.delete(g.key); LSS('course.homefold.' + COURSE, JSON.stringify([...HOPEN])); });
      if (g.sec) secDet = d; made.push(d);
    });
    // the course outline comes first, straight after the welcome and player card
    if (secDet) { const anchor = made.find(d => d !== secDet); if (anchor && anchor.compareDocumentPosition(secDet) & Node.DOCUMENT_POSITION_FOLLOWING) anchor.before(secDet); }
  }

  /* ---------- flag strips: the country's name written under every flag ---------- */
  function flagNames() {
    document.querySelectorAll('.flagstrip .fl[title]:not([data-named])').forEach(b => {
      b.dataset.named = '1'; const w = document.createElement('span'); w.className = 'flitem';
      b.before(w); w.appendChild(b); const c = document.createElement('span'); c.className = 'flcap'; c.textContent = b.getAttribute('title'); w.appendChild(c);
    });
  }

  /* ---------- game player: "Start over" clears this game's saved progress (the GameSave kit inside every game) ---------- */
  function gxReset() {
    const ov = document.getElementById('gx-full'); if (!ov) return;
    const bar = ov.querySelector('.gx-bar'); if (!bar || bar.querySelector('[data-gxa="reset"]')) return;
    const b = document.createElement('button'); b.type = 'button'; b.dataset.gxa = 'reset'; b.textContent = '↺ Start over';
    b.title = 'Clear your saved progress in this game and start again';
    bar.insertBefore(b, bar.querySelector('[data-gxa="x"]'));
    b.addEventListener('click', ev => { ev.stopPropagation(); ev.preventDefault(); const fr = ov.querySelector('iframe'); try { fr.contentWindow.postMessage({ type: 'gs:reset' }, '*'); } catch (e) { } });
    /* reading pages and exemplars (marked data-gs-none) have nothing to start over */
    const fr = ov.querySelector('iframe'); const chk = () => { try { const de = fr.contentDocument && fr.contentDocument.documentElement; b.hidden = !!(de && de.hasAttribute('data-gs-none')); } catch (e) { } };
    if (fr) { fr.addEventListener('load', chk); chk(); }
  }
  try { new MutationObserver(gxReset).observe(document.body, { childList: true }); } catch (e) { }

  /* ---------- run after every render ---------- */
  let q = false;
  function after() { q = false; try { placeFigures(); } catch (e) { } try { photoCard(); } catch (e) { } try { iframeFs(); } catch (e) { } try { foldSide(); } catch (e) { } try { foldHome(); } catch (e) { } try { foldCards(); } catch (e) { } try { flagNames(); } catch (e) { } try { refreshTop(); } catch (e) { } try { fab(); } catch (e) { } }
  function sched() { if (!q) { q = true; requestAnimationFrame(after); } }
  function boot() {
    const stage = document.getElementById('stage'), side = document.getElementById('side'), top = document.getElementById('havatar');
    const mo = new MutationObserver(sched);
    if (stage) mo.observe(stage, { childList: true, subtree: false });
    if (side) mo.observe(side, { childList: true });
    if (top) mo.observe(top, { childList: true });
    sched();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else setTimeout(boot, 0);
})();
