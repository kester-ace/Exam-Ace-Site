// EDPM — Practical labs, Section I: Fundamentals of Computing
window.EDPM_LABS = (window.EDPM_LABS || []).concat([
  {
    id: 'S1-W1',
    sec: 'S1',
    app: 'word',
    level: 'Starter',
    title: 'Input and output devices fact sheet',
    time: 35,
    brief: `<p>The Head of the Department of Business &amp; Technology Studies at Hummingbird Ridge High School wants a one-page fact sheet to pin beside each workstation in Computer Lab 1. It must explain, in a clear table, what each common input and output device does, so that Form 3 students can identify the devices they use every day. You will key in the text and the table, then format the page so that it is ready to print.</p>`,
    data: `<p style="text-align:center"><b>INPUT AND OUTPUT DEVICES</b></p>
<p style="text-align:center">A Fact Sheet for Computer Lab 1</p>
<p>A computer is an electronic machine or device that accepts and processes data to produce information. Data enters the computer through input devices, and processed information is delivered back to the user through output devices. Some devices, such as touchscreens, perform both jobs through the same component.</p>
<table>
<thead><tr><th>Device Category</th><th>Device</th><th>Function</th></tr></thead>
<tbody>
<tr><td>Input</td><td>Keyboard</td><td>Allows the user to type text, numbers and commands into the computer.</td></tr>
<tr><td>Output</td><td>Monitor</td><td>Displays visual output such as text, images and video.</td></tr>
<tr><td>Input</td><td>Scanner</td><td>Converts printed text, images or documents into digital form.</td></tr>
<tr><td>Output</td><td>Printer</td><td>Produces a permanent, physical (hard copy) version of a digital document or image.</td></tr>
<tr><td>Input</td><td>Microphone</td><td>Captures sound and speech for recording, communication or voice-command input.</td></tr>
<tr><td>Output</td><td>Projector</td><td>Enlarges and displays visual output onto a screen or wall for group viewing.</td></tr>
<tr><td>Input</td><td>Biometric device</td><td>Reads a unique physical characteristic of the user, such as a fingerprint, to confirm identity.</td></tr>
<tr><td>Output</td><td>Speaker</td><td>Produces audio output such as sound effects, music or spoken feedback.</td></tr>
<tr><td>Input/Output</td><td>Braille display</td><td>Converts on-screen text into raised Braille characters and, on some models, allows Braille entry.</td></tr>
<tr><td>Input</td><td>Graphics tablet</td><td>Allows an artist or designer to draw or trace an image using a stylus on a pressure-sensitive surface.</td></tr>
</tbody>
</table>
<p>Remember: always handle devices with clean, dry hands and report any damaged equipment to the lab technician at once.</p>`,
    tasks: [
      `Open a new blank Word document. Set the page to A4, portrait, with margins of 2.54 cm (1 inch) on all sides.`,
      `Key in the main heading <b>INPUT AND OUTPUT DEVICES</b> in Arial 16 pt, bold, centred. Key in the sub-heading below it in Arial 13 pt, bold, centred.`,
      `Key in the introductory paragraph in Arial 12 pt, fully justified, with 1.15 line spacing and 6 pt spacing after.`,
      `Insert a table of 3 columns and 11 rows. Key in the header row and the ten device rows exactly as given.`,
      `Format the header row: bold, centred, white text on a dark blue shading, and set it to <i>Repeat as header row</i>.`,
      `Sort the ten body rows by <b>Device Category</b> (ascending) and then by <b>Device</b> (ascending), keeping the header row in place.`,
      `Set the column widths to approximately 3.5 cm, 4 cm and 8.5 cm. Apply all borders (single line, 1/2 pt) to the table and centre the table horizontally on the page.`,
      `Key in the final "Remember" paragraph below the table, leaving one blank line after the table. Make the word <b>Remember:</b> bold.`,
      `Insert a header with the text <i>Hummingbird Ridge High School · Department of Business &amp; Technology Studies</i> (right-aligned, 9 pt) and a footer with your name at the left and the page number at the right.`,
      `Run a spelling and grammar check (F7), proofread against the source, then save the document as <b>S1W1_Devices_YourName</b> and print preview it.`
    ],
    skills: ['tables', 'table sorting', 'headers and footers', 'paragraph formatting', 'margins'],
    check: [
      { c: 'A4 portrait, 2.54 cm margins all round', m: 1 },
      { c: 'Main heading and sub-heading correct font, size, bold, centred', m: 2 },
      { c: 'Paragraph justified, 1.15 line spacing, Arial 12 pt', m: 1 },
      { c: 'Table complete and accurate: 3 columns, header row plus 10 device rows, no keying errors', m: 4 },
      { c: 'Header row bold, shaded, set to repeat; borders applied; table centred', m: 2 },
      { c: 'Rows sorted by category then device (Input rows first: Biometric device, Graphics tablet, Keyboard, Microphone, Scanner)', m: 2 },
      { c: 'Header and footer present with correct content and page number', m: 2 },
      { c: 'Document saved with the correct file name; mailable (no spelling or spacing errors)', m: 2 }
    ],
    tip: `When sorting a table, always tick "Header row" in the Sort dialog box, or Word will sort your column headings into the data.`
  },
  {
    id: 'S1-W2',
    sec: 'S1',
    app: 'word',
    level: 'Core',
    title: 'Caring for the computer lab: notice from a manuscript',
    time: 40,
    brief: `<p>The ICT Coordinator has handwritten a draft notice on caring for computers and peripherals. It will be displayed on the notice board outside Computer Lab 2 and e-mailed to all Form 3 and Form 4 students before the new term begins on 7 September 2026. The draft contains manuscript correction signs (shown in square brackets) and abbreviations that must be expanded. Produce a mailable typescript.</p>`,
    data: `<p><b>Key to the draft:</b> [uc] = change to capitals; [lc] = change to lower case; [NP] = start a new paragraph here; [run on] = join to the previous paragraph; [trs] = transpose the words marked between bars | |; [stet] = keep the crossed-out word; [insert: ...] = insert the words shown; [#] = insert a space; [close up] = remove the space; <del>struck text</del> = delete.</p>
<p>[uc] caring for computers and peripherals</p>
<p>Computer Lab 2 is used by approx. 280 students every wk. To keep the equipment in good working order &amp; to protect your files, all users must follow the guidelines below.</p>
<p>[run on] The guidelines apply to every class, club and after-school session held in the lab.</p>
<p>[lc] CARING FOR COMPUTERS</p>
<p>The I.T. dept. will keep the operating system and |software installed| [trs] up to date to close known security gaps. Anti-virus software is installed on every machine and its virus definitions are updated <del>daily</del> [stet]. Do not switch off the firewall for any reason. Save your work on the school network and keep a second copy in your cloud storage account, so that your files are kept in more than one location.[NP] Screens must be cleaned only with the soft, non-abrasive cloths provided by the technician. <del>Never</del> Eating and drinking are not permitted [insert: anywhere] in the lab, because spills and crumbs damage keyboards and system units.</p>
<p>[lc] CARING FOR PERIPHERALS</p>
<p>Always use the <i>Safely Remove Hardware</i> option before you disconnect a flash drive or portable hard disk; removing it while files are open may cause data loss or cor rupted [close up] files. Every workstation is connected to a surge protector, which shields the computer from sudden power spikes. Do not unplug the surge protectors or plug in extra devices without permission.[NP] Report any damaged mouse, keyboard or headset to the technician on the same day.[#]Further info. is available from the ICT Coordinator in Rm 14, Admin bldg.</p>
<p>ICT Coordinator<br>Hummingbird Ridge High School, Kingston<br>Tel. +1 (876) 927 3361</p>`,
    tasks: [
      `Set A4 portrait with left and right margins of 3 cm and top and bottom margins of 2.5 cm. Use Times New Roman 12 pt for the body text.`,
      `Key in the main heading in capitals, bold, 14 pt, centred, as instructed by the [uc] sign.`,
      `Apply every manuscript sign correctly: new paragraphs, the run-on, the transposition, the stet, the insertion, the deletions, the space and the close-up.`,
      `Expand all abbreviations: approx. → approximately, wk → week, &amp; → and, dept. → department, info. → information, Rm → Room, bldg → Building. Leave I.T. and ICT as they are, and keep Tel. in the signature block.`,
      `Type the two section headings as shoulder headings: change them to initial capitals only (lower case as marked), bold, at the left margin, on a line of their own.`,
      `Use blocked paragraphs with one clear line space (or 12 pt spacing after) between paragraphs and 1.15 line spacing.`,
      `Check that there is one space after every full stop and comma, and no space before any punctuation mark.`,
      `Type the signature block at the left margin, single spaced, two clear lines below the last paragraph.`,
      `Insert a footer, centred, 9 pt: <i>Computer Lab 2 · Notice issued 7 September 2026</i>.`,
      `Proofread against the draft in two passes (content first, then spelling and spacing). Save as <b>S1W2_LabCare_YourName</b>.`
    ],
    skills: ['manuscript signs', 'abbreviations', 'shoulder headings', 'blocked paragraphs', 'proofreading'],
    check: [
      { c: 'Margins, font and line spacing set as instructed', m: 1 },
      { c: 'Main heading in capitals, bold, 14 pt, centred', m: 1 },
      { c: 'Shoulder headings in lower case with initial capitals, bold, at left margin', m: 2 },
      { c: 'New paragraphs and run-on applied correctly (five body paragraphs in the final copy)', m: 2 },
      { c: 'Transposition ("installed software"), stet ("updated daily" kept) and insertion ("anywhere") applied', m: 3 },
      { c: 'Deletion of "Never", close-up of "corrupted" and the missing space after "same day." applied', m: 2 },
      { c: 'All seven abbreviations expanded correctly', m: 3 },
      { c: 'Footer correct; document mailable with no keying, spacing or punctuation errors', m: 2 }
    ],
    tip: `Read the whole manuscript once and mark every sign on the printed draft before you start keying; examiners deduct for each sign that is missed.`
  },
  {
    id: 'S1-D1',
    sec: 'S1',
    app: 'access',
    level: 'Challenge',
    title: 'Computer lab equipment inventory database',
    time: 60,
    brief: `<p>The lab technician at Sandbox Tree College needs an electronic inventory of the hardware in Computer Labs 1 and 2. The database must show what each device is (input, output, storage, input/output or power protection), where it is kept, what it cost in US dollars and whether it is still under warranty. The Principal has asked for a report showing the value of the equipment in each lab before the budget meeting on 21 October 2026.</p>`,
    data: `<p><b>Table name:</b> tblEquipment &nbsp; <b>Primary key:</b> AssetID</p>
<table>
<thead><tr><th>Field name</th><th>Data type</th><th>Field size / format</th></tr></thead>
<tbody>
<tr><td>AssetID</td><td>Short Text</td><td>7</td></tr>
<tr><td>DeviceName</td><td>Short Text</td><td>40</td></tr>
<tr><td>Category</td><td>Short Text</td><td>20</td></tr>
<tr><td>Room</td><td>Short Text</td><td>10</td></tr>
<tr><td>PurchaseDate</td><td>Date/Time</td><td>Medium Date</td></tr>
<tr><td>CostUSD</td><td>Currency</td><td>Currency, 2 decimal places</td></tr>
<tr><td>Condition</td><td>Short Text</td><td>10</td></tr>
<tr><td>UnderWarranty</td><td>Yes/No</td><td>Yes/No</td></tr>
</tbody>
</table>
<p><b>Records</b></p>
<table>
<thead><tr><th>AssetID</th><th>DeviceName</th><th>Category</th><th>Room</th><th>PurchaseDate</th><th>CostUSD</th><th>Condition</th><th>UnderWarranty</th></tr></thead>
<tbody>
<tr><td>LAB-001</td><td>USB keyboard</td><td>Input</td><td>Lab 1</td><td>15 January 2024</td><td>18.50</td><td>Good</td><td>No</td></tr>
<tr><td>LAB-002</td><td>Optical mouse</td><td>Input</td><td>Lab 1</td><td>15 January 2024</td><td>12.00</td><td>Fair</td><td>No</td></tr>
<tr><td>LAB-003</td><td>23-inch LED monitor</td><td>Output</td><td>Lab 1</td><td>15 January 2024</td><td>189.00</td><td>Good</td><td>Yes</td></tr>
<tr><td>LAB-004</td><td>Laser printer</td><td>Output</td><td>Lab 2</td><td>4 September 2023</td><td>329.99</td><td>Good</td><td>No</td></tr>
<tr><td>LAB-005</td><td>Flatbed scanner</td><td>Input</td><td>Lab 2</td><td>4 September 2023</td><td>145.00</td><td>Good</td><td>No</td></tr>
<tr><td>LAB-006</td><td>Multimedia projector</td><td>Output</td><td>Lab 2</td><td>10 February 2025</td><td>549.00</td><td>Good</td><td>Yes</td></tr>
<tr><td>LAB-007</td><td>Portable hard disk 2 TB</td><td>Storage</td><td>Lab 1</td><td>10 February 2025</td><td>89.95</td><td>Good</td><td>Yes</td></tr>
<tr><td>LAB-008</td><td>Interactive touchscreen display</td><td>Input/Output</td><td>Lab 2</td><td>18 August 2025</td><td>1,250.00</td><td>Good</td><td>Yes</td></tr>
<tr><td>LAB-009</td><td>Graphics tablet with stylus</td><td>Input</td><td>Lab 2</td><td>6 May 2024</td><td>239.00</td><td>Fair</td><td>Yes</td></tr>
<tr><td>LAB-010</td><td>Stereo speakers (pair)</td><td>Output</td><td>Lab 1</td><td>4 September 2023</td><td>35.00</td><td>Poor</td><td>No</td></tr>
<tr><td>LAB-011</td><td>Fingerprint scanner</td><td>Input</td><td>Lab 1</td><td>18 August 2025</td><td>75.00</td><td>Good</td><td>Yes</td></tr>
</tbody>
</table>
<p><small>Check totals: Lab 1 = US$419.45 (6 items); Lab 2 = US$2,512.99 (5 items); Grand total = US$2,932.44 (11 items).</small></p>`,
    tasks: [
      `Create a new blank database and save it as <b>S1D1_LabInventory_YourName</b>.`,
      `Create the table <b>tblEquipment</b> in Design View using the field names, data types and field sizes given. Set <b>AssetID</b> as the primary key.`,
      `Set the <b>Required</b> property of DeviceName and Room to Yes, and give CostUSD a validation rule of <b>&gt;0</b> with the validation text <i>Cost must be greater than zero</i>.`,
      `Enter all 11 records exactly as given in Datasheet View. Adjust column widths so that all data is visible, then sort the datasheet by AssetID (ascending).`,
      `Create a simple query <b>qryInputDevices</b> that shows AssetID, DeviceName, Room and CostUSD for all records where Category is <b>"Input"</b>. Sort by DeviceName ascending. (Expected: 5 records.)`,
      `Create a query with two criteria <b>qryLab2Over200</b> that shows AssetID, DeviceName, CostUSD and UnderWarranty for equipment in <b>"Lab 2"</b> AND with CostUSD <b>&gt;200</b>. Sort by CostUSD descending. (Expected: 4 records.)`,
      `Create a query <b>qryNeedsAttention</b> that lists devices whose Condition is <b>"Fair"</b> OR <b>"Poor"</b> (expected: 3 records).`,
      `Use the Report Wizard to create <b>rptEquipmentByRoom</b> based on tblEquipment: show DeviceName, Category, PurchaseDate and CostUSD, grouped by Room, sorted by DeviceName, with the Sum of CostUSD for each room and a grand total.`,
      `Give the report the title <b>Computer Lab Equipment Inventory</b>, use landscape orientation, and make sure no field or total is cut off (####). Confirm that the room totals are US$419.45 and US$2,512.99 and the grand total is US$2,932.44.`,
      `Print preview the table, both main queries and the report. Save all objects with the names given.`
    ],
    skills: ['table design', 'data types', 'primary key', 'select queries', 'two-criteria query', 'grouped report'],
    check: [
      { c: 'Table created with correct field names, data types and AssetID as primary key', m: 3 },
      { c: 'Required property and validation rule/text set', m: 1 },
      { c: 'All 11 records entered accurately', m: 3 },
      { c: 'Simple query: Category = "Input", correct fields, sorted, 5 records', m: 2 },
      { c: 'Two-criteria query: Room = "Lab 2" AND CostUSD > 200, sorted descending, 4 records', m: 3 },
      { c: 'OR query for Fair/Poor condition returns 3 records', m: 1 },
      { c: 'Report grouped by Room with correct room totals and grand total, titled, landscape', m: 4 },
      { c: 'All objects saved with the required names; no truncated data', m: 1 }
    ],
    tip: `Two criteria on the SAME criteria row mean AND; criteria on DIFFERENT rows mean OR. Check your record count against the expected answer.`
  },
  {
    id: 'S1-P1',
    sec: 'S1',
    app: 'ppt',
    level: 'Core',
    title: 'Healthy and safe computing presentation',
    time: 45,
    brief: `<p>The Guidance Counsellor at Coralstone College has asked the Form 3 EDPM class to prepare a short presentation for the Health and Wellness assembly on 12 November 2026. It must explain how computer use affects health, how good ergonomics and posture reduce the risks, how accessibility features support differently abled users, and how students can reduce the environmental impact of computers.</p>`,
    data: `<p><b>Slide 1 (Title slide)</b><br>Title: Healthy and Safe Computing<br>Subtitle: Health and Wellness Assembly · Coralstone College · 12 November 2026</p>
<p><b>Slide 2: How Computer Use Affects Our Health</b><br>Physical: eye strain, headaches, back and neck pain<br>Repetitive strain injury (RSI) from repeated movements<br>Mental: difficulty concentrating, anxiety and disrupted sleep from too much screen time<br>Social: easy contact with family abroad, but less face-to-face time</p>
<p><b>Slide 3: What is Ergonomics?</b><br>Ergonomics is the design of equipment and workstations to suit the people who use them<br>Adjustable chairs with lumbar support<br>Sit-stand desks and monitor arms<br>Lighting that reduces screen glare</p>
<p><b>Slide 4: The Correct Posture Checklist</b><br>Back straight and supported; shoulders relaxed<br>Feet flat on the floor; knees at about a right angle<br>Forearms parallel to the floor<br>Top of the screen at or slightly below eye level, at arm's length<br>Wrists straight; take a short break every 30 minutes</p>
<p><b>Slide 5: Technology for Everyone</b><br>Screen readers read on-screen text aloud<br>Braille displays turn text into raised Braille characters<br>Voice recognition lets users speak commands<br>Adjustable text size and colour contrast</p>
<p><b>Slide 6: Caring for Our Environment</b><br>Switch off monitors and printers at the end of the day<br>Print only when necessary and print double-sided<br>Recycle old devices responsibly; never dump e-waste<br>Look after devices so that they last longer</p>
<p><b>Slide 7: Remember</b><br>Sit well · Take breaks · Use technology responsibly<br>Questions?</p>
<p><b>Speaker notes</b><br>Slide 2: Explain that the effects can be positive as well as negative, depending on how long and how well we use computers.<br>Slide 4: Invite one student to demonstrate the correct posture at a laptop while the checklist is read.<br>Slide 6: Mention that e-waste contains materials that can pollute the soil and the sea around Barbados.</p>`,
    tasks: [
      `Create a new presentation and save it as <b>S1P1_HealthySafe_YourName</b>.`,
      `Apply one consistent design theme. Use the Title Slide layout for slide 1 and the Title and Content layout for slides 2 to 7.`,
      `Key in the content for all seven slides exactly as given. Each bullet must be one line or less; use 28 pt or larger for bullet text.`,
      `On slide 3 insert a suitable picture or icon of an ergonomic workstation, placed so that it does not cover any text.`,
      `On slide 4 convert the five bullets into a SmartArt graphic (e.g. Vertical Bullet List) or apply a numbered list.`,
      `Apply the <b>Fade</b> transition to all slides with a duration of 1.00 second, advancing on mouse click.`,
      `Apply a <b>Fly In</b> (from left) entrance animation to the bullet points on slides 2, 5 and 6 so that they appear one at a time on click.`,
      `Insert slide numbers and the footer text <i>EDPM Form 3 · Healthy and Safe Computing</i> on all slides except the title slide.`,
      `Type the speaker notes for slides 2, 4 and 6 in the Notes pane.`,
      `Run the slide show from the beginning (F5) to check the transitions and animations, then print the slides as handouts, 4 slides per page.`
    ],
    skills: ['design themes', 'slide layouts', 'transitions', 'animations', 'speaker notes'],
    check: [
      { c: 'Seven slides with correct layouts and a consistent theme', m: 2 },
      { c: 'Content keyed accurately with no spelling errors', m: 3 },
      { c: 'Picture inserted on slide 3 without covering text; SmartArt or numbered list on slide 4', m: 2 },
      { c: 'Fade transition, 1.00 s, applied to all slides', m: 2 },
      { c: 'Fly In animation on bullets of slides 2, 5 and 6, one at a time', m: 2 },
      { c: 'Slide numbers and footer on slides 2–7 only', m: 2 },
      { c: 'Speaker notes typed for slides 2, 4 and 6; handouts printed 4 per page', m: 2 }
    ],
    tip: `Use the same transition throughout; too many different effects distract the audience and lose marks for consistency.`
  },
  {
    id: 'S1-B1',
    sec: 'S1',
    app: 'pub',
    level: 'Core',
    title: 'Safe computer use poster',
    time: 40,
    brief: `<p>The Student Council of Bayleaf Hill Secondary wants an eye-catching A4 poster for both computer labs and the library to remind students of the rules for safe and responsible computer use. You will design the poster in Microsoft Publisher using the exact wording supplied.</p>`,
    data: `<p><b>Heading (WordArt):</b> SAFE COMPUTER USE</p>
<p><b>Sub-heading:</b> Protect yourself. Protect the equipment.</p>
<p><b>Six rules (one per text box or as a bulleted list):</b></p>
<ol>
<li>Sit up straight with your feet flat on the floor.</li>
<li>Keep the top of the screen at eye level, at arm's length.</li>
<li>Take a short break every 30 minutes and rest your eyes.</li>
<li>No food or drinks near the computers.</li>
<li>Always eject flash drives safely before removing them.</li>
<li>Never share your password; log off when you leave.</li>
</ol>
<p><b>Call-out (in a shape):</b> Report damaged equipment to the lab technician today!</p>
<p><b>Footer:</b> Bayleaf Hill Secondary Student Council · Computer Labs 1 and 2 · Belize City, Belize</p>`,
    tasks: [
      `Open Publisher and create a blank A4 portrait publication. Set all margin guides to 1.5 cm. Save it as <b>S1B1_SafePoster_YourName</b>.`,
      `Insert the heading as WordArt across the top of the page, at least 48 pt, centred between the margin guides.`,
      `Insert a text box below the heading for the sub-heading: 24 pt, italic, centred.`,
      `Insert the six rules as a numbered list in one text box (or six separate text boxes in a grid), 20 pt, in a clear sans-serif font such as Arial or Calibri.`,
      `Insert at least two relevant pictures or icons (e.g. a person at a workstation, a padlock) and apply square or tight text wrapping so that no text is covered.`,
      `Insert the call-out text inside a shape (e.g. a rounded rectangle or explosion shape) with a contrasting fill colour; text 22 pt, bold.`,
      `Insert the footer in a text box at the bottom of the page, 11 pt, centred.`,
      `Apply a page border (a line or art border) and use a consistent colour scheme of no more than three main colours.`,
      `Align and group objects so that the spacing is even, then check that nothing extends beyond the margin guides. Save and print preview.`
    ],
    skills: ['WordArt', 'text boxes', 'shapes', 'picture wrapping', 'page borders'],
    check: [
      { c: 'A4 portrait with 1.5 cm margin guides; saved with the correct name', m: 1 },
      { c: 'WordArt heading at least 48 pt, centred', m: 2 },
      { c: 'Sub-heading and six rules keyed accurately in the required sizes', m: 3 },
      { c: 'Two relevant pictures with suitable wrapping, no text covered', m: 2 },
      { c: 'Call-out text in a shape with contrasting fill, bold 22 pt', m: 2 },
      { c: 'Footer text correct and centred', m: 1 },
      { c: 'Page border, consistent colour scheme, balanced layout within margins', m: 3 }
    ],
    tip: `A poster is read from across the room: test it by printing preview at 50% and checking that the heading and rules are still easy to read.`
  }
]);
