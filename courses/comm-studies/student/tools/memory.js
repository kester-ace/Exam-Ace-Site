/* Memory Lab: how memory works, mind palace builder, mnemonic toolkit, Leitner flashcards, memory games and an exam memory plan. Offline, no network. */
(function () {
  const CSS = `
.ml-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.ml-tabs{margin:4px 0 2px}
.ml-hero-art{display:flex;gap:8px;font-size:1.9rem;line-height:1;margin-top:6px}
.ml-hero-art span{display:inline-grid;place-items:center;width:52px;height:52px;border-radius:14px;background:linear-gradient(160deg,rgba(255,215,102,.28),rgba(255,255,255,.04));border:1px solid rgba(255,215,102,.4);box-shadow:0 4px 0 rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.25)}
.ml-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:14px}
.ml-box{border:1px solid var(--line);border-radius:16px;padding:14px 16px;background:linear-gradient(170deg,rgba(255,255,255,.05),transparent),var(--surface);box-shadow:0 4px 0 rgba(0,0,0,.28),0 12px 22px -16px rgba(0,0,0,.8);min-width:0}
.ml-box h4{margin:0 0 6px}
.ml-box p{margin:6px 0}
.ml-box .ml-ic{font-size:1.6rem;line-height:1;display:block;margin-bottom:6px}
.ml-try{display:block;margin-top:8px;padding:8px 10px;border-radius:10px;background:var(--soft-gold);font-size:.92rem}
.ml-svg{display:block;width:100%;height:auto;max-width:640px;margin:6px auto 0}
.ml-svgwrap{border-radius:18px;padding:8px;background:radial-gradient(120% 90% at 50% 0%,rgba(43,82,170,.35),rgba(8,18,46,.0) 70%),var(--raise,rgba(255,255,255,.03));border:1px solid var(--line);box-shadow:inset 0 2px 14px rgba(0,0,0,.35),0 4px 0 rgba(0,0,0,.25)}
.ml-cap{font-size:.86rem;opacity:.85;margin:6px 4px 0}
.ml-flow{display:flex;flex-wrap:wrap;align-items:stretch;gap:8px}
.ml-flow .ml-stage{flex:1 1 150px;min-width:0;border-radius:14px;padding:12px;border:1px solid var(--line);background:var(--soft-blue);box-shadow:0 4px 0 rgba(0,0,0,.25)}
.ml-flow .ml-arrow{align-self:center;font-weight:800;color:var(--gold)}
.ml-table{width:100%;border-collapse:collapse;font-size:.95rem}
.ml-table th,.ml-table td{text-align:left;padding:8px 9px;border-bottom:1px solid var(--line);vertical-align:top}
.ml-table th{font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;opacity:.85}
.ml-tw{overflow-x:auto;max-width:100%}
.ml-step{display:flex;gap:12px;align-items:flex-start;margin:8px 0}
.ml-num{flex:none;display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:linear-gradient(180deg,#FFE38A,var(--gold));color:#0B1736;font-weight:800;box-shadow:0 3px 0 rgba(0,0,0,.35)}
.ml-locs .chip{display:inline-flex;align-items:center;gap:6px}
.ml-locs .chip .ml-ord{display:inline-grid;place-items:center;min-width:20px;height:20px;border-radius:99px;background:#0B1736;color:#FFE38A;font-size:.75rem;font-weight:800;padding:0 5px}
.ml-fill{display:grid;gap:10px}
.ml-frow{display:grid;grid-template-columns:minmax(0,150px) minmax(0,1fr) minmax(0,1.3fr) 76px;gap:8px;align-items:end;padding:10px;border-radius:14px;border:1px solid var(--line);background:var(--surface)}
.ml-frow .ml-ln{font-weight:700;display:flex;gap:6px;align-items:center;min-width:0}
.ml-frow label{display:block;font-size:.78rem;font-weight:700;opacity:.85;margin-bottom:3px}
.ml-in,.ml-ta,.ml-sel{width:100%;box-sizing:border-box;border:2px solid var(--line);border-radius:12px;padding:9px 11px;background:var(--surface);color:var(--ink);font:inherit;min-width:0}
.ml-in:focus,.ml-ta:focus,.ml-sel:focus{outline:3px solid var(--gold);outline-offset:1px}
.ml-ta{min-height:96px;resize:vertical}
.ml-stops{list-style:none;margin:8px 0 0;padding:0;display:grid;gap:8px}
.ml-stops li{display:grid;grid-template-columns:34px minmax(0,1fr);gap:10px;align-items:start;padding:10px 12px;border-radius:14px;border:1px solid var(--line);background:var(--surface);box-shadow:0 3px 0 rgba(0,0,0,.22)}
.ml-stops .ml-em{font-size:1.5rem;line-height:1}
.ml-stops b{display:block}
.ml-hide{filter:blur(6px);user-select:none}
.ml-walk{display:grid;gap:12px}
.ml-big{font-size:2.6rem;line-height:1}
.ml-bank{display:flex;flex-wrap:wrap;gap:8px}
.ml-bank .chip[disabled]{opacity:.35}
.ml-slots{display:flex;flex-wrap:wrap;gap:8px;min-height:44px;padding:8px;border-radius:14px;border:2px dashed var(--line);margin:8px 0}
.ml-slot{display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border-radius:99px;background:var(--soft-gold);font-weight:700}
.ml-slot.ok{background:var(--soft-ok)} .ml-slot.no{background:var(--soft-bad)}
.ml-slot i{font-style:normal;opacity:.75;font-size:.78rem}
.ml-seq{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:10px}
.ml-seq span{display:inline-flex;flex-direction:column;align-items:center;gap:4px;min-width:84px;padding:10px 12px;border-radius:14px;background:linear-gradient(170deg,rgba(255,215,102,.22),rgba(255,255,255,.03));border:1px solid rgba(255,215,102,.35);box-shadow:0 4px 0 rgba(0,0,0,.3);font-weight:700;text-align:center}
.ml-seq span em{font-style:normal;font-size:1.6rem;line-height:1}
.ml-digits{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:800;letter-spacing:.12em;font-size:1.6rem;text-align:center;padding:16px 8px;border-radius:14px;background:#0B1736;color:#FFE38A;box-shadow:inset 0 2px 10px rgba(0,0,0,.6),0 4px 0 rgba(0,0,0,.35);word-break:break-all}
.ml-stat{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:12px;padding:6px 11px;font-weight:700;background:var(--surface)}
.ml-stat b{color:var(--gold)}
.ml-lb{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;align-items:end}
.ml-lbx{position:relative;text-align:center;border-radius:10px 10px 6px 6px;padding:8px 4px 6px;background:linear-gradient(180deg,#c99a3a,#8c6420);color:#1d1407;font-weight:800;box-shadow:0 5px 0 #5b3f12,0 10px 16px -8px rgba(0,0,0,.7);min-width:0}
.ml-lbx::before{content:"";position:absolute;left:6px;right:6px;top:-10px;height:12px;border-radius:4px 4px 0 0;background:repeating-linear-gradient(90deg,#fffaf0 0 7px,#e8dcc0 7px 9px);box-shadow:0 -1px 0 rgba(0,0,0,.2)}
.ml-lbx small{display:block;font-size:.7rem;font-weight:700;opacity:.85}
.ml-lbx b{display:block;font-size:1.25rem}
.ml-flips{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));gap:12px}
.ml-fl.flip,.ml-card.flip{display:block;width:100%;padding:0;margin:0;border:0;background:none;box-shadow:none;color:inherit;font:inherit;text-align:center;cursor:pointer;min-height:220px}
.ml-fl .inner,.ml-card .inner{display:block;position:relative;width:100%;min-height:220px}
.ml-fl .face,.ml-card .face{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;position:absolute;inset:0;padding:16px;box-sizing:border-box;overflow:auto}
.ml-fl .face b{font-size:1.02rem;line-height:1.35}
.ml-fl .face span:not(.ribbon){line-height:1.45;font-size:.95rem}
.ml-fl:focus-visible .face,.ml-card:focus-visible .face{outline:3px solid var(--gold);outline-offset:2px}
.ml-card{max-width:560px;margin:0 auto;width:100%}
.ml-card .face{align-items:center;text-align:center}
.ml-card .face b{font-size:1.3rem}
.ml-card .face p{margin:0;line-height:1.45}
.ml-conf{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;max-width:560px;margin:10px auto 0}
.ml-conf .btn{width:100%;justify-content:center;white-space:nowrap;padding-left:6px;padding-right:6px}
.ml-dl{display:grid;gap:6px;margin:8px 0}
.ml-dl div{display:flex;justify-content:space-between;gap:10px;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:var(--surface)}
.ml-dl div span{min-width:0;overflow-wrap:anywhere}
.ml-plan{display:grid;gap:10px}
.ml-day{border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--surface);box-shadow:0 3px 0 rgba(0,0,0,.2)}
.ml-day.done{background:var(--soft-ok)}
.ml-day h4{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:0 0 4px}
.ml-day ul{margin:4px 0 0;padding-left:20px}
.ml-day li{margin:3px 0}
.ml-tag{display:inline-block;font-size:.68rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;border-radius:99px;padding:1px 7px;margin-right:4px;background:var(--soft-blue)}
.ml-tag.new{background:var(--soft-gold)} .ml-tag.rev{background:var(--soft-ok)} .ml-tag.mix{background:var(--soft-bad)}
.ml-week{margin:14px 0 4px}
.ml-pegs{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px}
.ml-peg{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:12px;border:1px solid var(--line);background:var(--surface);box-shadow:0 3px 0 rgba(0,0,0,.22);text-align:center}
.ml-peg em{font-style:normal;font-size:1.5rem;line-height:1}
.ml-peg b{font-size:.92rem}
.ml-peg span{font-size:.8rem;opacity:.85;overflow-wrap:anywhere}
.ml-major{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
.ml-major div{text-align:center;border-radius:10px;padding:6px 2px;background:var(--soft-blue);font-size:.86rem;min-width:0}
.ml-major b{display:block;font-size:1.15rem}
.ml-pulse{animation:mlPulse 1.4s ease-in-out infinite;transform-origin:center;transform-box:fill-box}
@keyframes mlPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(1.35)}}
.ml-pop{animation:mlPop .35s ease-out}
@keyframes mlPop{from{transform:scale(.92);opacity:.4}to{transform:none;opacity:1}}
.ml-mk{cursor:pointer}
.ml-mk:focus-visible circle{stroke:#fff;stroke-width:3}
.ml-row2{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:10px}
.ml-quote{border-left:4px solid var(--gold);padding:6px 12px;margin:8px 0;background:var(--soft-gold);border-radius:0 10px 10px 0}
.ml-small{font-size:.9rem}
.ml-mmap{max-width:520px}
@media (max-width:640px){
  .ml-frow{grid-template-columns:minmax(0,1fr) 76px}
  .ml-frow .ml-ln{grid-column:1/-1}
  .ml-frow .ml-fi{grid-column:1/-1}
  .ml-digits{font-size:1.25rem;letter-spacing:.08em}
  .ml-lbx b{font-size:1.05rem}
  .ml-lbx small{font-size:.62rem}
  .ml-major{grid-template-columns:repeat(5,minmax(0,1fr))}
}
@media (prefers-reduced-motion:reduce){
  .ml-pulse,.ml-pop{animation:none!important}
  .ml-card .inner{transition:none!important}
}`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ---------------- shared helpers ---------------- */
  let A = null; // api (set on every render/click)
  const E = s => (A ? A.esc(s) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  const VIEW = 'memorylab';
  const DR = {}; // drafts of text inputs, keyed by data-mlin
  const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);
  const RM = () => { try { return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } };
  const clip = (s, n) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim().slice(0, n);
  const norm = s => String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  function rng(seed) { let s = Math.abs(seed | 0) % 2147483647; if (s <= 0) s += 2147483646; return () => (s = s * 16807 % 2147483647) / 2147483647; }
  function shuf(a, r) { const b = a.slice(); r = r || Math.random; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
  function M() {
    const S = A.S; let m = S.mlab;
    if (!m || typeof m !== 'object') m = S.mlab = {};
    if (!Array.isArray(m.p)) m.p = [];
    if (!Array.isArray(m.cd)) m.cd = [];
    if (!m.lb || typeof m.lb !== 'object') m.lb = {};
    if (!m.best || typeof m.best !== 'object') m.best = {};
    if (!m.cid) m.cid = 1;
    return m;
  }
  function save() { try { A.save(); } catch (e) { } }
  const inp = (key, ph, max, extra) => `<input class="ml-in" type="text" data-mlin="${key}" value="${E(DR[key] || '')}" placeholder="${E(ph || '')}" maxlength="${max || 80}" ${extra || ''}>`;
  const ta = (key, ph, max, extra) => `<textarea class="ml-ta" data-mlin="${key}" placeholder="${E(ph || '')}" maxlength="${max || 1200}" ${extra || ''}>${E(DR[key] || '')}</textarea>`;
  const px = (act, label, cls, attrs) => `<button type="button" class="${cls || 'btn ghost'}" data-px="${act}" data-pv="${VIEW}" ${attrs || ''}>${label}</button>`;
  const wc = s => (String(s || '').trim().match(/\S+/g) || []).length;
  // forgiving answer check: exact, contains, or most key words present
  function close(ans, target) {
    const a = norm(ans), t = norm(target); if (!a) return false; if (a === t) return true;
    if (a.length >= 4 && (t.includes(a) || a.includes(t))) return true;
    const stop = new Set('the a an of and to in on at by for with is are be as model register'.split(' '));
    const tw = t.split(' ').filter(w => w.length > 2 && !stop.has(w)); if (!tw.length) return false;
    const aw = new Set(a.split(' ').map(w => w.replace(/s$/, '')));
    const hit = tw.filter(w => aw.has(w.replace(/s$/, '')) || [...aw].some(x => x.length > 4 && (w.startsWith(x.slice(0, 5)) || x.startsWith(w.slice(0, 5))))).length;
    return hit / tw.length >= 0.5;
  }

  document.addEventListener('input', e => { const t = e.target; if (t && t.dataset && t.dataset.mlin != null) DR[t.dataset.mlin] = t.value; });
  document.addEventListener('change', e => { const t = e.target; if (t && t.dataset && t.dataset.mlin != null) DR[t.dataset.mlin] = t.value; });
  document.addEventListener('toggle', e => { const t = e.target; if (t && t.classList && t.classList.contains('ml-week')) { const all = Array.from(document.querySelectorAll('details.ml-week')); T.openWeeks = all.map(x => x.open); } }, true);
  document.addEventListener('keydown', e => {
    const t = e.target; if (!t || !t.dataset || !t.dataset.mlenter || e.key !== 'Enter') return;
    e.preventDefault(); const b = document.getElementById(t.dataset.mlenter); if (b) b.click();
  });

  /* ---------------- course content ---------------- */
  const TABS = [['how', '🧠 How Memory Works'], ['palace', '🏛️ Mind Palace'], ['tools', '🧰 Mnemonic Toolkit'], ['cards', '🗂️ Flashcard Trainer'], ['games', '🎮 Memory Games'], ['plan', '📅 Exam Memory Plan']];

  // isometric map locations (grid coords)
  const LOCS = [
    { id: 'gate', n: 'Front gate', e: '🚧', x: 4.2, y: 7.25 },
    { id: 'gallery', n: 'Gallery', e: '🪑', x: 2.6, y: 5.75 },
    { id: 'door', n: 'Front door', e: '🚪', x: 5, y: 5.05 },
    { id: 'living', n: 'Living room', e: '🛋️', x: 2.8, y: 3.7 },
    { id: 'kitchen', n: 'Kitchen coal pot', e: '🔥', x: 7.6, y: 4.1 },
    { id: 'table', n: 'Dining table', e: '🍽️', x: 6.3, y: 3.1 },
    { id: 'bedroom', n: 'Bedroom', e: '🛏️', x: 2.8, y: 1.2 },
    { id: 'bath', n: 'Bathroom', e: '🛁', x: 6, y: 1.15 },
    { id: 'back', n: 'Back step', e: '🪜', x: 9.3, y: 1.6 },
    { id: 'mango', n: 'Mango tree', e: '🥭', x: 10.9, y: 1.2 },
    { id: 'line', n: 'Clothesline', e: '👕', x: 10.8, y: 3.6 },
    { id: 'tank', n: 'Water tank', e: '🛢️', x: 10.4, y: 5.7 },
    { id: 'bus', n: 'Bus stop', e: '🚌', x: 8.8, y: 8.45 },
    { id: 'school', n: 'School gate', e: '🏫', x: 13.4, y: 8.3 }
  ];
  const LOC = Object.fromEntries(LOCS.map(l => [l.id, l]));
  const EMO = ['🔐', '🐕', '🔣', '📺', '🍲', '🥭', '👕', '❓', '🧪', '🌧️', '📊', '🍽️', '🛡️', '🧊', '🎩', '🩺', '😎', '💌', '🕳️', '⚖️', '🗼', '➡️', '🏓', '🔁', '📢', '🤒', '😰', '🥣', '🌍', '🎭', '🦀', '🌴', '🥁', '🎤', '📚', '✍️', '💡', '🐐', '🚀', '⭐'];

  // ready-made palaces
  const READY = [
    { id: 'r1', mod: 'Module 1', n: 'The Research Process', blurb: 'Seven stages from the course research cycle, with ethics guarding every stage.', r: [
      ['gate', 'Choose a topic', 'A heap of topic cards is blowing against the gate; you grab the one about your own community.', '🗂️'],
      ['gallery', 'Research question', 'A giant gold question mark is rocking in Granny\'s rocking chair, asking "What exactly do you want to find out?"', '❓'],
      ['door', 'Methods & sample', 'A vendor tray hangs on the door with tasting samples, a clipboard questionnaire and an interview microphone.', '🧪'],
      ['living', 'Collect data', 'Data is raining from the ceiling into buckets lined up on the couch.', '🌧️'],
      ['kitchen', 'Analyse data', 'You are stirring numbers in the coal pot until they thicken into a bar chart.', '📊'],
      ['table', 'Present findings', 'Every plate on the dining table holds a graph, served to guests with a short explanation.', '🍽️'],
      ['back', 'Ethics at every stage', 'A security guard on the back step checks consent forms and padlocks the confidential files.', '🛡️']] },
    { id: 'r2', mod: 'Module 2', n: 'Registers & the Creole Continuum', blurb: 'Five registers from most fixed to most personal, then basilect to acrolect.', r: [
      ['gate', 'Frozen register', 'The gate is frozen in a block of ice, reciting the national pledge word for word, the same every time.', '🧊'],
      ['gallery', 'Formal register', 'Granny sits on the gallery in a top hat and gown, giving an official speech to the neighbours.', '🎩'],
      ['door', 'Consultative register', 'A doctor stands at the front door asking polite questions and giving advice.', '🩺'],
      ['living', 'Casual register', 'Your friends are liming on the couch, cracking jokes in relaxed talk.', '😎'],
      ['bedroom', 'Intimate register', 'A love letter on the pillow is full of pet names only two people understand.', '💌'],
      ['kitchen', 'Basilect', 'At the very bottom of the coal pot is the deepest, richest Creole, furthest from the standard.', '🕳️'],
      ['table', 'Mesolect', 'In the middle of the table, two dishes are mixed together half and half: in-between features.', '⚖️'],
      ['back', 'Acrolect', 'At the top of the back step ("acro" means top) someone speaks closest to Standard English.', '🗼']] },
    { id: 'r3', mod: 'Module 3', n: 'Communication Models & Barriers', blurb: 'Three models of communication, then five barriers (types of noise).', r: [
      ['gate', 'Linear model (Shannon & Weaver)', 'A giant one-way arrow shoots through the gate: the message goes from sender to receiver with no reply.', '➡️'],
      ['gallery', 'Interactive model (Schramm)', 'Two people play table tennis on the gallery: message, then feedback, taking turns.', '🏓'],
      ['door', 'Transactional model (Barnlund)', 'Two friends in the doorway talk and listen at the same time, both sending and receiving in a shared context.', '🔁'],
      ['living', 'Physical noise', 'A huge sound system in the living room drowns out every word.', '📢'],
      ['bedroom', 'Physiological barrier', 'Someone lies in bed with a fever and an earache, too unwell to listen.', '🤒'],
      ['kitchen', 'Psychological barrier', 'Worry and anger are steaming out of the coal pot and clouding the listener\'s mind.', '😰'],
      ['table', 'Semantic barrier', 'A bowl of jargon soup: long words nobody at the table can digest.', '🥣'],
      ['mango', 'Cultural barrier', 'A visitor under the mango tree makes a gesture that is friendly at home but rude here.', '🌍']] }
  ];
  // worked example in the guide: the course's seven characteristics of language
  const WORKED = [
    ['gate', 'Systematic', 'The gate only opens if you press the buttons in the right order, just as language follows rules for combining sounds and words.', '🔐'],
    ['gallery', 'Arbitrary', 'Granny on the gallery calls her dog "Cat". The dog does not mind: the link between a word and its meaning is arbitrary.', '🐕'],
    ['door', 'Symbolic', 'The front door is covered in stickers and signs: each one stands for something else, the way words stand for ideas.', '🔣'],
    ['living', 'Dynamic', 'New slang keeps jumping out of the TV screen and old words fade away: language is always changing.', '📺'],
    ['kitchen', 'Social & cultural', 'The whole family crowds around the coal pot, sharing stories and recipes in Creole: language lives in a community.', '🍲'],
    ['mango', 'Creative', 'The mango tree grows brand-new sentences instead of fruit: we can make sentences nobody has said before.', '🥭'],
    ['line', 'Displacement', 'On the clothesline hang last year\'s Carnival costume and tomorrow\'s school uniform: language lets us talk about things not here and now.', '👕']
  ];

  const MEMDECK = [
    ['Encoding', 'Turning what you see, hear or read into a form your memory can store.'],
    ['Storage', 'Keeping encoded information in memory over time.'],
    ['Retrieval', 'Bringing stored information back into your mind when you need it.'],
    ['Working memory', 'The small "mental desk" that holds and works on a few things for a few seconds.'],
    ['Long-term memory', 'Lasting store of knowledge and experiences with no known practical limit.'],
    ['Forgetting curve', 'Ebbinghaus\'s finding that we forget quickly at first, then more slowly.'],
    ['Spacing effect', 'Reviews spread out over days are remembered better than the same time crammed into one sitting.'],
    ['Retrieval practice', 'Testing yourself by recalling from memory; it strengthens memory more than rereading.'],
    ['Elaboration', 'Linking new information to what you already know by explaining how and why.'],
    ['Dual coding', 'Pairing words with pictures or diagrams so there are two routes back to the idea.'],
    ['Consolidation', 'The process, much of it during sleep, that makes new memories more stable.'],
    ['Chunking', 'Grouping items into meaningful units so working memory can hold more.'],
    ['Method of loci', 'Placing images of items along a familiar route, then walking the route to recall them.'],
    ['Peg system', 'Hanging items on a fixed list of pegs, such as 1-bun, 2-shoe, 3-tree.'],
    ['Keyword method', 'Linking a new word to a familiar sound-alike word through a vivid image.'],
    ['Acrostic', 'A sentence whose first letters match the first letters of a list you need to remember.'],
    ['Leitner box', 'Flashcards move up a box when right and back to Box 1 when wrong; higher boxes are reviewed less often.'],
    ['Interleaving', 'Mixing different topics or question types in one practice session.'],
    ['Feynman technique', 'Explain a topic in simple words as if teaching a younger student, then fix the gaps.'],
    ['Elaborative interrogation', 'Asking yourself "why is this true?" and "how does it work?" while you study.'],
    ['Mnemonic', 'Any memory aid, such as an acronym, rhyme or image, that makes information easier to recall.'],
    ['Generation effect', 'Information you produce yourself is remembered better than information you only read.']
  ];
  const FALLBACK = {
    m1: [['Primary source', 'First-hand evidence created at the time, such as an interview or diary.'], ['Secondary source', 'A source that interprets or analyses primary sources.'], ['Reliability', 'How consistent and dependable a source or method is.'], ['Validity', 'Whether a method actually measures what it claims to measure.'], ['Questionnaire', 'A set of written questions used to collect data from many people.'], ['Research question', 'The focused question a study sets out to answer.'], ['Bias', 'A one-sided preference that can distort information.'], ['Summary', 'A shortened version of a text that keeps its main points.']],
    m2: [['Acrolect', 'The variety on a Creole continuum closest to the standard language.'], ['Mesolect', 'A middle variety on a Creole continuum, mixing Creole and standard features.'], ['Basilect', 'The variety furthest from the standard, the "deepest" Creole.'], ['Frozen register', 'Fixed language that does not change, such as a pledge or prayer.'], ['Code-switching', 'Moving between languages or varieties in one conversation.'], ['Dialect', 'A regional or social variety of a language.'], ['Idiolect', 'An individual\'s personal way of speaking.'], ['Arbitrary', 'There is no natural link between a word and what it means.']],
    m3: [['Encoding', 'Turning ideas and feelings into a message that can be sent.'], ['Decoding', 'Interpreting a received message to work out its meaning.'], ['Feedback', 'The receiver\'s response to a message.'], ['Noise', 'Anything that interferes with a message being sent, received or understood.'], ['Channel', 'The means by which a message travels, such as speech or text.'], ['Kinesics', 'Communication through body movement and gesture.'], ['Proxemics', 'How people use space and distance when communicating.'], ['Paralanguage', 'Vocal features such as tone, pitch and pace that add meaning to words.']],
    p3: [['Paper 032', 'The Paper 3 written paper: 2 hours 15 minutes, 60 marks.'], ['Notes sheet', 'The notes sheet in Paper 032 that sets out the task, audience and purpose.'], ['Expository piece', 'Writing that explains or informs.'], ['Reflective piece', 'Writing that looks back on an experience and what was learned.']]
  };
  const GAMETERMS = ['encoding', 'decoding', 'feedback', 'noise', 'channel', 'register', 'dialect', 'Creole', 'acrolect', 'basilect', 'mesolect', 'idiolect', 'jargon', 'slang', 'kinesics', 'proxemics', 'paralanguage', 'audience', 'purpose', 'context', 'bias', 'validity', 'reliability', 'sample', 'questionnaire', 'interview', 'summary', 'metaphor', 'simile', 'hyperbole', 'irony', 'tone', 'genre', 'media', 'source', 'thesis', 'evidence', 'rhetoric', 'ethos', 'pathos', 'logos', 'code-switching', 'euphemism', 'connotation', 'denotation'];
  const GAMEEMO = ['🥭', '🌴', '🥁', '🐢', '🦜', '⛵', '🍍', '🐚', '🌺', '🦀', '🎺', '🏝️', '🐠', '🍌', '☀️', '🌊', '🥥', '🎭', '🚌', '📻', '🐐', '⚽', '🏏', '🎸'];
  const PEGS = [['1', 'bun', '🍞'], ['2', 'shoe', '👟'], ['3', 'tree', '🌳'], ['4', 'door', '🚪'], ['5', 'hive', '🐝'], ['6', 'sticks', '🥢'], ['7', 'heaven', '☁️'], ['8', 'gate', '🚧'], ['9', 'vine', '🍇'], ['10', 'hen', '🐔']];

  /* glossary-backed decks */
  let GCACHE = null;
  function gl() {
    if (GCACHE) return GCACHE;
    const G = window.COURSE_GLOSSARY, out = { m1: [], m2: [], m3: [], p3: [] };
    if (G && Array.isArray(G.terms)) {
      const seen = new Set();
      G.terms.forEach(t => {
        if (!t || !t.t || !Array.isArray(t.d) || !t.d[0]) return;
        const d = String(t.d[0]); if (d.length > 230) return;
        if (/portfolio/i.test(t.t + ' ' + d)) return;
        const key = norm(t.t); if (seen.has(key)) return; seen.add(key);
        const ms = t.m || [];
        const card = { k: 'g' + hash(t.t), f: t.t, b: d };
        if (ms.includes('1')) out.m1.push(card); if (ms.includes('2')) out.m2.push(card); if (ms.includes('3')) out.m3.push(card); if (ms.includes('P')) out.p3.push(card);
      });
    }
    Object.keys(out).forEach(k => { if (out[k].length < 4) out[k] = FALLBACK[k].map(([f, b]) => ({ k: 'f' + hash(f), f, b })); });
    return (GCACHE = out);
  }
  const DECKS = [['m1', '📚', 'Module 1 Terms', 'Gathering & processing information'], ['m2', '🗣️', 'Module 2 Terms', 'Language & community'], ['m3', '🎤', 'Module 3 Terms', 'Speaking & writing'], ['p3', '📝', 'Paper 3 Terms', 'Paper 032 essentials'], ['mem', '🧠', 'Memory Science', 'Terms from this lab'], ['my', '✍️', 'My Own Cards', 'Cards you type yourself']];
  function deckCards(id) {
    if (id === 'mem') return MEMDECK.map(([f, b]) => ({ k: 'm' + hash(f), f, b }));
    if (id === 'my') return M().cd.map(c => ({ k: 'c' + c[0], f: c[1], b: c[2] }));
    return gl()[id] || [];
  }
  const INT = [0, 1, 2, 4, 7, 14];
  function dueCount(id) { const lb = M().lb, t = today(); return deckCards(id).filter(c => lb[c.k] && lb[c.k][1] <= t).length; }
  function boxCounts(id) { const lb = M().lb, b = [0, 0, 0, 0, 0, 0]; deckCards(id).forEach(c => { if (lb[c.k]) b[lb[c.k][0]]++; }); return b; }
  function pruneLB() {
    const lb = M().lb, keys = Object.keys(lb); if (keys.length <= 400) return;
    keys.sort((a, b) => (lb[b][0] - lb[a][0]) || (lb[a][1] - lb[b][1]));
    keys.slice(0, keys.length - 400).forEach(k => delete lb[k]);
  }

  /* ---------------- isometric home & school route (inline SVG) ---------------- */
  const IS = 23, OX = 222, OY = 46;
  const P = (x, y, z) => [+((x - y) * 0.866 * IS + OX).toFixed(1), +((x + y) * 0.5 * IS - (z || 0) * IS + OY).toFixed(1)];
  const pts = arr => arr.map(p => P(p[0], p[1], p[2]).join(',')).join(' ');
  const quad = (a, fill, extra) => `<polygon points="${pts(a)}" fill="${fill}" ${extra || ''}/>`;
  function box(x0, y0, x1, y1, z0, z1, top, left, right, extra) {
    // visible faces in this projection: top, front-left (y = y1), front-right (x = x1)
    return quad([[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], left, extra) +
      quad([[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]], right, extra) +
      quad([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], top, extra);
  }
  function floor(x0, y0, x1, y1, z, fill, extra) { return quad([[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]], fill, extra); }
  function wallX(x, y0, y1, z0, z1, fill) { return quad([[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]], fill, 'stroke="rgba(0,0,0,.25)" stroke-width=".6"'); }
  function wallY(y, x0, x1, z0, z1, fill) { return quad([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]], fill, 'stroke="rgba(0,0,0,.25)" stroke-width=".6"'); }
  let MAPBASE = null;
  function mapBase() {
    if (MAPBASE) return MAPBASE;
    const H = 0.3; // floor height of the house slab
    let s = '';
    s += `<defs><linearGradient id="mlSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#18357f"/><stop offset="1" stop-color="#0a1638"/></linearGradient>
      <radialGradient id="mlGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb347" stop-opacity=".95"/><stop offset="1" stop-color="#ff6a00" stop-opacity="0"/></radialGradient>
      <marker id="mlArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#FFD766"/></marker></defs>`;
    // ground: yard lot, road, sidewalk, school lot
    s += floor(-0.3, -0.6, 12.2, 7.6, 0, '#2f7a46', 'stroke="#235c34" stroke-width="1"');
    s += box(-0.3, 7.6, 15.6, 9.9, -0.25, 0, '#3a3f4f', '#262a35', '#20242d');
    s += floor(-0.3, 7.6, 15.6, 8.0, 0.01, '#8d8f99');
    for (let x = 0.4; x < 15.4; x += 1.6) s += floor(x, 8.9, x + 0.8, 9.05, 0.01, '#FFD766');
    s += box(12.4, -0.6, 15.6, 7.6, -0.25, 0, '#c9b98f', '#a39167', '#8c7c55');
    // fence along the front of the yard with a gap for the gate
    for (let x = 0; x <= 12; x += 0.6) if (x < 3.6 || x > 4.8) s += box(x, 7.45, x + 0.12, 7.57, 0, 0.55, '#f2efe6', '#d8d2c2', '#bdb6a3');
    s += wallY(7.5, 0, 3.6, 0.38, 0.44, '#f2efe6') + wallY(7.5, 4.8, 12, 0.38, 0.44, '#f2efe6');
    // gate
    s += box(3.55, 7.42, 3.75, 7.62, 0, 0.8, '#FFD766', '#c99a3a', '#a07a2a') + box(4.75, 7.42, 4.95, 7.62, 0, 0.8, '#FFD766', '#c99a3a', '#a07a2a');
    s += wallY(7.52, 3.75, 4.75, 0.1, 0.62, 'rgba(255,215,102,.28)');
    // path from gate to gallery
    s += floor(3.8, 6.6, 4.7, 7.45, 0.01, '#d9c9a0');
    // house slab
    s += box(0.6, -0.2, 9.2, 6.6, 0, H, '#e9dcc0', '#c9b48a', '#b39d72');
    // room floors
    s += floor(0.8, 5.0, 9.0, 6.45, H + 0.005, '#cf8f5a'); // gallery (wooden)
    for (let x = 1.0; x < 9; x += 0.5) s += `<line x1="${P(x, 5.0, H)[0]}" y1="${P(x, 5.0, H)[1]}" x2="${P(x, 6.45, H)[0]}" y2="${P(x, 6.45, H)[1]}" stroke="rgba(80,40,10,.25)" stroke-width=".7"/>`;
    s += floor(0.8, 2.5, 5.0, 5.0, H + 0.005, '#f5e7c8'); // living
    s += floor(5.0, 2.5, 9.0, 5.0, H + 0.005, '#d6e8f1'); // kitchen tiles
    for (let x = 5.5; x < 9; x += 0.5) s += `<line x1="${P(x, 2.5, H)[0]}" y1="${P(x, 2.5, H)[1]}" x2="${P(x, 5.0, H)[0]}" y2="${P(x, 5.0, H)[1]}" stroke="rgba(30,60,90,.18)" stroke-width=".6"/>`;
    s += floor(0.8, 0, 5.0, 2.5, H + 0.005, '#e7d3f0'); // bedroom
    s += floor(5.0, 0, 7.2, 2.5, H + 0.005, '#cfeee6'); // bathroom
    s += floor(7.2, 0, 9.0, 2.5, H + 0.005, '#efe2c4'); // back room/passage
    // back walls (cutaway dollhouse)
    s += wallX(0.6, -0.2, 6.6, H, 1.6, '#f0b77b') + wallY(-0.2, 0.6, 9.2, H, 1.6, '#f6c88f');
    // window on back wall
    s += quad([[2.2, -0.19, 0.8], [3.4, -0.19, 0.8], [3.4, -0.19, 1.3], [2.2, -0.19, 1.3]], '#8fd3ff', 'stroke="#fff" stroke-width="1.2"');
    s += quad([[6.0, -0.19, 0.8], [6.8, -0.19, 0.8], [6.8, -0.19, 1.3], [6.0, -0.19, 1.3]], '#8fd3ff', 'stroke="#fff" stroke-width="1.2"');
    s += quad([[0.61, 3.2, 0.8], [0.61, 4.4, 0.8], [0.61, 4.4, 1.3], [0.61, 3.2, 1.3]], '#8fd3ff', 'stroke="#fff" stroke-width="1.2"');
    // low interior partitions
    const pw = '#fff3dc';
    s += wallY(2.5, 0.8, 2.2, H, 0.75, pw) + wallY(2.5, 3.2, 6.0, H, 0.75, pw) + wallY(2.5, 7.0, 9.0, H, 0.75, pw);
    s += wallX(5.0, 0, 1.6, H, 0.75, pw) + wallX(7.2, 0, 0.6, H, 0.75, pw) + wallX(7.2, 1.6, 2.5, H, 0.75, pw);
    s += wallY(5.0, 0.8, 4.5, H, 0.75, pw) + wallY(5.0, 5.6, 9.0, H, 0.75, pw); // front wall with doorway 4.5–5.6
    // furniture
    s += box(1.2, 0.4, 3.0, 1.8, H, H + 0.35, '#ffffff', '#c8b6dc', '#ab97c4') + box(1.2, 0.4, 3.0, 0.75, H + 0.35, H + 0.55, '#f6a6c1', '#d97b9d', '#c26585'); // bed
    s += `<ellipse cx="${P(6.1, 1.2, H + .1)[0]}" cy="${P(6.1, 1.2, H + .1)[1]}" rx="18" ry="9" fill="#ffffff" stroke="#9cc" stroke-width="1.5"/>`; // tub
    s += box(1.2, 3.0, 1.8, 4.6, H, H + 0.45, '#5b7bd5', '#3f5db3', '#34509b'); // sofa
    s += box(3.9, 3.3, 4.1, 4.3, H, H + 0.9, '#20242d', '#11141a', '#0b0d12'); // TV
    s += quad([[4.11, 3.4, H + 0.2], [4.11, 4.2, H + 0.2], [4.11, 4.2, H + 0.8], [4.11, 3.4, H + 0.8]], '#3fb6ff'); // screen
    s += box(5.7, 2.9, 7.0, 3.6, H, H + 0.5, '#a0642b', '#7c4a1e', '#6a3f19'); // table
    s += box(8.2, 2.7, 8.9, 4.9, H, H + 0.6, '#e5e9ef', '#b8c0cc', '#a3acb9'); // counter
    // coal pot with glow
    const cp = P(7.6, 4.1, H + 0.32);
    s += `<circle cx="${cp[0]}" cy="${cp[1] - 4}" r="20" fill="url(#mlGlow)" opacity=".7"/>` + box(7.35, 3.85, 7.85, 4.35, H, H + 0.32, '#3a3a3a', '#2a2a2a', '#1f1f1f') + `<ellipse cx="${cp[0]}" cy="${cp[1]}" rx="8" ry="4" fill="#ff7a1a"/>`;
    // rocking chair + gallery rail
    s += box(2.3, 5.5, 2.9, 6.0, H, H + 0.55, '#8a5a2b', '#6b4420', '#5a391b');
    for (let x = 0.9; x <= 9.0; x += 0.75) if (x < 3.7 || x > 4.9) s += box(x, 6.35, x + 0.1, 6.45, H, H + 0.5, '#ffffff', '#e6e1d6', '#cfc9bb');
    s += wallY(6.42, 0.9, 3.7, H + 0.45, H + 0.52, '#ffffff') + wallY(6.42, 4.9, 9.0, H + 0.45, H + 0.52, '#ffffff');
    // front door
    s += quad([[4.6, 5.0, H], [5.5, 5.0, H], [5.5, 5.0, H + 1.0], [4.6, 5.0, H + 1.0]], '#2f6b3d', 'stroke="#FFD766" stroke-width="1.2"');
    // back step on right side
    s += box(9.2, 1.1, 9.55, 2.0, 0, 0.2, '#d7cdb8', '#b6aa92', '#a2967e') + box(9.2, 1.1, 9.35, 2.0, 0.2, 0.3, '#e3dac6', '#c0b49c', '#ab9f87');
    // water tank
    const tk = P(10.4, 5.7, 0); const tk2 = P(10.4, 5.7, 1.0);
    s += `<path d="M${tk[0] - 15} ${tk[1]} L${tk2[0] - 15} ${tk2[1]} A15 7 0 0 1 ${tk2[0] + 15} ${tk2[1]} L${tk[0] + 15} ${tk[1]} A15 7 0 0 1 ${tk[0] - 15} ${tk[1]}Z" fill="#1d1f24"/><ellipse cx="${tk2[0]}" cy="${tk2[1]}" rx="15" ry="7" fill="#3b3f48"/>`;
    // clothesline
    const c1 = P(10.0, 2.9, 1.0), c2 = P(11.6, 4.3, 1.0), c1b = P(10.0, 2.9, 0), c2b = P(11.6, 4.3, 0);
    s += `<line x1="${c1b[0]}" y1="${c1b[1]}" x2="${c1[0]}" y2="${c1[1]}" stroke="#ddd" stroke-width="2"/><line x1="${c2b[0]}" y1="${c2b[1]}" x2="${c2[0]}" y2="${c2[1]}" stroke="#ddd" stroke-width="2"/><line x1="${c1[0]}" y1="${c1[1]}" x2="${c2[0]}" y2="${c2[1]}" stroke="#eee" stroke-width="1"/>`;
    [['#ff6b6b', .25], ['#FFD766', .5], ['#4fd18b', .75]].forEach(([c, t]) => { const x = c1[0] + (c2[0] - c1[0]) * t, y = c1[1] + (c2[1] - c1[1]) * t; s += `<rect x="${x - 5}" y="${y}" width="10" height="11" rx="2" fill="${c}"/>`; });
    // mango tree
    const mt = P(10.9, 1.2, 0), mtop = P(10.9, 1.2, 1.4);
    s += `<rect x="${mt[0] - 3}" y="${mtop[1]}" width="6" height="${mt[1] - mtop[1]}" fill="#6b4420"/>`;
    s += `<circle cx="${mtop[0] - 14}" cy="${mtop[1] - 2}" r="17" fill="#1f6b33"/><circle cx="${mtop[0] + 12}" cy="${mtop[1] - 4}" r="18" fill="#2a8a43"/><circle cx="${mtop[0]}" cy="${mtop[1] - 18}" r="19" fill="#34a352"/>`;
    [[-12, 4], [8, 2], [2, -12], [16, -10], [-6, -20]].forEach(([dx, dy]) => s += `<ellipse cx="${mtop[0] + dx}" cy="${mtop[1] + dy}" rx="3.2" ry="4.2" fill="#ffb02e"/>`);
    // palm by the road
    const pl = P(0.4, 6.8, 0), plt = P(0.4, 6.8, 2.0);
    s += `<path d="M${pl[0]} ${pl[1]} Q${pl[0] + 6} ${(pl[1] + plt[1]) / 2} ${plt[0] + 2} ${plt[1]}" stroke="#8a5a2b" stroke-width="4" fill="none"/>`;
    [[-22, 6], [22, 6], [-16, -8], [16, -8], [0, -14]].forEach(([dx, dy]) => s += `<path d="M${plt[0] + 2} ${plt[1]} Q${plt[0] + dx * .5} ${plt[1] + dy - 8} ${plt[0] + dx} ${plt[1] + dy}" stroke="#2a8a43" stroke-width="4" fill="none" stroke-linecap="round"/>`);
    // bus stop shelter
    s += box(8.3, 8.05, 9.4, 8.25, 0, 0.9, '#5b7bd5', '#3f5db3', '#34509b') + box(8.2, 7.95, 9.5, 8.45, 0.9, 1.0, '#FFD766', '#c99a3a', '#a07a2a');
    // school building
    s += box(13.0, 3.6, 15.3, 6.6, 0, 1.1, '#f1f4ff', '#d4dcf2', '#b9c4e4');
    s += box(13.0, 3.6, 15.3, 6.6, 1.1, 1.25, '#c0392b', '#9b2d22', '#83261d');
    for (let y = 3.9; y < 6.3; y += 0.9) s += quad([[15.31, y, 0.45], [15.31, y + 0.5, 0.45], [15.31, y + 0.5, 0.9], [15.31, y, 0.9]], '#8fd3ff', 'stroke="#fff" stroke-width=".8"');
    for (let x = 13.3; x < 15.1; x += 0.7) s += quad([[x, 6.61, 0.45], [x + 0.4, 6.61, 0.45], [x + 0.4, 6.61, 0.9], [x, 6.61, 0.9]], '#8fd3ff', 'stroke="#fff" stroke-width=".8"');
    const fp = P(12.7, 7.1, 0), ft = P(12.7, 7.1, 2.0);
    s += `<line x1="${fp[0]}" y1="${fp[1]}" x2="${ft[0]}" y2="${ft[1]}" stroke="#ddd" stroke-width="2"/><path d="M${ft[0]} ${ft[1]} l16 4 l-16 6z" fill="#FFD766"/>`;
    s += box(13.0, 7.25, 13.15, 7.4, 0, 0.7, '#FFD766', '#c99a3a', '#a07a2a') + box(13.8, 7.25, 13.95, 7.4, 0, 0.7, '#FFD766', '#c99a3a', '#a07a2a');
    MAPBASE = s; return s;
  }
  const mpt = id => { const l = LOC[id]; const z = ['gate', 'bus', 'school', 'mango', 'line', 'tank', 'back'].includes(id) ? 0 : 0.3; return P(l.x, l.y, z); };
  // order: array of loc ids (route); opt: {cur, interactive, hideNums, label}
  function mapSVG(order, opt) {
    opt = opt || {};
    const sel = order || [];
    let s = `<svg class="ml-svg" viewBox="10 0 545 360" role="img" aria-labelledby="mlMapT mlMapD" focusable="false"><title id="mlMapT">${E(opt.label || 'Isometric map of a Caribbean home and the route to school')}</title><desc id="mlMapD">A cut-away house with a gallery, front door, living room, kitchen with a coal pot, dining table, bedroom, bathroom and back step, a yard with a mango tree, clothesline and water tank, then the road, a bus stop and the school gate.${sel.length ? ' Route order: ' + E(sel.map(id => LOC[id] ? LOC[id].n : id).join(', ')) + '.' : ''}</desc>`;
    s += `<rect width="560" height="360" fill="url(#mlSky)" rx="14"/>`;
    s += mapBase();
    if (sel.length > 1) s += `<polyline points="${sel.map(id => mpt(id).join(',')).join(' ')}" fill="none" stroke="#FFD766" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="round" stroke-linejoin="round" opacity=".9" marker-mid="url(#mlArrow)" marker-end="url(#mlArrow)"/>`;
    LOCS.forEach(l => {
      const [x, y] = mpt(l.id), i = sel.indexOf(l.id), on = i >= 0, cur = opt.cur === l.id;
      const act = opt.interactive ? `class="ml-mk" data-px="pick" data-pv="${VIEW}" data-id="${l.id}" aria-hidden="true"` : 'aria-hidden="true"';
      s += `<g ${act}><title>${E(l.n)}</title>`;
      if (cur) s += `<circle cx="${x}" cy="${y - 2}" r="20" fill="none" stroke="#fff" stroke-width="3" class="ml-pulse"/>`;
      if (on) s += `<circle cx="${x}" cy="${y - 2}" r="13" fill="${cur ? '#ffffff' : '#FFD766'}" stroke="#0B1736" stroke-width="2.5"/><text x="${x}" y="${y + 3}" text-anchor="middle" font-size="13.5" font-weight="800" fill="#0B1736" font-family="system-ui,sans-serif">${opt.hideNums ? '?' : i + 1}</text>`;
      else s += `<circle cx="${x}" cy="${y - 2}" r="11.5" fill="rgba(11,23,54,.72)" stroke="rgba(255,255,255,.75)" stroke-width="1.3"/><text x="${x}" y="${y + 2}" text-anchor="middle" font-size="12">${l.e}</text>`;
      s += `</g>`;
    });
    return s + `</svg>`;
  }

  /* ---------------- Ebbinghaus forgetting curve ---------------- */
  let CURVE_SPACED = true;
  function curveSVG() {
    const W = 560, H = 300, L = 58, R = 16, T = 16, B = 52, maxD = 31;
    const X = d => +(L + (d / maxD) * (W - L - R)).toFixed(1), Y = p => +(T + (1 - p / 100) * (H - T - B)).toFixed(1);
    // Ebbinghaus (1885) savings data, approx: 20 min 58%, 1 h 44%, 9 h 36%, 1 d 34%, 2 d 28%, 6 d 25%, 31 d 21%
    const eb = [[0, 100], [0.014, 58], [0.042, 44], [0.375, 36], [1, 34], [2, 28], [6, 25], [31, 21]];
    let s = `<svg class="ml-svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="mlCvT mlCvD"><title id="mlCvT">The forgetting curve${CURVE_SPACED ? ' with spaced reviews' : ''}</title><desc id="mlCvD">Without review, memory drops steeply in the first hours and then levels off at about a fifth after a month (Ebbinghaus, 1885).${CURVE_SPACED ? ' With reviews on days 1, 3, 7 and 14, each drop is smaller and slower, so the curve stays high. The review curve is an illustration, not real data.' : ''}</desc>`;
    s += `<rect width="${W}" height="${H}" rx="14" fill="#0d1d47"/>`;
    [0, 25, 50, 75, 100].forEach(p => s += `<line x1="${L}" x2="${W - R}" y1="${Y(p)}" y2="${Y(p)}" stroke="rgba(255,255,255,.12)"/><text x="${L - 7}" y="${Y(p) + 5}" text-anchor="end" font-size="14" fill="#c9d3f2" font-family="system-ui,sans-serif">${p}%</text>`);
    [0, 3, 7, 14, 21, 31].forEach(d => s += `<line x1="${X(d)}" x2="${X(d)}" y1="${T}" y2="${H - B}" stroke="rgba(255,255,255,.07)"/><text x="${X(d)}" y="${H - B + 19}" text-anchor="middle" font-size="14" fill="#c9d3f2" font-family="system-ui,sans-serif">${d}</text>`);
    s += `<text x="${(L + W - R) / 2}" y="${H - 8}" text-anchor="middle" font-size="15" fill="#FFE38A" font-family="system-ui,sans-serif" font-weight="700">Days after first learning</text>`;
    s += `<text transform="translate(16 ${(T + H - B) / 2}) rotate(-90)" text-anchor="middle" font-size="15" fill="#FFE38A" font-family="system-ui,sans-serif" font-weight="700">Remembered</text>`;
    s += `<polyline points="${eb.map(([d, p]) => X(d) + ',' + Y(p)).join(' ')}" fill="none" stroke="#ff7a6b" stroke-width="3" stroke-linejoin="round"/>`;
    eb.forEach(([d, p]) => s += `<circle cx="${X(d)}" cy="${Y(p)}" r="3.2" fill="#ff7a6b"/>`);
    if (CURVE_SPACED) {
      // before the first review it is the same as the red curve; after each review the floor rises and the decay slows (illustrative)
      const rev = [1, 3, 7, 14], floorP = [55, 66, 76, 84], stab = [1.2, 2.5, 5, 12];
      let path = 'M' + eb.filter(e => e[0] <= 1).map(([d, p]) => X(d) + ' ' + Y(p)).join(' L');
      rev.forEach((r0, i) => {
        const r1 = i + 1 < rev.length ? rev[i + 1] : maxD;
        path += ` L${X(r0)} ${Y(100)}`;
        for (let k = 1; k <= 24; k++) { const d = r0 + (r1 - r0) * (k / 24), p = floorP[i] + (100 - floorP[i]) * Math.exp(-(d - r0) / stab[i]); path += ` L${X(d)} ${Y(p)}`; }
      });
      s += `<path d="${path}" fill="none" stroke="#4fd18b" stroke-width="3" stroke-linejoin="round"/>`;
      rev.forEach(d => s += `<circle cx="${X(d)}" cy="${Y(100)}" r="5" fill="#FFD766" stroke="#0B1736" stroke-width="1.5"/>`);
    }
    const lx = X(8.5), ly = Y(66);
    s += `<g font-family="system-ui,sans-serif" font-size="14"><rect x="${lx}" y="${ly}" width="270" height="${CURVE_SPACED ? 58 : 34}" rx="9" fill="rgba(11,23,54,.9)" stroke="rgba(255,215,102,.45)"/><line x1="${lx + 12}" x2="${lx + 38}" y1="${ly + 17}" y2="${ly + 17}" stroke="#ff7a6b" stroke-width="3.5"/><text x="${lx + 46}" y="${ly + 22}" fill="#fff">No review (Ebbinghaus data)</text>`;
    if (CURVE_SPACED) s += `<line x1="${lx + 12}" x2="${lx + 38}" y1="${ly + 41}" y2="${ly + 41}" stroke="#4fd18b" stroke-width="3.5"/><text x="${lx + 46}" y="${ly + 46}" fill="#fff">Spaced reviews (illustration)</text>`;
    return s + `</g></svg>`;
  }

  /* ---------------- order-recall component ---------------- */
  // state: {target:[], bank:[], picked:[], checked:false}
  function orcNew(target, distract) { const bank = shuf(target.concat(distract || [])); return { target: target.slice(), bank, picked: [], checked: false }; }
  function orcHTML(o, ns) {
    const res = o.checked ? o.picked.map((bi, i) => o.bank[bi] === o.target[i]) : null;
    let h = `<p class="hint">Tap the items in the order you remember them. ${o.picked.length}/${o.target.length} placed.</p>`;
    h += `<div class="ml-slots" aria-live="polite">${o.picked.length ? o.picked.map((bi, i) => `<span class="ml-slot ${res ? (res[i] ? 'ok' : 'no') : ''}"><i>${i + 1}</i>${E(o.bank[bi])}${res ? (res[i] ? ' ✓' : ' ✗') : ''}</span>`).join('') : '<span class="hint">Your order appears here.</span>'}</div>`;
    if (!o.checked) {
      h += `<div class="ml-bank" role="group" aria-label="Items to place">${o.bank.map((t, i) => `<button type="button" class="chip" data-px="${ns}pick" data-pv="${VIEW}" data-i="${i}" ${o.picked.includes(i) || o.picked.length >= o.target.length ? 'disabled' : ''}>${E(t)}</button>`).join('')}</div>`;
      h += `<div class="row" style="margin-top:10px">${px(ns + 'undo', '↩ Undo', 'btn ghost', o.picked.length ? '' : 'disabled')}${px(ns + 'check', 'Check my order', 'btn go', o.picked.length === o.target.length ? '' : 'disabled')}</div>`;
    } else {
      const n = res.filter(Boolean).length;
      h += `<div class="fb ${n === o.target.length ? 'good' : n >= o.target.length / 2 ? 'note' : 'bad'}"><b>${n}/${o.target.length} in the right place.</b> Correct order: ${o.target.map((t, i) => `${i + 1}. ${E(t)}`).join(' · ')}</div>`;
    }
    return h;
  }
  function orcClick(o, a, el) {
    if (a === 'pick') { const i = +el.dataset.i; if (!o.picked.includes(i) && o.picked.length < o.target.length) o.picked.push(i); return true; }
    if (a === 'undo') { o.picked.pop(); return true; }
    if (a === 'check') { o.checked = true; return o.picked.filter((bi, i) => o.bank[bi] === o.target[i]).length; }
    return false;
  }

  /* ---------------- transient state ---------------- */
  const T = {
    quiz: null,            // How Memory Works check quiz {i, pick, score}
    pb: null,              // palace builder {sel:[], step:'pick'|'fill'}
    view: null,            // {src:'r'|'u', id/idx, mode:'study'|'walk', i, ans:[], shown}
    tk: 0,                 // toolkit technique index
    tka: {},               // per-technique mini-activity state
    fc: null,              // flashcard session
    fcDeck: null,
    game: null,            // memory game state
    plan: null
  };
  let TMR = null; const clearT = () => { if (TMR) { clearTimeout(TMR); TMR = null; } };
  const reRender = () => { if (A && A.S.loc && A.S.loc.v === VIEW) A.render(); };

  /* ================= TAB 1: HOW MEMORY WORKS ================= */
  const QUIZ = [
    { q: 'Which study habit is most likely to help you remember for an exam three weeks away?', o: ['Rereading your notes five times the night before', 'Short self-tests spread over the three weeks', 'Highlighting every key sentence in colour', 'Listening to notes while you sleep'], a: 1, why: 'Spacing plus retrieval practice beats rereading and highlighting, which feel productive but add little (Dunlosky and colleagues, 2013).' },
    { q: 'Working memory is best described as:', o: ['A permanent store with no limit', 'A small mental desk that holds only a few items for a short time', 'The part of the brain that controls emotion', 'Memory for skills like riding a bicycle'], a: 1, why: 'Working memory holds roughly four meaningful chunks at once, for seconds unless you rehearse them.' },
    { q: 'What did Ebbinghaus\'s forgetting curve show?', o: ['We forget at a steady rate every day', 'We forget most in the first hours, then forgetting slows down', 'We never forget anything we read once', 'Memory improves on its own over time'], a: 1, why: 'Forgetting is steep at first, then levels off. Reviewing at the right moments flattens the curve.' },
    { q: 'Which statement is a myth?', o: ['Sleep helps new memories become stable', 'Testing yourself strengthens memory', 'We only use 10% of our brains', 'Linking new ideas to what you know helps recall'], a: 2, why: 'Brain scans show activity across the whole brain over a day; there is no unused 90%.' },
    { q: 'Dual coding means:', o: ['Studying two subjects at the same time', 'Pairing words with a picture or diagram', 'Writing notes in two colours', 'Reading a text twice'], a: 1, why: 'Words plus visuals give your memory two linked routes back to the same idea.' }
  ];
  const MYTHS = [
    ['"We only use 10% of our brains."', 'False. Brain imaging shows activity across the whole brain over a day, and damage to almost any area causes problems. There is no spare 90%.'],
    ['"I\'m a visual learner, so I can only learn from pictures."', 'Matching lessons to a "learning style" has not been shown to improve results (Pashler and colleagues, 2008). Everyone benefits from words plus visuals.'],
    ['"Rereading and highlighting is the best way to revise."', 'They feel easy, which fools us into thinking we know the work. Self-testing and spacing work far better.'],
    ['"Memory works like a video recording."', 'Memory is reconstructive: we rebuild it each time, and details can change. That is why eyewitnesses can be confidently wrong.'],
    ['"Some people have a perfect photographic memory."', 'No adult has been reliably shown to have one. Memory champions use trained techniques such as the mind palace.'],
    ['"An all-nighter before the exam helps."', 'Losing sleep harms attention and the consolidation of what you studied. Sleep is part of revision.']
  ];
  function tabHow() {
    let h = `<div class="card"><span class="kicker">Guide</span><h2>How Memory Works</h2>
      <p>Every time you learn something, your brain goes through three jobs. Knowing them tells you exactly where your revision can go wrong, and how to fix it.</p>
      <div class="ml-flow">
        <div class="ml-stage"><h4>1. Encoding</h4><p class="ml-small">Getting information <b>in</b>. You notice it, pay attention and make sense of it. No attention, no memory: scrolling your phone while "reading" encodes very little.</p></div><span class="ml-arrow" aria-hidden="true">→</span>
        <div class="ml-stage"><h4>2. Storage</h4><p class="ml-small">Keeping it. New memories are fragile at first and become more stable over hours and days, much of that work happening while you sleep (<b>consolidation</b>).</p></div><span class="ml-arrow" aria-hidden="true">→</span>
        <div class="ml-stage"><h4>3. Retrieval</h4><p class="ml-small">Getting it <b>out</b> when you need it, like in the exam room. Each successful retrieval makes the next one easier.</p></div>
      </div>
      <div class="row" style="margin-top:10px">${A.listenBtn('Listen')}</div></div>`;
    h += `<div class="grid2"><div class="card"><h3>Working Memory</h3><p>Your <b>mental desk</b>. It holds what you are thinking about right now, but it is small: most people can juggle about <b>four meaningful chunks</b> at once (older textbooks say "seven, plus or minus two"). Without rehearsal, items slip away within seconds.</p><p class="hint">That is why a long list of new terms feels impossible, and why chunking and images help: they pack more onto the desk.</p></div>
      <div class="card"><h3>Long-Term Memory</h3><p>Your <b>library</b>. It has no known practical limit. The challenge is not space but finding things again. Well-organised, well-linked knowledge has many "paths" back to it.</p><p class="hint">Linking new terms to Caribbean examples you already know builds those paths.</p></div></div>`;
    h += `<div class="card"><span class="kicker">The Science</span><h3>The Forgetting Curve</h3>
      <p>In the 1880s the German psychologist <b>Hermann Ebbinghaus</b> memorised lists of nonsense syllables and tested himself at different delays. He found that forgetting is <b>fast at first, then slows down</b>: within an hour he needed to relearn more than half the list, but after a month a portion still remained.</p>
      <div class="ml-svgwrap">${curveSVG()}</div>
      <p class="ml-cap">Red: Ebbinghaus's own results (approximate). Green: an illustration of how each spaced review restores the memory and makes the next drop smaller and slower.</p>
      <div class="row">${px('curve', CURVE_SPACED ? 'Hide spaced reviews' : 'Show spaced reviews', 'btn gold', `aria-pressed="${CURVE_SPACED}"`)}</div>
      <p><b>The big idea:</b> review just as you are starting to forget, for example on Day 1, Day 3, Day 7 and Day 14. Each review takes less time than the last, and the memory lasts longer. The Flashcard Trainer and the Exam Memory Plan in this lab do this scheduling for you.</p></div>`;
    const H = [['🔁', 'Retrieval Practice', 'Pulling information out of memory strengthens it more than putting it in again. Testing yourself is not just checking: it is learning (Roediger and Karpicke, 2006).', 'Close your notes and write down everything you remember about registers. Then check.'],
      ['📆', 'Spacing', 'Spreading the same study time over several days beats cramming it into one night, especially for long-term recall.', 'Split one 2-hour session into four 30-minute sessions across a week.'],
      ['🔗', 'Elaboration', 'Explaining how and why, and linking new ideas to things you know, gives memory more hooks.', 'Ask: why does a Creole speaker code-switch at a job interview?'],
      ['🖼️', 'Dual Coding', 'Words plus a simple picture or diagram create two routes back to the same idea (Paivio).', 'Sketch the communication process as arrows between two stick figures.'],
      ['😴', 'Sleep', 'Sleep helps consolidate what you learned during the day. Teens need about 8 to 10 hours.', 'Do a short review before bed, then sleep instead of cramming.'],
      ['💓', 'Emotion & Meaning', 'Things that are funny, surprising or personally meaningful are remembered better. Very high stress, though, makes recall harder.', 'Make your memory images silly or link them to your own community.']];
    h += `<div class="card"><h3>What Helps You Remember</h3><div class="ml-grid">${H.map(([i, t, d, tr]) => `<div class="ml-box"><span class="ml-ic" aria-hidden="true">${i}</span><h4>${t}</h4><p class="ml-small">${d}</p><span class="ml-try"><b>Try it:</b> ${tr}</span></div>`).join('')}</div></div>`;
    h += `<div class="card"><h3>Myths vs Facts</h3><p class="hint">Tap a card to flip it.</p><div class="ml-flips">${MYTHS.map(([m, f]) => `<button type="button" class="flip ml-fl" data-gx="flip" aria-label="Flip card: ${E(m.replace(/"/g, ''))}"><span class="inner"><span class="face"><span class="ribbon">Myth?</span><b>${E(m)}</b></span><span class="face back"><span class="ribbon">Fact</span><span>${E(f)}</span></span></span></button>`).join('')}</div></div>`;
    h += quizHTML();
    return h;
  }
  function quizHTML() {
    const Q = T.quiz || (T.quiz = { i: 0, pick: null, score: 0 });
    if (Q.i >= QUIZ.length) return `<div class="card"><h3>Quick Check</h3><div class="fb ${Q.score >= 4 ? 'good' : 'note'}"><b>You scored ${Q.score}/${QUIZ.length}.</b> ${Q.score >= 4 ? 'Strong start. Now put it to work in the Mind Palace.' : 'Reread the cards above, then try again: retrieval practice in action.'}</div><div class="row">${px('qagain', 'Try again', 'btn go')}</div></div>`;
    const q = QUIZ[Q.i];
    return `<div class="card"><span class="kicker">Quick Check · ${Q.i + 1} of ${QUIZ.length}</span><h3>Test Your Memory Science</h3><p><b>${E(q.q)}</b></p>
      <div class="opts">${q.o.map((o, i) => `<button type="button" class="opt ${Q.pick != null ? (i === q.a ? 'right' : i === Q.pick ? 'wrong' : '') : ''}" data-px="qpick" data-pv="${VIEW}" data-i="${i}" ${Q.pick != null ? 'disabled' : ''}>${E(o)}</button>`).join('')}</div>
      ${Q.pick != null ? `<div class="fb ${Q.pick === q.a ? 'good' : 'bad'}" role="status"><b>${Q.pick === q.a ? 'Correct.' : 'Not quite.'}</b> ${E(q.why)}</div><div class="row">${px('qnext', Q.i + 1 < QUIZ.length ? 'Next question →' : 'See my score', 'btn go')}</div>` : ''}</div>`;
  }

  /* ================= TAB 2: MIND PALACE ================= */
  function stopsList(r, hideItems) {
    return `<ol class="ml-stops">${r.map((s, i) => { const l = LOC[s[0]] || { n: s[0], e: '📍' }; return `<li><span class="ml-num">${i + 1}</span><div><b>${l.e} ${E(l.n)}</b><span class="${hideItems ? 'ml-hide' : ''}" ${hideItems ? 'aria-hidden="true"' : ''}>${s[3] ? s[3] + ' ' : ''}<b style="display:inline">${E(s[1])}</b>: ${E(s[2])}</span></div></li>`; }).join('')}</ol>`;
  }
  function tabPalace() {
    const m = M();
    if (T.view) return palaceView();
    let h = `<div class="card"><span class="kicker">Guide</span><h2>Mind Palace (Method of Loci)</h2>
      <p>The <b>method of loci</b> ("loci" is Latin for places) is one of the oldest memory techniques. The ancient story says the Greek poet Simonides identified the guests at a collapsed banquet hall by remembering <b>where each one had been sitting</b>. Today memory champions use it, and a 2017 study found that ordinary people who practised it for six weeks more than doubled their recall of word lists.</p>
      <p>It works because your brain is excellent at remembering <b>places and routes</b>. You borrow that strength by "parking" each item you need at a spot along a route you know by heart.</p>
      <h4>Five Steps</h4>
      ${[['Choose a route you know well', 'Your home, your yard, the walk to the bus stop, your school. Always walk it in the same direction.'], ['Pick clear stops', '5 to 10 distinct spots along it: the gate, the gallery, the kitchen. Avoid two stops that look alike.'], ['Make a vivid image for each item', 'Exaggerate it: huge, moving, noisy, funny or a little strange. Link it to the stop so they interact.'], ['Walk the route in your mind', 'Slowly, stop by stop, "seeing" each image. Do it two or three times.'], ['Test yourself, then space it', 'Recall the items in order without looking. Walk the palace again tomorrow, in three days and in a week.']].map(([t, d], i) => `<div class="ml-step"><span class="ml-num">${i + 1}</span><div><b>${t}.</b> ${d}</div></div>`).join('')}
      <div class="row">${A.listenBtn('Listen')}</div></div>`;
    h += `<div class="card"><span class="kicker">Worked Example · Module 2</span><h3>The Seven Characteristics of Language</h3>
      <p>Walk from the front gate, up onto the gallery, through the front door, past the coal pot and out to the yard. At each stop, one characteristic is waiting for you.</p>
      <div class="ml-svgwrap">${mapSVG(WORKED.map(w => w[0]), { label: 'Worked example route for the seven characteristics of language' })}</div>
      <div class="ml-tw"><table class="ml-table"><thead><tr><th>Stop</th><th>Item</th><th>Vivid image</th></tr></thead><tbody>${WORKED.map((w, i) => `<tr><td><b>${i + 1}. ${LOC[w[0]].e} ${LOC[w[0]].n}</b></td><td><b>${w[3]} ${E(w[1])}</b></td><td>${E(w[2])}</td></tr>`).join('')}</tbody></table></div>
      <p class="hint">Now close your eyes and walk it: gate, gallery, door, TV, coal pot, mango tree, clothesline. Can you name all seven?</p>
      <div class="row">${px('walkready', '🚶 Walk-through test of this example', 'btn go', 'data-id="w"')}</div></div>`;
    // Builder
    h += builderHTML();
    // Saved palaces + ready-made
    h += `<div class="card"><h3>Ready-Made Palaces for the Course</h3><div class="tiles">${READY.map(p => `<div class="tile" style="cursor:default"><span class="ticon" aria-hidden="true">🏛️</span><h3>${E(p.n)}</h3><span class="meta">${E(p.mod)} · ${p.r.length} stops. ${E(p.blurb)}${m.best['w' + p.id] != null ? ` Best walk: ${m.best['w' + p.id]}/${p.r.length}.` : ''}</span><div class="row" style="margin-top:8px">${px('study', 'Study', 'btn gold', `data-src="r" data-id="${p.id}"`)}${px('walk', 'Walk-through test', 'btn go', `data-src="r" data-id="${p.id}"`)}</div></div>`).join('')}</div></div>`;
    h += `<div class="card"><h3>My Palaces (${m.p.length}/5)</h3>${m.p.length ? `<div class="tiles">${m.p.map((p, i) => `<div class="tile" style="cursor:default"><span class="ticon" aria-hidden="true">${(p.r[0] && p.r[0][3]) || '🏠'}</span><h3>${E(p.n)}</h3><span class="meta">${p.r.length} stops${m.best['wu' + i] != null ? ` · best walk ${m.best['wu' + i]}/${p.r.length}` : ''}</span><div class="row" style="margin-top:8px">${px('study', 'Study', 'btn gold', `data-src="u" data-id="${i}"`)}${px('walk', 'Test', 'btn go', `data-src="u" data-id="${i}"`)}${px('pdel', 'Delete', 'btn ghost', `data-id="${i}" aria-label="Delete palace ${E(p.n)}"`)}</div></div>`).join('')}</div>` : '<p class="hint">No palaces saved yet. Build one above: they are stored on this device only.</p>'}</div>`;
    return h;
  }
  function builderHTML() {
    const B = T.pb || (T.pb = { sel: [], step: 'pick' });
    let h = `<div class="card" id="ml-builder"><span class="kicker">Interactive</span><h3>Palace Builder</h3>`;
    if (B.step === 'pick') {
      h += `<p><b>Step 1 of 2: plan your route.</b> Tap 5 to 10 locations in the order you will walk them. The gold numbers show your route.</p>
        <div class="ml-svgwrap">${mapSVG(B.sel, { interactive: true, label: 'Palace builder map: your chosen route' })}</div>
        <div class="chips ml-locs" role="group" aria-label="Locations" style="margin-top:10px">${LOCS.map(l => { const i = B.sel.indexOf(l.id); return `<button type="button" class="chip ${i >= 0 ? 'sel' : ''}" data-px="pick" data-pv="${VIEW}" data-id="${l.id}" aria-pressed="${i >= 0}">${i >= 0 ? `<span class="ml-ord">${i + 1}</span>` : ''}${l.e} ${E(l.n)}</button>`; }).join('')}</div>
        <p class="hint" aria-live="polite">${B.sel.length} chosen${B.sel.length < 5 ? ` (choose at least ${5 - B.sel.length} more)` : B.sel.length >= 10 ? ' (maximum reached)' : ''}.</p>
        <div class="row">${px('pbquick', 'Use a suggested route', 'btn ghost')}${px('pbclear', 'Clear', 'btn ghost', B.sel.length ? '' : 'disabled')}${px('pbnext', 'Next: place items →', 'btn go', B.sel.length >= 5 ? '' : 'disabled')}</div>`;
    } else {
      h += `<p><b>Step 2 of 2: place an item and a vivid image at each stop.</b> Make each image big, moving, funny or strange, and make it touch the place.</p>
        <div class="row" style="margin-bottom:8px"><span class="hint">Need content?</span>${px('pbfill', 'Fill with the 7 characteristics of language', 'btn ghost', B.sel.length >= 7 ? '' : 'disabled')}${px('pbfill', 'Fill with the 5 registers', 'btn ghost', 'data-k="reg"')}</div>
        <div class="ml-fill">${B.sel.map((id, i) => { const l = LOC[id]; return `<div class="ml-frow"><span class="ml-ln"><span class="ml-num">${i + 1}</span>${l.e} ${E(l.n)}</span>
          <div class="ml-fi"><label for="ml-it${i}">Item to remember</label><input class="ml-in" id="ml-it${i}" type="text" data-mlin="pi${i}" value="${E(DR['pi' + i] || '')}" maxlength="60" placeholder="e.g. Arbitrary"></div>
          <div class="ml-fi"><label for="ml-cu${i}">Vivid image cue</label><input class="ml-in" id="ml-cu${i}" type="text" data-mlin="pc${i}" value="${E(DR['pc' + i] || '')}" maxlength="90" placeholder="e.g. Granny calls the dog Cat"></div>
          <div><label for="ml-em${i}">Emoji</label><select class="ml-sel" id="ml-em${i}" data-mlin="pe${i}">${EMO.map(e => `<option ${((DR['pe' + i] || EMO[i % EMO.length]) === e) ? 'selected' : ''}>${e}</option>`).join('')}</select></div></div>`; }).join('')}</div>
        <div class="field" style="margin-top:10px"><label for="ml-pname">Name your palace</label>${inp('pname', 'e.g. Module 2: language characteristics', 40, 'id="ml-pname"')}</div>
        <div class="row" style="margin-top:10px">${px('pbback', '← Back to route', 'btn ghost')}${px('pbsave', '💾 Save palace', 'btn go')}</div>`;
    }
    return h + `</div>`;
  }
  function getPalace(src, id) {
    if (src === 'r') { const p = READY.find(x => x.id === id); return p ? { n: p.n, r: p.r, key: 'w' + p.id } : null; }
    if (src === 'w') return { n: 'Seven Characteristics of Language', r: WORKED, key: 'wwk' };
    const p = M().p[+id]; return p ? { n: p.n, r: p.r, key: 'wu' + id } : null;
  }
  function palaceView() {
    const V = T.view, p = getPalace(V.src, V.id);
    if (!p) { T.view = null; return tabPalace(); }
    const back = px('pvback', '← All palaces', 'btn ghost');
    if (V.mode === 'study') {
      return `<div class="card"><div class="row" style="justify-content:space-between"><span class="kicker">Study</span>${back}</div><h2>${E(p.n)}</h2>
        <p>Walk the route slowly. At each stop, picture the image as vividly as you can: colour, size, sound, movement.</p>
        <div class="ml-svgwrap">${mapSVG(p.r.map(s => s[0]), { label: 'Route for ' + p.n })}</div>
        ${stopsList(p.r, V.hide)}
        <div class="row" style="margin-top:10px">${px('hideitems', V.hide ? '👁 Show items' : '🙈 Hide items and self-test', 'btn gold', `aria-pressed="${!!V.hide}"`)}${px('walk', '🚶 Walk-through test', 'btn go', `data-src="${V.src}" data-id="${V.id}"`)}</div></div>`;
    }
    // walk-through test
    const n = p.r.length;
    if (V.i >= n) {
      const sc = V.res.filter(Boolean).length;
      return `<div class="card"><div class="row" style="justify-content:space-between"><span class="kicker">Walk-Through Results</span>${back}</div><h2>${E(p.n)}: ${sc}/${n}</h2>
        <div class="fb ${sc === n ? 'good' : sc >= n * .6 ? 'note' : 'bad'}">${sc === n ? 'A perfect walk. Walk it again tomorrow and in three days to lock it in.' : sc >= n * .6 ? 'Good recall. Make the missed images bigger and stranger, then walk it again.' : 'This palace needs another study walk. Strengthen each image and try again.'}</div>
        <ol class="ml-stops">${p.r.map((s, i) => `<li><span class="ml-num">${V.res[i] ? '✓' : '✗'}</span><div><b>${LOC[s[0]].e} ${E(LOC[s[0]].n)}: ${E(s[1])}</b><span class="hint">You wrote: ${E(V.ans[i] || '(revealed)')}</span></div></li>`).join('')}</ol>
        <div class="row" style="margin-top:10px">${px('walk', 'Walk it again', 'btn go', `data-src="${V.src}" data-id="${V.id}"`)}${px('study', 'Study it', 'btn gold', `data-src="${V.src}" data-id="${V.id}"`)}</div></div>`;
    }
    const s = p.r[V.i], l = LOC[s[0]];
    const done = V.res.length > V.i;
    return `<div class="card"><div class="row" style="justify-content:space-between"><span class="kicker">Walk-Through Test · Stop ${V.i + 1} of ${n}</span>${back}</div><h2>${E(p.n)}</h2>
      <div class="pbar" aria-hidden="true"><i style="width:${Math.round(V.i / n * 100)}%"></i></div>
      <div class="ml-svgwrap" style="margin-top:10px">${mapSVG(p.r.map(x => x[0]), { cur: s[0], hideNums: false, label: 'You are at stop ' + (V.i + 1) + ': ' + l.n })}</div>
      <div class="ml-walk ml-pop" style="margin-top:10px">
        <p style="margin:0"><span class="ml-big" aria-hidden="true">${l.e}</span> You are at <b>stop ${V.i + 1}: ${E(l.n)}</b>. What did you place here?</p>
        ${done ? `<div class="fb ${V.res[V.i] ? 'good' : 'bad'}" role="status"><b>${V.res[V.i] ? 'Yes!' : 'The item was:'}</b> ${s[3] || ''} <b>${E(s[1])}</b>. ${E(s[2])}</div>
          <div class="row">${px('wnext', V.i + 1 < n ? 'Walk on to the next stop →' : 'See my results', 'btn go')}</div>` :
        `<label class="ml-sr" for="ml-wans">Your answer</label><input class="ml-in" id="ml-wans" type="text" data-mlin="wans" data-mlenter="ml-wchk" value="${E(DR.wans || '')}" maxlength="80" placeholder="Type the item" autocomplete="off">
          <div class="row">${px('wcheck', 'Check', 'btn go', 'id="ml-wchk"')}${px('wreveal', 'Reveal', 'btn ghost')}${V.hint ? `<span class="hint">Image clue: ${s[3] || ''} ${E(s[2].split(/[,:.]/)[0])}…</span>` : px('whint', '💡 Image clue', 'btn ghost')}</div>`}
      </div></div>`;
  }

  /* ================= TAB 3: MNEMONIC TOOLKIT ================= */
  const TOOLS = [
    { id: 'acro', i: '🔤', n: 'Acronyms & Acrostics', what: 'An <b>acronym</b> turns the first letters of a list into a word (PEEL). An <b>acrostic</b> turns them into a memorable sentence. They work best when you already understand each item: the letters are a cue, not the learning.', ex: ['<b>PEEL</b>: Point, Evidence, Explanation, Link: the paragraph structure used across this course.', '<b>SQ3R</b>: Survey, Question, Read, Recite, Review: a reading method.', '<b>CRAAP test</b>: Currency, Relevance, Authority, Accuracy, Purpose: for judging sources in Module 1.', '<b>SOAPSTone</b>: Speaker, Occasion, Audience, Purpose, Subject, Tone: for analysing a text.', 'Acrostic for the registers, most fixed to most personal (Frozen, Formal, Consultative, Casual, Intimate): <b>"Fat Frogs Can Catch Insects."</b>'] },
    { id: 'chunk', i: '🧩', n: 'Chunking', what: 'Working memory holds only about four chunks, so group items into meaningful units. A phone number is easier as 868-555-0142 than as ten loose digits. Experts remember more because they see bigger, meaningful chunks.', ex: ['The 9 elements of the communication process become 3 chunks: <b>Sender side</b> (sender, encoding, message), <b>Travel</b> (channel, noise, context), <b>Receiver side</b> (decoding, receiver, feedback).', 'Paper 032 facts as one chunk: <b>"2-15, 60, 20"</b>: 2 hours 15 minutes, 60 marks, 20 per cent.'] },
    { id: 'jingle', i: '🎶', n: 'Rhymes, Songs & Jingles', what: 'Rhythm and rhyme give memory a pattern to follow, which is why you still know advertising jingles from childhood. Calypsonians have always used rhyme to make social commentary stick.', ex: ['"<b>Acro</b> on top, <b>meso</b> in the middle, <b>basi</b> down deep, now you solve the riddle!"', 'A PEEL chant to a steady beat: "Make your <b>Point</b>, bring <b>Evidence</b> in, <b>Explain</b> it well, then <b>Link</b> to win!"'] },
    { id: 'story', i: '📖', n: 'The Link & Story Method', what: 'Link each item to the next with a vivid, silly action, so that one item pulls the next out of memory like beads on a string. Great for lists in a fixed order.', ex: ['Communication process: A <b>sender</b> (a calypsonian) <b>encodes</b> a song into a coconut (<b>message</b>), throws it down a river (<b>channel</b>) where a jet ski roars past (<b>noise</b>); a fisherman <b>receives</b> it, cracks it open to <b>decode</b> the song, and shouts back "Play it again!" (<b>feedback</b>).'] },
    { id: 'peg', i: '🪝', n: 'The Peg System', what: 'Learn a fixed set of rhyming "pegs" once (1-bun, 2-shoe, 3-tree…), then hang any list on them. Its strength is random access: you can jump straight to item 7 without starting from the top.', ex: ['To remember the three models: 1-<b>bun</b>: a hot cross bun shaped like a one-way arrow (linear). 2-<b>shoe</b>: two sneakers playing ping-pong (interactive). 3-<b>tree</b>: a tree whose branches talk and listen at once (transactional).'] },
    { id: 'key', i: '🔑', n: 'The Keyword Method', what: 'For new vocabulary or foreign words: find a familiar word that <b>sounds like</b> the new one, then make an image joining that sound-alike to the meaning (Atkinson and Raugh, 1975).', ex: ['Spanish <b>caballo</b> (horse) sounds like "cab-eye-yo": picture a horse driving a taxi cab.', '<b>Proxemics</b> sounds like "proximity": how close people stand when they talk.', '<b>Kinesics</b> sounds like "kinetic": body movement and gesture.', '<b>Paralanguage</b> sounds like "parachute": tone, pitch and pace parachute in alongside your words.'] },
    { id: 'vis', i: '🎨', n: 'Visualisation & Exaggeration', what: 'Plain images fade. Boost them with <b>size</b>, <b>movement</b>, <b>sound</b>, <b>colour</b>, <b>humour</b> and <b>you</b> in the scene. Strange and personal beats neat and ordinary.', ex: ['Weak: "a dictionary for Standard English". Strong: "a ten-foot dictionary in a three-piece suit, correcting the minibus driver\'s grammar through a megaphone while you laugh."'] },
    { id: 'major', i: '🔢', n: 'The Major System (Optional)', what: 'An advanced tool for numbers: each digit becomes a consonant sound, and you add vowels to make words. 0 = s/z, 1 = t/d, 2 = n, 3 = m, 4 = r, 5 = l, 6 = j/sh/ch, 7 = k/hard g, 8 = f/v, 9 = p/b. Vowels and w, h, y do not count.', ex: ['Paper 032 is worth <b>60</b> marks: 6 = ch, 0 = s, so <b>"chess"</b>. Picture a chess board as the exam paper.', 'It lasts <b>135</b> minutes: t-m-l, so <b>"timely"</b>.', 'Module essays are marked out of <b>25</b>: n-l, so <b>"nail"</b>.'] },
    { id: 'mind', i: '🕸️', n: 'Mind Maps', what: 'Put the main idea in the centre and branch out to sub-topics, using keywords, colour and small pictures. Making the map yourself, from memory, is where the learning happens.', ex: ['Centre: <b>Register</b>. Branches: Frozen (pledge), Formal (speech), Consultative (doctor), Casual (friends), Intimate (family).'] },
    { id: 'dual', i: '✏️', n: 'Dual Coding Sketches', what: 'Pair each key term with a quick sketch or icon. You do not need to draw well: stick figures and arrows are enough. Two codes (words and picture) give two routes back.', ex: ['Linear model: ➡️ one arrow. Interactive: 🏓 back and forth. Transactional: 🔁 arrows both ways at once, inside a circle for context.'] },
    { id: 'feyn', i: '👩🏾‍🏫', n: 'The Feynman Technique', what: 'Named after physicist Richard Feynman. 1) Pick a concept. 2) Explain it in plain words as if teaching a Form 1 student. 3) Spot where you got stuck or used jargon. 4) Go back to your notes, then simplify again.', ex: ['Instead of "Diglossia is a situation of functional specialisation of two varieties", say: "In some places people use one language for official, serious things and another for home and friends, like Standard English at school and Creole at the market."'] },
    { id: 'why', i: '❓', n: 'Elaborative Interrogation', what: 'Turn facts into "why" and "how" questions, and answer them. Explaining the reason links the fact to what you already know, so it sticks better than the fact alone.', ex: ['Fact: "Creole speakers may find Standard English spelling hard." Why? Because Creole is mainly oral and its sounds do not always match English spelling, and because some sounds, such as "th", are pronounced differently.'] },
    { id: 'leit', i: '🗂️', n: 'Self-Testing & the Leitner Box', what: 'Flashcards work when you <b>try to recall before you flip</b>. The Leitner box adds spacing: cards you get right move up a box and come back less often; cards you miss return to Box 1 and come back tomorrow.', ex: ['Box 1: every day · Box 2: every 2 days · Box 3: every 4 days · Box 4: every week · Box 5: every 2 weeks.'] }
  ];
  const ACRO_LISTS = { reg: ['Frozen', 'Formal', 'Consultative', 'Casual', 'Intimate'], cont: ['Basilect', 'Mesolect', 'Acrolect'], proc: ['Sender', 'Encoding', 'Message', 'Channel', 'Decoding', 'Receiver', 'Feedback'], crap: ['Currency', 'Relevance', 'Authority', 'Accuracy', 'Purpose'], res: ['Topic', 'Question', 'Methods', 'Collect', 'Analyse', 'Present'] };
  const ACRO_NAMES = { reg: 'Registers', cont: 'Creole continuum', proc: 'Communication process', crap: 'CRAAP test', res: 'Research process' };
  const JINGLE_TOPICS = { reg: 'the five registers', cont: 'basilect, mesolect, acrolect', peel: 'PEEL paragraphs', proc: 'the communication process', p3: 'Paper 032: 2 hours 15, 60 marks' };
  const KEYQ = [['Onomatopoeia', 'a word that imitates a sound', 'on-a-mat-o-PEE-a: a cat on a mat saying "meow, splash, boom"'], ['Euphemism', 'a mild word in place of a harsh one', '"you-FEM-ism": a soft, fluffy pillow that says "passed away" instead of "died"'], ['Hyperbole', 'deliberate exaggeration', '"hyper-BOWL-ee": a hyper kid with a bowl of food a mile high'], ['Diglossia', 'two varieties of a language used for different social functions', '"die-GLOSS-ia": two lip glosses, one for church, one for the beach'], ['Lexicon', 'the vocabulary of a language', '"lexi-CON": a Lexus car packed full of words']];
  const MAJOR_Q = [['20', 'nose', ['nose', 'sun', 'tin', 'map'], '2 = n, 0 = s'], ['25', 'nail', ['nail', 'meal', 'tail', 'lane'], '2 = n, 5 = l'], ['60', 'chess', ['chess', 'gas', 'jam', 'kiss'], '6 = ch, 0 = s'], ['14', 'tyre', ['tyre', 'rat', 'tap', 'dome'], '1 = t, 4 = r'], ['32', 'moon', ['moon', 'name', 'mail', 'nap'], '3 = m, 2 = n']];
  const WHYQ = [['Spaced review beats cramming.', 'Each review happens when the memory has started to fade, so recalling it takes effort, and that effort strengthens it. Cramming repeats while the memory is still fresh, so it feels easy but builds less.'], ['Advertisers often use the casual register with teenagers.', 'Casual language sounds friendly and creates a sense of belonging with the audience, which makes the message feel trustworthy and persuasive to that group.'], ['A questionnaire suits a large sample better than interviews do.', 'It is quicker and cheaper to give the same questions to many people, and the answers are easier to compare, although you lose the depth of follow-up questions.']];
  const VIS_BOOST = [['size', 'Size: huge or tiny'], ['move', 'Movement or action'], ['sound', 'Sound or smell'], ['colour', 'Bright colour'], ['funny', 'Funny or strange'], ['me', 'You or someone you know in it']];
  const DUAL_TERMS = ['Linear model', 'Feedback', 'Noise', 'Code-switching', 'Audience'];
  const DUAL_ICONS = ['➡️', '🔁', '🏓', '📢', '🔀', '👥', '🎯', '💬', '🧠', '🌍'];

  function tabTools() {
    const k = Math.max(0, Math.min(TOOLS.length - 1, T.tk | 0)), t = TOOLS[k];
    let h = `<div class="card"><span class="kicker">Toolkit</span><h2>Mnemonic Toolkit</h2><p>Thirteen proven memory tools. Each has a short explanation, course examples and a mini-activity. Pick a tool.</p>
      <div class="chips" role="group" aria-label="Memory tools">${TOOLS.map((x, i) => `<button type="button" class="chip ${i === k ? 'sel' : ''}" data-px="tk" data-pv="${VIEW}" data-i="${i}" aria-pressed="${i === k}">${x.i} ${E(x.n)}</button>`).join('')}</div></div>`;
    h += `<div class="card ml-pop" id="ml-tool"><span class="kicker">Tool ${k + 1} of ${TOOLS.length}</span><h2>${t.i} ${E(t.n)}</h2><p>${t.what}</p><h4>Examples</h4><ul>${t.ex.map(x => `<li>${x}</li>`).join('')}</ul><div class="row">${A.listenBtn('Listen')}</div></div>`;
    h += `<div class="card"><span class="kicker">Mini-Activity</span>${toolAct(t.id)}</div>`;
    h += `<div class="row" style="justify-content:space-between">${px('tk', '← Previous tool', 'btn ghost', `data-i="${(k + TOOLS.length - 1) % TOOLS.length}"`)}${px('tk', 'Next tool →', 'btn ghost', `data-i="${(k + 1) % TOOLS.length}"`)}</div>`;
    return h;
  }
  function toolAct(id) {
    const S = T.tka[id] || (T.tka[id] = {});
    if (id === 'acro') {
      const L = S.list || 'reg', items = ACRO_LISTS[L], init = items.map(x => x[0].toUpperCase());
      let h = `<h3>Make Your Own Acrostic</h3><p>Choose a list, then write a sentence whose words start with these letters, in order.</p>
        <div class="chips">${Object.keys(ACRO_LISTS).map(k => `<button type="button" class="chip ${k === L ? 'sel' : ''}" data-px="acrolist" data-pv="${VIEW}" data-k="${k}" aria-pressed="${k === L}">${E(ACRO_NAMES[k])}</button>`).join('')}</div>
        <p><b>${items.map(E).join(' → ')}</b></p><p class="ml-digits" aria-label="Letters ${init.join(' ')}">${init.join(' ')}</p>
        <label class="ml-sr" for="ml-acro">Your acrostic sentence</label>${inp('acro', 'Type your sentence', 140, 'id="ml-acro" data-mlenter="ml-acchk"')}
        <div class="row" style="margin-top:8px">${px('acrochk', 'Check my acrostic', 'btn go', 'id="ml-acchk"')}</div>`;
      if (S.res) h += `<div class="fb ${S.res.ok ? 'good' : 'bad'}" role="status">${S.res.msg}</div>`;
      return h;
    }
    if (id === 'chunk') {
      const src = 'PEELSQ3RCRAAP2156020';
      let h = `<h3>Chunk This String</h3><p>Here are 20 characters. Add spaces to split them into meaningful chunks (hint: three acronyms you met above, then the Paper 032 numbers).</p><p class="ml-digits">${src}</p>
        <label class="ml-sr" for="ml-chk">Your chunked version</label>${inp('chunk', 'e.g. PEEL ...', 40, 'id="ml-chk" data-mlenter="ml-chkb"')}
        <div class="row" style="margin-top:8px">${px('chunkchk', 'Check my chunks', 'btn go', 'id="ml-chkb"')}${px('tgo', 'Play Chunk It →', 'btn ghost', 'data-tab="games" data-k="chunk"')}</div>`;
      if (S.res) h += `<div class="fb ${S.res.ok ? 'good' : 'bad'}" role="status">${S.res.msg}</div>`;
      return h;
    }
    if (id === 'jingle') {
      const k = S.topic || 'reg';
      let h = `<h3>Calypso Jingle Writer</h3><p>Pick a topic, then write a 4-line jingle. Calypso tip: lines 2 and 4 should rhyme, keep a steady beat, and add some humour or social commentary.</p>
        <div class="chips">${Object.keys(JINGLE_TOPICS).map(x => `<button type="button" class="chip ${x === k ? 'sel' : ''}" data-px="jtopic" data-pv="${VIEW}" data-k="${x}" aria-pressed="${x === k}">${E(JINGLE_TOPICS[x])}</button>`).join('')}</div>
        <p class="hint">Beat guide: ONE and TWO and THREE and FOUR, with a strong word on each capital. Rhyme ideas: deep / keep / sleep · top / stop / drop · test / best / rest · link / think / ink.</p>
        <label class="ml-sr" for="ml-jin">Your jingle</label>${ta('jingle', 'Line 1\nLine 2\nLine 3\nLine 4', 600, 'id="ml-jin" rows="5"')}
        <div class="row" style="margin-top:8px">${px('beat', S.playing ? '⏹ Stop beat' : '🥁 Play a practice beat', 'btn gold')}${px('jchk', 'Check my jingle', 'btn go')}</div>`;
      if (S.res) h += `<div class="fb ${S.res.ok ? 'good' : 'note'}" role="status">${S.res.msg}</div>`;
      return h;
    }
    if (id === 'story') {
      if (!S.o) { const w = shuf(GAMETERMS).slice(0, 5); S.words = w; }
      let h = `<h3>Link Five Terms</h3><p>Write a silly story linking these five terms <b>in order</b>. Then test yourself.</p>`;
      if (!S.o) h += `<div class="ml-seq">${S.words.map((w, i) => `<span><em aria-hidden="true">${i + 1}</em>${E(w)}</span>`).join('')}</div>${ta('lstory', 'Once upon a time, a …', 800, 'aria-label="Your linking story"')}<div class="row" style="margin-top:8px">${px('lnew', 'New words', 'btn ghost')}${px('ltest', 'Hide them and test me', 'btn go')}</div>`;
      else { h += orcHTML(S.o, 'l'); if (S.o.checked) h += `<div class="row">${px('lnew', 'Try five new words', 'btn go')}</div>`; }
      return h;
    }
    if (id === 'peg') {
      let h = `<h3>Learn the Rhyming Pegs</h3><div class="ml-pegs">${PEGS.map(p => `<div class="ml-peg"><em aria-hidden="true">${p[2]}</em><b>${p[0]}: ${p[1]}</b></div>`).join('')}</div>`;
      const qi = S.i || 0;
      if (!S.order) S.order = shuf(PEGS.map((_, i) => i)).slice(0, 5);
      if (qi < 5) {
        const p = PEGS[S.order[qi]], opts = S.opts || (S.opts = shuf([p[1]].concat(shuf(PEGS.filter(x => x !== p).map(x => x[1])).slice(0, 3))));
        h += `<p style="margin-top:12px"><b>Question ${qi + 1} of 5: which word is peg ${p[0]}?</b></p><div class="opts">${opts.map(o => `<button type="button" class="opt ${S.pick != null ? (o === p[1] ? 'right' : o === S.pick ? 'wrong' : '') : ''}" data-px="pegq" data-pv="${VIEW}" data-k="${E(o)}" ${S.pick != null ? 'disabled' : ''}>${E(o)}</button>`).join('')}</div>`;
        if (S.pick != null) h += `<div class="fb ${S.pick === p[1] ? 'good' : 'bad'}">${p[0]} rhymes with <b>${p[1]}</b> ${p[2]}.</div><div class="row">${px('pegnext', 'Next', 'btn go')}</div>`;
      } else h += `<div class="fb good" style="margin-top:12px"><b>${S.score || 0}/5 pegs.</b> Now use them in the Peg Challenge game.</div><div class="row">${px('pegreset', 'Again', 'btn ghost')}${px('tgo', 'Peg Challenge →', 'btn go', 'data-tab="games" data-k="peg"')}</div>`;
      return h;
    }
    if (id === 'key') {
      const i = S.i || 0, q = KEYQ[i % KEYQ.length];
      return `<h3>Build a Keyword Image</h3><p>Term: <b>${E(q[0])}</b>, meaning ${E(q[1])}. Find a sound-alike keyword and describe an image that joins it to the meaning.</p>
        ${ta('key' + i, 'Sounds like … I picture …', 300, 'aria-label="Your keyword image"')}
        <div class="row" style="margin-top:8px">${px('keyshow', S.show ? 'Hide the model' : 'Show a model answer', 'btn gold')}${px('keynext', 'Next term →', 'btn ghost')}</div>${S.show ? `<div class="fb note">Model: ${E(q[2])}.</div>` : ''}`;
    }
    if (id === 'vis') {
      const got = S.b || {};
      return `<h3>Upgrade a Boring Image</h3><p>Boring image for <b>semantic noise</b>: "someone uses a hard word". Rewrite it, then tick each booster you used.</p>
        ${ta('vis', 'My vivid image…', 400, 'aria-label="Your vivid image"')}
        <div class="chips" style="margin-top:8px">${VIS_BOOST.map(([k, n]) => `<button type="button" class="chip ${got[k] ? 'sel' : ''}" data-px="visb" data-pv="${VIEW}" data-k="${k}" aria-pressed="${!!got[k]}">${E(n)}</button>`).join('')}</div>
        <div class="row" style="margin-top:8px">${px('vischk', 'Rate my image', 'btn go')}</div>${S.res ? `<div class="fb ${S.res.ok ? 'good' : 'note'}" role="status">${S.res.msg}</div>` : ''}`;
    }
    if (id === 'major') {
      const i = S.i || 0;
      let h = `<h3>Number to Word</h3><div class="ml-major">${[['0', 's z'], ['1', 't d'], ['2', 'n'], ['3', 'm'], ['4', 'r'], ['5', 'l'], ['6', 'j sh ch'], ['7', 'k g'], ['8', 'f v'], ['9', 'p b']].map(([d, c]) => `<div><b>${d}</b>${c}</div>`).join('')}</div>`;
      if (i < MAJOR_Q.length) {
        const q = MAJOR_Q[i];
        h += `<p style="margin-top:10px"><b>${i + 1}/${MAJOR_Q.length}: which word codes the number ${q[0]}?</b></p><div class="opts">${q[2].map(o => `<button type="button" class="opt ${S.pick != null ? (o === q[1] ? 'right' : o === S.pick ? 'wrong' : '') : ''}" data-px="majq" data-pv="${VIEW}" data-k="${o}" ${S.pick != null ? 'disabled' : ''}>${o}</button>`).join('')}</div>`;
        if (S.pick != null) h += `<div class="fb ${S.pick === q[1] ? 'good' : 'bad'}">${q[0]} → ${q[3]} → <b>${q[1]}</b>.</div><div class="row">${px('majnext', 'Next', 'btn go')}</div>`;
      } else h += `<div class="fb good" style="margin-top:10px"><b>${S.score || 0}/${MAJOR_Q.length} correct.</b> The major system takes practice; use it only if you enjoy it.</div><div class="row">${px('majreset', 'Again', 'btn ghost')}</div>`;
      return h;
    }
    if (id === 'mind') {
      const c = clip(DR.mmc || 'Register', 24), br = [0, 1, 2, 3, 4].map(i => clip(DR['mmb' + i] || '', 22));
      return `<h3>Build a Mini Mind Map</h3><p>Type a central topic and up to five branches from memory. The map draws itself.</p>
        <div class="ml-row2"><div class="field"><label for="ml-mmc">Centre</label>${inp('mmc', 'Register', 24, 'id="ml-mmc"')}</div>${[0, 1, 2, 3, 4].map(i => `<div class="field"><label for="ml-mmb${i}">Branch ${i + 1}</label>${inp('mmb' + i, ['Frozen', 'Formal', 'Consultative', 'Casual', 'Intimate'][i], 22, `id="ml-mmb${i}"`)}</div>`).join('')}</div>
        <div class="row" style="margin-top:8px">${px('mmdraw', 'Draw my map', 'btn go')}</div>
        <div class="ml-svgwrap ml-mmap" style="margin-top:10px">${mindMapSVG(c, br)}</div>`;
    }
    if (id === 'dual') {
      const pick = S.p || {};
      let h = `<h3>Pair Words With Pictures</h3><p>Choose an icon that captures each term's meaning for you. Then say aloud why it fits: that explanation is the learning.</p><div class="ml-dl">`;
      DUAL_TERMS.forEach((t, i) => { h += `<div><span><b>${E(t)}</b> ${pick[i] ? `<span aria-hidden="true">${pick[i]}</span>` : ''}</span><span class="chips" role="group" aria-label="Icons for ${E(t)}">${DUAL_ICONS.slice(0, 6).concat(DUAL_ICONS.slice(6)).map(ic => `<button type="button" class="chip ${pick[i] === ic ? 'sel' : ''}" data-px="dualp" data-pv="${VIEW}" data-i="${i}" data-k="${ic}" aria-pressed="${pick[i] === ic}" aria-label="${E(t)}: ${ic}">${ic}</button>`).join('')}</span></div>`; });
      h += `</div>${Object.keys(pick).length === DUAL_TERMS.length ? `<div class="fb good">Your dual-coded set: ${DUAL_TERMS.map((t, i) => `${pick[i]} ${E(t)}`).join(' · ')}. Sketch these on your flashcards.</div>` : `<p class="hint">${Object.keys(pick).length}/${DUAL_TERMS.length} paired.</p>`}`;
      return h;
    }
    if (id === 'feyn') {
      const txt = DR.feyn || '';
      return `<h3>Explain It Like a Teacher</h3><p>Explain <b>code-switching</b> to a Form 1 student in plain words (aim for 40 to 120 words). Then run the plain-language check.</p>
        ${ta('feyn', 'Code-switching is when…', 1000, 'aria-label="Your explanation"')}
        <div class="row" style="margin-top:8px">${px('feynchk', 'Plain-language check', 'btn go')}<span class="hint">${wc(txt)} words</span></div>${S.res ? `<div class="fb ${S.res.ok ? 'good' : 'note'}" role="status">${S.res.msg}</div>` : ''}`;
    }
    if (id === 'why') {
      const i = S.i || 0, q = WHYQ[i % WHYQ.length];
      return `<h3>Ask Why</h3><p>Fact: <b>${E(q[0])}</b> Why is this true? Write your explanation, then compare.</p>${ta('why' + i, 'Because…', 600, 'aria-label="Your explanation"')}
        <div class="row" style="margin-top:8px">${px('whyshow', S.show ? 'Hide the model' : 'Compare with a model', 'btn gold')}${px('whynext', 'Next fact →', 'btn ghost')}</div>${S.show ? `<div class="fb note">${E(q[1])}</div>` : ''}`;
    }
    if (id === 'leit') {
      return `<h3>See the Leitner Box in Action</h3><div class="ml-lb" aria-label="Five Leitner boxes">${[1, 2, 3, 4, 5].map(b => `<div class="ml-lbx"><small>Box ${b}</small><b>${['Daily', '2 days', '4 days', 'Weekly', '2 weeks'][b - 1]}</b></div>`).join('')}</div>
        <p style="margin-top:14px">Right answer: the card moves <b>up</b> one box. Wrong answer: it goes <b>back to Box 1</b>. Your effort goes where it is needed most.</p><div class="row">${px('tgo', 'Open the Flashcard Trainer →', 'btn go', 'data-tab="cards"')}</div>`;
    }
    return '';
  }
  function mindMapSVG(c, br) {
    const cx = 260, cy = 150, R = 105, n = br.filter(Boolean).length || 1; let s = `<svg class="ml-svg" viewBox="0 0 520 300" role="img" aria-label="Mind map: ${E(c)} with branches ${E(br.filter(Boolean).join(', ') || 'none yet')}"><rect width="520" height="300" rx="14" fill="#0d1d47"/>`;
    const cols = ['#FFD766', '#4fd18b', '#7fb2ff', '#ff9f80', '#d59cff']; let k = 0;
    br.forEach((b, i) => { if (!b) return; const a = -Math.PI / 2 + (k / n) * Math.PI * 2, x = cx + Math.cos(a) * R * 1.55, y = cy + Math.sin(a) * R * .95; s += `<path d="M${cx} ${cy} Q${(cx + x) / 2 + 20} ${(cy + y) / 2 - 20} ${x} ${y}" stroke="${cols[i]}" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="${x - 66}" y="${y - 17}" width="132" height="34" rx="17" fill="#0B1736" stroke="${cols[i]}" stroke-width="2"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="15" fill="#fff" font-family="system-ui,sans-serif" font-weight="700">${E(b)}</text>`; k++; });
    s += `<ellipse cx="${cx}" cy="${cy}" rx="78" ry="30" fill="#FFD766" stroke="#0B1736" stroke-width="3"/><text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="17" font-weight="800" fill="#0B1736" font-family="system-ui,sans-serif">${E(c)}</text>`;
    return s + `</svg>`;
  }
  // practice beat via WebAudio (no files)
  let ACX = null, BEAT = null;
  function beat(on) {
    if (BEAT) { clearInterval(BEAT); BEAT = null; }
    if (!on || A.S.sound === false) return false;
    try {
      ACX = ACX || new (window.AudioContext || window.webkitAudioContext)(); let n = 0;
      const hit = (f, d, v) => { const o = ACX.createOscillator(), g = ACX.createGain(); o.frequency.value = f; o.type = 'triangle'; g.gain.setValueAtTime(v, ACX.currentTime); g.gain.exponentialRampToValueAtTime(0.001, ACX.currentTime + d); o.connect(g); g.connect(ACX.destination); o.start(); o.stop(ACX.currentTime + d); };
      BEAT = setInterval(() => { const s = n % 8; if (s === 0 || s === 3 || s === 6) hit(90, .18, .5); if (s === 2 || s === 6) hit(420, .08, .25); hit(1800, .03, .06); if (++n >= 64) { clearInterval(BEAT); BEAT = null; const t = T.tka.jingle; if (t) { t.playing = false; reRender(); } } }, 230);
      return true;
    } catch (e) { return false; }
  }

  /* ================= TAB 4: FLASHCARD TRAINER ================= */
  function tabCards() {
    const m = M();
    if (T.fc) return fcSession();
    const t = today();
    const totalDue = DECKS.reduce((a, d) => a + dueCount(d[0]), 0);
    let h = `<div class="card"><span class="kicker">Leitner Box</span><h2>Flashcard Trainer</h2>
      <p>Say or write the answer <b>before</b> you flip. Then be honest: <b>Forgot</b> sends a card back to Box 1, <b>Hard</b> keeps it where it is, <b>Got it</b> moves it up a box so it comes back later.</p>
      <div class="row"><span class="ml-stat">📬 Due today: <b>${totalDue}</b></span><span class="ml-stat">🗃️ Cards in boxes: <b>${Object.keys(m.lb).length}</b></span>${m.best.fcDay === t ? `<span class="ml-stat">✅ Reviewed today: <b>${m.best.fcN || 0}</b></span>` : ''}</div></div>`;
    h += `<div class="card"><h3>Choose a Deck</h3><div class="tiles">${DECKS.map(([id, ic, n, meta]) => { const cards = deckCards(id), due = dueCount(id), b = boxCounts(id), seen = b.reduce((x, y) => x + y, 0); return `<button type="button" class="tile" data-px="fcstart" data-pv="${VIEW}" data-k="${id}" ${cards.length ? '' : 'disabled'}><span class="ticon" aria-hidden="true">${ic}</span><h3>${E(n)}</h3><span class="meta">${E(meta)} · ${cards.length} cards · ${due} due · ${Math.max(0, cards.length - seen)} new</span></button>`; }).join('')}</div>
      <p class="hint">Each session takes the cards due today plus up to 8 new ones (maximum 20), so a deck of hundreds of terms becomes a few minutes a day.</p></div>`;
    const sel = T.fcDeck || 'mem', bc = boxCounts(sel);
    h += `<div class="card"><h3>Your Boxes</h3><div class="chips" role="group" aria-label="Show boxes for deck">${DECKS.map(d => `<button type="button" class="chip ${d[0] === sel ? 'sel' : ''}" data-px="fcdeck" data-pv="${VIEW}" data-k="${d[0]}" aria-pressed="${d[0] === sel}">${d[1]} ${E(d[2])}</button>`).join('')}</div>
      <div class="ml-lb" style="margin-top:20px">${[1, 2, 3, 4, 5].map(b => `<div class="ml-lbx"><small>Box ${b} · ${['daily', '2 days', '4 days', 'weekly', '2 weeks'][b - 1]}</small><b>${bc[b]}</b></div>`).join('')}</div></div>`;
    // custom deck editor
    h += `<div class="card"><h3>My Own Cards (${m.cd.length}/60)</h3>
      <div class="ml-row2"><div class="field"><label for="ml-cf">Front (term or question)</label>${inp('cf', 'e.g. Diglossia', 80, 'id="ml-cf"')}</div><div class="field"><label for="ml-cb">Back (answer)</label>${inp('cb', 'e.g. Two varieties used for different social functions', 200, 'id="ml-cb" data-mlenter="ml-cadd"')}</div></div>
      <div class="row" style="margin-top:8px">${px('cadd', '➕ Add card', 'btn go', `id="ml-cadd" ${m.cd.length >= 60 ? 'disabled' : ''}`)}</div>
      <details class="fold" style="margin-top:10px"><summary>Paste Many Cards at Once</summary><div><p class="hint">One card per line: <b>front - back</b> (a dash or a colon between them).</p>${ta('cbulk', 'Acrolect - closest to Standard English\nBasilect: deepest Creole', 4000, 'aria-label="Cards to paste"')}<div class="row" style="margin-top:8px">${px('cbulk', 'Add these cards', 'btn gold')}</div></div></details>
      ${m.cd.length ? `<div class="ml-dl">${m.cd.map(c => `<div><span><b>${E(c[1])}</b>: ${E(c[2])}</span>${px('cdel', '✕', 'btn ghost', `data-k="${c[0]}" aria-label="Delete card ${E(c[1])}"`)}</div>`).join('')}</div>` : '<p class="hint">No cards yet. Add key terms, quotations or Caribbean examples.</p>'}</div>`;
    return h;
  }
  function fcStart(id) {
    const m = M(), lb = m.lb, t = today(), cards = deckCards(id);
    const due = shuf(cards.filter(c => lb[c.k] && lb[c.k][1] <= t)).sort((a, b) => lb[a.k][0] - lb[b.k][0]);
    const fresh = shuf(cards.filter(c => !lb[c.k]), rng(t * 7 + id.length * 131)).slice(0, 8);
    const q = due.slice(0, 20 - Math.min(8, fresh.length)).concat(fresh).slice(0, 20);
    T.fcDeck = id;
    T.fc = { deck: id, q, i: 0, on: false, got: 0, hard: 0, miss: 0, again: {} };
    if (!q.length) { T.fc = null; A.toast('Nothing due in this deck today. Come back tomorrow, or pick another deck.'); }
  }
  function fcSession() {
    const F = T.fc, d = DECKS.find(x => x[0] === F.deck);
    if (F.i >= F.q.length) {
      return `<div class="card"><span class="kicker">Session Complete</span><h2>${d[1]} ${E(d[2])}: Done for Today</h2>
        <div class="row"><span class="ml-stat">😀 Got it: <b>${F.got}</b></span><span class="ml-stat">😐 Hard: <b>${F.hard}</b></span><span class="ml-stat">😕 Forgot: <b>${F.miss}</b></span></div>
        <p>Cards you got right will come back in a few days; the ones you forgot come back tomorrow. That is spaced retrieval doing its job.</p>
        <div class="row">${px('fcend', 'Back to decks', 'btn go')}</div></div>`;
    }
    const c = F.q[F.i], rec = M().lb[c.k];
    return `<div class="card"><div class="row" style="justify-content:space-between"><span class="kicker">${d[1]} ${E(d[2])} · Card ${F.i + 1} of ${F.q.length}</span>${px('fcend', 'End session', 'btn ghost')}</div>
      <div class="pbar" aria-hidden="true" style="margin:10px 0"><i style="width:${Math.round(F.i / F.q.length * 100)}%"></i></div>
      <p class="hint" style="text-align:center">${rec ? `Box ${rec[0]}` : 'New card'}. Recall the answer first, then flip.</p>
      <button type="button" class="flip ml-card ${F.on ? 'on' : ''}" data-px="fcflip" data-pv="${VIEW}" aria-label="${F.on ? 'Card back. Press to see the front' : 'Card front: ' + E(c.f) + '. Press to flip'}"><span class="inner"><span class="face"><span class="ribbon">Term</span><b>${E(c.f)}</b><span class="hint">Tap or press Enter to flip</span></span><span class="face back"><span class="ribbon">Answer</span><p>${E(c.b)}</p></span></span></button>
      <div aria-live="polite">${F.on ? `<div class="ml-conf"><button type="button" class="btn ghost" data-px="fcrate" data-pv="${VIEW}" data-k="0">😕 Forgot</button><button type="button" class="btn gold" data-px="fcrate" data-pv="${VIEW}" data-k="1">😐 Hard</button><button type="button" class="btn go" data-px="fcrate" data-pv="${VIEW}" data-k="2">😀 Got it</button></div>` : `<div class="row" style="justify-content:center;margin-top:10px">${px('fcflip', '🔄 Flip card', 'btn gold')}</div>`}</div></div>`;
  }
  function fcRate(k) {
    const F = T.fc, m = M(), t = today(), c = F.q[F.i]; if (!c) return;
    const rec = m.lb[c.k] || [1, t];
    if (k === 0) { rec[0] = 1; rec[1] = t + 1; F.miss++; if (!F.again[c.k]) { F.again[c.k] = 1; F.q.push(c); } }
    else if (k === 1) { rec[1] = t + 1; F.hard++; }
    else { const nb = m.lb[c.k] ? Math.min(5, rec[0] + 1) : 2; rec[0] = nb; rec[1] = t + INT[nb]; F.got++; }
    m.lb[c.k] = rec; pruneLB();
    if (m.best.fcDay !== t) { m.best.fcDay = t; m.best.fcN = 0; }
    m.best.fcN = (m.best.fcN || 0) + 1;
    F.i++; F.on = false; save();
    if (F.i >= F.q.length && F.got > 0) A.reward(Math.min(6, 1 + Math.floor(F.got / 4)), 'Flashcard session');
  }

  /* ================= TAB 5: MEMORY GAMES ================= */
  const GAMES = [['seq', '⚡', 'Sequence Sprint', 'Memorise a growing list, then recall the order.'], ['chunk', '🧩', 'Chunk It', 'Beat a long string of digits or letters by chunking.'], ['story', '📖', 'Story Chain', 'Link 8 Comm Studies terms in a silly story, then recall.'], ['peg', '🪝', 'Peg Challenge', 'Hang 10 items on the rhyming pegs and recall by number.']];
  function termPool() {
    const G = gl(), set = new Set(); const out = [];
    ['m1', 'm2', 'm3'].forEach(k => G[k].forEach(c => { const f = c.f.replace(/\s*\(.*?\)\s*/g, ' ').trim(); if (f.length >= 4 && f.length <= 18 && f.split(/\s+/).length <= 2 && !/[\/]/.test(f) && !set.has(f.toLowerCase())) { set.add(f.toLowerCase()); out.push(f); } }));
    return out.length >= 30 ? out : GAMETERMS.slice();
  }
  function tabGames(loc) {
    const m = M(), b = m.best;
    if (!T.game && loc && loc.k && GAMES.some(g => g[0] === loc.k)) { T.game = { id: loc.k, ph: 'menu' }; }
    let h = `<div class="card"><span class="kicker">Play</span><h2>Memory Games</h2><p>Four quick games that train the techniques in this lab. Your best scores are saved on this device.</p>
      <div class="tiles">${GAMES.map(([id, ic, n, meta]) => `<button type="button" class="tile" data-px="gopen" data-pv="${VIEW}" data-k="${id}" aria-pressed="${T.game && T.game.id === id}"><span class="ticon" aria-hidden="true">${ic}</span><h3>${n}</h3><span class="meta">${meta}${b[id] != null ? ` · Best: ${b[id]}${id === 'chunk' ? ' characters' : id === 'seq' ? ' items' : id === 'story' ? '/8' : '/10'}` : ''}</span></button>`).join('')}</div></div>`;
    if (T.game) h += `<div class="card ml-pop" id="ml-game">${gameHTML()}</div>`;
    return h;
  }
  function gameHTML() {
    const G = T.game, b = M().best;
    if (G.id === 'seq') {
      if (G.ph === 'menu') return `<h3>⚡ Sequence Sprint</h3><p>A list appears for a few seconds. Memorise the order, then tap the items back in order. Each success adds one item. Tip: link them into a quick story, or chunk them in threes.</p>
        <div class="chips" role="group" aria-label="Item type">${[['terms', 'Comm Studies terms'], ['emoji', 'Caribbean emoji']].map(([k, n]) => `<button type="button" class="chip ${(G.mode || 'terms') === k ? 'sel' : ''}" data-px="seqmode" data-pv="${VIEW}" data-k="${k}" aria-pressed="${(G.mode || 'terms') === k}">${n}</button>`).join('')}</div>
        <div class="row" style="margin-top:10px">${px('seqgo', 'Start at 3 items', 'btn go')}</div>`;
      if (G.ph === 'show') return `<h3>⚡ Level ${G.n - 2}: Memorise ${G.n} Items</h3><p class="hint" aria-live="polite">Hiding in <b id="ml-cd">${G.left}</b> seconds…</p><div class="ml-seq">${G.items.map((t, i) => `<span><em aria-hidden="true">${i + 1}</em>${E(t)}</span>`).join('')}</div><div class="row" style="justify-content:center">${px('seqready', 'I\'m ready', 'btn go')}</div>`;
      if (G.ph === 'recall') {
        let h = `<h3>⚡ Level ${G.n - 2}: Recall the Order</h3>` + orcHTML(G.o, 'seq');
        if (G.o.checked) h += `<div class="row" style="margin-top:8px">${G.win ? px('seqnext', `Next level: ${G.n + 1} items →`, 'btn go') : px('seqgo', 'Start again at 3', 'btn go')}<span class="ml-stat">Best: <b>${b.seq || 0}</b> items</span></div>`;
        return h;
      }
    }
    if (G.id === 'chunk') {
      if (G.ph === 'menu') return `<h3>🧩 Chunk It</h3><p>A string appears for a short time. Chunk it in your head (in threes or fours, or by meaning), then type it back. Get it right and the next string is one character longer.</p>
        <div class="chips" role="group" aria-label="String type">${[['dig', 'Digits'], ['let', 'Letters'], ['acr', 'Course acronyms']].map(([k, n]) => `<button type="button" class="chip ${(G.mode || 'dig') === k ? 'sel' : ''}" data-px="chmode" data-pv="${VIEW}" data-k="${k}" aria-pressed="${(G.mode || 'dig') === k}">${n}</button>`).join('')}</div>
        <div class="row" style="margin-top:10px">${px('chgo', 'Start with 7 characters', 'btn go')}<label class="row" style="gap:6px;align-items:center"><input type="checkbox" data-px="chhelp" data-pv="${VIEW}" ${G.help ? 'checked' : ''}> Show it pre-chunked (easier)</label></div>`;
      if (G.ph === 'show') return `<h3>🧩 Memorise ${G.s.length} Characters</h3><p class="hint" aria-live="polite">Hiding in <b id="ml-cd">${G.left}</b> seconds…</p><p class="ml-digits">${E(G.help ? G.s.match(/.{1,3}/g).join(' ') : G.s)}</p><div class="row" style="justify-content:center">${px('chready', 'I\'m ready', 'btn go')}</div>`;
      if (G.ph === 'recall') return `<h3>🧩 Type the ${G.s.length} Characters</h3><label class="ml-sr" for="ml-chin">Your answer</label>${inp('chin', 'Type it (spaces are ignored)', 40, 'id="ml-chin" autocomplete="off" data-mlenter="ml-chok"')}<div class="row" style="margin-top:8px">${px('chcheck', 'Check', 'btn go', 'id="ml-chok"')}<span class="hint">Took ${G.secs || 0}s to memorise</span></div>`;
      if (G.ph === 'res') return `<h3>🧩 ${G.win ? 'Correct!' : 'Not This Time'}</h3><div class="fb ${G.win ? 'good' : 'bad'}">The string was <b>${E(G.s.match(/.{1,3}/g).join(' '))}</b>. You typed <b>${E(G.ans || '(nothing)')}</b>.</div><div class="row">${G.win ? px('chnext', `Next: ${G.s.length + 1} characters →`, 'btn go') : px('chgo', 'Restart at 7', 'btn go')}<span class="ml-stat">Best: <b>${b.chunk || 0}</b></span></div>`;
    }
    if (G.id === 'story') {
      if (G.ph === 'menu' || G.ph === 'write') {
        if (!G.words) G.words = shuf(termPool()).slice(0, 8);
        return `<h3>📖 Story Chain</h3><p>Link these 8 terms <b>in order</b> into one silly story. Each term should <i>do something</i> to the next. Writing it down is optional but helps.</p>
          <div class="ml-seq">${G.words.map((w, i) => `<span><em aria-hidden="true">${i + 1}</em>${E(w)}</span>`).join('')}</div>${ta('gstory', 'In Castries one morning, a …', 1500, 'aria-label="Your story"')}
          <div class="row" style="margin-top:8px">${px('stnew', 'New terms', 'btn ghost')}${px('sttest', 'Hide the terms and test me', 'btn go')}</div>`;
      }
      if (G.ph === 'recall') { let h = `<h3>📖 Recall Your Chain</h3>` + orcHTML(G.o, 'st'); if (G.o.checked) h += `<div class="row" style="margin-top:8px">${px('stnew', 'Play again', 'btn go')}<span class="ml-stat">Best: <b>${b.story || 0}</b>/8</span></div>`; return h; }
    }
    if (G.id === 'peg') {
      if (G.ph === 'menu' || G.ph === 'study') {
        if (!G.items) G.items = shuf(termPool()).slice(0, 10);
        return `<h3>🪝 Peg Challenge</h3><p>Hang each term on its peg with a quick image (e.g. 3-tree: a tree growing <i>${E(G.items[2])}</i> instead of leaves). Then you will be asked for pegs in random order.</p>
          <div class="ml-pegs">${PEGS.map((p, i) => `<div class="ml-peg"><em aria-hidden="true">${p[2]}</em><b>${p[0]}: ${p[1]}</b><span>${E(G.items[i])}</span></div>`).join('')}</div>
          <div class="row" style="margin-top:10px">${px('pgnew', 'New items', 'btn ghost')}${px('pgtest', 'Hide them and test me', 'btn go')}</div>`;
      }
      if (G.ph === 'quiz') {
        if (G.qi >= 10) return `<h3>🪝 You Recalled ${G.score}/10</h3><div class="fb ${G.score >= 8 ? 'good' : 'note'}">${G.score >= 8 ? 'Excellent peg work.' : 'Make each image more vivid: the peg and the term should interact.'}</div><div class="row">${px('pgnew', 'Play again', 'btn go')}<span class="ml-stat">Best: <b>${b.peg || 0}</b>/10</span></div>`;
        const pi = G.order[G.qi], p = PEGS[pi], ans = G.items[pi];
        const opts = G.opts || (G.opts = shuf([ans].concat(shuf(G.items.filter(x => x !== ans)).slice(0, 3))));
        return `<h3>🪝 Peg ${p[0]}: ${p[1]} ${p[2]}</h3><p class="hint">Question ${G.qi + 1} of 10 · Score ${G.score}</p><div class="opts">${opts.map(o => `<button type="button" class="opt ${G.pick != null ? (o === ans ? 'right' : o === G.pick ? 'wrong' : '') : ''}" data-px="pgpick" data-pv="${VIEW}" data-k="${E(o)}" ${G.pick != null ? 'disabled' : ''}>${E(o)}</button>`).join('')}</div>${G.pick != null ? `<div class="row" style="margin-top:8px">${px('pgnext', G.qi + 1 < 10 ? 'Next peg →' : 'See my score', 'btn go')}</div>` : ''}`;
      }
    }
    return '';
  }
  function countdown(secs, onEnd) {
    clearT(); const G = T.game; G.left = secs; G.t0 = Date.now(); const tok = G.tok = Math.random();
    const tick = () => {
      if (T.game !== G || G.tok !== tok || !A || A.S.loc.v !== VIEW) return;
      G.left--; const el = document.getElementById('ml-cd'); if (el) el.textContent = Math.max(0, G.left);
      if (G.left <= 0) { onEnd(); reRender(); return; }
      TMR = setTimeout(tick, 1000);
    };
    TMR = setTimeout(tick, 1000);
  }
  function seqStart(n) {
    const G = T.game; G.n = n; G.win = false;
    const pool = (G.mode === 'emoji') ? GAMEEMO : termPool();
    G.items = shuf(pool).slice(0, n); G.ph = 'show';
    countdown(Math.round(n * 1.6 + 1), () => seqRecall());
  }
  function seqRecall() { const G = T.game; clearT(); const pool = (G.mode === 'emoji') ? GAMEEMO : termPool(); G.o = orcNew(G.items, shuf(pool.filter(x => !G.items.includes(x))).slice(0, Math.min(4, Math.ceil(G.n / 2)))); G.ph = 'recall'; }
  function chStart(len) {
    const G = T.game; G.win = false; DR.chin = '';
    let s = '';
    if (G.mode === 'let') { const C = 'BCDFGHJKLMNPRSTVWXZ'; while (s.length < len) s += C[Math.floor(Math.random() * C.length)]; }
    else if (G.mode === 'acr') { const W = ['PEEL', 'SQ3R', 'CRAAP', 'SOAPSTONE', 'CXC', 'CAPE', 'TV', 'PIE', 'FAQ', 'URL']; while (s.length < len) s += W[Math.floor(Math.random() * W.length)]; s = s.slice(0, len); }
    else { while (s.length < len) s += Math.floor(Math.random() * 10); }
    G.s = s; G.ph = 'show';
    countdown(Math.max(4, Math.round(len * 0.75)), () => { G.secs = Math.round((Date.now() - G.t0) / 1000); G.ph = 'recall'; });
  }

  /* ================= TAB 6: EXAM MEMORY PLAN ================= */
  const TOPICS = {
    '1': ['M1: Expression, grammar & usage', 'M1: Modes & genres of writing and speech', 'M1: Organisational strategies', 'M1: Literary techniques', 'M1: Traditional & new media', 'M1: Data collection methods', 'M1: Comprehension & summary skills', 'M1: Evaluating sources (credibility, reliability, validity)', 'M1: Research design & ethics'],
    '2': ['M2: Defining language & its characteristics', 'M2: Types & varieties of language', 'M2: Features of English-based Creoles', 'M2: Creole speakers learning Standard English', 'M2: Language & Caribbean identity', 'M2: Roles of language', 'M2: Registers & dialects', 'M2: Technology, culture & communication'],
    '3': ['M3: The communication process & models', 'M3: Audience reception factors', 'M3: Deliberate techniques to influence audiences', 'M3: Verbal, paralinguistic & non-verbal communication', 'M3: Contexts of communication', 'M3: Barriers to communication', 'M3: Communication technologies', 'M3: Oral & written presentations'],
    'P': ['P3: Q1 Receiving information, media & sources', 'P3: Q2 Variety, register, message points & slogans', 'P3: Section B reflective or expository piece', 'P3: Section B justification, notes sheet & timing']
  };
  const MODES = [['1', 'Module 1'], ['2', 'Module 2'], ['3', 'Module 3'], ['P', 'Paper 3']];
  const ACTS = ['Blurt it: write everything you remember, then check your notes in a different colour', 'Flashcards in the Leitner trainer', 'Teach it aloud in 2 minutes (Feynman)', 'Draw a mind map from memory', 'Walk a mind palace for the key list', 'Answer one past-paper style question under time'];
  function planBuild(w, mods, mins) {
    const D = w * 7, topics = []; mods.split('').forEach(k => (TOPICS[k] || []).forEach(t => topics.push(t)));
    // interleave modules so each day mixes subjects
    const byMod = mods.split('').map(k => (TOPICS[k] || []).slice()); const mix = [];
    while (byMod.some(a => a.length)) byMod.forEach(a => { if (a.length) mix.push(a.shift()); });
    const cap = mins >= 45 ? 4 : mins >= 30 ? 3 : 2; // items per day
    const days = Array.from({ length: D }, () => []);
    const learnEnd = Math.max(1, Math.floor(D * 0.6));
    const per = Math.max(1, Math.ceil(mix.length / learnEnd));
    const offs = [1, 3, 7, 14];
    let ai = 0;
    mix.forEach((t, i) => {
      let d = Math.floor(i / per);
      while (d < D && days[d].length >= cap) d++;
      if (d >= D) return;
      days[d].push({ k: 'new', t, a: 'Learn and make cards or a palace' });
      offs.forEach(o => { let r = d + o; while (r < D && days[r].length >= cap + 1) r++; if (r < D - 1) days[r].push({ k: 'rev', t, a: ACTS[(ai++) % ACTS.length] }); });
    });
    // final days: mixed practice
    for (let d = Math.max(learnEnd, D - 3); d < D; d++) if (days[d].length < cap + 1) days[d].push({ k: 'mix', t: 'Mixed practice', a: d === D - 1 ? 'Light review only: flip your due flashcards, walk one palace, then sleep early' : 'Timed past-paper questions across your modules, then mark with the scheme' });
    return { D, days, n: topics.length };
  }
  function tabPlan() {
    const m = M(), pl = m.plan || {};
    const w = T.plan ? T.plan.w : (pl.w || 3), mods = T.plan ? T.plan.m : (pl.m || '123P'), mins = T.plan ? T.plan.min : (pl.min || 30);
    if (!T.plan) T.plan = { w, m: mods, min: mins };
    let h = `<div class="card"><span class="kicker">Planner</span><h2>Exam Memory Plan</h2><p>Build a 2 to 4 week spaced retrieval plan. Each topic is learned once, then recalled on Day +1, +3, +7 and +14, mixing modules so your brain practises switching, just like the exam.</p>
      <div class="field"><label>How long until the exam?</label><div class="chips" role="group" aria-label="Weeks">${[2, 3, 4].map(x => `<button type="button" class="chip ${w === x ? 'sel' : ''}" data-px="plw" data-pv="${VIEW}" data-k="${x}" aria-pressed="${w === x}">${x} weeks</button>`).join('')}</div></div>
      <div class="field"><label>What will you revise?</label><div class="chips" role="group" aria-label="Modules">${MODES.map(([k, n]) => `<button type="button" class="chip ${mods.includes(k) ? 'sel' : ''}" data-px="plm" data-pv="${VIEW}" data-k="${k}" aria-pressed="${mods.includes(k)}">${n}</button>`).join('')}</div></div>
      <div class="field"><label>Minutes per day</label><div class="chips" role="group" aria-label="Minutes per day">${[20, 30, 45].map(x => `<button type="button" class="chip ${mins === x ? 'sel' : ''}" data-px="plmin" data-pv="${VIEW}" data-k="${x}" aria-pressed="${mins === x}">${x} minutes</button>`).join('')}</div></div>
      <div class="row" style="margin-top:10px">${px('plgo', pl.w ? '🔄 Rebuild my plan' : '📅 Build my plan', 'btn go', mods ? '' : 'disabled')}${pl.w ? px('plprint', '🖨️ Print', 'btn ghost') : ''}</div></div>`;
    if (pl.w) {
      const P2 = planBuild(pl.w, pl.m, pl.min), done = pl.done || '';
      const nd = done.split('').filter(x => x === '1').length;
      h += `<div class="card" id="ml-plan"><h3>My ${pl.w}-Week Plan</h3><p class="hint">${P2.n} topics · ${pl.min} minutes a day · tick each day when you finish it. Day 1 is the day you start.</p>
        <div class="pbar" aria-label="${nd} of ${P2.D} days done"><i style="width:${Math.round(nd / P2.D * 100)}%"></i></div><p class="hint">${nd}/${P2.D} days done</p>
        <p class="ml-small"><span class="ml-tag new">Learn</span> first study · <span class="ml-tag rev">Recall</span> spaced retrieval · <span class="ml-tag mix">Mixed</span> exam practice</p>`;
      const firstOpen = Math.min(pl.w - 1, Math.floor(Math.max(0, Array.from({ length: P2.D }, (_, i) => done[i] === '1').indexOf(false)) / 7));
      for (let wk = 0; wk < pl.w; wk++) {
        const wd = Array.from({ length: 7 }, (_, j) => done[wk * 7 + j] === '1').filter(Boolean).length;
        h += `<details class="fold ml-week" ${wk === firstOpen || T.openWeeks && T.openWeeks[wk] ? 'open' : ''}><summary>Week ${wk + 1} · Days ${wk * 7 + 1}–${wk * 7 + 7} · ${wd}/7 Done</summary><div class="ml-plan">`;
        for (let d = wk * 7; d < wk * 7 + 7; d++) {
          const it = P2.days[d], on = done[d] === '1';
          h += `<div class="ml-day ${on ? 'done' : ''}"><h4><span>Day ${d + 1}</span>${px('plday', on ? '✅ Done' : '☐ Mark done', on ? 'btn go' : 'btn ghost', `data-i="${d}" aria-pressed="${on}" aria-label="Day ${d + 1} ${on ? 'done' : 'not done'}"`)}</h4>${it.length ? `<ul>${it.map(x => `<li><span class="ml-tag ${x.k}">${x.k === 'new' ? 'Learn' : x.k === 'rev' ? 'Recall' : 'Mixed'}</span><b>${E(x.t)}</b>: ${E(x.a)}</li>`).join('')}</ul>` : '<p class="hint" style="margin:0">Rest day, or clear your due flashcards.</p>'}</div>`;
        }
        h += `</div></details>`;
      }
      h += `</div>`;
    }
    const TIPS = [['💬', 'Quotations', 'Learn short, flexible quotations rather than long ones. Use the first-letter method: write only the first letter of each word ("T m i t m" for "The medium is the message", McLuhan) and recall from that. Link each quotation to a palace stop and to the topics it can support.'],
      ['🧱', 'Essay Structures', 'Memorise one skeleton: Introduction (define, thesis) → 3 PEEL paragraphs (Point, Evidence, Explanation, Link) → Conclusion. Your course marks module essays out of 25: Content 10, Organisation 7, Expression 8. Practise writing just the plan in 5 minutes.'],
      ['📘', 'Definitions', 'Use the 3-part formula: term + what it is + a Caribbean example. "Code-switching is moving between language varieties in one conversation, for example from Creole to Standard English when a teacher walks in." Put each definition on a flashcard.'],
      ['🌴', 'Examples', 'Build a small bank of Caribbean examples that fit many questions: a carnival advertisement, a radio call-in programme, a WhatsApp voice note, a parliamentary speech, a calypso. Store them in one palace so you can "walk" to one fast.'],
      ['🧘🏾', 'Under Exam Pressure', 'In the first two minutes, jot your key mnemonics (PEEL, registers, continuum) on your rough-work page. If your mind goes blank, breathe in for 4 and out for 6, twice, then walk your palace from the gate. Move on and come back: recall often returns.'],
      ['🌙', 'The Night Before', 'Light review only: due flashcards and one palace walk. Pack your materials, then sleep. A rested brain retrieves far better than an exhausted one.']];
    h += `<div class="card"><h3>Remembering Under Exam Pressure</h3><div class="ml-grid">${TIPS.map(([i, t, d]) => `<div class="ml-box"><span class="ml-ic" aria-hidden="true">${i}</span><h4>${t}</h4><p class="ml-small">${d}</p></div>`).join('')}</div><div class="row" style="margin-top:10px">${A.listenBtn('Listen')}</div>
      <p class="hint">Aim high: steady spaced practice over weeks is how students reach a Grade One.</p></div>`;
    return h;
  }

  /* ================= plugin ================= */
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: VIEW,
    title: 'Memory Lab',
    tile: { icon: '🏛️', meta: 'Mind palace and other memory formation skills and methods: guide, tips, activities, examples' },
    render(api, loc) {
      A = api; M();
      const tab = TABS.some(t => t[0] === (loc && loc.tab)) ? loc.tab : 'how';
      if (tab !== 'games') clearT();
      if (tab !== 'tools' && BEAT) { beat(false); if (T.tka.jingle) T.tka.jingle.playing = false; }
      let h = `<section class="hero"><span class="eyebrow">Study Skills · Memory Lab</span><h1>Build a Memory That Works in the Exam</h1>
        <p>How memory really works, the mind palace, a full mnemonic toolkit, spaced flashcards, games and an exam plan, all built around CAPE Communication Studies.</p>
        <div class="ml-hero-art" aria-hidden="true"><span>🏛️</span><span>🧠</span><span>🗂️</span><span>🥭</span></div></section>`;
      h += `<div class="chips tabs ml-tabs" role="tablist" aria-label="Memory Lab sections">${TABS.map(([k, n]) => `<button type="button" class="chip ${tab === k ? 'sel' : ''}" role="tab" aria-selected="${tab === k}" data-go="${VIEW}" data-tab="${k}">${n}</button>`).join('')}</div>`;
      const body = tab === 'how' ? tabHow() : tab === 'palace' ? tabPalace() : tab === 'tools' ? tabTools() : tab === 'cards' ? tabCards() : tab === 'games' ? tabGames(loc) : tabPlan();
      return h + `<div role="tabpanel" aria-label="${E(TABS.find(t => t[0] === tab)[1].replace(/^\S+\s/, ''))}">${body}</div>`;
    },
    mount(api, loc, stage) {
      A = api;
      if (T.focus) { const el = document.getElementById(T.focus); T.focus = null; if (el) { try { el.focus({ preventScroll: false }); } catch (e) { el.focus(); } } }
      if (T.scroll) { const el = document.getElementById(T.scroll); T.scroll = null; if (el && el.scrollIntoView) { try { el.scrollIntoView({ behavior: RM() ? 'auto' : 'smooth', block: 'start' }); } catch (e) { } } }
    },
    click(a, el, api) {
      A = api; const m = M(), d = el.dataset, R = () => api.render();
      /* --- how --- */
      if (a === 'curve') { CURVE_SPACED = !CURVE_SPACED; return R(); }
      if (a === 'qpick') { const Q = T.quiz; if (Q.pick != null) return; Q.pick = +d.i; if (Q.pick === QUIZ[Q.i].a) { Q.score++; api.chime('good'); } else api.chime('bad'); return R(); }
      if (a === 'qnext') { const Q = T.quiz; Q.i++; Q.pick = null; if (Q.i >= QUIZ.length && Q.score >= 4 && !Q.paid) { Q.paid = 1; api.reward(3, 'Memory science check'); } return R(); }
      if (a === 'qagain') { T.quiz = null; return R(); }
      /* --- palace builder --- */
      if (a === 'pick') {
        const B = T.pb || (T.pb = { sel: [], step: 'pick' }); if (B.step !== 'pick') return;
        const i = B.sel.indexOf(d.id); if (i >= 0) B.sel.splice(i, 1); else if (B.sel.length < 10) B.sel.push(d.id); else api.toast('Ten stops is the maximum for one palace.');
        return R();
      }
      if (a === 'pbquick') { T.pb.sel = ['gate', 'gallery', 'door', 'living', 'kitchen', 'mango', 'line']; return R(); }
      if (a === 'pbclear') { T.pb.sel = []; return R(); }
      if (a === 'pbnext') { if (T.pb.sel.length < 5) return api.toast('Choose at least 5 locations.'); T.pb.step = 'fill'; T.scroll = 'ml-builder'; return R(); }
      if (a === 'pbback') { T.pb.step = 'pick'; return R(); }
      if (a === 'pbfill') {
        const src = d.k === 'reg' ? READY[1].r.slice(0, 5) : WORKED;
        T.pb.sel.forEach((_, i) => { const s = src[i]; if (!s) return; DR['pi' + i] = s[1]; DR['pc' + i] = s[2].slice(0, 90); DR['pe' + i] = s[3]; });
        if (!DR.pname) DR.pname = d.k === 'reg' ? 'The Five Registers' : 'Characteristics of Language';
        return R();
      }
      if (a === 'pbsave') {
        const B = T.pb; if (m.p.length >= 5) return api.toast('You can keep 5 palaces. Delete one first.');
        const r = B.sel.map((id, i) => [id, clip(DR['pi' + i], 60), clip(DR['pc' + i], 90), clip(DR['pe' + i] || EMO[i % EMO.length], 4)]);
        const miss = r.findIndex(x => !x[1]); if (miss >= 0) { api.toast(`Add an item for stop ${miss + 1}.`); T.focus = 'ml-it' + miss; return R(); }
        r.forEach(x => { if (!x[2]) x[2] = 'Picture it big, bright and moving at this spot.'; });
        m.p.push({ n: clip(DR.pname, 40) || 'My palace ' + (m.p.length + 1), r }); save();
        B.sel.forEach((_, i) => { delete DR['pi' + i]; delete DR['pc' + i]; delete DR['pe' + i]; }); delete DR.pname;
        T.pb = { sel: [], step: 'pick' };
        api.reward(3, 'Palace built');
        T.view = { src: 'u', id: String(m.p.length - 1), mode: 'study' }; return R();
      }
      if (a === 'pdel') { const i = +d.id, p = m.p[i]; if (!p) return; m.p.splice(i, 1); Object.keys(m.best).filter(k => /^wu\d+$/.test(k)).forEach(k => delete m.best[k]); save(); api.toast('Deleted "' + p.n + '"'); return R(); }
      if (a === 'study') { T.view = { src: d.src, id: d.id, mode: 'study' }; T.scroll = 'stage'; R(); try { window.scrollTo({ top: 0 }); } catch (e) { } return; }
      if (a === 'hideitems') { T.view.hide = !T.view.hide; return R(); }
      if (a === 'walk' || a === 'walkready') {
        const src = a === 'walkready' ? 'w' : d.src, id = a === 'walkready' ? 'w' : d.id;
        T.view = { src, id, mode: 'walk', i: 0, res: [], ans: [] }; DR.wans = ''; T.focus = 'ml-wans'; R(); try { window.scrollTo({ top: 0 }); } catch (e) { } return;
      }
      if (a === 'whint') { T.view.hint = 1; return R(); }
      if (a === 'wcheck' || a === 'wreveal') {
        const V = T.view, p = getPalace(V.src, V.id), s = p.r[V.i]; if (V.res.length > V.i) return;
        const ans = clip(DR.wans, 80); if (a === 'wcheck' && !ans) { api.toast('Type what you placed here, or press Reveal.'); return; }
        const ok = a === 'wcheck' && close(ans, s[1]);
        V.res[V.i] = ok; V.ans[V.i] = a === 'wcheck' ? ans : ''; api.chime(ok ? 'good' : 'bad'); return R();
      }
      if (a === 'wnext') {
        const V = T.view, p = getPalace(V.src, V.id); V.i++; V.hint = 0; DR.wans = '';
        if (V.i >= p.r.length) { const sc = V.res.filter(Boolean).length, prev = m.best[p.key]; if (prev == null || sc > prev) m.best[p.key] = sc; save(); if (sc >= Math.ceil(p.r.length * 0.8)) api.reward(sc === p.r.length ? 5 : 3, 'Palace walk-through'); }
        else T.focus = 'ml-wans';
        return R();
      }
      if (a === 'pvback') { T.view = null; return R(); }
      /* --- toolkit --- */
      if (a === 'tk') { T.tk = +d.i; T.scroll = 'ml-tool'; return R(); }
      if (a === 'tgo') { if (d.tab === 'games' && d.k) T.game = { id: d.k, ph: 'menu' }; api.go({ v: VIEW, tab: d.tab }); return; }
      const ts = id => T.tka[id] || (T.tka[id] = {});
      if (a === 'acrolist') { const S = ts('acro'); S.list = d.k; S.res = null; DR.acro = ''; return R(); }
      if (a === 'acrochk') {
        const S = ts('acro'), items = ACRO_LISTS[S.list || 'reg'], words = String(DR.acro || '').trim().split(/\s+/).filter(Boolean);
        const init = items.map(x => x[0].toUpperCase()), got = words.map(w => (w.replace(/[^A-Za-z0-9]/g, '')[0] || '').toUpperCase());
        const ok = words.length === init.length && init.every((c, i) => c === got[i]);
        S.res = { ok, msg: ok ? `<b>It fits!</b> ${words.map((w, i) => `<b>${E(w)}</b> = ${E(items[i])}`).join(' · ')}. Silly and vivid sentences stick best.` : `<b>Not yet.</b> You need ${init.length} words starting ${init.join(', ')}. You have ${words.length} word${words.length === 1 ? '' : 's'}${words.length ? ' starting ' + got.join(', ') : ''}.` };
        if (ok && !S.paid) { S.paid = 1; api.reward(2, 'Acrostic made'); }
        return R();
      }
      if (a === 'chunkchk') {
        const S = ts('chunk'), v = String(DR.chunk || '').toUpperCase().trim(), parts = v.split(/\s+/).filter(Boolean);
        const same = parts.join('') === 'PEELSQ3RCRAAP2156020';
        const ideal = parts.slice(0, 3).join(' ') === 'PEEL SQ3R CRAAP';
        S.res = { ok: same && parts.length >= 4, msg: !same ? 'Keep every character in the same order: only add spaces.' : parts.length < 4 ? 'Split it into more chunks: aim for 4 to 6.' : ideal ? `<b>Meaningful chunks!</b> ${parts.map(E).join(' | ')}: 20 loose characters became ${parts.length} chunks your working memory can hold.` : `<b>${parts.length} chunks.</b> Can you make them meaningful? Look for PEEL, SQ3R and CRAAP, then 2-15 (time), 60 (marks), 20 (per cent).` };
        return R();
      }
      if (a === 'jtopic') { ts('jingle').topic = d.k; ts('jingle').res = null; return R(); }
      if (a === 'beat') { const S = ts('jingle'); S.playing = !S.playing && beat(true); if (!S.playing) beat(false); if (!S.playing && A.S.sound === false) api.toast('Sounds are off. Turn them on in your profile to hear the beat.'); return R(); }
      if (a === 'jchk') {
        const S = ts('jingle'), lines = String(DR.jingle || '').split('\n').map(x => x.trim()).filter(Boolean);
        const end = l => (l.toLowerCase().replace(/[^a-z ]/g, '').trim().split(' ').pop() || '');
        const rh = (x, y) => x && y && x !== y && (x.slice(-3) === y.slice(-3) || x.slice(-2) === y.slice(-2));
        const r24 = lines.length >= 4 && rh(end(lines[1]), end(lines[3]));
        const ok = lines.length >= 4;
        S.res = { ok: ok && r24, msg: !ok ? `You have ${lines.length} line${lines.length === 1 ? '' : 's'}. Write 4 lines, one per line.` : `<b>${lines.length} lines.</b> ${r24 ? 'Lines 2 and 4 rhyme. ' : 'Lines 2 and 4 do not seem to rhyme yet: try the rhyme ideas. '}Now perform it aloud three times with the beat, then try to say it tomorrow without looking.` };
        if (ok && r24 && !S.paid) { S.paid = 1; api.reward(3, 'Jingle written'); }
        return R();
      }
      if (a === 'lnew') { T.tka.story = {}; DR.lstory = ''; return R(); }
      if (a === 'ltest') { const S = ts('story'); S.o = orcNew(S.words, shuf(GAMETERMS.filter(x => !S.words.includes(x))).slice(0, 3)); return R(); }
      if (/^l(pick|undo|check)$/.test(a)) { const S = ts('story'), r = orcClick(S.o, a.slice(1), el); if (a === 'lcheck' && r === S.o.target.length) api.reward(2, 'Story link'); return R(); }
      if (a === 'pegq') { const S = ts('peg'); if (S.pick != null) return; S.pick = d.k; if (d.k === PEGS[S.order[S.i || 0]][1]) S.score = (S.score || 0) + 1; return R(); }
      if (a === 'pegnext') { const S = ts('peg'); S.i = (S.i || 0) + 1; S.pick = null; S.opts = null; return R(); }
      if (a === 'pegreset') { T.tka.peg = {}; return R(); }
      if (a === 'keyshow') { const S = ts('key'); S.show = !S.show; return R(); }
      if (a === 'keynext') { const S = ts('key'); S.i = ((S.i || 0) + 1) % KEYQ.length; S.show = false; return R(); }
      if (a === 'visb') { const S = ts('vis'); S.b = S.b || {}; S.b[d.k] = !S.b[d.k]; return R(); }
      if (a === 'vischk') {
        const S = ts('vis'), n = Object.values(S.b || {}).filter(Boolean).length, w = wc(DR.vis);
        S.res = { ok: n >= 3 && w >= 12, msg: w < 12 ? 'Write a fuller image: at least 12 words, so you can really see it.' : n >= 4 ? `<b>Powerful image: ${n} boosters.</b> That will be hard to forget.` : n >= 3 ? `<b>Good: ${n} boosters.</b> Add one more, such as sound or yourself in the scene.` : `<b>${n} booster${n === 1 ? '' : 's'}.</b> Make it bigger, louder, funnier or put yourself in it.` };
        if (S.res.ok && !S.paid) { S.paid = 1; api.reward(2, 'Vivid image'); }
        return R();
      }
      if (a === 'majq') { const S = ts('major'); if (S.pick != null) return; S.pick = d.k; if (d.k === MAJOR_Q[S.i || 0][1]) S.score = (S.score || 0) + 1; return R(); }
      if (a === 'majnext') { const S = ts('major'); S.i = (S.i || 0) + 1; S.pick = null; return R(); }
      if (a === 'majreset') { T.tka.major = {}; return R(); }
      if (a === 'mmdraw') return R();
      if (a === 'dualp') { const S = ts('dual'); S.p = S.p || {}; S.p[d.i] = d.k; if (Object.keys(S.p).length === DUAL_TERMS.length && !S.paid) { S.paid = 1; api.reward(2, 'Dual coding set'); } return R(); }
      if (a === 'feynchk') {
        const S = ts('feyn'), txt = String(DR.feyn || ''), w = wc(txt);
        const sents = txt.split(/[.!?]+/).map(x => x.trim()).filter(Boolean), avg = sents.length ? Math.round(w / sents.length) : 0;
        const longw = (txt.match(/\b[a-zA-Z]{12,}\b/g) || []).filter((x, i, arr) => arr.indexOf(x) === i);
        const jar = ['diglossia', 'linguistic', 'sociolinguistic', 'variety', 'interlocutor', 'register', 'lexicon', 'phonology', 'syntax'].filter(j => new RegExp('\\b' + j, 'i').test(txt));
        const ex = /for example|e\.g\.|like when|such as|for instance/i.test(txt);
        const ok = w >= 40 && w <= 140 && avg <= 22 && ex;
        S.res = { ok, msg: `<b>${w} words · ${sents.length} sentence${sents.length === 1 ? '' : 's'} · about ${avg} words per sentence.</b> ${w < 40 ? 'Add more: explain it fully. ' : w > 140 ? 'Trim it: a Form 1 student needs it short. ' : ''}${avg > 22 ? 'Shorten your sentences. ' : ''}${ex ? 'You used an example. ' : 'Add a real example ("for example…"). '}${longw.length || jar.length ? 'Check these words a Form 1 student may not know: ' + E(longw.concat(jar).slice(0, 6).join(', ')) + '.' : 'No heavy jargon spotted.'}${ok ? ' Clear explanation: you understand it.' : ''}` };
        if (ok && !S.paid) { S.paid = 1; api.reward(3, 'Feynman explanation'); }
        return R();
      }
      if (a === 'whyshow') { const S = ts('why'); S.show = !S.show; return R(); }
      if (a === 'whynext') { const S = ts('why'); S.i = ((S.i || 0) + 1) % WHYQ.length; S.show = false; return R(); }
      /* --- flashcards --- */
      if (a === 'fcstart') { fcStart(d.k); T.scroll = 'stage'; R(); try { window.scrollTo({ top: 0 }); } catch (e) { } return; }
      if (a === 'fcdeck') { T.fcDeck = d.k; return R(); }
      if (a === 'fcflip') { if (!T.fc) return; T.fc.on = !T.fc.on; R(); const b = document.querySelector('.ml-card'); if (b) b.focus(); return; }
      if (a === 'fcrate') { fcRate(+d.k); R(); const b = document.querySelector('.ml-card'); if (b) b.focus(); return; }
      if (a === 'fcend') { T.fc = null; return R(); }
      if (a === 'cadd') {
        const f = clip(DR.cf, 80), b = clip(DR.cb, 200); if (!f || !b) { api.toast('Fill in both sides of the card.'); return; }
        if (m.cd.length >= 60) { api.toast('Your deck is full (60 cards).'); return; }
        m.cd.push([m.cid++, f, b]); DR.cf = ''; DR.cb = ''; save(); T.focus = 'ml-cf'; api.toast('Card added'); return R();
      }
      if (a === 'cbulk') {
        const lines = String(DR.cbulk || '').split('\n'); let n = 0;
        lines.forEach(l => { const mm = l.match(/^\s*(.+?)\s*(?:\s[-–—]\s|:|\t)\s*(.+)$/); if (mm && m.cd.length < 60) { m.cd.push([m.cid++, clip(mm[1], 80), clip(mm[2], 200)]); n++; } });
        if (n) { DR.cbulk = ''; save(); } api.toast(n ? `${n} card${n === 1 ? '' : 's'} added${m.cd.length >= 60 ? ' (deck full)' : ''}` : 'No cards found. Use "front - back" on each line.'); return R();
      }
      if (a === 'cdel') { const id = +d.k; m.cd = m.cd.filter(c => c[0] !== id); delete m.lb['c' + id]; save(); return R(); }
      /* --- games --- */
      if (a === 'gopen') { clearT(); T.game = { id: d.k, ph: 'menu' }; T.scroll = 'ml-game'; return R(); }
      if (a === 'seqmode') { T.game.mode = d.k; return R(); }
      if (a === 'seqgo') { seqStart(3); return R(); }
      if (a === 'seqready') { seqRecall(); return R(); }
      if (a === 'seqnext') { seqStart(T.game.n + 1); return R(); }
      if (/^seq(pick|undo|check)$/.test(a)) {
        const G = T.game, r = orcClick(G.o, a.slice(3), el);
        if (a === 'seqcheck') { G.win = r === G.n; if (G.win) { if ((m.best.seq || 0) < G.n) { m.best.seq = G.n; save(); } if (G.n >= 5) api.reward(Math.min(5, G.n - 4), 'Sequence Sprint'); else api.chime('good'); } else api.chime('bad'); }
        return R();
      }
      if (a === 'chmode') { T.game.mode = d.k; return R(); }
      if (a === 'chhelp') { T.game.help = el.checked; return; }
      if (a === 'chgo') { chStart(7); return R(); }
      if (a === 'chnext') { chStart(T.game.s.length + 1); return R(); }
      if (a === 'chready') { const G = T.game; clearT(); G.secs = Math.round((Date.now() - G.t0) / 1000); G.ph = 'recall'; T.focus = 'ml-chin'; return R(); }
      if (a === 'chcheck') {
        const G = T.game, ans = String(DR.chin || '').toUpperCase().replace(/\s+/g, ''); G.ans = ans; G.win = ans === G.s.toUpperCase(); G.ph = 'res';
        if (G.win) { if (!G.help && (m.best.chunk || 0) < G.s.length) { m.best.chunk = G.s.length; save(); } if (G.s.length >= 9) api.reward(Math.min(5, G.s.length - 8), 'Chunk It'); else api.chime('good'); } else api.chime('bad');
        return R();
      }
      if (a === 'stnew') { T.game = { id: 'story', ph: 'write' }; DR.gstory = ''; return R(); }
      if (a === 'sttest') { const G = T.game; G.o = orcNew(G.words, shuf(termPool().filter(x => !G.words.includes(x))).slice(0, 4)); G.ph = 'recall'; return R(); }
      if (/^st(pick|undo|check)$/.test(a)) {
        const G = T.game, r = orcClick(G.o, a.slice(2), el);
        if (a === 'stcheck') { if ((m.best.story || 0) < r) { m.best.story = r; save(); } if (r >= 6) api.reward(r === 8 ? 4 : 2, 'Story Chain'); else api.chime(r >= 4 ? 'good' : 'bad'); }
        return R();
      }
      if (a === 'pgnew') { T.game = { id: 'peg', ph: 'study' }; return R(); }
      if (a === 'pgtest') { const G = T.game; G.ph = 'quiz'; G.order = shuf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); G.qi = 0; G.score = 0; G.pick = null; G.opts = null; return R(); }
      if (a === 'pgpick') { const G = T.game; if (G.pick != null) return; G.pick = d.k; const ok = d.k === G.items[G.order[G.qi]]; if (ok) G.score++; api.chime(ok ? 'good' : 'bad'); return R(); }
      if (a === 'pgnext') {
        const G = T.game; G.qi++; G.pick = null; G.opts = null;
        if (G.qi >= 10) { if ((m.best.peg || 0) < G.score) { m.best.peg = G.score; save(); } if (G.score >= 7) api.reward(G.score === 10 ? 5 : 3, 'Peg Challenge'); }
        return R();
      }
      /* --- plan --- */
      if (a === 'plw') { T.plan.w = +d.k; return R(); }
      if (a === 'plmin') { T.plan.min = +d.k; return R(); }
      if (a === 'plm') { const k = d.k, cur = T.plan.m; T.plan.m = cur.includes(k) ? cur.replace(k, '') : MODES.map(x => x[0]).filter(x => cur.includes(x) || x === k).join(''); return R(); }
      if (a === 'plgo') {
        if (!T.plan.m) return api.toast('Choose at least one module.'); T.openWeeks = null;
        const old = m.plan || {}; const same = old.w === T.plan.w && old.m === T.plan.m && old.min === T.plan.min;
        m.plan = { w: T.plan.w, m: T.plan.m, min: T.plan.min, done: same ? (old.done || '') : '' }; save();
        if (!old.w) api.reward(3, 'Exam memory plan'); else api.toast('Plan rebuilt');
        T.scroll = 'ml-plan'; return R();
      }
      if (a === 'plday') {
        const pl = m.plan; if (!pl) return; const D = pl.w * 7, i = +d.i; const arr = (pl.done || '').padEnd(D, '0').slice(0, D).split('');
        arr[i] = arr[i] === '1' ? '0' : '1'; pl.done = arr.join('').replace(/0+$/, ''); save();
        if (arr[i] === '1') { api.chime('good'); if (arr.filter(x => x === '1').length % 7 === 0) api.reward(3, 'Plan week complete'); }
        return R();
      }
      if (a === 'plprint') { try { window.print(); } catch (e) { } return; }
    }
  });
})();
