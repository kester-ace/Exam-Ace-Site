/* Examiner's Corner: recurring mark-losers from CAPE Communication Studies subject reports (paraphrased),
   with original weak/strong examples, self-checks, a Before the Exam checklist and trends. Data: content/examiner.js */
(function () {
  const CSS = `
.ex-tabs{margin:4px 0 14px}
.ex-filters{display:flex;flex-direction:column;gap:8px;margin-bottom:12px}
.ex-filters .ex-lab{font-weight:700;margin-right:6px}
.ex-list{display:flex;flex-direction:column;gap:12px}
.ex-card{border:1px solid var(--line);border-radius:16px;background:var(--surface);padding:14px 16px;display:flex;flex-direction:column;gap:10px;min-width:0}
.ex-card h3{margin:0}
.ex-tags{display:flex;flex-wrap:wrap;gap:6px}
.ex-tag{display:inline-block;padding:2px 9px;border-radius:999px;border:1px solid var(--line);font-size:.8rem;font-weight:700;line-height:1.6}
.ex-tag.mod{background:var(--soft-gold);border-color:transparent;color:inherit}
.ex-flow{display:grid;grid-template-columns:1fr;gap:8px}
.ex-box{border-left:4px solid var(--line);padding:8px 12px;border-radius:0 10px 10px 0;background:rgba(127,127,127,.06)}
.ex-box p{margin:2px 0 0}
.ex-box b.ex-h{display:block}
.ex-box.wk{border-left-color:var(--bad)}
.ex-box.ad{border-left-color:var(--ok)}
.ex-pair{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ex-ex{border:1px dashed var(--line);border-radius:12px;padding:8px 12px;min-width:0;overflow-wrap:anywhere}
.ex-ex p{margin:2px 0 0;font-style:italic}
.ex-ex.weak b{color:var(--bad)}.ex-ex.strong b{color:var(--ok)}
.ex-q{border-top:1px solid var(--line);padding-top:10px}
.ex-q .opts{margin-top:6px}
.ex-quote{font-style:italic;opacity:.9}
.ex-freq{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.ex-bar{flex:1 1 140px;height:10px;border-radius:999px;background:rgba(127,127,127,.18);overflow:hidden;min-width:100px}
.ex-bar i{display:block;height:100%;border-radius:999px;background:var(--gold)}
.ex-top{display:flex;flex-direction:column;gap:10px}
.ex-top details{border:1px solid var(--line);border-radius:16px;background:var(--surface)}
.ex-top summary{cursor:pointer;padding:12px 14px;display:grid;grid-template-columns:auto 1fr;gap:4px 12px;align-items:center;list-style:none}
.ex-top summary::-webkit-details-marker{display:none}
.ex-top summary:focus-visible{outline:3px solid var(--gold);outline-offset:2px;border-radius:14px}
.ex-rank{grid-row:span 2;width:2.2em;height:2.2em;border-radius:50%;display:grid;place-items:center;font-weight:800;background:var(--soft-gold)}
.ex-top .ex-sumt{font-weight:700;min-width:0}
.ex-top details>.ex-card>h3{display:none}
.ex-top details>.ex-card{border:0;border-top:1px solid var(--line);border-radius:0 0 16px 16px}
.ex-checks{display:flex;flex-direction:column;gap:14px}
.ex-group{display:flex;flex-direction:column;gap:6px}
.ex-group h3{margin:0 0 2px}
.ex-tick{display:flex;gap:10px;align-items:flex-start;text-align:left;width:100%;padding:9px 12px;border-radius:12px;border:1px solid var(--line);background:var(--surface);color:inherit;font:inherit;cursor:pointer}
.ex-tick .bx{flex:0 0 auto;width:1.3em;height:1.3em;border-radius:6px;border:2px solid var(--gold);display:grid;place-items:center;font-weight:900;line-height:1}
.ex-tick[aria-pressed="true"]{border-color:var(--ok)}
.ex-tick[aria-pressed="true"] .bx{background:var(--ok);border-color:var(--ok);color:#fff}
.ex-tick[aria-pressed="true"] .tx{opacity:.8}
.ex-tick:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.ex-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.ex-stat{border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--surface)}
.ex-stat .big{display:block;font-weight:800;font-size:1.6em;line-height:1.2}
.ex-chart{--ex-s1:#3987e5;--ex-s2:#d95926;--ex-s3:#199e70;--ex-grid:rgba(127,127,127,.25);--ex-txt:currentColor}
:root[data-skin="daylight"] .ex-chart{--ex-s1:#2a78d6;--ex-s2:#eb6834;--ex-s3:#1baf7a}
.ex-chart svg{display:block;width:100%;height:auto;max-width:640px}
.ex-chart .gl{stroke:var(--ex-grid);stroke-width:1}
.ex-chart .ax{fill:var(--ex-txt);font-size:12px;opacity:.8}
.ex-chart .ln{fill:none;stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round}
.ex-chart .pt{stroke:var(--surface);stroke-width:2}
.ex-chart .hit{fill:transparent;cursor:default}
.ex-legend{display:flex;flex-wrap:wrap;gap:12px;margin:6px 0}
.ex-legend span{display:inline-flex;align-items:center;gap:6px;font-weight:700}
.ex-legend i{display:inline-block;width:18px;height:4px;border-radius:2px}
.ex-tbl{width:100%;border-collapse:collapse;margin-top:8px}
.ex-tbl th,.ex-tbl td{border-bottom:1px solid var(--line);padding:4px 6px;text-align:right}
.ex-tbl th:first-child,.ex-tbl td:first-child{text-align:left}
.ex-tblwrap{overflow-x:auto}
.ex-trends{margin:0;padding-left:1.2em}
.ex-trends li{margin:6px 0}
.ex-src{margin-top:14px}
.ex-tip{margin:0}
@media (max-width:560px){.ex-pair{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.ex-bar i{transition:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  const MODNAME = { '1': 'Module 1', '2': 'Module 2', '3': 'Module 3', P032: 'Paper 032', P1: 'Paper 01', general: 'All Modules' };
  const MODGO = { '1': 'M1', '2': 'M2', '3': 'M3', P032: 'P3', P1: 'M1' };
  const PAPNAME = { P1: 'Paper 01', P2: 'Paper 02', P032: 'Paper 032' };
  const TABS = [['top', 'Top 10 Mark-Losers'], ['all', 'All Insights'], ['check', 'Before the Exam'], ['trends', 'Over the Years']];
  const MODF = [['all', 'All'], ['1', 'Module 1'], ['2', 'Module 2'], ['3', 'Module 3'], ['P032', 'Paper 032'], ['P1', 'Paper 01'], ['general', 'General']];
  const PAPF = [['all', 'All Papers'], ['P1', 'Paper 01'], ['P2', 'Paper 02'], ['P032', 'Paper 032']];
  let fMod = 'all', fPap = 'all';
  const ans = {}; const paid = {}; const opened = {};

  const X = () => window.COURSE_EXAMINER || { years: [], insights: [], trends: [] };
  const nReports = () => (X().years || []).length || 8;
  const ticks = api => { const t = api.S.exm; return Array.isArray(t) ? t : []; };
  const ranked = () => X().insights.map((x, i) => [x, i]).sort((a, b) => (b[0].years.length - a[0].years.length) || (a[1] - b[1])).map(p => p[0]);

  function freq(esc, ins) {
    const n = ins.years.length, N = nReports();
    return `<div class="ex-freq"><span class="ex-bar" role="img" aria-label="Flagged in ${n} of ${N} reports"><i style="width:${Math.round(n / N * 100)}%"></i></span><span class="hint">Flagged in ${n} of ${N} reports</span></div>`;
  }

  function checkHTML(esc, ins) {
    const c = ins.check; if (!c) return '';
    const pick = ans[ins.id];
    const done = pick != null;
    const opts = c.o.map((o, j) => {
      const cls = done ? (j === c.a ? ' right' : (j === pick ? ' wrong' : '')) : '';
      return `<button type="button" class="opt${cls}" data-px="ans" data-k="${esc(ins.id)}" data-i="${j}" ${done ? 'aria-disabled="true"' : ''}>${esc(o)}</button>`;
    }).join('');
    const fb = done ? `<p class="fb ${pick === c.a ? 'good' : 'bad'}">${pick === c.a ? '✓ Correct.' : '✗ Not quite.'} ${esc(c.why)}</p>` : '';
    return `<div class="ex-q" data-exq="${esc(ins.id)}"><b>Quick Self-Check</b><p>${esc(c.q)}</p><div class="opts">${opts}</div><div class="ex-fb" aria-live="polite">${fb}</div></div>`;
  }

  function card(esc, ins, withFreq) {
    const ex = ins.example;
    const go = MODGO[ins.module];
    const q = ins.quote ? `<p class="ex-quote">Examiners (${ins.quote.year}): “${esc(ins.quote.text)}”</p>` : '';
    return `<article class="ex-card" id="ex-${esc(ins.id)}">
      <h3>${esc(ins.theme)}</h3>
      <div class="ex-tags"><span class="ex-tag mod">${esc(MODNAME[ins.module] || ins.module)}</span><span class="ex-tag">${esc(PAPNAME[ins.paper] || ins.paper)}</span><span class="ex-tag">${ins.years.join(', ')}</span></div>
      ${withFreq ? freq(esc, ins) : ''}
      <div class="ex-flow">
        <div class="ex-box wk"><b class="ex-h">What Went Wrong</b><p>${esc(ins.weakness)}</p></div>
        <div class="ex-box ad"><b class="ex-h">What Examiners Want</b><p>${esc(ins.advice)}</p></div>
      </div>
      ${q}
      ${ex ? `<div class="ex-pair"><div class="ex-ex weak"><b>✗ Weak</b><p>${esc(ex.weak)}</p></div><div class="ex-ex strong"><b>✓ Strong</b><p>${esc(ex.strong)}</p></div></div>` : ''}
      ${checkHTML(esc, ins)}
      <div class="row">${go ? `<button type="button" class="btn ghost" data-go="module" data-m="${go}">Revise ${esc(MODNAME[ins.module] === 'Paper 01' ? 'Module 1' : MODNAME[ins.module])} →</button>` : ''}<button type="button" class="btn ghost" data-go="toolkit">Exam Toolkit →</button></div>
    </article>`;
  }

  function topHTML(esc) {
    const top = ranked().slice(0, 10);
    return `<p>These are the weaknesses examiners reported most often across the subject reports. Open one to see what went wrong, what examiners want, and test yourself.</p>
    <div class="ex-top">${top.map((ins, i) => `<details data-exd="${esc(ins.id)}" ${opened[ins.id] ? 'open' : ''}><summary><span class="ex-rank" aria-hidden="true">${i + 1}</span><span class="ex-sumt">${esc(ins.theme)} <span class="hint">· ${esc(MODNAME[ins.module])}</span></span>${freq(esc, ins)}</summary>${card(esc, ins, false)}</details>`).join('')}</div>`;
  }

  function allHTML(esc) {
    const list = X().insights.filter(x => (fMod === 'all' || x.module === fMod) && (fPap === 'all' || x.paper === fPap));
    const chips = (arr, cur, act) => arr.map(([k, l]) => `<button type="button" class="chip ${cur === k ? 'sel' : ''}" aria-pressed="${cur === k}" data-px="${act}" data-k="${k}">${esc(l)}</button>`).join('');
    return `<div class="ex-filters"><div class="chips" role="group" aria-label="Filter by module"><span class="ex-lab">Module</span>${chips(MODF, fMod, 'fmod')}</div><div class="chips" role="group" aria-label="Filter by paper"><span class="ex-lab">Paper</span>${chips(PAPF, fPap, 'fpap')}</div></div>
    <p class="hint">${list.length} insight${list.length === 1 ? '' : 's'} shown</p>
    <div class="ex-list">${list.length ? list.map(x => card(esc, x, true)).join('') : '<p class="fb note">No insights match this combination. Try another filter.</p>'}</div>`;
  }

  function checkTabHTML(api, esc) {
    const t = ticks(api), all = X().insights;
    const groups = ['1', '2', '3', 'P032', 'P1', 'general'];
    const n = all.filter(x => t.includes(x.id)).length;
    return `<p>Tick each habit when you are confident you do it in timed practice. Your ticks are saved on this device.</p>
    <div class="pbar" aria-label="${n} of ${all.length} ticked"><i style="width:${Math.round(n / Math.max(1, all.length) * 100)}%"></i></div>
    <p class="hint">${n} of ${all.length} ready${n === all.length ? ' · Exam-ready habits all ticked!' : ''}</p>
    <div class="ex-checks">${groups.map(g => {
      const items = all.filter(x => x.module === g); if (!items.length) return '';
      return `<div class="ex-group"><h3>${esc(MODNAME[g] === 'All Modules' ? 'Every Essay' : MODNAME[g])}</h3>${items.map(x => { const on = t.includes(x.id); return `<button type="button" class="ex-tick" aria-pressed="${on}" data-px="tick" data-k="${esc(x.id)}"><span class="bx" aria-hidden="true">${on ? '✓' : ''}</span><span class="tx">${esc(x.todo || x.advice)}</span></button>`; }).join('')}</div>`;
    }).join('')}</div>
    <div class="row"><button type="button" class="btn ghost" data-px="untick">Clear My Ticks</button></div>`;
  }

  function chartSVG(esc) {
    const s = (X().stats || {}).modules; if (!s) return '';
    const W = 560, H = 260, L = 40, R = 70, T = 16, B = 34;
    const ys = s.years, lo = 30, hi = 70;
    const x = i => L + i * (W - L - R) / (ys.length - 1), y = v => T + (hi - v) / (hi - lo) * (H - T - B);
    let g = '';
    for (let v = lo; v <= hi; v += 10) g += `<line class="gl" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${v}%</text>`;
    ys.forEach((yr, i) => { g += `<text class="ax" x="${x(i)}" y="${H - 12}" text-anchor="middle">${yr}</text>`; });
    const ser = [['M1', 'Module 1', '--ex-s1'], ['M2', 'Module 2', '--ex-s2'], ['M3', 'Module 3', '--ex-s3']];
    // end labels, nudged apart so they never collide
    const ends = ser.map(([k]) => ({ k, v: y(s[k][s[k].length - 1]) })).sort((a, b) => a.v - b.v);
    for (let i = 1; i < ends.length; i++) if (ends[i].v - ends[i - 1].v < 15) ends[i].v = ends[i - 1].v + 15;
    const endY = {}; ends.forEach(e => endY[e.k] = e.v);
    ser.forEach(([k, name, c]) => {
      const pts = s[k].map((v, i) => `${x(i)},${y(v)}`).join(' ');
      g += `<polyline class="ln" style="stroke:var(${c})" points="${pts}"/>`;
      s[k].forEach((v, i) => { g += `<g><circle class="pt" style="fill:var(${c})" cx="${x(i)}" cy="${y(v)}" r="4.5"/><circle class="hit" cx="${x(i)}" cy="${y(v)}" r="12"><title>${name}, ${ys[i]}: ${v}%</title></circle></g>`; });
      g += `<text class="ax" x="${W - R + 8}" y="${endY[k] + 4}" style="opacity:1;font-weight:700">${name.replace('Module ', 'M')} ${s[k][s[k].length - 1]}%</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(s.label)}, ${ys[0]} to ${ys[ys.length - 1]}"><title>${esc(s.label)}</title>${g}</svg>`;
  }

  function trendsHTML(esc) {
    const D = X(), S = D.stats || {};
    const last = o => o ? `${o.v[o.v.length - 1]}%` : '–';
    const lastY = o => o ? o.years[o.years.length - 1] : '';
    const m = S.modules;
    const tbl = m ? `<details><summary>Show the Numbers as a Table</summary><div class="ex-tblwrap"><table class="ex-tbl"><thead><tr><th>Year</th><th>Module 1</th><th>Module 2</th><th>Module 3</th></tr></thead><tbody>${m.years.map((yr, i) => `<tr><td>${yr}</td><td>${m.M1[i]}%</td><td>${m.M2[i]}%</td><td>${m.M3[i]}%</td></tr>`).join('')}</tbody></table></div></details>` : '';
    return `<div class="ex-stats">
      <div class="ex-stat"><span class="hint">Paper 01 mean (${lastY(S.paper1)})</span><span class="big">${last(S.paper1)}</span><span class="hint">Steady at about 60–70%</span></div>
      <div class="ex-stat"><span class="hint">Paper 02 mean (${lastY(S.paper2)})</span><span class="big">${last(S.paper2)}</span><span class="hint">Close to 50% since 2018</span></div>
      <div class="ex-stat"><span class="hint">Paper 032 mean (${lastY(S.p032)})</span><span class="big">${last(S.p032)}</span><span class="hint">Between about 42% and 50%</span></div>
    </div>
    ${m ? `<div class="card ex-chart" style="margin-top:12px"><h3>Module Performance, ${m.years[0]}–${m.years[m.years.length - 1]}</h3><p class="hint">${esc(m.label)}. Hover or tap a point for its value.</p>
      <div class="ex-legend" aria-hidden="true"><span><i style="background:var(--ex-s1)"></i>Module 1</span><span><i style="background:var(--ex-s2)"></i>Module 2</span><span><i style="background:var(--ex-s3)"></i>Module 3</span></div>
      ${chartSVG(esc)}${tbl}</div>` : ''}
    <div class="card" style="margin-top:12px"><h3>Over the Years…</h3><ul class="ex-trends">${(D.trends || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>
    ${(D.quotes || []).length ? `<div class="card" style="margin-top:12px"><h3>In the Examiners' Words</h3><ul class="ex-trends">${D.quotes.map(q => `<li><span class="ex-quote">“${esc(q.text)}”</span> <span class="hint">(${q.year}, on ${esc(q.about)})</span></li>`).join('')}</ul></div>` : ''}`;
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'examiner',
    title: "Examiner's Corner",
    tile: { icon: '📝', meta: 'What examiners keep seeing, how to fix it, and a pre-exam checklist' },
    render(api, loc) {
      const esc = api.esc, D = X();
      const tab = TABS.some(t => t[0] === loc.tab) ? loc.tab : 'top';
      const body = !D.insights.length ? '<p class="fb note">Examiner insights are not loaded.</p>'
        : tab === 'all' ? allHTML(esc) : tab === 'check' ? checkTabHTML(api, esc) : tab === 'trends' ? trendsHTML(esc) : topHTML(esc);
      return `<div class="hero"><span class="eyebrow">Learn Smarter</span><h1>Examiner's Corner</h1><p>Every year CXC examiners report where candidates lose marks. Here are those lessons from ${D.years.length} subject reports, with original examples so you can see the difference between a weak and a strong answer.</p></div>
      <div class="card">
        <div class="chips ex-tabs" role="tablist" aria-label="Examiner's Corner sections">${TABS.map(([k, l]) => `<button type="button" role="tab" aria-selected="${tab === k}" class="chip ${tab === k ? 'sel' : ''}" data-go="examiner" data-tab="${k}">${esc(l)}</button>`).join('')}</div>
        ${body}
        <p class="hint ex-src">${esc(D.source || 'Based on CXC CAPE Communication Studies subject reports, 2016–2025 (paraphrased)')}. Examples and self-checks are original.</p>
      </div>`;
    },
    mount(api, loc, stage) {
      stage.querySelectorAll('details[data-exd]').forEach(d => d.addEventListener('toggle', () => { opened[d.dataset.exd] = d.open; }));
    },
    click(action, el, api) {
      const k = el.dataset.k;
      if (action === 'fmod') { fMod = k; api.render(); return; }
      if (action === 'fpap') { fPap = k; api.render(); return; }
      if (action === 'tick') {
        const t = ticks(api).slice(); const i = t.indexOf(k);
        if (i >= 0) t.splice(i, 1); else t.push(k);
        api.S.exm = t; api.save();
        const on = i < 0; el.setAttribute('aria-pressed', String(on)); el.querySelector('.bx').textContent = on ? '✓' : '';
        const all = X().insights.length, n = X().insights.filter(x => t.includes(x.id)).length;
        const bar = el.closest('.card').querySelector('.pbar'); if (bar) { bar.querySelector('i').style.width = Math.round(n / all * 100) + '%'; bar.setAttribute('aria-label', `${n} of ${all} ticked`); const h = bar.nextElementSibling; if (h) h.textContent = `${n} of ${all} ready${n === all ? ' · Exam-ready habits all ticked!' : ''}`; }
        if (on && n === all) api.toast('Every exam habit ticked. You are ready!');
        return;
      }
      if (action === 'untick') { api.S.exm = []; api.save(); api.render(); return; }
      if (action === 'ans') {
        if (ans[k] != null) return;
        const ins = X().insights.find(x => x.id === k); if (!ins || !ins.check) return;
        const j = +el.dataset.i; ans[k] = j;
        const right = j === ins.check.a;
        // update every rendering of this check in place (keeps open <details> open)
        document.querySelectorAll(`[data-exq="${CSS_ESC(k)}"]`).forEach(box => {
          box.querySelectorAll('.opt').forEach((b, bi) => { b.setAttribute('aria-disabled', 'true'); if (bi === ins.check.a) b.classList.add('right'); else if (bi === j) b.classList.add('wrong'); });
          const fb = box.querySelector('.ex-fb'); if (fb) fb.innerHTML = `<p class="fb ${right ? 'good' : 'bad'}">${right ? '✓ Correct.' : '✗ Not quite.'} ${api.esc(ins.check.why)}</p>`;
        });
        if (right && !paid[k]) { paid[k] = 1; api.reward(2, 'Examiner self-check'); } else if (!right) api.chime('bad');
      }
    }
  });
  function CSS_ESC(s) { return String(s).replace(/[^a-zA-Z0-9_-]/g, '\\$&'); }
})();
