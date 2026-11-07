/* Brain Gym: riddles, lateral-thinking puzzles, word and logic games, memory and focus challenges, and a daily teaser. */
(function () {
  const CSS = `
.bg-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.bg-hero .bg-stats{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.bg-stat{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:99px;border:1px solid var(--line);background:var(--soft-gold);font-weight:700;font-size:.9rem}
.bg-stat b{color:var(--gold)}
.bg-tabs{margin:4px 0 14px}
.bg-sub{margin:-4px 0 12px}
.bg-sub .chip{font-size:.84rem}
.bg-head{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between;margin-bottom:6px}
.bg-tier{display:inline-block;padding:2px 10px;border-radius:99px;font-size:.78rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;border:1px solid var(--line)}
.bg-tier.e{background:var(--soft-ok)}.bg-tier.m{background:var(--soft-gold)}.bg-tier.h{background:var(--soft-bad)}
.bg-fire{font-weight:800;color:var(--gold)}
.bg-q{font-family:var(--f-display);font-size:1.22rem;line-height:1.45;margin:10px 0 14px;overflow-wrap:anywhere}
.bg-q small{display:block;font-family:var(--f-body);font-size:.9rem;color:var(--muted);margin-top:6px}
.bg-ans{display:flex;flex-wrap:wrap;gap:8px;align-items:stretch}
.bg-ans .search{flex:1 1 200px;min-width:0;width:auto}
.bg-hints{margin:10px 0 0;padding-left:20px}
.bg-hints li{margin:4px 0}
.bg-x{margin-top:10px;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:var(--raise);line-height:1.55}
.bg-x b{color:var(--gold)}
.bg-letters{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
.bg-letters span{display:inline-flex;align-items:center;justify-content:center;width:38px;height:42px;border-radius:9px;background:linear-gradient(180deg,#FFE9A8,#E7B21E);color:#0A1433;font:800 1.2rem/1 var(--f-display);box-shadow:0 3px 0 #9c7410}
.bg-gap{font-family:ui-monospace,Consolas,monospace;letter-spacing:.28em;font-size:1.45rem;font-weight:800;overflow-wrap:anywhere}
.bg-emoji{font-size:2.6rem;letter-spacing:.12em;line-height:1.2}
.bg-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px}
.bg-opts .opt{width:100%}
.bg-prem{margin:8px 0;padding:12px 14px;border-left:4px solid var(--gold);background:var(--raise);border-radius:0 12px 12px 0;line-height:1.6}
.bg-prem .bg-conc{display:block;margin-top:6px;padding-top:6px;border-top:1px dashed var(--line);font-weight:700}
.bg-says{list-style:none;padding:0;margin:8px 0;display:flex;flex-direction:column;gap:8px}
.bg-says li{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:12px;background:var(--raise);border:1px solid var(--line)}
.bg-says .bg-av{flex:0 0 34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--gold);color:#0A1433;font-weight:800}
.bg-tt{font-size:.92rem;width:100%;border-collapse:collapse;margin-top:8px}
.bg-tt td{padding:4px 8px;border-bottom:1px solid var(--line)}
.bg-lgwrap{overflow-x:auto;max-width:100%}
.bg-lg{border-collapse:separate;border-spacing:4px;margin:6px 0;max-width:100%}
.bg-lg th{font-size:.86rem;padding:4px;text-align:center;font-weight:800;overflow-wrap:anywhere}
.bg-lg th[scope=row]{text-align:right;padding-right:8px;vertical-align:middle}
.bg-lg td{text-align:center;vertical-align:middle;padding:0}
.bg-cell{width:100%;max-width:120px;height:48px;min-width:44px;border-radius:10px;border:2px solid var(--line);background:var(--surface);color:var(--ink);font-size:1.35rem;font-weight:800}
.bg-cell.x{color:var(--bad);background:var(--soft-bad)}
.bg-cell.y{color:var(--ok);background:var(--soft-ok);border-color:var(--ok)}
.bg-clues{margin:6px 0 10px;padding-left:22px;line-height:1.6}
.bg-lat{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:16px;align-items:start}
.bg-story{font-family:var(--f-display);font-size:1.16rem;line-height:1.55;padding:14px 16px;border-radius:14px;background:var(--soft-gold);border:1px solid var(--line)}
.bg-qlist{display:flex;flex-direction:column;gap:6px}
.bg-qbtn{display:flex;justify-content:space-between;align-items:center;gap:10px;text-align:left;width:100%;padding:9px 12px;border-radius:12px;border:2px solid var(--line);background:var(--surface);color:var(--ink);font:inherit}
.bg-qbtn:hover{border-color:var(--blue)}
.bg-qbtn .bg-yn{flex:0 0 auto;padding:2px 10px;border-radius:99px;font-weight:800;font-size:.82rem}
.bg-yn.Y{background:var(--soft-ok);color:var(--ok)}.bg-yn.N{background:var(--soft-bad);color:var(--bad)}.bg-yn.I{background:var(--raise);color:var(--muted)}
.bg-qbtn.asked{border-style:dashed}
.bg-qnote{display:block;font-size:.84rem;color:var(--muted);margin-top:2px}
.bg-skill{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:var(--raise);margin-top:10px}
.bg-skill .bg-big{font-size:1.6rem;line-height:1}
.bg-cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.bg-card{position:relative;min-height:104px;padding:10px;border-radius:14px;border:2px solid var(--line);font:inherit;font-size:.86rem;line-height:1.3;color:var(--ink);background:var(--surface);display:flex;align-items:center;justify-content:center;text-align:center;overflow-wrap:anywhere;transition:transform .25s,background .25s}
.bg-card.down{background:repeating-linear-gradient(45deg,#0E1F55 0 12px,#13286a 12px 24px);color:#FFD766;font-size:1.7rem;border-color:rgba(255,215,102,.4)}
.bg-card.up{padding-top:20px;background:var(--soft-gold);border-color:var(--gold)}
.bg-card.term{font-weight:800;font-size:1rem}
.bg-card.done{background:var(--soft-ok);border-color:var(--ok);opacity:.8}
.bg-card .bg-tag{position:absolute;left:6px;top:4px;font-size:.66rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;opacity:.75}
.bg-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:10px}
.bg-clock{font:800 1.1rem/1 ui-monospace,Consolas,monospace;padding:6px 12px;border-radius:10px;background:var(--raise);border:1px solid var(--line)}
.bg-stroop{display:flex;align-items:center;justify-content:center;min-height:150px;border-radius:16px;background:#0A1433;border:2px solid rgba(255,215,102,.35);margin:10px 0}
.bg-sword{font:900 clamp(2.4rem,9vw,4rem)/1 var(--f-display);letter-spacing:.06em}
.bg-cbtns{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.bg-cbtn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px;border-radius:12px;border:2px solid var(--line);background:var(--surface);color:var(--ink);font:inherit;font-weight:800}
.bg-sw{width:26px;height:26px;border-radius:50%;border:2px solid rgba(255,255,255,.6)}
.bg-pads{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:380px;margin:10px auto}
.bg-pad{aspect-ratio:1.25;border-radius:50% 50% 46% 46%/40% 40% 60% 60%;border:3px solid rgba(255,255,255,.25);font:900 1.4rem/1 var(--f-display);color:#0A1433;opacity:.55;box-shadow:inset 0 -10px 18px rgba(0,0,0,.35),0 6px 0 rgba(0,0,0,.35);transition:opacity .12s,transform .12s,filter .12s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
.bg-pad span{font-size:.8rem;font-weight:800}
.bg-pad.lit{opacity:1;filter:brightness(1.25);transform:scale(1.04);box-shadow:0 0 0 4px #fff,0 0 30px 6px rgba(255,255,255,.55)}
.bg-pad[aria-disabled=true]{cursor:default}
.bg-p0{background:#FFD766}.bg-p1{background:#4FD1C5}.bg-p2{background:#FF8A7A}.bg-p3{background:#7FB2FF}
.bg-status{text-align:center;font-weight:800;min-height:1.6em}
.bg-done{display:flex;gap:14px;align-items:center;padding:14px;border-radius:14px;background:var(--soft-ok);border:1px solid var(--ok)}
.bg-done .bg-big{font-size:2rem}
.bg-cal{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.bg-cal span{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:800;border:1px solid var(--line);background:var(--raise)}
.bg-cal span.on{background:var(--gold);color:#0A1433}
.bg-nav{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
@media (max-width:760px){.bg-lat{grid-template-columns:minmax(0,1fr)}}
@media (max-width:560px){.bg-cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.bg-card{min-height:92px;font-size:.78rem;padding:8px 5px}.bg-card.term{font-size:.86rem}
  .bg-cbtns{grid-template-columns:repeat(2,minmax(0,1fr))}.bg-cell{height:46px}.bg-q{font-size:1.1rem}.bg-letters span{width:32px;height:38px;font-size:1.05rem}.bg-gap{font-size:1.2rem;letter-spacing:.2em}}
@media (prefers-reduced-motion:reduce){.bg-card,.bg-pad,.bg-qbtn,.bg-cell{transition:none!important;transform:none!important}.bg-pad.lit{transform:none}}
`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ============================== DATA ============================== */
  // Riddles: [tier e/m/h, question, accepted answers, [hint1, hint2], note]
  const RIDDLES = [
    ['e', "What has 88 keys but cannot open a single door?", ['piano', 'a piano', 'pianos'], ["You play me.", "Teachers of music love me; I sit on three pedals."]],
    ['e', "What has to be broken before you can use it?", ['egg', 'an egg', 'eggs'], ["Breakfast.", "A hen gives it to you."]],
    ['e', "What has hands but cannot clap?", ['clock', 'watch', 'a clock', 'a watch'], ["It hangs on the classroom wall.", "Tick-tock."]],
    ['e', "What gets wetter the more it dries?", ['towel', 'a towel'], ["You use it after the beach.", "Bathroom."]],
    ['e', "What has a neck but no head?", ['bottle', 'a bottle', 'shirt', 'a shirt'], ["A sorrel drink comes in it.", "Glass or plastic."]],
    ['e', "What goes up but never comes down?", ['age', 'your age', 'my age'], ["Everyone has it.", "It changes on your birthday."]],
    ['e', "What has many teeth but cannot bite?", ['comb', 'a comb', 'zip', 'zipper', 'saw'], ["You use it on your hair.", "It lives in a bag or the bathroom."]],
    ['e', "What can you catch but never throw?", ['cold', 'a cold', 'the flu', 'flu'], ["Achoo!", "Rainy season brings plenty of it."]],
    ['e', "What has one eye but cannot see?", ['needle', 'a needle'], ["Used for sewing.", "Thread goes through the eye."]],
    ['e', "I am tall when I am young and short when I am old. What am I?", ['candle', 'a candle'], ["Light me during a blackout.", "I melt."]],
    ['e', "What has a thumb and four fingers but is not alive?", ['glove', 'a glove', 'gloves'], ["A cricket keeper wears a pair.", "It covers your hand."]],
    ['e', "What runs but never walks, and has a mouth but never talks?", ['river', 'a river', 'stream'], ["It flows to the sea.", "It has a bed and banks too."]],
    ['e', "What belongs to you, but other people use it more than you do?", ['name', 'your name', 'my name'], ["People call it out.", "Write it at the top of your answer booklet."]],
    ['e', "I am green outside, white inside and full of water. You need a cutlass to get to my drink. What am I?", ['coconut', 'water coconut', 'jelly coconut', 'jelly', 'coconuts'], ["I grow high on a palm.", "Vendors sell me by the roadside."], "Caribbean flavour: in Jamaica a young coconut is a 'jelly'."],
    ['e', "I'm sold by the hand, I'm green when I'm young and yellow when I'm ready. In Saint Lucia some call me a 'fig'. What am I?", ['banana', 'bananas', 'fig', 'figs'], ["Monkeys love me.", "Peel me."]],
    ['e', "Made from an oil drum, I can play a whole melody. At Panorama I am king. What am I?", ['steelpan', 'steel pan', 'pan', 'steel drum', 'steeldrum', 'tenor pan'], ["Born in Trinidad and Tobago.", "Hit me with sticks."]],
    ['e', "What word is always spelled wrong in every dictionary?", ['wrong'], ["Read the question very literally.", "The answer is inside the question."], "Word riddle: the word 'wrong' is spelled W-R-O-N-G."],
    ['e', "What begins with T, ends with T, and has T in it?", ['teapot', 'a teapot'], ["Kitchen.", "Bush tea is made in me."], "Word riddle: tea-pot holds 'tea' (T)."],
    ['e', "What has many words but never speaks?", ['book', 'a book', 'dictionary'], ["Library.", "It has a spine and pages."]],
    ['e', "What kind of band never plays music?", ['rubber band', 'a rubber band', 'elastic band', 'hairband', 'hair band'], ["It stretches.", "Rubber."]],
    ['e', "What is full of holes but still holds water?", ['sponge', 'a sponge'], ["Wash the dishes.", "SpongeBob is one."]],
    ['e', "What can travel around the world while staying in one corner?", ['stamp', 'a stamp', 'postage stamp'], ["Old-school mail.", "Stick me on an envelope."]],
    ['m', "The more you take, the more you leave behind. What are they?", ['footsteps', 'steps', 'footprints'], ["Walk on the beach and look back.", "Feet."]],
    ['m', "I have cities but no houses, forests but no trees, and water but no fish. What am I?", ['map', 'a map', 'atlas'], ["Geography class.", "It shows the whole Caribbean on one page."]],
    ['m', "I speak without a mouth and hear without ears. I have no body, but I come alive with sound. What am I?", ['echo', 'an echo'], ["Shout in a cave.", "I repeat you."]],
    ['m', "What can fill a room but takes up no space?", ['light', 'darkness', 'sound', 'air'], ["Flick a switch.", "The opposite of a blackout."]],
    ['m', "If you have me, you want to share me. If you share me, you no longer have me. What am I?", ['secret', 'a secret'], ["Whisper.", "'Don't tell anybody...'"]],
    ['m', "What is so fragile that saying its name breaks it?", ['silence'], ["Exam room.", "Shhh."]],
    ['m', "Mi wear mi house pon mi back, mi lay mi eggs inna di sand, den mi go back a sea. Wha mi be?", ['turtle', 'sea turtle', 'leatherback', 'hawksbill', 'turtles', 'leatherback turtle'], ["Nesting season on Caribbean beaches.", "Leatherback or hawksbill."], "Language link: the riddle is in Jamaican Creole. Try translating it into Standard English."],
    ['m', "Spider by name, trickster by trade, in the stories told on the gallery at night I always outsmart the strong. Who am I?", ['anansi', 'anancy', 'ananse', 'kwaku anansi', 'brer anansi', 'bro anansi'], ["West African and Caribbean folklore.", "Eight legs, plenty of tricks."]],
    ['m', "Julie, Bombay, East Indian and Starch are all members of my family. Children race to pick me up when I fall from the tree in summer. What am I?", ['mango', 'mangoes', 'mangos'], ["Juicy and sweet.", "Mango season!"]],
    ['m', "What has an eye but cannot see, and brings wind and rain to the islands from June to November?", ['hurricane', 'a hurricane', 'storm', 'tropical storm', 'cyclone'], ["The season has a start and an end date.", "Batten down the windows."]],
    ['m', "What English word contains all twenty-six letters?", ['alphabet', 'the alphabet'], ["A to Z.", "Think about what the 26 letters are called together."]],
    ['m', "What seven-letter word has hundreds of letters in it?", ['mailbox', 'postbox', 'letterbox'], ["'Letters' can mean more than A, B and C.", "Where the postman drops things."]],
    ['m', "What starts with 'e', ends with 'e', and usually contains only one letter?", ['envelope', 'an envelope'], ["Not the alphabet kind of letter.", "Lick and seal."]],
    ['m', "I am a word of letters three. Add two more and fewer there will be. What word am I?", ['few'], ["Add two letters to the end.", "Few + er."]],
    ['m', "What has a head and a tail but no body?", ['coin', 'a coin', 'money'], ["Flip me before a cricket match.", "Heads or tails?"]],
    ['m', "Feed me and I live. Give me a drink and I die. What am I?", ['fire', 'a fire', 'flame'], ["Coal pot.", "Water puts me out."]],
    ['m', "What is always in front of you but can never be seen?", ['future', 'the future', 'tomorrow'], ["Time.", "Not the past."]],
    ['m', "What can you hold in your right hand but never in your left hand?", ['left hand', 'your left hand', 'left elbow', 'your left elbow', 'my left hand'], ["It is part of your body.", "Try it with your own hands."]],
    ['m', "No words, no voice, yet I can say 'I'm bored', 'I agree' or 'Leave me alone'. A shrug, a wink, a kiss-teeth. What am I?", ['body language', 'nonverbal communication', 'non verbal communication', 'nonverbal', 'gestures', 'gesture', 'kinesics'], ["Comm Studies, Module 3.", "Communication without words."]],
    ['m', "I am in the channel but I'm not always loud: a bad signal, a worried mind or a word you don't know. What am I?", ['noise', 'interference', 'barrier', 'barriers', 'communication barrier'], ["Communication model.", "Anything that interferes with the message."]],
    ['m', "How many months have 28 days?", ['12', 'twelve', 'all', 'all of them', 'all 12', 'all twelve'], ["Read carefully: 'have 28 days', not 'only 28'.", "February is not alone."]],
    ['m', "In a race, you overtake the person in second place. What place are you in now?", ['second', '2nd', '2', 'second place'], ["You took their spot.", "Not first."]],
    ['m', "What gets bigger the more you take away from it?", ['hole', 'a hole'], ["Dig.", "Spade."]],
    ['m', "What is black when you buy it, red when you use it, and grey when you throw it away?", ['charcoal', 'coal'], ["Coal pot.", "Barbecue on the beach."]],
    ['m', "What word starts with IS, ends with AND, and has LA in the middle?", ['island', 'an island'], ["IS + LA + AND.", "The Caribbean has hundreds."]],
    ['m', "The more of this there is, the less you can see. What is it?", ['darkness', 'dark', 'fog', 'the dark'], ["Blackout.", "Night."]],
    ['m', "What can you break without ever touching it?", ['promise', 'a promise', 'silence', 'record', 'heart', 'a heart'], ["You make it with words.", "'I swear I'll...'"]],
    ['m', "What tastes better than it smells?", ['tongue', 'your tongue', 'a tongue'], ["It is in your mouth.", "Read 'tastes' as an action."]],
    ['h', "Brothers and sisters I have none, but that man's father is my father's son. Who is 'that man'?", ['son', 'my son', 'his son', 'the speakers son', 'speakers son'], ["'My father's son' with no brothers is the speaker.", "So 'that man's father' is the speaker."]],
    ['h', "What comes once in a minute, twice in a moment, but never in a thousand years?", ['m', 'letter m', 'the letter m'], ["Look at the spelling, not the time.", "Count letters."], "Word riddle: miNUTE has one M; MoMent has two; 'a thousand years' has none."],
    ['h', "Forward I am heavy, but backward I am not. What am I?", ['ton', 'a ton', 'tonne'], ["Reverse the letters.", "A unit of weight."], "Word riddle: TON backwards is NOT."],
    ['h', "I'm an eight-letter word. Take away one letter at a time and I stay a word, all the way down to one letter. What am I?", ['starting'], ["starting → staring → string...", "...sting, sing, sin, in, I."]],
    ['h', "The rich need it, the poor have it, and if you eat it you will still be hungry. What is it?", ['nothing'], ["It is not a thing at all.", "Zero."]],
    ['h', "I have keys but no locks, space but no room, and you can enter but never go outside. What am I?", ['keyboard', 'a keyboard', 'computer keyboard'], ["Computer lab.", "QWERTY."]],
    ['h', "Which is heavier: a kilogram of feathers or a kilogram of saltfish?", ['neither', 'same', 'the same', 'equal', 'they weigh the same', 'both', 'neither they weigh the same', 'they are the same'], ["Read the units.", "A kilogram is a kilogram."]],
    ['h', "Mr and Mrs Joseph have six daughters. Each daughter has one brother. How many people are in the family?", ['9', 'nine'], ["The daughters share the same brother.", "2 parents + 6 daughters + ?"]],
    ['h', "What has thirteen hearts but no other organs?", ['deck of cards', 'a deck of cards', 'pack of cards', 'cards', 'deck', 'playing cards'], ["Games night.", "Spades, clubs, diamonds and ..."]],
    ['h', "Mi small, but mi a grow. Mi go a school inna uniform, and Granny call mi 'pickney'. In Standard English, wha mi be?", ['child', 'a child', 'kid', 'children', 'pickney'], ["Creole lexicon: 'pickney'.", "A young person."], "Language link: 'pickney' (Jamaica) is thought to come from the Portuguese 'pequeno' (small), via older contact languages."],
    ['h', "What four-letter word can be written forwards, backwards or upside down and still be read the same?", ['noon'], ["Midday.", "Palindrome."]],
    ['h', "What occurs twice in a week, once in a year, but never in a day?", ['e', 'letter e', 'the letter e'], ["Spelling again.", "A vowel."]],
    ['h', "Which English word is still pronounced the same when you take away four of its five letters?", ['queue', 'a queue'], ["You stand in it at the bank.", "Q."]],
    ['h', "You'll find me in Carnival but I'm not a costume. I'm in calypso and chutney but I'm not music. What am I?", ['c', 'letter c', 'the letter c'], ["Look at the spelling.", "Carnival, Calypso, Chutney..."]],
    ['h', "Dr Baptiste has a brother named Kevin, but Kevin has no brothers. How can this be?", ['sister', 'dr baptiste is his sister', 'she is his sister', 'his sister', 'the doctor is a woman', 'woman', 'dr baptiste is a woman', 'female'], ["Who said the doctor is a man?", "Kevin has a sibling, just not a brother."]],
    ['h', "I am an odd number. Take away one letter and I become even. What number am I?", ['seven', '7'], ["Spell the numbers.", "Remove the first letter."], "Word riddle: s-EVEN."],
    ['h', "Which three positive whole numbers give the same answer when added together and when multiplied together?", ['123', '1 2 3', '1, 2, 3', '1 2 and 3', 'one two three', 'one two and three', '1,2 and 3', '321'], ["Small numbers.", "1 + 2 + 3 = ?"]],
    ['h', "What five-letter word becomes 'one' when you take away its first two letters?", ['stone', 'alone', 'phone', 'shone', 'atone', 'drone', 'crone', 'prone', 'scone', 'ozone'], ["The last three letters spell a number.", "Rock."]],
    ['h', "What English word has three double letters in a row?", ['bookkeeper', 'bookkeeping', 'bookkeepers'], ["Accounts.", "oo-kk-ee"]]
  ];

  // Lateral thinking: s story, q [question, Y/N/I, note], o options (first is correct), a solution, k skill, trap
  const LATERAL = [
    { t: 'The Glass of Water', s: "A woman walks up to a snack counter and asks the cashier for a glass of water. The cashier suddenly jumps up and shouts “BOO!” The woman smiles, says “Thank you!” and leaves without the water.", q: [["Was the cashier being rude?", 'N', "The cashier was trying to help."], ["Was the woman very thirsty?", 'N', "The water was meant to fix something else."], ["Did the woman have a small, everyday problem?", 'Y'], ["Could the water have solved the same problem?", 'Y'], ["Was she making a repeated noise?", 'Y', "Over and over again."], ["Did they know each other?", 'I']], o: ["She had hiccups. The fright cured them, so she no longer needed the water.", "She was an actor rehearsing a scene with the cashier.", "The shop had no water, so the cashier made a joke instead."], k: 'assume', trap: "You assumed anyone who asks for water must be thirsty." },
    { t: 'Bankrupt at the Hotel', s: "Tasha pushed her car up to a hotel and immediately knew she was bankrupt. Nobody was upset. In fact, everyone around her was laughing.", q: [["Was it a real, full-size car?", 'N', "It was very small."], ["Did she lose real money?", 'N'], ["Was she playing a game?", 'Y'], ["Did the hotel belong to someone else?", 'Y', "Another player owned it."], ["Were dice involved?", 'Y'], ["Was the hotel by the beach?", 'I']], o: ["She was playing a property-trading board game: her car token landed on another player's hotel and she could not pay the rent.", "Her car broke down and the hotel charged her for parking.", "She was a tour guide who forgot her wallet."], k: 'reframe', trap: "You read 'car', 'hotel' and 'bankrupt' literally." },
    { t: 'The Seventh Floor', s: "Marcus lives on the 10th floor. Every morning he takes the lift down to the ground floor. Every evening he takes the lift up to the 7th floor and walks up the last three floors, unless it is raining or someone else is in the lift.", q: [["Does he enjoy the exercise?", 'N'], ["Is the lift broken above the 7th floor?", 'N'], ["Is it something about Marcus himself?", 'Y'], ["Is the umbrella important?", 'Y', "He uses it for something other than staying dry."], ["Would he ride to the 10th floor if he could press the button?", 'Y'], ["Does Marcus visit a friend on the 7th floor?", 'N']], o: ["He is too short to reach the 10th-floor button. He can reach it with his umbrella, or ask another passenger to press it.", "His friend lives on the 7th floor and he visits every evening.", "The lift charges more money for higher floors."], k: 'perspective', trap: "You pictured someone who can reach every button." },
    { t: "The Doctor's Son", s: "Jaden twisted his ankle in a football match, and his father drove him to the clinic. The doctor on duty looked at Jaden and said, “I can't treat him. He's my son.” The doctor was telling the truth, and Jaden's father was sitting in the waiting room.", q: [["Is the doctor Jaden's stepfather?", 'N'], ["Is the doctor one of Jaden's parents?", 'Y'], ["Is the doctor a man?", 'N'], ["Is the man in the waiting room really Jaden's father?", 'Y'], ["Is Jaden adopted?", 'I']], o: ["The doctor is Jaden's mother.", "The doctor is Jaden's grandfather.", "The man in the waiting room is not really his father."], k: 'assume', trap: "You assumed the doctor was a man." },
    { t: 'Not Twins', s: "Kayla and Kaylee were born on the same day of the same year, to the same mother and father. They are not twins.", q: [["Are they really sisters?", 'Y'], ["Were they born on the same day?", 'Y'], ["Was either of them adopted?", 'N'], ["Were other babies born at the same time?", 'Y'], ["Were they born in different hospitals?", 'N']], o: ["They are two of a set of triplets.", "One was born just before midnight and one just after.", "They are cousins, not sisters."], k: 'assume', trap: "You assumed two babies born together must be twins." },
    { t: 'Four Birthdays', s: "Aaliyah is sixteen years old, but she has only had four real birthdays.", q: [["Is she lying about her age?", 'N'], ["Was she ill or away on her birthdays?", 'N'], ["Is her date of birth important?", 'Y'], ["Does her birthday appear on the calendar every year?", 'N'], ["Is her birthday in February?", 'Y']], o: ["She was born on 29 February, a date that only appears in leap years.", "Her family only celebrates every fourth birthday.", "She lives in a country with a different calendar."], k: 'context', trap: "You assumed every date comes round every year." },
    { t: 'The Bearded Shaver', s: "A man in Port of Spain shaves twenty times a day, yet he still has a full beard.", q: [["Does he shave himself?", 'N'], ["Is shaving his job?", 'Y'], ["Does he use a real razor?", 'Y'], ["Does his beard grow unusually fast?", 'N']], o: ["He is a barber. He shaves his customers, not himself.", "His beard grows back in minutes.", "He only shaves his head."], k: 'assume', trap: "You assumed he was shaving his own face." },
    { t: 'Not a Hair Wet', s: "Uncle Desmond walked home in heavy rain with no umbrella and no hat. His clothes were soaked, but not a single hair on his head got wet.", q: [["Was anything covering his head?", 'N'], ["Did he walk under shelter?", 'N'], ["Does he have hair on his head?", 'N'], ["Is his age important?", 'I']], o: ["He is bald.", "He walked under the shop awnings.", "He was wearing a wig."], k: 'assume', trap: "You assumed he had hair to get wet." },
    { t: 'The Stuck Truck', s: "A delivery truck got stuck under a low bridge in Bridgetown. Engineers argued about cutting into the bridge. A schoolgirl walking past solved the problem in two minutes, without any tools.", q: [["Did she move the bridge?", 'N'], ["Did the truck need to become lower?", 'Y'], ["Did she unload the truck?", 'N'], ["Was the solution part of the truck itself?", 'Y'], ["Does it involve the wheels?", 'Y', "Think about what is inside them."]], o: ["She told the driver to let some air out of the tyres, so the truck sat lower and could be driven out.", "She told them to unload the delivery so the truck was lighter.", "She suggested waiting for the tide to go down."], k: 'perspective', trap: "Everyone focused on the bridge instead of the truck." },
    { t: 'The Ladder', s: "A window cleaner fell off a six-metre ladder onto concrete, but he was not hurt at all.", q: [["Did he land on something soft?", 'N'], ["Was he wearing a safety harness?", 'N'], ["Did he fall from the top of the ladder?", 'N'], ["Was he close to the ground?", 'Y']], o: ["He fell off the bottom rung.", "He was wearing a safety harness.", "He landed on his feet like a cat."], k: 'assume', trap: "You assumed he fell from the top." },
    { t: 'No Headlights', s: "A taxi driver drove along a country road with no street lights, no moon and his headlights switched off. A black goat stepped into the road, and he stopped in plenty of time.", q: [["Did he have special glasses?", 'N'], ["Could he see the goat clearly?", 'Y'], ["Was it night-time?", 'N'], ["Did the goat make a sound?", 'I']], o: ["It was daytime.", "The goat was wearing a bell.", "He knew the road by heart."], k: 'assume', trap: "'No moon' and 'no lights' made you picture night." },
    { t: 'Three Fish', s: "Two fathers and two sons went fishing off the jetty. They caught exactly three fish, and each of them took home one whole fish.", q: [["Did anyone share or cut a fish?", 'N'], ["Were there four people?", 'N'], ["Are they all from one family?", 'Y'], ["Are three generations involved?", 'Y']], o: ["There were only three people: a grandfather, his son and his grandson.", "One fish was cut in half.", "One person did not want a fish."], k: 'reframe', trap: "You counted the labels, not the people. One person can be both a father and a son." },
    { t: 'Three Nil', s: "The national team won 3–0, yet not a single man scored a goal.", q: [["Were they own goals?", 'N'], ["Was it football?", 'Y'], ["Were there men on the team?", 'N']], o: ["It was a women's team.", "All the goals were penalties.", "The other team forfeited the match."], k: 'assume', trap: "You assumed a 'national team' means a men's team." },
    { t: 'The Ancient Coin', s: "A man in Willemstad offered a museum a bronze coin stamped “46 B.C.” The curator took one look and refused to buy it.", q: [["Was the metal wrong?", 'N'], ["Was the date the problem?", 'Y'], ["Could people living in 46 B.C. have used the term 'B.C.'?", 'N'], ["Did the museum already own one?", 'N']], o: ["Nobody living in 46 B.C. could know they were 'before Christ', so a real coin could never be stamped 'B.C.'. It was a fake.", "Coins did not exist in 46 B.C.", "Bronze was not invented until later."], k: 'context', trap: "You read the date without asking who could have written it." },
    { t: 'Friday', s: "A rider arrived in town on Friday, stayed for three days, and left on Friday.", q: [["Did the rider stay a whole week?", 'N'], ["Is 'Friday' a day of the week here?", 'N', "Not every time."], ["Is 'Friday' a name?", 'Y'], ["Was the rider on an animal?", 'Y']], o: ["The horse was called Friday.", "They arrived one Friday and left the next Friday.", "The town uses a different calendar."], k: 'reframe', trap: "You read 'Friday' as a day both times." },
    { t: 'Domino Draw', s: "Two friends played five games of dominoes. They each won the same number of games, and there were no draws.", q: [["Did they play against each other?", 'N'], ["Were other people playing too?", 'Y'], ["Was any game cancelled?", 'N'], ["Were they on the same side?", 'Y']], o: ["They were partners on the same team, so they won the same games together.", "One game was cancelled.", "They each won two and a half games."], k: 'assume', trap: "You assumed the two friends were opponents." },
    { t: 'Hung Out to Dry', s: "Mia dipped her best friend in a tray of liquid, then hung her on a line to dry. Her friend loved the result.", q: [["Was her friend physically there?", 'N'], ["Was it a picture of her friend?", 'Y'], ["Is this an older technique?", 'Y'], ["Did it happen in a dark room?", 'Y']], o: ["Mia was developing a printed photograph of her friend in a darkroom.", "Mia was washing her friend's doll.", "They were practising a swimming drill."], k: 'reframe', trap: "You read 'her friend' as the person, not a picture of her." },
    { t: 'Identical Essays', s: "Two students handed in essays that were identical, word for word. The teacher gave both of them full marks and never suspected copying.", q: [["Did they copy each other?", 'N'], ["Were they supposed to write their own ideas?", 'N'], ["Did they both hear or see the same text?", 'Y'], ["Was it a writing-skills exercise?", 'Y']], o: ["It was a dictation exercise: both students wrote down the same passage the teacher read aloud.", "The teacher did not read them.", "They were twins."], k: 'context', trap: "You assumed the task was to write original work." },
    { t: 'Reading in the Dark', s: "During a blackout across the whole village, Grandma Joseph read her novel in pitch darkness for two hours.", q: [["Did she use a torch or phone?", 'N'], ["Was she reading with her eyes?", 'N'], ["Was she using her hands?", 'Y'], ["Is she blind?", 'Y']], o: ["She was reading a Braille book with her fingertips.", "She knew the book by heart.", "Her phone screen gave off light."], k: 'assume', trap: "You assumed reading always uses sight. Braille is a tactile channel." },
    { t: 'Masked Welcome', s: "Luis left home, turned left three times, and arrived back home, where two people wearing masks were waiting for him. He was delighted.", q: [["Were the masks hiding their identities?", 'N'], ["Is this a sport?", 'Y'], ["Was 'home' his house?", 'N'], ["Is a bat involved?", 'Y'], ["Is this the most popular sport in the Dominican Republic?", 'Y']], o: ["He was playing baseball: he ran the bases back to home plate, where the catcher and the umpire wear masks.", "His friends threw a surprise costume party.", "He got lost in his neighbourhood."], k: 'reframe', trap: "You read 'home' as a house." },
    { t: 'The Silent Parrot', s: "A pet shop promised that its parrot would repeat every word it heard. A week later the parrot had not said a single word, yet the shop had not lied.", q: [["Was the parrot sick?", 'N'], ["Did people talk near the parrot?", 'Y'], ["Could the parrot hear?", 'N'], ["Was it a real parrot?", 'Y']], o: ["The parrot was deaf, so it never heard any words to repeat.", "The parrot only speaks Spanish.", "The shop sold a toy parrot."], k: 'reframe', trap: "You focused on 'repeat' and skipped over 'heard'." },
    { t: 'Two Dollars Each', s: "At a hardware store, 1 costs $2, 15 costs $4, and 145 costs $6. What is the customer buying?", q: [["Is the price based on the size of the number?", 'N'], ["Is the price based on how many digits there are?", 'Y'], ["Would 999 cost $6?", 'Y'], ["Would it go on a front gate or door?", 'Y']], o: ["House-number digits: each digit costs $2.", "Nails, sold by weight.", "Lottery tickets."], k: 'reframe', trap: "You read the numbers as amounts, not as things." },
    { t: 'Behind Each Other', s: "At exactly the same moment, Jamal stood behind his father and his father stood behind Jamal.", q: [["Was a mirror involved?", 'N'], ["Were they facing the same way?", 'N'], ["Were they touching?", 'I'], ["Were they facing opposite directions?", 'Y']], o: ["They were standing back to back.", "They were in two different queues.", "One of them was looking at a reflection."], k: 'perspective', trap: "You pictured both people facing the same way." },
    { t: 'Wrong Way', s: "A truck driver went the wrong way down a one-way street in Castries. A police officer saw him and did nothing.", q: [["Was the officer off duty?", 'N'], ["Was it an emergency?", 'N'], ["Was he driving his truck?", 'N'], ["Was he on foot?", 'Y']], o: ["The truck driver was walking, not driving.", "It was an emergency.", "The officer was his friend."], k: 'assume', trap: "You assumed a 'truck driver' is always driving." },
    { t: 'The Three-Hour Exam', s: "Tasha sat a three-hour exam session, never wrote a single word, and earned excellent marks.", q: [["Did she type her answers?", 'N'], ["Did she answer by speaking?", 'Y'], ["Did an examiner listen to her?", 'Y'], ["Was she the invigilator?", 'N']], o: ["It was an oral examination: she answered by speaking.", "She was the invigilator.", "She left the answers blank but the paper was cancelled."], k: 'assume', trap: "You assumed every exam is written." },
    { t: '“I\'m fine.”', s: "Keisha's best friend texted back two words: “I'm fine.” Keisha immediately called to ask what was wrong.", q: [["Did the message contain a sad word?", 'N'], ["Was the problem the style, not the words?", 'Y'], ["Does her friend usually send emojis and exclamation marks?", 'Y'], ["Did the message end with a full stop?", 'Y'], ["Was it sent late at night?", 'I']], o: ["Her friend usually texts with emojis and exclamation marks. A short, flat “I'm fine.” with a full stop broke that pattern and signalled that something was wrong.", "The text was sent at 3 a.m.", "Keisha always calls everyone back."], k: 'context', trap: "You focused on the words and ignored the tone. In texting, punctuation and emojis do the work of paralanguage." },
    { t: 'Fifteen to Eighteen', s: "Andre said: “The day before yesterday I was fifteen, but next year I will turn eighteen.” He was telling the truth.", q: [["Is he lying?", 'N'], ["Did he say it on a special date?", 'Y', "The first day of something."], ["Is his birthday near the end of the year?", 'Y'], ["Was he born on 29 February?", 'N']], o: ["He said it on 1 January, and his birthday is 31 December.", "He was confused about his age.", "He was born on 29 February."], k: 'context', trap: "You assumed the statement was made in the middle of the year." },
    { t: 'The Silent Conversation', s: "Two friends chatted for an hour at a busy café in Port of Spain. Neither of them spoke a word, wrote anything or used a phone.", q: [["Were they communicating?", 'Y'], ["Were they using their hands?", 'Y'], ["Is it a full language?", 'Y'], ["Were they playing a game?", 'N']], o: ["They were having a conversation in sign language.", "They were reading each other's minds.", "They were playing cards."], k: 'assume', trap: "You assumed conversation means speech. Sign languages are complete languages." },
    { t: 'Two Midnights', s: "Kai celebrated midnight on New Year's Eve with his family in Barbados. One hour later, he celebrated midnight on New Year's Eve again, without leaving the house.", q: [["Did he change the clocks?", 'N'], ["Was someone far away involved?", 'Y'], ["Do time zones matter?", 'Y'], ["Was technology involved?", 'Y']], o: ["He joined a video call with relatives in Jamaica, which is one hour behind Barbados, and celebrated their midnight too.", "His clock was wrong.", "He fell asleep and dreamt it."], k: 'perspective', trap: "You assumed 'midnight' is the same moment everywhere." },
    { t: 'Dry Walk', s: "A family of five walked to church sharing one small umbrella, yet nobody got wet.", q: [["Was it raining?", 'N'], ["Did they walk under shelter?", 'N'], ["Was the umbrella magic?", 'N']], o: ["It was not raining.", "They walked very close together.", "The church was next door."], k: 'assume', trap: "You assumed an umbrella means rain." },
    { t: 'Not a Single Person', s: "A minibus full of passengers stopped. Nobody got off, yet when it pulled away there was not a single person on board.", q: [["Did people get off?", 'N'], ["Is the word 'single' important?", 'Y'], ["Were they all married?", 'Y']], o: ["Everyone on board was married, so there was not a single (unmarried) person.", "They were all asleep.", "The bus was a toy."], k: 'reframe', trap: "You read 'single' as 'one'." },
    { t: 'The Dry Earring', s: "Rhea dropped her earring into a full cup of coffee, but when she picked it out, it was completely dry.", q: [["Was the coffee liquid?", 'N'], ["Was the earring waterproof?", 'I'], ["Was the cup full of coffee powder or beans?", 'Y']], o: ["The cup was full of ground coffee (or beans), not liquid coffee.", "The earring was waterproof.", "She caught it before it touched the coffee."], k: 'assume', trap: "You assumed 'coffee' meant a drink." },
    { t: 'The Rising Tide', s: "A boat in Kingstown harbour has a ladder over its side. The bottom three rungs are under water. The tide rises one metre. How many rungs are under water now?", q: [["Does the boat stay in the same place?", 'N'], ["Does the boat float?", 'Y'], ["Does the water rise against the ladder?", 'N']], o: ["Still three: the boat floats and rises with the tide.", "Six.", "All of them."], k: 'perspective', trap: "You pictured the ladder fixed in place." }
  ];
  const SKILLS = {
    assume: ['🧱', 'Challenge assumptions', "Our brains fill gaps with what is 'usual'. Ask yourself: which detail did I add that the story never said?"],
    reframe: ['🔁', 'Reframe the words', "A word can carry more than one meaning (denotation vs. context). Re-read key words literally and in other senses."],
    perspective: ['🔭', 'Switch perspective', "Look at the scene from another person's, object's or place's point of view."],
    context: ['🧭', 'Read the context', "Small details (date, place, purpose, tone) change the meaning of a whole message."]
  };

  // Word Brain
  const ANAGRAMS = [
    ['register', "Level of formality in language (frozen, formal, casual...)"], ['dialect', "A regional or social variety of a language"], ['creole', "A contact language that became a community's first language"],
    ['pidgin', "A simplified contact language with no native speakers"], ['audience', "The people a message is meant for"], ['purpose', "Why a message is written: to inform, persuade, entertain..."],
    ['channel', "The medium a message travels through"], ['feedback', "The receiver's response to a message"], ['context', "The situation surrounding a message"],
    ['rhetoric', "The art of persuasive language"], ['metaphor', "A comparison that says one thing IS another"], ['diction', "A writer's choice of words"],
    ['persona', "The voice or character a writer adopts"], ['kinesics', "Communication through body movement"], ['proxemics', "Use of space and distance in communication"],
    ['bilingual', "Able to use two languages"], ['plagiarism', "Presenting someone else's work as your own"], ['citation', "A reference that credits a source"],
    ['imagery', "Language that appeals to the senses"], ['narrative', "Writing that tells a story"], ['expository', "Writing that explains or informs"],
    ['persuasive', "Writing that tries to convince"], ['semantics', "The study of meaning"], ['syntax', "The arrangement of words in sentences"],
    ['lexicon', "The vocabulary of a language"], ['inference', "A conclusion drawn from evidence and reasoning"], ['argument', "A claim supported by reasons and evidence"],
    ['abstract', "A short summary at the start of a research paper"], ['sampling', "Choosing a group of people to study"], ['discourse', "Extended spoken or written communication"],
    ['phonology', "The study of the sound system of a language"], ['questionnaire', "A printed set of questions for gathering data"]
  ];
  const MISSING = [
    ['acco_modate', 'accommodate', "Room for two Cs and two Ms."], ['defin_tely', 'definitely', "It contains 'finite': de-FINITE-ly."], ['sep_rate', 'separate', "There's 'a rat' in sep-A-RAT-e."],
    ['ne_essary', 'necessary', "One collar (c), two sleeves (ss)."], ['occu__ence', 'occurrence', "Double c, double r."], ['rh_thm', 'rhythm', "Rhythm Helps Your Two Hips Move."],
    ['emba__ass', 'embarrass', "Double r, double s."], ['gover_ment', 'government', "Govern + ment: keep the n."], ['enviro_ment', 'environment', "Environ + ment."],
    ['privil_ge', 'privilege', "No d: privilege."], ['rec__ve', 'receive', "i before e, except after c."], ['consc_ence', 'conscience', "con + science."],
    ['indep_ndent', 'independent', "Every vowel after 'p' is an e."], ['reco__end', 'recommend', "One c, double m."], ['begi__ing', 'beginning', "Double the n before -ing."],
    ['bel_eve', 'believe', "Never be-LIE-ve a lie."], ['arg_ment', 'argument', "Argue drops its e: argument."], ['gramm_r', 'grammar', "It ends in -ar, not -er."],
    ['pron_nciation', 'pronunciation', "proNOUNce becomes proNUNciation: no o."], ['questio__aire', 'questionnaire', "Double n."], ['exist_nce', 'existence', "-ence, not -ance."],
    ['mainten_nce', 'maintenance', "main-ten-ance."], ['o_casionally', 'occasionally', "Double c, single s, double l."], ['co__ittee', 'committee', "Double m, double t, double e."],
    ['Carib_ean', 'Caribbean', "One r, double b."], ['resta_rant', 'restaurant', "resta-U-rant."], ['po__ession', 'possession', "Two sets of double s."],
    ['a_dress', 'address', "Double d, double s."], ['tomo__ow', 'tomorrow', "One m, double r."], ['lib_ary', 'library', "Say both rs: li-BRAR-y."], ['sincer_ly', 'sincerely', "Keep the e: sincere + ly."]
  ];
  const HOMOPHONES = [
    ["___ going to the Panorama finals tonight.", "They're", ["Their", "There"]], ["The students left ___ bags in the classroom.", "their", ["there", "they're"]], ["Put the speaker over ___, by the window.", "there", ["their", "they're"]],
    ["The ___ was so hot that we stayed in the shade.", "weather", ["whether", "wheather"]], ["She asked ___ the essay was due on Friday.", "whether", ["weather", "wheather"]], ["___ turn is it to present?", "Whose", ["Who's", "Whos"]],
    ["___ bringing the speakers for the fête?", "Who's", ["Whose", "Whos"]], ["The parrot flapped ___ wings.", "its", ["it's", "its'"]], ["___ raining again in Georgetown.", "It's", ["Its", "Its'"]],
    ["The pelau was ___ salty for me.", "too", ["to", "two"]], ["The ___ of us walked to the beach.", "two", ["to", "too"]], ["The ___ addressed the whole school at assembly.", "principal", ["principle", "principel"]],
    ["Honesty is a ___ I try to live by.", "principle", ["principal", "principel"]], ["Buy your ___ before the exam: pens, rulers and paper.", "stationery", ["stationary", "stationerie"]], ["The bus was ___ in traffic for an hour.", "stationary", ["stationery", "stationerie"]],
    ["He paid her a ___ on her speech.", "compliment", ["complement", "complimant"]], ["Sorrel is the perfect ___ to black cake.", "complement", ["compliment", "complemant"]], ["I can't ___ that loud noise.", "bear", ["bare", "bair"]],
    ["Could I have a ___ of black cake?", "piece", ["peace", "peice"]], ["The Caribbean ___ is warm all year.", "Sea", ["See", "Cee"]], ["Can you ___ the steelpan from here?", "hear", ["here", "heer"]],
    ["___ your candidate number at the top of the answer booklet.", "Write", ["Right", "Rite"]], ["She ___ CAPE Communication Studies with a Grade One.", "passed", ["past", "parsed"]], ["Always ___ your sources in a research essay.", "cite", ["site", "sight"]],
    ["Read the poem ___ to the class.", "aloud", ["allowed", "a loud"]], ["Phones are not ___ in the exam room.", "allowed", ["aloud", "aloude"]], ["We get a fifteen-minute ___ after Paper 1.", "break", ["brake", "braek"]],
    ["This ___ prepares you for all three modules.", "course", ["coarse", "corse"]], ["What is the ___ of the narrator in this story?", "role", ["roll", "rol"]], ["Grandpa told us an Anansi ___.", "tale", ["tail", "tael"]],
    ["Mix the ___ and water to make dumplings.", "flour", ["flower", "flowr"]], ["The ___ of my shoe came loose.", "sole", ["soul", "sol"]]
  ];
  const IDIOMS = [
    ["Every day bucket go a well, one day the ___ drop out.", "bottom", ["water", "rope", "handle"], "If you keep doing the same risky (or wrong) thing again and again, one day it will catch up with you.", "Jamaica"],
    ["One one coco full ___.", "basket", ["belly", "tree", "bag"], "Little by little you reach your goal: success comes one step at a time.", "Jamaica"],
    ["Cockroach nuh business inna ___ fight.", "fowl", ["dog", "puss", "goat"], "Stay out of matters that do not concern you, especially dangerous ones.", "Jamaica"],
    ["Wanti wanti cyaan get it, an' getti getti nuh ___ it.", "want", ["need", "see", "hold"], "People who badly want something often can't get it, while those who have it don't value it.", "Jamaica"],
    ["Chicken merry, ___ deh near.", "hawk", ["dog", "farmer", "rain"], "Even in happy times, stay alert: danger may be close.", "Jamaica"],
    ["Rockstone a river bottom nuh know sun ___.", "hot", ["rise", "set", "bright"], "Those who live in comfort do not understand other people's hardships.", "Jamaica"],
    ["What sweet nanny goat a go run him ___.", "belly", ["foot", "mouth", "tail"], "Something that feels good now can cause harm later.", "Jamaica"],
    ["All skin teeth nah ___.", "laugh", ["bite", "shine", "talk"], "Not every smile is friendly; some people smile at you but mean you harm.", "Guyana (also heard across the region)"],
    ["Every hoe have dem ___ a bush.", "stick", ["handle", "friend", "garden"], "There is a match or partner for everyone.", "Jamaica"],
    ["Moon run till ___ catch it.", "daylight", ["cloud", "rain", "night"], "Wrongdoing is eventually exposed.", "Guyana and Jamaica"],
    ["When trouble tek yuh, pickney shut ___ yuh.", "fit", ["find", "warm", "hide"], "When you are in serious trouble, you will accept help you would normally think is not good enough.", "Jamaica"],
    ["Sorry fi mawga dog, mawga dog turn round ___ yuh.", "bite", ["love", "follow", "lick"], "The people you help are sometimes the most ungrateful.", "Jamaica and Guyana"],
    ["Fire deh a mus-mus tail, him think a cool ___.", "breeze", ["drink", "water", "night"], "Someone who is blind to danger until it overtakes them.", "Jamaica"],
    ["New broom sweep clean, but old broom know the ___.", "corners", ["kitchen", "yard", "dust"], "New people bring fresh energy, but experience still counts.", "Jamaica"],
    ["Every mikkle mek a ___.", "mukkle", ["muddle", "nickel", "mountain"], "Small amounts add up to something big: save a little at a time.", "Jamaica"],
    ["Mi come yah fi drink milk, mi nuh come yah fi count ___.", "cow", ["goat", "money", "cup"], "I'm here for results, not unnecessary details: get to the point.", "Jamaica"],
    ["Puss and dog nuh have the same ___.", "luck", ["food", "house", "name"], "Some people are luckier than others; don't expect the same outcome as someone else.", "Jamaica"],
    ["Duppy know who fi ___.", "frighten", ["follow", "visit", "trouble"], "Bullies pick on people they think can't defend themselves.", "Jamaica"],
    ["Learn fi creep before yuh ___.", "walk", ["run", "fly", "talk"], "Master the basics before you attempt harder things.", "Jamaica"],
    ["Don't count your chickens before they ___.", "hatch", ["grow", "lay", "fly"], "Don't rely on something good happening before it actually happens.", "English idiom"],
    ["The ball is in your ___.", "court", ["hand", "net", "corner"], "It is your turn to take action or make a decision.", "English idiom"],
    ["Actions speak louder than ___.", "words", ["voices", "music", "noise"], "What you do shows more than what you say.", "English idiom"],
    ["Every cloud has a silver ___.", "lining", ["edge", "coin", "rain"], "Something good can come out of a bad situation.", "English idiom"],
    ["Don't judge a book by its ___.", "cover", ["title", "price", "author"], "Don't judge people or things only by how they look.", "English idiom"],
    ["Don't bite off more than you can ___.", "chew", ["swallow", "carry", "taste"], "Don't take on more than you can manage.", "English idiom"],
    ["Let the cat out of the ___.", "bag", ["house", "box", "yard"], "To reveal a secret by mistake.", "English idiom"],
    ["You hit the nail on the ___.", "head", ["top", "wall", "board"], "You described the situation exactly right.", "English idiom"],
    ["Let's play a game to break the ___.", "ice", ["silence", "rules", "glass"], "To ease tension when people first meet.", "English idiom"],
    ["Stop beating around the ___ and tell me.", "bush", ["tree", "yard", "drum"], "Avoiding the main point instead of speaking directly.", "English idiom"],
    ["We only go to the mainland once in a blue ___.", "moon", ["sky", "month", "sea"], "Very rarely.", "English idiom"],
    ["When in Rome, do as the ___ do.", "Romans", ["locals", "tourists", "Italians"], "Follow the customs of the place you are visiting.", "English idiom"],
    ["If you think I took it, you're barking up the wrong ___.", "tree", ["dog", "road", "door"], "You are blaming the wrong person or looking in the wrong place.", "English idiom"]
  ];
  const REBUS = [
    ['🧠⛈️', 'brainstorm', ['headache', 'brainwave', 'thunderstruck'], 'brain + storm. Brainstorming is the first step of planning an essay.'],
    ['☀️🌻', 'sunflower', ['sunshine', 'daisy', 'flowerpot'], 'sun + flower'],
    ['🔥🪰', 'firefly', ['flyover', 'campfire', 'fireworks'], 'fire + fly'],
    ['⭐🐟', 'starfish', ['goldfish', 'superstar', 'fishnet'], 'star + fish'],
    ['🐴👟', 'horseshoe', ['racehorse', 'shoelace', 'horsepower'], 'horse + shoe'],
    ['🧈🪰', 'butterfly', ['bumblebee', 'buttercup', 'dragonfly'], 'butter + fly'],
    ['⌚🐶', 'watchdog', ['hotdog', 'stopwatch', 'dog days'], 'watch + dog'],
    ['🦶📝', 'footnote', ['footprint', 'notebook', 'football'], 'foot + note. Research link: footnotes credit your sources.'],
    ['📖🐛', 'bookworm', ['bookmark', 'earthworm', 'storybook'], 'book + worm'],
    ['👂💍', 'earring', ['ringtone', 'earphone', 'wedding'], 'ear + ring'],
    ['☀️👓', 'sunglasses', ['sunshine', 'eyeglasses', 'sunrise'], 'sun + glasses'],
    ['🌧️🧥', 'raincoat', ['rainbow', 'overcoat', 'raindrop'], 'rain + coat'],
    ['🍯🌙', 'honeymoon', ['moonlight', 'honeybee', 'full moon'], 'honey + moon'],
    ['🥚🌱', 'eggplant', ['egg roll', 'houseplant', 'eggshell'], 'egg + plant'],
    ['🐱🐟', 'catfish', ['catwalk', 'fishbowl', 'swordfish'], 'cat + fish'],
    ['🌞⬆️', 'sunrise', ['sunset', 'uprising', 'sunflower'], 'sun + rise (up)'],
    ['🧠🌊', 'brainwave', ['brainstorm', 'heatwave', 'mindset'], 'brain + wave: a sudden clever idea.'],
    ['🐌📬', 'snail mail', ['email', 'slow motion', 'mailbox'], 'snail + mail: the old, slow postal channel (compare email).'],
    ['🔥🧱', 'firewall', ['fireplace', 'brick wall', 'wildfire'], 'fire + wall: protects a computer network.'],
    ['🕸️📄', 'web page', ['spider web', 'paperback', 'homepage'], 'web + page'],
    ['🧊🔨', 'icebreaker', ['ice cream', 'hammerhead', 'ice cube'], 'ice + breaker: an activity that helps people start talking.'],
    ['🔑📝', 'keynote', ['keyboard', 'notebook', 'keyhole'], 'key + note: the main speech at an event.'],
    ['🐟🥣', 'fishbowl', ['fishcake', 'goldfish', 'bowl over'], 'fish + bowl'],
    ['🐦🏠', 'birdhouse', ['bird call', 'greenhouse', 'lighthouse'], 'bird + house'],
    ['✋✍️', 'handwriting', ['handshake', 'handout', 'typewriter'], 'hand + writing'],
    ['🛢️🥁', 'steel drum', ['oil drum', 'drumstick', 'barrel roll'], 'oil drum + drum: the steelpan was first made from oil drums.']
  ];
  const ODD = [
    [['pidgin', 'creole', 'dialect', 'metaphor'], 'metaphor', "Pidgin, creole and dialect are language varieties; a metaphor is a figure of speech."],
    [['simile', 'metaphor', 'personification', 'paragraph'], 'paragraph', "The others are figurative devices; a paragraph is a unit of text."],
    [['kinesics', 'proxemics', 'haptics', 'syntax'], 'syntax', "Kinesics, proxemics and haptics are non-verbal communication; syntax is sentence structure."],
    [['interview', 'questionnaire', 'observation', 'conclusion'], 'conclusion', "The others are ways to collect data."],
    [['sender', 'receiver', 'channel', 'rhyme'], 'rhyme', "Sender, receiver and channel are parts of the communication process."],
    [['formal', 'casual', 'intimate', 'plural'], 'plural', "Formal, casual and intimate are registers; plural is a grammatical number."],
    [['Jamaica', 'Trinidad and Tobago', 'Barbados', 'Venezuela'], 'Venezuela', "The others have English as an official language; Venezuela's is Spanish."],
    [['Papiamento', 'Kwéyòl', 'Sranan Tongo', 'Esperanto'], 'Esperanto', "The others are Caribbean creole languages; Esperanto is a constructed language."],
    [['noun', 'verb', 'adjective', 'vowel'], 'vowel', "Noun, verb and adjective are parts of speech; a vowel is a type of sound or letter."],
    [['calypso', 'soca', 'reggae', 'sonnet'], 'sonnet', "The others are Caribbean music genres; a sonnet is a poem."],
    [['email', 'blog', 'podcast', 'handshake'], 'handshake', "The others are technology-mediated channels; a handshake is face-to-face, non-verbal."],
    [['persuade', 'inform', 'entertain', 'punctuate'], 'punctuate', "Persuade, inform and entertain are purposes of communication."],
    [['diary', 'interview transcript', 'eyewitness account', 'encyclopedia'], 'encyclopedia', "The others are primary sources; an encyclopedia is a tertiary (reference) source."],
    [['tone', 'pitch', 'volume', 'font'], 'font', "Tone, pitch and volume are vocal (paralinguistic) features; font is visual."],
    [['phonology', 'morphology', 'syntax', 'cartography'], 'cartography', "The others are levels of language study; cartography is map-making."],
    [['alliteration', 'assonance', 'onomatopoeia', 'thesis'], 'thesis', "The others are sound devices; a thesis is the main claim of an essay."],
    [['validity', 'reliability', 'sampling', 'rhyme'], 'rhyme', "The others are research terms."],
    [['ackee', 'breadfruit', 'saltfish', 'sushi'], 'sushi', "The others are staples of Caribbean cooking; sushi is Japanese."],
    [['Anansi', 'Papa Bois', 'Mama Dlo', 'Cinderella'], 'Cinderella', "The others are figures from Caribbean folklore."],
    [['Kingston', 'Bridgetown', 'Castries', 'Miami'], 'Miami', "The others are Caribbean capital cities."],
    [['synonym', 'antonym', 'homophone', 'semicolon'], 'semicolon', "The others describe relationships between words; a semicolon is punctuation."],
    [['slang', 'jargon', 'colloquialism', 'citation'], 'citation', "The others are kinds of vocabulary; a citation credits a source."],
    [["their", "there", "they're", "theory"], 'theory', "The others are homophones (they sound the same)."],
    [['cue', 'queue', 'Q', 'quay'], 'quay', "Cue, queue and Q all sound like 'kyoo'; quay is pronounced 'key'."],
    [['knight', 'know', 'knee', 'kite'], 'kite', "The others begin with a silent k."],
    [['rough', 'tough', 'enough', 'though'], 'though', "The others end with an 'uff' sound; though rhymes with 'go'."],
    [['steelpan', 'tassa drum', 'cuatro', 'bagpipes'], 'bagpipes', "The others are instruments at the heart of Trinidad and Tobago music; bagpipes are Scottish."],
    [['inform', 'infer', 'imply', 'insect'], 'insect', "Inform, infer and imply are communication verbs."]
  ];

  // Logic Lab
  const SEQS = [
    ['2, 4, 8, 16, ?', ['32'], "Each term doubles.", "Multiply."],
    ['1, 4, 9, 16, 25, ?', ['36'], "Square numbers: 1², 2², 3²... so 6² = 36.", "Think of 1×1, 2×2..."],
    ['1, 1, 2, 3, 5, 8, ?', ['13'], "Each term is the sum of the two before it (5 + 8).", "Add neighbours."],
    ['3, 7, 11, 15, ?', ['19'], "Add 4 each time.", "Constant gap."],
    ['100, 95, 85, 70, ?', ['50'], "Subtract 5, then 10, then 15, then 20.", "The gap grows by 5."],
    ['2, 3, 5, 7, 11, ?', ['13'], "Prime numbers.", "Only divisible by 1 and themselves."],
    ['1, 8, 27, 64, ?', ['125'], "Cube numbers: 5³ = 125.", "1×1×1, 2×2×2..."],
    ['A, C, E, G, ?', ['i'], "Skip one letter each time.", "Alphabet positions 1, 3, 5, 7..."],
    ['Z, X, V, T, ?', ['r'], "Go backwards, skipping one letter.", "Reverse alphabet."],
    ['J, F, M, A, M, J, ?', ['j'], "First letters of the months: July.", "January, February..."],
    ['M, T, W, T, F, ?', ['s'], "First letters of the days: Saturday.", "Monday, Tuesday..."],
    ['O, T, T, F, F, S, S, ?', ['e'], "First letters of One, Two, Three... Eight.", "Count aloud."],
    ['1, 2, 6, 24, 120, ?', ['720'], "Multiply by 2, 3, 4, 5, then 6.", "The multiplier grows."],
    ['2, 6, 12, 20, 30, ?', ['42'], "Add 4, 6, 8, 10, then 12.", "The gap grows by 2."],
    ['81, 27, 9, 3, ?', ['1'], "Divide by 3 each time.", "Thirds."],
    ['A, B, D, G, K, ?', ['p'], "Skip 0, 1, 2, 3, then 4 letters (K + 5 = P).", "The jump grows."],
    ['1, 3, 6, 10, 15, ?', ['21'], "Triangle numbers: add 2, 3, 4, 5, then 6.", "The gap grows by 1."],
    ['7, 10, 8, 11, 9, 12, ?', ['10'], "Alternately add 3 and subtract 2.", "Two steps: up, down."],
    ['B, E, H, K, ?', ['n'], "Move forward three letters each time.", "Alphabet jumps."],
    ['1, 11, 21, 1211, 111221, ?', ['312211'], "Look and say: '111221' is three 1s, two 2s, one 1 → 312211.", "Read each term aloud describing the one before."]
  ];
  // Logic grids: is/not/either/neither
  const GRIDS = [
    { t: 'Band practice', p: ['Ana', 'Ben', 'Cleo'], i: ['tenor pan', 'guitar', 'drums'], y: 'plays the', n: "doesn't play the", c: [['not', 0, 2], ['not', 0, 1], ['not', 1, 2]], sol: [0, 1, 2] },
    { t: 'Carnival costumes', p: ['Dev', 'Esi', 'Femi'], i: ['blue costume', 'gold costume', 'red costume'], y: 'wears the', n: "doesn't wear the", c: [['neither', 1, 0, 1], ['not', 0, 2]], sol: [0, 2, 1] },
    { t: 'Lunch orders', p: ['Gia', 'Hari', 'Imani'], i: ['roti', 'doubles', 'bake and saltfish'], y: 'ordered', n: "didn't order", c: [['either', 0, 1, 2], ['not', 1, 0], ['not', 0, 1]], sol: [2, 1, 0] },
    { t: 'Island trips', p: ['Jalen', 'Keon', 'Lena'], i: ['Tobago', 'Nevis', 'Bequia'], y: 'visited', n: "didn't visit", c: [['not', 0, 0], ['not', 1, 0], ['not', 0, 1]], sol: [2, 1, 0] },
    { t: 'Debate team', p: ['Malik', 'Nia', 'Omar'], i: ['speaker', 'timekeeper', 'researcher'], y: 'is the', n: 'is not the', c: [['neither', 0, 0, 1], ['not', 1, 2]], sol: [2, 1, 0] },
    { t: 'Fruit stall', p: ['Priya', 'Quincy', 'Rhea'], i: ['mangoes', 'guavas', 'pineapples'], y: 'sells', n: "doesn't sell", c: [['either', 1, 0, 2], ['not', 2, 1], ['not', 1, 2]], sol: [1, 0, 2] },
    { t: 'Radio station', p: ['Shan', 'Tariq', 'Uma'], i: ['music show', 'news', 'sports show'], y: 'hosts the', n: "doesn't host the", c: [['not', 0, 1], ['not', 1, 1], ['not', 0, 2]], sol: [0, 2, 1] },
    { t: 'Pets', p: ['Vaughn', 'Wendell', 'Xavi'], i: ['parrot', 'dog', 'cat'], y: 'owns the', n: "doesn't own the", c: [['is', 1, 2], ['not', 0, 1]], sol: [0, 2, 1] },
    { t: 'Revision plans', p: ['Yara', 'Zuri', 'Ana'], i: ['Module 1', 'Module 2', 'Module 3'], y: 'is revising', n: "isn't revising", c: [['neither', 2, 0, 1], ['not', 0, 0]], sol: [1, 0, 2] },
    { t: 'Sports day', p: ['Bryce', 'Ciara', 'Dev'], i: ['100 m sprint', 'long jump', 'relay'], y: 'won the', n: "didn't win the", c: [['not', 1, 2], ['not', 2, 2], ['not', 1, 1]], sol: [2, 0, 1] },
    { t: 'Festival trips', p: ['Esi', 'Femi', 'Gia'], i: ['Crop Over', 'Jounen Kwéyòl', 'Junkanoo'], y: 'went to', n: "didn't go to", c: [['either', 2, 0, 1], ['not', 0, 2], ['not', 2, 0]], sol: [0, 2, 1] },
    { t: 'Presentation order', p: ['Hari', 'Imani', 'Jalen'], i: ['first', 'second', 'third'], y: 'presents', n: "doesn't present", c: [['not', 0, 0], ['not', 0, 2], ['not', 1, 0]], sol: [1, 2, 0] },
    { t: 'Sea project', p: ['Keon', 'Lena', 'Malik'], i: ['turtles', 'coral', 'dolphins'], y: 'researched', n: "didn't research", c: [['neither', 1, 0, 1], ['either', 0, 1, 2]], sol: [2, 0, 1] },
    { t: 'Writing portfolio', p: ['Nia', 'Omar', 'Priya'], i: ['poem', 'short story', 'speech'], y: 'wrote the', n: "didn't write the", c: [['not', 1, 2], ['not', 2, 2], ['not', 2, 0]], sol: [2, 0, 1] },
    { t: 'School fair', p: ['Quincy', 'Rhea', 'Shan'], i: ['coconut drops', 'tamarind balls', 'sugar cake'], y: 'made the', n: "didn't make the", c: [['either', 2, 0, 2], ['not', 0, 2], ['not', 1, 0]], sol: [0, 1, 2] },
    { t: 'Language club', p: ['Tariq', 'Uma', 'Vaughn'], i: ['Spanish', 'French', 'Papiamento'], y: 'is learning', n: "isn't learning", c: [['neither', 1, 0, 1], ['not', 1, 0]], sol: [0, 2, 1] }
  ];
  // Who's lying: st [type, ...] d=did it, n=didn't, l=is lying, t=telling truth, o=either X or Y did it. k = number telling the truth.
  const LIARS = [
    { s: "Who ate the last tamarind ball?", p: ['Ana', 'Bryce', 'Ciara'], st: [['d', 1], ['n', 1], ['n', 2]], k: 1 },
    { s: "Who left the classroom fan on all weekend?", p: ['Dev', 'Esi', 'Femi'], st: [['d', 1], ['d', 2], ['n', 2]], k: 2 },
    { s: "Who drew a moustache on the school-play poster?", p: ['Gia', 'Hari', 'Imani'], st: [['n', 0], ['d', 2], ['d', 0]], k: 2 },
    { s: "Who borrowed the class speaker and never returned it?", p: ['Jalen', 'Keon', 'Lena', 'Malik'], st: [['d', 1], ['d', 3], ['n', 2], ['l', 1]], k: 1 },
    { s: "Who spilled sorrel on the group's poster?", p: ['Nia', 'Omar', 'Priya'], st: [['n', 0], ['d', 2], ['d', 1]], k: 0 },
    { s: "Who ate Grandma's sugar cake?", p: ['Quincy', 'Rhea', 'Shan'], st: [['o', 1, 2], ['n', 1], ['d', 0]], k: 1 },
    { s: "Who changed the class group-chat name?", p: ['Tariq', 'Uma', 'Vaughn'], st: [['d', 1], ['l', 0], ['n', 2]], k: 1 },
    { s: "Who hid the dominoes before the big game?", p: ['Wendell', 'Xavi', 'Yara', 'Zuri'], st: [['n', 0], ['d', 0], ['d', 1], ['n', 2]], k: 1 },
    { s: "Who took the front seat in the maxi taxi?", p: ['Ana', 'Bryce', 'Ciara'], st: [['t', 1], ['d', 2], ['n', 2]], k: 2 },
    { s: "Who forgot to bring the projector cable?", p: ['Dev', 'Esi', 'Femi'], st: [['d', 1], ['n', 1], ['l', 0]], k: 1 },
    { s: "Who sent the mystery birthday card?", p: ['Gia', 'Hari', 'Imani'], st: [['d', 1], ['l', 0], ['n', 2]], k: 1 },
    { s: "Who finished the last of the coconut water?", p: ['Jalen', 'Keon', 'Lena'], st: [['n', 0], ['n', 1], ['d', 0]], k: 1 },
    { s: "Who switched the playlist at the class party?", p: ['Malik', 'Nia', 'Omar', 'Priya'], st: [['d', 1], ['d', 2], ['n', 2], ['n', 3]], k: 3 },
    { s: "Who wrote 'CAPE or bust' on the whiteboard?", p: ['Quincy', 'Rhea', 'Shan'], st: [['n', 0], ['d', 0], ['l', 1]], k: 1 },
    { s: "Who used up all the printer paper?", p: ['Tariq', 'Uma', 'Vaughn'], st: [['d', 2], ['d', 0], ['l', 0]], k: 2 },
    { s: "Who let the goat into the school garden?", p: ['Wendell', 'Xavi', 'Yara'], st: [['o', 1, 2], ['d', 0], ['l', 1]], k: 1 },
    { s: "Who took the last plate of pelau?", p: ['Zuri', 'Ana', 'Bryce', 'Ciara'], st: [['d', 1], ['n', 1], ['n', 2], ['d', 0]], k: 1 }
  ];
  // Syllogisms. cat: all/no/some/somenot over terms S/M/P. prop: if/or/atoms with negation.
  const SYLS = [
    { f: 'cat', T: { A: 'calypsonians', B: 'musicians', C: 'performers' }, p: [['all', 'A', 'B'], ['all', 'B', 'C']], c: ['all', 'A', 'C'], name: 'Valid chain (Barbara)', x: "If every A sits inside B, and every B sits inside C, then every A must be inside C." },
    { f: 'cat', T: { A: 'mangoes', B: 'sweet things', C: 'sugar cakes' }, p: [['all', 'A', 'B'], ['all', 'C', 'B']], c: ['all', 'A', 'C'], name: 'Undistributed middle', x: "Mangoes and sugar cakes both belong to 'sweet things', but that does not make mangoes sugar cakes. Sharing a group is not being the same." },
    { f: 'cat', T: { A: 'reptiles', B: 'mammals', C: 'iguanas' }, p: [['no', 'A', 'B'], ['all', 'C', 'A']], c: ['no', 'C', 'B'], name: 'Valid (Celarent)', x: "Iguanas are inside 'reptiles', and 'reptiles' share nothing with 'mammals', so no iguana can be a mammal." },
    { f: 'cat', T: { A: 'CAPE students', B: 'hard workers', C: 'debaters' }, p: [['all', 'A', 'B'], ['some', 'C', 'A']], c: ['some', 'C', 'B'], name: 'Valid (Darii)', x: "The debaters who are CAPE students must also be hard workers, because every CAPE student is." },
    { f: 'cat', T: { A: 'teachers', B: 'singers', C: 'dancers' }, p: [['some', 'A', 'B'], ['some', 'B', 'C']], c: ['some', 'A', 'C'], name: 'Invalid: two "some" premises', x: "The singers who are teachers might be completely different people from the singers who are dancers." },
    { f: 'cat', T: { A: 'steelpan players', B: 'musicians', C: 'guitarists' }, p: [['all', 'A', 'B'], ['no', 'C', 'A']], c: ['no', 'C', 'B'], name: 'Invalid: illicit major term', x: "Guitarists are not steelpan players, but they can still be musicians. Being outside one subgroup does not put you outside the larger group." },
    { f: 'cat', T: { A: 'cats', B: 'birds', C: 'dogs' }, p: [['no', 'A', 'B'], ['no', 'B', 'C']], c: ['no', 'A', 'C'], name: 'Invalid: two negative premises', x: "Knowing what cats and dogs are NOT tells us nothing about how cats and dogs relate to each other. Two negative premises never give a valid conclusion." },
    { f: 'cat', T: { A: 'politicians', B: 'good speakers', C: 'radio hosts' }, p: [['all', 'A', 'B'], ['some', 'C', 'B']], c: ['some', 'C', 'A'], name: 'Invalid: undistributed middle', x: "Some radio hosts are good speakers, but they could be good speakers who are not politicians." },
    { f: 'cat', T: { A: 'reliable sources', B: 'cited sources', C: 'websites' }, p: [['all', 'A', 'B'], ['somenot', 'C', 'B']], c: ['somenot', 'C', 'A'], name: 'Valid (Baroco)', x: "Every reliable source is cited. The websites that are not cited therefore cannot be reliable sources." },
    { f: 'cat', T: { A: 'fish', B: 'mammals', C: 'sea creatures' }, p: [['no', 'A', 'B'], ['some', 'C', 'A']], c: ['somenot', 'C', 'B'], name: 'Valid (Ferio)', x: "The sea creatures that are fish cannot be mammals, so at least some sea creatures are not mammals." },
    { f: 'cat', T: { A: 'islands', B: 'places surrounded by water', C: 'cities' }, p: [['all', 'A', 'B'], ['all', 'C', 'A']], c: ['all', 'C', 'B'], name: 'Valid, but check the premises', x: "The structure is valid (a chain). But the second premise is FALSE: not all cities are islands. A valid argument can still be unsound. In Paper 1, judge both the logic and the truth of the claims." },
    { f: 'prop', V: { P: ['it rains', 'it does not rain'], Q: ['the match is postponed', 'the match is not postponed'] }, p: [['if', 'P', 'Q'], ['P']], c: ['Q'], name: 'Valid (modus ponens)', x: "The 'if' condition happened, so the result must follow." },
    { f: 'prop', V: { P: ['you study every day', "you don't study every day"], Q: ['you get a Grade One', "you don't get a Grade One"] }, p: [['if', 'P', 'Q'], ['Q']], c: ['P'], name: 'Invalid: affirming the consequent', x: "There may be other routes to a Grade One. The result happening does not prove that this particular cause happened." },
    { f: 'prop', V: { P: ['the power is on', 'the power is not on'], Q: ['the fan is spinning', 'the fan is not spinning'] }, p: [['if', 'P', 'Q'], ['!Q']], c: ['!P'], name: 'Valid (modus tollens)', x: "If the power being on always makes the fan spin, and the fan is not spinning, the power cannot be on." },
    { f: 'prop', V: { P: ['you live in Kingston', "you don't live in Kingston"], Q: ['you live in Jamaica', "you don't live in Jamaica"] }, p: [['if', 'P', 'Q'], ['!P']], c: ['!Q'], name: 'Invalid: denying the antecedent', x: "You could live in Montego Bay: not in Kingston, but still in Jamaica." },
    { f: 'prop', V: { P: ['the essay is late', 'the essay is not late'], Q: ['the essay is incomplete', 'the essay is not incomplete'] }, p: [['or', 'P', 'Q'], ['!P']], c: ['Q'], name: 'Valid (disjunctive syllogism)', x: "One of the two options must be true. One is ruled out, so it has to be the other." },
    { f: 'prop', V: { P: ['you plan your essay', "you don't plan your essay"], Q: ['your ideas are organised', "your ideas aren't organised"], R: ['you score higher', "you don't score higher"] }, p: [['if', 'P', 'Q'], ['if', 'Q', 'R']], c: ['if', 'P', 'R'], name: 'Valid (hypothetical syllogism)', x: "The conditions link like a chain: P leads to Q, and Q leads to R, so P leads to R." },
    { f: 'prop', V: { P: ['Kezia plays netball', "Kezia doesn't play netball"], Q: ['Kezia plays cricket', "Kezia doesn't play cricket"] }, p: [['or', 'P', 'Q'], ['P']], c: ['!Q'], name: 'Invalid: affirming a disjunct', x: "'Or' can include both. Kezia could play netball AND cricket." }
  ];
  const PAIRS = [
    ['Register', 'The level of formality chosen for a situation'], ['Dialect', 'A variety of a language tied to a region or social group'], ['Creole', "A contact language that became a community's first language"],
    ['Pidgin', 'A simplified contact language with no native speakers'], ['Kinesics', 'Communicating through gestures and body movement'], ['Proxemics', 'How we use space and distance when communicating'],
    ['Channel', 'The medium a message travels through'], ['Feedback', "The receiver's response to a message"], ['Noise', 'Anything that interferes with a message'],
    ['Bias', 'A one-sided slant in how information is presented'], ['Primary source', 'First-hand evidence from the time or event'], ['Plagiarism', "Presenting someone else's work as your own"],
    ['Connotation', 'The feelings or associations a word suggests'], ['Denotation', 'The literal dictionary meaning of a word'], ['Code-switching', 'Moving between languages or varieties in one conversation'],
    ['Jargon', 'Specialised vocabulary of a profession or group'], ['Paralanguage', 'Vocal features such as tone, pitch and pace']
  ];
  const COLOURS = [['red', 'Red', '#FF6B6B', 'r'], ['blue', 'Blue', '#6FB1FF', 'b'], ['green', 'Green', '#4FD18B', 'g'], ['yellow', 'Yellow', '#FFD766', 'y']];
  const PADS = [['Gold', 523.25, '▲'], ['Teal', 659.25, '●'], ['Coral', 783.99, '■'], ['Blue', 880.0, '◆']];

  /* ============================== HELPERS ============================== */
  let API = null;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’‘`]/g, "'").trim().replace(/^(the|a|an|your|my)\s+/, '').replace(/[^a-z0-9]/g, '');
  const match = (val, acc) => { const v = norm(val); if (!v) return false; return acc.some(a => { const n = norm(a); return v === n || v === n + 's' || v + 's' === n || v === n + 'es'; }); };
  const shuf = (a, rng) => { a = a.slice(); const r = rng || Math.random; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const NUMW = ['none', 'one', 'two', 'three', 'four'];
  function B() { const S = API.S; if (!S.brain || typeof S.brain !== 'object') S.brain = {}; return S.brain; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function prevDay(k) { const d = new Date(Math.floor(k / 10000), Math.floor(k / 100) % 100 - 1, k % 100); d.setDate(d.getDate() - 1); return dayKey(d); }
  function scramble(w, rng) { const L = w.toUpperCase().split(''); let s, n = 0; do { s = shuf(L, rng).join(''); n++; } while (s === w.toUpperCase() && n < 50); return s; }

  // ---- syllogism text + validity ----
  function catText(s, T) { const [f, a, b] = s; return f === 'all' ? `All ${T[a]} are ${T[b]}.` : f === 'no' ? `No ${T[a]} are ${T[b]}.` : f === 'some' ? `Some ${T[a]} are ${T[b]}.` : `Some ${T[a]} are not ${T[b]}.`; }
  function propAtom(a, V) { const neg = a[0] === '!'; return V[neg ? a.slice(1) : a][neg ? 1 : 0]; }
  function propText(s, V) { if (s[0] === 'if') return `If ${propAtom(s[1], V)}, then ${propAtom(s[2], V)}.`; if (s[0] === 'or') return `Either ${propAtom(s[1], V)} or ${propAtom(s[2], V)}.`; return cap(propAtom(s[0], V)) + '.'; }
  function sylLines(y) { const t = y.f === 'cat' ? s => catText(s, y.T) : s => propText(s, y.V); return { p: y.p.map(t), c: 'Therefore, ' + (s => /^(All|No|Some|If|Either|It|You|Your|The)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s)(t(y.c)) }; }
  function catHolds(s, regs) { // regs: Set of occupied region bitmasks (bit0=A, bit1=B, bit2=C)
    const bit = { A: 1, B: 2, C: 4 }, [f, a, b] = s, A = bit[a], Bb = bit[b];
    const ab = [...regs].filter(r => (r & A) && (r & Bb)).length, anb = [...regs].filter(r => (r & A) && !(r & Bb)).length;
    return f === 'all' ? anb === 0 : f === 'no' ? ab === 0 : f === 'some' ? ab > 0 : anb > 0;
  }
  function propHolds(s, v) { const at = a => a[0] === '!' ? !v[a.slice(1)] : !!v[a]; if (s[0] === 'if') return !at(s[1]) || at(s[2]); if (s[0] === 'or') return at(s[1]) || at(s[2]); return at(s[0]); }
  function sylValid(y) {
    if (y.f === 'cat') { for (let m = 0; m < 256; m++) { const regs = new Set(); for (let r = 0; r < 8; r++) if (m & (1 << r)) regs.add(r); if (y.p.every(s => catHolds(s, regs)) && !catHolds(y.c, regs)) return false; } return true; }
    const vars = Object.keys(y.V); for (let m = 0; m < (1 << vars.length); m++) { const v = {}; vars.forEach((k, i) => v[k] = !!(m & (1 << i))); if (y.p.every(s => propHolds(s, v)) && !propHolds(y.c, v)) return false; } return true;
  }
  // ---- liar solver ----
  function liarSolve(L) {
    const n = L.p.length, sols = [];
    for (let c = 0; c < n; c++) for (let m = 0; m < (1 << n); m++) {
      const tv = i => !!(m & (1 << i));
      const ev = s => s[0] === 'd' ? c === s[1] : s[0] === 'n' ? c !== s[1] : s[0] === 'l' ? !tv(s[1]) : s[0] === 't' ? tv(s[1]) : (c === s[1] || c === s[2]);
      let ok = true, cnt = 0; for (let i = 0; i < n; i++) { const e = ev(L.st[i]); if (e !== tv(i)) { ok = false; break; } if (e) cnt++; }
      if (ok && cnt === L.k) sols.push({ c, m });
    }
    return sols;
  }
  function liarSay(s, i, p) { const me = j => j === i; if (s[0] === 'd') return me(s[1]) ? 'I did it.' : `${p[s[1]]} did it.`; if (s[0] === 'n') return me(s[1]) ? "I didn't do it." : `${p[s[1]]} didn't do it.`; if (s[0] === 'l') return `${p[s[1]]} is lying.`; if (s[0] === 't') return `${p[s[1]]} is telling the truth.`; return `It was either ${p[s[1]]} or ${p[s[2]]}.`; }
  function liarRule(L) { const n = L.p.length, k = L.k; if (k === 0) return 'All of them are lying.'; if (k === 1) return 'Only one of them is telling the truth.'; if (k === n - 1) return 'Only one of them is lying.'; return `Exactly ${NUMW[k]} of them are telling the truth.`; }
  // ---- grid solver ----
  function gridOk(G, perm) { return G.c.every(c => c[0] === 'is' ? perm[c[1]] === c[2] : c[0] === 'not' ? perm[c[1]] !== c[2] : c[0] === 'either' ? (perm[c[2]] === c[1] || perm[c[3]] === c[1]) : (perm[c[2]] !== c[1] && perm[c[3]] !== c[1])); }
  function gridSolve(G) { const out = []; const P = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]; P.forEach(p => { if (gridOk(G, p)) out.push(p); }); return out; }
  function clueText(G, c) { const i = x => G.i[x]; if (c[0] === 'is') return `${G.p[c[1]]} ${G.y} ${i(c[2])}.`; if (c[0] === 'not') return `${G.p[c[1]]} ${G.n} ${i(c[2])}.`; if (c[0] === 'either') return `Either ${G.p[c[2]]} or ${G.p[c[3]]} ${G.y} ${i(c[1])}.`; return `Neither ${G.p[c[2]]} nor ${G.p[c[3]]} ${G.y} ${i(c[1])}.`; }

  /* ---- item builders (generic question cards) ---- */
  const TIERN = { e: 'Easy', m: 'Medium', h: 'Hard' };
  function riddleItem(r, i) { return { id: 'r' + i, kind: 'type', tag: TIERN[r[0]], tier: r[0], q: esc(r[1]), acc: r[2], show: r[2][0], hints: r[3], x: r[4] ? esc(r[4]) : '', c: { e: 2, m: 3, h: 4 }[r[0]] }; }
  function anaItem(a, i, rng) { const s = scramble(a[0], rng); return { id: 'a' + i, kind: 'type', tag: 'Anagram', q: `<span class="bg-sr">Letters: ${esc(s.split('').join(' '))}. </span><span class="bg-letters" aria-hidden="true">${s.split('').map(ch => `<span>${esc(ch)}</span>`).join('')}</span><small>Clue: ${esc(a[1])}</small>`, acc: [a[0]], show: a[0], hints: [`It starts with “${a[0][0].toUpperCase()}”.`, `It has ${a[0].length} letters and ends in “${a[0].slice(-2)}”.`], x: `<b>${esc(a[0])}</b>: ${esc(a[1])}.`, c: 1 }; }
  function missItem(m, i) { const blanks = (m[0].match(/_/g) || []).length; return { id: 'g' + i, kind: 'type', tag: 'Missing letters', q: `<span class="bg-gap" aria-label="${esc(m[0].replace(/_/g, ' blank '))}">${esc(m[0].replace(/_/g, '▢'))}</span><small>Type the whole word, spelled correctly. ${blanks} letter${blanks > 1 ? 's' : ''} missing.</small>`, acc: [m[1]], strict: true, show: m[1], hints: [m[2]], x: `<b>${esc(m[1])}</b>. Memory trick: ${esc(m[2])}`, c: 1 }; }
  function homItem(h, i, rng) { return { id: 'h' + i, kind: 'mc', tag: 'Sound-alikes', q: esc(h[0]).replace('___', '<b>_____</b>'), opts: shuf([h[1]].concat(h[2]), rng), ans: h[1], x: `“${esc(h[0].replace('___', h[1]))}”`, c: 1 }; }
  function idiomItem(d, i, rng) { return { id: 'i' + i, kind: 'mc', tag: d[4] === 'English idiom' ? 'Idiom' : 'Caribbean proverb', q: esc(d[0]).replace('___', '<b>_____</b>') + `<small>${esc(d[4])}</small>`, opts: shuf([d[1]].concat(d[2]), rng), ans: d[1], x: `<b>“${esc(d[0].replace('___', d[1]))}”</b><br>Meaning: ${esc(d[3])}`, c: 1 }; }
  function rebusItem(r, i, rng) { return { id: 'e' + i, kind: 'mc', tag: 'Picture talk', q: `<span class="bg-emoji" role="img" aria-label="Emoji clue">${r[0]}</span><small>Which word or phrase do the pictures make?</small>`, opts: shuf([r[1]].concat(r[2]), rng), ans: r[1], x: `${r[0]} = <b>${esc(r[1])}</b> (${esc(r[3])})`, c: 1 }; }
  function oddItem(o, i, rng) { return { id: 'o' + i, kind: 'mc', tag: 'Odd one out', q: 'Which one does not belong?', opts: shuf(o[0], rng), ans: o[1], x: `<b>${esc(o[1])}</b>. ${esc(o[2])}`, c: 1 }; }
  function seqItem(s, i) { return { id: 's' + i, kind: 'type', tag: 'Pattern hunt', q: `<span class="bg-gap">${esc(s[0])}</span><small>What comes next?</small>`, acc: s[1], show: s[1][0].toUpperCase(), hints: [s[3]], x: esc(s[2]), c: 2 }; }
  function sylItem(y, i) { const L = sylLines(y), v = sylValid(y); return { id: 'y' + i, kind: 'mc', tag: 'Argument court', q: `<div class="bg-prem">${L.p.map(esc).join('<br>')}<span class="bg-conc">${esc(L.c)}</span></div><small>Does the conclusion follow logically from the premises? (Judge the logic, not whether the statements are true.)</small>`, opts: ['Valid', 'Invalid'], fixed: true, ans: v ? 'Valid' : 'Invalid', x: `<b>${esc(y.name)}.</b> ${esc(y.x)}`, c: 2 }; }
  function liarItem(L, i) {
    const sol = liarSolve(L)[0], c = sol.c, tv = j => !!(sol.m & (1 << j));
    const says = `<ul class="bg-says">${L.p.map((p, j) => `<li><span class="bg-av" aria-hidden="true">${esc(p[0])}</span><span><b>${esc(p)}:</b> “${esc(liarSay(L.st[j], j, L.p))}”</span></li>`).join('')}</ul>`;
    const why = `Test each suspect. If <b>${esc(L.p[c])}</b> did it: ${L.p.map((p, j) => `${esc(p)} is ${tv(j) ? '<b>telling the truth</b>' : 'lying'}`).join('; ')}. That makes ${L.k === 0 ? 'no true statements at all' : `exactly ${NUMW[L.k]} true statement${L.k === 1 ? '' : 's'}`}, matching the rule. Every other suspect gives the wrong number.`;
    return { id: 'l' + i, kind: 'mc', tag: "Who's lying?", q: `${esc(L.s)} <small>${L.p.length === 4 ? 'Four' : 'Three'} suspects, exactly one did it. <b>${esc(liarRule(L))}</b> Who did it?</small>${says}`, opts: L.p.slice(), fixed: true, ans: L.p[c], x: why, c: 2 };
  }

  /* ============================== DECK ENGINE ============================== */
  const DECKS = {}, GOT = new Set();
  let FOCUS = null, rStreak = 0;
  const fresh = () => ({ tries: 0, hints: 0, done: null, pick: null, msg: '', last: '' });
  function deck(key) {
    if (DECKS[key]) return DECKS[key];
    const R = Math.random; let items;
    const [g, sub] = key.split(':');
    if (g === 'riddle') items = RIDDLES.map(riddleItem).filter(it => !sub || sub === 'all' || it.tier === sub);
    else if (key === 'w:anagram') items = ANAGRAMS.map((a, i) => anaItem(a, i, R));
    else if (key === 'w:missing') items = MISSING.map(missItem);
    else if (key === 'w:homophone') items = HOMOPHONES.map((h, i) => homItem(h, i, R));
    else if (key === 'w:idiom') items = IDIOMS.map((d, i) => idiomItem(d, i, R));
    else if (key === 'w:rebus') items = REBUS.map((r, i) => rebusItem(r, i, R));
    else if (key === 'w:odd') items = ODD.map((o, i) => oddItem(o, i, R));
    else if (key === 'l:seq') items = SEQS.map(seqItem);
    else if (key === 'l:syl') items = SYLS.map(sylItem);
    else if (key === 'l:liar') items = LIARS.map(liarItem);
    items = items || [];
    return (DECKS[key] = { items, order: shuf(items.map((_, i) => i)), i: 0, st: fresh(), right: 0, seen: 0 });
  }
  const curItem = D => D.items[D.order[D.i % D.order.length]];

  function cardHTML(key, D, opt) {
    opt = opt || {};
    const it = opt.item || curItem(D), s = D.st, done = !!s.done, n = D.items.length;
    let h = `<div class="bg-head"><span class="kicker">${esc(opt.label || it.tag)}${opt.item ? '' : ` · ${D.i % n + 1} of ${n}`}</span><span>${it.tier ? `<span class="bg-tier ${it.tier}">${TIERN[it.tier]}</span> ` : ''}${opt.streak != null ? `<span class="bg-fire" aria-label="Streak ${opt.streak}">🔥 ${opt.streak}</span>` : opt.item ? '' : `<span class="hint">Score ${D.right}/${D.seen}</span>`}</span></div>`;
    h += `<div class="bg-q" id="bg-q">${it.q}</div>`;
    if (it.kind === 'type') {
      if (!done) h += `<div class="bg-ans"><label class="bg-sr" for="bg-in">Your answer</label><input id="bg-in" class="search" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(s.last)}" placeholder="Type your answer…" data-key="${esc(key)}"><button type="button" class="btn go" data-px="chk" data-v="${esc(key)}">Check</button></div>`;
      if (s.hints) h += `<ol class="bg-hints">${it.hints.slice(0, s.hints).map(x => `<li class="hint">💡 ${esc(x)}</li>`).join('')}</ol>`;
      if (!done) h += `<div class="bg-nav">${s.hints < it.hints.length ? `<button type="button" class="btn ghost" data-px="hint" data-v="${esc(key)}">💡 Hint ${s.hints + 1} of ${it.hints.length}</button>` : `<button type="button" class="btn ghost" data-px="reveal" data-v="${esc(key)}">👀 Reveal answer</button>`}${opt.item ? '' : `<button type="button" class="btn ghost" data-px="next" data-v="${esc(key)}">Skip →</button>`}</div>`;
    } else {
      h += `<div class="bg-opts" role="group" aria-label="Answer options">${it.opts.map((o, j) => { const cls = done ? (o === it.ans ? 'right' : o === s.pick ? 'wrong' : '') : ''; return `<button type="button" class="opt ${cls}" data-px="mc" data-v="${esc(key)}" data-i="${j}" ${done ? 'aria-disabled="true"' : ''}>${done && o === it.ans ? '✓ ' : done && o === s.pick ? '✗ ' : ''}${esc(o)}</button>`; }).join('')}</div>`;
    }
    if (s.msg) h += `<p class="fb ${s.done === 'solved' ? 'good' : s.done ? 'note' : 'bad'}" role="status">${s.msg}</p>`;
    if (done) {
      if (it.kind === 'type' && s.done !== 'solved') h += `<p class="fb note">Answer: <b>${esc(it.show)}</b></p>`;
      if (it.x) h += `<div class="bg-x">${it.x}</div>`;
      if (!opt.item) h += `<div class="bg-nav"><button type="button" class="btn go" data-px="next" data-v="${esc(key)}" data-focus>Next →</button></div>`;
    }
    return h;
  }

  function finish(key, D, it, solved) {
    D.seen++; if (solved) D.right++;
    if (key.startsWith('riddle')) {
      if (solved) { rStreak++; const b = B(); if (rStreak > (b.rb || 0)) { b.rb = rStreak; API.save(); } }
      else rStreak = 0;
    }
    if (key === 'daily') dailyDone(it, solved);
  }
  function award(key, it, solved, D) {
    if (!solved || GOT.has(it.id + key)) return;
    GOT.add(it.id + key);
    if (key === 'daily') return; // daily rewards handled in dailyDone
    let n = it.c - (D.st.hints || 0); if (n < 1) n = 1;
    API.reward(n, key.startsWith('riddle') ? '🦉 Riddle solved' : '🧩 Nice thinking');
    if (key.startsWith('riddle') && rStreak > 0 && rStreak % 5 === 0) setTimeout(() => API.reward(3, `🔥 ${rStreak}-riddle streak!`), 500);
  }
  function getDeck(key) { return key === 'daily' ? dailyDeck() : deck(key); }
  function deckClick(action, el) {
    const key = el.dataset.v, D = getDeck(key), it = key === 'daily' ? D.item : curItem(D), s = D.st;
    if (action === 'chk') {
      if (s.done) return;
      const inp = document.getElementById('bg-in'), val = inp ? inp.value : '';
      s.last = val;
      if (!norm(val)) { s.msg = 'Type an answer first.'; FOCUS = '#bg-in'; return API.render(); }
      const ok = it.strict ? norm(val) === norm(it.acc[0]) : match(val, it.acc);
      if (ok) { s.done = 'solved'; s.msg = ['Correct!', 'Brilliant!', 'Nailed it!', 'Yes! Well reasoned.', 'Spot on!'][Math.floor(Math.random() * 5)] + ` The answer is <b>${esc(it.show)}</b>.`; finish(key, D, it, true); award(key, it, true, D); FOCUS = '[data-focus]'; }
      else { s.tries++; s.msg = `Not quite${s.tries > 1 ? ` (try ${s.tries})` : ''}. ${s.hints < (it.hints || []).length ? 'Take a hint or try again.' : 'Try again or reveal the answer.'}`; API.chime('bad'); FOCUS = '#bg-in'; }
      return API.render();
    }
    if (action === 'hint') { if (s.done || s.hints >= it.hints.length) return; s.hints++; s.msg = ''; FOCUS = s.hints < it.hints.length ? '[data-px="hint"]' : '[data-px="reveal"]'; return API.render(); }
    if (action === 'reveal') { if (s.done || s.hints < it.hints.length) return; s.done = 'revealed'; s.msg = 'Revealed. No coins this time, but now you know it for next time.'; finish(key, D, it, false); FOCUS = '[data-focus]'; return API.render(); }
    if (action === 'mc') {
      if (s.done) return; const pick = it.opts[+el.dataset.i]; s.pick = pick;
      const ok = pick === it.ans; s.done = ok ? 'solved' : 'missed';
      s.msg = ok ? 'Correct!' : `Not this time. The answer is <b>${esc(it.ans)}</b>.`;
      if (!ok) API.chime('bad');
      finish(key, D, it, ok); award(key, it, ok, D); FOCUS = '[data-focus]'; return API.render();
    }
    if (action === 'next') {
      if (key === 'daily') return;
      if (!s.done && key.startsWith('riddle')) rStreak = 0;
      D.i++; if (D.i >= D.order.length) { D.i = 0; D.order = shuf(D.order); }
      D.st = fresh(); FOCUS = '#bg-in, .bg-opts .opt'; return API.render();
    }
  }

  /* ============================== DAILY ============================== */
  let DAILY = null;
  function dailyPick(k) {
    const rng = API.seeded(k * 7 + 13); for (let i = 0; i < 5; i++) rng();
    const pools = [
      () => RIDDLES.map(riddleItem), () => SEQS.map(seqItem), () => IDIOMS.map((d, i) => idiomItem(d, i, rng)), () => LIARS.map(liarItem),
      () => SYLS.map(sylItem), () => ANAGRAMS.map((a, i) => anaItem(a, i, rng)), () => REBUS.map((r, i) => rebusItem(r, i, rng)),
      () => HOMOPHONES.map((h, i) => homItem(h, i, rng)), () => ODD.map((o, i) => oddItem(o, i, rng)), () => RIDDLES.map(riddleItem)
    ];
    const pool = pools[Math.floor(rng() * pools.length)]();
    const it = pool[Math.floor(rng() * pool.length)];
    return Object.assign({}, it, { id: 'daily' + k }, it.tier ? { tag: 'Riddle' } : {});
  }
  function dailyDeck() { const k = dayKey(); if (!DAILY || DAILY.k !== k) { DAILY = { k, item: dailyPick(k), st: fresh(), right: 0, seen: 0, items: [] }; DAILY.items = [DAILY.item]; DAILY.order = [0]; DAILY.i = 0; const b = B(); if (b.dd === k) { DAILY.st.done = b.dw ? 'solved' : 'revealed'; DAILY.st.msg = b.dw ? 'You solved today’s teaser.' : 'You finished today’s teaser.'; } } return DAILY; }
  function dailyDone(it, solved) {
    const b = B(), k = DAILY.k; if (b.dd === k) return;
    b.ds = b.dd === prevDay(k) ? (b.ds || 0) + 1 : 1; b.dd = k; b.dw = solved ? 1 : 0; if (b.ds > (b.db || 0)) b.db = b.ds;
    b.dh = ((b.dh || []).concat([k])).slice(-7);
    API.save();
    if (solved) { const bonus = b.ds >= 7 ? 3 : b.ds >= 3 ? 1 : 0; API.reward(5 + bonus, `📅 Daily teaser solved (day ${b.ds})`); }
    else API.toast(`📅 Daily streak: ${b.ds} day${b.ds === 1 ? '' : 's'}. Come back tomorrow!`);
  }

  /* ============================== LATERAL ============================== */
  const LAT = { i: 0, asked: new Set(), pick: null, rev: false, order: null };
  function latOpts(i) { if (!LAT.order || LAT.order.i !== i) LAT.order = { i, o: shuf([0, 1, 2]) }; return LAT.order.o; }
  function lateralHTML() {
    const n = LATERAL.length, L = LATERAL[LAT.i], sk = SKILLS[L.k], ord = latOpts(LAT.i);
    let h = `<div class="card"><div class="bg-head"><span class="kicker">Lateral Leap · Puzzle ${LAT.i + 1} of ${n}</span><span class="hint">Questions asked: ${LAT.asked.size}</span></div>
      <h2>${esc(L.t)}</h2><div class="bg-lat"><div><p class="bg-story">${esc(L.s)}</p>
      <p class="hint">Ask yes/no questions to narrow it down. The fewer you need, the sharper your inference.</p></div>
      <div><h3>Ask a question</h3><div class="bg-qlist">${L.q.map((q, j) => { const a = LAT.asked.has(j); return `<button type="button" class="bg-qbtn ${a ? 'asked' : ''}" data-px="lask" data-v="${j}" aria-pressed="${a}"><span>${esc(q[0])}${a && q[2] ? `<span class="bg-qnote">${esc(q[2])}</span>` : ''}</span>${a ? `<span class="bg-yn ${q[1]}">${q[1] === 'Y' ? 'Yes' : q[1] === 'N' ? 'No' : "Doesn't matter"}</span>` : '<span class="bg-yn I">Ask</span>'}</button>`; }).join('')}</div></div></div>`;
    h += `<h3>What's your explanation?</h3><div class="bg-opts">${ord.map(k => { const done = LAT.pick != null; const cls = done ? (k === 0 ? 'right' : k === LAT.pick ? 'wrong' : '') : ''; return `<button type="button" class="opt ${cls}" data-px="lpick" data-v="${k}" ${done ? 'aria-disabled="true"' : ''}>${esc(L.o[k])}</button>`; }).join('')}</div>`;
    if (LAT.pick != null || LAT.rev) {
      h += LAT.pick === 0 ? `<p class="fb good" role="status">You leapt to it!</p>` : LAT.pick != null ? `<p class="fb bad" role="status">Not quite. Here's the twist.</p>` : `<p class="fb note" role="status">Here's the twist.</p>`;
      h += `<div class="bg-x"><b>Solution:</b> ${esc(L.o[0])}<br><b>The trap:</b> ${esc(L.trap)}</div>
        <div class="bg-skill"><span class="bg-big" aria-hidden="true">${sk[0]}</span><div><b>Thinking skill: ${esc(sk[1])}.</b> ${esc(sk[2])}<br><span class="hint"><b>Comm Studies link:</b> closed (yes/no) questions narrow possibilities fast; open questions gather detail. Interviewers and researchers use both (Module 1 data collection). Solving this puzzle is <b>inference</b>: evidence + prior knowledge → conclusion. Unchecked assumptions are what make inferences go wrong, in Paper 1 comprehension and when you judge a source.</span></div></div>`;
    } else h += `<div class="bg-nav"><button type="button" class="btn ghost" data-px="lrev">👀 Just show me the twist</button></div>`;
    h += `<div class="bg-nav"><button type="button" class="btn ghost" data-px="lnav" data-v="-1">← Previous</button><button type="button" class="btn ghost" data-px="lnav" data-v="r">🎲 Random</button><button type="button" class="btn go" data-px="lnav" data-v="1" ${LAT.pick != null || LAT.rev ? 'data-focus' : ''}>Next puzzle →</button></div></div>`;
    return h;
  }
  function lateralClick(a, el) {
    if (a === 'lask') { LAT.asked.add(+el.dataset.v); FOCUS = `[data-px="lask"][data-v="${el.dataset.v}"]`; return API.render(); }
    if (a === 'lrev') { LAT.rev = true; FOCUS = '[data-focus]'; return API.render(); }
    if (a === 'lpick') {
      if (LAT.pick != null) return; LAT.pick = +el.dataset.v;
      if (LAT.pick === 0) { const id = 'lat' + LAT.i; if (!GOT.has(id) && !LAT.rev) { GOT.add(id); API.reward(LAT.asked.size <= 3 ? 4 : 3, '🐸 Lateral leap'); } }
      else API.chime('bad');
      FOCUS = '[data-focus]'; return API.render();
    }
    if (a === 'lnav') {
      const v = el.dataset.v, n = LATERAL.length;
      LAT.i = v === 'r' ? (LAT.i + 1 + Math.floor(Math.random() * (n - 1))) % n : (LAT.i + (+v) + n) % n;
      LAT.asked = new Set(); LAT.pick = null; LAT.rev = false; FOCUS = '[data-px="lask"]'; return API.render();
    }
  }

  /* ============================== LOGIC GRID ============================== */
  const GR = { i: 0, cells: Array(9).fill(0), msg: '', ok: null, shown: false };
  function gridHTML() {
    const G = GRIDS[GR.i], n = GRIDS.length, mark = ['', '✗', '✓'], nm = ['blank', 'ruled out', 'match'];
    let h = `<div class="card"><div class="bg-head"><span class="kicker">Grid Detective · Puzzle ${GR.i + 1} of ${n}</span><span class="hint">Tap a square: blank → ✗ → ✓</span></div><h2>${esc(G.t)}</h2>
      <p>Each person matches exactly one option. Use the clues:</p><ol class="bg-clues">${G.c.map(c => `<li>${esc(clueText(G, c))}</li>`).join('')}</ol>
      <div class="bg-lgwrap"><table class="bg-lg"><caption class="bg-sr">Logic grid: people in rows, options in columns</caption><thead><tr><td></td>${G.i.map(x => `<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>`;
    G.p.forEach((p, r) => { h += `<tr><th scope="row">${esc(p)}</th>${G.i.map((x, c) => { const v = GR.cells[r * 3 + c]; return `<td><button type="button" class="bg-cell ${v === 1 ? 'x' : v === 2 ? 'y' : ''}" data-px="gcell" data-v="${r * 3 + c}" aria-label="${esc(p)} and ${esc(x)}: ${nm[v]}">${mark[v]}</button></td>`; }).join('')}</tr>`; });
    h += `</tbody></table></div>`;
    if (GR.msg) h += `<p class="fb ${GR.ok ? 'good' : GR.shown ? 'note' : 'bad'}" role="status">${GR.msg}</p>`;
    if (GR.ok || GR.shown) h += `<div class="bg-x"><b>Solution:</b> ${G.p.map((p, r) => `${esc(p)} → ${esc(G.i[G.sol[r]])}`).join(' · ')}<br><span class="hint">Logic grids train deduction: you rule out what the evidence forbids until only one possibility is left. The same move powers good argument evaluation.</span></div>`;
    h += `<div class="bg-nav">${GR.ok || GR.shown ? '' : `<button type="button" class="btn go" data-px="gcheck">Check grid</button><button type="button" class="btn ghost" data-px="gclear">Clear</button><button type="button" class="btn ghost" data-px="gshow">Show solution</button>`}<button type="button" class="btn ${GR.ok || GR.shown ? 'go' : 'ghost'}" data-px="gnext" ${GR.ok || GR.shown ? 'data-focus' : ''}>Next grid →</button></div></div>`;
    return h;
  }
  function gridClick(a, el) {
    const G = GRIDS[GR.i];
    if (a === 'gcell') {
      if (GR.ok || GR.shown) return; const k = +el.dataset.v, v = (GR.cells[k] + 1) % 3; GR.cells[k] = v; GR.msg = '';
      if (v === 2) { const r = Math.floor(k / 3), c = k % 3; for (let j = 0; j < 3; j++) { if (r * 3 + j !== k && GR.cells[r * 3 + j] === 0) GR.cells[r * 3 + j] = 1; if (j * 3 + c !== k && GR.cells[j * 3 + c] === 0) GR.cells[j * 3 + c] = 1; } }
      FOCUS = `[data-px="gcell"][data-v="${k}"]`; return API.render();
    }
    if (a === 'gclear') { GR.cells = Array(9).fill(0); GR.msg = ''; FOCUS = '[data-px="gcell"]'; return API.render(); }
    if (a === 'gcheck') {
      const ticks = [0, 1, 2].map(r => [0, 1, 2].filter(c => GR.cells[r * 3 + c] === 2));
      const wrong = ticks.some((t, r) => t.some(c => c !== G.sol[r]));
      if (wrong) { GR.msg = 'Not yet: at least one ✓ breaks a clue. Re-read the clues and test each one.'; GR.ok = false; API.chime('bad'); }
      else if (ticks.some(t => t.length !== 1)) { GR.msg = 'So far so good! Put exactly one ✓ in every row.'; GR.ok = false; }
      else { GR.ok = true; GR.msg = 'Case closed! Every clue fits.'; if (!GOT.has('grid' + GR.i)) { GOT.add('grid' + GR.i); API.reward(3, '🕵️ Grid solved'); } }
      FOCUS = GR.ok ? '[data-focus]' : '[data-px="gcheck"]'; return API.render();
    }
    if (a === 'gshow') { GR.shown = true; GR.msg = 'Here is the solution. Check each clue against it.'; GR.cells = [0, 1, 2].flatMap(r => [0, 1, 2].map(c => c === G.sol[r] ? 2 : 1)); FOCUS = '[data-focus]'; return API.render(); }
    if (a === 'gnext') { GR.i = (GR.i + 1) % GRIDS.length; GR.cells = Array(9).fill(0); GR.msg = ''; GR.ok = null; GR.shown = false; FOCUS = '[data-px="gcell"]'; return API.render(); }
  }

  /* ============================== MEMORY & FOCUS ============================== */
  let TICK = null;
  function tickStart() { if (TICK) return; TICK = setInterval(tick, 250); }
  function tickStop() { if (TICK) { clearInterval(TICK); TICK = null; } }
  function inView(tab) { const L = API && API.S.loc; return L && L.v === 'brain' && (L.tab || 'riddle') === 'memory' && (L.k || 'match') === tab; }
  function tick() {
    const now = Date.now(); let any = false;
    if (MT.on && !MT.end) { any = true; const el = document.getElementById('bg-mclock'); if (el) el.textContent = fmt(now - MT.t0); }
    if (SC.on) { any = true; const left = Math.max(0, SC.end - now), el = document.getElementById('bg-sclock'); if (el) el.textContent = (left / 1000).toFixed(0) + 's'; if (left <= 0) { stroopEnd(); } }
    if (EC.phase === 'input' && EC.deadline && now > EC.deadline) { echoOver('⏱ Too slow! You have 5 seconds for each tap.'); }
    if (EC.phase === 'input') any = true;
    if (!any) tickStop();
  }
  const fmt = ms => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

  // --- Flip & Match ---
  const MT = { cards: [], open: [], moves: 0, t0: 0, end: 0, on: false, lock: false };
  function matchNew() { const pick = shuf(PAIRS).slice(0, 6); MT.cards = shuf(pick.flatMap((p, i) => [{ k: i, t: 'term', s: p[0] }, { k: i, t: 'def', s: p[1] }])).map(c => Object.assign(c, { up: false, done: false })); MT.open = []; MT.moves = 0; MT.t0 = 0; MT.end = 0; MT.on = false; MT.lock = false; }
  function matchHTML() {
    if (!MT.cards.length) matchNew();
    const pairs = MT.cards.filter(c => c.done).length / 2, b = B();
    let h = `<div class="card"><div class="bg-bar"><div><span class="kicker">Flip &amp; Match</span><h2 style="margin:0">Match each term to its meaning</h2></div><div class="row"><span class="bg-clock" id="bg-mclock" aria-label="Time">${fmt(MT.end ? MT.end - MT.t0 : MT.on ? Date.now() - MT.t0 : 0)}</span><span class="bg-stat">Moves <b>${MT.moves}</b></span><span class="bg-stat">Pairs <b>${pairs}/6</b></span></div></div>
      <p class="hint">Flip two cards at a time. Terms are in bold; definitions are plain text.${b.mb ? ` Your best: ${fmt(b.mb * 1000)}.` : ''}</p>
      <div class="bg-cards">${MT.cards.map((c, i) => { const vis = c.up || c.done; return `<button type="button" class="bg-card ${vis ? 'up' : 'down'} ${vis && c.t === 'term' ? 'term' : ''} ${c.done ? 'done' : ''}" data-px="mflip" data-v="${i}" aria-label="${vis ? (c.t === 'term' ? 'Term: ' : 'Definition: ') + esc(c.s) + (c.done ? ', matched' : '') : 'Card ' + (i + 1) + ', face down'}">${vis ? `<span class="bg-tag" aria-hidden="true">${c.t === 'term' ? 'Term' : 'Meaning'}</span>${esc(c.s)}` : '<span aria-hidden="true">🧩</span>'}</button>`; }).join('')}</div>`;
    if (MT.end) h += `<div class="bg-done" role="status"><span class="bg-big" aria-hidden="true">🏆</span><div><b>All pairs matched in ${fmt(MT.end - MT.t0)} with ${MT.moves} moves.</b><br><span class="hint">Perfect memory is 6 moves.</span></div></div>`;
    h += `<div class="bg-nav"><button type="button" class="btn ${MT.end ? 'go' : 'ghost'}" data-px="mnew" ${MT.end ? 'data-focus' : ''}>🔀 New game</button></div></div>`;
    return h;
  }
  function matchClick(a, el) {
    if (a === 'mnew') { matchNew(); FOCUS = '[data-px="mflip"]'; return API.render(); }
    if (a !== 'mflip' || MT.lock || MT.end) return;
    const i = +el.dataset.v, c = MT.cards[i]; if (c.up || c.done) return;
    if (!MT.on) { MT.on = true; MT.t0 = Date.now(); tickStart(); }
    c.up = true; MT.open.push(i);
    if (MT.open.length === 2) {
      MT.moves++; const [x, y] = MT.open.map(j => MT.cards[j]);
      if (x.k === y.k && x.t !== y.t) { x.done = y.done = true; x.up = y.up = false; MT.open = []; API.chime('good');
        if (MT.cards.every(z => z.done)) { MT.end = Date.now(); const secs = Math.round((MT.end - MT.t0) / 1000), b = B(); if (!b.mb || secs < b.mb) { b.mb = secs; API.save(); } API.reward(MT.moves <= 10 ? 5 : MT.moves <= 16 ? 4 : 3, '🃏 Memory match complete'); FOCUS = '[data-focus]'; return API.render(); }
      } else {
        MT.lock = true; const pair = MT.open.slice(); MT.open = [];
        setTimeout(() => { pair.forEach(j => { MT.cards[j].up = false; }); MT.lock = false; if (inView('match')) { FOCUS = `[data-px="mflip"][data-v="${i}"]`; API.render(); } }, 1000);
      }
    }
    FOCUS = `[data-px="mflip"][data-v="${i}"]`; return API.render();
  }

  // --- Colour Clash (Stroop) ---
  const SC = { on: false, end: 0, word: 0, ink: 1, score: 0, miss: 0, done: false, last: null };
  function stroopNext() { const w = Math.floor(Math.random() * 4); let ink = w; if (Math.random() < 0.8) while (ink === w) ink = Math.floor(Math.random() * 4); SC.word = w; SC.ink = ink; }
  function stroopEnd() {
    SC.on = false; SC.done = true; const b = B(); if (SC.score > (b.sb || 0)) { b.sb = SC.score; API.save(); }
    const n = SC.score >= 20 ? 5 : SC.score >= 12 ? 3 : SC.score >= 6 ? 1 : 0; if (n) API.reward(n, '🎨 Colour Clash');
    if (inView('stroop')) { FOCUS = '[data-focus]'; API.render(); }
  }
  function stroopHTML() {
    const b = B();
    let h = `<div class="card"><div class="bg-bar"><div><span class="kicker">Colour Clash</span><h2 style="margin:0">Name the INK, not the word</h2></div><div class="row"><span class="bg-clock" id="bg-sclock" aria-label="Seconds left">${SC.on ? Math.ceil((SC.end - Date.now()) / 1000) + 's' : '30s'}</span><span class="bg-stat">Score <b>${SC.score}</b></span><span class="bg-stat">Best <b>${b.sb || 0}</b></span></div></div>
      <p class="hint">Your brain reads words automatically, so naming the ink colour takes focus. That fight is the Stroop effect. Keys: R, B, G, Y. (If you find colours hard to tell apart, try Pan Echo instead: it uses shapes and sounds too.)</p>`;
    if (SC.on) {
      const W = COLOURS[SC.word], I = COLOURS[SC.ink];
      h += `<div class="bg-stroop" aria-live="polite"><span class="bg-sword" style="color:${I[2]}" aria-label="The word ${W[1]} written in an ink colour">${W[1].toUpperCase()}</span></div>
        <div class="bg-cbtns">${COLOURS.map(c => `<button type="button" class="bg-cbtn" data-px="sc" data-v="${c[0]}"><span class="bg-sw" style="background:${c[2]}" aria-hidden="true"></span>${c[1]} <span class="hint">(${c[3].toUpperCase()})</span></button>`).join('')}</div>
        ${SC.last ? `<p class="fb ${SC.last === 'ok' ? 'good' : 'bad'}" style="margin-top:8px">${SC.last === 'ok' ? '✓' : '✗ That was ' + COLOURS[SC.lastInk][1].toLowerCase() + ' ink.'}</p>` : ''}`;
    } else {
      if (SC.done) h += `<div class="bg-done" role="status"><span class="bg-big" aria-hidden="true">🎨</span><div><b>Time! ${SC.score} correct, ${SC.miss} slips.</b><br><span class="hint">20+ is elite focus. Comm Studies link: selective attention is a key part of active listening. Filtering 'noise' to reach the real message.</span></div></div>`;
      h += `<div class="bg-nav"><button type="button" class="btn go" data-px="scstart" ${SC.done ? 'data-focus' : ''}>${SC.done ? '↻ Play again' : '▶ Start 30 seconds'}</button></div>`;
    }
    return h + '</div>';
  }
  function stroopClick(a, el) {
    if (a === 'scstart') { Object.assign(SC, { on: true, end: Date.now() + 30000, score: 0, miss: 0, done: false, last: null }); stroopNext(); tickStart(); FOCUS = '[data-px="sc"]'; return API.render(); }
    if (a === 'sc' && SC.on) {
      const ok = el.dataset.v === COLOURS[SC.ink][0]; SC.lastInk = SC.ink;
      if (ok) SC.score++; else { SC.miss++; API.chime('bad'); }
      SC.last = ok ? 'ok' : 'no'; stroopNext(); FOCUS = `[data-px="sc"][data-v="${el.dataset.v}"]`; return API.render();
    }
  }

  // --- Pan Echo (Simon) ---
  const EC = { seq: [], pos: 0, phase: 'idle', level: 0, deadline: 0, msg: '', timers: [] };
  let AC = null;
  function tone(i, dur) {
    try {
      const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
      AC = AC || new C(); if (AC.state === 'suspended') AC.resume();
      const t = AC.currentTime, o = AC.createOscillator(), o2 = AC.createOscillator(), g = AC.createGain();
      o.type = 'sine'; o2.type = 'triangle'; o.frequency.value = PADS[i][1]; o2.frequency.value = PADS[i][1] * 2.01;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.45));
      o.connect(g); o2.connect(g); g.connect(AC.destination); o.start(t); o2.start(t); o.stop(t + (dur || 0.45) + 0.05); o2.stop(t + (dur || 0.45) + 0.05);
    } catch (e) { }
  }
  function padEl(i) { return document.querySelector(`.bg-pad[data-v="${i}"]`); }
  function flash(i, ms) { const el = padEl(i); if (el) { el.classList.add('lit'); setTimeout(() => { const e2 = padEl(i); if (e2) e2.classList.remove('lit'); }, ms); } tone(i, ms / 1000); }
  function echoStatus(t) { EC.msg = t; const el = document.getElementById('bg-estatus'); if (el) el.textContent = t; }
  function echoPads(on) { document.querySelectorAll('.bg-pad').forEach(p => p.setAttribute('aria-disabled', on ? 'false' : 'true')); }
  function echoClear() { EC.timers.forEach(clearTimeout); EC.timers = []; }
  function echoPlay() {
    EC.phase = 'watch'; EC.pos = 0; echoPads(false); echoStatus(`Level ${EC.level}: watch and listen…`);
    const gap = Math.max(380, 650 - EC.level * 20);
    EC.seq.forEach((p, j) => EC.timers.push(setTimeout(() => flash(p, gap * 0.7), 500 + j * gap)));
    EC.timers.push(setTimeout(() => { EC.phase = 'input'; EC.deadline = Date.now() + 5000; echoPads(true); echoStatus(`Your turn: repeat ${EC.seq.length} note${EC.seq.length > 1 ? 's' : ''}.`); tickStart(); const f = padEl(0); if (f && document.activeElement && document.activeElement.closest && document.activeElement.closest('.bg-pads')) f.focus(); }, 500 + EC.seq.length * gap));
  }
  function echoOver(why) {
    echoClear(); EC.phase = 'over'; EC.deadline = 0; const reached = EC.level - 1, b = B();
    if (reached > (b.eb || 0)) { b.eb = reached; API.save(); }
    API.chime('bad');
    const n = reached >= 8 ? 5 : reached >= 5 ? 3 : reached >= 3 ? 1 : 0; if (n) API.reward(n, '🥁 Pan Echo');
    EC.msg = `${why} You remembered ${reached} note${reached === 1 ? '' : 's'} in a row.`;
    if (inView('echo')) { FOCUS = '[data-focus]'; API.render(); }
  }
  function echoHTML() {
    const b = B(), act = EC.phase === 'input';
    let h = `<div class="card"><div class="bg-bar"><div><span class="kicker">Pan Echo</span><h2 style="margin:0">Repeat the steelpan pattern</h2></div><div class="row"><span class="bg-stat">Level <b>${EC.level}</b></span><span class="bg-stat">Best <b>${b.eb || 0}</b></span></div></div>
      <p class="hint">Watch and listen as the pans light up, then play them back in the same order. Each round adds one note. You have 5 seconds per tap. Keys: 1–4. Every pad has a shape and a note, so you can play by sound, shape or colour.</p>
      <div class="bg-pads" role="group" aria-label="Steelpan pads">${PADS.map((p, i) => `<button type="button" class="bg-pad bg-p${i}" data-px="epad" data-v="${i}" aria-disabled="${act ? 'false' : 'true'}" aria-label="Pad ${i + 1}: ${p[0]} ${p[2]}">${p[2]}<span>${i + 1} · ${p[0]}</span></button>`).join('')}</div>
      <p class="bg-status" id="bg-estatus" role="status" aria-live="polite">${esc(EC.msg || 'Press start when you are ready.')}</p>`;
    if (EC.phase === 'idle' || EC.phase === 'over') h += `<div class="bg-nav" style="justify-content:center"><button type="button" class="btn go" data-px="estart" ${EC.phase === 'over' ? 'data-focus' : ''}>${EC.phase === 'over' ? '↻ Play again' : '▶ Start'}</button></div>`;
    h += `<p class="hint">Comm Studies link: listening is an active process: attending, decoding and remembering. Short-term memory span is limited (about 7 items), which is why speakers chunk ideas into three key points.</p>`;
    return h + '</div>';
  }
  function echoClick(a, el) {
    if (a === 'estart') { echoClear(); EC.seq = [Math.floor(Math.random() * 4)]; EC.level = 1; EC.msg = ''; FOCUS = '[data-px="epad"]'; API.render(); return echoPlay(); }
    if (a === 'epad') {
      if (EC.phase !== 'input') return; const v = +el.dataset.v; flash(v, 260);
      if (v !== EC.seq[EC.pos]) return echoOver('✗ Wrong pan!');
      EC.pos++; EC.deadline = Date.now() + 5000;
      if (EC.pos >= EC.seq.length) {
        EC.phase = 'watch'; EC.deadline = 0; EC.level++; echoStatus('✓ Nice! Next round…'); echoPads(false);
        EC.seq.push(Math.floor(Math.random() * 4)); EC.timers.push(setTimeout(() => { if (inView('echo')) echoPlay(); else { echoClear(); EC.phase = 'idle'; } }, 700));
      }
    }
  }

  /* ============================== RENDER ============================== */
  const TABS = [['riddle', '🦉', 'Riddle Me This'], ['lateral', '🐸', 'Lateral Leap'], ['word', '🔤', 'Word Brain'], ['logic', '🧪', 'Logic Lab'], ['memory', '🃏', 'Memory & Focus'], ['daily', '📅', 'Daily Brain Teaser']];
  const WSUB = [['anagram', '🔀 Scramble Squad'], ['missing', '▢ Letter Lost'], ['homophone', '👂 Sound-Alikes'], ['idiom', '🗣️ Proverb Pot'], ['rebus', '😀 Picture Talk'], ['odd', '🙃 Odd One Out']];
  const LSUB = [['seq', '🔢 Pattern Hunt'], ['grid', '🕵️ Grid Detective'], ['liar', "🤥 Who's Lying?"], ['syl', '⚖️ Argument Court']];
  const MSUB = [['match', '🃏 Flip & Match'], ['stroop', '🎨 Colour Clash'], ['echo', '🥁 Pan Echo']];
  const RSUB = [['all', 'All'], ['e', 'Easy'], ['m', 'Medium'], ['h', 'Hard']];
  const INTRO = {
    anagram: "Unscramble the letters to find a Communication Studies term.", missing: "Commonly misspelt words. Fill the gaps and type the whole word.",
    homophone: "Words that sound alike but mean different things. Pick the right one for the sentence.", idiom: "Complete the proverb or idiom. Caribbean proverbs are oral literature: compact, metaphorical and full of cultural wisdom.",
    rebus: "Read the emoji 'rebus' and find the word or phrase.", odd: "Find the item that does not belong, and work out why.",
    seq: "Spot the rule, then type the next term.", liar: "Test each suspect in turn. Only one possibility matches the number of true statements.",
    syl: "Valid means the conclusion MUST follow if the premises are true. Module 1 and Module 3 link: evaluating arguments and spotting fallacies."
  };
  function chips(list, cur, tab, label) { return `<nav class="chips bg-sub" aria-label="${esc(label)}">${list.map(([k, n]) => `<button type="button" class="chip ${cur === k ? 'sel' : ''}" data-go="brain" data-tab="${tab}" data-k="${k}" aria-current="${cur === k ? 'true' : 'false'}">${esc(n)}</button>`).join('')}</nav>`; }

  function render(api, loc) {
    API = api; const tab = loc.tab || 'riddle', b = B();
    const today = dayKey(), dailyOn = b.dd === today, dStreak = b.dd === today || b.dd === prevDay(today) ? (b.ds || 0) : 0;
    let h = `<section class="hero bg-hero"><span class="eyebrow">Brain Gym · warm up your thinking</span><h1>Brain Gym 🧩</h1>
      <p>Riddles, lateral thinking, word puzzles, logic and memory games. Every one of them trains a skill you use in Communication Studies: inference, close reading, argument evaluation and focused listening.</p>
      <div class="bg-stats"><span class="bg-stat">📅 Daily streak <b>${dStreak}</b></span><span class="bg-stat">🦉 Best riddle streak <b>${b.rb || 0}</b></span><span class="bg-stat">${dailyOn ? '✅ Today’s teaser done' : '⏳ Today’s teaser waiting'}</span></div></section>`;
    h += `<nav class="chips bg-tabs" aria-label="Brain Gym games">${TABS.map(([k, ic, n]) => `<button type="button" class="chip ${tab === k ? 'sel' : ''}" data-go="brain" data-tab="${k}" aria-current="${tab === k ? 'page' : 'false'}"><span aria-hidden="true">${ic}</span> ${esc(n)}${k === 'daily' && !dailyOn ? ' •' : ''}</button>`).join('')}</nav>`;
    if (tab === 'riddle') {
      const t = loc.k || 'all', key = 'riddle:' + t, D = deck(key);
      h += chips(RSUB, t, 'riddle', 'Riddle difficulty');
      h += `<div class="card">${cardHTML(key, D, { streak: rStreak })}<div class="row" style="margin-top:10px">${api.listenBtn ? api.listenBtn('Read aloud') : ''}</div></div>`;
      h += `<p class="hint">${RIDDLES.length} riddles: classic, Caribbean-flavoured and word riddles. Two hints unlock the reveal. Coins: Easy 2, Medium 3, Hard 4 (minus 1 per hint), plus a bonus every 5 in a row.</p>`;
    } else if (tab === 'lateral') {
      h += lateralHTML();
    } else if (tab === 'word') {
      const k = loc.k || 'anagram', key = 'w:' + k; h += chips(WSUB, k, 'word', 'Word Brain games');
      h += `<p class="hint">${esc(INTRO[k])}</p><div class="card">${cardHTML(key, deck(key))}</div>`;
    } else if (tab === 'logic') {
      const k = loc.k || 'seq'; h += chips(LSUB, k, 'logic', 'Logic Lab games');
      if (k === 'grid') h += gridHTML();
      else { const key = 'l:' + k; h += `<p class="hint">${esc(INTRO[k])}</p><div class="card">${cardHTML(key, deck(key))}</div>`; }
    } else if (tab === 'memory') {
      const k = loc.k || 'match'; h += chips(MSUB, k, 'memory', 'Memory and focus games');
      h += k === 'stroop' ? stroopHTML() : k === 'echo' ? echoHTML() : matchHTML();
    } else if (tab === 'daily') {
      const D = dailyDeck(), dd = new Date();
      h += `<div class="card"><span class="kicker">Daily Brain Teaser · ${dd.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        <p class="hint">One teaser a day, the same for everyone in the class. Finish it to keep your streak alive; solve it for 5 coins (+1 from a 3-day streak, +3 from 7 days).</p>${cardHTML('daily', D, { item: D.item, label: 'Today: ' + D.item.tag })}</div>`;
      const hist = new Set(b.dh || []), days = []; let k2 = today; for (let i = 0; i < 7; i++) { days.unshift(k2); k2 = prevDay(k2); }
      h += `<div class="card"><h3>Your week</h3><div class="bg-cal" aria-label="Teasers finished in the last 7 days">${days.map(k3 => `<span class="${hist.has(k3) ? 'on' : ''}" title="${k3}" aria-label="${k3 % 100}: ${hist.has(k3) ? 'done' : 'not done'}">${k3 % 100}</span>`).join('')}</div>
        <p class="hint">Current streak: <b>${dStreak}</b> day${dStreak === 1 ? '' : 's'} · Best: <b>${b.db || 0}</b>. Come back tomorrow for a new one.</p></div>`;
    }
    return h;
  }

  function mount(api, loc, stage) {
    API = api;
    const inp = stage.querySelector('#bg-in');
    if (inp) {
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); const b = stage.querySelector('[data-px="chk"]'); if (b) b.click(); } });
      inp.addEventListener('input', () => { const D = getDeck(inp.dataset.key); if (D) D.st.last = inp.value; });
    }
    if ((loc.tab || 'riddle') !== 'memory' || (loc.k || 'match') !== 'echo') { if (EC.phase === 'watch' || EC.phase === 'input') { echoClear(); EC.phase = 'idle'; EC.msg = 'Game paused. Press start to play again.'; } }
    if ((loc.tab || 'riddle') !== 'memory' || loc.k !== 'stroop') { if (SC.on) { SC.on = false; SC.done = false; } }
    if (FOCUS) { const el = stage.querySelector(FOCUS); FOCUS = null; if (el) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } } }
    if (MT.on && !MT.end) tickStart();
  }

  document.addEventListener('keydown', e => {
    if (!API || !API.S.loc || API.S.loc.v !== 'brain' || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target; if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    const L = API.S.loc; if ((L.tab || 'riddle') !== 'memory') return;
    const k = e.key.toLowerCase();
    if (L.k === 'stroop' && SC.on) { const c = COLOURS.find(x => x[3] === k); if (c) { e.preventDefault(); const b = document.querySelector(`[data-px="sc"][data-v="${c[0]}"]`); if (b) b.click(); } }
    if (L.k === 'echo' && /^[1-4]$/.test(k)) { e.preventDefault(); const b = padEl(+k - 1); if (b) b.click(); }
  });

  function click(action, el, api) {
    API = api;
    if (['chk', 'hint', 'reveal', 'mc', 'next'].includes(action)) return deckClick(action, el);
    if (action[0] === 'l' && ['lask', 'lrev', 'lpick', 'lnav'].includes(action)) return lateralClick(action, el);
    if (action[0] === 'g') return gridClick(action, el);
    if (action === 'mflip' || action === 'mnew') return matchClick(action, el);
    if (action === 'sc' || action === 'scstart') return stroopClick(action, el);
    if (action === 'epad' || action === 'estart') return echoClick(action, el);
  }

  const PLUGIN = { view: 'brain', title: 'Brain Gym', tile: { icon: '🧩', meta: 'Riddles, lateral puzzles, word and logic games, memory challenges and a daily teaser' }, render, mount, click };
  Object.defineProperty(PLUGIN, '_t', { enumerable: false, value: { RIDDLES, LATERAL, ANAGRAMS, MISSING, HOMOPHONES, IDIOMS, REBUS, ODD, SEQS, GRIDS, LIARS, SYLS, PAIRS, liarSolve, gridSolve, sylValid, sylLines, match, norm, MT, SC, EC, DECKS, deck, curItem, dailyPick, dayKey, prevDay, LAT, GR } });
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push(PLUGIN);
})();
