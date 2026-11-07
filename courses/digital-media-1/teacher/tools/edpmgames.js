/* Digital Media Unit 1 game arcade: the Digital Media games in this course, played inside the course. — Developed by Kester Small */
(function () {
  try { window.addEventListener('message', ev => { const d = ev.data; if (d && d.type === 'edpm:get-game-src' && window.EDPM_GAME_SRC && window.EDPM_GAME_SRC[d.path] && ev.source) ev.source.postMessage({ type: 'edpm:game-src', path: d.path, src: window.EDPM_GAME_SRC[d.path] }, '*'); }); } catch (e) { }
  const BUILT = [
    { id: 'dmmindmap', t: 'Digital Media Mind Map', icon: '🧠', sec: 'Planning · All modules', d: 'Plan an app, website, e-book, film or smart product as a mind map. Work with classmates, merge their copies and keep a dated history of every change.', f: 'games/dmmindmap.html' },
    { id: 'arcade', t: 'Digital Media Unit 1 Arcade', icon: '🕹️', sec: 'All modules', d: 'Drop Zone, Island Rush, Downtown Location Scout, Acronym Blitz, Impostor in the Studio, Term Stack, Match Up and more, with real past-paper style questions.', f: 'games/dmarcade.html' },
    { id: 'dmquest', t: 'Digital Media Quest', icon: '🧭', sec: 'All modules · Review', d: "The review game across Modules 1–3, with an easier mode.", f: 'games/dmquest.html' },
    { id: 'p2bank', t: 'Paper 02 Practice Bank', icon: '📝', sec: 'All modules · Exam practice', d: 'Past and practice Paper 02s (2017, 2022, 2023, 2024) and the January 2025 semester exam: timed exam mode, mark schemes, self-marking, topic filter and a Dial it down support mode.', f: 'games/paper2bank.html' },
    { id: 'heroposter', t: 'Hero Poster Studio', icon: '🦸', sec: 'Module 3 · Design', d: 'Design a typographic hero poster: duotone colour grading, a vertical name, a two-typeface quote (with your own handwriting font from Calligraphr) and a rim-lit portrait.', f: 'games/heroposter.html' },
    { id: 'dmquiz1', t: 'Class quiz: What Is Digital Media?', icon: '📝', sec: 'Class quizzes and practice', d: 'A class quiz: 20 multiple-choice, 10 true or false and 4 structured questions on digital media categories, art, audio, animation and video. Check your answers for the key, an explanation and suggested answer points.', f: 'games/dmquiz1.html' },
    { id: 'dmtest1', t: 'Digital Media Test 1', icon: '🧾', sec: 'Class quizzes and practice', d: 'Test 1 check-in: one chance per question, a progress bar, then print or save the completed page as a PDF to submit.', f: 'games/dmtest1.html' },
    { id: 'revision', t: '60-Task Evaluation Trainer', icon: '🔎', sec: 'Class quizzes and practice', d: 'The revision exercise: judge student answers as Correct, Partially Correct or Incorrect across all of Unit 1, order answer steps and pick what is needed, then earn a certificate and review your mistakes.', f: 'games/revision.html' },
    { id: 'p2-2023', t: '2023 Paper 02 guided practice', icon: '🔒', sec: 'Class quizzes and practice', d: 'The locked guided practice for the 2023 Paper 02: find the aim, choose the answer parts, order them and pick the strongest final answer, with a 50-mark score tracker.', f: 'games/p2-2023-guided.html' },
    { id: 'fundingtick', t: 'Funding Methods Tick Table', icon: '💰', sec: 'Module 2 · Funding', d: 'Tick every funding method that matches each of 12 features, from crowdfunding to bootstrapping, then read per-row feedback explaining each answer. From the Funding Models exercise.', f: 'games/fundingtick.html' },
    { id: 'classactivities', t: 'Class activities: Scavenger Hunt and Wacky Briefs', icon: '📸', sec: 'Class activities', d: 'The live class activities: the 20-minute Virtual Scavenger Hunt with a points tracker and timer, and the six Wacky Caribbean Client Briefs as flip cards with a team randomiser, a scorecard and a printable version.', f: 'games/classactivities.html' },
    { id: 'webtime', t: 'Web Time Machine', icon: '⏳', sec: 'Module 1 · Evolution', d: 'Travel from the analogue era through Web 1.0 to Web 5.0, unlock each era, then bridge the digital divide on a Caribbean island with fibre, towers, devices and accessibility.', f: 'games/webtimemachine.html' },
    { id: 'valuechain', t: 'Value Chain Tycoon', icon: '💰', sec: 'Module 2 · Value chain', d: 'Take a Caribbean song, film, game or vlog from idea to income: build the value chain, choose distribution and monetisation, see who keeps each dollar, and compare the old and new chains.', f: 'games/valuechain.html' },
    { id: 'ecosystem', t: 'Ecosystem Builder', icon: '🌐', sec: 'Module 2 · Ecosystem', d: 'Run a Caribbean digital media start-up: map its ecosystem, run the value chain, survive event cards from algorithm changes to hurricanes, choose your funding and get an ecosystem report.', f: 'games/ecosystem.html' },
    { id: 'lightingdirector', t: 'Lighting Director', icon: '🎬', sec: 'Module 3 · Lighting', d: 'Arrange key, fill, rim and background lights, reflectors and modifiers to find the best setup for each photo brief and model, then get a Director\'s Review and export your lighting plan.', f: 'games/lightingdirector.html' },
    { id: 'logolab', t: 'Logo Lab: Colour Theory', icon: '🎨', sec: 'Module 3 · Design', d: 'Design a logo for a Caribbean client using the colour wheel, harmonies and colour psychology, then let the Logo Critic check contrast, colour-blind safety and scalability. Export SVG, PNG and a brand board.', f: 'games/logolab.html' },
    { id: 'onelight', t: 'One-Light Studio', icon: '💡', sec: 'Module 3 · Lighting', d: 'Drag a single light around a portrait to create Rembrandt, loop, split, butterfly and rim lighting, then beat the six lighting challenges.', f: 'games/onelight.html' },
    { id: 'lologo', t: 'LoloGo: example app', icon: '🍗', sec: 'Module 3 · SBA example', d: 'A working mobile app prototype for ordering johnny cakes, BBQ chicken legs and other local food from Sint Maarten lolos. Explore the flows, then critique it as a digital solution.', f: 'games/lologo.html' },
    { id: 'blemish', t: 'Photo Editing Unit: blemish removal', icon: '🖌️', sec: 'Module 3 · Photo editing', d: 'The interactive guided workbook: nine steps to remove temporary spots in Photoshop on a separate Retouch layer, ethically and with consent, with help for every step and a printable checklist.', f: 'games/photo-blemish.html' },
    { id: 'lologo-case', t: 'LoloGo case study: lo-fi to hi-fi', icon: '📐', sec: 'Module 3 · Design process', d: 'A portfolio-style case study: hand-drawn sketches, grey wireframes and the polished app for 10 screens, with swipe compare, design notes and the full working prototype.', f: 'games/lologo-explainer.html' },
    { id: 'lologo-sba', t: 'Sample SBA: LoloGo (final IA)', icon: '📘', sec: 'SBA exemplar', d: 'A complete Grade One sample Internal Assessment in a school house format, with a 1,000–1,500 word counter and marking notes showing all 45 marks.', f: 'games/lologo-sba.html' },
    { id: 'lologo-pair', t: 'Sample Pair Assignment: LoloGo', icon: '📝', sec: 'SBA exemplar', d: 'The early proposal stage of the LoloGo SBA, with marking notes.', f: 'games/lologo-pair-assignment.html' },
    { id: 'ip', t: 'IP Court', icon: '⚖️', sec: 'Module 1', d: 'Copyright, patent or trademark? Compare and contrast, then judge real-world style intellectual property and plagiarism cases.', f: 'games/ipcourt.html' },
    { id: 'interview', t: 'The Interview Room', icon: '🎙️', sec: 'Module 2 · Employability', d: 'A voiced, simulated job interview with a two-person panel, speech bubbles, music and a follow-up thank-you e-mail.', f: 'games/interview.html' },
    { id: 'cv', t: 'Résumé Studio', icon: '📄', sec: 'Module 2 · Employability', d: 'Write your CV with live templates and a checklist, generate an application letter, then fix a badly written CV.', f: 'games/resumewriter.html' },
    { id: 'tz', t: 'Time Zone Navigator', icon: '🌐', sec: 'Module 2 · Collaboration', d: 'Run a global company from Basseterre, St. Kitts: choose the best digital channel for each situation by time zone, urgency and confidentiality.', f: 'games/timezones.html' },
    { id: 'inbox', t: 'Inbox Hero', icon: '✉️', sec: 'Module 2 · Communication', d: 'Compose professional e-mails to clients and collaborators: To, Cc or Bcc, subject lines, tone, attachments and netiquette.', f: 'games/inboxhero.html' },
    { id: 'people', t: 'Office Life: People Skills', icon: '🤝', sec: 'Module 2 · Workplace', d: 'A branching workday of clients, coworkers, deadlines and ethical dilemmas. Earn a great performance review.', f: 'games/officelife.html' },
    { id: 'pcbuild', t: 'PC Build Lab', icon: '🖥️', sec: 'Module 3 · Hardware', d: 'Input devices, types of computers, a museum of obsolete media and a steady-hand challenge: build a media workstation without touching the edges.', f: 'games/pcbuildlab.html' },
    { id: 'print', t: 'Print Lab', icon: '🖨️', sec: 'Module 3 · Output', d: 'Every type of printer, which suits the job, troubleshooting, and a 3D Print Studio where your settings make or break the print.', f: 'games/printlab.html' },
    { id: 'shortcuts', t: 'Shortcut Sprint', icon: '⌘', sec: 'Module 3 · Production', d: 'Learn and race the keyboard shortcuts that speed up your practical work.', f: 'games/shortcuts.html' },
    {"id": "balsamiqsim", "t": "Balsamiq Lab", "icon": "✏️", "sec": "Module 3 · Methods of implementing the creative process", "d": "Sketch low-fidelity wireframes, link the screens and click through them in Present mode, from the LoloGo case study to SBA prototypes.", "f": "games/balsamiqsim.html", "g": "sim"},
    {"id": "xmindsim", "t": "XMind Lab", "icon": "🧠", "sec": "Module 3 · The creative design process", "d": "Brainstorm with mind maps, then turn them into fishbones, timelines, PEST charts, SCAMPER maps and decision matrices.", "f": "games/xmindsim.html", "g": "sim"},
    {"id": "figmasim", "t": "Figma Lab", "icon": "📱", "sec": "Module 3 · Wireframes, mock-ups and prototypes", "d": "Practise interface design in a Figma-style editor: frames, auto layout, components and variants, styles, constraints and clickable prototypes, including LoloGo from lo-fi to hi-fi.", "f": "games/figmasim.html", "g": "sim"},
    {"id": "illustratorsim", "t": "Illustrator Lab", "icon": "✒️", "sec": "Modules 1 and 3 · Vector graphics, type and output", "d": "Practise vector graphics in an Illustrator-style editor: Pen tool, Pathfinder logos, type on a path, Image Trace and print versus web exports.", "f": "games/illustratorsim.html", "g": "sim"},
    {"id": "sba-markscheme", "t": "SBA Mark Scheme (teacher marking sheet)", "icon": "📝", "sec": "SBA marking", "d": "The Unit 1 mark scheme as a fillable sheet: tap the mark for each criterion, add comments, see subtotals, the weighted score and the module split, then download a Word copy or the class record.", "f": "games/sba-markscheme.html", "g": "sba"},
    {"id": "photoshopsim", "t": "Photoshop Lab", "icon": "🖼️", "sec": "Module 3 · Image editing and output", "d": "A practice photo editor that works on real pixels: layers, masks, adjustment layers, healing, compositing, crop, image size and export, across 14 Caribbean missions.", "f": "games/photoshopsim.html", "g": "sim"},
    {"id": "lightroomsim", "t": "Lightroom Lab", "icon": "🎞️", "sec": "Module 3 · Photo workflow and output", "d": "A practice photo library and developer: cull, rate, keyword, white-balance, recover, straighten, batch-edit with presets and export, across 14 Caribbean missions.", "f": "games/lightroomsim.html", "g": "sim"}
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

  const AGROUPS = [["sim", "🎨 Design software simulators", "Practice versions of Balsamiq, XMind, Figma, Illustrator, Photoshop and Lightroom with Foundation, Core and Challenge missions."], ["sba", "📘 SBA exemplars", "Grade One sample SBA work with marking notes."], ["games", "🎮 Games", "Every game practises a Digital Media skill."]], AGMAP = {"sim": ["balsamiqsim", "xmindsim", "figmasim", "illustratorsim", "photoshopsim", "lightroomsim"], "sba": ["lologo-sba", "lologo-pair", "lologo-case", "binwise-sba", "rootsway-sba", "sba-markscheme"]};
  const agOf = x => x.g || Object.keys(AGMAP).find(k => AGMAP[k].includes(x.id)) || 'games';
  function arcadeGroups(api) {
    const esc = api.esc, lv = (api.S && api.S.level) || 2, page = x => (x.sim || agOf(x) === 'sim') ? x.f + '?level=' + lv : x.f;
    return AGROUPS.map(([k, n, blurb]) => { const L = BUILT.filter(x => agOf(x) === k); return L.length ? `<div class="card"><h3>${n}</h3><p class="hint">${blurb}</p><div class="tiles">${L.map(x => `<button type="button" class="tile" data-gx="opengame" data-page="${page(x)}" data-id="${x.id}"><span class="ticon" aria-hidden="true">${x.icon}</span><span class="ribbon">${esc(x.sec)}</span><h3>${esc(x.t)}</h3><span class="meta">${esc(x.d)}</span><span class="meta">${agOf(x) === 'sim' ? 'Open simulator →' : agOf(x) === 'sba' ? 'Open →' : 'Play now →'}</span></button>`).join('')}</div></div>` : ''; }).join('');
  }
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'edpmgames',
    title: 'Digital Media game arcade',
    tile: { icon: '🕹️', meta: 'The DM Unit 1 Arcade, IP Court, The Interview Room, Résumé Studio and more' },
    render(api, loc) {
      const esc = api.esc, g = BUILT.find(x => x.id === loc.k);
      if (g) return `<div class="crumbs"><button type="button" class="linkbtn" data-go="edpmgames">← Digital Media game arcade</button><span>${esc(g.t)}</span></div>
        <div class="card"><h2>${esc(g.t)}</h2><p>This opens in full screen. Choose ✕ Exit game to come back to the course. Your progress is saved on this device.</p><div class="row"><button type="button" class="btn gold" data-gx="opengame" data-page="${g.f}" data-id="${g.id}" data-autofull="1">⛶ Open full screen</button></div></div>`;
      return `<div class="hero"><span class="eyebrow">Play & Compete</span><h1>Digital Media game arcade</h1><p>Every game and simulator opens full screen. Choose ✕ Exit game to come back to the course. Your progress is saved on this device.</p></div>
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
