/* Mind maps tab: the course's mind map maker, opened inside the course. Kester Small */
(function () {
  if (window.__mindmapsTab) return; window.__mindmapsTab = true;
  var me = document.currentScript, course = (me && me.dataset.course) || '';
  var MAPS = {
    'digital-media-1': [{ id: 'dmmindmap', icon: '🧠', t: 'Digital Media Mind Map', d: 'Plan an app, website, e-book, film or smart product as a colourful mind map. Work with classmates, invite them even when you are offline, merge their copies and see the history of every change.', page: 'games/dmmindmap.html' }],
    'digital-media-2': [{ id: 'dmmindmap', icon: '🧠', t: 'Digital Media Mind Map', d: 'Plan an app, website, e-book, film or smart product as a colourful mind map. Work with classmates, invite them even when you are offline, merge their copies and see the history of every change.', page: 'games/dmmindmap.html' }],
    'comm-studies': [{ id: 'essaymindmap', icon: '🧠', t: 'Essay Mind Map', d: 'Plan your essay as a mind map, from thesis to topic sentences, evidence and conclusion. Work with classmates, invite them even when you are offline, merge their copies and see the history of every change.', page: 'games/essaymindmap.html' }]
  };
  var list = MAPS[course]; if (!list) return;
  var st = document.createElement('style'); st.textContent = '.mmt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-top:10px}.mmt-card{border:2px solid var(--line);border-radius:18px;padding:16px;background:var(--surface);display:flex;flex-direction:column;gap:8px;text-align:left;cursor:pointer;color:inherit;font:inherit}.mmt-card:hover{border-color:var(--gold,#F5C542)}.mmt-card:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:3px}.mmt-card h3,.mmt-card p{margin:0}.mmt-ic{font-size:2rem;line-height:1}'; document.head.appendChild(st);
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'mindmaps', title: 'Mind maps',
    tile: { icon: '🧠', meta: list.map(function (m) { return m.t; }).join(', ') + ': plan, collaborate and keep a history.' },
    render: function (api) { var esc = api.esc; return '<section class="hero"><span class="eyebrow">Plan it visually</span><h1>Mind maps</h1><p>Map your ideas, then work on them with classmates. Your map is saved on this device.</p></section><div class="card"><div class="mmt-grid">' + list.map(function (m) { return '<button type="button" class="mmt-card" data-px="open" data-pv="mindmaps" data-k="' + esc(m.id) + '"><span class="mmt-ic" aria-hidden="true">' + m.icon + '</span><h3>' + esc(m.t) + '</h3><p>' + esc(m.d) + '</p><span class="meta">Open full screen ▸</span></button>'; }).join('') + '</div></div>'; },
    click: function (action, el, api) { if (action !== 'open') return; var m = list.filter(function (x) { return x.id === el.dataset.k; })[0]; if (m && window.openGameFull) window.openGameFull(m.page, m.id); else api.toast('The mind map could not open here.'); }
  });
})();
