// Paper 02 practice papers (specimen-style, 2024 CAPE Communication Studies format). All stimuli are original.
(function () {
  var P = (window.COURSE_PAPERS = window.COURSE_PAPERS || []);

  var INTRO = `<p><b>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</b></p>
<ol>
<li>This paper consists of THREE questions: Section A (Module 1), Section B (Module 2) and Section C (Module 3).</li>
<li>Answer ALL questions.</li>
<li>Each question is worth 25 marks: Content 10, Organization 7, Expression 8.</li>
<li>Questions 1 and 2 must be answered in NO MORE than 500 words; Question 3 in NO MORE than 300 words.</li>
<li>You are advised to take some time to read through the paper and plan your answers.</li>
<li>Time allowed: 2 hours 30 minutes.</li>
</ol>
<p><i>All extracts, scenarios, names, organisations and statistics in this practice paper were written for practice purposes.</i></p>`;

  var OE = `<h4>Organization [7 marks]</h4>
<table>
<tr><th>Descriptor</th><th>Marks</th></tr>
<tr><td>Excellent paragraph development with thematic cohesion, appropriate use of transitional devices and connectives, and an effective conclusion.</td><td>7</td></tr>
<tr><td>Good use of the above criteria with one or two weaknesses evident.</td><td>5–6</td></tr>
<tr><td>Adequate level of organization with several weaknesses evident.</td><td>3–4</td></tr>
<tr><td>Unsatisfactory level of organization with weaknesses evident in all areas.</td><td>0–2</td></tr>
</table>
<h4>Expression [8 marks]</h4>
<table>
<tr><th>Descriptor</th><th>Marks</th></tr>
<tr><td>Excellent, effective and error-free use of language.</td><td>8</td></tr>
<tr><td>Very good use of language though there may be a few lapses evident.</td><td>7</td></tr>
<tr><td>Good use of language though there may be a few lapses evident.</td><td>5–6</td></tr>
<tr><td>Some ability to use language effectively and accurately, but there are inconsistencies in accurate usage.</td><td>3–4</td></tr>
<tr><td>Frequent inaccurate use of language OR insufficient information presented.</td><td>1–2</td></tr>
<tr><td>Incomprehensible response OR no response.</td><td>0</td></tr>
</table>`;

  function rubric(contentLook, cStrong, cWeak) {
    return [
      { criterion: `Content`, marks: 10, look: contentLook, min: 2, strong: cStrong, weak: cWeak },
      { criterion: `Organization`, marks: 7,
        look: [`\\b(first|firstly|second|secondly|another|furthermore|in addition|moreover|however|finally)\\b`, `\\b(in conclusion|to conclude|overall|in summary|therefore|thus)\\b`, `\\b(this essay|this response|will (discuss|examine|explain))\\b`],
        min: 2,
        strong: `Clear introduction (context, main point, purpose, thesis), one PEEL paragraph per bullet, smooth transitions and a short, effective conclusion.`,
        weak: `Bullets are answered in a list or one block of text; there are few transitions and no real conclusion.` },
      { criterion: `Expression`, marks: 8,
        look: [`[.!?]\\s+[A-Z]`, `\\b(because|since|which|although|whereas|so that)\\b`, `\\b(the writer|the speaker|the audience|the excerpt|our audience|the passage)\\b`],
        min: 1,
        strong: `Accurate, fluent Standard English with varied sentence structure and precise subject terminology.`,
        weak: `Frequent errors in grammar, spelling or punctuation; vague or informal word choice; Creole features in the essay itself.` }
    ];
  }

  var M1_PROMPT = `<p>Write an essay, in NO MORE than 500 words, in which you</p>
<ul>
<li>state the writer's MAIN message in no more than 30 words</li>
<li>state the writer's purpose</li>
<li>discuss TWO organizational strategies OR TWO language techniques OR any combination of both which the writer uses to achieve the purpose</li>
<li>evaluate the credibility of the information presented.</li>
</ul>
<p style="text-align:right"><b>[25 marks]</b></p>`;

  var M1_CHECK = [
    `Main message stated in 30 words or fewer, covering the problem AND the writer's proposed response`,
    `Purpose stated with a clear purpose verb (persuade, convince, inform, criticise) plus what the writer wants the reader to think or do`,
    `TWO strategies or techniques, each NAMED, illustrated with a quoted EXAMPLE and EXPLAINED in relation to the purpose`,
    `Credibility evaluated using the source line and bio: expertise, evidence, currency, bias; both strengths and weaknesses`,
    `Introduction (context, main point, purpose, thesis), PEEL body paragraphs, conclusion shorter than the introduction`
  ];

  var M1_LOOK = [`main (message|point)`, `purpose|persuade|convince|inform|urge`, `strateg|technique|anecdote|metaphor|statistic|testimonial|contrast|concession|rhetorical|cause and effect|problem and solution|direct address`, `credib|reliab|bias|qualified|expert|currency|trustworth`];

  /* =====================================================================
     PAPER A
     ===================================================================== */
  P.push({
    kind: 'p2', id: `P2A`, title: `Paper 02 · Practice Paper A`, time: 150,
    intro: INTRO,
    questions: [
      /* ---------------- Q1 Module 1 ---------------- */
      {
        type: 'write', module: '1', title: `Question 1 · Module 1`, genre: `Essay`,
        stimulus: `<p><b>SECTION A · MODULE 1 – GATHERING AND PROCESSING INFORMATION</b></p>
<p>1. Read the extract below carefully and then answer the question that follows.</p>
<h4 style="text-align:center">Whose Sand Is It Anyway?</h4>
<p>Every Sunday morning for as long as I can remember, my grandmother walked from her house in Old Road to the bay below, dipped her feet in the water and declared the week officially begun. Last month, when I tried to take my own children down the same path, a security guard in a pressed grey uniform told us that the beach was "for guests only".</p>
<p>Our experience is not unusual. A 2024 survey by a local coastal heritage foundation found that of 37 beaches traditionally used by residents, 11 now have no clearly marked public access route, and a further 8 can be reached only through hotel car parks or private gates. In other words, half of our shoreline has quietly become harder to reach for the very people who live here.</p>
<p>Developers will argue that tourism pays the bills, and they are not wrong. Tourism brings in roughly four of every five dollars that circulate in our economy. Yet a beach is not a hotel amenity like a pool or a spa. It is a public commons, protected in principle by the island's own planning ordinance, which states that the foreshore "shall remain accessible to all".</p>
<p>The problem is not the law; it is enforcement. Access paths are narrowed during construction and never reopened. Signs are blown away in storms and never replaced. Each small loss seems too minor to fight, but together they add up to a shoreline locked behind fences.</p>
<p>Some will say I am being sentimental. Perhaps. But think of the fisherman who can no longer launch his boat, the school that can no longer hold its swimming programme, the teenager who has nowhere free to spend a hot afternoon. A people cut off from the sea is a people cut off from part of itself.</p>
<p>The solution is neither radical nor expensive. Government must publish a register of every public access point, mark each one with permanent signage and fine any property that blocks it. Residents, meanwhile, must use these paths and report every closure. Rights that are not exercised are soon forgotten.</p>
<p>The sea has always belonged to all of us. We must not allow it to be sold one gate at a time.</p>
<p><small>SOURCE: Adapted from Carla Brooks-Richardson (2025). "Whose Sand Is It Anyway?" <i>The Island Voice</i>, St. John's, 14 June 2025.</small></p>
<p><small><i>Carla Brooks-Richardson is an environmental planner who has worked for fifteen years on coastal zone management projects in the northeastern Caribbean. She is a founding member of a residents' beach-access lobby group and writes a weekly column on heritage and development.</i></small></p>`,
        prompt: M1_PROMPT,
        min: 300, max: 500,
        checklist: M1_CHECK,
        rubric: rubric(M1_LOOK,
          `Main message is concise and complete (loss of access + need for action); purpose has a verb and two elements; two named strategies with quoted examples and explanations; credibility weighs expertise and evidence against lobby-group bias and unsourced figures.`,
          `Retells the passage; main message too long or only names the topic; strategies named without examples; credibility asserted ("it is credible because it is in a newspaper") without reasons.`),
        key: `<h4>MARKING KEY · Question 1 (Content 10 marks)</h4>
<p><b>• State the writer's main message [2 marks]</b></p>
<p>Award 2 marks for a statement which effectively captures all of the points in the following. Award 1 mark for a statement which captures two of the points. Award no mark for a statement of the topic ONLY (e.g. "beaches").</p>
<blockquote>Public access to Antigua's beaches is gradually being lost (1) through weak enforcement rather than weak laws (2), so government and residents must act to keep the shoreline public (3).<br><b>OR</b><br>Beaches are a public commons (1) that are being closed off one path at a time (2); a register, signage, fines and residents' use of access paths can protect them (3).</blockquote>
<p><b>• State the writer's purpose [2 marks]</b></p>
<p>Award 2 marks for a response which has a clearly stated purpose verb and captures two other elements from the following. Award 1 mark for a purpose verb and one other element. Award no mark for a purpose verb without an acceptable explanation.</p>
<p>The writer's purpose is to</p>
<ul>
<li>highlight/raise awareness that residents are losing access to beaches</li>
<li>explain that the cause is poor enforcement rather than the absence of law</li>
<li>persuade/convince/urge government and residents to take specific action (register, signage, fines, use and report access paths).</li>
</ul>
<p><b>• Discuss TWO organizational strategies OR language techniques OR any combination [4 marks]</b></p>
<p>Award 2 marks each for correct identification, example and explanation of any two organizational strategies or language techniques or combination thereof. [2 + 2 = 4 marks]<br>Award 1 mark for correct naming of ONE strategy or technique with example but no explanation.<br>Award 1 mark for correct naming of two or more strategies or techniques without example(s) or explanation(s).</p>
<p><i>Organizational strategies</i></p>
<ul>
<li><b>Anecdote / personal narrative</b> – the grandmother's Sunday walk and the guard's "for guests only" (paragraph 1). Used to make the issue concrete and emotional and to win the reader's sympathy before the argument begins.</li>
<li><b>Statistical data</b> – 37 beaches, 11 with no marked access, 8 reachable only through private property (paragraph 2). Used to show that the problem is widespread and measurable, not just one family's experience.</li>
<li><b>Concession and refutation</b> – "Developers will argue that tourism pays the bills, and they are not wrong. ... Yet a beach is not a hotel amenity" (paragraph 3). Used to acknowledge the opposing view, appear fair, and then overturn it.</li>
<li><b>Contrast</b> – a beach versus "a pool or a spa" (paragraph 3). Used to distinguish a public commons from private property.</li>
<li><b>Cause and effect</b> – paths narrowed during construction and signs not replaced leading to a shoreline "locked behind fences" (paragraph 4). Used to explain how access is lost gradually.</li>
<li><b>Examples</b> – the fisherman, the school swimming programme, the teenager (paragraph 5). Used to show the range of people affected.</li>
<li><b>Problem and solution / call to action</b> – register, permanent signage, fines; residents must use and report paths (paragraph 6). Used to show the problem is solvable and to involve readers in the solution.</li>
<li><b>Authoritative source</b> – quotation from the planning ordinance, "shall remain accessible to all". Used to show that the writer's position is supported by law.</li>
</ul>
<p><i>Language techniques</i></p>
<ul>
<li><b>Rhetorical question in title</b> – "Whose Sand Is It Anyway?" Used to provoke reflection and suggest that ownership is being contested.</li>
<li><b>Metaphor</b> – "a shoreline locked behind fences"; "sold one gate at a time". Used to present the loss of access as a gradual theft or imprisonment of public property.</li>
<li><b>Parallelism / repetition</b> – "never reopened ... never replaced"; "a people cut off from the sea is a people cut off from part of itself". Used to emphasise the pattern of neglect and the seriousness of the loss.</li>
<li><b>Aphorism</b> – "Rights that are not exercised are soon forgotten." Used to give the argument a memorable, wise-sounding conclusion that urges action.</li>
<li><b>Inclusive pronouns / emotive language</b> – "our shoreline", "all of us", "sentimental". Used to build solidarity with residents.</li>
</ul>
<p><b>• Evaluate the credibility of the information presented [2 marks]</b></p>
<p>Award 1 mark each for a clear explanation of any two of the following reasons given as to whether the information is credible or not. [1 + 1 = 2 marks]</p>
<p>The information may be considered credible because</p>
<ul>
<li>the writer is an environmental planner with fifteen years' experience in coastal zone management and is qualified to discuss access and planning</li>
<li>specific, dated statistics from a named survey (2024) are provided</li>
<li>the planning ordinance is quoted directly</li>
<li>the article is recent (2025), so the information is current</li>
<li>it agrees with what readers may already observe about hotel development on the island.</li>
</ul>
<p>The information may be considered less than credible because</p>
<ul>
<li>the writer is a founding member of a beach-access lobby group and may be biased</li>
<li>the survey was carried out by a heritage foundation that may share her views; its methods are not explained</li>
<li>the claim that tourism brings in "four of every five dollars" is not sourced</li>
<li>the opening relies on a personal anecdote, which is emotional rather than factual.</li>
</ul>
` + OE,
        model: `<p>Across the Caribbean, the push for tourism earnings often collides with residents' rights to land and sea. In "Whose Sand Is It Anyway?", Carla Brooks-Richardson's main message is that <b>Antigua's beaches are gradually being closed to residents through weak enforcement of access laws, so government and citizens must act to keep the shoreline public.</b> Her purpose is to persuade officials and ordinary residents that the loss of beach access is serious but solvable, and to urge them to act. She achieves this mainly through personal anecdote and metaphor, and her information is largely, though not entirely, credible.</p>
<p>The first strategy the writer uses is personal anecdote. She opens with her grandmother's Sunday ritual of walking "from her house in Old Road to the bay below" and contrasts it with a guard telling her own children that the beach is "for guests only". This short story turns an abstract planning issue into a concrete, personal injustice: readers can picture a local family being turned away from a beach their family has used for generations. By beginning with emotion rather than figures, the writer wins the reader's sympathy before presenting her argument, which supports her purpose of persuading.</p>
<p>Secondly, the writer uses metaphor to reinforce her message. She describes the shoreline as "locked behind fences" and warns that the sea must not be "sold one gate at a time". These images present the loss of access as a slow theft, in which each closed path is another piece of public property sold off. The final metaphor is especially effective because it is placed in the closing line, leaving the reader with a memorable picture of what will happen if nothing is done. In this way, the technique moves readers from understanding the problem to wanting to stop it.</p>
<p>The information is credible to a large extent. The writer is an environmental planner with fifteen years of experience in coastal zone management, so she is qualified to discuss planning and access. She also supports her claims with specific figures from a 2024 survey, for example that 11 of 37 beaches lack marked access, and she quotes the planning ordinance directly, which suggests careful research. However, her credibility is reduced because she is a founding member of a beach-access lobby group and may therefore be biased, and the survey comes from a heritage foundation that may share her views. In addition, the claim that tourism produces "four of every five dollars" is unsourced. Readers should therefore accept her main argument while verifying the statistics independently.</p>
<p>In conclusion, Brooks-Richardson combines a moving personal story with powerful metaphor to persuade readers that public beaches must be protected, and her expertise largely outweighs the risk of bias.</p>`,
        teacherTip: `<p>Drill the 30-word main message: students should write it, count it, then cut it. A good main message has two halves: <b>the problem</b> and <b>the writer's answer to it</b>. For credibility, train students to read the SOURCE line and author bio first: here the bio contains both the strength (fifteen years in coastal management) and the weakness (lobby-group membership). Remind them that 2 marks require TWO explained reasons, and the best answers weigh both sides.</p>`
      },

      /* ---------------- Q2 Module 2 ---------------- */
      {
        type: 'write', module: '2', title: `Question 2 · Module 2`, genre: `Essay`,
        stimulus: `<p><b>SECTION B · MODULE 2 – LANGUAGE AND COMMUNITY</b></p>
<p>2. Read the excerpt below carefully and then answer the question that follows.</p>
<p><i>Ms Arrindell, a teacher at Hummingbird Ridge High School in The Valley, Anguilla, is coaching three students, Jaden, Keisha and Rohan, for an inter-school debate. The following exchange was recorded during a practice session.</i></p>
<p><b>Ms Arrindell:</b> Good afternoon, team. Today we are going to practise rebuttals. Jaden, please summarise the opposition's first argument.</p>
<p><b>Jaden:</b> Miss, dem say social media does make young people lazy.</p>
<p><b>Ms Arrindell:</b> They say social media makes young people lazy. Remember, in the debate you must say, "The opposition argues that..." Try again.</p>
<p><b>Jaden:</b> The opposition argue dat social media make young people lazy.</p>
<p><b>Ms Arrindell:</b> Argues. Good, much better. Keisha, how would you answer him?</p>
<p><b>Keisha:</b> Miss, I would say is not true, because plenty people does use it to learn tings.</p>
<p><b>Ms Arrindell:</b> [laughing] Girl, you right, you right! But careful how you put it. Dem judges does take off marks for dat. Say, "Many people use it to learn things."</p>
<p><b>Rohan:</b> [whispering to Jaden] She tink she smart.</p>
<p><b>Ms Arrindell:</b> Rohan, wha you sayin dey? Stop mout'in an pay attention! You is next.</p>
<p><b>Rohan:</b> Sorry, Miss.</p>
<p><b>Ms Arrindell:</b> Now, Rohan, give me your rebuttal in proper debate language.</p>
<p><b>Rohan:</b> Ladies and gentlemen, the opposition claim dat social media is a waste of time, but... uh... I forget de rest, Miss.</p>
<p><b>Ms Arrindell:</b> Don't fret. Is only practice. Take a breath and start again.</p>`,
        prompt: `<p>Write an essay, in NO MORE than 500 words, in which you</p>
<ul>
<li>state ONE possible reason each for the teacher's use of TWO language varieties as demonstrated in the excerpt</li>
<li>identify, with the use of examples from the excerpt, ONE grammatical feature of the teacher's language</li>
<li>identify, with the use of examples from the excerpt, ONE phonological feature of the STUDENTS' language</li>
<li>identify and explain ONE challenge that a Creole-speaking student in this team might face in mastering the Standard English required for formal debating.</li>
</ul>
<p style="text-align:right"><b>[25 marks]</b></p>`,
        min: 300, max: 500,
        checklist: [
          `Names BOTH varieties (Standard English and Anguillan Creole) and gives a reason for each, linked to a line in the excerpt`,
          `ONE grammatical feature of the TEACHER'S language, correctly named, with a quoted example and the Standard English equivalent`,
          `ONE phonological feature of the STUDENTS' language, correctly named, with quoted examples`,
          `ONE challenge identified AND explained (why it makes Standard English difficult), ideally with evidence from the excerpt`,
          `Grammatical and phonological features kept separate; essay written in Standard English`
        ],
        rubric: rubric([`standard english|acrolect`, `creole|basilect|mesolect`, `grammatical|habitual|copula|subject.verb|double negative|invariant`, `phonolog|fricative|consonant cluster|th.stopping|pronounc`, `challenge|interference|attitude|anxiety|similar`],
          `Both varieties with purposeful reasons; correctly named grammatical feature from the teacher's lines and phonological feature from the students' lines, each with quoted examples; challenge explained with evidence.`,
          `Confuses grammar with pronunciation; takes examples from the wrong speaker; lists features without naming them; challenge stated with no explanation.`),
        key: `<h4>MARKING KEY · Question 2 (Content 10 marks)</h4>
<p><b>• State ONE possible reason each for the teacher's use of TWO language varieties [4 marks]</b></p>
<p>Award 2 marks EACH for the identification and brief explanation of the TWO language varieties used by the teacher. [2 + 2 = 4 marks]<br>Award 1 mark for only naming the two language varieties without explanation.</p>
<p><i>Use of Standard English / acrolect</i></p>
<ul>
<li>Standard English is the expected variety for formal debating and will be expected by the judges.</li>
<li>The teacher is modelling the variety the students must produce ("They say social media makes young people lazy").</li>
<li>Standard English is used to correct students' Creole forms ("Argues"; "Say, 'Many people use it to learn things'").</li>
<li>It is the variety associated with formal instruction and the serious, instructional part of the session.</li>
<li>It is part of the linguistic repertoire of the speech community of which the teacher is a member.</li>
</ul>
<p><i>Use of Anguillan Creole</i></p>
<ul>
<li>To build rapport and praise warmly ("Girl, you right, you right!").</li>
<li>To rebuke and manage behaviour ("Stop mout'in an pay attention!").</li>
<li>To reassure and reduce anxiety ("Don't fret. Is only practice.").</li>
<li>To relate to students in their home variety and encourage participation.</li>
<li>It is part of the linguistic repertoire of the speech community and expresses shared identity.</li>
</ul>
<p><b>• Identify, with examples, ONE grammatical feature of the teacher's language [2 marks]</b></p>
<p>Award 2 marks for the identification with relevant example of any ONE of the following. Award no mark for identifying a phonological feature, OR for a grammatical feature without a relevant example, OR for an example taken from the students' lines only.</p>
<ul>
<li><b>Habitual aspect marker "does"</b> – "Dem judges does take off marks" (Standard English: judges take off marks).</li>
<li><b>Zero copula</b> with adjectival predicate – "you right" (you are right).</li>
<li><b>Absence of subject–verb agreement / invariant "is"</b> – "You is next" (you are next).</li>
<li><b>Subject deletion with existential "is"</b> – "Is only practice" (It is only practice).</li>
<li><b>Plural / demonstrative "dem"</b> – "Dem judges" (those judges / the judges).</li>
<li><b>Invariable word order in questions / no auxiliary</b> – "wha you sayin dey?" (What are you saying there?).</li>
</ul>
<p><b>• Identify, with examples, ONE phonological feature of the students' language [2 marks]</b></p>
<p>Award 2 marks for the identification with relevant example of any ONE of the following. Award no mark for identifying a grammatical feature, OR for a feature without a relevant example.</p>
<ul>
<li><b>Stopping of dental fricatives</b> – /θ/ and /ð/ realised as /t/ and /d/: "dat" (that), "tings" (things), "tink" (think), "de" (the), "dem" (them).</li>
<li>Any other acceptable feature with a relevant example from the students' lines.</li>
</ul>
<p><b>• Identify and explain ONE challenge in mastering Standard English [2 marks]</b></p>
<p>Award 1 mark for identification and 1 mark for any reasonable explanation of ONE challenge. [1 + 1 = 2 marks]</p>
<ul>
<li><b>Interference / transfer from Creole</b> – because Creole and English share most vocabulary, students may not notice grammatical differences (Jaden's "The opposition argue dat" still lacks the -s ending).</li>
<li><b>Negative attitudes / anxiety</b> – fear of being judged for "improper" speech may cause students to freeze (Rohan: "I forget de rest").</li>
<li><b>Belief that they already speak English</b> – students living in an officially English-speaking territory may not see the need to change their forms.</li>
<li><b>Limited exposure / models</b> – Standard English may be used mainly in class, giving few opportunities to practise it naturally.</li>
</ul>
` + OE,
        model: `<p>In Caribbean classrooms, teachers seldom speak only one language variety; instead, they move along the Creole continuum to suit their purposes. In the excerpt, Ms Arrindell, a debate coach in The Valley, switches between Standard English and Anguillan Creole while preparing her team. Her choices are deliberate, serving both instructional and relational goals. This essay will explain why she uses each variety, identify a grammatical feature of her speech and a phonological feature of her students' speech, and explain a challenge her students may face in mastering Standard English.</p>
<p>Ms Arrindell uses Standard English because it is the variety expected in formal debating. She opens with "Today we are going to practise rebuttals" and immediately corrects Jaden's "dem say" to "They say social media makes young people lazy." Since debate judges will reward Standard English, she models it so that students can imitate it. The acrolect therefore marks the serious, instructional part of the session.</p>
<p>However, she uses Creole to build rapport and manage behaviour. She praises Keisha with "Girl, you right, you right!" and rebukes Rohan with "Stop mout'in an pay attention!" Because Creole is the students' home variety, her praise sounds sincere and her reprimand is immediate and clear. She also reassures Rohan with "Don't fret. Is only practice," lowering his anxiety so that he will try again.</p>
<p>One grammatical feature of the teacher's language is the habitual aspect marker "does". She says, "Dem judges does take off marks for dat," where Standard English would use the simple present, "Judges take off marks." In Creole, "does" signals an action that happens regularly, and it does not change for person or number.</p>
<p>A phonological feature of the students' language is the stopping of dental fricatives. The "th" sounds /θ/ and /ð/ are pronounced as /t/ and /d/, as in Jaden's "dat" for "that", Keisha's "tings" for "things", and Rohan's "tink" for "think" and "de" for "the". This feature is common across English-lexicon Creoles in the Caribbean.</p>
<p>One challenge these students may face is interference from Creole. Because Creole and English share most of their vocabulary, students may not notice where the grammar differs. For instance, when Jaden "corrects" himself, he changes the vocabulary but still says "The opposition argue", without the Standard English -s ending, and Rohan does the same with "the opposition claim". Since the forms look so similar, learners need explicit instruction in differences such as subject–verb agreement before they can use the formal variety confidently.</p>
<p>In conclusion, Ms Arrindell's code-switching shows how Caribbean teachers use both varieties purposefully, and it highlights the linguistic awareness her students need to succeed in formal debate.</p>`,
        teacherTip: `<p>The specimen marks grammar and phonology separately and gives NO marks if the wrong type of feature is offered. Make students label every example: "grammatical (structure)" vs "phonological (sound)". Note that this paper asks for the teacher's grammar but the STUDENTS' pronunciation; read the bullet carefully and quote from the correct speaker.</p>`
      },

      /* ---------------- Q3 Module 3 ---------------- */
      {
        type: 'write', module: '3', title: `Question 3 · Module 3`, genre: `Essay`,
        stimulus: `<p><b>SECTION C · MODULE 3 – SPEAKING AND WRITING</b></p>
<p>3. Read the scenario below carefully and then answer the question that follows.</p>
<p>The Board of Management of your secondary school has invited student representatives to present proposals at its next meeting. As president of the Student Council, you have been asked to deliver a 10-minute presentation proposing that one classroom be converted into a "Calm Room": a supervised space where students experiencing stress or anxiety may go for short periods during the school day.</p>
<p>The board includes the principal, a parent representative, a representative of the school's church sponsor and an official from the Ministry of Education. Some board members have already expressed concern about the cost of the project and about students using the room to "skip class".</p>`,
        prompt: `<p>In an essay of NO MORE than 300 words, discuss the plan of action that you and your team will undertake as you prepare for this presentation by</p>
<ul>
<li>explaining TWO message points related to ethos or kairos appeals that you could use to persuade the board</li>
<li>justifying ONE language register and ONE dialectal variety that would be considered appropriate for your audience</li>
<li>justifying the use of ONE digital media technology that could enhance the delivery of your presentation to the board.</li>
</ul>
<p style="text-align:right"><b>[25 marks]</b></p>`,
        min: 200, max: 300,
        checklist: [
          `TWO message points written as actual statements you would say, each labelled ethos or kairos and explained`,
          `ONE register named (formal) and justified with reference to the board's status and the setting`,
          `ONE dialectal variety named (Standard English) and justified for this audience`,
          `ONE named digital technology (e.g. PowerPoint on a smart TV) with a reason linked to the board`,
          `Stays within 300 words; short introduction and conclusion`
        ],
        rubric: rubric([`ethos|credib|expert|endors`, `kairos|timing|timely|now is`, `formal register|register`, `standard english|dialect`, `powerpoint|canva|prezi|slides|smart (tv|board)|laptop|projector|video`],
          `Two genuine message points clearly tied to ethos and kairos and to the board's concerns; register and dialect each named and justified; one named digital tool with a precise benefit.`,
          `Message points are vague ("we will be persuasive"); ethos/kairos confused with logos/pathos; register and dialect not distinguished; technology named without justification.`),
        key: `<h4>MARKING KEY · Question 3 (Content 10 marks)</h4>
<p><b>(a) Explain TWO message points related to ethos or kairos appeals [4 marks]</b></p>
<p>Award 1 mark each for a clear identification of TWO message points related to either ethos or kairos appeals. [1 + 1 = 2 marks]<br>Award 1 mark each for a clear explanation of how each message point relates to ethos or kairos. [1 + 1 = 2 marks]</p>
<p><i>Message points related to ethos</i></p>
<ul>
<li>"As your elected Student Council, we surveyed over 400 students before preparing this proposal." <br>Explanation: establishes the speaker's credibility and the legitimacy of the proposal.</li>
<li>"The school counsellor has agreed to supervise the room, and the room will operate under a sign-in system." <br>Explanation: borrows the authority of a trusted professional and answers the "skipping class" concern.</li>
<li>"Similar quiet rooms are recommended by the Ministry's own student-wellbeing guidelines." <br>Explanation: appeals to an authoritative source the board respects.</li>
</ul>
<p><i>Message points related to kairos</i></p>
<ul>
<li>"With CSEC and CAPE examinations only a few months away, student stress is at its peak; now is the time to act." <br>Explanation: uses timing to show urgency.</li>
<li>"With World Mental Health Day just passed, our school has an opportunity to show leadership." <br>Explanation: links the proposal to a timely public occasion.</li>
<li>"The new budget cycle begins next month, so approving the proposal now allows costs to be planned." <br>Explanation: uses the right moment to address the cost concern.</li>
<li>Any other acceptable message point and relevant explanation of its connection to ethos or kairos.</li>
</ul>
<p><b>(b) Justify ONE language register and ONE dialectal variety [4 marks]</b></p>
<p>Award 1 mark for a clear identification of an appropriate dialectal variety and 1 mark for a brief justification of its use. Award 1 mark for a clear identification of a relevant register and 1 mark for an acceptable justification. [2 + 2 = 4 marks]</p>
<ul>
<li><b>Formal register</b> – the board is an official decision-making body of high-status adults; formality signals respect and seriousness; the setting is a formal meeting.</li>
<li><b>Standard English</b> – the accepted variety for official meetings and education; understood by all members, including any whose first language is not English; projects competence.</li>
</ul>
<p><b>(c) Justify ONE digital media technology [2 marks]</b></p>
<p>Award 1 mark for identification of any relevant digital media technology/device and 1 mark for an acceptable explanation of its use. [1 + 1 = 2 marks]</p>
<ul>
<li>Presentation software: PowerPoint, Canva, Google Slides, Prezi; hardware: laptop, projector, smart TV, tablet; short digital video of student testimonials; online survey dashboard.</li>
<li>Justification may include: displays survey data clearly in charts; shows a floor plan or mock-up of the room; keeps the presentation within ten minutes; looks professional to a high-status audience; easy to share with board members afterwards.</li>
</ul>
<p>Unless specified as digital or online, do not accept: radio, television, video or text messaging.</p>
` + OE,
        model: `<p>Student wellbeing has become an urgent concern in Caribbean schools. As Student Council president presenting our "Calm Room" proposal to the Board of Management, my team must persuade a cautious, high-status audience. Our plan therefore rests on credible and timely message points, appropriate language and clear visual support.</p>
<p>Our first message point will use ethos: "As your elected Student Council, we surveyed 412 students, and our counsellor, Mrs Hodge, has agreed to supervise the room through a sign-in system." This builds credibility because it shows that the proposal is researched and endorsed by a trusted professional, and it directly answers the fear that students will skip class. Our second point will use kairos: "With CSEC and CAPE examinations only months away, student stress is at its peak, so now is the moment to act." This appeals to timing, showing the board that delay would hurt students when support matters most.</p>
<p>We will use a formal register because the board is an official decision-making body whose members, including a Ministry official, hold authority over us. Formality shows respect and that we take the matter seriously. Our dialectal variety will be Standard English, since it is the expected variety for official meetings and will be understood by every board member, including any whose first language is not English.</p>
<p>Finally, we will use a PowerPoint presentation displayed on the boardroom's smart TV. Slides can present our survey results as simple charts and show a floor plan of the proposed room, making our evidence easy to grasp and helping us keep to ten minutes.</p>
<p>With these choices, our team can deliver a proposal that is credible, timely and professional.</p>`,
        teacherTip: `<p>Students often describe an appeal instead of writing a message point. Insist that each message point is a sentence they would actually say, in quotation marks, followed by "This appeals to ethos/kairos because...". Remind them that ethos is about the speaker's credibility and kairos about timing, and that 300 words is a hard limit.</p>`
      }
    ]
  });

  /* =====================================================================
     PAPER B
     ===================================================================== */
  P.push({
    kind: 'p2', id: `P2B`, title: `Paper 02 · Practice Paper B`, time: 150,
    intro: INTRO,
    questions: [
      /* ---------------- Q1 Module 1 ---------------- */
      {
        type: 'write', module: '1', title: `Question 1 · Module 1`, genre: `Essay`,
        stimulus: `<p><b>SECTION A · MODULE 1 – GATHERING AND PROCESSING INFORMATION</b></p>
<p>1. Read the extract below carefully and then answer the question that follows.</p>
<h4 style="text-align:center">The Plate We Import</h4>
<p>Walk through any supermarket in the northeastern Caribbean and play a simple game: try to fill a basket with food grown within fifty miles. You will leave with a few bunches of callaloo, some limes, perhaps a bag of locally caught fish, and very little else.</p>
<p>The numbers behind that basket are sobering. According to the Eastern Caribbean Food Policy Unit's 2023 report, small island states in our subregion import between 70 and 90 per cent of the food they eat. In 2022 alone, the Unit estimated that the subregion spent more than US$1.2 billion on food imports, money that left our economies and never returned.</p>
<p>This dependence is not only an economic problem; it is a security problem. When a hurricane closes a port, when a global price spike doubles the cost of flour, or when a shipping line cancels a route, our plates empty faster than our pockets. The pandemic years taught us this lesson painfully, yet we seem determined to forget it.</p>
<p>Some argue that small islands simply lack the land to feed themselves. That argument confuses "everything" with "more". No one is suggesting that St. Kitts will grow its own wheat. But hydroponic units on rooftops, school gardens, community plots on unused government land and modern fish farming can supply far more fresh produce than we do today. In Barbados, a pilot programme supported 300 backyard growers who together produced an estimated 40 tonnes of vegetables in a single year.</p>
<p>Others claim that young people are not interested in farming. Yet farming in the twenty-first century looks very different from the back-breaking image in our grandparents' memories. It involves sensors, apps, drip irrigation and marketing on social media. Show a teenager a tablet-controlled greenhouse and watch how quickly "farming" becomes "agri-tech".</p>
<p>What is missing is not land or talent but will. Governments must offer duty-free status on growing equipment, guarantee that a share of school meals is bought locally and train extension officers for the modern era. Consumers, too, must choose local whenever they can.</p>
<p>Every meal is a decision. For too long, we have let others make it for us.</p>
<p><small>SOURCE: Adapted from Dr Anselm Lake (2024). "The Plate We Import". <i>Caribbean Policy Review</i>, Issue 18, March 2024.</small></p>
<p><small><i>Dr Anselm Lake is an agricultural economist who lectures at a regional university and advises two Caribbean governments on food security policy. He is also a director of a company that manufactures hydroponic growing systems.</i></small></p>`,
        prompt: M1_PROMPT,
        min: 300, max: 500,
        checklist: M1_CHECK,
        rubric: rubric(M1_LOOK,
          `Main message captures dependence, risk and the solution; purpose stated with verb and elements; two strategies (e.g. concession and refutation, statistics, metaphor) with quoted examples and explanation; credibility notes expertise and data against the conflict of interest.`,
          `Summary of the extract instead of a main message; techniques named with no example; overlooks the hydroponics directorship when judging credibility.`),
        key: `<h4>MARKING KEY · Question 1 (Content 10 marks)</h4>
<p><b>• State the writer's main message [2 marks]</b></p>
<p>Award 2 marks for a statement which effectively captures all of the points in the following. Award 1 mark for a statement which captures two of the points. Award no mark for a statement of the topic ONLY.</p>
<blockquote>Caribbean islands' heavy dependence on imported food (1) threatens both their economies and their food security (2); with political will, modern local production can significantly reduce this dependence (3).<br><b>OR</b><br>Small islands import most of their food (1), leaving them vulnerable to shocks (2), but government incentives, agri-tech and consumer choice can increase local production (3).</blockquote>
<p><b>• State the writer's purpose [2 marks]</b></p>
<p>Award 2 marks for a response which has a clearly stated purpose verb and captures two other elements from the following. Award 1 mark for a purpose verb and one other element. Award no mark for a purpose verb without an acceptable explanation.</p>
<p>The writer's purpose is to</p>
<ul>
<li>highlight/inform readers of the extent of food import dependence</li>
<li>explain/show that this dependence is a security risk, not only an economic one</li>
<li>refute the arguments that islands lack land and that youth are uninterested</li>
<li>persuade/urge governments and consumers to support local food production.</li>
</ul>
<p><b>• Discuss TWO organizational strategies OR language techniques OR any combination [4 marks]</b></p>
<p>Award 2 marks each for correct identification, example and explanation of any two organizational strategies or language techniques or combination thereof. [2 + 2 = 4 marks]<br>Award 1 mark for correct naming of ONE strategy or technique with example but no explanation.<br>Award 1 mark for correct naming of two or more strategies or techniques without example(s) or explanation(s).</p>
<p><i>Organizational strategies</i></p>
<ul>
<li><b>Statistical data</b> – 70 to 90 per cent; US$1.2 billion; 300 growers and 40 tonnes. Used to show the scale of the problem and that the solution is realistic.</li>
<li><b>Authoritative source</b> – the Eastern Caribbean Food Policy Unit's 2023 report. Used to suggest the figures are researched and reliable.</li>
<li><b>Concession and refutation / anticipating objections</b> – "Some argue that small islands simply lack the land..."; "Others claim that young people are not interested..." Used to address the reader's doubts and overturn them, strengthening the argument.</li>
<li><b>Cause and effect</b> – hurricane closes port, price spike, cancelled shipping lead to empty plates. Used to show why dependence is a security risk.</li>
<li><b>Example / case study</b> – Barbados backyard-grower pilot. Used to show that the solution works elsewhere in the region.</li>
<li><b>Problem and solution / call to action</b> – duty-free equipment, local purchasing for school meals, extension officers, consumers choosing local. Used to give the reader concrete steps.</li>
<li><b>Direct address / opening scenario</b> – "play a simple game". Used to involve the reader personally from the start.</li>
</ul>
<p><i>Language techniques</i></p>
<ul>
<li><b>Metaphor / imagery</b> – "our plates empty faster than our pockets". Used to make the abstract risk vivid and personal.</li>
<li><b>Contrast / wordplay</b> – "confuses 'everything' with 'more'"; "'farming' becomes 'agri-tech'". Used to reframe the opposing argument and modernise the image of farming.</li>
<li><b>Aphorism / short final sentences</b> – "Every meal is a decision. For too long, we have let others make it for us." Used to end memorably and make readers feel responsible.</li>
<li><b>Inclusive pronouns</b> – "our economies", "we seem determined to forget". Used to build solidarity with a Caribbean readership.</li>
<li><b>Emotive diction</b> – "sobering", "painfully", "back-breaking". Used to stir concern and contrast old and new images of farming.</li>
</ul>
<p><b>• Evaluate the credibility of the information presented [2 marks]</b></p>
<p>Award 1 mark each for a clear explanation of any two of the following reasons. [1 + 1 = 2 marks]</p>
<p>The information may be considered credible because</p>
<ul>
<li>the writer is an agricultural economist, lecturer and government adviser, and is qualified to discuss food policy</li>
<li>statistics are attributed to a named, dated regional source</li>
<li>a regional case study (Barbados) supports the claims</li>
<li>the article is published in a policy journal and is recent (2024)</li>
<li>it agrees with what readers know about import dependence and pandemic shortages.</li>
</ul>
<p>The information may be considered less than credible because</p>
<ul>
<li>the writer is a director of a company that manufactures hydroponic systems, and he recommends hydroponics and duty-free equipment, a conflict of interest</li>
<li>the Barbados figure is "estimated" and the pilot programme is not named</li>
<li>the claim about young people's attitudes is not supported by evidence</li>
<li>the import range (70–90 per cent) is broad and not specific to St. Kitts.</li>
</ul>
` + OE,
        model: `<p>Since the pandemic, food security has moved from the margins to the centre of Caribbean policy debate. In "The Plate We Import", Dr Anselm Lake's main message is that <b>Caribbean islands' heavy reliance on imported food endangers their economies and security, but political will and modern local production can reduce it.</b> His purpose is to alert readers to the scale of the problem and to persuade governments and consumers to support local agriculture. He achieves this through concession and refutation and through vivid metaphor, although his credibility is partly weakened by a conflict of interest.</p>
<p>One organizational strategy Lake uses is concession and refutation. He anticipates two objections: "Some argue that small islands simply lack the land" and "Others claim that young people are not interested in farming." He then overturns each one, arguing that the goal is "more", not "everything", and that modern farming is "agri-tech". By answering the reader's doubts before they can harden, Lake makes his proposal appear realistic and well considered. This supports his persuasive purpose because the reader is left with fewer reasons to reject local production.</p>
<p>In addition, Lake uses metaphor to make the risk personal. He warns that when ports close or prices rise, "our plates empty faster than our pockets". This image turns statistics about imports into something every reader can picture: an empty plate at home. The inclusive pronoun "our" strengthens the effect, suggesting that every Caribbean household is affected. As a result, the reader feels the urgency of the problem rather than merely understanding it, and is more likely to accept the call to action.</p>
<p>The information is credible to some extent. Lake is an agricultural economist who lectures at a regional university and advises two governments, so he is well qualified. His statistics are attributed to a named, dated source, the Eastern Caribbean Food Policy Unit's 2023 report, and the Barbados pilot provides regional evidence. However, the author bio reveals that he directs a company that manufactures hydroponic systems, and he recommends both hydroponics and duty-free growing equipment. This conflict of interest means readers should question whether his solutions are entirely objective. Moreover, the Barbados figure is only "estimated" and the programme is not named, so it cannot easily be verified.</p>
<p>In conclusion, Lake persuades effectively through refutation and imagery, but his business interests mean his recommendations should be read with some caution.</p>`,
        teacherTip: `<p>This extract deliberately hides a conflict of interest in the author bio. Ask students to underline every detail in the bio and ask: "Does anything here give the writer a reason to want a particular outcome?" Concession and refutation is a high-value strategy for this paper; students should quote both the concession and the refutation.</p>`
      },

      /* ---------------- Q2 Module 2 ---------------- */
      {
        type: 'write', module: '2', title: `Question 2 · Module 2`, genre: `Essay`,
        stimulus: `<p><b>SECTION B · MODULE 2 – LANGUAGE AND COMMUNITY</b></p>
<p>2. Read the excerpt below carefully and then answer the question that follows.</p>
<p><i>The following is an extract from a call-in segment of "Talk Yuh Talk", a morning radio programme in Barbados. The topic is whether newsreaders on local radio should be allowed to read some news items in Bajan.</i></p>
<p><b>Host (Vernon):</b> Good morning, good morning! Lines are full this morning, people. First caller, you're on the air.</p>
<p><b>Mrs Gumbs:</b> Good morning, Vernon. I'm a retired teacher, and I must say I am disappointed with this whole idea. The news is serious business. When I hear somebody reading the news and saying "de gov'ment say dem going fix de road", I feel ashamed. What will visitors think of us? We spent years teaching children to speak properly, and now radio wants to undo it.</p>
<p><b>Host:</b> [pauses] Mm-hmm. So you feel it lowers the standard.</p>
<p><b>Mrs Gumbs:</b> Exactly. The language of the news should be the language of education.</p>
<p><b>Host:</b> Thank you, Mrs Gumbs. Next caller, go ahead.</p>
<p><b>Dwayne:</b> Yo, Vernon, wha' happenin', boss! Respec' to de elders, but I hadda call in. Dis is we language, man. When my granny hear de news in big English, she does turn off de radio 'cause she cyan follow it. If dey read it how we does talk, everybody does understan'. Why we must sound like CNN to be serious?</p>
<p><b>Host:</b> [laughing] Okay, okay, Dwayne, I hear you, bredda!</p>
<p><b>Dwayne:</b> Is true, Vernon! In Jamaica and Trinidad dey have shows in dey own talk, and nobody dying from it.</p>
<p><b>Host:</b> [lowers voice, more serious] Let's be fair to both sides. Mrs Gumbs is worried about standards, and Dwayne is worried about access. Maybe there is room for both. Let's take a short break and come right back with more of your calls.</p>`,
        prompt: `<p>Write an essay, in NO MORE than 500 words, in which you</p>
<ul>
<li>identify, using ONE adjective in EACH case, the attitude to Bajan expressed by Mrs Gumbs and by Dwayne, supporting your answer with evidence from the excerpt</li>
<li>explain ONE factor that may have shaped EACH caller's attitude</li>
<li>identify and explain ONE communicative behaviour (verbal or non-verbal) used by the host to manage the discussion.</li>
</ul>
<p style="text-align:right"><b>[25 marks]</b></p>`,
        min: 300, max: 500,
        checklist: [
          `ONE precise adjective for EACH caller's attitude (e.g. negative/disapproving; positive/proud) with a quotation as evidence`,
          `ONE factor for EACH caller (e.g. occupation/education, age, nationalism, identity, accessibility, exposure to other territories) explained, not just named`,
          `ONE communicative behaviour of the HOST named (e.g. paraphrasing, turn-taking, tone shift, code-switching, laughter) with evidence and its effect`,
          `Body paragraphs follow PEEL; essay written in Standard English`
        ],
        rubric: rubric([`attitude`, `negative|disapprov|ashamed|prescriptive|positive|proud|favourable|loyal`, `factor|education|age|occupation|identity|national|access|exposure`, `communicative behaviou?r|paraphras|summar|turn.taking|tone|code.switch|laugh|pause|non.verbal`],
          `Precise adjectives backed by quotations; factors explained with clear links to each caller's background; host's behaviour named, evidenced and its function explained.`,
          `Vague adjectives ("bad", "different"); factors merely named; describes what the host said without naming a communicative behaviour or explaining its effect.`),
        key: `<h4>MARKING KEY · Question 2 (Content 10 marks)</h4>
<p><b>• Identify, using ONE adjective in each case, the attitude of EACH caller, with evidence [4 marks]</b></p>
<p>Award 2 marks EACH for an appropriate adjective with relevant supporting evidence from the excerpt. [2 + 2 = 4 marks]<br>Award 1 mark for an appropriate adjective without evidence, OR evidence without a clear adjective.</p>
<p><i>Mrs Gumbs</i> – negative / disapproving / prescriptive / unfavourable / ashamed / purist</p>
<ul>
<li>"I am disappointed with this whole idea"; "I feel ashamed"; "What will visitors think of us?"; "speak properly"; "the language of the news should be the language of education".</li>
</ul>
<p><i>Dwayne</i> – positive / favourable / proud / loyal / accepting / nationalistic</p>
<ul>
<li>"Dis is we language, man"; "If dey read it how we does talk, everybody does understan'"; "Why we must sound like CNN to be serious?"</li>
</ul>
<p><b>• Explain ONE factor that may have shaped EACH caller's attitude [4 marks]</b></p>
<p>Award 2 marks EACH for the identification and explanation of a relevant factor. [2 + 2 = 4 marks]<br>Award 1 mark for naming a factor without explanation.</p>
<p><i>Mrs Gumbs</i></p>
<ul>
<li><b>Education / occupation</b> – as a retired teacher she was trained to correct Creole and promote Standard English as the language of schooling.</li>
<li><b>Age / generation</b> – older speakers grew up when Creole was openly stigmatised in schools and public life.</li>
<li><b>Concern for external image</b> – "What will visitors think of us?" reflects a tourism-dependent society's sensitivity to outsiders' judgements.</li>
<li><b>Colonial legacy / prestige of the standard</b> – association of English with status, power and "seriousness".</li>
</ul>
<p><i>Dwayne</i></p>
<ul>
<li><b>Identity / nationalism</b> – sees Creole as "we language", a marker of belonging.</li>
<li><b>Accessibility / family experience</b> – his grandmother cannot follow formal English news.</li>
<li><b>Age / generation</b> – younger speakers are more likely to have been exposed to positive views of Creole.</li>
<li><b>Exposure to regional media</b> – awareness that Jamaica and Trinidad use their Creoles on air normalises Creole in the media.</li>
</ul>
<p><b>• Identify and explain ONE communicative behaviour used by the host [2 marks]</b></p>
<p>Award 1 mark for identification with evidence and 1 mark for a reasonable explanation of its function. [1 + 1 = 2 marks]</p>
<ul>
<li><b>Paraphrasing / summarising</b> – "So you feel it lowers the standard"; "Mrs Gumbs is worried about standards, and Dwayne is worried about access." Shows active listening and neutrality.</li>
<li><b>Code-switching / accommodation</b> – "I hear you, bredda!" to Dwayne versus formal "Thank you, Mrs Gumbs." Builds rapport by matching each caller.</li>
<li><b>Change of tone / paralinguistic cues</b> – "[lowers voice, more serious]"; "[laughing]"; "[pauses]". Signals a shift from banter to balanced moderation.</li>
<li><b>Turn-taking management</b> – "First caller, you're on the air"; "Next caller, go ahead"; "Let's take a short break". Controls the flow of the programme.</li>
<li><b>Back-channelling</b> – "Mm-hmm". Encourages the caller to continue.</li>
</ul>
` + OE,
        model: `<p>Few topics provoke Caribbean audiences like the question of which language belongs in public life. In the "Talk Yuh Talk" excerpt, two callers debate whether Bajan should be used for radio news, revealing sharply opposed attitudes, while the host carefully manages the exchange. This essay will identify each caller's attitude, explain a factor that may have shaped it, and examine one communicative behaviour used by the host.</p>
<p>Mrs Gumbs's attitude to Bajan is disapproving. She says she is "disappointed with this whole idea" and that hearing the news read in Creole makes her "feel ashamed". She also insists that "the language of the news should be the language of education", implying that only Standard English is suitable for serious matters. Her words clearly show that she considers the vernacular inferior.</p>
<p>By contrast, Dwayne's attitude is proud. He declares, "Dis is we language, man," and asks, "Why we must sound like CNN to be serious?" He views Bajan not as a fault but as a legitimate, even superior, means of reaching the whole community.</p>
<p>Mrs Gumbs's attitude has likely been shaped by her occupation. As a retired teacher, she spent years "teaching children to speak properly", which suggests that she was trained to correct Creole and promote Standard English as the only acceptable classroom variety. Because her professional identity was built on this mission, she sees Creole on the news as undoing her life's work.</p>
<p>Dwayne's attitude, however, appears to have been shaped by concern for accessibility rooted in family experience. He explains that his grandmother "does turn off de radio 'cause she cyan follow it" when the news is read in formal English. For him, language is therefore a question of who is included or excluded. His awareness that Jamaica and Trinidad broadcast in "dey own talk" further strengthens his view that Creole can be used publicly without harm.</p>
<p>Finally, the host, Vernon, uses paraphrasing to manage the discussion. After Mrs Gumbs speaks, he restates her view: "So you feel it lowers the standard." Later, with a lowered, more serious voice, he summarises both positions: "Mrs Gumbs is worried about standards, and Dwayne is worried about access." This behaviour shows active listening, confirms that he has understood each caller, and keeps him neutral. As a result, a potentially heated exchange is calmed and listeners are invited to consider both sides.</p>
<p>In conclusion, the excerpt shows how education and personal experience produce contrasting language attitudes, and how skilful paraphrasing allows a host to keep such a debate balanced.</p>`,
        teacherTip: `<p>Build a bank of attitude adjectives with your class (negative, prescriptive, purist, ambivalent, positive, proud, loyal, tolerant) and ban "bad" and "good". A factor must be EXPLAINED: "She is a teacher" earns 1 mark; "As a teacher she was trained to correct Creole, so she sees it as an error" earns 2. For communicative behaviour, students must name the behaviour (paraphrasing, code-switching, tone change) before describing it.</p>`
      },

      /* ---------------- Q3 Module 3 ---------------- */
      {
        type: 'write', module: '3', title: `Question 3 · Module 3`, genre: `Essay`,
        stimulus: `<p><b>SECTION C · MODULE 3 – SPEAKING AND WRITING</b></p>
<p>3. Read the scenario below carefully and then answer the question that follows.</p>
<p>Following heavy rains, health officials in The Bahamas have reported a sharp increase in dengue fever cases, especially in densely populated New Providence neighbourhoods such as Bain Town, Grant's Town and Fox Hill. Many cases have been linked to mosquitoes breeding in water collected in discarded tyres, flower pots and uncovered drums.</p>
<p>Your youth group, in partnership with a community council, has been asked to design a four-week campaign, "Tip It, Toss It, Cover It", to encourage households to remove standing water. Your target audience is heads of households aged 18 to 60 in these neighbourhoods. Many work long hours, some speak Spanish or Haitian Creole as a first language, and most use smartphones daily.</p>`,
        prompt: `<p>In an essay of NO MORE than 300 words, discuss the plan of action that your group will undertake as you prepare this campaign by</p>
<ul>
<li>analysing TWO characteristics of your target audience that would influence the design of your campaign</li>
<li>explaining TWO message points related to logos or pathos appeals that you could use to persuade households to act</li>
<li>justifying the use of ONE digital media channel to deliver your campaign to this audience.</li>
</ul>
<p style="text-align:right"><b>[25 marks]</b></p>`,
        min: 200, max: 300,
        checklist: [
          `TWO audience characteristics taken from the scenario (long working hours, multilingual, smartphone users, age range) each linked to a campaign decision`,
          `TWO message points written as actual campaign statements, each labelled logos or pathos and explained`,
          `ONE named digital channel (e.g. WhatsApp broadcast lists, Facebook community groups, Instagram reels) justified for this audience`,
          `Stays within 300 words`
        ],
        rubric: rubric([`audience|characteristic|multilingual|spanish|haitian|long hours|busy|smartphone`, `logos|statistic|fact|evidence`, `pathos|emotion|fear|family|children|protect`, `whatsapp|facebook|instagram|tiktok|youtube|website|social media|text message`],
          `Audience analysis drives specific design choices; two strong message points tied to logos/pathos; one digital channel convincingly justified for busy, multilingual smartphone users.`,
          `Repeats the scenario without analysis; message points are slogans with no appeal explained; names "social media" generally without justification.`),
        key: `<h4>MARKING KEY · Question 3 (Content 10 marks)</h4>
<p><b>(a) Analyse TWO characteristics of the target audience [4 marks]</b></p>
<p>Award 1 mark each for identification of TWO relevant characteristics and 1 mark each for an explanation of how each would influence the campaign. [2 + 2 = 4 marks]</p>
<ul>
<li><b>Long working hours / limited time</b> – messages must be short, simple and actionable; activities scheduled for evenings or weekends.</li>
<li><b>Linguistic diversity</b> – materials in English, Spanish and Haitian Creole; heavy use of images and icons.</li>
<li><b>Daily smartphone use</b> – campaign can be delivered digitally with reminders.</li>
<li><b>Heads of households / parents</b> – responsible for children and elderly relatives, so protecting family is motivating.</li>
<li><b>Residents of densely populated neighbourhoods</b> – neighbour-to-neighbour action and community clean-ups are effective.</li>
</ul>
<p><b>(b) Explain TWO message points related to logos or pathos [4 marks]</b></p>
<p>Award 1 mark each for a clear identification of TWO message points related to either logos or pathos appeals. [1 + 1 = 2 marks]<br>Award 1 mark each for a clear explanation of how each message point relates to logos or pathos. [1 + 1 = 2 marks]</p>
<p><i>Logos</i></p>
<ul>
<li>"A single bottle cap of water can breed hundreds of mosquitoes in about a week." Explanation: a factual, logical reason to remove even small amounts of water.</li>
<li>"Health officials report that most dengue cases this year came from neighbourhoods with uncovered containers." Explanation: evidence from an authoritative source.</li>
<li>"Tipping containers takes five minutes a week; a dengue illness can mean a week or more off work." Explanation: logical comparison of cost and benefit.</li>
</ul>
<p><i>Pathos</i></p>
<ul>
<li>"Your children play in that yard; don't let a flower pot put them in hospital." Explanation: arouses protective love and fear.</li>
<li>"Protect your neighbours as you would your family." Explanation: appeals to community pride and solidarity.</li>
<li>Any other acceptable message point and relevant explanation.</li>
</ul>
<p><b>(c) Justify ONE digital media channel [2 marks]</b></p>
<p>Award 1 mark for identification of any relevant digital channel and 1 mark for an acceptable justification. [1 + 1 = 2 marks]</p>
<ul>
<li>WhatsApp broadcast lists / community groups; Facebook community pages; Instagram or TikTok short videos; YouTube; SMS text blasts specified as digital.</li>
<li>Justification may include: already used daily by the audience; can be read quickly between work shifts; supports images, voice notes and multilingual versions; allows weekly reminders; low cost; easy sharing between neighbours.</li>
</ul>
` + OE,
        model: `<p>With dengue cases rising after heavy rains, our youth group must design a "Tip It, Toss It, Cover It" campaign that busy households will actually act on. Our plan begins with the audience.</p>
<p>First, many heads of household work long hours, so our messages must be short and immediately practical: a weekly five-minute checklist rather than long explanations. Secondly, the audience is linguistically diverse, with many residents speaking Spanish or Haitian Creole. We will therefore produce every message in English, Spanish and Haitian Creole and rely heavily on simple images of tyres, pots and drums so that no one is excluded.</p>
<p>Our first message point will appeal to logos: "A single bottle cap of water can breed hundreds of mosquitoes in about a week." This fact gives a clear, logical reason why even small containers matter. Our second point will appeal to pathos: "Your children play in that yard; don't let a flower pot put them in hospital." Because our audience is responsible for children and elderly relatives, this message stirs protective love and a healthy fear, motivating immediate action.</p>
<p>To deliver the campaign, we will use WhatsApp community broadcast lists. Most of our audience already uses smartphones daily, and WhatsApp is the app they check between shifts. It allows us to send short videos, pictures and voice notes in all three languages, and to post a reminder every Saturday morning. Residents can also forward messages to neighbours at no cost, spreading the campaign quickly through each neighbourhood.</p>
<p>By shaping our messages around the audience's time, language and habits, we can turn awareness into real action against dengue.</p>`,
        teacherTip: `<p>"Analyse" the audience means: characteristic + so what? Train students to write "Because..., we will...". For the digital channel, the specimen accepts named platforms but not vague "social media" or undigital "radio"; the justification must connect to THIS audience.</p>`
      }
    ]
  });

  /* =====================================================================
     PAPER C
     ===================================================================== */
  P.push({
    kind: 'p2', id: `P2C`, title: `Paper 02 · Practice Paper C`, time: 150,
    intro: INTRO,
    questions: [
      /* ---------------- Q1 Module 1 ---------------- */
      {
        type: 'write', module: '1', title: `Question 1 · Module 1`, genre: `Essay`,
        stimulus: `<p><b>SECTION A · MODULE 1 – GATHERING AND PROCESSING INFORMATION</b></p>
<p>1. Read the extract below carefully and then answer the question that follows.</p>
<h4 style="text-align:center">Switched Off, Tuned In?</h4>
<p>At 7:45 every morning, the students of a secondary school in Anguilla hand their phones to their form teachers, who lock them in a metal cabinet until the final bell. When the policy was introduced in September 2023, parents protested and students called it "prison rules". Eighteen months later, few want to go back.</p>
<p>I spent two weeks at the school researching this article, and the change in atmosphere is striking. At lunch, students talk, play dominoes and argue about football instead of scrolling in silence. "We actually know each other now," one fifth-former told me. Teachers report that lessons start on time because no one is finishing a message under the desk.</p>
<p>The school's own data supports these impressions. Reported incidents of cyberbullying during school hours fell from 41 in the year before the ban to 9 in the year after. The average mark in internal mathematics examinations rose by six percentage points. The principal is careful not to claim that the ban alone caused this, but she believes it "removed a constant distraction".</p>
<p>Critics raise fair objections. Phones are powerful learning tools; students research, photograph notes and use dictionary apps. Parents worry about reaching their children in an emergency, a real concern in a region that lives with hurricane season. And some argue that schools should teach responsible use rather than simply confiscate.</p>
<p>Yet these objections can be answered without abandoning the policy. The Anguillan school provides shared tablets for research, and the front office will contact any student within minutes. A weekly digital-citizenship lesson teaches students to manage screen time. Banning phones during the school day, in other words, is not a rejection of technology. It is a decision about when and how technology serves learning.</p>
<p>Across the Caribbean, ministries are watching. Before others follow, they should study the evidence carefully, consult students and parents, and invest in the alternatives that made this policy work. A phone ban without tablets, training and trust is merely a lock on a cabinet. With them, it may be the key to a more connected school.</p>
<p><small>SOURCE: Adapted from Marisol Hodge-Carty (2025). "Switched Off, Tuned In?" <i>Regional Education Weekly</i> (online edition), 3 February 2025.</small></p>
<p><small><i>Marisol Hodge-Carty is an education journalist based in the Leeward Islands. She holds a master's degree in educational research and has reported on schools across the OECS for twelve years. Her visit to the school was arranged by the school's principal.</i></small></p>`,
        prompt: M1_PROMPT,
        min: 300, max: 500,
        checklist: M1_CHECK,
        rubric: rubric(M1_LOOK,
          `Main message balances the benefits and the conditions for success; purpose stated precisely; two strategies (e.g. statistics, testimonial, concession) quoted and explained; credibility weighs first-hand research and qualifications against a single school, internal data and a principal-arranged visit.`,
          `Claims the writer simply supports or opposes phones; strategies named only; credibility judged on "she is a journalist" alone.`),
        key: `<h4>MARKING KEY · Question 1 (Content 10 marks)</h4>
<p><b>• State the writer's main message [2 marks]</b></p>
<p>Award 2 marks for a statement which effectively captures all of the points in the following. Award 1 mark for a statement which captures two of the points. Award no mark for a statement of the topic ONLY.</p>
<blockquote>A school-day phone ban has improved interaction, behaviour and results at one Anguillan school (1), and objections can be answered (2), but other schools should copy it only with evidence, consultation and alternatives such as tablets and training (3).<br><b>OR</b><br>Banning phones during school hours can benefit learning (1) if it is supported by alternatives (2) and introduced after careful study and consultation (3).</blockquote>
<p><b>• State the writer's purpose [2 marks]</b></p>
<p>Award 2 marks for a response which has a clearly stated purpose verb and captures two other elements from the following. Award 1 mark for a purpose verb and one other element. Award no mark for a purpose verb without an acceptable explanation.</p>
<p>The writer's purpose is to</p>
<ul>
<li>inform/report on the effects of one school's phone ban</li>
<li>show that common objections to phone bans can be addressed</li>
<li>advise/persuade Caribbean ministries to adopt bans only with evidence, consultation and supporting resources.</li>
</ul>
<p><b>• Discuss TWO organizational strategies OR language techniques OR any combination [4 marks]</b></p>
<p>Award 2 marks each for correct identification, example and explanation of any two organizational strategies or language techniques or combination thereof. [2 + 2 = 4 marks]<br>Award 1 mark for correct naming of ONE strategy or technique with example but no explanation.<br>Award 1 mark for correct naming of two or more strategies or techniques without example(s) or explanation(s).</p>
<p><i>Organizational strategies</i></p>
<ul>
<li><b>Narrative / descriptive opening</b> – phones locked in a metal cabinet at 7:45. Used to engage the reader with a concrete scene.</li>
<li><b>First-hand observation</b> – "I spent two weeks at the school". Used to suggest the account is based on direct research.</li>
<li><b>Testimonial / quotation</b> – "We actually know each other now"; the principal's "removed a constant distraction". Used to give voices from those affected and add authenticity.</li>
<li><b>Statistical data</b> – cyberbullying incidents fell from 41 to 9; mathematics average up six points. Used to support the claimed benefits with measurable evidence.</li>
<li><b>Before-and-after contrast</b> – "prison rules" versus "few want to go back"; scrolling in silence versus playing dominoes. Used to show the extent of change.</li>
<li><b>Concession and refutation</b> – "Critics raise fair objections..." followed by "Yet these objections can be answered". Used to appear balanced and then strengthen the case.</li>
<li><b>Problem and solution / recommendation</b> – ministries should study evidence, consult and invest in alternatives. Used to guide policy-makers.</li>
</ul>
<p><i>Language techniques</i></p>
<ul>
<li><b>Rhetorical question / wordplay in title</b> – "Switched Off, Tuned In?" Used to provoke curiosity and capture the paradox that removing phones increases connection.</li>
<li><b>Metaphor / extended image</b> – "merely a lock on a cabinet ... the key to a more connected school". Used to show that the ban only succeeds with support.</li>
<li><b>Antithesis / paradox</b> – "not a rejection of technology. It is a decision about when and how technology serves learning." Used to reframe the debate.</li>
<li><b>Hedging / cautious diction</b> – "careful not to claim that the ban alone caused this"; "may be the key". Used to appear objective and measured.</li>
</ul>
<p><b>• Evaluate the credibility of the information presented [2 marks]</b></p>
<p>Award 1 mark each for a clear explanation of any two of the following reasons. [1 + 1 = 2 marks]</p>
<p>The information may be considered credible because</p>
<ul>
<li>the writer is an experienced education journalist with a master's degree in educational research</li>
<li>it is based on two weeks of first-hand observation</li>
<li>specific figures and direct quotations are provided</li>
<li>the writer acknowledges objections and avoids claiming direct causation, suggesting objectivity</li>
<li>the article is recent (2025).</li>
</ul>
<p>The information may be considered less than credible because</p>
<ul>
<li>the visit was arranged by the principal, who may have presented the school favourably</li>
<li>the data is the school's own and has not been independently verified</li>
<li>evidence comes from only one school, which may not be typical of the region</li>
<li>the student quoted is unnamed, and only one student view is reported.</li>
</ul>
` + OE,
        model: `<p>Smartphones in classrooms remain one of the most debated issues in Caribbean education. In "Switched Off, Tuned In?", Marisol Hodge-Carty's main message is that <b>a school-day phone ban improved behaviour and results at one Anguillan school, but others should adopt it only with evidence, consultation and supporting resources.</b> Her purpose is to report on the ban's effects and to advise ministries on how to introduce similar policies responsibly. She achieves this mainly through statistical data and concession and refutation, and her information is credible, though with limitations.</p>
<p>The first strategy the writer uses is statistical data. She reports that cyberbullying incidents during school hours "fell from 41 in the year before the ban to 9 in the year after" and that mathematics averages rose "by six percentage points". These figures turn impressions into measurable outcomes, persuading policy-makers that the benefits are real. Importantly, she adds that the principal does not claim the ban "alone caused this", which makes the data appear honestly presented and supports her advisory purpose.</p>
<p>Secondly, the writer uses concession and refutation. She openly admits that "Critics raise fair objections", listing phones as learning tools, emergency contact during hurricane season and the need to teach responsible use. She then answers each one: shared tablets for research, a front office that contacts students "within minutes", and weekly digital-citizenship lessons. This structure makes her appear balanced, while showing ministries exactly what must accompany a ban. Consequently, her final recommendation feels earned rather than one-sided.</p>
<p>The information is credible to a large extent. Hodge-Carty holds a master's degree in educational research and has reported on OECS schools for twelve years, so she is qualified to judge school policy. She also spent two weeks observing the school, providing first-hand evidence and direct quotations. However, the bio reveals that her visit "was arranged by the school's principal", who may have shown the school in its best light. Furthermore, the statistics are the school's own and come from only one institution, so they may not apply across the region. Readers should therefore treat the findings as promising rather than conclusive.</p>
<p>In conclusion, through clear data and a fair handling of objections, Hodge-Carty presents a persuasive yet measured case, although her evidence needs wider confirmation.</p>`,
        teacherTip: `<p>This writer is more balanced than those in Papers A and B, so students must avoid saying she simply "supports" or "opposes" phone bans: her main message is conditional. Point out that hedging ("may be the key") is itself a technique that builds credibility. For the credibility bullet, the strongest answers notice that one school's internal data cannot prove a regional claim.</p>`
      },

      /* ---------------- Q2 Module 2 ---------------- */
      {
        type: 'write', module: '2', title: `Question 2 · Module 2`, genre: `Essay`,
        stimulus: `<p><b>SECTION B · MODULE 2 – LANGUAGE AND COMMUNITY</b></p>
<p>2. Read the excerpt below carefully and then answer the question that follows.</p>
<p><i>Shanice works at the front desk of a resort in Simpson Bay, Sint Maarten. The following exchanges were recorded, with permission, during one hour of her shift. Marlon is a co-worker from Sint Maarten; Mr Dalrymple is a guest from Scotland; Ms Clarke is a guest from Jamaica.</i></p>
<p><b>Shanice</b> [to Mr Dalrymple]: Good afternoon, sir, and welcome to the resort. May I have your reservation number, please?</p>
<p><b>Mr Dalrymple:</b> Aye, it's here somewhere. Sorry, lass, I'm a wee bit tired after the flight.</p>
<p><b>Shanice:</b> No problem at all, sir. Take your time. Your room will be ready shortly. In the meantime, would you like a complimentary drink in the lobby?</p>
<p><b>Mr Dalrymple:</b> That'd be grand, thank you.</p>
<p><b>Shanice</b> [turning to Marlon, lowering her voice]: Marlon, 412 ready yet? Housekeeping still dey? De man vex tired, boy.</p>
<p><b>Marlon:</b> Dem nearly done. Gimme two minutes. Wha' happen to you? You look like you ain' eat lunch.</p>
<p><b>Shanice:</b> Cha, I ain' had a chance. Is one set a check-ins since twelve o'clock.</p>
<p><b>Ms Clarke</b> [approaching the desk]: Hi, darlin'. Mi a check out today, but mi cyaan find mi key card. Mi did leave it inna di room mi tink.</p>
<p><b>Shanice</b> [smiling]: No worries, ma'am, it happens all the time. Mi wi— I mean, I'll just print you a receipt. You can leave the card in the room. Did you enjoy your stay?</p>
<p><b>Ms Clarke:</b> Yes, man! Di beach nice bad!</p>`,
        prompt: `<p>Write an essay, in NO MORE than 500 words, in which you</p>
<ul>
<li>identify, with examples from the excerpt, TWO language registers used by Shanice and explain why EACH is appropriate to its context</li>
<li>explain TWO possible reasons for Shanice's code-switching in the excerpt</li>
<li>identify, with examples, ONE feature that shows dialectal variation among the speakers in the excerpt.</li>
</ul>
<p style="text-align:right"><b>[25 marks]</b></p>`,
        min: 300, max: 500,
        checklist: [
          `TWO registers named (formal/consultative and casual/intimate) with a quotation for each AND the context that makes each appropriate`,
          `TWO reasons for code-switching (e.g. addressee, role/relationship, privacy, accommodation, solidarity) each explained with evidence`,
          `ONE dialectal feature (lexical, grammatical or phonological) with examples from two different speakers, showing regional variation`,
          `Distinguish register (level of formality) from dialect/variety (who you are, where you are from)`
        ],
        rubric: rubric([`register`, `formal|consultative|casual|intimate|frozen`, `code.switch|switch`, `dialect|regional|variation|lexical|vocabulary|scottish|jamaican`, `because|reason|accommodat|solidarity|rapport|privacy|role`],
          `Two registers correctly named and linked to setting, relationship and purpose; two distinct, evidenced reasons for code-switching; a precise dialectal feature compared across speakers.`,
          `Confuses register with dialect; gives one reason twice; dialect feature illustrated with only one speaker or with no named feature.`),
        key: `<h4>MARKING KEY · Question 2 (Content 10 marks)</h4>
<p><b>• Identify TWO language registers used by Shanice, with examples, and explain why each is appropriate [4 marks]</b></p>
<p>Award 2 marks EACH for the identification of a register with a relevant example and an explanation of its appropriateness. [2 + 2 = 4 marks]<br>Award 1 mark for naming a register with an example but no explanation, OR for naming two registers without examples.</p>
<ul>
<li><b>Formal / consultative register</b> – "Good afternoon, sir, and welcome to the resort. May I have your reservation number, please?"; "Did you enjoy your stay?". Appropriate because she is speaking to guests in a professional service role; polite, complete Standard English reflects the resort's image and the social distance between staff and strangers.</li>
<li><b>Casual / intimate register</b> – "Marlon, 412 ready yet? ... De man vex tired, boy"; "Cha, I ain' had a chance." Appropriate because she is speaking privately to a peer and co-worker; informality signals familiarity and saves time during a busy shift.</li>
</ul>
<p><b>• Explain TWO possible reasons for Shanice's code-switching [4 marks]</b></p>
<p>Award 2 marks EACH for a reason with relevant explanation/evidence. [2 + 2 = 4 marks]<br>Award 1 mark for a reason stated without explanation.</p>
<ul>
<li><b>Change of addressee / audience</b> – she uses Standard English with guests and Creole with Marlon.</li>
<li><b>Role and relationship</b> – professional role with guests versus solidarity with a fellow Sint Maartener and colleague.</li>
<li><b>Privacy / exclusion</b> – lowering her voice and switching to Creole so that the tired guest does not fully understand her comment about him ("De man vex tired").</li>
<li><b>Accommodation / convergence</b> – her near-slip into Jamaican-type Creole ("Mi wi—") reflects an instinct to converge with Ms Clarke's variety before she corrects to the expected professional variety.</li>
<li><b>Emotional expression</b> – Creole conveys frustration and fatigue more naturally ("Cha, I ain' had a chance").</li>
<li><b>Workplace norms</b> – the resort expects Standard English for guest interaction.</li>
</ul>
<p><b>• Identify, with examples, ONE feature showing dialectal variation among the speakers [2 marks]</b></p>
<p>Award 2 marks for a correctly identified feature with relevant examples from at least two speakers. Award 1 mark for a feature with an example from only one speaker.</p>
<ul>
<li><b>Lexical variation</b> – Scottish English "aye", "lass", "wee", "grand"; Jamaican Creole "nice bad" (very nice); Sint Maarten English "vex tired" (extremely tired).</li>
<li><b>First-person pronoun</b> – Jamaican Creole "mi" ("mi cyaan find mi key card") versus Sint Maarten "I" ("I ain' had a chance").</li>
<li><b>Negation</b> – Sint Maarten "ain'" ("I ain' had a chance") versus Jamaican "cyaan" ("mi cyaan find").</li>
<li><b>Intensifiers</b> – "vex tired" (Sint Maarten), "nice bad" (Jamaica), "wee bit" (Scotland): each variety intensifies or softens differently.</li>
<li><b>Past marking</b> – Jamaican "did leave" versus Sint Maarten "ain' had".</li>
</ul>
` + OE,
        model: `<p>The hospitality industry, the backbone of Sint Maarten's economy, brings together speakers from across the world. In the excerpt, Shanice, a front-desk worker in Simpson Bay, moves smoothly between styles and varieties as she deals with a Scottish guest, a Jamaican guest and a local co-worker. Her choices demonstrate how speakers adapt language to context. This essay will identify two registers she uses, explain two reasons for her code-switching, and examine one feature of dialectal variation among the speakers.</p>
<p>Firstly, Shanice uses a formal register with guests. She greets Mr Dalrymple with "Good afternoon, sir, and welcome to the resort. May I have your reservation number, please?" The polite titles, complete sentences and Standard English are appropriate because she is acting in a professional role with a stranger, and the resort's reputation depends on courteous service.</p>
<p>In contrast, she uses a casual register with her co-worker. She asks Marlon, "412 ready yet? Housekeeping still dey?" and complains, "Cha, I ain' had a chance." This informal style, with clipped questions and an exclamation, suits a private exchange between colleagues and peers who share a home variety. It also saves time during a busy shift.</p>
<p>One reason for Shanice's code-switching is a change of addressee and relationship. With guests she maintains professional distance in Standard English, but with Marlon she switches to Sint Maarten English to express solidarity and familiarity. Her language therefore marks who is "staff" and who is "customer".</p>
<p>A second reason is privacy. When she turns to Marlon, she lowers her voice and says, "De man vex tired, boy." By switching to Creole, she can comment on the guest's mood without him easily understanding, since a Scottish visitor is unlikely to be familiar with Sint Maarten English. Code-switching here functions as a way of excluding an outsider from the conversation.</p>
<p>Finally, the excerpt shows lexical variation among the speakers' dialects. Each speaker uses a distinctive intensifier: Mr Dalrymple says he is "a wee bit tired", a Scottish English expression; Shanice describes him as "vex tired", meaning extremely tired in Sint Maarten English; and Ms Clarke praises the beach as "nice bad", meaning very nice in Jamaican Creole. Although all three speak varieties of English, their vocabulary reflects their different regions of origin.</p>
<p>In conclusion, Shanice's shifts in register and code reveal a skilled communicator, while the guests' speech reminds us that English exists as many regional dialects.</p>`,
        teacherTip: `<p>Students frequently use "register" and "dialect" interchangeably. Use this excerpt to separate them: register = level of formality chosen for the situation (Shanice changes it); dialect = variety linked to region or group (each speaker brings their own). Point out Shanice's self-correction "Mi wi— I mean, I'll" as rich evidence of accommodation.</p>`
      },

      /* ---------------- Q3 Module 3 ---------------- */
      {
        type: 'write', module: '3', title: `Question 3 · Module 3`, genre: `Essay`,
        stimulus: `<p><b>SECTION C · MODULE 3 – SPEAKING AND WRITING</b></p>
<p>3. Read the scenario below carefully and then answer the question that follows.</p>
<p>You have recently been appointed as a shift supervisor at Harbourline Logistics, a cargo-handling company at the port in Providenciales. The company employs 60 workers across three shifts, ranging in age from 19 to 63. Some workers are recent migrants whose first language is Spanish or Haitian Creole.</p>
<p>Last month, a change in safety procedures for operating forklifts was posted only in a long English-language email sent at 11:00 p.m. Several workers did not read it, others misunderstood the technical terms, and two minor accidents followed. Workers now complain that "management never tells us anything", while managers complain that "staff don't read their messages". Your manager has asked you to recommend how communication can be improved.</p>`,
        prompt: `<p>In an essay of NO MORE than 300 words, discuss the plan of action that you will recommend to your manager by</p>
<ul>
<li>identifying and explaining TWO barriers to effective communication evident in the scenario</li>
<li>proposing ONE strategy to overcome EACH barrier you have identified</li>
<li>justifying ONE channel of communication that should be used for future safety announcements.</li>
</ul>
<p style="text-align:right"><b>[25 marks]</b></p>`,
        min: 200, max: 300,
        checklist: [
          `TWO barriers correctly named (e.g. language/semantic, jargon, inappropriate channel, poor timing, information overload, attitudinal/relationship) and explained with evidence from the scenario`,
          `ONE matching strategy for EACH barrier, practical and specific to this workplace`,
          `ONE channel named and justified for safety messages to this audience (e.g. face-to-face shift briefing with demonstration, WhatsApp voice notes in three languages)`,
          `Within 300 words; recommendation tone suitable for a manager`
        ],
        rubric: rubric([`barrier`, `language|semantic|jargon|technical|channel|timing|overload|attitud|psycholog`, `strateg|overcome|solution|translat|simplif|demonstrat|briefing`, `channel|face.to.face|briefing|meeting|whatsapp|notice board|poster|toolbox`],
          `Two distinct barriers precisely named and evidenced; each paired with a realistic strategy; a channel justified with reference to safety, language diversity and shift work.`,
          `Barriers described vaguely ("people did not understand"); strategies generic or unmatched; channel named without justification.`),
        key: `<h4>MARKING KEY · Question 3 (Content 10 marks)</h4>
<p><b>(a) Identify and explain TWO barriers to effective communication [4 marks]</b></p>
<p>Award 1 mark each for identification of TWO relevant barriers and 1 mark each for an explanation linked to the scenario. [2 + 2 = 4 marks]</p>
<ul>
<li><b>Language / semantic barrier</b> – the email was only in English; workers whose first language is Spanish or Haitian Creole could not fully understand it.</li>
<li><b>Technical jargon</b> – workers "misunderstood the technical terms".</li>
<li><b>Inappropriate channel / medium</b> – a long email is unsuitable for urgent safety instructions to shift workers who may not check email.</li>
<li><b>Poor timing</b> – sent at 11:00 p.m., when many workers were off duty or asleep.</li>
<li><b>Information overload / message length</b> – a "long" email discouraged reading.</li>
<li><b>Attitudinal / relationship barrier</b> – mutual blame ("management never tells us anything" / "staff don't read their messages") shows mistrust.</li>
<li><b>Lack of feedback</b> – one-way communication with no check for understanding.</li>
</ul>
<p><b>(b) Propose ONE strategy to overcome EACH barrier [4 marks]</b></p>
<p>Award 2 marks EACH for a relevant strategy clearly matched to a barrier and briefly explained. [2 + 2 = 4 marks]<br>Award 1 mark for a strategy that is relevant but not clearly matched or explained.</p>
<ul>
<li>Translate key messages into Spanish and Haitian Creole; use pictograms and simple language.</li>
<li>Replace jargon with plain language and demonstrate procedures physically.</li>
<li>Deliver safety changes in person at the start of every shift.</li>
<li>Send messages during working hours; give advance notice.</li>
<li>Summarise in short bullet points or one-page visuals.</li>
<li>Hold open forums / two-way meetings; appoint shift communication representatives to rebuild trust.</li>
<li>Require sign-off or a quick verbal check of understanding.</li>
</ul>
<p><b>(c) Justify ONE channel of communication [2 marks]</b></p>
<p>Award 1 mark for identification of an appropriate channel and 1 mark for an acceptable justification. [1 + 1 = 2 marks]</p>
<ul>
<li><b>Face-to-face shift briefing / toolbox talk</b> – reaches every worker at the start of each shift; allows demonstration and immediate questions; supports interpreters; confirms understanding.</li>
<li><b>WhatsApp group with voice notes and images</b> – familiar, immediate, multilingual, can be replayed.</li>
<li><b>Illustrated multilingual posters at forklift stations</b> – permanent reminder at the point of use.</li>
<li>Any other acceptable channel with a relevant justification.</li>
</ul>
` + OE,
        model: `<p>At a busy port, a misunderstood safety message can cost more than time. As the new shift supervisor at Harbourline Logistics, I recommend the following plan to repair our communication.</p>
<p>The first barrier is a language barrier. The forklift procedure was sent only in English and used technical terms, yet several workers speak Spanish or Haitian Creole as a first language. As a result, some read the message but misunderstood it, which contributed to two accidents. To overcome this, every safety notice should be written in plain language, translated into Spanish and Haitian Creole, and supported by simple pictures showing each step.</p>
<p>The second barrier is an inappropriate channel and timing. A long email sent at 11:00 p.m. is unsuitable for shift workers, many of whom were off duty or asleep and may not check email at all. To solve this, safety changes should be announced during working hours and summarised in no more than five bullet points, with a requirement that each worker sign to confirm that they have understood.</p>
<p>For future safety announcements, I recommend face-to-face briefings at the start of every shift. A ten-minute "toolbox talk" reaches all workers on all three shifts, allows the supervisor to demonstrate procedures on the actual forklift, and lets workers ask questions immediately, with a bilingual colleague interpreting where needed. This two-way channel also helps rebuild trust, since workers will no longer feel that "management never tells us anything".</p>
<p>By removing these barriers and choosing a personal, interactive channel, Harbourline can keep its workers both informed and safe.</p>`,
        teacherTip: `<p>Insist that each strategy is MATCHED to its barrier: the best answers use a "barrier ... therefore ..." pattern. Students should quote the scenario (11:00 p.m., "long", "technical terms") as evidence, exactly as they would quote an extract in Question 1.</p>`
      }
    ]
  });
})();
