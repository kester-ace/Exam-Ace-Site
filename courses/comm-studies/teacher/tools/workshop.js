/* Essay Writing Workshop: prewriting, research, thesis, hooks, topic sentences, transitions, conclusions,
   revising and editing, then the four genres (expository, narrative, argumentative, persuasive) and
   Build-a-Sample walkthroughs. Data: content/workshop*.js → window.COURSE_WORKSHOP. View id: ww.
   Teacher's notes and model answers appear only in the Teacher's Version. Kester Small. */
(function () {
  const CSS = `
.ww-hero .eyebrow{display:inline-block}
.ww-spec td,.ww-spec th{font-size:.92rem}
.ww-chaps{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;margin-top:8px}
.ww-chap{display:flex;flex-direction:column;text-align:left;font:inherit;color:inherit;background:var(--surface);border:2px solid var(--line);border-radius:16px;overflow:hidden;cursor:pointer;padding:0}
.ww-chap:hover,.ww-chap:focus-visible{border-color:var(--gold);outline:none}
.ww-chap img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block}
.ww-chap .ph{aspect-ratio:16/9;display:grid;place-items:center;font-size:2.4rem;background:color-mix(in srgb,var(--gold) 14%,transparent)}
.ww-chap .tx{padding:10px 12px 12px}.ww-chap .tx b{display:block;font-size:1.02rem}.ww-chap .tx small{color:var(--muted)}
.ww-chap .st{float:right;font-weight:800;color:var(--ok)}
.ww-fig{margin:0 0 16px;padding:8px;border-radius:14px;background:var(--raise);border:1px solid var(--line)}
.ww-fig img{display:block;width:100%;height:auto;max-height:min(440px,60vh);object-fit:cover;border-radius:9px}
.ww-fig figcaption{margin-top:7px;font-size:.84rem;line-height:1.45}.ww-fig figcaption b{color:var(--gold)}
.ww-fig .cr{display:block;margin-top:3px;font-size:.74rem;opacity:.8}.ww-fig a{color:inherit}
.ww-body h4{margin:18px 0 6px}
.ww-body .tip{border-left:4px solid var(--gold);padding:8px 12px;border-radius:0 10px 10px 0;background:color-mix(in srgb,var(--gold) 9%,transparent)}
.ww-body .warn{border-left:4px solid var(--bad);padding:8px 12px;border-radius:0 10px 10px 0;background:color-mix(in srgb,var(--bad) 8%,transparent)}
.ww-body .passage,.ww-build .passage{border:1.5px solid var(--line);border-radius:12px;padding:10px 14px;line-height:1.75;background:var(--surface)}
.ww-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;margin:8px 0}.ww-grid.two{grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
.ww-card{border:1.5px solid var(--line);border-radius:12px;padding:10px 14px;background:var(--surface)}.ww-card h4{margin:2px 0 6px}.ww-card p{margin:0 0 6px}
.ww-formula{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0}
.ww-formula span{flex:1 1 120px;text-align:center;border:2px solid var(--gold);border-radius:12px;padding:8px;background:color-mix(in srgb,var(--gold) 10%,transparent)}
.ww-formula i{font-style:normal;font-weight:800;font-size:1.3rem;color:var(--gold)}
.ww-hbt{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0}
.ww-hbt div{border-radius:12px;padding:10px;border:2px solid var(--line);text-align:center}.ww-hbt b{display:block;color:var(--gold);font-size:1.05rem}.ww-hbt span{font-size:.9rem}
.ww-fix{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0}
.ww-fix>div{border-radius:12px;padding:10px 12px;border:1.5px solid var(--line);line-height:1.55}.ww-fix .weak{border-style:dashed;border-color:var(--bad)}.ww-fix .strong{border-color:var(--ok)}
.ww-fix b.lab{display:block;font-size:.74rem;letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px}
.ww-cluster{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0;position:relative}
.ww-cluster .c0{grid-column:1/-1;justify-self:center;border:2.5px solid var(--gold);border-radius:999px;padding:8px 22px;font-weight:800}
.ww-cluster .cb{border:1.5px solid var(--line);border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;gap:4px}
.ww-cluster .cb b{color:var(--gold)}.ww-cluster .cb span{font-size:.88rem}.ww-cluster .cb span::before{content:'• '}
.ww-tag{display:inline-block;font-size:.68rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;border-radius:6px;padding:0 6px;margin-right:4px;vertical-align:1px;color:#10172a}
.ww-tag.h{background:#F5C542}.ww-tag.b{background:#8fd3ff}.ww-tag.t{background:#9be7a8}.ww-tag.p{background:#F5C542}.ww-tag.e{background:#8fd3ff}.ww-tag.x{background:#c9b6ff}.ww-tag.l{background:#9be7a8}
.ww-box{border:2px solid var(--gold);padding:0 5px;border-radius:4px;font-weight:700}
.ww-arc svg{max-width:640px;display:block;margin:6px auto}
.ww-flip{perspective:1200px;margin:14px 0;cursor:pointer}
.ww-flip .in{position:relative;transition:transform .6s;transform-style:preserve-3d;min-height:190px}
.ww-flip.on .in{transform:rotateY(180deg)}
.ww-flip .f,.ww-flip .k{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:18px;padding:16px 18px;border:2px solid var(--gold);overflow:auto}
.ww-flip .f{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:linear-gradient(135deg,color-mix(in srgb,var(--gold) 22%,var(--surface)),var(--surface))}
.ww-flip .f .w{font-family:var(--f-display,inherit);font-size:clamp(1.8rem,6vw,2.8rem);font-weight:800;letter-spacing:.08em;color:var(--gold)}
.ww-flip .k{transform:rotateY(180deg);background:var(--surface)}
.ww-flip .k ul{list-style:none;padding:0;margin:0;display:grid;gap:4px}.ww-flip .k li b.L{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--gold);color:#1a1300;margin-right:6px}
.ww-q{border:1.5px solid var(--line);border-radius:14px;padding:12px 14px;margin:10px 0;background:var(--surface)}
.ww-q.ok{border-color:var(--ok)}.ww-q.no{border-color:var(--bad)}
.ww-o{display:block;width:100%;text-align:left;font:inherit;color:inherit;background:transparent;border:2px solid var(--line);border-radius:10px;padding:8px 12px;margin:6px 0;cursor:pointer}
.ww-o.right{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 10%,transparent)}.ww-o.wrong{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 8%,transparent)}
.ww-o.sel{border-color:var(--gold);box-shadow:inset 0 0 0 2px var(--gold)}.ww-o.key{outline:2px dashed var(--ok);outline-offset:2px}
.ww-o:disabled{cursor:default}
.ww-why{margin-top:6px;padding:8px 12px;border-radius:10px;background:color-mix(in srgb,var(--gold) 9%,transparent)}
.ww-ta{width:100%;min-height:200px;box-sizing:border-box;font:inherit;padding:12px;border-radius:12px;border:2px solid var(--line);background:var(--surface);color:var(--ink);line-height:1.6}
.ww-wc{font-variant-numeric:tabular-nums}.ww-wc.over{color:var(--bad);font-weight:800}
.ww-ck{list-style:none;padding:0;margin:8px 0;display:grid;gap:6px}.ww-ck label{display:flex;gap:8px;align-items:flex-start;cursor:pointer}
.ww-teach{border:2px dashed var(--gold);border-radius:14px;padding:4px 14px 12px;margin-top:14px;background:color-mix(in srgb,var(--gold) 5%,transparent)}
.ww-teach summary{cursor:pointer;font-weight:800;padding:8px 0}
.ww-steps{counter-reset:st;list-style:none;padding:0;margin:0;display:grid;gap:10px}
.ww-step{border:1.5px solid var(--line);border-radius:14px;padding:10px 14px;background:var(--surface)}
.ww-step>h4{margin:0 0 6px;display:flex;gap:10px;align-items:center}
.ww-step>h4::before{counter-increment:st;content:counter(st);display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:50%;background:var(--gold);color:#1a1300;font-size:.85rem}
.ww-step.new{animation:wwIn .45s ease}
@keyframes wwIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ww-prog{height:8px;border-radius:99px;background:var(--line);overflow:hidden;margin:6px 0 12px}.ww-prog i{display:block;height:100%;background:var(--gold)}
.ww-final{border:2px solid var(--ok);border-radius:14px;padding:14px 20px;background:var(--surface);max-width:75ch;line-height:1.8}
.ww-final h4{text-align:center;margin:0 0 10px}.ww-final p{margin:0 0 12px;text-indent:0}
.ww-bnav{display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center;margin-top:12px}
.ww-blist{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
@media (max-width:640px){.ww-fix,.ww-hbt,.ww-cluster{grid-template-columns:1fr}.ww-flip .in{min-height:260px}}
@media (prefers-reduced-motion:reduce){.ww-flip .in{transition:none}.ww-step.new{animation:none}}
@media print{.ww-flip .in{transform:none!important;min-height:0}.ww-flip .f{display:none}.ww-flip .k{position:static;transform:none;backface-visibility:visible}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  const D = () => window.COURSE_WORKSHOP || { chapters: [], builds: [] };
  const words = t => (String(t || '').trim() ? String(t).trim().split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length : 0);
  const ST = api => { const S = api.S; S.ww = S.ww || {}; ['chk', 'task', 'tick', 'step'].forEach(k => S.ww[k] = S.ww[k] || {}); return S.ww; };
  const chapter = id => D().chapters.find(c => c.id === id);
  const build = id => D().builds.find(b => b.id === id);
  const isDone = (api, c) => { const s = ST(api).chk[c.id]; return !!(s && s.done); };

  function fig(api, p, n) {
    if (!p) return '';
    const U = '?utm_source=kester_small_e_course&utm_medium=referral';
    return `<figure class="ww-fig"><img src="${api.esc(p.src)}" alt="${api.esc(p.alt)}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async"><figcaption><b>Figure W${n}</b> ${api.esc(p.cap)}<span class="cr">Photo: <a href="${api.esc(p.link + U)}" target="_blank" rel="noopener">${api.esc(p.by)}</a> on <a href="https://unsplash.com/${U}" target="_blank" rel="noopener">Unsplash</a></span></figcaption></figure>`;
  }
  function flip(api, m, key) {
    if (!m) return '';
    return `<div class="ww-flip" data-px="flip" data-pv="ww" role="button" tabindex="0" aria-label="Memory aid: ${api.esc(m.phrase)}. Select to flip."><div class="in">
<div class="f"><span class="hint">Memory aid · tap to flip</span><span class="w">${api.esc(m.word)}</span><b>${api.esc(m.phrase)}</b></div>
<div class="k"><ul>${m.letters.map(l => `<li><b class="L">${api.esc(l[0])}</b><b>${api.esc(l[1])}</b> · ${api.esc(l[2])}</li>`).join('')}</ul>${m.extra ? `<p style="margin:8px 0 0">${m.extra}</p>` : ''}</div></div></div>`;
  }
  function checkHTML(api, c) {
    const s = ST(api).chk[c.id] || { ans: {} }, show = s.done || api.S.teacher;
    const L = 'ABCD';
    let right = 0;
    const qs = c.check.map((q, i) => {
      const a = s.ans[i]; if (a === q.a) right++;
      const cls = s.done ? (a === q.a ? 'ok' : 'no') : '';
      return `<div class="ww-q ${cls}"><b>${i + 1}. ${q.q}</b>${q.o.map((o, oi) => { let k = ''; if (s.done && oi === q.a) k = 'right'; else if (s.done && oi === a) k = 'wrong'; else if (!s.done && a === oi) k = 'sel'; if (!s.done && api.S.teacher && oi === q.a) k += ' key'; return `<button type="button" class="ww-o ${k}" data-px="ans" data-pv="ww" data-k="${c.id}" data-i="${i}" data-o="${oi}"${s.done ? ' disabled' : ''}><b>${L[oi]}.</b> ${o}</button>`; }).join('')}${show ? `<div class="ww-why">${q.why}</div>` : ''}</div>`;
    }).join('');
    const n = Object.keys(s.ans).length;
    return `<div class="card"><h3>✅ Quick check</h3>${qs}${s.done ? `<p><b>You scored ${right} / ${c.check.length}.</b> ${right === c.check.length ? 'Excellent work.' : 'Read the explanations, then try again.'}</p><div class="row"><button type="button" class="btn ghost" data-px="retry" data-pv="ww" data-k="${c.id}">Try again</button></div><div class="ws-bar" data-title="Quick check: ${api.esc(c.title)}" data-score="${right}" data-max="${c.check.length}"><button type="button" class="btn ghost sm" data-ws="save">⬇ Save</button><button type="button" class="btn gold sm" data-ws="submit">📤 Submit</button></div>` : `<div class="row"><button type="button" class="btn go" data-px="mark" data-pv="ww" data-k="${c.id}"${n < c.check.length ? ' disabled' : ''}>Check my answers (${n}/${c.check.length})</button></div>`}</div>`;
  }
  function taskHTML(api, c) {
    const t = c.task; if (!t) return '';
    const W = ST(api), txt = W.task[c.id] || '', ticks = W.tick[c.id] || [], n = words(txt);
    return `<div class="card"><h3>✍️ Try it</h3><div class="ww-body">${t.prompt}</div><p class="hint">Aim for ${t.min}–${t.max} words.</p>
<label class="sr" for="wwta-${c.id}">Your answer</label><textarea id="wwta-${c.id}" class="ww-ta" data-wwta="${c.id}" spellcheck="true">${api.esc(txt)}</textarea>
<p class="hint"><span class="ww-wc ${n > t.max ? 'over' : ''}" id="wwwc-${c.id}">${n} words</span> · saved automatically on this device</p>
<h4>Self-check</h4><ul class="ww-ck">${t.checklist.map((x, i) => `<li><label><input type="checkbox" data-wwck="${c.id}:${i}"${ticks.includes(i) ? ' checked' : ''}> ${api.esc(x)}</label></li>`).join('')}</ul>
<div class="ws-bar" data-title="Try it: ${api.esc(c.title)}"><button type="button" class="btn ghost sm" data-ws="save">⬇ Save as PDF or Word</button><button type="button" class="btn gold sm" data-ws="submit">📤 Submit to my teacher</button></div></div>`;
  }
  function teachHTML(api, c) {
    if (!api.S.teacher || !c.teacher) return '';
    const T = c.teacher;
    return `<details class="ww-teach" open><summary>🍎 Teacher's notes · ${api.esc(T.time)}</summary>
<h4>Lesson plan</h4><ol>${T.plan.map(x => `<li>${x}</li>`).join('')}</ol>
<h4>Common errors to watch for</h4><ul>${T.errors.map(x => `<li>${x}</li>`).join('')}</ul>
<h4>Answers and models</h4>${T.answers}
<h4>Differentiation and extension</h4><p>${T.extend}</p></details>`;
  }
  function specsHTML(api) {
    const S = D().specs; if (!S) return '';
    return `<div class="card"><h3>📏 Exam specifications at a glance</h3><div class="tablewrap"><table class="gn-tbl ww-spec"><thead><tr><th>Paper and section</th><th>What you write</th><th>Length</th><th>Marks</th></tr></thead><tbody>${S.rows.map(r => `<tr>${r.map((x, i) => `<td>${i ? api.esc(x) : '<b>' + api.esc(x) + '</b>'}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="hint">${api.esc(S.note)}</p>
<h4>The essay mark scheme (25 marks)</h4><div class="tablewrap"><table class="gn-tbl"><tbody>${S.scheme.map(r => `<tr><td><b>${r[0]}</b></td><td class="n">${r[1]}</td><td>${api.esc(r[2])}</td></tr>`).join('')}</tbody></table></div></div>`;
  }

  function homeHTML(api) {
    const d = D(), esc = api.esc, done = d.chapters.filter(c => isDone(api, c)).length;
    const card = c => `<button type="button" class="ww-chap" data-go="ww" data-k="${c.id}">${c.photo ? `<img src="${esc(c.photo.src)}" alt="" loading="lazy">` : `<span class="ph" aria-hidden="true">${c.icon}</span>`}<span class="tx">${isDone(api, c) ? '<span class="st">✓</span>' : ''}<small>Chapter ${c.n}${c.genre ? ' · Genre' : ''}</small><b>${c.icon} ${esc(c.title)}</b><small>${esc(c.kicker || '')}</small></span></button>`;
    return `<section class="hero ww-hero"><span class="eyebrow">Write like a Grade One candidate</span><h1>${esc(d.title || 'Essay Writing Workshop')}</h1>${d.intro || ''}</section>
${api.S.teacher ? `<div class="card"><p><b>Teacher's Version:</b> every chapter shows its lesson plan, common errors, model answers and the Quick check answers. Build-a-Sample opens with all steps visible.</p></div>` : ''}
${specsHTML(api)}
<div class="card"><div class="row" style="justify-content:space-between;align-items:center"><h3 style="margin:0">Part A · Skills every essay shares</h3><span class="hint">${done} of ${d.chapters.length} chapters checked</span></div><div class="ww-prog" aria-hidden="true"><i style="width:${Math.round(done / Math.max(1, d.chapters.length) * 100)}%"></i></div>
<div class="ww-chaps">${d.chapters.filter(c => !c.genre && c.id !== 'compare').map(card).join('')}</div></div>
<div class="card"><h3>Part B · The four genres</h3><div class="ww-chaps">${d.chapters.filter(c => c.genre || c.id === 'compare').map(card).join('')}</div></div>
<div class="card"><h3>Part C · Build-a-Sample</h3><p>Watch one Grade One essay in each genre being built, decision by decision: unpacking the question, prewriting, research, thesis, outline, hook, drafting, revising and editing.</p><div class="ww-blist">${d.builds.map(b => `<button type="button" class="ww-chap" data-go="ww" data-k="${b.id}"><span class="ph" aria-hidden="true">${b.icon}</span><span class="tx"><small>${esc(b.name)} · ${esc(b.method)}</small><b>${esc(b.title)}</b><small>${b.steps.length} steps · final essay ${words(b.final.join(' '))} words</small></span></button>`).join('')}</div></div>
<div class="card"><button type="button" class="lrow" data-go="books"><span class="t"><b>📖 Flipbook</b><br><span class="hint">Read this workshop and every module as a searchable, page-turning flipbook</span></span></button></div>
${window.COURSE_PLUGINS && (window.COURSE_PLUGINS.some(p => p.view === 'genres')) ? `<div class="card"><button type="button" class="lrow" data-go="genres"><span class="t"><b>✍️ More Grade One samples</b><br><span class="hint">Annotated, marked essays for Modules 1–3 and Paper 3</span></span></button></div>` : ''}`;
  }

  function chapterHTML(api, c) {
    const d = D(), i = d.chapters.indexOf(c), prev = d.chapters[i - 1], next = d.chapters[i + 1], esc = api.esc;
    return `<div class="crumbs"><button type="button" class="linkbtn" data-go="ww">← Essay Writing Workshop</button><span>Chapter ${c.n} of ${d.chapters.length}</span></div>
<article class="card"><span class="kicker">${c.genre ? 'Genre' : 'Writing skills'} · Chapter ${c.n}</span><h2>${c.icon} ${esc(c.title)}</h2>
${fig(api, c.photo, c.n)}
${c.objectives ? `<h4>In this chapter you will</h4><ul>${c.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul>` : ''}
<div class="html-body ww-body">${c.html}</div>
${flip(api, c.mnemonic, c.id)}
${teachHTML(api, c)}</article>
${checkHTML(api, c)}
${taskHTML(api, c)}
<div class="nav">${prev ? `<button type="button" class="btn ghost" data-go="ww" data-k="${prev.id}">← ${esc(prev.title)}</button>` : '<span></span>'}${next ? `<button type="button" class="btn go" data-go="ww" data-k="${next.id}">${esc(next.title)} →</button>` : `<button type="button" class="btn go" data-go="ww" data-k="${d.builds[0].id}">Build-a-Sample →</button>`}</div>`;
  }

  function buildHTML(api, b) {
    const d = D(), esc = api.esc, W = ST(api), all = api.S.teacher || W.step[b.id] === 'all';
    const shown = all ? b.steps.length : Math.min(+W.step[b.id] || 1, b.steps.length);
    const finished = shown >= b.steps.length;
    const bi = d.builds.indexOf(b), nb = d.builds[bi + 1];
    const total = b.marks.reduce((a, m) => a + m[1], 0);
    return `<div class="crumbs"><button type="button" class="linkbtn" data-go="ww">← Essay Writing Workshop</button><span>Build-a-Sample · ${esc(b.name)}</span></div>
<article class="card ww-build"><span class="kicker">Build-a-Sample · ${esc(b.name)} · ${esc(b.method)}</span><h2>${b.icon} ${esc(b.title)}</h2>
<div class="passage"><b>The question:</b> ${esc(b.question)}</div>
<div class="ww-prog" aria-label="Step ${shown} of ${b.steps.length}"><i style="width:${Math.round(shown / b.steps.length * 100)}%"></i></div>
<ol class="ww-steps">${b.steps.slice(0, shown).map((s, i) => `<li class="ww-step${i === shown - 1 && !all ? ' new' : ''}"><h4>${esc(s.label)}</h4><div class="html-body ww-body">${s.html}</div></li>`).join('')}</ol>
<div class="ww-bnav">${!finished ? `<button type="button" class="btn go" data-px="step" data-pv="ww" data-k="${b.id}">Next step (${shown + 1} of ${b.steps.length}) →</button><button type="button" class="btn ghost sm" data-px="all" data-pv="ww" data-k="${b.id}">Show every step</button>` : `<span class="hint">All ${b.steps.length} steps shown.</span>${api.S.teacher ? '' : `<button type="button" class="btn ghost sm" data-px="restart" data-pv="ww" data-k="${b.id}">Start again</button>`}`}</div></article>
${finished ? `<div class="card"><h3>🏁 The final essay · ${words(b.final.join(' '))} words</h3><div class="ww-final"><h4>${esc(b.title)}</h4>${b.final.map(p => `<p>${esc(p)}</p>`).join('')}</div>
<h4>How it would be marked · ${total} / 25</h4><div class="tablewrap"><table class="gn-tbl"><tbody>${b.marks.map(m => `<tr><td><b>${m[0]}</b></td><td class="n">${m[1]} / ${m[2]}</td><td>${esc(m[3])}</td></tr>`).join('')}</tbody></table></div>
<div class="ws-bar" data-title="Build-a-Sample: ${esc(b.title)}"><button type="button" class="btn ghost sm" data-ws="save">⬇ Save as PDF or Word</button></div>
<div class="nav"><button type="button" class="btn ghost" data-go="ww" data-k="${b.genre}">← ${esc(b.name)} chapter</button>${nb ? `<button type="button" class="btn go" data-go="ww" data-k="${nb.id}">Next build: ${esc(nb.name)} →</button>` : `<button type="button" class="btn go" data-go="ww">Back to the workshop</button>`}</div></div>` : ''}`;
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'ww',
    title: 'Essay Writing Workshop',
    tile: { icon: '🖋️', meta: 'Prewriting, research, thesis, hooks, topic sentences and the four genres, built step by step.' },
    render(api, loc) {
      const k = loc && loc.k;
      if (k && chapter(k)) return chapterHTML(api, chapter(k));
      if (k && build(k)) return buildHTML(api, build(k));
      return homeHTML(api);
    },
    mount(api, loc, stage) {
      if (!stage) return;
      const W = ST(api); let t = 0;
      stage.querySelectorAll('textarea[data-wwta]').forEach(ta => ta.addEventListener('input', () => {
        const id = ta.dataset.wwta, c = chapter(id); W.task[id] = ta.value;
        const n = words(ta.value), el = document.getElementById('wwwc-' + id); if (el) { el.textContent = n + ' words'; el.classList.toggle('over', !!(c && c.task && n > c.task.max)); }
        clearTimeout(t); t = setTimeout(() => api.save(), 600);
      }));
      stage.querySelectorAll('input[data-wwck]').forEach(cb => cb.addEventListener('change', () => {
        const [id, i] = cb.dataset.wwck.split(':'); const L = (W.tick[id] = W.tick[id] || []); const n = +i; const at = L.indexOf(n);
        if (cb.checked && at < 0) L.push(n); if (!cb.checked && at >= 0) L.splice(at, 1); api.save();
        const c = chapter(id); if (c && c.task && L.length === c.task.checklist.length && !W['tw:' + id]) { W['tw:' + id] = 1; api.save(); api.reward(3, 'Writing task self-checked', { xp: 10 }); }
      }));
      stage.querySelectorAll('.ww-flip').forEach(f => f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f.classList.toggle('on'); } }));
    },
    click(action, el, api) {
      const W = ST(api), k = el.dataset.k;
      if (action === 'flip') { const f = el.closest('.ww-flip'); if (f) { f.classList.toggle('on'); try { api.chime('soft'); } catch (e) { } } return; }
      if (action === 'ans') { const s = W.chk[k] = W.chk[k] || { ans: {} }; if (s.done) return; s.ans[+el.dataset.i] = +el.dataset.o; api.save(); api.render(); return; }
      if (action === 'mark') {
        const c = chapter(k), s = W.chk[k]; if (!c || !s) return; s.done = true;
        const right = c.check.reduce((a, q, i) => a + (s.ans[i] === q.a ? 1 : 0), 0);
        if (!s.rewarded) { s.rewarded = true; api.reward(Math.max(1, right), 'Workshop quick check', { xp: 5 * right }); }
        s.best = Math.max(s.best || 0, right); api.save(); api.render(); return;
      }
      if (action === 'retry') { const s = W.chk[k]; if (s) { s.ans = {}; s.done = false; } api.save(); api.render(); return; }
      if (action === 'step') { W.step[k] = Math.min((+W.step[k] || 1) + 1, build(k).steps.length); api.save(); api.render(); setTimeout(() => { const n = document.querySelector('.ww-step.new'); if (n && n.scrollIntoView) n.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 30); return; }
      if (action === 'all') { W.step[k] = 'all'; api.save(); api.render(); return; }
      if (action === 'restart') { W.step[k] = 1; api.save(); api.render(); window.scrollTo(0, 0); return; }
    }
  });
})();
