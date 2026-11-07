/* CSEC Information Technology · My Learning Survey: questions and quick skills check · Developed by Kester Small.
   Non-invasive by design: no names, addresses, family, health, money or identity questions. Every question is optional.
   Teachers can edit the wording here; keep the ids and option values the same so the plan generator still works. */
window.COURSE_SURVEY = {
 version: 1,
 steps: [
  { id: 'about', title: 'About your IT journey', icon: '🧭', blurb: 'Where you are starting from. No right or wrong answers.' },
  { id: 'style', title: 'How you like to learn', icon: '🎧', blurb: 'So the course can show you more of what works for you.' },
  { id: 'conf', title: 'How confident do you feel?', icon: '📶', blurb: 'Be honest: this only sets your starting level, and you can change it any time.' },
  { id: 'apps', title: 'Apps and coding you have used', icon: '🖥️', blurb: 'Tell us which tools you already know.' },
  { id: 'likes', title: 'What you are into', icon: '⭐', blurb: 'We use your interests for examples, projects and your SBA theme.' },
  { id: 'check', title: 'Quick skills check', icon: '⚡', blurb: 'Eight quick questions, one per section. No marks, no pressure: it just helps pick your level.' }
 ],
 questions: [
  { id: 'form', step: 'about', type: 'one', q: 'Which group are you in?', opts: [['F3', 'Form 3'], ['F4', 'Form 4'], ['F5', 'Form 5'], ['PC', 'Private candidate'], ['OT', 'Other']] },
  { id: 'prior', step: 'about', type: 'one', q: 'Have you studied IT before this course?', opts: [['none', 'Not really'], ['some', 'A little, in Forms 1–3'], ['full', 'Yes, a full course or club']] },
  { id: 'where', step: 'about', type: 'many', q: 'Where can you practise on a computer most weeks? (choose all that apply)', opts: [['lab', 'School computer lab'], ['pc', 'A computer or laptop at home'], ['tab', 'A tablet'], ['phone', 'Mostly my phone'], ['lib', 'Library or community centre']] },
  { id: 'time', step: 'about', type: 'one', q: 'About how much time can you give IT outside class each week?', opts: [['t1', 'Under 1 hour'], ['t2', '1–2 hours'], ['t3', '3–4 hours'], ['t4', '5 hours or more']] },
  { id: 'goal', step: 'about', type: 'one', q: 'What grade are you aiming for?', opts: [['g1', 'Grade One'], ['g2', 'Grade Two'], ['g3', 'Grade Three'], ['gx', 'Not sure yet']] },
  { id: 'ways', step: 'style', type: 'many', max: 4, q: 'Which ways of learning work best for you? (pick up to 4)', opts: [['video', '🎬 Watching short videos'], ['read', '📖 Reading clear notes'], ['listen', '🔊 Listening (read aloud)'], ['hands', '🖱️ Hands-on practice in the software'], ['games', '🎮 Games and challenges'], ['friends', '👥 Working with friends'], ['examples', '🪜 Step-by-step worked examples'], ['explore', '🧩 Figuring things out myself']] },
  { id: 'pace', step: 'style', type: 'one', q: 'When something is new, you prefer to…', opts: [['small', 'Take small steps with lots of help'], ['mix', 'A mix: some help, then try it'], ['jump', 'Jump in and figure it out']] },
  { id: 'group', step: 'style', type: 'one', q: 'For projects, you usually like working…', opts: [['solo', 'On my own'], ['pair', 'With one partner'], ['team', 'In a small team']] },
  { id: 'when', step: 'style', type: 'one', q: 'When do you usually study best?', opts: [['am', 'Early, before school'], ['pm', 'After school'], ['eve', 'In the evening'], ['wk', 'At weekends']] },
  { id: 'conf', step: 'conf', type: 'scale', q: 'How confident do you feel about…', scale: [['1', '😟', 'New to me'], ['2', '😐', 'A little'], ['3', '🙂', 'Fairly okay'], ['4', '😎', 'Very confident']],
    items: [['S1', 'Computer parts, devices, software and storage'], ['S2', 'Networks, Wi-Fi, the Internet and websites'], ['S3', 'Cybersecurity, online safety and IT careers'], ['S4', 'Word documents and making a web page'], ['S5', 'Spreadsheets and formulas'], ['S6', 'Databases, queries and reports'], ['S7', 'Algorithms, flowcharts and pseudocode'], ['S8', 'Writing programs (for example in Python)']] },
  { id: 'apps', step: 'apps', type: 'scale', q: 'How well do you know these?', scale: [['0', '⬜', 'Never used'], ['1', '🟨', 'Tried it'], ['2', '🟩', 'Use it comfortably'], ['3', '🏆', 'Could teach a friend']],
    items: [['win', 'Windows: files, folders, settings'], ['word', 'Microsoft Word (or Google Docs)'], ['excel', 'Microsoft Excel (or Google Sheets)'], ['access', 'Microsoft Access or any database'], ['pub', 'Microsoft Publisher or Canva'], ['web', 'Making a web page or website'], ['blocks', 'Scratch or other block coding'], ['code', 'Python or another text language']] },
  { id: 'likes', step: 'likes', type: 'many', max: 4, q: 'Pick up to 4 things you are into.', opts: [['Gaming', '🎮 Gaming'], ['Music', '🎵 Music'], ['Sports', '⚽ Sports'], ['Fashion', '👟 Fashion'], ['Business', '💼 Business'], ['Environment', '🌊 Environment'], ['Social media', '📱 Social media'], ['Film', '🎬 Film and video'], ['Art', '🎨 Art and design'], ['Science', '🔬 Science'], ['Robots', '🤖 Robots and cars'], ['Food', '🍲 Food'], ['Travel', '✈️ Travel and tourism'], ['Carnival', '🎭 Carnival']] },
  { id: 'career', step: 'likes', type: 'one', q: 'Which IT job sounds most interesting right now?', opts: [['dev', 'App or game developer'], ['web', 'Web designer'], ['sec', 'Cybersecurity analyst'], ['net', 'Network technician'], ['data', 'Data or database analyst'], ['media', 'Digital media or graphics'], ['biz', 'Running my own tech business'], ['unsure', 'Not sure yet']] }
 ],
 check: [
  { sec: 'S1', q: 'Kayla\'s new laptop has 8 GB RAM and a 512 GB SSD. Which one holds the program she is using right now while it runs?', opts: ['The RAM', 'The SSD', 'The ROM', 'The USB port'], a: 0, why: 'Programs in use are loaded into RAM (main memory). The SSD stores files long-term.' },
  { sec: 'S2', q: 'Calabash Point Secondary wants to connect the 30 computers in one lab so they can share a printer and files. What type of network is this?', opts: ['WAN', 'LAN', 'MAN', 'The Internet'], a: 1, why: 'A network inside one building or site is a Local Area Network (LAN).' },
  { sec: 'S3', q: 'You get a text: "Your phone account is locked. Tap this link and enter your PIN." What is this most likely to be?', opts: ['A software update', 'A firewall alert', 'A phishing (smishing) scam', 'A backup reminder'], a: 2, why: 'Messages that rush you to click a link and give a PIN are phishing; by text message it is called smishing.' },
  { sec: 'S4', q: 'The Frangipani Hill IT Club must send the same letter to 40 parents, each with that parent\'s name and address filled in automatically. Which Word feature does this?', opts: ['Track Changes', 'Mail merge', 'Table of contents', 'Find and replace'], a: 1, why: 'Mail merge combines one letter (primary document) with a list of names (data source).' },
  { sec: 'S5', q: 'A Carnival troupe lists costume sales in cells B2 to B6. Which formula gives the total?', opts: ['=B2+B6', '=TOTAL(B2:B6)', '=SUM(B2:B6)', 'SUM B2 to B6'], a: 2, why: '=SUM(B2:B6) adds every cell in the range B2 to B6. A formula must start with =.' },
  { sec: 'S6', q: 'A school database has a Students table. Which field is the best primary key?', opts: ['First name', 'Student ID number', 'Form class', 'Date of birth'], a: 1, why: 'A primary key must be unique for every record. Names, classes and birthdays can repeat.' },
  { sec: 'S7', q: 'In a flowchart, which symbol shows a question such as "Is score >= 50?" with Yes and No exits?', opts: ['A rectangle', 'An oval', 'A parallelogram', 'A diamond'], a: 3, why: 'The diamond is the decision symbol. Rectangles are processes; ovals start and stop; parallelograms are input/output.' },
  { sec: 'S8', q: 'A program runs without crashing but prints a class average of 900 instead of 90. What kind of error is this?', opts: ['A syntax error', 'A logic error', 'A run-time error', 'No error'], a: 1, why: 'The program runs but gives the wrong answer: a logic error (perhaps the total is not divided by the number of students).' }
 ]
};
