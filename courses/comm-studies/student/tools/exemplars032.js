/* Paper 032 exemplar essays, built from CXC subject reports (2016–2025).
   Data: content/x032/<year>.js push to window.X032. View id: x032. */
(function () {
  const CSS = `
.x3-years{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 4px}
.x3-q{border-left:5px solid var(--gold);}
.x3-score{display:inline-flex;align-items:baseline;gap:4px;font-weight:800;font-size:1.6rem;color:var(--gold)}
.x3-score small{font-size:.9rem;color:var(--ink);opacity:.75;font-weight:600}
.x3-ex{background:var(--surface);border:1.5px solid var(--line);border-radius:14px;padding:14px 18px;max-width:75ch;line-height:1.7}
.x3-ex .xn{display:inline-grid;place-items:center;min-width:20px;height:20px;border-radius:50%;background:var(--gold);color:#1a1300;font-size:.72rem;font-weight:800;margin:0 3px;vertical-align:2px;padding:0 4px}
.x3-ex p{margin:0 0 12px}.x3-ex p:last-child{margin-bottom:0}
.x3-ex .xa{background:color-mix(in srgb,var(--gold) 18%,transparent);border-radius:4px;padding:0 2px}
.x3-notes{counter-reset:xn;list-style:none;padding:0;margin:8px 0 0;display:grid;gap:6px}
.x3-notes li{counter-increment:xn;display:flex;gap:10px;align-items:flex-start}
.x3-notes li::before{content:counter(xn);flex:none;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--gold);color:#1a1300;font-weight:800;font-size:.75rem;margin-top:2px}
.x3-tbl{width:100%;border-collapse:collapse}.x3-tbl td,.x3-tbl th{padding:7px 8px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
.x3-tbl td.n{white-space:nowrap;font-weight:800;text-align:right}
.x3-tag{display:inline-block;font-size:.75rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;border:1.5px solid currentColor;border-radius:999px;padding:1px 10px;margin-left:6px;opacity:.85}
.x3-real{border:2px dashed var(--ok)}
.x3-hide[hidden]{display:none}
@media (max-width:520px){.x3-ex{padding:12px}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  const open = {};
  const DATA = () => (window.X032 || []).slice().sort((a, b) => b.year - a.year);

  function qHTML(api, y, q, qi) {
    const esc = api.esc, k = y.year + '-' + qi, shown = open[k];
    const total = (q.breakdown || []).reduce((a, b) => a + (+b.of || 0), 0) || 20;
    let h = `<article class="card x3-q"><div class="row" style="justify-content:space-between"><span class="kicker">Question ${qi + 1} · Module ${q.module}</span><span class="x3-score">${q.score}<small>/ ${total}</small></span></div>
<h3>${esc(q.title)}</h3>
<div class="html-body">${q.task}</div>`;
    if (q.extract) h += `<details><summary><b>${q.extractNote === 'original' ? 'The extract' : 'Practice extract'}</b>${q.extractNote === 'original' ? '' : '<span class="x3-tag">written to match the ' + y.year + ' task</span>'}</summary><div class="passage" style="margin-top:8px">${q.extract}</div>${q.extractNote === 'original' ? '' : `<p class="hint">The subject report describes this task but does not reprint the original extract (${esc(q.source || '')}). This practice extract matches its topic, genre and demands so the exemplar can show exactly how a top response works.</p>`}</details>`;
    h += `<div class="row" style="margin:12px 0"><button type="button" class="btn ${shown ? 'ghost' : 'gold'}" data-px="toggle" data-pv="x032" data-k="${k}">${shown ? 'Hide the exemplar' : 'Try it first, then reveal the exemplar'}</button></div>`;
    if (!shown) return h + `<p class="hint">Plan or write your own answer first. Then compare it with the exemplar, the marks and the examiner notes.</p></article>`;
    h += `<h4>Exemplar response · ${q.score} out of ${total}</h4><div class="x3-ex">${q.exemplar}</div>`;
    if (q.notes && q.notes.length) h += `<h4 style="margin-top:14px">Examiner notes</h4><ol class="x3-notes">${q.notes.map(n => `<li><span>${n}</span></li>`).join('')}</ol>`;
    if (q.breakdown) h += `<h4 style="margin-top:14px">How the marks were earned</h4><div class="tablewrap"><table class="x3-tbl"><thead><tr><th>Part</th><th>Why</th><th>Marks</th></tr></thead><tbody>${q.breakdown.map(b => `<tr><td><b>${esc(b.part)}</b></td><td>${b.why}</td><td class="n">${b.got} / ${b.of}</td></tr>`).join('')}<tr><td><b>Total</b></td><td></td><td class="n">${q.score} / ${total}</td></tr></tbody></table></div>`;
    if (q.examiners && q.examiners.length) h += `<h4 style="margin-top:14px">What the examiners said in ${y.year}</h4><ul>${q.examiners.map(x => `<li>${x}</li>`).join('')}</ul>`;
    if (q.avoid && q.avoid.length) h += `<h4 style="margin-top:14px">Why this exemplar scores so well</h4><ul>${q.avoid.map(x => `<li>${x}</li>`).join('')}</ul>`;
    if (q.real) h += `<div class="card x3-real" style="margin-top:14px"><span class="kicker">Real candidate response · ${esc(q.real.label || 'subject report')}</span><h4>${q.real.score} out of ${total}</h4><div class="x3-ex">${q.real.text}</div>${q.real.comments ? `<h4 style="margin-top:10px">Examiner's comments</h4><div class="html-body">${q.real.comments}</div>` : ''}</div>`;
    return h + `</article>`;
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'x032',
    title: 'Paper 032 Exemplars',
    tile: { icon: '🏅', meta: 'Top-scoring Paper 032 essays for every question, marked out of 20 and built from the examiners\' own reports.' },
    render(api, loc) {
      const D = DATA(); if (!D.length) return `<div class="card"><h2>Paper 032 Exemplars</h2><p>No exemplars yet.</p></div>`;
      const y = D.find(x => String(x.year) === String(loc.tab)) || D[0];
      let h = `<section class="hero"><span class="eyebrow">Paper 032</span><h1>Paper 032 Exemplars</h1><p>Each Paper 032 question is marked out of 20. These exemplars show what a Grade One response looks like for every question set from ${D[D.length - 1].year} to ${D[0].year}, built from what the CXC examiners praised and penalised in their subject reports.</p></section>`;
      h += `<div class="card"><h3>Choose a year</h3><div class="x3-years">${D.map(x => `<button type="button" class="chip ${x === y ? 'sel' : ''}" data-go="x032" data-tab="${x.year}">${x.year}</button>`).join('')}</div>
<p class="hint">Exemplars and practice extracts were written for this course from the subject reports' descriptions and comments. Real candidate responses are labelled as such. Marks shown are what the response would earn against the report's comments, not official CXC marks.</p></div>`;
      if (y.overview) h += `<div class="card"><h3>The ${y.year} paper at a glance</h3><div class="html-body">${y.overview}</div></div>`;
      h += y.questions.map((q, i) => qHTML(api, y, q, i)).join('');
      return h;
    },
    click(action, el, api) {
      if (action === 'toggle') { open[el.dataset.k] = !open[el.dataset.k]; api.render(); }
    }
  });
})();
