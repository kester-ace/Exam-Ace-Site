#!/usr/bin/env node
/*
 * Exam bank builder.
 *
 * Reads the multiple-choice question sources in each course's teacher edition
 * and writes one uniform bank per course to
 *   courses/<slug>/teacher/exam/bank.json
 *
 * Sources are loaded by running the course's own content scripts in a sandbox
 * with a stand-in `window` object (no regex parsing of JS data). Two game pages
 * keep their questions inside HTML/minified script; those are read with small,
 * targeted extractors.
 *
 * Re-runnable: every run rebuilds every bank from the sources.
 * Usage: node tools-build/exambank.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const COURSES = ['comm-studies', 'digital-media-1', 'digital-media-2', 'cape-it-1', 'csec-it', 'edpm'];

// Keys whose source flags them as unconfirmed are left out unless this is set.
const INCLUDE_UNCONFIRMED = process.argv.includes('--include-unconfirmed');

// Questions naming an AI product are left out of the banks.
const AI_TOOL_RE = /\b(Claude|Anthropic|ChatGPT|Chat\s?GPT|GPT-?\d|OpenAI|Gemini|Bard|Copilot|Midjourney|DALL[·\-\s]?E|Perplexity|Grok|Llama|Stable Diffusion|Firefly)\b/i;

// ---------------------------------------------------------------- sandbox --
function makeSandbox() {
  const noop = () => {};
  const el = () => ({ style: {}, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    appendChild: noop, removeChild: noop, setAttribute: noop, getAttribute: () => null,
    addEventListener: noop, querySelector: () => null, querySelectorAll: () => [] });
  const win = {};
  const doc = { addEventListener: noop, querySelector: () => null, querySelectorAll: () => [],
    getElementById: () => null, createElement: el, head: el(), body: el(), documentElement: el(), readyState: 'complete' };
  const ctx = { window: win, document: doc, console: { log: noop, warn: noop, error: noop, info: noop },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    sessionStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    navigator: { userAgent: 'node' }, location: { href: '', search: '', hash: '', pathname: '' },
    setTimeout: noop, clearTimeout: noop, setInterval: noop, requestAnimationFrame: noop, addEventListener: noop };
  win.document = doc; ctx.self = win; win.window = win;
  vm.createContext(ctx);
  return { ctx, win };
}

function loadContent(teacherDir, notes) {
  // Load every content/*.js script the course page loads, in page order.
  const html = fs.readFileSync(path.join(teacherDir, 'index.html'), 'utf8');
  const srcs = [...html.matchAll(/<script[^>]*\bsrc="(content\/[^"?#]+\.js)[^"]*"/g)].map(m => m[1]);
  const { ctx, win } = makeSandbox();
  const loaded = [];
  for (const rel of srcs) {
    const f = path.join(teacherDir, rel);
    if (!fs.existsSync(f)) { notes.push(`script listed in index.html is missing: ${rel}`); continue; }
    try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: rel, timeout: 20000 }); loaded.push(rel); }
    catch (e) { notes.push(`could not run ${rel}: ${e.message}`); }
  }
  const g = name => (win[name] !== undefined ? win[name] : ctx[name]);
  return { g, loaded };
}

// ---------------------------------------------------------------- helpers --
const stripTags = s => String(s == null ? '' : s).replace(/<[^>]*>/g, ' ');
const norm = s => stripTags(s).replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const LETTERS = 'ABCDEFGH';

function stripLetterPrefixes(options) {
  // Only strip when every option carries its own letter in order: "(A) x", "A. x", "A) x".
  const re = /^\s*(?:\(([A-H])\)|([A-H])[.)])\s+/;
  const all = options.every((o, i) => { const m = typeof o === 'string' && o.match(re); return m && (m[1] || m[2]) === LETTERS[i]; });
  return all ? options.map(o => o.replace(re, '')) : options.slice();
}

function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

// ------------------------------------------------------------ the builder --
function buildCourse(courseSlug) {
  const teacherDir = path.join(ROOT, 'courses', courseSlug, 'teacher');
  const notes = [];
  const { g, loaded } = loadContent(teacherDir, notes);
  const usedFiles = new Set();

  const MODULES = g('COURSE_MODULES') || [];
  const modByKey = {};
  for (const m of MODULES) {
    if (!m || !m.id) continue;
    modByKey[m.id] = m.code || m.id;
    const n = String(m.id).match(/^[A-Z](\d+)$/);
    if (n) modByKey[n[1]] = m.code || m.id;
  }
  const moduleOf = it => {
    if (it.module != null && it.module !== '') {
      const k = String(it.module);
      if (modByKey[k]) return modByKey[k];
      if (/^\d+$/.test(k)) return `Module ${k}`;
      return k;
    }
    if (it.sec) return modByKey[it.sec] || String(it.sec);
    return null;
  };

  const sets = [];
  const questions = [];
  const seen = new Map();          // dedupe key -> question id kept
  const stats = [];                // per-set counters
  const oddities = [];
  const setIds = new Set();
  const uniqueSetId = base => { let id = base, i = 2; while (setIds.has(id)) id = `${base}-${i++}`; setIds.add(id); return id; };

  function imgOk(rel) {
    if (!rel) return null;
    const clean = String(rel).replace(/^\.?\//, '');
    if (fs.existsSync(path.join(teacherDir, clean))) return clean;
    oddities.push(`missing image ${clean}`);
    return null;
  }

  // Adds a set; `items` are already normalised to
  // { stem, img, options, answer, explain, topic, module, unconfirmed, audio, notMcq }
  function addSet(meta, items, sourceFile) {
    const id = uniqueSetId(meta.id);
    const st = { set: id, title: meta.title, kind: meta.kind, source: sourceFile, total: items.length,
      included: 0, noKey: 0, unconfirmed: 0, duplicate: 0, notMcq: 0, aiTool: 0, fewOptions: 0 };
    const kept = [];
    items.forEach((it, idx) => {
      if (it.notMcq) { st.notMcq++; return; }
      const opts = Array.isArray(it.options) ? stripLetterPrefixes(it.options.map(o => (o == null ? '' : String(o)))) : [];
      const ans = it.answer;
      if (opts.length < 2 || !Number.isInteger(ans) || ans < 0 || ans >= opts.length) { st.noKey++; return; }
      if (it.unconfirmed && !INCLUDE_UNCONFIRMED) { st.unconfirmed++; return; }
      const text = [it.stem, ...opts, it.explain || ''].join(' ');
      if (AI_TOOL_RE.test(stripTags(text))) { st.aiTool++; return; }
      // Same stem (and same stimulus) with the same options in any order counts as a duplicate.
      const key = norm(it.stem) + '||' + (it.img || '') + '||' + (it.audio || '') + '||' + opts.map(o => norm(o) || o.replace(/\s+/g, ' ')).sort().join('|');
      if (seen.has(key)) { st.duplicate++; return; }
      const qid = `${id}-q${idx + 1}`;
      seen.set(key, qid);
      if (opts.length < 4) st.fewOptions++;
      // Check any src= reference in the HTML resolves to a file in the teacher folder.
      for (const m of String(it.stem).matchAll(/<(?:img|audio|source|video)\b[^>]*\bsrc="([^"]+)"/g)) {
        if (!/^(https?:|data:)/.test(m[1]) && !fs.existsSync(path.join(teacherDir, m[1]))) oddities.push(`${qid}: stem references missing file ${m[1]}`);
      }
      const q = { id: qid, set: id, module: it.module || meta.module || null, topic: it.topic || null,
        stem: it.stem, img: it.img || null, options: opts, answer: ans, explain: it.explain || null };
      if (it.audio !== undefined) q.audio = it.audio;
      kept.push(q);
      st.included++;
    });
    stats.push(st);
    if (kept.length) {
      sets.push({ id, title: meta.title, kind: meta.kind, module: meta.module || null });
      questions.push(...kept);
    }
    if (sourceFile) usedFiles.add(sourceFile);
  }

  const joinStem = (passage, q) => (passage ? `${passage}\n${q}` : q);
  const fromPaperItem = it => ({
    stem: joinStem(it.passage, it.q), img: null, options: it.options, answer: it.answer,
    explain: it.why || null, topic: it.topic || it.skill || (it.so ? `SO ${it.so}` : null), module: moduleOf(it),
    unconfirmed: !!it.flag,
  });

  // Which script defined each paper (for the source list): re-run each content file alone.
  const paperSource = {};
  for (const rel of loaded) {
    const txt = fs.readFileSync(path.join(teacherDir, rel), 'utf8');
    if (!/COURSE_PAPERS|P1_PAST|COURSE_MODULES|COURSE_QUIZBANK/.test(txt)) continue;
    const { ctx, win } = makeSandbox();
    try { vm.runInContext(txt, ctx, { timeout: 20000 }); } catch (e) { continue; }
    for (const name of ['COURSE_PAPERS', 'P1_PAST']) {
      const arr = win[name] || ctx[name];
      if (Array.isArray(arr)) for (const p of arr) if (p && p.id && !paperSource[name + ':' + p.id]) paperSource[name + ':' + p.id] = rel;
    }
    const mods = win.COURSE_MODULES || ctx.COURSE_MODULES;
    if (Array.isArray(mods)) for (const m of mods) if (m && m.id) paperSource['MOD:' + m.id] = rel;
    if (win.COURSE_QUIZBANK || ctx.COURSE_QUIZBANK) paperSource.QUIZBANK = rel;
  }

  const pastId = p => {
    const y = (String(p.id).match(/(19|20)\d\d/) || String(p.title).match(/(19|20)\d\d/) || [''])[0];
    let id = 'p1-' + (y || slug(p.id));
    if (/spec/i.test(p.id) || /specimen/i.test(p.title)) id += '-spec';
    if (/JAN/i.test(p.id) || /January/i.test(p.title)) id += '-jan';
    return id;
  };

  // 1. Paper 01 past papers with structured stimuli (P1_PAST)
  const P1 = g('P1_PAST') || [];
  const p1Ids = new Set();
  for (const p of P1) {
    p1Ids.add(p.id);
    const stim = p.stimuli || {};
    const lis = p.listening || {};
    let audio = null;
    if (lis.audio) {
      if (fs.existsSync(path.join(teacherDir, lis.audio))) audio = lis.audio;
      else oddities.push(`${p.id}: listening audio missing (${lis.audio})`);
    }
    const scriptImg = lis.script && lis.script.type === 'image' ? lis.script.src : null;
    const items = (p.items || []).map(it => {
      const s = it.stimulusId ? stim[it.stimulusId] : null;
      let stem = it.q, img = null;
      if (s && s.type === 'image') img = imgOk(s.src);
      else if (s && s.html) stem = joinStem(s.html, it.q);
      else if (s && s.src) img = imgOk(s.src);
      const out = { stem, img, options: it.options, answer: it.answer, explain: it.why || null,
        topic: it.skill || null, module: moduleOf(it), unconfirmed: it.flag === true };
      if (it.section === 'A') { out.audio = audio; if (!img && scriptImg) out.img = imgOk(scriptImg); }
      return out;
    });
    addSet({ id: pastId(p), title: p.title, kind: 'past', module: null }, items, paperSource['P1_PAST:' + p.id]);
  }

  // 2. Other Paper 01s (past, specimen, mock, practice) in COURSE_PAPERS
  const PAPERS = (g('COURSE_PAPERS') || []).filter(p => p && !p1Ids.has(p.id));
  const isMock = p => /mock|practice/i.test(p.title || '') || /mock/i.test(p.id || '');
  const ordered = [...PAPERS.filter(p => !isMock(p)), ...PAPERS.filter(isMock)];
  for (const p of ordered) {
    if (!Array.isArray(p.items) || !p.items.length) continue;   // Paper 02 / 032: no MCQ items
    const mock = isMock(p);
    let id;
    if (mock) {
      const n = (String(p.id).match(/(\d+)$/) || String(p.title).match(/Set\s+(\d+)/i) || [])[1];
      const letter = (String(p.title).match(/Paper\s+([A-Z])\b(?!.*Paper)/) || [])[1];
      id = 'mock-' + (n || (letter ? letter.toLowerCase() : slug(p.id)));
    } else id = pastId(p);
    addSet({ id, title: p.title, kind: mock ? 'mock' : 'past', module: null }, p.items.map(fromPaperItem), paperSource['COURSE_PAPERS:' + p.id]);
  }

  // 3. End-of-module / section tests
  for (const m of MODULES) {
    const items = (m.test && m.test.items) || [];
    if (!items.length) continue;
    const code = m.code || m.id;
    addSet({ id: 'module-' + slug(m.id), title: (m.test && m.test.title) || `${code} Test`, kind: 'module', module: code },
      items.map(it => Object.assign(fromPaperItem(it), { module: code })), paperSource['MOD:' + m.id]);
  }

  // 4. Topic quizzes from the quiz bank (single-answer items only).
  //    The other quiz-bank packages are exports of the papers and tests above
  //    (without their passages and with shuffled options), so they are not used.
  const QB = g('COURSE_QUIZBANK') || [];
  const qbSkipped = [];
  for (const pkg of QB) {
    if (!/^Topic Quizzes/i.test(pkg.pkg || '')) { qbSkipped.push(`${pkg.pkg} (${(pkg.quizzes || []).length})`); continue; }
    const modM = String(pkg.pkg || '').match(/·\s*(.+)$/);
    const module = modM ? modM[1].trim() : null;
    for (const qz of pkg.quizzes || []) {
      const topic = String(qz.title || '').replace(/^.*?·\s*/, '').replace(/^Unit\s+\d+\s+quiz:\s*/i, '').replace(/\s+quiz$/i, '').trim() || null;
      const items = (qz.items || []).map(i => i.t !== 'mc' ? { notMcq: true } : {
        stem: i.q, img: null, options: i.options, answer: i.correct, explain: i.why || null,
        topic, module, unconfirmed: false,
      });
      addSet({ id: 'quiz-' + slug(qz.id), title: qz.title, kind: 'quiz', module }, items, paperSource.QUIZBANK);
    }
  }
  if (qbSkipped.length) notes.push('quiz-bank packages not used (repeat papers/tests or written tasks): ' + qbSkipped.join('; '));

  // 5. Game question banks
  for (const g2 of gameBanks(teacherDir, notes)) {
    addSet({ id: g2.id, title: g2.title, kind: 'quiz', module: null }, g2.items, g2.file);
  }

  // Write the bank
  const outDir = path.join(teacherDir, 'exam');
  fs.mkdirSync(outDir, { recursive: true });
  const bank = { course: courseSlug, built: new Date().toISOString(), sets, questions };
  fs.writeFileSync(path.join(outDir, 'bank.json'), JSON.stringify(bank, null, 1) + '\n');

  // Final checks on the written output
  const outText = JSON.stringify(bank);
  if (AI_TOOL_RE.test(outText)) notes.push('WARNING: an AI tool name appears in the output');
  for (const s of sets) if (/\bfree\b/i.test(s.title)) notes.push(`set title contains "free": ${s.title}`);
  const ids = new Set(); for (const q of questions) { if (ids.has(q.id)) notes.push('duplicate id ' + q.id); ids.add(q.id); }

  return { courseSlug, stats, notes, oddities, usedFiles: [...usedFiles].filter(Boolean), total: questions.length, setCount: sets.length };
}

// ------------------------------------------------------------- game banks --
function extractLiteral(src, startIdx) {
  // Return the bracketed literal starting at src[startIdx] ('[' or '{'), string-aware.
  const open = src[startIdx], close = open === '[' ? ']' : '}';
  let depth = 0, q = null;
  for (let i = startIdx; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') { depth--; if (depth === 0) return src.slice(startIdx, i + 1); }
  }
  return null;
}
const evalLiteral = lit => vm.runInNewContext('(' + lit + ')', {}, { timeout: 5000 });

function gameBanks(teacherDir, notes) {
  const out = [];
  const gdir = path.join(teacherDir, 'games');
  if (!fs.existsSync(gdir)) return out;

  // Street racer: an array of {module, topic, question, options:[{letter,text}], correctAnswer, explanation}
  const sr = path.join(gdir, 'streetracer.html');
  if (fs.existsSync(sr)) {
    const src = fs.readFileSync(sr, 'utf8');
    const i = src.indexOf('[{id:1,module');
    if (i < 0) notes.push('games/streetracer.html: question array not found');
    else {
      try {
        const arr = evalLiteral(extractLiteral(src, i));
        const items = arr.map(d => {
          const letters = (d.options || []).map(o => o.letter);
          const ans = letters.indexOf(d.correctAnswer);
          return { stem: d.question, img: null, options: (d.options || []).map(o => o.text), answer: ans >= 0 ? ans : null,
            explain: d.explanation || null, topic: d.topic || null,
            module: (String(d.module || '').match(/^((?:Module|Section)\s+[0-9IVX]+)/) || [])[1] || null, unconfirmed: false };
        });
        out.push({ id: 'game-streetracer', title: 'Street Racer question bank', items, file: 'games/streetracer.html' });
      } catch (e) { notes.push('games/streetracer.html: could not read question array: ' + e.message); }
    }
  }

  // HTML check-ins: <div class="question" data-answer="C" ...> with radio options
  for (const name of ['dmquiz1.html', 'dmtest1.html']) {
    const f = path.join(gdir, name);
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, 'utf8');
    const arrays = {};
    for (const nm of ['MCQ', 'TF']) {
      const m = src.match(new RegExp('\\b' + nm + '\\s*=\\s*\\['));
      if (m) { try { arrays[nm] = evalLiteral(extractLiteral(src, m.index + m[0].length - 1)); } catch (e) { notes.push(`${name}: could not read ${nm} explanations`); } }
    }
    const title = ((src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || name).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const items = [];
    const qre = /<div class="question" data-answer="([^"]*)" data-qid="([^"]*)"([^>]*)>([\s\S]*?)<p class="feedback"/g;
    let m;
    while ((m = qre.exec(src))) {
      const [, key, , attrs, body] = m;
      const qt = body.match(/<p class="qtext">(?:<span class="qnum">[^<]*<\/span>)?\s*([\s\S]*?)<\/p>/);
      const opts = [], vals = [];
      for (const o of body.matchAll(/<label class="option">[\s\S]*?value="([^"]*)"[\s\S]*?<span>([\s\S]*?)<\/span>\s*<\/label>/g)) {
        vals.push(o[1]);
        opts.push(o[2].replace(/^\s*<strong>[A-H][.)]<\/strong>\s*/, '').trim());
      }
      const wi = attrs.match(/data-why="(\d+)"/), ti = attrs.match(/data-tf="(\d+)"/);
      const explain = wi && arrays.MCQ ? arrays.MCQ[+wi[1]] : ti && arrays.TF ? arrays.TF[+ti[1]] : null;
      items.push({ stem: qt ? qt[1].trim() : '', img: null, options: opts, answer: vals.indexOf(key) >= 0 ? vals.indexOf(key) : null,
        explain: explain || null, topic: null, module: null, unconfirmed: false });
    }
    if (items.length) out.push({ id: 'game-' + name.replace(/\.html$/, ''), title, items, file: 'games/' + name });
  }
  return out;
}

// ------------------------------------------------------------------- main --
function pad(s, n) { s = String(s); return s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length); }

const results = COURSES.map(buildCourse);
const H = ['course', 'set', 'kind', 'incl', 'nokey', 'unconf', 'dup', 'notMCQ', 'ai', 'total'];
const W = [16, 34, 6, 5, 6, 7, 5, 7, 4, 6];
console.log(H.map((h, i) => pad(h, W[i])).join(' '));
for (const r of results) {
  for (const s of r.stats) {
    console.log([r.courseSlug, s.set, s.kind, s.included, s.noKey, s.unconfirmed, s.duplicate, s.notMcq, s.aiTool, s.total].map((v, i) => pad(v, W[i])).join(' '));
  }
  const sum = k => r.stats.reduce((a, s) => a + s[k], 0);
  console.log([r.courseSlug, `TOTAL (${r.setCount} sets kept)`, '', sum('included'), sum('noKey'), sum('unconfirmed'), sum('duplicate'), sum('notMcq'), sum('aiTool'), sum('total')].map((v, i) => pad(v, W[i])).join(' '));
  console.log('-'.repeat(100));
}
console.log('nokey = no usable key; unconf = key flagged unconfirmed in source; dup = same stem+options already in bank; notMCQ = matching/multi-select/written; ai = names an AI product.');
for (const r of results) {
  console.log(`\n${r.courseSlug}: ${r.total} questions -> courses/${r.courseSlug}/teacher/exam/bank.json`);
  console.log('  sources: ' + r.usedFiles.join(', '));
  const few = r.stats.reduce((a, s) => a + s.fewOptions, 0);
  if (few) console.log(`  questions with fewer than 4 options: ${few}`);
  for (const n of r.notes) console.log('  note: ' + n);
  for (const o of [...new Set(r.oddities)]) console.log('  odd: ' + o);
}
