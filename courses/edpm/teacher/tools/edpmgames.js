/* EDPM game arcade: Every game plays inside the course, with a full-screen option. */
(function () {
  const BUILT = [
    { id: 'typing', t: 'Typing Quest', icon: '⌨️', sec: 'Section II', d: 'Type falling words across five worlds. Builds touch-typing speed and accuracy.', f: 'games/typingquest.html' },
    { id: 'showdown', t: 'EDPM Showdown', icon: '🏆', sec: 'All sections', d: 'Game-show board with Mr. Macro: play solo against Byte the Bot or run class teams.', f: 'games/showdown.html' },
    { id: 'tabquest', t: 'Tabulation Quest', icon: '📊', sec: 'Section IV', d: 'Seven worlds of spreadsheet tabulation: terms, ranges, formatting, formulas, charts and invoices.', f: 'games/tabquest.html' },
    { id: 'cv', t: 'Résumé Studio', icon: '📄', sec: 'Sections V and IX', d: 'Write your CV with live templates and a checklist, generate a fully blocked application letter, then fix a badly written CV.', f: 'games/resumewriter.html' },
    { id: 'interview', t: 'The Interview Room', icon: '🎙️', sec: 'Sections VII and IX', d: 'A voiced, simulated job interview with a two-person panel, speech bubbles, music and a follow-up thank-you e-mail.', f: 'games/interview.html' },
    { id: 'dress', t: 'Dress for Success', icon: '👔', sec: 'Section IX', d: 'Spin the motorised wardrobe, learn colour theory and colour blocking, add accessories, learn to tie a tie, then Walk the Look for HR.', f: 'games/dressforsuccess.html' },
    { id: 'ergo', t: 'Fit-Out: The Ergonomic Office', icon: '🪑', sec: 'Section I', d: 'You are hired to equip a new office. Buy what is acceptable, set up the workstation and hunt the hazards.', f: 'games/ergooffice.html' },
    { id: 'pcbuild', t: 'PC Build Lab', icon: '🖥️', sec: 'Section I', d: 'Manual vs direct data entry, types of computers, a Tech Museum of obsolete devices and storage media, and a steady-hand challenge: build the computer without touching the edges.', f: 'games/pcbuildlab.html' },
    { id: 'print', t: 'Print Lab', icon: '🖨️', sec: 'Section I', d: 'Every type of printer, which one suits the job, troubleshooting, and a 3D Print Studio where your settings make or break the print.', f: 'games/printlab.html' },
    { id: 'jeff', t: 'It\'s Giving Jeff', icon: '🧍', sec: 'Section I', d: 'Jeff\'s posture is giving back pain. Drag his joints, fix his set-up and get him Jeff-approved in seven levels.', f: 'games/jeffposture.html' },
    { id: 'health', t: 'Health & Safety Squad', icon: '🩺', sec: 'Section I', d: 'Diagnose computer-related health issues in the Office Clinic, patrol for safety hazards and respond to emergencies.', f: 'games/healthsafety.html' },
    { id: 'org', t: 'Chart the Company', icon: '🏢', sec: 'Section VI · SBA', d: 'Build organisational charts from staff descriptions, read the chain of command, and fix badly laid-out charts the SBA way.', f: 'games/orgchart.html' },
    { id: 'design', t: 'Office Architect', icon: '📐', sec: 'Sections I and VIII', d: 'Choose open-plan or cellular, then design a floor plan that keeps walkways clear and files secure.', f: 'games/officedesigner.html' },
    { id: 'inbox', t: 'Inbox Hero', icon: '✉️', sec: 'Section VII', d: 'Compose professional e-mails: To, Cc or Bcc, subject lines, tone, attachments and netiquette. Then fix bad drafts and clear the inbox.', f: 'games/inboxhero.html' },
    { id: 'tz', t: 'Time Zone Navigator', icon: '🌐', sec: 'Sections VI and VII', d: 'Run a global company from Castries, Saint Lucia: choose the best electronic communication for each situation by time zone, urgency and confidentiality, book international calls and build itineraries.', f: 'games/timezones.html' },
    { id: 'people', t: 'Office Life: People Skills', icon: '🤝', sec: 'Section IX', d: 'A branching workday: customers, coworkers, deadlines and dilemmas. Earn a great performance review.', f: 'games/officelife.html' },
    { id: 'ip', t: 'IP Court', icon: '⚖️', sec: 'Section IX', d: 'Copyright, patent or trademark? Compare and contrast, then judge real-world style IP cases.', f: 'games/ipcourt.html' },
    { id: 'shortcuts', t: 'Shortcut Sprint', icon: '⌘', sec: 'Sections II and IV', d: 'Learn and race the keyboard shortcuts for Windows, Word, Excel, PowerPoint and Access.', f: 'games/shortcuts.html' },
    { id: 'pagerange', t: 'Page Range', icon: '🎯', sec: 'All sections', d: 'A 3D first-person range: read the question and shoot the page with the right answer.', f: 'games/pagerange.html' },
    { id: 'cells', t: 'Cell by Cell', icon: '🔢', sec: 'Section IV', d: 'Spreadsheet skills one cell at a time: references, formulas, SUM, AVERAGE, IF and more.', f: 'games/cellbycell.html' },
    { id: 'island', t: 'EDPM Island Arcade', icon: '🏝️', sec: 'All sections', d: 'Seven arcade games with manuscript signs, paper sizes and a typing blitz.', f: 'games/islandarcade.html' },
    { id: 'docprep', t: 'Doc Prep Royale', icon: '📄', sec: 'Sections IV–VI', d: 'Battle through document-preparation challenges.', f: 'games/docprep.html' },
    {"id": "sampleport", "t": "Sample Portfolio (Grade One)", "icon": "📘", "sec": "SBA · Paper 031", "d": "A complete Grade One sample EDPM portfolio in the school format: cover, approval page, contents, all nine samples, bibliography and disclosure, with marking notes for all 85 marks.", "f": "games/edpm-sample-portfolio.html", "g": "sba"},
    {"id": "flowchart", "t": "Flow the Process", "icon": "🔀", "sec": "Section VI · SBA", "d": "Learn the flow chart symbols, build flow charts for nine Caribbean office processes on an A4 page, fix badly drawn charts and decide when to use a flow chart or an organisational chart.", "f": "games/flowchart.html", "g": "sba"},
    {"id": "winsim", "t": "Windows Desktop Lab", "icon": "🪟", "sec": "Sections I, III, VII and VIII · Files and the SBA portfolio", "d": "Sign in, build one folder per portfolio sample, then name, find, protect, version and back up your EDPM SBA files on a realistic Windows desktop.", "f": "games/winsim.html", "g": "sim"},
    {"id": "wordsim", "t": "Word Lab", "icon": "🟦", "sec": "Sections III to VI · Word processing", "d": "Format, edit and tabulate, then produce a notice and agenda, minutes with action items, a contract of employment, a programme and a mail merge.", "f": "games/wordsim.html", "g": "sim"},
    {"id": "excelsim", "t": "Excel Lab", "icon": "🟩", "sec": "Sections III, IV and VI · Spreadsheets", "d": "Formulas, functions, sorting, borders and charts, plus slanted and vertical headings for a ruled tabulation, an invoice and an income and expenditure statement.", "f": "games/excelsim.html", "g": "sim"},
    {"id": "accesssim", "t": "Access Lab", "icon": "🟥", "sec": "Sections III and IV · Databases", "d": "Design a single table with the right field names, data types and primary key, populate it, then build simple and complex queries and a report with an exact title.", "f": "games/accesssim.html", "g": "sim"},
    {"id": "publishersim", "t": "Publisher Lab", "icon": "🟪", "sec": "Sections V and VI · Desktop publishing", "d": "Lay out letterheads, flyers and newsletters, and build booklet-style programmes and invitations with menus and art borders.", "f": "games/publishersim.html", "g": "sim"}
  ];
  /* Full screen: real browser full screen where allowed, otherwise the game fills the whole window. */
  const FS_CSS = `.eg-wrap{position:relative;background:#000}
.eg-wrap iframe{display:block;width:100%;height:calc(100vh - 190px);min-height:560px;border:0;background:#fff}
.eg-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:space-between}
.eg-wrap.eg-max{position:fixed;inset:0;z-index:9999;border-radius:0!important}
.eg-wrap.eg-max iframe,.eg-wrap:fullscreen iframe{height:100vh;height:100dvh;min-height:0}
.eg-exit{position:absolute;top:calc(8px + env(safe-area-inset-top,0px));right:calc(8px + env(safe-area-inset-right,0px));z-index:2;display:none;padding:6px 12px;border-radius:99px;border:1px solid rgba(255,255,255,.5);background:rgba(10,20,51,.85);color:#fff;font:700 .85rem system-ui,sans-serif;cursor:pointer}
.eg-wrap.eg-max .eg-exit,.eg-wrap:fullscreen .eg-exit{display:block}
body.eg-lock{overflow:hidden}`;
  if (!document.getElementById('eg-css')) { const st = document.createElement('style'); st.id = 'eg-css'; st.textContent = FS_CSS; document.head.appendChild(st); }
  const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
  function exitMax() { const w = document.querySelector('.eg-wrap.eg-max'); if (w) w.classList.remove('eg-max'); document.body.classList.remove('eg-lock'); }
  function toggleFull(w) {
    if (!w) return;
    if (fsEl()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    if (w.classList.contains('eg-max')) { exitMax(); return; }
    const req = w.requestFullscreen || w.webkitRequestFullscreen;
    const fallback = () => { w.classList.add('eg-max'); document.body.classList.add('eg-lock'); const f = w.querySelector('iframe'); if (f) f.focus(); };
    if (!req) return fallback();
    try { const r = req.call(w); if (r && r.catch) r.catch(fallback); } catch (e) { fallback(); }
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') exitMax(); });

  const AGROUPS = [["sim", "🖥️ Office software simulators", "Practice versions of Windows, Word, Excel, Access and Publisher with Foundation, Core and Challenge missions built around your SBA portfolio."], ["sba", "📁 Portfolio and SBA", "The Grade One sample portfolio and the chart, tabulation and document games that build each portfolio sample."], ["games", "🎮 Games", "Every game practises an EDPM skill."]], AGMAP = {"sim": ["winsim", "wordsim", "excelsim", "accesssim", "publishersim"], "sba": ["sampleport", "org", "flowchart", "tabquest", "cells", "docprep"]};
  const agOf = x => x.g || Object.keys(AGMAP).find(k => AGMAP[k].includes(x.id)) || 'games';
  function arcadeGroups(api) {
    const esc = api.esc, lv = (api.S && api.S.level) || 2, page = x => (x.sim || agOf(x) === 'sim') ? x.f + '?level=' + lv : x.f;
    return AGROUPS.map(([k, n, blurb]) => { const L = BUILT.filter(x => agOf(x) === k); return L.length ? `<div class="card"><h3>${n}</h3><p class="hint">${blurb}</p><div class="tiles">${L.map(x => `<button type="button" class="tile" data-gx="opengame" data-page="${page(x)}" data-id="${x.id}"><span class="ticon" aria-hidden="true">${x.icon}</span><span class="ribbon">${esc(x.sec)}</span><h3>${esc(x.t)}</h3><span class="meta">${esc(x.d)}</span><span class="meta">${agOf(x) === 'sim' ? 'Open simulator →' : agOf(x) === 'sba' ? 'Open →' : 'Play now →'}</span></button>`).join('')}</div></div>` : ''; }).join('');
  }
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'edpmgames',
    title: 'EDPM game arcade',
    tile: { icon: '🕹️', meta: 'Typing Quest, EDPM Showdown, Dress for Success, Fit-Out, IP Court and more' },
    render(api, loc) {
      const esc = api.esc, g = BUILT.find(x => x.id === loc.k);
      if (g) return `<div class="crumbs"><button type="button" class="linkbtn" data-go="edpmgames">← EDPM game arcade</button><span>${esc(g.t)}</span></div>
        <div class="card"><h2>${esc(g.t)}</h2><p>This opens in full screen. Choose ✕ Exit game to come back to the course. Your progress is saved on this device.</p><div class="row"><button type="button" class="btn gold" data-gx="opengame" data-page="${g.f}" data-id="${g.id}" data-autofull="1">⛶ Open full screen</button></div></div>`;
      return `<div class="hero"><span class="eyebrow">Play & Compete</span><h1>EDPM game arcade</h1><p>Every game plays right here inside the course. Open one and press Full screen for the best view.</p></div>
      ${arcadeGroups(api)}`;
    },
    mount(api, loc, stage) {
      try { const af = stage && stage.querySelector('[data-autofull]'); const act = navigator.userActivation ? navigator.userActivation.isActive : true; if (af && act && !document.getElementById('gx-full') && window.openGameFull) setTimeout(() => window.openGameFull(af.dataset.page, af.dataset.id), 0); } catch (e) { }
      exitMax();
      if (!stage) return;
      stage.querySelectorAll('[data-egfull]').forEach(b => b.addEventListener('click', () => toggleFull(stage.querySelector('.eg-wrap'))));
    }
  });
})();
