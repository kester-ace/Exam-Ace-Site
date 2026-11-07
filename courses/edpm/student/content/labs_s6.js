// Section VI: Specialised Document Preparation — practical labs (Strand L)
// Developed by Kester Small
window.EDPM_LABS = (window.EDPM_LABS || []).concat([

  // ------------------------------------------------------------------
  {
    id: 'S6-W1',
    sec: 'S6',
    app: 'word',
    level: 'Core',
    title: 'Residential lease with endorsement from a manuscript draft',
    time: 55,
    brief: `<p>Bayside Property Holdings Ltd of Bridgetown is letting a two-bedroom apartment in Worthing. The company's office manager has drafted the <b>lease</b> by hand and asks you to produce the final legal document on Legal-size paper, ready for signing, together with the <b>endorsement</b> (back sheet) that identifies the document when it is folded and filed. Legal documents must be exact: every name, date and amount must match the draft.</p>`,
    data: `<p><b>Manuscript draft</b> (signs shown in square brackets)</p>
<p>[uc, bold, centre] lease agreement</p>
<p>THIS LEASE is made on the first day of January Two thousand and twenty-six BETWEEN BAYSIDE PROPERTY HOLDINGS LTD of 14 Swan Street, Bridgetown, Barbados (hereinafter called 'the Lessor') of the one part AND MARCELLA ANNE RICHARDSON of 7 Rockley Main Road, Rockley, Barbados (hereinafter called 'the Lessee') of the other part.</p>
<p>NOW IT IS AGREED as follows:</p>
<p>1 &nbsp;PREMISES &ndash; The Lessor lets to the Lessee the two-bedroom [stet] unfurnished apartment known as Unit 3B, Harbour Heights, 19 Coast Rd, Worthing, Barbados (hereinafter called 'the Premises') inc the parking space no. 6.</p>
<p>2 &nbsp;TERM &ndash; The lease shall be for a term of twelve (12) mths beginning on 1 January 2026 &amp; ending on 31 December 2026.</p>
<p>3 &nbsp;RENT &ndash; The Lessee shall pay a monthly rent of BDS$1,450.00 (One thousand four hundred and fifty Barbados dollars) [trs] in advance on or before the first day of each calendar mth.</p>
<p>4 &nbsp;DEPOSIT &ndash; The Lessee shall pay a security deposit of BDS$2,900.00 (Two thousand nine hundred Barbados dollars) wh shall be returned within thirty (30) days of the end of the lease, less the cost of any damage to the Premises.</p>
<p>5 &nbsp;THE LESSEE AGREES:<br>5.1 &nbsp;to keep the Premises clean &amp; in good repair;<br>5.2 &nbsp;to pay all electricity, water and internet charges;<br>5.3 &nbsp;not to sublet the Premises without the written consent of the Lessor; and<br>5.4 &nbsp;to allow the Lessor to inspect the Premises on giving forty-eight (48) hours' notice.</p>
<p>[NP] 6 &nbsp;THE LESSOR AGREES to carry out all structural repairs to the roof, walls &amp; plumbing, &amp; to insure the building against fire and hurricane damage.</p>
<p>7 &nbsp;TERMINATION &ndash; Either party may end this lease by giving the other not less than two (2) mths' notice in writing.</p>
<p>IN WITNESS WHEREOF the parties have signed this Lease on the date first written above.</p>
<p>Signature blocks for: (a) for and on behalf of BAYSIDE PROPERTY HOLDINGS LTD &ndash; Director; (b) MARCELLA ANNE RICHARDSON &ndash; Lessee; each with a line for a Witness (name, signature, date).</p>
<p><b>Endorsement</b> (back sheet): DATED 1 January 2026 / BAYSIDE PROPERTY HOLDINGS LTD / and / MARCELLA ANNE RICHARDSON / LEASE / of Unit 3B, Harbour Heights, 19 Coast Road, Worthing / for a term of twelve months.</p>
<p><i>Note on [trs] in clause 3: the words 'in advance' must follow 'on or before the first day of each calendar month'.</i></p>`,
    tasks: [
      `Set the page size to <b>Legal</b> (21.6 cm x 35.6 cm), portrait, with a 3.8 cm left margin (for binding) and 2.54 cm top, bottom and right margins.`,
      `Use Times New Roman 12 pt with <b>double</b> line spacing for the body, and full justification.`,
      `Apply the heading sign: LEASE AGREEMENT in capitals, bold, 14 pt, centred.`,
      `Expand every abbreviation (Rd, inc, no., mths/mth, &amp;, wh) and apply [stet] (keep 'two-bedroom'), [trs] (see the note) and [NP].`,
      `Type the names of the parties in capitals and bold at their first mention. Keep the date in the opening paragraph written in words exactly as given.`,
      `Format clauses 1&ndash;7 using a multilevel numbered list (1, 1.1) with hanging indents, and indent sub-clauses 5.1&ndash;5.4 one level further. Do not let any clause heading be separated from its first line (Keep with next).`,
      `Insert page numbers centred in the footer in the form 'Page X of Y'.`,
      `Create the two signature blocks at the end, each with ruled lines for Signature, Name and Date, and a Witness section below. Keep each block together on one page.`,
      `Insert a page break and type the endorsement on the final page: rotate it by placing the text in a text box set to vertical text direction (or in a single-cell table) in the right half of the page, with each line centred and the word LEASE in bold 14 pt.`,
      `Proofread every figure and date against the draft (rent, deposit, term, notice period), then save as <b>S6W1_Lease_YourName.docx</b>.`
    ],
    skills: ['legal documents', 'manuscript signs', 'numbered clauses', 'Legal paper', 'endorsement', 'signature blocks'],
    check: [
      { c: 'Legal paper size, binding margin, double spacing and justification applied', m: 2 },
      { c: 'Parties named in full in capitals at first mention; date in words', m: 2 },
      { c: 'All abbreviations expanded and [stet], [trs], [NP] applied correctly', m: 3 },
      { c: 'Clauses and sub-clauses numbered with consistent hanging indents', m: 2 },
      { c: 'Signature blocks with witness lines, kept together', m: 2 },
      { c: 'Endorsement on a separate page, correctly worded and displayed', m: 2 },
      { c: 'Page X of Y numbering in footer', m: 1 },
      { c: 'Every name, date and amount (BDS$1,450.00; BDS$2,900.00; 12 months; 2 months) exactly correct', m: 2 }
    ],
    tip: `In legal work an error in a figure is not a small slip &ndash; it changes what the parties agreed. Always check the amount in figures against the amount in words.`
  },

  // ------------------------------------------------------------------
  {
    id: 'S6-W2',
    sec: 'S6',
    app: 'word',
    level: 'Challenge',
    title: 'Invoice template and monthly profit and loss statement',
    time: 65,
    brief: `<p>Sunset Celebrations Event Planning of Holetown (the business in your chapter's case study) wants to stop typing invoices from scratch. Build a reusable <b>invoice template</b>, use it to bill a wedding client, and then prepare the business's <b>profit and loss statement</b> for March 2026. Both are financial documents: figures must be right-aligned on the decimal point and every total must be correct.</p>`,
    data: `<p><b>Business details:</b> SUNSET CELEBRATIONS EVENT PLANNING, 31 Airport Road, Holetown, Barbados &middot; Tel +1 (246) 545 3108 &middot; hello@sunsetcelebrations.bb</p>
<p><b>Invoice details:</b> Invoice No. SC-0417 &middot; Date: 16 March 2026 &middot; Bill to: Mrs. Monique Baptiste, 3 Oistins Road, Oistins, Barbados &middot; Event: Wedding reception, Speightstown beach, 4 April 2026 &middot; Terms: balance due 14 days from invoice date.</p>
<table style="border:1px solid #999"><thead><tr><th>Qty</th><th>Description</th><th>Unit price US$</th><th>Amount US$</th></tr></thead><tbody>
<tr><td>1</td><td>Beach venue decoration and set-up</td><td style="text-align:right">1,850.00</td><td style="text-align:right">1,850.00</td></tr>
<tr><td>120</td><td>Chair covers with sashes</td><td style="text-align:right">4.50</td><td style="text-align:right">540.00</td></tr>
<tr><td>12</td><td>Table centrepieces</td><td style="text-align:right">65.00</td><td style="text-align:right">780.00</td></tr>
<tr><td>5</td><td>Sound system and DJ (per hour)</td><td style="text-align:right">150.00</td><td style="text-align:right">750.00</td></tr>
<tr><td>120</td><td>Printed programmes</td><td style="text-align:right">2.25</td><td style="text-align:right">270.00</td></tr>
<tr><td colspan="3"><b>Subtotal</b></td><td style="text-align:right">4,190.00</td></tr>
<tr><td colspan="3">Turnover tax (TOT) 5%</td><td style="text-align:right">209.50</td></tr>
<tr><td colspan="3"><b>Total</b></td><td style="text-align:right">4,399.50</td></tr>
<tr><td colspan="3">Less deposit received 6 March 2026 (Receipt R-2603)</td><td style="text-align:right">2,000.00</td></tr>
<tr><td colspan="3"><b>Balance due</b></td><td style="text-align:right">2,399.50</td></tr>
</tbody></table>
<p><b>Profit and loss figures, month ended 31 March 2026 (US$)</b></p>
<p>Income: Event package sales 18,450.00; Consultation fees 1,200.00; Equipment rental 2,350.00.<br>Expenses: Rent 2,500.00; Wages and salaries 7,800.00; Florist and decor suppliers 4,260.00; Advertising 650.00; Electricity and water 540.00; Telephone and internet 310.00; Transport 425.00.</p>`,
    tasks: [
      `<b>Template:</b> on Letter-size portrait paper with 2 cm margins, create a heading with the business name in bold 18 pt and the contact details in 9 pt, followed by the word INVOICE in bold capitals, right-aligned, 20 pt.`,
      `Insert placeholder text in square brackets for Invoice No., Date, Bill to and Event (for example [Invoice No.]) and a 4-column table (Qty, Description, Unit price US$, Amount US$) with a bold, shaded header row and eight empty item rows, plus Subtotal, TOT 5%, Total, Less deposit and Balance due rows.`,
      `Right-align the two money columns, set a decimal tab inside them so the decimal points line up, and apply a top border and double bottom border to the Balance due row only.`,
      `Add a footer: 'Payment by bank transfer or card. Thank you for choosing Sunset Celebrations.' in 9 pt italic. Save as a Word template named <b>SC_Invoice.dotx</b>.`,
      `<b>Invoice:</b> open a new document from the template, replace every placeholder with the details given and enter the five items. Delete the unused item rows.`,
      `Enter the Subtotal, TOT, Total, deposit and Balance due figures. Check each line amount (Qty x Unit price) and each total with a calculator before saving as <b>S6W2_Invoice_SC0417_YourName.docx</b>.`,
      `<b>Profit and loss statement:</b> in a new document, centre the heading SUNSET CELEBRATIONS EVENT PLANNING / PROFIT AND LOSS STATEMENT / FOR THE MONTH ENDED 31 MARCH 2026 in bold capitals.`,
      `Set out the statement in an unruled 3-column layout (description, inner column, outer column): list each income item in the inner column with Total income (US$22,000.00) in the outer column; then each expense in the inner column with Total expenses (US$16,485.00) in the outer column.`,
      `Show NET PROFIT (US$5,515.00) in bold in the outer column, with a single rule above and a double rule below. Use the US$ sign only at the top of each money column.`,
      `Save as <b>S6W2_ProfitLoss_Mar2026_YourName.docx</b>.`
    ],
    skills: ['templates', 'invoices', 'profit and loss statement', 'decimal tabs', 'tables', 'borders'],
    check: [
      { c: 'Template saved as .dotx with headings, placeholders, table structure and footer', m: 3 },
      { c: 'Invoice completed from the template with all placeholders replaced and details correct', m: 2 },
      { c: 'Invoice line amounts and totals all correct (Subtotal 4,190.00; TOT 209.50; Total 4,399.50; Balance 2,399.50)', m: 3 },
      { c: 'Money columns right/decimal-aligned; totals distinguished with borders and bold', m: 2 },
      { c: 'Profit and loss heading complete (name, title, period) and centred', m: 2 },
      { c: 'Income and expense items in the inner column with totals in the outer column', m: 3 },
      { c: 'Net profit US$5,515.00 correct, bold, single rule above and double rule below', m: 2 },
      { c: 'Currency sign used consistently; no typing errors', m: 1 }
    ],
    tip: `Totals in an invoice or statement are always marked off: a single line before a total and a double line under the final figure. Markers look for this every time.`
  },

  // ------------------------------------------------------------------
  {
    id: 'S6-D1',
    sec: 'S6',
    app: 'access',
    level: 'Core',
    title: 'Receipts register: tracking source documents in a database',
    time: 50,
    brief: `<p>Every payment Sunset Celebrations Event Planning receives is confirmed with a numbered <b>receipt</b> &ndash; a source document. The owner wants the March 2026 receipts held in a database so that she can find any receipt quickly, check payments by method, and give her accountant a report with totals that will later feed the profit and loss statement.</p>`,
    data: `<p><b>Table name:</b> tblReceipts &nbsp; <b>Primary key:</b> ReceiptNo</p>
<table style="border:1px solid #999"><thead><tr><th>Field name</th><th>Data type</th><th>Notes</th></tr></thead><tbody>
<tr><td>ReceiptNo</td><td>Short Text (6)</td><td>Primary key</td></tr>
<tr><td>DateIssued</td><td>Date/Time</td><td>Short Date (dd/mm/yyyy)</td></tr>
<tr><td>Client</td><td>Short Text (30)</td><td>Surname, initial</td></tr>
<tr><td>District</td><td>Short Text (20)</td><td></td></tr>
<tr><td>Description</td><td>Short Text (40)</td><td></td></tr>
<tr><td>Amount</td><td>Currency</td><td>US$, 2 decimal places</td></tr>
<tr><td>PaymentMethod</td><td>Short Text (15)</td><td>Lookup list: Cash; Card; Bank transfer</td></tr>
</tbody></table>
<p><b>Records</b></p>
<table style="border:1px solid #999"><thead><tr><th>ReceiptNo</th><th>DateIssued</th><th>Client</th><th>District</th><th>Description</th><th>Amount</th><th>PaymentMethod</th></tr></thead><tbody>
<tr><td>R-2601</td><td>02/03/2026</td><td>Carty, J.</td><td>Gros Islet</td><td>Wedding consultation</td><td style="text-align:right">150.00</td><td>Cash</td></tr>
<tr><td>R-2602</td><td>04/03/2026</td><td>Hodge, R.</td><td>Rodney Bay</td><td>Anniversary dinner set-up</td><td style="text-align:right">1,275.00</td><td>Card</td></tr>
<tr><td>R-2603</td><td>06/03/2026</td><td>Baptiste, M.</td><td>Soufrière</td><td>Wedding package deposit</td><td style="text-align:right">2,000.00</td><td>Bank transfer</td></tr>
<tr><td>R-2604</td><td>09/03/2026</td><td>Wathey, N.</td><td>Vieux Fort</td><td>Chair and tent rental</td><td style="text-align:right">480.00</td><td>Cash</td></tr>
<tr><td>R-2605</td><td>11/03/2026</td><td>Gumbs, S.</td><td>Castries</td><td>Birthday party package</td><td style="text-align:right">1,640.00</td><td>Card</td></tr>
<tr><td>R-2606</td><td>13/03/2026</td><td>Peterson, A.</td><td>Marigot Bay</td><td>Christening decor</td><td style="text-align:right">395.00</td><td>Card</td></tr>
<tr><td>R-2607</td><td>16/03/2026</td><td>Fleming, O.</td><td>Castries</td><td>Corporate dinner balance</td><td style="text-align:right">3,150.00</td><td>Bank transfer</td></tr>
<tr><td>R-2608</td><td>19/03/2026</td><td>Lake, Y.</td><td>Gros Islet</td><td>Sound system hire</td><td style="text-align:right">300.00</td><td>Cash</td></tr>
<tr><td>R-2609</td><td>23/03/2026</td><td>Baptiste, M.</td><td>Soufrière</td><td>Wedding package balance</td><td style="text-align:right">2,399.50</td><td>Bank transfer</td></tr>
<tr><td>R-2610</td><td>27/03/2026</td><td>Richardson, C.</td><td>Rodney Bay</td><td>Graduation party set-up</td><td style="text-align:right">860.00</td><td>Card</td></tr>
</tbody></table>`,
    tasks: [
      `Create a blank database named <b>S6D1_Receipts_YourName.accdb</b>.`,
      `Create <b>tblReceipts</b> in Design View with the field names, data types and sizes shown; set ReceiptNo as the primary key and Amount as Currency with 2 decimal places.`,
      `Use the Lookup Wizard on PaymentMethod to create a value list containing Cash, Card and Bank transfer, and set Limit To List to Yes.`,
      `Set a Validation Rule on Amount of <b>&gt;0</b> with the Validation Text 'Amount must be greater than zero'.`,
      `Enter all 10 records accurately, then create a simple form <b>frmReceipts</b> and use it to check that you can move through every record.`,
      `<b>Simple query:</b> create <b>qryCardPayments</b> showing ReceiptNo, DateIssued, Client and Amount for all receipts where PaymentMethod is Card, sorted by DateIssued ascending. (4 records)`,
      `<b>Two-criteria query:</b> create <b>qryLargeTransfers</b> showing ReceiptNo, Client, Description and Amount where PaymentMethod is Bank transfer <b>AND</b> Amount is greater than 2,000.00. (2 records &ndash; note that R-2603 for exactly 2,000.00 is NOT included)`,
      `Create a third query <b>qryBaptiste</b> that finds all receipts for the client Baptiste, M. and add a Total row that sums the Amount. (2 records, total US$4,399.50 &ndash; matching invoice SC-0417)`,
      `Create a report <b>rptReceiptsByMethod</b> grouped by PaymentMethod, sorted by ReceiptNo within each group, showing ReceiptNo, DateIssued, Client and Amount, with a Sum of Amount for each group and a grand total. Title: 'Sunset Celebrations &ndash; Receipts, March 2026'.`,
      `Switch the report to landscape if any field is cut off, and check the totals: Bank transfer US$7,549.50; Card US$4,170.00; Cash US$930.00; grand total US$12,649.50.`
    ],
    skills: ['table design', 'lookup lists', 'validation', 'queries', 'totals', 'grouped reports'],
    check: [
      { c: 'Table structure: correct field names, data types, sizes and primary key', m: 3 },
      { c: 'Lookup list and validation rule set correctly', m: 2 },
      { c: 'All 10 records entered accurately; form created', m: 2 },
      { c: 'qryCardPayments returns 4 records, correctly sorted', m: 2 },
      { c: 'qryLargeTransfers uses both criteria and returns R-2607 and R-2609 only', m: 3 },
      { c: 'qryBaptiste total of US$4,399.50 shown', m: 1 },
      { c: 'Grouped report with title, group sums and correct grand total of US$12,649.50', m: 3 }
    ],
    tip: `Watch the difference between &gt; and &gt;= in criteria: 'greater than 2,000' leaves out a receipt for exactly 2,000.00. Examiners often build a record on the boundary to test this.`
  },

  // ------------------------------------------------------------------
  {
    id: 'S6-P1',
    sec: 'S6',
    app: 'ppt',
    level: 'Core',
    title: 'Conference trip briefing: itinerary, organisation chart, budget graph and flow chart',
    time: 55,
    brief: `<p>Three teachers from the Business &amp; Technology Studies Department are travelling to the Caribbean Business Educators' Conference in Bridgetown, Barbados. The Head of Department wants a briefing presentation for the staff meeting that shows the travel <b>itinerary</b>, who reports to whom on the trip (<b>organisation chart</b>), the approved budget as a <b>graph</b>, and the procedure for claiming expenses (<b>flow chart</b>) &ndash; all advanced displays.</p>`,
    data: `<p><b>Slide content</b></p>
<ol>
<li><b>Title:</b> Caribbean Business Educators' Conference 2026 &ndash; Delegation Briefing. Subtitle: Bridgetown, Barbados &middot; 8&ndash;11 June 2026 &middot; Business &amp; Technology Studies Department.</li>
<li><b>Delegation (organisation chart):</b> Head of Department, Mrs. Carmen Gumbs (top) &rarr; Delegation Leader, Mr. Trevor Hughes &rarr; two delegates: Ms. Renée Brooks (EDPM) and Mr. Kevin Fleming (Principles of Business).</li>
<li><b>Itinerary &ndash; Monday 8 June 2026:</b> 10.45 am check in at Maurice Bishop International Airport (GND) &middot; 12.40 pm depart GND, Flight CB 214 &middot; 3.05 pm arrive Grantley Adams International Airport (BGI), Barbados &middot; 4.30 pm check in, Coral Sands Business Hotel, Bridgetown &middot; 7.00 pm welcome reception.</li>
<li><b>Itinerary &ndash; Tuesday 9 and Wednesday 10 June 2026:</b> 8.00 am registration (Tuesday only) &middot; 8.30 am to 4.30 pm conference sessions &middot; Tuesday 2.00 pm Ms. Brooks presents 'Teaching Mail Merge with Real Data' &middot; Wednesday 7.30 pm closing dinner.</li>
<li><b>Itinerary &ndash; Thursday 11 June 2026:</b> 10.00 am check out &middot; 11.30 am depart hotel for BGI &middot; 2.15 pm depart BGI, Flight CB 215 &middot; 4.35 pm arrive GND.</li>
<li><b>Approved budget (US$) &ndash; column chart:</b> Airfare (3 x 485.00) 1,455.00; Hotel (2 rooms x 3 nights x 189.00) 1,134.00; Conference fees (3 x 250.00) 750.00; Meal allowance (3 people x 3 days x 45.00) 405.00; Ground transport 220.00; Total 3,964.00.</li>
<li><b>Claiming expenses (flow chart):</b> Start &rarr; Keep every receipt &rarr; Complete the expense claim form within 5 working days of return &rarr; Decision: Are all receipts attached? &mdash; No: obtain copies, then return to the form; Yes: submit to Head of Department &rarr; Head of Department approves &rarr; Bursar pays by bank transfer &rarr; End.</li>
<li><b>Contacts and questions:</b> Delegation Leader: +1 (473) 586 4412 &middot; Hotel: +1 (246) 430 7780 &middot; Questions?</li>
</ol>`,
    tasks: [
      `Create an 8-slide presentation with a single design theme; set the slide size to Widescreen (16:9).`,
      `On slide 2, insert a <b>SmartArt Hierarchy</b> organisation chart with three levels exactly as given (one box per person, name and role on separate lines).`,
      `On slides 3&ndash;5, present the itinerary in a 2-column table (Time, Activity), with times right-aligned in the first column and a bold header row; use the same table style on all three slides.`,
      `On slide 6, insert a clustered column chart using the five budget items (not the total). Add the chart title 'Approved Budget (US$) &ndash; Total US$3,964.00', data labels on each column, and remove the legend.`,
      `In the speaker notes for slide 6, explain in two sentences whether this chart is <b>embedded</b> or <b>linked</b>, and why an embedded chart is suitable for an approved (fixed) budget.`,
      `On slide 7, build the flow chart with the correct flow-chart shapes: terminator (oval) for Start/End, process rectangles, and a decision diamond with Yes/No labelled connector arrows, including the loop back for 'No'.`,
      `Apply the <b>Push</b> transition (From Right) to all slides, duration 0.75 seconds.`,
      `Animate the flow-chart shapes on slide 7 with the <b>Wipe</b> entrance effect so they appear one at a time in process order, After Previous with a 0.5-second delay.`,
      `Add speaker notes to slides 1, 3 and 7, slide numbers on all slides except the title slide, and the footer 'Staff briefing &ndash; 29 May 2026'.`,
      `Save as <b>S6P1_ConferenceBriefing_YourName.pptx</b> and also export a Handouts (3 slides per page) PDF.`
    ],
    skills: ['organisation charts', 'flow charts', 'charts', 'itinerary tables', 'transitions', 'animation'],
    check: [
      { c: 'Organisation chart with three correct levels and all names/roles accurate', m: 2 },
      { c: 'Itinerary tables complete, accurate and consistently formatted across slides 3–5', m: 3 },
      { c: 'Column chart with correct data (1,455; 1,134; 750; 405; 220), title, data labels and no legend', m: 3 },
      { c: 'Speaker note correctly distinguishes embedded and linked graphs', m: 1 },
      { c: 'Flow chart uses correct shapes, labelled Yes/No connectors and the loop back', m: 3 },
      { c: 'Push transition on all slides; Wipe animation in correct order on slide 7', m: 2 },
      { c: 'Slide numbers, footer, speaker notes and handout PDF as instructed', m: 2 }
    ],
    tip: `In a flow chart every decision diamond needs two labelled exits (Yes and No). A diamond with one arrow out is the most common error in student work.`
  },

  // ------------------------------------------------------------------
  {
    id: 'S6-B1',
    sec: 'S6',
    app: 'pub',
    level: 'Starter',
    title: 'Restaurant menu: a simple display',
    time: 40,
    brief: `<p>The Caroni Swamp Caf&eacute;, a small restaurant on Frederick Street, Port of Spain, wants a new one-page lunch menu to place on its tables. The owner wants it clean and easy to read, with the dishes grouped under headings and the prices lined up neatly on the right.</p>`,
    data: `<p><b>Menu text</b></p>
<p>THE CARONI SWAMP CAF&Eacute;<br>Lunch Menu &middot; Served daily 11.30 am &ndash; 3.00 pm<br>45 Frederick Street, Port of Spain &middot; Tel +1 (868) 542 6619</p>
<p><b>STARTERS</b><br>Saltfish fritters with sweet chilli dip &ndash; US$8.50<br>Pumpkin soup with fresh bread &ndash; US$7.00<br>Conch salad with lime and herbs &ndash; US$11.00</p>
<p><b>MAINS</b><br>Grilled red snapper with rice and peas &ndash; US$24.00<br>Stewed chicken with johnny cakes &ndash; US$18.50<br>Goat water with dumplings &ndash; US$17.00<br>Vegetable callaloo with plantain &ndash; US$15.50</p>
<p><b>DESSERTS</b><br>Guava cheesecake &ndash; US$7.50<br>Coconut tart &ndash; US$6.00</p>
<p><b>DRINKS</b><br>Fresh passion fruit juice &ndash; US$4.50<br>Pommecythere punch (non-alcoholic) &ndash; US$5.00<br>Bottled water &ndash; US$2.50</p>
<p>Footer: Prices include service. Please tell your server about any food allergies.</p>`,
    tasks: [
      `Create a blank A4 portrait publication with 1.5 cm margins on all sides.`,
      `Insert WordArt (or a text box with a decorative font) for THE CARONI SWAMP CAF&Eacute;, centred at the top, 36 pt, in a single dark colour. Below it, centre the serving times and the address line in 11 pt.`,
      `Insert a simple, relevant clip art or picture (for example a palm tree or plate) no wider than 4 cm, centred under the heading, with Square text wrapping.`,
      `Create one text box for the menu body. Format each category heading (STARTERS, MAINS, DESSERTS, DRINKS) in bold capitals, 16 pt, centred, with 12 pt spacing before.`,
      `Type each dish on its own line in 12 pt. Set a <b>right tab with dot leaders</b> at the right edge of the text box so that every price lines up at the right with dots leading to it (remove the dashes shown in the draft).`,
      `Centre the whole menu vertically on the page so the white space above and below is balanced.`,
      `Apply a decorative page border (Borders &amp; Accents) in a colour that matches the heading, and place the footer text centred in 9 pt italic at the bottom.`,
      `Proofread all dish names and prices, then save as <b>S6B1_Menu_YourName.pub</b> and export as PDF.`
    ],
    skills: ['simple displays', 'WordArt', 'dot leader tabs', 'centring', 'borders', 'pictures'],
    check: [
      { c: 'Heading displayed with WordArt/decorative font, centred, with address and times beneath', m: 2 },
      { c: 'Category headings consistently formatted with spacing before', m: 2 },
      { c: 'Prices aligned on a right tab with dot leaders', m: 3 },
      { c: 'Menu balanced horizontally and vertically on the page', m: 2 },
      { c: 'Picture sized and wrapped correctly; border applied', m: 2 },
      { c: 'All 12 dishes and prices typed accurately; footer included', m: 2 }
    ],
    tip: `A right tab with dot leaders is the professional way to line up prices; using the space bar to push prices across will never align on screen and print.`
  }
]);
