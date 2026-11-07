/* CAPE Digital Media Unit 1 (DME1): Practical Labs. Developed by Kester Small.
   Based on the CAPE Digital Media syllabus.
   All businesses, people and figures in these labs are for practice only. */
window.EDPM_LABS = (window.EDPM_LABS || []).concat([

  /* =========================== MODULE 1: UNDERSTANDING DIGITAL MEDIA =========================== */
  {
    id: 'M1-L1', sec: 'M1', app: 'design', level: 'Starter',
    title: 'From Analogue to Web 5.0: Evolution Timeline Infographic',
    time: 60,
    brief: `<p><b>St. George’s Heritage Media Museum</b> is opening a small "Digital Age" corner and wants a portrait infographic that shows visitors how media moved from analogue to digital and how the Web has changed.</p>
<p>This lab covers <b>Evolution of Digital Media</b>: analogue to digital, Web 1.0 to Web 2.0, broadband, mobile and social media, affordability and access, and the later stages of the Web, <b>Web 3.0, Web 4.0 and Web 5.0</b>.</p>`,
    data: `<h4>Milestones to use (check each one and add your own territory row)</h4>
<table><thead><tr><th>Year</th><th>Milestone</th><th>Stage</th></tr></thead><tbody>
<tr><td>1969</td><td>ARPANET sends its first message between two university computers</td><td>Early networking</td></tr>
<tr><td>1991</td><td>The World Wide Web is made publicly available</td><td>Web 1.0</td></tr>
<tr><td>1993</td><td>Mosaic, an early graphical web browser, is released</td><td>Web 1.0</td></tr>
<tr><td>2004</td><td>The term "Web 2.0" becomes popular; user-generated content grows</td><td>Web 2.0</td></tr>
<tr><td>2005</td><td>YouTube launches</td><td>Web 2.0, streaming media</td></tr>
<tr><td>2007</td><td>The first iPhone is released; mobile Internet takes off</td><td>Mobile revolution</td></tr>
<tr><td>2010</td><td>Instagram launches</td><td>Social media</td></tr>
<tr><td>2022</td><td>Generative AI chat tools reach the general public</td><td>Web 3.0 / Web 4.0 trends</td></tr>
<tr><td>?</td><td>Your territory: research the year 4G mobile data became widely available in Grenada (or your island)</td><td>Broadband and mobile access</td></tr>
</tbody></table>
<h4>Web stages</h4>
<ul><li><b>Web 1.0</b>: Read-Only Web</li><li><b>Web 2.0</b>: Read-Write / Social Web</li><li><b>Web 3.0</b>: Semantic and Decentralised Web</li><li><b>Web 4.0</b>: Symbiotic Web</li><li><b>Web 5.0</b>: Emotional / Unseen Web</li></ul>`,
    tasks: [
      'In Canva (or Inkscape), create a custom-size design of <b>1080 × 1920 px</b> (portrait). In Inkscape use <b>Document Properties</b> and set the units to px.',
      'Add a title band across the top 300 px: "From Analogue to Web 5.0" in a bold sans-serif font at 72 pt or larger, with a subtitle naming the museum.',
      'Draw a vertical timeline line down the centre (stroke 6 px) and place the eight milestones from the data table in date order, alternating left and right.',
      'Add the missing territory milestone after researching it. Write the source (website name and date accessed) in small text at the bottom of the design.',
      'Create a separate panel with five coloured blocks for Web 1.0 to Web 5.0. For each, write its label (see Web stages) plus one example in no more than 12 words.',
      'Add a short "Then and Now" strip comparing one analogue medium with its digital replacement (for example, cassette tape to music streaming).',
      'Add one line on <b>affordability and access</b>: how cheaper smartphones and data plans changed who can create content in the Caribbean.',
      'Use no more than three brand colours and two fonts. Record the hex codes in the bottom corner (for example #0B3C5D, #F2A900, #FFFFFF).',
      'Use only icons or images that are free to use (Canva free elements, CC0 or your own drawings). Do not use logos of real companies.',
      'Export as <b>PNG</b> (Canva: Share &gt; Download &gt; PNG; Inkscape: Export &gt; PNG at 96 dpi) and name the file <b>M1L1_Surname_Timeline.png</b>.'
    ],
    skills: ['Chronological research', 'Information design', 'Layout and hierarchy', 'Web 1.0 to Web 5.0 concepts', 'Source citation'],
    check: [
      { c: 'Canvas is 1080 × 1920 px and exported as PNG with the correct file name', m: 2 },
      { c: 'All eight milestones are placed in correct date order on the timeline', m: 3 },
      { c: 'Territory milestone researched and source cited', m: 2 },
      { c: 'Web 1.0 to Web 5.0 panel uses the correct labels, each with a correct example', m: 5 },
      { c: 'Then and Now strip and the affordability and access point are accurate', m: 2 },
      { c: 'Clear hierarchy, maximum three colours and two fonts, text readable on a phone', m: 2 }
    ],
    tip: `Examiners like a clear distinction between Web 2.0 and Web 3.0. Learn one sentence for each: Web 2.0 lets users <b>write</b> and share; Web 3.0 lets machines <b>understand</b> meaning and spreads control across many computers.`
  },

  {
    id: 'M1-L2', sec: 'M1', app: 'design', level: 'Core',
    title: 'Know Your Rights: a Creative Commons Licensed IP Infographic',
    time: 75,
    brief: `<p><b>BVI Young Creators Network</b> wants an infographic for its Instagram page that explains intellectual property (IP) to teenage content creators. Because the network wants other schools to reuse it, your infographic must itself carry a <b>Creative Commons licence</b>.</p>
<p>This lab covers reasons for IP, products protected, penalties, the copyright and patent process, rights-managed versus royalty-free use and terms of use, plus trademarks, industrial designs, trade secrets, licences, <b>Digital Rights Management (DRM)</b> and infringement consequences.</p>`,
    data: `<h4>Content to include (edit wording, keep the meaning)</h4>
<table><thead><tr><th>Type of IP</th><th>What it protects</th><th>Caribbean-style example</th></tr></thead><tbody>
<tr><td>Copyright</td><td>Original creative works: songs, films, photos, books, videos</td><td>A soca track by the artist "Kezia Flame"</td></tr>
<tr><td>Patent</td><td>New inventions, including a new software process or device design</td><td>A new solar-powered cistern sensor invented by a student team</td></tr>
<tr><td>Trademark</td><td>Brand names, logos and slogans</td><td>The "Kaya Threads" fashion logo</td></tr>
<tr><td>Industrial design</td><td>The look of a product</td><td>The shape of a Hillside Herbal Teas bottle</td></tr>
<tr><td>Trade secret</td><td>Confidential formulas or processes</td><td>Tamarind Tree Bakery's johnny cake recipe</td></tr>
<tr><td>Licence</td><td>Permission to use someone else's work on stated terms</td><td>Using a CC BY photo with credit</td></tr>
</tbody></table>
<p><b>Creative Commons building blocks:</b> BY (credit the creator), SA (share alike), NC (non-commercial), ND (no derivatives). CC0 places work in the public domain.</p>
<p><b>Attribution formula (TASL):</b> Title, Author, Source, Licence. Example: "Beach at Dawn" by J. Arrindell, from Wikimedia Commons, CC BY 4.0.</p>
<p><b>Infringement consequences:</b> takedowns, fines, legal action, academic penalties (zero for plagiarised SBA work), loss of reputation.</p>`,
    tasks: [
      'Create a <b>1080 × 1350 px</b> (4:5 portrait) design in Canva or Inkscape.',
      'Add a headline of no more than 6 words (for example "Your Work. Your Rights.") at 60 pt or larger.',
      'Build a six-row or six-tile section for the six IP types. Give each tile an icon, the name, a definition of no more than 15 words and the example.',
      'Add a "Rights-managed vs Royalty-free" mini comparison with two bullet points each.',
      'Add a DRM line with one example (for example, streaming films that cannot be downloaded, or e-books that limit copying).',
      'Add a "How to use other people\'s work legally" box: ask permission, use CC or public-domain media, credit with TASL, read the terms of use.',
      'Choose a licence for your own infographic: <b>CC BY-NC-SA 4.0</b>. Place the licence badge and this statement at the foot: "Know Your Rights by [Your Name], [Your School], licensed under CC BY-NC-SA 4.0."',
      'If you use any image you did not create, add a credits line in TASL format. If all assets are your own, write "All images by the author."',
      'Check contrast: dark text on light background or the reverse; body text no smaller than 24 px.',
      'Export <b>PNG</b> for social media and <b>PDF Standard</b> for print. Name them M1L2_Surname_IP.png and M1L2_Surname_IP.pdf.'
    ],
    skills: ['Intellectual property', 'Creative Commons licensing', 'Attribution (TASL)', 'Infographic design', 'Export for screen and print'],
    check: [
      { c: 'Correct canvas size; PNG and PDF exported with correct names', m: 2 },
      { c: 'Six IP types correctly defined, each with a suitable example', m: 6 },
      { c: 'Rights-managed vs royalty-free and DRM explained accurately', m: 3 },
      { c: 'Correct CC BY-NC-SA 4.0 statement and badge on the infographic', m: 3 },
      { c: 'Any third-party media credited in TASL format (or a statement of own work)', m: 2 },
      { c: 'Readable layout: contrast, font size, consistent icons', m: 2 }
    ],
    tip: `In Paper 01, many students mix up a <b>trademark</b> and a <b>copyright</b>. Remember: a logo is a trademark because it identifies the business; the song in the advert is protected by copyright.`
  },

  {
    id: 'M1-L3', sec: 'M1', app: 'present', level: 'Core',
    title: 'Choosing the Right Platform: Comparison Presentation',
    time: 90,
    brief: `<p><b>Coral Craft Jewellery</b>, a two-person studio in Frigate Bay, makes jewellery from recycled sea glass. The owners want to reach (1) cruise visitors before they arrive and (2) local customers for gifts. They can afford only <b>two</b> platforms. Prepare a presentation that compares digital media platforms (DMPs) and makes a justified recommendation.</p>
<p>A DMP is defined as a digitised platform for delivering video, audio and/or data to multiple networks such as Telco, cable, satellite, digital terrestrial broadcasting and the Internet. You also need to discuss what is shared on each platform and how.</p>`,
    data: `<h4>Practice data for this lab only (practice figures, not real statistics)</h4>
<table><thead><tr><th>Platform</th><th>Main content</th><th>Best audience fit</th><th>Cost to start</th><th>Weekly time needed</th></tr></thead><tbody>
<tr><td>Instagram</td><td>Photos, Reels, Stories</td><td>Visitors aged 25 to 45 planning trips</td><td>Free; ads from USD 5 a day</td><td>4 hours</td></tr>
<tr><td>Facebook</td><td>Posts, groups, events, Marketplace</td><td>Local residents aged 30 and over</td><td>Free; ads from USD 5 a day</td><td>3 hours</td></tr>
<tr><td>TikTok</td><td>Short vertical video</td><td>Ages 16 to 30</td><td>Free</td><td>6 hours</td></tr>
<tr><td>YouTube</td><td>Long and Shorts video</td><td>Search-based viewers, how-to content</td><td>Free</td><td>6 hours</td></tr>
<tr><td>WhatsApp Business</td><td>Messages, catalogue, status</td><td>Existing local customers</td><td>Free</td><td>2 hours</td></tr>
<tr><td>Website on a CMS (for example WordPress)</td><td>Pages, online shop, blog</td><td>Visitors searching before a cruise</td><td>About USD 150 a year (domain and hosting)</td><td>2 hours</td></tr>
</tbody></table>
<p><b>Weighted criteria to use:</b> audience fit (×3), cost (×2), time needed (×2), ability to show the product visually (×2), ability to take orders (×1). Score each platform 1 to 5 on each criterion.</p>`,
    tasks: [
      'Open Google Slides, PowerPoint or Canva Presentation. Set the slide size to <b>16:9</b>.',
      'Create <b>9 slides</b>: title; the client and its two audiences; what a DMP is (use the syllabus definition); platform overview; how content is shared on each; weighted scoring matrix; recommendation; risks and pitfalls; sources.',
      'On the platform overview slide, show all six platforms in a table or icon grid with main content type and audience.',
      'Build the <b>weighted scoring matrix</b> as a table. Multiply each score by its weight and total each row. Show the arithmetic so it can be checked.',
      'Recommend the top two platforms and justify each in no more than three bullet points linked to the client\'s two audiences.',
      'Add one original photo or mock-up image (for example, a sea-glass bracelet photographed on sand) with alt text added (right-click &gt; Alt text).',
      'Include one simple chart (bar chart of weighted totals) made in the presentation software.',
      'Apply one consistent transition (Fade, 0.5 s) and no more than one animation per slide.',
      'Write <b>speaker notes</b> of 40 to 80 words on every content slide.',
      'Export as <b>PDF</b> and as the native file. Name them M1L3_Surname_Platforms.'
    ],
    skills: ['Digital media platforms', 'Weighted decision matrix', 'Audience analysis', 'Presentation design', 'Speaker notes'],
    check: [
      { c: 'Nine slides in the stated order, 16:9, exported as PDF and native file', m: 2 },
      { c: 'DMP definition and functions (what and how content is shared) correct', m: 3 },
      { c: 'Weighted matrix correctly calculated for all six platforms', m: 4 },
      { c: 'Recommendation of two platforms clearly justified for both audiences', m: 3 },
      { c: 'Chart and original image included; alt text added', m: 2 },
      { c: 'Speaker notes on every content slide; consistent transitions', m: 2 },
      { c: 'Pitfalls slide identifies at least two risks (for example, algorithm changes, negative comments)', m: 2 }
    ],
    tip: `A recommendation without numbers is an opinion. Show the weighted totals: that is what turns "I like Instagram" into an evaluation that earns the higher marks.`
  },

  {
    id: 'M1-L4', sec: 'M1', app: 'image', level: 'Core',
    title: 'Pixels, Compression and File Formats Experiment',
    time: 70,
    brief: `<p>Terminology questions include <b>pixels, resolution, aspect ratio, compression, colour profiles, raster and vector graphics, GIF, JPEG and PNG</b>. In this lab you will prove what these terms mean by testing them on one photo and recording the results.</p>
<p><b>Capture first:</b> using a phone or camera, take one landscape (horizontal) photo of a colourful scene with fine detail and a clear sky, for example a painted shopfront, a mural at school or fishing boats. Do not include identifiable people. Keep the original file and note its pixel dimensions.</p>`,
    data: `<h4>Results table to copy and complete</h4>
<table><thead><tr><th>Version</th><th>Settings</th><th>Pixel size</th><th>File size (KB)</th><th>What you notice at 400% zoom</th></tr></thead><tbody>
<tr><td>A. Original</td><td>As captured</td><td></td><td></td><td></td></tr>
<tr><td>B. JPEG high</td><td>Quality 90</td><td>1920 × 1080</td><td></td><td></td></tr>
<tr><td>C. JPEG medium</td><td>Quality 60</td><td>1920 × 1080</td><td></td><td></td></tr>
<tr><td>D. JPEG low</td><td>Quality 15</td><td>1920 × 1080</td><td></td><td></td></tr>
<tr><td>E. PNG</td><td>Compression level 9</td><td>1920 × 1080</td><td></td><td></td></tr>
<tr><td>F. GIF</td><td>Indexed, 256 colours</td><td>1920 × 1080</td><td></td><td></td></tr>
<tr><td>G. Upscaled</td><td>Shrink to 192 px wide, then enlarge to 1920 px</td><td>1920 × 1080</td><td></td><td></td></tr>
</tbody></table>`,
    tasks: [
      'Open your photo in GIMP (or Photoshop). Open <b>Image &gt; Image Properties</b> (Photoshop: Image &gt; Image Size) and record the pixel dimensions and colour profile in row A.',
      'Crop to <b>16:9</b>: select the Crop tool, tick Fixed Aspect ratio and type 16:9, then press Enter. Scale to <b>1920 × 1080 px</b> with Image &gt; Scale Image (Photoshop: Image Size with Constrain Proportions on).',
      'Export version B: File &gt; Export As, name M1L4_B.jpg, quality <b>90</b>.',
      'Export version C at quality <b>60</b> and version D at quality <b>15</b> with the same method.',
      'Export version E as <b>PNG</b> with compression level 9 (Photoshop: Export As PNG).',
      'Convert a copy to Indexed mode with 256 colours (GIMP: Image &gt; Mode &gt; Indexed; Photoshop: Save for Web GIF 256) and export version F as <b>GIF</b>.',
      'For version G, scale a copy down to 192 px wide, then back up to 1920 px wide, and export as PNG.',
      'Check each file size in your file manager (Properties) and record it in KB. Zoom each version to 400% and describe what you see: blocky artefacts, colour banding, blur or no change.',
      'Under the table, write 120 to 180 words explaining: lossy vs lossless compression; why the GIF sky shows banding; why upscaling cannot add detail; and why a logo should be made as a <b>vector</b> (SVG) rather than a raster image.',
      'Place screenshots of three zoomed versions (B, D and G) beside the table and save the document as PDF: M1L4_Surname_Formats.pdf.'
    ],
    skills: ['Resolution and pixel dimensions', 'Lossy and lossless compression', 'Aspect ratio cropping', 'Format conversion', 'Technical vocabulary'],
    check: [
      { c: 'Correct 16:9 crop and 1920 × 1080 scaling', m: 2 },
      { c: 'All six exported versions created with the stated settings', m: 4 },
      { c: 'File sizes accurately recorded for every row', m: 2 },
      { c: 'Zoom observations accurate (artefacts, banding, blur)', m: 3 },
      { c: 'Explanation correctly uses lossy, lossless, raster, vector and resolution', m: 4 },
      { c: 'Screenshots included and PDF correctly named', m: 1 }
    ],
    tip: `If a Paper 02 question asks you to make a file smaller "without visible loss of quality", JPEG quality 75 to 85 is usually the sweet spot. Below 50, artefacts appear around edges and in skies.`
  },

  {
    id: 'M1-L5', sec: 'M1', app: 'web', level: 'Starter',
    title: 'Why Caribbean Stories Matter: a Blog Post',
    time: 60,
    brief: `<p>Write and publish a blog post for your class blog (Google Sites, Blogger or a WordPress site set up by your teacher) titled <b>"Why Caribbean Stories Matter Online"</b>.</p>
<p>Caribbean-centric content helps to meet local needs and creates global opportunities. The course outline also asks you to explain why digital media was slow to develop in the Caribbean and the benefits of social media for Caribbean communities.</p>
<p><b>Capture first:</b> take two original photos that show Caribbean life without identifiable faces, for example a plate of local food, a market stall, a festival decoration or a landscape.</p>`,
    data: `<h4>Suggested structure</h4>
<ol><li><b>Hook</b> (40 to 60 words). Sample opening: "Scroll through your feed and count how many videos were filmed on our island. For many of us, the answer is very few. Yet the stories that shape us are happening right here, on King Street, at the boardwalk and around our kitchen tables."</li>
<li><b>Why it matters</b>: meeting local needs (language, culture, local services); global opportunities (tourism, diaspora audiences, exports).</li>
<li><b>Why growth was slow</b>: cost of data and devices, small home markets, limited funding, few local training programmes, dependence on foreign platforms.</li>
<li><b>Benefits of social media for communities</b>: small-business marketing, emergency information during hurricanes, keeping in touch with the diaspora, preserving culture.</li>
<li><b>Call to action</b>: one thing readers can do this week.</li></ol>`,
    tasks: [
      'Create a new page or post titled "Why Caribbean Stories Matter Online".',
      'Write <b>400 to 500 words</b> in your own words using the structure provided. Use British spelling.',
      'Use at least two subheadings formatted as <b>Heading 2</b> (not just bold text).',
      'Insert your two original photos, each resized to no more than <b>1200 px</b> wide before upload, and add <b>alt text</b> that describes each image in 8 to 15 words.',
      'Add one hyperlink to a reliable source (for example a government statistics page or a UNESCO page) and name the source in the sentence.',
      'Add a byline with your first name, class and date, and the line "Photos by the author."',
      'Add a short comment policy (3 bullet points) asking readers to be respectful, stay on topic and not post personal information.',
      'Preview on desktop and on a phone. Fix any image that is too large or text that wraps badly.',
      'Publish with visibility set to your school domain only. Submit the link and a full-page screenshot named M1L5_Surname_Blog.png.'
    ],
    skills: ['Caribbean-centric content', 'Writing for the web', 'Alt text and accessibility', 'Publishing on a CMS', 'Digital citizenship'],
    check: [
      { c: '400 to 500 words, clear structure, Heading 2 subheadings used', m: 3 },
      { c: 'Explains both importance points: local needs and global opportunities', m: 3 },
      { c: 'Gives at least two reasons for slow development and two social media benefits', m: 3 },
      { c: 'Two original photos resized, each with meaningful alt text', m: 2 },
      { c: 'Source linked and named; byline and photo credit present', m: 2 },
      { c: 'Comment policy added; published to school domain; screenshot submitted', m: 2 }
    ],
    tip: `Essay questions often ask you to "discuss". Give the point, explain it, then add a Caribbean example. The blog structure trains exactly that habit.`
  },

  {
    id: 'M1-L6', sec: 'M1', app: 'audio', level: 'Challenge',
    title: 'Check Before You Share: 60-second Audio PSA',
    time: 120,
    brief: `<p><b>Nevis Youth Digital Council</b> wants a 60-second public service announcement (PSA) for school radio and social media about misinformation, deepfakes and digital footprints. You will record two voices, add a sound effect and a music bed, and export for two uses.</p>
<p>This lab links the <b>opportunities and pitfalls</b> of digital media, <b>ethical issues and responsible digital citizenship</b>, and <b>AI risks</b> such as deepfakes and disinformation.</p>`,
    data: `<h4>Script (about 140 words; two voices)</h4>
<table><thead><tr><th>Time</th><th>Voice</th><th>Line</th></tr></thead><tbody>
<tr><td>0:00</td><td>SFX</td><td>Phone notification sound, twice.</td></tr>
<tr><td>0:02</td><td>Voice A</td><td>"Yo, did you see this? They say school closed tomorrow because of a storm!"</td></tr>
<tr><td>0:06</td><td>Voice B</td><td>"Hold on. Who posted it?"</td></tr>
<tr><td>0:08</td><td>Voice A</td><td>"Some page. It has a video of the Minister saying it."</td></tr>
<tr><td>0:12</td><td>Voice B</td><td>"Videos can be faked now. AI can copy a face and a voice in minutes. Let's check the official government page and the school's page first."</td></tr>
<tr><td>0:20</td><td>Voice A</td><td>"Nothing there. So it's fake?"</td></tr>
<tr><td>0:23</td><td>Voice B</td><td>"Looks like it. And if you had forwarded it, your name would be on it. Your digital footprint is permanent."</td></tr>
<tr><td>0:31</td><td>Music</td><td>Music rises for 2 seconds.</td></tr>
<tr><td>0:33</td><td>Voice B</td><td>"Before you share, ask three questions: Who made it? Where else is it reported? Does it feel designed to make me panic?"</td></tr>
<tr><td>0:45</td><td>Voice A</td><td>"Check before you share. Be part of the solution."</td></tr>
<tr><td>0:50</td><td>Voice B</td><td>"A message from the Nevis Youth Digital Council."</td></tr>
<tr><td>0:55</td><td>Music</td><td>Music fades out by 1:00.</td></tr>
</tbody></table>
<p><b>Sound sources:</b> record the notification sound yourself from a phone, or use a CC0 sound. The music bed must be CC0, royalty-free with a licence you can show, or supplied by your teacher.</p>`,
    tasks: [
      'Get a signed voice consent note from your second speaker (name, date, permission to use the recording at school and online).',
      'In Audacity set the project rate to <b>44100 Hz</b> (bottom-left, or Audio Setup &gt; Audio Settings) and record in <b>mono</b>. Record 5 seconds of silence (room tone) before each voice.',
      'Record Voice A and Voice B on <b>separate tracks</b>. Keep peaks between −12 dB and −6 dB on the meter.',
      'Apply noise reduction to each voice track: select the room tone, <b>Effect &gt; Noise Removal and Repair &gt; Noise Reduction &gt; Get Noise Profile</b>; select the whole track and apply with Noise reduction 12 dB, Sensitivity 6, Frequency smoothing 3.',
      'Apply <b>Effect &gt; Volume and Compression &gt; Compressor</b> to each voice: Threshold −18 dB, Ratio 3:1, Attack 0.2 s, Release 1.0 s, Make-up gain on.',
      'Import the SFX and music bed (File &gt; Import &gt; Audio). Use the Time Shift tool to line each item up with the script timings.',
      'Lower the music under speech to about −18 dB using the Envelope tool or Effect &gt; Volume and Compression &gt; Auto Duck (Duck amount −12 dB). Let it rise at 0:31 for 2 seconds.',
      'Apply a 2-second <b>Fade In</b> to the start of the music and a 5-second <b>Fade Out</b> ending at exactly 60.0 seconds (Effect &gt; Fading).',
      'Trim the project to <b>60 seconds ± 1 second</b>. Mix and render to one track (Tracks &gt; Mix &gt; Mix and Render), then <b>Normalise</b> the peak to <b>−1.0 dB</b> (Effect &gt; Volume and Compression &gt; Normalize).',
      'Export two files: <b>WAV 16-bit PCM</b> master and <b>MP3 128 kbps constant bit rate</b> for social media. Add metadata: Title "Check Before You Share", Artist your name, Year.',
      'Save the project as <b>.aup3</b>. Write a credits file listing voices, the SFX source and the music source with its licence.',
      'Write a 100-word reflection: which ethical issue is the PSA about, and how does the script model responsible digital citizenship?'
    ],
    skills: ['Multitrack recording', 'Noise reduction and compression', 'Mixing with ducking and fades', 'Exporting WAV and MP3', 'Ethics and consent', 'Misinformation and deepfakes'],
    check: [
      { c: 'Signed voice consent and credits file with licences', m: 2 },
      { c: 'Clean voice recordings on separate tracks; noise reduction audible', m: 3 },
      { c: 'Music ducked under speech and timed to the script', m: 3 },
      { c: 'Fades correct; final length 60 seconds ± 1 second', m: 2 },
      { c: 'Normalised to −1.0 dB peak; no clipping', m: 2 },
      { c: 'WAV master and MP3 128 kbps exported with metadata', m: 3 },
      { c: 'Reflection correctly links the PSA to ethical issues and digital citizenship', m: 3 }
    ],
    tip: `Normalise <b>after</b> mixing, not before. If you normalise each track to −1 dB and then mix, the combined peaks will clip.`
  },

  /* =========================== MODULE 2: THE DIGITAL MEDIA ECOSYSTEM =========================== */
  {
    id: 'M2-L1', sec: 'M2', app: 'web', level: 'Starter',
    title: 'My Digital Media Portfolio Page',
    time: 75,
    brief: `<p>You need to discuss the <b>skills and dispositions</b> that support employment and entrepreneurship in digital media, and <b>portfolio-based employment</b> is a key work model. Build a one-page professional portfolio site that you will keep adding to all year.</p>
<p><b>Capture first:</b> a head-and-shoulders photo of yourself in school uniform against a plain wall, in daylight, or a designed avatar if you prefer not to show your face.</p>`,
    data: `<h4>Skills and dispositions named in the syllabus</h4>
<table><thead><tr><th>Skills</th><th>Dispositions</th></tr></thead><tbody>
<tr><td>Continuous learning, innovation, adaptability, resourcefulness, critical thinking, communication</td><td>Collaborative mindset, teamwork, curiosity, research-oriented</td></tr>
</tbody></table>
<p><b>Sample bio (rewrite in your own voice):</b> "I am a CAPE Digital Media student at Sandbox Tree College who enjoys telling Caribbean stories through photography and short video. I am learning GIMP, Audacity and OpenShot, and I am interested in a career as a content strategist."</p>
<h4>Privacy rules</h4>
<ul><li>No home address, personal phone number or date of birth.</li><li>Contact through your school email only.</li></ul>`,
    tasks: [
      'In Google Sites, create a new site named <b>"[First name] [Surname]: Digital Media Portfolio"</b> and choose a simple theme.',
      'Create four sections on one page: <b>About</b>, <b>Skills</b>, <b>Projects</b>, <b>Contact</b>. Add them to the navigation menu.',
      'In About, add your photo or avatar (crop square, at least 600 × 600 px) with alt text, and a 60 to 90 word bio.',
      'In Skills, list three technical skills and three soft skills or dispositions taken from the syllabus table. For each, give one sentence of evidence (for example, "Teamwork: I edited the class podcast with two classmates").',
      'In Projects, create three cards with a placeholder image, title and one-line description. Link one card to your M1-L5 blog post.',
      'In Contact, add your school email only and a line on how you prefer to be contacted.',
      'Use one heading font and one body font. Set button and link colours to your brand colour; check contrast so text is easy to read.',
      'Preview in desktop and mobile view and fix layout problems.',
      'Publish with access set to your school domain. Submit the URL and screenshots of the desktop and mobile views named M2L1_Surname_Desktop.png and M2L1_Surname_Mobile.png.'
    ],
    skills: ['Personal branding', 'Employability skills', 'Website building', 'Online privacy', 'Responsive design check'],
    check: [
      { c: 'Four sections with working navigation', m: 2 },
      { c: 'Bio of 60 to 90 words; photo or avatar with alt text', m: 2 },
      { c: 'Six skills or dispositions from the syllabus, each with evidence', m: 4 },
      { c: 'Three project cards, one linked to M1-L5', m: 2 },
      { c: 'Privacy rules followed: school email only, no personal data', m: 2 },
      { c: 'Readable on mobile; desktop and mobile screenshots submitted', m: 2 }
    ],
    tip: `Employers look for evidence, not adjectives. "Hardworking" earns nothing; "Edited a 45-second promo in OpenShot to a client brief" earns a call back.`
  },

  {
    id: 'M2-L2', sec: 'M2', app: 'design', level: 'Core',
    title: 'Traditional vs Digital Value Chain Diagram',
    time: 75,
    brief: `<p>You need to explain <b>the impact of digital media on the value chain</b>: key aspects, stakeholders from producer to end-user, the impact of digital media, and the interdependencies of players in the ecosystem. Design a diagram that compares how the Belizean soca artist <b>Kezia Flame</b> would have released a song in 2000 with how she releases one today.</p>`,
    data: `<h4>Traditional value chain (around 2000)</h4>
<p>Artist and songwriter &gt; recording studio (hired by the hour) &gt; record label (pays for production, owns the master) &gt; CD manufacturer &gt; distributor &gt; record shops and radio stations &gt; listener</p>
<h4>Digital value chain (today)</h4>
<p>Artist and songwriter &gt; home studio or small studio &gt; digital distributor (aggregator) &gt; streaming platforms, video platforms and social media &gt; listener (local, regional and diaspora)</p>
<p>Feedback loop: platform analytics (plays, location, age group) &gt; artist plans the next release, tour dates and merchandise.</p>
<h4>Practice figures</h4>
<table><thead><tr><th>Item</th><th>Traditional</th><th>Digital</th></tr></thead><tbody>
<tr><td>Time from finished song to public release</td><td>4 to 6 months</td><td>1 to 2 weeks</td></tr>
<tr><td>Artist share of each sale or stream income</td><td>About 10 to 15%</td><td>About 80 to 100% via a distributor (but income per stream is very small)</td></tr>
<tr><td>Stakeholders between artist and listener</td><td>5</td><td>2</td></tr>
</tbody></table>`,
    tasks: [
      'Create an <b>A4 landscape</b> design (3508 × 2480 px, 300 ppi) in Canva or Inkscape.',
      'Draw the traditional chain across the top half and the digital chain across the bottom half, using one shape per stakeholder and arrows between them.',
      'Colour code the arrows: <b>blue</b> for the flow of the product or content, <b>green</b> for the flow of money. Add a key.',
      'Under each stakeholder, write in no more than 10 words the value it adds (for example, "Distributor: gets CDs into shops across the islands").',
      'Draw the analytics feedback loop on the digital chain as a curved dashed arrow back to the artist.',
      'Add three callouts that explain the impact of digital media: <b>disintermediation</b> (fewer middlemen), <b>speed to market</b> and <b>global reach to the diaspora</b>. Use the practice figures.',
      'Add one callout on <b>interdependency</b>: what happens to the artist if a platform changes its algorithm or payment rate.',
      'Add a title, your name and a source line "Figures are practice data".',
      'Export as <b>PDF Print</b> and <b>PNG</b>. Name the files M2L2_Surname_ValueChain.'
    ],
    skills: ['Value chain analysis', 'Stakeholder mapping', 'Diagram design', 'Disintermediation', 'Ecosystem interdependence'],
    check: [
      { c: 'Correct A4 landscape size; PDF and PNG exported', m: 1 },
      { c: 'Both chains complete with all stakeholders in the correct order', m: 4 },
      { c: 'Product and money flows colour coded with a key', m: 2 },
      { c: 'Value added stated for each stakeholder', m: 3 },
      { c: 'Three impact callouts accurate and supported by figures', m: 3 },
      { c: 'Feedback loop and interdependency callout included', m: 2 }
    ],
    tip: `Value chain questions reward the word <b>stakeholder</b>. Name them: producer, distributor, platform, advertiser, end-user. Then say how digital media changed the relationship between two of them.`
  },

  {
    id: 'M2-L3', sec: 'M2', app: 'plan', level: 'Core',
    title: 'Agile Sprint Board for a Client Promo',
    time: 90,
    brief: `<p>You need to <b>plan a digital media project using the agile project management model</b>: Planning, Sprint, Review, Iteration and Delivery, with the budget tracked throughout. <b>Bay Breeze Bike Rentals</b> in Gros Islet wants a 45-second promo video and three social media posts in <b>two weeks</b>. Set up and run a sprint board for the project.</p>
<p>Agile is an iterative, flexible approach that delivers value in small increments while adapting to change through collaboration with stakeholders.</p>`,
    data: `<h4>Product backlog (user stories, estimates and costs)</h4>
<table><thead><tr><th>#</th><th>User story</th><th>Points</th><th>Planned cost (USD)</th></tr></thead><tbody>
<tr><td>1</td><td>As the owner, I want a creative brief so that everyone agrees on the message.</td><td>2</td><td>0</td></tr>
<tr><td>2</td><td>As the editor, I want a script and storyboard so that filming is quick.</td><td>3</td><td>0</td></tr>
<tr><td>3</td><td>As the owner, I want signed location and talent releases.</td><td>1</td><td>0</td></tr>
<tr><td>4</td><td>As the camera operator, I want 12 clips of bikes on the boardwalk at golden hour.</td><td>5</td><td>40 (transport)</td></tr>
<tr><td>5</td><td>As the editor, I want a licensed music track.</td><td>1</td><td>25</td></tr>
<tr><td>6</td><td>As the editor, I want a rough cut to show the owner.</td><td>5</td><td>0</td></tr>
<tr><td>7</td><td>As the owner, I want my logo and phone number in the closing title.</td><td>1</td><td>0</td></tr>
<tr><td>8</td><td>As the owner, I want the final MP4 in 1080p.</td><td>3</td><td>0</td></tr>
<tr><td>9</td><td>As the marketer, I want three Instagram posts from video stills.</td><td>3</td><td>0</td></tr>
<tr><td>10</td><td>As the owner, I want a vertical 15-second cut for Reels.</td><td>3</td><td>0</td></tr>
<tr><td>11</td><td>As the team, I want a microSD card and phone tripod.</td><td>1</td><td>35</td></tr>
<tr><td>12</td><td>As the owner, I want captions so people can watch without sound.</td><td>2</td><td>0</td></tr>
</tbody></table>
<p><b>Total budget:</b> USD 120, including a 10% contingency. <b>Team capacity:</b> 15 points per one-week sprint.</p>
<p><b>Mid-project change (apply in the Review):</b> after Sprint 1 the owner asks for a Spanish caption version for visitors. The music track also costs USD 35, not USD 25.</p>`,
    tasks: [
      'Create a board in Trello, Padlet, Microsoft Planner or a Google Sheet with columns: <b>Product Backlog, Sprint 1, Sprint 2, In Progress, Review, Done</b>.',
      '<b>Planning:</b> write a project goal of one sentence and a scope statement listing what is in and out of scope.',
      'Add all 12 user stories as cards, each showing points and planned cost. Order the backlog by priority (Must, Should, Could).',
      'Pull stories into Sprint 1 and Sprint 2 without exceeding <b>15 points</b> per sprint. Write a sprint goal for each.',
      'Create a budget tab or card with columns: item, planned cost, actual cost, variance. Check that the planned total plus contingency fits USD 120.',
      'Write three short daily stand-up entries for Sprint 1 (what I did, what I will do, any blockers).',
      '<b>Review:</b> move completed Sprint 1 cards to Done. Record the owner\'s feedback and compare actual spending with the plan.',
      '<b>Iteration:</b> add the Spanish caption story to the backlog with an estimate, update the music cost and re-plan Sprint 2. State which lower-priority story you moved out to stay within capacity.',
      '<b>Delivery:</b> write a closing note with total points delivered, total actual cost, variance and one lesson learned.',
      'Export screenshots of the board at three moments (after Planning, after Review, at Delivery) and the budget table into one PDF: M2L3_Surname_Sprint.pdf.'
    ],
    skills: ['Agile planning', 'User stories and estimation', 'Sprint capacity', 'Budget tracking and variance', 'Responding to change'],
    check: [
      { c: 'Board set up with all six columns; goal and scope written', m: 2 },
      { c: 'Backlog prioritised; both sprints within 15 points with sprint goals', m: 3 },
      { c: 'Budget table with planned, actual and variance correctly calculated', m: 3 },
      { c: 'Stand-up entries and Review feedback recorded', m: 2 },
      { c: 'Iteration correctly handles the new story and the price change', m: 3 },
      { c: 'Delivery note with totals and lesson learned; three-stage screenshots in PDF', m: 2 }
    ],
    tip: `The key word in agile is <b>iteration</b>. When something changes, you do not start again; you re-prioritise the backlog and adjust the next sprint. Say that in your SBA plan of action.`
  },

  {
    id: 'M2-L4', sec: 'M2', app: 'design', level: 'Core',
    title: 'Two-week Social Media Content Calendar for Kaya Threads',
    time: 100,
    brief: `<p><b>Kaya Threads</b> is a small Roseau fashion brand that sells shirts and dresses in bold Caribbean prints. It wants a two-week content plan around <b>Dominica's Independence Day (3 November)</b> and three finished post designs. This lab applies <b>public engagement via digital media</b>, <b>platform terms</b> (such as feed, engagement and analytics) and effective communication based on audience, purpose and message.</p>`,
    data: `<h4>Client facts</h4>
<ul><li>Brand colours: Hibiscus Red #C8102E, Sea Blue #0077B6, Sand #F4E3C1. Fonts: one bold display font and one clean sans-serif.</li>
<li>Audience: women and men aged 20 to 45 in Dominica, plus diaspora in the UK and the USA.</li>
<li>Goal: 30 orders through WhatsApp Business in the two weeks.</li>
<li>Content pillars: Product (40%), Culture and heritage (30%), Behind the scenes (20%), Community (10%).</li>
<li>Dates: Monday 2 November to Sunday 15 November. Special date: 3 November, Independence Day.</li></ul>
<h4>Calendar columns</h4>
<p>Date | Platform | Format (feed, Reel, Story, carousel) | Pillar | Caption (max 150 characters) | Hashtags (3 to 5) | Call to action | Alt text | Posting time | Metric to watch</p>`,
    tasks: [
      'Build the calendar in Google Sheets, Excel or Canva using the ten columns given. Plan <b>10 posts</b> over the two weeks (five per week).',
      'Match the pillar split: 4 Product, 3 Culture and heritage, 2 Behind the scenes, 1 Community. Colour code each row by pillar.',
      'Use at least two platforms and three formats. Give each post a posting time and the metric to watch (reach, saves, shares, link clicks or messages).',
      'Write original captions in the brand voice (warm, proud, bilingual phrases welcome). Each caption has a call to action, for example "Message us on WhatsApp to order".',
      'Write alt text for every image post.',
      'In Canva or Inkscape, design three of the posts: a <b>1080 × 1350 px</b> feed post for Independence Day, a <b>1080 × 1920 px</b> Story with a poll sticker area, and a <b>1080 × 1080 px</b> carousel cover.',
      'Use only the brand colours (exact hex codes) and two fonts. Keep the top and bottom 250 px of the Story free of key text (safe zones).',
      'Use your own photos or free-to-use assets; add a credits note for any third-party asset.',
      'Export each design as <b>PNG</b> and the calendar as <b>PDF</b> (landscape). Name files M2L4_Surname_Calendar.pdf and M2L4_Surname_Post1.png to Post3.png.'
    ],
    skills: ['Content planning', 'Audience and platform selection', 'Brand consistency', 'Social media formats and sizes', 'Engagement metrics'],
    check: [
      { c: 'Ten posts with all ten columns completed', m: 3 },
      { c: 'Pillar split correct and colour coded; two platforms and three formats', m: 2 },
      { c: 'Captions, calls to action and alt text suitable for the audience', m: 3 },
      { c: 'Three designs at the exact sizes stated', m: 3 },
      { c: 'Brand colours, fonts and Story safe zones respected', m: 2 },
      { c: 'Correct exports and file names; credits where needed', m: 2 }
    ],
    tip: `Each post should do one job. If you cannot say in one sentence what a post is for, the audience will not know either.`
  },

  {
    id: 'M2-L5', sec: 'M2', app: 'plan', level: 'Core',
    title: 'Proposal Practice: Executive Summary, Objectives and Budget',
    time: 90,
    brief: `<p>A project proposal has set elements, from (a) Title Page to (k) Appendices, and this lab practises <b>project proposal writing</b> and <b>outlining a budget</b>. In the SBA, the Proposal is worth 20 of the 45 marks: the overview, the concept, the methodology and tools, the budget breakdown, and the digital presentation of the concept with evidence of the creative process. In this lab you write four elements for a client case: <b>Executive Summary, Problem Statement, Objectives and Budget</b>.</p>`,
    data: `<h4>Case notes: Grand Anse Community Library</h4>
<ul><li>The library runs a free homework centre from 3 p.m. to 6 p.m., Monday to Thursday.</li>
<li>A survey of 120 parents found that 68% did not know the centre existed; 74% use WhatsApp daily and 61% use Facebook weekly.</li>
<li>Only 14 students attend on an average day; the centre has space for 40.</li>
<li>The librarian wants a short video series, a simple web page and a WhatsApp status campaign before the next school term.</li>
<li>Available: one volunteer student editor, the library's laptop, a phone with a good camera.</li></ul>
<h4>Cost items (USD)</h4>
<table><thead><tr><th>Item</th><th>Cost</th><th>Type</th></tr></thead><tbody>
<tr><td>Lavalier microphone</td><td>25</td><td>Cash</td></tr>
<tr><td>Phone tripod</td><td>20</td><td>Cash</td></tr>
<tr><td>Royalty-free music licence</td><td>15</td><td>Cash</td></tr>
<tr><td>Printing 200 QR code flyers</td><td>40</td><td>Cash</td></tr>
<tr><td>Library laptop (use)</td><td>0</td><td>In kind</td></tr>
<tr><td>Student editor, 30 hours</td><td>0 (volunteer)</td><td>In kind</td></tr>
<tr><td>Free website builder</td><td>0</td><td>In kind</td></tr>
</tbody></table>`,
    tasks: [
      'Open a new document. Use Arial or Calibri 12 pt, 1.15 line spacing, headings formatted with Heading 1 and Heading 2.',
      'Write a <b>Problem Statement</b> of 80 to 120 words that states the problem, who it affects and the evidence (use the survey figures).',
      'Write three <b>SMART objectives</b> (Specific, Measurable, Achievable, Relevant, Time-bound). Example: "Increase average daily attendance from 14 to 25 students by the end of the first month of next term."',
      'Build the <b>Budget</b> as a table with columns: Item, Quantity, Unit cost, Total, Cash or In kind. Add a subtotal, a <b>10% contingency</b> on cash items and a grand total.',
      'Under the table, write two sentences justifying the most expensive cash item.',
      'Write the <b>Executive Summary</b> last: 150 to 200 words covering the problem, the proposed digital solution, the audience, the cost and the expected benefit.',
      'Check that every number in the executive summary matches the budget and objectives exactly.',
      'Add a heading for each element using its letter, for example "(b) Executive Summary", "(d) Problem Statement", "(e) Objectives", "(g) Budget".',
      'Export as PDF: M2L5_Surname_Proposal.pdf.'
    ],
    skills: ['Proposal writing', 'Problem statements with evidence', 'SMART objectives', 'Budget with contingency', 'Concise business writing'],
    check: [
      { c: 'Problem statement within word limit and uses survey evidence', m: 3 },
      { c: 'Three objectives that meet all SMART criteria', m: 3 },
      { c: 'Budget table complete with correct subtotal, 10% contingency and grand total', m: 4 },
      { c: 'Most expensive cash item justified', m: 1 },
      { c: 'Executive summary of 150 to 200 words covering all five points', m: 4 },
      { c: 'Figures consistent across sections; headings use the element letters', m: 2 }
    ],
    tip: `Write the executive summary <b>last</b> but place it <b>first</b>. A busy funder reads only that page, so it must stand on its own.`
  },

  {
    id: 'M2-L6', sec: 'M2', app: 'present', level: 'Challenge',
    title: 'Pitch It: Agile Project Pitch Deck and Funding Ask',
    time: 150,
    brief: `<p>You need to <b>pitch a digital media project using the agile project management model</b> and to <b>explore project funding opportunities</b>, including types and sources of funding (debt and equity; lending institutions, crowdfunding, angels and venture capitalists). Prepare a pitch deck and deliver a 3-minute pitch to a mock panel.</p>
<p>Use your own SBA idea or the supplied project below.</p>`,
    data: `<h4>Supplied project: ReefWatch Bonaire</h4>
<ul><li><b>Problem:</b> snorkellers from cruise ships often stand on or touch coral; local dive shops say damage is rising at popular sites.</li>
<li><b>Solution:</b> a series of 30-second multilingual videos (English, Spanish, Dutch, Papiamentu) shown on tour boats, plus a QR code linking to a simple web page with reef rules.</li>
<li><b>Market:</b> eight local tour operators; about 15,000 snorkellers a month in high season (practice figure).</li>
<li><b>Traction after Sprint 1:</b> two operators agreed to pilot; first video storyboarded and filmed.</li>
<li><b>Competition:</b> printed safety cards (cheap but rarely read); generic online videos (not local, not multilingual).</li>
<li><b>Team:</b> three CAPE students (producer, editor, translator coordinator).</li>
<li><b>Ask:</b> USD 1,200 grant for an underwater camera housing, translation fees and boat screen mounts.</li></ul>
<h4>Required pitch elements</h4>
<p>Introduction and vision; problem; solution; target market and opportunity; traction and milestones; competition; team; the ask; the 4Ps of marketing (product, price, place, promotion).</p>`,
    tasks: [
      'Create a 16:9 deck of <b>11 slides</b>: one slide for each of the nine required elements, plus a title slide and a closing slide with contact details.',
      'On the traction slide, show a sprint timeline: Sprint 1 (done), Sprint 2 (in progress), Sprint 3 and Delivery (planned) with dates.',
      'On the 4Ps slide, use a 2 × 2 grid, one box per P.',
      'On the ask slide, show a budget breakdown chart (pie or bar) that totals exactly USD 1,200.',
      'Add a funding options table comparing a <b>grant</b>, a <b>bank loan (debt)</b>, <b>crowdfunding</b> and an <b>angel investor (equity)</b>: what each gives, what you give up and suitability. Recommend one.',
      'Embed one piece of multimedia of 15 to 20 seconds: a short video clip or audio clip you produced (for example, a reef rules sample in one language).',
      'Keep text to a maximum of 30 words per slide. Put the detail in speaker notes (50 to 100 words per slide).',
      'Rehearse with a timer: the pitch must last <b>3 minutes ± 15 seconds</b>.',
      'Prepare three likely panel questions and your answers on a final hidden slide.',
      'Deliver the pitch (live or recorded). If recorded, export as MP4 1080p. Export the deck as PDF: M2L6_Surname_Pitch.pdf.'
    ],
    skills: ['Pitching', 'Agile milestones', 'Funding types (debt, equity, grants)', '4Ps of marketing', 'Multimedia presentation', 'Public speaking'],
    check: [
      { c: 'All nine required pitch elements present on separate slides', m: 5 },
      { c: 'Sprint timeline shows agile milestones and traction', m: 2 },
      { c: 'Budget chart totals the ask exactly', m: 2 },
      { c: 'Funding options compared accurately with a justified recommendation', m: 3 },
      { c: 'Embedded multimedia clip plays correctly', m: 2 },
      { c: 'Text limit kept; speaker notes on every slide', m: 2 },
      { c: 'Pitch delivered within 3 minutes ± 15 seconds with confidence and eye contact', m: 4 }
    ],
    tip: `Say the ask out loud and clearly: "We are asking for USD 1,200 to..." Many student pitches never say what they want, and panels notice.`
  },

  /* =========================== MODULE 3: CREATIVE SOLUTION DESIGN =========================== */
  {
    id: 'M3-L1', sec: 'M3', app: 'image', level: 'Starter',
    title: 'Paper 02 Practice: Square Product Photo for Instagram',
    time: 45,
    brief: `<p><b>Tamarind Tree Bakery</b> in Roseau needs a square product photo for Instagram. You will photograph, crop by the <b>rule of thirds</b>, correct tones with <b>Levels</b>, resize to exact settings and export under a file size limit. This is the kind of photographing, editing and format conversion task set in Paper 02.</p>
<p><b>Capture first:</b> photograph one baked item (or any food item at home) on a plate beside a window, in daylight, no flash. Take <b>five landscape shots</b> at different angles, with the item slightly off-centre. Use the main camera at full resolution (at least 3000 px wide). Choose the sharpest shot.</p>`,
    tasks: [
      'Open your chosen photo in GIMP (or Photoshop). Duplicate the layer so the original stays untouched.',
      'Select the <b>Crop tool</b>. Tick <b>Fixed: Aspect ratio</b> and type <b>1:1</b>. Set the guides to <b>Rule of thirds</b> (Photoshop: Ratio 1:1, Overlay: Rule of Thirds).',
      'Drag the crop so the main subject sits on one of the four intersection points, leaving space in the direction the item faces. Press Enter.',
      'If the horizon or table edge is tilted, straighten it with the Measure tool and click <b>Straighten</b> (Photoshop: Straighten button in the Crop tool).',
      'Open <b>Colors &gt; Levels</b> (Photoshop: Image &gt; Adjustments &gt; Levels). Move the black input slider to where the histogram begins and the white slider to where it ends. Set the midtone (grey) value to about <b>1.10</b> to brighten slightly. Click OK.',
      'Scale the image: <b>Image &gt; Scale Image</b>, width <b>1080 px</b>, height <b>1080 px</b>, resolution <b>72 ppi</b>, interpolation <b>Cubic</b> (Photoshop: Image &gt; Image Size, Resample: Bicubic Sharper).',
      'Save the editable master: <b>File &gt; Save As</b> M3L1_Surname_Master.xcf (Photoshop: .psd).',
      'Export: <b>File &gt; Export As</b> M3L1_Surname_Bakery.jpg, Quality <b>80</b>, strip unnecessary metadata (Photoshop: File &gt; Export &gt; Export As, JPG, Quality 8 or 80%).',
      'Check the file size in your file manager. It must be <b>under 500 KB</b>. If it is larger, re-export at Quality 75.',
      'Open Image Properties on the exported JPEG and take a screenshot showing 1080 × 1080 px and 72 ppi. Save it as M3L1_Surname_Proof.png.'
    ],
    skills: ['Photographing with natural light', 'Rule of thirds cropping', 'Levels adjustment', 'Resizing and resolution', 'Exporting to a file size limit'],
    check: [
      { c: 'Original photo meets the capture brief (daylight, no flash, sharp)', m: 2 },
      { c: '1:1 crop with the subject on a rule-of-thirds intersection', m: 3 },
      { c: 'Levels applied: improved contrast with no clipped highlights or shadows', m: 3 },
      { c: 'Exactly 1080 × 1080 px at 72 ppi', m: 2 },
      { c: 'JPEG under 500 KB with the correct file name; master saved', m: 2 },
      { c: 'Proof screenshot submitted', m: 1 }
    ],
    tip: `In the exam, read the export instruction twice. A perfect edit saved as PNG when JPEG was asked for, or at 1080 × 1079 px, loses easy marks.`
  },

  {
    id: 'M3-L2', sec: 'M3', app: 'audio', level: 'Core',
    title: 'Paper 02 Practice: 30-second Podcast Intro',
    time: 75,
    brief: `<p>Record and edit a 30-second intro for the school podcast <b>"Island Voices"</b>. You must apply noise reduction, fades and normalisation and export to exact settings. This matches the audio editing (Audacity or equivalent) required for Unit 1 Paper 02.</p>
<p><b>Capture first:</b> record in a quiet room with soft furnishings (curtains, a bed or cushions). Hold the phone or microphone about 15 cm (a hand-span) from your mouth and slightly to one side. Turn off fans and air conditioning while recording.</p>`,
    data: `<h4>Intro script (about 65 words)</h4>
<p>[Music in: 0:00 to 0:04]</p>
<p>"Welcome to <i>Island Voices</i>, the podcast where Antigua's young people talk about the things that matter. I'm [your name], coming to you from Sandbox Tree College. Every week we sit down with students, business owners and creators to hear the stories behind the headlines. Today's episode: how small businesses are going digital. So grab a seat, and let's talk."</p>
<p>[Music rises 0:27, fades out by 0:30]</p>
<p><b>Music bed:</b> use a CC0 or royalty-free track supplied by your teacher, or one you made in GarageBand or BandLab. Record its title, creator and licence.</p>`,
    tasks: [
      'In Audacity, set the project rate to <b>44100 Hz</b> and recording channels to <b>Mono</b>.',
      'Press Record, stay silent for <b>5 seconds</b> (room tone), then read the script. Do two takes and keep the best.',
      'Select the room tone only, then <b>Effect &gt; Noise Removal and Repair &gt; Noise Reduction &gt; Get Noise Profile</b>. Select the whole voice track (Ctrl+A) and apply Noise Reduction: <b>12 dB</b>, Sensitivity <b>6</b>, Frequency smoothing <b>3</b>.',
      'Delete the room tone and any mistakes. Use <b>Edit &gt; Remove Special &gt; Split Delete</b> or select and press Delete. Leave about 0.3 s pauses between sentences.',
      'Import the music bed (File &gt; Import &gt; Audio). Use the Time Shift tool so the voice starts at <b>0:04</b>.',
      'Reduce the music under the voice by about <b>12 dB</b> (Effect &gt; Volume and Compression &gt; Amplify, −12 dB on the section under speech, or use the Envelope tool).',
      'Apply a <b>2-second Fade In</b> at the start of the music and a <b>3-second Fade Out</b> ending at exactly <b>30.0 s</b> (Effect &gt; Fading &gt; Fade In / Fade Out).',
      'Trim everything after 30.0 s. Check the length in the Selection toolbar: <b>30 s ± 0.5 s</b>.',
      'Mix down (Tracks &gt; Mix &gt; Mix and Render) and apply <b>Effect &gt; Volume and Compression &gt; Normalize</b> with "Remove DC offset" ticked and peak amplitude <b>−1.0 dB</b>.',
      'Export: <b>File &gt; Export Audio</b> (or Export as MP3), format <b>MP3</b>, Bit Rate Mode <b>Constant</b>, Quality <b>128 kbps</b>, Channel mode Joint Stereo or Mono. Name the file M3L2_Surname_IslandVoices.mp3 and add Title and Artist metadata.',
      'Save the project as M3L2_Surname.aup3 and take a screenshot of the final waveform showing the fades.'
    ],
    skills: ['Voice recording technique', 'Noise reduction', 'Editing and timing', 'Fades and level balancing', 'Normalising', 'MP3 export settings'],
    check: [
      { c: 'Clear voice recording with room tone captured', m: 2 },
      { c: 'Noise reduction applied with the stated settings; background hiss reduced', m: 2 },
      { c: 'Mistakes removed; natural pauses; voice starts at 0:04', m: 2 },
      { c: 'Music lowered under speech; voice clearly audible', m: 2 },
      { c: '2-second fade in and 3-second fade out; length 30 s ± 0.5 s', m: 3 },
      { c: 'Normalised to −1.0 dB with no clipping', m: 2 },
      { c: 'MP3 128 kbps constant, correct name and metadata; project and screenshot saved', m: 2 }
    ],
    tip: `Always capture room tone <b>before</b> you speak. Without a clean noise profile, Noise Reduction removes parts of your voice and makes it sound watery.`
  },

  {
    id: 'M3-L3', sec: 'M3', app: 'plan', level: 'Core',
    title: 'Pre-production Pack: Script, Storyboard and Shot List',
    time: 90,
    brief: `<p>Before filming the 45-second promo for <b>Bay Breeze Bike Rentals</b> (used in M2-L3 and M3-L4), complete a pre-production pack. You need to apply pre-production skills: the role of pre-production; core elements such as budget, time, personnel, equipment, location, permissions, releases and copyright; health and safety; and visual techniques (rule of thirds, lighting, composition, framing and the psychology of colour).</p>`,
    data: `<h4>Creative brief</h4>
<ul><li><b>Client:</b> Bay Breeze Bike Rentals, Gros Islet. E-bikes and beach cruisers from USD 15 an hour.</li>
<li><b>Audience:</b> cruise and hotel visitors aged 25 to 55.</li>
<li><b>Message:</b> "See the island at your own pace."</li>
<li><b>Platforms:</b> YouTube and the client's website (16:9), Instagram Reels (9:16 cut later).</li>
<li><b>Length:</b> 45 seconds. <b>Tone:</b> relaxed, sunny, friendly.</li></ul>
<h4>Starter shot list (complete shots 4 to 10)</h4>
<table><thead><tr><th>Shot</th><th>Size and angle</th><th>Movement</th><th>Description</th><th>Audio</th><th>Duration</th></tr></thead><tbody>
<tr><td>1</td><td>Extreme wide shot, eye level</td><td>Static</td><td>Bay at sunrise, empty boardwalk</td><td>Music in</td><td>4 s</td></tr>
<tr><td>2</td><td>Close-up, low angle</td><td>Slow pan right</td><td>Row of bikes with the logo visible</td><td>Music</td><td>3 s</td></tr>
<tr><td>3</td><td>Medium shot, eye level</td><td>Static</td><td>Staff member hands a helmet to a rider</td><td>Voice-over line 1</td><td>4 s</td></tr>
<tr><td>4 to 10</td><td colspan="5">Your shots: riding along the boardwalk, a scenic stop, a close-up of the e-bike display, smiling riders (with releases), the shop front, the closing title with logo and phone number</td></tr>
</tbody></table>
<p><b>Voice-over lines:</b> (1) "Ready to explore?" (2) "Glide past beaches, bays and hillside views." (3) "E-bikes and beach cruisers for every pace." (4) "Bay Breeze Bike Rentals, Gros Islet. See the island at your own pace."</p>`,
    tasks: [
      'Write a two-column <b>AV script</b> (Video | Audio) for the full 45 seconds, using all four voice-over lines and music cues.',
      'Complete the <b>shot list</b> for shots 4 to 10. Use at least five different shot sizes or angles and at least two camera movements. The durations must add up to <b>45 s</b>.',
      'Draw a <b>storyboard</b> of 10 frames (one per shot) in a 16:9 template. Hand-drawn and scanned, or drawn in Canva or Google Drawings. Draw rule-of-thirds grid lines lightly on at least three frames to show composition.',
      'Under each frame, write the shot number, duration, movement and the audio.',
      'Create an <b>asset list</b>: every video clip, image, logo, music track and font, with the source and licence or "original".',
      'Write a <b>colour and lighting note</b> (60 to 80 words): why golden hour suits the message and which brand colours will appear (for example, sea blue suggests calm and trust).',
      'List the <b>permissions and releases</b> needed: talent release for each rider, location permission from the shop owner and a note on filming in public spaces.',
      'Write a <b>health and safety</b> checklist of five points (for example, helmets on all riders, no filming from a moving vehicle, sun protection, water, keep the walkway clear).',
      'Make a one-day <b>production schedule</b> in 30-minute blocks from 6:00 a.m., with equipment and personnel for each block.',
      'Combine everything into one PDF: M3L3_Surname_PreProduction.pdf.'
    ],
    skills: ['Scriptwriting (AV format)', 'Shot list and shot types', 'Storyboarding', 'Clearances and copyright', 'Health and safety planning', 'Production scheduling'],
    check: [
      { c: 'AV script covers 45 s with all voice-over lines and music cues', m: 3 },
      { c: 'Shot list complete; durations total 45 s; variety of sizes, angles and movements', m: 3 },
      { c: 'Ten storyboard frames with notes; rule of thirds shown on three or more', m: 3 },
      { c: 'Asset list with source and licence for every item', m: 2 },
      { c: 'Colour and lighting note applies the psychology of colour', m: 2 },
      { c: 'Releases, permissions and health and safety checklist complete', m: 3 },
      { c: 'Production schedule with equipment and personnel', m: 2 }
    ],
    tip: `A shot list that adds up to exactly the target length saves you hours in the edit. Film each shot about 3 seconds longer than planned so you have handles for transitions.`
  },

  {
    id: 'M3-L4', sec: 'M3', app: 'video', level: 'Core',
    title: 'Paper 02 Practice: 45-second Promo Edit',
    time: 120,
    brief: `<p>Using your M3-L3 pre-production pack, film and edit the 45-second promo for <b>Bay Breeze Bike Rentals</b> in OpenShot or iMovie. You will add titles, transitions and licensed music and export to exact settings. This matches the simple video creation software listed for Unit 1 Paper 02.</p>
<p><b>Capture first:</b> film 10 to 14 landscape clips at <b>1920 × 1080, 30 fps</b> (check your phone camera settings), each 6 to 8 seconds long, following your shot list. If you cannot film bikes, film any rental, sports or outdoor equipment and adjust the titles. Get a signed release from anyone recognisable.</p>`,
    tasks: [
      'In OpenShot, choose <b>File &gt; Choose Profile &gt; HD 1080p 30 fps (1920 × 1080)</b> before importing anything. In iMovie, create a new Movie project; the first 1080p 30 fps clip sets the format.',
      'Import your clips, the logo (PNG with transparent background), the voice-over recording and the music track. Sort them into folders or tags: Video, Audio, Graphics.',
      'Place the clips on Track 1 in shot-list order. Trim each to its planned duration using the clip edges or Razor tool.',
      'Add an opening title of 3 seconds ("See the island at your own pace") using <b>Title &gt; Title</b> (iMovie: Titles). Font size at least 60, inside the title-safe area.',
      'Add <b>at least three transitions</b> between clips (Fade or Cross Dissolve), each <b>0.5 to 1.0 s</b>. Use a cut for most other edits.',
      'Place the voice-over on its own track. Place the music on another track; lower its volume under speech to about <b>20 to 30%</b> (OpenShot: right-click &gt; Volume, or keyframe the Volume property).',
      'Fade the music in over the first 2 seconds and out over the last 3 seconds (OpenShot: right-click &gt; Volume &gt; Fade In / Fade Out).',
      'Add a closing title of 4 seconds with the logo, the phone number "+1 758 555 0142" and the line "Gros Islet, St. Lucia".',
      'Check the timeline: the total must be <b>45 s ± 1 s</b>. Watch the whole edit with headphones for gaps, jumps or audio peaks.',
      'Export: OpenShot <b>File &gt; Export Project &gt; Export Video</b>, Profile <b>All Formats</b>, Target <b>MP4 (h.264)</b>, Video Profile <b>HD 1080p 30 fps</b>, Quality <b>High</b>. iMovie: Share &gt; File, Resolution <b>1080p</b>, Quality High. Name the file M3L4_Surname_Promo.mp4.',
      'Save the project file (.osp or the iMovie library) and keep all clips in the same project folder.',
      'Open the MP4 in a media player, check its properties (1920 × 1080, 30 fps, about 45 s) and take a screenshot as proof.'
    ],
    skills: ['Shooting to a shot list', 'Timeline editing and trimming', 'Titles and transitions', 'Audio mixing in video', 'Export profiles (resolution and frame rate)'],
    check: [
      { c: 'Clips follow the shot list and are well framed and steady', m: 3 },
      { c: 'Opening and closing titles with correct text, durations and readable size', m: 3 },
      { c: 'At least three transitions of 0.5 to 1.0 s, used purposefully', m: 2 },
      { c: 'Voice-over clear; music lowered under speech with fades in and out', m: 3 },
      { c: 'Total length 45 s ± 1 s with no gaps or jumps', m: 2 },
      { c: 'Exported as MP4, 1080p, 30 fps, correct name; proof screenshot', m: 3 },
      { c: 'Signed releases and music licence saved with the project', m: 2 }
    ],
    tip: `Set the project profile <b>before</b> you import. Changing from 720p to 1080p after editing can shift titles and stretch clips.`
  },

  {
    id: 'M3-L5', sec: 'M3', app: 'image', level: 'Core',
    title: 'Paper 02 Practice: Scan, Digitise, Restore and Convert',
    time: 90,
    brief: `<p><b>Speyside Heritage Society</b> in Tobago is building an online archive of family photographs. Your task is to <b>scan</b> (or photograph) a printed photograph, <b>digitise</b> it as an archive master, restore it, and <b>convert</b> it to five formats for different uses. Paper 02 lists scanning, digitising, editing and format conversion, so practise all four here.</p>
<p><b>Capture first:</b> choose a printed photograph from home (with a family member's permission) or one supplied by your teacher. If no scanner is available, place the print flat in open shade (not direct sun), hold the phone exactly parallel above it, switch off flash and fill the frame.</p>`,
    data: `<h4>Conversion log to copy and complete</h4>
<table><thead><tr><th>Use</th><th>Format</th><th>Settings</th><th>Pixel size</th><th>File size</th><th>Lossy or lossless?</th></tr></thead><tbody>
<tr><td>Archive master</td><td>TIFF</td><td>LZW compression, 600 dpi scan</td><td></td><td></td><td></td></tr>
<tr><td>Editing copy for re-use</td><td>PNG</td><td>Compression level 9</td><td></td><td></td><td></td></tr>
<tr><td>Website gallery</td><td>JPEG</td><td>1200 px long edge, quality 80, sRGB</td><td></td><td></td><td></td></tr>
<tr><td>Email thumbnail</td><td>GIF</td><td>400 px long edge, 256 colours</td><td></td><td></td><td></td></tr>
<tr><td>Printable record sheet</td><td>PDF</td><td>Image plus caption, A4</td><td></td><td></td><td></td></tr>
</tbody></table>`,
    tasks: [
      'Scan the print at <b>600 dpi</b>, <b>24-bit colour</b> (use colour even for black-and-white prints, to keep the tone). Save the scan straight away as <b>TIFF</b>. If photographing, save the phone image as the master.',
      'Open the master in GIMP (or Photoshop). If the image is tilted, use the <b>Measure tool &gt; Straighten</b>. If photographed at an angle, correct it with the <b>Perspective</b> tool.',
      'Crop away the scanner bed or background and any white border.',
      'Remove at least five dust spots or scratches with the <b>Heal</b> tool (Photoshop: Spot Healing Brush) at a brush size just larger than each mark.',
      'Correct tone and colour: <b>Colors &gt; Levels</b>, then <b>Colors &gt; Color Balance</b> to reduce any yellow or red cast from age (Photoshop: Image &gt; Adjustments).',
      'Save the restored file as TIFF with LZW compression: M3L5_Surname_Master.tif.',
      'Export a <b>PNG</b> (compression 9). Then scale a copy to <b>1200 px</b> on the long edge and export a <b>JPEG</b> at quality 80 with the sRGB profile.',
      'Scale another copy to <b>400 px</b> long edge, convert to Indexed (256 colours) and export as <b>GIF</b>.',
      'Create an A4 record sheet in a word processor or Canva with the JPEG, a 40-word caption (who, where, approximate year, who supplied it) and the line "Digitised by [Your Name], [Date]". Export as <b>PDF</b>.',
      'Complete the conversion log with real pixel sizes and file sizes. Add a before-and-after comparison image and 80 words explaining why the archive keeps a TIFF master and the website uses JPEG.'
    ],
    skills: ['Scanning resolution and colour depth', 'Digitising for archives', 'Photo restoration', 'Colour correction', 'Format conversion', 'Lossy and lossless formats'],
    check: [
      { c: 'Scan at 600 dpi, 24-bit, saved as TIFF (or correctly captured photo)', m: 2 },
      { c: 'Image straightened and cropped cleanly', m: 2 },
      { c: 'At least five blemishes removed without visible smudges', m: 2 },
      { c: 'Tone and colour cast corrected', m: 2 },
      { c: 'All five formats produced with the stated settings', m: 5 },
      { c: 'Conversion log complete and accurate; explanation correct', m: 3 }
    ],
    tip: `Always edit a copy and keep the master untouched. Each time you re-save a JPEG it loses a little more quality, which is why archives use TIFF.`
  },

  {
    id: 'M3-L6', sec: 'M3', app: 'video', level: 'Challenge',
    title: 'Mock Paper 02: Format Conversion for Every Device',
    time: 135,
    brief: `<p>Timed practice (2 hours 15 minutes, no Internet). Bay Breeze Bike Rentals needs your M3-L4 promo delivered in versions that play on different devices and platforms. Products must be exported in formats such as MP4, MP3, PDF, PNG, JPEG and GIF, and prepared for <b>device compatibility</b>, so that they can be played on any digital device.</p>
<p>If you have not finished M3-L4, your teacher will supply a 45-second master clip.</p>`,
    data: `<h4>Delivery specification</h4>
<table><thead><tr><th>#</th><th>Deliverable</th><th>Format and settings</th><th>Limit</th></tr></thead><tbody>
<tr><td>1</td><td>Vertical Reel cut</td><td>MP4 (h.264), <b>1080 × 1920</b>, 30 fps, 15 s</td><td>Under 30 MB</td></tr>
<tr><td>2</td><td>Messaging app version</td><td>MP4 (h.264), <b>1280 × 720</b>, 30 fps, full 45 s</td><td>Under 16 MB</td></tr>
<tr><td>3</td><td>Radio and podcast version</td><td>Audio only, <b>MP3 128 kbps</b>, 44.1 kHz</td><td>45 s ± 1 s</td></tr>
<tr><td>4</td><td>Website poster frame</td><td><b>JPEG</b> 1920 × 1080, quality 80</td><td>Under 400 KB</td></tr>
<tr><td>5</td><td>Email animation</td><td>Animated <b>GIF</b>, 600 × 338, 3 s loop</td><td>Under 2 MB</td></tr>
<tr><td>6</td><td>Client hand-over sheet</td><td><b>PDF</b>, one A4 page listing all files</td><td>1 page</td></tr>
</tbody></table>`,
    tasks: [
      '<b>Planning (10 minutes):</b> copy the delivery table into a document and add columns for actual pixel size, duration and file size. Create a folder named M3L6_Surname_Deliverables.',
      '<b>Vertical cut:</b> in OpenShot, save the project under a new name, choose <b>File &gt; Choose Profile &gt; HD Vertical 1080p 30 fps</b> (1080 × 1920). Select the best 15 seconds, scale and reposition each clip so the subject stays in frame, and move titles inside the safe area.',
      'Export the vertical cut: Target <b>MP4 (h.264)</b>, Video Profile HD Vertical 1080p 30 fps, Quality <b>Medium</b>. Check that it is under 30 MB.',
      '<b>Messaging version:</b> reopen the 16:9 project and export with Video Profile <b>HD 720p 30 fps</b> and Quality <b>Low</b> or Medium so the file is under 16 MB. Record the size you achieved.',
      '<b>Audio version:</b> import the 16:9 MP4 into Audacity (File &gt; Import &gt; Audio; FFmpeg library required) or export audio only from your editor. Normalise to <b>−1.0 dB</b>, then export <b>MP3 128 kbps constant</b>, 44100 Hz.',
      '<b>Poster frame:</b> move the playhead to the best frame and export or save a still (OpenShot: Save Current Frame). In GIMP, check it is 1920 × 1080 and export JPEG quality 80, under 400 KB.',
      '<b>Animated GIF:</b> export 3 seconds of the video as a PNG image sequence (OpenShot: Export &gt; Image Sequence, 10 fps), then in GIMP use <b>File &gt; Open as Layers</b> to load all frames. Scale to <b>600 × 338</b>, run <b>Filters &gt; Animation &gt; Optimize (for GIF)</b>, then <b>File &gt; Export As</b> .gif with <b>As animation</b> and <b>Loop forever</b> ticked, frame delay <b>100 ms</b>.',
      '<b>Hand-over sheet:</b> on one A4 page, list each file name, format, resolution, duration, file size and intended device or platform. Export as PDF.',
      '<b>Testing:</b> play every file on at least two devices (for example, a school computer and a phone). Note any file that fails and fix it.',
      'Complete your log with actual values and write 80 to 100 words explaining how resolution, frame rate and quality settings affect file size and device compatibility.'
    ],
    skills: ['Format conversion', 'Aspect ratio reframing', 'Compression to file size limits', 'Audio extraction', 'Animated GIF creation', 'Device compatibility testing'],
    check: [
      { c: 'Vertical 1080 × 1920 cut, 15 s, subject kept in frame, under 30 MB', m: 3 },
      { c: '720p messaging version under 16 MB', m: 2 },
      { c: 'MP3 128 kbps normalised to −1.0 dB, correct length', m: 2 },
      { c: 'JPEG poster frame 1920 × 1080 under 400 KB', m: 2 },
      { c: 'Animated GIF 600 × 338, looping, under 2 MB', m: 3 },
      { c: 'Hand-over PDF accurate for all files', m: 2 },
      { c: 'Testing on two devices recorded; explanation correct', m: 3 },
      { c: 'All work completed within 2 hours 15 minutes', m: 1 }
    ],
    tip: `When a file is too big, lower the quality or the resolution before you cut content. A 720p file at Medium quality is usually a third of the size of a 1080p file at High.`
  },

  {
    id: 'M3-L7', sec: 'M3', app: 'image', level: 'Core',
    title: 'One-light portrait series',
    time: 60,
    brief: `<p>Using <b>one light only</b> (a desk lamp, a speedlight or a window), photograph the same subject in four of the one-light setups: <b>Rembrandt</b>, <b>loop</b>, <b>split</b> and <b>backlight</b>. Then edit the four images to match and export a <b>2 × 2 contact sheet</b> at <b>2160 × 2160 px</b> for your portfolio. This practises capturing images with appropriate settings and editing them in software, as the syllabus requires.</p>
<p>Before you start, try each setup in the <b>One-Light Studio</b> game in the Digital Media game arcade.</p>`,
    data: `<h4>Shot log to copy and complete</h4>
<table><thead><tr><th>Setup</th><th>Light angle from camera</th><th>Light height</th><th>Aperture</th><th>Shutter</th><th>ISO</th><th>White balance</th></tr></thead><tbody>
<tr><td>Rembrandt</td><td>about 45°</td><td>slightly above eye level</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Loop</td><td>about 30–45°</td><td>slightly above eye level</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Split</td><td>90°</td><td>eye level</td><td></td><td></td><td></td><td></td></tr>
<tr><td>Backlight</td><td>about 180° (behind)</td><td>head height, hidden</td><td></td><td></td><td></td><td></td></tr>
</tbody></table>
<p><b>Suggested starting settings:</b> phone in Pro or manual mode (or a camera on aperture priority): f/2.8 to f/4, 1/125 s or faster, ISO 100 to 400, white balance set to match the light (tungsten about 3200 K for a warm lamp, daylight about 5600 K for a window). Shoot RAW if available, otherwise the highest-quality JPEG.</p>`,
    tasks: [
      '<b>Consent and safety:</b> ask your subject for permission to photograph them and to use the images in your portfolio; get a signed release if the images will be shared online. Tape down any cable, keep the lamp away from curtains and water, and let hot bulbs cool before you touch them.',
      'Set up in a dim room with a plain, dark background. Seat your subject about 1 m in front of it, facing the camera. Turn off all other lights so only your one light falls on the face.',
      'Set the camera or phone: lock focus on the nearest eye, set ISO, shutter speed, aperture and white balance as in the data box, and turn on the grid. Keep the same camera position and framing (head and shoulders) for all four shots.',
      '<b>Rembrandt:</b> place the light about 45° to one side and slightly above eye level. Adjust until a small triangle of light appears on the shadowed cheek. Take at least three frames and record the settings in your shot log.',
      '<b>Loop:</b> move the light back towards the camera (about 30–45°) until the nose shadow becomes a small loop that does not touch the cheek shadow. Take three frames and log them.',
      '<b>Split:</b> move the light to 90° at eye level so the face divides down the centre of the nose. Take three frames and log them.',
      '<b>Backlight:</b> place the light behind the subject, hidden behind the head and facing the camera, to create a rim of light. Expose for the rim (or use a white card in front to bounce some light back onto the face). Take three frames and log them.',
      'Choose the best frame of each setup. In GIMP (or Photoshop/Photopea), crop each to a <b>1:1 square</b> with the eyes on the top third line, then match them: use <b>Levels</b> or <b>Curves</b> so the four images have similar overall brightness, and use the same black-and-white or colour treatment on all four.',
      'Create a new canvas of <b>2160 × 2160 px</b>. Scale each square image to <b>1080 × 1080 px</b> and place them in a 2 × 2 grid: Rembrandt top left, loop top right, split bottom left, backlight bottom right. Add a small label to each (setup name and light angle).',
      'Export the contact sheet as <b>JPEG, quality 85, sRGB</b>, named M3L7_Surname_ContactSheet.jpg, and save the layered working file (XCF or PSD). Add 60 to 80 words describing which setup suits your subject best and why.'
    ],
    skills: ['One-light portrait setups', 'Light position and angle', 'Manual camera settings', 'Matching tone across a series', 'Building a contact sheet', 'Consent and studio safety'],
    check: [
      { c: 'Consent obtained (release where needed) and a safe set-up described', m: 2 },
      { c: 'Rembrandt shot shows a clear triangle on the shadowed cheek', m: 3 },
      { c: 'Loop shot shows a small nose loop not joined to the cheek shadow', m: 2 },
      { c: 'Split shot divides the face down the centre', m: 2 },
      { c: 'Backlight shot shows a visible rim separating subject from background', m: 2 },
      { c: 'Same framing; four images cropped 1:1 and matched in tone', m: 3 },
      { c: 'Contact sheet exactly 2160 × 2160 px, 2 × 2, labelled, JPEG sRGB', m: 3 },
      { c: 'Shot log complete and 60–80 word evaluation', m: 2 }
    ],
    tip: `<b>Consent and safety first.</b> Your subject must agree to be photographed and to how the images will be used; stop if they are uncomfortable. Keep cables taped down and out of walkways, never place a lamp near water or fabric, and let hot bulbs cool before moving them. A window is the safest free light of all.`
  }
]);

/* Extended project: Digital Coffee Table Book (from the project brief) */
window.EDPM_LABS = (window.EDPM_LABS || []).concat([{
  id: 'M3-L8', sec: 'M3', app: 'design', level: 'Challenge', title: 'Extended project: Digital Coffee Table Book', time: 600,
  brief: `<p><b>Extended portfolio project · continuous assessment · group or individual.</b> Create a digital coffee table book celebrating Caribbean life and experiences using <b>only original photography, digital art and creative design</b>. Capture the themes that reflect the vibrancy, culture and natural beauty of the Caribbean and its people.</p><p>Plan it over several weeks: shoot, select, edit, lay out, then publish as a <b>PDF e-book</b> and an online <b>flipbook</b> (e.g. issuu or FlipHTML5 / flippdf). <i>Project brief by Kester Small</i></p>`,
  data: `<h4>The six sections</h4><table><thead><tr><th>Section</th><th>What to capture</th></tr></thead><tbody>
<tr><td><b>School Daze</b></td><td>Day-to-day student life: classroom moments, friendships, teachers and school events. It can combine your secondary and CAPE school life.</td></tr>
<tr><td><b>Sports &amp; Athletics</b></td><td>The excitement of Sports Day, training sessions, teamwork and competitive moments.</td></tr>
<tr><td><b>Caribbean Holidays &amp; Festivals</b></td><td>Carnival, Emancipation Day, Christmas, Holi, Independence Day, St. Maarten's Day and other cultural festivities.</td></tr>
<tr><td><b>Beach Days / Nature Escapes</b></td><td>Caribbean landscapes, beaches, waterfalls, forests and more.</td></tr>
<tr><td><b>Family Ties / Timeline Collage</b></td><td>Family bonds, sibling relationships, childhood memories and personal growth from baby to teenager.</td></tr>
<tr><td><b>Extracurriculars</b></td><td>Work, community projects, or achievements outside school.</td></tr></tbody></table>
<h4>Caption style</h4><p>Minimal text on photo pages: captions only, e.g. <i>Punta Cana, Dominican Republic (2021)</i>. Put a short description page at the start of each section.</p>
<h4>Copyright page (adapt this sample)</h4><p><b>COPYRIGHT © [YOUR NAME] [YEAR]</b><br><small>All rights reserved. No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the copyright holder, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.<br><br>For permissions requests or any inquiries related to this ebook, please contact:<br>[Your name]<br>[Your school e-mail]</small></p>`,
  tasks: [
    'Plan: list the six sections and brainstorm 8 to 12 shot ideas for each. Book any events (Sports Day, Independence Day, Carnival) in your calendar.',
    'Ask permission before photographing people, and get a parent\'s or the person\'s consent for any close-up portraits you will publish.',
    'Shoot: capture original photos for every section. Use the rule of thirds, good light (golden hour for nature), and a mix of wide, medium and close-up shots. Scan or photograph old family prints for the Timeline Collage.',
    'Create at least two pieces of original digital art (e.g. an illustrated section opener or a hand-lettered title) in Photoshop, Procreate, Krita or Canva\'s draw tools.',
    'Select the strongest 6 to 10 images per section. Edit them consistently: straighten, crop, correct exposure and colour, and keep one visual style throughout.',
    'Where an image is too small for a full-page spread, upscale it in Photoshop: Image › Image Size with Resample set to Preserve Details 2.0, or Filter › Neural Filters › Super Zoom, aiming for about 300 ppi at the printed page size.',
    'Lay out the book in Canva (templates allowed for layout only) or InDesign/Affinity: cover, copyright page, contents, a description page per section, then picture spreads with captions only.',
    'Keep margins, fonts (2 at most), colour palette and caption style consistent. Check every caption follows the "Place, Country (Year)" pattern.',
    'Export a high-quality PDF (Print PDF, with images at 300 ppi) and a smaller screen PDF.',
    'Upload the PDF to a flipbook site (e.g. issuu, FlipHTML5 or Heyzine), set it to Unlisted or Public as your teacher directs, and test the link on a phone.',
    'Submit the PDF e-book, the flipbook link and your folder of original source files as evidence that all content is your own.'
  ],
  skills: ['Original photography and composition', 'Consistent photo editing and upscaling', 'Editorial layout and visual hierarchy', 'Captioning in a professional style', 'Copyright and consent', 'Digital publishing (PDF and flipbook)'],
  check: [
    { c: 'All six sections included, each with a description page', m: 4 },
    { c: 'All photography and artwork is original (no stock or external images), with source files kept', m: 4 },
    { c: 'Strong, well-composed images that clearly convey each theme', m: 4 },
    { c: 'Consistent, high-quality editing and visual style throughout; images upscaled where needed', m: 3 },
    { c: 'Aesthetic, well-structured layout: margins, fonts, palette and hierarchy are consistent', m: 3 },
    { c: 'Minimal text: captions only on image pages, in the correct style', m: 2 },
    { c: 'Copyright page included and correctly adapted', m: 1 },
    { c: 'Submitted as both a PDF e-book and a working flipbook link', m: 3 }
  ],
  tip: 'Shoot far more than you need and edit hard: a coffee table book is only as strong as its weakest photo. Respect people\'s privacy, and never publish a close-up of someone who has not agreed. Use the Lighting Director and One-Light Studio games to plan portraits, and the layout lessons in Module 3 for your spreads.'
}]);

/* M3-L9: Hero Poster (typography, colour and image manipulation). Developed by Kester Small */
window.EDPM_LABS = (window.EDPM_LABS || []).concat([{
  id: 'M3-L9', sec: 'M3', app: 'design', level: 'Challenge', title: 'M3-L9 Hero Poster: typography, colour and image manipulation', time: 240,
  brief: `<p>Design a <b>2:3 typographic hero poster</b> (1080 × 1620 px for screen, or A3 at 300 ppi for print) for someone who inspires you: a Caribbean athlete, artist or community figure, a family member (with consent), or yourself as your future self. Use the motivational sports-quote poster style: a deep duotone gradient, a big two-typeface quote, a rim-lit portrait that fades to black, and the name set vertically in huge condensed capitals.</p><p>The second line of your quote must use <b>your own handwriting font</b>, made from the Calligraphr template. Plan, practise and draft everything in the <b>Hero Poster Studio</b>, then finish the poster in Photopea, GIMP, Photoshop or Canva.</p><p><button type="button" class="btn gold" data-go="edpmgames" data-k="heroposter">🦸 Open Hero Poster Studio</button></p>`,
  data: `<h4>The style, piece by piece</h4><table><thead><tr><th>Element</th><th>What to do</th></tr></thead><tbody>
<tr><td>Background</td><td>A linear or radial gradient between a hue and its shade (royal blue, violet, purple to maroon, or your own harmony).</td></tr>
<tr><td>Quote line 1</td><td>Bold condensed sans capitals in white, top left (or right-aligned).</td></tr>
<tr><td>Quote line 2</td><td>Smaller, in your Calligraphr handwriting font (or a typewriter face), in a pale tint.</td></tr>
<tr><td>Portrait</td><td>Chest-up cut-out in three-quarter view or profile, duotone graded, with a rim light, fading to black at the bottom.</td></tr>
<tr><td>Name</td><td>Two stacked lines set vertically in huge condensed capitals, in a tint or shade of the background hue, with a thin outline box below.</td></tr>
<tr><td>Finish</td><td>Subtle grain; a small credit line; nothing important outside the 5% safe area.</td></tr></tbody></table>
<h4>File specifications</h4><p><b>Screen:</b> 1080 × 1620 px, sRGB, PNG. <b>Print:</b> 300 ppi, CMYK or print PDF, 3 mm bleed. A3 is not exactly 2:3, so extend the background to fill A3, or print at 12 × 18 in (3600 × 5400 px).</p>
<h4>Exemplar</h4><p>The studio's exemplar hero, <b>Kaia Richardson</b>, is a Sint Maarten sprinter with an original quote and an illustrated portrait. Your poster must use a real, verified quote (or your own words for your future self) and a photo you have the right to use.</p>`,
  tasks: [
    'Open Hero Poster Studio. Read the Brief and study the annotated exemplar.',
    'Complete the Deconstruct tab: label all eight hotspots and score at least 6 out of 8 in the matching quiz.',
    'In the Colour lab, choose a base hue and harmony. Record the hex codes for your gradient stops, name tint and background shade, the mood (colour psychology and culture) and the WCAG contrast ratio of your quote (aim for 4.5:1).',
    'Print the Calligraphr template at 100%, fill it with a black felt-tip pen inside the boxes, and scan it at 300 to 600 dpi in greyscale (or photograph it flat in even daylight with all four markers visible).',
    'Upload the scan to calligraphr.com, build your font and download the TTF. Load it into the Poster builder to test it on quote line 2.',
    'Choose your hero and find a real quote in an original source. Verify the attribution and write the APA 7 reference. Never invent a quote for a real person.',
    'Photograph your hero (or use a licensed Creative Commons image) with a strong side or rim light. Get consent or a model release for anyone identifiable. Plan the light in Lighting Director.',
    'Draft the layout in the Poster builder and export a 1080 × 1620 PNG draft.',
    'Build the final poster in your software: select the subject (refine the edges of natural hair, locs and braids), add a gradient map or duotone, a rim light in Screen or Overlay mode, a layer-mask fade to black, the vertical name with tracking and leading, and a grain layer. Grade deep skin tones properly and never lighten skin.',
    'Export a PNG at 1080 × 1620 in sRGB, and a 300 ppi CMYK or print PDF with 3 mm bleed if printing. Keep your layered source file.',
    'Complete the checklist, self-assess against the 25-mark rubric, and print or download the rationale sheet from the Submit and mark tab.'
  ],
  skills: ['Design principles and hierarchy', 'Typeface pairing and vertical type', 'Making a handwriting font (Calligraphr)', 'Scanning at 300 to 600 dpi', 'Colour harmony, psychology and contrast', 'Duotone, rim light, masks and grain', 'Ethical image use and APA 7'],
  check: [
    { c: 'Concept and audience: a clear, original concept; hero, quote and mood suit a stated audience', m: 4 },
    { c: 'Composition and hierarchy: strong focal point, clear reading order, alignment and negative space in the 2:3 format', m: 5 },
    { c: 'Typography and the custom font: effective two-face pairing using your own Calligraphr font; readable vertical name with refined tracking and leading', m: 5 },
    { c: 'Colour theory and psychology: named harmony, tint and shade used deliberately; mood justified; quote contrast checked', m: 4 },
    { c: 'Image manipulation: clean cut-out, duotone grade, rim light, fade to black and grain; skin graded respectfully and hair left as it is', m: 4 },
    { c: 'Ethics, credits and APA: image rights and consent evidenced, quote verified, correct APA 7 references, no implied endorsement', m: 3 }
  ],
  tip: 'Light it for real: a genuine rim light behind your subject always beats one painted on afterwards. Expose for the skin, not the background, and let the duotone do the colour work. Keep to two typefaces, check your quote is real, and credit every image you did not take yourself.'
}]);
