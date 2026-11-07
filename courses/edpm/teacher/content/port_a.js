// EDPM SBA portfolio scenarios — ruled tabulation, financial documents, committee documents.
// Developed by Kester Small. Figures computed and verified by work_PA/gen.js.
window.EDPM_PORTFOLIO = (window.EDPM_PORTFOLIO || []).concat([
{
  id: `ruled-1`,
  el: `ruled`,
  title: `CSEC results by subject, 2024 and 2025`,
  org: `Coralstone College Business and Technology Studies Department`,
  brief: `<p>The Head of Department at Coralstone College is preparing a report for the School Board on CSEC performance over the last two years. She has given you the entries and the number of candidates who gained Grades I–III in each subject. She needs a ruled table, produced in spreadsheet software, that also shows how many candidates gained Grades IV–VI, so the Board can compare the two years at a glance.</p>`,
  data: `<table border="1"><thead><tr><th rowspan="2">Subject</th><th colspan="2">2024</th><th colspan="2">2025</th></tr><tr><th>Entered</th><th>Grades I–III</th><th>Entered</th><th>Grades I–III</th></tr></thead><tbody><tr><td>Principles of Business</td><td style="text-align:right">88</td><td style="text-align:right">71</td><td style="text-align:right">94</td><td style="text-align:right">80</td></tr><tr><td>Mathematics</td><td style="text-align:right">150</td><td style="text-align:right">84</td><td style="text-align:right">158</td><td style="text-align:right">97</td></tr><tr><td>English A</td><td style="text-align:right">152</td><td style="text-align:right">118</td><td style="text-align:right">160</td><td style="text-align:right">131</td></tr><tr><td>Electronic Document Preparation and Management</td><td style="text-align:right">64</td><td style="text-align:right">58</td><td style="text-align:right">72</td><td style="text-align:right">66</td></tr><tr><td>Biology</td><td style="text-align:right">46</td><td style="text-align:right">35</td><td style="text-align:right">51</td><td style="text-align:right">40</td></tr><tr><td>Spanish</td><td style="text-align:right">70</td><td style="text-align:right">52</td><td style="text-align:right">75</td><td style="text-align:right">59</td></tr><tr><td>Information Technology</td><td style="text-align:right">55</td><td style="text-align:right">47</td><td style="text-align:right">59</td><td style="text-align:right">52</td></tr><tr><td>Additional Mathematics</td><td style="text-align:right">18</td><td style="text-align:right">14</td><td style="text-align:right">22</td><td style="text-align:right">17</td></tr><tr><td>Physics</td><td style="text-align:right">33</td><td style="text-align:right">22</td><td style="text-align:right">36</td><td style="text-align:right">27</td></tr><tr><td>Principles of Accounts</td><td style="text-align:right">61</td><td style="text-align:right">45</td><td style="text-align:right">67</td><td style="text-align:right">50</td></tr><tr><td>Chemistry</td><td style="text-align:right">38</td><td style="text-align:right">27</td><td style="text-align:right">41</td><td style="text-align:right">33</td></tr></tbody></table>`,
  tasks: [
    `Key in the data in spreadsheet software. Insert the main heading <b>CORALSTONE COLLEGE – CSEC RESULTS BY SUBJECT, 2024 AND 2025</b> and merge and centre it across all the columns of the table.`,
    `Under each year, add a third column headed <b>Grades IV–VI</b>, so that each year has the columnar headings Entered, Grades I–III and Grades IV–VI. Merge and centre the year headings (2024, 2025) above their three columns.`,
    `Calculate Grades IV–VI for each subject using a formula (Entered minus Grades I–III), for example =B5-C5.`,
    `Add a row at the bottom headed <b>TOTAL</b> and use the SUM function to total every numeric column.`,
    `Apply slanted (oblique) headings, rotated 45°, to the six columnar headings (Entered, Grades I–III, Grades IV–VI for each year).`,
    `Sort the subjects in alphabetical order (A to Z). Keep the TOTAL row at the bottom.`,
    `Apply a harmonious colour scheme: one fill colour for the heading rows and a lighter tint of the same colour for alternate subject rows.`,
    `Apply all borders to the table, centre the figures in their columns, and display the sheet on A4 landscape, centred horizontally on the page.`,
    `Insert your name and the label <b>Ruled Tabulation using Spreadsheet Software</b> in the footer. Save the workbook as <b>CSEC Results</b> and print one copy.`
  ],
  check: [
    { c: `Selection of appropriate software tool: the table is built in spreadsheet software (worksheet cells, not a word-processing table or text boxes), with the main heading merged and centred across the table`, m: 1, p: 'KC' },
    { c: `Present slanted headings: the six columnar headings (Entered, Grades I–III, Grades IV–VI under 2024 and 2025) are rotated at an oblique angle and remain fully readable; year headings merged above their columns`, m: 1, p: 'APP' },
    { c: `Present harmonious colour scheme: heading rows and alternate subject rows use tints of one colour family; text contrasts clearly with the fill; no clashing colours`, m: 1, p: 'APP' },
    { c: `Present accurate information: all 11 subjects keyed in exactly as given, sorted A to Z; Grades IV–VI calculated correctly; totals correct (2024: 775 entered, 573 Grades I–III, 202 Grades IV–VI; 2025: 835 entered, 652 Grades I–III, 183 Grades IV–VI)`, m: 1, p: 'APP' }
  ],
  label: `Ruled Tabulation using Spreadsheet Software`,
  tip: `Check figures: TOTAL row 2024 = 775 / 573 / 202; 2025 = 835 / 652 / 183. After sorting, Additional Mathematics is first and Spanish is last. Watch that candidates select the whole table (not just the Subject column) before sorting, or the figures will no longer match their subjects and the sample is not mailable.`
},
{
  id: `ruled-2`,
  el: `ruled`,
  title: `Visitor arrivals by market, first quarter 2025 and 2026`,
  org: `Grace Bay Tourism Research Bureau`,
  brief: `<p>The Grace Bay Tourism Research Bureau is briefing hotel owners in Grace Bay and Leeward on how stay-over arrivals through Providenciales International Airport changed between the first quarter of 2025 and the first quarter of 2026. The research officer needs the monthly figures for each source market set out as a ruled table, with a quarterly total for each year, ranked so that the biggest market appears first.</p>`,
  data: `<p><b>Stay-over visitor arrivals at Providenciales International Airport, by market (number of visitors)</b></p><table border="1"><thead><tr><th rowspan="2">Market</th><th colspan="3">2025</th><th colspan="3">2026</th></tr><tr><th>January</th><th>February</th><th>March</th><th>January</th><th>February</th><th>March</th></tr></thead><tbody><tr><td>United States</td><td style="text-align:right">31,250</td><td style="text-align:right">33,480</td><td style="text-align:right">35,910</td><td style="text-align:right">33,905</td><td style="text-align:right">35,120</td><td style="text-align:right">38,460</td></tr><tr><td>Canada</td><td style="text-align:right">8,420</td><td style="text-align:right">9,150</td><td style="text-align:right">7,860</td><td style="text-align:right">9,030</td><td style="text-align:right">9,875</td><td style="text-align:right">8,240</td></tr><tr><td>Europe</td><td style="text-align:right">6,730</td><td style="text-align:right">7,015</td><td style="text-align:right">6,480</td><td style="text-align:right">7,110</td><td style="text-align:right">7,390</td><td style="text-align:right">6,925</td></tr><tr><td>Caribbean</td><td style="text-align:right">4,105</td><td style="text-align:right">3,890</td><td style="text-align:right">4,260</td><td style="text-align:right">4,385</td><td style="text-align:right">4,120</td><td style="text-align:right">4,570</td></tr><tr><td>South America</td><td style="text-align:right">1,980</td><td style="text-align:right">2,140</td><td style="text-align:right">2,315</td><td style="text-align:right">2,260</td><td style="text-align:right">2,405</td><td style="text-align:right">2,590</td></tr><tr><td>Other Markets</td><td style="text-align:right">1,245</td><td style="text-align:right">1,320</td><td style="text-align:right">1,190</td><td style="text-align:right">1,310</td><td style="text-align:right">1,385</td><td style="text-align:right">1,270</td></tr></tbody></table>`,
  tasks: [
    `Using spreadsheet software, key in the data. Insert the main heading <b>STAY-OVER VISITOR ARRIVALS BY MARKET – FIRST QUARTER 2025 AND 2026</b>, merged and centred across the table, and the subheading <b>Providenciales International Airport</b> on the line below.`,
    `Insert a fourth column under each year headed <b>Quarter Total</b>. Merge and centre each year heading over its four columns.`,
    `Use the SUM function to calculate the Quarter Total for each market and each year.`,
    `Add a row headed <b>ALL MARKETS</b> and use SUM to total each column.`,
    `Apply vertical (90°) or slanted (45°) headings to the eight month and Quarter Total headings.`,
    `Sort the markets in descending order of the 2026 Quarter Total, so that the largest market is first. Keep the ALL MARKETS row last.`,
    `Format all figures with a comma separator and no decimal places.`,
    `Apply a harmonious colour scheme of no more than three related colours and apply all borders.`,
    `Set the page to A4 landscape with narrow margins and centre the table horizontally. Insert your name and <b>Ruled Tabulation using Spreadsheet Software</b> in the footer and save as <b>Arrivals Q1</b>.`
  ],
  check: [
    { c: `Selection of appropriate software tool: the table is built in spreadsheet software (worksheet cells, not a word-processing table or text boxes), with the main heading merged and centred across the table`, m: 1, p: 'KC' },
    { c: `Present slanted headings: the eight columnar headings (January, February, March, Quarter Total under each year) are vertical or oblique and aligned consistently; year headings merged above them`, m: 1, p: 'APP' },
    { c: `Present harmonious colour scheme: no more than three related colours used for headings, year groups and the ALL MARKETS row; text readable on every fill`, m: 1, p: 'APP' },
    { c: `Present accurate information: all six markets keyed in exactly; Quarter Totals and ALL MARKETS row correct (2025 = 168,740; 2026 = 180,350); markets sorted by 2026 Quarter Total, largest first; comma separators, no decimals`, m: 1, p: 'APP' }
  ],
  label: `Ruled Tabulation using Spreadsheet Software`,
  tip: `Check figures: Quarter Totals 2025 / 2026 — United States 100,640 / 107,485; Canada 25,430 / 27,145; Europe 20,225 / 21,425; Caribbean 12,255 / 13,075; South America 6,435 / 7,255; Other Markets 3,755 / 3,965. ALL MARKETS: 2025 = 168,740, 2026 = 180,350. Correct order after sorting: United States, Canada, Europe, Caribbean, South America, Other Markets. Other Markets happens to be smallest, so it ends up last anyway; check that South America is above it.`
},
{
  id: `ruled-3`,
  el: `ruled`,
  title: `Inter-house athletics points, 2026`,
  org: `Mahoe Grove High School Physical Education Department`,
  brief: `<p>The Physical Education Department has finished counting the points from the 2026 Inter-House Athletics Championship held at the Marion Jones Sports Complex, Belize City. The Head of PE wants a ruled table for the school notice board and the newsletter showing the points each house earned in track events, field events and relays for boys and girls, with each house's total, ranked from first place to last.</p>`,
  data: `<table border="1"><thead><tr><th rowspan="2">House</th><th colspan="2">Track Events</th><th colspan="2">Field Events</th><th colspan="2">Relays</th></tr><tr><th>Boys</th><th>Girls</th><th>Boys</th><th>Girls</th><th>Boys</th><th>Girls</th></tr></thead><tbody><tr><td>Tamarind</td><td style="text-align:right">112</td><td style="text-align:right">98</td><td style="text-align:right">64</td><td style="text-align:right">71</td><td style="text-align:right">36</td><td style="text-align:right">40</td></tr><tr><td>Flamboyant</td><td style="text-align:right">126</td><td style="text-align:right">117</td><td style="text-align:right">58</td><td style="text-align:right">62</td><td style="text-align:right">44</td><td style="text-align:right">32</td></tr><tr><td>Sea Grape</td><td style="text-align:right">94</td><td style="text-align:right">109</td><td style="text-align:right">73</td><td style="text-align:right">55</td><td style="text-align:right">28</td><td style="text-align:right">36</td></tr><tr><td>Mahogany</td><td style="text-align:right">131</td><td style="text-align:right">104</td><td style="text-align:right">69</td><td style="text-align:right">80</td><td style="text-align:right">40</td><td style="text-align:right">44</td></tr><tr><td>Hibiscus</td><td style="text-align:right">101</td><td style="text-align:right">122</td><td style="text-align:right">52</td><td style="text-align:right">66</td><td style="text-align:right">32</td><td style="text-align:right">28</td></tr></tbody></table>`,
  tasks: [
    `Using spreadsheet software, key in the data. Insert the main heading <b>INTER-HOUSE ATHLETICS CHAMPIONSHIP 2026 – POINTS BY HOUSE</b>, merged and centred across the table.`,
    `Keep the three group headings (Track Events, Field Events, Relays), each merged and centred above its Boys and Girls columns.`,
    `Add a column at the right headed <b>Total Points</b> and calculate it with the SUM function.`,
    `Add a column headed <b>Position</b> and enter 1st to 5th after sorting.`,
    `Sort the houses in descending order of Total Points.`,
    `Rotate the Boys, Girls, Total Points and Position headings to an oblique angle (45°).`,
    `Shade each house name in a light tint of a single colour family and shade the heading rows in a darker tone of the same family. Apply all borders.`,
    `Centre all figures. Display on A4 landscape, centred horizontally.`,
    `Insert your name and <b>Ruled Tabulation using Spreadsheet Software</b> in the footer and save as <b>Sports Day Points</b>.`
  ],
  check: [
    { c: `Selection of appropriate software tool: the table is built in spreadsheet software (worksheet cells, not a word-processing table or text boxes), with the main heading merged and centred across the table`, m: 1, p: 'KC' },
    { c: `Present slanted headings: the Boys/Girls subheadings, Total Points and Position are rotated at an oblique angle; group headings merged and centred above their pairs of columns`, m: 1, p: 'APP' },
    { c: `Present harmonious colour scheme: one colour family used in light and dark tones for headings and house rows; colours aid reading rather than distract`, m: 1, p: 'APP' },
    { c: `Present accurate information: all points keyed in exactly; Total Points correct (Mahogany 468, Flamboyant 439, Tamarind 421, Hibiscus 401, Sea Grape 395); houses sorted in descending order with positions 1st–5th correct`, m: 1, p: 'APP' }
  ],
  label: `Ruled Tabulation using Spreadsheet Software`,
  tip: `Check figures and order: 1. Mahogany 468; 2. Flamboyant 439; 3. Tamarind 421; 4. Hibiscus 401; 5. Sea Grape 395. Candidates must not use house colours (e.g. bright red next to bright green) for the shading; the mark is for a harmonious scheme, not a decorative one.`
},
{
  id: `ruled-4`,
  el: `ruled`,
  title: `Hotel room-nights and occupancy by season`,
  org: `South Coast Hospitality Association`,
  brief: `<p>The South Coast Hospitality Association in Barbados is preparing for its annual meeting with member hotels. The Executive Officer needs a ruled table comparing room-nights available and sold at six member properties in the high and low seasons, with the occupancy rate for each, so members can see where the low season is weakest.</p>`,
  data: `<p>Figures are room-nights. High Season = 1 December 2025 – 30 April 2026; Low Season = 1 May – 30 November 2025.</p><table border="1"><thead><tr><th rowspan="2">Property</th><th colspan="2">High Season</th><th colspan="2">Low Season</th></tr><tr><th>Available</th><th>Sold</th><th>Available</th><th>Sold</th></tr></thead><tbody><tr><td>Rockley Sands Resort</td><td style="text-align:right">21,600</td><td style="text-align:right">18,792</td><td style="text-align:right">25,200</td><td style="text-align:right">13,860</td></tr><tr><td>Carlisle Bay Harbour Hotel</td><td style="text-align:right">16,200</td><td style="text-align:right">14,256</td><td style="text-align:right">18,900</td><td style="text-align:right">10,584</td></tr><tr><td>Hastings Garden Inn</td><td style="text-align:right">5,400</td><td style="text-align:right">4,320</td><td style="text-align:right">6,300</td><td style="text-align:right">2,898</td></tr><tr><td>Worthing Beach Suites</td><td style="text-align:right">8,100</td><td style="text-align:right">7,290</td><td style="text-align:right">9,450</td><td style="text-align:right">5,103</td></tr><tr><td>Oistins Lodge</td><td style="text-align:right">3,600</td><td style="text-align:right">2,808</td><td style="text-align:right">4,200</td><td style="text-align:right">1,764</td></tr><tr><td>Christ Church Hillside Villas</td><td style="text-align:right">2,700</td><td style="text-align:right">2,241</td><td style="text-align:right">3,150</td><td style="text-align:right">1,449</td></tr></tbody></table>`,
  tasks: [
    `Using spreadsheet software, key in the data. Insert the main heading <b>SOUTH COAST HOSPITALITY ASSOCIATION – ROOM-NIGHTS AND OCCUPANCY BY SEASON</b>, merged and centred across the table.`,
    `Add a third column under each season headed <b>Occupancy %</b>. Merge and centre the season headings over their three columns.`,
    `Calculate Occupancy % as Sold ÷ Available, formatted as a percentage with one decimal place.`,
    `Add a row headed <b>ALL PROPERTIES</b>: SUM the Available and Sold columns and calculate the overall Occupancy % for each season from those totals.`,
    `Apply slanted (oblique) headings to the six columnar headings.`,
    `Sort the properties in alphabetical order. Keep ALL PROPERTIES last.`,
    `Format room-night figures with a comma separator. Apply a harmonious colour scheme and all borders.`,
    `Place the note on the seasons below the table in a smaller font, display on A4 landscape, centred horizontally.`,
    `Insert your name and <b>Ruled Tabulation using Spreadsheet Software</b> in the footer and save as <b>Hotel Occupancy</b>.`
  ],
  check: [
    { c: `Selection of appropriate software tool: the table is built in spreadsheet software (worksheet cells, not a word-processing table or text boxes), with the main heading merged and centred across the table`, m: 1, p: 'KC' },
    { c: `Present slanted headings: Available, Sold and Occupancy % under each season are slanted at the same angle; season headings merged above them`, m: 1, p: 'APP' },
    { c: `Present harmonious colour scheme: season groups distinguished by two tints of one colour or by two related colours; ALL PROPERTIES row shaded consistently`, m: 1, p: 'APP' },
    { c: `Present accurate information: room-nights keyed in exactly; Occupancy % correct to one decimal place (overall: High 86.3%, Low 53.1%); properties sorted A to Z`, m: 1, p: 'APP' }
  ],
  label: `Ruled Tabulation using Spreadsheet Software`,
  tip: `Check figures (High % / Low %): Rockley Sands Resort 87.0 / 55.0; Carlisle Bay Harbour Hotel 88.0 / 56.0; Hastings Garden Inn 80.0 / 46.0; Worthing Beach Suites 90.0 / 54.0; Oistins Lodge 78.0 / 42.0; Christ Church Hillside Villas 83.0 / 46.0. ALL PROPERTIES: Available 57,600 / Sold 49,707 (86.3%); Available 67,200 / Sold 35,658 (53.1%). Overall occupancy must come from the totals, not from averaging the six percentages.`
},
{
  id: `ruled-5`,
  el: `ruled`,
  title: `Recycling collected by district, 2024 and 2025`,
  org: `Green Isle Recycling Initiative`,
  brief: `<p>The Green Isle Recycling Initiative, a volunteer group in Trinidad, wants to show the Ministry and its sponsors how much plastic, glass and aluminium was brought to its community recycling points in each district in 2024 and 2025. The co-ordinator needs a ruled table with totals for each district and each material, listed in alphabetical order of district.</p>`,
  data: `<p>Weight collected at community recycling points, in kilograms (kg).</p><table border="1"><thead><tr><th rowspan="2">District</th><th colspan="2">Plastic</th><th colspan="2">Glass</th><th colspan="2">Aluminium</th></tr><tr><th>2024</th><th>2025</th><th>2024</th><th>2025</th><th>2024</th><th>2025</th></tr></thead><tbody><tr><td>Sangre Grande</td><td style="text-align:right">2,840</td><td style="text-align:right">3,215</td><td style="text-align:right">1,960</td><td style="text-align:right">2,105</td><td style="text-align:right">615</td><td style="text-align:right">702</td></tr><tr><td>Chaguanas</td><td style="text-align:right">5,130</td><td style="text-align:right">5,870</td><td style="text-align:right">3,420</td><td style="text-align:right">3,690</td><td style="text-align:right">1,185</td><td style="text-align:right">1,340</td></tr><tr><td>Port of Spain</td><td style="text-align:right">7,465</td><td style="text-align:right">8,120</td><td style="text-align:right">5,280</td><td style="text-align:right">5,510</td><td style="text-align:right">1,920</td><td style="text-align:right">2,075</td></tr><tr><td>Diego Martin</td><td style="text-align:right">3,310</td><td style="text-align:right">3,765</td><td style="text-align:right">2,045</td><td style="text-align:right">2,290</td><td style="text-align:right">740</td><td style="text-align:right">815</td></tr><tr><td>Arima</td><td style="text-align:right">1,985</td><td style="text-align:right">2,240</td><td style="text-align:right">1,310</td><td style="text-align:right">1,425</td><td style="text-align:right">430</td><td style="text-align:right">505</td></tr><tr><td>San Fernando</td><td style="text-align:right">6,290</td><td style="text-align:right">6,845</td><td style="text-align:right">4,710</td><td style="text-align:right">4,935</td><td style="text-align:right">1,660</td><td style="text-align:right">1,790</td></tr><tr><td>Couva</td><td style="text-align:right">2,475</td><td style="text-align:right">2,930</td><td style="text-align:right">1,585</td><td style="text-align:right">1,760</td><td style="text-align:right">520</td><td style="text-align:right">610</td></tr></tbody></table>`,
  tasks: [
    `Using spreadsheet software, key in the data. Insert the main heading <b>RECYCLING COLLECTED BY DISTRICT, 2024 AND 2025 (KG)</b>, merged and centred across the table.`,
    `Add a fourth group heading <b>All Materials</b> with columns 2024 and 2025. Merge and centre each material heading over its two year columns.`,
    `Use the SUM function to calculate All Materials for each district and each year.`,
    `Add a row headed <b>TOTAL</b> and SUM every numeric column.`,
    `Apply vertical (90°) headings to all the year columnar headings.`,
    `Sort the districts in alphabetical order. Keep TOTAL last.`,
    `Format all figures with a comma separator and no decimal places. Apply a harmonious green-based colour scheme and all borders.`,
    `Display the table on A4 landscape, centred horizontally. Insert your name and <b>Ruled Tabulation using Spreadsheet Software</b> in the footer and save as <b>Recycling by District</b>.`
  ],
  check: [
    { c: `Selection of appropriate software tool: the table is built in spreadsheet software (worksheet cells, not a word-processing table or text boxes), with the main heading merged and centred across the table`, m: 1, p: 'KC' },
    { c: `Present slanted headings: all eight year headings (2024, 2025 under Plastic, Glass, Aluminium and All Materials) set vertically or obliquely; material headings merged above them`, m: 1, p: 'APP' },
    { c: `Present harmonious colour scheme: tints and shades of green (or one chosen colour family) used consistently for heading levels and the TOTAL row`, m: 1, p: 'APP' },
    { c: `Present accurate information: all figures keyed in exactly; All Materials and TOTAL correct (grand total 2024 = 56,875 kg, 2025 = 62,537 kg); districts sorted A to Z`, m: 1, p: 'APP' }
  ],
  label: `Ruled Tabulation using Spreadsheet Software`,
  tip: `Check figures: All Materials 2024 / 2025 — Arima 3,725 / 4,170; Chaguanas 9,735 / 10,900; Couva 4,580 / 5,300; Diego Martin 6,095 / 6,870; Port of Spain 14,665 / 15,705; San Fernando 12,660 / 13,570; Sangre Grande 5,415 / 6,022. Column TOTALS: Plastic 29,495 / 32,985, Glass 20,310 / 21,715, Aluminium 7,070 / 7,837; grand total 56,875 / 62,537.`
},
{
  id: `financial-1`,
  el: `financial`,
  title: `Income and expenditure statement, January–April 2026`,
  org: `Road Town Youth Steel Orchestra`,
  brief: `<p>The Treasurer of the Road Town Youth Steel Orchestra in Tortola must present the orchestra's income and expenditure for the first four months of 2026 to the parents' committee. She has given you the monthly figures from the cash book. Prepare an income and expenditure statement using spreadsheet software that shows totals for each month and for the period, the surplus or deficit, and the highest expense in March.</p>`,
  data: `<p><b>Road Town Youth Steel Orchestra – figures for January to April 2026 (US$)</b></p><table border="1"><thead><tr><th></th><th>January</th><th>February</th><th>March</th><th>April</th></tr></thead><tbody><tr><td colspan="5"><b>Income</b></td></tr><tr><td>Performance Fees</td><td style="text-align:right">1,200.00</td><td style="text-align:right">850.00</td><td style="text-align:right">2,400.00</td><td style="text-align:right">1,650.00</td></tr><tr><td>Membership Fees</td><td style="text-align:right">450.00</td><td style="text-align:right">450.00</td><td style="text-align:right">475.00</td><td style="text-align:right">475.00</td></tr><tr><td>Sponsorship</td><td style="text-align:right">1,000.00</td><td style="text-align:right">0.00</td><td style="text-align:right">0.00</td><td style="text-align:right">1,500.00</td></tr><tr><td>Fundraising (Bake Sales)</td><td style="text-align:right">310.50</td><td style="text-align:right">0.00</td><td style="text-align:right">285.75</td><td style="text-align:right">420.25</td></tr><tr><td colspan="5"><b>Expenditure</b></td></tr><tr><td>Rent of Pan Yard</td><td style="text-align:right">600.00</td><td style="text-align:right">600.00</td><td style="text-align:right">600.00</td><td style="text-align:right">600.00</td></tr><tr><td>Transport</td><td style="text-align:right">380.00</td><td style="text-align:right">240.00</td><td style="text-align:right">655.00</td><td style="text-align:right">410.00</td></tr><tr><td>Insurance</td><td style="text-align:right">210.00</td><td style="text-align:right">210.00</td><td style="text-align:right">210.00</td><td style="text-align:right">210.00</td></tr><tr><td>Electricity</td><td style="text-align:right">142.36</td><td style="text-align:right">138.90</td><td style="text-align:right">151.22</td><td style="text-align:right">160.48</td></tr><tr><td>Uniforms</td><td style="text-align:right">0.00</td><td style="text-align:right">0.00</td><td style="text-align:right">1,240.00</td><td style="text-align:right">0.00</td></tr><tr><td>Instrument Tuning</td><td style="text-align:right">0.00</td><td style="text-align:right">950.00</td><td style="text-align:right">0.00</td><td style="text-align:right">0.00</td></tr><tr><td>Refreshments</td><td style="text-align:right">96.40</td><td style="text-align:right">72.15</td><td style="text-align:right">188.60</td><td style="text-align:right">120.35</td></tr><tr><td>Printing and Stationery</td><td style="text-align:right">45.00</td><td style="text-align:right">38.50</td><td style="text-align:right">112.75</td><td style="text-align:right">26.00</td></tr></tbody></table>`,
  tasks: [
    `Create a centred, merged main heading <b>ROAD TOWN YOUTH STEEL ORCHESTRA</b> and, below it, a merged subheading <b>INCOME AND EXPENDITURE STATEMENT – JANUARY TO APRIL 2026</b>.`,
    `Key in the data. Add a column to the right of April headed <b>Total</b>.`,
    `Use the SUM function to calculate Total Income and Total Expenditure for each month, and the Total for every row.`,
    `Add a row headed <b>Surplus/(Deficit)</b> that subtracts Total Expenditure from Total Income for each month and for the period.`,
    `Below the statement, key in <b>Highest expense for the month of March</b> and use the MAX function to find it.`,
    `Format all figures to currency (US$) with two decimal places.`,
    `Apply borders to EACH cell of the statement and a thick bottom border under the Surplus/(Deficit) row.`,
    `Apply either the vertical or oblique heading to the MONTHS and the Total heading.`,
    `Bold ALL headings (main heading, months, Income, Expenditure and the total rows).`,
    `Sort the expenditure items in alphabetical order. Right-align all figures, and centre the statement horizontally on the page.`,
    `Insert your name and <b>Income and Expenditure Statement using Spreadsheet Software</b> in the footer. Save as <b>Steel Orchestra I and E</b>.`
  ],
  check: [
    { c: `Formatting features – Alignment: statement centred horizontally on the page; item names left-aligned; all figures right-aligned so decimal points line up`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of borders: All Borders applied to EACH cell of the document area, as instructed`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of bolding headings: main heading, subheading, month headings, Income, Expenditure, Total Income, Total Expenditure and Surplus/(Deficit) all bold`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Create column and row headings: month columns plus a Total column, Income and Expenditure section headings, and Total Income, Total Expenditure and Surplus/(Deficit) rows inserted and correctly labelled`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Insertion of oblique or vertical headings: January–April and Total headings rotated vertically or at an oblique angle, all readable`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Appropriate use of borders: a thick bottom border rules off the Surplus/(Deficit) row (or a double bottom border under the totals) to close the statement`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Sorting of data in table: the eight expenditure items sorted A to Z (Electricity first, Uniforms last) with their figures kept in line`, m: 1, p: 'APP' },
    { c: `Advanced tabulations – Simple formula 1, SUM (2): Total Income each month (2,960.50 / 1,300.00 / 3,160.75 / 4,045.25), Total Expenditure each month (1,473.76 / 2,249.55 / 3,157.57 / 1,526.83) and period totals US$11,466.50 and US$8,407.71 correct`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Simple formula 2, MAX (2): highest expense for March returned by =MAX(…) as US$1,240.00 (Uniforms); Surplus/(Deficit) for the period US$3,058.79`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Formatting using Currency: all money cells formatted as currency with the US$ symbol`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Formatting to decimal places: all money figures fixed to two decimal places`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Merging cells: main heading and subheading merged and centred across all columns of the statement`, m: 1, p: 'IA' }
  ],
  label: `Income and Expenditure Statement using Spreadsheet Software`,
  tip: `Check figures: Total Income 2,960.50, 1,300.00, 3,160.75, 4,045.25 (period US$11,466.50); Total Expenditure 1,473.76, 2,249.55, 3,157.57, 1,526.83 (period US$8,407.71); Surplus/(Deficit) 1,486.74, (949.55), 3.18, 2,518.42 (period US$3,058.79). February is a deficit, so it should show in brackets or with a minus sign. Highest March expense: Uniforms US$1,240.00.`
},
{
  id: `financial-2`,
  el: `financial`,
  title: `Comparative balance sheet at 31 December 2024 and 2025`,
  org: `Bodden Town Auto Parts Ltd`,
  brief: `<p>Bodden Town Auto Parts Ltd, Grand Cayman, is applying to a bank in George Town to extend its business loan. The bank has asked for a balance sheet showing the company's position at the end of 2024 and 2025 side by side. The company's accountant has given you the balances. Prepare the balance sheet using spreadsheet software so that totals are calculated by formula and the statement visibly balances in both years.</p>`,
  data: `<p><b>Bodden Town Auto Parts Ltd – balances at 31 December (CI$)</b></p><table border="1"><thead><tr><th>Item</th><th>2024</th><th>2025</th></tr></thead><tbody><tr><td colspan="3"><b>Non-current Assets</b></td></tr><tr><td>Motor Vehicles</td><td style="text-align:right">38,600.00</td><td style="text-align:right">45,200.00</td></tr><tr><td>Land and Buildings</td><td style="text-align:right">185,000.00</td><td style="text-align:right">185,000.00</td></tr><tr><td>Office Equipment</td><td style="text-align:right">9,750.00</td><td style="text-align:right">8,400.00</td></tr><tr><td>Fixtures and Fittings</td><td style="text-align:right">24,500.00</td><td style="text-align:right">21,800.00</td></tr><tr><td colspan="3"><b>Current Assets</b></td></tr><tr><td>Inventory</td><td style="text-align:right">62,340.50</td><td style="text-align:right">71,215.75</td></tr><tr><td>Trade Receivables</td><td style="text-align:right">18,425.30</td><td style="text-align:right">22,960.10</td></tr><tr><td>Cash at Bank</td><td style="text-align:right">14,870.20</td><td style="text-align:right">9,635.45</td></tr><tr><td>Cash in Hand</td><td style="text-align:right">1,250.00</td><td style="text-align:right">980.00</td></tr><tr><td colspan="3"><b>Capital</b></td></tr><tr><td>Capital at 1 January</td><td style="text-align:right">250,000.00</td><td style="text-align:right">273,260.40</td></tr><tr><td>Add Net Profit for the year</td><td style="text-align:right">41,260.40</td><td style="text-align:right">46,385.25</td></tr><tr><td>Less Drawings</td><td style="text-align:right">(18,000.00)</td><td style="text-align:right">(20,000.00)</td></tr><tr><td colspan="3"><b>Non-current Liabilities</b></td></tr><tr><td>Bank Loan (repayable 2030)</td><td style="text-align:right">60,000.00</td><td style="text-align:right">48,000.00</td></tr><tr><td colspan="3"><b>Current Liabilities</b></td></tr><tr><td>Trade Payables</td><td style="text-align:right">18,925.60</td><td style="text-align:right">14,895.65</td></tr><tr><td>Accrued Expenses</td><td style="text-align:right">2,550.00</td><td style="text-align:right">2,650.00</td></tr></tbody></table><p>Drawings are shown in brackets because they are deducted from capital.</p>`,
  tasks: [
    `Create a merged and centred heading <b>BODDEN TOWN AUTO PARTS LTD</b> with the merged subheading <b>BALANCE SHEET AS AT 31 DECEMBER 2024 AND 2025</b> below it.`,
    `Set out the balance sheet in vertical format with two money columns headed <b>2024</b> and <b>2025</b> and the column heading <b>CI$</b> above them.`,
    `Key in the balances under the section headings Non-current Assets, Current Assets, Capital, Non-current Liabilities and Current Liabilities.`,
    `Sort the non-current assets and the current assets, each group separately, in alphabetical order.`,
    `Use the SUM function to calculate Total Non-current Assets, Total Current Assets, TOTAL ASSETS, Closing Capital, Total Liabilities and TOTAL CAPITAL AND LIABILITIES for each year.`,
    `Below the statement key in <b>Largest current asset at 31 December 2025</b> and use the MAX function to find it.`,
    `Format all figures to currency (CI$) with two decimal places; show Drawings as a negative figure in brackets.`,
    `Apply borders to EACH cell and a double bottom border under TOTAL ASSETS and TOTAL CAPITAL AND LIABILITIES.`,
    `Apply an oblique heading (45°) to the year column headings. Bold all headings and total rows.`,
    `Right-align all figures, centre the statement horizontally and fit it on one A4 portrait page.`,
    `Insert your name and <b>Balance Sheet using Spreadsheet Software</b> in the footer. Save as <b>Bodden Town Balance Sheet</b>.`
  ],
  check: [
    { c: `Formatting features – Alignment: statement centred horizontally on one A4 portrait page; item names left-aligned and sub-items indented; figures right-aligned`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of borders: All Borders applied to EACH cell of the document area, as instructed`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of bolding headings: company name, statement title, year headings, the five section headings, TOTAL ASSETS and TOTAL CAPITAL AND LIABILITIES bold`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Create column and row headings: year columns 2024 and 2025 under CI$, five section headings and every subtotal and total row inserted and labelled correctly`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Insertion of oblique or vertical headings: the 2024 and 2025 column headings set at an oblique angle`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Appropriate use of borders: double bottom border under TOTAL ASSETS and TOTAL CAPITAL AND LIABILITIES showing the statement balances`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Sorting of data in table: non-current assets (Fixtures and Fittings, Land and Buildings, Motor Vehicles, Office Equipment) and current assets (Cash at Bank, Cash in Hand, Inventory, Trade Receivables) each sorted A to Z`, m: 1, p: 'APP' },
    { c: `Advanced tabulations – Simple formula 1, SUM (2): TOTAL ASSETS = TOTAL CAPITAL AND LIABILITIES = CI$354,736.00 (2024) and CI$365,191.30 (2025); Closing Capital CI$273,260.40 and CI$299,645.65`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Simple formula 2, MAX (2): largest current asset at 31 December 2025 returned by =MAX(…) as CI$71,215.75 (Inventory)`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Formatting using Currency: all figures formatted as currency (CI$), with Drawings shown as a negative in brackets`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Formatting to decimal places: all money figures fixed to two decimal places`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Merging cells: company name and statement title merged and centred across the item and both year columns`, m: 1, p: 'IA' }
  ],
  label: `Balance Sheet using Spreadsheet Software`,
  tip: `Check figures (2024 / 2025): Non-current Assets 257,850.00 / 260,400.00; Current Assets 96,886.00 / 104,791.30; TOTAL ASSETS 354,736.00 / 365,191.30; Closing Capital 273,260.40 / 299,645.65; Liabilities 81,475.60 / 65,545.65. Note that the 2025 opening capital equals the 2024 closing capital — a good discussion point. If the totals do not agree, the candidate has keyed a figure wrongly; the sample is not mailable until both years balance.`
},
{
  id: `financial-3`,
  el: `financial`,
  title: `Statement of cash flows, first quarter 2026`,
  org: `Bendals Bakery & Café`,
  brief: `<p>The owner of Bendals Bakery &amp; Café in Antigua wants to know whether the business will have enough cash in April to buy a new deck oven. Her bookkeeper has summarised the cash coming in and going out for January to March 2026. Prepare a statement of cash flows using spreadsheet software that shows the net cash flow each month, the opening and closing cash balances, and the totals for the quarter.</p>`,
  data: `<p><b>Bendals Bakery &amp; Café – cash records, January to March 2026 (EC$)</b></p><p>Cash balance at 1 January 2026: EC$8,450.00</p><table border="1"><thead><tr><th></th><th>January</th><th>February</th><th>March</th></tr></thead><tbody><tr><td colspan="4"><b>Cash Inflows</b></td></tr><tr><td>Receipts from Debtors</td><td style="text-align:right">1,840.75</td><td style="text-align:right">2,215.30</td><td style="text-align:right">1,960.00</td></tr><tr><td>Cash Sales</td><td style="text-align:right">18,650.40</td><td style="text-align:right">16,980.25</td><td style="text-align:right">21,345.60</td></tr><tr><td>Catering Contracts</td><td style="text-align:right">3,200.00</td><td style="text-align:right">4,750.00</td><td style="text-align:right">2,900.00</td></tr><tr><td colspan="4"><b>Cash Outflows</b></td></tr><tr><td>Wages</td><td style="text-align:right">7,800.00</td><td style="text-align:right">7,800.00</td><td style="text-align:right">7,800.00</td></tr><tr><td>Flour and Ingredients</td><td style="text-align:right">6,420.80</td><td style="text-align:right">5,985.35</td><td style="text-align:right">7,210.65</td></tr><tr><td>Rent</td><td style="text-align:right">2,500.00</td><td style="text-align:right">2,500.00</td><td style="text-align:right">2,500.00</td></tr><tr><td>Loan Repayment</td><td style="text-align:right">950.00</td><td style="text-align:right">950.00</td><td style="text-align:right">950.00</td></tr><tr><td>Electricity and Gas</td><td style="text-align:right">1,385.42</td><td style="text-align:right">1,302.18</td><td style="text-align:right">1,456.90</td></tr><tr><td>Packaging</td><td style="text-align:right">640.25</td><td style="text-align:right">588.70</td><td style="text-align:right">712.40</td></tr><tr><td>Delivery Van Fuel</td><td style="text-align:right">415.60</td><td style="text-align:right">398.25</td><td style="text-align:right">452.80</td></tr><tr><td>Equipment Repairs</td><td style="text-align:right">0.00</td><td style="text-align:right">1,250.00</td><td style="text-align:right">0.00</td></tr></tbody></table>`,
  tasks: [
    `Create a merged and centred heading <b>BENDALS BAKERY &amp; CAFÉ</b> and a merged subheading <b>STATEMENT OF CASH FLOWS FOR THE QUARTER ENDED 31 MARCH 2026</b>.`,
    `Key in the data with the month headings January, February and March, and add a column headed <b>Quarter Total</b>.`,
    `Sort the cash outflows in alphabetical order.`,
    `Use the SUM function to calculate Total Cash Inflows and Total Cash Outflows for each month, and the Quarter Total for every inflow and outflow row.`,
    `Insert the rows <b>Net Cash Flow</b> (Total Inflows minus Total Outflows), <b>Opening Cash Balance</b> and <b>Closing Cash Balance</b> (Opening plus Net Cash Flow). The opening balance for February and March must be a formula that refers to the previous month's closing balance.`,
    `Below the statement, key in <b>Largest cash outflow for the quarter</b> and use the MAX function on the Quarter Total column of the outflows to find it.`,
    `Format all figures to currency (EC$) with two decimal places.`,
    `Apply borders to EACH cell and a thick outside border around the whole statement.`,
    `Apply vertical or oblique headings to the month and Quarter Total headings. Bold all headings and total rows.`,
    `Right-align all figures and centre the statement horizontally on an A4 portrait page.`,
    `Insert your name and <b>Statement of Cash Flows using Spreadsheet Software</b> in the footer. Save as <b>Bendals Cash Flow</b>.`
  ],
  check: [
    { c: `Formatting features – Alignment: statement centred horizontally; labels left-aligned; figures right-aligned with decimal points in line`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of borders: All Borders applied to EACH cell of the document area, as instructed`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of bolding headings: heading, subheading, month headings, Cash Inflows, Cash Outflows, the two totals, Net Cash Flow and Closing Cash Balance bold`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Create column and row headings: month and Quarter Total columns, Cash Inflows/Cash Outflows section headings, and Net Cash Flow, Opening and Closing Cash Balance rows inserted and labelled`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Insertion of oblique or vertical headings: January, February, March and Quarter Total headings vertical or oblique`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Appropriate use of borders: thick outside border enclosing the whole statement so it reads as one document`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Sorting of data in table: the eight cash outflows sorted A to Z (Delivery Van Fuel first, Wages last) with figures kept in line`, m: 1, p: 'APP' },
    { c: `Advanced tabulations – Simple formula 1, SUM (2): Total Inflows 23,691.15 / 23,945.55 / 26,205.60 and Total Outflows 20,112.07 / 20,774.48 / 21,082.75 correct; quarter totals EC$73,842.30 and EC$61,969.30`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Simple formula 2, MAX (2): largest cash outflow for the quarter returned by =MAX(…) as EC$23,400.00 (Wages); closing balance at 31 March EC$20,323.00`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Formatting using Currency: all money cells formatted as currency (EC$), including the balances`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Formatting to decimal places: all money figures fixed to two decimal places`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Merging cells: business name and statement title merged and centred across all columns`, m: 1, p: 'IA' }
  ],
  label: `Statement of Cash Flows using Spreadsheet Software`,
  tip: `Check figures (Jan / Feb / Mar): Net Cash Flow 3,579.08 / 3,171.07 / 5,122.85; Opening 8,450.00 / 12,029.08 / 15,200.15; Closing 12,029.08 / 15,200.15 / 20,323.00. Quarter: Inflows EC$73,842.30, Outflows EC$61,969.30, Net EC$11,873.00. The Quarter Total column for the balance rows should show the opening balance of 1 January and the closing balance of 31 March, not a SUM of the three months — a useful interpretation question.`
},
{
  id: `financial-4`,
  el: `financial`,
  title: `Sales invoice for marine supplies`,
  org: `Great Bay Marine Supplies Ltd`,
  brief: `<p>Simpson Bay Charter Boats N.V. has ordered safety equipment and maintenance supplies from Great Bay Marine Supplies Ltd before the start of the charter season. The accounts clerk has asked you to prepare the invoice using spreadsheet software, so that each line amount, the trade discount, turnover tax and the amount due are all calculated by formula.</p>`,
  data: `<table border="1"><tbody><tr><td><b>From</b></td><td>Great Bay Marine Supplies Ltd, 27 Welfare Road, Cole Bay, Sint Maarten · Tel. +1 (721) 544 3170 · accounts@greatbaymarine.sx</td></tr><tr><td><b>To</b></td><td>Simpson Bay Charter Boats N.V., Dock B, Simpson Bay Lagoon Marina, Simpson Bay, Sint Maarten</td></tr><tr><td><b>Invoice No.</b></td><td>GBM-2026-0418</td></tr><tr><td><b>Date</b></td><td>14 March 2026</td></tr><tr><td><b>Order No.</b></td><td>SBC-PO-0093</td></tr><tr><td><b>Terms</b></td><td>Trade discount 10%; net 30 days</td></tr></tbody></table><br><table border="1"><thead><tr><th>Item Code</th><th>Description</th><th>Quantity</th><th>Unit Price (US$)</th></tr></thead><tbody><tr><td>MS-114</td><td>Marine Rope, 12 mm (50 m coil)</td><td style="text-align:right">4</td><td style="text-align:right">86.50</td></tr><tr><td>MS-207</td><td>Life Jacket, Adult</td><td style="text-align:right">12</td><td style="text-align:right">48.75</td></tr><tr><td>MS-332</td><td>Anchor Chain, 8 mm (per metre)</td><td style="text-align:right">30</td><td style="text-align:right">9.40</td></tr><tr><td>MS-045</td><td>Bilge Pump, 1100 GPH</td><td style="text-align:right">2</td><td style="text-align:right">129.99</td></tr><tr><td>MS-518</td><td>Fibreglass Repair Kit</td><td style="text-align:right">3</td><td style="text-align:right">64.25</td></tr><tr><td>MS-260</td><td>Navigation Light Set, LED</td><td style="text-align:right">2</td><td style="text-align:right">112.00</td></tr><tr><td>MS-401</td><td>Fender, Large</td><td style="text-align:right">6</td><td style="text-align:right">37.80</td></tr><tr><td>MS-150</td><td>Antifouling Paint (4 litre)</td><td style="text-align:right">5</td><td style="text-align:right">158.60</td></tr></tbody></table><p>Turnover tax (TOT) is charged at 5% on the amount after trade discount.</p>`,
  tasks: [
    `Create a merged and centred heading <b>GREAT BAY MARINE SUPPLIES LTD</b> with the address, telephone number and e-mail address on the lines below, and the word <b>INVOICE</b> merged and centred beneath them.`,
    `Key in the customer's name and address, Invoice No., Date, Order No. and Terms in the upper part of the sheet.`,
    `Key in the items with the column headings <b>Item Code</b>, <b>Description</b>, <b>Quantity</b>, <b>Unit Price</b> and add a column headed <b>Amount</b>.`,
    `Calculate each Amount with a formula (Quantity × Unit Price).`,
    `Sort the items in alphabetical order of Description.`,
    `Use the SUM function to calculate the <b>Subtotal</b>. Below it, calculate <b>Less Trade Discount 10%</b>, <b>Net Amount</b>, <b>Turnover Tax 5%</b> and <b>TOTAL DUE</b> with formulae.`,
    `In a note below the invoice, key in <b>Highest single line amount</b> and use the MAX function to find it.`,
    `Format Unit Price, Amount and the totals to currency (US$) with two decimal places.`,
    `Apply borders to EACH cell of the item table and a double bottom border under TOTAL DUE.`,
    `Apply an oblique heading (45°) to the five column headings of the item table and bold all headings and TOTAL DUE.`,
    `Centre Item Code and Quantity, right-align money columns, and centre the invoice horizontally on an A4 portrait page.`,
    `Insert your name and <b>Invoice using Spreadsheet Software</b> in the footer. Save as <b>GBM Invoice 0418</b>.`
  ],
  check: [
    { c: `Formatting features – Alignment: invoice centred horizontally; Item Code and Quantity centred; Description left-aligned; Unit Price, Amount and totals right-aligned`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of borders: All Borders applied to EACH cell of the document area, as instructed`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of bolding headings: company name, INVOICE, the five column headings, Subtotal and TOTAL DUE bold`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Create column and row headings: Item Code, Description, Quantity, Unit Price and Amount columns; Subtotal, Less Trade Discount 10%, Net Amount, Turnover Tax 5% and TOTAL DUE rows all present and labelled`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Insertion of oblique or vertical headings: the five item-table column headings rotated to an oblique angle and readable`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Appropriate use of borders: double bottom border under TOTAL DUE closing the invoice`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Sorting of data in table: the eight items sorted A to Z by Description (Anchor Chain first, Navigation Light Set last), with code, quantity and price kept with each item`, m: 1, p: 'APP' },
    { c: `Advanced tabulations – Simple formula 1, SUM (2): Subtotal returned by =SUM(…) as US$2,909.53; Amount formulae (Quantity × Unit Price) correct on every line`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Simple formula 2, MAX (2): highest single line amount returned by =MAX(…) as US$793.00 (Antifouling Paint (4 litre)); TOTAL DUE US$2,749.51`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Formatting using Currency: Unit Price, Amount and all totals formatted as currency (US$)`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Formatting to decimal places: all money figures fixed to two decimal places`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Merging cells: company name, address lines and the word INVOICE merged and centred across the invoice width`, m: 1, p: 'IA' }
  ],
  label: `Invoice using Spreadsheet Software`,
  tip: `Check figures: Subtotal US$2,909.53; Less Trade Discount 10% US$290.95; Net Amount US$2,618.58; Turnover Tax 5% US$130.93; TOTAL DUE US$2,749.51. Line amounts: Anchor Chain, 8 mm (per metre) 282.00; Antifouling Paint (4 litre) 793.00; Bilge Pump, 1100 GPH 259.98; Fender, Large 226.80; Fibreglass Repair Kit 192.75; Life Jacket, Adult 585.00; Marine Rope, 12 mm (50 m coil) 346.00; Navigation Light Set, LED 224.00. If candidates get a TOT of 145.48, they have charged tax before deducting the discount.`
},
{
  id: `financial-5`,
  el: `financial`,
  title: `Cash receipt for back-to-school uniforms`,
  org: `Blue Hills School Uniform Centre`,
  brief: `<p>During the back-to-school rush, the Blue Hills School Uniform Centre wants a cash receipt template in spreadsheet software that calculates the line amounts, the total paid and the change due automatically. The manager has asked you to build the receipt using one customer's purchase so it can be checked before staff begin using it.</p>`,
  data: `<table border="1"><tbody><tr><td><b>Business</b></td><td>Blue Hills School Uniform Centre, 54 Blue Hills Road, Providenciales, Turks and Caicos Islands · Tel. +1 (649) 946 6619</td></tr><tr><td><b>Receipt No.</b></td><td>004517</td></tr><tr><td><b>Date</b></td><td>21 August 2026</td></tr><tr><td><b>Received from</b></td><td>Mrs. Andrea Richardson</td></tr><tr><td><b>Payment method</b></td><td>Cash</td></tr><tr><td><b>Cash tendered</b></td><td>US$250.00</td></tr><tr><td><b>Served by</b></td><td>Jerome Hodge, Sales Assistant</td></tr></tbody></table><br><table border="1"><thead><tr><th>Description</th><th>Quantity</th><th>Unit Price (US$)</th></tr></thead><tbody><tr><td>White Shirt, Short Sleeve (Size 14)</td><td style="text-align:right">3</td><td style="text-align:right">18.50</td></tr><tr><td>Navy Trousers (Waist 30)</td><td style="text-align:right">2</td><td style="text-align:right">32.00</td></tr><tr><td>School Tie</td><td style="text-align:right">1</td><td style="text-align:right">9.75</td></tr><tr><td>Black Leather Belt</td><td style="text-align:right">1</td><td style="text-align:right">14.25</td></tr><tr><td>Navy Socks (pack of 3 pairs)</td><td style="text-align:right">2</td><td style="text-align:right">11.50</td></tr><tr><td>Embroidered School Badge</td><td style="text-align:right">3</td><td style="text-align:right">4.50</td></tr><tr><td>PE T-shirt, House Colour</td><td style="text-align:right">2</td><td style="text-align:right">15.00</td></tr></tbody></table>`,
  tasks: [
    `Create a merged and centred heading <b>BLUE HILLS SCHOOL UNIFORM CENTRE</b> with the address and telephone number below it, and <b>CASH RECEIPT</b> merged and centred underneath.`,
    `Key in Receipt No., Date, Received from and Payment method in the upper part of the receipt.`,
    `Key in the items under the column headings <b>Description</b>, <b>Quantity</b> and <b>Unit Price</b>, and add a column headed <b>Amount</b> calculated by formula (Quantity × Unit Price).`,
    `Sort the items in alphabetical order of Description.`,
    `Add a row headed <b>TOTAL</b> and use the SUM function to total the Quantity column and the Amount column.`,
    `Below the total, key in <b>Cash Tendered</b> and <b>Change Due</b>; calculate Change Due with a subtraction formula (Cash Tendered minus TOTAL).`,
    `Format Unit Price, Amount, TOTAL, Cash Tendered and Change Due to currency (US$) with two decimal places.`,
    `Apply borders to EACH cell of the item table and a thick outside border around the whole receipt.`,
    `Apply a vertical or oblique heading to the four item-table column headings and bold all headings, TOTAL and Change Due.`,
    `At the foot of the receipt key in <b>Served by: Jerome Hodge</b> and <b>Thank you – goods may be exchanged within 7 days with this receipt.</b> Centre the receipt on an A5 or A4 portrait page.`,
    `Insert your name and <b>Cash Receipt using Spreadsheet Software</b> in the footer. Save as <b>Uniform Receipt 004517</b>.`
  ],
  check: [
    { c: `Formatting features – Alignment: receipt centred on the page; Quantity centred; Description left-aligned; money columns right-aligned; closing note centred`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of borders: All Borders applied to EACH cell of the document area, as instructed`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of bolding headings: business name, CASH RECEIPT, the four column headings, TOTAL and Change Due bold`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Create column and row headings: Description, Quantity, Unit Price and Amount columns, and TOTAL, Cash Tendered and Change Due rows present and labelled; receipt details (No., Date, Received from) labelled`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Insertion of oblique or vertical headings: Description, Quantity, Unit Price and Amount headings vertical or oblique`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Appropriate use of borders: thick outside border enclosing the whole receipt`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Sorting of data in table: the seven items sorted A to Z (Black Leather Belt first, White Shirt last) with quantities and prices kept in line`, m: 1, p: 'APP' },
    { c: `Advanced tabulations – Simple formula 1, SUM (2): TOTAL Amount returned by =SUM(…) as US$210.00 and total Quantity 14 items; Amount formulae correct on every line`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Simple formula 2, subtraction formula for Change Due (2): =Cash Tendered − TOTAL returns US$40.00`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Formatting using Currency: all money cells formatted as currency (US$)`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Formatting to decimal places: all money figures fixed to two decimal places`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Merging cells: business name, address line and CASH RECEIPT merged and centred across the receipt width`, m: 1, p: 'IA' }
  ],
  label: `Cash Receipt using Spreadsheet Software`,
  tip: `Check figures: line amounts Black Leather Belt 14.25; Embroidered School Badge 13.50; Navy Socks (pack of 3 pairs) 23.00; Navy Trousers (Waist 30) 64.00; PE T-shirt, House Colour 30.00; School Tie 9.75; White Shirt, Short Sleeve (Size 14) 55.50. TOTAL US$210.00 (14 items); Cash Tendered US$250.00; Change Due US$40.00. The official scheme asks for any TWO simple formulae; here they are SUM and the subtraction for change. A candidate who types the change in as a number has not earned the formula marks.`
},
{
  id: `financial-6`,
  el: `financial`,
  title: `Bill of lading for a building-materials shipment`,
  org: `Florida Caribbean Consolidators Inc.`,
  brief: `<p>Carmichael Building &amp; Hardware Ltd is importing building materials from Florida for the hurricane-season rebuilding programme. The shipping agent, Florida Caribbean Consolidators Inc., needs a bill of lading prepared in spreadsheet software listing every line of cargo, with totals for packages, weight, measurement and declared value, and the freight charge calculated from the total measurement.</p>`,
  data: `<table border="1"><tbody><tr><td><b>Shipper</b></td><td>Florida Caribbean Consolidators Inc., 2150 SE 17th Street, Fort Lauderdale, Florida, USA</td></tr><tr><td><b>Consignee</b></td><td>Carmichael Building &amp; Hardware Ltd, 8 Carmichael Road, Nassau, The Bahamas · Tel. +1 (242) 361 2286</td></tr><tr><td><b>Notify party</b></td><td>Same as consignee</td></tr><tr><td><b>Bill of Lading No.</b></td><td>FCC-NAS-26-0412</td></tr><tr><td><b>Vessel / Voyage</b></td><td>MV Coral Trader / Voyage 26-114</td></tr><tr><td><b>Port of loading</b></td><td>Port Everglades, Florida</td></tr><tr><td><b>Port of discharge</b></td><td>Arawak Cay, Nassau, The Bahamas</td></tr><tr><td><b>Date of shipment</b></td><td>6 April 2026</td></tr><tr><td><b>Freight</b></td><td>Prepaid at US$92.50 per cubic metre</td></tr><tr><td><b>Signed for the carrier</b></td><td>Marisol Duarte, Shipping Agent</td></tr></tbody></table><br><table border="1"><thead><tr><th>Marks and Numbers</th><th>No. of Packages</th><th>Kind of Packages</th><th>Description of Goods</th><th>Gross Weight (kg)</th><th>Measurement (m³)</th><th>Declared Value (US$)</th></tr></thead><tbody><tr><td>CBH/0412/01</td><td style="text-align:right">8</td><td>Pallets</td><td>Portland Cement, 42.5 kg bags</td><td style="text-align:right">11,520.00</td><td style="text-align:right">9.60</td><td style="text-align:right">2,880.00</td></tr><tr><td>CBH/0412/02</td><td style="text-align:right">40</td><td>Bundles</td><td>Galvanised Roofing Sheets</td><td style="text-align:right">4,380.50</td><td style="text-align:right">6.25</td><td style="text-align:right">9,640.00</td></tr><tr><td>CBH/0412/03</td><td style="text-align:right">25</td><td>Cartons</td><td>PVC Pipe Fittings</td><td style="text-align:right">612.75</td><td style="text-align:right">3.10</td><td style="text-align:right">2,315.40</td></tr><tr><td>CBH/0412/04</td><td style="text-align:right">12</td><td>Crates</td><td>Ceramic Floor Tiles</td><td style="text-align:right">5,265.00</td><td style="text-align:right">7.20</td><td style="text-align:right">6,984.00</td></tr><tr><td>CBH/0412/05</td><td style="text-align:right">60</td><td>Bundles</td><td>Treated Pine Lumber, 2 x 4 in</td><td style="text-align:right">7,950.00</td><td style="text-align:right">14.40</td><td style="text-align:right">8,520.00</td></tr><tr><td>CBH/0412/06</td><td style="text-align:right">30</td><td>Drums</td><td>Exterior Paint, 5 gallon</td><td style="text-align:right">1,185.30</td><td style="text-align:right">2.85</td><td style="text-align:right">3,870.00</td></tr></tbody></table>`,
  tasks: [
    `Create the merged and centred heading <b>BILL OF LADING</b> and, below it, the merged line <b>Florida Caribbean Consolidators Inc. – Ocean Freight, Port Everglades to Nassau</b>.`,
    `Key in the Shipper, Consignee, Notify party, Bill of Lading No., Vessel/Voyage, Ports, Date of shipment and Freight terms in a bordered block in the upper part of the sheet.`,
    `Key in the cargo lines under the seven column headings given.`,
    `Sort the cargo lines in alphabetical order of Description of Goods.`,
    `Add a row headed <b>TOTAL</b> and use the SUM function to total No. of Packages, Gross Weight, Measurement and Declared Value.`,
    `Below the table, calculate <b>Freight Charge</b> as Total Measurement × US$92.50 by formula.`,
    `Key in <b>Heaviest cargo line (kg)</b> and use the MAX function on the Gross Weight column to find it.`,
    `Format Declared Value and Freight Charge to currency (US$) with two decimal places; format Gross Weight and Measurement to two decimal places.`,
    `Apply borders to EACH cell of the cargo table and a thick bottom border under the TOTAL row.`,
    `Apply vertical or oblique headings to the seven column headings and bold all headings and the TOTAL row.`,
    `Set A4 landscape with narrow margins and centre horizontally. Add <b>Signed for the carrier: Marisol Duarte, Shipping Agent</b> with a signature line at the foot.`,
    `Insert your name and <b>Bill of Lading using Spreadsheet Software</b> in the footer. Save as <b>Bill of Lading 0412</b>.`
  ],
  check: [
    { c: `Formatting features – Alignment: document centred on A4 landscape; text columns left-aligned; No. of Packages centred; weight, measurement and value right-aligned`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of borders: All Borders applied to EACH cell of the document area, as instructed`, m: 1, p: 'APP' },
    { c: `Formatting features – Appropriate use of bolding headings: BILL OF LADING, the labels in the shipping-details block, the seven column headings and the TOTAL row bold`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Create column and row headings: all seven cargo column headings, shipping-details labels, TOTAL row, Freight Charge and Heaviest cargo line labels present and correctly worded`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Insertion of oblique or vertical headings: the seven cargo column headings set vertically or at an oblique angle and readable`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Appropriate use of borders: thick bottom border under the TOTAL row and the shipping-details block bordered as a separate box`, m: 1, p: 'APP' },
    { c: `Simple tabulations – Sorting of data in table: the six cargo lines sorted A to Z by Description of Goods (Ceramic Floor Tiles first, Treated Pine Lumber last) with marks, packages and figures kept in line`, m: 1, p: 'APP' },
    { c: `Advanced tabulations – Simple formula 1, SUM (2): totals returned by =SUM(…) — 175 packages, 30,913.55 kg, 43.40 m³, US$34,209.40 declared value`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Simple formula 2, MAX (2): heaviest cargo line returned by =MAX(…) as 11,520.00 kg (Portland Cement, 42.5 kg bags); Freight Charge formula returns US$4,014.50`, m: 2, p: 'IA' },
    { c: `Advanced tabulations – Formatting using Currency: Declared Value column, TOTAL value and Freight Charge formatted as currency (US$)`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Formatting to decimal places: Gross Weight, Measurement and all money figures fixed to two decimal places`, m: 1, p: 'IA' },
    { c: `Advanced tabulations – Merging cells: BILL OF LADING and the carrier line merged and centred across all seven columns`, m: 1, p: 'IA' }
  ],
  label: `Bill of Lading using Spreadsheet Software`,
  tip: `Check figures: 175 packages; gross weight 30,913.55 kg; measurement 43.40 m³; declared value US$34,209.40; Freight Charge 43.40 × 92.50 = US$4,014.50; heaviest line Portland Cement, 42.5 kg bags at 11,520.00 kg. A bill of lading is both a receipt for goods and a document of title — ask candidates why the consignee needs the original to collect the cargo at Arawak Cay.`
},
{
  id: `committee-1`,
  el: `committee`,
  title: `Notice and agenda: fishermen's co-operative board meeting`,
  org: `Leeward Coast Fishermen's Co-operative Society`,
  brief: `<p>The Secretary of the Leeward Coast Fishermen's Co-operative Society in St. Vincent has been asked by the Chairman to call a meeting of the Board of Directors to deal with the new ice plant, the fish market stalls and the hurricane-season mooring plan. She has jotted down the details and needs a correctly displayed notice with the agenda on the same page, to be e-mailed to every director and posted at the co-operative office.</p>`,
  data: `<p><b>Secretary's notes</b></p><ul><li>Meeting: Board of Directors, Leeward Coast Fishermen's Co-operative Society</li><li>Where: Co-operative Board Room, 14 Main Street, Barrouallie</li><li>When: Wednesday 22 April 2026, 6.30 p.m.</li><li>Directors to attend: Mr. Desmond Ollivierre (Chairman), Mrs. Yvette Hazell (Vice-Chair), Mr. Kenrick Bacchus, Ms. Sharlene Brooks, Mr. Hubert Cupid, Mr. Carlos Peterson</li><li>Convenor: Mr. Desmond Ollivierre, Chairman</li><li>Secretary: Ms. Rochelle DaSilva — date the notice 8 April 2026</li><li>New business: (1) tenders received for the new ice plant; (2) allocation of stalls at the Kingstown fish market; (3) mooring plan for the 2026 hurricane season; (4) increase in members' annual dues</li><li>Usual items for the rest of the agenda; next meeting to be fixed at the meeting</li></ul>`,
  tasks: [
    `Prepare a notice of the meeting with an agenda, on one A4 page, using word-processing software.`,
    `Display the name of the organisation as the main heading and the word <b>NOTICE</b> centred below it.`,
    `In the notice paragraph, state the name of the committee, the purpose of the meeting, and the place, day, date and time. Request all members to attend.`,
    `Under the notice, list the members who should attend and state the convenor of the meeting.`,
    `Insert a "By Order" block at the right margin with the secretary's name, title and the date of the notice.`,
    `Key in the heading <b>AGENDA</b> and list the standard agenda items in order: Welcome (with a. Adoption of Agenda), Minutes of the Last Meeting, Matters Arising from the Minutes, New Business, Any Other Business, Date of Next Meeting, Adjournment.`,
    `Sub-number the New Business items (4.1, 4.2 …) using the topics given, and indent them consistently.`,
    `Use one font throughout (for example 12 pt Arial or Calibri), with the main heading in bold capitals.`,
    `Insert your name and <b>Committee Documents: Notice of a Meeting with an Agenda</b> in the footer. Save as <b>Fishermen Board Notice</b>.`
  ],
  check: [
    { c: `State place, date and time of meeting (all required for mark): Co-operative Board Room, 14 Main Street, Barrouallie; Wednesday, 22 April 2026; 6.30 p.m.`, m: 1, p: 'APP' },
    { c: `State who should attend and convenor (all required): the six directors listed and Mr. Desmond Ollivierre, Chairman, named as convenor`, m: 1, p: 'KC' },
    { c: `New Business must be sub-numbered: 4.1 Tenders for the New Ice Plant, 4.2 Allocation of Fish Market Stalls, 4.3 Hurricane Season Mooring Plan 2026, 4.4 Increase in Members' Annual Dues`, m: 1, p: 'IA' },
    { c: `Inclusion of standard Agenda Items (all 7): Welcome (with Adoption of Agenda), Minutes of the Last Meeting, Matters Arising from the Minutes, New Business, Any Other Business, Date of Next Meeting, Adjournment`, m: 1, p: 'APP' },
    { c: `Mailability (guidelines a–d, f, g): organisation name and NOTICE as headings, purpose of the meeting stated, "By Order" block with the secretary's name, title and date of issue, notice and agenda on the same page, free of typographical, spelling and grammatical errors, dates and times typed consistently`, m: 1, p: 'APP' }
  ],
  label: `Committee Documents: Notice of a Meeting with an Agenda`,
  tip: `The notes are deliberately informal ("6.30 p.m.", "(1)…(4)"). Candidates must convert them into formal agenda wording and choose one time style (6.30 p.m. or 6:30 pm) and use it consistently — guideline (f). The date of the notice (8 April) must come before the date of the meeting.`
},
{
  id: `committee-2`,
  el: `committee`,
  title: `Notice and agenda: PTA general meeting`,
  org: `Sea-Almond Secondary School Parent–Teacher Association`,
  brief: `<p>The Parent–Teacher Association of Sea-Almond Secondary School holds a general meeting at the start of each term. The PTA Secretary needs a notice and agenda that can be sent home with students and posted on the school's social media page, inviting all parents and guardians, teachers and the Principal to attend.</p>`,
  data: `<p><b>From the PTA Secretary's e-mail</b></p><p>Hi — please make up the notice for the next General Meeting of the PTA. It's on Thursday 10 September 2026 at 6.00 p.m. in the School Auditorium, Sea-Almond Secondary School, Tamarind Tree Drive, New Amsterdam, Berbice. All parents and guardians, all members of staff and the Principal should attend. The PTA President, Mr. Ricardo Persaud, is the convenor. Put my name, Mrs. Natasha Fleming, Secretary, and date it 26 August 2026.</p><p>New business: the back-to-school uniform exchange; fundraising for the new computer laboratory; the school safety and traffic plan for the morning drop-off on the main road; and elections for the class representatives. Also, the Treasurer will present the financial report — put that under new business too, first. Remember the usual items, and we'll set the next date at the meeting.</p>`,
  tasks: [
    `Prepare a notice of the meeting with an agenda, on one A4 page, using word-processing software.`,
    `Display the name of the organisation as the main heading and the word <b>NOTICE</b> centred below it.`,
    `In the notice paragraph, state the name of the committee, the purpose of the meeting, and the place, day, date and time. Request all members to attend.`,
    `Under the notice, list the members who should attend and state the convenor of the meeting.`,
    `Insert a "By Order" block at the right margin with the secretary's name, title and the date of the notice.`,
    `Key in the heading <b>AGENDA</b> and list the standard agenda items in order: Welcome (with a. Adoption of Agenda), Minutes of the Last Meeting, Matters Arising from the Minutes, New Business, Any Other Business, Date of Next Meeting, Adjournment.`,
    `Sub-number the New Business items (4.1, 4.2 …) using the topics given, and indent them consistently.`,
    `Use one font throughout (for example 12 pt Arial or Calibri), with the main heading in bold capitals.`,
    `Insert your name and <b>Committee Documents: Notice of a Meeting with an Agenda</b> in the footer. Save as <b>PTA General Meeting Notice</b>.`
  ],
  check: [
    { c: `State place, date and time of meeting (all required for mark): School Auditorium, Sea-Almond Secondary School, New Amsterdam; Thursday, 10 September 2026; 6.00 p.m.`, m: 1, p: 'APP' },
    { c: `State who should attend and convenor (all required): all parents and guardians, all members of staff and the Principal stated as attendees; Mr. Ricardo Persaud, PTA President, named as convenor`, m: 1, p: 'KC' },
    { c: `New Business must be sub-numbered: 4.1 Treasurer's Financial Report, 4.2 Back-to-School Uniform Exchange, 4.3 Fundraising for the New Computer Laboratory, 4.4 Morning Drop-off Safety and Traffic Plan, 4.5 Election of Class Representatives`, m: 1, p: 'IA' },
    { c: `Inclusion of standard Agenda Items (all 7): Welcome (with Adoption of Agenda), Minutes of the Last Meeting, Matters Arising from the Minutes, New Business, Any Other Business, Date of Next Meeting, Adjournment`, m: 1, p: 'APP' },
    { c: `Mailability (guidelines a–d, f, g): organisation name and NOTICE as headings, purpose of the meeting stated, "By Order" block with the secretary's name, title and date of issue, notice and agenda on the same page, free of typographical, spelling and grammatical errors, dates and times typed consistently`, m: 1, p: 'APP' }
  ],
  label: `Committee Documents: Notice of a Meeting with an Agenda`,
  tip: `Candidates must read the e-mail carefully: the Treasurer's report is mentioned last but must be placed first (4.1). This is the interpretation element of the scheme. Check that the casual tone of the e-mail ("Hi", "make up") has not crept into the notice.`
},
{
  id: `committee-3`,
  el: `committee`,
  title: `Notice and agenda: community hurricane-preparedness committee`,
  org: `Salem Community Council`,
  brief: `<p>The Salem Community Council in Montserrat has a Disaster Preparedness Committee that meets before each hurricane season. The Council Secretary has sent you rough notes for the next meeting and needs a formal notice with the agenda on the same page, to be posted at the community centre and sent to each committee member.</p>`,
  data: `<p><b>Rough notes from the Council Secretary</b></p><pre>DPC mtg - Sat 16 May 2026 - 10 a.m.
Salem Community Centre, Old Towne Rd
Members: Mr Glen Hodge (Chair & convenor), Mrs Agnes Fleming,
  Mr Patrick Doran, Ms Kimberly Lake, Mr Ernesto Ruiz,
  Ms Dawn Ryan-Sweeney
Sec: Mrs Lorna Connor  - notice dated 30 Apr 2026
NB:  emergency shelter at the primary school - inspection
     list of elderly + disabled residents for checks
     clearing of the ghauts and drains
     radio + phone tree for warnings
     donation of generator by local business
usual items</pre>`,
  tasks: [
    `Prepare a notice of the meeting with an agenda, on one A4 page, using word-processing software.`,
    `Display the name of the organisation as the main heading and the word <b>NOTICE</b> centred below it.`,
    `In the notice paragraph, state the name of the committee, the purpose of the meeting, and the place, day, date and time. Request all members to attend. Expand all abbreviations in the notes (DPC, mtg, Sat, Rd, Mr, Sec, NB).`,
    `Under the notice, list the members who should attend and state the convenor of the meeting.`,
    `Insert a "By Order" block at the right margin with the secretary's name, title and the date of the notice.`,
    `Key in the heading <b>AGENDA</b> and list the standard agenda items in order: Welcome (with a. Adoption of Agenda), Minutes of the Last Meeting, Matters Arising from the Minutes, New Business, Any Other Business, Date of Next Meeting, Adjournment.`,
    `Sub-number the New Business items (4.1, 4.2 …) using the topics given, and indent them consistently.`,
    `Use one font throughout (for example 12 pt Arial or Calibri), with the main heading in bold capitals.`,
    `Insert your name and <b>Committee Documents: Notice of a Meeting with an Agenda</b> in the footer. Save as <b>DPC Notice May 2026</b>.`
  ],
  check: [
    { c: `State place, date and time of meeting (all required for mark): Salem Community Centre, Old Towne Road; Saturday, 16 May 2026; 10.00 a.m.`, m: 1, p: 'APP' },
    { c: `State who should attend and convenor (all required): the six members listed with Mr. Glen Hodge identified as Chairman and convenor`, m: 1, p: 'KC' },
    { c: `New Business must be sub-numbered: 4.1 Inspection of the Emergency Shelter, 4.2 Register of Elderly and Disabled Residents, 4.3 Clearing of Ghauts and Drains, 4.4 Radio and Telephone Warning Tree, 4.5 Donation of a Generator`, m: 1, p: 'IA' },
    { c: `Inclusion of standard Agenda Items (all 7): Welcome (with Adoption of Agenda), Minutes of the Last Meeting, Matters Arising from the Minutes, New Business, Any Other Business, Date of Next Meeting, Adjournment`, m: 1, p: 'APP' },
    { c: `Mailability (guidelines a–d, f, g): organisation name and NOTICE as headings, purpose of the meeting stated, "By Order" block with the secretary's name, title and date of issue, notice and agenda on the same page, free of typographical, spelling and grammatical errors, dates and times typed consistently`, m: 1, p: 'APP' }
  ],
  label: `Committee Documents: Notice of a Meeting with an Agenda`,
  tip: `Abbreviations must be expanded (DPC = Disaster Preparedness Committee; NB here means New Business). Check that the notice names the Disaster Preparedness Committee in full, and that the new business topics have been turned into short, parallel agenda headings rather than copied as notes.`
},
{
  id: `committee-4`,
  el: `committee`,
  title: `Minutes and action items: health and safety committee`,
  org: `Great Bay Marine Supplies Ltd`,
  brief: `<p>The Health and Safety Committee of Great Bay Marine Supplies Ltd met to review safety in the warehouse and on the delivery trucks. The Secretary took notes during the meeting and now needs them written up as formal minutes for approval at the next meeting, together with a list of the action items so that each member knows what they must do.</p>`,
  data: `<p><b>Secretary's notes – Health and Safety Committee, Thursday 5 March 2026, 2.00 p.m., Conference Room, 27 Welfare Road, Cole Bay</b></p><ul>
<li>Present: Mr. Lionel Richardson (Chair), Ms. Joanne Baly, Mr. Rafael Ortiz, Mrs. Cheryl Hodge, Mr. Anil Ramkissoon. Apologies: Ms. Tricia Lake (on leave). Absent: Mr. Dwayne Peters. In attendance: Ms. Simone Brooks (Secretary), Mr. Henri Duval (Fire Safety Consultant, for item on extinguishers)</li>
<li>Chair welcomed all, especially Mr. Duval. Agenda adopted.</li>
<li>Minutes of 4 February 2026 approved — proposed Mrs. Hodge, seconded Mr. Ortiz.</li>
<li>Matters arising: new forklift safety signs now installed; first-aid kit in delivery truck 3 restocked.</li>
<li>New business (a): Fire extinguishers — Mr. Duval reported four extinguishers in the warehouse past their service date. Agreed that all must be serviced before 31 March. Mr. Ortiz to arrange.</li>
<li>New business (b): Forklift training — two new warehouse staff not yet certified. Agreed they will not drive the forklift until trained. Ms. Baly to book the training course for April.</li>
<li>New business (c): Heat stress — staff loading trucks at midday complaining of the heat. Agreed to provide a cooler of drinking water at the loading bay and to move heavy loading to before 11.00 a.m. where possible. Mrs. Hodge to draft the new loading schedule.</li>
<li>New business (d): Hurricane shutters — Mr. Ramkissoon said the warehouse shutters need two new brackets. Agreed to obtain quotations. Mr. Ramkissoon to get three quotations by 20 March.</li>
<li>AOB: Chair reminded members the annual safety audit is in June.</li>
<li>Next meeting Thursday 2 April 2026. Ended 3.25 p.m. Minutes to be approved by the Chair.</li></ul>`,
  tasks: [
    `Using word-processing software, prepare the minutes of the meeting from the secretary's notes.`,
    `Display the organisation's name, attractively presented, as the main heading. Below it give the title of the minutes with the date, time and place of the meeting.`,
    `Set out the attendance under the headings Present (identify the Chair), Absent with Apology, Absent and In Attendance.`,
    `Write the minutes in the past tense and in reported speech under the numbered headings: 1. Welcome and Adoption of Agenda, 2. Approval of the Minutes, 3. Matters Arising from the Minutes, 4. New Business, 5. Any Other Business, 6. Adjournment.`,
    `Sub-number the 4 New Business items (4.1, 4.2 …), each with a short underlined or bold sub-heading.`,
    `Close with the time of adjournment and the lines <b>Minutes prepared and submitted by:</b> and <b>Minutes approved by:</b> with the correct names.`,
    `On a separate page, prepare an <b>Action Items</b> list with the heading <b>Action Items from the … Meeting of …</b> and a bordered table with the columns Item #, Activity, Member Responsible and Deadline.`,
    `Use one font throughout and consistent spacing. Insert your name and <b>Committee Documents: Minutes of a Meeting with Action Items</b> in the footer. Save as <b>HS Minutes March 2026</b>.`
  ],
  check: [
    { c: `Title of minutes, date, time and place of meeting (all required): "Minutes of the Meeting of the Health and Safety Committee" held on Thursday, 5 March 2026 at 2.00 p.m. in the Conference Room, 27 Welfare Road, Cole Bay`, m: 2, p: 'APP' },
    { c: `All (4) standard features required: Present (with the Chair identified), Absent with Apology, Absent, In Attendance`, m: 1, p: 'KC' },
    { c: `All (7) standard headings required: Welcome, Adoption of Agenda, Approval of the Minutes, Matters Arising, New Business, Any Other Business, Adjournment — minutes approved and the creator of the minutes identified`, m: 1, p: 'APP' },
    { c: `New Business section appropriately numbered, with the action items list drawn accurately from it: 4.1 Fire Extinguishers, 4.2 Forklift Training, 4.3 Heat Stress at the Loading Bay, 4.4 Hurricane Shutters; action items list four activities with the correct member responsible (Mr. Ortiz, Ms. Baly, Mrs. Hodge, Mr. Ramkissoon) and deadlines`, m: 1, p: 'IA' }
  ],
  label: `Committee Documents: Minutes of a Meeting with Action Items`,
  tip: `Action items expected: 1. Arrange servicing of four fire extinguishers by 31 March 2026 – Mr. Rafael Ortiz; 2. Book forklift training for two new staff for April – Ms. Joanne Baly; 3. Draft the new loading schedule and arrange drinking water at the loading bay – Mrs. Cheryl Hodge; 4. Obtain three quotations for shutter brackets by 20 March 2026 – Mr. Anil Ramkissoon. Mr. Duval and Ms. Brooks go under In Attendance, not Present, because they are not committee members.`
},
{
  id: `committee-5`,
  el: `committee`,
  title: `Minutes and action items: graduation planning committee`,
  org: `Hummingbird Ridge High School Student Council`,
  brief: `<p>The Student Council's Graduation Planning Committee met to plan the Class of 2026 graduation ceremony. The Council Secretary recorded the discussion and has asked you to produce the minutes in the correct format, with a separate list of action items for the Committee and the staff adviser.</p>`,
  data: `<p><b>Secretary's notes – Graduation Planning Committee, Monday 2 March 2026, 3.15 p.m., Room B12, Hummingbird Ridge High School</b></p><ul>
<li>Present: Jaden Williams (Student Council President, Chair), Aaliyah Brooks, Mikhail Rolle, Shania Ferguson, Kevin Peterson, Daniela Ruiz. Absent with apology: Tariq Knowles (football match). Absent: Leah Pinder. In attendance: Ms. Valerie Bethel (Staff Adviser), Mrs. Joan Fleming (Secretary to the Council)</li>
<li>Chair welcomed members. Agenda adopted with one addition under AOB.</li>
<li>Minutes of 16 February 2026: one correction (the venue deposit was B$500, not B$300). Approved as corrected — proposed Aaliyah, seconded Kevin.</li>
<li>Matters arising: the Principal has approved Saturday 27 June 2026 as the graduation date; the venue deposit has been paid.</li>
<li>New business 1: Guest speaker — three names suggested. Agreed to invite a past student who is now a nurse at the main hospital in Nassau. Shania to draft the letter of invitation for Ms. Bethel's approval by 13 March.</li>
<li>New business 2: Programme booklet — agreed to design it in Publisher, with photos of each graduate. Mikhail to collect photos by 27 March.</li>
<li>New business 3: Fundraising — car wash on Saturday 21 March at the school car park. Daniela and Kevin to organise volunteers and buckets.</li>
<li>New business 4: Gowns — quotation of B$38.50 per gown from the supplier accepted. Aaliyah to collect the deposit of B$10.00 from each graduate by 3 April.</li>
<li>AOB: Kevin asked about a class photograph — agreed to discuss at the next meeting.</li>
<li>Next meeting Monday 16 March 2026. Adjourned 4.20 p.m. Minutes approved by the Chair.</li></ul>`,
  tasks: [
    `Using word-processing software, prepare the minutes of the meeting from the secretary's notes.`,
    `Display the organisation's name, attractively presented, as the main heading. Below it give the title of the minutes with the date, time and place of the meeting.`,
    `Set out the attendance under the headings Present (identify the Chair), Absent with Apology, Absent and In Attendance.`,
    `Write the minutes in the past tense and in reported speech under the numbered headings: 1. Welcome and Adoption of Agenda, 2. Approval of the Minutes, 3. Matters Arising from the Minutes, 4. New Business, 5. Any Other Business, 6. Adjournment.`,
    `Sub-number the 4 New Business items (4.1, 4.2 …), each with a short underlined or bold sub-heading.`,
    `Close with the time of adjournment and the lines <b>Minutes prepared and submitted by:</b> and <b>Minutes approved by:</b> with the correct names.`,
    `On a separate page, prepare an <b>Action Items</b> list with the heading <b>Action Items from the … Meeting of …</b> and a bordered table with the columns Item #, Activity, Member Responsible and Deadline.`,
    `Use one font throughout and consistent spacing. Insert your name and <b>Committee Documents: Minutes of a Meeting with Action Items</b> in the footer. Save as <b>Graduation Minutes 2 March</b>.`
  ],
  check: [
    { c: `Title of minutes, date, time and place of meeting (all required): "Minutes of the Meeting of the Graduation Planning Committee" held on Monday, 2 March 2026 at 3.15 p.m. in Room B12, Hummingbird Ridge High School`, m: 2, p: 'APP' },
    { c: `All (4) standard features required: Present (with the Chair identified), Absent with Apology, Absent, In Attendance`, m: 1, p: 'KC' },
    { c: `All (7) standard headings required: Welcome, Adoption of Agenda, Approval of the Minutes, Matters Arising, New Business, Any Other Business, Adjournment — minutes approved and the creator of the minutes identified`, m: 1, p: 'APP' },
    { c: `New Business section appropriately numbered, with the action items list drawn accurately from it: 4.1 Guest Speaker, 4.2 Programme Booklet, 4.3 Fundraising Car Wash, 4.4 Graduation Gowns; action items list the four tasks with the correct students named (Shania; Mikhail; Daniela and Kevin; Aaliyah) and deadlines`, m: 1, p: 'IA' }
  ],
  label: `Committee Documents: Minutes of a Meeting with Action Items`,
  tip: `Action items expected: draft invitation to guest speaker – Shania Ferguson (13 March); collect graduate photographs – Mikhail Rolle (27 March); organise car wash volunteers and equipment – Daniela Ruiz and Kevin Peterson (21 March); collect B$10.00 gown deposits – Aaliyah Brooks (3 April). The corrected minutes ("approved as corrected") must be recorded, and full names used in the minutes even though the notes use first names.`
},
{
  id: `committee-6`,
  el: `committee`,
  title: `Minutes and action items: heritage festival organising committee`,
  org: `George Town Heritage Festival Committee`,
  brief: `<p>A volunteer committee is organising a one-day Heritage Festival on the George Town waterfront in Grand Cayman to celebrate local food, music and crafts. The committee's Secretary has handed you her notes of the last meeting. Prepare the formal minutes for circulation and a list of action items so that each person knows what has been assigned to them.</p>`,
  data: `<p><b>Secretary's notes – Organising Committee, Tuesday 14 July 2026, 7.00 p.m., George Town Community Library Meeting Room, Edward Street</b></p><ul>
<li>Present: Mrs. Maureen Ebanks (Chairperson), Mr. Elton Hodge, Ms. Priya Lalwani, Mr. Jean-Marc Ruiz, Ms. Celestine Brooks, Mr. Orlando Bodden. Apology: Mr. Ivan Richardson (overseas). Absent: Ms. Kaydene Lake. In attendance: Ms. Gail Peterson (Secretary)</li>
<li>Chairperson welcomed members. Agenda adopted.</li>
<li>Minutes of 23 June 2026 approved — proposed Mr. Hodge, seconded Ms. Lalwani.</li>
<li>Matters arising: permission to use the waterfront on Saturday 17 October 2026 received in writing; the stage hire firm has confirmed.</li>
<li>New 1 – Food and craft stalls: 32 applications received for 24 spaces. Agreed a selection panel of Ms. Brooks and Mr. Bodden will choose by 31 July, giving priority to traditional foods and local crafts.</li>
<li>New 2 – Music line-up: agreed on a string band, a steel pan side and a youth choir. Mr. Ruiz to confirm all three acts in writing by 7 August.</li>
<li>New 3 – Sponsorship: target CI$6,500.00; CI$2,750.00 pledged so far. Ms. Lalwani to approach five more businesses.</li>
<li>New 4 – Waste and recycling: agreed to have recycling bins at every stall and volunteers to sort waste. Mr. Hodge to contact the recycling initiative for bins.</li>
<li>New 5 – Publicity: posters, radio and social media from 1 September. Mrs. Ebanks to draft the press release.</li>
<li>AOB: Mr. Bodden suggested a heritage quiz for children — welcomed.</li>
<li>Next meeting Tuesday 4 August 2026. Meeting closed 8.40 p.m. Minutes approved by the Chairperson.</li></ul>`,
  tasks: [
    `Using word-processing software, prepare the minutes of the meeting from the secretary's notes.`,
    `Display the organisation's name, attractively presented, as the main heading. Below it give the title of the minutes with the date, time and place of the meeting.`,
    `Set out the attendance under the headings Present (identify the Chair), Absent with Apology, Absent and In Attendance.`,
    `Write the minutes in the past tense and in reported speech under the numbered headings: 1. Welcome and Adoption of Agenda, 2. Approval of the Minutes, 3. Matters Arising from the Minutes, 4. New Business, 5. Any Other Business, 6. Adjournment.`,
    `Sub-number the 5 New Business items (4.1, 4.2 …), each with a short underlined or bold sub-heading.`,
    `Close with the time of adjournment and the lines <b>Minutes prepared and submitted by:</b> and <b>Minutes approved by:</b> with the correct names.`,
    `On a separate page, prepare an <b>Action Items</b> list with the heading <b>Action Items from the … Meeting of …</b> and a bordered table with the columns Item #, Activity, Member Responsible and Deadline.`,
    `Use one font throughout and consistent spacing. Insert your name and <b>Committee Documents: Minutes of a Meeting with Action Items</b> in the footer. Save as <b>Heritage Festival Minutes July</b>.`
  ],
  check: [
    { c: `Title of minutes, date, time and place of meeting (all required): "Minutes of the Meeting of the Heritage Festival Organising Committee" held on Tuesday, 14 July 2026 at 7.00 p.m. in the George Town Community Library Meeting Room, Edward Street`, m: 2, p: 'APP' },
    { c: `All (4) standard features required: Present (with the Chair identified), Absent with Apology, Absent, In Attendance`, m: 1, p: 'KC' },
    { c: `All (7) standard headings required: Welcome, Adoption of Agenda, Approval of the Minutes, Matters Arising, New Business, Any Other Business, Adjournment — minutes approved and the creator of the minutes identified`, m: 1, p: 'APP' },
    { c: `New Business section appropriately numbered, with the action items list drawn accurately from it: 4.1 Food and Craft Stalls, 4.2 Music Line-up, 4.3 Sponsorship, 4.4 Waste and Recycling, 4.5 Publicity; action items list the five tasks with the correct members (Ms. Brooks and Mr. Bodden; Mr. Ruiz; Ms. Lalwani; Mr. Hodge; Mrs. Ebanks) and deadlines where given`, m: 1, p: 'IA' }
  ],
  label: `Committee Documents: Minutes of a Meeting with Action Items`,
  tip: `Action items expected: select 24 stallholders by 31 July – Ms. Celestine Brooks and Mr. Orlando Bodden; confirm three music acts by 7 August – Mr. Jean-Marc Ruiz; approach five more sponsors (CI$3,750.00 still needed) – Ms. Priya Lalwani; arrange recycling bins – Mr. Elton Hodge; draft press release before 1 September – Mrs. Maureen Ebanks. The amount still needed (CI$6,500.00 − CI$2,750.00 = CI$3,750.00) is an interpretation point candidates can add to the activity.`
}
]);
