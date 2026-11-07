// Portfolio (SBA) scenarios: Display (invite, chart) and Legal Work (legal)
// Mark schemes: CXC 34/G/SYLL 24 Exemplars 4, 5 and 6, completed from the mailability guidelines (a)-(g).
window.EDPM_PORTFOLIO = (window.EDPM_PORTFOLIO || []).concat([

/* =====================================================================
   DISPLAY (i): INVITATION WITH A MENU OR PROGRAMME  (KC 1 / APP 4 / IA 0)
   ===================================================================== */
{
  id: 'invite-1',
  el: 'invite',
  title: 'Silver anniversary dinner: invitation with menu',
  org: 'Great Bay Marine Supplies Ltd',
  brief: `<p>Great Bay Marine Supplies Ltd of Pointe Blanche is celebrating 25 years in business. The Managing Director, Mrs. Yvette Carmichael, is hosting a formal dinner for staff, customers and suppliers. She wants one folded card printed on A4 card and folded once: the invitation on the front, the menu inside and the reply details on the back.</p><p>You are the administrative assistant. Use the text below to prepare the invitation with menu in booklet style.</p>`,
  data: `<h4>Page 1: Front cover (invitation)</h4>
<p style="text-align:center">GREAT BAY MARINE SUPPLIES LTD<br>Celebrating 25 Years 2001 – 2026</p>
<p style="text-align:center">The Board of Directors and Management<br>of<br>Great Bay Marine Supplies Ltd<br>request the pleasure of the company of</p>
<p style="text-align:center">..................................................................</p>
<p style="text-align:center">at a<br>SILVER ANNIVERSARY DINNER<br>on Saturday, 21 November 2026<br>at 7.00 p.m.<br>The Harbour Room, Seaview Terrace<br>Pointe Blanche, Sint Maarten</p>
<p style="text-align:center">Dress: Elegant White</p>
<h4>Page 2: Inside left (menu, part 1)</h4>
<p style="text-align:center">MENU</p>
<p style="text-align:center">APPETISER<br>Conch Fritters<br>with lime and garlic dip</p>
<p style="text-align:center">SOUP<br>Creamy Pumpkin and Coconut Soup<br>served with warm Johnny cakes</p>
<p style="text-align:center">SALAD<br>Garden Greens with Mango and Toasted Cashews<br>passion fruit dressing</p>
<h4>Page 3: Inside right (menu, part 2)</h4>
<p style="text-align:center">MAIN COURSE<br>(choice of)<br>Grilled Red Snapper with Creole Sauce<br>or<br>Jerk Chicken Breast with Mango Salsa<br>or<br>Stuffed Christophene with Callaloo (vegetarian)</p>
<p style="text-align:center">served with<br>Rice and Pigeon Peas · Fried Sweet Plantain · Steamed Seasonal Vegetables</p>
<p style="text-align:center">DESSERT<br>Guavaberry Rum Cake<br>or<br>Coconut Tart with Vanilla Ice Cream</p>
<p style="text-align:center">BEVERAGES<br>Guavaberry Punch · Soursop Juice · Sparkling Water<br>Coffee and Tea</p>
<h4>Page 4: Back cover (reply)</h4>
<p style="text-align:center">RSVP by Friday, 6 November 2026<br>Ms. Arlene Powell, Executive Assistant<br>Telephone: +1 (721) 542 3187<br>E-mail: events@greatbaymarine.sx</p>
<p style="text-align:center">Kindly indicate your choice of main course when replying.</p>
<p style="text-align:center">Great Bay Marine Supplies Ltd<br>18 Pointe Blanche Road, Pointe Blanche, Sint Maarten</p>`,
  tasks: [
    `Open a new word processing document. Set the page to A4, landscape orientation, and apply <b>Book fold</b> (Page Setup, Multiple pages) so that the document prints as a four-page A5 booklet.`,
    `Set all margins to 1.27 cm (0.5 inch).`,
    `Key in the text exactly as shown, placing each section on the page indicated (front cover, inside left, inside right, back cover). Insert a page break between pages.`,
    `Centre all text horizontally. Centre the text of each page vertically or space it evenly so that each page looks balanced.`,
    `Use a decorative font of at least 26 pt for SILVER ANNIVERSARY DINNER, and a plain, easy-to-read font of 12–14 pt for the menu items. Display course headings (APPETISER, SOUP, SALAD, MAIN COURSE, DESSERT, BEVERAGES) in bold capitals.`,
    `Insert a suitable nautical or celebration graphic on the front cover. Do not let it cover any text.`,
    `Apply an art border (Page Borders, Art) to every page. Choose a border that suits a formal silver anniversary.`,
    `Proofread carefully. Check every date, time, name, telephone number and e-mail address against the copy.`,
    `Add a footer with your name and the label <i>Invitation with a Menu</i>. Save the document as <b>invitation with menu</b> and print it double-sided so that it folds into a booklet.`
  ],
  check: [
    { c: 'Booklet style: A4 landscape with Book fold, four A5 pages in the correct order (invitation on the front, menu inside, RSVP on the back)', m: 1, p: 'KC' },
    { c: 'Appropriate use of art border on every page, suited to a formal anniversary dinner', m: 1, p: 'APP' },
    { c: 'Invitation complete and accurate: host, guest line, occasion, day and date, time, venue, dress code and RSVP details (mailability e)', m: 1, p: 'APP' },
    { c: 'Menu displayed in the correct course order with centred, consistent headings and fonts, and a graphic that does not obscure text, so the card is easy to read (mailability d, g)', m: 1, p: 'APP' },
    { c: 'Free of typographical, spelling, grammatical and punctuation errors; dates, times and numbers typed correctly (mailability a, b, c, f)', m: 1, p: 'APP' }
  ],
  label: 'Display: Invitation with a Menu (booklet style) using Word Processing Software',
  tip: `Print one test copy on plain paper and fold it before printing on card. If the menu appears on the outside, the page order or the duplex flip setting is wrong. "Flip on short edge" is usually correct for Book fold.`
},

{
  id: 'invite-2',
  el: 'invite',
  title: 'Business & Technology awards ceremony: invitation with programme',
  org: 'Bayleaf Hill Secondary School, Department of Business & Technology Studies',
  brief: `<p>The Department of Business & Technology Studies at Bayleaf Hill Secondary School holds an awards ceremony every June for its top-performing students. The Head of Department wants a folded invitation that guests will also use as the printed programme for the evening.</p><p>Prepare the invitation with programme in booklet style from the text below.</p>`,
  data: `<h4>Page 1: Front cover (invitation)</h4>
<p style="text-align:center">BAYLEAF HILL SECONDARY SCHOOL<br>Department of Business & Technology Studies</p>
<p style="text-align:center">The Principal, Staff and Students<br>request the honour of your presence at the</p>
<p style="text-align:center">ANNUAL BUSINESS & TECHNOLOGY<br>AWARDS CEREMONY 2026</p>
<p style="text-align:center">Theme: "Skills Today, Leaders Tomorrow"</p>
<p style="text-align:center">Thursday, 18 June 2026<br>6.30 p.m.<br>School Hall, Bayleaf Hill Secondary School<br>Roseau, Dominica</p>
<p style="text-align:center">Dress: Business Attire</p>
<h4>Page 2: Inside left (programme, part 1)</h4>
<p style="text-align:center">PROGRAMME</p>
<table><tbody>
<tr><td>6.30 p.m.</td><td>Arrival of Guests and Musical Interlude</td><td>Student Steel Pan Ensemble</td></tr>
<tr><td>6.45 p.m.</td><td>Opening Prayer</td><td>Ms. Tamara Hazel, Grade 11</td></tr>
<tr><td>6.50 p.m.</td><td>National Anthem: "Isle of Beauty, Isle of Splendour"</td><td>Audience</td></tr>
<tr><td>6.55 p.m.</td><td>Welcome Remarks</td><td>The Principal</td></tr>
<tr><td>7.05 p.m.</td><td>Department Report 2025–2026</td><td>Head of Department, Business & Technology Studies</td></tr>
<tr><td>7.15 p.m.</td><td>Cultural Item: Bélé Dance</td><td>Grade 10 Dance Group</td></tr>
<tr><td>7.25 p.m.</td><td>Feature Address</td><td>Mrs. Gloria Bryson, Managing Director, Caribbean Data Systems Ltd</td></tr>
</tbody></table>
<h4>Page 3: Inside right (programme, part 2)</h4>
<table><tbody>
<tr><td>7.45 p.m.</td><td>Presentation of Awards</td><td>Feature Speaker and Head of Department</td></tr>
<tr><td>8.25 p.m.</td><td>Musical Item: "Rise Up"</td><td>Mr. Jaden Laville, Grade 12</td></tr>
<tr><td>8.30 p.m.</td><td>Vote of Thanks</td><td>Ms. Keisha Arnell, Student Representative</td></tr>
<tr><td>8.35 p.m.</td><td>Closing Remarks</td><td>Deputy Principal</td></tr>
<tr><td>8.40 p.m.</td><td>Refreshments</td><td>Foyer</td></tr>
</tbody></table>
<p style="text-align:center">Master of Ceremonies: Mr. Omari Bell, Grade 12</p>
<h4>Page 4: Back cover (awards and acknowledgements)</h4>
<p style="text-align:center">AWARDS TO BE PRESENTED</p>
<p style="text-align:center">Electronic Document Preparation and Management<br>Principles of Business<br>Principles of Accounts<br>Office Administration<br>Information Technology<br>Economics<br>Most Improved Student<br>Departmental Award for Excellence</p>
<p style="text-align:center">We thank our sponsors:<br>Caribbean Data Systems Ltd · Morne View Credit Union · Roseau Stationery & Supplies</p>
<p style="text-align:center">RSVP by Friday, 5 June 2026<br>Department Secretary · +1 (767) 448 2010</p>`,
  tasks: [
    `Create a new document on A4 paper, landscape orientation, using <b>Book fold</b> so that it prints as a four-page A5 booklet. Set narrow margins of 1.27 cm.`,
    `Key in the text for each page exactly as given. Insert a page break after pages 1, 2 and 3.`,
    `On the front cover, display ANNUAL BUSINESS & TECHNOLOGY AWARDS CEREMONY 2026 in a decorative font of at least 24 pt, in bold. Centre all front-cover text.`,
    `Insert an appropriate graphic (for example a trophy or graduation cap) on the front cover, sized so that it does not crowd the text.`,
    `Set out the programme on pages 2 and 3 as a three-column table (Time, Item, Presenter) with <b>no visible gridlines</b>. Align the times consistently and use the same font and size throughout the programme.`,
    `Display the heading PROGRAMME in bold capitals, centred, above the table on page 2.`,
    `On page 4, centre the list of awards and the sponsors' acknowledgement. Display AWARDS TO BE PRESENTED in bold.`,
    `Apply an art border to all pages.`,
    `Proofread the times, names and titles against the copy. Add your name and the label <i>Invitation with a Programme</i> in the footer, and save the document as <b>awards invitation with programme</b>.`
  ],
  check: [
    { c: 'Booklet style: A4 landscape with Book fold, four A5 pages in the correct order (invitation, programme across pages 2–3, awards and RSVP on the back)', m: 1, p: 'KC' },
    { c: 'Appropriate use of art border on all pages, suited to a formal school ceremony', m: 1, p: 'APP' },
    { c: 'Invitation complete and accurate: hosts, occasion, theme, day and date, time, venue, dress code and RSVP (mailability e)', m: 1, p: 'APP' },
    { c: 'Programme items in the correct time sequence in a borderless table with times aligned and consistent fonts; layout easy to follow (mailability d, g)', m: 1, p: 'APP' },
    { c: 'Free of typographical, spelling and grammatical errors; times (6.30 p.m.), titles and names typed correctly and consistently (mailability a, b, c, f)', m: 1, p: 'APP' }
  ],
  label: 'Display: Invitation with a Programme (booklet style) using Word Processing Software',
  tip: `A table with hidden gridlines is the quickest way to keep times, items and presenters lined up. Tabs often drift when the text wraps. Check that every time uses the same style (6.30 p.m., not 6:30pm).`
},

{
  id: 'invite-3',
  el: 'invite',
  title: 'Wedding reception: invitation with menu',
  org: 'Richardson–Lindo Wedding (private family function)',
  brief: `<p>Mr. and Mrs. Wendell Richardson of Mandeville are hosting their daughter's wedding reception at The Lagoon Terrace, Montego Bay. They want an elegant folded invitation with the reception menu inside, so that guests can choose a main course when they reply.</p><p>Prepare the invitation with menu in booklet style.</p>`,
  data: `<h4>Page 1: Front cover (invitation)</h4>
<p style="text-align:center">Mr. and Mrs. Wendell Richardson<br>request the pleasure of your company<br>at the wedding reception of their daughter</p>
<p style="text-align:center">Nadia Celeste<br>to<br>Mr. Marcus Anthony Lindo</p>
<p style="text-align:center">on Saturday, 19 December 2026<br>at 5.00 p.m.<br>The Lagoon Terrace<br>Gloucester Avenue, Montego Bay, Jamaica</p>
<p style="text-align:center">Dress: Formal · Colours: Ivory and Teal</p>
<h4>Page 2: Inside left (reception menu, part 1)</h4>
<p style="text-align:center">RECEPTION MENU</p>
<p style="text-align:center">COCKTAIL HOUR<br>Saltfish Accras · Mini Chicken Pâtés · Plantain Chips with Avocado Dip</p>
<p style="text-align:center">STARTER<br>Shrimp and Mango Cocktail<br>with lime and coriander</p>
<p style="text-align:center">SOUP<br>Callaloo and Coconut Soup</p>
<h4>Page 3: Inside right (reception menu, part 2)</h4>
<p style="text-align:center">MAIN COURSE<br>(please select one when replying)<br>A. Roast Beef Tenderloin with Red Wine Sauce<br>B. Baked Mahi-Mahi with Lemon Butter<br>C. Vegetable Lasagne (vegetarian)</p>
<p style="text-align:center">served with<br>Garlic Mashed Potatoes · Rice and Red Beans · Honey-glazed Carrots</p>
<p style="text-align:center">DESSERT<br>Wedding Cake<br>Passion Fruit Cheesecake</p>
<p style="text-align:center">BEVERAGES<br>Champagne Toast · Sorrel · Tamarind Juice · Coffee and Tea</p>
<h4>Page 4: Back cover (reply)</h4>
<p style="text-align:center">RSVP by Saturday, 21 November 2026<br>Mrs. Cynthia Richardson<br>Telephone: +1 (876) 953 2846<br>E-mail: richardsonlindowedding@mail.jm</p>
<p style="text-align:center">Please state the number of guests and the main course choice (A, B or C) for each guest.</p>
<p style="text-align:center">"Two are better than one." Ecclesiastes 4:9</p>`,
  tasks: [
    `Set up an A4 landscape document with <b>Book fold</b> to create a four-page A5 booklet. Use margins of 1.27 cm.`,
    `Key in the text exactly as shown on the pages indicated, inserting page breaks between pages.`,
    `Display the names of the bride and groom in an elegant script font of at least 28 pt. Use a matching plain font (12–14 pt) for the rest of the text.`,
    `Centre all text horizontally on every page and make sure each page is evenly balanced from top to bottom.`,
    `Display each course heading in bold small capitals and keep the same spacing between all courses.`,
    `Use the wedding colours (ivory and teal) for headings or graphics. Insert one tasteful graphic (rings, flowers or doves) on the front cover.`,
    `Apply an art border to every page.`,
    `Proofread names, dates, times and contact details carefully. Insert your name and the label <i>Invitation with a Menu</i> in the footer, and save as <b>wedding invitation with menu</b>.`
  ],
  check: [
    { c: 'Booklet style: Book fold on A4 landscape, four A5 pages in the correct order (invitation, menu across the centre spread, RSVP on the back)', m: 1, p: 'KC' },
    { c: 'Appropriate use of art border on every page, suited to a wedding', m: 1, p: 'APP' },
    { c: 'Invitation complete and accurate: hosts, bride and groom, day and date, time, venue, dress code, RSVP date and contact (mailability e)', m: 1, p: 'APP' },
    { c: 'Menu courses in the correct sequence with main-course options lettered A–C; consistent bold small-capital headings and even spacing; easy to read (mailability d, g)', m: 1, p: 'APP' },
    { c: 'Free of typographical, spelling, grammatical and punctuation errors, including accented words (Pâtés) and the scripture reference (mailability a, b, c, f)', m: 1, p: 'APP' }
  ],
  label: 'Display: Invitation with a Menu (booklet style) using Word Processing Software',
  tip: `Script fonts are hard to read in long lines. Keep them for the couple's names only. To type the accent in Pâtés, use Insert, Symbol, or type the word with AutoCorrect.`
},

{
  id: 'invite-4',
  el: 'invite',
  title: 'Emancipation Day cultural evening: invitation with programme',
  org: 'Sucker Garden Community Council',
  brief: `<p>The Sucker Garden Community Council holds a cultural evening each year to mark Emancipation Day on 1 July. The Council Secretary wants a folded invitation for invited guests that also serves as the programme for the evening.</p><p>Prepare the invitation with programme in booklet style.</p>`,
  data: `<h4>Page 1: Front cover (invitation)</h4>
<p style="text-align:center">SUCKER GARDEN COMMUNITY COUNCIL</p>
<p style="text-align:center">cordially invites you to its</p>
<p style="text-align:center">EMANCIPATION DAY CULTURAL EVENING</p>
<p style="text-align:center">"Remember, Celebrate, Rise"</p>
<p style="text-align:center">Wednesday, 1 July 2026<br>7.00 p.m. to 9.30 p.m.<br>Sucker Garden Community Grounds<br>Sucker Garden Road, Sint Maarten</p>
<p style="text-align:center">Dress: Cultural Wear or Casual Elegant</p>
<h4>Page 2: Inside left (programme, part 1)</h4>
<p style="text-align:center">PROGRAMME</p>
<p style="text-align:center">Chairperson: Mrs. Avril Gumbs, President, Sucker Garden Community Council</p>
<table><tbody>
<tr><td>7.00 p.m.</td><td>Drum Call and Procession</td><td>Rhythms of Freedom Drummers</td></tr>
<tr><td>7.10 p.m.</td><td>Libation and Prayer</td><td>Elder Clifton Hazel</td></tr>
<tr><td>7.15 p.m.</td><td>Island Song: "O Sweet Saint Martin's Land"</td><td>Audience</td></tr>
<tr><td>7.20 p.m.</td><td>Welcome</td><td>Chairperson</td></tr>
<tr><td>7.30 p.m.</td><td>Lecture: "The Road to Freedom, 1848–1863"</td><td>Dr. Leonora Baly, Historian</td></tr>
<tr><td>7.55 p.m.</td><td>Ponum Dance</td><td>Sucker Garden Youth Folk Group</td></tr>
</tbody></table>
<h4>Page 3: Inside right (programme, part 2)</h4>
<table><tbody>
<tr><td>8.10 p.m.</td><td>Poetry: "Chains to Choices"</td><td>Ms. Shanice Duzant</td></tr>
<tr><td>8.20 p.m.</td><td>Storytelling: Tales from the Estates</td><td>Mr. Elroy Flanders</td></tr>
<tr><td>8.40 p.m.</td><td>Folk Songs Medley</td><td>Community Choir</td></tr>
<tr><td>9.00 p.m.</td><td>Recognition of Community Elders</td><td>Council Executive</td></tr>
<tr><td>9.20 p.m.</td><td>Vote of Thanks</td><td>Council Secretary</td></tr>
<tr><td>9.30 p.m.</td><td>Johnny Cakes, Saltfish and Bush Tea</td><td>All</td></tr>
</tbody></table>
<h4>Page 4: Back cover</h4>
<p style="text-align:center">Emancipation on the Dutch side of the island was proclaimed on 1 July 1863.<br>Tonight we honour those who fought for freedom.</p>
<p style="text-align:center">RSVP by Friday, 19 June 2026<br>Council Secretary · +1 (721) 542 6615<br>suckergardencouncil@mail.sx</p>`,
  tasks: [
    `Set up an A4 landscape document using <b>Book fold</b> to print as a four-page A5 booklet. Set narrow margins (1.27 cm).`,
    `Key in the text for each page as shown, with a page break after each of pages 1, 2 and 3.`,
    `Display EMANCIPATION DAY CULTURAL EVENING in bold capitals of at least 24 pt. Display the theme in italics.`,
    `Insert a relevant graphic (for example a drum, broken chain or flag colours) on the front cover.`,
    `Set out the programme as a three-column table with hidden gridlines. Keep the times aligned and use one font and size for all programme items.`,
    `Centre the heading PROGRAMME and the chairperson's line above the table on page 2.`,
    `Apply an art border to all four pages. Choose colours that suit the occasion.`,
    `Proofread every time, name and date. Add your name and the label <i>Invitation with a Programme</i> in the footer. Save as <b>emancipation invitation with programme</b>.`
  ],
  check: [
    { c: 'Booklet style: Book fold on A4 landscape, four A5 pages in the correct order (invitation, programme across pages 2–3, back cover with RSVP)', m: 1, p: 'KC' },
    { c: 'Appropriate use of art border on all pages, in colours that suit the occasion', m: 1, p: 'APP' },
    { c: 'Invitation complete and accurate: host, occasion, theme, day and date, start and end times, venue, dress and RSVP (mailability e)', m: 1, p: 'APP' },
    { c: 'Programme items in the correct time order in a borderless table with times aligned and consistent fonts; layout easy to follow (mailability d, g)', m: 1, p: 'APP' },
    { c: 'Free of typographical, spelling, grammatical and punctuation errors; dates, years and times typed correctly (mailability a, b, c, f)', m: 1, p: 'APP' }
  ],
  label: 'Display: Invitation with a Programme (booklet style) using Word Processing Software',
  tip: `Check the years: 1848–1863 needs an en dash, and the back-cover date is 1863. Ask a classmate to read your programme against the copy aloud. This is the quickest way to catch a wrong time.`
},

{
  id: 'invite-5',
  el: 'invite',
  title: 'Seniors\' Christmas luncheon: invitation with menu',
  org: 'Island Breeze Credit Union',
  brief: `<p>Every December, Island Breeze Credit Union hosts a Christmas luncheon for senior members of the Stoney Ground community in Anguilla. The Marketing Officer wants a folded invitation with the traditional Christmas menu inside. Many guests are elderly, so the text must be large and easy to read.</p><p>Prepare the invitation with menu in booklet style.</p>`,
  data: `<h4>Page 1: Front cover (invitation)</h4>
<p style="text-align:center">ISLAND BREEZE CREDIT UNION</p>
<p style="text-align:center">The Board and Staff<br>warmly invite you to our</p>
<p style="text-align:center">SENIORS' CHRISTMAS LUNCHEON</p>
<p style="text-align:center">Saturday, 12 December 2026<br>12.30 p.m.<br>Stoney Ground Community Hall<br>Stoney Ground, Anguilla</p>
<p style="text-align:center">Transport available on request</p>
<h4>Page 2: Inside left (menu, part 1)</h4>
<p style="text-align:center">CHRISTMAS MENU</p>
<p style="text-align:center">WELCOME DRINKS<br>Sorrel · Rum Punch (non-alcoholic available) · Ginger Beer</p>
<p style="text-align:center">STARTER<br>Pumpkin Fritters with Cinnamon Sugar</p>
<p style="text-align:center">SOUP<br>Red Pea Soup with Dumplings</p>
<h4>Page 3: Inside right (menu, part 2)</h4>
<p style="text-align:center">MAIN COURSE<br>Baked Christmas Ham with Pineapple Glaze<br>Roast Turkey with Herb Stuffing<br>Stewed Codfish (pescatarian option)</p>
<p style="text-align:center">SIDES<br>Rice and Pigeon Peas · Potato Salad · Macaroni Pie · Coleslaw</p>
<p style="text-align:center">DESSERT<br>Black Fruit Cake · Coconut Tart · Bread Pudding with Rum Sauce</p>
<p style="text-align:center">Coffee · Tea · Bush Tea</p>
<h4>Page 4: Back cover (reply)</h4>
<p style="text-align:center">RSVP by Friday, 4 December 2026<br>Ms. Rochelle Hodge-Bryan, Marketing Officer<br>Telephone: +1 (264) 497 1902<br>E-mail: marketing@islandbreezecu.ai</p>
<p style="text-align:center">Please tell us of any special dietary needs and whether you need transport.</p>
<p style="text-align:center">Island Breeze Credit Union · 30 Albert Lake Drive, The Valley, Anguilla</p>`,
  tasks: [
    `Create an A4 landscape document with <b>Book fold</b> so that it prints as a four-page A5 booklet. Use margins of 1.27 cm.`,
    `Key in the text as shown, putting each page's text on the correct page with page breaks.`,
    `Because the guests are seniors, use a clear sans-serif font of at least 14 pt for all menu items and at least 28 pt for SENIORS' CHRISTMAS LUNCHEON.`,
    `Centre all text and keep equal spacing between the courses.`,
    `Display course headings in bold capitals in a festive colour (red or green) with good contrast against the background.`,
    `Insert one Christmas graphic on the front cover and, if space allows, a small matching graphic on the back cover.`,
    `Apply a festive art border to every page.`,
    `Proofread all dates, times and contact details. Put your name and the label <i>Invitation with a Menu</i> in the footer. Save as <b>christmas luncheon invitation with menu</b>.`
  ],
  check: [
    { c: 'Booklet style: Book fold on A4 landscape, four A5 pages in the correct order (invitation, menu inside, RSVP on the back)', m: 1, p: 'KC' },
    { c: 'Appropriate use of a festive art border on every page', m: 1, p: 'APP' },
    { c: 'Invitation complete and accurate: host, occasion, day and date, time, venue, transport note and RSVP details (mailability e)', m: 1, p: 'APP' },
    { c: 'Menu courses in the correct order; large (14 pt or more), high-contrast, consistent fonts that elderly guests can read easily (mailability d, g)', m: 1, p: 'APP' },
    { c: 'Free of typographical, spelling, grammatical and punctuation errors, including apostrophes (SENIORS\') and times (12.30 p.m.) (mailability a, b, c, f)', m: 1, p: 'APP' }
  ],
  label: 'Display: Invitation with a Menu (booklet style) using Word Processing Software',
  tip: `Think about your reader: for seniors, size and contrast matter more than decoration. Red text on a green background fails, so use dark text on a light background and keep colour for headings only.`
},

/* =====================================================================
   DISPLAY (ii): FLOW CHART OR ORGANISATIONAL CHART  (KC 1 / APP 4 / IA 0)
   ===================================================================== */
{
  id: 'chart-1',
  el: 'chart',
  title: 'Organisational chart of a Rodney Bay resort',
  org: 'Rodney Bay Seaview Resort Ltd',
  brief: `<p>The Human Resources Manager of Rodney Bay Seaview Resort Ltd in St. Lucia is preparing an orientation pack for new staff. She needs an organisational chart that shows the reporting lines from the General Manager down to supervisor level, with each person's name and job title.</p><p>Prepare the organisational chart from the structure below.</p>`,
  data: `<p><b>Title:</b> Organisational Chart of Rodney Bay Seaview Resort Ltd</p>
<p><b>Level 1</b></p>
<ul><li>General Manager: Mr. Howard Lindo
  <ul><li><i>Staff (assistant) position, shown to the side of the General Manager:</i> Executive Assistant: Ms. Renée Joseph</li></ul></li></ul>
<p><b>Level 2</b> (all report to the General Manager)</p>
<ul>
<li>Rooms Division Manager: Mrs. Lorna Webster</li>
<li>Food & Beverage Manager: Mr. Pierre Lavalle</li>
<li>Financial Controller: Mrs. Sunita Ramdas</li>
<li>Human Resources Manager: Ms. Odessa Alexander</li>
</ul>
<p><b>Level 3</b></p>
<table><thead><tr><th>Reports to</th><th>Position and name</th></tr></thead><tbody>
<tr><td>Rooms Division Manager</td><td>Front Office Supervisor: Mr. Jamal Peters</td></tr>
<tr><td>Rooms Division Manager</td><td>Executive Housekeeper: Ms. Ivelisse Santos</td></tr>
<tr><td>Food & Beverage Manager</td><td>Executive Chef: Mr. Dorian Hughes</td></tr>
<tr><td>Food & Beverage Manager</td><td>Restaurant Manager: Ms. Kayla Charles</td></tr>
<tr><td>Financial Controller</td><td>Accounts Supervisor: Mr. Neville Thomas</td></tr>
<tr><td>Financial Controller</td><td>Purchasing Officer: Ms. Delia Fergus</td></tr>
<tr><td>Human Resources Manager</td><td>Training Coordinator: Mr. Kareem Richardson</td></tr>
</tbody></table>`,
  tasks: [
    `Open a new document. Set the paper to A4, <b>landscape</b> orientation, and apply <b>narrow margins</b> (1.27 cm all round).`,
    `Key in the title <b>Organisational Chart of Rodney Bay Seaview Resort Ltd</b> and centre it at the top of the page in bold, 16–18 pt.`,
    `Create the chart using SmartArt (Hierarchy) or Shapes. Use one box for each position. Show the job title on the first line and the person's name on the second line.`,
    `Place the General Manager at the top. Show the Executive Assistant as a staff (assistant) position to the side of the General Manager, not as a manager at Level 2.`,
    `Arrange the four Level 2 managers on one row and each Level 3 position directly beneath its own manager.`,
    `Make all boxes on the same level the same size, shape and colour. Use a darker colour for higher levels.`,
    `Join the boxes with straight connector lines so that every reporting line is clear and no lines cross.`,
    `Make sure the whole chart fits on one page and all text is readable (at least 10 pt).`,
    `Insert your name and the label <i>Organisational Chart</i> in the footer. Save the document as <b>organisational chart</b>.`
  ],
  check: [
    { c: 'Narrow margins (1.27 cm / 0.5 in) applied', m: 1, p: 'KC' },
    { c: 'A4 landscape orientation with the correct layout of the chart: three levels, General Manager at the top, Executive Assistant shown as a staff position, chart fits on one page', m: 1, p: 'APP' },
    { c: 'All 13 positions and names reproduced accurately, each under the correct manager (mailability e)', m: 1, p: 'APP' },
    { c: 'Boxes on each level consistent in size, shape and colour; straight connectors with no crossing lines; easy to read (mailability d, g)', m: 1, p: 'APP' },
    { c: 'Title centred and correct; chart free of typographical and spelling errors, including names with accents (Renée) (mailability a, b, f)', m: 1, p: 'APP' }
  ],
  label: 'Display: Organisational Chart using Word Processing Software',
  tip: `In SmartArt, use Add Shape, then Add Assistant, for the Executive Assistant. Marks are often lost for drawing the assistant as a fifth Level 2 manager.`
},

{
  id: 'chart-2',
  el: 'chart',
  title: 'Flow chart: borrowing a library book',
  org: 'Calabash Point Secondary Library',
  brief: `<p>The school librarian wants a flow chart on the library notice board that shows students and student assistants the steps for borrowing a book. It includes the checks the librarian makes before a book is issued.</p><p>Prepare the flow chart using standard flow chart symbols.</p>`,
  data: `<p><b>Title:</b> Library Book Loan Procedure</p>
<p><b>Steps</b> (symbol in brackets)</p>
<ol>
<li>START (terminator)</li>
<li>Student brings book and student ID card to the loans desk (process)</li>
<li>Does the student have a valid ID card? (decision)
  <ul><li>NO: Refer student to the school office for a replacement ID card (process), then go to END</li>
  <li>YES: go to step 4</li></ul></li>
<li>Librarian opens the student's account in the library system (process)</li>
<li>Does the student have overdue books or unpaid fines? (decision)
  <ul><li>YES: Student returns overdue books or pays fine (process), then return to step 5</li>
  <li>NO: go to step 6</li></ul></li>
<li>Does the student have fewer than 3 books on loan? (decision)
  <ul><li>NO: Inform student that the loan limit has been reached (process), then go to END</li>
  <li>YES: go to step 7</li></ul></li>
<li>Scan book barcode and ID card; system sets due date 14 days ahead (process)</li>
<li>Stamp due date on the date slip (process)</li>
<li>Hand book and ID card to student (process)</li>
<li>END (terminator)</li>
</ol>`,
  tasks: [
    `Set up an A4 page in <b>landscape</b> orientation with <b>narrow margins</b> (1.27 cm).`,
    `Centre the title <b>LIBRARY BOOK LOAN PROCEDURE</b> at the top in bold capitals, 16 pt.`,
    `Draw the flow chart with standard symbols: an oval or rounded rectangle for START and END, a rectangle for each process and a diamond for each decision.`,
    `Key the text for each step inside its symbol. Use the same font and size (at least 10 pt) in every shape.`,
    `Join the symbols with arrowed connectors showing the direction of flow. Label every exit from a decision YES or NO.`,
    `Show the loop from "Student returns overdue books or pays fine" back to the overdue-books decision with an arrow.`,
    `Arrange the main flow so that it reads clearly in one direction, either left to right or in a snake pattern. The NO branches may run above or below the main flow. Make sure no connectors cross.`,
    `Group all shapes and connectors so that the chart stays in place, and check that it fits on one page.`,
    `Insert your name and the label <i>Flow Chart</i> in the footer. Save as <b>library loan flow chart</b>.`
  ],
  check: [
    { c: 'Narrow margins (1.27 cm / 0.5 in) applied', m: 1, p: 'KC' },
    { c: 'A4 landscape orientation with the correct layout of the chart: one clear direction of flow from START to END, fitted on one page', m: 1, p: 'APP' },
    { c: 'Correct standard symbols: terminators for START and END, rectangles for processes, diamonds for the three decisions (mailability d)', m: 1, p: 'APP' },
    { c: 'All 10 steps in the correct sequence; every decision exit labelled YES or NO and the loop back to the fines check shown (mailability e)', m: 1, p: 'APP' },
    { c: 'Arrowed connectors that do not cross, consistent fonts and shapes, centred title; free of typographical and spelling errors (mailability a, b, g)', m: 1, p: 'APP' }
  ],
  label: 'Display: Flow Chart using Word Processing Software',
  tip: `Use Insert, Shapes, then the Flowchart group, so that each symbol has its proper meaning. Arrowed elbow connectors stay attached when you move a shape. Plain lines do not.`
},

{
  id: 'chart-3',
  el: 'chart',
  title: 'Organisational chart of a freight and logistics company',
  org: 'Willemstad Freight & Logistics N.V.',
  brief: `<p>Willemstad Freight & Logistics N.V. clears, stores and delivers cargo arriving at the Port of Willemstad, Curaçao. The Managing Director wants an organisational chart for the company profile that will go to new customers. It must show the Board of Directors, the management team and the supervisors and staff sections.</p><p>Prepare the organisational chart.</p>`,
  data: `<p><b>Title:</b> Organisational Chart of Willemstad Freight & Logistics N.V.</p>
<table><thead><tr><th>Level</th><th>Position</th><th>Reports to</th></tr></thead><tbody>
<tr><td>1</td><td>Board of Directors</td><td></td></tr>
<tr><td>2</td><td>Managing Director: Mrs. Carmen Martina</td><td>Board of Directors</td></tr>
<tr><td>3</td><td>Operations Manager: Mr. Winston Fleming</td><td>Managing Director</td></tr>
<tr><td>3</td><td>Sales & Customer Service Manager: Ms. Natalie Wilson</td><td>Managing Director</td></tr>
<tr><td>3</td><td>Finance Manager: Mr. Ashok Mahtani</td><td>Managing Director</td></tr>
<tr><td>3</td><td>IT Administrator: Mr. Lyndon York</td><td>Managing Director</td></tr>
<tr><td>4</td><td>Warehouse Supervisor</td><td>Operations Manager</td></tr>
<tr><td>4</td><td>Customs Brokerage Supervisor</td><td>Operations Manager</td></tr>
<tr><td>4</td><td>Transport Supervisor</td><td>Operations Manager</td></tr>
<tr><td>4</td><td>Sales Representatives (3)</td><td>Sales & Customer Service Manager</td></tr>
<tr><td>4</td><td>Customer Service Officers (2)</td><td>Sales & Customer Service Manager</td></tr>
<tr><td>4</td><td>Accountant</td><td>Finance Manager</td></tr>
<tr><td>4</td><td>Billing Clerk</td><td>Finance Manager</td></tr>
<tr><td>5</td><td>Forklift Operators and Stock Clerks</td><td>Warehouse Supervisor</td></tr>
<tr><td>5</td><td>Customs Clerks</td><td>Customs Brokerage Supervisor</td></tr>
<tr><td>5</td><td>Delivery Drivers</td><td>Transport Supervisor</td></tr>
</tbody></table>`,
  tasks: [
    `Open a new document and set A4 <b>landscape</b> orientation with <b>narrow margins</b> (1.27 cm).`,
    `Centre the title <b>Organisational Chart of Willemstad Freight & Logistics N.V.</b> at the top in bold, 16 pt.`,
    `Using SmartArt (Hierarchy) or Shapes, build the chart with five levels exactly as shown in the data. Put each position in its own box.`,
    `For Levels 2 and 3, show the job title and the person's name in the box on two lines.`,
    `Place each box directly under the position it reports to. Leave even spacing between the boxes on each row.`,
    `Use a different colour for each level and keep all boxes on the same level the same size and shape.`,
    `Use straight connector lines. Do not let any lines cross.`,
    `Reduce the font size where necessary (not below 9 pt) so that the whole chart fits on one page.`,
    `Insert your name and the label <i>Organisational Chart</i> in the footer. Save as <b>freight organisational chart</b>.`
  ],
  check: [
    { c: 'Narrow margins (1.27 cm / 0.5 in) applied', m: 1, p: 'KC' },
    { c: 'A4 landscape orientation with the correct layout of the chart: five levels from Board of Directors down, fitted on one page', m: 1, p: 'APP' },
    { c: 'All 16 positions, names and staff numbers reproduced accurately, each under the correct superior (mailability e)', m: 1, p: 'APP' },
    { c: 'Consistent box size and colour on each level, even spacing, straight connectors with no crossing lines (mailability d, g)', m: 1, p: 'APP' },
    { c: 'Correct centred title; free of typographical and spelling errors; ampersands and N.V. typed as in the copy (mailability a, b, f)', m: 1, p: 'APP' }
  ],
  label: 'Display: Organisational Chart using Word Processing Software',
  tip: `A five-level chart is wide. Build it in SmartArt, then use Layout, Standard or Both on the Operations branch to save space. Check the finished chart against the "Reports to" column one row at a time.`
},

{
  id: 'chart-4',
  el: 'chart',
  title: 'Flow chart: processing a customer order',
  org: 'Albert Street Electronics Ltd',
  brief: `<p>Albert Street Electronics Ltd in Belize City takes orders by telephone, e-mail and through its website. The Sales Manager has found that new staff sometimes deliver goods before payment is cleared. She wants a flow chart of the correct order-processing procedure for the sales office wall.</p><p>Prepare the flow chart using standard flow chart symbols.</p>`,
  data: `<p><b>Title:</b> Customer Order Processing Procedure</p>
<ol>
<li>START (terminator)</li>
<li>Receive customer order by telephone, e-mail or website (process)</li>
<li>Enter order in the sales system and give it an order number (process)</li>
<li>Are all items in stock? (decision)
  <ul><li>NO: Place back-order with supplier and inform customer of expected delivery date (process), then return to step 4 when stock arrives</li>
  <li>YES: go to step 5</li></ul></li>
<li>Has payment been received, or is the order within the customer's credit limit? (decision)
  <ul><li>NO: Send pro-forma invoice requesting payment (process), then return to step 5</li>
  <li>YES: go to step 6</li></ul></li>
<li>Pick and pack items in the warehouse (process)</li>
<li>Prepare invoice and delivery note (document symbol)</li>
<li>Deliver goods; customer signs delivery note (process)</li>
<li>File signed delivery note with copy of invoice (process)</li>
<li>END (terminator)</li>
</ol>`,
  tasks: [
    `Set the page to A4 <b>landscape</b> with <b>narrow margins</b> (1.27 cm).`,
    `Centre the title <b>CUSTOMER ORDER PROCESSING PROCEDURE</b> at the top in bold capitals, 16 pt.`,
    `Draw the flow chart with standard symbols: terminator (START/END), process (rectangle), decision (diamond) and document (wavy-bottom rectangle) for step 7.`,
    `Type the wording of each step inside its symbol in the same font and size.`,
    `Connect the symbols with arrowed connectors. Label the two exits from each decision YES and NO.`,
    `Show both loops (back-order and pro-forma invoice) returning with arrows to the correct decision.`,
    `Lay out the main flow in a clear left-to-right or snake pattern with the NO branches above or below it. No connectors should cross.`,
    `Use one fill colour for process symbols and a different fill colour for decisions. Group the finished chart and make sure it fits on one page.`,
    `Insert your name and the label <i>Flow Chart</i> in the footer. Save as <b>order processing flow chart</b>.`
  ],
  check: [
    { c: 'Narrow margins (1.27 cm / 0.5 in) applied', m: 1, p: 'KC' },
    { c: 'A4 landscape orientation with the correct layout of the chart: clear direction of flow, fitted on one page', m: 1, p: 'APP' },
    { c: 'Correct standard symbols: terminators, process rectangles, two decision diamonds and a document symbol for the invoice and delivery note (mailability d)', m: 1, p: 'APP' },
    { c: 'All 10 steps in the correct sequence; YES/NO labels on both decisions; both loops return to the correct decision (mailability e)', m: 1, p: 'APP' },
    { c: 'Arrowed connectors that do not cross, consistent fonts and colour coding, centred title; free of typographical, spelling and punctuation errors (mailability a, b, f, g)', m: 1, p: 'APP' }
  ],
  label: 'Display: Flow Chart using Word Processing Software',
  tip: `Before you start in Word, sketch the chart on paper. Decide where the two loops will go first, because a loop drawn across the main flow is the most common reason connectors cross.`
},

{
  id: 'chart-5',
  el: 'chart',
  title: 'Flow chart: office hurricane preparedness procedure',
  org: 'Grand Anse Medical Supplies Ltd',
  brief: `<p>Grand Anse Medical Supplies Ltd distributes medical equipment from its office and warehouse in Grand Anse, Grenada. After damage in a past hurricane season, the Office Manager wants a one-page flow chart of the office hurricane procedure. It will be laminated and posted beside the staff notice board each June.</p><p>Prepare the flow chart using standard symbols.</p>`,
  data: `<p><b>Title:</b> Hurricane Preparedness Procedure (June to November)</p>
<ol>
<li>START: Hurricane season begins, 1 June (terminator)</li>
<li>Monitor official weather bulletins every day (process)</li>
<li>Has a tropical storm or hurricane WATCH been issued for Grenada? (decision)
  <ul><li>NO: return to step 2</li><li>YES: go to step 4</li></ul></li>
<li>Activate office hurricane plan: check emergency supplies and back up all computer files to cloud storage and an external drive (process)</li>
<li>Has a hurricane WARNING been issued? (decision)
  <ul><li>NO: return to step 2</li><li>YES: go to step 6</li></ul></li>
<li>Install shutters; move equipment away from windows; unplug computers and cover them in plastic (process)</li>
<li>Close office; Office Manager informs all staff by group text message (process)</li>
<li>Wait for the official all-clear (process)</li>
<li>Is there damage to the premises? (decision)
  <ul><li>YES: Photograph damage, report to insurer and arrange repairs (process), then go to step 10</li><li>NO: go to step 10</li></ul></li>
<li>Reopen office and restore files if needed (process)</li>
<li>END (terminator)</li>
</ol>`,
  tasks: [
    `Set up an A4 page in <b>landscape</b> orientation with <b>narrow margins</b> (1.27 cm).`,
    `Centre the title <b>HURRICANE PREPAREDNESS PROCEDURE (JUNE TO NOVEMBER)</b> in bold capitals at the top, 16 pt.`,
    `Draw the flow chart with standard symbols: terminators for START and END, rectangles for processes and diamonds for the three decisions.`,
    `Key the wording of each step inside its symbol. Use the same font and size (at least 10 pt) in all shapes.`,
    `Join the symbols with arrowed connectors. Label each decision exit YES or NO.`,
    `Show both NO loops from the WATCH and WARNING decisions back to "Monitor official weather bulletins every day", and show the damage branch rejoining at "Reopen office".`,
    `Use a colour scheme that suits a safety notice (for example, red or orange for decisions). Make sure all text is easy to read.`,
    `Group all shapes and connectors and check that the chart fits on one page with no crossing lines.`,
    `Insert your name and the label <i>Flow Chart</i> in the footer. Save as <b>hurricane procedure flow chart</b>.`
  ],
  check: [
    { c: 'Narrow margins (1.27 cm / 0.5 in) applied', m: 1, p: 'KC' },
    { c: 'A4 landscape orientation with the correct layout of the chart: clear flow from START to END, fitted on one page', m: 1, p: 'APP' },
    { c: 'Correct standard symbols: terminators, process rectangles and three decision diamonds (mailability d)', m: 1, p: 'APP' },
    { c: 'All 11 steps in the correct sequence; YES/NO labels on all decisions; both monitoring loops and the damage branch shown correctly (mailability e)', m: 1, p: 'APP' },
    { c: 'Arrowed connectors that do not cross, readable safety colour scheme, centred title; free of typographical, spelling and capitalisation errors (WATCH, WARNING) (mailability a, b, f, g)', m: 1, p: 'APP' }
  ],
  label: 'Display: Flow Chart using Word Processing Software',
  tip: `This chart has two loops to the same box. Bring both arrows into the "Monitor" step from the same side so that they do not cross the main flow.`
},

/* =====================================================================
   LEGAL WORK  (KC 1 / APP 3 / IA 1)
   ===================================================================== */
{
  id: 'legal-1',
  el: 'legal',
  title: 'Residential lease: two-bedroom apartment, Road Town',
  org: 'Island Key Realty Ltd',
  brief: `<p>Island Key Realty Ltd manages rental property in the British Virgin Islands for private landlords. The agency has found a tenant for an apartment in Road Town owned by Mr. Lionel Augustus Brooks and needs the residential lease prepared for signing.</p><p>Prepare the lease from the draft below.</p>`,
  data: `<p style="text-align:center"><b>ISLAND KEY REALTY LTD</b><br>14 Main Street, Road Town, Tortola, British Virgin Islands<br>Telephone: +1 (284) 494 2290 · E-mail: rentals@islandkeyrealty.vg</p>
<p style="text-align:center"><b>RESIDENTIAL LEASE AGREEMENT</b></p>
<p>THIS LEASE AGREEMENT (the Agreement) is made this 28th day of December 2025</p>
<p>BETWEEN <b>Mr. Lionel Augustus Brooks</b> of 9 Orange Grove Road, Sea Cows Bay, Tortola (the Landlord), represented by Island Key Realty Ltd, a real estate agency that sells, lets and manages residential and commercial property in the British Virgin Islands (the Agent),</p>
<p>AND <b>Ms. Tricia Ann Mendes</b> of 41 Joe’s Hill Road, Road Town, Tortola (the Tenant). The Tenant is a Registered Nurse who has been employed full-time for four (4) years. She has supplied a letter of employment, a reference from her previous landlord and a valid identity document.</p>
<p>The parties agree as follows:</p>
<ol>
<li><b>Property</b>: Apartment 3B, Seagrape Court, 27 Waterfront Drive, Road Town, Tortola. The apartment has two bedrooms, one bathroom, a furnished kitchen and one parking space (the Property).</li>
<li><b>Term</b>: Twelve (12) months, beginning on 1 January 2026 and ending on 31 December 2026.</li>
<li><b>Rent</b>: US$1,350.00 (one thousand, three hundred and fifty United States dollars) per month. Rent is payable in advance on or before the 1st day of each month by bank transfer to the account named by the Agent.</li>
<li><b>Payments due on signing</b>: The Tenant shall pay the following amounts when this Agreement is signed:
<table><thead><tr><th>Item</th><th>Amount (US$)</th></tr></thead><tbody>
<tr><td>First month's rent (January 2026)</td><td style="text-align:right">1,350.00</td></tr>
<tr><td>Security deposit (one month's rent)</td><td style="text-align:right">1,350.00</td></tr>
<tr><td>Key and gate remote deposit</td><td style="text-align:right">75.00</td></tr>
<tr><td>Agency administration fee</td><td style="text-align:right">150.00</td></tr>
<tr><td><b>Total due on signing</b></td><td style="text-align:right"><b>2,925.00</b></td></tr>
</tbody></table></li>
<li><b>Late payment</b>: If rent is not received by the 5th day of the month, the Tenant shall pay a late fee of five per cent (5%) of the monthly rent, that is US$67.50.</li>
<li><b>Security deposit</b>: The security deposit and the key deposit will be returned within thirty (30) days after the end of the lease, less any unpaid rent, unpaid utility bills, or the cost of repairing damage beyond normal wear and tear.</li>
<li><b>Utilities</b>: The Tenant shall pay for electricity, water, internet and cable television. The Landlord shall pay property tax and building insurance.</li>
<li><b>Maintenance and repairs</b>: The Tenant shall keep the Property clean and in good condition and report any damage to the Agent within forty-eight (48) hours. The Landlord is responsible for structural repairs, plumbing, electrical wiring and the air-conditioning units.</li>
<li><b>Use of the Property</b>: The Property shall be used as a private residence for no more than three (3) persons. No pets are allowed without the Landlord's written consent.</li>
<li><b>Hurricane season</b>: The Landlord shall provide hurricane shutters. The Agent will arrange for the shutters to be installed within twenty-four (24) hours of a hurricane warning.</li>
<li><b>Right of entry</b>: The Landlord or the Agent may enter the Property for inspection or repairs between 9.00 a.m. and 5.00 p.m. after giving at least twenty-four (24) hours' notice, except in an emergency.</li>
<li><b>Termination</b>: Either party may end this Agreement at the end of the Term by giving two (2) months' written notice. If the Tenant leaves before the end of the Term, the security deposit may be kept as compensation.</li>
</ol>
<p>SIGNED this 28th day of December 2025</p>
<p>..........................................................<br>Lionel Augustus Brooks<br>Landlord<br>Date: ....................</p>
<p>..........................................................<br>Tricia Ann Mendes<br>Tenant<br>Date: ....................</p>
<p>..........................................................<br>Witness: Ms. Charlene Webster, Property Manager, Island Key Realty Ltd<br>Date: ....................</p>`,
  tasks: [
    `Prepare the lease agreement shown. Use A4 paper, 2.54 cm margins and 1.5 line spacing (single spacing is also acceptable for the clauses).`,
    `Create a letterhead for Island Key Realty Ltd at the top of the first page. Insert a graphic image or logo that suits a real estate agency (for example a house with a key).`,
    `Centre the title RESIDENTIAL LEASE AGREEMENT in bold capitals.`,
    `Make sure the parties are clearly identified, and that the nature of the Agent's business and the Tenant's credentials are stated in full as shown.`,
    `Number the clauses automatically and display each clause heading in bold.`,
    `Reproduce the table of payments due on signing with borders, column headings in bold, and amounts right-aligned with two decimal places. Check that the total is correct.`,
    `Set out three signature spaces (Landlord, Tenant, Witness), each with a dotted line, the full name, the role and a date line. Keep each signature block together on one page.`,
    `Insert page numbers, and put your name and the label <i>Legal Document: Lease Agreement</i> in the footer. Save as <b>lease agreement</b>.`
  ],
  check: [
    { c: 'Appropriate graphic/logo representing the nature of the agency (real estate) in the letterhead', m: 1, p: 'APP' },
    { c: 'Credentials of the parties stated: Agent\'s nature of business and the Tenant\'s occupation, employment and references; Property clearly described', m: 1, p: 'APP' },
    { c: 'Parties clearly identified; clauses numbered with bold headings in plain, easy-to-follow language; agreement dated; amounts given in figures and words (mailability d, f)', m: 1, p: 'APP' },
    { c: 'Figures in the payments table accurately reproduced (US$1,350.00, 1,350.00, 75.00, 150.00, total 2,925.00), right-aligned', m: 1, p: 'IA' },
    { c: 'Signature spaces (3) correctly allocated: Landlord, Tenant and Witness, each with name, role and date', m: 1, p: 'KC' }
  ],
  label: 'Legal Work: Lease Agreement using Word Processing Software',
  tip: `Unlike the class sample, a mailable lease has no blank lines left for the term, rent or deposit. Every figure must be filled in, and the total must match the items above it.`
},

{
  id: 'legal-2',
  el: 'legal',
  title: 'Hire purchase agreement: kitchen appliance package',
  org: 'Freeport Home & Appliance Centre Ltd',
  brief: `<p>Mr. Kenrick Joseph Daniel is buying a refrigerator, washing machine and gas stove from Freeport Home & Appliance Centre Ltd on hire purchase. The Credit Manager has approved his application and asks you to prepare the hire purchase agreement for signing.</p><p>Prepare the agreement from the draft below.</p>`,
  data: `<p style="text-align:center"><b>FREEPORT HOME & APPLIANCE CENTRE LTD</b><br>58 East Mall Drive, Freeport, Grand Bahama<br>Telephone: +1 (242) 352 3615 · E-mail: credit@freeporthome.bs</p>
<p style="text-align:center"><b>HIRE PURCHASE AGREEMENT</b><br>Agreement No. HP-2025-0147</p>
<p>THIS AGREEMENT is made on 6 December 2025</p>
<p>BETWEEN <b>Freeport Home & Appliance Centre Ltd</b>, a retailer of household appliances and furniture, of 58 East Mall Drive, Freeport, Grand Bahama (the Owner),</p>
<p>AND <b>Mr. Kenrick Joseph Daniel</b> of 15 Mahogany Drive, Eight Mile Rock, Grand Bahama (the Hirer). The Hirer has been employed as a Maintenance Technician by Taino Beach Seaview Resort Ltd for six (6) years. He has supplied a job letter, his three most recent salary slips and a valid identity document.</p>
<p>The Owner agrees to let and the Hirer agrees to hire the goods listed below on the following terms:</p>
<ol>
<li><b>The goods</b>:
<table><thead><tr><th>Item</th><th>Serial number</th><th>Cash price (B$)</th></tr></thead><tbody>
<tr><td>Refrigerator, 18 cu. ft., stainless steel</td><td>RF18-55021</td><td style="text-align:right">1,450.00</td></tr>
<tr><td>Washing machine, 15 kg, front-loading</td><td>WM15-88213</td><td style="text-align:right">850.00</td></tr>
<tr><td>Gas stove, 4-burner with oven</td><td>GS4-30177</td><td style="text-align:right">700.00</td></tr>
<tr><td colspan="2"><b>Total cash price</b></td><td style="text-align:right"><b>3,000.00</b></td></tr>
</tbody></table></li>
<li><b>Financial terms</b>:
<table><thead><tr><th>Details</th><th>Amount (B$)</th></tr></thead><tbody>
<tr><td>Total cash price</td><td style="text-align:right">3,000.00</td></tr>
<tr><td>Less deposit paid on signing (20%)</td><td style="text-align:right">600.00</td></tr>
<tr><td>Balance</td><td style="text-align:right">2,400.00</td></tr>
<tr><td>Add hire purchase charge (15% of balance)</td><td style="text-align:right">360.00</td></tr>
<tr><td>Balance payable by instalments</td><td style="text-align:right">2,760.00</td></tr>
<tr><td>Twelve (12) monthly instalments of</td><td style="text-align:right">230.00</td></tr>
<tr><td><b>Total hire purchase price (deposit + instalments)</b></td><td style="text-align:right"><b>3,360.00</b></td></tr>
</tbody></table></li>
<li><b>Instalments</b>: The first instalment of B$230.00 (two hundred and thirty Bahamian dollars) is due on 6 January 2026. Later instalments are due on the 6th day of each following month. The final instalment is due on 6 December 2026.</li>
<li><b>Ownership</b>: The goods remain the property of the Owner until all instalments have been paid. When the final instalment is paid, ownership passes to the Hirer.</li>
<li><b>Care of the goods</b>: The Hirer shall keep the goods at the address above in good condition. He shall not sell, lend, pawn or move them without the Owner's written consent.</li>
<li><b>Insurance</b>: The Hirer shall insure the goods against fire, theft and storm damage for their full cash price until the agreement ends.</li>
<li><b>Late payment</b>: A late fee of B$15.00 (fifteen Bahamian dollars) will be charged for any instalment paid more than seven (7) days after its due date.</li>
<li><b>Default</b>: If two (2) instalments in a row remain unpaid, the Owner may, after giving fourteen (14) days' written notice, end this agreement and take back the goods.</li>
<li><b>Early settlement</b>: The Hirer may pay the full balance at any time and will receive a rebate of the unearned part of the hire purchase charge.</li>
<li><b>Warranty</b>: The goods carry the manufacturer's warranty of one (1) year from the date of delivery.</li>
</ol>
<p>SIGNED on 6 December 2025</p>
<p>..........................................................<br>Mr. Harold Fergus<br>Credit Manager, for and on behalf of Freeport Home & Appliance Centre Ltd (Owner)</p>
<p>..........................................................<br>Kenrick Joseph Daniel<br>Hirer</p>
<p>..........................................................<br>Witness: Ms. Simone Pinder, Sales Associate</p>`,
  tasks: [
    `Prepare the hire purchase agreement on A4 paper with 2.54 cm margins. Use single or 1.5 line spacing.`,
    `Create a letterhead for Freeport Home & Appliance Centre Ltd that includes a graphic image or logo befitting a household appliance retailer.`,
    `Centre the title and agreement number. Display the title in bold capitals.`,
    `Identify both parties clearly and state the nature of the Owner's business and the Hirer's credentials (employment and documents supplied) as shown.`,
    `Number the clauses and display each clause heading in bold. Use plain, easy-to-follow language exactly as given.`,
    `Reproduce both tables with borders and bold column headings. Right-align all amounts and show two decimal places. Check every calculation before you print.`,
    `Allocate three signature spaces (Owner's representative, Hirer, Witness) with dotted lines, names and roles. Keep the signature section together on one page.`,
    `Number the pages. Add your name and the label <i>Legal Document: Hire Purchase Agreement</i> in the footer, and save as <b>hire purchase agreement</b>.`
  ],
  check: [
    { c: 'Appropriate graphic/logo representing the nature of the company (household appliance retailer) in the letterhead', m: 1, p: 'APP' },
    { c: 'Credentials of the Hirer stated (occupation, length of employment, documents supplied), and the Owner\'s nature of business stated', m: 1, p: 'APP' },
    { c: 'Parties clearly identified; agreement number and date shown; clauses numbered with bold headings in uncomplicated language; amounts in figures and words (mailability d, f)', m: 1, p: 'APP' },
    { c: 'Figures in both tables accurately reproduced and consistent: cash price 3,000.00, deposit 600.00, balance 2,400.00, charge 360.00, instalments 12 × 230.00 = 2,760.00, HP price 3,360.00', m: 1, p: 'IA' },
    { c: 'Signature spaces (3) correctly allocated: Owner\'s representative, Hirer and Witness', m: 1, p: 'KC' }
  ],
  label: 'Legal Work: Hire Purchase Agreement using Word Processing Software',
  tip: `Ask the class: why is the hire purchase price (B$3,360.00) higher than the cash price? Students who can explain the 15% charge are less likely to mistype the figures, and the exam also asks this.`
},

{
  id: 'legal-3',
  el: 'legal',
  title: 'Last will and testament with endorsement',
  org: 'Fleming & Doran Legal Chambers',
  brief: `<p>Mrs. Iris Eugenia Hodge, a retired school teacher of Old Road, has instructed Fleming & Doran Legal Chambers to prepare her will. The lawyer has drafted the text below and asks you to type the will, together with its endorsement (the back sheet that shows on the outside when the will is folded).</p>`,
  data: `<p style="text-align:center"><b>FLEMING & DORAN LEGAL CHAMBERS</b><br>Attorneys-at-Law<br>72 Fort Street, Basseterre, St. Kitts<br>Telephone: +1 (869) 465 7730 · E-mail: office@flemingdoran.kn</p>
<p style="text-align:center"><b>LAST WILL AND TESTAMENT</b></p>
<p>THIS IS THE LAST WILL AND TESTAMENT of me, <b>IRIS EUGENIA HODGE</b>, retired school teacher, of 6 Frangipani Lane, Old Road, St. Kitts.</p>
<ol>
<li><b>Revocation</b>: I REVOKE all former wills and codicils made by me.</li>
<li><b>Executors</b>: I APPOINT my son, <b>Mr. Desmond Roy Hodge</b>, Civil Engineer, of 22 Hibiscus Street, Sandy Point, and my niece, <b>Ms. Glenda Marie Browne</b>, Chartered Accountant, of 3 Bougainvillea Road, Cayon, to be the Executors and Trustees of this my Will.</li>
<li><b>Real property</b>: I GIVE my house and land at 6 Frangipani Lane, Old Road, to my daughter, <b>Mrs. Sharon Lydia Hodge-Williams</b>, absolutely.</li>
<li><b>Gifts of money</b>: I GIVE the following sums free of all taxes:
<table><thead><tr><th>Beneficiary</th><th>Relationship</th><th>Amount (EC$)</th></tr></thead><tbody>
<tr><td>Kevin Hodge-Williams</td><td>Grandson</td><td style="text-align:right">5,000.00</td></tr>
<tr><td>Alicia Hodge-Williams</td><td>Granddaughter</td><td style="text-align:right">5,000.00</td></tr>
<tr><td>Jordan Hodge</td><td>Grandson</td><td style="text-align:right">5,000.00</td></tr>
<tr><td>Old Road Fellowship Church Building Fund</td><td>Church</td><td style="text-align:right">2,500.00</td></tr>
<tr><td>Island Animal Rescue Foundation</td><td>Charity</td><td style="text-align:right">1,500.00</td></tr>
<tr><td colspan="2"><b>Total</b></td><td style="text-align:right"><b>19,000.00</b></td></tr>
</tbody></table>
If any grandchild is under the age of eighteen (18) at my death, my Trustees shall hold that grandchild's gift until he or she reaches that age.</li>
<li><b>Personal belongings</b>: I GIVE my jewellery and my sewing machine to my daughter, Mrs. Sharon Lydia Hodge-Williams, and my motor car to my son, Mr. Desmond Roy Hodge.</li>
<li><b>Residue</b>: I GIVE the rest of my estate, after payment of my debts, funeral expenses and the costs of administering my estate, to my son and my daughter in equal shares.</li>
<li><b>Funeral wishes</b>: I wish to be buried in the Old Road Cemetery after a service at the Old Road Fellowship Church.</li>
</ol>
<p>IN WITNESS WHEREOF I have set my hand to this my Will this 19th day of March 2026.</p>
<p>..........................................................<br>IRIS EUGENIA HODGE<br>Testator</p>
<p>SIGNED by the above-named Testator as her last Will in our presence, both of us being present at the same time, and by us in her presence and in the presence of each other:</p>
<p>..........................................................<br>Witness 1: Mr. Clive Anthony Doran<br>Attorney-at-Law, 72 Fort Street, Basseterre</p>
<p>..........................................................<br>Witness 2: Ms. Paulette Joy Liburd<br>Legal Secretary, 72 Fort Street, Basseterre</p>
<h4>ENDORSEMENT (separate back sheet)</h4>
<p style="text-align:center">DATED 19 March 2026<br>..........................................<br>LAST WILL AND TESTAMENT<br>of<br>MRS. IRIS EUGENIA HODGE<br>..........................................<br>Fleming & Doran Legal Chambers<br>Attorneys-at-Law<br>72 Fort Street<br>Basseterre<br>St. Kitts</p>`,
  tasks: [
    `Prepare the will on A4 paper with 2.54 cm margins and a wider left margin (3.81 cm) for binding. Use double spacing for the clauses, or 1.5 spacing if the will would otherwise exceed two pages.`,
    `Create a letterhead for Fleming & Doran Legal Chambers with a graphic image or logo befitting a law firm (for example scales of justice).`,
    `Centre the title LAST WILL AND TESTAMENT in bold capitals. Display the testator's name, the executors' names and the main beneficiary in bold.`,
    `Number the clauses. Type the operative words (REVOKE, APPOINT, GIVE) in capitals as shown.`,
    `Reproduce the table of gifts with borders and bold headings. Right-align the amounts with two decimal places and check the total.`,
    `Set out three signature spaces (Testator, Witness 1, Witness 2) with dotted lines, names, occupations and addresses. The attestation clause and all signatures must be on the same page.`,
    `On a separate final page, type the endorsement. Place it in a text box on the right-hand half of the upper part of the page, so that it shows on the outside when the will is folded. Centre each line, using a dotted line above and below LAST WILL AND TESTAMENT.`,
    `Number the pages of the will (not the endorsement). Add your name and the label <i>Legal Document: Will with an Endorsement</i> in the footer, and save as <b>will with endorsement</b>.`
  ],
  check: [
    { c: 'Appropriate graphic/logo representing the nature of the firm (legal chambers) in the letterhead', m: 1, p: 'APP' },
    { c: 'Credentials of the Testator and Executors stated in full (names, occupations, addresses), and the beneficiaries clearly identified', m: 1, p: 'APP' },
    { c: 'Endorsement correctly displayed on a separate sheet (date, title, name of testator, preparing firm), positioned to show when folded; clauses numbered with operative words in capitals (mailability d, f)', m: 1, p: 'APP' },
    { c: 'Figures in the gifts table accurately reproduced: 5,000.00 × 3, 2,500.00, 1,500.00, total 19,000.00', m: 1, p: 'IA' },
    { c: 'Signature spaces (3) correctly allocated: Testator, Witness 1 and Witness 2, on the same page as the attestation clause', m: 1, p: 'KC' }
  ],
  label: 'Legal Work: Will with an Endorsement using Word Processing Software',
  tip: `St. Kitts and Nevis, like most CXC territories, uses the witnessed common-law will shown here, which is the format CXC examines. Remind students that a witness should never also be a beneficiary.`
},

{
  id: 'legal-4',
  el: 'legal',
  title: 'Contract of employment: sous chef',
  org: 'The Coral Reef Bistro N.V.',
  brief: `<p>The Coral Reef Bistro N.V. is a seafood restaurant on J.E. Irausquin Boulevard, Palm Beach, Aruba. It has hired a new Sous Chef, Mr. Andre Michel Baptiste, who starts on 1 March 2026. The General Manager asks you to prepare his contract of employment from the draft below.</p>`,
  data: `<p style="text-align:center"><b>THE CORAL REEF BISTRO N.V.</b><br>112 J.E. Irausquin Boulevard, Palm Beach, Aruba<br>Telephone: +297 586 8120 · E-mail: manager@coralreefbistro.aw · Website: www.coralreefbistro.aw</p>
<p style="text-align:center"><b>EMPLOYMENT CONTRACT</b><br>Mr. Andre Michel Baptiste</p>
<p>This Employment Contract (the Contract) is made between The Coral Reef Bistro N.V. (the Company) and Mr. Andre Michel Baptiste of 8 Sandpiper Road, Noord, Aruba (the Employee).</p>
<p>The Coral Reef Bistro N.V. is a 120-seat seafood restaurant and catering business situated in Palm Beach, Aruba.</p>
<p>Mr. Andre Michel Baptiste holds an Associate Degree in Culinary Arts and a Certificate in Food Safety Supervision. He has seven (7) years' experience in hotel and restaurant kitchens, including three (3) years as a Chef de Partie.</p>
<p>The parties agree as follows:</p>
<ol>
<li><b>Effective date</b>: 1 March 2026</li>
<li><b>Duration</b>: Two (2) years</li>
<li><b>Title</b>: Sous Chef</li>
<li><b>Reporting</b>: The Employee reports to the Executive Chef.</li>
<li><b>Duties</b>: The Employee will help plan menus, supervise kitchen staff, order and check food supplies, train junior cooks and take charge of the kitchen when the Executive Chef is absent.</li>
<li><b>Hours of work</b>: Forty (40) hours per week, worked over five (5) days on a rota prepared by the Executive Chef.</li>
<li><b>Probation</b>: The first two (2) months are a probationary period.</li>
<li><b>Salary</b>: The Company will pay the Employee a basic salary of Afl. 4,850.00 (four thousand, eight hundred and fifty Aruban florins) per month, payable on the 25th day of each month. A shift allowance will also be paid as follows:
<table><thead><tr><th>Shift</th><th>Hours</th><th>Allowance per hour (Afl.)</th></tr></thead><tbody>
<tr><td>Day</td><td>7.00 a.m. – 3.00 p.m.</td><td style="text-align:right">0.00</td></tr>
<tr><td>Evening</td><td>3.00 p.m. – 11.00 p.m.</td><td style="text-align:right">4.50</td></tr>
<tr><td>Sunday (any shift)</td><td>As rostered</td><td style="text-align:right">8.00</td></tr>
<tr><td>Public holiday (any shift)</td><td>As rostered</td><td style="text-align:right">12.00</td></tr>
</tbody></table></li>
<li><b>Benefits</b>: Once he has completed probation, the Employee will be covered by the Company's group medical insurance, with the Company paying 70 per cent of the premium. He will receive three sets of chef's uniforms each year and one staff meal per shift.</li>
<li><b>Vacation</b>: The Employee is entitled to fifteen (15) working days of paid vacation each year, taken at times agreed with the General Manager.</li>
<li><b>Sick leave</b>: Paid sick leave is granted in accordance with the labour legislation of Aruba. A medical certificate is needed for absences of more than two (2) days.</li>
<li><b>Termination</b>: After the probationary period, either party may end this Contract by giving one (1) month's written notice.</li>
<li><b>Confidentiality</b>: The Employee shall not reveal the Company's recipes, supplier prices or customer information, either during or after his employment.</li>
</ol>
<p>SIGNED this 22nd day of February 2026</p>
<p>..........................................................<br>Ms. Danielle Webster<br>General Manager, The Coral Reef Bistro N.V.</p>
<p>..........................................................<br>Andre Michel Baptiste<br>Employee</p>
<p>..........................................................<br>Witness: Mr. Trevor Hughes, Executive Chef</p>`,
  tasks: [
    `Prepare the contract of employment on A4 paper with 2.54 cm margins. Use single or double spacing.`,
    `Create a letterhead and insert a graphic image or logo befitting the nature of the business (a restaurant, for example a chef's hat or fish).`,
    `Centre the title EMPLOYMENT CONTRACT in bold capitals with the employee's name below it.`,
    `Make sure the parties are clearly identified, the nature of the business is stated and the credentials of the new employee are given in full.`,
    `Number the clauses and bold each clause heading. Keep the wording plain and easy to follow, as given.`,
    `Reproduce the shift allowance table within clause 8, with borders, bold column headings and right-aligned allowances to two decimal places.`,
    `Date the contract and allocate three signature spaces (for the Company, the Employee and the Witness) with dotted lines, names and titles.`,
    `Number the pages. Add your name and the label <i>Legal Document: Contract of Employment</i> in the footer, and save as <b>contract of employment</b>.`
  ],
  check: [
    { c: 'Appropriate graphic/logo representing the nature of the company (restaurant/catering)', m: 1, p: 'APP' },
    { c: 'Credentials of the new employee stated: Associate Degree in Culinary Arts, food safety certificate and seven years\' experience', m: 1, p: 'APP' },
    { c: 'Parties clearly identified and nature of business stated; clauses numbered in uncomplicated language; contract dated; salary in figures and words (mailability d, f)', m: 1, p: 'APP' },
    { c: 'Figures in the shift allowance table accurately reproduced (0.00, 4.50, 8.00, 12.00) with hours and shifts correct', m: 1, p: 'IA' },
    { c: 'Signature spaces (3) correctly allocated: for the Company (General Manager), the Employee and the Witness', m: 1, p: 'KC' }
  ],
  label: 'Legal Work: Contract of Employment using Word Processing Software',
  tip: `Compare this contract with the Van der Murphy exemplar. The structure is the same: parties, nature of business, credentials, numbered terms, table, signatures. Students who follow that order seldom miss a mark.`
},

{
  id: 'legal-5',
  el: 'legal',
  title: 'Contract of employment: marine mechanic',
  org: 'Spanish Water Marine Services N.V.',
  brief: `<p>Spanish Water Marine Services N.V. repairs and services boat engines for yachts and fishing boats on the south-east coast of Curaçao. The company has hired Mr. Curtis Elroy Isenia as a Marine Mechanic. The Operations Director asks you to prepare his contract, including the table of overtime rates.</p>`,
  data: `<p style="text-align:center"><b>SPANISH WATER MARINE SERVICES N.V.</b><br>4 Harbour View Road, Spanish Water, Curaçao<br>Telephone: +599 9 767 6608 · E-mail: office@spanishwatermarine.cw</p>
<p style="text-align:center"><b>CONTRACT OF EMPLOYMENT</b><br>Mr. Curtis Elroy Isenia</p>
<p>This Contract of Employment is made on 10 May 2026 between Spanish Water Marine Services N.V. (the Employer) and Mr. Curtis Elroy Isenia of 19 Kaya Flamboyan, Santa Rosa, Curaçao (the Employee).</p>
<p>Spanish Water Marine Services N.V. is a boatyard that repairs, services and maintains marine engines and boat electrical systems for private yachts, charter boats and fishing vessels.</p>
<p>Mr. Curtis Elroy Isenia holds a Level 3 Diploma in Marine Engineering and a manufacturer's certificate in outboard engine repair. He has five (5) years' experience as a marine mechanic.</p>
<p>The parties agree as follows:</p>
<ol>
<li><b>Start date</b>: 1 June 2026</li>
<li><b>Type of contract</b>: Fixed term of three (3) years, renewable by agreement</li>
<li><b>Position</b>: Marine Mechanic</li>
<li><b>Place of work</b>: The Employer's boatyard at Spanish Water and, when directed, on board customers' vessels anywhere in Curaçao.</li>
<li><b>Duties</b>: Diagnosing faults, servicing and repairing inboard and outboard engines, keeping job cards and parts records, and following all workshop safety rules.</li>
<li><b>Hours of work</b>: Monday to Friday, 8.00 a.m. to 5.00 p.m., with a one-hour lunch break (40 hours per week).</li>
<li><b>Salary</b>: Cg 3,900.00 (three thousand, nine hundred Caribbean guilders) per month, paid by bank transfer on the last working day of each month. For overtime, this is equal to an hourly rate of Cg 22.50 (Cg 3,900.00 × 12 months ÷ 52 weeks ÷ 40 hours).</li>
<li><b>Overtime</b>: Overtime must be approved by the Workshop Supervisor and will be paid at the following rates:
<table><thead><tr><th>Period worked</th><th>Rate</th><th>Amount per hour (Cg)</th></tr></thead><tbody>
<tr><td>Monday to Friday after 5.00 p.m.</td><td>1.5 × hourly rate</td><td style="text-align:right">33.75</td></tr>
<tr><td>Saturday</td><td>1.5 × hourly rate</td><td style="text-align:right">33.75</td></tr>
<tr><td>Sunday</td><td>2 × hourly rate</td><td style="text-align:right">45.00</td></tr>
<tr><td>Public holiday</td><td>2 × hourly rate</td><td style="text-align:right">45.00</td></tr>
</tbody></table></li>
<li><b>Tool allowance</b>: Cg 150.00 (one hundred and fifty Caribbean guilders) per month towards the Employee's personal hand tools.</li>
<li><b>Safety equipment</b>: The Employer will supply overalls, safety boots, gloves, eye protection and a life jacket for work on board vessels.</li>
<li><b>Probation</b>: The first two (2) months are a probationary period, during which either party may end the Contract immediately.</li>
<li><b>Vacation and sick leave</b>: Eighteen (18) working days of paid vacation per year. Sick leave is granted in accordance with the labour legislation of Curaçao.</li>
<li><b>Notice</b>: After probation, either party may end this Contract by giving one (1) month's written notice.</li>
</ol>
<p>SIGNED on 10 May 2026</p>
<p>..........................................................<br>Mr. Glenroy Peterson<br>Operations Director, Spanish Water Marine Services N.V.</p>
<p>..........................................................<br>Curtis Elroy Isenia<br>Employee</p>
<p>..........................................................<br>Witness: Ms. Annette Lake-Brown, Office Administrator</p>`,
  tasks: [
    `Prepare the contract of employment on A4 paper with 2.54 cm margins, using single or double spacing.`,
    `Design a letterhead and insert a graphic image or logo befitting a marine engineering business (for example a boat propeller or anchor).`,
    `Centre the title CONTRACT OF EMPLOYMENT in bold capitals with the employee's name beneath it.`,
    `Identify the parties clearly, state the nature of the Employer's business and give the Employee's credentials exactly as shown.`,
    `Number the clauses and bold the clause headings. Type amounts in figures and in words where shown.`,
    `Reproduce the overtime table with borders and bold column headings. Right-align the amounts to two decimal places. Check that each amount is correct: Cg 22.50 × 1.5 and Cg 22.50 × 2.`,
    `Date the contract and set out three signature spaces (Employer's representative, Employee, Witness) with dotted lines, names and titles.`,
    `Number the pages. Insert your name and the label <i>Legal Document: Contract of Employment</i> in the footer, and save as <b>marine mechanic contract</b>.`
  ],
  check: [
    { c: 'Appropriate graphic/logo representing the nature of the company (marine engineering/boatyard)', m: 1, p: 'APP' },
    { c: 'Credentials of the new employee stated: Level 3 Diploma in Marine Engineering, outboard engine certificate and five years\' experience', m: 1, p: 'APP' },
    { c: 'Parties clearly identified and nature of business stated; clauses numbered in uncomplicated language; contract dated; amounts in figures and words (mailability d, f)', m: 1, p: 'APP' },
    { c: 'Figures in the overtime table accurately reproduced (33.75, 33.75, 45.00, 45.00) and consistent with the Cg 22.50 hourly rate', m: 1, p: 'IA' },
    { c: 'Signature spaces (3) correctly allocated: Employer\'s representative, Employee and Witness', m: 1, p: 'KC' }
  ],
  label: 'Legal Work: Contract of Employment using Word Processing Software',
  tip: `Let students check the overtime figures with a quick spreadsheet before they type them (=22.5*1.5, =22.5*2). This is the interpretation mark, and an exact check gives the marker confidence.`
},

{
  id: 'legal-6',
  el: 'legal',
  title: 'Commercial lease: retail unit on Kaya Grandi',
  org: 'Harbourside Holdings N.V.',
  brief: `<p>Harbourside Holdings N.V. owns the Seabreeze Arcade, a small shopping arcade on Kaya Grandi, Kralendijk, Bonaire. Ms. Monique Celestine Frans is renting Unit 4 for her clothing boutique. The lease is for three years, and the rent rises by 5 per cent each year. The Property Manager asks you to prepare the commercial lease, including the rent schedule.</p>`,
  data: `<p style="text-align:center"><b>HARBOURSIDE HOLDINGS N.V.</b><br>Seabreeze Arcade, 45 Kaya Grandi, Kralendijk, Bonaire<br>Telephone: +599 717 9044 · E-mail: leasing@harboursideholdings.bq</p>
<p style="text-align:center"><b>COMMERCIAL LEASE AGREEMENT</b></p>
<p>THIS COMMERCIAL LEASE is made on 15 April 2026</p>
<p>BETWEEN <b>Harbourside Holdings N.V.</b>, a property company that owns and lets retail and office space in Kralendijk, of 45 Kaya Grandi, Kralendijk, Bonaire (the Landlord),</p>
<p>AND <b>Ms. Monique Celestine Frans</b>, trading as <b>Island Threads Boutique</b>, of 12 Kaya Korona, Antriol, Bonaire (the Tenant). The Tenant is a fashion retailer who has run Island Threads Boutique for six (6) years. The business is registered with the Chamber of Commerce and Industry of Bonaire and holds a valid business licence.</p>
<p>The parties agree as follows:</p>
<ol>
<li><b>Premises</b>: Unit 4, ground floor, Seabreeze Arcade, 45 Kaya Grandi, Kralendijk, with a floor area of 65 square metres and one display window facing Kaya Grandi (the Premises).</li>
<li><b>Term</b>: Three (3) years, beginning on 1 May 2026 and ending on 30 April 2029.</li>
<li><b>Rent</b>: Rent is payable monthly in advance on the 1st day of each month. It increases by five per cent (5%) at the start of each lease year, as shown in the schedule below:
<table><thead><tr><th>Lease year</th><th>Period</th><th>Monthly rent (US$)</th><th>Annual rent (US$)</th></tr></thead><tbody>
<tr><td>Year 1</td><td>Months 1–12</td><td style="text-align:right">2,400.00</td><td style="text-align:right">28,800.00</td></tr>
<tr><td>Year 2</td><td>Months 13–24</td><td style="text-align:right">2,520.00</td><td style="text-align:right">30,240.00</td></tr>
<tr><td>Year 3</td><td>Months 25–36</td><td style="text-align:right">2,646.00</td><td style="text-align:right">31,752.00</td></tr>
<tr><td colspan="3"><b>Total rent for the term</b></td><td style="text-align:right"><b>90,792.00</b></td></tr>
</tbody></table></li>
<li><b>Security deposit</b>: US$4,800.00 (four thousand, eight hundred United States dollars), equal to two (2) months' rent at the Year 1 rate, payable on signing. It will be refunded within thirty (30) days after the end of the lease, less any amounts owed.</li>
<li><b>Use of the Premises</b>: The Premises shall be used only as a retail clothing and accessories boutique. The Tenant shall open at least from 9.00 a.m. to 6.00 p.m., Monday to Saturday.</li>
<li><b>Fit-out and signage</b>: The Tenant may fit out the Premises and put up a shop sign at her own cost, after the Landlord has approved the plans in writing.</li>
<li><b>Utilities and service charge</b>: The Tenant shall pay for electricity, water and telephone used in the Premises. She shall also pay a service charge of US$180.00 per month for cleaning, lighting and security of the common areas.</li>
<li><b>Repairs</b>: The Landlord is responsible for the roof, outside walls and main services. The Tenant is responsible for the inside of the Premises, including the display window glass.</li>
<li><b>Insurance</b>: The Landlord shall insure the building. The Tenant shall insure her stock, fittings and public liability.</li>
<li><b>Assignment</b>: The Tenant may not sublet the Premises or transfer this lease without the Landlord's written consent.</li>
<li><b>Renewal</b>: The Tenant may renew the lease for a further three (3) years by giving written notice at least six (6) months before the end of the Term. The new rent will be agreed between the parties.</li>
</ol>
<p>SIGNED on 15 April 2026</p>
<p>..........................................................<br>Mr. Desmond Ellis<br>Director, for and on behalf of Harbourside Holdings N.V. (Landlord)</p>
<p>..........................................................<br>Monique Celestine Frans<br>Tenant, trading as Island Threads Boutique</p>
<p>..........................................................<br>Witness: Ms. Valerie Thomas, Property Manager</p>`,
  tasks: [
    `Prepare the commercial lease on A4 paper with 2.54 cm margins and 1.5 line spacing.`,
    `Create a letterhead for Harbourside Holdings N.V. Insert a graphic image or logo befitting a property company (for example a building or shopfront).`,
    `Centre the title COMMERCIAL LEASE AGREEMENT in bold capitals.`,
    `Identify both parties clearly, state the nature of the Landlord's business and the Tenant's trading name and credentials, and describe the Premises in full.`,
    `Number the clauses with bold clause headings. Type money amounts in figures and in words where shown.`,
    `Reproduce the rent schedule as a four-column table with borders, bold headings and right-aligned amounts. Check that each annual rent is 12 × the monthly rent and that the total is correct.`,
    `Date the lease and allocate three signature spaces (Landlord's representative, Tenant, Witness) with dotted lines, names and titles, kept together on one page.`,
    `Number the pages. Add your name and the label <i>Legal Document: Commercial Lease</i> in the footer, and save as <b>commercial lease</b>.`
  ],
  check: [
    { c: 'Appropriate graphic/logo representing the nature of the company (property/retail arcade) in the letterhead', m: 1, p: 'APP' },
    { c: 'Credentials of the Tenant stated (trading name, years in business, Chamber of Commerce registration, business licence), the Landlord\'s nature of business, and the Premises fully described', m: 1, p: 'APP' },
    { c: 'Parties clearly identified; clauses numbered with bold headings in uncomplicated language; lease dated; amounts in figures and words (mailability d, f)', m: 1, p: 'APP' },
    { c: 'Figures in the rent schedule accurately reproduced: monthly 2,400.00 / 2,520.00 / 2,646.00; annual 28,800.00 / 30,240.00 / 31,752.00; total 90,792.00', m: 1, p: 'IA' },
    { c: 'Signature spaces (3) correctly allocated: Landlord\'s representative, Tenant and Witness', m: 1, p: 'KC' }
  ],
  label: 'Legal Work: Commercial Lease Agreement using Word Processing Software',
  tip: `Good extension: let students build the rent schedule in a spreadsheet first (=B2*1.05, =C2*12) and paste it into Word. They will see why 2,646.00, not 2,640.00, is the Year 3 rent.`
}

]);
