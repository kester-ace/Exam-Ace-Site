/* Quiz Centre: plays the same quizzes as the QTI packages (window.COURSE_QUIZBANK), inside the course.
   Works in the plain HTML file, SCORM and any host. View id: qc. */
(function () {
  const CSS = `
.qc-pk{margin-top:6px}
.qc-item{border:1.5px solid var(--line);border-radius:14px;padding:14px 16px;margin:12px 0;background:var(--surface)}
.qc-item.ok{border-color:var(--ok)}.qc-item.no{border-color:var(--bad)}
.qc-num{font-weight:800;color:var(--gold);margin-right:6px}
.qc-q{margin:4px 0 10px}
.qc-q blockquote{margin:0 0 10px;border-left:4px solid var(--gold);padding:8px 12px;border-radius:0 10px 10px 0;background:color-mix(in srgb,var(--gold) 8%,transparent)}
.qc-opt{display:flex;gap:10px;align-items:flex-start;width:100%;text-align:left;font:inherit;color:inherit;background:transparent;border:2px solid var(--line);border-radius:12px;padding:9px 12px;margin:6px 0;cursor:pointer}
.qc-opt .L{flex:none;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;border:1.5px solid currentColor;font-weight:800;font-size:.85rem}
.qc-opt.sel{border-color:var(--gold);box-shadow:inset 0 0 0 2px var(--gold)}
.qc-opt.right{border-color:var(--ok)}.qc-opt.wrong{border-color:var(--bad)}
.qc-opt:disabled{cursor:default}
.qc-fb{margin-top:8px;padding:8px 12px;border-radius:10px;background:color-mix(in srgb,var(--gold) 9%,transparent)}
.qc-match{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px 12px;align-items:center}
.qc-match select{width:100%;font:inherit;padding:8px;border-radius:10px;border:2px solid var(--line);background:var(--surface);color:var(--ink)}
.qc-match select.right{border-color:var(--ok)}.qc-match select.wrong{border-color:var(--bad)}
.qc-ta{width:100%;min-height:200px;font:inherit;padding:12px;border-radius:12px;border:2px solid var(--line);background:var(--surface);color:var(--ink)}
.qc-score{font-weight:800;font-size:2.2rem;color:var(--gold)}
.qc-tbl{width:100%;border-collapse:collapse}.qc-tbl td{padding:7px 6px;border-bottom:1px solid var(--line)}
@media (max-width:560px){.qc-match{grid-template-columns:minmax(0,1fr)}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  const BANK = () => window.COURSE_QUIZBANK || [];
  let cur = null; // { key, ans: {}, essay: {}, done: false, key: bool }
  const L = 'ABCDEFGHIJ';

  function words(t) { return (t || '').trim() ? t.trim().split(/\s+/).length : 0; }
  function quizKey(p, q) { return BANK()[p].pkg + ' :: ' + BANK()[p].quizzes[q].title; }
  function best(api, k) { const b = (api.S.qc || {})[k]; return b == null ? null : b; }

  function itemPoints(it) { return it.t === 'match' ? it.left.length : it.t === 'mc' || it.t === 'ma' ? 1 : 0; }
  function itemScore(it, a) {
    if (it.t === 'mc') return a === it.correct ? 1 : 0;
    if (it.t === 'ma') { const s = a || []; return it.options.every((_, k) => it.correct.includes(k) === s.includes(k)) ? 1 : 0; }
    if (it.t === 'match') return it.left.reduce((n, _, k) => n + ((a || {})[k] === it.correct[k] ? 1 : 0), 0);
    return 0;
  }

  function listHTML(api) {
    const esc = api.esc;
    let h = `<section class="hero"><span class="eyebrow">Practise anywhere</span><h1>Quiz Centre</h1><p>Every topic quiz, end-of-module test and past paper in one place: the same quizzes your teacher can load into an LMS, ready to take right here. Auto-marked questions are scored instantly with feedback; essay questions give you the marking guide and a model answer after you submit.</p></section>`;
    BANK().forEach((p, pi) => {
      h += `<div class="card qc-pk"><h3>${esc(p.pkg)}</h3><div class="list">${p.quizzes.map((q, qi) => {
        const b = best(api, quizKey(pi, qi)), auto = q.items.reduce((n, it) => n + itemPoints(it), 0), ess = q.items.filter(it => it.t === 'essay').length;
        return `<button type="button" class="lrow" data-go="qc" data-tab="${pi}" data-k="${qi}"><span class="t"><b>${esc(q.title)}</b><br><span class="hint">${q.items.filter(i => i.t !== 'text').length} questions${auto ? ' · ' + auto + ' auto-marked points' : ''}${ess ? ' · ' + ess + ' essay' + (ess > 1 ? 's' : '') : ''}${q.minutes ? ' · ' + q.minutes + ' min' : ''}</span></span><span class="s">${b != null ? (auto ? 'best ' + b + '%' : 'attempted') : ''}</span></button>`;
      }).join('')}</div></div>`;
    });
    return h;
  }

  function quizHTML(api, pi, qi) {
    const esc = api.esc, P = BANK()[pi], Q = P && P.quizzes[qi];
    if (!Q) return `<div class="card"><p>Quiz not found.</p></div>`;
    const k = quizKey(pi, qi);
    if (!cur || cur.k !== k) cur = { k, ans: {}, essay: {}, done: false, showKey: false };
    const showAns = cur.done || cur.showKey;
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="qc">← Quiz Centre</button><span>${esc(P.pkg)}</span></div>`;
    h += `<div class="card"><span class="kicker">${esc(P.pkg)}</span><h2>${esc(Q.title)}</h2>${Q.desc ? `<div class="html-body">${Q.desc}</div>` : ''}${Q.minutes ? `<p class="hint">Suggested time: ${Q.minutes} minutes.</p>` : ''}
${api.S.teacher && !cur.done ? `<div class="row"><button type="button" class="btn ghost" data-px="key" data-pv="qc">${cur.showKey ? 'Hide' : 'Show'} answer key (teacher)</button></div>` : ''}</div>`;
    let n = 0;
    if (cur.done) {
      const auto = Q.items.reduce((a, it) => a + itemPoints(it), 0), got = Q.items.reduce((a, it, i) => a + itemScore(it, cur.ans[i]), 0);
      const ess = Q.items.filter(it => it.t === 'essay');
      h += `<div class="card"><h3>Your results</h3>${auto ? `<p class="qc-score">${got} / ${auto} <small style="font-size:1rem">(${Math.round(got / auto * 100)}%)</small></p><p class="hint">Auto-marked questions.</p>` : ''}${ess.length ? `<p>${ess.length} essay question${ess.length > 1 ? 's are' : ' is'} worth ${ess.reduce((a, e) => a + e.points, 0)} marks. Compare your answer with the marking guide and model answer under each essay, or hand it to your teacher.</p>` : ''}<div class="row"><button type="button" class="btn gold" data-px="retry" data-pv="qc">Try again</button><button type="button" class="btn ghost" data-go="qc">All quizzes</button></div></div>`;
    }
    h += Q.items.map((it, i) => {
      if (it.t === 'text') return `<div class="card"><div class="html-body">${it.q}</div></div>`;
      n++;
      const a = cur.ans[i], sc = cur.done ? itemScore(it, a) : null, full = itemPoints(it);
      let cls = cur.done && it.t !== 'essay' ? (sc === full ? 'ok' : 'no') : '';
      let body = `<div class="qc-q html-body">${it.q}</div>`;
      if (it.t === 'mc') body += it.options.map((o, oi) => { let c = a === oi ? 'sel' : ''; if (showAns && oi === it.correct) c = 'right'; else if (cur.done && a === oi) c = 'wrong'; return `<button type="button" class="qc-opt ${c}" data-px="mc" data-pv="qc" data-i="${i}" data-o="${oi}"${cur.done ? ' disabled' : ''}><span class="L">${L[oi]}</span><span>${o}</span></button>`; }).join('')
        + (cur.done ? `${it.fb && it.fb[a] ? `<div class="qc-fb">${it.fb[a]}</div>` : ''}${it.why ? `<div class="qc-fb">${it.why}</div>` : ''}` : '');
      if (it.t === 'ma') body += `<p class="hint">Select every correct option.</p>` + it.options.map((o, oi) => { const on = (a || []).includes(oi); let c = on ? 'sel' : ''; if (showAns && it.correct.includes(oi)) c = 'right'; else if (cur.done && on) c = 'wrong'; return `<button type="button" class="qc-opt ${c}" data-px="ma" data-pv="qc" data-i="${i}" data-o="${oi}" aria-pressed="${on}"${cur.done ? ' disabled' : ''}><span class="L">${on ? '✓' : L[oi]}</span><span>${o}</span></button>`; }).join('') + (cur.done && it.why ? `<div class="qc-fb">${it.why}</div>` : '');
      if (it.t === 'match') body += `<div class="qc-match">${it.left.map((l, li) => { const v = (a || {})[li]; const c = cur.done ? (v === it.correct[li] ? 'right' : 'wrong') : ''; return `<div>${esc(l)}</div><select class="${c}" data-qm="${i}-${li}" aria-label="Match for ${esc(l)}"${cur.done ? ' disabled' : ''}><option value="">Choose…</option>${it.right.map((r, ri) => `<option value="${ri}"${v === ri ? ' selected' : ''}>${esc(r)}</option>`).join('')}</select>${showAns && v !== it.correct[li] ? `<div></div><div class="hint">Answer: ${esc(it.right[it.correct[li]])}</div>` : ''}`; }).join('')}</div>`;
      if (it.t === 'essay') body += `<p class="hint">${it.points} marks</p><label class="sr" for="qce-${i}">Your answer</label><textarea id="qce-${i}" class="qc-ta" data-qe="${i}"${cur.done ? ' readonly' : ''}>${esc(cur.essay[i] || '')}</textarea><p class="hint" id="qcw-${i}">${words(cur.essay[i])} words</p>${showAns && it.fb ? `<details${cur.done ? ' open' : ''}><summary><b>Marking guide and model answer</b></summary><div class="html-body">${it.fb}</div></details>` : ''}`;
      return `<article class="qc-item ${cls}"><div><span class="qc-num">${n}.</span><b>${esc(it.title)}</b>${full ? ` <span class="hint">· ${full} mark${full > 1 ? 's' : ''}</span>` : ''}${cur.done && full ? ` <span class="hint">· you scored ${sc}</span>` : ''}</div>${body}</article>`;
    }).join('');
    if (!cur.done) h += `<div class="nav"><span class="hint">${Object.keys(cur.ans).length} answered</span><button type="button" class="btn go" data-px="submit" data-pv="qc">Submit and see feedback</button></div>`;
    return h;
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'qc',
    title: 'Quiz Centre',
    tile: { icon: '📝', meta: 'Every topic quiz, module test and past paper, auto-marked with feedback.' },
    render(api, loc) { return loc.tab != null && loc.k != null ? quizHTML(api, +loc.tab, +loc.k) : listHTML(api); },
    mount(api, loc, stage) {
      if (!stage) return;
      stage.querySelectorAll('select[data-qm]').forEach(sel => sel.addEventListener('change', () => {
        const [i, li] = sel.dataset.qm.split('-').map(Number); cur.ans[i] = cur.ans[i] || {}; if (sel.value === '') delete cur.ans[i][li]; else cur.ans[i][li] = +sel.value;
      }));
      stage.querySelectorAll('textarea[data-qe]').forEach(ta => ta.addEventListener('input', () => {
        const i = +ta.dataset.qe; cur.essay[i] = ta.value; cur.ans[i] = cur.ans[i] || 'essay'; const w = document.getElementById('qcw-' + i); if (w) w.textContent = words(ta.value) + ' words';
      }));
    },
    click(action, el, api) {
      if (!cur) return;
      const i = +el.dataset.i, o = +el.dataset.o;
      if (action === 'mc' && !cur.done) { cur.ans[i] = o; api.render(); }
      else if (action === 'ma' && !cur.done) { const s = cur.ans[i] = (cur.ans[i] || []).slice(); const at = s.indexOf(o); if (at >= 0) s.splice(at, 1); else s.push(o); api.render(); }
      else if (action === 'key') { cur.showKey = !cur.showKey; api.render(); }
      else if (action === 'retry') { cur = null; api.render(); window.scrollTo(0, 0); }
      else if (action === 'submit') {
        const m = /^(\d+)$/.test(String(api.S.loc.tab)) ? BANK()[+api.S.loc.tab].quizzes[+api.S.loc.k] : null; if (!m) return;
        cur.done = true; cur.showKey = false;
        const auto = m.items.reduce((a, it) => a + itemPoints(it), 0), got = m.items.reduce((a, it, j) => a + itemScore(it, cur.ans[j]), 0), pct = auto ? Math.round(got / auto * 100) : 0;
        api.S.qc = api.S.qc || {}; const prev = api.S.qc[cur.k]; if (prev == null || pct > prev) api.S.qc[cur.k] = pct; api.save();
        if (prev == null) api.reward(auto ? Math.max(1, Math.round(pct / 20)) : 3, 'Quiz completed', { xp: 10 });
        api.render(); window.scrollTo(0, 0);
      }
    }
  });
})();
