// EDPM practical labs — Section IV: Use of Application Software
window.EDPM_LABS = (window.EDPM_LABS || []).concat([
  {
    id: 'S4-W1',
    sec: 'S4',
    app: 'word',
    level: 'Core',
    title: 'Beach clean-up report: formatting and editing',
    time: 50,
    brief: `<p>The secretary of the Nassau Environmental Youth Group has drafted a short report on the group's Junkanoo Beach clean-up. The draft contains manuscript corrections, abbreviations and several keying errors. Key the report in Microsoft Word, edit it on screen until it is error-free, and apply appropriate formatting features so that it is ready to be distributed to the group's sponsors.</p>`,
    data: `<p><small><b>Key to signs:</b> [NP] = begin a new paragraph · [run on] = join to the previous paragraph · <del>struck-out</del> [stet] = keep the crossed-out words · <u>underlined</u> words marked [trs] = transpose the two underlined words · [uc] = capitals · ^[word] = insert the word shown. Three keying errors (spelling / word choice / repeated word) have been left in the draft for you to find.</small></p>
<p>report on the junkanoo beach clean up [uc]</p>
<p>On Sat. 7 March 2026, 64 volunteers from the Nassau Environmental Youth Group met at the Junkanoo Beach entrance at 8.00 a.m. Working in teams of eight, they cleared the beach from the cruise port to the Western Esplanade in approx. three hrs. The temperature reached 31 degrees C [use the ° symbol: 31 °C] by mid-morning, so water stations were set up every 200 metres.</p>
<p>[NP] Each team recorded the items it collected on a tally sheet. The <u>results</u> <u>final</u> [trs] were as follows:</p>
<p>Plastic bottles 1,240<br>Bottle caps 865<br>Food wrappers 430<br>Glass bottles 212<br>Cigarette butts 168</p>
<p>The group <del>gratefully</del> [stet] acknowledges the support of Potter's Cay Marine Supplies Ltd, which donated gloves, bags and refreshments.</p>
<p>[run on] Volunteers also recieved a free T-shirt designed by the Form 4 art students.</p>
<p>A total of 2,915 items were removed and sorted for recycling or disposal.</p>
<p>The committee recommends the following next steps:<br>Hold the next clean up on Sat. 18 April 2026 at Cabbage Beach.<br>Invite ^[two] more schools to take part.<br>Share there results with other youth groups and the the local press.</p>
<p>Prepared by: Secretary, Nassau Environmental Youth Group</p>`,
    tasks: [
      `Set the page to Letter size, portrait, with 1-inch margins on all sides. Key the report, obeying every correction sign and expanding the abbreviations Sat. (Saturday), hrs (hours) and approx. (approximately).`,
      `Format the title: Arial 14 pt, bold, all capitals, centred, with the hyphen in CLEAN-UP. Leave one blank line after it.`,
      `Format all body text in Times New Roman 12 pt, justified, with 1.5 line spacing and 6 pt spacing after each paragraph.`,
      `Present the five items collected as a <b>bulleted</b> list, with a right tab (or a two-column borderless table) so that the figures line up on the right.`,
      `Present the three next steps as a <b>numbered</b> list (1, 2, 3), because they are in order of priority.`,
      `Use Insert &gt; Symbol to insert the degree sign in "31 °C".`,
      `Use <b>Find and Replace</b> to replace every occurrence of "clean up" with "clean-up". Then run spelling and grammar check and correct the three keying errors left in the draft.`,
      `Use the <b>Thesaurus</b> to replace the word "removed" with a suitable synonym (for example, "cleared" or "collected").`,
      `Use <b>Cut</b> and <b>Paste</b> to move the paragraph that begins "A total of 2,915 items…" so that it comes immediately after the bulleted list of items collected, and check that the paragraph order reads logically.`,
      `Apply a ½ pt box border and light shading to the paragraph acknowledging the sponsor. Insert a footnote after "recycling" that reads: <i>Plastics were taken to the island's recycling collection point.</i>`,
      `Insert a header with the text <b>Nassau Environmental Youth Group</b> (right-aligned, 9 pt) and a footer with page numbers in the format <b>Page X of Y</b>, centred. Add a diagonal <b>DRAFT</b> watermark.`,
      `Save the document as <b>S4W1_CleanUp_Report.docx</b>. Remove the watermark and save the final copy as <b>S4W1_CleanUp_Final.pdf</b>.`
    ],
    skills: ['manuscript signs', 'find and replace', 'bullets and numbering', 'footnotes', 'headers and footers', 'watermarks'],
    check: [
      { c: 'All correction signs obeyed: new paragraph, run on, stet (gratefully), transposition (final results), insertion (two); abbreviations expanded', m: 4 },
      { c: 'Three keying errors corrected: recieved → received, there → their, "the the" → the', m: 3 },
      { c: 'Title Arial 14 pt bold capitals centred; body Times New Roman 12 pt, justified, 1.5 spacing, 6 pt after', m: 3 },
      { c: 'Bulleted list with figures aligned; numbered list of three next steps', m: 2 },
      { c: 'Degree symbol inserted; clean-up hyphenated throughout; thesaurus synonym used', m: 2 },
      { c: 'Border and shading on sponsor paragraph; footnote inserted correctly', m: 2 },
      { c: 'Header, Page X of Y footer and DRAFT watermark on the .docx; watermark removed on the PDF final copy', m: 3 },
      { c: '"A total of 2,915 items" paragraph moved to follow the list; figures accurate (64, 1,240, 865, 430, 212, 168, 2,915)', m: 1 }
    ],
    tip: `Always re-add any figures you key: here 1,240 + 865 + 430 + 212 + 168 = 2,915. Examiners check that the text and the figures agree.`
  },
  {
    id: 'S4-W2',
    sec: 'S4',
    app: 'word',
    level: 'Challenge',
    title: 'Quarterly sales tabulation with formulae and chart',
    time: 60,
    brief: `<p>Bayview Stationery &amp; Office Supplies Ltd has five branches across Barbados. The Sales Manager needs a ruled table of the first-quarter sales for the board meeting, with every total, average, highest and lowest figure calculated by formula rather than typed in by hand, the branches ranked by total sales, and a chart to show the comparison at a glance.</p>`,
    data: `<p><b>Main heading:</b> BAYVIEW STATIONERY &amp; OFFICE SUPPLIES LTD<br><b>Sub-heading:</b> Branch Sales, January – March 2026 (BDS$)</p>
<table style="border:1px solid #000"><thead><tr><th>Branch</th><th>January</th><th>February</th><th>March</th></tr></thead><tbody>
<tr><td>Oistins</td><td>7,640</td><td>8,115</td><td>7,905</td></tr>
<tr><td>Warrens</td><td>4,320</td><td>4,780</td><td>5,265</td></tr>
<tr><td>Speightstown</td><td>5,910</td><td>5,480</td><td>6,125</td></tr>
<tr><td>Bridgetown</td><td>12,450</td><td>11,980</td><td>13,615</td></tr>
<tr><td>Holetown</td><td>9,870</td><td>10,245</td><td>11,030</td></tr>
</tbody></table>
<p><b>Columns to add:</b> Quarter Total · Monthly Average<br><b>Rows to add at the bottom:</b> TOTAL · HIGHEST · LOWEST</p>
<p><b>Note to key below the table (8 pt, italics):</b> Source: Bayview Stationery &amp; Office Supplies Ltd sales records. All figures in US dollars.</p>`,
    tasks: [
      `Set the page to Letter, <b>landscape</b>, with 1-inch margins. Key the main heading (Arial 14 pt bold, centred) and sub-heading (Arial 12 pt, centred).`,
      `Insert a table with 6 columns and 9 rows. Key the column headings Branch, January, February, March, Quarter Total and Monthly Average, then the five branches and their sales figures. Key TOTAL, HIGHEST and LOWEST in the last three rows of the first column.`,
      `Change the text direction of the three month headings to vertical (rotate text) and make the heading row tall enough to display them in full.`,
      `In the top-left cell, create a split corner heading: apply a diagonal border and key <b>Month</b> at the top right and <b>Branch</b> at the bottom left of the cell.`,
      `Use Layout &gt; Formula to calculate each branch's Quarter Total (=SUM(LEFT)) and Monthly Average (=AVERAGE(B2:D2) and so on), formatted as #,##0 and #,##0.00 respectively.`,
      `Use formulae to calculate the TOTAL row for every numeric column (=SUM(ABOVE)), the HIGHEST row (=MAX) and the LOWEST row (=MIN) for January, February, March and Quarter Total. Leave the Monthly Average cell blank in the HIGHEST and LOWEST rows; calculate it in the TOTAL row as the TOTAL Quarter Total divided by 3.`,
      `Sort the five branch rows only (not the heading or summary rows) in <b>descending</b> order of Quarter Total, then update all fields (select the table and press F9) and check every figure.`,
      `Format the table: heading row bold with grey shading, figures right-aligned, branch names left-aligned, TOTAL row bold with a double top border, all borders ½ pt, table centred horizontally.`,
      `Below the table, key the source note in 8 pt italics.`,
      `Insert a clustered column chart (Insert &gt; Chart) showing the Quarter Total for each branch in the sorted order. Add the chart title <b>First Quarter Sales by Branch, 2026</b>, axis titles <b>Branch</b> and <b>BDS$</b>, and data labels. Size the chart so the whole document fits on two pages.`,
      `Add a footer with your name, the file name and the date. Save as <b>S4W2_Branch_Sales.docx</b>.`
    ],
    skills: ['ruled tabulation', 'vertical headings', 'split corner heading', 'formulae', 'sorting', 'charts'],
    check: [
      { c: 'Landscape layout; headings correctly formatted; table of 6 columns × 9 rows with all data keyed accurately', m: 3 },
      { c: 'Vertical month headings and split (diagonal-border) top-left heading correctly presented', m: 2 },
      { c: 'Quarter Totals correct by formula: Bridgetown 38,045; Holetown 31,145; Oistins 23,660; Speightstown 17,515; Warrens 14,365', m: 3 },
      { c: 'Monthly Averages correct: 12,681.67; 10,381.67; 7,886.67; 5,838.33; 4,788.33', m: 2 },
      { c: 'TOTAL row 40,190 / 40,600 / 43,940 / 124,730 / 41,576.67; HIGHEST 12,450 / 11,980 / 13,615 / 38,045; LOWEST 4,320 / 4,780 / 5,265 / 14,365', m: 3 },
      { c: 'Branch rows sorted descending by Quarter Total (Bridgetown first, Warrens last); summary rows unchanged', m: 2 },
      { c: 'Table formatting: shading, alignment, double top border on TOTAL, centred; source note in 8 pt italics', m: 2 },
      { c: 'Clustered column chart of Quarter Totals with title, axis titles and data labels', m: 3 }
    ],
    tip: `Word does not recalculate table formulae automatically: after sorting or changing a figure, select the whole table and press F9 to update every field.`
  },
  {
    id: 'S4-D1',
    sec: 'S4',
    app: 'access',
    level: 'Starter',
    title: 'Fundraiser ticket sales: single-table database',
    time: 40,
    brief: `<p>The Business Club at a secondary school in St. John’s sold tickets for a fundraising movie night. The club treasurer wants a simple, single-table Access database (no more than five fields) to record how many tickets each Form 4 member sold, find the members in Form 4B, identify the top sellers in Form 4B and print a short report for the club notice board.</p>`,
    data: `<p><b>Table name:</b> tblTicketSales</p>
<table style="border:1px solid #000"><thead><tr><th>Field name</th><th>Data type</th><th>Notes</th></tr></thead><tbody>
<tr><td>StudentID</td><td>Number (Long Integer)</td><td>Primary key</td></tr>
<tr><td>FirstName</td><td>Short Text (20)</td><td></td></tr>
<tr><td>LastName</td><td>Short Text (25)</td><td></td></tr>
<tr><td>FormClass</td><td>Short Text (3)</td><td>4A, 4B or 4C</td></tr>
<tr><td>TicketsSold</td><td>Number (Integer)</td><td></td></tr>
</tbody></table>
<p><b>Records:</b></p>
<table style="border:1px solid #000"><thead><tr><th>StudentID</th><th>FirstName</th><th>LastName</th><th>FormClass</th><th>TicketsSold</th></tr></thead><tbody>
<tr><td>20250134</td><td>Aaliyah</td><td>Richardson</td><td>4B</td><td>18</td></tr>
<tr><td>20250141</td><td>Jaden</td><td>Hodge</td><td>4A</td><td>12</td></tr>
<tr><td>20250152</td><td>Kayla</td><td>Arrindell</td><td>4B</td><td>9</td></tr>
<tr><td>20250163</td><td>Marcus</td><td>Gumbs</td><td>4C</td><td>21</td></tr>
<tr><td>20250170</td><td>Tiana</td><td>Peterson</td><td>4A</td><td>16</td></tr>
<tr><td>20250188</td><td>Dante</td><td>Lake</td><td>4B</td><td>15</td></tr>
<tr><td>20250195</td><td>Shanice</td><td>Brooks</td><td>4C</td><td>7</td></tr>
<tr><td>20250203</td><td>Jamal</td><td>Wathey</td><td>4A</td><td>20</td></tr>
<tr><td>20250219</td><td>Naomi</td><td>Carty</td><td>4B</td><td>22</td></tr>
<tr><td>20250226</td><td>Elijah</td><td>Fleming</td><td>4C</td><td>11</td></tr>
<tr><td>20250234</td><td>Ariana</td><td>Hughes</td><td>4A</td><td>14</td></tr>
<tr><td>20250241</td><td>Kaleb</td><td>Romney</td><td>4B</td><td>6</td></tr>
</tbody></table>`,
    tasks: [
      `Create a new blank desktop database named <b>S4D1_TicketSales.accdb</b>.`,
      `In Design View, create the table <b>tblTicketSales</b> with the five fields and data types shown. Set <b>StudentID</b> as the primary key.`,
      `Set a validation rule on TicketsSold of <b>&gt;=0</b> with the validation text <i>Tickets sold cannot be negative</i>.`,
      `Enter all 12 records accurately in Datasheet View and adjust the column widths so all data is visible.`,
      `Sort the datasheet in ascending order by LastName, then save and close the table.`,
      `Create a simple query named <b>qryForm4B</b> showing FirstName, LastName and TicketsSold for every student whose FormClass is <b>4B</b>, sorted by LastName (A–Z).`,
      `Create a query named <b>qry4BTopSellers</b> with TWO criteria: FormClass is <b>4B</b> AND TicketsSold is <b>&gt;=15</b>. Show FirstName, LastName, FormClass and TicketsSold, sorted in descending order of TicketsSold.`,
      `Use the Report Wizard to create a report based on <b>qry4BTopSellers</b>. Use a tabular layout, portrait orientation, and the title <b>Form 4B Top Ticket Sellers</b>.`,
      `In Design View, add a text box in the Report Footer that totals the TicketsSold field (=Sum([TicketsSold])) with the label <b>Total tickets</b>. Save the report as <b>rpt4BTopSellers</b>.`,
      `Preview the report, check that no data is cut off, then print it or export it as PDF.`
    ],
    skills: ['table design', 'data types', 'primary key', 'simple query', 'two-criteria query', 'reports'],
    check: [
      { c: 'Table created with exactly five correctly named fields and suitable data types; StudentID is the primary key', m: 3 },
      { c: 'Validation rule and text set on TicketsSold', m: 1 },
      { c: 'All 12 records entered accurately', m: 3 },
      { c: 'qryForm4B returns 5 records (Arrindell, Carty, Lake, Richardson, Romney) in A–Z order', m: 2 },
      { c: 'qry4BTopSellers uses both criteria and returns 3 records: Naomi Carty 22, Aaliyah Richardson 18, Dante Lake 15', m: 3 },
      { c: 'Report based on the two-criteria query, titled correctly, tabular, nothing cut off', m: 2 },
      { c: 'Report Footer total shows 55 tickets with the label Total tickets', m: 2 }
    ],
    tip: `A simple database at this level should have no more than five fields; plan the fields and their data types on paper before you open Access.`
  },
  {
    id: 'S4-P1',
    sec: 'S4',
    app: 'ppt',
    level: 'Core',
    title: 'From draft to mailable: editing workshop slides',
    time: 50,
    brief: `<p>The Basseterre Business Training Centre is running an evening workshop for new office assistants on editing documents before distribution. The tutor has asked you to prepare a simple seven-slide PowerPoint presentation that uses a title slide, consistent theme and fonts, suitable layouts, transitions, timings, purposeful animation, a grouped graphic and a chart.</p>`,
    data: `<p><b>Slide 1 (Title Slide)</b><br>Title: From Draft to Mailable<br>Subtitle: Editing techniques every typist should know<br>Your name · Basseterre Business Training Centre · Friday 24 April 2026</p>
<p><b>Slide 2 (Title and Content)</b> — What makes a document mailable?<br>• No errors in spelling, punctuation or figures<br>• Consistent formatting throughout<br>• Correct layout for the type of document<br>• Every instruction followed</p>
<p><b>Slide 3 (Two Content)</b> — Six editing tools<br>Left: Cut · Copy · Paste<br>Right: Find and Replace · Spelling and grammar check · Thesaurus</p>
<p><b>Slide 4 (Title Only + grouped graphic)</b> — Insert mode or Overtype?<br>Box 1: INSERT — new text pushes existing text forward<br>Box 2: OVERTYPE — new text replaces existing text<br>Picture: a keyboard</p>
<p><b>Slide 5 (Title and Content, chart)</b> — Errors found in 40 practice letters</p>
<table style="border:1px solid #000"><thead><tr><th>Type of error</th><th>Number</th></tr></thead><tbody>
<tr><td>Spelling</td><td>46</td></tr><tr><td>Punctuation</td><td>31</td></tr><tr><td>Spacing</td><td>24</td></tr><tr><td>Capitalisation</td><td>18</td></tr><tr><td>Missing enclosure notation</td><td>9</td></tr><tr><td><b>Total</b></td><td><b>128</b></td></tr></tbody></table>
<p><b>Slide 6 (Title and Content)</b> — Proofread before you print<br>1. Run spelling and grammar check<br>2. Read the document slowly, line by line<br>3. Compare it with the original copy<br>4. Check formatting is consistent</p>
<p><b>Slide 7 (Section Header)</b> — Thank you · Questions?</p>
<p><b>Speaker notes:</b><br>Slide 3: Find and Replace changes every occurrence at once; a simple Search only locates the word.<br>Slide 4: Press the Insert key, or use the Overtype setting in Word Options, to switch modes.<br>Slide 5: Spelling errors made up 46 of the 128 errors — more than one in three.</p>`,
    tasks: [
      `Start a new presentation, apply one design theme and save it as <b>S4P1_DraftToMailable.pptx</b>. Use no more than two font families; titles at least 36 pt and body text at least 24 pt.`,
      `Create the seven slides using the layouts named and the content given. Keep text to the key points shown.`,
      `On slide 6 format the four steps as a numbered list (1, 2, 3, 4).`,
      `On slide 4 draw two rounded rectangles, key the INSERT and OVERTYPE text into them, and insert a keyboard picture. Recolour the picture to match the theme and resize it proportionally.`,
      `Select the two rectangles and the picture and <b>Group</b> them (Shape Format &gt; Group). Move the group so it is centred on the slide below the title.`,
      `On slide 5 insert a bar or column chart from the error data (exclude the Total row). Add the chart title <b>Errors in 40 Practice Letters</b> and data labels, and add a text box below the chart reading <b>Total: 128 errors</b>.`,
      `Apply the <b>Push</b> transition to every slide, duration 0.75 seconds.`,
      `Set slides 2 to 6 to advance On Mouse Click OR automatically After 00:20.00 seconds.`,
      `Apply a <b>Fade</b> entrance animation to the bullet points on slide 2 (By Paragraph, On Click) and an <b>Appear</b> entrance to the grouped graphic on slide 4. Use no other animations.`,
      `Type the speaker notes given for slides 3, 4 and 5 into the Notes pane.`,
      `Run the slide show from the beginning to check transitions, timings and animations. Save, and print handouts with 3 slides per page.`
    ],
    skills: ['title slide', 'layouts', 'transitions', 'timings', 'grouping objects', 'charts'],
    check: [
      { c: 'Seven slides with correct layouts and accurate content; title slide complete', m: 3 },
      { c: 'One consistent theme; maximum two fonts; readable font sizes', m: 2 },
      { c: 'Slide 4: picture recoloured and resized proportionally; rectangles and picture grouped as one object', m: 3 },
      { c: 'Slide 5: correct chart of five error types (Total excluded) with title, data labels and Total: 128 errors text box', m: 3 },
      { c: 'Push transition on all slides; timings of 20 seconds on slides 2–6', m: 2 },
      { c: 'Only the two specified animations used, set as instructed', m: 2 },
      { c: 'Numbered list on slide 6; speaker notes on slides 3–5; handouts printed', m: 2 }
    ],
    tip: `Group objects only after they are positioned and formatted the way you want; ungroup if you need to edit one element, then regroup.`
  },
  {
    id: 'S4-B1',
    sec: 'S4',
    app: 'pub',
    level: 'Core',
    title: 'Mail-merged certificates of appreciation',
    time: 50,
    brief: `<p>The English Harbour Environmental Youth Group wants to thank the team leaders and helpers from its Jolly Harbour beach clean-up. Instead of typing each certificate separately, you will design ONE certificate in Microsoft Publisher, create a recipient list, and use mail merge to integrate the list with the certificate, producing a personalised certificate for every volunteer.</p>`,
    data: `<p><b>Certificate text:</b></p>
<p>Line 1 (WordArt): Certificate of Appreciation<br>Line 2: This certificate is proudly presented to<br>Line 3: «FirstName» «LastName»<br>Line 4: «Role»<br>Line 5: in recognition of «Hours» hours of volunteer service at the Jolly Harbour Beach Clean-up on Saturday 7 March 2026.<br>Line 6: Thank you for helping to keep Antigua beautiful!<br>Signature lines (left and right): ______________________ President · ______________________ Secretary<br>Organisation line: English Harbour Environmental Youth Group · English Harbour, Antigua · +1 (268) 543 6620</p>
<p><b>Recipient list (fields: FirstName, LastName, Role, Hours):</b></p>
<table style="border:1px solid #000"><thead><tr><th>FirstName</th><th>LastName</th><th>Role</th><th>Hours</th></tr></thead><tbody>
<tr><td>Tamara</td><td>Gumbs</td><td>Team Leader</td><td>4</td></tr>
<tr><td>Keon</td><td>Arrindell</td><td>Team Leader</td><td>4</td></tr>
<tr><td>Shaniqua</td><td>Hodge</td><td>Volunteer</td><td>3</td></tr>
<tr><td>Mikael</td><td>Lake</td><td>Volunteer</td><td>3</td></tr>
<tr><td>Destiny</td><td>Carty</td><td>Recorder</td><td>3</td></tr>
<tr><td>Rohan</td><td>Peterson</td><td>First Aid Volunteer</td><td>4</td></tr>
<tr><td>Imani</td><td>Brooks</td><td>Volunteer</td><td>3</td></tr>
<tr><td>Jordan</td><td>Wathey</td><td>Water Station Volunteer</td><td>4</td></tr>
</tbody></table>`,
    tasks: [
      `Open a new blank publication, set the page to Letter <b>landscape</b> with 1.27 cm margin guides, and save it as <b>S4B1_Certificate_Master.pub</b>.`,
      `Add a decorative page border (Borders &amp; Accents or a thick double-line rectangle) inside the margins.`,
      `Insert Line 1 as WordArt, centred, at least 40 pt. Key Lines 2, 4, 5 and 6 in centred text boxes, using no more than two fonts.`,
      `Insert a relevant picture (for example, a beach, a palm tree or a recycling symbol). Recolour it to match your colour scheme and resize it proportionally.`,
      `Draw a circle or badge shape, add a text box reading <b>CBEYG 2026</b> on top of it, then <b>Group</b> the shape and text box into a single seal and place it in the bottom centre of the certificate.`,
      `Add the two signature lines with their titles and the organisation line in 10 pt at the foot of the page.`,
      `Start Mail Merge (Mailings &gt; Mail Merge &gt; Use an Existing List, or Type a New List). Create the recipient list with the fields FirstName, LastName, Role and Hours and enter all 8 records. Save the list as <b>S4B1_Volunteers</b>.`,
      `Insert the merge fields «FirstName» «LastName» on Line 3 (bold, at least 28 pt, with a space between the fields), «Role» on Line 4, and «Hours» in Line 5.`,
      `Sort the recipient list in ascending order by LastName and preview all 8 certificates, checking that names and roles fit on one line.`,
      `Merge to a new publication and save it as <b>S4B1_Certificates_Merged.pub</b>. Print (or export as PDF) the first two merged certificates.`
    ],
    skills: ['mail merge', 'data source', 'WordArt', 'grouping objects', 'recolouring images', 'borders'],
    check: [
      { c: 'Landscape layout with margins and decorative border; balanced, centred design', m: 2 },
      { c: 'WordArt title and all certificate text accurate; maximum two fonts', m: 3 },
      { c: 'Relevant picture recoloured and resized proportionally', m: 2 },
      { c: 'Shape and text box grouped into a single seal, correctly placed', m: 2 },
      { c: 'Recipient list created with the four fields and all 8 records accurate', m: 3 },
      { c: 'Merge fields inserted in the correct places with correct spacing and formatting', m: 3 },
      { c: 'List sorted by LastName (Arrindell first, Wathey last); merged publication of 8 certificates saved and two printed', m: 3 }
    ],
    tip: `Always preview the merged results before printing: a missing space between «FirstName» and «LastName» will appear on every single certificate.`
  }
]);
