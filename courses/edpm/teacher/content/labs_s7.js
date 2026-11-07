// EDPM · Practical labs · Section VII: Electronic Communication
// Developed by Kester Small
window.EDPM_LABS = (window.EDPM_LABS || []).concat([
{
  id: 'S7-W1',
  sec: 'S7',
  app: 'word',
  level: 'Core',
  title: 'Netiquette guidelines for staff',
  time: 40,
  brief: `<p>Mrs Natalie Brooks, Office Manager at <b>English Harbour Travel Services Ltd</b>, Market Street, English Harbour, has noticed that some staff e-mails to clients have been sent in capital letters, with vague subject lines and the wrong attachments. She has handwritten a draft set of netiquette guidelines and asks you to key it in as a clean, one-page staff notice to be placed on the staff notice board and e-mailed to all staff.</p><p>The draft contains manuscript correction signs (shown in square brackets) and abbreviations. Make every correction and expand every abbreviation as you key in.</p>`,
  data: `<p style="text-align:center"><b>netiquette guidelines for all staff [uc]</b></p>
<p>Every e-mail we send represents the co. Clients cannot hear yr tone of voice or see yr face, so the words on the screen must do all the work. Please follow these guidelines for all bus. corresp. sent from an English Harbour Travel Services account. [NP] Messages can be forwarded, copied or made public far beyond the person you wrote to, so write every e-mail as if the client's manager might read it.</p>
<p><b>Before you send</b></p>
<ol>
<li>Write a clear, specific subject line, e.g. "Booking ref. SBT-2291: flight times confirmed". A vague subject line such as "Hi" or "Info" shd never be used.</li>
<li>Check the To, Bcc and Cc [trs] fields. Use Bcc when you e-mail a group of clients who do not know one another.</li>
<li>Do not type in capital letters. Capitals are read as shouting.</li>
<li>Proofread the message <del>carefully</del> [stet] and check that the correct attachment is included before you click Send.</li>
</ol>
<p><b>Keeping information safe</b></p>
<ol start="5">
<li>Never send passport numbers or credit card details by ordinary e-mail. Use the secure client portal where necy.</li>
<li>Do not open links or attachments from unknown senders. Report suspicious messages to the IT dept immed.</li>
</ol>
<p><b>Responding to clients</b></p>
<ol start="7">
<li>Acknowledge every client e-mail within one working day, even if a full reply will take longer. [run on] Where poss., give the client a date by which they will receive a full reply.</li>
<li>Where a message is urgent, follow it up with a telephone call to confirm that it has been recd.</li>
</ol>
<p>Thank you for helping us to communicate professionally. Any questions shd be directed to the Office Manager.</p>
<p>Natalie Brooks<br>Office Manager<br>12 March 2026</p>
<p><small>Abbreviations: co. = company; yr = your; bus. = business; corresp. = correspondence; shd = should; necy = necessary; dept = Department; immed. = immediately; poss. = possible; recd = received. In item 2, [trs] means transpose the words Bcc and Cc so that it reads "Check the To, Cc and Bcc fields". In item 4, [stet] means let it stand: key in the crossed-out word "carefully".</small></p>`,
  tasks: [
    `Open a new blank document and set all four margins to <b>2.54 cm (1 inch)</b>, A4 portrait.`,
    `Key in the draft, making every correction shown by the signs in square brackets and expanding every abbreviation in full (e.g. <i>co.</i> becomes <i>company</i>).`,
    `Format the heading in <b>bold, capitals, Arial 14 pt, centred</b>, as instructed by [uc]. Leave one clear line space after it.`,
    `Set the body text in <b>Arial 11 pt</b>, fully justified, with <b>1.15 line spacing</b> and 6 pt spacing after each paragraph.`,
    `Start a new paragraph where [NP] appears and join the two paragraphs where [run on] appears in item 7.`,
    `Format the three side headings (<i>Before you send</i>, <i>Keeping information safe</i>, <i>Responding to clients</i>) in bold and underline. Use one continuous numbered list (1 to 8) for the guidelines, with a hanging indent of 0.63 cm.`,
    `Insert a header containing <b>English Harbour Travel Services Ltd</b> at the left and <b>Staff Notice</b> at the right, Arial 9 pt.`,
    `Insert a footer with the file name at the left and <b>Page 1 of 1</b> (using page number fields) at the right.`,
    `Run the spelling and grammar check, then proofread against the draft. The document must fit on ONE page.`,
    `Save the document as <b>S7W1_Netiquette_YourName</b> and print one copy.`
  ],
  skills: ['manuscript signs', 'abbreviations', 'numbered lists', 'headers and footers', 'line spacing'],
  check: [
    { c: 'All abbreviations expanded correctly (10 abbreviations)', m: 3 },
    { c: 'Manuscript signs applied: [uc], [NP], [run on], [trs], [stet]', m: 3 },
    { c: 'Margins 2.54 cm; Arial 11 pt body, justified, 1.15 spacing', m: 2 },
    { c: 'Heading bold capitals 14 pt centred; side headings bold underlined', m: 2 },
    { c: 'Continuous numbered list 1 to 8 with hanging indent', m: 2 },
    { c: 'Header and footer correct, including page number fields', m: 2 },
    { c: 'Accurate keying, fits on one page, saved with correct name', m: 2 }
  ],
  tip: `Examiners deduct for every unexpanded abbreviation, so tick each one off the key in the draft as you expand it.`
},
{
  id: 'S7-W2',
  sec: 'S7',
  app: 'word',
  level: 'Starter',
  title: 'E-mail features quick-reference card',
  time: 30,
  brief: `<p>The Human Resources Officer at <b>Frigate Bay Marine Supplies Ltd</b>, 41 Fort Street, Basseterre, is preparing an induction pack for three new office assistants. She wants a one-page quick-reference card that explains the main e-mail features, so that new staff use To, Cc and Bcc correctly from their first day. You will set out the information in a ruled table.</p>`,
  data: `<p><b>Title:</b> USING E-MAIL FEATURES CORRECTLY</p>
<p><b>Sub-title:</b> Quick-reference card for new staff</p>
<table style="border:1px solid">
<thead><tr><th>Feature</th><th>What it does</th><th>Example at Frigate Bay Marine Supplies</th></tr></thead>
<tbody>
<tr><td>To</td><td>Names the main recipient who is expected to read and act on the message.</td><td>Sending a price quotation to the client who requested it.</td></tr>
<tr><td>Cc (Carbon copy)</td><td>Sends a copy to people who should be kept informed but are not expected to act. Everyone can see who received it.</td><td>Copying the Sales Manager on the quotation.</td></tr>
<tr><td>Bcc (Blind carbon copy)</td><td>Sends a copy without showing that recipient's address to anyone else.</td><td>Announcing the Easter sale to 60 boat owners who do not know one another.</td></tr>
<tr><td>Subject line</td><td>Gives a short, specific summary so the reader understands the purpose at a glance and can find it later.</td><td>"Quotation Q-1187: 20 life jackets, valid to 30 April 2026"</td></tr>
<tr><td>Attachments</td><td>Sends files such as documents, spreadsheets or images along with the message.</td><td>Attaching the signed delivery note as a PDF file.</td></tr>
</tbody>
</table>
<p><b>Footnote below the table:</b> Always check the recipients and the attachment before you click Send. A message cannot always be recalled.</p>`,
  tasks: [
    `Set the page to A4 <b>landscape</b> with 2 cm margins all round.`,
    `Key in the title in <b>Calibri 16 pt, bold, capitals, centred</b>, and the sub-title in Calibri 12 pt italic, centred.`,
    `Insert a table of <b>3 columns and 6 rows</b> and key in the data exactly as shown.`,
    `Set the column widths to approximately <b>5 cm, 10 cm and 10 cm</b>.`,
    `Format the header row in bold, centred, with 15% grey shading, and set it to <b>repeat as a header row</b>.`,
    `Set all table text to Calibri 11 pt, align the first column vertically centred, and apply <b>all borders</b> (0.5 pt single line).`,
    `Key in the footnote one clear line space below the table, in Calibri 10 pt bold.`,
    `Save the document as <b>S7W2_EmailFeatures_YourName</b> and print one copy.`
  ],
  skills: ['tables', 'page orientation', 'shading', 'column widths', 'borders'],
  check: [
    { c: 'Landscape orientation with 2 cm margins', m: 2 },
    { c: 'Title and sub-title formatted and centred as instructed', m: 2 },
    { c: 'Table 3 x 6 with all data keyed accurately', m: 3 },
    { c: 'Column widths set; header row bold, centred, shaded', m: 2 },
    { c: 'All borders applied; consistent 11 pt text', m: 2 },
    { c: 'Footnote placed and formatted; saved with correct name', m: 1 }
  ],
  tip: `In the exam, a ruled table means every cell has a border; leave none of the lines out.`
},
{
  id: 'S7-D1',
  sec: 'S7',
  app: 'access',
  level: 'Challenge',
  title: 'Inbox log database',
  time: 60,
  brief: `<p>The office administrator at <b>Montego Bay Marine Supplies Ltd</b>, Kingston, receives many e-mails each day from clients, suppliers and staff. Some important messages have been forgotten. The General Manager wants a database that logs every incoming e-mail so that messages can be sorted by date, by sender and by subject, and so that high-priority messages that have not been answered can be found at once.</p>`,
  data: `<p><b>Database name:</b> InboxLog_YourName &nbsp; <b>Table name:</b> tblMessages</p>
<table style="border:1px solid">
<thead><tr><th>Field name</th><th>Data type</th><th>Field size / format</th></tr></thead>
<tbody>
<tr><td>MsgID (primary key)</td><td>Short Text</td><td>4</td></tr>
<tr><td>DateReceived</td><td>Date/Time</td><td>Short Date</td></tr>
<tr><td>SenderName</td><td>Short Text</td><td>30</td></tr>
<tr><td>SenderEmail</td><td>Short Text</td><td>40</td></tr>
<tr><td>Category</td><td>Short Text</td><td>10 (Client, Supplier or Staff)</td></tr>
<tr><td>Subject</td><td>Short Text</td><td>60</td></tr>
<tr><td>Priority</td><td>Short Text</td><td>6 (High, Normal or Low)</td></tr>
<tr><td>Attachment</td><td>Yes/No</td><td>Yes/No</td></tr>
<tr><td>Replied</td><td>Yes/No</td><td>Yes/No</td></tr>
</tbody>
</table>
<p><b>Records</b></p>
<table style="border:1px solid">
<thead><tr><th>MsgID</th><th>DateReceived</th><th>SenderName</th><th>SenderEmail</th><th>Category</th><th>Subject</th><th>Priority</th><th>Attachment</th><th>Replied</th></tr></thead>
<tbody>
<tr><td>M001</td><td>2 March 2026</td><td>Andre Richardson</td><td>a.richardson@negrilyachtcharters.jm</td><td>Client</td><td>Quote request: 20 life jackets</td><td>High</td><td>Yes</td><td>No</td></tr>
<tr><td>M002</td><td>2 March 2026</td><td>Marisol Fleming</td><td>m.fleming@mandevilleropeworks.jm</td><td>Supplier</td><td>Invoice 4471 for February deliveries</td><td>Normal</td><td>Yes</td><td>Yes</td></tr>
<tr><td>M003</td><td>3 March 2026</td><td>Devon Hodge</td><td>d.hodge@montegobaymarine.jm</td><td>Staff</td><td>Staff meeting moved to Friday 6 March</td><td>Normal</td><td>No</td><td>Yes</td></tr>
<tr><td>M004</td><td>4 March 2026</td><td>Claudette Arrindell</td><td>c.arrindell@portantonioboatworks.jm</td><td>Client</td><td>Complaint: late delivery of anchor chain</td><td>High</td><td>No</td><td>No</td></tr>
<tr><td>M005</td><td>5 March 2026</td><td>Ravi Mahabir</td><td>r.mahabir@caribmarinepaints.jm</td><td>Supplier</td><td>New price list for marine paint, April 2026</td><td>Low</td><td>Yes</td><td>No</td></tr>
<tr><td>M006</td><td>6 March 2026</td><td>Shanice Lake</td><td>s.lake@montegobaymarine.jm</td><td>Staff</td><td>Leave request: 16 to 20 March</td><td>Normal</td><td>Yes</td><td>No</td></tr>
<tr><td>M007</td><td>9 March 2026</td><td>Andre Richardson</td><td>a.richardson@negrilyachtcharters.jm</td><td>Client</td><td>Re: Quote request: 20 life jackets</td><td>Normal</td><td>No</td><td>Yes</td></tr>
<tr><td>M008</td><td>10 March 2026</td><td>Marisol Fleming</td><td>m.fleming@mandevilleropeworks.jm</td><td>Supplier</td><td>Delivery delayed: rope and fenders</td><td>High</td><td>No</td><td>No</td></tr>
<tr><td>M009</td><td>11 March 2026</td><td>Jerome Gumbs</td><td>j.gumbs@ochoriosdivecentre.jm</td><td>Client</td><td>Order confirmation: 4 dive tanks</td><td>Normal</td><td>Yes</td><td>Yes</td></tr>
<tr><td>M010</td><td>12 March 2026</td><td>Devon Hodge</td><td>d.hodge@montegobaymarine.jm</td><td>Staff</td><td>Fire drill on 18 March</td><td>Low</td><td>No</td><td>No</td></tr>
</tbody>
</table>`,
  tasks: [
    `Create a new blank database named <b>InboxLog_YourName</b>.`,
    `In Design View, create <b>tblMessages</b> with the field names, data types and field sizes given. Set <b>MsgID</b> as the primary key.`,
    `Add a validation rule to <b>Priority</b>: <i>"High" Or "Normal" Or "Low"</i>, with the validation text <i>Enter High, Normal or Low</i>.`,
    `Enter all 10 records accurately in Datasheet View. Adjust column widths so that all data is visible, then print the table in landscape.`,
    `Sort the datasheet by <b>SenderName</b> (ascending), then by <b>DateReceived</b> (ascending) and print it. This shows sorting mail <i>by sender</i>.`,
    `Create a simple query <b>qrySuppliers</b> showing MsgID, DateReceived, SenderName and Subject for all messages where <b>Category = "Supplier"</b>. Run and print it (3 records).`,
    `Create a query <b>qryUrgentUnanswered</b> showing MsgID, DateReceived, SenderName, Subject and Priority where <b>Priority = "High" AND Replied = No</b>, sorted by DateReceived ascending. Run and print it (3 records).`,
    `Create a query <b>qrySubjectQuote</b> that finds every message whose Subject contains the word <i>quote</i> (criterion <i>Like "*quote*"</i>). Run it (2 records). This shows sorting mail <i>by subject</i>.`,
    `Create a report <b>rptInboxByCategory</b> based on tblMessages, showing DateReceived, SenderName, Subject, Priority and Replied, <b>grouped by Category</b> and sorted by DateReceived. Add the title <i>Montego Bay Marine Supplies Ltd · Inbox Log, March 2026</i> and a count of messages in each group.`,
    `Print the report in landscape orientation and close the database.`
  ],
  skills: ['table design', 'primary key', 'validation rule', 'queries', 'two-criteria query', 'grouped report'],
  check: [
    { c: 'Table designed with correct field names, data types and sizes; MsgID primary key', m: 3 },
    { c: 'Validation rule and validation text on Priority', m: 1 },
    { c: 'All 10 records entered accurately', m: 3 },
    { c: 'Datasheet sorted by SenderName then DateReceived', m: 1 },
    { c: 'qrySuppliers returns the 3 supplier messages with the fields requested', m: 2 },
    { c: 'qryUrgentUnanswered uses both criteria and returns M001, M004, M008', m: 3 },
    { c: 'qrySubjectQuote uses a wildcard criterion and returns M001, M007', m: 1 },
    { c: 'Report grouped by Category (Client 4, Staff 3, Supplier 3), titled, with counts', m: 4 }
  ],
  tip: `For a Yes/No field, type No (without quotation marks) in the criteria row; typing "No" in quotes causes a data type mismatch.`
},
{
  id: 'S7-P1',
  sec: 'S7',
  app: 'ppt',
  level: 'Core',
  title: 'Choosing the right communication medium',
  time: 45,
  brief: `<p>The Operations Manager of <b>Basseterre Freight &amp; Courier Ltd</b>, Bay Road, is running a short training session for customer service staff. Staff often send every message by e-mail, even when a call or a face-to-face meeting would be better. Prepare a seven-slide presentation on the factors to consider when selecting a communication medium, to be shown on Thursday 19 March 2026.</p>`,
  data: `<p><b>Slide 1 (Title slide)</b><br>Title: Choosing the Right Communication Medium<br>Sub-title: Customer Service Training · Basseterre Freight &amp; Courier Ltd · 19 March 2026</p>
<p><b>Slide 2 · Why the medium matters</b><br>&bull; Not every message should be sent the same way<br>&bull; The wrong medium can delay, confuse or offend<br>&bull; Choosing a medium is a professional skill, not a habit</p>
<p><b>Slide 3 · Factors to consider (1)</b><br>&bull; Degree of urgency: is an instant reply needed?<br>&bull; Genre: should the message be oral, written or visual?<br>&bull; Level of confidentiality: who must NOT see it?</p>
<p><b>Slide 4 · Factors to consider (2)</b><br>&bull; Location and time zone of the recipient<br>&bull; Cost of the medium<br>&bull; Efficiency: time and effort to prepare, send and process<br>&bull; Effectiveness: will it be received, understood and acted upon?</p>
<p><b>Slide 5 · Matching the medium to the message</b> (insert as a table, 3 columns)</p>
<table style="border:1px solid">
<thead><tr><th>Scenario</th><th>Recommended medium</th><th>Key factor(s)</th></tr></thead>
<tbody>
<tr><td>Informing 500 customers of a routine price change</td><td>Bulk e-mail (mail merge)</td><td>Cost, efficiency, many recipients</td></tr>
<tr><td>Discussing a disciplinary matter with an employee</td><td>Face-to-face meeting</td><td>Confidentiality, oral genre</td></tr>
<tr><td>Confirming a same-day delivery has left the depot</td><td>SMS or instant message</td><td>Urgency</td></tr>
<tr><td>Showing customers how to pack a parcel safely</td><td>Short video or diagram</td><td>Visual genre</td></tr>
<tr><td>Coordinating with agents in Miami, London and Curaçao</td><td>Scheduled video call</td><td>Location and time zone</td></tr>
</tbody>
</table>
<p><b>Slide 6 · E-mail: strengths and risks</b><br>Left column heading: Advantages &bull; Fast delivery &bull; Low cost &bull; Many recipients at once<br>Right column heading: Disadvantages &bull; Errors in dispatch &bull; No guarantee it was received or read</p>
<p><b>Slide 7 · Before you send, ask...</b><br>&bull; How urgent is it?<br>&bull; How private is it?<br>&bull; Where and when will they read it?<br>&bull; Is this the cheapest medium that will still work?<br>Closing line: Thank you · Questions?</p>
<p><b>Speaker notes</b><br>Slide 3: Remind staff that a delivery complaint from an angry customer is best handled by telephone first, then confirmed in writing.<br>Slide 5: Ask staff which factor is most important in each scenario before revealing the third column.<br>Slide 6: Stress that important e-mails should be followed up to confirm receipt.</p>`,
  tasks: [
    `Create a new presentation and apply one consistent design theme. Use the <b>Title Slide</b> layout for slide 1, <b>Title and Content</b> for slides 2 to 5 and 7, and <b>Two Content</b> (or Comparison) for slide 6.`,
    `Key in the content for all seven slides exactly as given. Use bulleted lists where bullets are shown.`,
    `On slide 5, insert a <b>table of 3 columns and 6 rows</b>, key in the data, bold the header row and set table text to at least 16 pt.`,
    `On slide 6, place the advantages in the left placeholder and the disadvantages in the right placeholder, each with its own heading.`,
    `Insert a relevant picture or icon (e.g. telephone, envelope or video camera) on slide 2, sized so it does not cover any text.`,
    `Apply the <b>Fade</b> transition to ALL slides with a duration of 1.00 second, advancing on mouse click.`,
    `Apply the <b>Fly In</b> (from left) entrance animation to the bulleted text on slides 3 and 4, so that bullets appear one at a time on click.`,
    `Type the speaker notes for slides 3, 5 and 6 in the Notes pane.`,
    `Insert slide numbers and the footer <i>Basseterre Freight &amp; Courier Ltd</i> on all slides except the title slide.`,
    `Run the spell check, save as <b>S7P1_ChoosingMedia_YourName</b>, and print the presentation as handouts (4 slides per page) and slides 3, 5 and 6 as Notes Pages.`
  ],
  skills: ['slide layouts', 'tables on slides', 'transitions', 'animations', 'speaker notes'],
  check: [
    { c: 'Seven slides with correct layouts and consistent theme', m: 2 },
    { c: 'All slide content keyed accurately', m: 3 },
    { c: 'Table on slide 5 complete and readable; two-content slide 6 correct', m: 2 },
    { c: 'Relevant image inserted without covering text', m: 1 },
    { c: 'Fade transition on all slides; Fly In animation on slides 3 and 4', m: 3 },
    { c: 'Speaker notes on slides 3, 5 and 6', m: 2 },
    { c: 'Slide numbers and footer (not on title slide); handouts and notes printed', m: 2 }
  ],
  tip: `Keep to no more than six bullets per slide and at least 24 pt for bullet text so the back row can read it.`
},
{
  id: 'S7-B1',
  sec: 'S7',
  app: 'pub',
  level: 'Core',
  title: 'Business centre services flyer',
  time: 45,
  brief: `<p><b>Montego Bay Business Centre</b>, King Street, Montego Bay, has installed a new multifunctional device that prints, copies, scans and faxes. The manager, Mr Kenrick Peters, wants an A4 flyer to hand out to small businesses and students explaining the new scan-to-mail and scan-to-file services, with a price list. Produce the flyer in Microsoft Publisher using the exact text below.</p>`,
  data: `<p><b>Heading (WordArt):</b> SCAN IT. SEND IT. DONE.</p>
<p><b>Sub-heading:</b> New multifunctional services at Montego Bay Business Centre</p>
<p><b>Text box 1 · Scan to mail</b><br>Bring in your paper documents and we will scan them and send the digital copy straight to any e-mail address you choose. Ideal for sending signed forms to a bank, school or employer in seconds.</p>
<p><b>Text box 2 · Scan to file</b><br>Prefer to keep it yourself? We scan your documents and save them as PDF files directly to your USB flash drive or cloud folder, neatly named and ready to file.</p>
<p><b>Price list (insert as a table)</b></p>
<table style="border:1px solid">
<thead><tr><th>Service</th><th>Price</th></tr></thead>
<tbody>
<tr><td>Scan to mail (per page)</td><td>US$0.75</td></tr>
<tr><td>Scan to file (per page)</td><td>US$0.50</td></tr>
<tr><td>Fax, local (per page)</td><td>US$1.00</td></tr>
<tr><td>Fax, overseas (per page)</td><td>US$2.50</td></tr>
<tr><td>Black and white copy (per page)</td><td>US$0.25</td></tr>
<tr><td>Colour print (per page)</td><td>US$1.25</td></tr>
</tbody>
</table>
<p><b>Banner text:</b> Students with a valid school ID save 20% on all scanning services!</p>
<p><b>Contact text box:</b> Montego Bay Business Centre · King Street, Montego Bay, Jamaica · Tel: +1 (876) 544 3170 · Open Monday to Saturday, 8.00 a.m. to 6.00 p.m.</p>`,
  tasks: [
    `Open Microsoft Publisher and create a blank <b>A4 portrait</b> publication with 1.27 cm margin guides.`,
    `Insert the heading as <b>WordArt</b>, centred across the top of the page, in a colour that suits the colour scheme you choose.`,
    `Insert the sub-heading in a separate text box, 20 pt, bold, centred, below the WordArt.`,
    `Create <b>two text boxes side by side</b> for the scan-to-mail and scan-to-file text. Give each a bold 16 pt heading and set the body to 12 pt. Apply a 1 pt border and light fill to both boxes.`,
    `Insert a relevant picture of a printer, scanner or document in the space between the heading and the text boxes. Apply <b>Square</b> text wrapping.`,
    `Insert the price list as a <b>table of 2 columns and 7 rows</b>. Bold and shade the header row and right-align the prices.`,
    `Insert the banner text in a shape (e.g. an explosion or ribbon shape) placed near the price list, 14 pt bold.`,
    `Place the contact details in a text box across the bottom of the page, 11 pt, centred.`,
    `Apply a <b>page border</b> (Border Art or a 3 pt line) and make sure no objects overlap the border or each other.`,
    `Save the publication as <b>S7B1_ScanFlyer_YourName</b>, then print one copy in colour if available.`
  ],
  skills: ['WordArt', 'text boxes', 'tables', 'shapes', 'page border', 'text wrapping'],
  check: [
    { c: 'A4 portrait with margin guides; WordArt heading centred', m: 2 },
    { c: 'Sub-heading and two side-by-side text boxes formatted with borders and fill', m: 3 },
    { c: 'Relevant picture inserted with Square wrapping', m: 1 },
    { c: 'Price table 2 x 7, accurate prices, header shaded, prices right-aligned', m: 3 },
    { c: 'Banner shape and contact text box placed and formatted', m: 2 },
    { c: 'Page border; balanced layout with no overlapping objects', m: 2 },
    { c: 'All text accurate; saved with correct name', m: 2 }
  ],
  tip: `Use the Arrange > Align tools to line up the two text boxes exactly; uneven boxes are the most common layout fault.`
}
]);
