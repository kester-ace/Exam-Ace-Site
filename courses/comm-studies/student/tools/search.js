/* Course Search: one search box for everything in the course, with filters.
   Searches the notes of every unit, activities and quizzes, the glossary, the Essay Writing Workshop,
   the Build-a-Sample essays and the Grade One sample essays; in the Teacher's Version it also searches
   teacher's notes and model answers. Filters by area (Module 1–3, Paper 3, Workshop) and by type.
   View id: find. Opens from the 🔍 Search button in the top bar or Ctrl+K. Kester Small. */
(function () {
  const CSS = `
.fd-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.fd-bar input{flex:1 1 260px;min-width:0;font:inherit;font-size:1.05rem;padding:10px 14px;border-radius:12px;border:2px solid var(--line);background:var(--surface);color:var(--ink);-webkit-user-select:text;user-select:text}
.fd-bar input:focus{outline:none;border-color:var(--gold)}
.fd-f{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0}
.fd-f .lab{font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);align-self:center;margin-right:4px;min-width:64px}
.fd-chip{font:inherit;font-size:.88rem;color:var(--ink);background:transparent;border:1.5px solid var(--line);border-radius:999px;padding:4px 12px;cursor:pointer}
.fd-chip[aria-pressed="true"]{border-color:var(--gold);background:color-mix(in srgb,var(--gold) 18%,transparent);font-weight:700}
.fd-chip .n{opacity:.7;font-variant-numeric:tabular-nums;margin-left:4px;font-weight:400}
.fd-res{display:grid;gap:8px;margin-top:10px}
.fd-hit{display:block;width:100%;text-align:left;font:inherit;color:inherit;background:var(--surface);border:1.5px solid var(--line);border-radius:12px;padding:10px 14px;cursor:pointer}
.fd-hit:hover,.fd-hit:focus-visible{border-color:var(--gold);outline:none}
.fd-hit .w{display:flex;gap:8px;flex-wrap:wrap;align-items:center;font-size:.78rem;color:var(--muted);margin-bottom:3px}
.fd-hit .w b{color:var(--gold);font-weight:800;letter-spacing:.04em;text-transform:uppercase}
.fd-hit .t{font-weight:700;display:block}
.fd-hit .s{display:block;margin-top:2px;line-height:1.5}
.fd-hit mark,.fd-sum mark{background:color-mix(in srgb,var(--gold) 55%,transparent);color:inherit;border-radius:3px;padding:0 2px}
.fd-sum{margin:10px 0 0;color:var(--muted)}
.hbtn.fd-open{white-space:nowrap}`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  const strip = h => String(h || '').replace(/\{\{\d+\|([\s\S]*?)\}\}/g, '$1').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const AREAS = [['all', 'All'], ['M1', 'Module 1'], ['M2', 'Module 2'], ['M3', 'Module 3'], ['P3', 'Paper 3'], ['WS', 'Essay Workshop']];
  const TYPES = [['all', 'Everything'], ['notes', 'Notes'], ['act', 'Activities and quizzes'], ['gloss', 'Glossary'], ['ws', 'Workshop lessons'], ['samples', 'Sample essays'], ['teach', "Teacher's notes"]];
  let IDX = null, F = { q: '', a: 'all', t: 'all' };

  function build(api) {
    const out = [], T = !!api.S.teacher;
    const add = (o) => { o.x = (o.title + ' ' + o.text).toLowerCase(); out.push(o); };
    (window.COURSE_MODULES || []).forEach(m => {
      m.units.forEach((u, ui) => u.screens.forEach((s, si) => {
        const where = `${m.code} · Unit ${ui + 1}: ${u.title}`, go = { go: 'screen', m: m.id, u: ui, s: si };
        if (s.type === 'learn') add({ a: m.id, t: 'notes', title: s.title, where, text: strip(s.html) + ' ' + strip(s.deeper) + ' ' + strip(s.plain), go });
        else if (s.type !== 'checkin') {
          const bits = [s.intro, s.q, s.prompt, s.passage, s.frame, s.main].map(strip);
          (s.options || []).forEach(o => bits.push(strip(o.t || o)));
          (s.items || []).forEach(o => bits.push(strip(o.t || o.text || o.q || '')));
          (s.pairs || []).forEach(o => bits.push(strip(o.l) + ' ' + strip(o.r)));
          (s.blocks || []).forEach(o => bits.push(strip(o.t)));
          (s.lines || []).forEach(o => bits.push(strip(o)));
          (s.checklist || []).forEach(o => bits.push(strip(o)));
          add({ a: m.id, t: 'act', title: s.title || 'Activity', where, text: bits.join(' '), go });
          if (T && (s.model || s.teacherTip)) add({ a: m.id, t: 'teach', title: 'Model and teacher tip: ' + (s.title || 'Writing task'), where, text: strip(s.model) + ' ' + strip(s.teacherTip), go });
        }
      }));
      if (m.test && m.test.items) add({ a: m.id, t: 'act', title: m.test.title || 'Module test', where: m.code, text: m.test.items.map(i => strip(i.q) + ' ' + (i.options || []).map(strip).join(' ')).join(' '), go: { go: 'test', m: m.id } });
      if (m.paper2) {
        add({ a: m.id, t: 'act', title: 'Exam essay practice: ' + m.paper2.title, where: m.code, text: strip(m.paper2.stimulus) + ' ' + strip(m.paper2.prompt) + ' ' + strip(m.paper2.frame), go: { go: 'paper2', m: m.id } });
        if (T) add({ a: m.id, t: 'teach', title: 'Model answer: ' + m.paper2.title, where: m.code, text: strip(m.paper2.model) + ' ' + strip(m.paper2.teacherTip), go: { go: 'paper2', m: m.id } });
      }
    });
    const G = window.COURSE_GLOSSARY;
    if (G && G.terms) G.terms.forEach(g => {
      const ms = (g.m || []).map(x => x === 'P' || x === 'S' ? 'P3' : 'M' + x);
      add({ a: ms[0] || 'all', as: ms, t: 'gloss', title: g.t, where: 'Glossary', text: (g.d || []).map(strip).join(' '), go: { go: 'glossary' } });
    });
    const W = window.COURSE_WORKSHOP;
    if (W) {
      W.chapters.forEach(c => {
        const where = `Essay Writing Workshop · Chapter ${c.n}`, go = { go: 'ww', k: c.id };
        add({ a: 'WS', t: 'ws', title: c.title, where, text: strip(c.html) + ' ' + (c.objectives || []).join(' ') + (c.mnemonic ? ' ' + c.mnemonic.word + ' ' + c.mnemonic.phrase + ' ' + c.mnemonic.letters.map(l => l.join(' ')).join(' ') : ''), go });
        if (c.check) add({ a: 'WS', t: 'act', title: 'Quick check: ' + c.title, where, text: c.check.map(q => strip(q.q) + ' ' + q.o.map(strip).join(' ')).join(' '), go });
        if (c.task) add({ a: 'WS', t: 'act', title: 'Try it: ' + c.title, where, text: strip(c.task.prompt) + ' ' + c.task.checklist.join(' '), go });
        if (T && c.teacher) add({ a: 'WS', t: 'teach', title: "Teacher's notes: " + c.title, where, text: c.teacher.plan.map(strip).join(' ') + ' ' + c.teacher.errors.map(strip).join(' ') + ' ' + strip(c.teacher.answers) + ' ' + strip(c.teacher.extend), go });
      });
      W.builds.forEach(b => add({ a: 'WS', t: 'samples', title: 'Build-a-Sample: ' + b.title, where: `Essay Writing Workshop · ${b.name}`, text: strip(b.question) + ' ' + b.steps.map(s => s.label + ' ' + strip(s.html)).join(' ') + ' ' + b.final.join(' '), go: { go: 'ww', k: b.id } }));
    }
    const SM = window.COURSE_SAMPLES;
    if (SM) {
      const area = { m1: 'M1', m2: 'M2', m3: 'M3', p3: 'P3' };
      Object.keys(area).forEach(k => {
        const v = SM[k]; const lists = Array.isArray(v) ? [['', v]] : Object.entries(v || {});
        lists.forEach(([genre, arr]) => (arr || []).forEach(e => add({ a: area[k], t: 'samples', title: (genre ? genre.charAt(0).toUpperCase() + genre.slice(1) + ' sample: ' : 'Sample essay: ') + (e.title || ''), where: 'Sample Essays', text: strip(e.prompt) + ' ' + (Array.isArray(e.essay) ? e.essay.map(strip).join(' ') : strip(e.essay)), go: { go: 'genres', tab: k } })));
      });
    }
    return out;
  }
  const inArea = (o, a) => a === 'all' || o.a === a || (o.as && o.as.includes(a));
  function results(api) {
    if (!IDX) IDX = build(api);
    const q = F.q.trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    const base = IDX.filter(o => (!terms.length || terms.every(t => o.x.includes(t))));
    const counts = { a: {}, t: {} };
    base.forEach(o => { if (F.t === 'all' || o.t === F.t) AREAS.forEach(([k]) => { if (k !== 'all' && inArea(o, k)) counts.a[k] = (counts.a[k] || 0) + 1; }); if (inArea(o, F.a)) counts.t[o.t] = (counts.t[o.t] || 0) + 1; });
    const list = base.filter(o => inArea(o, F.a) && (F.t === 'all' || o.t === F.t));
    if (terms.length) list.sort((x, y) => score(y, terms) - score(x, terms));
    return { list, counts, terms };
  }
  function score(o, terms) { let s = 0; const tl = o.title.toLowerCase(); terms.forEach(t => { if (tl.includes(t)) s += 10; s += Math.min(5, o.x.split(t).length - 1); }); if (o.t === 'gloss' && terms.length && o.title.toLowerCase() === terms.join(' ')) s += 50; return s; }
  function snip(api, text, terms) {
    if (!terms.length) return api.esc(text.slice(0, 180)) + (text.length > 180 ? '…' : '');
    const low = text.toLowerCase(); let at = low.indexOf(terms[0]); if (at < 0) at = 0;
    const a = Math.max(0, at - 70), b = Math.min(text.length, at + 170);
    let s = api.esc(text.slice(a, b));
    terms.forEach(t => { s = s.replace(new RegExp(reEsc(api.esc(t)), 'gi'), x => `<mark>${x}</mark>`); });
    return (a > 0 ? '…' : '') + s + (b < text.length ? '…' : '');
  }
  const TL = { notes: 'Notes', act: 'Activity', gloss: 'Glossary', ws: 'Workshop', samples: 'Sample', teach: "Teacher's notes" };
  const AL = { M1: 'Module 1', M2: 'Module 2', M3: 'Module 3', P3: 'Paper 3', WS: 'Workshop', all: 'Course' };
  function hitsHTML(api) {
    const { list, counts, terms } = results(api), esc = api.esc, T = !!api.S.teacher;
    const chips = (set, key, cnt) => set.filter(([k]) => k !== 'teach' || T).map(([k, l]) => `<button type="button" class="fd-chip" data-px="f${key}" data-pv="find" data-k="${k}" aria-pressed="${F[key] === k}">${esc(l)}${k !== 'all' ? `<span class="n">${cnt[k] || 0}</span>` : ''}</button>`).join('');
    const go = o => Object.entries(o.go).map(([k, v]) => `data-${k === 'go' ? 'go' : k}="${esc(v)}"`).join(' ');
    const shown = list.slice(0, 150);
    return `<div class="fd-f" role="group" aria-label="Filter by area"><span class="lab">Area</span>${chips(AREAS, 'a', counts.a)}</div>
<div class="fd-f" role="group" aria-label="Filter by type"><span class="lab">Type</span>${chips(TYPES, 't', counts.t)}</div>
<p class="fd-sum" aria-live="polite">${terms.length ? `${list.length} result${list.length === 1 ? '' : 's'} for “${esc(F.q.trim())}”` : `${list.length} items you can browse. Type to search.`}${list.length > 150 ? ' · showing the best 150' : ''}</p>
<div class="fd-res">${shown.map(o => `<button type="button" class="fd-hit" ${go(o)}><span class="w"><b>${esc(TL[o.t] || '')}</b><span>${esc(AL[o.a] || '')}</span><span>${esc(o.where)}</span></span><span class="t">${snip(api, o.title, terms)}</span><span class="s">${snip(api, o.text, terms)}</span></button>`).join('')}</div>`;
  }
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'find',
    title: 'Search the Course',
    tile: { icon: '🔍', meta: 'Search every note, activity, glossary term, workshop lesson and sample essay, with filters.' },
    render(api, loc) {
      if (loc && loc.k && !F.q) F.q = String(loc.k);
      return `<section class="hero"><span class="eyebrow">Find anything</span><h1>Search the Course</h1><p>Search every unit's notes, activities and quizzes, the glossary, the Essay Writing Workshop and the sample essays. Filter by area and type, then select a result to open it.${api.S.teacher ? " Teacher's notes and model answers are included in this version." : ''} Shortcut: <b>Ctrl+K</b>.</p></section>
<div class="card"><div class="fd-bar"><label class="sr" for="fd-q">Search the course</label><input id="fd-q" type="search" placeholder="Try: thesis, PEEL, code-switching, justification, CRAAP" value="${api.esc(F.q)}" autocomplete="off" spellcheck="false"><button type="button" class="btn ghost" data-px="clear" data-pv="find">Clear</button></div><div id="fd-out">${hitsHTML(api)}</div></div>`;
    },
    mount(api, loc, stage) {
      const q = stage && stage.querySelector('#fd-q'); if (!q) return;
      let t = 0; q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { F.q = q.value; const o = document.getElementById('fd-out'); if (o) o.innerHTML = hitsHTML(api); }, 160); });
      q.addEventListener('keydown', e => e.stopPropagation());
      setTimeout(() => { try { q.focus(); const n = q.value.length; q.setSelectionRange(n, n); } catch (e) { } }, 40);
    },
    click(action, el, api) {
      if (action === 'flip') { if (window.COURSE_FLIPBOOK) window.COURSE_FLIPBOOK.open(); return; }
      if (action === 'fa') F.a = el.dataset.k; else if (action === 'ft') F.t = el.dataset.k; else if (action === 'clear') { F.q = ''; F.a = 'all'; F.t = 'all'; }
      else return;
      api.render();
    }
  });
  /* a result inside a unit the student has not reached yet: say so and offer the flipbook */
  document.addEventListener('click', e => {
    const h = e.target.closest && e.target.closest('.fd-hit'); if (!h) return;
    setTimeout(() => {
      if (!/(^|&|#)v=find(&|$)/.test(location.hash)) return;
      const api = window.COURSE_API; if (!api) return;
      const o = document.getElementById('fd-out'); if (!o || o.querySelector('.fd-lock')) return;
      o.insertAdjacentHTML('afterbegin', '<div class="card fd-lock" role="status" style="border-color:var(--gold)"><p><b>That unit is still locked in your course path.</b> It opens when you reach it. You can read the same notes now in the flipbook, which you can search too.</p><div class="row"><button type="button" class="btn gold" data-px="flip" data-pv="find">📖 Read it in the flipbook</button></div></div>');
    }, 350);
  }, true);
  /* top-bar button and Ctrl+K */
  function launcher() {
    const top = document.querySelector('header.top .top-in'); if (!top || top.querySelector('[data-fdopen]')) return;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'hbtn fd-open'; b.setAttribute('data-fdopen', '1'); b.setAttribute('data-go', 'find'); b.title = 'Search the course (Ctrl+K)'; b.textContent = '🔍 Search';
    const g = top.querySelector('[data-fbopen]') || top.querySelector('[data-go="glossary"]'); if (g) top.insertBefore(b, g); else top.appendChild(b);
  }
  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && (e.key || '').toLowerCase() === 'k') { e.preventDefault(); try { window.COURSE_API.go({ v: 'find' }); } catch (x) { location.hash = 'v=find'; } } });
  const start = () => { launcher(); setTimeout(launcher, 1500); setTimeout(launcher, 4000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else setTimeout(start, 0);
})();
