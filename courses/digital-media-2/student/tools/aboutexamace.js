/* Who runs Exam Ace: an accordion tab at the bottom of the course menu (layout D, "Brand first").
   Self-contained: no links out, no outside files. Uses the course's own colour tokens so it follows every skin. */
(function () {
  'use strict';
  if (window.__eaAbout) return; window.__eaAbout = true;

  var css = [
    '.ea-about{margin:14px 12px 18px;border:2px solid rgba(245,197,66,.6);border-radius:16px;overflow:hidden;background:var(--surface,#0A1638);color:var(--ink,#F1F4FF)}',
    '.ea-about > summary{display:flex;gap:10px;align-items:center;padding:12px 16px;cursor:pointer;list-style:none;font-family:var(--f-body,"Atkinson Hyperlegible",Verdana,sans-serif);font-weight:700;font-size:.95rem}',
    '.ea-about > summary::-webkit-details-marker{display:none}',
    '.ea-about > summary:hover{background:color-mix(in srgb,var(--gold,#F5C542) 8%,transparent)}',
    '.ea-about > summary:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:-3px}',
    '.ea-about > summary .ea-t{flex:1}',
    '.ea-about > summary .ea-chev{color:var(--gold,#F5C542);transition:transform .2s}',
    '.ea-about[open] > summary{border-bottom:1px solid var(--line,rgba(245,197,66,.25))}',
    '.ea-about[open] > summary .ea-chev{transform:rotate(180deg)}',
    '.ea-about .ea-hero{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;padding:20px 16px 18px;color:#F1F4FF;background:radial-gradient(260px 160px at 85% 0%,rgba(245,197,66,.28),transparent 70%),linear-gradient(160deg,#122a6b,#0a1638 75%);border-bottom:3px solid #F5C542}',
    '.ea-about .ea-seal{width:60px;height:60px;border-radius:50%;padding:3px;background:#F5C542;box-shadow:0 0 26px rgba(245,197,66,.45)}',
    '.ea-about .ea-seal span{display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:50%;background:#0B1A46;color:#FFD766;font:800 1.2rem var(--f-display,"Bricolage Grotesque","Segoe UI",sans-serif)}',
    '.ea-about .ea-name{font:800 1.25rem/1.1 var(--f-display,"Bricolage Grotesque","Segoe UI",sans-serif);color:#fff}',
    '.ea-about .ea-tag{font-size:.64rem;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:#FFD766}',
    '.ea-about .ea-hero p{margin:4px 0 0;font-size:.88rem;line-height:1.5;color:#DCE3FF}',
    '.ea-about .ea-body{padding:14px 16px 12px;display:flex;flex-direction:column;gap:10px}',
    '.ea-about .ea-lbl{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--muted,#AEB9DD)}',
    '.ea-about ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;font-size:.88rem;line-height:1.45}',
    '.ea-about li{display:flex;gap:10px}',
    '.ea-about li::before{content:"";flex:none;width:8px;height:8px;margin-top:6px;border-radius:50%;background:var(--gold,#F5C542)}',
    '.ea-about .ea-copy{margin:2px 0 0;text-align:center;font-size:.7rem;color:var(--muted,#AEB9DD)}'
  ].join('\n');

  function make() {
    var d = document.createElement('details');
    d.className = 'ea-about'; d.id = 'ea-about';
    d.innerHTML =
      '<summary><span class="ea-t">Who runs Exam Ace Tutorials?</span><span class="ea-chev" aria-hidden="true">&#8964;</span></summary>' +
      '<div class="ea-hero"><div class="ea-seal" aria-hidden="true"><span>EA</span></div>' +
      '<div class="ea-name">Exam Ace Tutorials</div><div class="ea-tag">E-learning Ecosystem</div>' +
      '<p>A self-contained e-learning ecosystem for Caribbean students.</p></div>' +
      '<div class="ea-body"><div class="ea-lbl">Owned and operated by Kester Small</div><ul>' +
      '<li>Award-winning educator, 20+ years</li>' +
      '<li>SBA moderator and Paper 2 marker</li>' +
      '<li>Merit listers in CAPE Digital Media Units 1 and 2</li>' +
      '</ul><p class="ea-copy">&copy; ' + new Date().getFullYear() + ' Exam Ace Tutorials. All rights reserved.</p></div>';
    return d;
  }

  /* keep the tab as the last item, even when the course redraws its menu */
  function place() {
    var side = document.getElementById('side'); if (!side) return false;
    var el = document.getElementById('ea-about') || make();
    if (side.lastElementChild !== el) side.appendChild(el);
    return side;
  }
  function start() {
    if (!document.getElementById('ea-about-css')) {
      var st = document.createElement('style'); st.id = 'ea-about-css'; st.textContent = css; document.head.appendChild(st);
    }
    var side = place();
    if (side) { new MutationObserver(place).observe(side, { childList: true }); return; }
    var wait = new MutationObserver(function () { var s = place(); if (s) { wait.disconnect(); new MutationObserver(place).observe(s, { childList: true }); } });
    wait.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
