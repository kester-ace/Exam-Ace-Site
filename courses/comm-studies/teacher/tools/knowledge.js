/* Knowledge tools: Did You Know? · Study Smarter · College & University Ready
   CAPE Communication Studies e-course */
(function () {
  'use strict';

  /* =========================================================
     DATA 1: DID YOU KNOW? facts
     Each fact: [true statement, false variant (for True/False quiz), optional note]
     Note prefix "C|" = Comm Studies link, "E|" = Use it in an essay.
     ========================================================= */
  const SUBJ = [
    ['comm', 'Communication Studies', '🗣️'], ['eng', 'English & Literature', '📚'], ['cars', 'Caribbean Studies', '🌴'],
    ['hist', 'History', '🏛️'], ['geo', 'Geography', '🌍'], ['env', 'Environmental Science', '🌱'], ['bio', 'Biology', '🧬'],
    ['chem', 'Chemistry', '⚗️'], ['phys', 'Physics', '🔭'], ['math', 'Mathematics', '➗'], ['acc', 'Accounting', '📒'],
    ['econ', 'Economics', '💱'], ['mob', 'Management of Business', '🏢'], ['ent', 'Entrepreneurship', '🚀'],
    ['log', 'Logistics & Supply Chain', '🚢'], ['it', 'Information Technology', '💻'], ['cs', 'Computer Science', '🧮'],
    ['dm', 'Digital Media', '🎬'], ['anim', 'Animation & Game Design', '🎮'], ['perf', 'Performing Arts', '🎭'],
    ['law', 'Law', '⚖️'], ['soc', 'Sociology', '👥'], ['lang', 'Modern Languages', '🗺️'], ['sxm', 'Caribbean Islands & Territories', '🏝️']
  ];

  const F = {
    comm: [
      ["The word “communication” comes from the Latin communicare, meaning “to share” or “to make common”.", "The word “communication” comes from the Greek word for “speaking loudly”.", "C|Communication is sharing meaning, not just sending words. Use this idea in a definition question."],
      ["Albert Mehrabian’s famous 7-38-55 figures came from small experiments about how people express feelings and attitudes, not from all communication.", "Mehrabian proved that words carry only 7% of the meaning in every kind of conversation.", "E|A great example of a statistic that gets misused when it is quoted out of context."],
      ["Shannon and Weaver’s 1949 model of communication was first designed to describe signals sent over telephone lines.", "Shannon and Weaver’s model was first designed to describe classroom teaching.", "C|That is why the model talks about “noise”, “channels” and “transmitters”."],
      ["Wilbur Schramm argued that communication works best where the sender’s and receiver’s “fields of experience” overlap.", "Wilbur Schramm argued that a sender’s and receiver’s experiences have no effect on understanding.", "C|Useful for explaining why jargon or dialect can block meaning for some audiences."],
      ["Paul Ekman’s research found that facial expressions for basic emotions such as happiness and fear are recognised across many cultures.", "Paul Ekman found that facial expressions of emotion are understood only in the culture where they were learned."],
      ["The anthropologist Edward T. Hall coined the word “proxemics” for the study of how people use personal space.", "The word “proxemics” was coined by Aristotle in his book on rhetoric.", "C|Proxemics is a type of non-verbal communication: think of how close you stand in an interview."],
      ["Aristotle named three modes of persuasion: ethos (credibility), pathos (emotion) and logos (logic).", "Aristotle named the three modes of persuasion as sight, sound and touch.", "E|Analyse a speech or advert by asking which appeal (ethos, pathos or logos) it relies on."],
      ["Hearing is a physical process, but listening is an active process of attending to, understanding and responding to a message.", "Hearing and listening are two words for exactly the same process.", "C|Barriers to listening are a favourite exam topic."],
      ["Paralanguage means the vocal features of speech such as tone, pitch, pace and volume: how something is said rather than what is said.", "Paralanguage is another word for sign language."],
      ["The first text message (SMS) was sent in December 1992 and read “Merry Christmas”.", "The first text message was sent in 1972 and read “Hello World”."],
      ["Computer engineer Ray Tomlinson chose the @ symbol for email addresses in 1971.", "The @ symbol was invented in 1971 specifically for email addresses."],
      ["SOS in Morse code was chosen because its pattern (three dots, three dashes, three dots) is simple and easy to recognise, not because it stands for “Save Our Souls”.", "SOS was chosen because it is an official abbreviation of “Save Our Ship”."],
      ["The anthropologist Bronisław Malinowski described “phatic communion”: small talk like “Morning! How you going?” whose main purpose is social bonding, not information.", "Phatic communication is talk whose main purpose is to pass on detailed information.", "C|Greetings in Caribbean communities are a rich example of phatic talk."],
      ["The word “emoji” comes from Japanese e (picture) + moji (character); its similarity to “emotion” is a coincidence.", "The word “emoji” was made by joining the English words “emotion” and “icon”."],
      ["The fear of public speaking has its own name: glossophobia.", "The fear of public speaking is called arachnophobia."],
      ["Feedback is what turns a one-way, linear model of communication into a two-way, interactive process.", "Feedback is only found in linear, one-way models of communication.", "C|Mention feedback whenever you compare linear and transactional models."],
      ["Studies of the office “grapevine” (informal communication network) found it is often more accurate than many managers expect, although it can still spread rumours.", "Research shows that information from the grapevine is always false."]
    ],
    eng: [
      ["Derek Walcott, born in Saint Lucia, won the Nobel Prize in Literature in 1992.", "Derek Walcott, born in Jamaica, won the Nobel Prize in Physics in 1992.", "E|A powerful Caribbean example when you discuss literature and identity."],
      ["V. S. Naipaul, born in Trinidad, won the Nobel Prize in Literature in 2001.", "V. S. Naipaul, born in Barbados, never won a major literary prize."],
      ["Jean Rhys, born in Dominica, wrote Wide Sargasso Sea, which imagines the earlier life of Bertha Mason from Jane Eyre.", "Wide Sargasso Sea was written by Charlotte Brontë as a sequel to Jane Eyre."],
      ["Iago calls jealousy “the green-eyed monster” in Shakespeare’s Othello.", "The phrase “green-eyed monster” for jealousy comes from Macbeth."],
      ["A traditional sonnet has 14 lines.", "A traditional sonnet has 12 lines."],
      ["Iambic pentameter has five pairs of syllables per line, each pair unstressed then stressed (da-DUM).", "Iambic pentameter has eight stressed syllables per line."],
      ["The word “nice” once meant “foolish” or “ignorant”; it comes from the Latin nescius, “not knowing”.", "The word “nice” has always meant “pleasant”.", "C|A neat example of semantic change for Module 2 (language change)."],
      ["Mary Shelley’s Frankenstein was first published in 1818, when she was 20.", "Frankenstein was written by Mary Shelley when she was 60."],
      ["Louise Bennett-Coverley (“Miss Lou”) championed writing and performing in Jamaican Creole when many people dismissed it.", "Miss Lou wrote only in formal Standard English and opposed the use of Creole.", "C|Excellent example for attitudes to Creole in Module 2."],
      ["Sam Selvon’s The Lonely Londoners (1956) tells its story in a Creole-influenced narrative voice.", "The Lonely Londoners is written entirely in formal Victorian English."],
      ["English words such as hurricane, hammock, canoe and barbecue came into English through Spanish from Taíno and other Indigenous Caribbean languages.", "Hurricane, hammock and canoe all came into English from Ancient Greek.", "C|Proof that Caribbean languages have shaped world English."],
      ["Kamau Brathwaite used the term “nation language” for the Creole languages of the Caribbean.", "Kamau Brathwaite used the term “nation language” to mean Standard British English."],
      ["Chinua Achebe took the title Things Fall Apart from W. B. Yeats’s poem “The Second Coming”.", "Things Fall Apart takes its title from a Shakespeare sonnet."],
      ["George Lamming’s In the Castle of My Skin (1953) is a coming-of-age novel set in Barbados.", "In the Castle of My Skin is a science fiction novel set on Mars."],
      ["A pangram is a sentence that uses every letter of the alphabet, such as “The quick brown fox jumps over the lazy dog”.", "A pangram is a sentence that reads the same backwards and forwards."],
      ["The Oxford English Dictionary began publication in parts in 1884, and the first complete edition was finished in 1928.", "The whole first edition of the Oxford English Dictionary was completed in a single year."],
      ["“Was it a car or a cat I saw?” is a palindrome: ignoring spaces, it reads the same backwards.", "A palindrome is a word that sounds like the thing it describes."]
    ],
    cars: [
      ["The Caribbean Sea takes its name from the Kalinago people, whom Europeans called “Caribs”.", "The Caribbean Sea is named after a Spanish ship called the Caribe."],
      ["CARICOM was established by the Treaty of Chaguaramas, signed in Trinidad in 1973.", "CARICOM was established by a treaty signed in London in 1945."],
      ["The West Indies Federation lasted only from 1958 to 1962.", "The West Indies Federation lasted for more than fifty years.", "E|A strong example when you discuss challenges to regional integration."],
      ["The University of the West Indies began in 1948 as the University College of the West Indies at Mona, Jamaica, in special relationship with the University of London.", "The University of the West Indies began in 1990 in Barbados."],
      ["The Caribbean Examinations Council (CXC) was established in 1972.", "CXC was established in 2002."],
      ["Haiti became independent in 1804, the first nation founded after a successful revolt by enslaved people.", "Haiti became independent in 1904."],
      ["Slavery was abolished in British colonies from 1 August 1834, but an “apprenticeship” system kept many people working without full freedom until 1838.", "All enslaved people in British colonies became fully free on the same day in 1807."],
      ["The ship Fatel Razack brought the first indentured labourers from India to Trinidad in 1845.", "The first indentured labourers from India arrived in Trinidad in 1945."],
      ["Slavery was abolished in Suriname and the Dutch Caribbean on 1 July 1863, a date remembered as Keti Koti (“the chains are broken”).", "Slavery in the Dutch Caribbean was abolished in 1763."],
      ["Trinidad Carnival grew from French Catholic pre-Lenten masquerades and the Canboulay processions of the formerly enslaved.", "Trinidad Carnival was imported directly from Brazil in the 1990s."],
      ["The Rastafari movement emerged in Jamaica in the 1930s.", "The Rastafari movement began in Ethiopia in the 1700s."],
      ["The Caribbean Court of Justice was inaugurated in 2005 and has its seat in Port of Spain, Trinidad and Tobago.", "The Caribbean Court of Justice has its seat in Kingston, Jamaica, and opened in 1975."],
      ["The Garifuna people, descended from Africans and Indigenous Caribbean peoples, were deported from St Vincent in 1797 and settled along the coast of Central America.", "The Garifuna people originated in Northern Europe."],
      ["The Organisation of Eastern Caribbean States (OECS) was created by the Treaty of Basseterre in 1981.", "The OECS was created by the Treaty of Paris in 1763."],
      ["The Morant Bay Rebellion in Jamaica (1865) was led by the Baptist deacon Paul Bogle.", "The Morant Bay Rebellion took place in Barbados in 1965."],
      ["Indentured labourers also came to the Caribbean from China and from Madeira (Portugal) in the nineteenth century.", "Indentured labour in the Caribbean came only from India."],
      ["Indian indentured labourers first arrived in British Guiana in 1838 on the ships Whitby and Hesperus.", "No Indian indentured labourers ever went to British Guiana."]
    ],
    hist: [
      ["Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid of Giza.", "Cleopatra lived at the same time as the building of the Great Pyramid of Giza."],
      ["Oxford University was already teaching students before the Aztec city of Tenochtitlan was founded.", "Tenochtitlan was founded centuries before Oxford University began teaching."],
      ["Woolly mammoths were still alive on Wrangel Island when the Great Pyramid of Giza was being built.", "Woolly mammoths died out millions of years before humans appeared."],
      ["The Hundred Years’ War between England and France actually lasted 116 years (1337–1453).", "The Hundred Years’ War lasted exactly one hundred years."],
      ["The Anglo-Zanzibar War of 1896 is often called the shortest war in history: it lasted less than an hour.", "The Anglo-Zanzibar War of 1896 lasted for ten years."],
      ["Johannes Gutenberg’s printing press with movable metal type was developed in Europe around the 1440s.", "Gutenberg invented his printing press in the 1840s."],
      ["Magna Carta was agreed in England in 1215.", "Magna Carta was signed in 1815."],
      ["The Haitian Revolution began in 1791.", "The Haitian Revolution began in 1891."],
      ["The Berlin Wall fell in 1989.", "The Berlin Wall fell in 1959."],
      ["The Universal Declaration of Human Rights was adopted by the United Nations General Assembly on 10 December 1948.", "The Universal Declaration of Human Rights was adopted in 1848.", "E|Article 19 protects freedom of opinion and expression: useful for media essays."],
      ["Napoleon was about 1.69 m tall, roughly average for a Frenchman of his time; the “tiny Napoleon” image came partly from British cartoons.", "Napoleon was well under 1.5 m tall, far shorter than most men of his time.", "C|A good example of how propaganda shapes public perception."],
      ["There is no evidence that Vikings wore horned helmets in battle; the image became popular through nineteenth-century costume designs.", "Every Viking warrior wore a horned helmet in battle."],
      ["The Rosetta Stone, found in 1799, helped Jean-François Champollion decipher Egyptian hieroglyphs in 1822.", "The Rosetta Stone was written entirely in English."],
      ["The Silk Road was not a single road but a network of trade routes linking Asia, Africa and Europe.", "The Silk Road was a single paved road built only to carry silk."],
      ["Nelson Mandela was released from prison in 1990 after 27 years.", "Nelson Mandela was released from prison in 1960 after two years."],
      ["The Treaty of Tordesillas (1494) attempted to divide newly encountered lands outside Europe between Spain and Portugal.", "The Treaty of Tordesillas divided the Caribbean between England and France."],
      ["Spanish ships sailing from the Americas travelled together in convoys called the treasure fleets to defend against pirates and rival navies.", "Spanish treasure ships always sailed alone to avoid being noticed."]
    ],
    geo: [
      ["The Soufrière Hills volcano on Montserrat began erupting in 1995, and the capital, Plymouth, was later abandoned.", "Montserrat has never had an active volcano."],
      ["Kick ’em Jenny is an active underwater volcano north of Grenada.", "Kick ’em Jenny is an extinct volcano in the middle of Jamaica."],
      ["The Pitch Lake in La Brea, Trinidad, is the largest natural deposit of asphalt in the world.", "The Pitch Lake in Trinidad is a freshwater lake used for swimming competitions."],
      ["The Puerto Rico Trench contains the deepest point in the Atlantic Ocean.", "The deepest point in the Atlantic Ocean is just off the coast of Ireland."],
      ["Mount Everest is the highest mountain above sea level, but the summit of Chimborazo in Ecuador is the point farthest from Earth’s centre because Earth bulges at the equator.", "Mount Everest’s summit is the point farthest from the centre of the Earth."],
      ["Measured from its base on the sea floor, Mauna Kea in Hawaiʻi is taller than Mount Everest.", "Mauna Kea is a small hill shorter than 500 metres from base to summit."],
      ["The shore of the Dead Sea is the lowest land elevation on Earth.", "The Dead Sea is located on top of a mountain plateau."],
      ["Antarctica is the largest desert on Earth; the Sahara is the largest hot desert.", "The Sahara is larger than Antarctica and is the world’s largest desert of any kind."],
      ["Hurricanes in the Northern Hemisphere spin anticlockwise because of the Coriolis effect.", "Hurricanes in the Northern Hemisphere always spin clockwise."],
      ["The Atlantic hurricane season officially runs from 1 June to 30 November.", "The Atlantic hurricane season officially runs from January to April."],
      ["Canada has the longest coastline of any country in the world.", "Landlocked Switzerland has the longest coastline in the world."],
      ["Guyana’s Kaieteur Falls is a single drop roughly four times the height of Niagara Falls.", "Kaieteur Falls is shorter than Niagara Falls."],
      ["Dust from the Sahara Desert regularly crosses the Atlantic and reaches the Caribbean, causing hazy skies.", "Saharan dust never travels more than a few kilometres from Africa.", "E|A clear example of how events far away affect Caribbean daily life."],
      ["Africa is the only continent crossed by both the Equator and the Prime Meridian, so it lies in all four hemispheres.", "Africa lies entirely in the Southern Hemisphere."],
      ["Greenwich in London was chosen as the Prime Meridian (0° longitude) at an international conference in 1884.", "The Prime Meridian passes through Paris by international agreement."],
      ["The Sargasso Sea is the only sea with no land coastline; it is bordered by ocean currents.", "The Sargasso Sea is completely surrounded by land."],
      ["Lake Maracaibo in Venezuela is known for “Catatumbo lightning”, which strikes there on many nights of the year.", "Lightning never occurs over Lake Maracaibo."]
    ],
    env: [
      ["Coral reefs cover well under 1% of the ocean floor yet support an estimated quarter of all known marine species.", "Coral reefs cover half of the ocean floor but support very few species."],
      ["Much of the white sand on Caribbean beaches has passed through parrotfish, which grind up coral as they feed.", "All Caribbean beach sand is made from melted glass."],
      ["Mangroves protect coastlines from storm surge and erosion and act as nurseries for young fish.", "Mangroves increase coastal erosion and have no value for fish."],
      ["The temperature of a sea turtle’s nest helps decide whether the hatchlings are male or female: warmer nests produce more females.", "Sea turtle hatchlings are always half male and half female, whatever the temperature."],
      ["Lionfish are an invasive species in the Caribbean; they are native to the Indo-Pacific region.", "Lionfish are native to the Caribbean and have lived there for millions of years."],
      ["Roughly half of the oxygen produced on Earth comes from tiny ocean organisms such as phytoplankton.", "All of Earth’s oxygen is produced by the Amazon rainforest."],
      ["The Montreal Protocol (1987) phased out many ozone-damaging chemicals, and scientists report that the ozone layer is slowly recovering.", "The Montreal Protocol was an agreement to increase the use of ozone-damaging chemicals."],
      ["The greenhouse effect is natural and keeps Earth warm enough for life; the problem is the enhanced effect caused by extra greenhouse gases.", "Without any greenhouse effect at all, Earth would be much warmer.", "C|Precise definitions like this one show the examiner you understand the topic."],
      ["Regular measurements of carbon dioxide in the air began at Mauna Loa, Hawaiʻi, in 1958 (the “Keeling Curve”).", "Carbon dioxide in the air has never been measured scientifically."],
      ["Plastic does not truly biodegrade in a human lifetime; it breaks into smaller and smaller microplastics.", "Most plastic bottles fully biodegrade within a month."],
      ["Food waste rotting in landfills produces methane, a powerful greenhouse gas.", "Food waste in landfills produces no gases at all."],
      ["Seagrass meadows and mangroves store large amounts of carbon, often called “blue carbon”.", "“Blue carbon” refers to carbon stored in blue paint."],
      ["Rachel Carson’s book Silent Spring (1962) helped launch the modern environmental movement.", "Silent Spring was a 1990s novel about a quiet holiday."],
      ["Several Caribbean islands, including Aruba, the Cayman Islands and Sint Maarten, rely heavily on desalination to turn seawater into drinking water.", "Every Caribbean island gets all its drinking water from large rivers."],
      ["The Caribbean islands are recognised as a biodiversity hotspot with many species found nowhere else.", "The Caribbean islands have no endemic species."],
      ["Many fruit and vegetable crops depend on pollinators such as bees, bats and birds.", "No food crops depend on pollinating animals."],
      ["Wetlands act like natural filters, trapping sediment and pollutants before water reaches the sea.", "Wetlands make water dirtier before it reaches the sea."]
    ],
    bio: [
      ["An octopus has three hearts and blue blood.", "An octopus has one heart and green blood."],
      ["An adult human skeleton has 206 bones, but babies are born with around 300 bones and cartilage pieces, some of which fuse.", "Babies are born with fewer bones than adults."],
      ["The DNA in a single human cell would stretch about 2 metres if it were uncoiled.", "The DNA in a single human cell would stretch about 2 millimetres if uncoiled."],
      ["Botanically, bananas count as berries but strawberries do not.", "Botanically, strawberries are true berries but bananas are not."],
      ["Sharks existed before trees did.", "Trees existed hundreds of millions of years before the first sharks."],
      ["Hummingbirds can fly backwards, something almost no other bird can do.", "Hummingbirds cannot hover or fly backwards."],
      ["Tardigrades (“water bears”) can survive extreme cold, drying out and even exposure to space.", "Tardigrades die instantly if their water evaporates."],
      ["Mitochondria have their own small set of DNA, which humans inherit from their mothers.", "Mitochondria contain no DNA at all."],
      ["Mature mammalian red blood cells have no nucleus.", "Every human red blood cell has three nuclei."],
      ["A Venus flytrap usually needs its trigger hairs touched twice in quick succession before it snaps shut.", "A Venus flytrap closes when it hears a loud noise."],
      ["Axolotls can regrow lost limbs and even parts of their heart.", "Axolotls cannot heal any injury."],
      ["Identical twins have different fingerprints.", "Identical twins always have identical fingerprints."],
      ["The smallest bone in the human body is the stapes, in the middle ear.", "The smallest bone in the human body is in the big toe."],
      ["Chloroplasts are thought to have evolved from free-living bacteria that were taken inside other cells (endosymbiosis).", "Chloroplasts are found in all animal cells."],
      ["The skin is the largest organ of the human body.", "The skin is not considered an organ."],
      ["Nerve impulses in some insulated (myelinated) nerve fibres travel at over 100 metres per second.", "Nerve impulses travel at about one centimetre per minute."],
      ["The blue whale has the largest heart of any animal.", "The hummingbird has the largest heart of any animal."]
    ],
    chem: [
      ["Water expands when it freezes, which is why ice floats.", "Ice sinks in water because freezing makes water denser."],
      ["Helium was detected in the Sun’s light (in 1868) before it was found on Earth.", "Helium was discovered on Earth long before anyone studied sunlight."],
      ["Diamond and graphite (pencil “lead”) are both made of pure carbon.", "Diamond is made of pure silicon."],
      ["Mendeleev left gaps in his 1869 periodic table and correctly predicted the properties of undiscovered elements such as gallium and germanium.", "Mendeleev’s periodic table had no gaps and predicted no new elements."],
      ["Mercury and bromine are the only elements that are liquid at standard room temperature and pressure.", "Iron is a liquid at room temperature."],
      ["Table salt (sodium chloride) is made from sodium, a reactive metal, and chlorine, a poisonous gas.", "Table salt is made from gold and oxygen."],
      ["Each step on the pH scale is a tenfold change in acidity, so pH 3 is ten times more acidic than pH 4.", "pH 3 is only slightly more acidic than pH 4: the scale goes up in equal small steps."],
      ["Oxygen is the most abundant element in Earth’s crust by mass.", "Gold is the most abundant element in Earth’s crust."],
      ["Hydrogen is the most abundant element in the universe.", "Iron is the most abundant element in the universe."],
      ["Marie Curie is the only person to win Nobel Prizes in two different sciences: Physics (1903) and Chemistry (1911).", "Marie Curie never won a Nobel Prize."],
      ["Iron needs both water and oxygen to rust.", "Iron rusts fastest in completely dry air with no oxygen."],
      ["Dry ice is solid carbon dioxide; it turns straight from solid to gas (sublimes).", "Dry ice is frozen water with salt added."],
      ["Rum is made by fermenting molasses or sugar-cane juice with yeast, then distilling it to separate the alcohol by boiling point.", "Rum is made by mixing sugar with vinegar."],
      ["Chlorophyll has a magnesium atom at its centre.", "Chlorophyll has an iron atom at its centre, just like haemoglobin."],
      ["The non-stick material Teflon was discovered by accident by chemist Roy Plunkett in 1938.", "Teflon was deliberately designed in 1998 for spacecraft."],
      ["Old church windows that are thicker at the bottom were made that way; glass does not noticeably flow over centuries.", "Glass is a slow liquid that visibly flows down windows within a few hundred years."],
      ["Gold is so malleable that it can be beaten into leaf so thin that light shines through it.", "Gold is so brittle that it shatters when hammered."]
    ],
    phys: [
      ["Light from the Sun takes about 8 minutes to reach Earth.", "Light from the Sun reaches Earth instantly."],
      ["Sound cannot travel through a vacuum, so space is silent.", "Sound travels faster in a vacuum than in air."],
      ["Sound travels roughly four times faster in water than in air.", "Sound travels more slowly in water than in air."],
      ["A day on Venus (one full spin) is longer than its year (one orbit of the Sun).", "Venus spins once every 24 hours, exactly like Earth."],
      ["Astronauts on the International Space Station feel weightless because they are in continuous free fall around Earth, not because there is no gravity.", "There is no gravity at all where the International Space Station orbits."],
      ["A lightning bolt can heat the air around it to temperatures several times hotter than the surface of the Sun.", "Lightning is cooler than a candle flame."],
      ["Isaac Newton published his laws of motion in the Principia in 1687.", "Isaac Newton published his laws of motion in 1987."],
      ["Albert Einstein won his Nobel Prize for explaining the photoelectric effect, not for relativity.", "Einstein’s Nobel Prize was awarded for the theory of relativity."],
      ["GPS satellites must correct for effects predicted by Einstein’s relativity, or positions would quickly drift.", "GPS satellites are unaffected by relativity."],
      ["Rainbows are actually full circles; from the ground we usually see only an arc.", "Rainbows are always perfect semicircles."],
      ["Without air resistance, heavy and light objects fall at the same rate; an Apollo 15 astronaut showed this with a hammer and a feather on the Moon.", "On the Moon, a hammer falls much faster than a feather."],
      ["The sky looks blue because air scatters blue light more than red light (Rayleigh scattering).", "The sky looks blue because it reflects the colour of the ocean."],
      ["Water boils at a lower temperature high on a mountain because the air pressure is lower.", "Water boils at a higher temperature on a mountain top."],
      ["A teaspoon of neutron-star material would weigh millions of tonnes on Earth.", "Neutron stars are made of light gas lighter than air."],
      ["Since 1983 the metre has been defined using the speed of light.", "The metre is defined as the length of a king’s arm."],
      ["Newton showed with a prism that white light is a mixture of colours.", "Newton showed that a prism adds colour to white light by staining it."],
      ["Microwave ovens heat food mainly by making water molecules in it rotate rapidly.", "Microwave ovens heat food by making it radioactive."]
    ],
    math: [
      ["Zero as a number with its own rules for calculation was described by the Indian mathematician Brahmagupta in 628 CE.", "The number zero was invented in 1900."],
      ["The equals sign (=) was introduced by Welsh mathematician Robert Recorde in 1557 “to avoid the tedious repetition” of the words “is equal to”.", "The equals sign was first used by the ancient Romans."],
      ["0.999… with the 9s repeating forever is exactly equal to 1.", "0.999… repeating is always slightly less than 1."],
      ["There are infinitely many prime numbers; Euclid proved this more than 2,000 years ago.", "Mathematicians have found the largest prime number, so primes are finite."],
      ["In a group of just 23 people, there is a better than 50% chance that two share a birthday.", "You need at least 366 people for any chance that two share a birthday."],
      ["A well-shuffled deck of 52 cards is almost certainly in an order that has never existed before, because there are 52! possible orders.", "There are only about a thousand possible orders for a deck of 52 cards."],
      ["Pi is irrational: its decimal digits never end and never fall into a repeating pattern.", "Pi is exactly 22/7."],
      ["The words “algorithm” and “algebra” both come from the work of the ninth-century Persian scholar al-Khwarizmi.", "The word “algebra” comes from a Latin word meaning “letters”."],
      ["1 is not a prime number.", "1 is the smallest prime number."],
      ["A Möbius strip has only one side and one edge.", "A Möbius strip has four sides."],
      ["Fermat’s Last Theorem waited more than 350 years for a proof, finally given by Andrew Wiles in the 1990s.", "Fermat’s Last Theorem was proved by Fermat himself in the margin of a book."],
      ["Spiral patterns in sunflower heads and pine cones often follow Fibonacci numbers.", "Fibonacci numbers never appear in nature."],
      ["Roman numerals have no symbol for zero.", "The Roman numeral for zero is O."],
      ["A number is divisible by 3 if the sum of its digits is divisible by 3.", "A number is divisible by 3 only if it ends in 3."],
      ["A googol is 1 followed by 100 zeros.", "A googol is exactly one million."],
      ["If you could fold a sheet of paper in half 42 times, its thickness would reach roughly the distance to the Moon, thanks to doubling.", "Folding paper 42 times would make it about one metre thick."],
      ["Correlation does not prove causation: two things can rise together without one causing the other.", "If two things rise together, one must be causing the other.", "E|Use this to criticise weak evidence in an argument."]
    ],
    acc: [
      ["Luca Pacioli described double-entry bookkeeping in print in 1494, and Leonardo da Vinci illustrated another of Pacioli’s books.", "Double-entry bookkeeping was invented in 1994 for computer spreadsheets."],
      ["The words “debit” and “credit” come from the Latin debere (to owe) and credere (to trust or believe).", "“Debit” and “credit” come from Greek words for “red” and “black”."],
      ["The accounting equation is Assets = Liabilities + Capital (owner’s equity).", "The accounting equation is Assets = Liabilities − Profit × Capital."],
      ["In double-entry bookkeeping, every transaction is recorded twice, as a debit and a matching credit.", "In double-entry bookkeeping, each transaction is recorded only once."],
      ["Some of the earliest known writing in Mesopotamia was used to keep records of goods such as grain and livestock.", "The earliest writing was used only for poetry, never for record-keeping."],
      ["A business can be profitable on paper and still fail because it runs out of cash.", "A profitable business can never run out of cash."],
      ["The Enron scandal (2001) led directly to the United States’ Sarbanes-Oxley Act of 2002, which tightened rules on corporate financial reporting.", "The Enron scandal led to the removal of all rules on financial reporting."],
      ["The word “auditor” comes from the Latin audire, “to hear”: accounts were once read aloud to be checked.", "“Auditor” comes from a word meaning “to count coins”.", "C|A lovely link between oral communication and accounting history."],
      ["Depreciation spreads the cost of a long-term asset over the years it is used.", "Depreciation is the money a business earns from selling old assets."],
      ["The accruals concept records income and expenses when they are earned or incurred, not when cash changes hands.", "The accruals concept records income only when cash is received."],
      ["A trial balance can balance and still contain errors, such as errors of omission or compensating errors.", "If a trial balance balances, the accounts are guaranteed to be error-free."],
      ["International Financial Reporting Standards do not allow the LIFO (last in, first out) method for valuing inventory.", "IFRS requires all companies to use LIFO for inventory."],
      ["The prudence concept warns accountants not to overstate assets or income.", "The prudence concept encourages accountants to overstate profits."],
      ["The going-concern concept assumes a business will continue operating for the foreseeable future.", "The going-concern concept assumes a business will close next month."],
      ["A bank reconciliation explains differences between a business’s cash book and its bank statement, often caused by timing.", "A bank reconciliation is a loan agreement with a bank."],
      ["Auditors use Benford’s law, which says that in many real data sets the leading digit 1 appears far more often than 9, to spot suspicious figures.", "In real financial data every leading digit from 1 to 9 appears equally often."],
      ["Accounting is sometimes called “the language of business” because financial statements communicate a firm’s performance to stakeholders.", "Accounting has nothing to do with communicating information.", "C|Financial statements are a written communication with very specific audiences."]
    ],
    econ: [
      ["Adam Smith published The Wealth of Nations in 1776.", "Adam Smith published The Wealth of Nations in 1976."],
      ["Adam Smith’s famous “invisible hand” appears only once in The Wealth of Nations.", "The phrase “invisible hand” appears on almost every page of The Wealth of Nations."],
      ["Opportunity cost is the value of the next best alternative you give up when you make a choice.", "Opportunity cost is the price printed on a product’s label."],
      ["During Zimbabwe’s hyperinflation, a 100-trillion-dollar banknote was issued.", "Zimbabwe’s largest banknote was 100 dollars."],
      ["The Eastern Caribbean dollar has been pegged to the US dollar at EC$2.70 = US$1 since 1976.", "The Eastern Caribbean dollar floats freely and changes value every day."],
      ["David Ricardo set out the theory of comparative advantage in 1817.", "Comparative advantage was first described in 2017."],
      ["John Maynard Keynes published The General Theory of Employment, Interest and Money in 1936, during the Great Depression era.", "Keynes wrote The General Theory in the 1700s."],
      ["The diamond-water paradox asks why water, essential for life, is cheap while diamonds are expensive; scarcity at the margin explains it.", "Diamonds are expensive because they are essential for survival."],
      ["Gross Domestic Product (GDP) does not count unpaid work such as caring for family members at home.", "GDP includes the value of all unpaid household work."],
      ["Tulip mania in the 1630s Netherlands is often cited as an early example of a speculative bubble.", "Tulip mania happened in Australia in the 1990s."],
      ["Gresham’s law is often summarised as “bad money drives out good”.", "Gresham’s law says “good money drives out bad”."],
      ["Paper money was first widely used in China, centuries before it became common in Europe.", "Paper money was first used in Europe in the 1900s."],
      ["A government-imposed price ceiling set below the market price usually causes shortages.", "A price ceiling below the market price always creates a surplus."],
      ["The word “economics” comes from the Greek oikonomia, meaning “household management”.", "The word “economics” comes from Latin for “bank”."],
      ["For many Caribbean economies, tourism is a major source of foreign exchange.", "Tourism earns no foreign exchange for Caribbean economies."],
      ["Inflation is often measured with a Consumer Price Index, which tracks the price of a typical “basket” of goods and services.", "Inflation is measured by counting how many banknotes are printed each day."],
      ["Germany experienced hyperinflation in 1923, when prices rose so fast that people were paid more than once a day.", "Germany has never experienced hyperinflation."]
    ],
    mob: [
      ["Henri Fayol, writing in 1916, listed the functions of management as planning, organising, commanding, coordinating and controlling.", "Henri Fayol said management has only one function: commanding."],
      ["Abraham Maslow published his hierarchy of needs in 1943, but the famous pyramid diagram was drawn later by others.", "Maslow drew the famous pyramid diagram himself in 1843."],
      ["In Herzberg’s two-factor theory, pay is a “hygiene factor”: poor pay causes dissatisfaction, but pay alone does not create lasting motivation.", "Herzberg said pay is the single most powerful long-term motivator."],
      ["The Hawthorne studies at a Western Electric factory in the 1920s–30s suggested that workers respond to attention and social factors, not just physical conditions.", "The Hawthorne studies found workers respond only to lighting levels."],
      ["In a SWOT analysis, strengths and weaknesses are internal, while opportunities and threats are external.", "In a SWOT analysis, strengths and weaknesses are external factors."],
      ["Henry Ford’s moving assembly line, introduced in 1913, cut the time to build a Model T dramatically.", "Henry Ford’s assembly line made each car take longer to build."],
      ["Henry Mintzberg grouped managers’ roles into interpersonal, informational and decisional roles.", "Mintzberg said managers have no informational roles.", "C|Informational roles (monitor, disseminator, spokesperson) are all about communication."],
      ["Bruce Tuckman described team development as forming, storming, norming and performing; “adjourning” was added later.", "Tuckman’s stages are planning, doing, checking and acting."],
      ["Douglas McGregor’s Theory X assumes people dislike work, while Theory Y assumes people can be self-motivated.", "McGregor’s Theory Y assumes all workers are lazy."],
      ["The “4 Ps” of the marketing mix (product, price, place, promotion) were popularised by E. Jerome McCarthy in 1960.", "The 4 Ps of marketing are profit, payroll, pension and paperwork."],
      ["The Japanese word kaizen means continuous improvement through small changes.", "Kaizen means “one huge change at once”."],
      ["Peter Drucker popularised “management by objectives” in the 1950s.", "Management by objectives was invented by Adam Smith."],
      ["The brainstorming technique was popularised by advertising executive Alex Osborn.", "Brainstorming was invented by a team of neuroscientists in 2010."],
      ["Span of control is the number of people who report directly to one manager.", "Span of control is the length of time a manager stays in a job."],
      ["A business’s formal communication follows official channels, while informal communication (the grapevine) follows social relationships.", "Informal communication only happens in written memos.", "C|A direct link to organisational communication in Module 3."],
      ["A mission statement describes an organisation’s purpose now; a vision statement describes what it hopes to become.", "A mission statement and a vision statement must be identical."],
      ["Frederick Taylor’s “scientific management” studied tasks with stopwatches to find the most efficient way to work.", "Frederick Taylor believed work should never be measured."]
    ],
    ent: [
      ["“Entrepreneur” comes from the French entreprendre, “to undertake”.", "“Entrepreneur” comes from a Latin word meaning “to gamble everything”."],
      ["Economist Joseph Schumpeter described “creative destruction”, where new innovations replace old industries.", "Creative destruction means destroying products to raise their price."],
      ["Richard Cantillon used the term “entrepreneur” in economics in the eighteenth century, describing someone who takes on risk.", "The word entrepreneur was first used in economics in 2005."],
      ["The weak glue behind Post-it Notes was first seen as a failed experiment at 3M.", "Post-it Notes were developed from a super-strong industrial glue."],
      ["Bubble wrap was originally invented as a textured wallpaper.", "Bubble wrap was originally invented as a children’s toy."],
      ["Muhammad Yunus and the Grameen Bank won the 2006 Nobel Peace Prize for pioneering microcredit.", "Microcredit has never received international recognition."],
      ["The Business Model Canvas has nine building blocks, including customer segments, value propositions and revenue streams.", "The Business Model Canvas has three building blocks."],
      ["Eric Ries’s The Lean Startup popularised the “minimum viable product”: a simple version used to test ideas with real customers.", "A minimum viable product is the most expensive, fully finished version of a product."],
      ["A sole trader usually has unlimited liability: personal belongings can be used to pay business debts.", "A sole trader has limited liability, so personal savings are always protected."],
      ["Patents, trademarks and copyright protect different things: inventions, brand names and logos, and creative works.", "A patent is the right protection for a business logo."],
      ["“Bootstrapping” means starting and growing a business with your own resources rather than outside investors.", "Bootstrapping means borrowing as much money as possible before starting."],
      ["A social enterprise uses business methods to address a social or environmental problem.", "A social enterprise is any business that has a social media page."],
      ["The idea of a “unique selling proposition” (USP) was popularised by advertising executive Rosser Reeves in the 1940s–50s.", "The USP idea was introduced by a government tax office."],
      ["An elevator pitch is a short, persuasive summary of an idea that can be delivered in about the length of a lift ride.", "An elevator pitch must last at least an hour.", "C|An elevator pitch is a mini persuasive speech: audience, purpose, register."],
      ["A pivot is when a start-up changes a major part of its business model based on what it learns.", "A pivot means closing a business permanently."],
      ["Cash-flow forecasts help entrepreneurs predict when money will come in and go out, so they can avoid running out of cash.", "Cash-flow forecasts record only the owner’s personal savings."],
      ["Crowdfunding raises money by collecting small amounts from many people, often online.", "Crowdfunding means borrowing a single large loan from one bank."]
    ],
    log: [
      ["Malcolm McLean launched modern container shipping in 1956, which made loading ships far faster and cheaper.", "Shipping containers were first used in 2006."],
      ["Container ship capacity is measured in TEU, “twenty-foot equivalent units”.", "Container ship capacity is measured in kilograms of paint."],
      ["The Panama Canal, opened in 1914, uses locks to lift ships about 26 metres up to Gatún Lake.", "The Panama Canal is completely flat and has no locks."],
      ["The Suez Canal has no locks because the sea levels at each end are similar.", "The Suez Canal has more locks than any other canal."],
      ["“Just-in-time” production, which keeps stock very low, is closely associated with Toyota.", "Just-in-time means keeping huge stockpiles of every part."],
      ["The first product scanned with a UPC barcode at a shop checkout, in 1974, was a pack of chewing gum.", "The first barcode scan was a car in 1994."],
      ["The “bullwhip effect” describes how small changes in customer demand become bigger swings further up the supply chain.", "The bullwhip effect means demand stays the same at every stage of a supply chain."],
      ["In March 2021 the container ship Ever Given blocked the Suez Canal for six days, delaying hundreds of ships.", "The Ever Given blocked the Panama Canal for a year."],
      ["The word “logistics” was first used for moving and supplying armies.", "“Logistics” was first used to describe logic puzzles."],
      ["A “cold chain” keeps products such as vaccines and fresh food at controlled temperatures from production to customer.", "A cold chain is a chain used to lock refrigerators."],
      ["The International Chamber of Commerce publishes Incoterms, standard rules for who pays and is responsible for goods during international shipping.", "Incoterms are laws passed by each country’s parliament."],
      ["The “last mile”, the final step of delivery to the customer, is often the most expensive part of shipping.", "The last mile is usually the cheapest part of delivery."],
      ["Kanban, a Japanese word meaning “signboard”, uses visual cards to signal when stock needs replacing.", "Kanban means “warehouse” in Japanese."],
      ["Reverse logistics handles goods travelling back from customers: returns, repairs and recycling.", "Reverse logistics means delivering goods backwards in time."],
      ["Small island states import much of their food and fuel, so reliable ports and shipping are vital to daily life.", "Small islands produce everything they need and rarely import goods."],
      ["Most world trade by volume travels by sea.", "Most world trade by volume travels by air."],
      ["Clear communication of orders, tracking numbers and delivery times is central to supply chains: one mistyped code can send goods to the wrong port.", "Communication has little effect on supply chains.", "C|A practical example of the cost of noise and ambiguity in communication."]
    ],
    it: [
      ["In 1947 Grace Hopper’s team found a real moth stuck in the Harvard Mark II computer and taped it in the logbook as the “first actual case of bug being found”.", "The word “bug” for a computer fault was invented in 2010."],
      ["Tim Berners-Lee created the World Wide Web at CERN, and the first website went online in 1991.", "The first website went online in 1961."],
      ["The Internet and the World Wide Web are not the same: the Web is one service that runs on the Internet.", "The Internet and the World Wide Web are two names for exactly the same thing."],
      ["The QWERTY keyboard layout was designed for typewriters in the 1870s.", "The QWERTY layout was designed for smartphones."],
      ["One byte is made up of 8 bits.", "One byte is made up of 2 bits."],
      ["The first hard drive to store more than a gigabyte (IBM, 1980) was about the size of a fridge and weighed hundreds of kilograms.", "The first gigabyte hard drive fitted on a fingertip."],
      ["“Wi-Fi” is a brand name; it is not officially short for “wireless fidelity”.", "Wi-Fi officially stands for “wireless fidelity”."],
      ["CAPTCHA stands for “Completely Automated Public Turing test to tell Computers and Humans Apart”.", "CAPTCHA stands for “Computer Access Password To Check Human Access”."],
      ["A padlock in the browser means the connection is encrypted (HTTPS), not that the website is honest or safe.", "A padlock in the browser guarantees that a website is trustworthy.", "C|Evaluating sources online means checking more than a padlock."],
      ["Gordon Moore observed in 1965 that the number of components on a chip was doubling regularly (“Moore’s law”).", "Moore’s law is a legal act passed by parliament."],
      ["“The cloud” is really other computers in large data centres.", "Cloud storage keeps your files floating in the atmosphere."],
      ["The “save” icon in many programs is still a picture of a floppy disk.", "The save icon is a picture of a USB stick."],
      ["VisiCalc (1979) was the first spreadsheet program for personal computers.", "The first spreadsheet program was released in 2009."],
      ["Longer passphrases are generally much harder to crack than short passwords with a few symbols.", "A short password is always safer than a long one."],
      ["Phishing tricks people, not machines: it is a type of social engineering.", "Phishing is a hardware fault in computer keyboards.", "C|Phishing messages are persuasive texts: look at their urgency, authority and emotional appeals."],
      ["ASCII originally used 7 bits to code 128 characters; Unicode was created to cover the world’s scripts and now includes emoji.", "ASCII can display every language and emoji."],
      ["Two-factor authentication asks for two different kinds of proof, such as a password plus a code sent to your phone.", "Two-factor authentication means typing your password twice."]
    ],
    cs: [
      ["Ada Lovelace published what is often called the first computer program, for Charles Babbage’s Analytical Engine, in 1843.", "Ada Lovelace wrote the first computer program in 1993."],
      ["Alan Turing’s 1936 paper on “computable numbers” laid foundations for the theory of computing.", "Alan Turing invented the smartphone in 1936."],
      ["Binary search can find an item in a sorted list of one million items in about 20 comparisons.", "Binary search must check every one of a million items."],
      ["The “Hello, World!” program was popularised by Kernighan and Ritchie’s 1978 book on the C language.", "“Hello, World!” was first written in the 1600s."],
      ["The programming language Python is named after the comedy group Monty Python, not the snake.", "Python is named after the snake because it is very long."],
      ["The first programmers of the ENIAC computer in the 1940s were six women.", "The ENIAC was programmed entirely by robots."],
      ["Boolean logic (true/false, AND, OR, NOT) is named after mathematician George Boole.", "Boolean logic is named after a computer called the Boole."],
      ["Margaret Hamilton led the team that wrote the onboard flight software for the Apollo missions.", "The Apollo missions used no software at all."],
      ["The Apollo Guidance Computer had far less memory than a modern smartphone.", "The Apollo Guidance Computer had more memory than any modern smartphone."],
      ["Linus Torvalds began the Linux kernel in 1991 as a student project.", "Linux was created by a large company in 1951."],
      ["Alan Turing proposed the “imitation game” (now called the Turing test) in 1950.", "The Turing test was created in 2020 for smartphones."],
      ["JavaScript and Java are different languages; the similar name was largely a marketing decision.", "JavaScript is simply a smaller version of Java."],
      ["Tony Hoare developed the Quicksort algorithm around 1959.", "Quicksort was invented in 2015."],
      ["The “Y2K” problem came from programs storing years with only two digits, so 2000 could be read as 1900.", "The Y2K problem was caused by computers running out of electricity."],
      ["An HTTP 404 error means the server could not find the requested page.", "An HTTP 404 error means your computer has a virus."],
      ["Recursion is when a function solves a problem by calling itself on a smaller version of that problem.", "Recursion means a program that never stops running."],
      ["Algorithms must be precise: a computer follows instructions literally, which is why ambiguous instructions cause bugs.", "Computers can guess what an ambiguous instruction means.", "C|Writing clear instructions is a Communication Studies skill (technical/expository writing)."]
    ],
    dm: [
      ["“Pixel” is short for “picture element”.", "“Pixel” is short for “pixie element”."],
      ["Screens mix red, green and blue light (RGB, additive), while printers mix cyan, magenta, yellow and black ink (CMYK, subtractive).", "Screens and printers both create colour using only CMYK."],
      ["The K in CMYK stands for “key”, the key printing plate, usually black.", "The K in CMYK stands for “Kelvin”."],
      ["Most cinema films are shot at 24 frames per second.", "Cinema films are shot at 2 frames per second."],
      ["JPEG compression is lossy (it throws some data away), while PNG is lossless.", "JPEG is lossless and PNG is lossy."],
      ["Vector graphics are made of mathematical paths, so they can scale to any size without losing quality.", "Vector graphics become blurry as soon as they are enlarged."],
      ["The oldest surviving camera photograph, taken by Nicéphore Niépce around 1826–27, needed an exposure of hours or even days.", "The first photograph was taken in 1990 with a digital camera."],
      ["Kerning adjusts the space between two specific letters; tracking adjusts the spacing across a whole word or line.", "Kerning and tracking both mean changing font colour."],
      ["Copyright usually exists automatically as soon as an original work is created; registration is not required in Berne Convention countries.", "You must register a photo with the government before it has any copyright.", "C|Ethics and the law of using others’ media: always credit and check licences."],
      ["Creative Commons licences let creators say in advance how others may reuse their work.", "Creative Commons means anyone may use any image online for any purpose."],
      ["“Lorem ipsum” placeholder text comes from a scrambled passage of Cicero’s Latin, written in 45 BC.", "“Lorem ipsum” was invented by a computer in 1999."],
      ["In hex colour codes, #FFFFFF is white and #000000 is black.", "In hex colour codes, #FFFFFF is black."],
      ["Green screens are usually green because green is far from human skin tones and camera sensors are very sensitive to it.", "Green screens are green because green is the cheapest paint."],
      ["Film-makers follow the 180-degree rule so that characters keep consistent left-right positions on screen.", "The 180-degree rule says the camera must spin in a full circle every scene."],
      ["The “golden hour” shortly after sunrise and before sunset gives soft, warm light prized by photographers.", "The golden hour is midday, when shadows are harshest."],
      ["The rule of thirds places key subjects along imaginary lines dividing the frame into thirds.", "The rule of thirds says every subject must be in the exact centre."],
      ["Every media text is constructed for an audience and purpose, through choices of shots, words, sounds and editing.", "Media texts are neutral windows on reality with no choices involved.", "C|This is the core of media literacy and the analysis of persuasive texts."]
    ],
    anim: [
      ["Snow White and the Seven Dwarfs (1937) was Disney’s first full-length animated feature film.", "Disney’s first full-length animated feature was released in 1995."],
      ["Disney animators Frank Thomas and Ollie Johnston set out “12 principles of animation”, including squash and stretch, in their 1981 book The Illusion of Life.", "The 12 principles of animation were written by Shakespeare."],
      ["Toy Story (1995) was the first feature film made entirely with computer animation.", "Toy Story was hand-drawn on paper."],
      ["Traditional animation is often drawn “on twos”: 12 drawings per second, each shown for two frames.", "Traditional animation always uses 100 drawings per second."],
      ["Pong (1972) was one of the first commercially successful arcade video games.", "Pong was released in 2012."],
      ["Tetris was created by Alexey Pajitnov in the Soviet Union in 1984.", "Tetris was created in Japan in 2004."],
      ["According to its designer Toru Iwatani, Pac-Man’s shape was inspired by a pizza with a slice missing.", "Pac-Man’s shape was inspired by a dinner plate."],
      ["Mario first appeared in Donkey Kong (1981), where he was called “Jumpman”.", "Mario first appeared in a 2001 film."],
      ["Squash and stretch gives animated objects a sense of weight and flexibility.", "Squash and stretch makes animated objects look stiff and heavy."],
      ["Stop-motion animation films real objects or models moved slightly between each frame.", "Stop-motion animation is made only with 3D software."],
      ["Rotoscoping, tracing over live-action film frame by frame, was invented by Max Fleischer in 1915.", "Rotoscoping was invented in 2015."],
      ["In animation, keyframes mark the main poses and the in-between frames (“tweening”) fill the motion between them.", "Keyframes are the frames in between the main poses."],
      ["The “uncanny valley”, our unease with almost-human faces, was named by roboticist Masahiro Mori in 1970.", "The uncanny valley is a real valley in California."],
      ["Spacewar! (1962), made at MIT, was one of the earliest digital computer games.", "The first digital computer game was made in 2002."],
      ["Game designers talk about the “core loop”: the main repeated actions players perform.", "The core loop is the game’s ending credits."],
      ["Playtesting with real players is essential, because designers cannot easily see their own game through a newcomer’s eyes.", "Game designers never need to test with players."],
      ["Video games tell stories through environment, sound and player choices as well as words, which makes them a form of multimodal communication.", "Video games cannot communicate stories.", "C|Multimodal texts combine words, images, sound and interaction."]
    ],
    perf: [
      ["The steelpan was developed in Trinidad and Tobago in the twentieth century, from oil drums and earlier tamboo bamboo bands.", "The steelpan was invented in Ancient Egypt."],
      ["Soca developed in the 1970s; Trinidadian artist Lord Shorty (later Ras Shorty I) is widely credited as a pioneer.", "Soca was created in the 1870s in Europe."],
      ["“Kaiso” is an older name for calypso.", "Kaiso is a type of Japanese theatre."],
      ["The word “thespian” comes from Thespis, said to be the first actor of Ancient Greek theatre.", "“Thespian” comes from the name of a modern film studio."],
      ["Actors say “break a leg” because of a theatre superstition that wishing “good luck” brings bad luck.", "Actors say “break a leg” because they want each other to get hurt."],
      ["Shakespeare’s Globe Theatre in London first opened in 1599.", "Shakespeare’s Globe first opened in 1999 as the original theatre."],
      ["Stage left and stage right are named from the actor’s point of view, facing the audience.", "Stage left and right are named from the audience’s point of view."],
      ["Ballet began in Italian Renaissance courts and developed in France, which is why ballet terms are French.", "Ballet began in the twentieth century in Australia."],
      ["Beryl McBurnie founded the Little Carib Theatre in Trinidad in 1948 to celebrate Caribbean dance.", "The Little Carib Theatre was founded in London in 1990."],
      ["Derek Walcott founded the Trinidad Theatre Workshop in 1959.", "The Trinidad Theatre Workshop was founded by Shakespeare."],
      ["“A cappella” means singing without instruments; it comes from the Italian for “in the manner of the chapel”.", "A cappella means singing with a full orchestra."],
      ["The piano’s full name, pianoforte, means “soft-loud”.", "Pianoforte means “very fast”."],
      ["Commedia dell’arte, an Italian form of theatre, used stock characters and improvisation.", "Commedia dell’arte used only fully scripted plays with no stock characters."],
      ["Junkanoo is a street parade with costumes and music in The Bahamas, held around Boxing Day and New Year’s Day.", "Junkanoo is a silent film festival in Iceland."],
      ["Ballet dancers “spot” (fix their eyes on one point) to avoid getting dizzy when turning.", "Ballet dancers close their eyes while spinning to avoid dizziness."],
      ["Good voice projection uses controlled breathing from the diaphragm rather than shouting from the throat.", "Voice projection means shouting as loudly as possible from the throat.", "C|Directly useful for oral presentations in Communication Studies."],
      ["Quadrille dances in the Caribbean adapted European ballroom dances with local rhythms and styles.", "Quadrille dances were invented in the Caribbean in 2010."]
    ],
    law: [
      ["The Code of Hammurabi (about 1754 BC) is one of the oldest written law codes.", "The Code of Hammurabi was written in 1754 AD."],
      ["Habeas corpus means “you shall have the body” and protects people against unlawful detention.", "Habeas corpus means “guilty until proven innocent”."],
      ["Defamation in written or permanent form is generally called libel; spoken defamation is slander.", "Libel is spoken defamation and slander is written.", "C|Media ethics: think before you post."],
      ["Common law systems follow precedent, known as stare decisis (“to stand by things decided”).", "Common law systems ignore earlier court decisions."],
      ["Sint Maarten’s legal system is based on Dutch civil law, while many Commonwealth Caribbean countries follow English common law.", "Sint Maarten’s legal system is based entirely on English common law."],
      ["Barbados, Guyana and Belize were among the first countries to accept the Caribbean Court of Justice as their final court of appeal.", "No country accepts the CCJ as a final court of appeal."],
      ["A valid contract usually requires offer, acceptance, consideration and an intention to create legal relations.", "A contract only needs one person to want it."],
      ["Copyright protects the expression of an idea, not the idea itself.", "Copyright protects ideas even if they are never written or recorded."],
      ["The Latin maxim ignorantia juris non excusat means “ignorance of the law is no excuse”.", "Ignorantia juris non excusat means “ignorance excuses every crime”."],
      ["Criminal liability usually needs both a guilty act (actus reus) and a guilty mind (mens rea).", "Mens rea means the guilty act and actus reus means the guilty mind."],
      ["Sub judice rules can restrict what the media publish about a case still before the courts.", "The media may publish anything about a case still in court with no restriction.", "C|Media law shapes how journalists communicate."],
      ["“Pro bono” means legal work done free, “for the public good”.", "Pro bono means a lawyer charges double fees."],
      ["Hearsay, second-hand evidence of what someone else said, is often restricted in court.", "Hearsay is the most trusted form of evidence."],
      ["The blindfold on statues of Lady Justice symbolises impartiality.", "The blindfold on Lady Justice symbolises sleep."],
      ["Plagiarism is an academic offence even when it is not illegal; copyright infringement is a legal matter.", "Plagiarism and copyright infringement are always exactly the same thing.", "C|Acknowledge sources in all your academic writing."],
      ["Article 19 of the Universal Declaration of Human Rights protects freedom of opinion and expression.", "Article 19 of the UDHR bans freedom of expression."],
      ["The presumption of innocence means the prosecution must prove guilt; the accused does not have to prove innocence.", "The presumption of innocence means the accused must prove they are innocent."]
    ],
    soc: [
      ["Auguste Comte is usually credited with coining the word “sociology” in the 1830s.", "The word sociology was coined in 2001."],
      ["Émile Durkheim’s study Suicide (1897) showed how social factors influence even very personal acts.", "Durkheim’s Suicide argued that society has no effect on individuals."],
      ["Max Weber published The Protestant Ethic and the Spirit of Capitalism in 1905.", "Max Weber wrote about smartphones in 1905."],
      ["Primary socialisation happens mainly in the family; secondary socialisation happens through school, peers, media and work.", "Primary socialisation happens mainly through the workplace."],
      ["The Thomas theorem states that if people define situations as real, they are real in their consequences.", "The Thomas theorem says perceptions never affect behaviour."],
      ["Robert K. Merton described the “self-fulfilling prophecy”, where a belief causes itself to come true.", "A self-fulfilling prophecy is a prediction that always fails."],
      ["Anthropologist Robin Dunbar suggested that people can maintain about 150 stable social relationships.", "Dunbar suggested people can maintain about 15,000 close relationships."],
      ["The “bystander effect” suggests people are less likely to help when many others are present.", "The bystander effect says people help more when a crowd is watching."],
      ["Stanley Milgram’s 1960s obedience experiments studied how far people would follow orders from an authority figure.", "Milgram’s experiments studied plant growth."],
      ["Stanley Cohen’s idea of a “moral panic” (1972) describes exaggerated media and public alarm about a group seen as a threat.", "A moral panic is a calm, accurate media report.", "C|Ideal for analysing media representation in Module 3."],
      ["Agenda-setting theory (McCombs and Shaw, 1972) argues the media influence what people think about.", "Agenda-setting theory says the media have no influence on public attention.", "C|A strong theory to cite in essays about the media."],
      ["Sociolinguists use “code-switching” for moving between languages or varieties, such as Creole and Standard English, depending on the situation.", "Code-switching means writing computer code in two languages.", "C|Core Module 2 concept."],
      ["Raymond T. Smith used the term “matrifocal” to describe Caribbean households where mothers hold central authority.", "Matrifocal means a household led by a grandfather."],
      ["George Beckford’s Persistent Poverty (1972) argued that the plantation system left lasting effects on Caribbean societies.", "Persistent Poverty argued that plantations had no lasting effects."],
      ["A diaspora is a population that has spread from its homeland; large Caribbean diasporas live in cities such as New York, Toronto, London and Amsterdam.", "A diaspora is a group that has never left its homeland."],
      ["Participant observation is a research method where the researcher joins the group being studied.", "Participant observation means studying people only from statistics."],
      ["Social media “echo chambers” can reinforce existing beliefs by showing people mainly views they already agree with.", "Echo chambers expose people mostly to opposing views."]
    ],
    lang: [
      ["Spanish is an official language in about 20 countries.", "Spanish is an official language in only one country."],
      ["Papiamentu, spoken in Aruba, Bonaire and Curaçao, blends Portuguese, Spanish, Dutch and African influences.", "Papiamentu is a dialect of Japanese."],
      ["Haitian Creole (Kreyòl) is an official language of Haiti alongside French.", "French is Haiti’s only official language."],
      ["Mandarin Chinese is a tonal language: the syllable “ma” can mean different things depending on its tone.", "Mandarin has no tones; pitch never changes meaning."],
      ["Sranan Tongo is an English-based Creole widely spoken in Suriname.", "Sranan Tongo is a Dutch dialect spoken only in Amsterdam."],
      ["“Bungalow” came into English from Hindi/Bengali, meaning “house in the Bengal style”.", "“Bungalow” came into English from Russian."],
      ["Esperanto was created in 1887 by L. L. Zamenhof as an easy international language.", "Esperanto is the oldest language in the world."],
      ["Basque, spoken in Spain and France, is a language isolate: it is not known to be related to any other living language.", "Basque is a dialect of Spanish."],
      ["The Spanish word embarazada means “pregnant”, not “embarrassed”: a classic false friend.", "Embarazada means “embarrassed” in Spanish."],
      ["In French, une librairie is a bookshop; a library is une bibliothèque.", "Une librairie is the French word for a library."],
      ["The name “Santa Claus” comes from the Dutch Sinterklaas.", "“Santa Claus” comes from the Japanese word for winter."],
      ["Arabic and Hebrew are written from right to left.", "Arabic is written from bottom to top."],
      ["Japanese is written using three scripts: hiragana, katakana and kanji.", "Japanese uses the same alphabet as English."],
      ["Dutch and English are the official languages of Sint Maarten.", "Spanish is the only official language of Sint Maarten."],
      ["Sign languages are full languages with their own grammar; American Sign Language and British Sign Language are different languages.", "There is one universal sign language used in every country.", "C|Sign languages are a key example of non-verbal and visual language."],
      ["Many languages borrow words from each other: English “kindergarten” comes from German.", "“Kindergarten” is an original English word."],
      ["Bilingual speakers often code-switch naturally in conversation, which is a skill, not a sign of weak language.", "Code-switching shows that a speaker does not know either language well.", "C|Use this to challenge negative attitudes in Module 2."]
    ],
    sxm: [
      ["Hispaniola is shared by two countries: Haiti in the west and the Dominican Republic in the east.", "Hispaniola is divided among five countries."],
      ["The Treaty of Concordia (1648) divided St Martin between the French and the Dutch.", "The Treaty of Concordia gave the whole island to Spain."],
      ["A popular legend says the border was set by a Frenchman and a Dutchman walking around the island in opposite directions; it is a legend, not recorded history.", "Historians have proven that the border was set by a walking race.", "E|A great example of oral tradition and how legends spread."],
      ["Barbados became a parliamentary republic on 30 November 2021.", "Barbados became a republic in 1821."],
      ["The Pitch Lake at La Brea, Trinidad, is the world’s largest natural deposit of asphalt.", "The Pitch Lake is a freshwater swimming lake in Jamaica."],
      ["Kaieteur Falls in Guyana is one of the world’s most powerful single-drop waterfalls.", "Kaieteur Falls is a small stream in Barbados."],
      ["Haiti became the first independent Black republic in 1804, after a revolution led by formerly enslaved people.", "Haiti gained its independence in 1904."],
      ["Montserrat’s old capital, Plymouth, was buried by eruptions of the Soufrière Hills volcano from 1995 onwards.", "Plymouth is still Montserrat’s busy capital today."],
      ["Jamaica’s national motto is “Out of Many, One People”.", "Jamaica’s national motto means “always resting”."],
      ["The flamingo is the national bird of The Bahamas.", "The Bahamas has no national bird."],
      ["Slavery was abolished in the British Caribbean in 1834, followed by an apprenticeship system that ended in 1838.", "Slavery ended across the whole Caribbean on the same day."],
      ["Belize’s barrier reef, part of the Mesoamerican Reef, is the largest barrier reef in the Western Hemisphere.", "Belize has no coral reefs."],
      ["Saba’s airport has one of the shortest commercial runways in the world.", "Saba’s airport has one of the longest runways in the world."],
      ["Hurricane Irma struck Barbuda, St Martin and the British Virgin Islands as a Category 5 storm in September 2017.", "Hurricane Irma was a mild tropical storm in 1917."],
      ["Emancipation Day is marked on 1 August in many Commonwealth Caribbean countries and on 1 July (Keti Koti) in Suriname.", "Emancipation Day is celebrated on Christmas Day everywhere."],
      ["Sint Maarten is a multilingual society: English is widely spoken alongside Dutch, Spanish, Papiamentu, French and Kreyòl.", "Only Dutch is ever heard on Sint Maarten.", "C|A clear case study for language situations in Module 2."],
      ["Papiamento, spoken in Aruba, Bonaire and Curaçao, is a Creole with Portuguese, Spanish, Dutch and African influences.", "Papiamento is a dialect of French spoken only in Haiti."]
    ]
  };

  const SMAP = {}; SUBJ.forEach(s => SMAP[s[0]] = s);
  const ALL = []; SUBJ.forEach(s => (F[s[0]] || []).forEach((f, i) => ALL.push({ id: s[0] + i, s: s[0], t: f[0], f: f[1], n: f[2] || '' })));
  const BYID = {}; ALL.forEach(x => BYID[x.id] = x);
  const factsOf = k => k === 'all' || !SMAP[k] ? ALL : ALL.filter(x => x.s === k);

  /* =========================================================
     DATA 2: STUDY SMARTER
     ========================================================= */
  const TIPS = [
    ['retrieval', 'I reread my notes many times but forget them in the exam.', 'Retrieval practice', 'Close the book and test yourself: flashcards, blank-page recall, practice questions. Pulling information out of memory strengthens it far more than rereading.'],
    ['spacing', 'I cram everything the night before.', 'Spaced repetition', 'Spread reviews over days and weeks with growing gaps (1 day, 3 days, a week). Forgetting a little between reviews makes the next recall stronger.'],
    ['interleave', 'I can do one topic at a time, but I mix things up when the paper jumbles topics.', 'Interleaving', 'Mix different topics or question types in one session so you practise choosing the right approach, just like in the exam.'],
    ['elaborate', 'I can recite definitions but cannot explain them.', 'Elaboration', 'Ask “how?” and “why?” and connect new ideas to what you already know. Explaining links builds deeper understanding.'],
    ['dual', 'My pages of notes all blur together.', 'Dual coding', 'Combine words with visuals: timelines, diagrams, flow charts, icons. Two routes into memory are better than one.'],
    ['concrete', 'Theories like communication models feel vague and abstract.', 'Concrete examples', 'Attach every abstract idea to a real, specific example (a WhatsApp chat, a radio ad, a class debate). Examples make ideas stick and earn marks.'],
    ['pomodoro', 'I cannot get started, or I get distracted after ten minutes.', 'Pomodoro technique', 'Work for 25 focused minutes, then take a 5-minute break. Short, timed sprints make starting easier and protect concentration.'],
    ['sleep', 'I stay up all night before exams.', 'Protect your sleep', 'Sleep helps the brain consolidate memories. An all-nighter usually costs more marks than the extra hours gain.'],
    ['pastpaper', 'I run out of time in exams.', 'Timed past papers', 'Practise past and specimen papers under real time limits. You learn pacing, the question style and how marks are allocated.'],
    ['teach', 'I think I understand a topic, but I am not sure.', 'Teach someone else', 'Explain it to a friend, a sibling or an empty chair. Gaps in your explanation show you exactly what to revise.'],
    ['phone', 'My phone keeps interrupting my study.', 'Remove distractions', 'Put your phone in another room or switch on focus mode. Every interruption costs time to refocus.'],
    ['markscheme', 'I do not know what the examiner wants.', 'Use mark schemes', 'Study the marking scheme or rubric, then mark your own answers against it. You learn what earns marks (for essays: content, organisation, expression).'],
    ['errorlog', 'I keep making the same mistakes.', 'Keep a mistakes log', 'Record every error, why it happened and the fix. Redo those questions a few days later.'],
    ['move', 'I feel sluggish after hours of sitting.', 'Active breaks', 'Short walks or stretches between sessions boost alertness and mood.'],
    ['goal', 'My study sessions have no clear direction.', 'Set a specific goal', 'Start each session with a precise target: “Learn the 4 types of fallacy and write one example of each by 5 pm.”'],
    ['highlight', 'I highlight almost everything on the page.', 'Turn highlights into questions', 'Highlighting alone is a weak strategy. Turn each key point into a question you can answer from memory later.'],
    ['selfexplain', 'I follow worked examples but cannot do new questions.', 'Self-explanation', 'As you study a model answer, explain to yourself why each step or sentence is there. Then try a similar question without help.'],
    ['anxiety', 'I panic and my mind goes blank in exams.', 'Calm and rehearse', 'Practise under exam-like conditions, use slow breathing, and try writing down your worries for a few minutes before the exam to free up working memory.'],
    ['multitask', 'I study while watching videos and chatting.', 'Single-task', 'Your attention cannot do two demanding things well at once. Study first, then enjoy the video as a reward.'],
    ['rag', 'I do not know what I do not know.', 'Traffic-light the syllabus', 'Rate every syllabus objective red, amber or green, then plan your revision around the reds and ambers.'],
    ['condense', 'My notes are too long to revise from.', 'Condense, then test', 'Reduce each topic to one page or a set of flashcards, then use them to quiz yourself rather than just reading them.']
  ];

  const VQ = [
    ['You need to learn the parts of the Shannon-Weaver model. You would rather…', ['draw it as a labelled diagram', 'hear someone explain it aloud', 'read the textbook section and make notes', 'act it out by passing a message around the class']],
    ['You are given directions to a new place. You prefer…', ['a map', 'someone telling you the way', 'written step-by-step directions', 'going with someone and learning the route by walking it']],
    ['When you revise, you most enjoy…', ['colour-coded mind maps and charts', 'talking it through with a study buddy', 'rewriting notes and lists', 'doing practice tasks and moving around']],
    ['You remember a teacher’s lesson best when…', ['there were clear slides and diagrams', 'the teacher told stories and explained aloud', 'there was a handout to read', 'there was a hands-on activity']],
    ['You want to learn to use a new app. You…', ['watch a video with on-screen highlights', 'ask a friend to talk you through it', 'read the help pages', 'just start tapping and experiment']],
    ['To prepare a speech, you would…', ['plan it as a visual outline or storyboard', 'say it aloud many times', 'write it out in full, then edit', 'rehearse it standing up, with gestures']],
    ['When a word is hard to spell, you…', ['picture how it looks', 'sound it out', 'write it several times', 'trace or type it to feel the pattern']],
    ['You are choosing a new phone. You would most want…', ['to see pictures and comparison charts', 'to hear reviews or ask a salesperson', 'to read detailed specifications', 'to hold and try the phones in a shop']],
    ['During a group project, you usually…', ['design the poster or slides', 'lead the discussion', 'write and edit the report', 'build the model or organise the event']],
    ['You understand a new idea best through…', ['a diagram or flow chart', 'a discussion or podcast', 'a well-written explanation', 'a real example you can try']],
    ['When you are bored in class, you…', ['doodle', 'chat or hum', 'read something', 'fidget or want to move']],
    ['To remember a list of key terms, you…', ['make picture cards', 'record yourself saying them', 'write definitions in a table', 'use flashcards you sort into piles physically']]
  ];
  const VK = [['v', 'Visual', '#F5C542'], ['a', 'Auditory', '#7FB7FF'], ['r', 'Reading/Writing', '#4FD18B'], ['k', 'Kinaesthetic', '#FF9E6B']];
  const VTIPS = {
    v: ['Turn notes into timelines, flow charts and labelled diagrams (dual coding).', 'Colour-code the three modules of the syllabus.', 'Sketch the structure of an essay before writing it.'],
    a: ['Explain topics aloud, then check your explanation against your notes.', 'Use the read-aloud buttons in this course and listen back.', 'Form a study group and quiz each other verbally.'],
    r: ['Rewrite notes as Cornell summaries and practice paragraphs.', 'Make lists of key terms with your own definitions.', 'Answer past-paper questions in full written form.'],
    k: ['Use flashcards you physically sort into “know” and “not yet” piles.', 'Study in short active bursts; walk while you recall.', 'Role-play interviews, debates and oral presentations.']
  };

  const NOTEM = [
    { id: 'cornell', name: 'Cornell notes', when: 'Lectures and textbook study you will revise later. The cue column turns notes into self-test questions.', how: 'Divide the page: a narrow left “cues” column, a wide right “notes” column and a summary strip at the bottom. Take notes on the right, add questions or key words on the left after class, then summarise in 2–3 sentences.' },
    { id: 'outline', name: 'Outline method', when: 'Well-organised lessons or readings with clear headings and subpoints.', how: 'Use headings, indented subpoints and numbering (I, A, 1, a) to show how ideas relate. Major ideas sit furthest left.' },
    { id: 'mind', name: 'Mind map', when: 'Brainstorming, planning an essay, and seeing connections between ideas.', how: 'Put the central topic in the middle, draw branches for main ideas and smaller twigs for details. Use colour and images.' },
    { id: 'chart', name: 'Charting (table) method', when: 'Comparing several items on the same criteria, e.g. three sources, two models, types of fallacies.', how: 'Draw columns for the categories you are comparing and fill each row with facts. Great for quick revision.' },
    { id: 'flow', name: 'Flow chart', when: 'Processes, sequences and cause and effect, e.g. the communication process or research steps.', how: 'Write each stage in a box and join boxes with arrows to show order or cause.' },
    { id: 'sentence', name: 'Sentence method', when: 'Fast talks with lots of information and no clear structure.', how: 'Write each new fact or idea as a short numbered sentence on a new line. Reorganise later.' },
    { id: 'sq3r', name: 'SQ3R note sheet', when: 'Reading a textbook chapter or article for the first time.', how: 'Survey the text, turn headings into Questions, Read to answer them, Recite answers from memory, then Review. Your sheet records the questions and answers.' },
    { id: 'boxing', name: 'Boxing method', when: 'Lessons with several separate subtopics; also great on tablets.', how: 'Group all notes about one subtopic inside a box. Each box becomes a mini revision card you can focus on separately.' }
  ];
  const NSCEN = [
    ['You must compare three newspapers’ reports of the same event on bias, tone, sources and audience.', 'chart'],
    ['Your lecturer’s slides have clear headings, subheadings and bullet points.', 'outline'],
    ['You are generating ideas for an expository essay on social media and Caribbean youth.', 'mind'],
    ['You are noting the stages of how a message travels from sender to receiver, including feedback.', 'flow'],
    ['A guest speaker talks very fast, jumping between many unconnected facts.', 'sentence'],
    ['You are reading a new textbook chapter on language and dialect for the first time.', 'sq3r'],
    ['You want notes on a lecture that you can later cover up to quiz yourself before the exam.', 'cornell'],
    ['A lesson covers four distinct subtopics: verbal, non-verbal, visual and electronic communication.', 'boxing']
  ];

  /* =========================================================
     DATA 3: COLLEGE READY
     ========================================================= */
  const ROAD = [
    ['CAPE Year 1 (Lower Sixth)', 'Term 1–3', ['Settle into Unit 1 subjects and build strong study habits.', 'Explore careers and programmes that interest you; attend open days and talks.', 'Start a “brag file”: achievements, clubs, volunteering, awards.', 'Ask your teachers which subjects or units universities in your field expect.']],
    ['Summer between years', 'Holiday', ['Research programmes and entry requirements on official university websites.', 'Volunteer, job-shadow or take a short course linked to your interests.', 'Draft your personal statement.', 'Check passport validity if you may study abroad.']],
    ['CAPE Year 2 (Upper Sixth), early', 'Term 1', ['Shortlist programmes and universities (regional and international).', 'Note every application deadline and requirement in one calendar.', 'Request references early, giving referees at least a few weeks.', 'Research scholarships and financial aid and their deadlines.']],
    ['Applications', 'Term 1–2', ['Submit applications carefully: proofread every field.', 'Send transcripts, results and any test scores as each institution requires.', 'Prepare for interviews, auditions or portfolio reviews where needed.', 'Keep copies of everything and a log of what you sent and when.']],
    ['Offers and decisions', 'Term 2–3', ['Compare offers: programme, total cost, location, support, credits accepted.', 'Accept by the stated deadline and check the conditions of your offer.', 'Apply for housing, visas or study permits if needed, as early as possible.', 'Sit CAPE exams: conditional offers often depend on your results.']],
    ['Transition', 'Summer → first semester', ['Confirm results are sent to your university.', 'Plan your budget, banking and travel.', 'Join orientation, find student support services and meet your advisor.', 'Keep your study habits: university is more independent.']]
  ];
  const CHOOSEQ = [
    ['The programme', ['What will I actually study in each year? Look at the course list, not just the title.', 'Is the programme accredited or recognised by the professional body in my field?', 'Does it include internships, placements or projects?', 'What do graduates go on to do?']],
    ['Entry and credits', ['What are the current entry requirements for this programme?', 'Will my CAPE units earn credits or exemptions here?', 'Is there a language requirement or test?']],
    ['Cost and support', ['What is the total cost: tuition, housing, food, travel, books, insurance?', 'Which scholarships, bursaries or loans are available, and when are their deadlines?', 'What academic, wellbeing and career support is offered to students?']],
    ['Life and fit', ['Do I want to stay close to home or experience a new country?', 'What are the class sizes and teaching style like?', 'What is the climate, culture and student community like?']]
  ];
  const UNIS = [
    ['🏝️', 'A university or college at home', 'Most territories have a national university or community college where you can study close to home, with programmes that can be a full degree or a first step before further study. Ask about the programmes on offer and partnerships with other universities.'],
    ['🌴', 'The University of the West Indies (UWI)', 'A regional university with several campuses across the Caribbean, offering a wide range of degrees. Many CAPE students apply here, and CAPE units are widely recognised.'],
    ['🎓', 'Other Caribbean universities and colleges', 'National universities, community colleges and specialist institutes across the region offer associate degrees, diplomas and degrees, often at lower cost than studying overseas.'],
    ['🇳🇱', 'Studying in the Netherlands', 'As part of the Kingdom, students from Aruba, Curaçao, Sint Maarten and the Caribbean Netherlands often look at Dutch universities (research universities) and universities of applied sciences (hogescholen). Many programmes are taught in Dutch; some are in English. Check language requirements, study financing rules and housing early.'],
    ['🇺🇸', 'United States', 'Colleges and universities offer flexible degrees where you may choose a major later. Applications may involve essays, references and sometimes test scores; some institutions grant credit for CAPE.'],
    ['🇨🇦', 'Canada', 'Universities and colleges with strong Caribbean communities in many cities. Check each institution’s CAPE recognition, study-permit process and costs.'],
    ['🇬🇧', 'United Kingdom', 'Degrees are often focused on one subject from the start and are usually three years in England. Applications usually go through a central application system with one personal statement.']
  ];
  const CHECKS = [
    ['c1', 'Explore three possible careers and the degrees they need'],
    ['c2', 'Shortlist at least three programmes (including one close to home)'],
    ['c3', 'Check current entry requirements on each official website'],
    ['c4', 'Ask each institution how it treats CAPE units for credit'],
    ['c5', 'Make a deadline calendar for applications and scholarships'],
    ['c6', 'Start a brag file of achievements and activities'],
    ['c7', 'Draft my personal statement'],
    ['c8', 'Get feedback on my personal statement and revise it'],
    ['c9', 'Request references (with a polite email and enough time)'],
    ['c10', 'Practise interview answers aloud'],
    ['c11', 'Check passport, ID and any visa or study-permit needs'],
    ['c12', 'Research scholarships, grants and financial aid'],
    ['c13', 'Estimate my total yearly costs and build a budget'],
    ['c14', 'Set up a professional email address'],
    ['c15', 'Find out where student support and counselling services are'],
    ['c16', 'Keep copies of every application and confirmation']
  ];
  const IVQ = [
    'Tell me about yourself.', 'Why do you want to study this programme?', 'Why have you chosen this university?',
    'What are your greatest strengths?', 'Tell me about a weakness and how you are working on it.',
    'Describe a time you worked in a team. What was your role?', 'Tell me about a challenge you overcame.',
    'What have you read or watched recently that relates to your chosen field?', 'Where do you see yourself in five years?',
    'How will you contribute to our student community?', 'How do you manage your time when you have many deadlines?',
    'Tell me about a time you showed leadership.', 'What would you do if you disagreed with a group member?',
    'How has growing up in the Caribbean shaped your goals?', 'Do you have any questions for us?'
  ];

  /* ---------------- utilities ---------------- */
  const CSS = `
.kn-wrap{display:flex;flex-direction:column;gap:18px;min-width:0}
.kn-hero{position:relative}
.kn-fotd{background:linear-gradient(160deg,rgba(255,227,138,.16),rgba(255,255,255,.03));border:1px solid rgba(255,215,102,.45);border-radius:16px;padding:14px 16px;color:#FFFFFF;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 0 rgba(0,0,0,.3)}
.kn-fotd b.kn-ft{font-size:clamp(1.02rem,2.4vw,1.2rem);line-height:1.4}
.kn-fotd .kn-lbl{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;font-weight:800;color:#FFE38A}
.kn-subs{display:flex;flex-wrap:wrap;gap:6px}
.kn-subs .chip{font-size:.84rem}
.kn-swipe{display:none;font-size:.78rem;color:var(--muted);margin:-6px 0 0}
@media (max-width:600px){.kn-swipe{display:block}.kn-subs{flex-wrap:nowrap;overflow-x:auto;padding-bottom:8px;-webkit-overflow-scrolling:touch;scrollbar-width:thin}.kn-subs .chip{flex:none}}
.kn-big{display:block;width:100%;perspective:1200px;background:none;border:0;padding:0;color:var(--ink);text-align:left;cursor:pointer;font:inherit}
.kn-big .kn-in{position:relative;min-height:230px;transition:transform .6s cubic-bezier(.2,.8,.2,1);transform-style:preserve-3d;display:grid}
.kn-big.on .kn-in{transform:rotateY(180deg)}
.kn-big .kn-face{grid-area:1/1;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:22px;padding:clamp(18px,4vw,30px);display:flex;flex-direction:column;justify-content:center;gap:12px;border:1px solid var(--line);
  background:radial-gradient(420px 200px at 90% 0%,rgba(245,197,66,.22),transparent 70%),linear-gradient(160deg,#16307a,#0a1638 75%);color:#F1F4FF;box-shadow:0 6px 0 rgba(0,0,0,.35),0 24px 40px -18px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.12)}
.kn-big .kn-face.kn-back{transform:rotateY(180deg);background:radial-gradient(420px 200px at 10% 100%,rgba(245,197,66,.28),transparent 70%),linear-gradient(200deg,#1d2f6b,#0b1430 75%)}
.kn-big .kn-fact{font-size:clamp(1.12rem,2.8vw,1.5rem);line-height:1.42;font-weight:700}
.kn-big .kn-tag{align-self:flex-start;font-size:.72rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:99px;background:rgba(255,215,102,.18);border:1px solid rgba(255,215,102,.4);color:#FFE38A}
.kn-big .kn-turn{font-size:.8rem;color:#C9D2F0}
.kn-bulb{position:absolute;right:16px;top:12px;font-size:2rem;filter:drop-shadow(0 0 12px rgba(255,215,102,.8))}
.kn-ctr{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;font-weight:700;color:var(--muted);font-size:.9rem}
.kn-list{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.kn-list li{display:flex;gap:10px;align-items:flex-start;border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--raise)}
.kn-list li > span{flex:1;min-width:0}
.kn-heart{flex:none;border:0;background:transparent;font-size:1.15rem;line-height:1;padding:4px;border-radius:8px;color:var(--ink)}
.kn-note{font-size:.88rem;color:var(--muted);display:block;margin-top:4px}
.kn-note b{color:var(--gold)}
.kn-tf{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.kn-tf .btn{font-size:1.05rem;padding:14px}
.kn-stmt{font-size:clamp(1.05rem,2.5vw,1.25rem);line-height:1.45;font-weight:700;border-left:5px solid var(--gold);padding:8px 14px;background:var(--raise);border-radius:0 12px 12px 0}
.kn-score{display:flex;gap:6px;flex-wrap:wrap}
.kn-score i{width:14px;height:14px;border-radius:50%;background:var(--line);display:inline-block}
.kn-score i.g{background:var(--ok)} .kn-score i.b{background:var(--bad)}
/* match game */
.kn-mgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;min-width:0}
.kn-mcol{display:flex;flex-direction:column;gap:8px;min-width:0}
.kn-mcol h4{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin:0}
.kn-m{text-align:left;border:2px solid var(--line);border-radius:12px;padding:9px 11px;font-size:.9rem;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,0)),var(--surface);color:var(--ink);box-shadow:0 3px 0 rgba(0,0,0,.28);min-width:0;overflow-wrap:anywhere}
.kn-m.sel{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold),0 0 14px var(--glow)}
.kn-m.done{border-color:var(--ok);background:var(--soft-ok);opacity:.75}
.kn-m.bad{border-color:var(--bad);animation:kn-shake .35s}
.kn-m.tip{font-weight:700}
@keyframes kn-shake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
@media (max-width:420px){.kn-m{font-size:.82rem;padding:8px 9px}}
/* bars */
.kn-vbars{display:grid;gap:10px}
.kn-vrow{display:grid;grid-template-columns:minmax(90px,150px) 1fr 28px;gap:10px;align-items:center;font-weight:700}
.kn-vt{height:26px;border-radius:8px;background:rgba(255,255,255,.08);overflow:hidden;box-shadow:inset 0 2px 0 rgba(0,0,0,.25)}
.kn-vt i{display:block;height:100%;border-radius:8px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.2);transition:width .6s}
@media (max-width:420px){.kn-vrow{grid-template-columns:96px 1fr 22px;font-size:.86rem}}
.kn-honest{border:1px dashed var(--gold-deep);border-radius:12px;padding:12px 14px;background:var(--soft-gold)}
/* note mockups */
.kn-ngrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.kn-ncard{border:1px solid var(--line);border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:10px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,0) 45%),var(--surface);box-shadow:var(--shadow);min-width:0}
.kn-ncard h3{font-size:1.05rem;margin:0}
.kn-paper{background:#FBF8EE;color:#1b2342;border-radius:10px;padding:8px;min-height:130px;font-size:.66rem;line-height:1.3;box-shadow:inset 0 0 0 1px #e3dcc4,0 4px 0 rgba(0,0,0,.25);position:relative;overflow:hidden}
.kn-paper svg{width:100%;height:auto;display:block}
.kn-paper .kn-ln{height:5px;border-radius:3px;background:#cfd6ea;margin:4px 0}
.kn-paper .kn-ln.s{width:60%} .kn-paper .kn-ln.m{width:80%}
.kn-paper .kn-h{font-weight:800;color:#0E1F55}
.kn-cg{display:grid;grid-template-columns:30% 1fr;grid-template-rows:auto auto;gap:0;border:1.5px solid #0E1F55;border-radius:4px}
.kn-cg > div{padding:4px;min-width:0;overflow-wrap:anywhere}
.kn-cg .c{border-right:1.5px solid #0E1F55;color:#A87C08;font-weight:700}
.kn-cg .s{grid-column:1/3;border-top:1.5px solid #0E1F55;background:#fff3c8}
.kn-boxes{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.kn-boxes > div{border:1.5px solid #0E1F55;border-radius:6px;padding:4px}
.kn-tbl{width:100%;border-collapse:collapse;font-size:.62rem}
.kn-tbl th,.kn-tbl td{border:1px solid #0E1F55;padding:2px 3px;text-align:left}
.kn-tbl th{background:#0E1F55;color:#FFE38A}
/* cornell template */
.kn-corn{display:grid;grid-template-columns:minmax(0,32%) minmax(0,1fr);border:2px solid var(--gold-deep);border-radius:14px;overflow:hidden;background:var(--raise)}
.kn-corn .kn-ct{grid-column:1/3;padding:10px;border-bottom:2px solid var(--gold-deep)}
.kn-corn .kn-cc{padding:10px;border-right:2px solid var(--gold-deep)}
.kn-corn .kn-cn{padding:10px}
.kn-corn .kn-cs{grid-column:1/3;padding:10px;border-top:2px solid var(--gold-deep);background:var(--soft-gold)}
.kn-corn label{font-size:.74rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:4px}
.kn-ta,.kn-in1{width:100%;border:1.5px solid var(--line);border-radius:10px;padding:8px 10px;font:inherit;background:var(--surface);color:var(--ink);resize:vertical;min-width:0;box-sizing:border-box}
.kn-ta{min-height:90px}
.kn-corn .kn-cc .kn-ta,.kn-corn .kn-cn .kn-ta{min-height:220px}
@media (max-width:520px){.kn-corn{grid-template-columns:1fr}.kn-corn .kn-cc{border-right:0;border-bottom:2px solid var(--gold-deep)}.kn-corn .kn-cc .kn-ta{min-height:110px}.kn-corn .kn-ct,.kn-corn .kn-cs{grid-column:1}}
#kn-print{display:none}
@media print{
  html.kn-printing body *{visibility:hidden !important}
  html.kn-printing #kn-print,html.kn-printing #kn-print *{visibility:visible !important}
  html.kn-printing #kn-print{display:block !important;position:absolute;left:0;top:0;width:100%;background:#fff;color:#000;font:12pt/1.45 Georgia,serif}
  #kn-print h1{font-size:16pt;margin:0 0 8pt}
  #kn-print table{width:100%;border-collapse:collapse}
  #kn-print td{border:1.5pt solid #000;vertical-align:top;padding:8pt;white-space:pre-wrap}
  #kn-print td.c{width:30%;height:16cm}
  #kn-print .foot{font-size:8pt;margin-top:6pt}
}
/* planner */
.kn-days{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px}
.kn-day{border:1px solid var(--line);border-radius:14px;padding:10px 12px;background:var(--raise);display:flex;flex-direction:column;gap:6px;min-width:0}
.kn-day.ex{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold) inset}
.kn-day h4{margin:0;font-size:.92rem;display:flex;justify-content:space-between;gap:6px}
.kn-day ul{margin:0;padding-left:0;list-style:none;display:grid;gap:4px;font-size:.86rem}
.kn-day li{display:flex;gap:6px}
.kn-sw{width:10px;height:10px;border-radius:3px;flex:none;margin-top:5px}
/* timeline */
.kn-tl{position:relative;display:grid;gap:16px;padding-left:34px}
.kn-tl::before{content:"";position:absolute;left:13px;top:6px;bottom:6px;width:4px;border-radius:4px;background:linear-gradient(180deg,var(--gold),rgba(245,197,66,.15))}
.kn-step{position:relative;border:1px solid var(--line);border-radius:16px;padding:12px 14px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,0) 45%),var(--surface);box-shadow:var(--shadow)}
.kn-step::before{content:attr(data-n);position:absolute;left:-34px;top:10px;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-weight:800;color:#0A1433;background:radial-gradient(circle at 35% 30%,#FFF3C4,#F5C542 55%,#A97A0E);box-shadow:0 3px 0 rgba(0,0,0,.4),0 0 12px var(--glow)}
.kn-step h3{margin:0;font-size:1.02rem}
.kn-step ul{margin:6px 0 0;padding-left:18px}
.kn-when{font-size:.76rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--gold)}
.kn-preview{white-space:pre-wrap;border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--raise);font-size:.95rem;overflow-wrap:anywhere}
.kn-peel{display:grid;gap:10px}
.kn-peel .field label span{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:6px;background:var(--gold);color:#0A1433;margin-right:6px;font-size:.8rem}
.kn-pc-P{border-left:4px solid #F5C542;padding-left:8px} .kn-pc-E{border-left:4px solid #7FB7FF;padding-left:8px} .kn-pc-X{border-left:4px solid #4FD18B;padding-left:8px} .kn-pc-L{border-left:4px solid #FF9E6B;padding-left:8px}
.kn-timer{font-size:clamp(2.2rem,8vw,3.4rem);font-weight:800;font-variant-numeric:tabular-nums;color:var(--gold);text-shadow:0 0 18px var(--glow)}
.kn-ring{width:120px;height:120px}
.kn-q{font-size:clamp(1.1rem,2.6vw,1.35rem);font-weight:700}
.kn-chk{display:grid;gap:6px}
.kn-chk label{display:flex;gap:10px;align-items:flex-start;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:var(--raise)}
.kn-chk input{width:20px;height:20px;accent-color:var(--gold);flex:none;margin-top:2px}
.kn-chk label.on{border-color:var(--ok);background:var(--soft-ok)}
.kn-uni{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.kn-uni .tile .ticon{font-size:1.4rem}
.kn-mini{font-size:.86rem;color:var(--muted)}
.kn-badge{display:inline-block;padding:2px 8px;border-radius:99px;font-size:.72rem;font-weight:800;background:var(--soft-gold);border:1px solid var(--line)}
@media (prefers-reduced-motion:reduce){.kn-big .kn-in{transition:none}.kn-m.bad{animation:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const tabsHTML = (view, tabs, cur) => `<div class="tabs" role="tablist">${tabs.map(([k, n]) => `<button type="button" role="tab" aria-selected="${cur === k}" class="chip ${cur === k ? 'sel' : ''}" data-go="${view}" data-tab="${k}">${n}</button>`).join('')}</div>`;
  const ls = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } } };
  function copyText(api, text) {
    const fallback = () => {
      try { const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); const ok = document.execCommand && document.execCommand('copy'); ta.remove(); api.toast(ok ? 'Copied to clipboard' : 'Select the text and copy it manually'); }
      catch (e) { api.toast('Select the text and copy it manually'); }
    };
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(() => api.toast('Copied to clipboard'), fallback); return; } } catch (e) { }
    fallback();
  }
  const dayKey = d => { d = d || new Date(); return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); };
  const listen = (api, text, label) => `<button type="button" class="tool" data-px="say" data-t="${esc(text)}" aria-label="Read aloud">🔊 ${esc(label || 'Read aloud')}</button>`;
  function noteHTML(n) { if (!n) return ''; const k = n[0], t = n.slice(2); return `<span class="kn-note"><b>${k === 'C' ? '🔗 Comm Studies link:' : '✍️ Use it in an essay:'}</b> ${esc(t)}</span>`; }

  /* =========================================================
     PLUGIN 1: DID YOU KNOW?
     ========================================================= */
  let D = null;   // deck state {k, order, pos}
  let TQ = null;  // true/false quiz state
  function dyk(api) { const S = api.S; S.dyk = S.dyk || {}; if (!Array.isArray(S.dyk.fav)) S.dyk.fav = []; return S.dyk; }
  function deckFor(api, k) {
    if (!D || D.k !== k) { const ids = factsOf(k).map(x => x.id); D = { k, order: ids, pos: 0 }; }
    return D;
  }
  function factOfDay(api) { const r = api.seeded(dayKey() * 7 + 13); r(); return ALL[Math.floor(r() * ALL.length)]; }
  function newQuiz(api, k) {
    const pool = api.shuffle(factsOf(k).slice()).slice(0, 8);
    const items = pool.map((x, i) => ({ id: x.id, truth: Math.random() < 0.5 || (i === 0) }));
    TQ = { k, items, i: 0, score: 0, ans: null, marks: [] };
  }
  const dykPlugin = {
    view: 'didyouknow', title: 'Did You Know?',
    tile: { icon: '💡', meta: `${ALL.length} surprising facts across ${SUBJ.length} subjects, a fact of the day and true-or-false quizzes` },
    render(api, loc) {
      const st = dyk(api), tab = loc.tab || 'deck', k = SMAP[loc.k] ? loc.k : 'all';
      const fd = factOfDay(api), fdS = SMAP[fd.s];
      let h = `<div class="kn-wrap"><section class="hero kn-hero"><span class="eyebrow">💡 Did You Know?</span><h1>Feed your curiosity</h1><p>${ALL.length} surprising, checked facts from ${SUBJ.length} subjects. Curious minds write richer essays: every fact is a ready-made example.</p>
        <div class="kn-fotd"><span class="kn-lbl">⭐ Fact of the day · ${fdS[2]} ${esc(fdS[1])}</span><b class="kn-ft">${esc(fd.t)}</b>${noteHTML(fd.n)}
        <div class="row">${listen(api, fd.t)}<button type="button" class="tool" data-px="fav" data-id="${fd.id}" aria-pressed="${st.fav.includes(fd.id)}" style="color:#fff">${st.fav.includes(fd.id) ? '♥ Saved' : '♡ Save'}</button></div></div></section>`;
      h += `<div class="card">${tabsHTML('didyouknow', [['deck', '🃏 Fact deck'], ['quiz', '✅ True or false?'], ['fav', `♥ My favourites (${st.fav.length})`]], tab)}`;
      if (tab !== 'fav') h += `<div class="kn-subs" role="group" aria-label="Choose a subject"><button type="button" class="chip ${k === 'all' ? 'sel' : ''}" data-go="didyouknow" data-tab="${tab}" data-k="all" aria-pressed="${k === 'all'}">✨ All subjects</button>${SUBJ.map(s => `<button type="button" class="chip ${k === s[0] ? 'sel' : ''}" data-go="didyouknow" data-tab="${tab}" data-k="${s[0]}" aria-pressed="${k === s[0]}">${s[2]} ${esc(s[1])}</button>`).join('')}</div><p class="kn-swipe" aria-hidden="true">Swipe for more subjects →</p>`;
      h += `</div>`;
      if (tab === 'deck') {
        const d = deckFor(api, k), f = BYID[d.order[d.pos]], s = SMAP[f.s], fav = st.fav.includes(f.id);
        h += `<div class="card"><div class="kn-ctr"><span>${s[2]} ${esc(s[1])}</span><span>Fact ${d.pos + 1} of ${d.order.length}</span></div><div class="pbar" aria-hidden="true"><i style="width:${Math.round((d.pos + 1) / d.order.length * 100)}%"></i></div>
          <button type="button" class="kn-big" data-px="dflip" aria-label="Flip the card to see why it matters"><span class="kn-in">
            <span class="kn-face"><span class="kn-bulb" aria-hidden="true">💡</span><span class="kn-tag">Did you know?</span><span class="kn-fact">${esc(f.t)}</span><span class="kn-turn">Tap to flip ↻</span></span>
            <span class="kn-face kn-back"><span class="kn-tag">${f.n ? (f.n[0] === 'C' ? '🔗 Comm Studies link' : '✍️ Use it in an essay') : '🗣️ Talk about it'}</span><span class="kn-fact" style="font-size:clamp(1rem,2.4vw,1.2rem)">${esc(f.n ? f.n.slice(2) : 'Comm Studies challenge: explain this fact to a younger student in two clear sentences, then say where you could check it (a reliable source).')}</span><span class="kn-turn">Tap to flip back ↻</span></span>
          </span></button>
          <div class="row"><button type="button" class="btn ghost" data-px="dprev">◀ Previous</button><button type="button" class="btn go" data-px="dnext">Next ▶</button><button type="button" class="btn gold" data-px="dshuf">🔀 Shuffle</button>
          <button type="button" class="tool" data-px="fav" data-id="${f.id}" aria-pressed="${fav}">${fav ? '♥ Saved' : '♡ Save'}</button>${listen(api, f.t)}</div></div>`;
        const list = factsOf(k);
        h += `<div class="card"><details><summary><b>See all ${list.length} facts${k === 'all' ? '' : ' in ' + esc(SMAP[k][1])}</b></summary><ul class="kn-list" style="margin-top:12px">${list.map(x => `<li><button type="button" class="kn-heart" data-px="fav" data-id="${x.id}" aria-label="${st.fav.includes(x.id) ? 'Remove from' : 'Add to'} favourites" aria-pressed="${st.fav.includes(x.id)}">${st.fav.includes(x.id) ? '♥' : '♡'}</button><span>${k === 'all' ? `<span class="kn-badge">${SMAP[x.s][2]} ${esc(SMAP[x.s][1])}</span> ` : ''}${esc(x.t)}${noteHTML(x.n)}</span></li>`).join('')}</ul></details><p class="hint">Facts are chosen to be stable and well documented. A good communicator still checks: if you use one in an essay, verify it in a reliable source.</p></div>`;
      } else if (tab === 'quiz') {
        if (!TQ || TQ.k !== k) newQuiz(api, k);
        const q = TQ, sname = k === 'all' ? 'All subjects' : SMAP[k][1];
        if (q.i >= q.items.length) {
          h += `<div class="card"><span class="kicker">True or false? · ${esc(sname)}</span><h2>You scored ${q.score} of ${q.items.length}</h2><div class="kn-score">${q.marks.map(m => `<i class="${m ? 'g' : 'b'}"></i>`).join('')}</div><p>${q.score === q.items.length ? 'Perfect! Fact-checking champion.' : q.score >= 6 ? 'Strong fact-checking.' : 'Keep reading the deck and try again.'}</p><div class="row"><button type="button" class="btn go" data-px="qagain">New round</button><button type="button" class="btn ghost" data-go="didyouknow" data-tab="deck" data-k="${k}">Back to the deck</button></div></div>`;
        } else {
          const it = q.items[q.i], f = BYID[it.id], stmt = it.truth ? f.t : f.f, done = q.ans != null;
          h += `<div class="card"><div class="kn-ctr"><span class="kicker">True or false? · ${esc(sname)}</span><span>Statement ${q.i + 1} of ${q.items.length} · score ${q.score}</span></div><div class="kn-score">${q.items.map((_, i) => `<i class="${i < q.marks.length ? (q.marks[i] ? 'g' : 'b') : ''}"></i>`).join('')}</div>
            <p class="kn-stmt">${esc(stmt)}</p>
            <div class="kn-tf"><button type="button" class="btn ${done ? (it.truth ? 'go' : 'ghost') : 'go'}" data-px="tf" data-v="1" ${done ? 'disabled' : ''}>✔ True</button><button type="button" class="btn ${done ? (!it.truth ? 'go' : 'ghost') : 'gold'}" data-px="tf" data-v="0" ${done ? 'disabled' : ''}>✘ False</button></div>
            ${done ? `<div class="fb ${q.ans === it.truth ? 'good' : 'bad'}"><b>${q.ans === it.truth ? 'Correct!' : 'Not quite.'} This statement is ${it.truth ? 'TRUE' : 'FALSE'}.</b>${it.truth ? '' : `<span>The real fact: ${esc(f.t)}</span>`}</div><div class="row"><button type="button" class="btn go" data-px="qnext">${q.i + 1 < q.items.length ? 'Next →' : 'See my score'}</button></div>` : '<p class="hint">Read carefully: false statements change one key detail, such as a date, a name or a number.</p>'}</div>`;
        }
      } else {
        const favs = st.fav.map(id => BYID[id]).filter(Boolean);
        h += `<div class="card"><h2>♥ My favourite facts</h2>${favs.length ? `<ul class="kn-list">${favs.map(x => `<li><button type="button" class="kn-heart" data-px="fav" data-id="${x.id}" aria-label="Remove from favourites">♥</button><span><span class="kn-badge">${SMAP[x.s][2]} ${esc(SMAP[x.s][1])}</span> ${esc(x.t)}${noteHTML(x.n)}</span></li>`).join('')}</ul><div class="row">${listen(api, favs.map(x => x.t).join(' '), 'Read all aloud')}<button type="button" class="tool" data-px="copyfav">📋 Copy my facts</button></div>` : `<p class="fb note">No favourites yet. Tap ♡ Save on any fact to keep it here for essay examples.</p>`}</div>`;
      }
      return h + '</div>';
    },
    click(a, el, api) {
      const st = dyk(api), loc = api.S.loc, k = SMAP[loc.k] ? loc.k : 'all';
      if (a === 'say') { api.speak(el.dataset.t || ''); return; }
      if (a === 'fav') { const id = el.dataset.id, i = st.fav.indexOf(id); if (i >= 0) st.fav.splice(i, 1); else { st.fav.push(id); api.toast('Saved to favourites'); } api.save(); api.render(); return; }
      if (a === 'copyfav') { copyText(api, st.fav.map(id => BYID[id]).filter(Boolean).map(x => '• ' + x.t).join('\n')); return; }
      if (a === 'dflip') { el.classList.toggle('on'); return; }
      const d = deckFor(api, k);
      if (a === 'dnext') { d.pos = (d.pos + 1) % d.order.length; api.render(); return; }
      if (a === 'dprev') { d.pos = (d.pos - 1 + d.order.length) % d.order.length; api.render(); return; }
      if (a === 'dshuf') { d.order = api.shuffle(d.order.slice()); d.pos = 0; api.chime('good'); api.render(); return; }
      if (a === 'tf') {
        if (!TQ || TQ.ans != null) return; const it = TQ.items[TQ.i]; TQ.ans = el.dataset.v === '1'; const ok = TQ.ans === it.truth; TQ.marks.push(ok); if (ok) TQ.score++; api.chime(ok ? 'good' : 'bad'); api.render(); return;
      }
      if (a === 'qnext') { TQ.i++; TQ.ans = null; if (TQ.i >= TQ.items.length && TQ.score > 0) api.reward(Math.max(1, Math.min(10, TQ.score + (TQ.score === TQ.items.length ? 2 : 0))), 'True or false?'); api.render(); return; }
      if (a === 'qagain') { newQuiz(api, k); api.render(); return; }
    }
  };

  /* =========================================================
     PLUGIN 2: STUDY SMARTER
     ========================================================= */
  let MG = null, VZ = null, NQ = null, PL = null, CT = null, MGbadT = null;
  function study(api) { const S = api.S; S.study = S.study || {}; return S.study; }
  function newMatch(api) {
    const pick = api.shuffle(TIPS.map((_, i) => i)).slice(0, 6);
    MG = { pick, left: api.shuffle(pick.slice()), right: api.shuffle(pick.slice()), sel: null, done: [], bad: null, tries: 0, rewarded: false };
  }
  function varkChart(sc) {
    const max = Math.max(1, ...VK.map(v => sc[v[0]] || 0));
    return `<div class="kn-vbars" role="img" aria-label="Your learning preference scores: ${VK.map(v => v[1] + ' ' + (sc[v[0]] || 0)).join(', ')}">${VK.map(v => { const n = sc[v[0]] || 0; return `<div class="kn-vrow"><span class="kn-vl">${v[1]}</span><span class="kn-vt"><i style="width:${Math.max(3, n / max * 100)}%;background:${v[2]}"></i></span><b>${n}</b></div>`; }).join('')}</div>`;
  }
  function mock(id) {
    const L = (c) => `<div class="kn-ln ${c || ''}"></div>`;
    switch (id) {
      case 'cornell': return `<div class="kn-paper"><div class="kn-h">Topic: Models of communication</div><div class="kn-cg"><div class="c">What is noise?<br><br>Linear or 2-way?</div><div>• Shannon-Weaver 1949<br>${L()}${L('m')}• Noise = interference${L('s')}</div><div class="s"><b>Summary:</b> Models show how meaning moves…</div></div></div>`;
      case 'outline': return `<div class="kn-paper"><div class="kn-h">I. Barriers to communication</div><div style="padding-left:10px">A. Physical<div style="padding-left:10px">1. Noise ${L('s')}2. Distance</div>B. Psychological<div style="padding-left:10px">1. Emotions ${L('s')}</div></div><div class="kn-h">II. Overcoming barriers</div>${L('m')}</div>`;
      case 'mind': return `<div class="kn-paper"><svg viewBox="0 0 220 120" aria-hidden="true"><g stroke="#0E1F55" stroke-width="2" fill="none"><path d="M110 60 L40 22"/><path d="M110 60 L180 22"/><path d="M110 60 L40 100"/><path d="M110 60 L180 100"/><path d="M40 22 L12 8"/><path d="M180 100 L208 112"/></g><ellipse cx="110" cy="60" rx="38" ry="18" fill="#F5C542" stroke="#0E1F55" stroke-width="2"/><text x="110" y="64" font-size="10" text-anchor="middle" font-weight="700" fill="#0E1F55">Social media</text>${[[40, 22, 'Identity'], [180, 22, 'Language'], [40, 100, 'News'], [180, 100, 'Risks']].map(([x, y, t]) => `<rect x="${x - 26}" y="${y - 9}" width="52" height="18" rx="9" fill="#cfe0ff" stroke="#0E1F55"/><text x="${x}" y="${y + 4}" font-size="8.5" text-anchor="middle" fill="#0E1F55">${t}</text>`).join('')}</svg></div>`;
      case 'chart': return `<div class="kn-paper"><table class="kn-tbl"><tr><th>Source</th><th>Tone</th><th>Bias</th></tr><tr><td>Paper A</td><td>Formal</td><td>Low</td></tr><tr><td>Paper B</td><td>Emotive</td><td>High</td></tr><tr><td>Radio C</td><td>Chatty</td><td>Some</td></tr></table></div>`;
      case 'flow': return `<div class="kn-paper"><svg viewBox="0 0 220 110" aria-hidden="true"><defs><marker id="kn-ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0E1F55"/></marker></defs>${[['Sender', 4], ['Encode', 58], ['Channel', 112], ['Receiver', 166]].map(([t, x]) => `<rect x="${x}" y="20" width="50" height="26" rx="6" fill="#FFE38A" stroke="#0E1F55"/><text x="${x + 25}" y="37" font-size="9" text-anchor="middle" fill="#0E1F55" font-weight="700">${t}</text>`).join('')}<g stroke="#0E1F55" stroke-width="1.6" marker-end="url(#kn-ar)"><path d="M54 33 H57"/><path d="M108 33 H111"/><path d="M162 33 H165"/></g><path d="M191 48 V80 H29 V50" stroke="#A87C08" stroke-width="1.6" fill="none" stroke-dasharray="4 3" marker-end="url(#kn-ar)"/><text x="110" y="95" font-size="9" text-anchor="middle" fill="#A87C08" font-weight="700">Feedback</text></svg></div>`;
      case 'sentence': return `<div class="kn-paper">${['1. Speaker defines rhetoric as persuasion.', '2. Ethos = credibility of speaker.', '3. Example: doctor in a health ad.', '4. Pathos appeals to emotions.', '5. Logos uses facts and reasons.'].map(x => `<div>${x}</div>`).join('')}${L('m')}</div>`;
      case 'sq3r': return `<div class="kn-paper"><div><b>S</b>urvey: headings, pictures ✓</div><div><b>Q</b>: What is a dialect?</div><div><b>R</b>ead → answer: a variety of a language…</div><div><b>R</b>ecite: said it without notes ✓</div><div><b>R</b>eview: Day 1 ✓ Day 3 ☐</div>${L('s')}</div>`;
      case 'boxing': return `<div class="kn-paper"><div class="kn-boxes">${['Verbal', 'Non-verbal', 'Visual', 'Electronic'].map(t => `<div><div class="kn-h">${t}</div>${L('m')}${L('s')}</div>`).join('')}</div></div>`;
    }
    return '';
  }
  function studyPlan(dateStr, subs, per) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const ex = new Date(dateStr + 'T00:00:00'); if (isNaN(ex)) return { err: 'Choose a valid exam date.' };
    const nd = Math.round((ex - today) / 86400000);
    if (nd < 2) return { err: 'Pick an exam date at least 2 days from today.' };
    if (!subs.length) return { err: 'Choose at least one subject.' };
    const days = Math.min(nd, 90), slots = Array.from({ length: days }, () => []);
    const last = days - 1; // day index before exam
    const place = (d, task) => { for (let x = Math.max(0, d); x < last; x++) if (slots[x].length < per) { slots[x].push(task); return true; } return false; };
    const firstWindow = Math.max(1, Math.floor((last) * 0.45));
    subs.forEach((s, i) => {
      const start = Math.floor(i * firstWindow / subs.length);
      place(start, { s, t: 'learn' });
      [1, 3, 7, 14, 21, 30].forEach(gap => { if (start + gap < last - 1) place(start + gap, { s, t: 'recall' }); });
    });
    for (let d = Math.max(0, last - 7); d < last; d++) subs.forEach((s, i) => { if ((d + i) % 2 === 0) place(d, { s, t: 'paper' }); });
    for (let d = 0; d < last; d++) if (slots[d].length < per && subs.length > 1) slots[d].push({ s: subs.slice(0, 3).join(' + '), t: 'mix' });
    slots[last] = [{ s: 'All subjects', t: 'light' }];
    return { days: slots.map((list, i) => { const dt = new Date(today); dt.setDate(today.getDate() + i + (nd - days)); return { date: dt, list }; }), exam: ex, nd };
  }
  const PT = { learn: ['📖', 'First pass: make Cornell notes + 5 questions'], recall: ['🔁', 'Retrieval: blank-page recall, then check'], paper: ['📝', 'Timed past-paper question + self-mark'], mix: ['🧠', 'Interleaved mixed quiz'], light: ['🌙', 'Light review of summaries, pack your bag, sleep early'] };
  const PCOL = ['#F5C542', '#7FB7FF', '#4FD18B', '#FF9E6B', '#D59CFF', '#FF7AA8', '#9BE7E0', '#E8E38A'];
  const PRESET = ['Communication Studies', 'Caribbean Studies', 'Literatures in English', 'History', 'Geography', 'Biology', 'Chemistry', 'Physics', 'Pure Mathematics', 'Accounting', 'Economics', 'Management of Business', 'Entrepreneurship', 'Information Technology', 'Computer Science', 'Digital Media', 'Sociology', 'Law', 'Spanish', 'French'];

  const studyPlugin = {
    view: 'study', title: 'Study Smarter',
    tile: { icon: '🧠', meta: 'Study-tips match game, learning-preferences quiz, note-making styles and an exam-week planner' },
    render(api, loc) {
      const tab = loc.tab || 'tips', sd = study(api);
      let h = `<div class="kn-wrap"><section class="hero"><span class="eyebrow">🧠 Study Smarter</span><h1>Learn how to learn</h1><p>Evidence-based study habits, note-making methods you can try today, and a revision plan that spaces your practice. Better methods, not just more hours.</p></section>
        <div class="card">${tabsHTML('study', [['tips', '🔗 Study tips match'], ['vark', '🎧 How do I like to learn?'], ['notes', '📝 Note-making styles'], ['plan', '🗓️ Exam-week planner']], tab)}</div>`;
      if (tab === 'tips') {
        if (!MG) newMatch(api);
        const done = MG.done.length === MG.pick.length;
        h += `<div class="card"><div class="card-top row" style="justify-content:space-between"><h2>Study tips match</h2><span class="kn-badge">${MG.done.length}/${MG.pick.length} matched</span></div><p class="hint">Tap a study problem, then tap the tip that fixes it.</p>
          <div class="kn-mgrid"><div class="kn-mcol"><h4>Problem</h4>${MG.left.map(i => `<button type="button" class="kn-m ${MG.done.includes(i) ? 'done' : ''} ${MG.sel === i ? 'sel' : ''}" data-px="ml" data-i="${i}" ${MG.done.includes(i) ? 'disabled' : ''} aria-pressed="${MG.sel === i}">${esc(TIPS[i][1])}</button>`).join('')}</div>
          <div class="kn-mcol"><h4>Tip</h4>${MG.right.map(i => `<button type="button" class="kn-m tip ${MG.done.includes(i) ? 'done' : ''} ${MG.bad === i ? 'bad' : ''}" data-px="mr" data-i="${i}" ${MG.done.includes(i) ? 'disabled' : ''}>${esc(TIPS[i][2])}</button>`).join('')}</div></div>
          ${done ? `<div class="fb good"><b>All matched in ${MG.tries} tries!</b><span>${MG.tries <= MG.pick.length ? 'Flawless.' : 'Now try a new round with different tips.'}</span></div>` : ''}
          <div class="row"><button type="button" class="btn ${done ? 'go' : 'ghost'}" data-px="mnew">🔀 New round</button></div></div>`;
        if (MG.done.length) h += `<div class="card"><h3>Why these tips work</h3><ul class="kn-list">${MG.done.map(i => `<li><span><b>${esc(TIPS[i][2])}.</b> ${esc(TIPS[i][3])}</span></li>`).join('')}</ul></div>`;
        h += `<div class="card"><details><summary><b>All ${TIPS.length} evidence-based study tips</b></summary><ul class="kn-list" style="margin-top:12px">${TIPS.map(t => `<li><span><b>${esc(t[2])}</b> <span class="kn-mini">· for “${esc(t[1])}”</span><br>${esc(t[3])}</span></li>`).join('')}</ul></details></div>`;
      } else if (tab === 'vark') {
        const res = sd.vark;
        if (VZ && VZ.i < VQ.length) {
          const q = VQ[VZ.i];
          h += `<div class="card"><div class="kn-ctr"><span class="kicker">Question ${VZ.i + 1} of ${VQ.length}</span><span>No right or wrong answers</span></div><div class="pbar"><i style="width:${Math.round(VZ.i / VQ.length * 100)}%"></i></div><h3>${esc(q[0])}</h3><div class="opts">${q[1].map((o, j) => `<button type="button" class="opt" data-px="vans" data-j="${j}"><span class="letter">${'ABCD'[j]}</span><span>${esc(o)}</span></button>`).join('')}</div>${VZ.i ? '<div class="row"><button type="button" class="tool" data-px="vback">◀ Back</button></div>' : ''}</div>`;
        } else if (res) {
          const order = VK.slice().sort((a, b) => (res[b[0]] || 0) - (res[a[0]] || 0)), top = order[0], mx = res[top[0]] || 0, tops = order.filter(v => (res[v[0]] || 0) === mx);
          h += `<div class="card"><span class="kicker">Your learning preferences</span><h2>${tops.length === 4 ? 'You enjoy a balanced mix of all four' : 'You lean towards ' + tops.map(v => v[1]).join(' + ')}</h2><div class="kn-bars">${varkChart(res)}</div>
            <div class="kn-honest"><b>An honest note from the research.</b> Studies have <b>not</b> found that teaching people in their preferred “learning style” improves their results. Your preferences are still useful: they tell you what keeps you motivated and help you add variety. The best learners use <b>many</b> methods, especially <b>dual coding</b> (words + visuals) and <b>retrieval practice</b> (testing yourself), whatever their preference.</div></div>
            <div class="card"><h3>Tips that match your preferences, plus one to stretch you</h3><div class="grid2">${tops.concat(order.slice(-1).filter(v => !tops.includes(v))).map(v => `<div class="tip"><b>${v[1]}${tops.includes(v) ? '' : ' (stretch zone)'}</b><ul>${VTIPS[v[0]].map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>`).join('')}</div><p class="hint">Whatever your result: test yourself, space your revision and turn notes into diagrams.</p><div class="row"><button type="button" class="btn ghost" data-px="vstart">↻ Retake the quiz</button></div></div>`;
        } else {
          h += `<div class="card"><h2>How do I like to learn?</h2><p>${VQ.length} quick questions about how you prefer to take in information: <b>visual</b>, <b>auditory</b>, <b>reading/writing</b> or <b>kinaesthetic</b> (hands-on). You will get a chart of your preferences and tips to match.</p><p class="hint">This is a reflection tool, not a label. Research shows that everyone learns best with a mix of methods.</p><div class="row"><button type="button" class="btn go" data-px="vstart">Start the quiz</button></div></div>`;
        }
      } else if (tab === 'notes') {
        h += `<div class="card"><h2>Note-making styles</h2><p>Good notes are not copies. They <b>select</b>, <b>condense</b> and <b>organise</b> ideas so you can test yourself later. Try each style below.</p><div class="kn-ngrid">${NOTEM.map(m => `<div class="kn-ncard"><h3>${esc(m.name)}</h3>${mock(m.id)}<p style="margin:0">${esc(m.how)}</p><p class="kn-mini" style="margin:0"><b>Use it for:</b> ${esc(m.when)}</p></div>`).join('')}</div></div>`;
        h += `<div class="card"><span class="kicker">Module 1 link</span><h3>Note form vs continuous prose</h3><div class="grid2"><div class="tip"><b>Note form</b><ul><li>Key words, phrases and abbreviations</li><li>Headings, bullets, numbering, arrows</li><li>Fast to write; for your own use</li></ul></div><div class="tip"><b>Continuous prose</b><ul><li>Full, grammatical sentences in paragraphs</li><li>Linking words: however, therefore, as a result</li><li>For a reader; this is what a summary question usually asks for</li></ul></div></div><p>Summary skills in Module 1 use both: first <b>make notes</b> of the main points (leaving out examples, repetition and minor details), then <b>rewrite them as continuous prose</b> in your own words, within the word limit. Always check whether a question asks for note form or prose.</p></div>`;
        if (!NQ) NQ = { order: api.shuffle(NSCEN.map((_, i) => i)), i: 0, score: 0, pick: null };
        if (NQ.i >= NSCEN.length) h += `<div class="card"><h3>Which method fits this task?</h3><p>You scored <b>${NQ.score} of ${NSCEN.length}</b>.</p><div class="row"><button type="button" class="btn go" data-px="nqagain">Try again</button></div></div>`;
        else {
          const sc = NSCEN[NQ.order[NQ.i]], done = NQ.pick != null;
          h += `<div class="card"><div class="kn-ctr"><span class="kicker">Which method fits this task? · ${NQ.i + 1} of ${NSCEN.length}</span><span>score ${NQ.score}</span></div><p class="kn-stmt">${esc(sc[0])}</p><div class="opts">${NOTEM.map(m => `<button type="button" class="opt ${done ? (m.id === sc[1] ? 'right' : m.id === NQ.pick ? 'wrong' : '') : ''}" data-px="nqpick" data-id="${m.id}" ${done ? 'disabled' : ''}>${esc(m.name)}</button>`).join('')}</div>${done ? `<div class="fb ${NQ.pick === sc[1] ? 'good' : 'bad'}"><b>${NQ.pick === sc[1] ? 'Good choice!' : 'Best fit: ' + esc(NOTEM.find(m => m.id === sc[1]).name)}</b><span>${esc(NOTEM.find(m => m.id === sc[1]).when)}</span></div><div class="row"><button type="button" class="btn go" data-px="nqnext">${NQ.i + 1 < NSCEN.length ? 'Next →' : 'See my score'}</button></div>` : ''}</div>`;
        }
        if (!CT) CT = ls.get('kn-cornell', { title: '', cues: '', notes: '', summary: '' });
        h += `<div class="card"><span class="kicker">Try it</span><h3>Your Cornell notes page</h3><p class="hint">Type your notes on the right, write questions or key words on the left after the lesson, and finish with a 2–3 sentence summary. Saved on this device as you type.</p>
          <div class="kn-corn"><div class="kn-ct"><label for="kn-c-title">Topic / date</label><input id="kn-c-title" class="kn-in1" data-cf="title" value="${esc(CT.title)}" placeholder="e.g. Module 1: Evaluating sources · 14 Oct"></div>
          <div class="kn-cc"><label for="kn-c-cues">Cues / questions</label><textarea id="kn-c-cues" class="kn-ta" data-cf="cues" placeholder="What makes a source reliable?">${esc(CT.cues)}</textarea></div>
          <div class="kn-cn"><label for="kn-c-notes">Notes</label><textarea id="kn-c-notes" class="kn-ta" data-cf="notes" placeholder="• Check author, date, purpose…">${esc(CT.notes)}</textarea></div>
          <div class="kn-cs"><label for="kn-c-sum">Summary</label><textarea id="kn-c-sum" class="kn-ta" data-cf="summary" placeholder="In 2–3 sentences, in continuous prose…">${esc(CT.summary)}</textarea></div></div>
          <div class="row"><button type="button" class="btn go" data-px="ccopy">📋 Copy</button><button type="button" class="btn gold" data-px="cprint">🖨️ Print</button><button type="button" class="tool" data-px="cclear">Clear</button></div><div id="kn-print" aria-hidden="true"></div></div>`;
      } else if (tab === 'plan') {
        if (!PL) { const sv = sd.plan || {}; const d = new Date(); d.setDate(d.getDate() + 14); PL = { date: sv.date || d.toISOString().slice(0, 10), subs: (sv.subs || ['Communication Studies']).slice(0, 8), per: sv.per || 3, out: null, custom: '' }; }
        h += `<div class="card"><h2>Exam-week planner</h2><p>Pick your exam date and subjects. The planner spaces your revision: a first pass, then retrieval sessions 1, 3, 7 and 14 days later, interleaved practice, timed questions in the final week and a light final day.</p>
          <div class="grid2"><div class="field"><label for="kn-pdate">First exam date</label><input id="kn-pdate" type="date" class="search" value="${esc(PL.date)}"></div>
          <div class="field"><label>Study sessions per day</label><div class="chips">${[2, 3, 4].map(n => `<button type="button" class="chip ${PL.per === n ? 'sel' : ''}" data-px="pper" data-n="${n}" aria-pressed="${PL.per === n}">${n} sessions</button>`).join('')}</div></div></div>
          <div class="field"><label>Subjects (up to 8)</label><div class="chips">${PRESET.concat(PL.subs.filter(s => !PRESET.includes(s))).map(s => `<button type="button" class="chip ${PL.subs.includes(s) ? 'sel' : ''}" data-px="psub" data-s="${esc(s)}" aria-pressed="${PL.subs.includes(s)}">${esc(s)}</button>`).join('')}</div></div>
          <div class="row"><input id="kn-pcustom" class="search" style="flex:1;min-width:160px" placeholder="Add another subject" maxlength="40"><button type="button" class="btn ghost" data-px="padd">Add</button></div>
          <div class="row"><button type="button" class="btn go" data-px="pmake">Make my plan</button></div>${PL.err ? `<p class="fb bad">${esc(PL.err)}</p>` : ''}</div>`;
        if (PL.out) {
          const o = PL.out, fmt = d => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }), col = s => PCOL[Math.max(0, PL.subs.indexOf(s)) % PCOL.length];
          h += `<div class="card"><div class="row" style="justify-content:space-between"><h3>Your plan: ${o.days.length} days to ${fmt(o.exam)}</h3><span class="row"><button type="button" class="tool" data-px="pcopy">📋 Copy plan</button></span></div>${o.nd > 90 ? '<p class="hint">Showing the last 90 days before your exam.</p>' : ''}
            <div class="row">${Object.entries(PT).map(([k, v]) => `<span class="kn-badge">${v[0]} ${esc(v[1].split(':')[0])}</span>`).join('')}</div>
            <div class="kn-days">${o.days.map((d, i) => `<div class="kn-day ${i === o.days.length - 1 ? 'ex' : ''}"><h4><span>${fmt(d.date)}</span><span class="kn-mini">Day ${i + 1}</span></h4><ul>${d.list.length ? d.list.map(t => `<li><span class="kn-sw" style="background:${t.t === 'mix' || t.t === 'light' ? 'var(--muted)' : col(t.s)}"></span><span>${PT[t.t][0]} <b>${esc(t.s)}</b><br><span class="kn-mini">${esc(PT[t.t][1])}</span></span></li>`).join('') : '<li><span class="kn-mini">Rest day: walk, sleep, recharge 🌴</span></li>'}</ul></div>`).join('')}<div class="kn-day ex"><h4><span>${fmt(o.exam)}</span><span>🎯</span></h4><ul><li>Exam day: breakfast, water, arrive early. You prepared well.</li></ul></div></div></div>`;
        }
      }
      return h + '</div>';
    },
    mount(api, loc, stage) {
      const root = stage.querySelector('.stage-in') || stage;
      root.querySelectorAll('[data-cf]').forEach(inp => inp.addEventListener('input', () => { CT[inp.dataset.cf] = inp.value; ls.set('kn-cornell', CT); }));
      const pd = root.querySelector('#kn-pdate'); if (pd) pd.addEventListener('change', () => { PL.date = pd.value; });
      const pc = root.querySelector('#kn-pcustom'); if (pc) { pc.addEventListener('input', () => { PL.custom = pc.value; }); pc.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); const b = root.querySelector('[data-px="padd"]'); if (b) b.click(); } }); }
    },
    click(a, el, api) {
      const sd = study(api);
      if (a === 'ml') { MG.sel = +el.dataset.i; MG.bad = null; api.render(); return; }
      if (a === 'mr') {
        const r = +el.dataset.i; if (MG.sel == null) { api.toast('First tap a problem on the left'); return; }
        MG.tries++;
        if (r === MG.sel) { MG.done.push(r); MG.sel = null; MG.bad = null; api.chime('good'); if (MG.done.length === MG.pick.length && !MG.rewarded) { MG.rewarded = true; api.reward(MG.tries <= MG.pick.length ? 8 : 5, 'Study tips match'); } }
        else { MG.bad = r; api.chime('bad'); }
        api.render(); return;
      }
      if (a === 'mnew') { newMatch(api); api.render(); return; }
      if (a === 'vstart') { VZ = { i: 0, ans: [] }; api.render(); return; }
      if (a === 'vback') { if (VZ && VZ.i > 0) { VZ.i--; VZ.ans.pop(); } api.render(); return; }
      if (a === 'vans') {
        VZ.ans[VZ.i] = +el.dataset.j; VZ.i++;
        if (VZ.i >= VQ.length) { const sc = { v: 0, a: 0, r: 0, k: 0 }; VZ.ans.forEach(j => sc['vark'[j]]++); sd.vark = sc; sd.varkAt = dayKey(); api.save(); VZ = null; api.reward(5, 'Learning preferences quiz'); }
        api.render(); return;
      }
      if (a === 'nqpick') { if (NQ.pick != null) return; NQ.pick = el.dataset.id; const ok = NQ.pick === NSCEN[NQ.order[NQ.i]][1]; if (ok) NQ.score++; api.chime(ok ? 'good' : 'bad'); api.render(); return; }
      if (a === 'nqnext') { NQ.i++; NQ.pick = null; if (NQ.i >= NSCEN.length && NQ.score) api.reward(Math.min(10, NQ.score), 'Note-method quiz'); api.render(); return; }
      if (a === 'nqagain') { NQ = null; api.render(); return; }
      if (a === 'ccopy') { copyText(api, `${CT.title || 'Cornell notes'}\n\nCUES / QUESTIONS\n${CT.cues}\n\nNOTES\n${CT.notes}\n\nSUMMARY\n${CT.summary}`); return; }
      if (a === 'cclear') { CT = { title: '', cues: '', notes: '', summary: '' }; ls.set('kn-cornell', CT); api.render(); return; }
      if (a === 'cprint') {
        const box = document.getElementById('kn-print'); if (!box) return;
        box.innerHTML = `<h1>${esc(CT.title || 'Cornell notes')}</h1><table><tr><td class="c"><b>Cues / questions</b>\n${esc(CT.cues)}</td><td><b>Notes</b>\n${esc(CT.notes)}</td></tr><tr><td colspan="2"><b>Summary</b>\n${esc(CT.summary)}</td></tr></table><p class="foot">CAPE Communication Studies · Cornell notes</p>`;
        const de = document.documentElement; de.classList.add('kn-printing');
        const done = () => { de.classList.remove('kn-printing'); window.removeEventListener('afterprint', done); };
        window.addEventListener('afterprint', done);
        try { window.print(); } catch (e) { }
        setTimeout(done, 1500); return;
      }
      if (a === 'pper') { PL.per = +el.dataset.n; if (PL.out) PL.out = studyPlan(PL.date, PL.subs, PL.per); api.render(); return; }
      if (a === 'psub') { const s = el.dataset.s, i = PL.subs.indexOf(s); if (i >= 0) PL.subs.splice(i, 1); else if (PL.subs.length < 8) PL.subs.push(s); else api.toast('Up to 8 subjects'); api.render(); return; }
      if (a === 'padd') { const v = (PL.custom || '').trim().slice(0, 40); if (!v) { api.toast('Type a subject first'); return; } if (!PL.subs.includes(v)) { if (PL.subs.length >= 8) { api.toast('Up to 8 subjects'); return; } PL.subs.push(v); } PL.custom = ''; api.render(); return; }
      if (a === 'pmake') {
        const pd = document.getElementById('kn-pdate'); if (pd && pd.value) PL.date = pd.value;
        const o = studyPlan(PL.date, PL.subs, PL.per); if (o.err) { PL.err = o.err; PL.out = null; } else { PL.err = null; PL.out = o; sd.plan = { date: PL.date, subs: PL.subs.slice(), per: PL.per }; api.save(); api.toast('Plan ready'); }
        api.render(); return;
      }
      if (a === 'pcopy') { if (!PL.out) return; copyText(api, PL.out.days.map((d, i) => `${d.date.toDateString()}: ${d.list.map(t => `${t.s} (${PT[t.t][1]})`).join('; ') || 'Rest'}`).join('\n') + `\n${PL.out.exam.toDateString()}: EXAM`); return; }
    }
  };

  /* =========================================================
     PLUGIN 3: COLLEGE & UNIVERSITY READY
     ========================================================= */
  let PE = null, RF = null, IV = null, BG = null, PEdone = false, ivInt = null;
  function col(api) { const S = api.S; S.college = S.college || {}; if (!Array.isArray(S.college.done)) S.college.done = []; return S.college; }
  function peelPreview() { return [PE.P, PE.E, PE.X, PE.L].map(s => (s || '').trim()).filter(Boolean).join(' '); }
  function refEmail() {
    const r = RF;
    return `Subject: Reference request for ${r.prog || '[programme]'} application\n\nDear ${r.teacher || '[Teacher’s name]'},\n\nI hope you are well. I am applying to ${r.prog || '[programme]'} at ${r.inst || '[university/scholarship]'}, and I would be very grateful if you would write a reference for me. You taught me ${r.subj || '[subject]'}, and I believe you know my work and character well.\n\nThe reference is due by ${r.due || '[deadline]'}. To help, I have attached my CV, a draft of my personal statement and a short list of achievements, including ${r.ach || '[one or two achievements]'}. I am happy to meet if that would be useful.\n\nThank you very much for considering my request.\n\nKind regards,\n${r.me || '[Your full name]'}\n${r.form || '[Form / class]'}`;
  }
  function stopIv() { if (ivInt) { clearInterval(ivInt); ivInt = null; } }
  function tickIv(api) {
    const el = document.getElementById('kn-ivt');
    if (!el || !IV || !IV.running) { stopIv(); return; }
    IV.left = Math.max(0, IV.secs - Math.floor((Date.now() - IV.start) / 1000));
    el.textContent = Math.floor(IV.left / 60) + ':' + String(IV.left % 60).padStart(2, '0');
    const ring = document.getElementById('kn-ivr'); if (ring) ring.setAttribute('stroke-dashoffset', String(339.3 * (1 - IV.left / IV.secs)));
    if (IV.left <= 0) { IV.running = false; IV.over = true; stopIv(); api.chime('good'); api.render(); }
  }
  const collegePlugin = {
    view: 'college', title: 'College & University Ready',
    tile: { icon: '🎓', meta: 'Roadmap, choosing a programme, CAPE credits, personal statements, references, interviews and a checklist' },
    render(api, loc) {
      const tab = loc.tab || 'road', cs = col(api);
      if (tab !== 'interview') stopIv();
      const pct = Math.round(cs.done.length / CHECKS.length * 100);
      let h = `<div class="kn-wrap"><section class="hero"><span class="eyebrow">🎓 College & University Ready</span><h1>Your next step, planned</h1><p>From CAPE Year 1 to your first semester: choose well, apply confidently and arrive ready. Your Communication Studies skills (writing for an audience, persuasion and oral presentation) are exactly what applications test.</p><div class="pbar" aria-label="Checklist progress"><i style="width:${pct}%"></i></div><span class="kn-mini" style="color:#C9D2F0">My checklist: ${cs.done.length} of ${CHECKS.length} done</span></section>
        <div class="card">${tabsHTML('college', [['road', '🗺️ Roadmap'], ['choose', '🏫 Choosing'], ['cape', '🎓 CAPE credits'], ['ps', '✍️ Personal statement'], ['refs', '📨 Scholarships & references'], ['interview', '🎤 Interviews'], ['money', '💵 Money & living'], ['check', `✅ My checklist`]], tab)}</div>`;
      if (tab === 'road') {
        h += `<div class="card"><h2>The roadmap</h2><p class="hint">Timings vary by institution and country. Always confirm the dates on each official website.</p><div class="kn-tl">${ROAD.map((r, i) => `<div class="kn-step" data-n="${i + 1}"><span class="kn-when">${esc(r[1])}</span><h3>${esc(r[0])}</h3><ul>${r[2].map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div></div>`;
      } else if (tab === 'choose') {
        h += `<div class="card"><h2>Choosing a programme and a university</h2><p>Choose the <b>programme</b> first, then the place. Use these questions on every website, open day and email.</p><div class="grid2">${CHOOSEQ.map(g => `<div class="tip"><b>${esc(g[0])}</b><ul>${g[1].map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div></div>
          <div class="card"><h3>Where Caribbean students often look</h3><div class="kn-uni">${UNIS.map(u => `<div class="tile static"><span class="ticon" aria-hidden="true">${u[0]}</span><h3>${esc(u[1])}</h3><span class="meta">${esc(u[2])}</span></div>`).join('')}</div>
          <p class="fb note">Requirements, costs, deadlines and scholarships change every year. This page describes options in general only: always check each institution’s current requirements on its official website, and ask your school counsellor.</p></div>`;
      } else if (tab === 'cape') {
        h += `<div class="card"><h2>CAPE and CXC credits</h2><p>CAPE units are designed to prepare you for tertiary study, and <b>many universities and colleges in the Caribbean and beyond recognise CAPE</b>. CAPE results are reported as Grades I–VII, with <b>Grade One</b> the highest. Depending on the institution and programme, good CAPE passes may:</p><ul><li>meet <b>entry requirements</b> for a degree or associate degree;</li><li>earn <b>credits</b> towards a degree, so you may skip some first-year courses;</li><li>give <b>exemptions</b> from foundation or introductory courses;</li><li>count towards the <b>CAPE Associate Degree</b> awarded by CXC when you complete a set group of units.</li></ul>
          <div class="kn-honest"><b>Check each institution.</b> Policies differ: which units count, which grades are needed, how many credits are given and whether a unit counts for your particular programme. Ask the admissions office directly and get the answer in writing.</div></div>
          <div class="card"><h3>Communication Studies is a strong foundation</h3><p>Communication Studies develops academic reading, summarising, evaluating sources, essay writing and oral presentation: skills every first-year course uses. Mention these in your personal statement.</p><h4>Questions to ask an admissions office</h4><ol><li>Do you accept CAPE for entry to this programme? Which units, and what minimum grade (for example Grade One, Two or Three)?</li><li>Do CAPE units earn credits or exemptions here? Which courses do they replace?</li><li>Do I need to send official CXC results, and how?</li><li>Is there a deadline for submitting results for credit?</li></ol></div>`;
      } else if (tab === 'ps') {
        if (!PE) PE = ls.get('kn-peel', { P: '', E: '', X: '', L: '' });
        h += `<div class="card"><h2>Personal statements and application essays</h2><p>A personal statement is a <b>persuasive, reflective essay</b>. Your audience is an admissions tutor; your purpose is to show motivation, ability and fit. Everything you learned about audience, purpose, register and organisation in Communication Studies applies here.</p>
          <div class="grid2"><div class="tip"><b>A strong structure</b><ol><li><b>Hook:</b> a specific moment or question that sparked your interest (not a famous quotation).</li><li><b>Academic interest:</b> what you have studied, read or explored, and what you learned.</li><li><b>Experience:</b> activities, work, volunteering: what you did and what it taught you.</li><li><b>Skills and qualities:</b> shown through evidence, not just claimed.</li><li><b>Conclusion:</b> your goals and why this programme is the next step.</li></ol></div>
          <div class="tip"><b>Common mistakes</b><ul><li>Listing achievements without reflecting on them</li><li>Clichés: “Ever since I was young…”, “I am passionate…”</li><li>Copying samples online (plagiarism checks exist)</li><li>Informal register, slang or text-speak</li><li>Going over the word or character limit</li><li>Not proofreading names, spelling and grammar</li></ul></div></div></div>
          <div class="card"><span class="kicker">PEEL paragraph builder</span><h3>Build one strong paragraph</h3><p class="hint">Use the PEEL structure from your Comm Studies essays. Your work saves on this device as you type.</p>
          <div class="kn-peel">${[['P', 'Point', 'State one quality or interest. e.g. “Debating has sharpened my ability to build an argument under pressure.”'], ['E', 'Evidence', 'Give a specific example: what, when, result. e.g. “In 2025 our team reached the national semi-final…”'], ['X', 'Explain', 'Show what it taught you and why it matters. e.g. “This taught me to anticipate counter-arguments, a skill central to law.”'], ['L', 'Link', 'Connect back to the programme. e.g. “I look forward to developing this in your moot court programme.”']].map(([k, n, ph]) => `<div class="field kn-pc-${k}"><label for="kn-pe-${k}"><span>${k === 'X' ? 'E' : k}</span>${n}</label><textarea id="kn-pe-${k}" class="kn-ta" data-pe="${k}" placeholder="${esc(ph)}" style="min-height:70px">${esc(PE[k])}</textarea></div>`).join('')}</div>
          <h4>Preview</h4><div class="kn-preview" id="kn-pe-prev">${esc(peelPreview()) || '<span class="kn-mini">Your paragraph will appear here.</span>'}</div><p class="kn-mini" id="kn-pe-wc">${peelPreview().split(/\s+/).filter(Boolean).length} words</p>
          <div class="row"><button type="button" class="btn go" data-px="pecheck">Check my paragraph</button><button type="button" class="tool" data-px="pecopy">📋 Copy</button><button type="button" class="tool" data-px="peclear">Clear</button></div>${PE.fb ? `<div class="fb ${PE.fb.ok ? 'good' : 'note'}"><b>${PE.fb.ok ? 'Strong PEEL paragraph!' : 'Nearly there: improve these points'}</b><ul>${PE.fb.items.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}</div>
          <div class="card"><h3>Self-check before you submit</h3><div class="kn-chk">${['My opening is specific to me, not a cliché or a quotation.', 'Every claim about a skill is backed by a real example.', 'I reflect on what I learned, not just what I did.', 'I explain why this programme fits my goals.', 'My register is formal but natural; no slang or text-speak.', 'Paragraphs are organised and linked (PEEL, transitions).', 'It is within the word or character limit.', 'Someone I trust has proofread it, and I read it aloud.', 'It is entirely my own work.'].map((x, i) => `<label><input type="checkbox" data-sc="${i}"> <span>${esc(x)}</span></label>`).join('')}</div></div>`;
      } else if (tab === 'refs') {
        if (!RF) RF = ls.get('kn-ref', { teacher: '', prog: '', inst: '', subj: '', due: '', ach: '', me: api.S.name || '', form: '' });
        h += `<div class="card"><h2>Scholarships</h2><div class="grid2"><div class="tip"><b>Where to look</b><ul><li>Your school’s guidance counsellor and notice boards</li><li>Government study-financing and scholarship offices</li><li>The university’s own financial aid and scholarship pages</li><li>Regional and international bodies, foundations, service clubs, churches and local businesses</li></ul></div><div class="tip"><b>How to win them</b><ul><li>Read the criteria and answer exactly what is asked</li><li>Tailor each essay; never send the same text everywhere</li><li>Keep a calendar of deadlines and required documents</li><li>Beware of “scholarships” that ask you to pay a fee</li></ul></div></div></div>
          <div class="card"><h2>Asking for a reference</h2><ul><li>Ask a teacher who knows your work well, <b>in person first</b> if you can, then follow up by email.</li><li>Give <b>at least a few weeks’</b> notice before the deadline.</li><li>Provide a CV, your draft statement and a list of achievements.</li><li>Send a short thank-you note afterwards, and tell them the outcome.</li></ul>
          <h3>Fill-in email template</h3><div class="grid2">${[['teacher', 'Teacher’s name', 'Mr./Ms. Surname'], ['subj', 'Subject they taught you', 'Communication Studies'], ['prog', 'Programme', 'BA Media and Communication'], ['inst', 'University or scholarship', 'the university'], ['due', 'Deadline', '15 January'], ['ach', 'One or two achievements', 'leading the school magazine'], ['me', 'Your full name', ''], ['form', 'Form / class', 'Upper Sixth']].map(([k, n, ph]) => `<div class="field"><label for="kn-rf-${k}">${n}</label><input id="kn-rf-${k}" class="search" data-rf="${k}" value="${esc(RF[k])}" placeholder="${esc(ph)}" maxlength="80"></div>`).join('')}</div>
          <h4>Your email</h4><div class="kn-preview" id="kn-rf-prev">${esc(refEmail())}</div><div class="row"><button type="button" class="btn go" data-px="rfcopy">📋 Copy email</button></div><p class="hint">Register check: formal greeting, clear request, deadline, helpful attachments, polite close. This is a formal letter of request, a Module 3 skill.</p></div>`;
      } else if (tab === 'interview') {
        if (!IV) IV = { q: null, secs: 90, running: false, over: false, done: 0 };
        h += `<div class="card"><h2>Interview practice</h2><p>Interviews test oral communication: clarity, structure, eye contact, tone and listening. Use <b>STAR</b> for experience questions: <b>S</b>ituation, <b>T</b>ask, <b>A</b>ction, <b>R</b>esult.</p>
          <div class="grid2"><div class="tip"><b>Before</b><ul><li>Research the programme and prepare two questions to ask</li><li>Practise aloud, ideally recorded</li><li>Plan your outfit, route or video setup</li></ul></div><div class="tip"><b>During</b><ul><li>Pause before answering; it is allowed</li><li>Give specific examples, not general claims</li><li>Use formal but natural register; smile and make eye contact</li></ul></div></div></div>`;
        if (IV.q == null) h += `<div class="card"><h3>Practice mode</h3><p>You will hear a question read aloud. Answer out loud before the timer runs out.</p><div class="field"><label>Answer time</label><div class="chips">${[60, 90, 120].map(n => `<button type="button" class="chip ${IV.secs === n ? 'sel' : ''}" data-px="ivsecs" data-n="${n}" aria-pressed="${IV.secs === n}">${n} seconds</button>`).join('')}</div></div><div class="row"><button type="button" class="btn go" data-px="ivstart">🎤 Start practice</button></div>${IV.done ? `<p class="hint">Questions practised this session: ${IV.done}</p>` : ''}</div>`;
        else {
          const left = IV.running ? IV.left : (IV.over ? 0 : IV.secs);
          h += `<div class="card"><span class="kicker">Practice question</span><p class="kn-q">${esc(IVQ[IV.q])}</p>
            <div class="row" style="justify-content:center;gap:20px"><svg class="kn-ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="10"/><circle id="kn-ivr" cx="60" cy="60" r="54" fill="none" stroke="var(--gold)" stroke-width="10" stroke-linecap="round" stroke-dasharray="339.3" stroke-dashoffset="${339.3 * (1 - left / IV.secs)}" transform="rotate(-90 60 60)"/></svg><span class="kn-timer" id="kn-ivt" aria-live="off">${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}</span></div>
            ${IV.over ? `<div class="fb note"><b>Time!</b><span>Reflect: did you answer the question directly, give a specific example and finish with a clear point?</span></div>` : ''}
            <div class="row"><button type="button" class="btn gold" data-px="ivsay">🔊 Hear it again</button>${IV.running ? '<button type="button" class="btn ghost" data-px="ivstop">⏸ Stop timer</button>' : '<button type="button" class="btn ghost" data-px="ivtimer">⏱ Restart timer</button>'}<button type="button" class="btn go" data-px="ivdone">✔ I answered it</button><button type="button" class="tool" data-px="ivnext">Skip ▶</button></div></div>`;
        }
        h += `<div class="card"><details><summary><b>All ${IVQ.length} common questions</b></summary><ol style="margin-top:10px">${IVQ.map(q => `<li>${esc(q)}</li>`).join('')}</ol></details></div>`;
      } else if (tab === 'money') {
        if (!BG) BG = { inc: 1000 };
        const n = Math.max(0, +BG.inc || 0), parts = [['Needs (50%)', .5, '#F5C542', 'rent, food, transport, books, phone'], ['Wants (30%)', .3, '#7FB7FF', 'eating out, entertainment, clothes'], ['Savings and goals (20%)', .2, '#4FD18B', 'emergency fund, future fees']];
        h += `<div class="card"><h2>Budgeting basics</h2><p>A budget is a plan for your money <b>before</b> you spend it. A simple starting rule is <b>50/30/20</b>: needs, wants, savings. Adjust it to your real costs.</p>
          <div class="field" style="max-width:280px"><label for="kn-inc">Monthly money (allowance, job, grant)</label><input id="kn-inc" class="search" type="number" min="0" step="10" value="${n}"></div>
          <div id="kn-bud">${budHTML(n, parts)}</div>
          <div class="grid2"><div class="tip"><b>Money habits</b><ul><li>Track every expense for one month; you will be surprised</li><li>Build a small emergency fund</li><li>Compare prices; buy used textbooks where allowed</li><li>Understand any loan before you sign: interest and repayment</li></ul></div><div class="tip"><b>Banking</b><ul><li>Open a student account and learn online banking safely</li><li>Never share PINs or one-time codes</li><li>Know the exchange rate if you study abroad</li></ul></div></div></div>
          <div class="card"><h2>Independent living skills</h2><div class="grid2"><div class="tip"><b>⏰ Time management</b><ul><li>Use a weekly planner with classes, study, work and rest</li><li>Break big assignments into dated steps</li><li>Start early: university deadlines are firm</li><li>Use the Exam-week planner in Study Smarter</li></ul></div><div class="tip"><b>🏠 Everyday life</b><ul><li>Cook a few simple, healthy meals</li><li>Do laundry and keep your space organised</li><li>Know your landlord or residence rules</li><li>Keep copies of important documents</li></ul></div><div class="tip"><b>💚 Wellbeing</b><ul><li>Sleep, move and eat regularly</li><li>Stay connected with family and make new friends</li><li>Homesickness is normal; talk about it</li><li>Limit late-night scrolling before exams</li></ul></div><div class="tip"><b>🤝 Where to find support at school</b><ul><li>Your form teacher and subject teachers</li><li>The guidance counsellor or school counsellor</li><li>The school nurse or care team</li><li>At university: student services, academic advisors, counselling and health centres</li></ul></div></div><p class="fb note">If you ever feel overwhelmed, talk to a trusted adult or your school counsellor. Asking for help is a strength.</p></div>`;
      } else {
        h += `<div class="card"><h2>My checklist</h2><p class="hint">Tick items as you complete them. Your ticks are saved.</p><div class="pbar"><i style="width:${pct}%"></i></div><div class="kn-chk">${CHECKS.map(([id, t]) => { const on = cs.done.includes(id); return `<label class="${on ? 'on' : ''}"><input type="checkbox" data-ck="${id}" ${on ? 'checked' : ''}> <span>${esc(t)}</span></label>`; }).join('')}</div>${pct === 100 ? '<p class="fb good"><b>All done! You are college ready. 🎓</b></p>' : ''}<div class="row"><button type="button" class="tool" data-px="ckreset">Reset checklist</button></div></div>`;
      }
      return h + '</div>';
    },
    mount(api, loc, stage) {
      const root = stage.querySelector('.stage-in') || stage;
      root.querySelectorAll('[data-pe]').forEach(t => t.addEventListener('input', () => {
        PE[t.dataset.pe] = t.value; ls.set('kn-peel', { P: PE.P, E: PE.E, X: PE.X, L: PE.L });
        const p = document.getElementById('kn-pe-prev'), w = document.getElementById('kn-pe-wc'), txt = peelPreview();
        if (p) p.textContent = txt || 'Your paragraph will appear here.'; if (w) w.textContent = txt.split(/\s+/).filter(Boolean).length + ' words';
      }));
      root.querySelectorAll('[data-rf]').forEach(t => t.addEventListener('input', () => { RF[t.dataset.rf] = t.value; ls.set('kn-ref', RF); const p = document.getElementById('kn-rf-prev'); if (p) p.textContent = refEmail(); }));
      root.querySelectorAll('[data-ck]').forEach(c => c.addEventListener('change', () => {
        const cs = col(api), id = c.dataset.ck, i = cs.done.indexOf(id);
        if (c.checked && i < 0) cs.done.push(id); if (!c.checked && i >= 0) cs.done.splice(i, 1);
        api.save(); if (c.checked) api.chime('good');
        if (cs.done.length === CHECKS.length) api.toast('Checklist complete! 🎓');
        api.render();
      }));
      root.querySelectorAll('[data-sc]').forEach(c => c.addEventListener('change', () => { const l = c.closest('label'); if (l) l.classList.toggle('on', c.checked); }));
      const inc = root.querySelector('#kn-inc'); if (inc) inc.addEventListener('input', () => { BG.inc = inc.value; const b = document.getElementById('kn-bud'); if (b) b.innerHTML = budHTML(Math.max(0, +inc.value || 0)); });
      if (IV && IV.running && !ivInt) ivInt = setInterval(() => tickIv(api), 250);
    },
    click(a, el, api) {
      const cs = col(api);
      if (a === 'pecheck') {
        const items = [], words = s => (s || '').trim().split(/\s+/).filter(Boolean).length;
        if (words(PE.P) < 6) items.push('<b>Point:</b> write a clear topic sentence of at least 6 words.');
        if (words(PE.E) < 10) items.push('<b>Evidence:</b> add a specific example (what you did, when, the result).');
        else if (!/\d|\b(when|during|in|at)\b/i.test(PE.E)) items.push('<b>Evidence:</b> make it concrete: a date, number, place or named activity.');
        if (words(PE.X) < 10) items.push('<b>Explain:</b> show what you learned and why it matters (10+ words).');
        else if (!/\b(taught|learn|learned|learnt|realis|realiz|showed|because|therefore|this means|developed|helped)/i.test(PE.X)) items.push('<b>Explain:</b> use reflective language such as “this taught me…” or “because…”.');
        if (words(PE.L) < 6) items.push('<b>Link:</b> connect back to the programme or your goals.');
        if (/\b(gonna|wanna|kinda|u|ur|lol)\b/i.test(peelPreview())) items.push('<b>Register:</b> replace informal words with formal ones.');
        if (/ever since i was (young|little|a child)|i am passionate/i.test(peelPreview())) items.push('<b>Style:</b> avoid clichés like “ever since I was young” or “I am passionate”; show it instead.');
        const ok = !items.length; PE.fb = { ok, items: ok ? ['Point, evidence, explanation and link are all present. Read it aloud to check the flow.'] : items };
        if (ok && !PEdone) { PEdone = true; api.reward(5, 'PEEL paragraph'); } else api.chime(ok ? 'good' : 'bad');
        api.render(); return;
      }
      if (a === 'pecopy') { copyText(api, peelPreview()); return; }
      if (a === 'peclear') { PE = { P: '', E: '', X: '', L: '' }; ls.set('kn-peel', PE); api.render(); return; }
      if (a === 'rfcopy') { copyText(api, refEmail()); return; }
      if (a === 'ivsecs') { IV.secs = +el.dataset.n; api.render(); return; }
      if (a === 'ivstart' || a === 'ivnext') {
        let q; do { q = Math.floor(Math.random() * IVQ.length); } while (IVQ.length > 1 && q === IV.q);
        IV.q = q; IV.over = false; IV.running = true; IV.start = Date.now(); IV.left = IV.secs; stopIv(); api.render(); api.speak(IVQ[q]); return;
      }
      if (a === 'ivsay') { api.speak(IVQ[IV.q]); return; }
      if (a === 'ivtimer') { IV.running = true; IV.over = false; IV.start = Date.now(); IV.left = IV.secs; stopIv(); api.render(); return; }
      if (a === 'ivstop') { IV.running = false; stopIv(); api.render(); return; }
      if (a === 'ivdone') { IV.done++; IV.running = false; stopIv(); api.reward(2, 'Interview practice'); IV.q = null; api.stopSpeak(); api.render(); return; }
      if (a === 'ckreset') { cs.done = []; api.save(); api.render(); return; }
    }
  };
  function budHTML(n, parts) {
    parts = parts || [['Needs (50%)', .5, '#F5C542', 'rent, food, transport, books, phone'], ['Wants (30%)', .3, '#7FB7FF', 'eating out, entertainment, clothes'], ['Savings and goals (20%)', .2, '#4FD18B', 'emergency fund, future fees']];
    const fmt = x => x.toLocaleString('en-US', { maximumFractionDigits: 0 });
    let x = 0;
    return `<svg viewBox="0 0 500 40" style="width:100%;height:auto;display:block;margin:6px 0" role="img" aria-label="Budget split">${parts.map(p => { const w = 500 * p[1], r = `<rect x="${x}" y="0" width="${w}" height="40" fill="${p[2]}"/><text x="${x + w / 2}" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#0A1433">${Math.round(p[1] * 100)}%</text>`; x += w; return r; }).join('')}</svg><ul class="kn-list">${parts.map(p => `<li><span class="kn-sw" style="background:${p[2]};width:14px;height:14px"></span><span><b>${esc(p[0])}: ${fmt(n * p[1])}</b><br><span class="kn-mini">${esc(p[3])}</span></span></li>`).join('')}</ul>`;
  }

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push(dykPlugin, studyPlugin, collegePlugin);
})();
