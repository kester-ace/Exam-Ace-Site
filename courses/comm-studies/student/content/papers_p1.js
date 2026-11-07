// Paper 01 practice papers (multiple choice). Original content, specimen-style (CAPE Communication Studies 2024 format).
(function () {
  const I = (module, passage, q, options, answer, why) => {
    const it = { module, q, options, answer, why };
    if (passage) it.passage = passage;
    return it;
  };
  const INTRO = (tag) => `<p><b>Paper 01 · Practice Paper ` + tag + `</b> · 1 hour 30 minutes</p>
<ol>
<li>This test consists of <b>45 items</b>: 15 on Module 1, 15 on Module 2 and 15 on Module 3. Answer <b>ALL</b> items.</li>
<li><b>Items 1–7</b> are based on a listening extract. In the examination, the extract is NOT printed; it is read to you <b>twice</b> after you have had five minutes to read the items. For practice, ask a partner or your teacher to read it aloud before you look at the printed text.</li>
<li>The remaining items are based on scenarios, extracts or dialogues, or stand alone. Answer each item based on the information given.</li>
<li>Each item has four suggested answers lettered (A), (B), (C), (D). Read each item and decide which choice is <b>best</b>.</li>
<li>If you cannot answer an item, go on to the next one and return to it later.</li>
</ol>`;

  // ===================== PAPER A =====================
  const A_LISTEN = `<p><i>Items 1–7. In the examination this monologue is read aloud twice. Listen carefully before answering.</i></p>
<blockquote><b>Salt Pond Mornings</b><br>
Every morning, before the sun open he eye, we was already by the pond.<br>
Mammy with the basket, me with the rake.<br>
Salt shining white like somebody spread sugar over the whole of Sandy Ground.<br>
First we rake, then we pile, then we carry.<br>
Back bending, hand burning, but nobody complaining.<br>
Now look.<br>
Truck and car and dust where the salt used to sleep.<br>
Children passing and don't even turn they head.<br>
Who going tell them?<br>
Who going remember Mammy hand?<br>
I tell them. I tell them every Sunday.<br>
The pond don't forget. Is we who forget.</blockquote>
<p style="font-size:.85em">Original monologue written for this practice paper.</p>`;

  const A_RESEARCH = `<p><i>Read the following scenario carefully and then answer Items 8–11.</i></p>
<p>Fishers along the Tobago coast report that large mats of sargassum seaweed are reducing their catches. A group of sixth-form students from Sandbox Tree College plans to investigate how sargassum has affected the income of fishers in Charlotteville and Speyside over the last three years.</p>`;

  const A_EXTRACT = `<p><i>Read the following extract carefully and then answer Items 12–15.</i></p>
<blockquote>For years, we have treated the bus as the last choice of the traveller who has no other choice. Yet every morning on our main roads, private cars crawl bumper to bumper, most carrying only one person, while schoolchildren wait under the sun at stops with no shelter. If Grenada invested in a scheduled, reliable public bus service, traffic would ease, fuel costs would fall and workers would reach their jobs on time. Other small islands have shown that a well-run timetable can move thousands of people daily. The question is not whether we can afford such a system. The question is whether we can afford to keep going without one.</blockquote>
<p style="font-size:.85em"><b>SOURCE:</b> Adapted from Dana Richardson, "Waiting for the Bus", <i>The Harbour Voice</i>, 2025. Dana Richardson is a transport planner who has advised several island governments in the Eastern Caribbean on public transport.</p>`;

  const A_DIALOGUE = `<p><i>Read the following dialogue carefully and then answer Items 16–20.</i></p>
<p>Shanice, who was born in Antigua, and her cousin Luis, who recently moved from the Dominican Republic, are waiting in a long line at a government office in St. John's.</p>
<blockquote>
<b>Shanice:</b> Boy, the line long, eh? We go be here till evening.<br>
<b>Luis:</b> Sí, muy largo. But my teacher say I must speak English good if I want the hotel job.<br>
<b>Shanice:</b> She would tell you "speak English <i>well</i>". But don't stress. When I with my grandmother, I talk one way; when I in the office, I talk another way.<br>
<b>Luis:</b> My boss at the restaurant tell me my English "too broken" for the front desk.<br>
<b>Shanice:</b> Hmm. Some people does look down on how we talk, but is still language.
</blockquote>`;

  const A_SOLO2 = `<p><i>Select the most appropriate answer for Items 21–30.</i></p>`;

  const A_HOTEL = `<p><i>Read the following scenario carefully and then answer Items 31–35.</i></p>
<p>Mrs Daniella Fleming is the general manager of Bayside Suites, a hotel in Grace Bay, Providenciales. Head office has decided that all staff must complete a new online customer-service training course by the end of the month. Mrs Fleming must pass this information to her four department heads, who will then inform their teams. Several members of the housekeeping staff speak mainly Spanish and do not have work email accounts.</p>`;

  const A_VIDEO = `<p><i>Read the following scenario carefully and then answer Items 36–40.</i></p>
<p>Two days before a by-election, a short video circulates on WhatsApp. It appears to show a candidate, Mr Rafael Lake, saying that he will close the island's only public library. The candidate's face and voice look and sound real, but he insists he never said those words. Within hours, a page called <i>Real Patriots 758</i> shares the video with the caption: "Everybody already voting against Lake. Don't be the last one left behind!"</p>`;

  const A_SPEECH = `<p><i>Read the following scenario carefully and then answer Items 41–43.</i></p>
<p>Akeem, a CAPE student at Calabash Point Secondary in Kingstown, has been asked to deliver a five-minute speech at a Parent-Teacher Association meeting. His aim is to persuade parents to support a ban on single-use plastic containers in the school canteen, even though reusable containers may cost a little more.</p>`;

  const A_SOLO3 = `<p><i>Select the most appropriate answer for Items 44 and 45.</i></p>`;

  const P1A_items = [
    // ---------- MODULE 1 ----------
    I('1', A_LISTEN, `The MAIN purpose of the monologue is to`,
      [`instruct children in how salt is raked and stored`, `lament the loss of a community tradition and its memory`, `persuade the government to reopen the salt pond`, `describe the traffic problems in present-day Sandy Ground`], 1,
      `The persona contrasts the busy salt-raking mornings of the past with the present, where "Truck and car and dust" have replaced the salt and children "don't even turn they head". The closing line "Is we who forget" shows the speaker mourning a lost tradition, not instructing, campaigning or reporting on traffic.`),
    I('1', A_LISTEN, `Which of the following devices are evident in the line "Salt shining white like somebody spread sugar over the whole of Sandy Ground"?`,
      [`Metaphor and hyperbole`, `Personification and metaphor`, `Simile and visual imagery`, `Onomatopoeia and simile`], 2,
      `The comparison uses "like", so it is a simile, and the picture of white, glittering salt spread over a town appeals to the sense of sight (visual imagery). There is no direct comparison without "like" (metaphor) and no sound-word (onomatopoeia).`),
    I('1', A_LISTEN, `The line "First we rake, then we pile, then we carry" is organised MAINLY by`,
      [`comparison and contrast`, `cause and effect`, `classification`, `sequential (process) order`], 3,
      `The signal words "First" and "then ... then" set out the steps of the work in the order they happened. This is sequential or process order. Nothing is being compared, classified or explained as a cause.`),
    I('1', A_LISTEN, `The lines "The pond don't forget. Is we who forget." suggest that`,
      [`the place keeps its history even though the community has neglected it`, `the salt pond is now polluted and cannot be used`, `the persona has a poor memory because of old age`, `the children refuse to visit the pond on Sundays`], 0,
      `The pond is personified as something that "remembers", and this is set against the people who have forgotten. The persona is blaming the community, not the place, for the loss of heritage.`),
    I('1', A_LISTEN, `Which of the following BEST describes the tone of the monologue?`,
      [`Angry and vengeful`, `Nostalgic and regretful`, `Joyful and celebratory`, `Indifferent and detached`], 1,
      `Fond memories of "Mammy with the basket" (nostalgia) are followed by sadness at what has been lost and forgotten (regret). The persona is concerned, not angry, celebrating or unconcerned.`),
    I('1', A_LISTEN, `The rhetorical questions "Who going tell them? Who going remember Mammy hand?" are used MAINLY to`,
      [`ask the audience to volunteer as tour guides`, `identify the children who pass the pond`, `blame Mammy for not teaching the children`, `express concern that the heritage will not be passed on`], 3,
      `The questions expect no answer; they voice the persona's worry that no one will carry the story of the salt pond and the people who worked it to the next generation.`),
    I('1', A_LISTEN, `Which of the following practices would BEST help a listener to identify the main idea of the monologue while it is being read?`,
      [`Writing down every word the reader says`, `Noting repeated ideas, key words and contrasts`, `Focusing on the reader's accent and speed`, `Deciding the meaning after the first two lines`], 1,
      `Active listening involves noting key words, repetition and shifts (for example "Now look" marks the move from past to present). Trying to write every word overloads the listener, focusing on accent is a distraction, and judging too early is a listening barrier.`),

    I('1', A_RESEARCH, `Which of the following is a PRIMARY source from which the students could gather information?`,
      [`A textbook on Caribbean marine plants`, `A news article on sargassum on another island`, `Interviews with fishers who work in Charlotteville`, `A website summarising global seaweed research`], 2,
      `A primary source gives first-hand information from people directly involved. The fishers experienced the drop in catches themselves. The textbook, news article and website report or interpret other people's findings, so they are secondary sources.`),
    I('1', A_RESEARCH, `The students want to collect information about income changes from as MANY fishers as possible in a short time. Which instrument would be MOST suitable?`,
      [`Questionnaires`, `Focus groups`, `Observation schedules`, `Document analysis`], 0,
      `Questionnaires are easy to administer to a large number of respondents quickly and produce data that can be compared. Focus groups involve few people, observation cannot show income, and document analysis depends on records that may not exist for individual fishers.`),
    I('1', A_RESEARCH, `The students' findings would be LEAST valid if they`,
      [`included fishers from both Charlotteville and Speyside`, `asked fishers mainly about their opinions on tourism`, `used the same set of questions with every fisher`, `compared present catches with catches three years ago`], 1,
      `Validity means the research measures what it set out to measure. Questions about tourism do not address the effect of sargassum on fishers' income, so the data would not answer the research question. The other options support valid findings.`),
    I('1', A_RESEARCH, `Which of the following would be the MOST reliable SECONDARY source of data on fishers' catches?`,
      [`A fisher's post on social media`, `A tourist's travel blog`, `A radio call-in programme`, `Records kept by the government fisheries department`], 3,
      `Official records are collected systematically over time by an accountable body, so they are consistent and trustworthy. A single social media post, a tourist blog or callers' opinions are anecdotal and may be biased or inaccurate.`),

    I('1', A_EXTRACT, `Which of the following BEST states the main point of the extract?`,
      [`Schoolchildren on the island need bus shelters at every stop.`, `Private cars are the main cause of air pollution on the island.`, `Grenada should invest in a reliable public bus service to improve daily life.`, `Other small islands have better transport systems than Grenada.`], 2,
      `The whole extract builds towards the claim that a scheduled, reliable bus service would ease traffic, lower costs and help workers. The bus shelters and other islands are supporting details, and pollution is not mentioned.`),
    I('1', A_EXTRACT, `The writer's MAIN purpose in the extract is to`,
      [`entertain readers with a story about a bus ride`, `persuade readers that investment in public buses is necessary`, `inform readers about the history of public transport`, `describe the condition of roads in St. George's`], 1,
      `The writer presents a problem, proposes a solution and ends with a challenge to the reader ("can we afford to keep going without one"). These are features of persuasive writing, not narrative, historical or purely descriptive writing.`),
    I('1', A_EXTRACT, `The final two sentences of the extract are effective MAINLY because they use`,
      [`parallel structure to set up a contrast`, `a rhetorical question to involve the reader`, `onomatopoeia to recreate traffic sounds`, `euphemism to soften criticism of the government`], 0,
      `"The question is not whether ... The question is whether ..." repeats the same structure (parallelism) to contrast two ideas, turning the cost argument around. Neither sentence is a question, and there is no sound-word or euphemism.`),
    I('1', A_EXTRACT, `Which of the following MOST enhances the credibility of the extract?`,
      [`It was published in a weekly newspaper.`, `It describes children waiting in the sun.`, `The writer is a transport planner who has advised island governments.`, `It is short and easy to read.`], 2,
      `Credibility depends largely on the writer's expertise. A transport planner with regional advisory experience is qualified to comment on public transport. The emotive image of children appeals to feelings (pathos) but does not prove expertise, and length or publication frequency says little about trustworthiness.`),

    // ---------- MODULE 2 ----------
    I('2', A_DIALOGUE, `Luis's movement from "Sí, muy largo" to English in the same turn is an example of`,
      [`slang`, `jargon`, `register`, `code-switching`], 3,
      `Code-switching is alternating between two languages or varieties within a conversation. Luis moves from Spanish to English. Slang and jargon are types of vocabulary, and register refers to the level of formality.`),
    I('2', A_DIALOGUE, `Shanice says, "When I with my grandmother, I talk one way; when I in the office, I talk another way." This shows that her language choice is influenced MAINLY by`,
      [`gender`, `age`, `social context and relationship with the listener`, `ethnicity`], 2,
      `Shanice changes her speech according to who she is speaking to and where (home versus workplace). This is the influence of context and the relationship between speaker and listener on language choice.`),
    I('2', A_DIALOGUE, `The boss's comment that Luis's English is "too broken" for the front desk reflects the attitude that`,
      [`non-standard varieties are inferior to Standard English`, `Creole languages are complete, rule-governed systems`, `multilingual workers are an asset to the tourism industry`, `Spanish should be the main language of hotels`], 0,
      `Calling a variety "broken" treats it as a faulty version of the standard rather than a legitimate system. This negative attitude to non-standard speech is common in Caribbean workplaces, especially in customer-facing jobs.`),
    I('2', A_DIALOGUE, `In "Some people does look down on how we talk", the word "does" functions as a`,
      [`past tense marker`, `habitual aspect marker`, `future marker`, `plural marker`], 1,
      `In many Eastern Caribbean Creoles, "does" placed before the verb shows that an action happens regularly or habitually. Here it means people habitually look down on Creole speech; it does not mark past time, future time or plurality.`),
    I('2', A_DIALOGUE, `The expressions "the line long" and "When I in the office" illustrate which grammatical feature of Caribbean Creole?`,
      [`Absence of the copula (the verb "to be")`, `Aphesis`, `Metathesis`, `Double negation`], 0,
      `Standard English would say "the line IS long" and "When I AM in the office". Creole commonly omits the copula before adjectives and locations. Aphesis and metathesis are phonological features, and there is no negation here.`),

    I('2', A_SOLO2, `English-lexicon Creoles in the Caribbean developed MAINLY from contact between`,
      [`Amerindian languages and Asian languages`, `European languages and West African languages during slavery and colonisation`, `Spanish and Portuguese during the gold trade`, `Hindi and English after Emancipation`], 1,
      `On plantations, enslaved Africans speaking many West African languages needed to communicate with one another and with English-speaking Europeans. The resulting contact languages became Creoles that took most of their vocabulary from English and much of their structure from African languages.`),
    I('2', A_SOLO2, `In the formation of a Creole, the European language that supplies MOST of the vocabulary is referred to as the`,
      [`substrate`, `adstrate`, `superstrate (lexifier)`, `interlanguage`], 2,
      `The superstrate or lexifier is the socially dominant language that provides most of the words. The substrate is the group of less dominant languages (for example, West African languages) that influenced the grammar and sound system.`),
    I('2', A_SOLO2, `The pronunciation of "afraid" as "'fraid" and "remember" as "'member" is an example of`,
      [`epenthesis`, `metathesis`, `consonant cluster reduction`, `aphesis`], 3,
      `Aphesis is the loss of an unstressed sound or syllable at the beginning of a word. Epenthesis adds a sound, metathesis swaps sounds, and consonant cluster reduction drops a consonant from a group, usually at the end of a word.`),
    I('2', A_SOLO2, `A Creole speaker who pronounces "film" as "fillum" is demonstrating`,
      [`epenthesis`, `aphesis`, `metathesis`, `th-stopping`], 0,
      `Epenthesis is the insertion of an extra sound into a word; here a vowel is added to break up the "lm" cluster. No sound is lost (aphesis), swapped (metathesis) or replaced (th-stopping).`),
    I('2', A_SOLO2, `In the Creole sentence "She did done cook when we reach", the pre-verbal markers "did" and "done" indicate, respectively,`,
      [`future time and progressive aspect`, `past (anterior) time and completed action`, `habitual aspect and plural subject`, `progressive aspect and negation`], 1,
      `"Did" places the event in the past, before another past event, and "done" shows the action was already completed. Together they mean "She had already finished cooking when we arrived".`),
    I('2', A_SOLO2, `A lawyer uses expressions such as "pursuant to" and "hereinafter" when drafting a contract but greets her friends with "Wha' happening?" This change is BEST explained by the concept of`,
      [`register`, `dialect`, `pidgin`, `accent`], 0,
      `Register is the variety of language chosen to suit the situation, purpose and audience, ranging from formal to informal. The lawyer is the same speaker with the same dialect; she adjusts her formality to the context.`),
    I('2', A_SOLO2, `On the Creole continuum, the variety that is CLOSEST to Standard English is the`,
      [`basilect`, `mesolect`, `acrolect`, `idiolect`],2,
      `The acrolect is the most prestigious variety, nearest to the standard. The basilect is furthest from it and the mesolect lies in between. An idiolect is an individual's personal way of speaking, not a point on the continuum.`),
    I('2', A_SOLO2, `The animal called "dog" in English is "hond" in Dutch and "perro" in Spanish. This illustrates that language is`,
      [`systematic`, `dynamic`, `non-instinctive`, `arbitrary`], 3,
      `Language is arbitrary because there is no natural link between a word and what it refers to; each language community agrees on its own label. Different words for the same animal show this clearly.`),
    I('2', A_SOLO2, `During her oral presentation, Kezia folds her arms tightly and avoids looking at her audience. Which communicative behaviour is she displaying?`,
      [`Proxemics`, `Kinesics`, `Chronemics`, `Haptics`], 1,
      `Kinesics is communication through body movement, posture, gestures, facial expression and eye behaviour. Folded arms and avoiding eye contact may signal nervousness or defensiveness. Proxemics is about space, chronemics about time and haptics about touch.`),
    I('2', A_SOLO2, `At a funeral, Mr Hodge wears a black suit and speaks in a low, slow voice. Which TWO communicative behaviours are illustrated?`,
      [`Chromatics and paralanguage`, `Haptics and proxemics`, `Chronemics and kinesics`, `Proxemics and chromatics`], 0,
      `Chromatics is the use of colour to communicate (black signals mourning in many Caribbean cultures). Paralanguage covers vocal features such as pitch, volume and rate, so a low, slow voice signals respect and sorrow.`),

    // ---------- MODULE 3 ----------
    I('3', A_HOTEL, `Mrs Fleming's communication of the decision to her department heads is an example of`,
      [`horizontal communication`, `downward vertical communication`, `upward vertical communication`, `grapevine communication`], 1,
      `Information moving from a manager to subordinates in the organisational structure is downward vertical communication. Horizontal communication occurs between people at the same level, and the grapevine is the informal network.`),
    I('3', A_HOTEL, `When the four department heads meet to agree on a shared training timetable, they are engaging in`,
      [`upward communication`, `downward communication`, `horizontal communication`, `external communication`], 2,
      `The department heads are at the same level in the hotel, so communication among them is horizontal (lateral). It is used to coordinate work across departments.`),
    I('3', A_HOTEL, `Which of the following barriers is the housekeeping staff MOST likely to face in receiving the message?`,
      [`Physical noise in the hotel lobby`, `Semantic barriers caused by medical jargon`, `Psychological barriers caused by grief`, `A language difference and no access to the email channel`], 3,
      `The scenario states that several housekeeping staff speak mainly Spanish and have no work email. Both the language of the message and the channel chosen would prevent them from receiving and understanding it. Nothing suggests noise, medical jargon or grief.`),
    I('3', A_HOTEL, `Which of the following would be the MOST effective way to repair the barrier faced by the housekeeping staff?`,
      [`A short face-to-face briefing with a Spanish-speaking supervisor, plus a printed notice in Spanish and English`, `A longer email with more detailed instructions in English`, `A notice placed on the hotel's public website`, `A reminder sent to the department heads' email accounts only`], 0,
      `Repair must address both causes: a face-to-face channel removes the dependence on email and allows immediate feedback, while Spanish interpretation and a bilingual notice remove the language barrier. The other options still rely on email or English only.`),
    I('3', A_HOTEL, `Mrs Fleming sends a single email to her department heads and does not invite questions or replies. Which model of communication BEST describes this?`,
      [`Transactional model`, `Linear model`, `Interactive model`, `Circular feedback model`], 1,
      `The linear model (for example, Shannon and Weaver) sees communication as a one-way flow from sender to receiver with no feedback. The interactive and transactional models include feedback and exchange between participants.`),

    I('3', A_VIDEO, `The video of Mr Lake is BEST described as`,
      [`satire`, `parody`, `a deepfake`, `an editorial`], 2,
      `A deepfake is audio or video manipulated with artificial intelligence to make a real person appear to say or do something they did not. The realistic face and voice and the candidate's denial point to a deepfake, not humour (satire, parody) or opinion writing (editorial).`),
    I('3', A_VIDEO, `The caption "Everybody already voting against Lake. Don't be the last one left behind!" uses which propaganda technique?`,
      [`Bandwagon`, `Testimonial`, `Plain folks`, `Glittering generalities`], 0,
      `The bandwagon technique persuades people to act because "everyone else" is doing so, playing on the fear of being left out. Testimonial uses a famous person's endorsement, plain folks presents the speaker as ordinary, and glittering generalities use vague virtue words.`),
    I('3', A_VIDEO, `Residents who forward the video to their friends because they genuinely believe it is real are spreading`,
      [`disinformation`, `propaganda`, `malinformation`, `misinformation`], 3,
      `Misinformation is false information shared without the intention to deceive. The people who created the video to mislead voters spread disinformation, but residents who honestly believe it are passing on misinformation.`),
    I('3', A_VIDEO, `Releasing the video two days before the by-election, when there is little time for it to be checked, takes advantage of`,
      [`ethos`, `logos`, `kairos`, `pathos`], 2,
      `Kairos is the appeal to timing, using the most opportune moment to have an effect. The video is timed so that voters see it close to the vote and before it can be disproved.`),
    I('3', A_VIDEO, `Which of the following is the MOST responsible action for a voter who receives the video?`,
      [`Share it in family groups to ask what others think`, `Check whether reputable news outlets and the candidate's official channels have confirmed or denied it`, `Accept it as true because the face and voice look real`, `Judge its accuracy by the number of times it has been shared`], 1,
      `Verifying content against credible, accountable sources is the best defence against fake news. Sharing spreads it further, realism can be faked, and popularity is not evidence of truth.`),

    I('3', A_SPEECH, `Which of the following should Akeem consider when profiling his audience?<br><br>I. The parents' existing knowledge of plastic pollution<br>II. The parents' likely concerns about cost<br>III. Akeem's own favourite environmental slogans`,
      [`I only`, `I and II only`, `II and III only`, `I, II and III`], 1,
      `Audience profiling focuses on the listeners: what they already know, what they value and what objections they may have. Akeem's own preferences (III) are about the speaker, not the audience.`),
    I('3', A_SPEECH, `Akeem plans to say, "Our canteen uses about 400 plastic containers each week, which is more than 15 000 in one school year." This statement is an appeal to`,
      [`logos`, `pathos`, `ethos`, `kairos`], 0,
      `Logos is the appeal to logic and evidence, such as statistics and facts. The figures build a reasoned case rather than appealing to emotion (pathos), the speaker's credibility (ethos) or timing (kairos).`),
    I('3', A_SPEECH, `Which organisational strategy would be MOST suitable for Akeem's persuasive speech?`,
      [`Chronological order`, `Problem and solution`, `Spatial order`, `Classification`], 1,
      `A persuasive speech that seeks support for a change works well when it first establishes a problem (plastic waste) and then presents the proposed solution (a ban with reusable containers). The other patterns suit narrative, descriptive or explanatory speeches.`),

    I('3', A_SOLO3, `The idea that electronic media have connected people worldwide so that events in one place can be experienced almost instantly everywhere is referred to as the`,
      [`digital divide`, `information overload`, `netiquette`, `global village`], 3,
      `Marshall McLuhan used "global village" to describe how electronic media shrink distance, making the world behave like one small community. The digital divide is unequal access to technology, information overload is having too much information, and netiquette is online etiquette.`),
    I('3', A_SOLO3, `Which of the following is an example of intrapersonal communication?`,
      [`A teacher addressing the whole school at assembly`, `Two friends chatting on the bus`, `A student silently thinking through how to answer an interview question`, `A minister speaking to the nation on television`], 2,
      `Intrapersonal communication takes place within oneself, such as thinking, reflecting or self-talk. The others are public, interpersonal and mass communication respectively.`)
  ];

  (window.COURSE_PAPERS = window.COURSE_PAPERS || []).push({
    kind: 'p1', id: `P1A`, title: `Paper 01 · Practice Paper A`, time: 90,
    intro: INTRO('A'),
    items: P1A_items
  });

  // ===================== PAPER B =====================
  const B_LISTEN = `<p><i>Items 1–7. In the examination this speech is read aloud twice. Listen carefully before answering.</i></p>
<blockquote><b>Before the Wind Comes</b><br>
Good evening, neighbours. Some of you were here for Irma. Some of you were not.<br>
Those of us who were here remember the roar, like a freight train that would not stop passing.<br>
We remember roofs lifting like the lids of pots.<br>
We remember, too, the neighbour who shared her water, the stranger who cleared our road.<br>
So tonight I am not here to frighten you. I am here to prepare you.<br>
Check your shutters in June, not in September.<br>
Store water for three days, not three hours.<br>
Know which neighbour lives alone, and knock on that door.<br>
Because the storm will test our roofs, but it will also test our hearts.<br>
And I know which of those two this community will never lose.</blockquote>
<p style="font-size:.85em">Original speech written for this practice paper. It is delivered by a community council member at a meeting in Road Town, Tortola.</p>`;

  const B_RESEARCH = `<p><i>Read the following scenario carefully and then answer Items 8–11.</i></p>
<p>The Ministry of Education wants to find out why many secondary students in Guyana arrive late for the first class of the day. A research team will collect data from students, parents and school administrators in four schools over one term.</p>`;

  const B_EXTRACT = `<p><i>Read the following extract carefully and then answer Items 12–15.</i></p>
<blockquote>Mangroves are often dismissed as muddy, mosquito-filled swamps. In fact, they are among the hardest-working ecosystems on the island. Their tangled roots trap sediment that would otherwise cloud coral reefs. They provide nurseries where young snapper and lobster grow safely before moving out to sea. During storms, a healthy mangrove belt absorbs the force of waves and protects homes behind it. When mangroves are cleared for marinas and parking lots, all of these services disappear at once: reefs choke, fish stocks fall and the coastline becomes exposed. Protecting what remains of our mangroves on Ambergris Caye is therefore not a luxury for nature lovers. It is a practical investment in the island's food, economy and safety.</blockquote>
<p style="font-size:.85em"><b>SOURCE:</b> Adapted from Marisol Hazel, "The Island's Quiet Guardians", <i>Caribbean Environment Review</i>, 2024. Marisol Hazel is a marine biologist who has studied Caribbean coastal wetlands for fifteen years.</p>`;

  const B_DIALOGUE = `<p><i>Read the following dialogue carefully and then answer Items 16–20.</i></p>
<p>Two students, Tevin from St. Kitts and Mireille from St. Lucia, are chatting during a regional youth conference in Bridgetown.</p>
<blockquote>
<b>Tevin:</b> Mireille, me aks the waiter fuh tea and he bring coffee! He nuh understand me at all.<br>
<b>Mireille:</b> Ou pa ka konprann? Sorry, I mean, you think he didn't understand you? In St. Lucia, my grandmother speaks Kwéyòl to me but my teachers always told us to use English in class.<br>
<b>Tevin:</b> Same thing by me. But now people does post in dialect on Instagram all the time.<br>
<b>Mireille:</b> True. Last week our Prime Minister even used a Kwéyòl proverb in a speech. The crowd loved it.
</blockquote>`;

  const B_SOLO2 = `<p><i>Select the most appropriate answer for Items 21–30.</i></p>`;

  const B_CAMPAIGN = `<p><i>Read the following scenario carefully and then answer Items 31–35.</i></p>
<p>A youth health network in Dominica is planning a three-month campaign to reduce the consumption of sugary drinks among students aged 12–18. The coordinator, Ms Nadine Arrindell, must first write to the Minister of Public Health requesting funding, then design messages that will reach students in their schools and online.</p>`;

  const B_MEETING = `<p><i>Read the following scenario carefully and then answer Items 36–40.</i></p>
<p>At a staff meeting, Mr Brooks, the vice principal, explains a new examination timetable. The air-conditioning unit is rattling loudly. Mr Brooks uses terms such as "modular sittings" and "concurrent windows" without explaining them. Several teachers who are already upset about extra supervision duties stop listening. Ms Lake, at the back, nods but later admits she misunderstood the dates.</p>`;

  const B_TECH = `<p><i>Read the following scenario carefully and then answer Items 41–43.</i></p>
<p>Zara, a CAPE student, is preparing a heritage project about traditional Curaçao Carnival costume-making for an audience of young people living in the diaspora in the Netherlands and the United States.</p>`;

  const B_SOLO3 = `<p><i>Select the most appropriate answer for Items 44 and 45.</i></p>`;

  const P1B_items = [
    // ---------- MODULE 1 ----------
    I('1', B_LISTEN, `The MAIN purpose of the speech is to`,
      [`recount the damage caused by Hurricane Irma`, `encourage residents to prepare for storms and look out for one another`, `criticise the government for its response to past hurricanes`, `entertain residents with memories of the past`], 1,
      `The speaker states directly, "I am not here to frighten you. I am here to prepare you," and gives practical instructions (check shutters, store water, check on neighbours). Memories of Irma support the purpose; they are not the purpose itself.`),
    I('1', B_LISTEN, `Which device is used in the line "roofs lifting like the lids of pots"?`,
      [`Metaphor`, `Personification`, `Simile`, `Hyperbole`], 2,
      `The comparison between roofs and pot lids is made with "like", which makes it a simile. It creates a vivid, familiar image of how easily roofs were torn away.`),
    I('1', B_LISTEN, `The repetition of "We remember" at the start of successive lines is an example of`,
      [`anaphora`, `alliteration`, `irony`, `onomatopoeia`], 0,
      `Anaphora is the repetition of a word or phrase at the beginning of successive lines or clauses. It builds rhythm and stresses shared experience. Alliteration repeats initial consonant sounds within a line, which is not the main effect here.`),
    I('1', B_LISTEN, `The lines "Check your shutters in June, not in September" and "Store water for three days, not three hours" are effective MAINLY because they`,
      [`use technical vocabulary to impress the audience`, `describe the history of hurricane seasons`, `exaggerate the dangers of storms`, `use short, contrasting instructions that are easy to remember`], 3,
      `Each line is a brief command with a built-in contrast (June/September, days/hours). This makes the advice clear and memorable for listeners, which is important in an oral message. The language is simple, not technical or exaggerated.`),
    I('1', B_LISTEN, `The line "the storm will test our roofs, but it will also test our hearts" suggests that`,
      [`community spirit is as important as physical preparation`, `houses in Road Town are poorly built`, `residents should be afraid of the coming season`, `the speaker does not trust the residents`], 0,
      `The parallel phrases link physical damage (roofs) with community values (hearts). The speaker is saying that kindness and solidarity matter as much as shutters and water.`),
    I('1', B_LISTEN, `Which of the following BEST describes the tone of the speech?`,
      [`Fearful and hopeless`, `Sarcastic and bitter`, `Reassuring and urging`, `Neutral and detached`], 2,
      `The speaker calms the audience ("not here to frighten you") and expresses confidence in the community, while firmly urging them to act. There is no sarcasm, hopelessness or detachment.`),
    I('1', B_LISTEN, `A listener in the meeting misses some of the instructions because she is planning what she will say during question time. This is an example of`,
      [`selective listening due to bias`, `a physical barrier to listening`, `rehearsing a response instead of listening`, `information overload from the speaker`], 2,
      `Preparing one's own reply while someone is still speaking is a common internal barrier to effective listening. Attention is divided, so parts of the message are lost. There is no bias, physical noise or excessive information mentioned.`),

    I('1', B_RESEARCH, `Which method would BEST allow the researchers to see directly what happens at the school gate each morning?`,
      [`Questionnaires`, `Observation`, `Telephone interviews`, `Document analysis`], 1,
      `Observation allows researchers to witness behaviour as it naturally occurs, such as when students arrive and what delays them. The other methods depend on what people report or on existing records.`),
    I('1', B_RESEARCH, `The researchers use the same questionnaire in all four schools and get similar results when they repeat it a month later. This shows that the instrument is`,
      [`valid`, `biased`, `credible`, `reliable`], 3,
      `Reliability refers to consistency: an instrument is reliable if it produces similar results when used again under similar conditions. Validity is whether it measures what it is meant to measure.`),
    I('1', B_RESEARCH, `Which of the following is a DISADVANTAGE of using interviews with parents in this research?`,
      [`They allow follow-up questions.`, `They allow the researcher to clarify questions.`, `They are time-consuming and may be influenced by the interviewer.`, `They provide detailed, in-depth responses.`], 2,
      `Interviews take a long time to conduct and transcribe, and the interviewer's tone or wording may influence answers (interviewer bias). The other options are advantages of interviews.`),
    I('1', B_RESEARCH, `Which of the following would provide the MOST credible data on how often students are late?`,
      [`Official school attendance registers`, `Students' posts on social media`, `A newspaper letter written by a parent`, `Opinions shared on a radio talk show`], 0,
      `Attendance registers are official, systematic records kept daily by the school, so they are accurate and accountable. The other sources are personal opinions and may be exaggerated or incomplete.`),

    I('1', B_EXTRACT, `Which of the following is the BEST summary of the main point of the extract?`,
      [`Mangroves are muddy places full of mosquitoes.`, `Marinas and parking lots are needed for the island's economy.`, `Young snapper and lobster grow in mangroves.`, `Mangroves provide vital services, so protecting them is a practical investment for the island.`], 3,
      `A good summary captures the overall claim, not a single detail. The writer lists the services mangroves provide and concludes that protecting them supports food, economy and safety. Option A is the view the writer rejects, and C is only one supporting detail.`),
    I('1', B_EXTRACT, `The sentence "When mangroves are cleared ... reefs choke, fish stocks fall and the coastline becomes exposed" is organised MAINLY by`,
      [`chronological order`, `cause and effect`, `spatial order`, `definition`], 1,
      `The sentence shows what results (effects) when mangroves are removed (cause). There is no time sequence, description of space or definition of a term.`),
    I('1', B_EXTRACT, `The writer opens with the view that mangroves are "muddy, mosquito-filled swamps" MAINLY in order to`,
      [`introduce a common misconception that she will then challenge`, `persuade readers to avoid visiting Ambergris Caye`, `show that she agrees with developers`, `describe the scenery of the island`], 0,
      `The writer immediately follows with "In fact", showing that she is setting up a popular but mistaken belief so that she can correct it. This contrast technique makes her argument more striking.`),
    I('1', B_EXTRACT, `Which of the following MOST supports the credibility of the extract?`,
      [`The extract uses vivid words such as "choke".`, `The writer mentions a specific place, Ambergris Caye.`, `The writer is a marine biologist with fifteen years' experience studying coastal wetlands.`, `The extract was adapted for a practice paper.`], 2,
      `The writer's qualifications and long experience in the exact field she is writing about make her a trustworthy source. Vivid language and place names add interest but do not establish expertise.`),

    // ---------- MODULE 2 ----------
    I('2', B_DIALOGUE, `Tevin's pronunciation of "ask" as "aks" is an example of`,
      [`aphesis`, `epenthesis`, `metathesis`, `vowel lengthening`], 2,
      `Metathesis is the reversal of the order of sounds in a word; the "s" and "k" sounds in "ask" are swapped to give "aks". No sound is dropped (aphesis) or added (epenthesis).`),
    I('2', B_DIALOGUE, `Tevin's statement "He nuh understand me" shows which grammatical feature of Caribbean Creole?`,
      [`Use of a pre-verbal negator`, `Plural marking with "dem"`, `Use of the habitual marker "does"`, `Reduplication for emphasis`], 0,
      `In many Caribbean Creoles, negation is shown by a particle such as "nuh", "no" or "doh" placed directly before the verb, rather than by "does not" or "did not" as in Standard English.`),
    I('2', B_DIALOGUE, `Kwéyòl, which Mireille's grandmother speaks, is BEST described as`,
      [`an English-lexicon Creole`, `a dialect of Standard French`, `an indigenous Caribbean language`, `a French-lexicon Creole`], 3,
      `St. Lucian Kwéyòl draws most of its vocabulary from French (its lexifier), while its grammar was shaped by West African languages. It is a Creole language in its own right, not a dialect of French, and not indigenous.`),
    I('2', B_DIALOGUE, `Mireille's teachers insisting that students "use English in class" reflects the attitude that`,
      [`Kwéyòl is the language of national identity`, `Standard English is the language of education and advancement`, `Creole should be taught as a foreign language`, `English and Kwéyòl have equal status in schools`], 1,
      `Many Caribbean education systems have treated Standard English as the language of schooling, examinations and social mobility, while Creole was discouraged in the classroom. This is an attitude shaped by colonial history.`),
    I('2', B_DIALOGUE, `The Prime Minister's use of a Kwéyòl proverb, and the crowd's positive response, illustrates which function of language?`,
      [`Expressing and reinforcing cultural identity`, `Transmitting technical information`, `Excluding outsiders from the group`, `Recording historical events`], 0,
      `Using a Creole proverb in a public speech signals pride in a shared heritage and builds solidarity with the audience. It shows language as a marker of national and cultural identity, which reflects more positive modern attitudes to Creole.`),

    I('2', B_SOLO2, `In which of the following territories is Papiamentu an official language?`,
      [`Sint Maarten and Saba`, `Suriname and Guyana`, `Aruba and Curaçao`, `Martinique and Guadeloupe`], 2,
      `Papiamentu, a Creole with Portuguese, Spanish, Dutch and African influences, is an official language in Aruba, Curaçao and Bonaire. Sint Maarten's main languages are English and Dutch, Suriname's national lingua franca is Sranan Tongo, and Martinique and Guadeloupe use French and French Creole.`),
    I('2', B_SOLO2, `A child born in Aruba learns to speak naturally only after hearing Papiamento, Dutch and Spanish spoken around her. This shows that language is`,
      [`arbitrary`, `non-instinctive (acquired)`, `symbolic`, `static`], 1,
      `Language is non-instinctive: humans have the capacity for language but must learn a specific language through exposure in a community. No child is born speaking a particular language.`),
    I('2', B_SOLO2, `The words "selfie", "unfriend" and "livestream" have recently entered everyday Caribbean speech. This illustrates that language is`,
      [`dynamic`, `arbitrary`, `systematic`, `maturational`], 0,
      `A dynamic language changes over time, adding new words to meet new needs (here, social media). Maturational refers to how an individual's language develops as they grow.`),
    I('2', B_SOLO2, `In many Caribbean Creoles, "thing" is pronounced "ting" and "that" is pronounced "dat". This phonological feature is known as`,
      [`aphesis`, `consonant cluster reduction`, `metathesis`, `th-stopping`], 3,
      `Th-stopping replaces the "th" sounds of Standard English with the stop consonants /t/ and /d/. It is one of the most widespread phonological features of English-lexicon Caribbean Creoles.`),
    I('2', B_SOLO2, `The Creole expressions "pretty-pretty" (very pretty) and "fool-fool" (very foolish) illustrate`,
      [`calquing`, `reduplication`, `aphesis`, `serial verbs`], 1,
      `Reduplication is the repetition of a word to intensify or change its meaning. It is a lexical and grammatical feature found in many Caribbean Creoles and in West African languages.`),
    I('2', B_SOLO2, `In the sentence "Dem a play cricket", the word "a" marks`,
      [`completed action`, `future time`, `progressive (continuous) action`, `plural nouns`], 2,
      `In many English-lexicon Creoles, "a" (or "de", "ah") before the verb shows an ongoing action, equivalent to "They are playing cricket". Completed action is marked by "done", and future by "go" or "gwine".`),
    I('2', B_SOLO2, `When doctors at a hospital discuss a patient's "hypertension" and "BP readings" with one another, they are using`,
      [`slang`, `dialect`, `jargon`, `Creole`], 2,
      `Jargon is the specialised vocabulary of a profession or field. It allows experts to communicate precisely among themselves but may confuse outsiders such as patients.`),
    I('2', B_SOLO2, `Which of the following factors MOST influences a person's attitude towards Creole in the Caribbean?`,
      [`The weather in the territory`, `The person's height and age at school entry`, `The number of vowels in Creole words`, `The history of colonialism and the link between language and social class`], 3,
      `Attitudes to Creole have been shaped by colonial history, in which European languages were associated with power and education and Creole with enslaved and working-class people. These associations with social class continue to influence attitudes.`),
    I('2', B_SOLO2, `At a job interview, Kyle sits very close to the interviewer and touches her arm while speaking. Which TWO communicative behaviours are being displayed?`,
      [`Chronemics and chromatics`, `Proxemics and haptics`, `Kinesics and chronemics`, `Paralanguage and proxemics`], 1,
      `Proxemics is the use of personal space (sitting very close), and haptics is communication through touch (touching her arm). In a formal interview, both may be seen as inappropriate.`),
    I('2', B_SOLO2, `Arriving thirty minutes late to a business meeting may be interpreted as a lack of respect. This is an aspect of`,
      [`chronemics`, `kinesics`, `haptics`, `chromatics`], 0,
      `Chronemics is the study of how time is used and perceived in communication, including punctuality and waiting time. Attitudes to time vary across cultures and contexts.`),

    // ---------- MODULE 3 ----------
    I('3', B_CAMPAIGN, `Ms Arrindell's request to the Minister for funding should be presented in the form of a`,
      [`text message`, `formal letter accompanied by a proposal`, `social media post`, `memo`], 1,
      `A request to a government minister requires a formal written channel. A formal letter introduces the request, and a proposal sets out the problem, objectives, activities and budget. Memos are for internal use within an organisation.`),
    I('3', B_CAMPAIGN, `Which section of the proposal should explain WHY the campaign is needed?`,
      [`The budget`, `The timeline`, `The statement of the problem (rationale)`, `The list of references`], 2,
      `The rationale or statement of the problem gives the background and evidence showing that sugary-drink consumption among students is a concern. The budget and timeline describe cost and schedule.`),
    I('3', B_CAMPAIGN, `To reach students aged 12–18 MOST effectively, which combination of channels would be BEST for the campaign?`,
      [`Newspaper advertisements and radio news`, `Billboards and letters to parents`, `Television documentaries and printed brochures`, `School assemblies and short videos on popular social media platforms`], 3,
      `Audience profiling shows that teenagers spend much of their time at school and on social media. Combining face-to-face assemblies with short videos on platforms they use places the message where the audience already is.`),
    I('3', B_CAMPAIGN, `A campaign poster shows a popular local soca artist saying, "I swapped soda for water, and so can you." This is an example of`,
      [`testimonial`, `name-calling`, `card stacking`, `plain folks`], 0,
      `A testimonial uses a well-known or admired person to endorse a product or idea. Students who admire the artist may be persuaded to follow his example.`),
    I('3', B_CAMPAIGN, `A message that shows a young person's damaged teeth with the caption "This could be your smile" relies MAINLY on`,
      [`logos`, `ethos`, `kairos`, `pathos`], 3,
      `Pathos appeals to the audience's emotions, here fear and concern about appearance. It does not present statistics (logos), establish the speaker's credibility (ethos) or rely on timing (kairos).`),

    I('3', B_MEETING, `The rattling air-conditioning unit is an example of`,
      [`semantic noise`, `physical noise`, `psychological noise`, `physiological noise`], 1,
      `Physical (external) noise is any sound or environmental distraction that interferes with the transmission of the message. Semantic noise relates to meaning and psychological noise to the receiver's emotions or attitudes.`),
    I('3', B_MEETING, `Mr Brooks's use of "modular sittings" and "concurrent windows" without explanation creates a`,
      [`semantic barrier`, `cultural barrier`, `physical barrier`, `physiological barrier`], 0,
      `A semantic barrier occurs when the receiver does not share the sender's understanding of words or terms, such as unexplained jargon. The teachers cannot decode the message accurately.`),
    I('3', B_MEETING, `The teachers who "stop listening" because they are upset about extra duties are affected by`,
      [`a physical barrier`, `a technological barrier`, `a psychological barrier`, `a linguistic barrier`], 2,
      `Psychological barriers arise from the receiver's emotions, attitudes or prejudices. The teachers' resentment prevents them from paying attention to the message.`),
    I('3', B_MEETING, `Ms Lake's nod, even though she misunderstood, shows that`,
      [`feedback was clear and accurate`, `the message was encoded correctly`, `the channel was inappropriate`, `the sender should check understanding rather than rely on non-verbal feedback alone`], 3,
      `A nod can be misleading feedback. Mr Brooks should confirm understanding, for example by asking teachers to restate key dates or by following up with a written timetable.`),
    I('3', B_MEETING, `Which of the following would BEST repair the communication problems at the meeting?<br><br>I. Moving to a quieter room or switching off the unit<br>II. Defining the technical terms and giving a written copy of the timetable<br>III. Speaking faster to finish the meeting quickly`,
      [`I and II only`, `I and III only`, `II and III only`, `I, II and III`], 0,
      `Option I removes the physical noise and option II removes the semantic barrier while giving a permanent record. Speaking faster (III) would make understanding harder and does not address any barrier.`),

    I('3', B_TECH, `Which of the following would be the MOST effective digital medium for Zara to show the step-by-step making of a costume to her audience?`,
      [`A printed brochure`, `A radio interview`, `A short video posted on a video-sharing platform`, `A text message`], 2,
      `Video combines sound, moving images and demonstration, which suits a step-by-step craft process. A video-sharing platform is also easily accessible to young people abroad. Radio and text cannot show the process visually.`),
    I('3', B_TECH, `Which of the following BEST explains why digital media technology is suitable for Zara's audience?`,
      [`It removes the need for any planning.`, `It allows young people overseas to access and share the content instantly from anywhere.`, `It guarantees that every viewer will agree with the content.`, `It is the only form of communication young people understand.`], 1,
      `Digital media overcomes distance, allowing the diaspora audience to view, comment on and share the content at any time. This connects them to their cultural heritage, an example of the global village.`),
    I('3', B_TECH, `Which of the following is a POSSIBLE disadvantage of using social media to share Zara's work?`,
      [`The content may be copied or used without permission.`, `The audience can respond with comments.`, `The content can include images and sound.`, `The work can reach many people at little cost.`], 0,
      `Once posted online, content can easily be downloaded, altered or reused without credit, raising issues of copyright and ownership. The other options are advantages of social media.`),

    I('3', B_SOLO3, `In the communication process, the stage in which the receiver interprets the sender's message is called`,
      [`encoding`, `transmitting`, `decoding`, `feedback`], 2,
      `Decoding is the receiver's interpretation of the symbols (words, gestures, images) into meaning. Encoding is done by the sender, transmitting is sending through a channel, and feedback is the receiver's response.`),
    I('3', B_SOLO3, `Which model of communication sees both participants as sending and receiving messages at the same time, within a shared context?`,
      [`Linear model`, `Shannon and Weaver model`, `Aristotle's model`, `Transactional model`], 3,
      `The transactional model views communication as simultaneous: participants are communicators who encode and decode at the same time, influenced by context and their fields of experience. Linear models (including Shannon and Weaver and Aristotle's) show one-way flow.`)
  ];

  (window.COURSE_PAPERS = window.COURSE_PAPERS || []).push({
    kind: 'p1', id: `P1B`, title: `Paper 01 · Practice Paper B`, time: 90,
    intro: INTRO('B'),
    items: P1B_items
  });
})();
