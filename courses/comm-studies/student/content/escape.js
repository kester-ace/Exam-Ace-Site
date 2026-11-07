/* CAPE Communication Studies - Escape Rooms
   Developed by Kester Small
   Three themed escape rooms, one per module. */
window.COURSE_ESCAPE = {
  rooms: [

  /* =========================================================
     ROOM 1 - THE LOCKED LIBRARY (Module 1)
     ========================================================= */
  {
    id: `library`,
    title: `The Locked Library`,
    theme: `library`,
    finalLock: 'padlock', doorLabel: 'Chained iron door',
    module: `1`,
    minutes: 18,
    story: `<p>It is 4:55 p.m. at the <strong>St. John's Community Library</strong> in Antigua. You came in to finish research for your Paper 2 practice essay, put on your headphones... and when you look up, the lights are dimmed and the doors are locked.</p>
<p>Taped to the front desk is a note from the head librarian, Ms. Arrindell:</p>
<blockquote><em>"Anyone still here clearly loves research. Prove it. Six locks guard the back door. Each one tests a skill every Communication Studies student needs: finding sources, judging them, understanding them, and using them. Solve them all and the code for the padlock on the back door is yours. Good luck, scholar."</em></blockquote>
<p>Grab your notebook. The clock is ticking.</p>`,
    puzzles: [
      {
        id: `lib1`,
        spot: 'shelf', prop: 'ledger', lock: 'keypad', keys: 'SBARLMT',
        title: `The Archive Shelf`,
        type: `code`,
        clue: `<p>A dusty shelf labelled <strong>"ANTIGUA AND BARBUDA HERITAGE COLLECTION"</strong> holds seven items. Each has a brass letter tag:</p>
<ul>
<li><strong>S</strong> - A handwritten diary kept by a sugar-factory worker at Gunthorpes in 1948</li>
<li><strong>B</strong> - A 2019 school textbook chapter summarising the history of the sugar industry</li>
<li><strong>A</strong> - An audio recording of an interview with an English Harbour fisherman about his own catch in the 1960s</li>
<li><strong>R</strong> - An encyclopedia entry on "The Caribbean Sugar Trade"</li>
<li><strong>L</strong> - An original photograph taken by an eyewitness the morning after Hurricane Luis (1995)</li>
<li><strong>M</strong> - A magazine article reviewing a documentary about Hurricane Luis</li>
<li><strong>T</strong> - A letter written by a St. John's merchant in 1863</li>
</ul>
<p>A card on the shelf reads: <em>"Only first-hand evidence opens this lock. Read the tags of the firsthand items from top to bottom."</em></p>`,
        prompt: `Enter the four-letter word spelled by the PRIMARY sources.`,
        answer: `SALT`,
        hint1: `A primary source was created by someone who directly experienced or witnessed the event, at or near the time.`,
        hint2: `Textbooks, encyclopedias and reviews interpret other people's work. That makes them secondary or tertiary. Keep the diary, interview, photograph and letter.`,
        explain: `<p><strong>Primary sources</strong> are first-hand: diaries, letters, interviews with participants, eyewitness photographs, original documents. <strong>Secondary sources</strong> (textbooks, review articles) analyse or interpret primary material, and <strong>tertiary sources</strong> (encyclopedias) compile and summarise. In Module 1 you must be able to tell them apart <em>and</em> say why a primary source might still be biased: a diary shows only one person's view.</p>`,
        digit: `4`
      },
      {
        id: `lib2`,
        spot: 'computer', prop: 'screen',
        title: `The Sargassum Search`,
        type: `choice`,
        clue: `<p>The library computer is still on. Someone has searched <em>"Is sargassum dangerous to health?"</em> Four results glow on the screen:</p>
<ol type="A">
<li><strong>BeachVibez Blog</strong> - "Sargassum is TOTALLY toxic, never go near the sea again!!!" No author named. No date. Sells "anti-seaweed" lotion in the sidebar.</li>
<li><strong>Caribbean Marine Research Institute (university site)</strong> - Report by Dr. N. Hodge, marine biologist, published March 2025. Explains that rotting sargassum releases hydrogen sulphide gas, which can irritate people with asthma. Lists 14 peer-reviewed references.</li>
<li><strong>Social media post</strong> - Shared 12,000 times. "My cousin's friend got sick from seaweed." Posted 2016.</li>
<li><strong>Hotel promotional page</strong> - "Our beaches are always perfect and seaweed-free!" Written by the hotel's marketing team.</li>
</ol>`,
        prompt: `Which source is the MOST credible for a research paper?`,
        options: [
          `A - the blog, because it uses strong, confident language`,
          `B - the university research report`,
          `C - the social media post, because so many people shared it`,
          `D - the hotel page, because the hotel is located on the beach`
        ],
        answer: 1,
        hint1: `Check each source for: a named, qualified author; a recent date; a clear purpose; and evidence or references.`,
        hint2: `Popularity is not proof, and a source that is selling something (lotion, hotel rooms) has a bias. Which one has an expert, a date and references?`,
        explain: `<p>Credibility tests include <strong>authority</strong> (who wrote it and are they qualified?), <strong>currency</strong> (how recent?), <strong>accuracy</strong> (is there evidence or references?), and <strong>purpose/objectivity</strong> (inform, or sell and persuade?). Source B passes all four. The blog and hotel page have commercial bias, and the viral post is hearsay ("my cousin's friend"), so its shares say nothing about its accuracy.</p>`,
        digit: `7`
      },
      {
        id: `lib3`,
        spot: 'diary', prop: 'torn',
        title: `The Torn Page`,
        type: `choice`,
        clue: `<p>Inside a returned book you find a torn page. One paragraph is circled in red:</p>
<blockquote>"Every year, Antigua welcomes hundreds of thousands of cruise passengers, and the jobs created in taxis, shops and restaurants keep many families afloat. Yet the same ships pump waste into nearby waters, and crowded streets on 'ship days' strain roads and patience alike. <strong>Clearly, cruise tourism is a double-edged sword: the island must find ways to keep its economic benefits while reducing its environmental and social costs.</strong> Some residents have suggested limiting the number of ships per day."</blockquote>
<p>A sticky note says: <em>"The lock opens for the writer's MAIN POINT, not a supporting detail."</em></p>`,
        prompt: `What is the main point of the paragraph?`,
        options: [
          `Antigua receives hundreds of thousands of cruise passengers each year.`,
          `Cruise ships pump waste into the waters around the island.`,
          `Cruise tourism brings both benefits and costs, and the island must balance them.`,
          `Residents want to limit the number of ships per day.`
        ],
        answer: 2,
        hint1: `Supporting details are specific facts or examples. The main point is the overall idea that those details are there to support.`,
        hint2: `Look at the sentence in bold, which pulls the other sentences together. Which option restates it?`,
        explain: `<p>The <strong>main point</strong> (thesis or controlling idea) is the central claim the writer wants you to accept. Here the details about jobs, pollution and crowding all serve one idea: cruise tourism is a <em>double-edged sword</em> that must be balanced. In Paper 1 and Paper 2, separate the main point from <strong>supporting details</strong> (facts, examples, statistics) and from <strong>minor details</strong> such as the final suggestion.</p>`,
        digit: `2`
      },
      {
        id: `lib4`,
        spot: 'scroll', prop: 'scroll',
        title: `The Two-Column Scroll`,
        type: `word`,
        clue: `<p>A scroll hangs over the reading-room door. It reads:</p>
<blockquote>"Heritage Quay in St. John's and the English Harbour strip both attract visitors, but in different ways. <em>Like</em> Heritage Quay, English Harbour is lined with restaurants and shops. <em>However</em>, while Heritage Quay buzzes by day with cruise passengers, English Harbour comes alive at night with locals and long-stay visitors. <em>Similarly</em>, both areas depend on the sea. <em>On the other hand</em>, Heritage Quay faces the cruise port, whereas English Harbour faces the dockyard and the marinas."</blockquote>
<p>The italic words have been underlined three times. Beneath them is carved: <em>"NAME THE PATTERN THAT HOLDS THIS PASSAGE TOGETHER."</em></p>`,
        prompt: `Name the organisational strategy used in this passage.`,
        answer: `comparison and contrast`,
        accept: [`compare and contrast`, `comparison/contrast`, `compare/contrast`, `comparison-contrast`, `comparison`, `compare and contrast pattern`, `comparison and contrast pattern`],
        hint1: `Look closely at the signal words: like, however, similarly, on the other hand, whereas. What are they doing?`,
        hint2: `The writer is showing similarities AND differences between two places.`,
        explain: `<p>The passage uses <strong>comparison and contrast</strong>. Transitions such as <em>like, similarly, both</em> show similarities, and <em>however, on the other hand, whereas, while</em> show differences. Other organisational strategies to know: <strong>chronological</strong> (first, then, later), <strong>cause and effect</strong> (because, as a result), <strong>problem-solution</strong>, <strong>classification</strong>, <strong>definition</strong> and <strong>general to specific</strong>. Signal words are the quickest way to identify the strategy.</p>`,
        digit: `9`
      },
      {
        id: `lib5`,
        spot: 'poster', prop: 'poster', lock: 'vault',
        title: `The Poetry Dial`,
        type: `code`,
        clue: `<p>A combination dial is mounted beside a poster for the Emancipation Day poetry slam. The dial's numbers are labelled:</p>
<p><strong>1</strong> Simile &nbsp; <strong>2</strong> Hyperbole &nbsp; <strong>3</strong> Rhetorical question &nbsp; <strong>4</strong> Personification &nbsp; <strong>5</strong> Alliteration</p>
<p>Four lines from the poster are numbered in order:</p>
<ol type="A">
<li>"The waves whispered warnings to the shore."</li>
<li>"I've told you a million times to respect this island."</li>
<li>"Who among us does not love the hills of home?"</li>
<li>"Sunlight sparkles on Sandy Island."</li>
</ol>
<p>Engraved under the dial: <em>"Turn to the technique of each line, A to D."</em></p>`,
        prompt: `Enter the four-digit code (technique numbers for lines A, B, C, D).`,
        answer: `4235`,
        hint1: `Line A gives waves a human action. Line B exaggerates. Line C is a question that needs no answer.`,
        hint2: `Line D repeats the same opening consonant sound: Sunlight, sparkles, Sandy. That gives A=4, B=2, C=3, and D is...?`,
        explain: `<p><strong>Personification</strong> (waves that "whisper") gives human qualities to non-human things. <strong>Hyperbole</strong> ("a million times") is deliberate exaggeration for emphasis. A <strong>rhetorical question</strong> is asked for effect, not for an answer. <strong>Alliteration</strong> repeats initial consonant sounds. In Module 1 it is not enough to name a technique. You must also explain its <em>effect</em> on the reader, for example: personification makes the sea seem alive and its warnings urgent.</p>`,
        digit: `1`
      },
      {
        id: `lib6`,
        spot: 'scale', prop: 'note',
        title: `The Faulty Scale`,
        type: `choice`,
        clue: `<p>The last lock sits on the librarian's office. Inside you can see a bathroom scale with a label taped to it:</p>
<blockquote>"RESEARCH LESSON: Ms. Arrindell weighed the same 5 kg bag of rice on this scale ten times. Every single time it read <strong>7 kg</strong>. Same result, every time... but never the true weight."</blockquote>
<p>A riddle is written on the door: <em>"Consistent but wrong. What am I?"</em></p>`,
        prompt: `How would you describe the data from this scale?`,
        options: [
          `Valid but not reliable`,
          `Reliable but not valid`,
          `Both reliable and valid`,
          `Neither reliable nor valid`
        ],
        answer: 1,
        hint1: `Reliability means getting the same result consistently. Validity means measuring what you are actually supposed to measure, accurately.`,
        hint2: `The scale gives the same reading every time. Is that reading the true weight?`,
        explain: `<p><strong>Reliability</strong> = consistency: the instrument gives the same results under the same conditions. <strong>Validity</strong> = accuracy: the instrument measures what it claims to measure. The scale is <em>reliable</em> (always 7 kg) but <em>not valid</em> (the bag weighs 5 kg). In research, a questionnaire with leading questions can give consistent answers that still fail to measure people's real opinions. That is reliable but not valid.</p>`,
        digit: `5`
      }
    ],
    finalPrompt: `A heavy chain and a brass padlock hold the back door shut. Spin the padlock wheels to the six digits on the key tags you collected, in the order you found them.`,
    finalCode: `472915`,
    finale: `<p>The shackle pops, the chain rattles to the floor, the iron door swings back, and warm evening air rushes in from High Street. Ms. Arrindell is waiting outside with a smile and a library card stamped <strong>"MASTER RESEARCHER"</strong>.</p>
<p><em>"Primary versus secondary, credibility, main point, organisation, technique, reliability and validity. That's Module 1 in one evening. See you at exam time."</em></p>`
  },

  /* =========================================================
     ROOM 2 - THE CREOLE CODE (Module 2)
     ========================================================= */
  {
    id: `creole`,
    title: `The Creole Code`,
    theme: `language`,
    finalLock: 'vault', doorLabel: 'Vault door',
    module: `2`,
    minutes: 18,
    story: `<p>Your great-aunt Miss Dulcie has left you her old <strong>recipe tin</strong>, the one with the famous sorrel recipe that nobody in the family has ever seen. The tin is shut away in the old steel vault in the back office of her rum shop, and the vault dial has a six-digit combination.</p>
<p>Chalked on the vault door is a note in her looping handwriting:</p>
<blockquote><em>"Chile, mi na giving dis recipe to nobody who don't respect how we talk. Solve mi six little riddles 'bout our language an' di vault go open."</em></blockquote>
<p>Six folded papers are tucked around the back room: on the chalkboard, the crates, the posters, the phone and the jukebox. Each one is a puzzle about Caribbean language. Time to crack the Creole Code.</p>`,
    puzzles: [
      {
        id: `cre1`,
        spot: 'chalk', prop: 'chalk',
        title: `The Continuum Ladder`,
        type: `order`,
        clue: `<p>The first paper shows a ladder drawn in pencil. At the bottom rung Miss Dulcie wrote <strong>"BASILECT - furthest from Standard English"</strong>. At the top rung: <strong>"ACROLECT - closest to Standard English"</strong>. The middle rungs say <strong>"MESOLECT"</strong>.</p>
<p>Four versions of the same sentence have been cut out and scattered:</p>
<ul>
<li>"I didn't know that he had gone."</li>
<li>"Mi neva nuo se im gaan."</li>
<li>"I never know that he did gone."</li>
<li>"Mi neva know dat him did gone."</li>
</ul>`,
        prompt: `Arrange the sentences from BASILECT (bottom) to ACROLECT (top).`,
        items: [
          `Mi neva nuo se im gaan.`,
          `Mi neva know dat him did gone.`,
          `I never know that he did gone.`,
          `I didn't know that he had gone.`
        ],
        hint1: `Look at the pronouns. "Mi" and "im" are further from Standard English than "I" and "he".`,
        hint2: `The acrolect follows Standard English grammar completely ("had gone"). The basilect keeps the most Creole forms ("se", "im", "gaan"). The mesolect versions mix the two.`,
        explain: `<p>The <strong>Creole continuum</strong> describes a range of speech varieties rather than two separate boxes. The <strong>basilect</strong> is furthest from the lexifier (Standard English), the <strong>acrolect</strong> is closest, and the <strong>mesolect</strong> covers the many varieties in between. Most Caribbean speakers move along the continuum depending on audience, setting and purpose, which links directly to <em>register</em> and <em>code-switching</em>.</p>`,
        digit: `8`
      },
      {
        id: `cre2`,
        spot: 'crates', prop: 'note', lock: 'padlock',
        title: `The Sound Lockers`,
        type: `code`,
        clue: `<p>The second paper is a chart of three lockers, each marked with a letter and a sound change:</p>
<ul>
<li><strong>A</strong> - <em>Aphesis</em>: a sound or syllable is LOST from the BEGINNING of a word</li>
<li><strong>E</strong> - <em>Epenthesis</em>: an extra sound is ADDED inside a word</li>
<li><strong>M</strong> - <em>Metathesis</em>: two sounds SWAP places</li>
</ul>
<p>Below the chart, three words Miss Dulcie heard at the market are listed in order:</p>
<ol>
<li>"We going to watch a <strong>fillum</strong> tonight." (film)</li>
<li>"Go <strong>aks</strong> your mother." (ask)</li>
<li>"You <strong>'member</strong> Mr. Richardson?" (remember)</li>
</ol>`,
        prompt: `Enter the three locker letters that match words 1, 2 and 3, in order.`,
        answer: `EMA`,
        hint1: `Compare each Creole word with its Standard English form. Was a sound added, swapped or dropped?`,
        hint2: `"Film" becomes "fil-u-m", so a vowel is added. "Ask" becomes "aks", so s and k swap. "Remember" loses "re-" at the start.`,
        explain: `<p>These are regular <strong>phonological features</strong> of Caribbean English Creoles, not "mistakes". <strong>Epenthesis</strong> inserts a sound (fillum). <strong>Metathesis</strong> swaps the order of sounds (aks; the same form appears in older English, too). <strong>Aphesis</strong> drops an initial sound or syllable ('member, 'cause, 'nough). In Paper 1 and Paper 2, identify the feature <em>and</em> give the Standard English form to show the change.</p>`,
        digit: `3`
      },
      {
        id: `cre3`,
        spot: 'posters', prop: 'torn',
        title: `The Time-Telling Markers`,
        type: `word`,
        clue: `<p>The third paper is a page torn from a linguist's notebook. Miss Dulcie has circled a key:</p>
<blockquote><strong>PRE-VERBAL MARKERS</strong> (small words placed BEFORE the verb to show time or aspect):<br>
<strong>a / de</strong> - action in progress (continuous)<br>
<strong>did / bin / en</strong> - past<br>
<strong>go / wi / gwine</strong> - future<br>
<strong>done</strong> - action completed</blockquote>
<p>Underneath she wrote one sentence she says to every grandchild:</p>
<blockquote>"Mi <u>bin</u> tell yu, but yu <u>de</u> laugh, so now mi <u>go</u> show yu."</blockquote>`,
        prompt: `Type the pre-verbal marker in the sentence that signals the FUTURE.`,
        answer: `go`,
        accept: [`"go"`, `go show`],
        hint1: `Use the key. Three markers are underlined in the sentence. Which one belongs in the future row?`,
        hint2: `"bin" is past and "de" is in progress. Only one marker is left.`,
        explain: `<p>Unlike Standard English, which mostly marks tense by changing the verb ("told", "laughing", "will show"), Caribbean Creoles often keep the verb unchanged and place a <strong>pre-verbal marker</strong> before it: <em>bin</em> tell (past), <em>de</em> laugh (continuous), <em>go</em> show (future). This is a systematic grammar rule, which is strong evidence that Creole is a language with its own structure and not "broken English".</p>`,
        digit: `6`
      },
      {
        id: `cre4`,
        spot: 'outfit', prop: 'photo',
        title: `The Interview Outfit`,
        type: `choice`,
        clue: `<p>The fourth paper is a photo of your cousin Jaden in a shirt and tie, with a caption:</p>
<blockquote>"Jaden's job interview at Grantley Adams International Airport, 9:00 a.m. Panel: the HR manager and two senior supervisors."</blockquote>
<p>On the back Miss Dulcie wrote: <em>"Same boy who does tell he friends 'Wha' de vibes, boss?' on the basketball court. Smart people know which words to wear, just like which clothes to wear."</em></p>
<p>Below are four possible answers to the panel's question: <em>"Why do you want this job?"</em></p>`,
        prompt: `Which response shows the most appropriate register for this situation?`,
        options: [
          `"Boss, I just need a lil money, ya know?"`,
          `"I believe my customer service experience and my ability to stay calm under pressure would make me a strong addition to your team."`,
          `"Yo, airport life look real nice, man."`,
          `"Dunno, my mother told me to apply."`
        ],
        answer: 1,
        hint1: `Register is the variety of language suited to a particular situation, audience and purpose. Who is the audience here?`,
        hint2: `A formal interview with managers calls for formal register: Standard English, complete sentences and relevant detail.`,
        explain: `<p><strong>Register</strong> refers to the level of formality chosen for a situation: frozen, formal, consultative, casual and intimate. A job interview calls for <strong>formal</strong> register, while chatting with friends on the court calls for <strong>casual</strong> register. Moving between them is <strong>code-switching</strong> (or code-shifting along the continuum). Miss Dulcie's point is the key one: neither variety is "wrong". Each one is appropriate or inappropriate to its context.</p>`,
        digit: `0`
      },
      {
        id: `cre5`,
        spot: 'phone', prop: 'transcript', lock: 'keypad', keys: 'HEMI',
        title: `The Radio Call-In`,
        type: `code`,
        clue: `<p>The fifth paper is a transcript from a radio call-in show titled <strong>"Should Creole Be Used in Schools?"</strong> Miss Dulcie has written a letter in the margin beside each caller, using this key:</p>
<p><strong>H</strong> = Historical/colonial factor &nbsp; <strong>E</strong> = Educational factor &nbsp; <strong>M</strong> = Media/popular culture factor &nbsp; <strong>I</strong> = Identity/nationalism factor</p>
<p>But the margin letters have been smudged. Here are the callers, in order:</p>
<ol>
<li>"Back in the plantation days, the masters spoke 'proper' English. Creole still feels <strong>low-class</strong> to some people because of that."</li>
<li>"My teacher used to put a red line through every Creole word, so I grew up believing it was <strong>wrong</strong>."</li>
<li>"Now the soca artistes and the radio DJs use Creole, and the young people find it <strong>cool</strong>."</li>
<li>"When I hear Creole in a shop in Miami, I feel <strong>proud</strong>. That is who we are!"</li>
</ol>`,
        prompt: `Enter the four factor letters for callers 1 to 4, in order.`,
        answer: `HEMI`,
        hint1: `Caller 1 mentions plantation days. Caller 2 mentions a teacher.`,
        hint2: `Caller 3 talks about soca artistes and DJs. Caller 4 talks about feeling proud of who we are.`,
        explain: `<p>Language <strong>attitudes</strong> are often expressed through <strong>adjectives</strong> (low-class, wrong, cool, proud), and each attitude is shaped by a <strong>factor</strong>: <strong>history/colonialism</strong> (the language of the coloniser carried prestige), <strong>education</strong> (schools that penalised Creole), <strong>media</strong> (music and radio that raise its status) and <strong>identity</strong> (Creole as a symbol of nationhood and belonging). Strong Paper 2 answers name the attitude, quote the adjective <em>and</em> explain the factor behind it.</p>`,
        digit: `2`
      },
      {
        id: `cre6`,
        spot: 'jukebox', prop: 'letter',
        title: `The Silent Message`,
        type: `choice`,
        clue: `<p>The last paper describes a scene at Miss Dulcie's Sunday lunch:</p>
<blockquote>"Little Kemar reached across the table for the last johnny cake without saying 'please'. I didn't say one word. I just <strong>sucked my teeth</strong> long and slow (<em>chuuups</em>) and gave him a <strong>cut-eye</strong> from the corner of my eye. He put that johnny cake straight back down."</blockquote>`,
        prompt: `What do Miss Dulcie's non-verbal behaviours communicate?`,
        options: [
          `Joy and approval that Kemar is enjoying the food`,
          `Disapproval and annoyance at Kemar's bad manners`,
          `That she did not notice what Kemar did`,
          `An invitation for Kemar to take more food`
        ],
        answer: 1,
        hint1: `Think about how these gestures are used across the Caribbean. Are they warm or cold signals?`,
        hint2: `Kemar's reaction is a clue: he put the food back. What message made him do that?`,
        explain: `<p><strong>Steupsing</strong> (sucking the teeth, kiss-teeth) and the <strong>cut-eye</strong> (a sharp sideways glance, then looking away) are well-known Caribbean <strong>communicative behaviours</strong> that signal disapproval, annoyance or contempt, with no words needed. Module 2 asks you to recognise that communication in Caribbean cultures includes these culturally specific <strong>non-verbal</strong> features, along with gestures, proxemics (use of space), and the use of proverbs and storytelling.</p>`,
        digit: `5`
      }
    ],
    finalPrompt: `Six papers solved. Turn the vault dial to each digit on your bottle caps, in the order you found them: right, left, right, left, right, left.`,
    finalCode: `836025`,
    finale: `<p>Click! The handle spins, the heavy vault door swings open, and there sits the recipe tin. The lid pops open and the sweet smell of cloves and rum fills the room. On top of the sorrel recipe is one last note:</p>
<blockquote><em>"See? Our language got rules, history and feeling inside it. Respect it, know when to use it, and you will never lose your way. Now go wash di bottles. - Miss Dulcie"</em></blockquote>`
  },

  /* =========================================================
     ROOM 3 - SIGNAL LOST (Module 3)
     ========================================================= */
  {
    id: `signal`,
    title: `Signal Lost`,
    theme: `broadcast`,
    finalLock: 'keypad', doorLabel: 'Keypad-locked station door',
    module: `3`,
    minutes: 20,
    story: `<p>A tropical storm is 36 hours from the Turks and Caicos Islands. You are interning at <strong>Island Wave FM</strong> when the station's emergency broadcast system crashes and locks itself. The engineer is stuck in traffic on Leeward Highway.</p>
<p>The system's recovery screen flashes:</p>
<blockquote><code>SIGNAL LOST. SIX DIAGNOSTICS REQUIRED TO RESTORE TRANSMISSION.</code></blockquote>
<p>Thousands of listeners depend on clear, accurate storm updates. Restore the signal before the next bulletin.</p>`,
    puzzles: [
      {
        id: `sig1`,
        spot: 'rack', prop: 'screen',
        title: `Rebuild the Transmission Chain`,
        type: `order`,
        clue: `<p>Diagnostic 1 shows a broken flowchart. Five labelled blocks have fallen out of place. Beside the screen, the station manager's whiteboard explains:</p>
<blockquote>"The news director has an idea: tell residents to secure loose objects. She turns that idea into words and sounds. It travels by radio waves. A listener hears it and works out what it means. Then the listener calls in to ask, 'Does that include my satellite dish?'"</blockquote>
<p>The fallen blocks are:</p>
<ul>
<li>Decoding</li>
<li>Sender (has an idea)</li>
<li>Feedback</li>
<li>Channel (the message travels)</li>
<li>Encoding</li>
</ul>`,
        prompt: `Arrange the stages of the communication process in the correct order.`,
        items: [
          `Sender (has an idea)`,
          `Encoding`,
          `Channel (the message travels)`,
          `Decoding`,
          `Feedback`
        ],
        hint1: `Follow the whiteboard story step by step: idea, then words, then radio waves, then the listener understanding, then the call-in.`,
        hint2: `Turning an idea into words is ENCODING. Working out what the words mean is DECODING. The call-in question is FEEDBACK.`,
        explain: `<p>The <strong>communication process</strong>: a <strong>sender</strong> with an idea <strong>encodes</strong> it into a message, sends it through a <strong>channel</strong>, and the <strong>receiver</strong> <strong>decodes</strong> it and gives <strong>feedback</strong>. <strong>Noise</strong> (interference) can disrupt any stage. Feedback makes the process two-way and shows whether the message was understood. Here it shows the listener needs clarification.</p>`,
        digit: `9`
      },
      {
        id: `sig2`,
        spot: 'teletype', prop: 'teletype',
        title: `The Misheard Bulletin`,
        type: `choice`,
        clue: `<p>Diagnostic 2 plays a recording from the last storm. The bulletin was read only once, in fast, formal English:</p>
<blockquote>"Residents in low-lying areas are advised to evacuate to designated shelters prior to the onset of storm surge."</blockquote>
<p>A log entry follows: <em>"Many Spanish- and Haitian Kreyol-speaking residents in Five Cays did not understand. Several elderly listeners did not know what 'storm surge' or 'designated' meant. Few people moved."</em></p>`,
        prompt: `Which combination correctly identifies the main barrier AND the best repair strategy?`,
        options: [
          `Physical barrier: turn up the transmitter volume`,
          `Language/semantic barrier: rephrase in plain language, repeat the message, and broadcast in Spanish and Kreyol as well`,
          `Psychological barrier: tell listeners to stop panicking`,
          `Cultural barrier: cancel the bulletin altogether`
        ],
        answer: 1,
        hint1: `People heard the words clearly, so volume was not the problem. They did not understand the words or the language.`,
        hint2: `Repair should match the barrier: simpler words, repetition, and the audience's own languages.`,
        explain: `<p>This is a <strong>language/semantic barrier</strong>: jargon ("designated", "onset of storm surge") and a language some listeners did not speak. Good <strong>repair strategies</strong> match the barrier: use plain language ("Move to a shelter now. The sea will rise."), repeat key information, translate, and invite feedback. Other barriers to know are <strong>physical</strong> (noise, distance), <strong>psychological</strong> (fear, bias), <strong>cultural</strong> and <strong>physiological</strong> (hearing loss).</p>`,
        digit: `1`
      },
      {
        id: `sig3`,
        spot: 'switchboard', prop: 'switch', lock: 'padlock',
        title: `The Switchboard`,
        type: `code`,
        clue: `<p>Diagnostic 3 is an old switchboard with four sockets, each with a letter:</p>
<p><strong>R</strong> = Battery-powered radio broadcast &nbsp; <strong>F</strong> = Face-to-face meeting &nbsp; <strong>W</strong> = WhatsApp group message &nbsp; <strong>L</strong> = Formal written letter/memo</p>
<p>Four cables hang loose, each tagged with a message that must go out today:</p>
<ol>
<li>The power grid is down, and EVERY household on the island must hear the shelter locations.</li>
<li>The manager must discuss a sensitive staff disciplinary matter with one employee.</li>
<li>The DJ team needs a quick reminder that the 6 p.m. meeting starts 10 minutes late.</li>
<li>The station must send an official, permanent record of its new storm-coverage policy to the Telecommunications Bureau.</li>
</ol>`,
        prompt: `Plug each cable into the best channel. Enter the four letters for messages 1 to 4, in order.`,
        answer: `RFWL`,
        hint1: `Ask what each message needs: mass reach without electricity? privacy and sensitivity? speed and informality? a formal permanent record?`,
        hint2: `A battery radio works without the grid. Sensitive matters need immediate feedback and non-verbal cues. Quick reminders suit instant messaging. Official records must be written down.`,
        explain: `<p>Choosing a <strong>channel/medium</strong> depends on <strong>audience</strong> (one person or thousands?), <strong>purpose</strong>, <strong>urgency</strong>, <strong>formality</strong>, <strong>need for feedback</strong>, <strong>cost</strong> and <strong>access</strong> to technology. Radio reaches everyone, even in a blackout. Face-to-face is richest in feedback and non-verbal cues, which suits sensitive matters. Instant messaging is fast and informal. Letters and memos create a formal, permanent record.</p>`,
        digit: `4`
      },
      {
        id: `sig4`,
        spot: 'console', prop: 'transcript',
        title: `The Sponsor's Ad`,
        type: `word`,
        clue: `<p>Diagnostic 4 is an advertisement queued to air. Each line is labelled:</p>
<ol>
<li>"As a licensed electrician with 25 years of experience on this island..."</li>
<li>"...I've seen families lose everything when the lights go out and the food spoils."</li>
<li>"Generators use less fuel than you think. Our customers save 30% on average."</li>
<li>"<strong>The storm hits in 36 hours. Stocks are running out. Buy TODAY, while you still can.</strong>"</li>
</ol>
<p>The diagnostic screen asks: <em>"Line 1 = ethos. Line 2 = pathos. Line 3 = logos. Name the appeal in Line 4."</em></p>`,
        prompt: `Which rhetorical appeal does Line 4 rely on (the appeal to the right moment or timing)?`,
        answer: `kairos`,
        accept: [`kairos appeal`, `kairos (timing)`, `kairotic appeal`],
        hint1: `Ethos, pathos and logos are already taken. Line 4 is all about timing and urgency.`,
        hint2: `It is a Greek word meaning "the opportune moment". It begins with K.`,
        explain: `<p>The rhetorical appeals: <strong>ethos</strong> (credibility of the speaker), <strong>pathos</strong> (emotion), <strong>logos</strong> (logic and evidence) and <strong>kairos</strong> (the right moment). Kairos uses timing and urgency: the message is persuasive <em>because</em> of when it is delivered. In Paper 3 or a Paper 2 analysis, explain <em>how</em> the appeal works on the audience, for example: the countdown creates urgency and pushes listeners to act before thinking it over.</p>`,
        digit: `7`
      },
      {
        id: `sig5`,
        spot: 'notice', prop: 'board',
        title: `The Org Chart`,
        type: `choice`,
        clue: `<p>Diagnostic 5 shows the station's organisational chart: <strong>Station Manager</strong> at the top, then <strong>News Director</strong> and <strong>Programme Director</strong> side by side, then <strong>DJs and Reporters</strong>, then <strong>Interns</strong>.</p>
<p>Four messages from today flash on screen:</p>
<ol type="A">
<li>The Station Manager emails all staff: "All leave is cancelled until the storm passes."</li>
<li>An intern slips a suggestion into the manager's box: "Can we add Spanish bulletins?"</li>
<li>The News Director and Programme Director meet to coordinate the bulletin schedule.</li>
<li>A reporter submits her damage report to the News Director.</li>
</ol>`,
        prompt: `Which message is an example of HORIZONTAL (lateral) communication?`,
        options: [
          `A - the manager's email to all staff`,
          `B - the intern's suggestion`,
          `C - the two directors coordinating`,
          `D - the reporter's damage report`
        ],
        answer: 2,
        hint1: `Horizontal communication flows between people at the SAME level of the organisation.`,
        hint2: `On the chart, which two people sit side by side?`,
        explain: `<p>In organisations, <strong>vertical communication</strong> flows <strong>downward</strong> (manager to staff: instructions, policies, as in A) or <strong>upward</strong> (staff to superiors: reports, suggestions, feedback, as in B and D). <strong>Horizontal (lateral)</strong> communication flows between peers at the same level (C) and supports coordination and problem-solving. There is also the informal <strong>grapevine</strong>, which can spread rumours quickly during a crisis.</p>`,
        digit: `3`
      },
      {
        id: `sig6`,
        spot: 'radar', prop: 'screen',
        title: `The Viral Video`,
        type: `order`,
        clue: `<p>The final diagnostic: a video is spreading on WhatsApp. It appears to show the Prime Minister announcing, <em>"All schools will close for two weeks."</em> A producer wants to read it on air immediately.</p>
<p>Your notes on the video: the lip movements do not quite match the words; the voice sounds slightly robotic; the account that posted it was created yesterday; no government website or official page mentions it.</p>
<p>Taped to the console is the station's fact-checking poster, <strong>"SIFT before you share"</strong>, but its four steps have peeled off and are lying on the desk:</p>
<ul>
<li><strong>F</strong>ind better coverage: check whether trusted news outlets and official government channels report the same thing.</li>
<li><strong>T</strong>race claims to the original source and context.</li>
<li><strong>S</strong>top: pause before sharing or reacting.</li>
<li><strong>I</strong>nvestigate the source: who posted it, and are they trustworthy?</li>
</ul>`,
        prompt: `Stick the SIFT steps back on the poster in the correct order.`,
        items: [
          `Stop: pause before sharing or reacting`,
          `Investigate the source: who posted it, and are they trustworthy?`,
          `Find better coverage: check trusted outlets and official channels`,
          `Trace claims to the original source and context`
        ],
        hint1: `The poster's title is an acronym. Read the first letters of each step.`,
        hint2: `S-I-F-T: Stop, Investigate, Find, Trace.`,
        explain: `<p>Mismatched lip-sync, an artificial-sounding voice, a brand-new account and no official confirmation are all red flags for a <strong>deepfake</strong>: AI-generated audio or video that makes someone appear to say or do something they never did. Spreading it would be <strong>fake news</strong> (disinformation) and could cause real harm during a crisis. The <strong>SIFT</strong> method (Stop, Investigate, Find, Trace) helps audiences and media professionals check information before sharing it. This is an ethical responsibility in Module 3's study of communication and technology.</p>`,
        digit: `8`
      }
    ],
    finalPrompt: `All six diagnostics complete. Key the six digits from your valve fuses into the door keypad, in the order you found them, to bring Island Wave FM back on air.`,
    finalCode: `914738`,
    finale: `<p>The transmitter hums, the ON AIR light glows red, and your clear, plain-language bulletin (in English, Spanish and Kreyol) goes out across the island. The fake video is flagged and never broadcast.</p>
<p>The engineer finally bursts in, out of breath: <em>"You fixed the process, beat the barriers, chose the right channels, spotted the appeals AND stopped a deepfake? You're hired."</em></p>`
  }

  ]
};
