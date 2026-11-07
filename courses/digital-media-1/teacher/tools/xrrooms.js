/* AR & VR rooms: every 3D, VR and AR activity in this course, in one tab. Everything opens inside the course.
   Kester Small */
(function () {
  if (window.__xrRooms) return; window.__xrRooms = true;
  var me = document.currentScript, course = (me && me.dataset.course) || '';
  var ALL = {
    'cape-it-1': [
      { id: 'itcareers', icon: '🏛️', t: 'IT Careers World', tag: 'VR · 3D', d: 'A lobby with a door for each of the eleven IT professional roles. Step inside and work a shift as a network engineer, DBA, web designer, systems analyst and more.', page: 'games/itcareers.html' },
      { id: 'vrnet', icon: '🥽', t: 'Network Ops Room', tag: 'VR · 3D', d: 'Walk a school network room: identify each device, trace how data travels, then find the fault.', page: 'games/vrnetwork.html' },
      { id: 'arbench', icon: '📷', t: 'AR Hardware Bench', tag: 'AR · 3D', d: 'Put a computer on your desk with your phone camera, explore each part, then build it from clues.', page: 'games/arbench.html' }
    ],
    'comm-studies': [
      { id: 'apoc3d', icon: '🧟', t: 'Skills Apocalypse in 3D', tag: 'VR · AR · 3D', d: 'The Rebuilding Council in a 3D survivor settlement: walk between the stations, meet the survivors and plan your expository essay.', page: 'games/apocalypse3d.html' }
    ]
  };
  var CSS = '.xr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-top:10px}' +
    '.xr-card{border:2px solid var(--line);border-radius:18px;padding:16px;background:var(--surface);display:flex;flex-direction:column;gap:8px;text-align:left;cursor:pointer;color:inherit;font:inherit}' +
    '.xr-card:hover{border-color:var(--gold,#F5C542)}.xr-card:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:3px}' +
    '.xr-ic{font-size:2rem;line-height:1}.xr-tag{display:inline-block;width:max-content;font-size:.7rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;border:1.5px solid currentColor;border-radius:999px;padding:1px 9px;opacity:.85}' +
    '.xr-card h3{margin:0}.xr-card p{margin:0}.xr-how{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:8px}.xr-how div{border:1px dashed var(--line);border-radius:12px;padding:10px}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  function list() {
    var own = ALL[course] || [];
    return own.concat([{ id: 'palace3d', icon: '🏰', t: 'My memory palace in 3D', tag: 'VR · AR · 3D', d: 'Walk through your own memory palace with your memes at each spot, choose where you study (beach hut, rainforest, space station and more), test your recall, or pin your images around your real room with AR.', study: 'palace' }]);
  }
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'xrrooms',
    title: 'AR & VR rooms',
    tile: { icon: '🥽', meta: 'Walk-in 3D rooms, VR headsets and AR on your phone.' },
    render: function (api) {
      var esc = api.esc;
      return '<section class="hero"><span class="eyebrow">Step inside</span><h1>AR &amp; VR rooms</h1><p>Learn by walking around. Every room works on a computer or a phone, and in a VR headset. Some also use your phone camera for AR.</p></section>' +
        '<div class="card"><div class="xr-grid">' + list().map(function (r) { return '<button type="button" class="xr-card" data-px="open" data-pv="xrrooms" data-k="' + esc(r.id) + '"><span class="xr-ic" aria-hidden="true">' + r.icon + '</span><span class="xr-tag">' + esc(r.tag) + '</span><h3>' + esc(r.t) + '</h3><p>' + esc(r.d) + '</p><span class="meta">Open ▸</span></button>'; }).join('') + '</div></div>' +
        '<div class="card"><h2>How to use the rooms</h2><div class="xr-how">' +
        '<div><b>💻 Computer</b><p>Drag to look around. Click the floor or use W A S D to move. Click things to select them.</p></div>' +
        '<div><b>📱 Phone or tablet</b><p>Drag to look, or press Tilt and move your phone. Tap the floor to walk and tap things to select them.</p></div>' +
        '<div><b>🥽 VR headset</b><p>Open the room in the headset\'s browser and press Enter VR. Point with a controller and pull the trigger to select.</p></div>' +
        '<div><b>📷 AR</b><p>On an Android phone with Chrome, press the AR button and point your camera at a table or the floor.</p></div>' +
        '<div><b>🔊 Sound and 📳 vibration</b><p>Each room has its own sound and vibration switches. Turn them off any time.</p></div></div></div>';
    },
    click: function (action, el, api) {
      if (action !== 'open') return;
      var r = list().filter(function (x) { return x.id === el.dataset.k; })[0]; if (!r) return;
      if (r.study) { if (window.StudyTools) { window.StudyTools.open(r.study); api.toast('Open a palace, then press 🥽 3D · VR · AR.'); } else api.toast('Study tools are still loading. Try again in a moment.'); return; }
      if (window.openGameFull) window.openGameFull(r.page, r.id); else api.toast('That room could not open here.');
    }
  });
})();
