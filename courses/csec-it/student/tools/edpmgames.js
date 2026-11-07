/* CSEC Information Technology · Simulators & game arcade: the IT simulators and games in this course, played inside the course. — Developed by Kester Small */
(function () {
  try { window.addEventListener('message', ev => { const d = ev.data; if (d && d.type === 'csec:opengame' && d.page && window.openGameFull) window.openGameFull(d.page, d.id || ''); }); } catch (e) { }
  const BUILT = [
    { g: 'sim', id: 'winsim', t: 'Windows Desktop Lab', icon: '🪟', sec: 'Section 1 · S2 · S3', d: 'A working Windows desktop: files and folders, Settings ▸ About specs, Task Manager, Command Prompt (ipconfig, ping), Wi-Fi, security scans and backups.', f: 'games/winsim.html' },
    { g: 'sim', id: 'wordsim', t: 'Word Lab', icon: '🟦', sec: 'Section 4 · Word-processing', d: 'A Word-style ribbon and page: formatting, tables, columns, headers and footers, review and protection, table of contents, mail merge and fillable forms.', f: 'games/wordsim.html' },
    { g: 'sim', id: 'excelsim', t: 'Excel Lab', icon: '🟩', sec: 'Section 5 · Spreadsheets', d: 'A real formula engine: functions, absolute references, fill handle, formatting, sorting, filtering, pivot tables, charts and linked worksheets.', f: 'games/excelsim.html' },
    { g: 'sim', id: 'accesssim', t: 'Access Lab', icon: '🟥', sec: 'Section 6 · Databases', d: 'Design tables and keys, set validation rules, build relationships, run queries with criteria and calculated fields, then make forms with subforms and grouped reports.', f: 'games/accesssim.html' },
    { g: 'sim', id: 'publishersim', t: 'Publisher Lab', icon: '🟩', sec: 'Section 4 · Desktop publishing', d: 'Flyers, tri-fold brochures, business cards and newsletters with layout guides, colour schemes, linked text boxes and a design-principles checker.', f: 'games/publishersim.html' },
    { g: 'sim', id: 'websim', t: 'Web Page Builder', icon: '🌐', sec: 'Section 4 · S2 · Web pages', d: 'Plan a site, design pages with a logo, navigation and content areas, add all four hyperlink types, switch to HTML code view, publish by FTP and evaluate a website.', f: 'games/websim.html' },
    { g: 'code', id: 'codelab', t: 'Code Lab', icon: '🧮', sec: 'Sections 7–8 · Programming', d: 'IPO charts, pseudocode and Python you can run, automatic trace tables, flowcharts, and a converter between pseudocode, flowcharts and Python, Pascal, VB, Java, C and JavaScript.', f: 'games/codelab.html' },
    { g: 'code', id: 'robolab', t: 'Robo Lab', icon: '🤖', sec: 'Sections 7–8 · Blocks and robots', d: 'Scratch-style blocks drive robots through Caribbean missions: relief deliveries, beach clean-ups, baggage sorting, mazes and line followers. See your blocks as pseudocode, a flowchart and real code.', f: 'games/robolab.html' },
    { g: 'quiz', id: 'emergency', t: 'Emergency Meeting · CSEC IT', icon: '🚨', sec: 'All sections · Review', d: "The crew game: find the impostor answer before the ship goes down, across all eight CSEC IT sections.", f: 'games/emergency.html' },
    { g: 'quiz', id: 'racer', t: 'CSEC IT Underground · Street Racer', icon: '🏎️', sec: 'All sections · Paper 01 practice', d: 'Four rival cars carry options A to D. Steer into the correct answer for a takedown.', f: 'games/streetracer.html' },
    { g: 'quiz', id: 'ops', t: 'CSEC OPS · Information Technology', icon: '🎯', sec: 'All sections · Paper 01 practice', d: 'A 3D quiz battleground: each opponent is an answer. Read the question, pick your target and keep your armour up.', f: 'games/ops.html' },
    { g: 'quiz', id: 'pcbuild', t: 'PC Build Lab', icon: '🖥️', sec: 'Section 1 · Hardware', d: 'Input devices, types of computers, a museum of storage media and a steady-hand build challenge.', f: 'games/pcbuildlab.html' },
    { g: 'quiz', id: 'print', t: 'Print Lab', icon: '🖨️', sec: 'Section 1 · Output devices', d: 'Every type of printer, which suits the job, troubleshooting, and a 3D Print Studio.', f: 'games/printlab.html' },
    { g: 'quiz', id: 'inbox', t: 'Inbox Hero', icon: '✉️', sec: 'Sections 2–3 · E-mail and netiquette', d: 'Compose professional e-mails: To, Cc or Bcc, subject lines, tone, attachments, netiquette and spotting phishing.', f: 'games/inboxhero.html' },
    { g: 'quiz', id: 'shortcuts', t: 'Shortcut Sprint', icon: '⌨️', sec: 'Sections 4–5 · Productivity', d: 'Learn and race the keyboard shortcuts that speed up your SBA work.', f: 'games/shortcuts.html' },
    { g: 'quiz', id: 'tz', t: 'Time Zone Navigator', icon: '🌐', sec: 'Section 2 · Communication tools', d: 'Run a global company from Bridgetown: choose the best communication tool by time zone, urgency and confidentiality.', f: 'games/timezones.html' }
  ];
  window.CSEC_GAMES = BUILT;
  const GROUPS = [['sim', '🖥️ Windows and Office simulators', 'Realistic practice for the software in your SBA and Paper 032. Every simulator has 🪜 Foundation, ⚙️ Core and 🚀 Challenge missions plus free practice.'], ['code', '🤖 Coding, flowcharts and robots', 'Blocks, pseudocode, flowcharts, Python and more. Start with the basics and work up to exciting challenges.'], ['quiz', '🎮 Quiz arcade and skill games', 'Revise every section with games.']];

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'edpmgames',
    title: 'Simulators & game arcade',
    tile: { icon: '🕹️', meta: 'Windows, Word, Excel, Access, Publisher, Web Page Builder, Code Lab, Robo Lab and quiz games.' },
    mount(api, loc, el) {
      try { const af = el && el.querySelector('[data-autofull]'); const act = navigator.userActivation ? navigator.userActivation.isActive : true; if (af && act && !document.getElementById('gx-full') && window.openGameFull) setTimeout(() => window.openGameFull(af.dataset.page, af.dataset.id), 0); } catch (e) { }
      const f = el && el.querySelector('#gx-inline'); if (!f || !window.GAME_HTML || !window.GAME_HTML[f.dataset.gid]) return;
      const q = (f.dataset.q || '').replace(/[^\w=&.-]/g, ''), pre = q ? '<script>try{history.replaceState(null,"",location.href.split("?")[0]+"?' + q + '")}catch(e){}<\/script>' : '';
      f.src = URL.createObjectURL(new Blob([pre + window.GAME_HTML[f.dataset.gid]], { type: 'text/html' }));
    },
    render(api, loc) {
      const esc = api.esc, g = BUILT.find(x => x.id === loc.k);
      const lv = (api.S && api.S.level) || 2, withLv = x => x.g === 'quiz' ? x.f : x.f + '?level=' + lv;
      if (g) return `<div class="crumbs"><button type="button" class="linkbtn" data-go="edpmgames">← Simulators & game arcade</button><span>${esc(g.t)}</span></div>
        <div class="card"><h2>${esc(g.t)}</h2><p>This opens in full screen. Choose ✕ Exit game to come back to the course. Your progress is saved on this device.</p><div class="row"><button type="button" class="btn gold" data-gx="opengame" data-page="${withLv(g)}" data-id="${g.id}" data-autofull="1">⛶ Open full screen</button></div></div>`;
      return `<div class="hero"><span class="eyebrow">Simulators & Practicals</span><h1>Simulators & game arcade</h1><p>The IT simulators and games in this course. Everything opens full screen right here inside the course; choose Exit game to come back. Simulators open at your course level (${({ 1: '🪜 Foundation', 2: '⚙️ Core', 3: '🚀 Challenge' })[lv]}); you can dial up or down inside each one.</p></div>
      ${GROUPS.map(([k, n, blurb]) => `<div class="card"><h3>${n}</h3><p class="hint">${blurb}</p><div class="tiles">${BUILT.filter(x => x.g === k).map(x => `<button type="button" class="tile" data-gx="opengame" data-page="${withLv(x)}" data-id="${x.id}"><span class="ticon" aria-hidden="true">${x.icon}</span><span class="ribbon">${esc(x.sec)}</span><h3>${esc(x.t)}</h3><span class="meta">${esc(x.d)}</span><span class="meta">Open full screen →</span></button>`).join('')}</div></div>`).join('')}
      <p class="hint">The simulators are practice versions of the Windows and Microsoft Office interface made for learning. They are not affiliated with Microsoft.</p>`;
    }
  });
})();
