window.COURSE_PAPERS = (window.COURSE_PAPERS || []).concat([{
  kind: 'p1', id: 'MOCK1', title: 'Mock Paper 01 · Set 1', time: 90,
  intro: `<p><b>EDPM · Mock Paper 01 · Set 1</b> · 1 hour 30 minutes · 60 items</p><ol><li>Answer <b>ALL</b> items. Each item has four options (A), (B), (C), (D).</li><li>Start the optional timer to practise under exam conditions.</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>`,
  items: [
    // ---------- Items 1–3: punctuation / capitalisation (S2) ----------
    {
      passage: `<p><b>Items 1–3</b> refer to the following instruction.</p><p>Each sentence below may contain an error of punctuation or capitalisation. Select the option (A), (B) or (C) that identifies the part containing the error. Select (D) if there is NO ERROR.</p>`,
      q: `The Annual General Meeting will be held at the Linden community centre on 14 March 2026.`,
      options: [`“14 March 2026”`, `NO ERROR`, `“Annual General Meeting”`, `“Linden community centre”`],
      answer: 3, sec: 'S2',
      why: `Key: D. “Linden Community Centre” is the name of a particular building, so it is a proper noun and each main word needs a capital letter.`
    },
    {
      passage: `<p><b>Items 1–3</b> refer to the following instruction.</p><p>Each sentence below may contain an error of punctuation or capitalisation. Select the option (A), (B) or (C) that identifies the part containing the error. Select (D) if there is NO ERROR.</p>`,
      q: `The sales assistant ordered: paper clips, staples and toner cartridges for the Bridge Street branch.`,
      options: [`“paper clips, staples”`, `“ordered:”`, `NO ERROR`, `“Bridge Street”`],
      answer: 1, sec: 'S2',
      why: `Key: B. A colon should not separate a verb from its object; the list follows “ordered” directly, so the colon must be removed.`
    },
    {
      passage: `<p><b>Items 1–3</b> refer to the following instruction.</p><p>Each sentence below may contain an error of punctuation or capitalisation. Select the option (A), (B) or (C) that identifies the part containing the error. Select (D) if there is NO ERROR.</p>`,
      q: `The office manager, who joined the company in 2019, will retire in December.`,
      options: [`NO ERROR`, `“manager,”`, `“2019,”`, `“December.”`],
      answer: 0, sec: 'S2',
      why: `Key: A. The pair of commas correctly encloses the non-essential clause, “December” is a month and takes a capital, and the sentence ends with a full stop.`
    },
    // ---------- Items 4–10: word choice / vocabulary / spelling (S2) ----------
    {
      q: `The clerk was asked to keep all ……… documents in a locked cabinet.`,
      options: [`confidential`, `confedential`, `confidencial`, `confidentail`],
      answer: 0, sec: 'S2',
      why: `Key: A. The correct spelling is “confidential” (con-fi-den-tial).`
    },
    {
      q: `The new filing system had a positive ……… on staff productivity.`,
      options: [`effect`, `affect`, `affects`, `effected`],
      answer: 0, sec: 'S2',
      why: `Key: A. A noun is needed after “a positive”; “effect” is the noun meaning a result, while “affect” is normally a verb.`
    },
    {
      q: `Please order more ……… so that letterheads and envelopes do not run out.`,
      options: [`stationerie`, `stationery`, `stationary`, `stationarey`],
      answer: 1, sec: 'S2',
      why: `Key: B. “Stationery” (with -ery) means writing materials such as paper and envelopes; “stationary” means not moving.`
    },
    {
      q: `Please arrange the client files in ……… order by surname.`,
      options: [`alphabeticle`, `alfabetical`, `alphebetical`, `alphabetical`],
      answer: 3, sec: 'S2',
      why: `Key: D. The correct spelling is “alphabetical”, from “alphabet”.`
    },
    {
      q: `Neither the secretary nor the clerks ……… aware of the change in the schedule.`,
      options: [`were`, `is`, `has been`, `was`],
      answer: 0, sec: 'S2',
      why: `Key: A. With “neither … nor” the verb agrees with the nearer subject; “clerks” is plural, so “were” is correct.`
    },
    {
      q: `The new laptops arrived ……… days ago, but ……… still in their boxes.`,
      options: [`to, their`, `too, there`, `two, they're`, `two, their`],
      answer: 2, sec: 'S2',
      why: `Key: C. “Two” is the number and “they're” is the contraction of “they are”, which completes the meaning of the second clause.`
    },
    {
      q: `The conference room at the hotel in Gros Islet can ……… up to forty participants.`,
      options: [`acommodate`, `accomodate`, `acomodate`, `accommodate`],
      answer: 3, sec: 'S2',
      why: `Key: D. “Accommodate” is spelt with a double c and a double m.`
    },
    // ---------- Items 11–12: abbreviations / correction signs (S2) ----------
    {
      q: `Which of the following is the correct expansion of the manuscript abbreviation ‘yrs sncly’?`,
      options: [`Your signature`, `Yours faithfully`, `Yours truly`, `Yours sincerely`],
      answer: 3, sec: 'S2',
      why: `Key: D. ‘yrs sncly’ is the manuscript abbreviation for the complimentary close “Yours sincerely”, which must be typed in full.`
    },
    {
      q: `A proofreader writes ‘trs’ in the margin beside the words ‘report annual’ that are linked by a curved line. When preparing the final copy, the typist should`,
      options: [`insert a space between the words`, `reverse the order of the two words`, `start a new paragraph at that point`, `delete both words`],
      answer: 1, sec: 'S2',
      why: `Key: B. ‘trs’ (transpose) means reverse the order of the marked letters or words, so the text becomes ‘annual report’.`
    },
    // ---------- Items 13–21: Section I ----------
    {
      q: `Which of the following output devices is used to produce large, high-quality line drawings such as building plans for an architect in St. John’s?`,
      options: [`Inkjet printer`, `Plotter`, `Projector`, `Scanner`],
      answer: 1, sec: 'S1',
      why: `Key: B. A plotter is an output device designed to draw large, precise technical drawings such as plans and maps; a scanner is an input device.`
    },
    {
      q: `Which of the following devices can function as BOTH an input device and an output device?<br><br>I. Touchscreen<br>II. Smartphone<br>III. Scanner<br>IV. Speaker`,
      options: [`I and III only`, `III and IV only`, `I and II only`, `I, II and IV only`],
      answer: 2, sec: 'S1',
      why: `Key: C. A touchscreen and a smartphone both accept input (taps, gestures) and display output on the same screen. A scanner is input only and a speaker is output only.`
    },
    {
      q: `Ms Gumbs needs to carry a 2 GB presentation from her office computer to a classroom computer that has NO internet connection. Which storage medium is MOST suitable?`,
      options: [`Cloud storage`, `CD-ROM`, `CD-RW`, `Flash drive`],
      answer: 3, sec: 'S1',
      why: `Key: D. A USB flash drive is portable and easily holds 2 GB. A CD holds only about 700 MB, and cloud storage needs an internet connection.`
    },
    {
      q: `Which type of memory loses its contents when the computer is switched off?`,
      options: [`Flash drive`, `ROM`, `RAM`, `Hard disk`],
      answer: 2, sec: 'S1',
      why: `Key: C. RAM (random access memory) is volatile: it holds data only while the computer has power. ROM, hard disks and flash drives keep their contents.`
    },
    {
      q: `Which of the following is an example of operating system software?`,
      options: [`Microsoft PowerPoint`, `Microsoft Publisher`, `Android`, `Microsoft Excel`],
      answer: 2, sec: 'S1',
      why: `Key: C. Android is an operating system that coordinates a device's hardware and runs apps; Excel, Publisher and PowerPoint are application software.`
    },
    {
      passage: `<p><b>Items 18–19</b> refer to the following scenario.</p><p>Shanice is a data-entry clerk at an insurance office in Holetown. She keys in claim forms for up to six hours a day without a break. She now complains of pain, numbness and tingling in her wrists and fingers.</p>`,
      q: `Which of the following conditions is Shanice MOST likely experiencing?`,
      options: [`Eye strain`, `Repetitive strain injury`, `Neck strain`, `Migraine headache`],
      answer: 1, sec: 'S1',
      why: `Key: B. Pain and tingling in the wrists and fingers caused by long periods of repeated keying are typical of repetitive strain injury (RSI).`
    },
    {
      passage: `<p><b>Items 18–19</b> refer to the following scenario.</p><p>Shanice is a data-entry clerk at an insurance office in English Harbour. She keys in claim forms for up to six hours a day without a break. She now complains of pain, numbness and tingling in her wrists and fingers.</p>`,
      q: `Which of the following measures would help to reduce Shanice's symptoms?<br><br>I. Using a wrist rest<br>II. Taking regular short breaks<br>III. Increasing the brightness of the screen<br>IV. Keeping her wrists level with the keyboard`,
      options: [`I and II only`, `I, II and IV only`, `II and III only`, `I, III and IV only`],
      answer: 1, sec: 'S1',
      why: `Key: B. A wrist rest, regular breaks and level wrists all reduce strain on the wrists. Screen brightness affects the eyes, not the wrists.`
    },
    {
      q: `Which of the following is the BEST way to protect office computers from sudden power spikes during a thunderstorm?`,
      options: [`Install anti-virus software`, `Connect the equipment through a surge protector`, `Fit an anti-glare screen`, `Keep the room air-conditioned`],
      answer: 1, sec: 'S1',
      why: `Key: B. A surge protector shields the computer and peripherals from sudden increases in voltage; the other measures do not deal with power spikes.`
    },
    {
      q: `Which of the following is the MOST environmentally responsible way for a school to dispose of twenty old computer monitors?`,
      options: [`Throw them into a skip behind the school`, `Leave them in a storeroom until space runs out`, `Hand them to an approved e-waste recycler`, `Dump them at the landfill with general garbage`],
      answer: 2, sec: 'S1',
      why: `Key: C. Monitors contain materials that can harm the environment, so they should go to an approved e-waste recycler rather than a landfill or skip.`
    },
    // ---------- Items 22–33: Sections III and IV ----------
    {
      q: `Which word processing feature combines a standard letter with a list of names and addresses to produce a personalised copy for every customer?`,
      options: [`Track Changes`, `Mail merge`, `Macro`, `AutoCorrect`],
      answer: 1, sec: 'S3',
      why: `Key: B. Mail merge combines a main document with a data source (such as a spreadsheet or database list) to produce personalised letters, envelopes or labels.`
    },
    {
      q: `Which feature should be used so that the company name and page number appear at the bottom of EVERY page of a report?`,
      options: [`Footnote`, `Header`, `Footer`, `Endnote`],
      answer: 2, sec: 'S4',
      why: `Key: C. A footer is text placed in the bottom margin that repeats on every page; a header repeats in the top margin.`
    },
    {
      q: `Kareem wants each new chapter of his report to begin at the top of a new page, even if text is added to the chapter before it. Which of the following should he insert before each chapter heading?`,
      options: [`Page break`, `Text-wrapping break`, `Line break`, `Column break`],
      answer: 0, sec: 'S4',
      why: `Key: A. A page break forces the text that follows to start on a new page, no matter how much text comes before it.`
    },
    {
      q: `Which type of tab stop should be set to line up a column of money amounts such as 1,250.75 and 98.50 by their decimal points?`,
      options: [`Left tab`, `Right tab`, `Decimal tab`, `Centre tab`],
      answer: 2, sec: 'S4',
      why: `Key: C. A decimal tab aligns figures on the decimal point, which is the standard way of displaying money amounts in a column.`
    },
    {
      passage: `<div style="border:1px solid">
<p><b>EXHIBIT</b></p>
<p>A 12-page tourist brochure has been typed for a tour company. The supervisor notices that the name of the capital has been spelt ‘Phillipsburg’ in 37 places. It should be ‘Philipsburg’.</p>
</div>`,
      q: `Which feature would correct ALL 37 errors in the QUICKEST way?`,
      options: [`Word Count`, `Find and Replace`, `Format Painter`, `Thesaurus`],
      answer: 1, sec: 'S4',
      why: `Key: B. Find and Replace searches for every occurrence of ‘Phillipsburg’ and replaces it with ‘Philipsburg’ in one operation.`
    },
    {
      q: `Which text wrapping option allows a paragraph to flow closely around the OUTLINE of an irregularly shaped logo?`,
      options: [`Behind text`, `Top and bottom`, `In line with text`, `Tight`],
      answer: 3, sec: 'S4',
      why: `Key: D. Tight wrapping makes the text follow the outline of the graphic itself rather than a rectangular box around it.`
    },
    {
      passage: `<p><b>Items 28–30</b> refer to the following spreadsheet extract, which shows a stationery order.</p>
<table style="border:1px solid">
<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead>
<tbody>
<tr><th>1</th><td>Item</td><td>Qty</td><td>Unit Price (US$)</td><td>Total (US$)</td></tr>
<tr><th>2</th><td>Printer paper (ream)</td><td style="text-align:right">12</td><td style="text-align:right">6.50</td><td></td></tr>
<tr><th>3</th><td>Toner cartridge</td><td style="text-align:right">3</td><td style="text-align:right">48.00</td><td></td></tr>
<tr><th>4</th><td>Box of pens</td><td style="text-align:right">5</td><td style="text-align:right">4.25</td><td></td></tr>
<tr><th>5</th><td>Stapler</td><td style="text-align:right">2</td><td style="text-align:right">11.75</td><td></td></tr>
<tr><th>6</th><td>File folders (pack)</td><td style="text-align:right">8</td><td style="text-align:right">7.00</td><td></td></tr>
<tr><th>7</th><td>Total</td><td></td><td></td><td></td></tr>
</tbody></table>`,
      q: `Which formula in cell B7 will calculate the total number of items ordered?`,
      options: [`=B2+B6`, `=COUNT(B2:B6)`, `=SUM(B2:C6)`, `=SUM(B2:B6)`],
      answer: 3, sec: 'S4',
      why: `Key: D. =SUM(B2:B6) adds the quantities 12 + 3 + 5 + 2 + 8 = 30. COUNT only counts the cells, and B2:C6 would wrongly add the prices too.`
    },
    {
      passage: `<p><b>Items 28–30</b> refer to the following spreadsheet extract, which shows a stationery order.</p>
<table style="border:1px solid">
<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead>
<tbody>
<tr><th>1</th><td>Item</td><td>Qty</td><td>Unit Price (US$)</td><td>Total (US$)</td></tr>
<tr><th>2</th><td>Printer paper (ream)</td><td style="text-align:right">12</td><td style="text-align:right">6.50</td><td></td></tr>
<tr><th>3</th><td>Toner cartridge</td><td style="text-align:right">3</td><td style="text-align:right">48.00</td><td></td></tr>
<tr><th>4</th><td>Box of pens</td><td style="text-align:right">5</td><td style="text-align:right">4.25</td><td></td></tr>
<tr><th>5</th><td>Stapler</td><td style="text-align:right">2</td><td style="text-align:right">11.75</td><td></td></tr>
<tr><th>6</th><td>File folders (pack)</td><td style="text-align:right">8</td><td style="text-align:right">7.00</td><td></td></tr>
<tr><th>7</th><td>Total</td><td></td><td></td><td></td></tr>
</tbody></table>`,
      q: `Which formula in cell C8 would display the HIGHEST unit price in the order?`,
      options: [`=MAX(C2:C6)`, `=MIN(C2:C6)`, `=AVERAGE(C2:C6)`, `=COUNT(C2:C6)`],
      answer: 0, sec: 'S4',
      why: `Key: A. The MAX function returns the largest value in the range C2:C6, which is 48.00.`
    },
    {
      passage: `<p><b>Items 28–30</b> refer to the following spreadsheet extract, which shows a stationery order.</p>
<table style="border:1px solid">
<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead>
<tbody>
<tr><th>1</th><td>Item</td><td>Qty</td><td>Unit Price (US$)</td><td>Total (US$)</td></tr>
<tr><th>2</th><td>Printer paper (ream)</td><td style="text-align:right">12</td><td style="text-align:right">6.50</td><td></td></tr>
<tr><th>3</th><td>Toner cartridge</td><td style="text-align:right">3</td><td style="text-align:right">48.00</td><td></td></tr>
<tr><th>4</th><td>Box of pens</td><td style="text-align:right">5</td><td style="text-align:right">4.25</td><td></td></tr>
<tr><th>5</th><td>Stapler</td><td style="text-align:right">2</td><td style="text-align:right">11.75</td><td></td></tr>
<tr><th>6</th><td>File folders (pack)</td><td style="text-align:right">8</td><td style="text-align:right">7.00</td><td></td></tr>
<tr><th>7</th><td>Total</td><td></td><td></td><td></td></tr>
</tbody></table>`,
      q: `The formula =B3*C3 is entered in cell D3. What value will be displayed in D3?`,
      options: [`51.00`, `144.00`, `16.00`, `96.00`],
      answer: 1, sec: 'S4',
      why: `Key: B. B3*C3 multiplies the quantity by the unit price: 3 × 48.00 = 144.00.`
    },
    {
      q: `A school is setting up a database table of its students. Which field is MOST suitable as the primary key?`,
      options: [`Date of birth`, `Surname`, `Student ID number`, `Form class`],
      answer: 2, sec: 'S3',
      why: `Key: C. A primary key must uniquely identify each record. Two students may share a surname, birthday or form class, but each has a different ID number.`
    },
    {
      q: `A database object used to extract ONLY those records that meet stated criteria, such as all customers who live in Holetown, is a`,
      options: [`form`, `table`, `query`, `report`],
      answer: 2, sec: 'S3',
      why: `Key: C. A query retrieves the subset of records that match given criteria. A form is for entering data and a report presents it.`
    },
    {
      q: `Which presentation feature allows a change to the font and logo on EVERY slide to be made in one place?`,
      options: [`Slide sorter view`, `Custom animation`, `Rehearse timings`, `Slide master`],
      answer: 3, sec: 'S3',
      why: `Key: D. Editing the slide master applies the design change to all slides based on it at once.`
    },
    // ---------- Items 34–42: Sections V, VI and VII ----------
    {
      q: `In a semi-blocked letter, which of the following parts are normally positioned towards the RIGHT of the page?`,
      options: [`The date and the complimentary close`, `The reference and the inside address`, `The subject heading and the enclosure notation`, `The inside address and the salutation`],
      answer: 0, sec: 'S5',
      why: `Key: A. A semi-blocked letter keeps its paragraphs at the left margin like a blocked letter, but the date and the closing are indented towards the right.`
    },
    {
      passage: `<div style="border:1px solid">
<p><b>EXHIBIT</b></p>
<p>14 March 2026</p>
<p>The Manager<br>English Harbour Office Furniture Ltd<br>Market Street<br>English Harbour<br>Antigua</p>
<p>Dear Sir or Madam</p>
<p><b>ORDER FOR TEN ERGONOMIC CHAIRS</b></p>
<p>Please supply ten adjustable office chairs, as listed in your current catalogue …</p>
</div>`,
      q: `Which complimentary close should be used to end the letter in the extract above?`,
      options: [`Yours faithfully`, `Best wishes`, `Sincerely yours`, `Yours sincerely`],
      answer: 0, sec: 'S5',
      why: `Key: A. When the salutation is “Dear Sir or Madam” the reader is not addressed by name, so the formal close “Yours faithfully” is used.`
    },
    {
      q: `Which of the following should appear in the continuation heading at the top of the second page of a two-page business letter?<br><br>I. The recipient's name<br>II. The page number<br>III. The date<br>IV. The sender's telephone number`,
      options: [`I and II only`, `II and III only`, `I, II and III only`, `I, II, III and IV`],
      answer: 2, sec: 'S5',
      why: `Key: C. A continuation heading shows the recipient's name, the page number and the date. The sender's telephone number is already in the letterhead on page 1.`
    },
    {
      q: `A letter to the Human Resources Manager gives details of an employee's medical leave and should be opened ONLY by the addressee. Which special notation should be typed on the envelope?`,
      options: [`PLEASE FORWARD`, `URGENT`, `CONFIDENTIAL`, `BY HAND`],
      answer: 2, sec: 'S5',
      why: `Key: C. CONFIDENTIAL shows that the contents are sensitive and must be opened only by the named addressee. URGENT only signals that prompt action is needed.`
    },
    {
      q: `A document in which a landlord in Grand Anse allows a tenant to occupy an apartment for 12 months in return for monthly rent is BEST described as a`,
      options: [`conveyance`, `endorsement`, `lease`, `will`],
      answer: 2, sec: 'S6',
      why: `Key: C. A lease sets out the terms on which the lessor allows the lessee to use property for a stated period, usually for rent. A conveyance transfers ownership.`
    },
    {
      q: `Which of the following is NOT normally included in a memorandum?`,
      options: [`The inside address`, `TO and FROM headings`, `The subject heading`, `The date`],
      answer: 0, sec: 'S5',
      why: `Key: A. A memo is internal, so it opens with TO, FROM, DATE and SUBJECT headings and does not need an inside address.`
    },
    {
      passage: `<div style="border:1px solid">
<p><b>EXHIBIT</b></p>
<p style="text-align:center"><b>GROS ISLET MARINE SUPPLIES LTD<br>SPORTS AND SOCIAL CLUB</b></p>
<p>A meeting of the Committee will be held in the Board Room on Thursday 12 March 2026 at 4:00 p.m.</p>
<p style="text-align:center"><b>AGENDA</b></p>
<ol><li>Apologies for absence</li><li>Minutes of the last meeting</li><li>Matters arising from the minutes</li><li>Treasurer's report</li><li>Plans for the Family Fun Day</li><li>Any other business</li><li>Date of next meeting</li></ol>
<p>D. Hodge<br>Secretary</p>
</div>`,
      q: `The document in the exhibit above is BEST described as`,
      options: [`a list of action items`, `a chairman's agenda`, `the minutes of a meeting`, `a notice and agenda`],
      answer: 3, sec: 'S5',
      why: `Key: D. It gives advance notice of the date, time and venue of a meeting and lists the items to be discussed, so it is a notice and agenda. It has no record of decisions (minutes) and no notes for the chair.`
    },
    {
      passage: `<div style="border:1px solid">
<p><b>EXHIBIT</b></p>
<p style="text-align:center"><b>PORTSMOUTH CREDIT UNION</b><br>Account: Savings · Statement period: 1–31 March 2026</p>
<table style="border:1px solid">
<thead><tr><th>Date</th><th>Details</th><th>Debit (US$)</th><th>Credit (US$)</th><th>Balance (US$)</th></tr></thead>
<tbody>
<tr><td>1 Mar</td><td>Balance brought forward</td><td></td><td></td><td style="text-align:right">1,500.00</td></tr>
<tr><td>2 Mar</td><td>Cash deposit</td><td></td><td style="text-align:right">750.00</td><td style="text-align:right">2,250.00</td></tr>
<tr><td>5 Mar</td><td>Cheque 004127</td><td style="text-align:right">320.00</td><td></td><td style="text-align:right">1,930.00</td></tr>
<tr><td>9 Mar</td><td>ATM withdrawal, Portsmouth</td><td style="text-align:right">200.00</td><td></td><td style="text-align:right">1,730.00</td></tr>
<tr><td>15 Mar</td><td>Salary credit</td><td></td><td style="text-align:right">1,850.00</td><td style="text-align:right">3,580.00</td></tr>
</tbody></table>
</div>`,
      q: `The document in the exhibit above is an example of`,
      options: [`a receipt`, `a bank statement`, `a trial balance`, `an invoice`],
      answer: 1, sec: 'S6',
      why: `Key: B. A bank statement is issued by a bank or credit union and lists every transaction on an account for a period, with the running balance.`
    },
    {
      q: `Mrs Brooks wants to e-mail a price list to 35 customers who do not know one another, without any customer seeing the other addresses. In which field should she enter the customers' addresses?`,
      options: [`Bcc`, `Subject`, `Cc`, `To`],
      answer: 0, sec: 'S7',
      why: `Key: A. Addresses in the Bcc (blind carbon copy) field are hidden from the other recipients, which protects the customers' privacy.`
    },
    // ---------- Items 43–51: Section VIII ----------
    {
      q: `A handwritten timesheet that a worker completes before the hours are keyed into the payroll system is an example of a`,
      options: [`turnaround document`, `backup document`, `source document`, `machine-readable document`],
      answer: 2, sec: 'S8',
      why: `Key: C. A source document is the original document on which data is first recorded before it is entered into a data processing system.`
    },
    {
      q: `Which of the following are machine-readable documents?<br><br>I. A barcoded product label<br>II. An OMR answer sheet<br>III. A handwritten letter of complaint<br>IV. A QR code on a flyer`,
      options: [`I and II only`, `II and III only`, `I and IV only`, `I, II and IV only`],
      answer: 3, sec: 'S8',
      why: `Key: D. Barcodes, OMR sheets and QR codes can be read directly by a scanning device. A handwritten letter must be keyed in by a person.`
    },
    {
      passage: `<div style="border:1px solid">
<p><b>EXHIBIT</b></p>
<p>A file is saved in the following location:</p>
<p><b>C:\\School\\Business\\EDPM\\Term1\\Letters\\2026-03-14_Brooks_Quotation.docx</b></p>
</div>`,
      q: `In the file path shown, ‘Term1’ represents`,
      options: [`the file type`, `the drive`, `the file name`, `a sub-folder`],
      answer: 3, sec: 'S8',
      why: `Key: D. ‘Term1’ is a folder nested inside the ‘EDPM’ folder, so it is a sub-folder. ‘C:’ is the drive and ‘.docx’ shows the file type.`
    },
    {
      q: `Which of the following file names follows good practice AND will sort correctly by date?`,
      options: [`New letter FINAL final.docx`, `Document1.docx`, `14 March letter.docx`, `2026-03-14_Brooks_Quotation.docx`],
      answer: 3, sec: 'S8',
      why: `Key: D. A name that starts with the date in YYYY-MM-DD form and then describes the content is clear and sorts in date order.`
    },
    {
      q: `The accounts office at a St. George’s hardware store wants sales staff to be able to open the price list, but never to save any changes to it. Which file integrity measure is MOST appropriate?`,
      options: [`Encryption`, `Compression`, `Archiving`, `Read-only access`],
      answer: 3, sec: 'S8',
      why: `Key: D. Read-only access lets users view a file's content but prevents them from saving changes to it.`
    },
    {
      q: `Gros Islet Tours backs up its files every evening to an external hard drive kept on the shelf beside the office server. Why is this arrangement still risky?`,
      options: [`Backups are only valid when they are printed`, `Fire or flooding in the office could destroy both copies`, `External hard drives cannot store spreadsheets`, `The backup is made too often to be useful`],
      answer: 1, sec: 'S8',
      why: `Key: B. Because the backup is kept in the same place as the original, a single physical disaster could destroy both. A copy should also be kept off-site or in the cloud.`
    },
    {
      q: `Moving completed files that are rarely used out of active storage and into organised long-term storage is called`,
      options: [`disposal`, `archiving`, `formatting`, `encryption`],
      answer: 1, sec: 'S8',
      why: `Key: B. Archiving keeps older records for future reference while keeping active storage efficient. Disposal destroys records.`
    },
    {
      q: `Information such as the date a file was created, the date it was last modified and the name of its owner is known as`,
      options: [`metadata`, `versioning`, `a template`, `encryption`],
      answer: 0, sec: 'S8',
      why: `Key: A. Metadata is data about a file, rather than its content, and it helps trace who created or changed a document and when.`
    },
    {
      q: `Which of the following are CYBER security measures for protecting files?<br><br>I. A firewall<br>II. Strong passwords<br>III. A fireproof cabinet<br>IV. Encryption`,
      options: [`I and II only`, `II and III only`, `I, II and IV only`, `I, III and IV only`],
      answer: 2, sec: 'S8',
      why: `Key: C. Firewalls, passwords and encryption protect digital files from unauthorised access. A fireproof cabinet is a physical security measure.`
    },
    // ---------- Items 52–60: Section IX ----------
    {
      q: `Copying paragraphs from a website into an SBA report without quotation marks or a citation is an example of`,
      options: [`paraphrasing`, `plagiarism`, `netiquette`, `fair referencing`],
      answer: 1, sec: 'S9',
      why: `Key: B. Plagiarism is using another person's words or ideas without giving them appropriate credit.`
    },
    {
      q: `Danielle hands in an essay she wrote for another subject last year as her new assignment, without telling her teacher. This is BEST described as`,
      options: [`correct citation`, `paraphrasing`, `self-plagiarism`, `an economic right`],
      answer: 2, sec: 'S9',
      why: `Key: C. Reusing one's own earlier work as if it were new, without acknowledging it, is self-plagiarism.`
    },
    {
      q: `A magazine pays a Grand Anse photographer to use her picture of Gouyave, but then alters the colours and crops out her signature without her consent. Which of the photographer's rights has been violated?`,
      options: [`Moral rights`, `Trademark rights`, `Patent rights`, `Economic rights`],
      answer: 0, sec: 'S9',
      why: `Key: A. She was paid, so her economic rights were respected; altering the work without consent harms its integrity, which breaches her moral rights.`
    },
    {
      q: `The brand name and logo used to identify a company's products are protected as a`,
      options: [`patent`, `trademark`, `literary work`, `design`],
      answer: 1, sec: 'S9',
      why: `Key: B. Trademarks protect symbols, names and logos that identify a business or its products. Patents protect inventions.`
    },
    {
      q: `Mr Lake finds a diagram released under a Creative Commons licence that allows reuse with attribution. What must he do to use it ethically in his class handout?`,
      options: [`Remove the creator's name and add his own`, `Pay a royalty to the website before using it`, `Use it without credit because it is free`, `Use it and credit the creator as the licence requires`],
      answer: 3, sec: 'S9',
      why: `Key: D. A Creative Commons attribution licence allows free reuse provided the creator is credited in the way the licence states.`
    },
    {
      q: `Which of the following are examples of good netiquette?<br><br>I. Typing the whole message in capital letters<br>II. Checking the recipients before pressing Send<br>III. Forwarding a colleague's private e-mail without permission<br>IV. Using a clear, specific subject line`,
      options: [`I and II only`, `II and IV only`, `I, III and IV only`, `II, III and IV only`],
      answer: 1, sec: 'S9',
      why: `Key: B. Checking recipients and writing a clear subject line are courteous practices. Typing in capitals reads as shouting, and forwarding private mail without permission breaches trust.`
    },
    {
      q: `Jerome files all the invoices correctly and on time even when his supervisor is away from the office. Which work attitude does this show?`,
      options: [`Good grooming`, `Team spirit`, `Courtesy`, `Individual responsibility`],
      answer: 3, sec: 'S9',
      why: `Key: D. Completing tasks reliably and to standard without anyone watching shows individual responsibility (working without supervision).`
    },
    {
      q: `Which of the following is the BEST way for a student to make sure an assignment meets acceptable standards and is handed in on time?`,
      options: [`Ask a friend to complete the difficult parts`, `Submit the first draft without proofreading it`, `Plan the tasks, set interim deadlines and leave time to proofread`, `Begin the work on the night before the deadline`],
      answer: 2, sec: 'S9',
      why: `Key: C. Effective time management, with planned stages and time left for review, lets work be checked and submitted by the deadline.`
    },
    {
      q: `During a virtual staff meeting, which of the following behaviours shows appropriate remote working etiquette?`,
      options: [`Joining fifteen minutes late without notice`, `Muting the microphone when not speaking`, `Eating a meal with the camera switched on`, `Replying to personal text messages during the meeting`],
      answer: 1, sec: 'S9',
      why: `Key: B. Muting when not speaking cuts background noise and shows courtesy to other participants; the other behaviours are unprofessional.`
    }
  ]
}]);
