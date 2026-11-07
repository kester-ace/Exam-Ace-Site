// Paper 032 practice papers, modelled on the 2024 CAPE Communication Studies specimen Paper 032.
// All stimuli, scenarios and data are original.
(function () {
  var push = function (p) { (window.COURSE_PAPERS = window.COURSE_PAPERS || []).push(p); };

  function intro(year, topic, audience) {
    return `<p><b>CAPE Communication Studies · Paper 032</b><br>2 hours 15 minutes · 60 marks</p>
<p><b>Topic (` + year + `):</b> ` + topic + ` &nbsp;·&nbsp; <b>Intended audience:</b> ` + audience + `</p>` + `
<p><b>READ THE FOLLOWING INSTRUCTIONS CAREFULLY.</b></p>
<ol>
<li>This paper consists of TWO sections.</li>
<li>Answer ALL questions in each section.</li>
<li>Section A (20 marks) is based on the central stimulus. Read it carefully before you answer Questions 1 and 2.</li>
<li>Section B (40 marks) requires an original reflective OR expository piece and a justification paragraph.</li>
<li>You are advised to take some time to read through the paper and plan your answers.</li>
<li>You may bring a single single sheet of double-sided A4 paper with no more than 10 points related to the topic of your response.</li>
</ol>`;
  }

  function sa(o) {
    return { type: 'write', section: 'A', module: o.module, title: o.title, marks: o.marks, genre: 'Short answer',
      prompt: o.prompt, min: o.min, max: o.max, checklist: o.checklist, rubric: o.rubric, key: o.key, model: o.model };
  }

  function q3a(o) {
    return { type: 'write', section: 'B', title: 'Question 3(a)', marks: 25, genre: 'Reflective or expository piece',
      prompt: `<p><b>SECTION B</b></p><p>3. (a) Write a reflective OR expository piece of between 200 and 250 words based on the topic <b>` + o.topicCaps + `</b>. Your piece should be suitable for an audience of <b>` + o.audience + `</b>.</p><p style="text-align:right">[25 marks]</p>`,
      min: 200, max: 250,
      checklist: [
        `I chose ONE genre (reflective OR expository) and stayed with it from start to finish.`,
        `My piece is between 200 and 250 words and has a clear title.`,
        `My introduction hooks the reader and my conclusion leaves a clear final idea or call to action.`,
        `My ideas are original and relevant to ` + o.audience.toLowerCase() + `, not a copy of the stimulus.`,
        `My register suits the genre, and I proofread for grammar, spelling and punctuation.`
      ],
      rubric: [
        { criterion: 'Creativity', marks: 10,
          look: [`\\b(I|my|me|we|our|us)\\b`, `\\b(remember|imagine|picture|felt|realised|realized|learned|wondered)\\b`, `\\b(like a|as if|as though)\\b`, `\\?`].concat(o.creativeLook || []),
          min: 3,
          strong: `An original angle on the topic, with vivid, specific detail and a voice that keeps the intended audience engaged throughout.`,
          weak: `Generic or predictable ideas, little sense of audience, or a piece that simply restates the stimulus as a list of facts.` },
        { criterion: 'Organisation', marks: 7,
          look: [`\\b(first|firstly|then|next|later|finally|in conclusion|however|therefore|as a result|moreover|still|now|instead)\\b`, `\\n\\s*\\n`],
          min: 2,
          strong: `A clear introduction, logically developed body and purposeful conclusion; paragraphs are coherent and linked by effective transitions.`,
          weak: `No clear beginning or ending; ideas jump without links, or the piece is a single undivided block.` },
        { criterion: 'Expression', marks: 8,
          look: [`[.!?]\\s+[A-Z]`, `[,;:]`, `\\b(although|whereas|because|which|while|since|unless)\\b`],
          min: 2,
          strong: `Register is consistently appropriate to the genre; sentences are varied, grammatical and carefully punctuated, with evidence of proofreading.`,
          weak: `Frequent errors in grammar, spelling or punctuation; register shifts inappropriately or is unsuited to the genre.` }
      ],
      key: `<p><b>Question 3(a)</b> &nbsp;[25 marks]</p>
<p>The candidate writes EITHER a reflective piece (for example, a personal essay, memoir extract or journal entry) OR an expository piece (for example, a journalistic article, feature or explanatory essay) of between 200 and 250 words on the topic <b>` + o.topicCaps + `</b>, suitable for an audience of ` + o.audience.toLowerCase() + `.</p>
<p><b>Possible content (not exhaustive):</b></p><ul>` + o.ideas + `</ul>
<p><b>Rubric for Creative Piece</b></p>
<table><tr><th>Criteria</th><th>Marks to be awarded</th></tr>
<tr><td>Candidate produces an excellent sample in terms of creativity, organisation and expression.</td><td>24–25 marks</td></tr>
<tr><td>Candidate produces a very good sample in terms of creativity, organisation and expression.</td><td>20–23 marks</td></tr>
<tr><td>Candidate produces a good sample in terms of creativity, organisation and expression.</td><td>15–19 marks</td></tr>
<tr><td>Candidate produces an adequate sample in terms of creativity, organisation and expression.</td><td>11–14 marks</td></tr>
<tr><td>Candidate produces an unsatisfactory sample in terms of creativity, organisation and expression.</td><td>6–10 marks</td></tr>
<tr><td>Candidate produces a weak sample in terms of creativity, organisation and expression.</td><td>0–5 marks</td></tr></table>
<p><b>Creativity factors (10):</b> unique/idiosyncratic use of genre; audience engagement; originality of ideas and events.</p>
<p><b>Organisation factors (7):</b> introduction, development and conclusion; thematic/episodic coherence; labelled sections and subsections where appropriate.</p>
<p><b>Expression factors (8):</b> appropriateness of register to genre; grammatical language; facilitative punctuation; careful proofreading.</p>
<p><i>Teacher note:</i> place the script in a band first, then confirm the mark using the Creativity / Organisation / Expression split. A response that mixes genres without control, or that ignores the stated audience, should not normally be placed above the "good" band.</p>`,
      model: o.model };
  }

  function q3b(o) {
    return { type: 'write', section: 'B', title: 'Question 3(b)', marks: 15, genre: 'Justification',
      prompt: `<p>3. (b) Based on your response in 3(a), write a paragraph of no more than 50–100 words justifying the following:</p><ul><li>The purpose</li><li>The intended audience</li><li>The context of communication</li></ul><p style="text-align:right">[15 marks]</p>`,
      min: 50, max: 100,
      checklist: [
        `I stated a specific purpose (e.g. to reflect, to inform, to persuade) and linked it to my piece.`,
        `I described my intended audience precisely (` + o.audience.toLowerCase() + `) and explained why my piece suits them.`,
        `I explained the context: where, when and through what channel the piece would be shared.`,
        `My paragraph is between 50 and 100 words and refers directly to features of my 3(a) piece.`
      ],
      rubric: [
        { criterion: 'Purpose', marks: 5,
          look: [`\\bpurpose\\b`, `\\b(to inform|to persuade|to educate|to reflect|to encourage|to raise awareness|to explain|to reassure)\\b`, `\\b(aim|intend|goal)`],
          min: 1,
          strong: `States a precise purpose and shows how specific features of the piece (tone, detail, structure) achieve it.`,
          weak: `Purpose is missing, vague ("to talk about the topic") or not linked to the piece.` },
        { criterion: 'Intended audience', marks: 5,
          look: [`\\baudience\\b`, o.audienceLook, `\\b(readers?|listeners?|viewers?)\\b`],
          min: 1,
          strong: `Identifies the audience precisely and explains why the genre, register and content suit their needs and attitudes.`,
          weak: `Audience is not named, is too general ("everyone"), or no reason is given for the choices made.` },
        { criterion: 'Context of communication', marks: 5,
          look: [`\\bcontext\\b`, `\\b(published|broadcast|posted|shared|read aloud|newsletter|newspaper|radio|website|social media|facebook|instagram|blog|session|meeting)\\b`, `\\b(season|when|before|during|start of|beginning of)\\b`],
          min: 1,
          strong: `Explains where, when and through which channel the piece would reach the audience, and why that setting is effective.`,
          weak: `Context is omitted or confused with purpose; no channel, setting or timing is given.` }
      ],
      key: `<p><b>Question 3(b)</b> &nbsp;[15 marks]</p>
<p>The justification must relate directly to the candidate's own response in 3(a) and address all three elements.</p>
<ul>
<li><b>Purpose:</b> ` + o.purposeNotes + `</li>
<li><b>Intended audience:</b> ` + o.audienceNotes + `</li>
<li><b>Context of communication:</b> ` + o.contextNotes + `</li>
</ul>
<p><b>Rubric for Justification of Reflective/Expository Piece</b></p>
<table><tr><th>Criteria</th><th>Marks to be awarded</th></tr>
<tr><td>Candidate offers an excellent explanation of how the piece is related to the candidate's stated purpose, the intended audience and the context in which it is intended to be disseminated to the audience.</td><td>13–15 marks</td></tr>
<tr><td>Candidate offers a good explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>10–12 marks</td></tr>
<tr><td>Candidate offers a satisfactory explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>8–9 marks</td></tr>
<tr><td>Candidate offers a fair explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>5–7 marks</td></tr>
<tr><td>Candidate offers a weak explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>3–4 marks</td></tr>
<tr><td>Candidate offers an unacceptable explanation of how the piece is related to the stated purpose, the intended audience and the context in which it is intended to be disseminated.</td><td>0–2 marks</td></tr></table>
<p><i>Teacher note:</i> a paragraph that addresses only two of the three elements cannot normally score above the "fair" band.</p>`,
      model: o.model };
  }

  /* =====================================================================
     PAPER A · 2026 · Natural disasters · Homeowners
     ===================================================================== */
  push({
    kind: 'p032', id: `P032A`, title: `Paper 032 · Practice Paper A · 2026: Natural disasters (Homeowners)`, time: 135,
    intro: intro(`2026`, `Natural disasters`, `Homeowners`),
    stimulus: `<p><b>SECTION A</b></p>
<p><i>Instructions: Read the extract below carefully and then answer the questions that follow.</i></p>
<p><i>The following public notice was published in a Grenadian daily newspaper and on the Ministry's website at the start of the 2026 Atlantic hurricane season to inform homeowners of a new home-strengthening programme.</i></p>
<blockquote>
<p><b>PUBLIC NOTICE: THE SAFE ROOF INITIATIVE</b></p>
<p>From Monday 1 June 2026, the Ministry responsible for housing, in collaboration with the national disaster management agency, will launch the Safe Roof Initiative for owner-occupied homes in Grenada. Homeowners are invited to apply for a free structural inspection, during which a certified inspector will assess roof fastenings, window openings and drainage around the property. Eligible households will receive a voucher covering up to 75 per cent of the cost of hurricane straps and storm shutters, redeemable at approved hardware suppliers.</p>
<p>Applications must be submitted through the Ministry's online portal, accompanied by photographs of the roof and a scanned copy of the property title or land-lease document. The deadline for applications is Friday 31 July 2026. Homeowners who are unable to apply online may obtain a paper application form at the Ministry's front office in St. George's or at designated community centres between 9:00 a.m. and 3:00 p.m. on weekdays.</p>
<p>Homeowners are further reminded to register for the free emergency text-alert service by sending the word READY to 7233.</p>
</blockquote>`,
    questions: [
      sa({ module: '1', title: `Question 1(a)`, marks: 4, min: 40, max: 150,
        prompt: `<p>1. (a) Explain TWO challenges an elderly homeowner who lives alone in a hillside neighbourhood is likely to face in receiving the information in this public notice.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I identified TWO different challenges, not the same one twice.`, `I explained WHY each challenge would stop this homeowner from receiving the information.`, `I linked each challenge to details of the notice or of the homeowner's situation.`],
        rubric: [
          { criterion: 'Challenge 1 identified and explained', marks: 2,
            look: [`\\b(internet|online|portal|website|smartphone|computer|data|scan|upload|digital)\\b`, `\\b(newspaper|cost|afford|buy)\\b`],
            strong: `Names a challenge (e.g. limited access to the internet or newspaper) and explains how it prevents the homeowner from receiving the message.`,
            weak: `Names a challenge but does not explain its effect, or the challenge is unrelated to receiving information.` },
          { criterion: 'Challenge 2 identified and explained', marks: 2,
            look: [`\\b(eyesight|vision|read|literacy|illiterate)\\b`, `\\b(formal|register|jargon|technical|vocabulary|words)\\b`, `\\b(transport|travel|mobility|distance|St\\.? George|walk)\\b`, `\\b(orature|oral|word of mouth|language|Spanish|Creole)\\b`],
            strong: `A second, distinct challenge (e.g. poor eyesight, formal register, distance to St. George's) clearly explained.`,
            weak: `Repeats the first challenge in different words or offers only a label.` }
        ],
        key: `<p><b>Question 1(a)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>The homeowner may not buy a daily newspaper (cost, habit or no delivery to hillside areas) and therefore would not see the notice in print.</li>
<li>The homeowner may have no internet access, smartphone or computer, or limited digital literacy, and so cannot view the Ministry's website or use the online portal.</li>
<li>Poor eyesight may make small newspaper print or on-screen text difficult to read.</li>
<li>The formal, technical register ("owner-occupied", "structural inspection", "redeemable", "land-lease document") may pose comprehension challenges even for those who can read.</li>
<li>Many Caribbean people prefer orature and are more receptive to information delivered orally; a written notice may be overlooked.</li>
<li>Living alone, the homeowner has no family member to pass on or explain the information.</li>
<li>The homeowner's first language may not be English (e.g. Spanish- or Haitian Creole-speaking residents).</li>
</ul>
<p>Award 2 marks each for TWO complete and clearly explained challenges which the homeowner may face in receiving the information.</p>
<p>Award 1 mark for a clear identification of a challenge which is not explained.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>One challenge is that the homeowner may not have internet access or the skills to use a computer. The notice is published on the Ministry's website and the application is done through an online portal, so an elderly person without a smartphone or data would simply never see it there.</p><p>A second challenge is the formal, technical language. Words such as "structural inspection", "owner-occupied" and "redeemable" may confuse an elderly reader who did not complete much formal schooling, so even if the homeowner sees the notice in the newspaper, he or she may not understand what is being offered.</p>` }),

      sa({ module: '1', title: `Question 1(b)`, marks: 4, min: 40, max: 150,
        prompt: `<p>1. (b) Justify TWO appropriate traditional media, other than the printed medium, that may be used for communicating information about the Safe Roof Initiative to homeowners in hillside and outlying neighbourhoods.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I chose TWO traditional media and did NOT choose newspapers, flyers or other print.`, `I gave a reason why each medium suits homeowners in outlying neighbourhoods.`, `I did not choose digital media (websites, apps, social media).`],
        rubric: [
          { criterion: 'Medium 1 named and justified', marks: 2,
            look: [`\\bradio\\b`, `\\b(cheap|battery|wide|reach|background|repeated|call-in|talk show)\\b`],
            strong: `Names an appropriate traditional medium (e.g. radio) and justifies it with a clear advantage for this audience.`,
            weak: `Names a medium only, or chooses a printed or digital medium.` },
          { criterion: 'Medium 2 named and justified', marks: 2,
            look: [`\\b(television|tv|loudspeaker|public address|word of mouth|telephone|town hall|community meeting|film)\\b`, `\\b(visual|demonstrat|oral|door|neighbour|community)\\b`],
            strong: `A second, distinct traditional medium with a convincing justification linked to homeowners.`,
            weak: `Second medium missing, repeated, or justified only in general terms.` }
        ],
        key: `<p><b>Question 1(b)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li><b>Radio</b> – cheap to own and maintain; battery-operated sets work during power outages in hurricane season; reaches wide areas, including hillside communities; can be heard while the listener is busy with other tasks; the message can be repeated several times per day; call-in programmes allow homeowners to ask questions about the voucher.</li>
<li><b>Television</b> – reaches most households; combines visual and aural stimuli so that an inspector can demonstrate what hurricane straps and shutters look like; message can be repeated during the news.</li>
<li><b>Mobile loudspeaker / public address vehicle</b> – reaches homeowners where they live; suits those who prefer orature; effective in small, close-knit neighbourhoods; however, the message is brief and may be distorted.</li>
<li><b>Word of mouth</b> (e.g. through community councils, churches, neighbours) – trusted and effective for those who prefer orature; quick among small groups; best corroborated by another medium because details such as deadlines may be distorted.</li>
<li><b>Community or town-hall meetings</b> – face-to-face explanation; homeowners can ask questions and collect paper forms on the spot.</li>
<li><b>Telephone</b> – short, personal calls to registered elderly homeowners; costly for large audiences.</li>
</ul>
<p>Award 2 marks each for a complete and clear justification of TWO appropriate traditional media, other than the printed medium.</p>
<p>Award 1 mark for only naming TWO appropriate traditional media other than the printed medium but without adequate justification.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>Radio is an appropriate medium because almost every household, even in the hills, owns a radio, and battery radios still work when the electricity fails during hurricane season. The Ministry could repeat the announcement several times a day and invite homeowners to call in with questions about the voucher.</p><p>A mobile loudspeaker van is also appropriate. It can drive through neighbourhoods such as hillside communities and deliver the message directly to people at home, which suits elderly residents who prefer to receive information orally rather than by reading.</p>` }),

      sa({ module: '1', title: `Question 1(c)`, marks: 2, min: 20, max: 80,
        prompt: `<p>1. (c) Comment on ONE local source of information which a homeowner could consult if he or she has questions about whether the roof of the house is strong enough to withstand a hurricane.</p><p style="text-align:right">[2 marks]</p>`,
        checklist: [`I named ONE specific local source.`, `I commented on why this source is reliable or accessible for a homeowner.`],
        rubric: [
          { criterion: 'Local source identified', marks: 1,
            look: [`\\b(inspector|contractor|engineer|builder|carpenter|hardware|ministry|front office|community council|red cross|neighbour)\\b`],
            strong: `Identifies a relevant local source of information.`,
            weak: `Source is vague ("the internet", "someone") or not local.` },
          { criterion: 'Comment on suitability', marks: 1,
            look: [`\\b(qualified|certified|expert|trained|experience|reliable|trust|official|accurate)\\b`],
            strong: `Explains why the source is credible or accessible for this question.`,
            weak: `No comment on why the source would help.` }
        ],
        key: `<p><b>Question 1(c)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>A certified building inspector or licensed contractor/engineer – trained to assess roof fastenings and familiar with local building codes.</li>
<li>Staff at the Ministry's building permits/front office in St. George's – an official source that can explain the inspection criteria.</li>
<li>Experienced staff at approved hardware suppliers – can advise on the correct type of strap or shutter for the roof.</li>
<li>Community council members or Red Cross volunteers trained in disaster preparedness – accessible within the neighbourhood and socially aware.</li>
<li>Testimonials from neighbours whose homes have already been inspected under the initiative.</li>
</ul>
<p>Award 2 marks for a satisfactory explanation of ONE local source of information which a homeowner could consult.</p>
<p>Award 1 mark for an acceptable identification of a relevant local source of information but without adequate explanation.</p>`,
        model: `<p>The homeowner could consult a licensed local contractor. Contractors are trained in building codes and have repaired many roofs after past hurricanes, so they can inspect the fastenings and give reliable, practical advice.</p>` }),

      sa({ module: '2', title: `Question 2(a)`, marks: 4, min: 40, max: 150,
        prompt: `<p>2. (a) Explain TWO reasons why the public notice by the Ministry uses the dialectal variety and the language register which it does.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I identified the dialectal variety (Standard English / acrolect).`, `I identified the register (formal).`, `I explained a reason for EACH choice, linked to the Ministry and the notice.`],
        rubric: [
          { criterion: 'Dialectal variety identified and explained', marks: 2,
            look: [`\\b(standard english|acrolect|standard)\\b`, `\\b(official|government|serious|understood|written)\\b`],
            strong: `Identifies Standard English/acrolect and explains why the Ministry uses it.`,
            weak: `Variety misidentified (e.g. Creole) or identified without explanation.` },
          { criterion: 'Register identified and explained', marks: 2,
            look: [`\\bformal\\b`, `\\b(authority|official|precise|legal|technical|serious|credib)\\b`],
            strong: `Identifies formal register and explains why it suits an official notice.`,
            weak: `Register misidentified or no reason given.` }
        ],
        key: `<p><b>Question 2(a)</b> &nbsp;[4 marks]</p>
<p><b>DIALECTAL VARIETY</b></p><p>Standard English/acrolect is used in the notice because</p><ul>
<li>it is the official language variety used by the government for official communication</li>
<li>there is an association of seriousness and authority with Standard English in messages to the public</li>
<li>there is the assumption that most people understand written Standard English even if they do not speak it</li>
<li>the notice involves legal documents (property title, land lease) where precision is needed.</li></ul>
<p><b>LANGUAGE REGISTER</b></p><p>A formal register is used in the notice because</p><ul>
<li>this register conveys the seriousness of hurricane preparedness</li>
<li>the communication is official, from a Ministry and a national emergency unit, as opposed to casual</li>
<li>precise technical terms (e.g. "structural inspection", "certified inspector") avoid ambiguity about eligibility and procedures.</li></ul>
<p>Award 1 mark for correct identification of the use of Standard English dialectal variety and 1 mark for an acceptable explanation of the choice. [2 marks]</p>
<p>Award 1 mark for correct identification of the use of a formal language register and 1 mark for an acceptable explanation. [2 marks]</p>
<p>Award 1 mark for correct identification of dialectal variety and language register without explanation. [1 mark]</p>`,
        model: `<p>The notice uses Standard English because it is the official variety used by the government for public communication, and it gives the notice authority so that homeowners take the programme seriously.</p><p>It uses a formal register because it is an official message from a Ministry and involves legal and technical matters such as property titles and structural inspections. Formal, precise wording reduces confusion about who is eligible and what documents are required.</p>` }),

      sa({ module: '2', title: `Question 2(b)`, marks: 2, min: 15, max: 80,
        prompt: `<p>2. (b) Based on the public notice, list the TWO MOST important message points which an audience of homeowners would need to know.</p><p style="text-align:right">[2 marks]</p>`,
        checklist: [`I listed exactly TWO message points.`, `Each point comes from the notice and includes key details (what, when, how).`],
        rubric: [
          { criterion: 'Message point 1', marks: 1,
            look: [`\\b(free|inspection|voucher|75)\\b`],
            strong: `States an accurate, important message point from the notice.`,
            weak: `Point is inaccurate, trivial or not from the notice.` },
          { criterion: 'Message point 2', marks: 1,
            look: [`\\b(31 july|deadline|apply|portal|paper form|community cent|READY|7233|text)\\b`],
            strong: `States a second, distinct and accurate message point.`,
            weak: `Repeats point 1 or omits essential details such as the deadline.` }
        ],
        key: `<p><b>Question 2(b)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>From Monday 1 June 2026, homeowners can apply for a free structural inspection of their homes.</li>
<li>Eligible households receive a voucher covering up to 75 per cent of the cost of hurricane straps and storm shutters.</li>
<li>Apply through the Ministry's online portal with photographs of the roof and a copy of the property title or land lease by Friday 31 July 2026.</li>
<li>Paper application forms are available at the Ministry's front office in St. George's or at community centres, 9:00 a.m. to 3:00 p.m. on weekdays.</li>
<li>Register for free emergency text alerts by sending READY to 7233.</li>
</ul>
<p>Award 1 mark each for TWO clearly stated message points which the audience would need to know.</p>`,
        model: `<ul><li>Homeowners can get a free roof inspection and a voucher covering up to 75 per cent of the cost of hurricane straps and shutters.</li><li>Applications, with roof photos and the property title, must be submitted online or on a paper form by Friday 31 July 2026.</li></ul>` }),

      sa({ module: '2', title: `Question 2(c)`, marks: 4, min: 25, max: 120,
        prompt: `<p>2. (c) Create a slogan which you could use to encourage homeowners to strengthen their homes before the hurricane season, using ONE literary technique.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I wrote a short, memorable slogan on preparing homes for hurricanes.`, `I named ONE literary technique used in the slogan.`, `I explained how the technique helps persuade homeowners.`],
        rubric: [
          { criterion: 'Relevant slogan', marks: 1,
            look: [`\\b(roof|home|house|strap|shutter|storm|hurricane|wind)\\b`],
            strong: `A concise, original slogan clearly encouraging homeowners to strengthen their homes.`,
            weak: `Slogan missing, too long, or unrelated to home preparation.` },
          { criterion: 'Literary technique identified', marks: 1,
            look: [`\\b(rhyme|alliteration|personification|metaphor|simile|pun|rhetorical question|allusion|repetition|antithesis|parallelism|hyperbole|assonance)\\b`],
            strong: `Correctly names a literary technique actually present in the slogan.`,
            weak: `Technique misnamed or not present in the slogan.` },
          { criterion: 'Explanation of technique linked to issue', marks: 2,
            look: [`\\b(memorable|remember|urgent|urgency|vivid|image|emphasi|persuade|appeal|attention)\\b`, `\\b(because|so that|which|suggests|makes)\\b`],
            strong: `Explains clearly how the technique conveys the message and appeals to homeowners.`,
            weak: `Explanation unclear, incomplete or not linked to hurricane preparation.` }
        ],
        key: `<p><b>Question 2(c)</b> &nbsp;[4 marks]</p>
<p><b>POSSIBLE SLOGANS</b></p><ul>
<li>"Don't let your roof take flight – strap it tight tonight!" – Use of <b>rhyme</b> (flight/tight/tonight) makes the message memorable and creates urgency to act now.</li>
<li>"Before the wind comes knocking, lock your home down." – Use of <b>personification</b> presents the hurricane as an unwelcome visitor, encouraging homeowners to prepare before it "arrives".</li>
<li>"Secure it, Shutter it, Sleep Safe." – Use of <b>alliteration</b> creates a catchy rhythm and links preparation with peace of mind.</li>
<li>"Is your roof ready to ride out the storm?" – Use of <b>rhetorical question</b> prompts homeowners to reflect honestly on their home's condition.</li>
</ul>
<p>Any other relevant slogan accompanied by an explanation of the related use of a literary technique.</p>
<p>Award 1 mark for a relevant slogan which could be used to encourage homeowners to strengthen their homes, 1 mark for inclusion of a literary technique used to appeal to the audience and 2 marks for the explanation of the technique which is linked to the issue of hurricane preparedness.</p>
<p>Award 1 mark for an explanation which is unclear or incomplete.</p>
<p style="text-align:right">[4 marks]</p>`,
        model: `<p><b>Slogan:</b> "Don't let your roof take flight – strap it tight tonight!"</p><p><b>Technique:</b> rhyme ("flight", "tight", "tonight").</p><p><b>Explanation:</b> The rhyme makes the slogan catchy and easy for homeowners to remember when they are in the hardware store. "Tonight" adds urgency, suggesting that preparation should not be delayed until a storm is already forecast, and "take flight" creates a vivid image of what can happen to an unsecured roof.</p>` }),

      q3a({ topicCaps: `NATURAL DISASTERS`, audience: `Homeowners`,
        creativeLook: [`\\b(hurricane|storm|earthquake|flood|wind|roof|shutter|strap)\\b`],
        ideas: `<li>Reflective: a personal memory of a hurricane, flood or earthquake and its effect on a family home; lessons learned about preparation; the emotional cost of losing possessions; rebuilding and community spirit.</li>
<li>Expository: how to prepare a home for hurricane season (straps, shutters, drainage, insurance, documents); why Caribbean homes are vulnerable; the role of building codes; how homeowners can protect important papers and plan evacuation.</li>`,
        model: `<p><b>What the Wind Taught Me</b></p>
<p>For years, my grandmother's house was the strongest thing I knew. Its concrete walls had survived more storms than I had birthdays, so I assumed it would survive anything. I learned otherwise one September night, when the wind found the one weakness we had ignored: a corner of the roof that was nailed, not strapped.</p>
<p>I remember the sound first. It was not a howl but a slow, grinding complaint, like a door being forced open by someone patient. Then the galvanise lifted, and rain poured into the room where my grandmother kept her photographs and her Bible. We spent the rest of the night in the bathroom, listening to the house argue with the sky.</p>
<p>In the morning, the walls were still standing, but the inside of the house was ruined. A neighbour who had installed hurricane straps the year before had lost only a few shingles. The difference between our homes was not luck; it was a few hundred dollars and one Saturday afternoon of work.</p>
<p>Now, every June, I think about that night. Preparing a home is not a sign of fear; it is an act of love for the people and the memories inside it. Shutters, straps and cleared drains cost far less than rebuilding a life. The wind does not negotiate, so every homeowner must decide, before the season begins, whether the roof will hold.</p>` }),

      q3b({ audience: `Homeowners`, audienceLook: `\\bhome ?owners?\\b`,
        purposeNotes: `e.g. to reflect on a personal experience of a natural disaster and, through it, persuade homeowners to prepare; OR to inform/explain how homeowners can protect property before a disaster. The candidate should link purpose to features such as vivid narration or step-by-step explanation.`,
        audienceNotes: `homeowners (possibly a sub-group such as first-time homeowners, elderly homeowners or owners of older wooden houses), with reasons why the register, tone and content suit them (e.g. practical concerns about cost, family safety, property value).`,
        contextNotes: `where, when and how the piece would be shared, e.g. a Sunday newspaper feature or radio reading at the start of hurricane season (June), a Ministry social media page alongside the Safe Roof Initiative, or a community council meeting before the season.`,
        model: `<p>My purpose was to reflect on a personal experience of hurricane damage in order to persuade homeowners to strengthen their houses before the season begins. The intended audience is Grenadian homeowners, especially those who believe that concrete walls alone are enough protection. The piece would be published in the Sunday newspaper and shared on the Ministry's social media pages in early June, at the start of hurricane season, when homeowners are deciding whether to apply for inspections and buy supplies. Its emotional, reflective tone suits readers who respond to lived experience.</p>` })
    ]
  });

  /* =====================================================================
     PAPER B · 2027 · Non-communicable diseases in children · Parents
     ===================================================================== */
  push({
    kind: 'p032', id: `P032B`, title: `Paper 032 · Practice Paper B · 2027: Non-communicable diseases in children (Parents)`, time: 135,
    intro: intro(`2027`, `Non-communicable diseases in children`, `Parents`),
    stimulus: `<p><b>SECTION A</b></p>
<p><i>Instructions: Read the extract below carefully and then answer the questions that follow.</i></p>
<p><i>The following public service announcement was sent home in printed form with primary school pupils and posted on the Ministry's social media pages to inform parents of a new school health screening programme.</i></p>
<blockquote>
<p><b>HEALTHY KIDS, STRONG FUTURE: CHILDHOOD SCREENING PROGRAMME</b></p>
<p>The Ministry of Public Health wishes to inform parents and guardians that, beginning Monday 12 April 2027, free health screenings will be conducted at all public and subsidised primary schools on Sint Maarten. Trained nurses will record each child's height, weight, blood pressure and blood-glucose level. Recent national data indicate that approximately one in four primary school pupils is overweight, placing these children at increased risk of Type 2 diabetes and hypertension in later life.</p>
<p>Participation is voluntary. Parents must complete and return the attached consent form to the class teacher no later than Friday 26 March 2027. Results will be shared confidentially with parents only. Where readings fall outside the healthy range, families will be referred, at no cost, to a paediatric nutritionist at the nearest public health clinic.</p>
<p>Parents are also invited to a free information evening, "Lunchboxes That Love Back", to be held in each school hall on the evening of Thursday 22 April 2027 at 6:00 p.m.</p>
</blockquote>`,
    questions: [
      sa({ module: '1', title: `Question 1(a)`, marks: 4, min: 40, max: 150,
        prompt: `<p>1. (a) Explain TWO challenges a working parent who commutes daily between the Dutch and French sides of the island is likely to face in receiving or acting on the information in this announcement.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I identified TWO different challenges.`, `I explained how each challenge affects receiving OR acting on the message.`, `I connected each challenge to this parent's situation.`],
        rubric: [
          { criterion: 'Challenge 1 identified and explained', marks: 2,
            look: [`\\b(bag|backpack|child|pupil|lost|forget|crumpled|sent home)\\b`, `\\b(time|busy|work|shift|late|tired|commut)\\b`],
            strong: `Names a challenge (e.g. the printed notice never reaches the parent from the child's bag) and explains its effect.`,
            weak: `Label only, or the challenge is not linked to receiving the information.` },
          { criterion: 'Challenge 2 identified and explained', marks: 2,
            look: [`\\b(French|language|Dutch|Spanish|Papiamentu|Creole)\\b`, `\\b(formal|technical|jargon|blood-glucose|paediatric|hypertension|term)\\b`, `\\b(social media|facebook|follow|algorithm|feed|online)\\b`, `\\b(6:00|evening|attend|deadline)\\b`],
            strong: `A second, distinct challenge clearly explained (e.g. language, technical vocabulary, social-media reach, timing).`,
            weak: `Repeats challenge 1 or gives no explanation.` }
        ],
        key: `<p><b>Question 1(a)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>The printed notice depends on the child delivering it; it may be lost, forgotten or damaged in the school bag, so the parent never receives it.</li>
<li>Long working hours and a daily commute leave little time to read school notices or social media posts carefully, so the message may be overlooked or the 26 March deadline missed.</li>
<li>The parent may be more comfortable in French, Spanish or another language than in English, making the notice difficult to understand.</li>
<li>Technical medical terms ("blood-glucose level", "hypertension", "paediatric nutritionist") may pose comprehension challenges.</li>
<li>The parent may not follow the Ministry's social media pages, so the online version will not appear in his or her feed.</li>
<li>Work schedules may prevent attendance at the 6:00 p.m. information evening.</li>
</ul>
<p>Award 2 marks each for TWO complete and clearly explained challenges which the parent may face.</p>
<p>Award 1 mark for a clear identification of a challenge which is not explained.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>First, the printed notice relies on the child bringing it home. Young children often forget papers in their bags, so a busy parent who leaves early and returns late may never see the notice or the consent form before the deadline.</p><p>Second, a parent who commutes from the French side may be more fluent in French than English. Medical terms such as "blood-glucose level" and "paediatric nutritionist" could make the English-only notice difficult to understand, so the parent may not realise the screening is free and important.</p>` }),

      sa({ module: '1', title: `Question 1(b)`, marks: 4, min: 40, max: 150,
        prompt: `<p>1. (b) Justify TWO appropriate digital media or technologies that the Ministry could use, in addition to its social media pages, to remind parents of the consent-form deadline and the information evening.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I chose TWO digital media or technologies, not including the Ministry's social media pages.`, `I justified each with a clear advantage for parents.`, `I linked my justification to reminding parents of dates.`],
        rubric: [
          { criterion: 'Digital medium 1 named and justified', marks: 2,
            look: [`\\b(whatsapp|sms|text message|bulk text|broadcast list)\\b`, `\\b(phone|instant|direct|reminder|read)\\b`],
            strong: `Names an appropriate digital medium (e.g. WhatsApp class groups, SMS) and justifies it for parents.`,
            weak: `Names a medium only, or chooses a traditional or print medium.` },
          { criterion: 'Digital medium 2 named and justified', marks: 2,
            look: [`\\b(email|e-mail|school app|parent portal|app|website|calendar|push notification|podcast|video|youtube|qr)\\b`],
            strong: `A second distinct digital medium with a convincing justification.`,
            weak: `Second medium missing, repeated or not justified.` }
        ],
        key: `<p><b>Question 1(b)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li><b>WhatsApp class/parent groups or broadcast lists</b> – most Caribbean parents use WhatsApp daily; messages arrive directly on the phone and can be translated; voice notes suit parents who prefer oral communication; teachers can resend reminders close to the deadline.</li>
<li><b>SMS/bulk text messaging</b> – reaches any mobile phone without data; short, direct reminders with dates; high open rates.</li>
<li><b>Email from the school</b> – allows the consent form to be attached and printed or signed electronically; creates a record.</li>
<li><b>School or parent-portal app with push notifications/calendar invites</b> – adds the dates directly to the parent's calendar with automatic reminders.</li>
<li><b>Short video on YouTube/TikTok or the school website</b> – a nurse can demonstrate the screening, reassuring anxious parents; visual and aural appeal.</li>
<li><b>QR code on the printed notice</b> linking to an online consent form – parents can respond instantly from their phones.</li>
</ul>
<p>Award 2 marks each for a complete and clear justification of TWO appropriate digital media.</p>
<p>Award 1 mark for only naming TWO appropriate digital media without adequate justification.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>WhatsApp parent groups would be effective because nearly every parent uses WhatsApp daily on the phone. Teachers could send short reminders a few days before 26 March, and voice notes could be recorded in English and French for parents who prefer to listen.</p><p>SMS text messages would also work because they reach any mobile phone, even without data. A brief text such as "Screening consent forms due Friday 26 March" arrives directly and is likely to be read within minutes.</p>` }),

      sa({ module: '1', title: `Question 1(c)`, marks: 2, min: 20, max: 80,
        prompt: `<p>1. (c) Comment on ONE local source of information which parents could consult if they have concerns about their child's weight or diet.</p><p style="text-align:right">[2 marks]</p>`,
        checklist: [`I named ONE specific local source.`, `I explained why it is reliable or accessible for parents.`],
        rubric: [
          { criterion: 'Local source identified', marks: 1,
            look: [`\\b(paediatrician|pediatrician|nutritionist|dietitian|doctor|nurse|clinic|collective prevention|school nurse|health centre|gp)\\b`],
            strong: `Identifies a relevant local source.`,
            weak: `Source vague or not local.` },
          { criterion: 'Comment on suitability', marks: 1,
            look: [`\\b(qualified|trained|expert|knows|confidential|reliable|accurate|free|trusted|personal)\\b`],
            strong: `Explains why the source is credible or accessible.`,
            weak: `No explanation given.` }
        ],
        key: `<p><b>Question 1(c)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>The family doctor/general practitioner or paediatrician – knows the child's medical history and can give personalised, confidential advice.</li>
<li>The paediatric nutritionist at Collective Prevention Services – a free, official, qualified source named in the announcement.</li>
<li>The school nurse or health educator – easily accessible at school and trained in child health.</li>
<li>Community health fairs or church health ministries run by trained volunteers – accessible and trusted within the community.</li>
</ul>
<p>Award 2 marks for a satisfactory explanation of ONE local source of information which parents could consult.</p>
<p>Award 1 mark for an acceptable identification of a relevant local source but without adequate explanation.</p>`,
        model: `<p>Parents could consult the paediatric nutritionist at the Collective Prevention Services clinic. This is a qualified, official source that offers free advice tailored to children, so parents receive accurate guidance without worrying about cost.</p>` }),

      sa({ module: '2', title: `Question 2(a)`, marks: 4, min: 40, max: 150,
        prompt: `<p>2. (a) Suppose the Ministry decides to record a short radio version of this announcement for parents. Explain ONE reason why it should retain Standard English and ONE reason why it might use a more consultative (less formal) register in the radio version.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I identified Standard English and gave a reason to keep it.`, `I identified a consultative/less formal register and gave a reason for it.`, `My reasons relate to parents listening on radio.`],
        rubric: [
          { criterion: 'Dialectal variety identified and justified', marks: 2,
            look: [`\\b(standard english|acrolect)\\b`, `\\b(official|credib|authority|serious|understood|wide|whole)\\b`],
            strong: `Identifies Standard English and gives a clear reason for retaining it.`,
            weak: `Variety misidentified or reason missing.` },
          { criterion: 'Register identified and justified', marks: 2,
            look: [`\\b(consultative|informal|less formal|casual|conversational|friendly)\\b`, `\\b(listen|warm|reassur|relat|approachable|everyday|understand|anxious|trust)\\b`],
            strong: `Identifies a consultative register and explains how it helps parents engage with a spoken message.`,
            weak: `Register misidentified or no reason given.` }
        ],
        key: `<p><b>Question 2(a)</b> &nbsp;[4 marks]</p>
<p><b>DIALECTAL VARIETY</b></p><p>Standard English/acrolect should be retained because</p><ul>
<li>it is the official variety associated with government and health authorities, lending credibility</li>
<li>it is widely understood across the island's multilingual population, even by those who do not speak it</li>
<li>it signals the seriousness of health risks such as diabetes and hypertension.</li></ul>
<p><b>LANGUAGE REGISTER</b></p><p>A consultative (less formal) register might be used because</p><ul>
<li>radio is an oral, intimate medium; a warm, conversational tone ("As a parent, you want...") engages listeners better than a read-out official notice</li>
<li>simpler wording replaces technical terms ("blood sugar" for "blood-glucose level"), aiding comprehension</li>
<li>a friendly tone reassures parents who may feel anxious or judged about their child's weight, encouraging participation.</li></ul>
<p>Award 1 mark for correct identification of the Standard English dialectal variety and 1 mark for an acceptable explanation. [2 marks]</p>
<p>Award 1 mark for correct identification of a consultative/less formal register and 1 mark for an acceptable explanation. [2 marks]</p>
<p>Award 1 mark for correct identification of dialectal variety and register without explanation. [1 mark]</p>`,
        model: `<p>The Ministry should keep Standard English because it is the official variety of government communication and is widely understood across Sint Maarten's multilingual population, so the message retains its credibility and seriousness.</p><p>However, it could use a consultative register on radio because listeners respond better to a warm, conversational voice. Saying "blood sugar" instead of "blood-glucose level" and speaking directly to parents would reassure those who feel anxious about their child's weight and make them more likely to sign the consent form.</p>` }),

      sa({ module: '2', title: `Question 2(b)`, marks: 2, min: 15, max: 80,
        prompt: `<p>2. (b) Based on the public service announcement, list the TWO MOST important message points which an audience of parents would need to know.</p><p style="text-align:right">[2 marks]</p>`,
        checklist: [`I listed exactly TWO message points.`, `Each includes key details (what, when, what to do).`],
        rubric: [
          { criterion: 'Message point 1', marks: 1,
            look: [`\\b(free|screening|12 april|height|weight|blood)\\b`],
            strong: `An accurate, important message point.`,
            weak: `Inaccurate, trivial or not from the announcement.` },
          { criterion: 'Message point 2', marks: 1,
            look: [`\\b(consent|26 march|deadline|form|teacher|22 april|information evening|confidential|referr)\\b`],
            strong: `A second, distinct and accurate message point.`,
            weak: `Repeats point 1 or omits essential details.` }
        ],
        key: `<p><b>Question 2(b)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>Free health screenings (height, weight, blood pressure, blood glucose) begin at primary schools on Monday 12 April 2027.</li>
<li>Return the signed consent form to the class teacher by Friday 26 March 2027; participation is voluntary.</li>
<li>Results are confidential and shared only with parents; children outside the healthy range receive a free referral to a paediatric nutritionist.</li>
<li>About one in four primary pupils is overweight and at risk of Type 2 diabetes and hypertension.</li>
<li>Free information evening, "Lunchboxes That Love Back", Thursday 22 April 2027 at 6:00 p.m. in school halls.</li>
</ul>
<p>Award 1 mark each for TWO clearly stated message points which the audience would need to know.</p>`,
        model: `<ul><li>Free health screenings for primary school children begin on Monday 12 April 2027.</li><li>Parents must return the signed consent form to the class teacher by Friday 26 March 2027.</li></ul>` }),

      sa({ module: '2', title: `Question 2(c)`, marks: 4, min: 25, max: 120,
        prompt: `<p>2. (c) Create a slogan which you could use to encourage parents to pack healthier lunches for their children, using ONE literary technique.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I wrote a short slogan about healthy lunches aimed at parents.`, `I named ONE literary technique used in it.`, `I explained how it persuades parents.`],
        rubric: [
          { criterion: 'Relevant slogan', marks: 1,
            look: [`\\b(lunch|lunchbox|food|fruit|snack|sugar|soda|water|eat|healthy|plate)\\b`],
            strong: `A concise, original slogan clearly about healthier lunches.`,
            weak: `Slogan missing, too long or unrelated.` },
          { criterion: 'Literary technique identified', marks: 1,
            look: [`\\b(rhyme|alliteration|personification|metaphor|simile|pun|rhetorical question|allusion|repetition|antithesis|parallelism|hyperbole|assonance)\\b`],
            strong: `Correctly names a technique present in the slogan.`,
            weak: `Technique misnamed or absent.` },
          { criterion: 'Explanation of technique linked to issue', marks: 2,
            look: [`\\b(memorable|remember|emotion|love|guilt|future|image|emphasi|persuade|appeal)\\b`, `\\b(because|so that|which|suggests|makes)\\b`],
            strong: `Clearly explains how the technique conveys the message and appeals to parents.`,
            weak: `Explanation unclear, incomplete or not linked to children's health.` }
        ],
        key: `<p><b>Question 2(c)</b> &nbsp;[4 marks]</p>
<p><b>POSSIBLE SLOGANS</b></p><ul>
<li>"Pack it with love, not with sugar." – <b>Antithesis</b> sets love against sugar, suggesting that real care means healthy choices, not treats.</li>
<li>"Today's lunchbox is tomorrow's health." – <b>Metaphor</b> equates daily food choices with a child's future well-being.</li>
<li>"Fresh fruit, fit future." – <b>Alliteration</b> creates a catchy, memorable phrase linking fruit to long-term health.</li>
<li>"Swap the soda, save the smile." – <b>Alliteration and parallelism</b> give a simple, positive action and a reward.</li>
<li>"Would you fill their future with sugar?" – <b>Rhetorical question</b> prompts parents to reflect on their choices.</li>
</ul>
<p>Any other relevant slogan accompanied by an explanation of the related use of a literary technique.</p>
<p>Award 1 mark for a relevant slogan which could encourage parents to pack healthier lunches, 1 mark for inclusion of a literary technique used to appeal to the audience and 2 marks for the explanation of the technique which is linked to the issue of non-communicable diseases in children.</p>
<p>Award 1 mark for an explanation which is unclear or incomplete.</p>
<p style="text-align:right">[4 marks]</p>`,
        model: `<p><b>Slogan:</b> "Today's lunchbox is tomorrow's health."</p><p><b>Technique:</b> metaphor.</p><p><b>Explanation:</b> The metaphor presents the lunchbox as the child's future health, suggesting that small daily choices add up to diabetes or wellness later. This appeals to parents' love and sense of responsibility, persuading them that packing water and fruit instead of soda and chips is an investment in their child's future.</p>` }),

      q3a({ topicCaps: `NON-COMMUNICABLE DISEASES IN CHILDREN`, audience: `Parents`,
        creativeLook: [`\\b(diabetes|obes|overweight|hypertension|asthma|sugar|lunch|exercise|screen)\\b`],
        ideas: `<li>Reflective: a parent's or older sibling's experience of a child's diagnosis (e.g. Type 2 diabetes, asthma); memories of food culture and changing family habits; guilt, fear and hope; the moment a family decided to change.</li>
<li>Expository: causes of rising childhood obesity in the Caribbean (sugary drinks, fast food, screen time, reduced outdoor play); warning signs; practical strategies for parents (meal planning, water instead of juice, family activity); the role of schools and screenings.</li>`,
        model: `<p><b>The Sweetness We Called Love</b></p>
<p>When I was nine, my mother rewarded every good report with a cold soda and a box of fried chicken. Sweetness was how our family said, "I am proud of you." It never occurred to any of us that love could be measured in teaspoons of sugar.</p>
<p>Then my younger brother, Jaden, began drinking water constantly and falling asleep in class. I remember my mother's face in the clinic when the nurse read out his blood-sugar level. She held the paper as if it were written in a foreign language. Type 2 diabetes, at eleven. That was a disease for grandparents, we thought, not for a boy who still played cricket in the yard.</p>
<p>The months that followed were difficult. Jaden cried over the snacks he could no longer have, and my mother blamed herself. However, slowly, our kitchen changed. Juice became water with lime. Fried chicken became baked fish on Sundays. We began walking along the boardwalk together in the evenings, and somewhere along the way the walks became the reward.</p>
<p>Today Jaden's readings are healthy, and I have learned that the habits we hand our children are as lasting as our surnames. To every parent reading this: the sweetness you offer at the table is not the only way to show love. Sometimes the most loving gift is a glass of water, a plate of vegetables and an hour of your time.</p>` }),

      q3b({ audience: `Parents`, audienceLook: `\\b(parents?|guardians?|mothers?|fathers?)\\b`,
        purposeNotes: `e.g. to reflect on a family's experience of a child's NCD in order to encourage parents to change habits; OR to inform/explain causes, warning signs and prevention strategies. Purpose should be linked to features of the piece (narrative detail, emotive appeal, clear explanation).`,
        audienceNotes: `parents and guardians (possibly of primary-school children), with reasons why tone and content suit them (e.g. non-judgemental tone avoids defensiveness; practical tips suit busy parents; emotional appeal draws on parental love).`,
        contextNotes: `e.g. read aloud at the "Lunchboxes That Love Back" information evening; printed in a PTA newsletter; posted on the Ministry's social media alongside the screening campaign; broadcast on a radio parenting programme.`,
        model: `<p>My purpose was to reflect on my family's experience of my brother's diabetes in order to persuade parents to rethink using sugary food as a reward. The intended audience is parents of primary school children, who may not realise that NCDs can begin in childhood; the gentle, personal tone avoids blaming them. The piece would be read aloud at the "Lunchboxes That Love Back" information evening and printed in the PTA newsletter during the screening campaign, when parents are already thinking about their children's health.</p>` })
    ]
  });

  /* =====================================================================
     PAPER C · 2028 · Single parenthood · Teenagers
     ===================================================================== */
  push({
    kind: 'p032', id: `P032C`, title: `Paper 032 · Practice Paper C · 2028: Single parenthood (Teenagers)`, time: 135,
    intro: intro(`2028`, `Single parenthood`, `Teenagers`),
    stimulus: `<p><b>SECTION A</b></p>
<p><i>Instructions: Read the extract below carefully and then answer the questions that follow.</i></p>
<p><i>The following extract is taken from a feature article published in a Vincentian weekend newspaper and shared on the newspaper's website. It introduces a new youth support initiative.</i></p>
<blockquote>
<p><b>"Not Alone": New Programme Reaches Out to Teens in Single-Parent Homes</b></p>
<p>Nearly half of the island's secondary school students live in households headed by a single parent, according to a recent survey conducted by the Department of Youth Affairs. While many of these young people thrive, counsellors report that a significant number carry responsibilities well beyond their years: minding younger siblings, preparing meals and, in some cases, taking part-time jobs to help with household bills.</p>
<p>In response, the Department of Youth Affairs, in partnership with three secondary schools and a local youth charity, will launch "Not Alone" in September 2028. The programme offers weekly peer-support circles led by trained youth facilitators, free after-school homework assistance and confidential sessions with school counsellors. A dedicated helpline, 555-TEEN, will operate from 4:00 p.m. to 10:00 p.m., Monday to Saturday.</p>
<p>"Our aim is not to label any family," explained the programme coordinator. "Single-parent households are often full of love and resilience. We simply want to make sure that no teenager feels they have to carry everything by themselves." Students may register through their school's guidance office or by scanning the QR code displayed on posters around the school.</p>
</blockquote>`,
    questions: [
      sa({ module: '1', title: `Question 1(a)`, marks: 4, min: 40, max: 150,
        prompt: `<p>1. (a) Explain TWO reasons why a teenager from a single-parent household might NOT receive or respond to the information in this article.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I gave TWO different reasons.`, `I explained how each reason prevents the teenager from receiving or responding to the message.`, `I referred to details in the article or the teenager's situation.`],
        rubric: [
          { criterion: 'Reason 1 identified and explained', marks: 2,
            look: [`\\b(newspaper|weekend|read|website|teens? (do not|don't)|print)\\b`, `\\b(channel|medium|tiktok|instagram|social media|snapchat)\\b`],
            strong: `Identifies a reason (e.g. teenagers seldom read newspapers) and explains its effect on receiving the message.`,
            weak: `Label only, or not linked to receiving/responding.` },
          { criterion: 'Reason 2 identified and explained', marks: 2,
            look: [`\\b(stigma|shame|embarrass|label|pity|judg|privacy|peer)\\b`, `\\b(busy|siblings|job|work|time|responsibilit|babysit)\\b`, `\\b(phone|credit|data|qr)\\b`, `\\b(formal|register|language|statistic)\\b`],
            strong: `A second, distinct reason (stigma, time pressures, lack of data, formal register) clearly explained.`,
            weak: `Repeats reason 1 or gives no explanation.` }
        ],
        key: `<p><b>Question 1(a)</b> &nbsp;[4 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>Few teenagers read weekend newspapers or visit newspaper websites; they get information mainly from social media, so the article may never reach them.</li>
<li>Fear of stigma or embarrassment: a teenager may not want peers to know he or she lives in a single-parent home, and so may ignore or avoid registering.</li>
<li>Heavy home responsibilities (minding siblings, part-time work) leave little time to read, attend support circles or visit the guidance office.</li>
<li>Lack of a smartphone or mobile data may prevent scanning the QR code or reading the article online.</li>
<li>The formal journalistic register and statistics may seem distant and unrelatable to teenagers.</li>
<li>Distrust of adults/authority figures or concern about confidentiality may discourage response.</li>
</ul>
<p>Award 2 marks each for TWO complete and clearly explained reasons.</p>
<p>Award 1 mark for a clear identification of a reason which is not explained.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p>One reason is that most teenagers do not read weekend newspapers. They get their news from TikTok and Instagram, so an article in the newspaper or on its website is unlikely to reach them at all.</p><p>A second reason is the fear of stigma. A teenager may feel embarrassed about being seen as someone who "needs help" because of a single-parent home, so even after reading the article, he or she may avoid registering at the guidance office where classmates could notice.</p>` }),

      sa({ module: '1', title: `Question 1(b)`, marks: 4, min: 40, max: 150,
        prompt: `<p>1. (b) Justify the use of ONE traditional medium AND ONE digital medium that the Department of Youth Affairs could use to promote "Not Alone" to teenagers.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I chose ONE traditional medium and ONE digital medium.`, `I justified each choice for a teenage audience.`, `I did not choose two of the same type.`],
        rubric: [
          { criterion: 'Traditional medium named and justified', marks: 2,
            look: [`\\b(radio|television|tv|assembly|word of mouth|peer|poster|drama|skit|school visit|loudspeaker)\\b`],
            strong: `Names a traditional medium and justifies it for teenagers (e.g. a school assembly presentation reaches all students at once).`,
            weak: `Medium named only, or misclassified.` },
          { criterion: 'Digital medium named and justified', marks: 2,
            look: [`\\b(tiktok|instagram|snapchat|youtube|whatsapp|podcast|social media|influencer|reel|app|text)\\b`, `\\b(teen|young|share|scroll|daily|private|relat)\\b`],
            strong: `Names a digital medium and gives a convincing justification for teenagers.`,
            weak: `Medium named only, or justification generic.` }
        ],
        key: `<p><b>Question 1(b)</b> &nbsp;[4 marks]</p>
<p><b>Traditional media – acceptable answers include:</b></p><ul>
<li><b>School assembly presentation or drama skit</b> – reaches all students at once; a skit by peers makes the issue relatable without singling anyone out.</li>
<li><b>Radio (youth programme/call-in show)</b> – popular with teens during commutes; a youth presenter can normalise the topic; listeners remain anonymous.</li>
<li><b>Word of mouth through peer facilitators</b> – teenagers trust peers more than adults; personal recommendation reduces stigma.</li>
<li><b>Television</b> – visual and aural appeal; testimonies from teens can be broadcast during youth programmes.</li></ul>
<p><b>Digital media – acceptable answers include:</b></p><ul>
<li><b>TikTok/Instagram reels</b> – where teenagers spend much of their time; short, engaging videos with relatable creators; easily shared.</li>
<li><b>WhatsApp/text broadcast</b> – private, direct; helpline number can be saved instantly.</li>
<li><b>Podcast or YouTube series</b> – teens can listen privately to stories from peers in single-parent homes.</li></ul>
<p>Award 2 marks each for a complete and clear justification of ONE appropriate traditional medium and ONE appropriate digital medium.</p>
<p>Award 1 mark for only naming an appropriate medium without adequate justification.</p>
<p style="text-align:right">[2 + 2 = 4 marks]</p>`,
        model: `<p><b>Traditional:</b> A short drama skit at school assemblies would reach every student at once. Because it is performed by peers and shows the whole school, no individual teenager is singled out, which reduces the stigma of seeking help.</p><p><b>Digital:</b> TikTok would be effective because teenagers spend hours scrolling it daily. A short video featuring relatable youth facilitators and the 555-TEEN number can be watched privately and shared easily among friends.</p>` }),

      sa({ module: '1', title: `Question 1(c)`, marks: 2, min: 20, max: 80,
        prompt: `<p>1. (c) Comment on ONE local source of information, other than the "Not Alone" programme, which a teenager could consult if he or she is struggling with responsibilities at home.</p><p style="text-align:right">[2 marks]</p>`,
        checklist: [`I named ONE local source that is not "Not Alone".`, `I explained why it is helpful or trustworthy for a teenager.`],
        rubric: [
          { criterion: 'Local source identified', marks: 1,
            look: [`\\b(counsellor|counselor|teacher|form teacher|pastor|youth leader|church|coach|relative|aunt|uncle|grandparent|social worker|nurse)\\b`],
            strong: `Identifies a relevant local source other than the programme.`,
            weak: `Source vague or is the "Not Alone" programme itself.` },
          { criterion: 'Comment on suitability', marks: 1,
            look: [`\\b(trust|trained|confidential|know|experience|close|access|private|reliable)\\b`],
            strong: `Explains why the source is trustworthy or accessible.`,
            weak: `No explanation.` }
        ],
        key: `<p><b>Question 1(c)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>A trusted form teacher or sports coach – sees the student daily, notices changes and can refer to support.</li>
<li>A church youth leader or pastor – a trusted, community-based adult, often with counselling experience.</li>
<li>An extended family member (grandparent, aunt, uncle) – knows the family situation and may offer practical help.</li>
<li>A social worker at the Department of Social Development – trained professional who can link the family to services.</li>
</ul>
<p>Award 2 marks for a satisfactory explanation of ONE local source of information.</p>
<p>Award 1 mark for an acceptable identification of a relevant local source but without adequate explanation.</p>`,
        model: `<p>The teenager could talk to a church youth leader. Youth leaders are trusted adults in the community who often have counselling experience and already know the family, so the teen may feel comfortable sharing private concerns.</p>` }),

      sa({ module: '2', title: `Question 2(a)`, marks: 4, min: 40, max: 150,
        prompt: `<p>2. (a) The article is written in Standard English and a formal register. Explain TWO reasons why a youth facilitator speaking to teenagers in a "Not Alone" peer-support circle might choose to use Vincentian Creole and a casual or intimate register instead.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I identified Creole (dialectal variety) and gave a reason for using it.`, `I identified a casual/intimate register and gave a reason for using it.`, `My reasons connect to teenagers in a support circle.`],
        rubric: [
          { criterion: 'Dialectal variety identified and explained', marks: 2,
            look: [`\\b(creole|vernacular|basilect|mesolect|dialect|home language)\\b`, `\\b(identity|solidarity|comfort|belong|relat|natural|home|express|emotion)\\b`],
            strong: `Identifies Creole and explains why it suits teenagers in a support circle (e.g. solidarity, emotional expression).`,
            weak: `Variety misidentified or no reason given.` },
          { criterion: 'Register identified and explained', marks: 2,
            look: [`\\b(casual|intimate|informal|conversational)\\b`, `\\b(trust|relax|safe|open|barrier|friend|peer|equal|honest)\\b`],
            strong: `Identifies a casual/intimate register and explains how it builds trust and openness.`,
            weak: `Register misidentified or no reason given.` }
        ],
        key: `<p><b>Question 2(a)</b> &nbsp;[4 marks]</p>
<p><b>DIALECTAL VARIETY</b></p><p>Vincentian Creole/the vernacular might be used because</p><ul>
<li>it is the home language of many teenagers and the variety in which they express emotion most naturally</li>
<li>it signals solidarity and shared identity, reducing the social distance between facilitator and participants</li>
<li>it avoids the "classroom" or "official" feel of Standard English, which may make teens feel judged or lectured.</li></ul>
<p><b>LANGUAGE REGISTER</b></p><p>A casual or intimate register might be used because</p><ul>
<li>the support circle is a small, private, trusting setting rather than an official one</li>
<li>it encourages openness and honesty about sensitive family matters</li>
<li>it positions the facilitator as a peer or friend rather than an authority figure.</li></ul>
<p>Award 1 mark for correct identification of the Creole dialectal variety and 1 mark for an acceptable explanation of the choice. [2 marks]</p>
<p>Award 1 mark for correct identification of a casual/intimate register and 1 mark for an acceptable explanation. [2 marks]</p>
<p>Award 1 mark for correct identification of dialectal variety and register without explanation. [1 mark]</p>`,
        model: `<p>The facilitator might use Vincentian Creole because it is the language many teenagers speak at home and use to express their feelings. Speaking it creates solidarity and shows the facilitator is "one of them", not a teacher giving a lecture.</p><p>A casual, intimate register would suit the small, private setting of a support circle. Relaxed, friendly language helps teenagers feel safe enough to open up honestly about difficult situations at home without fear of being judged.</p>` }),

      sa({ module: '2', title: `Question 2(b)`, marks: 2, min: 15, max: 80,
        prompt: `<p>2. (b) Based on the article, list the TWO MOST important message points which an audience of teenagers would need to know.</p><p style="text-align:right">[2 marks]</p>`,
        checklist: [`I listed exactly TWO message points.`, `Each is accurate and useful to a teenager.`],
        rubric: [
          { criterion: 'Message point 1', marks: 1,
            look: [`\\b(peer|support circle|homework|counsell|free|confidential|september)\\b`],
            strong: `An accurate, important message point.`,
            weak: `Inaccurate, trivial or not from the article.` },
          { criterion: 'Message point 2', marks: 1,
            look: [`\\b(555|helpline|4:00|10:00|register|guidance|qr)\\b`],
            strong: `A second, distinct and accurate message point.`,
            weak: `Repeats point 1 or lacks essential details.` }
        ],
        key: `<p><b>Question 2(b)</b> &nbsp;[2 marks]</p>
<p><b>Acceptable answers include:</b></p><ul>
<li>"Not Alone" begins in September 2028, offering free weekly peer-support circles, homework help and confidential counselling.</li>
<li>Call the helpline 555-TEEN, 4:00 p.m. to 10:00 p.m., Monday to Saturday.</li>
<li>Register through the school's guidance office or by scanning the QR code on school posters.</li>
<li>The programme does not label families; its aim is that no teenager should carry responsibilities alone.</li>
</ul>
<p>Award 1 mark each for TWO clearly stated message points which the audience would need to know.</p>`,
        model: `<ul><li>From September 2028, "Not Alone" offers free peer-support circles, homework help and confidential counselling.</li><li>Teens can call 555-TEEN (4–10 p.m., Monday to Saturday) or register at the guidance office or by scanning the QR code.</li></ul>` }),

      sa({ module: '2', title: `Question 2(c)`, marks: 4, min: 25, max: 120,
        prompt: `<p>2. (c) Create a slogan which you could use to encourage teenagers in single-parent homes to seek support, using ONE literary technique.</p><p style="text-align:right">[4 marks]</p>`,
        checklist: [`I wrote a short slogan encouraging teens to seek support.`, `I named ONE literary technique used in the slogan.`, `I explained how the technique appeals to teenagers.`],
        rubric: [
          { criterion: 'Relevant slogan', marks: 1,
            look: [`\\b(alone|together|help|support|talk|reach|carry|load|weight|share|strong)\\b`],
            strong: `A concise, original slogan clearly encouraging teens to seek support.`,
            weak: `Slogan missing, too long or unrelated.` },
          { criterion: 'Literary technique identified', marks: 1,
            look: [`\\b(rhyme|alliteration|personification|metaphor|simile|pun|rhetorical question|allusion|repetition|antithesis|parallelism|hyperbole|assonance)\\b`],
            strong: `Correctly names a technique present in the slogan.`,
            weak: `Technique misnamed or absent.` },
          { criterion: 'Explanation of technique linked to issue', marks: 2,
            look: [`\\b(memorable|remember|emotion|burden|image|emphasi|strength|brave|persuade|appeal|stigma)\\b`, `\\b(because|so that|which|suggests|makes)\\b`],
            strong: `Clearly explains how the technique conveys the message and appeals to teenagers.`,
            weak: `Explanation unclear, incomplete or not linked to seeking support.` }
        ],
        key: `<p><b>Question 2(c)</b> &nbsp;[4 marks]</p>
<p><b>POSSIBLE SLOGANS</b></p><ul>
<li>"Share the load, lighten the road." – <b>Rhyme</b> (load/road) makes the message memorable and suggests that life becomes easier when burdens are shared.</li>
<li>"Your backpack wasn't built for the whole house." – <b>Metaphor</b> presents home responsibilities as an overloaded backpack, a vivid, relatable image for students.</li>
<li>"Strong enough to stand, brave enough to ask." – <b>Parallelism</b> reframes asking for help as a sign of courage, countering stigma.</li>
<li>"Who said you had to carry it alone?" – <b>Rhetorical question</b> challenges the belief that teens must cope by themselves.</li>
</ul>
<p>Any other relevant slogan accompanied by an explanation of the related use of a literary technique.</p>
<p>Award 1 mark for a relevant slogan which could encourage teenagers to seek support, 1 mark for inclusion of a literary technique used to appeal to the audience and 2 marks for the explanation of the technique which is linked to the issue of single parenthood.</p>
<p>Award 1 mark for an explanation which is unclear or incomplete.</p>
<p style="text-align:right">[4 marks]</p>`,
        model: `<p><b>Slogan:</b> "Strong enough to stand, brave enough to ask."</p><p><b>Technique:</b> parallelism.</p><p><b>Explanation:</b> The two balanced phrases place standing strong and asking for help side by side as equal signs of courage. This appeals to teenagers' pride by suggesting that seeking support is brave rather than weak, which helps to reduce the stigma that might stop them from calling the helpline or joining a peer circle.</p>` }),

      q3a({ topicCaps: `SINGLE PARENTHOOD`, audience: `Teenagers`,
        creativeLook: [`\\b(mother|father|mom|mum|dad|parent|single|sibling|home|alone)\\b`],
        ideas: `<li>Reflective: growing up with one parent; a moment of realising a parent's sacrifice; taking on adult responsibilities; feelings of absence, resilience, gratitude or resentment; the role of extended family and community.</li>
<li>Expository: common challenges for teenagers in single-parent homes (finances, time, emotional strain); myths and stigma; strengths of single-parent families; practical coping strategies; where teens can find support.</li>`,
        model: `<p><b>The Kitchen Light</b></p>
<p>For most of my childhood, I measured my mother's day by the kitchen light. It was on when I woke up at six, because she was packing lunches before her shift at the hotel. It was on again at eleven at night, when she sat with a calculator and a pile of bills. I used to think the light simply never went off.</p>
<p>My father left when I was four, so I do not remember a different kind of home. At school, however, I noticed the questions. "Who's coming to parents' night?" "Why doesn't your dad pick you up?" I learned to answer quickly and change the subject, as if our family were a secret instead of a story.</p>
<p>At fifteen, I began minding my two younger brothers after school. Some afternoons I resented it. I wanted to be at football practice, not stirring rice and checking spelling homework. Then one night I came into the kitchen and found my mother asleep at the table, her head beside the calculator. In that moment, I understood that she was carrying far more than I was.</p>
<p>Now I see our home differently. It was not "broken"; it was built by one person working twice as hard. To any teenager who lives under a light like mine: your family is not less because it is smaller. Still, you do not have to carry everything alone. Talk to someone. Even the strongest kitchen light needs to be switched off sometimes.</p>` }),

      q3b({ audience: `Teenagers`, audienceLook: `\\b(teen|teenagers?|adolescents?|young people|students?|youth)\\b`,
        purposeNotes: `e.g. to reflect on growing up in a single-parent home in order to reassure teenagers and reduce stigma; OR to inform/explain the challenges and strengths of single-parent families and where to find help. Purpose should be linked to features such as personal narration, imagery or clear explanation.`,
        audienceNotes: `teenagers (e.g. secondary students aged 14–18, particularly those in single-parent homes), with reasons why tone, voice and content suit them (e.g. a peer voice is more credible than an adult lecture; relatable school details; a hopeful, non-judgemental tone).`,
        contextNotes: `e.g. read aloud at the launch of a peer-support circle; posted as a spoken-word video on the "Not Alone" TikTok/Instagram page; published in a school magazine or youth page of the newspaper; shared during a guidance assembly at the start of the school year.`,
        model: `<p>My purpose was to reflect on growing up in a single-parent home so that teenagers in similar situations feel understood and are encouraged to seek support. The intended audience is secondary school students, especially those carrying responsibilities at home; the personal, peer voice is more relatable to them than an adult lecture. The piece would be performed as a spoken-word video on the "Not Alone" Instagram and TikTok pages in September, during the programme's launch, when teenagers are scrolling and the helpline is newly available.</p>` })
    ]
  });
})();
