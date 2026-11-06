/* Study tools: My Notebook, Memory Palace, Thanks for the Memeries and the Study Hourglass in one panel.
   StudyTools.open(tab, {course, topic, newNote})   tab = notebook | palace | memes
   StudyTools.menu()   adds the "Study tools" tab to a course's side menu (#side)
   Courses: <script src="tools/studytools.js" data-course="comm-studies"></script> */
(function () {
  'use strict';
  if (window.StudyTools) return;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var me = document.currentScript, COURSE = (me && me.dataset.course) || '';
  var ICON = {
    notebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 3h12a2 2 0 0 1 2 2v16H7a2 2 0 0 1-2-2z"/><path d="M5 17a2 2 0 0 1 2-2h12M9 7h6M9 11h4"/></svg>',
    palace: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 10 12 4l9 6M5 10v9h14v-9M9 19v-5h6v5"/></svg>',
    memes: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2.5 4 2.5 4-2.5 4-2.5M9 9.5h.01M15 9.5h.01"/></svg>',
    glass: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 3h12M6 21h12M7 3c0 6 10 6 10 9s-10 3-10 9M17 3c0 6-10 6-10 9s10 3 10 9"/></svg>'
  };
  var TABS = { notebook: 'My notebook', palace: 'Memory palace', memes: 'Thanks for the Memeries' };

  var CSS = [
    '.st-ov{position:fixed;inset:0;z-index:2147480000;background:rgba(3,8,26,.72);display:flex;align-items:stretch;justify-content:center;padding:max(10px,env(safe-area-inset-top,0px)) 10px 10px}',
    '.st-ov[hidden]{display:none}',
    '.st-box{width:min(1180px,100%);display:flex;flex-direction:column;border-radius:20px;overflow:hidden;background:var(--bg,#060D26);color:var(--ink,#F1F4FF);border:2px solid rgba(245,197,66,.6);box-shadow:0 30px 80px -20px rgba(0,0,0,.8);font-family:var(--f-body,"Atkinson Hyperlegible",Verdana,sans-serif)}',
    '.st-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 14px;background:radial-gradient(260px 120px at 90% 0%,rgba(245,197,66,.22),transparent 70%),linear-gradient(160deg,#122a6b,#0a1638 75%);border-bottom:3px solid #F5C542;color:#F1F4FF}',
    '.st-head h2{margin:0;font:800 1.15rem "Bricolage Grotesque","Segoe UI",sans-serif;color:#FFD766;margin-right:6px}',
    '.st-tabs{display:flex;gap:4px;flex-wrap:wrap;flex:1}',
    '.st-tab,.st-hg,.st-x{display:inline-flex;align-items:center;gap:7px;border:1.5px solid rgba(245,197,66,.45);background:transparent;color:#F1F4FF;border-radius:999px;padding:7px 13px;font:700 .86rem system-ui,sans-serif;cursor:pointer}',
    '.st-tab[aria-selected=true]{background:#F5C542;color:#0A1433;border-color:#F5C542}',
    '.st-hg[aria-pressed=true]{background:rgba(245,197,66,.18);border-color:#F5C542;color:#FFD766}',
    '.st-x{padding:6px 11px;font-size:1.1rem}',
    '.st-tab:focus-visible,.st-hg:focus-visible,.st-x:focus-visible{outline:3px solid #FFD766;outline-offset:2px}',
    '.st-ctx{width:100%;font-size:.78rem;color:#AEB9DD}.st-ctx b{color:#DCE3FF}',
    '.st-body{flex:1;overflow:auto;padding:14px}',
    '.st-body input,.st-body textarea{-webkit-user-select:text;user-select:text}',
    '.st-body [hidden]{display:none!important}',
    /* drop-down menus: navy, in every study tool */
    '.st-ov select,.st-ov option,.st-ov optgroup,.mp select,.mp option,.nb select,.nb option,.hg select,.hg option,select.pp-sel,.pp-sel option{background-color:#0B1A46!important;color:#F1F4FF!important;color-scheme:dark}',
    /* course menu tab */
    '.st-menu{margin:14px 12px 0;border:2px solid rgba(245,197,66,.6);border-radius:16px;overflow:hidden;background:var(--surface,#0A1638);color:var(--ink,#F1F4FF)}',
    '.st-menu > summary{display:flex;gap:10px;align-items:center;padding:12px 16px;cursor:pointer;list-style:none;font:700 .95rem var(--f-body,"Atkinson Hyperlegible",Verdana,sans-serif)}',
    '.st-menu > summary::-webkit-details-marker{display:none}.st-menu > summary .t{flex:1}',
    '.st-menu > summary:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:-3px}',
    '.st-menu > summary .ch{color:var(--gold,#F5C542);transition:transform .2s}.st-menu[open] > summary .ch{transform:rotate(180deg)}',
    '.st-menu[open] > summary{border-bottom:1px solid var(--line,rgba(245,197,66,.25))}',
    '.st-menu .l{display:flex;flex-direction:column;padding:8px}',
    '.st-menu .l button{display:flex;align-items:center;gap:10px;text-align:left;border:0;background:none;color:inherit;padding:9px 10px;border-radius:10px;font:600 .9rem var(--f-body,system-ui,sans-serif);cursor:pointer}',
    '.st-menu .l button:hover{background:color-mix(in srgb,var(--gold,#F5C542) 10%,transparent)}',
    '.st-menu .l button:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:-2px}',
    '.st-menu .l button svg{color:var(--gold,#F5C542);flex:none}',
    '.st-menu .l .sw{margin-left:auto;width:34px;height:20px;border-radius:999px;background:rgba(255,255,255,.18);position:relative;flex:none}',
    '.st-menu .l .sw::after{content:"";position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#fff;transition:left .2s}',
    '.st-menu .l [aria-pressed=true] .sw{background:#F5C542}.st-menu .l [aria-pressed=true] .sw::after{left:17px;background:#0A1433}',
    '.st-tab{white-space:nowrap}',
    '@media (max-width:640px){.st-ov{padding:0}.st-box{border-radius:0;border-width:0}.st-head h2{flex:1}.st-tabs{order:5;flex:0 0 100%;flex-wrap:nowrap;overflow-x:auto;padding-bottom:2px}.st-ctx{order:6}.st-hg{padding:6px 10px}}'
  ].join('\n');
  function css() { if (document.getElementById('st-css')) return; var s = document.createElement('style'); s.id = 'st-css'; s.textContent = CSS; document.head.appendChild(s); }

  /* ---------- where am I? ---------- */
  function courses() {
    var C = window.SITE_CONFIG; if (!C) try { C = window.parent.SITE_CONFIG; } catch (e) {}
    if (C && C.courses) return C.courses.map(function (c) { return { slug: c.slug, title: c.title, level: c.level }; });
    var t = document.title || 'This course';
    return [{ slug: COURSE || 'this-course', title: t, level: '' }];
  }
  function headingIn(doc) {
    try {
      var h = doc.querySelector('#stage h1, #stage h2, main h1, main h2');
      return h ? h.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) : '';
    } catch (e) { return ''; }
  }
  /* on the course hub, read the lesson open in the course frame (same site) */
  function guess() {
    var ctx = { course: COURSE, topic: '' };
    var fr = document.getElementById('frame');
    if (fr && !fr.hidden) { try { ctx.topic = headingIn(fr.contentDocument); } catch (e) {} }
    else if (COURSE) ctx.topic = headingIn(document);
    if (!ctx.course) { var cur = document.querySelector('.tab[aria-current="page"]'); if (cur) ctx.course = cur.dataset.slug || ''; }
    return ctx;
  }

  /* ---------- the panel ---------- */
  var ov = null, mounted = {}, nb = null, lastFocus = null;
  function open(tab, ctx) {
    css(); ctx = Object.assign(guess(), ctx || {}); tab = TABS[tab] ? tab : 'notebook';
    lastFocus = document.activeElement;
    if (!ov) build(ctx);
    ov.hidden = false; document.documentElement.style.overflow = 'hidden';
    var c = ov.querySelector('.st-ctx'), list = courses(), cn = list.find(function (x) { return x.slug === ctx.course; });
    c.innerHTML = (cn || ctx.topic) ? 'Linked to <b>' + esc(cn ? ((cn.level ? cn.level + ' ' : '') + cn.title) : '') + '</b>' + (ctx.topic ? ' · <b>' + esc(ctx.topic) + '</b>' : '') : '';
    show(tab, ctx);
    setTimeout(function () { var b = ov.querySelector('.st-tab[aria-selected=true]'); b && b.focus(); }, 30);
  }
  function build(ctx) {
    ov = document.createElement('div'); ov.className = 'st-ov'; ov.hidden = true;
    ov.innerHTML = '<div class="st-box" role="dialog" aria-modal="true" aria-label="Study tools">' +
      '<div class="st-head"><h2>Study tools</h2><div class="st-tabs" role="tablist">' +
      Object.keys(TABS).map(function (k) { return '<button type="button" class="st-tab" role="tab" id="st-t-' + k + '" aria-controls="st-p-' + k + '" data-tab="' + k + '" aria-selected="false">' + ICON[k] + esc(TABS[k]) + '</button>'; }).join('') +
      '</div><button type="button" class="st-hg" data-hg aria-pressed="false">' + ICON.glass + 'Hourglass</button><button type="button" class="st-x" data-close aria-label="Close study tools">×</button>' +
      '<div class="st-ctx"></div></div>' +
      '<div class="st-body">' + Object.keys(TABS).map(function (k) { return '<div role="tabpanel" id="st-p-' + k + '" aria-labelledby="st-t-' + k + '" hidden></div>'; }).join('') + '</div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) {
      var t = e.target.closest('[data-tab]'); if (t) show(t.dataset.tab);
      if (e.target.closest('[data-close]') || e.target === ov) close();
      if (e.target.closest('[data-hg]')) { window.Hourglass && Hourglass.toggle(); syncHg(); }
    });
    ov.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !e.defaultPrevented) { close(); }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && e.target.classList.contains('st-tab')) {
        var all = [].slice.call(ov.querySelectorAll('.st-tab')), i = all.indexOf(e.target) + (e.key === 'ArrowRight' ? 1 : -1);
        var n = all[(i + all.length) % all.length]; show(n.dataset.tab); n.focus();
      }
    });
  }
  function syncHg() { if (!ov) return; var on = !!(window.Hourglass && Hourglass.isOn()); ov.querySelector('[data-hg]').setAttribute('aria-pressed', String(on)); syncMenu(); }
  function show(tab, ctx) {
    ctx = ctx || guess();
    Object.keys(TABS).forEach(function (k) {
      ov.querySelector('#st-t-' + k).setAttribute('aria-selected', String(k === tab));
      ov.querySelector('#st-p-' + k).hidden = k !== tab;
    });
    var p = ov.querySelector('#st-p-' + tab), list = courses();
    if (!mounted[tab]) {
      mounted[tab] = true;
      if (tab === 'notebook') nb = Notebook.mount(p, { courses: list, course: ctx.course, topic: ctx.newNote ? ctx.topic : '', newNote: !!ctx.newNote });
      if (tab === 'palace') Palace.mount(p, { courses: list, course: ctx.course });
      if (tab === 'memes') {
        Palace.css(); p.innerHTML = '<div class="mp"><div class="mp-card"><p class="mp-hint" style="margin:0">Make your own meme about something you need to remember: upload a picture, choose a layout, type your caption. Funny sticks. Save it to your phone, or build it into a memory palace.</p></div><div class="mp-card" id="st-mm"></div></div>';
        Memes.editor(p.querySelector('#st-mm'), {});
      }
    } else if (tab === 'notebook' && ctx.newNote && nb) nb.newNote({ course: ctx.course, topic: ctx.topic });
    syncHg();
  }
  function close() {
    if (!ov) return; ov.hidden = true; document.documentElement.style.overflow = '';
    try { speechSynthesis.cancel(); } catch (e) {}
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- the "Study tools" tab in a course menu ---------- */
  function menuEl() {
    var d = document.createElement('details'); d.className = 'st-menu'; d.id = 'st-menu';
    d.innerHTML = '<summary><span class="t">Study tools</span><span class="ch" aria-hidden="true">&#8964;</span></summary><div class="l">' +
      '<button type="button" data-st="note">' + ICON.notebook + 'New note for this lesson</button>' +
      '<button type="button" data-st="notebook">' + ICON.notebook + 'My notebook</button>' +
      '<button type="button" data-st="palace">' + ICON.palace + 'Memory palace</button>' +
      '<button type="button" data-st="memes">' + ICON.memes + 'Thanks for the Memeries</button>' +
      '<button type="button" data-st="hg" aria-pressed="false">' + ICON.glass + 'Study hourglass<span class="sw" aria-hidden="true"></span></button></div>';
    d.addEventListener('click', function (e) {
      var b = e.target.closest('[data-st]'); if (!b) return; var a = b.dataset.st;
      if (a === 'hg') { Hourglass.toggle(); syncMenu(); return; }
      if (a === 'note') open('notebook', { newNote: true }); else open(a);
    });
    return d;
  }
  function syncMenu() { var b = document.querySelector('#st-menu [data-st="hg"]'); if (b) b.setAttribute('aria-pressed', String(!!(window.Hourglass && Hourglass.isOn()))); }
  function place() {
    var side = document.getElementById('side'); if (!side) return null;
    var el = document.getElementById('st-menu') || menuEl(), about = document.getElementById('ea-about');
    if (about && about.parentNode === side) { if (el.nextElementSibling !== about) side.insertBefore(el, about); }
    else if (side.lastElementChild !== el) side.appendChild(el);
    syncMenu(); return side;
  }
  function menu() {
    css();
    var side = place();
    if (side) { new MutationObserver(function () { place(); }).observe(side, { childList: true }); return; }
    var wait = new MutationObserver(function () { var s = place(); if (s) { wait.disconnect(); new MutationObserver(function () { place(); }).observe(s, { childList: true }); } });
    wait.observe(document.body, { childList: true, subtree: true });
  }

  window.StudyTools = { open: open, close: close, menu: menu };
  /* inside a course: add the menu tab automatically */
  if (COURSE) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', menu); else menu(); }
  /* any element with data-study="notebook|palace|memes|hourglass" opens that tool */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-study]'); if (!b) return; e.preventDefault();
    if (b.dataset.study === 'hourglass') { Hourglass.toggle(); syncHg(); return; }
    open(b.dataset.study);
  });
})();
