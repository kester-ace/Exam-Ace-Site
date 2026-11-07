/* CAPE Digital Media Unit 2 (DME2): Practical Labs. Developed by Kester Small.
   Based on the CAPE Digital Media syllabus.
   All businesses, people and figures in these labs are for practice only. */
window.EDPM_LABS = (window.EDPM_LABS || []).concat([

/* ===================== MODULE 1: VISUAL AND INTERACTIVE DESIGN ===================== */
{
  id: 'M1-L1', sec: 'M1', app: 'plan', level: 'Starter',
  title: `Plan Before You Shoot: Storyboard and Gantt Chart for a 30-second Promo`,
  time: 75,
  brief: `<p><b>Island Pulse Media</b> (a regional agency) has a new client: <b>Mango Moon Café</b> on the Placencia Lagoon in Belize. The café wants a <b>30-second promo</b> for Instagram Reels and its website. Zara, the creative director, will not let Malik pick up a camera until the pre-production pack is approved.</p>
<p>This lab covers <b>Pre-Production Principles</b>: problem definition, target audience, brainstorming, rough sketches, storyboards, timelines and production schedules, and prototype and idea validation. You also plan equipment, budget and legal, ethical and safety issues, so your pack includes a short equipment and permissions list.</p>`,
  data: `<h4>Client brief (from Keisha's meeting notes)</h4>
<table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody>
<tr><td>Client</td><td>Mango Moon Café, Placencia, Belize</td></tr>
<tr><td>Problem</td><td>Tourists find the café, but local residents think it is "only for tourists"</td></tr>
<tr><td>Goal</td><td>Bring in local customers aged 18 to 35 for the new Friday "Lagoon Nights" menu</td></tr>
<tr><td>Must show</td><td>Lagoon sunset, soursop mocktail, johnny cakes, local band, the logo</td></tr>
<tr><td>Call to action</td><td>"Fridays from 6 pm. Bring your crew."</td></tr>
<tr><td>Length and format</td><td>30 seconds, 9:16 vertical, 1080 × 1920 px, with captions</td></tr>
<tr><td>Deadline</td><td>Final video delivered in 15 working days from today</td></tr>
</tbody></table>
<h4>Production tasks for the Gantt chart (estimate in working days)</h4>
<table><thead><tr><th>Task</th><th>Days</th><th>Depends on</th><th>Owner</th></tr></thead><tbody>
<tr><td>Brainstorm and mind map</td><td>1</td><td>None</td><td>Zara</td></tr>
<tr><td>Script and storyboard</td><td>2</td><td>Brainstorm</td><td>Zara, Malik</td></tr>
<tr><td>Client approval (validation)</td><td>1</td><td>Storyboard</td><td>Keisha</td></tr>
<tr><td>Location recce and permissions</td><td>1</td><td>Client approval</td><td>Malik</td></tr>
<tr><td>Filming day (sunset)</td><td>1</td><td>Recce</td><td>Malik</td></tr>
<tr><td>Rough cut edit</td><td>3</td><td>Filming</td><td>Malik</td></tr>
<tr><td>Client feedback</td><td>1</td><td>Rough cut</td><td>Keisha</td></tr>
<tr><td>Final edit, captions and grade</td><td>2</td><td>Feedback</td><td>Malik</td></tr>
<tr><td>Export and delivery</td><td>1</td><td>Final edit</td><td>Malik</td></tr>
</tbody></table>
<p><b>Shot types to use in the storyboard:</b> ELS (extreme long shot), LS, MS, CU, ECU, high angle, low angle, POV, pan, tilt, tracking.</p>`,
  tasks: [
    `Write a <b>problem statement</b> of no more than 40 words that names the problem, the target audience and the goal from the brief.`,
    `On plain paper, draw a quick <b>mind map</b> with "Lagoon Nights" in the centre and at least 12 connected ideas (sounds, places, food, people, moods). Circle the three ideas you will use.`,
    `Write a two-line <b>audience profile</b>: age, location, habits (for example, "Uses Instagram and WhatsApp daily, eats out on Fridays with friends in Placencia Village and Seine Bight").`,
    `Using the storyboard template (or six to eight boxes drawn in 16:9 or 9:16), sketch <b>8 frames</b> that add up to exactly 30 seconds. Use black marker for outlines and pencil for shading.`,
    `Under each frame write: frame number, duration in seconds, shot type, camera movement, on-screen text and audio (music, voice-over or sound effect).`,
    `Make sure the logo and the call to action appear in the final 5 seconds, and the soursop mocktail appears as a close-up (CU or ECU).`,
    `Build a <b>Gantt chart</b> in Google Sheets or Excel from the task table. Put days 1 to 15 across the top and shade each task bar. Mark two <b>milestones</b> with a diamond: "Storyboard approved" and "Final delivery".`,
    `Check your chart: the dependencies must be respected (no task starts before the one it depends on ends) and the whole project must fit in 15 days. Add one buffer day if you can.`,
    `Add an <b>equipment and permissions</b> list: at least five items of kit (for example, tripod, smartphone gimbal, lapel mic, reflector) and two permissions (café owner's location release, band members' talent release).`,
    `Describe in two sentences how you will <b>validate</b> the idea before filming (for example, show the storyboard to five students aged 18 to 20 and ask which frame they remember).`,
    `Scan or photograph the storyboard pages flat and in good light. Combine everything into one PDF named <b>CandidateNo_M1L1_PreProduction.pdf</b> (for example 1234567890_M1L1_PreProduction.pdf). Export the Gantt chart separately as <b>CandidateNo_M1L1_Gantt.png</b>.`
  ],
  skills: ['Problem definition', 'Mind mapping', 'Storyboarding', 'Gantt charts and milestones', 'Idea validation', 'Scanning and PDF export'],
  check: [
    { c: 'Problem statement names the problem, audience and goal in 40 words or fewer', m: 2 },
    { c: 'Mind map with 12 or more ideas and three selected ideas', m: 1 },
    { c: 'Eight storyboard frames totalling 30 seconds, each labelled with shot, movement, text and audio', m: 5 },
    { c: 'Gantt chart shows all nine tasks, correct dependencies, two milestones and fits 15 days', m: 4 },
    { c: 'Equipment, permissions and validation method are realistic', m: 2 },
    { c: 'Clean scan, single PDF and PNG with correct candidate-number file names', m: 1 }
  ],
  tip: `In Paper 02, storyboard marks are lost when frames have pictures but no labels. A stick figure with "CU, 3 s, slow pan left, soca beat starts" earns more than a beautiful drawing with no technical notes.`
},
{
  id: 'M1-L2', sec: 'M1', app: 'design', level: 'Core',
  title: `Hero or Villain? Colour Harmony Palettes and Character Design`,
  time: 90,
  brief: `<p>Malik is developing a short animated series for <b>Tide Keepers</b> mobile game, set on a Caribbean island after a hurricane. He needs two characters: <b>Coral</b>, the hero who protects the reefs, and <b>Captain Smog</b>, the villain who dumps waste in the sea. The audience must know who is good and who is bad <b>from colour alone</b>, before anyone speaks.</p>
<p>This lab covers <b>Design Principles</b>: elements of visual design, colour theories, harmony rules, tints, shades and tones, gradients, colour mixing and new colour creation, and the visual impact of colour combinations. The task is a classic one: design a character for a game, book, comic or animation using colour theory to show hero or villain.</p>`,
  data: `<h4>Starter colours (hex codes)</h4>
<table><thead><tr><th>Name</th><th>Hex</th><th>Mood often linked to it</th></tr></thead><tbody>
<tr><td>Reef Teal</td><td>#0FA3B1</td><td>Calm, trust, the sea</td></tr>
<tr><td>Sunrise Gold</td><td>#F7B32B</td><td>Hope, warmth, energy</td></tr>
<tr><td>Hibiscus Red</td><td>#D7263D</td><td>Passion, danger, urgency</td></tr>
<tr><td>Sludge Olive</td><td>#5B5F2A</td><td>Decay, sickness, pollution</td></tr>
<tr><td>Bruise Purple</td><td>#4B2142</td><td>Mystery, power, menace</td></tr>
<tr><td>Smoke Grey</td><td>#3A3A3A</td><td>Gloom, industry, threat</td></tr>
</tbody></table>
<h4>Harmony rules (on a 12-part colour wheel)</h4>
<ul>
<li><b>Complementary:</b> two colours opposite each other (for example blue and orange)</li>
<li><b>Analogous:</b> three neighbours (for example blue, blue-green, green)</li>
<li><b>Triadic:</b> three colours evenly spaced, 120° apart</li>
<li><b>Split-complementary:</b> one colour plus the two neighbours of its complement</li>
<li><b>Tetradic:</b> two complementary pairs (a rectangle on the wheel)</li>
</ul>
<p><b>Tint</b> = colour + white. <b>Shade</b> = colour + black. <b>Tone</b> = colour + grey.</p>`,
  tasks: [
    `Open <b>Inkscape</b> (or Illustrator) and create an A4 landscape document. Divide it into three areas: Palettes (left), Hero (centre), Villain (right).`,
    `Draw a simple <b>12-part colour wheel</b> using circles or segments. Label primary, secondary and tertiary colours. In Inkscape use Fill and Stroke (Ctrl+Shift+F) and type the hex code in the RGBA box (add "ff" for full opacity).`,
    `Build the <b>hero palette</b> using an <b>analogous</b> or <b>triadic</b> rule starting from Reef Teal #0FA3B1. Show five swatches labelled with hex codes.`,
    `Build the <b>villain palette</b> using a <b>split-complementary</b> or <b>complementary</b> rule starting from Sludge Olive #5B5F2A or Bruise Purple #4B2142. Show five swatches labelled with hex codes.`,
    `Under each palette, make a strip showing one <b>tint</b>, one <b>shade</b> and one <b>tone</b> of the main colour. Label which is which.`,
    `<b>Create a new colour</b> by mixing two of your swatches (in Inkscape, place two shapes, set the top one to 50% opacity and use the colour picker on the overlap). Name it and record its hex code.`,
    `Draw <b>Coral</b> using rounded shapes, open posture and the hero palette. Add one linear <b>gradient</b> (for example on her cape or hair).`,
    `Draw <b>Captain Smog</b> using sharp, angular shapes, a hunched or looming pose and the villain palette. Use one radial gradient (for example a glowing eye).`,
    `Use at least four <b>elements of design</b> on purpose (line, shape, form, space, texture, value, colour). Label four of them with small callout arrows.`,
    `Write a 60 to 80 word <b>design rationale</b> in a text box: which harmony rule you used for each character and why those colours make the audience feel trust or fear.`,
    `Save the master as <b>CandidateNo_M1L2_Characters.svg</b>. Export the page as <b>CandidateNo_M1L2_Characters.png</b> (Export dialog: Page, 150 dpi) and as <b>CandidateNo_M1L2_Characters.pdf</b> (Save a Copy, PDF).`
  ],
  skills: ['Colour wheel', 'Harmony rules', 'Tints, shades and tones', 'Gradients and colour mixing', 'Vector character design', 'Design rationale'],
  check: [
    { c: 'Colour wheel with correctly placed and labelled primary, secondary and tertiary colours', m: 2 },
    { c: 'Hero and villain palettes follow a named harmony rule, five labelled hex swatches each', m: 4 },
    { c: 'Correct tint, shade and tone strip, plus one new mixed colour with hex code', m: 2 },
    { c: 'Characters use shape and colour so hero and villain are obvious; two gradients used', m: 3 },
    { c: 'Four design elements labelled correctly', m: 2 },
    { c: 'Rationale links colour choices to audience emotion; SVG, PNG and PDF correctly named', m: 2 }
  ],
  tip: `Examiners reward a reason, not just a colour. "Captain Smog is olive and purple" earns little. "Captain Smog uses a split-complementary scheme of olive and purple; the low-value, muddy colours suggest pollution and menace" earns full marks.`
},
{
  id: 'M1-L3', sec: 'M1', app: 'image', level: 'Core',
  title: `Rule of Thirds Event Poster: Composition and Point of Interest`,
  time: 75,
  brief: `<p><b>Seawall Kite Festival</b> is held on Easter Monday in Georgetown, Guyana. Zara wants a poster that works on a lamppost on Regent Street and on Instagram. Your poster must lead the eye straight to one strong point of interest.</p>
<p>This lab covers <b>Rules of Composition</b>: the rule of thirds, the golden section and golden rectangle, the point of interest and prominence of the subject, perspective, angles, lighting, repetition, proximity, white space, balance and contrast. It also practises the Paper 02 skill of <b>photographing or scanning</b> your own artwork. You can use the same rules to design a 2D environment for a storyboard frame.</p>`,
  data: `<h4>Poster copy (use exactly)</h4>
<ul>
<li>Headline: <b>FLY FREE</b></li>
<li>Sub-heading: Seawall Kite Festival</li>
<li>Details: Monday 6 April, 2 pm to sunset, Kitty Seawall, Georgetown</li>
<li>Small print: Free entry. Bring your own kite or make one at the craft tent.</li>
</ul>
<h4>Specification</h4>
<table><thead><tr><th>Setting</th><th>Value</th></tr></thead><tbody>
<tr><td>Canvas</td><td>A3 portrait at 150 ppi = 1754 × 2480 px (print proof)</td></tr>
<tr><td>Colour mode</td><td>RGB, 8-bit</td></tr>
<tr><td>Fonts</td><td>Maximum two (one display, one body)</td></tr>
<tr><td>Image</td><td>Your own photo (kite, sky, beach) or a drawing you scan</td></tr>
</tbody></table>
<p><b>Golden ratio:</b> about 1 : 1.618. On a canvas 1754 px wide, the golden section line sits about 1084 px from one edge (1754 ÷ 1.618).</p>`,
  tasks: [
    `Photograph a kite, a bright object against the sky, or draw a kite on paper and photograph or scan it flat. Hold the camera level, fill the frame and avoid shadows on the paper.`,
    `In <b>GIMP</b>, create a new image 1754 × 2480 px. Open the image settings and set the resolution to 150 ppi.`,
    `Add guides for the <b>rule of thirds</b>: Image &gt; Guides &gt; New Guide (by Percent) at 33.3% and 66.6%, both horizontal and vertical. Turn on View &gt; Snap to Guides.`,
    `Open your photo as a layer (File &gt; Open as Layers). Scale and move it so the main subject (the kite) sits on one of the four <b>power points</b> where guides cross.`,
    `Add one more vertical guide at the <b>golden section</b> (about 1084 px). Place the headline so its left edge or centre lines up with this guide. Write one sentence on the poster's back page notes explaining why.`,
    `Type the headline "FLY FREE" with the Text tool at 200 px or larger. Use <b>contrast</b> (light text on dark sky or the reverse) so it can be read from across the street.`,
    `Group the date, time and place together (<b>proximity</b>) in the lower third. Keep at least 80 px of <b>white space</b> around the text block.`,
    `Use <b>repetition</b> once (for example, three small kites in the background or repeated triangle shapes) to create rhythm and lead the eye to the main kite.`,
    `Adjust the photo with Colors &gt; Curves or Levels so the subject is the brightest or most saturated area. Darken edges slightly if needed to keep attention on the point of interest.`,
    `Hide the guides and take a screenshot with guides showing as evidence. Save the working file as <b>CandidateNo_M1L3_Poster.xcf</b>.`,
    `Export a print proof <b>CandidateNo_M1L3_Poster.pdf</b> (File &gt; Export As, choose .pdf) and a web version <b>CandidateNo_M1L3_Poster.jpg</b> at quality 80. Write the file sizes of both on your evidence sheet.`
  ],
  skills: ['Rule of thirds', 'Golden section', 'Point of interest', 'Contrast, proximity, repetition and white space', 'Photographing and scanning artwork', 'Print and web export'],
  check: [
    { c: 'Canvas size and resolution correct; own photographed or scanned image used', m: 2 },
    { c: 'Subject sits on a rule-of-thirds power point (shown in the guides screenshot)', m: 3 },
    { c: 'Headline aligned to the golden section with a written reason', m: 2 },
    { c: 'Clear point of interest: subject is brightest or most saturated element', m: 2 },
    { c: 'Contrast, proximity, repetition and white space all used correctly', m: 4 },
    { c: 'XCF, PDF and JPEG exported with correct names and file sizes recorded', m: 2 }
  ],
  tip: `Do not centre everything. A centred kite in a centred poster with centred text looks safe but static. Moving the subject to a third line gives the eye somewhere to travel, which is exactly what "visual flow" means.`
},
{
  id: 'M1-L4', sec: 'M1', app: 'image', level: 'Challenge',
  title: `Mock Paper 02: The Format Conversion Pack`,
  time: 90,
  brief: `<p><b>Wadadli Heritage Society</b> in Antigua has handed Island Pulse Media a USB drive of old and new media for its website, its printed brochure and its WhatsApp channel. Every file is in the wrong format or the wrong size. Your job is to convert each one for its purpose and justify every choice, as you would in a Paper 02 format conversion question.</p>
<p>This lab covers <b>Digital Media Platforms and Formats</b>: selecting appropriate formats, distinguishing between them, how they work and how they differ (MP4, MP3, PDF, PNG, JPEG, GIF), importing, exporting, sharing and embedding, and cross-platform compatibility. You also export and publish in suitable formats so products work across devices and platforms.</p>`,
  data: `<h4>The supplied assets (your teacher will place these in a folder called M1L4_Assets)</h4>
<table><thead><tr><th>File</th><th>What it is</th><th>Problem</th></tr></thead><tbody>
<tr><td>courthouse_scan.tif</td><td>Scan of an old photo of the Old Court House in St. John's, 600 dpi, about 40 MB</td><td>Too large for web</td></tr>
<tr><td>foundation_logo.png</td><td>Logo on a white box, 2000 × 2000 px</td><td>Needs a transparent background</td></tr>
<tr><td>flag_wave_frames/ (6 PNGs)</td><td>Six frames of a waving Antigua and Barbuda flag drawing</td><td>Needs to become one animation</td></tr>
<tr><td>elder_interview.wav</td><td>3-minute interview, 48 kHz stereo, about 33 MB</td><td>Too large to share</td></tr>
<tr><td>beach_clip.mov</td><td>20-second phone clip, 4K, about 150 MB</td><td>Will not play on some PCs and is too large</td></tr>
<tr><td>brochure_text.docx</td><td>Two-page brochure</td><td>Must look identical on every device and printer</td></tr>
</tbody></table>
<h4>Target outputs</h4>
<table><thead><tr><th>Output</th><th>Target</th></tr></thead><tbody>
<tr><td>Web photo</td><td>JPEG, 1600 px longest side, under 400 KB</td></tr>
<tr><td>Web logo</td><td>PNG, 512 × 512 px, transparent background</td></tr>
<tr><td>Animated flag</td><td>GIF, 400 px wide, looping, 150 ms per frame</td></tr>
<tr><td>Interview for WhatsApp</td><td>MP3, 128 kbps, mono</td></tr>
<tr><td>Beach clip for website</td><td>MP4 (H.264), 1280 × 720, under 15 MB</td></tr>
<tr><td>Brochure</td><td>PDF</td></tr>
</tbody></table>
<p><i>If the assets are not available, photograph your own building, draw a six-frame flag, record a 1-minute voice clip and film a 20-second clip on a phone.</i></p>`,
  tasks: [
    `Create a folder named <b>CandidateNo_M1L4</b>. Inside it make two sub-folders: <b>originals</b> (copy the assets here, never edit them) and <b>converted</b>.`,
    `<b>Photo:</b> open courthouse_scan.tif in GIMP. Use Image &gt; Scale Image to 1600 px on the longest side. Straighten if needed (Tools &gt; Transform &gt; Rotate). Export As .jpg at quality 75 to 85 until it is under 400 KB. Name it <b>CandidateNo_M1L4_Courthouse.jpg</b>.`,
    `<b>Logo:</b> open foundation_logo.png. Add an alpha channel (Layer &gt; Transparency &gt; Add Alpha Channel), select the white with Select by Color and delete it. Scale to 512 × 512 px and export as <b>CandidateNo_M1L4_Logo.png</b>.`,
    `<b>Animation:</b> use File &gt; Open as Layers to load all six flag frames. Scale to 400 px wide. Rename each layer with "(150ms)" at the end. Export As .gif, tick "As animation" and "Loop forever". Name it <b>CandidateNo_M1L4_Flag.gif</b>.`,
    `<b>Audio:</b> open elder_interview.wav in Audacity. Convert to mono (Tracks &gt; Mix &gt; Mix Stereo Down to Mono). Export as MP3 at 128 kbps constant bit rate. Name it <b>CandidateNo_M1L4_Interview.mp3</b>.`,
    `<b>Video:</b> import beach_clip.mov into OpenShot (or HandBrake). Export as MP4 (H.264 video, AAC audio) at 1280 × 720, 30 fps. Name it <b>CandidateNo_M1L4_Beach.mp4</b>. If it is over 15 MB, lower the quality setting and export again.`,
    `<b>Document:</b> open brochure_text.docx in Word or LibreOffice and export as PDF. Name it <b>CandidateNo_M1L4_Brochure.pdf</b>.`,
    `Open each converted file on a second device (a phone or another PC) to test <b>cross-platform compatibility</b>. Note any problem.`,
    `Build a <b>conversion log</b> table in a document: original file, original size, new format, new size, percentage saved, lossy or lossless, and a one-sentence reason for the format.`,
    `Answer in two or three sentences each: (a) why is PNG used for the logo but JPEG for the photo? (b) why is GIF not used for the beach clip?`,
    `Save the log as <b>CandidateNo_M1L4_Log.pdf</b> in the converted folder. Compress the whole CandidateNo_M1L4 folder into a ZIP file for submission.`
  ],
  skills: ['Lossy and lossless compression', 'Resolution and resampling', 'Transparency and alpha channels', 'Animated GIF', 'Audio and video transcoding', 'Cross-platform testing'],
  check: [
    { c: 'JPEG photo meets size and dimension targets', m: 2 },
    { c: 'Logo PNG is 512 × 512 with a clean transparent background', m: 2 },
    { c: 'GIF loops with correct frame timing and width', m: 2 },
    { c: 'MP3 and MP4 meet the bit rate, resolution and size targets', m: 3 },
    { c: 'PDF exported; all files named correctly and originals kept unchanged', m: 1 },
    { c: 'Conversion log complete with sizes, savings and lossy or lossless correctly identified', m: 3 },
    { c: 'Both written answers correctly justify the format choices', m: 2 }
  ],
  tip: `"Lossy" and "lossless" are favourite Paper 01 traps. JPEG, MP3 and MP4 (H.264) are lossy: they throw away data you cannot get back. PNG and WAV are lossless. Always keep the original and convert a copy.`
},
{
  id: 'M1-L5', sec: 'M1', app: 'video', level: 'Core',
  title: `Paper 02 Practice: 30-second Promo Edit in OpenShot or WeVideo`,
  time: 90,
  brief: `<p>Using the storyboard from Lab M1-L1, Malik has filmed raw clips for <b>Mango Moon Café</b>. Now you will edit them into a <b>30-second promo</b>, exactly the length of the audio-visual ad required in the Unit 2 SBA product.</p>
<p>This lab covers <b>Audio and Video Principles</b>: capturing video, recording sound for video, editing, transitions and basic effects, lighting, cloud-based authoring tools such as WeVideo, and exporting MP4. It also practises trimming clips, adding text, combining media elements, colour grading and platform export settings.</p>`,
  data: `<h4>Raw clips (in M1L5_Assets, or film your own 3 to 6 second clips on a phone held horizontally on a tripod)</h4>
<table><thead><tr><th>Clip</th><th>Content</th><th>Length</th></tr></thead><tbody>
<tr><td>01_lagoon_sunset.mp4</td><td>ELS of the Placencia Lagoon at sunset</td><td>12 s</td></tr>
<tr><td>02_sign.mp4</td><td>MS of café sign lighting up</td><td>8 s</td></tr>
<tr><td>03_pour.mp4</td><td>CU of soursop mocktail being poured</td><td>10 s</td></tr>
<tr><td>04_johnnycakes.mp4</td><td>ECU of johnny cakes on a plate</td><td>7 s</td></tr>
<tr><td>05_band.mp4</td><td>LS of local band playing (has live sound)</td><td>15 s</td></tr>
<tr><td>06_friends.mp4</td><td>MS of friends laughing at a table</td><td>10 s</td></tr>
<tr><td>07_toast.mp4</td><td>CU of glasses clinking</td><td>6 s</td></tr>
<tr><td>music_bed.mp3</td><td>Royalty-free soca instrumental, 45 s</td><td></td></tr>
<tr><td>logo.png</td><td>Café logo, transparent</td><td></td></tr>
</tbody></table>
<h4>On-screen text</h4>
<ul><li>0 to 4 s: "Friday nights just got local."</li><li>14 to 18 s: "Lagoon Nights at Mango Moon"</li><li>25 to 30 s: logo + "Fridays from 6 pm. Bring your crew."</li></ul>`,
  tasks: [
    `Create a new project. In OpenShot open Choose Profile &gt; HD 720p 30 fps (or 1080p 30 fps). In WeVideo choose 16:9. Save it as <b>CandidateNo_M1L5_Promo</b>.`,
    `Import all clips, the music and the logo into the Project Files panel.`,
    `Place clips on Track 1 in storyboard order. Trim each clip (drag the edges or use the razor tool) so the total video is <b>exactly 30 seconds</b>.`,
    `Cut on action at least once: for example, end the pour clip mid-pour and continue on the toast.`,
    `Add <b>no more than three</b> transitions (for example one fade from black at the start, one wipe, one fade to black at the end). Use straight cuts elsewhere.`,
    `Place the music on its own track. Fade it in over 1 second and out over 2 seconds. Lower its volume to about 40% under the band clip so the live sound can be heard for 3 seconds.`,
    `Add the three text overlays using Title &gt; New Title (OpenShot) or the Text tool (WeVideo). Use one sans-serif font, a drop shadow or semi-transparent bar so text is readable, and keep text inside the title-safe area.`,
    `Place logo.png on the top track for the final 5 seconds and fade it in.`,
    `Apply one simple <b>colour correction</b> (Brightness and Contrast, or Saturation effect) to make the sunset clip warmer and keep the look consistent across clips.`,
    `Add captions for any spoken words (there are none in the raw clips, so caption the music cue as "[upbeat soca music]" for accessibility).`,
    `Export: OpenShot File &gt; Export Project &gt; Export Video, Profile "Web", Target "YouTube HD" or MP4 (h.264), quality High. Name it <b>CandidateNo_M1L5_Promo.mp4</b>. Then export a 9:16 version for Reels if your software allows, named <b>CandidateNo_M1L5_Promo_Vertical.mp4</b>.`,
    `Write a 50-word editing note explaining one cut, one transition and your colour decision.`
  ],
  skills: ['Trimming and sequencing', 'Cutting on action', 'Transitions and titles', 'Audio levels in video', 'Colour correction', 'MP4 export for platforms'],
  check: [
    { c: 'Final video is exactly 30 seconds and follows the storyboard order', m: 3 },
    { c: 'Clean trims, at least one cut on action, no more than three transitions', m: 3 },
    { c: 'Music faded and balanced; live band sound audible', m: 2 },
    { c: 'Three text overlays at correct times, readable and title-safe; logo in final 5 s', m: 3 },
    { c: 'Consistent colour correction and accessibility caption', m: 2 },
    { c: 'MP4 exported with correct settings and name; editing note complete', m: 2 }
  ],
  tip: `Count the seconds. In the SBA, the short audio-visual ad must be 30 seconds. A 34-second ad is not "close enough"; trim it. Check the exact duration in the export window before you click Export.`
},
{
  id: 'M1-L6', sec: 'M1', app: 'anim', level: 'Core',
  title: `The 2D Bouncing Ball: Keyframes, Timing, Spacing and Squash`,
  time: 75,
  brief: `<p>Before Malik animates characters for <b>Tide Keepers</b> game, every new intern at Island Pulse Media must pass the classic test: a ball that bounces and feels real. Your ball is a coconut-sized beach ball dropping onto the sand at Montego Bay Beach.</p>
<p>This lab covers <b>2D Principles</b>: the bouncing ball exercise with keyframing, timing, spacing, squash and stretch, and interpolation or tweening. It also uses the 12 principles of animation, including anticipation, staging and straight-ahead versus pose-to-pose.</p>`,
  data: `<h4>Settings</h4>
<table><thead><tr><th>Setting</th><th>Value</th></tr></thead><tbody>
<tr><td>Canvas</td><td>1280 × 720 px</td></tr>
<tr><td>Frame rate</td><td>12 fps (Pencil2D, drawing on "twos") or 24 fps (Adobe Animate)</td></tr>
<tr><td>Length</td><td>3 bounces, about 3 seconds (36 frames at 12 fps)</td></tr>
<tr><td>Ball diameter</td><td>120 px</td></tr>
</tbody></table>
<h4>Key poses for bounce 1 (at 12 fps)</h4>
<table><thead><tr><th>Frame</th><th>Pose</th><th>Ball height (px above ground)</th><th>Shape</th></tr></thead><tbody>
<tr><td>1</td><td>Top (drop start)</td><td>500</td><td>Round</td></tr>
<tr><td>6</td><td>Just before contact</td><td>60</td><td>Stretched (taller, thinner)</td></tr>
<tr><td>7</td><td>Contact</td><td>0</td><td>Squashed (wider, flatter)</td></tr>
<tr><td>8</td><td>Leaving ground</td><td>60</td><td>Stretched</td></tr>
<tr><td>13</td><td>Second peak</td><td>330</td><td>Round</td></tr>
</tbody></table>
<p><b>Spacing rule:</b> drawings are close together at the top (slow) and far apart near the ground (fast). Each bounce peak is about two-thirds the height of the one before. Keep the ball's <b>volume</b> the same when squashing.</p>`,
  tasks: [
    `Open <b>Pencil2D</b> (free) or Adobe Animate. Set the canvas to 1280 × 720 px and the frame rate from the data table.`,
    `On a background layer, draw a horizon, sand line and a simple sun. Lock the layer. Add a new layer named "Ball".`,
    `<b>Pose-to-pose:</b> draw the key poses first (frames 1, 7 and 13 for bounce 1), using the heights in the table. Turn on <b>onion skin</b> to see previous and next frames.`,
    `Draw the <b>breakdowns and in-betweens</b>. Use slow-in and slow-out spacing: drawings close together near the peak, wide apart near the ground.`,
    `Apply <b>stretch</b> on the frames just before and after contact and <b>squash</b> on the contact frame. Keep the volume the same: if the ball gets 30% wider, it gets about 30% shorter.`,
    `Animate two more bounces, each peak about two-thirds the height of the one before, then let the ball roll to a stop.`,
    `Move the ball slightly to the right on every frame so it travels across the screen in an <b>arc</b> (another of the 12 principles).`,
    `(Adobe Animate option) Instead of drawing every frame, make the ball a symbol, set keyframes at the poses, add a <b>Classic Tween</b> between them and use Ease In and Ease Out. Then add squash and stretch with the Free Transform tool on the contact keyframes.`,
    `Add a soft shadow on the sand that grows smaller and lighter as the ball rises.`,
    `Play back with looping on. Fix any frame where the ball "pops" or slows down at the wrong place.`,
    `Save the project as <b>CandidateNo_M1L6_Ball.pclx</b> (or .fla). Export as <b>CandidateNo_M1L6_Ball.mp4</b> and a looping <b>CandidateNo_M1L6_Ball.gif</b> (File &gt; Export &gt; Movie in Pencil2D).`,
    `Write three sentences: one explaining timing, one explaining spacing and one explaining the difference between straight-ahead and pose-to-pose animation.`
  ],
  skills: ['Keyframes and in-betweens', 'Timing and spacing', 'Squash and stretch', 'Arcs and slow in and out', 'Tweening', 'MP4 and GIF animation export'],
  check: [
    { c: 'Correct canvas, frame rate and length; three bounces with decreasing height', m: 3 },
    { c: 'Spacing shows slow-in at peaks and fast movement near the ground', m: 3 },
    { c: 'Squash on contact and stretch either side, with volume kept constant', m: 3 },
    { c: 'Ball travels in arcs; shadow reacts to height', m: 2 },
    { c: 'MP4 and GIF exported with correct names', m: 2 },
    { c: 'Accurate written explanations of timing, spacing and pose-to-pose', m: 2 }
  ],
  tip: `Timing is <b>how many frames</b> an action takes; spacing is <b>how far apart</b> the drawings are. Students often swap these in Paper 01. A heavy bowling ball and a light beach ball can have the same timing but very different spacing and squash.`
},
{
  id: 'M1-L7', sec: 'M1', app: 'anim', level: 'Challenge',
  title: `Blender: Low-poly Textured Beach Ball with a 3D Bounce`,
  time: 90,
  brief: `<p>Malik is pitching a 3D version of <b>Tide Keepers</b> game. To show the client that the team can model, texture and animate, he wants a short render: a <b>low-poly beach ball</b> with a striped texture, bouncing on a sand plane with a palm-tree prop in the background.</p>
<p>This lab covers <b>3D Modelling</b>: basic polygon shapes, vertices, edges and faces, the 3D bouncing ball exercise (keyframing, timing, spacing, squash and stretch) and interpolation. You will also create a basic 3D shape using basic polygons, apply a simple texture to its surface and use the Graph Editor.</p>`,
  data: `<h4>Settings</h4>
<table><thead><tr><th>Setting</th><th>Value</th></tr></thead><tbody>
<tr><td>Software</td><td>Blender 3.6 or 4.x (free)</td></tr>
<tr><td>Frame rate and range</td><td>24 fps, frames 1 to 72 (3 seconds)</td></tr>
<tr><td>Resolution</td><td>1280 × 720, 100%</td></tr>
<tr><td>Ball</td><td>UV Sphere, 12 segments, 6 rings (low-poly), radius 1 m</td></tr>
<tr><td>Render engine</td><td>Eevee (fast)</td></tr>
</tbody></table>
<h4>Bounce keyframes (Location Z and Scale)</h4>
<table><thead><tr><th>Frame</th><th>Location Z</th><th>Scale X, Y</th><th>Scale Z</th></tr></thead><tbody>
<tr><td>1</td><td>6</td><td>1.0</td><td>1.0</td></tr>
<tr><td>12</td><td>0</td><td>1.25</td><td>0.75 (squash)</td></tr>
<tr><td>11 and 13</td><td>0.4</td><td>0.9</td><td>1.15 (stretch)</td></tr>
<tr><td>24</td><td>4</td><td>1.0</td><td>1.0</td></tr>
<tr><td>36</td><td>0</td><td>1.2</td><td>0.8</td></tr>
<tr><td>46</td><td>2.5</td><td>1.0</td><td>1.0</td></tr>
<tr><td>56</td><td>0</td><td>1.1</td><td>0.9</td></tr>
</tbody></table>
<p><b>Colours for the texture:</b> #D7263D (red), #F7B32B (gold), #0FA3B1 (teal), #FFFFFF (white).</p>`,
  tasks: [
    `Open Blender, delete the default cube (select, X, Delete). Set Output Properties to 1280 × 720 and 24 fps. Set the timeline end frame to 72.`,
    `Add &gt; Mesh &gt; UV Sphere. In the Adjust Last Operation panel set Segments 12, Rings 6, Radius 1. Right-click &gt; <b>Shade Flat</b> to show the low-poly faces.`,
    `Press Tab for Edit Mode. Switch between vertex, edge and face select (1, 2, 3). Record the counts of vertices, edges and faces shown in the status bar (turn on Scene Statistics in the status bar or Overlays if hidden).`,
    `Move the ball's origin to its base so it squashes against the ground: in Edit Mode select all and move the mesh up by 1 m (G, Z, 1), then Tab out. The origin now sits at the bottom.`,
    `Add a Plane (Add &gt; Mesh &gt; Plane), scale it by 20, and give it a sand-coloured material. Model a simple low-poly palm: a cylinder trunk (8 vertices, bent with a few edge loops) and four flattened cone or plane leaves.`,
    `<b>Texture the ball:</b> in the Material tab add a new material. Either (a) in Edit Mode select alternate vertical face strips and assign them to new material slots in red, gold, teal and white, or (b) create an image texture in the Shading workspace and paint stripes using Texture Paint.`,
    `Select the ball. On frame 1, set Location Z to 6 and press I (Insert Keyframe) over Location and Scale. Continue for every row in the keyframe table.`,
    `Open the <b>Graph Editor</b>. Select the Z Location curve. Make the contact keyframes sharp (select them, press V, choose Vector) and keep the peaks smooth (Auto Clamped). Describe how the curve shape matches the bounce.`,
    `Add a Sun light and a camera. Frame the ball on a rule-of-thirds line with the palm in the background (View &gt; Cameras &gt; Set Active Object as Camera).`,
    `Render one still (F12) on the contact frame and save it as <b>CandidateNo_M1L7_Still.png</b>.`,
    `In Output Properties choose FFmpeg Video, Container MPEG-4, Codec H.264. Set the output path and render the animation (Render &gt; Render Animation). Name the file <b>CandidateNo_M1L7_Bounce.mp4</b>.`,
    `Save the project as <b>CandidateNo_M1L7_Bounce.blend</b>. Write 50 words comparing the 2D ball in M1-L6 with this 3D ball: what did the software interpolate for you?`
  ],
  skills: ['Vertices, edges and faces', 'Low-poly modelling', 'Materials and textures', '3D keyframing', 'Graph Editor and interpolation', 'Rendering MP4'],
  check: [
    { c: 'Low-poly sphere with correct segments and rings, flat shaded; mesh counts recorded', m: 2 },
    { c: 'Ball textured in at least three colours; ground and palm prop modelled', m: 3 },
    { c: 'Bounce keyframes match the table; peaks decrease in height', m: 3 },
    { c: 'Squash and stretch read clearly; origin at base so the ball does not sink', m: 2 },
    { c: 'Graph Editor used: sharp contacts and smooth peaks, explained', m: 2 },
    { c: 'PNG still, MP4 and .blend saved with correct names; comparison written', m: 3 }
  ],
  tip: `A vertex is a point, an edge joins two vertices and a face is the flat surface between three or more edges. Low-poly models use few faces, so they render quickly on phones; this is why many mobile games use a low-poly style.`
},
{
  id: 'M1-L8', sec: 'M1', app: 'plan', level: 'Challenge',
  title: `Launch It: Cross-platform Promotional Campaign Plan`,
  time: 90,
  brief: `<p><b>Guavaberry Grove</b> is a small family business in Tortola, British Virgin Islands, that makes guavaberry jam, syrup and a non-alcoholic guavaberry soda. It is launching the soda for the BVI Emancipation Festival and wants a four-week digital campaign. Keisha has asked you to write the plan she will present to the owners.</p>
<p>This lab covers <b>Industry Practices for Promotional Campaigns</b>: social networking, the Internet, blogs, text messaging, guerrilla campaigns, viral marketing, cross-platform marketing, email marketing and influencer marketing, and measuring effectiveness with KPIs and engagement metrics. You can plan an email campaign with a tool such as Mailchimp, Constant Contact or GetResponse.</p>`,
  data: `<h4>Client facts</h4>
<table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody>
<tr><td>Product</td><td>Guavaberry Grove Soda, 330 ml, US$2.50</td></tr>
<tr><td>Audience</td><td>Residents aged 16 to 40, festival-goers, cruise visitors</td></tr>
<tr><td>Budget</td><td>US$1,200 for four weeks</td></tr>
<tr><td>Existing channels</td><td>Instagram (850 followers), Facebook page (1,400 likes), WhatsApp Business, email list of 300 customers</td></tr>
<tr><td>Goal</td><td>Sell 2,000 bottles in the four weeks and grow Instagram to 1,500 followers</td></tr>
<tr><td>Launch moment</td><td>Festival Village opening night</td></tr>
</tbody></table>
<h4>Cost guide (for practice)</h4>
<table><thead><tr><th>Item</th><th>Cost (US$)</th></tr></thead><tbody>
<tr><td>Boosted Instagram or Facebook post, 7 days</td><td>50</td></tr>
<tr><td>Local micro-influencer post plus story</td><td>150</td></tr>
<tr><td>Free sample cups for 500 people</td><td>200</td></tr>
<tr><td>Chalk-stencil kit for guerrilla street art (with permission)</td><td>60</td></tr>
<tr><td>Email tool (free tier, up to 500 contacts)</td><td>0</td></tr>
<tr><td>Printed QR code stickers (200)</td><td>80</td></tr>
</tbody></table>`,
  tasks: [
    `Open Google Docs or Word. Title the plan "Guavaberry Grove Soda Festival Launch: Campaign Plan" and add your name and the date.`,
    `Write a <b>SMART objective</b> for sales and one for followers, using the goals in the data.`,
    `Describe the <b>target audience</b> in two personas of 40 words each (for example, a 19-year-old college student and a 35-year-old parent in East End).`,
    `Write one <b>key message</b> and a hashtag (for example #GroveAtFestival) that will be used on <b>every</b> platform (cross-platform consistency).`,
    `Plan <b>five tactics</b>, one from each type: social networking (Instagram and TikTok Reels), influencer marketing, email marketing, guerrilla marketing and viral or user-generated content (for example a "Sip and Wine" dance challenge). For each, write what, where, when and why.`,
    `Draft the <b>launch email</b>: subject line (under 50 characters), preview text, a 60-word body and one call-to-action button label. Name the tool you would use (Mailchimp, Constant Contact or GetResponse).`,
    `Build a <b>four-week content calendar</b> table: week, platform, post idea, format (Reel, carousel, story, email, WhatsApp status), and posting day.`,
    `Build an itemised <b>budget</b> table from the cost guide. The total must not exceed US$1,200. Show the remaining contingency.`,
    `Choose four <b>KPIs</b> (for example reach, engagement rate, email open rate, QR scans, bottles sold) and give a target number for each.`,
    `Explain in 60 to 80 words one <b>ethical or legal risk</b> (for example influencers must disclose paid posts; guerrilla art needs permission from property owners; email needs consent) and how you will manage it.`,
    `Design one sample Instagram post (1080 × 1080 px) in Canva showing the key message, hashtag and the product. Insert it into the plan.`,
    `Export the plan as <b>CandidateNo_M1L8_Campaign.pdf</b> and the post as <b>CandidateNo_M1L8_Post.png</b>.`
  ],
  skills: ['SMART objectives', 'Audience personas', 'Cross-platform messaging', 'Email, influencer, guerrilla and viral tactics', 'Budgeting', 'KPIs and analytics'],
  check: [
    { c: 'Two SMART objectives linked to the client goals', m: 2 },
    { c: 'Five tactics, one of each required type, each with what, where, when and why', m: 5 },
    { c: 'Launch email with valid subject, preview, body and CTA; tool named', m: 2 },
    { c: 'Four-week calendar and itemised budget within US$1,200', m: 2 },
    { c: 'Four KPIs with measurable targets', m: 2 },
    { c: 'Ethical or legal risk explained with a mitigation; sample post and PDF correctly named', m: 2 }
  ],
  tip: `Know the difference: <b>viral</b> marketing is content designed to be shared by the audience; <b>guerrilla</b> marketing is a surprising, low-cost stunt in a public place. A guerrilla stunt can go viral, but they are not the same thing.`
},

/* ===================== MODULE 2: WEB AND DIGITAL PUBLISHING ===================== */
{
  id: 'M2-L1', sec: 'M2', app: 'design', level: 'Core',
  title: `Island Voices E-zine: Layout, ISBN and Metadata Page`,
  time: 90,
  brief: `<p><b>Island Voices</b> youth writing club at Hummingbird Ridge High School in Spanish Town, Jamaica, wants a short digital magazine (e-zine) for Emancipation Day. It will be sold for US$1.99 on platforms such as Amazon Kindle Direct Publishing, Google Play Books and Kobo Writing Life, so it needs proper <b>front matter</b>: a copyright page, an ISBN and complete metadata.</p>
<p>This lab covers <b>Digital Publishing and Internet Terms</b>: digital publishing platforms (including Apple Books, IngramSpark and Draft2Digital), interactive e-books, ePub, ISBN and metadata, and digital magazines and newsletters as forms of publishing. A good follow-up is to take photographs and use them to publish simple e-books or e-zines.</p>`,
  data: `<h4>Content (8 pages)</h4>
<table><thead><tr><th>Page</th><th>Content</th></tr></thead><tbody>
<tr><td>1</td><td>Cover: title, issue, your own cover photograph</td></tr>
<tr><td>2</td><td>Copyright and metadata page (see below)</td></tr>
<tr><td>3</td><td>Contents with links</td></tr>
<tr><td>4 to 5</td><td>Feature: "1 August 1838: Full Freedom in Jamaica" (300 words you write from research; cite two sources)</td></tr>
<tr><td>6</td><td>Photo essay: four photos you take around Spanish Town (Emancipation Square, the Old King's House, the Rodney Memorial, the Cathedral)</td></tr>
<tr><td>7</td><td>Poem or short piece by a club member (write your own, 100 to 150 words)</td></tr>
<tr><td>8</td><td>Back cover: blurb of 50 words, ISBN and barcode area</td></tr>
</tbody></table>
<h4>Practice ISBN (not a real ISBN; for this lab only)</h4>
<p>978-1-23456-789-? &nbsp; Calculate the check digit. Multiply the first 12 digits alternately by 1 and 3, add the results, divide by 10 and subtract the remainder from 10 (if the answer is 10, the check digit is 0).</p>
<h4>Metadata fields to complete</h4>
<p>Title, subtitle, author or editor, publisher, publication date, language, ISBN, format (ePub or PDF), page count, BISAC or subject category, keywords (5), description (100 words), price, rights statement, cover alt text.</p>
<p><b>Note:</b> real ISBNs are issued by the national ISBN agency that serves your country. Check which agency serves Jamaica or your territory before publishing for real.</p>`,
  tasks: [
    `Plan the 8 pages on paper first: draw a thumbnail of each page showing where headings, text and images go.`,
    `Take at least <b>six photographs</b> for the cover and photo essay. Shoot in good daylight, use the rule of thirds and take each shot twice (portrait and landscape).`,
    `Create the e-zine in Canva (A4 or US Letter document) or Google Docs. Set up a consistent grid: two columns for the feature, margins of at least 15 mm.`,
    `Design the cover with masthead, issue line ("Issue 1, July"), one cover line and your best photograph.`,
    `<b>Calculate the ISBN check digit</b> and show your working in a small box on your evidence sheet. Write the full 13-digit practice ISBN on page 2 and page 8.`,
    `Build the <b>copyright and metadata page</b>: copyright line, "All rights reserved" or a Creative Commons licence, ISBN, edition, publisher (Island Voices Press) and photo credits.`,
    `Add a contents page where each entry links to its page (Canva: select text &gt; Link &gt; page; Docs: Insert &gt; Bookmark then link).`,
    `Write and lay out the feature and the poem. Use short paragraphs, one pull quote and captions under every photo.`,
    `Complete a <b>metadata table</b> (in a separate document) for all fields listed in the data, including five keywords and a 100-word description.`,
    `Export the e-zine as <b>CandidateNo_M2L1_Ezine.pdf</b> (PDF Standard). If you used Google Docs, also download it as ePub (File &gt; Download &gt; EPUB) and name it <b>CandidateNo_M2L1_Ezine.epub</b>.`,
    `Answer in four lines: what is the difference between a PDF e-zine and a <b>reflowable ePub</b>, and which suits phone readers better?`
  ],
  skills: ['Editorial layout', 'Photography for publishing', 'ISBN structure and check digit', 'Metadata', 'PDF and ePub export'],
  check: [
    { c: 'Eight pages with consistent grid, masthead and own photographs', m: 3 },
    { c: 'ISBN check digit correctly calculated with working shown', m: 2 },
    { c: 'Copyright and metadata page complete and accurate', m: 2 },
    { c: 'Working linked contents page', m: 1 },
    { c: 'Feature cites two sources; captions and pull quote used', m: 2 },
    { c: 'Metadata table complete for every field', m: 3 },
    { c: 'PDF (and ePub if possible) exported with correct names; PDF vs ePub explained', m: 2 }
  ],
  tip: `Metadata is "data about data". On Paper 01, if a question asks what helps a reader <b>find</b> an e-book in an online store, the answer is metadata (title, keywords, category), not the ISBN. The ISBN <b>identifies</b> one edition; metadata helps people <b>discover</b> it.`
},
{
  id: 'M2-L2', sec: 'M2', app: 'web', level: 'Starter',
  title: `Write for the Web: an SEO-ready Blog Post`,
  time: 60,
  brief: `<p>Maya runs the blog for <b>Sol Studio</b>, a small photography studio in Oranjestad, Aruba. She wants a post that ranks on Google when people search for "best sunset spots in Aruba". The post must be friendly, easy to scan and set up so search engines can index it.</p>
<p>This lab covers <b>Content Development</b>: defining content scope, the creative brief with target group and content checklist, and the criteria for web content (short paragraphs and sentences, no needless repetition, addressing users directly, no jargon, licensing, optimisation, easy to scan, machine indexable, image preparation). <b>Machine indexability</b> means preparing content so it can be found, read and indexed by search engines and digital platforms.</p>`,
  data: `<h4>Creative brief</h4>
<table><thead><tr><th>Item</th><th>Detail</th></tr></thead><tbody>
<tr><td>Target group</td><td>Visitors and residents aged 18 to 45 with phones, who like photography</td></tr>
<tr><td>Purpose</td><td>Inform and inspire; promote Sol Studio's sunset photo walks</td></tr>
<tr><td>Tone</td><td>Warm, friendly, direct ("you")</td></tr>
<tr><td>Length</td><td>500 to 700 words</td></tr>
<tr><td>Focus keyword</td><td>sunset spots in Aruba</td></tr>
<tr><td>Related keywords</td><td>Eagle Beach sunset, California Lighthouse, Aruba photography tips</td></tr>
<tr><td>Call to action</td><td>Book a Friday sunset photo walk</td></tr>
</tbody></table>
<h4>Spots to feature (add one of your own)</h4>
<ul><li>Eagle Beach (divi-divi trees at golden hour)</li><li>California Lighthouse (view over the north coast)</li><li>Arashi Beach</li><li>Palm Beach boardwalk</li><li>Your own choice</li></ul>
<h4>A badly written first draft to improve</h4>
<p class="passage">Sunsets are utilised by photographic practitioners to leverage optimal luminosity conditions. Sunsets in Aruba are good. Sunsets in Aruba are very good and there are many sunsets in Aruba that are good for photographers who want to photograph sunsets in Aruba.</p>`,
  tasks: [
    `Rewrite the bad first draft in two plain sentences. Underline the jargon and the needless repetition you removed.`,
    `Write an <b>SEO title</b> of 50 to 60 characters containing the focus keyword (for example "5 Best Sunset Spots in Aruba for Photos").`,
    `Write a <b>meta description</b> of 140 to 160 characters that includes the focus keyword and a reason to click.`,
    `Choose a short <b>URL slug</b> with hyphens (for example /sunset-spots-aruba).`,
    `Write the post (500 to 700 words) in Google Docs. Use one H1 (the title), at least five H2 sub-headings (one per spot) and paragraphs of no more than three sentences.`,
    `Use the focus keyword in the first 100 words, in one H2 and naturally two or three more times. Use each related keyword at least once. Do not stuff keywords.`,
    `Add one bulleted list of three quick phone photography tips (for example, tap to set exposure on the sky, use the gridlines, shoot a few minutes after the sun dips).`,
    `Add one internal link (to the studio's "Book a walk" page) and one external link to a trustworthy source (for example a tourism board website). Write the link text clearly; never "click here".`,
    `Prepare two images: your own photos, resized to 1200 px wide and exported as JPEG under 200 KB. Name them descriptively (eagle-beach-sunset.jpg) and write <b>alt text</b> for each.`,
    `Add a licence line at the end (for example "Text and photos by [Your Name], CC BY 4.0") and the call to action.`,
    `Fill in the SEO checklist table: title length, meta length, keyword in first 100 words, H2 count, average paragraph length, alt text, links. Save everything as <b>CandidateNo_M2L2_Blog.pdf</b> and the images with their descriptive names inside a folder <b>CandidateNo_M2L2</b>.`
  ],
  skills: ['Web-friendly writing', 'Creative brief', 'SEO title, meta description and slug', 'Headings and scannability', 'Alt text and image optimisation', 'Content licensing'],
  check: [
    { c: 'Bad draft rewritten clearly, jargon and repetition identified', m: 2 },
    { c: 'SEO title, meta description and slug meet length and keyword rules', m: 3 },
    { c: 'Post 500 to 700 words, one H1, five or more H2s, short paragraphs, direct address', m: 3 },
    { c: 'Keywords used naturally; internal and external links with clear link text', m: 2 },
    { c: 'Images resized, compressed, descriptively named, with alt text', m: 3 },
    { c: 'Licence line, CTA, completed checklist and correct file names', m: 2 }
  ],
  tip: `Alt text is for people first and search engines second. Describe the picture as if to someone who cannot see it: "A divi-divi tree leans over Eagle Beach at sunset" is better than "sunset SEO Aruba image".`
},
{
  id: 'M2-L3', sec: 'M2', app: 'design', level: 'Core',
  title: `Site Map to Clickable Prototype: Low-fi to Hi-fi in Figma`,
  time: 90,
  brief: `<p><b>Rhythm Roots Dance Studio</b> in Roseau, Dominica, wants a new website. Before Maya writes a line of code, Zara wants to see the structure and a clickable prototype that the owner can test on her phone.</p>
<p>This lab covers <b>Prototypes using Design Principles</b>: prototypes, concept maps, navigational charts, site maps and hierarchy maps, design principles such as the rule of thirds, composition, alignment, hierarchy, contrast, spacing and visual flow, and cloud-based authoring tools such as Figma, Canva and Adobe Express.</p>`,
  data: `<h4>Pages the client wants</h4>
<table><thead><tr><th>Page</th><th>Must include</th></tr></thead><tbody>
<tr><td>Home</td><td>Hero image, tagline "Feel the rhythm. Find your roots.", three feature cards, "Book a free class" button</td></tr>
<tr><td>Classes</td><td>Sub-pages: Kids (5 to 11), Teens (12 to 17), Adults; each with times and price</td></tr>
<tr><td>Instructors</td><td>Three profiles with photo and bio</td></tr>
<tr><td>Events</td><td>Carnival troupe sign-up, end-of-year show</td></tr>
<tr><td>Gallery</td><td>Photo grid</td></tr>
<tr><td>Contact</td><td>Form, address, map, WhatsApp button</td></tr>
</tbody></table>
<h4>Brand</h4>
<ul><li>Colours: #1B1B3A (deep indigo), #FF6B35 (flame orange), #F7F7F2 (off-white), #2EC4B6 (teal accent)</li><li>Fonts: Poppins (headings), Inter (body)</li><li>Mobile frame: 390 × 844 px; desktop frame: 1440 × 1024 px</li></ul>`,
  tasks: [
    `Draw a <b>site map</b> (hierarchy map) on paper or in FigJam: Home at the top, the five main pages on level 2 and the three class sub-pages on level 3. Use boxes and connecting lines.`,
    `Draw a <b>navigational chart</b> showing one user pathway: Home &gt; Classes &gt; Teens &gt; Book a free class &gt; Contact form &gt; Thank you.`,
    `Sketch <b>low-fidelity</b> wireframes on paper for Home, Classes and Contact (mobile size). Use boxes with an X for images and wavy lines for text. Photograph them flat.`,
    `In <b>Figma</b>, create a new design file. Add three mobile frames (390 × 844) named Home, Classes and Contact.`,
    `Set up a layout grid on each frame (4 columns, 16 px margins, 16 px gutter). Create colour styles for the four brand colours and text styles for H1, H2 and Body.`,
    `Build the <b>high-fidelity</b> Home screen: hero image placed on a rule-of-thirds line, tagline, three feature cards aligned to the grid, and the orange "Book a free class" button.`,
    `Turn the button and the navigation bar into <b>components</b> and reuse them on every frame (consistency).`,
    `Build the Classes and Contact screens using the same components, grid and spacing (8 px spacing scale: 8, 16, 24, 32).`,
    `Switch to the <b>Prototype</b> tab. Connect: nav items to their frames, "Book a free class" to Contact, and a Submit button to a small "Thank you" frame. Use On tap &gt; Navigate to, with Smart Animate or Dissolve, 300 ms.`,
    `Test the prototype in Present mode (and on a phone with the Figma app if available). Ask one classmate to complete the pathway and write down one problem they had. Fix it.`,
    `Export each frame as PNG at 2x, named <b>CandidateNo_M2L3_Home.png</b>, <b>_Classes.png</b> and <b>_Contact.png</b>. Export the site map as <b>CandidateNo_M2L3_SiteMap.png</b>. Paste the prototype share link into a document saved as <b>CandidateNo_M2L3_Prototype.pdf</b> together with the low-fi photos.`
  ],
  skills: ['Site maps and hierarchy maps', 'Navigational charts and user pathways', 'Low-fidelity wireframes', 'Figma grids, styles and components', 'Clickable prototyping', 'User testing'],
  check: [
    { c: 'Site map shows three correct levels; navigational chart shows the full pathway', m: 3 },
    { c: 'Low-fi paper wireframes for three screens, photographed clearly', m: 2 },
    { c: 'Hi-fi screens use the grid, brand colours, text styles and spacing scale', m: 4 },
    { c: 'Components reused for consistency; rule of thirds and hierarchy applied on Home', m: 2 },
    { c: 'Working prototype links, including the Thank you screen', m: 2 },
    { c: 'User test problem recorded and fixed; files exported and named correctly', m: 2 }
  ],
  tip: `A site map shows the <b>structure</b> (which pages exist and how they are grouped). A navigational chart or user flow shows a <b>journey</b> (the steps one user takes). Paper 02 may ask for either, so read the command word and label your diagram.`
},
{
  id: 'M2-L4', sec: 'M2', app: 'code', level: 'Core',
  title: `Hand-coded Multi-page Website with HTML and CSS`,
  time: 90,
  brief: `<p>Maya has the approved Figma design for <b>Rhythm Roots Dance Studio</b>. Now she needs a working three-page site built in plain HTML and one shared CSS file, coded in VS Code or Notepad and tested in a browser with no Internet, just like Paper 02.</p>
<p>This lab covers <b>Website Building</b>: HTML, hyperlinking, lists, CSS, background colour, website structure, menus, breadcrumbs and page hierarchy, page design and layout (contrast, text, links, graphics) and usability. You will build multiple pages (home, contact us, content pages) that are properly linked with navigation buttons.</p>`,
  data: `<h4>Folder structure</h4>
<pre><code>CandidateNo_M2L4/
  index.html
  classes.html
  contact.html
  css/style.css
  images/hero.jpg  (your own photo, 1600 px wide, under 300 KB)
</code></pre>
<h4>Starter code for index.html</h4>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
  &lt;title&gt;Rhythm Roots Dance Studio | Roseau&lt;/title&gt;
  &lt;link rel="stylesheet" href="css/style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;
    &lt;h1 class="logo"&gt;Rhythm Roots&lt;/h1&gt;
    &lt;nav&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;a href="index.html" class="active"&gt;Home&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="classes.html"&gt;Classes&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="contact.html"&gt;Contact&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
  &lt;main&gt;
    &lt;!-- hero section and three feature cards go here --&gt;
  &lt;/main&gt;
  &lt;footer&gt;&lt;p&gt;&amp;copy; Rhythm Roots Dance Studio&lt;/p&gt;&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<h4>Starter CSS (css/style.css)</h4>
<pre><code>* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; background: #F7F7F2; color: #1B1B3A; line-height: 1.6; }
header { background: #1B1B3A; color: #F7F7F2; padding: 16px 24px; }
nav ul { list-style: none; margin: 0; padding: 0; display: flex; gap: 24px; }
nav a { color: #F7F7F2; text-decoration: none; }
/* Add: .active, .hero, .card, table, .btn, footer */</code></pre>
<h4>Class timetable for classes.html</h4>
<table><thead><tr><th>Class</th><th>Day</th><th>Time</th><th>Monthly fee</th></tr></thead><tbody>
<tr><td>Kids Folk and Fun</td><td>Saturday</td><td>9:00 to 10:00</td><td>XCD 100</td></tr>
<tr><td>Teens Soca Fit</td><td>Tuesday</td><td>16:30 to 17:30</td><td>XCD 120</td></tr>
<tr><td>Adult Quadrille and Bélé</td><td>Thursday</td><td>18:30 to 19:30</td><td>XCD 135</td></tr>
</tbody></table>`,
  tasks: [
    `Create the folder structure exactly as shown. File and folder names must be lower case with no spaces.`,
    `Type the starter code into <b>index.html</b>. Inside main, add a hero section with an h2 tagline, a paragraph, your hero image (with width, height and alt attributes) and a link styled as a button to contact.html.`,
    `Below the hero, add three feature cards (div or article with class "card"), each with an h3 and a short paragraph.`,
    `Copy the page skeleton to <b>classes.html</b> and <b>contact.html</b>. Change each page's title and move the "active" class to the correct nav link.`,
    `On classes.html add a <b>breadcrumb</b> above the heading (Home &gt; Classes) where "Home" is a link. Add the timetable as an HTML table with thead, th and tbody.`,
    `On classes.html add an ordered list "What to bring" (water, comfortable shoes, towel) and an unordered list of class benefits.`,
    `On contact.html add the address (Great George Street, Roseau), a mailto link, a tel link and an <b>external link</b> to a WhatsApp chat that opens in a new tab (target="_blank" rel="noopener").`,
    `In style.css, style the .active link (underline or orange bottom border), the .hero, the .card (white background, 8 px rounded corners, 24 px padding, soft shadow), the table (borders, striped rows) and the .btn (#FF6B35 background, white text, hover darkens).`,
    `Use the <b>box model</b> on purpose: add margin between cards and padding inside them. Set the main content to max-width: 1100px and margin: 0 auto.`,
    `Check contrast: body text must be dark on light; button text must be readable. Test every link on all three pages. No link may be broken.`,
    `Validate your HTML by checking that every tag is closed and nested correctly (the W3C validator if Internet is allowed in class; otherwise use VS Code's warnings).`,
    `Take screenshots of all three pages in a browser and paste them into <b>CandidateNo_M2L4_Screens.pdf</b>. Zip the site folder as <b>CandidateNo_M2L4_Site.zip</b>.`
  ],
  skills: ['HTML document structure', 'Internal, external, mailto and tel links', 'Lists and tables', 'Breadcrumb navigation', 'CSS selectors and the box model', 'Testing links'],
  check: [
    { c: 'Correct folder structure, lower-case names, one shared external CSS file', m: 2 },
    { c: 'Valid HTML skeleton on all three pages with unique titles and active nav state', m: 3 },
    { c: 'Hero, image with alt text, cards, lists and timetable table built correctly', m: 3 },
    { c: 'Breadcrumb, internal, external (new tab), mailto and tel links all work', m: 3 },
    { c: 'CSS styles cards, table, button hover and layout with sensible box model', m: 3 },
    { c: 'Screenshots PDF and zipped site correctly named', m: 1 }
  ],
  tip: `The most common Paper 02 web error is a broken image or CSS link caused by a wrong path. "css/style.css" means "look in the css folder next to this page". Check spelling and capital letters: Style.css and style.css are different files on many servers.`
},
{
  id: 'M2-L5', sec: 'M2', app: 'code', level: 'Challenge',
  title: `Responsive Rescue: Fix a Broken Layout for Phones`,
  time: 75,
  brief: `<p><b>Frigate Bay Grill</b> in St. Kitts had its menu page built years ago. On a phone, the text is tiny, the photos spill off the screen and customers must scroll sideways. Maya has been asked to make it <b>responsive</b> and more accessible without changing the content.</p>
<p>This lab covers <b>User interface and layout design</b>: responsiveness, accessibility, usability and user experience, and print versus screen resolution (px, rem and WCAG). Websites must be easy to access, read, navigate and use <b>across devices and screen sizes</b>.</p>`,
  data: `<h4>The broken page (save as index.html)</h4>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Frigate Bay Grill&lt;/title&gt;
  &lt;style&gt;
    body { width: 1200px; font-size: 11px; font-family: Georgia; background: #FFFFFF; color: #999999; }
    .menu { width: 1200px; }
    .item { float: left; width: 380px; margin: 10px; }
    .item img { width: 380px; }
    a { color: #BBBBBB; }
    .btn { padding: 2px; font-size: 9px; }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Frigate Bay Grill&lt;/h1&gt;
  &lt;div class="menu"&gt;
    &lt;div class="item"&gt;&lt;img src="ribs.jpg"&gt;&lt;h2&gt;Grilled Ribs&lt;/h2&gt;&lt;p&gt;Smoky barbecue ribs. XCD 48&lt;/p&gt;&lt;/div&gt;
    &lt;div class="item"&gt;&lt;img src="snapper.jpg"&gt;&lt;h2&gt;Red Snapper&lt;/h2&gt;&lt;p&gt;Whole fish, creole sauce. XCD 60&lt;/p&gt;&lt;/div&gt;
    &lt;div class="item"&gt;&lt;img src="johnnycake.jpg"&gt;&lt;h2&gt;Johnny Cakes&lt;/h2&gt;&lt;p&gt;Three warm johnny cakes. XCD 14&lt;/p&gt;&lt;/div&gt;
  &lt;/div&gt;
  &lt;a class="btn" href="#"&gt;order&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<h4>Targets</h4>
<table><thead><tr><th>Problem</th><th>Target</th></tr></thead><tbody>
<tr><td>Fixed 1200 px width</td><td>Fluid width, max-width 1100 px, centred</td></tr>
<tr><td>Tiny text</td><td>Body text 1rem (16 px) minimum</td></tr>
<tr><td>Low contrast grey text</td><td>Contrast ratio at least 4.5 : 1 (WCAG AA)</td></tr>
<tr><td>Images overflow</td><td>Images scale to their container</td></tr>
<tr><td>Floats</td><td>CSS Grid or Flexbox: 3 columns on desktop, 1 on phones</td></tr>
<tr><td>Tiny button</td><td>Touch target at least 44 × 44 px</td></tr>
</tbody></table>`,
  tasks: [
    `Save the broken code as <b>before.html</b> and take a screenshot of it in the browser's responsive or device mode (F12, then the phone icon) at 390 px wide. Keep this as evidence.`,
    `Copy it to <b>index.html</b>. Add the missing <b>viewport meta tag</b> and lang="en" on the html tag. Explain in one sentence what the viewport tag does.`,
    `Replace the fixed widths: remove width: 1200px from body and .menu. Give the main container max-width: 1100px; margin: 0 auto; padding: 0 1rem.`,
    `Change all font sizes to <b>rem</b> units: body 1rem, h1 2rem, h2 1.25rem. Set line-height: 1.5.`,
    `Fix contrast: change the text to a dark colour such as #222222 and links to a strong colour such as #0B5D7A. Use an online or built-in contrast checker (browser DevTools shows contrast in the colour picker) and record the ratios.`,
    `Make images responsive with img { max-width: 100%; height: auto; display: block; }. Add meaningful alt text to all three images.`,
    `Replace the floats with CSS Grid: .menu { display: grid; grid-template-columns: 1fr; gap: 1rem; }`,
    `Add a <b>media query</b> so the menu becomes three columns on wider screens: @media (min-width: 768px) { .menu { grid-template-columns: repeat(3, 1fr); } }`,
    `Make the button a proper touch target: padding 0.75rem 1.5rem, min-height 44px, a clear label ("Order now on WhatsApp") and a visible :focus style for keyboard users.`,
    `Test at 390 px, 768 px and 1280 px. Take a screenshot at each width.`,
    `Write a "before and after" table listing six changes you made and the WCAG or usability reason for each.`,
    `Save everything in a folder <b>CandidateNo_M2L5</b> with before.html, index.html and a PDF of screenshots and the table named <b>CandidateNo_M2L5_Report.pdf</b>.`
  ],
  skills: ['Viewport meta tag', 'Fluid layouts and max-width', 'rem units', 'Responsive images', 'CSS Grid and media queries', 'WCAG contrast and touch targets'],
  check: [
    { c: 'Viewport tag and lang added; purpose explained', m: 2 },
    { c: 'Fixed widths replaced with fluid, centred layout; rem font sizes', m: 3 },
    { c: 'Contrast fixed to at least 4.5 : 1 with ratios recorded', m: 2 },
    { c: 'Responsive images with alt text', m: 2 },
    { c: 'Grid with media query: one column on phone, three on desktop', m: 3 },
    { c: 'Touch target and focus style fixed; three screenshots and before and after table', m: 3 }
  ],
  tip: `"Mobile-first" means you write the phone layout as the default and add media queries with min-width for bigger screens. Mobile-first content is a current trend, so be ready to explain it in a structured question.`
},
{
  id: 'M2-L6', sec: 'M2', app: 'code', level: 'Core',
  title: `Embed It: Video, Audio, Captions and a Google Map`,
  time: 60,
  brief: `<p><b>Carnival Heritage Corner</b>, a small display space on Frederick Street in Port of Spain, wants a single web page that plays a short video of a J'ouvert jump-up, a 30-second audio clip of a calypso elder, and a map so cruise visitors can find the shop from the pier.</p>
<p>This lab covers <b>embedding multimedia components and external widgets</b>, print versus screen resolution and responsive media. It also covers web content preparation: exporting files in suitable web formats and making them accessible.</p>`,
  data: `<h4>Media to prepare</h4>
<table><thead><tr><th>File</th><th>Format</th><th>Target</th></tr></thead><tbody>
<tr><td>media/jouvert.mp4</td><td>MP4 (H.264 + AAC)</td><td>1280 × 720, under 10 MB, 15 to 20 s (use your M1-L5 video or any clip you filmed)</td></tr>
<tr><td>media/jouvert-poster.jpg</td><td>JPEG</td><td>1280 × 720, under 150 KB, a frame from the clip</td></tr>
<tr><td>media/jouvert.vtt</td><td>WebVTT captions</td><td>At least three captions</td></tr>
<tr><td>media/elder.mp3</td><td>MP3, 128 kbps</td><td>30 s (record a friend telling a Carnival memory, or use your M2-L8 interview)</td></tr>
</tbody></table>
<h4>Starter WebVTT file (jouvert.vtt)</h4>
<pre><code>WEBVTT

00:00:00.000 --&gt; 00:00:04.000
[steel band music starts]

00:00:04.000 --&gt; 00:00:09.000
Revellers covered in paint dance down Ariapita Avenue.

00:00:09.000 --&gt; 00:00:15.000
J'ouvert morning opens Trinidad and Tobago Carnival.</code></pre>
<h4>Starter HTML snippet</h4>
<pre><code>&lt;video controls width="1280" height="720" poster="media/jouvert-poster.jpg"&gt;
  &lt;source src="media/jouvert.mp4" type="video/mp4"&gt;
  &lt;track src="media/jouvert.vtt" kind="captions" srclang="en" label="English" default&gt;
  Your browser does not support HTML video.
&lt;/video&gt;</code></pre>
<p><b>Google Map:</b> in Google Maps, search "Frederick Street, Port of Spain", click Share &gt; Embed a map &gt; Copy HTML. This gives an iframe.</p>`,
  tasks: [
    `Create the folder <b>CandidateNo_M2L6</b> with index.html, style.css and a media sub-folder.`,
    `Prepare the video: export or convert to MP4 at 1280 × 720 under 10 MB. Export one still frame from the clip as the poster JPEG (OpenShot: right-click preview &gt; Save current frame; or use a screenshot cropped in GIMP).`,
    `Write the WebVTT caption file. Check the timings by watching the clip. Save it with the .vtt extension (not .txt).`,
    `Build index.html with a heading, a short introduction and a <b>video</b> element using the starter snippet. Confirm the captions show when you turn CC on.`,
    `Add an <b>audio</b> element with controls and a source of type audio/mpeg. Underneath, add a short written <b>transcript</b> of the clip for deaf or hard-of-hearing visitors.`,
    `Embed a YouTube video of your choice from your own channel or a school channel using the Share &gt; Embed iframe code (if no Internet, leave a commented-out iframe and explain).`,
    `Paste the Google Maps <b>iframe</b>. Add a title attribute (for example title="Map to Carnival Heritage Corner, Frederick Street") for screen readers.`,
    `Make all media responsive: in CSS set video, iframe { width: 100%; height: auto; } and give iframes aspect-ratio: 16 / 9.`,
    `Add a small table explaining the difference between <b>print resolution</b> (for example 300 dpi for a brochure) and <b>screen resolution</b> (pixel dimensions such as 1280 × 720), using your poster image as the example.`,
    `Test in two different browsers (for example Chrome and Firefox or Edge) and on a phone if possible. Note anything that behaves differently.`,
    `Zip the folder as <b>CandidateNo_M2L6_Media.zip</b> and save a screenshot of the finished page as <b>CandidateNo_M2L6_Screen.png</b>.`
  ],
  skills: ['HTML5 video and audio', 'WebVTT captions and transcripts', 'Embedding iframes and widgets', 'Responsive media', 'Print vs screen resolution', 'Cross-browser testing'],
  check: [
    { c: 'MP4 and poster image prepared to size and format targets', m: 2 },
    { c: 'Video element with poster, source and working captions track', m: 3 },
    { c: 'Audio element with correct type plus a written transcript', m: 2 },
    { c: 'YouTube and Google Map iframes embedded, with title attributes', m: 3 },
    { c: 'Media scales on a phone with no sideways scrolling', m: 2 },
    { c: 'Print vs screen resolution table accurate; cross-browser notes; files named correctly', m: 3 }
  ],
  tip: `An embedded YouTube video or Google Map needs the Internet to show. In Paper 02 there is no Internet, so examiners may ask you to embed a <b>local</b> video file with the video tag. Practise both.`
},
{
  id: 'M2-L7', sec: 'M2', app: 'web', level: 'Core',
  title: `Rebuild It in a CMS: WordPress.com or Google Sites`,
  time: 75,
  brief: `<p>The owner of <b>Rhythm Roots Dance Studio</b> loves the site Maya hand-coded in M2-L4, but she wants her staff to add events and photos <b>without touching code</b>. Your job is to rebuild the same site in a content management system and set up a simple content workflow.</p>
<p>This lab covers <b>Web Content Management Tools and Techniques</b> and <b>Online Publishing Platforms</b>: the definition of content management, self-hosted versus cloud-hosted, open-source versus proprietary, types of CMS, hosted free or paid platforms, and the content management techniques: creating, editing, organising, tagging, scheduling, approving, publishing, archiving and updating. You can also repeat the website activity with a website builder such as Weebly or Google Sites.</p>`,
  data: `<h4>Content to move across (from M2-L4)</h4>
<ul><li>Home: hero image, tagline, three feature cards, button</li><li>Classes: timetable table, "What to bring" list, breadcrumb (if supported)</li><li>Contact: address, email, phone, WhatsApp link, map</li></ul>
<h4>New content the staff will add</h4>
<table><thead><tr><th>Post title</th><th>Category</th><th>Tags</th><th>Publish</th></tr></thead><tbody>
<tr><td>Carnival troupe sign-up opens</td><td>Events</td><td>carnival, teens, troupe</td><td>Now</td></tr>
<tr><td>Meet our new Bélé instructor</td><td>News</td><td>instructors, adults</td><td>Schedule for next Monday 08:00</td></tr>
<tr><td>End-of-year show photos</td><td>Gallery</td><td>show, photos</td><td>Save as draft for approval</td></tr>
</tbody></table>
<h4>Roles</h4>
<table><thead><tr><th>Person</th><th>Role</th></tr></thead><tbody>
<tr><td>Owner, Ms. Arrindell</td><td>Administrator</td></tr>
<tr><td>Instructor, Mr. Brooks</td><td>Author (writes, cannot publish others' posts)</td></tr>
<tr><td>Intern</td><td>Contributor (writes drafts only)</td></tr>
</tbody></table>`,
  tasks: [
    `Choose <b>WordPress.com</b> (free plan) or <b>Google Sites</b>. Write one sentence on whether your choice is open-source or proprietary, and self-hosted or cloud-hosted.`,
    `Create the site with the title "Rhythm Roots Dance Studio (practice site)". Choose a simple theme and set the brand colours #1B1B3A and #FF6B35 where the theme allows.`,
    `Build the three pages (Home, Classes, Contact) using blocks or sections. Recreate the hero, the cards, the timetable table and the lists from M2-L4.`,
    `Set up the <b>navigation menu</b> with all three pages in the correct order.`,
    `Embed the Google Map on Contact (WordPress: Custom HTML block; Google Sites: Insert &gt; Map).`,
    `Upload two images with alt text and a sensible file name. Note the maximum upload size or storage limit the platform gives you.`,
    `<b>WordPress:</b> create the categories and tags from the table and add the three posts: publish one, <b>schedule</b> one and save one as a <b>draft</b>. <b>Google Sites:</b> create an "Events" page and simulate the workflow by using a draft page and the Publish button; explain what Google Sites cannot do compared with WordPress.`,
    `Describe how you would give the instructor and intern the right <b>roles</b> (WordPress: Users &gt; Add New; Google Sites: Share with editors) and why limiting permissions improves security.`,
    `Publish the site (or keep it private if your school does not allow public sites). Copy the URL.`,
    `Complete a comparison table: hand-coded site (M2-L4) versus CMS site, for cost, ease of updating, control over design, hosting, security updates and who owns the content.`,
    `Save your evidence (URL, screenshots of the dashboard showing published, scheduled and draft posts, and the comparison table) as <b>CandidateNo_M2L7_CMS.pdf</b>.`
  ],
  skills: ['Choosing a CMS', 'Pages, menus and blocks', 'Categories and tags', 'Scheduling, drafts and approval workflow', 'User roles and permissions', 'Comparing coded and CMS sites'],
  check: [
    { c: 'Platform correctly classified (open-source or proprietary, self or cloud hosted)', m: 2 },
    { c: 'Three pages rebuilt with menu, table, lists, images with alt text and map', m: 4 },
    { c: 'Content workflow shown: published, scheduled and draft (or explained limitation)', m: 3 },
    { c: 'Roles and permissions described with a security reason', m: 2 },
    { c: 'Comparison table accurate across all six criteria', m: 3 },
    { c: 'Evidence PDF with URL and screenshots correctly named', m: 1 }
  ],
  tip: `WordPress.org (the free software you install on your own host) is open-source and self-hosted. WordPress.com is a hosted service run for you. Many Paper 01 questions hide this trap, so learn the ".org versus .com" difference.`
},
{
  id: 'M2-L8', sec: 'M2', app: 'audio', level: 'Challenge',
  title: `Publish a Podcast Episode: Edit, Tag, Cover Art and Show Notes`,
  time: 90,
  brief: `<p>Keisha is launching <b>Pulse Check</b>, a weekly podcast from Island Pulse Media about young Caribbean creators. It is ready for its first full episode: a 3 to 5 minute interview with a young creator from your school or community. You will edit it, tag it, design the cover art and prepare it for a podcast host so it can reach listeners in Barbados and the diaspora.</p>
<p>This lab covers <b>Tools and Techniques</b>: working with multiple audio tracks, creating podcasts and web content preparation (creating podcasts and multimedia for online use and exporting in suitable web formats). It also links to sharing content through apps and the benefits and limitations of platforms.</p>`,
  data: `<h4>Episode outline</h4>
<table><thead><tr><th>Segment</th><th>Length</th><th>Content</th></tr></thead><tbody>
<tr><td>Intro</td><td>20 to 25 s</td><td>Voice-over (script below) + steelpan music bed + one whoosh sound effect</td></tr>
<tr><td>Welcome</td><td>15 s</td><td>Host introduces guest and topic</td></tr>
<tr><td>Interview</td><td>2.5 to 4 min</td><td>Three questions (below)</td></tr>
<tr><td>Outro</td><td>15 to 20 s</td><td>Thanks, call to follow, music out</td></tr>
</tbody></table>
<h4>Intro voice-over script</h4>
<p class="passage">"Wha' happenin', Caribbean! You're tuned in to Pulse Check, the podcast where young creators from Barbados to Trinidad share how they make it happen. Let's get into it."</p>
<h4>Interview questions</h4>
<ol><li>What do you create, and what got you started?</li><li>What is one challenge of being a creator in the Caribbean?</li><li>What advice would you give a student who wants to start?</li></ol>
<h4>Publishing specification</h4>
<table><thead><tr><th>Item</th><th>Specification</th></tr></thead><tbody>
<tr><td>Audio</td><td>MP3, 128 kbps, mono, 44.1 kHz, peaks no higher than -1 dB</td></tr>
<tr><td>Cover art</td><td>Square, 3000 × 3000 px, JPEG or PNG, readable at thumbnail size</td></tr>
<tr><td>Metadata tags</td><td>Title, Artist, Album (show name), Track number, Year, Genre ("Podcast")</td></tr>
<tr><td>Show notes</td><td>100 to 150 words, timestamps, links, credits</td></tr>
</tbody></table>
<p><b>Consent:</b> your guest must agree in writing to be recorded and published. Do not record anyone under 18 without a parent's or guardian's consent.</p>`,
  tasks: [
    `Get written consent from your guest using a short release form (name, date, signature, how the audio will be used). Then record the interview in a quiet room using a phone voice recorder or a USB microphone about a fist's width from the mouth. Record 5 seconds of room tone first.`,
    `Record the intro voice-over. In Audacity (project rate 44100 Hz) import the voice-over, a royalty-free steelpan bed and a whoosh effect on three named tracks. Fade the music in over 2 s and out over 3 s and place the whoosh before "Let's get into it". Save it as <b>CandidateNo_M2L8_Intro.aup3</b> and export a WAV master.`,
    `Import the intro, welcome, interview and music bed into one Audacity project on separate tracks.`,
    `Apply Noise Reduction (using the room tone), cut long pauses, "ums" and false starts. Keep it sounding natural.`,
    `Arrange the segments in order on the timeline. Bring the music bed in under the welcome and outro only, ducked by about 12 dB.`,
    `Normalise the voice tracks to -1 dB, then listen through headphones for clipping and jumps in volume.`,
    `Add <b>metadata tags</b>: File &gt; Export Audio (MP3), then fill in the Edit Metadata Tags box (Title "Pulse Check Ep. 1: [Guest topic]", Artist "Island Pulse Media", Album "Pulse Check", Track 1, Year, Genre "Podcast"). Name the file <b>CandidateNo_M2L8_Ep1.mp3</b>.`,
    `Design <b>cover art</b> in Canva or GIMP at 3000 × 3000 px. Use the show name in large bold text and one image or shape. Check it is readable when shrunk to 100 px. Export as <b>CandidateNo_M2L8_Cover.jpg</b>.`,
    `Write the <b>show notes</b> (100 to 150 words) with an SEO-friendly title, a summary, timestamps for each question (for example 00:45, 01:50, 03:10), links and music credits with licence.`,
    `Choose a free host (for example Spotify for Creators or RSS.com) and list the fields you would fill in. Explain in two sentences what an <b>RSS feed</b> does for listeners who use Apple Podcasts or other apps. If your school allows it, upload and publish; otherwise, create a mock upload screen in Canva.`,
    `Write one benefit and one limitation of publishing on a free podcast host (for example reach and analytics versus platform rules and content ownership).`,
    `Save the consent form, show notes, host fields and benefit and limitation as <b>CandidateNo_M2L8_Publish.pdf</b>.`
  ],
  skills: ['Interview recording', 'Building a podcast intro', 'Multi-track podcast editing', 'ID3 metadata tags', 'Cover art for podcasts', 'Show notes and timestamps', 'RSS and podcast hosting'],
  check: [
    { c: 'Written consent obtained; clean recording with room tone', m: 2 },
    { c: 'Edited episode 3 to 5 minutes with all four segments in order', m: 3 },
    { c: 'Noise reduced, music ducked, levels normalised with no clipping', m: 3 },
    { c: 'MP3 meets the specification and carries complete metadata tags', m: 2 },
    { c: 'Cover art 3000 × 3000 px and readable at thumbnail size', m: 2 },
    { c: 'Show notes with timestamps and credits; RSS, benefit and limitation explained; files named correctly', m: 3 }
  ],
  tip: `In a podcast, the RSS feed is what you publish; the apps (Apple Podcasts, Spotify and others) read that feed. Update your episode once on the host and every app shows the new version. That is a strong point to make when asked about distribution.`
},

/* ===================== MODULE 3: MOBILE APP DEVELOPMENT ===================== */
{
  id: 'M3-L1', sec: 'M3', app: 'plan', level: 'Starter',
  title: `Map the Mobile Ecosystem: Who Makes an App Work?`,
  time: 60,
  brief: `<p>Jerome, Island Pulse Media's mobile developer, is building <b>GND Bus Buddy</b> app, which shows when the next minibus leaves from St. George's to Grand Anse, Grenville or Gouyave. Before he codes, he wants a visual map of everyone the app depends on, from the phone in a passenger's hand to the submarine cable under the sea.</p>
<p>This lab covers <b>The Mobile Ecosystem</b>: content, infrastructure, devices and users, carriers, consumers and the enabling environment (policy, regulation and developers). You will create a visual map or simulation showing how users, devices, developers, networks and policies interact, with real Caribbean examples.</p>`,
  data: `<h4>Ecosystem players to place on your map</h4>
<table><thead><tr><th>Layer</th><th>Examples (real organisations are named as examples only)</th></tr></thead><tbody>
<tr><td>Users and consumers</td><td>Commuters, students, cruise visitors, bus drivers</td></tr>
<tr><td>Devices</td><td>Android phones, iPhones, tablets, smartwatches</td></tr>
<tr><td>Operating systems and app stores</td><td>Android and Google Play, iOS and the App Store</td></tr>
<tr><td>Carriers and telcos</td><td>Digicel, Flow and other mobile operators in your territory</td></tr>
<tr><td>Infrastructure</td><td>Cell towers, 4G and 5G networks, submarine fibre cables, data centres, cloud hosting, GPS satellites</td></tr>
<tr><td>Content and services</td><td>Bus timetables, live GPS data, maps API, payment gateway</td></tr>
<tr><td>Developers</td><td>Jerome, local start-ups, freelance designers</td></tr>
<tr><td>Enabling environment</td><td>Telecom regulator (for example NTRC in Grenada, ECTEL for OECS states), data protection laws, government transport department, developer communities and hackathons</td></tr>
</tbody></table>
<h4>Scenario for the "ripple effect"</h4>
<p class="passage">A storm damages a cell tower near St. George's. Mobile data in the capital drops to 2G speeds for three days.</p>`,
  tasks: [
    `In <b>Miro</b>, <b>FigJam</b>, Canva or on A3 paper, place "GND Bus Buddy" at the centre of your map.`,
    `Arrange the players from the data table in labelled rings or zones (for example users and devices near the centre, infrastructure and policy further out). Use a different colour for each layer and add a key.`,
    `Draw at least <b>ten arrows</b> between players. Label each arrow with what flows along it: data, money, rules, content, feedback or signal.`,
    `Highlight one <b>money flow</b> (for example, user pays data bundle to carrier; app store takes a share of paid apps) and one <b>rules flow</b> (for example, regulator licenses spectrum to carriers).`,
    `Add a callout for the <b>Caribbean context</b>: one connectivity challenge and one local opportunity for the app.`,
    `Apply the ripple-effect scenario. Trace the impact with red arrows: who is affected first, second and third? Write three bullet points.`,
    `Suggest one design decision Jerome could make so the app still works in the scenario (for example cached timetables that work offline, or SMS fallback).`,
    `Add a short paragraph (60 to 80 words) explaining the word <b>interdependence</b> using your map.`,
    `Export the map as <b>CandidateNo_M3L1_Ecosystem.png</b> (at least 1920 px wide) or photograph your A3 sheet flat and in good light.`,
    `Save the map, scenario bullets and paragraph in one document named <b>CandidateNo_M3L1_Ecosystem.pdf</b>.`
  ],
  skills: ['Ecosystem components', 'Carriers and infrastructure', 'Enabling environment and regulation', 'Interdependence', 'Visual mapping', 'Designing for low connectivity'],
  check: [
    { c: 'All eight layers placed and labelled with a colour key', m: 3 },
    { c: 'Ten or more labelled arrows, including one money flow and one rules flow', m: 4 },
    { c: 'Caribbean challenge and opportunity identified', m: 2 },
    { c: 'Ripple effect traced in three logical steps with an offline design solution', m: 3 },
    { c: 'Interdependence explained clearly using the map', m: 2 },
    { c: 'PNG and PDF correctly named and readable', m: 1 }
  ],
  tip: `When a question says "discuss the relationships", a list of players earns low marks. Examiners want links: "Carriers depend on regulators for spectrum licences; developers depend on carriers for affordable data, because users will not download a large app on an expensive data plan."`
},
{
  id: 'M3-L2', sec: 'M3', app: 'plan', level: 'Core',
  title: `Local Problem, Local App: Concept Sheet and User Personas`,
  time: 75,
  brief: `<p>Island Pulse Media is entering a youth hackathon, the <b>Island Ideas App Challenge</b>. Teams must propose a mobile app that solves a real local problem in their own territory. Jerome needs a one-page concept sheet and three user personas before the team designs a single screen.</p>
<p>This lab covers <b>Benefits of Local Apps</b> and <b>Tools and Techniques</b> (conceptualisation): apps that address local needs such as school services, agriculture, disaster preparedness, health, safety, heritage, civic services, small businesses and cultural connection; universal yet locally relevant examples (bus schedules, restaurant reviews, hotel rankings, popular destinations); social and cultural linkages; and an app's purpose, target users and core features.</p>`,
  data: `<h4>Problem bank (choose one, or propose your own with evidence)</h4>
<table><thead><tr><th>Area</th><th>Local problem</th></tr></thead><tbody>
<tr><td>Disaster preparedness</td><td>During hurricane season, families do not know where the nearest shelter is or what to pack</td></tr>
<tr><td>Transport</td><td>Minibus times are not published, so students wait a long time at the stop</td></tr>
<tr><td>Small business</td><td>Roadside food vendors and food-truck owners cannot easily tell customers where they are parked tonight</td></tr>
<tr><td>Heritage</td><td>Young people know little about historic sites such as old forts, plantation ruins and courthouses</td></tr>
<tr><td>Agriculture</td><td>Backyard farmers in Dominica and Grenada cannot find buyers for surplus produce</td></tr>
<tr><td>School services</td><td>Parents miss school notices sent home on paper</td></tr>
</tbody></table>
<h4>Persona template</h4>
<p>Name, age, location, occupation, device and data plan, languages, digital skills (low, medium, high), goals, frustrations, quote, a typical day using the app.</p>
<h4>Value proposition formula</h4>
<p class="passage">For [target user] who [need or problem], [App name] is a [type of app] that [key benefit]. Unlike [current alternative], it [unique difference].</p>`,
  tasks: [
    `Choose a problem from the bank. Write a <b>problem statement</b> (40 words or fewer) and two pieces of evidence that the problem is real (for example a survey of 10 classmates, a news report, an interview).`,
    `Give your app a short name (one or two words) that is not already a well-known app.`,
    `Write the <b>value proposition</b> using the formula.`,
    `List the <b>MVP core features</b>: exactly three must-have features and two "later" features. Explain why each must-have is essential.`,
    `Write <b>three personas</b> using the template. Make them different: for example a 16-year-old student with a prepaid Android plan, a 45-year-old shop owner with medium skills, and a 70-year-old grandparent who prefers Papiamentu or Spanish or French.`,
    `For each persona, write one <b>user story</b>: "As a [user], I want to [action] so that [benefit]."`,
    `Explain three <b>benefits</b> of building this app locally rather than using an international app: one social, one cultural and one economic (for example local jobs, local data, local languages).`,
    `Name one existing app (international or Caribbean) that partly solves the problem and say what it misses for your users.`,
    `Lay out everything on a one-page <b>concept sheet</b> in Canva or Docs (A4). Use headings, a simple logo sketch and the three persona cards.`,
    `Export as <b>CandidateNo_M3L2_Concept.pdf</b>. Keep your survey or interview notes as <b>CandidateNo_M3L2_Evidence.pdf</b>.`
  ],
  skills: ['Problem definition', 'Value proposition', 'MVP features', 'User personas', 'User stories', 'Local benefits analysis'],
  check: [
    { c: 'Clear problem statement supported by two pieces of evidence', m: 2 },
    { c: 'Value proposition follows the formula and is specific', m: 2 },
    { c: 'Three justified MVP features and two later features', m: 3 },
    { c: 'Three distinct, realistic personas with user stories', m: 4 },
    { c: 'Social, cultural and economic benefits explained; competitor gap identified', m: 3 },
    { c: 'One-page concept sheet and evidence correctly named', m: 1 }
  ],
  tip: `Your SBA product should be a local social or entrepreneurial product. This concept sheet is a ready-made start for the SBA proposal: problem statement, target audience and justification are all marked there.`
},
{
  id: 'M3-L3', sec: 'M3', app: 'design', level: 'Core',
  title: `Paper to Pixels: Wireframes and User Flow in Figma`,
  time: 90,
  brief: `<p>Using your concept from M3-L2 (or <b>Shelter Ready Bahamas</b> hurricane app if you prefer), you will sketch paper wireframes, then build digital wireframes and a user flow in Figma that Jerome can test with real users.</p>
<p>This lab covers <b>Tools and Techniques to Create a Mobile Application</b>: wireframing, prototyping, user flows and interface design. You will create wireframes or prototypes with tools such as Figma, showing user flow and interface design.</p>`,
  data: `<h4>Shelter Ready Bahamas: core screens (if you use this app)</h4>
<table><thead><tr><th>Screen</th><th>Content</th></tr></thead><tbody>
<tr><td>1. Splash / onboarding</td><td>Logo, choose language (English, Spanish, French, Papiamentu)</td></tr>
<tr><td>2. Home</td><td>Storm status banner, three big buttons: Find Shelter, My Kit, Alerts</td></tr>
<tr><td>3. Find Shelter</td><td>Map, list of nearest shelters with distance and capacity status</td></tr>
<tr><td>4. Shelter detail</td><td>Address, what to bring, "Get directions" button</td></tr>
<tr><td>5. My Kit</td><td>Checklist: water, torch, batteries, documents in a plastic bag, medicines</td></tr>
<tr><td>6. Alerts</td><td>Push alert history with time stamps</td></tr>
</tbody></table>
<h4>Mobile design rules</h4>
<ul><li>Frame: iPhone 14 / 15 (390 × 844) or Android medium (412 × 915)</li><li>Touch targets at least 44 × 44 pt (Apple) or 48 × 48 dp (Android)</li><li>Primary actions in the bottom half (thumb zone)</li><li>Body text at least 16 px</li></ul>
<h4>User flow symbols</h4>
<p>Oval = start or end; rectangle = screen; diamond = decision; arrow = action (label it, for example "tap Find Shelter").</p>`,
  tasks: [
    `On paper, draw a 3 × 2 grid of phone outlines. Sketch <b>six low-fidelity wireframes</b> (crazy-8 style: quick, black marker, no colour) for your core screens.`,
    `Annotate each paper wireframe with at least two notes (for example "big button for one-handed use", "works offline").`,
    `Photograph or scan the paper sheet flat. Save it as <b>CandidateNo_M3L3_Paper.jpg</b>.`,
    `In Figma, create six mobile frames named with screen numbers (01 Splash, 02 Home and so on).`,
    `Build <b>mid-fidelity</b> wireframes in greyscale only: rectangles, placeholder text and simple icons. Use a 4-column layout grid with 16 px margins.`,
    `Make sure every tappable element is at least 44 × 44 px and that primary buttons sit in the thumb zone. Add a red note on any element that breaks a rule, then fix it.`,
    `Make a reusable <b>component</b> for the bottom navigation bar and use it on every main screen.`,
    `On a separate Figma page (or FigJam), draw a <b>user flow</b> for the main task (for example "Find the nearest shelter and get directions") using the correct symbols. Include at least one decision diamond (for example "Location permission allowed?").`,
    `Link the frames in Prototype mode so a tester can complete the main task. Add a back action on every screen after Home.`,
    `Test with one person from a persona group. Record how many taps it took and one point of confusion. Note one change you would make.`,
    `Export the six frames at 1x as one PDF (select frames &gt; Export &gt; PDF) named <b>CandidateNo_M3L3_Wireframes.pdf</b> and the user flow as <b>CandidateNo_M3L3_UserFlow.png</b>.`
  ],
  skills: ['Low-fidelity sketching', 'Mid-fidelity wireframes', 'Touch targets and thumb zone', 'Components', 'User flow diagrams', 'Prototype testing'],
  check: [
    { c: 'Six annotated paper wireframes, clearly photographed or scanned', m: 3 },
    { c: 'Six greyscale Figma wireframes on a consistent grid', m: 3 },
    { c: 'Touch targets and thumb zone rules applied; bottom nav component reused', m: 2 },
    { c: 'User flow uses correct symbols and includes a decision point', m: 3 },
    { c: 'Linked prototype completes the main task with back actions', m: 2 },
    { c: 'Test result recorded; PDF and PNG correctly named', m: 2 }
  ],
  tip: `Keep wireframes greyscale. If you add colour too early, testers comment on the colours instead of on whether they can find the shelter. Colour belongs in the high-fidelity stage.`
},
{
  id: 'M3-L4', sec: 'M3', app: 'app', level: 'Challenge',
  title: `Build a Working Prototype in MIT App Inventor`,
  time: 90,
  brief: `<p>Jerome wants a working Android prototype of <b>Shelter Ready Bahamas</b> app (or your own app from M3-L2) to show at the hackathon. MIT App Inventor lets you build it with drag-and-drop design and blocks, then test it live on a phone.</p>
<p>This lab covers <b>Tools and Techniques to Create a Mobile Application</b>: the overview and use of mobile application tools and online app builders, including no-code and low-code app builders, and basic app testing, debugging, feedback and refinement.</p>`,
  data: `<h4>Screens and components</h4>
<table><thead><tr><th>Screen</th><th>Components (Designer view)</th></tr></thead><tbody>
<tr><td>Screen1 (Home)</td><td>Image (logo), Label (lblStatus "No active storm"), Button btnShelter "Find Shelter", Button btnKit "My Kit", Button btnCall "Emergency 911"</td></tr>
<tr><td>ShelterScreen</td><td>ListView lvShelters, Button btnBack, ActivityStarter (for maps)</td></tr>
<tr><td>KitScreen</td><td>Five CheckBoxes, Label lblProgress, Button btnSave, Button btnBack, TinyDB (TinyDB1)</td></tr>
</tbody></table>
<h4>Practice shelter list (entries for testing only)</h4>
<pre><code>Fox Hill Community Centre (practice)
Carmichael Sports Hall (practice)
Seagrape Bay Secondary School Gym (practice)
Bain Town Church Hall (practice)</code></pre>
<h4>Key blocks (pseudo-code)</h4>
<pre><code>when btnShelter.Click   -&gt; open another screen  screenName "ShelterScreen"
when ShelterScreen.Initialize -&gt; set lvShelters.ElementsFromString to "A,B,C,D"
when lvShelters.AfterPicking  -&gt; set ActivityStarter1.DataUri to
        join "geo:0,0?q=" + lvShelters.Selection ; call ActivityStarter1.StartActivity
when KitScreen checkbox Changed -&gt; count ticked boxes ; set lblProgress.Text to join count "/5 ready"
when btnSave.Click      -&gt; call TinyDB1.StoreValue tag "kit" value (list of checkbox states)
when KitScreen.Initialize -&gt; get TinyDB1 "kit" and restore checkboxes
when btnBack.Click      -&gt; close screen</code></pre>`,
  tasks: [
    `Sign in to <b>ai2.appinventor.mit.edu</b> and start a new project named <b>CandidateNo_ShelterReady</b> (no spaces allowed; use an underscore).`,
    `In the Designer, build Screen1 with the components in the table. Set the Screen1 title, a background colour from your palette, and make all buttons at least 60 px high and Fill parent width.`,
    `Add the two other screens (Add Screen) and their components. Rename every component with a clear prefix (btn, lbl, lv, chk) so the blocks are easy to read.`,
    `In the Blocks editor, code the navigation: Find Shelter and My Kit open their screens; every Back button uses <b>close screen</b>.`,
    `Code the shelter list using ElementsFromString with the practice list. When a shelter is picked, open it in the phone's map app using ActivityStarter (Action: android.intent.action.VIEW).`,
    `Code the kit checklist: when any checkbox changes, count the ticked boxes and show "3/5 ready". Store the states in <b>TinyDB</b> so they remain after the app closes.`,
    `Code the emergency button to open the dialler with a <b>PhoneCall</b> component or ActivityStarter with DataUri "tel:911" (check the correct emergency number for your territory).`,
    `<b>Test live</b>: install MIT AI2 Companion on an Android phone, choose Connect &gt; AI Companion and scan the code (or use the emulator). Test every button.`,
    `<b>Debug:</b> keep a test log table with columns test, expected result, actual result, pass or fail, fix. Record at least six tests including one bug you found and fixed.`,
    `Ask one classmate to use the app without help. Record one piece of feedback and make one refinement.`,
    `Export the source: Projects &gt; Export selected project (.aia). Name it <b>CandidateNo_M3L4_ShelterReady.aia</b>. If allowed, also Build &gt; Android App (.apk) and save the APK.`,
    `Save screenshots of three screens, a screenshot of your blocks, and the test log as <b>CandidateNo_M3L4_Testing.pdf</b>.`
  ],
  skills: ['No-code and low-code app building', 'Designer and Blocks', 'Multi-screen navigation', 'Local storage with TinyDB', 'Live testing with the Companion', 'Debugging and test logs'],
  check: [
    { c: 'Three screens with all components, clear naming and accessible button sizes', m: 3 },
    { c: 'Navigation and back buttons work on every screen', m: 2 },
    { c: 'Shelter list opens the map app; emergency button opens the dialler', m: 3 },
    { c: 'Checklist counts progress and saves with TinyDB', m: 3 },
    { c: 'Test log with six tests, one fixed bug and one user refinement', m: 3 },
    { c: '.aia exported and evidence PDF correctly named', m: 1 }
  ],
  tip: `Testing is an examinable skill. A test log is strong evidence: it shows expected versus actual results. "It worked" is not a test result; "Tapped Find Shelter, ShelterScreen opened in under 1 second: pass" is.`
},
{
  id: 'M3-L5', sec: 'M3', app: 'app', level: 'Core',
  title: `UX Audit: Testing an App Against the Seven Factors`,
  time: 60,
  brief: `<p>A Caribbean ferry company, <b>Blue Channel Ferries</b>, which runs boats between Kingstown, Bequia and Union Island, has a booking app that customers complain about. Zara has asked you to carry out a <b>UX audit</b> and recommend fixes. You may audit your own M3-L4 prototype instead, or any free app on your phone (do not publish negative claims about a real company; keep the report private for class).</p>
<p>This lab covers <b>Factors that Impact the Mobile User Experience</b>: screen size, resolution and touch interface; bandwidth, connectivity and data usage; portability and context of use; device performance, including processing power, storage and battery life; accessibility and inclusive design; physical environment (lighting, noise, movement, location); and user profile (age, ability, digital skills, language, culture).</p>`,
  data: `<h4>Customer complaints for Blue Channel Ferries</h4>
<ul>
<li>"The Book button is tiny and right at the top. I can't reach it holding my bag and my child."</li>
<li>"On the dock in the sun I can't read the light grey text."</li>
<li>"The app is 180 MB and takes ages to download on my roaming data."</li>
<li>"It crashed twice on my older phone and drained my battery."</li>
<li>"My grandmother only speaks French; the app is English only."</li>
<li>"The boarding pass needs Internet to open, and the signal at the pier is weak."</li>
<li>"Screen reader just says 'button, button, button'."</li>
</ul>
<h4>Audit scale</h4>
<p>Rate each factor from 1 (very poor) to 5 (excellent).</p>`,
  tasks: [
    `Create an audit table with these columns: Factor, What I tested, Evidence (screenshot or quote), Rating 1 to 5, Problem, Recommendation, Priority (High, Medium, Low).`,
    `List the <b>seven factors</b> as rows: screen size and touch, bandwidth and data, portability and context, processing power and battery, accessibility, environment, user profile.`,
    `Match each customer complaint to the correct factor. Some factors may have more than one complaint.`,
    `If auditing a real app or your prototype, test on a phone: turn on the phone's screen reader (TalkBack or VoiceOver) for 2 minutes, set the screen to low brightness outside or near a window, and switch to slow data or airplane mode. Record what happens.`,
    `Rate each factor and give one specific <b>recommendation</b> (for example "Move Book button to bottom bar, 48 dp high", "Cache boarding pass for offline use", "Add French and Spanish languages").`,
    `Assign a <b>priority</b> to each fix, considering how many users are affected and how hard it is to fix.`,
    `Choose the <b>two highest-priority</b> fixes and redraw the affected screen (paper or Figma) as a before and after.`,
    `Write a 100 to 150 word summary for the client that explains why the user profile of ferry passengers (tourists, families, older travellers, roaming data) makes these fixes urgent.`,
    `Export the before and after screens as PNGs and add them to the report.`,
    `Save the full audit as <b>CandidateNo_M3L5_UXAudit.pdf</b>.`
  ],
  skills: ['Seven mobile UX factors', 'Heuristic evaluation', 'Accessibility testing with screen readers', 'Prioritising fixes', 'Before and after redesign', 'Client reporting'],
  check: [
    { c: 'Audit table includes all seven factors with ratings', m: 3 },
    { c: 'Each complaint correctly matched to a factor', m: 3 },
    { c: 'Specific, realistic recommendations with priorities', m: 4 },
    { c: 'Before and after redesign of two high-priority screens', m: 3 },
    { c: 'Client summary links fixes to the user profile; file correctly named', m: 2 }
  ],
  tip: `"Bandwidth" and "processing power" are different factors. Slow loading because of weak signal at the pier is bandwidth. An app freezing on an older phone even with good Wi-Fi is processing power. Name the right one in Paper 02.`
},
{
  id: 'M3-L6', sec: 'M3', app: 'design', level: 'Core',
  title: `Get Discovered: App Store Listing and ASO`,
  time: 75,
  brief: `<p><b>Lolo Locator</b> app helps people find food trucks and lolos open tonight across Sint Maarten and Saint-Martin. It is ready for Google Play and the Apple App Store. Keisha needs a complete store listing that follows <b>App Store Optimisation (ASO)</b> best practice so the app appears when people search.</p>
<p>This lab covers <b>Marketing and Distributing Mobile Applications</b>: distribution models (app stores, direct downloads, enterprise distribution and web-based access) that let users discover, test, review, rate, purchase, download and update apps, and marketing through social media, websites, email, influencers, search, advertising, public relations and community outreach.</p>`,
  data: `<h4>App facts</h4>
<ul><li>Free with optional "Lolo Pass" (US$1.99 a month) for exclusive deals</li><li>Features: live map of open lolos, menus and prices, ratings, "Open now" filter, WhatsApp order button</li><li>Languages: English, French, Dutch, Spanish</li><li>Audience: residents and visitors, 18 and over</li></ul>
<h4>Store limits (check current store guidelines; these are commonly published limits)</h4>
<table><thead><tr><th>Field</th><th>Google Play</th><th>Apple App Store</th></tr></thead><tbody>
<tr><td>App name or title</td><td>30 characters</td><td>30 characters</td></tr>
<tr><td>Short description or subtitle</td><td>80 characters (short description)</td><td>30 characters (subtitle)</td></tr>
<tr><td>Keywords field</td><td>None (keywords come from text)</td><td>100 characters, comma-separated</td></tr>
<tr><td>Full description</td><td>Up to 4,000 characters</td><td>Up to 4,000 characters</td></tr>
<tr><td>Icon</td><td>512 × 512 px PNG</td><td>1024 × 1024 px PNG</td></tr>
<tr><td>Feature graphic</td><td>1024 × 500 px</td><td>Not used</td></tr>
<tr><td>Screenshots</td><td>At least 2</td><td>At least 1, sized for the device</td></tr>
</tbody></table>
<h4>Keyword research (search volumes from a practice tool)</h4>
<table><thead><tr><th>Keyword</th><th>Searches per month</th><th>Competition</th></tr></thead><tbody>
<tr><td>food trucks near me</td><td>High</td><td>High</td></tr>
<tr><td>St Maarten food</td><td>Medium</td><td>Low</td></tr>
<tr><td>lolo</td><td>Low</td><td>Very low</td></tr>
<tr><td>Caribbean BBQ</td><td>Medium</td><td>Medium</td></tr>
<tr><td>street food SXM</td><td>Low</td><td>Low</td></tr>
<tr><td>restaurant deals</td><td>High</td><td>High</td></tr>
</tbody></table>`,
  tasks: [
    `Choose <b>five keywords</b> from the research table (or add your own) and justify each choice in one line, balancing search volume against competition.`,
    `Write an app <b>title</b> for Google Play (30 characters or fewer) that includes the main keyword, for example "Lolo Locator: SXM Street Food". Count the characters and write the count.`,
    `Write a Google Play <b>short description</b> (80 characters or fewer) and an Apple <b>subtitle</b> (30 characters or fewer).`,
    `Write the Apple <b>keyword field</b> (100 characters or fewer, commas, no spaces after commas, no repeats of words already in the title).`,
    `Write a <b>full description</b> of 250 to 400 words: a hook in the first two lines, a bulleted feature list, the Lolo Pass explained honestly (price and what is free), and a call to action. Avoid keyword stuffing.`,
    `Design the <b>icon</b> in Canva or Inkscape at 1024 × 1024 px. Keep it simple, with no tiny text, and test it at 48 px. Export a 512 × 512 PNG for Google Play too.`,
    `Design <b>four screenshots</b> (1080 × 1920 px) using your app screens or mock-ups. Each has a short benefit caption at the top (for example "See who's open tonight").`,
    `Design the Google Play <b>feature graphic</b> (1024 × 500 px).`,
    `Write a short plan for getting the first <b>ratings and reviews</b>: beta testers, an in-app review prompt after a successful order, and replying to reviews.`,
    `Map the <b>user journey</b> in six steps (discover, test, review, purchase, download, retain) and name one marketing action for each step (for example a TikTok video for discover, a push notification for retain).`,
    `Name one distribution option other than the app stores (direct download of an APK, enterprise distribution or a progressive web app) and one risk or benefit of it.`,
    `Save the listing text as <b>CandidateNo_M3L6_Listing.pdf</b> and all graphics in a folder <b>CandidateNo_M3L6_Assets</b> using names like Icon_1024.png, Screen1.png and Feature_1024x500.png.`
  ],
  skills: ['App Store Optimisation', 'Keyword selection', 'Store listing copywriting', 'Icon and screenshot design', 'Ratings and reviews strategy', 'User journey and distribution models'],
  check: [
    { c: 'Five justified keywords balancing volume and competition', m: 2 },
    { c: 'Title, short description, subtitle and keyword field within character limits', m: 3 },
    { c: 'Honest, scannable full description with hook, features and CTA', m: 2 },
    { c: 'Icon, four captioned screenshots and feature graphic at correct sizes', m: 4 },
    { c: 'Ratings plan and six-step user journey with marketing actions', m: 3 },
    { c: 'Alternative distribution option explained; files correctly named', m: 1 }
  ],
  tip: `ASO is SEO for app stores. The two biggest ranking signals you control are the <b>title</b> and the <b>keywords</b>; the biggest one you earn is <b>ratings</b>. Mention all three when asked how to improve an app's visibility.`
},
{
  id: 'M3-L7', sec: 'M3', app: 'plan', level: 'Core',
  title: `Monetisation Lab: Comparing Revenue Models`,
  time: 60,
  brief: `<p>Island Pulse Media has three app ideas on the table, and each needs a different way to earn or raise money. Jerome and Keisha disagree about which revenue model suits each one. You will calculate, compare and recommend.</p>
<p>This lab covers <b>Revenue Models</b>: commercial models (paid apps, freemium, in-app purchases, in-app advertising, subscriptions, developer fees and app licensing or white-label fees), open-source apps funded by crowdfunding, donations, grants and sponsorship, and civic, charity and social-good apps. Evaluation should consider <b>user value, privacy, accessibility, ethics and long-term sustainability</b>.</p>`,
  data: `<h4>The three apps</h4>
<table><thead><tr><th>App</th><th>Description</th><th>Expected users in year 1</th></tr></thead><tbody>
<tr><td>Soca Steps</td><td>Dance workout videos with Caribbean music</td><td>10,000</td></tr>
<tr><td>Shelter Ready Bahamas</td><td>Hurricane preparedness and shelter finder</td><td>15,000</td></tr>
<tr><td>BookIt Salon</td><td>Booking app that salons across the region can rebrand as their own</td><td>40 salons</td></tr>
</tbody></table>
<h4>Practice figures (for calculation only)</h4>
<table><thead><tr><th>Model</th><th>Assumption</th></tr></thead><tbody>
<tr><td>Paid app</td><td>US$2.99 once; 3% of users would pay</td></tr>
<tr><td>Freemium + subscription</td><td>US$3.99 a month; 4% of users subscribe for an average of 5 months</td></tr>
<tr><td>In-app advertising</td><td>About US$0.50 earned per user per year</td></tr>
<tr><td>In-app purchases</td><td>US$0.99 workout packs; 8% of users buy an average of 2 packs</td></tr>
<tr><td>White-label licence</td><td>US$300 set-up + US$25 a month per salon</td></tr>
<tr><td>Grant or sponsorship</td><td>One-off US$8,000 from a regional foundation</td></tr>
<tr><td>Donations</td><td>1% of users donate an average of US$5</td></tr>
</tbody></table>
<p><b>Note:</b> app stores usually take a commission on paid apps and in-app purchases (commonly 15% to 30%). For this lab, subtract 15% from paid app, subscription and in-app purchase revenue.</p>`,
  tasks: [
    `Open Google Sheets or Excel. Create one sheet named <b>Revenue</b> with a row for each app and a column for each model that could reasonably apply.`,
    `Using <b>formulas</b> (not a calculator), work out year 1 revenue for each app under at least three models. Example for paid app: =10000*3%*2.99*(1-15%).`,
    `For BookIt Salon, calculate the white-label licence income for 40 salons for 12 months, and compare it with charging each salon a one-time developer fee of US$900.`,
    `Format the currency cells as US$ with two decimals and highlight the highest figure for each app.`,
    `Build a <b>clustered bar chart</b> comparing the models for Soca Steps. Give it a title and axis labels.`,
    `On a second sheet named <b>Evaluation</b>, score each model for each app from 1 to 5 against the five evaluation criteria: user value, privacy, accessibility, ethics and sustainability.`,
    `Explain why heavy in-app advertising or data collection could be unethical for Shelter Ready Bahamas in a hurricane emergency.`,
    `Recommend <b>one model (or a hybrid)</b> for each app in 50 to 80 words each, using both the money and the evaluation scores.`,
    `Identify which of the three is a <b>civic or social-good</b> app and explain how it could be sustained after the grant runs out (for example sponsorship from local businesses, government partnership, donations).`,
    `Save the spreadsheet as <b>CandidateNo_M3L7_Revenue.xlsx</b> and export the chart and recommendations as <b>CandidateNo_M3L7_Recommendations.pdf</b>.`
  ],
  skills: ['Commercial revenue models', 'White-label licensing', 'Open-source and civic funding', 'Spreadsheet formulas', 'Charts', 'Ethical evaluation'],
  check: [
    { c: 'Correct formulas for at least three models per app, including the 15% commission', m: 4 },
    { c: 'White-label vs developer fee comparison calculated correctly', m: 2 },
    { c: 'Labelled bar chart for Soca Steps', m: 2 },
    { c: 'Evaluation sheet scores all five evaluation criteria', m: 2 },
    { c: 'Justified recommendation for each app using money and ethics', m: 3 },
    { c: 'Civic app sustainability explained; files correctly named', m: 2 }
  ],
  tip: `Freemium is <b>not</b> the same as free with ads. Freemium means the core app is free and premium features cost money. An app can combine freemium with ads, but in Paper 01 pick the answer that matches the definition exactly.`
},
{
  id: 'M3-L8', sec: 'M3', app: 'present', level: 'Challenge',
  title: `Future Forward: Mobile and Design Trends Report for the Caribbean`,
  time: 90,
  brief: `<p><b>Caribbean Youth Tech Forum</b> has invited Island Pulse Media to give a 5-minute talk on "What's next for mobile in the Caribbean?" Zara wants a short slide deck backed by real research, with clear links to the six driving factors that appear in all three modules of the syllabus.</p>
<p>This lab covers <b>Factors Influencing Trends in the Mobile Ecosystem</b>: commoditisation, pervasiveness of technology, affordability, accessibility, adoption, user behaviour, empowerment, emerging trends and research tools. Trends include AI integration, mobile payments, 5G, IoT, AR, wearables, progressive web apps, low-code and no-code tools, digital identity systems and a stronger focus on cybersecurity, privacy and accessibility. The same factors appear in Module 1 (visual design) and Module 2 (web publishing).</p>`,
  data: `<h4>Trends to choose from (pick four)</h4>
<table><thead><tr><th>Trend</th><th>Caribbean angle to investigate</th></tr></thead><tbody>
<tr><td>Mobile payments and mobile money</td><td>Digital wallets and central bank digital currencies in the region (for example the Bahamas Sand Dollar, JAM-DEX in Jamaica)</td></tr>
<tr><td>5G and edge computing</td><td>Which territories have launched 5G; what it means for small islands</td></tr>
<tr><td>AI-powered apps</td><td>AI translation for multilingual islands; AI tools for small businesses</td></tr>
<tr><td>AR and VR</td><td>Heritage tours of forts and historic towns; tourism previews</td></tr>
<tr><td>Super apps</td><td>Could one app combine bus, payments and food delivery for a small island?</td></tr>
<tr><td>Digital identity and e-government</td><td>Online government services and digital ID in the region</td></tr>
<tr><td>Wearables and IoT</td><td>Health monitoring; smart water and energy meters</td></tr>
<tr><td>Privacy and data protection</td><td>Regional data protection acts and GDPR's influence</td></tr>
<tr><td>Low-code and no-code</td><td>More young Caribbean creators building apps without full coding</td></tr>
<tr><td>Dark mode, glassmorphism, micro-interactions</td><td>Visual design trends inside apps</td></tr>
</tbody></table>
<h4>Research tools</h4>
<p>Google Trends, Statista, Sensor Tower or data.ai (formerly App Annie), ITU and GSMA reports, World Bank data, Behance and Dribbble (design trends), news sites such as the Jamaica Gleaner and regional business press.</p>
<p><b>Statistics rule:</b> use figures only from a named source with a year (for example "ITU, 2024"). If you cannot verify a number, write "check the latest ITU figure" rather than guessing.</p>`,
  tasks: [
    `Choose <b>four trends</b>, at least one recent trend (for example digital identity, PWAs, wearables or low-code).`,
    `Research each trend with at least <b>two different research tools</b> from the list. Record your sources in a table: tool or site, what you found, date accessed.`,
    `Use <b>Google Trends</b> to compare two search terms (for example "mobile money" vs "online banking") for your region over five years. Screenshot the chart.`,
    `For each trend, identify which of the six <b>driving factors</b> (commoditisation, pervasiveness, affordability, accessibility, adoption, empowerment) explains it best. Justify in one sentence.`,
    `Build a 10-slide deck in Google Slides, Canva or PowerPoint: title, agenda, the six factors on one slide, four trend slides, Google Trends slide, "What this means for Caribbean app creators" slide, sources slide.`,
    `On each trend slide include: a one-line definition, one real or clearly labelled Caribbean example, one opportunity and one risk.`,
    `Include one slide that links the same factors to <b>visual design</b> (Module 1) or <b>web publishing</b> (Module 2), for example how affordability of smartphones made dark mode and mobile-first design standard.`,
    `Apply design principles: one idea per slide, no more than 30 words of text, consistent fonts and colours, images you have rights to use (credit them on the sources slide).`,
    `Write <b>speaker notes</b> for each slide so the whole talk lasts about 5 minutes.`,
    `Rehearse once and time yourself. Record the time on the final slide's notes.`,
    `Export the deck as <b>CandidateNo_M3L8_Trends.pdf</b> and the speaker notes as <b>CandidateNo_M3L8_Notes.pdf</b>.`
  ],
  skills: ['Trend research', 'Using research tools', 'Six driving factors', 'Evidence and citation', 'Slide design', 'Presenting with speaker notes'],
  check: [
    { c: 'Four trends, including at least one recent trend, each with definition, example, opportunity and risk', m: 4 },
    { c: 'Each trend correctly linked to a driving factor with justification', m: 3 },
    { c: 'Two or more research tools used; Google Trends comparison included', m: 2 },
    { c: 'Cross-module slide links factors to visual design or web publishing', m: 2 },
    { c: 'Slides follow design rules; sources and image credits listed', m: 2 },
    { c: 'Speaker notes for a 5-minute talk; PDFs correctly named', m: 2 }
  ],
  tip: `The six driving factors are the same in all three modules, so one well-learnt example per factor can earn marks in Module 1, 2 or 3. Learn them as a chain: commoditisation lowers cost, which raises affordability, which increases adoption, which leads to empowerment.`
}
]);
