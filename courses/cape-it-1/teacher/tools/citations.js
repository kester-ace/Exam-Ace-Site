/* Information Technology Unit 1: Cite It Right (APA 7) — adapted from the workshop "Helping Students Cite Sources Correctly" · Developed by Kester Small */
(function () {
  const TABS = [['learn', 'Why and what'], ['apa', 'APA 7'], ['builder', 'Citation builder'], ['practice', 'Practice'], ['checklist', 'Before you submit']];
  const NDASH = '–';
  const LQ = '“', RQ = '”';

  /* ---------------- CSS ---------------- */
  function css() {
    if (document.getElementById('ct-css')) return;
    const st = document.createElement('style'); st.id = 'ct-css';
    st.textContent = `#ct-root{display:flex;flex-direction:column;gap:18px;min-width:0}
#stage #ct-root .ct-paper p,#stage #ct-root .ct-paper li,#stage #ct-root .ct-paper td,#stage #ct-root .ct-paper th,#stage #ct-root .ct-cell,#stage #ct-root .ct-mini,#stage #ct-root .ct-paper{font-family:"Times New Roman",Times,Georgia,serif;line-height:1.65}
#stage #ct-root .ct-paper p{font-size:1rem}
.ct-paper{background:#fffdf6;color:#1b1b1b;border:1px solid #e3d9bd;border-radius:12px;padding:16px 18px;font:16px/1.65 "Times New Roman",Times,Georgia,serif;box-shadow:0 6px 18px -10px rgba(0,0,0,.6);overflow-wrap:anywhere;min-width:0}
.ct-paper i,.ct-paper em{font-style:italic}.ct-paper b{font-weight:700}
.ct-paper .ct-lab{display:block;font:700 .7rem/1.3 var(--f-body,Arial),sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#7a5a06;margin:10px 0 2px}
.ct-paper .ct-lab:first-child{margin-top:0}
.ct-ref{padding-left:2em;text-indent:-2em;margin:0 0 6px}
.ct-ref:last-child{margin-bottom:0}
.ct-hd{text-align:center;margin:0 0 8px}
.ct-ex{margin:0 0 4px}
.ct-paper small{font-size:.86em;color:#333}
.ct-paper .ct-err{background:#ffe1dc}
.ct-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:12px}
.ct-box{border:1px solid var(--line);border-radius:14px;padding:14px;background:var(--raise);display:flex;flex-direction:column;gap:6px;min-width:0}
.ct-box h4{margin:0}.ct-box .ct-ico{font-size:1.5rem;line-height:1}
.ct-warn{border-left:4px solid var(--bad);background:var(--soft-bad);border-radius:10px;padding:10px 14px}
.ct-tbl td,.ct-tbl th{vertical-align:top}
.ct-tbl .ct-cell{font-family:"Times New Roman",Times,Georgia,serif;font-size:1rem}
.ct-stack{display:flex;flex-direction:column;gap:10px}
.ct-authors{display:flex;flex-direction:column;gap:8px}
.ct-arow{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;gap:8px;align-items:end}
.ct-arow .btn{padding:9px 12px}
.ct-x{min-width:44px;min-height:44px}
.ct-check{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px solid var(--line);cursor:pointer}
.ct-check:last-child{border-bottom:0}
.ct-check input{width:22px;height:22px;margin-top:2px;flex:none;accent-color:var(--gold,#f5c542)}
.ct-check input:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.ct-meter{height:10px;border-radius:99px;background:rgba(127,127,127,.25);overflow:hidden}.ct-meter i{display:block;height:100%;background:linear-gradient(90deg,#f5c542,#3fbf7f)}
.ct-score{font-size:1.8rem;font-weight:800;font-variant-numeric:tabular-nums}
.ct-tok{display:inline;border-bottom:2px dashed #b89a4a;border-radius:3px;padding:2px 2px;margin:0 1px;cursor:pointer;line-height:2;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.ct-tok:hover{background:#fff1c7}
.ct-tok:focus-visible{outline:3px solid #1b4fd1;outline-offset:1px}
.ct-tok[aria-pressed="true"].bad{background:#ffd3cc;border-bottom-color:#c0392b;text-decoration:line-through wavy #c0392b}
.ct-tok[aria-pressed="true"].ok{background:#dff3e7;border-bottom-color:#1e8a4c}
.ct-found{display:flex;flex-wrap:wrap;gap:6px}
.ct-found span{border:1px solid var(--line);border-radius:99px;padding:3px 10px;font-size:.85rem;font-weight:700}
.ct-found span.on{background:var(--soft-ok);border-color:var(--ok)}
.ct-opts{display:flex;flex-direction:column;gap:8px}
.ct-opt{display:flex;gap:10px;align-items:flex-start;text-align:left;width:100%;background:var(--surface);border:2px solid var(--line);border-radius:12px;padding:10px 13px;min-height:44px}
.ct-opt:hover{border-color:var(--blue)}
.ct-opt[aria-pressed="true"]{border-color:var(--gold);background:var(--soft-gold)}
.ct-opt.right{border-color:var(--ok);background:var(--soft-ok)}
.ct-opt.wrong{border-color:var(--bad);background:var(--soft-bad)}
.ct-opt .ct-mini{font-family:"Times New Roman",Times,Georgia,serif;font-size:1.02rem}
.ct-q{border:1px solid var(--line);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;background:var(--raise)}
.ct-q p.ct-qp{font-weight:700}
.ct-fig{display:flex;flex-direction:column;gap:4px;max-width:440px}
.ct-fig svg{width:100%;height:auto;display:block;background:#fff;border:1px solid #d6cfb8;border-radius:6px}
.ct-ttbl{border-collapse:collapse;width:100%;font:15px/1.4 "Times New Roman",Times,serif;color:#1b1b1b;min-width:0}
.ct-ttbl th,.ct-ttbl td{border:0;border-bottom:1px solid #555;padding:4px 8px;background:transparent;font-family:inherit}
.ct-ttbl thead th{border-top:1.5px solid #222;border-bottom:1px solid #222;font-weight:700}
.ct-ttbl tbody tr:last-child td{border-bottom:1.5px solid #222}
.ct-ta{min-height:70px}
.ct-res{font-weight:700}
.ct-res.good{color:var(--ok)}.ct-res.bad{color:var(--bad)}.ct-res.note{color:var(--gold)}
.ct-tag{display:inline-block;font:700 .66rem/1 var(--f-body,Arial),sans-serif;letter-spacing:.06em;text-transform:uppercase;border:1px solid #b89a4a;color:#7a5a06;border-radius:99px;padding:3px 7px;margin-right:6px;text-indent:0;vertical-align:2px}
.ct-reflist .ct-ref{display:flex;gap:8px;align-items:flex-start;padding-left:0;text-indent:0}
.ct-reflist .ct-ref > span{flex:1;padding-left:2em;text-indent:-2em;min-width:0}
.ct-reflist .ct-del{flex:none;font:700 .8rem var(--f-body,Arial),sans-serif;background:#f1ead6;color:#5a3d00;border:1px solid #cbb57a;border-radius:8px;min-width:36px;min-height:36px}
.ct-reflist .ct-del:focus-visible{outline:3px solid #1b4fd1;outline-offset:2px}
.ct-credit{text-align:center;font-size:.86rem;color:var(--muted);padding:4px 8px}
.ct-chk{display:flex;gap:8px;align-items:center;font-size:.92rem}
.ct-chk input{width:20px;height:20px;accent-color:var(--gold,#f5c542)}
.ct-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.ct-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:14px}
#ct-root .chips .chip{min-height:40px}
#ct-root .tablewrap table.ct-wide{min-width:560px}
#ct-root .tablewrap table.ct-narrow{min-width:0}
@media (max-width:520px){.ct-arow{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.ct-arow .ct-x{grid-column:1/-1;justify-self:end}.ct-paper{padding:14px 14px;font-size:15.5px}}`;
    document.head.appendChild(st);
  }

  /* ---------------- helpers ---------------- */
  let ESC = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const e = s => ESC(s);
  const I = s => `<i>${e(s)}</i>`;
  const dash = s => String(s || '').trim().replace(/\s*[-‐-―−]+\s*/g, NDASH);
  const ends = s => /[.?!]$/.test(String(s || '').trim());
  const endMark = s => /[?!]$/.test(String(s || '').trim()) ? '' : '.';
  const dot = s => { s = String(s || '').trim(); return ends(s) ? s : s + '.'; };
  const capFirst = w => w ? w.charAt(0).toUpperCase() + w.slice(1) : w;
  const same = (a, b) => String(a || '').trim().toLowerCase().replace(/^the\s+/, '') === String(b || '').trim().toLowerCase().replace(/^the\s+/, '');
  const toText = html => { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; };
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MLA_MON = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

  /* Words MLA keeps lower case in titles (articles, prepositions, coordinating conjunctions) */
  const SMALL = new Set('a an the and but for nor or so yet as at by in of off on per to up via after from into over with about against along among around before behind below beneath beside between beyond during except inside like near onto out outside past since than through toward towards under until upon within without'.split(' '));
  /* Proper nouns the builder keeps capitalised in APA sentence case */
  const PROPER = {};
  ('Caribbean Sint Maarten St. Martin Saint Philipsburg Marigot Anguilla Antigua Barbuda Bahamas Barbados Belize Bermuda Dominica Grenada Guyana Haiti Jamaica Kitts Nevis Lucia Vincent Grenadines Suriname Trinidad Tobago Montserrat Curaçao Curacao Aruba Bonaire Saba Eustatius Cuba Puerto Rico Cayman Turks Caicos Indies America American Americas Europe European Africa African Asia Asian Dutch English French Spanish Papiamentu Creole Netherlands Luis Irma ' +
    'Microsoft Excel PowerPoint Outlook Google YouTube Facebook Instagram TikTok WhatsApp Adobe Canva ' +
    'January February March April June July August September October November December Monday Tuesday Wednesday Thursday Friday Saturday Sunday I').split(' ').forEach(w => { PROPER[w.toLowerCase()] = w; });
  const keepAsIs = w => /[A-Z].*[A-Z]/.test(w) && w !== w.charAt(0) + w.slice(1).toLowerCase() || /\d/.test(w) || /^[A-Z]{2,}s?$/.test(w);
  function caseWord(word, mode, isFirst, isLast) {
    const m = word.match(/^([^A-Za-zÀ-ÿ0-9]*)(.*?)([^A-Za-zÀ-ÿ0-9.]*)$/); if (!m || !m[2]) return word;
    const pre = m[1], core = m[2], post = m[3];
    const parts = core.split('-').map((p, pi) => {
      if (!p) return p;
      if (keepAsIs(p)) return p;
      const low = p.toLowerCase();
      if (PROPER[low]) return PROPER[low];
      if (mode === 'sentence') return (isFirst && pi === 0) ? capFirst(low) : low;
      if (SMALL.has(low) && !(isFirst && pi === 0) && !isLast) return low;
      return capFirst(p.charAt(0) === p.charAt(0).toLowerCase() ? low : p);
    });
    return pre + parts.join('-') + post;
  }
  function recase(title, mode) {
    const words = String(title || '').trim().split(/\s+/).filter(Boolean);
    let afterColon = true;
    return words.map((w, i) => { const r = caseWord(w, mode, afterColon, i === words.length - 1 || /[:?!]$/.test(w)); afterColon = /[:?!]$/.test(w) || /—$/.test(w); return r; }).join(' ');
  }
  const sentenceCase = t => recase(t, 'sentence');
  const titleCase = t => recase(t, 'title');
  const capName = s => String(s || '').trim().split(/\s+/).map(w => w.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('-')).join(' ');
  const initials = f => String(f || '').trim().split(/\s+/).filter(Boolean).map(w => w.split('-').filter(Boolean).map(p => p.charAt(0).toUpperCase() + '.').join('-')).join(' ');

  /* ---------------- formatter ---------------- */
  const TYPES = [['book', 'Book'], ['journal', 'Journal article'], ['website', 'Website / web page'], ['report', 'Organisation report / no author'], ['video', 'Video (YouTube)']];
  const ITALIC_TITLE = { book: 1, report: 1, website: 1, video: 1 }; // APA: titles in italics in the reference (journal article titles are plain)
  const MLA_ITALIC = { book: 1, report: 1 }; // MLA: stand-alone works in italics, parts of containers in quotation marks
  function cleanDraft(d) {
    const A = (d.authors || []).map(a => ({ l: capName(a.l), f: capName(a.f) })).filter(a => a.l);
    return { style: d.style || 'apa', type: d.type || 'book', A, org: String(d.org || '').trim(), year: String(d.year || '').trim(), month: +d.month || 0, day: String(d.day || '').trim(), title: String(d.title || '').trim(), cont: String(d.cont || '').trim(), vol: String(d.vol || '').trim(), iss: String(d.iss || '').trim(), pages: dash(d.pages), pub: String(d.pub || '').trim(), url: String(d.url || '').trim(), loc: String(d.loc || '').trim(), exact: !!d.exact };
  }
  function doiUrl(u, mla) {
    u = String(u || '').trim(); if (!u) return '';
    let m = u.match(/^(?:doi:\s*|https?:\/\/(?:dx\.)?doi\.org\/)?(10\.\d{4,}\/\S+)$/i);
    if (m) return 'https://doi.org/' + m[1];
    if (mla) return u.replace(/^https?:\/\//i, '');
    if (/^www\./i.test(u)) return 'https://' + u;
    return u;
  }
  function apaDate(c) {
    if (!c.year) return 'n.d.';
    if ((c.type === 'website' || c.type === 'video') && c.month) return `${c.year}, ${MONTHS[c.month - 1]}${c.day ? ' ' + (+c.day || c.day) : ''}`;
    return c.year;
  }
  function mlaDate(c) {
    if (!c.year) return '';
    if ((c.type === 'website' || c.type === 'video') && c.month) return `${c.day ? (+c.day || c.day) + ' ' : ''}${MLA_MON[c.month - 1]} ${c.year}`;
    return c.year;
  }
  function apaAuthorList(A) {
    const n = A.map(a => a.f ? `${a.l}, ${initials(a.f)}` : a.l);
    if (n.length === 1) return n[0];
    if (n.length === 2) return `${n[0]}, & ${n[1]}`;
    if (n.length <= 20) return n.slice(0, -1).join(', ') + ', & ' + n[n.length - 1];
    return n.slice(0, 19).join(', ') + ', . . . ' + n[n.length - 1];
  }
  function mlaAuthorList(A) {
    const one = a => a.f ? `${a.l}, ${a.f}` : a.l;
    if (A.length === 1) return one(A[0]);
    if (A.length === 2) return `${one(A[0])}, and ${A[1].f ? A[1].f + ' ' : ''}${A[1].l}`;
    return `${one(A[0])}, et al`;
  }
  function apaTitle(c) { return c.exact ? c.title : sentenceCase(c.title); }
  function mlaTitle(c) { return c.exact ? c.title : titleCase(c.title); }
  function container(c) { return c.cont || (c.type === 'video' ? 'YouTube' : ''); }

  function apaRef(c) {
    const T = apaTitle(c), url = doiUrl(c.url), date = `(${apaDate(c)}).`;
    const tPart = !T ? '' : ITALIC_TITLE[c.type] ? `<i>${e(T)}</i>${c.type === 'video' ? ' [Video]' : ''}${endMark(T)}` : `${e(T)}${endMark(T)}`;
    let who = '';
    if (c.A.length) who = e(dot(apaAuthorList(c.A)));
    else if (c.org) who = e(dot(c.org));
    let h = who ? `${who} ${date}${tPart ? ' ' + tPart : ''}` : `${tPart || ''}${tPart ? ' ' : ''}${date}`;
    const cont = container(c);
    if (c.type === 'journal') {
      if (cont) {
        let s = ` <i>${e(cont)}</i>`;
        if (c.vol) s += `, <i>${e(c.vol)}</i>${c.iss ? `(${e(c.iss)})` : ''}`;
        if (c.pages) s += `, ${e(c.pages)}`;
        h += s + '.';
      }
    } else if (c.type === 'website' || c.type === 'video') {
      if (cont && !(c.type === 'website' && same(cont, c.org))) h += ` ${e(dot(cont))}`;
    } else {
      if (c.pub && !same(c.pub, c.org)) h += ` ${e(dot(c.pub))}`;
    }
    if (url) h += ` ${e(url)}`;
    return h.trim();
  }
  function mlaRef(c) {
    const T = mlaTitle(c), cont = container(c), url = doiUrl(c.url, true), date = mlaDate(c);
    let who = '';
    if (c.A.length) who = e(dot(mlaAuthorList(c.A)));
    else if (c.org && !(same(c.org, c.pub) || same(c.org, cont))) who = e(dot(c.org));
    let t = '';
    if (T) t = MLA_ITALIC[c.type] ? `<i>${e(T)}</i>${endMark(T)}` : `${LQ}${e(T)}${endMark(T)}${RQ}`;
    const bits = [];
    if (c.type === 'book' || c.type === 'report') {
      if (c.pub) bits.push(e(c.pub)); if (date) bits.push(e(date)); if (url) bits.push(e(url));
    } else if (c.type === 'journal') {
      if (cont) bits.push(`<i>${e(cont)}</i>`); if (c.vol) bits.push('vol. ' + e(c.vol)); if (c.iss) bits.push('no. ' + e(c.iss)); if (date) bits.push(e(date));
      if (c.pages) bits.push((/–/.test(c.pages) ? 'pp. ' : 'p. ') + e(c.pages)); if (url) bits.push(e(url));
    } else {
      if (cont) bits.push(`<i>${e(cont)}</i>`);
      if (c.type === 'video') { const up = c.org || (c.A.length ? '' : ''); if (up) bits.push('uploaded by ' + e(up)); }
      if (date) bits.push(e(date)); if (url) bits.push(e(url));
    }
    let h = [who, t].filter(Boolean).join(' ');
    if (bits.length) h += (h ? ' ' : '') + bits.join(', ') + '.';
    if ((c.type === 'website' || c.type === 'video') && !date && (url || cont)) { const d = new Date(); h += ` Accessed ${d.getDate()} ${MLA_MON[d.getMonth()]} ${d.getFullYear()}.`; }
    return h.trim();
  }
  function locator(c, style) {
    let p = String(c.loc || '').trim().replace(/^(pp?\.|paras?\.|par\.)\s*/i, ''); if (!p) return '';
    p = dash(p);
    if (c.type === 'video') return p;
    if (c.type === 'website') return /^\d+$/.test(p) ? (style === 'apa' ? 'para. ' : 'par. ') + p : p;
    if (style === 'mla') return p;
    return (/–/.test(p) ? 'pp. ' : 'p. ') + p;
  }
  function shortTitle(c, style) {
    const T = style === 'apa' ? titleCase(c.title) : (c.exact ? c.title : titleCase(c.title));
    const it = style === 'apa' ? ITALIC_TITLE[c.type] : MLA_ITALIC[c.type];
    return { T, it };
  }
  function inText(c, style) {
    const L = c.A.map(a => a.l), loc = locator(c, style);
    let nameP = '', nameN = '', noAuthor = false;
    if (L.length === 1) nameP = nameN = e(L[0]);
    else if (L.length === 2) { nameP = style === 'apa' ? `${e(L[0])} &amp; ${e(L[1])}` : `${e(L[0])} and ${e(L[1])}`; nameN = `${e(L[0])} and ${e(L[1])}`; }
    else if (L.length > 2) nameP = nameN = `${e(L[0])} et al.`;
    else if (c.org) nameP = nameN = e(c.org);
    else if (c.title) { noAuthor = true; }
    if (style === 'apa') {
      const y = apaDate(c).replace(/,.*$/, '');
      if (noAuthor) {
        const { T, it } = shortTitle(c, 'apa');
        const p = it ? `(<i>${e(T)}</i>, ${y}${loc ? ', ' + e(loc) : ''})` : `(${LQ}${e(T)}${/[?!]$/.test(T) ? '' : ','}${RQ} ${y}${loc ? ', ' + e(loc) : ''})`;
        const n = it ? `<i>${e(T)}</i> (${y})${loc ? ` … (${e(loc)})` : ''}` : `${LQ}${e(T)}${RQ} (${y})${loc ? ` … (${e(loc)})` : ''}`;
        return { p, n };
      }
      if (!nameP) return { p: '', n: '' };
      return { p: `(${nameP}, ${y}${loc ? ', ' + e(loc) : ''})`, n: `${nameN} (${y})${loc ? ` … (${e(loc)})` : ''}` };
    }
    if (noAuthor) {
      const { T, it } = shortTitle(c, 'mla');
      const tt = it ? `<i>${e(T)}</i>` : `${LQ}${e(T)}${RQ}`;
      return { p: `(${tt}${loc ? ' ' + e(loc) : ''})`, n: `In ${tt} …${loc ? ` (${e(loc)})` : ''}.` };
    }
    if (!nameP) return { p: '', n: '' };
    return { p: `(${nameP}${loc ? ' ' + e(loc) : ''})`, n: `${nameN} ${L.length > 1 ? 'state' : 'states'} …${loc ? ` (${e(loc)})` : ''}.` };
  }
  function missing(c) {
    const m = [];
    if (!c.A.length && !c.org && c.type !== 'report') m.push('an author (or leave it blank if there truly is none)');
    if (!c.title) m.push('the title');
    if (!c.year && c.type !== 'website' && c.type !== 'video') m.push('the year');
    if (c.type === 'journal') { if (!c.cont) m.push('the journal name'); if (!c.vol) m.push('the volume'); if (!c.pages) m.push('the page range'); }
    if ((c.type === 'book' || c.type === 'report') && !c.pub && !c.org) m.push('the publisher');
    if ((c.type === 'website' || c.type === 'video') && !c.url) m.push('the URL');
    return m;
  }
  function build(d) { d.style = 'apa'; const c = cleanDraft(d); const ref = c.style === 'mla' ? mlaRef(c) : apaRef(c); return { c, ref, it: inText(c, c.style), miss: missing(c) }; }

  /* ---------------- state ---------------- */
  const BLANK = () => ({ style: 'apa', type: 'book', authors: [{ l: '', f: '' }], org: '', year: '', month: '', day: '', title: '', cont: '', vol: '', iss: '', pages: '', pub: '', url: '', loc: '', exact: false });
  const EXAMPLES = {
    brooks: { type: 'book', authors: [{ l: 'Brooks', f: 'Agatha' }], year: '2024', title: 'Information Technology in the Caribbean Classroom', pub: 'Island Scholars Press' },
    storm: { type: 'book', authors: [{ l: 'Brooks', f: 'Agatha' }], year: '2024', title: 'Storm and Recovery', pub: 'Island Scholars Press', loc: '58' },
    bellamy: { type: 'journal', authors: [{ l: 'Bellamy', f: 'Marcus' }], year: '2022', title: 'Caribbean Coral Reefs in Crisis', cont: 'Journal of Marine Ecology', vol: '12', iss: '3', pages: '45-59' },
    cxc: { type: 'website', authors: [{ l: '', f: '' }], org: 'Caribbean Examinations Council', year: '2024', month: '3', day: '15', title: 'Guidelines for research reports', cont: '', url: 'https://www.cxc.org/' },
    peterson: { type: 'website', authors: [{ l: 'Peterson', f: 'Rochelle' }], year: '2025', month: '6', day: '2', title: 'New Media Lab Opens', cont: 'The Daily Voice', url: 'https://www.thedailyvoice.sx/xxxxx' }
  };
  function store(api) {
    const S = api.S;
    S.cite = S.cite || {};
    const C = S.cite;
    C.draft = Object.assign(BLANK(), C.draft || {}); if (!Array.isArray(C.draft.authors) || !C.draft.authors.length) C.draft.authors = [{ l: '', f: '' }];
    C.a1 = C.a1 || {}; C.a2 = C.a2 || { marks: {} }; C.a2.marks = C.a2.marks || {}; C.cap = C.cap || {}; C.quiz = C.quiz || {}; C.cl = C.cl || {}; C.rw = C.rw || {};
    if (!Array.isArray(S.citeRefs)) S.citeRefs = [];
    return C;
  }
  const sortKey = t => String(t || '').replace(/^[^A-Za-zÀ-ÿ0-9]+/, '').replace(/^(the|a|an)\s+/i, '').toLowerCase();
  const sortRefs = L => L.sort((a, b) => sortKey(a.text).localeCompare(sortKey(b.text)));
  function once(api, key, pts, label) { const C = store(api); if (C.rw[key]) return false; C.rw[key] = 1; api.save(); api.reward(pts, label, { xp: pts }); return true; }

  /* ---------------- shared bits ---------------- */
  function tabsHTML(cur) {
    return `<div class="card"><div class="chips" role="tablist" aria-label="Cite It Right sections">${TABS.map(([k, n]) => `<button type="button" role="tab" id="ct-tab-${k}" class="chip ${cur === k ? 'sel' : ''}" aria-selected="${cur === k}" tabindex="${cur === k ? 0 : -1}" data-go="cite" data-sub="${k}">${n}</button>`).join('')}</div></div>`;
  }
  const paper = (inner, label) => `<div class="ct-paper"${label ? ` role="group" aria-label="${e(label)}"` : ''}>${inner}</div>`;
  const ex = (lab, html, ref) => `<span class="ct-lab">${lab}</span><p class="${ref ? 'ct-ref' : 'ct-ex'}">${html}</p>`;
  const next = (sub, txt) => `<div class="row"><button type="button" class="btn go" data-go="cite" data-sub="${sub}">${txt} →</button></div>`;

  /* ---------------- 1. learn ---------------- */
  function learnHTML(api) {
    let h = `<div class="card"><span class="kicker">What is a citation?</span>
      ${paper(`<p class="ct-ex">${LQ}Citations are a way of giving credit when certain material in your work came from another source${RQ} (${LQ}What Are Citations and Why Should We Use Them?${RQ} 2017, para. 1).</p>`, 'Definition with its own APA citation')}
      <p class="hint">Notice that even this definition is cited. It has no author, so the title stands in for the author name, in quotation marks.</p></div>`;
    h += `<div class="card"><h2>Why citation matters</h2><p>Every time you write an essay, a report or a research paper, you build on other people's ideas. Citation gives those people credit and separates <b>your</b> ideas from borrowed ones.</p>
      <div class="ct-grid">
        <div class="ct-box"><span class="ct-ico" aria-hidden="true">🤝</span><h4>Gives credit</h4><p>Using ideas without credit is plagiarism: a serious offence that can disqualify your work.</p></div>
        <div class="ct-box"><span class="ct-ico" aria-hidden="true">✅</span><h4>Builds credibility</h4><p>Citations show your claims are backed by real evidence, not guesswork.</p></div>
        <div class="ct-box"><span class="ct-ico" aria-hidden="true">🗺️</span><h4>Helps your reader</h4><p>A citation is a map: anyone can follow it back to the original source.</p></div>
        <div class="ct-box"><span class="ct-ico" aria-hidden="true">🛡️</span><h4>Protects you</h4><p>Clearly marked sources prevent accusations of passing off others' work as your own.</p></div>
      </div>
      <div class="ct-warn"><b>Plagiarism is not only copying word for word.</b> Paraphrasing someone's idea without citing them is plagiarism too, so you can plagiarise by accident even when you use your own words. (This is the plagiarism you meet in Module 1: intellectual property and ethics.)</div>
      <div class="row"><button type="button" class="btn ghost" data-go="module" data-m="M1">Open Module 1</button></div></div>`;
    const terms = [['Citation', 'Any acknowledgement of a source, inside your text or in a list at the end.'], ['In-text citation', 'A short marker inside your paragraph where the source was used, e.g. (Brooks, 2024) or Brooks (2024).'], ['Reference list', 'The full alphabetical list of every cited source at the end of the paper. APA calls it "References".'], ['Bibliography', 'A list of everything consulted, even sources not cited. APA does not use one: your References list only the sources you actually cite.'], ['Paraphrase', "The source's idea in your own words and sentence structure. It still requires a citation."], ['Hanging indent', 'Formatting for reference lists: first line at the margin, every following line indented.']];
    h += `<div class="card"><h2>Key terms to note</h2><div class="tablewrap"><table class="ct-tbl ct-narrow"><thead><tr><th scope="col">Term</th><th scope="col">Meaning</th></tr></thead><tbody>${terms.map(t => `<tr><th scope="row">${t[0]}</th><td>${e(t[1])}</td></tr>`).join('')}</tbody></table></div>
      ${paper(`<span class="ct-lab">What a hanging indent looks like</span><p class="ct-ref">Bellamy, M. (2022). Caribbean coral reefs in crisis. <i>Journal of Marine Ecology</i>, <i>12</i>(3), 45${NDASH}59.</p>`, 'Hanging indent example')}
      <p class="hint">In Word: select your list, then press <b>Ctrl + T</b> (or Paragraph › Indentation › Special › Hanging).</p></div>`;
    h += `<div class="card"><h2>One style: APA 7</h2><p>Your IT research and lab reports use <b>APA</b> (American Psychological Association, 7th edition), the style used across the sciences, business, IT and media. APA cares about <b>when</b> a source was published, so every in-text citation gives the author and the year: <b>(Brooks, 2024)</b>.</p>
      <div class="tip"><b>For your IT reports:</b> your References page (and any credits for data, images and statistics you use) uses <b>APA 7</b>. Cite every source and every media asset you did not create yourself, and use APA consistently from start to finish.</div>
      ${next('apa', 'Start with APA 7')}</div>`;
    return h;
  }

  /* ---------------- 2. apa ---------------- */
  function figAPA() {
    return `<div class="ct-fig"><p><b>Figure 1</b></p><p><i>Caribbean Coral Reef Decline, 1970${NDASH}2020</i></p>${reefSVG()}<p><small><i>Note.</i> Adapted from ${LQ}Caribbean Coral Reefs in Crisis,${RQ} by M. Bellamy, 2022, <i>Journal of Marine Ecology</i>, <i>12</i>(3), p. 50.</small></p></div>`;
  }
  function reefSVG() {
    return `<svg viewBox="0 0 320 150" role="img" aria-label="Line graph sketch: reef cover falls steadily from 1970 to 2020"><line x1="40" y1="12" x2="40" y2="118" stroke="#333" stroke-width="1.5"/><line x1="40" y1="118" x2="305" y2="118" stroke="#333" stroke-width="1.5"/><polyline points="45,30 95,40 145,58 195,74 245,88 300,100" fill="none" stroke="#0e5b8a" stroke-width="3"/><g fill="#0e5b8a"><circle cx="45" cy="30" r="3.5"/><circle cx="95" cy="40" r="3.5"/><circle cx="145" cy="58" r="3.5"/><circle cx="195" cy="74" r="3.5"/><circle cx="245" cy="88" r="3.5"/><circle cx="300" cy="100" r="3.5"/></g><text x="45" y="136" font-size="11" text-anchor="middle" fill="#222" font-family="Times New Roman,serif">1970</text><text x="300" y="136" font-size="11" text-anchor="middle" fill="#222" font-family="Times New Roman,serif">2020</text><text x="14" y="70" font-size="11" fill="#222" font-family="Times New Roman,serif" transform="rotate(-90 14 70)" text-anchor="middle">Reef cover</text></svg>`;
  }
  function tableAPA() {
    return `<div class="ct-fig"><p><b>Table 1</b></p><p><i>Social Media Platforms Used by Survey Respondents</i></p><table class="ct-ttbl"><thead><tr><th scope="col">Platform</th><th scope="col">Respondents</th></tr></thead><tbody><tr><td>Instagram</td><td>42</td></tr><tr><td>TikTok</td><td>37</td></tr><tr><td>WhatsApp</td><td>55</td></tr><tr><td>YouTube</td><td>29</td></tr></tbody></table><p><small><i>Note.</i> Data from a class survey of 60 students, 2026.</small></p></div>`;
  }
  function apaHTML() {
    let h = `<div class="card"><span class="kicker">APA Style · 7th edition</span><h2>APA: the style for your IT reports</h2><p>APA is the style for your IT research and lab reports. APA cares about <b>when</b> a source was published, so the year appears in every in-text citation.</p></div>`;
    h += `<div class="card"><h3>In-text citation formats</h3>${paper(ex('Parenthetical', 'IT careers have expanded rapidly since 2020 (Brooks, 2024).') + ex('Narrative', 'Brooks (2024) argues that information technology careers have expanded rapidly.') + ex('Direct quote (add the page)', `${LQ}Content creation is now a viable career path${RQ} (Brooks, 2024, p. 112).`), 'APA in-text examples')}
      <h3>Special cases</h3><div class="tablewrap"><table class="ct-tbl ct-narrow"><tbody>
      <tr><th scope="row">Two authors</th><td class="ct-cell">(Delacroix &amp; James, 2023) <span class="hint">· narrative: Delacroix and James (2023)</span></td></tr>
      <tr><th scope="row">Three or more authors</th><td class="ct-cell">(Richardson et al., 2022)</td></tr>
      <tr><th scope="row">No author</th><td class="ct-cell">(${LQ}Hurricane Preparedness,${RQ} 2023)</td></tr>
      <tr><th scope="row">No date</th><td class="ct-cell">(Ministry of Education, n.d.)</td></tr>
      <tr><th scope="row">Organisation as author</th><td class="ct-cell">(Caribbean Examinations Council, 2024)</td></tr></tbody></table></div>
      <div class="tip">Only the first word of a book or article title is capitalised (plus proper nouns such as <i>Caribbean</i>, and the first word after a colon). If a source has a <b>DOI</b> (Digital Object Identifier: a unique, permanent alphanumeric string), use it instead of an ordinary URL, written as https://doi.org/…</div></div>`;
    h += `<div class="card"><h3>The References page</h3><ul><li>Start it on a new page with the heading <b>References</b>, centred and bold.</li><li>List entries alphabetically by the author's surname.</li><li>Double-space the list and give every entry a hanging indent.</li><li>Every in-text citation must match an entry, and every entry must be cited at least once.</li><li>In the reference list, APA names every author (up to 20). <i>et al.</i> is only for in-text citations of three or more authors.</li></ul>
      ${paper(ex('General pattern', 'Author, A. A. (Year). <i>Title of the work</i>. Publisher. URL', true) + ex('Book', `Brooks, A. (2024). <i>Information technology in the Caribbean classroom</i>. Island Scholars Press.`, true) + ex('Journal article', `Bellamy, M. (2022). Caribbean coral reefs in crisis. <i>Journal of Marine Ecology</i>, <i>12</i>(3), 45${NDASH}59.`, true) + ex('Website (organisation as author)', 'Caribbean Examinations Council. (2024, March 15). <i>Guidelines for research reports</i>. https://www.cxc.org/', true), 'APA reference examples')}
      <details class="fold"><summary>What is in italics in APA?</summary><div><p>Books, reports and web pages: the <b>title</b> is italic. Journal articles: the article title is plain, and the <b>journal name and volume number</b> are italic, e.g. <i>Journal of Marine Ecology</i>, <i>12</i>(3). The issue number in brackets is not italic.</p><p>When the author and the website name are the same (CXC on cxc.org), leave the website name out.</p></div></details>
      <details class="fold"><summary>See a sample References page</summary><div>${paper(`<p class="ct-hd"><b>References</b></p><p class="ct-ref">Bellamy, M. (2022). Caribbean coral reefs in crisis. <i>Journal of Marine Ecology</i>, <i>12</i>(3), 45${NDASH}59.</p><p class="ct-ref">Brooks, A. (2024). <i>Information technology in the Caribbean classroom</i>. Island Scholars Press.</p><p class="ct-ref">Caribbean Examinations Council. (2024, March 15). <i>Guidelines for research reports</i>. https://www.cxc.org/</p>`, 'Sample References page')}</div></details></div>`;
    h += `<div class="card"><h3>Labelling figures and tables in APA</h3><p>In APA, figures and tables are each numbered in the order they appear in your paper (Figure 1, Figure 2… and Table 1, Table 2…, as <b>separate</b> sequences). Always refer to a visual by its number in your text (e.g. "see Figure 1"), never by position like "above" or "below".</p>
      <div class="ct-two"><div class="ct-stack"><h4>Figures</h4><ul><li>The <b>bold</b> label and number go directly <b>above</b> the image: <b>Figure 1</b></li><li>Below the number, add a brief <i>italicised</i> title describing the image.</li><li>Below the image, add a note in smaller text citing the source if it is adapted or reprinted, starting with <i>Note.</i></li></ul></div>${paper(figAPA(), 'APA figure example')}</div>
      <div class="ct-two"><div class="ct-stack"><h4>Tables</h4><ul><li>The bold label and number go directly above the table: <b>Table 1</b></li><li>Below the number, add a brief <i>italicised</i> descriptive title.</li><li>Column headings inside the table use Title Case.</li><li>Below the table, add a note in smaller text for source or explanatory information, in the same <i>Note.</i> format.</li></ul></div>${paper(tableAPA(), 'APA table example')}</div>
      ${next('builder', 'Build your own citations')}</div>`;
    return h;
  }

  const FLD = {
    book: ['year', 'title', 'pub', 'url', 'loc'],
    journal: ['year', 'title', 'cont', 'vol', 'iss', 'pages', 'url', 'loc'],
    website: ['org', 'year', 'month', 'day', 'title', 'cont', 'url', 'loc'],
    report: ['org', 'year', 'title', 'pub', 'url', 'loc'],
    video: ['org', 'year', 'month', 'day', 'title', 'cont', 'url', 'loc']
  };
  function label(k, type) {
    return ({
      org: type === 'video' ? 'Channel name (uploader)' : 'Organisation / group author',
      year: type === 'website' || type === 'video' ? 'Year (leave blank if there is no date)' : 'Year of publication',
      month: 'Month', day: 'Day',
      title: { book: 'Book title', journal: 'Article title', website: 'Page title', report: 'Report title', video: 'Video title' }[type],
      cont: { journal: 'Journal name', website: 'Website name', video: 'Platform' }[type],
      vol: 'Volume', iss: 'Issue (number)', pages: 'Pages of the article (e.g. 45–59)', pub: 'Publisher', url: type === 'journal' || type === 'book' ? 'DOI or URL (optional)' : 'URL',
      loc: type === 'video' ? 'Timestamp of a quote (optional, e.g. 2:15)' : type === 'website' ? 'Paragraph number of a quote (optional)' : 'Page of a quote (optional, for the in-text citation)'
    })[k];
  }
  const PH = { year: 'e.g. 2024', title: 'Type it as it appears on the source', cont: 'e.g. Journal of Marine Ecology', vol: 'e.g. 12', iss: 'e.g. 3', pages: 'e.g. 45–59', pub: 'e.g. Island Scholars Press', url: 'https://…', loc: 'e.g. 58', org: 'e.g. Caribbean Examinations Council', day: 'e.g. 15' };
  function fieldHTML(k, d) {
    const id = 'ct-f-' + k, lab = label(k, d.type);
    if (k === 'month') return `<div class="field"><label for="${id}">${lab}</label><select id="${id}" class="select" data-ctf="month"><option value="">None</option>${MONTHS.map((m, i) => `<option value="${i + 1}" ${+d.month === i + 1 ? 'selected' : ''}>${m}</option>`).join('')}</select></div>`;
    const wide = k === 'title' || k === 'url' || k === 'cont' || k === 'org' || k === 'pub';
    const mode = ['year', 'vol', 'iss', 'day'].includes(k) ? ' inputmode="numeric"' : '';
    return `<div class="field"${wide ? ' style="grid-column:1/-1"' : ''}><label for="${id}">${lab}</label><input id="${id}" class="input" data-ctf="${k}" value="${e(d[k] || '')}" placeholder="${e(k === 'cont' && d.type === 'video' ? 'YouTube' : k === 'cont' && d.type === 'website' ? 'e.g. The Daily Voice' : PH[k] || '')}" autocomplete="off"${mode}${k === 'url' ? ' inputmode="url"' : ''}></div>`;
  }
  function outHTML(api) {
    const C = store(api), B = build(C.draft), st = B.c.style;
    if (!B.c.title && !B.c.A.length && !B.c.org) { B.ref = ''; B.it = { p: '', n: '' }; }
    const listName = st === 'mla' ? 'Works Cited' : 'References';
    let h = `<span class="ct-lab">${listName} entry (${st === 'mla' ? 'MLA 9' : 'APA 7'})</span><p class="ct-ref" id="ct-refout">${B.ref || '<span style="color:#777">Fill in the fields to see your citation.</span>'}</p>`;
    h += `<span class="ct-lab">In-text: parenthetical</span><p class="ct-ex" id="ct-itp">${B.it.p || '—'}</p><span class="ct-lab">In-text: narrative</span><p class="ct-ex" id="ct-itn">${B.it.n || '—'}</p>`;
    return { h, B };
  }
  function notesHTML(B) {
    const c = B.c, n = [];
    if (B.miss.length) n.push(`<li><b>Still needed:</b> ${B.miss.join(', ')}.</li>`);
    if (c.title && !c.exact) n.push(`<li>Title ${c.style === 'apa' ? 'changed to <b>sentence case</b> (APA)' : 'changed to <b>Title Case</b> (MLA)'}. The builder keeps acronyms and common Caribbean names capitalised; if another proper noun lost its capital, tick "Use my capitals exactly" and type it correctly.</li>`);
    if (c.A.length > 2) n.push(c.style === 'apa' ? '<li>Three or more authors: the reference lists every author (up to 20); the in-text citation uses the first surname + et al.</li>' : '<li>Three or more authors: MLA gives the first author, then et al., in both the Works Cited and the in-text citation.</li>');
    if (!c.A.length && !c.org && c.title) n.push('<li>No author: the title moves into the author position. Check the source again first. Most web pages have an author or an organisation.</li>');
    if (c.loc) n.push('<li>The page, paragraph or timestamp goes in the in-text citation only. It is how you cite a direct quote.</li>');
    if ((c.type === 'website' || c.type === 'video') && !c.year && c.style === 'mla') n.push('<li>No date: MLA adds the date you accessed the page.</li>');
    return n.length ? `<ul class="hint">${n.join('')}</ul>` : '';
  }
  function refsListHTML(api) {
    const S = api.S, L = S.citeRefs || [];
    if (!L.length) return `<p class="hint">Your list is empty. Build a citation above, then press <b>Add to my references</b>.</p>`;
    const styles = [...new Set(L.map(r => r.style))];
    const head = styles.length === 1 ? (styles[0] === 'mla' ? '<p class="ct-hd">Works Cited</p>' : '<p class="ct-hd"><b>References</b></p>') : '';
    return (styles.length > 1 ? `<div class="ct-warn"><b>Older entries:</b> some entries were saved in another style. Delete them and rebuild them in APA 7.</div>` : '') +
      paper(`${head}<div class="ct-reflist">${L.map((r, i) => `<p class="ct-ref"><span>${styles.length > 1 ? `<span class="ct-tag">${r.style === 'mla' ? 'MLA' : 'APA'}</span>` : ''}${r.html}</span><button type="button" class="ct-del" data-ct="delref" data-cti="${i}" aria-label="Remove: ${e(r.text.slice(0, 60))}">✕</button></p>`).join('')}</div>`, 'My reference list') +
      `<div class="row"><button type="button" class="btn ghost" data-ct="copylist">Copy whole list</button></div>`;
  }
  function builderHTML(api) {
    const C = store(api), d = C.draft, o = outHTML(api);
    let h = `<div class="card"><span class="kicker">Citation builder</span><h2>Build a citation</h2><p>Choose the kind of source, then type the details exactly as they appear on the source. The builder applies the capital letters, italics and punctuation for you. You still proofread it: citation generators make mistakes too.</p>
      <div class="ct-stack">      <span id="ct-typ-l" class="hint"><b>Source type</b></span><div class="chips" role="radiogroup" aria-labelledby="ct-typ-l">${TYPES.map(([k, n]) => `<button type="button" role="radio" id="ct-typ-${k}" class="chip ${d.type === k ? 'sel' : ''}" aria-checked="${d.type === k}" tabindex="${d.type === k ? 0 : -1}" data-ct="type" data-ctv="${k}">${n}</button>`).join('')}</div>
      <span class="hint">Load one of the examples:</span><div class="chips">${[['brooks', 'Brooks book'], ['storm', 'Storm and Recovery'], ['bellamy', 'Bellamy journal'], ['cxc', 'CXC web page'], ['peterson', 'Daily Voice web page']].map(([k, n]) => `<button type="button" class="chip" data-ct="example" data-ctv="${k}">${n}</button>`).join('')}<button type="button" class="chip" data-ct="clear">Clear</button></div></div></div>`;
    h += `<div class="card"><h3>Source details</h3><fieldset style="border:0;padding:0;margin:0;min-width:0"><legend class="hint" style="margin-bottom:8px"><b>${d.type === 'report' || d.type === 'website' || d.type === 'video' ? 'Person author(s): leave blank if the author is an organisation' : 'Author(s), in the order shown on the source'}</b></legend><div class="ct-authors">${d.authors.map((a, i) => `<div class="ct-arow"><div class="field"><label for="ct-al-${i}">Author ${i + 1} surname</label><input id="ct-al-${i}" class="input" data-cta="${i}" data-ctk="l" value="${e(a.l)}" autocomplete="off" placeholder="e.g. Brooks"></div><div class="field"><label for="ct-af-${i}">First name(s)</label><input id="ct-af-${i}" class="input" data-cta="${i}" data-ctk="f" value="${e(a.f)}" autocomplete="off" placeholder="e.g. Agatha"></div><button type="button" class="btn ghost ct-x" data-ct="delauth" data-cti="${i}" aria-label="Remove author ${i + 1}" ${d.authors.length === 1 ? 'disabled' : ''}>✕</button></div>`).join('')}</div>
      <div class="row" style="margin-top:8px"><button type="button" class="btn ghost" data-ct="addauth">+ Add another author</button></div></fieldset>
      <div class="formgrid">${FLD[d.type].map(k => fieldHTML(k, d)).join('')}</div>
      <label class="ct-chk"><input type="checkbox" data-ctf="exact" ${d.exact ? 'checked' : ''}> Use my capitals exactly (I have already typed the title in sentence case)</label></div>`;
    h += `<div class="card"><h3>Your citation</h3><div aria-live="polite" id="ct-out">${paper(o.h, 'Formatted citation')}</div><div id="ct-notes">${notesHTML(o.B)}</div>
      <div class="row"><button type="button" class="btn go" data-ct="copy">Copy</button><button type="button" class="btn ghost" data-ct="copyit">Copy in-text</button><button type="button" class="btn gold" data-ct="addref">Add to my references</button></div></div>`;
    h += `<div class="card"><h3>My reference list (${(api.S.citeRefs || []).length})</h3><p class="hint">Sorted alphabetically by surname (or by title when there is no author), with hanging indents, ready for your report.</p><div id="ct-list">${refsListHTML(api)}</div></div>`;
    return h;
  }
  function refreshOut(api, root) {
    const o = outHTML(api), out = root.querySelector('#ct-out'), n = root.querySelector('#ct-notes');
    if (out) out.innerHTML = paper(o.h, 'Formatted citation');
    if (n) n.innerHTML = notesHTML(o.B);
  }

  /* ---------------- 6. practice ---------------- */
  const A1 = {
    apait: { lab: 'APA in-text citation', ph: '(Author, Year)' },
    aparef: { lab: 'APA reference list entry', ph: 'Surname, I. (Year). Title. Journal, volume(issue), pages.', key: `Bellamy, M. (2022). Caribbean coral reefs in crisis. Journal of Marine Ecology, 12(3), 45${NDASH}59.` }
  };
  const A2 = {
    apa: { lab: 'Corrected APA reference list entry', key: 'Brooks, A. (2024). Information technology in the Caribbean classroom. Island Scholars Press.' }
  };
  const norm = s => String(s || '').replace(/[“”„‟″]/g, '"').replace(/[‘’‚‛′]/g, "'").replace(/[‐-―−]/g, '-').replace(/\s*-\s*/g, '-').replace(/\s+/g, ' ').replace(/\s+([,.;:)])/g, '$1').replace(/\(\s+/g, '(').replace(/\.\.+$/, '.').trim();
  function diffHint(got, want) {
    const g = norm(got).split(' '), w = norm(want).split(' ');
    for (let i = 0; i < w.length; i++) if (g[i] !== w[i]) return w[i] ? `Look again around "${g[i] != null ? g[i] : '…'}"${g[i] != null && g[i].toLowerCase() === w[i].toLowerCase() ? ' (capital letters)' : ''}.` : '';
    return g.length > w.length ? 'You have extra text at the end.' : '';
  }
  function checkFull(got, want) {
    const a = norm(got), b = norm(want);
    if (!a) return { ok: false, msg: 'Type your answer first.' };
    if (a === b) return { ok: true, msg: 'Correct.' };
    if (a.replace(/\.$/, '') === b.replace(/\.$/, '')) return { ok: true, msg: 'Correct. Remember the final full stop.' };
    if (a.toLowerCase() === b.toLowerCase()) return { ok: false, msg: 'Nearly: the words and punctuation are right, but check your capital letters.' };
    return { ok: false, msg: 'Not yet. ' + diffHint(got, want) };
  }
  function checkApaIt(got) {
    const a = norm(got).replace(/\.$/, '');
    if (!a) return { ok: false, msg: 'Type your answer first.' };
    if (/^Bellamy \(2022\)$/.test(a)) return { ok: true, msg: 'Correct (narrative form).' };
    let m = a.match(/^\(Bellamy, 2022(?:, p\. ?(\d+))?\)$/);
    if (m) { if (!m[1]) return { ok: true, msg: 'Correct. Because this is a direct quote, the best answer also gives the page, e.g. (Bellamy, 2022, p. 45) if the quote is on page 45.' }; const p = +m[1]; return p >= 45 && p <= 59 ? { ok: true, msg: 'Correct, with the page for the direct quote.' } : { ok: false, msg: 'The article runs from page 45 to 59, so the quote must be on one of those pages.' }; }
    if (/^\(Bellamy 2022\)$/.test(a)) return { ok: false, msg: 'APA puts a comma between the name and the year.' };
    if (/Marcus/i.test(a)) return { ok: false, msg: 'In-text citations use the surname only.' };
    if (/^\(Bellamy,? ?\d+\)$/.test(a)) return { ok: false, msg: 'That looks like MLA. APA uses the year: (Author, Year).' };
    return { ok: false, msg: 'Not yet. APA in-text is (Surname, Year).' };
  }
  function checkMlaIt(got) {
    const a = norm(got).replace(/\.$/, '');
    if (!a) return { ok: false, msg: 'Type your answer first.' };
    let m = a.match(/^\(Bellamy (\d+)\)$/);
    if (m) { const p = +m[1]; return p >= 45 && p <= 59 ? { ok: true, msg: `Correct: (Bellamy ${p}) if the quote is on page ${p}.` } : { ok: false, msg: 'The article runs from page 45 to 59, so the quote must be on one of those pages.' }; }
    if (/^\(Bellamy 45-59\)$/.test(a)) return { ok: false, msg: 'Give the one page where the quote appears, not the whole article range.' };
    if (/^\(Bellamy, ?\d+\)$/.test(a)) return { ok: false, msg: 'MLA has no comma between the name and the page.' };
    if (/^\(Bellamy,? pp?\. ?\d+/.test(a)) return { ok: false, msg: 'MLA never uses "p." in the in-text citation.' };
    if (/2022/.test(a)) return { ok: false, msg: 'MLA uses the page, not the year.' };
    if (/^\(Bellamy\)$/.test(a)) return { ok: false, msg: 'This is a direct quote, so add the page number.' };
    return { ok: false, msg: 'Not yet. MLA in-text is (Surname page).' };
  }
  const A1CHK = { apait: checkApaIt, aparef: g => checkFull(g, A1.aparef.key) };
  const TOK = [
    { t: 'brooks, agatha', c: 'author', why: 'Author name not capitalised, and not in the correct reference-list form: APA needs Brooks, A.' },
    { t: ',', c: 'punct', why: 'A comma after the author. The author element ends with a full stop.' },
    { t: 'Information technology in the Caribbean classroom', c: 'title', why: 'Book title not italicised, and not capitalised correctly: APA uses sentence case.' },
    { t: ',', c: 'punct', why: 'Another comma where a full stop belongs after the title.' },
    { t: 'island scholars press', c: 'pub', why: 'Publisher name not capitalised: Island Scholars Press.' },
    { t: '.', c: 'punct', why: 'Punctuation is inconsistent: a full stop then the year. APA ends with the publisher and moves the year to after the author.' },
    { t: '2024', c: 'ok', why: 'The year itself is correct, but APA moves it to (2024). straight after the author.' }
  ];
  const CATS = [['author', 'Author'], ['title', 'Title'], ['pub', 'Publisher'], ['punct', 'Punctuation']];
  const CAP = [
    { id: 'lab', q: 'APA: which label goes directly above the image?', o: ['<b>Figure 1</b>', 'figure 1:', 'Fig. 1.', '<b>Image 1 (above)</b>'], a: 0, why: 'APA: the bold label and number go directly above the image.' },
    { id: 'tit', q: 'APA: which title goes under the label?', o: [`<i>Caribbean Coral Reef Decline, 1970${NDASH}2020</i>`, 'caribbean coral reef decline 1970-2020', '<b>CARIBBEAN CORAL REEF DECLINE</b>'], a: 0, why: 'A brief italicised title in Title Case, with an en dash in the year range.' },
    { id: 'note', q: 'APA: which note goes below the image?', o: [`<small><i>Note.</i> Adapted from ${LQ}Caribbean Coral Reefs in Crisis,${RQ} by M. Bellamy, 2022, <i>Journal of Marine Ecology</i>, <i>12</i>(3), p. 50.</small>`, '<small>Source: Google Images</small>', '<small>Picture taken from the internet.</small>'], a: 0, why: 'The note starts with "Note." and cites the real source. Never cite "Google": cite the page you actually used.' },
    { id: 'ref', q: 'In your paragraph, how do you point to the graph?', o: ['(see Figure 1)', '(see the image above)', '(see picture)'], a: 0, why: 'Refer to visuals by number, never by position like "above" or "below".' },
    { id: 'seq', q: 'APA: a paper has one chart and one table. How are they labelled?', o: ['Figure 1 and Table 1', 'Figure 1 and Figure 2', 'Fig. 1 and Tab. 1'], a: 0, why: 'APA numbers figures and tables in two separate sequences, written in full: Figure 1, Table 1.' }
  ];
  const QUIZ = [
    { q: 'Which is a correct APA 7 parenthetical citation?', o: ['(Brooks, 2024)', '(Brooks 47)', '(Agatha Brooks, 2024)'], a: 0, why: 'APA in-text citations give the surname and the year, separated by a comma.' },
    { q: 'You quote Brooks directly from page 112. Which APA citation is correct?', o: ['(Brooks, 2024, p. 112)', '(Brooks, p. 112)', '(Brooks 2024 112)'], a: 0, why: 'A direct quote adds the page: (Author, Year, p. #).' },
    { q: 'A source has three authors: Richardson, Daniel and Hodge (2022). What is the APA in-text citation?', o: ['(Richardson et al., 2022)', '(Richardson, Daniel and Hodge, 2022)', '(Richardson & others, 2022)'], a: 0, why: 'APA 7 uses the first surname + et al. for three or more authors.' },
    { q: 'Your IT research report: which citation style?', o: ['APA 7', 'Any style, as long as it looks neat', 'No citations are needed in a report'], a: 0, why: 'IT research reports in this course use APA 7.' },
    { q: `What is wrong with this APA entry? <span class="ct-mini">Brooks, A. (2024). <i>Information Technology In The Caribbean Classroom</i>. Island Scholars Press.</span>`, o: ['The title should be in sentence case', 'The year should be at the end', 'The publisher should be in italics'], a: 0, why: 'APA capitalises only the first word (and proper nouns like Caribbean): Information technology in the Caribbean classroom.' },
    { q: 'What is wrong with this APA in-text citation? <span class="ct-mini">(Richardson, Keisha, et al., 2022)</span>', o: ['Nothing: it is correct', 'In-text citations use the surname only: (Richardson et al., 2022)', 'It needs the page range'], a: 1, why: 'First names never appear in an in-text citation.' },
    { q: 'A web page has no date. What goes in the APA citation?', o: ['(Ministry of Education, n.d.)', '(Ministry of Education)', '(Ministry of Education, 2026) using the year you read it'], a: 0, why: 'APA uses n.d. (no date) when a source has no publication date.' },
    { q: 'In-text citation or reference-list entry? <span class="ct-mini">Bellamy (2022) found that reefs have declined.</span>', o: ['A narrative in-text citation', 'A reference-list entry', 'A footnote'], a: 0, why: 'The name is part of your sentence, with the year in brackets.' },
    { q: 'In-text citation or reference-list entry? <span class="ct-mini">Caribbean Examinations Council. (2024, March 15). <i>Guidelines for research reports</i>. https://www.cxc.org/</span>', o: ['An in-text citation', 'An APA reference-list entry', 'A caption'], a: 1, why: 'Full details with (Year, Month Day): an APA References entry.' },
    { q: 'You put Brooks’s idea completely in your own words. Do you still need a citation?', o: ['No, because the words are mine', 'Yes: a paraphrase still needs a citation', 'Only if I copy more than one sentence'], a: 1, why: 'Paraphrasing an idea without citing it is plagiarism, even in your own words.' }
  ];
  function a1HTML(api) {
    const C = store(api), A = C.a1, res = A.res || {};
    let h = `<div class="card" id="ct-a1"><span class="kicker">Practice activity 1</span><h2>Cite this journal excerpt</h2><p>Read the excerpt and the source details, then write the correct APA 7 in-text citation and reference list entry.</p>
      ${paper(`<p class="ct-ex">${LQ}Caribbean coral reefs have declined by nearly 50 percent since the 1970s, driven primarily by rising sea temperatures and coastal pollution.${RQ}</p>`, 'Excerpt')}
      <div class="tablewrap"><table class="ct-tbl ct-narrow"><tbody><tr><th scope="row">Author</th><td>Marcus Bellamy</td></tr><tr><th scope="row">Article title</th><td>Caribbean Coral Reefs in Crisis</td></tr><tr><th scope="row">Journal</th><td>Journal of Marine Ecology</td></tr><tr><th scope="row">Volume / issue</th><td>vol. 12, no. 3</td></tr><tr><th scope="row">Year</th><td>2022</td></tr><tr><th scope="row">Pages</th><td>45${NDASH}59</td></tr></tbody></table></div>
      <p class="hint">You cannot type italics here, so we check the words, capitals and punctuation. Hyphens and en dashes both count in page ranges, and straight or curly quotation marks are both fine.</p>`;
    h += Object.entries(A1).map(([k, v]) => { const r = res[k]; return `<div class="field"><label for="ct-a1-${k}">${v.lab}</label><textarea id="ct-a1-${k}" class="ta ct-ta" rows="2" data-cta1="${k}" placeholder="${e(v.ph)}" spellcheck="false" aria-describedby="ct-a1r-${k}">${e(A[k] || '')}</textarea><p id="ct-a1r-${k}" class="ct-res ${r ? (r.ok ? 'good' : 'bad') : ''}" aria-live="polite">${r ? (r.ok ? '✓ ' : '✗ ') + e(r.msg) : ''}</p></div>`; }).join('');
    h += `<div class="row"><button type="button" class="btn go" data-ct="a1check">Check my answers</button>${A.tried ? '<button type="button" class="btn ghost" data-ct="a1reset">Try again</button>' : ''}</div>`;
    if (A.tried) h += `<details class="fold" open><summary>The answer key</summary><div>${paper(ex('APA in-text', '(Bellamy, 2022) <span style="color:#555">· narrative:</span> Bellamy (2022) <span style="color:#555">· with the page of a direct quote:</span> (Bellamy, 2022, p. 45)') + ex('APA reference', `Bellamy, M. (2022). Caribbean coral reefs in crisis. <i>Journal of Marine Ecology</i>, <i>12</i>(3), 45${NDASH}59.`, true), 'Answer key for activity 1')}</div></details>`;
    return h + '</div>';
  }
  function a2HTML(api) {
    const C = store(api), A = C.a2, mk = A.marks, found = new Set(TOK.filter((t, i) => mk[i] && t.c !== 'ok').map(t => t.c)), res = A.res || {};
    let h = `<div class="card" id="ct-a2"><span class="kicker">Practice activity 2</span><h2>Spot and fix the errors</h2><p>This citation contains several common mistakes. <b>Step 1:</b> tap each part you think is wrong. <b>Step 2:</b> rewrite the entry correctly in APA 7.</p>
      <div class="tablewrap"><table class="ct-tbl ct-narrow"><tbody><tr><th scope="row">Author</th><td>Agatha Brooks</td></tr><tr><th scope="row">Book title</th><td>Information Technology in the Caribbean Classroom</td></tr><tr><th scope="row">Publisher</th><td>Island Scholars Press</td></tr><tr><th scope="row">Year</th><td>2024</td></tr></tbody></table></div>
      ${paper(`<span class="ct-lab">The flawed citation: tap the error spots</span><p class="ct-ex" role="group" aria-label="Flawed citation, each part is a button">${TOK.map((t, i) => `<span role="button" tabindex="0" class="ct-tok ${mk[i] ? (t.c === 'ok' ? 'ok' : 'bad') : ''}" data-ct="tok" data-cti="${i}" aria-pressed="${!!mk[i]}" aria-label="${e(t.t === ',' ? 'comma' : t.t === '.' ? 'full stop' : t.t)}">${e(t.t)}</span>${i === 1 || i === 3 || i === 5 ? ' ' : ''}`).join('')}</p>`, 'Spot the errors')}
      <div class="ct-found" aria-label="Error types found">${CATS.map(([k, n]) => `<span class="${found.has(k) ? 'on' : ''}">${found.has(k) ? '✓' : '○'} ${n}</span>`).join('')}</div>
      <div aria-live="polite">${TOK.map((t, i) => mk[i] ? `<p class="${t.c === 'ok' ? 'hint' : ''}">${t.c === 'ok' ? 'ℹ️' : '✗'} <b>${e(t.t === ',' ? 'comma' : t.t === '.' ? 'full stop' : t.t)}:</b> ${e(t.why)}</p>` : '').join('')}</div>
      <p class="hint">${found.size >= 3 ? `You found ${found.size} of 4 kinds of error. ${found.size < 4 ? 'One more kind is hiding.' : 'All found!'}` : 'Find at least three kinds of error.'}</p>`;
    h += Object.entries(A2).map(([k, v]) => { const r = res[k]; return `<div class="field"><label for="ct-a2-${k}">${v.lab}</label><textarea id="ct-a2-${k}" class="ta ct-ta" rows="2" data-cta2="${k}" spellcheck="false" aria-describedby="ct-a2r-${k}">${e(A[k] || '')}</textarea><p id="ct-a2r-${k}" class="ct-res ${r ? (r.ok ? 'good' : 'bad') : ''}" aria-live="polite">${r ? (r.ok ? '✓ ' : '✗ ') + e(r.msg) : ''}</p></div>`; }).join('');
    h += `<div class="row"><button type="button" class="btn go" data-ct="a2check">Check my corrections</button>${A.tried ? '<button type="button" class="btn ghost" data-ct="a2reset">Try again</button>' : ''}</div>`;
    if (A.tried) h += `<details class="fold" open><summary>The answer key</summary><div><ol><li>Author name not capitalised and in the wrong form for a reference list.</li><li>Book title not italicised and not capitalised correctly for the style.</li><li>Publisher name not capitalised.</li><li>Punctuation is inconsistent (mixes commas and a full stop incorrectly).</li></ol>${paper(ex('APA reference', 'Brooks, A. (2024). <i>Information technology in the Caribbean classroom</i>. Island Scholars Press.', true) , 'Answer key for activity 2')}<p class="hint">Remember: APA uses sentence case for titles: capitalise only the first word and proper nouns.</p></div></details>`;
    return h + '</div>';
  }
  function capHTML(api) {
    const C = store(api), P = C.cap, chk = !!P.checked;
    const pick = (id, def) => { const q = CAP.find(x => x.id === id); return P[id] != null ? q.o[P[id]] : def; };
    const prev = `<div class="ct-fig"><p>${pick('lab', '<span style="color:#888">[label]</span>')}</p><p>${pick('tit', '<span style="color:#888">[title]</span>')}</p>${reefSVG()}<p>${pick('note', '<span style="color:#888">[note]</span>')}</p></div><p class="ct-ex" style="margin-top:8px">As the graph shows, reef cover has fallen sharply ${pick('ref', '<span style="color:#888">[reference to the graph]</span>')}.</p>`;
    let h = `<div class="card" id="ct-cap"><span class="kicker">Practice activity 3</span><h2>Fix the caption</h2><p>Your research report has a graph adapted from Bellamy's article. Choose the correct pieces to label it in APA, then answer one more APA question. Watch the preview build as you choose.</p>
      <div class="ct-two">${paper(prev, 'Live preview of your APA figure')}<div class="ct-stack">`;
    h += CAP.map((q, qi) => `<div class="ct-q" role="group" aria-labelledby="ct-capq-${q.id}"><p class="ct-qp" id="ct-capq-${q.id}">${qi + 1}. ${q.q}</p><div class="ct-opts">${q.o.map((o, oi) => { const sel = P[q.id] === oi; const cls = chk && sel ? (oi === q.a ? 'right' : 'wrong') : ''; return `<button type="button" class="ct-opt ${cls}" aria-pressed="${sel}" data-ct="cap" data-ctv="${q.id}" data-cti="${oi}"><span class="ct-mini">${o}</span></button>`; }).join('')}</div>${chk && P[q.id] != null ? `<p class="ct-res ${P[q.id] === q.a ? 'good' : 'bad'}">${P[q.id] === q.a ? '✓' : '✗'} ${q.why}</p>` : ''}</div>`).join('');
    const right = CAP.filter(q => P[q.id] === q.a).length;
    h += `</div></div><div class="row"><button type="button" class="btn go" data-ct="capcheck">Check my caption</button>${chk ? `<span class="ct-res ${right === CAP.length ? 'good' : 'note'}" aria-live="polite">${right} of ${CAP.length} correct</span>` : ''}</div></div>`;
    return h;
  }
  function quizHTML(api) {
    const C = store(api), Q = C.quiz, done = QUIZ.filter((q, i) => Q[i] != null).length, right = QUIZ.filter((q, i) => Q[i] === q.a).length;
    let h = `<div class="card" id="ct-quiz"><span class="kicker">Quick quiz · 10 questions</span><h2>Which style? What's wrong? In-text or reference?</h2><p class="ct-res note" aria-live="polite">${done} answered · ${right} correct</p>`;
    h += QUIZ.map((q, i) => `<div class="ct-q" role="group" aria-labelledby="ct-qq-${i}"><p class="ct-qp" id="ct-qq-${i}">${i + 1}. ${q.q}</p><div class="ct-opts">${q.o.map((o, oi) => { const ans = Q[i] != null, sel = Q[i] === oi; const cls = ans ? (oi === q.a ? 'right' : sel ? 'wrong' : '') : ''; return `<button type="button" class="ct-opt ${cls}" aria-pressed="${sel}" ${ans ? 'aria-disabled="true"' : ''} data-ct="quiz" data-cti="${i}" data-ctv="${oi}">${e(o)}${ans && oi === q.a ? ' <span class="ct-sr">(correct answer)</span>' : ''}</button>`; }).join('')}</div>${Q[i] != null ? `<p class="ct-res ${Q[i] === q.a ? 'good' : 'bad'}">${Q[i] === q.a ? '✓ Correct.' : '✗ Not quite.'} ${q.why}</p>` : ''}</div>`).join('');
    if (done === QUIZ.length) h += `<div class="fb ${right >= 8 ? 'good' : 'note'}"><b>You scored ${right} / ${QUIZ.length}.</b> ${right >= 8 ? 'Excellent citing!' : 'Review the APA 7 tab, then try again.'}</div><div class="row"><button type="button" class="btn ghost" data-ct="quizreset">Try the quiz again</button></div>`;
    return h + '</div>';
  }
  function practiceHTML(api) {
    return `<div class="card"><span class="kicker">Practice</span><h2>Put it into practice</h2><p>Four activities: two from the workshop, a caption fixer and a quick quiz. Coins are awarded the first time you get each one right.</p><div class="chips"><a class="chip" href="#ct-a1">1. Cite the excerpt</a><a class="chip" href="#ct-a2">2. Spot and fix</a><a class="chip" href="#ct-cap">3. Fix the caption</a><a class="chip" href="#ct-quiz">4. Quick quiz</a></div></div>` + a1HTML(api) + a2HTML(api) + capHTML(api) + quizHTML(api);
  }

  /* ---------------- 7. checklist ---------------- */
  const CL = ['One citation style used consistently throughout.', 'Every quote, paraphrase and summary has an in-text citation.', 'Direct quotations include a page number or timestamp.', 'Reference list starts on a new page with the correct heading.', "Entries are alphabetised by the author's surname.", 'Each entry has a hanging indent.', 'Every in-text citation matches an entry in the list, and vice versa.', "Titles are italicised or quoted per the style's rules.", 'URLs and DOIs are complete and working.', 'Citation generator output proofread against official style rules.'];
  const MISTAKES = [['Citing only direct quotes', 'Cite paraphrases and summaries too. If the idea is not yours, it needs a citation.'], ['Mixing styles', "Use APA 7 for every in-text citation and every reference. Do not copy entries in other styles from websites."], ['Mismatched in-text and list entries', 'Every in-text citation must match an entry in the list, and every entry must be cited at least once.'], ['Missing page numbers on direct quotes', 'APA expects a page (or paragraph number or timestamp) for quotations.'], ['Trusting citation generators blindly', 'These tools make mistakes with capitalisation, italics and dates. Always proofread against the style rules.'], ['Citing "Google" instead of the actual source', 'Cite the page, article or video you actually used.'], ['Forgetting the hanging indent', 'Easy marks lost in research reports.'], ['Alphabetising by first name instead of surname', "Sort by the author's surname."], ['Italicising the wrong things', 'Big containers like books and journals are italicised; small pieces like articles and chapters go in quotation marks.'], ['Waiting until the end to build the list', 'Record full source details while you research. The citation builder can keep your list as you go.']];
  function checklistHTML(api) {
    const C = store(api), n = CL.filter((x, i) => C.cl[i]).length;
    let h = `<div class="card"><span class="kicker">Before you submit</span><h2>Final submission checklist</h2><p>Tick each point when it is true of your finished report.</p><div class="ct-score" aria-live="polite">${n} / ${CL.length}</div><div class="ct-meter" role="progressbar" aria-label="Checklist progress" aria-valuemin="0" aria-valuemax="${CL.length}" aria-valuenow="${n}"><i style="width:${n / CL.length * 100}%"></i></div>
      <div>${CL.map((t, i) => `<label class="ct-check"><input type="checkbox" data-ctcl="${i}" ${C.cl[i] ? 'checked' : ''}><span>${e(t)}</span></label>`).join('')}</div>
      ${n === CL.length ? '<div class="fb good"><b>Ready to submit.</b> Your citations are ready to hand in.</div>' : ''}</div>`;
    h += `<div class="card"><h2>Ten common mistakes to avoid</h2><ol class="ct-stack" style="display:flex">${MISTAKES.map(m => `<li><b>${e(m[0])}:</b> ${e(m[1])}</li>`).join('')}</ol><div class="row"><button type="button" class="btn ghost" data-go="cite" data-sub="builder">Open the citation builder</button></div></div>`;
    return h;
  }

  /* ---------------- render ---------------- */
  function render(api, loc) {
    css(); ESC = api.esc || ESC; store(api);
    const sub = TABS.some(t => t[0] === loc.sub) ? loc.sub : 'learn';
    let h = `<div id="ct-root"><div class="hero"><span class="eyebrow">Information Technology Unit 1 · Research skills</span><h1>Cite It Right</h1><p>Give credit, build credibility and protect yourself from plagiarism. Learn APA 7, the style for your IT reports, then build your own reference list.</p>
      <div class="row"><button type="button" class="btn gold" data-go="cite" data-sub="builder">Open the citation builder</button><button type="button" class="btn ghost" data-go="cite" data-sub="practice">Practise</button></div></div>`;
    h += tabsHTML(sub);
    h += `<div role="tabpanel" aria-labelledby="ct-tab-${sub}" style="display:flex;flex-direction:column;gap:18px;min-width:0">`;
    h += ({ learn: learnHTML, apa: apaHTML, builder: builderHTML, practice: practiceHTML, checklist: checklistHTML })[sub](api);
    h += `</div><p class="ct-credit">Adapted from the workshop 'Helping Students Cite Sources Correctly' · Kester Small</p></div>`;
    return h;
  }

  /* ---------------- events ---------------- */
  function rerender(api, focusSel) {
    const y = window.scrollY;
    api.render();
    try { window.scrollTo(0, y); } catch (er) { }
    if (focusSel) { const el = document.querySelector(focusSel); if (el) try { el.focus({ preventScroll: true }); } catch (er) { el.focus(); } }
  }
  async function copyRich(api, html, text, msg) {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([`<span style="font-family:'Times New Roman';font-size:12pt">${html}</span>`], { type: 'text/html' }), 'text/plain': new Blob([text], { type: 'text/plain' }) })]);
        api.toast(msg); return;
      }
    } catch (er) { }
    try { if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); api.toast(msg); return; } } catch (er) { }
    try { const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;left:-9999px;top:0'; document.body.appendChild(t); t.select(); const ok = document.execCommand('copy'); t.remove(); api.toast(ok ? msg : 'Copy is blocked here: select the text and press Ctrl + C.'); } catch (er) { api.toast('Copy is blocked here: select the text and press Ctrl + C.'); }
  }
  function onClick(api, ev, root) {
    const b = ev.target.closest('[data-ct]'); if (!b || !root.contains(b)) return;
    const C = store(api), S = api.S, act = b.dataset.ct, v = b.dataset.ctv, i = +b.dataset.cti;
    if (act === 'style' || act === 'type') { C.draft[act] = v; api.save(); rerender(api, `#ct-${act === 'style' ? 'sty' : 'typ'}-${v}`); return; }
    if (act === 'example') { const x = EXAMPLES[v]; C.draft = Object.assign(BLANK(), { style: C.draft.style }, JSON.parse(JSON.stringify(x))); api.save(); rerender(api, '#ct-out'); api.toast('Example loaded: check the result against the APA 7 tab'); return; }
    if (act === 'clear') { C.draft = Object.assign(BLANK(), { style: C.draft.style, type: C.draft.type }); api.save(); rerender(api, '#ct-al-0'); return; }
    if (act === 'addauth') { C.draft.authors.push({ l: '', f: '' }); api.save(); rerender(api, `#ct-al-${C.draft.authors.length - 1}`); return; }
    if (act === 'delauth') { if (C.draft.authors.length > 1) C.draft.authors.splice(i, 1); api.save(); rerender(api, `#ct-al-${Math.max(0, i - 1)}`); return; }
    if (act === 'copy' || act === 'copyit') {
      const B = build(C.draft); const html = act === 'copy' ? B.ref : B.it.p;
      if (!html || !B.c.title) { api.toast('Fill in the source details first.'); return; }
      copyRich(api, html, toText(html), act === 'copy' ? 'Citation copied' : 'In-text citation copied'); return;
    }
    if (act === 'addref') {
      const B = build(C.draft); if (!B.c.title) { api.toast('Add at least a title first.'); return; }
      const text = toText(B.ref);
      if (S.citeRefs.some(r => r.text === text)) { api.toast('That reference is already in your list.'); return; }
      S.citeRefs.push({ style: B.c.style, type: B.c.type, html: B.ref, text }); sortRefs(S.citeRefs); api.save();
      api.toast(B.miss.length ? 'Added. Some details are still missing: check the entry.' : 'Added to your references'); rerender(api, '[data-ct="addref"]'); return;
    }
    if (act === 'delref') { S.citeRefs.splice(i, 1); api.save(); api.toast('Reference removed'); rerender(api, '#ct-list'); return; }
    if (act === 'copylist') { sortRefs(S.citeRefs); copyRich(api, S.citeRefs.map(r => `<p style="margin-left:.5in;text-indent:-.5in">${r.html}</p>`).join(''), S.citeRefs.map(r => r.text).join('\n'), 'Reference list copied'); return; }
    if (act === 'a1check') {
      C.a1.res = {}; Object.keys(A1).forEach(k => { C.a1.res[k] = A1CHK[k](C.a1[k]); }); C.a1.tried = 1; api.save();
      const all = Object.values(C.a1.res).every(r => r.ok);
      rerender(api, '[data-ct="a1check"]'); if (all) once(api, 'a1', 20, 'Activity 1 complete'); return;
    }
    if (act === 'a1reset') { C.a1 = {}; api.save(); rerender(api, '#ct-a1-apait'); return; }
    if (act === 'tok') { C.a2.marks[i] = C.a2.marks[i] ? 0 : 1; api.save(); rerender(api, `[data-ct="tok"][data-cti="${i}"]`); return; }
    if (act === 'a2check') {
      C.a2.res = { apa: checkFull(C.a2.apa, A2.apa.key) }; C.a2.tried = 1; api.save();
      const found = new Set(TOK.filter((t, j) => C.a2.marks[j] && t.c !== 'ok').map(t => t.c)).size;
      rerender(api, '[data-ct="a2check"]');
      if (C.a2.res.apa.ok) { if (found >= 3) once(api, 'a2', 20, 'Activity 2 complete'); else api.toast('Corrections right! Now tap at least three kinds of error in Step 1.'); }
      return;
    }
    if (act === 'a2reset') { C.a2 = { marks: {} }; api.save(); rerender(api, '[data-ct="tok"][data-cti="0"]'); return; }
    if (act === 'cap') { C.cap[v] = i; C.cap.checked = 0; api.save(); rerender(api, `[data-ct="cap"][data-ctv="${v}"][data-cti="${i}"]`); return; }
    if (act === 'capcheck') {
      if (CAP.some(q => C.cap[q.id] == null)) { api.toast('Answer all five parts first.'); return; }
      C.cap.checked = 1; api.save(); rerender(api, '[data-ct="capcheck"]');
      if (CAP.every(q => C.cap[q.id] === q.a)) once(api, 'cap', 10, 'Caption fixed'); return;
    }
    if (act === 'quiz') {
      if (C.quiz[i] != null) return;
      C.quiz[i] = +v; api.save(); rerender(api, `[data-ct="quiz"][data-cti="${i}"][data-ctv="${v}"]`);
      const done = QUIZ.every((q, j) => C.quiz[j] != null), right = QUIZ.filter((q, j) => C.quiz[j] === q.a).length;
      if (done && right >= 8) once(api, 'quiz', 15, 'Citation quiz passed'); return;
    }
    if (act === 'quizreset') { C.quiz = {}; api.save(); rerender(api, '[data-ct="quiz"][data-cti="0"][data-ctv="0"]'); return; }
  }
  function onInput(api, ev, root) {
    const t = ev.target, C = store(api);
    if (t.dataset.ctf) { C.draft[t.dataset.ctf] = t.type === 'checkbox' ? t.checked : t.value; api.save(); refreshOut(api, root); return; }
    if (t.dataset.cta != null) { const a = C.draft.authors[+t.dataset.cta]; if (a) { a[t.dataset.ctk] = t.value; api.save(); refreshOut(api, root); } return; }
    if (t.dataset.cta1) { C.a1[t.dataset.cta1] = t.value; api.save(); return; }
    if (t.dataset.cta2) { C.a2[t.dataset.cta2] = t.value; api.save(); return; }
  }
  function onChange(api, ev, root) {
    const t = ev.target, C = store(api);
    if (t.dataset.ctcl != null) { C.cl[t.dataset.ctcl] = t.checked ? 1 : 0; api.save(); const all = CL.every((x, i) => C.cl[i]); rerender(api, `[data-ctcl="${t.dataset.ctcl}"]`); if (all) once(api, 'cl', 5, 'Citation checklist complete'); return; }
    if (t.dataset.ctf === 'exact') { C.draft.exact = t.checked; api.save(); refreshOut(api, root); return; }
    if (t.dataset.ctf === 'month') { C.draft.month = t.value; api.save(); refreshOut(api, root); }
  }
  function onKey(api, ev, root) {
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches && ev.target.matches('span[role="button"][data-ct]')) { ev.preventDefault(); ev.target.click(); return; }
    const list = ev.target.closest('[role="tablist"],[role="radiogroup"]'); if (!list || !root.contains(list)) return;
    const items = [...list.querySelectorAll('[role="tab"],[role="radio"]')], idx = items.indexOf(ev.target); if (idx < 0) return;
    let n = -1;
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') n = (idx + 1) % items.length;
    else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') n = (idx - 1 + items.length) % items.length;
    else if (ev.key === 'Home') n = 0; else if (ev.key === 'End') n = items.length - 1;
    if (n < 0) return; ev.preventDefault();
    if (list.getAttribute('role') === 'radiogroup') items[n].click(); else items[n].focus();
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'cite', title: 'Cite It Right',
    tile: { icon: '📚', meta: 'APA 7 citations for your research and lab reports, with a builder and practice' },
    render(api, loc) { return render(api, loc || {}); },
    mount(api, loc, stageEl) {
      const root = stageEl && stageEl.querySelector('#ct-root'); if (!root) return;
      root.addEventListener('click', ev => onClick(api, ev, root));
      root.addEventListener('input', ev => onInput(api, ev, root));
      root.addEventListener('change', ev => onChange(api, ev, root));
      root.addEventListener('keydown', ev => onKey(api, ev, root));
      root.querySelectorAll('a.chip[href^="#ct-"]').forEach(a => a.addEventListener('click', ev => { const t = root.querySelector(a.getAttribute('href')); if (t) { ev.preventDefault(); t.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); } }));
    }
  });
  /* exposed for testing */
  window.COURSE_CITE = { build, sentenceCase, titleCase };
})();
