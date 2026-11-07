/* Mini Arcade: game-show style review games for every subject area (original formats/names). One self-contained plugin; no network. */
(function () {
  "use strict";
  /* ===================== CONTENT BANK =====================
     Question lines: difficulty | question | CORRECT answer | wrong | wrong | wrong | why
     (the correct answer is written first here; options are shuffled into a fixed, seeded order at load time
      and the answer index is stored on each item). Difficulty: 1 easy, 2 medium, 3 hard. */
  const SUBJECTS = [
    { id: 'comm', name: 'Communication Studies', short: 'Comm Studies', icon: '🗣️' },
    { id: 'eng', name: 'English & Literature', short: 'English & Lit', icon: '📖' },
    { id: 'carib', name: 'Caribbean Studies & History', short: 'Caribbean History', icon: '🏛️' },
    { id: 'geo', name: 'Geography & Environmental Science', short: 'Geography & Env', icon: '🌍' },
    { id: 'bio', name: 'Biology', short: 'Biology', icon: '🧬' },
    { id: 'chem', name: 'Chemistry', short: 'Chemistry', icon: '⚗️' },
    { id: 'phys', name: 'Physics', short: 'Physics', icon: '🧲' },
    { id: 'math', name: 'Mathematics', short: 'Maths', icon: '➗' },
    { id: 'bus', name: 'Business (Accounts, Economics, MoB, Entrepreneurship)', short: 'Business', icon: '💼' },
    { id: 'logi', name: 'Logistics & Supply Chain', short: 'Logistics', icon: '🚚' },
    { id: 'it', name: 'Information Technology & Computer Science', short: 'IT & Computing', icon: '💻' },
    { id: 'dm', name: 'Digital Media, Animation & Game Design', short: 'Digital Media', icon: '🎬' },
    { id: 'arts', name: 'Performing Arts', short: 'Performing Arts', icon: '🎭' },
    { id: 'lang', name: 'Spanish & French Basics', short: 'Spanish & French', icon: '🌐' },
    { id: 'sxm', name: 'Caribbean Islands & Territories', short: 'Caribbean Islands', icon: '🏝️' },
    { id: 'gk', name: 'General Knowledge', short: 'General Knowledge', icon: '💡' }
  ];

  const QRAW = {
comm: `
1|What is the term for the person or group who receives a message in the communication process?|Receiver|Encoder|Channel|Sender|The receiver decodes the message that the sender encoded.
1|Which of these is an example of non-verbal communication?|A shrug of the shoulders|A text message|A radio news report|A written memo|Gestures, facial expressions and posture are non-verbal; the others all use words.
1|In the communication process, "feedback" is|The receiver's response to the message|Background noise in the room|The medium used to send the message|The sender's first idea|Feedback shows the sender how the message was received and understood.
1|Which register would you normally use when writing a CAPE essay?|Formal|Intimate|Casual|Frozen|Academic writing calls for a formal register.
1|A contact language with NO native speakers, which develops so that speakers of different languages can communicate, is a|Pidgin|Creole|Dialect|Standard language|When a pidgin gains native speakers (children grow up speaking it), it becomes a creole.
1|Which of these is a PRIMARY source?|An interview you conduct yourself|An encyclopedia entry|A textbook summary|A review of a film|Primary sources are first-hand data or original material; the others interpret someone else's material.
1|Anything that interferes with a message being received as intended is called|Noise|Encoding|Context|Feedback|Noise can be physical, psychological, semantic or physiological.
1|Turning an idea into words, signs or symbols is called|Encoding|Decoding|Feedback|Channelling|The sender encodes; the receiver decodes.
1|The main purpose of a persuasive text is to|Convince the audience to think or act in a certain way|Describe a place in detail|Retell a sequence of events|Give step-by-step instructions|Persuasive writing aims to change beliefs or behaviour.
2|Which of these is a typical feature of Caribbean English-lexicon Creoles?|Preverbal markers such as "did" or "go" to show tense and aspect|Adding "-ed" to every past-tense verb|Heavy use of the passive voice|No words from African languages|Creoles often mark tense and aspect with particles placed before the verb, e.g. "she did go".
2|Jargon is best described as|Specialised vocabulary used by a particular group or profession|Rude or offensive language|Words borrowed from French|Slang used only by teenagers|Jargon is the technical language of a field, e.g. medical or legal terms.
2|A writer's "tone" refers to|The writer's attitude toward the subject or audience|The main idea of the passage|The number of paragraphs|The language the text is written in|Tone conveys attitude, e.g. sarcastic, sympathetic or critical.
2|Moving between Creole and Standard English depending on the situation is called|Code switching|Code mixing|Diglossia|Language interference|Code switching is a change of language variety to suit the context, audience or purpose.
2|Which check is MOST useful when judging the reliability of a website?|Who the author is and what expertise they have|How colourful the website is|How many adverts it shows|Whether the web address is long|Authority (the author's credentials) is a key test of credibility, along with currency, accuracy and bias.
2|A community that uses two language varieties for different functions, one "high" and one "low", shows|Diglossia|Bilingual interference|Decreolisation|A lingua franca|In diglossia the high variety is used in formal domains and the low variety in everyday talk.
2|Which of these is a rhetorical question?|"Who among us does not want a safer island?"|"What time does the bus leave?"|"Can you pass the salt?"|"Did you finish the report?"|A rhetorical question is asked for effect, not to get an answer.
2|Language "acquisition" (as opposed to "learning") usually refers to|Picking up a language naturally, as young children do|Studying grammar rules in a classroom|Translating texts word for word|Memorising vocabulary lists|Acquisition is largely subconscious; learning is conscious and formal.
2|"Audience analysis" means|Considering who will receive your message and what they need|Counting how many people attend a speech|Checking the spelling in a draft|Choosing a font for a poster|Good communicators adapt content, register and medium to the audience.
3|When a creole gradually moves closer to the standard language over time, this is called|Decreolisation|Pidginisation|Relexification|Creolisation|Decreolisation is the gradual movement of a creole toward its lexifier (source) language.
3|The range of varieties from the deepest Creole to the Standard used in one society is the|Creole continuum|Register scale|Lexical field|Diglossic divide|The continuum runs from the basilect through the mesolect to the acrolect.
3|On the Creole continuum, the variety closest to the Standard language is the|Acrolect|Basilect|Mesolect|Pidgin|Acrolect is closest to the standard; basilect is furthest from it.
3|Which fallacy attacks the person making an argument instead of the argument itself?|Ad hominem|Straw man|Bandwagon|False dilemma|"Ad hominem" is Latin for "to the person".
3|"Either we ban phones in schools or every student will fail." This is an example of a|False dilemma|Hasty generalisation|Appeal to tradition|Red herring|It presents only two options when other options exist.
3|In an expository essay, the purpose of the thesis statement is to|State the main point the essay will explain|Give a dictionary definition|List every source used|Summarise the conclusion only|The thesis tells the reader exactly what the essay will explain or argue.
3|Which statement BEST explains "language as a marker of identity"?|The way we speak signals our community, culture and sense of belonging|Language is only used to exchange facts|Only standard languages can express identity|Identity shows in writing but never in speech|Accent, dialect and vocabulary signal where we come from and who we identify with.
3|Presenting statistics and step-by-step reasoning to support a claim is mainly an appeal to|Logos|Pathos|Ethos|Kairos|Logos is the appeal to logic and evidence; pathos is emotion; ethos is credibility.
`,
eng: `
1|A comparison using "like" or "as" is a|Simile|Metaphor|Personification|Hyperbole|For example, "as brave as a lion".
1|"The wind whispered through the trees" is an example of|Personification|Onomatopoeia|Alliteration|Simile|A human action (whispering) is given to something that is not human.
1|Repeating the same first consonant sound, as in "Sally sells sea shells", is|Alliteration|Assonance|Rhyme|Irony|Alliteration repeats the opening sounds of nearby words.
1|Who wrote "Romeo and Juliet"?|William Shakespeare|Charles Dickens|Jane Austen|Geoffrey Chaucer|Shakespeare wrote the tragedy in the 1590s.
1|A word that imitates the sound it describes, such as "buzz", is an example of|Onomatopoeia|Oxymoron|Metaphor|Euphemism|Onomatopoeia imitates sounds: splash, sizzle, bang.
1|Which word is a noun in "The quick dog ran home"?|dog|quick|ran|the|A noun names a person, place, thing or idea.
1|A poem of 14 lines with a set rhyme scheme is a|Sonnet|Haiku|Limerick|Ballad|Shakespearean and Petrarchan sonnets both have 14 lines.
1|The time and place in which a story happens is the|Setting|Plot|Theme|Climax|Setting answers "where?" and "when?".
1|The main character in a story is the|Protagonist|Antagonist|Narrator|Foil|The antagonist is the character or force that opposes the protagonist.
2|"Deafening silence" is an example of|Oxymoron|Paradox|Simile|Pun|An oxymoron places two contradictory words side by side.
2|Which St Lucian poet won the Nobel Prize in Literature in 1992?|Derek Walcott|Kamau Brathwaite|V. S. Naipaul|Claude McKay|Walcott is also known for the epic poem "Omeros".
2|"A House for Mr Biswas" (1961) was written by|V. S. Naipaul|Sam Selvon|George Lamming|Earl Lovelace|Naipaul was born in Trinidad and won the Nobel Prize in 2001.
2|The novel "In the Castle of My Skin" (1953) is by|George Lamming|Jean Rhys|Merle Hodge|Michael Anthony|Lamming was born in Barbados.
2|"Crick Crack, Monkey" (1970) was written by the Trinidadian author|Merle Hodge|Olive Senior|Jamaica Kincaid|Erna Brodber|It follows Tee, a girl caught between two worlds.
2|A story told by a character who uses "I" is written in the|First person|Second person|Third person omniscient|Third person limited|"I" and "me" signal first-person narration.
2|When the audience knows something a character does not, this is|Dramatic irony|Verbal irony|Situational irony|Satire|Dramatic irony builds tension for the audience.
2|A deliberate exaggeration, e.g. "I've told you a million times", is|Hyperbole|Litotes|Understatement|Allusion|Hyperbole exaggerates for emphasis or humour.
2|In a sentence, the word that shows an action or state of being is the|Verb|Adjective|Preposition|Conjunction|Verbs express actions (run) or states (be, seem).
3|The rhyme scheme of a Shakespearean sonnet is|ABAB CDCD EFEF GG|ABBA ABBA CDE CDE|AABB CCDD EEFF GG|ABC ABC DED EDE|Three quatrains followed by a rhyming couplet.
3|A reference in a text to a well-known person, place, event or work is an|Allusion|Anecdote|Analogy|Apostrophe|Calling someone "a real Anansi" is an allusion to the folk trickster.
3|Poetry with no regular rhyme AND no regular metre is|Free verse|Blank verse|Iambic pentameter|Heroic couplets|Blank verse is unrhymed but keeps a regular metre; free verse has neither.
3|Jean Rhys's "Wide Sargasso Sea" (1966) responds to which earlier novel?|Jane Eyre|Wuthering Heights|Great Expectations|Pride and Prejudice|Rhys imagines the life of Bertha Mason, the "madwoman in the attic" from "Jane Eyre".
3|Understatement that denies the opposite, e.g. "not bad at all", is called|Litotes|Hyperbole|Zeugma|Chiasmus|Litotes affirms something by negating its opposite.
3|A character who contrasts with another to highlight that character's qualities is a|Foil|Stock character|Round character|Narrator|A foil throws another character's traits into relief.
3|A pause or break in the middle of a line of poetry is a|Caesura|Enjambment|Stanza|Refrain|Enjambment is different: a sentence running on past the end of a line.
3|"The Lonely Londoners" (1956), about Caribbean migrants in London, is by|Sam Selvon|Andrew Salkey|Roger Mais|John Hearne|Selvon told the story in a Creole-influenced narrative voice.
`,
carib: `
1|In which year did Christopher Columbus first reach the Caribbean?|1492|1498|1502|1520|He reached the Bahamas in October 1492.
1|Which Indigenous people lived in the Greater Antilles when Columbus arrived?|The Taíno|The Maya|The Inca|The Aztecs|The Taíno lived in Hispaniola, Cuba, Jamaica and Puerto Rico.
1|Which crop drove the Caribbean plantation economy in the 1600s and 1700s?|Sugar cane|Coffee|Cocoa|Bananas|Sugar dominated the plantation system and the trade in enslaved Africans.
1|CARICOM stands for the|Caribbean Community|Caribbean Commerce Organisation|Caribbean Common Market Council|Caribbean Commission|It was created by the Treaty of Chaguaramas in 1973.
1|Which country was the first in the Caribbean to win independence, in 1804?|Haiti|Jamaica|Cuba|Barbados|Haiti became independent after the Haitian Revolution.
1|In which year did emancipation take effect in the British Caribbean colonies?|1834|1807|1863|1888|The Abolition Act took effect on 1 August 1834, followed by a period of apprenticeship.
1|Which two Caribbean countries became independent in 1962?|Jamaica and Trinidad and Tobago|Barbados and Guyana|The Bahamas and Grenada|Belize and Dominica|Both became independent in August 1962.
1|The forced transportation of enslaved Africans across the Atlantic is called the|Middle Passage|Northwest Passage|Silk Road|Great Trek|It was the middle leg of the triangular trade.
1|The University of the West Indies began in 1948 at which campus?|Mona, Jamaica|St. Augustine, Trinidad|Cave Hill, Barbados|Five Islands, Antigua|It began as the University College of the West Indies at Mona.
2|The "triangular trade" linked Europe, West Africa and|The Americas, including the Caribbean|India|Australia|East Asia|Manufactured goods, enslaved people and plantation produce moved around the triangle.
2|Who became the most famous leader of the Haitian Revolution?|Toussaint Louverture|Simón Bolívar|José Martí|Marcus Garvey|Louverture led the revolution from the 1790s until his capture in 1802.
2|The West Indies Federation (1958–1962) collapsed largely after which country voted to leave?|Jamaica|Barbados|St Kitts|Grenada|Jamaica's 1961 referendum led to its withdrawal.
2|Indentured labourers brought to Trinidad and Guyana after emancipation came mainly from|India|Japan|Brazil|Ireland|Between 1838 and 1917, over 400,000 Indians came to the Caribbean.
2|The Morant Bay Rebellion of 1865 took place in|Jamaica|Barbados|Guyana|Antigua|Paul Bogle led the protest in the parish of St Thomas.
2|Which Jamaican-born leader founded the Universal Negro Improvement Association (UNIA)?|Marcus Garvey|Alexander Bustamante|Norman Manley|Sam Sharpe|Garvey founded the UNIA in 1914.
2|The 1930s labour unrest across the British Caribbean led to which investigation?|The Moyne Commission|The Durham Report|The Morant Commission|The Wood Report|The West India Royal Commission (Moyne Commission) was appointed in 1938.
2|The Caribbean Court of Justice (CCJ) has its seat in|Port of Spain, Trinidad and Tobago|Kingston, Jamaica|Bridgetown, Barbados|Georgetown, Guyana|The CCJ was inaugurated in Port of Spain in 2005.
2|The Kalinago are the Indigenous people most associated today with which island?|Dominica|Jamaica|Aruba|The Bahamas|The Kalinago Territory is on the east coast of Dominica.
3|The Treaty of Chaguaramas, which established CARICOM, was signed in|1973|1958|1962|1989|It was signed in Trinidad on 4 July 1973.
3|Emancipation in the Dutch Caribbean, including Sint Maarten, took effect in|1863|1834|1848|1888|Slavery was abolished in the Dutch colonies on 1 July 1863.
3|Slavery was finally abolished in the French Caribbean colonies in|1848|1794|1863|1804|The 1848 decree was championed by Victor Schœlcher.
3|After 1834, formerly enslaved people had to keep working for their former owners under a system called|Apprenticeship|Indentureship|Metayage|Encomienda|Apprenticeship ended early, in 1838.
3|The Spanish system that granted colonists the labour of Indigenous people in return for "protection" was the|Encomienda|Hacienda|Asiento|Cabildo|The encomienda system devastated Taíno communities.
3|The "plantation economy" thesis in "Persistent Poverty" (1972) is associated with|George Beckford|W. Arthur Lewis|Eric Williams|Walter Rodney|Beckford argued that the plantation shaped Caribbean economies and societies long after slavery.
3|"Capitalism and Slavery" (1944), linking slavery's profits to British industrialisation, was written by|Eric Williams|C. L. R. James|Walter Rodney|Frantz Fanon|Williams later became Trinidad and Tobago's first Prime Minister.
3|Which St Lucian economist won the Nobel Prize in Economics in 1979?|Sir W. Arthur Lewis|George Beckford|Lloyd Best|Eric Williams|Lewis shared the 1979 prize for his work on development economics.
`,
geo: `
1|What is the largest ocean on Earth?|Pacific Ocean|Atlantic Ocean|Indian Ocean|Arctic Ocean|The Pacific covers about a third of Earth's surface.
1|The line at 0° latitude is the|Equator|Prime Meridian|Tropic of Cancer|Arctic Circle|The Prime Meridian is 0° longitude.
1|The official Atlantic hurricane season runs from|1 June to 30 November|1 January to 31 March|1 April to 31 July|1 September to 31 December|Activity usually peaks from August to October.
1|Which gas do plants take in from the air for photosynthesis?|Carbon dioxide|Oxygen|Nitrogen|Helium|Plants take in carbon dioxide and release oxygen.
1|What is the largest continent by area?|Asia|Africa|North America|Europe|Asia covers about 30% of Earth's land.
1|Coral reefs are built mainly by|Tiny animals called coral polyps|Seaweed|Sand deposits|Volcanic rock|Polyps build skeletons of calcium carbonate.
1|Which renewable energy source turns sunlight into electricity?|Solar power|Coal|Diesel|Natural gas|Photovoltaic (PV) panels convert sunlight into electricity.
1|Lines of longitude run between the|North and South Poles|Equator and the tropics|East and west coasts|Two tropics only|Longitude lines (meridians) meet at the poles.
1|A piece of land almost surrounded by water is a|Peninsula|Lake|Strait|Delta|"Peninsula" comes from Latin for "almost an island".
2|Mangrove forests matter along Caribbean coasts mainly because they|Protect coasts from erosion and shelter young fish|Produce most of the world's oxygen|Grow only on mountains|Make inland soil saltier|Mangrove roots trap sediment and act as fish nurseries.
2|When water vapour cools and turns into tiny droplets that form clouds, this is|Condensation|Evaporation|Transpiration|Infiltration|Condensation happens as rising air cools.
2|Which island's Soufrière Hills volcano began erupting in 1995?|Montserrat|Barbados|Antigua|Jamaica|The eruptions buried the old capital, Plymouth.
2|A hurricane is Category 5 on the Saffir–Simpson scale when sustained winds reach at least|157 mph (252 km/h)|74 mph (119 km/h)|111 mph (178 km/h)|100 mph (161 km/h)|74 mph is the minimum for a Category 1 hurricane.
2|The warming of Earth caused by gases trapping heat in the atmosphere is the|Greenhouse effect|Ozone effect|Coriolis effect|Albedo effect|Greenhouse gases include carbon dioxide, methane and water vapour.
2|Coral bleaching is mainly caused by|Sea water becoming too warm|Too many fish|Cold winter currents|Heavy rain on land only|Heat stress makes corals expel the algae that live in them.
2|A fan-shaped deposit of sediment at the mouth of a river is a|Delta|Meander|Gorge|Tombolo|Deltas form where rivers slow down and drop their sediment.
2|On a map with a scale of 1:50,000, 1 cm represents|500 metres on the ground|50 metres|5 kilometres|50 kilometres|50,000 cm = 500 m.
2|Most Caribbean islands lie in which climate zone?|Tropical|Temperate|Polar|Arid desert|They lie between the Equator and the Tropic of Cancer.
3|The volcanic islands of the Lesser Antilles formed mainly because of|Atlantic oceanic crust sinking beneath the Caribbean Plate (subduction)|A hotspot, as in Hawaii|Glaciers carving the land|Coral growth alone|Subduction creates an island arc of volcanoes.
3|The deflection of winds and currents caused by Earth's rotation is the|Coriolis effect|Doppler effect|Greenhouse effect|Rain shadow|It makes hurricanes spin anticlockwise in the Northern Hemisphere.
3|An area on the sheltered (leeward) side of mountains that receives little rain is a|Rain shadow|Floodplain|Watershed|Convection zone|Moist air drops its rain on the windward side first.
3|The steady winds that blow toward the Caribbean from the north-east are the|North-east trade winds|Westerlies|Polar easterlies|Monsoon winds|The trade winds shape windward and leeward climates across the islands.
3|Sargassum seaweed piling up on Caribbean beaches is a problem mainly because it|Rots, releases hydrogen sulphide gas and harms tourism and wildlife|Is radioactive|Makes the sea freeze|Is an invasive land plant|Large rotting mats smell like rotten eggs and can block turtle nesting.
3|Which 2015 agreement aims to limit global warming to well below 2 °C?|The Paris Agreement|The Kyoto Protocol|The Montreal Protocol|The Treaty of Chaguaramas|The Montreal Protocol (1987) protects the ozone layer.
3|Rocks that form when magma or lava cools and hardens are|Igneous|Sedimentary|Metamorphic|Organic|Basalt and granite are igneous rocks.
3|The loss of water vapour from plant leaves into the atmosphere is|Transpiration|Percolation|Precipitation|Sublimation|Transpiration is part of the water cycle.
3|Limestone landscapes with caves, sinkholes and underground drainage, like Jamaica's Cockpit Country, are|Karst|Tundra|Savanna|Moraine|Karst forms as slightly acidic rainwater dissolves limestone.
`,
bio: `
1|What is the basic unit of life?|The cell|The atom|The organ|The tissue|All living things are made of one or more cells.
1|Which organ pumps blood around the human body?|Heart|Lungs|Liver|Kidney|The human heart has four chambers.
1|Green plants make their own food by|Photosynthesis|Respiration|Digestion|Fermentation|Light energy turns carbon dioxide and water into glucose and oxygen.
1|Which part of a plant cell contains chlorophyll?|Chloroplast|Nucleus|Cell wall|Vacuole|Chloroplasts are where photosynthesis happens.
1|How many bones are in the typical adult human skeleton?|206|106|306|186|Babies are born with more, and some fuse as they grow.
1|Which blood cells help fight infection?|White blood cells|Red blood cells|Platelets|Plasma|Red blood cells carry oxygen; platelets help blood clot.
1|Organisms that make their own food are called|Producers|Consumers|Decomposers|Parasites|Producers start every food chain.
1|In humans, gas exchange takes place mainly in the|Lungs|Stomach|Skin|Heart|Oxygen and carbon dioxide are exchanged in the alveoli.
1|DNA carries an organism's|Genetic information|Stored fat|Digestive juices|Oxygen supply|Genes are sections of DNA.
2|Aerobic respiration, which releases energy from glucose, takes place in the|Mitochondria|Ribosomes|Golgi body|Cell membrane|Mitochondria are often called the powerhouse of the cell.
2|How many chromosomes are in a normal human body cell?|46|23|44|48|That is 23 pairs; sperm and egg cells carry 23.
2|Which disease is spread by the Aedes aegypti mosquito in the Caribbean?|Dengue fever|Tuberculosis|Cholera|Tetanus|The same mosquito can also spread Zika and chikungunya.
2|Enzymes are biological catalysts made of|Proteins|Carbohydrates|Fats|Minerals|High temperatures denature enzymes.
2|The movement of water across a partially permeable membrane is|Osmosis|Active transport|Translocation|Excretion|Water moves from a dilute solution to a more concentrated one.
2|Which part of the brain controls balance and coordination?|Cerebellum|Cerebrum|Medulla oblongata|Hypothalamus|The cerebellum coordinates smooth movement.
2|Insulin is produced by the|Pancreas|Liver|Thyroid|Adrenal glands|Insulin lowers blood glucose; problems with it lead to diabetes.
2|Diabetes, hypertension and heart disease are examples of|Non-communicable diseases (NCDs)|Viral infections|Deficiency diseases|Contagious diseases|NCDs are not passed from person to person and are major health issues in the Caribbean.
2|In the chain grass → mouse → snake → hawk, the hawk is a|Tertiary consumer|Producer|Primary consumer|Decomposer|Mouse = primary, snake = secondary, hawk = tertiary consumer.
3|The cell division that produces gametes with half the chromosome number is|Meiosis|Mitosis|Binary fission|Budding|Meiosis produces four genetically different cells.
3|In DNA, adenine always pairs with|Thymine|Guanine|Cytosine|Uracil|A pairs with T and C pairs with G; RNA uses uracil instead of thymine.
3|Which blood vessels carry blood AWAY from the heart?|Arteries|Veins|Capillaries|Venules|Arteries have thick muscular walls to cope with high pressure.
3|Sickle cell anaemia is caused by a change in the gene for|Haemoglobin|Insulin|Melanin|Keratin|Faulty haemoglobin makes red blood cells sickle-shaped.
3|The tiny filtering units of the kidney are called|Nephrons|Alveoli|Villi|Neurons|Each kidney has about a million nephrons.
3|Proteins are made at the|Ribosomes|Lysosomes|Vacuole|Centrioles|Ribosomes join amino acids following instructions from mRNA.
3|Blood group O negative is called the "universal donor" because its red cells have|No A, B or Rh antigens|Both A and B antigens|Extra haemoglobin|No plasma|Without these antigens, the cells are unlikely to trigger a reaction.
3|Which hormone prepares the body for "fight or flight"?|Adrenaline|Insulin|Oestrogen|Thyroxine|Adrenaline raises the heart rate and blood glucose.
`,
chem: `
1|What is the chemical formula for water?|H₂O|CO₂|O₂|NaCl|Two hydrogen atoms bonded to one oxygen atom.
1|The chemical symbol "Na" stands for|Sodium|Nitrogen|Neon|Nickel|It comes from the Latin "natrium".
1|A substance with a pH of 2 is|Acidic|Neutral|Alkaline|A salt|pH below 7 is acidic; 7 is neutral; above 7 is alkaline.
1|The centre of an atom is called the|Nucleus|Electron shell|Proton cloud|Orbit|The nucleus contains protons and neutrons.
1|Which particle in an atom has a negative charge?|Electron|Proton|Neutron|Nucleus|Protons are positive; neutrons have no charge.
1|Common table salt is the compound|Sodium chloride|Calcium carbonate|Potassium nitrate|Sodium hydroxide|Its formula is NaCl.
1|At sea level, pure water boils at|100 °C|0 °C|50 °C|80 °C|It freezes at 0 °C.
1|The chemical symbol for gold is|Au|Ag|Go|Gd|From the Latin "aurum"; Ag is silver.
1|Which state of matter keeps a fixed volume but takes the shape of its container?|Liquid|Solid|Gas|Plasma|Liquids flow but keep their volume.
2|An element's atomic number tells you the number of|Protons in the nucleus|Neutrons in the nucleus|Electrons in the outer shell|Atoms in a molecule|In a neutral atom it also equals the number of electrons.
2|What forms when an acid reacts with a base (alkali)?|A salt and water|Only hydrogen gas|Carbon and oxygen|A metal and oxygen|This reaction is called neutralisation.
2|About 78% of Earth's atmosphere is|Nitrogen|Oxygen|Carbon dioxide|Argon|Oxygen makes up about 21%.
2|For iron to rust, it needs both|Oxygen and water|Nitrogen and salt|Carbon dioxide and heat|Hydrogen and light|Salt water speeds up rusting, but oxygen and water are essential.
2|The elements in Group 1 of the Periodic Table are the|Alkali metals|Halogens|Noble gases|Transition metals|Lithium, sodium and potassium react strongly with water.
2|A bond formed when atoms SHARE pairs of electrons is|Covalent|Ionic|Metallic|Hydrogen|Ionic bonds form when electrons are transferred.
2|Which gas turns limewater milky?|Carbon dioxide|Oxygen|Hydrogen|Chlorine|It forms insoluble calcium carbonate.
2|The noble gases are very unreactive because they|Have full outer electron shells|Are very heavy|Are liquids at room temperature|Have no protons|A full outer shell is very stable.
3|How many elements are named in the modern Periodic Table?|118|92|103|150|Oganesson, element 118, completes the seventh period.
3|The relative molecular mass of water (H = 1, O = 16) is|18|17|10|32|2 × 1 + 16 = 18.
3|Avogadro's constant, the number of particles in one mole, is about|6.02 × 10²³|3.00 × 10⁸|1.60 × 10⁻¹⁹|9.81|3.00 × 10⁸ m/s is the speed of light.
3|A reaction that gives out heat to the surroundings is|Exothermic|Endothermic|Reversible|Catalytic|Burning fuel is exothermic.
3|Which process separates crude oil into fractions such as petrol and diesel?|Fractional distillation|Filtration|Chromatography|Crystallisation|The fractions boil at different temperatures.
3|Isotopes of an element have the same number of protons but different numbers of|Neutrons|Electrons|Protons|Shells|For example, carbon-12 and carbon-14.
3|During electrolysis, positive ions (cations) move toward the|Cathode|Anode|Surface of the electrolyte|Salt bridge|The cathode is the negative electrode.
3|Compounds made of ONLY carbon and hydrogen are|Hydrocarbons|Carbohydrates|Proteins|Esters|Alkanes and alkenes are hydrocarbons.
3|The general formula of the alkanes is|CₙH₂ₙ₊₂|CₙH₂ₙ|CₙH₂ₙ₋₂|CₙHₙ|For example, methane is CH₄ and ethane is C₂H₆.
`,
phys: `
1|The SI unit of force is the|Newton|Joule|Watt|Pascal|It is named after Sir Isaac Newton.
1|The SI unit of energy is the|Joule|Newton|Volt|Ampere|1 joule = 1 newton-metre.
1|Which force pulls objects toward the centre of the Earth?|Gravity|Friction|Magnetism|Tension|Gravity gives objects weight.
1|Light travels fastest through|A vacuum|Water|Glass|Diamond|Light slows down in denser materials.
1|A thermometer measures|Temperature|Mass|Pressure|Current|Temperature is measured in °C or kelvin.
1|Which of these is a good conductor of electricity?|Copper|Rubber|Plastic|Dry wood|Copper is used in electrical wiring.
1|The opposite poles of two magnets|Attract|Repel|Do nothing|Cancel out|Like poles repel; unlike poles attract.
1|Sound cannot travel through|A vacuum|Water|Steel|Air|Sound needs particles to pass the vibration along.
1|The unit of electric current is the|Ampere|Volt|Ohm|Watt|Current is measured with an ammeter.
2|Speed is calculated as|Distance ÷ time|Time ÷ distance|Mass × acceleration|Force × distance|100 m in 20 s is 5 m/s.
2|Ohm's law states that voltage equals|Current × resistance|Current ÷ resistance|Power × time|Resistance ÷ current|V = IR.
2|The speed of light in a vacuum is about|3 × 10⁸ m/s|3 × 10⁵ m/s|340 m/s|9.8 m/s|About 340 m/s is the speed of sound in air.
2|The bending of light as it passes from air into water is|Refraction|Reflection|Diffraction|Dispersion|Light changes speed and direction at the boundary.
2|Newton's first law says an object stays at rest or keeps moving at constant velocity unless|An unbalanced force acts on it|It is heated|Its mass changes|It is in a vacuum|This is the law of inertia.
2|On Earth, the acceleration due to gravity is about|9.8 m/s²|1.6 m/s²|98 m/s²|0.98 m/s²|1.6 m/s² is the value on the Moon.
2|A stretched rubber band stores|Elastic potential energy|Kinetic energy|Nuclear energy|Sound energy|It changes to kinetic energy when released.
2|Power is the rate of|Transferring energy (doing work)|Changing velocity|Flow of charge|Change of momentum|Power = energy ÷ time, measured in watts.
2|Splitting a large nucleus such as uranium-235 is|Nuclear fission|Nuclear fusion|Ionisation|Refraction|Fusion joins light nuclei together, as in the Sun.
3|A 2 kg object accelerates at 3 m/s². The resultant force is|6 N|1.5 N|5 N|0.67 N|F = ma = 2 × 3.
3|The kinetic energy of a 2 kg ball moving at 3 m/s is|9 J|6 J|18 J|3 J|KE = ½mv² = ½ × 2 × 3².
3|Which electromagnetic waves have the shortest wavelength?|Gamma rays|Radio waves|Microwaves|Visible light|Gamma rays have the highest frequency and energy.
3|Two 6 Ω resistors in PARALLEL have a combined resistance of|3 Ω|12 Ω|6 Ω|36 Ω|1/R = 1/6 + 1/6, so R = 3 Ω.
3|The half-life of a radioactive isotope is the time taken for|Half of its radioactive nuclei to decay|All of its nuclei to decay|Its mass to double|Its activity to reach zero|After two half-lives, one quarter remains.
3|Absolute zero, the lowest possible temperature, is|0 K (about −273 °C)|0 °C|−100 °C|−460 K|Precisely −273.15 °C.
3|A wave has a frequency of 50 Hz and a wavelength of 2 m. Its speed is|100 m/s|25 m/s|52 m/s|0.04 m/s|v = fλ = 50 × 2.
3|Momentum is calculated as|Mass × velocity|Mass × acceleration|Force × distance|½ × mass × velocity²|Momentum is conserved in collisions.
3|Gravity on the Moon is about one-sixth of Earth's. A 60 kg student's MASS on the Moon is|60 kg|10 kg|360 kg|0 kg|Mass stays the same; only weight changes.
`,
math: `
1|What is 15% of 200?|30|15|20|35|0.15 × 200 = 30.
1|The interior angles of any triangle add up to|180°|90°|360°|270°|This is true for every triangle.
1|What is 7 × 8?|56|54|48|64|7 × 8 = 56.
1|A shape with four equal sides and four right angles is a|Square|Rhombus|Trapezium|Kite|A rhombus has four equal sides, but its angles need not be right angles.
1|What is the square root of 144?|12|14|11|72|12 × 12 = 144.
1|Write 0.75 as a fraction in its simplest form.|3/4|7/5|75/10|1/4|0.75 = 75/100 = 3/4.
1|How many sides does a hexagon have?|6|5|7|8|"Hexa" means six.
1|What is the mean of 4, 6 and 8?|6|18|4|8|(4 + 6 + 8) ÷ 3 = 6.
1|A right angle measures|90°|45°|180°|60°|Two right angles make a straight line.
2|Solve for x: 3x + 5 = 20|5|15|25/3|6|3x = 15, so x = 5.
2|The area of a circle with radius r is|πr²|2πr|πd|2πr²|2πr is the circumference.
2|What is 2⁵?|32|10|25|16|2 × 2 × 2 × 2 × 2 = 32.
2|The median of 3, 9, 4, 7, 5 is|5|4|7|5.6|In order: 3, 4, 5, 7, 9; the middle value is 5.
2|A right-angled triangle has shorter sides of 3 cm and 4 cm. The hypotenuse is|5 cm|7 cm|6 cm|12 cm|By Pythagoras: √(9 + 16) = 5.
2|The gradient of the line y = 2x + 3 is|2|3|5|2/3|In y = mx + c, m is the gradient.
2|A $40 shirt is reduced by 25%. The sale price is|$30|$15|$35|$10|25% of $40 is $10, so $40 − $10 = $30.
2|The probability of getting heads when tossing a fair coin is|1/2|1/4|1|0|There are two equally likely outcomes.
2|Expand: 3(x + 4)|3x + 12|3x + 4|x + 12|3x + 7|Multiply each term in the bracket by 3.
3|Solve: x² − 5x + 6 = 0|x = 2 or x = 3|x = −2 or x = −3|x = 1 or x = 6|x = −1 or x = 6|It factorises to (x − 2)(x − 3) = 0.
3|The interior angles of a hexagon add up to|720°|540°|360°|1080°|(n − 2) × 180° = 4 × 180°.
3|sin 30° equals|0.5|1|√3/2|0|A key exact value: sin 30° = 1/2.
3|The derivative of x³ with respect to x is|3x²|x²|3x³|x⁴/4|Multiply by the power, then reduce the power by one.
3|log₁₀ 1000 equals|3|10|100|30|10³ = 1000.
3|$1,000 is invested at 5% SIMPLE interest per year. The interest after 3 years is|$150|$50|$157.63|$1,150|I = PRT = 1000 × 0.05 × 3. ($157.63 would be compound interest.)
3|The volume of a cylinder with radius 2 cm and height 5 cm (π ≈ 3.14) is about|62.8 cm³|31.4 cm³|20 cm³|125.6 cm³|V = πr²h = 3.14 × 4 × 5.
3|In how many different orders can 3 different books be arranged on a shelf?|6|3|9|27|3! = 3 × 2 × 1 = 6.
3|The nth term of the sequence 5, 8, 11, 14, … is|3n + 2|5n|3n + 5|n + 3|It goes up by 3 each time, and 3(1) + 2 = 5.
`,
bus: `
1|Money left over after all expenses have been paid is called|Profit|Revenue|Capital|Debt|Profit = revenue − costs.
1|A business owned and run by one person is a|Sole trader|Partnership|Public limited company|Co-operative|A sole trader has unlimited liability.
1|The total money a business receives from sales is its|Revenue (turnover)|Profit|Cost of sales|Equity|Revenue is counted before costs are subtracted.
1|Things a business owns, such as buildings and equipment, are its|Assets|Liabilities|Expenses|Drawings|Liabilities are what a business owes.
1|A person who starts a new business and takes the risk is an|Entrepreneur|Employee|Auditor|Accountant|Entrepreneurs combine resources and take risks to earn a profit.
1|If demand for a product rises while supply stays the same, its price usually|Rises|Falls|Stays the same|Drops to zero|More buyers competing for the same goods push the price up.
1|The "4 Ps" of the marketing mix are Product, Price, Place and|Promotion|People|Profit|Planning|Promotion includes advertising and special offers.
1|Goods sold to other countries are called|Exports|Imports|Tariffs|Quotas|Imports are goods bought from other countries.
1|A general rise in prices over time is called|Inflation|Deflation|Recession|Devaluation|Inflation reduces what money can buy.
2|The accounting equation is|Assets = Liabilities + Capital|Assets = Capital − Liabilities|Liabilities = Assets + Capital|Capital = Assets + Liabilities|Both sides must always balance.
2|In double-entry bookkeeping, every transaction is recorded|Twice, as a debit and as a credit|Only in the cash book|Once, as a credit|Only at the end of the year|Total debits always equal total credits.
2|Limited resources but unlimited wants is the basic economic problem of|Scarcity|Opportunity cost|Inflation|Specialisation|Scarcity forces people and firms to make choices.
2|The next best alternative given up when you make a choice is the|Opportunity cost|Sunk cost|Fixed cost|Marginal revenue|For example, the wages given up to study full-time.
2|Costs that do NOT change with the level of output, such as rent, are|Fixed costs|Variable costs|Marginal costs|Direct costs|Variable costs, such as raw materials, change with output.
2|A SWOT analysis looks at Strengths, Weaknesses, Opportunities and|Threats|Targets|Trends|Taxes|Strengths and weaknesses are internal; opportunities and threats are external.
2|A business owned by its members, common in Caribbean credit unions and farming, is a|Co-operative|Franchise|Sole trader|Public corporation|Each member usually has one vote.
2|The owners of a public limited company are its|Shareholders|Directors|Creditors|Customers|Its shares can be traded on a stock exchange.
2|Which statement lists a business's assets, liabilities and capital on a particular date?|Balance sheet (statement of financial position)|Income statement|Cash flow forecast|Trial balance|The income statement covers a period of time, not a single date.
3|The break-even point is where|Total revenue equals total costs|Profit is at its highest|Fixed costs are zero|Sales are at their lowest|Above break-even, the business makes a profit.
3|Fixed costs are $1,000, the selling price is $15 and the variable cost is $10 per unit. Break-even output is|200 units|100 units|67 units|1,000 units|1,000 ÷ (15 − 10) = 200 units.
3|The current ratio is calculated as|Current assets ÷ current liabilities|Current liabilities ÷ current assets|Profit ÷ sales|Capital ÷ assets|It measures liquidity: the ability to pay short-term debts.
3|A 10% price rise causes a 20% fall in quantity demanded. Demand is|Price elastic|Price inelastic|Perfectly inelastic|Unit elastic|PED = −20% ÷ 10% = −2, which is greater than 1 in size.
3|A market with only ONE seller is a|Monopoly|Oligopoly|Perfect competition|Monopsony|A monopsony is a market with only one buyer.
3|Gross Domestic Product (GDP) measures|The total value of goods and services produced in a country in a year|A government's total debt|The value of exports only|The money in circulation|GDP is a key measure of a country's economic output.
3|The fall in value of a fixed asset over time is|Depreciation|Appreciation|Accrual|Dividend|Vehicles and computers lose value as they are used.
3|What is at the TOP of Maslow's hierarchy of needs?|Self-actualisation|Safety|Esteem|Physiological needs|Physiological needs such as food and shelter form the base.
3|A tax that takes a higher percentage from higher incomes is|Progressive|Regressive|Proportional|Indirect|A regressive tax takes a larger share from lower incomes.
`,
logi: `
1|The network of organisations involved in getting a product from raw materials to the customer is the|Supply chain|Value proposition|Sales funnel|Organisation chart|It includes suppliers, manufacturers, warehouses, transporters and retailers.
1|A building used to store goods before they are distributed is a|Warehouse|Showroom|Factory outlet|Head office|Warehouses hold inventory until it is needed.
1|Stocks of raw materials, work in progress and finished goods are called|Inventory|Revenue|Capital|Freight|Managing inventory is a key logistics task.
1|A large standard metal box used to ship goods by sea is a|Shipping container|Pallet|Crate|Tanker|Standard containers are 20 ft or 40 ft long.
1|The flat wooden or plastic base on which goods are stacked and moved by forklift is a|Pallet|Container|Crate|Shelf|Pallets make loading and unloading faster.
1|A document that lists goods supplied and requests payment is an|Invoice|Receipt|Order form|Memo|A receipt confirms that payment has been made.
1|Most of a small island's food and consumer goods arrive by|Sea|Pipeline|Rail|Road from the mainland|Island territories rely on shipping, with air freight for urgent items.
1|Taxes charged on imported goods are|Import duties|Income tax|Property tax|Payroll tax|Customs collects import duties at the port or airport.
1|The final stage of delivery, to the customer's door, is called the|Last mile|First mile|Cross-dock|Back haul|Last-mile delivery is often the most expensive part.
2|"Just-in-time" (JIT) inventory means|Materials arrive only when they are needed|Keeping very large stocks|Ordering once a year|Selling stock below cost|JIT cuts storage costs but is vulnerable to delays.
2|A TEU is a unit that measures|Container capacity (twenty-foot equivalent unit)|Truck fuel use|Warehouse floor space|Air freight weight|One 40 ft container = 2 TEU.
2|FIFO in stock control stands for|First in, first out|Final input, final output|Freight in, freight out|First invoice, first order|Older stock is used first, which is vital for perishable goods.
2|Moving goods from customers back through the supply chain, e.g. returns and recycling, is|Reverse logistics|Cross-docking|Outsourcing|Lead time|It includes returns, repairs, refurbishing and recycling.
2|The time between placing an order and receiving it is the|Lead time|Cycle count|Dwell time|Turnaround fee|Longer lead times mean a business needs more safety stock.
2|Barcodes and RFID tags on goods mainly improve|Tracking and traceability|Customs duty rates|Packaging weight|Fuel prices|Each scan updates stock records in real time.
2|Moving goods straight from incoming to outgoing trucks with little or no storage is|Cross-docking|Palletising|Warehousing|Picking|It cuts storage time and handling.
2|Extra stock kept to protect against unexpected demand or delays is|Safety stock (buffer stock)|Dead stock|Work in progress|Consignment stock|Island businesses often hold more buffer stock because of shipping delays.
2|A company that provides logistics services such as transport and warehousing for other businesses is a|Third-party logistics provider (3PL)|Wholesaler|Franchisor|Retailer|Many firms outsource logistics to 3PLs.
3|Incoterms are international rules that set out|Who pays the costs and carries the risks at each stage of delivery|Customs duty rates|Container sizes|Port opening hours|Examples include FOB and CIF.
3|Under the Incoterm FOB (Free On Board), risk passes from seller to buyer when the goods|Are loaded on board the ship at the port of shipment|Leave the seller's factory|Arrive at the buyer's warehouse|Clear customs at the destination|From that point the buyer is responsible.
3|The "bullwhip effect" describes|Small changes in customer demand causing bigger and bigger swings in orders up the supply chain|Delays caused by bad weather|Damage to goods during loading|Rising fuel costs|Poor information sharing amplifies demand changes.
3|The Economic Order Quantity (EOQ) model finds the order size that|Minimises total ordering and holding costs|Maximises sales revenue|Fills the whole warehouse|Avoids all customs duties|EOQ balances the cost of ordering against the cost of storing stock.
3|In a "hub-and-spoke" network,|Goods pass through a central hub before going to their final destinations|Every location ships directly to every other location|Only one customer is served|Goods are never stored|Airlines and courier companies use hubs to combine loads.
3|A bill of lading is a shipping document that|Acts as a receipt, a contract of carriage and a document of title|Lists the crew on a ship|Records customs fines|Sets the retail price|It is issued by the carrier.
3|The measure "On-Time In-Full" (OTIF) shows|The percentage of orders delivered on time and complete|Fuel efficiency|Warehouse temperature|Drivers' working hours|OTIF is a common delivery performance indicator.
3|ABC analysis groups stock items by|Their value or importance, with A the highest|Alphabetical order|Arrival date|Colour code|Managers focus tight control on the few high-value A items.
3|A supply chain that can respond quickly to sudden changes in demand is described as|Agile|Lean|Linear|Static|Lean focuses on cutting waste; agile focuses on responsiveness.
`,
it: `
1|What does CPU stand for?|Central Processing Unit|Computer Power Unit|Central Program Utility|Core Processing Unit|The CPU carries out program instructions.
1|Which of these is an input device?|Keyboard|Monitor|Printer|Speaker|Monitors, printers and speakers are output devices.
1|How many bits are in one byte?|8|4|16|10|One byte can store one character in ASCII.
1|RAM is described as volatile because|Its contents are lost when the power is switched off|It cannot be changed|It is very slow|It stores the operating system permanently|ROM is non-volatile.
1|Which of these is an operating system?|Linux|Microsoft Word|A web browser|A photo editor|The others are application software.
1|A program that copies itself and damages files is a|Virus|Firewall|Compiler|Browser|Antivirus software helps detect and remove it.
1|What does "URL" stand for?|Uniform Resource Locator|Universal Routing Link|User Resource Login|Unified Remote Location|A URL is a web address.
1|Which number system uses only the digits 0 and 1?|Binary|Decimal|Hexadecimal|Octal|Computers store all data in binary.
1|An email that tricks you into giving away your password is|Phishing|Spam filtering|Debugging|Encryption|Always check the sender and the link before clicking.
2|The binary number 1010 equals which decimal number?|10|12|5|8|8 + 0 + 2 + 0 = 10.
2|Which device forwards data packets between different networks?|Router|Monitor|Scanner|Keyboard|A router connects, for example, a home network to the internet.
2|An algorithm is|A step-by-step set of instructions to solve a problem|A type of computer virus|A programming language|A computer's memory|Algorithms can be written as pseudocode or drawn as flowcharts.
2|In a flowchart, a diamond shape shows a|Decision|Process|Start or stop|Input or output|Decisions have yes and no branches.
2|In a database, a primary key|Uniquely identifies each record|Encrypts the table|Sorts records alphabetically|Links to the internet|A student ID number is a good primary key.
2|HTTPS is more secure than HTTP because it|Encrypts data sent between browser and server|Loads pages faster|Blocks all adverts|Needs no passwords|The S stands for secure.
2|In the binary convention, 1 kilobyte equals|1,024 bytes|1,000 bits|512 bytes|100 bytes|2¹⁰ = 1,024.
2|Which programming construct repeats a block of code?|A loop (iteration)|Selection|A variable|A comment|FOR and WHILE loops are forms of iteration.
2|The hexadecimal digit F stands for the decimal value|15|16|14|10|Hex digits run 0–9, then A (10) to F (15).
3|The hexadecimal number 2A in decimal is|42|32|21|26|2 × 16 + 10 = 42.
3|Which sorting algorithm repeatedly swaps adjacent items that are in the wrong order?|Bubble sort|Merge sort|Binary search|Quick sort|Each pass "bubbles" the largest item to the end.
3|For a binary search to work, the list must be|Sorted|Unsorted|Stored in a database|Shorter than 100 items|It halves the search range at each step.
3|Which internet service translates domain names into IP addresses?|DNS|FTP|SMTP|DHCP|The Domain Name System works like a phone book; DHCP hands out IP addresses.
3|A compiler differs from an interpreter because it|Translates the whole program into machine code before it runs|Runs code one line at a time|Only works with HTML|Cannot detect errors|An interpreter translates and runs one statement at a time.
3|In SQL, which command retrieves data from a table?|SELECT|INSERT|UPDATE|DROP|For example: SELECT name FROM students;
3|An IPv4 address is made of how many bits?|32|64|128|16|IPv6 addresses use 128 bits.
3|The time complexity of binary search is|O(log n)|O(n)|O(n²)|O(1)|Halving the list each step gives logarithmic time.
3|In 8-bit two's complement, 11111111 represents|−1|255|−127|0|Read as unsigned, it would be 255.
3|A network where every device connects to one central switch uses a|Star topology|Bus topology|Ring topology|Mesh topology|If the central switch fails, the whole network stops.
`,
dm: `
1|The tiny dots of colour that make up a digital image are|Pixels|Vectors|Frames|Layers|"Pixel" is short for "picture element".
1|Screens mix which three colours of light?|Red, green and blue (RGB)|Red, yellow and blue|Cyan, magenta and yellow|Black, white and grey|RGB is additive colour.
1|Printers usually mix which inks?|CMYK (cyan, magenta, yellow, black)|RGB|HSL|PNG|CMYK is subtractive colour.
1|Which image format supports a transparent background for the web?|PNG|JPEG|BMP|TXT|JPEG does not support transparency.
1|Each single image in an animation is a|Frame|Pixel|Track|Clip|Frames shown quickly create the illusion of movement.
1|The rules and actions that make up how a game plays are its|Game mechanics|Graphics|Credits|Packaging|Jumping, scoring and collecting are mechanics.
1|A close-up camera shot is mainly used to|Show a character's emotions or a small detail|Show a whole landscape|Establish the location|Show a crowd|Wide shots establish the setting.
1|Which type of software arranges video clips on a timeline?|Video editing software|Spreadsheet software|A word processor|A database|Non-linear editors (NLEs) let you cut and arrange clips.
1|A storyboard is|A series of sketches that plan shots or scenes|The final edited film|A soundtrack|A type of camera|Storyboards plan the visuals before filming or animating.
2|The "rule of thirds" suggests placing key subjects|Along the lines that divide the frame into thirds|Exactly in the centre|At the very edge|Only in the bottom corner|It makes compositions more balanced and interesting.
2|Images made of mathematical paths that scale without losing quality are|Vector graphics|Raster graphics|Bitmaps|JPEG photos|SVG is a vector format; photos are raster images.
2|The standard frame rate for traditional cinema film is|24 frames per second|12 frames per second|60 frames per second|100 frames per second|Many games aim for 30 or 60 fps.
2|In animation, "tweening" means|Creating the frames between two keyframes|Drawing every frame from scratch|Adding sound|Exporting the file|It is short for "in-betweening".
2|The animation principle "squash and stretch" gives objects a sense of|Weight and flexibility|Colour|Sound|Perspective|It is one of the 12 principles of animation.
2|Everyday sounds recreated in post-production to match the action, like footsteps, are|Foley|Dialogue|Score|Voice-over|They are named after sound artist Jack Foley.
2|Image resolution for print is usually measured in|PPI or DPI (pixels or dots per inch)|Frames per second|Kilohertz|Bits per second|300 ppi is a common print standard.
2|In a video game, an NPC is a|Non-player character|New player challenge|Network protocol code|Numbered pixel count|NPCs are controlled by the game, not by a player.
2|Which camera angle looks UP at a subject to make it seem powerful?|Low angle|High angle|Bird's-eye view|Eye level|A high angle makes a subject look smaller or weaker.
3|Lossy compression, as used in JPEG and MP3 files, works by|Permanently discarding some data|Keeping every bit of the original|Adding extra data|Converting images to vectors|PNG and ZIP use lossless compression.
3|The 180-degree rule in film helps to|Keep characters' screen positions consistent|Light the subject evenly|Choose the frame rate|Synchronise the sound|Crossing the line can confuse viewers about who is where.
3|Colours opposite each other on the colour wheel form a|Complementary scheme|Analogous scheme|Monochromatic scheme|Triadic scheme|Blue and orange are complementary.
3|In 3D modelling, a polygon mesh is|A set of vertices, edges and faces that define a shape|A type of texture|A lighting set-up|A sound file|Low-poly models use fewer polygons.
3|Wrapping a 2D image onto the surface of a 3D model is|Texture (UV) mapping|Rigging|Rendering|Keyframing|UV coordinates tell the software where each part of the image goes.
3|Adding a skeleton of joints to a 3D character so it can be posed and animated is|Rigging|Rendering|Modelling|Compositing|Animators then move the rig.
3|A game loop repeatedly|Reads input, updates the game state and draws the screen|Saves the game to disk|Downloads updates|Plays the theme music|It runs many times every second.
3|A Creative Commons "BY" licence requires anyone who uses the work to|Give credit (attribution) to the creator|Pay a fee every time|Never share the work|Change the work completely|Always check the licence before using someone else's media.
3|Replacing a green background with another image is called|Chroma keying|Rotoscoping|Colour grading|Motion blur|Green is used because it is far from human skin tones.
`,
arts: `
1|Calypso music is most closely associated with the Carnival of|Trinidad and Tobago|Jamaica|The Bahamas|Cuba|Calypso grew out of Trinidad and Tobago's Carnival traditions.
1|The steelpan was developed in the 20th century in|Trinidad and Tobago|Barbados|Haiti|Belize|Made from oil drums, it is Trinidad and Tobago's national instrument.
1|Reggae music originated in|Jamaica|Puerto Rico|Grenada|St Lucia|Bob Marley helped take reggae around the world.
1|In music, "tempo" means the|Speed of the music|Loudness|Pitch|Number of instruments|Tempo is often measured in beats per minute.
1|The words spoken between characters in a play are the|Dialogue|Choreography|Costume|Score|Choreography is the planned movement in dance.
1|How many keys does a standard piano have?|88|76|100|66|There are 52 white keys and 36 black keys.
1|A play with a sad ending, in which the main character falls, is a|Tragedy|Comedy|Farce|Pantomime|"Macbeth" is a famous tragedy.
1|In music, "forte" (f) means|Loud|Soft|Fast|Slow|"Piano" (p) means soft.
1|The person who creates and arranges dance movements is a|Choreographer|Conductor|Cinematographer|Playwright|A playwright writes plays.
2|Soca music, a blend of soul and calypso, was pioneered in the 1970s by|Lord Shorty (Ras Shorty I)|Bob Marley|Harry Belafonte|Jimmy Cliff|He called it "soul calypso".
2|A speech in which a character alone on stage speaks their thoughts aloud is a|Soliloquy|Aside|Prologue|Chorus|"To be, or not to be" from "Hamlet" is a famous soliloquy.
2|In 4/4 time, a whole note (semibreve) lasts|4 beats|2 beats|1 beat|8 beats|A half note (minim) lasts 2 beats.
2|The part of the stage nearest the audience is|Downstage|Upstage|Stage left|The wings|Upstage is the part furthest from the audience.
2|Kumina, a drumming and dance tradition with African roots, comes from|Jamaica|Trinidad|Cuba|Martinique|It is strongly linked to the parish of St Thomas.
2|The Mighty Sparrow is world-famous as a|Calypsonian|Reggae singer|Steelpan tuner|Dancehall DJ|He won many Calypso Monarch titles in Trinidad and Tobago.
2|Several notes played together at the same time form a|Chord|Scale|Rest|Clef|The C major chord is C, E and G.
2|In theatre, "blocking" means|Planning actors' movements and positions on stage|Stopping the play early|Building the set|Writing the script|The director usually sets the blocking in rehearsal.
2|A scale with five notes per octave is a|Pentatonic scale|Chromatic scale|Major scale|Whole-tone scale|"Penta" means five; the chromatic scale uses all twelve semitones.
3|The "fourth wall" in theatre is|The wall between the actors and the audience|The back wall of the stage|The front curtain|The lighting rig|Breaking the fourth wall means speaking directly to the audience.
3|Stanislavski's "system" of acting asks actors to|Use real emotion and inner motivation to give truthful performances|Always speak directly to the audience|Wear masks|Avoid rehearsal|It later influenced "method acting".
3|Bertolt Brecht's "epic theatre" aimed to make audiences|Think critically instead of getting emotionally lost in the story|Cry as much as possible|Forget they were in a theatre|Only laugh|His "alienation effect" reminds the audience they are watching a play.
3|In 4/4 time, a dotted half note (dotted minim) lasts|3 beats|2 beats|4 beats|1.5 beats|A dot adds half the note's value: 2 + 1 = 3.
3|Jamaica's Little Theatre Movement has staged which tradition since 1941, opening each Boxing Day?|The National Pantomime|The Calypso Monarch|Reggae Month|Jonkonnu Parade|The pantomime blends Jamaican folklore, music and satire.
3|CARIFESTA is|A regional festival of Caribbean arts and culture|A cricket tournament|A music award|A Carnival held only in Barbados|The first CARIFESTA was held in Guyana in 1972.
3|A piece for a solo instrument accompanied by an orchestra is a|Concerto|Symphony|Sonata|Opera|A symphony is for the full orchestra; a sonata is usually for one or two instruments.
3|In music, "dynamics" refers to|Changes in loudness|Changes in speed|The key signature|The time signature|A crescendo means gradually getting louder.
3|In dance, "canon" means dancers|Perform the same movement one after another|All move at exactly the same time|Stand completely still|Improvise freely|When everyone moves together, it is called unison.
3|The Moko Jumbie, seen at Caribbean Carnivals, is a masquerader who|Dances on tall stilts|Breathes fire|Works a string puppet|Performs in the water|The tradition has West African roots.
`,
lang: `
1|"Hola" in Spanish means|Hello|Goodbye|Thank you|Please|"Adiós" means goodbye.
1|"Merci" in French means|Thank you|Please|Sorry|Hello|"S'il vous plaît" means please.
1|The Spanish word for "water" is|Agua|Leche|Pan|Fuego|"Leche" is milk and "pan" is bread.
1|"Bonjour" is French for|Good day / Hello|Good night|See you later|Excuse me|"Bonsoir" means good evening.
1|In Spanish, "rojo" is the colour|Red|Blue|Green|Yellow|Azul = blue, verde = green, amarillo = yellow.
1|The French number "trois" is|3|13|30|2|Un, deux, trois: one, two, three.
1|"¿Cómo te llamas?" means|What is your name?|How old are you?|Where are you from?|How are you?|You answer "Me llamo…".
1|"Le chien" in French is|The dog|The cat|The house|The car|"Le chat" is the cat.
1|The Spanish word for "school" is|Escuela|Iglesia|Playa|Tienda|Playa = beach and tienda = shop.
2|Which French phrase means "the beach"?|La plage|La gare|Le marché|La rue|Useful in Martinique, Guadeloupe and Saint-Martin!
2|In Spanish, "Tengo quince años" means|I am fifteen years old|I have fifteen books|It is fifteen o'clock|I have fifteen friends|Spanish uses "tener" (to have) to give your age.
2|The French verb "être" means|To be|To have|To go|To do|Avoir = to have, aller = to go, faire = to do.
2|"Je m'appelle Marie" means|My name is Marie|I am calling Marie|I like Marie|I am with Marie|Literally, "I call myself Marie".
2|The Spanish word for "Thursday" is|Jueves|Martes|Viernes|Domingo|Lunes, martes, miércoles, jueves, viernes, sábado, domingo.
2|In French, "vingt" is the number|20|12|200|2|Vingt = 20 and cent = 100.
2|"¿Dónde está la biblioteca?" means|Where is the library?|When does the library open?|Who is the librarian?|How big is the library?|Biblioteca = library.
2|Which Spanish verb means "to eat"?|Comer|Beber|Correr|Dormir|Beber = to drink, correr = to run, dormir = to sleep.
2|The French word "fromage" means|Cheese|Bread|Butter|Fish|Pain = bread, beurre = butter, poisson = fish.
3|The Spanish word "librería" is a false friend. It actually means|Bookshop|Library|Freedom|Laboratory|"Library" in Spanish is "biblioteca".
3|The French past tense formed with "avoir" or "être" plus a past participle is the|Passé composé|Imparfait|Futur simple|Conditionnel|For example, "J'ai mangé" (I ate / I have eaten).
3|Complete: "Espero que tú ___ bien." (estar)|estés|estás|estar|estuviste|"Esperar que" is followed by the present subjunctive.
3|Which French sentence correctly says "I went to the market"?|Je suis allé au marché.|J'ai allé au marché.|Je vais au marché.|J'allais le marché.|"Aller" takes "être" in the passé composé.
3|The Spanish word "embarazada" means|Pregnant|Embarrassed|Busy|Tired|A classic false friend; "embarrassed" is "avergonzado/a".
3|Which Spanish verb "to be" is used for location, as in "The hotel is in Santo Domingo"?|Estar|Ser|Haber|Tener|"El hotel está en Santo Domingo."
3|Which of these French nouns is feminine?|La maison|Le livre|Le soleil|Le jardin|"La" marks a feminine noun; "le" a masculine one.
3|The French expression "Il fait chaud" means|It is hot (weather)|He is making soup|It is cold|He is happy|French uses "faire" for weather: "il fait froid" = it is cold.
3|How do you say "We speak Spanish" in Spanish?|Hablamos español|Hablan español|Habla español|Hablo español|The -amos ending goes with "nosotros" (we).
`,
sxm: `
1|What is the capital of Sint Maarten?|Philipsburg|Marigot|Oranjestad|Willemstad|Oranjestad is the capital of Aruba; Willemstad of Curaçao.
1|What is the capital of Jamaica?|Kingston|Montego Bay|Ocho Rios|Spanish Town|Spanish Town was the capital until 1872.
1|What is the capital of Trinidad and Tobago?|Port of Spain|San Fernando|Scarborough|Chaguanas|Scarborough is the main town of Tobago.
1|What is the capital of Barbados?|Bridgetown|Speightstown|Holetown|Oistins|Speightstown is the island's second town.
1|What is the capital of Guyana?|Georgetown|New Amsterdam|Linden|Paramaribo|Paramaribo is the capital of neighbouring Suriname.
1|Nassau is the capital of|The Bahamas|Belize|The Cayman Islands|The Turks and Caicos Islands|George Town is the capital of the Cayman Islands.
1|The island of Hispaniola is shared by|Haiti and the Dominican Republic|Cuba and Haiti|Puerto Rico and the Dominican Republic|Jamaica and Haiti|Haiti lies in the west of the island and the Dominican Republic in the east.
1|What is the official language of Suriname?|Dutch|English|Spanish|Portuguese|Sranan Tongo is the everyday lingua franca.
1|Papiamento (Papiamentu) is widely spoken in|Aruba, Bonaire and Curaçao|Jamaica, Barbados and Grenada|Haiti and the Dominican Republic|Belize and Guyana|It is a Creole with Portuguese, Spanish, Dutch and African influences.
2|The 1648 agreement that divided St. Martin between the French and the Dutch is the|Treaty of Concordia|Treaty of Paris|Treaty of Utrecht|Treaty of Chaguaramas|It was signed on 23 March 1648.
2|Which Dutch Caribbean island is crowned by the dormant volcano Mount Scenery?|Saba|Bonaire|Aruba|Curaçao|Mount Scenery is the highest point in the whole Kingdom of the Netherlands.
2|Pepperpot, a slow-cooked meat stew made with cassareep, is the national dish of|Guyana|Barbados|Jamaica|The Bahamas|Cassareep is made from cassava.
2|Which British Overseas Territory has The Valley as its capital?|Anguilla|Montserrat|The British Virgin Islands|The Cayman Islands|Road Town is the capital of the British Virgin Islands.
2|The Pitch Lake, the world's largest natural deposit of asphalt, is in|Trinidad|Jamaica|Barbados|Guyana|It lies near La Brea in south-west Trinidad.
2|Kaieteur Falls, one of the world's most powerful single-drop waterfalls, is in|Guyana|Suriname|Belize|Dominica|It is on the Potaro River.
2|Ackee and saltfish is the national dish of|Jamaica|Barbados|Antigua and Barbuda|Saint Lucia|Barbados's national dish is cou-cou and flying fish.
2|The Soufrière Hills volcano, which buried the old capital Plymouth, is on|Montserrat|St. Vincent|Dominica|St. Kitts|Eruptions from 1995 onwards turned the south of the island into an exclusion zone.
2|"Out of many, one people" is the motto of|Jamaica|Barbados|Trinidad and Tobago|Guyana|"Pride and Industry" is Barbados's motto.
3|In 2025, the Netherlands Antilles guilder on Sint Maarten and Curaçao was replaced by the|Caribbean guilder (Cg)|Euro|Eastern Caribbean dollar|Aruban florin|Like the old guilder, it is pegged to the US dollar at 1.79.
3|Which is the largest island in the Caribbean?|Cuba|Hispaniola|Jamaica|Puerto Rico|Hispaniola is the second largest.
3|The northern Lesser Antilles, from the Virgin Islands to Guadeloupe, are traditionally called the|Leeward Islands|Windward Islands|Greater Antilles|ABC Islands|The ABC islands are Aruba, Bonaire and Curaçao.
3|Which Caribbean country won its independence first, in 1804?|Haiti|Jamaica|Cuba|The Dominican Republic|Haiti declared independence on 1 January 1804.
3|Barbados became a parliamentary republic in|2021|1966|1979|2016|It replaced the British monarch as head of state on 30 November 2021.
3|Belize, the only English-speaking country in Central America, became independent in|1981|1962|1966|1973|Independence came on 21 September 1981.
3|Which Dutch Caribbean island, with Kralendijk as its capital, is famous for its flamingos and salt pans?|Bonaire|Aruba|Curaçao|Saba|Large flamingo colonies feed in the salt pans in the south of the island.
3|The Kalinago Territory, home to the Indigenous Kalinago people, is in|Dominica|St. Vincent|Grenada|Guyana|It was established in 1903 on Dominica's east coast.
3|Cockburn Town, on Grand Turk, is the capital of|The Turks and Caicos Islands|The Bahamas|The Cayman Islands|The British Virgin Islands|Providenciales is the territory's most populated island.
`,
gk: `
1|How many continents are there?|7|5|6|8|Africa, Antarctica, Asia, Australia (Oceania), Europe, North America and South America.
1|Which planet is known as the Red Planet?|Mars|Venus|Jupiter|Saturn|Iron oxide (rust) in its soil gives Mars its colour.
1|How many days are in a leap year?|366|365|364|360|An extra day, 29 February, is added.
1|What is the largest planet in our solar system?|Jupiter|Saturn|Earth|Neptune|Jupiter is more than twice as massive as all the other planets combined.
1|Which instrument normally has six strings?|Guitar|Violin|Harp|Cello|Violins and cellos have four strings.
1|How many minutes are in a day?|1,440|1,200|3,600|720|24 × 60 = 1,440.
1|Mixing blue and yellow paint gives|Green|Purple|Orange|Brown|Blue and red make purple; red and yellow make orange.
1|In which sport would a bowler deliver a "yorker"?|Cricket|Football|Tennis|Basketball|A yorker is aimed at the batter's feet.
1|How many players does one netball team have on the court?|7|5|9|11|GS, GA, WA, C, WD, GD and GK.
2|Who painted the Mona Lisa?|Leonardo da Vinci|Michelangelo|Pablo Picasso|Vincent van Gogh|He painted it in the early 1500s.
2|In which year did humans first land on the Moon?|1969|1959|1972|1965|Apollo 11 landed in July 1969.
2|Which Jamaican sprinter ran the 100 m in 9.58 seconds in 2009?|Usain Bolt|Yohan Blake|Asafa Powell|Shelly-Ann Fraser-Pryce|He set that world record in Berlin.
2|What is the hardest natural substance?|Diamond|Gold|Iron|Quartz|Diamond scores 10 on the Mohs scale.
2|The Summer Olympic Games are normally held every|4 years|2 years|5 years|3 years|The Summer and Winter Games are two years apart.
2|Which ocean lies between Africa and Australia?|Indian Ocean|Atlantic Ocean|Pacific Ocean|Arctic Ocean|It is the third-largest ocean.
2|The West Indies won the first two men's Cricket World Cups, in|1975 and 1979|1983 and 1987|1992 and 1996|1966 and 1970|Both times under captain Clive Lloyd.
2|Who proposed the World Wide Web in 1989?|Tim Berners-Lee|Bill Gates|Steve Jobs|Alan Turing|He was working at CERN in Switzerland.
2|"UN" stands for the|United Nations|Universal Network|United Nationalities|Union of Nations|It was founded in 1945.
3|Which chemical element has the symbol Fe?|Iron|Fluorine|Lead|Fermium|From the Latin "ferrum"; lead is Pb.
3|Who wrote the novel "Things Fall Apart" (1958)?|Chinua Achebe|Wole Soyinka|Ngũgĩ wa Thiong'o|Ben Okri|Achebe was a Nigerian novelist.
3|The Rosetta Stone helped scholars to decode|Egyptian hieroglyphs|Mayan glyphs|Chinese characters|Norse runes|It carries the same text in three scripts.
3|What is the smallest prime number?|2|1|0|3|1 is not prime; 2 is the only even prime.
3|Which Trinidadian sprinter won Olympic 100 m gold in 1976?|Hasely Crawford|Ato Boldon|Keshorn Walcott|Richard Thompson|It was Trinidad and Tobago's first Olympic gold medal.
3|The Universal Declaration of Human Rights was adopted by the UN in|1948|1919|1965|1989|10 December is now Human Rights Day.
3|Which language has the most NATIVE speakers in the world?|Mandarin Chinese|English|Spanish|Hindi|English has the most speakers overall when second-language speakers are counted.
3|Which UN body has five permanent members with the power of veto?|The Security Council|The General Assembly|The International Court of Justice|UNESCO|The five are China, France, Russia, the UK and the USA.
3|In which city is the International Court of Justice?|The Hague|Geneva|New York|Brussels|The Hague is in the Netherlands.
3|The line of latitude at about 23.5° N is the|Tropic of Cancer|Tropic of Capricorn|Arctic Circle|Equator|The Tropic of Capricorn is at about 23.5° S.
`
  };

  /* Spin & Solve phrases: hint|PHRASE (letters are hidden; spaces and punctuation are always shown) */
  const PRAW = {
    comm: 'Comm Studies term|CODE SWITCHING;Comm Studies term|NON-VERBAL COMMUNICATION;Language|THE CREOLE CONTINUUM;Research|PRIMARY SOURCE;Writing|FORMAL REGISTER;Comm Studies term|CHANNEL OF COMMUNICATION;Language|DIGLOSSIA;Speaking|AUDIENCE ANALYSIS;Idiom|ACTIONS SPEAK LOUDER THAN WORDS',
    eng: 'Literary device|PERSONIFICATION;Literary device|DRAMATIC IRONY;Caribbean novel|IN THE CASTLE OF MY SKIN;Caribbean novel|A HOUSE FOR MR BISWAS;Poetic form|SHAKESPEAREAN SONNET;Idiom|BREAK THE ICE;Caribbean proverb|WHAT SWEETEN GOAT MOUTH DOES BURN HE TAIL;Literary device|ALLITERATION;Story element|THE PROTAGONIST',
    carib: 'Historic event|THE HAITIAN REVOLUTION;Regional body|CARIBBEAN COMMUNITY;History|THE MIDDLE PASSAGE;Historic figure|TOUSSAINT LOUVERTURE;Historic system|INDENTURESHIP;Indigenous peoples|THE TAINO AND THE KALINAGO;Caribbean proverb|ONE ONE COCO FULL BASKET;Famous book|CAPITALISM AND SLAVERY;Historic trade|THE TRIANGULAR TRADE',
    geo: 'Weather|HURRICANE SEASON;Ecosystem|MANGROVE FOREST;Ecosystem|CORAL REEF;Landform|RAIN SHADOW;Process|THE WATER CYCLE;Environment|CLIMATE CHANGE;Weather|NORTH-EAST TRADE WINDS;Science|THE GREENHOUSE EFFECT;Slogan|REDUCE, REUSE, RECYCLE',
    bio: 'Process|PHOTOSYNTHESIS;Body system|CIRCULATORY SYSTEM;Molecule|DEOXYRIBONUCLEIC ACID;Health|NON-COMMUNICABLE DISEASES;Ecology|FOOD CHAIN;Evolution|NATURAL SELECTION;Blood|WHITE BLOOD CELLS;Cell part|CELL MEMBRANE;Process|CELL DIVISION',
    chem: 'Chart|THE PERIODIC TABLE;Reaction|NEUTRALISATION;Bonding|COVALENT BOND;Gas|CARBON DIOXIDE;Separation|FRACTIONAL DISTILLATION;Compound|SODIUM CHLORIDE;Group|NOBLE GASES;Group|ALKALI METALS;Particle|THE ELECTRON',
    phys: "Law|NEWTON'S FIRST LAW;Energy|KINETIC ENERGY;Force|GRAVITY;Waves|ELECTROMAGNETIC SPECTRUM;Electricity|OHM'S LAW;Light|REFRACTION OF LIGHT;Energy|RENEWABLE ENERGY;Sound|SPEED OF SOUND;Electricity|PARALLEL CIRCUIT",
    math: "Theorem|PYTHAGORAS' THEOREM;Statistics|MEAN, MEDIAN AND MODE;Shape|EQUILATERAL TRIANGLE;Algebra|QUADRATIC EQUATION;Number|PRIME NUMBERS;Geometry|AREA OF A CIRCLE;Calculus|DIFFERENTIATION;Chance|PROBABILITY;Geometry|RIGHT ANGLE",
    bus: 'Economics|SUPPLY AND DEMAND;Accounting|BALANCE SHEET;Accounting|DOUBLE-ENTRY BOOKKEEPING;Marketing|THE MARKETING MIX;Economics|OPPORTUNITY COST;Entrepreneurship|BUSINESS PLAN;Planning|SWOT ANALYSIS;Economics|INFLATION;Finance|BREAK-EVEN POINT',
    logi: 'Field|SUPPLY CHAIN MANAGEMENT;Method|JUST IN TIME;Place|DISTRIBUTION CENTRE;Equipment|SHIPPING CONTAINER;Concept|REVERSE LOGISTICS;Stock control|SAFETY STOCK;Stock rule|FIRST IN, FIRST OUT;Document|BILL OF LADING;Delivery|LAST-MILE DELIVERY',
    it: 'Hardware|CENTRAL PROCESSING UNIT;Concept|ALGORITHM;Number system|BINARY CODE;Network|WIRELESS ROUTER;Security|STRONG PASSWORDS;Threat|PHISHING EMAIL;Software|OPERATING SYSTEM;Database|PRIMARY KEY;Internet|WORLD WIDE WEB',
    dm: 'Composition|RULE OF THIRDS;Animation|KEYFRAME ANIMATION;Colour model|RED, GREEN AND BLUE;Planning|STORYBOARD;Sound|FOLEY SOUND EFFECTS;Game design|GAME MECHANICS;Graphics|VECTOR GRAPHICS;Video|GREEN SCREEN;Animation principle|SQUASH AND STRETCH',
    arts: "Instrument|STEELPAN;Music|CALYPSO AND SOCA;Carnival|J'OUVERT MORNING;Theatre|BREAKING THE FOURTH WALL;Carnival character|MOKO JUMBIE;Theatre|STAGE DIRECTIONS;Music|REGGAE MUSIC;Dance|CHOREOGRAPHY;Caribbean proverb|WHEN COCKROACH GIVE DANCE, HE NEVER INVITE FOWL",
    lang: 'Spanish phrase|BUENAS NOCHES;Spanish phrase|POR FAVOR;Spanish phrase|DE NADA;Spanish phrase|HASTA LUEGO;Spanish phrase|MUCHO GUSTO;French phrase|MERCI BEAUCOUP;French phrase|AU REVOIR;French phrase|BONNE NUIT;French phrase|COMMENT ALLEZ-VOUS',
    sxm: "Capital|PHILIPSBURG;Capital|BRIDGETOWN;Waterfall|KAIETEUR FALLS;History|TREATY OF CONCORDIA;Natural wonder|PITCH LAKE;Volcano|SOUFRIERE HILLS;Festival|JUNKANOO;Capital|PARAMARIBO;Caribbean proverb|CHICKEN MERRY, HAWK DEH NEAR;Motto|OUT OF MANY, ONE PEOPLE",
    gk: "Idiom|THE BALL IS IN YOUR COURT;Idiom|ONCE IN A BLUE MOON;Caribbean proverb|NEW BROOM SWEEPS CLEAN, BUT OLD BROOM KNOWS THE CORNERS;Caribbean proverb|WHO CAN'T HEAR WILL FEEL;Idiom|BETTER LATE THAN NEVER;Space|THE SOLAR SYSTEM;Caribbean proverb|MONKEY KNOW WHAT TREE TO CLIMB;Idiom|PRACTICE MAKES PERFECT;Idiom|EVERY CLOUD HAS A SILVER LINING"
  };

  /* Closest Without Going Over: subject | question | answer | unit | approx flag (1 = approximate / classroom estimate) | price flag | note */
  const NRAW = `
sxm|A 500 ml bottle of water at a Caribbean supermarket|1|US$|1|1|Classroom estimate: prices vary by shop and over time.
sxm|A fresh coconut (water) from a roadside vendor|4|US$|1|1|Classroom estimate: roughly $3–5.
sxm|A plate of BBQ chicken with rice and peas at a roadside food stall|12|US$|1|1|Classroom estimate: plates are often $10–15.
sxm|One short local bus or minibus ride|2|US$|1|1|Classroom estimate: short bus rides usually cost a couple of dollars.
sxm|A basic scientific calculator for school|15|US$|1|1|Classroom estimate: basic models cost about $10–20.
sxm|A graphing calculator for CAPE Maths|120|US$|1|1|Classroom estimate: popular graphing models often cost over $100.
sxm|A loaf of sliced bread|4|US$|1|1|Classroom estimate: imported goods cost more on small islands.
sxm|A dozen eggs|5|US$|1|1|Classroom estimate.
sxm|A gallon of milk|8|US$|1|1|Classroom estimate: much milk is imported, which raises the price.
sxm|An evening cinema ticket for one adult|12|US$|1|1|Classroom estimate.
sxm|A taxi from the airport to the capital for one or two passengers|25|US$|1|1|Classroom estimate: many islands use set taxi fares by zone.
sxm|A 10 lb bag of rice|8|US$|1|1|Classroom estimate.
sxm|A basic school backpack|30|US$|1|1|Classroom estimate.
sxm|A pair of black school shoes|50|US$|1|1|Classroom estimate.
sxm|At the fixed rate, how many Eastern Caribbean dollars (EC$) is a US$10 bill worth?|27|EC$|0|0|The peg is US$1 = EC$2.70, so 10 × 2.70 = 27.
sxm|Year of the Treaty of Concordia, which divided St. Martin|1648||0|0|Signed on 23 March 1648.
sxm|Year Barbados became a parliamentary republic|2021||0|0|30 November 2021.
sxm|Year slavery was abolished in the Dutch colonies, including Suriname and Curaçao|1863||0|0|1 July 1863, marked as Emancipation Day (Keti Koti in Suriname).
sxm|Height of Blue Mountain Peak, Jamaica's highest point, in metres|2256|m|1|0|About 2,256 m above sea level.
sxm|Area of Barbados, in square kilometres|432|km²|1|0|About 432 km².
sxm|Year Guyana became independent|1966||0|0|26 May 1966.
sxm|Approximate air distance from Kingston, Jamaica, to Miami, in kilometres|950|km|1|0|About 950 km (around 590 miles).
carib|Year Columbus first reached the Caribbean|1492||0|0|October 1492, in the Bahamas.
carib|Year Haiti declared independence|1804||0|0|1 January 1804.
carib|Year emancipation took effect in the British Caribbean|1834||0|0|1 August 1834, followed by apprenticeship until 1838.
carib|Year CARICOM was established by the Treaty of Chaguaramas|1973||0|0|Signed on 4 July 1973.
carib|Year Jamaica and Trinidad and Tobago became independent|1962||0|0|August 1962.
carib|Year the West Indies Federation was formed|1958||0|0|It lasted until 1962.
carib|Year of the Morant Bay Rebellion in Jamaica|1865||0|0|Led by Paul Bogle.
carib|Year the University College of the West Indies opened at Mona|1948||0|0|It became the independent UWI in 1962.
geo|Minimum sustained wind speed (mph) for a Category 5 hurricane|157|mph|0|0|Saffir–Simpson scale: 157 mph or higher.
geo|Height of Mount Everest, in metres|8849|m|1|0|About 8,849 m (2020 survey).
geo|Percentage of Earth's surface covered by water|71|%|1|0|About 71%.
geo|Number of months in the official Atlantic hurricane season|6|months|0|0|1 June to 30 November.
bio|Bones in the adult human skeleton|206|bones|0|0|Babies start with about 300, and some fuse.
bio|Chromosomes in a normal human body cell|46|chromosomes|0|0|23 pairs.
bio|Teeth in a full adult set, including wisdom teeth|32|teeth|0|0|Children have 20 milk teeth.
chem|Number of elements in the modern Periodic Table|118|elements|0|0|Up to oganesson (118).
chem|Percentage of the air that is nitrogen|78|%|1|0|About 78%; oxygen is about 21%.
chem|Atomic number of gold|79||0|0|Symbol Au.
phys|Speed of sound in air at about 20 °C, in metres per second|343|m/s|1|0|About 343 m/s; it changes with temperature.
phys|Speed of light in a vacuum, in kilometres per SECOND|299792|km/s|1|0|About 300,000 km every second.
phys|Freezing point of water in degrees Fahrenheit|32|°F|0|0|It boils at 212 °F.
math|Sum of the interior angles of a hexagon, in degrees|720|°|0|0|(6 − 2) × 180 = 720.
math|Seconds in one hour|3600|s|0|0|60 × 60 = 3,600.
math|2 to the power 10|1024||0|0|Also the number of bytes in a binary kilobyte.
it|Number of bits in an IPv4 address|32|bits|0|0|IPv6 uses 128 bits.
it|Year Tim Berners-Lee proposed the World Wide Web|1989||0|0|He was working at CERN.
it|Number of characters in standard (7-bit) ASCII|128|characters|0|0|Codes 0 to 127.
eng|Number of lines in a sonnet|14|lines|0|0|For example, three quatrains and a couplet.
eng|Number of syllables in a traditional haiku|17|syllables|0|0|5 + 7 + 5.
eng|Year Derek Walcott won the Nobel Prize in Literature|1992||0|0|He was born in St Lucia.
eng|Year William Shakespeare was born|1564||0|0|In Stratford-upon-Avon.
arts|Number of keys on a standard piano|88|keys|0|0|52 white and 36 black.
arts|Year the first CARIFESTA was held, in Guyana|1972||0|0|A regional festival of the arts.
gk|Minutes in one day|1440|minutes|0|0|24 × 60.
gk|Year of the first crewed Moon landing|1969||0|0|Apollo 11.
gk|Year the West Indies won the first men's Cricket World Cup|1975||0|0|At Lord's, under Clive Lloyd.
gk|Year the Universal Declaration of Human Rights was adopted|1948||0|0|On 10 December 1948.
gk|Usain Bolt's 2009 100 m world-record time, in seconds|9.58|s|0|0|Set in Berlin in 2009.
bus|Break-even units: fixed costs $1,000, price $15, variable cost $10 per unit|200|units|0|0|1,000 ÷ (15 − 10).
logi|TEU value of one 40-foot container|2|TEU|0|0|TEU = twenty-foot equivalent unit.
`;
  /* ===================== PARSING ===================== */
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = seed >>> 0 || 1; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuf(arr, r) { const a = arr.slice(); r = r || Math.random; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  const BANK = {};   // subject id -> [{id, s, d, q, o[4], a, why}]
  SUBJECTS.forEach(S0 => {
    BANK[S0.id] = String(QRAW[S0.id] || '').trim().split('\n').filter(Boolean).map((line, n) => {
      const p = line.split('|'); const right = p[2];
      const opts = shuf([p[2], p[3], p[4], p[5]], rng(hash(p[1])));
      return { id: S0.id + n, s: S0.id, d: +p[0], q: p[1], o: opts, a: opts.indexOf(right), why: p[6] || '' };
    });
  });
  const PHRASES = {};
  Object.keys(PRAW).forEach(k => { PHRASES[k] = PRAW[k].split(';').map(x => { const [h, t] = x.split('|'); return { h, t }; }); });
  const NUMS = NRAW.trim().split('\n').map((l, n) => { const p = l.split('|'); return { id: n, s: p[0], q: p[1], a: +p[2], u: p[3], ap: p[4] === '1', price: p[5] === '1', note: p[6] || '' }; });
  const SUB = id => SUBJECTS.find(x => x.id === id);
  const ALLQ = () => SUBJECTS.flatMap(x => BANK[x.id]);

  /* ===================== STATE ===================== */
  const G = { board: null, spin: null, closest: null, ladder: null };
  const PICK = { board: [], spin: 'mix', closest: 'mix', ladder: 'mix' };
  let API0 = null, spinTok = 0;
  const reduced = () => { try { return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } };
  const fmt = n => (Math.round(n * 100) / 100).toLocaleString('en-US');
  function rec(api) { const S = api.S; if (!S.arcade || typeof S.arcade !== 'object') S.arcade = { b: 0, s: 0, c: 0, l: 0, n: 0 }; return S.arcade; }
  function best(api, key, val) { const R = rec(api); R.n = (R.n || 0) + 1; const nb = val > (R[key] || 0); if (nb) R[key] = val; api.save(); return nb; }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, ''); }
  function typedOK(typed, right) { const t = norm(typed), r = norm(right); if (!t) return false; if (t === r) return true; return r.length > 4 && t.length >= 4 && r.includes(t) && t.length >= r.length * 0.6; }
  const L4 = 'ABCD';

  /* ===================== CSS ===================== */
  const CSS = `
.ar-wrap{display:flex;flex-direction:column;gap:16px;min-width:0}
.ar-cab{--n1:#0A1433;--n2:#13265e;--ng:#FFD766;--ng2:#F5C542;--nc:#5FE3FF;--np:#FF5FA2;background:radial-gradient(600px 220px at 50% -40px,rgba(255,215,102,.22),transparent 70%),linear-gradient(180deg,var(--n2),var(--n1));color:#F1F4FF;border:2px solid rgba(255,215,102,.55);border-radius:22px;box-shadow:0 0 0 4px rgba(10,20,51,.6),0 0 24px rgba(255,215,102,.25),inset 0 0 30px rgba(0,0,0,.35);padding:clamp(14px,3vw,26px);display:flex;flex-direction:column;gap:14px;min-width:0;position:relative}
.ar-cab h2,.ar-cab h3{color:#FFF;margin:0}
.ar-cab .hint,.ar-cab .ar-muted{color:#C9D3F5}
.ar-neon{font-weight:900;letter-spacing:.06em;text-transform:uppercase;color:var(--ng);text-shadow:0 0 6px rgba(255,215,102,.8),0 0 18px rgba(255,215,102,.45);font-size:clamp(1.3rem,4.6vw,2rem);line-height:1.1;margin:0}
.ar-marq{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;border-bottom:2px dashed rgba(255,215,102,.35);padding-bottom:10px}
.ar-bulbs{height:10px;border-radius:99px;background:radial-gradient(circle,#FFE9A6 0 2px,transparent 3px) 0 50%/16px 10px repeat-x;opacity:.9}
.ar-strip{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;background:#0A1433;color:#F1F4FF;border:1px solid rgba(255,215,102,.45);border-radius:14px;padding:8px 12px;font-size:.88rem;font-weight:700}
.ar-strip b{color:#FFD766;font-variant-numeric:tabular-nums}
.ar-strip .ar-hs{white-space:nowrap}
.ar-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:14px}
.ar-game{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:8px;padding:18px;border-radius:18px;background:linear-gradient(180deg,#1a3278,#0A1433);border:2px solid rgba(255,215,102,.6);box-shadow:0 6px 0 #05091c,0 0 18px rgba(255,215,102,.22);color:#F1F4FF;transition:transform .12s,box-shadow .12s;min-width:0}
.ar-game:hover{transform:translateY(-3px);box-shadow:0 9px 0 #05091c,0 0 28px rgba(255,215,102,.4)}
.ar-game:focus-visible{outline:3px solid #5FE3FF;outline-offset:3px}
.ar-game:active{transform:translateY(4px);box-shadow:0 2px 0 #05091c}
.ar-game .ar-gi{font-size:2.2rem;line-height:1}
.ar-game h3{color:#FFD766;font-size:1.15rem;text-shadow:0 0 8px rgba(255,215,102,.5);margin:0}
.ar-game .ar-gm{font-size:.9rem;color:#C9D3F5}
.ar-game .ar-gb{font-size:.78rem;font-weight:800;color:#5FE3FF;letter-spacing:.04em;text-transform:uppercase}
.ar-subs{display:flex;flex-wrap:wrap;gap:8px}
.ar-sub{border:2px solid rgba(255,215,102,.35);background:#0f1f50;color:#F1F4FF;border-radius:12px;padding:8px 11px;font-weight:700;font-size:.9rem;text-align:left;display:inline-flex;gap:6px;align-items:center;box-shadow:0 3px 0 #05091c}
.ar-sub:hover{border-color:#FFD766}
.ar-sub.on{background:linear-gradient(180deg,#FFF0B3,#FFD766);color:#0A1433;border-color:#FFD766}
.ar-sub:active{transform:translateY(2px);box-shadow:0 1px 0 #05091c}
.ar-btn3d{border:0;border-radius:12px;padding:10px 16px;font-weight:800;font-size:.98rem;background:linear-gradient(180deg,#FFF0B3,#FFD766 50%);color:#0A1433;box-shadow:0 5px 0 #A97A0E,0 8px 16px -6px rgba(255,215,102,.6);transition:transform .08s,box-shadow .08s}
.ar-btn3d:active{transform:translateY(4px);box-shadow:0 1px 0 #A97A0E}
.ar-btn3d.cy{background:linear-gradient(180deg,#C9F6FF,#5FE3FF 55%);box-shadow:0 5px 0 #1a7f99}
.ar-btn3d.pk{background:linear-gradient(180deg,#FFD0E4,#FF7FB5 55%);box-shadow:0 5px 0 #a33368}
.ar-btn3d.dk{background:#0f1f50;color:#F1F4FF;border:2px solid rgba(255,215,102,.45);box-shadow:0 4px 0 #05091c}
.ar-btn3d[disabled]{opacity:.45;cursor:not-allowed;transform:none}
.ar-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.ar-score{display:flex;gap:10px;flex-wrap:wrap}
.ar-pill{background:#05091c;border:1px solid rgba(255,215,102,.5);border-radius:99px;padding:4px 12px;font-weight:800;color:#FFD766;font-variant-numeric:tabular-nums;white-space:nowrap}
.ar-pill.cy{color:#5FE3FF;border-color:rgba(95,227,255,.5)}
.ar-pill.bad{color:#FF8FB5;border-color:rgba(255,95,162,.5)}
/* board */
.ar-board{display:grid;grid-template-columns:repeat(var(--cols,6),minmax(0,1fr));gap:6px}
.ar-bh{background:#05091c;border:1px solid rgba(255,215,102,.4);border-radius:10px;padding:6px 4px;text-align:center;font-size:.74rem;font-weight:800;color:#FFF;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-height:62px;line-height:1.15;overflow-wrap:anywhere;hyphens:auto}
.ar-bh .ar-bi{font-size:1.25rem}
.ar-legend{display:none;font-size:.8rem;color:#C9D3F5;gap:4px 10px;flex-wrap:wrap}
.ar-tile{border:0;border-radius:10px;min-height:52px;font-weight:900;font-size:clamp(.95rem,2.6vw,1.45rem);color:#FFD766;background:linear-gradient(180deg,#1d3a8f,#10225a);box-shadow:inset 0 0 0 2px rgba(255,215,102,.35),0 4px 0 #05091c;text-shadow:0 0 6px rgba(255,215,102,.55);font-variant-numeric:tabular-nums;padding:4px 2px}
.ar-tile:hover:not([disabled]){background:linear-gradient(180deg,#2850b8,#14307a)}
.ar-tile:active:not([disabled]){transform:translateY(3px);box-shadow:inset 0 0 0 2px rgba(255,215,102,.35),0 1px 0 #05091c}
.ar-tile[disabled]{background:#081030;color:transparent;text-shadow:none;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06);cursor:default}
.ar-clue{background:linear-gradient(180deg,#1a3278,#0d1d4c);border:2px solid rgba(255,215,102,.55);border-radius:16px;padding:clamp(14px,3vw,24px);display:flex;flex-direction:column;gap:12px}
.ar-clue .ar-q{font-size:clamp(1.05rem,2.8vw,1.35rem);font-weight:800;color:#FFF;line-height:1.35}
.ar-ops{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:10px}
.ar-op{display:flex;gap:10px;align-items:center;text-align:left;border:2px solid rgba(255,215,102,.4);background:#0A1433;color:#F1F4FF;border-radius:999px;padding:10px 14px;font-weight:700;font-size:.98rem;box-shadow:0 4px 0 #05091c;min-width:0}
.ar-op .ar-l{flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#FFD766;color:#0A1433;font-weight:900;font-size:.85rem}
.ar-op:hover:not([disabled]){border-color:#FFD766;background:#13265e}
.ar-op:active:not([disabled]){transform:translateY(3px);box-shadow:0 1px 0 #05091c}
.ar-op.right{border-color:#43E08A;background:#0d4a2c}
.ar-op.wrong{border-color:#FF5F7E;background:#5a1027}
.ar-op.gone{display:none}
.ar-op[disabled]{cursor:default}
.ar-fb{border-radius:12px;padding:10px 14px;font-weight:600}
.ar-fb.good{background:rgba(67,224,138,.15);border:1px solid #43E08A;color:#D8FFE8}
.ar-fb.bad{background:rgba(255,95,126,.14);border:1px solid #FF5F7E;color:#FFE0E7}
.ar-fb.note{background:rgba(95,227,255,.12);border:1px solid #5FE3FF;color:#E0F9FF}
.ar-in{border:2px solid rgba(255,215,102,.45);background:#05091c;color:#FFF;border-radius:12px;padding:9px 12px;font:inherit;min-width:0;flex:1 1 180px;max-width:100%}
.ar-in:focus-visible{outline:3px solid #5FE3FF}
/* wheel */
.ar-spinwrap{display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:18px;align-items:start}
.ar-wheelbox{position:relative;width:100%;max-width:300px;margin:0 auto}
.ar-wheel{width:100%;height:auto;display:block;filter:drop-shadow(0 0 14px rgba(255,215,102,.35))}
.ar-wheel .ar-rot{transform-box:fill-box;transform-origin:center}
.ar-wheel .ar-rot.go{transition:transform 3s cubic-bezier(.15,.7,.15,1)}
.ar-result{text-align:center;font-weight:900;font-size:1.2rem;color:#FFD766;text-shadow:0 0 8px rgba(255,215,102,.6);min-height:1.5em}
.ar-result.bk{color:#FF8FB5;text-shadow:0 0 8px rgba(255,95,162,.6)}
.ar-puz{container-type:inline-size;display:flex;flex-wrap:wrap;gap:10px 16px;justify-content:center;background:#05091c;border:2px solid rgba(95,227,255,.45);border-radius:14px;padding:12px;box-shadow:inset 0 0 18px rgba(95,227,255,.15)}
.ar-word{display:flex;gap:3px;flex-wrap:nowrap}
.ar-cell{--cw:min(34px,calc((100cqi - 2px) / var(--n,10) - 3px));width:var(--cw);height:calc(var(--cw) * 1.28);border-radius:5px;background:#F1F4FF;color:#0A1433;display:grid;place-items:center;font-weight:900;font-size:calc(var(--cw) * .62);box-shadow:inset 0 -3px 0 rgba(0,0,0,.15)}
.ar-cell.hid{background:linear-gradient(180deg,#2a8f6a,#1b6b4f);color:transparent}
.ar-cell.p{background:transparent;color:#F1F4FF;box-shadow:none;width:auto;min-width:8px}
.ar-cell.new{background:#5FE3FF}
.ar-hint{text-align:center;font-weight:800;color:#5FE3FF;letter-spacing:.08em;text-transform:uppercase;font-size:.85rem}
.ar-keys{display:grid;grid-template-columns:repeat(13,minmax(0,1fr));gap:5px}
.ar-key{border:0;border-radius:8px;padding:8px 0;font-weight:900;font-size:.95rem;background:linear-gradient(180deg,#FFFFFF,#D8DEF2);color:#0A1433;box-shadow:0 4px 0 #7d87a8;min-width:0}
.ar-key.v{background:linear-gradient(180deg,#C9F6FF,#5FE3FF);box-shadow:0 4px 0 #1a7f99}
.ar-key:active:not([disabled]){transform:translateY(3px);box-shadow:0 1px 0 #7d87a8}
.ar-key[disabled]{opacity:.42;cursor:not-allowed;box-shadow:none}
.ar-key.used{opacity:.18;text-decoration:line-through}
/* closest */
.ar-tag{display:inline-block;font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.06em;padding:2px 8px;border-radius:99px;background:#FF7FB5;color:#2a0516}
.ar-tag.cy{background:#5FE3FF;color:#05222b}
.ar-bids{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,130px),1fr));gap:8px}
.ar-bid{background:#05091c;border:2px solid rgba(255,255,255,.12);border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;gap:2px}
.ar-bid b{font-size:1.15rem;color:#FFF;font-variant-numeric:tabular-nums}
.ar-bid.over{border-color:#FF5F7E}.ar-bid.over b{color:#FF8FB5;text-decoration:line-through}
.ar-bid.you{background:#13265e;border-color:#FFD766}
.ar-bid.win{border-color:#43E08A;box-shadow:0 0 14px rgba(67,224,138,.4)}
.ar-bid span{font-size:.78rem;color:#C9D3F5}
.ar-steps{display:flex;gap:6px;flex-wrap:wrap}
.ar-step{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;font-weight:900;background:#05091c;border:2px solid rgba(255,215,102,.3);color:#C9D3F5}
.ar-step.ok{background:#0d4a2c;border-color:#43E08A;color:#D8FFE8}
.ar-step.no{background:#5a1027;border-color:#FF5F7E;color:#FFE0E7}
.ar-step.cur{border-color:#FFD766;color:#FFD766;box-shadow:0 0 10px rgba(255,215,102,.5)}
/* ladder */
.ar-lad{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:16px;align-items:start}
.ar-rungs{list-style:none;margin:0;padding:8px;display:flex;flex-direction:column-reverse;gap:3px;background:#05091c;border:2px solid rgba(255,215,102,.4);border-radius:14px}
.ar-rung{display:flex;justify-content:space-between;gap:8px;padding:3px 10px;border-radius:8px;font-weight:800;font-size:.86rem;color:#C9D3F5;font-variant-numeric:tabular-nums}
.ar-rung.safe{color:#FFF}
.ar-rung.safe .ar-rn::after{content:" ◆";color:#5FE3FF}
.ar-rung.done{color:#FFD766}
.ar-rung.cur{background:linear-gradient(90deg,#FFD766,#F5C542);color:#0A1433;box-shadow:0 0 14px rgba(255,215,102,.6)}
.ar-life{display:flex;gap:8px;flex-wrap:wrap}
.ar-poll{display:flex;flex-direction:column;gap:6px;background:#05091c;border-radius:12px;padding:10px 12px;border:1px solid rgba(95,227,255,.45)}
.ar-pb{display:grid;grid-template-columns:22px minmax(0,1fr) 44px;gap:8px;align-items:center;font-weight:800;font-size:.9rem}
.ar-pb .ar-bar{height:16px;border-radius:99px;background:#13265e;overflow:hidden}
.ar-pb .ar-bar i{display:block;height:100%;background:linear-gradient(90deg,#5FE3FF,#FFD766);border-radius:99px}
.ar-big{font-size:clamp(1.6rem,6vw,2.6rem);font-weight:900;color:#FFD766;text-shadow:0 0 12px rgba(255,215,102,.6);font-variant-numeric:tabular-nums;line-height:1.1}
.ar-wager{display:flex;flex-wrap:wrap;gap:8px}
.ar-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (max-width:760px){
  .ar-spinwrap{grid-template-columns:1fr}
  .ar-wheelbox{max-width:240px}
  .ar-lad{grid-template-columns:1fr}
  .ar-rungs{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));padding:6px;gap:4px;order:-1}
  .ar-rung{flex-direction:column;align-items:center;gap:0;padding:3px 2px;font-size:.66rem;text-align:center;line-height:1.2}
  .ar-rung.safe .ar-rn::after{content:"◆"}
  .ar-keys{grid-template-columns:repeat(9,minmax(0,1fr))}
  .ar-key{padding:9px 0}
}
@media (max-width:480px){
  .ar-board{gap:4px}
  .ar-bh{font-size:.6rem;min-height:56px;padding:4px 2px}
  .ar-bh .ar-bn{display:none}
  .ar-legend{display:flex}
  .ar-bh .ar-bi{font-size:1.35rem}
  .ar-tile{min-height:44px;font-size:.9rem;border-radius:8px}
  .ar-cab{padding:12px;border-radius:16px}
}
@media (prefers-reduced-motion: reduce){
  .ar-game,.ar-game:hover,.ar-wheel .ar-rot,.ar-wheel .ar-rot.go{transition:none!important;transform:none}
}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ===================== SHARED UI ===================== */
  const GAMES = [
    { k: 'board', icon: '🟦', name: 'Category Board', blurb: 'Pick a category and a value, answer the clue, find the hidden Double, then wager it all in the Final Round.', badge: '6 categories × 5 clues' },
    { k: 'spin', icon: '🎡', name: 'Spin & Solve', blurb: 'Spin the neon wheel, call consonants, buy vowels and solve the hidden phrase before your spins run out.', badge: '3 puzzles per game' },
    { k: 'closest', icon: '🎯', name: 'Closest Without Going Over', blurb: 'Guess the number (prices, years, distances) against three rivals, then climb the Higher-or-Lower ladder.', badge: '5 bids + ladder round' },
    { k: 'ladder', icon: '🪜', name: 'Climb the Ladder', blurb: '15 questions, rising difficulty, two safe havens and three lifelines. Walk away or go for 1,000,000 points.', badge: 'points, not money' }
  ];
  function strip(api) {
    const R = rec(api);
    return `<div class="ar-strip" role="status" aria-label="High scores"><span>🏆 High scores</span>
      <span class="ar-hs">Board <b>${fmt(R.b || 0)}</b></span><span class="ar-hs">Spin <b>${fmt(R.s || 0)}</b></span><span class="ar-hs">Closest <b>${fmt(R.c || 0)}</b></span><span class="ar-hs">Ladder <b>${fmt(R.l || 0)}</b> pts</span><span class="ar-hs">Games played <b>${R.n || 0}</b></span></div>`;
  }
  function head(api, g, extra) {
    const G0 = GAMES.find(x => x.k === g);
    return `<div class="ar-marq"><h2 class="ar-neon">${G0.icon} ${api.esc(G0.name)}</h2><div class="ar-row"><button type="button" class="ar-btn3d dk" data-go="arcade">⬅ Arcade</button>${extra || ''}</div></div><div class="ar-bulbs" aria-hidden="true"></div>`;
  }
  function subChip(api, s, on, game) {
    return `<button type="button" class="ar-sub ${on ? 'on' : ''}" aria-pressed="${on}" data-px="pick" data-pv="arcade" data-g="${game}" data-k="${s.id}"><span aria-hidden="true">${s.icon}</span>${api.esc(s.short)}</button>`;
  }
  function picker(api, game) {
    const multi = game === 'board';
    const sel = PICK[game];
    let subs = SUBJECTS;
    if (game === 'closest') { const has = new Set(NUMS.map(n => n.s)); subs = SUBJECTS.filter(s => has.has(s.id)); }
    const isOn = id => multi ? sel.includes(id) : sel === id;
    let h = `<p class="ar-muted">${multi ? 'Choose up to <b>6 subject areas</b> for the board columns (empty spaces are filled at random).' : 'Choose a <b>subject area</b> or play a mix.'}</p><div class="ar-subs" role="group" aria-label="Subject areas">`;
    if (!multi) h += `<button type="button" class="ar-sub ${sel === 'mix' ? 'on' : ''}" aria-pressed="${sel === 'mix'}" data-px="pick" data-pv="arcade" data-g="${game}" data-k="mix"><span aria-hidden="true">🎲</span>Mix of everything</button>`;
    if (game === 'closest') h += `<button type="button" class="ar-sub ${sel === 'price' ? 'on' : ''}" aria-pressed="${sel === 'price'}" data-px="pick" data-pv="arcade" data-g="${game}" data-k="price"><span aria-hidden="true">🏷️</span>Price check (Caribbean)</button>`;
    h += subs.map(s => subChip(api, s, isOn(s.id), game)).join('') + `</div>`;
    h += `<div class="ar-row"><button type="button" class="ar-btn3d" data-px="start" data-pv="arcade" data-g="${game}" data-arf="1">▶ Start game</button>${multi && sel.length ? `<button type="button" class="ar-btn3d dk" data-px="pickclear" data-pv="arcade">Clear (${sel.length})</button>` : ''}</div>`;
    return h;
  }
  function opBtns(api, q, act, st0) {
    // st0: {pick, done, hidden[]}
    return `<div class="ar-ops">${q.o.map((o, i) => {
      const cls = st0.done ? (i === q.a ? 'right' : i === st0.pick ? 'wrong' : '') : '';
      const gone = (st0.hidden || []).includes(i);
      return `<button type="button" class="ar-op ${cls} ${gone ? 'gone' : ''}" data-px="${act}" data-pv="arcade" data-i="${i}" ${st0.done || gone ? 'disabled' : ''} ${i === 0 && !st0.done ? 'data-arf="1"' : ''}><span class="ar-l">${L4[i]}</span><span>${api.esc(o)}</span></button>`;
    }).join('')}</div>`;
  }
  function pickQs(sub, d, n, avoid) {
    avoid = avoid || new Set();
    let pool = (sub === 'mix' ? ALLQ() : BANK[sub]).filter(q => q.d === d && !avoid.has(q.id));
    if (pool.length < n) pool = pool.concat(ALLQ().filter(q => q.d === d && !avoid.has(q.id) && !pool.includes(q)));
    return shuf(pool).slice(0, n);
  }

  /* ===================== 1. CATEGORY BOARD ===================== */
  const VAL = [100, 200, 300, 400, 500], VD = [1, 1, 2, 2, 3];
  function boardNew() {
    let subs = PICK.board.slice(0, 6);
    const rest = shuf(SUBJECTS.map(s => s.id).filter(id => !subs.includes(id)));
    while (subs.length < 6) subs.push(rest.shift());
    const used = new Set();
    const cols = subs.map(s => VAL.map((v, r) => { const q = pickQs(s, VD[r], 1, used)[0]; used.add(q.id); return { q, v, used: false }; }));
    const dc = Math.floor(Math.random() * 6), dr = 1 + Math.floor(Math.random() * 3);
    cols[dc][dr].dbl = true;
    const fs = subs[Math.floor(Math.random() * 6)];
    const fq = pickQs(fs, 3, 1, used)[0];
    return { subs, cols, score: 0, open: null, phase: 'board', final: { s: fs, q: fq, wager: null, pick: null }, answered: 0, right: 0 };
  }
  function boardHTML(api) {
    const B = G.board;
    let h = head(api, 'board', B ? `<button type="button" class="ar-btn3d dk" data-px="bnew" data-pv="arcade">↺ New game</button>` : '');
    if (!B) return h + picker(api, 'board');
    h += `<div class="ar-score"><span class="ar-pill ${B.score < 0 ? 'bad' : ''}">Score ${fmt(B.score)}</span><span class="ar-pill cy">Clues ${B.answered}/30</span></div>`;
    if (B.phase === 'board') {
      h += `<div class="ar-board" style="--cols:6" aria-label="Category board">`;
      h += B.subs.map(s => { const S0 = SUB(s); return `<div class="ar-bh"><span class="ar-bi" aria-hidden="true">${S0.icon}</span><span class="ar-bn">${api.esc(S0.short)}</span><span class="ar-sr">${api.esc(S0.name)}</span></div>`; }).join('');
      for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
        const t = B.cols[c][r], S0 = SUB(B.subs[c]);
        h += `<button type="button" class="ar-tile" data-px="btile" data-pv="arcade" data-c="${c}" data-r="${r}" ${t.used ? 'disabled aria-label="Used"' : `aria-label="${api.esc(S0.short)} for ${t.v}"`} ${!t.used && !h.includes('data-arf') ? 'data-arf="1"' : ''}>${t.used ? '' : t.v}</button>`;
      }
      h += `</div><div class="ar-legend" aria-hidden="true">${B.subs.map(s => `<span>${SUB(s).icon} ${api.esc(SUB(s).short)}</span>`).join('')}</div><div class="ar-row"><button type="button" class="ar-btn3d pk" data-px="bfinal" data-pv="arcade">★ Go to the Final Round</button><span class="ar-muted">Wrong answers lose the tile value. One tile hides a Double!</span></div>`;
    } else if (B.phase === 'wager') {
      const t = B.cols[B.open.c][B.open.r], max = Math.max(B.score, 500);
      h += `<div class="ar-clue"><p class="ar-big">★ DOUBLE! ★</p><p>You found the hidden Double in <b>${api.esc(SUB(B.subs[B.open.c]).name)}</b>. Wager up to <b>${fmt(max)}</b> points before you see the clue.</p>
        <div class="ar-wager">${[...new Set([t.v, Math.round(max / 2 / 50) * 50 || 50, max])].map((w, i) => `<button type="button" class="ar-btn3d ${i === 2 ? 'pk' : ''}" data-px="bwager" data-pv="arcade" data-w="${w}" ${i === 0 ? 'data-arf="1"' : ''}>${i === 2 || w === max ? 'All in: ' : 'Wager '}${fmt(w)}</button>`).join('')}</div></div>`;
    } else if (B.phase === 'clue' || B.phase === 'shown') {
      const t = B.cols[B.open.c][B.open.r], q = t.q, done = B.phase === 'shown', stake = B.open.wager || t.v;
      h += `<div class="ar-clue"><span class="ar-hint">${SUB(B.subs[B.open.c]).icon} ${api.esc(SUB(B.subs[B.open.c]).short)} · ${fmt(stake)}${t.dbl ? ' · DOUBLE' : ''}</span><p class="ar-q">${api.esc(q.q)}</p>
        ${opBtns(api, q, 'bpick', { pick: B.open.pick, done })}
        ${done ? '' : `<div class="ar-row"><label class="ar-sr" for="ar-type">Type your answer</label><input id="ar-type" class="ar-in" placeholder="…or type your answer" autocomplete="off"><button type="button" class="ar-btn3d cy" data-px="btype" data-pv="arcade">Lock it in</button></div>`}
        ${done ? `<p class="ar-fb ${B.open.ok ? 'good' : 'bad'}">${B.open.ok ? `Correct! +${fmt(stake)}.` : `Not this time: −${fmt(stake)}. The answer is <b>${api.esc(q.o[q.a])}</b>.`} ${api.esc(q.why)}</p><div class="ar-row"><button type="button" class="ar-btn3d" data-px="bback" data-pv="arcade" data-arf="1">${B.answered >= 30 ? '★ On to the Final Round' : 'Back to the board ➜'}</button></div>` : ''}</div>`;
    } else if (B.phase === 'fwager') {
      const F = B.final, S0 = SUB(F.s);
      h += `<div class="ar-clue"><p class="ar-big">FINAL ROUND</p><p>Category: <b>${S0.icon} ${api.esc(S0.name)}</b> (a hard one). You have <b>${fmt(B.score)}</b> points. How much will you wager?</p>
        <div class="ar-wager">${[...new Set([0, Math.floor(B.score / 4), Math.floor(B.score / 2), B.score])].map((w, i, a) => `<button type="button" class="ar-btn3d ${i === a.length - 1 ? 'pk' : ''}" data-px="fwager" data-pv="arcade" data-w="${w}" ${i === 0 ? 'data-arf="1"' : ''}>${w === B.score ? 'All in: ' : 'Wager '}${fmt(w)}</button>`).join('')}</div></div>`;
    } else if (B.phase === 'final' || B.phase === 'fshown') {
      const F = B.final, done = B.phase === 'fshown';
      h += `<div class="ar-clue"><span class="ar-hint">Final Round · ${api.esc(SUB(F.s).short)} · wager ${fmt(F.wager)}</span><p class="ar-q">${api.esc(F.q.q)}</p>${opBtns(api, F.q, 'fpick', { pick: F.pick, done })}
        ${done ? `<p class="ar-fb ${F.ok ? 'good' : 'bad'}">${F.ok ? 'Correct!' : `The answer is <b>${api.esc(F.q.o[F.q.a])}</b>.`} ${api.esc(F.q.why)}</p><div class="ar-row"><button type="button" class="ar-btn3d" data-px="bend" data-pv="arcade" data-arf="1">See final score ➜</button></div>` : ''}</div>`;
    } else if (B.phase === 'done') {
      const win = B.score > 0;
      h += `<div class="ar-clue" role="status"><p class="ar-big">${win ? 'GAME WON!' : 'GAME OVER'}</p><p>Final score: <b>${fmt(B.score)}</b> · ${B.right} of ${B.answered} clues correct${B.final.wager != null ? ` · Final Round ${B.final.ok ? 'won' : 'lost'}` : ''}.</p>
        ${B.newBest ? '<p class="ar-fb good">🏆 New Category Board high score!</p>' : ''}${!win ? '<p class="ar-fb note">You need a score above zero to win. Try the 100s and 200s first to build a cushion.</p>' : ''}
        <div class="ar-row"><button type="button" class="ar-btn3d" data-px="bnew" data-pv="arcade" data-arf="1">Play again</button><button type="button" class="ar-btn3d dk" data-go="arcade">Back to the arcade</button></div></div>`;
    }
    return h;
  }
  function boardFinish(api) {
    const B = G.board; B.phase = 'done';
    B.newBest = best(api, 'b', B.score);
    if (B.score > 0) { api.reward(Math.min(8, 2 + Math.floor(B.score / 1500)), 'Category Board win'); } else api.chime('bad');
  }
  function boardAnswer(api, ok) {
    const B = G.board, t = B.cols[B.open.c][B.open.r], stake = B.open.wager || t.v;
    B.open.ok = ok; B.score += ok ? stake : -stake; B.answered++; if (ok) B.right++;
    B.phase = 'shown'; api.chime(ok ? 'good' : 'bad');
  }
  function boardClick(a, el, api) {
    const B = G.board;
    if (a === 'bnew') { G.board = null; return api.render(); }
    if (!B) return;
    if (a === 'btile') {
      if (B.phase !== 'board') return;
      const c = +el.dataset.c, r = +el.dataset.r, t = B.cols[c][r]; if (t.used) return;
      t.used = true; B.open = { c, r, pick: null };
      B.phase = t.dbl ? 'wager' : 'clue'; if (t.dbl) api.chime('good');
    } else if (a === 'bwager') { if (B.phase !== 'wager') return; B.open.wager = +el.dataset.w; B.phase = 'clue'; }
    else if (a === 'bpick') { if (B.phase !== 'clue') return; const i = +el.dataset.i; B.open.pick = i; boardAnswer(api, i === B.cols[B.open.c][B.open.r].q.a); }
    else if (a === 'btype') {
      if (B.phase !== 'clue') return; const inp = document.getElementById('ar-type'), v = inp ? inp.value : '';
      if (!v.trim()) { api.toast('Type an answer first, or pick one of the options.'); return; }
      const q = B.cols[B.open.c][B.open.r].q, ok = typedOK(v, q.o[q.a]);
      B.open.pick = ok ? q.a : q.o.findIndex(o => norm(o) === norm(v)); if (B.open.pick < 0) B.open.pick = null;
      boardAnswer(api, ok);
    }
    else if (a === 'bback') { if (B.phase !== 'shown') return; B.open = null; B.phase = B.answered >= 30 ? 'pre' : 'board'; if (B.phase === 'pre') return boardClick('bfinal', el, api); }
    else if (a === 'bfinal') {
      if (B.score <= 0) { B.final.wager = null; boardFinish(api); }
      else B.phase = 'fwager';
    }
    else if (a === 'fwager') { if (B.phase !== 'fwager') return; B.final.wager = Math.max(0, Math.min(B.score, +el.dataset.w)); B.phase = 'final'; }
    else if (a === 'fpick') { if (B.phase !== 'final') return; const F = B.final, i = +el.dataset.i; F.pick = i; F.ok = i === F.q.a; B.score += F.ok ? F.wager : -F.wager; B.phase = 'fshown'; api.chime(F.ok ? 'good' : 'bad'); }
    else if (a === 'bend') { if (B.phase !== 'fshown') return; boardFinish(api); }
    api.render();
  }

  /* ===================== 2. SPIN & SOLVE ===================== */
  const WEDGES = [500, 300, 650, 'BANKRUPT', 400, 900, 350, 600, 'LOSE A TURN', 250, 800, 450, 550, 300, 700, 1000];
  const WCOL = ['#FF5FA2', '#5FE3FF', '#FFD766', '#111111', '#43E08A', '#B57BFF', '#FF9F43', '#5FE3FF', '#F1F4FF', '#FF5FA2', '#FFD766', '#43E08A', '#B57BFF', '#FF9F43', '#5FE3FF', '#FFD766'];
  const VOWELS = 'AEIOU', VOWEL_COST = 250, SPINS = 10, ROUNDS = 3;
  function spinNew() {
    const sub = PICK.spin;
    let pool = sub === 'mix' ? Object.keys(PHRASES).flatMap(k => PHRASES[k].map(p => Object.assign({ s: k }, p))) : PHRASES[sub].map(p => Object.assign({ s: sub }, p));
    const puz = shuf(pool).slice(0, ROUNDS);
    return { sub, puz, round: 0, total: 0, solved: 0, rot: 0, R: spinRound(puz[0]), phase: 'play', log: [] };
  }
  function spinRound(p) { return { p, got: new Set(), bank: 0, spins: SPINS, wedge: null, need: false, msg: 'Spin the wheel to start!', bad: false, done: false, ok: false, fresh: new Set() }; }
  const lettersIn = t => new Set(t.replace(/[^A-Z]/g, '').split(''));
  function allRevealed(R) { return [...lettersIn(R.p.t)].every(l => R.got.has(l)); }
  function consLeft(R) { return [...lettersIn(R.p.t)].some(l => !VOWELS.includes(l) && !R.got.has(l)); }
  function wheelSVG(api, rot, spinning) {
    const n = WEDGES.length, cx = 150, cy = 150, r = 140, seg = 360 / n;
    const pt = (ang, rad) => { const t = (ang - 90) * Math.PI / 180; return [cx + rad * Math.cos(t), cy + rad * Math.sin(t)]; };
    let paths = '';
    WEDGES.forEach((w, i) => {
      const a0 = i * seg, a1 = a0 + seg, [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r), mid = a0 + seg / 2;
      const dark = w === 'BANKRUPT', fill = WCOL[i], txt = dark ? '#FFFFFF' : '#0A1433';
      const [tx, ty] = pt(mid, r * 0.62);
      const label = typeof w === 'number' ? String(w) : (w === 'BANKRUPT' ? 'BANKRUPT' : 'LOSE TURN');
      paths += `<path d="M${cx},${cy} L${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 0 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z" fill="${fill}" stroke="#0A1433" stroke-width="2"/>`;
      paths += `<text x="${tx.toFixed(2)}" y="${ty.toFixed(2)}" fill="${txt}" font-size="${typeof w === 'number' ? 15 : 9.5}" font-weight="900" text-anchor="middle" dominant-baseline="middle" transform="rotate(${(mid - 90).toFixed(2)} ${tx.toFixed(2)} ${ty.toFixed(2)})" font-family="system-ui,sans-serif">${label}</text>`;
    });
    let bulbs = ''; for (let i = 0; i < n; i++) { const [bx, by] = pt(i * seg, r + 4); bulbs += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="3" fill="#FFE9A6"/>`; }
    return `<svg class="ar-wheel" viewBox="0 0 300 312" role="img" aria-label="Prize wheel${spinning ? ', spinning' : ''}">
      <circle cx="150" cy="150" r="147" fill="#0A1433" stroke="#FFD766" stroke-width="4"/>
      <g class="ar-rot" style="transform:rotate(${rot}deg)">${paths}</g>${bulbs}
      <circle cx="150" cy="150" r="22" fill="#FFD766" stroke="#0A1433" stroke-width="3"/><text x="150" y="151" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="900" fill="#0A1433" font-family="system-ui,sans-serif">SPIN</text>
      <path d="M150,24 L138,0 L162,0 Z" fill="#FFFFFF" stroke="#0A1433" stroke-width="2"/></svg>`;
  }
  function puzzleHTML(api, R, revealAll) {
    const longest = Math.max(10, ...R.p.t.split(' ').map(w => w.length));
    return `<div class="ar-puz" style="--n:${longest}" aria-label="Puzzle">${R.p.t.split(' ').map(w => `<span class="ar-word">${w.split('').map(ch => {
      if (!/[A-Z]/.test(ch)) return `<span class="ar-cell p">${api.esc(ch)}</span>`;
      const show = revealAll || R.got.has(ch);
      return `<span class="ar-cell ${show ? (R.fresh.has(ch) ? 'new' : '') : 'hid'}">${show ? ch : ''}</span>`;
    }).join('')}</span>`).join('')}</div><p class="ar-sr" aria-live="polite">${api.esc(R.p.t.replace(/[A-Z]/g, c => R.got.has(c) ? c : '_ '))}</p>`;
  }
  function spinHTML(api) {
    const P = G.spin;
    let h = head(api, 'spin', P ? `<button type="button" class="ar-btn3d dk" data-px="snew" data-pv="arcade">↺ New game</button>` : '');
    if (!P) return h + picker(api, 'spin') + `<p class="ar-muted">How to play: spin, then call a consonant to win the wedge value for every time it appears. Vowels cost ${VOWEL_COST}. You have ${SPINS} spins per puzzle. BANKRUPT empties your round bank; LOSE A TURN costs an extra spin.</p>`;
    if (P.phase === 'done') {
      const win = P.solved >= 2;
      return h + `<div class="ar-clue" role="status"><p class="ar-big">${win ? 'YOU WIN!' : 'GAME OVER'}</p><p>You solved <b>${P.solved} of ${ROUNDS}</b> puzzles and banked <b>${fmt(P.total)}</b> points.</p>
        <ul>${P.log.map(l => `<li>${l.ok ? '✅' : '❌'} ${api.esc(l.h)}: <b>${api.esc(l.t)}</b></li>`).join('')}</ul>
        ${P.newBest ? '<p class="ar-fb good">🏆 New Spin & Solve high score!</p>' : ''}${win ? '' : '<p class="ar-fb note">Solve at least 2 of 3 puzzles to win. Tip: call common consonants first (R, S, T, N, L).</p>'}
        <div class="ar-row"><button type="button" class="ar-btn3d" data-px="snew" data-pv="arcade" data-arf="1">Play again</button><button type="button" class="ar-btn3d dk" data-go="arcade">Back to the arcade</button></div></div>`;
    }
    const R = P.R, busy = !!P.spinning, canSpin = !R.done && !R.need && !busy && R.spins > 0 && consLeft(R);
    h += `<div class="ar-score"><span class="ar-pill">Puzzle ${P.round + 1}/${ROUNDS}</span><span class="ar-pill">Round bank ${fmt(R.bank)}</span><span class="ar-pill cy">Total ${fmt(P.total)}</span><span class="ar-pill ${R.spins <= 2 ? 'bad' : 'cy'}">Spins left ${R.spins}</span></div>`;
    h += `<div class="ar-spinwrap"><div><div class="ar-wheelbox">${wheelSVG(api, P.rot, busy)}</div><p class="ar-result ${R.bad ? 'bk' : ''}" aria-live="polite">${busy ? 'Spinning…' : api.esc(R.msg)}</p>
      <div class="ar-row" style="justify-content:center"><button type="button" class="ar-btn3d" data-px="sspin" data-pv="arcade" ${canSpin ? 'data-arf="1"' : 'disabled'}>🎡 Spin</button></div></div>
      <div class="ar-wrap"><p class="ar-hint">Category: ${api.esc(R.p.h)} · ${SUB(R.p.s) ? SUB(R.p.s).icon + ' ' + api.esc(SUB(R.p.s).short) : ''}</p>${puzzleHTML(api, R, R.done)}`;
    if (R.done) {
      h += `<p class="ar-fb ${R.ok ? 'good' : 'bad'}">${R.ok ? `Solved! You bank ${fmt(R.win)} points.` : 'Out of spins. The answer is shown above.'}</p><div class="ar-row"><button type="button" class="ar-btn3d" data-px="snext" data-pv="arcade" data-arf="1">${P.round + 1 >= ROUNDS ? 'See results ➜' : 'Next puzzle ➜'}</button></div>`;
    } else {
      const ks = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      h += `<p class="ar-muted" style="margin:0">${R.need ? `<b style="color:#FFD766">Pick a consonant</b> for ${fmt(R.wedge)} each (or type it on your keyboard).` : R.spins <= 0 ? '<b style="color:#FF8FB5">No spins left: buy a vowel or solve now!</b>' : !consLeft(R) ? 'No consonants left: buy vowels or solve.' : `Spin, buy a vowel (${VOWEL_COST}) or solve.`}</p>
        <div class="ar-keys" role="group" aria-label="Letters">${ks.map(k => { const v = VOWELS.includes(k), used = R.got.has(k), en = !busy && !used && (v ? (!R.need && R.bank >= VOWEL_COST) : R.need); return `<button type="button" class="ar-key ${v ? 'v' : ''} ${used ? 'used' : ''}" data-px="sletter" data-pv="arcade" data-k="${k}" aria-label="${v ? 'Buy vowel ' : 'Consonant '}${k}${used ? ', already called' : ''}" ${en ? '' : 'disabled'} ${en && R.need && !v && !h.includes('data-arf') ? 'data-arf="1"' : ''}>${k}</button>`; }).join('')}</div>
        <div class="ar-row"><label class="ar-sr" for="ar-solve">Solve the puzzle</label><input id="ar-solve" class="ar-in" placeholder="Type the full answer to solve" autocomplete="off" ${busy || R.need ? 'disabled' : ''}><button type="button" class="ar-btn3d cy" data-px="ssolve" data-pv="arcade" ${busy || R.need ? 'disabled' : ''}>Solve</button><button type="button" class="ar-btn3d dk" data-px="sgive" data-pv="arcade" ${busy || R.need ? 'disabled' : ''}>Give up</button></div>`;
    }
    h += `</div></div>`;
    return h;
  }
  function spinUse(R, n) { R.spins = Math.max(0, R.spins - n); }
  function spinResolve(api, idx) {
    const P = G.spin; if (!P) return; const R = P.R, w = WEDGES[idx];
    P.spinning = false; R.fresh = new Set();
    if (w === 'BANKRUPT') { R.bank = 0; R.msg = 'BANKRUPT! Your round bank is gone.'; R.bad = true; api.chime('bad'); }
    else if (w === 'LOSE A TURN') { spinUse(R, 1); R.msg = 'LOSE A TURN! That costs an extra spin.'; R.bad = true; api.chime('bad'); }
    else { R.wedge = w; R.need = true; R.msg = `${w} points per letter!`; R.bad = false; }
    spinCheckOut(R);
  }
  function spinCheckOut(R) { if (!R.need && R.spins <= 0 && R.bank < VOWEL_COST) R.lastChance = true; }
  function spinFinishRound(api, ok) {
    const P = G.spin, R = P.R; R.done = true; R.ok = ok; R.need = false;
    if (ok) { R.win = Math.max(R.bank, 300); P.total += R.win; P.solved++; R.got = lettersIn(R.p.t); api.chime('good'); } else api.chime('bad');
    P.log.push({ h: R.p.h, t: R.p.t, ok });
  }
  function spinClick(a, el, api) {
    const P = G.spin;
    if (a === 'snew') { G.spin = null; spinTok++; return api.render(); }
    if (!P || P.phase !== 'play') return; const R = P.R;
    if (a === 'sspin') {
      if (P.spinning || R.done || R.need || R.spins <= 0 || !consLeft(R)) return;
      spinUse(R, 1);
      const idx = Math.floor(Math.random() * WEDGES.length), seg = 360 / WEDGES.length;
      const jitter = (Math.random() - 0.5) * seg * 0.6, target = (360 - (idx * seg + seg / 2) + jitter + 720) % 360;
      const cur = ((P.rot % 360) + 360) % 360;
      const newRot = P.rot + 360 * 5 + ((target - cur + 360) % 360);
      if (reduced()) { P.rot = newRot; spinResolve(api, idx); return api.render(); }
      P.spinning = true; const tok = ++spinTok; api.render();
      const g = document.querySelector('.ar-wheel .ar-rot');
      if (g) { void g.getBoundingClientRect(); g.classList.add('go'); g.style.transform = `rotate(${newRot}deg)`; }
      P.rot = newRot;
      setTimeout(() => { if (tok !== spinTok || G.spin !== P) return; spinResolve(api, idx); if (api.S.loc && api.S.loc.v === 'arcade' && api.S.loc.tab === 'spin') api.render(); }, 3150);
      return;
    }
    if (a === 'sletter') {
      if (P.spinning || R.done) return; const k = el.dataset.k; if (!k || R.got.has(k)) return;
      const v = VOWELS.includes(k), n = R.p.t.split('').filter(c => c === k).length;
      if (v) { if (R.need || R.bank < VOWEL_COST) return; R.bank -= VOWEL_COST; }
      else { if (!R.need) return; R.need = false; }
      R.got.add(k); R.fresh = new Set([k]);
      if (n) { if (!v) R.bank += n * R.wedge; R.msg = `There ${n === 1 ? 'is 1' : 'are ' + n} ${k}${n === 1 ? '' : "'s"}!${v ? '' : ` +${fmt(n * R.wedge)}`}`; R.bad = false; api.chime('good'); }
      else { R.msg = `Sorry, no ${k}.${v ? '' : ' That spin is gone.'}`; R.bad = true; api.chime('bad'); }
      if (allRevealed(R)) { R.msg = 'Every letter is showing: solve it now!'; R.bad = false; }
    }
    if (a === 'ssolve') {
      if (P.spinning || R.need) return; const inp = document.getElementById('ar-solve'), v = inp ? inp.value : '';
      if (!v.trim()) { api.toast('Type your answer in the box first.'); return; }
      if (norm(v) === norm(R.p.t)) spinFinishRound(api, true);
      else {
        R.msg = `“${v.trim().slice(0, 40)}” is not right.`; R.bad = true; api.chime('bad');
        if (R.spins <= 0) spinFinishRound(api, false); else { spinUse(R, 1); if (R.spins <= 0 && R.bank < VOWEL_COST && !allRevealed(R)) R.msg += ' Last chance: solve!'; }
      }
    }
    if (a === 'sgive') { if (P.spinning || R.need || R.done) return; spinFinishRound(api, false); }
    if (a === 'snext') {
      if (!R.done) return;
      P.round++;
      if (P.round >= ROUNDS) { P.phase = 'done'; P.newBest = best(api, 's', P.total); if (P.solved >= 2) api.reward(Math.min(8, P.solved * 2 + (P.solved === ROUNDS ? 2 : 0)), 'Spin & Solve win'); }
      else P.R = spinRound(P.puz[P.round]);
    }
    api.render();
  }

  /* ===================== 3. CLOSEST WITHOUT GOING OVER ===================== */
  const RIVALS = ['Keisha', 'Jerome', 'Anya'];
  const dp = n => { const s = String(n); return s.includes('.') ? s.split('.')[1].length : 0; };
  function closestNew() {
    const sel = PICK.closest;
    let pool = sel === 'mix' ? NUMS : sel === 'price' ? NUMS.filter(n => n.price) : NUMS.filter(n => n.s === sel);
    let items = shuf(pool).slice(0, 5);
    if (items.length < 5) items = items.concat(shuf(NUMS.filter(n => !items.includes(n))).slice(0, 5 - items.length));
    const lad = shuf(NUMS.filter(n => !items.includes(n))).slice(0, 5).map(it => {
      const r = Math.random(), f = 0.12 + Math.random() * 0.3, up = r < 0.5;
      let shown = it.a > 1000 && it.a < 2100 && dp(it.a) === 0 && !it.u ? it.a + (up ? 1 : -1) * Math.max(3, Math.round(15 * f * 4)) : it.a * (up ? 1 + f : 1 - f);
      const d = dp(it.a); shown = d ? +shown.toFixed(d) : Math.round(shown); if (shown === it.a) shown = it.a + (up ? 1 : -1);
      return { it, shown, ans: it.a > shown ? 'higher' : 'lower' };
    });
    return { items, i: 0, phase: 'bid', last: null, won: 0, exact: 0, lad, li: 0, lres: [], score: 0 };
  }
  function rivalBids(it) {
    const yr = !it.u && it.a > 1000 && it.a < 2100 && dp(it.a) === 0;
    const spread = yr ? 25 : Math.max(Math.abs(it.a) * 0.35, dp(it.a) ? 0.5 : 1);
    const d = dp(it.a);
    return RIVALS.map(() => { let g = it.a + (Math.random() * 2 - 1.1) * spread; g = d ? +g.toFixed(d) : Math.round(g); return Math.max(0, g); });
  }
  const unitTxt = (it, v) => !it.u && Number.isInteger(v) && v >= 1000 && v < 2100 && Number.isInteger(it.a) && it.a >= 1000 && it.a < 2100 ? String(v) : it.u === 'US$' ? `US$${fmt(v)}` : it.u === 'Cg' ? `Cg ${fmt(v)}` : `${fmt(v)}${it.u ? ' ' + it.u : ''}`;
  function itemCard(api, it) {
    const S0 = SUB(it.s);
    return `<div class="ar-row">${it.price ? '<span class="ar-tag">Price check · approximate classroom estimate</span>' : it.ap ? '<span class="ar-tag cy">Approximate value</span>' : ''}<span class="ar-hint">${S0 ? S0.icon + ' ' + api.esc(S0.short) : ''}</span></div><p class="ar-q">${api.esc(it.q)}${it.u ? ` <span class="ar-muted">(answer in ${api.esc(it.u)})</span>` : ''}</p>`;
  }
  function closestHTML(api) {
    const C = G.closest;
    let h = head(api, 'closest', C ? `<button type="button" class="ar-btn3d dk" data-px="cnew" data-pv="arcade">↺ New game</button>` : '');
    if (!C) return h + picker(api, 'closest') + `<p class="ar-muted">Bid against three rivals: the closest guess that does <b>not go over</b> the real number wins the round. Prices are approximate classroom estimates for a small Caribbean island, in US dollars, not official prices. Then climb the Higher-or-Lower ladder.</p>`;
    h += `<div class="ar-score"><span class="ar-pill">Bids won ${C.won}/5</span><span class="ar-pill cy">Ladder ${C.lres.filter(Boolean).length}/5</span><span class="ar-pill">Score ${fmt(C.score)}</span></div>`;
    if (C.phase === 'bid' || C.phase === 'bidshown') {
      const it = C.items[C.i];
      h += `<div class="ar-clue"><span class="ar-hint">Bid ${C.i + 1} of 5</span>${itemCard(api, it)}`;
      if (C.phase === 'bid') h += `<div class="ar-row"><label class="ar-sr" for="ar-guess">Your guess</label><input id="ar-guess" class="ar-in" type="number" inputmode="decimal" step="any" min="0" placeholder="Your guess" data-arf="1"><button type="button" class="ar-btn3d" data-px="cbid" data-pv="arcade">Lock in bid</button></div>`;
      else {
        const L0 = C.last;
        h += `<div class="ar-bids">${L0.bids.map(b => `<div class="ar-bid ${b.who === 'You' ? 'you' : ''} ${b.v > it.a ? 'over' : ''} ${b.win ? 'win' : ''}"><span>${api.esc(b.who)}</span><b>${unitTxt(it, b.v)}</b>${b.v > it.a ? '<span>went over</span>' : b.win ? '<span>closest!</span>' : ''}</div>`).join('')}</div>
          <p class="ar-big">Actual: ${unitTxt(it, it.a)}</p>
          <p class="ar-fb ${L0.youWin ? 'good' : 'bad'}">${L0.youWin ? (L0.exact ? 'EXACT! Perfect bid, +200 bonus.' : 'You win this round, +100!') : L0.over ? 'You went over!' : L0.winner ? `${api.esc(L0.winner)} was closer without going over.` : 'Everyone went over: no winner this round.'} ${api.esc(it.note)}</p>
          <div class="ar-row"><button type="button" class="ar-btn3d" data-px="cnext" data-pv="arcade" data-arf="1">${C.i >= 4 ? 'On to the Higher-or-Lower ladder ➜' : 'Next item ➜'}</button></div>`;
      }
      h += `</div>`;
    } else if (C.phase === 'lad' || C.phase === 'ladshown') {
      const L0 = C.lad[C.li], it = L0.it, done = C.phase === 'ladshown';
      h += `<div class="ar-clue"><span class="ar-hint">Higher or Lower ladder · step ${C.li + 1} of 5</span><div class="ar-steps" aria-label="Ladder progress">${C.lad.map((_, i) => `<span class="ar-step ${C.lres[i] === true ? 'ok' : C.lres[i] === false ? 'no' : i === C.li ? 'cur' : ''}">${i + 1}</span>`).join('')}</div>
        ${itemCard(api, it)}<p>Is the real value <b>higher</b> or <b>lower</b> than <span class="ar-big" style="font-size:1.6rem">${unitTxt(it, L0.shown)}</span>?</p>
        ${done ? `<p class="ar-fb ${C.lres[C.li] ? 'good' : 'bad'}">${C.lres[C.li] ? 'Correct!' : 'Not quite.'} The real value is <b>${unitTxt(it, it.a)}</b>. ${api.esc(it.note)}</p><div class="ar-row"><button type="button" class="ar-btn3d" data-px="cladnext" data-pv="arcade" data-arf="1">${!C.lres[C.li] || C.li >= 4 ? 'See results ➜' : 'Climb on ➜'}</button></div>`
          : `<div class="ar-row"><button type="button" class="ar-btn3d cy" data-px="chl" data-pv="arcade" data-k="higher" data-arf="1">▲ Higher</button><button type="button" class="ar-btn3d pk" data-px="chl" data-pv="arcade" data-k="lower">▼ Lower</button></div>`}</div>`;
    } else if (C.phase === 'done') {
      const steps = C.lres.filter(Boolean).length, win = C.won >= 3 || steps >= 5;
      h += `<div class="ar-clue" role="status"><p class="ar-big">${win ? 'WINNER!' : 'GAME OVER'}</p><p>You won <b>${C.won} of 5</b> bids${C.exact ? ` (${C.exact} exact)` : ''} and climbed <b>${steps} of 5</b> ladder steps. Score: <b>${fmt(C.score)}</b>.</p>
        ${C.newBest ? '<p class="ar-fb good">🏆 New Closest high score!</p>' : ''}${win ? '' : '<p class="ar-fb note">Win 3 bids, or clear the whole ladder, to win the game. Tip: bid a little under your best estimate.</p>'}
        <div class="ar-row"><button type="button" class="ar-btn3d" data-px="cnew" data-pv="arcade" data-arf="1">Play again</button><button type="button" class="ar-btn3d dk" data-go="arcade">Back to the arcade</button></div></div>`;
    }
    return h;
  }
  function closestClick(a, el, api) {
    const C = G.closest;
    if (a === 'cnew') { G.closest = null; return api.render(); }
    if (!C) return;
    if (a === 'cbid') {
      if (C.phase !== 'bid') return; const inp = document.getElementById('ar-guess'), raw = inp ? String(inp.value).replace(/,/g, '').trim() : '';
      const g = parseFloat(raw); if (raw === '' || !isFinite(g) || g < 0) { api.toast('Enter a number (0 or more) for your bid.'); return; }
      const it = C.items[C.i], rb = rivalBids(it);
      const bids = [{ who: 'You', v: g }].concat(rb.map((v, i) => ({ who: RIVALS[i], v })));
      const under = bids.filter(b => b.v <= it.a); let winner = null;
      if (under.length) { const mx = Math.max(...under.map(b => b.v)); winner = under.find(b => b.v === mx); winner.win = true; }   // "You" listed first, so ties go to the player
      const youWin = !!winner && winner.who === 'You', exact = youWin && g === it.a;
      if (youWin) { C.won++; C.score += exact ? 300 : 100; if (exact) C.exact++; api.chime('good'); } else api.chime('bad');
      C.last = { bids, youWin, exact, over: g > it.a, winner: winner && winner.who !== 'You' ? winner.who : null };
      C.phase = 'bidshown';
    } else if (a === 'cnext') { if (C.phase !== 'bidshown') return; C.i++; C.phase = C.i >= 5 ? 'lad' : 'bid'; }
    else if (a === 'chl') { if (C.phase !== 'lad') return; const L0 = C.lad[C.li], ok = el.dataset.k === L0.ans; C.lres[C.li] = ok; if (ok) C.score += 50; api.chime(ok ? 'good' : 'bad'); C.phase = 'ladshown'; }
    else if (a === 'cladnext') {
      if (C.phase !== 'ladshown') return;
      if (!C.lres[C.li] || C.li >= 4) {
        C.phase = 'done'; const steps = C.lres.filter(Boolean).length; C.newBest = best(api, 'c', C.score);
        if (C.won >= 3 || steps >= 5) api.reward(Math.min(8, 2 + C.won + (steps >= 5 ? 2 : 0)), 'Closest Without Going Over win');
      } else { C.li++; C.phase = 'lad'; }
    }
    api.render();
  }

  /* ===================== 4. CLIMB THE LADDER ===================== */
  const PTS = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
  const SAFE = [4, 9];   // index of Q5 and Q10
  const FRIENDS = ['Dana', 'Marcus', 'Shanice', 'Ravi', 'Kelly-Ann', 'Joel'];
  function ladderNew() {
    const sub = PICK.ladder, used = new Set();
    const qs = [1, 2, 3].flatMap(d => { const p = pickQs(sub, d, 5, used); p.forEach(q => used.add(q.id)); return p; });
    return { sub, qs, i: 0, pick: null, phase: 'q', life: { ff: true, poll: true, phone: true }, hidden: [], poll: null, phone: null, pts: 0 };
  }
  function safePts(i) { return i > 9 ? PTS[9] : i > 4 ? PTS[4] : 0; }
  function ladderHTML(api) {
    const Lq = G.ladder;
    let h = head(api, 'ladder', Lq ? `<button type="button" class="ar-btn3d dk" data-px="lnew" data-pv="arcade">↺ New game</button>` : '');
    if (!Lq) return h + picker(api, 'ladder') + `<p class="ar-muted">Answer 15 questions that get harder as you climb. Safe havens at Question 5 (1,000 pts) and Question 10 (32,000 pts) keep your points if you slip. Lifelines: 50:50, Ask the Class and Phone a Friend, once each. You can walk away with your points at any time.</p>`;
    const rungs = `<ol class="ar-rungs" aria-label="Points ladder">${PTS.map((p, i) => `<li class="ar-rung ${SAFE.includes(i) ? 'safe' : ''} ${i < Lq.i || (i === Lq.i && Lq.phase === 'won') ? 'done' : ''} ${i === Lq.i && Lq.phase !== 'won' && Lq.phase !== 'walked' && Lq.phase !== 'lost' ? 'cur' : ''}" ${i === Lq.i ? 'aria-current="step"' : ''}><span class="ar-rn">Q${i + 1}</span><span>${fmt(p)}</span></li>`).join('')}</ol>`;
    let main = '';
    if (Lq.phase === 'q' || Lq.phase === 'right') {
      const q = Lq.qs[Lq.i], done = Lq.phase === 'right';
      main += `<div class="ar-clue"><span class="ar-hint">Question ${Lq.i + 1} of 15 · for ${fmt(PTS[Lq.i])} pts · ${['', 'easy', 'medium', 'hard'][q.d]} · ${SUB(q.s).icon} ${api.esc(SUB(q.s).short)}</span><p class="ar-q">${api.esc(q.q)}</p>${opBtns(api, q, 'lpick', { pick: Lq.pick, done, hidden: Lq.hidden })}`;
      if (Lq.poll && !done) main += `<div class="ar-poll" role="img" aria-label="Class poll results"><b>📊 Ask the Class: the class voted…</b>${Lq.poll.map((p, i) => Lq.hidden.includes(i) ? '' : `<div class="ar-pb"><span>${L4[i]}</span><span class="ar-bar"><i style="width:${p}%"></i></span><span>${p}%</span></div>`).join('')}</div>`;
      if (Lq.phone && !done) main += `<p class="ar-fb note">📞 ${api.esc(Lq.phone)}</p>`;
      if (done) main += `<p class="ar-fb good">Correct! ${api.esc(q.why)}${SAFE.includes(Lq.i) ? ` <b>Safe haven reached: ${fmt(PTS[Lq.i])} points are locked in.</b>` : ''}</p><div class="ar-row"><button type="button" class="ar-btn3d" data-px="lnext" data-pv="arcade" data-arf="1">${Lq.i >= 14 ? 'Claim the top prize ➜' : `Next: Q${Lq.i + 2} for ${fmt(PTS[Lq.i + 1])} ➜`}</button></div>`;
      else main += `<div class="ar-life" role="group" aria-label="Lifelines"><button type="button" class="ar-btn3d cy" data-px="l5050" data-pv="arcade" ${Lq.life.ff ? '' : 'disabled'}>✂️ 50:50</button><button type="button" class="ar-btn3d cy" data-px="lpoll" data-pv="arcade" ${Lq.life.poll ? '' : 'disabled'}>📊 Ask the Class</button><button type="button" class="ar-btn3d cy" data-px="lphone" data-pv="arcade" ${Lq.life.phone ? '' : 'disabled'}>📞 Phone a Friend</button><button type="button" class="ar-btn3d pk" data-px="lwalk" data-pv="arcade">🚶 Walk away with ${fmt(Lq.i ? PTS[Lq.i - 1] : 0)}</button></div>`;
      main += `</div>`;
    } else {
      const q = Lq.qs[Lq.i];
      const title = Lq.phase === 'won' ? 'TOP OF THE LADDER!' : Lq.phase === 'walked' ? 'YOU WALKED AWAY' : 'WRONG ANSWER';
      main += `<div class="ar-clue" role="status"><p class="ar-big">${title}</p>${Lq.phase === 'lost' ? `${opBtns(api, q, 'lpick', { pick: Lq.pick, done: true, hidden: Lq.hidden })}<p class="ar-fb bad">The answer was <b>${api.esc(q.o[q.a])}</b>. ${api.esc(q.why)}</p>` : ''}
        <p>You leave with <b>${fmt(Lq.pts)}</b> points${Lq.phase === 'lost' && Lq.pts ? ' (your safe haven)' : ''}.</p>${Lq.newBest ? '<p class="ar-fb good">🏆 New Climb the Ladder high score!</p>' : ''}
        <div class="ar-row"><button type="button" class="ar-btn3d" data-px="lnew" data-pv="arcade" data-arf="1">Play again</button><button type="button" class="ar-btn3d dk" data-go="arcade">Back to the arcade</button></div></div>`;
    }
    return h + `<div class="ar-lad"><div class="ar-wrap">${main}</div>${rungs}</div>`;
  }
  function ladderEnd(api, phase, pts) {
    const Lq = G.ladder; Lq.phase = phase; Lq.pts = pts; Lq.newBest = best(api, 'l', pts);
    const cleared = phase === 'won' ? 15 : phase === 'walked' ? Lq.i : Lq.i;
    if (phase === 'won') api.reward(10, 'Top of the ladder!');
    else if (pts >= PTS[4] && cleared >= 5) api.reward(cleared >= 10 ? 5 : 2, 'Climb the Ladder');
  }
  function ladderClick(a, el, api) {
    const Lq = G.ladder;
    if (a === 'lnew') { G.ladder = null; return api.render(); }
    if (!Lq) return; const q = Lq.qs[Lq.i];
    if (a === 'lpick') {
      if (Lq.phase !== 'q') return; const i = +el.dataset.i; if (Lq.hidden.includes(i)) return; Lq.pick = i;
      if (i === q.a) { api.chime('good'); Lq.phase = 'right'; }
      else { api.chime('bad'); ladderEnd(api, 'lost', safePts(Lq.i)); }
    } else if (a === 'lnext') {
      if (Lq.phase !== 'right') return;
      if (Lq.i >= 14) ladderEnd(api, 'won', PTS[14]);
      else { Lq.i++; Lq.phase = 'q'; Lq.pick = null; Lq.hidden = []; Lq.poll = null; Lq.phone = null; }
    } else if (a === 'l5050') {
      if (Lq.phase !== 'q' || !Lq.life.ff) return; Lq.life.ff = false;
      Lq.hidden = shuf([0, 1, 2, 3].filter(i => i !== q.a)).slice(0, 2);
      if (Lq.poll) Lq.poll = pollFor(q, Lq.hidden);
    } else if (a === 'lpoll') {
      if (Lq.phase !== 'q' || !Lq.life.poll) return; Lq.life.poll = false; Lq.poll = pollFor(q, Lq.hidden);
    } else if (a === 'lphone') {
      if (Lq.phase !== 'q' || !Lq.life.phone) return; Lq.life.phone = false;
      const conf = [0, 0.95, 0.8, 0.62][q.d], right = Math.random() < conf, opts = [0, 1, 2, 3].filter(i => !Lq.hidden.includes(i));
      const guess = right ? q.a : shuf(opts.filter(i => i !== q.a))[0];
      const sure = right ? Math.round(conf * 100 - Math.random() * 10) : Math.round(40 + Math.random() * 25);
      const name = FRIENDS[Math.floor(Math.random() * FRIENDS.length)];
      Lq.phone = `${name} says: “Hmm… I'm about ${sure}% sure it's ${L4[guess]}, ${q.o[guess]}. But don't hold me to it!”`;
    } else if (a === 'lwalk') {
      if (Lq.phase !== 'q') return; ladderEnd(api, 'walked', Lq.i ? PTS[Lq.i - 1] : 0);
    }
    api.render();
  }
  function pollFor(q, hidden) {
    const live = [0, 1, 2, 3].filter(i => !hidden.includes(i));
    const base = [0, 62, 48, 36][q.d] + Math.random() * 18;
    const w = {}; let rest = 100 - base; const others = live.filter(i => i !== q.a);
    const raw = others.map(() => 0.3 + Math.random()); const sum = raw.reduce((x, y) => x + y, 0) || 1;
    others.forEach((i, k) => { w[i] = rest * raw[k] / sum; });
    w[q.a] = base;
    if (!others.length) w[q.a] = 100;
    const out = [0, 1, 2, 3].map(i => Math.round(w[i] || 0));
    const diff = 100 - out.reduce((x, y) => x + y, 0); out[q.a] += diff;
    return out;
  }

  /* ===================== LOBBY ===================== */
  function lobbyHTML(api) {
    const n = SUBJECTS.reduce((t, s) => t + BANK[s.id].length, 0);
    return `<div class="ar-marq"><h2 class="ar-neon">🕹️ Mini Arcade</h2><span class="ar-pill cy">${n} questions · ${SUBJECTS.length} subject areas</span></div><div class="ar-bulbs" aria-hidden="true"></div>
      <p class="ar-muted" style="margin:0">Four game-show style challenges across all your subjects. Win games to earn coins and set high scores. These are original classroom games inspired by classic TV formats.</p>
      <div class="ar-tiles">${GAMES.map(g => `<button type="button" class="ar-game" data-go="arcade" data-tab="${g.k}"><span class="ar-gi" aria-hidden="true">${g.icon}</span><h3>${api.esc(g.name)}</h3><span class="ar-gm">${api.esc(g.blurb)}</span><span class="ar-gb">${api.esc(g.badge)}${G[g.k] ? ' · game in progress' : ''}</span></button>`).join('')}</div>
      <p class="hint" style="margin:0">Comm Studies link: game-show hosts are expert communicators. Notice how they use suspense, pacing, register and audience interaction.</p>`;
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'arcade',
    title: 'Mini Arcade',
    tile: { icon: '🕹️', meta: 'Four game-show style games across 16 subject areas' },
    render(api, loc) {
      API0 = api;
      const tab = loc && loc.tab;
      let body = tab === 'board' ? boardHTML(api) : tab === 'spin' ? spinHTML(api) : tab === 'closest' ? closestHTML(api) : tab === 'ladder' ? ladderHTML(api) : lobbyHTML(api);
      return `<div class="ar-wrap">${strip(api)}<section class="ar-cab card">${body}</section></div>`;
    },
    mount(api, loc, stage) {
      API0 = api;
      const f = stage && stage.querySelector('[data-arf="1"]:not([disabled])');
      if (f && loc && loc.tab) { try { f.focus({ preventScroll: true }); } catch (e) { } }
      const enter = (id, act) => { const el = stage && stage.querySelector('#' + id); if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); const b = stage.querySelector(`[data-px="${act}"]`); if (b && !b.disabled) b.click(); } }); };
      enter('ar-type', 'btype'); enter('ar-solve', 'ssolve'); enter('ar-guess', 'cbid');
    },
    click(action, el, api) {
      API0 = api;
      if (action === 'pick') {
        const g = el.dataset.g, k = el.dataset.k;
        if (g === 'board') { const L = PICK.board, i = L.indexOf(k); if (i >= 0) L.splice(i, 1); else if (L.length < 6) L.push(k); else { api.toast('The board has 6 columns: remove one subject first.'); return; } }
        else PICK[g] = k;
        return api.render();
      }
      if (action === 'pickclear') { PICK.board = []; return api.render(); }
      if (action === 'start') {
        const g = el.dataset.g;
        if (g === 'board') G.board = boardNew(); else if (g === 'spin') G.spin = spinNew(); else if (g === 'closest') G.closest = closestNew(); else if (g === 'ladder') G.ladder = ladderNew();
        api.chime('good'); return api.render();
      }
      if (action[0] === 'b' || action[0] === 'f') return boardClick(action, el, api);
      if (action[0] === 's') return spinClick(action, el, api);
      if (action[0] === 'c') return closestClick(action, el, api);
      if (action[0] === 'l') return ladderClick(action, el, api);
    }
  });

  /* physical keyboard for Spin & Solve letters */
  document.addEventListener('keydown', e => {
    const api = API0; if (!api || !G.spin || !api.S.loc || api.S.loc.v !== 'arcade' || api.S.loc.tab !== 'spin') return;
    const t = e.target; if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.ctrlKey || e.metaKey || e.altKey || !/^[a-zA-Z]$/.test(e.key)) return;
    const b = document.querySelector(`.ar-key[data-k="${e.key.toUpperCase()}"]`); if (b && !b.disabled) { e.preventDefault(); b.click(); }
  });

  /* test / teacher hooks (read-only data access) */
  window.__ARCADE = { SUBJECTS, BANK, PHRASES, NUMS, G, PICK, WEDGES };
})();
