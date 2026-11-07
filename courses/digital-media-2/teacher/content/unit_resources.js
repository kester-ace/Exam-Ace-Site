/* CAPE Digital Media Unit 2 (DME2): per-unit "Watch, play and simplify" resources.
   Developed by Kester Small. Based on the CAPE Digital Media syllabus.
   For every unit: arcade games that practise it, beginner YouTube searches (search links only, never fixed video IDs),
   a "dial it down" plain-language summary for students who need it simpler, and the Practical Labs that fit. */

/* Titles and icons for the play buttons (ids match tools/edpmgames.js). */
window.DM_UNIT_GAME_META = {
  'sba-markscheme': { t: 'SBA Mark Scheme', icon: '📝' },
  'funding-highlight': { t: 'Funding a Digital Media Project', icon: '💰' },
  'rootsway-sba': { t: 'Sample SBA: Rootsway SXM', icon: '🌐' },
  'binwise-sba': { t: 'Sample SBA: BinWise Belize', icon: '📘' },
  arcade: { t: 'Digital Media Unit 2 Arcade', icon: '🕹️' },
  anim: { t: 'Animation Studio', icon: '🎞️' },
  logolab: { t: 'Logo Lab: Colour Theory', icon: '🎨' },
  heroposter: { t: 'Hero Poster Studio', icon: '🦸' },
  lightingdirector: { t: 'Lighting Director', icon: '🎬' },
  onelight: { t: 'One-Light Studio', icon: '💡' },
  blemish: { t: 'Photo Editing Unit: blemish removal', icon: '🖌️' },
  webbuilder: { t: 'Web Builder Lab', icon: '💻' },
  webtime: { t: 'Web Time Machine', icon: '⏳' },
  appstudio: { t: 'App Studio: Idea to App Store', icon: '📱' },
  lologo: { t: 'LoloGo: example app', icon: '🍗' },
  'lologo-case': { t: 'LoloGo case study: lo-fi to hi-fi', icon: '📐' },
  shortcuts: { t: 'Shortcut Sprint', icon: '⌘' }
};

window.DM_UNIT_RESOURCES = {

  /* =========================== MODULE 1: VISUAL AND INTERACTIVE DESIGN =========================== */
  M1U1: {
    games: [
      { id: 'arcade', why: 'Quick-fire rounds on the design process stages, SCAMPER and Gantt chart terms.' },
      { id: 'lologo-case', why: 'Follow one real idea from problem and sketches all the way to a tested prototype.' }
    ],
    videos: [
      { t: 'The design process explained for beginners', q: 'design process steps explained for beginners', level: 'Beginner' },
      { t: 'How to make a storyboard', q: 'how to make a storyboard for a video beginners', level: 'Beginner' },
      { t: 'SCAMPER brainstorming technique', q: 'SCAMPER technique explained simply', level: 'Beginner' },
      { t: 'Gantt charts made simple', q: 'gantt chart explained simply for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Good digital products start with a clear problem, a purpose and a goal before anyone opens software.',
        'Know your audience: who they are, what they like and where they spend time online.',
        'Brainstorm lots of ideas first (mind maps, SCAMPER), then pick the best one.',
        'A storyboard shows each shot in order; a Gantt chart shows who does what and by when.',
        'A prototype is a test version you show real users so you can fix problems early.'
      ],
      hook: 'Plan it, sketch it, test it.',
      starter: { q: 'You are making a 30-second promo for a Kingston food truck. What should you draw before filming?', a: 'A storyboard: a simple sketch of each shot in order, with notes on camera angle, sound and timing.' }
    },
    labs: ['M1-L1']
  },

  M1U2: {
    games: [
      { id: 'logolab', why: 'Build a logo palette using complementary, analogous and triadic harmony rules.' },
      { id: 'heroposter', why: 'Use colour psychology to make a character read as a hero or a villain.' },
      { id: 'arcade', why: 'Match colour terms such as tint, shade, tone, RGB and CMYK.' }
    ],
    videos: [
      { t: 'Colour theory for beginners', q: 'colour theory basics for beginners', level: 'Beginner' },
      { t: 'Elements of design explained', q: 'elements of design line shape form space texture value explained', level: 'Beginner' },
      { t: 'RGB vs CMYK in simple terms', q: 'rgb vs cmyk explained simply for beginners', level: 'Beginner' },
      { t: 'Colour psychology in design', q: 'colour psychology in design explained for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'The elements of design are the building blocks: line, shape, form, space, texture, value and colour.',
        'Primary colours mix to make secondary colours; mix those again to get tertiary colours.',
        'Add white for a tint, black for a shade and grey for a tone.',
        'Screens use RGB (light), printers use CMYK (ink).',
        'Colours carry feelings: blue feels calm, red feels urgent, purple and black can feel villainous.'
      ],
      hook: 'Tint is white, shade is black.',
      starter: { q: 'Opposite colours on the colour wheel, such as blue and orange, are called what?', a: 'Complementary colours. They create strong contrast.' }
    },
    labs: ['M1-L2']
  },

  M1U2B: {
    games: [
      { id: 'heroposter', why: 'Place your subject on the rule of thirds and build a clear point of interest.' },
      { id: 'lightingdirector', why: 'See how camera angle and lighting change the mood of a frame.' },
      { id: 'arcade', why: 'Drill composition terms and the principles of interactive design.' }
    ],
    videos: [
      { t: 'Rule of thirds explained', q: 'rule of thirds explained for beginners photography', level: 'Beginner' },
      { t: 'The golden ratio in design', q: 'golden ratio in design explained simply', level: 'Beginner' },
      { t: 'Camera angles and shots for beginners', q: 'camera angles and shot types explained for beginners', level: 'Beginner' },
      { t: 'Principles of interaction design', q: 'principles of interaction design explained for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'The rule of thirds splits the frame into a 3 by 3 grid; put your subject on a line or crossing point.',
        'The point of interest is where the eye goes first; size, contrast and position control it.',
        'A low camera angle makes a subject look powerful; a high angle makes it look small.',
        'White space, alignment and proximity keep a layout clean and easy to read.',
        'Good interactive design is consistent, easy to learn and gives clear feedback when you tap.'
      ],
      hook: 'Thirds for the eye, space to breathe.',
      starter: { q: 'Where should you place a sunset horizon at Portsmouth Beach using the rule of thirds?', a: 'On the top or bottom third line, not in the exact middle of the frame.' }
    },
    labs: ['M1-L3']
  },

  M1U3: {
    games: [
      { id: 'arcade', why: 'Sort examples into indigenous and imported content and test key terms.' },
      { id: 'lologo', why: 'An example of a local app built around Sint Maarten food culture.' }
    ],
    videos: [
      { t: 'What is cultural representation in media?', q: 'cultural representation in media explained for students', level: 'Beginner' },
      { t: 'Caribbean animation studios', q: 'Caribbean animation industry documentary', level: 'Beginner' },
      { t: 'How to critique a film or video', q: 'how to analyse a film for beginners students', level: 'Beginner' },
      { t: 'Stereotypes in media explained', q: 'stereotypes in media explained for students', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Indigenous digital content is made by and about local people, in their own voice.',
        'Imported content comes from abroad and may not show Caribbean life accurately.',
        'Critique a product with clear criteria: story, visuals, sound, authenticity and audience.',
        'Good representation avoids stereotypes and shows real, varied Caribbean people.',
        'Local creators grow through funding, festivals, communities and helpful government policy.'
      ],
      hook: 'Our stories, our voice.',
      starter: { q: 'A Trinidadian animated short told in local dialect: indigenous or imported content?', a: 'Indigenous content. It is made locally and reflects local culture and voice.' }
    },
    labs: []
  },

  M1U4: {
    games: [
      { id: 'arcade', why: 'Match file formats such as MP4, MP3, PDF, PNG, JPEG and GIF to their best use.' },
      { id: 'shortcuts', why: 'Practise the import, export and save-as shortcuts you need for conversions.' }
    ],
    videos: [
      { t: 'JPEG vs PNG vs GIF explained', q: 'jpeg vs png vs gif explained for beginners', level: 'Beginner' },
      { t: 'Lossy vs lossless compression', q: 'lossy vs lossless compression explained simply', level: 'Beginner' },
      { t: 'Image resolution and file size', q: 'image resolution dpi and file size explained for beginners', level: 'Beginner' },
      { t: 'How to embed a video on a website', q: 'how to embed a youtube video on a website beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Content lives on different platforms: search engines, social media, app stores, marketplaces and more.',
        'Choose the format for the job: JPEG for photos, PNG for transparency, MP4 for video, MP3 for audio, PDF for documents.',
        'Compression makes files smaller; lossy loses some detail, lossless keeps it all.',
        'Higher resolution and colour depth mean better quality but bigger files.',
        'Cross-platform means your file works on phones, tablets and computers.'
      ],
      hook: 'Right format, right place.',
      starter: { q: 'Which format keeps a logo background transparent: JPEG or PNG?', a: 'PNG. JPEG does not support transparency.' }
    },
    labs: ['M1-L4']
  },

  M1U5: {
    games: [
      { id: 'lightingdirector', why: 'Set key, fill and back lights for a clean interview shot.' },
      { id: 'onelight', why: 'Light a subject well with only one lamp, as in a school studio.' },
      { id: 'blemish', why: 'Practise layers, selections and the healing tools used in image editing.' },
      { id: 'arcade', why: 'Quick rounds on layers, audio formats, lighting and MP4 export terms.' }
    ],
    videos: [
      { t: 'GIMP layers and masks for beginners', q: 'GIMP layers and layer masks tutorial for beginners', level: 'Beginner' },
      { t: 'Audacity basics: record and edit', q: 'Audacity tutorial for beginners record edit export', level: 'Beginner' },
      { t: 'OpenShot video editing for beginners', q: 'OpenShot video editor tutorial for beginners', level: 'Beginner' },
      { t: 'Three-point lighting explained', q: 'three point lighting explained for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Layers let you edit one part of an image without damaging the rest.',
        'In Audacity you can record, cut, mix tracks and export as MP3 or WAV.',
        'Steady your phone with a tripod or gimbal and record sound close to the speaker.',
        'Three-point lighting uses a key light, a fill light and a back light.',
        'Export video as MP4 with the right size for YouTube, Instagram or the web.'
      ],
      hook: 'Steady shot, clean sound, good light.',
      starter: { q: 'Which light is the main, brightest light in three-point lighting?', a: 'The key light.' }
    },
    labs: ['M1-L5']
  },

  M1U6: {
    games: [
      { id: 'anim', why: 'Set keyframes, timing and spacing to make motion feel natural.' },
      { id: 'arcade', why: 'Match the twelve principles of animation to their examples.' },
      { id: 'shortcuts', why: 'Learn the Blender and Animate shortcuts for keyframes and the timeline.' }
    ],
    videos: [
      { t: 'The 12 principles of animation', q: '12 principles of animation explained for beginners', level: 'Beginner' },
      { t: 'Bouncing ball animation tutorial', q: 'bouncing ball animation tutorial for beginners', level: 'Beginner' },
      { t: 'Blender for absolute beginners', q: 'Blender beginner tutorial keyframes bouncing ball', level: 'Beginner' },
      { t: 'Pencil2D basics', q: 'Pencil2D tutorial for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'A keyframe marks an important pose; tweening fills in the frames between.',
        'Timing is how many frames an action takes; spacing is how far things move each frame.',
        'Squash and stretch makes objects look soft and alive, like a bouncing ball.',
        'In 3D, models are made of vertices, edges and faces that form a mesh.',
        'Render your animation to MP4 or an image sequence when you are finished.'
      ],
      hook: 'Keyframes for poses, tweens between.',
      starter: { q: 'A ball squashes flat when it hits the ground. Which animation principle is this?', a: 'Squash and stretch.' }
    },
    labs: ['M1-L6', 'M1-L7']
  },

  M1U7: {
    games: [
      { id: 'arcade', why: 'Sort collaboration tools and electronic communities by their use.' },
      { id: 'shortcuts', why: 'Practise the shortcuts that speed up shared documents and team work.' }
    ],
    videos: [
      { t: 'Online collaboration tools for students', q: 'online collaboration tools for students explained', level: 'Beginner' },
      { t: 'What is netiquette?', q: 'netiquette explained for students', level: 'Beginner' },
      { t: 'Google Docs collaboration basics', q: 'google docs collaboration features tutorial beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Digital collaboration means working together online with tools such as Google Docs, Teams and Trello.',
        'Electronic communities are online groups, forums, wikis and Discord servers that share an interest.',
        'Collaboration saves time and links people across islands, but can bring distraction and miscommunication.',
        'Give every group member a clear role and deadline.',
        'Be polite, respectful and professional online, and keep evidence of your teamwork for the SBA.'
      ],
      hook: 'Share the work, show the work.',
      starter: { q: 'Name one tool your SBA group could use to edit the same document at the same time.', a: 'Google Docs (or Microsoft Word online in Teams).' }
    },
    labs: []
  },

  M1U8: {
    games: [
      { id: 'arcade', why: 'Match campaign terms such as reach, impressions and engagement rate.' },
      { id: 'appstudio', why: 'See how a product is launched and promoted to its audience.' }
    ],
    videos: [
      { t: 'How to plan a social media campaign', q: 'how to plan a social media marketing campaign beginners', level: 'Beginner' },
      { t: 'Mailchimp for beginners', q: 'Mailchimp tutorial for beginners email campaign', level: 'Beginner' },
      { t: 'Guerrilla and viral marketing explained', q: 'guerrilla marketing vs viral marketing explained', level: 'Beginner' },
      { t: 'Social media metrics explained', q: 'social media metrics reach impressions engagement explained', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'A promotional campaign has an objective, an audience, a message, channels and a schedule.',
        'Pick the platforms your audience uses: Instagram and TikTok for teens, LinkedIn for professionals.',
        'Content marketing gives useful blogs, vlogs and podcasts so people trust the brand.',
        'Email tools such as Mailchimp send newsletters to a list of subscribers.',
        'Measure success with numbers: reach, impressions, clicks and engagement rate.'
      ],
      hook: 'Know who, pick where, count it.',
      starter: { q: 'What does "reach" measure in a social media campaign?', a: 'The number of different people who saw the post.' }
    },
    labs: ['M1-L8']
  },

  M1U9: {
    games: [
      { id: 'webtime', why: 'See how design and the web changed over time and why trends shift.' },
      { id: 'arcade', why: 'Match interface trends such as glassmorphism and dark mode to examples.' }
    ],
    videos: [
      { t: 'UI design trends explained', q: 'UI design trends explained for beginners', level: 'Beginner' },
      { t: 'What is glassmorphism and neumorphism?', q: 'glassmorphism vs neumorphism explained', level: 'Beginner' },
      { t: 'AR vs VR explained', q: 'augmented reality vs virtual reality explained simply', level: 'Beginner' },
      { t: 'AI image tools and copyright', q: 'AI generated images copyright explained for students', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Design trends change because of new technology, cost, access, accessibility and what users want.',
        'Popular interface trends include dark mode, glassmorphism, neumorphism and micro-interactions.',
        'AI tools such as Adobe Firefly can make images fast, but raise questions about ethics and copyright.',
        'AR adds digital objects to the real world; VR puts you in a fully digital world.',
        'Track trends with Google Trends, Behance, Dribbble and Awwwards.'
      ],
      hook: 'AR adds, VR replaces.',
      starter: { q: 'A phone app that shows a 3D turtle swimming on your desk through the camera: AR or VR?', a: 'AR (augmented reality), because it adds digital content to the real world.' }
    },
    labs: []
  },

  M1U10: {
    games: [
      { id: 'sba-markscheme', why: 'Your Unit 2 mark scheme as a fillable marking sheet with totals, module split and Word or CSV download.' },
      { id: 'funding-highlight', why: "Highlight activity: weigh the benefit and disadvantage of seven funding sources before writing the proposal's funding section." },
      { id: 'rootsway-sba', why: 'A full Grade One sample Unit 2 website SBA with marking notes.' },
      { id: 'binwise-sba', why: 'A full Grade One sample Unit 2 SBA with marking notes: see how every mark is earned.' },
      { id: 'lologo-case', why: 'Use a full case study to see what a strong project proposal covers.' },
      { id: 'arcade', why: 'Test proposal terms: SMART objectives, budget lines and funding sources.' }
    ],
    videos: [
      { t: 'How to write a project proposal', q: 'how to write a project proposal for students', level: 'Beginner' },
      { t: 'SMART goals explained', q: 'SMART goals explained simply', level: 'Beginner' },
      { t: 'How to make a pitch deck', q: 'how to make a pitch deck for beginners', level: 'Beginner' },
      { t: 'What is crowdfunding?', q: 'what is crowdfunding explained simply', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'A proposal explains the problem, your solution, who it is for, and how and when you will make it.',
        'SMART objectives are specific, measurable, achievable, relevant and time-bound.',
        'Funding can come from grants, crowdfunding, sponsors or your own savings.',
        'An itemised budget lists every cost: equipment, software, people and hosting.',
        'A pitch deck is a short, visual presentation that sells your idea to stakeholders.'
      ],
      hook: 'Problem, plan, price, pitch.',
      starter: { q: 'Is "make a good app" a SMART objective? Why or why not?', a: 'No. It is not specific, measurable or time-bound. Better: "Launch a working prototype tested by 10 users by March."' }
    },
    labs: ['M1-L1', 'M1-L8']
  },

  /* =========================== MODULE 2: DIGITAL PUBLISHING AND WEB =========================== */
  M2U1: {
    games: [
      { id: 'webtime', why: 'Travel from ARPANET to Web 3.0 and the mobile web.' },
      { id: 'arcade', why: 'Match publishing terms such as ePub, ISBN and metadata.' }
    ],
    videos: [
      { t: 'History of the Internet for beginners', q: 'history of the internet explained for beginners', level: 'Beginner' },
      { t: 'What is digital publishing?', q: 'what is digital publishing explained', level: 'Beginner' },
      { t: 'ePub vs PDF explained', q: 'epub vs pdf explained for beginners', level: 'Beginner' },
      { t: 'What is an ISBN?', q: 'what is an ISBN explained simply', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Digital publishing means sharing books, magazines and articles on screens instead of paper.',
        'Tools such as Amazon KDP and Apple Books let anyone publish an e-book.',
        'ePub reflows to fit any screen; PDF keeps a fixed layout.',
        'An ISBN is a unique number for a book; metadata is the information that helps people find it.',
        'The Internet grew from ARPANET to the World Wide Web, then to social, mobile Web 2.0 and beyond.'
      ],
      hook: 'ePub flows, PDF stays.',
      starter: { q: 'Which e-book format adjusts the text to fit a small phone screen?', a: 'ePub (reflowable layout).' }
    },
    labs: ['M2-L1']
  },

  M2U2: {
    games: [
      { id: 'arcade', why: 'Test copyright, Creative Commons and fair use terms.' },
      { id: 'lologo-case', why: 'See storyboards, mock-ups and wireframes used to plan real content.' }
    ],
    videos: [
      { t: 'Writing for the web basics', q: 'writing for digital media tips for beginners', level: 'Beginner' },
      { t: 'Copyright explained for students', q: 'copyright explained for students', level: 'Beginner' },
      { t: 'Creative Commons licences explained', q: 'creative commons licenses explained simply', level: 'Beginner' },
      { t: 'How to write a video script', q: 'how to write a video script for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Writing for digital media is short, clear and made for the platform: blog, podcast or video.',
        'Plan before you make: storyboards, scripts, mock-ups and wireframes.',
        'Tell authentic Caribbean stories in real local voices.',
        'Copyright protects creators automatically; always credit and get permission.',
        'Copying and sharing other people\'s work without permission can be a crime.'
      ],
      hook: 'Plan it, own it, credit it.',
      starter: { q: 'You use a song from YouTube in your school promo without permission. What is the problem?', a: 'It breaks copyright. Use royalty-free or Creative Commons music and credit the creator.' }
    },
    labs: ['M2-L2']
  },

  M2U3: {
    games: [
      { id: 'lologo-case', why: 'Watch a design move from paper lo-fi sketches to a hi-fi Figma prototype.' },
      { id: 'heroposter', why: 'Practise balance, hierarchy and contrast in a layout.' },
      { id: 'arcade', why: 'Match site maps, navigational charts and prototype types.' }
    ],
    videos: [
      { t: 'Low-fidelity vs high-fidelity prototypes', q: 'low fidelity vs high fidelity prototype explained', level: 'Beginner' },
      { t: 'How to make a site map', q: 'how to create a website sitemap for beginners', level: 'Beginner' },
      { t: 'Figma prototyping for beginners', q: 'Figma prototype tutorial for beginners', level: 'Beginner' },
      { t: 'Visual hierarchy in design', q: 'visual hierarchy in design explained simply', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'A low-fidelity prototype is a quick paper sketch; a high-fidelity one looks like the real product.',
        'A site map shows all the pages of a website and how they link together.',
        'Design principles such as balance, alignment and contrast make layouts easy to read.',
        'Cloud tools such as Figma and Canva let teams design together online.',
        'In Figma, you link frames together so users can click through the prototype.'
      ],
      hook: 'Paper first, pixels next.',
      starter: { q: 'A sketch of a website homepage drawn with a pencil: low-fidelity or high-fidelity?', a: 'Low-fidelity.' }
    },
    labs: ['M2-L3']
  },

  M2U4: {
    games: [
      { id: 'webbuilder', why: 'Add headings, alt text and short paragraphs to make a page web-friendly.' },
      { id: 'arcade', why: 'Test SEO, creative brief and content licensing terms.' }
    ],
    videos: [
      { t: 'SEO for beginners', q: 'SEO explained for beginners', level: 'Beginner' },
      { t: 'How to write a creative brief', q: 'how to write a creative brief for beginners', level: 'Beginner' },
      { t: 'What is alt text?', q: 'what is alt text for images explained', level: 'Beginner' },
      { t: 'Optimise images for the web', q: 'how to optimise images for web beginners webp', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Content scope means deciding the purpose, topic, audience, platform and format first.',
        'A creative brief lists the target group, the content needed and the tone of voice.',
        'Web readers scan, so use short paragraphs, clear headings and bullet points.',
        'SEO uses keywords, titles and descriptions so search engines can find your page.',
        'Shrink images for the web (WebP or JPEG) and always add alt text.'
      ],
      hook: 'Short, scannable, searchable.',
      starter: { q: 'Why add alt text to a photo of Bay Street on a website?', a: 'It describes the image for screen-reader users and helps search engines understand the page.' }
    },
    labs: ['M2-L2']
  },

  M2U5: {
    games: [
      { id: 'blemish', why: 'Practise clean photo retouching and colour correction for web images.' },
      { id: 'onelight', why: 'Light a subject well when shooting web content with simple kit.' },
      { id: 'shortcuts', why: 'Speed up GIMP, Audacity and video editing with shortcuts.' },
      { id: 'arcade', why: 'Match capture devices, software types and caption terms.' }
    ],
    videos: [
      { t: 'Smartphone photography basics', q: 'smartphone photography tips for beginners composition', level: 'Beginner' },
      { t: 'Remove background in GIMP', q: 'GIMP remove background tutorial beginners', level: 'Beginner' },
      { t: 'Audacity noise reduction', q: 'Audacity noise reduction tutorial beginners', level: 'Beginner' },
      { t: 'How to start a podcast', q: 'how to start a podcast for beginners step by step', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Choose the right capture device: a phone is fine for most web content if it is steady.',
        'Use the rule of thirds, good framing and natural light when you shoot.',
        'Free tools (GIMP, Audacity, Kdenlive) can do most jobs that Adobe tools do.',
        'Clean up audio with noise reduction and balance the tracks.',
        'Add captions to video so everyone can follow, even with the sound off.'
      ],
      hook: 'Shoot steady, edit clean, caption it.',
      starter: { q: 'Name one free program to edit photos and one free program to edit audio.', a: 'GIMP for photos and Audacity for audio.' }
    },
    labs: ['M2-L8', 'M2-L6']
  },

  M2U6: {
    games: [
      { id: 'rootsway-sba', why: 'A full Grade One sample Unit 2 website SBA with marking notes.' },
      { id: 'webbuilder', why: 'Write real HTML tags and CSS rules and see the page change live.' },
      { id: 'shortcuts', why: 'Learn the VS Code shortcuts that make coding faster.' },
      { id: 'arcade', why: 'Match HTML tags and CSS properties to what they do.' }
    ],
    videos: [
      { t: 'HTML for absolute beginners', q: 'HTML tutorial for absolute beginners', level: 'Beginner' },
      { t: 'CSS basics for beginners', q: 'CSS tutorial for beginners', level: 'Beginner' },
      { t: 'The CSS box model explained', q: 'css box model explained simply', level: 'Beginner' },
      { t: 'Flexbox in 10 minutes', q: 'css flexbox tutorial for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'HTML builds the structure of a page: headings, paragraphs, lists, images and links.',
        'Every page has a doctype, a head (information) and a body (what you see).',
        'CSS adds the style: colours, fonts, spacing and layout.',
        'The box model is content, padding, border and margin, from inside to outside.',
        'Flexbox lines things up in rows or columns and helps pages work on phones.'
      ],
      hook: 'HTML builds, CSS styles.',
      starter: { q: 'Which HTML tag makes a link?', a: 'The a (anchor) tag, with an href attribute giving the web address.' }
    },
    labs: ['M2-L4', 'M2-L5', 'M2-L6']
  },

  M2U7: {
    games: [
      { id: 'webbuilder', why: 'Build a page and a simple form, then think about how its data is stored.' },
      { id: 'arcade', why: 'Test domain, DNS, hosting and security terms.' }
    ],
    videos: [
      { t: 'How DNS works', q: 'how DNS works explained simply', level: 'Beginner' },
      { t: 'Web hosting explained', q: 'types of web hosting explained for beginners', level: 'Beginner' },
      { t: 'What is HTTPS?', q: 'what is https explained simply', level: 'Beginner' },
      { t: 'Phishing explained', q: 'what is phishing explained for students', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'A domain name is the website\'s address; DNS turns that name into a number computers understand.',
        'Hosting is renting space on a server so your site is online all the time.',
        'Forms collect user data, so you must ask permission and keep that data safe.',
        'HTTPS, strong passwords and two-factor authentication protect a site and its users.',
        'Website builders are quick and easy; hand-coding gives you more control.'
      ],
      hook: 'Name, home, lock.',
      starter: { q: 'What does the padlock and "https" in the browser bar tell you?', a: 'The connection is encrypted, so data sent to the site is protected.' }
    },
    labs: ['M2-L7']
  },

  M2U8: {
    games: [
      { id: 'arcade', why: 'Sort examples into forms of digital publishing: blogs, podcasts, e-books and more.' },
      { id: 'webtime', why: 'See how each form of digital publishing appeared over time.' }
    ],
    videos: [
      { t: 'Types of digital publishing', q: 'types of digital publishing explained', level: 'Beginner' },
      { t: 'How to evaluate a website', q: 'how to evaluate a website credibility for students', level: 'Beginner' },
      { t: 'Blogs vs newsletters vs podcasts', q: 'blog vs newsletter vs podcast which is best explained', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Digital publishing comes in many forms: websites, blogs, social media, apps, podcasts, videos, e-books and newsletters.',
        'Classify each form by purpose, audience, platform and type of content.',
        'Judge a publication by its accuracy, authority, usability and accessibility.',
        'Some forms, such as podcasts and social video, have lots of Caribbean content; others have less.',
        'Choose the form that best suits your audience and your message.'
      ],
      hook: 'Fit the form to the audience.',
      starter: { q: 'A busy taxi driver wants news while driving. Which form of digital publishing suits them best?', a: 'A podcast, because it can be listened to without looking at a screen.' }
    },
    labs: ['M2-L8']
  },

  M2U9: {
    games: [
      { id: 'rootsway-sba', why: 'A full Grade One sample Unit 2 website SBA with marking notes.' },
      { id: 'arcade', why: 'Match platforms to hosted free, hosted paid and self-hosted types.' },
      { id: 'webbuilder', why: 'Compare a hand-built page with what a hosted platform does for you.' }
    ],
    videos: [
      { t: 'How to start a blog', q: 'how to start a blog for beginners', level: 'Beginner' },
      { t: 'How to upload to YouTube', q: 'how to upload a video to youtube for beginners', level: 'Beginner' },
      { t: 'Live streaming tips for beginners', q: 'live streaming tips for beginners setup', level: 'Beginner' },
      { t: 'How to edit Wikipedia', q: 'how to edit wikipedia for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Hosted free platforms (Blogger, WordPress.com) are easy but you control less.',
        'Self-hosted sites cost more but you own everything.',
        'Blogs need regular posts, good SEO and a community of readers.',
        'Wikipedia needs a neutral tone and reliable sources.',
        'Before going live, test your internet, lighting, sound and camera.'
      ],
      hook: 'Free is easy, owned is yours.',
      starter: { q: 'Before going live on Instagram for a Carnival band launch, name one thing to test.', a: 'The internet connection (or the sound, lighting or camera angle).' }
    },
    labs: ['M2-L7', 'M2-L8']
  },

  M2U10: {
    games: [
      { id: 'webtime', why: 'Follow how web publishing changed and where it is heading next.' },
      { id: 'arcade', why: 'Test CMS types, headless CMS and content workflow terms.' }
    ],
    videos: [
      { t: 'What is a CMS?', q: 'what is a content management system explained simply', level: 'Beginner' },
      { t: 'Headless CMS explained', q: 'headless cms explained simply for beginners', level: 'Beginner' },
      { t: 'WordPress for beginners', q: 'WordPress tutorial for beginners', level: 'Beginner' },
      { t: 'Web design trends', q: 'web publishing trends explained', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'A content management system (CMS) helps you create, store, edit and publish content without coding.',
        'A CMS can be self-hosted or cloud-hosted, open-source or proprietary.',
        'A headless CMS stores content and sends it to many places: websites, apps and smart screens.',
        'The content workflow is create, edit, tag, schedule, publish and update.',
        'Web publishing trends change with cheaper tools, more devices and new technology.'
      ],
      hook: 'Create once, publish everywhere.',
      starter: { q: 'Is WordPress an example of a CMS?', a: 'Yes. It is an open-source content management system.' }
    },
    labs: ['M2-L7']
  },

  /* =========================== MODULE 3: MOBILE DESIGN AND DEVELOPMENT =========================== */
  M3U1: {
    games: [
      { id: 'appstudio', why: 'See every ecosystem player an app needs, from developer to store to user.' },
      { id: 'arcade', why: 'Match carriers, regulators and ecosystem components to their roles.' }
    ],
    videos: [
      { t: 'What is the mobile ecosystem?', q: 'mobile ecosystem explained simply', level: 'Beginner' },
      { t: 'How mobile networks work', q: 'how mobile networks work explained for beginners', level: 'Beginner' },
      { t: 'What does a telecoms regulator do?', q: 'what does a telecommunications regulator do explained', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'The mobile ecosystem is everyone and everything that makes a phone useful: content, infrastructure, devices and users.',
        'Carriers such as Flow, Digicel and Flow provide the network signal and data.',
        'Regulators set the rules so that services are fair and safe.',
        'Every player depends on the others: no network, no app use.',
        'The Caribbean has coverage challenges but big chances for local apps.'
      ],
      hook: 'No signal, no app.',
      starter: { q: 'Name one mobile carrier that operates in your territory.', a: 'For example Digicel, Flow, bmobile or TelEm, depending on the territory.' }
    },
    labs: ['M3-L1']
  },

  M3U2: {
    games: [
      { id: 'appstudio', why: 'Choose a platform and development path for your app idea.' },
      { id: 'arcade', why: 'Sort features into Android, iOS and cross-platform.' }
    ],
    videos: [
      { t: 'Android vs iOS explained', q: 'android vs ios differences explained simply', level: 'Beginner' },
      { t: 'What is the Internet of Things?', q: 'internet of things explained simply', level: 'Beginner' },
      { t: 'Native vs cross-platform apps', q: 'native vs cross platform app development explained', level: 'Beginner' },
      { t: 'What is Flutter?', q: 'what is flutter explained for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Android is open source and runs on many brands; iOS runs only on Apple devices.',
        'Each platform has its own store: Google Play or the Apple App Store.',
        'Smart devices include phones, tablets, smartwatches and smart speakers.',
        'The Internet of Things connects everyday objects with sensors to the Internet.',
        'Cross-platform tools such as Flutter build one app for both Android and iOS.'
      ],
      hook: 'One code, two stores.',
      starter: { q: 'Which mobile operating system is open source: Android or iOS?', a: 'Android.' }
    },
    labs: ['M3-L1']
  },

  M3U3: {
    games: [
      { id: 'arcade', why: 'Test mobile money, infrastructure and Caribbean impact terms.' },
      { id: 'appstudio', why: 'Think about what Caribbean users need from a mobile app.' }
    ],
    videos: [
      { t: 'Mobile money explained', q: 'mobile money explained simply', level: 'Beginner' },
      { t: 'How submarine internet cables work', q: 'how undersea internet cables work explained', level: 'Beginner' },
      { t: '4G vs 5G explained', q: '4g vs 5g explained simply', level: 'Beginner' },
      { t: 'Mobile technology in agriculture', q: 'mobile technology in agriculture developing countries explained', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Most Caribbean people now use smartphones, but check the latest ITU and GSMA figures.',
        'Mobile phones help with banking, government services, health, farming, tourism and disaster alerts.',
        'The Caribbean consumes much more digital content than it produces.',
        'Submarine cables and 4G and 5G networks carry the Internet to our islands.',
        'Mobile apps and social media keep the diaspora connected to home.'
      ],
      hook: 'Consume less, create more.',
      starter: { q: 'Give one way a mobile phone helped people in Sint Maarten after Hurricane Irma.', a: 'Sending updates and alerts, contacting family abroad, or sharing information on WhatsApp.' }
    },
    labs: ['M3-L8']
  },

  M3U4: {
    games: [
      { id: 'lologo', why: 'Explore a local app idea built around Sint Maarten food.' },
      { id: 'appstudio', why: 'Turn a local problem into an app idea.' },
      { id: 'arcade', why: 'Match social, cultural and economic benefits to examples.' }
    ],
    videos: [
      { t: 'How to come up with an app idea', q: 'how to come up with an app idea solve a problem', level: 'Beginner' },
      { t: 'Social impact apps explained', q: 'social impact apps examples explained', level: 'Beginner' },
      { t: 'Caribbean tech startups', q: 'Caribbean tech startups app developers', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Local apps solve local problems: school services, bus times, events and tourism.',
        'Universal app types, such as restaurant reviews, work better with local knowledge.',
        'Local apps share Caribbean culture, news and entertainment.',
        'Building apps here creates jobs and new businesses, and can earn money from abroad.',
        'Social impact apps help with disaster preparation, health and community safety.'
      ],
      hook: 'Local problem, local app.',
      starter: { q: 'Name one problem in Trinidad and Tobago that a mobile app could help solve.', a: 'For example, finding bus times, ordering from a roadside food vendor, hurricane alerts or school announcements.' }
    },
    labs: ['M3-L2']
  },

  M3U5: {
    games: [
      { id: 'appstudio', why: 'Check your app design against screen size, data use and accessibility.' },
      { id: 'lologo', why: 'Test an example app and spot good and weak user experience choices.' },
      { id: 'arcade', why: 'Match each UX factor to its effect and a design fix.' }
    ],
    videos: [
      { t: 'What is mobile UX?', q: 'mobile user experience explained for beginners', level: 'Beginner' },
      { t: 'Designing for accessibility', q: 'mobile app accessibility explained for beginners', level: 'Beginner' },
      { t: 'Touch target sizes explained', q: 'touch target size mobile design explained', level: 'Beginner' },
      { t: 'What is an offline-first app?', q: 'offline first app explained simply', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Small screens need big buttons, clear text and simple layouts.',
        'Slow or costly data means apps should load fast and work offline where possible.',
        'People use phones on the move, so tasks must be quick and easy.',
        'Accessible apps work with screen readers, large text and good colour contrast.',
        'Bright sun, noise and the user\'s age or skill all change how an app should be designed.'
      ],
      hook: 'Factor, effect, fix.',
      starter: { q: 'A beach bar app is hard to read in bright sunlight. What should the designer change?', a: 'Increase the colour contrast and text size.' }
    },
    labs: ['M3-L5']
  },

  M3U6: {
    games: [
      { id: 'binwise-sba', why: 'A full Grade One sample Unit 2 SBA with marking notes: see how every mark is earned.' },
      { id: 'appstudio', why: 'Go from idea to wireframe to a working app step by step.' },
      { id: 'lologo-case', why: 'Follow a real app from lo-fi wireframes to a hi-fi prototype.' },
      { id: 'lologo', why: 'Try the finished example app and see what your build could become.' },
      { id: 'arcade', why: 'Test MVP, wireframe, native and no-code terms.' }
    ],
    videos: [
      { t: 'MIT App Inventor for beginners', q: 'MIT App Inventor tutorial for beginners', level: 'Beginner' },
      { t: 'Wireframing an app in Figma', q: 'how to wireframe a mobile app in Figma beginners', level: 'Beginner' },
      { t: 'What is an MVP?', q: 'minimum viable product explained simply', level: 'Beginner' },
      { t: 'User flow diagrams explained', q: 'user flow diagram explained for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Start with the app\'s purpose, users and a minimum viable product (MVP): the smallest version that works.',
        'Sketch wireframes on paper first, then make them in Figma.',
        'Native apps use Android Studio or Xcode; no-code tools such as MIT App Inventor are faster to learn.',
        'In App Inventor, the Designer is for screens and the Blocks Editor is for what the app does.',
        'Test, find bugs, fix them and ask users for feedback.'
      ],
      hook: 'Sketch, build, test, repeat.',
      starter: { q: 'In MIT App Inventor, where do you program what happens when a button is clicked?', a: 'In the Blocks Editor.' }
    },
    labs: ['M3-L3', 'M3-L4']
  },

  M3U7: {
    games: [
      { id: 'appstudio', why: 'Take an app to the store with a title, icon, screenshots and keywords.' },
      { id: 'arcade', why: 'Order the user journey stages and match ASO terms.' }
    ],
    videos: [
      { t: 'App Store Optimisation for beginners', q: 'app store optimization ASO explained for beginners', level: 'Beginner' },
      { t: 'How to publish an app on Google Play', q: 'how to publish an app on google play beginners', level: 'Beginner' },
      { t: 'What is beta testing?', q: 'what is beta testing explained simply', level: 'Beginner' },
      { t: 'How to market an app', q: 'how to market a mobile app for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Most apps reach users through Google Play or the Apple App Store.',
        'Sideloading apps from outside the stores can be risky.',
        'The user journey goes: discover, try, review, download, update and keep using.',
        'ASO means a clear title, keywords, a strong icon and good screenshots so people find your app.',
        'Beta test with real users and build a community before you launch.'
      ],
      hook: 'Get found, get tried, get kept.',
      starter: { q: 'What does ASO stand for?', a: 'App Store Optimisation.' }
    },
    labs: ['M3-L6']
  },

  M3U8: {
    games: [
      { id: 'appstudio', why: 'Choose a revenue model for your app and see the trade-offs.' },
      { id: 'arcade', why: 'Match revenue models such as freemium and subscriptions to examples.' }
    ],
    videos: [
      { t: 'How do free apps make money?', q: 'how do free apps make money explained', level: 'Beginner' },
      { t: 'Freemium model explained', q: 'freemium business model explained simply', level: 'Beginner' },
      { t: 'What is a white-label app?', q: 'what is a white label app explained', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'A revenue model is how an app makes money.',
        'Freemium apps are free to download, with paid extras.',
        'Apps can also earn from ads, subscriptions or a one-off price.',
        'Developers can earn by building apps for clients or selling white-label apps.',
        'Social good apps may be funded by grants, donations or crowdfunding.'
      ],
      hook: 'Free to get, pay to grow.',
      starter: { q: 'A game is free but you pay for extra levels. Which revenue model is this?', a: 'Freemium with in-app purchases.' }
    },
    labs: ['M3-L7']
  },

  M3U9: {
    games: [
      { id: 'webtime', why: 'See how past changes help you predict the next mobile trends.' },
      { id: 'arcade', why: 'Match emerging trends such as 5G, PWAs and super apps to examples.' }
    ],
    videos: [
      { t: 'Mobile app trends explained', q: 'mobile app trends explained for beginners', level: 'Beginner' },
      { t: 'What is a super app?', q: 'what is a super app explained', level: 'Beginner' },
      { t: 'What is a progressive web app?', q: 'progressive web app explained simply', level: 'Beginner' },
      { t: 'GDPR explained simply', q: 'GDPR explained simply for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Mobile trends happen because phones get cheaper, networks spread and users want more.',
        'Big trends include AI, mobile payments, 5G, wearables, AR and low-code tools.',
        'Super apps put many services, such as chat, payments and rides, inside one app.',
        'Privacy and data laws such as GDPR protect users\' personal information.',
        'In the Caribbean, mobile money, digital ID and e-government are growing.'
      ],
      hook: 'Cheaper, faster, smarter, safer.',
      starter: { q: 'Name one emerging mobile trend.', a: 'For example, AI assistants, mobile payments, 5G, wearables or AR.' }
    },
    labs: ['M3-L8']
  }
};
