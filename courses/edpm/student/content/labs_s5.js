// Section V: Business Document Preparation — practical labs (Strand L)
// Developed by Kester Small
window.EDPM_LABS = (window.EDPM_LABS || []).concat([

  // ------------------------------------------------------------------
  {
    id: 'S5-W1',
    sec: 'S5',
    app: 'word',
    level: 'Core',
    title: 'Circular letter on letterhead from a manuscript draft',
    time: 50,
    brief: `<p>Harbourview Building Supplies Ltd of San Fernando is opening a new Trade Counter and changing the credit terms on its trade accounts. The Accounts Manager, Mr. Desmond Arrindell, has handed you a handwritten draft of a <b>circular letter</b> to be sent to every trade account holder. Because the letter discusses credit limits, each envelope must carry a special notation. Key in the letter on the company letterhead in <b>semi-blocked</b> style, interpreting every correction sign and expanding every abbreviation, then prepare one DL envelope.</p>`,
    data: `<p><b>Letterhead details</b><br>HARBOURVIEW BUILDING SUPPLIES LTD<br>27 Frederick Street, San Fernando, Trinidad and Tobago<br>Tel: +1 (868) 544 2187 &middot; E-mail: accounts@harbourviewsupplies.tt &middot; Chamber of Commerce Reg. No. 18842</p>
<p><b>Manuscript draft</b> (signs shown in square brackets)</p>
<p>Our ref DA/TC/04 &nbsp; Date: 20 April 2026</p>
<p>Dear Trade Customer</p>
<p>[uc] new trade counter and revised credit terms</p>
<p>We are pleased to inform you that our new Trade Counter, built specially for contractors and builders, will open on Monday 4 May 2026. The counter is located at the rear of our Welfare Rd premises &amp; has its own [trs] loading bay and entrance, so that yr orders can be collected [stet] quickly without queuing with retail cust.</p>
<p>[NP] From the same date the following changes will apply to all trade accounts:</p>
<p>1 &nbsp;Invoices must be settled within 30 days of the invoice date.<br>2 &nbsp;A discount of 2% will be allowed on invoices paid within 10 days.<br>3 &nbsp;Accounts wh are more than 60 days overdue will be placed on hold until payment is recd.</p>
<p>The new Trade Counter opening hours will be as follows:</p>
<table style="border:1px solid #999"><thead><tr><th>Day</th><th>Opening time</th><th>Closing time</th></tr></thead><tbody><tr><td>Monday to Friday</td><td>6.30 am</td><td>5.00 pm</td></tr><tr><td>Saturday</td><td>7.00 am</td><td>2.00 pm</td></tr><tr><td>Sunday and public holidays</td><td colspan="2">Closed</td></tr></tbody></table>
<p>[inset 1.27 cm from both margins] Please note that yr current credit limit will not change. If you wd like to apply for a higher limit, a sep application form is available fr the Accounts Dept.</p>
<p>We thank you for yr continued support.</p>
<p>[run on] We look forward to serving you at the new counter.</p>
<p>Yours faithfully<br>HARBOURVIEW BUILDING SUPPLIES LTD</p>
<p>Desmond Arrindell<br>Accounts Manager</p>
<p><b>Envelope:</b> Mr. Ruben Hodge, Hodge &amp; Sons Construction N.V., 9 Charlotte Street, San Fernando, Trinidad and Tobago</p>`,
    tasks: [
      `Set up an A4 portrait document with 2.54 cm margins on all sides. Create the letterhead in the top margin area: company name in a bold sans-serif font at 16 pt, centred; address, telephone, e-mail and registration line in 10 pt, centred; finish with a 1½ pt bottom border under the letterhead.`,
      `Save the letterhead alone as a Word template named <b>HBS_Letterhead.dotx</b>, then open a new document based on it to type the letter.`,
      `Type the reference at the left margin and the date indented to start at 9 cm from the left margin (semi-blocked style). Leave one clear line space between all parts of the letter.`,
      `Key in the body, expanding every abbreviation in full (Rd, &amp;, yr, cust, wh, recd, wd, sep, fr, Dept) and applying each correction sign: [uc] heading in capitals and bold, [trs] transpose to read 'entrance and loading bay', [stet] keep the word 'collected', [NP] start a new paragraph, [run on] join the last two sentences into one paragraph.`,
      `Format the three numbered points as a numbered list with a hanging indent of 0.63 cm.`,
      `Insert the opening-hours information as a 3-column ruled table with a bold, shaded header row; merge the two time cells for the Sunday row and centre the word Closed. Centre the table horizontally between the margins.`,
      `Inset the paragraph marked [inset] by 1.27 cm from BOTH the left and right margins.`,
      `Indent the complimentary close and signature block to start at 9 cm, leaving four clear lines for the signature. Justify the body text.`,
      `Using <b>Mailings &gt; Envelopes</b>, prepare a DL (11 cm x 22 cm) envelope for Mr. Ruben Hodge with the company return address in the top-left corner and the notation CONFIDENTIAL in capitals and bold in the lower-left area.`,
      `Proofread against the draft, then save the letter as <b>S5W1_CircularLetter_YourName.docx</b> and the envelope as <b>S5W1_Envelope_YourName.docx</b>.`
    ],
    skills: ['letterhead', 'semi-blocked letter', 'manuscript signs', 'tables', 'inset paragraph', 'envelopes'],
    check: [
      { c: 'Letterhead correctly positioned, with name larger/bold and full contact details; saved as a template', m: 2 },
      { c: 'Semi-blocked layout: date and closing indented consistently, paragraphs blocked at the left margin', m: 2 },
      { c: 'All ten abbreviations expanded correctly', m: 2 },
      { c: 'All correction signs ([uc], [trs], [stet], [NP], [run on]) applied correctly', m: 3 },
      { c: 'Numbered list and inset paragraph formatted as instructed', m: 2 },
      { c: 'Ruled table accurate, centred, header bold/shaded, Sunday cells merged', m: 2 },
      { c: 'DL envelope with return address, correct addressee layout and CONFIDENTIAL notation', m: 2 },
      { c: 'Letter mailable: no typing errors, correct salutation/close pairing (Dear Trade Customer / Yours faithfully)', m: 1 }
    ],
    tip: `In a semi-blocked letter only the date and the complimentary close move to the right; the paragraphs stay blocked. Examiners deduct when the reference is indented as well.`
  },

  // ------------------------------------------------------------------
  {
    id: 'S5-W2',
    sec: 'S5',
    app: 'word',
    level: 'Challenge',
    title: 'Meeting pack from skeleton notes: memo, notice, agenda and chairman’s agenda',
    time: 70,
    brief: `<p>You are the Secretary of the Calabash Point Secondary Young Entrepreneurs Club. The Club President, Keisha Lake, has left you a page of <b>skeleton notes</b> for the next committee meeting. From these notes you must compose, at the computer, (a) a short blocked memorandum to the Principal booking a room, (b) a combined notice of meeting and agenda for members, and (c) a chairman's agenda for the President. All three documents must be written in full, correct sentences without changing the intended meaning.</p>`,
    data: `<p><b>Skeleton notes from the Club President</b></p>
<ul>
<li><b>Memo</b> &ndash; to Principal, fr Club Sec &ndash; need Rm B12 Thurs 23 April, 3.15&ndash;4.45 pm &ndash; cttee mtg re Market Day &ndash; approx 25 members &ndash; also need projector &amp; screen &ndash; pls confirm by Fri 17 April &ndash; date memo 9 April 2026 &ndash; ref YEC/04/26</li>
<li><b>Notice</b> &ndash; Young Entrepreneurs Club cttee mtg &ndash; Thurs 23 April 2026, 3.15 pm, Room B12 &ndash; all members asked to attend &ndash; dated 9 April 2026 &ndash; signed Club Secretary</li>
<li><b>Agenda items (put in correct order)</b> &ndash; date of next mtg; Market Day Fri 15 May (stalls, stall fees, budget); apologies; any other business; minutes of last mtg (19 March); club T-shirts &ndash; quotes from 2 printers; matters arising; fundraising raffle</li>
<li><b>Chairman's notes</b> &ndash; Market Day: 18 stalls booked so far, target 24; proposed stall fee Cg 25.00; draft budget Cg 1,350.00 (copy attached) &ndash; Raffle: 3 prizes donated so far; tickets Cg 5.00 each; need 6 sellers &ndash; T-shirts: Quote A Cg 18.50 each (min. 30), Quote B Cg 21.00 each (no minimum) &ndash; Matters arising: bank account now opened at branch on Front Street; Treasurer to report balance</li>
</ul>`,
    tasks: [
      `Set up all three documents on A4 portrait paper with 2.54 cm margins and Arial 12 pt body text.`,
      `<b>Memo:</b> create a memo heading with the word MEMORANDUM centred in bold 16 pt, followed by TO, FROM, DATE, REF and SUBJECT lines. Use a left tab stop at 3 cm so that the entries after each label align exactly. Insert a full-width bottom border beneath the heading block.`,
      `Compose the memo body in <b>blocked</b> style (no paragraph indents), in two or three short paragraphs, expanding every abbreviation (fr, Rm, Thurs, cttee, mtg, re, approx, pls, Fri). End with the sender's initials at the left margin; no enclosure notation is needed.`,
      `<b>Notice and agenda:</b> centre the club name in capitals and bold, then the heading NOTICE OF MEETING. Compose a notice paragraph stating the date, time, venue and purpose in full sentences.`,
      `Place the agenda items in the standard order: Apologies for absence; Minutes of the last meeting; Matters arising; then the three business items; Any other business; Date of next meeting. Number them 1&ndash;8 using an automatic numbered list with a hanging indent.`,
      `Close the notice with a signature line and the words Club Secretary, and the date of issue at the left margin.`,
      `<b>Chairman's agenda:</b> using the same heading, insert a 2-column table with the agenda items on the left half of the page and the heading NOTES on the right. Type the chairman's notes in the right-hand column beside the correct items, writing currency in full form (Cg 25.00).`,
      `Leave the NOTES column blank below each chairman's note (at least two blank lines) so the President can write during the meeting. Remove all table borders except an outer border and a vertical rule between the columns.`,
      `Add a footer to the chairman's agenda reading CHAIRMAN'S COPY &ndash; NOT FOR CIRCULATION in 9 pt italic, centred.`,
      `Proofread all three documents against the skeleton notes to check that no point has been missed or changed in meaning.`,
      `Save as <b>S5W2_Memo_YourName.docx</b>, <b>S5W2_NoticeAgenda_YourName.docx</b> and <b>S5W2_ChairAgenda_YourName.docx</b>.`
    ],
    skills: ['skeleton notes', 'memoranda', 'notice of meeting', 'agenda', "chairman's agenda", 'tab stops'],
    check: [
      { c: 'Memo heading complete (TO, FROM, DATE, REF, SUBJECT) with entries aligned on a tab stop', m: 2 },
      { c: 'Memo composed in full, grammatical sentences, blocked style, all abbreviations expanded, all points included', m: 3 },
      { c: 'Notice states date, time, venue and purpose clearly and is signed and dated', m: 2 },
      { c: 'Agenda items in the correct standard order and correctly numbered', m: 3 },
      { c: "Chairman's agenda: two-column layout with notes beside the correct items and space for writing", m: 3 },
      { c: 'Footer and border formatting as instructed', m: 2 },
      { c: 'Overall mailability: accurate figures, dates and names; no typing errors', m: 2 },
      { c: 'Files saved with the correct names', m: 1 }
    ],
    tip: `The first three agenda items (apologies, minutes, matters arising) and the last two (AOB, date of next meeting) are always in the same place; only the business items in the middle change.`
  },

  // ------------------------------------------------------------------
  {
    id: 'S5-D1',
    sec: 'S5',
    app: 'access',
    level: 'Core',
    title: 'Customer mailing database with mailing-label report',
    time: 50,
    brief: `<p>Harbourview Building Supplies Ltd keeps its customer addresses in a notebook. Mr. Arrindell wants them stored in a database so that envelopes and <b>labels</b> for circular letters can be produced automatically instead of being typed one by one. Create the database, run the queries he needs to target his mailings, and produce a set of mailing labels.</p>`,
    data: `<p><b>Table name:</b> tblCustomers &nbsp; <b>Primary key:</b> CustID</p>
<table style="border:1px solid #999"><thead><tr><th>Field name</th><th>Data type</th><th>Notes</th></tr></thead><tbody>
<tr><td>CustID</td><td>Short Text (5)</td><td>Primary key</td></tr>
<tr><td>Title</td><td>Short Text (5)</td><td>Mr., Mrs., Ms.</td></tr>
<tr><td>FirstName</td><td>Short Text (20)</td><td></td></tr>
<tr><td>LastName</td><td>Short Text (25)</td><td></td></tr>
<tr><td>Company</td><td>Short Text (40)</td><td>may be blank</td></tr>
<tr><td>Street</td><td>Short Text (40)</td><td></td></tr>
<tr><td>District</td><td>Short Text (20)</td><td></td></tr>
<tr><td>AccountType</td><td>Short Text (6)</td><td>Trade or Retail</td></tr>
<tr><td>CreditLimit</td><td>Currency</td><td>US$, 2 decimal places</td></tr>
<tr><td>DateOpened</td><td>Date/Time</td><td>Medium Date</td></tr>
</tbody></table>
<p><b>Records</b></p>
<table style="border:1px solid #999"><thead><tr><th>CustID</th><th>Title</th><th>FirstName</th><th>LastName</th><th>Company</th><th>Street</th><th>District</th><th>AccountType</th><th>CreditLimit</th><th>DateOpened</th></tr></thead><tbody>
<tr><td>C1001</td><td>Mr.</td><td>Ruben</td><td>Hodge</td><td>Hodge &amp; Sons Construction N.V.</td><td>9 Bridge Street</td><td>Gros Islet</td><td>Trade</td><td>5,000.00</td><td>12 Jan 2021</td></tr>
<tr><td>C1002</td><td>Mrs.</td><td>Alicia</td><td>Brooks</td><td></td><td>14 Jeremie Street</td><td>Rodney Bay</td><td>Retail</td><td>500.00</td><td>3 Mar 2022</td></tr>
<tr><td>C1003</td><td>Mr.</td><td>Jerome</td><td>Carty</td><td>Carty Plumbing Services</td><td>22 Gros Islet Highway</td><td>Soufrière</td><td>Trade</td><td>2,500.00</td><td>18 Aug 2020</td></tr>
<tr><td>C1004</td><td>Ms.</td><td>Natasha</td><td>Wathey</td><td>Island Tile &amp; Stone</td><td>5 Micoud Street</td><td>Castries</td><td>Trade</td><td>3,000.00</td><td>7 Nov 2023</td></tr>
<tr><td>C1005</td><td>Mr.</td><td>Calvin</td><td>Richardson</td><td></td><td>31 Airport Road</td><td>Vieux Fort</td><td>Retail</td><td>750.00</td><td>25 May 2024</td></tr>
<tr><td>C1006</td><td>Mrs.</td><td>Sharon</td><td>Gumbs</td><td>Gumbs Electrical Contractors</td><td>18 Chaussee Road</td><td>Castries</td><td>Trade</td><td>1,500.00</td><td>14 Feb 2022</td></tr>
<tr><td>C1007</td><td>Mr.</td><td>Andre</td><td>Peterson</td><td>Peterson Roofing</td><td>40 Bridge Street</td><td>Gros Islet</td><td>Trade</td><td>4,000.00</td><td>9 Sep 2019</td></tr>
<tr><td>C1008</td><td>Ms.</td><td>Yvette</td><td>Lake</td><td></td><td>6 Marigot Bay Drive</td><td>Dennery</td><td>Retail</td><td>300.00</td><td>30 Jun 2025</td></tr>
<tr><td>C1009</td><td>Mr.</td><td>Oswald</td><td>Fleming</td><td>Fleming Joinery</td><td>12 Jeremie Street</td><td>Castries</td><td>Trade</td><td>2,000.00</td><td>21 Apr 2021</td></tr>
<tr><td>C1010</td><td>Mrs.</td><td>Monique</td><td>Baptiste</td><td></td><td>3 Soufrière Road</td><td>Soufrière</td><td>Retail</td><td>1,000.00</td><td>11 Oct 2024</td></tr>
</tbody></table>`,
    tasks: [
      `Create a new blank database named <b>S5D1_HarbourviewMailing_YourName.accdb</b>.`,
      `In Design View, create <b>tblCustomers</b> with the field names, data types and field sizes shown. Set CustID as the primary key, format CreditLimit as Currency with 2 decimal places and DateOpened as Medium Date.`,
      `Set the Validation Rule of AccountType to <b>"Trade" Or "Retail"</b> with the Validation Text 'Enter Trade or Retail only'.`,
      `Enter all 10 records exactly as given. Adjust column widths so that all data is visible, then sort the table in ascending order of LastName.`,
      `<b>Simple query:</b> create <b>qryCastries</b> showing Title, FirstName, LastName, Company, Street and District for customers whose District is Castries. (3 records)`,
      `<b>Two-criteria query:</b> create <b>qryTradeCredit2000</b> showing CustID, LastName, Company, AccountType and CreditLimit for customers whose AccountType is Trade <b>AND</b> whose CreditLimit is greater than or equal to 2,000.00. Sort in descending order of CreditLimit. (5 records)`,
      `Using the <b>Labels</b> wizard, create a mailing-label report based on qryTradeCredit2000 (Avery L7160 or a similar 3 x 7 sheet). Lay out each label as: Title FirstName LastName / Company / Street / District / ST. LUCIA. Name the report <b>rptTradeLabels</b>.`,
      `Create a second report, <b>rptCustomerList</b>, from tblCustomers grouped by AccountType, showing LastName, FirstName, District and CreditLimit, sorted by LastName, with the title 'Harbourview Customer List' and a Sum of CreditLimit for each group.`,
      `Print preview both reports and check that no field is cut off; adjust control widths if necessary.`
    ],
    skills: ['table design', 'primary key', 'validation rule', 'queries', 'label reports', 'grouped reports'],
    check: [
      { c: 'Table created with correct field names, data types, field sizes and primary key', m: 3 },
      { c: 'Validation rule and text set correctly on AccountType', m: 1 },
      { c: 'All 10 records entered accurately', m: 2 },
      { c: 'qryCastries returns the 3 correct records with the required fields', m: 2 },
      { c: 'qryTradeCredit2000 uses both criteria (Trade AND >=2000) and returns 5 records sorted by CreditLimit descending', m: 3 },
      { c: 'Label report laid out correctly with all address lines and ST. LUCIA in capitals', m: 2 },
      { c: 'Grouped report with title, sort and group totals (Trade US$18,000.00; Retail US$2,550.00)', m: 2 }
    ],
    tip: `Mail merge and the Labels wizard both depend on clean data: one misspelt district in the table means one wrong label in every mailing, so proofread records before you build the report.`
  },

  // ------------------------------------------------------------------
  {
    id: 'S5-P1',
    sec: 'S5',
    app: 'ppt',
    level: 'Starter',
    title: 'Choosing the right paper, stationery and letter style',
    time: 40,
    brief: `<p>The Head of Business &amp; Technology Studies has asked your class to prepare a short presentation for the Grade 9 students who will begin EDPM next year. It should explain, simply and visually, how to choose the correct paper size, orientation and stationery, how the three letter styles differ, and when to use special notations on envelopes.</p>`,
    data: `<p><b>Slide content</b></p>
<ol>
<li><b>Title slide:</b> Getting It Right on Paper &ndash; Paper, Stationery and Letter Styles. Subtitle: EDPM &middot; Business &amp; Technology Studies.</li>
<li><b>Paper sizes and orientation:</b> Letter &ndash; 21.6 cm x 27.9 cm (8.5" x 11"), standard business correspondence; Legal &ndash; 21.6 cm x 35.6 cm (8.5" x 14"), contracts and agreements; Customised &ndash; certificates, tickets. Portrait = taller than wide (letters, memos, reports). Landscape = wider than tall (wide tables, certificates).</li>
<li><b>International sizes (table):</b> A3 29.7 x 42 cm &ndash; posters; A4 21 x 29.7 cm &ndash; letters and reports; A5 14.8 x 21 cm &ndash; flyers, notepads; A6 10.5 x 14.8 cm &ndash; postcards; B5 17.6 x 25 cm &ndash; books, notebooks; C5 16.2 x 22.9 cm &ndash; envelope for A4 folded in half; DL 11 x 22 cm &ndash; envelope for A4 folded into thirds.</li>
<li><b>Stationery for the task:</b> Letterhead &ndash; external letters; Memo template &ndash; internal messages; Copy paper &ndash; drafts; Forms &ndash; collecting fixed information; Labels &ndash; addressing; Index cards &ndash; quick notes and cues; Document covers &ndash; reports; Templates &ndash; consistent repeated layouts.</li>
<li><b>Three letter styles:</b> Blocked &ndash; every line starts at the left margin; Indented &ndash; first line of each paragraph indented, date and close to the right; Semi-blocked &ndash; paragraphs blocked, date and close indented.</li>
<li><b>Special notations:</b> CONFIDENTIAL &ndash; open only by the addressee; PRIVATE / PERSONAL &ndash; personal matter for the addressee alone; CLASSIFIED &ndash; restricted government or security information; URGENT &ndash; needs prompt attention. Typed in capitals, lower-left of the envelope or above the address.</li>
<li><b>Quick check:</b> Which envelope fits an A4 letter folded into thirds? Which letter style keeps the date at the left margin? Which notation would you use for a staff salary letter? (Answers in speaker notes: DL; blocked; CONFIDENTIAL.)</li>
</ol>`,
    tasks: [
      `Create a new presentation and apply one design theme throughout; choose a variant with high contrast between text and background.`,
      `Build the seven slides using the content given: Title Slide layout for slide 1 and Title and Content layouts for slides 2&ndash;7.`,
      `On slide 3, insert a 3-column table (Size, Dimensions, Typical use) with a header row, and apply a table style with banded rows. Use a minimum font size of 18 pt.`,
      `On slide 5, insert three rectangle shapes side by side, each showing a miniature letter layout (short lines) aligned to demonstrate blocked, indented and semi-blocked styles, with a label under each.`,
      `On slide 6, insert a picture or icon of an envelope and resize it in proportion (hold Shift) so it does not overlap the text; crop any unwanted white space.`,
      `Apply the <b>Fade</b> transition to all slides with a duration of 1.00 second.`,
      `On slide 4, animate the bullet points with the <b>Appear</b> entrance effect, By Paragraph, On Click.`,
      `Type speaker notes of at least two sentences on slides 2, 5 and 7 (slide 7 notes must contain the three answers).`,
      `Insert slide numbers and the footer 'EDPM &ndash; Section V' on all slides except the title slide.`,
      `Save as <b>S5P1_PaperStationery_YourName.pptx</b> and run the slide show from the beginning to check timing and animation order.`
    ],
    skills: ['design themes', 'tables on slides', 'shapes', 'transitions', 'animation', 'speaker notes'],
    check: [
      { c: 'Seven slides with all content accurate and correctly placed', m: 3 },
      { c: 'Consistent theme and readable font sizes (minimum 18 pt)', m: 2 },
      { c: 'Table on slide 3 complete and accurate with a header row', m: 2 },
      { c: 'Shapes on slide 5 clearly illustrate the three letter styles', m: 2 },
      { c: 'Picture inserted, cropped and resized in proportion', m: 1 },
      { c: 'Fade transition on all slides; Appear animation by paragraph on slide 4', m: 2 },
      { c: 'Speaker notes, slide numbers and footer as instructed', m: 2 }
    ],
    tip: `Learn the C5 / DL pair: C5 takes A4 folded once, DL takes A4 folded twice. It is one of the most frequently tested stationery facts.`
  },

  // ------------------------------------------------------------------
  {
    id: 'S5-B1',
    sec: 'S5',
    app: 'pub',
    level: 'Core',
    title: 'Matching stationery set: letterhead, DL envelope and business card',
    time: 55,
    brief: `<p>A new business, Eagle Beach Island Tours N.V., needs a full set of matching stationery before it opens. The owner, Ms. Lorraine Arnell, wants a letterhead for external letters, a DL envelope with the return address printed on it, and a business card, all using the same logo, colours and fonts so that the company is instantly recognisable.</p>`,
    data: `<p><b>Company details</b></p>
<p>EAGLE BEACH ISLAND TOURS N.V.<br>Tagline: Discover Aruba by land and sea<br>Address: 62 Caya G. F. Betico Croes, Oranjestad, Aruba<br>Tel: +297 582 7316 &middot; WhatsApp: +297 593 2290<br>E-mail: bookings@eaglebeachislandtours.aw<br>Website: www.eaglebeachislandtours.aw<br>Chamber of Commerce Reg. No. 21507</p>
<p><b>Business card</b><br>Lorraine Arnell<br>Managing Director<br>Tel: +297 582 7316 &middot; Mobile: +297 593 2290<br>lorraine@eaglebeachislandtours.aw</p>
<p><b>Logo idea:</b> a simple circle containing a stylised wave and sun, with the letters GBIT beneath, in two colours (deep blue and orange).</p>`,
    tasks: [
      `Create a blank A4 portrait publication. Draw the logo using basic shapes (circle, wave/curved line, sun) in deep blue and orange; group the shapes and add the letters GBIT in a text box beneath. Group everything and save the logo as a picture named <b>GBIT_logo.png</b>.`,
      `Place the logo in the top-left corner inside the margins, no taller than 2.5 cm. Beside it, insert a text box with the company name in a bold 20 pt font and the tagline in 11 pt italic.`,
      `Add a second text box with the address, telephone, WhatsApp, e-mail, website and registration number in 9 pt, aligned right, and keep the whole letterhead within the top 3.5 cm of the page.`,
      `Insert a 3 pt horizontal line in orange under the letterhead, running from margin to margin. Save as <b>S5B1_Letterhead_YourName.pub</b> and also as a Publisher template.`,
      `Create a new publication sized as a DL envelope (22 cm x 11 cm, landscape). Place a smaller copy of the logo and the return address in the top-left corner (maximum 8 pt), using the same fonts and colours.`,
      `Insert a text box for the recipient in the lower-right half of the envelope and type: Mr. Hendrik van der Berg, Travel Desk Manager, Palm Beach Resort Lodge, 48 J. E. Irausquin Boulevard, Palm Beach, Aruba. Add the notation URGENT in capitals and bold in the lower-left corner. Save as <b>S5B1_Envelope_YourName.pub</b>.`,
      `Create a business card (8.5 cm x 5.5 cm, landscape) using the logo, company name, card holder's name in bold 12 pt, job title in 9 pt, and the contact details in 8 pt. Use a thin orange border.`,
      `Set the business card to print 10 copies per A4 sheet (Multiple pages per sheet) and save as <b>S5B1_BusinessCard_YourName.pub</b>.`,
      `Check that all three items use the same two fonts and the same two colours, then export the letterhead as a PDF.`
    ],
    skills: ['letterhead', 'logo design', 'envelopes', 'business cards', 'special notations', 'consistent branding'],
    check: [
      { c: 'Logo created from grouped shapes, two colours, sized and positioned correctly', m: 2 },
      { c: 'Letterhead within the top margin area: name larger and bold, full contact details, rule beneath', m: 3 },
      { c: 'Letterhead saved as a template', m: 1 },
      { c: 'DL envelope: correct size, return address top-left, recipient lower-right, URGENT notation', m: 3 },
      { c: 'Business card: correct size, complete details, legible hierarchy of font sizes, border', m: 2 },
      { c: 'Consistent fonts, colours and logo across all three items', m: 2 },
      { c: 'All details typed accurately (names, numbers, e-mail addresses)', m: 2 }
    ],
    tip: `A letterhead must never crowd the letter: if your heading pushes past about 3.5 cm, shrink the logo before you shrink the company name.`
  }
]);
