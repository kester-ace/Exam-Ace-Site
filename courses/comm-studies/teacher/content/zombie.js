window.COURSE_ZOMBIE = {
  title: `Rebuilding After the Apocalypse`,

  story: `<p><b>The zombie apocalypse is over.</b> The last of the infected have gone quiet, and survivors are stepping out into a world that has stopped working. Communication systems have collapsed, institutions have disappeared, reliable information is difficult to find, and survivors with different backgrounds, experiences and areas of expertise must work together to rebuild society.</p>
<p>A settlement is being established on the hill above New Calabash Bay, a harbour town on the island of Sol Marée. You and your classmates have been selected as part of the <b>Rebuilding Council</b>. Every survivor must demonstrate knowledge or expertise that could help rebuild society, and every member of the Council must be able to explain that knowledge so others can use it.</p>
<p>Over five days you will plan, investigate, write, review, combine and present. Each day unlocks new challenges. Complete them to earn <b>XP</b> in your skill tracks, collect <b>supply coins</b> and win the day's <b>badge</b>. At the end of the week, your work becomes a chapter in the class <b>Post-Zombie Apocalypse Survival &amp; Rebuilding Manual</b>.</p>
<p><i>Remember: the apocalypse gives us the context, but your writing must stay expository, not narrative. The Council needs explanations, not adventure stories.</i></p>`,

  question: `What knowledge or expertise can I contribute to help rebuild society, and how can I communicate that knowledge effectively to others?`,

  outcomes: [
    `Identify the elements of the communication process and analyse audience, purpose and context.`,
    `Recognise barriers to effective communication.`,
    `Distinguish among misinformation, disinformation, propaganda, fake news, conspiracy theories, deepfakes, gaslighting and the “big lie.”`,
    `Evaluate the credibility and reliability of information.`,
    `Explain how attitudes, personal experiences, education and socialisation influence responses to messages and language.`,
    `Apply appropriate verbal and non-verbal communicative behaviours.`,
    `Apply the five methods of exposition — division and classification, cause and effect, definition, comparison and contrast, and process — to organise expository writing.`,
    `Research, organise and present information in an expository essay.`,
    `Evaluate and revise thesis statements and expository drafts using structured self-revision and peer-review criteria.`,
    `Edit written work for conciseness, eliminating redundant pairs and stock phrases.`,
    `Critically evaluate peers’ writing and synthesise information from multiple texts.`,
    `Adapt written communication for oral presentation and deliver a five-minute expository speech.`,
    `Transform expository information into a practical survival and rebuilding guide.`
  ],

  skills: [
    { id:`audience`, name:`Audience & Purpose`, icon:`🎯`, desc:`Map the communication process and shape a message for a specific audience, purpose and context.` },
    { id:`credibility`, name:`Credibility Radar`, icon:`📡`, desc:`Ask who created a source, why, and what evidence supports it — then confirm it elsewhere.` },
    { id:`misinfo`, name:`Misinformation Defence`, icon:`🛡️`, desc:`Tell misinformation, disinformation, propaganda, fake news, conspiracy theories, deepfakes, gaslighting and the big lie apart.` },
    { id:`exposition`, name:`Exposition Methods`, icon:`🧱`, desc:`Organise explanations using division and classification, cause and effect, definition, comparison and contrast, and process.` },
    { id:`thesis`, name:`Thesis Craft`, icon:`🧭`, desc:`Write and evaluate thesis statements that give a clear controlling idea and roadmap.` },
    { id:`concise`, name:`Concise Editing`, icon:`✂️`, desc:`Cut redundant pairs and stock phrases so the Council's time is never wasted.` },
    { id:`synthesis`, name:`Peer Review & Synthesis`, icon:`🧩`, desc:`Evaluate peers' writing fairly and stitch the strongest parts into one cohesive text.` },
    { id:`oral`, name:`Oral Delivery`, icon:`🎤`, desc:`Adapt writing for listeners and use verbal and non-verbal behaviours that build trust.` }
  ],

  days: [
    /* ========================= DAY 1 ========================= */
    {
      id: `d1`,
      title: `Day 1 – You Survived. What Can You Contribute?`,
      focus: `Communication Process, Audience, Purpose, Context, and Pre-Writing`,
      briefing: `<p>The gates of the new settlement open at sunrise. A clipboard is passed down the line of survivors: <b>“State your area of knowledge or expertise, and the problem it could solve.”</b></p>
<p>The Council does not have the luxury of rushed, unplanned work. Before anyone is assigned a role, you must reflect on how you write, identify what you can contribute, map how you will communicate it, and help bring order to the scattered list of needs survivors keep shouting about.</p>`,
      learn: `<h3>1. Before You Write (Pre-Writing Check)</h3>
<p>Before the outbreak, writing tasks could be put off. The Council does not have that luxury. Answer honestly:</p>
<ol>
<li>Have you ever sat down to a writing task and begun to write immediately, straight through to the end, without planning first?</li>
<li>Looking back at pieces you wrote that way, were you satisfied they were interesting, accurate and clear to the reader?</li>
<li>What do you normally do before you begin to write? What pre-writing strategy will you commit to using this week, when the Council is depending on your report?</li>
</ol>
<p>Pre-writing strategies include brainstorming, listing, clustering (grouping related ideas), freewriting, asking questions (who, what, why, how) and outlining.</p>

<h3>2. Individual Challenge</h3>
<p><b>What area of knowledge, interest, skill or expertise do you possess that could help people survive or rebuild society after a zombie apocalypse?</b></p>
<p>Identify: your <b>area of expertise</b>, the <b>problem</b> it could solve, the <b>intended audience</b>, your <b>purpose</b>, your <b>message</b>, the most appropriate <b>communication channel</b> and the <b>possible feedback</b>.</p>

<h3>3. The Communication Process</h3>
<p><b>Sender → Message → Channel/Medium → Receiver → Feedback</b></p>
<p>Also consider <b>Context → Code → Possible Barriers</b>.</p>
<table>
<tr><th>Element</th><th>Meaning</th><th>Settlement example</th></tr>
<tr><td>Sender</td><td>The person who creates and sends the message</td><td>A survivor who knows first aid</td></tr>
<tr><td>Message</td><td>The information, idea or instruction</td><td>How to clean and cover a wound</td></tr>
<tr><td>Channel/Medium</td><td>How the message travels</td><td>A demonstration at the clinic tent; a poster at the gate; a radio announcement</td></tr>
<tr><td>Receiver</td><td>The audience who decodes the message</td><td>Night-watch volunteers</td></tr>
<tr><td>Feedback</td><td>The receiver's response</td><td>Questions, a nod, a correct practice bandage, or a confused face</td></tr>
<tr><td>Context</td><td>The situation, time, place and relationships</td><td>Exhausted survivors at dusk, after a long supply run</td></tr>
<tr><td>Code</td><td>The language and symbols used</td><td>Standard English, island Creole English, Spanish, Papiamentu, hand signals, diagrams</td></tr>
<tr><td>Barriers</td><td>Anything that blocks understanding</td><td>Noise from the generator, jargon, fear, distrust, language differences</td></tr>
</table>

<h3>4. Why Survivors Hear the Same Message Differently</h3>
<p>Education, culture, language, personal experience, socialisation, knowledge and attitudes all shape how a receiver interprets a message. A survivor who trained as a nurse may hear “keep the wound clean” as a precise procedure; a survivor raised on bush remedies may hear it as “wash it with whatever is around.” A person who was misled by officials during the outbreak may distrust any message that sounds official. Good communicators anticipate these differences.</p>

<h3>5. Expertise Cluster (Brainstorm &amp; Classify)</h3>
<p>The Council has gathered a scattered list of everything survivors keep mentioning. Before anyone can be assigned a role, the list needs order.</p>
<p><b>Word bank:</b> water · shelter · disease · food · security · morale · trade · education · law · medicine · communication · children · elderly · livestock · fuel · tools · sanitation · mental health · defence · agriculture · literacy · trade routes · leadership · grief · crime · currency · construction · navigation · first aid · radio · weapons · negotiation · scavenging · farming · childbirth</p>
<ol>
<li>In groups, sort the word bank into 3–5 clearly labelled categories (no overlap between categories).</li>
<li>Write one sentence explaining what each category contributes to rebuilding.</li>
<li>Keep this list — it will resurface on Day 3 as the basis for a classification exercise.</li>
</ol>

<h3>Exit Activity</h3>
<blockquote>“The most valuable thing I could contribute to rebuilding society is __________ because __________.”</blockquote>`,
      challenges: [
        {
          id: `d1-process`, title: `Signal Path`, skill: `audience`, xp: 10, kind: `order`,
          prompt: `The settlement's first aid volunteer wants to teach night-watch survivors how to clean a wound. Put the elements of the communication process in the correct order.`,
          items: [`Sender – the first aid volunteer`, `Message – how to clean and cover a wound`, `Channel/Medium – a live demonstration at the clinic tent`, `Receiver – the night-watch volunteers`, `Feedback – volunteers ask questions and practise a bandage`],
          why: `The communication process runs Sender → Message → Channel/Medium → Receiver → Feedback. Feedback closes the loop: it tells the sender whether the message was understood, so she can repeat, clarify or move on.`
        },
        {
          id: `d1-cluster`, title: `Expertise Cluster`, skill: `exposition`, xp: 15, kind: `sort`,
          prompt: `Here is one Council group's way of classifying part of the word bank. Sort each need into the category that fits it best. (Your own group may choose different labels — what matters is that the categories are clear and do not overlap.)`,
          bins: [`Health & Care`, `Food & Water`, `Safety & Order`, `Building & Equipment`, `Community & Knowledge`],
          items: [
            { t:`first aid`, bin:0 }, { t:`childbirth`, bin:0 }, { t:`mental health`, bin:0 },
            { t:`farming`, bin:1 }, { t:`livestock`, bin:1 }, { t:`sanitation`, bin:1 },
            { t:`defence`, bin:2 }, { t:`law`, bin:2 }, { t:`crime`, bin:2 },
            { t:`construction`, bin:3 }, { t:`tools`, bin:3 }, { t:`fuel`, bin:3 },
            { t:`education`, bin:4 }, { t:`literacy`, bin:4 }, { t:`negotiation`, bin:4 }
          ],
          why: `Good classification uses one consistent principle (here: the kind of need each item meets) and keeps categories distinct. Sanitation could arguably sit under Health &amp; Care — if you move it, make sure it does not appear in two places. Keep this cluster: on Day 3 it becomes the basis for a division and classification essay.`
        },
        {
          id: `d1-influence`, title: `Same Message, Different Ears`, skill: `audience`, xp: 15, kind: `choice`,
          prompt: `The Council posts a notice: <i>“All residents must report to the clinic for registration.”</i> An older survivor who was misled by officials during the outbreak refuses to go and tells others it is a trap. Which factor best explains her response?`,
          options: [
            `Her personal experience and attitude toward authority have shaped how she interprets official messages.`,
            `The channel was wrong, because notices can never reach older people.`,
            `She lacks the literacy needed to read the notice.`,
            `The message contained too much technical jargon.`
          ],
          answer: 0,
          why: `Nothing suggests she could not read the notice or that it was full of jargon. Her past experience of being misled has created a negative attitude (distrust) toward official messages, so she decodes a neutral instruction as a threat. Senders must anticipate how experience, education, culture, socialisation and attitudes affect interpretation — for example, by explaining why registration matters and who is running it.`
        },
        {
          id: `d1-barrier`, title: `Spot the Barrier`, skill: `audience`, xp: 10, kind: `choice`,
          prompt: `A survivor gives safety instructions over the generator's roar, using medical terms like “haemorrhage” and “tourniquet,” to a group that includes Spanish- and Haitian Creole-speaking newcomers. Which set of barriers is present?`,
          options: [
            `Physical noise, jargon (semantic barrier) and language differences`,
            `Only a psychological barrier`,
            `No barriers, because the information is accurate`,
            `Only a problem with feedback`
          ],
          answer: 0,
          why: `Accurate information can still fail to arrive. The generator creates physical noise, medical jargon is a semantic barrier, and some listeners do not share the code (language). A better sender would move away from the noise, use plain words or demonstrate, and ask a bilingual survivor to help.`
        },
        {
          id: `d1-write`, type: `write`, kind: `write`, skill: `audience`, xp: 30,
          title: `My Contribution to the Council`,
          genre: `Pre-writing reflection and expertise statement`,
          prompt: `<p>The Council needs to know what you can contribute. Write a short piece in <b>three parts</b>:</p>
<ol>
<li><b>Before You Write:</b> answer the three pre-writing questions honestly, and name the pre-writing strategy you will commit to this week.</li>
<li><b>Expertise statement:</b> identify your area of knowledge, interest, skill or expertise; the problem it could solve; your intended audience; your purpose; your message; the most appropriate channel; and the feedback you expect. Use the communication process (sender, message, channel/medium, receiver, feedback) and mention context, code and at least one possible barrier. Say how education, culture, language, experience, socialisation or attitudes might affect how survivors receive your message.</li>
<li><b>Exit statement:</b> complete — “The most valuable thing I could contribute to rebuilding society is ______ because ______.”</li>
</ol>`,
          min: 150, max: 400,
          frame: `<p><b>Before You Write:</b> When I get a writing task, I usually… Looking back, my writing was… This week I will commit to (brainstorming / clustering / outlining) because…</p>
<p><b>Expertise statement:</b> My area of expertise is… The problem it could solve is… As the sender, my message is… My intended audience (receivers) is… My purpose is to (inform / explain / instruct / warn)… The best channel is… because… In this context… The code I will use is… A possible barrier is… I expect feedback such as… Survivors' (education / culture / experience) may affect how they receive this because…</p>
<p><b>Exit statement:</b> The most valuable thing I could contribute to rebuilding society is… because…</p>`,
          checklist: [
            `I answered all three pre-writing questions honestly and named a strategy.`,
            `I named my expertise and the specific problem it solves.`,
            `I used the communication process: sender, message, channel, receiver, feedback.`,
            `I considered context, code and at least one barrier.`,
            `I explained how at least one influence (education, culture, experience, socialisation, attitudes) affects interpretation.`,
            `I completed the exit statement with a clear reason.`
          ],
          rubric: [
            { criterion:`Pre-writing reflection`, marks:3,
              look:[`\\bI\\b`, `\\b(plan|planning|outline|brainstorm|cluster|list|mind ?map|freewrit)`],
              min:2,
              strong:`You reflected honestly on your writing habits and committed to a named strategy. Push further: say exactly when in the process you will use it (for example, “I will cluster my ideas before I write my thesis”).`,
              weak:`Your reflection needs a named pre-writing strategy. Try: “Instead of writing straight through, I will brainstorm a list and group it into clusters before I draft.”` },
            { criterion:`Communication process`, marks:6,
              look:[`\\bsender`, `\\bmessage`, `\\b(channel|medium)`, `\\b(receiver|audience)`, `\\bfeedback`, `\\bcontext`, `\\bcode\\b`, `\\bbarrier`],
              min:5,
              strong:`You have mapped the communication process clearly, including context, code and barriers. Next step: explain how you would overcome the barrier you named.`,
              weak:`Some elements of the communication process are missing. Name each one directly: “As the sender, my message is… my channel is… my receivers are… feedback will be… the context is… a barrier could be…”` },
            { criterion:`Expertise, problem, audience and purpose`, marks:3,
              look:[`\\bproblem`, `\\b(purpose|to inform|to explain|to instruct|to educate|to warn)`, `\\b(expertise|skill|knowledge)`],
              min:2,
              strong:`Your expertise is tied to a real problem, and your purpose is stated with a precise verb. Keep using verbs like explain, instruct and warn.`,
              weak:`Link your expertise to a specific problem and state your purpose with a precise verb: “My purpose is to instruct survivors on how to store rainwater safely.”` },
            { criterion:`Influences and exit statement`, marks:3,
              look:[`most valuable thing`, `\\bbecause\\b`, `\\b(education|culture|language|experience|socialis|socializ|attitude)`],
              min:2,
              strong:`You considered how survivors' backgrounds shape their response and justified your contribution. Strong reflective thinking.`,
              weak:`Complete the exit statement with “because…”, and add one sentence on how education, culture, experience or attitudes might change how survivors hear your message.` }
          ],
          model: `<p><b>Before You Write</b></p>
<p>Yes, I have often started an essay the night before and written straight through to the end. Looking back, those pieces were not always clear: my points repeated themselves and my conclusion said something new. Usually I only read the question before I start. This week I will commit to <b>clustering</b> my ideas and turning the clusters into a short outline before I draft, because the Council cannot afford a report that wanders.</p>
<p><b>Expertise statement</b></p>
<p>My area of expertise is <b>growing food</b>. I spent years helping my grandmother in her backyard garden, where we grew sweet potato, pigeon peas and callaloo. The problem this solves is that the settlement has been surviving on scavenged tins, and those will run out. As the <b>sender</b>, my <b>message</b> is that a small, well-planned garden can feed families within a few months. My <b>receivers</b> are survivors who have never farmed, and my <b>purpose</b> is to instruct them on how to start. The best <b>channel</b> is a hands-on demonstration in the garden plot, supported by a simple poster at the gate, because many survivors learn better by doing. The <b>context</b> is tense: people are hungry and impatient. My <b>code</b> will be plain English, with a Spanish-speaking volunteer translating. A possible <b>barrier</b> is distrust, since some survivors believe the soil is contaminated. I expect <b>feedback</b> such as questions about which crops grow fastest. Survivors raised in the city may have no experience of farming, so I must avoid assuming they know terms like “mulch.”</p>
<p><b>Exit statement</b></p>
<p>The most valuable thing I could contribute to rebuilding society is the ability to grow food because a settlement that can feed itself no longer depends on luck and scavenging.</p>`,
          teacherTip: `<p>Planning is not optional — it is where clear writing begins. Name every element of the communication process directly, and state your purpose with a precise verb (inform, explain, instruct, warn). Remember the Council may include survivors whose education, culture and experiences differ from yours. Note in your reflective journal which pre-writing strategy you chose and whether it helped.</p>`
        }
      ],
      reward: 40,
      badge: `Council Recruit`
    },

    /* ========================= DAY 2 ========================= */
    {
      id: `d2`,
      title: `Day 2 – Can We Trust the Information?`,
      focus: `Communication Barriers, Credibility, Misinformation and Manipulation, and Audience`,
      briefing: `<p>Civilisation has collapsed, and so has the information system. Voice notes crackle over salvaged walkie-talkies, hand-written notices appear on the gate overnight, and everyone seems to have heard something from “a reliable person.”</p>
<p>Some of these claims contradict each other. Acting on the wrong one could waste supplies, split the settlement or put lives at risk. Today the Council decides what should be believed — and you start researching your own area of expertise.</p>`,
      learn: `<h3>1. Communication Barriers</h3>
<p>A barrier is anything that blocks or distorts a message. Remember from Day 1: physical noise, jargon, language differences, fear, distrust, information overload, and differences in education, culture and experience. In a collapsed society, a new barrier dominates: <b>we no longer know which sources to trust</b>.</p>

<h3>2. Information Problems</h3>
<table>
<tr><th>Term</th><th>What it is</th></tr>
<tr><td><b>Misinformation</b></td><td>False or inaccurate information shared <i>without</i> the intention to deceive. The sender believes it.</td></tr>
<tr><td><b>Disinformation</b></td><td>False information created or shared <i>deliberately</i> to deceive.</td></tr>
<tr><td><b>Propaganda</b></td><td>Biased or one-sided information spread systematically to promote a cause, leader or point of view, often by appealing to emotion.</td></tr>
<tr><td><b>Fake news</b></td><td>Fabricated stories presented in the format of genuine news reports.</td></tr>
<tr><td><b>Conspiracy theory</b></td><td>An explanation claiming that events are secretly controlled by a powerful group, usually without evidence and resistant to evidence against it.</td></tr>
<tr><td><b>Deepfake</b></td><td>Audio, video or images digitally manipulated (often with AI) to show a real person saying or doing something they never did.</td></tr>
<tr><td><b>Gaslighting</b></td><td>Manipulation that makes a person doubt their own memory, perception or judgement.</td></tr>
<tr><td><b>The “big lie”</b></td><td>A falsehood so enormous, and repeated so often, that people believe it partly because they cannot imagine anyone inventing something so bold.</td></tr>
</table>

<h3>3. Analysing a Claim</h3>
<p>For each claim the Council receives, identify:</p>
<ul>
<li>the <b>sender</b>, the <b>intended audience</b>, the <b>purpose</b> and the <b>channel</b></li>
<li>the possible <b>information problem</b> (misinformation, disinformation, propaganda, and so on)</li>
<li>the <b>evidence required</b> and the <b>verification methods</b></li>
<li>the <b>consequences of acting on inaccurate information</b></li>
</ul>

<h3>4. Who's Listening? (Audience Identification)</h3>
<p>Read each opening line below. Without being told, decide who the intended audience is and how you know — what word choices, assumptions or tone gave it away?</p>
<ol>
<li>“Most settlement leaders underestimate how quickly a clean water supply runs out.”</li>
<li>“The scarcity of working radios is in direct correlation to the rising anxiety of every watch-shift leader after dark.”</li>
<li>“One should note, however, that scavenging beyond the wall calls for resourcefulness, patience, the ability to adapt easily, and no small amount of courage.”</li>
</ol>

<h3>5. Research Your Expertise: Five Credibility Questions</h3>
<p>Begin researching your individual area of expertise. For every source, ask:</p>
<ol>
<li><b>Who created this?</b></li>
<li><b>Why?</b></li>
<li><b>What evidence supports it?</b></li>
<li><b>Is the source credible?</b></li>
<li><b>Can the information be confirmed elsewhere?</b></li>
</ol>
<p><i>Teacher's tip: a source that makes you feel panicked or furious and asks you to “share before they delete it” deserves extra checking, not faster sharing.</i></p>`,
      challenges: [
        {
          id: `d2-terms1`, title: `Rumour Lab: Part 1`, skill: `misinfo`, xp: 15, kind: `sort`,
          prompt: `Sort each settlement scenario into the information problem it shows.`,
          bins: [`Misinformation`, `Disinformation`, `Propaganda`, `Deepfake`],
          items: [
            { t:`A worried mother passes on a rumour that the clinic has run out of bandages. She genuinely believes it, but it is not true.`, bin:0 },
            { t:`A boy repeats an old remedy he believes cures fever, not knowing it has no effect.`, bin:0 },
            { t:`A trader knowingly spreads a false story that the river is poisoned so survivors will buy his bottled water.`, bin:1 },
            { t:`A rival group deliberately forges a Council notice to send scavengers to an empty warehouse.`, bin:1 },
            { t:`Painted banners everywhere show one leader as the settlement's only saviour and his critics as traitors.`, bin:2 },
            { t:`A faction's daily broadcasts mention only its successes and blame every shortage on outsiders.`, bin:2 },
            { t:`A recovered phone plays a video of the Council chair announcing a curfew she never announced; her face and voice were digitally altered.`, bin:3 },
            { t:`An audio clip uses a computer-generated copy of the head medic's voice telling people to stop boiling water.`, bin:3 }
          ],
          why: `The key difference between misinformation and disinformation is <b>intention</b>: misinformation is shared in good faith, disinformation is meant to deceive. Propaganda is systematic, one-sided promotion of a cause or person. A deepfake is digitally manipulated audio or video of a real person.`
        },
        {
          id: `d2-terms2`, title: `Rumour Lab: Part 2`, skill: `misinfo`, xp: 15, kind: `sort`,
          prompt: `Sort each scenario into the information problem it shows.`,
          bins: [`Fake news`, `Conspiracy theory`, `Gaslighting`, `The big lie`],
          items: [
            { t:`A hand-written “Settlement Daily Bulletin,” laid out like a newspaper, reports a rescue ship that does not exist.`, bin:0 },
            { t:`A printed “news report” with a headline and invented quotes claims the north wall has already fallen.`, bin:0 },
            { t:`A survivor insists the outbreak was secretly planned by a hidden group of scientists, and treats every piece of contrary evidence as proof of the cover-up.`, bin:1 },
            { t:`A rumour claims the Council is secretly working with a powerful outside group to control the food supply; no evidence is offered.`, bin:1 },
            { t:`A supply officer keeps telling a guard, “You never logged those tins — you're confused again,” until the guard doubts his own clear memory.`, bin:2 },
            { t:`A leader repeatedly tells a volunteer she “imagined” the warning she gave last week, making her question her own judgement.`, bin:2 },
            { t:`A faction repeats, every day and everywhere, the enormous claim that no other settlement on the island survived, so people stop trying to make contact.`, bin:3 },
            { t:`A massive false claim — that the Council caused the entire outbreak — is repeated so boldly and so often that many accept it.`, bin:3 }
          ],
          why: `Fake news imitates the <b>format</b> of real news. A conspiracy theory blames a secret, powerful group and resists evidence. Gaslighting targets a person's confidence in their own memory or perception. The big lie works through sheer size and repetition.`
        },
        {
          id: `d2-listen1`, title: `Who's Listening? Line 1`, skill: `audience`, xp: 10, kind: `choice`,
          prompt: `<blockquote>“Most settlement leaders underestimate how quickly a clean water supply runs out.”</blockquote>Who is the most likely intended audience, and what gives it away?`,
          options: [
            `Settlement leaders and those who advise them — the sentence names them directly and assumes they manage the water supply.`,
            `Young children — the sentence uses very simple words.`,
            `Water engineers — the sentence uses technical measurements.`,
            `Scavengers outside the wall — the sentence describes the dangers of the outside world.`
          ],
          answer: 0,
          why: `The writer names the group (“settlement leaders”) and assumes their responsibility for planning the water supply. The tone is a gentle, direct warning aimed at people who make decisions. There are no technical measurements, so engineers are not the obvious audience.`
        },
        {
          id: `d2-listen2`, title: `Who's Listening? Line 3`, skill: `audience`, xp: 10, kind: `choice`,
          prompt: `<blockquote>“One should note, however, that scavenging beyond the wall calls for resourcefulness, patience, the ability to adapt easily, and no small amount of courage.”</blockquote>Which clue best reveals the audience?`,
          options: [
            `The impersonal, formal “one should note, however” suggests educated adult readers — possibly survivors considering scavenging duty — being addressed respectfully and objectively.`,
            `The word “wall” shows the audience is builders.`,
            `The list of qualities shows the audience is children learning new vocabulary.`,
            `There are no clues; audience can never be inferred from word choice.`
          ],
          answer: 0,
          why: `Formal, impersonal phrasing (“one should note”), the transition “however” (continuing a reasoned discussion) and the list of personal qualities point to mature readers weighing whether they are suited to scavenging. Audience can almost always be inferred from word choice, assumptions and tone. Try the same with Line 2: “in direct correlation” suggests an educated, analytical reader such as Council officials.`
        },
        {
          id: `d2-verify`, title: `Credibility Radar`, skill: `credibility`, xp: 10, kind: `order`,
          prompt: `Put the five credibility questions in the order the unit gives them for checking every source.`,
          items: [`Who created this?`, `Why?`, `What evidence supports it?`, `Is the source credible?`, `Can the information be confirmed elsewhere?`],
          why: `Start with the creator and their motive, then examine the evidence, judge credibility, and finally cross-check with independent sources. A claim that cannot be confirmed elsewhere should be treated with caution, however convincing it sounds.`
        },
        {
          id: `d2-write`, type: `write`, kind: `write`, skill: `credibility`, xp: 30,
          title: `Council Credibility Report`,
          genre: `Report`,
          prompt: `<p>Two conflicting claims about the upstream river have reached the Council (see the stimulus). Write a <b>report to the Rebuilding Council</b> that analyses <b>both</b> claims and recommends which should be believed.</p>
<p>For each claim, identify the sender, intended audience, purpose, channel, possible information problem, evidence required, verification methods and the consequences of acting on inaccurate information. Use report conventions: a To/From/Subject heading and clear sub-headings.</p>`,
          stimulus: `<p><b>Claim A</b> — a voice note forwarded across the walkie-talkie network, sender unknown:</p>
<blockquote>“Listen, listen! The river upstream is POISONED. My cousin's friend saw three people drink it and drop. The Council knows and they're hiding it so they can keep the clean water for themselves. Don't trust the Water Team. Pass this on before they shut the radios down!”</blockquote>
<p><b>Claim B</b> — a notice signed by the Water Team, posted at the main gate:</p>
<blockquote>“Water from the upstream river is safe to drink only after it has been brought to a rolling boil for at least one minute. Do not drink it straight from the river. Our team tested samples on Monday and Wednesday. Ask at the Water Tent for a demonstration. — Water Team, Rebuilding Council”</blockquote>`,
          min: 180, max: 400,
          frame: `<p><b>To:</b> The Rebuilding Council &nbsp; <b>From:</b> … &nbsp; <b>Subject:</b> …</p>
<p><b>Introduction:</b> This report evaluates two conflicting claims about…</p>
<p><b>Claim A:</b> The sender is… The intended audience is… Its purpose appears to be… It travelled by… The possible information problem is… because… To verify it we would need evidence such as…</p>
<p><b>Claim B:</b> The sender is… The audience… purpose… channel… This claim is more/less credible because… It can be confirmed by…</p>
<p><b>Consequences:</b> If survivors act on inaccurate information…</p>
<p><b>Recommendation:</b> The Council should…</p>`,
          checklist: [
            `I used a report heading (To, From, Subject) and sub-headings.`,
            `I identified sender, audience, purpose and channel for both claims.`,
            `I named a possible information problem using the correct term.`,
            `I stated what evidence is required and how to verify it.`,
            `I explained the consequences of acting on inaccurate information.`,
            `I ended with a clear recommendation.`
          ],
          rubric: [
            { criterion:`Report format`, marks:2,
              look:[`\\bto:`, `\\bfrom:`, `\\bsubject:`, `\\brecommendation`],
              min:2,
              strong:`Clear report format — your reader can find each section quickly.`,
              weak:`Add a To/From/Subject heading and sub-headings such as “Claim A,” “Claim B” and “Recommendation.”` },
            { criterion:`Claim analysis (sender, audience, purpose, channel)`, marks:4,
              look:[`\\bsender`, `\\baudience`, `\\bpurpose`, `\\b(channel|medium|voice note|notice)`],
              min:3,
              strong:`You analysed each claim through the communication process. Next step: compare the two senders' motives directly.`,
              weak:`Analyse each claim explicitly: “The sender of Claim A is unknown; its intended audience is…; its purpose seems to be…; it travelled by…”` },
            { criterion:`Information problem identified`, marks:3,
              look:[`misinformation`, `disinformation`, `propaganda`, `fake news`, `conspiracy`, `deepfake`, `gaslighting`, `big lie`],
              min:1,
              strong:`You used precise terminology for the information problem. Make sure you justify it — for example, intention is what separates misinformation from disinformation.`,
              weak:`Name the information problem with the correct term. For example: “Claim A may be misinformation if the sender believes it, or disinformation if it was created to turn survivors against the Water Team. Its claim of a secret cover-up also resembles a conspiracy theory.”` },
            { criterion:`Evidence, verification and credibility`, marks:4,
              look:[`\\bevidence`, `\\b(verif|confirm|cross-check|check)`, `\\b(credib|reliab|trust)`],
              min:2,
              strong:`Strong evaluation: you show what evidence is needed and how to confirm it independently.`,
              weak:`Say what evidence would settle the matter and how to check it: “We could verify Claim B by watching the Water Team test a sample and confirming with the clinic whether anyone has fallen ill.”` },
            { criterion:`Consequences and recommendation`, marks:2,
              look:[`\\b(consequence|could lead|result in|as a result|if (survivors|people|we) act)`, `\\b(recommend|should|advise)`],
              min:2,
              strong:`You linked the consequences to a clear recommendation — exactly what a Council needs.`,
              weak:`Explain what could happen if people act on a false claim, then recommend an action: “The Council should…”` }
          ],
          model: `<p><b>To:</b> The Rebuilding Council<br><b>From:</b> Information Committee member<br><b>Subject:</b> Conflicting claims about the upstream river</p>
<p><b>Introduction</b><br>This report evaluates two conflicting claims about the safety of the upstream river and recommends which the settlement should trust.</p>
<p><b>Claim A: the voice note</b><br>The sender is unknown, and the information is third-hand (“my cousin's friend”). The intended audience is every survivor on the walkie-talkie network. Its purpose appears to be to alarm listeners and turn them against the Water Team. The channel, a forwarded voice note, allows the message to spread quickly without anyone checking it. The possible information problem is misinformation if the sender believes it, or disinformation if it was created deliberately; its claim of a secret plot by the Council also resembles a conspiracy theory. The urgent “pass this on before they shut the radios down” is a warning sign: it discourages verification. To believe it we would need evidence such as named witnesses and confirmation from the clinic that anyone fell ill.</p>
<p><b>Claim B: the Water Team notice</b><br>The sender is named and accountable. The audience is all residents, and the purpose is to instruct them on safe use of the river. The channel is a signed notice at the gate. It is more credible because it gives specific evidence (tests on two named days), qualifies its claim (safe only after boiling) and invites checking through a demonstration. Its advice can be confirmed by observing a test and asking survivors with medical training.</p>
<p><b>Consequences</b><br>If survivors act on Claim A, they may abandon the settlement's main water source, waste stored water and lose trust in the Council. If they ignore the boiling instruction in Claim B, they risk illness.</p>
<p><b>Recommendation</b><br>The Council should endorse Claim B, ask the Water Team to hold a public demonstration, and broadcast a calm correction of Claim A on the same walkie-talkie network where it spread.</p>`,
          teacherTip: `<p>Credibility is about evidence, not volume or urgency. Use the exact terms — misinformation and disinformation differ by <b>intention</b>. Always work through the five credibility questions in order, and finish a report with a recommendation the Council can act on.</p>`
        }
      ],
      reward: 45,
      badge: `Truth Keeper`
    },

    /* ========================= DAY 3 ========================= */
    {
      id: `d3`,
      title: `Day 3 – The Architecture of Expertise`,
      focus: `The Five Methods of Exposition, and Essay Drafting (may extend to two periods)`,
      briefing: `<p>The Council has a library tent now — three shelves of salvaged books and a growing pile of survivors' notes. But notes do not rebuild anything unless they are organised.</p>
<p>An expository essay is only as strong as the method used to organise it. Before drafting, survivors-turned-writers must choose the method that best explains their expertise. Work through all five methods, check your thesis, edit a field report, then draft.</p>`,
      learn: `<h3>Quick Reference: Methods of Exposition</h3>
<table>
<tr><th>Method</th><th>What it does</th><th>Apocalypse example</th><th>Signal words</th></tr>
<tr><td><b>Division &amp; Classification</b></td><td>Separates a subject into subunits, or groups it by shared principles</td><td>Sorting settlement supplies into categories: medical, food, tools, defence</td><td>types of, kinds of, categories, groups, first category, another type</td></tr>
<tr><td><b>Cause and Effect</b></td><td>Explains why something happened, or what resulted from it</td><td>Why the water supply failed; what followed from the loss of law enforcement</td><td>because, since, due to, as a result, consequently, therefore, led to</td></tr>
<tr><td><b>Definition</b></td><td>Clarifies the meaning of an abstract or contested term</td><td>What actually counts as a “safe zone” or a “reliable source”</td><td>is defined as, means, refers to, is not, for example</td></tr>
<tr><td><b>Comparison &amp; Contrast</b></td><td>Analyses two subjects that share enough in common to be weighed together</td><td>Two settlement models: fortified compound vs. mobile convoy</td><td>similarly, likewise, both, whereas, however, in contrast, unlike</td></tr>
<tr><td><b>Process</b></td><td>Explains how to do something, or how something works</td><td>How a distress signal travels from sender to rescuer</td><td>first, next, then, after, once, finally</td></tr>
</table>

<h3>1. Division &amp; Classification — Sorting the Survivors</h3>
<p>Which of these would best be organised using division or classification? Justify one answer: the settlement's tool-shed inventory · how to purify river water · the qualities of the ideal Council leader · techniques for moving silently at night · notable rebuilders in the settlement's history · the pros and cons of staying versus relocating.</p>
<p><b>Group work:</b> return to Day 1's Expertise Cluster, or classify one of Weapons, Livestock, Medicine, Vehicles, Survivors. Choose distinct, non-overlapping categories (3–5 works best) and draft a thesis statement that names the categories — this typically maps directly onto body paragraphs.</p>

<h3>2. Cause and Effect — Why Did It Collapse?</h3>
<p>In groups, choose one topic — The Outbreak, The Food Shortage, The Loss of Clean Water, The Breakdown of Law — and identify THREE main causes and THREE main effects. <b>Qualify your claims</b> (“the most significant cause…”) rather than claiming to cover every cause.</p>
<p><b>Worked model:</b> <i>Discuss the impact of the communication blackout on the settlement.</i></p>
<blockquote><p>Within the first week of the outbreak, every radio tower in the region fell silent. The most immediate cause was physical: technicians could no longer reach the towers to maintain them, and fuel for backup generators ran out within days. A second, less obvious cause was human — the very people who understood the equipment were among the first to be reassigned to defence duty, leaving no one to keep the signal alive.</p>
<p>The effects rippled outward quickly. Settlements that had once coordinated supply runs began operating in isolation, unaware whether neighbouring groups had survived at all. Rumours filled the silence where verified information once travelled, and without a shared channel, contradictory instructions from different self-appointed leaders caused confusion during the first mass evacuation. The most lasting effect, however, was psychological: communities that could not confirm the fate of family members elsewhere began to grieve for people who, in some cases, were still alive.</p></blockquote>
<p>Notice how the model qualifies (“the most immediate cause,” “a second, less obvious cause,” “the most lasting effect”) and separates causes from effects.</p>

<h3>3. Definition — What Do We Even Mean By…?</h3>
<p>Use the formula <b>Term → Class → Differentiation</b> to write a formal defining statement, then extend it using example, cause and effect, or definition by negation (saying what the term is <i>not</i>). Avoid circular definitions — use synonyms, not the term itself.</p>
<p><b>Model:</b> “A safe zone [term] is an area [class] that is enclosed and actively defended against outside threats [differentiation].”</p>
<p>Define, using the same formula: Expert · Reliable Source · Survivor · Rebuilding · Misinformation.</p>

<h3>4. Comparison &amp; Contrast — Two Paths Forward</h3>
<p>Choose one pair and decide whether to organise <b>point-by-point</b> (alternating between both subjects for each point) or <b>block</b> (all points on A, then all points on B, in matching order): two methods of purifying water · fortified compound vs. mobile convoy · pre-apocalypse vs. post-apocalypse communication systems · two leadership styles observed within the settlement · farming versus foraging as a food strategy.</p>
<p>Remember: if asked only to <b>compare</b>, focus on similarities; if asked only to <b>contrast</b>, focus on differences.</p>

<h3>5. Process — How It's Done</h3>
<p>Is each topic <b>directional</b> (how to do it) or <b>informational</b> (how it works/happens)? How to purify river water · how a distress signal travels from sender to rescuer · what to do if someone is bitten · how rumours spread through a settlement · how to build a defensible perimeter.</p>
<p>Choose one and write a short process paragraph in strict chronological order. Define unfamiliar terms, explain why key steps matter, and flag any step survivors commonly get wrong.</p>

<h3>Choose Your Method and Draft</h3>
<p><b>Central essay question:</b> How can my area of expertise help people survive and rebuild society after a zombie apocalypse?</p>
<p>The apocalypse provides the context, but the essay must remain <b>expository, not narrative</b>. Decide which method (or combination) organises your expertise most clearly, then draft:</p>
<ul>
<li><b>Introduction:</b> Hook/context → topic → thesis/controlling idea.</li>
<li><b>Body:</b> Point → Explanation → Evidence/Example → Link.</li>
<li><b>Conclusion:</b> Synthesis of major ideas → significance to rebuilding society.</li>
</ul>

<h3>Thesis Check</h3>
<p>Before drafting further, evaluate these sample thesis statements. What, if anything, needs revising?</p>
<ol>
<li>“The collapse of the water supply was caused by both the loss of technicians and the failure of backup generators, and it changed how every settlement in the region organised itself.”</li>
<li>“This essay is about medicine and why it is important after the apocalypse.”</li>
<li>“Although scavenging appears reckless, it follows three identifiable stages: assessment, entry, and retreat.”</li>
</ol>

<h3>Field Report Editing</h3>
<p>Before submitting a report to the Council, cut what wastes the reader's time. A <b>redundant pair</b> says the same thing twice (“past history,” “begin to start,” “completely collapse”). A <b>stock phrase</b> is a wordy, ready-made expression that can be replaced by one word (“due to the fact that” → because; “in the event that” → if).</p>
<p><i>Writing reminder: clear Standard English is more important than unnecessarily complicated vocabulary. Draft in class so formative feedback can be given while you write.</i></p>`,
      challenges: [
        {
          id: `d3-methods`, title: `Blueprint Sort`, skill: `exposition`, xp: 20, kind: `sort`,
          prompt: `Each sentence comes from a survivor's draft. Sort it into the method of exposition it uses. Watch the signal words.`,
          bins: [`Division & Classification`, `Cause and Effect`, `Definition`, `Comparison & Contrast`, `Process`],
          items: [
            { t:`Settlement supplies fall into four categories: medical, food, tools and defence.`, bin:0 },
            { t:`There are three types of survivors who volunteer for night watch.`, bin:0 },
            { t:`Because fuel for the backup generators ran out, the radio towers fell silent.`, bin:1 },
            { t:`As a result of the food shortage, families began hoarding and trust broke down.`, bin:1 },
            { t:`A reliable source is a provider of information that is accountable, evidence-based and confirmed by others.`, bin:2 },
            { t:`An expert is not simply someone who sounds confident; an expert has tested knowledge and experience.`, bin:2 },
            { t:`Whereas the fortified compound protects residents in one place, the mobile convoy avoids danger by moving.`, bin:3 },
            { t:`Similarly to farming, foraging depends on knowing the seasons; unlike farming, however, it needs no cleared land.`, bin:3 },
            { t:`First, collect the water; next, let the sediment settle; then bring it to a rolling boil for at least one minute.`, bin:4 },
            { t:`Once the signal leaves the transmitter, it travels to a relay point before it finally reaches the rescuer.`, bin:4 }
          ],
          why: `Signal words reveal the method: <i>categories, types</i> (classification); <i>because, as a result</i> (cause and effect); <i>is, is not</i> with a class and differentiation (definition); <i>whereas, similarly, unlike</i> (comparison and contrast); <i>first, next, then, once, finally</i> (process).`
        },
        {
          id: `d3-classify`, title: `Sorting the Survivors`, skill: `exposition`, xp: 10, kind: `choice`,
          prompt: `Which of these topics would be <b>best</b> organised using division and classification?`,
          options: [
            `The settlement's tool-shed inventory`,
            `How to purify river water`,
            `Techniques for moving silently at night, step by step`,
            `The pros and cons of staying versus relocating`
          ],
          answer: 0,
          why: `An inventory is a collection of items that can be grouped by a shared principle (cutting tools, digging tools, repair tools, and so on). Purifying water is a process; the pros and cons of staying versus relocating is comparison and contrast. Others on the list, such as the qualities of the ideal Council leader, could also be divided into categories — but justify your choice, as the unit asks.`
        },
        {
          id: `d3-process`, title: `Directional or Informational?`, skill: `exposition`, xp: 15, kind: `sort`,
          prompt: `Decide whether each process topic is directional (how to do it) or informational (how it works or happens).`,
          bins: [`Directional (how to do it)`, `Informational (how it works/happens)`],
          items: [
            { t:`How to purify river water`, bin:0 },
            { t:`How a distress signal travels from sender to rescuer`, bin:1 },
            { t:`What to do if someone is bitten`, bin:0 },
            { t:`How rumours spread through a settlement`, bin:1 },
            { t:`How to build a defensible perimeter`, bin:0 }
          ],
          why: `Directional processes instruct the reader to act (often using commands: “collect,” “boil,” “dig”). Informational processes explain how something happens that the reader does not perform, such as a signal travelling or a rumour spreading. Both must be in strict chronological order.`
        },
        {
          id: `d3-thesis`, title: `Thesis Check`, skill: `thesis`, xp: 15, kind: `choice`,
          prompt: `Which sample thesis <b>most</b> needs revising, and why?`,
          options: [
            `“This essay is about medicine and why it is important after the apocalypse.” — it announces a topic but gives no controlling idea or roadmap.`,
            `“Although scavenging appears reckless, it follows three identifiable stages: assessment, entry, and retreat.” — it is too specific.`,
            `“The collapse of the water supply was caused by both the loss of technicians and the failure of backup generators, and it changed how every settlement in the region organised itself.” — it names causes, so it cannot be a thesis.`,
            `None of them needs revising.`
          ],
          answer: 0,
          why: `“This essay is about…” is an announcement, not a thesis: it names a vague topic and says nothing specific about <i>why</i> medicine matters or how the essay is organised. A stronger version: “Medical knowledge can help a settlement rebuild in three ways: preventing infection, treating injuries and protecting mothers and newborns.” Thesis 3 is strong: it concedes a view, names a process and gives a roadmap. Thesis 1 is workable (cause and effect) but could be tightened — “every settlement” is a big claim that needs qualifying.`
        },
        {
          id: `d3-field`, title: `Field Report Editing`, skill: `concise`, xp: 20, kind: `fix`,
          prompt: `Before this field report reaches the Council, cut the redundant pairs and wordy stock phrases. Rewrite it concisely without losing meaning.`,
          text: `In the event that the wall is breached, the entire perimeter will completely collapse before we can begin to start rebuilding. Due to the fact that the well ran dry, past history suggests we will always be responsible for finding a new source. Under the circumstances in which the radio should be working, it is usually still completely silent.`,
          model: `If the wall is breached, the perimeter will collapse before we can start rebuilding. Because the well ran dry, history suggests we must find a new source. When the radio should be working, it is usually silent.`,
          banned: [`in the event that`, `completely`, `begin to start`, `due to the fact that`, `past history`, `under the circumstances in which`],
          why: `“In the event that” → if; “due to the fact that” → because; “under the circumstances in which” → when. “Completely collapse,” “begin to start” and “past history” are redundant pairs: collapse is already complete, beginning and starting mean the same thing, and all history is past. “Will always be responsible for finding” is also wordy — “must find” is clearer.`
        },
        {
          id: `d3-write`, type: `write`, kind: `write`, skill: `exposition`, xp: 30,
          title: `The Expert's Essay`,
          genre: `Expository essay`,
          prompt: `<p><b>Central essay question:</b> How can my area of expertise help people survive and rebuild society after a zombie apocalypse?</p>
<p>Write an expository essay (or a substantial draft: introduction, at least two body paragraphs and a conclusion) addressed to the Rebuilding Council. Choose <b>one method of exposition</b> (or a clear combination) — division and classification, cause and effect, definition, comparison and contrast, or process — and make your thesis reflect it.</p>
<ul>
<li><b>Introduction:</b> hook/context → topic → thesis/controlling idea.</li>
<li><b>Body:</b> Point → Explanation → Evidence/Example → Link.</li>
<li><b>Conclusion:</b> synthesis of major ideas → significance to rebuilding society. No new points; shorter than your introduction.</li>
</ul>
<p>The apocalypse is the context, but the essay must remain <b>expository, not narrative</b>. Use clear Standard English; avoid redundant pairs and stock phrases. Maximum 500 words.</p>`,
          min: 250, max: 500,
          frame: `<p><b>Introduction:</b> Since the outbreak ended, … [context]. One area that could help the settlement is … [topic]. [Thesis naming your categories / causes and effects / term / two subjects / stages.]</p>
<p><b>Body 1:</b> The first [category / cause / step / point of comparison] is… This matters because… For example, … Therefore, …</p>
<p><b>Body 2:</b> A second / Next / In contrast… This is important because… For instance, … As a result, …</p>
<p><b>Body 3 (optional):</b> Finally… </p>
<p><b>Conclusion:</b> Ultimately, [restate the main ideas]… This knowledge matters to rebuilding society because…</p>`,
          checklist: [
            `My thesis is a complete controlling idea, not an announcement (“This essay is about…”).`,
            `My thesis reflects my chosen method of exposition and my body paragraphs follow its order.`,
            `Each body paragraph follows Point → Explanation → Evidence/Example → Link.`,
            `I used signal words that match my method.`,
            `My essay stays expository, not narrative.`,
            `My conclusion is shorter than my introduction and adds no new points.`,
            `I removed redundant pairs and stock phrases and stayed within 500 words.`
          ],
          rubric: [
            { criterion:`Content`, marks:10,
              look:[`\\b(rebuild|surviv|settlement|council)`, `\\b(for example|for instance|such as)\\b`, `\\b(expert|expertise|knowledge|skill)`, `\\b(because|this matters|this is important|so that)\\b`],
              min:3,
              strong:`Your content answers exactly what was asked: you explain how your expertise helps survival and rebuilding, with examples and reasons. Push further by qualifying a claim (“the most significant way…”) and making each example concrete.`,
              weak:`Answer the question directly: how does your expertise help people survive and rebuild? Each body paragraph needs a point, an explanation, a specific example (“For example, rainwater from a covered cistern…”) and a link back to rebuilding.` },
            { criterion:`Organization`, marks:7,
              look:[`\\b(first|firstly|second|secondly|third|finally|next|another|in addition|furthermore|moreover)\\b`, `\\b(categor(y|ies)|types? of|kinds? of|as a result|consequently|led to|is defined as|refers to|whereas|in contrast|similarly|unlike|step|once)\\b`, `\\b(in conclusion|ultimately|overall|therefore|thus)\\b`],
              min:2,
              strong:`Your structure is clear: the thesis acts as a roadmap and your signal words match your method of exposition. Check that your body paragraphs appear in exactly the same order as your thesis.`,
              weak:`Make your method visible. Name your categories, causes, stages or points of comparison in the thesis, then open each body paragraph with a matching signal: “The first category…”, “As a result…”, “In contrast…”, “Next…”. End with “Ultimately…” and a synthesis.` },
            { criterion:`Expression`, marks:8,
              look:[`\\b(however|although|while|whereas|which|who|because)\\b`, `[;:]`, `\\b(therefore|consequently|as a result|for this reason)\\b`],
              min:2,
              strong:`Your Standard English is clear and your sentences are varied. Keep vocabulary precise rather than complicated, and read aloud once to catch any slips.`,
              weak:`Vary your sentence construction by joining ideas with “because,” “although,” “which” and “therefore,” and check every sentence for Standard English. Cut any redundant pairs (“past history”) and stock phrases (“due to the fact that”).` }
          ],
          model: `<p><b>How Farming Knowledge Can Help Rebuild Society</b></p>
<p>Since the outbreak ended, the settlement has survived on scavenged tins and whatever survivors can find in abandoned shops. That supply is shrinking, and the cargo ships that once brought most of the island's food no longer arrive. Survivors who can grow food are therefore more valuable than those who can only find it. Farming knowledge can help the settlement survive and rebuild when it is divided into three areas: preparing soil and seed, managing water, and storing the harvest. <i>[Thesis — division and classification]</i></p>
<p>The first category, preparing soil and seed, determines whether anything grows at all. Survivors must know which crops suit our dry climate and how to keep the soil fertile. For example, sweet potato and pigeon peas cope well with dry spells, and kitchen scraps can be composted to enrich poor soil. This knowledge matters because a failed crop wastes months that a hungry settlement cannot afford. <i>[Point → Explanation → Example → Link]</i></p>
<p>The second category, managing water, is equally important on an island where rainfall is unpredictable. Many homes in New Calabash Bay were built with cisterns that collect rainwater from the roof, and these can be cleaned and repaired to serve the garden. Covering soil with dried leaves, known as mulch, keeps it moist for longer, while plastic bottles with small holes can drip water slowly to the roots. Without these techniques, the settlement would be forced to choose between drinking water and growing food.</p>
<p>The third category, storing the harvest, protects the work already done. Food can be dried in the sun, salted or kept in sealed containers that keep out rats and moisture. Survivors must also learn to check stored food regularly, because one rotting sweet potato can spoil a whole basket. Careful storage therefore turns a single good harvest into food for the leaner months.</p>
<p>Ultimately, farming is not one skill but three connected ones. Teaching survivors to prepare soil and seed, manage water and store food would turn a settlement that scavenges into one that sustains itself — the true beginning of rebuilding.</p>`,
          teacherTip: `<p>Marked out of 25: <b>Content 10 · Organization 7 · Expression 8</b>. Your method of exposition should be visible in your thesis and your topic sentences — a division and classification thesis names the categories; a process thesis names the stages. Keep it expository, not a survival story. Run the Thesis Check on your own thesis: does it include everything the question requires? Record one mistake you corrected in your reflective journal.</p>`
        }
      ],
      reward: 60,
      badge: `Master Architect`
    },

    /* ========================= DAY 4 ========================= */
    {
      id: `d4`,
      title: `Day 4 – Frankenstein the Essay`,
      focus: `Critical Reading, Peer Evaluation, Synthesis and Collaborative Communication`,
      briefing: `<p>The Council has noticed something: five survivors have written five separate essays about water, and each one contains something the others are missing. One essay alone will not do.</p>
<p>Today you join an <b>expert team</b> of survivors with similar or related areas of interest. First you review your own draft honestly. Then you exchange, evaluate, and stitch the strongest parts together into one living essay — carefully, so it does not come out a monster.</p>`,
      learn: `<h3>1. Expert Teams</h3>
<p>Students are organised into expert teams based on similar or related areas of interest (for example, water and sanitation; food and farming; health and first aid; safety and defence; education and communication).</p>

<h3>2. Council Self-Review (Before You Exchange)</h3>
<p>Reread your own draft first and answer honestly:</p>
<ul>
<li>Is my thesis clear?</li>
<li>Have I given the Council sufficient information?</li>
<li>Is my tone appropriate for my intended audience?</li>
<li>Are my points logically structured, and does my method of exposition match my thesis?</li>
<li>Is each point adequately developed and explained?</li>
<li>Is my vocabulary varied and interesting, without being needlessly complex?</li>
<li>Have I cut irrelevant information, redundant pairs and stock phrases?</li>
</ul>

<h3>3. Peer Evaluation</h3>
<p>Exchange essays and evaluate information using these labels:</p>
<table>
<tr><th>Label</th><th>Use it when…</th></tr>
<tr><td><b>ACCURATE</b></td><td>the information is correct and can be confirmed</td></tr>
<tr><td><b>USEFUL</b></td><td>the information would genuinely help survivors act or understand</td></tr>
<tr><td><b>QUESTIONABLE</b></td><td>the information is doubtful, unsupported or needs verification</td></tr>
<tr><td><b>REPETITIVE</b></td><td>the same point is made more than once without adding anything</td></tr>
<tr><td><b>MISSING</b></td><td>something important has been left out</td></tr>
<tr><td><b>STRONG</b></td><td>the explanation is especially clear, well developed and well supported</td></tr>
</table>
<p>As a group, determine which information is most accurate, useful and well supported, what needs verification, what is missing, and which explanations are strongest.</p>

<h3>4. The Frankenstein Challenge</h3>
<p>Combine the strongest elements of the individual essays into <b>ONE new, cohesive expository essay</b>. <b>Select, verify, eliminate, reorganise, rewrite, connect, edit and synthesise</b> — do not simply copy and paste separate paragraphs.</p>
<p>The final product must have <b>ONE thesis, ONE organisational structure, ONE consistent voice and ONE cohesive argument</b>.</p>
<p><i>Teacher's tip: synthesis means building something new from several sources. Use connectors that show relationships between ideas — “building on this,” “similarly,” “however,” “together, these…” — so the joins do not show.</i></p>`,
      challenges: [
        {
          id: `d4-selfreview`, title: `Council Self-Review`, skill: `thesis`, xp: 10, kind: `choice`,
          prompt: `Tariq's thesis says his essay will compare boiling and solar purification of water, but his body paragraphs list the types of water containers in the settlement. Which Self-Review question does his draft fail most clearly?`,
          options: [
            `Are my points logically structured, and does my method of exposition match my thesis?`,
            `Is my vocabulary varied and interesting?`,
            `Is my tone appropriate for my intended audience?`,
            `Have I cut redundant pairs?`
          ],
          answer: 0,
          why: `His thesis promises comparison and contrast, but his body uses classification of a different subject. The method of exposition must match the thesis, and the body must deliver what the thesis promises. He should either revise the thesis or rewrite the body.`
        },
        {
          id: `d4-labels`, title: `Label the Evidence`, skill: `synthesis`, xp: 15, kind: `sort`,
          prompt: `Your expert team is evaluating sentences from the water and sanitation essays. Choose the best peer-evaluation label for each.`,
          bins: [`QUESTIONABLE`, `REPETITIVE`, `MISSING`, `STRONG`],
          items: [
            { t:`“Everyone knows the river is cursed, so nobody should go near it.”`, bin:0 },
            { t:`“Drinking seawater mixed with lime juice makes it safe.”`, bin:0 },
            { t:`“Boil the water. You must boil it. Remember that boiling is what you have to do.”`, bin:1 },
            { t:`“Clean water is important. Water that is clean is very important for everyone.”`, bin:1 },
            { t:`The essay explains collecting and storing water but never says where latrines should be placed in relation to the water source.`, bin:2 },
            { t:`The process paragraph lists steps but never explains how long to boil the water.`, bin:2 },
            { t:`“Rainwater should be stored in covered containers, because open water allows mosquitoes to breed and spread disease.”`, bin:3 },
            { t:`“Bring water to a rolling boil for at least one minute; survivors often stop at the first small bubbles, which is not enough.”`, bin:3 }
          ],
          why: `QUESTIONABLE claims lack evidence or contradict reliable knowledge and need verification. REPETITIVE sentences restate without adding. MISSING notes a gap that matters to survivors. STRONG explanations are specific and give reasons — and the second strong example even flags a common mistake, as the Day 3 process guidance asks.`
        },
        {
          id: `d4-accurate`, title: `Accurate or Useful?`, skill: `credibility`, xp: 10, kind: `choice`,
          prompt: `A peer writes: <i>“Water covers most of the Earth's surface.”</i> This is true, but it does not help survivors find or clean water. Which pair of labels fits best?`,
          options: [
            `ACCURATE but not USEFUL for this essay`,
            `USEFUL but QUESTIONABLE`,
            `STRONG and MISSING`,
            `REPETITIVE and ACCURATE, so it must stay`
          ],
          answer: 0,
          why: `Accuracy and usefulness are different tests. A fact can be correct yet irrelevant to the Council's purpose. During the Frankenstein Challenge, accurate but irrelevant information is a candidate for <b>elimination</b>.`
        },
        {
          id: `d4-stitch`, title: `Stitch Sequence`, skill: `synthesis`, xp: 15, kind: `order`,
          prompt: `Put the Frankenstein Challenge actions in the order the unit lists them.`,
          items: [`Select`, `Verify`, `Eliminate`, `Reorganise`, `Rewrite`, `Connect`, `Edit`, `Synthesise`],
          why: `Select the strongest material, verify it, eliminate what is weak or repeated, reorganise it under one structure, rewrite it in one voice, connect it with transitions, edit it, and synthesise it into one cohesive argument. Copying and pasting skips almost every step.`
        },
        {
          id: `d4-fix`, title: `Trim the Draft`, skill: `concise`, xp: 15, kind: `fix`,
          prompt: `The last Self-Review question: have you cut redundant pairs and stock phrases? Edit this sentence from a team draft.`,
          text: `At this point in time, each and every survivor must first and foremost join together to plan ahead for the future in order to collect water.`,
          model: `Now, every survivor must first unite to plan how to collect water.`,
          banned: [`at this point in time`, `each and every`, `first and foremost`, `join together`, `plan ahead`, `for the future`, `in order to`],
          why: `“At this point in time” → now; “each and every” → every; “first and foremost” → first; “join together” and “plan ahead for the future” are redundant (joining is always together; all planning is ahead and for the future); “in order to” → to (or rephrase).`
        },
        {
          id: `d4-write`, type: `write`, kind: `write`, skill: `synthesis`, xp: 30,
          title: `Frankenstein Synthesis`,
          genre: `Peer evaluation notes and synthesis paragraph`,
          prompt: `<p>Your expert team (Water &amp; Sanitation) has two draft extracts (see the stimulus). Complete <b>two parts</b>:</p>
<ol>
<li><b>Peer evaluation notes:</b> evaluate the two extracts using the labels ACCURATE, USEFUL, QUESTIONABLE, REPETITIVE, MISSING and STRONG. Say what needs verification and how.</li>
<li><b>Frankenstein synthesis paragraph:</b> combine the strongest elements into ONE new, cohesive paragraph with ONE controlling idea, ONE structure and ONE consistent voice. Eliminate weak or repeated material and add what is missing. Do not copy and paste.</li>
</ol>`,
          stimulus: `<p><b>Extract A (Kaya):</b></p>
<blockquote>“Boiling water kills most germs. Boil the water. You should boil the water before drinking it. Bring it to a rolling boil for at least one minute. A person can only survive about three days without water, so this is important.”</blockquote>
<p><b>Extract B (Marcus):</b></p>
<blockquote>“Clean water depends on more than purification; it depends on where we collect it and how we store it. Rainwater from roofs should be stored in covered containers so mosquitoes cannot breed in it. Also everyone knows the river is cursed, so we should never use it.”</blockquote>`,
          min: 150, max: 350,
          frame: `<p><b>Peer evaluation notes</b><br>Extract A: “…” is ACCURATE / USEFUL because… The repeated instruction to boil is REPETITIVE… The three-day claim is QUESTIONABLE / needs verification by…<br>Extract B: … is STRONG because… “The river is cursed” is QUESTIONABLE because… MISSING from both: …</p>
<p><b>Synthesis paragraph</b><br>[One controlling idea that combines both extracts.] First,… Building on this,… However,… Together, these steps…</p>`,
          checklist: [
            `I used at least three of the six peer-evaluation labels and gave reasons.`,
            `I identified what needs verification and how to check it.`,
            `I noted at least one thing that is MISSING.`,
            `My synthesis paragraph has one controlling idea, one structure and one voice.`,
            `I eliminated weak or repeated material instead of copying it.`,
            `I used connectors to join ideas from both extracts.`
          ],
          rubric: [
            { criterion:`Peer evaluation labels`, marks:4,
              look:[`accurate`, `useful`, `questionable`, `repetitive`, `missing`, `strong`],
              min:3,
              strong:`You applied the labels thoughtfully and justified them. Great critical reading.`,
              weak:`Use the Council's labels explicitly and give a reason: “Extract A's instruction to boil water is ACCURATE and USEFUL, but it is REPETITIVE because it is stated three times.”` },
            { criterion:`Verification`, marks:3,
              look:[`\\b(verif|confirm|check|cross-check)`, `\\b(source|evidence|test)`],
              min:2,
              strong:`You identified claims needing verification and how to check them — exactly what the Council needs.`,
              weak:`Say which claim needs checking and how: “The claim that the river is cursed has no evidence; the Water Team should test a sample to verify whether it is safe after boiling.”` },
            { criterion:`Synthesis and cohesion`, marks:5,
              look:[`\\b(building on|similarly|however|in addition|together|while|whereas|furthermore|as well as)\\b`, `\\b(collect|store|boil|purif)`, `\\b(latrine|toilet|waste|sanitation)`],
              min:2,
              strong:`Your paragraph reads as one voice with one controlling idea, and it fills a gap neither extract covered. That is true synthesis.`,
              weak:`Combine, do not stack. Start with one controlling idea (for example, “Safe water depends on three stages: collection, purification and storage”), then connect material from both extracts with “building on this,” “however” or “together.” Add what is missing, such as keeping latrines away from water sources.` },
            { criterion:`Expression`, marks:3,
              look:[`\\b(because|therefore|which|so that|as a result)\\b`, `[;:]`],
              min:1,
              strong:`Clear, concise Standard English with no repeated instructions.`,
              weak:`Remove repetition and join related ideas with “because,” “which” or “so that” to make one smooth voice.` }
          ],
          model: `<p><b>Peer evaluation notes</b></p>
<p><b>Extract A:</b> “Bring it to a rolling boil for at least one minute” is ACCURATE, USEFUL and STRONG because it gives a precise instruction. However, the instruction to boil is REPETITIVE: it appears three times. The claim that a person survives “about three days without water” is QUESTIONABLE as written; it should be verified with a reliable medical source before it is included.</p>
<p><b>Extract B:</b> The point that clean water depends on collection and storage, not only purification, is STRONG and USEFUL, and the reason for covering containers (mosquitoes) is ACCURATE. “Everyone knows the river is cursed” is QUESTIONABLE: it offers no evidence and contradicts the Water Team's tests, so it should be eliminated. MISSING from both: where latrines should be placed so waste does not contaminate water sources.</p>
<p><b>Synthesis paragraph</b></p>
<p>Safe water depends on three connected stages: collection, purification and storage. First, survivors should collect water from sources that are protected from waste, which means latrines must be dug well away from rivers, wells and cisterns. Building on this, all collected water should be brought to a rolling boil for at least one minute, because boiling kills most germs. However, purification is wasted if clean water is stored carelessly; rainwater and boiled water should be kept in covered containers so that mosquitoes cannot breed in them. Together, these stages give the settlement a reliable supply of drinking water and protect it from preventable disease.</p>`,
          teacherTip: `<p>Synthesis is not a collage. The finished Frankenstein essay needs ONE thesis, ONE organisational structure, ONE consistent voice and ONE cohesive argument. Verify before you include, eliminate what is questionable or repetitive, and use transitions so the reader cannot see the stitches. When giving peer feedback, ask: “What evidence supports this?”</p>`
        }
      ],
      reward: 50,
      badge: `Master Stitcher`
    },

    /* ========================= DAY 5 ========================= */
    {
      id: `d5`,
      title: `Day 5 – Save Humanity`,
      focus: `Oral Communication and Communicative Behaviours`,
      briefing: `<p>The whole settlement gathers in the old school courtyard. Lanterns are lit. The Rebuilding Council sits at the front, and every survivor will deliver a <b>five-minute expert briefing</b>.</p>
<p>Your expertise is only as useful as your ability to communicate it. After the briefings, each expert group turns its Frankenstein essay into one chapter of the <b>Post-Zombie Apocalypse Survival &amp; Rebuilding Manual</b> — and you put yourself in it.</p>`,
      learn: `<h3>1. The Five-Minute Expert Briefing</h3>
<p>Each student delivers a <b>five-minute expert briefing</b> to the Rebuilding Council explaining how the chosen area of expertise contributes to the new society. <b>Adapt</b> the written essay for oral communication rather than simply reading it:</p>
<ul>
<li>Use shorter sentences and direct address (“you,” “we”).</li>
<li>Signpost clearly (“My first point…”, “Now let's turn to…”, “To sum up…”) so listeners can follow without a page.</li>
<li>Repeat key ideas briefly — listeners cannot reread.</li>
<li>Use speaking notes, not a full script, when you deliver.</li>
</ul>

<h3>2. Communicative Behaviours to Assess</h3>
<table>
<tr><th>Behaviour</th><th>Meaning</th></tr>
<tr><td><b>Paralanguage</b></td><td>How you say it: volume, pace, pitch, pauses, pronunciation, tone of voice</td></tr>
<tr><td><b>Proxemics</b></td><td>Use of space and distance between speaker and audience</td></tr>
<tr><td><b>Chronemics</b></td><td>Use of time: punctuality, keeping to five minutes, pausing</td></tr>
<tr><td><b>Haptics</b></td><td>Touch (e.g. a handshake) — only where contextually appropriate</td></tr>
<tr><td><b>Posture, gestures, facial expressions, eye contact</b></td><td>Body language that signals confidence, warmth or nervousness</td></tr>
<tr><td><b>Register</b></td><td>The level of formality suited to audience and context — a briefing to the Council calls for a formal or consultative register</td></tr>
</table>

<h3>3. After the Briefings</h3>
<p>Listeners consider how verbal and non-verbal behaviours influenced audience response. Describe audience attitudes <b>precisely</b> — for example, a <b>positive</b> attitude of confidence, trust, respect or admiration, or a <b>negative</b> attitude of doubt, suspicion, confusion or distrust. “They liked it” is not precise enough.</p>

<h3>4. Final Collaborative Product — The Survival &amp; Rebuilding Manual</h3>
<p>Each expert group converts its Frankenstein essay into one chapter of a class survival manual. Each chapter includes:</p>
<ul>
<li>Explanation of the area and why survivors need this knowledge.</li>
<li>Essential knowledge, resources required and procedures or instructions.</li>
<li>Warnings, diagrams or visuals where appropriate, common problems and solutions.</li>
<li>Practical recommendations and a quick-reference survival checklist.</li>
</ul>

<h3>5. Put Yourself in the Manual</h3>
<p>Every student contributes a brief section titled <b>“My Role in Rebuilding the World,”</b> explaining specifically how their own knowledge, interests or skills could be applied within the group's area.</p>

<h3>6. Final Reflection</h3>
<ul>
<li>Which was more difficult: knowing the information, or communicating it effectively? Explain.</li>
<li>Which method of exposition felt most natural for explaining your expertise? Which was hardest to apply, and why?</li>
<li>How did audience, purpose, context, barriers, source credibility, language and communicative behaviours affect the way you communicated your expertise?</li>
</ul>`,
      challenges: [
        {
          id: `d5-nonverbal`, title: `Body Language Bootcamp`, skill: `oral`, xp: 15, kind: `sort`,
          prompt: `Sort each observation from the practice briefings into the communicative behaviour it shows.`,
          bins: [`Paralanguage`, `Proxemics`, `Chronemics`, `Haptics`, `Posture, gestures, face & eyes`],
          items: [
            { t:`Ayesha slows her pace and lowers her volume before her key warning.`, bin:0 },
            { t:`Dion pronounces “sanitation” carefully and pauses after each main point.`, bin:0 },
            { t:`Nia steps out from behind the table to stand closer to the Council.`, bin:1 },
            { t:`Ravi stays so far back that the front row can barely hear him.`, bin:1 },
            { t:`Jerome finishes in exactly five minutes, leaving time for questions.`, bin:2 },
            { t:`Leah arrives late and runs two minutes over her time.`, bin:2 },
            { t:`Marco shakes the Council chair's hand before beginning.`, bin:3 },
            { t:`Shanice keeps eye contact across the whole room and uses open hand gestures.`, bin:4 },
            { t:`Kevin slouches, crosses his arms and stares at his notes.`, bin:4 }
          ],
          why: `Paralanguage is <i>how</i> you sound; proxemics is space; chronemics is time; haptics is touch (only where appropriate); posture, gestures, facial expressions and eye contact are body language. Strong speakers manage all of them deliberately.`
        },
        {
          id: `d5-attitude`, title: `Read the Room`, skill: `oral`, xp: 10, kind: `sort`,
          prompt: `Which audience attitude is each speaker's behaviour most likely to produce?`,
          bins: [`Positive attitude (confidence, trust, respect, admiration)`, `Negative attitude (doubt, suspicion, confusion, distrust)`],
          items: [
            { t:`The speaker cites the Water Team's tests and invites the Council to observe a demonstration.`, bin:0 },
            { t:`The speaker maintains steady eye contact and speaks at a calm, audible pace.`, bin:0 },
            { t:`The speaker signposts clearly: “I have three points… my second point is…”`, bin:0 },
            { t:`The speaker reads the essay word for word in a flat monotone.`, bin:1 },
            { t:`The speaker uses unexplained medical jargon throughout.`, bin:1 },
            { t:`The speaker avoids eye contact and cannot say where the information came from.`, bin:1 }
          ],
          why: `Credible sources, clear signposting and confident non-verbal behaviour build confidence, trust and respect. Monotone reading leads to boredom and doubt; jargon causes confusion; vague sources and avoided eye contact invite suspicion and distrust. Name the attitude precisely when you reflect.`
        },
        {
          id: `d5-adapt`, title: `Page to Podium`, skill: `oral`, xp: 15, kind: `choice`,
          prompt: `Which change best adapts the written essay for oral delivery to the Council?`,
          options: [
            `Add clear signposts, shorten long sentences, address listeners directly and briefly repeat the key ideas.`,
            `Read the essay exactly as written so nothing is left out.`,
            `Replace plain words with more complex vocabulary to sound impressive.`,
            `Remove the thesis, since listeners do not need one.`
          ],
          answer: 0,
          why: `Listeners cannot reread, so they need a clear roadmap (yes — keep a spoken thesis), signposts, manageable sentences and brief repetition. Reading word for word is exactly what the unit says to avoid, and needlessly complex vocabulary creates a barrier.`
        },
        {
          id: `d5-register`, title: `Choose Your Register`, skill: `audience`, xp: 10, kind: `choice`,
          prompt: `Which opening line uses the most appropriate register for a briefing to the Rebuilding Council?`,
          options: [
            `“Members of the Council, fellow survivors: today I will explain how three farming skills can feed this settlement within a single season.”`,
            `“Yo, wha' happenin'? So, like, food, right?”`,
            `“It is incumbent upon my humble self to elucidate the multitudinous agricultural modalities.”`,
            `“I didn't really prepare, but I'll just talk about plants.”`
          ],
          answer: 0,
          why: `A formal or consultative register suits a Council briefing: respectful address, clear Standard English and a spoken thesis. Casual vernacular is fine among friends but does not suit this context; needlessly complex vocabulary is a barrier; an apologetic opening destroys credibility before you begin.`
        },
        {
          id: `d5-speech`, type: `write`, kind: `write`, skill: `oral`, xp: 30,
          title: `Five-Minute Expert Briefing`,
          genre: `Speech script`,
          prompt: `<p>Adapt your expository essay into the script for a <b>five-minute expert briefing</b> to the Rebuilding Council, explaining how your chosen area of expertise contributes to the new society.</p>
<ul>
<li>Open by addressing the Council and stating your thesis aloud.</li>
<li>Use signposts, shorter sentences, direct address and brief repetition of key ideas.</li>
<li>Include at least three <b>delivery cues</b> in square brackets, e.g. [pause], [slow down], [eye contact], [gesture to diagram].</li>
<li>Close with a memorable summary and a call to the Council.</li>
</ul>
<p>Speaking pace is roughly 120–140 words per minute, so a five-minute briefing is roughly 600–700 words; a shorter script can be extended with pauses and a demonstration.</p>`,
          min: 300, max: 700,
          frame: `<p>[eye contact] Members of the Council, fellow survivors… Today I will explain how… [thesis].</p>
<p>My first point is… [pause] Why does this matter? Because… For example…</p>
<p>Now let's turn to my second point… </p>
<p>Finally… [slow down]</p>
<p>To sum up, … [pause] I ask the Council to…</p>`,
          checklist: [
            `I addressed the Council directly and stated my thesis aloud.`,
            `I used signposts so listeners can follow without a page.`,
            `I used shorter sentences, direct address and brief repetition of key ideas.`,
            `I included at least three delivery cues for paralanguage or body language.`,
            `My register suits a formal Council briefing.`,
            `I ended with a summary and a call to action.`
          ],
          rubric: [
            { criterion:`Content`, marks:8,
              look:[`\\b(rebuild|surviv|settlement)`, `\\b(for example|for instance|imagine)\\b`, `\\b(because|this matters|why does this matter)\\b`],
              min:2,
              strong:`Your briefing explains clearly how your expertise contributes to the new society, with concrete examples. Keep every example tied to the Council's needs.`,
              weak:`Make your contribution explicit and concrete: “This matters because… For example, in our first month…”` },
            { criterion:`Organization and signposting`, marks:5,
              look:[`\\b(my first point|first|second|next|now let'?s turn|finally)\\b`, `\\b(to sum up|in summary|in conclusion|to conclude)\\b`, `\\btoday I (will|want)`],
              min:2,
              strong:`Excellent signposting — the Council will always know where they are in your briefing.`,
              weak:`Listeners need a map. Announce your structure (“Today I will explain three things…”), mark each point (“My second point…”) and signal the end (“To sum up…”).` },
            { criterion:`Oral adaptation and delivery cues`, marks:4,
              look:[`\\[[^\\]]+\\]`, `\\b(you|we|us|our)\\b`, `\\?`],
              min:2,
              strong:`This is written to be heard: direct address, rhetorical questions and planned delivery cues. Practise the pauses aloud.`,
              weak:`Adapt for the ear, not the page. Address listeners as “you” and “we,” ask a rhetorical question, and add delivery cues such as [pause], [slow down] or [eye contact].` },
            { criterion:`Register and expression`, marks:3,
              look:[`\\b(members of the council|council|fellow survivors)\\b`, `\\b(I ask|I urge|I recommend|I invite)\\b`],
              min:1,
              strong:`An appropriate formal register throughout, with a confident call to action.`,
              weak:`Open with respectful address (“Members of the Council, fellow survivors…”) and close with a clear request (“I ask the Council to…”).` }
          ],
          model: `<p>[stand tall, eye contact across the room] Members of the Council, fellow survivors: good evening.</p>
<p>Let me begin with a question. [pause] What will we eat when the last tin is opened? [pause] Today I will explain how farming knowledge can feed this settlement — and I will do it in three parts: preparing soil and seed, managing water, and storing the harvest.</p>
<p>My first point is soil and seed. If we plant the wrong crops, nothing grows, and we lose months we cannot afford. [slow down] So we choose crops that suit our dry climate. Sweet potato. Pigeon peas. Callaloo. These survive dry spells better than most. And we do not need to buy fertiliser — we make it. Kitchen scraps, dried leaves and ash can be composted to enrich poor soil. [gesture to the compost bin] That bin by the gate? In six weeks, that is food for our garden.</p>
<p>Now let's turn to my second point: water. [pause] You all know how unpredictable our rain is. Many of the houses on this hill were built with cisterns. Those cisterns can be cleaned and repaired to water the garden. We can cover the soil with dried leaves — that is called mulch — so it stays moist longer. And we can make drip bottles: a plastic bottle with tiny holes, buried beside the roots. [hold up a bottle] It costs us nothing, and it saves water we need for drinking.</p>
<p>My third and final point is storage. A good harvest can still be lost. Rats, damp and rot will take it if we let them. So we dry food in the sun, we salt it, and we keep it in sealed containers. [slow down] And we check our stores every week, because one rotting sweet potato can spoil a whole basket.</p>
<p>Why does this matter? [eye contact with the Council] Because right now, this settlement survives on luck. Every supply run puts people at risk. A garden changes that. A garden means children eat even on the days no one goes outside the wall.</p>
<p>To sum up: [count on fingers] prepare the soil and seed, manage the water, and store the harvest. Three skills. One goal — a settlement that feeds itself.</p>
<p>[pause] I ask the Council to give the farming team the plot behind the old school, four volunteers and two weeks. In return, I promise you our first harvest before the rainy season ends.</p>
<p>Thank you. [pause, then invite questions]</p>`,
          teacherTip: `<p>Do not read your essay to the Council — adapt it. Spoken English needs signposts, shorter sentences and brief repetition. Plan your paralanguage (pace, volume, pauses) and body language as carefully as your words, keep to time (chronemics), and choose a formal or consultative register. Afterwards, describe the audience's attitude precisely: confidence, trust, respect or admiration — or doubt, suspicion, confusion or distrust.</p>`
        },
        {
          id: `d5-manual`, type: `write`, kind: `write`, skill: `synthesis`, xp: 30,
          title: `Survival & Rebuilding Manual Entry`,
          genre: `Survival manual chapter extract, personal section and reflection`,
          prompt: `<p>Write your contribution to your group's chapter of the <b>Post-Zombie Apocalypse Survival &amp; Rebuilding Manual</b>. Include three parts:</p>
<ol>
<li><b>Chapter extract</b> for your group's area, with headings: Why Survivors Need This Knowledge; Essential Knowledge and Resources Required; Procedure; Warnings, Common Problems and Solutions; Recommendations; Quick-Reference Survival Checklist (describe any diagram you would include).</li>
<li><b>My Role in Rebuilding the World:</b> explain specifically how your own knowledge, interests or skills could be applied within your group's area.</li>
<li><b>Final reflection:</b> answer the three Final Reflection questions — knowing vs communicating; which method of exposition was most natural and which was hardest; how audience, purpose, context, barriers, source credibility, language and communicative behaviours affected your communication.</li>
</ol>`,
          min: 250, max: 600,
          frame: `<p><b>Chapter: [Area]</b><br><b>Why Survivors Need This Knowledge:</b> …<br><b>Essential Knowledge and Resources Required:</b> …<br><b>Procedure:</b> 1. … 2. … 3. …<br><b>Warnings, Common Problems and Solutions:</b> Warning: … Problem: … Solution: …<br><b>Recommendations:</b> …<br><b>Quick-Reference Survival Checklist:</b> ☐ … ☐ … ☐ …</p>
<p><b>My Role in Rebuilding the World</b><br>Within our group's area, I can…</p>
<p><b>Final Reflection</b><br>For me, the more difficult part was… The method of exposition that felt most natural was… The hardest was… because… Audience, purpose and context affected my communication when…</p>`,
          checklist: [
            `My chapter extract has all the required headings, including a quick-reference checklist.`,
            `My procedure is in strict chronological order.`,
            `I included warnings and at least one common problem with its solution.`,
            `My “My Role in Rebuilding the World” section is specific to my own skills.`,
            `I answered all three Final Reflection questions.`
          ],
          rubric: [
            { criterion:`Manual chapter structure`, marks:6,
              look:[`\\bwhy survivors need`, `\\b(resources|essential knowledge)`, `\\b(procedure|step)`, `\\b(warning|problem|solution)`, `\\brecommend`, `\\bchecklist`],
              min:4,
              strong:`Your chapter is practical and complete — a survivor could pick it up and act on it. Make sure your checklist items are short enough to read in an emergency.`,
              weak:`Use every required heading: Why Survivors Need This Knowledge; Essential Knowledge and Resources Required; Procedure; Warnings, Common Problems and Solutions; Recommendations; Quick-Reference Survival Checklist.` },
            { criterion:`My Role in Rebuilding the World`, marks:4,
              look:[`my role in rebuilding`, `\\bI (can|will|could)\\b`, `\\bmy (knowledge|skill|experience|interest)`],
              min:2,
              strong:`Your personal section is specific — the Council knows exactly where to place you.`,
              weak:`Be specific about yourself: “Within our group's area, I can… because my experience of… means I…”` },
            { criterion:`Final reflection`, marks:5,
              look:[`\\b(difficult|harder|easier|challenging)`, `\\b(method of exposition|classification|cause and effect|definition|comparison|contrast|process)`, `\\b(audience|purpose|context|barrier|credib|communicative behaviour|non-verbal)`],
              min:3,
              strong:`A thoughtful reflection that connects the whole week: exposition, audience and credibility. Copy your best insight into your reflective journal.`,
              weak:`Answer all three reflection questions directly: which was harder (knowing or communicating) and why; which method of exposition was most natural and which was hardest; and how audience, purpose, context, barriers, credibility, language and behaviours affected your communication.` }
          ],
          model: `<p><b>Chapter 3: Food and Farming</b></p>
<p><b>Why Survivors Need This Knowledge:</b> Scavenged food will run out. A settlement that grows its own food no longer depends on dangerous supply runs.</p>
<p><b>Essential Knowledge and Resources Required:</b> crops suited to a dry climate (sweet potato, pigeon peas, callaloo); compost; a cleaned cistern or covered water drums; mulch; plastic bottles for drip watering; sealed storage containers.</p>
<p><b>Procedure:</b> 1. Clear a plot that gets morning sun. 2. Mix compost into the soil. 3. Plant cuttings and seeds at the start of the rains. 4. Cover the soil with mulch. 5. Water at the roots in the early morning or evening. 6. Harvest, dry or salt, and seal in containers.</p>
<p><b>Warnings, Common Problems and Solutions:</b> Warning: never use cistern water reserved for drinking. Problem: leaves turn yellow and wilt. Solution: check for overwatering before adding more water. Problem: rats in storage. Solution: raise containers off the ground and seal them. <i>[Diagram: a drip bottle buried beside a plant's roots.]</i></p>
<p><b>Recommendations:</b> Rotate crops each season and train two new volunteers every month so knowledge is never held by one person.</p>
<p><b>Quick-Reference Survival Checklist:</b> ☐ Compost added ☐ Mulch in place ☐ Water at roots, not leaves ☐ Stores checked weekly ☐ Containers sealed and off the ground</p>
<p><b>My Role in Rebuilding the World</b></p>
<p>Within our group's area, I can train new volunteers in planting and composting, because my years in my grandmother's garden taught me which crops survive our dry season. I will also design the picture-based instruction cards, since several survivors do not read English easily.</p>
<p><b>Final Reflection</b></p>
<p>For me, communicating the information was more difficult than knowing it. I knew how to plant sweet potato, but explaining it to people who had never farmed forced me to define terms like “mulch.” Division and classification felt most natural, because my knowledge already fell into three areas. Comparison and contrast was hardest, because I struggled to keep my points in matching order. My audience shaped everything: survivors who distrusted the Council needed evidence from credible sources, language barriers led me to use pictures, and in my briefing I learnt that pausing and eye contact earned more trust than speaking quickly.</p>`,
          teacherTip: `<p>A manual is expository writing at its most practical: clear headings, strict chronological procedures, honest warnings and a checklist a tired survivor can follow. In your reflection, be specific — name the method of exposition and the barrier, and explain <i>why</i>. Information alone does not save the world; communicating it does.</p>`
        }
      ],
      reward: 60,
      badge: `Voice of the Council`
    }
  ],

  finale: `<p><b>The manual is bound.</b> Its pages carry your group's chapter, your briefing notes and your own section: <i>My Role in Rebuilding the World</i>. Copies are carried to the gate, the clinic, the garden and the library tent. Somewhere across the island, a radio crackles back to life.</p>
<blockquote><b>Information alone does not save the world. People must be able to find reliable information, understand it, evaluate it, organise it and communicate it effectively.</b></blockquote>
<p>Return one last time to the central question: <b>What knowledge or expertise can I contribute to help rebuild society, and how can I communicate that knowledge effectively to others?</b> Write your answer in your reflective journal.</p>
<p><b>Extension Bank (Early Finishers / Homework)</b></p>
<ul>
<li><b>Sensory Description:</b> describe, in vivid sensory language, the moment you first entered the rebuilt settlement — sound, smell, light, texture.</li>
<li><b>Modes of Writing:</b> for each Council topic — a proposal to relocate the settlement; a eulogy for a fallen leader; a step-by-step water purification guide; an argument for or against rationing — identify which mode(s) of writing (expository, persuasive, narrative, descriptive) it requires.</li>
<li><b>Thesis Bank:</b> write and swap two thesis statements for your own expertise essay; evaluate a partner's using the Thesis Check criteria from Day 3.</li>
</ul>
<p>Thank you for serving on the Rebuilding Council.</p>`
};
