/* Spotify & YouTube study music: curated links, embedded player where allowed, and students' own links */
(function () {
  const CSS = `
.st-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.st-card{display:flex;flex-direction:column;gap:8px;padding:14px;border-radius:16px;border:1px solid var(--line);background:var(--surface);position:relative}
.st-card .st-logo{display:inline-flex;align-items:center;gap:6px;font-weight:800;font-size:.8rem;letter-spacing:.06em;text-transform:uppercase}
.st-sp{color:#1DB954}.st-yt{color:#FF4E45}
.st-card .row{margin-top:auto}
.st-player{border-radius:14px;overflow:hidden;box-shadow:0 0 0 2px rgba(245,197,66,.6),0 18px 34px -16px rgba(0,0,0,.8);background:#000}
.st-player iframe{display:block;width:100%;border:0}
.st-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.st-mylist{display:flex;flex-direction:column;gap:8px}
.st-item{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:var(--surface)}
.st-item .t{flex:1 1 180px;min-width:0;overflow-wrap:anywhere}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  const SP = [
    ['37i9dQZF1DWWQRwui0ExPn', 'Lofi Beats', 'Classic lo-fi hip hop for reading and note-making.'],
    ['37i9dQZF1DWYoYGBbGKurt', 'Lofi Chill', 'Softer lo-fi for long writing sessions.'],
    ['37i9dQZF1DX8Uebhn9wzrS', 'Chill Lofi Study Beats', 'Steady beats for timed practice.'],
    ['37i9dQZF1DWZeKCadgRdKQ', 'Deep Focus', 'Ambient and post-rock with no lyrics, good for essays.'],
    ['37i9dQZF1DX4sWSpwq3LiO', 'Peaceful Piano', 'Gentle solo piano for revision.'],
    ['37i9dQZF1DX3Ogo9pFvBkY', 'Ambient Relaxation', 'Calm soundscapes for winding down.'],
    ['37i9dQZF1DWXLeA8Omikj7', 'Brain Food', 'Chilled electronic for problem solving.'],
    ['37i9dQZF1DX0SM0LYsmbMT', 'Jazz Vibes', 'Mellow jazz-hop for group work.'],
    ['37i9dQZF1DWWEJlAGA9gs0', 'Classical Essentials', 'Well-known classical pieces.']
  ];
  const YT = [
    ['https://www.youtube.com/@LofiGirl', 'Lofi Girl', 'The famous 24/7 lo-fi study stream and playlists.'],
    ['https://www.youtube.com/@ChillhopMusic', 'Chillhop Music', 'Jazzy, instrumental chillhop radio.']
  ];
  const SEARCH = [['Lo-fi', 'lofi hip hop study'], ['Caribbean Chill', 'caribbean chill instrumental'], ['Steelpan', 'steelpan relaxing instrumental'], ['Rain Sounds', 'rain sounds for studying'], ['Ocean Waves', 'ocean waves relaxing'], ['Classical', 'classical music for studying'], ['Ambient', 'ambient study music'], ['Jazz', 'jazz for studying'], ['Acoustic', 'acoustic chill instrumental']];
  const ytS = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
  const spS = q => 'https://open.spotify.com/search/' + encodeURIComponent(q);
  function parse(url) {
    let u; try { u = new URL(String(url).trim()); } catch (e) { return null; }
    if (u.protocol !== 'https:') return null;
    const h = u.hostname.replace(/^www\./, '');
    if (h === 'open.spotify.com') { const m = u.pathname.match(/^\/(?:intl-[a-z-]+\/)?(playlist|album|track|episode|show|artist)\/([A-Za-z0-9]+)/); if (!m) return null; return { kind: 'spotify', url: `https://open.spotify.com/${m[1]}/${m[2]}`, embed: `https://open.spotify.com/embed/${m[1]}/${m[2]}?theme=0`, h: m[1] === 'track' || m[1] === 'episode' ? 152 : 380 }; }
    if (h === 'youtube.com' || h === 'm.youtube.com' || h === 'music.youtube.com' || h === 'youtu.be') {
      let id = h === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v'); const list = u.searchParams.get('list');
      if (!id) { const m = u.pathname.match(/^\/(?:live|shorts|embed)\/([A-Za-z0-9_-]{6,})/); if (m) id = m[1]; }
      if (id && !/^[A-Za-z0-9_-]{6,20}$/.test(id)) id = null;
      if (list && !/^[A-Za-z0-9_-]{6,64}$/.test(list)) return null;
      if (!id && !list) return { kind: 'youtube', url: u.href, embed: null };
      return { kind: 'youtube', url: u.href, embed: id ? `https://www.youtube-nocookie.com/embed/${id}${list ? '?list=' + list : ''}` : `https://www.youtube-nocookie.com/embed/videoseries?list=${list}`, h: 315 };
    }
    return null;
  }
  let playing = null, warn = '';
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'stream', title: 'Spotify & YouTube', tile: { icon: '🎵', meta: 'Study playlists on Spotify and YouTube, plus your own links.' },
    render(api) {
      const esc = api.esc, S = api.S, my = (S.stream && S.stream.links) || [];
      const M = window.COURSE_MUSIC; const ownOn = M && M.isPlaying && M.isPlaying();
      let h = `<section class="hero"><span class="eyebrow">Music</span><h1>Spotify & YouTube</h1><p>Pick a study playlist, or paste your own Spotify or YouTube link. Music with no lyrics is best while you read and write.</p><div class="row"><button type="button" class="btn ghost" data-go="music">🎧 Built-in Music Room (works offline)</button></div></section>`;
      if (ownOn) h += `<p class="fb note">The Music Room is playing. <button type="button" class="linkbtn" data-px="stopown">Stop it</button> before starting another player.</p>`;
      if (playing) h += `<div class="card"><div class="st-row" style="justify-content:space-between"><h3>Now Playing: ${esc(playing.name)}</h3><button type="button" class="btn ghost" data-px="close">Close player</button></div><div class="st-player"><iframe title="${esc(playing.name)} player" src="${esc(playing.embed)}" height="${playing.h || 380}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p class="hint">Player blank? Some schools, apps and browsers block embedded players. Use <a href="${esc(playing.url)}" target="_blank" rel="noopener">Open in ${playing.kind === 'spotify' ? 'Spotify' : 'YouTube'} ↗</a> instead. Spotify may play short previews unless you are logged in.</p></div>`;
      h += `<div class="card"><h2>Spotify Study Playlists</h2><div class="st-grid">${SP.map(([id, n, d]) => `<div class="st-card"><span class="st-logo st-sp">● Spotify</span><h3>${esc(n)}</h3><span class="meta">${esc(d)}</span><div class="row"><button type="button" class="btn gold" data-px="play" data-k="sp:${id}" data-n="${esc(n)}">▶ Play Here</button><a class="btn ghost" href="https://open.spotify.com/playlist/${id}" target="_blank" rel="noopener">Open ↗</a></div></div>`).join('')}</div></div>`;
      h += `<div class="card"><h2>YouTube Channels</h2><div class="st-grid">${YT.map(([u, n, d]) => `<div class="st-card"><span class="st-logo st-yt">▶ YouTube</span><h3>${esc(n)}</h3><span class="meta">${esc(d)}</span><div class="row"><a class="btn gold" href="${u}" target="_blank" rel="noopener">Open Channel ↗</a></div></div>`).join('')}</div></div>`;
      h += `<div class="card"><h2>Search by Mood</h2><p class="hint">Opens a search in a new tab.</p><div class="st-grid">${SEARCH.map(([n, q]) => `<div class="st-card"><h3>${esc(n)}</h3><div class="row"><a class="btn ghost" href="${spS(q)}" target="_blank" rel="noopener">Spotify ↗</a><a class="btn ghost" href="${ytS(q)}" target="_blank" rel="noopener">YouTube ↗</a></div></div>`).join('')}</div></div>`;
      h += `<div class="card"><h2>My Links</h2><p class="hint">Paste a Spotify playlist, album or track link, or a YouTube video or playlist link. Saved on this device (up to 12).</p>
        <div class="st-row"><label class="sr" for="st-url">Music link</label><input id="st-url" class="search" style="flex:1 1 240px" placeholder="https://open.spotify.com/playlist/… or https://youtu.be/…" maxlength="300"><label class="sr" for="st-name">Name</label><input id="st-name" class="search" style="flex:1 1 140px" placeholder="Name (optional)" maxlength="40"><button type="button" class="btn go" data-px="add">Add</button></div>
        ${warn ? `<p class="fb bad">${esc(warn)}</p>` : ''}
        <div class="st-mylist">${my.length ? my.map((l, i) => { const p = parse(l.u); return `<div class="st-item"><span class="${p && p.kind === 'spotify' ? 'st-sp' : 'st-yt'}">${p && p.kind === 'spotify' ? '●' : '▶'}</span><span class="t" data-notc><b>${esc(l.n)}</b><br><span class="hint">${esc(l.u)}</span></span>${p && p.embed ? `<button type="button" class="btn gold" data-px="playmy" data-i="${i}">▶ Play Here</button>` : ''}<a class="btn ghost" href="${esc(l.u)}" target="_blank" rel="noopener">Open ↗</a><button type="button" class="tool" data-px="del" data-i="${i}" aria-label="Remove ${esc(l.n)}">✕</button></div>`; }).join('') : '<p class="hint">No links yet.</p>'}</div></div>`;
      h += `<p class="hint">Tip: keep the volume low and choose instrumental music for reading and writing. Lyrics compete with the words you are trying to process.</p>`;
      return h;
    },
    click(a, el, api) {
      const S = api.S; S.stream = S.stream || { links: [] }; S.stream.links = S.stream.links || [];
      if (a === 'play') { const id = el.dataset.k.split(':')[1]; playing = { kind: 'spotify', name: el.dataset.n, url: 'https://open.spotify.com/playlist/' + id, embed: 'https://open.spotify.com/embed/playlist/' + id + '?theme=0', h: 380 }; if (window.COURSE_MUSIC && COURSE_MUSIC.isPlaying && COURSE_MUSIC.isPlaying()) COURSE_MUSIC.stop(); api.render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      if (a === 'playmy') { const l = S.stream.links[+el.dataset.i]; const p = l && parse(l.u); if (!p || !p.embed) return; playing = Object.assign({ name: l.n }, p); if (window.COURSE_MUSIC && COURSE_MUSIC.isPlaying && COURSE_MUSIC.isPlaying()) COURSE_MUSIC.stop(); api.render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      if (a === 'close') { playing = null; api.render(); return; }
      if (a === 'stopown') { try { COURSE_MUSIC.stop(); } catch (e) { } api.render(); return; }
      if (a === 'del') { S.stream.links.splice(+el.dataset.i, 1); api.save(); api.render(); return; }
      if (a === 'add') {
        const u = (document.getElementById('st-url') || {}).value || '', n = ((document.getElementById('st-name') || {}).value || '').trim();
        const p = parse(u); if (!p) { warn = 'That is not a Spotify or YouTube link. Copy the share link from the app and paste it here.'; api.render(); return; }
        if (S.stream.links.length >= 12) { warn = 'You can save up to 12 links. Remove one first.'; api.render(); return; }
        warn = ''; S.stream.links.push({ u: p.url, n: (n || (p.kind === 'spotify' ? 'Spotify link' : 'YouTube link')).slice(0, 40) }); api.save(); api.toast('Link saved'); api.render(); return;
      }
    }
  });
})();
