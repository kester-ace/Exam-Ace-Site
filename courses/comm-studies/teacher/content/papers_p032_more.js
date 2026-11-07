/* Paper 032 practice material, set 2: Practice Papers D–G and annotated Section B samples.
   Appends to window.COURSE_PAPERS (kind 'p032') and window.COURSE_SAMPLES.p3 (reflective, expository).
   Each paper adds: strategy (the main strategy it emphasises), mirrors (past Paper 032 years whose
   question types and strategies it is equivalent to) and, on every question, skill.
   Developed by Kester Small. */
(function () {
  var W = typeof window !== 'undefined' ? window : this;
  var PAPERS = (W.COURSE_PAPERS = W.COURSE_PAPERS || []);
  var SAMPLES = (W.COURSE_SAMPLES = W.COURSE_SAMPLES || {});
  SAMPLES.p3 = SAMPLES.p3 || {};
  var REFLECTIVE = (SAMPLES.p3.reflective = SAMPLES.p3.reflective || []);
  var EXPOSITORY = (SAMPLES.p3.expository = SAMPLES.p3.expository || []);

  function hasPaper(id) { for (var i = 0; i < PAPERS.length; i++) { if (PAPERS[i] && PAPERS[i].id === id) return true; } return false; }
  function addPaper(p) { if (!hasPaper(p.id)) PAPERS.push(p); }
  function addSample(list, s) { for (var i = 0; i < list.length; i++) { if (list[i] && list[i].title === s.title) return; } list.push(s); }

  /* ---------- shared building blocks (the evaluated objects match papers_p032.js exactly) ---------- */
  var TECH = '\\b(rhyme|alliteration|personification|metaphor|simile|pun|rhetorical question|allusion|repetition|antithesis|parallelism|tricolon|hyperbole|assonance|chiasmus)\\b';
  var EXPLAIN = ['\\b(memorable|remember|urgent|urgency|vivid|image|emphasi|persuad|appeal|attention|catchy|rhythm)', '\\b(because|so that|which|suggests|makes|shows|creates)\\b'];

  function intro(topic, audience) {
    return '<p><b>CAPE Communication Studies · Paper 032</b><br>2 hours 15 minutes · 60 marks</p>\n' +
      '<p><b>Topic:</b> ' + topic + ' &nbsp;·&nbsp; <b>Intended audience:</b> ' + audience + '</p>\n' +
      '<p><b>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</b></p>\n<ol>\n' +
      '<li>This paper consists of TWO sections.</li>\n' +
      '<li>Answer ALL questions in each section.</li>\n' +
      '<li>Section A (20 marks) is based on the central stimulus. Read it carefully before you answer Questions 1 and 2.</li>\n' +
      '<li>Section B (40 marks) requires an original reflective OR expository piece and a justification paragraph.</li>\n' +
      '<li>You are advised to take some time to read through the paper and plan your answers.</li>\n' +
      '<li>You may bring a single single sheet of double-sided A4 paper with no more than 10 points related to the topic of your response.</li>\n</ol>';
  }
  function prompt(text, marks) { return '<p>' + text + '</p><p style="text-align:right">[' + marks + ' marks]</p>'; }
  function qA(o) {
    return { type: 'write', section: 'A', module: o.module, title: o.title, marks: o.marks, genre: 'Short answer', skill: o.skill,
      prompt: prompt(o.prompt, o.marks), min: o.min, max: o.max, checklist: o.checklist, rubric: o.rubric, key: o.key, model: o.model };
  }
  function slogan(relevantLook, strongSlogan, weakSlogan, extraExplain) {
    return [
      { criterion: 'Relevant slogan', marks: 1, look: [relevantLook], strong: strongSlogan, weak: weakSlogan },
      { criterion: 'Literary technique identified', marks: 1, look: [TECH], strong: 'Correctly names a literary technique actually present in the slogan.', weak: 'Technique misnamed or not present in the slogan.' },
      { criterion: 'Explanation of technique linked to issue', marks: 2, look: extraExplain || EXPLAIN, strong: 'Explains clearly how the technique conveys the message and appeals to the audience.', weak: 'Explanation unclear, incomplete or not linked to the issue.' }
    ];
  }
  var BAND_A = '<p><b>Rubric for Creative Piece</b></p>\n<table><tr><th>Criteria</th><th>Marks to be awarded</th></tr>\n' +
    '<tr><td>Candidate produces an excellent sample in terms of creativity, organisation and expression.</td><td>24–25 marks</td></tr>\n' +
    '<tr><td>Candidate produces a very good sample in terms of creativity, organisation and expression.</td><td>20–23 marks</td></tr>\n' +
    '<tr><td>Candidate produces a good sample in terms of creativity, organisation and expression.</td><td>15–19 marks</td></tr>\n' +
    '<tr><td>Candidate produces an adequate sample in terms of creativity, organisation and expression.</td><td>11–14 marks</td></tr>\n' +
    '<tr><td>Candidate produces an unsatisfactory sample in terms of creativity, organisation and expression.</td><td>6–10 marks</td></tr>\n' +
    '<tr><td>Candidate produces a weak sample in terms of creativity, organisation and expression.</td><td>0–5 marks</td></tr></table>\n' +
    '<p><b>Creativity factors (10):</b> unique/idiosyncratic use of genre; audience engagement; originality of ideas and events.</p>\n' +
    '<p><b>Organisation factors (7):</b> introduction, development and conclusion; thematic/episodic coherence; labelled sections and subsections where appropriate.</p>\n' +
    '<p><b>Expression factors (8):</b> appropriateness of register to genre; grammatical language; facilitative punctuation; careful proofreading.</p>\n';
  var BAND_B = '<p><b>Rubric for Justification of Reflective/Expository Piece</b></p>\n<table><tr><th>Criteria</th><th>Marks to be awarded</th></tr>\n' +
    '<tr><td>Candidate offers an excellent explanation of how the piece is related to the candidate\'s stated purpose, the intended audience and the context in which it is intended to be disseminated to the audience.</td><td>13–15 marks</td></tr>\n' +
    '<tr><td>Candidate offers a good explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>10–12 marks</td></tr>\n' +
    '<tr><td>Candidate offers a satisfactory explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>8–9 marks</td></tr>\n' +
    '<tr><td>Candidate offers a fair explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>5–7 marks</td></tr>\n' +
    '<tr><td>Candidate offers a weak explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>3–4 marks</td></tr>\n' +
    '<tr><td>Candidate offers an unacceptable explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>0–2 marks</td></tr></table>\n' +
    '<p><i>Marking note:</i> a paragraph that addresses only two of the three elements cannot normally score above the "fair" band.</p>';

  /* Section B: 3(a) and 3(b). o = {topic, audience, topicLook, strategySignal, strategyCheck, skillA, content, strategyNote, modelA, purposeKey, audienceKey, contextKey, audienceLook, modelB} */
  function sectionB(o) {
    var q3a = {
      type: 'write', section: 'B', title: 'Question 3(a)', marks: 25, genre: 'Reflective or expository piece', skill: o.skillA,
      prompt: '<p><b>SECTION B</b></p><p>3. (a) Write a reflective OR expository piece of between 200 and 250 words based on the topic <b>' + o.topic.toUpperCase() + '</b>. Your piece should be suitable for an audience of <b>' + o.audience + '</b>.</p><p style="text-align:right">[25 marks]</p>',
      min: 200, max: 250,
      checklist: [
        'I chose ONE genre (reflective OR expository) and stayed with it from start to finish.',
        'My piece is between 200 and 250 words and has a clear title.',
        o.strategyCheck,
        'My introduction hooks the reader and my conclusion leaves a clear final idea or call to action.',
        'My ideas are original and relevant to ' + o.audience.toLowerCase() + ', not a copy of the stimulus.',
        'My register suits the genre, and I proofread for grammar, spelling and punctuation.'
      ],
      rubric: [
        { criterion: 'Creativity', marks: 10, look: ['\\b(I|my|me|we|our|us)\\b', '\\b(remember|imagine|picture|felt|realised|realized|learned|wondered)\\b', '\\b(like a|as if|as though)\\b', '\\?', o.topicLook, '\\b(you|your|yours)\\b', '\\b(for example|for instance|such as|consider)\\b'], min: 3,
          strong: 'An original angle on the topic, with vivid, specific detail and a voice that keeps the intended audience engaged throughout.',
          weak: 'Generic or predictable ideas, little sense of audience, or a piece that simply restates the stimulus as a list of facts.' },
        { criterion: 'Organisation', marks: 7, look: ['\\b(first|firstly|then|next|later|finally|in conclusion|however|therefore|as a result|moreover|still|now|instead)\\b', '\\n\\s*\\n', o.strategySignal], min: 2,
          strong: 'A clear introduction, logically developed body and purposeful conclusion; paragraphs are coherent and linked by effective transitions that make the chosen strategy visible.',
          weak: 'No clear beginning or ending; ideas jump without links, or the piece is a single undivided block.' },
        { criterion: 'Expression', marks: 8, look: ['[.!?]\\s+[A-Z]', '[,;:]', '\\b(although|whereas|because|which|while|since|unless)\\b'], min: 2,
          strong: 'Register is consistently appropriate to the genre; sentences are varied, grammatical and carefully punctuated, with evidence of proofreading.',
          weak: 'Frequent errors in grammar, spelling or punctuation; register shifts inappropriately or is unsuited to the genre.' }
      ],
      key: '<p><b>Question 3(a)</b> &nbsp;[25 marks]</p>\n<p>The candidate writes EITHER a reflective piece (for example, a personal essay, memoir extract or journal entry) OR an expository piece (for example, a journalistic article, feature, radio talk or explanatory essay) of between 200 and 250 words on the topic <b>' + o.topic.toUpperCase() + '</b>, suitable for an audience of ' + o.audience.toLowerCase() + '.</p>\n<p><b>Possible content (not exhaustive):</b></p><ul>' + o.content + '</ul>\n' + BAND_A + '<p><i>Marking note:</i> ' + o.strategyNote + ' Place the script in a band first, then confirm the mark using the Creativity / Organisation / Expression split. A response that mixes genres without control, or that ignores the stated audience, should not normally be placed above the "good" band.</p>',
      model: o.modelA
    };
    var q3b = {
      type: 'write', section: 'B', title: 'Question 3(b)', marks: 15, genre: 'Justification', skill: 'Justification: purpose, intended audience and context of communication',
      prompt: '<p>3. (b) Based on your response in 3(a), write a paragraph of 50–100 words justifying the following:</p><ul><li>The purpose</li><li>The intended audience</li><li>The context of communication</li></ul><p style="text-align:right">[15 marks]</p>',
      min: 50, max: 100,
      checklist: [
        'I stated a specific purpose (e.g. to reflect, to inform, to persuade) and linked it to my piece.',
        'I described my intended audience precisely (' + o.audience.toLowerCase() + ') and explained why my piece suits them.',
        'I explained the context: where, when and through what channel the piece would be shared.',
        'My paragraph is between 50 and 100 words and refers directly to features of my 3(a) piece.'
      ],
      rubric: [
        { criterion: 'Purpose', marks: 5, look: ['\\bpurpose\\b', '\\b(to inform|to persuade|to educate|to reflect|to encourage|to raise awareness|to explain|to reassure|to compare)\\b', '\\b(aim|intend|goal)'], min: 1,
          strong: 'States a precise purpose and shows how specific features of the piece (tone, detail, structure) achieve it.',
          weak: 'Purpose is missing, vague ("to talk about the topic") or not linked to the piece.' },
        { criterion: 'Intended audience', marks: 5, look: o.audienceLook, min: 1,
          strong: 'Identifies the audience precisely and explains why the genre, register and content suit their needs and attitudes.',
          weak: 'Audience is not named, is too general ("everyone"), or no reason is given for the choices made.' },
        { criterion: 'Context of communication', marks: 5, look: ['\\bcontext\\b', '\\b(published|broadcast|posted|shared|read aloud|newsletter|newspaper|radio|website|social media|facebook|instagram|whatsapp|blog|assembly|magazine|meeting)\\b', '\\b(season|when|before|during|start of|beginning of|morning|november|october|december)\\b'], min: 1,
          strong: 'Explains where, when and through which channel the piece would reach the audience, and why that setting is effective.',
          weak: 'Context is omitted or confused with purpose; no channel, setting or timing is given.' }
      ],
      key: '<p><b>Question 3(b)</b> &nbsp;[15 marks]</p>\n<p>The justification must relate directly to the candidate\'s own response in 3(a) and address all three elements.</p>\n<ul>\n<li><b>Purpose:</b> ' + o.purposeKey + '</li>\n<li><b>Intended audience:</b> ' + o.audienceKey + '</li>\n<li><b>Context of communication:</b> ' + o.contextKey + '</li>\n</ul>\n' + BAND_B,
      model: o.modelB
    };
    return [q3a, q3b];
  }

  /* =====================================================================
     PRACTICE PAPER D · Food security (Young adults) · Jamaica
     Strategy: problem–solution and persuasive appeal
     ===================================================================== */
  addPaper({
    kind: 'p032', id: 'P032D',
    title: 'Paper 032 · Practice Paper D · Food security (Young adults)',
    strategy: 'Problem–solution and persuasive appeal',
    mirrors: [2019, 2020, 2025],
    time: 135,
    intro: intro('Food security', 'Young adults'),
    stimulus: `<p><b>SECTION A</b></p>
<p><i>Instructions: Read the extract below carefully and then answer the questions that follow.</i></p>
<p><i>The following press release was issued by the Agricultural Youth Development Agency, a government agency in Jamaica, in late October 2026. It was read on the national radio news and posted on the Agency's social media pages.</i></p>
<blockquote>
<p><b>PRESS RELEASE: YOUTH AGRI-START PROGRAMME OPENS FOR APPLICATIONS</b></p>
<p>The Agricultural Youth Development Agency invites young adults aged 18 to 25 to apply for the Youth Agri-Start Programme, a new initiative designed to strengthen national food security and to create income opportunities in rural and urban communities. Jamaica, like its CARICOM partners, imports a large share of the food its people eat, which leaves households exposed to rising prices whenever international supply chains are disrupted. The Agency's own 2026 survey of registered farmers also found that fewer than one in ten is under the age of 30.</p>
<p>Successful applicants will receive a start-up grant of up to J$250,000 for seeds, tools and drip irrigation; a five-year lease on up to one acre of government land at a nominal fee; and twelve weeks of free evening training in crop planning, soil testing, protected agriculture (greenhouse farming) and marketing, delivered by extension officers. Applicants who already have access to family land may apply for the grant and the training only.</p>
<p>Applications open on Monday 2 November 2026 and close on Friday 11 December 2026. Each applicant must submit a completed application form, a valid photo identification card, a Taxpayer Registration Number (TRN) and a one-page plan describing the crop or livestock he or she intends to produce. Forms are available online and at the Agency's parish offices from 8:30 a.m. to 4:30 p.m., Monday to Friday. Free information sessions will be held at parish libraries on Saturday mornings throughout November.</p>
</blockquote>`,
    questions: [
      qA({
        module: '1', title: 'Question 1(a)', marks: 4, skill: 'Audience analysis: barriers to receiving and acting on a message',
        prompt: '1. (a) Explain TWO challenges a 21-year-old who works evening shifts at a hotel and lives in a rural district of St. Mary is likely to face in receiving OR acting on the information in this press release.',
        min: 40, max: 150,
        checklist: [
          'I identified TWO different challenges, not the same one twice.',
          'I explained HOW each challenge would stop this young adult from receiving or acting on the information.',
          'I linked each challenge to a detail of the press release or of the young adult\'s situation (shift work, rural district).'
        ],
        rubric: [
          { criterion: 'Challenge 1 identified and explained', marks: 2,
            look: ['\\b(shift|shifts|evening|night|work|working|hours|schedule|8:30|4:30|saturday)\\b', '\\b(attend|training|office|session|clash|conflict|cannot|unable|miss)\\b'],
            strong: 'Names a challenge (e.g. working hours clash with office hours and evening training) and explains how it prevents the young adult from receiving or acting on the message.',
            weak: 'Names a challenge but does not explain its effect, or the challenge is unrelated to this young adult.' },
          { criterion: 'Challenge 2 identified and explained', marks: 2,
            look: ['\\b(formal|register|jargon|technical|nominal|protected agriculture|TRN|vocabulary|words)\\b', '\\b(document|documents|plan|form|identification|online|internet|data|transport|travel|distance|attitude|status|image|boring|social media)\\b'],
            strong: 'A second, distinct challenge (e.g. technical register, demanding documents, transport, negative attitudes to farming) clearly explained.',
            weak: 'Repeats the first challenge in different words or offers only a label.' }
        ],
        key: `<p><b>Question 1(a)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>Working evening shifts clashes with the times when information and help are available: the parish offices open only from 8:30 a.m. to 4:30 p.m. on weekdays, the information sessions are on Saturday mornings and the training takes place in the evenings, when he or she is at work.</li>
<li>The radio news bulletin may be broadcast while the young adult is working or asleep after a late shift, so the spoken announcement is missed.</li>
<li>Few young adults follow a government agency's social media pages; their feeds are dominated by entertainment, so the post may never reach them.</li>
<li>The formal, technical register ("nominal fee", "protected agriculture", "drip irrigation", "Taxpayer Registration Number") may confuse a reader with no farming background.</li>
<li>The application requires several documents and a one-page production plan; a young adult who has never written a plan may feel unqualified and decide not to apply.</li>
<li>Transport from a rural district to a parish office or library may be costly and irregular.</li>
<li>Negative attitudes: many young people associate farming with hard, poorly paid work, so they may dismiss the message as "not for me".</li>
</ul>
<p>Award 2 marks each for TWO complete and clearly explained challenges which the young adult may face in receiving or acting on the information.</p>
<p>Award 1 mark for a clear identification of a challenge which is not explained.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>One challenge is that the young adult's working hours clash with the times when help is offered. The parish offices close at 4:30 p.m. and the training runs in the evenings, exactly when a hotel shift worker is on duty, so even an interested applicant could not collect a form or attend the classes.</p><p>A second challenge is the formal, technical language. Terms such as "nominal fee", "protected agriculture" and "Taxpayer Registration Number" make the programme sound complicated and official, so a young person with no farming background may decide that it is not meant for him or her and never apply.</p>`
      }),
      qA({
        module: '1', title: 'Question 1(b)', marks: 4, skill: 'Media selection: matching ONE traditional and ONE digital medium to the audience',
        prompt: '1. (b) Justify the use of ONE traditional medium AND ONE digital medium that the Agency could use to persuade young adults to apply for the Youth Agri-Start Programme.',
        min: 40, max: 150,
        checklist: [
          'I chose ONE traditional medium (e.g. radio, television, a community meeting) and ONE digital medium (e.g. Instagram, WhatsApp, YouTube).',
          'I gave a reason why EACH medium suits young adults.',
          'I did not put a digital medium in the traditional slot, or the other way round.'
        ],
        rubric: [
          { criterion: 'Traditional medium named and justified', marks: 2,
            look: ['\\b(radio|television|tv|town hall|community meeting|youth club|church|word of mouth|loudspeaker|poster|billboard)\\b', '\\b(reach|rural|listen|popular|cheap|repeat|repeated|call-in|at work|bus|visual|trust)\\b'],
            strong: 'Names an appropriate traditional medium and justifies it with a clear advantage for young adults.',
            weak: 'Names a medium only, or offers a digital medium as the traditional choice.' },
          { criterion: 'Digital medium named and justified', marks: 2,
            look: ['\\b(instagram|tiktok|whatsapp|youtube|facebook|snapchat|sms|text message|influencer|reel|reels|podcast|app)\\b', '\\b(young|youth|share|scroll|video|visual|cheap|free|instant|interactive|comment|link)\\b'],
            strong: 'A digital medium young adults actually use, with a convincing justification (reach, shareability, visual appeal, direct link to the form).',
            weak: 'Digital medium missing, repeated, or justified only in general terms ("everyone uses it").' }
        ],
        key: `<p><b>Question 1(b)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li><b>Radio (traditional)</b> – music and sports stations have large youth audiences; it can be heard at work, on the bus or while doing chores; a short advertisement or an interview with a young farmer can be repeated many times a day; call-in programmes let listeners ask about eligibility.</li>
<li><b>Television (traditional)</b> – shows greenhouses and drip irrigation in action; can be placed during youth programmes, sports broadcasts or the evening news.</li>
<li><b>Community meetings or youth club visits (traditional, face-to-face)</b> – trusted and interactive; extension officers can answer questions on the spot.</li>
<li><b>Instagram or TikTok short videos (digital)</b> – the platforms young adults use most; a 30-second reel of a 22-year-old harvesting peppers makes farming look modern and possible; easily shared, with a link to the online form.</li>
<li><b>WhatsApp broadcast messages (digital)</b> – cheap and instant; can carry deadline reminders and voice notes.</li>
<li><b>YouTube or podcast interviews (digital)</b> – longer explanations of the grant and land lease that can be watched at any time, which suits shift workers.</li>
</ul>
<p>Award 2 marks for the justification of ONE appropriate traditional medium and 2 marks for the justification of ONE appropriate digital medium.</p>
<p>Award 1 mark for each medium identified but not justified. A digital medium offered as the traditional choice (or the reverse) earns no credit for that part.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p><b>Traditional medium: radio.</b> Many young adults listen to music and sports stations at work or on the bus, so a short advertisement featuring a young farmer, repeated throughout the day, would reach them even if they never read a newspaper or a government agency's page.</p><p><b>Digital medium: Instagram reels.</b> Young adults spend much of their leisure time on Instagram. A 30-second video of a 22-year-old harvesting sweet peppers in a greenhouse would make farming look modern and profitable, and the post can link directly to the online application form.</p>`
      }),
      qA({
        module: '1', title: 'Question 1(c)', marks: 2, skill: 'Evaluating a local source of information',
        prompt: '1. (c) Comment on ONE local source of information which a young adult could consult before deciding which crop to grow on a one-acre plot.',
        min: 20, max: 80,
        checklist: ['I named ONE specific local source.', 'I commented on why this source is reliable or accessible for a young adult choosing a crop.'],
        rubric: [
          { criterion: 'Local source identified', marks: 1,
            look: ['\\b(extension officer|officer|farmer|farmers|college|lecturer|4-h|farm store|farm-supply|supplier|ministry|agency|neighbour|grandparent|grandmother|grandfather|elder)\\b'],
            strong: 'Identifies a relevant local source of information.', weak: 'Source is vague ("the internet", "someone") or not local.' },
          { criterion: 'Comment on suitability', marks: 1,
            look: ['\\b(experience|experienced|trained|qualified|expert|knows|soil|rainfall|climate|reliable|trust|free|accessible|nearby)\\b'],
            strong: 'Explains why the source is credible or accessible for this decision.', weak: 'No comment on why the source would help.' }
        ],
        key: `<p><b>Question 1(c)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>An agricultural extension officer for the parish – trained in crop science, familiar with local soil and rainfall, and the advice is free.</li>
<li>An experienced farmer in the district – knows from years of practice which crops grow well and sell well locally.</li>
<li>A lecturer at a local agricultural college – expert, up-to-date knowledge of crops and protected agriculture.</li>
<li>Staff at a farm-supply store – practical advice on seeds suited to the area (although they may also wish to sell products).</li>
<li>A 4-H Club leader – experienced in guiding young people through their first agricultural projects.</li>
</ul>
<p>Award 2 marks for a satisfactory explanation of ONE local source of information which a young adult could consult.</p>
<p>Award 1 mark for an acceptable identification of a relevant local source of information but without adequate explanation.</p>`,
        model: `<p>The young adult could consult the agricultural extension officer for the parish. Extension officers are trained in crop science and know the soil and rainfall of the district, so they can recommend crops that will grow well on that plot, and their advice is free.</p>`
      }),
      qA({
        module: '2', title: 'Question 2(a)', marks: 4, skill: 'Dialectal variety and register: explaining an official language choice',
        prompt: '2. (a) The press release is written in Standard English using a formal register. Explain ONE reason for EACH of these choices, referring to details in the press release.',
        min: 40, max: 150,
        checklist: [
          'I gave a reason for the use of Standard English (the dialectal variety).',
          'I gave a reason for the use of a formal register.',
          'I supported each reason with a detail from the press release.'
        ],
        rubric: [
          { criterion: 'Standard English explained', marks: 2,
            look: ['\\b(standard english|acrolect|standard)\\b', '\\b(official|government|ministry|agency|credib|authority|understood|parish|news|caricom)\\b'],
            strong: 'Gives a clear reason for Standard English (official variety, credibility, wide understanding) linked to the press release.',
            weak: 'Variety misidentified (e.g. Creole) or named without a reason.' },
          { criterion: 'Formal register explained', marks: 2,
            look: ['\\bformal\\b', '\\b(legal|financial|precise|grant|lease|serious|technical|policy|eligib|press release)\\b'],
            strong: 'Gives a clear reason for the formal register (legal and financial detail, seriousness, conventions of a press release) linked to the text.',
            weak: 'Register misidentified or no reason given.' }
        ],
        key: `<p><b>Question 2(a)</b> &nbsp;[4 marks]</p>
<p><b>DIALECTAL VARIETY</b></p><p>Standard English is used because</p><ul>
<li>it is the official variety used by the government for public communication</li>
<li>it gives the press release authority and credibility, which matters when public money and land are being offered</li>
<li>it is understood across every parish and by readers beyond Jamaica, including CARICOM partners</li>
<li>the release will be read on the national radio news, which by convention uses Standard English.</li></ul>
<p><b>LANGUAGE REGISTER</b></p><p>A formal register is used because</p><ul>
<li>the communication comes from a government agency and concerns a national policy (food security)</li>
<li>it sets out legal and financial conditions (a five-year lease, a grant of up to J$250,000, a TRN) where precision avoids confusion about eligibility</li>
<li>precise technical terms ("drip irrigation", "protected agriculture") describe exactly what is offered</li>
<li>the conventions of a press release require objective, impersonal language.</li></ul>
<p>Award 2 marks for a clearly explained reason for the use of Standard English and 2 marks for a clearly explained reason for the use of a formal register.</p>
<p>Award 1 mark for each reason which is stated but not linked to the press release.</p>`,
        model: `<p>The press release uses Standard English because it is an official communication from a government agency that will be read on the national radio news and online. Standard English is understood in every parish and gives the programme credibility, which matters when the Agency is offering public money and land.</p><p>It uses a formal register because it sets out legal and financial conditions, such as a five-year lease, a grant of up to J$250,000 and the need for a Taxpayer Registration Number. Precise, formal wording avoids confusion about who is eligible and what must be submitted.</p>`
      }),
      qA({
        module: '2', title: 'Question 2(b)', marks: 2, skill: 'Selecting the key message points (summary skills)',
        prompt: '2. (b) Based on the press release, list the TWO MOST important message points which an audience of young adults would need to know.',
        min: 15, max: 80,
        checklist: ['I listed exactly TWO message points.', 'Each point comes from the press release and includes key details (what, who, when, how).'],
        rubric: [
          { criterion: 'Message point 1', marks: 1, look: ['\\b(grant|250|land|lease|acre|training|18|25)\\b'],
            strong: 'States an accurate, important message point from the press release.', weak: 'Point is inaccurate, trivial or not from the press release.' },
          { criterion: 'Message point 2', marks: 1, look: ['\\b(11 december|deadline|close|closes|apply|application|form|TRN|plan|parish|librar|2 november)\\b'],
            strong: 'States a second, distinct and accurate message point.', weak: 'Repeats point 1 or omits essential details such as the deadline.' }
        ],
        key: `<p><b>Question 2(b)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>Young adults aged 18 to 25 can apply for a start-up grant of up to J$250,000, a five-year lease on up to one acre of government land and twelve weeks of free training.</li>
<li>Applications open on Monday 2 November 2026 and close on Friday 11 December 2026.</li>
<li>Applicants need a completed form, photo identification, a TRN and a one-page crop or livestock plan; forms are available online and at the Agency's parish offices.</li>
<li>Free information sessions are held at parish libraries on Saturday mornings in November.</li>
</ul>
<p>Award 1 mark each for TWO clearly stated message points which the audience would need to know.</p>`,
        model: `<ul><li>Young adults aged 18 to 25 can receive a grant of up to J$250,000, land on a five-year lease and twelve weeks of free training to start farming.</li><li>Applications, with photo ID, a TRN and a one-page plan, must be submitted online or at a parish office between 2 November and 11 December 2026.</li></ul>`
      }),
      qA({
        module: '2', title: 'Question 2(c)', marks: 4, skill: 'Slogan writing: ONE literary technique used as a persuasive appeal',
        prompt: '2. (c) Create a slogan which you could use to persuade young adults to take up farming, using ONE literary technique.',
        min: 25, max: 120,
        checklist: ['I wrote a short, memorable slogan that encourages young adults to farm.', 'I named ONE literary technique used in the slogan.', 'I explained how the technique persuades young adults.'],
        rubric: slogan('\\b(farm|farming|grow|plant|soil|seed|crop|harvest|food|land|garden|yard)\\b',
          'A concise, original slogan clearly encouraging young adults to take up farming.',
          'Slogan missing, too long, or unrelated to farming or food security.'),
        key: `<p><b>Question 2(c)</b> &nbsp;[4 marks]</p>
<p><b>POSSIBLE SLOGANS</b></p><ul>
<li>"Swap the scroll for the soil." – <b>alliteration</b> (s) and an implied contrast between scrolling and farming make the line catchy and challenge young adults to use their time differently.</li>
<li>"Plant today, eat tomorrow, earn for life." – <b>tricolon/parallelism</b>: three linked benefits build to the idea of a lasting income.</li>
<li>"Grow your future from the ground up." – <b>pun</b>: "from the ground up" means both "from the soil" and "step by step", presenting farming as a career.</li>
<li>"Our food, our future: who will grow it if not you?" – <b>rhetorical question</b> with direct address creates a sense of personal responsibility.</li>
</ul>
<p>Any other relevant slogan accompanied by an explanation of the related use of a literary technique.</p>
<p>Award 1 mark for a relevant slogan which could be used to persuade young adults to take up farming, 1 mark for inclusion of a literary technique used to appeal to the audience and 2 marks for the explanation of the technique which is linked to the issue of food security.</p>
<p>Award 1 mark for an explanation which is unclear or incomplete.</p>
<p style="text-align:right">[4 marks]</p>`,
        model: `<p><b>Slogan:</b> "Swap the scroll for the soil."</p><p><b>Technique:</b> alliteration ("swap", "scroll", "soil").</p><p><b>Explanation:</b> The repeated "s" sound makes the slogan quick and catchy, which suits young adults who skim messages on their phones. It also sets up a contrast between scrolling, a habit many young people feel guilty about, and soil, suggesting that time spent online could instead be spent growing food and earning money.</p>`
      })
    ].concat(sectionB({
      topic: 'Food security', audience: 'Young adults',
      topicLook: '\\b(food|farm|farming|crop|crops|grow|import|imports|plant|harvest|garden|price|prices|soil)\\b',
      strategySignal: '\\b(problem|solution|solve|instead|so that|in order to|the answer|start|therefore|act)\\b',
      strategyCheck: 'I used a clear problem–solution structure: I named the problem precisely, offered realistic solutions and ended with a persuasive call to action.',
      skillA: 'Section B writing: problem–solution structure with a persuasive call to action',
      content: `<li>Reflective: a personal experience of rising food prices or empty shelves after a storm; a grandparent's kitchen garden; a first harvest; how the writer's attitude to farming or to local food changed.</li>
<li>Expository: what food security means; why heavy dependence on imports is risky; the ageing farming population; practical solutions such as backyard and container gardening, buying local, protected agriculture and using technology to market produce; programmes that support young farmers.</li>`,
      strategyNote: 'Strategy focus: problem–solution and persuasive appeal. Stronger scripts state the problem precisely, offer solutions that young adults could realistically adopt and close with a call to action; a list of facts without solutions, or solutions without a clear problem, should not normally be placed above the "good" band.',
      modelA: `<p><b>Grow the Change: Why Food Security Needs Your Generation</b></p>
<p>Check the labels in your kitchen tonight. The rice, the flour, the chicken and even the "island" seasoning may have crossed an ocean to reach you. Food security means that everyone can rely on enough safe, nutritious food at a price they can afford. When most of what we eat is imported, a storm, a war or a shipping delay far away can empty our shelves and push up our bills.</p>
<p>The problem is not only what we import but who is left to grow food at home. Most farmers in the region are older, and few young people see agriculture as a career. Yet young adults have exactly what modern farming needs: comfort with technology, energy and the confidence to sell online.</p>
<p>The solutions are already within reach. Greenhouses protect crops from heavy rain and pests. Drip irrigation saves water during drought. A smartphone can connect a grower with restaurants, hotels and customers who want fresh, local produce. Programmes for young farmers offer land, training and grants, so beginners do not have to start from nothing.</p>
<p>None of this will happen, however, if we keep scrolling past the opportunity. Start small: a few pepper plants on a balcony, a callaloo bed in the yard, or an application before the deadline. Every crop we grow ourselves is one less meal that depends on a ship. Food security is not someone else's job. It is our generation's harvest.</p>`,
      purposeKey: 'e.g. to inform young adults about why food security is threatened and to persuade them to grow, buy or market local food; OR to reflect on a personal experience (a grandparent\'s garden, a first harvest) that changed the writer\'s attitude. The candidate should link purpose to features such as the problem–solution structure or the call to action.',
      audienceKey: 'young adults (possibly a sub-group such as unemployed school leavers, university students or young urban workers), with reasons why the register, tone, examples (phones, online sales, side incomes) and content suit them.',
      contextKey: 'where, when and how the piece would be shared, e.g. a youth news website or blog shared on Instagram and WhatsApp while applications for a young farmers\' programme are open; a youth radio programme; a campus magazine at the start of the academic year.',
      audienceLook: ['\\baudience\\b', '\\b(young adults?|youth|young people|generation|18 to 25)\\b', '\\b(readers?|listeners?|viewers?)\\b'],
      modelB: `<p>My purpose was to inform young adults about the causes of food insecurity and to persuade them that they can be part of the solution, which is why the article moves from the problem to practical solutions and ends with a direct call to action. The intended audience is Jamaican young adults aged 18 to 25, so I used examples such as smartphones and online sales and a confident, conversational tone. The article would be published on a youth news website and shared on Instagram in November 2026, while applications for the Youth Agri-Start Programme are open.</p>`
    }))
  });

  /* =====================================================================
     PRACTICE PAPER E · Marine pollution (Fisherfolk) · St. Lucia
     Strategy: cause–effect
     ===================================================================== */
  addPaper({
    kind: 'p032', id: 'P032E',
    title: 'Paper 032 · Practice Paper E · Marine pollution (Fisherfolk)',
    strategy: 'Cause–effect',
    mirrors: [2017, 2022, 2024],
    time: 135,
    intro: intro('Marine pollution', 'Fisherfolk'),
    stimulus: `<p><b>SECTION A</b></p>
<p><i>Instructions: Read the extract below carefully and then answer the questions that follow.</i></p>
<p><i>The following notice was published in the November 2026 newsletter of a fisherfolk cooperative serving the east and south coasts of St. Lucia. It was also read on a community radio station's early-morning programme.</i></p>
<blockquote>
<p><b>NOTICE TO ALL FISHERFOLK: WHAT THE SEA IS SENDING BACK</b></p>
<p>Since the first major sargassum influx in 2011, fisherfolk along St. Lucia's coasts have reported fewer fishing days, clogged engine intakes and nets fouled by seaweed and plastic. Scientists link the larger seaweed blooms to warmer sea temperatures and to nutrients carried into the Atlantic by rivers and agricultural run-off. When the seaweed rots on the shore, it releases hydrogen sulphide, a gas that smells like rotten eggs and can irritate the eyes and lungs.</p>
<p>At the same time, plastic bottles, bags and lost fishing gear are breaking down into small fragments which are swallowed by fish. Abandoned "ghost nets" continue to trap fish, lobsters and turtles long after they have been lost. As fish stocks decline and boats spend more days ashore, household incomes in fishing communities decline with them.</p>
<p>In response, the cooperative, working with fisheries officers, will launch the Clean Catch Net Return Scheme on Monday 16 November 2026. Fisherfolk who bring old or damaged nets, lines and plastic waste to the landing sites at Dennery, Micoud or Vieux Fort will receive a credit voucher of EC$5 for each full bag, redeemable at the cooperative store for fuel, ice or gear. Free workshops on clearing sargassum from engines safely will be held at each landing site on Thursdays at 3:00 p.m. Sightings of large sargassum mats or abandoned nets should be reported to the cooperative office by telephone or by WhatsApp message, with a photograph and the location.</p>
</blockquote>`,
    questions: [
      qA({
        module: '1', title: 'Question 1(a)', marks: 4, skill: 'Audience analysis: causes of a communication breakdown',
        prompt: '1. (a) Explain TWO reasons why a fisherman who leaves port before dawn and returns in the early afternoon might NOT receive OR act on the information in this notice.',
        min: 40, max: 150,
        checklist: [
          'I gave TWO different reasons, not the same one twice.',
          'I explained how each reason (the cause) stops the fisherman from receiving or acting on the notice (the effect).',
          'I linked each reason to the fisherman\'s working day or to details of the notice.'
        ],
        rubric: [
          { criterion: 'Reason 1 identified and explained', marks: 2,
            look: ['\\b(dawn|morning|at sea|radio|asleep|tired|rest|3:00|thursday|selling|market|time|programme)\\b', '\\b(miss|missed|misses|cannot|unable|clash|busy|never hear|not hear|while)\\b'],
            strong: 'Gives a clear reason (e.g. he is at sea during the early-morning radio programme; the Thursday workshops clash with selling his catch) and explains its effect.',
            weak: 'Names a reason without explaining its effect, or the reason does not fit this fisherman.' },
          { criterion: 'Reason 2 identified and explained', marks: 2,
            look: ['\\b(newsletter|read|reading|literacy|formal|jargon|technical|influx|hydrogen|kw[eé]y[oò]l|creole|language|words)\\b', '\\b(space|store|bag|bags|voucher|habit|tradition|distrust|trust|smartphone|whatsapp|data|photo|worth)\\b'],
            strong: 'A second, distinct reason (e.g. formal written English, little space on the boat, a voucher that seems not worth the effort, no smartphone) clearly explained.',
            weak: 'Repeats the first reason or offers only a label.' }
        ],
        key: `<p><b>Question 1(a)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>He leaves before dawn, so he is at sea, working the engine and nets, when the notice is read on the early-morning radio programme.</li>
<li>He may not read the newsletter: he is tired after an early start, may have limited literacy, or may prefer to receive information orally.</li>
<li>The workshops at 3:00 p.m. on Thursdays clash with the time he spends selling his catch, cleaning the boat or resting.</li>
<li>Practical barriers to acting: a small boat has little space to store bags of old gear, and an EC$5 voucher may not seem worth the effort.</li>
<li>Habit and distrust: discarding old gear at sea may be a long-standing practice, and he may be sceptical of official schemes or of what "scientists" say.</li>
<li>The formal Standard English and terms such as "influx", "agricultural run-off", "hydrogen sulphide" and "redeemable" may not suit a fisherman who is more comfortable in Kwéyòl.</li>
<li>He may not own a smartphone or have data to send a WhatsApp photograph of a sighting.</li>
</ul>
<p>Award 2 marks each for TWO complete and clearly explained reasons.</p>
<p>Award 1 mark for a clear identification of a reason which is not explained.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>One reason is timing. The notice is read on the radio's early-morning programme, but this fisherman has already left port before dawn and is busy at sea with his engine and nets, so he misses the broadcast completely.</p><p>A second reason is the language of the notice. Words such as "influx", "agricultural run-off" and "redeemable" are formal and technical, and many older fishermen on the east coast are more comfortable in Kwéyòl. Even if he reads the newsletter, he may not understand how the voucher works, so he does not act on it.</p>`
      }),
      qA({
        module: '1', title: 'Question 1(b)', marks: 4, skill: 'Media selection: media other than those already used',
        prompt: '1. (b) Justify TWO appropriate media, OTHER THAN radio and the cooperative newsletter, through which the Clean Catch Net Return Scheme could be communicated to fisherfolk.',
        min: 40, max: 150,
        checklist: ['I chose TWO media and did NOT choose radio or the newsletter.', 'I gave a reason why EACH medium suits fisherfolk and their working day.', 'My two media are clearly different from each other.'],
        rubric: [
          { criterion: 'Medium 1 named and justified', marks: 2,
            look: ['\\b(face to face|face-to-face|meeting|briefing|word of mouth|landing site|demonstrat|loudspeaker|public address|poster|posters|notice board|church|television|tv)\\b', '\\b(gather|daily|every day|trust|trusted|respected|question|visual|picture|pictures|oral|orature|kw[eé]y[oò]l)\\b'],
            strong: 'Names an appropriate medium (e.g. face-to-face briefings at the landing site) and justifies it for fisherfolk.',
            weak: 'Names radio or the newsletter, or gives a medium without a justification.' },
          { criterion: 'Medium 2 named and justified', marks: 2,
            look: ['\\b(whatsapp|voice note|voice notes|sms|text|facebook|video|youtube|tiktok|television|tv|poster|posters|loudspeaker|meeting)\\b', '\\b(already use|group|groups|share|cheap|instant|quick|speech|spoken|visual|repeat|anytime|any time)\\b'],
            strong: 'A second, distinct medium with a convincing justification linked to fisherfolk (e.g. WhatsApp voice notes, which suit people who prefer speech).',
            weak: 'Second medium missing, repeated, or justified only in general terms.' }
        ],
        key: `<p><b>Question 1(b)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li><b>Face-to-face briefings at the landing sites (word of mouth)</b> – fisherfolk gather there every day; the briefing is interactive and can be given by trusted officers or respected senior fishers, in Kwéyòl where appropriate; it suits those who prefer orature.</li>
<li><b>Posters or notice boards at landing sites and fish markets</b> – seen daily; pictures of ghost nets and the voucher reduce the reading required.</li>
<li><b>WhatsApp voice notes or group messages</b> – many fishers already share weather and prices in WhatsApp groups; voice notes suit people who prefer speech and can be recorded in Kwéyòl; cheap and instant.</li>
<li><b>Loudspeaker or public address announcements</b> at market days or community fish fries – reach people where they gather.</li>
<li><b>Demonstrations</b> during the Thursday workshops by "peer champions" who have used the scheme.</li>
<li><b>A television news feature</b> – shows ghost nets and sargassum visually and reaches families at home.</li>
</ul>
<p>Award 2 marks each for the justification of TWO appropriate media. Award 1 mark for each medium identified but not justified. No credit for radio or the newsletter.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>The first medium is a face-to-face briefing at each landing site. Fisherfolk gather there every day to land and sell their catch, so a respected senior fisher or officer could explain the scheme in Kwéyòl and answer questions on the spot, which suits a community that trusts the spoken word.</p><p>The second medium is WhatsApp voice notes. Many fishers already use WhatsApp groups to share weather and prices, and a short voice note can be played at sea or at home, at any time, without the need to read anything.</p>`
      }),
      qA({
        module: '1', title: 'Question 1(c)', marks: 2, skill: 'Evaluating a local source of information',
        prompt: '1. (c) Comment on ONE local source of information which a fisherman could consult to find out whether large mats of sargassum are likely to reach his fishing grounds in the coming week.',
        min: 20, max: 80,
        checklist: ['I named ONE specific local source.', 'I commented on why this source is reliable for a sargassum forecast.'],
        rubric: [
          { criterion: 'Local source identified', marks: 1,
            look: ['\\b(fisheries officer|officer|officers|cooperative|meteorolog|met office|weather|coast ?guard|experienced|senior|elder|bulletin|forecast)\\b'],
            strong: 'Identifies a relevant local source of information.', weak: 'Source is vague ("the internet", "people") or not local.' },
          { criterion: 'Comment on suitability', marks: 1,
            look: ['\\b(satellite|trained|scientific|data|experience|years|reliable|current|updated|accurate|observ|patrol)\\b'],
            strong: 'Explains why the source is credible for a short-term sargassum forecast.', weak: 'No comment on why the source would help.' }
        ],
        key: `<p><b>Question 1(c)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>A fisheries officer at the landing site – receives official sargassum outlooks (based on satellite observation) and is trained to interpret them for local conditions.</li>
<li>The national meteorological service – forecasts of wind and currents, which drive sargassum towards the coast.</li>
<li>Experienced senior fishers – years of observing currents and seasons help them predict when weed will arrive.</li>
<li>The coast guard – patrols the coastline and can report large mats at sea.</li>
<li>Regional sargassum outlook bulletins shared by the cooperative office – scientific forecasts updated regularly.</li>
</ul>
<p>Award 2 marks for a satisfactory explanation of ONE local source of information. Award 1 mark for identification without adequate explanation.</p>`,
        model: `<p>He could consult the fisheries officer at the landing site. The officer receives regular sargassum outlooks based on satellite observations and is trained to explain what they mean for this stretch of coast, so the advice is current and reliable.</p>`
      }),
      qA({
        module: '2', title: 'Question 2(a)', marks: 4, skill: 'Dialect and register: adapting a written message for a face-to-face audience',
        prompt: '2. (a) A cooperative officer will explain the scheme face to face at the Dennery landing site. Explain TWO ways in which she could change the dialectal variety OR the language register used in the written notice, and why each change would help her audience.',
        min: 40, max: 150,
        checklist: ['I described TWO changes (to the dialectal variety and/or the register).', 'For EACH change I explained why it would help fisherfolk understand or trust the message.', 'I referred to words or features of the written notice that she would change.'],
        rubric: [
          { criterion: 'Change 1 identified and explained', marks: 2,
            look: ['\\b(kw[eé]y[oò]l|creole|patois|vernacular|dialect|mesolect|basilect|first language)\\b', '\\b(older|elder|comfortable|trust|solidarity|respect|understand|identify|relate|belong)\\b'],
            strong: 'Identifies a change of variety (e.g. to Kwéyòl or the local English vernacular) and explains how it builds understanding or trust.',
            weak: 'Change named without explanation, or a change that would not suit fisherfolk.' },
          { criterion: 'Change 2 identified and explained', marks: 2,
            look: ['\\b(casual|consultative|informal|intimate|conversational|plain|simple|everyday)\\b', '\\b(influx|run-off|redeemable|technical|jargon|example|examples|question|questions|explain|relaxed|practical)\\b'],
            strong: 'Identifies a change of register (e.g. from formal to consultative, replacing technical terms with everyday words) and explains how it helps.',
            weak: 'Repeats the first change or gives only a label.' }
        ],
        key: `<p><b>Question 2(a)</b> &nbsp;[4 marks]</p>
<p><b>DIALECTAL VARIETY</b></p><ul>
<li>She could switch from Standard English to St. Lucian Kwéyòl (the French-lexicon Creole) or to the local English vernacular, because many older fisherfolk speak Kwéyòl as their first or most comfortable language; it signals respect and solidarity, reduces the distance between an official and the fishers and increases trust and understanding.</li>
<li>She could code-switch, giving key details in both Kwéyòl and English, so that everyone present follows the message.</li></ul>
<p><b>LANGUAGE REGISTER</b></p><ul>
<li>She could move from the formal register of the notice to a consultative or casual register, replacing "influx", "agricultural run-off" and "redeemable" with everyday words (for example, "you can use the voucher to buy fuel or ice at the co-op"), so the scheme sounds practical rather than bureaucratic.</li>
<li>She could use questions, examples and stories from the landing site to invite responses and encourage participation.</li></ul>
<p>Award 2 marks for each of TWO changes: 1 mark for identifying the change and 1 mark for explaining how it would help the audience.</p>`,
        model: `<p>First, she could explain the scheme in Kwéyòl instead of Standard English. Many older fishermen at Dennery are more comfortable in Kwéyòl, so hearing the message in their own variety would help them understand the details and show that she respects them as a community, which builds trust.</p><p>Second, she could use a consultative, everyday register instead of the formal one. Rather than saying that vouchers are "redeemable at the cooperative store", she could simply say that each bag of old nets earns five dollars towards fuel or ice, and invite questions, so the scheme sounds practical and easy to join.</p>`
      }),
      qA({
        module: '2', title: 'Question 2(b)', marks: 2, skill: 'Selecting the key message points (summary skills)',
        prompt: '2. (b) Based on the notice, list the TWO MOST important message points which an audience of fisherfolk would need to know.',
        min: 15, max: 80,
        checklist: ['I listed exactly TWO message points.', 'Each point comes from the notice and includes key details (what, where, when).'],
        rubric: [
          { criterion: 'Message point 1', marks: 1, look: ['\\b(net|nets|plastic|bag|bags|voucher|EC\\$?5|16 november|landing site|landing sites|scheme)\\b'],
            strong: 'States an accurate, important message point from the notice.', weak: 'Point is inaccurate, trivial or not from the notice.' },
          { criterion: 'Message point 2', marks: 1, look: ['\\b(workshop|workshops|thursday|thursdays|3:00|report|whatsapp|photo|photograph|hydrogen|gas|eyes|lungs)\\b'],
            strong: 'States a second, distinct and accurate message point.', weak: 'Repeats point 1 or omits essential details.' }
        ],
        key: `<p><b>Question 2(b)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>From Monday 16 November 2026, old nets, lines and plastic waste brought to the Dennery, Micoud or Vieux Fort landing sites earn an EC$5 voucher per full bag, which can be used for fuel, ice or gear at the cooperative store.</li>
<li>Free workshops on clearing sargassum from engines safely are held at each landing site on Thursdays at 3:00 p.m.</li>
<li>Large sargassum mats or abandoned nets should be reported to the cooperative by telephone or WhatsApp, with a photograph and the location.</li>
<li>Rotting sargassum releases hydrogen sulphide, which can irritate the eyes and lungs.</li>
</ul>
<p>Award 1 mark each for TWO clearly stated message points which the audience would need to know.</p>`,
        model: `<ul><li>From 16 November 2026, each full bag of old nets, lines or plastic taken to the Dennery, Micoud or Vieux Fort landing site earns an EC$5 voucher for fuel, ice or gear.</li><li>Free workshops on clearing sargassum from engines safely run at every landing site on Thursdays at 3:00 p.m.</li></ul>`
      }),
      qA({
        module: '2', title: 'Question 2(c)', marks: 4, skill: 'Slogan writing: a cause–effect message with ONE literary technique',
        prompt: '2. (c) Create a slogan that shows a cause and its effect, using ONE literary technique, to encourage fisherfolk to bring old nets and plastic waste back to shore.',
        min: 25, max: 120,
        checklist: ['My slogan links a cause (what fisherfolk do) to an effect (what happens to the sea or the catch).', 'I named ONE literary technique used in the slogan.', 'I explained how the technique makes the cause–effect message persuasive.'],
        rubric: slogan('\\b(net|nets|sea|tide|catch|fish|plastic|ocean|boat|shore|weed|harvest)\\b',
          'A concise, original slogan that links a cause to its effect and encourages fisherfolk to return old gear and plastic.',
          'Slogan missing, too long, unrelated to the scheme, or with no cause–effect link.',
          ['\\b(cause|effect|result|leads?|because|consequence|returns?|comes back)\\b', '\\b(memorable|remember|vivid|image|emphasi|persuade|appeal|attention|urgent|catchy)\\b']),
        key: `<p><b>Question 2(c)</b> &nbsp;[4 marks]</p>
<p><b>POSSIBLE SLOGANS</b></p><ul>
<li>"What we throw, the tide throws back." – <b>personification</b> of the tide and a balanced, repeated structure show that pollution returns to the people who caused it.</li>
<li>"Leave a net, lose a catch." – <b>alliteration</b> (l) and <b>parallelism</b> tie the cause (abandoned gear) directly to the effect (lost income).</li>
<li>"Ghost nets haunt our harvest." – <b>metaphor</b> and <b>alliteration</b> (h): lost gear keeps "killing" fish long after it is gone.</li>
<li>"Clean sea, full net." – <b>parallelism</b>: four words link the action to its reward.</li>
</ul>
<p>Any other relevant slogan accompanied by an explanation of the related use of a literary technique.</p>
<p>Award 1 mark for a relevant slogan showing a cause and its effect, 1 mark for inclusion of a literary technique used to appeal to the audience and 2 marks for the explanation of the technique which is linked to the issue of marine pollution.</p>
<p>Award 1 mark for an explanation which is unclear or incomplete.</p>
<p style="text-align:right">[4 marks]</p>`,
        model: `<p><b>Slogan:</b> "What we throw, the tide throws back."</p><p><b>Technique:</b> personification (the tide "throws back" what it is given).</p><p><b>Explanation:</b> Giving the tide a human action makes the sea seem to answer fisherfolk directly, so the cause (throwing plastic and old nets overboard) leads visibly to the effect (rubbish returning to the shore and the nets). The repeated verb "throw" makes the line memorable and suggests that fishers have the power to stop the cycle.</p>`
      })
    ].concat(sectionB({
      topic: 'Marine pollution', audience: 'Fisherfolk',
      topicLook: '\\b(sea|ocean|plastic|sargassum|weed|net|nets|fish|catch|boat|engine|beach|shore|reef)\\b',
      strategySignal: '\\b(because|as a result|consequently|therefore|leads? to|causes?|effects?|result)\\b',
      strategyCheck: 'I used a clear cause–effect structure: each cause is linked to its effect on the sea, the catch or fisherfolk\'s income with connectives such as "as a result" or "consequently".',
      skillA: 'Section B writing: cause–effect explanation or reflection',
      content: `<li>Reflective: a personal experience of a day lost to sargassum, finding a ghost net, a damaged engine or a falling catch; how the writer came to see the link between careless habits and smaller catches; a change in behaviour.</li>
<li>Expository: the causes of sargassum blooms (warmer seas, nutrients from rivers and farms) and of plastic pollution (litter, lost gear); the effects on engines, catches, health, tourism and income; practical actions fisherfolk can take; how the community can respond together.</li>`,
      strategyNote: 'Strategy focus: cause–effect. Stronger scripts make each link in the chain explicit (cause, effect, consequence for fisherfolk), using connectives such as "as a result" and "consequently"; a list of effects with no causes should not normally be placed above the "good" band.',
      modelA: `<p><b>What the Sea Sends Back</b></p>
<p>Every fisherman knows that the sea keeps its own accounts. What we take from it, we must pay for, and lately the bill has been arriving at our landing sites in brown mats of sargassum and tangled plastic.</p>
<p>The first cause is heat. Warmer water and nutrients washed into the ocean from rivers and farms help the weed to grow faster than ever before. As a result, thick mats drift across our fishing grounds, choke engine intakes and keep boats on shore for days at a time.</p>
<p>The second cause is closer to home: what we throw away. And where does a bottle tossed from a boat go? It does not disappear. Sun and salt break it into tiny pieces that small fish mistake for food, and the bigger fish we catch eat those small fish. A net cut loose and left behind becomes a ghost net, still catching lobster and turtles that no one will ever sell.</p>
<p>The effects reach every household. Fewer fishing days mean less income. Damaged engines mean costly repairs. Smaller catches mean higher prices for the families who buy from us at the market.</p>
<p>We cannot cool the ocean alone, but we can break part of the chain. Bring old nets and plastic back to shore, report drifting gear and clear weed safely from engines. When we stop feeding the problem, the sea can start feeding us again.</p>`,
      purposeKey: 'e.g. to explain the causes and effects of marine pollution so that fisherfolk understand how their own actions can break the chain; OR to reflect on a personal experience (a ghost net, a stalled engine) and persuade others to return old gear. The candidate should link purpose to features such as the cause–effect structure or the call to action.',
      audienceKey: 'fisherfolk (possibly a sub-group such as young boat crews, fish vendors or older fishers in a named community), with reasons why the register, examples (engines, nets, landing sites, market prices) and tone suit them.',
      contextKey: 'where, when and how the piece would be shared, e.g. read aloud on a community radio station\'s early-morning fishing programme, printed in a cooperative newsletter when a net return scheme begins, or presented at a landing-site meeting.',
      audienceLook: ['\\baudience\\b', '\\bfisher(folk|men|man|women|s)?\\b', '\\b(readers?|listeners?|viewers?)\\b'],
      modelB: `<p>The purpose of this expository piece is to explain the causes and effects of marine pollution so that fisherfolk understand how their own actions can break the chain, which is why each paragraph moves from a cause to its effect on boats and income. The intended audience is fisherfolk on St. Lucia's east coast, so I used the familiar idea of the sea "keeping accounts" and practical details about engines and nets. It would be read aloud on the community radio station's early-morning programme and printed in the cooperative newsletter when the Clean Catch scheme begins.</p>`
    }))
  });

  /* =====================================================================
     PRACTICE PAPER F · Cultural heritage (Secondary school students) · Dominica
     Strategy: narrative and reflection
     ===================================================================== */
  addPaper({
    kind: 'p032', id: 'P032F',
    title: 'Paper 032 · Practice Paper F · Cultural heritage (Secondary school students)',
    strategy: 'Narrative and reflection',
    mirrors: [2017, 2022, 2025],
    time: 135,
    intro: intro('Cultural heritage', 'Secondary school students'),
    stimulus: `<p><b>SECTION A</b></p>
<p><i>Instructions: Read the extract below carefully and then answer the questions that follow.</i></p>
<p><i>The following extract is from a reflective blog post written by a retired teacher in Dominica. It was published on a community heritage group's website and shared on the group's social media pages in October 2026.</i></p>
<blockquote>
<p><b>WHEN THE STORYTELLER CALLED, WE ANSWERED</b></p>
<p>When I was a boy in Grand Bay, there was no electricity on our hill, and nobody missed it. On Friday nights, the whole yard gathered around my grandmother's doorstep while a kerosene lamp hissed beside her. She would clap her hands once and call out, "Tim tim?" and every child would shout back, "Bwa sèk!" Only then could the story begin.</p>
<p>Her tales were about Konpè Lapen, the clever rabbit who always outwitted the bigger animals, and about the jumbies who waited at crossroads for children who stayed out too late. She told them mostly in Kwéyòl, switching to English only when she wanted to scold us. "Allyou hush now," she would say, "or the jumbie go hear you and come." We hushed. We also learned, without knowing it, the names of every plant on the hill, the history of our village and the patience it takes to listen.</p>
<p>Last month I visited a secondary school in Roseau and asked a class of fifth formers how many of them had heard a Konpè Lapen story. Two hands went up. I am not angry; I am worried. Every time an elder dies with stories untold, a door to our past closes, and no key can open it again.</p>
<p>That is why our heritage group is inviting secondary school students to "Storytelling Under the Stars" on Saturday 7 November 2026, from 6:30 p.m., at the Grand Bay community centre. Elders will tell stories, and students who bring a phone may record an elder, with permission, for our new online story archive. Admission is free, and a bus will leave the Roseau public library at 5:30 p.m.</p>
</blockquote>`,
    questions: [
      qA({
        module: '1', title: 'Question 1(a)', marks: 4, skill: 'Audience analysis: barriers to receiving and responding to an invitation',
        prompt: '1. (a) Explain TWO challenges a fifth-form student who lives in Roseau and speaks little Kwéyòl might face in receiving OR responding to the invitation in this blog post.',
        min: 40, max: 150,
        checklist: ['I identified TWO different challenges.', 'I explained how each challenge would stop the student from receiving or responding to the invitation.', 'I linked each challenge to the blog post or to the student\'s situation (Roseau, little Kwéyòl).'],
        rubric: [
          { criterion: 'Challenge 1 identified and explained', marks: 2,
            look: ['\\b(website|social media|online|page|follow|blog|skim|long|last paragraph|end|buried)\\b', '\\b(never see|not see|miss|reach|notice|stop reading|find|seen)\\b'],
            strong: 'Names a challenge in receiving the invitation (e.g. teenagers rarely visit a heritage group\'s website; the details are buried at the end of a long post) and explains its effect.',
            weak: 'Names a challenge without explaining its effect, or the challenge does not fit this student.' },
          { criterion: 'Challenge 2 identified and explained', marks: 2,
            look: ['\\b(kw[eé]y[oò]l|creole|language|tim tim|bwa|unfamiliar|excluded|old-fashioned|boring|attitude|transport|bus|permission|parents|evening|saturday|grand bay|distance|shy)\\b', '\\b(because|so|therefore|feel|feels|cannot|unable|might|may)\\b'],
            strong: 'A second, distinct challenge (e.g. unfamiliar Kwéyòl expressions, negative attitudes to heritage, transport or parental permission for an evening event) clearly explained.',
            weak: 'Repeats the first challenge or offers only a label.' }
        ],
        key: `<p><b>Question 1(a)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>The post appears on a heritage group's website and social media pages, which few teenagers in Roseau follow, so the invitation may never reach them.</li>
<li>The invitation appears only in the final paragraph of a long reflective post; a student who skims may stop reading before reaching the details.</li>
<li>Unfamiliar Kwéyòl expressions ("Tim tim?", "Bwa sèk!", "Konpè Lapen") may make a student who speaks little Kwéyòl feel excluded, as if the event is not meant for him or her.</li>
<li>Attitude: many young people see storytelling and heritage as old-fashioned compared with social media and music, so they may not respond.</li>
<li>Practical barriers: an evening event in Grand Bay requires transport and parental permission; the bus leaves Roseau at 5:30 p.m. and the return will be late; Saturday jobs, sport or church commitments may clash.</li>
<li>Being asked to record an elder may intimidate a shy student.</li>
</ul>
<p>Award 2 marks each for TWO complete and clearly explained challenges. Award 1 mark for a clear identification of a challenge which is not explained.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>One challenge is that the student may never see the invitation. It is posted on a heritage group's website and social media pages, which most teenagers in Roseau do not follow, and the details appear only in the last paragraph of a long reflective post, so a student who skims would miss them.</p><p>A second challenge is language. The post opens with Kwéyòl expressions such as "Tim tim?" and "Bwa sèk!" and refers to Konpè Lapen without explanation. A student who speaks little Kwéyòl may feel that the event is meant for village children who grew up with the language, and so may not respond.</p>`
      }),
      qA({
        module: '1', title: 'Question 1(b)', marks: 4, skill: 'Media selection: ONE traditional and ONE digital medium for a youth audience',
        prompt: '1. (b) Justify ONE traditional medium AND ONE digital medium which the heritage group could use to encourage secondary school students to attend "Storytelling Under the Stars".',
        min: 40, max: 150,
        checklist: ['I chose ONE traditional medium and ONE digital medium.', 'I explained why EACH would reach and persuade secondary school students.', 'My reasons refer to how students actually spend their time.'],
        rubric: [
          { criterion: 'Traditional medium named and justified', marks: 2,
            look: ['\\b(assembly|classroom|visit|radio|television|tv|poster|posters|notice board|church|word of mouth|announcement|face to face|face-to-face)\\b', '\\b(students?|teen|teens|young|school|captive|trust|hear|experience|taste|interactive|everyone)\\b'],
            strong: 'Names an appropriate traditional medium (e.g. an elder\'s visit to a school assembly) and justifies it for students.',
            weak: 'Names a medium only, or offers a digital medium as the traditional choice.' },
          { criterion: 'Digital medium named and justified', marks: 2,
            look: ['\\b(instagram|tiktok|whatsapp|youtube|facebook|snapchat|podcast|reel|video|qr)\\b', '\\b(share|scroll|young|teen|teens|students?|caption|captions|clip|free|instant|viral|archive)\\b'],
            strong: 'A digital medium teenagers use, with a convincing justification (short clips, captions, shareability).',
            weak: 'Digital medium missing or justified only in general terms.' }
        ],
        key: `<p><b>Question 1(b)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li><b>A school assembly or classroom visit by an elder storyteller (traditional, face-to-face)</b> – reaches every student at once; a short live story gives a "taste" of the event and makes it feel exciting rather than old-fashioned; students can ask questions.</li>
<li><b>Radio (traditional)</b> – a youth or morning programme with an elder telling a story and announcing the date; reaches students and parents at home and in taxis.</li>
<li><b>Posters on school notice boards (traditional print)</b> – seen daily; a bold image of a lamp-lit storytelling night attracts attention.</li>
<li><b>TikTok or Instagram reels (digital)</b> – a 30-second clip of an elder telling a story, with English captions, suits the short videos teenagers watch and share; links to the archive.</li>
<li><b>WhatsApp class groups (digital)</b> – class representatives can share the flyer and bus time instantly.</li>
<li><b>YouTube channel for the story archive (digital)</b> – shows what students will help to build.</li>
</ul>
<p>Award 2 marks for the justification of ONE appropriate traditional medium and 2 marks for ONE appropriate digital medium. Award 1 mark for each medium identified but not justified.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p><b>Traditional medium: a school assembly visit.</b> If an elder told a two-minute Konpè Lapen story at assembly, every student would hear it at once, and a live performance would show that storytelling is entertaining rather than old-fashioned. Students could ask about the bus on the spot.</p><p><b>Digital medium: TikTok.</b> Teenagers watch and share short videos every day. A 30-second clip of the "Tim tim? Bwa sèk!" call-and-response, with English captions, would make the tradition feel fresh and could spread quickly from one class group to another.</p>`
      }),
      qA({
        module: '1', title: 'Question 1(c)', marks: 2, skill: 'Evaluating a local source of information',
        prompt: '1. (c) Comment on ONE local source of information, other than the writer, which a student could consult to learn the meaning of a traditional story or custom.',
        min: 20, max: 80,
        checklist: ['I named ONE specific local source other than the writer.', 'I commented on why the source is reliable or accessible.'],
        rubric: [
          { criterion: 'Local source identified', marks: 1,
            look: ['\\b(elder|elders|grand(mother|father|parent|parents)|storyteller|cultural (division|office|officer)|librar|library|documentation|museum|historian|curator|committee|teacher)\\b'],
            strong: 'Identifies a relevant local source of information.', weak: 'Source is vague ("the internet") or is the writer.' },
          { criterion: 'Comment on suitability', marks: 1,
            look: ['\\b(first-hand|experience|knowledge|lived|grew up|expert|research|records?|reliable|trusted|accurate|documents?|collection)\\b'],
            strong: 'Explains why the source is credible or accessible.', weak: 'No comment on why the source would help.' }
        ],
        key: `<p><b>Question 1(c)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>An elder in the community (a grandparent or village storyteller) – first-hand knowledge of the tradition as it was lived.</li>
<li>Officers of the national cultural division – they document traditions and organise heritage events, so their information is researched.</li>
<li>The public library or national documentation centre – collections of recorded folk tales and local histories.</li>
<li>A teacher of Kwéyòl or a member of a Creole language committee – can explain expressions and their origins.</li>
<li>A local historian or museum curator – researched, documented knowledge.</li>
</ul>
<p>Award 2 marks for a satisfactory explanation of ONE local source of information. Award 1 mark for identification without adequate explanation.</p>`,
        model: `<p>A student could ask an elder in his or her own community, such as a grandparent who grew up with these stories. Elders have first-hand knowledge of what the stories and customs meant in daily life, and they are close by and usually happy to explain.</p>`
      }),
      qA({
        module: '2', title: 'Question 2(a)', marks: 4, skill: 'Dialectal variation in narrative: reasons for using Standard English and Creole',
        prompt: '2. (a) Explain TWO reasons why the writer uses both Standard English and Creole (Kwéyòl or Dominican English Creole) in this extract.',
        min: 40, max: 150,
        checklist: ['I gave TWO different reasons.', 'I quoted or referred to an example of Creole (and, where relevant, of Standard English) from the extract.', 'I explained the effect of each choice on the reader.'],
        rubric: [
          { criterion: 'Reason 1 identified and explained', marks: 2,
            look: ['\\b(standard english|acrolect|standard|narrat|narration)\\b', '\\b(reader|readers|wide|website|teacher|clear|credib|formal|diaspora|understood|contrast)\\b'],
            strong: 'A clear reason (e.g. Standard English narration reaches a wide public readership; the contrast between varieties mirrors the generation gap) explained with reference to the extract.',
            weak: 'A reason stated without explanation or not linked to the extract.' },
          { criterion: 'Reason 2 identified and explained', marks: 2,
            look: ['\\b(kw[eé]y[oò]l|creole|tim tim|bwa s[eè]k|allyou|konp[eè] lapen|dialogue)\\b', '\\b(authentic|real|realism|identity|tradition|culture|heritage|intimacy|nostalgi|character|grandmother|scold)\\b'],
            strong: 'A second reason (e.g. authenticity of the storytelling tradition, realism of the grandmother\'s voice, identity and nostalgia) explained with an example.',
            weak: 'Repeats the first reason or gives only a label.' }
        ],
        key: `<p><b>Question 2(a)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li><b>Standard English for the narration</b> – the writer is a retired teacher writing for a wide public readership on a website, including readers in other territories and in the diaspora; Standard English makes the reflection clear and credible.</li>
<li><b>Kwéyòl in the call-and-response</b> ("Tim tim?" / "Bwa sèk!") and in the name "Konpè Lapen" – authenticity: this is how storytelling sessions actually began; it preserves the tradition in its original language and shows readers exactly what is at risk of being lost.</li>
<li><b>Dominican English Creole in the grandmother's dialogue</b> ("Allyou hush now… or the jumbie go hear you and come") – realism of characterisation; it captures her voice and shows the switch she made when scolding (code-switching), revealing her authority in the family; it also creates intimacy and nostalgia.</li>
<li><b>Contrast</b> – the movement between the varieties mirrors the gap between the writer's childhood and today's students, reinforcing his concern.</li>
</ul>
<p>Award 2 marks for each of TWO reasons clearly explained with reference to the extract. Award 1 mark for a reason which is stated but not explained or not linked to the extract.</p>`,
        model: `<p>First, the writer narrates in Standard English because the post is published on a public website for a wide readership, including people outside Grand Bay and overseas. Standard English makes his reflection clear and gives it the credibility of a former teacher.</p><p>Second, he keeps the Creole of the storytelling nights, such as the call "Tim tim?" and the reply "Bwa sèk!", and his grandmother's warning, "Allyou hush now". These lines make the scene authentic and let readers hear the tradition in its own voice, which shows exactly what is being lost when young people no longer know these words.</p>`
      }),
      qA({
        module: '2', title: 'Question 2(b)', marks: 2, skill: 'Main message in no more than 30 words (summary skills)',
        prompt: '2. (b) In no more than 30 words, state the main message of the extract.',
        min: 15, max: 30,
        checklist: ['My answer is 30 words or fewer and in my own words.', 'I included the writer\'s concern (the tradition is being lost) AND his response (the invitation to hear and record elders).'],
        rubric: [
          { criterion: 'Concern: the storytelling tradition is being lost', marks: 1, look: ['\\b(los[st]|lose|losing|disappear|dying|die|fad|forgot|forgotten|vanish|threat|risk)\\b'],
            strong: 'Accurately states the writer\'s concern.', weak: 'Concern missing, or the answer retells the childhood memories instead.' },
          { criterion: 'Response: students are invited to hear and record elders', marks: 1, look: ['\\b(invit|record|listen|hear|attend|archive|elders?|storytelling under the stars)\\b'],
            strong: 'Accurately states the writer\'s response or call to action.', weak: 'Response missing or inaccurate; or the answer exceeds 30 words.' }
        ],
        key: `<p><b>Question 2(b)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answer (example):</b></p>
<p>Traditional storytelling, which once taught children language, history and patience, is disappearing among young Dominicans, so the writer invites students to hear and record elders before the stories are lost.</p>
<p>Award 2 marks for an accurate statement of the main message, within 30 words, which captures BOTH the concern (the tradition is being lost) and the response (students invited to listen to and record elders).</p>
<p>Award 1 mark for an answer which captures only one of these, or which exceeds the word limit.</p>`,
        model: `<p>Traditional storytelling, which once taught children language, history and patience, is disappearing among young Dominicans, so the writer invites students to hear and record elders before the stories are lost.</p>`
      }),
      qA({
        module: '2', title: 'Question 2(c)', marks: 4, skill: 'Slogan writing: ONE literary technique appealing to youth identity',
        prompt: '2. (c) Create a slogan which you could use to encourage secondary school students to learn traditional stories from elders, using ONE literary technique.',
        min: 25, max: 120,
        checklist: ['I wrote a short, memorable slogan aimed at secondary school students.', 'I named ONE literary technique used in the slogan.', 'I explained how the technique appeals to young people and links to cultural heritage.'],
        rubric: slogan('\\b(story|stories|elder|elders|tell|hear|listen|heritage|culture|tradition|voice|voices|past|roots)\\b',
          'A concise, original slogan clearly encouraging students to learn stories from elders.',
          'Slogan missing, too long, or unrelated to traditional stories or heritage.'),
        key: `<p><b>Question 2(c)</b> &nbsp;[4 marks]</p>
<p><b>POSSIBLE SLOGANS</b></p><ul>
<li>"Hear it, keep it, tell it." – <b>tricolon/parallelism</b>: three short commands give a simple sequence of actions and a memorable rhythm.</li>
<li>"Old stories, new voices." – <b>antithesis</b>: the contrast of old and new presents young people as the next storytellers rather than an audience.</li>
<li>"Every elder is a library: visit before it closes." – <b>metaphor</b>: elders become libraries of knowledge, and "before it closes" adds urgency.</li>
<li>"Tim tim? Answer before the stories are gone!" – <b>allusion</b> to the traditional storytelling call, inviting students to join the call-and-response.</li>
</ul>
<p>Any other relevant slogan accompanied by an explanation of the related use of a literary technique.</p>
<p>Award 1 mark for a relevant slogan, 1 mark for inclusion of a literary technique used to appeal to the audience and 2 marks for the explanation of the technique which is linked to the issue of cultural heritage.</p>
<p>Award 1 mark for an explanation which is unclear or incomplete.</p>
<p style="text-align:right">[4 marks]</p>`,
        model: `<p><b>Slogan:</b> "Old stories, new voices."</p><p><b>Technique:</b> antithesis (the contrast between "old" and "new").</p><p><b>Explanation:</b> The contrast makes a memorable point: heritage is not only about the past, because it needs young voices to continue. This appeals to teenagers' wish to be active and creative rather than passive listeners, and the four-word structure is short enough to print on a T-shirt or a reel caption.</p>`
      })
    ].concat(sectionB({
      topic: 'Cultural heritage', audience: 'Secondary school students',
      topicLook: '\\b(heritage|culture|cultural|tradition|traditions|story|stories|elder|elders|grand(mother|father|parent)|festival|music|dance|language|kw[eé]y[oò]l|creole|ancestors?|masquerade)\\b',
      strategySignal: '\\b(when|that night|afterwards|later|now|realised|realized|used to|since|until)\\b',
      strategyCheck: 'I narrated a specific episode and then reflected on its meaning: the reader can see what happened AND how my thinking changed.',
      skillA: 'Section B writing: a narrative episode that leads to reflection',
      content: `<li>Reflective: a memory of a festival, storytelling night or family tradition (masquerade, bèlè drumming, cooking a traditional dish, learning a craft); the moment the writer realised its value; a change in attitude or behaviour.</li>
<li>Expository: what cultural heritage includes (tangible and intangible); why traditions are at risk (ageing elders, migration, screens, negative attitudes); how young people can preserve them (recording elders, school clubs, festivals, social media); the link between heritage and identity.</li>`,
      strategyNote: 'Strategy focus: narrative and reflection. Stronger reflective scripts narrate one specific episode and then examine its meaning; the reflection, not the plot, earns the top band. Expository scripts may open with a short anecdote before explaining.',
      modelA: `<p><b>The Recording on My Phone</b></p>
<p>I nearly did not go. A Saturday night with elders in a community centre sounded, to my fifteen-year-old ears, like a punishment. My mother made me take the bus anyway, and I sat at the back with my earphones in, waiting for the evening to end.</p>
<p>Then an old man named Mr. Augustin tapped the microphone and called, "Tim tim?" The grandmothers in the front row shouted, "Bwa sèk!" so loudly that I took my earphones out. He told a story about Konpè Lapen tricking a tiger into guarding his garden, and the whole room laughed in the same places, as if they had rehearsed it for sixty years. I realised that, in a way, they had.</p>
<p>Afterwards, I asked if I could record him. He agreed, but only if I promised to tell the story to someone else. That promise has stayed with me. My phone is full of videos I never watch again, yet that recording feels different, like something borrowed that I must return.</p>
<p>I used to think heritage belonged in museums, behind glass. Now I think it lives in voices, and voices do not last for ever. Mr. Augustin is eighty-three. If my generation does not listen now, there will be nothing left to record. So, the next time someone calls "Tim tim?", answer. You may be the last person who can.</p>`,
      purposeKey: 'e.g. to reflect on an experience that changed the writer\'s attitude to heritage and to persuade other teenagers to take part; OR to explain what cultural heritage is and how young people can preserve it. The candidate should link purpose to features such as the narrative turning point or the closing call to action.',
      audienceKey: 'secondary school students (possibly a sub-group such as urban students who speak little Kwéyòl, or students in a heritage club), with reasons why the narrator\'s age, the examples (earphones, phones, videos) and the register suit them.',
      contextKey: 'where, when and how the piece would be shared, e.g. read at a school assembly or published in the school magazine during the October independence and Creole celebrations; posted on a heritage group\'s Instagram page before a storytelling night.',
      audienceLook: ['\\baudience\\b', '\\b(secondary school students?|students?|teenagers?|teens?|young people|peers?|classmates)\\b', '\\b(readers?|listeners?|viewers?)\\b'],
      modelB: `<p>The purpose of this memoir extract is to reflect on how one storytelling evening changed my attitude to heritage and to persuade other teenagers to listen to elders while they still can. The intended audience is secondary school students in Dominica, so the narrator is a reluctant fifteen-year-old with earphones, someone they will recognise, and the piece ends with a direct challenge to them. It would be read aloud at a school assembly in late October, during the independence and Creole celebrations, and posted on the heritage group's Instagram page before the next storytelling night.</p>`
    }))
  });

  /* =====================================================================
     PRACTICE PAPER G · Renewable energy (Small business owners) · Barbados
     Strategy: compare–contrast
     ===================================================================== */
  addPaper({
    kind: 'p032', id: 'P032G',
    title: 'Paper 032 · Practice Paper G · Renewable energy (Small business owners)',
    strategy: 'Compare–contrast',
    mirrors: [2016, 2018, 2022],
    time: 135,
    intro: intro('Renewable energy', 'Small business owners'),
    stimulus: `<p><b>SECTION A</b></p>
<p><i>Instructions: Read the extract below carefully and then answer the questions that follow.</i></p>
<p><i>The following fact sheet was produced by a small business association in Barbados. It was emailed to members and posted on the association's website in November 2026.</i></p>
<blockquote>
<p><b>FACT SHEET: GRID OR SUN? COMPARING ENERGY OPTIONS FOR SMALL BUSINESSES</b></p>
<p>Barbados has set a national goal of generating all of its electricity from renewable sources by 2030. For small businesses, the more immediate question is whether installing rooftop solar photovoltaic (PV) panels would reduce operating costs. The table below compares two options for a typical small bakery with a monthly electricity bill of about BDS$2,400. The figures are estimates; actual results depend on roof size, orientation and daily energy use.</p>
<table>
<tr><th>Feature</th><th>Option A: Remain on the grid only</th><th>Option B: Install grid-connected rooftop solar PV</th></tr>
<tr><td>Upfront cost</td><td>None</td><td>About BDS$48,000 for a 12 kW system, or a loan repaid monthly</td></tr>
<tr><td>Estimated monthly electricity cost</td><td>About BDS$2,400, rising when fuel prices rise</td><td>About BDS$700, plus loan repayments if financed</td></tr>
<tr><td>Payback period</td><td>Not applicable</td><td>Approximately five to seven years</td></tr>
<tr><td>Maintenance</td><td>None required by the business</td><td>Panel cleaning every few months; inverter check every year</td></tr>
<tr><td>Power outages</td><td>Business cannot operate until power is restored</td><td>Continues only if a battery backup is added (extra cost)</td></tr>
<tr><td>Environmental impact</td><td>Electricity largely generated from imported fossil fuels</td><td>Clean energy produced on site; lower carbon emissions</td></tr>
</table>
<p>Members may book a free energy audit, in which a certified technician visits the business, reviews twelve months of electricity bills and recommends the most suitable option. Audits are available from Monday 30 November 2026. To book, call the association's office or complete the online form before Friday 11 December 2026. Members who choose Option B may apply for a low-interest Green Business Loan through participating credit unions.</p>
</blockquote>`,
    questions: [
      qA({
        module: '1', title: 'Question 1(a)', marks: 4, skill: 'Audience analysis: barriers to understanding and acting on a message',
        prompt: '1. (a) Explain TWO challenges the owner of a small roadside snackette in a rural parish might face in understanding OR acting on the information in this fact sheet.',
        min: 40, max: 150,
        checklist: ['I identified TWO different challenges.', 'I explained how each challenge would stop the owner from understanding or acting on the fact sheet.', 'I linked each challenge to the fact sheet or to the snackette owner\'s situation.'],
        rubric: [
          { criterion: 'Challenge 1 identified and explained', marks: 2,
            look: ['\\b(technical|jargon|photovoltaic|pv|kw|inverter|payback|grid|figures|numbers|table|vocabulary|terms|bakery)\\b', '\\b(understand|confus|difficult|unclear|apply|own (case|business)|compare)\\b'],
            strong: 'Names a challenge in understanding (e.g. technical terms; figures based on a bakery, not a snackette) and explains its effect.',
            weak: 'Names a challenge without explaining its effect.' },
          { criterion: 'Challenge 2 identified and explained', marks: 2,
            look: ['\\b(cost|48,000|loan|savings|afford|rent|rents|landlord|email|internet|online|time|alone|busy|deadline)\\b', '\\b(cannot|unable|may not|might not|so|because|therefore)\\b'],
            strong: 'A second, distinct challenge in acting (e.g. upfront cost, renting the building, no time to book an audit, rarely checking email) clearly explained.',
            weak: 'Repeats the first challenge or offers only a label.' }
        ],
        key: `<p><b>Question 1(a)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>Technical vocabulary ("photovoltaic", "12 kW system", "inverter", "payback period", "grid-connected") may not be understood by an owner without technical training, so the comparison is confusing.</li>
<li>The figures are for "a typical small bakery" with a BDS$2,400 bill; a snackette with a smaller bill and roof cannot easily apply the numbers to its own case.</li>
<li>The upfront cost of about BDS$48,000, or the idea of taking a loan, may seem impossible for a small business with limited savings, so the owner does not act.</li>
<li>The owner may rent the building and need the landlord's permission before installing panels.</li>
<li>The fact sheet was emailed and posted online; an owner who rarely checks email or uses the internet may never see it.</li>
<li>Running the business alone leaves little time to book or attend an audit before the 11 December deadline.</li>
</ul>
<p>Award 2 marks each for TWO complete and clearly explained challenges. Award 1 mark for a clear identification of a challenge which is not explained.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>One challenge is understanding the technical language. Terms such as "photovoltaic", "12 kW system" and "payback period" assume knowledge that a snackette owner may not have, so the comparison between the two options could be confusing rather than helpful.</p><p>A second challenge is acting on the information. Option B costs about BDS$48,000 upfront, and a small roadside business may have little savings and may be nervous about a loan. If the owner also rents the building, he or she would need the landlord's permission, so the most likely response is to do nothing.</p>`
      }),
      qA({
        module: '1', title: 'Question 1(b)', marks: 4, skill: 'Media selection: digital media and technologies for a professional audience',
        prompt: '1. (b) Justify TWO digital media or technologies, other than email and the association\'s website, that the association could use to explain the comparison to its members.',
        min: 40, max: 150,
        checklist: ['I chose TWO digital media or technologies and did NOT choose email or the website.', 'I explained why EACH suits busy small business owners.', 'My two choices are clearly different.'],
        rubric: [
          { criterion: 'Digital medium 1 named and justified', marks: 2,
            look: ['\\b(whatsapp|youtube|facebook|instagram|tiktok|video|webinar|zoom|live|podcast|app|calculator|sms|text message)\\b', '\\b(daily|already use|quick|cheap|visual|interactive|question|questions|any time|anytime|personal|share)\\b'],
            strong: 'Names an appropriate digital medium and justifies it for small business owners.',
            weak: 'Names email or the website, or gives a medium without a justification.' },
          { criterion: 'Digital medium 2 named and justified', marks: 2,
            look: ['\\b(whatsapp|youtube|facebook|instagram|tiktok|video|webinar|zoom|live|podcast|app|calculator|sms|text message)\\b', '\\b(own bill|personal|enter|figures|interactive|question|questions|visual|remind|reminder|deadline|any time|anytime)\\b'],
            strong: 'A second, distinct digital medium with a convincing justification (e.g. an online calculator that personalises the comparison).',
            weak: 'Second medium missing, repeated, or justified only in general terms.' }
        ],
        key: `<p><b>Question 1(b)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li><b>WhatsApp broadcast or group messages</b> with short voice notes and an infographic of the table – most small business owners already use WhatsApp daily to take orders; quick and cheap.</li>
<li><b>A short YouTube or Facebook video</b> showing a real business before and after installing solar – visual, can be watched at any time.</li>
<li><b>A live webinar or Facebook Live question-and-answer session</b> with a certified technician – interactive; owners can ask about their own situation.</li>
<li><b>An online savings calculator (web tool or app)</b> where owners enter their bill and roof size – personalises the comparison, overcoming the "typical bakery" problem.</li>
<li><b>SMS text reminders</b> of the audit deadline – reach owners who rarely check email.</li>
</ul>
<p>Award 2 marks each for the justification of TWO appropriate digital media or technologies. Award 1 mark for each medium identified but not justified. No credit for email or the website.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>First, the association could use WhatsApp. Most small business owners already use it every day to take orders, so a short voice note and a simple infographic of the table would reach them quickly and cheaply.</p><p>Second, it could offer an online savings calculator. An owner would enter his or her own monthly bill and roof size and see personal figures for both options, which solves the problem that the fact sheet's numbers are based on a bakery that may be very different from the owner's business.</p>`
      }),
      qA({
        module: '1', title: 'Question 1(c)', marks: 2, skill: 'Evaluating a local source of information',
        prompt: '1. (c) Comment on ONE local source of information which a business owner could consult to check whether rooftop solar panels would suit his or her building.',
        min: 20, max: 80,
        checklist: ['I named ONE specific local source.', 'I commented on why this source is reliable for judging a building.'],
        rubric: [
          { criterion: 'Local source identified', marks: 1,
            look: ['\\b(installer|engineer|electrician|technician|energy (officer|division|office)|audit|utility|light (and|&) power|business owners?|contractor|neighbour)\\b'],
            strong: 'Identifies a relevant local source of information.', weak: 'Source is vague or not local.' },
          { criterion: 'Comment on suitability', marks: 1,
            look: ['\\b(certified|qualified|trained|experience|independent|official|first-hand|roof|shade|shading|orientation|reliable|accurate)\\b'],
            strong: 'Explains why the source is credible for judging this building (roof strength, orientation, shading).', weak: 'No comment on why the source would help.' }
        ],
        key: `<p><b>Question 1(c)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>A certified solar installer or electrical engineer – qualified to assess roof strength, orientation and shading (although an installer may also wish to sell a system).</li>
<li>Energy officers in the government's energy division – independent, official advice.</li>
<li>The technician who carries out the free energy audit – reviews the business's actual bills and building.</li>
<li>Other business owners nearby who have installed panels – first-hand experience of costs, savings and problems.</li>
<li>The electricity utility's customer service – rules and requirements for connecting a system to the grid.</li>
</ul>
<p>Award 2 marks for a satisfactory explanation of ONE local source of information. Award 1 mark for identification without adequate explanation.</p>`,
        model: `<p>The owner could consult a certified solar installer. An installer is trained to check whether a roof is strong enough, faces the right direction and is free of shade, so the advice is based on the actual building, although the owner should compare more than one quotation.</p>`
      }),
      qA({
        module: '2', title: 'Question 2(a)', marks: 4, skill: 'Register: identifying features of a formal, technical register',
        prompt: '2. (a) Explain TWO features of the language of the fact sheet which show that it is written in a formal, technical register.',
        min: 40, max: 150,
        checklist: ['I identified TWO different language features.', 'I quoted an example of EACH feature from the fact sheet.', 'I explained how each feature makes the register formal and technical.'],
        rubric: [
          { criterion: 'Feature 1 identified and explained', marks: 2,
            look: ['\\b(technical|jargon|specialist|vocabulary|terms?|photovoltaic|pv|kw|inverter|payback|grid)\\b', '\\b(precise|specific|subject|accurate|expert|energy)\\b'],
            strong: 'Identifies a feature (e.g. technical vocabulary) with an example and explains how it shows the register.',
            weak: 'Feature named without an example or explanation.' },
          { criterion: 'Feature 2 identified and explained', marks: 2,
            look: ['\\b(impersonal|third person|third-person|objective|passive|numbers?|figures|statistics|data|units|table|headings?|complex sentences?|standard english|no slang|members may)\\b', '\\b(formal|serious|authority|credib|professional|objective)\\b'],
            strong: 'A second, distinct feature (e.g. impersonal third-person style, precise figures and units, passive constructions, a comparison table) with an example and explanation.',
            weak: 'Repeats the first feature or offers only a label.' }
        ],
        key: `<p><b>Question 2(a)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li><b>Technical vocabulary</b> – "photovoltaic (PV)", "12 kW system", "inverter", "payback period", "grid-connected", "carbon emissions": subject-specific terms that are precise for the field of energy.</li>
<li><b>Precise numerical data and units</b> – "BDS$2,400", "BDS$48,000", "five to seven years": objective, measurable information rather than opinion.</li>
<li><b>An impersonal, third-person style</b> with no slang or contractions – "Members may book a free energy audit"; "The figures are estimates": objective and authoritative.</li>
<li><b>Passive and noun-heavy constructions</b> – "Audits are available", "Electricity largely generated from imported fossil fuels": the focus is on facts, not on people.</li>
<li><b>Formal vocabulary and complete, complex sentences in Standard English</b> – "operating costs", "participating credit unions".</li>
<li><b>Organisational features</b> – a formal heading and a comparison table, conventions of official documents.</li>
</ul>
<p>Award 2 marks for each of TWO features: 1 mark for identifying the feature with an example and 1 mark for explaining how it shows the formal, technical register.</p>`,
        model: `<p>The first feature is technical vocabulary. Terms such as "photovoltaic (PV)", "inverter" and "payback period" belong to the specialist language of energy. They are precise, but they assume an informed reader, which marks the register as technical.</p><p>The second feature is the impersonal, objective style. The fact sheet never uses "I" or slang; instead it states, "The figures are estimates" and "Members may book a free energy audit". Combined with exact figures such as BDS$48,000, this third-person style makes the document sound formal and authoritative.</p>`
      }),
      qA({
        module: '2', title: 'Question 2(b)', marks: 2, skill: 'Compare–contrast: selecting the key differences',
        prompt: '2. (b) Based on the fact sheet, state the TWO MOST important differences between Option A and Option B which a small business owner would need to know.',
        min: 15, max: 80,
        checklist: ['I stated exactly TWO differences.', 'Each difference refers to BOTH options (A and B), not just one.'],
        rubric: [
          { criterion: 'Difference 1', marks: 1, look: ['\\b(upfront|cost|costs|bill|48,000|2,400|700|loan|payback|save|saving|savings)\\b'],
            strong: 'States an accurate difference that addresses both options.', weak: 'Describes only one option, or the difference is inaccurate.' },
          { criterion: 'Difference 2', marks: 1, look: ['\\b(outage|outages|power cut|battery|maintenance|clean|cleaning|inverter|environment|environmental|fossil|carbon|emission|emissions|payback|years)\\b'],
            strong: 'States a second, distinct and accurate difference.', weak: 'Repeats difference 1 or omits one of the options.' }
        ],
        key: `<p><b>Question 2(b)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>Cost: Option A has no upfront cost but a high monthly bill (about BDS$2,400) that rises with fuel prices; Option B costs about BDS$48,000 upfront (or a loan) but reduces the bill to about BDS$700.</li>
<li>Payback: solar pays for itself in about five to seven years, while staying on the grid never pays back.</li>
<li>Outages: on the grid only, the business cannot operate in a power cut; with solar and a battery, it can keep operating.</li>
<li>Maintenance: none for Option A; panel cleaning and yearly inverter checks for Option B.</li>
<li>Environmental impact: grid electricity comes largely from imported fossil fuels, whereas solar produces clean energy on site.</li>
</ul>
<p>Award 1 mark each for TWO clearly stated differences which address both options.</p>`,
        model: `<ul><li>Option A has no upfront cost but a monthly bill of about BDS$2,400 that rises with fuel prices, whereas Option B costs about BDS$48,000 upfront but cuts the bill to about BDS$700.</li><li>A grid-only business must close during a power outage, while a solar system with a battery can keep the business running.</li></ul>`
      }),
      qA({
        module: '2', title: 'Question 2(c)', marks: 4, skill: 'Slogan writing: contrast as a persuasive appeal',
        prompt: '2. (c) Create a slogan which you could use to persuade small business owners to book a free energy audit, using ONE literary technique.',
        min: 25, max: 120,
        checklist: ['I wrote a short, memorable slogan that encourages owners to book an energy audit or compare their options.', 'I named ONE literary technique used in the slogan.', 'I explained how the technique persuades small business owners.'],
        rubric: slogan('\\b(sun|solar|energy|bill|bills|meter|power|audit|grid|light|panel|panels|money)\\b',
          'A concise, original slogan clearly encouraging owners to book an audit or compare energy options.',
          'Slogan missing, too long, or unrelated to energy choices.'),
        key: `<p><b>Question 2(c)</b> &nbsp;[4 marks]</p>
<p><b>POSSIBLE SLOGANS</b></p><ul>
<li>"Pay the sun once, or the meter for ever." – <b>antithesis</b>: the contrast between a one-off cost and endless bills makes the choice feel obvious.</li>
<li>"Make money while the sun shines." – <b>allusion</b> to the proverb "make hay while the sun shines"; the familiar saying, adapted, urges owners to act now.</li>
<li>"Before the bill bites, book the audit." – <b>personification</b> of the bill and <b>alliteration</b> (b) create urgency.</li>
<li>"Grid or sun? Let your numbers decide." – <b>rhetorical question</b> engages owners and points them towards the audit.</li>
</ul>
<p>Any other relevant slogan accompanied by an explanation of the related use of a literary technique.</p>
<p>Award 1 mark for a relevant slogan, 1 mark for inclusion of a literary technique used to appeal to the audience and 2 marks for the explanation of the technique which is linked to the issue of renewable energy.</p>
<p>Award 1 mark for an explanation which is unclear or incomplete.</p>
<p style="text-align:right">[4 marks]</p>`,
        model: `<p><b>Slogan:</b> "Pay the sun once, or the meter for ever."</p><p><b>Technique:</b> antithesis (paying "once" contrasted with paying "for ever").</p><p><b>Explanation:</b> The contrast reduces a complicated comparison to one memorable choice. Small business owners think constantly about costs, so presenting solar as a single payment and the grid as a bill that never ends makes them want to check their own figures by booking the free audit.</p>`
      })
    ].concat(sectionB({
      topic: 'Renewable energy', audience: 'Small business owners',
      topicLook: '\\b(solar|sun|energy|electricity|power|bill|bills|panel|panels|grid|renewable|wind|fuel)\\b',
      strategySignal: '\\b(however|whereas|while|unlike|by contrast|in contrast|on the other hand|similarly|both|yet|before|after)\\b',
      strategyCheck: 'I organised a clear comparison (point by point or block by block), used contrast and similarity signals, and reached a balanced judgement.',
      skillA: 'Section B writing: compare–contrast structure (point by point or block by block)',
      content: `<li>Reflective: an owner's experience before and after changing energy use; a power outage that cost a day's trade; mixed feelings about debt and savings; a change in attitude from worry to planning.</li>
<li>Expository: comparing staying on the grid with rooftop solar (and with energy efficiency); cost, payback, maintenance, outages and environmental impact; the national renewable energy goal; practical steps such as an energy audit, comparing quotations and financing.</li>`,
      strategyNote: 'Strategy focus: compare–contrast. Stronger scripts organise the comparison deliberately (point by point or block by block), use contrast and similarity signals, and reach a balanced judgement suited to the owner\'s situation; a one-sided advertisement for solar should not normally be placed above the "good" band.',
      modelA: `<p><b>Two Bakeries, One Sun</b></p>
<p>On the same street in Speightstown stand two bakeries. Both open at four in the morning, both sell salt bread and turnovers, and both spent last year worrying about electricity bills. Only one of them is still worrying. Which would you rather own?</p>
<p>The first bakery stayed on the grid. Its owner paid nothing upfront and has no panels to clean, which feels safe. However, his bill rises every time fuel prices climb, and when the power fails, his ovens go cold and his customers walk away.</p>
<p>The second bakery installed rooftop solar panels with a low-interest loan. Its owner faced a large upfront cost and had to learn about inverters and maintenance. Yet her monthly bill has fallen by more than half, and the savings are repaying the loan. Because she added a battery, her bread was still rising during the last outage while the rest of the street was dark.</p>
<p>The comparison is not as simple as cheap versus expensive. Solar suits businesses with sunny, sturdy roofs and steady daytime energy use, whereas a tenant with a shaded roof may be wiser to begin with energy-saving equipment.</p>
<p>What both owners agree on is this: guessing is the most expensive option. Book an energy audit, study your bills and compare the figures for your own building. The sun shines on every roof in Barbados. The question is whether your business is ready to use it.</p>`,
      purposeKey: 'e.g. to compare the costs and benefits of staying on the grid and installing solar so that owners can make an informed decision; OR to reflect on an owner\'s experience before and after changing energy use. The candidate should link purpose to features such as the point-by-point comparison or the balanced verdict.',
      audienceKey: 'small business owners (possibly a sub-group such as bakers, guest-house owners or tenants in rented premises), with reasons why the examples (bills, outages, loans), the practical tone and the balanced judgement suit them.',
      contextKey: 'where, when and how the piece would be shared, e.g. a small business association\'s e-newsletter or WhatsApp group in November, when free energy audits are offered; a business segment on radio; a Chamber of Commerce breakfast meeting.',
      audienceLook: ['\\baudience\\b', '\\b(small business owners?|business owners?|entrepreneurs?|owners?)\\b', '\\b(readers?|listeners?|viewers?)\\b'],
      modelB: `<p>My purpose was to compare the costs and benefits of staying on the grid and installing solar panels so that small business owners can make an informed decision, which is why the article contrasts two bakeries point by point before giving balanced advice. The intended audience is small business owners in Barbados, so I used a familiar local business, practical details about bills, loans and outages, and a respectful, informative tone. It would be published in the small business association's monthly e-newsletter in November 2026, when free energy audits are being offered.</p>`
    }))
  });

  /* =====================================================================
     ANNOTATED SECTION B SAMPLES (same shape as content/samples.js p3 entries, plus strategy)
     ===================================================================== */
  function samplePrompt(topic, audience) {
    return '<p>3. (a) Write a reflective OR expository piece of between 200 and 250 words based on the topic <b>' + topic.toUpperCase() + '</b>. Your piece should be suitable for an audience of <b>' + audience.toLowerCase() + '</b>.</p>';
  }
  function bd(c, cw, o, ow, e, ew) {
    return [{ part: 'Creativity', of: 10, got: c, why: cw }, { part: 'Organisation', of: 7, got: o, why: ow }, { part: 'Expression', of: 8, got: e, why: ew }];
  }
  function jbd(p, pw, a, aw, c, cw) {
    return [{ part: 'Purpose', of: 5, got: p, why: pw }, { part: 'Intended audience', of: 5, got: a, why: aw }, { part: 'Context of communication', of: 5, got: c, why: cw }];
  }

  /* 1 · Food security · reflective · narrative and reflection */
  addSample(REFLECTIVE, {
    year: '', topic: 'Food security', audience: 'Young adults', form: 'Personal essay', strategy: 'Narrative and reflection',
    prompt: samplePrompt('Food security', 'Young adults'),
    title: 'The Row of Callaloo',
    essay: [
      '{{1|The summer the price of flour went up, my grandmother laughed at the supermarket shelves.}} I was nineteen, complaining beside her in a Port Maria shop that rice now cost more than my weekly phone credit. "Mi have food a yard," she said, and left with only salt and matches.',
      '{{2|For years I had treated her backyard as a jungle to be avoided.}} It was a tangle of callaloo, scallion, thyme and pumpkin vines under two stubborn ackee trees. I preferred food in packets, because packets did not need weeding. {{3|That afternoon, however, I followed her through the gate and saw the yard as she saw it: a pantry that no delayed ship could empty.}}',
      '{{4|She made me plant a row of callaloo before I could eat.}} My hands blistered. Six weeks later, I steamed my first bunch with saltfish and ate it with a pride I could not explain. {{5|It tasted of something I had never paid for: independence.}}',
      '{{6|I still buy rice and scroll through videos at midnight. Yet I now notice what most of my friends do not:}} how little of what we eat is grown by anyone we know. {{7|Food security, I realised, is not a policy on a government website; it is a skill passed from one pair of hands to the next.}}',
      '{{8|My grandmother is slowing down, and the callaloo row is mine. The question for my generation is simple: when our grandparents can no longer bend to the soil, who will?}}'
    ],
    notes: [
      'An unexpected opening image: the grandmother laughs instead of worrying. The contrast hooks young readers and introduces the food-price problem through a story rather than a statistic.',
      'Honest self-criticism establishes the writer\'s former attitude, the starting point every reflective piece needs if it is to show a change.',
      'The turning point. The metaphor of the yard as a "pantry" that no ship could empty links the personal story to the wider issue of dependence on imports.',
      'Narrative action: the reader watches the writer learn by doing, which engages young adults more than being told what to do.',
      'A short, emphatic sentence ending on one abstract noun ("independence") turns a plate of callaloo into the essay\'s central insight.',
      'Candour about habits that have not changed (rice, midnight scrolling) keeps the voice believable for a young audience; the colon sets up the realisation that follows.',
      'The reflection is stated explicitly and memorably through contrast (a policy on a website / a skill passed between hands). This insight lifts the piece into the top band.',
      'A circular ending returns to the grandmother and closes with a rhetorical question that hands responsibility to the reader\'s generation.'
    ],
    breakdown: bd(9, 'An original angle (a grandmother\'s yard as a "pantry") and a voice young adults will recognise. One mark held back: next step: add one sensory detail of the yard, such as the smell of crushed thyme, to make the piece even more idiosyncratic.',
      7, 'Narrative moves clearly from complacency to turning point to action to insight, and the circular ending returns to the grandmother; every paragraph moves the reflection forward.',
      8, 'A controlled, sincere first-person register; Creole is confined to the grandmother\'s dialogue; varied sentence lengths and accurate punctuation, including colons and a semicolon.'),
    justification: {
      text: ['{{1|The purpose of this essay is to reflect on how working in my grandmother\'s garden changed my attitude to food and to persuade young adults that growing food is a form of independence; the shift from preferring packets to tasting "independence" models that change.}} {{2|The intended audience is Jamaican young adults aged 18 to 25, which is why the narrator is nineteen, mentions phone credit and midnight scrolling, and ends with a question to "my generation".}} {{3|The essay would be published on a youth lifestyle website and shared on Instagram in November, while youth farming programmes accept applications.}}'],
      notes: [
        'Purpose: states what the piece aims to do (reflect and persuade) and proves it with a quoted feature of the essay.',
        'Intended audience: names a precise group and links specific features (the narrator\'s age, phone credit, the closing question) to them.',
        'Context of communication: gives where (a youth website and Instagram), when (November) and why that timing matters.'
      ],
      breakdown: jbd(5, 'A clear reflective-persuasive purpose supported by a quotation from the essay that shows the intended change in the reader.',
        5, 'A precise audience, with three deliberate features named as the way the essay engages them.',
        4, 'Where and when are clear. One mark held back: explain WHY Instagram suits this audience (it is where they share lifestyle content).')
    },
    upgrade: {
      weak: 'Food security is very important. Young people should start farming because food is expensive and we import too much.',
      strong: 'That afternoon, however, I followed her through the gate and saw the yard as she saw it: a pantry that no delayed ship could empty.',
      why: 'The weak version states an opinion and a fact. The strong version shows the writer\'s attitude changing at a specific moment and links that private moment to the public problem of imports, which is what reflective writing rewards.'
    }
  });

  /* 2 · Food security · expository · problem–solution and persuasive appeal */
  addSample(EXPOSITORY, {
    year: '', topic: 'Food security', audience: 'Young adults', form: 'Blog post with subheadings', strategy: 'Problem–solution and persuasive appeal',
    prompt: samplePrompt('Food security', 'Young adults'),
    title: 'From Screen to Soil: Three Ways Young Adults Can Feed Their Island',
    essay: [
      '{{1|What would you eat if the ships stopped coming for a month?}} For many young Jamaicans, the honest answer is "not much". Our region imports a large share of its food, so a hurricane or a fuel crisis overseas quickly becomes empty shelves and higher prices at home. {{2|This post explains the problem in one minute and offers three solutions you can start this month.}}',
      '<b>The problem</b>',
      '{{3|Food security means that everyone can rely on enough safe, nutritious and affordable food.}} When most of that food travels thousands of miles, we are only as secure as the weakest link in the supply chain. Meanwhile, fewer young people are choosing to farm.',
      '<b>Solution 1: Grow something</b>',
      '{{4|Start with fast, forgiving crops such as callaloo, pak choi or sweet peppers in buckets, old tyres or a small yard bed.}} Six weeks is enough to harvest your first meal.',
      '<b>Solution 2: Buy local on purpose</b>',
      'Choose yam over imported potatoes and local fruit over packaged snacks. {{5|Every dollar spent at a farmers\' market stays in the community and tells growers that there is demand.}}',
      '<b>Solution 3: Treat farming as a business</b>',
      '{{6|Programmes for young farmers now offer land, grants and training to people aged 18 to 25.}} Combine them with skills you already have: filming, marketing and selling online.',
      '{{7|None of these steps needs a tractor. They need a decision.}} {{8|Plant one seed, buy one local meal and share this post with one friend, because food security begins on your own plate.}}'
    ],
    notes: [
      'A rhetorical question makes the abstract issue personal and urgent; it suits young adults who may never have considered where their food comes from.',
      'A clear thesis-and-map sentence: readers know the structure (one problem, then three solutions) before they begin, a hallmark of strong expository organisation.',
      'A precise definition early in the piece establishes accuracy (logos) and gives young readers the key term they need.',
      'Specific, low-cost examples make the first solution realistic for young adults with little space or money.',
      'Cause and effect inside a solution: buying local is shown to strengthen demand, not merely described as a good idea.',
      'A concrete opportunity links the solution to action young adults can take now, without copying the stimulus.',
      'Two short sentences in antithesis (tractor / decision) remove the main excuse and sharpen the persuasive appeal.',
      'A triple call to action (plant, buy, share) uses the rule of three and returns the topic to the reader\'s own plate.'
    ],
    breakdown: bd(8, 'A lively voice and practical, youth-centred solutions. Two marks held back: blog posts on food are common; next step: add one original detail, such as a named young grower or a surprising fact the writer discovered, to make the piece more idiosyncratic.',
      7, 'Subheadings make the problem–solution pattern visible; each section has one job, and the ending draws the three solutions together.',
      8, 'A conversational but correct register for a blog; varied sentence lengths; accurate punctuation, including the colon, the apostrophe in "farmers\' market" and quotation marks.'),
    justification: {
      text: ['{{1|The purpose of this blog post is to inform young adults about why food security is a problem and to persuade them to act, so it moves from the problem to three practical solutions and a call to action.}} {{2|The intended audience is Jamaican young adults aged 18 to 25; the opening question, the conversational register and examples such as filming and selling online suit readers who are comfortable with technology.}} {{3|It would be posted on a youth news blog and shared on WhatsApp and Instagram in November 2026, while applications for farming programmes are open.}}'],
      notes: [
        'Purpose: names two aims (inform, persuade) and shows how the structure (problem, solutions, call to action) achieves them.',
        'Intended audience: a precise age group, with three features of the piece explained in terms of the audience\'s habits.',
        'Context of communication: channel (blog, WhatsApp, Instagram) and timing (November, while applications are open) are both justified.'
      ],
      breakdown: jbd(5, 'A precise, two-part purpose clearly linked to the structure of the piece.',
        5, 'The audience is defined precisely and three deliberate choices are explained.',
        5, 'Where, when and through which channels are all stated, and the timing is justified.')
    },
    upgrade: {
      weak: 'There are many solutions to food security. People can grow food and buy local food and also join programmes.',
      strong: 'Start with fast, forgiving crops such as callaloo, pak choi or sweet peppers in buckets, old tyres or a small yard bed. Six weeks is enough to harvest your first meal.',
      why: 'The weak version lists solutions in general terms. The strong version gives one solution with specific crops, containers and a time frame, so a young adult can picture doing it, which makes the solution persuasive.'
    }
  });

  /* 3 · Marine pollution · reflective · cause–effect */
  addSample(REFLECTIVE, {
    year: '', topic: 'Marine pollution', audience: 'Fisherfolk', form: 'Journal entry', strategy: 'Cause–effect',
    prompt: samplePrompt('Marine pollution', 'Fisherfolk'),
    title: 'The Ghost Net',
    essay: [
      '<b>Thursday, 19 November</b>',
      '{{1|Today the sea gave me back my own rubbish, and I cannot stop thinking about it.}}',
      'We left Micoud before five, Papa at the engine and me at the bow. Two miles out, the engine coughed and died. {{2|When I leaned over to clear the intake, I pulled out a plastic bag knotted in sargassum, the same kind of bag I had tossed overboard last week without a second thought.}}',
      'Further out, we found worse. {{3|A ghost net was drifting just below the surface, heavy with dead jacks and one young turtle that had drowned trying to reach the air.}} Papa cut it free and hauled it aboard without a word. {{4|I knew why he was silent: every fish in that net was a fish that would never reach our pot or the market in Vieux Fort.}}',
      '{{5|On the way home, I began to connect things I had always kept apart.}} The weed that keeps us ashore for days, the bottles on the beach, the smaller catches and the bills on our kitchen table are not separate problems. {{6|One leads to the next, like links in an anchor chain, and we are holding one end of it.}}',
      '{{7|Tonight I filled a sack with the old lines and broken floats from under our house.}} Tomorrow I will take it to the landing site. It is a small thing. {{8|But if careless habits helped to empty the sea, perhaps careful ones can help to fill it again.}}'
    ],
    notes: [
      'A striking, slightly ironic opening line: the sea "gives back" rubbish. It states the cause–effect idea of the whole entry in one sentence and hooks the reader.',
      'The personal cause is revealed: the writer\'s own discarded bag returns to stall the engine. Admitting fault is what makes this reflective rather than a report.',
      'Vivid, specific detail (dead jacks, a drowned turtle) shows the effect of ghost nets on fish stocks without lecturing, and appeals to fisherfolk\'s own experience.',
      'Cause linked to economic effect: lost fish mean an empty pot and less to sell at market, the consequence fisherfolk care about most.',
      'A signpost of reflection: the writer moves from narrating events to examining what they mean.',
      'An apt simile from the fishing world (an anchor chain) captures a chain of causes and effects and places the writer, and the reader, inside it.',
      'Reflection leads to action: a concrete, modest step that readers could copy.',
      'A balanced closing sentence (careless / careful; empty / fill) turns the cause–effect pattern into hope, ending on insight rather than on the problem.'
    ],
    breakdown: bd(10, 'An original perspective (the writer\'s own bag returning) and a simile from the fishing world give the entry a distinctive voice that fisherfolk would recognise.',
      7, 'Clear chronological development from morning to night, with a signposted shift from events to reflection and a purposeful ending.',
      7, 'An appropriate, sincere register for a journal, with accurate grammar. One mark held back: "cannot stop thinking" and "without a second thought" are familiar phrases; next step: replace one with a fresher expression of your own.'),
    justification: {
      text: ['{{1|The purpose of this journal entry is to reflect on how my careless habits feed marine pollution and to show fisherfolk that small actions can break the chain; it moves from the bag in the engine to the sack of old lines I return.}} {{2|The intended audience is fisherfolk on St. Lucia\'s east coast, so I used familiar details such as engine intakes, ghost nets and the Vieux Fort market, and a simile from their work.}} {{3|It would be read aloud on a community radio station\'s early-morning fishing programme in November, when the net return scheme begins.}}'],
      notes: [
        'Purpose: reflect AND persuade, proved by the movement of the entry from cause to action.',
        'Intended audience: a specific community, with the details and the simile chosen for them.',
        'Context of communication: channel (community radio), time slot (early morning) and season (November, start of the scheme).'
      ],
      breakdown: jbd(5, 'A precise purpose linked to the structure of the entry.',
        5, 'A clearly defined audience, with specific features explained.',
        5, 'Channel, time slot and timing are all stated and suit fishers\' routines.')
    },
    upgrade: {
      weak: 'Plastic pollution is bad for the sea. It causes many problems for fishermen, like fewer fish and damaged engines.',
      strong: 'When I leaned over to clear the intake, I pulled out a plastic bag knotted in sargassum, the same kind of bag I had tossed overboard last week without a second thought.',
      why: 'The weak version names a cause and its effects in general terms. The strong version dramatises one cause and its effect in a single moment and makes the writer part of the cause, which turns information into reflection.'
    }
  });

  /* 4 · Marine pollution · expository · cause–effect */
  addSample(EXPOSITORY, {
    year: '', topic: 'Marine pollution', audience: 'Fisherfolk', form: 'Radio talk script', strategy: 'Cause–effect',
    prompt: samplePrompt('Marine pollution', 'Fisherfolk'),
    title: 'Fishing Line: Why the Weed Keeps Coming',
    essay: [
      '[SOUND: Waves and a boat engine. Fade under.]',
      'PRESENTER: {{1|Good morning to all our fisherfolk from Dennery to Vieux Fort. If you are at the landing site, you may be looking at a beach covered in brown weed.}} {{2|Today on Fishing Line: what causes sargassum and plastic pollution, how they affect your catch, and what you can do.}}',
      '{{3|First, the causes.}} Scientists link the huge seaweed blooms of recent years to warmer sea temperatures and to fertiliser and sewage carried into the Atlantic by rivers. {{4|Those extra nutrients act like food for the weed, so it grows faster and drifts towards our coasts in thick mats.}} Plastic, meanwhile, comes from us: bottles, bags, broken floats and nets lost at sea.',
      '{{5|Now, the effects.}} Weed clogs engine intakes and keeps boats ashore. When it rots on the beach, it gives off hydrogen sulphide, a gas that smells like rotten eggs and irritates eyes and lungs. {{6|Plastic breaks into tiny pieces that fish swallow, and lost nets keep trapping fish that no one will ever land.}} The result is fewer fishing days, smaller catches and lower incomes.',
      '{{7|So, what can you do?}} Clear weed from engines wearing gloves and a mask, bring old gear and plastic back to the landing site, and report drifting nets to the cooperative.',
      '{{8|We cannot control the ocean, but we can stop adding to its burden. This has been Fishing Line. Fish safe, and come home with a full boat.}}',
      '[SOUND: Waves swell, then fade.]'
    ],
    notes: [
      'Direct address and a local reference (Dennery to Vieux Fort) create an immediate, conversational link with listeners at the landing site, which suits a radio script.',
      'A spoken "map" of the talk (causes, effects, actions) helps listeners follow without being able to reread, a key feature of expository radio writing.',
      'A short signpost marks the first stage of the cause–effect structure; on radio, signposts replace visual headings.',
      'A simple analogy (nutrients as "food for the weed") explains a scientific cause in everyday terms and links cause to effect with "so".',
      'The second signpost shifts clearly from causes to effects, keeping the organisation transparent.',
      'Two effects of plastic are explained in one balanced sentence, each tied to the fishers\' livelihood.',
      'A rhetorical question turns the talk from explanation to action and re-engages listeners.',
      'Antithesis (cannot control / can stop adding) and a warm sign-off ("Fish safe") close with a memorable, practical message in the programme\'s voice.'
    ],
    breakdown: bd(8, 'Radio conventions (sound cues, a programme name, a sign-off) are used with confidence. Two marks held back: next step: add one voice beyond the presenter, such as a short line from a local fisher, to make the script more vivid and idiosyncratic.',
      7, 'Signposted causes, effects and actions in a logical sequence; the "result" sentence sums up the chain before the call to action.',
      8, 'Short, clear sentences for listening; technical terms explained in plain English; accurate punctuation throughout.'),
    justification: {
      text: ['{{1|The purpose of this radio talk is to explain the causes and effects of sargassum and plastic pollution and to suggest practical actions, which is why it is organised into signposted sections on causes, effects and solutions.}} {{2|The intended audience is fisherfolk on St. Lucia\'s east and south coasts, so the presenter addresses them directly, names their landing sites and explains scientific ideas through everyday comparisons.}} {{3|It would be broadcast on a community radio station at 5:00 a.m., when fishers are preparing their boats, and repeated during the weekly fishing programme.}}'],
      notes: [
        'Purpose: to explain and to advise, linked to the signposted three-part structure.',
        'Intended audience: a precise group, with direct address, local names and everyday comparisons explained as choices made for them.',
        'Context of communication: channel, exact time and repetition, each justified by the audience\'s routine.'
      ],
      breakdown: jbd(5, 'A precise purpose clearly linked to the organisation of the talk.',
        5, 'Audience defined precisely, with three deliberate features explained.',
        5, 'Channel and timing are specific and justified by fishers\' working day.')
    },
    upgrade: {
      weak: 'Sargassum is caused by many things and it affects fishing a lot.',
      strong: 'Those extra nutrients act like food for the weed, so it grows faster and drifts towards our coasts in thick mats.',
      why: 'The weak version says that there are causes and effects but names none. The strong version states a specific cause, explains it with an everyday comparison and links it to its effect with "so", which is the core of cause–effect writing.'
    }
  });

  /* 5 · Cultural heritage · reflective · narrative and reflection */
  addSample(REFLECTIVE, {
    year: '', topic: 'Cultural heritage', audience: 'Secondary school students', form: 'Memoir extract', strategy: 'Narrative and reflection',
    prompt: samplePrompt('Cultural heritage', 'Secondary school students'),
    title: 'The Mirrors on My Uncle\'s Costume',
    essay: [
      '{{1|Every December, my uncle\'s masquerade costume hung in our hallway in Basseterre like a visitor who had arrived too early.}} It glittered with tiny mirrors, ribbons and bells, and for most of my childhood I walked past it without a glance.',
      '{{2|At fourteen, I told him that masquerade was for old people and tourists.}} He did not argue. Instead, he handed me a needle and asked me to help him sew the loose mirrors back on before the troupe\'s first performance.',
      '{{3|It took us four evenings.}} As we worked, he explained that the bells announced the dancers before they appeared and that the steps had been passed down for generations by people who had little except their bodies and their memories. {{4|I realised that I was not sewing a costume; I was holding a history book that could dance.}}',
      '{{5|On Boxing Day, I stood at the roadside as the fife and drums began.}} My uncle leapt and spun, and every mirror I had stitched flashed in the sun. {{6|An old woman beside me was crying, and for the first time I understood that she was not watching a show. She was watching her own childhood come back down the street.}}',
      '{{7|Our heritage is not locked away in museums. It hangs in hallways, waiting for someone young enough to carry it forward.}} {{8|This December, I will not just watch the masquerade. I have asked my uncle to teach me the steps.}}'
    ],
    notes: [
      'An original simile (the costume as "a visitor who had arrived too early") introduces the heritage object through a specific, domestic image.',
      'The writer\'s dismissive teenage attitude is stated plainly; secondary school readers may recognise themselves, which sets up the change.',
      'A short sentence marks time passing and signals that the reflection will grow out of shared work, not a lecture.',
      'The central metaphor (a history book that could dance) captures the insight that tradition carries history in movement and memory.',
      'The narrative moves to the performance; the fife and drums place the reader at the roadside.',
      'The old woman\'s tears give an outside perspective, deepening the reflection from personal to communal meaning.',
      'Antithesis (museums / hallways) states the theme memorably and challenges the stereotype that heritage belongs only to the past.',
      'The ending shows changed behaviour, not just changed thinking: the writer will learn the steps, a model for the audience.'
    ],
    breakdown: bd(9, 'A fresh angle (sewing the mirrors) and a memorable central metaphor. One mark held back: next step: include one line of the uncle\'s own words, in dialogue, to give his voice and the tradition more presence.',
      7, 'A clear narrative arc (indifference, shared work, insight, performance, commitment); each paragraph has one job, and the conclusion follows from the episode.',
      8, 'A controlled, reflective first-person register; accurate use of the semicolon and apostrophes; varied sentence lengths for emphasis.'),
    justification: {
      text: ['{{1|The purpose of this memoir extract is to reflect on how helping my uncle with his masquerade costume changed my view of heritage, and to encourage teenagers to take part in traditions rather than dismiss them.}} {{2|The intended audience is secondary school students, so the narrator begins as a fourteen-year-old who thinks masquerade is "for old people", an attitude many readers share.}} {{3|It would be published in the school magazine\'s Christmas edition and read at assembly in early December, before the masquerade troupes perform during the festive season.}}'],
      notes: [
        'Purpose: reflect and encourage, linked to the change shown in the memoir.',
        'Intended audience: secondary school students, with the narrator\'s age and opening attitude explained as a deliberate choice.',
        'Context of communication: two channels (magazine and assembly) and a precise time linked to the masquerade season.'
      ],
      breakdown: jbd(5, 'A precise reflective purpose linked to the narrator\'s change of attitude.',
        5, 'A clear audience and a well-chosen feature that connects with them.',
        5, 'Channel and timing are specific and tied to the festive season.')
    },
    upgrade: {
      weak: 'Masquerade is an important part of our culture and young people should learn about it so it does not die out.',
      strong: 'I realised that I was not sewing a costume; I was holding a history book that could dance.',
      why: 'The weak version tells readers what to think. The strong version shows the moment the writer\'s understanding changed, using a metaphor that makes heritage feel alive.'
    }
  });

  /* 6b · Cultural heritage · expository · compare–contrast (Trinidad and Tobago) */
  addSample(EXPOSITORY, {
    year: '', topic: 'Cultural heritage', audience: 'Secondary school students', form: 'Feature article with subheadings', strategy: 'Compare–contrast',
    prompt: samplePrompt('Cultural heritage', 'Secondary school students'),
    title: 'Panyard or Phone Screen? Two Ways to Learn a Tradition',
    essay: [
      '{{1|Type "how to play pan" into any video app and you will find thousands of lessons, free and available at midnight. Walk into a panyard in Woodbrook on a weeknight before Panorama and you will find something different: forty players, one arranger and no pause button.}} {{2|Both are ways to learn our national instrument, but they teach very different things.}}',
      '<b>Access</b>',
      '{{3|Online lessons win on access.}} A student in Point Fortin or Tobago can learn the notes of a tenor pan without travelling, replaying a tricky run as often as needed. A panyard, by contrast, demands transport, time and the courage to walk in as a beginner.',
      '<b>Depth</b>',
      '{{4|The panyard, however, teaches what a screen cannot.}} Players learn by ear beside elders who have played for decades, absorbing timing, stamina and the history of their band. {{5|A video shows you where to strike; a section leader shows you why the note matters to the whole orchestra.}}',
      '<b>Belonging</b>',
      '{{6|Finally, a video ends when you close the app, whereas a panyard gives you a community.}} Many players say that friendships formed during one Panorama season last for years, and younger players often return as tutors.',
      '<b>The verdict</b>',
      '{{7|Neither method is enough on its own.}} Use the screen to begin, then carry what you have learned into a panyard, where the tradition is still being made. {{8|A video can teach you the notes; only people can teach you the music.}}'
    ],
    notes: [
      'Two contrasting scenes placed side by side (a video app at midnight, a crowded panyard) announce the compare–contrast strategy before it is named and hook students with familiar images.',
      'A one-sentence thesis states the two subjects and promises a comparison, so the reader knows exactly how the article is organised.',
      'Point-by-point organisation: the subheading names the first criterion (access) and the topic sentence gives a clear verdict on it.',
      'The contrast marker "however" turns the comparison to the second criterion and signals that the panyard has the advantage here.',
      'Antithesis in parallel clauses (a video shows... a section leader shows...) compresses the key difference into one memorable, balanced sentence.',
      '"Finally" and "whereas" signal the third criterion and keep the two subjects in direct comparison within a single sentence.',
      'A short, balanced verdict avoids a one-sided conclusion, which suits an expository purpose: to inform the reader\'s choice rather than to win an argument.',
      'The closing antithesis (notes / music) returns to the opening contrast and leaves students with the article\'s central idea.'
    ],
    breakdown: bd(8, 'A fresh, specific angle on heritage (learning pan) that secondary students will recognise. Two marks held back: next step: add one first-hand detail, such as a quotation from a section leader in dialogue, to make the piece more idiosyncratic and less predictable.',
      7, 'Clear point-by-point structure under three criteria (access, depth, belonging), signposted by subheadings and contrast markers, with a verdict that answers the opening question.',
      8, 'A lively but controlled expository register; accurate punctuation, including colons and a semicolon, and varied sentence lengths for emphasis.'),
    justification: {
      text: ['{{1|The purpose of this feature article is to compare learning pan from online videos and in a panyard on access, depth and belonging, so that students can choose how to begin; the subheadings and the balanced verdict serve that purpose.}} {{2|The intended audience is secondary school students in Trinidad and Tobago, so I used familiar examples such as video apps, Panorama and travelling from Point Fortin or Tobago.}} {{3|It would appear in the school magazine\'s Carnival issue in January, when panyards open for Panorama rehearsals.}}'],
      notes: [
        'Purpose: states the comparison, its criteria and the reader outcome, and links them to two structural features of the article.',
        'Intended audience: a precise group and territory, with the examples explained as deliberate choices for those readers.',
        'Context of communication: where (the school magazine), when (January) and why that timing suits the audience.'
      ],
      breakdown: jbd(5, 'A clear informative purpose tied to named features of the piece.',
        5, 'A precise audience supported by specific, relevant examples.',
        5, 'Channel and timing are specific and justified by the Panorama season.')
    },
    upgrade: {
      weak: 'Online lessons are good and panyards are also good. They both have advantages and disadvantages for students.',
      strong: 'A video shows you where to strike; a section leader shows you why the note matters to the whole orchestra.',
      why: 'The weak version says that a difference exists. The strong version shows the difference in two parallel clauses, so the reader sees exactly what each method offers.'
    }
  });

  /* 6 · Renewable energy · expository · compare–contrast */
  addSample(EXPOSITORY, {
    year: '', topic: 'Renewable energy', audience: 'Small business owners', form: 'Newsletter column with subheadings', strategy: 'Compare–contrast',
    prompt: samplePrompt('Renewable energy', 'Small business owners'),
    title: 'Energy Matters: Cut First, or Generate First?',
    essay: [
      '{{1|Every small business owner in Barbados has heard the advice to "go solar". Fewer have heard the quieter advice to "go efficient".}} {{2|This month\'s column compares the two approaches on cost, speed of savings and risk, so that you can decide which should come first.}}',
      '<b>Cost</b>',
      '{{3|Efficiency is the cheaper starting point.}} Replacing old bulbs with LEDs, servicing a refrigerator\'s door seals or fitting a timer to an air conditioner costs hundreds of dollars, not thousands. Rooftop solar, by contrast, usually requires tens of thousands of dollars or a loan.',
      '<b>Speed of savings</b>',
      '{{4|Both approaches lower your bill, but on different timetables.}} Efficiency measures begin saving from the first day, while a solar system typically takes several years to repay its cost. However, once it is repaid, solar keeps producing almost free electricity for many years.',
      '<b>Risk</b>',
      '{{5|Efficiency carries almost no risk: a light bulb cannot be blown away by a hurricane.}} Solar panels are an investment on your roof, so they need sound installation, insurance and a sturdy structure. {{6|On the other hand, solar protects you from future fuel-price rises, which efficiency alone cannot do.}}',
      '<b>The verdict</b>',
      '{{7|The two are not rivals but partners.}} A business that cuts waste first needs a smaller, cheaper solar system later. {{8|So start with the light switch, then look to the sky.}}'
    ],
    notes: [
      'Two balanced sentences (go solar / go efficient) set up the comparison immediately and hint that the familiar advice is incomplete.',
      'A thesis that names the criteria of comparison (cost, speed of savings, risk); these become the subheadings, giving a point-by-point structure.',
      'A clear topic sentence states the judgement for this criterion before the evidence; "by contrast" then introduces the other option.',
      'A similarity ("Both...") is acknowledged before the difference, a mature compare–contrast move.',
      'A vivid, slightly humorous example makes the low risk of efficiency concrete for business owners in a hurricane region.',
      '"On the other hand" introduces solar\'s advantage, keeping the column balanced rather than one-sided.',
      'The verdict reframes the comparison: the options work together. Synthesis, not just a list of differences, earns top marks for organisation.',
      'A memorable closing sequence (switch, then sky) turns the conclusion into an easy rule of thumb.'
    ],
    breakdown: bd(8, 'The "cut first" angle is fresh for a renewable energy topic. Two marks held back: next step: add one short example of a named kind of business, such as a guest house or a barber shop, to engage owners more personally.',
      7, 'Point-by-point organisation under subheadings, with contrast and similarity signals in every section and a verdict that synthesises the comparison.',
      8, 'A clear, practical register for a business newsletter; precise vocabulary; accurate punctuation, including the colon and the possessive apostrophes.'),
    justification: {
      text: ['{{1|The purpose of this column is to compare energy efficiency and rooftop solar on cost, speed of savings and risk so that small business owners can decide which to do first; the subheadings and the final verdict serve that purpose.}} {{2|The intended audience is small business owners in Barbados, who need practical, low-cost advice, so the column uses everyday examples such as bulbs, refrigerator seals and air-conditioner timers.}} {{3|It would appear in the small business association\'s monthly e-newsletter in November 2026, alongside its offer of free energy audits.}}'],
      notes: [
        'Purpose: to compare and to help a decision, linked to the subheadings and verdict.',
        'Intended audience: a specific group with a stated need (practical, low-cost advice) and the examples chosen to meet it.',
        'Context of communication: a named channel and timing, connected to the audit offer.'
      ],
      breakdown: jbd(5, 'A precise comparative purpose clearly linked to the structure.',
        5, 'A specific audience and examples justified by their needs.',
        4, 'Channel and timing are clear. One mark held back: explain why an e-newsletter suits busy owners (they can read it when convenient and keep it for reference).')
    },
    upgrade: {
      weak: 'Solar is good and efficiency is also good. They both save money.',
      strong: 'Both approaches lower your bill, but on different timetables. Efficiency measures begin saving from the first day, while a solar system typically takes several years to repay its cost.',
      why: 'The weak version states that both options have advantages but does not compare them. The strong version names a similarity, then a precise difference, linked by "while", which is the heart of compare–contrast writing.'
    }
  });

  /* 7 · Renewable energy · reflective · compare–contrast */
  addSample(REFLECTIVE, {
    year: '', topic: 'Renewable energy', audience: 'Small business owners', form: 'Reflective blog post', strategy: 'Compare–contrast',
    prompt: samplePrompt('Renewable energy', 'Small business owners'),
    title: 'Before and After the Panels',
    essay: [
      '{{1|A year ago, I opened my print shop in St. John\'s every morning with one eye on the electricity meter.}} Printers, a laminator and two air conditioners do not forgive a high tariff, and some months the bill was larger than my rent.',
      '{{2|When a customer suggested solar panels, I laughed.}} I pictured a huge debt and a roof I would never understand. {{3|What I did not picture was how much I was already paying for staying the same.}}',
      '{{4|The contrast between my two years is sharp.}} Before, I paid nothing upfront and worried every month. After, I signed a loan, learned what an inverter does and climbed a ladder to rinse dust from the panels. Before, a power cut meant sending customers away with unfinished flyers. After, with a small battery, I printed wedding programmes while the street was dark. {{5|My bill is now less than half of what it was, even after the loan repayment.}}',
      '{{6|Yet the change I value most cannot be measured in dollars.}} I used to feel that rising fuel prices simply happened to me, like the weather. Now I feel some control. {{7|Solar did not make my business perfect; panels need cleaning, and cloudy weeks still cost me.}} It moved me from worrying to planning.',
      '{{8|If you own a small business, do not compare solar with nothing. Compare it with what you are paying now, and with the business you could become if you stopped paying it.}}'
    ],
    notes: [
      'A precise, personal opening image (one eye on the meter) establishes the problem and the reflective voice of a fellow business owner.',
      'A short sentence records the writer\'s first, dismissive reaction, the "before" attitude that the post will examine.',
      'The first insight: the cost of not changing. It reframes the comparison in a way business owners rarely consider.',
      'A topic sentence announces the compare–contrast structure; the repeated "Before... After..." pattern that follows organises the evidence point by point.',
      'A concrete result gives the comparison credibility (logos) without overwhelming readers with figures.',
      '"Yet" signals the turn from measurable change to personal change, the reflective core of the piece.',
      'Honest acknowledgement of drawbacks keeps the comparison balanced and makes the writer more trustworthy (ethos).',
      'The closing advice turns the comparison back on the reader with parallel structure ("Compare it with... and with..."), leaving a challenge rather than a sales pitch.'
    ],
    breakdown: bd(9, 'A credible, original voice and an unusual insight (the cost of staying the same). One mark held back: next step: describe one specific moment, such as the first morning the meter slowed, to sharpen the narrative.',
      7, 'A clear before-and-after structure, a signposted turn to reflection ("Yet") and a closing challenge that follows from the comparison.',
      8, 'A sincere, professional first-person register; parallel sentences used deliberately; accurate punctuation, including the semicolon.'),
    justification: {
      text: ['{{1|The purpose of this blog post is to reflect on how installing solar panels changed my business and my outlook, and to encourage other owners to compare their options honestly; the "Before... After..." pattern and the admitted drawbacks serve that purpose.}} {{2|The intended audience is small business owners in Antigua, so I wrote as a fellow owner, using familiar details such as rent, tariffs and power cuts.}} {{3|It would be published on a local small business network\'s blog and shared in its WhatsApp group in November, when many owners plan budgets for the new year.}}'],
      notes: [
        'Purpose: reflect and encourage an honest comparison, linked to two features of the post.',
        'Intended audience: a specific group, with the writer\'s persona and details explained as choices made for them.',
        'Context of communication: two channels and a timing justified by the audience\'s budgeting cycle.'
      ],
      breakdown: jbd(5, 'A clear two-part purpose supported by named features of the post.',
        5, 'A precise audience and a well-justified persona.',
        5, 'Channels and timing are specific and justified.')
    },
    upgrade: {
      weak: 'Solar panels changed my business a lot. Now I save money and I am happy I did it.',
      strong: 'Before, a power cut meant sending customers away with unfinished flyers. After, with a small battery, I printed wedding programmes while the street was dark.',
      why: 'The weak version reports a change. The strong version contrasts two specific moments in parallel sentences, so readers see the difference for themselves.'
    }
  });
})();
