/* EDPM · Mock Paper 01 · Set 3 — original practice items. Developed by Kester Small. */
window.COURSE_PAPERS = (window.COURSE_PAPERS || []).concat([{
  kind: 'p1', id: 'MOCK3', title: 'Mock Paper 01 · Set 3', time: 90,
  intro: `<p><b>EDPM · Mock Paper 01 · Set 3</b> · 1 hour 30 minutes · 60 items</p><ol><li>Answer <b>ALL</b> items. Each item has four options (A), (B), (C), (D).</li><li>Start the optional timer to practise under exam conditions.</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>`,
  items: [
    // ---------- Items 1–3: punctuation / capitalisation (Section II) ----------
    {
      passage: `<p><b>Items 1–3.</b> Each sentence below may contain an error of punctuation or capitalisation. Select the letter (A), (B) or (C) that identifies the underlined part containing the error. Select (D) if there is NO ERROR.</p>`,
      q: `The committee will meet on <u>monday, 9 March</u> <small>(A)</small> at the <u>Basseterre Community Centre</u> <small>(B)</small> at <u>4:00 p.m.</u> <small>(C)</small>`,
      options: ['“monday, 9 March”', '“Basseterre Community Centre”', '“4:00 p.m.”', 'NO ERROR'],
      answer: 0, sec: 'S2',
      why: 'Key: A. Days of the week are proper nouns and always take a capital letter, so “monday” must be typed “Monday”.'
    },
    {
      passage: `<p><b>Items 1–3.</b> Each sentence below may contain an error of punctuation or capitalisation. Select the letter (A), (B) or (C) that identifies the underlined part containing the error. Select (D) if there is NO ERROR.</p>`,
      q: `<u>“Please file these invoices,”</u> <small>(A)</small> <u>said Mrs Arrindell,</u> <small>(B)</small> <u>“before you leave.”</u> <small>(C)</small>`,
      options: ['“Please file these invoices,”', '“said Mrs Arrindell,”', '“before you leave.”', 'NO ERROR'],
      answer: 3, sec: 'S2',
      why: 'Key: D. The interrupted quotation is punctuated correctly: a comma inside the first closing quotation mark, a comma after the speaker tag, and the second part starts with a small letter because it continues the same sentence.'
    },
    {
      passage: `<p><b>Items 1–3.</b> Each sentence below may contain an error of punctuation or capitalisation. Select the letter (A), (B) or (C) that identifies the underlined part containing the error. Select (D) if there is NO ERROR.</p>`,
      q: `The <u>students’</u> <small>(A)</small> projects were displayed in the <u>library;</u> <small>(B)</small> and the <u>principal</u> <small>(C)</small> praised every one of them.`,
      options: ['“students’”', '“library;”', '“principal”', 'NO ERROR'],
      answer: 1, sec: 'S2',
      why: 'Key: B. A semicolon is not used before a joining word such as “and”; a comma (or no mark) is needed. “students’” is a correct plural possessive and “principal” needs no capital when not followed by a name.'
    },
    // ---------- Items 4–10: word choice / spelling ----------
    {
      q: 'The new adjustable chairs have had a positive ……… on the comfort of the office staff.',
      options: ['affect', 'effect', 'effekt', 'afect'],
      answer: 1, sec: 'S2',
      why: 'Key: B. “Effect” is the noun meaning a result; “affect” is normally a verb. The other two options are misspellings.'
    },
    {
      q: 'The secretary booked ……… at a Montego Bay hotel for the visiting auditors.',
      options: ['acomodation', 'accommodation', 'accomodation', 'acommodation'],
      answer: 1, sec: 'S2',
      why: 'Key: B. “Accommodation” is spelt with a double c and a double m.'
    },
    {
      q: 'Neither the manager nor the clerks ……… aware of the change in the filing procedure.',
      options: ['was', 'is', 'were', 'has been'],
      answer: 2, sec: 'S2',
      why: 'Key: C. With “neither … nor”, the verb agrees with the nearer subject. “Clerks” is plural and the sentence is in the past tense, so “were” is correct.'
    },
    {
      q: 'The office ……… cupboard was restocked with letterheads, envelopes and file folders.',
      options: ['stationnery', 'stationary', 'stationairy', 'stationery'],
      answer: 3, sec: 'S2',
      why: 'Key: D. “Stationery” (with -ery) means writing and office materials; “stationary” means not moving.'
    },
    {
      q: 'By the time the auditors arrived, the accounts clerk ……… all the receipts in date order.',
      options: ['files', 'had filed', 'is filing', 'will file'],
      answer: 1, sec: 'S2',
      why: 'Key: B. The past perfect “had filed” shows an action completed before another past action (the auditors arrived).'
    },
    {
      q: 'Before printing, the typist must proofread the letter to make sure that it is ……… .',
      options: ['mailible', 'mailabel', 'maillable', 'mailable'],
      answer: 3, sec: 'S2',
      why: 'Key: D. “Mailable” (fit to be sent without further correction) is the correct spelling.'
    },
    {
      q: 'The hotel ……… the conference booking by e-mail within an hour of the request.',
      options: ['conformed', 'conferred', 'confirmed', 'confined'],
      answer: 2, sec: 'S2',
      why: 'Key: C. To “confirm” is to state that something is definitely arranged. The other words look similar but mean to comply, to restrict and to grant or discuss.'
    },
    // ---------- Items 11–12: manuscript abbreviations / correction signs ----------
    {
      q: 'In a manuscript, the abbreviation ‘approx’ should be typed in full as',
      options: ['approach', 'appropriate', 'approximately', 'approval'],
      answer: 2, sec: 'S2',
      why: 'Key: C. ‘approx’ is the accepted short form of ‘approximately’ and is expanded in a formal typescript.'
    },
    {
      q: 'In a manuscript, words have been crossed out, a row of dots has been placed beneath them and the word ‘stet’ is written in the margin. The typist should',
      options: ['retain the crossed-out words as originally written', 'move the crossed-out words to the end of the sentence', 'type the crossed-out words in bold', 'omit the crossed-out words'],
      answer: 0, sec: 'S2',
      why: 'Key: A. ‘Stet’ means “let it stand”: ignore the correction and keep the original words.'
    },
    // ---------- Items 13–21: Section I ----------
    {
      q: 'Which of the following devices is used by banks to read the special characters printed at the bottom of cheques?',
      options: ['OMR', 'Barcode reader', 'OCR', 'MICR'],
      answer: 3, sec: 'S1',
      why: 'Key: D. Magnetic Ink Character Recognition (MICR) reads the magnetic-ink numbers on cheques.'
    },
    {
      q: 'A touch screen used at a self check-in kiosk at V.C. Bird International Airport is BEST described as',
      options: ['both an input and an output device', 'an output device only', 'a storage device', 'an input device only'],
      answer: 0, sec: 'S1',
      why: 'Key: A. The screen displays information (output) and accepts the passenger’s touches (input), so it is an input/output device.'
    },
    {
      q: 'Which of the following are examples of secondary (backing) storage?<br>I. Flash drive<br>II. RAM<br>III. External hard drive<br>IV. Cloud storage',
      options: ['I and II only', 'I, III and IV only', 'II, III and IV only', 'I, II, III and IV'],
      answer: 1, sec: 'S1',
      why: 'Key: B. RAM is primary (main) memory and is volatile; flash drives, external hard drives and cloud storage keep data permanently and are secondary storage.'
    },
    {
      q: 'Which type of software manages the computer’s resources, controls its hardware and provides the user interface?',
      options: ['Operating system', 'Antivirus software', 'Desktop publishing', 'Spreadsheet'],
      answer: 0, sec: 'S1',
      why: 'Key: A. The operating system is system software that manages hardware, memory and files and lets the user interact with the computer.'
    },
    {
      passage: `<p><b>EXHIBIT</b></p><p>Keisha is a data-entry clerk at an insurance office in Couva. She types for about six hours each day with her wrists bent upward and resting on the hard edge of the desk. By the end of each day her wrists and fingers ache.</p>`,
      q: 'Which of the following actions would BEST reduce Keisha’s discomfort?',
      options: ['Using a wrist rest and keeping her wrists straight', 'Using an antiglare screen', 'Placing the monitor slightly below eye level', 'Increasing the font size on her monitor'],
      answer: 0, sec: 'S1',
      why: 'Key: A. Bent, unsupported wrists during long periods of typing lead to repetitive strain injury; a wrist rest and a straight (neutral) wrist position reduce the strain. The other options address the eyes or neck.'
    },
    {
      q: 'Eye strain caused by long periods of looking at a computer screen can BEST be reduced by',
      options: ['sitting closer to the screen', 'using a footrest', 'taking regular short breaks to rest the eyes', 'using an ergonomic keyboard'],
      answer: 2, sec: 'S1',
      why: 'Key: C. Regular breaks (looking away from the screen) relax the eye muscles. Keyboards and footrests help other parts of the body, and sitting closer makes eye strain worse.'
    },
    {
      q: 'Which of the following are SAFETY practices in a computer laboratory?<br>I. Keeping cables tidy and away from walkways<br>II. Connecting equipment through a surge protector<br>III. Adjusting the height of the chair',
      options: ['I only', 'I and II only', 'II and III only', 'I, II and III'],
      answer: 1, sec: 'S1',
      why: 'Key: B. Tidy cables prevent trips and falls, and surge protectors prevent electrical damage and fire. Adjusting chair height is an ergonomic (comfort and posture) practice.'
    },
    {
      q: 'Before removing a flash drive from a computer, a user should FIRST',
      options: ['defragment the hard drive', 'safely eject the device', 'delete all temporary files', 'switch off the monitor'],
      answer: 1, sec: 'S1',
      why: 'Key: B. Ejecting the device safely makes sure all data has finished writing, which avoids file loss or corruption.'
    },
    {
      q: 'Which of the following practices BEST reduces the environmental impact of a busy office?',
      options: ['Recycling used paper and toner cartridges', 'Printing every e-mail for the files', 'Leaving all computers on overnight', 'Replacing every computer each year'],
      answer: 0, sec: 'S1',
      why: 'Key: A. Recycling reduces waste sent to landfill. The other practices waste paper, electricity or equipment.'
    },
    // ---------- Items 22–33: Sections III and IV ----------
    {
      q: 'Which type of application software would be MOST suitable for designing a new logo for San Pedro Marine Supplies Ltd?',
      options: ['Graphic', 'Database', 'Presentation', 'Spreadsheet'],
      answer: 0, sec: 'S3',
      why: 'Key: A. Graphic software is used to create and edit images, illustrations and design elements such as logos.'
    },
    {
      q: 'Which word processing feature should be used to produce a personalised letter for each of 80 customers whose names and addresses are stored in a spreadsheet?',
      options: ['Find and replace', 'Mail merge', 'Track changes', 'AutoCorrect'],
      answer: 1, sec: 'S4',
      why: 'Key: B. Mail merge combines a main document with a data source to produce one personalised copy for every record.'
    },
    {
      passage: `<p><b>Items 24–25</b> refer to the following spreadsheet extract showing sales (B$) at a Bay Street souvenir shop in Nassau.</p><table style="border:1px solid"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><th>1</th><td><b>Item</b></td><td><b>Jan</b></td><td><b>Feb</b></td><td><b>Mar</b></td></tr><tr><th>2</th><td>T-shirts</td><td>1250</td><td>980</td><td>1430</td></tr><tr><th>3</th><td>Caps</td><td>640</td><td>715</td><td>590</td></tr><tr><th>4</th><td>Mugs</td><td>820</td><td>760</td><td>905</td></tr><tr><th>5</th><td>Key rings</td><td>310</td><td>455</td><td>380</td></tr><tr><th>6</th><td><b>Total</b></td><td>3020</td><td>2910</td><td>3305</td></tr><tr><th>7</th><td><b>Average</b></td><td></td><td></td><td></td></tr></tbody></table>`,
      q: 'Which formula in cell B7 will calculate the AVERAGE January sales of the four items?',
      options: ['=AVERAGE(B2:B6)', '=B6/5', '=AVERAGE(B2:B5)', '=SUM(B2:B5)/3'],
      answer: 2, sec: 'S4',
      why: 'Key: C. The four item values are in B2:B5. B2:B6 would also include the total in B6, and dividing by 3 or 5 uses the wrong number of items.'
    },
    {
      passage: `<p><b>Items 24–25</b> refer to the following spreadsheet extract showing sales (B$) at a Bay Street souvenir shop in Nassau.</p><table style="border:1px solid"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><th>1</th><td><b>Item</b></td><td><b>Jan</b></td><td><b>Feb</b></td><td><b>Mar</b></td></tr><tr><th>2</th><td>T-shirts</td><td>1250</td><td>980</td><td>1430</td></tr><tr><th>3</th><td>Caps</td><td>640</td><td>715</td><td>590</td></tr><tr><th>4</th><td>Mugs</td><td>820</td><td>760</td><td>905</td></tr><tr><th>5</th><td>Key rings</td><td>310</td><td>455</td><td>380</td></tr><tr><th>6</th><td><b>Total</b></td><td>3020</td><td>2910</td><td>3305</td></tr><tr><th>7</th><td><b>Average</b></td><td></td><td></td><td></td></tr></tbody></table>`,
      q: 'Which value will be displayed if the formula =MAX(C2:C5) is entered in cell C8?',
      options: ['2910', '455', '715', '980'],
      answer: 3, sec: 'S4',
      why: 'Key: D. MAX returns the largest value in the range C2:C5 (980, 715, 760, 455), which is 980. 455 is the minimum and 2910 is the total.'
    },
    {
      q: 'A clerk enters =B2+C2+D2 in cell E2 and copies it down to E5. Each new cell correctly adds the figures in its own row because the formula uses',
      options: ['relative cell references', 'a circular reference', 'absolute cell references', 'a range name'],
      answer: 0, sec: 'S4',
      why: 'Key: A. Relative references change automatically when a formula is copied, so the formula becomes =B3+C3+D3 in E3, and so on.'
    },
    {
      q: 'In a database of guests at a Grand Anse hotel, the complete set of details about ONE guest (name, room number and arrival date) is called a',
      options: ['field', 'table', 'record', 'report'],
      answer: 2, sec: 'S3',
      why: 'Key: C. A record holds all the fields about one person or item. A field is a single item of data, such as the room number.'
    },
    {
      q: 'Which field would be MOST suitable as the primary key in a table of employees?',
      options: ['Last name', 'Employee ID', 'Department', 'Date of birth'],
      answer: 1, sec: 'S4',
      why: 'Key: B. A primary key must be unique for every record. Two employees may share a last name, department or date of birth, but each has a different employee ID.'
    },
    {
      q: 'In presentation software, the pre-set arrangements of placeholders for a title, text and pictures on a slide are called',
      options: ['themes', 'animations', 'layouts', 'transitions'],
      answer: 2, sec: 'S4',
      why: 'Key: C. Layouts arrange title, content and image placeholders so information is organised consistently from slide to slide.'
    },
    {
      passage: `<p><b>EXHIBIT</b></p><p>Mr Richardson is preparing a slide show for the Bayleaf Hill Secondary School Parents’ Evening. He wants the school crest and the footer text to appear in exactly the same position on every slide, and he wants to be able to change the font on all twelve slides in one step.</p>`,
      q: 'Which feature should Mr Richardson use?',
      options: ['Slide master', 'Slide sorter view', 'Custom animation', 'Notes page'],
      answer: 0, sec: 'S3',
      why: 'Key: A. Editing the slide master applies a design, logo, footer and fonts to every slide at once, and a change made there updates the whole presentation.'
    },
    {
      q: 'Which of the following statements about transitions and animations in a business presentation are TRUE?<br>I. They should be applied consistently.<br>II. They should be added to every bullet point to keep the audience alert.<br>III. They should support, not distract from, the message.',
      options: ['I and II only', 'I and III only', 'II and III only', 'I, II and III'],
      answer: 1, sec: 'S4',
      why: 'Key: B. Transitions and animations should be consistent and used sparingly so that they support the speaker. Animating every bullet point overuses them and distracts the audience.'
    },
    {
      q: 'While designing a flyer, Lena combined a photograph, a text box and a background rectangle so that they can be moved and resized as ONE object. Which feature did she use?',
      options: ['Wrapping', 'Cropping', 'Recolouring', 'Grouping'],
      answer: 3, sec: 'S4',
      why: 'Key: D. Grouping joins separate objects into a single unit; ungrouping separates them again so each can be edited.'
    },
    {
      q: 'A company logo must stay sharp whether it is printed on a business card or on a large billboard. The logo should therefore be created as a',
      options: ['bitmap photograph', 'raster image', 'compressed JPEG', 'vector graphic'],
      answer: 3, sec: 'S3',
      why: 'Key: D. Vector graphics are built from mathematical paths and can be resized to any size without losing quality. Raster (bitmap) images, including JPEGs, become blurred when enlarged.'
    },
    // ---------- Items 34–42: Sections V, VI and VII ----------
    {
      q: 'Which meeting document is prepared for the person presiding ONLY and contains extra notes and background information beside each item?',
      options: ['Action items', 'Chairman’s agenda', 'Minutes', 'Notice of meeting'],
      answer: 1, sec: 'S5',
      why: 'Key: B. The chairman’s agenda is an expanded agenda for the chairperson, with space or notes beside each item to guide the meeting.'
    },
    {
      passage: `<p><b>EXHIBIT</b></p><p style="text-align:center"><b>GOUYAVE YOUTH CLUB</b><br>Monthly Meeting · Thursday, 14 May 2026 · 6:30 p.m.<br><b>AGENDA</b></p><ol><li>Apologies for absence</li><li>Minutes of the last meeting</li><li>………………………</li><li>Correspondence</li><li>Treasurer’s report</li><li>Any other business</li><li>Date of next meeting</li></ol>`,
      q: 'Which item is MISSING at number 3 of the agenda?',
      options: ['Vote of thanks', 'Closure', 'Election of a new treasurer', 'Matters arising'],
      answer: 3, sec: 'S5',
      why: 'Key: D. “Matters arising” (from the minutes) normally follows immediately after the minutes of the last meeting have been read and confirmed.'
    },
    {
      passage: `<p><b>EXHIBIT</b></p><p>A letter from Montego Bay Realty Ltd has the date, inside address, salutation, every paragraph, the complimentary close and the signature block all starting at the left margin. A blank line separates each paragraph.</p>`,
      q: 'In which style has the letter been displayed?',
      options: ['Indented', 'Blocked', 'Semi-blocked', 'Hanging'],
      answer: 1, sec: 'S5',
      why: 'Key: B. In the blocked (fully blocked) style every line begins at the left margin. Semi-blocked letters indent the date and closing; indented letters also indent the paragraphs.'
    },
    {
      q: 'Which of the following are NOT normally included in a memorandum?<br>I. Salutation<br>II. Subject heading<br>III. Complimentary close<br>IV. Date',
      options: ['I and II only', 'I and III only', 'II and IV only', 'III and IV only'],
      answer: 1, sec: 'S5',
      why: 'Key: B. A memo opens with a TO/FROM/DATE/SUBJECT heading block and does not need a salutation (Dear …) or a complimentary close (Yours …).'
    },
    {
      q: 'A DL envelope is designed to hold an A4 letter that has been folded',
      options: ['in quarters', 'in thirds', 'in half', 'once diagonally'],
      answer: 1, sec: 'S5',
      why: 'Key: B. The DL envelope (11 cm × 22 cm) takes an A4 sheet folded into thirds; a C5 envelope takes A4 folded in half.'
    },
    {
      q: 'In a lease, the person who owns the property and allows another person to use it in exchange for rent is called the',
      options: ['lessee', 'guarantor', 'tenant', 'lessor'],
      answer: 3, sec: 'S6',
      why: 'Key: D. The lessor grants the lease; the lessee (tenant) pays rent to use the property.'
    },
    {
      passage: `<p><b>EXHIBIT</b> · Extract from an invoice issued by Bay Breeze Office Supplies, Kingston</p><table style="border:1px solid"><thead><tr><th>Qty</th><th>Description</th><th>Unit price (US$)</th><th>Amount (US$)</th></tr></thead><tbody><tr><td>3</td><td>Reams of A4 paper</td><td>6.50</td><td>19.50</td></tr><tr><td>2</td><td>Toner cartridges</td><td>48.00</td><td>96.00</td></tr><tr><td>4</td><td>Box files</td><td>3.75</td><td>15.00</td></tr><tr><td></td><td colspan="2"><b>Subtotal</b></td><td>?</td></tr></tbody></table>`,
      q: 'What amount should appear in the Subtotal box?',
      options: ['US$58.25', 'US$131.00', 'US$120.50', 'US$130.50'],
      answer: 3, sec: 'S6',
      why: 'Key: D. 19.50 + 96.00 + 15.00 = US$130.50. US$58.25 is the sum of the unit prices only.'
    },
    {
      q: 'The secretary of the Holetown Community Council wants to e-mail the minutes to 30 residents without allowing the residents to see one another’s e-mail addresses. She should enter the addresses in the',
      options: ['Cc field', 'To field', 'Bcc field', 'Subject line'],
      answer: 2, sec: 'S7',
      why: 'Key: C. Blind carbon copy (Bcc) sends the message without showing those addresses to the other recipients.'
    },
    {
      q: 'An office administrator needs to find every e-mail received from one supplier over the past year. Which method of organising the inbox would be MOST useful?',
      options: ['Archiving by year', 'Sorting by sender', 'Sorting by date', 'Sorting by size'],
      answer: 1, sec: 'S7',
      why: 'Key: B. Sorting by sender groups together all messages from the same person or organisation.'
    },
    // ---------- Items 43–51: Section VIII ----------
    {
      q: 'An electricity bill sent to a customer, part of which is returned with the payment for further processing, is an example of a',
      options: ['source document', 'legal document', 'machine-readable document', 'turnaround document'],
      answer: 3, sec: 'S8',
      why: 'Key: D. A turnaround document is produced by a system, sent out, and returned as input for further processing.'
    },
    {
      passage: `<p><b>EXHIBIT</b> · File path</p><pre>D:\\School\\Business Dept\\EDPM\\Term 1\\Lesson_Notes_Week3.docx</pre>`,
      q: 'In the file path shown, ‘Term 1’ is a',
      options: ['file extension', 'sub-folder', 'drive', 'file'],
      answer: 1, sec: 'S8',
      why: 'Key: B. D: is the drive, School is a folder, and Business Dept, EDPM and Term 1 are sub-folders nested inside it. Lesson_Notes_Week3 is the file and .docx is its extension.'
    },
    {
      q: 'Which of the following file names follows good practice for an electronic filing system?',
      options: ['Document1.xlsx', 'stuff to send.xlsx', 'new invoice FINAL final.xlsx', '2026-03-14_Invoice_GreatBayMarine.xlsx'],
      answer: 3, sec: 'S8',
      why: 'Key: D. Good file names are clear, descriptive and consistent; a date in YYYY-MM-DD format also makes files sort correctly by date.'
    },
    {
      passage: `<p><b>EXHIBIT</b></p><p>The Human Resources office of a hotel in San Pedro places the staff handbook on a shared drive. All staff must be able to open and read the handbook, but no one except the Human Resources manager should be able to change it.</p>`,
      q: 'Which file integrity measure is MOST appropriate for the staff handbook?',
      options: ['Deleting older versions', 'Encrypting the file', 'Setting read-only access for staff', 'Archiving the file'],
      answer: 2, sec: 'S8',
      why: 'Key: C. Read-only access lets users view a file but prevents them from making or saving changes.'
    },
    {
      q: 'A small business in San Pedro backs up all its files to a second hard drive kept on the same desk as the main computer. What is the GREATEST weakness of this arrangement?',
      options: ['Files cannot be restored from a hard drive', 'The second drive will make all files read-only', 'The backups will take too long to complete', 'One fire or flood could destroy both copies at once'],
      answer: 3, sec: 'S8',
      why: 'Key: D. A backup kept in the same place as the original is exposed to the same physical disaster; at least one copy should be kept off-site or in the cloud.'
    },
    {
      q: 'Which of the following are CYBER security measures?<br>I. Firewall<br>II. Fireproof filing cabinet<br>III. Strong passwords<br>IV. Encryption',
      options: ['I and II only', 'II and III only', 'I, III and IV only', 'I, II, III and IV'],
      answer: 2, sec: 'S8',
      why: 'Key: C. Firewalls, passwords and encryption protect data electronically. A fireproof cabinet is a physical security measure.'
    },
    {
      q: 'The length of time a document must be kept before it may be securely disposed of is called its',
      options: ['archive date', 'version number', 'access privilege', 'retention period'],
      answer: 3, sec: 'S8',
      why: 'Key: D. The retention period is set by organisational policy or by law; after it ends the file may be destroyed or deleted securely.'
    },
    {
      passage: `<p><b>EXHIBIT</b> · File properties: Quarterly_Report.docx</p><table style="border:1px solid"><tbody><tr><td>Created</td><td>2 March 2026, 9:14 a.m.</td></tr><tr><td>Modified</td><td>11 March 2026, 3:40 p.m.</td></tr><tr><td>Accessed</td><td>16 March 2026, 8:05 a.m.</td></tr><tr><td>Owner</td><td>j.carty</td></tr></tbody></table>`,
      q: 'According to the metadata shown, on which date was the CONTENT of the report last changed?',
      options: ['The date cannot be determined', '16 March 2026', '11 March 2026', '2 March 2026'],
      answer: 2, sec: 'S8',
      why: 'Key: C. “Date modified” records the last change to the content. “Date accessed” (16 March) only shows when the file was last opened.'
    },
    {
      q: 'Which practice would allow an office to restore a shared report to the way it looked before an incorrect figure was entered last week?',
      options: ['Compression', 'Encryption', 'Versioning', 'Overwriting'],
      answer: 2, sec: 'S8',
      why: 'Key: C. Versioning keeps successive saved versions of a document, so an earlier version can be reviewed, compared or restored.'
    },
    // ---------- Items 52–60: Section IX ----------
    {
      q: 'Which right allows a St. Lucian songwriter to receive royalties when a radio station broadcasts her song?',
      options: ['Moral right', 'Economic right', 'Privacy right', 'Civil right'],
      answer: 1, sec: 'S9',
      why: 'Key: B. Economic rights entitle the creator to payment, such as royalties or licence fees, when others use the work.'
    },
    {
      passage: `<p><b>EXHIBIT</b></p><p>A St. George’s magazine paid photographer Arlene the agreed fee to print her photograph of Grand Anse. Without asking her, the editor changed the colours, cut away part of the image and printed it under another photographer’s name.</p>`,
      q: 'Which of Arlene’s rights has been MOST clearly infringed?',
      options: ['Licensing rights', 'Economic rights', 'Moral rights', 'Distribution rights'],
      answer: 2, sec: 'S9',
      why: 'Key: C. Arlene was paid, so her economic rights were respected. Altering her work without consent and removing her name damage its integrity and her reputation, which are moral rights.'
    },
    {
      q: 'For his EDPM research paper, Devon submitted an essay he had written for Business Studies the previous year, without telling his teacher. This is an example of',
      options: ['paraphrasing', 'citation', 'self-plagiarism', 'piracy'],
      answer: 2, sec: 'S9',
      why: 'Key: C. Reusing one’s own earlier work without acknowledging that it has been used before is self-plagiarism.'
    },
    {
      q: 'Which of the following practices help a student to avoid plagiarism?<br>I. Using in-text citations<br>II. Including a bibliography<br>III. Changing a few words in a copied paragraph<br>IV. Obtaining permission to use another person’s photograph',
      options: ['I and II only', 'I, II and IV only', 'II, III and IV only', 'I, II, III and IV'],
      answer: 1, sec: 'S9',
      why: 'Key: B. Citations, a bibliography and permission all credit the original creator. Changing only a few words of copied text is still plagiarism.'
    },
    {
      q: 'A teacher finds a diagram released under a Creative Commons licence that allows sharing with attribution. Before using it in a class handout, she must',
      options: ['remove the creator’s name to keep the handout tidy', 'credit the creator in the way the licence requires', 'pay the creator a royalty for each copy', 'register the diagram as her own work'],
      answer: 1, sec: 'S9',
      why: 'Key: B. An attribution licence allows free use as long as the creator is credited as the licence specifies.'
    },
    {
      q: 'Which of the following is an example of GOOD netiquette when writing a business e-mail?',
      options: ['Typing the whole message in capital letters', 'Reviewing the tone and the recipients before sending', 'Replying to all recipients with personal comments', 'Forwarding a colleague’s private message without permission'],
      answer: 1, sec: 'S9',
      why: 'Key: B. “Think and check before sending” is a basic rule of netiquette. Capital letters read as shouting, and sharing private messages or personal remarks is discourteous.'
    },
    {
      passage: `<p><b>EXHIBIT</b></p><p>“Sharon completes her filing accurately and on time, even on days when her supervisor is away at the Grand Anse branch.”</p>`,
      q: 'Which desirable work attitude is described in the extract?',
      options: ['Courtesy', 'Good grooming', 'Working without supervision', 'Team spirit'],
      answer: 2, sec: 'S9',
      why: 'Key: C. Completing tasks reliably and to standard when no one is checking shows individual responsibility, or the ability to work without supervision.'
    },
    {
      passage: `<p><b>EXHIBIT</b></p><p>At 8:00 a.m. Jamal, an office assistant, has three tasks:</p><ol><li>Type the minutes of yesterday’s board meeting, due to the chairman at 10:00 a.m. today.</li><li>File last year’s correspondence in the archive room.</li><li>Design a flyer for a fundraising event next month.</li></ol>`,
      q: 'Which of the following approaches shows the BEST time management?',
      options: ['File the correspondence first because it is the easiest task', 'Design the flyer first because it is the most creative task', 'Type the minutes first because they are due earliest', 'Work on all three tasks at the same time'],
      answer: 2, sec: 'S9',
      why: 'Key: C. Effective time management means prioritising by deadline and importance; the minutes are needed within two hours, so they come first.'
    },
    {
      q: 'Two days after e-mailing a quotation to a client in Bathsheba, Mrs Lake telephones the client to confirm that it was received. This is an example of',
      options: ['plagiarism avoidance', 'netiquette', 'workstation organisation', 'a follow-up procedure'],
      answer: 3, sec: 'S9',
      why: 'Key: D. Follow-up procedures involve checking that work sent or delegated has been received and acted upon.'
    }
  ]
}]);
