/* CAPE Communication Studies: Language Lab — Developed by Kester Small */
window.COURSE_LAB = {
  spellingRules: [
    {
      rule: `I before E, except after C`,
      explain: `<p>When the letters <b>i</b> and <b>e</b> make an <b>"ee"</b> sound, write <b>ie</b>, except straight after <b>c</b>, where you write <b>ei</b>.</p><p>The rule only works for the "ee" sound. When the sound is "ay" (as in <i>neighbour</i>) or "eye" (as in <i>height</i>), it usually does not apply.</p>`,
      examples: [`believe`, `achieve`, `field`, `piece`, `receive`, `ceiling`, `deceit`, `conceive`],
      exceptions: [`seize`, `weird`, `protein`, `caffeine`, `either`, `neither`, `species`, `science`, `efficient`, `foreign`]
    },
    {
      rule: `Doubling the final consonant`,
      explain: `<p>Double the final consonant before a suffix beginning with a vowel (<i>-ed, -ing, -er, -est</i>) when the word ends in <b>one vowel + one consonant</b> and the stress falls on the <b>last syllable</b> (or the word has one syllable).</p><p>If the stress is not on the last syllable, do not double: <i>happen → happened</i>. In British spelling, a final <b>l</b> after a single vowel is always doubled: <i>travel → travelled</i>.</p>`,
      examples: [`stop → stopped`, `run → running`, `begin → beginning`, `refer → referred`, `occur → occurrence`, `prefer → preferred`, `travel → travelling`, `cancel → cancelled`],
      exceptions: [`visit → visited (stress on first syllable)`, `offer → offered`, `benefit → benefited`, `prefer → preference (stress moves)`, `fix → fixed (x is never doubled)`, `snow → snowing (w is never doubled)`]
    },
    {
      rule: `Dropping the silent E`,
      explain: `<p>Drop a silent final <b>e</b> before a suffix that begins with a <b>vowel</b> (<i>-ing, -able, -ous</i>). Keep it before a suffix that begins with a <b>consonant</b> (<i>-ment, -ful, -ly, -ness</i>).</p><p>Keep the <b>e</b> after <b>c</b> or <b>g</b> when the suffix begins with <i>a</i> or <i>o</i>, so that the c or g stays soft: <i>noticeable, courageous</i>.</p>`,
      examples: [`make → making`, `hope → hoping`, `use → usable`, `fame → famous`, `hope → hopeful`, `manage → management`, `notice → noticeable`, `courage → courageous`],
      exceptions: [`argue → argument`, `true → truly`, `whole → wholly`, `judge → judgment (judgement is also accepted in British English)`, `nine → ninth`, `awe → awful`, `be → being`, `dye → dyeing`]
    },
    {
      rule: `Changing Y to I`,
      explain: `<p>When a word ends in a <b>consonant + y</b>, change the <b>y</b> to <b>i</b> before adding a suffix, unless the suffix begins with <b>i</b>.</p><p>When a word ends in a <b>vowel + y</b>, keep the <b>y</b>.</p>`,
      examples: [`happy → happiness`, `carry → carried`, `beauty → beautiful`, `country → countries`, `try → trying (keep y before -ing)`, `play → played`, `enjoy → enjoyment`, `key → keys`],
      exceptions: [`day → daily`, `pay → paid`, `say → said`, `lay → laid`, `shy → shyness`, `dry → dryness`]
    },
    {
      rule: `-able or -ible?`,
      explain: `<p>Use <b>-able</b> when the root is a complete word on its own: <i>accept → acceptable</i>. Use <b>-ible</b> when the root is not a complete English word: <i>vis → visible, poss → possible</i>.</p><p>This is a guideline, not a law. Words ending in a soft c or g often take <b>-ible</b> (<i>forcible, legible</i>). There are many exceptions, so learn common ones by sight.</p>`,
      examples: [`acceptable`, `dependable`, `comfortable`, `available`, `visible`, `possible`, `terrible`, `credible`],
      exceptions: [`responsible (respons- is not a word)`, `sensible`, `accessible`, `flexible`, `capable`, `probable`, `inevitable`]
    },
    {
      rule: `-ance/-ant or -ence/-ent?`,
      explain: `<p>There is no fully reliable rule, but there are helpful patterns. Words with a related form in <b>-ation</b> usually take <b>-ance/-ant</b>: <i>tolerate, toleration → tolerance</i>. A soft <b>c</b> or <b>g</b> before the ending is usually followed by <b>-ence/-ent</b>: <i>innocence, intelligence</i>.</p><p>Keep the noun and adjective in the same family: <i>relevant → relevance; independent → independence</i>.</p>`,
      examples: [`appearance`, `attendance`, `significance`, `relevance`, `existence`, `independence`, `confidence`, `occurrence`],
      exceptions: [`maintenance (from maintain)`, `resistance`, `persistence`, `pronunciation (from pronounce)`, `dependant (noun, British) / dependent (adjective)`]
    },
    {
      rule: `-ful and -fully`,
      explain: `<p>The suffix <b>-ful</b> has only <b>one l</b>: <i>hopeful, careful, beautiful</i>. When you add <b>-ly</b> to make an adverb, you get <b>-fully</b> with <b>two l's</b>: <i>hopefully, carefully</i>.</p><p>The word <i>full</i> keeps two l's on its own, but becomes <b>-ful</b> as a suffix.</p>`,
      examples: [`careful → carefully`, `hopeful → hopefully`, `grateful → gratefully`, `successful → successfully`, `spoonful`, `handful`, `faithful → faithfully`, `respectful → respectfully`],
      exceptions: [`fulfil (British; one l at the end)`, `fulfilment (British)`, `skilful (British) / skillful (American)`, `wilful (British)`]
    },
    {
      rule: `Plurals, including -f to -ves`,
      explain: `<p>Most nouns add <b>-s</b>. Add <b>-es</b> after <i>s, ss, sh, ch, x, z</i>. For consonant + y, change y to i and add <b>-es</b>. Many nouns ending in <b>-f</b> or <b>-fe</b> change to <b>-ves</b>, but some just add -s.</p><p>Nouns ending in <b>-o</b> vary: some add -es (<i>tomatoes, potatoes, heroes</i>), others just -s (<i>radios, pianos, photos</i>). Some plurals are irregular or come from Latin and Greek.</p>`,
      examples: [`church → churches`, `box → boxes`, `party → parties`, `leaf → leaves`, `knife → knives`, `half → halves`, `life → lives`, `potato → potatoes`],
      exceptions: [`roof → roofs`, `chief → chiefs`, `belief → beliefs`, `child → children`, `criterion → criteria`, `phenomenon → phenomena`, `analysis → analyses`, `medium → media`]
    },
    {
      rule: `Prefixes do not change the root`,
      explain: `<p>When you add a prefix such as <b>un-, dis-, mis-, im-, il-, ir-, re-</b> or <b>inter-</b>, do not add or drop letters from the root. If the prefix ends with the same letter that the root begins with, you will get a double letter.</p><p>This explains why <i>unnecessary</i> has two n's and <i>dissatisfied</i> has two s's, while <i>disappoint</i> has only one s.</p>`,
      examples: [`un + necessary = unnecessary`, `dis + satisfied = dissatisfied`, `mis + spell = misspell`, `im + mature = immature`, `il + legal = illegal`, `ir + relevant = irrelevant`, `dis + appear = disappear`, `inter + national = international`],
      exceptions: [`Hyphen used before a capital: un-Caribbean`, `Hyphen to avoid confusion: re-cover (cover again) vs recover`, `co-operate (also cooperate)`]
    },
    {
      rule: `-cede, -ceed or -sede?`,
      explain: `<p>Only <b>one</b> English word ends in <b>-sede</b>: <i>supersede</i>. Only <b>three</b> end in <b>-ceed</b>: <i>exceed, proceed, succeed</i>. All the others end in <b>-cede</b>.</p><p>Note that <i>proceed</i> becomes <i>procedure</i> (one e).</p>`,
      examples: [`supersede`, `exceed`, `proceed`, `succeed`, `concede`, `precede`, `recede`, `intercede`],
      exceptions: [`procedure (from proceed)`, `accede`, `secede`]
    },
    {
      rule: `British vs American spelling`,
      explain: `<p>CXC accepts either British or American spelling, but you must be <b>consistent</b> throughout a single answer. Most Caribbean schools, and this course, use British spelling.</p><p>Common patterns: <b>-our/-or</b> (colour/color), <b>-re/-er</b> (centre/center), <b>-ise/-ize</b> (organise/organize, both acceptable in British English), <b>-ce/-se</b> for nouns and verbs (licence noun, license verb), and <b>doubled l</b> (travelled/traveled).</p>`,
      examples: [`colour / color`, `behaviour / behavior`, `centre / center`, `metre / meter`, `organise / organize`, `programme / program`, `defence / defense`, `travelled / traveled`],
      exceptions: [`computer program (British also uses program for software)`, `practice (noun) and practise (verb) in British English`, `licence (noun) and license (verb) in British English`, `analyse (British) / analyze (American)`]
    },
    {
      rule: `Homophones: same sound, different spelling`,
      explain: `<p>Homophones sound the same but differ in spelling and meaning. Spell-checkers do not catch them, because each is a real word. Check meaning and grammar.</p><p>Quick tests: <b>they're</b> = they are; <b>it's</b> = it is or it has; <b>your</b> shows ownership; <b>there</b> contains <i>here</i> (place); <b>their</b> contains <i>heir</i> (ownership).</p>`,
      examples: [`their / there / they're`, `your / you're`, `its / it's`, `to / too / two`, `whose / who's`, `principal / principle`, `stationary / stationery`, `complement / compliment`],
      exceptions: [`affect / effect (not exact homophones, but often confused)`, `accept / except (near-homophones)`, `practice / practise (noun and verb in British English)`]
    }
  ],
  spellingLists: [
    {
      level: `Foundation`, title: `Everyday essentials`,
      words: [
        { w: `because`, sentence: `The ferry to Anguilla was delayed because of rough seas.`, tip: `Big Elephants Can Always Understand Small Elephants.` },
        { w: `necessary`, sentence: `It is necessary to bring your ID to the Civil Registry.`, tip: `One Collar, two Sleeves: one c, double s.` },
        { w: `separate`, sentence: `Please separate plastic bottles from the general rubbish.`, tip: `There is "a rat" in sep-a-rate.` },
        { w: `definitely`, sentence: `We are definitely going to the Carnival Village on Friday.`, tip: `It contains the word "finite"; no a anywhere.` },
        { w: `beginning`, sentence: `The beginning of hurricane season is 1 June.`, tip: `Double n: begin + n + ing (stress on the last syllable).` },
        { w: `believe`, sentence: `I believe the new bus routes will help students in Spanish Town.`, tip: `Never believe a lie: the word "lie" is inside.` },
        { w: `friend`, sentence: `My friend from Grenville came over for the weekend.`, tip: `A friend is with you to the end: fri-END.` },
        { w: `tomorrow`, sentence: `The Little League final is tomorrow at the stadium.`, tip: `One m, double r.` },
        { w: `until`, sentence: `The shop on Bay Street stays open until the last ship leaves.`, tip: `Only one l (but "till" has two).` },
        { w: `government`, sentence: `The government announced new rules for building permits.`, tip: `Govern + ment: do not forget the silent n.` },
        { w: `February`, sentence: `Mock exams begin in February.`, tip: `Say it carefully: Feb-RU-ary.` },
        { w: `Wednesday`, sentence: `Choir practice is every Wednesday after school.`, tip: `Say it as "Wed-nes-day" to remember the d and the n.` },
        { w: `which`, sentence: `Which ferry goes to Bequia on Sundays?`, tip: `The question word has an h after the w; "witch" is a different word.` },
        { w: `truly`, sentence: `She was truly grateful for the scholarship.`, tip: `True drops its e: true → truly.` },
        { w: `argument`, sentence: `His argument for a later school start was persuasive.`, tip: `Argue drops its e before -ment: do not lose your e in an argument.` },
        { w: `library`, sentence: `The public library in Castries has a quiet study room.`, tip: `Say both r's: li-BRA-ry.` },
        { w: `restaurant`, sentence: `The restaurant in Oranjestad was fully booked.`, tip: `Rest + au + rant: you rest, then rant about the bill.` },
        { w: `neighbour`, sentence: `Our neighbour helped us put up the hurricane shutters.`, tip: `British spelling keeps the -our; e before i (the "ay" sound).` },
        { w: `minute`, sentence: `The bus leaves in one minute.`, tip: `Min-ute: think of a minute as a "mini" unit of time.` },
        { w: `surprise`, sentence: `The class planned a surprise party for their teacher.`, tip: `Sur + prise: the first r is often forgotten.` }
      ]
    },
    {
      level: `Intermediate`, title: `Academic words`,
      words: [
        { w: `analyse`, sentence: `Analyse the writer's use of statistics in the extract.`, tip: `British -yse; the noun is analysis.` },
        { w: `hypothesis`, sentence: `Our hypothesis was that students who read daily score higher in Paper 1.`, tip: `Hypo- (under) + thesis. Plural: hypotheses.` },
        { w: `significant`, sentence: `There was a significant drop in tourist arrivals after the hurricane.`, tip: `Sign + i + fic + ant: think "it's a SIGN".` },
        { w: `environment`, sentence: `Plastic waste damages the marine environment around the island.`, tip: `There is "iron" in envIRONment.` },
        { w: `phenomenon`, sentence: `Code-switching is a common phenomenon in Grenada.`, tip: `Singular ends -on; plural is phenomena.` },
        { w: `criterion`, sentence: `Currency is one criterion for judging a source.`, tip: `Singular -on; plural criteria.` },
        { w: `consequence`, sentence: `One consequence of the drought was higher water bills.`, tip: `Con + sequence: something that follows in sequence.` },
        { w: `interpretation`, sentence: `Each student offered a different interpretation of the poem.`, tip: `Inter + pret + ation; no extra "a" after "pret".` },
        { w: `perspective`, sentence: `The article presents the perspective of local fishermen.`, tip: `Per + spect (to look): a way of looking.` },
        { w: `evaluate`, sentence: `Evaluate the reliability of the website as a source.`, tip: `E + value + ate: to judge the value of something.` },
        { w: `research`, sentence: `Her research focused on language attitudes among teenagers.`, tip: `Re + search: to search again.` },
        { w: `independent`, sentence: `The report was written by an independent consultant.`, tip: `All e's after the d: in-de-pend-ent.` },
        { w: `accommodate`, sentence: `The new hall can accommodate 300 students.`, tip: `It is big enough to accommodate two c's and two m's.` },
        { w: `occurrence`, sentence: `Power cuts were a daily occurrence after the storm.`, tip: `Double c, double r, and -ence.` },
        { w: `relevant`, sentence: `Only include examples that are relevant to the question.`, tip: `Rel-e-vant: e before v, a after.` },
        { w: `whereas`, sentence: `Primary data is collected first-hand, whereas secondary data already exists.`, tip: `One word: where + as.` },
        { w: `therefore`, sentence: `The sample was small; therefore, the results may not be reliable.`, tip: `There + fore: keep the e in the middle and at the end.` },
        { w: `although`, sentence: `Although the poll was online, many older residents took part.`, tip: `One l in the middle: al + though.` },
        { w: `approximately`, sentence: `Approximately 120 students completed the questionnaire.`, tip: `Double p, then -ately.` },
        { w: `bibliography`, sentence: `List all sources in your bibliography.`, tip: `Biblio (book) + graphy (writing).` }
      ]
    },
    {
      level: `Intermediate`, title: `Communication Studies terms`,
      words: [
        { w: `paralanguage`, sentence: `Her paralanguage, a sharp tone and a long pause, showed her annoyance.`, tip: `Para (beside) + language: the vocal cues beside the words.` },
        { w: `connotation`, sentence: `"Home" has warm connotations for many migrants in the diaspora.`, tip: `Double n: con + notation.` },
        { w: `denotation`, sentence: `The denotation of "rock" is simply a stone.`, tip: `One n at the start: de + notation.` },
        { w: `rhetorical`, sentence: `The prime minister used a rhetorical question to engage the crowd.`, tip: `Rh at the start, like rhythm and rhyme.` },
        { w: `colloquial`, sentence: `"Lime" is a colloquial word for hanging out with friends.`, tip: `Double l, then -quial: col-lo-quial.` },
        { w: `credibility`, sentence: `Citing the Meteorological Department increases the article's credibility.`, tip: `Cred (believe) + ibility: -ible, not -able.` },
        { w: `acrolect`, sentence: `The acrolect is the variety closest to Standard English.`, tip: `Acro (top) + lect: the top of the continuum.` },
        { w: `mesolect`, sentence: `Most daily conversation in the school yard falls in the mesolect.`, tip: `Meso (middle) + lect.` },
        { w: `basilect`, sentence: `The basilect is the variety furthest from Standard English.`, tip: `Basi (base) + lect: the base of the continuum.` },
        { w: `register`, sentence: `Switch to a formal register when you write to the Minister.`, tip: `Reg-is-ter: think "a cash register records formally".` },
        { w: `dialect`, sentence: `Each island has its own dialect features.`, tip: `Dia + lect: ends in -ect, not -ict.` },
        { w: `bilingualism`, sentence: `Many families in Aruba are bilingual in Papiamento and Dutch, and often English and Spanish too, so bilingualism is common.`, tip: `Bi (two) + lingual (tongue) + ism.` },
        { w: `diglossia`, sentence: `Diglossia describes two varieties with different social functions.`, tip: `Di (two) + gloss (tongue): double s.` },
        { w: `persuasive`, sentence: `The campaign used persuasive images of polluted beaches.`, tip: `Persuade drops the d: persua-sive.` },
        { w: `expository`, sentence: `An expository essay explains rather than tells a story.`, tip: `Expose + itory: no e after the s.` },
        { w: `questionnaire`, sentence: `The questionnaire had twelve closed questions.`, tip: `Double n, then -aire (French origin).` },
        { w: `reliability`, sentence: `Repeating the survey tests its reliability.`, tip: `Rely → reli: y changes to i.` },
        { w: `validity`, sentence: `Leading questions reduce the validity of your data.`, tip: `Valid + ity: three i's.` },
        { w: `audience`, sentence: `Profile your audience before choosing a medium.`, tip: `Audi (hear) + ence.` },
        { w: `communication`, sentence: `Effective communication needs feedback.`, tip: `Double m: com-mun-i-ca-tion.` }
      ]
    },
    {
      level: `Advanced`, title: `Exam words`,
      words: [
        { w: `examination`, sentence: `The examination begins at 8:30 a.m. in the auditorium.`, tip: `Exam + in + ation.` },
        { w: `comprehension`, sentence: `Paper 1 includes items testing comprehension of short extracts.`, tip: `Com + pre + hension: from the verb comprehend; one m.` },
        { w: `summarise`, sentence: `Summarise the writer's main argument in no more than 50 words.`, tip: `Summary drops y: summar + ise (British).` },
        { w: `discuss`, sentence: `Discuss the language attitudes shown in the extract.`, tip: `Double s at the end.` },
        { w: `explain`, sentence: `Explain how the writer uses statistics to persuade.`, tip: `Ex + plain; but the noun is explanation (no i).` },
        { w: `justify`, sentence: `Justify your choice of medium in 50 to 100 words.`, tip: `Justify → justification: y becomes i.` },
        { w: `identify`, sentence: `Identify two organisational strategies used in the passage.`, tip: `Identi + fy: do not add an extra e.` },
        { w: `describe`, sentence: `Describe the non-verbal cues in the scenario.`, tip: `De + scribe: no i after the d.` },
        { w: `compare`, sentence: `Compare the two writers' attitudes to Creole.`, tip: `The noun is comparison (no e before the s).` },
        { w: `contrast`, sentence: `Contrast the formal and informal registers in the text.`, tip: `Contra (against) + st.` },
        { w: `outline`, sentence: `Outline two challenges the audience may face in receiving the message.`, tip: `Out + line: one word, no hyphen.` },
        { w: `assess`, sentence: `Assess the credibility of the online article.`, tip: `Two pairs of s: a-ss-e-ss.` },
        { w: `technique`, sentence: `Name one literary technique the writer uses.`, tip: `Tech + nique: French -que ending.` },
        { w: `strategies`, sentence: `Writers use several organisational strategies.`, tip: `Strategy → strategies: y to i + es.` },
        { w: `paragraph`, sentence: `Each paragraph should develop one point.`, tip: `Para + graph: ph sounds like f.` },
        { w: `conclusion`, sentence: `Your conclusion should restate your main point briefly.`, tip: `Conclude → conclusion: d becomes s.` },
        { w: `introduction`, sentence: `Begin your introduction with the writer's main point.`, tip: `Intro + duction.` },
        { w: `appropriate`, sentence: `Choose a register appropriate to the audience.`, tip: `Double p, and "pro" in the middle.` },
        { w: `effectiveness`, sentence: `Comment on the effectiveness of the writer's appeals.`, tip: `Effective + ness: double f, double s.` },
        { w: `illustrate`, sentence: `Use an example to illustrate your point.`, tip: `Double l: il + lustrate.` }
      ]
    },
    {
      level: `Intermediate`, title: `Commonly confused`,
      words: [
        { w: `affect`, sentence: `Sargassum can affect tourism on the east coast.`, tip: `Affect is usually the verb (Action); effect is usually the noun (End result).` },
        { w: `effect`, sentence: `The effect of the new road was less traffic in San Fernando.`, tip: `An effect is an End result.` },
        { w: `accept`, sentence: `We accept your invitation to the graduation.`, tip: `Accept = receive; except = excluding.` },
        { w: `except`, sentence: `All the shops were closed except the pharmacy.`, tip: `EXcept EXcludes.` },
        { w: `principal`, sentence: `The principal addressed the assembly about exam conduct.`, tip: `The principal is your PAL; it also means "main".` },
        { w: `principle`, sentence: `Honesty is a principle she lives by.`, tip: `A principLE is a ruLE.` },
        { w: `stationary`, sentence: `The bus remained stationary in the traffic on Frederick Street.`, tip: `stationAry = stAying still.` },
        { w: `stationery`, sentence: `Buy your stationery before the new term.`, tip: `stationEry = pEns and Envelopes.` },
        { w: `complement`, sentence: `The steel pan music was a perfect complement to the dinner.`, tip: `A complEment complEtes something.` },
        { w: `compliment`, sentence: `She received a compliment on her oral presentation.`, tip: `I like to receive a complIment.` },
        { w: `loose`, sentence: `A loose sheet of galvanise can be dangerous in a storm.`, tip: `Loose (not tight) rhymes with goose.` },
        { w: `lose`, sentence: `Do not lose your candidate number.`, tip: `Lose has lost one o.` },
        { w: `advice`, sentence: `My guidance counsellor gave me good advice.`, tip: `Advice (noun, c) rhymes with "ice".` },
        { w: `advise`, sentence: `I advise you to start revising early.`, tip: `Advise (verb, s) rhymes with "eyes"; British practice/practise and licence/license follow the same c/s pattern.` },
        { w: `whose`, sentence: `Whose bag was left in the lab?`, tip: `Whose shows ownership; who's = who is or who has.` },
        { w: `who's`, sentence: `Who's presenting first on Monday?`, tip: `Expand it: who is presenting first?` },
        { w: `than`, sentence: `Chaguanas is busier than Arima.`, tip: `Than compares; then refers to time.` },
        { w: `then`, sentence: `Plan your answer, then begin writing.`, tip: `thEn = whEn (time).` },
        { w: `quite`, sentence: `The exam was quite challenging.`, tip: `Quite (fairly) ends in -te; quiet (silent) ends in -et.` },
        { w: `quiet`, sentence: `Please be quiet during the listening test.`, tip: `Quiet has two syllables: qui-et.` }
      ]
    },
    {
      level: `Advanced`, title: `Challenge`,
      words: [
        { w: `conscientious`, sentence: `She is a conscientious student who checks every answer.`, tip: `Con + science + tious: it has "science" inside.` },
        { w: `embarrass`, sentence: `Mispronouncing the guest's name could embarrass the host.`, tip: `Double r, double s: you go Really Red and Smile Shyly.` },
        { w: `harass`, sentence: `It is illegal to harass people online.`, tip: `One r, double s (unlike embarrass).` },
        { w: `millennium`, sentence: `The new millennium brought mobile phones to almost every home.`, tip: `Double l, double n: mille (thousand) + annum (year).` },
        { w: `onomatopoeia`, sentence: `"Splash" and "boom" are examples of onomatopoeia.`, tip: `Ono-mato-poeia: break it into chunks; poeia is from the Greek for "making".` },
        { w: `idiosyncrasy`, sentence: `Each speaker has a small idiosyncrasy in their accent.`, tip: `Ends in -asy, not -acy.` },
        { w: `liaison`, sentence: `She acted as liaison between the students and the board.`, tip: `Two i's: li-a-i-son.` },
        { w: `miscellaneous`, sentence: `File the miscellaneous receipts in a separate folder.`, tip: `Misc + ell + aneous: double l.` },
        { w: `occasionally`, sentence: `Occasionally, the ferry to Carriacou is cancelled.`, tip: `Double c, single s, double l.` },
        { w: `perseverance`, sentence: `Her perseverance earned her a university scholarship.`, tip: `Per + severe + ance: no r after the second e.` },
        { w: `pronunciation`, sentence: `Pronunciation differs across the Caribbean.`, tip: `Pronounce loses the o: pro-nun-ciation.` },
        { w: `rhythm`, sentence: `The rhythm of the calypso kept everyone dancing.`, tip: `Rhythm Helps Your Two Hips Move.` },
        { w: `supersede`, sentence: `The new syllabus will supersede the old one next year.`, tip: `The only English word ending in -sede.` },
        { w: `unnecessary`, sentence: `Remove unnecessary words from your summary.`, tip: `un + necessary: double n, one c, double s.` },
        { w: `privilege`, sentence: `It is a privilege to represent the school.`, tip: `No d: privi + lege.` },
        { w: `bureaucracy`, sentence: `Getting a business licence can involve a great deal of bureaucracy.`, tip: `Bureau (French "office", with eau) + cracy (rule).` },
        { w: `manoeuvre`, sentence: `The pilot had to manoeuvre carefully to land on the short runway in Saba.`, tip: `British: man-oeu-vre; American: maneuver.` },
        { w: `entrepreneur`, sentence: `The young entrepreneur opened a food truck in Chaguanas.`, tip: `Entre + pre + neur: French origin.` },
        { w: `exhilarate`, sentence: `Kayaking through the mangroves can exhilarate even tired tourists.`, tip: `Don't forget the silent h: ex-H-ilarate.` },
        { w: `acquaintance`, sentence: `He is an acquaintance from my CXC study group.`, tip: `ac + quaint + ance: the c before q is easy to miss.` }
      ]
    }
  ],
  grammar: [
    {
      topic: `Subject–verb agreement`,
      explain: `<p>A verb must agree with its subject in <b>number</b>. In the present tense, a singular third-person subject (he, she, it, the teacher) takes a verb ending in <b>-s</b>: <i>She <b>walks</b> to school.</i> A plural subject does not: <i>They <b>walk</b> to school.</i></p>
<p><b>Creole and Standard English:</b> Many Caribbean Creoles do not mark the verb for person or number: <i>"She walk to school every day"</i> is grammatical in Creole, because the subject already shows who is acting. Standard English, however, requires the <b>-s</b>. Neither system is "wrong"; they simply follow different rules, and the exam requires Standard English.</p>
<ul><li>Find the true subject, ignoring phrases in between: <i>The <b>list</b> of names <b>is</b> on the board.</i></li><li>Subjects joined by <b>and</b> are plural: <i>Maria and Kevin <b>are</b> late.</i></li><li>With <b>or / nor</b>, the verb agrees with the nearer subject: <i>Neither the teacher nor the students <b>were</b> ready.</i></li><li>Indefinite pronouns such as <i>everyone, each, nobody, either</i> are singular: <i>Everyone <b>has</b> a copy.</i></li><li>In "there is / there are", the subject follows the verb: <i>There <b>are</b> three reasons.</i></li></ul>`,
      quiz: [
        { q: `Choose the correct verb: The box of mangoes ___ on the table.`, options: [`are`, `is`, `were`, `be`], answer: 1, why: `The subject is "box" (singular); "of mangoes" is just a prepositional phrase.` },
        { q: `Choose the correct verb: Each of the candidates ___ a calculator.`, options: [`need`, `needs`, `are needing`, `have need`], answer: 1, why: `"Each" is singular, so it takes "needs".` },
        { q: `Which sentence is in Standard English?`, options: [`He go to church every Sunday.`, `He goes to church every Sunday.`, `He going to church every Sunday.`, `He does go to church every Sundays.`], answer: 1, why: `A third-person singular subject in the simple present takes -s: "goes".` },
        { q: `Choose the correct verb: Neither my brother nor my cousins ___ coming to the fete.`, options: [`is`, `was`, `are`, `has`], answer: 2, why: `With "neither... nor", the verb agrees with the nearer subject, "cousins" (plural).` },
        { q: `Choose the correct verb: There ___ several reasons for the delay.`, options: [`is`, `was`, `are`, `has been`], answer: 2, why: `The subject is "reasons" (plural), which comes after the verb.` }
      ]
    },
    {
      topic: `Tense consistency`,
      explain: `<p>Stay in one tense unless the time of the action genuinely changes. If you begin a narrative in the past, keep it in the past.</p>
<p><b>Creole and Standard English:</b> Many Caribbean Creoles show time with markers such as <i>did, ben, en</i> or <i>go</i>, or from context, rather than by changing the verb: <i>"Yesterday she walk to town."</i> Standard English marks past time on the verb itself: <i>"Yesterday she <b>walked</b> to town."</i> In formal writing, check every verb in a past-time passage.</p>
<ul><li>Narratives and summaries of events are usually in the <b>past tense</b>.</li><li>When discussing what a writer does in a text, use the <b>literary present</b>: <i>The writer <b>argues</b> that...</i></li><li>Use the <b>past perfect</b> (had + past participle) for an action earlier than another past action: <i>She <b>had left</b> before the storm <b>hit</b>.</i></li></ul>`,
      quiz: [
        { q: `Choose the correct form: When the hurricane passed, we ___ outside to check the damage.`, options: [`go`, `goes`, `went`, `going`], answer: 2, why: `"Passed" sets the time in the past, so the verb must also be past: "went".` },
        { q: `Which sentence shows consistent tense?`, options: [`He opened the door and sees the flood.`, `He opens the door and saw the flood.`, `He opened the door and saw the flood.`, `He open the door and seen the flood.`], answer: 2, why: `Both verbs are in the simple past.` },
        { q: `In a Paper 2 essay, which is the preferred way to discuss a writer's technique?`, options: [`The writer used statistics to persuade.`, `The writer uses statistics to persuade.`, `The writer was using statistics to persuade.`, `The writer had used statistics to persuade.`], answer: 1, why: `The literary present is used to discuss what a text does, because the text still exists and still does it.` },
        { q: `Choose the correct form: By the time the ambulance arrived, the crowd ___.`, options: [`left`, `has left`, `had left`, `leaves`], answer: 2, why: `The past perfect shows that leaving happened before the arrival.` },
        { q: `Which Standard English sentence matches the Creole "Yesterday mi did see she a town"?`, options: [`Yesterday I see her in town.`, `Yesterday I saw her in town.`, `Yesterday I seen her in town.`, `Yesterday I am seeing her in town.`], answer: 1, why: `Standard English marks past time on the verb: "saw". "Seen" is the past participle and needs "have".` }
      ]
    },
    {
      topic: `Pronoun agreement and case`,
      explain: `<p>A pronoun must agree with its <b>antecedent</b> (the noun it replaces) in number and person, and must be in the correct <b>case</b>.</p>
<ul><li><b>Subject case:</b> I, he, she, we, they, who. <i><b>She</b> and <b>I</b> presented.</i></li><li><b>Object case:</b> me, him, her, us, them, whom. <i>The teacher praised <b>her</b> and <b>me</b>.</i></li><li><b>Possessive:</b> my, his, her, its, our, their, whose. Possessive pronouns never take an apostrophe.</li></ul>
<p><b>Creole and Standard English:</b> In many Creoles, one form serves several cases: <i>"Him tell me"</i> or <i>"She book"</i> (meaning her book), and <i>"unu"</i> or <i>"allyuh"</i> marks plural "you". Standard English distinguishes subject, object and possessive forms, so formal writing must use <i>"He told me"</i> and <i>"her book"</i>.</p>
<p><b>Test:</b> Remove the other person. <i>"Me and Shania went"</i> becomes <i>"Me went"</i>, which is clearly wrong, so write <i>"Shania and I went"</i>.</p>`,
      quiz: [
        { q: `Choose the correct pronoun: Jason and ___ will lead the group discussion.`, options: [`me`, `I`, `myself`, `mine`], answer: 1, why: `The pronoun is part of the subject, so the subject case "I" is needed.` },
        { q: `Choose the correct pronoun: The principal gave the award to Keisha and ___.`, options: [`I`, `me`, `myself`, `we`], answer: 1, why: `After the preposition "to", the object case "me" is required.` },
        { q: `Choose the correct pronoun: Every student must bring ___ own calculator.`, options: [`their`, `his or her`, `there`, `Both "their" and "his or her" are acceptable`], answer: 3, why: `"His or her" is traditional; singular "their" is now widely accepted in formal English. Both agree in meaning with "every student".` },
        { q: `Which is the Standard English version of "She book left in the lab"?`, options: [`She book was left in the lab.`, `Her book was left in the lab.`, `Hers book was left in the lab.`, `She's book was left in the lab.`], answer: 1, why: `Standard English uses the possessive form "her" before a noun.` },
        { q: `Choose the correct word: The committee announced ___ decision.`, options: [`it's`, `its`, `their's`, `its'`], answer: 1, why: `"Its" is the possessive; "it's" means "it is" or "it has". "Their's" and "its'" do not exist.` }
      ]
    },
    {
      topic: `Sentence fragments`,
      explain: `<p>A <b>sentence</b> needs a subject, a finite verb and a complete thought. A <b>fragment</b> is missing one of these, but is punctuated as if it were a sentence.</p>
<ul><li>Missing verb: <i>The new airport terminal. ✗</i></li><li>-ing word with no helper: <i>The students waiting outside. ✗</i> → <i>The students <b>were</b> waiting outside.</i></li><li>Dependent clause alone: <i>Because the road was flooded. ✗</i> → <i>Because the road was flooded, school closed early.</i></li></ul>
<p><b>Creole and Standard English:</b> Many Creoles do not need a form of "be" before an adjective or an -ing verb: <i>"The teacher vex"</i>, <i>"She going home"</i>. These are full sentences in Creole. In Standard English, add the verb "be": <i>"The teacher <b>is</b> angry"</i>, <i>"She <b>is</b> going home"</i>.</p>
<p>Fragments are acceptable in advertising and creative writing for effect, but avoid them in expository essays.</p>`,
      quiz: [
        { q: `Which is a complete sentence?`, options: [`Although the bus was late.`, `The tourists walking along Broad Street.`, `The tourists walked along Broad Street.`, `Walking along Broad Street in the sun.`], answer: 2, why: `It has a subject (tourists), a finite verb (walked) and a complete thought.` },
        { q: `Which is the Standard English version of "The food ready"?`, options: [`The food ready now.`, `The food is ready.`, `The food be ready.`, `The food readying.`], answer: 1, why: `Standard English needs the linking verb "is" before the adjective.` },
        { q: `How can you fix the fragment "Because the generator failed."?`, options: [`Add an exclamation mark.`, `Remove "because".`, `Attach it to an independent clause.`, `Either remove "because" or attach it to a main clause.`], answer: 3, why: `Removing "because" makes it independent; attaching it to a main clause also works.` },
        { q: `Which is a fragment?`, options: [`Stop.`, `She smiled.`, `The results of the survey.`, `It rained all night.`], answer: 2, why: `"The results of the survey" has no verb. "Stop." is a complete imperative sentence with an understood subject "you".` },
        { q: `Where is a deliberate fragment most acceptable?`, options: [`In a Paper 2 expository essay.`, `In a formal letter to the Minister.`, `In a catchy advertising slogan.`, `In a research methodology section.`], answer: 2, why: `Fragments can be used for effect in advertising and creative writing, but not in formal expository writing.` }
      ]
    },
    {
      topic: `Run-ons and comma splices`,
      explain: `<p>A <b>run-on</b> (fused sentence) joins two independent clauses with no punctuation. A <b>comma splice</b> joins them with only a comma.</p>
<p><i>The ferry was late the passengers were angry. ✗</i> &nbsp; <i>The ferry was late, the passengers were angry. ✗</i></p>
<p>Fix them in one of four ways:</p>
<ul><li>Full stop: <i>The ferry was late. The passengers were angry.</i></li><li>Semicolon: <i>The ferry was late; the passengers were angry.</i></li><li>Comma + coordinating conjunction (FANBOYS): <i>The ferry was late, <b>so</b> the passengers were angry.</i></li><li>Subordinate one clause: <i><b>Because</b> the ferry was late, the passengers were angry.</i></li></ul>
<p><b>Watch out:</b> Words such as <i>however, therefore</i> and <i>moreover</i> are not conjunctions. Use a semicolon or full stop before them: <i>It rained; <b>however</b>, the match continued.</i></p>`,
      quiz: [
        { q: `Which sentence is a comma splice?`, options: [`I studied hard, so I passed.`, `I studied hard; I passed.`, `I studied hard, I passed.`, `Because I studied hard, I passed.`], answer: 2, why: `Two independent clauses are joined only by a comma.` },
        { q: `Which correctly fixes "The beach was crowded we left early"?`, options: [`The beach was crowded, we left early.`, `The beach was crowded, however we left early.`, `The beach was crowded, so we left early.`, `The beach was crowded we, left early.`], answer: 2, why: `A comma plus the coordinating conjunction "so" correctly joins two independent clauses.` },
        { q: `Which is correctly punctuated?`, options: [`The data was limited, however, it was useful.`, `The data was limited; however, it was useful.`, `The data was limited however it was useful.`, `The data was limited, however it was useful.`], answer: 1, why: `"However" is a conjunctive adverb; it needs a semicolon before it and a comma after it.` },
        { q: `Which is NOT a coordinating conjunction?`, options: [`but`, `yet`, `therefore`, `or`], answer: 2, why: `The coordinating conjunctions are for, and, nor, but, or, yet, so (FANBOYS). "Therefore" is a conjunctive adverb.` },
        { q: `Which sentence is a run-on?`, options: [`She sang and he played the pan.`, `She sang he played the pan.`, `She sang while he played the pan.`, `She sang; he played the pan.`], answer: 1, why: `Two independent clauses are fused with no punctuation or conjunction.` }
      ]
    },
    {
      topic: `Misplaced and dangling modifiers`,
      explain: `<p>A <b>modifier</b> is a word or phrase that describes something. Place it as close as possible to the word it describes.</p>
<ul><li><b>Misplaced modifier:</b> <i>She served sandwiches to the guests on paper plates.</i> (The guests were on paper plates?) → <i>She served the guests sandwiches on paper plates.</i></li><li><b>Dangling modifier:</b> the word being described is missing altogether. <i>Walking along the boardwalk, the sunset was beautiful.</i> (The sunset was walking?) → <i>Walking along the boardwalk, <b>we</b> saw a beautiful sunset.</i></li><li><b>Limiting words</b> such as <i>only, just, almost, nearly</i> change meaning depending on position: <i>Only she passed</i> vs <i>She only passed</i>.</li></ul>
<p><b>Test:</b> After an opening -ing or -ed phrase, ask "Who is doing this?" The answer must be the subject that comes straight after the comma.</p>`,
      quiz: [
        { q: `Which sentence has a dangling modifier?`, options: [`Having finished the exam, Maria left the room.`, `Having finished the exam, the room was empty.`, `Maria left the room after finishing the exam.`, `After the exam, Maria left.`], answer: 1, why: `The room did not finish the exam; the person who did is missing.` },
        { q: `Which is the best correction of "Barking loudly, I saw the dog"?`, options: [`I saw the dog, barking loudly.`, `I saw the dog that was barking loudly.`, `Barking loudly I saw the dog.`, `I, barking loudly, saw the dog.`], answer: 1, why: `The relative clause clearly attaches "barking loudly" to the dog.` },
        { q: `Which sentence means that nobody else passed the test?`, options: [`Only Shanice passed the test.`, `Shanice only passed the test.`, `Shanice passed only the test.`, `Shanice passed the test only.`], answer: 0, why: `"Only" placed before "Shanice" limits the subject: she, and nobody else, passed. Moving "only" changes what it limits.` },
        { q: `Which sentence has a misplaced modifier?`, options: [`We bought a fridge from the store with a broken door.`, `We bought a fridge with a broken door from the store.`, `From the store, we bought a fridge with a broken door.`, `The fridge we bought had a broken door.`], answer: 0, why: `It suggests the store had the broken door.` },
        { q: `Correct this: "Covered in Sargassum, the tourists avoided the beach."`, options: [`The tourists, covered in Sargassum, avoided the beach.`, `The tourists avoided the beach, which was covered in Sargassum.`, `Covered in Sargassum the tourists avoided the beach.`, `Avoiding the beach, Sargassum covered the tourists.`], answer: 1, why: `It was the beach, not the tourists, that was covered in Sargassum.` }
      ]
    },
    {
      topic: `Parallel structure`,
      explain: `<p>Items in a list or comparison should have the same grammatical form. This makes writing balanced, clear and persuasive, which is why speech writers use it.</p>
<ul><li><i>She likes swimming, hiking and <s>to cycle</s>. ✗</i> → <i>She likes swimming, hiking and cycling.</i></li><li>Paired conjunctions need parallel parts: <i>not only... but also, either... or, both... and</i>. <i>The project was <b>not only</b> late <b>but also</b> incomplete.</i></li><li>In comparisons, compare like with like: <i>The rainfall in Dominica is higher than <b>that</b> in Jamaica.</i></li></ul>
<p>Parallelism is also a rhetorical device. Notice how it creates rhythm in speeches: <i>"We will rebuild our homes, restore our beaches and renew our hope."</i></p>`,
      quiz: [
        { q: `Which sentence is parallel?`, options: [`The job requires typing, filing and to answer phones.`, `The job requires typing, filing and answering phones.`, `The job requires to type, filing and answering phones.`, `The job requires typing, to file and answering phones.`], answer: 1, why: `All three items are -ing forms.` },
        { q: `Choose the parallel version.`, options: [`He is not only talented but also works hard.`, `He is not only talented but also hard-working.`, `He not only is talented but also hard-working.`, `Not only he is talented but hard-working.`], answer: 1, why: `"Talented" and "hard-working" are both adjectives following "is".` },
        { q: `Which comparison is correctly parallel?`, options: [`The cost of living here is higher than Aruba.`, `The cost of living here is higher than in Aruba.`, `The cost of living here is higher than that of Aruba's.`, `Here is higher than Aruba for cost of living.`], answer: 1, why: `It compares living costs here with living costs in Aruba, like with like.` },
        { q: `Which sentence uses parallelism as a rhetorical device?`, options: [`We came, we saw, we conquered.`, `We came and then were seeing.`, `Coming, we saw and had conquered.`, `We came; saw was next.`], answer: 0, why: `Three clauses with the same structure create rhythm and emphasis.` },
        { q: `Fix: "Students should read widely, practise past papers and they should sleep well."`, options: [`...read widely, practise past papers and sleep well.`, `...reading widely, practise past papers and sleep well.`, `...read widely, practising past papers and they sleep well.`, `No change needed.`], answer: 0, why: `Three base-form verbs after "should" make the list parallel.` }
      ]
    },
    {
      topic: `Active and passive voice`,
      explain: `<p>In the <b>active voice</b>, the subject performs the action: <i>The Minister <b>opened</b> the new school.</i> In the <b>passive voice</b>, the subject receives the action, using a form of <b>be</b> + past participle: <i>The new school <b>was opened</b> (by the Minister).</i></p>
<ul><li>Use the <b>active</b> voice for clear, direct, energetic writing.</li><li>Use the <b>passive</b> when the doer is unknown, unimportant or obvious, or in scientific and formal reports: <i>The samples <b>were tested</b> at 25 °C.</i></li><li>Writers and politicians may use the passive to hide responsibility: <i>"Mistakes were made."</i> Spotting this is a useful Paper 2 analysis point.</li></ul>
<p><b>Creole and Standard English:</b> Many Creoles express passive meaning without "be" or a past participle: <i>"The house build last year."</i> Standard English requires <i>"The house <b>was built</b> last year."</i></p>`,
      quiz: [
        { q: `Which sentence is in the passive voice?`, options: [`The committee approved the budget.`, `The budget was approved by the committee.`, `The committee is approving the budget.`, `The committee will approve the budget.`], answer: 1, why: `The subject "budget" receives the action, using "was" + past participle.` },
        { q: `Change to active: "The report was written by the students."`, options: [`The students wrote the report.`, `The students were writing by the report.`, `The report wrote the students.`, `The students had been written the report.`], answer: 0, why: `The doer (students) becomes the subject.` },
        { q: `Why might a company say "Errors were made in your bill"?`, options: [`It is more grammatically correct.`, `The passive avoids naming who made the errors.`, `The active voice is not allowed in letters.`, `It is shorter.`], answer: 1, why: `The passive can conceal responsibility, a point worth noting in analysis.` },
        { q: `Standard English version of "The road fix last month":`, options: [`The road fixed last month.`, `The road was fixed last month.`, `The road is fix last month.`, `The road been fixed last month.`], answer: 1, why: `The passive needs "was" + past participle "fixed".` },
        { q: `Where is the passive voice most appropriate?`, options: [`A motivational speech.`, `A friendly text message.`, `The method section of a science report.`, `A personal diary.`], answer: 2, why: `In method sections, the focus is on what was done, not who did it.` }
      ]
    },
    {
      topic: `Collective nouns`,
      explain: `<p>A <b>collective noun</b> names a group: <i>team, committee, class, jury, family, government, audience, staff, police, crowd</i>.</p>
<ul><li>When the group acts as <b>one unit</b>, use a singular verb: <i>The committee <b>has</b> reached its decision.</i></li><li>When members act <b>individually</b>, British English often allows a plural verb: <i>The jury <b>are</b> arguing among themselves.</i></li><li>Be <b>consistent</b> with pronouns: <i>The team <b>has</b> won <b>its</b> match</i> (not "its... their").</li><li><i>Police</i> and <i>people</i> are always plural: <i>The police <b>are</b> investigating.</i></li><li><i>News, mathematics, physics</i> and <i>economics</i> look plural but take singular verbs.</li></ul>
<p>American English almost always uses a singular verb with collective nouns. In CAPE, either is accepted if you are consistent.</p>`,
      quiz: [
        { q: `Choose the best verb: The government ___ announced its new policy.`, options: [`have`, `has`, `are`, `were`], answer: 1, why: `The government acts as one unit, and "its" confirms the singular.` },
        { q: `Choose the correct verb: The police ___ searching the area.`, options: [`is`, `was`, `are`, `has`], answer: 2, why: `"Police" is always treated as plural.` },
        { q: `Choose the correct verb: Economics ___ my favourite subject.`, options: [`are`, `is`, `were`, `be`], answer: 1, why: `Subject names ending in -ics take a singular verb.` },
        { q: `Which sentence is consistent?`, options: [`The team played their best and won its trophy.`, `The team played its best and won its trophy.`, `The team are playing its best.`, `The team has played their best.`], answer: 1, why: `Singular verb and singular pronoun "its" throughout.` },
        { q: `Choose the correct verb: The news ___ good today.`, options: [`are`, `were`, `is`, `have been`], answer: 2, why: `"News" is an uncountable noun and takes a singular verb.` }
      ]
    },
    {
      topic: `Conjunctions and clauses`,
      explain: `<p>An <b>independent clause</b> can stand alone as a sentence. A <b>dependent (subordinate) clause</b> cannot; it begins with a subordinating conjunction or relative pronoun.</p>
<ul><li><b>Coordinating conjunctions</b> (FANBOYS: for, and, nor, but, or, yet, so) join equal clauses. Use a comma before them when joining two independent clauses.</li><li><b>Subordinating conjunctions</b> (because, although, while, since, unless, if, when, whereas) introduce dependent clauses. If the dependent clause comes first, follow it with a comma: <i><b>Although</b> it rained, the parade continued.</i></li><li><b>Relative pronouns</b> (who, whom, whose, which, that) introduce relative clauses.</li><li>Do not double up conjunctions: <i><s>Although</s> it rained, <s>but</s> the parade continued. ✗</i></li></ul>
<p>Varying clause structure (simple, compound, complex sentences) is rewarded under <b>Expression</b> in CAPE mark schemes.</p>`,
      quiz: [
        { q: `Which sentence is correctly constructed?`, options: [`Although she was tired, but she finished the essay.`, `Although she was tired, she finished the essay.`, `She was tired, although, she finished the essay.`, `Although she was tired she, finished the essay.`], answer: 1, why: `Use one conjunction only; "although" already shows contrast.` },
        { q: `Which is a subordinating conjunction?`, options: [`and`, `but`, `because`, `so`], answer: 2, why: `"Because" introduces a dependent clause; the others are coordinating conjunctions.` },
        { q: `Which sentence is complex (contains a dependent clause)?`, options: [`The bell rang.`, `The bell rang, and we left.`, `When the bell rang, we left.`, `The bell rang; we left.`], answer: 2, why: `"When the bell rang" is a dependent clause.` },
        { q: `Choose the correct relative pronoun: The student ___ essay won is from Seagrape Bay Secondary School.`, options: [`who`, `whom`, `whose`, `which`], answer: 2, why: `"Whose" shows possession: the student's essay.` },
        { q: `Which sentence uses a comma correctly with a coordinating conjunction?`, options: [`I wanted to go, but it was too late.`, `I wanted, to go but it was too late.`, `I wanted to go but, it was too late.`, `I, wanted to go but it was too late.`], answer: 0, why: `Place the comma before the coordinating conjunction joining two independent clauses.` }
      ]
    }
  ],
  mechanics: [
    {
      topic: `Commas`,
      explain: `<p>Commas separate items and mark natural pauses that make meaning clear.</p>
<ul><li><b>Lists:</b> <i>We packed water, batteries, a torch and tinned food.</i> (The Oxford comma before "and" is optional but must be used consistently.)</li><li><b>After introductory words or clauses:</b> <i>However, the results were unclear. When the storm passed, we went outside.</i></li><li><b>Before a coordinating conjunction</b> joining two independent clauses: <i>The ferry left, but we missed it.</i></li><li><b>Around non-essential information:</b> <i>My cousin, who lives in Curaçao, is visiting.</i> (Do not use commas around essential clauses: <i>Students who arrive late will lose marks.</i>)</li><li><b>In direct address and dates:</b> <i>Ms. Richardson, may I ask a question?</i></li></ul>
<p><b>Never</b> join two complete sentences with only a comma (a comma splice), and do not place a comma between a subject and its verb.</p>`,
      quiz: [
        { q: `Which sentence is correctly punctuated?`, options: [`After the match we went to Negril.`, `After the match, we went to Negril.`, `After, the match we went to Negril.`, `After the match we, went to Negril.`], answer: 1, why: `A comma follows an introductory phrase.` },
        { q: `Which sentence correctly uses commas around non-essential information?`, options: [`My mother, who is a nurse, works at the hospital.`, `My mother who is a nurse, works at the hospital.`, `My mother, who is a nurse works at the hospital.`, `My mother who, is a nurse works at the hospital.`], answer: 0, why: `Non-essential information needs a comma on both sides.` },
        { q: `Which sentence has an unnecessary comma?`, options: [`The students who failed, must resit.`, `Yes, I will attend.`, `It rained, so we stayed in.`, `First, read the passage.`], answer: 0, why: `"Who failed" is essential, and a comma should not separate the subject from its verb.` },
        { q: `Which is a comma splice?`, options: [`I was hungry, so I ate.`, `I was hungry, I ate.`, `Because I was hungry, I ate.`, `I was hungry; I ate.`], answer: 1, why: `Two independent clauses are joined only by a comma.` },
        { q: `Which uses a comma in direct address?`, options: [`Come here Daniel.`, `Come here, Daniel.`, `Come, here Daniel.`, `Come here Daniel,.`], answer: 1, why: `Separate the name of the person addressed with a comma.` }
      ]
    },
    {
      topic: `Apostrophes`,
      explain: `<p>Apostrophes have two jobs only: showing <b>possession</b> and showing <b>omission</b> (contraction).</p>
<ul><li><b>Singular possession:</b> add <b>'s</b>: <i>the student's book, James's pen</i> (James' is also accepted).</li><li><b>Plural possession ending in s:</b> add only <b>'</b>: <i>the students' books, the teachers' lounge</i>.</li><li><b>Irregular plurals:</b> add <b>'s</b>: <i>children's, women's, people's</i>.</li><li><b>Contractions:</b> <i>don't, it's (it is), they're, we've</i>. Avoid contractions in formal essays.</li><li><b>No apostrophe</b> in ordinary plurals (<i>mangoes, CDs, 1990s</i>) or possessive pronouns (<i>its, hers, ours, theirs, yours</i>).</li></ul>
<p><b>Creole and Standard English:</b> Creole often shows possession by position alone: <i>"Kevin car"</i>. Standard English needs the apostrophe: <i>"Kevin's car"</i>.</p>`,
      quiz: [
        { q: `Choose the correct form: The ___ uniforms were new.`, options: [`girl's (more than one girl)`, `girls'`, `girls`, `girl's'`], answer: 1, why: `Plural possessive of "girls" adds only an apostrophe.` },
        { q: `Which is correct?`, options: [`The dog wagged it's tail.`, `The dog wagged its tail.`, `The dog wagged its' tail.`, `The dog wagged it tail.`], answer: 1, why: `"Its" is the possessive pronoun and has no apostrophe.` },
        { q: `Standard English version of "My sister friend":`, options: [`My sisters friend`, `My sister's friend`, `My sisters' friend (one sister)`, `My sister friend's`], answer: 1, why: `Singular possession: sister + 's.` },
        { q: `Which is correct?`, options: [`Fresh mango's for sale`, `Fresh mangoes for sale`, `Fresh mangoe's for sale`, `Fresh mangoes' for sale`], answer: 1, why: `Plurals do not take apostrophes.` },
        { q: `Choose the correct form: the ___ toys`, options: [`childrens'`, `childrens`, `children's`, `childs'`], answer: 2, why: `"Children" is an irregular plural, so add 's.` }
      ]
    },
    {
      topic: `Semicolons and colons`,
      explain: `<p><b>Semicolon (;)</b></p><ul><li>Joins two closely related independent clauses: <i>The sea was rough; the ferry was cancelled.</i></li><li>Comes before conjunctive adverbs (however, therefore, moreover): <i>We waited; however, no bus came.</i></li><li>Separates list items that already contain commas: <i>St. John’s, Antigua; English Harbour, Antigua; and Codrington, Barbuda.</i></li></ul>
<p><b>Colon (:)</b></p><ul><li>Introduces a list, explanation or quotation after a <b>complete</b> sentence: <i>You will need three things: a pen, a ruler and your ID.</i></li><li>Do not use a colon directly after a verb or preposition: <i>You will need <s>:</s> a pen and a ruler.</i></li><li>Introduces an explanation or emphasis: <i>She had one goal: a scholarship.</i></li></ul>`,
      quiz: [
        { q: `Which uses a semicolon correctly?`, options: [`I studied; for the exam.`, `I studied hard; I passed.`, `I studied hard; and passed.`, `Because I studied; I passed.`], answer: 1, why: `The semicolon joins two independent clauses.` },
        { q: `Which uses a colon correctly?`, options: [`The kit includes: a torch and batteries.`, `The kit includes the following: a torch and batteries.`, `The kit: includes a torch and batteries.`, `The: kit includes a torch.`], answer: 1, why: `A colon must follow a complete independent clause.` },
        { q: `Choose the correct punctuation: The road was flooded ___ therefore, school was closed.`, options: [`,`, `;`, `:`, `no punctuation`], answer: 1, why: `A semicolon comes before the conjunctive adverb "therefore".` },
        { q: `When should semicolons separate list items?`, options: [`Always.`, `When the list has only two items.`, `When the items already contain commas.`, `Never.`], answer: 2, why: `Semicolons prevent confusion when list items contain internal commas.` },
        { q: `Which sentence uses a colon for emphasis?`, options: [`He wanted one thing: respect.`, `He wanted: respect.`, `He: wanted respect.`, `He wanted one: thing respect.`], answer: 0, why: `The colon follows a complete clause and introduces the emphasised idea.` }
      ]
    },
    {
      topic: `Capitalisation`,
      explain: `<p>Use capital letters for:</p>
<ul><li>The first word of a sentence and the pronoun <b>I</b>.</li><li><b>Proper nouns:</b> names of people, places, organisations and events: <i>Saint Lucia, CARICOM, Carnival, Coralstone College</i>.</li><li><b>Days, months and holidays</b> (but not seasons): <i>Monday, July, Emancipation Day; summer, hurricane season</i>.</li><li><b>Nationalities, languages and religions:</b> <i>Dutch, Papiamentu, English, Christian</i>.</li><li><b>Titles</b> before a name: <i>Principal</i> Hodge, but <i>the principal said</i>.</li><li><b>Main words in titles</b> of works: <i>Crick Crack, Monkey</i>.</li></ul>
<p>Do not capitalise ordinary nouns for emphasis (<i>the Government</i> is only capitalised when it is part of an official name or your style guide requires it), or subjects other than languages: <i>biology, English</i>.</p>`,
      quiz: [
        { q: `Which is correctly capitalised?`, options: [`we visited Saba in the Summer.`, `We visited saba in the summer.`, `We visited Saba in the summer.`, `We Visited Saba In The Summer.`], answer: 2, why: `Capitalise the first word and the proper noun; seasons are lower case.` },
        { q: `Which is correct?`, options: [`I study Biology and english.`, `I study biology and English.`, `I study Biology and English.`, `I study biology and english.`], answer: 1, why: `Languages are capitalised; other subjects are not.` },
        { q: `Which is correct?`, options: [`The minister of Education spoke.`, `The Minister of Education spoke.`, `the minister of education spoke.`, `The Minister Of Education spoke.`], answer: 1, why: `An official title is capitalised, but short words like "of" are not.` },
        { q: `Which is correct?`, options: [`Emancipation day is on july 1.`, `Emancipation Day is on July 1.`, `emancipation Day is on July 1.`, `Emancipation day is on July 1.`], answer: 1, why: `Holiday names and months are capitalised.` },
        { q: `Which is correct?`, options: [`She speaks spanish and dutch.`, `She speaks Spanish and Dutch.`, `She Speaks Spanish And Dutch.`, `she speaks Spanish and Dutch.`], answer: 1, why: `Languages are proper nouns.` }
      ]
    },
    {
      topic: `Quotation marks and titles`,
      explain: `<p><b>Quotation marks</b> enclose direct speech and words quoted from a text.</p>
<ul><li>British style uses single quotation marks ('...') with double ("...") for a quote inside a quote; American style is the reverse. Either is accepted if consistent.</li><li>Embed short quotations in your sentence: <i>The writer calls the landfill "a ticking time bomb", which creates urgency.</i></li><li>Use <b>reported speech</b> without quotation marks: <i>She said that she was tired.</i></li></ul>
<p><b>Titles:</b> Use <i>italics</i> (or underline when handwriting) for long works such as novels, newspapers, films and albums: <i>The Gleaner, Miguel Street</i>. Use quotation marks for short works such as poems, articles, songs and chapters: <i>"Colonisation in Reverse"</i>.</p>`,
      quiz: [
        { q: `How should you present the novel title Miguel Street in a typed essay?`, options: [`"Miguel Street"`, `Miguel Street in italics`, `MIGUEL STREET`, `'miguel street'`], answer: 1, why: `Titles of long works are italicised in typed work (underlined in handwriting).` },
        { q: `How should you present the poem title Colonisation in Reverse?`, options: [`In italics`, `In quotation marks`, `In capital letters`, `Underlined and in quotation marks`], answer: 1, why: `Short works such as poems take quotation marks.` },
        { q: `Which is reported speech?`, options: [`She said, "I am ready."`, `She said that she was ready.`, `"I am ready," she said.`, `She said "that she was ready."`], answer: 1, why: `Reported speech uses "that" and no quotation marks.` },
        { q: `Which embeds a quotation smoothly?`, options: [`The writer says. "The island is drowning."`, `The writer warns that the island is "drowning" in plastic.`, `"The island is drowning" The writer says.`, `The writer says "the island" "is drowning."`], answer: 1, why: `A short quotation is woven grammatically into the sentence.` },
        { q: `What matters most about quotation mark style in CAPE?`, options: [`Only double marks are allowed.`, `Only single marks are allowed.`, `Being consistent throughout.`, `Using them for emphasis.`], answer: 2, why: `Either British or American style is accepted if used consistently.` }
      ]
    },
    {
      topic: `Hyphens and dashes`,
      explain: `<p><b>Hyphens (-)</b> join words; <b>dashes (–)</b> separate ideas.</p>
<ul><li><b>Compound adjectives before a noun:</b> <i>a well-known artist, a two-year course, a 500-word essay</i>. No hyphen after the noun: <i>The artist is well known.</i></li><li>No hyphen after <b>-ly</b> adverbs: <i>a highly respected judge</i>.</li><li><b>Compound numbers</b> from twenty-one to ninety-nine and fractions: <i>forty-two, two-thirds</i>.</li><li><b>Some prefixes:</b> <i>ex-president, self-esteem, re-enter</i>.</li><li><b>Dashes</b> add emphasis or an interruption: <i>The result – a tie – surprised everyone.</i> Use them sparingly in formal writing; commas or brackets are often better.</li><li>An <b>en dash</b> shows ranges: <i>pages 10–15, 1958–1962</i>.</li></ul>`,
      quiz: [
        { q: `Which is correct?`, options: [`a well known singer`, `a well-known singer`, `a well-know singer`, `a well, known singer`], answer: 1, why: `A compound adjective before a noun is hyphenated.` },
        { q: `Which is correct?`, options: [`The singer is well-known.`, `The singer is well known.`, `The singer is well, known.`, `The singer is wellknown.`], answer: 1, why: `After the noun, the compound is usually not hyphenated.` },
        { q: `Which is correct?`, options: [`a highly-trained nurse`, `a highly trained nurse`, `a high-ly trained nurse`, `a highlytrained nurse`], answer: 1, why: `Do not hyphenate after an -ly adverb.` },
        { q: `Which number is correctly written?`, options: [`twenty five`, `twenty-five`, `twentyfive`, `twenty – five`], answer: 1, why: `Compound numbers from 21 to 99 are hyphenated.` },
        { q: `What does the dash do in "The prize – a scholarship – went to Ana"?`, options: [`Joins two words into one.`, `Shows a range.`, `Sets off added information for emphasis.`, `Shows possession.`], answer: 2, why: `Paired dashes set off an interrupting phrase for emphasis.` }
      ]
    },
    {
      topic: `Abbreviations and numbers`,
      explain: `<p><b>Abbreviations</b></p><ul><li>Write the full name the first time, with the abbreviation in brackets: <i>the Caribbean Examinations Council (CXC)</i>. Then use the abbreviation.</li><li>Avoid text-speak (<i>u, b4, tbh</i>) and informal shortenings (<i>govt, info</i>) in formal writing.</li><li>Avoid <i>etc.</i> and <i>e.g.</i> in essays where possible; write "for example" and give complete lists.</li></ul>
<p><b>Numbers</b></p><ul><li>Write numbers one to ten (some styles: one to ninety-nine) in words, and larger numbers in figures: <i>three students; 450 respondents</i>.</li><li>Never begin a sentence with a figure: <i>Twenty per cent...</i> not <i>20% ...</i></li><li>Use figures for dates, times, percentages, money and statistics: <i>1 July 2026, 8:30 a.m., 45 per cent, US$25</i>.</li><li>Be consistent within a sentence: <i>between 5 and 12 respondents</i>.</li></ul>`,
      quiz: [
        { q: `Which is correct for the first mention in an essay?`, options: [`CXC sets the exam.`, `The Caribbean Examinations Council (CXC) sets the exam.`, `C.X.C. sets the exam.`, `The council (cxc) sets the exam.`], answer: 1, why: `Write the full name first, with the abbreviation in brackets.` },
        { q: `Which sentence is correct?`, options: [`45 students took part.`, `Forty-five students took part.`, `forty five students took part.`, `Fourty-five students took part.`], answer: 1, why: `Do not begin a sentence with a figure; also note the spelling "forty".` },
        { q: `Which is most appropriate in a formal report?`, options: [`The govt said info will come b4 Friday.`, `The government said information would be released before Friday.`, `Govt. says info coming soon.`, `The gov said info will come.`], answer: 1, why: `Formal writing uses full words, not text-speak or shortenings.` },
        { q: `Which is correctly written?`, options: [`We surveyed 3 teachers and 250 students.`, `We surveyed three teachers and 250 students.`, `We surveyed three teachers and two hundred and fifty students.`, `We surveyed 3 teachers and two hundred fifty students.`], answer: 1, why: `Small numbers in words, large numbers in figures.` },
        { q: `How should you avoid "etc." in a formal essay?`, options: [`Replace it with "and so on".`, `Give a complete list or introduce examples with "such as".`, `Use "e.t.c."`, `Add more full stops.`], answer: 1, why: `Precise writing gives complete lists or clearly marked examples.` }
      ]
    },
    {
      topic: `Paragraphing`,
      explain: `<p>A paragraph develops <b>one main idea</b>. Begin a new paragraph when you change topic, time, place, speaker or point of argument.</p>
<ul><li>Open with a <b>topic sentence</b> that states the paragraph's point.</li><li>Develop it using <b>PEEL</b>: Point, Evidence, Explanation, Link.</li><li>Use <b>transitions</b> to connect paragraphs: <i>Furthermore, In contrast, As a result, Consequently</i>.</li><li>In dialogue, start a new paragraph for each new speaker.</li><li>Avoid one-sentence paragraphs in essays and very long paragraphs that combine several points.</li></ul>
<p>In CAPE essays, <b>Organization</b> marks reward a clear introduction, logically sequenced body paragraphs and a conclusion. Within the word limit, three or four well-developed body paragraphs are better than six thin ones.</p>`,
      quiz: [
        { q: `What should the first sentence of a body paragraph usually do?`, options: [`Give a quotation.`, `State the paragraph's main point.`, `Summarise the whole essay.`, `Ask a question.`], answer: 1, why: `The topic sentence tells the reader what the paragraph will argue.` },
        { q: `When should you begin a new paragraph?`, options: [`Every three sentences.`, `When you move to a new main point.`, `Only after a quotation.`, `Never in exams.`], answer: 1, why: `Each paragraph develops one main idea.` },
        { q: `What does the L in PEEL stand for?`, options: [`Language`, `List`, `Link`, `Logic`], answer: 2, why: `Link connects the point back to the question or forward to the next paragraph.` },
        { q: `Which is a transition that shows contrast?`, options: [`Furthermore`, `Similarly`, `In contrast`, `As a result`], answer: 2, why: `"In contrast" signals an opposing idea.` },
        { q: `In written dialogue, what signals a new speaker?`, options: [`A colon.`, `A new paragraph.`, `A dash.`, `Bold text.`], answer: 1, why: `Each new speaker begins a new paragraph.` }
      ]
    }
  ],
  verbs: {
    regular: [
      { base: `walk`, past: `walked`, pp: `walked`, sentence: `We walked along the Boardwalk after school.` },
      { base: `ask`, past: `asked`, pp: `asked`, sentence: `The interviewer asked ten open questions.` },
      { base: `use`, past: `used`, pp: `used`, sentence: `The writer has used statistics to support her claim.` },
      { base: `talk`, past: `talked`, pp: `talked`, sentence: `They talked about the election results all evening.` },
      { base: `stop`, past: `stopped`, pp: `stopped`, sentence: `The rain stopped just before the parade.` },
      { base: `plan`, past: `planned`, pp: `planned`, sentence: `The committee has planned a beach clean-up.` },
      { base: `prefer`, past: `preferred`, pp: `preferred`, sentence: `Most respondents preferred online news.` },
      { base: `occur`, past: `occurred`, pp: `occurred`, sentence: `The power cut occurred during the exam.` },
      { base: `travel`, past: `travelled`, pp: `travelled`, sentence: `She travelled to Curaçao for the debate.` },
      { base: `study`, past: `studied`, pp: `studied`, sentence: `I have studied every past paper since 2018.` },
      { base: `try`, past: `tried`, pp: `tried`, sentence: `He tried to explain the Creole proverb.` },
      { base: `carry`, past: `carried`, pp: `carried`, sentence: `The fishermen carried the catch to the market.` },
      { base: `play`, past: `played`, pp: `played`, sentence: `The steel band played at the opening ceremony.` },
      { base: `decide`, past: `decided`, pp: `decided`, sentence: `The school has decided to ban single-use plastic.` },
      { base: `arrive`, past: `arrived`, pp: `arrived`, sentence: `Three cruise ships arrived on Tuesday.` },
      { base: `explain`, past: `explained`, pp: `explained`, sentence: `The teacher explained the difference between ethos and pathos.` },
      { base: `describe`, past: `described`, pp: `described`, sentence: `The poet described the sea as restless.` },
      { base: `suggest`, past: `suggested`, pp: `suggested`, sentence: `The data suggested a clear trend.` },
      { base: `need`, past: `needed`, pp: `needed`, sentence: `The shelter needed more volunteers.` },
      { base: `want`, past: `wanted`, pp: `wanted`, sentence: `She wanted to study law at university.` },
      { base: `happen`, past: `happened`, pp: `happened`, sentence: `What happened at the meeting?` },
      { base: `admit`, past: `admitted`, pp: `admitted`, sentence: `The company admitted its mistake.` },
      { base: `refer`, past: `referred`, pp: `referred`, sentence: `The writer referred to a government report.` },
      { base: `cancel`, past: `cancelled`, pp: `cancelled`, sentence: `The airline cancelled all flights before the storm.` },
      { base: `persuade`, past: `persuaded`, pp: `persuaded`, sentence: `Her speech persuaded the board to act.` },
      { base: `support`, past: `supported`, pp: `supported`, sentence: `The evidence supported his argument.` },
      { base: `collect`, past: `collected`, pp: `collected`, sentence: `We collected data over two weeks.` },
      { base: `publish`, past: `published`, pp: `published`, sentence: `The newspaper published a correction.` },
      { base: `analyse`, past: `analysed`, pp: `analysed`, sentence: `We analysed the responses using a bar chart.` },
      { base: `cry`, past: `cried`, pp: `cried`, sentence: `The baby cried during the church service.` }
    ],
    irregular: [
      { base: `be`, past: `was / were`, pp: `been`, sentence: `She has been the class representative for two years.`, note: `"Was" with I/he/she/it; "were" with you/we/they. In Standard English, avoid "we was" and "they is".` },
      { base: `have`, past: `had`, pp: `had`, sentence: `We had a fire drill on Monday.` },
      { base: `do`, past: `did`, pp: `done`, sentence: `Have you done your reflective journal?`, note: `"Done" needs a helper: "I have done it", not "I done it".` },
      { base: `go`, past: `went`, pp: `gone`, sentence: `They have gone to Barbuda for the weekend.`, note: `"Gone" needs a helper: "She has gone", not "She gone".` },
      { base: `see`, past: `saw`, pp: `seen`, sentence: `I saw the eclipse yesterday; have you seen it before?`, note: `"I seen" is non-standard; use "I saw" or "I have seen".` },
      { base: `come`, past: `came`, pp: `come`, sentence: `He came late, but he has come prepared.` },
      { base: `get`, past: `got`, pp: `got`, sentence: `She has got a place at Sandbox Tree College.`, note: `British pp is "got"; American also uses "gotten".` },
      { base: `give`, past: `gave`, pp: `given`, sentence: `The judges have given their decision.` },
      { base: `take`, past: `took`, pp: `taken`, sentence: `The photos were taken at Shoal Bay.` },
      { base: `make`, past: `made`, pp: `made`, sentence: `The students made a documentary on salt ponds.` },
      { base: `know`, past: `knew`, pp: `known`, sentence: `I have known her since primary school.` },
      { base: `think`, past: `thought`, pp: `thought`, sentence: `I thought the speech was persuasive.` },
      { base: `bring`, past: `brought`, pp: `brought`, sentence: `Each student brought a dish to the cultural day.`, note: `Not "brang" or "brung".` },
      { base: `buy`, past: `bought`, pp: `bought`, sentence: `We bought supplies before the hurricane.` },
      { base: `teach`, past: `taught`, pp: `taught`, sentence: `Our teacher taught us how to use PEEL.` },
      { base: `catch`, past: `caught`, pp: `caught`, sentence: `The fishermen caught wahoo this morning.` },
      { base: `write`, past: `wrote`, pp: `written`, sentence: `She has written three articles for the school blog.` },
      { base: `speak`, past: `spoke`, pp: `spoken`, sentence: `English and Spanish are widely spoken in Belize.` },
      { base: `break`, past: `broke`, pp: `broken`, sentence: `The window was broken during the storm.` },
      { base: `choose`, past: `chose`, pp: `chosen`, sentence: `Which topic have you chosen?` },
      { base: `begin`, past: `began`, pp: `begun`, sentence: `The exam began at 9:00; it had begun before I arrived.`, note: `Not "I begun"; use "I began" or "I have begun".` },
      { base: `drink`, past: `drank`, pp: `drunk`, sentence: `Have you drunk enough water today?` },
      { base: `swim`, past: `swam`, pp: `swum`, sentence: `We swam across Frigate Bay.` },
      { base: `sing`, past: `sang`, pp: `sung`, sentence: `The choir sang the national anthem.` },
      { base: `ring`, past: `rang`, pp: `rung`, sentence: `The bell had rung before we reached the gate.` },
      { base: `run`, past: `ran`, pp: `run`, sentence: `She ran the 400 m in record time.` },
      { base: `eat`, past: `ate`, pp: `eaten`, sentence: `Have you eaten johnny cakes from that stall?` },
      { base: `fall`, past: `fell`, pp: `fallen`, sentence: `Several trees had fallen across the road.` },
      { base: `feel`, past: `felt`, pp: `felt`, sentence: `I felt nervous before my presentation.` },
      { base: `find`, past: `found`, pp: `found`, sentence: `The survey found that most teens use TikTok.` },
      { base: `fly`, past: `flew`, pp: `flown`, sentence: `She has flown to Miami many times.` },
      { base: `forget`, past: `forgot`, pp: `forgotten`, sentence: `I had forgotten my calculator.` },
      { base: `grow`, past: `grew`, pp: `grown`, sentence: `Tourism has grown since the 1960s.` },
      { base: `hear`, past: `heard`, pp: `heard`, sentence: `We heard the conch shell from the beach.` },
      { base: `hold`, past: `held`, pp: `held`, sentence: `The debate was held in the auditorium.` },
      { base: `keep`, past: `kept`, pp: `kept`, sentence: `She kept a reflective journal all term.` },
      { base: `leave`, past: `left`, pp: `left`, sentence: `The ferry left at 7:00.` },
      { base: `lead`, past: `led`, pp: `led`, sentence: `He led the group discussion.`, note: `The past is spelt "led". Do not write "lead", which is the present tense (or the metal).` },
      { base: `lose`, past: `lost`, pp: `lost`, sentence: `The team lost in the final.` },
      { base: `mean`, past: `meant`, pp: `meant`, sentence: `What the writer meant was unclear.` },
      { base: `pay`, past: `paid`, pp: `paid`, sentence: `We paid the registration fee.`, note: `Not "payed".` },
      { base: `read`, past: `read`, pp: `read`, sentence: `I read the extract twice.`, note: `Spelt the same, but the past is pronounced "red".` },
      { base: `say`, past: `said`, pp: `said`, sentence: `The forecaster said the storm would pass north.` },
      { base: `sell`, past: `sold`, pp: `sold`, sentence: `Vendors sold guavaberry liqueur at the fair.` },
      { base: `send`, past: `sent`, pp: `sent`, sentence: `I sent the email to the principal.` },
      { base: `shake`, past: `shook`, pp: `shaken`, sentence: `The community was shaken by the news.` },
      { base: `steal`, past: `stole`, pp: `stolen`, sentence: `His phone was stolen at the bus stop.` },
      { base: `tear`, past: `tore`, pp: `torn`, sentence: `The wind had torn the roof sheets loose.` },
      { base: `throw`, past: `threw`, pp: `thrown`, sentence: `Debris was thrown across the road.` },
      { base: `understand`, past: `understood`, pp: `understood`, sentence: `I understood the question only after rereading it.` },
      { base: `wake`, past: `woke`, pp: `woken`, sentence: `The thunder woke us at 3 a.m.` },
      { base: `wear`, past: `wore`, pp: `worn`, sentence: `They wore traditional costumes for the parade.` },
      { base: `win`, past: `won`, pp: `won`, sentence: `Our school won the debating competition.` },
      { base: `drive`, past: `drove`, pp: `driven`, sentence: `My uncle has driven a taxi for twenty years.` },
      { base: `lie (recline)`, past: `lay`, pp: `lain`, sentence: `Yesterday I lay on the beach at Mullins Bay.`, note: `Lie = rest or recline (no object). Do not confuse with lay (to put something down). Lie (tell untruths) is regular: lied, lied.` },
      { base: `lay (put down)`, past: `laid`, pp: `laid`, sentence: `She laid her books on the desk.`, note: `Lay always takes an object: you lay something. Hens lay eggs; workers laid the foundation.` },
      { base: `rise`, past: `rose`, pp: `risen`, sentence: `Sea levels have risen over the last century.`, note: `Rise has no object: the sun rises. Compare raise (regular), which needs an object: raise your hand.` },
      { base: `raise`, past: `raised`, pp: `raised`, sentence: `The students raised funds for the shelter.`, note: `Raise is regular but is listed here to contrast with rise. It always takes an object.` },
      { base: `sit`, past: `sat`, pp: `sat`, sentence: `We sat the exam in the main hall.`, note: `Sit has no object: you sit down. In British English you also "sit an exam".` },
      { base: `set`, past: `set`, pp: `set`, sentence: `The teacher set the homework yesterday.`, note: `Set takes an object: set the table, set a deadline. Its past and past participle are the same as the base.` }
    ]
  },
  commonErrors: [
    { wrong: `She go to school every day.`, right: `She goes to school every day.`, why: `Caribbean Creoles do not add -s to the verb for he, she or it; the subject already shows who acts. Standard English requires the -s in the simple present with a third-person singular subject.` },
    { wrong: `Yesterday we walk to Roseau.`, right: `Yesterday we walked to Roseau.`, why: `Creole often shows past time with a time word or a marker such as "did" rather than changing the verb. Standard English marks the past on the verb itself, usually with -ed.` },
    { wrong: `The teacher vex with us.`, right: `The teacher is angry with us.`, why: `Creole does not need a form of "be" before an adjective. Standard English does, and "vex" is a dialect word; use "angry" or "annoyed" in formal writing.` },
    { wrong: `They going to the meeting.`, right: `They are going to the meeting.`, why: `The -ing form needs a helping verb (am, is, are, was, were) in Standard English. In Creole the helper is not required.` },
    { wrong: `Me and him went to the fair.`, right: `He and I went to the fair.`, why: `Creole often uses one pronoun form for subject and object. Standard English uses subject forms (I, he, she, we, they) for the subject. Remove the other person to test: "Me went" sounds wrong, so use "I".` },
    { wrong: `That is Keisha book.`, right: `That is Keisha's book.`, why: `Creole shows possession by placing the owner before the item. Standard English adds an apostrophe and s to the owner.` },
    { wrong: `I have three sister.`, right: `I have three sisters.`, why: `Creole often relies on the number word to show plurality, or uses "dem" after the noun ("di sister dem"). Standard English adds -s to the noun as well.` },
    { wrong: `The house build in 1995.`, right: `The house was built in 1995.`, why: `Creole can express passive meaning without "be" or a past participle. Standard English requires the passive form: was + built.` },
    { wrong: `He don't like fish.`, right: `He doesn't like fish.`, why: `In Standard English, he, she and it take "does" or "doesn't". "Don't" is used only with I, you, we and they.` },
    { wrong: `I seen the report last week.`, right: `I saw the report last week.`, why: `"Seen" is a past participle and needs a helper ("I have seen"). For a simple past action, use "saw".` },
    { wrong: `It have plenty people on the beach.`, right: `There are many people on the beach.`, why: `Many Creoles use "it have" or "it had" to show existence. Standard English uses "there is" or "there are", and "plenty" is informal before a noun without "of".` },
    { wrong: `She didn't say nothing.`, right: `She didn't say anything.`, why: `Creole uses multiple negatives for emphasis, and the meaning is clear. Standard English uses only one negative per clause; a double negative is marked as an error.` },
    { wrong: `The amount of students was high.`, right: `The number of students was high.`, why: `Use "number" (and "fewer") for things you can count, and "amount" (and "less") for things you cannot. This is a common error in all varieties of English.` },
    { wrong: `Me and my friends was liming by the bay.`, right: `My friends and I were relaxing by the bay.`, why: `"We was" is non-standard; plural subjects take "were". "Liming" is an excellent Caribbean word, but it is colloquial, so choose a neutral word in formal writing unless you are quoting or explaining it.` },
    { wrong: `Due to the fact that the road was flooded, so school closed.`, right: `Because the road was flooded, school closed.`, why: `Using two linking words for one relationship (because... so, although... but) is common in speech but redundant in writing. Choose one, and prefer a concise "because" to "due to the fact that".` }
  ]
};
