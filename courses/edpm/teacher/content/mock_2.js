// EDPM · Mock Paper 01 · Set 2 (original items, 60 x four-option)
(function () {
  const ERR = `<p><b>Items 1–3.</b> Each sentence below may contain ONE error of punctuation or capitalisation. Select (A), (B) or (C) to identify the part of the sentence that contains the error. Select (D) if there is NO ERROR.</p>`;

  const SHEET = `<p><b>EXHIBIT</b> · Items 23–24 refer to the spreadsheet extract below, which shows the monthly sales of Gros Islet Marine Supplies Ltd, Castries.</p>
<table style="border:1px solid #888"><thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody>
<tr><th>1</th><td><b>Month</b></td><td><b>Sales (US$)</b></td></tr>
<tr><th>2</th><td>January</td><td style="text-align:right">1 250</td></tr>
<tr><th>3</th><td>February</td><td style="text-align:right">980</td></tr>
<tr><th>4</th><td>March</td><td style="text-align:right">1 430</td></tr>
<tr><th>5</th><td>April</td><td style="text-align:right">1 105</td></tr>
<tr><th>6</th><td>May</td><td style="text-align:right">1 340</td></tr>
<tr><th>7</th><td>Average</td><td></td></tr>
<tr><th>8</th><td>Highest</td><td></td></tr>
</tbody></table>`;

  const DB = `<p><b>EXHIBIT</b> · The table below is part of a single-table database kept by a Form 4 teacher at a secondary school in Barbados.</p>
<table style="border:1px solid #888"><thead><tr><th>Student ID</th><th>First Name</th><th>Last Name</th><th>Form Class</th><th>Score</th></tr></thead><tbody>
<tr><td>2501</td><td>Aaliyah</td><td>Richardson</td><td>4B</td><td style="text-align:right">82</td></tr>
<tr><td>2502</td><td>Jaden</td><td>Arrindell</td><td>4A</td><td style="text-align:right">75</td></tr>
<tr><td>2503</td><td>Shania</td><td>Hodge</td><td>4B</td><td style="text-align:right">64</td></tr>
<tr><td>2504</td><td>Marcus</td><td>Gumbs</td><td>4B</td><td style="text-align:right">70</td></tr>
<tr><td>2505</td><td>Keisha</td><td>Brooks</td><td>4A</td><td style="text-align:right">91</td></tr>
<tr><td>2506</td><td>Tyrese</td><td>Fleming</td><td>4B</td><td style="text-align:right">58</td></tr>
</tbody></table>`;

  const ROMAN = ['I and II only', 'I and III only', 'II and III only', 'I, II and III'];

  window.COURSE_PAPERS = (window.COURSE_PAPERS || []).concat([{
    kind: 'p1', id: 'MOCK2', title: 'Mock Paper 01 · Set 2', time: 90,
    intro: `<p><b>EDPM · Mock Paper 01 · Set 2</b> · 1 hour 30 minutes · 60 items</p><ol><li>Answer <b>ALL</b> items. Each item has four options (A), (B), (C), (D).</li><li>Start the optional timer to practise under exam conditions.</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>`,
    items: [
      // ---- Items 1–3: punctuation / capitalisation (S2)
      { q: 'The meeting will be held at the St. George’s Community Centre on monday, 16 March 2026.',
        options: ['“monday,”', '“Community Centre”', 'NO ERROR', '“St. George’s”'], answer: 0,
        why: 'Key: A. Days of the week are proper nouns and must begin with a capital letter: “Monday”.', passage: ERR, sec: 'S2' },
      { q: 'Please bring the following items; a pen, a calculator and your student ID card.',
        options: ['“student ID card.”', '“a calculator”', '“items;”', 'NO ERROR'], answer: 2,
        why: 'Key: C. A list that follows a complete introductory statement is introduced by a colon, not a semicolon: “items:”.', passage: ERR, sec: 'S2' },
      { q: 'Ms Richardson asked whether the monthly reports had been printed.',
        options: ['“printed.”', 'NO ERROR', '“Ms Richardson”', '“whether”'], answer: 1,
        why: 'Key: B. This is an indirect (reported) question, so it correctly ends with a full stop, not a question mark.', passage: ERR, sec: 'S2' },

      // ---- Items 4–10: word choice / vocabulary / spelling (S2)
      { q: 'The new filing policy will ……… every department in the school.',
        options: ['effect', 'affekt', 'afect', 'affect'], answer: 3,
        why: 'Key: D. “Affect” is the verb meaning “to have an influence on”; “effect” is normally a noun.', sec: 'S2' },
      { q: 'All visitors must report to the reception desk on ……… at the Bayside Medical Centre.',
        options: ['arrivall', 'arrival', 'arrivel', 'arival'], answer: 1,
        why: 'Key: B. The correct spelling is “arrival” — double r, single l.', sec: 'S2' },
      { q: 'Each member of staff must keep ……… password private.',
        options: ['they’re', 'their', 'its', 'there'], answer: 1,
        why: 'Key: B. “Their” is the possessive form; “they’re” means “they are” and “there” refers to a place.', sec: 'S2' },
      { q: 'The committee could not reach a decision because the members ……… on the date of the next meeting.',
        options: ['disagrees', 'disagreeing', 'disagree', 'disagreed'], answer: 3,
        why: 'Key: D. The sentence is in the past tense (“could not reach”), so the past tense “disagreed” is required.', sec: 'S2' },
      { q: 'The office manager ordered new letterheads, envelopes and other ……… for the front desk.',
        options: ['stationry', 'stationerey', 'stationery', 'stationary'], answer: 2,
        why: 'Key: C. “Stationery” (with -ery) means writing materials; “stationary” means not moving.', sec: 'S2' },
      { q: 'Please find ……… a copy of the signed lease agreement.',
        options: ['encloses', 'enclose', 'enclosing', 'enclosed'], answer: 3,
        why: 'Key: D. The accepted business phrase is “Please find enclosed”, using the past participle.', sec: 'S2' },
      { q: 'The new database will make it easier for staff to ……… customer records quickly.',
        options: ['retreive', 'retreeve', 'retrieve', 'retrive'], answer: 2,
        why: 'Key: C. “Retrieve” follows the rule “i before e except after c”.', sec: 'S2' },

      // ---- Items 11–12: manuscript abbreviations / correction signs (S2)
      { q: 'Which of the following words is represented by the abbreviation ‘accom’ in a manuscript?',
        options: ['Accompany', 'Accommodation', 'Accumulate', 'Accomplish'], answer: 1,
        why: 'Key: B. ‘accom’ is the standard manuscript abbreviation for “accommodation” and must be typed in full.', sec: 'S2' },
      { q: 'A typist sees the correction sign ‘stet’ written in the margin beside a word that has been crossed out and has a dotted line beneath it. What should the typist do?',
        options: ['Transpose the word with the word next to it', 'Leave the word as it was originally written', 'Delete the word and close up the space', 'Spell the word out in full'], answer: 1,
        why: 'Key: B. ‘Stet’ means “let it stand” — ignore the correction and keep the original text.', sec: 'S2' },

      // ---- Items 13–21: Section I
      { q: 'Which of the following devices is used for BOTH input and output?',
        options: ['Touchscreen', 'Scanner', 'Microphone', 'Projector'], answer: 0,
        why: 'Key: A. A touchscreen displays output and accepts input through the same surface; the others are input only or output only.', sec: 'S1' },
      { q: 'A receptionist at a hotel in Gros Islet places her finger on a reader to clock in at the start of each shift. This device is BEST described as a(n)',
        options: ['digital camera', 'graphics tablet', 'optical mark reader', 'biometric device'], answer: 3,
        why: 'Key: D. A biometric device reads a unique physical characteristic, such as a fingerprint, to identify the user.', sec: 'S1' },
      { q: 'Which storage medium would BEST allow staff at the Bridgetown and Holetown branches of a company to open and edit the same files from different locations?',
        options: ['Portable hard disk', 'Cloud storage', 'Flash drive', 'Memory card'], answer: 1,
        why: 'Key: B. Cloud storage is accessed over the internet, so files can be saved, synced and shared from any location.', sec: 'S1' },
      { q: 'Software that coordinates the activities among a computer’s hardware devices and allows the user to run application software is called',
        options: ['web-based software', 'operating system software', 'application software', 'utility software'], answer: 1,
        why: 'Key: B. The operating system manages memory, devices and processing, and provides the platform on which applications run.', sec: 'S1' },
      { q: 'Which of the following practices will MOST help to reduce eye strain for a data entry clerk who works at a monitor all day?',
        options: ['Raising the height of the chair', 'Using a wireless keyboard', 'Taking regular breaks to look away from the screen', 'Using a padded wrist rest'], answer: 2,
        why: 'Key: C. Regular breaks that rest the eyes from the screen reduce eye strain; the other options deal with posture or convenience.', sec: 'S1' },
      { q: 'Which of the following are SAFETY practices in a computer laboratory?<br>I. Avoid overloading electrical outlets.<br>II. Keep cables away from walkways.<br>III. Adjust the brightness of the monitor.',
        options: ROMAN.slice(), answer: 0,
        why: 'Key: A. I and II prevent fires, shocks and trips; III is a health (eye comfort) measure rather than a safety practice.', sec: 'S1' },
      { q: 'Before disconnecting a flash drive from a computer, a user should FIRST',
        options: ['safely eject the device', 'switch off the monitor', 'close the web browser', 'run a disk defragmenter'], answer: 0,
        why: 'Key: A. Safely removing (ejecting) external storage prevents data loss or file corruption.', sec: 'S1' },
      { q: 'Which of the following devices would allow a blind employee to read text displayed on the screen?',
        options: ['Plotter', 'Braille display', 'Sound card', 'Graphics tablet'], answer: 1,
        why: 'Key: B. A Braille display converts on-screen text into raised Braille characters.', sec: 'S1' },
      { q: 'Which of the following changes would improve the ergonomics of Kemal’s workstation?<br>I. Lower the monitor so that the top of the screen is at or slightly below eye level.<br>II. Turn the monitor so that it no longer faces the window.<br>III. Raise the keyboard so that it is well above elbow height.',
        options: ['I and III only', 'II and III only', 'I and II only', 'I, II and III'], answer: 2,
        passage: `<p><b>EXHIBIT</b> · Kemal is a clerk at a law office on Broad Street. His monitor is placed on top of a stack of files so that the screen is above his eye level. The screen faces a large window and he often sees glare. His keyboard is at elbow height and his chair has an adjustable back rest.</p>`,
        why: 'Key: C. Lowering the monitor and reducing glare correct the two problems; a keyboard well above elbow height would strain the wrists and shoulders.', sec: 'S1' },

      // ---- Items 22–33: Sections III and IV
      { q: 'Which type of application software is MOST suitable for recording a term’s attendance and calculating each student’s percentage attendance?',
        options: ['Word processing', 'Spreadsheet', 'Presentation', 'Graphic'], answer: 1,
        why: 'Key: B. Spreadsheets organise numerical data in rows and columns and perform calculations automatically.', sec: 'S3' },
      { q: 'Which formula should be entered in cell B7 to calculate the average monthly sales?',
        options: ['=AVG(B2:B6)', '=AVERAGE(B2:B6)', '=SUM(B2:B6)/4', '=AVERAGE(B2,B6)'], answer: 1, passage: SHEET,
        why: 'Key: B. AVERAGE with the range B2:B6 finds the mean of all five months (6 105 ÷ 5 = 1 221). =AVERAGE(B2,B6) uses only two cells and SUM/4 divides by the wrong count.', sec: 'S4' },
      { q: 'What value will be displayed in cell B8 if the formula =MAX(B2:B6) is entered there?',
        options: ['1 340', '1 250', '1 430', '980'], answer: 2, passage: SHEET,
        why: 'Key: C. MAX returns the largest value in the range, which is March’s 1 430.', sec: 'S4' },
      { q: 'A teacher wants any mark below 50 in a spreadsheet to turn red automatically. Which spreadsheet feature should she use?',
        options: ['PivotTable', 'Conditional formatting', 'Filtering', 'Data validation'], answer: 1,
        why: 'Key: B. Conditional formatting automatically changes the appearance of cells that meet a stated condition.', sec: 'S4' },
      { q: 'A teacher wants cell D2 to display “Pass” if the mark in C2 is 50 or more, and “Fail” otherwise. Which formula should be entered in D2?',
        options: ['=IF(C2>50,"Pass","Fail")', '=IF("Pass",C2>=50,"Fail")', '=IF(C2<=50,"Pass","Fail")', '=IF(C2>=50,"Pass","Fail")'], answer: 3,
        why: 'Key: D. The condition must be C2>=50 so that a mark of exactly 50 also passes, followed by the value if true and the value if false.', sec: 'S4' },
      { q: 'In a database table, a single row that holds all the details about one customer is called a',
        options: ['query', 'record', 'form', 'field'], answer: 1,
        why: 'Key: B. A record is one complete row; each column within it is a field.', sec: 'S3' },
      { q: 'Which field in the table is MOST suitable to be the primary key?',
        options: ['Form Class', 'Last Name', 'First Name', 'Student ID'], answer: 3, passage: DB,
        why: 'Key: D. A primary key must uniquely identify each record; names and form classes can be repeated, but each Student ID is unique.', sec: 'S3' },
      { q: 'Which data type is MOST appropriate for a database field that stores telephone numbers such as +1 (473) 440 3187?',
        options: ['Number', 'Text', 'Date/Time', 'Currency'], answer: 1,
        why: 'Key: B. Telephone numbers contain symbols and spaces and are never calculated, so they are stored as Text.', sec: 'S4' },
      { q: 'A query is run on the table using the criteria “4B” in the Form Class field AND “>=70” in the Score field. How many records will the query return?',
        options: ['1', '3', '2', '4'], answer: 2, passage: DB,
        why: 'Key: C. Only Aaliyah Richardson (82) and Marcus Gumbs (70) are in 4B with a score of 70 or more.', sec: 'S4' },
      { q: 'Which of the following are objects found in a database management system?<br>I. Slide<br>II. Query<br>III. Report',
        options: ROMAN.slice(), answer: 2,
        why: 'Key: C. Queries and reports (with tables and forms) are database objects; a slide belongs to presentation software.', sec: 'S3' },
      { q: 'Which feature of presentation software controls the visual effect seen as the show moves from one slide to the next?',
        options: ['Theme', 'Layout', 'Animation', 'Transition'], answer: 3,
        why: 'Key: D. A transition is applied between slides; animation applies to objects within a slide.', sec: 'S4' },
      { q: 'A secretary wants to combine a standard letter with a list of 200 names and addresses stored in a database to produce personalised letters. Which feature should she use?',
        options: ['Page break', 'Mail merge', 'Track changes', 'Find and replace'], answer: 1,
        why: 'Key: B. Mail merge combines a main document with a data source to generate many personalised copies.', sec: 'S4' },

      // ---- Items 34–42: Sections V, VI and VII
      { q: 'In which letter style does every line, including the date and the complimentary close, begin at the left margin?',
        options: ['Semi-blocked', 'Circular', 'Indented', 'Blocked'], answer: 3,
        why: 'Key: D. In the blocked style every line starts at the left margin with no indentation.', sec: 'S5' },
      { q: 'Which envelope size is designed to hold an A4 sheet folded into thirds?',
        options: ['DL', 'A5', 'C5', 'B5'], answer: 0,
        why: 'Key: A. A DL envelope (11 cm x 22 cm) takes an A4 sheet folded into thirds; C5 takes A4 folded in half.', sec: 'S5' },
      { q: 'Which meeting document is prepared for the chairperson only and contains extra notes beside each item to be discussed?',
        options: ['Notice of meeting', 'Agenda', 'Minutes', 'Chairman’s agenda'], answer: 3,
        why: 'Key: D. A chairman’s agenda is an expanded agenda with space and notes for the chairperson’s use.', sec: 'S5' },
      { q: 'Which type of financial document is shown in the extract?',
        options: ['Invoice', 'Bank statement', 'Trial balance', 'Receipt'], answer: 0,
        passage: `<p><b>EXHIBIT</b></p><p><b>ROAD TOWN OFFICE SUPPLIES</b><br>Main Street, Road Town, Tortola, British Virgin Islands · +1 (284) 494 2190</p><p>To: Cane Garden Tours Ltd · Date: 9 March 2026 · No. 0417</p>
<table style="border:1px solid #888"><thead><tr><th>Item</th><th>Qty</th><th>Unit price (US$)</th><th>Amount (US$)</th></tr></thead><tbody>
<tr><td>A4 copy paper (ream)</td><td style="text-align:right">10</td><td style="text-align:right">6.50</td><td style="text-align:right">65.00</td></tr>
<tr><td>DL envelopes (box)</td><td style="text-align:right">4</td><td style="text-align:right">12.75</td><td style="text-align:right">51.00</td></tr>
<tr><td>Toner cartridge</td><td style="text-align:right">2</td><td style="text-align:right">48.00</td><td style="text-align:right">96.00</td></tr>
<tr><td colspan="3"><b>TOTAL DUE</b></td><td style="text-align:right"><b>212.00</b></td></tr>
</tbody></table><p>Payment is due within 30 days of the date above.</p>`,
        why: 'Key: A. The document itemises goods supplied and requests payment of the total due, which is the purpose of an invoice. A receipt would confirm that payment had already been made.', sec: 'S6' },
      { q: 'Which legal document sets out the terms under which one party allows another to use a property for a stated period, usually in exchange for rent?',
        options: ['Lease', 'Will', 'Conveyance', 'Endorsement'], answer: 0,
        why: 'Key: A. A lease is an agreement between a lessor and a lessee for the use of property for a period of time.', sec: 'S6' },
      { q: 'The manager of a hardware store in Portsmouth wants the sales chart in her monthly report to update automatically whenever the spreadsheet figures change. Which type of graph should be inserted into the report?',
        options: ['Linked graph', 'Hand-drawn graph scanned into the report', 'Embedded graph', 'Picture of the graph pasted from the clipboard'], answer: 0,
        why: 'Key: A. A linked graph stays connected to its source data and updates when the data changes; an embedded graph is a fixed snapshot.', sec: 'S6' },
      { q: 'The events coordinator of a Gros Islet resort needs to e-mail the same announcement to 60 guests who do not know one another, without revealing their e-mail addresses. Which field should she use for the guests’ addresses?',
        options: ['Cc', 'Bcc', 'To', 'Subject'], answer: 1,
        why: 'Key: B. Bcc (blind carbon copy) hides recipients’ addresses from one another.', sec: 'S7' },
      { q: 'Which of the following are DISADVANTAGES of electronic communication?<br>I. A wrong attachment can be sent by mistake.<br>II. A message may be filtered into a spam folder and not seen.<br>III. One message can be sent to many recipients at the same time.',
        options: ROMAN.slice(), answer: 0,
        why: 'Key: A. Errors in dispatch (I) and uncertainty that a message is received (II) are disadvantages; sending to many recipients at once (III) is an advantage.', sec: 'S7' },
      { q: 'A secretary needs to locate every e-mail exchanged with one particular supplier over the past year. Which method of sorting the mailbox would be MOST useful?',
        options: ['By sender', 'By size', 'By date', 'By priority'], answer: 0,
        why: 'Key: A. Sorting by sender groups together all messages from one person or organisation.', sec: 'S7' },

      // ---- Items 43–51: Section VIII
      { q: 'A completed order form on which a customer’s purchase details are FIRST written is an example of a',
        options: ['source document', 'turnaround document', 'machine-readable document', 'template'], answer: 0,
        why: 'Key: A. A source document is the original document on which data is first recorded before it is processed.', sec: 'S8' },
      { q: 'A water bill with a payment stub that the customer tears off and returns with payment is BEST described as a',
        options: ['turnaround document', 'machine-readable document', 'legal document', 'source document'], answer: 0,
        why: 'Key: A. A turnaround document is produced by a system, sent out, and returned as input for further processing.', sec: 'S8' },
      { q: 'In the file path shown in the exhibit, which item is a SUB-FOLDER?',
        options: ['Front Office', 'INV-0417.docx', 'D:', '2026'], answer: 3,
        passage: `<p><b>EXHIBIT</b> · File path on a company computer:</p><pre>D:\\Front Office\\2026\\Invoices\\INV-0417.docx</pre>`,
        why: 'Key: D. D: is the drive, Front Office is the main folder on that drive, 2026 is a sub-folder inside it, and INV-0417.docx is the file.', sec: 'S8' },
      { q: 'A company wants all staff to be able to VIEW the staff handbook, but not to change it by accident. Which file integrity measure is MOST appropriate?',
        options: ['Virus protection', 'Encryption', 'Archiving', 'Read-only access'], answer: 3,
        why: 'Key: D. Read-only access lets users open and view a file but prevents them from saving changes.', sec: 'S8' },
      { q: 'Converting the content of a file into a coded form that can only be read by someone with the correct key or password is called',
        options: ['formatting', 'encryption', 'compression', 'archiving'], answer: 1,
        why: 'Key: B. Encryption protects content even if the file itself is accessed without authorisation.', sec: 'S8' },
      { q: 'Which of the following would protect a small business in Gros Islet from losing its files if its office were damaged by a hurricane?<br>I. Keeping a backup copy at an off-site location<br>II. Saving backup copies to cloud storage<br>III. Keeping a second hard drive on a shelf in the same office',
        options: ['I only', 'I and II only', 'II and III only', 'I, II and III'], answer: 1,
        why: 'Key: B. Off-site and cloud backups survive damage to the premises; a backup kept in the same office would be destroyed with the originals.', sec: 'S8' },
      { q: 'The length of time a document must be kept, as set by organisational policy or by law, is known as its',
        options: ['archive point', 'version history', 'retention period', 'disposal date'], answer: 2,
        why: 'Key: C. The retention period is how long a record must be kept before it may be archived or disposed of.', sec: 'S8' },
      { q: 'According to the file properties shown, on which date was the CONTENT of the file last changed?',
        options: ['3 March 2026', '15 March 2026', '12 March 2026', 'The date cannot be determined'], answer: 2,
        passage: `<p><b>EXHIBIT</b> · Properties of the file <i>Budget_2026.xlsx</i></p>
<table style="border:1px solid #888"><tbody>
<tr><th>Created</th><td>3 March 2026</td></tr>
<tr><th>Modified</th><td>12 March 2026</td></tr>
<tr><th>Accessed</th><td>15 March 2026</td></tr>
<tr><th>Owner</th><td>accounts01</td></tr>
</tbody></table>`,
        why: 'Key: C. The “Modified” date records when the content was last changed; “Accessed” only shows when the file was last opened.', sec: 'S8' },
      { q: 'Which of the following file names follows good practice so that files sort correctly by date?',
        options: ['Document1.docx', '2026-03-05_Minutes.docx', 'Minutes March 5.docx', '05-03-26 min.docx'], answer: 1,
        why: 'Key: B. Placing the date first in YYYY-MM-DD format with a clear descriptive name makes files sort in date order.', sec: 'S8' },

      // ---- Items 52–60: Section IX
      { q: 'A singer receives a fee each time a radio station plays her song. This payment is an example of the singer’s',
        options: ['economic rights', 'privacy rights', 'moral rights', 'trademark rights'], answer: 0,
        why: 'Key: A. Economic rights entitle a creator to be paid, for example through royalties, when others use the work.', sec: 'S9' },
      { q: 'Which of the photographer’s rights has the newspaper violated?',
        options: ['Both economic and moral rights', 'Economic rights only', 'Moral rights only', 'Neither economic nor moral rights'], answer: 2,
        passage: `<p><b>EXHIBIT</b> · A newspaper in Roseau paid a photographer the agreed fee to print one of her photographs and credited her by name. However, the editor altered the photograph without her consent, changing its meaning in a way that damaged her reputation.</p>`,
        why: 'Key: C. She was paid, so her economic rights were respected, but altering the work without consent breaches her moral rights.', sec: 'S9' },
      { q: 'Jada submitted an essay she had written last year for another subject as a new assignment, without telling her teacher. This act is called',
        options: ['piracy', 'citation', 'self-plagiarism', 'paraphrasing'], answer: 2,
        why: 'Key: C. Self-plagiarism is reusing one’s own earlier work without acknowledging that it has been used before.', sec: 'S9' },
      { q: 'Which of the following practices help a student to AVOID plagiarism?<br>I. Including in-text citations for sources used<br>II. Changing a few words in a copied paragraph<br>III. Providing a bibliography at the end of the document',
        options: ROMAN.slice(), answer: 1,
        why: 'Key: B. Citations and a bibliography acknowledge sources; changing only a few words of copied text is still plagiarism.', sec: 'S9' },
      { q: 'Teaching and learning materials that are deliberately released for free use, adaptation and sharing by the public are called',
        options: ['proprietary software', 'pirated materials', 'Open Educational Resources', 'trade secrets'], answer: 2,
        why: 'Key: C. Open Educational Resources (OERs) are released for free use, often under Creative Commons licences.', sec: 'S9' },
      { q: 'Typing an entire e-mail message in capital letters is considered poor netiquette because it',
        options: ['uses more storage space', 'cannot be printed clearly', 'is always blocked by spam filters', 'is read as shouting'], answer: 3,
        why: 'Key: D. Text written entirely in capitals is widely read as shouting and appears rude.', sec: 'S9' },
      { q: 'Which desirable work attitude is shown by Darnell in the extract?',
        options: ['Good grooming', 'Courtesy', 'Team spirit', 'Individual responsibility'], answer: 3,
        passage: `<p><b>EXHIBIT</b> · Darnell is an office assistant at a firm on Frederick Street. While his supervisor was overseas for a week, he completed all of his filing and data entry accurately and on time without being reminded.</p>`,
        why: 'Key: D. Completing tasks reliably and to standard without supervision shows individual responsibility.', sec: 'S9' },
      { q: 'Repeated, deliberate harm directed at another person through online messages and posts is called',
        options: ['hacking', 'phishing', 'spamming', 'cyberbullying'], answer: 3,
        why: 'Key: D. Cyberbullying is repeated, deliberate harm aimed at someone online and is a serious breach of netiquette.', sec: 'S9' },
      { q: 'After e-mailing an important contract to a client, Ms Hodge telephones the client the next day to confirm that it was received. This is an example of',
        options: ['submission of assignments', 'time management', 'follow-up procedures', 'remote working etiquette'], answer: 2,
        why: 'Key: C. Follow-up procedures involve checking that work sent or delegated was received and acted upon.', sec: 'S9' }
    ]
  }]);
})();
