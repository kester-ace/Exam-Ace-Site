// CAPE Digital Media Unit 1 · Mock Paper 01s (Sets 1–3). Developed by Kester Small.
// Based on the CAPE Digital Media syllabus.
window.COURSE_PAPERS = (window.COURSE_PAPERS || []).concat([
{
  kind: 'p1', id: 'DMOCK1', title: 'Mock Paper 01 · Set 1', time: 90,
  intro: `<p><b>CAPE Digital Media Unit 1 · Grade One · Mock Paper 01 · Set 1</b> · 1 hour 30 minutes · 45 items</p><ol><li>Answer <b>ALL</b> items. Each item has four options (A), (B), (C), (D).</li><li>Items 1–15 Module 1, 16–30 Module 2, 31–45 Module 3.</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>`,
  items: [
    // ---------- Module 1 ----------
    { // 1
      q: `During an online match, a gamer in Grenada notices a delay between pressing a button and seeing the action on screen, even though his connection downloads large files quickly. This delay is BEST described as`,
      options: [`latency`, `compression`, `resolution`, `bandwidth`],
      answer: 0, module: '1',
      why: `Key: A. Latency is the time data take to travel from source to destination, felt as lag. Fast downloads show that his bandwidth (the amount of data per second) is good, so bandwidth is not the problem.`
    },
    { // 2
      q: `Which of the following characteristics distinguishes digital art from traditional artwork?`,
      options: [`It exists as a single, unique tangible original`, `It can be edited, undone and refined without permanently altering the work`, `It is difficult to modify once a change has been made`, `It relies mainly on hand-crafted techniques with physical materials`],
      answer: 1, module: '1',
      why: `Key: B. Digital art exists as digital files that are easy to edit (undo and refine). A unique tangible original, hand-crafted techniques and permanent changes all describe traditional artwork.`
    },
    { // 3
      passage: `<p><b>Item 3</b> refers to the following file information.</p><div class="tablewrap"><table><thead><tr><th></th><th>File A</th><th>File B</th></tr></thead><tbody>
<tr><td>File name</td><td>villa_logo.png</td><td>villa_logo.svg</td></tr>
<tr><td>Graphic type</td><td>Raster</td><td>Vector</td></tr>
<tr><td>Dimensions</td><td>800 × 800 pixels</td><td>Scalable</td></tr>
<tr><td>Resolution</td><td>72 ppi</td><td>Not applicable</td></tr>
<tr><td>File size</td><td>312 KB</td><td>22 KB</td></tr></tbody></table></div>`,
      q: `The marketing team of a villa in St Kitts needs to print its logo on a 3-metre billboard. Which file should the team use, and why?`,
      options: [`File B, because SVG files use lossy compression to reduce file size`, `File A, because PNG files support transparency and therefore print more sharply`, `File B, because vector graphics are defined mathematically and scale without pixelation`, `File A, because its larger file size means it holds more detail`],
      answer: 2, module: '1',
      why: `Key: C. Vector (SVG) artwork is stored as paths and shapes, so it can be enlarged to any size with no loss of quality. File A is only 800 × 800 pixels, so it would pixelate on a billboard; a larger file size does not mean it will scale, and SVG is not a lossy format.`
    },
    { // 4
      q: `Web 3.0 is MOST often described as the`,
      options: [`read-write social web driven mainly by user-generated content`, `read-only web of static pages created by a small number of publishers`, `symbiotic web, in which humans and intelligent machines work together as partners`, `semantic and decentralised web, in which linked data allow machines to interpret meaning`],
      answer: 3, module: '1',
      why: `Key: D. Web 3.0 is the semantic and decentralised web. Read-only describes Web 1.0, read-write/social describes Web 2.0 and the symbiotic web is Web 4.0.`
    },
    { // 5
      q: `Which of the following are barriers that may prevent equal access to digital media in rural communities in Guyana?<br><br>I. Limited broadband infrastructure<br>II. The cost of devices and mobile data<br>III. Low levels of digital literacy`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 3, module: '1',
      why: `Key: D. Infrastructure, cost and education (including digital literacy) are all barriers to equal access, so all three statements apply.`
    },
    { // 6
      q: `The Barbados meteorological office publishes a web page with a colour-coded parish map and charts showing hourly rainfall levels. This product is BEST classified as`,
      options: [`digital photography and imaging`, `immersive media`, `animation and motion graphics`, `data and information design`],
      answer: 3, module: '1',
      why: `Key: D. Dashboards, maps, charts and data visualisations fall under data and information design. Immersive media, such as XR and virtual tours, places the user inside an environment, which a rainfall map does not do.`
    },
    { // 7
      q: `A Dominican animator produces a children's series narrated in Kwéyòl that features characters from local folklore. Which benefit of Caribbean-centric content does this BEST demonstrate?`,
      options: [`It guarantees higher advertising revenue than imported content`, `It reduces production costs because local voices are always cheaper`, `It preserves culture and language while increasing global visibility for Caribbean creators`, `It removes the need for cultural sensitivity and audience awareness`],
      answer: 2, module: '1',
      why: `Key: C. Using local language and folklore preserves heritage and showcases Caribbean creators to the world. Cost savings and guaranteed revenue are not assured, and Caribbean-centric content still requires cultural sensitivity.`
    },
    { // 8
      q: `Which statement BEST defines a digital media platform (DMP)?`,
      options: [`A physical storage device used to archive digital media files`, `A set of laws that governs how content is distributed online`, `A digitised system for delivering video, audio and/or data to multiple networks such as cable, satellite and the Internet`, `A software application used only to edit audio and video`],
      answer: 2, module: '1',
      why: `Key: C. A DMP is defined as a digitised platform for delivering video, audio and/or data to multiple networks (Telco, cable, satellite, digital terrestrial broadcasting, the Internet). Storage devices, editing software and laws are not delivery platforms.`
    },
    { // 9
      passage: `<p><b>Item 9</b> refers to the following comparison of four platforms.</p><div class="tablewrap"><table><thead><tr><th>Platform</th><th>Main content format</th><th>Strongest audience</th><th>Key feature</th></tr></thead><tbody>
<tr><td>P</td><td>Short vertical video (15–60 seconds)</td><td>16–24-year-olds</td><td>Algorithm-driven discovery feed</td></tr>
<tr><td>Q</td><td>Long-form video</td><td>All ages</td><td>Searchable, with chapters and subscriptions</td></tr>
<tr><td>R</td><td>Professional articles and posts</td><td>Working professionals</td><td>Networking and recruitment</td></tr>
<tr><td>S</td><td>Audio episodes</td><td>Commuters</td><td>Downloadable for offline listening</td></tr></tbody></table></div>`,
      q: `The careers department of Sea-Almond Secondary School wants to publish detailed 20-minute video tutorials on CV writing that students can search for and return to later. Which platform is MOST suitable?`,
      options: [`Platform R`, `Platform P`, `Platform S`, `Platform Q`],
      answer: 3, module: '1',
      why: `Key: D. Platform Q supports long-form video that is searchable and organised into chapters, which suits 20-minute tutorials students revisit. Platform P limits clips to 60 seconds, and Platform S carries audio only.`
    },
    { // 10
      q: `Which of the following are responsibilities of a good digital citizen?<br><br>I. Verifying sources before sharing information<br>II. Protecting the privacy of other people online<br>III. Sharing breaking news as widely and quickly as possible`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 0, module: '1',
      why: `Key: A. Verification of sources and privacy protection are listed responsibilities. Sharing news as quickly as possible, without checking it, spreads misinformation, so III is not a responsibility.`
    },
    { // 11
      q: `A Trinidadian company keeps the exact blend of spices in its pepper sauce known only to three staff members, who sign confidentiality agreements. The recipe is protected as a`,
      options: [`trade secret`, `patent`, `industrial design`, `trademark`],
      answer: 0, module: '1',
      why: `Key: A. A trade secret is a confidential formula or process kept secret to give a business an advantage. A patent would require the recipe to be publicly disclosed; trademarks protect brand names and logos; industrial designs protect a product's appearance.`
    },
    { // 12
      q: `A Bahamian magazine pays a single fee for a stock photograph and may then use it in several issues without paying again. The photograph was MOST likely licensed as`,
      options: [`a Creative Commons licence`, `royalty-free`, `public domain`, `rights-managed`],
      answer: 1, module: '1',
      why: `Key: B. Royalty-free content is paid for once and can be reused within the licence terms. Rights-managed content is priced for each specific use, while public-domain and Creative Commons works are available without a fee.`
    },
    { // 13
      q: `A student asks an AI chatbot about the history of Fort Shirley in Dominica. It confidently gives a date and a quotation that cannot be found in any historical record. This risk of AI is known as`,
      options: [`algorithmic bias`, `a deepfake`, `data misuse`, `AI hallucination`],
      answer: 3, module: '1',
      why: `Key: D. AI hallucination occurs when a tool generates false information and presents it as fact. A deepfake is synthetic audio or video imitating a real person; bias is unfair skew in outputs; neither describes invented facts.`
    },
    { // 14
      q: `Which Creative Commons licence condition requires anyone who adapts a work to release the new version under the same licence terms?`,
      options: [`ShareAlike (SA)`, `NoDerivatives (ND)`, `NonCommercial (NC)`, `Attribution (BY)`],
      answer: 0, module: '1',
      why: `Key: A. ShareAlike requires adaptations to carry the same licence. Attribution requires credit, NonCommercial forbids commercial use and NoDerivatives forbids adaptations altogether.`
    },
    { // 15
      q: `Before a new mobile payment app was publicly launched in Barbados, a small group of technology enthusiasts tested an early version, accepting its bugs and risks. In the technology adoption lifecycle, these users are`,
      options: [`early majority`, `early adopters`, `laggards`, `innovators`],
      answer: 3, module: '1',
      why: `Key: D. Innovators are the first, most venturesome group, willing to try a product before it is proven. Early adopters follow once the product is launched and are opinion leaders; the early majority wait for evidence that it works.`
    },
    // ---------- Module 2 ----------
    { // 16
      q: `Which of the following practices is MOST typical of a digital native?`,
      options: [`Phoning a help desk rather than searching online for a solution`, `Printing emails before reading them`, `Learning a new skill by searching for short online video tutorials`, `Reading a device's printed manual fully before using it`],
      answer: 2, module: '2',
      why: `Key: C. Digital natives grew up with digital technology and tend to learn by searching online and watching videos. Printing emails, phoning a help desk and reading printed manuals first are practices associated with digital immigrants.`
    },
    { // 17
      q: `In the digital media ecosystem, a body that sets and enforces rules for telecommunications providers across several Eastern Caribbean states is BEST classified as a(n)`,
      options: [`advertiser`, `regulator`, `distributor`, `infrastructure provider`],
      answer: 1, module: '2',
      why: `Key: B. Regulators make and enforce rules for the industry. Infrastructure providers build and run the networks themselves, and distributors deliver content; neither sets the rules.`
    },
    { // 18
      q: `A Jamaican reggae artist now uploads her songs straight to streaming services instead of signing with a record label and a physical distributor. This change in the value chain is known as`,
      options: [`outsourcing`, `disintermediation`, `aggregation`, `convergence`],
      answer: 1, module: '2',
      why: `Key: B. Disintermediation is the removal of intermediaries (here the label and physical distributor) so producers reach end-users directly. Aggregation is gathering content from many sources; convergence is the merging of technologies.`
    },
    { // 19
      q: `Marisol in Guyana earns income by completing hundreds of small online tasks, such as tagging images and transcribing ten-second audio clips, each paying a few cents. This work model is known as`,
      options: [`telecommuting`, `micro-work`, `hybrid work`, `outsourcing`],
      answer: 1, module: '2',
      why: `Key: B. Micro-work involves very small, quickly completed online tasks paid individually. Telecommuting is doing a regular job from a remote location; hybrid work splits time between office and home.`
    },
    { // 20
      q: `Which of the following are characteristics of the modern digital media work environment?<br><br>I. Project-based production for clients in different countries<br>II. Continuous learning to keep up with technological change<br>III. Guaranteed long-term employment with a single employer`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 0, module: '2',
      why: `Key: A. Project-based production, globalisation and continuous learning are characteristics of the modern digital media work environment. Freelancing, gig work and portfolio careers mean long-term employment with one employer is not guaranteed.`
    },
    { // 21
      q: `A Belizean app developer finds that several international platforms will not pay her earnings into a bank account in her country. This is an example of which regional challenge?`,
      options: [`Inadequate production infrastructure`, `Limited payment access`, `Training gaps`, `Small market size`],
      answer: 1, module: '2',
      why: `Key: B. Payment access is a recognised regional issue: creators may be unable to receive platform payouts. Market size, training and production infrastructure are separate challenges not described here.`
    },
    { // 22
      q: `Which section of a project proposal gives a brief overview of the whole project so that a busy funder can quickly understand its purpose, cost and expected benefits?`,
      options: [`Plan of action`, `Introduction and background`, `Appendices`, `Executive summary`],
      answer: 3, module: '2',
      why: `Key: D. The executive summary condenses the whole proposal into a short overview at the start. The introduction and background give context in more depth, the plan of action sets out tasks, and appendices hold supporting documents.`
    },
    { // 23
      passage: `<p><b>Items 23–24</b> refer to the following timeline for <i>Taste of Grenada</i>, a student web series planned with the agile model.</p><div class="tablewrap"><table><thead><tr><th>Week</th><th>Activity</th></tr></thead><tbody>
<tr><td>1</td><td>Define goals, scope, tasks and a budget of EC$6 000</td></tr>
<tr><td>2–3</td><td>Film and edit Episode 1 while tracking expenses</td></tr>
<tr><td>4</td><td>Show Episode 1 to a focus group of 12 students; compare actual spending with the budget</td></tr>
<tr><td>5</td><td>Re-edit Episode 1 using the feedback; adjust resources and schedule</td></tr>
<tr><td>6</td><td>Release Episode 1 online; review overall performance and total costs</td></tr></tbody></table></div>`,
      q: `In the agile model, the activity in Week 4 represents the`,
      options: [`sprint stage`, `review stage`, `iteration stage`, `delivery stage`],
      answer: 1, module: '2',
      why: `Key: B. Review means evaluating completed work, gathering feedback and comparing actual spending with the planned budget, which is exactly what happens in Week 4. The sprint is Weeks 2–3 and iteration is Week 5.`
    },
    { // 24
      passage: `<p><b>Items 23–24</b> refer to the following timeline for <i>Taste of Grenada</i>, a student web series planned with the agile model.</p><div class="tablewrap"><table><thead><tr><th>Week</th><th>Activity</th></tr></thead><tbody>
<tr><td>1</td><td>Define goals, scope, tasks and a budget of EC$6 000</td></tr>
<tr><td>2–3</td><td>Film and edit Episode 1 while tracking expenses</td></tr>
<tr><td>4</td><td>Show Episode 1 to a focus group of 12 students; compare actual spending with the budget</td></tr>
<tr><td>5</td><td>Re-edit Episode 1 using the feedback; adjust resources and schedule</td></tr>
<tr><td>6</td><td>Release Episode 1 online; review overall performance and total costs</td></tr></tbody></table></div>`,
      q: `In Week 4, the team finds it spent 30 per cent more than planned on equipment rental. According to the agile model, when should the budget be updated?`,
      options: [`During the iteration stage in Week 5`, `Never, because the budget is fixed once the project starts`, `Only at the planning stage in Week 1`, `During the delivery stage in Week 6`],
      answer: 0, module: '2',
      why: `Key: A. Iteration means making improvements, adjusting resources and timelines and updating the budget as needed, which is Week 5. Agile is flexible, so the budget is not fixed in Week 1, and waiting until delivery would be too late to act.`
    },
    { // 25
      q: `In a pitch for a Barbadian cooking app, the founder explains that the app will be downloaded from the major mobile app stores. Which of the 4Ps of marketing is she addressing?`,
      options: [`Price`, `Product`, `Promotion`, `Place`],
      answer: 3, module: '2',
      why: `Key: D. Place is where and how customers obtain the product, which here is the app stores. Promotion would describe how the app is advertised, and product would describe its features.`
    },
    { // 26
      q: `An angel investor gives a St Lucian animation studio US$40 000 in return for a 20 per cent share of the business. This is an example of`,
      options: [`a revenue-sharing model`, `debt financing`, `a grant`, `equity financing`],
      answer: 3, module: '2',
      why: `Key: D. Equity financing exchanges ownership (shares) for capital. Debt financing must be repaid with interest, and a grant does not take ownership.`
    },
    { // 27
      q: `A Trinidadian technology reviewer earns a commission each time a viewer buys a product through a special link in her video description. This creator income model is`,
      options: [`a brand partnership`, `licensing`, `affiliate marketing`, `a paid membership`],
      answer: 2, module: '2',
      why: `Key: C. Affiliate marketing pays a commission for each sale made through the creator's tracked link. A brand partnership is a paid agreement with a brand, often a fixed fee, rather than payment per sale.`
    },
    { // 28
      q: `Which of the following is a DISPOSITION rather than a skill needed in the digital media industry?`,
      options: [`Basic financial literacy`, `Openness to feedback`, `Pitching`, `Project management`],
      answer: 1, module: '2',
      why: `Key: B. Dispositions are attitudes and habits of mind, such as openness to feedback, curiosity and resilience. Project management, pitching and financial literacy are skills that can be taught and practised.`
    },
    { // 29
      q: `A group of CAPE students in St Kitts launches a crowdfunding campaign to pay for a documentary. Which of the following are advantages of this source of funding?<br><br>I. It can test public interest in the project before production<br>II. It requires the students to offer property as collateral<br>III. It can build a community of supporters before release`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 1, module: '2',
      why: `Key: B. Crowdfunding shows whether people care enough to pay and builds an audience early. Collateral is a requirement of bank loans (debt financing), not crowdfunding, so II is false.`
    },
    { // 30
      q: `A messaging app becomes more valuable to each user as more of that user's friends and family join it. This is known as`,
      options: [`convergence`, `the long tail`, `a network effect`, `disintermediation`],
      answer: 2, module: '2',
      why: `Key: C. A network effect occurs when a platform gains value as more people use it, a key feature of platform economies. The long tail refers to selling many niche items in small quantities.`
    },
    // ---------- Module 3 ----------
    { // 31
      q: `In the creative design process, which stage comes immediately AFTER Definition?`,
      options: [`Implementation`, `Ideation`, `Selection`, `Analysis`],
      answer: 1, module: '3',
      why: `Key: B. The sequence is Acceptance, Analysis, Definition, Ideation, Selection, Implementation, Evaluation. Once the problem is defined, ideas are generated (Ideation); Analysis comes before Definition.`
    },
    { // 32
      passage: `<p><b>Item 32</b> refers to the following description of a diagram.</p><p>Acceptance → Analysis → Definition → Ideation → Selection → Implementation → Evaluation, with a single arrow leading from Evaluation back to Acceptance so that the whole sequence begins again.</p>`,
      q: `Which method of implementing the creative process does the diagram illustrate?`,
      options: [`Linear`, `Branched network`, `Stepped with intermediate feedback loops`, `Cyclic`],
      answer: 3, module: '3',
      why: `Key: D. A cyclic model loops from the final stage back to the start so the process repeats. A linear model has no return arrow; stepped models have feedback loops between stages, and branched networks split into parallel paths.`
    },
    { // 33
      q: `To generate names for a new Bajan juice brand, a team writes the word “sunshine” on the board and each member quickly calls out the first related word that comes to mind. Which ideation technique are they using?`,
      options: [`Free writing`, `Storyboarding`, `Mind mapping`, `Word association`],
      answer: 3, module: '3',
      why: `Key: D. Word association builds ideas by responding quickly to a prompt word. Mind mapping arranges ideas in branches around a central idea, and free writing is writing continuously without stopping.`
    },
    { // 34
      q: `A team designing a health app for elderly residents of Nevis interviews seniors, observes them using phones and tests large-button prototypes with them. This approach is BEST described as`,
      options: [`user-centred design`, `designing for future needs`, `a branched network`, `linear implementation`],
      answer: 0, module: '3',
      why: `Key: A. User-centred design involves the intended users throughout, through interviews, observation and testing. Designing for future needs focuses on anticipating later changes in technology or demand.`
    },
    { // 35
      q: `Before filming interviews with vendors in a Kingston market for a documentary, the producer asks each vendor to sign a form allowing the use of his or her image and voice. This document is a`,
      options: [`talent release`, `copyright licence`, `location permit`, `production schedule`],
      answer: 0, module: '3',
      why: `Key: A. A talent (personal) release gives permission to record and use a person's likeness and voice. A location permit gives permission to film at a place, not to use a person's image.`
    },
    { // 36
      passage: `<p><b>Item 36</b> refers to the following storyboard for a 30-second water-conservation announcement in Barbados.</p><div class="tablewrap"><table><thead><tr><th>Frame</th><th>Shot and action</th><th>Audio</th><th>Time</th></tr></thead><tbody>
<tr><td>1</td><td>Wide shot of a dry, cracked reservoir under a midday sun</td><td>Cicadas</td><td>0–5 s</td></tr>
<tr><td>2</td><td>Close-up of a single drop falling from a dripping tap</td><td>Voice-over: “Every drop counts.”</td><td>5–12 s</td></tr>
<tr><td>3</td><td>Medium shot of a girl turning off the tap while brushing her teeth</td><td>Soft steelpan music</td><td>12–22 s</td></tr>
<tr><td>4</td><td>Water authority logo with the text “Save water. Save Barbados.”</td><td>Music ends</td><td>22–30 s</td></tr></tbody></table></div>`,
      q: `Frame 2 uses a close-up shot MAINLY to`,
      options: [`establish the location and setting of the story`, `show the relationship between two characters`, `reduce the number of frames needed in the storyboard`, `draw the viewer's attention to a small but important detail`],
      answer: 3, module: '3',
      why: `Key: D. A close-up isolates a detail, here the wasted drop, to emphasise the message. Establishing the setting is the job of the wide shot in Frame 1.`
    },
    { // 37
      q: `When applying the rule of thirds to a portrait of a Carnival masquerader, the photographer should place the subject's eyes`,
      options: [`along the upper horizontal line, near an intersection point`, `on the vertical centre line, with equal space on both sides`, `along the bottom edge of the frame`, `exactly in the centre of the frame`],
      answer: 0, module: '3',
      why: `Key: A. The rule of thirds divides the frame into nine sections and places key features on the lines or their intersections; the eyes usually sit on the upper third line. Centring the subject is the approach the rule moves away from.`
    },
    { // 38
      q: `In a three-point lighting set-up for an interview, which light is used to soften the shadows created by the main light?`,
      options: [`Key light`, `Fill light`, `Back light`, `Ambient light`],
      answer: 1, module: '3',
      why: `Key: B. The fill light, placed opposite the key light, softens its shadows. The key light is the main light that creates them, and the back light separates the subject from the background.`
    },
    { // 39
      q: `A Grenadian spa wants its website to communicate calm, relaxation and trust. Which colour palette is MOST appropriate?`,
      options: [`Black and neon yellow`, `Deep purple and bright magenta`, `Soft blues and greens`, `Bright reds and oranges`],
      answer: 2, module: '3',
      why: `Key: C. In colour psychology, blues suggest calm and trust and greens suggest nature and balance. Reds and oranges suggest energy and urgency, and black with neon yellow suggests warning.`
    },
    { // 40
      q: `A school club with no software budget needs to remove background hiss from a podcast recording. Which tool is MOST suitable?`,
      options: [`Figma`, `Audacity`, `Adobe Audition`, `GIMP`],
      answer: 1, module: '3',
      why: `Key: B. Audacity is free, open-source audio software with noise-reduction tools. Adobe Audition can also do this but requires a paid subscription; GIMP edits images and Figma is for interface design.`
    },
    { // 41
      q: `A student has finished a promotional video for her school and wants it to play on smartphones, laptops and smart TVs. Which of the following actions would improve device compatibility?<br><br>I. Exporting it as an MP4 file<br>II. Sharing only the editing software's project file<br>III. Testing playback on several devices before publishing`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 1, module: '3',
      why: `Key: B. MP4 plays on almost every device, and testing on several devices confirms compatibility. A project file opens only in the editing software, so II would prevent playback.`
    },
    { // 42
      q: `A CAPE class in Guyana wants every student to add, edit and update shared notes on one web page that keeps a history of all changes. Which communication tool is BEST?`,
      options: [`A wiki`, `Email`, `A blog`, `A live stream`],
      answer: 0, module: '3',
      why: `Key: A. A wiki allows many users to edit the same pages collaboratively and keeps a revision history. A blog is usually written by one author in dated posts, with readers limited to commenting.`
    },
    { // 43
      q: `A designer needs a full-colour logo with a soft drop shadow and a transparent background for a website, with no loss of quality. Which file format is MOST suitable?`,
      options: [`JPEG`, `MP4`, `GIF`, `PNG`],
      answer: 3, module: '3',
      why: `Key: D. PNG is lossless, supports millions of colours and full (alpha) transparency, so soft shadows stay smooth. JPEG has no transparency, and GIF is limited to 256 colours with hard-edged transparency.`
    },
    { // 44
      passage: `<p><b>Item 44</b> refers to the following file properties.</p><div class="tablewrap"><table><tbody><tr><th>File name</th><td>mashramani_recap.mov</td></tr>
<tr><th>Duration</th><td>3 min 20 s</td></tr>
<tr><th>Resolution</th><td>3840 × 2160 pixels</td></tr>
<tr><th>Frame rate</th><td>60 fps</td></tr>
<tr><th>File size</th><td>6.8 GB</td></tr></tbody></table></div>`,
      q: `The student must upload this file to the school's learning platform, which accepts files of up to 500 MB. Which change would reduce the file size MOST while keeping the video watchable on laptops?`,
      options: [`Exporting it as an MP4 at 1920 × 1080 pixels and 30 fps`, `Exporting it as an uncompressed AVI file`, `Increasing the frame rate to 120 fps`, `Renaming the file extension from .mov to .mp4`],
      answer: 0, module: '3',
      why: `Key: A. Re-exporting with compression at a lower resolution and frame rate cuts the data per second dramatically, and 1080p remains clear on laptops. Renaming the extension does not re-encode the video, and higher frame rates or uncompressed files make it bigger.`
    },
    { // 45
      q: `Which of the following would BEST show the design process in a student's digital proposal portfolio?`,
      options: [`A list of the software the student has installed`, `Brainstorming notes, storyboards and drafts showing how the idea developed into the final product`, `Only the polished final product, exported at the highest resolution`, `Copies of professional work that inspired the student`],
      answer: 1, module: '3',
      why: `Key: B. The portfolio is expected to show the design process from research to final solution, so evidence of brainstorming, planning and drafts is needed. A final product alone does not show the process.`
    },
  ]
},
{
  kind: 'p1', id: 'DMOCK2', title: 'Mock Paper 01 · Set 2', time: 90,
  intro: `<p><b>CAPE Digital Media Unit 1 · Grade One · Mock Paper 01 · Set 2</b> · 1 hour 30 minutes · 45 items</p><ol><li>Answer <b>ALL</b> items. Each item has four options (A), (B), (C), (D).</li><li>Items 1–15 Module 1, 16–30 Module 2, 31–45 Module 3.</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>`,
  items: [
    // ---------- Module 1 ----------
    { // 1
      q: `Software or hardware that encodes and decodes digital audio or video, such as H.264, is called a`,
      options: [`metadata tag`, `codec`, `colour profile`, `file container`],
      answer: 1, module: '1',
      why: `Key: B. A codec (coder–decoder) compresses and decompresses media data. A container, such as MP4 or MOV, is the file that holds the encoded streams but is not itself the encoder.`
    },
    { // 2
      passage: `<p><b>Item 2</b> refers to the following properties of a photograph taken by Rhea at her home and posted on a public social media account.</p><div class="tablewrap"><table><tbody><tr><th>File name</th><td>IMG_2045.jpg</td></tr>
<tr><th>Camera model</th><td>Smartphone, rear camera</td></tr>
<tr><th>Date taken</th><td>11 November 2025, 10:42</td></tr>
<tr><th>GPS location</th><td>18.0425° N, 63.0548° W</td></tr>
<tr><th>Dimensions</th><td>4032 × 3024 pixels</td></tr>
<tr><th>Author</th><td>R. Hodge</td></tr></tbody></table></div>`,
      q: `Which item of information shown in the exhibit poses the GREATEST privacy risk now that the photograph is public?`,
      options: [`Camera model`, `GPS location`, `Date taken`, `Dimensions`],
      answer: 1, module: '1',
      why: `Key: B. This metadata includes GPS coordinates that pinpoint where the photo was taken, here Rhea's home. The date is less sensitive on its own, and the camera model and dimensions reveal nothing about her location.`
    },
    { // 3
      q: `A video editor in Jamaica must reformat a 16:9 video so that it fills the screen on vertical short-form video platforms. Which aspect ratio should she use?`,
      options: [`9:16`, `4:3`, `21:9`, `1:1`],
      answer: 0, module: '1',
      why: `Key: A. Vertical full-screen video uses 9:16, the 16:9 landscape ratio turned on its side. 1:1 is square, 4:3 is an older TV shape and 21:9 is a cinematic widescreen ratio.`
    },
    { // 4
      q: `Web 5.0 is often called the “emotional web” because`,
      options: [`content is limited to static pages with emotive images`, `web pages are written only to express the author's feelings`, `users mainly share emotional posts on social media`, `systems are expected to sense and respond to users' emotions`],
      answer: 3, module: '1',
      why: `Key: D. Web 5.0 is the emotional or unseen web, where technology detects and reacts to human emotion. Sharing emotional posts is a feature of the social Web 2.0, and static pages describe Web 1.0.`
    },
    { // 5
      q: `Which of the following BEST illustrates the transition from analogue to digital media?`,
      options: [`A cinema adding more seats to its main screen`, `A radio station replacing its reel-to-reel tapes with audio files stored on a server`, `A newspaper increasing the number of copies it prints each day`, `A photographer switching from colour film to black-and-white film`],
      answer: 1, module: '1',
      why: `Key: B. Moving from tape (analogue) to files stored as binary data (digital) is the analogue-to-digital transition. Switching film types keeps the photographer within analogue media.`
    },
    { // 6
      q: `A Guyanese bank commissions a 60-second video in which moving text, icons and simple animated characters explain how to use its mobile app. This product is BEST described as a(n)`,
      options: [`virtual tour`, `animated explainer video`, `static infographic`, `podcast`],
      answer: 1, module: '1',
      why: `Key: B. Explainer videos using motion graphics and animated characters fall under animation and motion graphics. An infographic presents information visually but is static, and a podcast is audio only.`
    },
    { // 7
      q: `A designer in Curaçao is choosing a platform on which to sell her digital art prints. Which of the following should she consider?<br><br>I. The platform's terms of service<br>II. Whether the platform can pay sellers based in the Caribbean<br>III. The file specifications required for uploads`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 3, module: '1',
      why: `Key: D. Terms of service, Caribbean market access and file specifications are all platform considerations, so all three apply.`
    },
    { // 8
      passage: `<p><b>Item 8</b> refers to the following feature comparison of four digital media platforms.</p><div class="tablewrap"><table><thead><tr><th>Feature</th><th>Platform 1</th><th>Platform 2</th><th>Platform 3</th><th>Platform 4</th></tr></thead><tbody>
<tr><td>Product catalogue and shopping cart</td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
<tr><td>Online payments</td><td>Yes</td><td>No</td><td>No</td><td>Yes (donations only)</td></tr>
<tr><td>Course modules, quizzes and grade book</td><td>No</td><td>Yes</td><td>No</td><td>No</td></tr>
<tr><td>Live video and replays</td><td>No</td><td>No</td><td>Yes</td><td>Yes</td></tr></tbody></table></div>`,
      q: `Based on its features, Platform 2 is MOST likely a(n)`,
      options: [`e-learning platform`, `e-commerce platform`, `video-streaming service`, `crowdfunding platform`],
      answer: 0, module: '1',
      why: `Key: A. Course modules, quizzes and a grade book are the defining features of an e-learning platform. Platform 1, with a catalogue, cart and payments, is the e-commerce platform.`
    },
    { // 9
      q: `Three years after posting offensive comments online at age 15, Andre is turned down for an internship when the company finds the posts. This illustrates the pitfall of`,
      options: [`cyberbullying`, `algorithmic influence`, `a permanent negative digital footprint`, `misinformation`],
      answer: 2, module: '1',
      why: `Key: C. Online posts form a lasting record (digital footprint) that others can find years later. Andre's comments may have been offensive, but the pitfall shown is the lasting record that damaged his opportunities.`
    },
    { // 10
      q: `A social media page deliberately posts a fake government notice claiming that all schools in Trinidad will close for a month, intending to cause panic. This is BEST described as`,
      options: [`disinformation`, `misinformation`, `cyberbullying`, `a deepfake`],
      answer: 0, module: '1',
      why: `Key: A. Disinformation is false information spread deliberately to mislead. Misinformation is false information shared without intent to deceive, for example by someone who believes the notice is real.`
    },
    { // 11
      q: `A Jamaican company registers the distinctive shape of its new rum bottle so that competitors cannot copy its appearance. This shape is protected as a(n)`,
      options: [`industrial design`, `patent`, `trade secret`, `copyright`],
      answer: 0, module: '1',
      why: `Key: A. Industrial designs protect the unique appearance of a product, such as its shape or packaging. Patents protect how an invention works, not how it looks, and a trade secret must stay confidential, which a bottle on shelves cannot.`
    },
    { // 12
      q: `An e-book bought from an online store cannot be copied to another person's device or printed. Which technology is MOST likely responsible for these limits?`,
      options: [`Creative Commons licensing`, `Digital rights management`, `Open-access publishing`, `Lossless compression`],
      answer: 1, module: '1',
      why: `Key: B. Digital rights management (DRM) is technology that controls how digital content is accessed, copied and shared, for example in e-books. Creative Commons and open access are designed to make sharing easier, not to block it.`
    },
    { // 13
      q: `A Barbadian news website uses AI to generate illustrations for its articles. Which practice BEST shows ethical use of AI?`,
      options: [`Generating realistic images of real people without their consent`, `Presenting the images as photographs taken by staff`, `Removing all human review to publish faster`, `Clearly labelling the images as AI-generated`],
      answer: 3, module: '1',
      why: `Key: D. Transparency and acknowledgement of AI-assisted work are key ethical principles. Passing images off as photographs, using real people's likeness without consent and removing human oversight all breach them.`
    },
    { // 14
      q: `A St Lucian online store sells handmade soap to customers living in the European Union. Which framework sets out rules it must follow when collecting those customers' personal data?`,
      options: [`Universal Declaration of Human Rights (UDHR)`, `World Intellectual Property Organization (WIPO) treaties`, `UNESCO media guidelines`, `General Data Protection Regulation (GDPR)`],
      answer: 3, module: '1',
      why: `Key: D. The GDPR applies to organisations anywhere that process the personal data of people in the EU. The UDHR sets out broad human rights and WIPO deals with intellectual property; neither gives detailed data-protection rules.`
    },
    { // 15
      q: `Which statement correctly distinguishes open-source software from a work in the public domain?`,
      options: [`A public-domain work must always be credited, while open-source software need not be`, `Open-source software can never be sold, while a public-domain work can be sold`, `Both are owned by governments and are free only to citizens`, `Open-source software is released under a licence with conditions, while a public-domain work has no copyright restrictions`],
      answer: 3, module: '1',
      why: `Key: D. Open-source software stays under copyright and is shared through a licence (for example the GPL) with terms to follow. Public-domain works are free of copyright entirely. Open-source software can be sold, and the public domain does not legally require credit.`
    },
    // ---------- Module 2 ----------
    { // 16
      q: `Mr. Henry, aged 62, learned to make video calls during the pandemic. He prints important emails and would rather phone a colleague than send a text message. Mr. Henry is BEST described as a`,
      options: [`prosumer`, `digital native`, `digital immigrant`, `digital nomad`],
      answer: 2, module: '2',
      why: `Key: C. A digital immigrant adopted digital technology later in life and often keeps habits from before it, such as printing emails. A digital nomad is someone who works remotely while travelling.`
    },
    { // 17
      q: `A Jamaican teenager watches dancehall videos online and also records and uploads her own dance tutorials. She is BEST described as a`,
      options: [`aggregator`, `consumer`, `prosumer`, `distributor`],
      answer: 2, module: '2',
      why: `Key: C. A prosumer both consumes and produces content. Calling her only a consumer ignores the tutorials she creates.`
    },
    { // 18
      q: `Which of the following are elements of the digital media ecosystem?<br><br>I. Advertisers<br>II. Payment systems<br>III. Typewriter manufacturers`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 0, module: '2',
      why: `Key: A. Advertisers and payment systems are elements of the digital media ecosystem. Typewriter manufacturers produce analogue equipment and play no part in creating, distributing or paying for digital media.`
    },
    { // 19
      passage: `<p><b>Item 19</b> refers to the following value chain for a soca album released by a Trinidadian artist.</p><div class="tablewrap"><table><thead><tr><th>Stage</th><th>Activity</th></tr></thead><tbody>
<tr><td>1</td><td>The artist writes and records the songs</td></tr>
<tr><td>2</td><td>A producer mixes and masters the tracks</td></tr>
<tr><td>3</td><td>A digital distributor (aggregator) delivers the album to many streaming services</td></tr>
<tr><td>4</td><td>Streaming platforms make the album available to subscribers</td></tr>
<tr><td>5</td><td>Listeners stream the album on their phones</td></tr></tbody></table></div>`,
      q: `In Stage 3, the digital distributor MAINLY`,
      options: [`creates the original songs and lyrics`, `provides the internet connection that listeners use`, `chooses the order of songs on each listener's playlist`, `collects music from many artists and supplies it to multiple streaming platforms`],
      answer: 3, module: '2',
      why: `Key: D. An aggregator gathers content from many creators and delivers it to many platforms, linking production to distribution. Writing songs is Stage 1, and internet access comes from infrastructure providers.`
    },
    { // 20
      q: `When a major undersea cable linking several Eastern Caribbean islands is damaged, creators, platforms, advertisers and audiences are all affected. This BEST illustrates`,
      options: [`the convergence of media technologies`, `disintermediation in the value chain`, `interdependence among players in the digital media ecosystem`, `the long-tail effect`],
      answer: 2, module: '2',
      why: `Key: C. Every player relies on the shared infrastructure, so a failure in one part spreads to the others. Disintermediation is the removal of intermediaries, which does not happen here.`
    },
    { // 21
      q: `Which of the following BEST shows the effect of globalisation on the digital media work environment?`,
      options: [`A local radio station hiring only staff who live in the same town`, `A school limiting the use of mobile phones in class`, `A Vincentian illustrator working from home for clients in Canada, Japan and the United Kingdom`, `A printing press adding new local delivery routes`],
      answer: 2, module: '2',
      why: `Key: C. Globalisation links markets worldwide, allowing a Caribbean creator to serve clients in many countries. The other options describe local activity only.`
    },
    { // 22
      q: `A Barbadian advertising agency contracts a company in another country to handle all the subtitling of its videos. This is an example of`,
      options: [`outsourcing`, `telecommuting`, `hybrid work`, `micro-work`],
      answer: 0, module: '2',
      why: `Key: A. Outsourcing means contracting an outside company to carry out a business function. Micro-work refers to individuals doing tiny paid tasks, not a company taking over a whole function.`
    },
    { // 23
      q: `The high cost of mobile data in some Caribbean territories limits how much video audiences can stream. In an analysis of the environment, this is BEST classified as a(n)`,
      options: [`political factor`, `cultural factor`, `economic factor`, `social factor`],
      answer: 2, module: '2',
      why: `Key: C. Cost and affordability are economic factors. Political factors concern government policy, social factors concern demographics and lifestyle, and cultural factors concern beliefs, language and traditions.`
    },
    { // 24
      q: `In a proposal for a youth mental-health podcast in Dominica, which section would contain the statement “Many teenagers in rural communities have no confidential place to learn about mental health”?`,
      options: [`Objectives`, `Problem statement`, `Benefits`, `Evaluation`],
      answer: 1, module: '2',
      why: `Key: B. The problem statement describes the need the project will address. Objectives set out what the project will achieve, and evaluation explains how success will be measured.`
    },
    { // 25
      passage: `<p><b>Item 25</b> refers to the following timeline for a short documentary about a Jamaican fishing village.</p><div class="tablewrap"><table><thead><tr><th>Task</th><th>Planned weeks</th></tr></thead><tbody>
<tr><td>Research and scriptwriting</td><td>Weeks 1–2</td></tr>
<tr><td>Location scouting</td><td>Week 2</td></tr>
<tr><td>Filming</td><td>Weeks 3–4</td></tr>
<tr><td>Editing (starts only after filming ends)</td><td>Weeks 5–6</td></tr>
<tr><td>Publishing (starts only after editing ends)</td><td>Week 7</td></tr></tbody></table></div>`,
      q: `Filming starts one week later than planned because of a tropical storm. If every task keeps its planned length, in which week will publishing now take place?`,
      options: [`Week 6`, `Week 8`, `Week 9`, `Week 7`],
      answer: 1, module: '2',
      why: `Key: B. Filming moves to Weeks 4–5, editing (two weeks, after filming) moves to Weeks 6–7, and publishing therefore moves from Week 7 to Week 8. The one-week delay carries through every dependent task.`
    },
    { // 26
      q: `Which statement BEST describes the agile approach to project management?`,
      options: [`All requirements are fixed at the start and cannot be changed`, `The client is consulted only when the final product is delivered`, `Each phase must be fully completed before the next begins, with no revisiting`, `Work is delivered in small increments, with frequent feedback and adaptation to change`],
      answer: 3, module: '2',
      why: `Key: D. Agile is iterative and incremental, emphasising flexibility, collaboration and continuous delivery. Fixed requirements and strictly sequential phases describe a traditional linear (waterfall) approach.`
    },
    { // 27
      q: `In a pitch to a regional creative-industries fund, which part of the pitch states, “We are seeking US$25 000 to cover equipment and the first six months of production”?`,
      options: [`The problem`, `Analysis of the competition`, `The ask`, `Traction and milestones`],
      answer: 2, module: '2',
      why: `Key: C. The ask states exactly what the presenter wants from the audience, usually an amount of money and its use. Traction shows progress already achieved.`
    },
    { // 28
      q: `Which source of funding normally does NOT have to be repaid AND does NOT require giving away a share of ownership?`,
      options: [`A loan from a commercial bank`, `Investment from an angel investor`, `Venture capital`, `A grant from a cultural agency`],
      answer: 3, module: '2',
      why: `Key: D. Grants are awarded to approved projects and do not need to be repaid. Bank loans must be repaid with interest, while venture capitalists and angel investors take equity in return.`
    },
    { // 29
      q: `Which of the following would be classified as debt financing for a digital media start-up?<br><br>I. A crowdfunding campaign in which backers receive a T-shirt<br>II. A bank loan repaid with interest over three years<br>III. A loan from a credit union to buy cameras`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 2, module: '2',
      why: `Key: C. Debt financing is borrowed money that must be repaid, as with bank and credit-union loans. Reward-based crowdfunding is not repaid; backers receive a reward instead.`
    },
    { // 30
      q: `After her first three online videos get very few views, Shania in Antigua studies her analytics, redesigns her thumbnails and keeps posting every week. Which disposition is she MAINLY showing?`,
      options: [`Cultural awareness`, `Inclusivity`, `Resilience`, `Professionalism`],
      answer: 2, module: '2',
      why: `Key: C. Resilience is the ability to recover from setbacks and keep going. Professionalism concerns conduct and reliability in work with others, which is not the focus here.`
    },
    // ---------- Module 3 ----------
    { // 31
      q: `At which stage of the creative design process does a designer recognise the problem and commit to solving it?`,
      options: [`Analysis`, `Acceptance`, `Definition`, `Selection`],
      answer: 1, module: '3',
      why: `Key: B. Acceptance is the first stage, where the designer accepts the challenge. Analysis follows, gathering information about the problem.`
    },
    { // 32
      q: `After producing twelve possible logo concepts for a Grenadian chocolate company, a design team scores each one against the client's brief and keeps the strongest two. Which stage of the creative design process are they in?`,
      options: [`Implementation`, `Selection`, `Evaluation`, `Ideation`],
      answer: 1, module: '3',
      why: `Key: B. Selection is choosing the best ideas from those generated. Ideation produced the twelve concepts, and evaluation judges the final solution after it has been implemented.`
    },
    { // 33
      passage: `<p><b>Item 33</b> refers to the following description of a diagram.</p><p>Acceptance → Analysis → Definition → Ideation → Selection → Implementation → Evaluation. After each stage there is a checkpoint; if the checkpoint is not passed, an arrow leads back to the stage just completed before the team may continue.</p>`,
      q: `The approach shown in the diagram is BEST described as`,
      options: [`Branched network`, `Cyclic`, `Stepped with intermediate feedback loops`, `Linear`],
      answer: 2, module: '3',
      why: `Key: C. Checkpoints that send the team back to the stage just completed are intermediate feedback loops. A cyclic model has one loop from the end back to the start, and a linear model has no loops at all.`
    },
    { // 34
      q: `Which of the following are advantages of using open-source tools such as GIMP and Audacity in a school media lab?<br><br>I. There is no licence fee<br>II. The software can be improved by a community of developers<br>III. Official telephone support is guaranteed by the publisher`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 0, module: '3',
      why: `Key: A. Open-source tools are free to use and are developed by communities. They usually rely on forums and documentation for help rather than guaranteed official support, so III is false.`
    },
    { // 35
      q: `A team building a tourism app for Belize designs it so that new languages and augmented-reality features can be added later as technology improves. This BEST reflects`,
      options: [`designing for future needs`, `problem definition`, `linear implementation`, `user-centred design`],
      answer: 0, module: '3',
      why: `Key: A. Designing for future needs anticipates later changes in technology and demand. User-centred design focuses on involving today's users in shaping the product.`
    },
    { // 36
      q: `What is the MAIN purpose of pre-production?`,
      options: [`To promote the finished product to audiences`, `To plan the content, audience, format, message and resources before production begins`, `To edit and colour-grade the recorded footage`, `To export the final product in suitable formats`],
      answer: 1, module: '3',
      why: `Key: B. Pre-production is the planning phase before any recording. Editing and colour grading belong to post-production, as does exporting.`
    },
    { // 37
      q: `Which of the following are core elements to address in pre-production for a music video to be filmed on a public beach in Jamaica?<br><br>I. Obtaining a location permit<br>II. Colour grading the footage<br>III. Planning for the health and safety of cast and crew`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 1, module: '3',
      why: `Key: B. Permits and health and safety are core pre-production elements. Colour grading is done in post-production, after filming.`
    },
    { // 38
      passage: `<p><b>Items 38–39</b> refer to the following storyboard for a 45-second promotional video for an eco-lodge in Guyana.</p><div class="tablewrap"><table><thead><tr><th>Panel</th><th>Shot</th><th>Audio</th><th>Duration</th></tr></thead><tbody>
<tr><td>1</td><td>Aerial wide shot over the rainforest canopy at sunrise</td><td>Birdsong; music fades in</td><td>8 s</td></tr>
<tr><td>2</td><td>Medium shot of a guide pointing to a giant river otter</td><td>Guide's voice-over</td><td>10 s</td></tr>
<tr><td>3</td><td>Close-up of a guest's smiling face</td><td>Music</td><td>7 s</td></tr>
<tr><td>4</td><td>Low-angle shot of the lodge at dusk; text “Book your stay”</td><td>Music</td><td>10 s</td></tr>
<tr><td>5</td><td>Logo and website address</td><td>Music ends</td><td>5 s</td></tr></tbody></table></div>`,
      q: `The producer notices that the storyboard does not match the 45-second brief. Which change would make the running time exactly 45 seconds?`,
      options: [`Extending Panel 2 from 10 to 12 seconds`, `Extending Panel 3 from 7 to 12 seconds`, `Shortening Panel 1 from 8 to 3 seconds`, `Removing Panel 5`],
      answer: 1, module: '3',
      why: `Key: B. The panels total 8 + 10 + 7 + 10 + 5 = 40 seconds, so 5 seconds must be added. Extending Panel 3 by 5 seconds gives 45; shortening Panel 1 or removing Panel 5 gives 35, and extending Panel 2 by 2 seconds gives only 42.`
    },
    { // 39
      passage: `<p><b>Items 38–39</b> refer to the following storyboard for a 45-second promotional video for an eco-lodge in Guyana.</p><div class="tablewrap"><table><thead><tr><th>Panel</th><th>Shot</th><th>Audio</th><th>Duration</th></tr></thead><tbody>
<tr><td>1</td><td>Aerial wide shot over the rainforest canopy at sunrise</td><td>Birdsong; music fades in</td><td>8 s</td></tr>
<tr><td>2</td><td>Medium shot of a guide pointing to a giant river otter</td><td>Guide's voice-over</td><td>10 s</td></tr>
<tr><td>3</td><td>Close-up of a guest's smiling face</td><td>Music</td><td>7 s</td></tr>
<tr><td>4</td><td>Low-angle shot of the lodge at dusk; text “Book your stay”</td><td>Music</td><td>10 s</td></tr>
<tr><td>5</td><td>Logo and website address</td><td>Music ends</td><td>5 s</td></tr></tbody></table></div>`,
      q: `The low-angle shot of the lodge in Panel 4 is MOST likely intended to`,
      options: [`show a guest's point of view from a window of the lodge`, `hide the surrounding rainforest from view`, `make the lodge appear impressive and grand`, `make the lodge appear small and vulnerable`],
      answer: 2, module: '3',
      why: `Key: C. A low-angle shot looks up at the subject, making it seem larger and more powerful. A high-angle shot looking down makes a subject seem small and vulnerable.`
    },
    { // 40
      q: `A photographer in St Lucia positions the camera so that a winding road draws the viewer's eye towards the Pitons in the distance. Which compositional technique is she using?`,
      options: [`Rule of thirds`, `Leading lines`, `Symmetry`, `Negative space`],
      answer: 1, module: '3',
      why: `Key: B. Leading lines are lines in a scene, such as roads or rivers, that guide the eye towards the subject. The rule of thirds concerns where the subject is placed within a grid, not how the eye is guided to it.`
    },
    { // 41
      q: `Volunteers for a Trinidadian charity live on different islands and need to design social media graphics together in real time, using only web browsers on low-cost laptops. Which tool is MOST suitable?`,
      options: [`Adobe Photoshop`, `DaVinci Resolve`, `Canva`, `Audacity`],
      answer: 2, module: '3',
      why: `Key: C. Canva runs in a browser, has a free tier and supports real-time collaboration on graphics. Photoshop must be installed, needs a paid licence and demands more powerful hardware; Audacity edits audio and DaVinci Resolve edits video.`
    },
    { // 42
      q: `Which is a disadvantage of relying on a cloud-based video editor for a school project in an area with unreliable internet service?`,
      options: [`Projects can be exported only as GIF files`, `Files cannot be shared with other team members`, `The tool can be used on only one device`, `Work may be interrupted or lost when the connection drops`],
      answer: 3, module: '3',
      why: `Key: D. Cloud tools depend on a stable connection, so outages interrupt work. Easy sharing and access from several devices are in fact advantages of cloud tools.`
    },
    { // 43
      q: `A church in Montserrat wants members living overseas to watch its Easter service as it happens and post comments in real time. Which communication method is MOST suitable?`,
      options: [`A wiki`, `Live streaming`, `An email newsletter`, `A podcast`],
      answer: 1, module: '3',
      why: `Key: B. Live streaming broadcasts video in real time with live chat. A podcast is recorded audio listened to later, so members could not take part as the service happens.`
    },
    { // 44
      passage: `<p><b>Item 44</b> refers to the following properties of an interview recording.</p><div class="tablewrap"><table><tbody><tr><th>File name</th><td>interview_raw.wav</td></tr>
<tr><th>Format</th><td>WAV (uncompressed PCM)</td></tr>
<tr><th>Sample rate / bit depth</th><td>48 kHz / 24-bit</td></tr>
<tr><th>Channels</th><td>Stereo</td></tr>
<tr><th>Duration</th><td>45 min</td></tr>
<tr><th>File size</th><td>777 MB</td></tr></tbody></table></div>`,
      q: `The student wants to publish this interview as a podcast episode that listeners can download quickly on mobile data. Which export setting is MOST appropriate?`,
      options: [`MP3 at 128 kbps`, `MP4 video with a still image at 4K resolution`, `Uncompressed AIFF`, `WAV at 96 kHz, 32-bit`],
      answer: 0, module: '3',
      why: `Key: A. MP3 uses lossy compression; at 128 kbps a 45-minute episode is about 43 MB instead of 777 MB, and quality is fine for speech. Higher-resolution WAV and AIFF files are uncompressed and even larger.`
    },
    { // 45
      q: `When preparing slides for a digital proposal presentation to be shown in a large classroom, which practice BEST supports clear visual communication?`,
      options: [`Using many different fonts to keep viewers interested`, `Filling each slide with full paragraphs so nothing is missed`, `Placing all text over a busy photographic background`, `Using high-contrast text and a few key points on each slide`],
      answer: 3, module: '3',
      why: `Key: D. High contrast and brief key points are readable from a distance. Dense text, busy backgrounds and mixed fonts reduce legibility and distract the audience.`
    },
  ]
},
{
  kind: 'p1', id: 'DMOCK3', title: 'Mock Paper 01 · Set 3', time: 90,
  intro: `<p><b>CAPE Digital Media Unit 1 · Grade One · Mock Paper 01 · Set 3</b> · 1 hour 30 minutes · 45 items</p><ol><li>Answer <b>ALL</b> items. Each item has four options (A), (B), (C), (D).</li><li>Items 1–15 Module 1, 16–30 Module 2, 31–45 Module 3.</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>`,
  items: [
    // ---------- Module 1 ----------
    { // 1
      q: `An online guide to Fort George in Grenada lets visitors click on images, audio clips and video to jump to related content. This is BEST described as`,
      options: [`hypermedia`, `hypertext`, `compression`, `multicasting`],
      answer: 0, module: '1',
      why: `Key: A. Hypermedia links multiple media types (images, audio, video and text). Hypertext links text only, so it does not cover the audio and video links here.`
    },
    { // 2
      q: `Which statement about lossy compression is correct?`,
      options: [`It increases image resolution to improve quality`, `It is used only for vector graphics`, `It permanently removes some data to reduce file size, as in JPEG and MP3 files`, `It reduces file size without losing any data, as in PNG and ZIP files`],
      answer: 2, module: '1',
      why: `Key: C. Lossy compression discards data the viewer or listener is unlikely to notice, and the loss cannot be undone. Reducing size without losing data describes lossless compression.`
    },
    { // 3
      passage: `<p><b>Item 3</b> refers to the following file properties.</p><div class="tablewrap"><table><tbody><tr><th>File name</th><td>beach_banner.jpg</td></tr>
<tr><th>Dimensions</th><td>1200 × 400 pixels</td></tr>
<tr><th>Resolution</th><td>72 ppi</td></tr>
<tr><th>Colour profile</th><td>sRGB</td></tr></tbody></table></div>`,
      q: `The image is to be printed at a quality of 300 ppi. What is the largest print width that maintains this quality?`,
      options: [`12 inches`, `16.7 inches`, `8 inches`, `4 inches`],
      answer: 3, module: '1',
      why: `Key: D. Print width = pixels ÷ ppi = 1200 ÷ 300 = 4 inches. 16.7 inches is the width at 72 ppi, which would look blurred in print.`
    },
    { // 4
      q: `A Barbadian journalist uses one smartphone to record video, edit it, write the story and publish it online. This BEST illustrates`,
      options: [`convergence`, `digital rights management`, `latency`, `multicasting`],
      answer: 0, module: '1',
      why: `Key: A. Convergence is the merging of several media functions and technologies into one device or platform. Multicasting is sending one stream to many receivers at once.`
    },
    { // 5
      q: `Which of the following BEST illustrates the disruption of an industry by digital media?`,
      options: [`A cinema adding a weekly screening of local films`, `A radio station buying new studio microphones`, `A newspaper adding a website alongside its print edition`, `Video rental stores closing as customers switch to streaming services`],
      answer: 3, module: '1',
      why: `Key: D. Disruption occurs when a business model declines because it fails to adapt to digital alternatives. A newspaper adding a website is an example of adapting to digital media, not being disrupted by it.`
    },
    { // 6
      q: `A hotel in St Kitts hires someone to research keywords and improve how high its website appears in search engine results. This job role is`,
      options: [`video editor`, `motion designer`, `SEO analyst`, `UX/UI designer`],
      answer: 2, module: '1',
      why: `Key: C. Search Engine Optimisation (SEO) analysts improve a site's ranking in search results. UX/UI designers focus on how users experience and interact with the interface.`
    },
    { // 7
      q: `A music streaming service suggests calypso playlists to a listener in Trinidad based on the songs she has played before. This is an example of`,
      options: [`open data`, `digital rights management`, `algorithmic personalisation`, `multicasting`],
      answer: 2, module: '1',
      why: `Key: C. Algorithms that analyse a user's behaviour to tailor recommendations and feeds are described as personalisation. DRM controls access to content; it does not recommend it.`
    },
    { // 8
      q: `A museum app in The Bahamas lets visitors point their phone at a shipwreck exhibit and see a 3D model of the ship appear on screen over the real display. This is an example of`,
      options: [`augmented reality`, `2D animation`, `virtual reality`, `a podcast`],
      answer: 0, module: '1',
      why: `Key: A. Augmented reality overlays digital content on the real world seen through a device. Virtual reality replaces the real world with a fully computer-generated environment.`
    },
    { // 9
      q: `A content creator is producing a travel series about Garifuna communities in St Vincent and Belize. Which of the following practices show ethical representation and cultural sensitivity?<br><br>I. Consulting community members about how they wish to be portrayed<br>II. Adding subtitles so that the series is accessible to more viewers<br>III. Exaggerating customs to make the series more dramatic`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 0, module: '1',
      why: `Key: A. Consultation and accessibility fall under ethical representation and audience awareness. Exaggerating customs misrepresents the community, so III is unethical.`
    },
    { // 10
      passage: `<p><b>Item 10</b> refers to the following comparison of four community platforms considered by a youth NGO in Guyana.</p><div class="tablewrap"><table><thead><tr><th>Platform</th><th>Monthly cost</th><th>Moderation tools</th><th>Data privacy</th></tr></thead><tbody>
<tr><td>Alpha</td><td>Free</td><td>Basic</td><td>Shares user data with advertisers</td></tr>
<tr><td>Beta</td><td>US$10</td><td>Advanced (filters, reporting, age controls)</td><td>Does not sell data; meets GDPR standards</td></tr>
<tr><td>Gamma</td><td>Free</td><td>None</td><td>Does not sell data</td></tr>
<tr><td>Delta</td><td>US$40</td><td>Advanced (filters, reporting, age controls)</td><td>Does not sell data; meets GDPR standards</td></tr></tbody></table></div>`,
      q: `The NGO works with children, must protect members' data, needs strong moderation tools and has a monthly budget of US$15. Which platform should it choose?`,
      options: [`Alpha`, `Gamma`, `Delta`, `Beta`],
      answer: 3, module: '1',
      why: `Key: D. Beta is the only platform that has advanced moderation, does not sell data and is within the US$15 budget. Delta meets the needs but costs US$40; Gamma has no moderation; Alpha shares data with advertisers.`
    },
    { // 11
      q: `Which of the following is protected by copyright rather than by a patent or a trademark?`,
      options: [`A new hinge mechanism for folding phones`, `The name of a clothing brand`, `A new method for compressing video files`, `The recorded audio of a podcast episode`],
      answer: 3, module: '1',
      why: `Key: D. Copyright protects original creative works such as recordings, films and writing. New methods and mechanisms are inventions protected by patents, and brand names are protected by trademarks.`
    },
    { // 12
      q: `In a critical review for class, a CAPE student quotes two lines of a published poem and credits the poet. This use is MOST likely permitted under`,
      options: [`fair dealing`, `a patent licence`, `a trade secret`, `digital rights management`],
      answer: 0, module: '1',
      why: `Key: A. Fair dealing (fair use) allows limited use of copyrighted material for purposes such as criticism, review and education, with acknowledgement. DRM is a technical control, not a legal permission.`
    },
    { // 13
      q: `Which of the following are RISKS of using AI in digital media production?<br><br>I. Deepfakes that impersonate real people<br>II. Automatic captions that make video accessible<br>III. Over-reliance on AI tools, leading to loss of originality`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 1, module: '1',
      why: `Key: B. Key risks include deepfakes, over-reliance and loss of originality. Automatic captioning is a benefit because it improves accessibility.`
    },
    { // 14
      q: `A student in Belize receives an email that appears to come from her bank, asking her to “confirm” her password through a link. This is an example of`,
      options: [`cyberbullying`, `phishing`, `piracy`, `plagiarism`],
      answer: 1, module: '1',
      why: `Key: B. Phishing is a cybercrime that uses fake messages to trick people into giving away personal details, which can lead to identity theft. Piracy is the illegal copying of content.`
    },
    { // 15
      q: `A Caribbean government publishes tourism arrival statistics online in a downloadable format that anyone may use and republish freely. This is an example of`,
      options: [`digital rights management`, `open data`, `rights-managed content`, `open-source software`],
      answer: 1, module: '1',
      why: `Key: B. Open data is data made freely available for anyone to use and share. Open source applies to software source code, not statistics.`
    },
    // ---------- Module 2 ----------
    { // 16
      q: `Which belief is MOST typical of digital natives?`,
      options: [`New technology is best learned from formal manuals`, `Information should be instantly available and easy to share`, `Printed information is always more trustworthy than online information`, `Important communication should take place face to face or by telephone`],
      answer: 1, module: '2',
      why: `Key: B. Digital natives expect instant, always-on access and sharing. Trust in print, reliance on manuals and a preference for phone calls are attitudes associated with digital immigrants.`
    },
    { // 17
      q: `Which of the following is an emerging trend in the digital media industry?`,
      options: [`Decreasing use of analytics by marketers`, `A move away from mobile devices to desktop-only content`, `Growth of short-form vertical video and AI-assisted production`, `Replacement of streaming by sales of physical DVDs`],
      answer: 2, module: '2',
      why: `Key: C. Short-form vertical video and AI-assisted production are among the fastest-growing trends at the time of writing (2026). Mobile use, analytics and streaming are all increasing, not declining.`
    },
    { // 18
      q: `A Grenadian news website uses software that lets journalists write, edit, schedule and publish articles without writing any code. In the digital media ecosystem, this software is a`,
      options: [`regulator`, `payment system`, `infrastructure provider`, `content management system`],
      answer: 3, module: '2',
      why: `Key: D. A content management system (CMS) manages the creation and publishing of web content. Infrastructure providers supply networks and hosting, not editing and publishing tools.`
    },
    { // 19
      passage: `<p><b>Item 19</b> refers to the following value chain for <i>Island Reads</i>, a small Caribbean e-book publisher.</p><p>Author writes the manuscript → Editor and designer prepare the e-book file → E-book platform sets the price, applies DRM and sells the download → Reader buys and reads the book on a tablet</p>`,
      q: `Compared with a traditional print value chain, which activity has been REMOVED from this value chain?`,
      options: [`Writing by the author`, `Printing, warehousing and shipping physical books`, `Payment by the reader`, `Editing the manuscript`],
      answer: 1, module: '2',
      why: `Key: B. Digital distribution delivers a file directly, so printing, storing and shipping books are no longer needed. Writing, editing and payment still take place in the digital chain.`
    },
    { // 20
      q: `On a Jamaican cooking channel hosted on a video-sharing platform, which stakeholder pays the platform to place messages before and during the videos?`,
      options: [`The creator`, `Advertisers`, `Viewers`, `The internet service provider`],
      answer: 1, module: '2',
      why: `Key: B. Advertisers pay platforms to reach audiences, and the platform shares some of that revenue with the creator. Viewers usually watch for free, and the creator receives revenue rather than paying it.`
    },
    { // 21
      q: `A design agency in Roseau requires staff to work in the office on Mondays and Thursdays and from home on the other weekdays. This work model is`,
      options: [`outsourcing`, `gig work`, `micro-work`, `hybrid work`],
      answer: 3, module: '2',
      why: `Key: D. Hybrid work combines office-based and remote days. Gig work involves short-term contracts with no fixed employer.`
    },
    { // 22
      q: `Which of the following are typical features of gig work in the digital media industry?<br><br>I. Short-term, task-based contracts<br>II. Payment per project rather than a fixed salary<br>III. Employer-provided pension and health benefits`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 0, module: '2',
      why: `Key: A. Gig workers take short contracts and are paid per job. They are usually independent contractors, so pensions and health benefits are not provided by an employer.`
    },
    { // 23
      q: `Which of the following is the BEST example of a regional OPPORTUNITY in the digital media industry?`,
      options: [`Using social media to market Caribbean festivals to the diaspora and international tourists`, `Small local audiences for niche content`, `Limited broadband access in rural areas`, `The high cost of importing production equipment`],
      answer: 0, module: '2',
      why: `Key: A. Reaching wider markets, such as the diaspora and tourists, is listed as an opportunity. Equipment cost, limited broadband and small audiences are challenges.`
    },
    { // 24
      passage: `<p><b>Items 24–25</b> refer to the following project record for a school timetable app in Belize, managed with the agile model.</p><div class="tablewrap"><table><thead><tr><th>Days</th><th>Activity</th></tr></thead><tbody>
<tr><td>1</td><td>Planning meeting: goals, feature list and a total budget of US$1 200</td></tr>
<tr><td>2–11</td><td>Sprint 1: build the log-in and timetable features (planned spending US$400)</td></tr>
<tr><td>12</td><td>Review: demonstration to 15 students; actual Sprint 1 spending was US$450</td></tr>
<tr><td>13–15</td><td>?</td></tr>
<tr><td>16–25</td><td>Sprint 2: build the homework-reminder feature</td></tr></tbody></table></div>`,
      q: `According to the agile model, what should MOST likely happen during Days 13–15?`,
      options: [`The team begins writing the executive summary of its proposal`, `The team releases the finished app to all students and closes the project`, `The team repeats the planning meeting and discards the Sprint 1 work`, `The team improves the features using the student feedback and adjusts the budget and timeline`],
      answer: 3, module: '2',
      why: `Key: D. After a review comes iteration: making improvements and adjusting resources, timelines and budget. Delivery happens only at the end, and agile builds on completed work rather than discarding it.`
    },
    { // 25
      passage: `<p><b>Items 24–25</b> refer to the following project record for a school timetable app in Belize, managed with the agile model.</p><div class="tablewrap"><table><thead><tr><th>Days</th><th>Activity</th></tr></thead><tbody>
<tr><td>1</td><td>Planning meeting: goals, feature list and a total budget of US$1 200</td></tr>
<tr><td>2–11</td><td>Sprint 1: build the log-in and timetable features (planned spending US$400)</td></tr>
<tr><td>12</td><td>Review: demonstration to 15 students; actual Sprint 1 spending was US$450</td></tr>
<tr><td>13–15</td><td>?</td></tr>
<tr><td>16–25</td><td>Sprint 2: build the homework-reminder feature</td></tr></tbody></table></div>`,
      q: `By what percentage did Sprint 1 spending exceed its planned amount?`,
      options: [`37.5%`, `4.2%`, `11.1%`, `12.5%`],
      answer: 3, module: '2',
      why: `Key: D. The overspend is US$450 − US$400 = US$50, and 50 ÷ 400 × 100 = 12.5%. Dividing by the total budget (US$1 200) or by the actual spend (US$450) gives the wrong base.`
    },
    { // 26
      q: `Which section of a proposal explains how the team will measure whether the project met its objectives, for example by tracking downloads and survey results?`,
      options: [`Evaluation`, `Benefits`, `Plan of action`, `Executive summary`],
      answer: 0, module: '2',
      why: `Key: A. The evaluation section explains how success will be measured. Benefits describe the expected positive outcomes but not how they will be checked.`
    },
    { // 27
      q: `In her pitch, a Trinidadian founder states that her app gained 8 000 users in three months and has signed a partnership with a local bank. This part of the pitch shows`,
      options: [`the ask`, `the analysis of the competition`, `traction and milestones`, `the problem`],
      answer: 2, module: '2',
      why: `Key: C. Traction is evidence of progress, such as users, revenue or partnerships. The ask states what the founder wants from investors.`
    },
    { // 28
      q: `A Barbadian comic artist collects payment from fans for her graphic novel two months before it is published, and uses the money to pay for printing. This type of funding is`,
      options: [`equity financing`, `debt financing`, `pre-sales`, `sponsorship`],
      answer: 2, module: '2',
      why: `Key: C. Pre-sales fund production by selling the product before it is completed. No loan or share of ownership is involved, so it is neither debt nor equity.`
    },
    { // 29
      q: `Which source of funding typically gives a start-up a small investment together with mentoring over a fixed programme of a few months, often ending with a demonstration day for investors?`,
      options: [`A commercial bank`, `A credit union`, `A crowdfunding platform`, `An accelerator`],
      answer: 3, module: '2',
      why: `Key: D. Accelerators run short, cohort-based programmes that combine investment, mentoring and a demo day. Banks and credit unions provide loans without mentoring programmes.`
    },
    { // 30
      q: `A video editor teaches herself a new AI-assisted editing tool soon after it is released. She is MAINLY showing`,
      options: [`cultural awareness`, `inclusivity`, `risk appetite`, `adaptability and a commitment to continuous learning`],
      answer: 3, module: '2',
      why: `Key: D. Learning new tools as technology changes shows adaptability and continuous learning, which the digital media industry values highly. Risk appetite concerns willingness to take business or financial risks.`
    },
    // ---------- Module 3 ----------
    { // 31
      q: `The creative design process is BEST defined as`,
      options: [`the final stage of editing a video`, `a structured series of stages that moves from a problem to an evaluated solution`, `a set of software tools used by designers`, `a single burst of inspiration that produces a finished product`],
      answer: 1, module: '3',
      why: `Key: B. The creative design process is a structured sequence, from Acceptance to Evaluation, that turns a problem into a tested solution. It is not a single moment of inspiration or a set of tools.`
    },
    { // 32
      q: `A team planning a campaign to reduce plastic waste on Grenada's beaches surveys residents and studies waste-collection data before writing a precise statement of the problem. Which stage of the creative design process are they in?`,
      options: [`Acceptance`, `Implementation`, `Ideation`, `Analysis`],
      answer: 3, module: '3',
      why: `Key: D. Analysis involves researching the problem and gathering data. It comes before Definition, where the precise problem statement is written; ideation would mean generating solutions.`
    },
    { // 33
      q: `A Dominican environmental group wants to post regular articles with photos about its beach clean-ups, listed by date, on which readers can leave comments. Which communication method is MOST suitable?`,
      options: [`A blog`, `Email`, `A live stream`, `A wiki`],
      answer: 0, module: '3',
      why: `Key: A. A blog publishes dated posts, usually by one author or group, with reader comments. A wiki is for many users editing shared pages, which the group does not need.`
    },
    { // 34
      q: `Which of the following is the MAIN disadvantage of a linear method of implementing the creative process?`,
      options: [`It never reaches the evaluation stage`, `It offers little opportunity to return to earlier stages when problems are found`, `It has too many feedback loops to manage`, `It requires several teams working on parallel paths`],
      answer: 1, module: '3',
      why: `Key: B. A linear model moves through the stages once in a fixed order, so it is hard to go back and fix problems. Multiple feedback loops and parallel paths describe stepped and branched models.`
    },
    { // 35
      q: `A large project team splits into groups that explore different solution paths at the same time; the paths later rejoin when the best solution is selected. Which method of implementing the creative process is this?`,
      options: [`Cyclic`, `Branched network`, `Stepped with intermediate feedback loops`, `Linear`],
      answer: 1, module: '3',
      why: `Key: B. A branched network divides the process into parallel paths that later rejoin. Stepped models have feedback loops but follow a single path.`
    },
    { // 36
      q: `In the Design Thinking model, which stage involves observing and interviewing users to understand their feelings and needs?`,
      options: [`Prototype`, `Define`, `Empathise`, `Ideate`],
      answer: 2, module: '3',
      why: `Key: C. Empathise is the first Design Thinking stage, focused on understanding users. Define comes next, turning those insights into a clear problem statement.`
    },
    { // 37
      q: `Before designing a brand identity for a coffee shop in Curaçao, a designer collects photographs, colour swatches, textures and font samples on one board to agree the look and feel with the client. This is a`,
      options: [`shot list`, `storyboard`, `wireframe`, `mood board`],
      answer: 3, module: '3',
      why: `Key: D. A mood board gathers visual references to set the style and feel of a project. A storyboard plans shots in sequence, and a wireframe plans the layout of a screen.`
    },
    { // 38
      q: `Which pre-production item shows the basic layout of a web page, including where the menu, images and text blocks will go, without the final colours or images?`,
      options: [`A mood board`, `A wireframe`, `A script`, `A storyboard`],
      answer: 1, module: '3',
      why: `Key: B. A wireframe is a simple layout plan for a page or screen. A mood board sets the look and feel but does not show layout.`
    },
    { // 39
      passage: `<p><b>Items 39–40</b> refer to the following storyboard for a 20-second tree-planting announcement in Antigua.</p><div class="tablewrap"><table><thead><tr><th>Shot</th><th>Description</th><th>Audio</th><th>Time</th></tr></thead><tbody>
<tr><td>1</td><td>Wide shot from the road: a bare hillside scarred by erosion after heavy rain</td><td>Rain</td><td>4 s</td></tr>
<tr><td>2</td><td>Medium shot: students carrying seedlings up the hill</td><td>Upbeat steelpan music</td><td>6 s</td></tr>
<tr><td>3</td><td>Close-up: hands pressing soil around a seedling</td><td>Music</td><td>4 s</td></tr>
<tr><td>4</td><td>Wide shot from the same spot on the road, one year later: the hillside is green. Text: “Roots hold our island together.”</td><td>Music ends</td><td>6 s</td></tr></tbody></table></div>`,
      q: `Which purpose of a storyboard is BEST demonstrated by this document?`,
      options: [`It records the final editing decisions made in post-production`, `It lists equipment costs for the budget`, `It gives legal permission to film on the hillside`, `It lets the team see the sequence of shots, audio and timing before filming`],
      answer: 3, module: '3',
      why: `Key: D. A storyboard is a pre-production plan showing each shot, its audio and duration in order. It is not a budget, an edit record or a permit.`
    },
    { // 40
      passage: `<p><b>Items 39–40</b> refer to the following storyboard for a 20-second tree-planting announcement in Antigua.</p><div class="tablewrap"><table><thead><tr><th>Shot</th><th>Description</th><th>Audio</th><th>Time</th></tr></thead><tbody>
<tr><td>1</td><td>Wide shot from the road: a bare hillside scarred by erosion after heavy rain</td><td>Rain</td><td>4 s</td></tr>
<tr><td>2</td><td>Medium shot: students carrying seedlings up the hill</td><td>Upbeat steelpan music</td><td>6 s</td></tr>
<tr><td>3</td><td>Close-up: hands pressing soil around a seedling</td><td>Music</td><td>4 s</td></tr>
<tr><td>4</td><td>Wide shot from the same spot on the road, one year later: the hillside is green. Text: “Roots hold our island together.”</td><td>Music ends</td><td>6 s</td></tr></tbody></table></div>`,
      q: `Shots 1 and 4 use the same location and framing MAINLY to`,
      options: [`show a clear before-and-after contrast that supports the message`, `avoid the need for a location permit`, `establish the identity of the main character`, `reduce the number of camera operators needed`],
      answer: 0, module: '3',
      why: `Key: A. Repeating the framing lets the audience compare the eroded and the green hillside directly, reinforcing the message. Matching the framing has no effect on permits or crew size.`
    },
    { // 41
      q: `A Jamaican public-health poster warns residents about dengue fever and must grab attention and signal danger. Which colour is MOST appropriate as the dominant accent?`,
      options: [`Pale blue`, `Light grey`, `Pastel green`, `Red`],
      answer: 3, module: '3',
      why: `Key: D. In colour psychology, red signals danger and urgency and attracts attention. Pale blue and pastel green suggest calm and safety, which would weaken a warning.`
    },
    { // 42
      q: `Which of the following would improve the sound quality of an interview recorded outdoors on a beach in Belize?<br><br>I. Placing the recorder next to the speakers of a nearby beach bar<br>II. Clipping a lavalier microphone close to the speaker's mouth<br>III. Fitting a windscreen to the microphone`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 2, module: '3',
      why: `Key: C. A lavalier microphone near the mouth captures the voice clearly, and a windscreen reduces wind noise. Recording next to loudspeakers would add unwanted background music.`
    },
    { // 43
      q: `Which factor is MOST important when evaluating whether a digital media tool suits a project?`,
      options: [`Whether it is the most expensive option available`, `Whether it was released within the last month`, `Whether well-known creators use it`, `Whether it can produce the required output for the project's purpose and audience`],
      answer: 3, module: '3',
      why: `Key: D. Tools should be evaluated for suitability based on purpose, audience, project needs, resources and expected output. Price, newness and popularity do not show that a tool fits the task.`
    },
    { // 44
      passage: `<p><b>Item 44</b> refers to the following export settings chosen by a student.</p><div class="tablewrap"><table><tbody><tr><th>Project</th><td>Sports Day highlights (with commentary and music)</td></tr>
<tr><th>Export format</th><td>GIF</td></tr>
<tr><th>Resolution</th><td>1920 × 1080 pixels</td></tr>
<tr><th>Duration</th><td>2 min 30 s</td></tr>
<tr><th>Estimated file size</th><td>410 MB</td></tr></tbody></table></div>`,
      q: `The student wants to share the video on social media. What is the MAIN problem with these export settings?`,
      options: [`1920 × 1080 pixels is too low a resolution for social media`, `GIF files cannot be displayed on smartphones`, `GIF files carry no audio and become very large for long clips, so MP4 should be used`, `The video is too short to be accepted by social media platforms`],
      answer: 2, module: '3',
      why: `Key: C. GIF is meant for short, silent loops. The commentary and music would be lost and the file would be huge, while an MP4 with compression keeps the sound at a fraction of the size. 1080p is a standard social media resolution.`
    },
    { // 45
      q: `Which of the following formats can be exported from a digital media project for viewing on most digital devices?<br><br>I. MP4<br>II. PDF<br>III. GIF`,
      options: [`I and II only`, `I and III only`, `II and III only`, `I, II and III`],
      answer: 3, module: '3',
      why: `Key: D. MP4, PDF and GIF are among the formats that play on any digital device, so all three are correct.`
    },
  ]
}
]);
