// EDPM — Practical labs, Section II: Keyboard Mastery
window.EDPM_LABS = (window.EDPM_LABS || []).concat([
  {
    id: 'S2-W1',
    sec: 'S2',
    app: 'word',
    level: 'Challenge',
    title: 'Keyboarding Club report from a marked-up manuscript',
    time: 50,
    brief: `<p>The Secretary of the Breadfruit Valley Secondary Touch Keyboarding Club has drafted the club's end-of-term report by hand. The report will be presented to the Head of the Department of Business &amp; Technology Studies on 4 December 2026. The draft contains manuscript signs (shown in square brackets), abbreviations to expand, figures to correct and several heading types. Produce a mailable typescript.</p>`,
    data: `<p><b>Key to the draft:</b> [uc] = change to capitals; [lc] = change to lower case (initial capitals only); [NP] = new paragraph; [run on] = join to the previous paragraph; [trs] = transpose the words between bars | |; [stet] = keep the crossed-out word; [sp] = spell out in full; [insert: ...] = insert the words shown; [#] = insert a space; [close up] = remove the space; [inset] = indent the paragraph 1.27 cm from both margins; <del>struck text</del> = delete.</p>
<p>[uc] touch keyboarding club</p>
<p>Report on Term 1, 2026</p>
<p>[lc] MEMBERSHIP</p>
<p>The Touch Keyboarding Club met every Tues. &amp; Thurs. from 3:00 pm to 4:00 pm in Computer Lab 1. A total of 24 students joined in Sept., i.e. 14 from Form 3 &amp; 10 from Form 4. [sp] 3 more students joined after the mid-term break, bringing the membership to 27.[NP] Each session began with a five-minute |drill warm-up| [trs] on the home row, followed by a timed test and practice with special keys, shortcut keys and function keys.</p>
<p>[lc] PROGRESS TOWARDS THE BENCHMARK</p>
<p>Speed [paragraph heading] At the start of term the average net speed of the members was approx. 22 wpm. By the end of Nov. the average had risen to 31 wpm, and 9 members had reached the CSEC benchmark of 35 wpm.</p>
<p>Accuracy [paragraph heading] The cttee <del>recorded</del> [stet] the error rate for every test. Most members kept their error rate below 5 per cent, but some sacrificed accuracy for speed.</p>
<p>[run on] These members will repeat slow, careful drills <del>very</del> in Term 2. The club motto, taken from the EDPM textbook, sums up this approach:</p>
<p>[inset] "Accuracy should never be sacrificed for the sake of typing faster, since correcting errors afterwards costs more time ... "</p>
<p>[lc] PLANS FOR TERM 2</p>
<p>The club will hold a 35 wpm Challenge in Feb. next year. Certificates will be presented to all members who reach the benchmark within a 5 per cent error rate. A request for 6 split key boards [close up] and 10 wristrests [#] has been recd by the [insert: Business and Technology Studies] dept.</p>
<p>Club Secretary<br>4 December 2026</p>`,
    tasks: [
      `Set A4 portrait, margins 2.54 cm all round, Calibri 12 pt, 1.15 line spacing, blocked paragraphs with 12 pt spacing after each paragraph.`,
      `Type the <b>main heading</b> in capitals, bold, 14 pt, centred. Type the <b>sub-heading</b> "Report on Term 1, 2026" in bold, 12 pt, centred, one line below.`,
      `Type the three <b>shoulder headings</b> (Membership; Progress Towards the Benchmark; Plans for Term 2) at the left margin, bold, initial capitals only, each on a line of its own.`,
      `Type <b>Speed</b> and <b>Accuracy</b> as <b>paragraph headings</b>: underlined, followed by a full stop and one space, with the paragraph text continuing on the same line.`,
      `Apply every manuscript sign: [uc], [lc], [NP], [run on], [trs] ("warm-up drill"), [stet] ("recorded" kept), [sp], the insertion, the deletion of "very", the close-up ("keyboards") and the space ("wrist rests").`,
      `Expand the abbreviations: Tues. → Tuesday, Thurs. → Thursday, Sept. → September, Nov. → November, Feb. → February, &amp; → and, approx. → approximately, cttee → committee, recd → received, dept. → department. Keep i.e., wpm, CSEC and pm.`,
      `Apply the figures rule: spell out numbers one to nine in words (three, nine, six) but keep numerals for 10 and above, times, dates, percentages, names such as Form 3, Term 2 and Lab 1, and "35 wpm".`,
      `Format the quotation as an <b>inset paragraph</b>: indented 1.27 cm from both the left and right margins, italic. Keep the ellipsis with one space before it and close the space before the closing quotation mark.`,
      `Type the signature lines at the left margin, two clear lines below the last paragraph. Insert a page number at the bottom centre.`,
      `Proofread against the manuscript in two passes, then save as <b>S2W1_ClubReport_YourName</b>.`
    ],
    skills: ['manuscript signs', 'abbreviations', 'types of headings', 'inset paragraph', 'figures rule', 'proofreading'],
    check: [
      { c: 'Page setup, font, line spacing and blocked paragraph style correct', m: 1 },
      { c: 'Main heading and sub-heading correctly formatted and centred', m: 2 },
      { c: 'Three shoulder headings at left margin, bold, initial capitals', m: 2 },
      { c: 'Speed and Accuracy typed as underlined paragraph headings run on with the text', m: 2 },
      { c: 'All manuscript signs applied (trs, stet, NP, run on, insertion, deletion, close-up, space)', m: 4 },
      { c: 'All ten abbreviations expanded; i.e., wpm, CSEC and pm retained', m: 3 },
      { c: 'Figures rule applied: three, nine, six spelled out; 10, 14, 24, 27 and 35 in numerals', m: 2 },
      { c: 'Inset, italic quotation with correct ellipsis; signature block and page number; mailable', m: 2 }
    ],
    tip: `A shoulder heading stands on a line by itself at the left margin; a paragraph heading starts the paragraph and the text continues on the same line.`
  },
  {
    id: 'S2-W2',
    sec: 'S2',
    app: 'word',
    level: 'Starter',
    title: 'Shortcut keys quick-reference card and spacing drill',
    time: 30,
    brief: `<p>Your EDPM teacher wants a quick-reference card for the keyboard keys every Form 3 student should know, to be laminated and kept beside each keyboard in Computer Lab 1. Below the table, you will also key in a short spacing drill, correcting every spacing error before and after punctuation marks and symbols.</p>`,
    data: `<p style="text-align:center"><b>KEYBOARD QUICK-REFERENCE CARD</b></p>
<table>
<thead><tr><th>Key</th><th>Type of key</th><th>Function</th></tr></thead>
<tbody>
<tr><td>Ctrl + C</td><td>Shortcut key</td><td>Copies the selected text or object.</td></tr>
<tr><td>Tab</td><td>Special key</td><td>Moves the cursor to the next tab stop.</td></tr>
<tr><td>F7</td><td>Function key</td><td>Starts a spelling and grammar check.</td></tr>
<tr><td>Ctrl + V</td><td>Shortcut key</td><td>Pastes copied or cut content at the cursor.</td></tr>
<tr><td>Insert</td><td>Special key</td><td>Switches between Insert mode and Overtype mode.</td></tr>
<tr><td>F12</td><td>Function key</td><td>Opens the Save As dialog box.</td></tr>
<tr><td>Ctrl + Z</td><td>Shortcut key</td><td>Undoes the most recent action.</td></tr>
<tr><td>Backspace</td><td>Special key</td><td>Deletes the character to the left of the cursor.</td></tr>
<tr><td>F5</td><td>Function key</td><td>Refreshes the window or starts a slide show.</td></tr>
<tr><td>Alt + Tab</td><td>Shortcut key</td><td>Switches between open windows.</td></tr>
<tr><td>Delete</td><td>Special key</td><td>Deletes the character to the right of the cursor.</td></tr>
<tr><td>F1</td><td>Function key</td><td>Opens the Help menu.</td></tr>
</tbody>
</table>
<p><b>SPACING DRILL</b> (key in each sentence with the spacing corrected)</p>
<ol>
<li>The bus leaves St. George’s at 7:15 a.m. ;it reaches Grand Anse by 7:40 a.m .</li>
<li>Did you save the file ?Press Ctrl + S now !</li>
<li>The teacher ' s notes ( see page 4 )are on the desk .</li>
<li>Bring the following : a flash drive , earphones and a pencil.</li>
<li>Our club is well - known in Grenada–everyone wants to join.</li>
<li>" Proofread twice , " said the instructor .</li>
</ol>`,
    tasks: [
      `Open a new document. Set A4 portrait with 2 cm margins all round. Use Arial 11 pt throughout unless told otherwise.`,
      `Key in the main heading in capitals, bold, 16 pt, centred, with 12 pt spacing after.`,
      `Insert a 3-column table with a header row and the 12 key rows. Make the header row bold with light grey shading and set it to repeat as a header row.`,
      `Sort the table by <b>Type of key</b> (ascending) and then by <b>Key</b> (ascending), keeping the header row in place.`,
      `Set the first two columns to 3 cm and the third column to 10 cm. Centre the text in the first two columns; left-align the Function column. Apply all borders.`,
      `Leave one blank line after the table and type <b>SPACING DRILL</b> as a shoulder heading (bold, left margin).`,
      `Key in the six sentences as a numbered list, correcting every spacing error: no space before a full stop, comma, semicolon, colon, question mark or exclamation mark and one space after; no spaces inside quotation marks or brackets; no space around a hyphen; one space either side of a dash.`,
      `Insert a footer with your name at the left and the current date (field) at the right, 9 pt.`,
      `Use Ctrl + S to save the document as <b>S2W2_QuickRef_YourName</b>, then press F7 and correct any remaining errors.`
    ],
    skills: ['tables', 'table sorting', 'spacing rules', 'numbered lists', 'shortcut keys'],
    check: [
      { c: 'Page setup, font and centred bold main heading', m: 1 },
      { c: 'Table complete: header row plus 12 key rows keyed accurately', m: 3 },
      { c: 'Header row bold, shaded, repeating; column widths, alignment and borders set', m: 2 },
      { c: 'Sorted by type then key (Function key: F1, F12, F5, F7; Shortcut key: Alt + Tab, Ctrl + C, Ctrl + V, Ctrl + Z; Special key: Backspace, Delete, Insert, Tab)', m: 2 },
      { c: 'Sentences 1–3 correct: "...at 7:15 a.m.; it reaches Grand Anse by 7:40 a.m." / "Did you save the file? Press Ctrl + S now!" / "The teacher\'s notes (see page 4) are on the desk."', m: 3 },
      { c: 'Sentences 4–6 correct: "Bring the following: a flash drive, earphones and a pencil." / "...well-known in Grenada – everyone..." / ""Proofread twice," said the instructor."', m: 3 },
      { c: 'Footer with name and date field; saved with the correct file name', m: 1 }
    ],
    tip: `Word sorts text such as F1, F12, F5, F7 character by character, so F12 comes before F5; this is correct for a text sort.`
  },
  {
    id: 'S2-D1',
    sec: 'S2',
    app: 'access',
    level: 'Core',
    title: 'Typing speed and accuracy log database',
    time: 55,
    brief: `<p>The EDPM teacher at Palmetto Point Secondary records the results of timed typing tests taken by Forms 3A and 3B during the week of 5–9 October 2026. She wants a database that calculates each student's gross speed, net speed and error rate, and lists the students who have met the CSEC benchmark of 35 wpm (net) within a 5 per cent error rate.</p>`,
    data: `<p><b>Table name:</b> tblTypingTests &nbsp; <b>Primary key:</b> TestID</p>
<table>
<thead><tr><th>Field name</th><th>Data type</th><th>Field size / format</th></tr></thead>
<tbody>
<tr><td>TestID</td><td>Short Text</td><td>3</td></tr>
<tr><td>FirstName</td><td>Short Text</td><td>20</td></tr>
<tr><td>LastName</td><td>Short Text</td><td>20</td></tr>
<tr><td>Form</td><td>Short Text</td><td>2</td></tr>
<tr><td>TestDate</td><td>Date/Time</td><td>Medium Date</td></tr>
<tr><td>Minutes</td><td>Number</td><td>Integer</td></tr>
<tr><td>WordsTyped</td><td>Number</td><td>Integer (standard 5-stroke words)</td></tr>
<tr><td>Errors</td><td>Number</td><td>Integer</td></tr>
</tbody>
</table>
<p><b>Records</b></p>
<table>
<thead><tr><th>TestID</th><th>FirstName</th><th>LastName</th><th>Form</th><th>TestDate</th><th>Minutes</th><th>WordsTyped</th><th>Errors</th></tr></thead>
<tbody>
<tr><td>T01</td><td>Aaliyah</td><td>Brooks</td><td>3A</td><td>5 October 2026</td><td>5</td><td>190</td><td>4</td></tr>
<tr><td>T02</td><td>Marcus</td><td>Lake</td><td>3B</td><td>5 October 2026</td><td>5</td><td>160</td><td>6</td></tr>
<tr><td>T03</td><td>Tiana</td><td>Richards</td><td>3A</td><td>6 October 2026</td><td>5</td><td>200</td><td>12</td></tr>
<tr><td>T04</td><td>Dion</td><td>Halley</td><td>3B</td><td>6 October 2026</td><td>3</td><td>108</td><td>3</td></tr>
<tr><td>T05</td><td>Keisha</td><td>Gumbs</td><td>3A</td><td>7 October 2026</td><td>5</td><td>185</td><td>5</td></tr>
<tr><td>T06</td><td>Jordan</td><td>Wilkes</td><td>3B</td><td>7 October 2026</td><td>3</td><td>99</td><td>2</td></tr>
<tr><td>T07</td><td>Naomi</td><td>Peters</td><td>3A</td><td>8 October 2026</td><td>5</td><td>225</td><td>9</td></tr>
<tr><td>T08</td><td>Elijah</td><td>Fleming</td><td>3B</td><td>8 October 2026</td><td>3</td><td>120</td><td>9</td></tr>
<tr><td>T09</td><td>Shania</td><td>Yorke</td><td>3A</td><td>9 October 2026</td><td>5</td><td>170</td><td>3</td></tr>
<tr><td>T10</td><td>Tyrese</td><td>Cartwright</td><td>3B</td><td>9 October 2026</td><td>5</td><td>210</td><td>7</td></tr>
</tbody>
</table>
<p><b>Formulas (from Chapter 2):</b> GWPM = WordsTyped ÷ Minutes; NWPM = GWPM − (Errors ÷ Minutes); Error rate (%) = (Errors ÷ WordsTyped) × 100.</p>`,
    tasks: [
      `Create a new blank database named <b>S2D1_TypingLog_YourName</b>.`,
      `Create <b>tblTypingTests</b> in Design View with the field names, data types and sizes given. Set <b>TestID</b> as the primary key and give Minutes a validation rule of <b>3 Or 5</b>.`,
      `Enter all 10 records accurately, then sort the datasheet by LastName (ascending).`,
      `Create a simple query <b>qryFiveMinuteTests</b> showing FirstName, LastName, Form and WordsTyped for tests where Minutes = <b>5</b>. Sort by WordsTyped descending. (Expected: 7 records, first record Naomi Peters, 225.)`,
      `Create a query <b>qrySpeedResults</b> containing TestID, FirstName, LastName, Form and three calculated fields: <b>GWPM: [WordsTyped]/[Minutes]</b>, <b>NWPM: [WordsTyped]/[Minutes]-[Errors]/[Minutes]</b> and <b>ErrorRate: [Errors]/[WordsTyped]*100</b>. Set all three to Fixed format with 1 decimal place.`,
      `Check your calculated values against these: T01 38.0 / 37.2 / 2.1; T04 36.0 / 35.0 / 2.8; T08 40.0 / 37.0 / 7.5.`,
      `Create a query with two criteria <b>qryBenchmarkMet</b> based on qrySpeedResults: NWPM <b>&gt;=35</b> AND ErrorRate <b>&lt;=5</b>, sorted by NWPM descending. (Expected: 5 records — Peters, Cartwright, Brooks, Gumbs, Halley.)`,
      `Create a report <b>rptSpeedByForm</b> based on qrySpeedResults, grouped by Form and sorted by LastName, showing LastName, FirstName, GWPM, NWPM and ErrorRate, with the <b>average</b> NWPM for each form.`,
      `Title the report <b>Timed Typing Test Results, 5–9 October 2026</b>. Confirm the form averages: 3A = 37.5 wpm and 3B = 35.1 wpm. Make sure no data is cut off.`,
      `Save all objects with the names given and print preview the two-criteria query and the report.`
    ],
    skills: ['table design', 'primary key', 'calculated fields', 'select queries', 'two-criteria query', 'grouped report'],
    check: [
      { c: 'Table with correct fields, data types, TestID primary key and validation rule', m: 3 },
      { c: 'All 10 records entered accurately', m: 2 },
      { c: 'Simple query: Minutes = 5, sorted descending, 7 records', m: 2 },
      { c: 'Three calculated fields correct and formatted to 1 decimal place', m: 3 },
      { c: 'Two-criteria query: NWPM >= 35 AND ErrorRate <= 5, 5 records, sorted descending', m: 3 },
      { c: 'Report grouped by Form with average NWPM (3A 37.5, 3B 35.1), titled, no truncation', m: 4 },
      { c: 'All objects saved with the required names', m: 1 }
    ],
    tip: `T03 and T08 type fast enough but fail on accuracy (error rate above 5 per cent); speed alone does not meet the CSEC standard.`
  },
  {
    id: 'S2-P1',
    sec: 'S2',
    app: 'ppt',
    level: 'Core',
    title: 'Touch keyboarding basics presentation',
    time: 45,
    brief: `<p>The Form 3 EDPM class will run a peer-teaching session for the new Form 2 students during Orientation Week. Prepare a presentation that introduces the home row, correct posture, the most useful special, shortcut and function keys, and how typing speed and accuracy are calculated.</p>`,
    data: `<p><b>Slide 1 (Title slide)</b><br>Title: Touch Keyboarding Basics<br>Subtitle: EDPM Peer Teaching · Form 3 · Mahoe Grove High School</p>
<p><b>Slide 2: The Home Row</b><br>Left hand: A, S, D, F<br>Right hand: J, K, L, ;<br>Thumbs rest lightly on the space bar<br>Feel the raised bumps on F and J; do not look down</p>
<p><b>Slide 3: Sit Correctly</b><br>Back straight and supported<br>Feet flat; knees at about a right angle<br>Forearms parallel to the floor<br>Screen at or slightly below eye level, at arm's length<br>Wrists straight, hovering above the keys</p>
<p><b>Slide 4: Keys That Save Time</b><br>(Table: 3 columns × 4 rows)<br>Special keys | Shortcut keys | Function keys<br>Tab | Ctrl + C (copy) | F1 (Help)<br>Backspace | Ctrl + Z (undo) | F7 (spell check)<br>Insert | Ctrl + S (save) | F12 (Save As)</p>
<p><b>Slide 5: Calculating Speed and Accuracy</b><br>Gross wpm = words typed ÷ minutes<br>Net wpm = gross wpm − (errors ÷ minutes)<br>Error rate = (errors ÷ words typed) × 100</p>
<p><b>Slide 6: Worked Example</b><br>190 words in 5 minutes with 5 errors<br>Gross speed: 190 ÷ 5 = 38 wpm<br>Net speed: 38 − (5 ÷ 5) = 37 wpm<br>Error rate: (5 ÷ 190) × 100 = 2.6%<br>Result: benchmark met (35 wpm within 5%)</p>
<p><b>Slide 7: Practice Makes Perfect</b><br>Start every session on the home row<br>Drill your weakest keys<br>Accuracy first, then speed<br>Time yourself every week</p>
<p><b>Speaker notes</b><br>Slide 2: Demonstrate the home row on the projected on-screen keyboard.<br>Slide 4: Ask the audience to try Ctrl + Z after deleting a word.<br>Slide 6: Remind students that every five keystrokes, including spaces, count as one word.</p>`,
    tasks: [
      `Create a new presentation and save it as <b>S2P1_Keyboarding_YourName</b>. Apply one design theme to all slides.`,
      `Use the Title Slide layout for slide 1 and Title and Content for slides 2–7. Key in all content exactly as given.`,
      `On slide 2 insert a picture of a keyboard (or draw the home-row keys using shapes) and label the F and J keys.`,
      `On slide 4 insert a table of 3 columns and 4 rows; make the header row bold and apply a table style from the theme.`,
      `On slide 6 make the line <i>Result: benchmark met (35 wpm within 5%)</i> bold and in a contrasting colour.`,
      `Apply the <b>Push</b> transition (from bottom) to all slides, duration 0.75 seconds, on mouse click.`,
      `Apply a <b>Wipe</b> (from left) entrance animation to the bullets on slides 3, 5 and 6 so that each line appears on click.`,
      `Insert slide numbers on all slides except the title slide, and the footer <i>Keyboard Mastery · Section II</i>.`,
      `Type the speaker notes for slides 2, 4 and 6.`,
      `Rehearse the slide show (F5) and print the Notes Pages for slides 2, 4 and 6.`
    ],
    skills: ['slide layouts', 'tables on slides', 'transitions', 'animations', 'speaker notes'],
    check: [
      { c: 'Seven slides, correct layouts and a single design theme', m: 2 },
      { c: 'All content keyed accurately; figures on slide 6 correct', m: 3 },
      { c: 'Keyboard picture or shapes with F and J labelled on slide 2', m: 1 },
      { c: 'Table on slide 4 with 3 columns, 4 rows, bold header and table style', m: 2 },
      { c: 'Push transition, 0.75 s, applied to all slides', m: 2 },
      { c: 'Wipe animation on slides 3, 5 and 6, one line at a time', m: 2 },
      { c: 'Slide numbers and footer on slides 2–7; speaker notes on slides 2, 4 and 6', m: 2 }
    ],
    tip: `Keep text on slides short and put the explanation in the speaker notes; the notes are marked as part of the presentation.`
  },
  {
    id: 'S2-B1',
    sec: 'S2',
    app: 'pub',
    level: 'Core',
    title: 'Keyboard Mastery Week tri-fold brochure',
    time: 50,
    brief: `<p>The Department of Business &amp; Technology Studies is holding Keyboard Mastery Week from Monday 9 November to Friday 13 November 2026. Design a two-page, three-panel (tri-fold) brochure that promotes the week and summarises the key manuscript signs, heading types and the CSEC speed benchmark for students and parents.</p>`,
    data: `<p><b>PAGE 1 (outside)</b></p>
<p><b>Panel 3 (front cover):</b><br>KEYBOARD MASTERY WEEK<br>9–13 November 2026<br>Type smarter. Type faster. Type accurately.<br>Breadfruit Valley Secondary · Department of Business &amp; Technology Studies</p>
<p><b>Panel 2 (back cover):</b><br>Contact us<br>EDPM Teacher, Computer Lab 1<br>Breadfruit Valley Secondary, Roseau, Dominica<br>Tel. +1 (767) 542 3361<br>All Form 2, 3 and 4 students are welcome. Entry is free.</p>
<p><b>Panel 1 (inside flap): The Week at a Glance</b></p>
<table>
<thead><tr><th>Day</th><th>Activity</th><th>Time and place</th></tr></thead>
<tbody>
<tr><td>Monday 9 November</td><td>Home-row warm-up relay</td><td>3:00 pm, Computer Lab 1</td></tr>
<tr><td>Tuesday 10 November</td><td>Posture check clinic</td><td>3:00 pm, Computer Lab 2</td></tr>
<tr><td>Wednesday 11 November</td><td>Manuscript signs treasure hunt</td><td>3:00 pm, Library</td></tr>
<tr><td>Thursday 12 November</td><td>Shortcut keys quiz</td><td>3:00 pm, Computer Lab 1</td></tr>
<tr><td>Friday 13 November</td><td>35 wpm Challenge and prize-giving</td><td>2:30 pm, Auditorium</td></tr>
</tbody>
</table>
<p><b>PAGE 2 (inside)</b></p>
<p><b>Panel 1: Know Your Manuscript Signs</b><br>NP — begin a new paragraph<br>run on — join to the previous paragraph<br>stet — leave the original text as it was<br>trs — transpose (reverse the order)<br>uc / lc — change to capitals / lower case<br># — insert a space</p>
<p><b>Panel 2: Headings That Guide the Reader</b><br>Main heading — the title, centred, often in capitals<br>Sub-heading — introduces a major section<br>Shoulder heading — at the left margin on a line of its own<br>Paragraph heading — starts the paragraph; text follows on the same line<br>Marginal heading — a label in the margin beside the text</p>
<p><b>Panel 3: The 35 wpm Challenge</b><br>The CSEC benchmark is 35 words per minute within a 5 per cent error rate.<br>Example: 190 words in 5 minutes with 5 errors<br>Gross speed = 38 wpm · Net speed = 37 wpm · Error rate = 2.6%<br>Prizes for the fastest accurate typist in each form!</p>`,
    tasks: [
      `Create a blank A4 publication, landscape, with 2 pages. Set margin guides of 1.27 cm and column guides of 3 columns with a 1.5 cm gutter. Save as <b>S2B1_KMWBrochure_YourName</b>.`,
      `On page 1 place the panels in the correct order: inside flap (left), back cover (centre), front cover (right).`,
      `Create the front-cover title as WordArt, at least 36 pt. Add the dates and slogan in text boxes below it, centred, and insert one relevant picture (e.g. a keyboard).`,
      `On the inside flap insert the 3-column, 6-row timetable as a Publisher table with a shaded header row; text 10 pt.`,
      `Key in the back-cover contact details, centred, 11 pt, and place the school name in bold.`,
      `On page 2 create one text box per panel with a heading of 16 pt bold and body text of 11 pt. Use a bulleted list for the manuscript signs and the heading types.`,
      `Place the 35 wpm Challenge example in a shape (e.g. a rounded rectangle) with a light fill so that it stands out.`,
      `Use the same two fonts and a colour scheme of no more than three main colours on both pages. Make sure every object stays within its column guides.`,
      `Check the brochure in Two-Page Spread view, run the spelling check, then save and print double-sided (flip on the short edge).`
    ],
    skills: ['tri-fold layout', 'WordArt', 'tables', 'text boxes', 'shapes', 'colour scheme'],
    check: [
      { c: 'A4 landscape, 2 pages, 3 column guides; saved with the correct name', m: 2 },
      { c: 'Page 1 panels in the correct order for folding', m: 2 },
      { c: 'WordArt cover title, dates, slogan and relevant picture', m: 2 },
      { c: 'Timetable table complete and accurate with shaded header row', m: 3 },
      { c: 'Page 2 panels keyed accurately with headings and bulleted lists', m: 3 },
      { c: 'Challenge example in a shape; figures correct (38 / 37 / 2.6%)', m: 2 },
      { c: 'Consistent fonts and colours; all objects within guides; no spelling errors', m: 2 }
    ],
    tip: `On a tri-fold, the front cover is the RIGHT panel of page 1 and the back cover is the MIDDLE panel; fold a sheet of paper to check before you print.`
  }
]);
