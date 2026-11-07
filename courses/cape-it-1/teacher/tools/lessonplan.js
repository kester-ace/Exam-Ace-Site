/* Lesson Planner · Teacher's Version · Developed by Kester Small.
   Builds complete, timed, differentiated lesson plans and a scheme of work for every unit from the unit's own course
   data: objectives, learn screens (with their plain-words and go-further notes), named activities (with their
   Foundation and Challenge versions), videos, games, simulators, labs, slides, quizzes, tests and Paper 02 tasks.
   No network is needed. Plans are edited in place and saved per unit in this browser
   (localStorage 'course.lp.<course>.<unit id>'). Optional extras light up only when the course is opened from its
   online link: Smart draft (sample capability) and Word downloads (downloads capability). */
(function () {
  'use strict';
  const VIEW = 'lessonplan';
  const REL_START = Date.UTC(2026, 9, 23, 22, 0, 0), DAY = 864e5, WEEK = 7 * DAY, SXM_OFF = -4 * 36e5;
  const LENS = [40, 60, 80, 90];
  const CLASSES = ['Form 3', 'Form 4', 'Form 5', 'Lower Sixth', 'Upper Sixth'];

  /* ---------------- small helpers ---------------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const escRe = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function lsGet(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { } }
  const API = () => window.COURSE_API || null;
  const toast = msg => { try { const a = API(); if (a && a.toast) a.toast(msg); } catch (e) { } };
  const uniq = a => Array.from(new Set(a));
  const cap1 = s => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
  const low1 = s => (s && /^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s || '');
  const KEEPCAP = /^(Caribbean|English|Creole|Internet|Web|Windows|Word|Excel|Access|PowerPoint|Publisher|Microsoft|Paper|Section|Module|Unit|Standard|Sint|Maarten|CXC|CAPE|CSEC|SBA|HTML|PEEL|Bloom)$/;
  const lowTitle = s => String(s || '').split(/(\s+)/).map((w, i) => /^[A-Z][a-z]+[,:;]?$/.test(w) && !KEEPCAP.test(w.replace(/[,:;]$/, '')) ? w.toLowerCase() : w).join('');
  const noEmoji = s => String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, '').replace(/[ \t]{2,}/g, ' ').trim();
  const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', hellip: '…', eacute: 'é', egrave: 'è', ccedil: 'ç', middot: '·', times: '×', rarr: '→', larr: '←', bull: '•', deg: '°', pound: '£', euro: '€', copy: '©', reg: '®', trade: '™' };
  function decode(s) {
    return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);/gi, (m, e) => {
      if (e[0] === '#') { const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); try { return String.fromCodePoint(n); } catch (er) { return m; } }
      const v = ENT[e.toLowerCase()]; return v != null ? v : m;
    });
  }
  function strip(h) {
    return decode(String(h == null ? '' : h).replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/(p|li|h\d|div|tr|td|th|blockquote|figcaption)>/gi, ' ').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  }
  /* House rules: no "invented"/"fictional" labels, no notes attributions, no AI product names, nothing about 2027 */
  const FAKE = '(?:invented|fictional|fictitious|made-up|imaginary)';
  const BRANDS = [[/\bChatGPT\b|\bGPT-?\d(?:\.\d)?o?\b/g, 'a chatbot'], [/\b(?:Midjourney|DALL[·.\s-]?E(?:\s?\d)?|Stable Diffusion)\b/g, 'an image generator'], [/\b(?:Claude|Gemini|Copilot|Perplexity|Grok)\b/g, 'a chatbot'], [/\b(?:OpenAI|Anthropic)\b/g, 'an AI company']];
  function clean(t) {
    t = String(t || '')
      .replace(/\b(?:Ms|Mrs|Miss|Mr)\.?\s+(?:Kester\s+)?Small['’]s\s+notes?\s*[:,.-]?\s*/gi, '')
      .replace(/\b[Yy]our teacher says\s*[:,]?\s*/g, '')
      .replace(new RegExp('(^|[.!?]\\s+)[^.!?]{0,80}\\b(?:are|is|were)\\s+(?:all\\s+)?' + FAKE + '\\b[^.!?]{0,40}[.!?]', 'gi'), '$1')
      .replace(new RegExp('\\s*\\(' + FAKE + '\\)', 'gi'), '')
      .replace(new RegExp(',\\s*' + FAKE + '\\s*\\)', 'gi'), ')')
      .replace(new RegExp('\\b(an?|the|this|these|that|those|our|one|another|which|each|every|any|some|two|three|four|five|its|their|his|her)\\s+' + FAKE + '\\s+(?=(\\S))', 'gi'), (m, art, ch) => {
        const a = art.toLowerCase(); if (a !== 'a' && a !== 'an') return art + ' ';
        return (art.charAt(0) === 'A' ? 'A' : 'a') + (/[aeiou]/i.test(ch) ? 'n' : '') + ' ';
      })
      .replace(/\b(?:[Ii]nvented|[Ff]ictional|[Ff]ictitious|[Mm]ade-up|[Ii]maginary)\s+(?=[A-Z])/g, '')
      .replace(new RegExp('(-style|-like|-type)\\s+' + FAKE + '\\s+', 'gi'), '$1 ')
      .replace(new RegExp('\\(' + FAKE + '\\s+', 'gi'), '(')
      .replace(new RegExp('^' + FAKE + '\\s+(\\S)', 'i'), (m, ch) => ch.toUpperCase());
    BRANDS.forEach(([re, w]) => { t = t.replace(re, w); });
    return t.replace(/\s+([,.;:])/g, '$1').replace(/\s+/g, ' ').trim();
  }
  const ABBR = /\b(?:St|Mr|Mrs|Ms|Dr|No|vs|etc|Jr|Sr|Inc|Ltd|Co|Fig|approx|Vol|e\.g|i\.e|a\.m|p\.m|U\.S)\./g;
  function sents(t) {
    t = String(t || '').replace(ABBR, m => m.replace(/\./g, '․')).replace(/(\d)\.(\d)/g, '$1․$2');
    const out = t.match(/[^]*?[.!?]+["”’)\]]*(?=\s|$)|[^]+?$/g) || [];
    return out.map(x => x.replace(/․/g, '.').trim()).filter(x => x && !/2027/.test(x));
  }
  function short(t, n) {
    t = String(t || '').trim(); if (t.length <= n) return t;
    let c = t.slice(0, n); const sp = c.lastIndexOf(' '); if (sp > n * 0.6) c = c.slice(0, sp);
    return c.replace(/[\s,;:–—-]+$/, '') + '…';
  }
  const txt = h => { const t = clean(strip(h)); return /2027/.test(t) ? sents(t).join(' ') : t; };
  const has27 = (...a) => a.some(x => /2027/.test(typeof x === 'string' ? x : JSON.stringify(x || '')));
  const STOP = new Set(('about above after again against also among another because been before being between both cannot could does doing down during each from further have having here into itself just more most must once only other ours over same should some such than that their them then there these they this those through under until very were what when where which while whom with within without would your yours able used using uses make made many much well like into onto upon also each every them they will shall from this that than then what when where your their there here these those such only even into same both either neither unit lesson students student activity activities screen screens course explain describe identify define state discuss compare give').split(' '));
  const stem = w => w.replace(/(ies)$/, 'y').replace(/(ing|ed|es|s)$/, '');
  const toks = t => (String(t || '').toLowerCase().match(/[a-z][a-z0-9-]{3,}/g) || []).filter(w => !STOP.has(w)).map(stem);
  const overlap = (a, bset) => uniq(toks(a)).reduce((n, w) => n + (bset.has(w) ? 1 : 0), 0);

  /* ---------------- which course is this? ---------------- */
  const COURSES = {
    comm: { subject: 'CAPE Communication Studies', exam: 'CAPE', cls: 'Lower Sixth', ages: '16 to 19', sba: false, kind: 'lang' },
    itu1: { subject: 'CAPE Information Technology Unit 1', exam: 'CAPE', cls: 'Lower Sixth', ages: '16 to 19', sba: false, kind: 'it' },
    csecit: { subject: 'CSEC Information Technology', exam: 'CSEC', cls: 'Form 4', ages: '14 to 16', sba: true, kind: 'it' },
    dm1: { subject: 'CAPE Digital Media Unit 1', exam: 'CAPE', cls: 'Lower Sixth', ages: '16 to 19', sba: true, kind: 'dm' },
    dm2: { subject: 'CAPE Digital Media Unit 2', exam: 'CAPE', cls: 'Upper Sixth', ages: '17 to 19', sba: true, kind: 'dm' },
    edpm: { subject: 'EDPM', exam: 'CSEC', cls: 'Form 4', ages: '14 to 16', sba: true, kind: 'edpm' }
  };
  let CID = null;
  function detect() {
    const M = window.COURSE_MODULES || [], t = id => ((M.find(m => m && m.id === id) || {}).title || '').toLowerCase();
    const dt = String(document.title || '').toLowerCase();
    if (M.some(m => m && m.id === 'P3') || /communication studies/.test(dt)) return 'comm';
    if (/fundamentals of computing/.test(t('S1')) || window.EDPM_PORTFOLIO || /edpm/.test(dt)) return 'edpm';
    if (/computer fundamentals/.test(t('S1')) || window.COURSE_SBA || /csec information technology/.test(dt)) return 'csecit';
    if (/visual and interactive design/.test(t('M1')) || /digital media unit 2/.test(dt)) return 'dm2';
    if (/understanding digital media/.test(t('M1')) || /digital media unit 1/.test(dt)) return 'dm1';
    if (/fundamentals of information technology/.test(t('M1')) || /information technology unit 1/.test(dt)) return 'itu1';
    return 'course';
  }
  const cid = () => CID || (CID = detect());
  const course = () => COURSES[cid()] || { subject: String(document.title || 'Course').split('·')[0].trim(), exam: '', cls: 'Form 4', ages: '14 to 19', sba: false, kind: 'it' };
  const modWord = () => (/^Section/i.test(String((MODS()[0] || {}).code || '')) ? 'Section' : 'Module');
  const modLabel = m => { const t = txt(m.title), c = String(m.code || ''); return c && t.toLowerCase().indexOf(c.toLowerCase()) === 0 ? t : (c ? c + ': ' : '') + t; };
  const ordId = id => (/^P/i.test(id) ? 1000 : 0) + (parseInt(String(id).replace(/\D/g, ''), 10) || 0);
  const MODS = () => (window.COURSE_MODULES || []).filter(m => m && m.id && Array.isArray(m.units) && m.units.length).slice().sort((a, b) => ordId(a.id) - ordId(b.id));
  const modBy = id => MODS().find(m => m.id === id) || null;
  const views = () => new Set((window.COURSE_PLUGINS || []).map(p => p && p.view).filter(Boolean));
  const plugTitle = v => { const p = (window.COURSE_PLUGINS || []).find(x => x && x.view === v); return p ? p.title : ''; };

  /* ---------------- dates (Sint Maarten, UTC-4 all year) ---------------- */
  const isoUTC = ms => new Date(ms).toISOString().slice(0, 10);
  const sxmIso = ms => isoUTC(ms + SXM_OFF);
  const msOf = iso => { const p = String(iso).split('-').map(Number); return Date.UTC(p[0], p[1] - 1, p[2]); };
  const okIso = iso => /^\d{4}-\d\d-\d\d$/.test(String(iso || '')) && isFinite(msOf(iso));
  const addDays = (iso, n) => isoUTC(msOf(iso) + n * DAY);
  const isSchool = iso => { const w = new Date(msOf(iso)).getUTCDay(); return w >= 1 && w <= 5; };
  function nextSchool(iso) { let d = addDays(iso, 1); while (!isSchool(d)) d = addDays(d, 1); return d; }
  function addSchool(iso, n) { let d = isSchool(iso) ? iso : nextSchool(iso); for (let i = 0; i < n; i++) d = nextSchool(d); return d; }
  const relIso = ui => sxmIso(REL_START + ui * WEEK);
  const todayIso = () => sxmIso(Date.now());
  function defStart(ui) { const r = relIso(ui), t = todayIso(); return r >= t ? r : nextSchool(t); }
  const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  /* the year is shown only for 2026 dates (house rule: never print 2027) */
  function fmtDate(iso, sh) {
    if (!okIso(iso)) return ''; const d = new Date(msOf(iso)), y = d.getUTCFullYear();
    if (sh) return `${WD[d.getUTCDay()].slice(0, 3)} ${d.getUTCDate()} ${MO[d.getUTCMonth()].slice(0, 3)}`;
    return `${WD[d.getUTCDay()]} ${d.getUTCDate()} ${MO[d.getUTCMonth()]}${y === 2026 ? ' 2026' : ''}`;
  }
  const yr = iso => (okIso(iso) ? new Date(msOf(iso)).getUTCFullYear() : 0);

  /* ---------------- storage ---------------- */
  const KEY = u => 'course.lp.' + cid() + '.' + u.id;
  const PKEY = () => 'course.lp.' + cid() + '.prefs';
  function prefs() { return Object.assign({ school: 'School name', teacher: 'Ms. Kester Small', cls: course().cls, len: 40, per: 40, sowLen: 40, sowM: 'all' }, lsGet(PKEY()) || {}); }
  const savePrefs = p => lsSet(PKEY(), p);
  function loadDraft(u) { const d = lsGet(KEY(u)); return d && d.v === 1 && d.set && Array.isArray(d.lessons) ? d : null; }
  function saveDraft(u, d) { d.at = Date.now(); delete d.fresh; return lsSet(KEY(u), d); }
  const totalLen = s => (s.len === 'dbl' ? 2 * clampPer(s.per) : (LENS.includes(+s.len) ? +s.len : 40));
  const clampPer = p => Math.max(30, Math.min(70, Math.round(+p || 40)));

  /* ---------------- reading a unit ---------------- */
  const ACTS = ['mcq', 'multi', 'sort', 'match', 'order', 'pick', 'scenario'];
  const KIND = { learn: 'Notes', mcq: 'Quick question', multi: 'Scenario questions', sort: 'Sort', match: 'Match', order: 'Sequence', pick: 'Spot it', scenario: 'Branching scenario', write: 'Written task', checkin: 'Check-in' };
  const EST = { learn: 5, mcq: 3, multi: 5, sort: 5, match: 4, order: 4, pick: 4, scenario: 8, write: 20, checkin: 2 };
  const est = s => EST[s && s.type] || 4;
  const unitMinutes = u => (u.screens || []).reduce((a, s) => a + est(s), 0);
  const defaultN = (u, T) => Math.max(1, Math.min(6, (u.screens || []).length || 1, Math.round(unitMinutes(u) / (T * 0.75)) || 1));

  function chunkUnit(u, n) {
    const S = u.screens || [], N = S.length; n = Math.max(1, Math.min(n, N || 1));
    const tot = S.reduce((a, s) => a + est(s), 0) || 1, before = []; let c = 0;
    S.forEach((s, i) => { before[i] = c; c += est(s); });
    const b = [0];
    for (let k = 1; k < n; k++) { let i = 0; while (i < N && before[i] + est(S[i]) / 2 < k * tot / n) i++; b.push(i); }
    for (let k = 1; k < n; k++) b[k] = Math.max(b[k], b[k - 1] + 1);
    for (let k = n - 1; k >= 1; k--) b[k] = Math.min(b[k], N - (n - k), k + 1 < n ? b[k + 1] - 1 : N - 1);
    for (let k = 1; k < n; k++) b[k] = Math.max(b[k], b[k - 1] + 1);
    /* start each lesson on a learn screen where one is close by */
    for (let k = 1; k < n; k++) {
      if (S[b[k]] && S[b[k]].type === 'learn') continue;
      const lo = b[k - 1] + 1, hi = (k + 1 < n ? b[k + 1] : N) - 1; let best = null;
      for (let d = 1; d <= 3 && best == null; d++) {
        if (b[k] + d <= hi && S[b[k] + d].type === 'learn') best = b[k] + d;
        else if (d <= 2 && b[k] - d >= lo && S[b[k] - d].type === 'learn') best = b[k] - d;
      }
      if (best != null) b[k] = best;
    }
    return b.map((from, k) => {
      const to = k + 1 < n ? b[k + 1] : N, list = [];
      for (let i = from; i < to; i++) list.push({ s: S[i], si: i });
      const ch = { from, to, list, learns: list.filter(x => x.s.type === 'learn'), acts: list.filter(x => ACTS.includes(x.s.type)), writes: list.filter(x => x.s.type === 'write'), checkin: list.some(x => x.s.type === 'checkin') };
      ch.text = list.map(({ s }) => [s.title, s.html, s.plain, s.intro, s.q, s.main, s.stimulus, s.prompt, (s.items || []).map(x => x && (x.text || x.t)).join(' '), (s.pairs || []).map(p => p && (p.l + ' ' + p.r)).join(' '), (s.lines || []).join(' ')].filter(Boolean).map(x => strip(typeof x === 'string' ? x : '')).join(' ')).join(' ');
      ch.tset = new Set(toks(ch.text)); ch.titles = new Set(ch.learns.flatMap(x => toks(x.s.title)));
      return ch;
    });
  }

  /* ---------------- objectives → measurable outcomes ---------------- */
  const VL = {};
  [['Remember', 'define state list name identify recall label recognise recognize memorise locate tell'],
  ['Understand', 'explain describe outline summarise summarize classify interpret illustrate paraphrase discuss give report express indicate'],
  ['Analyse', 'analyse analyze compare contrast differentiate distinguish examine categorise categorize investigate organise organize trace diagnose debug deconstruct relate'],
  ['Evaluate', 'evaluate assess justify critique judge recommend argue defend choose prioritise prioritize appraise review reflect decide select weigh'],
  ['Create', 'create design develop compose produce construct generate plan build devise formulate write propose draft storyboard prototype script record film publish code program'],
  ['Apply', 'apply use demonstrate calculate convert solve prepare key type format operate perform implement set sit place practise practice proofread insert enter save print configure draw complete show edit manipulate merge send file store retrieve compute test troubleshoot install modify take make follow carry maintain manage navigate respond handle']
  ].forEach(([lv, ws]) => ws.split(' ').forEach(w => { if (!VL[w]) VL[w] = lv; }));
  const FIX = { understand: 'explain', know: 'state', appreciate: 'discuss', learn: 'describe', become: 'describe', gain: 'demonstrate', explore: 'investigate', consider: 'discuss', see: 'identify', realise: 'explain', realize: 'explain', grasp: 'explain' };
  function soLabels(refs) {
    const out = [];
    refs.forEach(r => {
      const parts = String(r).split(/;\s*/), has26 = parts.some(p => /2026/.test(p) && /SO/.test(p));
      parts.forEach(p => {
        p = p.trim(); if (/^Earlier/i.test(p) && has26) return;
        const so = p.match(/SO\s?\d+(?:\.\d+)*(?:\s?\([a-z]\))*/g);
        if (so) so.forEach(x => out.push(x.replace(/^SO\s?/, 'SO ').replace(/\s+\(/g, '(') + (/2026/.test(p) ? ' (2026 syllabus)' : /Earlier/i.test(p) ? ' (earlier syllabus)' : '')));
        else { const co = p.match(/course outline\s+([\d.]+)/i); if (co) out.push('Course outline ' + co[1]); }
      });
    });
    return uniq(out);
  }
  function swbat(t) {
    const w0 = (t.match(/^[A-Za-z-]+/) || [''])[0]; let v = w0.toLowerCase();
    if (/^be (aware|familiar)\s+(of|with)\s+/i.test(t)) { t = t.replace(/^be (aware|familiar)\s+(of|with)\s+/i, 'describe '); v = 'describe'; }
    else if (FIX[v]) { t = FIX[v] + t.slice(w0.length); v = FIX[v]; }
    t = t.replace(/\byourself\b/gi, 'themselves').replace(/\byours\b/gi, 'theirs').replace(/\byour\b/gi, 'their').replace(/\byou\b/gi, 'they');
    return { text: low1(t), bloom: VL[v] || 'Apply', verb: v };
  }
  function parseObj(raw) {
    let t = strip(raw); const refs = []; let ext = false;
    t = t.replace(/\s*\[([^\]]*)\]/g, (m0, inner) => { refs.push(inner); return ''; });
    t = t.replace(/\s*\((SO[^()]*(?:\([^()]*\)[^()]*)*)\)/g, (m0, inner) => { refs.push(inner); return ''; });
    t = t.replace(/\s*\((?:enrichment|extension)\)/gi, () => { ext = true; return ''; });
    t = (x => /2027/.test(x) ? sents(x).join(' ') : x)(clean(t)).replace(/^By the end[^,]*?(?:you|students) will be able to\s*/i, '').replace(/[\s.;:,]+$/, '');
    const o = swbat(t); o.so = soLabels(refs); o.ext = ext; o.src = t; return o;
  }
  function expandObj(o) {
    if (o.text.length <= 170 || o.text.indexOf(':') < 0) return [o];
    const i = o.text.indexOf(':'), head = o.text.slice(0, i).trim(), rest = o.text.slice(i + 1).trim();
    let parts = rest.split(/;\s*/);
    if (parts.length < 2) parts = rest.split(/,\s+(?=(?:and\s+)?(?:the|its|their|how|why|what)\s)/i);
    parts = parts.map(p => p.replace(/^and\s+/i, '').replace(/[.;,\s]+$/, '').trim()).filter(p => p.length > 3);
    if (parts.length < 2) return [o];
    return parts.map(p => Object.assign({}, o, { text: head + ', focusing on ' + p }));
  }
  function titleOutcome(t) {
    t = txt(t).replace(/^(?:Recap|Review|Introduction|Intro|Part \d+)\s*:\s*/i, '').replace(/[\s.]+$/, ''); let m;
    if ((m = t.match(/^What (is|are) (.+?)\??$/i))) return { text: `explain what ${m[2]} ${m[1].toLowerCase()}`, bloom: 'Understand', verb: 'explain', so: [] };
    if ((m = t.match(/^(Why|How) (.+?)\??$/i))) return { text: `explain ${m[1].toLowerCase()} ${m[2]}`, bloom: 'Understand', verb: 'explain', so: [] };
    return { text: 'describe ' + lowTitle(t.replace(/\?$/, '')), bloom: 'Understand', verb: 'describe', so: [] };
  }
  function unitObjectives(u) {
    const L = (u.objectives || []).map(parseObj).filter(o => o.text);
    if (L.length) return L.flatMap(expandObj);
    return (u.screens || []).filter(s => s.type === 'learn').slice(0, 4).map(s => titleOutcome(s.title));
  }
  function assignOutcomes(ctx) {
    const { chunks, objs } = ctx, n = chunks.length;
    if (n === 1) { const L = objs.slice(0, 6); if (!L.length && chunks[0].list[0]) L.push(titleOutcome(chunks[0].list[0].s.title)); return [L]; }
    const sets = chunks.map(() => []);
    const scored = objs.map((o, oi) => {
      const ot = uniq(toks(o.text));
      return { o, oi, sc: chunks.map(c => ot.reduce((a, w) => a + (c.titles.has(w) ? 3 : 0) + (c.tset.has(w) ? 1 : 0), 0)) };
    });
    scored.forEach(x => {
      let best = 0; x.sc.forEach((v, k) => { if (v > x.sc[best] || (v === x.sc[best] && sets[k].length < sets[best].length)) best = k; });
      if (!x.sc[best]) best = Math.min(n - 1, Math.floor(x.oi * n / Math.max(1, objs.length)));
      sets[best].push(x);
    });
    return sets.map((list, k) => {
      if (!list.length) {
        const cand = scored.filter(x => x.sc[k] > 0).sort((a, b) => b.sc[k] - a.sc[k])[0];
        if (cand) list.push(cand);
        else { const c = chunks[k], s0 = (c.learns[0] || c.list[0] || {}).s; if (s0) list.push({ o: titleOutcome(s0.title), oi: 99, sc: [] }); }
      }
      return list.sort((a, b) => (b.sc[k] || 0) - (a.sc[k] || 0)).slice(0, 4).sort((a, b) => a.oi - b.oi).map(x => x.o);
    });
  }

  /* ---------------- key vocabulary from the glossary ---------------- */
  const GLC = {};
  function glossaryFor(m) {
    if (GLC[m.id]) return GLC[m.id];
    const out = [], seen = new Set();
    const add = (t, d, w) => {
      t = strip(t); const k = t.toLowerCase(); if (!t || seen.has(k) || /^#+$/.test(t)) return; seen.add(k);
      const base = t.replace(/\s*\([^)]*\)\s*/g, ' ').trim(), acr = (t.match(/\(([A-Z][A-Za-z0-9]{1,6})\)/) || [])[1];
      const forms = [];
      if (base.length >= 3 || /^[A-Z0-9]{2,6}$/.test(base)) forms.push(/^[A-Z0-9]{2,6}$/.test(base) ? new RegExp('(?:^|[^A-Za-z0-9])' + escRe(base) + '(?![A-Za-z0-9])', 'g') : new RegExp('(?:^|[^a-z0-9])' + escRe(base.toLowerCase()) + '(?:s|es)?(?![a-z0-9])', 'gi'));
      if (acr) forms.push(new RegExp('(?:^|[^A-Za-z0-9])' + escRe(acr) + '(?![A-Za-z0-9])', 'g'));
      if (forms.length) out.push({ t, d: txt(d || ''), w, forms, low: base.toLowerCase() });
    };
    (m.glossary || []).forEach(g => g && add(g.term, g.def, 2));
    const G = window.COURSE_GLOSSARY, num = String(m.id).replace(/\D/g, ''), isP = /^P/.test(m.id);
    if (G && Array.isArray(G.terms)) G.terms.forEach(x => { if (x && (x.c === m.id || (Array.isArray(x.m) && x.m.includes(isP ? 'P' : num)))) add(x.t, (x.d || [])[0], 1); });
    return (GLC[m.id] = out);
  }
  function vocabFor(m, c, max) {
    const text = c.text, bold = new Set();
    c.learns.forEach(({ s }) => String(s.html || '').replace(/<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/gi, (z, x) => { bold.add(strip(x).toLowerCase()); return z; }));
    const hits = [];
    glossaryFor(m).forEach(g => {
      let n = 0; g.forms.forEach(re => { re.lastIndex = 0; const mm = text.match(re); if (mm) n += mm.length; });
      const b = bold.has(g.low), single = !/\s/.test(g.low) && !/^[A-Z0-9]{2,6}$/.test(g.t);
      if (n && (b || n >= 2 || !single) && !(/\(/.test(g.t) && !b && n < 3)) hits.push({ t: g.t, d: g.d, sc: n + (b ? 4 : 0) + g.w });
    });
    return hits.sort((a, b) => b.sc - a.sc).slice(0, max || 8).map(h => ({ t: /^[a-z][a-z]/.test(h.t) ? cap1(h.t) : h.t, d: short(sents(h.d)[0] || h.d, 170) }));
  }
  const boldTerms = c => uniq(c.learns.flatMap(({ s }) => (String(s.html || '').match(/<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/gi) || []).map(x => txt(x)))).filter(x => x.length > 2 && x.length < 40 && x.split(/\s+/).length <= 4 && !/[.:?!,;]$/.test(x) && !/^(how|why|what|when|where|the|a|an|to|and|or|of|in|on|for|with|is|are)\b/i.test(x)).map(x => /^[a-z][a-z]/.test(x) ? cap1(x) : x);

  /* ---------------- games, labs, videos, quizzes ---------------- */
  const EDPM_GAMES = [
    ['typing', 'Typing Quest', 'II', 'touch typing speed accuracy keyboard'], ['showdown', 'EDPM Showdown', '*', 'review quiz'],
    ['tabquest', 'Tabulation Quest', 'IV', 'spreadsheet tabulation ranges formatting formulas charts invoices'],
    ['cv', 'Résumé Studio', 'V IX', 'resume curriculum vitae application letter job'], ['interview', 'The Interview Room', 'VII IX', 'interview job thank-you email'],
    ['dress', 'Dress for Success', 'IX', 'grooming dress professional image'], ['ergo', 'Fit-Out: The Ergonomic Office', 'I', 'ergonomic office workstation hazards furniture'],
    ['pcbuild', 'PC Build Lab', 'I', 'computer types storage data entry devices hardware'], ['print', 'Print Lab', 'I', 'printer printing output'],
    ['jeff', 'It\'s Giving Jeff', 'I', 'posture ergonomic health'], ['health', 'Health & Safety Squad', 'I', 'health safety hazards computer injury'],
    ['org', 'Chart the Company', 'VI', 'organisational chart organization structure chain command'], ['design', 'Office Architect', 'I VIII', 'office layout open-plan cellular filing secure'],
    ['inbox', 'Inbox Hero', 'VII', 'email e-mail netiquette attachments subject'], ['tz', 'Time Zone Navigator', 'VI VII', 'time zone communication electronic'],
    ['people', 'Office Life: People Skills', 'IX', 'customer coworker ethics workplace behaviour'], ['ip', 'IP Court', 'IX', 'copyright patent trademark intellectual property'],
    ['shortcuts', 'Shortcut Sprint', 'II IV', 'shortcut keys keyboard windows word excel'], ['pagerange', 'Page Range', '*', 'review'],
    ['cells', 'Cell by Cell', 'IV', 'spreadsheet cell formulas references'], ['island', 'EDPM Island Arcade', '*', 'manuscript signs paper sizes typing'],
    ['docprep', 'Doc Prep Royale', 'IV V VI', 'document preparation letter memo report table']
  ];
  const COMM_GAMES = [
    ['mainidea', 'Main Idea Quest', /main (idea|point)|author['’]s purpose|reading strateg/i], ['crossword', 'Word Nerd Crossword', /literary|device|figurative/i],
    ['jigsaw', 'Device Puzzle Rush', /literary device/i], ['songs', 'Lyric Lab', /literary|song/i], ['orgstrat', 'Blueprint Breakers', /organi[sz]ational strateg/i],
    ['discourse', 'Discourse Detective', /discourse/i], ['transitions', 'Causeway Crew: Transitions', /transition|writing organi[sz]ation|cohesi/i],
    ['hooks', 'Hook, Line and Genre', /genre|hook|rhetoric/i], ['datacollection', 'Data Hunters', /data collection|research|questionnaire|interview|survey|sources/i],
    ['media', 'Old School vs New School Media', /new media|traditional/i], ['argpers', 'Prove It or Move It', /argument|persua|rhetorical appeal/i],
    ['debate', 'Mic Drop: Debate Showdown', /speech|speaking|debate|delivery/i], ['pasttenses', 'Time Travellers: Past Tense Challenge', /tense|grammar|usage/i],
    ['ncdessay', 'Plate Power: The NCD Essay Mission', /reflective|expository|section b/i], ['ncdassign', 'Mic & Story: The NCD Challenge', /paper 032|justification/i]
  ];
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  function unitResources(ctx) {
    const { m, u } = ctx, id = cid(), UR = (window.DM_UNIT_RESOURCES || {})[u.id] || {}, META = window.DM_UNIT_GAME_META || {};
    const utext = [u.title].concat(u.objectives || []).map(strip).join(' '), uset = new Set(toks(utext));
    const vids = [], vseen = new Set();
    const addV = (t, q, level) => { t = txt(t); if (!t || vseen.has((q || t).toLowerCase())) return; vseen.add((q || t).toLowerCase()); vids.push({ t, q: q || t, level: level || '' }); };
    (u.videos || []).forEach(v => v && addV(v.title || v.t, v.q, v.level)); (UR.videos || []).forEach(v => v && addV(v.t || v.title, v.q, v.level));
    let games = (UR.games || []).filter(g => g && g.id).map(g => ({ id: g.id, t: (META[g.id] && META[g.id].t) || g.id, why: txt(g.why || ''), go: 'edpmgames' }));
    if (id === 'edpm') {
      const r = ((m.code || '').match(/\b([IVX]+)\b/) || [])[1] || ROMAN[ordId(m.id) - 1];
      const L = EDPM_GAMES.filter(g => g[2] === '*' || g[2].split(' ').includes(r)).map(g => ({ id: g[0], t: g[1], why: '', go: 'edpmgames', sc: overlap(g[3] + ' ' + g[1], uset) + (g[2] === '*' ? -0.5 : 0) }));
      games = games.concat(L.filter(g => g.sc > 0).sort((a, b) => b.sc - a.sc).slice(0, 3));
      if (!games.length) games = L.filter(g => g.id === 'showdown' || g.id === 'pagerange');
    }
    if (id === 'comm') {
      const mod = String(m.id);
      games = games.concat(COMM_GAMES.filter(g => g[2].test(utext) && (/^P/.test(mod) ? /^nc/.test(g[0]) || g[0] === 'hooks' : !/^nc/.test(g[0]))).slice(0, 3).map(g => ({ id: g[0], t: g[1], why: '', go: 'game' })));
    }
    const LABS = window.EDPM_LABS || [], lids = new Set(UR.labs || []);
    let labs = LABS.filter(l => l && (lids.has(l.id) || (Array.isArray(l.units) && l.units.includes(u.id))));
    if (!labs.length && id === 'edpm') labs = LABS.filter(l => l && l.sec === m.id).map(l => ({ l, sc: overlap(l.title + ' ' + strip(l.brief || '').slice(0, 400), uset) })).filter(x => x.sc >= 2).sort((a, b) => b.sc - a.sc).slice(0, 2).map(x => x.l);
    return { vids, games, labs: labs.map(l => ({ id: l.id, t: txt(l.title), time: +l.time || 0, level: l.level || '', app: l.app || '', brief: txt(l.brief || '') })), quiz: findQuiz(u), UR };
  }
  function findQuiz(u) {
    const QB = window.COURSE_QUIZBANK, t = txt(u.title).toLowerCase(); if (!Array.isArray(QB) || !t) return null;
    for (const p of QB) for (const q of (p && p.quizzes) || []) { const qt = String((q && q.title) || '').toLowerCase(); if (/quiz/.test(qt) && qt.includes(t)) return { title: q.title, n: (q.items || []).length }; }
    return null;
  }
  function slidesIn(c) {
    const out = [];
    c.learns.forEach(({ s }) => { const h = String(s.html || ''), pdf = h.match(/slides\/[\w-]+\/[\w.-]+\.pdf/), n = (h.match(/slides\/[\w-]+\/s-\d+\.(?:jpg|png|webp)/g) || []).length; if (pdf || n) out.push({ t: txt(s.title), n, pdf: !!pdf }); });
    return out;
  }
  /* distribute unit-level resources across lessons by topic match */
  function spread(items, chunks, textOf, fallback) {
    const per = chunks.map(() => []);
    items.forEach((it, i) => {
      const sc = chunks.map(c => overlap(textOf(it), c.tset)); let best = 0; sc.forEach((v, k) => { if (v > sc[best]) best = k; });
      if (!sc[best]) best = fallback === 'last' ? chunks.length - 1 : i % chunks.length;
      per[best].push(it);
    });
    return per;
  }

  /* ---------------- Caribbean hook, cross-curricular links ---------------- */
  const PLACES = /\b(Sint Maarten|St\.? Maarten|SXM|Philipsburg|Simpson Bay|Cole Bay|Dutch Quarter|Great Bay|Maho|Marigot|Saint[- ]Martin|St\.? Martin|Princess Juliana|Front Street|Great Salt Pond|Anguilla|Barbados|Bridgetown|Jamaica|Kingston|Montego Bay|Trinidad|Tobago|Port of Spain|San Fernando|St\.? Lucia|Saint Lucia|Castries|Antigua|Barbuda|St\.? John['’]s|Grenada|St\.? George['’]s|Dominica|Roseau|Guyana|Georgetown|St\.? Kitts|Nevis|Basseterre|Belize|Bahamas|Nassau|Cayman|Cura[cç]ao|Aruba|Bonaire|St\.? Vincent|Kingstown|Montserrat|Haiti|Suriname|Saba|St\.? Eustatius|Statia|Frigate Bay|Caribbean|CARICOM|Carnival)\b/;
  function hookFor(ctx, c) {
    const pools = [];
    c.list.forEach(({ s }) => {
      if (s.type === 'write' && s.stimulus) pools.push({ t: s.stimulus, src: s.title });
      if (s.type === 'scenario') pools.push({ t: s.intro || (s.nodes && s.nodes.start && s.nodes.start.text) || '', src: s.title });
    });
    c.learns.forEach(({ s }) => { if (!isSlides(s)) pools.push({ t: prose(s.html), src: s.title, learn: true }); });
    c.acts.forEach(({ s }) => pools.push({ t: (s.intro || '') + ' ' + (s.q || ''), src: s.title }));
    (ctx.u.screens || []).forEach(s => { if (s.type === 'write' && s.stimulus) pools.push({ t: s.stimulus, src: s.title }); });
    for (const p of pools) {
      const ss = sents(txt(p.t)).filter(x => PLACES.test(x) && x.length >= 40 && x.length <= 420 && x.split(/\s+/).length >= 8 && /^[A-Z“"‘]/.test(x) && !/^.{0,60}:\s/.test(x) && !/^(Read|Answer|Write|Use|Tap|Drag|Choose|Sort|Match)\b/.test(x) && !/\b(you will|this screen|scroll|click)\b/i.test(x));
      if (ss.length) return { text: short(ss.slice(0, p.learn ? 1 : 2).join(' '), 380), src: txt(p.src) };
    }
    return null;
  }
  const XC = [
    ['Mathematics', /\b(calculat\w*|binary|formula\w*|percentage\w*|statistic\w*|graphs?|charts?|ratios?|averages?|algorithms?|spreadsheets?|measurements?)\b/gi, 'calculation and data handling'],
    ['Principles of Business', /\b(business\w*|customers?|marketing|invoices?|budgets?|entrepreneur\w*|sales|profits?|companies|company|employees?|clients?)\b/gi, 'business and workplace contexts'],
    ['English A / Communication', /\b(reports?|letters?|memos?|essays?|audiences?|persuasi\w*|summar\w*|proofread\w*|speech\w*)\b/gi, 'writing for a purpose and an audience'],
    ['Social Studies / Caribbean Studies', /\b(Caribbean|culture\w*|community|communities|society|identity|tourism|government|citizens?|heritage)\b/gi, 'Caribbean society and community'],
    ['Visual Arts', /\b(design\w*|colou?rs?|composition|graphics?|posters?|images?|layouts?|typograph\w*|logos?)\b/gi, 'visual design and communication'],
    ['Physics / Integrated Science', /\b(signals?|electric\w*|energy|frequenc\w*|waves?|circuits?|sensors?|voltage|light|sound waves)\b/gi, 'the science behind the technology'],
    ['Geography', /\b(hurricanes?|maps?|climate|environment\w*|weather|disasters?|GPS|coast\w*)\b/gi, 'environment and natural hazards'],
    ['Health and Family Life Education', /\b(posture|ergonom\w*|health\w*|safety|stress|wellbeing|eye strain)\b/gi, 'health and safety'],
    ['Music / Performing Arts', /\b(audio|music\w*|songs?|podcasts?|perform\w*|drama|rhythm)\b/gi, 'sound and performance'],
    ['Information Technology', /\b(computers?|software|internet|online|database\w*|networks?|apps?|websites?)\b/gi, 'digital tools and systems'],
    ['Social Studies (law and ethics)', /\b(copyright|intellectual property|ethic\w*|privacy|laws?|legal|plagiari\w*|licen[cs]\w*)\b/gi, 'rights and responsibilities'],
    ['Modern Languages', /\b(Dutch|Spanish|French|Papiamento|Kreyòl|Creole|bilingual)\b/gi, 'language and identity']
  ];
  function xcFor(c) {
    const own = { comm: 'English A / Communication', itu1: 'Information Technology', csecit: 'Information Technology', edpm: '' }[cid()] || '';
    return XC.filter(x => x[0] !== own).map(([name, re, focus]) => { re.lastIndex = 0; const mm = c.text.match(re) || []; return { name, focus, n: mm.length, eg: uniq(mm.map(w => stem(w.toLowerCase()) === w.toLowerCase() ? w.toLowerCase() : w.toLowerCase())).filter((w, i, a) => a.findIndex(y => stem(y) === stem(w)) === i).slice(0, 3) }; }).filter(x => x.n >= 2).sort((a, b) => b.n - a.n).slice(0, 3);
  }

  /* ---------------- minutes that add up exactly ---------------- */
  const MINS = { starter: 4, di: 6, gp: 6, ip: 5, cfu: 3, plen: 4, brk: 2, recap: 3 };
  function alloc(T, list) {
    const unit = T >= 60 && T % 5 === 0 ? 5 : 1, U = Math.round(T / unit), W = list.reduce((a, x) => a + x.w, 0) || 1;
    const minU = list.map(x => Math.ceil((x.min || 1) / unit)), raw = list.map(x => U * x.w / W);
    const v = raw.map((r, i) => Math.max(minU[i], Math.floor(r)));
    let diff = U - v.reduce((a, b) => a + b, 0), guard = 0;
    const order = raw.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]).map(x => x[1]);
    while (diff && guard++ < 400) {
      if (diff > 0) { for (const i of order) { if (!diff) break; v[i]++; diff--; } }
      else { const big = v.map((x, i) => [x - minU[i], i]).sort((a, b) => b[0] - a[0]); if (big[0][0] <= 0) break; v[big[0][1]]--; diff++; }
    }
    const out = {}; list.forEach((x, i) => { out[x.id] = v[i] * unit; });
    const sum = Object.values(out).reduce((a, b) => a + b, 0); if (sum !== T) out[list[list.length - 1].id] += T - sum;
    return out;
  }
  const PH = { starter: 'Engage / starter', di: 'Direct instruction', gp: 'Guided practice', ip: 'Independent practice', cfu: 'Check for understanding', plen: 'Plenary / exit ticket', brk: 'Transition', recap: 'Re-engage' };

  /* ---------------- questions from the unit ---------------- */
  const L4 = 'ABCDEFGH';
  function mcqOf(s) {
    if (!s || has27(s.q, s.options, s.items)) return null;
    if (s.type === 'mcq' && Array.isArray(s.options) && s.options.length) { const a = s.options.findIndex(o => o && o.ok); if (a < 0) return null; return { q: txt(s.q || s.title), opts: s.options.map(o => txt(o.t)), a, why: txt(s.options[a].fb || ''), src: txt(s.title) }; }
    if (s.type === 'multi' && Array.isArray(s.items) && s.items[0] && Array.isArray(s.items[0].options)) { const it = s.items[0], st = txt(s.q || s.title); return { q: txt(it.text) + (/\?$/.test(st) && !/\?$/.test(txt(it.text)) ? ' ' + st : ''), opts: it.options.map(txt), a: +it.answer || 0, why: txt(it.fb || ''), src: txt(s.title) }; }
    return null;
  }
  function testItem(m, c) {
    const items = ((m.test && m.test.items) || []).filter(x => x && Array.isArray(x.options) && x.options.length && x.answer != null && !has27(x.q, x.options, x.why));
    let best = null, bs = 1;
    items.forEach(it => { const sc = overlap(strip(it.q) + ' ' + it.options.map(strip).join(' '), c.tset); if (sc > bs) { bs = sc; best = it; } });
    return best ? { q: txt(best.q), opts: best.options.map(txt), a: +best.answer, why: txt(best.why || ''), src: txt((m.test && m.test.title) || 'Module test') } : null;
  }
  const qHTML = (x, withAns) => `<p><b>${esc(x.q)}</b></p><ol type="A">${x.opts.map(o => `<li>${esc(o)}</li>`).join('')}</ol>${withAns ? `<p><i>Answer: ${L4[x.a] || '?'}${x.why ? '. ' + esc(short(x.why, 220)) : ''}</i></p>` : ''}`;
  const prose = h => String(h || '').replace(/<table[\s\S]*?<\/table>/gi, ' ').replace(/<div class="slidedeck"[\s\S]*?<\/div>/gi, ' ').replace(/<\/(h[1-6]|li|figcaption)>/gi, '. ').replace(/\.\s*\./g, '.').replace(/([?!:])\s*\./g, '$1');
  const isSlides = s => /^Class slides\b/i.test(strip(s.title || '')) || /class="slidedeck"/.test(String(s.html || ''));
  function keyPoint(s) {
    if (isSlides(s)) return 'present the class slides, then teach from the notes that follow.';
    const h = prose(s.html), bold = (h.match(/<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/gi) || []).map(x => strip(x).toLowerCase()).filter(x => x.length > 2);
    const ss = sents(txt(h)).filter(x => x.length >= 35 && x.length <= 300 && !/^(Welcome|In this|This screen|Let['’]s|You will|Scroll|These are the class slides|Watch|Read the|Tap|Drag|Click)\b/i.test(x));
    return short(ss.find(x => bold.some(b => x.toLowerCase().includes(b))) || ss[0] || '', 230);
  }
  function exampleIn(c, skip) {
    const all = c.learns.filter(l => !isSlides(l.s)).flatMap(({ s }) => sents(txt(prose(s.html)))).filter(x => x.length >= 40 && x.length <= 300 && !/^(Welcome|Scroll|Read the)\b/.test(x) && x !== skip && !(skip && skip.indexOf(x) >= 0));
    const pick = all.find(x => /\b(for example|for instance|e\.g\.)/i.test(x)) || all.find(x => PLACES.test(x));
    return pick ? short(pick, 260) : '';
  }
  const tutorHint = c => { for (const { s } of c.acts) { const t = Array.isArray(s.tutor) && s.tutor[0]; if (t) { const p = txt(t.p || ''); if (p) { const hh = txt(t.h || ''); return (hh ? hh + (/[?.!:]$/.test(hh) ? ' ' : ': ') : '') + short(p, 200); } } } return ''; };
  const marksOf = w => { const r = Array.isArray(w.rubric) ? w.rubric.reduce((a, x) => a + (+x.marks || 0), 0) : 0; if (r) return r; const m = String(w.genre || w.title || '').match(/(\d+)\s*marks?/i); return m ? +m[1] : 0; };
  const criteriaOf = w => (Array.isArray(w.rubric) ? w.rubric.map(r => `${txt(r.criterion)}${r.marks ? ' (' + r.marks + ')' : ''}`) : []);
  const asQuestion = o => cap1(o.text.replace(/[.;\s]+$/, '')) + '.' + (/Remember|Understand/.test(o.bloom) ? ' Give one example from your own territory or the wider Caribbean.' : '');

  /* ---------------- one lesson ---------------- */
  function phasesFor(ctx, c) {
    const { set, T } = ctx, hasWrite = c.writes.length > 0;
    let ph;
    if (set.len === 'dbl') {
      const per = Math.round(T / 2), a = alloc(per, [{ id: 'starter', w: 18, min: 4 }, { id: 'di', w: 40, min: 6 }, { id: 'gp', w: 42, min: 6 }]);
      const b = alloc(T - per, [{ id: 'brk', w: 5, min: 2 }, { id: 'recap', w: 10, min: 3 }, { id: 'ip', w: 50, min: 5 }, { id: 'cfu', w: 15, min: 3 }, { id: 'plen', w: 20, min: 4 }]);
      ph = ['starter', 'di', 'gp'].map(id => ({ id, min: a[id], period: 1 })).concat(['brk', 'recap', 'ip', 'cfu', 'plen'].map(id => ({ id, min: b[id], period: 2 })));
    } else {
      const w = hasWrite ? { starter: 10, di: 18, gp: 20, ip: 34, cfu: 8, plen: 10 } : { starter: 12, di: 25, gp: 25, ip: 20, cfu: 8, plen: 10 };
      const a = alloc(T, Object.keys(w).map(id => ({ id, w: w[id], min: MINS[id] })));
      ph = Object.keys(w).map(id => ({ id, min: a[id] }));
    }
    return ph;
  }
  function splitActs(c, ph, x) {
    const gpMin = (ph.find(p => p.id === 'gp') || {}).min || 10; let used = 0; x.gpActs = []; x.ipActs = [];
    c.acts.forEach(a => { if (x.gpActs.length < 3 && (used + est(a.s) <= gpMin + 2 || !x.gpActs.length)) { x.gpActs.push(a); used += est(a.s); } else x.ipActs.push(a); });
  }
  const actLine = a => `<li><b>${esc(KIND[a.s.type] || 'Activity')}</b> · “${esc(txt(a.s.title))}”${a.s.bloom ? ` <span class="lpp-tag">(${esc(a.s.bloom)})</span>` : ''}</li>`;
  function phaseText(ctx, c, k, p, x) {
    const { m, ui, n, u, C } = ctx, last = k === n - 1, out = { t: '', s: '', r: '' };
    const LT = c.learns.map(l => txt(l.s.title));
    if (p.id === 'starter') {
      const rq = x.retrieval;
      if (rq.length) out.t += `<p><b>Retrieval (no notes):</b></p><ol>${rq.map(q => `<li>${esc(q)}</li>`).join('')}</ol>`;
      if (x.hook) out.t += `<p><b>Hook:</b> display and read aloud: “${esc(x.hook.text)}”</p>`;
      out.t += `<p>Ask: <b>${esc(x.hookQ)}</b> Take three answers and link them to today's outcomes.</p>`;
      out.s = rq.length ? '<p>Answer the retrieval questions alone, then check with a partner.</p><p>Think, pair, share: one idea about the hook.</p>' : '<p>Think, pair, share: discuss the hook and suggest one idea to the class.</p>';
      out.r = `<p>Projector; mini-whiteboards${x.hook ? `; scenario from “${esc(x.hook.src)}”` : ''}</p>`;
    } else if (p.id === 'di') {
      const L = c.learns.slice(0, 5);
      out.t = L.length ? `<p>Teach from the course screens on the projector:</p><ul>${L.map(l => { const kp = keyPoint(l.s); return `<li><b>${esc(txt(l.s.title))}</b>${kp ? ': ' + esc(kp) : ''}</li>`; }).join('')}</ul>${c.learns.length > 5 ? `<p>Also: ${c.learns.slice(5).map(l => '“' + esc(txt(l.s.title)) + '”').join(', ')}.</p>` : ''}`
        : `<p>Introduce the task: ${esc(txt((c.list[0] || {}).s ? c.list[0].s.title : u.title))}. Model the first step aloud.</p>`;
      if (x.example) out.t += `<p><b>Model:</b> ${esc(x.example)}</p>`;
      out.t += '<p>Check as you go with cold-call questions; no hands up.</p>';
      out.s = '<p>Take structured notes: each key term with a definition and one example.</p><p>Answer quick questions on mini-whiteboards.</p>';
      out.r = `<p>${LT.length ? 'Course screens: ' + LT.slice(0, 5).map(t => '“' + esc(t) + '”').join(', ') : 'Course screens'}${x.slides.length ? '; class slides' : ''}</p>`;
    } else if (p.id === 'gp') {
      if (x.gpActs.length) {
        out.t = `<p>Pairs work through these course activities while you circulate:</p><ul>${x.gpActs.map(actLine).join('')}</ul>`;
        if (x.hint) out.t += `<p><b>Prompt to give:</b> ${esc(x.hint)}</p>`;
        out.s = '<p>Complete the activities in pairs, explaining each choice to a partner; use the feedback to correct answers.</p>';
        out.r = `<p>Course activity screens; one device between two</p>`;
      } else {
        out.t = `<p>Work through an example together${x.hook ? ' using the hook scenario' : ''}: students suggest each step; you write it up.</p>`;
        out.s = '<p>Suggest the next step and justify it; copy the worked example.</p>';
        out.r = '<p>Whiteboard; course screen</p>';
      }
    } else if (p.id === 'ip') {
      const parts = [], sp = [];
      if (c.writes.length) {
        const w = c.writes[0].s, mk = marksOf(w), cr = criteriaOf(w);
        parts.push(`<p><b>Written task:</b> “${esc(txt(w.title))}”${w.genre ? ` (${esc(txt(w.genre))})` : ''}${w.min || w.max ? `, ${w.min || ''}${w.min && w.max ? '–' : ''}${w.max || ''} words` : ''}${mk && !/marks?\b/i.test(String(w.genre || '')) ? `, ${mk} marks` : ''}.</p>`);
        if (cr.length) parts.push(`<p>Share the success criteria: ${esc(cr.join('; '))}.</p>`);
        if (w.teacherTip) parts.push(`<p><b>Tip:</b> ${esc(short(txt(w.teacherTip), 260))}</p>`);
        sp.push('<p>Plan, write and self-check against the checklist on the course.</p>');
        out.r = '<p>Course written task screen; rubric</p>';
      } else if (x.ipActs.length) {
        parts.push(`<p>Students complete on their own:</p><ul>${x.ipActs.slice(0, 4).map(actLine).join('')}</ul>`);
        sp.push('<p>Work alone; note one question to ask the teacher.</p>');
        out.r = '<p>Course activity screens; devices</p>';
      }
      if (x.lab && (ctx.T >= 60 || ctx.set.len === 'dbl' || !parts.length)) {
        parts.push(`<p><b>Practical lab:</b> ${esc(x.lab.id)} “${esc(x.lab.t)}”${x.lab.time ? ` (${x.lab.time} minutes${x.lab.time > p.min ? '; start in class and finish for homework' : ''})` : ''}.</p>`);
        sp.push('<p>Complete the lab tasks and check them against the lab checklist.</p>');
        out.r = (out.r ? out.r.replace('</p>', '; ') : '<p>') + 'Practical Labs (' + esc(x.lab.id) + ')</p>';
      }
      if (!parts.length) {
        if (x.exam) { parts.push(`<p>Exam-style practice: students answer, then write one sentence to justify the answer.</p>${qHTML(x.exam, true)}`); sp.push('<p>Answer the item and justify it in one sentence.</p>'); out.r = '<p>Printed or projected item</p>'; }
        else { parts.push(`<p>Students write a short answer: ${esc(asQuestion(x.outs[0] || { text: 'summarise the lesson', bloom: 'Understand' }))}</p>`); sp.push('<p>Write the answer in full sentences.</p>'); out.r = '<p>Exercise books</p>'; }
      }
      out.t = parts.join(''); out.s = sp.join('');
    } else if (p.id === 'cfu') {
      if (x.hinge) out.t = `<p><b>Hinge question</b> (everyone shows a mini-whiteboard at once):</p>${qHTML(x.hinge, true)}<p>If fewer than four in five are correct, re-teach the point with a new example before moving on.</p>`;
      else out.t = `<p>Cold-call three students: ${esc(asQuestion(x.outs[0] || { text: 'explain the main idea of the lesson', bloom: 'Understand' }))}</p>`;
      if (c.checkin) out.t += "<p>Students then complete the course's Quick check-in.</p>";
      out.s = '<p>Answer on mini-whiteboards and justify the choice.</p>';
      out.r = '<p>Mini-whiteboards</p>';
    } else if (p.id === 'plen') {
      out.t = `<p><b>Exit ticket:</b> ${esc(x.exit)}</p><p>Sort the tickets into got it, nearly and not yet to plan the next lesson.</p>${x.next ? `<p>Preview: ${esc(x.next)}</p>` : ''}`;
      out.s = '<p>Complete the exit ticket and rate confidence against each outcome (green, amber, red).</p>';
      out.r = '<p>Exit-ticket slips or sticky notes</p>';
    } else if (p.id === 'brk') {
      out.t = `<p>Short movement break; set up devices${x.lab ? ' for the practical lab' : ''}.</p>`; out.s = '<p>Stretch, get water and log in.</p>'; out.r = '<p>–</p>';
    } else if (p.id === 'recap') {
      out.t = `<p>Recap period 1 with two quick questions on ${LT.slice(0, 2).map(t => '“' + esc(t) + '”').join(' and ') || 'the first half of the lesson'}.</p>`; out.s = '<p>Answer orally; add to notes.</p>'; out.r = '<p>Notes</p>';
    }
    return out;
  }
  function lessonPlan(ctx, c, k, lite) {
    const { m, ui, u, n, C, res } = ctx, last = k === n - 1, prev = k > 0 ? ctx.chunks[k - 1] : null;
    const outs = ctx.outByLesson[k] || [], LT = c.learns.filter(l => !isSlides(l.s)).map(l => txt(l.s.title));
    const hook = hookFor(ctx, c);
    const x = { outs, hook, example: exampleIn(c, hook && hook.text), hint: tutorHint(c), slides: slidesIn(c), lab: (ctx.labsBy[k] || [])[0] || null };
    const firstQ = LT[0] && /\?$/.test(LT[0]) ? LT[0] : '';
    x.hookQ = firstQ || (x.hook ? (/Remember|Understand/.test((outs[0] || {}).bloom || '') ? 'What do you already know that could help here?' : 'What would you do first here, and why?') : `What do you already know about ${lowTitle(txt(u.title))}?`);
    /* retrieval questions from the previous lesson or unit */
    const rq = [];
    const shortQs = list => list.map(mcqOf).filter(q => q && q.q.length <= 170 && /\?$/.test(q.q)).map(q => q.q);
    const titleQ = t => (/\?$/.test(t) ? t : `In one sentence, explain “${t}”.`);
    if (prev) {
      rq.push(...shortQs(prev.list.map(x2 => x2.s)).slice(-1));
      boldTerms(prev).slice(0, 1).forEach(t => rq.push(`Define “${t}” and give an example.`));
      prev.learns.filter(l => !isSlides(l.s)).forEach(l => { if (rq.length < 3) rq.push(titleQ(txt(l.s.title))); });
    } else if (ui > 0) {
      const pu = m.units[ui - 1]; rq.push(...shortQs(pu.screens || []).slice(-2));
      if (rq.length < 2) { const pl = (pu.screens || []).filter(s => s.type === 'learn' && !isSlides(s)).slice(-1)[0]; if (pl) rq.push(titleQ(txt(pl.title))); }
      if (!rq.length) rq.push(`In one sentence, what was Unit ${ui} (“${txt(pu.title)}”) about?`);
    }
    x.retrieval = rq.slice(0, 3);
    const seq = phasesFor(ctx, c);
    splitActs(c, seq, x);
    const notGp = c.acts.filter(a => !x.gpActs.includes(a)).map(a => mcqOf(a.s)).filter(Boolean), anyQ = c.acts.map(a => mcqOf(a.s)).filter(Boolean);
    x.hinge = notGp[notGp.length - 1] || anyQ[anyQ.length - 1] || null;
    x.exam = testItem(m, c);
    if (!x.hinge) x.hinge = x.exam;
    x.exit = asQuestion(outs[0] || { text: 'summarise the most important idea from today', bloom: 'Understand' });
    const nc = ctx.chunks[k + 1];
    x.next = nc ? `next lesson: ${nc.learns.slice(0, 2).map(l => '“' + txt(l.s.title) + '”').join(' and ') || 'the next part of the unit'}.` : (m.units[ui + 1] ? `next unit: Unit ${ui + 2}, “${txt(m.units[ui + 1].title)}”.` : `the ${txt((m.test && m.test.title) || 'module test')} and the Paper 02 practice task.`);
    seq.forEach(p => Object.assign(p, phaseText(ctx, c, k, p, x)));
    const vocab = lite ? [] : vocabFor(m, c, 8);
    const g = {};
    const topic = txt(u.title) + (n > 1 && LT.length ? ': ' + LT.slice(0, 2).join('; ') : '');
    g['h.topic'] = esc(topic);
    g['h.mu'] = `${esc(modLabel(m))}<br>Unit ${ui + 1}: ${esc(txt(u.title))}<br><span class="lpp-muted">Week ${ui + 1} of the release schedule (unit opens ${esc(fmtDate(relIso(ui), true))}) · course screens ${c.from + 1}–${c.to} of ${(u.screens || []).length}</span>`;
    const so = uniq(ctx.objs.flatMap(o => o.so || []));
    g['h.so'] = `${so.length ? `<p><b>${esc(so.join(', '))}</b></p>` : ''}<ul>${uniq(outs.map(o => o.src || o.text)).map(t => `<li>${esc(cap1(t))}</li>`).join('')}</ul>`;
    g.outcomes = `<p>By the end of the lesson, students will be able to:</p><ol>${outs.map(o => `<li>${esc(o.text)} <span class="lpp-tag">(${esc(o.bloom)}${o.ext ? ', extension' : ''})</span></li>`).join('')}</ol>`;
    /* prior knowledge */
    const pk = [];
    if (prev) { pk.push(`From lesson ${k}: ${prev.learns.filter(l => !isSlides(l.s)).map(l => '“' + esc(txt(l.s.title)) + '”').slice(0, 4).join(', ') || 'the earlier course screens'}.`); const po = (ctx.outByLesson[k - 1] || [])[0]; if (po) pk.push(`Students can already ${esc(po.text)}.`); }
    else if (ui > 0) { const pu = m.units[ui - 1], po = unitObjectives(pu)[0]; pk.push(`From Unit ${ui}, “${esc(txt(pu.title))}”${po ? `: students can ${esc(po.text)}` : ''}.`); }
    else { const mi = MODS().indexOf(m); if (mi > 0) pk.push(`From ${esc(modLabel(MODS()[mi - 1]))}.`); pk.push(`Everyday experience of ${esc(lowTitle(txt(u.title)))}; find out what students bring with the starter.`); }
    const recap = c.learns.filter(l => /^(Recap|Review)\b/i.test(txt(l.s.title))); if (recap.length) pk.push(`Recap screen: “${esc(txt(recap[0].s.title))}”.`);
    pk.push('Check this in the starter and adjust the pace of direct instruction.');
    g.prior = `<ul>${pk.map(p => `<li>${p}</li>`).join('')}</ul>`;
    if (!lite) {
      const bt = vocab.length < 4 ? boldTerms(c).filter(t => !vocab.some(v => v.t.toLowerCase() === t.toLowerCase())).slice(0, 6 - vocab.length) : [];
      g.vocab = vocab.length || bt.length ? `<ul>${vocab.map(v => `<li><b>${esc(v.t)}</b>${v.d ? ': ' + esc(v.d) : ''}</li>`).join('')}${bt.map(t => `<li><b>${esc(t)}</b>: define with the class from the course screen.</li>`).join('')}</ul>` : '<p>Use the bold terms on today\'s course screens and the course glossary.</p>';
    }
    /* resources */
    const R = [], scr = c.list.map(({ s }) => `${KIND[s.type] || 'Screen'}: ${txt(s.title || 'Check-in')}`);
    R.push(`<li><b>Course screens (${c.list.length}):</b> ${esc(scr.join('; '))}.</li>`);
    const vids = ctx.vidsBy[k] || []; if (vids.length) R.push(`<li><b>Video${vids.length > 1 ? 's' : ''}:</b> ${vids.map(v => `${esc(v.t)} (YouTube search: “${esc(v.q)}”)`).join('; ')}.</li>`);
    const games = ctx.gamesBy[k] || []; if (games.length) R.push(`<li><b>Games and simulators:</b> ${games.map(gm => esc(gm.t) + (gm.why ? ' (' + esc(short(gm.why, 110)) + ')' : '')).join('; ')}.</li>`);
    (ctx.labsBy[k] || []).forEach(l => R.push(`<li><b>Practical lab ${esc(l.id)}:</b> ${esc(l.t)}${l.time ? ` (${l.time} min${l.level ? ', ' + esc(l.level) : ''})` : ''}.</li>`));
    if (x.slides.length) R.push(`<li><b>Class slides:</b> ${x.slides.map(s => `${esc(s.t)}${s.n ? ` (${s.n} slides${s.pdf ? ', PDF to print' : ''})` : ''}`).join('; ')}.</li>`);
    if (res.quiz && last) R.push(`<li><b>Unit quiz:</b> “${esc(res.quiz.title)}” (${res.quiz.n} questions) in the Quiz Centre.</li>`);
    const MAT = { lang: 'Projector or interactive whiteboard; mini-whiteboards and markers; highlighters for annotating extracts; exit-ticket slips', it: 'Projector; computers or tablets (one between two); mini-whiteboards and markers; exit-ticket slips', dm: 'Projector; devices (one between two); headphones for video; sketch paper for planning; exit-ticket slips', edpm: 'Computer lab with Microsoft Office; projector; printed source copy where the task needs it; exit-ticket slips' }[C.kind] || 'Projector; mini-whiteboards; exit-ticket slips';
    const APPS = { word: 'Microsoft Word', excel: 'Microsoft Excel', access: 'Microsoft Access', ppt: 'Microsoft PowerPoint', pub: 'Microsoft Publisher', windows: 'Windows', web: 'a web browser and text editor', design: 'a graphic design app', research: 'Internet access for research', code: 'a code editor', video: 'a video editor', audio: 'an audio editor' };
    const apps = uniq((ctx.labsBy[k] || []).map(l => APPS[l.app]).filter(Boolean));
    R.push(`<li><b>Materials:</b> ${esc(MAT)}${apps.length ? '; ' + esc(apps.join(', ')) : ''}.</li>`);
    g.resources = `<ul>${R.join('')}</ul>`;
    g.hook = x.hook ? `<p>“${esc(x.hook.text)}”</p><p class="lpp-muted">From the course screen “${esc(x.hook.src)}”.</p><p>Question for the class: <b>${esc(x.hookQ)}</b></p>` : `<p>Open with a local example: where do students meet ${esc(lowTitle(txt(u.title)))} in their own community (home, school, local businesses, the port or the airport)?</p><p>Question for the class: <b>${esc(x.hookQ)}</b></p>`;
    seq.forEach(p => { g[`seq.${p.id}.p`] = esc(PH[p.id]); g[`seq.${p.id}.t`] = p.t; g[`seq.${p.id}.s`] = p.s; g[`seq.${p.id}.r`] = p.r; g[`seq.${p.id}.min`] = String(p.min); });
    /* differentiation */
    const easyT = c.list.filter(({ s }) => s.easy && s.easy.title).map(({ s }) => txt(s.easy.title)), upT = c.list.filter(({ s }) => s.up && s.up.title).map(({ s }) => txt(s.up.title));
    const plainT = c.learns.filter(l => l.s.plain).map(l => txt(l.s.title)), deepT = c.learns.filter(l => l.s.deeper).map(l => txt(l.s.title));
    const big = ((res.UR && res.UR.dialDown && res.UR.dialDown.big) || []).slice(0, 2).map(txt);
    const vw = vocab.slice(0, 5).map(v => v.t);
    const f = [], co = [], ch = [];
    if (easyT.length) f.push(`Set the Foundation level on the course for: ${easyT.slice(0, 4).map(t => '“' + esc(t) + '”').join(', ')}.`);
    if (plainT.length) f.push(`Use the “In plain words” notes on ${plainT.slice(0, 3).map(t => '“' + esc(t) + '”').join(', ')}.`);
    if (big.length) f.push(`Key idea cards: ${big.map(b => '“' + esc(short(b, 140)) + '”').join(' ')}`);
    if (x.hint) f.push(`Give the hint early: ${esc(x.hint)}`);
    f.push(`Word bank${vw.length ? ' (' + esc(vw.join(', ')) + ')' : ''} and sentence starters${cid() === 'comm' ? ' using PEEL (Point, Evidence, Explanation, Link)' : ''}.`);
    f.push('Model one answer first, chunk instructions into short steps and pair with a supportive partner.');
    f.push('Students still building English (for example, Spanish, Dutch, Papiamento or Haitian Kreyòl speakers): a bilingual glossary of the key terms.');
    co.push(x.gpActs.length ? `Complete the core activities: ${x.gpActs.concat(x.ipActs).slice(0, 5).map(a => '“' + esc(txt(a.s.title)) + '”').join(', ')}.` : 'Complete the guided and independent tasks as planned.');
    if (c.writes.length) { const w = c.writes[0].s, cr = criteriaOf(w); co.push(`Written task “${esc(txt(w.title))}” at the standard level${cr.length ? '; success criteria: ' + esc(cr.join('; ')) : ''}.`); }
    co.push('Use the course feedback on each activity to correct errors before the hinge question.');
    if (upT.length) ch.push(`Set the Challenge level on the course for: ${upT.slice(0, 4).map(t => '“' + esc(t) + '”').join(', ')}.`);
    if (deepT.length) ch.push(`Read the “Challenge: go further” notes on ${deepT.slice(0, 3).map(t => '“' + esc(t) + '”').join(', ')}.`);
    if (c.writes.length && c.writes[0].s.up && c.writes[0].s.up.title) ch.push(`Challenge version of the written task: “${esc(txt(c.writes[0].s.up.title))}”.`);
    const ext = outs.filter(o => o.ext); if (ext.length) ch.push(`Extension outcome: ${esc(ext[0].text)}.`);
    ch.push(`Answer with higher command words: evaluate, justify, recommend; compare the local example with another Caribbean territory.`);
    ch.push('Write one exam-style question on today\'s content, with a mark scheme, for a partner to answer.');
    g['diff.f'] = `<ul>${f.map(t => `<li>${t}</li>`).join('')}</ul>`;
    g['diff.c'] = `<ul>${co.map(t => `<li>${t}</li>`).join('')}</ul>`;
    g['diff.ch'] = `<ul>${ch.map(t => `<li>${t}</li>`).join('')}</ul>`;
    /* assessment */
    const A = ['<li><b>Formative:</b> hinge question, questioning and observation during guided practice, and the exit ticket.</li>'];
    if (c.checkin) A.push("<li><b>Course check-in:</b> review the class confidence ratings from the Quick check-in.</li>");
    if (c.writes.length) { const w = c.writes[0].s, mk = marksOf(w); A.push(`<li><b>Written task:</b> “${esc(txt(w.title))}”${mk ? ` (${mk} marks)` : ''}; mark with the rubric on the course${cid() === 'comm' ? '; analysis paragraphs follow PEEL' : ''}.</li>`); }
    else if (x.exam && x.exam !== x.hinge) A.push(`<li><b>Exam-style item</b> (from the ${esc(x.exam.src)}): ${esc(short(x.exam.q, 200))} <i>Answer: ${L4[x.exam.a]}</i>.</li>`);
    if (res.quiz && last) A.push(`<li><b>Unit quiz:</b> “${esc(res.quiz.title)}” (${res.quiz.n} questions) in the Quiz Centre.</li>`);
    if (last && ui === m.units.length - 1 && m.test) A.push(`<li><b>${esc(txt(m.test.title || 'Module test'))}:</b> ${(m.test.items || []).length} items, pass mark ${m.test.pass || 70}%.</li>`);
    if (m.paper2 && (last || n === 1)) A.push(`<li><b>Paper 02 link:</b> ${esc(txt(m.paper2.title || 'Paper 02 practice'))}${m.paper2.genre ? ` (${esc(txt(m.paper2.genre))})` : ''}.</li>`);
    if (C.sba) { const st = plugTitle('sba') || plugTitle('portfolio'); const direct = /\bSBA\b/.test(strip((u.screens || []).map(s => s.html || '').join(' ')) + ' ' + (u.objectives || []).join(' ')); A.push(`<li><b>SBA link:</b> ${direct ? 'this unit refers directly to the SBA; ' : ''}connect today's skills to the SBA stage the class is on${st ? ` (${esc(st)})` : ''}.</li>`); }
    if (cid() === 'comm' && (/^P/.test(m.id) || /\b032\b|Paper 3/.test(c.text))) A.push('<li><b>Paper 032 link:</b> Section A (20 marks) and Section B (40 marks: a 200–250 word piece plus a 50–100 word justification).</li>');
    if (cid() === 'itu1' && m.id === 'M3') A.push('<li><b>Paper 03 link:</b> Module 3 is examined by Paper 03; use today\'s work as practice for it.</li>');
    g.assess = `<ul>${A.join('')}</ul>`;
    /* homework */
    const H = [];
    if (!last) { const nl = nc => nc && nc.learns[0] ? '“' + esc(txt(nc.learns[0].s.title)) + '”' : ''; const nx = nl(ctx.chunks[k + 1]); H.push(`Review today's screens on the course${LT.length ? ' (' + LT.slice(0, 3).map(t => '“' + esc(t) + '”').join(', ') + ')' : ''}${nx ? ` and read ahead: ${nx}` : ''}.`); }
    if (vocab.length) H.push(`Learn these terms: ${esc(vocab.slice(0, 4).map(v => v.t).join(', '))}. Write each in your own words with a Caribbean example.`);
    if (c.writes.length) H.push(`Finish the written task “${esc(txt(c.writes[0].s.title))}” if it was not completed in class.`);
    if (last && res.quiz) H.push(`Complete the unit quiz “${esc(res.quiz.title)}”.`);
    if (last && games.length) H.push(`Review game: ${esc(games[0].t)}.`);
    if (x.lab && x.lab.time > ((seq.find(p => p.id === 'ip') || {}).min || 0)) H.push(`Finish practical lab ${esc(x.lab.id)}.`);
    const asg = (m.assignments || []).filter(a => a && overlap(a.title + ' ' + strip(a.brief || ''), c.tset) >= 2)[0];
    if (asg && last) H.push(`Optional assignment ${esc(asg.id || '')}: “${esc(txt(asg.title))}”.`);
    if (last && ui === m.units.length - 1) H.push(`Revise for the ${esc(txt((m.test && m.test.title) || 'module test'))}${m.paper2 ? ' and attempt the Paper 02 practice task' : ''}.`);
    if (!H.length) H.push('Review today\'s course screens and note one question for the next lesson.');
    g.hw = `<ul>${H.map(h => `<li>${h}</li>`).join('')}</ul>`;
    if (!lite) { const xc = xcFor(c); g.xc = xc.length ? `<ul>${xc.map(z => `<li><b>${esc(z.name)}:</b> ${esc(z.focus)} (in today's lesson: ${esc(z.eg.join(', '))}).</li>`).join('')}</ul>` : '<p>Links to Social Studies and English A through the Caribbean examples and written answers.</p>'; }
    g.reflect = '<p><b>What went well:</b></p><p><br></p><p><b>Even better if:</b></p><p><br></p><p><b>Students to follow up:</b></p><p><br></p><p><b>Next steps:</b></p><p><br></p>';
    return { k, c, outs, seq, gen: g, x, topic, focus: LT, acts: c.acts.map(a => txt(a.s.title)), games, labs: ctx.labsBy[k] || [], vids };
  }
  const GENC = new Map();
  function gen(m, ui, set, n, lite) {
    const ck = [cid(), m.id, ui, set.len, clampPer(set.per), n, lite ? 1 : 0].join('|');
    if (GENC.has(ck)) return GENC.get(ck);
    if (GENC.size > 80) GENC.clear();
    const r = gen0(m, ui, set, n, lite); GENC.set(ck, r); return r;
  }
  function gen0(m, ui, set, n, lite) {
    const u = m.units[ui], T = totalLen(set), chunks = chunkUnit(u, n);
    const ctx = { C: course(), m, ui, u, set, T, n: chunks.length, chunks };
    ctx.objs = unitObjectives(u); ctx.outByLesson = assignOutcomes(ctx); ctx.res = unitResources(ctx);
    const tx = it => it.t + ' ' + (it.why || '') + ' ' + (it.q || '') + ' ' + (it.brief || '').slice(0, 300);
    ctx.vidsBy = spread(ctx.res.vids, chunks, tx).map(L => L.slice(0, 2));
    ctx.gamesBy = spread(ctx.res.games, chunks, tx, 'last').map(L => L.slice(0, 3));
    ctx.labsBy = spread(ctx.res.labs, chunks, tx, 'last');
    return chunks.map((c, k) => lessonPlan(ctx, c, k, lite));
  }

  /* ---------------- drafts ---------------- */
  function normLessons(d, n) {
    const pool = (d.lessons || []).concat(d.spare || []).filter(L => L && typeof L === 'object'), out = [];
    for (let i = 0; i < n; i++) { out.push(pool.find(L => !L.dup && L.src === i) || { src: i, edits: {} }); pool.filter(L => L.dup && L.src === i).forEach(L => out.push(L)); }
    out.forEach(L => { if (!L.edits || typeof L.edits !== 'object') L.edits = {}; });
    const left = pool.filter(L => !out.includes(L) && L.edits && Object.keys(L.edits).length);
    if (left.length) d.spare = left.slice(0, 12); else delete d.spare;
    d.lessons = out;
  }
  function draftFor(m, ui) {
    const u = m.units[ui], P = prefs(); let d = loadDraft(u);
    if (!d) d = { v: 1, set: { len: P.len, per: P.per, n: 0, cls: P.cls, date: '' }, lessons: [], fresh: true };
    const s = d.set; if (s.len !== 'dbl' && !LENS.includes(+s.len)) s.len = 40; s.per = clampPer(s.per);
    const auto = defaultN(u, totalLen(s)); d.auto = auto;
    d.n = Math.max(1, Math.min(6, (u.screens || []).length || 1, +s.n || auto));
    normLessons(d, d.n);
    return d;
  }
  function plansFor(m, ui, lite) {
    const d = draftFor(m, ui), base = gen(m, ui, d.set, d.n, lite);
    const start = okIso(d.set.date) ? d.set.date : defStart(ui);
    return { d, base, start, list: d.lessons.map((L, i) => ({ L, i, p: base[L.src] || base[0], date: addSchool(start, L.src) })) };
  }

  /* ---------------- document HTML (screen, print and Word) ---------------- */
  const FLABEL = { 'h.school': 'School', 'h.teacher': 'Teacher', 'h.cls': 'Class or form', 'h.date': 'Date', 'h.topic': 'Topic', 'h.mu': 'Module and unit', 'h.so': 'Syllabus specific objectives', outcomes: 'Learning outcomes', prior: 'Prior knowledge', vocab: 'Key vocabulary', resources: 'Resources and materials', hook: 'Context hook', 'diff.f': 'Foundation', 'diff.c': 'Core', 'diff.ch': 'Challenge', assess: 'Assessment', hw: 'Homework', xc: 'Cross-curricular links', reflect: 'Teacher reflection' };
  const ariaFor = key => { const m = key.match(/^seq\.(\w+)\.(p|t|s|r|min)$/); const l = m ? `${PH[m[1]] || m[1]}: ${{ p: 'phase', t: 'teacher activity', s: 'student activity', r: 'resources', min: 'minutes' }[m[2]]}` : (FLABEL[key] || key); return ` role="textbox" aria-multiline="${m && m[2] === 'min' || /^h\.(school|teacher|cls|date)$/.test(key) ? 'false' : 'true'}" aria-label="${esc(l)}"`; };
  const minsOf = (p, ed) => p.seq.map(ph => { const e = ed && ed[`seq.${ph.id}.min`]; const v = e != null ? parseInt(strip(e), 10) : ph.min; return isFinite(v) && v >= 0 ? v : ph.min; });
  function lessonDoc(item, ctx, edit) {
    const { p, L } = item, ed = L.edits || {}, P = ctx.P, C = course();
    const v = key => (ed[key] != null ? ed[key] : (p.gen[key] || ''));
    const F = (key, tag, cls) => edit ? `<${tag || 'div'} class="lp-f ${cls || ''}" contenteditable="true" spellcheck="true" data-f="${key}"${ariaFor(key)}>${v(key)}</${tag || 'div'}>` : `<${tag || 'div'}${cls ? ` class="${cls}"` : ''}>${v(key)}</${tag || 'div'}>`;
    const Fv = (key, val, tag, cls) => edit ? `<${tag || 'span'} class="lp-f ${cls || ''}" contenteditable="true" spellcheck="true" data-f="${key}"${ariaFor(key)}>${val}</${tag || 'span'}>` : `<${tag || 'span'}${cls ? ` class="${cls}"` : ''}>${val}</${tag || 'span'}>`;
    const mins = minsOf(p, ed), total = mins.reduce((a, b) => a + b, 0), T = totalLen(ctx.d.set);
    const dur = ctx.d.set.len === 'dbl' ? `Double period (2 × ${clampPer(ctx.d.set.per)} = ${T} minutes)` : `${T} minutes`;
    const dateTxt = ed['h.date'] != null ? ed['h.date'] : esc(fmtDate(item.date) || 'To be confirmed');
    const cls = ed['h.cls'] != null ? ed['h.cls'] : esc(ctx.d.set.cls || P.cls);
    const H = (no, t) => `<h2 class="lpp-h">${no}. ${t}</h2>`;
    let h = `<div class="lpp-page"><div class="lpp-head" data-docx="skip">${Fv('h.school', esc(P.school), 'div', 'lpp-school')}<div class="lpp-title">Lesson Plan · ${esc(C.subject)}</div></div>`;
    h += `<table class="lpp-meta" data-cols="17,33,17,33"><colgroup><col style="width:17%"><col style="width:33%"><col style="width:17%"><col style="width:33%"></colgroup><tbody>
      <tr><td class="lpp-label">Teacher</td><td>${Fv('h.teacher', esc(P.teacher))}</td><td class="lpp-label">Class / Form</td><td>${Fv('h.cls', cls)}</td></tr>
      <tr><td class="lpp-label">Subject</td><td>${esc(C.subject)}</td><td class="lpp-label">Date</td><td>${Fv('h.date', dateTxt)}</td></tr>
      <tr><td class="lpp-label">Duration</td><td>${esc(dur)}</td><td class="lpp-label">Lesson</td><td>${L.src + 1} of ${ctx.d.n}${L.dup ? ' (copy)' : ''}</td></tr>
      <tr><td class="lpp-label">Topic</td><td colspan="3">${F('h.topic')}</td></tr>
      <tr><td class="lpp-label">Module / Unit</td><td colspan="3">${F('h.mu')}</td></tr>
      <tr><td class="lpp-label">Syllabus Specific Objectives</td><td colspan="3">${F('h.so')}</td></tr></tbody></table>`;
    h += H(1, 'Learning Outcomes') + F('outcomes');
    h += H(2, 'Prior Knowledge') + F('prior');
    h += H(3, 'Key Vocabulary') + F('vocab');
    h += H(4, 'Resources and Materials') + F('resources');
    h += H(5, 'Caribbean Context Hook') + F('hook');
    h += H(6, 'Timed Lesson Sequence');
    h += `<table class="lpp-seq" data-cols="8,7,15,29,25,16"><colgroup><col style="width:8%"><col style="width:7%"><col style="width:15%"><col style="width:29%"><col style="width:25%"><col style="width:16%"></colgroup><thead><tr><th>Time</th><th>Min</th><th>Phase</th><th>Teacher Activity</th><th>Student Activity</th><th>Resources / AfL</th></tr></thead><tbody>`;
    let t0 = 0, lastPeriod = 0;
    p.seq.forEach((ph, i) => {
      if (ph.period && ph.period !== lastPeriod) { lastPeriod = ph.period; const pm = p.seq.filter(q => q.period === ph.period).reduce((a, q) => a + mins[p.seq.indexOf(q)], 0); h += `<tr class="lpp-prow"><td colspan="6">Period ${ph.period} (${pm} minutes)</td></tr>`; }
      const mm = mins[i];
      h += `<tr data-ph="${ph.id}"><td class="lp-time" data-l="Time">${t0}–${t0 + mm}</td>${edit ? `<td class="lp-f lp-num" contenteditable="true" data-f="seq.${ph.id}.min" data-min data-l="Minutes" inputmode="numeric"${ariaFor(`seq.${ph.id}.min`)}>${mm}</td>` : `<td data-l="Minutes">${mm}</td>`}<td data-l="Phase">${F(`seq.${ph.id}.p`)}</td><td data-l="Teacher activity">${F(`seq.${ph.id}.t`)}</td><td data-l="Student activity">${F(`seq.${ph.id}.s`)}</td><td data-l="Resources / AfL">${F(`seq.${ph.id}.r`)}</td></tr>`;
      t0 += mm;
    });
    const ok = total === T;
    h += `<tr class="lpp-trow"><td colspan="6" data-total>Total: ${total} of ${T} minutes${ok ? ' ✓' : ` · adjust the minutes so they add up to ${T}`}</td></tr></tbody></table>`;
    h += H(7, 'Differentiation');
    h += `<table class="lpp-diff" data-cols="34,33,33"><colgroup><col style="width:34%"><col style="width:33%"><col style="width:33%"></colgroup><thead><tr><th>${edit ? '🪜 ' : ''}Foundation</th><th>Core</th><th>${edit ? '🚀 ' : ''}Challenge</th></tr></thead><tbody><tr><td data-l="Foundation">${F('diff.f')}</td><td data-l="Core">${F('diff.c')}</td><td data-l="Challenge">${F('diff.ch')}</td></tr></tbody></table>`;
    h += H(8, 'Assessment') + F('assess');
    h += H(9, 'Homework') + F('hw');
    h += H(10, 'Cross-Curricular Links') + F('xc');
    h += H(11, 'Teacher Reflection') + `<table class="lpp-box" data-cols="100"><tbody><tr data-h="2600"><td>${F('reflect')}</td></tr></tbody></table>`;
    h += `<p class="lpp-muted">Kester Small</p></div>`;
    return h;
  }
  function printable(items, ctx) { return `<div class="lpp-doc">${items.map(it => noEmoji(lessonDoc(it, ctx, false))).join('')}</div>`; }

  /* ---------------- scheme of work ---------------- */
  function sowData(modsSel, len) {
    const out = [];
    modsSel.forEach(m => {
      const rows = [];
      m.units.forEach((u, ui) => {
        const saved = loadDraft(u); let r;
        if (saved) r = plansFor(m, ui, true);
        else { const set = { len, per: prefs().per, n: 0, cls: prefs().cls, date: '' }; const n = defaultN(u, totalLen(set)); const base = gen(m, ui, set, n, true); const start = defStart(ui); r = { d: { set, n }, base, start, list: base.map((p, i) => ({ L: { src: i, edits: {} }, i, p, date: addSchool(start, i) })) }; }
        r.list.forEach(it => {
          const ed = it.L.edits || {}, p = it.p;
          const outs = ed.outcomes != null ? (String(ed.outcomes).match(/<li>([\s\S]*?)<\/li>/gi) || []).map(x => strip(x)) : p.outs.map(o => o.text);
          rows.push({ week: ui + 1, rel: relIso(ui), unit: `Unit ${ui + 1}: ${txt(u.title)}`, ui, k: it.L.src, n: r.d.n, dup: !!it.L.dup, date: it.date, len: r.d.set.len === 'dbl' ? 'Double period' : totalLen(r.d.set) + ' min', focus: p.focus, outs, acts: p.acts.slice(0, 5), games: p.games.map(g => g.t), labs: p.labs.map(l => l.id + ' ' + l.t), write: p.c.writes.map(w => txt(w.s.title)), hinge: !!p.x.hinge, quiz: p.k === r.d.n - 1 && (unitResources({ m, u }).quiz || null), saved: !!saved });
        });
      });
      out.push({ m, rows });
    });
    return out;
  }
  function sowDoc(data, P, len, edit) {
    const C = course();
    let h = `<div class="lpp-doc lpp-sowdoc"><div class="lpp-page"><div class="lpp-head" data-docx="skip"><div class="lpp-school">${esc(P.school)}</div><div class="lpp-title">Scheme of Work · ${esc(C.subject)}</div></div>`;
    h += `<p><b>Teacher:</b> ${esc(P.teacher)} · <b>Class:</b> ${esc(P.cls)} · <b>Lessons:</b> ${len === 'dbl' ? 'double periods' : len + ' minutes'} unless a unit has its own saved plan · <b>Weeks</b> follow the course release schedule: Unit 1 of every ${/Section/.test((data[0] && data[0].m.code) || '') ? 'section' : 'module'} opens Friday 23 October 2026, then one unit a week.</p>`;
    data.forEach(({ m, rows }) => {
      h += `<h2 class="lpp-h">${esc(modLabel(m))}</h2>`;
      h += `<table class="lpp-sow" data-cols="9,15,9,19,20,16,12"><colgroup><col style="width:9%"><col style="width:15%"><col style="width:9%"><col style="width:19%"><col style="width:20%"><col style="width:16%"><col style="width:12%"></colgroup><thead><tr><th>Week</th><th>Unit</th><th>Lesson</th><th>Focus (Course Screens)</th><th>Learning Outcomes</th><th>Activities and Resources</th><th>Assessment</th></tr></thead><tbody>`;
      rows.forEach(r => {
        const res = r.acts.map(a => '“' + esc(a) + '”').concat(r.games.map(esc), r.labs.map(l => 'Lab ' + esc(l)));
        const asm = [r.hinge ? 'Hinge question' : 'Questioning', 'exit ticket'].concat(r.write.map(w => 'written task “' + esc(w) + '”'), r.quiz ? ['unit quiz'] : []);
        h += `<tr><td data-l="Week"><b>Week ${r.week}</b><br>${esc(fmtDate(r.rel, true))}</td><td data-l="Unit">${esc(r.unit)}${r.saved ? ' <span class="lpp-tag">(saved plan)</span>' : ''}</td><td data-l="Lesson">${r.k + 1} of ${r.n}${r.dup ? ' (copy)' : ''}<br><span class="lpp-muted">${esc(fmtDate(r.date, true))} · ${esc(r.len)}</span></td><td data-l="Focus">${esc(r.focus.slice(0, 4).join('; ') || '–')}</td><td data-l="Outcomes"><ul>${r.outs.slice(0, 3).map(o => `<li>${esc(cap1(short(o, r.outs.length > 2 ? 95 : 130)))}</li>`).join('')}</ul></td><td data-l="Activities">${res.slice(0, 6).join('; ') || '–'}</td><td data-l="Assessment">${cap1(asm.join(', '))}</td></tr>`;
      });
      h += '</tbody></table>';
    });
    h += `<p class="lpp-muted">Kester Small</p></div></div>`;
    return edit ? h : noEmoji(h);
  }

  /* ---------------- Word (.docx) from the document HTML ---------------- */
  const XE = s => String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F￾￿]/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const W_NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
  function rPr(f) { let s = ''; if (f.b) s += '<w:b/><w:bCs/>'; if (f.i) s += '<w:i/><w:iCs/>'; if (f.color) s += `<w:color w:val="${f.color}"/>`; if (f.sz) s += `<w:sz w:val="${f.sz}"/><w:szCs w:val="${f.sz}"/>`; if (f.u) s += '<w:u w:val="single"/>'; return s ? `<w:rPr>${s}</w:rPr>` : ''; }
  function pPr(o) {
    let s = '';
    if (o.style) s += `<w:pStyle w:val="${o.style}"/>`; if (o.keepNext) s += '<w:keepNext/>';
    if (o.tabs) s += `<w:tabs>${o.tabs}</w:tabs>`;
    if (o.spacing) s += `<w:spacing ${o.spacing}/>`; if (o.ind) s += `<w:ind ${o.ind}/>`; if (o.jc) s += `<w:jc w:val="${o.jc}"/>`;
    return s ? `<w:pPr>${s}</w:pPr>` : '';
  }
  const INLINE = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'SPAN', 'A', 'SMALL', 'SUB', 'SUP', 'CODE', 'LABEL', 'Q', 'MARK', 'ABBR', 'CITE', 'TIME', 'FONT']);
  function inlineRuns(nodes, f, acc) {
    for (const ch of nodes) {
      if (ch.nodeType === 3) { const t = ch.nodeValue.replace(/\s+/g, ' '); if (t) acc.push({ t, f }); continue; }
      if (ch.nodeType !== 1) continue;
      const tg = ch.tagName;
      if (tg === 'BR') { acc.push({ br: true }); continue; }
      const g = Object.assign({}, f);
      if (tg === 'B' || tg === 'STRONG') g.b = true; if (tg === 'I' || tg === 'EM' || tg === 'CITE') g.i = true; if (tg === 'U') g.u = true;
      if (ch.classList && ch.classList.contains('lpp-muted')) { g.color = '555555'; g.sz = 18; }
      if (ch.classList && ch.classList.contains('lpp-tag')) { g.color = '2E5C8A'; g.i = true; }
      inlineRuns(ch.childNodes, g, acc);
    }
    return acc;
  }
  function trimRuns(runs) {
    const r = runs.slice(); while (r.length && r[0].t != null && !r[0].t.trim()) r.shift(); while (r.length && r[r.length - 1].t != null && !r[r.length - 1].t.trim()) r.pop();
    if (r.length && r[0].t != null) r[0] = Object.assign({}, r[0], { t: r[0].t.replace(/^\s+/, '') });
    if (r.length && r[r.length - 1].t != null) r[r.length - 1] = Object.assign({}, r[r.length - 1], { t: r[r.length - 1].t.replace(/\s+$/, '') });
    while (r.length && r[r.length - 1].br) r.pop();
    return r;
  }
  const runXML = r => r.br ? '<w:r><w:br/></w:r>' : r.tab ? '<w:r><w:tab/></w:r>' : `<w:r>${rPr(r.f || {})}<w:t xml:space="preserve">${XE(r.t)}</w:t></w:r>`;
  const paraXML = (runs, o) => `<w:p>${pPr(o || {})}${runs.map(runXML).join('')}</w:p>`;
  function docxBody(root, width) {
    function blocks(node, ctx) {
      const res = []; let pend = [];
      const flush = () => { const r = trimRuns(pend); if (r.some(x => x.br || x.tab || (x.t && x.t.trim()))) res.push(paraXML(r, ctx.cell ? { spacing: 'w:before="0" w:after="30"' } : {})); pend = []; };
      for (const ch of node.childNodes) {
        if (ch.nodeType === 3) { const t = ch.nodeValue.replace(/\s+/g, ' '); if (t.trim() || pend.length) pend.push({ t, f: ctx.f || {} }); continue; }
        if (ch.nodeType !== 1) continue;
        const tg = ch.tagName;
        if (ch.getAttribute('data-docx') === 'skip' || tg === 'COLGROUP' || tg === 'STYLE' || tg === 'SCRIPT') continue;
        if (tg === 'BR') { pend.push({ br: true }); continue; }
        if (INLINE.has(tg)) { inlineRuns([ch], ctx.f || {}, pend); continue; }
        flush();
        if (/^H[1-6]$/.test(tg)) { const lv = +tg[1]; res.push(paraXML(trimRuns(inlineRuns(ch.childNodes, {}, [])), { style: lv === 1 ? 'Title' : lv === 2 ? 'Heading2' : 'Heading3', keepNext: true })); }
        else if (tg === 'UL' || tg === 'OL') res.push(...list(ch, ctx, 0));
        else if (tg === 'TABLE') { res.push(table(ch)); if (!ctx.cell) res.push('<w:p><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr></w:p>'); }
        else res.push(...blocks(ch, ctx));
      }
      flush();
      return res;
    }
    function list(el, ctx, depth) {
      const res = [], ordered = el.tagName === 'OL', type = el.getAttribute('type') || '1'; let i = 0;
      for (const li of el.children) {
        if (li.tagName !== 'LI') continue; i++;
        const mark = ordered ? (type === 'A' ? String.fromCharCode(64 + i) + '.' : type === 'a' ? String.fromCharCode(96 + i) + '.' : i + '.') : '•';
        const inl = [], nested = [];
        for (const ch of li.childNodes) {
          if (ch.nodeType === 1 && (ch.tagName === 'UL' || ch.tagName === 'OL')) nested.push(ch);
          else if (ch.nodeType === 1 && (ch.tagName === 'P' || ch.tagName === 'DIV')) { if (inl.length) inl.push({ br: true }); inlineRuns(ch.childNodes, ctx.f || {}, inl); }
          else inlineRuns([ch], ctx.f || {}, inl);
        }
        const ind = 340 + depth * 340;
        res.push(paraXML([{ t: mark, f: ctx.f || {} }, { tab: true }].concat(trimRuns(inl)), { tabs: `<w:tab w:val="left" w:pos="${ind}"/>`, spacing: 'w:before="0" w:after="30"', ind: `w:left="${ind}" w:hanging="${ordered ? 300 : 220}"` }));
        nested.forEach(nn => res.push(...list(nn, ctx, depth + 1)));
      }
      return res;
    }
    function table(tb) {
      const cols = String(tb.getAttribute('data-cols') || '').split(',').map(Number).filter(x => x > 0);
      const rows = Array.from(tb.querySelectorAll('tr')).filter(r => r.closest('table') === tb);
      const ncol = cols.length || Math.max(1, ...rows.map(r => Array.from(r.children).reduce((a, c) => a + (+c.getAttribute('colspan') || 1), 0)));
      const pct = cols.length === ncol ? cols : Array(ncol).fill(100 / ncol), sum = pct.reduce((a, b) => a + b, 0), tw = pct.map(p => Math.round(width * p / sum));
      const B = ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(s => `<w:${s} w:val="single" w:sz="6" w:space="0" w:color="2E5C8A"/>`).join('');
      let x = `<w:tbl><w:tblPr><w:tblW w:w="${tw.reduce((a, b) => a + b, 0)}" w:type="dxa"/><w:tblBorders>${B}</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="45" w:type="dxa"/><w:left w:w="90" w:type="dxa"/><w:bottom w:w="45" w:type="dxa"/><w:right w:w="90" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${tw.map(w => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>`;
      rows.forEach(tr => {
        const head = tr.parentElement && tr.parentElement.tagName === 'THEAD', hgt = tr.getAttribute('data-h');
        x += `<w:tr><w:trPr>${head || tb.classList.contains('lpp-meta') || tr.classList.contains('lpp-prow') || tr.classList.contains('lpp-trow') ? '<w:cantSplit/>' : ''}${hgt ? `<w:trHeight w:val="${+hgt}"/>` : ''}${head ? '<w:tblHeader/>' : ''}</w:trPr>`;
        let ci = 0;
        Array.from(tr.children).forEach(td => {
          if (ci >= ncol) return;
          const span = Math.max(1, Math.min(ncol - ci, +td.getAttribute('colspan') || 1)), w = tw.slice(ci, ci + span).reduce((a, b) => a + b, 0); ci += span;
          const th = td.tagName === 'TH', lab = td.classList.contains('lpp-label'), prow = tr.classList.contains('lpp-prow'), trow = tr.classList.contains('lpp-trow');
          const fill = th ? '1F3864' : lab ? 'DCE6F2' : prow ? 'FFF4CC' : trow ? 'EEF2F8' : '';
          const f = th ? { b: true, color: 'FFFFFF' } : (lab || prow || trow) ? { b: true, color: '1F3864' } : {};
          let inner = blocks(td, { f, cell: true }).join(''); if (!inner || /<\/w:tbl>$/.test(inner)) inner += '<w:p/>';
          x += `<w:tc><w:tcPr><w:tcW w:w="${w}" w:type="dxa"/>${span > 1 ? `<w:gridSpan w:val="${span}"/>` : ''}${fill ? `<w:shd w:val="clear" w:color="auto" w:fill="${fill}"/>` : ''}</w:tcPr>${inner}</w:tc>`;
        });
        while (ci < ncol) { x += `<w:tc><w:tcPr><w:tcW w:w="${tw[ci]}" w:type="dxa"/></w:tcPr><w:p/></w:tc>`; ci++; }
        x += '</w:tr>';
      });
      return x + '</w:tbl>';
    }
    const out = [];
    const pages = root.querySelectorAll('.lpp-page');
    (pages.length ? Array.from(pages) : [root]).forEach((pg, i) => { if (i) out.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>'); out.push(...blocks(pg, {})); });
    return out.join('');
  }
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  function zip(files) {
    const enc = new TextEncoder(), parts = [], cen = [], DT = ((2026 - 1980) << 9) | (1 << 5) | 1; let off = 0;
    files.forEach(f => {
      const name = enc.encode(f.name), data = typeof f.data === 'string' ? enc.encode(f.data) : f.data, crc = crc32(data);
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true); h.setUint16(10, 0, true); h.setUint16(12, DT, true);
      h.setUint32(14, crc, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, name.length, true); h.setUint16(28, 0, true);
      parts.push(new Uint8Array(h.buffer), name, data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true); c.setUint16(12, 0, true); c.setUint16(14, DT, true);
      c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, name.length, true);
      c.setUint16(30, 0, true); c.setUint16(32, 0, true); c.setUint16(34, 0, true); c.setUint16(36, 0, true); c.setUint32(38, 0, true); c.setUint32(42, off, true);
      cen.push(new Uint8Array(c.buffer), name); off += 30 + name.length + data.length;
    });
    const cs = cen.reduce((a, b) => a + b.length, 0), e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(4, 0, true); e.setUint16(6, 0, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cs, true); e.setUint32(16, off, true); e.setUint16(20, 0, true);
    const all = parts.concat(cen, [new Uint8Array(e.buffer)]), out = new Uint8Array(all.reduce((a, b) => a + b.length, 0)); let p = 0; all.forEach(b => { out.set(b, p); p += b.length; });
    return out;
  }
  function buildDocx(html, o) {
    const PW = o.landscape ? 16838 : 11906, PH2 = o.landscape ? 11906 : 16838, M = 1021, width = PW - 2 * M;
    const dom = new DOMParser().parseFromString(`<!doctype html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`, 'text/html');
    const body = docxBody(dom.body, width);
    const sect = `<w:sectPr><w:headerReference w:type="default" r:id="rId3"/><w:footerReference w:type="default" r:id="rId4"/><w:pgSz w:w="${PW}" w:h="${PH2}"${o.landscape ? ' w:orient="landscape"' : ''}/><w:pgMar w:top="1134" w:right="${M}" w:bottom="1021" w:left="${M}" w:header="510" w:footer="454" w:gutter="0"/></w:sectPr>`;
    const XH = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
    const ct = `${XH}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`;
    const rels = `${XH}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`;
    const drels = `${XH}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>`;
    const F = '<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/>';
    const styles = `${XH}<w:styles ${W_NS}><w:docDefaults><w:rPrDefault><w:rPr>${F}<w:sz w:val="20"/><w:szCs w:val="20"/><w:lang w:val="en-GB" w:eastAsia="en-GB" w:bidi="ar-SA"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="60" w:line="252" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="80"/></w:pPr><w:rPr><w:b/><w:bCs/><w:color w:val="1F3864"/><w:sz w:val="32"/><w:szCs w:val="32"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="1" w:color="C9A227"/></w:pBdr><w:spacing w:before="200" w:after="80"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:bCs/><w:color w:val="1F3864"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="120" w:after="40"/><w:outlineLvl w:val="2"/></w:pPr><w:rPr><w:b/><w:bCs/><w:color w:val="2E5C8A"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></w:style>
<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:uiPriority w:val="99"/><w:semiHidden/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style></w:styles>`;
    const settings = `${XH}<w:settings ${W_NS}><w:defaultTabStop w:val="720"/><w:characterSpacingControl w:val="doNotCompress"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>`;
    const hdr = `${XH}<w:hdr ${W_NS}><w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="12" w:space="4" w:color="C9A227"/></w:pBdr><w:tabs><w:tab w:val="right" w:pos="${width}"/></w:tabs><w:spacing w:after="0"/></w:pPr><w:r><w:rPr><w:b/><w:bCs/><w:color w:val="1F3864"/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr><w:t xml:space="preserve">${XE(String(o.school || 'School name').toUpperCase())}</w:t></w:r><w:r><w:tab/></w:r><w:r><w:rPr><w:b/><w:bCs/><w:color w:val="2E5C8A"/><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr><w:t xml:space="preserve">${XE(o.headTitle)}</w:t></w:r></w:p></w:hdr>`;
    const fr = '<w:rPr><w:color w:val="555555"/><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr>';
    const ftr = `${XH}<w:ftr ${W_NS}><w:p><w:pPr><w:tabs><w:tab w:val="right" w:pos="${width}"/></w:tabs><w:spacing w:after="0"/></w:pPr><w:r>${fr}<w:t xml:space="preserve">${XE('Kester Small')}</w:t></w:r><w:r>${fr}<w:tab/></w:r><w:r>${fr}<w:t xml:space="preserve">Page </w:t></w:r><w:fldSimple w:instr=" PAGE "><w:r>${fr}<w:t>1</w:t></w:r></w:fldSimple></w:p></w:ftr>`;
    const core = `${XH}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${XE(o.title)}</dc:title><dc:creator>${XE(o.creator || 'Ms. Kester Small')}</dc:creator></cp:coreProperties>`;
    const doc = `${XH}<w:document ${W_NS}><w:body>${body}${sect}</w:body></w:document>`;
    return zip([{ name: '[Content_Types].xml', data: ct }, { name: '_rels/.rels', data: rels }, { name: 'word/document.xml', data: doc }, { name: 'word/_rels/document.xml.rels', data: drels }, { name: 'word/styles.xml', data: styles }, { name: 'word/settings.xml', data: settings }, { name: 'word/header1.xml', data: hdr }, { name: 'word/footer1.xml', data: ftr }, { name: 'docProps/core.xml', data: core }]);
  }

  /* ---------------- capabilities (design for absence) ---------------- */
  let SAMPLE = null, DL = null, CAPS = false;
  function initCaps() {
    if (CAPS) return; CAPS = true;
    const c = window.claude; if (!c || typeof c.use !== 'function') return;
    try { Promise.resolve(c.use('sample')).then(s => { SAMPLE = typeof s === 'function' ? s : null; refreshCaps(); }, () => { SAMPLE = null; }); } catch (e) { SAMPLE = null; }
    try { Promise.resolve(c.use('downloads')).then(d => { DL = d && typeof d.save === 'function' ? d : null; refreshCaps(); }, () => { DL = null; }); } catch (e) { DL = null; }
  }
  function refreshCaps() {
    document.querySelectorAll('.lp-wrap [data-cap="sample"]').forEach(b => { b.hidden = !SAMPLE; });
    document.querySelectorAll('.lp-wrap [data-cap="dl"]').forEach(b => { b.hidden = !DL; });
  }
  const fileName = s => noEmoji(s).replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim().slice(0, 150) + '.docx';
  async function saveWord(html, o) {
    if (!DL) return;
    let bytes; try { bytes = buildDocx(html, o); } catch (e) { toast('The Word file could not be built. Use Print instead.'); return; }
    try { const r = await DL.save({ filename: fileName(o.title), data: new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }) }); if (!r || r.status === 'saved') toast('Word file saved.'); }
    catch (e) {
      const c = e && e.code; if (c === 'declined') return;
      if (['unavailable', 'not_granted', 'capability_disabled', 'capability_removed', 'extension_not_enabled'].includes(c)) { DL = null; refreshCaps(); }
      toast(c === 'rate_limited' ? 'Another download is waiting for your answer.' : 'The download did not complete. Use Print instead.');
    }
  }
  function doPrint(html, landscape) {
    flush();
    const old = document.getElementById('lp-print'); if (old) old.remove();
    const w = document.createElement('div'); w.id = 'lp-print'; w.innerHTML = html; document.body.appendChild(w);
    let ps = document.getElementById('lp-page-css'); if (!ps) { ps = document.createElement('style'); ps.id = 'lp-page-css'; document.head.appendChild(ps); }
    ps.textContent = `@page{size:A4 ${landscape ? 'landscape' : 'portrait'};margin:12mm 12mm 14mm}`;
    document.documentElement.classList.add('lp-printing');
    const done = () => { document.documentElement.classList.remove('lp-printing'); const s = document.getElementById('lp-page-css'); if (s) s.remove(); const p = document.getElementById('lp-print'); if (p) p.remove(); };
    window.addEventListener('afterprint', done, { once: true });
    setTimeout(() => { try { window.print(); } catch (e) { done(); toast('Printing is not available here.'); } }, 60);
  }

  /* ---------------- smart draft ---------------- */
  let SMART = null; // {uid, src, ctl}
  function smartPrompt(item, ctx) {
    const C = course(), p = item.p, ed = item.L.edits || {}, v = k => strip(ed[k] != null ? ed[k] : p.gen[k] || '');
    const st = p.seq.find(q => q.id === 'starter') || {}, rules = ['Standard English with British/Caribbean spelling', 'Caribbean examples drawn from many territories (for example Jamaica, Trinidad and Tobago, Barbados, Guyana, Belize, the OECS states, the Dutch Caribbean and Sint Maarten), with no single territory dominating', 'accurate to the CXC ' + (C.exam || '') + ' syllabus', 'the top grade is called "Grade One"', 'never mention the year 2027', 'no brand names of chatbots or assistants', 'citations, if any, in APA style'];
    if (cid() === 'comm') rules.push('analysis paragraphs use PEEL (Point, Evidence, Explanation, Link)', 'essays are marked out of 25 (Content 10, Organization 7, Expression 8)');
    if (!C.sba) rules.push('do not mention SBA, School-Based Assessment or Internal Assessment');
    return [
      `You are an experienced Caribbean ${C.exam} teacher improving one lesson plan for ${C.subject} in a Caribbean secondary school.`,
      `Class: ${strip(ed['h.cls'] != null ? ed['h.cls'] : ctx.d.set.cls)} (students aged ${C.ages}). Lesson ${item.L.src + 1} of ${ctx.d.n}; ${totalLen(ctx.d.set)} minutes; starter ${st.min || 5} minutes.`,
      `Topic: ${v('h.topic')}.`, `Learning outcomes: ${v('outcomes')}`, `Current starter: ${v('seq.starter.t')}`,
      `Direct instruction: ${short(v('seq.di.t'), 1500)}`, `Guided practice: ${short(v('seq.gp.t'), 800)}`,
      `Current check-for-understanding: ${short(v('seq.cfu.t'), 800)}`, `Key vocabulary: ${short(v('vocab'), 800)}`, '',
      `Improve the starter, add worked examples and write better questions for THIS class. Rules: ${rules.join('; ')}.`,
      'Reply with only a JSON object, no Markdown: {"starter": "2 to 4 sentences the teacher can run in the starter time", "examples": ["worked example 1", "worked example 2"], "questions": [{"q": "question", "a": "model answer"}], "exit": "one exit-ticket question"}. Give 2 examples and 4 questions (one recall, two application, one evaluation). Plain text inside the strings.'
    ].join('\n');
  }
  async function runSmart(api) {
    const V = VS; if (!SAMPLE || !V || SMART) return; flush();
    const item = V.items[V.k]; if (!item) return;
    const u = V.m.units[V.ui], uid = u.id, src = V.k, ctl = new AbortController();
    SMART = { uid, src, ctl }; api.render();
    const fn = typeof SAMPLE.json === 'function' ? (pr, op) => SAMPLE.json(pr, op) : (pr, op) => SAMPLE(pr, op).then(r => { const t = String((r && r.text) || ''); const a = t.indexOf('{'), b = t.lastIndexOf('}'); return JSON.parse(t.slice(a, b + 1)); });
    try {
      const data = await fn(smartPrompt(item, V), { signal: ctl.signal });
      const S1 = x => (typeof x === 'string' ? clean(x).slice(0, 900) : '');
      const starter = S1(data && data.starter), ex = (Array.isArray(data && data.examples) ? data.examples : []).map(S1).filter(Boolean).slice(0, 3);
      const qs = (Array.isArray(data && data.questions) ? data.questions : []).filter(q => q && typeof q.q === 'string').slice(0, 6).map(q => ({ q: S1(q.q), a: S1(q.a) })), exit = S1(data && data.exit);
      if (!starter && !ex.length && !qs.length && !exit) throw { code: 'invalid_json' };
      const d = loadDraft(u) || V.d, L = (d.lessons || [])[src]; if (!L) throw { code: 'gone' };
      const base = item.p.gen, cur = k => (L.edits[k] != null ? L.edits[k] : base[k] || '');
      if (starter) L.edits['seq.starter.t'] = `<p><b>Starter:</b> ${esc(starter)}</p>` + (cur('seq.starter.t').match(/<p><b>Retrieval[\s\S]*?<\/ol>/) || [''])[0];
      if (ex.length) L.edits['seq.di.t'] = cur('seq.di.t') + `<p><b>Worked examples:</b></p><ol>${ex.map(e => `<li>${esc(e)}</li>`).join('')}</ol>`;
      if (qs.length) L.edits['seq.cfu.t'] = cur('seq.cfu.t') + `<p><b>Questions to ask:</b></p><ol>${qs.map(q => `<li>${esc(q.q)}${q.a ? ` <i>(Answer: ${esc(q.a)})</i>` : ''}</li>`).join('')}</ol>`;
      if (exit) L.edits['seq.plen.t'] = L.edits['seq.plen.t'] != null ? L.edits['seq.plen.t'] + `<p><b>Exit ticket:</b> ${esc(exit)}</p>` : base['seq.plen.t'].replace(/<p><b>Exit ticket:<\/b>[\s\S]*?<\/p>/, `<p><b>Exit ticket:</b> ${esc(exit)}</p>`);
      L.smart = Date.now(); saveDraft(u, d);
      if (VS && VS.m.units[VS.ui].id === uid) toast('Smart draft added to the starter, examples, questions and exit ticket. Review it before teaching.');
    } catch (e) {
      const c = e && e.code;
      if (['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].includes(c)) SAMPLE = null;
    } finally {
      SMART = null; try { if (api.S.loc && api.S.loc.v === VIEW) api.render(); } catch (e) { }
    }
  }

  /* ---------------- edits: sanitise, buffer, save ---------------- */
  const KEEP = { B: 'b', STRONG: 'b', I: 'i', EM: 'i', U: 'u', BR: 'br', P: 'p', DIV: 'p', UL: 'ul', OL: 'ol', LI: 'li', H3: 'p', H4: 'p' };
  function sanitize(html) {
    const dom = new DOMParser().parseFromString(`<!doctype html><body><div id="x">${String(html || '')}</div></body>`, 'text/html');
    const walk = n => Array.from(n.childNodes).map(ch => {
      if (ch.nodeType === 3) return esc(ch.nodeValue);
      if (ch.nodeType !== 1) return '';
      const t = KEEP[ch.tagName], inner = walk(ch);
      if (!t) return inner;
      if (t === 'br') return '<br>';
      if (t === 'ol') { const ty = ch.getAttribute('type'); return `<ol${ty === 'A' || ty === 'a' ? ` type="${ty}"` : ''}>${inner}</ol>`; }
      return `<${t}>${inner}</${t}>`;
    }).join('');
    return walk(dom.getElementById('x')).slice(0, 30000);
  }
  const norm = h => strip(h).replace(/\s+/g, ' ').trim();
  let PEND = null, PT = 0, VS = null;
  function queue(el) {
    if (!VS || !el || !el.dataset.f) return;
    const k = VS.k, uid = VS.m.units[VS.ui].id;
    if (!PEND || PEND.uid !== uid || PEND.k !== k) { flush(); PEND = { uid, m: VS.m, ui: VS.ui, k, f: {} }; }
    PEND.f[el.dataset.f] = el.dataset.min != null ? String(parseInt(el.textContent, 10) || 0) : el.innerHTML;
    clearTimeout(PT); PT = setTimeout(flush, 350);
  }
  function flush() {
    clearTimeout(PT); const P0 = PEND; PEND = null; if (!P0) return;
    const u = P0.m.units[P0.ui]; if (!u) return;
    const r = plansFor(P0.m, P0.ui, false), item = r.list[P0.k]; if (!item) return;
    const d = r.d, L = d.lessons[P0.k], P = prefs(); let pchg = false;
    Object.keys(P0.f).forEach(key => {
      const raw = P0.f[key];
      if (key === 'h.school' || key === 'h.teacher') { const t = strip(raw).slice(0, 120); if (t) { P[key === 'h.school' ? 'school' : 'teacher'] = t; pchg = true; } return; }
      const val = key.endsWith('.min') ? raw : sanitize(raw);
      const gen = key === 'h.cls' ? esc(d.set.cls) : key === 'h.date' ? esc(fmtDate(item.date)) : (item.p.gen[key] || '');
      if (norm(val) === norm(gen) && (key.endsWith('.min') ? String(val) === String(gen) : true)) delete L.edits[key]; else L.edits[key] = val;
    });
    if (pchg) savePrefs(P);
    saveDraft(u, d);
    const st = document.querySelector('.lp-status'); if (st) st.textContent = 'Saved in this browser at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '.';
  }
  function recalc(stage) {
    const rows = Array.from(stage.querySelectorAll('.lp-paper .lpp-seq tr[data-ph]')); let t = 0;
    rows.forEach(r => { const mEl = r.querySelector('[data-min]'), tEl = r.querySelector('.lp-time'); let v = parseInt(mEl ? mEl.textContent : '0', 10); if (!isFinite(v) || v < 0) v = 0; if (tEl) tEl.textContent = `${t}–${t + v}`; t += v; });
    const tot = stage.querySelector('.lp-paper [data-total]'); if (tot && VS) { const T = totalLen(VS.d.set); tot.textContent = `Total: ${t} of ${T} minutes${t === T ? ' ✓' : ` · adjust the minutes so they add up to ${T}`}`; tot.classList.toggle('lp-bad', t !== T); }
    const badge = stage.querySelector('.lp-minbadge'); if (badge && VS) { const T = totalLen(VS.d.set); badge.textContent = t === T ? `Minutes add up: ${t} of ${T} ✓` : `Minutes: ${t} of ${T}`; badge.classList.toggle('lp-bad', t !== T); }
  }

  /* ---------------- the planner page ---------------- */
  const CSS = `
.lp-wrap{display:flex;flex-direction:column;gap:16px;min-width:0}
.lp-wrap [hidden]{display:none!important}
.lp-wrap .lp-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.lp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-top:10px}
.lp-grid .field>*{width:100%;min-width:0;max-width:100%}
.lp-grid .field label{font-size:.86rem}
.lp-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px}
.lp-bar .btn{padding:8px 13px;font-size:.9rem}
.lp-status,.lp-note{font-size:.88rem;color:var(--muted);margin-top:8px}
.lp-minbadge{font-size:.85rem;font-weight:700;padding:3px 10px;border-radius:99px;background:var(--soft-ok)}
.lp-minbadge.lp-bad,.lp-bad{background:var(--soft-bad)!important}
.lp-paper{background:#fff;border-radius:16px;padding:clamp(12px,3vw,28px);box-shadow:var(--shadow);border:1px solid #d5dcea;min-width:0;max-width:100%;overflow:hidden}
.lp-open{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.lp-open .chip,.lp-open a.chip{text-decoration:none;color:inherit}
.lp-ubtn{margin-left:auto}
.lpp-doc{font-family:Calibri,Carlito,"Segoe UI",Arial,sans-serif;color:#1b2333;font-size:15px;line-height:1.42;overflow-wrap:anywhere;word-break:normal}
.lpp-doc *{box-sizing:border-box}
.lpp-doc a{color:#2E5C8A}
.lpp-head{border-bottom:3px solid #C9A227;padding-bottom:6px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:flex-end;gap:6px 12px;flex-wrap:wrap}
.lpp-school{font-weight:700;color:#1F3864;font-size:1.3em;letter-spacing:.02em}
.lpp-title{color:#2E5C8A;font-weight:700;font-size:.95em}
.lpp-doc h2.lpp-h,#stage .lpp-doc h2.lpp-h,#lp-print .lpp-doc h2.lpp-h{font-family:Calibri,Carlito,"Segoe UI",Arial,sans-serif;color:#1F3864;-webkit-text-fill-color:#1F3864;background:none;font-size:1.06em;line-height:1.25;margin:16px 0 6px;padding-bottom:3px;border-bottom:2px solid #C9A227;letter-spacing:0;text-wrap:wrap;text-shadow:none}
.lpp-doc p{margin:0 0 5px}
.lpp-doc ul,.lpp-doc ol{display:block!important;margin:0 0 5px;padding-left:20px}
.lpp-doc ul{list-style:disc}
.lpp-doc ol{list-style:decimal}
.lpp-doc ol[type="A"]{list-style:upper-alpha}
.lpp-doc li{display:list-item!important;margin:0 0 3px}
.lpp-doc table{width:100%;border-collapse:collapse;table-layout:fixed;margin:4px 0 8px}
.lpp-doc th,.lpp-doc td{border:1px solid #2E5C8A;padding:5px 7px;vertical-align:top;text-align:left}
.lpp-doc th{background:#1F3864;color:#fff;font-weight:700}
.lpp-doc td.lpp-label{background:#DCE6F2;color:#1F3864;font-weight:700}
.lpp-doc tr.lpp-prow td{background:#FFF4CC;color:#1F3864;font-weight:700}
.lpp-doc tr.lpp-trow td{background:#EEF2F8;color:#1F3864;font-weight:700}
.lpp-doc tr.lpp-trow td.lp-bad{background:#FADCD6}
.lpp-tag{color:#2E5C8A;font-style:italic}
.lpp-muted{color:#555;font-size:.88em}
.lpp-box td{height:150px}
.lp-f{border-radius:5px;outline:1px dashed transparent;outline-offset:2px;min-height:1.2em;cursor:text}
.lp-f:hover{outline-color:#9fb3d9}
.lp-f:focus{outline:2px solid #C9A227;background:#FFFBEA}
td.lp-f{outline-offset:-3px}
.lp-num{text-align:center;font-variant-numeric:tabular-nums}
.lp-time{white-space:nowrap;font-variant-numeric:tabular-nums}
.lp-sowwrap{background:#fff;border-radius:16px;padding:clamp(12px,3vw,26px);border:1px solid #d5dcea;box-shadow:var(--shadow);min-width:0;overflow:hidden}
.lpp-sow td,.lpp-sow th{font-size:.9em}
@media (max-width:700px){
 .lp-paper .lpp-meta,.lp-paper .lpp-meta tbody,.lp-paper .lpp-meta tr,.lp-paper .lpp-meta td{display:block;width:100%!important}
 .lp-paper .lpp-meta td{border-top:0}
 .lp-paper .lpp-meta tr:first-child td:first-child{border-top:1px solid #2E5C8A}
 .lp-paper .lpp-seq thead,.lp-paper .lpp-diff thead,.lp-sowwrap .lpp-sow thead{display:none}
 .lp-paper .lpp-seq,.lp-paper .lpp-seq tbody,.lp-paper .lpp-seq tr,.lp-paper .lpp-seq td,.lp-paper .lpp-diff,.lp-paper .lpp-diff tbody,.lp-paper .lpp-diff tr,.lp-paper .lpp-diff td,.lp-sowwrap .lpp-sow,.lp-sowwrap .lpp-sow tbody,.lp-sowwrap .lpp-sow tr,.lp-sowwrap .lpp-sow td{display:block;width:100%!important}
 .lp-paper .lpp-seq tr,.lp-sowwrap .lpp-sow tr{margin-bottom:10px;border:1px solid #2E5C8A}
 .lp-paper .lpp-seq td,.lp-paper .lpp-diff td,.lp-sowwrap .lpp-sow td{border:0;border-top:1px solid #dbe3f0}
 .lp-paper .lpp-diff td{border:1px solid #2E5C8A;margin-bottom:8px}
 .lp-paper td[data-l]::before,.lp-sowwrap td[data-l]::before{content:attr(data-l);display:block;font-size:.72em;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#2E5C8A}
 .lp-paper .lpp-seq td.lp-time{white-space:normal}
}
#lp-print{display:none}
@media print{
 :root.lp-printing{color-scheme:light!important;background:#fff!important}
 html.lp-printing,html.lp-printing body{background:#fff!important;background-image:none!important;background-attachment:scroll!important;color:#000!important;height:auto!important;min-height:0!important;overflow:visible!important}
 html.lp-printing body>*:not(#lp-print){display:none!important}
 html.lp-printing #lp-print{display:block!important;position:static!important;width:auto!important}
 html.lp-printing #lp-print,html.lp-printing #lp-print *{visibility:visible!important}
 #lp-print .lpp-doc{font-size:10pt;line-height:1.3}
 #lp-print .lpp-page{break-after:page;page-break-after:always}
 #lp-print .lpp-page:last-child{break-after:auto;page-break-after:auto}
 #lp-print .lpp-meta tr,#lp-print thead tr,#lp-print tr.lpp-prow,#lp-print tr.lpp-trow{break-inside:avoid;page-break-inside:avoid}
 #lp-print .lpp-doc th,#lp-print .lpp-doc td{padding:4px 5px}
 #lp-print h2{break-after:avoid;page-break-after:avoid}
 #lp-print .lpp-doc th,#lp-print .lpp-doc td.lpp-label,#lp-print tr.lpp-prow td,#lp-print tr.lpp-trow td{-webkit-print-color-adjust:exact;print-color-adjust:exact}
 #lp-print .lpp-box td{height:42mm}
}`;
  try { const st = document.createElement('style'); st.id = 'lp-css'; st.textContent = CSS; document.head.appendChild(st); } catch (e) { }

  const opt = (v, label, sel) => `<option value="${esc(v)}"${sel ? ' selected' : ''}>${esc(label)}</option>`;
  function ctxFor(m, ui) {
    const r = plansFor(m, ui, false), P = prefs();
    return Object.assign(r, { m, ui, P, items: r.list });
  }
  function openLinks(V, item) {
    const p = item.p, vs = views(), out = [];
    p.c.list.forEach(({ s, si }) => out.push(`<button type="button" class="chip" data-go="screen" data-m="${esc(V.m.id)}" data-u="${V.ui}" data-s="${si}">${s.type === 'learn' ? '📖' : s.type === 'write' ? '✍️' : s.type === 'checkin' ? '✅' : '🎯'} ${esc(txt(s.title || 'Check-in'))}</button>`));
    p.games.forEach(g => out.push(g.go === 'game' ? `<button type="button" class="chip" data-gx="opengame" data-page="games/${esc(g.id)}.html" data-id="${esc(g.id)}">🎮 ${esc(g.t)}</button>` : vs.has('edpmgames') ? `<button type="button" class="chip" data-go="edpmgames" data-k="${esc(g.id)}">🎮 ${esc(g.t)}</button>` : ''));
    p.labs.forEach(l => { if (vs.has('labs')) out.push(`<button type="button" class="chip" data-go="labs" data-k="${esc(l.id)}">🧪 Lab ${esc(l.id)}</button>`); });
    p.vids.forEach(v => out.push(`<a class="chip" href="https://www.youtube.com/results?search_query=${encodeURIComponent(v.q)}" target="_blank" rel="noopener">▶️ ${esc(v.t)}</a>`));
    if (vs.has('qc')) out.push('<button type="button" class="chip" data-go="qc">📝 Quiz Centre</button>');
    if (V.m.test) out.push(`<button type="button" class="chip" data-go="test" data-m="${esc(V.m.id)}">🧾 ${esc(txt(V.m.test.title || 'Module test'))}</button>`);
    if (V.m.paper2) out.push(`<button type="button" class="chip" data-go="paper2" data-m="${esc(V.m.id)}">📄 Paper 02 practice</button>`);
    return out.filter(Boolean).join('');
  }
  function topCard(tab) {
    return `<section class="card"><span class="kicker">Teacher's Version</span><h1 style="margin-top:8px">Lesson Planner</h1><p class="lead" style="margin-top:6px">Complete, timed and differentiated lesson plans built from each unit's own screens, activities, videos, games, labs and tests. Click any text in a plan to edit it; changes save in this browser.</p>
      <div class="lp-tabs" role="tablist"><button type="button" role="tab" aria-selected="${tab === 'plans'}" class="chip ${tab === 'plans' ? 'sel' : ''}" data-px="tab" data-pv="${VIEW}" data-k="plans">🗂️ Lesson plans</button><button type="button" role="tab" aria-selected="${tab === 'sow'}" class="chip ${tab === 'sow' ? 'sel' : ''}" data-px="tab" data-pv="${VIEW}" data-k="sow">📅 Scheme of work</button></div></section>`;
  }
  function plansHTML(api, loc) {
    const mods = MODS(), P = prefs();
    let m = modBy(loc.m) || modBy(P.lastM) || mods[0];
    let ui = loc.m && m.id === loc.m && loc.u != null && m.units[+loc.u] ? +loc.u : (P.lastM === m.id && m.units[+P.lastU] ? +P.lastU : 0);
    if (!m.units[ui]) ui = 0;
    const V = ctxFor(m, ui), d = V.d; let k = parseInt(loc.k, 10);
    if (!isFinite(k) && P.lastM === m.id && +P.lastU === ui) k = parseInt(P.lastK, 10);
    if (!isFinite(k) || !V.items[k]) k = 0; V.k = k; VS = V;
    if (P.lastM !== m.id || +P.lastU !== ui || +P.lastK !== k) { P.lastM = m.id; P.lastU = ui; P.lastK = k; savePrefs(P); }
    syncHash({ v: VIEW, m: m.id, u: ui, k });
    const u = m.units[ui], item = V.items[k], T = totalLen(d.set), mins = minsOf(item.p, item.L.edits), tot = mins.reduce((a, b) => a + b, 0);
    const startVal = okIso(d.set.date) ? d.set.date : (yr(V.start) === 2026 ? V.start : '');
    let h = topCard('plans');
    h += `<section class="card"><h2 style="font-size:1.2rem">Plan a unit</h2><div class="lp-grid">
      <div class="field"><label for="lp-mod">${modWord()}</label><select id="lp-mod" class="select">${mods.map(x => opt(x.id, modLabel(x), x.id === m.id)).join('')}</select></div>
      <div class="field"><label for="lp-unit">Unit</label><select id="lp-unit" class="select">${m.units.map((x, i) => opt(i, `Unit ${i + 1}: ${txt(x.title)}`, i === ui)).join('')}</select></div>
      <div class="field"><label for="lp-len">Lesson length</label><select id="lp-len" class="select">${LENS.map(l => opt(l, l + ' minutes', String(d.set.len) === String(l))).join('')}${opt('dbl', 'Double period', d.set.len === 'dbl')}</select></div>
      <div class="field"${d.set.len === 'dbl' ? '' : ' hidden'}><label for="lp-per">Minutes per period</label><input id="lp-per" class="input" type="number" min="30" max="70" step="5" value="${clampPer(d.set.per)}"></div>
      <div class="field"><label for="lp-n">Number of lessons</label><select id="lp-n" class="select">${[1, 2, 3, 4, 5, 6].filter(n => n <= Math.max(1, (u.screens || []).length)).map(n => opt(n, n + (n === d.auto ? ' (suggested)' : ''), n === d.n)).join('')}</select></div>
      <div class="field"><label for="lp-cls">Class / form</label><input id="lp-cls" class="input" list="lp-clist" value="${esc(d.set.cls || P.cls)}" maxlength="60"><datalist id="lp-clist">${CLASSES.map(c => `<option value="${esc(c)}">`).join('')}</datalist></div>
      <div class="field"><label for="lp-date">Date of lesson 1</label><input id="lp-date" class="input" type="date" value="${esc(startVal)}"></div>
      </div><p class="lp-note">Week ${ui + 1} of the release schedule: this unit opens for students on ${esc(fmtDate(relIso(ui)))}, 6:00 pm. ${(u.screens || []).length} course screens; about ${unitMinutes(u)} minutes of content, so ${d.auto} lesson${d.auto > 1 ? 's' : ''} of ${T} minutes ${d.auto > 1 ? 'are' : 'is'} suggested. Later lessons fall on the next school days.</p></section>`;
    h += `<section class="card"><div class="chips" role="tablist" aria-label="Lessons in this unit">${V.items.map((it, i) => `<button type="button" role="tab" aria-selected="${i === k}" class="chip ${i === k ? 'sel' : ''}" data-px="pick" data-pv="${VIEW}" data-k="${i}">Lesson ${it.L.src + 1}${it.L.dup ? ' (copy)' : ''} · ${esc(fmtDate(it.date, true))}${Object.keys(it.L.edits || {}).length ? ' ✎' : ''}</button>`).join('')}</div>
      <div class="lp-bar">
        <button type="button" class="btn go" data-px="print" data-pv="${VIEW}">🖨️ Print</button>
        <button type="button" class="btn ghost" data-px="printall" data-pv="${VIEW}">🖨️ Print all ${V.items.length > 1 ? V.items.length + ' lessons' : ''}</button>
        <button type="button" class="btn ghost" data-px="word" data-pv="${VIEW}" data-cap="dl"${DL ? '' : ' hidden'}>⬇️ Download Word</button>
        <button type="button" class="btn ghost" data-px="wordall" data-pv="${VIEW}" data-cap="dl"${DL ? '' : ' hidden'}>⬇️ Word: all lessons</button>
        <button type="button" class="btn ghost" data-px="dup" data-pv="${VIEW}">⧉ Duplicate lesson</button>
        ${item.L.dup ? `<button type="button" class="btn ghost" data-px="remove" data-pv="${VIEW}">✕ Remove copy</button>` : ''}
        <button type="button" class="btn ghost" data-px="reset" data-pv="${VIEW}">↺ Reset to generated</button>
        <button type="button" class="btn gold" data-px="smart" data-pv="${VIEW}" data-cap="sample"${SAMPLE ? '' : ' hidden'}${SMART ? ' disabled' : ''}>${SMART ? '✨ Drafting…' : '✨ Smart draft'}</button>
        ${SMART ? `<button type="button" class="btn ghost" data-px="stop" data-pv="${VIEW}">Stop</button>` : ''}
        <span class="lp-minbadge ${tot === T ? '' : 'lp-bad'}">${tot === T ? `Minutes add up: ${tot} of ${T} ✓` : `Minutes: ${tot} of ${T}`}</span>
      </div>
      <p class="lp-status">${SMART ? 'Drafting a better starter, worked examples and questions for this class…' : d.fresh ? 'Generated from the unit\'s course data. Edit anything; your changes save automatically.' : `Saved in this browser${d.at ? ' · ' + esc(new Date(d.at).toLocaleString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })) : ''}.`}${item.L.smart ? ' Smart draft added to this lesson.' : ''}</p></section>`;
    h += `<article class="lp-paper" aria-label="Lesson plan"><div class="lpp-doc">${lessonDoc(item, V, true)}</div></article>`;
    h += `<section class="card"><h3>Open on the course</h3><div class="lp-open">${openLinks(V, item)}</div></section>`;
    h += `<details class="card fold"><summary>How these plans are built</summary><div class="html-body" style="margin-top:8px"><p>The unit's screens are split into ${d.n} lesson${d.n > 1 ? 's' : ''} by estimated teaching time, starting each lesson on a learn screen. Outcomes come from the unit objectives, rewritten as measurable statements with a Bloom level; long objectives are split across lessons by topic. Direct instruction uses the learn screens, guided and independent practice use the named activities, the hinge question is a real question from the unit with its answer, and Foundation and Challenge use the screens' own levelled versions where they exist. Vocabulary comes from the course glossary; videos, games, simulators and labs from the unit's resources. Minutes are shared out so that they always add up to the lesson length.</p></div></details>`;
    return h;
  }
  function sowHTML() {
    const P = prefs(), mods = MODS(), sel = P.sowM === 'all' ? mods : mods.filter(x => x.id === P.sowM), len = P.sowLen === 'dbl' ? 'dbl' : (LENS.includes(+P.sowLen) ? +P.sowLen : 40);
    const data = sowData(sel.length ? sel : mods, len); VS = null; syncHash({ v: VIEW, tab: 'sow' });
    let h = topCard('sow');
    h += `<section class="card"><h2 style="font-size:1.2rem">Scheme of work</h2><div class="lp-grid"><div class="field"><label for="lp-sowm">Show</label><select id="lp-sowm" class="select">${opt('all', 'Every ' + modWord().toLowerCase(), P.sowM === 'all')}${mods.map(x => opt(x.id, modLabel(x), P.sowM === x.id)).join('')}</select></div><div class="field"><label for="lp-sowlen">Lesson length (units without a saved plan)</label><select id="lp-sowlen" class="select">${LENS.map(l => opt(l, l + ' minutes', len === l)).join('')}${opt('dbl', 'Double period', len === 'dbl')}</select></div></div>
      <div class="lp-bar"><button type="button" class="btn go" data-px="sowprint" data-pv="${VIEW}">🖨️ Print</button><button type="button" class="btn ghost" data-px="sowword" data-pv="${VIEW}" data-cap="dl"${DL ? '' : ' hidden'}>⬇️ Download Word</button></div>
      <p class="lp-note">${data.reduce((a, x) => a + x.rows.length, 0)} lessons. Weeks follow the release schedule (one unit a week from Friday 23 October 2026). Units with a saved plan use its lesson count, length and edited outcomes.</p></section>`;
    h += `<div class="lp-sowwrap">${sowDoc(data, P, len, true)}</div>`;
    return h;
  }
  function render(api, loc) {
    flush(); initCaps();
    if (!(api && api.S && api.S.teacher) && !window.COURSE_TEACHER_EDITION) return '<div class="card"><h2>🗂️ Lesson Planner</h2><p>The Lesson Planner is part of the Teacher\'s Version.</p></div>';
    if (!MODS().length) return '<div class="card"><h2>🗂️ Lesson Planner</h2><p>No course content was found.</p></div>';
    loc = loc || {};
    try { return `<div class="lp-wrap">${loc.tab === 'sow' ? sowHTML() : plansHTML(api, loc)}</div>`; }
    catch (e) { return `<div class="card"><h2>🗂️ Lesson Planner</h2><p>The plan could not be built for this unit (${esc(e && e.message)}). Choose another unit.</p></div>`; }
  }
  function syncHash(L) {
    try { const q = new URLSearchParams(); ['v', 'tab', 'm', 'u', 'k'].forEach(x => { if (L[x] != null && L[x] !== '') q.set(x, String(L[x])); }); const h = '#' + q.toString(); if (location.hash !== h) history.replaceState(history.state, '', h); } catch (e) { }
  }
  function setLoc(api, patch) { const L = api.S.loc || (api.S.loc = { v: VIEW }); Object.assign(L, patch, { v: VIEW }); Object.keys(L).forEach(k => { if (L[k] == null) delete L[k]; }); try { api.save(); } catch (e) { } api.render(); }
  function updateDraft(fn) { const V = VS; if (!V) return; flush(); const d = draftFor(V.m, V.ui); fn(d); saveDraft(V.m.units[V.ui], d); }
  function bind(stage, api) {
    if (stage.__lpBound) return; stage.__lpBound = true;
    const here = () => api.S && api.S.loc && api.S.loc.v === VIEW;
    stage.addEventListener('input', e => { if (!here()) return; const el = e.target.closest && e.target.closest('.lp-paper [data-f]'); if (!el) return; queue(el); if (el.dataset.min != null) recalc(stage); });
    stage.addEventListener('focusout', e => { if (!here()) return; if (e.target.closest && e.target.closest('.lp-paper [data-f]')) flush(); });
    stage.addEventListener('paste', e => { if (!here()) return; const el = e.target.closest && e.target.closest('.lp-paper [data-f]'); if (!el) return; e.preventDefault(); const t = (e.clipboardData && e.clipboardData.getData('text/plain')) || ''; try { document.execCommand('insertText', false, el.dataset.min != null ? t.replace(/\D/g, '') : t); } catch (er) { } });
    stage.addEventListener('keydown', e => { if (!here()) return; const el = e.target.closest && e.target.closest('.lp-paper [data-min]'); if (!el) return; if (e.key === 'Enter') { e.preventDefault(); el.blur(); } else if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault(); });
    stage.addEventListener('change', e => {
      if (!here()) return; const id = e.target.id, val = e.target.value; if (!/^lp-/.test(id || '')) return;
      const P = prefs();
      if (id === 'lp-mod') { setLoc(api, { m: val, u: 0, k: null }); return; }
      if (id === 'lp-unit') { setLoc(api, { m: VS && VS.m.id, u: +val, k: null }); return; }
      if (id === 'lp-sowm') { P.sowM = val; savePrefs(P); api.render(); return; }
      if (id === 'lp-sowlen') { P.sowLen = val === 'dbl' ? 'dbl' : +val; savePrefs(P); api.render(); return; }
      if (!VS) return;
      if (id === 'lp-len') { updateDraft(d => { d.set.len = val === 'dbl' ? 'dbl' : +val; if (!d.set.nManual) d.set.n = 0; d.lessons.forEach(L => Object.keys(L.edits).forEach(k => { if (/\.min$/.test(k)) delete L.edits[k]; })); }); P.len = val === 'dbl' ? 'dbl' : +val; savePrefs(P); setLoc(api, { m: VS.m.id, u: VS.ui }); toast('Lesson length changed: minutes were shared out again.'); return; }
      if (id === 'lp-per') { updateDraft(d => { d.set.per = clampPer(val); d.lessons.forEach(L => Object.keys(L.edits).forEach(k => { if (/\.min$/.test(k)) delete L.edits[k]; })); }); P.per = clampPer(val); savePrefs(P); api.render(); return; }
      if (id === 'lp-n') { updateDraft(d => { d.set.n = +val; d.set.nManual = true; normLessons(d, +val); }); setLoc(api, { m: VS.m.id, u: VS.ui, k: 0 }); toast('Lessons rebuilt. Check that any edited text still fits each lesson.'); return; }
      if (id === 'lp-cls') { const c = String(val || '').trim().slice(0, 60) || course().cls; updateDraft(d => { d.set.cls = c; }); P.cls = c; savePrefs(P); api.render(); return; }
      if (id === 'lp-date') { if (val && yr(val) >= 2026) { updateDraft(d => { d.set.date = val; }); } else updateDraft(d => { d.set.date = ''; }); api.render(); return; }
    });
  }
  function mount(api, loc, stage) { bind(stage, api); decorate(stage); refreshCaps(); }
  function click(action, el, api) {
    const V = VS;
    if (action === 'tab') { flush(); setLoc(api, { tab: el.dataset.k === 'sow' ? 'sow' : null, m: V ? V.m.id : (api.S.loc || {}).m, u: V ? V.ui : (api.S.loc || {}).u }); return; }
    if (action === 'sowprint' || action === 'sowword') {
      const P = prefs(), mods = MODS(), sel = P.sowM === 'all' ? mods : mods.filter(x => x.id === P.sowM), len = P.sowLen === 'dbl' ? 'dbl' : (LENS.includes(+P.sowLen) ? +P.sowLen : 40);
      const html = sowDoc(sowData(sel.length ? sel : mods, len), P, len, false), label = P.sowM === 'all' ? 'All ' + modWord().toLowerCase() + 's' : (sel[0] ? sel[0].code : '');
      if (action === 'sowprint') doPrint(html, true); else saveWord(html, { landscape: true, title: `Scheme of work - ${course().subject} - ${label}`, headTitle: 'Scheme of Work · ' + course().subject, school: P.school, creator: P.teacher });
      return;
    }
    if (!V) return;
    const item = V.items[V.k], u = V.m.units[V.ui];
    if (action === 'pick') { flush(); setLoc(api, { m: V.m.id, u: V.ui, k: +el.dataset.k || 0 }); return; }
    if (action === 'print' || action === 'printall' || action === 'word' || action === 'wordall') {
      flush(); const R = ctxFor(V.m, V.ui), all = action === 'printall' || action === 'wordall', items = all ? R.items : [R.items[V.k]];
      const html = printable(items, R);
      if (action === 'print' || action === 'printall') { doPrint(html, false); return; }
      const nm = `Lesson plan - ${course().subject} - ${V.m.code} Unit ${V.ui + 1}${all ? ' - all lessons' : ' - Lesson ' + (item.L.src + 1) + (item.L.dup ? ' copy' : '')}`;
      saveWord(html, { title: nm, headTitle: 'Lesson Plan · ' + course().subject, school: R.P.school, creator: R.P.teacher }); return;
    }
    if (action === 'dup') { updateDraft(d => { const L = d.lessons[V.k]; if (L) d.lessons.splice(V.k + 1, 0, { src: L.src, edits: JSON.parse(JSON.stringify(L.edits || {})), dup: true }); }); setLoc(api, { m: V.m.id, u: V.ui, k: V.k + 1 }); toast('Lesson copied. Change the class, date or details on the copy.'); return; }
    if (action === 'remove') { updateDraft(d => { const L = d.lessons[V.k]; if (L && L.dup) d.lessons.splice(V.k, 1); }); setLoc(api, { m: V.m.id, u: V.ui, k: Math.max(0, V.k - 1) }); return; }
    if (action === 'reset') {
      if (!el.dataset.armed) { el.dataset.armed = '1'; const t0 = el.textContent; el.textContent = 'Tap again to reset this lesson'; setTimeout(() => { if (el.isConnected) { delete el.dataset.armed; el.textContent = t0; } }, 3000); return; }
      PEND = null; clearTimeout(PT);
      updateDraft(d => { const L = d.lessons[V.k]; if (L) { L.edits = {}; delete L.smart; } }); api.render(); toast('This lesson is back to the generated plan.'); return;
    }
    if (action === 'smart') { runSmart(api); return; }
    if (action === 'stop') { if (SMART && SMART.ctl) SMART.ctl.abort(); return; }
  }

  /* ---------------- "Lesson plan" buttons on the module page unit cards ---------------- */
  function decorate(stage) {
    try {
      const a = API(); if (!(window.COURSE_TEACHER_EDITION || (a && a.S && a.S.teacher))) return;
      stage.querySelectorAll('details.uacc[data-uacc]').forEach(dt => {
        if (dt.querySelector('.lp-ubtn')) return;
        const parts = String(dt.getAttribute('data-uacc')).split(':'), body = dt.querySelector('.uacc-body'); if (!body || parts.length < 2) return;
        const rows = body.querySelectorAll(':scope > .row'), row = rows[rows.length - 1];
        const b = document.createElement('button'); b.type = 'button'; b.className = 'btn ghost lp-ubtn'; b.setAttribute('data-go', VIEW); b.setAttribute('data-m', parts[0]); b.setAttribute('data-u', parts[1]); b.textContent = '🗂️ Lesson plan';
        (row || body).appendChild(b);
      });
      const L = a && a.S && a.S.loc;
      if (L && L.v === 'unit' && L.m != null && L.u != null && !stage.querySelector('.lp-ubtn')) {
        const row = stage.querySelector('.stage-in > .card .row'); if (row) { const b = document.createElement('button'); b.type = 'button'; b.className = 'btn ghost lp-ubtn'; b.setAttribute('data-go', VIEW); b.setAttribute('data-m', L.m); b.setAttribute('data-u', L.u); b.textContent = '🗂️ Lesson plan'; row.appendChild(b); }
      }
    } catch (e) { }
  }
  function watch() {
    const stage = document.getElementById('stage'); if (!stage || stage.__lpWatch) return; stage.__lpWatch = true;
    try { new MutationObserver(() => decorate(stage)).observe(stage, { childList: true }); } catch (e) { }
    decorate(stage);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch); else watch();
  setTimeout(watch, 0);
  window.addEventListener('beforeunload', () => { try { flush(); } catch (e) { } });
  initCaps();

  /* read-only hook for other teacher tools and checks */
  window.COURSE_LESSONPLAN = {
    build: (mId, ui, opt2) => { const m = modBy(mId); if (!m || !m.units[ui]) return null; const set = Object.assign({ len: 40, per: 40, cls: prefs().cls }, opt2 || {}); const n = +set.n || defaultN(m.units[ui], totalLen(set)); return gen(m, ui, set, n, false).map(p => ({ topic: p.topic, outcomes: p.outs.map(o => o.text), minutes: p.seq.map(s => [s.id, s.min]), total: p.seq.reduce((a, s) => a + s.min, 0) })); },
    course: () => cid()
  };

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: VIEW, title: 'Lesson Planner',
    tile: { icon: '🗂️', meta: 'Timed, differentiated lesson plans and a scheme of work for every unit. Edit, print or download.' },
    render, mount, click
  });
})();
