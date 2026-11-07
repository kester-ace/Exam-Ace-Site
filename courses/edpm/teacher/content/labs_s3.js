// EDPM practical labs — Section III: Introduction to Application Software
window.EDPM_LABS = (window.EDPM_LABS || []).concat([
  {
    id: 'S3-W1',
    sec: 'S3',
    app: 'word',
    level: 'Starter',
    title: 'Choosing the right software: lab fact sheet',
    time: 35,
    brief: `<p>The ICT teacher at a secondary school in Basseterre wants a one-page fact sheet to pin beside every computer in the lab. It must remind Form 4 students which of the five types of application software to open for a task, and which file extension each type saves with. You will key the fact sheet in Microsoft Word, using a table to organise the information.</p>`,
    data: `<p><b>Heading:</b> CHOOSING THE RIGHT APPLICATION SOFTWARE</p>
<p><b>Introductory paragraph:</b> Application software consists of programs designed to perform specific tasks for the user. Before you begin any task, ask what the finished document mainly needs to do, then open the software built for that job. Use the table below as a guide.</p>
<p><b>Table (key the rows in this order; you will sort them later):</b></p>
<table style="border:1px solid #000">
<thead><tr><th>Software type</th><th>Core purpose</th><th>Example task</th><th>File extension(s)</th></tr></thead>
<tbody>
<tr><td>Word processing</td><td>Creating, editing and formatting text-based documents</td><td>A letter to parents about Heritage Day</td><td>.docx, .doc, .odt, .rtf</td></tr>
<tr><td>Spreadsheet</td><td>Organising data in rows and columns and performing calculations</td><td>Averaging the Form 4B test scores</td><td>.xlsx, .xls, .csv, .ods</td></tr>
<tr><td>Presentation</td><td>Creating slide-based visual aids to support a talk</td><td>A five-minute pitch to a panel of judges</td><td>.pptx, .ppt, .odp, .key</td></tr>
<tr><td>Database management</td><td>Storing, organising and retrieving large collections of structured data</td><td>Storing the records of 1,200 students</td><td>.accdb, .mdb, .db, .sql</td></tr>
<tr><td>Graphic</td><td>Creating, editing and manipulating images and design elements</td><td>Designing a logo for the Frigate Bay Youth Tech Club</td><td>.jpg, .png, .gif, .psd, .svg</td></tr>
</tbody></table>
<p><b>Sub-heading:</b> Computer-based or web-based?</p>
<ul>
<li>Computer-based software must be installed on the computer's hard drive and is usually saved manually.</li>
<li>Web-based software, such as Google Docs, runs inside a browser and saves work automatically to the cloud.</li>
<li>Web-based software lets several users edit the same document at the same time from any device with an internet connection.</li>
</ul>
<p><b>Final note (key in italics):</b> Never change a file extension by renaming a file. Use Save As or Export to change a file's format.</p>`,
    tasks: [
      `Open a new blank Word document. Set the paper size to Letter (8.5 × 11 in), portrait orientation, with 1-inch margins on all sides.`,
      `Key the heading in Arial 16 pt, bold, all capitals, centred. Leave one blank line after it.`,
      `Key the introductory paragraph in Calibri 11 pt, single line spacing, left-aligned.`,
      `Insert a table with 4 columns and 6 rows. Key the column headings in row 1 and the five data rows exactly as given.`,
      `Format the heading row: bold, centred, with light grey shading (about 15%). Set the heading row to repeat as a header row.`,
      `Sort the five data rows in ascending (A–Z) order by the <b>Software type</b> column, leaving the heading row in place.`,
      `Apply all borders (single line, ½ pt) to the table, AutoFit the table to the window and centre it horizontally on the page.`,
      `Key the sub-heading in Arial 12 pt bold, then key the three points as a bulleted list using a round bullet.`,
      `Leave one blank line after the list and key the final note in italics, 11 pt.`,
      `Insert a footer containing the © symbol (inserted from Insert &gt; Symbol, not typed as (c)), your name, Form 4, and the file name, left-aligned in 9 pt.`,
      `Run spelling and grammar check, proofread against the copy, and save the document as <b>S3W1_Software_FactSheet.docx</b>.`
    ],
    skills: ['tables', 'sorting', 'shading', 'bullets', 'headers and footers', 'file extensions'],
    check: [
      { c: 'Page set-up correct: Letter, portrait, 1-inch margins', m: 1 },
      { c: 'Heading Arial 16 pt bold capitals centred; intro paragraph Calibri 11 pt, accurately keyed', m: 2 },
      { c: 'Table has 4 columns and 6 rows, all data keyed accurately (no keying errors)', m: 3 },
      { c: 'Heading row bold, centred and shaded; borders applied; table centred', m: 2 },
      { c: 'Rows sorted A–Z by Software type (Database management, Graphic, Presentation, Spreadsheet, Word processing)', m: 2 },
      { c: 'Sub-heading and three-item bulleted list correct; final note in italics', m: 2 },
      { c: 'Footer with © symbol inserted from the Symbol tool, name, form and file name', m: 2 },
      { c: 'Saved with the correct name and .docx extension; fits on one page', m: 1 }
    ],
    tip: `When sorting a Word table, tick "Header row" in the Sort dialog box, otherwise your column headings will be sorted into the data.`
  },
  {
    id: 'S3-W2',
    sec: 'S3',
    app: 'word',
    level: 'Core',
    title: 'Memo: introducing web-based software',
    time: 45,
    brief: `<p>Bayside Document Services Ltd, a small office-services business in Holetown, is about to start using web-based application software alongside its computer-based programs. The Office Manager, Ms. Marisa Hodge, has handwritten a draft memo to all staff. Key the memo from her manuscript, interpreting the correction signs and expanding the abbreviations, then use two advanced word processing features (Track Changes and comments) to review it before it is sent.</p>`,
    data: `<p><small><b>Key to signs:</b> [NP] = begin a new paragraph here · [run on] = join to the previous paragraph · <del>struck-out</del> [stet] = keep the crossed-out words · <u>underlined</u> words marked [trs] = transpose (reverse the order of) the two underlined words · [uc] = type in capitals · [lc] = change to lower case · ^[word] = insert the word shown.</small></p>
<p>MEMORANDUM</p>
<p>TO: All Office Staff<br>FROM: Marisa Hodge, Office Manager<br>DATE: 16 March 2026<br>SUBJECT: introduction of web-based application software [uc]</p>
<p>As discussed at the staff mtg on Mon. 9 March, the co. will begin using web-based application s/w alongside our existing computer-based programs from 1 Apr. 2026. The change is intended to make it easier for staff to share, edit and store documents.</p>
<p>[NP] Web-based s/w runs inside a web browser and uses remote servers, so nothing needs to be installed on yr computer. Work is saved automatically to the cloud as it is created, and several members of staff can edit the same document <del>at the same time</del> [stet] from any device with an internet connection.</p>
<p>[run on] This will be especially useful for the Accounts Dept., where invoices are <u>checked</u> and <u>prepared</u> [trs] by more than one person.</p>
<p>Please note that computer-based programs such as Microsoft Word and Microsoft Excel will ^[still] be available. These shd be used when there is no internet connection, or when a document contains confidential client inf. A document must always be saved with the correct file extension, e.g. .docx for a letter or .xlsx for a budget.</p>
<p>[NP] A short training session [lc] Will be held in the conference rm on Thurs. 26 March at 2.30 p.m. All staff are asked to attend and to bring a list of the documents they use most often. If you are unable to attend, pls inform me by Wed. 25 March.</p>
<p>MH</p>`,
    tasks: [
      `Open a new blank document. Set 1-inch margins on all sides and use Times New Roman 12 pt throughout, single line spacing, with one blank line between paragraphs (blocked style).`,
      `Key MEMORANDUM in bold capitals, 14 pt, centred. Key the TO, FROM, DATE and SUBJECT lines, aligning the entries with a left tab at 1 inch.`,
      `Type the subject entry in capitals as marked [uc] and bold the whole subject line.`,
      `Key the body of the memo, obeying every correction sign: start new paragraphs at [NP], join the paragraph marked [run on] to the one before it, keep the words marked [stet], transpose the words marked [trs], insert the word marked ^ and change "Will" to lower case.`,
      `Expand every abbreviation in full EXCEPT "e.g.", "p.m." and the file extensions (for example: mtg = meeting, co. = company, s/w = software).`,
      `Key the reference initials MH at the left margin one blank line below the last paragraph.`,
      `Insert a header reading <b>Bayside Document Services Ltd</b> (right-aligned, 10 pt) and a centred page number in the footer.`,
      `Save the document as <b>S3W2_Memo_WebSoftware.docx</b>.`,
      `Turn on <b>Track Changes</b>. In the last paragraph change "2.30 p.m." to "3.00 p.m.", then insert a comment on the word "confidential" that reads: <i>Should we list examples of confidential documents?</i>`,
      `Save the tracked version as <b>S3W2_Memo_Tracked.docx</b>. Then accept the time change, delete the comment, turn Track Changes off and run spelling and grammar check.`,
      `Export the final, clean copy as a PDF named <b>S3W2_Memo_Final.pdf</b> and print it if instructed.`
    ],
    skills: ['manuscript signs', 'abbreviations', 'memo layout', 'track changes', 'comments', 'save as PDF'],
    check: [
      { c: 'Memo heading and TO/FROM/DATE/SUBJECT lines correctly set out; subject in capitals and bold', m: 2 },
      { c: 'Paragraphing correct: new paragraphs at [NP], [run on] paragraph joined (4 body paragraphs in total)', m: 2 },
      { c: 'Stet, transposition (prepared and checked), insertion (still) and lower-case (will) signs all obeyed', m: 3 },
      { c: 'All abbreviations expanded correctly (meeting, Monday, company, software, April, your, Department, should, information, room, Thursday, please, Wednesday); e.g. and p.m. retained', m: 4 },
      { c: 'Accurate keying with no more than one minor error; reference initials present', m: 2 },
      { c: 'Header and page number inserted as instructed', m: 1 },
      { c: 'Tracked version saved showing the time change and comment; final copy clean with change accepted and comment removed', m: 3 },
      { c: 'Final copy exported as PDF with the correct file name', m: 1 }
    ],
    tip: `Read the whole manuscript once before keying: signs such as [run on] and [trs] change the text you have not yet typed, and examiners check every one.`
  },
  {
    id: 'S3-D1',
    sec: 'S3',
    app: 'access',
    level: 'Core',
    title: 'Computer lab software inventory',
    time: 45,
    brief: `<p>The IT technician at a secondary school in Castries keeps a paper list of every application program installed in the two computer labs. She wants a Microsoft Access database so that she can quickly find, for example, every graphic program or every computer-based program in Lab 2, and print a report grouped by the five types of application software.</p>`,
    data: `<p><b>Table name:</b> tblSoftware</p>
<table style="border:1px solid #000">
<thead><tr><th>Field name</th><th>Data type</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>LicenceID</td><td>Short Text (5)</td><td>Primary key</td></tr>
<tr><td>SoftwareName</td><td>Short Text (30)</td><td></td></tr>
<tr><td>Category</td><td>Short Text (20)</td><td>Word processing, Spreadsheet, Database management, Presentation or Graphic</td></tr>
<tr><td>Delivery</td><td>Short Text (15)</td><td>Computer-based or Web-based</td></tr>
<tr><td>Seats</td><td>Number (Integer)</td><td>Number of computers licensed</td></tr>
<tr><td>ReviewDate</td><td>Date/Time (Medium Date)</td><td>Date the licence must be reviewed</td></tr>
<tr><td>Lab</td><td>Short Text (6)</td><td>Lab 1 or Lab 2</td></tr>
</tbody></table>
<p><b>Records:</b></p>
<table style="border:1px solid #000">
<thead><tr><th>LicenceID</th><th>SoftwareName</th><th>Category</th><th>Delivery</th><th>Seats</th><th>ReviewDate</th><th>Lab</th></tr></thead>
<tbody>
<tr><td>SW01</td><td>Microsoft Word</td><td>Word processing</td><td>Computer-based</td><td>30</td><td>30 November 2026</td><td>Lab 1</td></tr>
<tr><td>SW02</td><td>Microsoft Excel</td><td>Spreadsheet</td><td>Computer-based</td><td>30</td><td>30 November 2026</td><td>Lab 1</td></tr>
<tr><td>SW03</td><td>Microsoft Access</td><td>Database management</td><td>Computer-based</td><td>15</td><td>30 November 2026</td><td>Lab 2</td></tr>
<tr><td>SW04</td><td>Microsoft PowerPoint</td><td>Presentation</td><td>Computer-based</td><td>30</td><td>30 November 2026</td><td>Lab 1</td></tr>
<tr><td>SW05</td><td>Google Docs</td><td>Word processing</td><td>Web-based</td><td>40</td><td>15 December 2026</td><td>Lab 2</td></tr>
<tr><td>SW06</td><td>Google Sheets</td><td>Spreadsheet</td><td>Web-based</td><td>40</td><td>15 December 2026</td><td>Lab 2</td></tr>
<tr><td>SW07</td><td>Google Slides</td><td>Presentation</td><td>Web-based</td><td>40</td><td>15 December 2026</td><td>Lab 2</td></tr>
<tr><td>SW08</td><td>GIMP</td><td>Graphic</td><td>Computer-based</td><td>15</td><td>31 December 2026</td><td>Lab 2</td></tr>
<tr><td>SW09</td><td>Inkscape</td><td>Graphic</td><td>Computer-based</td><td>15</td><td>31 December 2026</td><td>Lab 2</td></tr>
<tr><td>SW10</td><td>Canva</td><td>Graphic</td><td>Web-based</td><td>25</td><td>1 December 2026</td><td>Lab 1</td></tr>
<tr><td>SW11</td><td>LibreOffice Base</td><td>Database management</td><td>Computer-based</td><td>15</td><td>31 December 2026</td><td>Lab 1</td></tr>
</tbody></table>`,
    tasks: [
      `Create a new blank desktop database named <b>S3D1_LabSoftware.accdb</b>.`,
      `In Design View, create the table <b>tblSoftware</b> with the seven fields, data types and field sizes shown. Set <b>LicenceID</b> as the primary key and set the format of ReviewDate to Medium Date.`,
      `Add a validation rule to the Delivery field: <b>"Computer-based" Or "Web-based"</b>, with the validation text <i>Enter Computer-based or Web-based</i>.`,
      `Enter all 11 records accurately in Datasheet View. Widen the columns so that all data is visible, then save and close the table.`,
      `Create a query named <b>qryGraphic</b> that shows SoftwareName, Delivery, Seats and Lab for every program whose Category is <b>Graphic</b>, sorted in ascending order by SoftwareName.`,
      `Create a query named <b>qryLab2Installed</b> that uses TWO criteria: Delivery is <b>Computer-based</b> AND Lab is <b>Lab 2</b>. Show LicenceID, SoftwareName, Category and ReviewDate.`,
      `Create a query named <b>qrySeats30Plus</b> that lists every program with 30 or more Seats (criterion <b>&gt;=30</b>), sorted in descending order of Seats.`,
      `Use the Report Wizard to create a report from tblSoftware showing SoftwareName, Delivery, Seats and Lab, grouped by <b>Category</b> and sorted by SoftwareName. Include a Sum of Seats for each group and a grand total.`,
      `Title the report <b>Computer Lab Software Inventory</b>, use landscape orientation, and check in Print Preview that no field is cut off. Save it as <b>rptSoftwareByCategory</b>.`,
      `Print (or export as PDF) the two-criteria query results and the report.`
    ],
    skills: ['table design', 'data types', 'primary key', 'validation rule', 'queries', 'reports'],
    check: [
      { c: 'Table created with seven correctly named fields and appropriate data types; LicenceID is the primary key', m: 3 },
      { c: 'Validation rule and validation text set on Delivery', m: 1 },
      { c: 'All 11 records entered accurately', m: 3 },
      { c: 'qryGraphic returns 3 records (Canva, GIMP, Inkscape) in A–Z order', m: 2 },
      { c: 'qryLab2Installed uses both criteria and returns 3 records (SW03, SW08, SW09)', m: 3 },
      { c: 'qrySeats30Plus returns 6 records sorted by Seats, descending', m: 2 },
      { c: 'Report grouped by Category with group sums (Database management 30, Graphic 55, Presentation 70, Spreadsheet 70, Word processing 70) and grand total 295; titled, landscape, nothing cut off', m: 4 }
    ],
    tip: `Two criteria on the SAME row of the query grid mean AND; criteria on different rows mean OR. Check the number of records returned against what you expect.`
  },
  {
    id: 'S3-P1',
    sec: 'S3',
    app: 'ppt',
    level: 'Challenge',
    title: 'Five tools, one report',
    time: 60,
    brief: `<p>Arima Courier &amp; Print Services prepares a monthly performance report for its manager. The supervisor has asked you to build a short PowerPoint presentation for the Monday staff briefing explaining how all five types of application software are used, step by step, to produce that report. The presentation must also demonstrate several ADVANCED presentation features: the slide master, a chart, custom animation, speaker notes and rehearsed timings.</p>`,
    data: `<p><b>Slide 1 (Title Slide layout)</b><br>Title: Five Tools, One Report<br>Subtitle: How Arima Courier &amp; Print Services prepares its monthly report<br>Your name · Monday 23 March 2026</p>
<p><b>Slide 2 (Title and Content)</b> — Why the right software matters<br>• Each type of software is built for a different kind of task<br>• The wrong tool wastes time and gives a weaker result<br>• Most real tasks use more than one type of software</p>
<p><b>Slide 3 (Title and Content, with chart)</b> — Step 1: Spreadsheet<br>Daily logs are totalled by service type. Chart data, February 2026 income (TT$):</p>
<table style="border:1px solid #000"><thead><tr><th>Service</th><th>Income (TT$)</th></tr></thead><tbody>
<tr><td>Printing</td><td>4,860</td></tr><tr><td>Courier</td><td>3,275</td></tr><tr><td>Binding</td><td>1,140</td></tr><tr><td>Lamination</td><td>725</td></tr><tr><td><b>Total</b></td><td><b>10,000</b></td></tr></tbody></table>
<p><b>Slide 4 (Two Content)</b> — Steps 2 and 3<br>Left: Database management · Client records are queried to find the ten most active clients<br>Right: Graphic software · The logo and section banner are updated with the month and year</p>
<p><b>Slide 5 (Title and Content)</b> — Steps 4 and 5<br>• Word processing: figures, client list and graphics are combined into a formatted report with a table of contents and page numbers<br>• Presentation: key figures are condensed into a five-slide summary for the manager's briefing</p>
<p><b>Slide 6 (Title Only + SmartArt)</b> — The workflow at a glance<br>Basic Process SmartArt with five shapes: Spreadsheet → Database → Graphic → Word processing → Presentation</p>
<p><b>Slide 7 (Title and Content)</b> — Key message<br>Knowing which application to use at each stage — and how to move data between them — turns software skills into workplace competence.<br>Questions?</p>
<p><b>Speaker notes:</b><br>Slide 2: Remind staff that a word processor is for text, a spreadsheet for numbers, a database for records, presentation software for audiences and graphic software for images.<br>Slide 3: Printing earned almost half of February's TT$10,000 income.<br>Slide 4: The query uses the number of jobs as its criterion. The logo is a vector graphic, so it stays sharp at any size.<br>Slide 5: The report is saved as .docx for editing and as .pdf for the manager.<br>Slide 6: Each step feeds the next — data is never retyped.</p>`,
    tasks: [
      `Start a new presentation and apply one design theme of your choice. Save it as <b>S3P1_FiveTools.pptx</b>.`,
      `Open the <b>Slide Master</b>. On the top master slide set the title font to 36 pt and the body text to at least 24 pt, and add a footer reading <b>Arima Courier &amp; Print Services</b> with slide numbers. Close the master and check that the footer and numbers appear on every slide except the title slide.`,
      `Create the seven slides using the layouts and content given. Use no more than two font families.`,
      `On slide 3 insert a clustered column chart from the income data (do not include the Total row in the chart). Add the chart title <b>February 2026 Income (TT$)</b> and data labels.`,
      `On slide 4 insert one relevant picture or icon beside each column of text. Resize each image proportionally (hold Shift or lock the aspect ratio) and recolour both to match the theme.`,
      `On slide 6 insert a Basic Process SmartArt graphic with the five steps in order, and change its colours to match the theme.`,
      `Apply the <b>Fade</b> transition to all slides, duration 1.00 second.`,
      `On slide 2 apply a <b>Fly In</b> (From Left) entrance animation to the bullet points so that they appear one at a time, On Click. On slide 6 apply a <b>Wipe</b> entrance animation to the SmartArt, One by One.`,
      `Type the speaker notes given into the Notes pane for slides 2 to 6.`,
      `Use <b>Rehearse Timings</b> to set a timing for every slide (approximately 20–40 seconds each) and keep the timings.`,
      `Print (or export as PDF) handouts with 4 slides per page, and save the presentation.`
    ],
    skills: ['slide master', 'charts', 'SmartArt', 'custom animation', 'speaker notes', 'rehearse timings'],
    check: [
      { c: 'Seven slides with correct layouts and accurate content; one consistent theme; max two fonts', m: 3 },
      { c: 'Slide master used: footer text and slide numbers on all slides except the title slide; font sizes set on the master', m: 3 },
      { c: 'Correct column chart on slide 3 (four services, Total excluded) with title and data labels', m: 3 },
      { c: 'Images on slide 4 resized proportionally (not distorted) and recoloured', m: 2 },
      { c: 'SmartArt process on slide 6 with the five steps in correct order', m: 2 },
      { c: 'Fade transition on all slides; Fly In and Wipe animations set as instructed', m: 3 },
      { c: 'Speaker notes on slides 2–6 and rehearsed timings saved; handouts 4 per page produced', m: 4 }
    ],
    tip: `Changes made on the Slide Master update every slide at once; if your footer is missing, check Insert &gt; Header &amp; Footer &gt; "Don't show on title slide" and Apply to All.`
  },
  {
    id: 'S3-B1',
    sec: 'S3',
    app: 'pub',
    level: 'Core',
    title: 'Software Skills Week flyer',
    time: 40,
    brief: `<p>The Gros Islet Youth Tech Club is running a free Software Skills Week for teenagers, with one workshop on each type of application software. The club secretary has asked you to design an eye-catching A4 flyer in Microsoft Publisher to display in schools and at the community centre. Use the exact text supplied.</p>`,
    data: `<p><b>Headline (WordArt):</b> SOFTWARE SKILLS WEEK</p>
<p><b>Sub-heading:</b> Pick the right tool for every task!</p>
<p><b>Organiser:</b> Gros Islet Youth Tech Club</p>
<p><b>Programme (key as a table, 3 columns: Day, Date, Workshop):</b></p>
<table style="border:1px solid #000"><thead><tr><th>Day</th><th>Date</th><th>Workshop</th></tr></thead><tbody>
<tr><td>Monday</td><td>13 April 2026</td><td>Word processing: letters that look professional</td></tr>
<tr><td>Tuesday</td><td>14 April 2026</td><td>Spreadsheets: budgets, formulas and charts</td></tr>
<tr><td>Wednesday</td><td>15 April 2026</td><td>Databases: storing and finding records fast</td></tr>
<tr><td>Thursday</td><td>16 April 2026</td><td>Presentations: slides that support your speech</td></tr>
<tr><td>Friday</td><td>17 April 2026</td><td>Graphics: design your own logo</td></tr>
</tbody></table>
<p><b>Details:</b> Time: 4.00 p.m. – 6.00 p.m. daily · Venue: Gros Islet Community Centre · Ages 13 – 18 · FREE admission · Laptops provided</p>
<p><b>Call to action:</b> Register now! Call +1 (758) 544 2187 or visit the community centre office.</p>
<p><b>Footer line:</b> Bring a USB flash drive to save your work.</p>`,
    tasks: [
      `Open a new blank A4 (portrait) publication in Microsoft Publisher and set all margin guides to 1.27 cm. Save it as <b>S3B1_SkillsWeek_Flyer.pub</b>.`,
      `Apply a colour scheme of your choice and use no more than two fonts throughout the flyer.`,
      `Insert the headline as WordArt across the top of the page, at least 40 pt, and apply one WordArt effect (e.g. shadow or transform).`,
      `Insert the sub-heading and organiser name in separate text boxes, centred, in a size between 18 and 24 pt.`,
      `Insert a table of 3 columns and 6 rows for the programme. Bold and shade the heading row and apply a table border.`,
      `Insert one relevant picture (for example, a computer or laptop). Resize it proportionally and apply a picture style or border.`,
      `Place the Details in a text box with a coloured fill and a 3 pt line border. Separate the items with bullets or line breaks so they are easy to read.`,
      `Insert the Call to action in a shape (such as an explosion or rounded rectangle) with the text bold and at least 16 pt.`,
      `Add a page border from Borders &amp; Accents (or a decorative line) and key the Footer line at the bottom of the page in italics.`,
      `Check that all objects are aligned within the margin guides, nothing overlaps unintentionally, and there are no spelling errors. Save, then export as <b>S3B1_SkillsWeek_Flyer.pdf</b>.`
    ],
    skills: ['WordArt', 'text boxes', 'tables', 'pictures', 'shapes', 'borders'],
    check: [
      { c: 'A4 portrait with correct margins; consistent colour scheme; maximum two fonts', m: 2 },
      { c: 'WordArt headline at least 40 pt with an effect', m: 2 },
      { c: 'Programme table complete and accurate (5 days, correct dates and workshops) with shaded heading row and border', m: 3 },
      { c: 'Relevant picture resized proportionally with style or border', m: 2 },
      { c: 'Details box with fill and 3 pt border; call to action in a shape, bold, at least 16 pt', m: 3 },
      { c: 'Page border and italic footer line present', m: 1 },
      { c: 'All text accurate; objects aligned within margins; balanced, uncluttered layout; saved as .pub and .pdf', m: 3 }
    ],
    tip: `Use Publisher's alignment guides and Arrange &gt; Align to line objects up; a flyer with uneven margins loses presentation marks.`
  }
]);
