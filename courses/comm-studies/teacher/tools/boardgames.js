/* Game Night: two classroom board games for CAPE Communication Studies.
   Plugin view id: board. Self-contained: no network; art in inline SVG/CSS, sound via WebAudio.
   1) Ladders & Snakes: Road to Grade One  (quiz board, 1–4 pass-and-play or solo vs computer)
   2) Tug of Words: Pull Up Showdown       (team buzzer mode or solo vs computer) */
(function () {
  const CSS = `
.bg-wrap{display:flex;flex-direction:column;gap:16px;min-width:0}
.bg-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.bg-hero{background:radial-gradient(420px 220px at 92% 0%,rgba(255,215,102,.32),transparent 70%),radial-gradient(360px 240px at 0% 100%,rgba(79,209,224,.16),transparent 70%),linear-gradient(160deg,#132d70,#0a1638 72%)}
.bg-hero h1{margin:0}
.bg-gtiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px}
.bg-gtile{display:flex;flex-direction:column;align-items:stretch;gap:8px;text-align:left;padding:0 0 16px;overflow:hidden}
.bg-gtile>:not(.bg-art){margin-left:16px;margin-right:16px}
.bg-art{display:block;width:100%;aspect-ratio:2/1;background:#0a1638;border-bottom:1px solid rgba(255,215,102,.3)}
.bg-art svg{display:block;width:100%;height:100%}
.bg-gtile .ribbon{align-self:flex-start}
.bg-best{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}
.bg-stat{background:var(--raise);border:1px solid var(--line);border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:2px;min-width:0}
.bg-stat b{color:var(--gold);font-variant-numeric:tabular-nums}
.bg-set{display:grid;gap:16px}
.bg-set h4{margin:0 0 8px}
.bg-prow{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:10px;border-radius:14px;background:var(--raise);border:1px solid var(--line)}
.bg-prow .search{flex:1 1 150px;min-width:0;width:auto}
.bg-sws{display:flex;flex-wrap:wrap;gap:6px}
.bg-sw{width:34px;height:34px;border-radius:50%;border:3px solid rgba(255,255,255,.22);padding:0;cursor:pointer;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.8) 0 9%,transparent 42%),radial-gradient(circle at 60% 75%,rgba(0,0,0,.3),transparent 62%),var(--c);box-shadow:0 3px 0 rgba(0,0,0,.35)}
.bg-sw.sel{border-color:#fff;box-shadow:0 0 0 3px var(--gold),0 3px 0 rgba(0,0,0,.35)}
.bg-sw:disabled{opacity:.25;cursor:not-allowed}
.bg-tokprev{flex:0 0 auto;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;font-weight:800;color:#0a1433;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.85) 0 10%,transparent 45%),radial-gradient(circle at 60% 72%,rgba(0,0,0,.3),transparent 62%),var(--c);box-shadow:0 3px 0 rgba(0,0,0,.4),inset 0 -3px 6px rgba(0,0,0,.2)}
.bg-play{display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,290px);grid-template-areas:"board ctrl" "board plist";gap:16px;align-items:start}
.bg-ctrl{grid-area:ctrl;display:flex;flex-direction:column;gap:12px}
.bg-plist{grid-area:plist;display:flex;flex-direction:column;gap:10px}
.bg-boardwrap{grid-area:board;perspective:1500px;min-width:0;padding:2px 0 8px}
.bg-board{transform:rotateX(11deg);transform-origin:50% 70%;filter:drop-shadow(0 22px 24px rgba(0,0,0,.55));max-width:660px;margin:0 auto}
.bg-board svg{display:block;width:100%;height:auto}
.bg-board text{font-family:var(--f-body);font-weight:700}
.bg-turn{display:flex;align-items:center;gap:10px;min-width:0}
.bg-turn>div{display:flex;flex-direction:column;min-width:0}
.bg-turn b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bg-dicerow{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.bg-dice{width:64px;height:64px;perspective:420px;flex:0 0 auto}
.bg-dice.bg-bounce{animation:bgBounce 1s ease-out}
.bg-cube{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 1s cubic-bezier(.15,.85,.25,1)}
.bg-face{position:absolute;inset:0;border-radius:13px;display:grid;grid-template:repeat(3,1fr)/repeat(3,1fr);padding:9px;box-sizing:border-box;background:radial-gradient(circle at 30% 22%,#fff,#f6ecd2 55%,#dcc893);box-shadow:inset 0 0 0 2px rgba(120,90,20,.25),inset -4px -6px 10px rgba(0,0,0,.16);backface-visibility:hidden}
.bg-face i{display:block;width:11px;height:11px;margin:auto;border-radius:50%;background:radial-gradient(circle at 35% 30%,#3b5bb5,#0a1638 70%);box-shadow:inset 0 1px 1px rgba(0,0,0,.6)}
.bg-f1 i{background:radial-gradient(circle at 35% 30%,#ff8a7a,#b8231a 70%);width:15px;height:15px}
.bg-f1{transform:translateZ(32px)}.bg-f6{transform:rotateY(180deg) translateZ(32px)}.bg-f3{transform:rotateY(90deg) translateZ(32px)}.bg-f4{transform:rotateY(-90deg) translateZ(32px)}.bg-f2{transform:rotateX(90deg) translateZ(32px)}.bg-f5{transform:rotateX(-90deg) translateZ(32px)}
.bg-roll{flex:1 1 120px}
.bg-log{margin:0;min-height:2.6em}
kbd.bg-k,.bg-k{display:inline-grid;place-items:center;min-width:1.5em;height:1.5em;padding:0 4px;border-radius:6px;border:1px solid currentColor;opacity:.75;font:inherit;font-size:.78em;line-height:1;margin-left:4px}
.bg-pl{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;background:var(--raise);border:1px solid var(--line)}
.bg-pl.on{border-color:var(--gold);box-shadow:0 0 0 2px rgba(255,215,102,.25)}
.bg-pl .bg-tokprev{width:32px;height:32px;font-size:.85rem}
.bg-pl span.n{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bg-pl b{color:var(--gold);font-variant-numeric:tabular-nums}
.bg-legend{display:flex;flex-direction:column;gap:4px;margin:0}
.bg-tok{transition:none}
.bg-ring{transform-box:fill-box;transform-origin:center;animation:bgPulse 1.3s ease-in-out infinite}
.bg-modal{position:fixed;inset:0;z-index:48;display:grid;place-items:center;padding:16px;background:rgba(4,9,26,.62);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}
.bg-qcard{width:min(640px,100%);max-height:calc(100vh - 32px);overflow:auto;box-sizing:border-box}
.bg-pop{animation:bgPop .28s ease-out}
.bg-qtext{font-size:1.1rem;line-height:1.45;font-weight:700;margin:4px 0 10px}
.bg-qhead{display:flex;align-items:center;gap:12px}
.bg-qhead .bg-qicon{flex:0 0 auto;width:52px;height:52px;border-radius:16px;display:grid;place-items:center;font-size:1.8rem;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.35),rgba(255,215,102,.16) 45%,rgba(10,20,51,.35));box-shadow:0 3px 0 rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.25)}
.bg-qhead h3{margin:0}
.bg-win{text-align:center}
.bg-win .row{justify-content:center}
.bg-trophy{font-size:4.2rem;line-height:1;display:inline-block;animation:bgTrophy 1.6s ease-in-out infinite;filter:drop-shadow(0 8px 10px rgba(0,0,0,.45))}
.bg-conf{position:fixed;inset:0;pointer-events:none;z-index:49;overflow:hidden}
.bg-conf i{position:absolute;top:-24px;width:10px;height:15px;border-radius:2px;animation:bgFall linear forwards}
.bg-tw{display:flex;flex-direction:column;gap:14px;min-width:0}
.bg-arena{position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,215,102,.35);box-shadow:inset 0 2px 18px rgba(0,0,0,.55),0 12px 28px -14px rgba(0,0,0,.85),0 3px 0 rgba(0,0,0,.35);background:#0a1638}
.bg-arena svg{display:block;width:100%;height:auto}
.bg-arena text{font-family:var(--f-display);font-weight:800}
#bg-rope{transition:transform .75s cubic-bezier(.3,1.35,.5,1)}
.bg-fi{transform-box:fill-box;transform-origin:50% 100%;animation:bgSway 1.7s ease-in-out infinite}
.bg-fi.heave{animation:bgHeave .8s ease-out}
.bg-fi.stumble{animation:bgStumble .8s ease-out}
.bg-flag{transform-box:fill-box;transform-origin:50% 0;animation:bgFlut 1.1s ease-in-out infinite}
.bg-twgrid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2.4fr) minmax(0,1fr);grid-template-areas:"a q b";gap:14px;align-items:start}
.bg-pa{grid-area:a}.bg-pb{grid-area:b}.bg-qa{grid-area:q}
.bg-panel{display:flex;flex-direction:column;gap:10px;align-items:stretch;text-align:center;border-top:6px solid var(--tc)}
.bg-panel h3{margin:0;overflow-wrap:anywhere}
.bg-score{display:flex;justify-content:center;gap:8px;flex-wrap:wrap}
.bg-buzz{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;width:100%;min-height:110px;border:0;border-radius:28px;cursor:pointer;color:#0a1433;font:inherit;font-weight:800;background:radial-gradient(circle at 50% 28%,rgba(255,255,255,.75) 0 12%,transparent 45%),var(--tc);box-shadow:0 8px 0 var(--td),0 16px 26px rgba(0,0,0,.45),inset 0 3px 0 rgba(255,255,255,.4),inset 0 -8px 14px rgba(0,0,0,.18);transition:transform .08s,box-shadow .08s}
.bg-buzz .big{font-size:2rem;line-height:1}
.bg-buzz:active:not(:disabled){transform:translateY(6px);box-shadow:0 2px 0 var(--td),0 6px 12px rgba(0,0,0,.4),inset 0 3px 0 rgba(255,255,255,.4)}
.bg-buzz:disabled{opacity:.4;cursor:default}
.bg-buzz:focus-visible{outline:3px solid #fff;outline-offset:3px}
.bg-buzz.lit{animation:bgLit .5s ease-in-out infinite alternate}
.bg-qa .opts .opt{position:relative}
.bg-qa[data-ans="A"] .opt:not(:disabled){border-color:#FFD766;box-shadow:0 0 0 2px rgba(255,215,102,.35)}
.bg-qa[data-ans="B"] .opt:not(:disabled){border-color:#4FD1E0;box-shadow:0 0 0 2px rgba(79,209,224,.35)}
.bg-sent{display:flex;flex-wrap:wrap;gap:6px 4px;font-size:1.1rem;line-height:1.5;margin:4px 0 12px}
.bg-sent span{border-bottom:3px solid var(--gold);padding:0 3px 2px}
.bg-sent sup{color:var(--gold);font-weight:800;margin-right:2px}
.bg-timer{display:flex;align-items:center;gap:10px}
.bg-timer .pbar{flex:1}
.bg-timer b{font-variant-numeric:tabular-nums;min-width:3ch;text-align:right}
.bg-timer.low b{color:var(--bad)}
.bg-twtop{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between}
.bg-status{margin:0;min-height:1.5em;font-weight:700}
.bg-panel .hint{margin:0}
@keyframes bgPulse{50%{opacity:.35;transform:scale(1.18)}}
@keyframes bgBounce{0%{transform:translateY(0)}20%{transform:translateY(-26px)}45%{transform:translateY(0)}60%{transform:translateY(-9px)}75%{transform:translateY(0)}}
@keyframes bgPop{from{transform:scale(.92) translateY(10px);opacity:0}to{transform:none;opacity:1}}
@keyframes bgTrophy{50%{transform:translateY(-8px) rotate(-4deg)}}
@keyframes bgFall{to{transform:translate3d(var(--dx),112vh,0) rotate(var(--r))}}
@keyframes bgSway{50%{transform:rotate(-2.5deg)}}
@keyframes bgHeave{30%{transform:rotate(-11deg) translateX(-5px)}100%{transform:rotate(0)}}
@keyframes bgStumble{30%{transform:rotate(9deg) translateX(4px)}100%{transform:rotate(0)}}
@keyframes bgFlut{50%{transform:skewX(9deg) rotate(4deg)}}
@keyframes bgLit{to{box-shadow:0 8px 0 var(--td),0 0 0 6px rgba(255,255,255,.55),0 0 34px var(--tc),inset 0 3px 0 rgba(255,255,255,.4)}}
@media (max-width:860px){
  .bg-play{grid-template-columns:minmax(0,1fr);grid-template-areas:"ctrl" "board" "plist"}
  .bg-ctrl{flex-direction:row;flex-wrap:wrap;align-items:center;padding:12px}
  .bg-ctrl .bg-turn{flex:1 1 140px}
  .bg-ctrl .bg-dicerow{flex:1 1 200px}
  .bg-ctrl .bg-log{flex:1 1 100%;min-height:0}
  .bg-board{transform:rotateX(8deg)}
}
@media (max-width:900px){.bg-twgrid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-areas:"a b" "q q";gap:10px}.bg-buzz{min-height:84px}}
@media (prefers-reduced-motion:reduce){
  .bg-fi,.bg-flag,.bg-ring,.bg-trophy,.bg-dice.bg-bounce,.bg-pop,.bg-buzz.lit{animation:none!important}
  #bg-rope,.bg-cube{transition:none!important}
  .bg-conf{display:none}
  .bg-board{transform:none}
}`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ======================= QUESTION BANKS ======================= */
  /* Ladders & Snakes: [module, question, correct answer, [wrong answers], explanation] */
  const SNQ = [
    // ---- Module 1: Gathering and Processing Information ----
    ["M1", "Which of these is a PRIMARY source for research on fishing in Grenada?", "A transcript of your own interview with a fisherman in Gouyave", ["A textbook chapter on Caribbean fishing", "An encyclopedia entry on the fishing industry", "A newspaper editorial summarising a fisheries report"], "A primary source is first-hand evidence created by someone directly involved. Your own interview transcript is raw, original data; the others interpret or summarise information gathered by someone else."],
    ["M1", "A questionnaire is MOST suitable when a researcher wants to…", "collect standardised data from many respondents quickly", ["observe behaviour in its natural setting", "explore one person’s experience in great depth", "test cause and effect under laboratory conditions"], "Questionnaires ask everyone the same questions, so they reach large samples quickly and give data that is easy to compare and tally."],
    ["M1", "What is the main advantage of CLOSED questions in a questionnaire?", "Answers are limited to fixed choices, so they are easy to count and compare", ["They give rich, detailed personal answers", "They let respondents explain their feelings freely", "They never contain any bias"], "Closed questions (Yes/No, multiple choice, rating scales) produce quantitative data that is quick to analyse. Open questions give depth instead."],
    ["M1", "A researcher secretly records students’ conversations in the canteen. Which ethical principle is broken?", "Informed consent", ["Triangulation", "Validity", "Random sampling"], "Participants must know about the research and agree to take part. Secret recording breaks informed consent and may also breach privacy."],
    ["M1", "A survey gives the same results each time it is repeated under the same conditions. The survey is…", "reliable", ["valid", "biased", "anecdotal"], "Reliability means consistency. Validity is different: it asks whether the tool actually measures what it claims to measure."],
    ["M1", "A tool that measures exactly what it is supposed to measure is said to be…", "valid", ["reliable", "subjective", "secondary"], "Validity is about accuracy of measurement: does the question or method really capture the thing being studied?"],
    ["M1", "Using a questionnaire, interviews and observation to study the same issue is called…", "triangulation", ["plagiarism", "paraphrasing", "convenience sampling"], "Triangulation uses several methods or sources so that each one checks the others, which strengthens the reliability of the findings."],
    ["M1", "Every Lower Sixth student’s name is put in a hat and 30 names are drawn. This is…", "simple random sampling", ["convenience sampling", "purposive sampling", "snowball sampling"], "In simple random sampling, every member of the population has an equal chance of being chosen."],
    ["M1", "Which factor MOST strengthens the credibility of an online article?", "It is written by a named expert and cites evidence you can check", ["It has thousands of likes and shares", "It uses bold headlines and bright photos", "It agrees with what you already believe"], "Credibility depends on the producer’s expertise and on verifiable evidence, not on popularity or presentation."],
    ["M1", "A soft-drink company pays for a study that finds sugar has little effect on health. The main concern is…", "possible bias caused by a conflict of interest", ["the study is a secondary source", "the sample was chosen randomly", "the study is too short"], "When the sponsor benefits from a particular result, the findings may be biased. Always ask who produced or paid for a source, and why."],
    ["M1", "Which is the BEST research question?", "How does social media use affect the sleep of Form 5 students at one San Fernando school?", ["What is social media?", "Is social media bad?", "Why are all teenagers addicted to their phones?"], "A good research question is focused, names a specific group and place, and can be investigated with data. The others are definitions, yes/no opinions or biased assumptions."],
    ["M1", "The MAIN POINT of a passage is best described as…", "the central idea the writer wants the reader to understand or accept", ["always the first sentence of the passage", "the most interesting example", "the writer’s tone"], "The main point is the controlling idea. It may be stated anywhere, or only implied, and every supporting detail points back to it."],
    ["M1", "When you write a summary, you should…", "use your own words and include only the main points", ["copy the topic sentences exactly", "add your own opinion of the passage", "include every example and statistic"], "A summary condenses the writer’s ideas in your own words, keeps the main points and leaves out examples, repetition and your opinion."],
    ["M1", "A passage explains step by step how hurricanes form over warm Atlantic waters. Its main purpose is to…", "inform or explain", ["persuade", "entertain", "express personal feelings"], "Expository writing that explains a process sets out to inform. There is no attempt to change the reader’s mind or to tell a story."],
    ["M1", "“Every true Caribbean citizen must vote on Election Day.” The writer’s purpose is mainly to…", "persuade", ["inform", "describe", "narrate"], "The word “must” and the appeal to being a “true” citizen push the reader to act. That is a persuasive purpose."],
    ["M1", "“The old house groaned and complained every time the wind blew.” This is an example of…", "personification", ["simile", "alliteration", "irony"], "Groaning and complaining are human actions. Giving human qualities to a non-human thing is personification."],
    ["M1", "“Her voice was like warm honey.” This device is…", "a simile", ["a metaphor", "hyperbole", "an oxymoron"], "A simile makes a comparison using “like” or “as”. A metaphor would say her voice WAS warm honey."],
    ["M1", "“I have told you a million times to close the gate!” This is…", "hyperbole", ["understatement", "a simile", "onomatopoeia"], "Hyperbole is deliberate exaggeration for emphasis. Nobody has literally said anything a million times."],
    ["M1", "A fire station burns down. This is an example of…", "situational irony", ["verbal irony", "a euphemism", "an allusion"], "Situational irony happens when the outcome is the opposite of what we expect. Verbal irony is when a speaker says the opposite of what they mean."],
    ["M1", "“Do we really want our children to inherit polluted beaches?” A rhetorical question like this is used to…", "engage the reader and lead them towards an obvious answer", ["request information from the reader", "show that the writer is unsure", "change the topic of the passage"], "A rhetorical question expects no reply. It draws the reader in and makes the writer’s point feel like common sense."],
    ["M1", "Writing that appeals to the senses of sight, sound, smell, taste and touch is called…", "imagery", ["jargon", "euphemism", "an anecdote"], "Imagery uses sensory language so that readers can see, hear, smell, taste or feel what is described."],
    ["M1", "A passage describes the events of a hurricane day by day, from landfall to recovery. Which organisational strategy is used?", "Chronological order", ["Spatial order", "Compare and contrast", "Classification"], "Chronological order arranges events in the time sequence in which they happened. Signal words include first, then, by evening, the next day."],
    ["M1", "“Because of heavy rainfall, the roads flooded and schools closed.” Which organisational strategy does this show?", "Cause and effect", ["Problem and solution", "Definition", "Spatial order"], "The rainfall (cause) leads to flooding and closures (effects). Signal words include because, as a result, therefore, consequently."],
    ["M1", "Which set of transitions MOST clearly signals a compare-and-contrast structure?", "similarly, however, whereas", ["first, next, finally", "as a result, therefore, consequently", "for example, for instance, such as"], "Similarly shows likeness; however and whereas show difference. The other sets signal sequence, cause and effect, and illustration."],
    ["M1", "An article outlines youth unemployment and then proposes apprenticeship schemes. It is organised by…", "problem and solution", ["chronological order", "spatial order", "classification"], "The writer first establishes a problem and then presents a way to solve it: the problem-solution pattern."],
    ["M1", "A description moves from the market entrance, past the fruit stalls, to the fish stand at the back. This is…", "spatial order", ["chronological order", "order of importance", "cause and effect"], "Spatial order organises details by location, guiding the reader through a place as if walking through it."],
    ["M1", "“Oh, wonderful, another blackout during exam week.” The tone is…", "sarcastic", ["celebratory", "neutral", "reverent"], "The speaker says “wonderful” but means the opposite. Sarcasm is a mocking form of verbal irony."],

    // ---- Module 2: Language and Community ----
    ["M2", "Which register is MOST suitable for a speech welcoming the Governor to a school prize-giving?", "Formal", ["Intimate", "Casual", "Consultative"], "A public ceremony with an important guest calls for formal register: careful Standard English, full sentences and polite forms of address."],
    ["M2", "Which is the best example of FROZEN register?", "The national anthem or a prayer recited word for word", ["A chat between best friends", "A doctor advising a patient", "A text message to a cousin"], "Frozen register uses fixed wording that never changes, such as anthems, oaths, prayers and legal formulas."],
    ["M2", "A student asks a librarian to help her find a book on Caribbean folklore. She is mainly using…", "consultative register", ["intimate register", "frozen register", "basilect"], "Consultative register is used when someone seeks advice or information from an expert or official, as with a librarian, doctor or bank clerk."],
    ["M2", "Pet names, private jokes and half-finished sentences between close partners are typical of…", "intimate register", ["formal register", "frozen register", "consultative register"], "Intimate register depends on deep shared knowledge between very close people, so much can be left unsaid."],
    ["M2", "On the Creole continuum, the variety CLOSEST to Standard English is the…", "acrolect", ["basilect", "mesolect", "substrate"], "The acrolect is the “top” of the continuum: the educated, near-standard variety. The basilect is furthest away."],
    ["M2", "On the Creole continuum, the variety FURTHEST from Standard English is the…", "basilect", ["acrolect", "mesolect", "lexifier"], "The basilect keeps the most Creole features in grammar, sound and vocabulary, so it is furthest from the standard."],
    ["M2", "Speech that blends Creole and Standard English features, used by many speakers every day, is the…", "mesolect", ["basilect", "acrolect", "frozen register"], "The mesolect covers the wide middle range of the continuum, where most everyday speech in many territories falls."],
    ["M2", "A Creole differs from a pidgin mainly because a Creole…", "has native speakers who learned it as a first language", ["has no grammar rules", "is used only for trade", "is a dialect of Standard English"], "A pidgin is a contact language with no native speakers. When children acquire it as their first language it expands and becomes a Creole."],
    ["M2", "Most of the vocabulary of Jamaican Creole comes from English. English is therefore its…", "lexifier (superstrate) language", ["substrate language", "basilect", "pidgin"], "The lexifier, or superstrate, is the dominant language that supplied most of the Creole’s words."],
    ["M2", "West African languages that shaped the grammar and sounds of Caribbean Creoles are called…", "substrate languages", ["lexifier languages", "acrolects", "registers"], "Substrate languages were spoken by the enslaved Africans. Their influence shows in Creole grammar, pronunciation and some vocabulary."],
    ["M2", "In “Di pikni dem a play”, what does “dem” show?", "Plural: more than one child", ["Past tense", "Future tense", "Negation"], "Many English-lexicon Creoles mark plural by placing “dem” after the noun instead of adding -s."],
    ["M2", "“She tall.” This Creole sentence shows…", "zero copula: no form of “to be” before the adjective", ["reduplication", "a pluraliser", "code-mixing"], "Standard English needs “is” (She is tall). Many Creoles use no copula before adjectives, because adjectives can act like verbs."],
    ["M2", "“Him fool-fool.” Repeating the word in this way is called reduplication. It is used to…", "intensify the meaning", ["show past tense", "make the noun plural", "ask a question"], "Reduplication strengthens or intensifies meaning: “fool-fool” means very foolish. It is a common Creole feature with West African roots."],
    ["M2", "A student speaks Standard English to her teacher, then switches to Creole when her friend arrives. This is…", "code-switching", ["diglossia", "interference", "a pidgin"], "Code-switching is moving between language varieties according to the listener, setting or purpose."],
    ["M2", "Which is a common reason for code-switching?", "To show solidarity and shared identity with the listener", ["Because the speaker knows only one variety", "To make speech impossible for anyone to understand", "Because Creole has no grammar"], "Speakers often switch to signal friendship, belonging or shared identity, to add emphasis, or to fit a change in setting."],
    ["M2", "The belief that Creole is “broken English” is an example of…", "a negative language attitude", ["a linguistic fact", "a register", "code-switching"], "Linguists treat Creoles as complete, rule-governed languages. Calling them “broken” reflects a social attitude, not a linguistic fact."],
    ["M2", "In many Caribbean territories, Standard English carries prestige mainly because…", "it is linked to education, official business and social mobility", ["it is older than Creole", "it is easier to learn than Creole", "it has no rules that change"], "Prestige is social. Colonial history tied the standard language to schooling, government and status."],
    ["M2", "Language is described as “arbitrary” because…", "there is no natural link between a word and what it stands for", ["it changes over time", "it follows rules", "only humans use it"], "Nothing about the sound of “tree” connects it to a tree; speakers simply agree on the link. That is arbitrariness."],
    ["M2", "New words such as “selfie” and “ghosting” entering English show that language is…", "dynamic", ["arbitrary", "frozen", "static"], "Language is dynamic: it changes constantly as speakers create, borrow and adapt words for new needs."],
    ["M2", "Papiamentu, spoken in Aruba, Bonaire and Curaçao, draws much of its vocabulary from…", "Portuguese and Spanish", ["French", "Hindi", "Hausa only"], "Papiamentu is an Iberian-lexicon Creole, with words mainly from Portuguese and Spanish, plus Dutch, English and African influences."],
    ["M2", "Haitian Kreyòl is a Creole with which lexifier language?", "French", ["English", "Dutch", "Spanish"], "Haitian Kreyòl draws most of its vocabulary from French, though its grammar differs greatly from French."],
    ["M2", "A community uses one variety for formal, official purposes and another for home and friends. This is called…", "diglossia", ["code-mixing", "a pidgin", "a dialect continuum"], "Diglossia is a stable division of functions between a “high” variety for formal domains and a “low” variety for everyday ones."],
    ["M2", "A variety of a language linked to a particular region or social group is a…", "dialect", ["register", "jargon", "pidgin"], "A dialect is defined by who uses it (region or social group). A register is defined by the situation it is used in."],
    ["M2", "Abbreviations such as “brb” and “idk” in text messages are an example of…", "technology influencing language use", ["frozen register", "the basilect", "standard spelling"], "Digital media encourage speed and brevity, producing abbreviations, emojis and new spellings. This is technology shaping language."],
    ["M2", "Calypsonians and dancehall artists often sing in Creole mainly to…", "express cultural identity and connect with their audience", ["obey a law that bans Standard English", "confuse their listeners", "show that Creole cannot be written"], "Creole carries the voice, humour and identity of the people, so artists use it to build connection and authenticity."],
    ["M2", "Saying “passed away” instead of “died” is an example of…", "a euphemism", ["slang", "jargon", "a malapropism"], "A euphemism replaces a harsh or uncomfortable word with a gentler one."],

    // ---- Module 3: Speaking and Writing ----
    ["M3", "In the communication process, turning ideas into words, gestures or symbols is called…", "encoding", ["decoding", "feedback", "noise"], "The sender encodes the message. The receiver later decodes it, interpreting the symbols to find the meaning."],
    ["M3", "The receiver’s interpretation of the symbols in a message is called…", "decoding", ["encoding", "transmission", "the channel"], "Decoding is the receiver’s job: making sense of words, tone and gestures. Misunderstanding is a decoding problem."],
    ["M3", "Anything that interferes with a message as it passes from sender to receiver is called…", "noise", ["feedback", "context", "the medium"], "Noise can be physical (a loud generator), psychological (worry), physiological (hearing loss) or semantic (unfamiliar words)."],
    ["M3", "The receiver’s response, which shows the sender how the message was understood, is…", "feedback", ["encoding", "noise", "the channel"], "Feedback, verbal or non-verbal, turns one-way transmission into two-way communication."],
    ["M3", "A WhatsApp voice note, a printed letter and a radio broadcast are examples of different…", "channels (media)", ["receivers", "registers", "barriers"], "The channel or medium is the means by which the message travels from sender to receiver."],
    ["M3", "Which model shows communication as one-way, from sender to receiver?", "The linear model (Shannon and Weaver)", ["The transactional model", "The interactive model", "The Toulmin model"], "Shannon and Weaver’s linear model shows a one-way flow: source, transmitter, channel, receiver, destination, with noise interfering."],
    ["M3", "Which model sees both people as sending and receiving messages at the same time?", "The transactional model", ["The linear model", "The Shannon and Weaver model", "The one-way model"], "In the transactional model (for example, Barnlund) communicators are simultaneously senders and receivers, constantly adjusting to each other."],
    ["M3", "In Schramm’s interactive model, communication works best when sender and receiver share a common…", "field of experience", ["channel", "noise source", "radio frequency"], "Schramm stressed overlapping fields of experience: shared culture, knowledge and language make encoding and decoding easier."],
    ["M3", "A doctor says, “You have idiopathic hypertension,” and the patient is confused. This is mainly a…", "semantic barrier", ["physical barrier", "physiological barrier", "cultural barrier"], "Semantic barriers arise from words: jargon or unfamiliar vocabulary that the receiver cannot decode."],
    ["M3", "Loud construction work outside the classroom during a lesson is a…", "physical (environmental) barrier", ["semantic barrier", "psychological barrier", "cultural barrier"], "Physical barriers come from the environment: noise, distance, poor lighting or faulty equipment."],
    ["M3", "A student is so anxious about exam results that she cannot follow the teacher. This is a…", "psychological barrier", ["semantic barrier", "physical barrier", "cultural barrier"], "Psychological barriers come from the mind: anxiety, anger, prejudice or lack of interest."],
    ["M3", "A visitor makes a hand gesture that is friendly at home but offensive in the host country. This is a…", "cultural barrier", ["physical barrier", "semantic barrier", "physiological barrier"], "Cultural barriers occur when gestures, customs or values are interpreted differently across cultures."],
    ["M3", "The study of body movement, gestures and facial expressions is called…", "kinesics", ["proxemics", "paralanguage", "haptics"], "Kinesics is body language. Proxemics is space, paralanguage is vocal quality and haptics is touch."],
    ["M3", "The use of personal space and distance in communication is called…", "proxemics", ["kinesics", "chronemics", "oculesics"], "Proxemics studies how distance (intimate, personal, social, public) affects communication."],
    ["M3", "Tone, pitch, volume and speed of the voice are part of…", "paralanguage", ["kinesics", "proxemics", "jargon"], "Paralanguage is how something is said rather than the words themselves. The same words can be kind or sarcastic depending on tone."],
    ["M3", "Before writing a speech for a parents’ meeting, the FIRST thing to analyse is…", "the audience: their needs, knowledge and attitudes", ["the colour scheme of the slides", "the length of the hall", "your favourite jokes"], "Audience analysis shapes every other choice: register, examples, length, medium and the appeals you use."],
    ["M3", "“As a nurse with twenty years’ experience, I urge you to vaccinate.” This appeal is…", "ethos", ["pathos", "logos", "bandwagon"], "Ethos persuades through the speaker’s credibility and character."],
    ["M3", "An advert shows a crying child beside a polluted river to make viewers feel guilty. This is…", "pathos", ["ethos", "logos", "card stacking"], "Pathos persuades by stirring the audience’s emotions, such as guilt, fear, pity or pride."],
    ["M3", "Using statistics and step-by-step reasoning to persuade is…", "logos", ["pathos", "ethos", "name-calling"], "Logos appeals to logic and evidence: facts, figures and reasoned argument."],
    ["M3", "“Everyone on the island is switching to SolarMax. Don’t be left behind!” This propaganda technique is…", "bandwagon", ["testimonial", "plain folks", "name-calling"], "Bandwagon persuades by suggesting that everyone else is doing it, so you should join in."],
    ["M3", "A famous West Indies cricketer endorses a sports drink in an advert. This technique is…", "testimonial", ["bandwagon", "glittering generalities", "transfer"], "A testimonial uses a well-known or trusted person to recommend a product or idea."],
    ["M3", "Which is an example of MASS communication?", "A national television news broadcast", ["A conversation between two friends", "Planning your day in your head", "A small study group discussion"], "Mass communication reaches a large, scattered audience through media such as TV, radio, newspapers and the internet."],
    ["M3", "Talking to yourself to plan your study timetable is…", "intrapersonal communication", ["interpersonal communication", "group communication", "mass communication"], "Intrapersonal communication happens within one person: self-talk, reflection and planning."],
    ["M3", "A key feature of new (digital) media compared with traditional media is…", "interactivity: audiences can respond, share and create content instantly", ["communication is strictly one-way", "there is no advertising at all", "the information is always reliable"], "Digital media let users comment, share and produce content. This interactivity also means information must be checked carefully."],
    ["M3", "Informal communication that spreads unofficially through an organisation is called…", "the grapevine", ["the chain of command", "a memorandum", "a formal channel"], "The grapevine is the unofficial network of talk and rumour. It is fast but can be inaccurate."],
    ["M3", "In the mass media, editors who decide which stories are published act as…", "gatekeepers", ["receivers", "encoders only", "noise"], "Gatekeepers filter and select information, shaping what the public sees and hears."],
    ["M3", "Which strategy BEST holds an audience’s attention during an oral presentation?", "Varying your vocal tone and making eye contact", ["Reading every word from your slides", "Speaking in a steady monotone", "Avoiding all gestures"], "Vocal variety and eye contact are key delivery skills. They signal confidence and keep listeners involved."],

    // ---- Paper 3 (Paper 032) ----
    ["P3", "In this course, Paper 3 means Paper 032. What is Paper 032?", "A written paper: 2 hours 15 minutes, 60 marks, three questions on a central stimulus", ["A multiple-choice paper", "An oral examination", "A portfolio submission"], "Paper 032 is a written paper of 2 hours 15 minutes and 60 marks, with three compulsory questions on a central stimulus."],
    ["P3", "How long is Paper 032?", "2 hours 15 minutes", ["1 hour 30 minutes", "2 hours 30 minutes", "3 hours"], "Paper 032 lasts 2 hours 15 minutes. Plan your time across Section A and Section B."],
    ["P3", "What is Paper 032 worth?", "60 marks, contributing 20 per cent of the final assessment", ["45 marks, contributing 30 per cent", "100 marks, contributing 50 per cent", "60 marks, contributing 40 per cent"], "Paper 032 is worth 60 marks and contributes 20 per cent towards your final CAPE result."],
    ["P3", "How many compulsory questions does Paper 032 have?", "Three, based on one central stimulus", ["Two, with a choice of topic", "Five, one per unit", "Four, with two optional"], "There are three compulsory questions covering the three Modules, all based on a central stimulus linked to the year’s topic."],
    ["P3", "The Section B piece must be…", "between 200 and 250 words", ["between 100 and 150 words", "about 500 words", "no more than 50 words"], "The Section B response is 200–250 words: a creative or reflective piece, or an expository piece, on the set topic."],
    ["P3", "The justification paragraph in Section B should…", "be 50–100 words on the purpose, intended audience and context of communication", ["retell the story in more detail", "list ten points from the notes sheet", "be at least 300 words"], "In 50–100 words you justify your piece by commenting on its purpose, intended audience and context of communication."],
    ["P3", "What may you take into the Paper 032 exam room?", "One sheet of double-sided A4 paper with no more than 10 points on the topic", ["Your full research notes", "A dictionary and a thesaurus", "Two notes sheets with 20 points"], "You may bring a single sheet of double-sided A4 paper with no more than 10 points related to the topic of your response, and nothing else."],
    ["P3", "What are the 2026 Paper 032 topic and intended audience?", "Natural disasters, for homeowners", ["Climate change, for teenagers", "Non-communicable diseases in children, for parents", "Cyberbullying, for parents"], "The syllabus sets natural disasters for homeowners in 2026. Climate change for teenagers was 2025."],
    ["P3", "What are the 2027 Paper 032 topic and intended audience?", "Non-communicable diseases in children, for parents", ["Natural disasters, for homeowners", "Single parenthood, for teenagers", "Mental health challenges, for community groups"], "In 2027 the topic is non-communicable diseases in children and the intended audience is parents."],
    ["P3", "In Paper 032, marks are awarded for…", "content, organisation and expression", ["handwriting and length only", "creativity only", "spelling only"], "Examiners assess what you say (content), how you arrange it (organisation) and how well you write it (expression)."],
    ["P3", "In your justification, “context of communication” refers to…", "the situation, setting and medium in which the piece would be delivered", ["the number of words you used", "your favourite part of the topic", "the order of your paragraphs"], "Context covers where, when and how the message is received: for example, a newsletter handed out at a community meeting before hurricane season."],
    ["P3", "Which is an EXPOSITORY piece?", "A newspaper article explaining how homeowners can prepare for hurricane season", ["A poem about the sea", "A short story about a storm", "A one-act play set during a flood"], "Expository pieces explain or inform: journalistic pieces, journal entries or essays. Poems, stories and plays are creative pieces."],
    ["P3", "A strong slogan for a public awareness campaign should be…", "short, memorable and aimed at the target audience", ["a full paragraph of facts", "packed with technical jargon", "vague so that it suits everyone"], "Slogans work through brevity, rhythm and audience fit, for example, “Strap It, Board It, Stock It: Be Storm Ready.”"],
    ["P3", "Section A of Paper 032 is worth…", "20 marks, in two short-answer questions", ["40 marks, in one essay", "10 marks, in multiple choice", "60 marks, in three essays"], "Section A has two short-answer questions worth 20 marks together. Section B, the piece and justification, is worth 40 marks."],
  ];

  /* Tug of Words items. mcq: [q, correct, [wrongs], why]  tf: [statement, true?, why]
     err: [[part A, part B, part C, part D], index of the error, why]  cre: [creole, Standard English, [wrongs], why]  dev: [quote, device, why] */
  const TW_MCQ = [
    ["Which is an example of frozen register?", "The national anthem", ["A text to a friend", "A classroom discussion", "A doctor’s advice"], "Frozen register has fixed wording that never changes."],
    ["Feedback is…", "the receiver’s response to a message", ["interference in the channel", "the sender’s first idea", "the medium used"], "Feedback tells the sender how the message was received."],
    ["The basilect is the variety…", "furthest from Standard English", ["closest to Standard English", "used only in writing", "with no grammar"], "The basilect is the bottom end of the Creole continuum."],
    ["Logos appeals to…", "reason and evidence", ["emotions", "the speaker’s character", "popularity"], "Logos = logic: facts, statistics and reasoning."],
    ["Ethos appeals to…", "the speaker’s credibility", ["the audience’s fears", "statistics", "humour"], "Ethos = character and trustworthiness."],
    ["Pathos appeals to…", "the audience’s emotions", ["logic", "expert credentials", "time limits"], "Pathos = feelings such as pity, pride or fear."],
    ["Which is a primary source?", "A diary written during the event", ["A history textbook", "An encyclopedia entry", "A review of a film"], "Primary sources are first-hand records from the time."],
    ["Proxemics is the study of…", "space and distance", ["touch", "facial expression", "voice quality"], "Proxemics = personal space."],
    ["Haptics is the study of…", "touch", ["time", "space", "eye contact"], "Haptics = touch in communication."],
    ["Chronemics is the study of…", "time in communication", ["gesture", "pitch", "posture"], "Chronemics: punctuality, waiting time and pace."],
    ["A pidgin has…", "no native speakers", ["millions of native speakers", "only written forms", "a single speaker"], "Once it gains native speakers, a pidgin becomes a Creole."],
    ["Decoding is done by the…", "receiver", ["sender", "channel", "noise"], "The receiver interprets (decodes) the message."],
    ["Which is a CLOSED question?", "Do you own a phone? (Yes/No)", ["How do you feel about school?", "Why did you choose CAPE?", "Describe your community."], "Closed questions limit answers to fixed options."],
    ["Validity means a tool…", "measures what it claims to measure", ["gives the same result every time", "uses a large sample", "is quick to complete"], "Validity = accuracy; reliability = consistency."],
    ["Jargon is…", "specialised vocabulary of a profession or group", ["rude language", "a Creole feature", "a type of rhyme"], "Doctors, lawyers and gamers all use jargon."],
    ["The mesolect is…", "the middle of the Creole continuum", ["the top of the continuum", "a frozen register", "a pidgin"], "The mesolect mixes Creole and standard features."],
    ["The Paper 032 justification is…", "50–100 words", ["200–250 words", "300–500 words", "10 points on a card"], "Purpose, audience and context in 50–100 words."],
    ["Plagiarism is…", "presenting someone else’s work as your own", ["quoting with a citation", "paraphrasing with credit", "using a bibliography"], "Always acknowledge your sources."],
    ["Which barrier is semantic?", "Unfamiliar technical words", ["A noisy generator", "Worry about a test", "Poor hearing"], "Semantic barriers come from words and meanings."],
    ["Which is intrapersonal communication?", "Thinking through a decision", ["A phone call", "A class debate", "A radio talk show"], "Intrapersonal = communication within yourself."],
  ];
  const TW_TF = [
    ["A pidgin is someone’s first language.", false, "False. A pidgin has no native speakers. When it becomes a first language, it is a Creole."],
    ["Noise in communication can be psychological as well as physical.", true, "True. Worry, anger or prejudice are psychological noise."],
    ["The transactional model shows people sending and receiving at the same time.", true, "True. Communicators are simultaneously senders and receivers."],
    ["Creole languages have no grammar rules.", false, "False. Creoles are fully rule-governed languages."],
    ["Secondary sources interpret or analyse primary sources.", true, "True. Textbooks and reviews are secondary sources."],
    ["Code-switching shows that a speaker cannot speak Standard English.", false, "False. It shows skill in choosing a variety to fit the situation."],
    ["Paralanguage includes the pitch and pace of your voice.", true, "True. Paralanguage is how you say it."],
    ["A simile makes a comparison using “like” or “as”.", true, "True. A metaphor compares without them."],
    ["A good research question can be answered with a simple yes or no.", false, "False. Research questions should be focused and open to investigation."],
    ["The acrolect is the variety closest to Standard English.", true, "True. It sits at the top of the continuum."],
    ["Feedback can only be verbal.", false, "False. A nod, a frown or silence is non-verbal feedback."],
    ["Informed consent means participants agree after understanding the research.", true, "True. It is a key ethical principle."],
    ["Language is static and never changes.", false, "False. Language is dynamic and keeps changing."],
    ["Hyperbole is deliberate exaggeration.", true, "True. “I’m so hungry I could eat a horse.”"],
    ["In Paper 032 you may bring one A4 notes sheet with up to 10 points.", true, "True. One single sheet of double-sided A4 paper, no more than 10 points."],
    ["A dialect is a ‘wrong’ version of a language.", false, "False. Every dialect is systematic; Standard English is itself a dialect."],
    ["The bandwagon technique suggests that everyone is doing it.", true, "True. It plays on the wish to belong."],
    ["Interviews can be structured, semi-structured or unstructured.", true, "True. They differ in how fixed the questions are."],
    ["Mass communication reaches a large, scattered audience.", true, "True. TV, radio and the internet are examples."],
    ["Alliteration is the repetition of vowel sounds inside words.", false, "False. That is assonance. Alliteration repeats initial consonant sounds."],
  ];
  const TW_ERR = [
    [["Neither of the boys", "have finished", "their project", "on time."], 1, "“Neither” is singular: Neither of the boys HAS finished."],
    [["Each of the students", "were given", "a copy of", "the report."], 1, "“Each” is singular: Each of the students WAS given…"],
    [["The team", "played", "good", "in every match."], 2, "An adverb is needed to describe how they played: played WELL."],
    [["She and me", "went to", "the library", "after school."], 0, "Subject pronoun needed: She and I went…"],
    [["If I was", "the principal,", "I would extend", "the lunch break."], 0, "Formal Standard English uses the subjunctive: If I WERE the principal…"],
    [["Less people", "attended", "the meeting", "than we expected."], 0, "Use “fewer” with countable nouns: FEWER people."],
    [["Between you and I,", "the test", "was easier", "than last year’s."], 0, "After a preposition, use the object pronoun: between you and ME."],
    [["The principal,", "along with the teachers,", "are attending", "the conference."], 2, "The subject is “the principal” (singular): IS attending."],
    [["He has went", "to the market", "to buy", "fresh fish."], 0, "The past participle of “go” is “gone”: He has GONE."],
    [["Its", "a beautiful day", "on the beach", "in Montego Bay."], 0, "“It’s” (it is) needs an apostrophe here."],
    [["The students", "should of", "studied", "harder."], 1, "The correct form is “should HAVE”. “Should of” mishears “should’ve”."],
    [["Me and my cousin", "visited", "Fort Amsterdam", "last Sunday."], 0, "Subject pronoun needed, and others first: My cousin and I visited…"],
    [["She don’t", "like", "loud music", "late at night."], 0, "Third person singular: She DOESN’T like…"],
    [["The book", "that I borrowed", "it was", "very interesting."], 2, "Double subject: “The book… WAS very interesting” (remove “it”)."],
    [["They", "was playing", "cricket", "when it rained."], 1, "Plural subject: They WERE playing."],
    [["Who’s", "bag", "is this", "on the floor?"], 0, "Possessive is “Whose”. “Who’s” means “who is”."],
    [["I seen", "the accident", "on my way", "to school."], 0, "Simple past: I SAW (or I HAVE SEEN) the accident."],
    [["Your", "going to", "love", "this festival."], 0, "“You’re” (you are) is needed: YOU’RE going to love…"],
  ];
  const TW_CRE = [
    ["Mi neva go a school yeside.", "I did not go to school yesterday.", ["I never going to school yesterday.", "I will not go to school tomorrow.", "Me didn’t went to school yesterday."], "“Neva” marks past negation; “a” here means “to”."],
    ["She a cook di dinna now.", "She is cooking dinner now.", ["She cooked the dinner.", "She cook the dinner now.", "She will cook dinner later."], "“A” before the verb marks the progressive (-ing)."],
    ["Wi go reach dey tomorrow.", "We will get there tomorrow.", ["We reached there yesterday.", "We is going there tomorrow.", "We go there every day."], "“Go” before a verb marks the future."],
    ["Di pikni dem tired.", "The children are tired.", ["The child is tired.", "The children is tired.", "Them children tired."], "“Dem” after the noun marks plural; Standard English needs “are”."],
    ["Him did tell mi already.", "He had already told me.", ["He is telling me now.", "Him did tell me already.", "He will tell me soon."], "“Did” marks past (anterior) time."],
    ["Dem house big.", "Their house is big.", ["They house big.", "Them houses is big.", "They are building a house."], "“Dem” can be possessive (their); add the copula “is”."],
    ["A who seh so?", "Who said so?", ["Who say so?", "Why did you say so?", "Where did you say it?"], "“A” is a focus marker; “seh” = say/said."],
    ["Mi nuh know.", "I do not know.", ["Me no know.", "I know.", "I didn’t knew."], "“Nuh” negates the verb."],
    ["Yuh cyaan come in yah.", "You cannot come in here.", ["You can come in here.", "You can’t came in here.", "You cannot come out there."], "“Cyaan” = cannot; “yah” = here."],
    ["Ah doh have no money.", "I do not have any money.", ["I don’t have no money.", "I have some money.", "Ah don’t have money."], "Creole allows double negatives; Standard English uses “any”."],
    ["He sick bad-bad.", "He is very sick.", ["He is sick and bad.", "He is a bad person.", "He sick very bad."], "Reduplication intensifies: bad-bad = very."],
    ["Wha yuh name?", "What is your name?", ["What your name is?", "Where is your name?", "Why is that your name?"], "Standard English needs the copula and inversion."],
    ["Wi did a walk when di rain start.", "We were walking when the rain started.", ["We walk when the rain start.", "We will walk when the rain starts.", "We was walking when the rain started."], "“Did a” = past progressive (were walking)."],
    ["Mek wi go.", "Let us go.", ["Make we go.", "We went.", "Let us stay."], "“Mek” = let; “wi” = us/we."],
    ["She tek di bus go a town.", "She took the bus to town.", ["She take the bus go to town.", "She will take the bus to town.", "She walked to town."], "A serial verb construction: “tek… go” = took… to."],
    ["Mi a go buy some bread.", "I am going to buy some bread.", ["I bought some bread.", "Me going buy some bread.", "I go to buy bread yesterday."], "“A go” marks the near future (going to)."],
  ];
  const TW_DEV = [
    ["“The sun smiled down on the children.”", "Personification", "The sun is given a human action."],
    ["“Her eyes were diamonds sparkling in the dark.”", "Metaphor", "A direct comparison with no “like” or “as”."],
    ["“He ran as fast as a cheetah.”", "Simile", "A comparison using “as”."],
    ["“Sally sells seashells by the seashore.”", "Alliteration", "Repeated initial “s” sounds."],
    ["“Buzz! Hiss! Splash!”", "Onomatopoeia", "Words that imitate sounds."],
    ["“This bag weighs a ton.”", "Hyperbole", "Deliberate exaggeration."],
    ["“A deafening silence filled the hall.”", "Oxymoron", "Two contradictory words side by side."],
    ["“We will rebuild. We will recover. We will rise.”", "Anaphora (repetition)", "The same opening words repeated for emphasis."],
    ["“Is this the future we want for our children?”", "Rhetorical question", "A question asked for effect, not an answer."],
    ["“Grandpa passed away last night.”", "Euphemism", "A gentle phrase for a harsh fact."],
    ["“The pen is mightier than the sword.”", "Metonymy", "“Pen” stands for writing; “sword” for force."],
    ["“Tourists sip champagne on yachts while fishermen mend torn nets on the shore.”", "Juxtaposition", "Two contrasting images placed side by side."],
    ["“Rustling palms, a salty breeze and warm golden sand.”", "Imagery", "Language appealing to the senses."],
    ["“The traffic warden got a parking ticket.”", "Situational irony", "The opposite of what we expect happens."],
    ["“Lovely weather,” she muttered, as the hurricane shutters rattled.", "Verbal irony", "Saying the opposite of what you mean."],
    ["“Like Anansi, the politician wriggled out of every promise.”", "Allusion", "A reference to a well-known story or figure."],
  ];
  const DEVICES = ["Personification", "Metaphor", "Simile", "Alliteration", "Onomatopoeia", "Hyperbole", "Oxymoron", "Anaphora (repetition)", "Rhetorical question", "Euphemism", "Metonymy", "Juxtaposition", "Imagery", "Situational irony", "Verbal irony", "Allusion", "Assonance", "Understatement"];
  const TYPES = { mcq: ["⚡", "Rapid Fire"], tf: ["✅", "True or False"], err: ["🔍", "Spot the Error"], cre: ["🗣️", "Creole to Standard English"], dev: ["🎭", "Name That Device"] };
  const MODS = { M1: "Module 1", M2: "Module 2", M3: "Module 3", P3: "Paper 3" };
  const MODLONG = { M1: "Module 1 · Research & Sources", M2: "Module 2 · Language & Community", M3: "Module 3 · Speaking & Writing", P3: "Paper 3 · Paper 032" };

  /* ======================= SHARED HELPERS ======================= */
  let A = null;
  const esc = s => A ? A.esc(String(s == null ? '' : s)) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const RM = () => { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } };
  const rnd = n => Math.floor(Math.random() * n);
  const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const later = (fn, ms) => setTimeout(fn, ms);
  const COLS = [['Gold', '#FFD766'], ['Coral', '#FF7A6B'], ['Aqua', '#4FD1E0'], ['Lime', '#8BE36B'], ['Violet', '#B18CFF'], ['Pink', '#FF9ED1']];
  function shade(hex, f) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = x => Math.max(0, Math.min(255, Math.round(f < 0 ? x * (1 + f) : x + (255 - x) * f))); return '#' + [m(r), m(g), m(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
  function plain(s) { try { const d = document.createElement('div'); d.innerHTML = String(s || ''); return (d.textContent || '').replace(/\s+/g, ' ').trim(); } catch (e) { return String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); } }
  function chip(act, k, sel, label, extra) { return `<button type="button" class="chip ${sel ? 'sel' : ''}" data-px="${act}" data-k="${esc(k)}" aria-pressed="${!!sel}"${extra || ''}>${label}</button>`; }
  function best() { const S = A.S; let b = S.boardg; if (!b || typeof b !== 'object') b = S.boardg = {}; b.s = b.s || { g: 0, w: 0, b: 0, c: 0, a: 0 }; b.t = b.t || { g: 0, w: 0, st: 0, c: 0, a: 0 }; return b; }
  function saveSoft() { try { A.save(); } catch (e) { } }
  let FOCUS = null, CONFETTI = false;

  /* ---------- WebAudio sound effects ---------- */
  let AC = null;
  function ac() {
    if (!A || A.S.sound === false) return null;
    try { if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); } if (AC.state === 'suspended') AC.resume(); return AC; } catch (e) { return null; }
  }
  function tone(f, dur, type, vol, delay, f2) {
    const c = ac(); if (!c) return;
    try {
      const t = c.currentTime + (delay || 0), o = c.createOscillator(), g = c.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.15, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
    } catch (e) { }
  }
  function noise(dur, vol, delay, freq, q, type) {
    const c = ac(); if (!c) return;
    try {
      const t = c.currentTime + (delay || 0), len = Math.max(1, Math.floor(c.sampleRate * dur)), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const s = c.createBufferSource(); s.buffer = buf; const fl = c.createBiquadFilter(); fl.type = type || 'bandpass'; fl.frequency.value = freq || 1200; fl.Q.value = q || 1;
      const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.2, t + Math.min(0.08, dur / 3)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(fl); fl.connect(g); g.connect(c.destination); s.start(t); s.stop(t + dur + 0.05);
    } catch (e) { }
  }
  const SFX = {
    dice() { for (let i = 0; i < 7; i++) { noise(0.045, 0.22, i * 0.09 + Math.random() * 0.03, 2600 + Math.random() * 1600, 3, 'bandpass'); tone(300 + Math.random() * 200, 0.04, 'square', 0.03, i * 0.09); } },
    step() { tone(560 + Math.random() * 80, 0.07, 'triangle', 0.08); },
    climb() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.18, 'triangle', 0.12, i * 0.09)); },
    slide() { tone(900, 0.8, 'triangle', 0.13, 0, 140); noise(0.8, 0.08, 0, 700, 0.8, 'lowpass'); },
    good() { tone(660, 0.12, 'sine', 0.14); tone(990, 0.2, 'sine', 0.14, 0.1); },
    bad() { tone(240, 0.22, 'sawtooth', 0.07, 0, 150); },
    buzz() { tone(150, 0.32, 'square', 0.09); tone(152, 0.32, 'sawtooth', 0.05); },
    tick() { tone(1200, 0.03, 'square', 0.03); },
    creak() { const c = ac(); if (!c) return; try { const t = c.currentTime, o = c.createOscillator(), l = c.createOscillator(), lg = c.createGain(), f = c.createBiquadFilter(), g = c.createGain(); o.type = 'sawtooth'; o.frequency.setValueAtTime(70, t); o.frequency.linearRampToValueAtTime(115, t + 0.6); l.frequency.value = 23; lg.gain.value = 25; l.connect(lg); lg.connect(o.frequency); f.type = 'bandpass'; f.frequency.value = 650; f.Q.value = 7; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.28, t + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65); o.connect(f); f.connect(g); g.connect(c.destination); o.start(t); l.start(t); o.stop(t + 0.7); l.stop(t + 0.7); } catch (e) { } noise(0.35, 0.06, 0.05, 300, 2); },
    cheer() { noise(1.6, 0.16, 0, 1500, 0.7); noise(1.2, 0.08, 0.2, 3000, 1.5); [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i === 5 ? 0.5 : 0.16, 'square', 0.06, i * 0.13)); }
  };

  function confetti() {
    if (RM()) return;
    try {
      const box = document.createElement('div'); box.className = 'bg-conf'; box.setAttribute('aria-hidden', 'true');
      const cols = ['#FFD766', '#FF7A6B', '#4FD1E0', '#8BE36B', '#B18CFF', '#FF9ED1', '#ffffff'];
      for (let i = 0; i < 90; i++) { const p = document.createElement('i'); p.style.left = (Math.random() * 100) + 'vw'; p.style.background = cols[i % cols.length]; p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px'); p.style.setProperty('--r', (Math.random() * 1080 - 540) + 'deg'); p.style.animationDuration = (2.2 + Math.random() * 2.2) + 's'; p.style.animationDelay = (Math.random() * 0.8) + 's'; if (i % 3 === 0) p.style.borderRadius = '50%'; box.appendChild(p); }
      document.body.appendChild(box); later(() => box.remove(), 5600);
    } catch (e) { }
  }

  /* ======================= LADDERS & SNAKES ======================= */
  const SN_NAME = 'Ladders & Snakes: Road to Grade One';
  const LADDERS = { 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 99 };
  const SNAKES = { 17: 7, 49: 11, 54: 34, 62: 19, 87: 24, 93: 73, 95: 75, 98: 79 };
  const CELL = 60, PAD = 22, BW = CELL * 10 + PAD * 2, TH = 16;
  const CPU = { easy: [0.5, 'Easy'], normal: [0.7, 'Normal'], sharp: [0.88, 'Sharp'] };
  function cxy(n) { const i = Math.max(1, Math.min(100, n)) - 1, r = Math.floor(i / 10), c = r % 2 === 0 ? i % 10 : 9 - (i % 10); return [PAD + c * CELL + CELL / 2, PAD + (9 - r) * CELL + CELL / 2]; }

  function ladderSVG(x1, y1, x2, y2, w) {
    w = w || 11; const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    const ext = 10, ax = x1 - ux * ext, ay = y1 - uy * ext, bx = x2 + ux * ext, by = y2 + uy * ext;
    const rail = s => { const ox = nx * w * s, oy = ny * w * s; return `<line x1="${(ax + ox + 4).toFixed(1)}" y1="${(ay + oy + 5).toFixed(1)}" x2="${(bx + ox + 4).toFixed(1)}" y2="${(by + oy + 5).toFixed(1)}" stroke="rgba(0,0,0,.4)" stroke-width="7" stroke-linecap="round"/>`; };
    const rail2 = s => { const ox = nx * w * s, oy = ny * w * s, hx = nx * -1.6, hy = ny * -1.6; return `<line x1="${(ax + ox).toFixed(1)}" y1="${(ay + oy).toFixed(1)}" x2="${(bx + ox).toFixed(1)}" y2="${(by + oy).toFixed(1)}" stroke="#9A6511" stroke-width="7" stroke-linecap="round"/><line x1="${(ax + ox).toFixed(1)}" y1="${(ay + oy).toFixed(1)}" x2="${(bx + ox).toFixed(1)}" y2="${(by + oy).toFixed(1)}" stroke="#E7B43C" stroke-width="4.4" stroke-linecap="round"/><line x1="${(ax + ox + hx).toFixed(1)}" y1="${(ay + oy + hy).toFixed(1)}" x2="${(bx + ox + hx).toFixed(1)}" y2="${(by + oy + hy).toFixed(1)}" stroke="#FFF1C2" stroke-width="1.5" stroke-linecap="round" opacity=".9"/>`; };
    let rungs = ''; const n = Math.max(2, Math.floor((L + ext * 2) / 20));
    for (let i = 1; i < n; i++) { const t = i / n, px = ax + (bx - ax) * t, py = ay + (by - ay) * t; const a = [px + nx * w, py + ny * w], b = [px - nx * w, py - ny * w]; rungs += `<line x1="${(a[0] + 3).toFixed(1)}" y1="${(a[1] + 4).toFixed(1)}" x2="${(b[0] + 3).toFixed(1)}" y2="${(b[1] + 4).toFixed(1)}" stroke="rgba(0,0,0,.35)" stroke-width="4.5"/><line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#C98D1E" stroke-width="4.5" stroke-linecap="round"/><line x1="${a[0].toFixed(1)}" y1="${(a[1] - 1.2).toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${(b[1] - 1.2).toFixed(1)}" stroke="#FFE7A0" stroke-width="1.2" opacity=".8"/>`; }
    return `<g class="bg-ladder">${rail(1)}${rail(-1)}${rungs}${rail2(1)}${rail2(-1)}</g>`;
  }
  const SNAKE_COLS = [['#4FD18B', '#1E7A4A', '#C9F7DC'], ['#FF7A6B', '#A8362A', '#FFD3CC'], ['#B18CFF', '#5B3BB0', '#E6DAFF'], ['#4FD1E0', '#1B7E8A', '#D2F7FB']];
  function snakePts(x1, y1, x2, y2, flip) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, k = Math.min(70, L * 0.28) * (flip ? -1 : 1);
    const P = [[x1, y1], [x1 + dx * 0.33 + nx * k, y1 + dy * 0.33 + ny * k], [x1 + dx * 0.66 - nx * k, y1 + dy * 0.66 - ny * k], [x2, y2]], out = [];
    for (let i = 0; i <= 48; i++) { const t = i / 48, u = 1 - t; out.push([u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0], u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1]]); }
    return out;
  }
  function snakeSVG(pts, col, scale) {
    scale = scale || 1; const [c, dk, lt] = col, n = pts.length, L = [], R = [];
    for (let i = 0; i < n; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, t = i / (n - 1), w = (13.5 * (1 - t) + 2.2 * t) * scale * (i < 3 ? 0.85 : 1);
      L.push([pts[i][0] + nx * w, pts[i][1] + ny * w]); R.push([pts[i][0] - nx * w, pts[i][1] - ny * w]);
    }
    const poly = L.concat(R.reverse()).map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    let spots = ''; for (let i = 5; i < n - 5; i += 4) { const t = i / (n - 1), w = (13.5 * (1 - t) + 2.2 * t) * scale; spots += `<ellipse cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" rx="${(w * 0.42).toFixed(1)}" ry="${(w * 0.3).toFixed(1)}" fill="${lt}" opacity=".75"/>`; }
    const sheen = pts.slice(3, n - 6).map((p, i) => { const a = pts[i + 2], b = pts[i + 4], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, t = (i + 3) / (n - 1), w = (13.5 * (1 - t) + 2.2 * t) * scale; return (p[0] + dy / l * w * 0.45).toFixed(1) + ',' + (p[1] - dx / l * w * 0.45).toFixed(1); }).join(' ');
    const h = pts[0], h2 = pts[3], ang = Math.atan2(h[1] - h2[1], h[0] - h2[0]) * 180 / Math.PI, s = scale;
    return `<g class="bg-snake"><polygon points="${poly}" fill="rgba(0,0,0,.38)" transform="translate(5,7)"/><polygon points="${poly}" fill="${c}" stroke="${dk}" stroke-width="2" stroke-linejoin="round"/>${spots}<polyline points="${sheen}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="${(2.6 * s).toFixed(1)}" stroke-linecap="round"/>
      <g transform="translate(${h[0].toFixed(1)},${h[1].toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${s})"><ellipse cx="4" cy="3" rx="19" ry="15" fill="rgba(0,0,0,.35)"/><path d="M19 0 L29 0 M29 0 L34 -4 M29 0 L34 4" stroke="#FF3B5C" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse cx="2" cy="0" rx="18" ry="14" fill="${c}" stroke="${dk}" stroke-width="2"/><ellipse cx="-2" cy="-4" rx="10" ry="5" fill="#fff" opacity=".28"/><circle cx="4" cy="-7" r="5.4" fill="#fff" stroke="${dk}" stroke-width="1.2"/><circle cx="4" cy="7" r="5.4" fill="#fff" stroke="${dk}" stroke-width="1.2"/><circle cx="6" cy="-7" r="2.7" fill="#0A1433"/><circle cx="6" cy="7" r="2.7" fill="#0A1433"/><circle cx="6.9" cy="-8" r=".9" fill="#fff"/><circle cx="6.9" cy="6" r=".9" fill="#fff"/><circle cx="15" cy="-3" r="1.1" fill="${dk}"/><circle cx="15" cy="3" r="1.1" fill="${dk}"/><ellipse cx="-6" cy="-11" rx="3" ry="2" fill="#FF9ED1" opacity=".55"/><ellipse cx="-6" cy="11" rx="3" ry="2" fill="#FF9ED1" opacity=".55"/></g></g>`;
  }
  const SNAKE_PATHS = {};
  let BOARD = null;
  function boardSVG() {
    if (BOARD) return BOARD;
    let s = `<defs>
      <linearGradient id="bgFrame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE9A8"/><stop offset=".45" stop-color="#E0AC3C"/><stop offset="1" stop-color="#8A6214"/></linearGradient>
      <linearGradient id="bgSide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7A5810"/><stop offset="1" stop-color="#2E2005"/></linearGradient>
      <radialGradient id="bgTa" cx=".3" cy=".25" r=".95"><stop offset="0" stop-color="#2A4FA8"/><stop offset="1" stop-color="#132A6B"/></radialGradient>
      <radialGradient id="bgTb" cx=".3" cy=".25" r=".95"><stop offset="0" stop-color="#1A347E"/><stop offset="1" stop-color="#0B1A48"/></radialGradient>
      <radialGradient id="bgTg" cx=".3" cy=".25" r=".95"><stop offset="0" stop-color="#FFF0B8"/><stop offset=".55" stop-color="#F2C445"/><stop offset="1" stop-color="#B07E12"/></radialGradient>
      ${COLS.map((c, i) => `<radialGradient id="bgP${i}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="${shade(c[1], 0.15)}"/><stop offset=".75" stop-color="${c[1]}"/><stop offset="1" stop-color="${shade(c[1], -0.45)}"/></radialGradient>`).join('')}
    </defs>
    <rect x="6" y="${TH}" width="${BW - 12}" height="${BW}" rx="24" fill="url(#bgSide)"/>
    <rect x="0" y="0" width="${BW}" height="${BW}" rx="24" fill="url(#bgFrame)"/>
    <rect x="3" y="3" width="${BW - 6}" height="${BW - 6}" rx="22" fill="none" stroke="#FFF6D6" stroke-opacity=".7" stroke-width="2"/>
    <rect x="${PAD - 5}" y="${PAD - 5}" width="${CELL * 10 + 10}" height="${CELL * 10 + 10}" rx="10" fill="#071233"/>`;
    for (let n = 1; n <= 100; n++) {
      const [cx, cy] = cxy(n), x = cx - CELL / 2, y = cy - CELL / 2, i = n - 1, r = Math.floor(i / 10), c = r % 2 === 0 ? i % 10 : 9 - (i % 10);
      const fill = n === 100 ? 'url(#bgTg)' : (r + c) % 2 ? 'url(#bgTb)' : 'url(#bgTa)';
      s += `<rect x="${x + 2}" y="${y + 2}" width="${CELL - 4}" height="${CELL - 4}" rx="9" fill="${fill}"/>`;
      s += `<path d="M${x + 5} ${y + CELL - 7} V${y + 8} Q${x + 5} ${y + 5} ${x + 8} ${y + 5} H${x + CELL - 7}" stroke="#fff" stroke-opacity="${n === 100 ? .7 : .2}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
      s += `<path d="M${x + 7} ${y + CELL - 4.5} H${x + CELL - 8} Q${x + CELL - 4.5} ${y + CELL - 4.5} ${x + CELL - 4.5} ${y + CELL - 8} V${y + 7}" stroke="#000" stroke-opacity=".45" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
      if (LADDERS[n]) s += `<rect x="${x + 5}" y="${y + 5}" width="${CELL - 10}" height="${CELL - 10}" rx="7" fill="#4FD18B" fill-opacity=".14" stroke="#4FD18B" stroke-opacity=".7" stroke-width="2"/>`;
      if (SNAKES[n]) s += `<rect x="${x + 5}" y="${y + 5}" width="${CELL - 10}" height="${CELL - 10}" rx="7" fill="#FF7A6B" fill-opacity=".14" stroke="#FF7A6B" stroke-opacity=".7" stroke-width="2"/>`;
      if (n === 100) s += `<text x="${cx}" y="${cy + 9}" text-anchor="middle" font-size="26">🏆</text><text x="${x + 8}" y="${y + 17}" font-size="12.5" fill="#5A3E05">100</text>`;
      else s += `<text x="${x + 8}" y="${y + 18}" font-size="13" fill="${n === 1 ? '#FFE9A8' : '#FFD766'}" fill-opacity="${n === 1 ? 1 : .78}">${n}</text>`;
      if (n === 1) s += `<text x="${cx}" y="${cy + 17}" text-anchor="middle" font-size="10.5" fill="#FFE9A8" letter-spacing="1">START</text>`;
    }
    Object.keys(LADDERS).forEach(a => { const p = cxy(+a), q = cxy(LADDERS[a]); s += ladderSVG(p[0], p[1] + 8, q[0], q[1] - 6); });
    Object.keys(SNAKES).forEach((a, i) => { const p = cxy(+a), q = cxy(SNAKES[a]); const pts = snakePts(p[0], p[1], q[0], q[1], i % 2); SNAKE_PATHS[a] = pts; s += snakeSVG(pts, SNAKE_COLS[i % 4]); });
    BOARD = s; return s;
  }
  function tokSVG(p, i, on, x, y) {
    const ci = p.col, init = esc(p.cpu ? 'C' : initial(p.name));
    return `<g id="bg-tok-${i}" class="bg-tok" style="transform:translate(${x.toFixed(1)}px,${y.toFixed(1)}px)"><g transform="scale(1.22)">
      ${on ? `<ellipse class="bg-ring" cx="0" cy="13" rx="19" ry="7" fill="none" stroke="#FFF1B8" stroke-width="2.5"/>` : ''}
      <ellipse cx="2" cy="14" rx="13" ry="4.6" fill="rgba(0,0,0,.45)"/>
      <ellipse cx="0" cy="11" rx="12.5" ry="5" fill="${shade(COLS[ci][1], -0.45)}"/>
      <path d="M-11 10 Q-10 -1 -5 -6 L5 -6 Q10 -1 11 10 Z" fill="url(#bgP${ci})" stroke="${shade(COLS[ci][1], -0.5)}" stroke-width="1"/>
      <circle cx="0" cy="-12" r="8.5" fill="url(#bgP${ci})" stroke="${shade(COLS[ci][1], -0.5)}" stroke-width="1"/>
      <ellipse cx="-3" cy="-15" rx="2.6" ry="2" fill="#fff" opacity=".8"/>
      <text x="0" y="7" text-anchor="middle" font-size="9.5" fill="#0A1433" font-weight="800">${init}</text></g></g>`;
  }
  function initial(n) { n = String(n || '').trim(); const m = n.match(/^Player (\d)$/); return (m ? m[1] : n.charAt(0) || '?').toUpperCase(); }
  function tokOff(g, i) { if (g.players.length < 2) return [0, -4]; return [[-12, -10], [12, -10], [-12, 10], [12, 10]][i]; }
  function tokPos(g, i, sq) { const [x, y] = cxy(sq), o = tokOff(g, i); return [x + o[0], y + o[1]]; }

  const SN = { cfg: { mode: 'cpu', n: 2, names: ['', 'Player 2', 'Player 3', 'Player 4'], cols: [0, 1, 2, 3], mods: { M1: 1, M2: 1, M3: 1, P3: 1 }, extra: 0, finish: 'exact', cpu: 'normal' }, g: null };
  let EXTRA = null;
  function courseExtra() {
    if (EXTRA) return EXTRA; const out = [];
    try {
      (window.COURSE_MODULES || []).forEach(m => {
        const mod = m && /^(M1|M2|M3|P3)$/.test(m.id) ? m.id : null; if (!mod || !Array.isArray(m.units)) return;
        m.units.forEach(u => (u && Array.isArray(u.screens) ? u.screens : []).forEach(s => {
          if (!s || s.type !== 'mcq' || s.passage || typeof s.q !== 'string' || !Array.isArray(s.options)) return;
          const opts = s.options.filter(o => o && typeof o.t === 'string'); const ok = opts.filter(o => o.ok);
          if (ok.length !== 1 || opts.length < 2 || opts.length > 5) return;
          const q = plain(s.q); if (!q || q.length > 300 || /passage|extract|above|below/i.test(q)) return;
          const ts = opts.map(o => plain(o.t)); if (ts.some(t => !t || t.length > 170)) return;
          out.push([mod, q, plain(ok[0].t), opts.filter(o => !o.ok).map(o => plain(o.t)), plain(ok[0].fb || '')]);
        }));
      });
    } catch (e) { }
    EXTRA = out; return out;
  }
  function snDeck(g) {
    const c = SN.cfg; let pool = SNQ.filter(q => c.mods[q[0]]); if (c.extra) pool = pool.concat(courseExtra().filter(q => c.mods[q[0]]));
    if (!pool.length) pool = SNQ; g.deck = shuf(pool);
  }
  function snDraw(g) {
    if (!g.deck.length) snDeck(g); const q = g.deck.pop(), opts = shuf([q[2]].concat(q[3]));
    return { mod: q[0], q: q[1], opts, ans: opts.indexOf(q[2]), why: q[4] };
  }
  function snStart() {
    const c = SN.cfg, players = [];
    const human = n => (c.names[n] || '').trim() || (n === 0 ? (A.S.name || 'Player 1') : 'Player ' + (n + 1));
    if (c.mode === 'cpu') { players.push({ name: human(0), col: c.cols[0], pos: 1, ok: 0, ans: 0 }); const free = [0, 1, 2, 3, 4, 5].find(k => k !== c.cols[0]); players.push({ name: 'Computer', cpu: true, col: free, pos: 1, ok: 0, ans: 0 }); }
    else for (let i = 0; i < c.n; i++) players.push({ name: human(i), col: c.cols[i], pos: 1, ok: 0, ans: 0 });
    const g = { players, turn: 0, dice: 1, rx: 0, ry: 0, spin: 0, busy: false, q: null, log: [`${players[0].name} goes first. Press Roll.`], rolls: 0, over: null, deck: [] };
    snDeck(g); SN.g = g; FOCUS = '[data-px="snroll"]';
    const b = best(); b.s.g++; saveSoft();
  }
  function snLog(g, m) { g.log.unshift(m); g.log.length = Math.min(g.log.length, 4); const el = document.getElementById('bg-log'); if (el) el.textContent = m; }
  function snRoll() {
    const g = SN.g; if (!g || g.busy || g.over || g.q) return;
    g.busy = true; const v = 1 + rnd(6); g.dice = v; g.rolls++;
    const F = { 1: [0, 0], 2: [-90, 0], 3: [0, -90], 4: [0, 90], 5: [90, 0], 6: [0, 180] }; g.spin++;
    g.rx = F[v][0] + 720 * g.spin; g.ry = F[v][1] + 720 * g.spin + (g.spin % 2 ? 360 : 0);
    const cube = document.getElementById('bg-cube'), dice = document.getElementById('bg-dice'), btn = document.querySelector('[data-px="snroll"]');
    if (btn) btn.disabled = true;
    if (cube) cube.style.transform = `rotateX(${g.rx}deg) rotateY(${g.ry}deg)`;
    if (dice) { dice.classList.remove('bg-bounce'); void dice.offsetWidth; dice.classList.add('bg-bounce'); dice.setAttribute('aria-label', 'Die showing ' + v); }
    SFX.dice();
    later(() => { if (SN.g !== g) return; snMove(g, v); }, RM() ? 60 : 1050);
  }
  function snMove(g, v) {
    const i = g.turn, p = g.players[i], from = p.pos, fin = SN.cfg.finish; let tgt = from + v; const path = [];
    snLog(g, `${p.name} rolled a ${v}.`);
    if (tgt > 100) {
      if (fin === 'exact') { snLog(g, `${p.name} rolled ${v} but needs exactly ${100 - from} to land on 100. Stay on ${from}.`); return later(() => snEnd(g), RM() ? 200 : 700); }
      if (fin === 'bounce') { for (let s = from + 1; s <= 100; s++) path.push(s); const back = tgt - 100; for (let s = 99; s >= 100 - back; s--) path.push(s); tgt = 100 - back; }
      else { for (let s = from + 1; s <= 100; s++) path.push(s); tgt = 100; }
    } else for (let s = from + 1; s <= tgt; s++) path.push(s);
    const pts = []; let prev = tokPos(g, i, from);
    path.forEach(sq => { const nx = tokPos(g, i, sq); pts.push([(prev[0] + nx[0]) / 2, (prev[1] + nx[1]) / 2 - 16, 0]); pts.push([nx[0], nx[1], 1]); prev = nx; });
    snAnim(g, i, pts, 95, pt => { if (pt[2]) SFX.step(); }, () => { p.pos = tgt; snLand(g); });
  }
  function snAnim(g, i, pts, ms, onPt, done) {
    if (RM() || !document.getElementById('bg-tok-' + i)) { const last = pts[pts.length - 1]; snSetTok(i, last, 0); return later(() => { if (SN.g === g) done(); }, RM() ? 120 : 0); }
    let k = 0; const step = () => { if (SN.g !== g) return; if (k >= pts.length) return done(); snSetTok(i, pts[k], ms); onPt && onPt(pts[k]); k++; later(step, ms); }; step();
  }
  function snSetTok(i, pt, ms) { const el = document.getElementById('bg-tok-' + i); if (!el) return; el.style.transition = ms ? `transform ${ms}ms ease-out` : 'none'; el.style.transform = `translate(${pt[0].toFixed(1)}px,${pt[1].toFixed(1)}px)`; }
  function snLand(g) {
    const p = g.players[g.turn], sq = p.pos;
    if (sq === 100) return snWin(g);
    const kind = LADDERS[sq] ? 'ladder' : SNAKES[sq] ? 'snake' : null;
    if (!kind) { snLog(g, `${p.name} moves to ${sq}.`); return snEnd(g); }
    g.q = Object.assign(snDraw(g), { kind, from: sq, to: kind === 'ladder' ? LADDERS[sq] : SNAKES[sq], pick: null, cpu: !!p.cpu });
    snLog(g, kind === 'ladder' ? `${p.name} reached a ladder on ${sq}! Answer to climb.` : `${p.name} landed on a snake on ${sq}! Answer to dodge.`);
    g.busy = false; FOCUS = p.cpu ? null : '.bg-qcard .opt'; A.render();
    if (p.cpu) later(() => { if (SN.g !== g || !g.q || g.q.pick != null) return; const ok = Math.random() < CPU[SN.cfg.cpu][0]; const wrong = g.q.opts.map((_, k) => k).filter(k => k !== g.q.ans); snAnswer(ok ? g.q.ans : wrong[rnd(wrong.length)]); }, RM() ? 700 : 1500);
  }
  function snAnswer(k) {
    const g = SN.g; if (!g || !g.q || g.q.pick != null) return;
    const q = g.q, p = g.players[g.turn]; q.pick = k; q.ok = k === q.ans; p.ans++; if (q.ok) p.ok++;
    if (!p.cpu) { const b = best(); b.s.a++; if (q.ok) b.s.c++; saveSoft(); }
    (q.ok ? SFX.good : SFX.bad)(); FOCUS = '[data-px="sncont"]'; A.render();
  }
  function snContinue() {
    const g = SN.g; if (!g || !g.q || g.q.pick == null || g.busy) return;
    const q = g.q, i = g.turn, p = g.players[i]; g.q = null; g.busy = true;
    const move = (q.kind === 'ladder' && q.ok) || (q.kind === 'snake' && !q.ok);
    if (!move) { snLog(g, q.kind === 'ladder' ? `${p.name} stays on ${q.from}. The ladder will wait.` : `${p.name} dodged the snake on ${q.from}!`); A.render(); return later(() => snEnd(g), RM() ? 120 : 450); }
    A.render();
    let pts;
    if (q.kind === 'ladder') { const a = tokPos(g, i, q.from), b = tokPos(g, i, q.to); pts = []; for (let k = 1; k <= 12; k++) pts.push([a[0] + (b[0] - a[0]) * k / 12, a[1] + (b[1] - a[1]) * k / 12]); SFX.climb(); }
    else { const o = tokOff(g, i), sp = SNAKE_PATHS[q.from] || [cxy(q.from), cxy(q.to)]; pts = sp.filter((_, k) => k % 2 === 0 || k === sp.length - 1).map(pt => [pt[0] + o[0], pt[1] + o[1]]); pts.push(tokPos(g, i, q.to)); SFX.slide(); }
    snLog(g, q.kind === 'ladder' ? `${p.name} climbs from ${q.from} to ${q.to}!` : `${p.name} slides from ${q.from} down to ${q.to}.`);
    later(() => snAnim(g, i, pts, q.kind === 'ladder' ? 70 : 32, null, () => { p.pos = q.to; snEnd(g); }), RM() ? 0 : 60);
  }
  function snEnd(g) {
    if (SN.g !== g || g.over) return;
    g.turn = (g.turn + 1) % g.players.length; g.busy = false; const p = g.players[g.turn];
    if (g.players.length > 1) snLog(g, g.log[0] + ` ${p.name}’s turn.`);
    FOCUS = p.cpu ? null : '[data-px="snroll"]'; A.render();
    if (p.cpu) later(() => { if (SN.g === g && !g.over && !g.busy && !g.q && g.players[g.turn] === p) snRoll(); }, RM() ? 500 : 900);
  }
  function snWin(g) {
    const p = g.players[g.turn]; g.over = { name: p.name, cpu: !!p.cpu, rolls: g.players.length ? Math.ceil(g.rolls / g.players.length) : g.rolls }; g.busy = false;
    snLog(g, `${p.name} reached 100 and wins!`);
    const b = best(), mine = SN.cfg.mode === 'cpu' ? !p.cpu : true;
    if (mine) { b.s.w++; if (!b.s.b || g.over.rolls < b.s.b) b.s.b = g.over.rolls; }
    saveSoft(); SFX.cheer(); CONFETTI = true; FOCUS = '[data-px="snagain"]'; A.render();
    if (SN.cfg.mode === 'cpu' && !p.cpu) A.reward(SN.cfg.cpu === 'sharp' ? 10 : SN.cfg.cpu === 'normal' ? 8 : 6, 'Ladders & Snakes win', { xp: 15 });
    else if (SN.cfg.mode === 'pass') A.reward(4, 'Ladders & Snakes game finished', { xp: 8 });
  }

  function diceHTML(g) {
    const PIPS = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
    return `<div class="bg-dice" id="bg-dice" role="img" aria-label="Die showing ${g.dice}"><div class="bg-cube" id="bg-cube" style="transform:rotateX(${g.rx}deg) rotateY(${g.ry}deg)">${[1, 2, 3, 4, 5, 6].map(n => `<span class="bg-face bg-f${n}">${PIPS[n].map(p => `<i style="grid-area:${Math.ceil(p / 3)}/${(p - 1) % 3 + 1}"></i>`).join('')}</span>`).join('')}</div></div>`;
  }
  function snSetupHTML() {
    const c = SN.cfg, ex = courseExtra().length, rows = c.mode === 'cpu' ? 1 : c.n;
    const pool = SNQ.filter(q => c.mods[q[0]]).length + (c.extra ? courseExtra().filter(q => c.mods[q[0]]).length : 0);
    let h = `<div class="card"><span class="kicker">Ladders & Snakes · Setup</span><h2>Set Up Your Game</h2>
      <p class="hint">Land on a <b>ladder foot</b>: answer correctly to climb, or stay put. Land on a <b>snake head</b>: answer correctly to dodge it, or slide down. First to square 100 wins.</p>
      <div class="bg-set">
      <div><h4>Who Is Playing?</h4><div class="chips">${chip('snmode', 'cpu', c.mode === 'cpu', '🤖 Solo vs Computer')}${chip('snmode', 'pass', c.mode === 'pass', '👥 Pass & Play')}</div></div>
      ${c.mode === 'pass' ? `<div><h4>Number of Players</h4><div class="chips">${[1, 2, 3, 4].map(n => chip('sncount', n, c.n === n, n + (n === 1 ? ' player' : ' players'))).join('')}</div></div>` : `<div><h4>Computer Level</h4><div class="chips">${Object.keys(CPU).map(k => chip('sncpu', k, c.cpu === k, CPU[k][1] + ` (${Math.round(CPU[k][0] * 100)}%)`)).join('')}</div><p class="hint">The percentage is how often the computer answers correctly.</p></div>`}
      <div><h4>Players</h4><div class="bg-set" style="gap:8px">`;
    for (let i = 0; i < rows; i++) {
      const used = c.cols.slice(0, rows).filter((_, k) => k !== i);
      h += `<div class="bg-prow"><span class="bg-tokprev" style="--c:${COLS[c.cols[i]][1]}">${esc(initial(c.names[i] || (i === 0 ? A.S.name : '') || 'Player ' + (i + 1)))}</span><label class="bg-sr" for="bg-n${i}">Player ${i + 1} name</label><input class="search bg-name" id="bg-n${i}" data-i="${i}" maxlength="16" autocomplete="off" placeholder="Player ${i + 1}" value="${esc(c.names[i] || (i === 0 ? A.S.name || '' : ''))}"><div class="bg-sws" role="group" aria-label="Token colour for player ${i + 1}">${COLS.map((col, k) => `<button type="button" class="bg-sw ${c.cols[i] === k ? 'sel' : ''}" style="--c:${col[1]}" data-px="sncol" data-i="${i}" data-k="${k}" aria-label="${col[0]}" aria-pressed="${c.cols[i] === k}" ${used.includes(k) ? 'disabled' : ''}></button>`).join('')}</div></div>`;
    }
    if (c.mode === 'cpu') h += `<div class="bg-prow"><span class="bg-tokprev" style="--c:#AEB9DD">🤖</span><span>Computer rival · ${CPU[c.cpu][1]}</span></div>`;
    h += `</div></div>
      <div><h4>Question Topics</h4><div class="chips">${Object.keys(MODS).map(m => chip('snmod', m, c.mods[m], MODLONG[m])).join('')}${ex ? chip('snextra', 1, c.extra, `📚 Plus Course Questions (${ex})`) : ''}</div><p class="hint">${pool} questions in the pool. Every answer comes with an explanation.</p></div>
      <div><h4>Finishing Rule</h4><div class="chips">${chip('snfin', 'exact', c.finish === 'exact', '🎯 Exact roll to 100')}${chip('snfin', 'bounce', c.finish === 'bounce', '↩️ Bounce back')}${chip('snfin', 'any', c.finish === 'any', '🏁 Any roll finishes')}</div></div>
      <div class="row"><button type="button" class="btn gold" data-px="snstart">🎲 Start Game</button>${SN.g && !SN.g.over ? `<button type="button" class="btn ghost" data-px="snresume">Resume current game</button>` : ''}</div>
      </div></div>`;
    return h;
  }
  function snPlayHTML() {
    const g = SN.g, cur = g.players[g.turn], human = !cur.cpu;
    const counts = {}; g.players.forEach(p => counts[p.pos] = (counts[p.pos] || 0) + 1);
    let toks = ''; g.players.forEach((p, i) => { if (i !== g.turn) { const [x, y] = tokPos(g, i, p.pos); toks += tokSVG(p, i, false, x, y); } });
    { const [x, y] = tokPos(g, g.turn, cur.pos); toks += tokSVG(cur, g.turn, !g.over, x, y); }
    const fin = { exact: 'Exact roll needed to land on 100', bounce: 'Overshoot 100 and you bounce back', any: 'Any roll that reaches 100 wins' }[SN.cfg.finish];
    let h = `<div class="bg-play" id="bg-sn">
      <div class="card bg-ctrl">
        <div class="bg-turn"><span class="bg-tokprev" style="--c:${COLS[cur.col][1]}">${cur.cpu ? '🤖' : esc(initial(cur.name))}</span><div><span class="kicker">${g.over ? 'Game over' : human ? 'Your turn' : 'Computer’s turn'}</span><b>${esc(cur.name)}</b></div></div>
        <div class="bg-dicerow">${diceHTML(g)}<button type="button" class="btn gold bg-roll" data-px="snroll" ${g.busy || g.q || g.over || !human ? 'disabled' : ''}>🎲 Roll<kbd class="bg-k">R</kbd></button></div>
        <p class="bg-log" id="bg-log" aria-live="polite">${esc(g.log[0] || '')}</p>
      </div>
      <div class="bg-boardwrap"><div class="bg-board"><svg viewBox="0 0 ${BW} ${BW + TH}" role="img" aria-label="Game board. ${esc(g.players.map(p => p.name + ' on square ' + p.pos).join('; '))}.">${boardSVG()}${toks}</svg></div></div>
      <div class="card bg-plist"><h3>Players</h3>${g.players.map((p, i) => `<div class="bg-pl ${i === g.turn && !g.over ? 'on' : ''}"><span class="bg-tokprev" style="--c:${COLS[p.col][1]}">${p.cpu ? '🤖' : esc(initial(p.name))}</span><span class="n">${esc(p.name)}</span><span class="hint">${p.ok}/${p.ans} ✓</span><b>${p.pos}</b></div>`).join('')}
        <p class="hint bg-legend"><span>🪜 Green square: answer to climb.</span><span>🐍 Red square: answer to dodge.</span><span>🎯 ${fin}.</span></p>
        <div class="row"><button type="button" class="btn ghost" data-px="snsetup">⚙️ Setup</button><button type="button" class="btn ghost" data-px="snagain">🔄 Restart</button></div></div>
    </div>`;
    if (g.q) {
      const q = g.q, done = q.pick != null, lad = q.kind === 'ladder';
      const res = !done ? '' : lad ? (q.ok ? `Correct! Climb from ${q.from} to ${q.to}.` : `Not quite. ${esc(cur.name)} stays on ${q.from}.`) : (q.ok ? `Correct! The snake misses. Stay safe on ${q.from}.` : `Not quite. Slide from ${q.from} down to ${q.to}.`);
      h += `<div class="bg-modal" role="dialog" aria-modal="true" aria-labelledby="bg-qh"><div class="card bg-qcard ${q.popped ? '' : 'bg-pop'}">
        <div class="bg-qhead"><span class="bg-qicon" aria-hidden="true">${lad ? '🪜' : '🐍'}</span><div><span class="kicker">${lad ? 'Ladder challenge' : 'Snake challenge'} · ${esc(MODS[q.mod] || q.mod)} · ${esc(cur.name)}</span><h3 id="bg-qh">${lad ? `Answer Right to Climb to ${q.to}` : `Answer Right to Dodge the Snake`}</h3></div></div>
        <div data-notc><p class="bg-qtext">${esc(q.q)}</p>
        <div class="opts">${q.opts.map((o, k) => `<button type="button" class="opt ${done ? (k === q.ans ? 'right' : k === q.pick ? 'wrong' : '') : ''}" data-px="snpick" data-i="${k}" ${done || q.cpu ? 'disabled' : ''}><span class="bg-k" aria-hidden="true">${k + 1}</span> ${esc(o)}</button>`).join('')}</div></div>
        ${q.cpu && !done ? `<p class="fb note">🤖 The computer is thinking…</p>` : ''}
        ${done ? `<p class="fb ${q.ok ? 'good' : 'bad'}" role="status"><b>${q.cpu ? '🤖 ' : ''}${res}</b> ${esc(q.why)}</p><div class="row"><button type="button" class="btn go" data-px="sncont">${lad ? (q.ok ? '🪜 Climb!' : 'Continue →') : (q.ok ? 'Continue →' : '🐍 Slide…')}</button></div>` : ''}
      </div></div>`;
      q.popped = true;
    }
    if (g.over) {
      const ranked = g.players.slice().sort((a, b) => b.pos - a.pos);
      h += `<div class="bg-modal" role="dialog" aria-modal="true" aria-labelledby="bg-wh"><div class="card bg-qcard bg-win bg-pop">
        <span class="bg-trophy" aria-hidden="true">${g.over.cpu ? '🤖' : '🏆'}</span><h2 id="bg-wh">${esc(g.over.name)} ${g.over.name === 'You' ? 'Win' : 'Wins'}!</h2>
        <p>${g.over.cpu ? 'The computer reached 100 first. Rematch?' : `Square 100 reached in ${g.over.rolls} rolls. That’s the road to Grade One!`}</p>
        <div class="bg-best">${ranked.map((p, i) => `<div class="bg-stat"><span>${['🥇', '🥈', '🥉', '🏅'][i]} ${esc(p.name)}</span><b>Square ${p.pos}</b><span class="hint">${p.ok} of ${p.ans} correct</span></div>`).join('')}</div>
        <div class="row" style="margin-top:12px"><button type="button" class="btn gold" data-px="snagain">🔄 Play Again</button><button type="button" class="btn ghost" data-px="snsetup">⚙️ Change Setup</button><button type="button" class="btn ghost" data-go="board">🎲 Game Night</button></div></div></div>`;
    }
    return h;
  }

  /* ======================= TUG OF WORDS ======================= */
  const TW_NAME = 'Tug of Words: Pull Up Showdown';
  const TWCPU = { easy: { acc: 0.55, min: 6, max: 11, n: 'Easy' }, normal: { acc: 0.72, min: 4, max: 8, n: 'Normal' }, sharp: { acc: 0.88, min: 2.2, max: 5, n: 'Sharp' } };
  const TW = { cfg: { mode: 'team', names: ['Team Hibiscus', 'Team Pelican'], types: { mcq: 1, tf: 1, err: 1, cre: 1, dev: 1 }, time: 15, len: 10, cpu: 'normal' }, g: null };
  function twItems(types) {
    const out = [];
    if (types.mcq) TW_MCQ.forEach(x => out.push({ t: 'mcq', p: x[0], a: x[1], w: x[2], why: x[3] }));
    if (types.tf) TW_TF.forEach(x => out.push({ t: 'tf', p: x[0], tf: x[1], why: x[2] }));
    if (types.err) TW_ERR.forEach(x => out.push({ t: 'err', parts: x[0], ai: x[1], why: x[2] }));
    if (types.cre) TW_CRE.forEach(x => out.push({ t: 'cre', p: x[0], a: x[1], w: x[2], why: x[3] }));
    if (types.dev) TW_DEV.forEach(x => out.push({ t: 'dev', p: x[0], a: x[1], w: shuf(DEVICES.filter(d => d !== x[1])).slice(0, 3), why: x[2] }));
    return out;
  }
  function twNorm(it) {
    if (it.t === 'tf') return { t: 'tf', p: it.p, opts: ['True', 'False'], ans: it.tf ? 0 : 1, why: it.why };
    if (it.t === 'err') return { t: 'err', p: 'Which part contains the error?', parts: it.parts, opts: it.parts.map((x, i) => 'ABCD'[i] + ': ' + x), ans: it.ai, why: it.why };
    const w = it.t === 'dev' ? shuf(DEVICES.filter(d => d !== it.a)).slice(0, 3) : it.w, opts = shuf([it.a].concat(w));
    return { t: it.t, p: it.p, opts, ans: opts.indexOf(it.a), why: it.why };
  }
  function twStart() {
    const c = TW.cfg, solo = c.mode === 'solo';
    const names = solo ? [A.S.name || 'You', 'Computer'] : c.names.map((n, i) => (n || '').trim() || (i ? 'Team B' : 'Team A'));
    TW.g = { mode: c.mode, names, pos: 0, shown: 0, W: c.len, round: 0, max: 30, score: { A: 0, B: 0 }, streak: { A: 0, B: 0 }, bestStreak: { A: 0, B: 0 }, deck: shuf(twItems(c.types)), phase: 'q', q: null, msg: '', over: null, last: Date.now(), anim: null, cpu: TWCPU[c.cpu], fastest: null };
    if (!TW.g.deck.length) TW.g.deck = shuf(twItems({ mcq: 1, tf: 1, err: 1, cre: 1, dev: 1 }));
    const b = best(); b.t.g++; saveSoft();
    twNext(true); ensureTick();
  }
  function twNext(noRender) {
    const T = TW.g; if (!T || T.over) return;
    T.round++;
    if (T.round > T.max) return twFinish(T.pos < 0 ? 'A' : T.pos > 0 ? 'B' : null);
    if (!T.deck.length) T.deck = shuf(twItems(TW.cfg.types));
    const now = Date.now();
    T.q = Object.assign(twNorm(T.deck.pop()), { tried: { A: false, B: false }, picks: {}, answering: T.mode === 'solo' ? 'A' : null, start: now });
    T.phase = 'q'; T.res = null; T.deadline = now + TW.cfg.time * 1000; T.barFrom = now; T.barTo = T.deadline; T.ansDl = 0;
    T.cpuAt = T.mode === 'solo' ? now + (T.cpu.min + Math.random() * (T.cpu.max - T.cpu.min)) * 1000 : 0;
    T.msg = T.mode === 'solo' ? 'Answer before the computer does! Keys 1–4 work too.' : 'Buzz in first! Team A presses A, Team B presses L.';
    FOCUS = T.mode === 'solo' ? '.bg-qa .opt' : null;
    if (!noRender) A.render();
  }
  function twBuzz(team) {
    const T = TW.g; if (!T || T.mode !== 'team' || T.phase !== 'q' || T.q.answering || T.q.tried[team]) return;
    const now = Date.now(); T.q.answering = team; T.ansDl = now + 7000; T.barFrom = now; T.barTo = T.ansDl; T.deadline = Math.max(T.deadline, T.ansDl);
    T.msg = `🔔 ${T.names[team === 'A' ? 0 : 1]} buzzed first! Answer now (1–4).`;
    SFX.buzz(); FOCUS = '.bg-qa .opt'; A.render();
  }
  function twPick(team, k) {
    const T = TW.g; if (!T || T.phase !== 'q') return; const q = T.q;
    if (q.answering !== team || q.tried[team]) return;
    q.tried[team] = true; q.picks[team] = k;
    const nm = T.names[team === 'A' ? 0 : 1], other = team === 'A' ? 'B' : 'A', onm = T.names[team === 'A' ? 1 : 0];
    if (team === 'A' || T.mode === 'team') { const b = best(); b.t.a++; if (k === q.ans) b.t.c++; }
    if (k === q.ans) return twPull(team);
    T.streak[team] = 0; SFX.bad();
    const now = Date.now();
    if (!q.tried[other]) {
      q.answering = T.mode === 'team' ? other : (other === 'A' ? 'A' : null);
      if (T.mode === 'team') { T.ansDl = now + 6000; T.barFrom = now; T.barTo = T.ansDl; T.deadline = Math.max(T.deadline, T.ansDl); T.msg = k < 0 ? `⏰ ${nm} ran out of time. ${onm} can steal!` : `❌ ${nm} got it wrong. ${onm}, steal it!`; FOCUS = '.bg-qa .opt'; }
      else if (other === 'B') { T.cpuAt = now + 900 + Math.random() * 900; T.deadline = Math.max(T.deadline, T.cpuAt + 600); T.msg = '❌ Wrong! The computer is going for the steal…'; FOCUS = null; }
      else { T.deadline = Math.max(T.deadline, now + 5000); T.barFrom = now; T.barTo = T.deadline; T.msg = '🤖 The computer got it wrong. Steal it now!'; FOCUS = '.bg-qa .opt:not(:disabled)'; }
      return A.render();
    }
    twResolve(null, k < 0 ? '⏰ Time’s up for both teams. Nobody pulls.' : '❌ Both sides missed. Nobody pulls this round.');
  }
  function twPull(team) {
    const T = TW.g, q = T.q, nm = T.names[team === 'A' ? 0 : 1];
    T.streak[team]++; T.streak[team === 'A' ? 'B' : 'A'] = 0; T.score[team]++;
    T.bestStreak[team] = Math.max(T.bestStreak[team], T.streak[team]);
    const sec = (Date.now() - q.start) / 1000; if (team === 'A' || T.mode === 'team') T.fastest = T.fastest == null ? sec : Math.min(T.fastest, sec);
    const power = T.streak[team] >= 3, amt = 2 + (power ? 1 : 0);
    T.pos += team === 'A' ? -amt : amt; T.anim = team;
    SFX.creak(); SFX.good();
    const msg = `✅ ${nm} pulls${power ? ` with a 🔥 POWER PULL (${T.streak[team]} in a row)` : ''}!`;
    if (T.pos <= -T.W) return twResolve('A', msg, 'A');
    if (T.pos >= T.W) return twResolve('B', msg, 'B');
    twResolve(team, msg);
  }
  function twResolve(team, msg, winner) {
    const T = TW.g; T.phase = 'res'; T.res = { team }; T.msg = msg; T.q.answering = null; T.cpuAt = 0;
    saveSoft();
    if (winner) return twFinish(winner);
    FOCUS = '[data-px="twnext"]'; A.render();
  }
  function twFinish(winner) {
    const T = TW.g; T.over = { winner }; T.phase = 'over';
    const b = best(); b.t.st = Math.max(b.t.st || 0, T.mode === 'solo' ? T.bestStreak.A : Math.max(T.bestStreak.A, T.bestStreak.B));
    if (winner && (T.mode === 'team' || winner === 'A')) b.t.w++;
    saveSoft(); if (winner) { SFX.cheer(); CONFETTI = true; } FOCUS = '[data-px="twagain"]'; A.render();
    if (T.mode === 'solo' && winner === 'A') A.reward(TW.cfg.cpu === 'sharp' ? 10 : TW.cfg.cpu === 'normal' ? 8 : 6, 'Tug of Words win', { xp: 15 });
    else if (T.mode === 'team' && winner) A.reward(4, 'Team tug match', { xp: 8 });
  }
  function twCpu() {
    const T = TW.g, q = T.q; if (!q || q.tried.B) return;
    q.answering = 'B'; const ok = Math.random() < T.cpu.acc; const wrong = q.opts.map((_, k) => k).filter(k => k !== q.ans);
    if (!q.tried.A) T.msg = '🤖 The computer buzzed in first!';
    twPick('B', ok ? q.ans : wrong[rnd(wrong.length)]);
  }
  let TICK = null;
  function ensureTick() { if (!TICK) TICK = setInterval(twTick, 100); }
  function twTick() {
    const T = TW.g, now = Date.now(); if (!T) return; const dt = now - (T.last || now); T.last = now;
    if (T.phase !== 'q') return;
    const el = document.getElementById('bg-tw');
    if (!el || !A || !A.S.loc || A.S.loc.v !== 'board') { T.deadline += dt; if (T.ansDl) T.ansDl += dt; if (T.cpuAt) T.cpuAt += dt; T.barFrom += dt; T.barTo += dt; return; }
    const bar = document.getElementById('bg-tbar'), num = document.getElementById('bg-tnum'), box = document.getElementById('bg-timer');
    const left = Math.max(0, T.barTo - now), pct = Math.max(0, Math.min(100, left / Math.max(1, T.barTo - T.barFrom) * 100));
    if (bar) bar.style.width = pct.toFixed(1) + '%';
    if (num) { const s = Math.ceil(left / 1000); if (num.textContent !== String(s)) { num.textContent = String(s); if (s <= 3 && s > 0) SFX.tick(); } }
    if (box) box.classList.toggle('low', left < 3500);
    if (T.mode === 'solo' && T.cpuAt && now >= T.cpuAt && !T.q.tried.B) { T.cpuAt = 0; return twCpu(); }
    if (T.mode === 'team' && T.q.answering && T.ansDl && now >= T.ansDl) return twPick(T.q.answering, -1);
    if (now >= T.deadline) {
      if (T.mode === 'solo' && !T.q.tried.A) { const b = best(); b.t.a++; }
      T.streak.A = T.streak.B = 0; twResolve(null, '⏰ Time’s up! Nobody pulls this round.');
    }
  }

  const SKIN = ['#8D5524', '#C68642', '#E0AC69', '#5C3A1E', '#A0673C', '#F1C27D'];
  function figSVG(x, team, k, mirror) {
    const sk = SKIN[(k + (team === 'B' ? 3 : 0)) % 6], sh = team === 'A' ? '#FFD766' : '#4FD1E0', sd = team === 'A' ? '#B8860B' : '#1B7E8A', pants = '#13245E';
    return `<g transform="translate(${x},262)${mirror ? ' scale(-1,1)' : ''}"><g class="bg-fi bg-fi-${team}" style="animation-delay:${(-k * 0.37).toFixed(2)}s">
      <ellipse cx="6" cy="2" rx="28" ry="5" fill="rgba(0,0,0,.35)"/>
      <path d="M-9 -48 L6 -27 L12 -3" stroke="${pants}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-12 -48 L12 -28 L26 -4" stroke="#1B2F75" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="17" cy="-2" rx="10" ry="4.6" fill="#1a1a1a"/><ellipse cx="31" cy="-3" rx="10" ry="4.6" fill="#262626"/><ellipse cx="29" cy="-5" rx="5" ry="1.4" fill="#fff" opacity=".35"/>
      <g transform="translate(-10,-46) rotate(-30)">
        <rect x="-12" y="-46" width="24" height="50" rx="11" fill="${sh}"/><rect x="3" y="-46" width="9" height="50" rx="6" fill="${sd}" opacity=".55"/><rect x="-10" y="-43" width="6" height="40" rx="3" fill="#fff" opacity=".3"/>
        <text x="0" y="-15" text-anchor="middle" font-size="13" fill="${sd}">${team}</text>
        <circle cx="0" cy="-62" r="14.5" fill="${sk}"/><path d="M-14 -64 Q-12 -80 2 -78 Q14 -76 14 -64 Q6 -72 -14 -64Z" fill="#1A1208"/><rect x="-14.5" y="-67" width="29" height="5" rx="2.5" fill="${sh}"/><circle cx="6" cy="-61" r="2" fill="#1A1208"/><path d="M4 -53 Q8 -52 11 -55" stroke="#1A1208" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="-5" cy="-58" r="3.5" fill="#000" opacity=".12"/><ellipse cx="-5" cy="-68" rx="4" ry="2.5" fill="#fff" opacity=".25"/>
      </g>
      <path d="M-30 -80 Q-6 -66 15 -62" stroke="${sk}" stroke-width="7.5" fill="none" stroke-linecap="round"/>
      <path d="M-26 -74 Q-2 -60 25 -61" stroke="${sk}" stroke-width="7.5" fill="none" stroke-linecap="round"/>
    </g></g>`;
  }
  function handSVG(x, team, k, mirror) { const sk = SKIN[(k + (team === 'B' ? 3 : 0)) % 6]; return `<g transform="translate(${x},262)${mirror ? ' scale(-1,1)' : ''}"><circle cx="15" cy="-62" r="5.5" fill="${sk}" stroke="rgba(0,0,0,.25)"/><circle cx="25" cy="-61" r="5.5" fill="${sk}" stroke="rgba(0,0,0,.25)"/></g>`; }
  function arenaSVG(T, mini) {
    const W = T ? T.W : 10, sc = 100 / W, shift = T ? T.shown * sc : 0, ax = [140, 205, 270], bx = [630, 695, 760];
    let stars = ''; for (let i = 0; i < 26; i++) { const x = (i * 137) % 900, y = 12 + (i * 53) % 130; stars += `<circle cx="${x}" cy="${y}" r="${i % 4 ? 1.1 : 1.8}" fill="#fff" opacity="${0.35 + (i % 5) * 0.12}"/>`; }
    const palm = (x, s) => `<g transform="translate(${x},228) scale(${s})" opacity=".9"><path d="M0 0 Q6 -60 -6 -120" stroke="#3A2A12" stroke-width="9" fill="none"/><g fill="#0E5A3A"><path d="M-6 -120 Q-50 -130 -78 -96 Q-44 -116 -6 -116Z"/><path d="M-6 -120 Q40 -140 72 -104 Q34 -122 -6 -114Z"/><path d="M-6 -120 Q-24 -160 -64 -160 Q-30 -148 -8 -118Z"/><path d="M-6 -120 Q20 -164 56 -158 Q20 -150 -4 -118Z"/></g></g>`;
    return `<svg viewBox="0 0 900 300" ${mini ? 'aria-hidden="true"' : `role="img" aria-label="${T ? (T.pos === 0 ? 'The knot is in the centre.' : `The knot is ${Math.abs(T.pos)} of ${W} steps toward ${esc(T.names[T.pos < 0 ? 0 : 1])}.`) : 'Tug of war arena'}"`}>
      <defs><linearGradient id="bgSky${mini ? 'm' : ''}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A1638"/><stop offset="1" stop-color="#1D3F8F"/></linearGradient><linearGradient id="bgSand${mini ? 'm' : ''}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1CF7A"/><stop offset="1" stop-color="#B9862E"/></linearGradient><radialGradient id="bgMoon${mini ? 'm' : ''}"><stop offset="0" stop-color="#FFE9A8" stop-opacity=".55"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></radialGradient></defs>
      <rect width="900" height="300" fill="url(#bgSky${mini ? 'm' : ''})"/>${stars}
      <circle cx="790" cy="58" r="64" fill="url(#bgMoon${mini ? 'm' : ''})"/><circle cx="790" cy="58" r="24" fill="#FFF1C2"/><circle cx="782" cy="52" r="4" fill="#E8D49A"/><circle cx="798" cy="64" r="3" fill="#E8D49A"/>
      <rect y="170" width="900" height="60" fill="#0F3D78"/><path d="M60 186 h60 M300 196 h90 M560 182 h50 M700 200 h80 M150 210 h40" stroke="#7FD1FF" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>
      ${palm(38, 0.9)}${palm(872, 0.8)}
      <path d="M0 222 Q450 196 900 222 V300 H0Z" fill="url(#bgSand${mini ? 'm' : ''})"/>
      <path d="M0 250 Q300 240 520 262 T900 256" stroke="#fff" stroke-opacity=".12" stroke-width="3" fill="none"/>
      <line x1="450" y1="214" x2="450" y2="296" stroke="#fff" stroke-opacity=".65" stroke-width="3" stroke-dasharray="7 6"/>
      <line x1="350" y1="216" x2="350" y2="296" stroke="#FFD766" stroke-width="5"/><line x1="550" y1="216" x2="550" y2="296" stroke="#4FD1E0" stroke-width="5"/>
      <text x="340" y="292" text-anchor="end" font-size="15" fill="#7A5410">A</text><text x="560" y="292" font-size="15" fill="#145F69">B</text>
      <g id="${mini ? 'bg-ropem' : 'bg-rope'}" style="transform:translateX(${shift.toFixed(1)}px)">
        <path d="M70 262 Q450 270 830 262" stroke="#000" stroke-opacity=".14" stroke-width="8" fill="none"/>
        ${ax.map((x, k) => figSVG(x, 'A', k, false)).join('')}${bx.map((x, k) => figSVG(x, 'B', k, true)).join('')}
        <line x1="70" y1="200" x2="830" y2="200" stroke="#6E4A1C" stroke-width="12" stroke-linecap="round"/>
        <line x1="70" y1="200" x2="830" y2="200" stroke="#C99A5B" stroke-width="9" stroke-dasharray="8 5" stroke-linecap="round"/>
        <line x1="72" y1="197" x2="828" y2="197" stroke="#F6DFAA" stroke-width="2" stroke-opacity=".75"/>
        ${ax.map((x, k) => handSVG(x, 'A', k, false)).join('')}${bx.map((x, k) => handSVG(x, 'B', k, true)).join('')}
        <g transform="translate(450,200)"><path class="bg-flag" d="M-9 4 H9 L14 40 L0 31 L-14 40Z" fill="#FF4D5E" stroke="#A31D2C" stroke-width="1.5"/><path d="M-4 10 L0 24 L4 10" stroke="#FFD766" stroke-width="2" fill="none"/><ellipse cx="0" cy="0" rx="12" ry="9" fill="#7A5122" stroke="#4A2F10" stroke-width="1.5"/><ellipse cx="-3" cy="-3" rx="5" ry="3" fill="#F6DFAA" opacity=".6"/></g>
      </g></svg>`;
  }
  function twSetupHTML() {
    const c = TW.cfg, n = twItems(c.types).length;
    return `<div class="card"><span class="kicker">Tug of Words · Setup</span><h2>Set Up the Showdown</h2>
      <p class="hint">Each correct answer pulls the rope toward your side. Three in a row earns a 🔥 power pull. First to drag the knot past their line wins.</p>
      <div class="bg-set">
      <div><h4>Mode</h4><div class="chips">${chip('twmode', 'team', c.mode === 'team', '🏫 Classroom: Team vs Team')}${chip('twmode', 'solo', c.mode === 'solo', '🤖 Solo vs Computer')}</div>
        <p class="hint">${c.mode === 'team' ? 'One screen, two teams. Buzz with the A and L keys (or the big buttons); the buzzing team answers. A wrong answer lets the other team steal.' : 'Beat the computer to the answer. If it answers wrongly first, you can steal.'}</p></div>
      ${c.mode === 'team' ? `<div><h4>Team Names</h4><div class="grid2">${[0, 1].map(i => `<div class="field"><label for="bg-t${i}">Team ${'AB'[i]} (key ${'AL'[i]})</label><input class="search bg-tname" id="bg-t${i}" data-i="${i}" maxlength="22" autocomplete="off" value="${esc(c.names[i])}"></div>`).join('')}</div></div>`
        : `<div><h4>Computer Level</h4><div class="chips">${Object.keys(TWCPU).map(k => chip('twcpu', k, c.cpu === k, `${TWCPU[k].n} · ${Math.round(TWCPU[k].acc * 100)}% · ${TWCPU[k].min}–${TWCPU[k].max}s`)).join('')}</div><p class="hint">Accuracy and how quickly the computer answers.</p></div>`}
      <div><h4>Question Types</h4><div class="chips">${Object.keys(TYPES).map(t => chip('twtype', t, c.types[t], TYPES[t][0] + ' ' + TYPES[t][1])).join('')}</div><p class="hint">${n} items in the pool.</p></div>
      <div><h4>Timer per Question</h4><div class="chips">${[10, 15, 20, 30].map(s => chip('twtime', s, c.time === s, s + ' seconds')).join('')}</div></div>
      <div><h4>Match Length</h4><div class="chips">${[[6, 'Quick'], [10, 'Standard'], [14, 'Marathon']].map(([v, l]) => chip('twlen', v, c.len === v, `${l} (${Math.ceil(v / 2)}+ pulls)`)).join('')}</div></div>
      <div class="row"><button type="button" class="btn gold" data-px="twstart">🪢 Start the Tug</button>${TW.g && !TW.g.over ? `<button type="button" class="btn ghost" data-px="twresume">Resume current match</button>` : ''}</div>
      </div></div>`;
  }
  function twPlayHTML() {
    const T = TW.g, q = T.q, solo = T.mode === 'solo', res = T.phase !== 'q';
    const ty = TYPES[q.t];
    const optDis = k => res || !q.answering || q.tried[q.answering] || (q.picks.A === k || q.picks.B === k);
    const optCls = k => res ? (k === q.ans ? 'right' : (q.picks.A === k || q.picks.B === k) ? 'wrong' : '') : ((q.picks.A === k || q.picks.B === k) ? 'wrong' : '');
    const panel = (team, i) => {
      const nm = T.names[i], tc = team === 'A' ? '#FFD766' : '#4FD1E0', td = team === 'A' ? '#A87C08' : '#16707B', can = !solo && T.phase === 'q' && !q.answering && !q.tried[team];
      const status = res ? '' : q.answering === team ? (solo && team === 'B' ? '🤖 Answering…' : '🎤 Answering!') : q.tried[team] ? '❌ Missed' : solo && team === 'B' ? '🤔 Thinking…' : '';
      return `<div class="card bg-panel ${team === 'A' ? 'bg-pa' : 'bg-pb'}" style="--tc:${tc};--td:${td}"><h3>${solo && team === 'B' ? '🤖 ' : ''}${esc(nm)}</h3>
        <div class="bg-score"><span class="ribbon">✓ ${T.score[team]}</span>${T.streak[team] ? `<span class="ribbon">🔥 ${T.streak[team]}</span>` : ''}</div>
        ${solo ? (team === 'A' ? `<p class="hint">Answer with a click or keys 1–4.</p>` : `<p class="hint">${TWCPU[TW.cfg.cpu].n} level</p>`) : `<button type="button" class="bg-buzz ${q.answering === team && !res ? 'lit' : ''}" data-px="twbuzz" data-k="${team}" ${can ? '' : 'disabled'} aria-label="Buzz for ${esc(nm)} (key ${team === 'A' ? 'A' : 'L'})"><span class="big" aria-hidden="true">🔔</span><span>Buzz <kbd class="bg-k">${team === 'A' ? 'A' : 'L'}</kbd></span></button>`}
        <p class="hint" aria-live="polite">${status}</p></div>`;
    };
    let h = `<div class="bg-tw" id="bg-tw">
      <div class="bg-twtop"><span class="kicker">Round ${Math.min(T.round, T.max)} of ${T.max} · first to ${T.W} steps</span><div class="row"><button type="button" class="btn ghost" data-px="twsetup">⚙️ Setup</button><button type="button" class="btn ghost" data-px="twagain">🔄 Restart</button></div></div>
      <div class="bg-arena">${arenaSVG(T)}</div>
      <div class="bg-twgrid">
        ${panel('A', 0)}
        <div class="card bg-qa" data-ans="${res ? '' : q.answering || ''}">
          <span class="kicker">${ty[0]} ${ty[1]}</span>
          <div class="bg-timer" id="bg-timer"><div class="pbar"><i id="bg-tbar" style="width:${res ? 0 : 100}%"></i></div><b id="bg-tnum">${res ? 0 : Math.ceil((T.barTo - Date.now()) / 1000)}</b><span class="bg-sr">seconds left</span></div>
          <div data-notc>${q.t === 'err' ? `<div class="bg-sent">${q.parts.map((x, i) => `<span><sup>${'ABCD'[i]}</sup>${esc(x)}</span>`).join('')}</div>` : ''}
          <p class="bg-qtext">${esc(q.p)}</p>
          <div class="opts">${q.opts.map((o, k) => `<button type="button" class="opt ${optCls(k)}" data-px="twpick" data-i="${k}" ${optDis(k) ? 'disabled' : ''}><span class="bg-k" aria-hidden="true">${k + 1}</span> ${esc(o)}</button>`).join('')}</div></div>
          <p class="bg-status" aria-live="assertive">${esc(T.msg)}</p>
          ${res ? `<p class="fb ${T.res && T.res.team ? 'good' : 'note'}">${esc(q.why)}</p>${T.over ? '' : `<div class="row"><button type="button" class="btn go" data-px="twnext">Next Question →</button></div>`}` : ''}
        </div>
        ${panel('B', 1)}
      </div></div>`;
    if (T.over) {
      const w = T.over.winner, wn = w ? T.names[w === 'A' ? 0 : 1] : null, lost = solo && w === 'B';
      h += `<div class="bg-modal" role="dialog" aria-modal="true" aria-labelledby="bg-wh"><div class="card bg-qcard bg-win bg-pop">
        <span class="bg-trophy" aria-hidden="true">${!w ? '🤝' : lost ? '🤖' : '🏆'}</span><h2 id="bg-wh">${!w ? 'It’s a Draw!' : wn === 'You' ? 'You Win the Tug!' : esc(wn) + ' Wins the Tug!'}</h2>
        <p>${!w ? 'Thirty rounds and nobody crossed the line. Rematch?' : lost ? 'The computer dragged the knot over. Pull up and go again!' : 'The knot crossed the line. Big respect!'}</p>
        <div class="bg-best"><div class="bg-stat"><span>${esc(T.names[0])}</span><b>${T.score.A} correct</b><span class="hint">Best streak ${T.bestStreak.A}</span></div><div class="bg-stat"><span>${esc(T.names[1])}</span><b>${T.score.B} correct</b><span class="hint">Best streak ${T.bestStreak.B}</span></div>${T.fastest != null ? `<div class="bg-stat"><span>Fastest answer</span><b>${T.fastest.toFixed(1)}s</b></div>` : ''}</div>
        <div class="row" style="margin-top:12px"><button type="button" class="btn gold" data-px="twagain">🔄 Rematch</button><button type="button" class="btn ghost" data-px="twsetup">⚙️ Change Setup</button><button type="button" class="btn ghost" data-go="board">🎲 Game Night</button></div></div></div>`;
    }
    return h;
  }

  /* ======================= HUB ======================= */
  function miniBoard() {
    let s = `<svg viewBox="0 0 400 200" aria-hidden="true"><rect width="400" height="200" fill="#0A1638"/><g transform="translate(40,18)"><rect x="-8" y="-6" width="336" height="186" rx="14" fill="#8A6214"/><rect x="-8" y="-10" width="336" height="182" rx="14" fill="#E0AC3C"/>`;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) s += `<rect x="${c * 40 + 2}" y="${r * 40 + 2}" width="36" height="36" rx="6" fill="${(r + c) % 2 ? '#0F2259' : '#1E3E92'}"/><path d="M${c * 40 + 5} ${r * 40 + 34} V${r * 40 + 5} H${c * 40 + 34}" stroke="#fff" stroke-opacity=".18" stroke-width="1.5" fill="none"/>`;
    s += ladderSVG(60, 140, 140, 20, 8) + snakeSVG(snakePts(260, 30, 180, 140, 0), SNAKE_COLS[0], 0.8) + `</g><g transform="translate(330,150) rotate(-12)"><rect x="-22" y="-22" width="44" height="44" rx="9" fill="#F6ECD2" stroke="#C9B27A" stroke-width="2"/><circle cx="-10" cy="-10" r="4" fill="#0A1638"/><circle cx="0" cy="0" r="4" fill="#0A1638"/><circle cx="10" cy="10" r="4" fill="#0A1638"/></g></svg>`;
    return s;
  }
  function hubHTML() {
    const b = best();
    return `<section class="hero bg-hero"><span class="eyebrow">Play & Revise</span><h1>Game Night</h1><p>Two board games built on the CAPE Communication Studies syllabus. Play solo against the computer, pass the device around, or put Team vs Team on the projector.</p></section>
      <div class="bg-gtiles">
        <button type="button" class="tile bg-gtile" data-go="board" data-tab="snakes"><span class="bg-art">${miniBoard()}</span><h3>${SN_NAME}</h3><span class="meta">Roll the 3D die, climb ladders and dodge snakes by answering ${SNQ.length}+ questions from Modules 1–3 and Paper 3. 1–4 players or solo vs computer.</span><span class="ribbon">🪜 ${SNQ.length} questions</span></button>
        <button type="button" class="tile bg-gtile" data-go="board" data-tab="tug"><span class="bg-art">${arenaSVG(null, true)}</span><h3>${TW_NAME}</h3><span class="meta">Buzz in, answer fast, pull the rope. Rapid fire, true or false, spot the error, Creole to Standard English and device spotting. Team mode for the classroom.</span><span class="ribbon">🪢 ${TW_MCQ.length + TW_TF.length + TW_ERR.length + TW_CRE.length + TW_DEV.length} items</span></button>
      </div>
      <div class="card"><h3>Your Best Results</h3><div class="bg-best">
        <div class="bg-stat"><span>🪜 Games played</span><b>${b.s.g}</b></div><div class="bg-stat"><span>🏆 Board wins</span><b>${b.s.w}</b></div><div class="bg-stat"><span>⚡ Fewest rolls to win</span><b>${b.s.b || '–'}</b></div><div class="bg-stat"><span>✓ Board accuracy</span><b>${b.s.a ? Math.round(b.s.c / b.s.a * 100) + '%' : '–'}</b></div>
        <div class="bg-stat"><span>🪢 Tug matches</span><b>${b.t.g}</b></div><div class="bg-stat"><span>🏆 Tug wins</span><b>${b.t.w}</b></div><div class="bg-stat"><span>🔥 Best streak</span><b>${b.t.st || 0}</b></div><div class="bg-stat"><span>✓ Tug accuracy</span><b>${b.t.a ? Math.round(b.t.c / b.t.a * 100) + '%' : '–'}</b></div>
      </div><p class="hint">Wins earn coins. Sound effects follow your sound setting.</p></div>`;
  }
  function tabs(tab) {
    return `<div class="chips" role="tablist" aria-label="Game Night">${[['hub', '🎲 Game Night'], ['snakes', '🪜 Ladders & Snakes'], ['tug', '🪢 Tug of Words']].map(([k, n]) => `<button type="button" class="chip ${tab === k ? 'sel' : ''}" role="tab" aria-selected="${tab === k}" data-go="board" data-tab="${k}">${n}</button>`).join('')}</div>`;
  }

  /* ======================= KEYBOARD ======================= */
  function onKey(e) {
    if (!A || !A.S.loc || A.S.loc.v !== 'board' || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target; if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    const k = (e.key || '').toLowerCase(), tab = A.S.loc.tab;
    if (tab === 'snakes' && SN.g) {
      const g = SN.g;
      if (k === 'r' && !g.q && !g.over && !g.busy && !g.players[g.turn].cpu) { e.preventDefault(); snRoll(); }
      else if (/^[1-4]$/.test(k) && g.q && g.q.pick == null && !g.q.cpu && +k <= g.q.opts.length) { e.preventDefault(); snAnswer(+k - 1); }
    } else if (tab === 'tug' && TW.g && TW.g.phase === 'q') {
      const T = TW.g;
      if (T.mode === 'team' && (k === 'a' || k === 'l')) { e.preventDefault(); twBuzz(k === 'a' ? 'A' : 'B'); }
      else if (/^[1-4]$/.test(k) && T.q.answering && +k <= T.q.opts.length && !(T.mode === 'solo' && T.q.answering !== 'A')) { const b = document.querySelector(`.bg-qa [data-px="twpick"][data-i="${+k - 1}"]`); if (b && !b.disabled) { e.preventDefault(); twPick(T.q.answering, +k - 1); } }
    }
  }

  /* ======================= PLUGIN ======================= */
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'board',
    title: 'Game Night',
    tile: { icon: '🎲', meta: 'Ladders & Snakes quiz board and a Tug of Words team showdown' },
    render(api, loc) {
      A = api; const tab = loc.tab || 'hub';
      let h = `<div class="bg-wrap">${tabs(tab)}`;
      if (tab === 'snakes') h += SN.g && !SN.cfg.setup ? snPlayHTML() : snSetupHTML();
      else if (tab === 'tug') h += TW.g && !TW.cfg.setup ? twPlayHTML() : twSetupHTML();
      else h += hubHTML();
      return h + '</div>';
    },
    mount(api, loc, stage) {
      A = api;
      if (!window.__bgKey) { window.__bgKey = 1; document.addEventListener('keydown', e => { try { onKey(e); } catch (err) { } }); }
      stage.querySelectorAll('.bg-name').forEach(inp => inp.addEventListener('input', () => { SN.cfg.names[+inp.dataset.i] = inp.value; const pv = inp.parentNode.querySelector('.bg-tokprev'); if (pv) pv.textContent = initial(inp.value || 'Player ' + (+inp.dataset.i + 1)); }));
      stage.querySelectorAll('.bg-tname').forEach(inp => inp.addEventListener('input', () => { TW.cfg.names[+inp.dataset.i] = inp.value; }));
      const T = TW.g;
      if (loc.tab === 'tug' && T && !TW.cfg.setup && T.shown !== T.pos) {
        const team = T.anim; T.anim = null;
        const go = () => { const r = document.getElementById('bg-rope'); if (r) r.style.transform = `translateX(${(T.pos * 100 / T.W).toFixed(1)}px)`; T.shown = T.pos; if (team && !RM()) { stage.querySelectorAll('.bg-fi-' + team).forEach(f => f.classList.add('heave')); stage.querySelectorAll('.bg-fi-' + (team === 'A' ? 'B' : 'A')).forEach(f => f.classList.add('stumble')); } };
        if (RM() || !window.requestAnimationFrame) go(); else requestAnimationFrame(() => requestAnimationFrame(go));
      }
      if (CONFETTI) { CONFETTI = false; confetti(); }
      if (FOCUS) { const el = stage.querySelector(FOCUS) || document.querySelector(FOCUS); FOCUS = null; if (el) try { el.focus({ preventScroll: true }); } catch (e) { } }
    },
    click(action, el, api, e) {
      A = api; const c = SN.cfg, t = TW.cfg, k = el.dataset.k;
      switch (action) {
        case 'snmode': c.mode = k; break;
        case 'sncount': c.n = +k; break;
        case 'sncpu': c.cpu = k; break;
        case 'sncol': { const i = +el.dataset.i; c.cols[i] = +k; break; }
        case 'snmod': { c.mods[k] = c.mods[k] ? 0 : 1; if (!Object.values(c.mods).some(Boolean)) { c.mods[k] = 1; api.toast('Keep at least one topic switched on.'); } break; }
        case 'snextra': c.extra = c.extra ? 0 : 1; break;
        case 'snfin': c.finish = k; break;
        case 'snstart': c.setup = false; snStart(); break;
        case 'snresume': c.setup = false; break;
        case 'snsetup': c.setup = true; break;
        case 'snagain': { c.setup = false; const old = SN.g; snStart(); if (old && c.mode === 'pass') SN.g.players.forEach((p, i) => { if (old.players[i]) p.name = old.players[i].name; }); break; }
        case 'snroll': return snRoll();
        case 'snpick': return snAnswer(+el.dataset.i);
        case 'sncont': return snContinue();
        case 'twmode': t.mode = k; break;
        case 'twcpu': t.cpu = k; break;
        case 'twtype': { t.types[k] = t.types[k] ? 0 : 1; if (!Object.values(t.types).some(Boolean)) { t.types[k] = 1; api.toast('Keep at least one question type switched on.'); } break; }
        case 'twtime': t.time = +k; break;
        case 'twlen': t.len = +k; break;
        case 'twstart': case 'twagain': t.setup = false; twStart(); break;
        case 'twresume': t.setup = false; if (TW.g) { const now = Date.now(); TW.g.last = now; } break;
        case 'twsetup': t.setup = true; break;
        case 'twbuzz': return twBuzz(k);
        case 'twpick': { const T = TW.g; if (!T || !T.q) return; return twPick(T.q.answering, +el.dataset.i); }
        case 'twnext': return twNext();
        default: return;
      }
      api.render();
    }
  });
})();
