// EDPM · Practical labs · Section VIII: Document Management
// Developed by Kester Small
window.EDPM_LABS = (window.EDPM_LABS || []).concat([
{
  id: 'S8-W1',
  sec: 'S8',
  app: 'word',
  level: 'Challenge',
  title: 'Records retention and disposal policy',
  time: 55,
  brief: `<p>Ms Natasha Romney, Office Manager at <b>English Harbour Accounting Services</b>, 7 English Harbour Road, English Harbour, has drafted a policy that tells staff how long each type of record must be kept, how records are protected, and how they are disposed of. She wants it keyed in as a formal two-page policy document with a retention schedule table, ready for the partners to approve on 23 March 2026.</p><p>The draft contains manuscript correction signs (in square brackets), abbreviations to expand and a table to set out.</p>`,
  data: `<p style="text-align:center"><b>records retention and disposal policy [uc]</b></p>
<p><b>1 Purpose</b></p>
<p>This policy explains how long the co. keeps its records, how those records are protected while they are kept, and how they are destroyed when they are no longer required. It applies to paper and electronic records held by every dept.</p>
<p><b>2 Why retention matters</b></p>
<p>If we keep records longer than necy, we pay for storage we do not need and we increase the damage that wd be caused if the data were ever stolen. If we dispose of records too soon, we may be unable to produce them for an audit, a dispute or a legal enquiry. [NP] A clear retention schedule helps us to manage this balance <del>responsibly</del> [stet].</p>
<p><b>3 Retention schedule</b></p>
<p>Each type of record shd be kept for the period shown below, counted from the date the record was created.</p>
<table style="border:1px solid">
<thead><tr><th>Type of record</th><th>Examples</th><th>Retention period</th><th>Storage</th><th>Disposal method</th></tr></thead>
<tbody>
<tr><td>Payroll records</td><td>Timesheets, payslips</td><td>7 yrs</td><td>Restricted folder (encrypted)</td><td>Secure deletion</td></tr>
<tr><td>Tax records</td><td>Tax returns, receipts</td><td>10 yrs</td><td>Restricted folder and fireproof cabinet</td><td>Shredding and secure deletion</td></tr>
<tr><td>Client invoices</td><td>Invoices, payment stubs</td><td>7 yrs</td><td>Clients folder</td><td>Secure deletion</td></tr>
<tr><td>Policies</td><td>Staff handbook, this policy</td><td>5 yrs after replaced</td><td>Policies folder (read-only)</td><td>Archive, then delete</td></tr>
<tr><td>General correspondence</td><td>Letters, e-mails, minutes</td><td>3 yrs</td><td>Correspondence folder</td><td>Deletion</td></tr>
</tbody>
</table>
<p><b>4 PROTECTING RECORDS [lc]</b></p>
<p>All electronic records are saved on the shared S: drive, wh is backed up every night to an off-site server in St. John’s. Restricted folders can be opened only by the partners and the payroll officer, and every computer has up-to-date virus protection. [run on] Original signed paper documents are kept in the fireproof and waterproof cabinet in the mgr's office.</p>
<p><b>5 Archiving and disposal</b></p>
<p>Records that are no longer in active use are moved to the Archive folder at the end of each financial yr. When the retention period ends, the Office Mgr will list the records due for disposal, and no record may be destroyed until the list has been approved by a partner. Paper records shredded must be [trs]; electronic records must be deleted from the S: drive and from all backups.</p>
<p><b>6 Responsibility</b></p>
<p>Every member of staff is responsible for filing records in the correct folder, using the approved file-naming convention, and reporting any lost or damaged record to the Office Mgr immed.</p>
<p>Approved by: ............................................ (Partner) &nbsp; Date: ....................</p>
<p><small>Abbreviations: co. = company; dept = department; necy = necessary; wd = would; shd = should; yrs = years; yr = year; wh = which; mgr = manager (Mgr = Manager); immed. = immediately.<br>Sign notes: [stet] = let the crossed-out word "responsibly" stand (key it in). [lc] = key the side heading in lower case with initial capitals only, as for the other side headings. [trs] in section 5 = the draft reads "Paper records shredded must be"; transpose to "must be shredded". (Key the corrected text, not the bracketed note.)</small></p>
<p><b>Footnote</b> to be attached to the word "audit" in section 2: <i>An audit is an official examination of an organisation's accounts and records.</i></p>`,
  tasks: [
    `Set A4 portrait, top and bottom margins <b>2.5 cm</b>, left margin <b>3 cm</b> (to allow for binding) and right margin <b>2.5 cm</b>.`,
    `Key in the policy, making every correction shown by the signs in square brackets and expanding all abbreviations in full. Do not key the bracketed notes themselves.`,
    `Format the main heading in <b>Times New Roman 16 pt, bold, capitals, centred</b>. Set all other text in Times New Roman 12 pt with <b>1.5 line spacing</b>, justified.`,
    `Format the numbered side headings (1 to 6) in bold, with 12 pt spacing before and 6 pt after.`,
    `Insert the retention schedule as a <b>5-column table</b> with a bold, shaded header row. Centre the Retention period column, set the table to the full width of the typing line and keep the table on one page.`,
    `Insert the footnote on the word <i>audit</i> in section 2 using the References &gt; Insert Footnote command.`,
    `Insert a <b>different first page</b> header: no header on page 1; on page 2 a right-aligned header reading <i>Records Retention and Disposal Policy</i>, 10 pt italic.`,
    `Insert a centred footer on both pages reading <b>Page X of Y</b>, and the text <i>Version 1 · 16 March 2026</i> at the left of the footer.`,
    `Use <b>File &gt; Info &gt; Properties</b> to enter the Title <i>Records Retention Policy</i>, Author <i>your name</i> and Company <i>English Harbour Accounting Services</i> as document metadata.`,
    `Proofread, then save as <b>2026-03-16_RetentionPolicy_v1_YourName</b>. Make one further change requested by your teacher, and save the edited copy as <b>2026-03-16_RetentionPolicy_v2_YourName</b>, keeping both versions.`,
    `Print both pages of version 2.`
  ],
  skills: ['manuscript signs', 'tables', 'footnotes', 'different first page header', 'document properties', 'versioning'],
  check: [
    { c: 'All abbreviations expanded accurately', m: 3 },
    { c: 'Signs applied correctly: [uc], [NP], [stet], [lc], [run on], [trs]', m: 3 },
    { c: 'Margins, font, 1.5 spacing and justification as instructed', m: 2 },
    { c: 'Retention table: 5 columns, accurate data, shaded header, full width, not split', m: 3 },
    { c: 'Footnote inserted on "audit" with correct text', m: 1 },
    { c: 'Different first page header and Page X of Y footer with version line', m: 3 },
    { c: 'Document properties (metadata) completed', m: 1 },
    { c: 'Two versions saved with the YYYY-MM-DD naming convention', m: 2 }
  ],
  tip: `Saving v1 and v2 as separate files is versioning in action; examiners also look for the date in YYYY-MM-DD form so files sort correctly.`
},
{
  id: 'S8-W2',
  sec: 'S8',
  app: 'word',
  level: 'Starter',
  title: 'Manual versus electronic filing comparison',
  time: 30,
  brief: `<p>The committee of the <b>San Pedro Community Centre</b> keeps all its records in three metal filing cabinets. Before the next committee meeting, the Secretary, Mr Lionel Hodge, wants a one-page comparison of manual and electronic filing so that members can decide whether to move to an electronic system. Prepare the comparison as a ruled table.</p>`,
  data: `<p><b>Heading:</b> MANUAL AND ELECTRONIC FILING: A COMPARISON</p>
<p><b>Introductory sentence:</b> The table below compares the two filing systems under seven features, to help the committee decide how the Centre's records should be kept from April 2026.</p>
<table style="border:1px solid">
<thead><tr><th>Feature</th><th>Manual filing system</th><th>Electronic filing system</th></tr></thead>
<tbody>
<tr><td>Storage medium</td><td>Paper, folders and cabinets</td><td>Digital files on a drive, server or cloud storage</td></tr>
<tr><td>Physical space</td><td>Large, and grows as records increase</td><td>Very little; large volumes fit on small devices</td></tr>
<tr><td>Search and retrieval</td><td>Searched by hand; slow</td><td>Fast search by name, date, keyword or metadata</td></tr>
<tr><td>Backup</td><td>Needs photocopying</td><td>Copied, backed up or synced automatically</td></tr>
<tr><td>Security</td><td>Locks, restricted rooms, supervision</td><td>Passwords, encryption, permissions, firewalls</td></tr>
<tr><td>Risk of damage</td><td>Fire, flooding, pests, wear and tear</td><td>Hardware failure, cyberattack, accidental deletion</td></tr>
<tr><td>Sharing</td><td>Must be carried or photocopied</td><td>Shared instantly by network or e-mail</td></tr>
</tbody>
</table>
<p><b>Closing sentence:</b> The committee may decide to keep original signed documents, such as the Centre's lease, in a fireproof cabinet even if all other records become electronic.</p>
<p><b>Prepared by:</b> Lionel Hodge, Secretary · 9 March 2026</p>`,
  tasks: [
    `Set A4 portrait with <b>2.54 cm</b> margins all round.`,
    `Key in the heading in <b>Arial 14 pt, bold, capitals, centred</b>, followed by one clear line space and the introductory sentence in Arial 11 pt.`,
    `Insert a table of <b>3 columns and 8 rows</b> and key in the data accurately.`,
    `Bold and centre the header row and apply a light shading of your choice to it. Bold the entries in the Feature column.`,
    `Sort the seven data rows into <b>alphabetical order by Feature</b> (ascending), keeping the header row at the top.`,
    `Apply all borders to the table and use AutoFit to Window so that the table fills the typing line.`,
    `Key in the closing sentence and the Prepared by line below the table, leaving one clear line space before each.`,
    `Save as <b>S8W2_FilingComparison_YourName</b> and print one copy.`
  ],
  skills: ['tables', 'table sort', 'shading', 'borders', 'AutoFit'],
  check: [
    { c: 'Margins and heading formatted as instructed', m: 2 },
    { c: 'Table 3 x 8 with all data keyed accurately', m: 3 },
    { c: 'Header row bold, centred and shaded; Feature column bold', m: 2 },
    { c: 'Rows sorted alphabetically by Feature (Backup first, Storage medium last)', m: 2 },
    { c: 'All borders; table fits the typing line', m: 1 },
    { c: 'Introductory and closing text correctly placed; saved with correct name', m: 2 }
  ],
  tip: `When sorting a table, tick "My list has header row" so the column headings stay at the top.`
},
{
  id: 'S8-D1',
  sec: 'S8',
  app: 'access',
  level: 'Core',
  title: 'Electronic file register',
  time: 55,
  brief: `<p><b>Frigate Bay Accounting Services</b> wants to keep a register of the important files on its shared S: drive. The register records each file's metadata (owner, dates, version and access level) and its retention period, so that the Office Manager can see at once which files are restricted, which are due for archiving and which have gone through several versions. Create the database and produce the queries and report below.</p>`,
  data: `<p><b>Database name:</b> FileRegister_YourName &nbsp; <b>Table name:</b> tblFiles</p>
<table style="border:1px solid">
<thead><tr><th>Field name</th><th>Data type</th><th>Field size / format</th></tr></thead>
<tbody>
<tr><td>FileID (primary key)</td><td>Short Text</td><td>4</td></tr>
<tr><td>FileName</td><td>Short Text</td><td>60</td></tr>
<tr><td>Folder</td><td>Short Text</td><td>30</td></tr>
<tr><td>Owner</td><td>Short Text</td><td>25</td></tr>
<tr><td>DateCreated</td><td>Date/Time</td><td>Short Date</td></tr>
<tr><td>DateModified</td><td>Date/Time</td><td>Short Date</td></tr>
<tr><td>Version</td><td>Number</td><td>Integer</td></tr>
<tr><td>Access</td><td>Short Text</td><td>12 (Edit, Read-only or Restricted)</td></tr>
<tr><td>RetentionYrs</td><td>Number</td><td>Integer</td></tr>
<tr><td>Archived</td><td>Yes/No</td><td>Yes/No</td></tr>
</tbody>
</table>
<p><b>Records</b></p>
<table style="border:1px solid">
<thead><tr><th>FileID</th><th>FileName</th><th>Folder</th><th>Owner</th><th>DateCreated</th><th>DateModified</th><th>Version</th><th>Access</th><th>RetentionYrs</th><th>Archived</th></tr></thead>
<tbody>
<tr><td>F001</td><td>2024-12-31_Payroll_December_v2.xlsx</td><td>Payroll</td><td>Lisa Carty</td><td>31 December 2024</td><td>8 January 2025</td><td>2</td><td>Restricted</td><td>7</td><td>Yes</td></tr>
<tr><td>F002</td><td>2026-01-15_Timesheets_Week02_v1.pdf</td><td>Payroll</td><td>Lisa Carty</td><td>15 January 2026</td><td>15 January 2026</td><td>1</td><td>Restricted</td><td>7</td><td>No</td></tr>
<tr><td>F003</td><td>2026-02-03_Invoice_SandyPointBakery_v1.docx</td><td>Clients</td><td>Omar Brooks</td><td>3 February 2026</td><td>3 February 2026</td><td>1</td><td>Edit</td><td>7</td><td>No</td></tr>
<tr><td>F004</td><td>2026-02-10_Receipts_FortStreetJewels_v1.pdf</td><td>Clients</td><td>Omar Brooks</td><td>10 February 2026</td><td>10 February 2026</td><td>1</td><td>Read-only</td><td>7</td><td>No</td></tr>
<tr><td>F005</td><td>2025-06-30_StaffHandbook_v4.docx</td><td>Policies</td><td>Natasha Romney</td><td>30 June 2025</td><td>2 March 2026</td><td>4</td><td>Read-only</td><td>5</td><td>No</td></tr>
<tr><td>F006</td><td>2026-01-20_RetentionPolicy_v3.docx</td><td>Policies</td><td>Natasha Romney</td><td>20 January 2026</td><td>2 March 2026</td><td>3</td><td>Read-only</td><td>5</td><td>No</td></tr>
<tr><td>F007</td><td>2025-11-14_Letter_CayonHardware_v1.docx</td><td>Correspondence</td><td>Omar Brooks</td><td>14 November 2025</td><td>14 November 2025</td><td>1</td><td>Edit</td><td>3</td><td>No</td></tr>
<tr><td>F008</td><td>2023-04-28_TaxReturn_2022_v2.pdf</td><td>Tax</td><td>Lisa Carty</td><td>28 April 2023</td><td>5 May 2023</td><td>2</td><td>Restricted</td><td>10</td><td>Yes</td></tr>
<tr><td>F009</td><td>2026-03-05_BudgetReport_Q1_v3.xlsx</td><td>Reports</td><td>Natasha Romney</td><td>5 March 2026</td><td>12 March 2026</td><td>3</td><td>Edit</td><td>7</td><td>No</td></tr>
<tr><td>F010</td><td>2026-02-27_PaymentStub_February_v1.pdf</td><td>Clients</td><td>Omar Brooks</td><td>27 February 2026</td><td>27 February 2026</td><td>1</td><td>Read-only</td><td>7</td><td>No</td></tr>
<tr><td>F011</td><td>2024-09-16_Minutes_StaffMeeting_v1.docx</td><td>Correspondence</td><td>Natasha Romney</td><td>16 September 2024</td><td>16 September 2024</td><td>1</td><td>Edit</td><td>3</td><td>Yes</td></tr>
</tbody>
</table>`,
  tasks: [
    `Create a new blank database named <b>FileRegister_YourName</b>.`,
    `Create <b>tblFiles</b> in Design View with the field names, data types and sizes given. Set <b>FileID</b> as the primary key and give each field a short description.`,
    `Set the <b>Default Value</b> of Version to 1 and of Archived to No.`,
    `Enter all 11 records accurately. Widen the columns so the full file names are visible, then print the table in landscape.`,
    `Create a simple query <b>qryRestricted</b> showing FileID, FileName, Owner and Access where <b>Access = "Restricted"</b>. Run and print it (3 records).`,
    `Create a query <b>qryKeepActive</b> showing FileID, FileName, Folder, RetentionYrs and Archived where <b>RetentionYrs &gt;= 7 AND Archived = No</b>, sorted by FileName ascending. Run and print it (5 records).`,
    `Create a query <b>qryVersions</b> showing FileID, FileName, Version and DateModified for every file with <b>Version &gt; 1</b>, sorted by Version descending. Run and print it (5 records; F005 first).`,
    `Create a report <b>rptFilesByOwner</b> from tblFiles showing FileName, Folder, DateModified, Version and Access, <b>grouped by Owner</b> and sorted by FileName. Add the title <i>Frigate Bay Accounting Services · File Register</i>, a count of files for each owner and today's date in the page footer.`,
    `Print the report in landscape orientation and close the database.`
  ],
  skills: ['table design', 'default values', 'queries', 'two-criteria query', 'sorting', 'grouped report'],
  check: [
    { c: 'Table designed with correct fields, data types and sizes; FileID primary key', m: 3 },
    { c: 'Default values set for Version and Archived', m: 1 },
    { c: 'All 11 records entered accurately', m: 3 },
    { c: 'qryRestricted returns F001, F002, F008', m: 2 },
    { c: 'qryKeepActive uses both criteria and returns F002, F003, F004, F009, F010', m: 3 },
    { c: 'qryVersions returns 5 records sorted by Version descending', m: 2 },
    { c: 'Report grouped by Owner (Lisa Carty 3, Natasha Romney 4, Omar Brooks 4) with title, counts and date', m: 4 }
  ],
  tip: `Notice how the YYYY-MM-DD at the start of each file name makes the FileName sort also a date sort.`
},
{
  id: 'S8-P1',
  sec: 'S8',
  app: 'ppt',
  level: 'Core',
  title: 'Keeping our files safe',
  time: 45,
  brief: `<p>After a power surge damaged a computer at a neighbouring business in St. George’s, the partners of <b>Grand Anse Accounting Services</b> have asked you to prepare a seven-slide presentation for the staff meeting on Friday 27 March 2026. It must explain how the firm protects the integrity and security of its files, how long files are kept, and how document versions are traced.</p>`,
  data: `<p><b>Slide 1 (Title slide)</b><br>Title: Keeping Our Files Safe<br>Sub-title: Integrity, security, retention and version control · Staff meeting, 27 March 2026</p>
<p><b>Slide 2 · Protecting file integrity</b><br>&bull; Overwrite protection: warns before a file is replaced<br>&bull; Restricted access: only authorised staff can edit or delete<br>&bull; Virus protection: blocks and removes malicious programs<br>&bull; Encryption: content can be read only with the key or password<br>&bull; Read-only access: view but not change</p>
<p><b>Slide 3 · Cyber security</b><br>&bull; Strong, unique passwords<br>&bull; Firewalls monitor and block unauthorised traffic<br>&bull; Nightly backups to an off-site server<br>&bull; A written disaster recovery plan</p>
<p><b>Slide 4 · Physical security</b><br>&bull; Fireproof and waterproof cabinet for signed originals<br>&bull; Locked server cupboard<br>&bull; Off-site copies in case the office is damaged by fire, flood or hurricane</p>
<p><b>Slide 5 · Why one backup is not enough</b> (SmartArt process: three steps)<br>Step 1: Files saved on the S: drive &rarr; Step 2: Backup to a second drive in the office &rarr; Step 3: Copy sent to an off-site server<br>Caption below: A backup kept in the same office can be lost in the same fire or flood.</p>
<p><b>Slide 6 · How long we keep files</b><br>&bull; Archiving: move inactive files to the Archive folder each year-end<br>&bull; Retention period: 3, 5, 7 or 10 years depending on the record<br>&bull; Disposal: shred paper; delete electronic files and their backups<br>&bull; Never dispose of a file without a partner's approval</p>
<p><b>Slide 7 · Tracing versions</b><br>Left: Versioning &bull; Save v1, v2, v3 as separate files &bull; Compare or restore an earlier version<br>Right: Metadata &bull; Date created and date modified &bull; Date accessed &bull; Owner and access privileges</p>
<p><b>Speaker notes</b><br>Slide 2: Point out that the Staff Handbook is set to read-only so that no one changes it by accident.<br>Slide 5: Ask staff what would happen to the second office drive in a hurricane.<br>Slide 7: Demonstrate File &gt; Info &gt; Properties to show the metadata of a real file.</p>`,
  tasks: [
    `Create a new presentation and apply a professional design theme with a dark text on light background colour variant.`,
    `Use the <b>Title Slide</b> layout for slide 1, <b>Title and Content</b> for slides 2 to 6 and <b>Comparison</b> for slide 7. Key in all content accurately.`,
    `On slide 5, convert the three steps into a <b>SmartArt Basic Process</b> graphic and add the caption in a text box below it.`,
    `Insert a relevant picture or icon (e.g. a padlock or shield) on slide 3 and resize it to sit beside the bullets.`,
    `Apply the <b>Push</b> transition (from right) to all slides, duration 0.75 seconds.`,
    `Apply the <b>Wipe</b> entrance animation (from left) to the bullets on slide 2 and to the SmartArt on slide 5 (one by one).`,
    `Add the speaker notes for slides 2, 5 and 7.`,
    `Insert the date (fixed: 27 March 2026), slide numbers and the footer <i>Grand Anse Accounting Services</i> on all slides except the title slide.`,
    `Save as <b>S8P1_FileSafety_YourName</b>. Print handouts with 4 slides per page and slide 5 as a Notes Page.`
  ],
  skills: ['slide layouts', 'SmartArt', 'transitions', 'animations', 'speaker notes'],
  check: [
    { c: 'Seven slides, correct layouts, consistent theme', m: 2 },
    { c: 'All content keyed accurately', m: 3 },
    { c: 'SmartArt process on slide 5 with caption', m: 2 },
    { c: 'Relevant image on slide 3, not covering text', m: 1 },
    { c: 'Push transition on all slides; Wipe animations as specified', m: 3 },
    { c: 'Speaker notes on slides 2, 5 and 7', m: 2 },
    { c: 'Date, slide numbers and footer except on title slide; printouts correct', m: 2 }
  ],
  tip: `Use one transition throughout; mixing several transition effects is marked as poor design.`
},
{
  id: 'S8-B1',
  sec: 'S8',
  app: 'pub',
  level: 'Core',
  title: 'File naming and folder poster',
  time: 45,
  brief: `<p>Staff at <b>Belmont Property Management Ltd</b>, Belmont, Port of Spain, save files with names like <i>Document1</i> and <i>New Folder</i>, and documents are often lost. The manager, Mrs Yvette Brison, wants an A3 poster for the office wall that shows the company's folder hierarchy and its file-naming rules. Design the poster in Microsoft Publisher using the exact text below.</p>`,
  data: `<p><b>Heading (WordArt):</b> FIND IT IN SECONDS</p>
<p><b>Sub-heading:</b> How we name and file our documents</p>
<p><b>Folder hierarchy (draw as a diagram of shapes joined by connectors, top to bottom):</b><br>Level 1 · Drive: S: Shared Drive<br>Level 2 · Folders: Tenants &nbsp;|&nbsp; Properties &nbsp;|&nbsp; Accounts<br>Level 3 · Sub-folders under Tenants: Leases &nbsp;|&nbsp; Correspondence<br>Level 4 · File in Leases: 2026-03-01_Lease_Unit4B_FrontStreet_v2.docx</p>
<p><b>Text box · Our naming rules</b></p>
<ol>
<li>Start with the date in YYYY-MM-DD form so files sort in date order.</li>
<li>Say what the document is: Lease, Invoice, Letter, Minutes.</li>
<li>Add the tenant, property or client name.</li>
<li>End with the version number: v1, v2, v3.</li>
<li>Use underscores, not spaces, and never "Document1" or "New Folder".</li>
</ol>
<p><b>Table · Good and poor file names</b></p>
<table style="border:1px solid">
<thead><tr><th>Poor name</th><th>Good name</th></tr></thead>
<tbody>
<tr><td>Document1.docx</td><td>2026-03-01_Lease_Unit4B_FrontStreet_v2.docx</td></tr>
<tr><td>invoice new FINAL.xlsx</td><td>2026-03-05_Invoice_CoralViewApts_v1.xlsx</td></tr>
<tr><td>letter to tenant.docx</td><td>2026-03-09_Letter_RepairNotice_Unit2A_v1.docx</td></tr>
<tr><td>meeting.docx</td><td>2026-03-12_Minutes_StaffMeeting_v1.docx</td></tr>
</tbody>
</table>
<p><b>Footer strip:</b> Keep folders shallow · Archive old files every December · Ask the Office Manager, ext. 204</p>`,
  tasks: [
    `Create a blank <b>A3 portrait</b> publication with 1.5 cm margin guides and choose one colour scheme for the whole poster.`,
    `Insert the heading as <b>WordArt</b> across the full width at the top, and the sub-heading in a text box below it in 28 pt bold.`,
    `Draw the folder hierarchy using <b>rectangle or folder shapes</b> joined by <b>connector lines</b>, with each level on its own row and the drive at the top. Key the labels inside the shapes (minimum 18 pt).`,
    `Group all hierarchy shapes and connectors into one object and centre it horizontally on the page.`,
    `Insert the naming rules in a text box as a <b>numbered list</b>, 20 pt, with a 2 pt border and a light fill.`,
    `Insert the good and poor file names as a <b>table of 2 columns and 5 rows</b>. Shade the header row and apply a strikethrough to the four poor names.`,
    `Place the footer strip text in a full-width coloured rectangle at the bottom of the page, white 18 pt bold text, centred.`,
    `Apply a page border and check that all objects are aligned and that none overlap.`,
    `Save as <b>2026-03-16_FilingPoster_v1_YourName</b> (applying the poster's own naming rule) and print, scaled to fit A4 if an A3 printer is not available.`
  ],
  skills: ['WordArt', 'shapes and connectors', 'grouping', 'tables', 'text boxes', 'page border'],
  check: [
    { c: 'A3 portrait with margin guides; WordArt heading and sub-heading', m: 2 },
    { c: 'Hierarchy diagram correct: drive, folders, sub-folders, file on four levels', m: 4 },
    { c: 'Shapes joined by connectors, grouped and centred', m: 2 },
    { c: 'Naming rules as a numbered list in a bordered, filled text box', m: 2 },
    { c: 'Table 2 x 5 accurate, header shaded, poor names struck through', m: 2 },
    { c: 'Footer strip, page border and balanced layout with no overlaps', m: 2 },
    { c: 'Text accurate; saved using the YYYY-MM-DD naming convention', m: 2 }
  ],
  tip: `Group a diagram before you move it, or the connectors will come loose from the shapes.`
}
]);
