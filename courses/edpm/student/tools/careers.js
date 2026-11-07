/* EDPM: Careers & Connections — Office Administration links, EDPM in careers, skills across professions, EDPM across the curriculum — Developed by Kester Small */
(function () {
  const SEC = { S1: 'Section I · Fundamentals of Computing', S2: 'Section II · Keyboard Mastery', S3: 'Section III · Introduction to Application Software', S4: 'Section IV · Use of Application Software', S5: 'Section V · Business Document Preparation', S6: 'Section VI · Specialised Document Preparation', S7: 'Section VII · Electronic Communication', S8: 'Section VIII · Document Management', S9: 'Section IX · Ethics' };
  const ROM = { S1: 'I', S2: 'II', S3: 'III', S4: 'IV', S5: 'V', S6: 'VI', S7: 'VII', S8: 'VIII', S9: 'IX' };
  const TABS = [['oa', '🏢', 'Office Administration links'], ['careers', '💼', 'EDPM in careers'], ['skills', '🧩', 'Skills across professions'], ['curriculum', '📚', 'Across the curriculum']];

  /* ===================== 1. OFFICE ADMINISTRATION LINKS =====================
     Distilled (paraphrased) from CSEC Office Administration syllabus, CXC 27/O/SYLL 24 (revised 2024),
     mapped to CSEC EDPM, CXC 34/G/SYLL 24. */
  const OA = [
    { id: 'office', n: 'The office and its functions', oa: 'OA Section I · SO 1–2', blurb: 'What an office is for, and how the size and type of a business shape it.',
      pts: ['The office is the information centre of an organisation: it receives, records, processes, stores and sends out information.',
        'The OA syllabus groups its functions as: supporting the production, distribution and exchange of goods and services; collecting, processing, storing and preserving data; spreading information to those who need it; and supporting management and legal control.',
        'Office work should serve the organisation’s mission, vision and goals. Goals are the measurable targets, for example “answer every e-mail within 24 hours”.',
        'The size and nature of a business decide how many posts there are, who reports to whom (shown on an organisational chart), the duties of each post and how much technology is used.',
        'Services can be centralised (one word-processing, printing or records unit for the whole firm) or decentralised (each department does its own).'],
      links: [['S6', 'SO 1', 'Advanced displays include organisational charts and flow charts (Portfolio element 5). OA explains what the chart means; EDPM teaches you to lay it out in landscape with narrow margins using SmartArt or shapes.'],
        ['S3', 'SO 7', 'Choosing the right software for each office function: word processing for letters, spreadsheets for figures, databases for records.'],
        ['S8', 'SO 1–3', 'The “store and preserve data” function is exactly what Document Management covers: manual and electronic filing, folders and files.']],
      go: [['portfolio', 'chart', 'Portfolio element 5: chart']],
      ex: { t: 'Organisational chart for a resort in Negril', b: '<p>The HR office of a mid-sized resort asks you to produce its organisational chart for the staff handbook. The General Manager is at the top. Five managers report to the GM: Front Office, Food and Beverage, Housekeeping, Accounts and Human Resources.</p><ol><li>Set the page to <b>landscape</b> with <b>narrow margins</b> (EDPM portfolio mark scheme).</li><li>Insert a SmartArt <b>hierarchy</b>: one box at level 1, five boxes at level 2.</li><li>Use one clear font and a harmonious colour scheme; key in titles in title case.</li><li>Add the main heading ORGANISATIONAL CHART and the date in the footer.</li></ol>' },
      q: [['Which of these is NOT an office function in the OA syllabus?', ['Collecting, processing and storing data', 'Spreading information to those who need it', 'Manufacturing goods on the factory floor', 'Supporting management and legal control'], 2, 'The office supports production with information and records, but it does not make the goods itself.'],
        ['A firm sets up one unit that does all the word processing and printing for every department. This is…', ['decentralisation', 'centralisation', 'telecommuting', 'an open-plan layout'], 1, 'One shared unit serving everyone is centralisation.'],
        ['In EDPM, an organisational chart for the portfolio should be displayed…', ['portrait with wide margins', 'as a ruled tabulation', 'landscape with narrow margins', 'as a memo'], 2, 'The portfolio mark scheme awards marks for narrow margins and landscape orientation with a correct chart layout.'],
        ['Which is a measurable goal?', ['Be friendly to guests', 'Answer every guest e-mail within 24 hours', 'Value our staff', 'Be the best hotel'], 1, 'Goals are measurable objectives: you can check whether every e-mail was answered within 24 hours.']] },

    { id: 'layout', n: 'Office layout, ergonomics and safety', oa: 'OA Section I · SO 3–4', blurb: 'Traditional, open-plan and virtual offices, and fitting the workplace to the worker.',
      pts: ['<b>Traditional (cellular)</b> offices are enclosed rooms: private and quiet, but costly and harder to supervise.',
        '<b>Open plan (modular)</b> offices share one floor with workstations or partitions: easier communication and supervision, cheaper to run, but noisier and less private.',
        'A <b>virtual office</b> has staff working remotely with the internet, cloud storage and video calls: low rent and flexible, but it depends on reliable connectivity and self-discipline.',
        '<b>Ergonomics</b> means fitting the workplace to the worker: layout and size, furniture and equipment, seating, lighting, ventilation and temperature.',
        'Common office hazards: trailing cables, blocked exits, glare, poor lighting, eye strain, back pain and repetitive strain injury (RSI).'],
      links: [['S2', 'SO 2', 'Correct posture at the computer: feet flat, back supported, screen at eye level, wrists level. EDPM names standing desks, furniture and lighting as ergonomic trends.'],
        ['S1', 'SO 9', 'Health, ergonomics, safety and the effects of extended computer use.'],
        ['S9', 'SO 6, SO 8', 'Organising your workstation, and remote working etiquette for the virtual office.']],
      ex: { t: 'Ergonomics audit of the computer lab', b: '<p>Your class audits the computer lab and presents the result as a ruled tabulation (EDPM Section IV, SO 3).</p><div class="cc-scroll"><table><tr><th>Item</th><th>Standard</th><th>Our lab</th><th>Action</th></tr><tr><td>Screen height</td><td>Top of screen at or just below eye level</td><td>Too low on 8 desks</td><td>Raise monitors</td></tr><tr><td>Chairs</td><td>Adjustable, with back support</td><td>Fixed stools</td><td>Request 10 chairs</td></tr><tr><td>Lighting</td><td>No glare on screens</td><td>Glare after 2:00 pm</td><td>Close blinds</td></tr><tr><td>Cables</td><td>Tied back, not across walkways</td><td>Loose at the back row</td><td>Fit cable ties</td></tr></table></div>' },
      q: [['Which layout gives staff the most privacy?', ['Open plan', 'Traditional (cellular)', 'Virtual', 'Hot-desking'], 1, 'Enclosed (cellular) offices give the most privacy, at a higher cost.'],
        ['Ergonomics is mainly about…', ['decorating the office', 'fitting equipment and the workplace to the worker’s comfort, health and safety', 'saving paper', 'rules of filing'], 1, 'Ergonomics fits the job and equipment to the person.'],
        ['A typist gets neck strain because the monitor is too low. The best fix is to…', ['type faster', 'change the font colour', 'switch the page to landscape', 'raise the monitor so the top is at about eye level'], 3, 'EDPM Section II teaches screen-to-eye-level contact for correct posture.'],
        ['A main advantage of a virtual office is…', ['lower rent and flexible working', 'no need for the internet', 'easier face-to-face supervision', 'less need for e-mail'], 0, 'Virtual offices save on rent and allow flexible working, but rely on technology.']] },

    { id: 'equip', n: 'Office resources and equipment', oa: 'OA Section I · SO 5–6', blurb: 'From guillotines to plotters, and how to decide whether to buy or rent.',
      pts: ['Cutting and destroying: the <b>guillotine</b> trims stacks of paper cleanly; the <b>shredder</b> destroys confidential documents.',
        'Reproduction: <b>multi-function printers</b> (print, copy, scan, fax), the <b>risograph</b> or duplicator for cheap long runs, <b>scanners</b>, and <b>plotters</b> for large plans and banners.',
        'Presentation technology: computers, digital cameras, projectors and smartboards.',
        'Finishing: laminators, binding machines and label makers.',
        'Productivity tools: word processing, spreadsheet, database, presentation, desktop publishing and cloud collaboration apps.',
        'When selecting equipment consider <b>efficiency, effectiveness, cost and feasibility</b>, including whether to buy or rent.'],
      links: [['S1', 'SO 4–6, SO 8', 'Input and output devices, storage media, and caring for computers and peripherals.'],
        ['S7', 'SO 1', 'Scan to mail and scan to file on multifunctional devices.'],
        ['S8', 'SO 5–6', 'Shredding is the secure disposal step at the end of a document’s retention period.'],
        ['S6', 'SO 1', 'Binding and laminating finish your booklets, programmes and 4/6/8-page leaflets.']],
      ex: { t: 'Printing the prize-giving programme', b: '<p>The school needs 300 copies of a four-page prize-giving programme.</p><ol><li>Design the booklet in Publisher (EDPM Section VI, SO 1) and print one proof on the multi-function printer.</li><li>Proofread the proof using correction signs, then run 300 copies on the risograph, which is cheaper per copy for long runs.</li><li>Fold, staple-bind and trim the edges with the guillotine.</li><li>Shred any spoiled copies of the confidential prize-winners list printed before the ceremony.</li></ol>' },
      q: [['The cheapest way to produce 500 copies of a one-colour flyer is usually a…', ['plotter', 'laminator', 'risograph (duplicator)', 'scanner'], 2, 'Duplicators are designed for long, low-cost runs.'],
        ['A printed list of staff salaries is no longer needed. You should…', ['shred it', 'put it in the recycling bin', 'scan it and e-mail it to everyone', 'laminate it'], 0, 'Confidential paper is shredded, which links to EDPM Section VIII on secure disposal.'],
        ['“Feasibility” when choosing equipment refers to…', ['the colour of the machine', 'whether buying or renting is practical for the office', 'the font choice', 'typing speed'], 1, 'The OA syllabus names purchasing versus renting under feasibility.'],
        ['Which device prints large architectural plans?', ['Label maker', 'Guillotine', 'Binding machine', 'Plotter'], 3, 'Plotters print large-format drawings, plans and banners.']] },

    { id: 'reception', n: 'Reception and telephone techniques', oa: 'OA Section II · SO 1–3; Section III · SO 6', blurb: 'The front desk, taking messages, and the telecom services offices rely on.',
      pts: ['The reception desk creates the first impression: it builds goodwill and a positive image, and links the organisation with internal and external customers.',
        'Receptionist duties: receive and screen visitors, introduce them properly, keep the reception register (manual or electronic), operate the telephone system, receive letters and parcels, and keep the area welcoming.',
        'Attributes: neat grooming, good temperament, initiative, tact and clear speech.',
        'Telephone etiquette: answer promptly, greet, give the organisation’s name and your own, listen carefully, and never leave a caller on hold without checking back.',
        'A complete message records who it is for, the caller and their organisation, the number, date and time, the message, the action needed and who took it.',
        'Telecom services: local, regional and international calls, conference and video calls, call waiting and forwarding, voicemail, caller ID, text and instant messaging, and VoIP.'],
      links: [['S5', 'SO 8', 'Composing at the keyboard from notes and audio messages: turning a voicemail into a clear typed message or memo.'],
        ['S4', 'SO 4', 'A visitors’ register or company telephone directory is a single-table database you can query, for example all visitors on one date.'],
        ['S6', 'SO 3', 'Design the telephone message form as a reusable template.'],
        ['S7', 'SO 1, SO 4', 'VoIP, messaging apps and other new and emerging communication technologies.']],
      ex: { t: 'A complete telephone message', b: '<div class="cc-scroll"><table><tr><th colspan="2">TELEPHONE MESSAGE</th></tr><tr><td>For</td><td>Mr R. Richardson, Accounts Manager</td></tr><tr><td>Date / time</td><td>14 October 2026 · 10:40</td></tr><tr><td>Caller</td><td>Ms A. Brooks, Bayside Supplies</td></tr><tr><td>Telephone</td><td>+1 721 555 0142</td></tr><tr><td>Message</td><td>Invoice 2231 was sent twice. Please cancel the duplicate and issue a credit note.</td></tr><tr><td>Action</td><td>Please call back before 3:00 pm</td></tr><tr><td>Taken by</td><td>K. Hodge</td></tr></table></div><p>Notice the 24-hour time, the full international number and the clear action line.</p>' },
      q: [['Which is a duty of a receptionist?', ['Preparing final accounts', 'Receiving and screening visitors', 'Drafting a will', 'Designing the company website'], 1, 'Receiving and screening visitors is the first duty listed in OA Section II.'],
        ['A complete telephone message must include…', ['only the caller’s name', 'a signature from the manager', 'the caller, number, date and time, message and who took it', 'the receptionist’s timetable'], 2, 'Without the number, time and taker, the message cannot be followed up.'],
        ['Caller ID is…', ['a postal service', 'a feature that shows the caller’s number before you answer', 'a filing method', 'a type of cheque'], 1, 'It is one of the telephone services in OA Section III, SO 6.'],
        ['Which EDPM skill turns a voicemail into a typed memo?', ['Grouping objects', 'Creating a primary key', 'Defragmenting a hard drive', 'Composing at the keyboard from notes and audio (Section V)'], 3, 'Section V, SO 8 includes composition from audio messages.']] },

    { id: 'diary', n: 'Appointments, diaries and reminders', oa: 'OA Section II · SO 4–5', blurb: 'Managing an executive’s time with manual and electronic systems.',
      pts: ['Making an appointment: check the diary, confirm date, time, place, purpose and contact details, then record it at once.',
        'Cancelling or rescheduling: tell everyone involved promptly, offer alternatives, update every copy of the diary and confirm in writing.',
        'Appointment systems can be manual (desk diary, appointment book) or electronic (shared calendars that send reminders and invitations).',
        'Reminder systems: <b>tickler files</b> (a follow-up file divided by day and month), diaries and calendars stop deadlines from being missed.',
        'Allow travel time between appointments, and check time zones for overseas calls.'],
      links: [['S4', 'SO 3', 'A weekly schedule is a tabulation with column headings such as Time, Appointment, Venue and Notes.'],
        ['S9', 'SO 6', 'Organising work, time management and follow-up procedures.'],
        ['S8', 'SO 3', 'Folders organised by date on a drive are the electronic version of a tickler file.'],
        ['S7', 'SO 2', 'Sending invitations and confirmations by e-mail with a clear subject line.']],
      ex: { t: 'The Principal’s Tuesday schedule', b: '<div class="cc-scroll"><table><tr><th>Time</th><th>Appointment</th><th>Venue</th><th>Notes</th></tr><tr><td>08:30</td><td>Heads of Department meeting</td><td>Conference room</td><td>Agenda attached</td></tr><tr><td>10:00</td><td>Parent meeting: Form 4</td><td>Principal’s office</td><td>Student file requested</td></tr><tr><td>11:30</td><td>Visit: education officer</td><td>Conference room</td><td>Visitor badge ready</td></tr><tr><td>13:30</td><td>Sports Day planning (moved from Monday)</td><td>Staff room</td><td>Confirmed by e-mail</td></tr></table></div><p>The rescheduled item is noted, and the confirmation method is recorded.</p>' },
      q: [['A tickler file is…', ['a computer virus', 'a type of envelope', 'a reminder (follow-up) file organised by dates', 'a staff contract'], 2, 'Tickler files bring items forward on the day they need attention.'],
        ['When an appointment is rescheduled you should…', ['inform everyone involved and update the diary', 'simply delete it', 'wait for the visitor to call', 'change only the paper diary'], 0, 'Every party and every copy of the diary must be updated.'],
        ['The best EDPM tool for a weekly schedule with columns for time, name and purpose is…', ['a will', 'a tabulation (table)', 'a press release', 'a flow chart'], 1, 'Schedules are tabulations: Section IV, SO 3.'],
        ['One advantage of an electronic calendar is…', ['it needs no power', 'it never makes mistakes', 'nobody else can ever see it', 'automatic reminders and easy sharing'], 3, 'Electronic systems remind you and can be shared with colleagues.']] },

    { id: 'channels', n: 'Communication channels and barriers', oa: 'OA Section III · SO 1–3', blurb: 'Which way messages flow, which form to use and what gets in the way.',
      pts: ['Direction: <b>downward</b> (manager to staff), <b>upward</b> (staff to manager), <b>horizontal</b> (between equals), <b>diagonal</b> (across departments and levels) and the <b>grapevine</b> (informal).',
        'Forms: oral (interviews, meetings, telephone), written (letters, memos, agendas, minutes, reports, questionnaires, itineraries, notices, press releases, advertisements), electronic (e-mail, intranet, video conferencing, webinars, social media, scan to e-mail), visual (charts, graphs, signs, multimedia) and non-verbal.',
        'Non-verbal communication includes body language, <b>proxemics</b> (use of personal space) and <b>paralanguage</b> (tone, pitch and pace of the voice).',
        'Choosing a channel: urgency, genre, confidentiality and privacy, location and time zones, cost, efficiency, effectiveness and audience size.',
        'Barriers: perceptual, cultural and personal bias, semantics (word meanings), language, literacy, internal and external noise, and a closed communication climate.'],
      links: [['S7', 'SO 6', 'The EDPM factors for choosing communication media are almost the same list: urgency, genre, confidentiality, location and time zone, cost, efficiency and effectiveness.'],
        ['S7', 'SO 3', 'Advantages and disadvantages of electronic communication: speed, cost, many recipients at once; errors in dispatch.'],
        ['S5', 'SO 5, SO 9', 'Written channels: letters and memoranda in the correct styles.'],
        ['S9', 'SO 7', 'Netiquette for e-mail, forums and social media.']],
      ex: { t: 'Tropical storm: telling 900 parents tonight', b: '<p>A tropical storm warning means school is closed tomorrow. The message is urgent, goes to a large audience and is not confidential.</p><div class="cc-scroll"><table><tr><th>Channel</th><th>Speed</th><th>Reach</th><th>Use it?</th></tr><tr><td>SMS / messaging broadcast</td><td>Minutes</td><td>Most parents</td><td>Yes, first</td></tr><tr><td>School social media and website</td><td>Minutes</td><td>Wide, public</td><td>Yes</td></tr><tr><td>E-mail</td><td>Minutes</td><td>Parents with e-mail</td><td>Yes, with details</td></tr><tr><td>Printed letter</td><td>Days</td><td>All, but slow</td><td>Later, as a formal record</td></tr></table></div>' },
      q: [['A message from the Principal to all teachers flows…', ['upward', 'downward', 'horizontally', 'through the grapevine'], 1, 'From a higher level to a lower level is downward communication.'],
        ['Proxemics refers to…', ['tone of voice', 'e-mail folders', 'paper sizes', 'the use of personal space'], 3, 'Proxemics is how distance and space send a message.'],
        ['Confidential salary details for one employee should be sent by…', ['a social media post', 'a notice on the board', 'a letter or memo marked CONFIDENTIAL in a sealed envelope', 'a press release'], 2, 'Confidentiality is a key factor in choosing the channel.'],
        ['A technical word the reader does not understand is a ___ barrier.', ['semantic', 'physical', 'time-zone', 'climate'], 0, 'Semantics is about the meaning of words.']] },

    { id: 'stationery', n: 'Stationery and reference sources', oa: 'OA Section III · SO 4–5', blurb: 'Paper and envelope sizes, and where offices look things up.',
      pts: ['Paper: <b>A4</b> (21 × 29.7 cm) is the international standard; <b>US letter</b> and <b>legal</b> sizes are common where American suppliers are used, and many Caribbean offices use both. A5 is half of A4; A6 is postcard size.',
        'Envelopes: <b>DL</b> (11 × 22 cm) takes A4 folded in three; <b>C5</b> (16.2 × 22.9 cm) takes A4 folded once; <b>C4</b> takes A4 flat; <b>C6</b> takes A4 folded into quarters. <b>Window</b> envelopes show the inside address so it is not typed twice.',
        'Stationery types include letterheads, memo forms, continuation sheets, copy paper, business cards, labels, index cards and printed forms.',
        'Reference sources: dictionary and thesaurus, official gazettes (government notices), telephone directories, maps and online maps, timetables and schedules, <b>Hansard</b> (the official record of parliamentary debates) and search engines.'],
      links: [['S5', 'SO 1–3', 'EDPM tests paper sizes and orientation, the international sizes from A3 to DL, and choosing stationery for a task.'],
        ['S5', 'SO 4, SO 6', 'Creating a letterhead; preparing envelopes and labels by mail merge.'],
        ['S4', 'SO 2', 'Using the thesaurus and spelling check while editing.'],
        ['S9', 'SO 4–5', 'When you use information from a reference source, acknowledge it to avoid plagiarism.']],
      ex: { t: 'Choosing stationery for a hotel office', b: '<div class="cc-scroll"><table><tr><th>Task</th><th>Paper</th><th>Envelope</th></tr><tr><td>One-page letter to a guest</td><td>A4 letterhead</td><td>DL window</td></tr><tr><td>Certificate that must not be folded</td><td>A4 card</td><td>C4</td></tr><tr><td>Programme folded once</td><td>A4 folded to A5</td><td>C5</td></tr><tr><td>Invitation card</td><td>A6 card</td><td>C6</td></tr></table></div>' },
      q: [['A4 paper folded once fits a…', ['DL envelope', 'C5 envelope', 'C4 envelope', 'C6 envelope'], 1, 'Folded once, A4 becomes A5, which fits C5.'],
        ['An unfolded A4 certificate needs a…', ['C4 envelope', 'DL envelope', 'C6 envelope', 'A6 envelope'], 0, 'C4 takes A4 flat.'],
        ['Where would you find the official record of debates in Parliament?', ['A thesaurus', 'Hansard', 'A telephone directory', 'An atlas'], 1, 'Hansard records what is said in Parliament.'],
        ['Window envelopes save time because…', ['they need no stamps', 'they are always confidential', 'they need no folding', 'the inside address shows through, so it is not typed twice'], 3, 'The address on the letter doubles as the envelope address.']] },

    { id: 'mail', n: 'Handling incoming and outgoing mail', oa: 'OA Section III · SO 7–9', blurb: 'Post, couriers and e-mail: from date stamp to mail merge.',
      pts: ['Incoming mail: open it (except items marked private or confidential), date-stamp it, record it in the incoming mail register, check enclosures and route it to the right person, using a routing slip if several people must see it.',
        'Remittances (cash, cheques) are recorded and passed to accounts; registered mail is signed for.',
        'E-mail: filter junk and spam, never open suspicious attachments, report phishing, and organise messages into folders.',
        'Outgoing mail: check signatures and enclosures, sort, weigh, frank or stamp, and record postage in the postage book. Mailing lists are prepared by mail merge.',
        'Machines that speed up dispatch: franking, folding, collating and sealing machines.',
        'Services: local and overseas couriers; postal classes (priority, first class, express, standard) and options such as registered, recorded or express delivery and poste restante (collected at a post office).'],
      links: [['S4', 'SO 7', 'Mail merge with an external data source: Portfolio element 9 needs the primary document, a data source of 5 to 10 records and the merged letters.'],
        ['S5', 'SO 6–7', 'Envelopes and labels, and special notations such as CONFIDENTIAL, PRIVATE, URGENT and BY HAND.'],
        ['S7', 'SO 2, SO 5', 'To, Cc and Bcc, attachments and subject lines; sorting and archiving e-mail by date, sender and subject.'],
        ['S8', 'SO 2', 'Source and turnaround documents that arrive in the mail.']],
      go: [['portfolio', 'merge', 'Portfolio element 9: mail merge']],
      ex: { t: 'A field-trip letter to Form 3 parents', b: '<ol><li>Build the data source in a spreadsheet: Title, FirstName, LastName, Address1, District (for example Gros Islet, Vieux Fort, Soufrière, Castries).</li><li>Insert merge fields into the letter, preview, then merge to new documents.</li><li>Print DL labels from the same data source.</li><li>One parent asked for privacy: that envelope is marked PRIVATE AND CONFIDENTIAL above the address.</li><li>Send the e-mail version with every parent in <b>Bcc</b> so addresses stay private.</li></ol>' },
      q: [['To e-mail many parents without showing everyone’s address, put them in…', ['Cc', 'To', 'Bcc', 'Reply all'], 2, 'Bcc hides the recipients from each other.'],
        ['An envelope marked PRIVATE AND CONFIDENTIAL should be…', ['opened and date-stamped', 'delivered unopened to the addressee', 'shredded', 'forwarded to all staff'], 1, 'Only the addressee opens it.'],
        ['The postage book records…', ['postage used and stamps bought', 'staff leave', 'minutes of meetings', 'stock levels'], 0, 'It controls the money spent on postage.'],
        ['The EDPM feature that produces personalised letters from a list is…', ['a watermark', 'the thesaurus', 'grouping', 'mail merge'], 3, 'Mail merge combines a main document with a data source.']] },

    { id: 'meetings', n: 'Meetings and their documents', oa: 'OA Section IV · SO 1–7', blurb: 'Terms, roles, types of meetings, and the paperwork before and after.',
      pts: ['Terms: <b>quorum</b> (the minimum number of members needed to do business), <b>motion</b> or proposal, <b>resolution</b> (a motion that is passed), <b>casting vote</b> (the chairperson’s deciding vote in a tie), <b>adjourn</b>, <b>ad hoc</b> (for one purpose), <b>verbatim</b> (word for word) and <b>by-laws</b>.',
        'Documents: notice of meeting, agenda, minutes and reports.',
        'Roles: chairperson, secretary, treasurer, <b>proxy</b> (someone who votes for an absent member) and <b>ex-officio</b> member (a member because of the post they hold).',
        'Formal meetings include general meetings, the AGM, EGM, board and committee meetings, statutory meetings, conferences and webinars; staff and departmental meetings are informal.',
        'Before, during and after: book the venue or link, circulate papers, follow Standing Orders or Robert’s Rules of Order; afterwards file and index the minutes, circulate the action sheet and follow up decisions.'],
      links: [['S5', 'SO 10', 'Notice of meeting, agenda, minutes, action items and the chairman’s agenda.'],
        ['S4', 'SO 6', 'Presentations shown at meetings and webinars.'],
        ['S7', 'SO 1', 'Video conferencing and collaborative tools for virtual meetings.']],
      go: [['portfolio', 'committee', 'Portfolio element 3: committee documents']],
      ex: { t: 'Notice and agenda for a Student Council meeting', b: '<p><b>NOTICE OF MEETING</b><br>The next meeting of the Student Council will be held in the Library on Thursday 22 October 2026 at 2:30 pm. All class representatives are asked to attend.</p><p><b>AGENDA</b></p><ol><li>Welcome (a. Adoption of Agenda)</li><li>Minutes of the last Meeting</li><li>Matters Arising from the Minutes</li><li>New Business<br>4.1 Fun Day budget<br>4.2 Uniform donation drive<br>4.3 Beach clean-up</li><li>Any Other Business</li><li>Date of Next Meeting</li><li>Adjournment</li></ol><p>These are the seven standard agenda items in the EDPM exemplar, with New Business sub-numbered.</p>' },
      q: [['A quorum is…', ['the minimum number of members needed to conduct business', 'the chairperson’s extra vote', 'a word-for-word record', 'a meeting held once a year'], 0, 'Without a quorum, decisions are not valid.'],
        ['The chairperson uses a casting vote to…', ['open the meeting', 'approve the agenda', 'break a tie', 'appoint a proxy'], 2, 'It is a deciding vote when the votes are equal.'],
        ['A member who cannot attend authorises someone else to vote for them. That person is a…', ['treasurer', 'proxy', 'secretary', 'ex-officio member'], 1, 'A proxy acts on behalf of an absent member.'],
        ['Which document lists who must do what, by when, after the meeting?', ['The notice', 'The agenda', 'The letterhead', 'The action sheet'], 3, 'EDPM portfolio minutes include action items naming the person responsible.']] },

    { id: 'travel', n: 'Travel arrangements', oa: 'OA Section V · SO 1–5', blurb: 'Bookings, documents, itineraries, time zones and money for the trip.',
      pts: ['Procedure: confirm dates and times, choose the mode (air, sea or land), check health, visa and entry requirements, compare routes and costs, then book accommodation and extra services such as tours or car hire.',
        'Travel documents: passport, travel permit, visa, entry permit and health certificate.',
        'Prepare tickets or e-tickets, read schedules, write the itinerary, set appointments at the destination, make hotel reservations and put copies of everything in a travel folder.',
        'Time: use the 12-hour or 24-hour clock consistently, calculate durations and adjust for time zones. St. Kitts and Nevis, like most of the Eastern Caribbean, is on Atlantic Standard Time (UTC−4) all year.',
        'Money for travel: debit and credit cards, letters of credit, bank drafts, cash and mobile money.'],
      links: [['S4', 'SO 3', 'An itinerary is a tabulation: Date, Time and Details, in time order.'],
        ['S7', 'SO 6', 'Location and time zones when choosing how and when to communicate.'],
        ['S8', 'SO 3', 'A travel folder on the shared drive with sub-folders for tickets, bookings and documents.'],
        ['S6', 'SO 1', 'Displays: the programme for the conference the traveller attends.']],
      ex: { t: 'Itinerary: workshop in Miami', b: '<div class="cc-scroll"><table><tr><th>Date</th><th>Time (local)</th><th>Details</th></tr><tr><td>Wed 11 Nov 2026</td><td>10:15</td><td>Depart SKB (St. Kitts), flight XY 123</td></tr><tr><td></td><td>12:05</td><td>Arrive Miami (EST, UTC−5); flight time 2 h 50 min</td></tr><tr><td></td><td>15:00</td><td>Check in at hotel; confirmation in travel folder</td></tr><tr><td>Thu 12 Nov 2026</td><td>09:00–16:00</td><td>Regional teachers’ workshop</td></tr><tr><td>Fri 13 Nov 2026</td><td>14:30</td><td>Depart Miami</td></tr><tr><td></td><td>18:20</td><td>Arrive SKB (AST)</td></tr></table></div><p>Miami is one hour behind St. Kitts in November: 10:15 + 2 h 50 min = 13:05 in St. Kitts, which is 12:05 in Miami.</p>' },
      q: [['3:45 pm in the 24-hour clock is…', ['03:45', '15:45', '13:45', '16:45'], 1, 'Add 12 to afternoon hours: 3 + 12 = 15.'],
        ['A flight leaves St. Kitts at 10:15 and takes 2 h 50 min. Miami is one hour behind. Local arrival time is…', ['13:05', '11:05', '12:05', '14:05'], 2, '10:15 + 2:50 = 13:05 in St. Kitts, minus one hour = 12:05 in Miami.'],
        ['The permission to enter a country, often stamped in or attached to a passport, is a…', ['bank draft', 'manifest', 'itinerary', 'visa'], 3, 'A visa is a travel document; the OA syllabus lists it with the passport and entry permit.'],
        ['In EDPM, an itinerary is best produced as a…', ['tabulation', 'will', 'flyer', 'organisational chart'], 0, 'Dates, times and details line up in columns.']] },

    { id: 'records', n: 'Records and information management', oa: 'OA Section VI · SO 1–8', blurb: 'Filing systems, indexing, retention and the law on access.',
      pts: ['A records clerk prepares documents, processes data, manages manual and electronic records and retrieves information quickly.',
        'An effective system has access protocols, physical and password security, accountability and room to expand; it may use a database, batch or real-time processing, file compression (zipping) and archiving.',
        'Classification: <b>alphabetical, geographical, subject, numerical, alpha-numeric</b> and <b>chronological</b>.',
        'Indexing and cross-referencing: out cards or out guides (showing a file has been borrowed), tickler files, card indicators, colour coding, searches and shared databases.',
        'Inactive files: microfilm or scan, apply retention periods, dispose of securely, archive, and back up off-site or to the cloud.',
        'The law: right of access and its limits, copyright, defamation, breach of confidence, secrecy provisions, freedom of information and document retention policies. Records may be centralised (one records office) or decentralised (each department).'],
      links: [['S8', 'SO 1, SO 3', 'Manual versus electronic filing; drives, folders and files in a hierarchy.'],
        ['S8', 'SO 4–7', 'File integrity, physical and cyber security, retention and disposal, version control and metadata.'],
        ['S4', 'SO 4', 'A single-table database with a primary key, a query and a report (Portfolio element 8).'],
        ['S9', 'SO 1–3', 'Copyright and intellectual property when you store and share other people’s work.']],
      go: [['portfolio', 'db', 'Portfolio element 8: database']],
      ex: { t: 'An electronic file plan for the school office', b: '<p><b>Folders:</b> SMA_Office › 2026-27 › Correspondence › Incoming | Outgoing</p><p><b>File name:</b> 2026-10-14_Letter_FieldTrip_Parents_v2.docx</p><ul><li>The date first (year-month-day) keeps files in chronological order.</li><li>The subject words make searching easy.</li><li>“v2” shows the version, so nobody edits an old copy (EDPM Section VIII, SO 7).</li></ul><p><b>Alphabetical card index:</b> Arrindell, Brooks, Carty, Hodge, Richardson, Wathey.</p>' },
      q: [['Filing customer records by country or district is…', ['numerical', 'chronological', 'geographical', 'subject'], 2, 'Geographical filing groups records by place.'],
        ['An out card (out guide) shows…', ['that a file has been borrowed, by whom and when', 'that a file has been destroyed', 'that a file is compressed', 'a type of envelope'], 0, 'It is placed where the file normally sits.'],
        ['Zipping files means…', ['deleting them', 'compressing them to save space or send them', 'printing them', 'renaming them'], 1, 'Compression is listed in OA Section VI as part of storage.'],
        ['Retention periods and disposal are covered in EDPM…', ['Section II · Keyboard Mastery', 'Section VI · Specialised Documents', 'Section III · Application Software', 'Section VIII · Document Management'], 3, 'Section VIII, SO 6 covers archiving, retention period and disposal.']] },

    { id: 'hr', n: 'Human resources and getting a job', oa: 'OA Section VII · SO 1–10; Section I · SO 7–8', blurb: 'Personnel records, job applications, interviews and work attitudes.',
      pts: ['The HR office recruits, inducts, deploys, appraises, trains and looks after staff welfare, safety and discipline, and writes job descriptions.',
        'The HR clerk keeps personnel records (contracts, service records, leave applications, personal histories, appraisal forms, job descriptions and specifications) with confidentiality, patience and tact.',
        'Finding jobs: newspapers, employment agencies, the internet and social media, company websites, personal contacts, newsletters, guidance counsellors and internships.',
        'Employment documents: application form, application letter, CV or résumé, references and portfolio; follow-up letters if there is no reply and to accept a post; later, leave applications, acknowledgement and resignation letters.',
        'Interview preparation: attire, deportment, research on the organisation, practice questions and evidence of qualifications; for a virtual interview, test the camera, sound and background.',
        'Skills and attitudes employers want: literacy, numeracy, productivity-tool skills, communication, time management and problem-solving; team spirit, tolerance, punctuality, integrity and confidentiality.'],
      links: [['S5', 'SO 5', 'Letters of application, acceptance and resignation in blocked or semi-blocked style.'],
        ['S6', 'SO 2', 'The contract of employment is one of the legal documents in Portfolio element 6.'],
        ['S4', 'SO 4, SO 7', 'A personnel database with a query and report; mail-merged offer letters.'],
        ['S9', 'SO 8', 'Desirable habits and work attitudes: meeting deadlines, team spirit, courtesy, punctuality, integrity and remote working etiquette.']],
      go: [['portfolio', 'legal', 'Portfolio element 6: legal work']],
      ex: { t: 'Application letter for a holiday job', b: '<p>14 October 2026</p><p>The Office Manager<br>Harbourview Property Services<br>Main Street<br>Road Town<br>Tortola</p><p>Dear Sir or Madam</p><p><b>APPLICATION FOR THE POST OF JUNIOR OFFICE ASSISTANT</b></p><p>I wish to apply for the post advertised on your website on 10 October 2026.</p><p>I am a Grade One EDPM student at Sea-Almond Secondary School. I type at 40 words per minute and use Word, Excel and Access to prepare letters, tabulations and simple databases.</p><p>I am available from 1 July and enclose my CV and a reference from my teacher.</p><p>Yours faithfully</p><p>[Signature]<br>[Name]</p><p>Enc</p><p class="cc-note">Blocked style with open punctuation: no commas after the salutation or the complimentary close.</p>' },
      q: [['The document that lists the qualifications, skills and experience a person needs for a job is the…', ['job specification', 'job description', 'appraisal form', 'contract of employment'], 0, 'The description lists duties; the specification describes the person needed.'],
        ['You have had no reply to an application after a reasonable time. You should…', ['apply again every day with the same letter', 'send a polite follow-up letter or e-mail', 'complain on social media', 'give up'], 1, 'The OA syllabus names follow-up communication when no reply is received.'],
        ['Which is a legal document in the EDPM portfolio?', ['A flyer', 'A memo', 'A contract of employment', 'An agenda'], 2, 'Portfolio element 6 allows a lease, hire purchase agreement, will or contract of employment.'],
        ['Preparing for a virtual interview includes…', ['sitting with a bright window behind you', 'leaving notifications switched on', 'wearing beachwear', 'testing the camera, microphone and connection'], 3, 'The OA syllabus lists the requirements for a virtual interview.']] },

    { id: 'accounts', n: 'Accounts, payments and purchasing', oa: 'OA Sections VIII–IX', blurb: 'Pay slips, cheques, petty cash, orders, stock and trade terms.',
      pts: ['The accounts office prepares payroll, controls credit, collects accounts, issues debit and credit notes, prepares for audits and manages bank accounts.',
        'Documents: pay slips, currency memorandum, debit and credit notes, statements of account, cheques, and petty cash vouchers under the <b>imprest system</b> (the float is topped up by the amount spent).',
        'Bank reconciliation compares the cash book with the bank statement; differences come from unpresented cheques, outstanding deposits, bank charges, standing orders, credit transfers, interest and NSF (refer to drawer) cheques.',
        'Payments: cash, cheques (open, crossed, certified, post-dated, stale-dated), cards with chip and PIN, transfers, standing orders, bank drafts, letters of credit and mobile money.',
        'Purchasing: requisition, find suppliers, check catalogues, make enquiries or invite tenders, compare quotations, place the order, receive and check the delivery.',
        'Terms: E&amp;OE, c.o.d., c.w.o., F.O.B., C.I.F., ex works, VAT, trade and cash discounts, and <b>2/10, n/30</b> (2% discount if paid within 10 days, otherwise the full amount within 30). Stock is controlled with stock cards, FIFO, LIFO or AVCO, bar-code scanners and inventory software.'],
      links: [['S4', 'SO 3', 'Advanced tabulation with SUM, AVERAGE, MIN and MAX, charts, and currency formatting.'],
        ['S6', 'SO 2', 'Financial statements: trial balance, balance sheet, profit and loss, income and expenditure, invoice, bank statement and receipts (Portfolio element 2).'],
        ['S6', 'SO 3', 'Templates for order forms, requisitions and petty cash vouchers.'],
        ['S4', 'SO 4', 'An inventory database (the portfolio database element suggests inventory records).']],
      go: [['portfolio', 'financial', 'Portfolio element 2: financial document']],
      ex: { t: 'Petty cash summary: US$200 imprest', b: '<div class="cc-scroll"><table><tr><th>Date</th><th>Voucher</th><th>Details</th><th>Total US$</th></tr><tr><td>12 Oct</td><td>V01</td><td>Stamps</td><td>18.50</td></tr><tr><td>13 Oct</td><td>V02</td><td>Printer paper</td><td>32.00</td></tr><tr><td>14 Oct</td><td>V03</td><td>Cleaning supplies</td><td>24.75</td></tr><tr><td>15 Oct</td><td>V04</td><td>Courier to Curaçao</td><td>45.00</td></tr><tr><th colspan="3">Total spent =SUM(D2:D5)</th><th>120.25</th></tr></table></div><p>Balance in hand: 200.00 − 120.25 = <b>79.75</b>. To restore the imprest, the cashier receives <b>120.25</b>. In Excel, format the column as currency with 2 decimal places.</p>' },
      q: [['“2/10, n/30” on an invoice means…', ['10% discount if paid within 2 days', 'pay twice within 30 days', 'a 2% discount if paid within 10 days, otherwise the full amount within 30 days', '30% discount after 10 days'], 2, 'It encourages early payment.'],
        ['Under the imprest system, at the end of the period the petty cashier receives…', ['the amount spent, restoring the float', 'double the float', 'nothing', 'the closing balance'], 0, 'Topping up by the amount spent restores the float to its original level.'],
        ['The document sent to reduce the amount a customer owes, for example after goods are returned, is a…', ['debit note', 'credit note', 'quotation', 'invoice'], 1, 'A credit note reduces what the customer owes.'],
        ['Which spreadsheet function adds a column of expenses?', ['MAX', 'AVERAGE', 'MIN', 'SUM'], 3, 'SUM totals a range; it is one of the functions named in EDPM Section IV, SO 3.']] },

    { id: 'sales', n: 'Sales, marketing, customer service and dispatch', oa: 'OA Sections X–XI', blurb: 'Quotations, flyers, press releases, delivery notes and shipping papers.',
      pts: ['Sales office: sales records, commissions and discounts, stock control and customer follow-up. Documents: quotations, proforma invoices, invoices and e-invoices.',
        'Marketing office: promotions, strategy, budgeting, advertising, branding and new markets. Documents: flyers, advertisements, press releases and surveys.',
        'Customer service handles queries and complaints face to face and online, and advises customers on products.',
        'The corporate communications clerk helps produce newsletters, calendars and social media content, keeps the website up to date and supports sponsorship and corporate social responsibility events.',
        'Incentives: trade, cash and quantity discounts, special offers and coupons, loyalty cards, goods on consignment and gifts with purchase.',
        'Operations, dispatch and transport: shift rosters, production reports, job and time cards; delivery schedules, destination sheets, delivery and advice notes, bills of lading, airway bills, manifests, customs forms, insurance certificates, import and export licences and certificates of origin.'],
      links: [['S6', 'SO 1', 'Flyers, newsletters and 4/6/8-page leaflets.'],
        ['S6', 'SO 2', 'Press releases and financial documents such as invoices; the portfolio financial element even lists a bill of lading.'],
        ['S4', 'SO 5', 'Selecting and enhancing images for advertising.'],
        ['S7', 'SO 4', 'Social networking, blogging and vlogging used in marketing.'],
        ['S9', 'SO 1–3, SO 7', 'Copyright on photos and logos, and netiquette when replying to customers online.']],
      ex: { t: 'Press release layout', b: '<p><b>FOR IMMEDIATE RELEASE</b></p><p><b>Students Host Beach Clean-up at Grand Anse</b></p><p>ST. GEORGE’S, Grenada, 14 October 2026 – Forty students from Breadfruit Valley Secondary School collected more than 60 bags of litter on Saturday…</p><p>“We wanted to protect the beaches that bring visitors to our island,” said the club president.</p><p>– ENDS –</p><p>Media contact: [Name], [Telephone], [E-mail]</p><p class="cc-note">Most important facts first, a quotation, an end marker and contact details.</p>' },
      q: [['A document sent before goods are supplied, showing the price so the buyer can pay in advance, is a…', ['delivery note', 'credit note', 'proforma invoice', 'manifest'], 2, 'A proforma invoice comes before the goods.'],
        ['Which document lists all the cargo on a ship or aircraft?', ['A manifest', 'A quotation', 'A flyer', 'A time card'], 0, 'The manifest is one of the dispatch documents in OA Section XI.'],
        ['A press release usually begins with…', ['Dear Sir or Madam', 'FOR IMMEDIATE RELEASE and a dateline', 'an agenda', 'a table of contents'], 1, 'The release line and dateline tell editors when and where.'],
        ['Before using a photo from the internet in a flyer, you should…', ['remove the watermark', 'resize it so nobody notices', 'just copy it', 'check the licence or get permission, and credit it'], 3, 'EDPM Section IX covers intellectual property and Creative Commons licences.']] }
  ];

  /* ===================== 2. CAREERS ===================== */
  const FIELDS = [['biz', 'Business & administration'], ['law', 'Law'], ['health', 'Health'], ['edu', 'Education'], ['tour', 'Tourism & hospitality'], ['fin', 'Banking & finance'], ['gov', 'Government'], ['media', 'Media & publishing'], ['design', 'Design & marketing'], ['it', 'IT & web'], ['log', 'Logistics & trade'], ['re', 'Real estate'], ['ngo', 'NGOs & events'], ['ent', 'Entrepreneurship']];
  const FN = Object.fromEntries(FIELDS);
  const C = [
    { id: 'admin', n: 'Administrative assistant / executive secretary', f: 'biz', tags: ['org', 'detail', 'words', 'people'], does: 'Runs an executive’s office: the diary, correspondence, meetings, visitors and filing.',
      edpm: [['S2', 'Fast, accurate keyboarding and proofreading for every document'], ['S5', 'Letters, memos, notices, agendas and minutes'], ['S7', 'Managing the inbox, contacts and meeting invitations'], ['S8', 'Electronic filing and version control on the shared drive']],
      day: ['Sort and answer about 30 e-mails', 'Type a letter from the manager’s handwritten notes', 'Prepare the agenda for Thursday’s board meeting', 'Update the appointment diary', 'File the signed contracts in the correct folder'],
      subj: ['English A', 'Office Administration', 'Principles of Business', 'Information Technology'], emp: ['Private companies of every size', 'Government ministries and departments', 'Hotels and resorts', 'Law and accounting firms', 'Schools and colleges'] },
    { id: 'officeman', n: 'Office manager', f: 'biz', tags: ['lead', 'org', 'numbers', 'people'], does: 'Supervises office staff, equipment, supplies and procedures so the whole office runs smoothly.',
      edpm: [['S6', 'Reports, proposals and procedure manuals'], ['S4', 'Spreadsheets for budgets and supply costs'], ['S3', 'Choosing the right software for each task'], ['S8', 'Setting security, backup and retention rules'], ['S9', 'Modelling good work habits and deadlines']],
      day: ['Check the monthly office expenses spreadsheet', 'Draw up the staff rota', 'Approve a supplies order form', 'Update the office procedures manual', 'Write a short report to the director'],
      subj: ['Office Administration', 'Principles of Business', 'Principles of Accounts', 'Information Technology'], emp: ['Medium and large businesses', 'Utility and telecom providers', 'Hospitals and clinics', 'NGOs and foundations'] },
    { id: 'hr', n: 'Human resources assistant', f: 'biz', tags: ['people', 'org', 'care', 'detail'], does: 'Supports recruitment, contracts, leave and confidential staff records.',
      edpm: [['S6', 'Contracts of employment and other legal documents'], ['S4', 'A personnel database with queries and reports; mail-merged offer letters'], ['S5', 'Letters of offer, acknowledgement and acceptance'], ['S8', 'Restricted access and confidentiality of personnel files']],
      day: ['Format a job advertisement', 'Prepare the interview schedule', 'Prepare a contract of employment from a template', 'Update the leave register', 'Mail-merge welcome letters to new staff'],
      subj: ['Office Administration', 'Principles of Business', 'English A', 'Social Studies'], emp: ['Hotels and resorts', 'Banks and insurance companies', 'Government HR departments', 'Recruitment agencies'] },
    { id: 'legal', n: 'Legal secretary / paralegal', f: 'law', tags: ['law', 'words', 'detail'], does: 'Prepares, checks and manages legal documents and client files for lawyers.',
      edpm: [['S6', 'Wills, leases, conveyance documents, agreements, endorsements and contracts'], ['S2', 'Perfect accuracy: one wrong figure can change a contract'], ['S8', 'Version tracking, metadata and legal retention periods'], ['S9', 'Confidentiality and intellectual property']],
      day: ['Prepare a lease for a commercial unit', 'Type a will with its endorsement', 'Write a letter to the court registry', 'Index a client’s file', 'Compare two versions of a contract using track changes'],
      subj: ['English A', 'Office Administration', 'Social Studies', 'English B (Literature)'], emp: ['Law firms', 'Government legal affairs departments', 'Banks and trust companies', 'Insurance companies'] },
    { id: 'notary', n: 'Civil-law notary’s office clerk', f: 'law', tags: ['law', 'detail', 'numbers'], does: 'In territories with a Dutch-based legal system, such as Sint Maarten, Curaçao and Aruba, prepares deeds and papers for property transfers, company formation and wills in a notary’s office.',
      edpm: [['S6', 'Conveyance documents, agreements and templates for standard deeds'], ['S5', 'Formal letters to clients and banks'], ['S4', 'Tabulated fee statements'], ['S8', 'Scanning, archiving and legally required retention of deeds']],
      day: ['Draft a deed of transfer from a template', 'Write to a bank about a mortgage', 'Prepare a client checklist', 'Tabulate a fee statement', 'Scan and archive a signed deed'],
      subj: ['English A', 'Office Administration', 'Principles of Accounts', 'Modern languages (Dutch is a strong asset locally)'], emp: ['Notarial offices', 'Law firms', 'Banks and trust companies', 'Real estate firms'] },
    { id: 'transcribe', n: 'Court clerk / transcriptionist', f: 'law', tags: ['words', 'detail', 'tech'], does: 'Records proceedings and turns speech into accurate, formatted transcripts.',
      edpm: [['S2', 'Speed well beyond 35 wpm with a low error rate; manuscript signs'], ['S5', 'Composing from audio messages'], ['S4', 'Formatting long documents with headers, footers and page numbers'], ['S8', 'Secure storage and version control of official records']],
      day: ['Transcribe a hearing from an audio file', 'Tabulate today’s court list', 'Index filed cases', 'Prepare a certified copy of a document'],
      subj: ['English A', 'Information Technology', 'Office Administration'], emp: ['Courts', 'Parliament (verbatim reporting, as in Hansard)', 'Media houses', 'Captioning and transcription services'] },
    { id: 'medrec', n: 'Health information (medical records) clerk', f: 'health', tags: ['detail', 'care', 'tech'], does: 'Keeps patients’ records accurate, complete and confidential, on paper and in electronic systems.',
      edpm: [['S4', 'Databases: entering, querying and reporting on records'], ['S8', 'Access rights, security, backup and retention of records'], ['S9', 'Confidentiality and integrity'], ['S1', 'Scanners and other data-entry devices']],
      day: ['Register new patients', 'Scan paper records into the electronic system', 'Retrieve files for the afternoon clinic', 'Produce a monthly statistics table', 'Archive inactive files under the retention policy'],
      subj: ['Human and Social Biology', 'Information Technology', 'Office Administration', 'Mathematics'], emp: ['The hospital', 'Private clinics', 'Health insurers', 'Public health departments', 'Laboratories'] },
    { id: 'medoffice', n: 'Medical receptionist / medical office assistant', f: 'health', tags: ['people', 'care', 'org'], does: 'Runs the front desk of a clinic: appointments, patient registration, billing and letters.',
      edpm: [['S5', 'Referral letters typed from the doctor’s notes'], ['S4', 'Tabulated daily appointment lists'], ['S6', 'Templates for registration and claim forms'], ['S7', 'E-mail and text reminders to patients'], ['S9', 'Courtesy and confidentiality']],
      day: ['Print the daily appointment list', 'Type a referral letter', 'Complete an insurance claim form', 'Send reminder messages', 'Prepare invoices'],
      subj: ['Office Administration', 'Human and Social Biology', 'English A'], emp: ['Doctors’ and dentists’ practices', 'Pharmacies', 'The hospital', 'Physiotherapy and eye clinics'] },
    { id: 'teacher', n: 'Teacher', f: 'edu', tags: ['people', 'words', 'care', 'creative'], does: 'Plans lessons and assessments, produces learning materials and keeps student records.',
      edpm: [['S6', 'Worksheets, notices and displays'], ['S4', 'Presentations, and a spreadsheet mark book with AVERAGE'], ['S5', 'Letters to parents by mail merge'], ['S9', 'Open Educational Resources, Creative Commons and plagiarism checks']],
      day: ['Build lesson slides', 'Format a worksheet', 'Update the mark book', 'Mail-merge letters to parents', 'Write report comments'],
      subj: ['The subject you will teach', 'English A', 'Information Technology'], emp: ['Public and private schools', 'The university and colleges', 'Training institutes', 'The education ministry'] },
    { id: 'registrar', n: 'School administrative officer / registrar', f: 'edu', tags: ['org', 'detail', 'numbers'], does: 'Manages admissions, student records, timetables, transcripts and examination entries.',
      edpm: [['S4', 'A student records database, queries and reports'], ['S4', 'Mail merge for enrolment letters'], ['S8', 'Retention and security of student records'], ['S2', 'Accuracy when keying examination entries']],
      day: ['Check the CSEC entry list', 'Prepare a student transcript', 'Tabulate the exam timetable', 'Send enrolment letters', 'Run an attendance report'],
      subj: ['Office Administration', 'Information Technology', 'Mathematics'], emp: ['Schools and colleges', 'The university', 'The education ministry', 'Examination bodies'] },
    { id: 'frontdesk', n: 'Hotel front desk agent', f: 'tour', tags: ['people', 'travel', 'org'], does: 'Checks guests in and out, handles reservations, payments, questions and complaints.',
      edpm: [['S2', 'Fast, accurate data entry while talking to guests'], ['S4', 'Querying the reservations database'], ['S5', 'Confirmation letters and e-mails'], ['S6', 'Welcome cards and notices'], ['S9', 'Courtesy and netiquette when replying to online reviews']],
      day: ['Send reservation confirmations', 'Complete guest registration cards', 'Print the arrivals list', 'Reply politely to an online review', 'Write the shift handover report'],
      subj: ['Office Administration', 'Modern languages (Spanish, French, Dutch)', 'English A'], emp: ['Resorts and hotels', 'Guest houses and villas', 'Timeshare properties', 'Cruise lines'] },
    { id: 'travel', n: 'Travel agent / reservations agent', f: 'tour', tags: ['travel', 'org', 'numbers'], does: 'Plans and books trips and packages, and checks travel documents and requirements.',
      edpm: [['S4', 'Itineraries and price comparisons as tabulations'], ['S6', 'Flyers for holiday packages'], ['S7', 'Time zones and choosing the right channel'], ['S8', 'Organised travel folders for each client']],
      day: ['Prepare an itinerary', 'Send a quotation for a package', 'Design a promotional flyer', 'Send a visa checklist', 'Confirm bookings by e-mail'],
      subj: ['Geography', 'Office Administration (Travel Arrangements)', 'Modern languages', 'Principles of Business'], emp: ['Travel agencies', 'Airlines', 'Cruise lines', 'Tour operators', 'Hotels'] },
    { id: 'events', n: 'Events and conference coordinator', f: 'ngo', tags: ['org', 'lead', 'creative', 'travel'], does: 'Plans conferences, weddings, festivals and Carnival events from budget to clean-up.',
      edpm: [['S6', 'Programmes, invitations with menus, badges and signs'], ['S4', 'Mail-merged invitations and labels; budget spreadsheets'], ['S5', 'Meeting documents for the planning committee'], ['S4', 'Presentations for sponsors']],
      day: ['Finalise the event programme booklet', 'Mail-merge invitations', 'Draw the seating plan', 'Update the budget', 'Write a sponsorship letter'],
      subj: ['Office Administration', 'Principles of Business', 'Visual Arts', 'English A'], emp: ['Hotels and conference venues', 'Event companies', 'Carnival and cultural committees', 'NGOs', 'The tourism office'] },
    { id: 'bank', n: 'Bank customer service representative', f: 'fin', tags: ['people', 'numbers', 'detail'], does: 'Opens accounts, answers queries, processes requests and explains products to customers.',
      edpm: [['S4', 'Data entry and spreadsheets'], ['S5', 'Replies to customer letters and complaints'], ['S7', 'Secure, professional e-mail'], ['S8', 'Data security and confidentiality'], ['S9', 'Integrity']],
      day: ['Complete account-opening forms', 'Reply to a complaint', 'Set up a standing order', 'Tabulate a product comparison for a customer'],
      subj: ['Principles of Accounts', 'Principles of Business', 'Mathematics', 'Office Administration'], emp: ['Commercial banks', 'Credit unions', 'Insurance companies', 'Money-transfer services'] },
    { id: 'accounts', n: 'Accounts clerk / bookkeeper', f: 'fin', tags: ['numbers', 'detail'], does: 'Records transactions and prepares invoices, payroll and reconciliations.',
      edpm: [['S4', 'Advanced tabulation: SUM, AVERAGE, currency formats, charts'], ['S6', 'Trial balance, profit and loss, balance sheet, invoices and receipts'], ['S6', 'Templates for invoices and vouchers'], ['S8', 'Retention of financial records']],
      day: ['Issue invoices', 'Update the payroll spreadsheet', 'Reconcile the bank statement', 'Summarise petty cash', 'Send statements of account'],
      subj: ['Principles of Accounts', 'Mathematics', 'Office Administration', 'Information Technology'], emp: ['Accounting firms', 'Hotels and retailers', 'Government finance departments', 'NGOs'] },
    { id: 'civil', n: 'Civil servant / administrative officer', f: 'gov', tags: ['words', 'org', 'law'], does: 'Drafts letters, policies, reports and minutes, and handles queries from the public.',
      edpm: [['S5', 'Letters, memos, notices and minutes'], ['S6', 'Reports and proposals'], ['S8', 'Records management and retention'], ['S9', 'Ethics, confidentiality and intellectual property']],
      day: ['Draft a letter for the minister’s signature', 'Send a memo to departments', 'Take minutes of a committee', 'Format a report', 'Prepare a public notice'],
      subj: ['English A', 'Social Studies', 'Office Administration', 'Principles of Business'], emp: ['Government ministries and departments', 'Parliament', 'Statutory bodies', 'The courts'] },
    { id: 'archivist', n: 'Records officer / archivist', f: 'gov', tags: ['detail', 'tech', 'org'], does: 'Plans filing systems, retention schedules, digitisation and archives.',
      edpm: [['S8', 'Every objective: filing, integrity, security, retention, versioning'], ['S4', 'Databases that act as catalogues'], ['S1', 'Storage media and cloud storage'], ['S9', 'Copyright of archived material']],
      day: ['Update the retention schedule', 'Log a batch of scanned files', 'Sign a disposal certificate', 'Answer a request for an old record'],
      subj: ['History', 'Information Technology', 'Office Administration'], emp: ['The national archives', 'Government departments', 'Hospitals and universities', 'Banks', 'Museums'] },
    { id: 'journalist', n: 'Journalist / reporter', f: 'media', tags: ['words', 'creative', 'people'], does: 'Researches, interviews, writes and publishes news for print, radio, TV and online.',
      edpm: [['S2', 'Fast typing to capture quotations'], ['S6', 'News releases, and scripts for radio and television'], ['S7', 'Blogging, vlogging and social networking'], ['S9', 'Intellectual property, plagiarism and fair credit']],
      day: ['Write a news story', 'Transcribe an interview', 'Script a radio segment', 'Post updates on social media', 'Write photo captions with credits'],
      subj: ['English A', 'English B', 'Social Studies', 'later CAPE Communication Studies and CAPE Digital Media'], emp: ['Newspapers', 'Radio stations', 'Television', 'Online news sites', 'Government information services'] },
    { id: 'editor', n: 'Editor / desktop publisher', f: 'media', tags: ['words', 'creative', 'detail'], does: 'Lays out and proofreads newsletters, magazines, books and brochures.',
      edpm: [['S6', 'Newsletters and 4/6/8-page leaflets'], ['S2', 'Manuscript (correction) signs and proofreading'], ['S4', 'Fonts, styles, columns and graphics'], ['S6', 'Templates and style sheets']],
      day: ['Lay out a newsletter', 'Mark up proofs with correction signs', 'Design a brochure', 'Update the house template', 'Export a print-ready PDF'],
      subj: ['English A', 'Visual Arts', 'Information Technology'], emp: ['Printers', 'Publishers', 'Magazines', 'Advertising agencies', 'Schools and churches'] },
    { id: 'designer', n: 'Graphic designer', f: 'design', tags: ['creative', 'tech'], does: 'Designs logos, posters, social media graphics, menus and packaging.',
      edpm: [['S4', 'Creating and enhancing graphics; grouping objects'], ['S5', 'Letterheads'], ['S6', 'Flyers, invitations and menus'], ['S9', 'Design rights and Creative Commons licences']],
      day: ['Design a letterhead and business card', 'Create a flyer', 'Make a set of social media graphics', 'Lay out a restaurant menu', 'Update a brand guide'],
      subj: ['Visual Arts', 'Information Technology', 'later CAPE Digital Media'], emp: ['Design studios', 'Advertising agencies', 'Print shops', 'Hotel marketing departments', 'Freelance work'] },
    { id: 'marketing', n: 'Marketing / social media coordinator', f: 'design', tags: ['creative', 'people', 'words', 'lead'], does: 'Plans campaigns, writes posts, runs surveys and reports on results.',
      edpm: [['S7', 'Social networking services and blogging'], ['S6', 'Flyers and press releases'], ['S4', 'Charts of campaign results; pitch presentations'], ['S9', 'Netiquette and copyright']],
      day: ['Update the content calendar spreadsheet', 'Write a press release', 'Build a customer survey', 'Chart last month’s results', 'Present a campaign idea'],
      subj: ['Principles of Business', 'English A', 'Visual Arts', 'Information Technology'], emp: ['Hotels and resorts', 'Retailers', 'Banks', 'Telecom providers', 'The tourism office', 'Agencies'] },
    { id: 'web', n: 'Web content manager', f: 'it', tags: ['tech', 'words', 'creative'], does: 'Writes, formats and updates web pages and online forms.',
      edpm: [['S1', 'Web-based applications and accessibility for differently abled users'], ['S4', 'Heading levels, formatting and resized images'], ['S8', 'Version control and metadata'], ['S9', 'Intellectual property']],
      day: ['Update a web page', 'Write alternative text for images', 'Build an online form', 'Keep a content inventory spreadsheet', 'Record changes in a version log'],
      subj: ['Information Technology', 'English A', 'Visual Arts'], emp: ['Web agencies', 'Government', 'Hotels', 'Schools', 'NGOs'] },
    { id: 'itsupport', n: 'IT support technician', f: 'it', tags: ['tech', 'detail', 'people'], does: 'Sets up computers, accounts, printers and backups, and helps users solve problems.',
      edpm: [['S1', 'Hardware, software, storage and caring for computers'], ['S8', 'Security, passwords, encryption and backups'], ['S3', 'Choosing appropriate software'], ['S6', 'Technical documents such as how-to guides']],
      day: ['Work through the help-desk ticket log', 'Write a how-to guide with screenshots', 'Update the equipment database', 'Run the backup checklist', 'E-mail staff about a password change'],
      subj: ['Information Technology', 'Mathematics', 'Electrical and Electronic Technology'], emp: ['IT companies', 'Banks', 'Schools', 'Government IT departments', 'Telecom providers'] },
    { id: 'customs', n: 'Customs broker / shipping clerk', f: 'log', tags: ['detail', 'numbers', 'travel', 'law'], does: 'Prepares the documents to import and export goods and tracks shipments.',
      edpm: [['S2', 'Accurate entry of codes, weights and values'], ['S4', 'Tabulations and delivery schedules'], ['S6', 'Invoices and bills of lading'], ['S8', 'Source and turnaround documents']],
      day: ['Prepare a customs declaration', 'Check a bill of lading against the commercial invoice', 'Request a certificate of origin', 'Update the delivery schedule', 'E-mail a tracking update'],
      subj: ['Principles of Business', 'Principles of Accounts', 'Geography', 'Office Administration (Section XI)'], emp: ['Shipping agents', 'Customs brokers', 'Freight forwarders and couriers', 'The cargo port and airport', 'Wholesalers'] },
    { id: 'realestate', n: 'Real estate agent / property manager', f: 're', tags: ['people', 'law', 'numbers'], does: 'Lists, markets, rents and sells property, and manages leases and tenants.',
      edpm: [['S6', 'Leases and agreements'], ['S6', 'Property flyers'], ['S4', 'A property database and rent schedules'], ['S7', 'Professional e-mail to clients']],
      day: ['Design a property listing flyer', 'Prepare a lease agreement', 'Update the rent roll spreadsheet', 'Schedule viewings', 'Write to a tenant'],
      subj: ['Principles of Business', 'Principles of Accounts', 'English A', 'Visual Arts'], emp: ['Real estate agencies', 'Property management firms', 'Timeshare resorts', 'Developers', 'Bank mortgage departments'] },
    { id: 'ngo', n: 'NGO programme officer / grant writer', f: 'ngo', tags: ['care', 'words', 'lead', 'people'], does: 'Runs community projects, writes funding proposals and reports to donors.',
      edpm: [['S6', 'Proposals and reports'], ['S4', 'Budgets and charts'], ['S5', 'Letters and minutes'], ['S9', 'Referencing and avoiding plagiarism']],
      day: ['Write a grant proposal', 'Update the project budget', 'Chart results for the donor report', 'Update the volunteer database', 'Mail-merge thank-you letters'],
      subj: ['English A', 'Social Studies', 'Principles of Business', 'Principles of Accounts'], emp: ['Foundations and charities', 'Churches', 'Community councils', 'International agencies', 'Youth and sports clubs'] },
    { id: 'owner', n: 'Small business owner', f: 'ent', tags: ['lead', 'creative', 'numbers'], does: 'Runs a business such as catering, a bakery, a tour company, a salon or a design service.',
      edpm: [['S5', 'Letterhead and business letters'], ['S6', 'Invoices, receipts, profit and loss; flyers and menus'], ['S4', 'Sales spreadsheets'], ['S7', 'Social media marketing'], ['S9', 'Protecting your brand and respecting others’ work']],
      day: ['Send a catering quotation', 'Issue an invoice', 'Design a menu or flyer', 'Post on social media', 'Update monthly sales', 'Revise the business plan'],
      subj: ['Principles of Business', 'Principles of Accounts', 'EDPM', 'Visual Arts', 'Information Technology'], emp: ['Self-employed', 'Supported by business associations, banks and youth enterprise programmes'] }
  ];

  const FIT = [
    ['On a free Saturday you would rather…', [['organise a family event', ['org', 'lead']], ['design, draw or edit a video', ['creative']], ['fix the Wi-Fi and set up a new phone', ['tech']], ['help at a community clean-up', ['care', 'people']]]],
    ['Which school task do you enjoy most?', [['writing an essay or a story', ['words']], ['solving maths problems', ['numbers']], ['a group presentation', ['people', 'creative']], ['neatly organising notes and folders', ['detail', 'org']]]],
    ['Your friends come to you when they need…', [['someone to listen', ['care', 'people']], ['someone to check their spelling', ['words', 'detail']], ['help with money or a budget', ['numbers']], ['someone to take charge', ['lead']]]],
    ['Which workplace sounds best?', [['a busy hotel lobby or airport', ['travel', 'people']], ['a quiet office with files and screens', ['detail', 'org']], ['a studio or newsroom', ['creative', 'words']], ['a courtroom or government building', ['law', 'words']]]],
    ['Which EDPM task do you like most?', [['a spreadsheet with formulas', ['numbers', 'tech']], ['designing a flyer or invitation', ['creative']], ['keying a legal document perfectly', ['law', 'detail']], ['setting up a database and query', ['tech', 'org']]]],
    ['How do you feel about rules and details?', [['I love getting every detail exactly right', ['detail', 'law']], ['Rules are fine, but people matter most', ['people', 'care']], ['I like to bend the design rules creatively', ['creative']], ['I like making the plans and the rules', ['lead', 'org']]]],
    ['Which would you most like to learn more about?', [['other countries and cultures', ['travel']], ['how computers and the web work', ['tech']], ['how businesses make money', ['numbers', 'lead']], ['how to care for people’s health and wellbeing', ['care']]]],
    ['Your dream project is to…', [['run your own business', ['lead', 'creative', 'numbers']], ['publish a magazine or a channel', ['words', 'creative']], ['plan a regional conference', ['org', 'travel', 'people']], ['protect important records and the law', ['law', 'detail', 'tech']]]]
  ];
  const TAGN = { people: 'working with people', detail: 'accuracy and detail', creative: 'creativity', numbers: 'numbers', tech: 'technology', words: 'words and writing', org: 'organising', law: 'rules and the law', care: 'caring for others', travel: 'travel and cultures', lead: 'leading' };

  /* ===================== 3. SKILLS MATRIX ===================== */
  const MF = [['biz', 'Business'], ['law', 'Law'], ['health', 'Health'], ['edu', 'Education'], ['tour', 'Tourism'], ['fin', 'Finance'], ['gov', 'Government'], ['media', 'Media & design'], ['it', 'IT & web'], ['log', 'Logistics'], ['ent', 'Own business']];
  const SK = [
    { n: 'Keyboarding speed and accuracy', s: 'S2', r: [3, 3, 2, 2, 2, 2, 3, 3, 2, 3, 2], why: 'Employers test typing speed and expect error-free work; EDPM sets 35 wpm within a 5% error rate as the minimum.' },
    { n: 'Document formatting and display', s: 'S4 · S6', r: [3, 3, 2, 3, 2, 2, 3, 3, 2, 2, 3], why: 'Fonts, spacing, headings and layout make documents professional and easy to read.' },
    { n: 'Tabulation and spreadsheets', s: 'S4', r: [3, 1, 2, 3, 2, 3, 2, 2, 2, 3, 3], why: 'Budgets, mark books, schedules, stock lists and invoices all live in tables and spreadsheets.' },
    { n: 'Databases', s: 'S4', r: [2, 2, 3, 2, 3, 3, 2, 1, 3, 3, 2], why: 'Patients, guests, students, customers and stock are stored, queried and reported from databases.' },
    { n: 'Presentations and graphics', s: 'S4', r: [2, 1, 1, 3, 2, 2, 2, 3, 2, 1, 3], why: 'Pitches, lessons, training and marketing depend on clear slides and images.' },
    { n: 'Business correspondence', s: 'S5', r: [3, 3, 2, 2, 3, 2, 3, 2, 1, 2, 3], why: 'Letters, memos and meeting documents are the daily output of almost every office.' },
    { n: 'Legal and financial documents', s: 'S6', r: [2, 3, 1, 1, 1, 3, 2, 1, 1, 3, 3], why: 'Contracts, leases, wills, invoices and statements must follow exact formats.' },
    { n: 'E-communication and netiquette', s: 'S7 · S9', r: [3, 2, 2, 3, 3, 2, 2, 3, 3, 2, 3], why: 'E-mail, messaging and social media speak for the organisation; tone and accuracy matter.' },
    { n: 'Document and records management', s: 'S8', r: [3, 3, 3, 2, 2, 3, 3, 2, 3, 3, 2], why: 'Finding, protecting, versioning and keeping records for the right length of time.' },
    { n: 'Ethics and intellectual property', s: 'S9', r: [2, 3, 3, 3, 2, 2, 3, 3, 3, 2, 3], why: 'Confidentiality, copyright, plagiarism and honest work protect people and the organisation.' }
  ];
  const LV = ['', 'Useful', 'Important', 'Essential'];
  const SOFT = [
    ['Punctuality and regularity', 'Arriving on time for practicals; never missing a timed paper.', 'Opening the front desk on time; attending every shift.'],
    ['Meeting deadlines', 'Handing in each portfolio sample on the date agreed.', 'Payroll, customs entries and board papers have fixed deadlines.'],
    ['Working without supervision', 'Finishing a lab brief without being reminded.', 'Remote and virtual-office staff manage their own day.'],
    ['Team spirit and co-operation', 'Sharing the SBA research tasks fairly (groups of up to 3).', 'Front office, accounts and housekeeping must work as one.'],
    ['Courtesy', 'Polite e-mails to your teacher with a proper subject line.', 'Every caller, guest and patient is treated with respect.'],
    ['Respect for diversity', 'Working well with classmates from every island and background.', 'Caribbean workplaces serve visitors from around the world.'],
    ['Integrity and confidentiality', 'Your own work, properly referenced; no copying.', 'Patient, staff, client and bank information stays private.'],
    ['Good grooming', 'Neat uniform on presentation day.', 'Appearance is part of the first impression at reception.'],
    ['Initiative and willingness', 'Trying the extension task; helping a classmate with a feature.', 'Spotting a problem and offering a solution before being asked.'],
    ['Time management', 'Planning a 2 h 10 min Paper 02 so every question gets time.', 'Managing an executive’s diary and your own task list.'],
    ['Problem-solving', 'Fixing a mail merge that will not connect to its data source.', 'Rebooking a guest when a flight is cancelled.'],
    ['Remote working etiquette', 'Camera on, microphone muted, ready on time for online classes.', 'Professional background and behaviour on video calls.'],
    ['Safety and environmental awareness', 'Correct posture; no food or drink near computers.', 'Clear exits, tidy cables, printing only what is needed.']
  ];

  /* ===================== 4. ACROSS THE CURRICULUM ===================== */
  const SUBJ = [
    { n: 'English A', s: ['S2', 'S5', 'S9'], c: 'Grammar, spelling and punctuation are marked in every EDPM document, and EDPM gives English A writing a professional finish.', t: ['Type an English A expository essay with a title, 1.5 or double line spacing, page numbers and a reference list.', 'Key in a formal letter of complaint written in English A, set out in blocked style.', 'Proofread a classmate’s draft using EDPM correction signs.'] },
    { n: 'Principles of Business', s: ['S5', 'S6', 'S7'], c: 'POB explains how businesses work; EDPM produces the documents they run on.', t: ['Produce a business plan for a mini-company with a table of contents and charts.', 'Design a flyer and press release to launch the mini-company’s product.', 'Draw the organisational chart for a case-study firm.'] },
    { n: 'Principles of Accounts', s: ['S4', 'S6'], c: 'POA supplies the figures; EDPM sets them out correctly with formulas and formatting.', t: ['Prepare a POA trial balance in Excel using SUM and currency format to 2 decimal places.', 'Create an invoice template and a credit note.', 'Produce an income and expenditure statement for a school club (Portfolio element 2).'] },
    { n: 'Office Administration', s: ['S5', 'S7', 'S8'], c: 'The closest partner: OA explains office procedures; EDPM produces and manages the documents. Channels (OA III ↔ EDPM VII) and records (OA VI ↔ EDPM VIII) overlap strongly.', t: ['Format the OA SBA report: cover page, table of contents, a schedule table (Date, Activity, Comment) and the permission letter in business format.', 'Use one club meeting for both subjects: OA meeting procedure and EDPM notice, agenda and minutes.', 'Check which Office Administration sections this year\'s SBA theme covers, and plan one piece of work that meets both subjects.'] },
    { n: 'Information Technology', s: ['S1', 'S3', 'S4', 'S8'], c: 'IT explains how hardware, software and data work; EDPM applies the same productivity tools to produce mailable documents.', t: ['Use the same data set for an IT database (tables, queries, report) and an EDPM mail merge.', 'Build a spreadsheet with functions and a chart, then insert it into a report.', 'Set up a folder structure and backup plan for your SBA files.'] },
    { n: 'Mathematics', s: ['S2', 'S4'], c: 'Speed, error rates, averages, percentages and time all use Mathematics.', t: ['Calculate your own wpm and error rate: words typed ÷ minutes, and errors ÷ words × 100.', 'Turn survey data into a frequency table and bar chart in a spreadsheet.', 'Solve 24-hour clock and time-zone problems from an itinerary.'] },
    { n: 'Social Studies', s: ['S4', 'S9'], c: 'The Social Studies SBA needs questionnaires, tables, charts and references, which are core EDPM skills.', t: ['Design and format a questionnaire.', 'Present findings in a formatted table and chart.', 'Build a reference list in a consistent style and discuss digital citizenship and netiquette.'] },
    { n: 'Visual Arts', s: ['S4', 'S6'], c: 'Balance, contrast, alignment and colour harmony make EDPM displays attractive, and the portfolio rewards a harmonious colour scheme.', t: ['Design an invitation with a menu in booklet style with an art border.', 'Create a programme cover using your own artwork.', 'Plan a poster grid before building it in Publisher.'] },
    { n: 'Modern languages', s: ['S4', 'S6'], c: 'Tourism needs documents in more than one language; EDPM teaches symbols, accents and language settings for spell checks.', t: ['Produce a bilingual menu (English and Spanish, French or Dutch).', 'Insert accented characters with Insert › Symbol and set the proofing language.', 'Translate and format a hotel welcome card.'] },
    { n: 'Sciences (Biology, HSB, Chemistry, Physics)', s: ['S4'], c: 'Laboratory reports need tables, graphs, superscript and subscript.', t: ['Type a lab report with a results table and a line graph.', 'Use subscript and superscript correctly: H₂O, cm³, 10⁶.', 'Add captions and a reference list.'] },
    { n: 'CAPE Digital Media (later)', s: ['S4', 'S6', 'S9'], c: 'Layout, graphics, presentations and intellectual property in EDPM are the foundations for digital media production at CAPE.', t: ['Keep a design portfolio of your best EDPM displays.', 'Practise crediting images and music correctly now.'] },
    { n: 'CAPE Communication Studies (later)', s: ['S7', 'S9'], c: 'Audience, purpose, channels and barriers (OA III, EDPM VII) and careful referencing (EDPM IX) carry straight into Communication Studies.', t: ['Compare one message written for an e-mail, a memo and a social media post.', 'Practise paraphrasing and citing a source correctly.'] }
  ];
  const CMP = [
    ['Main focus', 'Producing accurate, well-formatted documents with software, and managing them safely and ethically.', 'How offices and their departments work: procedures, people, documents and services.', 'How computer systems work, using productivity tools, and solving problems with programs.'],
    ['Key question', 'How do I produce and manage this document properly?', 'What should the office do, and why?', 'How does the technology work, and how can it solve this problem?'],
    ['Assessment', 'Paper 01: 60 multiple-choice items (20%). Paper 02: four practical document questions, 120 marks (40%). SBA: research paper with presentation, plus a nine-sample portfolio (40%).', 'Paper 01: 60 multiple-choice items (30%). Paper 02: six compulsory essay questions, 90 marks (45%). SBA: a group project on a real or virtual office, up to 1,000 words (25%).', 'A theory paper, a structured paper and an SBA with productivity-tool and programming tasks. Check the current CSEC IT syllabus for exact weightings.'],
    ['Practical skills', 'Keyboarding (35 wpm within 5% error), letters, memos, displays, legal and financial documents, tabulation, databases, presentations, mail merge.', 'Diary management, mail procedures, filing systems, meeting procedure, travel planning, petty cash, purchasing and dispatch documents.', 'Hardware and software, networks, spreadsheets, databases, web pages, algorithms and programming.'],
    ['Overlap with EDPM', 'n/a', 'Channels and choosing media; stationery and paper sizes; meeting documents; records, retention and the law; business documents.', 'Hardware, storage and software choice; spreadsheets and databases; file management, security and backups; ethics.'],
    ['Careers it points to', 'Administrative and executive support, legal and medical secretarial work, desktop publishing, document control.', 'Office management, HR, customer service, purchasing, logistics, front office.', 'Programming, IT support, networks, web development, data analysis.']
  ];

  /* ===================== helpers ===================== */
  const store = api => { const S = api.S; S.cc = S.cc || {}; S.cc.ans = S.cc.ans || {}; S.cc.rw = S.cc.rw || {}; S.cc.fit = S.cc.fit || []; return S.cc; };
  const secPill = s => `<span class="cc-sec" title="${SEC[s]}">EDPM ${ROM[s]}</span>`;
  const dots = (n, label) => `<span class="cc-dots" role="img" aria-label="${LV[n]}${label ? ' for ' + label : ''}">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;
  let refocus = null;

  function css() {
    if (document.getElementById('cc-css')) return;
    const st = document.createElement('style'); st.id = 'cc-css';
    st.textContent = `.cc-root{display:flex;flex-direction:column;gap:inherit;min-width:0}
.cc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr));gap:12px}
.cc-card{text-align:left;display:flex;flex-direction:column;gap:6px;padding:14px;border-radius:14px;border:1px solid var(--line);background:var(--raise);color:inherit;cursor:pointer;font:inherit;min-width:0}
.cc-card:hover{border-color:var(--gold)}.cc-card h4{margin:0;font-size:1.02rem;line-height:1.3}.cc-card p{margin:0}
.cc-card.done{box-shadow:inset 4px 0 0 #3fbf7f}
.cc-pill{display:inline-block;border-radius:99px;padding:1px 9px;font-size:.72rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border:1px solid currentColor;color:var(--gold)}
.cc-sec{display:inline-block;border-radius:6px;padding:1px 7px;font-size:.74rem;font-weight:700;background:var(--soft-gold);color:var(--ink);white-space:nowrap}
.cc-meta{display:flex;flex-wrap:wrap;gap:5px;align-items:center}
.cc-list{margin:0;padding-left:1.3em;display:flex;flex-direction:column;gap:7px}
.cc-links{display:flex;flex-direction:column;gap:10px}
.cc-link{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start;padding:10px 12px;border-radius:12px;background:var(--raise);border:1px solid var(--line)}
.cc-link b{display:block;font-size:.86rem;color:var(--muted)}
.cc-doc{background:#fffdf6;color:#1a1a1a;border-radius:12px;padding:16px 18px;border:1px solid #e3d9bd;font:15px/1.55 Georgia,'Times New Roman',serif;min-width:0}
.cc-doc p{margin:0 0 8px}.cc-doc ol,.cc-doc ul{margin:0 0 8px;padding-left:1.3em}
.cc-doc table{border-collapse:collapse;margin:6px 0;font:14px/1.35 Arial,sans-serif;min-width:0}.cc-doc th,.cc-doc td{border:1px solid #9aa3ad;padding:4px 8px;text-align:left;vertical-align:top;color:#1a1a1a;background:transparent}.cc-doc th{background:#eef1f4}
.cc-scroll{overflow-x:auto;max-width:100%}
.cc-note{font:italic 13px/1.4 Arial,sans-serif;color:#555}
.cc-q{display:flex;flex-direction:column;gap:8px;padding:12px 0;border-top:1px solid var(--line)}.cc-q:first-of-type{border-top:0}
.cc-q h4{margin:0;font-size:1rem}
.cc-q .opt{width:100%;cursor:pointer;color:inherit;font:inherit}.cc-q .opt[disabled]{cursor:default;opacity:1}
.cc-score{font-size:1.8rem;font-weight:800;font-variant-numeric:tabular-nums}
.cc-bar{height:10px;border-radius:99px;background:rgba(127,127,127,.25);overflow:hidden}.cc-bar i{display:block;height:100%;background:linear-gradient(90deg,#f5c542,#3fbf7f)}
.cc-mx{border-collapse:collapse;width:100%}.cc-mx th,.cc-mx td{padding:8px 6px;text-align:center;font-size:.85rem}.cc-mx th:first-child,.cc-mx td:first-child{text-align:left;min-width:170px}
.cc-mx thead th{vertical-align:bottom}.cc-mx tbody th,.cc-mx thead th:first-child{position:sticky;left:0;z-index:1;background:var(--bg2)}.cc-mx .hl{background:var(--soft-gold)}
.tablewrap table.cc-mx{min-width:820px}
.cc-dots{display:inline-flex;gap:3px;vertical-align:middle}.cc-dots i{width:9px;height:9px;border-radius:50%;border:1.5px solid var(--gold);display:block}.cc-dots i.on{background:var(--gold)}
.cc-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:14px}
.cc-box{padding:12px 14px;border-radius:12px;background:var(--raise);border:1px solid var(--line);display:flex;flex-direction:column;gap:8px;min-width:0}
.cc-box h4{margin:0}
.cc-cmp th:first-child{min-width:120px}.tablewrap table.cc-cmp{min-width:760px}
.cc-credit{text-align:center;margin-top:4px}
.cc-fitopt{width:100%;cursor:pointer;color:inherit;font:inherit}
.cc-root h2,.cc-root h3{margin:0}`;
    document.head.appendChild(st);
  }

  function tabsHTML(cur) {
    return `<div class="card"><div class="chips" role="tablist" aria-label="Careers and Connections sections">${TABS.map(([k, i, n]) => `<button type="button" role="tab" id="cc-tab-${k}" aria-controls="cc-panel" class="chip ${cur === k ? 'sel' : ''}" aria-selected="${cur === k}" tabindex="${cur === k ? 0 : -1}" data-go="careers" data-sub="${k}">${i} ${n}</button>`).join('')}</div></div>`;
  }
  function hero() {
    return `<div class="hero"><span class="eyebrow">EDPM · Careers &amp; Connections</span><h1>Where EDPM takes you</h1><p>The skills you build in EDPM are used in almost every workplace. Explore what Office Administration adds to your EDPM, see how 27 careers use EDPM every day, compare skills across professions and link EDPM to your other subjects.</p></div>`;
  }

  /* ---------- OA tab ---------- */
  function oaHome(api) {
    const st = store(api), esc = api.esc, done = OA.filter(t => st.rw[t.id]).length;
    let h = `<div class="card"><span class="kicker">CSEC Office Administration (CXC 27/O/SYLL 24) → EDPM</span><h2>Office Administration links</h2><p>Office Administration explains <i>how an office works</i>; EDPM teaches you to <i>produce and manage the documents</i> that office needs. These ${OA.length} topics, drawn from the eleven sections of the OA syllabus, strengthen your EDPM work. Each has key points, the EDPM sections it links to, a worked Caribbean example and a four-question quick check.</p>
      <div class="row" style="justify-content:space-between;align-items:center"><div><div class="cc-score">${done} / ${OA.length}</div><p class="hint" style="margin:0">quick checks completed</p></div><div style="flex:1;min-width:160px"><div class="cc-bar"><i style="width:${Math.round(done / OA.length * 100)}%"></i></div></div></div></div>`;
    h += `<div class="card"><div class="cc-grid">${OA.map(t => { const a = st.ans[t.id] || [], sc = a.filter((x, i) => x === t.q[i][2]).length, secs = [...new Set(t.links.map(l => l[0]))]; return `<button type="button" class="cc-card ${st.rw[t.id] ? 'done' : ''}" data-go="careers" data-sub="oa" data-k="${t.id}"><span class="cc-pill">${esc(t.oa)}</span><h4>${esc(t.n)}</h4><p class="hint">${esc(t.blurb)}</p><div class="cc-meta">${secs.map(secPill).join('')}</div>${st.rw[t.id] ? `<p class="hint">✓ Quick check: ${sc}/4</p>` : ''}</button>`; }).join('')}</div></div>`;
    return h;
  }
  function oaTopic(api, t) {
    const st = store(api), esc = api.esc, a = st.ans[t.id] || [], i = OA.indexOf(t), prev = OA[i - 1], next = OA[i + 1];
    const answered = a.filter(x => x != null).length, sc = a.filter((x, k) => x === t.q[k][2]).length;
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="careers" data-sub="oa">← Office Administration links</button><span>Topic ${i + 1} of ${OA.length}</span></div>`;
    h += `<div class="card"><span class="kicker">${esc(t.oa)}</span><h2>${esc(t.n)}</h2><h3>Key points</h3><ul class="cc-list">${t.pts.map(p => `<li>${p}</li>`).join('')}</ul></div>`;
    h += `<div class="card"><h3>How it links to EDPM</h3><div class="cc-links">${t.links.map(([s, so, txt]) => `<div class="cc-link">${secPill(s)}<div><b>${esc(SEC[s])} · ${esc(so)}</b>${esc(txt)}</div></div>`).join('')}</div>
      <div class="row">${[...new Set(t.links.map(l => l[0]))].map(s => `<button type="button" class="btn ghost" data-go="labs" data-sub="${s}">Section ${ROM[s]} labs</button>`).join('')}${(t.go || []).map(g => `<button type="button" class="btn ghost" data-go="${g[0]}" data-tab="${g[1]}">${esc(g[2])}</button>`).join('')}</div></div>`;
    h += `<div class="card"><h3>Worked example: ${esc(t.ex.t)}</h3><div class="cc-doc">${t.ex.b}</div></div>`;
    h += `<div class="card"><h3>Quick check</h3><p class="hint" style="margin:0">Four questions. ${st.rw[t.id] ? 'Completed: you can try again for practice.' : 'Answer all four to earn 10 coins.'}</p>${t.q.map((q, qi) => { const pick = a[qi]; const has = pick != null; return `<div class="cc-q" role="group" aria-labelledby="ccq-${qi}"><h4 id="ccq-${qi}" tabindex="-1">${qi + 1}. ${esc(q[0])}</h4><div class="opts">${q[1].map((o, oi) => { let cls = ''; if (has && oi === q[2]) cls = 'right'; else if (has && oi === pick) cls = 'wrong'; return `<button type="button" class="opt ${cls}" data-ccq="${t.id}:${qi}:${oi}" ${has ? 'disabled' : ''} aria-pressed="${has && oi === pick}"><span class="letter">${'ABCD'[oi]}</span><span>${esc(o)}${has && oi === q[2] ? ' <b>(correct answer)</b>' : ''}</span></button>`; }).join('')}</div><div id="ccfb-${qi}" tabindex="-1" aria-live="polite">${has ? `<div class="fb ${pick === q[2] ? 'good' : 'bad'}"><b>${pick === q[2] ? 'Correct.' : 'Not quite.'}</b><span>${esc(q[3])}</span></div>` : ''}</div></div>`; }).join('')}
      ${answered === 4 ? `<div class="row" style="justify-content:space-between"><div><span class="kicker">Your score</span><div class="cc-score">${sc} / 4</div></div><button type="button" class="btn ghost" data-ccreset="${t.id}">Try again</button></div>` : ''}</div>`;
    h += `<div class="card"><div class="row" style="justify-content:space-between">${prev ? `<button type="button" class="btn ghost" data-go="careers" data-sub="oa" data-k="${prev.id}">← ${esc(prev.n)}</button>` : '<span></span>'}${next ? `<button type="button" class="btn go" data-go="careers" data-sub="oa" data-k="${next.id}">Next: ${esc(next.n)} →</button>` : `<button type="button" class="btn go" data-go="careers" data-sub="careers">Explore EDPM in careers →</button>`}</div></div>`;
    return h;
  }

  /* ---------- Careers tab ---------- */
  function careersHome(api, loc) {
    const st = store(api), esc = api.esc, f = loc.tab && FN[loc.tab] ? loc.tab : 'all', L = f === 'all' ? C : C.filter(c => c.f === f);
    let h = `<div class="card"><span class="kicker">${C.length} careers · ${FIELDS.length} fields</span><h2>EDPM in careers</h2><p>Every career below uses EDPM skills daily. Open a card to see the documents they produce, the EDPM sections behind them, other subjects that help and where people across the Caribbean do this work.</p>
      <div class="tip"><b>Not sure where to start?</b> Answer eight quick questions and get three careers to explore.<div class="row" style="margin-top:8px"><button type="button" class="btn gold" data-go="careers" data-sub="careers" data-k="fit">${st.fit.length === FIT.length ? 'See my career matches' : 'Which career fits me?'}</button></div></div></div>`;
    h += `<div class="card"><div class="chips" role="group" aria-label="Filter careers by field"><button type="button" class="chip ${f === 'all' ? 'sel' : ''}" aria-pressed="${f === 'all'}" data-go="careers" data-sub="careers" data-tab="all">All fields</button>${FIELDS.map(([k, n]) => `<button type="button" class="chip ${f === k ? 'sel' : ''}" aria-pressed="${f === k}" data-go="careers" data-sub="careers" data-tab="${k}">${esc(n)}</button>`).join('')}</div>
      <p class="hint" style="margin:0" aria-live="polite">Showing ${L.length} career${L.length === 1 ? '' : 's'}${f === 'all' ? '' : ' in ' + esc(FN[f])}.</p>
      <div class="cc-grid">${L.map(c => `<button type="button" class="cc-card" data-go="careers" data-sub="careers" data-k="${c.id}" ${f !== 'all' ? `data-tab="${f}"` : ''}><span class="cc-pill">${esc(FN[c.f])}</span><h4>${esc(c.n)}</h4><p class="hint">${esc(c.does)}</p><div class="cc-meta">${[...new Set(c.edpm.map(e => e[0]))].map(secPill).join('')}</div></button>`).join('')}</div></div>`;
    return h;
  }
  function careerView(api, c, loc) {
    const esc = api.esc, same = C.filter(x => x.f === c.f && x.id !== c.id);
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="careers" data-sub="careers" ${loc.tab ? `data-tab="${esc(loc.tab)}"` : ''}>← All careers</button><span>${esc(FN[c.f])}</span></div>`;
    h += `<div class="card"><span class="kicker">${esc(FN[c.f])}</span><h2>${esc(c.n)}</h2><p><b>What they do:</b> ${esc(c.does)}</p>
      <h3>EDPM skills and documents they use daily</h3><div class="cc-links">${c.edpm.map(([s, t]) => `<div class="cc-link">${secPill(s)}<div><b>${esc(SEC[s])}</b>${esc(t)}</div></div>`).join('')}</div>
      <div class="row">${[...new Set(c.edpm.map(e => e[0]))].map(s => `<button type="button" class="btn ghost" data-go="labs" data-sub="${s}">Practise Section ${ROM[s]}</button>`).join('')}</div></div>`;
    h += `<div class="cc-two"><div class="card"><h3>A day in the life: documents</h3><ol class="cc-list">${c.day.map(d => `<li>${esc(d)}</li>`).join('')}</ol></div>
      <div class="card"><h3>Other subjects that help</h3><div class="chips">${c.subj.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div><h3>Typical Caribbean employers</h3><ul class="cc-list">${c.emp.map(e => `<li>${esc(e)}</li>`).join('')}</ul></div></div>`;
    if (same.length) h += `<div class="card"><h3>Related careers in ${esc(FN[c.f])}</h3><div class="row">${same.map(x => `<button type="button" class="btn ghost" data-go="careers" data-sub="careers" data-k="${x.id}">${esc(x.n)}</button>`).join('')}</div></div>`;
    return h;
  }
  function fitScores(ans) {
    const pts = {}; ans.forEach((oi, qi) => { const o = FIT[qi] && FIT[qi][1][oi]; if (o) o[1].forEach(t => pts[t] = (pts[t] || 0) + 1); });
    return C.map(c => ({ c, s: c.tags.reduce((a, t) => a + (pts[t] || 0), 0) / c.tags.length, raw: c.tags.reduce((a, t) => a + (pts[t] || 0), 0), top: c.tags.filter(t => pts[t]).sort((x, y) => pts[y] - pts[x]) })).sort((a, b) => b.s - a.s || b.raw - a.raw);
  }
  function fitView(api) {
    const st = store(api), esc = api.esc, a = st.fit, qi = a.length;
    let h = `<div class="crumbs"><button type="button" class="linkbtn" data-go="careers" data-sub="careers">← All careers</button><span>Which career fits me?</span></div>`;
    if (qi < FIT.length) {
      const q = FIT[qi];
      h += `<div class="card"><span class="kicker">Question ${qi + 1} of ${FIT.length}</span><div class="cc-bar"><i style="width:${Math.round(qi / FIT.length * 100)}%"></i></div><h2 id="ccfit-q" tabindex="-1">${esc(q[0])}</h2><div class="opts" role="group" aria-labelledby="ccfit-q">${q[1].map((o, oi) => `<button type="button" class="opt cc-fitopt" data-ccfit="${oi}"><span class="letter">${'ABCD'[oi]}</span><span>${esc(o[0])}</span></button>`).join('')}</div>
        ${qi ? `<div class="row"><button type="button" class="btn ghost" data-ccfitback="1">← Previous question</button></div>` : ''}<p class="hint" style="margin:0">There are no wrong answers. Pick the one that sounds most like you.</p></div>`;
      return h;
    }
    const R = fitScores(a).slice(0, 3);
    h += `<div class="card" id="ccfit-res" tabindex="-1"><span class="kicker">Your top three matches</span><h2>Careers to explore</h2><p>These match what you enjoy. Use them as a starting point: talk to your guidance counsellor, and look at the subjects and EDPM skills each one needs.</p>
      <div class="cc-grid">${R.map((r, i) => `<button type="button" class="cc-card" data-go="careers" data-sub="careers" data-k="${r.c.id}"><span class="cc-pill">Match ${i + 1} · ${esc(FN[r.c.f])}</span><h4>${esc(r.c.n)}</h4><p class="hint">${esc(r.c.does)}</p>${r.top.length ? `<p class="hint">You said you enjoy ${r.top.slice(0, 2).map(t => TAGN[t]).join(' and ')}.</p>` : ''}</button>`).join('')}</div>
      <div class="row"><button type="button" class="btn ghost" data-ccfitreset="1">Retake the quiz</button><button type="button" class="btn go" data-go="careers" data-sub="skills">See the skills they need →</button></div></div>`;
    return h;
  }

  /* ---------- Skills tab ---------- */
  function skillsView(api, loc) {
    const esc = api.esc, f = MF.find(x => x[0] === loc.tab) ? loc.tab : '', fi = MF.findIndex(x => x[0] === f);
    let h = `<div class="card"><span class="kicker">EDPM skills × fields of work</span><h2>Skills across professions</h2><p>The same ten EDPM skills appear in every field, but each field leans on some more than others. Three filled dots means the skill is essential; one means it is useful.</p>
      <div class="row" aria-hidden="true" style="gap:16px"><span>${dots(3)} Essential</span><span>${dots(2)} Important</span><span>${dots(1)} Useful</span></div>
      <div class="chips" role="group" aria-label="Highlight a field"><button type="button" class="chip ${!f ? 'sel' : ''}" aria-pressed="${!f}" data-go="careers" data-sub="skills">All fields</button>${MF.map(([k, n]) => `<button type="button" class="chip ${f === k ? 'sel' : ''}" aria-pressed="${f === k}" data-go="careers" data-sub="skills" data-tab="${k}">${esc(n)}</button>`).join('')}</div>
      <div class="tablewrap"><table class="cc-mx"><caption class="hint" style="text-align:left;caption-side:bottom;padding-top:6px">Scroll sideways on a small screen to see every field.</caption><thead><tr><th scope="col">EDPM skill</th>${MF.map(([k, n], i) => `<th scope="col" class="${i === fi ? 'hl' : ''}">${esc(n)}</th>`).join('')}</tr></thead><tbody>${SK.map(s => `<tr><th scope="row">${esc(s.n)}<br><span class="cc-sec">EDPM ${esc(s.s.replace(/S(\d)/g, (m, d) => ROM['S' + d]))}</span></th>${s.r.map((n, i) => `<td class="${i === fi ? 'hl' : ''}">${dots(n, MF[i][1])}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
    if (f) {
      const ranked = SK.map(s => ({ s, n: s.r[fi] })).sort((a, b) => b.n - a.n);
      h += `<div class="card"><h3>Skills ranked for ${esc(MF[fi][1])}</h3><ol class="cc-list">${ranked.map(r => `<li><b>${esc(r.s.n)}</b> ${dots(r.n)} <span class="hint">${LV[r.n]}.</span> ${esc(r.s.why)}</li>`).join('')}</ol>
        <div class="row"><button type="button" class="btn ghost" data-go="careers" data-sub="careers" data-tab="${f}">Careers in this field →</button></div></div>`;
    } else {
      h += `<div class="card"><h3>Why each skill matters</h3><ul class="cc-list">${SK.map(s => `<li><b>${esc(s.n)}</b> <span class="cc-sec">EDPM ${esc(s.s.replace(/S(\d)/g, (m, d) => ROM['S' + d]))}</span> ${esc(s.why)}</li>`).join('')}</ul></div>`;
    }
    h += `<div class="card"><h3>Soft skills and work habits</h3><p>EDPM Section IX (SO 6 and SO 8) and Office Administration Section I (SO 7) both list the habits and attitudes employers look for. This is how they look in class and at work.</p>
      <div class="tablewrap"><table><thead><tr><th scope="col">Habit</th><th scope="col">In EDPM class</th><th scope="col">At work</th></tr></thead><tbody>${SOFT.map(r => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div></div>`;
    return h;
  }

  /* ---------- Curriculum tab ---------- */
  function currView(api) {
    const esc = api.esc;
    let h = `<div class="card"><span class="kicker">EDPM and your other subjects</span><h2>Across the curriculum</h2><p>EDPM is the subject that makes your work in every other subject look professional. Use these joint tasks to practise EDPM while doing work you already have to do.</p></div>`;
    h += `<div class="card"><div class="cc-two">${SUBJ.map(s => `<div class="cc-box"><h4>${esc(s.n)}</h4><div class="cc-meta">${s.s.map(secPill).join('')}</div><p style="margin:0">${esc(s.c)}</p><details class="fold"><summary>Joint tasks to try</summary><div><ul class="cc-list">${s.t.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div></details></div>`).join('')}</div></div>`;
    h += `<div class="card"><h3>EDPM, Office Administration and Information Technology compared</h3><p class="hint" style="margin:0">Three CSEC subjects that work well together. EDPM and OA details are from the 2024 syllabuses.</p>
      <div class="tablewrap"><table class="cc-cmp"><thead><tr><th scope="col"></th><th scope="col">EDPM</th><th scope="col">Office Administration</th><th scope="col">Information Technology</th></tr></thead><tbody>${CMP.map(r => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join('')}</tbody></table></div>
      <div class="tip"><b>Taking EDPM and OA together?</b> Plan one real-office visit and use it twice: the OA SBA investigation and the EDPM research assignment can share interviews and observations, as long as each report is written and formatted to its own subject’s guidelines.</div></div>`;
    return h;
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'careers', title: 'Careers & Connections',
    tile: { icon: '💼', meta: 'Office Administration links, EDPM skills in 27 careers, a skills matrix and links to your other subjects' },
    render(api, loc) {
      css();
      const sub = TABS.find(t => t[0] === loc.sub) ? loc.sub : 'oa';
      let body = '';
      if (sub === 'oa') { const t = OA.find(x => x.id === loc.k); body = t ? oaTopic(api, t) : oaHome(api); }
      else if (sub === 'careers') { if (loc.k === 'fit') body = fitView(api); else { const c = C.find(x => x.id === loc.k); body = c ? careerView(api, c, loc) : careersHome(api, loc); } }
      else if (sub === 'skills') body = skillsView(api, loc);
      else body = currView(api);
      return `<div class="cc-root">${hero()}${tabsHTML(sub)}<div id="cc-panel" role="tabpanel" aria-labelledby="cc-tab-${sub}" class="cc-root">${body}</div><p class="hint cc-credit">Kester Small</p></div>`;
    },
    mount(api, loc, stage) {
      const st = store(api);
      stage.querySelectorAll('[data-ccq]').forEach(b => b.addEventListener('click', () => {
        const [id, qi, oi] = b.dataset.ccq.split(':'); const t = OA.find(x => x.id === id); if (!t) return;
        const a = st.ans[id] = st.ans[id] || [null, null, null, null]; if (a[+qi] != null) return;
        a[+qi] = +oi; api.save();
        if (a.every(x => x != null) && !st.rw[id]) { st.rw[id] = 1; api.save(); api.reward(10, 'Office Administration quick check', { xp: 10 }); }
        refocus = 'ccfb-' + qi; api.render();
      }));
      stage.querySelectorAll('[data-ccreset]').forEach(b => b.addEventListener('click', () => { st.ans[b.dataset.ccreset] = [null, null, null, null]; api.save(); refocus = 'ccq-0'; api.render(); }));
      stage.querySelectorAll('[data-ccfit]').forEach(b => b.addEventListener('click', () => {
        if (st.fit.length >= FIT.length) return; st.fit.push(+b.dataset.ccfit); api.save();
        if (st.fit.length === FIT.length) { refocus = 'ccfit-res'; if (!st.fitRw) { st.fitRw = 1; api.save(); api.reward(15, 'Career quiz complete', { xp: 15 }); } } else refocus = 'ccfit-q';
        api.render();
      }));
      stage.querySelectorAll('[data-ccfitback]').forEach(b => b.addEventListener('click', () => { st.fit.pop(); api.save(); refocus = 'ccfit-q'; api.render(); }));
      stage.querySelectorAll('[data-ccfitreset]').forEach(b => b.addEventListener('click', () => { st.fit = []; api.save(); refocus = 'ccfit-q'; api.render(); }));
      const tl = stage.querySelector('.cc-root [role="tablist"]');
      if (tl) tl.addEventListener('keydown', e => {
        const tabs = [...tl.querySelectorAll('[role="tab"]')], i = tabs.indexOf(document.activeElement); if (i < 0) return;
        let j = null; if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % tabs.length; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length; else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = tabs.length - 1;
        if (j != null) { e.preventDefault(); tabs[j].focus(); }
      });
      if (refocus) { const el = document.getElementById(refocus); refocus = null; if (el) { try { el.focus({ preventScroll: false }); } catch (e) { } } }
    }
  });
})();
