/* Sample Essays: Grade One exemplars in an accordion, grouped Module 1 · Module 2 · Module 3 · Paper 3.
   Data: content/samples.js → window.COURSE_SAMPLES = { m1:[], m2:[], m3:{expository:[],argumentative:[],persuasive:[],narrative:[]}, p3:{reflective:[],expository:[]} }
   Annotation markup inside essays: {{n|highlighted text}} → highlighted span + numbered badge. View id: genres. */
(function () {
  const CSS = `
.sx-acc{border:2px solid var(--line);border-radius:16px;background:var(--surface);margin:0 0 12px;overflow:hidden}
.sx-acc[open]{border-color:var(--gold)}
.sx-acc>summary{display:flex;gap:12px;align-items:center;padding:14px 16px;cursor:pointer;list-style:none}
.sx-acc>summary::-webkit-details-marker{display:none}
.sx-acc>summary:hover{background:color-mix(in srgb,var(--gold) 8%,transparent)}
.sx-acc>summary:focus-visible{outline:3px solid var(--gold);outline-offset:-3px}
.sx-acc>summary .t{flex:1;min-width:0}
.sx-acc>summary .m{font-size:.82rem;color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap}
.sx-chev{transition:transform .2s;font-size:1.1rem}.sx-acc[open]>summary .sx-chev{transform:rotate(180deg)}
.sx-sec>summary{padding:16px 18px}.sx-sec>summary .t b{font-size:1.15rem}
.sx-ico{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:color-mix(in srgb,var(--gold) 16%,transparent);font-size:1.3rem}
.sx-body{padding:4px 18px 18px;border-top:1.5px solid var(--line)}
.sx-sub{background:var(--raise)}.sx-item{background:var(--raise);border-radius:12px}
.sx-item>summary{padding:11px 14px}
.sx-tag{display:inline-block;font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;border:1.5px solid currentColor;border-radius:999px;padding:1px 9px;margin:4px 6px 0 0;opacity:.85}
.sx-score{display:inline-flex;align-items:baseline;gap:4px;font-weight:800;font-size:1.5rem;color:var(--gold)}
.sx-score small{font-size:.85rem;color:var(--ink);opacity:.75;font-weight:600}
.gn-ex{background:var(--surface);border:1.5px solid var(--line);border-radius:14px;padding:16px 20px;max-width:75ch;line-height:1.75}
.gn-ex h4.gn-title{margin:0 0 10px;text-align:center}
.gn-ex p{margin:0 0 12px}.gn-ex p:last-child{margin-bottom:0}
.gn-ex .xa{background:color-mix(in srgb,var(--gold) 18%,transparent);border-radius:4px;padding:0 2px}
.gn-ex .xn{display:inline-grid;place-items:center;min-width:20px;height:20px;border-radius:50%;background:var(--gold);color:#1a1300;font-size:.72rem;font-weight:800;margin:0 3px;vertical-align:2px;padding:0 4px}
.gn-plain .xa{background:none;padding:0}.gn-plain .xn{display:none}
.gn-notes{counter-reset:gn;list-style:none;padding:0;margin:8px 0 0;display:grid;gap:6px}
.gn-notes li{counter-increment:gn;display:flex;gap:10px;align-items:flex-start}
.gn-notes li::before{content:counter(gn);flex:none;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--gold);color:#1a1300;font-weight:800;font-size:.75rem;margin-top:2px}
.gn-tbl{width:100%;border-collapse:collapse}.gn-tbl td,.gn-tbl th{padding:7px 8px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
.gn-tbl td.n{white-space:nowrap;font-weight:800;text-align:right}
.gn-feat{list-style:none;padding:0;margin:6px 0 0;display:grid;gap:6px}
.gn-feat li{display:flex;gap:8px;align-items:flex-start}.gn-feat li::before{content:'✓';font-weight:800;color:var(--ok);flex:none}
.gn-pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px}
.gn-pair>div{border-radius:12px;padding:12px 14px;border:1.5px solid var(--line);line-height:1.6}
.gn-pair .weak{border-style:dashed}.gn-pair .strong{border-color:var(--ok)}
.gn-pair b.lab{display:block;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px}
.sx-stim{margin:10px 0}.sx-stim .passage{max-width:75ch;line-height:1.7}
.sx-stim .passage p{margin:0 0 10px}.sx-stim .passage p:last-child{margin-bottom:0}
.sx-part{margin-top:18px;padding-top:12px;border-top:1.5px dashed var(--line)}
@media (max-width:640px){.gn-pair{grid-template-columns:1fr}.sx-sub>.sx-body,.sx-item>.sx-body{padding:4px 8px 12px}.sx-stim .passage{padding:10px 12px}.gn-ex{padding:12px}.sx-body{padding:4px 12px 14px}.sx-acc>summary .m{display:none}}
@media (prefers-reduced-motion:reduce){.sx-chev{transition:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  const mark = s => s.replace(/\{\{(\d+)\|([\s\S]*?)\}\}/g, '<span class="xa">$2</span><span class="xn">$1</span>');
  const plain = s => s.replace(/\{\{\d+\|([\s\S]*?)\}\}/g, '$1').replace(/<[^>]+>/g, ' ');
  const words = arr => arr.map(plain).join(' ').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
  const sum = b => b.reduce((a, x) => a + x.got, 0), outOf = b => b.reduce((a, x) => a + x.of, 0);
  const D = () => window.COURSE_SAMPLES || { m1: [], m2: [], m3: {}, p3: {} };

  const GENRES = [
    { id: 'expository', icon: '📘', name: 'Expository',
      purpose: 'To explain, inform or clarify a topic objectively, so the reader understands it.',
      features: ['A clear thesis that previews the points to be explained, not an opinion to be defended.', 'Third person and an objective, neutral tone: no "I think" and no emotional appeals.', 'One point per body paragraph, built with PEEL (Point, Evidence, Explain, Link).', 'Facts, examples and cause-and-effect explanations as support.', 'Transitions of sequence and consequence (First, Second, As a result, Finally).', 'A conclusion that summarises the points without adding new information.'] },
    { id: 'argumentative', icon: '⚖️', name: 'Argumentative',
      purpose: 'To defend a clear position with logical reasoning and evidence while dealing fairly with the opposing view.',
      features: ['A thesis that takes a clear, complete position and previews the reasons.', 'Reasons supported by logic and evidence (logos) more than emotion.', 'A counter-argument stated fairly ("Critics argue that...") and then rebutted ("however...").', 'A measured, formal tone: confident but never aggressive.', 'PEEL body paragraphs linked by transitions of addition and contrast (Moreover, However).', 'A conclusion that restates the position in fresh words.'] },
    { id: 'persuasive', icon: '📣', name: 'Persuasive',
      purpose: 'To move a specific audience to believe something or to take action.',
      features: ['A clearly identified audience addressed directly ("you", "we", "fellow students").', 'A deliberate blend of appeals: ethos (credibility), pathos (emotion), logos (logic) and kairos (timeliness).', 'Rhetorical devices: rhetorical questions, triads (rule of three), repetition and vivid imagery.', 'An objection anticipated and answered quickly.', 'A specific, achievable call to action.', 'A memorable closing line that echoes the opening.'] },
    { id: 'narrative', icon: '📖', name: 'Narrative',
      purpose: 'To tell a story that engages the reader and conveys an insight or lesson.',
      features: ['Clear story structure: orientation, complication, climax, resolution and reflection.', 'A consistent point of view (usually first person) and past tense.', 'Show, don\'t tell: sensory details and actions reveal feelings.', 'Dialogue that reveals character; Creole may appear in dialogue for authenticity while the narration stays in Standard English.', 'Varied pacing: short sentences for tension, longer ones for description.', 'A closing reflection that makes the theme clear without preaching.'] }
  ];
  const P3G = [
    { id: 'reflective', icon: '🪞', name: 'Reflective pieces',
      purpose: 'To look back on a real or imagined experience, examine thoughts and feelings, and share a change in understanding with the audience.',
      features: ['First person, built around one specific remembered experience.', 'Thoughts and feelings examined, not just events reported.', 'A clear shift in understanding by the end.', 'A form that suits the audience: personal essay, memoir extract, journal entry or blog post.', 'At least one deliberate rhetorical appeal, usually pathos supported by ethos.'] },
    { id: 'expository', icon: '📘', name: 'Expository pieces',
      purpose: 'To explain and inform the audience about the topic clearly and engagingly.',
      features: ['A form that suits the audience: feature article, explanatory guide, newsletter column or radio talk.', 'Clear, accurate information organised under a logical structure; subheadings where the form allows.', 'Direct, practical relevance to the stated audience.', 'An engaging opening and a purposeful close (a summary or a clear next step).', 'At least one deliberate rhetorical appeal, usually logos supported by ethos.'] }
  ];
  const COMPARE = [
    ['Purpose', 'Explain or inform', 'Prove a position with logic', 'Move an audience to act', 'Tell a story with an insight'],
    ['Point of view', 'Third person', 'Mainly third person', 'First and second person ("we", "you")', 'Usually first person'],
    ['Tone', 'Objective, neutral', 'Measured, formal, confident', 'Passionate, direct, urgent', 'Engaging, reflective'],
    ['Main support', 'Facts, examples, cause and effect', 'Evidence, reasoning, rebuttal', 'Ethos, pathos, logos, kairos', 'Sensory detail, dialogue, action'],
    ['Structure', 'Thesis → PEEL points → summary', 'Thesis → reasons → counter-argument and rebuttal → conclusion', 'Hook → purpose → appeals → objection → call to action', 'Orientation → complication → climax → resolution → reflection'],
    ['Signal words', 'First, as a result, consequently', 'Moreover, critics argue, however, therefore', 'Imagine, together, starting today', 'Suddenly, instead, that evening']
  ];

  const OPEN = {}, SHOW = {};
  document.addEventListener('toggle', ev => { const d = ev.target; if (d && d.dataset && d.dataset.sacc) OPEN[d.dataset.sacc] = d.open; }, true);
  document.addEventListener('click', ev => {
    const b = ev.target.closest && ev.target.closest('[data-sacc-all]'); if (!b) return;
    const on = b.dataset.on === '1'; document.querySelectorAll('details.sx-sec').forEach(d => { d.open = on; OPEN[d.dataset.sacc] = on; });
  });
  const acc = (key, cls, sumHTML, body, def) => `<details class="sx-acc ${cls}" data-sacc="${key}"${(OPEN[key] != null ? OPEN[key] : def) ? ' open' : ''}><summary data-notc>${sumHTML}<span class="sx-chev" aria-hidden="true">▾</span></summary><div class="sx-body">${body}</div></details>`;

  function marksTable(esc, b, label) {
    return `<h4 style="margin-top:14px" data-notc>${label || 'How the marks were earned'}</h4><div class="tablewrap"><table class="gn-tbl"><thead><tr><th>Criterion</th><th>Why</th><th>Marks</th></tr></thead><tbody>${b.map(x => `<tr><td><b>${esc(x.part)}</b></td><td>${esc(x.why)}</td><td class="n">${x.got} / ${x.of}</td></tr>`).join('')}<tr><td><b>Total</b></td><td></td><td class="n">${sum(b)} / ${outOf(b)}</td></tr></tbody></table></div>`;
  }
  function piece(esc, k, title, paras, notes, label) {
    return `<h4 data-notc>${label}</h4><div class="gn-ex ${SHOW[k + ':plain'] ? 'gn-plain' : ''}">${title ? `<h4 class="gn-title">${esc(title)}</h4>` : ''}${paras.map(p => `<p>${mark(p)}</p>`).join('')}</div>
<h4 style="margin-top:14px" data-notc>What each highlight shows</h4><ol class="gn-notes">${notes.map(n => `<li><span>${esc(n)}</span></li>`).join('')}</ol>`;
  }

  function sampleBody(api, k, s, kind) {
    const esc = api.esc, shown = SHOW[k], j = s.justification;
    const total = sum(s.breakdown) + (j ? sum(j.breakdown) : 0), of = outOf(s.breakdown) + (j ? outOf(j.breakdown) : 0);
    let h = '';
    if (s.year) h += `<div><span class="sx-tag">${esc(s.year)} topic</span><span class="sx-tag">${esc(s.topic)}</span><span class="sx-tag">Audience: ${esc(s.audience)}</span>${s.form ? `<span class="sx-tag">${esc(s.form)}</span>` : ''}</div>`;
    if (s.stimulus) h += `<details class="sx-stim" open><summary><b>${kind === 'm2' ? 'The stimulus' : 'The extract'}</b></summary><div class="passage" style="margin-top:8px">${s.stimulus}</div></details>`;
    h += `<div class="row" style="justify-content:space-between;align-items:flex-start;margin-top:8px"><span class="kicker">The task</span><span class="sx-score">${total}<small>/ ${of}</small></span></div><div class="html-body">${s.prompt}${j && !/25 marks/.test(s.prompt) ? '<p style="text-align:right">[25 marks]</p>' : ''}</div>`;
    if (j) h += `<div class="html-body"><p>3. (b) Based on your response in 3(a), write a paragraph of no more than 50–100 words justifying the purpose, the intended audience and the context of communication.</p><p style="text-align:right">[15 marks]</p></div>`;
    h += `<div class="row" style="margin:12px 0"><button type="button" class="btn ${shown ? 'ghost' : 'gold'}" data-px="toggle" data-pv="genres" data-k="${k}">${shown ? 'Hide the exemplar' : 'Plan your own first, then reveal the exemplar'}</button>${shown ? `<button type="button" class="btn ghost" data-px="plain" data-pv="genres" data-k="${k}">${SHOW[k + ':plain'] ? 'Show annotations' : 'Read without annotations'}</button>` : ''}</div>`;
    if (!shown) return h + `<p class="hint">Write your thesis and a quick paragraph plan before you look. Then compare your plan with the exemplar, the annotations and the marks.</p>`;
    h += piece(esc, k, s.title, s.essay, s.notes, `${j ? '3(a) exemplar' : 'Exemplar'} · ${sum(s.breakdown)} out of ${outOf(s.breakdown)} · ${words(s.essay)} words`);
    h += marksTable(esc, s.breakdown, j ? 'How the 3(a) marks were earned' : null);
    if (j) {
      h += `<div class="sx-part">${piece(esc, k, '', j.text, j.notes, `3(b) justification · ${sum(j.breakdown)} out of ${outOf(j.breakdown)} · ${words(j.text)} words`)}${marksTable(esc, j.breakdown, 'How the 3(b) marks were earned')}</div>`;
      h += `<p style="margin-top:12px"><b>Section B total: ${total} / 40</b></p>`;
    }
    if (s.upgrade) h += `<h4 style="margin-top:14px">Upgrade it</h4><div class="gn-pair"><div class="weak"><b class="lab">Before</b>${esc(s.upgrade.weak)}</div><div class="strong"><b class="lab">Grade One version</b>${esc(s.upgrade.strong)}</div></div><p class="hint" style="margin-top:8px">${esc(s.upgrade.why)}</p>`;
    return h;
  }
  function itemList(api, keyBase, list, kind) {
    const esc = api.esc;
    return list.map((s, i) => {
      const k = keyBase + ':' + i, j = s.justification;
      const sc = sum(s.breakdown) + (j ? sum(j.breakdown) : 0), of = outOf(s.breakdown) + (j ? outOf(j.breakdown) : 0);
      return acc(k, 'sx-item', `<span class="t"><b>Sample ${i + 1}: ${esc(s.title)}</b>${s.year ? `<br><span class="hint">${esc(s.year)} · ${esc(s.topic)} · ${esc(s.form || '')}</span>` : ''}</span><span class="m">${sc}/${of} · ${words(s.essay)} words</span>`, sampleBody(api, k, s, kind), false);
    }).join('');
  }
  function genreGroup(api, keyBase, g, list, kind) {
    const esc = api.esc;
    const body = `<p><b>Purpose:</b> ${esc(g.purpose)}</p><h4>Key features</h4><ul class="gn-feat">${g.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul><h4 style="margin-top:14px">Samples</h4>${list.length ? itemList(api, keyBase + ':' + g.id, list, kind) : '<p class="hint">Samples coming soon.</p>'}`;
    return acc(keyBase + ':' + g.id, 'sx-sub', `<span class="sx-ico" aria-hidden="true">${g.icon}</span><span class="t"><b>${esc(g.name)}</b><br><span class="hint">${list.length} sample${list.length === 1 ? '' : 's'}</span></span>`, body, false);
  }


  /* ---------- Download (Word) and print ---------- */
  const SECS = [['m1', 'Module 1 · Gathering and Processing Information'], ['m2', 'Module 2 · Language and Community'], ['m3', 'Module 3 · Speaking and Writing'], ['p3', 'Paper 3 · Section B (Paper 032)']];
  const hx = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const annW = p => p.replace(/\{\{(\d+)\|([\s\S]*?)\}\}/g, '<span class="hl">$2</span><sup><b>[$1]</b></sup>');
  function marksW(b, label) { return `<p class="lab">${label}</p><table><tr><th>Criterion</th><th>Why</th><th>Marks</th></tr>${b.map(x => `<tr><td><b>${hx(x.part)}</b></td><td>${hx(x.why)}</td><td class="n">${x.got} / ${x.of}</td></tr>`).join('')}<tr><td><b>Total</b></td><td></td><td class="n"><b>${sum(b)} / ${outOf(b)}</b></td></tr></table>`; }
  function sampleW(s, i) {
    const j = s.justification, tot = sum(s.breakdown) + (j ? sum(j.breakdown) : 0), of = outOf(s.breakdown) + (j ? outOf(j.breakdown) : 0);
    let h = `<h3>Sample ${i + 1}: ${hx(s.title)} <span class="sc">${tot}/${of}</span></h3>`;
    if (s.year) h += `<p class="meta">${hx(s.year)} topic: ${hx(s.topic)} · Audience: ${hx(s.audience)} · Form: ${hx(s.form || '')}</p>`;
    if (s.stimulus) h += `<p class="lab">The ${kindOf(s)}</p><table class="box stim"><tr><td>${s.stimulus}</td></tr></table>`;
    h += `<p class="lab">The task</p><table class="box task"><tr><td>${s.prompt}${j ? '<p>3. (b) Based on your response in 3(a), write a paragraph of no more than 50–100 words justifying the purpose, the intended audience and the context of communication. [15 marks]</p>' : ''}</td></tr></table>`;
    h += `<p class="lab">${j ? '3(a) exemplar' : 'Exemplar'} · ${sum(s.breakdown)} out of ${outOf(s.breakdown)} · ${words(s.essay)} words</p><table class="box ex"><tr><td><p class="et">${hx(s.title)}</p>${s.essay.map(p => `<p>${annW(p)}</p>`).join('')}</td></tr></table>`;
    h += `<p class="lab">What each highlight shows</p><ol>${s.notes.map(n => `<li>${hx(n)}</li>`).join('')}</ol>` + marksW(s.breakdown, j ? 'How the 3(a) marks were earned' : 'How the marks were earned');
    if (j) h += `<p class="lab">3(b) justification · ${sum(j.breakdown)} out of ${outOf(j.breakdown)} · ${words(j.text)} words</p><table class="box ex"><tr><td>${j.text.map(p => `<p>${annW(p)}</p>`).join('')}</td></tr></table><ol>${j.notes.map(n => `<li>${hx(n)}</li>`).join('')}</ol>${marksW(j.breakdown, 'How the 3(b) marks were earned')}<p><b>Section B total: ${tot} / 40</b></p>`;
    if (s.upgrade) h += `<p class="lab">Upgrade it</p><table><tr><th>Before</th><th>Grade One version</th></tr><tr><td>${hx(s.upgrade.weak)}</td><td>${hx(s.upgrade.strong)}</td></tr></table><p class="why">${hx(s.upgrade.why)}</p>`;
    return h;
  }
  const kindOf = s => /<b>[A-Z][A-Z .']+:<\/b>/.test(s.stimulus || '') ? 'stimulus' : 'extract';
  function groupW(g, list) { return `<h2 class="g">${g.icon} ${hx(g.name)}</h2><p><b>Purpose:</b> ${hx(g.purpose)}</p><ul>${g.features.map(f => `<li>${hx(f)}</li>`).join('')}</ul>${list.map(sampleW).join('')}`; }
  function docW(which) {
    const d = D(), keys = which === 'all' ? SECS.map(x => x[0]) : [which];
    let body = '';
    keys.forEach(k => {
      const title = SECS.find(x => x[0] === k)[1];
      body += `<h1 class="sec">${hx(title)}</h1>`;
      if (k === 'm1' || k === 'm2') body += `<p>Paper 02 essays · no more than 500 words · marked out of 25: Content 10, Organization 7, Expression 8.</p>` + (d[k] || []).map(sampleW).join('');
      if (k === 'm3') body += `<p>Genre essays · no more than 300 words · marked out of 25: Content 10, Organization 7, Expression 8.</p>` + GENRES.map(g => groupW(g, (d.m3 || {})[g.id] || [])).join('');
      if (k === 'p3') body += `<p>Section B · 3(a) 200–250 words (25 marks: Creativity 10, Organisation 7, Expression 8) · 3(b) 50–100 words (15 marks: purpose, audience, context, 5 each).</p>` + P3G.map(g => groupW(g, (d.p3 || {})[g.id] || [])).join('');
    });
    const name = which === 'all' ? 'Sample Essays: Modules 1–3 and Paper 3' : 'Sample Essays: ' + SECS.find(x => x[0] === which)[1];
    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${hx(name)}</title><style>
@page{size:8.5in 11in;margin:0.9in}body{font-family:Georgia,'Times New Roman',serif;font-size:11.5pt;line-height:1.5;color:#111}
.cover{text-align:center;padding:40px 0 10px}.cover h1{font-family:Arial,sans-serif;font-size:24pt;color:#14254a;margin:0}.cover p{font-family:Arial,sans-serif;color:#555}
h1.sec{font-family:Arial,sans-serif;font-size:17pt;color:#fff;background:#14254a;padding:8px 12px;margin:28px 0 10px;page-break-before:always}
h2.g{font-family:Arial,sans-serif;font-size:14pt;color:#14254a;border-bottom:3px solid #c9a227;padding-bottom:3px;margin-top:24px}
h3{font-family:Arial,sans-serif;font-size:12.5pt;color:#14254a;margin:22px 0 4px;border-left:5px solid #c9a227;padding-left:8px}.sc{color:#8a6d0b}
.meta{font-family:Arial,sans-serif;font-size:9.5pt;color:#555;margin:0 0 6px}.lab{font-family:Arial,sans-serif;font-weight:bold;font-size:10pt;color:#14254a;text-transform:uppercase;letter-spacing:.04em;margin:12px 0 4px}
table.box{width:100%;border-collapse:collapse;margin:4px 0}table.box td{padding:10px 14px;font-family:Georgia,serif;font-size:11pt}table.ex td{border:1px solid #c9c2a8;background:#fffdf4}.box p{margin:0 0 8px}.et{text-align:center;font-weight:bold}.hl{background:#fbefc4}
table.stim td,table.task td{border:0;border-left:4px solid #6b7fa8;background:#f4f6fa}
table{border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:9.5pt;margin:4px 0}th,td{border:1px solid #999;padding:4px 6px;vertical-align:top;text-align:left}th{background:#e8ebf2}td.n{white-space:nowrap;text-align:right}
ol,ul{margin:4px 0 4px 20px}li{margin:2px 0}.why{font-style:italic;color:#444}sup{color:#8a6d0b;font-size:8pt}.foot{margin-top:30px;font-family:Arial,sans-serif;font-size:9pt;color:#666;text-align:center}
</style></head><body><div class="cover"><h1>${hx(name)}</h1><p>CAPE Communication Studies · Grade One exemplars, annotated and marked</p><p>Kester Small</p></div>
<p>How to use: read the task and plan your own answer first. A bold number in square brackets follows the words that show a feature; the numbered list under each piece explains it. Each marks table shows what earned the marks and, where a mark is held back, the next step.</p>${body}<p class="foot">CAPE Communication Studies · Kester Small</p></body></html>`;
  }
  function fileName(which) { return (which === 'all' ? 'Sample_Essays_Modules_1-3_and_Paper_3' : 'Sample_Essays_' + SECS.find(x => x[0] === which)[1].split(' · ')[0].replace(/\s+/g, '_')) + '.doc'; }
  function downloadW(which, api) {
    try {
      const blob = new Blob(['﻿', docW(which)], { type: 'application/msword' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fileName(which); document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
      if (api && api.toast) api.toast('Preparing ' + fileName(which));
    } catch (e) { if (api && api.toast) api.toast('Download is not available here. Use Print instead.'); }
  }
  function printW(which) {
    const f = document.createElement('iframe'); f.setAttribute('aria-hidden', 'true'); f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
    document.body.appendChild(f); const w = f.contentWindow; w.document.open(); w.document.write(docW(which)); w.document.close();
    setTimeout(() => { try { w.focus(); w.print(); } catch (e) { } setTimeout(() => f.remove(), 60000); }, 400);
  }
  const dlRow = (which, label) => `<div class="row" style="gap:6px;margin:6px 0 12px"><button type="button" class="btn ghost sm" data-px="dl" data-pv="genres" data-k="${which}">⬇ ${label} (Word)</button><button type="button" class="btn ghost sm" data-px="print" data-pv="genres" data-k="${which}">🖨 Print or save as PDF</button></div>`;
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'genres',
    title: 'Sample Essays',
    tile: { icon: '✍️', meta: 'Grade One sample essays for Modules 1–3 and Paper 3, annotated and marked against the mark scheme.' },
    render(api, loc) {
      const esc = api.esc, d = D(), m3 = d.m3 || {}, p3 = d.p3 || {};
      if (loc.tab && OPEN['sec:' + loc.tab] == null) OPEN['sec:' + loc.tab] = true;
      const n3 = GENRES.reduce((a, g) => a + (m3[g.id] || []).length, 0), np3 = P3G.reduce((a, g) => a + (p3[g.id] || []).length, 0);
      let h = `<section class="hero"><span class="eyebrow">Exam preparation</span><h1>Sample Essays</h1><p>Grade One exemplars for every essay you will write: Module 1 and Module 2 Paper 02 essays, Module 3 genre essays and Paper 3 Section B pieces with justifications. Every sample is annotated feature by feature and marked against the mark scheme.</p></section>`;
      h += `<div class="row" style="justify-content:space-between;flex-wrap:wrap;gap:6px;margin:0 0 10px"><div class="row" style="gap:6px"><button type="button" class="btn gold sm" data-px="dl" data-pv="genres" data-k="all">⬇ Download all sample essays (Word)</button><button type="button" class="btn ghost sm" data-px="print" data-pv="genres" data-k="all">🖨 Print or save as PDF</button></div><div class="row" style="gap:6px"><button type="button" class="btn ghost sm" data-sacc-all data-on="1">Expand all</button><button type="button" class="btn ghost sm" data-sacc-all data-on="0">Collapse all</button></div></div>`;
      const sec = (id, icon, title, meta, body) => acc('sec:' + id, 'sx-sec', `<span class="sx-ico" aria-hidden="true">${icon}</span><span class="t"><b>${title}</b><br><span class="hint">${meta}</span></span>`, body, false);

      h += sec('m1', '🔎', 'Module 1 · Gathering and Processing Information', `${(d.m1 || []).length} Paper 02 essays · no more than 500 words · marked out of 25`,
        `${dlRow('m1', 'Download this section')}<p>Each Module 1 essay analyses an extract: state the writer's <b>main message</b> (no more than 30 words) and <b>purpose</b>, discuss <b>two strategies or techniques</b> with PEEL, and evaluate <b>credibility</b>. Marked out of 25: Content 10, Organization 7, Expression 8.</p>${itemList(api, 'm1', d.m1 || [], 'm1')}`);
      h += sec('m2', '🗣️', 'Module 2 · Language and Community', `${(d.m2 || []).length} Paper 02 essays · no more than 500 words · marked out of 25`,
        `${dlRow('m2', 'Download this section')}<p>Each Module 2 essay responds to a transcript or extract: reasons for language choices, named <b>grammatical</b> and <b>phonological</b> features with exact examples, language attitudes, identity and technology. Marked out of 25: Content 10, Organization 7, Expression 8.</p>${itemList(api, 'm2', d.m2 || [], 'm2')}`);
      h += sec('m3', '✍️', 'Module 3 · Speaking and Writing', `${n3} genre essays · no more than 300 words · marked out of 25`,
        `${dlRow('m3', 'Download this section')}<p>Four samples for each genre, each within the Module 3 limit of 300 words and marked out of 25: Content 10, Organization 7, Expression 8.</p>
${acc('m3:compare', 'sx-sub', `<span class="sx-ico" aria-hidden="true">🧭</span><span class="t"><b>How the four genres differ</b></span>`, `<div class="tablewrap"><table class="gn-tbl"><thead><tr><th></th>${GENRES.map(x => `<th>${x.icon} ${esc(x.name)}</th>`).join('')}</tr></thead><tbody>${COMPARE.map(r => `<tr><td><b>${esc(r[0])}</b></td>${r.slice(1).map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="hint"><b>Argumentative or persuasive?</b> An argumentative essay wins the reader's agreement through reasoning and a fair counter-argument. A persuasive piece goes further: it targets a specific audience, uses emotion alongside logic and ends with a call to action.</p><h4>Before you write any genre</h4><ul class="gn-feat"><li>Underline the command word and the genre named in the question.</li><li>Identify the audience and purpose, then choose your register.</li><li>Write a one-sentence thesis (or, for a narrative, a one-sentence insight).</li><li>Plan no more than three body paragraphs: two points done well beat four done thinly.</li><li>Leave two minutes to count your words and proofread your Standard English.</li></ul>`, false)}
${GENRES.map(g => genreGroup(api, 'm3', g, m3[g.id] || [], 'm3')).join('')}`);
      h += sec('p3', '🏅', 'Paper 3 · Section B (Paper 032)', `${np3} samples · 3(a) 200–250 words + 3(b) 50–100 words · marked out of 40`,
        `${dlRow('p3', 'Download this section')}<p>Section B asks for a <b>reflective OR expository piece</b> of 200–250 words on your exam year's topic for the stated audience (<b>3(a)</b>, 25 marks: Creativity 10, Organisation 7, Expression 8), then a <b>justification</b> of 50–100 words covering purpose, intended audience and context of communication (<b>3(b)</b>, 15 marks: 5 each). Samples cover the 2026 topic (natural disasters, for homeowners) and the 2027 topic (non-communicable diseases in children, for parents).</p>
${P3G.map(g => genreGroup(api, 'p3', g, p3[g.id] || [], 'p3')).join('')}`);
      return h;
    },
    click(action, el, api) {
      const k = el.dataset.k;
      if (action === 'toggle') { SHOW[k] = !SHOW[k]; api.render(); }
      if (action === 'plain') { SHOW[k + ':plain'] = !SHOW[k + ':plain']; api.render(); }
      if (action === 'dl') downloadW(k, api);
      if (action === 'print') printW(k);
    }
  });
})();
