/* Digital Media Unit 2 game arcade: the Digital Media games, played inside the course. — Developed by Kester Small */
(function () {
  try { window.addEventListener('message', ev => { const d = ev.data; if (d && d.type === 'edpm:get-game-src' && window.EDPM_GAME_SRC && window.EDPM_GAME_SRC[d.path] && ev.source) ev.source.postMessage({ type: 'edpm:game-src', path: d.path, src: window.EDPM_GAME_SRC[d.path] }, '*'); }); } catch (e) { }
  try { window.addEventListener('message', ev => { const d = ev.data; const toast = m => { try { window.COURSE_API && COURSE_API.toast(m); } catch (e) { } }; if (d && d.type === 'dm2:toast' && d.msg) { toast(String(d.msg).slice(0, 200)); return; } if (!d || d.type !== 'dm2:save' || !d.blob) return; Promise.resolve(window.claude && window.claude.use ? window.claude.use('downloads') : null).then(dl => { if (!dl) { toast('Saving files is not available here.'); return; } return dl.save({ filename: String(d.filename || 'download.html'), data: d.blob }).then(() => toast('File saved'), e => { if (e && e.code === 'rejected_extension') toast('That file type cannot be saved here.'); else if (e && e.code !== 'declined') toast('Saving is not available here.'); }); }); }); } catch (e) { }
  const BUILT = [
    { id: 'dmmindmap', t: 'Digital Media Mind Map', icon: '🧠', sec: 'Planning · All modules', d: 'Plan an app, website, e-book, film or smart product as a mind map. Work with classmates, merge their copies and keep a dated history of every change.', f: 'games/dmmindmap.html' },
    { id: 'arcade', t: 'Digital Media Unit 2 Arcade', icon: '🕹️', sec: 'All modules', d: 'Fast arcade modes with Unit 2 questions on design, colour, animation, HTML and CSS, publishing, mobile apps and revenue models, plus three practice sets.', f: 'games/dmarcade2.html' },
    { id: 'anim', t: 'Animation Studio', icon: '🎞️', sec: 'Module 1 · Animation', d: 'Keyframe a bouncing ball with timing, spacing and squash and stretch, see the 12 principles in motion, then build and play a walk cycle. Malik reviews your work.', f: 'games/animstudio.html' },
    { id: 'logolab', t: 'Logo Lab: Colour Theory', icon: '🎨', sec: 'Module 1 · Colour', d: 'Design a logo for a Caribbean client using the colour wheel, harmonies and colour psychology, then let the Logo Critic check contrast, colour-blind safety and scalability.', f: 'games/logolab.html' },
    { id: 'heroposter', t: 'Hero Poster Studio', icon: '🦸', sec: 'Module 1 · Composition', d: 'Design a typographic hero poster: duotone colour grading, a vertical name, a two-typeface quote (with your own handwriting font from Calligraphr) and a rim-lit portrait.', f: 'games/heroposter.html' },
    { id: 'lightingdirector', t: 'Lighting Director', icon: '🎬', sec: 'Module 1 · Audio and video', d: 'Arrange key, fill, rim and background lights, reflectors and modifiers for each photo or video brief, then get a Director\'s Review and export your lighting plan.', f: 'games/lightingdirector.html' },
    { id: 'onelight', t: 'One-Light Studio', icon: '💡', sec: 'Module 1 · Audio and video', d: 'Drag a single light around a portrait to create Rembrandt, loop, split, butterfly and rim lighting, then beat the six lighting challenges.', f: 'games/onelight.html' },
    { id: 'blemish', t: 'Photo Editing Unit: blemish removal', icon: '🖌️', sec: 'Module 1 · Image manipulation', d: 'A guided workbook: nine steps to remove temporary spots in Photoshop on a separate Retouch layer, ethically and with consent.', f: 'games/photo-blemish.html' },
    { id: 'webbuilder', t: 'Web Builder Lab', icon: '💻', sec: 'Module 2 · HTML and CSS', d: 'Code the Guavaberry Grove guest house site with Maya: 15 missions from page structure to flexbox, embeds, media queries, accessibility and debugging, checked live.', f: 'games/webbuilder.html' },
    { id: 'webtime', t: 'Web Time Machine', icon: '⏳', sec: 'Module 2 · Internet history', d: 'Travel from the analogue era through ARPANET and the World Wide Web to Web 3.0 and beyond, then bridge the digital divide on a Caribbean island.', f: 'games/webtimemachine.html' },
    { id: 'appstudio', t: 'App Studio: Idea to App Store', icon: '📱', sec: 'Module 3 · Mobile apps', d: 'Map the mobile ecosystem, pick an MVP, wireframe a clickable prototype, audit it against the seven UX factors, write a store listing and test revenue models with Jerome and Keisha.', f: 'games/appstudio.html' },
    { id: 'lologo', t: 'LoloGo: example app', icon: '🍗', sec: 'Module 3 · Example app', d: 'A working mobile app prototype for ordering johnny cakes, BBQ chicken legs and other local food from Sint Maarten lolos. Explore the flows, then critique its UX, revenue model and marketing.', f: 'games/lologo.html' },
    { id: 'lologo-case', t: 'LoloGo case study: lo-fi to hi-fi', icon: '📐', sec: 'Module 3 · Wireframes and prototypes', d: 'Hand-drawn sketches, grey wireframes and the polished app for 10 screens, with swipe compare, design notes and the full working prototype.', f: 'games/lologo-explainer.html' },
    { id: 'funding-highlight', t: 'Funding a Digital Media Project', icon: '💰', sec: 'Module 1', d: "A highlight activity: mark the benefit and the disadvantage of seven ways to fund a project (crowdfunding, grants, angels, loans, venture capital, sponsorships, bootstrapping), then check your highlights.", f: 'games/funding-highlight.html' },
    { id: 'binwise-sba', t: 'Sample SBA: BinWise Belize (Unit 2)', icon: '📘', sec: 'SBA exemplar', d: 'A complete Grade One sample Unit 2 SBA in the Sandbox Tree College house format: proposal, budget, ecosystem, creative process, wireframes to mock-ups, the app and its 30-second ad, with marking notes for all 45 marks.', f: 'games/binwise-sba.html' },
    { id: 'rootsway-sba', t: 'Sample SBA: Rootsway SXM (Unit 2 website)', icon: '🌐', sec: 'SBA exemplar', d: 'A second Grade One sample Unit 2 SBA, this time a website: site map, value chain, WordPress back-end, persona and SWOT, the hand-coded home page and its 30-second ad, with marking notes for all 45 marks.', f: 'games/rootsway-sba.html' },
    { id: 'shortcuts', t: 'Shortcut Sprint', icon: '⌘', sec: 'All modules · Production', d: 'Learn and race the keyboard shortcuts that speed up your practical work.', f: 'games/shortcuts.html' },
    {"id": "balsamiqsim", "t": "Balsamiq Lab", "icon": "✏️", "sec": "Module 3 · Tools and techniques to create a mobile application", "d": "Wireframe mobile and web screens, fix usability problems and build click-through prototypes for user testing.", "f": "games/balsamiqsim.html", "g": "sim"},
    {"id": "xmindsim", "t": "XMind Lab", "icon": "🧠", "sec": "Module 2 · Prototypes using design principles", "d": "Map audiences, concept maps, site maps and proposal plans with topics, relationships, boundaries and an outline view.", "f": "games/xmindsim.html", "g": "sim"},
    {"id": "figmasim", "t": "Figma Lab", "icon": "📱", "sec": "Modules 2 and 3 · Interface design and prototypes", "d": "Practise interface design in a Figma-style editor: frames, auto layout, components and variants, styles, constraints and clickable prototypes for Caribbean apps.", "f": "games/figmasim.html", "g": "sim"},
    {"id": "illustratorsim", "t": "Illustrator Lab", "icon": "✒️", "sec": "Module 1 · Graphics and colour", "d": "Practise vector graphics in an Illustrator-style editor: shapes, Pathfinder logos, icon grids, colour schemes and gradients.", "f": "games/illustratorsim.html", "g": "sim"},
    {"id": "photoshopsim", "t": "Photoshop Lab", "icon": "🖼️", "sec": "Modules 1 and 2 · Compositing and web graphics", "d": "A practice photo editor that works on real pixels: layers, masks, adjustment layers, healing, compositing, crop, image size and export, across 14 Caribbean missions.", "f": "games/photoshopsim.html", "g": "sim"},
    {"id": "lightroomsim", "t": "Lightroom Lab", "icon": "🎞️", "sec": "Module 2 · Photo workflow and asset management", "d": "A practice photo library and developer: cull, rate, keyword, white-balance, recover, straighten, batch-edit with presets and export, across 14 Caribbean missions.", "f": "games/lightroomsim.html", "g": "sim"}
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
    tile: { icon: '🕹️', meta: 'The DM Unit 2 Arcade, Animation Studio, Web Builder Lab, App Studio and more' },
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
