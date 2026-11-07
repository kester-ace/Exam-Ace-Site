/* Sage offline brain: answers from the course glossary and unit outlines, and runs a
   local Test me quiz (open question or multiple choice) with hot / warm / chilly marking.
   Works with no internet. Kester Small */
(function () {
  'use strict';
  const E = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const STOP = new Set('a an the of to in on and or for is are was were be been being what whats whatsthe does do did mean means meaning define definition explain tell me about how why who which can you please i my it this that with by as at from give example examples term word called its their them they he she we us our your you also any such into than then there these those over under more most less some other another each both few many much very so not no nor only own same too s t just now'.split(' '));
  const norm = s => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const words = s => norm(s).split(' ').filter(w => w && !STOP.has(w));
  const pick = a => a[Math.floor(Math.random() * a.length)];

  let IDX = null;
  function build() {
    IDX = { terms: [], units: [] };
    try {
      const G = window.COURSE_GLOSSARY, terms = (G && G.terms) || [];
      terms.forEach(t => {
        const name = String(t.t || '').replace(/\s*\([^)]*\)\s*/g, ' ').trim();
        const def = (t.d || []).join(' ').trim();
        if (!name) return;
        IDX.terms.push({
          t: t, name: name, def: def, cat: t.c || '',
          key: norm(name), w: words(name),
          refs: (t.r || []).map(r => (G.refs && G.refs[r]) || '').filter(Boolean),
          dw: words(def).filter(w => w.length > 3)
        });
      });
    } catch (e) { }
    try {
      (window.COURSE_MODULES || []).forEach(m => (m.units || []).forEach((u, i) => {
        IDX.units.push({ m: m, u: u, i: i, w: words(u.title + ' ' + (u.objectives || []).join(' ')), tw: words(u.title) });
      }));
    } catch (e) { }
  }
  const idx = () => { if (!IDX) build(); return IDX; };

  /* ---------- plain questions ---------- */
  function termScore(q, qw, x) {
    if (!x.key) return 0;
    if (q === x.key) return 100;
    if ((' ' + q + ' ').includes(' ' + x.key + ' ')) return 40 + x.key.length;
    if (!x.w.length) return 0;
    const hit = x.w.filter(w => qw.includes(w) || qw.includes(w.replace(/s$/, ''))).length;
    return hit === x.w.length && hit ? 20 + hit * 5 - Math.max(0, qw.length - hit) : 0;
  }
  function termHTML(x) {
    const body = (x.t.d || []).map(v => `<p>${E(v)}</p>`).join('');
    const cat = catOf(x);
    const bits = [];
    if (cat) bits.push('Topic: ' + cat);
    if (x.refs && x.refs.length) bits.push('Covered in ' + x.refs.join('; '));
    const where = bits.length ? `<p class="hint">${E(bits.join(' \u00b7 '))}</p>` : '';
    return `<p><b>${E(x.t.t)}</b></p>${body}${where}${glossBtn(x.t.t)}`;
  }
  function answer(q) {
    const I = idx(), qn = norm(q), qw = words(q);
    if (!qw.length) return null;
    let best = null, bs = 0;
    I.terms.forEach(x => { const sc = termScore(qn, qw, x); if (sc > bs) { bs = sc; best = x; } });
    if (best && bs >= 20) {
      const also = I.terms.filter(x => x !== best && termScore(qn, qw, x) >= 20).slice(0, 3);
      const more = also.length ? `<p class="hint">Related: ${also.map(x => E(x.t.t)).join(', ')}</p>` : '';
      return { score: bs, html: termHTML(best) + more + `<p>Try saying it back in your own words.</p>`, text: best.t.t + ': ' + (best.t.d || []).join(' ') };
    }
    let bu = null, us = 0;
    I.units.forEach(x => { let sc = 0; qw.forEach(w => { if (x.tw.includes(w)) sc += 3; else if (x.w.includes(w)) sc += 1; }); if (sc > us) { us = sc; bu = x; } });
    if (bu && us >= 4) {
      const obj = (bu.u.objectives || []).slice(0, 6).map(o => `<li>${E(o)}</li>`).join('');
      return { score: us, html: `<p><b>${E(bu.m.title)} › ${E(bu.u.title)}</b></p>${obj ? `<p>In this unit you should be able to:</p><ul>${obj}</ul>` : ''}<p>Open that unit for the full notes.</p>`, text: bu.m.title + ' > ' + bu.u.title };
    }
    return null;
  }

  /* ---------- Test me: course content and the course's own assessments only ---------- */
  const Q = { cur: null, tries: 0, mode: 'open', asked: [], pending: null, src: 'open', miss: 0 };
  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const strip = v => String(v == null ? '' : v).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

  function sectionLabel(loc) {
    try {
      const M = window.COURSE_MODULES || [];
      const i = M.findIndex(m => m.id === (loc && loc.m));
      if (i < 0) return '';
      return 'Section ' + ROMAN[i + 1];
    } catch (e) { return ''; }
  }

  let BANK = null;
  function bankPool(loc) {
    if (!BANK) {
      BANK = [];
      try {
        (window.COURSE_QUIZBANK || []).forEach(pk => (pk.quizzes || []).forEach(qz => (qz.items || []).forEach(it => {
          if (it.t !== 'mc' || !it.q || !(it.options || []).length) return;
          if (typeof it.correct !== 'number' || !it.options[it.correct]) return;
          BANK.push({ it: it, where: strip(qz.title) || strip(pk.pkg), pkg: strip(pk.pkg), key: strip(it.q).slice(0, 40) });
        })));
      } catch (e) { BANK = []; }
    }
    if (!BANK.length) return [];
    const lab = sectionLabel(loc);
    let pool = BANK;
    if (lab) {
      const re = new RegExp(lab + '(?![IVX])');
      const near = BANK.filter(x => re.test(x.where + ' ' + x.pkg));
      if (near.length >= 4) pool = near;
    }
    const fresh = pool.filter(x => Q.asked.indexOf(x.key) < 0);
    return fresh.length >= 2 ? fresh : pool;
  }

  function poolFor(loc) {
    const I = idx();
    let pool = I.terms.filter(x => x.def && x.def.length > 25 && x.dw.length >= 3);
    if (loc && loc.m) {
      const near = pool.filter(x => x.refs.some(r => String(r).toLowerCase().indexOf(String(loc.m).toLowerCase()) >= 0));
      if (near.length >= 5) pool = near;
    }
    const fresh = pool.filter(x => Q.asked.indexOf(x.name) < 0);
    return fresh.length >= 3 ? fresh : pool;
  }

  const LETTERS = 'ABCDEFGH';
  function askBank(x) {
    Q.cur = x; Q.tries = 0; Q.mode = 'mcq'; Q.src = 'bank'; Q.pending = null;
    if (Q.asked.indexOf(x.key) < 0) Q.asked.push(x.key);
    Q.right = LETTERS[x.it.correct];
    const li = x.it.options.map((o, i) => `<li><b>${LETTERS[i]}</b> &mdash; ${E(strip(o))}</li>`).join('');
    return { html: `<p>From ${E(x.where || 'your course')}.</p><p><b>${E(strip(x.it.q))}</b></p><ul>${li}</ul><p>Answer with a letter.</p>`, text: strip(x.it.q) };
  }
  function askOpen(x) {
    Q.cur = x; Q.tries = 0; Q.mode = 'open'; Q.src = 'open'; Q.pending = null;
    if (Q.asked.indexOf(x.name) < 0) Q.asked.push(x.name);
    return { html: `<p>Here is one for you.</p><p><b>What does “${E(x.name)}” mean, in your own words?</b></p>`, text: 'What does ' + x.name + ' mean?' };
  }

  /* glossary terms shown as choices, for when a student asks to dial it down */
  function askTermMcq(x) {
    const I = idx();
    const same = I.terms.filter(y => y !== x && y.def && y.def.length > 25 && y.cat === x.cat);
    const any = I.terms.filter(y => y !== x && y.def && y.def.length > 25);
    const wrong = [];
    const src = same.length >= 3 ? same : any;
    for (let i = 0; i < 60 && wrong.length < 3 && src.length; i++) { const c = pick(src); if (c !== x && wrong.indexOf(c) < 0) wrong.push(c); }
    const all = wrong.concat([x]);
    for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = all[i]; all[i] = all[j]; all[j] = t; }
    Q.cur = x; Q.mode = 'mcq'; Q.src = 'term'; Q.tries = 0; Q.pending = null;
    Q.right = LETTERS[all.indexOf(x)];
    if (Q.asked.indexOf(x.name) < 0) Q.asked.push(x.name);
    const li = all.map((y, i) => `<li><b>${LETTERS[i]}</b> &mdash; ${E(y.def.split('. ')[0])}</li>`).join('');
    return { html: `<p><b>Which one describes “${E(x.name)}”?</b></p><ul>${li}</ul><p>Answer with a letter.</p>`, text: 'Which one describes ' + x.name + '?' };
  }

  function nextQuestion(loc, easier) {
    if (easier) {
      const tp = poolFor(loc);
      if (tp.length) return askTermMcq(pick(tp));
    }
    const bp = bankPool(loc);
    const tp = poolFor(loc);
    if (bp.length && (!tp.length || Math.random() < 0.65)) return askBank(pick(bp));
    if (tp.length) return askOpen(pick(tp));
    if (bp.length) return askBank(pick(bp));
    return null;
  }
  function quizStart(loc) { Q.asked = []; Q.miss = 0; Q.pending = null; return nextQuestion(loc, false); }
  function quizNext(loc) { return nextQuestion(loc, Q.src === 'term'); }

  const YES = /^(?:y|yes|yeah|yep|ok|okay|sure|please|yes please|go on|dial it down|easier|simpler|make it easier)[.!]?$/i;
  const NO = /^(?:n|no|nope|not now|no thanks|no thank you|keep going|harder|stay|same level)[.!]?$/i;
  const BADGE = { hot: '🔥 Hot', warm: '🙂 Warm', chilly: '🧊 Chilly' };

  /* what the student had, and what is still missing */
  function partial(x, said) {
    const sw = words(said), got = [], miss = [];
    x.dw.slice(0, 8).forEach(d => {
      const stem = d.replace(/(ing|ed|es|s)$/, '');
      (sw.some(w => w === d || w.indexOf(stem) === 0) ? got : miss).push(d);
    });
    return { got: got, miss: miss };
  }
  function grade(x, said) {
    const pr = partial(x, said), hits = pr.got.length;
    const share = hits / Math.max(1, Math.min(x.dw.length, 8));
    const v = (hits >= 3 || share >= 0.5) ? 'hot' : (hits >= 1 ? 'warm' : 'chilly');
    return { v: v, got: pr.got, miss: pr.miss };
  }
  function whereLine(x) {
    if (Q.src === 'bank') return x.where ? `<p class="hint">Look again at ${E(x.where)}.</p>` : '';
    return x.refs && x.refs.length ? `<p class="hint">It is covered in ${E(x.refs[0])}. The Glossary has it too.</p>` : `<p class="hint">The Glossary has this one.</p>`;
  }
  const glossBtn = term => `<div class="row" style="margin-top:6px"><button type="button" class="chip" data-wbgloss="${E(term || '')}">📖 Open “${E(term || 'the Glossary')}” in the Glossary</button></div>`;
  function catOf(x) { try { return (window.COURSE_GLOSSARY.cats || {})[x.cat] || ''; } catch (e) { return ''; } }
  /* a hint says where to look; it never carries the answer */
  function hintFor(x) {
    const cat = (catOf(x) || '').toLowerCase();
    if (x.refs && x.refs.length) return 'Have a look at ' + x.refs[0] + (cat ? ' — it sits under ' + cat : '') + '.';
    if (cat) return 'It sits under ' + cat + ' in the Glossary.';
    return 'Think about what it does, and where it turns up in your work.';
  }
  const BREAK = `<p>Or we can park it — try a game, a past paper, or take five in the Chill Zone. 🌿</p>`;

  function quizAnswer(said, loc) {
    if (!Q.cur) { const s0 = quizStart(loc); return s0 ? { html: s0.html, text: s0.text } : null; }
    const x = Q.cur, said0 = String(said || '').trim();

    if (Q.pending === 'offer' && (YES.test(said0) || NO.test(said0))) {
      Q.pending = null;
      const easier = YES.test(said0);
      const nx = nextQuestion(loc, easier);
      const lead = easier ? `<p>Dialling it down — choices this time.</p>` : `<p>Good — we stay at this level.</p>`;
      return { html: lead + (nx ? nx.html : `<p>That is all I have for now.</p>`), text: easier ? 'Easier.' : 'Same level.' };
    }
    Q.pending = null;

    if (Q.mode === 'mcq') {
      const letter = (said0.match(/^[a-h]\b/i) || [''])[0].toUpperCase();
      if (!letter) return { html: `<p>Just the letter is fine.</p>`, text: 'Answer with a letter.' };
      const why = Q.src === 'bank' ? strip(x.it.why) : (x.def || '');
      if (letter === Q.right) {
        Q.miss = 0;
        const nx = quizNext(loc);
        return { html: `<p>${BADGE.hot} — ${E(letter)} is right.</p>` + (why ? `<p>${E(why)}</p>` : '') + (nx ? nx.html : ''), text: 'Correct.' };
      }
      Q.tries++;
      if (Q.tries === 2) {
        /* narrow the field rather than hand over the letter */
        const others = (x.it ? x.it.options : []).map((o, i) => LETTERS[i]).filter(l => l !== Q.right);
        const keep = [Q.right];
        if (others.length) keep.push(others[Math.floor(Math.random() * others.length)]);
        keep.sort();
        return { html: `<p>${BADGE.chilly} — not that one either.</p><p>It is one of these two: <b>${E(keep.join(' or '))}</b>.</p>` + whereLine(x) + `<p><b>Which of the two?</b></p>`, text: 'Narrowed to ' + keep.join(' or ') };
      }
      if (Q.tries >= 3) {
        Q.miss++;
        const extra = Q.miss >= 2 ? BREAK : '';
        const nx = Q.miss >= 2 ? null : quizNext(loc);
        Q.pending = Q.miss >= 2 ? 'offer' : null;
        return {
          html: `<p>${BADGE.chilly} — it was <b>${E(Q.right)}</b>.</p>` + (why ? `<p>${E(why)}</p>` : '') + whereLine(x)
            + (Q.miss >= 2 ? `<p><b>Shall I dial it down?</b></p>` + extra : '') + (nx ? nx.html : ''),
          text: 'It was ' + Q.right
        };
      }
      return { html: `<p>${BADGE.chilly} — not that one.</p><p>Rule out the ones that describe something else.</p><p><b>Try again — which letter?</b></p>`, text: 'Try again.' };
    }

    const g = grade(x, said0);
    if (g.v === 'hot') {
      Q.miss = 0;
      const nx = quizNext(loc);
      return { html: `<p>${BADGE.hot} — that is it.</p><p>${E(x.def)}</p>` + (nx ? nx.html : ''), text: 'Hot.' };
    }
    Q.tries++;
    const had = g.got.length ? `<p>You have ${g.got.slice(0, 2).map(w => '“' + E(w) + '”').join(' and ')} — that part is right.</p>` : '';
    if (Q.tries >= 2) {
      Q.miss++;
      Q.pending = 'offer';
      return {
        html: `<p>${BADGE[g.v]} — ${g.got.length ? 'partly there' : 'not quite, and that is fine'}.</p>` + had
          + `<p>${E(hintFor(x))}</p>` + whereLine(x) + glossBtn(x.name)
          + `<p><b>Shall I dial it down to choices?</b></p>` + (Q.miss >= 2 ? BREAK : ''),
        text: 'Have a look at the topic.'
      };
    }
    const cue = `<p>${E(hintFor(x))}</p>`;
    return { html: `<p>${BADGE[g.v]} — ${g.v === 'warm' ? 'on the right track' : 'not yet'}.</p>` + had + cue + `<p><b>Have another go: what does “${E(x.name)}” mean?</b></p>`, text: 'Try again.' };
  }

  function quizReset() { Q.cur = null; Q.tries = 0; Q.mode = 'open'; Q.asked = []; Q.pending = null; Q.src = 'open'; Q.miss = 0; }
  function ready() {
    try { if ((window.COURSE_QUIZBANK || []).length) return true; } catch (e) { }
    const I = idx();
    return I.terms.filter(x => x.def && x.def.length > 25 && x.dw.length >= 3).length >= 5;
  }

  window.SAGE_FAQ = { answer: answer, quizStart: quizStart, quizAnswer: quizAnswer, quizNext: quizNext, quizReset: quizReset, ready: ready };
})();
