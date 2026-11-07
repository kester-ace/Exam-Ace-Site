/* EDPM: Practical Labs + Portfolio Studio (SBA) — Developed by Kester Small */
(function () {
  const APPS = { word: ['Word Processing', '📝'], access: ['Database Management', '🗄️'], ppt: ['PowerPoint', '📽️'], pub: ['Publisher', '📰'] };
  const SECN = { S1: 'Section I · Fundamentals of Computing', S2: 'Section II · Keyboard Mastery', S3: 'Section III · Introduction to Application Software', S4: 'Section IV · Use of Application Software', S5: 'Section V · Business Document Preparation', S6: 'Section VI · Specialised Document Preparation', S7: 'Section VII · Electronic Communication', S8: 'Section VIII · Document Management', S9: 'Section IX · Ethics' };
  const ROMAN = { S1: 'I', S2: 'II', S3: 'III', S4: 'IV', S5: 'V', S6: 'VI', S7: 'VII', S8: 'VIII', S9: 'IX' };
  const PNAME = { KC: 'Knowledge & Comprehension', APP: 'Application', IA: 'Interpretation & Analysis' };

  /* Official portfolio elements, CXC 34/G/SYLL 24 pp. 43–69 (mark allocation for portfolio, 85 marks) */
  const ELEMENTS = [
    { id: 'ruled', n: 1, name: 'Tabular work: Ruled tabulation', sw: 'Spreadsheet software', a: [1, 3, 0],
      req: 'Prepare a ruled tabulation with a main heading and multiple columnar headings, applying oblique or vertical headings, with sorting of data.',
      scheme: [['Present slanted headings', 1], ['Present harmonious colour scheme', 1], ['Present accurate information', 1], ['Selection of appropriate software tool', 1]] },
    { id: 'financial', n: 2, name: 'Tabular work: Financial document', sw: 'Spreadsheet software', a: [0, 7, 7],
      req: 'Prepare ONE of: income and expenditure statement, balance sheet, statement of cash flows, cash receipt, invoice, bill of lading, or any other suitable financial document.',
      scheme: [['Formatting: alignment', 1], ['Formatting: appropriate use of borders', 1], ['Formatting: bolding headings', 1], ['Create column and row headings', 1], ['Insertion of oblique and vertical headings', 1], ['Appropriate use of borders', 1], ['Sorting of data in table', 1], ['Use any TWO simple formulae (e.g. SUM 2, MAX 2)', 4], ['Formatting using currency (1) and decimal places (1)', 2], ['Merging cells', 1]] },
    { id: 'committee', n: 3, name: 'Committee documents', sw: 'Word processing', a: [1, 3, 1],
      req: 'Prepare ONE set: (i) a notice of a meeting with an agenda, OR (ii) minutes of a meeting with action items.',
      scheme: [['Notice: place, date and time of meeting (all required)', 1], ['Notice: who should attend and convenor (all required)', 1], ['Notice: New Business sub-numbered', 1], ['Notice: all 7 standard agenda items', 1], ['Minutes: title, date, time and place (all required)', 2], ['Minutes: all 4 standard features', 1], ['Minutes: all 7 standard headings', 1], ['Minutes: New Business appropriately numbered', 1], ['Action items: activity accurately detailed', 3], ['Action items: individual(s) responsible named', 2]] },
    { id: 'invite', n: 4, name: 'Display: Invitation with menu OR programme', sw: 'Word processing / Publisher', a: [1, 4, 0],
      req: 'Prepare EITHER an invitation with a menu OR a programme. A creative design should be used (booklet style).',
      scheme: [['Booklet style', 1], ['Appropriate use of art border', 1]] },
    { id: 'chart', n: 5, name: 'Display: Flow chart OR organisational chart', sw: 'Word processing (SmartArt or shapes)', a: [1, 4, 0],
      req: 'Prepare EITHER a flow chart OR an organisational chart, with or without a template.',
      scheme: [['Narrow margins', 1], ['Landscape orientation with correct layout of chart', 1]] },
    { id: 'legal', n: 6, name: 'Legal work', sw: 'Word processing', a: [1, 3, 1],
      req: 'Prepare ONE of: a lease, a hire purchase agreement, a will with an endorsement, OR a contract of employment.',
      scheme: [['Appropriate graphic/logo representing the nature of the company', 1], ['Credentials of new employee stated', 1], ['Figures in table accurately reproduced', 1], ['Signature spaces (3) correctly allocated', 1]] },
    { id: 'ppt', n: 7, name: 'Presentation (to accompany the research paper)', sw: 'Presentation software', a: [0, 11, 0],
      req: '8 to 10 slides with an appropriate title slide and design; logical introduction, body and conclusion; appropriate images, transitions and animations; speaker notes.',
      scheme: [['Appropriate, attractive design', 1], ['Clear spaces on slides; recommended font size, style and background colour (all required)', 3], ['Appropriate use of animation', 2], ['Appropriate use of graphics and transitions', 2], ['Headings on each slide and appropriate sequencing', 1], ['Speaker notes for each slide', 2]] },
    { id: 'db', n: 8, name: 'Data management (query and report)', sw: 'Database management software', a: [0, 10, 8],
      req: 'Prepare a database (inventory, records, library resources, collections or other suitable records) and design a simple query and a report using 2 or more fields.',
      scheme: [['Appropriate field names', 1], ['Appropriate data types (all present)', 2], ['Populating table', 3], ['Selecting a suitable primary key', 1], ['Simple query', 1], ['Complex query (criteria 1, criteria 2)', 2], ['Correct use of (2) and results from query (2)', 4], ['Selection of appropriate fields for report', 2], ['Correct specific report title', 2]] },
    { id: 'merge', n: 9, name: 'Mail merge', sw: 'Word processing', a: [0, 10, 3],
      req: 'Include (i) the primary document, (ii) a data source with a minimum of 5 and no more than 10 records, and (iii) the final merged secondary documents.',
      scheme: [['Data source: all fields present', 5], ['Primary document: date, address, salutation, body, closing', 5], ['Final document consistent with merged document', 2]] }
  ];
  const STRUCT = [['Title (cover) page: subject, examination year, candidate name/number, centre, territory', 1, 'KC'], ['Table of contents', 1, 'KC'], ['Description of ALL the components (2 marks; 50% of components = 1)', 2, 'KC'], ['References', 1, 'KC']];
  const MAIL = ['Free of typographical errors', 'Free of spelling errors', 'Free of grammatical errors', 'Produced according to accepted standards and document processing styles', 'Content completely accurate', 'Correct punctuation, capitalisation, word division and numbers in figures or words', 'Free-design documents laid out for easy reading and efficient use'];
  /* What each sample must show: syllabus requirement + mark-scheme rows + the layout points a teacher checks for mailability */
  const REQS = {
    ruled: ['Built in spreadsheet software, in worksheet cells (not a word-processing table or text boxes).',
      'A main heading, merged and centred across the whole table.',
      'Multiple columnar headings: group headings (for example years or terms) merged and centred over their sub-columns.',
      'Slanted (oblique, for example 45°) or vertical (90°) columnar headings that are still easy to read.',
      'Data sorted on the key you were given (A to Z, or highest first), with every row kept together.',
      'Totals and other figures calculated by formula and checked: every figure accurate.',
      'A harmonious colour scheme: tints of one colour family, with text readable on every fill.',
      'All borders (ruled lines), figures aligned consistently, and the table centred on the page.',
      'Your name and the label "Ruled Tabulation using Spreadsheet Software" in the footer.'],
    financial: ['ONE financial document: income and expenditure statement, balance sheet, statement of cash flows, invoice, cash receipt or bill of lading.',
      'Business name and document title merged and centred across the document.',
      'Column and row headings for every item and every total row.',
      'Oblique or vertical column headings.',
      'All borders on each cell, plus a closing border (double or thick) under the final total.',
      'All headings and total rows in bold; labels left-aligned and figures right-aligned.',
      'Data sorted as instructed (for example expenditure items A to Z).',
      'At least TWO different formulae (for example SUM plus MAX, MIN, AVERAGE or a subtraction), never answers typed in.',
      'Currency format with the symbol and two decimal places on every money figure.',
      'A formula-view printout that shows the formulae and cell references.'],
    committee: ['ONE set: a notice of a meeting with an agenda, OR the minutes of a meeting with action items.',
      'Notice: the organisation and NOTICE as headings; place, day, date and time; who should attend and the convenor.',
      'Notice: a "By Order" block with the secretary\'s name and title, dated BEFORE the meeting.',
      'Agenda: all 7 standard items in order, with New Business sub-numbered (4.1, 4.2 …).',
      'Minutes: a title with the date, time and place; Present (Chair identified), Absent with Apology, Absent and In Attendance.',
      'Minutes: past tense and reported speech under the numbered standard headings, New Business sub-numbered.',
      'Action items: a bordered table of each activity, the member responsible and the deadline, taken from the minutes.',
      'One font and consistent spacing; times and dates typed in one style throughout.'],
    invite: ['EITHER an invitation with a menu OR a programme (an invitation with a programme is fine).',
      'Booklet style: A4 landscape with Book fold, four A5 pages in the correct order.',
      'An art border on every page, suited to the occasion.',
      'Invitation details complete: host, occasion, day, date, time, venue, dress and RSVP.',
      'Menu courses in order, or programme items in time order (a borderless table keeps times aligned).',
      'A decorative font for the occasion and a plain, readable font for the details; headings consistent.',
      'One suitable graphic that does not cover text; text centred and balanced on each page.',
      'Every name, date, time, telephone number and e-mail address proofread against the copy.'],
    chart: ['EITHER a flow chart OR an organisational chart (SmartArt or another template may be used).',
      'A4 landscape orientation.',
      'Narrow margins: 1.27 cm (0.5 inch) on all sides.',
      'A clear, centred title naming the organisation or the process.',
      'Organisational chart: levels in rows, each superior above its subordinates, staff positions to the side with a dotted line.',
      'Flow chart: standard symbols (terminator, process, decision, input/output) joined by arrowed flow lines, with YES/NO on every decision exit.',
      'The same shape, size and font for every box of the same kind, and connectors that do not cross.',
      'The whole chart on one page, grouped so that it stays in place.'],
    legal: ['ONE of: a lease, a hire purchase agreement, a will with an endorsement, or a contract of employment.',
      'A letterhead with a graphic or logo that represents the nature of the company or firm.',
      'Both parties fully identified with addresses, and the credentials of the employee, hirer, tenant or testator stated.',
      'Numbered clauses with bold headings, in correct legal wording.',
      'A table of figures reproduced exactly, agreeing with the clauses (key amounts in figures and words).',
      'Three signature spaces correctly allocated (for example Landlord, Tenant and Witness), each with a date line.',
      'No blank lines except signature and date lines; a will has its endorsement on a separate sheet.',
      'Page numbers and consistent spacing, with your name and the label in the footer.'],
    ppt: ['8 to 10 slides that accompany your group\'s research paper.',
      'An appropriate title slide (title, your name, school and date) and one consistent design.',
      'A logical sequence: introduction, body (questions, method, findings), conclusion and references.',
      'A heading on every slide.',
      'Clear space: no more than six bullets; headings about 40 pt and body text 24 pt or larger; a readable font on a contrasting background.',
      'Relevant images and charts of your findings.',
      'Transitions on all slides and entrance animations that support the content.',
      'Speaker notes for every slide, printed as notes pages or handouts.'],
    db: ['A database of suitable records (inventory, member or student records, library resources, collections …).',
      'Appropriate field names and a suitable data type for every field.',
      'A suitable primary key.',
      'The table fully populated with accurate records.',
      'A simple query (one criterion) and a complex query with two criteria in the same Criteria row.',
      'Query results that are correct for your data.',
      'A report built from a query, using two or more fields, with a correct and specific title.',
      'Printouts of Design View and Datasheet View, each query\'s design and results, and the report.'],
    merge: ['The primary (main) document on a letterhead, with merge fields for the inside address and salutation.',
      'Date, inside address, salutation, a body that uses at least one merge field in the text, and the closing.',
      'A data source of 5 to 10 records, with every field the letter uses.',
      'Field names spelt consistently, and every record complete.',
      'The final merged letters, one per record, each starting on a new page.',
      'Every merged letter matching its record exactly, with no doubled or missing spaces or punctuation.',
      'All three parts printed and labelled: primary document, data source and merged documents.']
  };
  /* Portfolio structure aspects (STRUCT marks unchanged) with the hash of the matching page in the Grade One sample */
  const SREQ = [
    { h: 'cover', t: 'Cover (title) page', m: 1, r: ['Year of examination and the subject: Electronic Document Preparation and Management.', 'Candidate name and candidate number.', 'Centre code and school.', 'Title: Portfolio.', 'Teacher and territory.', 'A neat, balanced layout; a banner or graphic is optional.'] },
    { h: 'approval', t: 'Approval page', m: 0, r: ['"Presented to the Caribbean Examinations Council in partial fulfilment of the requirements of the course".', 'The subject name and "BY" with your name.', 'Your school, and the month and year of submission.', '"Approved by", a signature line, and TUTOR with your teacher\'s name.'] },
    { h: 'toc', t: 'Table of contents', m: 1, r: ['Every part of the portfolio listed in order, grouped under clear headings.', 'Page numbers right-aligned, with dot leaders.', 'Page numbers that match the real pages: check them after the final printout.', 'The description of components, bibliography and disclosure listed too.'] },
    { h: 'descriptions', t: 'Description of components', m: 2, r: ['A short description of ALL the components: describing only half earns 1 mark of 2.', 'For each sample: what it is, what it demonstrates and the software used.', 'For example: "Income and expenditure statement using spreadsheet software".', 'Placed straight after the table of contents.'] },
    { h: 'biblio', t: 'Bibliography (references)', m: 1, r: ['Every source you used, in APA style.', 'In alphabetical order of author, with a hanging indent.', 'Include the syllabus and any textbook you used.', 'Only sources you really used, with any web address copied exactly.'] },
    { h: 'disclosure', t: 'Disclosure (declaration)', m: 0, r: ['A declaration that the work is your own.', 'Templates, clip art and other sources acknowledged.', 'The software used for each sample.', 'Signature and date lines for you and your teacher.'] }
  ];
  const SAMPLE = 'games/edpm-sample-portfolio.html';
  const SIM = { excel: ['games/excelsim.html?level=2', 'excelsim', 'Practise in the Excel Lab'], word: ['games/wordsim.html?level=2', 'wordsim', 'Practise in the Word Lab'], pub: ['games/publishersim.html?level=2', 'publishersim', 'Practise in the Publisher Lab'], access: ['games/accesssim.html?mission=E-01', 'accesssim', 'Practise in the Access Lab'], flow: ['games/flowchart.html', 'flowchart', 'Practise flow charts: Flow the Process'], org: ['games/orgchart.html', 'orgchart', 'Practise organisational charts: Chart the Company'] };
  Object.assign(SIM, { 'x-ruled': ['games/excelsim.html?mission=e-ruled', 'excelsim', 'Excel Lab: ruled tabulation'], 'x-fin': ['games/excelsim.html?mission=e-financial', 'excelsim', 'Excel Lab: income and expenditure'], 'x-inv': ['games/excelsim.html?mission=e-invoice', 'excelsim', 'Excel Lab: invoice (warm-up)'], 'w-notice': ['games/wordsim.html?mission=e-notice', 'wordsim', 'Word Lab: notice and agenda'], 'w-min': ['games/wordsim.html?mission=e-minutes', 'wordsim', 'Word Lab: minutes'], 'w-contract': ['games/wordsim.html?mission=e-contract', 'wordsim', 'Word Lab: contract of employment'], 'w-merge': ['games/wordsim.html?mission=e-merge', 'wordsim', 'Word Lab: mail merge'], 'p-invite': ['games/publishersim.html?mission=e-invite', 'publishersim', 'Publisher Lab: invitation with menu'], 'p-prog': ['games/publishersim.html?mission=e-programme', 'publishersim', 'Publisher Lab: programme booklet'], 'a-db': ['games/accesssim.html?mission=E-06', 'accesssim', 'Access Lab: the full database task'], 'a-start': ['games/accesssim.html?mission=E-01', 'accesssim', 'Access Lab: start with the table design'], 'win': ['games/winsim.html?mission=l2-structure', 'winsim', 'Windows Lab: file your portfolio'] });
  const ESIM = { ruled: ['x-ruled'], financial: ['x-inv', 'x-fin'], committee: ['w-notice', 'w-min'], legal: ['w-contract'], merge: ['w-merge'], invite: ['p-prog', 'p-invite'], chart: ['flow', 'org'], db: ['a-start', 'a-db'], ppt: [] };
  const LSIM = { word: 'word', access: 'access', pub: 'pub' };
  const simBtn = k => { const s = SIM[k]; return `<button type="button" class="btn ghost" data-gx="opengame" data-page="${s[0]}" data-id="${s[1]}">🖥️ ${s[2]}</button>`; };
  const sampleBtn = (hash, txt) => `<button type="button" class="btn gold" data-gx="opengame" data-page="${SAMPLE}#${hash}" data-id="sampleport">📘 ${txt || 'See a Grade One sample'}</button>`;
  const PDFS = { clean: ['games/res/EDPM_Sample_Portfolio.pdf', 'EDPM Sample Portfolio.pdf'], notes: ['games/res/EDPM_Sample_Portfolio_Marking_Notes.pdf', 'EDPM Sample Portfolio with marking notes.pdf'] };
  const pdfBtn = (k, txt) => `<button type="button" class="btn ghost" data-lxact="portpdf" data-k="${k}">⬇ ${txt}</button>`;
  const pdfBtns = () => pdfBtn('clean', 'Download the sample portfolio (PDF)') + pdfBtn('notes', 'Download it with marking notes (PDF)');
  async function savePdf(k, toast) {
    const f = PDFS[k] || PDFS.clean, say = m => { try { (toast || (() => { }))(m); } catch (e) { } };
    let blob = null; try { const r = await fetch(f[0]); if (r.ok) blob = await r.blob(); } catch (e) { }
    if (!blob) { try { window.open(f[0], '_blank', 'noopener'); } catch (e) { say('The PDF could not be opened here.'); } return; }
    if (DL) { try { await DL.save({ filename: f[1], data: blob }); return; } catch (e) { if (e && e.code === 'declined') return; } }
    try { const u = URL.createObjectURL(blob), a = document.createElement('a'); a.href = u; a.download = f[1]; a.dataset.direct = '1'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); } catch (e) { try { window.open(f[0], '_blank', 'noopener'); } catch (e2) { say('The PDF could not be downloaded here.'); } }
  }
  window.EDPM_DLPDF = notes => savePdf(notes ? 'notes' : 'clean');
  const reqList = (arr, esc) => `<ul class="lx-req">${arr.map(r => `<li>${esc(r)}</li>`).join('')}</ul>`;

  const LABS = () => window.EDPM_LABS || [];
  const PORT = () => window.EDPM_PORTFOLIO || [];
  let DL = null; try { if (window.claude && window.claude.use) window.claude.use('downloads').then(d => { DL = d; }).catch(() => { }); } catch (e) { }

  function css() {
    if (document.getElementById('labs-css')) return;
    const st = document.createElement('style'); st.id = 'labs-css';
    st.textContent = `.lx-doc{background:#fffdf6;color:#1a1a1a;border-radius:12px;padding:18px 20px;border:1px solid #e3d9bd;font:15px/1.55 Georgia,'Times New Roman',serif;overflow-x:auto}
.lx-doc table{border-collapse:collapse;margin:8px 0;font:14px/1.35 Arial,sans-serif}.lx-doc th,.lx-doc td{border:1px solid #9aa3ad;padding:4px 8px;text-align:left;vertical-align:top}.lx-doc th{background:#eef1f4}
.lx-doc small{color:#5a5a5a}.lx-doc del{color:#a33}.lx-doc u{text-decoration-thickness:2px}
.lx-tasks{margin:0;padding-left:1.4em;display:flex;flex-direction:column;gap:6px}.lx-tasks li{padding-left:4px}
.lx-check{width:100%;border-collapse:collapse}.lx-check td,.lx-check th{padding:8px;border-bottom:1px solid var(--line,#33415a);text-align:left;vertical-align:top}.lx-check td.m{text-align:center;white-space:nowrap;font-variant-numeric:tabular-nums}
.lx-check input{width:20px;height:20px;accent-color:var(--gold,#f5c542)}
.lx-check td,.lx-check th{text-align:left}.lx-check td.m,.lx-check th.m{text-align:center}
.lx-check .linkbtn,.lx-card,.lx-card *{text-align:left!important;justify-content:flex-start}
.lx-check .linkbtn{display:inline;white-space:normal;padding:0;line-height:1.35;font-weight:700}
.lx-pill{display:inline-block;border-radius:99px;padding:1px 9px;font-size:.72rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border:1px solid currentColor;margin-right:4px}
.lx-meta{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.lx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.lx-card{text-align:left;display:flex;flex-direction:column;gap:6px;padding:14px;border-radius:14px;border:1px solid var(--line,#33415a);background:var(--raise,rgba(255,255,255,.04));color:inherit;cursor:pointer;font:inherit}
.lx-card:hover{border-color:var(--gold,#f5c542)}.lx-card h4{margin:0;font-size:1.02rem}.lx-card .hint{margin:0}
.lx-card.done{box-shadow:inset 4px 0 0 #3fbf7f}
.lx-score{font-size:2rem;font-weight:800;font-variant-numeric:tabular-nums}
.lx-bar{height:10px;border-radius:99px;background:rgba(127,127,127,.25);overflow:hidden}.lx-bar i{display:block;height:100%;background:linear-gradient(90deg,#f5c542,#3fbf7f)}
.lx-req{list-style:none;margin:0;padding:0;display:grid;gap:7px}
.lx-req li{display:grid;grid-template-columns:20px minmax(0,1fr);gap:8px;align-items:start;text-align:left;line-height:1.45;overflow-wrap:anywhere}
.lx-req li::before{content:'✓';font-weight:800;color:var(--ok,#3fbf7f)}
.lx-acts{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.lx-acts .btn{white-space:normal;max-width:100%}
.lx-sgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:12px}
.lx-sbox{display:flex;flex-direction:column;gap:10px;padding:14px;border-radius:14px;border:1px solid var(--line,#33415a);background:var(--raise,rgba(255,255,255,.04));text-align:left;min-width:0}
.lx-sbox h4{margin:0;font-size:1.02rem}.lx-sbox .lx-acts{margin-top:auto}.lx-sbox .lx-pill{align-self:flex-start}
@media print{body *{visibility:hidden}#lx-print,#lx-print *{visibility:visible}#lx-print{position:absolute;left:0;top:0;width:100%;color:#000;background:#fff}}`;
    document.head.appendChild(st);
  }
  const store = api => { const S = api.S; S.labs = S.labs || {}; S.port = S.port || { pick: {}, ticks: {}, struct: [] }; S.port.pick = S.port.pick || {}; S.port.ticks = S.port.ticks || {}; S.port.struct = S.port.struct || []; return S; };
  const appPill = a => `<span class="lx-pill">${APPS[a][1]} ${APPS[a][0]}</span>`;

  function sheetHTML(title, sub, body) {
    return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title><style>body{font:15px/1.5 Georgia,serif;max-width:800px;margin:24px auto;padding:0 20px;color:#111}h1{font:700 22px Arial,sans-serif;margin:0 0 4px}h2{font:700 16px Arial,sans-serif;margin:22px 0 6px;border-bottom:2px solid #222}table{border-collapse:collapse;margin:8px 0;font:13px Arial,sans-serif}th,td{border:1px solid #777;padding:4px 7px;text-align:left;vertical-align:top}th{background:#eee}.doc{border:1px solid #bbb;padding:14px 18px;background:#fffef8}.sub{color:#555;font:13px Arial,sans-serif}.foot{margin-top:30px;color:#666;font:12px Arial,sans-serif}</style></head><body><h1>${title}</h1><div class="sub">${sub}</div>${body}<div class="foot">EDPM · Kester Small</div></body></html>`;
  }
  function checkTable(rows, ticks, key, withP) {
    return `<div class="tablewrap"><table class="lx-check"><thead><tr><th style="width:44px">Done</th><th>Criterion</th>${withP ? '<th>Profile</th>' : ''}<th class="m">Marks</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td><input type="checkbox" data-lxtick="${key}" data-i="${i}" ${ticks[i] ? 'checked' : ''} aria-label="Done: ${r.c.replace(/"/g, '')}"></td><td>${r.c}</td>${withP ? `<td>${PNAME[r.p] ? r.p : ''}</td>` : ''}<td class="m">${r.m}</td></tr>`).join('')}</tbody></table></div>`;
  }
  const sum = (rows, ticks) => rows.reduce((a, r, i) => a + (ticks[i] ? r.m : 0), 0);
  const tot = rows => rows.reduce((a, r) => a + r.m, 0);

  /* ---------------- Practical Labs ---------------- */
  function labsHome(api, loc) {
    const S = store(api), esc = api.esc, f = loc.tab || 'all', sec = loc.sub || '';
    let L = LABS(); const all = L.length, done = L.filter(x => S.labs[x.id] && S.labs[x.id].done).length;
    if (f !== 'all') L = L.filter(x => x.app === f); if (sec) L = L.filter(x => x.sec === sec);
    let h = `<div class="hero"><span class="eyebrow">EDPM · Practical Labs</span><h1>Hands-on labs: Word, Access, PowerPoint and Publisher</h1><p>${all} practical exercises, five for every section, written like real CXC practical tasks. Read the brief, key in the data, follow every instruction, then tick the marking checklist the way your teacher will. <b>${done}</b> of ${all} completed.</p></div>`;
    h += `<div class="card"><div class="chips" role="group" aria-label="Filter by software"><button type="button" class="chip ${f === 'all' ? 'sel' : ''}" data-go="labs" data-tab="all" ${sec ? `data-sub="${sec}"` : ''}>All software</button>${Object.entries(APPS).map(([k, v]) => `<button type="button" class="chip ${f === k ? 'sel' : ''}" data-go="labs" data-tab="${k}" ${sec ? `data-sub="${sec}"` : ''}>${v[1]} ${v[0]}</button>`).join('')}</div>
      <div class="chips" role="group" aria-label="Filter by section" style="margin-top:8px"><button type="button" class="chip ${!sec ? 'sel' : ''}" data-go="labs" data-tab="${f}">All sections</button>${Object.keys(SECN).map(k => `<button type="button" class="chip ${sec === k ? 'sel' : ''}" data-go="labs" data-tab="${f}" data-sub="${k}">Section ${ROMAN[k]}</button>`).join('')}</div></div>`;
    const by = {}; L.forEach(x => (by[x.sec] = by[x.sec] || []).push(x));
    Object.keys(SECN).filter(k => by[k]).forEach(k => {
      h += `<div class="card"><h3>${esc(SECN[k])}</h3><div class="lx-grid">${by[k].map(x => { const st = S.labs[x.id] || {}; const t = tot(x.check); return `<button type="button" class="lx-card ${st.done ? 'done' : ''}" data-go="labs" data-k="${x.id}"><div class="lx-meta">${appPill(x.app)}<span class="lx-pill">${esc(x.level)}</span></div><h4>${esc(x.title)}</h4><p class="hint">${x.time} min · ${t} marks${st.done ? ` · ✓ ${sum(x.check, st.ticks || {})}/${t}` : ''}</p></button>`; }).join('')}</div></div>`;
    });
    if (!L.length) h += `<div class="card"><p>No labs match that filter yet.</p></div>`;
    return h;
  }
  function labView(api, x) {
    const S = store(api), esc = api.esc, st = S.labs[x.id] || {}, ticks = st.ticks || {}, t = tot(x.check), got = sum(x.check, ticks);
    const list = LABS(), i = list.indexOf(x), nx = list[i + 1];
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="labs">← Practical Labs</button><span>${esc(SECN[x.sec])}</span></div>`;
    h += `<div id="lx-print"><div class="card"><div class="lx-meta">${appPill(x.app)}<span class="lx-pill">${esc(x.level)}</span><span class="lx-pill">⏱ ${x.time} min</span><span class="lx-pill">${t} marks</span></div><h2 style="margin-top:8px">${esc(x.title)}</h2><div class="html-body">${x.brief}</div>
      <div class="lx-meta" style="margin-top:6px">${x.skills.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div></div>`;
    if (x.data) h += `<div class="card"><h3>Draft / data to use</h3><div class="lx-doc">${x.data}</div></div>`;
    h += `<div class="card"><h3>Instructions</h3><ol class="lx-tasks">${x.tasks.map(tk => `<li>${tk}</li>`).join('')}</ol></div>`;
    h += `<div class="card"><h3>Marking checklist</h3><p class="hint">When your document is finished, tick each point you can prove in your file. Be honest: this is exactly how your teacher will mark it.</p>${checkTable(x.check, ticks, 'lab:' + x.id)}<p><b>Your self-check: ${got} / ${t}</b></p></div></div>`;
    h += `<div class="card"><div class="tip"><b>Teacher's tip:</b> ${x.tip}</div>
      <div class="row" style="margin-top:12px"><button type="button" class="btn go" data-lxact="labdone" data-k="${x.id}">${st.done ? '✓ Completed (update)' : 'Mark this lab complete'}</button><button type="button" class="btn ghost" data-lxact="print">🖨 Print task sheet</button><button type="button" class="btn ghost" data-lxact="dl" data-k="${x.id}">⬇ Download task sheet</button>${LSIM[x.app] ? simBtn(LSIM[x.app]) : ''}${nx ? `<button type="button" class="btn ghost" data-go="labs" data-k="${nx.id}">Next lab →</button>` : ''}</div></div>`;
    return h;
  }

  /* ---------------- Portfolio Studio ---------------- */
  function portTotals(S) {
    let got = 0, kc = 0, app = 0, ia = 0;
    ELEMENTS.forEach(e => { const sid = S.port.pick[e.id]; const sc = PORT().find(x => x.id === sid); if (!sc) return; const tk = S.port.ticks[sid] || {}; sc.check.forEach((r, i) => { if (tk[i]) { got += r.m; if (r.p === 'KC') kc += r.m; if (r.p === 'APP') app += r.m; if (r.p === 'IA') ia += r.m; } }); });
    STRUCT.forEach((r, i) => { if (S.port.struct[i]) { got += r[1]; kc += r[1]; } });
    return { got, kc, app, ia };
  }
  const PTABS = [['overview', 'Overview & tracker'], ['elements', 'Elements & scenarios'], ['builder', 'Portfolio builder'], ['checklist', 'SBA checklist'], ['research', 'Research assignment']];
  const SUBMIT = [
    ['Portfolio', [
      'Cover page: subject, year of examination, candidate name and number, centre code, school, territory, teacher',
      'Table of contents listing every sample with page numbers',
      'All nine samples included: ruled tabulation, financial document, committee documents, invitation/programme, chart, legal document, presentation, database (query and report), mail merge',
      'Each sample labelled with what it demonstrates and the software used (e.g. "Income and expenditure statement using Spreadsheet Software")',
      'My name on every page (header or footer)',
      'Every sample is mailable: no typing, spelling or grammar errors; accepted layout; accurate content',
      'Teacher has signed and dated each mailable sample',
      'A short description of each component',
      'Title pages where necessary',
      'References / bibliography in a consistent style',
      'Everything combined into ONE electronic document']],
    ['Mail merge', ['Primary (main) document saved', 'Data source with 5 to 10 records and all fields present', 'Final merged documents included']],
    ['Database', ['Field names and data types appropriate; primary key set', 'Table fully populated', 'Simple query and complex (two-criteria) query saved and named', 'Report built from a query, with a specific title']],
    ['Presentation', ['8 to 10 slides with a title slide', 'Introduction, body and conclusion', 'Appropriate images, transitions and animations', 'Readable fonts and contrast, headings on every slide', 'Speaker notes on every slide']],
    ['Research paper (SBA part A)', ['Statement of topic and research questions', 'Context / background and purpose of research', 'Method: type of research, data collection instrument, population', 'Presentation, discussion and analysis/interpretation of findings with tables and charts', 'Recommendations and implementation strategy', 'Conclusion', 'References and appendices (permission letter and questionnaire or other instrument)', 'No more than 1000 words (excluding charts, tables, references, appendices)', 'Title page, table of contents, page numbers, consistent headings, fonts, margins and spacing', 'Group of no more than 3 members']]];
  function ptabsHTML(cur) { return `<div class="card"><div class="chips" role="tablist" aria-label="Portfolio Studio">${PTABS.map(([k, n]) => `<button type="button" role="tab" class="chip ${cur === k ? 'sel' : ''}" aria-selected="${cur === k}" data-go="portfolio" data-sub="${k}">${n}</button>`).join('')}</div></div>`; }
  function heroHTML() { return `<div class="hero"><span class="eyebrow">EDPM · Portfolio Studio (SBA Paper 031)</span><h1>Build a Grade One portfolio</h1><p>The SBA is <b>40%</b> of your final grade: a research assignment (60 marks) and a portfolio of nine samples (85 marks). Choose a scenario for each element, produce it until it is <b>mailable</b>, tick the official CXC mark-scheme points, then use the builder to put it all together.</p></div>`; }
  function portHome(api, loc) {
    const S = store(api), esc = api.esc, T = portTotals(S), sub = loc.sub || 'overview';
    if (sub === 'research') return elemView(api, 'research', true);
    let h = heroHTML() + ptabsHTML(sub);
    if (sub === 'overview') {
      h += `<div class="card"><div class="row" style="justify-content:space-between;gap:16px;align-items:center"><div><span class="kicker">My portfolio tracker</span><div class="lx-score">${T.got} / 85</div><p class="hint">K&C ${T.kc}/10 · Application ${T.app}/55 · Interpretation & Analysis ${T.ia}/20</p></div><div style="flex:1;min-width:200px"><div class="lx-bar"><i style="width:${Math.round(T.got / 85 * 100)}%"></i></div></div></div>
      <div class="tablewrap"><table class="lx-check"><thead><tr><th>#</th><th>Element</th><th>My scenario</th><th class="m">Marks</th></tr></thead><tbody>${ELEMENTS.map(e => { const sc = PORT().find(x => x.id === S.port.pick[e.id]); const t = e.a[0] + e.a[1] + e.a[2]; return `<tr><td>${e.n}</td><td><button type="button" class="linkbtn" data-go="portfolio" data-tab="${e.id}">${esc(e.name)}</button></td><td>${sc ? `<button type="button" class="linkbtn" data-go="portfolio" data-k="${sc.id}">${esc(sc.title)}</button>` : '<span class="hint">Not chosen yet</span>'}</td><td class="m">${sc ? sum(sc.check, S.port.ticks[sc.id] || {}) : 0} / ${t}</td></tr>`; }).join('')}
      <tr><td>10</td><td>Structure of portfolio</td><td>${checkTable(STRUCT.map(r => ({ c: r[0], m: r[1], p: r[2] })), S.port.struct, 'struct')}</td><td class="m">${STRUCT.reduce((a, r, i) => a + (S.port.struct[i] ? r[1] : 0), 0)} / 5</td></tr></tbody></table></div></div>`;
      h += `<div class="card"><h3>Portfolio structure: requirements and samples</h3><p class="hint">Besides the nine samples, your portfolio needs these parts, in this order. Structure is worth 5 marks: title page 1, table of contents 1, description of components 2 and references 1. Open each Grade One sample to see the finished page.</p>
      <div class="lx-sgrid">${SREQ.map(s => `<div class="lx-sbox"><span class="lx-pill">${s.m ? s.m + (s.m === 1 ? ' mark' : ' marks') : 'Required · no marks'}</span><h4>${esc(s.t)}</h4>${reqList(s.r, esc)}<div class="lx-acts">${sampleBtn(s.h)}</div></div>`).join('')}</div>
      <div class="lx-acts">${sampleBtn('cover', 'Open the whole Grade One sample portfolio')}${pdfBtns()}</div></div>`;
      h += `<div class="card"><h3>Mailability: the standard for every sample</h3><p class="hint">Your teacher signs a sample only when it is mail-worthy. A sample that is not mailable scores zero, but you may redo it as many times as you need.</p><ol class="lx-tasks">${MAIL.map(m => `<li>${m}</li>`).join('')}</ol></div>`;
    }
    if (sub === 'elements') {
      h += `<div class="card"><h3>The nine portfolio elements</h3><p class="hint">Open an element to see the official mark scheme and choose a scenario.</p><div class="lx-grid">${ELEMENTS.map(e => { const n = PORT().filter(x => x.el === e.id).length; return `<button type="button" class="lx-card ${S.port.pick[e.id] ? 'done' : ''}" data-go="portfolio" data-tab="${e.id}"><span class="lx-pill">Element ${e.n} · ${e.a[0] + e.a[1] + e.a[2]} marks</span><h4>${esc(e.name)}</h4><p class="hint">${esc(e.sw)} · ${n} scenario${n === 1 ? '' : 's'}</p></button>`; }).join('')}</div>
      <p class="hint" style="margin:0">Each element page lists what your sample must show and links to that page of the Grade One sample portfolio.</p><div class="lx-acts">${sampleBtn('cover', 'Open the Grade One sample portfolio')}${pdfBtns()}</div></div>`;
    }
    if (sub === 'builder') h += builderHTML(api);
    if (sub === 'checklist') {
      const cl = S.port.cl || {}; let all = 0, done = 0;
      h += SUBMIT.map(([g, items], gi) => `<div class="card"><h3>${esc(g)}</h3>${items.map((t, i) => { const k = gi + '-' + i; all++; if (cl[k]) done++; return `<label class="row" style="gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--line,#33415a)"><input type="checkbox" data-lxcl="${k}" ${cl[k] ? 'checked' : ''} style="width:20px;height:20px;margin-top:2px;accent-color:var(--gold,#f5c542)"><span>${esc(t)}</span></label>`; }).join('')}</div>`).join('');
      h = h.replace(ptabsHTML(sub), ptabsHTML(sub) + `<div class="card"><span class="kicker">Ready to submit?</span><div class="lx-score">${done} / ${all}</div><div class="lx-bar"><i style="width:${all ? Math.round(done / all * 100) : 0}%"></i></div><p class="hint">Tick each point when it is true of your finished SBA. Your teacher still signs every mailable sample.</p></div>`);
    }
    return h;
  }
  function coverOf(api) {
    const S = store(api), P = S.profile || {}, c = S.port.cover = S.port.cover || {};
    const T = (window.COURSE_TERRITORIES || []).find(t => t.id === P.territory);
    return Object.assign({ name: S.name || '', cand: '', centre: '', school: P.school === 'Other' ? (P.schoolOther || '') : (P.school || ''), terr: T ? T.name : '', year: '', teacher: '', month: '' }, c);
  }
  const FIELDS = [['name', 'Candidate name'], ['cand', 'Candidate number'], ['centre', 'Centre code'], ['school', 'School'], ['terr', 'Territory'], ['year', 'Year of examination', 'The year you sit the examination'], ['teacher', 'Teacher'], ['month', 'Month and year of submission (e.g. March)']];
  function descFor(e, sc) {
    const base = { ruled: 'A ruled tabulation with a main heading, multiple column headings in oblique/vertical orientation and sorted data, prepared using spreadsheet software.', financial: 'A financial document prepared using spreadsheet software, with formulae, currency formatting, merged headings and borders.', committee: 'A set of committee documents prepared using word-processing software, following the standard format and agenda items.', invite: 'A creative display in booklet style with an art border, prepared using word-processing / desktop publishing software.', chart: 'A chart displayed on landscape paper with narrow margins, prepared using SmartArt or shapes.', legal: 'A legal document prepared using word-processing software, with the parties identified, numbered clauses, a table of figures and signature spaces.', ppt: 'A presentation of 8 to 10 slides with a title slide, transitions, animations, images and speaker notes, prepared using presentation software to accompany the research paper.', db: 'A database table with appropriate field names, data types and a primary key, with a simple query, a complex query and a report, prepared using database management software.', merge: 'A mail merge: the primary document, the data source and the final merged documents, prepared using the mail merge feature of word-processing software.' }[e.id];
    return sc ? `${sc.label}: ${sc.title}. ${base}` : base;
  }
  function builderHTML(api) {
    const S = store(api), esc = api.esc, c = coverOf(api), D = S.port.desc = S.port.desc || {}, refs = S.port.refs != null ? S.port.refs : 'Campbell, H., & Bogle-Graham, O. (2012). Electronic Document Preparation and Management for CSEC® Examinations. London, UK: Macmillan Publishers Limited.\nCaribbean Examinations Council. (2024). CSEC® Electronic Document Preparation and Management syllabus (CXC 34/G/SYLL 24). St Michael, Barbados: CXC.';
    let h = `<div class="card"><h3>1. Cover page details</h3><p class="hint">These fill your cover page. Your teacher will give you the candidate number and centre code.</p><div class="formgrid">${FIELDS.map(([k, n, ph]) => `<div class="field"><label for="pb-${k}">${n}</label><input id="pb-${k}" class="input" data-lxf="cover.${k}" maxlength="80" value="${esc(c[k] || '')}"${ph ? ` placeholder="${ph}"` : ''}></div>`).join('')}</div></div>`;
    h += `<div class="card"><h3>2. Components and descriptions</h3><p class="hint">Each description says what the sample demonstrates and the software used. Edit them to match your own work.</p>${ELEMENTS.map(e => { const sc = PORT().find(x => x.id === S.port.pick[e.id]); return `<div class="field" style="margin-bottom:10px"><label for="pd-${e.id}"><b>${e.n}. ${esc(e.name)}</b> ${sc ? `<span class="hint">· ${esc(sc.title)}</span>` : `<button type="button" class="linkbtn" data-go="portfolio" data-tab="${e.id}">choose a scenario</button>`}</label><textarea id="pd-${e.id}" class="ta sm" rows="2" data-lxf="desc.${e.id}">${esc(D[e.id] != null ? D[e.id] : descFor(e, sc))}</textarea></div>`; }).join('')}</div>`;
    h += `<div class="card"><h3>3. References</h3><p class="hint">One reference per line.</p><textarea class="ta" rows="4" data-lxf="refs">${esc(refs)}</textarea></div>`;
    h += `<div class="card"><h3>4. Build it</h3><p>Creates your cover page, approval page, table of contents, component descriptions and bibliography as one document. Paste each finished sample in after its description, then add page numbers.</p><div class="row"><button type="button" class="btn go" data-lxact="pbdl">⬇ Download my portfolio front matter</button><button type="button" class="btn ghost" data-lxact="pbprint">🖨 Print preview</button></div></div>`;
    return h;
  }
  function builderDoc(api) {
    const S = store(api), esc = api.esc, c = coverOf(api), D = S.port.desc || {};
    const refs = (S.port.refs != null ? S.port.refs : 'Campbell, H., & Bogle-Graham, O. (2012). Electronic Document Preparation and Management for CSEC® Examinations. London, UK: Macmillan Publishers Limited.\nCaribbean Examinations Council. (2024). CSEC® Electronic Document Preparation and Management syllabus (CXC 34/G/SYLL 24). St Michael, Barbados: CXC.').split('\n').filter(x => x.trim());
    const page = 'page-break-after:always;min-height:900px;position:relative';
    let b = `<div style="${page}"><p>Year of Examination: ${esc(c.year)}</p><p>Subject: Electronic Document Preparation and Management</p><p>Candidate Number: ${esc(c.cand)}</p><p>Candidate Name: ${esc(c.name)}</p><p>Centre Code: ${esc(c.centre)}</p><p>Title: Portfolio</p><p>Teacher: ${esc(c.teacher)}</p><p>Territory: ${esc(c.terr)}</p></div>`;
    b += `<div style="${page};text-align:center"><p style="margin-top:120px">PRESENTED TO THE CARIBBEAN EXAMINATIONS COUNCIL</p><p>IN PARTIAL FULFILMENT OF THE REQUIREMENTS OF THE COURSE</p><h1>ELECTRONIC DOCUMENT PREPARATION AND MANAGEMENT (EDPM)</h1><p>BY</p><h2>${esc(c.name)}</h2><p>${esc(c.school)}</p><p>${esc(c.month)}</p><p style="margin-top:80px">APPROVED BY</p><p>...........................................................</p><p>TUTOR</p><p>${esc(c.teacher)}</p></div>`;
    b += `<div style="${page}"><h2 style="text-align:center">Table of Contents</h2><table style="width:100%;border:0">${ELEMENTS.map(e => `<tr><td style="border:0">${e.n}. ${esc(e.name.replace(/^[^:]+: /, '') )}</td><td style="border:0;text-align:right">____</td></tr>`).join('')}<tr><td style="border:0">Bibliography</td><td style="border:0;text-align:right">____</td></tr></table></div>`;
    b += ELEMENTS.map(e => `<div style="${page}"><h2>${e.n}. ${esc(e.name)}</h2><p>${esc(D[e.id] != null ? D[e.id] : descFor(e, PORT().find(x => x.id === S.port.pick[e.id])))}</p><p style="color:#888">[Insert your mailable sample here]</p><p style="position:absolute;bottom:0;left:0;right:0;border-top:1px solid #999;font:12px Arial;display:flex;justify-content:space-between"><span>${esc(c.name)}</span><span>${esc(e.name)}</span></p></div>`).join('');
    b += `<div><h2 style="text-align:center">Bibliography</h2>${refs.map(r => `<p style="padding-left:2em;text-indent:-2em">${esc(r)}</p>`).join('')}</div>`;
    return b;
  }
  function elemView(api, id, tabbed) {
    const S = store(api), esc = api.esc;
    if (id === 'research') {
      const R = PORT().filter(x => x.el === 'research');
      return (tabbed ? heroHTML() + ptabsHTML('research') : `<div class="crumbs"><button type="button" class="linkbtn" data-go="portfolio" data-sub="research">← Portfolio Studio</button><span>Research assignment</span></div>`) + `
      <div class="card"><span class="kicker">SBA part A · 60 marks (K&C 5 · Application 40 · I&A 15)</span><h2>Research assignment topics</h2><p>Groups of no more than 3. Report of no more than 1000 words (excluding charts, tables, references and appendices), with title page, table of contents, research questions, background, purpose, method (qualitative/quantitative, instrument, population), findings, discussion, analysis, recommendations and implementation strategy, conclusion, references and appendices (permission letter and questionnaire). Your PowerPoint presentation (portfolio element 7) accompanies this paper.</p></div>
      <div class="card"><div class="lx-grid">${R.map(x => `<button type="button" class="lx-card" data-go="portfolio" data-k="${x.id}"><h4>${esc(x.title)}</h4><p class="hint">${esc(x.org)}</p></button>`).join('')}</div></div>`;
    }
    const e = ELEMENTS.find(x => x.id === id); if (!e) return '<div class="card"><p>Element not found.</p></div>';
    const L = PORT().filter(x => x.el === id), t = e.a[0] + e.a[1] + e.a[2];
    return `<div class="crumbs"><button type="button" class="linkbtn" data-go="portfolio" data-sub="elements">← Portfolio Studio</button><span>Element ${e.n}</span></div>
      <div class="card"><span class="kicker">Element ${e.n} · ${t} marks · K&C ${e.a[0]} · Application ${e.a[1]} · I&A ${e.a[2]}</span><h2>${esc(e.name)}</h2><p><b>Software:</b> ${esc(e.sw)}</p><p><b>Syllabus requirement:</b> ${esc(e.req)}</p>
      <h3>Official mark scheme rows (syllabus exemplar)</h3><div class="tablewrap"><table class="lx-check"><tbody>${e.scheme.map(r => `<tr><td>${esc(r[0])}</td><td class="m">${r[1]}</td></tr>`).join('')}</tbody></table></div><p class="hint">Each scenario's checklist applies these rows to that task, topped up from the mailability guidelines where the exemplar lists fewer marks than the allocation.</p></div>
      <div class="card"><h3>What your sample must show</h3><p class="hint">Check your finished sample against every point before you ask your teacher to sign it as mailable.</p>${reqList(REQS[e.id] || [], esc)}
      <div class="lx-acts">${sampleBtn('el-' + e.id)}${(ESIM[e.id] || []).map(simBtn).join('')}</div></div>
      <div class="card"><h3>Choose a scenario</h3><div class="lx-grid">${L.map(x => `<button type="button" class="lx-card ${S.port.pick[id] === x.id ? 'done' : ''}" data-go="portfolio" data-k="${x.id}"><h4>${esc(x.title)}</h4><p class="hint">${esc(x.org)}${S.port.pick[id] === x.id ? ' · ✓ my choice' : ''}</p></button>`).join('') || '<p>Scenarios coming soon.</p>'}</div></div>`;
  }
  function scenView(api, x) {
    const S = store(api), esc = api.esc, tk = S.port.ticks[x.id] || {}, t = tot(x.check), got = sum(x.check, tk);
    const e = ELEMENTS.find(z => z.id === x.el), mine = S.port.pick[x.el] === x.id;
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="portfolio" ${e ? `data-tab="${x.el}"` : 'data-sub="research"'}>← ${e ? 'Element ' + e.n + ': ' + esc(e.name) : 'Research topics'}</button></div>`;
    h += `<div id="lx-print"><div class="card"><span class="kicker">${e ? 'Portfolio element ' + e.n : 'SBA research assignment'} · ${t} marks</span><h2>${esc(x.title)}</h2><p class="hint">${esc(x.org)}</p><div class="html-body">${x.brief}</div><p><b>Label this sample:</b> ${esc(x.label)}</p></div>`;
    if (x.data) h += `<div class="card"><h3>Data / draft to use</h3><div class="lx-doc">${x.data}</div></div>`;
    h += `<div class="card"><h3>Task</h3><ol class="lx-tasks">${x.tasks.map(s => `<li>${s}</li>`).join('')}</ol></div>`;
    h += `<div class="card"><h3>CXC mark scheme for this sample</h3>${checkTable(x.check, tk, 'port:' + x.id, true)}<p><b>Self-check: ${got} / ${t}</b></p>
      <details class="fold"><summary>Mailability checklist (must pass before your teacher signs it)</summary><div><ol class="lx-tasks">${MAIL.map(m => `<li>${m}</li>`).join('')}</ol></div></details></div></div>`;
    h += `<div class="card"><div class="tip"><b>Teacher's tip:</b> ${x.tip}</div><div class="row" style="margin-top:12px">${e ? `<button type="button" class="btn ${mine ? 'ghost' : 'go'}" data-lxact="pick" data-k="${x.id}">${mine ? '✓ In my portfolio' : 'Use this scenario in my portfolio'}</button>` : ''}<button type="button" class="btn ghost" data-lxact="print">🖨 Print brief</button><button type="button" class="btn ghost" data-lxact="dlp" data-k="${x.id}">⬇ Download brief</button></div></div>`;
    return h;
  }

  function download(api, title, sub, body) {
    const name = title.replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 60) + '.html';
    const html = sheetHTML(title, sub, body);
    if (DL) { DL.save({ filename: name, data: html }).catch(e => { if (e && e.code !== 'declined') api.toast('Download is not available here. Use Print instead.'); }); }
    else api.toast('Download is not available here. Use Print instead.');
  }
  function onClick(api, e) {
    const b = e.target.closest('[data-lxact]'); if (!b) return false;
    const S = store(api), k = b.dataset.k, act = b.dataset.lxact;
    if (act === 'print') { window.print(); return true; }
    if (act === 'portpdf') { savePdf(k, m => api.toast(m)); return true; }
    if (act === 'pbdl') { const c = coverOf(api); download(api, 'EDPM Portfolio ' + (c.name || ''), 'Portfolio front matter · ' + (c.school || ''), builderDoc(api)); return true; }
    if (act === 'pbprint') { const w = document.createElement('div'); w.id = 'lx-print'; w.style.cssText = 'position:fixed;left:-99999px;top:0;width:800px;background:#fff;color:#000;font:15px Georgia,serif;padding:20px'; w.innerHTML = builderDoc(api); document.querySelectorAll('#lx-print').forEach(x => x.id = ''); document.body.appendChild(w); setTimeout(() => { window.print(); setTimeout(() => w.remove(), 500); }, 50); return true; }
    if (act === 'labdone') { const st = S.labs[k] = S.labs[k] || { ticks: {} }; const first = !st.done; st.done = 1; api.save(); if (first) api.reward(15, 'Practical lab complete', { xp: 15 }); else api.toast('Lab updated'); api.render(); return true; }
    if (act === 'pick') { const x = PORT().find(z => z.id === k); if (x) { S.port.pick[x.el] = x.id; api.save(); api.toast('Added to your portfolio tracker'); api.render(); } return true; }
    if (act === 'dl') { const x = LABS().find(z => z.id === k); if (x) download(api, x.title, `${SECN[x.sec]} · ${APPS[x.app][0]} · ${x.level} · ${x.time} minutes`, `${x.brief}${x.data ? '<h2>Draft / data</h2><div class="doc">' + x.data + '</div>' : ''}<h2>Instructions</h2><ol>${x.tasks.map(t => '<li>' + t + '</li>').join('')}</ol><h2>Marking checklist</h2><table><tr><th>Criterion</th><th>Marks</th></tr>${x.check.map(r => '<tr><td>' + r.c + '</td><td>' + r.m + '</td></tr>').join('')}<tr><th>Total</th><th>${tot(x.check)}</th></tr></table>`); return true; }
    if (act === 'dlp') { const x = PORT().find(z => z.id === k); if (x) download(api, x.title, `${x.org} · label: ${x.label}`, `${x.brief}${x.data ? '<h2>Data / draft</h2><div class="doc">' + x.data + '</div>' : ''}<h2>Task</h2><ol>${x.tasks.map(t => '<li>' + t + '</li>').join('')}</ol><h2>Mark scheme</h2><table><tr><th>Criterion</th><th>Profile</th><th>Marks</th></tr>${x.check.map(r => '<tr><td>' + r.c + '</td><td>' + r.p + '</td><td>' + r.m + '</td></tr>').join('')}<tr><th colspan="2">Total</th><th>${tot(x.check)}</th></tr></table><h2>Mailability</h2><ol>${MAIL.map(m => '<li>' + m + '</li>').join('')}</ol>`); return true; }
    return false;
  }
  function onField(api, e) {
    const f = e.target.closest('[data-lxf]'); if (!f) return false;
    const S = store(api), [a, b] = f.dataset.lxf.split('.');
    if (a === 'refs') S.port.refs = f.value; else { S.port[a] = S.port[a] || {}; S.port[a][b] = f.value; }
    api.save(); return true;
  }
  function onChange(api, e) {
    if (onField(api, e)) return;
    const cl = e.target.closest('[data-lxcl]'); if (cl) { const S = store(api); S.port.cl = S.port.cl || {}; S.port.cl[cl.dataset.lxcl] = cl.checked ? 1 : 0; api.save(); api.render(); return; }
    const c = e.target.closest('[data-lxtick]'); if (!c) return;
    const S = store(api), key = c.dataset.lxtick, i = +c.dataset.i;
    if (key === 'struct') S.port.struct[i] = c.checked ? 1 : 0;
    else if (key.startsWith('lab:')) { const id = key.slice(4); const st = S.labs[id] = S.labs[id] || { ticks: {} }; st.ticks = st.ticks || {}; st.ticks[i] = c.checked ? 1 : 0; }
    else if (key.startsWith('port:')) { const id = key.slice(5); const t = S.port.ticks[id] = S.port.ticks[id] || {}; t[i] = c.checked ? 1 : 0; }
    api.save(); api.render();
  }
  let wired = false;
  function wire(api) {
    if (wired) return; wired = true;
    document.addEventListener('click', e => { if (onClick(api, e)) { e.preventDefault(); e.stopPropagation(); } }, true);
    document.addEventListener('change', e => onChange(api, e));
    document.addEventListener('input', e => onField(api, e));
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'labs', title: 'Practical Labs',
    tile: { icon: '🧪', meta: 'Word, Access, PowerPoint and Publisher exercises for every section' },
    render(api, loc) { css(); wire(api); const x = LABS().find(z => z.id === loc.k); return x ? labView(api, x) : labsHome(api, loc); }
  }, {
    view: 'portfolio', title: 'Portfolio Studio (SBA)',
    tile: { icon: '📁', meta: 'CXC portfolio scenarios with the official mark schemes and a /85 tracker' },
    render(api, loc) { css(); wire(api); const x = PORT().find(z => z.id === loc.k); if (x) return scenView(api, x); if (loc.tab && loc.tab !== 'research') return elemView(api, loc.tab); if (loc.tab === 'research') return portHome(api, { sub: 'research' }); return portHome(api, loc); }
  });
})();
