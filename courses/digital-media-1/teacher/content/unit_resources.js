/* CAPE Digital Media Unit 1 (DME1): per-unit "Watch, play and simplify" resources.
   Developed by Kester Small. Based on the CAPE Digital Media syllabus.
   For every unit: arcade games that practise it, beginner YouTube searches (search links only, never fixed video IDs),
   a "dial it down" plain-language summary for students who need it simpler, and the Practical Labs that fit. */

/* Titles and icons for the play buttons (ids match tools/edpmgames.js). */
window.DM_UNIT_GAME_META = {
  arcade: { t: 'Digital Media Unit 1 Arcade', icon: '🕹️' },
  dmquest: { t: 'Digital Media Quest', icon: '🗺️' },
  p2bank: { t: 'Paper 02 Practice Bank', icon: '📚' },
  dmquiz1: { t: 'Class quiz: What Is Digital Media?', icon: '📝' },
  dmtest1: { t: 'Digital Media Test 1', icon: '🧾' },
  revision: { t: '60-Task Evaluation Trainer', icon: '🔎' },
  'p2-2023': { t: '2023 Paper 02 guided practice', icon: '🔒' },
  classactivities: { t: 'Scavenger Hunt and Wacky Briefs', icon: '📸' },
  webtime: { t: 'Web Time Machine', icon: '⏳' },
  ip: { t: 'IP Court', icon: '⚖️' },
  ecosystem: { t: 'Ecosystem Builder', icon: '🌐' },
  valuechain: { t: 'Value Chain Tycoon', icon: '💰' },
  fundingtick: { t: 'Funding Methods Tick Table', icon: '💰' },
  interview: { t: 'The Interview Room', icon: '🎙️' },
  cv: { t: 'Résumé Studio', icon: '📄' },
  tz: { t: 'Time Zone Navigator', icon: '🌐' },
  inbox: { t: 'Inbox Hero', icon: '✉️' },
  people: { t: 'Office Life: People Skills', icon: '🤝' },
  heroposter: { t: 'Hero Poster Studio', icon: '🦸' },
  logolab: { t: 'Logo Lab: Colour Theory', icon: '🎨' },
  lightingdirector: { t: 'Lighting Director', icon: '🎬' },
  onelight: { t: 'One-Light Studio', icon: '💡' },
  blemish: { t: 'Photo Editing: blemish removal', icon: '🖌️' },
  lologo: { t: 'LoloGo: example app', icon: '🍗' },
  'lologo-case': { t: 'LoloGo case study: lo-fi to hi-fi', icon: '📐' },
  'lologo-sba': { t: 'Sample SBA: LoloGo', icon: '📘' },
  'lologo-pair': { t: 'Sample Pair Assignment: LoloGo', icon: '📝' },
  pcbuild: { t: 'PC Build Lab', icon: '🖥️' },
  print: { t: 'Print Lab', icon: '🖨️' },
  shortcuts: { t: 'Shortcut Sprint', icon: '⌘' }
};

window.DM_UNIT_RESOURCES = {

  /* =========================== MODULE 1: UNDERSTANDING DIGITAL MEDIA =========================== */
  M1U1: {
    games: [
      { id: 'dmquiz1', why: 'A class quiz on digital media categories and key terms.' },
      { id: 'arcade', why: 'Acronym Blitz and Term Stack drill the core vocabulary fast.' },
      { id: 'dmquest', why: 'Review quest across all three modules: start with the terms.' },
      { id: 'dmtest1', why: 'A one-chance check-in you can print or save as a PDF.' }
    ],
    videos: [
      { t: 'What is digital media? (beginner explainer)', q: 'what is digital media explained for beginners', level: 'Beginner' },
      { t: 'Pixels and resolution made simple', q: 'what is a pixel and resolution explained for beginners', level: 'Beginner' },
      { t: 'Raster vs vector in five minutes', q: 'raster vs vector explained simply for beginners', level: 'Beginner' },
      { t: 'What are file formats? JPEG, PNG, MP3, MP4', q: 'file formats explained for beginners jpeg png mp3 mp4', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Traditional media is physical: paper, film, vinyl. Digital media is made of data that a computer can store and share.',
        'Every digital picture is made of tiny squares called pixels. More pixels means more detail.',
        'Raster images are pixels (photos). Vector images are maths shapes (logos) and never go blurry when you make them bigger.',
        'Compression makes files smaller. Lossy throws some detail away; lossless keeps everything.'
      ],
      hook: 'Pixels for photos, vectors scale.',
      starter: { q: 'A newspaper printed on paper: traditional or digital media?', a: 'Traditional media. It is physical. The same newspaper as a website or app would be digital media.' }
    },
    labs: ['M1-L4']
  },

  M1U2: {
    games: [
      { id: 'webtime', why: 'Travel from analogue through Web 1.0 to Web 5.0, then bridge the digital divide.' },
      { id: 'arcade', why: 'Drop Zone and Match Up include timeline and Web-generation questions.' },
      { id: 'dmquest', why: 'Review quest: the evolution stage.' }
    ],
    videos: [
      { t: 'Web 1.0, 2.0 and 3.0 explained for beginners', q: 'web 1.0 2.0 3.0 explained for beginners', level: 'Beginner' },
      { t: 'What is Web 4.0 and Web 5.0?', q: 'what is web 4.0 and web 5.0 explained simply', level: 'Beginner' },
      { t: 'Analogue vs digital, simply', q: 'analogue vs digital explained simply for beginners', level: 'Beginner' },
      { t: 'How films first moved: persistence of vision', q: 'persistence of vision explained zoetrope history of cinema for beginners', level: 'Beginner' },
      { t: 'What is the digital divide?', q: 'what is the digital divide explained simply', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Media moved from analogue (physical, like film and tape) to digital (data, like streaming).',
        'Web 1.0 = read only. Web 2.0 = read and write (social media). Web 3.0 = smart and linked data.',
        'Web 4.0 and Web 5.0 are newer ideas: the web works alongside us and even senses feelings.',
        'Fast internet, cheap phones and AI push media forward. Cost and poor connection hold people back.'
      ],
      hook: 'Read, write, smart, together, feel.',
      starter: { q: 'You post a video and people comment on it. Which Web generation is that?', a: 'Web 2.0, the read-write or social web: users create and share content, not just read it.' }
    },
    labs: ['M1-L1']
  },

  M1U3: {
    games: [
      { id: 'dmquiz1', why: 'Categories of digital media: art, audio, animation and video.' },
      { id: 'classactivities', why: 'The Virtual Scavenger Hunt: find real examples of each type of digital media.' },
      { id: 'arcade', why: 'Impostor in the Studio: spot the tool that does not belong.' },
      { id: 'shortcuts', why: 'Get quick with the tools you will use in practical work.' }
    ],
    videos: [
      { t: 'Types of digital media with examples', q: 'types of digital media with examples for beginners', level: 'Beginner' },
      { t: 'Canva for complete beginners', q: 'canva tutorial for complete beginners', level: 'Beginner' },
      { t: 'Choosing the right chart', q: 'how to choose the right chart for your data beginners', level: 'Beginner' },
      { t: 'What is an infographic?', q: 'what is an infographic how to make one beginners', level: 'Beginner' },
      { t: 'What is virtual and augmented reality?', q: 'virtual reality vs augmented reality explained simply', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Digital media comes in types: art, audio, animation, apps and games, photography, video, social, data design and immersive (VR/AR).',
        'To classify something, ask: what is it made of, and what does the user do with it?',
        'Each job has a tool: Audacity for sound, GIMP or Photopea for photos, OpenShot for video, Canva for posters.',
        'Charts must be honest: start the scale fairly and label everything.'
      ],
      hook: 'Name the type, pick tools.',
      starter: { q: 'A podcast episode is which type of digital media?', a: 'Digital audio. It is sound recorded, edited and shared as a digital file.' }
    },
    labs: ['M1-L4', 'M1-L3']
  },

  M1U4: {
    games: [
      { id: 'classactivities', why: 'Wacky Caribbean Client Briefs: help local businesses go digital.' },
      { id: 'people', why: 'A branching digital workday: see how businesses really use digital media.' },
      { id: 'arcade', why: 'Island Rush questions on adoption, benefits and disruption.' },
      { id: 'revision', why: 'Judge answers on business impact as Correct, Partially Correct or Incorrect.' }
    ],
    videos: [
      { t: 'Diffusion of innovations, simply', q: 'diffusion of innovations innovators early adopters explained simply', level: 'Beginner' },
      { t: 'What is digital transformation?', q: 'what is digital transformation explained for beginners small business', level: 'Beginner' },
      { t: 'What is disruptive innovation?', q: 'disruptive innovation explained simply examples', level: 'Beginner' },
      { t: 'Remote, hybrid and gig work explained', q: 'remote hybrid gig work explained for students', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Businesses use digital media to sell, advertise, talk to customers and work faster.',
        'New technology spreads in steps: innovators, early adopters, early majority, late majority, laggards.',
        'Benefits: wider reach and lower costs. Limitations: cost of set-up, skills and security risks.',
        'Firms that refuse to change can be disrupted, like video rental shops after streaming.'
      ],
      hook: 'Adapt early or get disrupted.',
      starter: { q: 'Your grandmother only got a smartphone after everyone else had one. Which adopter group is she in?', a: 'Laggards, the last group to adopt a new technology.' }
    },
    labs: ['M1-L3']
  },

  M1U5: {
    games: [
      { id: 'ip', why: 'IP Court: decide copyright, licence and fair-dealing cases.' },
      { id: 'arcade', why: 'Match Up rounds on Creative Commons and open source.' },
      { id: 'dmquest', why: 'Review quest: the open content stage.' }
    ],
    videos: [
      { t: 'Creative Commons for beginners', q: 'creative commons licenses explained for beginners', level: 'Beginner' },
      { t: 'Open source software in simple words', q: 'open source software explained in simple words', level: 'Beginner' },
      { t: 'What is public domain?', q: 'what is public domain explained simply', level: 'Beginner' },
      { t: 'What is open data?', q: 'what is open data explained simply', level: 'Beginner' },
      { t: 'Data, information and knowledge', q: 'data information knowledge wisdom pyramid explained simply', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'The Open Movement says knowledge and tools should be free to use, change and share.',
        'Open source = you can see and change the code (GIMP, Audacity).',
        'Creative Commons = the creator chooses rules, such as BY (credit me) or NC (no selling).',
        'Public domain = no one owns it any more; anyone can use it.',
        'Open does not mean "no rules": you still credit and follow the licence.'
      ],
      hook: 'Open still means credit them.',
      starter: { q: 'A photo has a CC BY licence. What must you do if you use it?', a: 'Credit (attribute) the creator. BY means "by": give their name and the licence.' }
    },
    labs: ['M1-L2']
  },

  M1U6: {
    games: [
      { id: 'classactivities', why: 'Wacky Caribbean Client Briefs: pitch local content ideas.' },
      { id: 'arcade', why: 'Downtown Location Scout and platform questions.' },
      { id: 'p2bank', why: 'Paper 02 practice: choosing and justifying platforms.' },
      { id: 'revision', why: 'Judge platform-choice answers like an examiner.' }
    ],
    videos: [
      { t: 'What is a digital media platform?', q: 'what is a digital media platform explained', level: 'Beginner' },
      { t: 'How the algorithm decides what you see', q: 'how social media algorithms work explained for beginners', level: 'Beginner' },
      { t: 'Know your target audience', q: 'how to find your target audience explained for beginners', level: 'Beginner' },
      { t: 'Telling your culture\'s story ethically', q: 'cultural representation in media explained for students', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Caribbean-centric content tells our own stories, in our own voices, for our own needs.',
        'Barriers: small markets, cost and slow internet. Benefits: tourism, culture and new jobs.',
        'A platform is where content lives and is shared: YouTube, TikTok, Instagram, a website, a podcast app.',
        'Choose a platform by asking: who is my audience, what format, and what does it cost?'
      ],
      hook: 'Right story, right place, people.',
      starter: { q: 'You want short vertical videos for teenagers in Grenada. Name one suitable platform.', a: 'TikTok (or Instagram Reels or YouTube Shorts): short vertical video with a young audience.' }
    },
    labs: ['M1-L5', 'M1-L3']
  },

  M1U7: {
    games: [
      { id: 'arcade', why: 'Drop Zone rounds on misinformation, deepfakes and online risks.' },
      { id: 'revision', why: 'Evaluate answers about opportunities, pitfalls and AI.' },
      { id: 'dmquest', why: 'Review quest: the risks and AI stage.' }
    ],
    videos: [
      { t: 'Misinformation vs disinformation', q: 'misinformation vs disinformation explained simply', level: 'Beginner' },
      { t: 'What is a deepfake?', q: 'what is a deepfake explained for beginners how to spot', level: 'Beginner' },
      { t: 'Your digital footprint for teens', q: 'digital footprint explained for teens', level: 'Beginner' },
      { t: 'What is generative AI?', q: 'what is generative AI explained simply for beginners', level: 'Beginner' },
      { t: 'Cyberbullying and staying safe online', q: 'cyberbullying explained online safety for teenagers', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Digital media brings chances: jobs, learning, selling worldwide and staying in touch.',
        'It also brings risks: fake news, cyberbullying, scams and a digital footprint that lasts.',
        'Misinformation is false by mistake. Disinformation is false on purpose.',
        'AI can save time, but it can be wrong, biased or used to make deepfakes. Always check and label.'
      ],
      hook: 'Stop, check, then share it.',
      starter: { q: 'Your aunt shares a fake hurricane warning because she thought it was real. Misinformation or disinformation?', a: 'Misinformation: it is false, but she shared it by mistake, not to trick anyone.' }
    },
    labs: ['M1-L6']
  },

  M1U8: {
    games: [
      { id: 'ip', why: 'IP Court: copyright, patent or trademark, and plagiarism cases.' },
      { id: 'blemish', why: 'Ethical retouching with consent: see digital ethics in practice.' },
      { id: 'arcade', why: 'Match Up and Drop Zone on IP and digital ethics.' },
      { id: 'p2bank', why: 'Paper 02 practice with IP and ethics considerations.' }
    ],
    videos: [
      { t: 'Copyright, trademark and patent for beginners', q: 'copyright trademark patent difference explained for beginners', level: 'Beginner' },
      { t: 'What is plagiarism and how to avoid it', q: 'what is plagiarism how to avoid it for students', level: 'Beginner' },
      { t: 'Royalty-free does not mean free', q: 'royalty free vs free images explained simply', level: 'Beginner' },
      { t: 'APA 7 citations in five minutes', q: 'APA 7th edition citation for beginners', level: 'Beginner' },
      { t: 'Digital citizenship basics', q: 'digital citizenship explained for teens', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Intellectual property (IP) is something made with your mind: a song, a logo, an invention.',
        'Copyright protects creative work. A trademark protects a brand name or logo. A patent protects an invention.',
        'Using someone\'s work without permission is infringement. Copying words without credit is plagiarism.',
        'Ethics online: respect privacy, get consent, do not spread hate, and be honest about edits.'
      ],
      hook: 'Ask, credit, respect, stay honest.',
      starter: { q: 'A local bakery wants to protect its logo. Copyright, trademark or patent?', a: 'Trademark: it protects brand names and logos.' }
    },
    labs: ['M1-L2']
  },

  /* =========================== MODULE 2: THE DIGITAL MEDIA ECOSYSTEM =========================== */
  M2U1: {
    games: [
      { id: 'arcade', why: 'Persona and digital native questions in Term Stack and Island Rush.' },
      { id: 'revision', why: 'Judge answers about digital users and their rights.' },
      { id: 'dmquest', why: 'Review quest: the digital users stage.' }
    ],
    videos: [
      { t: 'Digital natives vs digital immigrants, simply', q: 'digital natives vs digital immigrants explained simply', level: 'Beginner' },
      { t: 'Generations: Gen Z, Gen Alpha and more', q: 'generations explained baby boomers gen x millennials gen z gen alpha', level: 'Beginner' },
      { t: 'What is a user persona?', q: 'what is a user persona explained for beginners', level: 'Beginner' },
      { t: 'What is a prosumer?', q: 'what is a prosumer explained', level: 'Beginner' },
      { t: 'Online privacy for teens', q: 'online privacy explained for teenagers', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Digital natives grew up with the internet. Digital immigrants learned it later in life.',
        'Users have rights and needs: access, privacy, digital literacy and safety.',
        'A persona is an imagined but realistic user that helps you design for real people.',
        'A prosumer both consumes and produces content, like someone who watches and makes TikToks.'
      ],
      hook: 'Know your user, design better.',
      starter: { q: 'Someone learned to use e-mail at age 50. Digital native or digital immigrant?', a: 'Digital immigrant: they adopted digital technology later in life.' }
    },
    labs: ['M2-L1', 'M2-L4']
  },

  M2U2: {
    games: [
      { id: 'ecosystem', why: 'Map a Caribbean start-up\'s ecosystem and survive event cards.' },
      { id: 'arcade', why: 'Match Up rounds on ecosystem elements and trends.' },
      { id: 'dmquest', why: 'Review quest: the ecosystem stage.' }
    ],
    videos: [
      { t: 'What is the digital media ecosystem?', q: 'what is the digital media ecosystem explained simply', level: 'Beginner' },
      { t: 'How the internet works, for beginners', q: 'how does the internet work explained for beginners', level: 'Beginner' },
      { t: 'What is the cloud?', q: 'what is the cloud explained simply', level: 'Beginner' },
      { t: 'What is the creator economy?', q: 'what is the creator economy explained', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'The digital media ecosystem is everything that works together: creators, platforms, audiences, advertisers, devices and networks.',
        'If one part changes (for example, an app changes its algorithm), the others feel it.',
        'Infrastructure is the hidden part: undersea cables, data centres, mobile towers.',
        'Trends: mobile-first, AI and the creator economy.'
      ],
      hook: 'One part moves, all feel.',
      starter: { q: 'Name two parts of the digital media ecosystem.', a: 'Any two of: creators, platforms, audiences, advertisers, devices, internet providers, regulators.' }
    },
    labs: ['M2-L4']
  },

  M2U3: {
    games: [
      { id: 'valuechain', why: 'Take a Caribbean song, film, game or vlog from idea to income.' },
      { id: 'ecosystem', why: 'Run the value chain inside a start-up simulation.' },
      { id: 'arcade', why: 'Value chain questions in Drop Zone.' }
    ],
    videos: [
      { t: 'What is the digital media value chain?', q: 'what is the digital media value chain', level: 'Beginner' },
      { t: 'Value chain explained simply', q: 'value chain explained simply for beginners', level: 'Beginner' },
      { t: 'Disintermediation, simply', q: 'disintermediation explained simply examples', level: 'Beginner' },
      { t: 'How musicians get paid from streaming', q: 'how do musicians get paid from streaming explained', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'A value chain is the journey of a product from idea to the person who uses it.',
        'Steps: create, produce, distribute, market, consume. Each step adds value.',
        'Stakeholders include the creator, producer, distributor, platform and end-user.',
        'Digital media cuts out middle steps (disintermediation), so creators can sell straight to fans.'
      ],
      hook: 'Idea to fan, adding value.',
      starter: { q: 'A singer uploads a song straight to a streaming service with no record label. What is this called?', a: 'Disintermediation: the middle step (the record label) has been cut out.' }
    },
    labs: ['M2-L2']
  },

  M2U4: {
    games: [
      { id: 'interview', why: 'A voiced job interview with a two-person panel.' },
      { id: 'cv', why: 'Write your CV and an application letter, then fix a bad one.' },
      { id: 'people', why: 'Office Life: practise professional dispositions in a branching workday.' },
      { id: 'tz', why: 'Remote and global teamwork across time zones.' },
      { id: 'inbox', why: 'Professional e-mails, netiquette and tone.' }
    ],
    videos: [
      { t: 'Remote vs hybrid vs office work', q: 'remote vs hybrid vs office work explained', level: 'Beginner' },
      { t: 'What is freelancing?', q: 'what is freelancing explained for beginners', level: 'Beginner' },
      { t: 'Soft skills for teenagers', q: 'soft skills explained for students', level: 'Beginner' },
      { t: 'How to write a CV with no experience', q: 'how to write a CV with no experience for students', level: 'Beginner' },
      { t: 'Job interview tips for first-timers', q: 'first job interview tips for teenagers', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Work models: office, remote (from home), hybrid (some of both) and freelance (your own boss, many clients).',
        'Skills are what you can do (editing, writing). Dispositions are how you behave (punctual, reliable, curious).',
        'Employers want core skills, digital skills and research skills, plus good attitude.',
        'Keep learning: tools change every year.'
      ],
      hook: 'Skills get hired, attitude stays.',
      starter: { q: 'Jada edits videos for five different clients and sets her own hours. Which work model is this?', a: 'Freelance work.' }
    },
    labs: ['M2-L1']
  },

  M2U5: {
    games: [
      { id: 'ecosystem', why: 'Event cards from hurricanes to algorithm changes: real challenges and opportunities.' },
      { id: 'webtime', why: 'Bridge the digital divide on a Caribbean island.' },
      { id: 'arcade', why: 'Island Rush questions on regional challenges.' }
    ],
    videos: [
      { t: 'PEST analysis for beginners', q: 'PEST analysis explained simply for beginners', level: 'Beginner' },
      { t: 'The digital divide, simply', q: 'digital divide explained simply', level: 'Beginner' },
      { t: 'What is the creative economy?', q: 'what is the creative economy explained', level: 'Beginner' },
      { t: 'What is digital piracy?', q: 'what is digital piracy explained simply', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'PEST looks at four outside forces: Political, Economic, Social, Technological. Add Culture for the Caribbean.',
        'Challenges: small markets, high data costs, slow internet, piracy and brain drain.',
        'Opportunities: tourism, diaspora audiences, culture (carnival, music, food) and selling worldwide online.',
        'Our culture is an advantage: nobody else can tell Caribbean stories like we can.'
      ],
      hook: 'Small islands, big global audience.',
      starter: { q: 'Internet data is expensive on an island. Which PEST factor is this?', a: 'Economic: it is about cost and money.' }
    },
    labs: ['M2-L4', 'M2-L6']
  },

  M2U6: {
    games: [
      { id: 'fundingtick', why: 'Tick the funding methods that match each feature.' },
      { id: 'ecosystem', why: 'Choose your start-up\'s funding and see the result.' },
      { id: 'valuechain', why: 'See who keeps each dollar when content earns money.' }
    ],
    videos: [
      { t: 'Debt vs equity for beginners', q: 'debt vs equity financing explained simply', level: 'Beginner' },
      { t: 'Crowdfunding explained', q: 'what is crowdfunding explained for beginners', level: 'Beginner' },
      { t: 'What is a grant?', q: 'what is a grant how grants work explained', level: 'Beginner' },
      { t: 'What is bootstrapping?', q: 'what is bootstrapping a business explained', level: 'Beginner' },
      { t: 'How YouTubers make money', q: 'how do youtubers make money explained for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Debt = you borrow money and pay it back with interest (a bank loan).',
        'Equity = you give away part of your business in exchange for money (an investor).',
        'Other ways: grants (free money you apply for), crowdfunding (many people give a little), sponsorship and bootstrapping (your own savings).',
        'Creators earn from ads, sponsorships, subscriptions, merchandise and tips.'
      ],
      hook: 'Borrow it, share it, earn.',
      starter: { q: '300 fans each give US$10 online to fund a short film. What type of funding is this?', a: 'Crowdfunding: many people each give a small amount.' }
    },
    labs: ['M2-L5', 'M2-L6']
  },

  M2U7: {
    games: [
      { id: 'lologo-pair', why: 'A sample proposal with marking notes: see what a strong one looks like.' },
      { id: 'lologo-sba', why: 'A full Grade One sample, including the budget and timeline.' },
      { id: 'p2bank', why: 'Paper 02 practice on proposals and budgets.' },
      { id: 'revision', why: 'Judge proposal answers as Correct, Partially Correct or Incorrect.' }
    ],
    videos: [
      { t: 'How to write a project proposal (beginner)', q: 'how to write a project proposal for beginners', level: 'Beginner' },
      { t: 'What is an executive summary?', q: 'what is an executive summary how to write one', level: 'Beginner' },
      { t: 'SMART objectives explained', q: 'SMART objectives explained with examples', level: 'Beginner' },
      { t: 'Simple budget in Google Sheets', q: 'how to make a simple budget in google sheets beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'A proposal is a document that asks someone to say yes to your project (and often to fund it).',
        'It explains the problem, your solution, who it is for, how you will do it, when and how much it costs.',
        'The executive summary is a short overview at the start, but you write it last.',
        'A budget lists every cost with a total. Add a little extra for surprises (contingency).'
      ],
      hook: 'Problem, plan, people, time, money.',
      starter: { q: 'Which part of a proposal gives a short overview of the whole thing?', a: 'The executive summary.' }
    },
    labs: ['M2-L5']
  },

  M2U8: {
    games: [
      { id: 'arcade', why: 'Agile and pitch questions in Drop Zone and Match Up.' },
      { id: 'tz', why: 'Coordinate a team across time zones, as agile teams often do.' },
      { id: 'p2bank', why: 'Paper 02 practice: planning and pitching a project.' },
      { id: 'dmquest', why: 'Review quest: the Module 2 finale.' }
    ],
    videos: [
      { t: 'Agile explained for beginners', q: 'agile explained for beginners simple', level: 'Beginner' },
      { t: 'Kanban board with Trello for beginners', q: 'trello tutorial for beginners kanban board', level: 'Beginner' },
      { t: 'What is a sprint?', q: 'what is a sprint in scrum explained simply', level: 'Beginner' },
      { t: 'How to pitch an idea', q: 'how to pitch an idea for beginners', level: 'Beginner' },
      { t: 'The 4Ps of marketing, simply', q: '4 Ps of marketing explained simply', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Agile means working in short cycles (sprints), checking with the client and improving each time.',
        'Waterfall does one step at a time, in order, with little going back.',
        'A Kanban board has columns: To do, Doing, Done.',
        'A good pitch says: the problem, your solution, who it is for, why you, and what you need. Use the 4Ps: Product, Price, Place, Promotion.'
      ],
      hook: 'Build, show, listen, then improve.',
      starter: { q: 'What are the three basic columns on a Kanban board?', a: 'To do, Doing (in progress) and Done.' }
    },
    labs: ['M2-L3', 'M2-L6']
  },

  /* =========================== MODULE 3: CREATIVE SOLUTION DESIGN =========================== */
  M3U1: {
    games: [
      { id: 'logolab', why: 'Design a logo for a client, going through the design stages.' },
      { id: 'lologo-case', why: 'See a real design process from sketch to finished app.' },
      { id: 'heroposter', why: 'Practise design principles: hierarchy, contrast and balance.' },
      { id: 'arcade', why: 'Design process questions in Match Up.' }
    ],
    videos: [
      { t: 'Design thinking for beginners', q: 'design thinking explained for beginners', level: 'Beginner' },
      { t: 'Principles of design, simply', q: 'principles of design explained for beginners', level: 'Beginner' },
      { t: 'Gestalt principles in five minutes', q: 'gestalt principles explained simply', level: 'Beginner' },
      { t: 'Visual hierarchy for beginners', q: 'visual hierarchy explained for beginners graphic design', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'The creative design process is a set of steps from problem to finished solution.',
        'Design thinking: Empathise, Define, Ideate, Prototype, Test.',
        'Design principles help things look clear: contrast, balance, alignment, repetition, hierarchy.',
        'Gestalt: our eyes group things that are close together or look alike.'
      ],
      hook: 'Understand, imagine, make, test, improve.',
      starter: { q: 'Which design thinking stage comes first?', a: 'Empathise: understand the users and their problem.' }
    },
    labs: ['M3-L9', 'M3-L8']
  },

  M3U2: {
    games: [
      { id: 'lologo-case', why: 'Swipe from hand sketches to grey wireframes to the finished app.' },
      { id: 'arcade', why: 'Waterfall, agile and planning artefact questions.' },
      { id: 'dmquest', why: 'Review quest: the methods stage.' }
    ],
    videos: [
      { t: 'Waterfall vs agile for beginners', q: 'waterfall vs agile explained for beginners', level: 'Beginner' },
      { t: 'Mood board in Canva', q: 'how to make a mood board in canva beginners', level: 'Beginner' },
      { t: 'Wireframing in Figma for beginners', q: 'figma wireframe tutorial for beginners', level: 'Beginner' },
      { t: 'How to give useful design feedback', q: 'how to give constructive design feedback critique', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Linear (waterfall) work goes step by step. Non-linear (agile) work loops back and improves.',
        'You can work solo or in a team (collaborative).',
        'Planning tools: a mood board (look and feel), a storyboard (scenes in order), a wireframe (layout of a screen).',
        'Good feedback is specific, kind and helpful: say what works and one thing to fix.'
      ],
      hook: 'Plan it, sketch it, improve.',
      starter: { q: 'Which planning tool shows the look and feel using colours, photos and fonts?', a: 'A mood board.' }
    },
    labs: ['M3-L3', 'M2-L3']
  },

  M3U3: {
    games: [
      { id: 'lologo', why: 'A working app that solves a real local problem: long waits at lolos.' },
      { id: 'classactivities', why: 'Wacky Caribbean Client Briefs: solve local problems in teams.' },
      { id: 'lologo-case', why: 'How the LoloGo problem was researched and solved.' },
      { id: 'lologo-sba', why: 'A sample SBA built on a Caribbean problem.' }
    ],
    videos: [
      { t: 'How to write a problem statement', q: 'how to write a problem statement for beginners', level: 'Beginner' },
      { t: '"How might we" questions', q: 'how might we questions explained beginners', level: 'Beginner' },
      { t: 'How to make a survey with Google Forms', q: 'google forms tutorial for beginners survey', level: 'Beginner' },
      { t: 'User interviews for beginners', q: 'how to do user interviews for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Start with a real local problem and the people it affects.',
        'Turn the problem into a question: "How might we help … to …?"',
        'Research it: surveys (many people, numbers), interviews (few people, deep reasons), observation (watch what they do).',
        'Build a solution, test it with real users and improve it.'
      ],
      hook: 'Real problem, real people, test.',
      starter: { q: 'You want to ask 100 students a few quick questions. Survey or interview?', a: 'A survey: it collects answers from many people quickly.' }
    },
    labs: ['M3-L3', 'M3-L8']
  },

  M3U4: {
    games: [
      { id: 'lightingdirector', why: 'Plan the lighting for each photo brief before the shoot.' },
      { id: 'onelight', why: 'Lighting and mood with a single light.' },
      { id: 'arcade', why: 'Storyboard, shot list and pre-production questions.' },
      { id: 'p2bank', why: 'Paper 02 practice: storyboards, shot lists and scripts.' }
    ],
    videos: [
      { t: 'Camera shot types for beginners', q: 'camera shot types explained for beginners', level: 'Beginner' },
      { t: 'How to draw a simple storyboard', q: 'how to make a storyboard for beginners', level: 'Beginner' },
      { t: 'Rule of thirds in two minutes', q: 'rule of thirds explained for beginners', level: 'Beginner' },
      { t: 'The 180-degree rule, simply', q: '180 degree rule explained simply', level: 'Beginner' },
      { t: 'Three-point lighting for beginners', q: 'three point lighting for beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Pre-production is all the planning before you film or photograph.',
        'Key documents: the brief, script, storyboard, shot list and schedule.',
        'Shot sizes tell the story: wide shows the place, close-up shows feelings.',
        'Plan for safety, permission (clearances), equipment and lighting.'
      ],
      hook: 'Plan first, then press record.',
      starter: { q: 'Which shot shows a person\'s face to capture emotion: a wide shot or a close-up?', a: 'A close-up.' }
    },
    labs: ['M3-L3', 'M3-L7']
  },

  M3U5: {
    games: [
      { id: 'shortcuts', why: 'Race the keyboard shortcuts for your editing tools.' },
      { id: 'pcbuild', why: 'Build a media workstation and learn the hardware.' },
      { id: 'print', why: 'Choose the right printer and output for each job.' },
      { id: 'blemish', why: 'Guided image-editing workbook: layers and retouching.' }
    ],
    videos: [
      { t: 'GIMP for complete beginners', q: 'gimp tutorial for complete beginners', level: 'Beginner' },
      { t: 'Photopea: remove a background', q: 'photopea beginner tutorial remove background', level: 'Beginner' },
      { t: 'Audacity for beginners', q: 'audacity tutorial for beginners', level: 'Beginner' },
      { t: 'OpenShot video editing for beginners', q: 'openshot video editor tutorial for beginners', level: 'Beginner' },
      { t: 'Layers explained in photo editing', q: 'what are layers in photo editing explained beginners', level: 'Beginner' },
      { t: 'Canva vs InDesign for beginners', q: 'canva vs indesign for beginners page layout', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Digital media tools are the software and hardware you use to create media.',
        'Match the tool to the job: GIMP or Photopea (photos), Inkscape (vectors), Audacity (sound), OpenShot (video), Canva (layouts).',
        'Judge a tool by cost, ease of use, features, file formats and the device it runs on.',
        'AI tools can help, but check their output and say when you used them.'
      ],
      hook: 'Right tool for the job.',
      starter: { q: 'Which free tool would you use to remove background noise from a voice recording?', a: 'Audacity (its Noise Reduction effect).' }
    },
    labs: ['M3-L5', 'M3-L1']
  },

  M3U6: {
    games: [
      { id: 'logolab', why: 'Colour wheel, harmonies and colour psychology for a real client.' },
      { id: 'heroposter', why: 'Typography and colour in a hero poster.' },
      { id: 'inbox', why: 'Professional digital communication by e-mail.' },
      { id: 'tz', why: 'Pick the right digital channel for each message.' }
    ],
    videos: [
      { t: 'Colour theory for beginners', q: 'colour theory for beginners', level: 'Beginner' },
      { t: 'Serif vs sans serif', q: 'serif vs sans serif explained for beginners', level: 'Beginner' },
      { t: 'Kerning, tracking and leading', q: 'kerning tracking leading explained beginners', level: 'Beginner' },
      { t: 'RGB vs CMYK, simply', q: 'RGB vs CMYK explained simply', level: 'Beginner' },
      { t: 'How to write alt text', q: 'how to write alt text for beginners accessibility', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Choose the message, the audience and the purpose first; then the platform and tone.',
        'Fonts: serif (with little feet) feels classic; sans serif (no feet) feels modern and is easy on screens.',
        'Colour: RGB for screens, CMYK for printing. Use the 60-30-10 rule to balance colours.',
        'Make it accessible: strong contrast, captions and alt text.'
      ],
      hook: 'Clear message, clear type, contrast.',
      starter: { q: 'You are designing a poster to be printed. RGB or CMYK?', a: 'CMYK, the colour mode used for printing.' }
    },
    labs: ['M3-L9', 'M3-L8']
  },

  M3U7: {
    games: [
      { id: 'onelight', why: 'Drag one light to create Rembrandt, loop, split, butterfly and rim lighting.' },
      { id: 'lightingdirector', why: 'Key, fill and rim lights for each photo brief.' },
      { id: 'blemish', why: 'Retouch ethically on a separate layer, with consent.' },
      { id: 'heroposter', why: 'Duotone grading and image manipulation.' }
    ],
    videos: [
      { t: 'Exposure triangle for beginners', q: 'exposure triangle explained for beginners', level: 'Beginner' },
      { t: 'Rembrandt lighting with one light', q: 'rembrandt lighting one light beginner tutorial', level: 'Beginner' },
      { t: 'Audacity noise reduction for beginners', q: 'audacity noise reduction beginner', level: 'Beginner' },
      { t: 'Phone video tips for beginners', q: 'how to film better video with your phone beginners', level: 'Beginner' },
      { t: 'Video editing basics: cuts and transitions', q: 'video editing basics for beginners cuts transitions', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Photos: exposure is how bright the picture is. Aperture, shutter speed and ISO control it.',
        'Lighting patterns (Rembrandt, butterfly, split, loop) come from where you place the light.',
        'Audio: record close to the mic, in a quiet room, and watch the levels so they never hit red.',
        'Editing: cut out mistakes, add transitions with purpose, and be honest about heavy edits.'
      ],
      hook: 'Light it, record, edit honestly.',
      starter: { q: 'Your recording has a loud fan humming. Name one way to fix it.', a: 'Turn the fan off and re-record, or use noise reduction in Audacity.' }
    },
    labs: ['M3-L1', 'M3-L2', 'M3-L4', 'M3-L7']
  },

  M3U8: {
    games: [
      { id: 'p2bank', why: 'Paper 02 practice on export settings and file formats.' },
      { id: 'p2-2023', why: 'Guided practice with the 2023 Paper 02.' },
      { id: 'print', why: 'Output for print: the right printer and settings.' },
      { id: 'lologo-sba', why: 'See a finished proposal portfolio.' },
      { id: 'dmquest', why: 'Review quest: the final stage, all modules.' }
    ],
    videos: [
      { t: 'Lossy vs lossless for beginners', q: 'lossy vs lossless compression explained simply', level: 'Beginner' },
      { t: 'JPEG vs PNG vs GIF vs SVG', q: 'jpeg vs png vs gif vs svg explained for beginners', level: 'Beginner' },
      { t: 'Export a video for Instagram and YouTube', q: 'how to export video for instagram and youtube beginners', level: 'Beginner' },
      { t: 'How to make a good presentation', q: 'how to make a good presentation for beginners', level: 'Beginner' },
      { t: 'Building a student portfolio', q: 'how to make a portfolio for students beginners', level: 'Beginner' }
    ],
    dialDown: {
      big: [
        'Compression makes files smaller. Lossy (JPEG, MP3, MP4) loses some detail; lossless (PNG, WAV) keeps it all.',
        'Export with the right size and format for where it will be seen: phone, website, print.',
        'A good presentation has few words per slide, clear visuals and practised speaking.',
        'Your portfolio shows the whole journey: research, plans, drafts and the final solution.'
      ],
      hook: 'Right format, right size, show.',
      starter: { q: 'You need a logo with a transparent background for a website. JPEG or PNG?', a: 'PNG: it supports transparency and is lossless.' }
    },
    labs: ['M3-L6', 'M3-L8']
  }
};
