/* Information Technology Unit 1 game arcade: the IT games in this course, played inside the course. — Developed by Kester Small */
(function () {
  try { window.addEventListener('message', ev => { const d = ev.data; if (d && d.type === 'edpm:get-game-src' && window.EDPM_GAME_SRC && window.EDPM_GAME_SRC[d.path] && ev.source) ev.source.postMessage({ type: 'edpm:game-src', path: d.path, src: window.EDPM_GAME_SRC[d.path] }, '*'); }); } catch (e) { }
  const BUILT = [
    { id: 'emergency', t: 'Emergency Meeting · CAPE IT', icon: '🚨', sec: 'All modules · Review', d: "The crew game: find the impostor answer before the ship goes down. Questions realigned to every specific objective of the CAPE IT Unit 1 syllabus (CXC A4/U2/21).", f: 'games/emergency.html' },
    { id: 'racer', t: 'CAPE IT Underground · Street Racer', icon: '🏎️', sec: 'All modules · Paper 01 practice', d: "The 3D street racer: four rival cars carry options A to D. Steer into the correct answer for a takedown. Each race draws 15 questions, 5 per module, from all 40 specific objectives.", f: 'games/streetracer.html' },
    { id: 'capeops', t: 'CAPE OPS · IT Unit 1', icon: '🎯', sec: 'All modules · Paper 01 practice', d: "The 3D quiz battleground: each opponent is an answer. Read the question, pick your target and keep your armour up. Choose a module (45 questions each) or a mixed paper, and set the time per question.", f: 'games/capeops.html' },
    { id: 'vrnet', t: 'Network Ops Room · VR', icon: '🥽', sec: 'Module 2 · Networks (SOs 2.10–2.14)', d: 'Walk around a 3D school network room: identify every device, trace how data travels, then find the fault. Works on a computer or phone, and in a VR headset.', f: 'games/vrnetwork.html' },
    { id: 'arbench', t: 'AR Hardware Bench', icon: '📷', sec: 'Module 2 · Hardware (SO 2.3)', d: 'Put a computer on your desk with your phone camera (Android), or use the 3D bench on any device. Explore each part, then build the computer from clues.', f: 'games/arbench.html' },
    { id: 'pcbuild', t: 'PC Build Lab', icon: '🖥️', sec: 'Module 2 · Hardware (SO 2.3)', d: 'Input devices, types of computers, a museum of obsolete storage media and a steady-hand challenge: build a workstation without touching the edges.', f: 'games/pcbuildlab.html' },
    { id: 'print', t: 'Print Lab', icon: '🖨️', sec: 'Module 2 · Output devices (SO 2.3)', d: 'Every type of printer, which suits the job, troubleshooting, and a 3D Print Studio where your settings make or break the print.', f: 'games/printlab.html' },
    { id: 'tz', t: 'Time Zone Navigator', icon: '🌐', sec: 'Module 1 · IT tools (SO 1.9)', d: 'Run a global company from Anguilla: choose the best communication tool for each situation by time zone, urgency and confidentiality, then justify it.', f: 'games/timezones.html' },
    { id: 'inbox', t: 'Inbox Hero', icon: '✉️', sec: 'Module 1 · IT tools (SO 1.9)', d: 'Compose professional e-mails: To, Cc or Bcc, subject lines, tone, attachments and netiquette.', f: 'games/inboxhero.html' },
    { id: 'shortcuts', t: 'Shortcut Sprint', icon: '⌘', sec: 'Productivity', d: 'Learn and race the keyboard shortcuts that speed up your lab and report work.', f: 'games/shortcuts.html' },
    { id: 'wordsim', t: 'Word Lab: Exam Writer', icon: '📝', sec: 'Paper 02 and Paper 03/2 · Writing practice', d: 'Write Paper 02 structured answers and Paper 03/2 responses in a realistic Word window, build model answers part by part with marking notes, and complete the Research Builder.', f: 'games/wordsim.html' },
    { id: 'htmllab', t: 'HTML Code Lab', icon: '💻', sec: 'Module 2 · The Internet, the Web and HTML (SOs 2.18, 2.19)', d: 'Build real web pages for clients across the Caribbean in a live HTML editor, tick off each step as your code comes right, and practise Paper 02 questions on HTML and the structure of the Web.', f: 'games/htmllab.html' }
  ];

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'edpmgames',
    title: 'IT game arcade',
    tile: { icon: '🕹️', meta: 'Emergency Meeting, Street Racer, CAPE OPS, the VR network room, the AR hardware bench, PC Build Lab, Print Lab, Time Zone Navigator and more' },
    mount(api, loc, stage) {
      try { const af = stage && stage.querySelector('[data-autofull]'); const act = navigator.userActivation ? navigator.userActivation.isActive : true; if (af && act && !document.getElementById('gx-full') && window.openGameFull) setTimeout(() => window.openGameFull(af.dataset.page, af.dataset.id), 0); } catch (e) { }
    },
    render(api, loc) {
      const esc = api.esc, g = BUILT.find(x => x.id === loc.k);
      if (g) return `<div class="crumbs"><button type="button" class="linkbtn" data-go="edpmgames">← IT game arcade</button><span>${esc(g.t)}</span></div>
        <div class="card"><h2>${esc(g.t)}</h2><p>This opens in full screen. Choose ✕ Exit game to come back to the course. Your progress is saved on this device.</p><div class="row"><button type="button" class="btn gold" data-gx="opengame" data-page="${g.f}" data-id="${g.id}" data-autofull="1">⛶ Open full screen</button></div></div>`;
      return `<div class="hero"><span class="eyebrow">Play & Compete</span><h1>IT game arcade</h1><p>The IT games in this course. Every game opens full screen right here inside the course. Choose Exit game to come back.</p></div>
      <div class="card"><h3>Play here</h3><div class="tiles">${BUILT.map(x => `<button type="button" class="tile" data-gx="opengame" data-page="${x.f}" data-id="${x.id}"><span class="ticon" aria-hidden="true">${x.icon}</span><span class="ribbon">${esc(x.sec)}</span><h3>${esc(x.t)}</h3><span class="meta">${esc(x.d)}</span><span class="meta">Play full screen →</span></button>`).join('')}</div></div>`;
    }
  });
})();
