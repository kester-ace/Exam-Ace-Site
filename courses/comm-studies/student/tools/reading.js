/* Reading Room: local news / radio / YouTube links by territory, curated reading lists,
   a shelf tracker and a monthly reading bingo. Links only; the page makes no network calls.
   Media links verified Oct 2026 (official homepages / channel pages only). */
(function () {
  const CSS = `
.rd-tabs{margin-top:2px}
.rd-sec{display:flex;flex-direction:column;gap:10px}
.rd-sec h3{display:flex;align-items:center;gap:8px;font-size:1.05rem}
.rd-links{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px}
.rd-link{display:flex;flex-direction:column;gap:2px;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:var(--raise,rgba(255,255,255,.06));color:var(--ink);text-decoration:none;min-width:0;box-shadow:0 3px 0 rgba(0,0,0,.28);transition:transform .08s,box-shadow .08s}
.rd-link:hover,.rd-link:focus-visible{border-color:var(--gold);outline:none;box-shadow:0 0 0 2px var(--gold),0 3px 0 rgba(0,0,0,.28)}
.rd-link:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.28)}
.rd-link b{font-size:.98rem;overflow-wrap:anywhere}
.rd-link span{font-size:.8rem;color:var(--muted);overflow-wrap:anywhere}
.rd-link .rd-go{color:var(--gold);font-weight:700}
.rd-stations{display:flex;flex-wrap:wrap;gap:6px}
.rd-st{font-size:.82rem;border:1px solid var(--line);border-radius:99px;padding:3px 10px;background:var(--surface)}
.rd-pick{display:flex;flex-wrap:wrap;gap:10px;align-items:end}
.rd-pick .field{flex:1 1 220px}
.rd-pick select{width:100%}
.rd-books{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.rd-book{display:flex;flex-direction:column;gap:8px;padding:14px 16px;border-radius:16px;border:1px solid var(--line);background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,0) 45%),var(--surface);min-width:0}
.rd-book h4{font-size:1.02rem;line-height:1.3}
.rd-book .rd-by{font-size:.86rem;color:var(--muted)}
.rd-book p{font-size:.9rem;margin:0}
.rd-book .rd-angle{border-left:3px solid var(--gold);padding-left:10px;font-size:.86rem}
.rd-sbtns{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}
.rd-sbtns .chip{font-size:.8rem;padding:4px 10px}
.rd-spine{display:inline-block;width:10px;height:28px;border-radius:3px;margin-right:2px;vertical-align:middle;background:linear-gradient(180deg,var(--gold),#9C6F07);box-shadow:inset -2px 0 0 rgba(0,0,0,.25)}
.rd-spine.r{background:linear-gradient(180deg,#7FA7FF,#2849A8)}
.rd-spine.w{background:linear-gradient(180deg,#C9D3F2,#6B79A8)}
.rd-shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.rd-col{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:14px;border:1px dashed var(--line);min-width:0}
.rd-col h4{display:flex;justify-content:space-between;gap:6px}
.rd-item{display:flex;flex-direction:column;gap:6px;padding:10px;border-radius:12px;background:var(--raise,rgba(255,255,255,.06));border:1px solid var(--line)}
.rd-item b{font-size:.92rem}
.rd-item .row{gap:6px}
.rd-item .btn{padding:5px 10px;font-size:.8rem}
.rd-ref{display:flex;flex-direction:column;gap:10px}
.rd-ref textarea{width:100%;min-height:120px;resize:vertical;font:inherit;border:2px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--raise,rgba(255,255,255,.06));color:var(--ink)}
.rd-bingo{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
.rd-cell{min-height:78px;border-radius:12px;border:1px solid var(--line);background:var(--surface);color:var(--ink);font-size:.74rem;line-height:1.25;padding:6px 5px;display:flex;align-items:center;justify-content:center;text-align:center;overflow-wrap:break-word;word-break:normal;hyphens:auto;-webkit-hyphens:auto;box-shadow:0 3px 0 rgba(0,0,0,.28);transition:transform .08s,box-shadow .08s}
.rd-cell:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.28)}
.rd-cell.on{background:linear-gradient(180deg,#FFF0B3,var(--gold) 60%);color:var(--on-gold,#1A1200);font-weight:700;border-color:var(--gold)}
.rd-cell.free{background:linear-gradient(180deg,#2E58C9,#17337F);color:#fff;font-weight:800}
.rd-cell.line{box-shadow:0 0 0 2px var(--gold),0 0 14px var(--glow,rgba(245,197,66,.5))}
.rd-legend{display:flex;flex-wrap:wrap;gap:12px;font-size:.85rem;color:var(--muted)}
@media (max-width:420px){.rd-cell{min-height:74px;font-size:.62rem;padding:4px 2px;letter-spacing:-.01em}.rd-bingo{gap:4px}.rd-links{grid-template-columns:minmax(0,1fr)}}
@media (prefers-reduced-motion:reduce){.rd-link,.rd-cell{transition:none}.rd-link:active,.rd-cell:active{transform:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ---------------- media by territory (ids match window.COURSE_TERRITORIES) ---------------- */
  const SD = 'https://streema.com/radios/country/';
  const MEDIA = {
    sx: {
      news: [['The Daily Herald', 'https://thedailyherald.sx/', 'Daily newspaper'], ['St. Maarten News', 'https://stmaartennews.com/', 'News site'], ['Government of Sint Maarten', 'https://www.sintmaartengov.org/', 'Official releases']],
      radio: { dir: SD + 'Sint_Maarten', st: ['PJD2 Radio 102.7 FM', 'Laser 101 (101.1 FM)', 'Island 92', 'Oasis 96.3 FM', 'Pearl FM 98.1', 'X 104.3 FM', 'SXM GOV Radio 107.9 FM'] },
      yt: [['Government of Sint Maarten (DCOMM)', 'https://www.youtube.com/channel/UC1bIsTYvgBE1AZ75j9HlSBA', 'Press briefings and public information']]
    },
    ai: {
      news: [['The Anguillian', 'https://theanguillian.com/', 'Weekly newspaper'], ['Government of Anguilla', 'https://www.gov.ai/', 'Official releases']],
      radio: { dir: SD + 'Anguilla', st: ['Radio Anguilla', 'Klass FM 92.9'] }, yt: []
    },
    ag: {
      news: [['Antigua Observer', 'https://antiguaobserver.com/', 'Daily newspaper'], ['ABS TV & Radio', 'https://www.abstvradio.com/', 'National broadcaster'], ['Antigua News Room', 'https://www.antiguanewsroom.com/', 'News site']],
      radio: { dir: SD + 'Antigua_and_Barbuda', st: ['Observer Radio', 'ZDK Radio 97.1 FM', 'Pointe FM 99.1'] }, yt: []
    },
    bs: {
      news: [['The Nassau Guardian', 'https://thenassauguardian.com/', 'Daily newspaper'], ['The Tribune', 'https://www.tribune242.com/', 'Daily newspaper'], ['ZNS Bahamas', 'https://znsbahamas.com/', 'National broadcaster']],
      radio: { dir: SD + 'Bahamas', st: ['96.9 FM Guardian Radio', 'Joy 101.9 FM', 'Power 104.5 FM'] }, yt: []
    },
    bb: {
      news: [['Nation News', 'https://nationnews.com/', 'Daily newspaper'], ['Barbados Today', 'https://barbadostoday.bb/', 'Online newspaper'], ['CBC Barbados', 'https://www.cbc.bb/', 'National broadcaster'], ['Barbados Government Information Service', 'https://gisbarbados.gov.bb/', 'Official releases']],
      radio: { dir: SD + 'Barbados', st: ['VOB 92.9 FM', 'Q 100.7 FM', 'Hitz 106.7 FM', 'The Beat 104'] },
      yt: [['Barbados Today', 'https://www.youtube.com/@barbadostodaynews', 'News video'], ['Barbados GIS', 'https://www.youtube.com/@thebgis', 'Government information']]
    },
    bz: {
      news: [['Amandala', 'https://amandala.com.bz/', 'Newspaper'], ['Channel 5 Belize', 'https://www.channel5belize.com/', 'TV news'], ['Love FM', 'https://lovefm.com/', 'Radio and news']],
      radio: { dir: SD + 'Belize', st: ['Love FM', 'KREM FM', 'Power FM 95.5'] }, yt: []
    },
    vg: {
      news: [['The BVI Beacon', 'https://www.bvibeacon.com/', 'Weekly newspaper'], ['Virgin Islands News Online', 'https://www.virginislandsnewsonline.com/', 'News site'], ['Government of the Virgin Islands', 'https://bvi.gov.vg/', 'Official releases']],
      radio: { dir: 'https://streema.com/radios/country/United_Kingdom/state/Virgin_Islands_British', st: ['ZCBN The Breeze 92.3 FM', 'ZVCR 106.9 FM', 'Tola Radio VI 100.5 FM'] }, yt: []
    },
    ky: {
      news: [['Cayman Compass', 'https://www.caymancompass.com/', 'Newspaper'], ['Cayman News Service', 'https://www.caymannewsservice.com/', 'News site'], ['Radio Cayman', 'https://www.radiocayman.gov.ky/', 'Government radio']],
      radio: { dir: SD + 'Cayman_Islands', st: ['Radio Cayman', 'Kiss 106.1 FM', 'Hot 104.1 FM'] }, yt: []
    },
    dm: {
      news: [['Government of Dominica News', 'https://news.gov.dm/', 'Official news'], ['DBS Radio', 'https://dbcradio.net/', 'National broadcaster']],
      radio: { dir: SD + 'Dominica', st: ['DBS Radio', 'Q95 FM', 'Kairi FM'] }, yt: []
    },
    gd: {
      news: [['NOW Grenada', 'https://nowgrenada.com/', 'News site'], ['Government of Grenada', 'https://www.gov.gd/', 'Official releases']],
      radio: { dir: SD + 'Grenada', st: ['Harbour Light Radio', 'Real FM', 'Power FM 95.1'] }, yt: []
    },
    gy: {
      news: [['Stabroek News', 'https://www.stabroeknews.com/', 'Daily newspaper'], ['Guyana Chronicle', 'https://guyanachronicle.com/', 'Daily newspaper'], ['Kaieteur News', 'https://kaieteurnewsonline.com/', 'Daily newspaper'], ['News Room Guyana', 'https://newsroom.gy/', 'Online news'], ['Department of Public Information', 'https://dpi.gov.gy/', 'Official news']],
      radio: { dir: SD + 'Guyana', st: ['Voice of Guyana 102.5 FM', 'Radio Guyana Inc.', 'HJ 94.1 Boom FM'] }, yt: []
    },
    jm: {
      news: [['The Gleaner', 'https://jamaica-gleaner.com/', 'Daily newspaper'], ['Jamaica Observer', 'https://www.jamaicaobserver.com/', 'Daily newspaper'], ['RJR News', 'https://radiojamaicanewsonline.com/', 'Radio news'], ['CVM TV', 'https://www.cvmtv.com/', 'TV news'], ['Jamaica Information Service', 'https://jis.gov.jm/', 'Official news'], ['Nationwide 90FM', 'https://www.nationwideradiojm.com/', 'News-talk radio']],
      radio: { dir: SD + 'Jamaica', st: ['RJR 94 FM', 'Nationwide 90FM', 'NCU FM', 'Mello FM'] },
      yt: [['Television Jamaica (TVJ)', 'https://www.youtube.com/@televisionjamaica', 'News and culture'], ['CVM TV', 'https://www.youtube.com/@cvmtv', 'News and current affairs'], ['UWI Mona', 'https://www.youtube.com/@uwimona', 'Lectures and campus events']]
    },
    ms: {
      news: [['Discover Montserrat (MNI)', 'https://discovermni.com/', 'News and information'], ['ZJB Radio Montserrat', 'https://www.zjbradio.com/', 'National radio and news']],
      radio: { dir: SD + 'Montserrat', st: ['ZJB Radio Montserrat'] }, yt: []
    },
    kn: {
      news: [['SKNIS', 'https://www.sknis.gov.kn/', 'Government information service'], ['ZIZ Broadcasting', 'https://www.zizonline.com/', 'National broadcaster']],
      radio: { dir: SD + 'Saint_Kitts_and_Nevis', st: ['ZIZ Radio 96.1 FM', 'Freedom FM 106.5', 'VON Radio 860 AM'] },
      yt: [['SKNIS', 'https://www.youtube.com/@sknis', 'Government information videos']]
    },
    lc: {
      news: [['The Voice', 'https://thevoiceslu.com/', 'Newspaper'], ['St. Lucia Times', 'https://stluciatimes.com/', 'News site'], ['HTS News4orce', 'https://www.htsstlucia.org/', 'TV news'], ['Government of Saint Lucia', 'https://www.govt.lc/', 'Official releases']],
      radio: { dir: SD + 'Saint_Lucia', st: ['Radio Caribbean International (RCI)', '92.3 Liberty FM', 'Real FM 91.3'] }, yt: []
    },
    vc: {
      news: [['Searchlight', 'https://www.searchlight.vc/', 'Newspaper'], ['iWitness News', 'https://www.iwnsvg.com/', 'News site'], ['One News SVG', 'https://onenewsstvincent.com/', 'News site'], ['NBC Radio SVG', 'https://nbcsvg.com/', 'National radio']],
      radio: { dir: SD + 'Saint_Vincent_and_the_Grenadines', st: ['NBC Radio', 'Hot 97.1', 'Sweet Radio SVG'] },
      yt: [['NBC SVG', 'https://www.youtube.com/@NBCSVG', 'National broadcaster']]
    },
    tt: {
      news: [['Trinidad Guardian', 'https://www.guardian.co.tt/', 'Daily newspaper'], ['Trinidad Express', 'https://trinidadexpress.com/', 'Daily newspaper'], ['Newsday', 'https://newsday.co.tt/', 'Daily newspaper'], ['CNC3', 'https://www.cnc3.co.tt/', 'TV news'], ['CCN TV6', 'https://www.tv6tnt.com/', 'TV news'], ['TTT', 'https://www.ttt.live/', 'State broadcaster']],
      radio: { dir: SD + 'Trinidad_and_Tobago', st: ['i95.5 FM', 'WACK Radio 90.1 FM', 'Radio Jaagriti'] },
      yt: [['CNC3 News', 'https://www.youtube.com/@CNC3NEWS', 'TV news'], ['Parliament of Trinidad and Tobago', 'https://www.youtube.com/@ttparliament', 'Debates: persuasive speech in action'], ['UWI St. Augustine', 'https://www.youtube.com/@uwistaugustine', 'Lectures and campus events']]
    },
    tc: {
      news: [['Turks and Caicos Weekly News', 'https://tcweeklynews.com/', 'Newspaper'], ['Radio Turks and Caicos (RTC)', 'https://www.rtc89fm.com/', 'National radio'], ['TCI Government', 'https://www.gov.tc/', 'Official releases']],
      radio: { dir: 'https://streema.com/radios/country/United_Kingdom/state/Turks_and_Caicos_Islands', st: ['RTC 89.1 FM', 'Power 92.5 FM', '88 Jamz 88.7 FM'] }, yt: []
    },
    'bq-saba': {
      news: [['BES-Reporter', 'https://www.bes-reporter.com/', 'News for Saba, Statia and Bonaire'], ['Public Entity Saba', 'https://www.sabagov.nl/', 'Official releases']],
      radio: null, yt: []
    },
    'bq-statia': {
      news: [['BES-Reporter', 'https://www.bes-reporter.com/', 'News for Statia, Saba and Bonaire'], ['Statia Government', 'https://www.statiagovernment.com/', 'Official releases']],
      radio: null, yt: []
    }
  };
  const REGIONAL = [
    ['CARICOM', 'https://caricom.org/', 'Caribbean Community Secretariat'], ['CARICOM Today', 'https://today.caricom.org/', 'Regional news from CARICOM'],
    ['CXC', 'https://www.cxc.org/', 'Syllabuses, news and results'], ['The University of the West Indies', 'https://www.uwi.edu/', 'Regional university'],
    ['Caribbean Broadcasting Union', 'https://www.caribroadcastunion.org/', 'Regional broadcasters'], ['Caribbean National Weekly', 'https://www.caribbeannationalweekly.com/', 'Regional and diaspora news']
  ];
  const REGIONAL_YT = [['CARICOM', 'https://www.youtube.com/@caricomorg', 'Summits, speeches, regional affairs']];
  const LEARN = [
    ['CrashCourse', 'https://www.youtube.com/@crashcourse', 'Fast, clear lessons. Try the Literature, Media Literacy and Navigating Digital Information series.'],
    ['TED-Ed', 'https://www.youtube.com/@TEDEd', 'Animated mini-lessons on language, ideas and history.'],
    ['TED', 'https://www.youtube.com/@TED', 'Model speeches for oral presentation: openings, pacing, gestures.'],
    ['Khan Academy', 'https://www.youtube.com/@khanacademy', 'Grammar, reading and research skills.'],
    ['BBC Ideas', 'https://www.youtube.com/@bbcideas', 'Short films on big ideas: good stimulus for expository writing.'],
    ['BBC Learning English', 'https://www.youtube.com/@bbclearningenglish', 'Pronunciation, vocabulary and usage.'],
    ['The School of Life', 'https://www.youtube.com/@theschooloflifetv', 'Essays on emotions and relationships; notice the persuasive voice.'],
    ['Nerdwriter1', 'https://www.youtube.com/@Nerdwriter1', 'Video essays on art and film: a model of analysis.']
  ];

  /* ---------------- books ---------------- */
  const CATS = [
    ['carib', '🌴 Caribbean literature'], ['sxm', '🇸🇽 St. Martin voices'], ['lang', '🗣️ Language & creoles'], ['write', '✍️ Writing & rhetoric'],
    ['rainy', '🌧️ Rainy-day reads'], ['beach', '🏖️ Beach-read classics'], ['academia', '🕯️ Dark academia'], ['cottage', '🌿 Cottagecore calm'],
    ['cozy', '🔎 Cozy mysteries'], ['poetry', '🌙 Poetry for the soul'], ['ideas', '💡 Big ideas']
  ];
  const AESTHETIC = ['rainy', 'beach', 'academia', 'cottage', 'cozy', 'poetry', 'ideas'];
  // [id, title, author, year, cats, why, angle]
  const B = [
    ['lovelace-dragon', "The Dragon Can't Dance", 'Earl Lovelace', 1979, 'carib', 'Carnival, Calvary Hill and a community trying to hold on to its dignity in Port of Spain.', 'Notice how the narrator moves between Standard English and Trinidadian Creole, and what each choice signals about closeness and authority.'],
    ['selvon-lonely', 'The Lonely Londoners', 'Sam Selvon', 1956, 'carib', 'Windrush-era Caribbean migrants making a life in London, told with humour and ache.', 'The whole narration is in a creolised voice. Ask: whose language is the "norm" here, and how does that shift the reader\'s position?'],
    ['kincaid-annie', 'Annie John', 'Jamaica Kincaid', 1985, 'carib', 'A girl growing up in Antigua and growing away from her mother. Short, sharp and unforgettable.', 'First-person reflective narrative: track tone shifts from adoration to resentment and the devices that create them.'],
    ['kincaid-small', 'A Small Place', 'Jamaica Kincaid', 1988, 'carib ideas', 'A furious, brilliant essay on tourism and colonial legacy in Antigua.', 'Second-person address ("you") as a persuasive weapon. Identify purpose, audience and the effect of irony.'],
    ['walcott-omeros', 'Omeros', 'Derek Walcott', 1990, 'carib poetry', 'Homer\'s epic reimagined among St. Lucian fishermen. Read a chapter at a time.', 'Allusion and register: high epic form meets everyday Caribbean speech. Why mix them?'],
    ['walcott-collected', 'Collected Poems 1948–1984', 'Derek Walcott', 1986, 'carib poetry', 'The Nobel laureate\'s early and middle work, including "A Far Cry from Africa".', 'Imagery and divided identity: list the images that pull in two directions.'],
    ['brathwaite-arrivants', 'The Arrivants: A New World Trilogy', 'Kamau Brathwaite', 1973, 'carib poetry', 'Poems of journey, Africa and the Caribbean, built on drum rhythm and voice.', 'Read aloud. Notice sound devices and how "nation language" carries meaning that Standard English cannot.'],
    ['brathwaite-voice', 'History of the Voice', 'Kamau Brathwaite', 1984, 'lang carib', 'The essay that named "nation language" in Caribbean poetry.', 'Essential for Module 2: how the writer defines terms and builds an argument about language and identity.'],
    ['senior-summer', 'Summer Lightning and Other Stories', 'Olive Senior', 1986, 'carib', 'Jamaican childhoods told through sharp, moving short stories.', 'Child narrators and dialogue in Jamaican Creole: what does the mix of codes reveal about class and family?'],
    ['senior-garden', 'Gardening in the Tropics', 'Olive Senior', 1994, 'carib poetry', 'Poems rooted in Caribbean soil, myth and history.', 'Extended metaphor: how gardening becomes a way to talk about history and survival.'],
    ['lamming-castle', 'In the Castle of My Skin', 'George Lamming', 1953, 'carib', 'Boyhood in a Barbadian village as colonial order begins to crack.', 'Shifting narrative point of view (first person and communal "we"). Why might a writer choose that?'],
    ['danticat-krik', 'Krik? Krak!', 'Edwidge Danticat', 1995, 'carib', 'Linked stories of Haiti and its diaspora, named for the call-and-response of storytelling.', 'Oral tradition on the page: identify features of storytelling performance inside written text.'],
    ['rhys-sargasso', 'Wide Sargasso Sea', 'Jean Rhys', 1966, 'carib rainy', 'A Dominican-born writer answers Jane Eyre by telling the "madwoman\'s" story.', 'Multiple narrators and unreliable perspective: how does voice change our sympathy?'],
    ['james-boundary', 'Beyond a Boundary', 'C. L. R. James', 1963, 'carib ideas', 'Cricket, class, race and colonialism, from Trinidad to the world.', 'Expository and memoir modes combined: note how anecdote supports argument.'],
    ['james-minty', 'Minty Alley', 'C. L. R. James', 1936, 'carib', 'A young man rents a room in a Port of Spain barrack-yard and discovers a world.', 'Dialogue as characterisation: compare the speech of the narrator and the yard residents.'],
    ['naipaul-miguel', 'Miguel Street', 'V. S. Naipaul', 1959, 'carib beach', 'Comic, tender sketches of the characters on one Port of Spain street.', 'Short episodic chapters and Trinidadian dialogue: ideal for studying dialect in fiction.'],
    ['naipaul-biswas', 'A House for Mr Biswas', 'V. S. Naipaul', 1961, 'carib', 'One man\'s lifelong struggle to own a house of his own in Trinidad.', 'Irony and narrative distance: when is the narrator laughing at Mr Biswas, and when with him?'],
    ['hodge-crick', 'Crick Crack, Monkey', 'Merle Hodge', 1970, 'carib', 'Tee is pulled between her lively Creole-speaking aunt and her "proper" aunt.', 'A perfect Module 2 text on language attitudes, code-switching and social class.'],
    ['anthony-sanfernando', 'The Year in San Fernando', 'Michael Anthony', 1965, 'carib', 'A village boy spends a year working in a Trinidadian town.', 'A child\'s limited point of view: what does the reader understand that the narrator does not?'],
    ['brodber-jane', 'Jane and Louisa Will Soon Come Home', 'Erna Brodber', 1980, 'carib', 'A young Jamaican woman pieces together self and family in fragments.', 'Experimental structure and folk song: how does form mirror memory?'],
    ['bennett-labrish', 'Jamaica Labrish', 'Louise Bennett', 1966, 'carib poetry lang', 'Witty poems in Jamaican Creole by "Miss Lou", champion of the people\'s language.', 'Creole as a literary language: list features of Jamaican Creole and the humour they create.'],
    ['goodison-harvey', 'From Harvey River', 'Lorna Goodison', 2007, 'carib ideas', 'A poet\'s memoir of her mother and rural Jamaica.', 'Descriptive and narrative writing at its best: collect sensory details to model your own.'],
    ['nichols-memoried', 'i is a long memoried woman', 'Grace Nichols', 1983, 'carib poetry', 'A sequence voicing the experience of enslaved African women in the Caribbean.', 'The title itself is a code choice. Discuss why the poet uses Creole grammar here.'],
    ['agard-halfcaste', 'Half-Caste and Other Poems', 'John Agard', 2004, 'carib poetry', 'Playful, provocative poems from a Guyanese-born poet.', 'Rhetorical questions and nonstandard spelling as argument: who is the poem talking back to?'],
    ['miller-augustown', 'Augustown', 'Kei Miller', 2016, 'carib', 'A Jamaican community, a flying preacher and a child\'s haircut that sparks a reckoning.', 'Storytelling voice and folk belief: how the narrator addresses the reader directly.'],
    ['mccaulay-dogheart', 'Dog-Heart', 'Diana McCaulay', 2010, 'carib', 'A Kingston woman tries to help a boy from a very different world.', 'Two narrators, two codes: compare their language to see class and perspective.'],
    ['hillhouse-musical', 'Musical Youth', 'Joanne C. Hillhouse', 2014, 'carib beach', 'Antiguan teens, music and a summer that changes everything. Award-winning YA.', 'Dialogue in teen talk and Antiguan Creole: note how register changes with audience.'],
    ['levy-small', 'Small Island', 'Andrea Levy', 2004, 'carib', 'Jamaican and English lives collide in post-war London. (Some mature content.)', 'Four rotating narrators: perfect for studying point of view and audience.'],
    ['harris-palace', 'Palace of the Peacock', 'Wilson Harris', 1960, 'carib academia', 'A dreamlike journey up a Guyanese river.', 'Dense imagery and symbol: a challenge in reading for implied meaning.'],
    ['mckay-banana', 'Banana Bottom', 'Claude McKay', 1933, 'carib', 'A Jamaican woman returns home from England and chooses her own culture.', 'Early use of Jamaican speech in fiction: compare it with narration in Standard English.'],
    ['dcosta-escape', 'Escape to Last Man Peak', "Jean D'Costa", 1975, 'carib cottage', 'Orphans flee across Jamaica\'s mountains in a classic adventure.', 'Written by a linguist: notice how characters\' speech is shaped by age and place.'],
    ['sekou-salt', 'The Salt Reaper: Poems from the Flats', 'Lasana M. Sekou', 2004, 'sxm poetry', 'Poems from St. Martin\'s salt-pond history and its people.', 'Local history as poetry: how place-names and labour images build identity.'],
    ['sekou-spurs', 'Brotherhood of the Spurs', 'Lasana M. Sekou', 1997, 'sxm', 'Short stories set in St. Martin by the island\'s best-known writer.', 'Notice St. Martin English in dialogue and how it marks community and belonging.'],
    ['sekou-nativity', 'Nativity & Monologues for Today', 'Lasana M. Sekou', 1988, 'sxm', 'Dramatic monologues and poems in a St. Martin voice.', 'Monologue as oral performance: ideal for practising Paper 2/3 oral delivery.'],
    ['sekou-hurricane', 'Hurricane Protocol', 'Lasana M. Sekou', 2019, 'sxm poetry', 'Poems written in the long shadow of the 2017 hurricanes.', 'Compare a poem with a news report of the same storm: purpose, register, audience.'],
    ['sekou-sun', 'Where I See the Sun: Contemporary Poetry in St. Martin', 'Lasana M. Sekou (ed.)', 2013, 'sxm poetry', 'An anthology of many St. Martin poets in one place.', 'Range of voices: find one poem in each register from formal to intimate.'],
    ['arrindell-lang', 'Language, Culture, and Identity in St. Martin', 'Rhoda Arrindell', 2014, 'sxm lang', 'A St. Martin scholar on the island\'s English, its status and its future.', 'Directly relevant to Module 2: language attitudes and identity in a Caribbean territory.'],
    ['lalla-exile', 'Language in Exile: Three Hundred Years of Jamaican Creole', "Barbara Lalla & Jean D'Costa", 1990, 'lang', 'A history of Jamaican Creole drawn from old texts and records.', 'Evidence-based writing: how scholars use primary sources to trace language change.'],
    ['devonish-liberation', 'Language and Liberation: Creole Language Politics in the Caribbean', 'Hubert Devonish', 1986, 'lang', 'A classic argument for the place of Creole in Caribbean public life.', 'A clear thesis with supporting evidence: map the argument structure.'],
    ['cassidy-talk', 'Jamaica Talk: Three Hundred Years of the English Language in Jamaica', 'Frederic G. Cassidy', 1961, 'lang', 'Where Jamaican words come from, explained with stories.', 'Etymology: borrowings from African, Spanish, Taino and English sources.'],
    ['allsopp-dict', 'Dictionary of Caribbean English Usage', 'Richard Allsopp (ed.)', 1996, 'lang', 'The landmark dictionary of English as used across the region.', 'Look up five words you use daily. Note labels for register and territory.'],
    ['winer-dict', 'Dictionary of the English/Creole of Trinidad & Tobago', 'Lise Winer', 2009, 'lang', 'A huge, fascinating record of Trinbagonian words and sayings.', 'Notice how entries show pronunciation, origin and example usage.'],
    ['roberts-west', 'West Indians and Their Language', 'Peter A. Roberts', 1988, 'lang', 'An accessible introduction to Caribbean language situations.', 'Key terms for Module 2: creole continuum, code-switching, language attitudes.'],
    ['pollard-dread', 'Dread Talk: The Language of Rastafari', 'Velma Pollard', 1994, 'lang', 'How Rastafari reshaped words to reflect a worldview.', 'Word formation and ideology: "I-words" and why sound and meaning matter.'],
    ['christie-lang', 'Language in Jamaica', 'Pauline Christie', 2003, 'lang', 'A short, readable overview of Jamaica\'s language situation.', 'Use it to define bilingualism vs bidialectalism in your own words.'],
    ['ngugi-decol', 'Decolonising the Mind', "Ngũgĩ wa Thiong'o", 1986, 'lang ideas', 'A Kenyan writer explains why he stopped writing novels in English.', 'Compare with Brathwaite: language as power, identity and choice.'],
    ['crystal-global', 'English as a Global Language', 'David Crystal', 1997, 'lang ideas', 'How English spread worldwide and what that means for its speakers.', 'Useful context for Caribbean Englishes and attitudes to "standard" English.'],
    ['strunk-style', 'The Elements of Style', 'William Strunk Jr. & E. B. White', 1959, 'write', 'The tiny classic on clear, concise writing.', 'Test its rules ("omit needless words") on your last essay.'],
    ['zinsser-well', 'On Writing Well', 'William Zinsser', 1976, 'write', 'The guide to clear non-fiction writing.', 'Clutter, unity and voice: apply to your Paper 2 expository essays.'],
    ['king-writing', 'On Writing: A Memoir of the Craft', 'Stephen King', 2000, 'write', 'Half memoir, half toolbox from a master storyteller. (Some strong language.)', 'Notice how his conversational register builds trust with the reader.'],
    ['lamott-bird', 'Bird by Bird', 'Anne Lamott', 1994, 'write', 'Funny, honest advice on writing a little at a time.', 'Anecdote as a teaching device: how stories make advice memorable.'],
    ['heinrichs-arguing', 'Thank You for Arguing', 'Jay Heinrichs', 2007, 'write ideas', 'Rhetoric made fun: ethos, pathos, logos in everyday life.', 'Spot persuasive appeals in ads and speeches, then use them in your own.'],
    ['leith-talkin', "You Talkin' to Me? Rhetoric from Aristotle to Obama", 'Sam Leith', 2011, 'write', 'A lively history of persuasion and famous speeches.', 'Classical structure of a speech: perfect for oral presentations.'],
    ['graff-theysay', 'They Say / I Say', 'Gerald Graff & Cathy Birkenstein', 2006, 'write', 'Templates for entering an academic argument.', 'Practise summarising another view before giving yours.'],
    ['pinker-style', 'The Sense of Style', 'Steven Pinker', 2014, 'write', 'A linguist explains why some writing is clear and some is not.', 'The "curse of knowledge": rewrite a paragraph for a younger audience.'],
    ['truss-eats', 'Eats, Shoots & Leaves', 'Lynne Truss', 2003, 'write', 'A funny defence of punctuation.', 'Punctuation changes meaning: collect three ambiguous signs.'],
    ['heath-stick', 'Made to Stick', 'Chip Heath & Dan Heath', 2007, 'write ideas', 'Why some ideas survive and others die.', 'Simple, unexpected, concrete, credible, emotional, stories: test a PSA against it.'],
    ['orwell-politics', 'Politics and the English Language (essay)', 'George Orwell', 1946, 'write', 'The famous short essay against vague, dishonest language.', 'Find examples of euphemism and jargon in a news story.'],
    ['anderson-ted', 'TED Talks: The Official TED Guide to Public Speaking', 'Chris Anderson', 2016, 'write', 'How great talks are built, from the head of TED.', 'Plan your oral presentation with a single "throughline".'],
    ['dreyer-english', "Dreyer's English", 'Benjamin Dreyer', 2019, 'write', 'A copy editor\'s witty guide to clarity and style.', 'Notice the conversational asides that make a rule book entertaining.'],
    ['morgenstern-circus', 'The Night Circus', 'Erin Morgenstern', 2011, 'rainy', 'A magical black-and-white circus that opens only at night.', 'Lush description and present tense: how setting creates mood.'],
    ['ness-monster', 'A Monster Calls', 'Patrick Ness', 2011, 'rainy', 'A boy, a monster and the truth he cannot say. Bring tissues.', 'Stories within a story: what is each tale\'s purpose?'],
    ['dumaurier-rebecca', 'Rebecca', 'Daphne du Maurier', 1938, 'rainy academia', 'A new bride lives in the shadow of her husband\'s first wife.', 'Unnamed narrator and foreshadowing: track how suspense is built.'],
    ['bronte-eyre', 'Jane Eyre', 'Charlotte Brontë', 1847, 'rainy', 'An orphan governess insists on her own worth. Read it before Wide Sargasso Sea.', 'Direct address ("Reader, ...") and its effect on intimacy.'],
    ['zusak-thief', 'The Book Thief', 'Markus Zusak', 2005, 'rainy', 'Death narrates the story of a girl who steals books in Nazi Germany.', 'An unusual narrator: how does point of view change tone?'],
    ['austen-pride', 'Pride and Prejudice', 'Jane Austen', 1813, 'beach', 'Wit, misjudgement and romance. The original enemies-to-lovers.', 'Irony from the very first sentence. Unpack it.'],
    ['hemingway-oldman', 'The Old Man and the Sea', 'Ernest Hemingway', 1952, 'beach', 'An old Cuban fisherman\'s epic struggle with a marlin.', 'Short, plain sentences: how simplicity creates power.'],
    ['hurston-eyes', 'Their Eyes Were Watching God', 'Zora Neale Hurston', 1937, 'beach', 'Janie\'s search for love and self in Florida, told in vivid voice.', 'Standard narration and African American dialogue side by side: compare with Caribbean writers.'],
    ['dumas-cristo', 'The Count of Monte Cristo', 'Alexandre Dumas', 1844, 'beach', 'Betrayal, prison, escape and the ultimate revenge plan.', 'Serialised fiction: notice cliffhangers that kept readers buying.'],
    ['tartt-secret', 'The Secret History', 'Donna Tartt', 1992, 'academia', 'Elite classics students and a crime that unravels them. (Mature themes: for older readers.)', 'The prologue reveals the ending. Why give it away?'],
    ['shelley-frank', 'Frankenstein', 'Mary Shelley', 1818, 'academia', 'The creature, the creator and who the real monster is.', 'Frame narrative: letters, confession and testimony.'],
    ['wilde-dorian', 'The Picture of Dorian Gray', 'Oscar Wilde', 1890, 'academia', 'Beauty, influence and a portrait that ages instead of its owner.', 'Epigrams: collect Wilde\'s witty one-liners and their persuasive effect.'],
    ['ishiguro-never', 'Never Let Me Go', 'Kazuo Ishiguro', 2005, 'academia rainy', 'Friends at a strange English boarding school slowly learn the truth.', 'Withheld information: what the narrator does not say.'],
    ['kleinbaum-poets', 'Dead Poets Society', 'N. H. Kleinbaum', 1989, 'academia', 'The novel of the film: a teacher who urges students to seize the day.', 'Speeches in the classroom: analyse Keating\'s persuasive techniques.'],
    ['rio-villains', 'If We Were Villains', 'M. L. Rio', 2017, 'academia', 'Acting students, Shakespeare and a death. (Mature themes.)', 'Dialogue in Shakespearean quotation: language as mask.'],
    ['montgomery-anne', 'Anne of Green Gables', 'L. M. Montgomery', 1908, 'cottage', 'A talkative orphan transforms a quiet farm.', 'Anne\'s elaborate vocabulary vs Marilla\'s plain speech: register as character.'],
    ['burnett-garden', 'The Secret Garden', 'Frances Hodgson Burnett', 1911, 'cottage', 'A locked garden and two lonely children who bring it back to life.', 'Yorkshire dialect in dialogue: compare attitudes to dialect then and now.'],
    ['baldree-legends', 'Legends & Lattes', 'Travis Baldree', 2022, 'cottage cozy', 'An orc warrior retires to open a coffee shop. Pure comfort.', 'Low-stakes plot: how does a writer keep us reading without danger?'],
    ['chambers-psalm', 'A Psalm for the Wild-Built', 'Becky Chambers', 2021, 'cottage ideas', 'A tea monk meets a robot and they talk about what people need.', 'Philosophical dialogue: identify each character\'s argument.'],
    ['durrell-family', 'My Family and Other Animals', 'Gerald Durrell', 1956, 'cottage beach', 'A naturalist\'s hilarious memoir of a childhood on Corfu.', 'Comic exaggeration in memoir: where does truth end and humour begin?'],
    ['alcott-women', 'Little Women', 'Louisa May Alcott', 1868, 'cottage', 'Four sisters growing up in hard times.', 'Letters within the novel: written register vs spoken.'],
    ['osman-thursday', 'The Thursday Murder Club', 'Richard Osman', 2020, 'cozy', 'Four retirees investigate real murders.', 'Diary entries and multiple viewpoints: how humour lightens crime.'],
    ['jackson-goodgirl', "A Good Girl's Guide to Murder", 'Holly Jackson', 2019, 'cozy', 'A student reopens a closed case for her school project.', 'Interview transcripts and research logs: a model of gathering information (Module 1!).'],
    ['christie-ackroyd', 'The Murder of Roger Ackroyd', 'Agatha Christie', 1926, 'cozy', 'The mystery with one of the most famous twists ever.', 'Reliable or unreliable narrator? Reread the first chapter after you finish.'],
    ['doyle-hound', 'The Hound of the Baskervilles', 'Arthur Conan Doyle', 1902, 'cozy rainy', 'Sherlock Holmes, the moors and a legendary beast.', 'Deductive reasoning: how Holmes moves from evidence to conclusion.'],
    ['mccall-ladies', "The No. 1 Ladies' Detective Agency", 'Alexander McCall Smith', 1998, 'cozy beach', 'Mma Ramotswe opens Botswana\'s first female-run detective agency.', 'Gentle, proverb-rich narration: how voice reflects culture.'],
    ['stevens-unladylike', 'Murder Most Unladylike', 'Robin Stevens', 2014, 'cozy academia', 'Two schoolgirl detectives at a 1930s boarding school.', 'Casebook entries: notice how lists and notes organise information.'],
    ['oliver-devotions', 'Devotions', 'Mary Oliver', 2017, 'poetry cottage', 'Selected poems on nature, attention and wonder.', 'Short lines and direct questions to the reader: how intimacy is built.'],
    ['acevedo-poetx', 'The Poet X', 'Elizabeth Acevedo', 2018, 'poetry', 'A Dominican American teen finds her voice through slam poetry. Verse novel.', 'Spoken-word techniques on the page: repetition, line breaks, rhythm.'],
    ['woodson-brown', 'Brown Girl Dreaming', 'Jacqueline Woodson', 2014, 'poetry', 'A memoir in verse about growing up and becoming a writer.', 'Memoir in poems: why choose verse over prose?'],
    ['gorman-hill', 'The Hill We Climb', 'Amanda Gorman', 2021, 'poetry ideas', 'The inaugural poem that became a phenomenon.', 'Speech meets poetry: anaphora, alliteration and audience.'],
    ['harari-sapiens', 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 2014, 'ideas', 'How humans came to rule the planet, in sweeping chapters.', 'Bold claims: which are supported with evidence and which are speculation?'],
    ['kahneman-thinking', 'Thinking, Fast and Slow', 'Daniel Kahneman', 2011, 'ideas', 'Two systems of thinking and the biases that fool us.', 'Bias and persuasion: link to evaluating sources in Module 1.'],
    ['cain-quiet', 'Quiet', 'Susan Cain', 2012, 'ideas', 'The power of introverts in a world that won\'t stop talking.', 'Expository writing that mixes research with personal story.'],
    ['rosling-fact', 'Factfulness', 'Hans Rosling', 2018, 'ideas', 'Why the world is better than we think, and how to read data.', 'Statistics as evidence: practise judging reliability of claims.'],
    ['noah-crime', 'Born a Crime', 'Trevor Noah', 2016, 'ideas beach', 'A comedian\'s memoir of growing up in apartheid South Africa.', 'Multilingualism as survival: he switches languages to fit in. Sound familiar?'],
    ['westover-educated', 'Educated', 'Tara Westover', 2018, 'ideas', 'A woman raised without school earns a PhD. (Some distressing scenes.)', 'Memory and reliability: how she flags uncertainty in her own story.'],
    ['dweck-mindset', 'Mindset', 'Carol S. Dweck', 2006, 'ideas', 'Fixed vs growth mindset and why it matters for learning.', 'Popular science style: research translated for a general audience.']
  ].map(r => ({ id: r[0], t: r[1], a: r[2], y: r[3], c: r[4].split(' '), why: r[5], angle: r[6] }));
  const BY = {}; B.forEach(b => { BY[b.id] = b; });

  /* ---------------- bingo ---------------- */
  const TASKS = ['A Caribbean novel', 'A book by a writer from your island', 'A poetry collection', 'Identify the purpose of a newspaper editorial', 'Listen to 20 min of local talk radio and note register shifts', 'Watch a TED-Ed lesson and summarise it in 3 sentences', 'A story with a Creole-speaking narrator', 'A non-fiction book about language', 'A book published before 1970', 'A book by a Caribbean woman writer', 'Read a short story aloud to someone', 'A pick from an aesthetic shelf', 'Read a famous speech transcript', 'Write a 100-word review', 'Learn 5 new words and use them', 'Read somewhere new (beach, gallery, bus)', 'A mystery', 'A memoir', 'A verse novel or graphic novel', 'A book a friend recommends', 'A book set in a territory you have never visited', 'Compare two news reports of one event', 'Read 20 minutes 5 days in a row', 'A book under 150 pages', 'A book over 300 pages', 'Find 3 rhetorical devices in an advert', 'Read chapter 1, predict the ending', 'A translated book', 'Listen to a podcast episode and note its audience', 'Read the CXC news page', 'Read a tribute or obituary and name its tone', 'A book about the sea', 'A classic', 'Reread a childhood favourite and note its audience', 'Read a local poem and find its imagery', 'Read an opinion column you disagree with'];
  const LINES = []; for (let i = 0; i < 5; i++) { LINES.push([0, 1, 2, 3, 4].map(j => i * 5 + j)); LINES.push([0, 1, 2, 3, 4].map(j => j * 5 + i)); }
  LINES.push([0, 6, 12, 18, 24], [4, 8, 12, 16, 20]);
  const monthKey = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); };
  const monthName = k => { const [y, m] = k.split('-'); return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][+m - 1] + ' ' + y; };
  function card(api, k) {
    let seed = 0; for (const ch of 'bingo' + k) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = api.seeded ? api.seeded(seed) : Math.random; const pool = TASKS.slice();
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    const c = pool.slice(0, 24); c.splice(12, 0, 'FREE: read anything you love'); return c;
  }

  /* ---------------- state ---------------- */
  let pending = null, refErr = '';
  function R(api) {
    const S = api.S; if (!S.read || typeof S.read !== 'object') S.read = {};
    const r = S.read; ['w', 'r', 'f', 'p', 'bc', 'bl'].forEach(k => { if (!Array.isArray(r[k])) r[k] = []; });
    const k = monthKey(); if (r.bm !== k) { r.bm = k; r.bc = [12]; r.bl = []; }
    if (!r.bc.includes(12)) r.bc.push(12);
    return r;
  }
  const where = (r, id) => r.f.includes(id) ? 'f' : r.r.includes(id) ? 'r' : r.w.includes(id) ? 'w' : '';
  function setShelf(r, id, s) { ['w', 'r', 'f'].forEach(k => { r[k] = r[k].filter(x => x !== id); }); if (s) r[s].push(id); }
  const terrs = () => (window.COURSE_TERRITORIES || []).filter(t => t && t.id);
  const host = u => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
  function linkHTML(api, l) { const e = api.esc; return `<a class="rd-link" href="${e(l[1])}" target="_blank" rel="noopener noreferrer"><b>${e(l[0])}</b><span>${e(l[2] || '')}</span><span class="rd-go">${e(host(l[1]))} ↗</span></a>`; }
  const TABS = [['local', '📻 Read & listen local'], ['books', '📚 Suggested reading'], ['shelf', '🗂️ My shelf'], ['bingo', '🎯 Reading challenge']];

  function localHTML(api, loc) {
    const e = api.esc, T = terrs(); const prof = (api.S.profile || {}).territory;
    let id = loc.k || prof || 'sx'; if (!T.find(t => t.id === id) && id !== 'other') id = T[0] ? T[0].id : 'sx';
    const t = T.find(x => x.id === id) || { id, name: 'Your territory' }; const M = MEDIA[id];
    let h = `<div class="card"><div class="rd-pick"><div class="field"><label for="rd-terr">Choose a territory</label><select id="rd-terr" class="select">${T.map(x => `<option value="${e(x.id)}" ${x.id === id ? 'selected' : ''}>${e(x.name)}${x.id === prof ? ' (mine)' : ''}</option>`).join('')}</select></div></div>
      <p class="hint">Links open in a new tab. These are official homepages; nothing loads until you tap. ${prof ? '' : 'Tip: set your territory on your player card and this page will open there.'}</p></div>`;
    if (M) {
      h += `<div class="card rd-sec"><h3>📰 News in ${e(t.name)}</h3><div class="rd-links">${M.news.map(l => linkHTML(api, l)).join('')}</div></div>`;
      if (M.radio) h += `<div class="card rd-sec"><h3>📻 Radio</h3><p class="hint">Stations you can stream live (open the directory and search for the station name):</p><div class="rd-stations">${M.radio.st.map(s => `<span class="rd-st">${e(s)}</span>`).join('')}</div><div class="rd-links">${linkHTML(api, ['Listen live: ' + t.name + ' radio directory', M.radio.dir, 'Live streams of local stations'])}</div></div>`;
      if (M.yt.length) h += `<div class="card rd-sec"><h3>▶️ YouTube</h3><div class="rd-links">${M.yt.map(l => linkHTML(api, l)).join('')}</div></div>`;
    } else {
      h += `<div class="card"><p>We do not have local links for this choice yet. Try the regional and learning links below, or tell your teacher which outlets you use.</p></div>`;
    }
    h += `<div class="card rd-sec"><h3>🌎 Regional</h3><div class="rd-links">${REGIONAL.concat(REGIONAL_YT).map(l => linkHTML(api, l)).join('')}</div></div>
      <div class="card rd-sec"><h3>🎓 Learning channels for CAPE</h3><div class="rd-links">${LEARN.map(l => linkHTML(api, l)).join('')}</div></div>
      <div class="card"><span class="kicker">Media detective · Comm Studies</span><ul>
        <li>Pick one story and read it in two outlets. List three differences in word choice. What does each choice reveal about purpose and audience?</li>
        <li>Listen to a call-in programme for 10 minutes. Note every switch between Creole and Standard English. When and why does it happen?</li>
        <li>Compare a headline with the first paragraph. Is the headline informative, persuasive or sensational?</li></ul>${api.listenBtn ? `<div class="row">${api.listenBtn('Listen')}</div>` : ''}</div>`;
    return h;
  }

  function shelfBtns(api, r, b) {
    const s = where(r, b.id), e = api.esc;
    const btn = (k, lab) => `<button type="button" class="chip ${s === k ? 'sel' : ''}" aria-pressed="${s === k}" data-px="shelf" data-pv="reading" data-id="${e(b.id)}" data-s="${k}">${lab}</button>`;
    return `<div class="rd-sbtns">${btn('w', '🔖 Want')}${btn('r', '📖 Reading')}${btn('f', '✅ Finished')}${s ? `<button type="button" class="chip" data-px="shelf" data-pv="reading" data-id="${e(b.id)}" data-s="">✕</button>` : ''}</div>`;
  }
  function bookHTML(api, r, b) {
    const e = api.esc; const cl = CATS.filter(c => b.c.includes(c[0])).map(c => c[1]).join(' · ');
    return `<article class="rd-book" data-q="${e((b.t + ' ' + b.a + ' ' + b.y).toLowerCase())}"><span class="ribbon">${e(cl)}</span><h4>${e(b.t)}</h4><span class="rd-by">${e(b.a)} · ${b.y}</span><p>${e(b.why)}</p><p class="rd-angle"><b>Comm Studies angle:</b> ${e(b.angle)}</p>${shelfBtns(api, r, b)}</article>`;
  }
  function reflectHTML(api) {
    if (!pending || !BY[pending]) return ''; const b = BY[pending], e = api.esc;
    return `<div class="card rd-ref" id="rd-ref"><span class="kicker">Finished a book?</span><h3>${e(b.t)}</h3><p class="hint">Honour system: write a 3-sentence reflection to shelve it as finished and earn coins. Say what it was about, one technique you noticed (purpose, devices, register), and whether you would recommend it.</p>
      <label for="rd-reftext" class="hint">Your reflection</label><textarea id="rd-reftext" placeholder="This book is about... I noticed that the writer... I would recommend it because..."></textarea>
      ${refErr ? `<div class="fb bad" role="alert">${e(refErr)}</div>` : ''}<div class="row"><button type="button" class="btn gold" data-px="finish" data-pv="reading">Shelve as finished (+5 coins)</button><button type="button" class="btn ghost" data-px="cancel" data-pv="reading">Cancel</button></div></div>`;
  }
  function booksHTML(api, loc) {
    const r = R(api), e = api.esc; const k = CATS.find(c => c[0] === loc.k) ? loc.k : 'carib';
    const list = B.filter(b => b.c.includes(k));
    let h = reflectHTML(api);
    h += `<div class="card"><div class="chips" role="tablist" aria-label="Book lists">${CATS.slice(0, 4).map(c => `<button type="button" class="chip ${c[0] === k ? 'sel' : ''}" role="tab" aria-selected="${c[0] === k}" data-go="reading" data-tab="books" data-k="${c[0]}">${c[1]}</button>`).join('')}</div>
      <span class="kicker">Aesthetic reads: pick a mood</span><div class="chips" role="tablist" aria-label="Aesthetic shelves">${CATS.filter(c => AESTHETIC.includes(c[0])).map(c => `<button type="button" class="chip ${c[0] === k ? 'sel' : ''}" role="tab" aria-selected="${c[0] === k}" data-go="reading" data-tab="books" data-k="${c[0]}">${c[1]}</button>`).join('')}</div>
      <input class="search" id="rd-q" type="search" placeholder="Filter this list by title, author or year" aria-label="Filter books"></div>`;
    h += `<div class="card"><h3>${e(CATS.find(c => c[0] === k)[1])} <span class="hint">(${list.length})</span></h3><div class="rd-books">${list.map(b => bookHTML(api, r, b)).join('')}</div><p class="hint" id="rd-none" hidden>No books match that filter.</p></div>`;
    return h;
  }
  function shelfHTML(api) {
    const r = R(api), e = api.esc;
    const col = (k, title, cls) => { const ids = r[k].filter(id => BY[id]); return `<div class="rd-col"><h4><span>${title}</span><span class="ribbon">${ids.length}</span></h4>${ids.length ? ids.map(id => { const b = BY[id]; return `<div class="rd-item"><b>${e(b.t)}</b><span class="hint">${e(b.a)}</span><div class="row">${k !== 'r' ? `<button type="button" class="btn ghost" data-px="shelf" data-pv="reading" data-id="${e(id)}" data-s="r">📖 Reading</button>` : ''}${k !== 'f' ? `<button type="button" class="btn ghost" data-px="shelf" data-pv="reading" data-id="${e(id)}" data-s="f">✅ Finished</button>` : ''}<button type="button" class="btn ghost" data-px="shelf" data-pv="reading" data-id="${e(id)}" data-s="" aria-label="Remove ${e(b.t)}">✕</button></div></div>`; }).join('') : `<p class="hint">Nothing here yet.</p>`}<div aria-hidden="true">${ids.slice(0, 18).map(() => `<span class="rd-spine ${cls}"></span>`).join('')}</div></div>`; };
    const goal = 12, done = r.f.filter(id => BY[id]).length;
    return reflectHTML(api) + `<div class="card"><h3>My shelf</h3><p class="hint">Add books from <button type="button" class="chip" data-go="reading" data-tab="books">📚 Suggested reading</button>. Finishing a book needs a short reflection (honour system) and earns 5 coins once per book.</p>
      <div><b>${done}</b> of ${goal} books finished (reading goal: ${goal})</div><div class="pbar" role="progressbar" aria-valuemin="0" aria-valuemax="${goal}" aria-valuenow="${Math.min(done, goal)}"><i style="width:${Math.min(100, done / goal * 100)}%"></i></div>
      <div class="rd-shelf">${col('w', '🔖 Want to read', 'w')}${col('r', '📖 Reading', 'r')}${col('f', '✅ Finished', '')}</div></div>`;
  }
  function bingoHTML(api) {
    const r = R(api), c = card(api, r.bm), e = api.esc; const onLine = new Set(); r.bl.forEach(i => LINES[i] && LINES[i].forEach(x => onLine.add(x)));
    return `<div class="card"><span class="kicker">${e(monthName(r.bm))}</span><h3>Reading bingo</h3><p class="hint">Tap a square when you complete it (honour system). Every full row, column or diagonal earns 5 coins. A new card arrives each month.</p>
      <div class="rd-bingo" role="group" aria-label="Bingo card">${c.map((t, i) => `<button type="button" class="rd-cell ${i === 12 ? 'free' : ''} ${r.bc.includes(i) ? 'on' : ''} ${onLine.has(i) ? 'line' : ''}" aria-pressed="${r.bc.includes(i)}" data-px="bingo" data-pv="reading" data-i="${i}" ${i === 12 ? 'disabled' : ''}>${e(t)}</button>`).join('')}</div>
      <div class="rd-legend"><span>Squares: <b>${r.bc.length}</b>/25</span><span>Lines: <b>${r.bl.length}</b>/12</span></div></div>`;
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'reading',
    title: 'Reading Room',
    tile: { icon: '📚', meta: 'Local news, radio and YouTube for your island, curated reads, a shelf tracker and monthly reading bingo' },
    render(api, loc) {
      R(api); const tab = TABS.find(t => t[0] === loc.tab) ? loc.tab : 'local';
      let h = `<section class="hero"><span class="eyebrow">Reading Room</span><h1>Read widely. Listen locally.</h1><p>Strong communicators read everything: novels, newspapers, poems, speeches. Explore your island's media, pick a book for your mood and track your reading.</p></section>
        <div class="chips rd-tabs" role="tablist" aria-label="Reading Room sections">${TABS.map(t => `<button type="button" class="chip ${t[0] === tab ? 'sel' : ''}" role="tab" aria-selected="${t[0] === tab}" data-go="reading" data-tab="${t[0]}">${t[1]}</button>`).join('')}</div>`;
      if (tab === 'local') h += localHTML(api, loc);
      else if (tab === 'books') h += booksHTML(api, loc);
      else if (tab === 'shelf') h += shelfHTML(api);
      else h += bingoHTML(api);
      return h;
    },
    mount(api, loc, el) {
      const root = el || document;
      const sel = root.querySelector('#rd-terr');
      if (sel) sel.addEventListener('change', () => api.go({ v: 'reading', tab: 'local', k: sel.value }));
      const q = root.querySelector('#rd-q');
      if (q) q.addEventListener('input', () => {
        const v = q.value.trim().toLowerCase(); let n = 0;
        root.querySelectorAll('.rd-book').forEach(a => { const ok = !v || (a.dataset.q || '').includes(v) || a.textContent.toLowerCase().includes(v); a.hidden = !ok; if (ok) n++; });
        const none = root.querySelector('#rd-none'); if (none) none.hidden = n > 0;
      });
      const ref = root.querySelector('#rd-ref');
      if (ref && pending) { try { ref.scrollIntoView({ block: 'center' }); } catch (e) { } const ta = root.querySelector('#rd-reftext'); if (ta) { try { ta.focus({ preventScroll: true }); } catch (e) { } } }
    },
    click(action, el, api) {
      const r = R(api);
      if (action === 'shelf') {
        const id = el.dataset.id, s = el.dataset.s || ''; if (!BY[id]) return;
        if (s === 'f' && !r.p.includes(id)) { pending = id; refErr = ''; api.render(); return; }
        setShelf(r, id, s); api.save();
        api.toast(s ? `${BY[id].t}: ${s === 'w' ? 'want to read' : s === 'r' ? 'reading' : 'finished'}` : 'Removed from shelf');
        api.render();
      } else if (action === 'finish') {
        const ta = document.getElementById('rd-reftext'); const txt = (ta ? ta.value : '').trim();
        const sentences = txt.split(/[.!?]+(?:\s+|$)/).map(x => x.trim()).filter(x => x.split(/\s+/).filter(Boolean).length >= 3);
        const words = txt.split(/\s+/).filter(Boolean).length;
        if (sentences.length < 3 || words < 20) { refErr = `Write at least 3 full sentences (you have ${sentences.length}, ${words} words; aim for 20+ words).`; if (api.chime) api.chime('bad'); api.render(); const t2 = document.getElementById('rd-reftext'); if (t2) t2.value = txt; return; }
        const id = pending; pending = null; refErr = '';
        if (BY[id]) { setShelf(r, id, 'f'); if (!r.p.includes(id)) { r.p.push(id); api.save(); api.reward(5, 'Finished: ' + BY[id].t); } else api.save(); }
        api.render();
      } else if (action === 'cancel') {
        pending = null; refErr = ''; api.render();
      } else if (action === 'bingo') {
        const i = +el.dataset.i; if (!(i >= 0 && i < 25) || i === 12) return;
        if (r.bc.includes(i)) r.bc = r.bc.filter(x => x !== i); else r.bc.push(i);
        let gained = 0;
        LINES.forEach((L, li) => { if (!r.bl.includes(li) && L.every(x => r.bc.includes(x))) { r.bl.push(li); gained++; } });
        api.save();
        if (gained) api.reward(5 * gained, gained > 1 ? gained + ' bingo lines!' : 'Bingo line!');
        api.render();
      }
    }
  });
})();
