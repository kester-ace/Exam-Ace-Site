/* CSEC Information Technology · Paper 032 Centre: the practical alternative to the SBA, explained, with a skills checklist, timing plan and practice papers. — Developed by Kester Small */
(function () {
  var SKILLS = [
    { id: 'word', icon: '📘', t: 'Word processing', sim: 'wordsim', page: 'games/wordsim.html?level=3', items: [
      ['w1', 'Format text, paragraphs and pages: fonts, alignment, line spacing, margins, orientation'],
      ['w2', 'Insert and format a table, picture, header, footer and page numbers'],
      ['w3', 'Apply Heading 1 and Heading 2 styles and insert an automatic table of contents'],
      ['w4', 'Update a table of contents after adding a heading (Update entire table)'],
      ['w5', 'Mail merge: primary document, data source (CSV), merge fields, preview'],
      ['w6', 'Filter and sort mail-merge recipients; merge to letters, labels or envelopes'],
      ['w7', 'Build a fillable form: text, drop-down, date picker and check box controls'],
      ['w8', 'Protect a form so only the fields can be filled in (Restrict Editing)'],
      ['w9', 'Use section breaks, columns, footnotes and endnotes']
    ] },
    { id: 'web', icon: '🌐', t: 'Web page design', sim: 'websim', page: 'games/websim.html?level=3', items: [
      ['h1', 'Plan with a site map and a wireframe (storyboard)'],
      ['h2', 'Insert a logo image with alternative (alt) text'],
      ['h3', 'Build a navigation bar linking to other pages'],
      ['h4', 'Link to a bookmark on the same page (href="#id" with a matching id)'],
      ['h5', 'Link to an e-mail address (mailto:)'],
      ['h6', 'Link to a user-created file (e.g. a .docx you made)'],
      ['h7', 'Add a table, consistent colours and fonts, a title and a footer'],
      ['h8', 'Evaluate a page: accuracy, usability, display on devices, accessibility, load time']
    ] },
    { id: 'excel', icon: '🟩', t: 'Spreadsheets', sim: 'excelsim', page: 'games/excelsim.html?level=3', items: [
      ['s1', 'Import a CSV file and save it as a workbook'],
      ['s2', 'Write formulas with + - * / and brackets; SUM, AVERAGE, MAX, MIN, COUNT'],
      ['s3', 'Use IF, COUNTIF, RANK and VLOOKUP correctly'],
      ['s4', 'Use absolute references ($L$2) and copy formulas with the fill handle'],
      ['s5', 'Format as currency, percentage and set decimal places'],
      ['s6', 'Sort on a primary and a secondary key'],
      ['s7', 'Filter data (text and number filters) and copy results to a new sheet'],
      ['s8', 'Create a chart with a title, axis titles, data labels; move it to its own sheet'],
      ['s9', 'Rename sheets and reference another sheet (Sheet!A1); summarise with a pivot table']
    ] },
    { id: 'access', icon: '🗃️', t: 'Databases', sim: 'accesssim', page: 'games/accesssim.html?level=3', items: [
      ['d1', 'Import CSV files as tables and set the correct data types'],
      ['d2', 'Set primary keys and add validation rules and text'],
      ['d3', 'Create a one-to-many relationship and enforce referential integrity'],
      ['d4', 'Build a query with criteria (=, <, >, Between, Like, AND on one row, OR on two)'],
      ['d5', 'Build a query that uses TWO tables'],
      ['d6', 'Add a calculated field, e.g. Balance: [Price]-[Paid]'],
      ['d7', 'Create a parameter query and a totals (Group By) query'],
      ['d8', 'Create a main form with a subform and enter a record through it'],
      ['d9', 'Create a report grouped and sorted, with Sum or Count, and an exact two-line title']
    ] },
    { id: 'code', icon: '🐍', t: 'Problem-solving and programming', sim: 'codelab', page: 'games/codelab.html?level=3', items: [
      ['p1', 'Write a problem statement and an IPO (defining) chart'],
      ['p2', 'Identify variables and constants with data types'],
      ['p3', 'Write pseudocode with selection (IF / ELSE IF) and loops (FOR, WHILE, REPEAT)'],
      ['p4', 'Use counters, accumulators, a highest/lowest value and a sentinel value'],
      ['p5', 'Stop a loop on a sentinel OR a maximum number of iterations'],
      ['p6', 'Draw a flowchart with the correct symbols'],
      ['p7', 'Complete a trace table, one row per pass, with the final output'],
      ['p8', 'Write, run and debug the program in Python (Pascal or VBA accepted)'],
      ['p9', 'Choose normal, boundary and erroneous test data and record the output']
    ] }
  ];
  var FALLBACK = [
    { id: 'CSEC032P1', title: 'Practice 1 · Youth Parliament Elections', d: 'Candidate letters and a polling-agent form; Vote Youth SXM page; turnout spreadsheet; results database; ballot counter.' },
    { id: 'CSEC032P2', title: 'Practice 2 · Carnival Village Committee', d: 'Vendor form and handbook TOC; events page; booth sales spreadsheet; costume payments database; Calypso Monarch judging.' },
    { id: 'CSEC032P3', title: 'Practice 3 · Inter-Schools Sports Federation', d: 'Coach letters and programme; results page; medal-points spreadsheet; athletes database; 100 m heat times.' }
  ];
  var TIMING = [
    ['0:00 – 0:10', 'Read the whole case study. Download every data file. Create a folder named with your candidate number and save each file there as you go.'],
    ['0:10 – 0:30', 'Question 1 · Word processing (about 8 marks): letters, mail merge, form or table of contents.'],
    ['0:30 – 0:45', 'Question 2 · Web page (about 7 marks): logo, navigation, all four link types.'],
    ['0:45 – 1:10', 'Question 3 · Spreadsheet (about 10 marks): formulas first, then formatting, sort, chart, filter.'],
    ['1:10 – 1:35', 'Question 4 · Database (about 10 marks): keys and relationship, queries, form, report and title.'],
    ['1:35 – 1:55', 'Question 5 · Problem-solving (15 marks): pseudocode, trace table, program, run it and record the output.'],
    ['1:55 – 2:00', 'Check file names, save everything, print or capture evidence exactly as instructed.']
  ];
  var TIPS = [
    'Save early and often (Ctrl+S) — after every part, not at the end. A crash at minute 110 must not cost you the paper.',
    'Use the exact file, sheet, query, form and report names in the question. Examiners look for them.',
    'Type titles exactly as given, including both lines of a report title and the capital letters.',
    'Do the marks you can get quickly first. Formulas and queries are worth more than colours and fonts.',
    'Formulas: start with =, use $ for any single cell every row depends on, and check one result with a calculator.',
    'Database criteria on the SAME row mean AND; on different rows mean OR. Dates go in # signs in Access.',
    'Never sort the totals row with the data. Select only the data rows and headings.',
    'For the program, run it with the given test data and copy the actual output into your answer.',
    'Print or take screenshots of evidence only as the invigilator instructs: formula view for spreadsheets, Design View for queries, Code view for web pages, and the program listing plus its output.',
    'Put your candidate number in the header or footer of every printout if you are told to.'
  ];

  function done(S, k) { return !!(S.p032chk && S.p032chk[k]); }
  function countDone(S, list) { var n = 0; list.forEach(function (it) { if (done(S, it[0])) n++; }); return n; }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'p032',
    title: 'Paper 032 Centre',
    tile: { icon: '🧪', meta: 'The practical alternative to the SBA: format, marking, skills checklist, timing plan, exam-room tips and three full practice papers' },
    render: function (api, loc) {
      var esc = api.esc, S = api.S || {};
      var all = [];
      SKILLS.forEach(function (g) { all = all.concat(g.items); });
      var total = all.length, got = countDone(S, all);
      var papers = (window.COURSE_PAPERS || []).filter(function (p) { return p && p.kind === 'p032'; });
      var plist = papers.length ? papers.map(function (p) { return { id: p.id, title: p.title, d: (p.questions || []).map(function (q) { return q.title.replace(/^Question \d+ · /, ''); }).join(' · ') }; }) : FALLBACK;

      var h = '<div class="hero"><span class="eyebrow">Grade One Practicals</span><h1>Paper 032 Centre</h1>' +
        '<p>Paper 032 is the practical examination that private candidates sit instead of the School-Based Assessment. It tests the same skills as the SBA, under exam conditions, in two hours.</p>' +
        '<div class="row"><button type="button" class="btn gold" data-go="paper" data-p="' + esc(plist[0].id) + '">Start Practice Paper 1</button></div></div>';

      h += '<div class="card"><span class="kicker">The paper at a glance</span><h2>What Paper 032 is</h2>' +
        '<div class="tiles">' +
        '<div class="tile"><span class="ticon">⏱️</span><h3>2 hours</h3><span class="meta">One sitting, at a computer, with the data files supplied.</span></div>' +
        '<div class="tile"><span class="ticon">🧩</span><h3>5 questions</h3><span class="meta">All compulsory, built around one Caribbean case study.</span></div>' +
        '<div class="tile"><span class="ticon">💯</span><h3>50 marks</h3><span class="meta">Worth 25% of your final grade, the same weight as the SBA (Paper 031).</span></div>' +
        '<div class="tile"><span class="ticon">🎓</span><h3>Who sits it</h3><span class="meta">Private candidates, who cannot complete a school SBA, sit Paper 032 instead.</span></div>' +
        '</div>' +
        '<p class="lead">Your grade still comes from Paper 01 (60 multiple-choice items, 30%), Paper 02 (four structured questions, 45%) and either the SBA or Paper 032 (25%). Paper 032 tests exactly what the SBA tests: using word processing, web page design, spreadsheets and databases to solve a problem, and designing, tracing and programming an algorithm.</p></div>';

      h += '<div class="card"><h2>How it is marked</h2><div class="tablewrap"><table><thead><tr><th>Part</th><th>Typical question</th><th>Marks</th></tr></thead><tbody>' +
        '<tr><td>Productivity tools</td><td>Q1 Word processing (letters, mail merge, fillable form, table of contents)</td><td>≈ 8</td></tr>' +
        '<tr><td></td><td>Q2 Web page design (logo, navigation, hyperlinks)</td><td>≈ 7</td></tr>' +
        '<tr><td></td><td>Q3 Spreadsheet (functions, absolute references, chart, sort, filter)</td><td>≈ 10</td></tr>' +
        '<tr><td></td><td>Q4 Database (tables and keys, queries, form and subform, grouped report)</td><td>≈ 10</td></tr>' +
        '<tr><td><b>Productivity total</b></td><td></td><td><b>35</b></td></tr>' +
        '<tr><td>Problem-solving and programming</td><td>Q5 Problem statement, pseudocode or flowchart, trace table, program and test output</td><td><b>15</b></td></tr>' +
        '<tr><td><b>Total</b></td><td></td><td><b>50</b></td></tr></tbody></table></div>' +
        '<p class="hint">The split between the four productivity questions varies from paper to paper; the 35 / 15 balance is what to plan around. Marks are given for each requirement that your evidence shows, so a missing printout or screenshot means a missing mark.</p>' +
        (api.teacherEdition ? '<div class="tip"><b>Teacher note:</b> each practice paper includes a CXC-style mark scheme (one mark per requirement) under <i>Marking key</i>, a full model solution, and Foundation and Challenge versions of every question. Use the Foundation versions for students who are still building tool skills, and the Challenge versions as extension for Grade One candidates.</div>' : '') +
        '</div>';

      h += '<div class="card" id="p032-check"><div class="row" style="justify-content:space-between"><h2>My skills checklist</h2><span class="pill ' + (got === total ? 'ok' : 'mark') + '" id="p032-count">' + got + ' / ' + total + ' ready</span></div>' +
        '<p class="hint">Tick each skill once you can do it without help. Your ticks are saved on this device. Open the lab beside each tool to practise.</p>';
      SKILLS.forEach(function (g) {
        var n = countDone(S, g.items);
        h += '<details class="fold"' + (n < g.items.length ? ' open' : '') + '><summary>' + g.icon + ' ' + esc(g.t) + ' <span class="pill ' + (n === g.items.length ? 'ok' : 'no') + '" data-p32g="' + g.id + '">' + n + ' / ' + g.items.length + '</span></summary><div>' +
          '<div class="list">' + g.items.map(function (it) {
            return '<label class="lrow"><input type="checkbox" data-p32="' + it[0] + '" data-p32grp="' + g.id + '"' + (done(S, it[0]) ? ' checked' : '') + '> <span class="t">' + esc(it[1]) + '</span></label>';
          }).join('') + '</div>' +
          '<div class="row"><button type="button" class="btn ghost" data-gx="opengame" data-page="' + g.page + '" data-id="' + g.sim + '">' + g.icon + ' Practise in the lab</button></div></div></details>';
      });
      h += '</div>';

      h += '<div class="card"><h2>A timing plan for 2 hours</h2><div class="tablewrap"><table><thead><tr><th>Time</th><th>What to do</th></tr></thead><tbody>' +
        TIMING.map(function (r) { return '<tr><td><b>' + r[0] + '</b></td><td>' + esc(r[1]) + '</td></tr>'; }).join('') +
        '</tbody></table></div><p class="hint">About 2.4 minutes per mark. If a part is stuck for more than five minutes, leave a note of what you tried and move on: an unanswered question earns zero, a partly done one earns marks.</p></div>';

      h += '<div class="card"><h2>Exam-room tips</h2><ul class="list">' + TIPS.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
        '<div class="tip"><b>File naming:</b> use the names in the question (for example <code>Turnout</code>, <code>ResultsLetter</code>, <code>BallotCounter</code>), save them all in one folder, and do not overwrite the supplied data files: save your work under the new name.</div></div>';

      h += '<div class="card"><h2>Practice papers</h2><p class="hint">Each paper has a case study, downloadable CSV data, five questions with simulator links, a mark scheme and a model solution. Every question can be dialled down (Foundation) or up (Grade One challenge).</p><div class="list">' +
        plist.map(function (p, i) {
          var st = 0, pd = (S.pdone || {});
          for (var k = 0; k < 5; k++) if (pd['pp-' + p.id + '-' + k]) st++;
          return '<button type="button" class="lrow" data-go="paper" data-p="' + esc(p.id) + '"><span class="t"><b>' + esc(p.title) + '</b><br><span class="hint">' + esc(p.d) + '</span></span><span class="s">' + st + ' of 5 answered</span></button>';
        }).join('') + '</div></div>';

      h += '<div class="card"><h2>The course labs</h2><p class="hint">No Office at home? Every Paper 032 task can be practised in the labs. The Excel Lab and the Access Lab import the papers\' CSV files through <b>File ▸ Open ▸ Import a CSV file</b>.</p><div class="tiles">' +
        SKILLS.map(function (g) { return '<button type="button" class="tile" data-gx="opengame" data-page="' + g.page + '" data-id="' + g.sim + '"><span class="ticon">' + g.icon + '</span><h3>' + esc(g.t) + '</h3><span class="meta">Level 3 missions</span></button>'; }).join('') +
        '</div></div>';

      h += '<div class="card"><h2>Mock exam mode</h2><ol>' +
        '<li>Open a practice paper and press <b>Start 120-minute timer</b> at the top. The timer turns red in the last 10 minutes.</li>' +
        '<li>Work in real Word, Excel, Access and a code editor, or in the labs, exactly as in the exam. Do not open the model answers.</li>' +
        '<li>For each question, record your evidence in the answer box: formulas, query designs, HTML, your pseudocode, trace table, program and output.</li>' +
        '<li>Submit each question for feedback. The model answer and the CXC-style marking key unlock after you submit, so you can mark yourself out of 50.</li>' +
        '<li>Redo the questions where you lost the most marks in their Challenge version a week later.</li></ol>' +
        '<details class="fold"><summary>How the mark is turned into your grade</summary><div><p>Paper 032 is weighted to 25% of your final result, the same as the SBA. A score of 40/50 on Paper 032 is worth as much as an SBA scored 40/50, so a strong practical can lift a borderline grade.</p></div></details></div>';
      return h;
    },
    mount: function (api, loc, stage) {
      if (!stage) return;
      var boxes = stage.querySelectorAll('input[data-p32]');
      Array.prototype.forEach.call(boxes, function (cb) {
        cb.addEventListener('change', function () {
          var S = api.S;
          S.p032chk = S.p032chk || {};
          if (cb.checked) S.p032chk[cb.getAttribute('data-p32')] = true; else delete S.p032chk[cb.getAttribute('data-p32')];
          api.save();
          var grp = cb.getAttribute('data-p32grp'), g = null;
          SKILLS.forEach(function (x) { if (x.id === grp) g = x; });
          var all = [];
          SKILLS.forEach(function (x) { all = all.concat(x.items); });
          var n = countDone(S, all), total = all.length;
          var c = stage.querySelector('#p032-count');
          if (c) { c.textContent = n + ' / ' + total + ' ready'; c.className = 'pill ' + (n === total ? 'ok' : 'mark'); }
          if (g) {
            var gn = countDone(S, g.items), gp = stage.querySelector('[data-p32g="' + grp + '"]');
            if (gp) { gp.textContent = gn + ' / ' + g.items.length; gp.className = 'pill ' + (gn === g.items.length ? 'ok' : 'no'); }
            if (gn === g.items.length && api.toast) api.toast(g.t + ': every skill ticked. You are ready for that question.');
          }
        });
      });
    }
  });
})();
