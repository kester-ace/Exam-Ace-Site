/* Word Desk: offline dictionary, thesaurus, spelling and grammar checker for the CAPE Communication Studies e-course.
   Data: content/lexicon.js (window.COURSE_LEXICON, built from Princeton WordNet 3.0 + wordfreq) and content/glossary.js.
   Also exposes window.COURSE_WORDDESK = { check(text), suggest(word), define(word), stats(text) } for other screens. */
(function () {
  'use strict';

  /* =====================================================================
     1. LEXICON (parsed lazily on first use)
     ===================================================================== */
  let DB = null;
  const POSN = { n: 'noun', v: 'verb', a: 'adjective', r: 'adverb' };
  function db() {
    if (DB) return DB;
    const L = window.COURSE_LEXICON || null;
    const d = { ok: !!L, words: [], idx: new Map(), e: [], exc: new Map(), spell: new Map(), byFirst: null, gloss: new Map(), alpha: [], user: new Set() };
    if (L) {
      d.words = L.w.split('\n'); d.e = L.e;
      for (let i = 0; i < d.words.length; i++) d.idx.set(d.words[i], i);
      (L.x || '').split(',').forEach(p => { const k = p.indexOf(':'); if (k > 0) d.exc.set(p.slice(0, k), p.slice(k + 1)); });
      const sp = (L.spell || '').split('\n');
      for (let i = 0; i < sp.length; i++) if (!d.spell.has(sp[i])) d.spell.set(sp[i], i);
      d.spellList = sp;
    } else d.spellList = [];
    const G = window.COURSE_GLOSSARY;
    if (G && G.terms) G.terms.forEach(t => {
      const k = normKey(t.t); if (!k) return;
      if (!d.gloss.has(k)) d.gloss.set(k, []); d.gloss.get(k).push(t);
    });
    d.glossWords = new Set(); d.gloss.forEach((_, k) => k.split(/[^a-z']+/).forEach(x => x && d.glossWords.add(x)));
    const set = new Set(d.words); d.gloss.forEach((_, k) => set.add(k));
    d.alpha = Array.from(set).sort();
    DB = d; return d;
  }
  function normKey(s) { return String(s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim(); }
  const rankOf = w => { const d = db(); const s = d.spell.get(w); if (s != null) return s; const i = d.idx.get(w); return i != null ? i * 3 + 500 : 1e9; };

  const ENT = new Map();
  function entry(i) {
    if (ENT.has(i)) return ENT.get(i);
    const d = db(), raw = d.e[i] || '';
    const [sd, sy, an, ex] = raw.split('|');
    const senses = (sd || '').split('~').filter(Boolean).map(s => ({ pos: s[0], def: s.slice(1) }));
    const ids = s => (s || '').split(',').filter(Boolean).map(x => d.words[parseInt(x, 36)]).filter(Boolean);
    const o = { word: d.words[i], senses, pos: [...new Set(senses.map(s => s.pos))], syn: ids(sy), ant: ids(an), ex: ex || '' };
    ENT.set(i, o); return o;
  }
  function posOf(w) { const i = db().idx.get(w); return i == null ? '' : entry(i).pos.join(''); }
  function primaryPos(w) { const i = db().idx.get(w); return i == null ? '' : entry(i).pos[0] || ''; }

  /* morphology: candidate base forms for an inflected word (WordNet-style detachment rules) */
  const RULES = [['s', ''], ['ses', 's'], ['xes', 'x'], ['zes', 'z'], ['ches', 'ch'], ['shes', 'sh'], ['men', 'man'], ['ies', 'y'], ['es', 'e'], ['es', ''], ['ed', 'e'], ['ed', ''], ['ing', 'e'], ['ing', ''], ['er', ''], ['est', ''], ['er', 'e'], ['est', 'e'], ['ier', 'y'], ['iest', 'y'], ['ied', 'y'], ['ily', 'y'], ['ly', ''], ['ly', 'le'], ["'s", ''], ["s'", 's']];
  function bases(w) {
    const d = db(), out = [];
    if (d.exc.has(w)) out.push(d.exc.get(w));
    for (const [suf, rep] of RULES) {
      if (w.length > suf.length + 1 && w.endsWith(suf)) {
        const b = w.slice(0, -suf.length) + rep;
        if (d.idx.has(b)) out.push(b);
        if (!rep && /([bcdfghjklmnpqrstvwz])\1$/.test(b) && d.idx.has(b.slice(0, -1))) out.push(b.slice(0, -1));
      }
    }
    return [...new Set(out)].sort((a, b) => rankOf(a) - rankOf(b));
  }
  function resolve(q) {
    const d = db(), w = normKey(q);
    if (!w) return null;
    if (d.idx.has(w)) return { word: w };
    const b = bases(w); if (b.length) return { word: b[0], from: w };
    if (d.gloss.has(w)) return { word: w, glossOnly: true };
    return null;
  }

  /* spelling */
  const EXTRA_OK = new Set('eg ie etc vs mr mrs ms dr st cxc cape csec cfbc ok tv pc cd dvd uk usa us un caricom oecs wi fi url pdf email emails online website websites smartphone smartphones selfie selfies vlog vlogs blog blogs blogger bloggers hashtag hashtags podcast podcasts livestream instagram facebook youtube tiktok whatsapp twitter google internet annotate annotated annotates annotating annotation annotations callaloo roti soca calypso steelpan steelband jouvert junkanoo crop-over kaiso chutney limer liming papiamentu papiamento kweyol kwéyòl sranan sint maarten curaçao curacao bonaire aruba anguilla montserrat nevis kitts lucia vincent grenadines tobago creolist creolists lexified lexifier lexifiers textspeak decreolisation decreolization'.split(' '));
  function known(w) {
    const d = db(); w = w.toLowerCase().replace(/[’‘]/g, "'");
    if (!d.ok) return true;
    if (d.spell.has(w) || d.idx.has(w) || EXTRA_OK.has(w) || d.glossWords.has(w) || d.user.has(w) || userDict().has(w)) return true;
    if (w.length === 1) return true;
    if (w.endsWith("'s") || w.endsWith("s'")) return known(w.slice(0, -2));
    if (/is(e|es|ed|ing|ation|ations|er|ers)$/.test(w)) { const z = w.replace(/is(e|es|ed|ing|ation|ations|er|ers)$/, 'iz$1'); if (d.spell.has(z) || d.idx.has(z) || bases(z).length) return true; }
    if (/our(s|ed|ing|able|ite|ites)?$/.test(w)) { const z = w.replace(/our/, 'or'); if (d.spell.has(z)) return true; }
    for (const suf of ['ness', 'ful', 'less', 'ment', 'ments', 'ively', 'ive', 'ally', 'ity', 'ities', 'ism', 'ist', 'ists', 'ly']) if (w.endsWith(suf) && w.length - suf.length > 3) { const b = w.slice(0, -suf.length); if (d.idx.has(b) || d.spell.has(b) || d.idx.has(b + 'e') || bases(b).length) return true; }
    if (/^(un|re|non|pre|anti|over|under|mis|co|inter|multi|self|post)/.test(w)) { const m = w.match(/^(un|re|non|pre|anti|over|under|mis|co|inter|multi|self|post)(.+)$/); if (m && m[2].length > 3 && (d.spell.has(m[2]) || d.idx.has(m[2]))) return true; }
    return bases(w).length > 0;
  }
  const AB = 'abcdefghijklmnopqrstuvwxyz';
  function edits1(w) {
    const out = new Set();
    for (let i = 0; i <= w.length; i++) {
      const a = w.slice(0, i), b = w.slice(i);
      if (b) out.add(a + b.slice(1));
      if (b.length > 1) out.add(a + b[1] + b[0] + b.slice(2));
      for (const c of AB) { if (b) out.add(a + c + b.slice(1)); out.add(a + c + b); }
    }
    out.delete(w); return out;
  }
  function osa(a, b, max) { // optimal string alignment distance with cut-off
    const m = a.length, n = b.length; if (Math.abs(m - n) > max) return max + 1;
    let p2 = null, p = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const c = [i]; let best = i;
      for (let j = 1; j <= n; j++) {
        let v = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (p2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, p2[j - 2] + 1);
        c.push(v); if (v < best) best = v;
      }
      if (best > max) return max + 1;
      p2 = p; p = c;
    }
    return p[n];
  }
  function firstBuckets() {
    const d = db(); if (d.byFirst) return d.byFirst;
    const m = {}; d.spellList.forEach(w => { const k = w[0]; (m[k] = m[k] || []).push(w); }); d.byFirst = m; return m;
  }
  function suggest(word, n) {
    n = n || 5; const d = db(); if (!d.ok) return [];
    const raw = String(word || ''), w = raw.toLowerCase().replace(/[’‘]/g, "'");
    if (!w) return [];
    const res = [];
    if (MISSPELL[w]) res.push(MISSPELL[w]);
    const okw = x => (d.spell.has(x) || d.idx.has(x)) && !BAD_SUG.has(x) && !MISSPELL[x];
    const d1 = [...edits1(w)].filter(okw).sort((a, b) => rankOf(a) - rankOf(b));
    d1.forEach(x => res.push(x));
    if (res.length < n && w.length > 3) {
      const cands = [];
      const pool = (firstBuckets()[w[0]] || []);
      for (const x of pool) {
        if (Math.abs(x.length - w.length) > 2 || x.length < 3) continue;
        const dist = osa(w, x, 2);
        if (dist === 2 && !MISSPELL[x]) cands.push(x);
        if (cands.length > 400) break;
      }
      cands.sort((a, b) => rankOf(a) - rankOf(b)).forEach(x => res.push(x));
    }
    const out = [...new Set(res)].filter(x => x !== w).slice(0, n);
    return out.map(x => matchCase(raw, x));
  }
  function define(q) {
    const d = db(), r = resolve(q); if (!r) return null;
    const i = d.idx.get(r.word);
    const e = i != null ? entry(i) : { word: r.word, senses: [], pos: [], syn: [], ant: [], ex: '' };
    return { word: e.word, from: r.from || null, pos: e.pos.map(p => POSN[p] || p), senses: e.senses.map(s => ({ pos: POSN[s.pos] || s.pos, def: s.def })), synonyms: e.syn.slice(), antonyms: e.ant.slice(), example: e.ex, glossary: (d.gloss.get(r.word) || d.gloss.get(normKey(q)) || []).map(t => ({ term: t.t, def: (t.d || [])[0] || '', cat: t.c, refs: t.r || [] })) };
  }

  /* =====================================================================
     2. GRAMMAR / STYLE RULES DATA
     ===================================================================== */
  const BAD_SUG = new Set();
  const MISSPELL = {
    alot: 'a lot', recieve: 'receive', recieved: 'received', reciept: 'receipt', definately: 'definitely', definatly: 'definitely', definetly: 'definitely', goverment: 'government',
    seperate: 'separate', seperately: 'separately', thier: 'their', untill: 'until', wich: 'which', becuase: 'because', becasue: 'because', bcause: 'because', occured: 'occurred', occurence: 'occurrence',
    tommorow: 'tomorrow', tommorrow: 'tomorrow', tomorow: 'tomorrow', todays: "today's", childrens: "children's", womens: "women's", mens: "men's", yesturday: 'yesterday', wensday: 'Wednesday', beleive: 'believe', belive: 'believe', arguement: 'argument', wierd: 'weird', neccessary: 'necessary', necesary: 'necessary',
    acheive: 'achieve', acheivement: 'achievement', begining: 'beginning', existance: 'existence', independant: 'independent', truely: 'truly', accomodate: 'accommodate', embarass: 'embarrass',
    foward: 'forward', grammer: 'grammar', freind: 'friend', freinds: 'friends', enviroment: 'environment', noone: 'no one', aswell: 'as well', incase: 'in case', eachother: 'each other',
    atleast: 'at least', thankyou: 'thank you', infact: 'in fact', irregardless: 'regardless', everytime: 'every time', ofcourse: 'of course', dont: "don't", doesnt: "doesn't", didnt: "didn't",
    cant: "can't", wont: "won't", isnt: "isn't", wasnt: "wasn't", arent: "aren't", werent: "weren't", couldnt: "couldn't", shouldnt: "shouldn't", wouldnt: "wouldn't", im: "I'm", ive: "I've", thats: "that's",
    whats: "what's", theyre: "they're", youre: "you're", lets: null, untill_: null, publically: 'publicly', basicly: 'basically', basicaly: 'basically', finaly: 'finally', realy: 'really', succesful: 'successful',
    sucessful: 'successful', succes: 'success', comunity: 'community', comunication: 'communication', communcation: 'communication', resturant: 'restaurant', calender: 'calendar', concious: 'conscious',
    occassion: 'occasion', priviledge: 'privilege', recomend: 'recommend', reccomend: 'recommend', refered: 'referred', relevent: 'relevant', rythm: 'rhythm', sieze: 'seize', supercede: 'supersede',
    tounge: 'tongue', truley: 'truly', wether: 'whether', writting: 'writing', writen: 'written', alright: 'all right', alittle: 'a little', abit: 'a bit', alway: 'always', libary: 'library',
    febuary: 'February', wensday: 'Wednesday', probaly: 'probably', probly: 'probably', diffrent: 'different', intresting: 'interesting', importent: 'important', knowlege: 'knowledge', langauge: 'language',
    languge: 'language', sentance: 'sentence', paragragh: 'paragraph', persue: 'pursue', posession: 'possession', proffesor: 'professor', proffessional: 'professional', questionaire: 'questionnaire',
    begginning: 'beginning', untrue_: null, carribean: 'Caribbean', carribbean: 'Caribbean', caribean: 'Caribbean', jamacia: 'Jamaica', exersize: 'exercise', excercise: 'exercise', explaination: 'explanation',
    pronounciation: 'pronunciation', similiar: 'similar', strenght: 'strength', untill2_: null, studing: 'studying', becomming: 'becoming', comming: 'coming', occuring: 'occurring', persuation: 'persuasion', audiance: 'audience'
  };
  Object.keys(MISSPELL).forEach(k => { if (MISSPELL[k] == null) delete MISSPELL[k]; });
  const CREOLE_WORDS = { dem: ['those / them', 'In many Caribbean Creoles <i>dem</i> marks plurals or means “them/those”.'], dat: ['that'], dis: ['this'], wid: ['with'], fuh: ['for'], nuh: ["don't / not"], doh: ["don't"], mih: ['my'], yuh: ['you / your'], deh: ['there'], wha: ['what'], wah: ['what'], ting: ['thing'], tings: ['things'], likkle: ['little'], pickney: ['child / children'], picknee: ['child / children'], gyal: ['girl'], bwoy: ['boy'], dey: ['they / there'], unu: ['all of you'], allyuh: ['all of you'], wey: ['where / which'], fi: ['to / for'], cyah: ["can't"], cyaan: ["can't"], haffi: ['have to'], nyam: ['eat'], mek: ['make / let'], tek: ['take'], seh: ['say / that'], bredda: ['brother'], ah: ['I'], abi: ['we / us'], wunna: ['all of you'], bout: ['about'], wit: ['with'] };
  const INFORMAL = { gonna: 'going to', wanna: 'want to', gotta: 'have to', kinda: 'kind of', sorta: 'sort of', dunno: 'do not know', lemme: 'let me', gimme: 'give me', outta: 'out of', lotta: 'lot of', "ain't": 'is not', aint: 'is not', "y'all": 'all of you', yall: 'all of you', lol: '', omg: '', btw: 'by the way', idk: 'I do not know', tbh: 'to be honest', u: 'you', ur: 'your', r: 'are', cuz: 'because', coz: 'because', cos: 'because', "'cause": 'because', tho: 'though', thru: 'through', pls: 'please', plz: 'please', thx: 'thanks', ok: 'acceptable', okay: 'acceptable', guys: 'people', kids: 'children', kid: 'child', awesome: 'excellent', cool: 'impressive', dude: 'person', bro: 'friend', yeah: 'yes', yea: 'yes', yep: 'yes', nope: 'no', nah: 'no', anyways: 'anyway', totally: 'completely', stuff: 'things', loads: 'many', huge: 'large', pretty: null, 'super': null };
  const CONTR = { "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'cannot', "won't": 'will not', "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not', "haven't": 'have not', "hasn't": 'has not', "hadn't": 'had not', "couldn't": 'could not', "shouldn't": 'should not', "wouldn't": 'would not', "mustn't": 'must not', "i'm": 'I am', "i've": 'I have', "i'll": 'I will', "i'd": 'I would', "you're": 'you are', "you've": 'you have', "you'll": 'you will', "we're": 'we are', "we've": 'we have', "we'll": 'we will', "they're": 'they are', "they've": 'they have', "they'll": 'they will', "he's": 'he is', "she's": 'she is', "it's": 'it is', "that's": 'that is', "there's": 'there is', "what's": 'what is', "who's": 'who is', "let's": 'let us', "here's": 'here is' };
  const PROPER = new Set('monday tuesday wednesday thursday friday saturday sunday january february march april june july august september october november december english spanish french dutch portuguese papiamento caribbean jamaica jamaican trinidad tobago trinidadian barbados barbadian bajan guyana guyanese bahamas antigua grenada dominica belize haiti haitian cuba cuban christmas easter africa african europe european america american british britain india indian chinese st. maarten'.split(' '));
  PROPER.delete('march'); PROPER.delete('may');
  const SUBJ3 = new Set(['he', 'she', 'it']);
  const PRON = new Set(['i', 'you', 'he', 'she', 'it', 'we', 'they']);
  const AUX = new Set("am is are was were be been being have has had do does did will would shall should can could may might must ought don't doesn't didn't won't wouldn't can't cannot couldn't shouldn't isn't aren't wasn't weren't hasn't haven't hadn't mustn't".split(' '));
  const PREV_SKIP = new Set("let lets make makes made making help helps helped helping see sees saw seen watch watches watched hear hears heard have has had feel feels felt notice noticed noticing bid does did do will would can could should shall may might must don't doesn't didn't won't wouldn't can't couldn't shouldn't to why how what where when who whom".split(' '));
  const NONVERB = new Set('well still even just only so then too also alone right back down up out off there here now home soon late early all both either neither again ever never once together yet though first last next rather almost maybe perhaps really always often usually sometimes already rarely seldom normally generally simply actually constantly certainly clearly probably definitely truly very quite much more most less least not no and or but if as at in on by for of with from about into than that this these those who which what whose whom when where why how a an the my your his her its our their own same such other another each every any some many few one two three four five six seven eight nine ten like say says said'.split(' '));
  const ADVS = new Set('always never often usually sometimes also just really still only even already rarely seldom normally generally simply actually constantly certainly clearly probably truly'.split(' '));
  const SAMEPAST = new Set('cut put hit let set cost hurt shut read spread beat bet quit burst cast split broadcast upset fit bid rid shed spit thrust wed'.split(' '));
  const IRR = { go: 'went', come: 'came', see: 'saw', do: 'did', have: 'had', make: 'made', take: 'took', get: 'got', give: 'gave', tell: 'told', say: 'said', find: 'found', think: 'thought', know: 'knew', eat: 'ate', drink: 'drank', run: 'ran', buy: 'bought', bring: 'brought', write: 'wrote', speak: 'spoke', leave: 'left', feel: 'felt', meet: 'met', sit: 'sat', stand: 'stood', begin: 'began', sing: 'sang', swim: 'swam', teach: 'taught', catch: 'caught', fight: 'fought', sleep: 'slept', keep: 'kept', win: 'won', lose: 'lost', send: 'sent', spend: 'spent', build: 'built', hold: 'held', fall: 'fell', drive: 'drove', ride: 'rode', wear: 'wore', break: 'broke', choose: 'chose', forget: 'forgot', grow: 'grew', throw: 'threw', fly: 'flew', draw: 'drew', become: 'became', understand: 'understood', sell: 'sold', pay: 'paid', hear: 'heard', mean: 'meant', lead: 'led', wake: 'woke', steal: 'stole', hide: 'hid', bite: 'bit', shake: 'shook', rise: 'rose', feed: 'fed', dig: 'dug', hang: 'hung', stick: 'stuck', strike: 'struck', swing: 'swung', tear: 'tore', lend: 'lent', bleed: 'bled', blow: 'blew', freeze: 'froze', ring: 'rang', shine: 'shone', shoot: 'shot', sink: 'sank', slide: 'slid', speed: 'sped', stink: 'stank', sweep: 'swept', weep: 'wept', wind: 'wound', is: 'was', are: 'were', be: 'was' };
  const DOUBLE = new Set('stop plan drop shop chat beg hug jog rob rub skip slip step stir tap trip grab nod pin plug ban fit admit commit prefer refer occur permit regret control travel'.split(' '));
  const PART = new Set('written given taken done made seen known shown told found held built brought taught thought bought caught sent spent kept left lost paid said sold won chosen spoken broken stolen driven eaten beaten forgotten hidden drawn grown thrown worn torn sung begun understood heard meant led fed struck put cut set hit spread read hurt shut known born forgiven overtaken undertaken mistaken withdrawn'.split(' '));
  const NOTPASSIVE = new Set('interested tired excited worried married supposed used concerned located based scared bored pleased satisfied surprised determined prepared qualified amazed annoyed ashamed confused convinced disappointed embarrassed exhausted frightened involved talented skilled aged advanced limited detailed crowded experienced dedicated committed sophisticated complicated balanced organized organised united'.split(' '));
  const IRRPL = { child: 'children', man: 'men', woman: 'women', person: 'people', foot: 'feet', tooth: 'teeth', mouse: 'mice', goose: 'geese', leaf: 'leaves', life: 'lives', knife: 'knives', wife: 'wives', half: 'halves', shelf: 'shelves', thief: 'thieves', wolf: 'wolves', loaf: 'loaves' };
  const PLURAL_ONLY = new Set('people children men women feet teeth mice police cattle sheep fish deer data media criteria phenomena staff series species aircraft youth news means headquarters'.split(' '));
  const MASS = new Set('information advice equipment furniture homework knowledge research evidence luggage baggage traffic music money water rice bread weather work time food help fun health progress software hardware'.split(' '));
  const NUMW = new Set('two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty hundred several many numerous various both these those few'.split(' '));
  const NUMSKIP = new Set('hundred thousand million billion dozen percent per more less other of different times kind sort type'.split(' '));
  const NEG1 = new Set("don't doesn't didn't can't cannot won't isn't aren't wasn't weren't never not ain't couldn't wouldn't shouldn't haven't hasn't hadn't dont doesnt didnt cant wont isnt aint".split(' '));
  const NEG2 = { nothing: 'anything', nobody: 'anybody', nowhere: 'anywhere', none: 'any', neither: 'either', no: 'any', never: 'ever' };
  const CONJ = new Set('and but or so yet for nor because although though which who whom whose when while if since after before as unless until whereas where that than then also however therefore'.split(' '));
  const SUBORD = new Set('if when although because while after before since as unless though even once until whenever whether wherever whereas'.split(' '));
  const GLUE = new Set('and but or so yet for nor because although though which who whom whose when while if since after before as unless until whereas where what how why that than then think thought know knew said say says believe believed hope feel felt mean guess wish told tell realise realize realised realized show showed shows found find suppose supposed sure glad happy afraid noticed notice see saw heard decided learned learnt understood means meant once now whether because of with to in on at by from about of like is was are were be am'.split(' '));
  const PAST_MARK = /\b(yesterday|last\s+(night|week|month|year|term|weekend|summer|holiday|time|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|\d+\s+(days?|weeks?|months?|years?)\s+ago|(days?|weeks?|months?|years?|long)\s+ago|in\s+(19|20)\d\d)\b/i;
  const NOT_PAST = /\b(will|tomorrow|next|every|usually|always|often|now|going\s+to|that|today)\b/i;
  const CV = new Set('say go think believe want know have do feel like need seem get make live come tell give admit argue agree claim complain teach try understand prefer enjoy spend allow become keep mean explain suggest mention write speak believe realise realize disagree insist expect hope wish love hate learn remember forget refuse decide'.split(' '));
  const DETS = new Set('my his her our their your the this that there every each'.split(' '));
  const PLDETS = new Set('some many most all these those both several few'.split(' '));
  const END_WORDS = new Set('yesterday today tonight home now there here too also again already well later afterwards lately ago everywhere anymore tomorrow outside inside early late'.split(' '));
  const KINDS = ['spelling', 'confusable', 'grammar', 'creole', 'capitalisation', 'punctuation', 'register', 'style'];
  const KLABEL = { spelling: 'Spelling', confusable: 'Word choice', grammar: 'Grammar', creole: 'Creole feature', capitalisation: 'Capital letter', punctuation: 'Punctuation', register: 'Formal register', style: 'Style hint' };

  /* =====================================================================
     3. HELPERS FOR THE CHECKER
     ===================================================================== */
  function matchCase(orig, rep) {
    if (rep == null) return rep;
    if (!orig) return rep;
    if (orig.length > 1 && orig === orig.toUpperCase() && /[A-Z]/.test(orig)) return rep.toUpperCase();
    if (orig[0] === orig[0].toUpperCase() && /[A-Za-z]/.test(orig[0])) return rep.charAt(0).toUpperCase() + rep.slice(1);
    return rep;
  }
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  function to3s(v) {
    if (v === 'have') return 'has'; if (v === 'do') return 'does'; if (v === 'go') return 'goes'; if (v === 'be') return 'is';
    if (/(s|x|z|ch|sh|o)$/.test(v)) return v + 'es';
    if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ies';
    return v + 's';
  }
  function pastOf(v) {
    if (IRR[v]) return IRR[v];
    if (SAMEPAST.has(v)) return null;
    if (/e$/.test(v)) return v + 'd';
    if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ied';
    if (DOUBLE.has(v)) return v + v.slice(-1) + 'ed';
    return v + 'ed';
  }
  function plural(n) {
    if (IRRPL[n]) return IRRPL[n];
    if (/(s|x|z|ch|sh)$/.test(n)) return n + 'es';
    if (/[^aeiou]y$/.test(n)) return n.slice(0, -1) + 'ies';
    return n + 's';
  }
  function isVerbBase(w) {
    if (w === 'have' || w === 'do') return true;
    if (NONVERB.has(w) || AUX.has(w) || SAMEPAST.has(w)) return false;
    const p = posOf(w); if (!p.includes('v')) return false;
    if (/(ed|ing)$/.test(w) && !db().idx.has(w)) return false;
    return true;
  }
  function verbish(w) { return AUX.has(w) || isVerbBase(w) || /ed$/.test(w) && bases(w).some(b => posOf(b).includes('v')) || /s$/.test(w) && bases(w).some(b => posOf(b).includes('v')) || Object.values(IRR).includes(w); }
  function isPluralNoun(w) {
    if (PLURAL_ONLY.has(w) && !['news', 'means', 'series', 'species'].includes(w)) return true;
    if (!/[^s]s$/.test(w) || /(ss|us|is)$/.test(w)) return false;
    if (db().idx.has(w) && primaryPos(w) !== 'n') return false;
    return bases(w).some(b => posOf(b).includes('n'));
  }
  function syllables(word) {
    let w = word.toLowerCase().replace(/[^a-z]/g, ''); if (!w) return 0; if (w.length <= 3) return 1;
    w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
    const m = w.match(/[aeiouy]{1,2}/g); return Math.max(1, m ? m.length : 1);
  }

  function tokenize(text) {
    const toks = [], re = /[A-Za-zÀ-ɏ]+(?:['’][A-Za-z]+)*|\d+(?:[.,]\d+)*[A-Za-z]*/g;
    let m; while ((m = re.exec(text))) toks.push({ w: m[0], s: m.index, e: m.index + m[0].length, lw: m[0].toLowerCase().replace(/’/g, "'"), num: /^\d/.test(m[0]) });
    return toks;
  }
  const ABBR = /\b(?:Mr|Mrs|Ms|Dr|St|Prof|etc|e\.g|i\.e|vs|No|Fig)\.$/i;
  function sentences(text) { // returns [{s, e}] covering text
    const out = []; let start = 0, capOK = true;
    const re = /([.!?]+["”’')\]]*)(\s+)|\n+/g; let m;
    while ((m = re.exec(text))) {
      const end = m[1] ? m.index + m[1].length : m.index;
      if (m[1] && ABBR.test(text.slice(Math.max(0, m.index - 5), m.index + 1))) continue;
      if (m[1] && /^\.\.+/.test(m[1])) continue; // ellipsis
      if (text.slice(start, end).trim()) out.push({ s: start, e: end, capOK });
      capOK = !!m[1] && !/^[!?]+["”’')\]]/.test(m[1]);
      start = m.index + m[0].length;
    }
    if (text.slice(start).trim()) out.push({ s: start, e: text.length, capOK });
    // trim leading space
    out.forEach(x => { while (x.s < x.e && /\s/.test(text[x.s])) x.s++; });
    return out;
  }
  function stats(text) {
    text = String(text || '');
    const toks = tokenize(text).filter(t => !t.num || true), words = toks.length;
    const sents = sentences(text).filter(s => /[A-Za-z0-9]/.test(text.slice(s.s, s.e)));
    const sc = sents.length;
    const syl = toks.reduce((a, t) => a + (t.num ? 1 : syllables(t.w)), 0);
    const avg = sc ? words / sc : 0;
    const flesch = words && sc ? Math.round(206.835 - 1.015 * avg - 84.6 * (syl / words)) : null;
    return { words, sentences: sc, avg: Math.round(avg * 10) / 10, flesch, chars: text.length };
  }
  function fleschBand(f) {
    if (f == null) return '';
    if (f >= 80) return 'very easy to read'; if (f >= 60) return 'plain English'; if (f >= 50) return 'fairly difficult (typical of good essays)'; if (f >= 30) return 'difficult'; return 'very difficult: shorten sentences';
  }

  /* =====================================================================
     4. THE CHECKER
     ===================================================================== */
  function check(text, opts) {
    text = String(text == null ? '' : text); opts = opts || {};
    const formal = opts.formal !== false;
    const d = db();
    const T = tokenize(text), S = sentences(text), out = [];
    // sentence index per token
    let si = 0;
    T.forEach((t, i) => { while (si < S.length - 1 && t.s >= S[si].e) si++; t.si = si; t.i = i; });
    S.forEach((s, k) => { s.toks = T.filter(t => t.si === k); s.text = text.slice(s.s, s.e); });
    T.forEach(t => { const st = S[t.si]; t.first = st && st.toks[0] === t; });
    { let q = false, qi = 0; const qre = /["“”]/g; let mq; const qs = [];
      while ((mq = qre.exec(text))) { const c = mq[0]; q = c === '“' ? true : c === '”' ? false : !q; qs.push([mq.index, q]); }
      T.forEach(t => { while (qi < qs.length && qs[qi][0] < t.s) qi++; t.inQ = qi > 0 && qs[qi - 1][1]; }); }
    const gap = (a, b) => text.slice(a.e, b.s);
    const plain = (a, b) => a && b && a.si === b.si && /^\s+$/.test(gap(a, b));
    const nx = (i, k) => { let a = T[i]; for (let j = 1; j <= k; j++) { const b = T[i + j]; if (!plain(a, b)) return null; a = b; } return T[i + k]; };
    const pv = i => (i > 0 && plain(T[i - 1], T[i])) ? T[i - 1] : null;
    const add = (s, e, kind, rule, msg, fix, extra) => out.push(Object.assign({ start: s, end: e, kind, rule, msg, fix: fix === undefined ? null : fix, label: KLABEL[kind], original: text.slice(s, e) }, extra || {}));
    const span = (a, b, kind, rule, msg, fix, extra) => add(a.s, b.e, kind, rule, msg, fix, extra);
    const pastSent = t => { const s = S[t.si]; return s && PAST_MARK.test(s.text) && !NOT_PAST.test(s.text.replace(PAST_MARK, '')); };

    for (let i = 0; i < T.length; i++) {
      const t = T[i], w = t.lw, n1 = nx(i, 1), n2 = nx(i, 2), p1 = pv(i);
      const n1w = n1 && n1.lw, n2w = n2 && n2.lw;
      if (t.num) continue;
      if (t.inQ && !MISSPELL[w]) { if (t.w === 'i') add(t.s, t.s + 1, 'capitalisation', 'cap-i', 'The pronoun “I” is always a capital letter.', 'I'); continue; }

      /* --- Creole lexical items & informal words --- */
      if (CREOLE_WORDS[w] && !(w === 'ah' && !(n1 && verbish(n1w))) && !(w === 'bout' && p1 && ['a', 'the', 'this', 'that'].includes(p1.lw)) && !(w === 'wit' && !(n1 && /^(the|my|his|her|a|me|him|them|us|you)$/.test(n1w)))) {
        const c = CREOLE_WORDS[w]; const sug = c[0].split(' / ')[0];
        add(t.s, t.e, 'creole', 'creole-word', `“${t.w}” is a Creole word. Creole is a full language, but CAPE essays need Standard English: write “${c[0]}”${c[1] ? '. ' + c[1] : '.'}`, matchCase(t.w, sug)); continue;
      }
      if (w in INFORMAL && INFORMAL[w] !== null && !(w === 'cos' && false) && !(w === 'r' && !(p1 && PRON.has(p1.lw))) && !(w === 'u' && t.w === 'U')) {
        if (formal || ['gonna', 'wanna', 'gotta', 'lol', 'omg', 'u', 'ur', 'r', 'cuz', 'coz', 'idk', 'tbh', 'dunno', 'lemme', 'gimme'].includes(w)) {
          const f = INFORMAL[w];
          add(t.s, t.e, 'register', 'informal', f ? `“${t.w}” is informal. In a formal essay write “${f}”.` : `“${t.w}” is text-speak. Leave it out of formal writing.`, f ? matchCase(t.w, f) : '');
          continue;
        }
      }
      if (w === 'pretty' && n1 && primaryPos(n1w) === 'a' && formal) { add(t.s, t.e, 'register', 'informal', '“Pretty” as an intensifier is informal. Try “fairly” or “quite”.', matchCase(t.w, 'fairly')); continue; }

      /* --- spelling --- */
      const isProper = /^[A-Z]/.test(t.w) && !t.first;
      const acronym = t.w.length > 1 && t.w === t.w.toUpperCase();
      if (MISSPELL[w]) { const f = MISSPELL[w]; add(t.s, t.e, 'spelling', 'spelling', `Misspelt. The correct spelling is “${f}”.`, /^[A-Z]/.test(f) ? f : matchCase(t.w, f), { alts: [] }); continue; }
      if (!isProper && !acronym && !(w in CONTR) && !known(w)) {
        if (/'/.test(w)) { const b = w.split("'")[0]; if (known(b)) { /* odd contraction */ } }
        const sug = suggest(t.w, 4);
        add(t.s, t.e, 'spelling', 'spelling', sug.length ? `“${t.w}” is not in the dictionary. Did you mean “${sug[0]}”?` : `“${t.w}” is not in the dictionary. Check the spelling (or add it to your dictionary if it is a name or a correct term).`, sug[0] || null, { alts: sug.slice(1), unknown: true });
        continue;
      }

      /* --- capitalisation --- */
      if (w === 'i' || /^i'(m|ve|ll|d)$/.test(w)) { if (t.w[0] === 'i') add(t.s, t.s + 1, 'capitalisation', 'cap-i', 'The pronoun “I” is always a capital letter.', 'I'); }
      else if (t.first && S[t.si].capOK && /^[a-z]/.test(t.w) && !/^(e\.g|i\.e)/.test(text.slice(t.s, t.s + 4)) && !/[(\["“'‘]$/.test(text.slice(Math.max(0, t.s - 1), t.s))) add(t.s, t.s + 1, 'capitalisation', 'cap-start', 'Start every sentence with a capital letter.', t.w[0].toUpperCase());
      else if (PROPER.has(w) && /^[a-z]/.test(t.w) && !(w === 'english' && false)) add(t.s, t.s + 1, 'capitalisation', 'cap-proper', `“${cap(w)}” is a proper noun (a name of a day, month, language, nationality or place), so it takes a capital letter.`, t.w[0].toUpperCase());

      /* --- repeated word --- */
      if (n1 && n1w === w && !['had', 'that', 'is', 'very'].includes(w)) { add(t.e, n1.e, 'grammar', 'repeat', `“${t.w}” is written twice.`, ''); continue; }

      /* --- a / an --- */
      if ((w === 'a' || w === 'an') && n1 && !n1.num) {
        const nw = n1w, vowelSound = /^[aeiou]/.test(nw) && !/^(uni|use|usu|uti|ura|eu|one|once|ewe|uk|ufo)/.test(nw) || /^(hour|honest|honou?r|heir|herb)/.test(nw) || (n1.w.length > 1 && n1.w === n1.w.toUpperCase() && /^[AEFHILMNORSX]/.test(n1.w));
        if (w === 'a' && vowelSound) add(t.s, t.e, 'grammar', 'a-an', `Use “an” before a vowel sound: “an ${n1.w}”.`, matchCase(t.w, 'an'));
        else if (w === 'an' && !vowelSound) add(t.s, t.e, 'grammar', 'a-an', `Use “a” before a consonant sound: “a ${n1.w}”.`, matchCase(t.w, 'a'));
      }

      /* --- confusables --- */
      if (['could', 'should', 'would', 'must', 'might'].includes(w) && n1w === 'of') { span(n1, n1, 'confusable', 'could-of', `“${t.w} of” is how “${t.w}'ve” sounds, but the correct form is “${t.w} have”.`, matchCase(n1.w, 'have')); i++; continue; }
      if (w === 'their' && n1 && ['is', 'are', 'was', 'were'].includes(n1w)) { add(t.s, t.e, 'confusable', 'their-there', '“Their” shows ownership. To say something exists, use “there” (there is / there are).', matchCase(t.w, 'there')); continue; }
      if (w === 'their' && n1 && ['going', 'not', 'coming', 'doing', 'being', 'trying', 'always', 'never', 'getting', 'very', 'so', 'really', 'all'].includes(n1w) && n1w !== 'all') { add(t.s, t.e, 'confusable', 'their-theyre', '“They’re” means “they are”. “Their” shows ownership.', matchCase(t.w, "they're")); continue; }
      if (w === 'there' && n1 && primaryPos(n1w) === 'n' && !posOf(n1w).includes('v') && !/s$/.test(n1w) === false && false) { /* reserved */ }
      if (w === 'there' && n1 && (n1w === 'own' || (['parents', 'friends', 'children', 'teachers', 'homes', 'lives', 'families', 'family', 'mother', 'father', 'opinions', 'ideas', 'language', 'culture', 'school', 'house', 'work', 'country', 'community', 'teacher', 'books', 'car', 'money', 'way', 'views', 'rights'].includes(n1w))) && !(p1 && /^(is|are|was|were|be|been|from|over|in|out|get|got|go|went|here|and)$/.test(p1.lw))) { add(t.s, t.e, 'confusable', 'there-their', '“Their” shows ownership (their books). “There” is a place or starts “there is / there are”.', matchCase(t.w, 'their')); }
      if (w === 'there' && n1w === 'going' && !(p1 && AUX.has(p1.lw))) { add(t.s, t.e, 'confusable', 'there-theyre', '“They’re” means “they are”: “they’re going”.', matchCase(t.w, "they're")); continue; }
      if (w === "they're" && n1 && (n1w === 'own' || primaryPos(n1w) === 'n' && !posOf(n1w).match(/[var]/))) { add(t.s, t.e, 'confusable', 'theyre-their', '“They’re” means “they are”. For ownership use “their”.', matchCase(t.w, 'their')); continue; }
      if (w === 'your' && n1 && ['going', 'not', 'welcome', 'right', 'wrong', 'so', 'very', 'always', 'being', 'doing', 'coming', 'getting', 'correct', 'lucky', 'a', 'an', 'the', 'never', 'trying'].includes(n1w)) { add(t.s, t.e, 'confusable', 'your-youre', '“You’re” means “you are”. “Your” shows ownership.', matchCase(t.w, "you're")); continue; }
      if (w === "you're" && n1 && (n1w === 'own' || primaryPos(n1w) === 'n' && !posOf(n1w).match(/[var]/) || ['chance', 'mother', 'father', 'friend', 'friends', 'teacher', 'work', 'essay', 'opinion', 'life', 'money', 'family', 'school', 'book', 'name', 'phone'].includes(n1w))) { add(t.s, t.e, 'confusable', 'youre-your', '“You’re” means “you are”. For ownership use “your”.', matchCase(t.w, 'your')); continue; }
      if (w === "it's" && n1 && (n1w === 'own' || ['purpose', 'meaning', 'audience', 'message', 'way', 'name', 'role', 'impact', 'effect', 'effects', 'users', 'members', 'people', 'citizens', 'history', 'culture', 'value', 'main', 'own'].includes(n1w))) { add(t.s, t.e, 'confusable', 'its-it', '“It’s” means “it is”. For ownership use “its” (no apostrophe).', matchCase(t.w, 'its')); continue; }
      if (w === 'its' && n1 && ['a', 'an', 'the', 'not', 'very', 'so', 'important', 'clear', 'time', 'been', 'going', 'true', 'easy', 'hard', 'difficult', 'obvious', 'always', 'never', 'my', 'your', 'our', 'their', 'also', 'just', 'only', 'really', 'necessary', 'possible', 'good', 'bad', 'better', 'best', 'likely', 'evident', 'essential', 'crucial', 'vital'].includes(n1w)) { add(t.s, t.e, 'confusable', 'its-its', '“Its” shows ownership. Here you mean “it is”, so write “it’s” (or “it is” in a formal essay).', matchCase(t.w, formal ? 'it is' : "it's")); continue; }
      if (w === 'then' && p1 && (['more', 'less', 'better', 'worse', 'rather', 'other', 'fewer', 'greater', 'larger', 'smaller', 'bigger', 'higher', 'lower', 'older', 'younger', 'faster', 'slower', 'easier', 'harder', 'earlier', 'later', 'longer', 'shorter', 'stronger', 'weaker', 'cheaper', 'richer', 'poorer', 'louder', 'clearer', 'safer', 'happier'].includes(p1.lw) || /er$/.test(p1.lw) && bases(p1.lw).some(b => primaryPos(b) === 'a'))) { add(t.s, t.e, 'confusable', 'then-than', 'Use “than” to compare (bigger than). “Then” is about time (first … then).', matchCase(t.w, 'than')); continue; }
      if (w === 'than' && (t.first || (p1 && ['and', 'but', 'since', 'just', 'until'].includes(p1.lw)) || /,\s*$/.test(text.slice(Math.max(0, t.s - 3), t.s)))) { add(t.s, t.e, 'confusable', 'than-then', '“Than” compares. For time or sequence use “then”.', matchCase(t.w, 'then')); continue; }
      if (w === 'affect' && p1 && ['an', 'the', 'a', 'positive', 'negative', 'great', 'big', 'major', 'huge', 'lasting', 'this', 'that', 'side'].includes(p1.lw)) { add(t.s, t.e, 'confusable', 'affect-effect', '“Effect” is the noun (an effect, the effect). “Affect” is the verb (it affects me).', matchCase(t.w, 'effect')); continue; }
      if (w === 'affects' && p1 && ['the', 'its', 'negative', 'positive', 'side', 'these', 'those', 'harmful', 'many'].includes(p1.lw)) { add(t.s, t.e, 'confusable', 'affect-effect', '“Effects” is the noun. “Affects” is the verb.', matchCase(t.w, 'effects')); continue; }
      if ((w === 'effect' || w === 'effects' || w === 'effected') && p1 && (['to', 'will', 'can', 'could', 'would', 'may', 'might', 'does', 'did', 'not', "doesn't", "don't", "didn't", 'also', 'greatly', 'negatively', 'positively', 'directly'].includes(p1.lw) || PRON.has(p1.lw) || p1.lw === 'media') && !(n1 && n1w === 'change')) { add(t.s, t.e, 'confusable', 'effect-affect', '“Affect” is the verb (to affect someone). “Effect” is the noun (the effect of something).', matchCase(t.w, w.replace('effect', 'affect'))); continue; }
      if (w === 'loose' && p1 && (['to', 'will', 'can', 'could', 'would', 'might', 'may', "don't", "didn't", 'not', 'never', 'cannot', "can't", "won't", 'might', 'shall', 'should'].includes(p1.lw) || PRON.has(p1.lw)) ) { add(t.s, t.e, 'confusable', 'loose-lose', '“Lose” means to stop having something (lose a game). “Loose” means not tight.', matchCase(t.w, 'lose')); continue; }
      if (w === 'loosing') { add(t.s, t.e, 'confusable', 'loose-lose', '“Losing” (one o) comes from “lose”. “Loosing” means making something loose.', matchCase(t.w, 'losing')); continue; }
      if (w === 'to' && n1w === 'much' && n2 && !['acclaim', 'applause', 'fanfare', 'praise', 'surprise', 'delight'].includes(n2w) && !(p1 && /^(due|according|thanks|owing)$/.test(p1.lw))) { add(t.s, t.e, 'confusable', 'to-too', '“Too much” means more than is good. “To” is a preposition or part of a verb.', matchCase(t.w, 'too')); continue; }
      if (w === 'to' && n1 && ['much', 'many', 'late', 'early', 'soon', 'often', 'hard', 'difficult', 'easy', 'long', 'far', 'young', 'old', 'bad', 'fast', 'slow', 'big', 'small', 'hot', 'cold', 'expensive', 'busy', 'tired', 'loud', 'little', 'high', 'low', 'short', 'complicated', 'dangerous'].includes(n1w) && (!nx(i, 2) || ['to', 'for', 'and', 'that'].includes(n2w)) && (p1 && /^(was|is|are|were|be|been|far|way|not|it's|much|got|get|felt|feel|seems?|seemed|became|become|too)$/.test(p1.lw))) { add(t.s, t.e, 'confusable', 'to-too', '“Too” means “excessively” or “also” (too late, me too). “To” is a preposition or part of a verb (to go).', matchCase(t.w, 'too')); continue; }
      if (w === 'to' && p1 && PRON.has(p1.lw) === false && ['me', 'him', 'her', 'us', 'them', 'you'].includes(p1.lw) && /^\s*[.!?]/.test(text.slice(t.e, t.e + 2))) { add(t.s, t.e, 'confusable', 'to-too', 'At the end of a sentence meaning “also”, write “too”.', matchCase(t.w, 'too')); continue; }
      if (w === 'too' && n1 && ['go', 'be', 'see', 'do', 'make', 'have', 'get', 'eat', 'help', 'find', 'take', 'write', 'read', 'say', 'speak', 'learn', 'understand', 'school', 'the', 'my', 'your', 'his', 'her', 'their', 'our'].includes(n1w) && !(n1w === 'be' && false)) { add(t.s, t.e, 'confusable', 'too-to', '“Too” means “also” or “excessively”. Before a verb or a place, use “to”.', matchCase(t.w, 'to')); continue; }
      if (w === 'whose' && n1 && ['going', 'coming', 'been', 'not', 'is', 'there', 'that', 'the'].includes(n1w)) { add(t.s, t.e, 'confusable', 'whose-whos', '“Who’s” means “who is / who has”. “Whose” shows ownership.', matchCase(t.w, "who's")); continue; }
      if (w === "who's" && n1 && (primaryPos(n1w) === 'n' && !posOf(n1w).match(/[var]/) || ['book', 'idea', 'fault', 'turn', 'car', 'phone', 'work'].includes(n1w))) { add(t.s, t.e, 'confusable', 'whos-whose', '“Whose” shows ownership (whose book?). “Who’s” means “who is”.', matchCase(t.w, 'whose')); continue; }
      if (w === 'where' && p1 && ['we', 'they', 'you', 'there'].includes(p1.lw) && !(n1 && PRON.has(n1w))) { add(t.s, t.e, 'confusable', 'where-were', '“Were” is the past of “are” (they were). “Where” asks about place.', matchCase(t.w, 'were')); continue; }
      if (w === 'were' && t.first && n1 && ['is', 'are', 'do', 'did', 'can', 'was', 'does'].includes(n1w)) { add(t.s, t.e, 'confusable', 'were-where', 'To ask about place, use “where”.', matchCase(t.w, 'where')); continue; }
      if (w === 'weather' && (n1w === 'or' || p1 && ['know', 'wonder', 'decide', 'decided', 'asked', 'ask', 'see', 'sure', 'matter', 'determine', 'about', 'unsure', 'consider'].includes(p1.lw))) { add(t.s, t.e, 'confusable', 'weather-whether', '“Whether” introduces a choice (whether or not). “Weather” is rain and sun.', matchCase(t.w, 'whether')); continue; }
      if (w === 'except' && p1 && ['to', 'will', 'can', 'cannot', 'could', 'would', 'should', 'must', 'did', 'not', "don't", "didn't", "won't", 'we', 'they', 'i', 'you', 'please', 'gladly'].includes(p1.lw)) { add(t.s, t.e, 'confusable', 'except-accept', '“Accept” means to receive or agree. “Except” means “not including”.', matchCase(t.w, 'accept')); continue; }
      if (w === 'past' && p1 && ['have', 'has', 'had', 'was', 'were'].includes(p1.lw) && n1 && ['the', 'my', 'his', 'her', 'their', 'our', 'your', 'a', 'an', 'away', 'out', 'on', 'it', 'by'].includes(n1w) && n1w !== 'by') { add(t.s, t.e, 'confusable', 'past-passed', '“Passed” is the verb (I passed the test). “Past” is time gone by or means “beyond”.', matchCase(t.w, 'passed')); continue; }
      if (w === 'suppose' && n1w === 'to' && p1 && ['was', 'is', 'are', 'were', 'am', "i'm", "it's", 'be'].includes(p1.lw)) { add(t.s, t.e, 'confusable', 'supposed-to', 'The fixed phrase is “supposed to” (with -d).', matchCase(t.w, 'supposed')); continue; }
      if (w === 'use' && n1w === 'to' && p1 && PRON.has(p1.lw) && !(nx(i, 2) && false)) { add(t.s, t.e, 'confusable', 'used-to', 'For past habits write “used to” (I used to play).', matchCase(t.w, 'used')); continue; }
      if (w === 'everyday' && ((n1 && /^(i|we|they|he|she|you|and|at|in|for|to|but|because|so|or|after|before|until|when|while)$/.test(n1w)) || /^\s*([.,;!?]|$)/.test(text.slice(t.e, t.e + 2)))) { add(t.s, t.e, 'confusable', 'everyday', '“Everyday” is an adjective (everyday life). Meaning “each day”, write two words: “every day”.', matchCase(t.w, 'every day')); continue; }
      if (w === 'an' && n1w === 'other') { span(t, n1, 'spelling', 'another', 'Write “another” as one word.', matchCase(t.w, 'another')); i++; continue; }
      if (w === 'of' && p1 && ['could', 'would', 'should'].includes(p1.lw)) continue;

      /* --- subject-verb agreement & Creole verb patterns --- */
      const subjOK = (SUBJ3.has(w) && (w !== 'it' || t.first || (p1 && CONJ.has(p1.lw)) || /[,;:]\s*$/.test(text.slice(Math.max(0, t.s - 3), t.s)) || !p1));
      if (SUBJ3.has(w) && subjOK && !(p1 && PREV_SKIP.has(p1.lw))) {
        let vt = n1, adv = false;
        if (vt && ADVS.has(vt.lw) && nx(i, 2)) { vt = nx(i, 2); adv = true; }
        if (vt && vt.lw === "don't") { add(vt.s, vt.e, 'grammar', 'sva-dont', `With “${t.w}”, use “doesn't” (${t.w.toLowerCase()} doesn't).`, matchCase(vt.w, "doesn't")); continue; }
        if (vt && vt.lw === 'dont') { /* spelling rule already handles "dont" */ }
        else if (vt && (vt.lw === 'were' && w !== 'it' && false)) { }
        else if (vt && isVerbBase(vt.lw) && text[vt.e] !== '-' && !S[t.si].text.trim().endsWith('?') && !(nx(i, adv ? 3 : 2) && nx(i, adv ? 3 : 2).lw === 'to' && vt.lw === 'have' && false)) {
          const v = vt.lw;
          if (v === 'been') { }
          else if (pastSent(t) && pastOf(v)) add(vt.s, vt.e, 'creole', 'past-unmarked', `This sentence is about the past (look at the time word), so the verb needs its past form: “${pastOf(v)}”. In Creole the time word alone can show the past; Standard English also changes the verb.`, matchCase(vt.w, pastOf(v)));
          else add(vt.s, vt.e, 'grammar', 'sva-3s', `Subject–verb agreement: with he/she/it the present-tense verb ends in -s: “${t.w.toLowerCase()} ${to3s(v)}”. (Creole verbs do not change for he/she/it, so this slip is common.)`, matchCase(vt.w, to3s(v)));
          continue;
        }
        if (vt && primaryPos(vt.lw) === 'a' && !verbish(vt.lw) && !/ed$/.test(vt.lw) && !posOf(vt.lw).includes('v') && !posOf(vt.lw).includes('n') && !NONVERB.has(vt.lw) && !adv && w !== 'it') { add(vt.s, vt.s, 'creole', 'copula', `A verb is missing. In Creole “${t.w} ${vt.w}” is a full sentence; in Standard English write “${t.w.toLowerCase()} is ${vt.w}”.`, null); }
      }
      if (['every', 'each'].includes(w) && n1 && primaryPos(n1w) === 'n' && !/s$/.test(n1w) && n2 && isVerbBase(n2w) && primaryPos(n2w) === 'v' && !S[t.si].text.trim().endsWith('?')) {
        add(n2.s, n2.e, 'grammar', 'sva-every', `“${t.w} ${n1.w}” is singular, so the verb takes -s: “${to3s(n2w)}”.`, matchCase(n2.w, to3s(n2w))); continue;
      }
      if (['i', 'you', 'we', 'they'].includes(w) && n1 && !(p1 && PREV_SKIP.has(p1.lw)) && !(p1 && ['to', 'for', 'with', 'at', 'from'].includes(p1.lw))) {
        const fixMap = { is: { i: 'am', you: 'are', we: 'are', they: 'are' }, was: { you: 'were', we: 'were', they: 'were' }, has: { i: 'have', you: 'have', we: 'have', they: 'have' }, does: { i: 'do', you: 'do', we: 'do', they: 'do' }, "doesn't": { i: "don't", you: "don't", we: "don't", they: "don't" }, am: { you: 'are', we: 'are', they: 'are' } };
        const f = fixMap[n1w] && fixMap[n1w][w];
        if (f && !(n1w === 'does' && nx(i, 2) && isVerbBase(nx(i, 2).lw))) { add(n1.s, n1.e, 'grammar', 'sva-plural', `Subject–verb agreement: “${t.w} ${f}”, not “${t.w} ${n1.w}”.${n1w === 'is' || n1w === 'was' ? ' (Creole often uses one form of “be” for every subject; Standard English changes it.)' : ''}`, matchCase(n1.w, f)); continue; }
        if (pastSent(t) && isVerbBase(n1w) && pastOf(n1w) && !S[t.si].text.trim().endsWith('?') && !['been'].includes(n1w)) { add(n1.s, n1.e, 'creole', 'past-unmarked', `This sentence is about the past, so write “${pastOf(n1w)}”. In Creole the time word (yesterday, last week) can carry the past by itself; Standard English marks the verb too.`, matchCase(n1.w, pastOf(n1w))); continue; }
        if (n1 && primaryPos(n1w) === 'a' && !posOf(n1w).match(/[vn]/) && !NONVERB.has(n1w) && !verbish(n1w) && !/ed$/.test(n1w)) { const be = w === 'i' ? 'am' : 'are'; add(n1.s, n1.s, 'creole', 'copula', `A verb is missing. In Creole “${t.w} ${n1.w}” is complete; Standard English needs “${t.w === 'i' ? 'I' : t.w.toLowerCase()} ${be} ${n1.w}”.`, null); }
      }
      if (PRON.has(w) && n1w === 'been' && !(p1 && ['have', 'has', 'had', "i've", 'having'].includes(p1.lw))) { const h = SUBJ3.has(w) ? 'has' : 'have'; add(n1.s, n1.e, 'creole', 'been', `In Creole “${t.w} been …” is fine; Standard English needs a helping verb: “${t.w.toLowerCase() === 'i' ? 'I' : t.w.toLowerCase()} ${h} been”.`, h + ' been'); continue; }
      if (w === 'there' && n1 && (['is', 'was', "there's"].includes(n1w) || w === "there's")) {
        let k = 2, nn = nx(i, 2);
        if (nn && ['a', 'lots', 'plenty'].includes(nn.lw)) { let j = nn.lw === 'a' ? 4 : 3; const lot = nx(i, 3), of = nx(i, j - 0 - (nn.lw === 'a' ? 0 : 1)); if ((nn.lw !== 'a' || (lot && lot.lw === 'lot')) && nx(i, j) && nx(i, j).lw === 'of' && nx(i, j + 1) && isPluralNoun(nx(i, j + 1).lw)) nn = nx(i, j + 1); }
        if (nn && ['many', 'several', 'few', 'two', 'three', 'four', 'five', 'numerous', 'various', 'lots'].includes(nn.lw) || nn && isPluralNoun(nn.lw) || nn && primaryPos(nn.lw) === 'a' && nx(i, 3) && isPluralNoun(nx(i, 3).lw)) {
          add(n1.s, n1.e, 'grammar', 'there-is-plural', `The noun after it is plural, so write “there ${n1w === 'was' ? 'were' : 'are'}”.`, matchCase(n1.w, n1w === 'was' ? 'were' : 'are')); continue;
        }
      }
      if (w === "there's" && n1 && (['many', 'several', 'two', 'three', 'numerous', 'lots'].includes(n1w) || isPluralNoun(n1w))) { add(t.s, t.e, 'grammar', 'there-is-plural', 'The noun after it is plural, so write “there are”.', matchCase(t.w, 'there are')); continue; }
      if (['the', 'these', 'those', 'them', 'my', 'our', 'his', 'her', 'their', 'your', 'some', 'many', 'all', 'both', 'two', 'there', 'three', 'four', 'five', 'several', 'most'].includes(w) && !(p1 && ['of', 'among', 'between'].includes(p1.lw)) && n1 && /^[a-z]/.test(n1.w) && isPluralNoun(n1w) && n2 && ['was', 'is', 'has', 'does', "doesn't", "isn't", "wasn't"].includes(n2w)) {
        const f = { was: 'were', is: 'are', has: 'have', does: 'do', "doesn't": "don't", "isn't": "aren't", "wasn't": "weren't" }[n2w];
        add(n2.s, n2.e, 'grammar', 'sva-plural-noun', `“${n1.w}” is plural, so the verb is “${f}”, not “${n2.w}”.`, matchCase(n2.w, f));
      }
      if ((DETS.has(w) || PLDETS.has(w)) && !(p1 && (PREV_SKIP.has(p1.lw) || /^(makes|lets|helps|watches|hears|sees)$/.test(p1.lw))) && !(p1 && ['of', 'among', 'between', 'to', 'for', 'with', 'from', 'about', 'than', 'that', 'let', 'make', 'made', 'help', 'see', 'saw', 'watch', 'hear', 'heard'].includes(p1.lw)) && n1 && n2 && /^[a-z]/.test(n1.w) && !S[t.si].text.trim().endsWith('?')) {
        if (DETS.has(w) && w !== 'every' && w !== 'each' && w !== 'there' && primaryPos(n1w) === 'n' && !isPluralNoun(n1w) && !/s$/.test(n1w) && !PLURAL_ONLY.has(n1w) && !MASS.has(n1w) && CV.has(n2w) && !(nx(i, 3) && nx(i, 3).lw === 'to' && n2w === 'have' && false)) {
          const f = pastSent(t) && pastOf(n2w) ? pastOf(n2w) : to3s(n2w);
          add(n2.s, n2.e, f === to3s(n2w) ? 'grammar' : 'creole', f === to3s(n2w) ? 'sva-noun' : 'past-unmarked', f === to3s(n2w) ? `“${t.w} ${n1.w}” is singular, so the present-tense verb ends in -s: “${f}”. (Creole verbs do not change for a singular subject, so this slip is common.)` : `This sentence is about the past, so write “${f}”.`, matchCase(n2.w, f)); continue;
        }
        if (w !== 'every' && w !== 'each' && (isPluralNoun(n1w) || PLURAL_ONLY.has(n1w)) && /s$/.test(n2w) && bases(n2w).some(b => CV.has(b)) && !/'/.test(n2w)) {
          const b = bases(n2w).find(x => CV.has(x));
          add(n2.s, n2.e, 'grammar', 'sva-plural-noun', `“${n1.w}” is plural, so the verb has no -s: “${b}”.`, matchCase(n2.w, b)); continue;
        }
      }
      if (w === 'does' && p1 && (PRON.has(p1.lw) || primaryPos(p1.lw) === 'n') && n1 && isVerbBase(n1w) && n1w !== 'not' && !S[t.si].text.trim().endsWith('?') && !t.first) {
        const sub = p1.lw, v = n1w, f = (SUBJ3.has(sub) || !PRON.has(sub)) ? to3s(v) : v;
        span(t, n1, 'creole', 'habitual-does', `In many Caribbean Creoles “does + verb” shows a habit (${p1.w} does ${v}). In Standard English the simple present does the job: “${p1.w.toLowerCase() === 'i' ? 'I' : p1.w} ${f}”.`, f); i++; continue;
      }
      if (w === 'them' && n1 && (isPluralNoun(n1w) || ['people', 'children', 'men', 'women'].includes(n1w)) && !(p1 && /^(give|gave|given|giving|tell|told|show|showed|send|sent|bring|brought|buy|bought|offer|offered|teach|taught|lend|lent|hand|handed|pay|paid|owe|make|made|get|got|call|called|wish|ask|asked|let|help|helped|for|to|of|left|leave|cost)$/.test(p1.lw))) { add(t.s, t.e, 'creole', 'them-those', `“Them ${n1.w}” is a Creole way of saying “those ${n1.w}”. In Standard English, “them” is only a pronoun: write “those”.`, matchCase(t.w, 'those')); continue; }
      if (w === 'more' && n1 && (['better', 'worse'].includes(n1w) || /(er|ier)$/.test(n1w) && bases(n1w).some(b => primaryPos(b) === 'a') && !['other', 'over', 'power', 'water', 'number', 'after', 'never', 'ever', 'paper', 'together', 'under', 'rather', 'matter', 'later', 'eager'].includes(n1w))) { span(t, n1, 'creole', 'double-comparative', `“More ${n1.w}” is a double comparative: “${n1.w}” already means “more”. Write “${n1.w}”.`, matchCase(t.w, n1.w)); i++; continue; }
      if (w === 'most' && n1 && (['best', 'worst'].includes(n1w) || /est$/.test(n1w) && bases(n1w).some(b => primaryPos(b) === 'a'))) { span(t, n1, 'creole', 'double-comparative', `“Most ${n1.w}” is a double superlative. Write “${n1.w}”.`, matchCase(t.w, n1.w)); i++; continue; }
      if ((NUMW.has(w) || t.num && false) && n1 && !NUMSKIP.has(n1w) && !PLURAL_ONLY.has(n1w) && !MASS.has(n1w) && primaryPos(n1w) === 'n' && !AUX.has(n1w) && !NONVERB.has(n1w) && text[n1.e] !== '-' && !/^[A-Z]/.test(n1.w) && !(nx(i, 2) && nx(i, 2).num) && !/s$/.test(n1w) && !(nx(i, 2) && (primaryPos(nx(i, 2).lw) === 'n' || isPluralNoun(nx(i, 2).lw))) && !(['these', 'those', 'few', 'both'].includes(w) && !n1) && !(w === 'few' && p1 && p1.lw === 'a' && false)) {
        add(n1.s, n1.e, 'creole', 'plural-unmarked', `After “${t.w}”, the noun should be plural: “${plural(n1w)}”. In Creole the number word (or “dem”) shows the plural; Standard English adds -s.`, matchCase(n1.w, plural(n1w))); continue;
      }
      if (/^\d+$/.test(w) === false && t.num) continue;

      /* --- “me and him went” --- */
      const OBJ = { me: 'I', him: 'he', her: 'she', them: 'they', us: 'we', i: 'I', he: 'he', she: 'she', they: 'they', we: 'we' };
      if (n1w === 'and' && n2 && (t.first || (p1 && SUBORD.has(p1.lw))) && (['me', 'him', 'her', 'them', 'us'].includes(w) || ['me', 'him', 'them', 'us'].includes(n2w)) && nx(i, 3) && verbish(nx(i, 3).lw) && !(n2w === 'her' && nx(i, 3) && primaryPos(nx(i, 3).lw) === 'n')) {
        const A = OBJ[w] || t.w, B = OBJ[n2w] || n2.w;
        let pair = A === 'I' ? `${B} and I` : B === 'I' ? `${A} and I` : `${A} and ${B}`;
        if (t.first) pair = cap(pair);
        span(t, n2, 'creole', 'pronoun-subject', `As the subject of a sentence, use “I / he / she / we / they”, and put yourself last: “${pair}”. (“Me and him went” is common in Creole and casual speech.)`, pair); i += 2; continue;
      }
      if (['me', 'him', 'her', 'us', 'them'].includes(w) && t.first && n1w === 'and' && n2 && ['my', 'his', 'her', 'our', 'their', 'the'].includes(n2w) && nx(i, 3) && (primaryPos(nx(i, 3).lw) === 'n' || isPluralNoun(nx(i, 3).lw)) && nx(i, 4) && verbish(nx(i, 4).lw)) {
        const n3 = nx(i, 3), A = OBJ[w]; const pair = A === 'I' ? `${cap(n2.w.toLowerCase())} ${n3.w} and I` : `${cap(A)} and ${n2.w.toLowerCase()} ${n3.w}`;
        span(t, n3, 'creole', 'pronoun-subject', `As the subject, use “I / he / she / we / they” and put yourself last: “${pair}”.`, pair); i += 3; continue;
      }
      if (w === 'me' && t.first && n1 && verbish(n1w) && n1w !== 'and' && !['too', 'neither', 'either'].includes(n1w)) { add(t.s, t.e, 'creole', 'pronoun-subject', 'As the subject, Standard English uses “I”, not “me”.', 'I'); continue; }

      /* --- passive voice hint --- */
      if (['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being'].includes(w) && n1) {
        let pp = n1; if (ADVS.has(pp.lw) || /ly$/.test(pp.lw)) pp = nx(i, 2) || pp;
        const pw = pp.lw;
        if (pp !== t && !NOTPASSIVE.has(pw) && [1, 2, 3].some(k => { const q = nx(pp.i, k); return q && q.lw === 'by'; }) && (PART.has(pw) || /[^e]ed$|[^aeiou]ed$/.test(pw) && bases(pw).some(b => posOf(b).includes('v')))) {
          add(t.s, pp.e, 'style', 'passive', `Passive voice (“${text.slice(t.s, pp.e)} … by”). It is fine in reports, but active voice is usually clearer and stronger in arguments: put the doer first.`, null);
        }
      }

      /* --- contractions in formal mode --- */
      if (formal && CONTR[w] && !(w === "it's" || w === "let's") ) add(t.s, t.e, 'register', 'contraction', `Contractions are informal. In a CAPE essay write “${CONTR[w]}”.`, matchCase(t.w, CONTR[w]));
      else if (formal && w === "it's") add(t.s, t.e, 'register', 'contraction', 'Contractions are informal. In a CAPE essay write “it is”.', matchCase(t.w, 'it is'));
    }

    /* --- double negatives (own pass so other rules cannot skip it) --- */
    for (let i = 0; i < T.length; i++) {
      const t = T[i], w = t.lw;
      /* --- double negatives --- */
      if (NEG1.has(w) && !t.num) {
        for (let k = 1; k <= 4; k++) {
          const q = nx(i, k); if (!q) break;
          if (CONJ.has(q.lw) && q.lw !== 'that') break;
          if (q.lw === 'only') break;
          if (NEG2[q.lw] && !(q.lw === 'no' && nx(i, k + 1) && ['longer', 'matter', 'doubt', 'one'].includes(nx(i, k + 1).lw)) && !(q.lw === 'never' && k === 1 && w === 'not')) {
            add(q.s, q.e, 'grammar', 'double-negative', `Double negative: “${t.w} … ${q.w}”. In Standard English two negatives cancel out, so use one: “${t.w} … ${NEG2[q.lw]}”. (Double negatives are normal in Creole and many dialects, but not in exam English.)`, matchCase(q.w, NEG2[q.lw]));
            break;
          }
        }
      }

    }

    /* --- sentence-level rules --- */
    S.forEach((s, k) => {
      const toks = s.toks; if (!toks.length) return;
      const firstW = toks[0].lw;
      // very long sentence
      if (toks.length > 40) add(toks[0].s, toks[0].e, 'style', 'long-sentence', `This sentence is ${toks.length} words long. Sentences over about 35 words are hard to follow: split it or use a semicolon.`, null);
      // comma splice
      const re = /,\s+/g; let m; const st = s.text;
      while ((m = re.exec(st))) {
        const at = s.s + m.index, after = toks.find(t => t.s >= at + m[0].length); if (!after) break;
        const before = toks.filter(t => t.e <= at);
        let nxt = T[after.i + 1]; if (nxt && ADVS.has(nxt.lw) && T[after.i + 2] && plain(nxt, T[after.i + 2])) nxt = T[after.i + 2];
        if (before.length < 4 || !['i', 'he', 'she', 'we', 'they', 'it', 'this', 'there', 'you'].includes(after.lw) || !nxt || !plain(after, T[after.i + 1]) || !verbish(nxt.lw)) continue;
        if (SUBORD.has(firstW) || /ing$/.test(firstW) || ['however', 'therefore', 'in', 'on', 'at', 'after', 'before', 'during', 'for', 'with', 'without', 'despite', 'although', 'though', 'yes', 'no', 'well', 'firstly', 'secondly', 'finally', 'also', 'moreover', 'furthermore'].includes(firstW)) continue;
        const lastB = before[before.length - 1].lw;
        const prevComma = st.lastIndexOf(',', m.index - 1), seg = toks.filter(t => t.s > s.s + prevComma && t.e <= at);
        if (prevComma >= 0 && seg.length && ['in', 'on', 'at', 'for', 'during', 'after', 'before', 'with', 'without', 'despite', 'however', 'therefore', 'of', 'by', 'from', 'like', 'unlike', 'as'].includes(seg[0].lw)) continue;
        if (before.some(t => t.lw === 'why')) continue;
        if (['said', 'says', 'asked', 'replied', 'think', 'believe', 'however', 'therefore', 'moreover', 'though', 'example', 'instance', 'course', 'fact'].includes(lastB)) continue;
        if (!before.some(t => verbish(t.lw))) continue;
        if (before.some(t => SUBORD.has(t.lw) || ['who', 'which', 'whom'].includes(t.lw)) || after.inQ) continue;
        if (['believe', 'think', 'feel', 'know', 'hope', 'guess', 'suppose', 'mean', 'agree'].includes(nxt.lw) && /^\s*[,.]/.test(text.slice(nxt.e, nxt.e + 2))) continue;
        // a later conjunction/semicolon after "and" etc is not our business
        add(at, at + 1, 'punctuation', 'comma-splice', 'Comma splice: two complete sentences are joined with only a comma. Use a full stop, a semicolon, or a joining word (and, but, because).', ';');
      }
      // fused sentence (run-on): "... store I bought ..."
      if (!SUBORD.has(firstW)) {
        let hadClause = false;
        for (let j = 0; j < toks.length; j++) {
          const t = toks[j], prev = toks[j - 1], nxt = toks[j + 1];
          if (j > 0 && (AUX.has(t.lw) || PRON.has(prev.lw) && verbish(t.lw))) hadClause = true;
          if (j < 3 || !hadClause) continue;
          if (!['i', 'he', 'she', 'we', 'they', 'it'].includes(t.lw) || !nxt || !plain(t, nxt) || !plain(prev, t)) continue;
          if (GLUE.has(prev.lw) || AUX.has(prev.lw) || PREV_SKIP.has(prev.lw) || verbish(prev.lw) && !posOf(prev.lw).includes('n') && !posOf(prev.lw).includes('r')) continue;
          if (!verbish(nxt.lw) || ['to'].includes(nxt.lw)) continue;
          if (!(/^[A-Z]/.test(t.w) && t.lw !== 'i') && !END_WORDS.has(prev.lw)) continue;
          add(prev.e, t.s + 1, 'punctuation', 'run-on', `Possible run-on sentence: a new sentence seems to start at “${t.w}”. Add a full stop (or a comma + joining word) before it.`, '. ' + (t.w[0] === 'i' && t.w.length === 1 ? 'I' : t.w[0].toUpperCase()));
          break;
        }
      }
      // no end punctuation on the last sentence / before a line break
      const lastT = toks[toks.length - 1], tail = text.slice(lastT.e, s.e + 3);
      if (!lastT.inQ && !/^[^\n]*?[.!?:;"”)]/.test(text.slice(lastT.e, s.e + 1)) && ((k === S.length - 1 && toks.length >= 4) || (toks.length >= 8 && /^\s*\n/.test(tail)))) add(lastT.s, lastT.e, 'punctuation', 'end-punct', 'This sentence has no full stop at the end.', lastT.w + '.');
    });

    /* --- character-level punctuation --- */
    let m2; const rp = /(\s+)([,.;:!?])(?![.\d])/g;
    while ((m2 = rp.exec(text))) { if (/\n/.test(m2[1])) continue; if (m2[2] === '.' && /\.\.\./.test(text.slice(m2.index + m2[1].length, m2.index + m2[1].length + 3))) continue; add(m2.index, m2.index + m2[0].length, 'punctuation', 'space-before', `No space before “${m2[2]}”.`, m2[2]); }
    const rq = /([a-z])([,;])([A-Za-z])/g; while ((m2 = rq.exec(text))) add(m2.index + 1, m2.index + 2, 'punctuation', 'space-after', `Put a space after the “${m2[2]}”.`, m2[2] + ' ');
    const rr = /([a-z]{2})\.([A-Z][a-z])/g; while ((m2 = rr.exec(text))) add(m2.index + 2, m2.index + 3, 'punctuation', 'space-after', 'Put a space after the full stop.', '. ');
    const rx = /([!?]){2,}|!\?|\?!/g; while ((m2 = rx.exec(text))) add(m2.index, m2.index + m2[0].length, 'register', 'multi-punct', 'Repeated “!!” or “??” is informal. One mark is enough in formal writing.', m2[0][0]);

    /* --- resolve overlaps: keep higher-priority kinds, then sort --- */
    const pri = k => KINDS.indexOf(k);
    out.sort((a, b) => pri(a.kind) - pri(b.kind) || a.start - b.start);
    const kept = [];
    for (const it of out) {
      if (kept.some(k => it.start < k.end && k.start < it.end || (it.start === it.end && it.start >= k.start && it.start < k.end) || (k.start === k.end && k.start >= it.start && k.start < it.end) || (it.start === it.end && k.start === k.end && it.start === k.start))) continue;
      kept.push(it);
    }
    kept.sort((a, b) => a.start - b.start || a.end - b.end);
    return kept;
  }

  const userDict = () => { try { const S = window.COURSE_API && window.COURSE_API.S; return new Set((S && S.wordsDict) || []); } catch (e) { return new Set(); } };
  window.COURSE_WORDDESK = { check, suggest, define, stats, resolve, known, _db: db };

  /* =====================================================================
     5. UI
     ===================================================================== */
  const CSS = `
.wd-hero h1{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.wd-tabs{margin:4px 0 14px}
.wd-wrap{display:flex;flex-direction:column;gap:16px;min-width:0}
.wd-search{position:relative}
.wd-search .search{width:100%;box-sizing:border-box;font-size:1.05rem}
.wd-sug{list-style:none;margin:6px 0 0;padding:0;display:flex;flex-direction:column;gap:2px;border:1px solid var(--line);border-radius:12px;background:var(--surface);overflow:hidden}
.wd-sug:empty{display:none}
.wd-sug button{all:unset;box-sizing:border-box;display:flex;justify-content:space-between;gap:8px;width:100%;padding:9px 12px;cursor:pointer;color:var(--ink)}
.wd-sug button:hover,.wd-sug button.on,.wd-sug button:focus-visible{background:var(--soft-gold);outline:none}
.wd-sug small{opacity:.7}
.wd-word{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.wd-word h2{margin:0;font-size:clamp(1.6rem,5vw,2.3rem);overflow-wrap:anywhere}
.wd-pos{font-style:italic;color:var(--gold);font-weight:600}
.wd-defs{margin:10px 0 0;padding-left:1.4em}
.wd-defs li{margin:6px 0;line-height:1.5}
.wd-defs .wd-pos{margin-right:6px;font-size:.92em}
.wd-ex{margin:10px 0 0;padding:8px 12px;border-left:4px solid var(--gold);background:var(--soft-gold);border-radius:0 10px 10px 0;font-style:italic}
.wd-from{font-size:.92rem;opacity:.85;margin:6px 0 0}
.wd-sub{margin:14px 0 6px;font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;opacity:.8}
.wd-chip-ant{border-style:dashed!important}
.wd-gl{margin-top:14px;padding:12px;border-radius:12px;border:2px solid var(--gold);background:linear-gradient(135deg,rgba(255,215,102,.12),transparent)}
.wd-gl b{color:var(--gold)}
.wd-wotd{display:grid;grid-template-columns:auto minmax(0,1fr);gap:14px;align-items:center}
.wd-wotd .wd-badge{width:64px;height:64px;border-radius:18px;display:grid;place-items:center;font-size:1.9rem;background:linear-gradient(145deg,var(--gold),#c99a1c);box-shadow:var(--shadow);color:#14213d}
.wd-mini{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.wd-mini textarea,.wd-text{width:100%;box-sizing:border-box;border-radius:12px;border:2px solid var(--line);background:var(--surface);color:var(--ink);padding:12px;font:inherit;line-height:1.6;resize:vertical}
.wd-text{min-height:200px}
.wd-mini textarea{min-height:70px}
.wd-mini textarea:focus,.wd-text:focus{outline:3px solid var(--gold);outline-offset:1px}
.wd-statrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;margin:12px 0 4px}
.wd-stat{border:1px solid var(--line);border-radius:12px;padding:8px 10px;background:var(--surface)}
.wd-stat b{display:block;font-size:1.25rem}
.wd-stat span{font-size:.78rem;opacity:.8}
.wd-meter{margin-top:8px}
.wd-meter .pbar{height:10px}
.wd-meter.over .pbar>i{background:var(--bad)!important}
.wd-ctl{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.wd-ctl select{border-radius:10px;border:2px solid var(--line);background:var(--surface);color:var(--ink);padding:7px 8px;font:inherit;max-width:100%}
.wd-ctl label{display:flex;gap:6px;align-items:center;font-size:.92rem}
.wd-marked{white-space:pre-wrap;line-height:1.9;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--surface);overflow-wrap:anywhere}
.wd-m{all:unset;cursor:pointer;border-radius:3px;text-decoration:underline wavy;text-decoration-thickness:2px;text-underline-offset:4px;text-decoration-skip-ink:none}
.wd-m:focus-visible{outline:2px solid var(--gold)}
.wd-m.wd-empty{display:inline-block;min-width:8px;height:1em;vertical-align:-2px;border-bottom:3px solid}
.wd-k-spelling{text-decoration-color:#e5484d;background:rgba(229,72,77,.12);border-color:#e5484d}
.wd-k-confusable{text-decoration-color:#f08c00;background:rgba(240,140,0,.13);border-color:#f08c00}
.wd-k-grammar{text-decoration-color:#3e8ef7;background:rgba(62,142,247,.13);border-color:#3e8ef7}
.wd-k-creole{text-decoration-color:#12a594;background:rgba(18,165,148,.13);border-color:#12a594}
.wd-k-capitalisation,.wd-k-punctuation{text-decoration-color:#9d5bd2;background:rgba(157,91,210,.13);border-color:#9d5bd2}
.wd-k-register{text-decoration-color:#d4a72c;background:rgba(212,167,44,.15);border-color:#d4a72c}
.wd-k-style{text-decoration-style:dotted;text-decoration-color:#8b95a7;background:rgba(139,149,167,.12);border-color:#8b95a7}
.wd-issue.wd-k-spelling{border-left-color:#e5484d}.wd-issue.wd-k-confusable{border-left-color:#f08c00}.wd-issue.wd-k-grammar{border-left-color:#3e8ef7}.wd-issue.wd-k-creole{border-left-color:#12a594}.wd-issue.wd-k-capitalisation,.wd-issue.wd-k-punctuation{border-left-color:#9d5bd2}.wd-issue.wd-k-register{border-left-color:#d4a72c}.wd-issue.wd-k-style{border-left-color:#8b95a7}
.wd-issue{border-top-color:var(--line)!important;border-right-color:var(--line)!important;border-bottom-color:var(--line)!important}
.wd-legend{display:flex;flex-wrap:wrap;gap:6px 12px;font-size:.8rem;margin:8px 0}
.wd-legend span{display:inline-flex;gap:5px;align-items:center}
.wd-legend i{width:12px;height:12px;border-radius:3px;display:inline-block;border-width:2px;border-style:solid}
.wd-issues{display:flex;flex-direction:column;gap:10px;margin-top:12px}
.wd-issue{border:1px solid var(--line);border-left:6px solid;border-radius:12px;padding:10px 12px;background:var(--surface);min-width:0}
.wd-issue.flash{box-shadow:0 0 0 3px var(--gold)}
.wd-issue h4{margin:0 0 4px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:.98rem}
.wd-issue .wd-tag{font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border-radius:999px;border:1px solid currentColor}
.wd-issue p{margin:4px 0 8px;line-height:1.5}
.wd-chg{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.9rem;overflow-wrap:anywhere}
.wd-chg s{opacity:.75}
.wd-issue .row{gap:6px}
.wd-issue .btn{padding:6px 12px;font-size:.88rem}
.wd-read{white-space:pre-wrap;line-height:1.8;padding:12px;border-radius:12px;border:2px dashed var(--gold);margin-top:10px;overflow-wrap:anywhere}
.wd-read .on{background:var(--soft-gold);box-shadow:0 0 0 3px var(--soft-gold);border-radius:4px}
.wd-ai{margin-top:12px;padding:12px;border-radius:12px;border:2px solid var(--blue);background:rgba(62,142,247,.07)}
.wd-bank{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}
.wd-bank .flip{min-height:130px;width:100%}
.wd-bitem{display:flex;flex-direction:column;gap:6px;min-width:0}
.wd-bitem .row{justify-content:space-between}
.wd-small{font-size:.86rem;opacity:.85}
.wd-recent{display:flex;flex-wrap:wrap;gap:6px}
@media (max-width:520px){.wd-wotd{grid-template-columns:1fr}.wd-wotd .wd-badge{width:48px;height:48px;font-size:1.4rem}.wd-issue .btn{flex:1 1 auto}}
@media (prefers-reduced-motion:reduce){.wd-issue.flash{transition:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* transient state */
  let draft = '';
  try { draft = localStorage.getItem('wd.draft') || ''; } catch (e) { }
  let result = null, resultFor = null, ignored = new Set(), formalMode = true, limit = 500, rate = 1, reading = false;
  let ai = { busy: false, hidden: false, msg: '', items: null };
  let sentFb = null, cleanRewarded = false;
  const rewardedSent = new Set();
  const VIEW = 'words';
  const TABS = [['dict', '📖 Dictionary'], ['check', '✍️ Grammar & spelling'], ['bank', '⭐ Word bank'], ['about', 'ℹ️ About']];
  const SAMPLE = "me and him went to the beach yesterday , we swim for hours. Their is alot of reasons why young people should recieve more support from the goverment. Its important that every student have a voice. He go to school everyday but he dont never do his homework. Them boys was kind to my friend, they carried three bag for her. Social media is more better then television for spreading news. Your going to lose you're chance if you do not study. The the teacher definately said that i should of checked my work. My friend is gonna write a essay about english It was to late to fix the problem";

  function saveDraft() { try { localStorage.setItem('wd.draft', draft.slice(0, 20000)); } catch (e) { } }
  function S_(api) { const S = api.S; if (!Array.isArray(S.words)) S.words = []; if (!Array.isArray(S.wordsRecent)) S.wordsRecent = []; if (!Array.isArray(S.wordsDict)) S.wordsDict = []; return S; }
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const goBtn = (w, cls, label) => `<button type="button" class="${cls || 'chip'}" data-go="${VIEW}" data-tab="dict" data-k="${esc(w)}">${esc(label || w)}</button>`;

  function wordOfDay(api) {
    const d = db(); if (!d.ok) return null;
    const now = new Date(), seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    const rng = api.seeded ? api.seeded(seed) : Math.random;
    for (let tries = 0; tries < 60; tries++) {
      const i = 2500 + Math.floor(rng() * Math.min(9500, d.words.length - 2500));
      const e = entry(i);
      if (e.ex && e.syn.length && /^[a-z]+$/.test(e.word) && 'nva'.includes(e.pos[0])) return e;
    }
    return entry(2500);
  }

  function entryHTML(api, loc) {
    const d = db(), q = loc.k, S = S_(api);
    const r = resolve(q);
    if (!r) {
      const sug = suggest(q, 10).map(x => x.toLowerCase()).filter(x => resolve(x)).slice(0, 6);
      return `<div class="card"><span class="kicker">No entry found</span><h2>“${esc(q)}”</h2>
        ${sug.length ? `<p>Did you mean …?</p><div class="chips">${sug.map(x => goBtn(x)).join('')}</div>` : `<p>We could not find that word. Check the spelling, or try a simpler form (e.g. “run” instead of “running”).</p>`}</div>`;
    }
    const D = define(r.word) || { senses: [], synonyms: [], antonyms: [], glossary: [], pos: [] };
    const gl = (d.gloss.get(r.word) || d.gloss.get(normKey(q)) || []);
    const G = window.COURSE_GLOSSARY || {};
    const inBank = S.words.includes(r.word);
    const defsText = D.senses.map((s, i) => `${i + 1}. ${s.pos}: ${s.def}`).join('. ');
    let h = `<article class="card wd-entry"><div class="card-top"><span class="kicker">${D.pos.length ? esc(D.pos.join(' · ')) : 'Comm Studies term'}</span><span class="tools"><button type="button" class="tool" data-px="say" data-w="${esc(r.word)}" aria-label="Hear the word">🔊 Word</button>${D.senses.length || gl.length ? `<button type="button" class="tool" data-px="saydef" aria-label="Hear the definitions">🔊 Meaning</button>` : ''}</span></div>
      <div class="wd-word"><h2>${esc(r.word)}</h2><button type="button" class="btn ${inBank ? 'gold' : 'ghost'}" data-px="bank" data-w="${esc(r.word)}" aria-pressed="${inBank}">${inBank ? '★ In word bank' : '☆ Save to word bank'}</button></div>
      ${r.from ? `<p class="wd-from">Showing <b>${esc(r.word)}</b>, the base form of “${esc(r.from)}”.</p>` : ''}
      ${gl.length ? gl.map(t => `<div class="wd-gl"><b>Communication Studies meaning</b>${t.c && G.cats ? ` <span class="ribbon">${esc(G.cats[t.c] || t.c)}</span>` : ''}<p>${esc((t.d || [])[0] || '')}</p>${(t.r || []).length && G.refs ? `<p class="hint">Syllabus link: ${t.r.map(x => esc(x + ' ' + (G.refs[x] || ''))).join('; ')}</p>` : ''}</div>`).join('') : ''}
      ${D.senses.length ? `<ol class="wd-defs">${D.senses.map(s => `<li><span class="wd-pos">${esc(s.pos)}</span>${esc(s.def)}</li>`).join('')}</ol>` : ''}
      ${D.example ? `<p class="wd-ex">“${esc(D.example)}”</p>` : ''}
      ${D.synonyms.length ? `<p class="wd-sub">Synonyms (similar meaning)</p><div class="chips">${D.synonyms.map(x => goBtn(x)).join('')}</div>` : ''}
      ${D.antonyms.length ? `<p class="wd-sub">Antonyms (opposite meaning)</p><div class="chips">${D.antonyms.map(x => goBtn(x, 'chip wd-chip-ant')).join('')}</div>` : ''}
      <span hidden id="wd-deftext">${esc(r.word + '. ' + (defsText || (gl[0] && (gl[0].d || [])[0]) || ''))}</span>
      </article>`;
    h += `<div class="card"><h3>Use it in a sentence</h3><p class="hint">Write your own sentence with “${esc(r.word)}”. The checker looks at your grammar and whether you used the word.</p>
      <div class="wd-mini"><label class="sr" for="wd-sent" style="position:absolute;left:-9999px">Your sentence</label><textarea id="wd-sent" placeholder="Write a sentence that uses “${esc(r.word)}”…">${esc((sentFb && sentFb.w === r.word && sentFb.text) || '')}</textarea>
      <div class="row"><button type="button" class="btn go" data-px="sentcheck" data-w="${esc(r.word)}">Check my sentence</button></div>
      ${sentFb && sentFb.w === r.word ? sentFb.html : ''}</div></div>`;
    return h;
  }

  function dictHTML(api, loc) {
    const S = S_(api), d = db();
    let h = `<div class="card wd-search"><label for="wd-q" class="kicker">Look up a word</label>
      <input id="wd-q" class="search" type="search" autocomplete="off" spellcheck="false" placeholder="Type a word, e.g. persuade, register, dialect" value="${esc(loc.k || '')}" role="combobox" aria-expanded="false" aria-controls="wd-sug" aria-autocomplete="list">
      <ul id="wd-sug" class="wd-sug" role="listbox" aria-label="Suggestions"></ul>
      <div class="row" style="margin-top:8px"><button type="button" class="btn gold" data-px="lookup">Look up</button>${!d.ok ? '<span class="fb bad">The dictionary data did not load.</span>' : ''}</div></div>`;
    if (loc.k) h += entryHTML(api, loc);
    else {
      const w = wordOfDay(api);
      if (w) h += `<div class="card"><span class="kicker">Word of the day · ${esc(new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }))}</span>
        <div class="wd-wotd"><span class="wd-badge" aria-hidden="true">📖</span><div><h2 style="margin:4px 0">${esc(w.word)} <span class="wd-pos">${esc(POSN[w.pos[0]] || '')}</span></h2><p style="margin:0">${esc(w.senses[0].def)}</p>${w.ex ? `<p class="wd-ex">“${esc(w.ex)}”</p>` : ''}</div></div>
        <div class="row" style="margin-top:10px">${goBtn(w.word, 'btn go', 'Open entry →')}<button type="button" class="btn ghost" data-px="say" data-w="${esc(w.word)}">🔊 Hear it</button></div></div>`;
    }
    if (S.wordsRecent.length) h += `<div class="card"><h3>Recent lookups</h3><div class="wd-recent chips">${S.wordsRecent.map(x => goBtn(x)).join('')}</div></div>`;
    if (!loc.k) h += `<div class="card"><h3>Try these Communication Studies words</h3><div class="chips">${['register', 'dialect', 'creole', 'persuade', 'connotation', 'audience', 'credible', 'bias', 'jargon', 'metaphor', 'paralinguistic', 'reliable', 'valid', 'summarise', 'evaluate'].filter(x => resolve(x)).map(x => goBtn(x)).join('')}</div></div>`;
    return h;
  }

  function markedHTML(text, issues) {
    let h = '', pos = 0;
    issues.forEach((it, n) => {
      if (it.start < pos) return;
      h += esc(text.slice(pos, it.start));
      const inner = text.slice(it.start, it.end);
      h += `<button type="button" class="wd-m wd-k-${it.kind}${inner ? '' : ' wd-empty'}" data-px="jump" data-i="${n}" title="${esc(it.label + ': ' + it.msg.replace(/<[^>]+>/g, ''))}" aria-label="${esc(it.label)} issue: ${esc(inner || 'missing word')}">${esc(inner)}</button>`;
      pos = it.end;
    });
    return h + esc(text.slice(pos));
  }
  function statsHTML() {
    const s = stats(draft), over = limit && s.words > limit;
    const pct = limit ? Math.min(100, Math.round(s.words / limit * 100)) : 0;
    return `<div class="wd-statrow"><div class="wd-stat"><b>${s.words}</b><span>words</span></div><div class="wd-stat"><b>${s.sentences}</b><span>sentences</span></div><div class="wd-stat"><b>${s.avg || 0}</b><span>avg words / sentence</span></div><div class="wd-stat"><b>${s.flesch == null ? '–' : s.flesch}</b><span>readability (Flesch)${s.flesch == null ? '' : ': ' + fleschBand(s.flesch)}</span></div></div>
      ${limit ? `<div class="wd-meter ${over ? 'over' : ''}"><div class="pbar" role="progressbar" aria-valuemin="0" aria-valuemax="${limit}" aria-valuenow="${s.words}" aria-label="Word limit"><i style="width:${pct}%"></i></div><p class="wd-small">${s.words} / ${limit} words${over ? ` · <b>${s.words - limit} over the limit</b>: examiners stop reading at the limit, so cut repetition.` : s.words > limit * 0.85 ? ' · close to the limit' : ''}</p></div>` : ''}`;
  }
  function issuesList() {
    if (!result) return [];
    return result.filter(it => !ignored.has(it.rule + '|' + it.original.toLowerCase()));
  }
  function checkHTML(api) {
    const tts = typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined';
    const stale = result && resultFor !== draft;
    const list = issuesList();
    let h = `<div class="card"><div class="card-top"><span class="kicker">Paste or type your writing</span></div>
      <label for="wd-text" style="position:absolute;left:-9999px">Your writing</label>
      <textarea id="wd-text" class="wd-text" spellcheck="false" placeholder="Paste a paragraph or your whole essay here, then press Check.">${esc(draft)}</textarea>
      <div class="wd-ctl" style="margin-top:10px">
        <button type="button" class="btn go" data-px="check">✔ Check</button>
        <button type="button" class="btn gold" data-px="${reading ? 'stopread' : 'read'}" id="wd-readbtn">${reading ? '■ Stop reading' : '🔊 Hear it as written'}</button>
        <label>Speed <select id="wd-rate" aria-label="Reading speed">${[0.6, 0.8, 1, 1.2, 1.5].map(r => `<option value="${r}" ${r === rate ? 'selected' : ''}>${r}×</option>`).join('')}</select></label>
        <label>Limit <select id="wd-limit" aria-label="Word limit">${[[500, 'Modules 1–2 essay (500)'], [300, 'Module 3 essay (300)'], [0, 'No limit']].map(([v, l]) => `<option value="${v}" ${v === limit ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
        <label><input type="checkbox" id="wd-formal" ${formalMode ? 'checked' : ''}> Exam register</label>
      </div>
      <div class="row" style="margin-top:8px"><button type="button" class="btn ghost" data-px="sample">Load a practice paragraph</button><button type="button" class="btn ghost" data-px="clear">Clear</button></div>
      ${!tts ? '<p class="hint">Read aloud is not available in this browser.</p>' : '<p class="hint">“Hear it as written” reads your text exactly as typed, so you can hear missing words and slips your eyes skip over.</p>'}
      <div id="wd-readbox"></div>
      <div id="wd-stats">${statsHTML()}</div></div>`;
    if (result) {
      const counts = {}; list.forEach(it => counts[it.kind] = (counts[it.kind] || 0) + 1);
      h += `<div class="card"><div class="card-top"><span class="kicker">${list.length ? `${list.length} thing${list.length === 1 ? '' : 's'} to look at` : 'All clear'}</span>${stale ? '<span class="fb note">Text changed: press Check again</span>' : ''}</div>
        ${list.length ? `<div class="wd-legend">${KINDS.filter(k => counts[k]).map(k => `<span><i class="wd-k-${k}"></i>${KLABEL[k]} (${counts[k]})</span>`).join('')}</div>
        <div class="wd-marked" aria-label="Your text with issues underlined">${markedHTML(resultFor || '', list)}</div>` : `<p class="fb good">No problems found by the offline checker. Read it aloud once more: no checker catches everything.</p>`}
        ${ai.hidden || !api.sample ? '' : `<div class="row" style="margin-top:10px"><button type="button" class="btn ghost" data-px="ai" ${ai.busy ? 'disabled' : ''}>${ai.busy ? 'Asking AI…' : '🤖 Ask AI for a deeper check'}</button></div>`}
        ${ai.msg ? `<p class="fb note">${esc(ai.msg)}</p>` : ''}
        ${ai.items && ai.items.length ? `<div class="wd-ai"><h3 style="margin-top:0">AI suggestions</h3><div class="wd-issues">${ai.items.map((x, n) => `<div class="wd-issue wd-k-grammar" style="background:var(--surface)"><p class="wd-chg"><s>${esc(x.original)}</s> → <b>${esc(x.suggestion)}</b></p><p>${esc(x.reason)}</p><div class="row"><button type="button" class="btn go" data-px="aifix" data-i="${n}" ${x.done ? 'disabled' : ''}>${x.done ? 'Applied' : 'Apply'}</button></div></div>`).join('')}</div><p class="hint">AI suggestions can be wrong. Decide for yourself before applying.</p></div>` : ''}
        <div class="wd-issues">${list.map((it, n) => {
        const alts = (it.alts || []).filter(Boolean);
        return `<div class="wd-issue wd-k-${it.kind}" id="wd-is-${n}" style="background:var(--surface)"><h4><span class="wd-tag">${esc(it.label)}</span>${it.original ? `<span class="wd-chg"><s>${esc(it.original)}</s>${it.fix != null ? ` → <b>${esc(it.fix === '' ? '(delete)' : it.fix)}</b>` : ''}</span>` : it.fix ? `<span class="wd-chg">add <b>${esc(it.fix)}</b></span>` : ''}</h4><p>${it.msg}</p>
          <div class="row">${it.fix != null ? `<button type="button" class="btn go" data-px="fix" data-i="${n}">Fix${it.fix && it.original ? ': ' + esc(it.fix.trim() || it.fix) : ''}</button>` : ''}${alts.map(a => `<button type="button" class="btn ghost" data-px="fix" data-i="${n}" data-r="${esc(a)}">${esc(a)}</button>`).join('')}<button type="button" class="btn ghost" data-px="ignore" data-i="${n}">Ignore</button>${it.kind === 'spelling' && it.unknown ? `<button type="button" class="btn ghost" data-px="adddict" data-i="${n}">Add to my dictionary</button>` : ''}</div></div>`;
      }).join('')}</div></div>`;
    }
    h += `<div class="card"><h3>What the checker looks for</h3><p class="wd-small">Spelling (with “did you mean”), repeated words, a/an, capital letters, confusable words (their/there/they’re, your/you’re, its/it’s, then/than, affect/effect, lose/loose, to/too, who’s/whose, could of), subject–verb agreement, double negatives, comma splices and run-ons, very long sentences, passive voice, informal words and contractions, and common Caribbean Creole structures. Creole is a language with its own grammar; these notes show the Standard English the exam expects.</p></div>`;
    return h;
  }

  function bankHTML(api) {
    const S = S_(api);
    if (!S.words.length) return `<div class="card"><h2>Your word bank is empty</h2><p>Look up a word and press <b>☆ Save to word bank</b> to collect useful vocabulary for your essays (up to 100 words).</p><div class="row">${goBtn('', 'btn go', 'Open the dictionary')}</div></div>`;
    return `<div class="card"><div class="card-top"><span class="kicker">${S.words.length} / 100 words</span></div><h2>My word bank</h2><p class="hint">Tap a card to flip it and test yourself.</p>
      <div class="wd-bank">${S.words.map(w => {
      const D = define(w); const def = D && D.senses[0] ? D.senses[0].def : (D && D.glossary[0] ? D.glossary[0].def : '');
      return `<div class="wd-bitem"><button type="button" class="flip" data-gx="flip" aria-label="Flip card for ${esc(w)}"><span class="inner"><span class="face"><b>${esc(w)}</b></span><span class="face back"><span class="wd-small">${esc(def)}</span></span></span></button><div class="row">${goBtn(w, 'btn ghost', 'Open')}<button type="button" class="btn ghost" data-px="unbank" data-w="${esc(w)}" aria-label="Remove ${esc(w)} from word bank">✕</button></div></div>`;
    }).join('')}</div></div>`;
  }

  function aboutHTML() {
    const d = db(), L = window.COURSE_LEXICON || {};
    return `<div class="card"><h2>About the Word Desk</h2>
      <p>Everything here works offline. The dictionary has <b>${d.words.length.toLocaleString()}</b> headwords, chosen by how often they appear in English, plus the Academic Word List and the course glossary. The spelling checker knows <b>${(d.spellList.length).toLocaleString()}</b> word forms.</p>
      <h3>Sources and licence</h3><p class="wd-small">${esc(L.src || '')}</p>
      <p class="wd-small">This product includes data from WordNet 3.0. WordNet 3.0 Copyright 2006 by Princeton University. All rights reserved. Used under the WordNet licence, which permits use, copying, modification and distribution with this notice. THE DATABASE IS PROVIDED “AS IS” AND PRINCETON UNIVERSITY MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED. The full licence text is in the lexicon data file.</p>
      <h3>How the checker works</h3><p class="wd-small">The grammar checker uses patterns, not understanding. It catches many common slips but can miss errors or flag correct writing, especially in quotations and dialogue. Treat every card as a question to think about, not an order. Notes marked <b>Creole feature</b> are not “mistakes in Creole”: Caribbean Creoles are full languages with their own rules. The notes show how to say the same thing in the Standard English required in CAPE examinations.</p></div>`;
  }

  /* read aloud exactly as typed, highlighting the sentence being read */
  function readAloud(api, text) {
    const box = document.getElementById('wd-readbox');
    const synth = window.speechSynthesis;
    if (!synth || typeof window.SpeechSynthesisUtterance === 'undefined') { api.speak(text); return; }
    api.stopSpeak();
    try { synth.cancel(); } catch (e) { }
    const parts = sentences(text).map(s => ({ s: s.s, e: s.e, t: text.slice(s.s, s.e) })).filter(p => p.t.trim());
    if (!parts.length) { api.toast('Type or paste some writing first.'); return; }
    if (box) {
      let h = '', pos = 0;
      parts.forEach((p, n) => { h += esc(text.slice(pos, p.s)) + `<span data-n="${n}">${esc(p.t)}</span>`; pos = p.e; });
      box.innerHTML = `<div class="wd-read" aria-live="off">${h + esc(text.slice(pos))}</div>`;
    }
    reading = true; setReadBtn();
    let voice = null; try { const vs = synth.getVoices(); for (const p of ['en-TT', 'en-JM', 'en-GB', 'en-US', 'en']) { voice = vs.find(v => (v.lang || '').replace('_', '-').startsWith(p)); if (voice) break; } } catch (e) { }
    parts.forEach((p, n) => {
      const u = new SpeechSynthesisUtterance(p.t); u.rate = rate; if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-GB';
      u.onstart = () => { document.querySelectorAll('.wd-read span').forEach(x => x.classList.toggle('on', x.dataset.n === String(n))); };
      if (n === parts.length - 1) u.onend = () => stopRead();
      u.onerror = () => { if (n === parts.length - 1) stopRead(); };
      synth.speak(u);
    });
  }
  function stopRead() {
    reading = false; try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { }
    document.querySelectorAll('.wd-read span.on').forEach(x => x.classList.remove('on'));
    setReadBtn();
  }
  function setReadBtn() { const b = document.getElementById('wd-readbtn'); if (b) { b.dataset.px = reading ? 'stopread' : 'read'; b.textContent = reading ? '■ Stop reading' : '🔊 Hear it as written'; } }

  function runCheck() { result = check(draft, { formal: formalMode }); resultFor = draft; ai.items = null; ai.msg = ''; }
  function addRecent(api, w) { const S = S_(api); S.wordsRecent = [w].concat(S.wordsRecent.filter(x => x !== w)).slice(0, 10); api.save(); }

  async function askAI(api) {
    const s = api.sample; if (!s || ai.busy) return;
    if (!draft.trim()) { api.toast('Type or paste some writing first.'); return; }
    ai.busy = true; ai.msg = ''; api.render();
    const prompt = `You are a supportive English teacher checking the writing of a Caribbean CAPE Communication Studies student (age 16–19). The exam requires formal Standard English. Find grammar, spelling, punctuation, word-choice, register and clarity problems in the passage below. Treat Caribbean Creole features respectfully (Creole is a language), but point out where Standard English is needed. Respond ONLY with JSON in this shape: {"issues":[{"original":"exact words copied from the passage","suggestion":"the corrected words","reason":"one short, friendly sentence"}]}. List at most 15 issues, most important first. "original" must be copied exactly from the passage.\n\nPASSAGE:\n"""${draft.slice(0, 6000)}"""`;
    const opts = { cache: false, modelTier: 'quick' };
    try {
      let r = s.json ? await s.json(prompt, opts) : await s(prompt, opts);
      let data = r;
      if (r && typeof r === 'object' && 'text' in r && !Array.isArray(r) && !r.issues) { const t = String(r.text || ''); const m = t.match(/\{[\s\S]*\}|\[[\s\S]*\]/); data = m ? JSON.parse(m[0]) : null; }
      if (r && r.json && !r.issues) data = r.json;
      if (typeof data === 'string') { const m = data.match(/\{[\s\S]*\}|\[[\s\S]*\]/); data = m ? JSON.parse(m[0]) : null; }
      const arr = Array.isArray(data) ? data : (data && Array.isArray(data.issues) ? data.issues : []);
      ai.items = arr.filter(x => x && x.original && x.suggestion != null).slice(0, 15).map(x => ({ original: String(x.original), suggestion: String(x.suggestion), reason: String(x.reason || '') }));
      ai.msg = ai.items.length ? '' : 'The AI found nothing more to add.';
    } catch (e) {
      const code = String((e && (e.code || e.reason || e.name)) || '') + ' ' + String(e && e.message || e);
      if (/not_granted/.test(code)) { ai.hidden = true; ai.msg = ''; }
      else if (/rate_limited/.test(code)) ai.msg = 'The AI helper is busy right now. Try again in a minute; the offline checker still works.';
      else ai.msg = 'The AI check did not work this time. The offline checker results above still apply.';
    }
    ai.busy = false; api.render();
  }

  function sentenceFeedback(api, w, text) {
    const t = text.trim();
    if (!t) return { w, text, html: '<p class="fb bad">Write a sentence first.</p>' };
    const toks = tokenize(t);
    const used = toks.some(x => x.lw === w || bases(x.lw).includes(w)) || (w.includes(' ') && t.toLowerCase().includes(w));
    const iss = check(t, { formal: true }).filter(x => x.kind !== 'style');
    let html = '';
    if (!used) html += `<p class="fb bad">Your sentence does not use “${esc(w)}” (or a form of it such as -s, -ed, -ing).</p>`;
    if (toks.length < 6) html += `<p class="fb note">Make it longer (at least 6 words) so the meaning is clear from the context.</p>`;
    if (iss.length) html += `<div class="fb note"><b>Check these:</b><ul>${iss.slice(0, 5).map(x => `<li><b>${esc(x.original || '…')}</b>${x.fix ? ' → ' + esc(x.fix) : ''}: ${x.msg}</li>`).join('')}</ul></div>`;
    if (used && toks.length >= 6 && !iss.length) {
      html = `<p class="fb good">Great sentence! You used “${esc(w)}” correctly in Standard English.</p>`;
      if (!rewardedSent.has(w)) { rewardedSent.add(w); setTimeout(() => api.reward(2, 'New word in action'), 0); }
    }
    return { w, text, html };
  }

  /* suggestions dropdown */
  function prefixMatches(q) {
    const d = db(), A = d.alpha; q = normKey(q); if (!q) return [];
    let lo = 0, hi = A.length; while (lo < hi) { const m = (lo + hi) >> 1; if (A[m] < q) lo = m + 1; else hi = m; }
    const out = []; for (let i = lo; i < A.length && out.length < 300 && A[i].startsWith(q); i++) out.push(A[i]);
    out.sort((a, b) => (a === q ? -1 : b === q ? 1 : 0) || rankOf(a) - rankOf(b) || a.length - b.length);
    return out.slice(0, 8);
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: VIEW,
    title: 'Word Desk',
    tile: { icon: '📖', meta: 'Dictionary, thesaurus, spelling and grammar checker' },
    render(api, loc) {
      const tab = loc.tab || 'dict';
      let h = `<section class="hero wd-hero"><span class="eyebrow">Tool · works offline</span><h1>📖 Word Desk</h1><p>Look up meanings and synonyms, collect useful words, and check your writing for spelling, grammar and Standard English before you submit.</p></section>
        <div class="chips wd-tabs" role="tablist">${TABS.map(([k, n]) => `<button type="button" class="chip ${tab === k ? 'sel' : ''}" role="tab" aria-selected="${tab === k}" data-go="${VIEW}" data-tab="${k}">${n}</button>`).join('')}</div><div class="wd-wrap" data-notc>`;
      if (tab === 'dict') h += dictHTML(api, loc);
      else if (tab === 'check') h += checkHTML(api);
      else if (tab === 'bank') h += bankHTML(api);
      else h += aboutHTML();
      return h + '</div>';
    },
    mount(api, loc, stage) {
      const tab = loc.tab || 'dict';
      if (tab === 'dict' && loc.k) { const r = resolve(loc.k); if (r) addRecent(api, r.word); }
      const q = stage.querySelector('#wd-q'), ul = stage.querySelector('#wd-sug');
      if (q && ul) {
        let sel = -1;
        const draw = () => {
          const m = prefixMatches(q.value); sel = -1;
          ul.innerHTML = m.map((w, n) => { const D = db().idx.has(w) ? entry(db().idx.get(w)) : null; return `<li role="option"><button type="button" data-go="${VIEW}" data-tab="dict" data-k="${esc(w)}" id="wd-o${n}"><span>${esc(w)}</span><small>${D ? esc(POSN[D.pos[0]] || '') : 'Comm Studies'}</small></button></li>`; }).join('');
          q.setAttribute('aria-expanded', m.length ? 'true' : 'false');
        };
        q.addEventListener('input', draw);
        q.addEventListener('keydown', e => {
          const items = ul.querySelectorAll('button');
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { if (!items.length) return; e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; items.forEach((b, n) => b.classList.toggle('on', n === sel)); q.setAttribute('aria-activedescendant', 'wd-o' + sel); }
          else if (e.key === 'Enter') { e.preventDefault(); const w = sel >= 0 && items[sel] ? items[sel].dataset.k : q.value.trim(); if (w) api.go({ v: VIEW, tab: 'dict', k: w.slice(0, 60) }); }
          else if (e.key === 'Escape') { ul.innerHTML = ''; }
        });
        if (!loc.k) { try { q.focus({ preventScroll: true }); } catch (e) { } }
      }
      const ta = stage.querySelector('#wd-text');
      if (ta) {
        ta.addEventListener('input', () => { draft = ta.value; saveDraft(); const s = stage.querySelector('#wd-stats'); if (s) s.innerHTML = statsHTML(); });
        const r = stage.querySelector('#wd-rate'); if (r) r.addEventListener('change', () => { rate = parseFloat(r.value) || 1; });
        const l = stage.querySelector('#wd-limit'); if (l) l.addEventListener('change', () => { limit = parseInt(l.value, 10) || 0; const s = stage.querySelector('#wd-stats'); if (s) s.innerHTML = statsHTML(); });
        const f = stage.querySelector('#wd-formal'); if (f) f.addEventListener('change', () => { formalMode = f.checked; if (result) { runCheck(); api.render(); } });
      }
      if (reading && tab !== 'check') stopRead();
    },
    click(action, el, api) {
      const S = S_(api);
      const ta = document.getElementById('wd-text'); if (ta) draft = ta.value;
      switch (action) {
        case 'lookup': { const q = document.getElementById('wd-q'); const v = q && q.value.trim(); if (v) api.go({ v: VIEW, tab: 'dict', k: v.slice(0, 60) }); else api.toast('Type a word first.'); return; }
        case 'say': api.speak(el.dataset.w); return;
        case 'saydef': { const t = document.getElementById('wd-deftext'); if (t) api.speak(t.textContent); return; }
        case 'bank': case 'unbank': {
          const w = el.dataset.w, i = S.words.indexOf(w);
          if (i >= 0) { S.words.splice(i, 1); api.toast(`Removed “${w}” from your word bank`); }
          else if (action === 'bank') { if (S.words.length >= 100) { api.toast('Your word bank is full (100 words). Remove one first.'); return; } S.words.push(w); if (S.words.length % 10 === 0) api.reward(3, `${S.words.length} words banked`); else api.toast(`Saved “${w}” to your word bank`); }
          api.save(); api.render(); return;
        }
        case 'sentcheck': { const t = document.getElementById('wd-sent'); sentFb = sentenceFeedback(api, el.dataset.w, t ? t.value : ''); api.render(); return; }
        case 'check': {
          if (!draft.trim()) { api.toast('Type or paste some writing first.'); return; }
          runCheck(); api.render();
          const n = issuesList().length;
          if (!n && !cleanRewarded) { cleanRewarded = true; api.reward(5, 'Clean draft'); }
          return;
        }
        case 'fix': {
          const it = issuesList()[+el.dataset.i]; if (!it || resultFor == null) return;
          if (resultFor !== draft) { api.toast('Your text changed. Press Check again first.'); return; }
          const rep = el.dataset.r != null ? el.dataset.r : it.fix;
          draft = draft.slice(0, it.start) + rep + draft.slice(it.end); saveDraft();
          runCheck(); api.render();
          if (!issuesList().length && !cleanRewarded) { cleanRewarded = true; api.reward(5, 'Clean draft'); }
          return;
        }
        case 'ignore': { const it = issuesList()[+el.dataset.i]; if (it) ignored.add(it.rule + '|' + it.original.toLowerCase()); api.render(); return; }
        case 'adddict': {
          const it = issuesList()[+el.dataset.i]; if (!it) return;
          const w = it.original.toLowerCase(); if (!S.wordsDict.includes(w)) { S.wordsDict.push(w); if (S.wordsDict.length > 200) S.wordsDict.shift(); api.save(); }
          api.toast(`Added “${it.original}” to your dictionary`); runCheck(); api.render(); return;
        }
        case 'jump': {
          const c = document.getElementById('wd-is-' + el.dataset.i); if (!c) return;
          const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          try { c.scrollIntoView({ behavior: rm ? 'auto' : 'smooth', block: 'center' }); } catch (e) { }
          c.classList.add('flash'); setTimeout(() => c.classList.remove('flash'), 1400);
          const b = c.querySelector('button'); if (b) try { b.focus({ preventScroll: true }); } catch (e) { }
          return;
        }
        case 'read': if (!draft.trim()) { api.toast('Type or paste some writing first.'); return; } readAloud(api, draft); return;
        case 'stopread': stopRead(); api.stopSpeak(); return;
        case 'sample': draft = SAMPLE; saveDraft(); result = null; resultFor = null; api.render(); return;
        case 'clear': draft = ''; saveDraft(); result = null; resultFor = null; ai.items = null; ai.msg = ''; api.render(); return;
        case 'ai': askAI(api); return;
        case 'aifix': {
          const x = ai.items && ai.items[+el.dataset.i]; if (!x) return;
          const k = draft.indexOf(x.original);
          if (k < 0) { api.toast('Could not find that text. It may already be changed.'); return; }
          draft = draft.slice(0, k) + x.suggestion + draft.slice(k + x.original.length); saveDraft();
          const keep = ai.items; x.done = true; runCheck(); ai.items = keep; api.render(); return;
        }
      }
    }
  });
})();
