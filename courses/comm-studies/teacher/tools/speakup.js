/* Speak Up Arena: debate and impromptu speaking games for Module 3 (oral communication, persuasion,
   audience, register) and Paper 3 oral work. Self-contained plugin: WebAudio bells, no files, no network
   (except the optional AI opponent through api.sample when the course grants it). */
(function () {
  const ID = 'speakup';
  const CSS = `
.su{display:flex;flex-direction:column;gap:16px;min-width:0}
.su *{min-width:0}
.su-hero h1{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.su-nav{display:flex;flex-wrap:wrap;gap:6px}
.su-nav .chip{display:inline-flex;align-items:center;gap:6px}
.su-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.su-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.su-tiles .tile{text-align:left}
.su-tiles .tile .su-tag{font-size:.74rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--gold)}
.su-panel{border-radius:18px;padding:clamp(14px,3vw,22px);background:radial-gradient(380px 180px at 15% 0%,rgba(255,215,102,.16),transparent 70%),linear-gradient(160deg,#16306f,#0a1638 75%);color:#F1F4FF;border:2px solid rgba(255,215,102,.42);box-shadow:0 2px 0 rgba(255,255,255,.1) inset,0 16px 32px -18px rgba(0,0,0,.85),0 6px 0 #071030}
.su-panel .hint{color:#C9D3F5}
.su-panel h2,.su-panel h3{color:#FFE38A}
.su-panel .chip{color:#F1F4FF;background:rgba(255,255,255,.06);border-color:rgba(255,215,102,.35)}
.su-panel .chip.sel{background:#FFD766;color:#0A1433;border-color:#FFD766}
.su-panel .btn.ghost{color:#F1F4FF;border-color:rgba(255,255,255,.4)}
.su-big-q{font:800 clamp(1.3rem,4.6vw,2rem)/1.2 var(--f-display);color:#FFFFFF;margin:6px 0 4px}
.su-lbl{font-size:.76rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--gold)}
.su-timerwrap{display:flex;flex-direction:column;align-items:center;gap:10px}
.su-timer{position:relative;width:clamp(150px,44vw,210px);aspect-ratio:1;margin:0 auto}
.su-timer svg{width:100%;height:100%;transform:rotate(-90deg);display:block}
.su-timer circle{fill:none;stroke-width:10}
.su-ring-bg{stroke:rgba(255,255,255,.14)}
.su-ring{stroke:#FFD766;stroke-linecap:round;transition:stroke-dashoffset .22s linear,stroke .3s}
.su-tnum{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font:800 clamp(2.3rem,10vw,3.4rem)/1 var(--f-display);color:#FFFFFF;font-variant-numeric:tabular-nums;text-shadow:0 3px 0 rgba(0,0,0,.35)}
.su-tnum small{font:700 .78rem/1.2 var(--f-body);letter-spacing:.08em;text-transform:uppercase;color:#FFE38A;margin-top:6px;text-shadow:none}
.su-timer.warn .su-ring{stroke:#FF9F6B}
.su-timer.warn .su-tnum{color:#FFD0B8}
.su-timer.over .su-ring{stroke:#FF7A6B}
.su-timer.over .su-tnum{color:#FF9C90}
.su-timer.paused .su-tnum{opacity:.75}
.su-wheelbox{position:relative;width:min(300px,78vw);aspect-ratio:1;margin:8px auto 0}
.su-wheel{width:100%;height:100%;border-radius:50%;box-shadow:0 0 0 6px #0a1638,0 0 0 9px #FFD766,0 18px 30px -12px rgba(0,0,0,.8)}
.su-wheel.spin{transition:transform 2.6s cubic-bezier(.15,.7,.2,1)}
.su-pointer{position:absolute;left:50%;top:-14px;transform:translateX(-50%);width:0;height:0;border-left:16px solid transparent;border-right:16px solid transparent;border-top:30px solid #FFD766;filter:drop-shadow(0 3px 2px rgba(0,0,0,.6));z-index:2}
.su-hubcap{position:absolute;left:50%;top:50%;width:22%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff7cf,#C99A1C);box-shadow:0 3px 8px rgba(0,0,0,.6);display:grid;place-items:center;font-size:clamp(1.2rem,5vw,1.8rem)}
.su-plan{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.su-plan .su-box{display:flex;flex-direction:column;gap:4px}
.su-plan .su-box b{font-size:.85rem;color:#FFE38A}
.su-ta,.su-in{width:100%;border:2px solid var(--line);border-radius:10px;padding:8px 10px;font:inherit;font-size:.95rem;background:var(--surface);color:var(--ink);resize:vertical}
.su-panel .su-ta,.su-panel .su-in{background:rgba(5,11,32,.55);color:#F1F4FF;border-color:rgba(255,215,102,.35)}
.su-ta{min-height:64px}
.su-ta:focus,.su-in:focus{outline:3px solid var(--gold);outline-offset:1px}
.su-cue{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;font-size:.9rem}
.su-cue div{background:rgba(255,255,255,.06);border:1px dashed rgba(255,215,102,.4);border-radius:10px;padding:8px}
.su-rub{display:flex;flex-direction:column;gap:8px}
.su-rrow{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 12px;align-items:center;padding:8px 10px;border:1px solid var(--line);border-radius:12px;background:var(--surface)}
.su-rrow .chips{flex-wrap:nowrap}
.su-rrow .chip{min-width:40px;text-align:center}
.su-score{font:800 clamp(2.4rem,9vw,3.4rem)/1 var(--f-display);color:var(--gold)}
.su-meter{height:12px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden}
.su-meter i{display:block;height:100%;background:linear-gradient(90deg,#FFD766,#4FD18B);border-radius:99px}
.su-list{margin:0;padding-left:1.2em;display:flex;flex-direction:column;gap:4px}
.su-mlist{display:flex;flex-direction:column;gap:8px;max-height:420px;overflow:auto;padding:2px}
.su-mot{display:flex;gap:10px;align-items:flex-start;text-align:left;border:2px solid var(--line);background:var(--surface);border-radius:12px;padding:10px 12px;color:var(--ink);font:inherit;font-size:.95rem}
.su-mot:hover{border-color:var(--gold)}
.su-mot .su-d{flex:0 0 auto;font-size:.72rem;font-weight:800;padding:2px 8px;border-radius:99px;background:var(--soft-gold);color:var(--ink);white-space:nowrap}
.su-sides{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.su-side{border-radius:16px;padding:16px;text-align:left;font:inherit;border:3px solid transparent;color:#0A1433;display:flex;flex-direction:column;gap:4px}
.su-side b{font:800 1.2rem/1.1 var(--f-display)}
.su-side.prop{background:linear-gradient(160deg,#FFF0B3,#FFD766)}
.su-side.opp{background:linear-gradient(160deg,#CFE0FF,#8FB3FF)}
.su-side[aria-pressed="true"]{border-color:#FFFFFF;box-shadow:0 0 0 3px var(--gold)}
.su-peel{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.su-arg{border:2px solid var(--line);border-radius:14px;padding:12px;background:var(--surface);display:flex;flex-direction:column;gap:10px}
.su-arg h3{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center;margin:0}
.su-dots{display:inline-flex;gap:4px}
.su-dots i{width:10px;height:10px;border-radius:50%;background:var(--line)}
.su-dots i.on{background:var(--ok)}
.su-opp{border-left:6px solid #8FB3FF;background:rgba(143,179,255,.12);border-radius:12px;padding:12px 14px}
.su-opp.prop{border-left-color:#FFD766;background:rgba(255,215,102,.12)}
.su-opp p{margin:.3em 0 0;font-size:1.02rem}
.su-brk{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.su-brk div{border:1px solid var(--line);border-radius:12px;padding:8px;text-align:center;background:var(--surface)}
.su-brk b{display:block;font:800 1.4rem/1 var(--f-display);color:var(--gold)}
.su-brk span{font-size:.78rem}
.su-streak{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;font-weight:700}
.su-streak .su-fire{font:800 1.5rem/1 var(--f-display);color:var(--gold)}
.su-qbar{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
.su-qbar .su-timer{width:96px;margin:0}
.su-qbar .su-tnum{font-size:1.6rem}
.su-qbar .su-tnum small{display:none}
.su-snip{font-size:1.08rem;line-height:1.5;padding:12px 14px;border-radius:12px;background:var(--soft-gold);border-left:5px solid var(--gold)}
.su-bins{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.su-bin{border-radius:16px;padding:14px 8px;font:inherit;font-weight:800;text-align:center;border:0;color:#0A1433;display:flex;flex-direction:column;align-items:center;gap:2px;box-shadow:0 4px 0 rgba(0,0,0,.35)}
.su-bin:active{transform:translateY(3px);box-shadow:0 1px 0 rgba(0,0,0,.35)}
.su-bin span{font-size:1.6rem}
.su-bin small{font-weight:600;font-size:.74rem}
.su-bin.ethos{background:#BFD4FF}.su-bin.pathos{background:#FFC2B8}.su-bin.logos{background:#BDF0D2}.su-bin.kairos{background:#FFE38A}
.su-line{font:700 clamp(1.05rem,3.6vw,1.3rem)/1.4 var(--f-body);padding:16px;border-radius:14px;background:rgba(255,255,255,.07);border:2px dashed rgba(255,215,102,.45);color:#FFFFFF}
.su-players{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.su-pl{border:2px solid var(--line);border-radius:14px;padding:10px;background:var(--surface);display:flex;flex-direction:column;gap:6px}
.su-pl.on{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold)}
.su-pl b.su-pts{font:800 1.8rem/1 var(--f-display);color:var(--gold)}
.su-chal{display:flex;flex-wrap:wrap;gap:8px}
.su-buzz{background:linear-gradient(180deg,#FF9C90,#E2483A);color:#fff;border:0;border-radius:99px;padding:14px 22px;font:800 1.1rem/1 var(--f-display);box-shadow:0 5px 0 #8A1F15}
.su-buzz:active{transform:translateY(3px);box-shadow:0 2px 0 #8A1F15}
.su-teams{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.su-team{border-radius:16px;padding:12px;display:flex;flex-direction:column;gap:8px;border:2px solid var(--line);background:var(--surface)}
.su-team.t0{border-top:6px solid #FFD766}.su-team.t1{border-top:6px solid #8FB3FF}
.su-team .su-pts{font:800 clamp(2.4rem,8vw,4rem)/1 var(--f-display);text-align:center;color:var(--gold)}
.su-segs{display:flex;flex-wrap:wrap;gap:6px}
.su-segs .chip.done{opacity:.6;text-decoration:line-through}
.su-status{display:inline-block;padding:4px 12px;border-radius:99px;font-weight:800;font-size:.85rem;background:rgba(79,209,139,.2);color:#BDF0D2}
.su-status.prot{background:rgba(255,122,107,.2);color:#FFC2B8}
.su-picked{font:800 clamp(1.6rem,6vw,2.6rem)/1.1 var(--f-display);color:#FFFFFF;text-align:center;min-height:1.2em}
.su-jt{width:100%;border-collapse:collapse;font-size:.92rem}
.su-jt th,.su-jt td{border-bottom:1px solid var(--line);padding:6px 4px;text-align:left}
.su-jt input{width:4.2em;padding:6px;border:2px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);font:inherit}
.su-big .su-timer{width:min(76vw,360px)}
.su-big .su-tnum{font-size:clamp(3rem,14vw,6rem)}
.su-big .su-team .su-pts{font-size:clamp(3rem,10vw,5.5rem)}
.su-big .su-teamname{font-size:1.4rem}
.su-big .su-seglbl{font-size:clamp(1.4rem,4vw,2.2rem)}
.su-seglbl{font:800 clamp(1.1rem,3.6vw,1.5rem)/1.2 var(--f-display);text-align:center;color:#FFE38A}
.su-coach{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.su-coach .card{margin:0}
.su-phr{display:flex;flex-wrap:wrap;gap:6px;margin:.4em 0}
.su-phr span{border:1px solid var(--line);border-radius:99px;padding:3px 10px;font-size:.86rem;background:var(--soft-gold)}
.su-breath{width:90px;height:90px;border-radius:50%;margin:8px auto;background:radial-gradient(circle,#FFE38A,#C99A1C);animation:su-breath 16s ease-in-out infinite}
@keyframes su-breath{0%,100%{transform:scale(.6)}25%,50%{transform:scale(1)}75%{transform:scale(.6)}}
.su-rec{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.su-rec audio{max-width:100%}
.su-dot{display:inline-block;width:10px;height:10px;border-radius:50%;background:#FF7A6B;margin-right:6px;animation:su-blink 1s steps(2) infinite}
@keyframes su-blink{50%{opacity:.2}}
.su-fc{font:800 1.6rem/1 var(--f-display);color:#FFE38A}
@media (max-width:640px){
  .su-plan,.su-peel,.su-cue{grid-template-columns:minmax(0,1fr)}
  .su-bins{grid-template-columns:repeat(2,minmax(0,1fr))}
  .su-brk{grid-template-columns:repeat(2,minmax(0,1fr))}
  .su-rrow{grid-template-columns:minmax(0,1fr)}
  .su-tiles{grid-template-columns:minmax(0,1fr)}
  .su-sides{grid-template-columns:minmax(0,1fr)}
  .su-teams{gap:8px}
  .su-team{padding:10px}
}
@media (prefers-reduced-motion:reduce){
  .su-wheel.spin,.su-ring{transition:none}
  .su-breath,.su-dot{animation:none}
}`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  /* ------------------------------------------------------------------ DATA ------------------------------------------------------------------ */
  const CATS = [
    { k: 'carib', n: 'Caribbean life', e: '🌴', c: '#2E8B57', t: ['The best Caribbean dish and why', 'Should every island have its own Carnival?', 'What makes a good neighbour in the Caribbean', 'Island life: what visitors never understand', 'Bus drivers and their music', 'The role of grandparents in Caribbean families', 'Why everyone should visit a neighbouring island', 'Market day traditions', 'How to get through hurricane season', 'The best place to watch the sunset on your island'] },
    { k: 'school', n: 'School', e: '🏫', c: '#3D6FD9', t: ['The one rule I would change at school', 'Is homework worth it?', 'What makes a great teacher', 'School uniforms: love them or lose them?', 'The most useful subject on the timetable', 'How to prepare for CAPE exams', 'Why lunch break should be longer', 'The perfect school trip', 'Should students grade their teachers?', 'Advice for a brand-new Form 1 student'] },
    { k: 'tech', n: 'Tech & social media', e: '📱', c: '#7A4FD1', t: ['Phones at the dinner table', 'Is social media making us lonelier?', 'AI: study helper or shortcut?', 'The app I could not live without', 'Should parents check their teenagers’ phones?', 'Online learning versus classroom learning', 'Voice notes versus text messages', 'Fake news in the family group chat', 'Gaming: hobby or waste of time?', 'Will robots take our jobs?'] },
    { k: 'env', n: 'Environment', e: '🌊', c: '#1C9AA8', t: ['Sargassum on our beaches', 'Banning single-use plastics', 'Protecting our coral reefs', 'Should every home have solar panels?', 'Climate change and small islands', 'Beach clean-ups: do they make a difference?', 'Saving the sea turtles', 'Water shortages and how to save water', 'Should cars be banned from town centres?', 'A tree in every schoolyard'] },
    { k: 'sport', n: 'Sports', e: '🏏', c: '#D9622B', t: ['Cricket versus football', 'Should esports be part of sports day?', 'The greatest Caribbean athlete of all time', 'Why every child should learn to swim', 'Sports scholarships: dream or distraction?', 'Should PE be an exam subject?', 'Is winning everything?', 'Women in Caribbean sport', 'Training at home versus abroad', 'My best sports day memory'] },
    { k: 'music', n: 'Music & culture', e: '🥁', c: '#C2457F', t: ['Soca versus dancehall', 'Should radio play more local music?', 'Steelpan in every school', 'Is calypso still relevant?', 'Is downloading music for free wrong?', 'The song that describes my island', 'Carnival costumes: art or excess?', 'Should song lyrics be edited for radio?', 'Music in the classroom', 'Caribbean artists going global'] },
    { k: 'wild', n: 'Wildcard & fun', e: '🎲', c: '#B8860B', t: ['If I were Prime Minister for a day', 'The most useless invention ever', 'Mangoes: the perfect fruit?', 'A day without electricity', 'If animals could talk, which would be the rudest?', 'The best excuse for being late', 'Should pineapple go on pizza?', 'The superpower I would choose', 'Rain: blessing or nuisance?', 'The ideal weekend lime'] }
  ];

  const THEMES = { education: '🎓 Education', tech: '📱 Tech & media', environment: '🌊 Environment', culture: '🥁 Culture', sport: '🏏 Sport', health: '❤️ Health', economy: '💰 Economy', society: '🏛️ Society' };
  const M = (m, t, d) => ({ m, t, d });
  const MOTIONS = [
    M('This House would make Caribbean history compulsory up to CSEC.', 'education', 1), M('This House believes that school uniforms should be abolished.', 'education', 1), M('This House would ban homework for students under 16.', 'education', 1),
    M('This House would replace final exams with continuous assessment.', 'education', 2), M('This House believes that Creole should be used as a language of instruction in Caribbean schools.', 'education', 3), M('This House would make a foreign language compulsory for every Caribbean student.', 'education', 2),
    M('This House would start the school day at 9:00 a.m.', 'education', 1), M('This House believes that single-sex schools do more harm than good.', 'education', 2), M('This House would pay students for good attendance.', 'education', 2),
    M('This House would make financial literacy a compulsory subject.', 'education', 1), M('This House believes that university education in the Caribbean should be free.', 'education', 3),
    M('This House would ban smartphones in secondary school classrooms.', 'tech', 1), M('This House believes that social media has done more harm than good to Caribbean teenagers.', 'tech', 1), M('This House would raise the minimum age for social media accounts to 16.', 'tech', 2),
    M('This House believes that AI tools should be allowed in CAPE coursework.', 'tech', 2), M('This House would require influencers to label every paid promotion.', 'tech', 1), M('This House believes that online friendships are as real as face-to-face ones.', 'tech', 1),
    M('This House would make internet access a basic right for every Caribbean household.', 'tech', 2), M('This House believes that group chats have replaced the verandah as the Caribbean meeting place.', 'tech', 2), M('This House would ban phones at the family dinner table.', 'tech', 1),
    M('This House believes that governments should regulate fake news on social media.', 'tech', 3), M('This House believes that video games are a positive influence on young people.', 'tech', 1),
    M('This House would ban single-use plastics across the Caribbean.', 'environment', 1), M('This House believes that tourism harms Caribbean coral reefs more than it helps them.', 'environment', 2), M('This House would limit cruise ship visits to three days a week.', 'environment', 2),
    M('This House believes that rich countries should pay for climate damage in the Caribbean.', 'environment', 3), M('This House would make every school plant and care for a garden.', 'environment', 1), M('This House would prioritise hurricane-proof housing over new hotels.', 'environment', 2),
    M('This House would ban the sale of beachfront land to private developers.', 'environment', 2), M('This House believes that Caribbean islands should run fully on renewable energy by 2040.', 'environment', 3), M('This House would fine households that do not separate their garbage.', 'environment', 1),
    M('This House believes that sargassum is an opportunity, not just a problem.', 'environment', 2), M('This House would ban jet skis in protected bays.', 'environment', 1),
    M('This House believes that Carnival has become too commercial.', 'culture', 2), M('This House would require radio stations to play at least 50% Caribbean music.', 'culture', 1), M('This House believes that explicit song lyrics should be banned from public radio.', 'culture', 3),
    M('This House believes that Creole is a language, not a dialect.', 'culture', 3), M('This House would teach steelpan in every Caribbean primary school.', 'culture', 1), M('This House believes that foreign TV is eroding Caribbean culture.', 'culture', 2),
    M('This House would replace fast food with Caribbean dishes in every school canteen.', 'culture', 1), M('This House would make Emancipation Day the most important national holiday.', 'culture', 2), M('This House believes that Caribbean artists must leave the region to succeed.', 'culture', 2),
    M('This House believes that folk tales like the Anansi stories still matter today.', 'culture', 1), M('This House would ban the use of national festivals in alcohol advertising.', 'culture', 3),
    M('This House believes that cricket is still the Caribbean’s most important sport.', 'sport', 1), M('This House would make physical education an examined subject.', 'sport', 1), M('This House would fund Caribbean athletes to train at home rather than abroad.', 'sport', 2),
    M('This House believes that esports are real sports.', 'sport', 1), M('This House would host a Caribbean Games every two years.', 'sport', 1), M('This House believes that schools focus too much on sport and not enough on academics.', 'sport', 2),
    M('This House would ban energy drinks at school sports events.', 'sport', 1), M('This House believes that female athletes in the Caribbean deserve equal pay and coverage.', 'sport', 2), M('This House would make swimming lessons compulsory for every Caribbean child.', 'sport', 1),
    M('This House believes that T20 cricket is better than Test cricket.', 'sport', 1),
    M('This House would tax sugary drinks to fight non-communicable diseases.', 'health', 2), M('This House would ban fast-food advertising aimed at children.', 'health', 1), M('This House believes that mental health days should count as excused absences.', 'health', 1),
    M('This House would put a full-time counsellor in every Caribbean school.', 'health', 1), M('This House would hold parents responsible for their children’s diet-related illnesses.', 'health', 3), M('This House would ban the sale of vapes to anyone under 21.', 'health', 2),
    M('This House believes that bush medicine deserves a place alongside modern medicine.', 'health', 2), M('This House would require nutrition labels on all street food.', 'health', 2), M('This House believes that every school should teach cooking as a core life skill.', 'health', 1),
    M('This House believes that cyberbullying should be a criminal offence.', 'health', 2),
    M('This House would create a single CARICOM currency.', 'economy', 3), M('This House believes that tourism is a trap for Caribbean economies.', 'economy', 3), M('This House would give every school leaver a small business start-up grant.', 'economy', 2),
    M('This House believes that buying local is a duty, not a choice.', 'economy', 1), M('This House would raise the minimum wage across the Caribbean.', 'economy', 2), M('This House would invest more in the digital economy than in agriculture.', 'economy', 3),
    M('This House would ban foreign ownership of beachfront property.', 'economy', 2), M('This House believes that part-time jobs are good for students.', 'economy', 1), M('This House believes that brain drain is the biggest threat to the Caribbean.', 'economy', 3),
    M('This House would make public transport free for students.', 'economy', 1),
    M('This House would lower the voting age to 16.', 'society', 2), M('This House believes that young people should do one year of national service.', 'society', 2), M('This House believes that every Caribbean nation should have a local head of state.', 'society', 3),
    M('This House believes that free movement within CARICOM should be complete.', 'society', 3), M('This House would ban loud parties after 11 p.m. in residential areas.', 'society', 1), M('This House would require community service hours for graduation.', 'society', 1),
    M('This House believes that respect for elders is declining in the Caribbean.', 'society', 1), M('This House would make voting compulsory.', 'society', 2), M('This House believes that disaster preparedness should be taught in every school.', 'society', 1),
    M('This House would require homeowners by law to hurricane-proof their homes.', 'society', 2), M('This House believes that the media should not name young offenders.', 'society', 2)
  ];

  // Offline opponent: vsProp = said by the opposition against a proposition speaker; vsOpp = said by the proposition against an opposition speaker.
  const REB = {
    education: {
      vsProp: ['That sounds good on paper, but who pays for it? Our schools already struggle with crowded classrooms and too few teachers, and your plan adds a burden without fixing the real problem.', 'You are treating every student the same. What works in a big, well-funded town school will not work in a small rural one, so your change could widen the gap you claim to close.', 'Change for its own sake is risky. The current system produces graduates who succeed across the region and abroad; you have not shown us the evidence that your version would do better.', 'Teachers were not consulted in your plan. Without training and resources, a new policy just becomes another rule on paper that nobody can actually deliver.'],
      vsOpp: ['My opponent is defending a system that is already letting students down. “It has always been this way” is not an argument; the results show that we need change now.', 'The opposition talks about cost, but the cost of doing nothing is higher: students who leave school unprepared cost the country far more in lost jobs and lost talent.', 'You warn about problems, but you offer no alternative. If not this plan, then what? Students cannot wait for a perfect solution that never arrives.', 'Other education systems have made this change and seen better engagement and results. The opposition is choosing fear over evidence.']
    },
    tech: {
      vsProp: ['Banning or restricting technology does not teach responsibility; it just pushes young people to use it secretly, where no adult can guide them.', 'You are blaming the tool instead of how it is used. The same phone that spreads gossip also helps a student in a rural district study for CAPE.', 'Your argument ignores how much Caribbean young people rely on technology for school, family abroad and even small businesses. Taking it away hurts the very people you want to help.', 'Rules like this are almost impossible to enforce. Who checks? Who punishes? Without a plan for enforcement, the motion is just a wish.'],
      vsOpp: ['The opposition says “just teach responsibility”, but the apps are designed by experts to be addictive. Expecting teenagers to resist that alone is unrealistic.', 'My opponent focuses on the benefits and ignores the harm: cyberbullying, sleep loss and fake news are real, and they are hitting Caribbean classrooms right now.', 'You say enforcement is hard, but hard is not impossible. We enforce uniform rules every single day; we can enforce sensible tech rules too.', 'The opposition treats technology as neutral. It is not: companies profit from our attention, and young people need protection from that.']
    },
    environment: {
      vsProp: ['Our economies depend on tourism and trade. Your plan could cost jobs tomorrow for a benefit we may not see for years, and families cannot eat good intentions.', 'Small islands produce a tiny share of global pollution. Why should Caribbean families carry the cost when the biggest polluters keep going?', 'Bans without affordable alternatives simply hurt small vendors and poorer households first. You have not explained what replaces what you remove.', 'Enforcement on small islands is already stretched. A rule nobody can police becomes a rule nobody follows.'],
      vsOpp: ['The opposition talks about jobs, but there will be no tourism jobs if our reefs die and our beaches disappear. The environment IS the economy.', 'My opponent says small islands pollute less. That is exactly why we must lead by example: we suffer first and worst from climate change.', 'Every year we delay, the clean-up costs more. The opposition is not saving money; they are borrowing it from the next generation.', 'Alternatives already exist and are getting cheaper every year. The opposition is defending yesterday’s habits.']
    },
    culture: {
      vsProp: ['Culture is not a museum piece. It grows when people choose it freely, not when the government forces it on them.', 'You are romanticising the past. Young Caribbean people mix local and global culture every day, and that mixing is itself part of our identity.', 'Quotas and bans can backfire: people resent being told what to enjoy, and the culture you want to protect starts to feel like homework.', 'Your plan ignores money. Without funding for artists, studios and festivals, rules alone will not keep our culture alive.'],
      vsOpp: ['The opposition says culture grows freely, but our artists cannot compete with huge foreign budgets on an unequal playing field. Support is not force; it is fairness.', 'My opponent calls it romanticising. I call it remembering who we are. A people who forget their stories will happily tell someone else’s.', 'If we do nothing, the market will decide for us, and the market does not care about calypso, Creole or Anansi.', 'The opposition agrees our culture matters but offers no way to protect it. Agreement without action changes nothing.']
    },
    sport: {
      vsProp: ['Money spent here is money not spent on classrooms and hospitals. You have not shown that this is the best use of limited public funds.', 'You are focusing on the few who become stars. What about the many students for whom this change brings no benefit at all?', 'Sport works best when it is chosen, not forced. Making it compulsory or examinable could kill the joy that makes young people play in the first place.', 'Your argument rests on a few famous success stories. One champion does not prove a whole policy works.'],
      vsOpp: ['The opposition sees sport as a luxury. It is not: it builds health, discipline and teamwork, and it has put the Caribbean on the world map.', 'My opponent worries about cost, but the cost of inactive, unhealthy young people in our health system is far higher.', 'You say only a few benefit. Every child who learns teamwork, resilience and fitness benefits, champion or not.', 'The opposition offers the status quo, and the status quo is our best athletes leaving the region because the support is not here.']
    },
    health: {
      vsProp: ['This is the nanny state. Adults, and the parents of young people, should make their own choices without the government deciding what they eat or do.', 'Your plan punishes poorer families most. A tax or a ban hits the people with the fewest choices, while the wealthy simply pay more.', 'Health problems have many causes: income, stress, access to doctors. Targeting one product or habit will not solve something this complex.', 'You have not shown that this policy works in a Caribbean setting. What works in a large country with big budgets may fail here.'],
      vsOpp: ['The opposition calls it a nanny state, but we already have seat belt laws and nobody complains. Protecting health is a basic job of government.', 'Non-communicable diseases are filling our hospitals and taking our parents and grandparents too early. Doing nothing is the most expensive option.', 'My opponent says the causes are complex. Yes, and that is exactly why we need to act on every cause we can, starting here.', 'The opposition defends “choice”, but children do not choose the adverts aimed at them or the food sold in their canteens.']
    },
    economy: {
      vsProp: ['Good intentions do not balance budgets. You have not told us where the money comes from or what we must cut to pay for it.', 'Markets in small economies are fragile. Your change could scare away investors and cost the very jobs you want to create.', 'You assume everyone benefits equally, but the details matter: who qualifies, who is left out, and who ends up paying?', 'History shows that quick economic fixes often create new problems. You need a gradual plan, not a single dramatic step.'],
      vsOpp: ['The opposition talks about investors, but investors also come to stable, fair, well-educated societies, which is exactly what this motion builds.', 'My opponent wants to wait for the perfect plan. Meanwhile, young Caribbean people are leaving for opportunities abroad.', 'You say it is too expensive. The current system is expensive too; it just hides the cost in unemployment, migration and lost potential.', 'The opposition offers no alternative, only fear. A small economy that never takes a bold step stays small.']
    },
    society: {
      vsProp: ['You are forcing a one-size-fits-all rule on a diverse society. Freedom means trusting people to make their own decisions.', 'This sounds fair in theory, but in practice it could be used unfairly and hurt the very communities it claims to protect.', 'Your argument assumes young people are ready for this responsibility right now. Where is the evidence, and what preparation comes first?', 'Laws do not change attitudes overnight. Without education and community support, this motion will look good on paper and fail in real life.'],
      vsOpp: ['The opposition calls it force. Every society has shared rules; the question is whether this rule makes our communities safer and fairer, and it does.', 'My opponent says the timing is wrong. It is always “not yet” for change. The time to protect people is before the crisis, not after.', 'You doubt young people. Yet young Caribbean people already work, care for families and lead campaigns. Give them the respect they have earned.', 'The opposition agrees there is a problem but proposes nothing. Silence is a choice too, and it protects no one.']
    }
  };

  const RALLY = [
    ['Students should not have homework because they are already in school for seven hours.', ['Homework spaced through the week helps students remember what they learned; the fix is less but better homework, not a total ban.', 'You just hate doing work.', 'Teachers had homework when they were young too.', 'Seven hours is not that long.'], 'It accepts the concern, then answers it with a reason (spaced practice) and a better solution.'],
    ['Tourism is good for the Caribbean because it brings in money.', ['Much of that money leaks out to foreign-owned hotels and imported food, so the real question is how much stays in local hands.', 'Tourists are rude.', 'Money is not everything in life.', 'My cousin works in a hotel and hates it.'], 'It challenges the claim’s logic (money in is not the same as money kept) instead of attacking tourists or using one anecdote.'],
    ['Banning phones in class will stop cyberbullying.', ['Most cyberbullying happens after school on social media, so a classroom ban would barely touch it; education and reporting systems would.', 'Phones are expensive.', 'That is a silly idea from old people.', 'Students will just bring two phones.'], 'It shows the cause and the proposed fix do not match, and offers a better fix.'],
    ['Creole has no place in the classroom because it is broken English.', ['Linguists classify Creole as a rule-governed language with its own grammar, and using it to explain ideas can help students master Standard English.', 'Everybody speaks Creole at home anyway, so stop complaining.', 'You speak Creole too.', 'English is boring.'], 'It corrects the false premise with expert evidence (ethos and logos) and links back to learning.'],
    ['Plastic bans hurt small vendors who rely on cheap packaging.', ['A phased ban with support for alternatives protects vendors, and they also lose when plastic waste damages the tourism that buys their goods.', 'Vendors should just get a better job.', 'Plastic is ugly.', 'Other countries ban plastic, so we must too.'], 'It acknowledges the vendors, offers a solution and turns the argument: plastic hurts vendors too.'],
    ['Carnival is just a big party with no cultural value.', ['Carnival grew out of emancipation celebrations and keeps alive calypso, mas and steelpan, so it carries real history.', 'You probably cannot dance.', 'Parties are fun, so there is nothing wrong with them.', 'Carnival causes traffic jams.'], 'It directly disproves “no cultural value” with historical evidence.'],
    ['Video games make teenagers violent.', ['Large studies have not found a reliable link between gaming and real violence; home environment and other factors matter far more.', 'Games are expensive anyway.', 'My brother plays games and he is fine.', 'Old people always blame new things.'], 'It uses research, not one example or an attack on older people.'],
    ['We should lower the voting age to 16 because young people are affected by government decisions.', ['Being affected is not enough on its own, since children are affected too; the real test is civic readiness, which better civics teaching should build first.', '16-year-olds are immature.', 'Voting is boring.', 'Nobody votes anyway.'], 'It tests the reasoning (the same logic would apply to 8-year-olds) and suggests what is really needed.'],
    ['Sugar taxes do not work; people just pay more.', ['Where sugar taxes have been tried, sales of sugary drinks have fallen, and the money raised can fund health education.', 'Sugar is bad for you.', 'You drink soda every day.', 'Taxes are always unfair.'], 'It answers the exact claim (“they do not work”) with evidence that they do.'],
    ['Uniforms stop students from expressing themselves.', ['Students express themselves through ideas, clubs and talents, and uniforms remove the pressure to compete over expensive clothes, which helps poorer families.', 'Uniforms look nice.', 'Rules are rules.', 'If you do not like it, go to another school.'], 'It redefines self-expression and adds a fairness benefit, instead of just restating the rule.'],
    ['Online friendships are fake because you never meet the person.', ['Friendship is about trust and support, not location; many students on small islands find real support online from people who share their interests.', 'You have no real friends.', 'The internet is the future.', 'Everyone has online friends now.'], 'It challenges the definition of friendship and gives a relatable Caribbean example.'],
    ['Free university education would bankrupt Caribbean governments.', ['Several Caribbean governments have already funded tuition schemes for nationals, and bonding agreements mean graduates repay the investment by working at home.', 'Education is a human right.', 'Rich people always say that.', 'University is too hard anyway.'], 'It uses regional precedent and a practical safeguard to answer the cost worry.'],
    ['Cruise tourism is great because thousands of visitors come every day.', ['Cruise passengers spend far less per person than stay-over visitors, while the ships add pressure on ports, reefs and waste systems.', 'Cruise ships are ugly.', 'I get seasick.', 'Everybody loves cruises.'], 'It weighs the numbers properly: more visitors does not mean more benefit.'],
    ['Schools should drop PE to make more time for exam subjects.', ['Physical activity improves concentration and mental health, so a little PE can actually raise exam performance.', 'PE is fun.', 'Exams are stressful.', 'Athletes earn more than doctors.'], 'It turns the argument: PE supports the very goal the claim cares about.'],
    ['Influencers are good role models because they are successful.', ['Success measured in followers is not the same as good values, and some influencers promote products without saying they were paid.', 'Influencers are lazy.', 'Everyone wants to be famous.', 'I do not use that app.'], 'It separates “successful” from “good role model” and gives a concrete example.'],
    ['Hurricane preparation is the government’s job, not homeowners’.', ['Governments cannot strengthen every roof in the hours before a storm; homeowners who shutter windows and secure roofs protect their own families first.', 'Hurricanes are scary.', 'The government never does anything.', 'My house survived the last storm, so houses are fine.'], 'It shows why responsibility must be shared, using practical reasoning.'],
    ['Steelpan is outdated; young people want modern music.', ['Steelpan is used in modern soca, jazz and pop, and youth pan sides compete every Carnival, so it is still evolving.', 'Modern music is noise.', 'You do not know anything about music.', 'Steelpan is loud.'], 'It disproves “outdated” with current examples.'],
    ['Students with part-time jobs fall behind in school.', ['It depends on hours: a few hours a week builds responsibility and money skills; long shifts are the problem, and those can be limited.', 'Working is good.', 'Lazy students make excuses.', 'Money is important.'], 'It refines an over-general claim and identifies the real cause.'],
    ['Using AI for schoolwork is cheating, full stop.', ['Using AI to brainstorm or check grammar is different from submitting work you did not write; clear rules can separate learning support from cheating.', 'AI is the future, so get used to it.', 'Teachers use computers too.', 'Robots will take over anyway.'], 'It breaks the “full stop” by drawing a clear, reasoned distinction.'],
    ['Brain drain does not matter because migrants send money home.', ['Remittances help families, but they do not replace the nurses, teachers and doctors the region loses, whose training was paid for at home.', 'Migrants are traitors.', 'Everyone wants to leave.', 'Money solves everything.'], 'It concedes part of the point, then shows what the claim leaves out.'],
    ['Local radio does not matter any more; everyone streams.', ['When a hurricane knocks out power and internet, battery radio is often the only way people hear official warnings.', 'Radio is old-fashioned.', 'Streaming is expensive.', 'I like radio.'], 'It gives a strong, specific Caribbean counter-example.'],
    ['Social media should be banned for under-16s because it harms mental health.', ['A ban is hard to enforce and pushes teens to lie about their age; digital literacy and stronger safety settings tackle the harm directly.', 'Teenagers love social media.', 'You are just old.', 'Banning things never works.'], 'It accepts the harm but argues for a more workable solution.'],
    ['Imported food is better because it is cheaper.', ['It may be cheaper at the till, but every imported dollar leaves the economy, and losing our farmers makes us depend on prices we cannot control.', 'Local food tastes better.', 'Imported food is for snobs.', 'My grandmother grew her own food.'], 'It looks at the hidden, long-term cost (logos) instead of taste or name-calling.'],
    ['Single-sex schools get better results, so they are better.', ['Many top single-sex schools are also selective, so their results may reflect who they admit, not the fact that they are single-sex.', 'Boys and girls should mix.', 'Single-sex schools are old-fashioned.', 'My school is mixed and it is fine.'], 'It spots a hidden cause (selection) behind the statistic.'],
    ['Compulsory national service would teach young people discipline.', ['Discipline can be built through cadets, clubs and community programmes without forcing a year away from study or work.', 'Young people hate rules.', 'The army is dangerous.', 'Discipline is overrated.'], 'It agrees with the goal but offers a less costly route to it.'],
    ['Esports are not real sports because there is no physical effort.', ['Chess is recognised as a sport by many bodies, and esports demand strategy, teamwork and split-second reflexes, which is what competition rewards.', 'Gamers are lazy.', 'Esports make a lot of money.', 'Sport is boring.'], 'It challenges the definition with a strong comparison.'],
    ['Fast food is fine in moderation, so advertising it to children is harmless.', ['Children are the group least able to practise moderation, and adverts are designed to make them want more, not less.', 'Fast food tastes good.', 'You eat fast food too.', 'Adverts are annoying.'], 'It shows the “moderation” premise does not apply to the audience being targeted.'],
    ['Creole should not be used in the media because it makes the country look uneducated.', ['Creole reaches listeners in the language they understand best, and respected broadcasters switch codes to suit their audience.', 'Who cares what other countries think?', 'You cannot even speak proper English.', 'The media is all fake news anyway.'], 'It links language choice to audience and register, which is exactly Module 2 and Module 3 thinking.'],
    ['Homework teaches responsibility.', ['Responsibility can be taught in many ways; when homework is excessive, students who care for siblings or work after school are punished, not taught.', 'Responsibility is boring.', 'Teachers give homework to avoid teaching.', 'I never do homework and I am fine.'], 'It accepts the value but shows the policy can work against it.'],
    ['Renewable energy is too expensive for small islands.', ['Small islands pay some of the highest electricity prices in the world because they import diesel; solar and wind cut those costs over time.', 'Solar panels look ugly.', 'The sun is free.', 'Big countries pollute more anyway.'], 'It turns the cost argument around with a fact about current costs.'],
    ['Reality TV is harmless entertainment.', ['Shows that reward conflict and humiliation teach young viewers that cruelty gets attention, which shapes how they treat each other online.', 'Reality TV is fake.', 'Only boring people watch it.', 'TV rots your brain.'], 'It explains a mechanism for harm instead of insulting viewers.'],
    ['Compulsory voting forces uninformed people to vote.', ['Where voting is compulsory, more people pay attention to policy, and voters can still spoil their ballot if they choose.', 'Voting is a duty.', 'People who do not vote are lazy.', 'Politicians are all the same.'], 'It addresses “uninformed” directly and answers the freedom worry.'],
    ['Sargassum is just a nuisance.', ['Caribbean entrepreneurs are already turning sargassum into fertiliser, building blocks and fuel, so it can be a resource as well as a problem.', 'Sargassum smells bad.', 'Tourists hate it.', 'It is nature, so leave it alone.'], 'It disproves “just a nuisance” with real regional innovation.'],
    ['Paying students for attendance will stop truancy.', ['Money treats the symptom; students skip because of problems like transport costs or bullying, which payment for turning up will not fix.', 'Money is the root of all evil.', 'Students are greedy.', 'Schools are broke.'], 'It identifies the root causes the plan ignores.'],
    ['Cricket is dying in the Caribbean.', ['T20 leagues sell out stadiums across the region, which suggests the sport is changing format, not dying.', 'Cricket is too slow.', 'Football is better.', 'My father loves cricket.'], 'It answers with evidence and reframes the trend.'],
    ['Schools do not need counsellors; students can talk to their parents.', ['Not every student has a parent they can safely talk to, and problems like anxiety need trained, confidential support.', 'Parents are always busy.', 'Counsellors are expensive.', 'Talking does not help.'], 'It shows the assumption does not hold for everyone and explains why expertise matters.'],
    ['Foreign TV shows are destroying Caribbean culture.', ['Caribbean culture has always absorbed and reshaped outside influences; the bigger issue is the lack of funding for local content to compete.', 'Foreign shows are better made.', 'You watch them too.', 'Culture changes anyway, so who cares?'], 'It reframes the problem and points to a real cause.'],
    ['Raising the minimum wage will force businesses to close.', ['Gradual increases give businesses time to adjust, and workers with more money spend it in local shops, which supports those same businesses.', 'Business owners are greedy.', 'Everyone deserves more money.', 'Prices go up every year anyway.'], 'It offers a mechanism (gradual rise, local spending) rather than an insult.'],
    ['Learning Spanish is pointless when English is the global language.', ['The Caribbean’s close neighbours, from Venezuela and Colombia to Cuba and the Dominican Republic, speak Spanish, so it opens trade and tourism jobs next door.', 'Spanish is hard.', 'English speakers are lazy.', 'Music in Spanish is popular.'], 'It answers with geography and jobs, very specific to the region.'],
    ['The media should name young offenders to protect the public.', ['Naming a child can follow them for life and make rehabilitation harder, while police and courts can protect the public without publicity.', 'Criminals deserve shame.', 'Newspapers just want sales.', 'Young people make mistakes.'], 'It weighs the harm against the stated benefit and shows another way to achieve it.'],
    ['School should start later because teenagers need more sleep.', ['A later start clashes with parents’ work hours and bus routes; cutting late-night screen time may help sleep more without disrupting families.', 'Teenagers are lazy.', 'Sleep is for the weak.', 'I wake up early and I am fine.'], 'It weighs practical costs and offers an alternative that targets the same goal.'],
    ['Group chats have made family communication worse.', ['Group chats keep families across islands and the diaspora in daily contact; the problems come from how we use them, like forwarding unchecked voice notes.', 'Group chats are noisy.', 'Old people do not understand phones.', 'Everyone uses them, so they must be good.'], 'It separates the tool from the misuse and gives a strong benefit.']
  ];

  const FALL = {
    adhom: ['Ad hominem', 'Attacks the person instead of their argument.'],
    straw: ['Straw man', 'Twists the other side’s argument into a weaker, extreme version that is easy to knock down.'],
    slope: ['Slippery slope', 'Claims one small step will lead to an extreme chain of events, without proof.'],
    band: ['Bandwagon', 'Says something is right or good because many people do it or believe it.'],
    dilemma: ['False dilemma', 'Presents only two options when more exist.'],
    hasty: ['Hasty generalisation', 'Draws a big conclusion from too few examples.'],
    herring: ['Red herring', 'Distracts from the issue with an unrelated topic.'],
    auth: ['Appeal to authority', 'Relies on someone famous who is not an expert on the issue.'],
    circ: ['Circular reasoning', 'Uses the conclusion as its own reason.'],
    posthoc: ['Post hoc', 'Assumes that because B happened after A, A caused B.']
  };
  const FF = [
    ['Don’t listen to Keisha’s argument about protecting the reef. She can’t even swim.', 'adhom', 'Keisha’s swimming ability has nothing to do with whether her reef argument is sound.'],
    ['Why should we take Mr. Charles’s budget ideas seriously? Look at the old car he drives.', 'adhom', 'The car says nothing about the budget ideas. Judge the plan, not the person.'],
    ['Of course Andre wants a later school start. He is the laziest boy in Form 5.', 'adhom', 'Labelling Andre lazy avoids dealing with his actual reasons.'],
    ['You cannot trust that climate study. The scientist who wrote it is from a rich country.', 'adhom', 'Where the scientist is from does not make the data wrong.'],
    ['Teacher: “We should limit phone use during lessons.” Student: “So you want to take away all our phones and cut us off from the world?”', 'straw', 'Limiting use in lessons is not the same as taking away all phones. The student exaggerated the claim.'],
    ['The council wants to regulate beach vendors. Clearly, they want to drive every local person off the beach.', 'straw', 'Regulation has been twisted into an extreme plan nobody proposed.'],
    ['My opponent says we should use some Creole in class. So she wants to throw out English completely!', 'straw', '“Some Creole” became “no English”, a weaker position that is easier to attack.'],
    ['If we let students wear coloured shoes on Fridays, soon they will want no uniform, then no rules, and the school will fall apart.', 'slope', 'There is no evidence that one small freedom leads to total collapse.'],
    ['If the island allows one more hotel on the bay, next it will be ten hotels, and soon locals will not be able to see the sea at all.', 'slope', 'One hotel does not automatically lead to ten. Each step needs its own proof.'],
    ['If you miss one lime with your friends, they will stop inviting you, and you will end up with no friends at all.', 'slope', 'An extreme chain of events is predicted from one small action.'],
    ['Everybody in the class is going to the fete, so it must be a good idea.', 'band', 'Popularity does not prove something is wise.'],
    ['This soca song has twenty million views, so it has to be the best song of the season.', 'band', 'Views measure popularity, not quality.'],
    ['All the other islands are building cruise piers, so we need one too.', 'band', 'What other islands do is not a reason in itself; the plan needs its own evidence.'],
    ['Everyone says that school is the best on the island, so it must be.', 'band', 'Repeating a popular opinion is not evidence.'],
    ['Either we build the new airport or our economy will collapse.', 'dilemma', 'There are many other ways to support the economy. Only two options are offered.'],
    ['You are either with the team on this or you are against us.', 'dilemma', 'You can support the team and still disagree on one decision.'],
    ['Students can either study science or have no future.', 'dilemma', 'Plenty of careers come from the arts, business and trades. The choice is false.'],
    ['Either you buy the newest phone or you will be left out of everything.', 'dilemma', 'There are many options in between. This is a classic advertising trick.'],
    ['I met two rude tourists at the port this morning. Tourists are so disrespectful.', 'hasty', 'Two people cannot represent thousands of visitors.'],
    ['My cousin dropped out of university and is rich now, so university is a waste of time.', 'hasty', 'One success story does not prove a general rule.'],
    ['The last two Caribbean films I saw were boring, so Caribbean movies are just not good.', 'hasty', 'Two films are far too small a sample to judge a whole industry.'],
    ['Why worry about plastic in the sea when so many young people cannot find jobs?', 'herring', 'Jobs matter, but they do not answer the question about plastic. The topic has been switched.'],
    ['Teacher: “Why is your assignment late?” Student: “Miss, have you seen how hot these classrooms are? We need air conditioning!”', 'herring', 'The heat in the classroom distracts from the late assignment.'],
    ['Yes, the road repairs are over budget, but think of how beautiful the island looked at Carnival.', 'herring', 'Carnival decorations have nothing to do with the road budget.'],
    ['A famous cricketer says this energy drink improves your memory, so it must be true.', 'auth', 'A cricketer is not an expert on memory or nutrition.'],
    ['A popular influencer said that sunscreen is dangerous, so I stopped wearing it.', 'auth', 'Popularity is not medical expertise. Check what health experts say.'],
    ['The actor who plays a doctor on TV recommends this cough syrup, so it must be the best.', 'auth', 'Playing a doctor is not being a doctor.'],
    ['Calypso is the best music because no other music is as good as calypso.', 'circ', 'The reason simply repeats the conclusion in different words.'],
    ['This news site is trustworthy because it says it only publishes the truth.', 'circ', 'A source cannot prove its own reliability by vouching for itself.'],
    ['He is the best captain because he leads the team better than anyone else.', 'circ', '“Best captain” and “leads better than anyone” are the same claim. No real reason is given.'],
    ['I wore my lucky wristband and we won the match, so the wristband made us win.', 'posthoc', 'Winning after wearing the wristband does not mean the wristband caused the win.'],
    ['Since the new principal arrived, it has rained more. She must have brought the bad weather.', 'posthoc', 'The timing is a coincidence. The principal cannot cause rainfall.'],
    ['A new fast-food outlet opened in town, and then exam results dropped. Fast food made students fail.', 'posthoc', 'Many things could explain lower results. Sequence alone is not proof of cause.']
  ];

  const APB = { ethos: ['Ethos', '🎓', 'credibility'], pathos: ['Pathos', '❤️', 'emotion'], logos: ['Logos', '🧠', 'logic & evidence'], kairos: ['Kairos', '⏰', 'timing (bonus)'] };
  const APPEALS = [
    ['As a nurse who has worked at the general hospital for fifteen years, I have seen what diabetes does to families.', 'ethos', 'The speaker builds trust through experience and expertise.'],
    ['The Caribbean Public Health Agency, the region’s leading health body, recommends this policy.', 'ethos', 'It borrows credibility from a respected expert organisation.'],
    ['I have fished these waters for thirty years; I know when the reef is in trouble.', 'ethos', 'Long experience makes the speaker credible.'],
    ['As your class president, I have always kept my promises, and I will keep this one.', 'ethos', 'The speaker points to their own track record and character.'],
    ['Meteorologists at the national weather office have confirmed the storm’s path.', 'ethos', 'It relies on the authority of qualified experts.'],
    ['Our school has won the regional debating title three times; we know what good preparation looks like.', 'ethos', 'Past achievement is used to establish credibility.'],
    ['As a student who takes the bus every day, I understand this problem first-hand.', 'ethos', 'First-hand experience builds the speaker’s credibility.'],
    ['Respected linguists at the University of the West Indies have studied Creole for decades.', 'ethos', 'It draws on the authority of specialist researchers.'],
    ['Speaking as someone who failed this exam once and then earned a Grade One, I know these study tips work.', 'ethos', 'Personal experience of success makes the advice credible.'],
    ['Imagine your little sister walking home in the dark because the streetlights were never fixed.', 'pathos', 'It creates fear and protectiveness through a vivid image.'],
    ['Think of the turtles that return to our beaches every year, only to find plastic where their nests should be.', 'pathos', 'It stirs sadness and care for the turtles.'],
    ['Our grandparents built this island with their bare hands. Will we let their sacrifice be forgotten?', 'pathos', 'It appeals to pride, loyalty and respect for elders.'],
    ['No child should go to bed hungry in a country as rich in land as ours.', 'pathos', 'It appeals to compassion and a sense of injustice.'],
    ['Picture the families who lost everything in the hurricane, standing in the rain with nowhere to go.', 'pathos', 'Vivid imagery creates sympathy.'],
    ['Feel the pride when our flag rises in the Olympic stadium.', 'pathos', 'It appeals to national pride.'],
    ['Every time a young person leaves for good, a mother at the airport cries.', 'pathos', 'An emotional image of loss and family.'],
    ['Do we really want our children to grow up never hearing the steelpan?', 'pathos', 'A rhetorical question aimed at cultural love and fear of loss.'],
    ['Remember how scared you felt the first night the power went out during the storm?', 'pathos', 'It brings back a shared emotional memory.'],
    ['Households that installed solar panels cut their electricity bills by about a third within two years.', 'logos', 'It uses a statistic as evidence.'],
    ['If 200 students each recycle three bottles a school day, we keep over 100,000 bottles out of the landfill each year.', 'logos', 'A step-by-step calculation persuades through logic.'],
    ['Three out of four students surveyed skip breakfast, which helps explain low energy in morning classes.', 'logos', 'Survey data is used to support a reasoned conclusion.'],
    ['Because the bridge is the only road to the hospital, a single flood can cut off the whole district.', 'logos', 'Cause-and-effect reasoning.'],
    ['The data shows that schools with full-time counsellors have lower dropout rates.', 'logos', 'It persuades with evidence and data.'],
    ['Importing food costs the region billions of dollars a year; growing more at home keeps that money here.', 'logos', 'Economic reasoning with figures.'],
    ['If the bus fare rises by two dollars, a student who travels ten times a week pays twenty dollars more.', 'logos', 'A clear if-then calculation.'],
    ['Studies show that teenagers who sleep eight hours score better in tests.', 'logos', 'It relies on research findings.'],
    ['With hurricane season starting next week, now is the time to check your roof.', 'kairos', 'It uses the timing of the moment to create urgency.'],
    ['Exams are only six weeks away, so tonight’s revision session matters more than ever.', 'kairos', 'The approaching deadline makes the message urgent.'],
    ['Carnival is next month; this is the moment to remind revellers to stay hydrated.', 'kairos', 'It ties the message to an upcoming event.'],
    ['The budget is debated in Parliament tomorrow, so call your representative today.', 'kairos', 'Timing makes action now matter.'],
    ['Registration closes on Friday. Sign up now or wait another year.', 'kairos', 'A deadline creates the right moment to act.'],
    ['With fuel prices at a record high this month, there has never been a better time to switch to solar.', 'kairos', 'Current events make the argument timely.']
  ];

  const SUBJECTS = ['Rainy season', 'My grandmother’s kitchen', 'Mangoes', 'Carnival costumes', 'Sargassum', 'The perfect lime', 'Bus stops', 'Hurricane shutters', 'Johnny cakes', 'Group chats', 'Being late', 'The steelpan', 'Cricket', 'School shoes', 'Sunrise at the beach', 'Roti', 'Lizards', 'Power cuts', 'Ferry rides', 'Coconut water', 'Phone batteries', 'The school canteen', 'Dominoes', 'Market day', 'Sunday lunch', 'Kites at Easter', 'Flip-flops', 'The best island', 'Calypso', 'Fishing boats', 'Snow (which I have never seen)', 'The national bird', 'Traffic', 'Duty-free shopping', 'Anansi', 'Breadfruit', 'Exam season', 'Rum cake', 'Cruise ships', 'My dream job'];

  const RUBRIC = [
    ['content', 'Content', 'Relevant ideas that answer the topic', 'Brainstorm three angles (people, money, future) in your prep time so you never run out of ideas.', 'Strong, relevant ideas. Keep adding one concrete Caribbean example per point.'],
    ['org', 'Organisation', 'Clear Point → Reason → Example → Close', 'Say your point in the first sentence, then signpost: “The reason is…”, “For example…”, “So…”.', 'Easy to follow. Your structure guided the listener.'],
    ['reg', 'Register', 'Language suits the audience and purpose', 'Profile your audience first: who are they, what do they know, how formal is the setting? Keep Creole for deliberate effect.', 'Your register matched the audience well.'],
    ['eye', 'Eye contact', 'Looks up and around the room', 'Glance at your card, then look up for a whole sentence. Pick three friendly faces in different parts of the room.', 'Great connection with the audience.'],
    ['pace', 'Pace', 'Not too fast, with pauses for effect', 'Slow down at your key point and pause for one second after it. Silence is powerful.', 'Well-controlled pace with useful pauses.'],
    ['vol', 'Volume', 'Clear and audible to the back row', 'Speak to the person at the back of the room. Breathe from your stomach, not your throat.', 'Clear, confident volume.'],
    ['fill', 'Fillers', 'Few “um”, “like”, “you know”', 'Replace fillers with a short pause. Practise by recording yourself and counting every “um”.', 'Very few fillers. Your pauses sounded deliberate.'],
    ['gest', 'Gestures & posture', 'Open, purposeful body language', 'Stand tall with both feet planted. Use one open-hand gesture for each main point and keep your hands out of your pockets.', 'Natural, purposeful body language.']
  ];

  const DEF_SEGS = [['Opening speech · Proposition', 0, 3], ['Opening speech · Opposition', 1, 3], ['Rebuttal · Proposition', 0, 2], ['Rebuttal · Opposition', 1, 2], ['Closing · Opposition', 1, 2], ['Closing · Proposition', 0, 2]];
  const JUDGE = [['matter', 'Matter (content & evidence)'], ['manner', 'Manner (delivery & register)'], ['method', 'Method (structure & signposting)'], ['rebut', 'Rebuttal & POIs'], ['team', 'Teamwork & time']];

  const TABS = [
    ['hub', '🎤', 'Arena'], ['spin', '🎡', 'Impromptu Spin'], ['duel', '⚔️', 'Debate Duel'], ['rally', '🏓', 'Rebuttal Rally'], ['fallacy', '🕵️', 'Fallacy Finder'],
    ['appeal', '🗂️', 'Appeal Sort'], ['minute', '⏱️', 'Sixty-Second Stand'], ['floor', '🏛️', 'Debate Floor'], ['coach', '🧭', 'Coach’s Corner']
  ];

  /* ------------------------------------------------------------------ HELPERS ------------------------------------------------------------------ */
  let A = null; // api, refreshed on every render/mount/click
  const E = s => A ? A.esc(String(s == null ? '' : s)) : String(s == null ? '' : s);
  const $ = s => document.querySelector(s);
  const words = s => (String(s || '').toLowerCase().match(/[a-z0-9'’%]+/g) || []);
  const rnd = n => Math.floor(Math.random() * n);
  const pick = arr => arr[rnd(arr.length)];
  const shuf = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const RM = () => { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } };
  const P = () => { const S = A.S; S.speakup = S.speakup || {}; return S.speakup; };
  const saveP = () => { try { A.save(); } catch (e) { } };
  const rootOn = () => !!document.querySelector('[data-su-root]');
  const curTab = () => { const r = document.querySelector('[data-su-root]'); return r ? r.getAttribute('data-su-root') : null; };
  function announce(msg) { const el = $('#su-live'); if (el) { el.textContent = ''; setTimeout(() => { const e2 = $('#su-live'); if (e2) e2.textContent = msg; }, 30); } }
  function rerender(tab) { if (A && curTab() === tab) A.render(); }
  function coins(n, label) { try { A.reward(Math.max(1, Math.min(10, Math.round(n))), label); } catch (e) { } }

  /* ---------- WebAudio ---------- */
  let AC = null;
  function ac() {
    if (A && A.S && A.S.sound === false) return null;
    try { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = AC || new C(); if (AC.state === 'suspended' && AC.resume) AC.resume(); return AC; } catch (e) { return null; }
  }
  function tone(f, dur, type, vol, delay, f2) {
    const c = ac(); if (!c) return;
    try {
      const t = c.currentTime + (delay || 0), o = c.createOscillator(), g = c.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
    } catch (e) { }
  }
  const SND = {
    tick() { tone(880, 0.1, 'square', 0.05); },
    warn() { tone(660, 0.18, 'triangle', 0.12); },
    bell(n) { for (let i = 0; i < (n || 1); i++) { tone(1318, 1.4, 'sine', 0.22, i * 0.42); tone(2637, 0.8, 'sine', 0.06, i * 0.42); tone(1975, 1.1, 'sine', 0.05, i * 0.42); } },
    ding() { tone(1568, 0.6, 'sine', 0.18); tone(3136, 0.3, 'sine', 0.04); },
    buzz() { tone(150, 0.45, 'sawtooth', 0.14); tone(155, 0.45, 'square', 0.06); },
    good() { tone(784, 0.12, 'triangle', 0.14); tone(1175, 0.2, 'triangle', 0.14, 0.1); },
    bad() { tone(300, 0.25, 'triangle', 0.12, 0, 200); },
    whoosh() { tone(400, 0.5, 'sawtooth', 0.04, 0, 1200); },
    whistle() { tone(2200, 0.6, 'sine', 0.15, 0, 2600); tone(2250, 0.6, 'sine', 0.08, 0.02, 2650); }
  };

  /* ---------- One shared countdown engine ---------- */
  const TM = { key: null, tab: null, total: 0, left: 0, run: false, last: 0, onEnd: null, ended: false, overtime: false, marks: [], sec: null, onPaint: null };
  let IV = null;
  function tStart(tab, key, secs, onEnd, opt) {
    opt = opt || {};
    Object.assign(TM, { key, tab, total: secs * 1000, left: secs * 1000, run: true, last: Date.now(), onEnd, ended: false, overtime: !!opt.overtime, marks: (opt.marks || []).map(m => Object.assign({ done: false }, m)), sec: null, onPaint: opt.onPaint || null });
    ensureIv(); paint();
  }
  function tSet(tab, key, secs, opt) { tStart(tab, key, secs, opt && opt.onEnd, opt); TM.run = false; paint(); }
  function tStop() { TM.run = false; TM.key = null; TM.onEnd = null; TM.onPaint = null; if (IV) { clearInterval(IV); IV = null; } }
  function tPause() { if (TM.run) { tickNow(); TM.run = false; paint(); } }
  function tResume() { if (TM.key && !TM.run && !(TM.ended && !TM.overtime)) { TM.run = true; TM.last = Date.now(); ensureIv(); paint(); } }
  function ensureIv() { if (!IV) IV = setInterval(tickNow, 200); }
  function tickNow() {
    if (!TM.run) { if (IV) { clearInterval(IV); IV = null; } return; }
    if (!rootOn() || curTab() !== TM.tab) { TM.run = false; return; }
    const n = Date.now(); TM.left -= n - TM.last; TM.last = n;
    const s = Math.ceil(TM.left / 1000);
    if (s !== TM.sec) {
      TM.sec = s;
      if (s > 0 && s <= 3) SND.tick(); else if (s === 10 && TM.total > 20000) { SND.warn(); announce('Ten seconds left'); }
    }
    TM.marks.forEach(m => { if (!m.done && TM.left <= m.at) { m.done = true; try { m.fn(); } catch (e) { } } });
    if (TM.left <= 0 && !TM.ended) {
      TM.ended = true;
      if (!TM.overtime) { TM.left = 0; TM.run = false; }
      const f = TM.onEnd; paint(); if (f) { try { f(); } catch (e) { } }
      return;
    }
    paint();
  }
  const fmt = ms => { const neg = ms < 0, s = neg ? Math.floor(-ms / 1000) : Math.ceil(ms / 1000); return (neg ? '+' : '') + Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const CIRC = 2 * Math.PI * 52;
  function paint() {
    document.querySelectorAll('[data-su-t]').forEach(el => {
      if (el.getAttribute('data-su-t') !== TM.key) return;
      const frac = TM.total ? Math.max(0, Math.min(1, TM.left / TM.total)) : 1;
      const num = el.querySelector('.su-tval'); if (num) num.textContent = fmt(TM.left);
      const ring = el.querySelector('.su-ring'); if (ring) ring.setAttribute('stroke-dashoffset', String(CIRC * (1 - frac)));
      el.classList.toggle('warn', TM.left > 0 && TM.left <= 10000);
      el.classList.toggle('over', TM.left <= 0);
      el.classList.toggle('paused', !TM.run);
      el.setAttribute('aria-label', 'Timer ' + fmt(TM.left) + (TM.run ? '' : ', paused'));
    });
    document.querySelectorAll('[data-su-tbtn]').forEach(b => { if (b.getAttribute('data-su-tbtn') === TM.key) b.textContent = TM.run ? '⏸ Pause' : '▶ Resume'; });
    if (TM.onPaint) { try { TM.onPaint(); } catch (e) { } }
  }
  function timerHTML(key, secs, sub, cls) {
    const active = TM.key === key, left = active ? TM.left : secs * 1000, total = active ? TM.total : secs * 1000;
    const frac = total ? Math.max(0, Math.min(1, left / total)) : 1;
    return `<div class="su-timer ${cls || ''}" data-su-t="${key}" role="timer" aria-label="Timer ${fmt(left)}"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="su-ring-bg" cx="60" cy="60" r="52"/><circle class="su-ring" cx="60" cy="60" r="52" stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC * (1 - frac)}"/></svg><div class="su-tnum"><span class="su-tval">${fmt(left)}</span>${sub ? `<small>${E(sub)}</small>` : ''}</div></div>`;
  }
  const pauseBtn = key => `<button type="button" class="btn ghost" data-px="tpause" data-su-tbtn="${key}">${TM.key === key && !TM.run ? '▶ Resume' : '⏸ Pause'}</button>`;

  /* ------------------------------------------------------------------ 1. IMPROMPTU SPIN ------------------------------------------------------------------ */
  const SP = { phase: 'wheel', rot: 0, cat: null, topic: '', prep: 45, speak: 90, plan: { p: '', r: '', e: '', c: '' }, mode: 'self', rate: {}, manualF: 0, liveF: false, sr: { rec: null, count: 0, note: '' }, rec: { state: 'idle', mr: null, url: '', note: '', chunks: [] }, spoke: 0, result: null };
  function wheelSVG() {
    const n = CATS.length, r = 100, cx = 100, cy = 100; let h = '';
    CATS.forEach((c, i) => {
      const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2, am = (a0 + a1) / 2;
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      h += `<path d="M${cx},${cy} L${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 0 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z" fill="${c.c}" stroke="#0a1638" stroke-width="2"/>`;
      const tx = cx + r * 0.66 * Math.cos(am), ty = cy + r * 0.66 * Math.sin(am);
      h += `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" font-size="24" text-anchor="middle" dominant-baseline="central">${c.e}</text>`;
    });
    return `<svg class="su-wheel ${RM() ? '' : 'spin'}" id="su-wheel" viewBox="0 0 200 200" style="transform:rotate(${SP.rot}deg)" aria-hidden="true">${h}</svg>`;
  }
  function spinRender() {
    let h = '';
    if (SP.phase === 'wheel' || SP.phase === 'spinning') {
      h += `<div class="su-panel"><span class="su-lbl">Game 1 · Impromptu Spin</span><h2>Spin for a surprise topic</h2>
        <p class="hint">Real impromptu speaking: you get a topic, a short prep window and then the floor is yours. Choose prep and speaking times, then spin.</p>
        <div class="su-wheelbox"><div class="su-pointer" aria-hidden="true"></div>${wheelSVG()}<div class="su-hubcap" aria-hidden="true">🎤</div></div>
        <div class="row" style="justify-content:center;margin-top:16px"><button type="button" class="btn gold" data-px="sp-spin" ${SP.phase === 'spinning' ? 'disabled' : ''} style="font-size:1.1rem;padding:12px 26px">🎡 ${SP.phase === 'spinning' ? 'Spinning…' : 'Spin the wheel'}</button></div>
        <p class="hint" style="margin-top:12px">Or choose a category:</p>
        <div class="chips" role="group" aria-label="Topic categories">${CATS.map((c, i) => `<button type="button" class="chip" data-px="sp-cat" data-i="${i}">${c.e} ${E(c.n)}</button>`).join('')}</div>
        ${spinSettings()}</div>`;
    } else if (SP.phase === 'topic') {
      const c = CATS[SP.cat];
      h += `<div class="su-panel"><span class="su-lbl">${c.e} ${E(c.n)}</span><p class="su-big-q">${E(SP.topic)}</p>
        <p class="hint">Not feeling it? You get one free re-roll in the same category.</p>
        <div class="row"><button type="button" class="btn ghost" data-px="sp-reroll">🔁 New topic</button><button type="button" class="btn ghost" data-px="sp-back">🎡 Back to the wheel</button></div>
        ${spinSettings()}
        <div class="row" style="margin-top:14px"><button type="button" class="btn gold" data-px="sp-prep" style="font-size:1.05rem">▶ Start ${SP.prep}-second prep</button></div></div>`;
    } else if (SP.phase === 'prep') {
      h += `<div class="su-panel"><span class="su-lbl">Prep time · plan, don't script</span><p class="su-big-q">${E(SP.topic)}</p>
        <div class="su-timerwrap">${timerHTML('sp-prep', SP.prep, 'prep')}<div class="row">${pauseBtn('sp-prep')}<button type="button" class="btn go" data-px="sp-go">I'm ready: start speaking ▶</button></div></div>
        <h3 style="margin-top:14px">Planning card</h3><p class="hint">Key words only, like a cue card. Your speaking timer starts automatically when prep ends.</p>
        <div class="su-plan">${[['p', '1 · Point', 'My view in one sentence…'], ['r', '2 · Reason', 'Because…'], ['e', '3 · Example', 'For example, in my community…'], ['c', '4 · Close', 'So… (link back + memorable line)']].map(([k, l, ph]) => `<label class="su-box"><b>${l}</b><textarea class="su-ta" rows="2" data-su-in="sp.plan.${k}" placeholder="${E(ph)}">${E(SP.plan[k])}</textarea></label>`).join('')}</div></div>`;
    } else if (SP.phase === 'speak') {
      const pl = SP.plan;
      h += `<div class="su-panel"><span class="su-lbl">You have the floor</span><p class="su-big-q">${E(SP.topic)}</p>
        <div class="su-timerwrap">${timerHTML('sp-speak', SP.speak, 'speaking')}<div class="row">${pauseBtn('sp-speak')}<button type="button" class="btn go" data-px="sp-done">✓ Finish speech</button></div></div>
        ${(pl.p || pl.r || pl.e || pl.c) ? `<div class="su-cue" style="margin-top:12px">${[['Point', pl.p], ['Reason', pl.r], ['Example', pl.e], ['Close', pl.c]].map(([l, v]) => `<div><b>${l}:</b> ${E(v || '…')}</div>`).join('')}</div>` : ''}
        <div class="row" style="margin-top:14px;align-items:center"><span class="hint">Filler tally (partner taps):</span><button type="button" class="btn ghost" data-px="sp-f">+1 filler</button><span class="su-fc" id="su-fman">${SP.manualF}</span>
        ${SP.liveF ? `<span class="hint">Live count:</span><span class="su-fc" id="su-flive">${SP.sr.count}</span>` : ''}</div>
        ${SP.sr.note ? `<p class="fb note">${E(SP.sr.note)}</p>` : ''}
        ${recHTML()}</div>`;
    } else if (SP.phase === 'rate') {
      h += `<div class="card"><span class="kicker">Rate the speech</span><h2>${E(SP.topic)}</h2>
        <div class="row"><span class="hint">Who is rating?</span><div class="chips" role="group" aria-label="Rater">${[['self', '🙋 Self-rating'], ['peer', '👥 Peer rating']].map(([k, n]) => `<button type="button" class="chip ${SP.mode === k ? 'sel' : ''}" aria-pressed="${SP.mode === k}" data-px="sp-mode" data-k="${k}">${n}</button>`).join('')}</div></div>
        <p class="hint">Spoke for ${fmt(SP.spoke * 1000)} · fillers counted: ${SP.manualF}${SP.liveF ? ' (tapped) · ' + SP.sr.count + ' (live, approximate)' : ''}. 1 = beginning, 4 = excellent.</p>
        ${recHTML(true)}
        <div class="su-rub">${RUBRIC.map(([k, n, d]) => `<div class="su-rrow"><div><b>${E(n)}</b><br><span class="hint">${E(d)}</span></div><div class="chips" role="radiogroup" aria-label="${E(n)} rating">${[1, 2, 3, 4].map(v => `<button type="button" class="chip ${SP.rate[k] === v ? 'sel' : ''}" role="radio" aria-checked="${SP.rate[k] === v}" data-px="sp-rate" data-k="${k}" data-v="${v}">${v}</button>`).join('')}</div></div>`).join('')}</div>
        <div class="row" style="margin-top:12px"><button type="button" class="btn gold" data-px="sp-score">See my score & tips</button></div></div>`;
    } else if (SP.phase === 'result') {
      const R = SP.result;
      h += `<div class="card"><span class="kicker">${SP.mode === 'peer' ? 'Peer' : 'Self'} rating · ${E(SP.topic)}</span>
        <div class="row" style="align-items:center;gap:18px"><span class="su-score">${R.pct}%</span><div style="flex:1 1 200px"><b>${E(R.band)}</b><div class="su-meter" style="margin-top:6px"><i style="width:${R.pct}%"></i></div><span class="hint">${R.total} / 32 · spoke for ${fmt(SP.spoke * 1000)}</span></div></div>
        ${R.good.length ? `<h3>What worked</h3><ul class="su-list">${R.good.map(t => `<li>${E(t)}</li>`).join('')}</ul>` : ''}
        ${R.tips.length ? `<h3>Your next steps</h3><ul class="su-list">${R.tips.map(t => `<li>${E(t)}</li>`).join('')}</ul>` : ''}
        <p class="hint">Paper 3 link: the same habits (clear points, audience-aware register, confident delivery) carry into your cue-card planning and oral presentation work.</p>
        <div class="row"><button type="button" class="btn gold" data-px="sp-again">🎡 Spin again</button><button type="button" class="btn ghost" data-px="sp-same">🔁 Same topic, try again</button></div></div>`;
    }
    return h;
  }
  function spinSettings() {
    return `<div class="row" style="margin-top:12px"><span class="hint">Prep:</span><div class="chips" role="group" aria-label="Prep time">${[30, 45, 60].map(s => `<button type="button" class="chip ${SP.prep === s ? 'sel' : ''}" aria-pressed="${SP.prep === s}" data-px="sp-pt" data-v="${s}">${s} s</button>`).join('')}</div></div>
      <div class="row"><span class="hint">Speak:</span><div class="chips" role="group" aria-label="Speaking time">${[60, 90, 120].map(s => `<button type="button" class="chip ${SP.speak === s ? 'sel' : ''}" aria-pressed="${SP.speak === s}" data-px="sp-st" data-v="${s}">${s / 60} min</button>`).join('')}</div></div>
      <div class="row"><span class="hint">Extras:</span><button type="button" class="chip ${SP.liveF ? 'sel' : ''}" aria-pressed="${SP.liveF}" data-px="sp-live">🗣️ Live filler counter (if your browser supports it)</button></div>`;
  }
  function recHTML(playbackOnly) {
    const R = SP.rec;
    if (playbackOnly) return R.url ? `<div class="su-rec"><span class="hint">Your recording:</span><audio controls src="${R.url}"></audio></div>` : '';
    return `<div class="su-rec" style="margin-top:12px">${R.state === 'rec' ? `<span><span class="su-dot" aria-hidden="true"></span>Recording…</span><button type="button" class="btn ghost" data-px="sp-recstop">■ Stop recording</button>` : `<button type="button" class="btn ghost" data-px="sp-rec">🎙️ Record myself (optional)</button>`}
      ${R.url ? `<audio controls src="${R.url}"></audio>` : ''}</div>${R.note ? `<p class="fb note">${E(R.note)}</p>` : ''}`;
  }
  async function recStart() {
    const R = SP.rec;
    const md = navigator.mediaDevices;
    if (!md || typeof md.getUserMedia !== 'function' || typeof window.MediaRecorder === 'undefined') {
      R.note = 'Recording is not available in this browser or setting. No problem: use your phone’s voice recorder, or ask a partner to watch and rate you.'; rerender('spin'); return;
    }
    try {
      const stream = await md.getUserMedia({ audio: true });
      const mr = new window.MediaRecorder(stream); R.chunks = [];
      mr.ondataavailable = e => { if (e.data && e.data.size) R.chunks.push(e.data); };
      mr.onstop = () => {
        try { stream.getTracks().forEach(t => t.stop()); } catch (e) { }
        try { if (R.url) URL.revokeObjectURL(R.url); const blob = new Blob(R.chunks, { type: mr.mimeType || 'audio/webm' }); R.url = URL.createObjectURL(blob); } catch (e) { R.note = 'The recording could not be played back here.'; }
        R.state = 'done'; R.mr = null; rerender('spin');
      };
      mr.start(); R.mr = mr; R.state = 'rec'; R.note = '';
    } catch (e) {
      R.state = 'idle'; R.note = 'The microphone was not allowed, so recording is off. That is fine: speak anyway, and ask a partner to give you feedback.';
    }
    rerender('spin');
  }
  function recStop() { const R = SP.rec; if (R.mr && R.state === 'rec') { try { R.mr.stop(); } catch (e) { R.state = 'idle'; } } }
  const FILL_RE = /\b(um+|umm+|uh+|erm*|ah+|hmm+|like|you know|basically|actually|literally|i mean|sort of|kind of)\b/gi;
  function srStart() {
    const C = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!C) { SP.sr.note = 'Live filler counting is not available in this browser. Ask a partner to tap “+1 filler” instead.'; return; }
    try {
      const r = new C(); r.continuous = true; r.interimResults = false; r.lang = 'en-US';
      r.onresult = ev => { for (let i = ev.resultIndex || 0; i < ev.results.length; i++) { const res = ev.results[i]; if (res.isFinal) SP.sr.count += ((res[0] && res[0].transcript || '').match(FILL_RE) || []).length; } const el = $('#su-flive'); if (el) el.textContent = SP.sr.count; };
      r.onerror = ev => { if (ev && /not-allowed|service-not-allowed/.test(ev.error || '')) { SP.sr.note = 'Live filler counting was not allowed. Use the tap counter instead.'; SP.sr.rec = null; } };
      r.onend = () => { if (SP.sr.rec === r && SP.phase === 'speak') { try { r.start(); } catch (e) { } } };
      r.start(); SP.sr.rec = r; SP.sr.note = 'Live filler counter is listening (approximate; it uses your browser’s speech service).';
    } catch (e) { SP.sr.note = 'Live filler counting could not start. Use the tap counter instead.'; SP.sr.rec = null; }
  }
  function srStop() { const r = SP.sr.rec; SP.sr.rec = null; if (r) { try { r.stop(); } catch (e) { } } }
  function spinGoSpeak() {
    SP.phase = 'speak'; SND.bell(1); announce('Prep over. Start speaking.');
    if (SP.liveF) srStart();
    tStart('spin', 'sp-speak', SP.speak, spinEndSpeak); A.render();
  }
  function spinEndSpeak() {
    const used = TM.key === 'sp-speak' ? (TM.total - Math.max(0, TM.left)) / 1000 : SP.speak;
    SP.spoke = Math.round(used); tStop(); srStop(); recStop();
    SND.bell(2); announce('Time. Now rate the speech.'); SP.phase = 'rate'; rerender('spin');
  }
  function spinScore() {
    const total = RUBRIC.reduce((s, [k]) => s + (SP.rate[k] || 0), 0), pct = Math.round(total / 32 * 100);
    const tips = [], good = [];
    RUBRIC.forEach(([k, n, , tip, praise]) => { const v = SP.rate[k]; if (v <= 2) tips.push(n + ': ' + tip); else if (v === 4) good.push(n + ': ' + praise); });
    const mins = Math.max(SP.spoke, 1) / 60, fpm = Math.max(SP.manualF, SP.sr.count) / mins;
    if (fpm > 5) tips.push(`Filler check: about ${Math.round(fpm)} fillers a minute. Aim for under 3 by pausing silently instead.`);
    if (SP.spoke < SP.speak * 0.6) tips.push('Length: you finished well before time. Add a second example or a counter-argument you then answer.');
    if (!tips.length) tips.push('Stretch goal: try the next spin with only 30 seconds of prep, or use a rhetorical question in your opening.');
    const band = pct >= 85 ? 'Outstanding: a confident, well-built speech' : pct >= 70 ? 'Strong: clear and persuasive with a few things to polish' : pct >= 50 ? 'Developing: the ideas are there; sharpen structure and delivery' : 'Beginning: every great speaker started here; focus on one tip next time';
    return { total, pct, tips, good, band };
  }

  /* ------------------------------------------------------------------ 2. DEBATE DUEL ------------------------------------------------------------------ */
  const blankArg = () => ({ p: '', e: '', x: '', l: '' });
  const DU = { phase: 'pick', theme: 'all', diff: 0, mi: null, side: null, useAI: true, args: [blankArg(), blankArg(), blankArg()], r: 0, rounds: [], draft: '', loading: false, live: '', speech: '', verdict: null, warn: '' };
  let AI_OFF = false;
  const aiOK = () => !!(A && A.sample) && !AI_OFF;
  const motion = () => MOTIONS[DU.mi];
  const shortPt = s => { s = String(s || '').trim().replace(/[.!?;:,]+$/, ''); return s.length > 110 ? s.slice(0, 107).replace(/\s+\S*$/, '') + '…' : s; };
  function offlineRebut(r) {
    const mo = motion(), bank = REB[mo.t][DU.side === 'prop' ? 'vsProp' : 'vsOpp'];
    const used = DU.rounds.map(x => x && x.li).filter(x => x != null);
    let li = (DU.mi + r) % bank.length; let guard = 0; while (used.includes(li) && guard++ < bank.length) li = (li + 1) % bank.length;
    const a = DU.args[r] || DU.args[0];
    return { rebut: `You argued that “${shortPt(a.p)}”. ${bank[li]}`, src: 'offline', li };
  }
  async function callSample(prompt, onText) {
    const s = A && A.sample; if (!s) { const e = new Error('not_granted'); e.code = 'not_granted'; throw e; }
    const msgs = [{ role: 'user', content: prompt }], opts = { cache: false, modelTier: 'quick', onText };
    if (typeof s === 'function') return await s(msgs, opts);
    if (typeof s.create === 'function') return await s.create(msgs, opts);
    if (typeof s.text === 'function') return await s.text(prompt, opts);
    const e = new Error('not_granted'); e.code = 'not_granted'; throw e;
  }
  async function getRebuttal(r) {
    if (DU.rounds[r]) return;
    if (!(DU.useAI && aiOK())) { DU.rounds[r] = offlineRebut(r); return; }
    const mo = motion(), a = DU.args[r], other = DU.side === 'prop' ? 'Opposition' : 'Proposition';
    const prompt = `You are the ${other} speaker in a friendly classroom debate for Caribbean CAPE Communication Studies students aged 16 to 19.\nMotion: "${mo.m}"\nThe student is on the ${DU.side === 'prop' ? 'Proposition' : 'Opposition'}. Their argument:\nPoint: ${a.p}\nEvidence: ${a.e || '(none given)'}\nExplanation: ${a.x || '(none given)'}\nLink: ${a.l || '(none given)'}\n\nWrite ONE sharp rebuttal to this specific argument in 2 to 3 sentences (under 70 words). Address their point directly, attack its evidence or logic, and use a Caribbean-relevant angle where natural. Keep it respectful and classroom-appropriate. Plain text only, no preamble, no labels.`;
    DU.loading = true; DU.live = ''; rerender('duel');
    let acc = '';
    try {
      const res = await callSample(prompt, t => { t = String(t || ''); acc = t.startsWith(acc) ? t : acc + t; DU.live = acc; const el = $('#su-ai-live'); if (el) el.textContent = acc; });
      let text = String((res && (res.text != null ? res.text : (typeof res === 'string' ? res : ''))) || acc || '').replace(/\s+/g, ' ').trim();
      text = text.replace(/^(rebuttal|opposition|proposition)\s*:\s*/i, '').slice(0, 600);
      if (!text) throw new Error('empty');
      DU.rounds[r] = { rebut: text, src: 'ai' };
    } catch (e) {
      const code = String((e && (e.code || e.message)) || '');
      if (/not_granted|sampling_disabled|not_declared|capability_disabled|capability_removed/.test(code)) { AI_OFF = true; DU.useAI = false; A.toast('The AI opponent is not available here, so the Classic opponent steps in.'); }
      else if (/rate_limited/.test(code)) A.toast('The AI opponent needs a breather (too many requests). Here is a Classic rebuttal instead.');
      else A.toast('The AI opponent could not answer, so the Classic opponent steps in.');
      DU.rounds[r] = offlineRebut(r);
    }
    DU.loading = false; DU.live = ''; rerender('duel');
  }
  const STOP = new Set('the a an and or but of to in on for with that this these those is are was were be been it its as at by from they them their there we our you your i my me he she his her not no so if then than too very can will would should could have has had do does did just more most much many some any all also into about over only what which who whom why how when where'.split(' '));
  const countHits = (t, arr) => arr.reduce((n, p) => n + (t.includes(p) ? 1 : 0), 0);
  const scale = n => n <= 0 ? 0 : n === 1 ? 2 : n === 2 ? 3 : n === 3 ? 4 : 5;
  function scoreCounter(txt, opp) {
    const t = ' ' + String(txt || '').toLowerCase().replace(/[’]/g, "'") + ' ', w = words(txt), n = w.length;
    const SIGN = ['firstly', 'secondly', 'first,', 'finally', 'however', 'on the contrary', 'in response', 'to respond', 'my opponent', 'the opposition', 'the proposition', 'they claim', 'they say', 'they said', 'they argue', 'you claim', 'you said', 'you argue', 'this ignores', 'this overlooks', ' but ', 'therefore', 'in conclusion', 'to rebut', 'let me', 'turning to', 'furthermore', 'moreover', 'consequently', "that's why", 'that is why', 'in fact', 'on the other hand'];
    const EVID = ['for example', 'for instance', 'according to', 'research', 'study', 'studies', 'survey', 'statistic', 'data', 'report', 'percent', '%', 'evidence', 'shows that', 'proven', 'caricom', 'unicef', 'ministry', 'last year', 'jamaica', 'barbados', 'trinidad', 'st. maarten', 'sint maarten', 'st maarten', 'guyana', 'bahamas', 'grenada', 'st. lucia', 'saint lucia', 'antigua', 'dominica', 'belize', 'st. kitts', 'curaçao', 'aruba', 'caribbean'];
    const ETH = ['as a student', 'as young people', 'as a young', 'experts', 'expert', 'doctors', 'teachers', 'scientists', 'credible', 'trust', "i've seen", 'i have seen', 'in my experience', 'respected', 'professional'];
    const PATH = ['imagine', 'families', 'family', 'children', 'our island', 'our people', 'heart', 'fear', 'hope', 'proud', 'pride', 'suffer', 'pain', 'dream', 'future', 'feel', 'love', 'tragic', 'unfair'];
    const LOG = ['because', 'therefore', ' if ', ' then ', 'which means', 'as a result', 'consequently', 'leads to', 'cost', 'so '];
    const ADDR = ['my opponent', 'they said', 'they say', 'they claim', 'you claim', 'you said', 'you argue', 'the opposition', 'the proposition', 'their point', 'this argument', 'their argument', 'that argument', 'the claim'];
    const sign = scale(countHits(t, SIGN));
    const evid = Math.min(5, scale(countHits(t, EVID)) + (/\d/.test(t) ? 1 : 0));
    const ow = new Set(words(opp).filter(x => x.length >= 5 && !STOP.has(x))); const overlap = new Set(w.filter(x => ow.has(x))).size;
    const addr = Math.min(5, (overlap >= 5 ? 3 : overlap >= 3 ? 2 : overlap >= 1 ? 1 : 0) + (countHits(t, ADDR) ? 2 : 0));
    const types = [countHits(t, ETH), countHits(t, PATH), countHits(t, LOG)].filter(Boolean).length;
    const appe = Math.min(5, types + (t.includes('?') ? 1 : 0) + (types === 3 ? 1 : 0));
    let total = sign + evid + addr + appe; const tips = [];
    if (n < 15) { total = Math.round(total * 0.5); tips.push('Too short to land a blow. Aim for 40–90 words: they said → but → because → therefore.'); }
    if (n > 160) tips.push('Long rebuttals lose the audience. Cut to your strongest two sentences.');
    if (sign < 3) tips.push('Signpost: start with “My opponent claims…, however…” and end with “Therefore…”.');
    if (evid < 3) tips.push('Add evidence: a fact, a figure, “for example in Barbados…”, or a named source.');
    if (addr < 3) tips.push('Answer THEIR point. Quote or name the exact claim you are knocking down before you answer it.');
    if (appe < 3) tips.push('Use appeals: a logical “because…therefore”, a credible source (ethos) and one human image (pathos).');
    return { sign, evid, addr, appe, total, tips };
  }
  function buildSpeech() {
    const mo = motion(), prop = DU.side === 'prop', a = DU.args;
    const firstSentence = s => (String(s || '').match(/[^.!?]+[.!?]?/) || [''])[0].trim();
    const dun = DU.rounds.filter(x => x && x.counter);
    let s = `Madam Chair, adjudicators, fellow debaters: the motion before the House is “${mo.m.replace(/\.$/, '')}”. Speaking for the ${prop ? 'Proposition' : 'Opposition'}, I will remind you why this motion must ${prop ? 'pass' : 'fall'}.\n\n`;
    s += `First, ${shortPt(a[0].p) || '…'}. Second, ${shortPt(a[1].p) || '…'}. Third, ${shortPt(a[2].p) || '…'}.\n\n`;
    if (dun.length) { const r0 = dun[0]; s += `Our opponents told you: “${shortPt(firstSentence(r0.rebut.replace(/^You argued that “[^”]*”\.\s*/, '')))}”. But ${firstSentence(r0.counter).replace(/^(but|however),?\s*/i, '')}\n\n`; }
    s += `So the question for this House is simple: do we want a Caribbean that ${prop ? 'acts' : 'thinks carefully before it acts'}? For all these reasons, I am proud to ${prop ? 'propose' : 'oppose'}. I thank you.`;
    return s;
  }
  function duelVerdict() {
    const done = DU.rounds.filter(x => x && x.sc), avg = done.length ? done.reduce((s, x) => s + x.sc.total, 0) / (done.length * 20) : 0;
    const filled = DU.args.reduce((s, a) => s + ['p', 'e', 'x', 'l'].filter(k => String(a[k]).trim().split(/\s+/).length >= 3).length, 0) / 12;
    const sw = words(DU.speech).length, sp = Math.min(1, sw / 120);
    const pct = Math.round((avg * 0.6 + filled * 0.3 + sp * 0.1) * 100), win = pct >= 60;
    const cats = [['Signposting', 'sign'], ['Evidence', 'evid'], ['Addressing the opponent', 'addr'], ['Rhetorical appeals', 'appe']].map(([n, k]) => [n, done.length ? done.reduce((s, x) => s + x.sc[k], 0) / done.length : 0]).sort((x, y) => y[1] - x[1]);
    return { pct, win, best: cats[0][0], weak: cats[3][0], rounds: done.length, peel: Math.round(filled * 100) };
  }
  const D_LBL = ['', '⭐ Starter', '⭐⭐ Challenger', '⭐⭐⭐ Champion'];
  function duelRender() {
    let h = '';
    if (DU.phase === 'pick') {
      const list = MOTIONS.map((m, i) => [m, i]).filter(([m]) => (DU.theme === 'all' || m.t === DU.theme) && (!DU.diff || m.d === DU.diff));
      h += `<div class="card"><span class="kicker">Game 2 · Debate Duel</span><h2>Choose your motion</h2><p class="hint">${MOTIONS.length} motions on Caribbean issues. Filter by theme and difficulty, or let fate decide.</p>
        <div class="chips" role="group" aria-label="Theme">${[['all', '🌐 All themes']].concat(Object.entries(THEMES)).map(([k, n]) => `<button type="button" class="chip ${DU.theme === k ? 'sel' : ''}" aria-pressed="${DU.theme === k}" data-px="du-theme" data-k="${k}">${n}</button>`).join('')}</div>
        <div class="chips" role="group" aria-label="Difficulty" style="margin-top:8px">${[0, 1, 2, 3].map(d => `<button type="button" class="chip ${DU.diff === d ? 'sel' : ''}" aria-pressed="${DU.diff === d}" data-px="du-diff" data-v="${d}">${d ? D_LBL[d] : 'Any level'}</button>`).join('')}</div>
        <div class="row" style="margin:12px 0"><button type="button" class="btn gold" data-px="du-random">🎲 Random motion</button><span class="hint">${list.length} shown</span></div>
        <div class="su-mlist">${list.map(([m, i]) => `<button type="button" class="su-mot" data-px="du-motion" data-i="${i}"><span>${E(m.m)}<br><span class="hint">${THEMES[m.t]}</span></span><span class="su-d" style="margin-left:auto">${D_LBL[m.d]}</span></button>`).join('') || '<p class="hint">No motions match. Try another filter.</p>'}</div></div>`;
    } else if (DU.phase === 'side') {
      const mo = motion();
      h += `<div class="su-panel"><span class="su-lbl">${THEMES[mo.t]} · ${D_LBL[mo.d]}</span><p class="su-big-q">${E(mo.m)}</p>
        <p class="hint">Pick your side. Good debaters can argue either one: try the side you disagree with for a real workout.</p>
        <div class="su-sides" style="margin-top:10px"><button type="button" class="su-side prop" data-px="du-side" data-k="prop" aria-pressed="${DU.side === 'prop'}"><b>✋ Proposition</b><span>Argue FOR the motion</span></button><button type="button" class="su-side opp" data-px="du-side" data-k="opp" aria-pressed="${DU.side === 'opp'}"><b>🛡️ Opposition</b><span>Argue AGAINST the motion</span></button></div>
        ${aiOK() ? `<div class="row" style="margin-top:12px"><span class="hint">Opponent:</span><div class="chips" role="group" aria-label="Opponent type">${[[true, '🤖 AI opponent'], [false, '📚 Classic opponent']].map(([v, n]) => `<button type="button" class="chip ${DU.useAI === v ? 'sel' : ''}" aria-pressed="${DU.useAI === v}" data-px="du-ai" data-v="${v ? 1 : 0}">${n}</button>`).join('')}</div></div>` : `<p class="hint" style="margin-top:12px">📚 You will face the Classic opponent, a bank of ready-made rebuttals for this theme.</p>`}
        <div class="row" style="margin-top:12px"><button type="button" class="btn go" data-px="du-build" ${DU.side ? '' : 'disabled'}>Build my case →</button><button type="button" class="btn ghost" data-px="du-repick">↩ Another motion</button></div></div>`;
    } else if (DU.phase === 'build') {
      const mo = motion();
      h += `<div class="card"><span class="kicker">${DU.side === 'prop' ? '✋ Proposition' : '🛡️ Opposition'} · build three PEEL arguments</span><h2 style="font-size:1.15rem">${E(mo.m)}</h2>
        <p class="hint">Point, Evidence, Explain, Link: the same PEEL you use in essays. Each Point needs at least three words before the clash begins.</p></div>
        ${DU.args.map((a, i) => { const f = ['p', 'e', 'x', 'l'].map(k => String(a[k]).trim().length > 0); return `<div class="su-arg"><h3><span>Argument ${i + 1}</span><span class="su-dots" aria-label="${f.filter(Boolean).length} of 4 boxes filled">${f.map(x => `<i class="${x ? 'on' : ''}"></i>`).join('')}</span></h3>
          <div class="su-peel">${[['p', 'Point', 'Our first point is that…'], ['e', 'Evidence', 'For example / according to…'], ['x', 'Explain', 'This matters because…'], ['l', 'Link', 'Therefore, this motion should…']].map(([k, l, ph]) => `<label class="su-box" style="display:flex;flex-direction:column;gap:4px"><b style="font-size:.85rem">${l}</b><textarea class="su-ta" rows="2" data-su-in="du.args.${i}.${k}" placeholder="${E(ph)}">${E(a[k])}</textarea></label>`).join('')}</div></div>`; }).join('')}
        ${DU.warn ? `<p class="fb bad">${E(DU.warn)}</p>` : ''}
        <div class="row"><button type="button" class="btn gold" data-px="du-clash">⚔️ Face the opponent</button><button type="button" class="btn ghost" data-px="du-back">↩ Change side</button></div>`;
    } else if (DU.phase === 'clash') {
      const r = DU.r, R = DU.rounds[r], a = DU.args[r], oppSide = DU.side === 'prop' ? 'opp' : 'prop';
      h += `<div class="card"><span class="kicker">Clash ${r + 1} of 3 · ${DU.side === 'prop' ? 'you are Proposition' : 'you are Opposition'}</span>
        <p><b>Your argument:</b> ${E(a.p)}</p>
        <div class="su-opp ${oppSide}"><b>${oppSide === 'prop' ? '✋ Proposition' : '🛡️ Opposition'} rebuts${R ? (R.src === 'ai' ? ' (AI opponent)' : ' (Classic opponent)') : ''}:</b>
          ${DU.loading || !R ? `<p id="su-ai-live" aria-live="polite">${E(DU.live || 'Your opponent is thinking…')}</p>` : `<p>${E(R.rebut)}</p>`}</div>`;
      if (R && !DU.loading) {
        if (!R.sc) {
          h += `<label class="field" style="margin-top:12px"><span><b>Your counter-rebuttal</b> <span class="hint">(They said → But → Because → Therefore)</span></span><textarea class="su-ta" rows="5" data-su-in="du.draft" placeholder="My opponent claims that… However… because… For example… Therefore…">${E(DU.draft)}</textarea></label>
            <div class="su-phr" aria-label="Useful phrases">${['My opponent claims…', 'However, this ignores…', 'For example, in…', 'The evidence shows…', 'Therefore…', 'Imagine…'].map(p => `<span>${E(p)}</span>`).join('')}</div>
            ${DU.warn ? `<p class="fb bad">${E(DU.warn)}</p>` : ''}
            <div class="row"><button type="button" class="btn gold" data-px="du-submit">Submit rebuttal</button><button type="button" class="btn ghost" data-px="du-speak">🔊 Hear the rebuttal</button></div>`;
        } else {
          const s = R.sc;
          h += `<h3 style="margin-top:12px">Judge’s scorecard: ${s.total} / 20</h3><div class="su-brk">${[['Signposting', s.sign], ['Evidence', s.evid], ['Addressing them', s.addr], ['Appeals', s.appe]].map(([n, v]) => `<div><b>${v}/5</b><span>${n}</span></div>`).join('')}</div>
            <p class="hint" style="margin-top:8px"><b>You said:</b> ${E(R.counter)}</p>
            ${s.tips.length ? `<ul class="su-list">${s.tips.map(t => `<li>${E(t)}</li>`).join('')}</ul>` : '<p class="fb good">A complete rebuttal: signposted, evidenced, on target and persuasive.</p>'}
            <div class="row"><button type="button" class="btn go" data-px="du-next">${r < 2 ? 'Next clash →' : 'Build my closing speech →'}</button>${r < 2 ? `<button type="button" class="btn ghost" data-px="du-tosum">Skip to closing</button>` : ''}</div>`;
        }
      }
      h += `</div>`;
    } else if (DU.phase === 'summary') {
      h += `<div class="card"><span class="kicker">Closing speech builder</span><h2>Sum up and seal it</h2><p class="hint">We drafted a closing speech from your arguments and clashes. Edit it into your own words, read it aloud, then ask the judge for a verdict.</p>
        <textarea class="su-ta" rows="10" data-su-in="du.speech" aria-label="Closing speech">${E(DU.speech)}</textarea>
        <p class="hint">Checklist: address the Chair · restate the motion · signpost your three points · answer their best attack · end with a memorable line.</p>
        <div class="row"><button type="button" class="btn ghost" data-px="du-read">🔊 Read it aloud</button><button type="button" class="btn gold" data-px="du-verdict">🏆 Judge’s verdict</button></div></div>`;
    } else if (DU.phase === 'verdict') {
      const V = DU.verdict, prop = DU.side === 'prop';
      h += `<div class="su-panel" style="text-align:center"><span class="su-lbl">The House divides…</span><p class="su-big-q">${V.win ? (prop ? 'The motion is CARRIED' : 'The motion is DEFEATED') : (prop ? 'The motion falls this time' : 'The motion survives this time')}</p>
        <p>${V.win ? `🏆 Victory for the ${prop ? 'Proposition' : 'Opposition'}!` : 'Close contest. The opponent edges it, so learn from the scorecard and come back stronger.'}</p>
        <span class="su-score">${V.pct}%</span>
        <div class="su-meter" style="max-width:360px;margin:10px auto"><i style="width:${V.pct}%"></i></div>
        <p class="hint">PEEL completeness ${V.peel}% · ${V.rounds} clash${V.rounds === 1 ? '' : 'es'} fought · strongest skill: <b>${E(V.best)}</b> · work on: <b>${E(V.weak)}</b></p>
        <div class="row" style="justify-content:center"><button type="button" class="btn gold" data-px="du-new">⚔️ New duel</button><button type="button" class="btn ghost" data-px="du-swap">🔄 Same motion, other side</button></div></div>`;
    }
    return h;
  }

  /* ------------------------------------------------------------------ 3/4. RALLY + FALLACY (shared quiz engine) ------------------------------------------------------------------ */
  const RA = { phase: 'ready', order: [], i: 0, pick: null, opts: [], streak: 0, best: 0, right: 0, n: 10, secs: 20, timeout: false };
  const FQ = { phase: 'ready', order: [], i: 0, pick: null, opts: [], streak: 0, best: 0, right: 0, n: 10 };
  function rallyItem() { const it = RALLY[RA.order[RA.i]]; return { claim: it[0], opts: it[1], why: it[2] }; }
  function rallyStartQ() {
    RA.pick = null; RA.timeout = false; RA.opts = shuf([0, 1, 2, 3]);
    if (RA.secs) tStart('rally', 'ra', RA.secs, () => { if (RA.pick == null) { RA.timeout = true; RA.pick = -1; RA.streak = 0; SND.bad(); announce('Time up'); rerender('rally'); } });
    else tStop();
  }
  function rallyRender() {
    const p = P();
    if (RA.phase === 'ready') return `<div class="card"><span class="kicker">Game 3 · Rebuttal Rally</span><h2>Spot the strongest comeback</h2>
      <p>A claim appears. Four replies come back. Only one is a real rebuttal: it answers the claim with reasons or evidence. The others are insults, distractions or plain contradiction. Build your streak!</p>
      <div class="row"><span class="hint">Time per claim:</span><div class="chips" role="group" aria-label="Time per claim">${[[15, '15 s ⚡'], [20, '20 s'], [30, '30 s'], [0, 'No timer']].map(([v, n]) => `<button type="button" class="chip ${RA.secs === v ? 'sel' : ''}" aria-pressed="${RA.secs === v}" data-px="ra-secs" data-v="${v}">${n}</button>`).join('')}</div></div>
      <p class="hint">${RALLY.length} claims in the bank · 10 per rally · best streak: ${p.rally || 0} · keys 1–4 pick an answer</p>
      <div class="row"><button type="button" class="btn gold" data-px="ra-start">🏓 Start the rally</button></div></div>`;
    if (RA.phase === 'done') return quizDone('Rally complete', RA, 'ra-start', 'rally');
    const it = rallyItem(), done = RA.pick != null;
    return `<div class="card"><div class="su-qbar">${RA.secs ? timerHTML('ra', RA.secs, '') : ''}<div class="su-streak"><span>Claim ${RA.i + 1} / ${RA.n}</span><span>🔥 Streak <span class="su-fire">${RA.streak}</span></span><span>✓ ${RA.right}</span></div></div>
      <span class="su-lbl" style="display:block;margin-top:12px">The claim</span><p class="su-snip">“${E(it.claim)}”</p><p class="hint">Which reply is the strongest rebuttal?</p>
      <div class="opts">${RA.opts.map((oi, k) => `<button type="button" class="opt ${done ? (oi === 0 ? 'right' : oi === RA.pick ? 'wrong' : '') : ''}" data-px="ra-pick" data-v="${oi}" ${done ? 'disabled' : ''}><b>${k + 1}</b> ${E(it.opts[oi])}</button>`).join('')}</div>
      ${done ? `<p class="fb ${RA.pick === 0 ? 'good' : 'bad'}"><span>${RA.timeout ? '⏰ Time up! ' : RA.pick === 0 ? '✓ Strong pick! ' : '✗ Not the strongest. '}${E(it.why)}</span></p><div class="row"><button type="button" class="btn go" data-px="ra-next">${RA.i + 1 < RA.n ? 'Next claim →' : 'See results'}</button></div>` : ''}</div>`;
  }
  function quizDone(title, Q, again, key) {
    const p = P();
    return `<div class="su-panel" style="text-align:center"><span class="su-lbl">${E(title)}</span><p class="su-big-q">${Q.right} / ${Q.n} correct</p><p>Best streak this round: <b>${Q.best}</b> · all-time best: <b>${p[key] || 0}</b></p>
      <div class="su-meter" style="max-width:360px;margin:10px auto"><i style="width:${Math.round(Q.right / Q.n * 100)}%"></i></div>
      <div class="row" style="justify-content:center"><button type="button" class="btn gold" data-px="${again}">Play again</button><button type="button" class="btn ghost" data-go="speakup" data-tab="hub">Back to the Arena</button></div></div>`;
  }
  function ffStartQ() { const it = FF[FQ.order[FQ.i]]; FQ.pick = null; const others = shuf(Object.keys(FALL).filter(k => k !== it[1])).slice(0, 3); FQ.opts = shuf(others.concat([it[1]])); }
  function ffRender() {
    const p = P();
    if (FQ.phase === 'ready') return `<div class="card"><span class="kicker">Game 4 · Fallacy Finder</span><h2>Catch the faulty reasoning</h2>
      <p>Debaters win by exposing weak logic. Read each line from around the region and name the fallacy. Then use the name in your next rebuttal: “That is a slippery slope…”.</p>
      <details style="margin:10px 0"><summary><b>The ten fallacies (quick guide)</b></summary><ul class="su-list" style="margin-top:8px">${Object.values(FALL).map(([n, d]) => `<li><b>${E(n)}</b>: ${E(d)}</li>`).join('')}</ul></details>
      <p class="hint">${FF.length} snippets · 10 per round · best streak: ${p.fallacy || 0} · keys 1–4 pick an answer</p>
      <div class="row"><button type="button" class="btn gold" data-px="ff-start">🕵️ Start investigating</button></div></div>`;
    if (FQ.phase === 'done') return quizDone('Case closed', FQ, 'ff-start', 'fallacy');
    const it = FF[FQ.order[FQ.i]], done = FQ.pick != null, ok = FQ.pick === it[1];
    return `<div class="card"><div class="su-streak"><span>Case ${FQ.i + 1} / ${FQ.n}</span><span>🔥 Streak <span class="su-fire">${FQ.streak}</span></span><span>✓ ${FQ.right}</span></div>
      <p class="su-snip" style="margin-top:12px">${E(it[0])}</p><p class="hint">Which fallacy is this?</p>
      <div class="opts">${FQ.opts.map((k, j) => `<button type="button" class="opt ${done ? (k === it[1] ? 'right' : k === FQ.pick ? 'wrong' : '') : ''}" data-px="ff-pick" data-k="${k}" ${done ? 'disabled' : ''}><b>${j + 1}</b> ${E(FALL[k][0])}</button>`).join('')}</div>
      ${done ? `<p class="fb ${ok ? 'good' : 'bad'}"><span>${ok ? '✓ Caught it! ' : `✗ It is ${E(FALL[it[1]][0])}. `}${E(it[2])}</span><span class="hint">${E(FALL[it[1]][0])}: ${E(FALL[it[1]][1])}</span></p><div class="row"><button type="button" class="btn go" data-px="ff-next">${FQ.i + 1 < FQ.n ? 'Next case →' : 'See results'}</button></div>` : ''}</div>`;
  }

  /* ------------------------------------------------------------------ 5. APPEAL SORT ------------------------------------------------------------------ */
  const AP = { phase: 'ready', order: [], i: 0, score: 0, right: 0, n: 16, last: null, miss: [], secs: 90 };
  function apEnd() { if (AP.phase !== 'play') return; AP.phase = 'done'; tStop(); SND.bell(1); const p = P(); if (AP.score > (p.appeal || 0)) { p.appeal = AP.score; saveP(); } coins(Math.max(1, Math.round(AP.score / 4)), 'Appeal Sort'); rerender('appeal'); }
  function apSort(k) {
    if (AP.phase !== 'play') return;
    const it = APPEALS[AP.order[AP.i]], ok = it[1] === k;
    if (ok) { AP.right++; AP.score += it[1] === 'kairos' ? 2 : 1; SND.good(); } else { SND.bad(); AP.miss.push(it); }
    AP.last = { ok, it, k }; AP.i++;
    if (AP.i >= AP.n) { apEnd(); return; }
    A.render();
    const b = document.querySelector(`[data-px="ap-sort"][data-k="${k}"]`); if (b) b.focus();
  }
  function apRender() {
    const p = P();
    if (AP.phase === 'ready') return `<div class="card"><span class="kicker">Game 5 · Appeal Sort</span><h2>Ethos, pathos or logos? Sort at speed!</h2>
      <p>Each line is persuading you in one main way. Sort it before the clock runs out. Spot <b>kairos</b> (the power of perfect timing) for double points.</p>
      <div class="su-bins" style="margin:10px 0">${Object.entries(APB).map(([k, [n, e, d]]) => `<div class="su-bin ${k}"><span>${e}</span>${n}<small>${d}</small></div>`).join('')}</div>
      <div class="row"><span class="hint">Clock:</span><div class="chips" role="group" aria-label="Clock">${[[60, '60 s'], [90, '90 s'], [120, '2 min']].map(([v, n]) => `<button type="button" class="chip ${AP.secs === v ? 'sel' : ''}" aria-pressed="${AP.secs === v}" data-px="ap-secs" data-v="${v}">${n}</button>`).join('')}</div></div>
      <p class="hint">${APPEALS.length} lines in the bank · ${AP.n} per round · best score: ${p.appeal || 0} · keyboard: E, P, L, K</p>
      <div class="row"><button type="button" class="btn gold" data-px="ap-start">🗂️ Start sorting</button></div></div>`;
    if (AP.phase === 'done') return `<div class="su-panel"><span class="su-lbl">Time! Sorting complete</span><p class="su-big-q">${AP.score} points</p><p>${AP.right} of ${AP.i} lines sorted correctly · best: ${p.appeal || 0}</p>
      ${AP.miss.length ? `<h3>Review the tricky ones</h3><ul class="su-list">${AP.miss.map(it => `<li>“${E(it[0])}” → <b>${APB[it[1]][0]}</b>: ${E(it[2])}</li>`).join('')}</ul>` : '<p class="fb good">Perfect sort!</p>'}
      <div class="row"><button type="button" class="btn gold" data-px="ap-start">Play again</button><button type="button" class="btn ghost" data-go="speakup" data-tab="hub">Back to the Arena</button></div></div>`;
    const it = APPEALS[AP.order[AP.i]], L = AP.last;
    return `<div class="su-panel"><div class="su-qbar">${timerHTML('ap', AP.secs, '')}<div class="su-streak"><span>Line ${AP.i + 1} / ${AP.n}</span><span>⭐ <span class="su-fire">${AP.score}</span> pts</span></div></div>
      <p class="su-line" style="margin-top:12px">“${E(it[0])}”</p>
      <div class="su-bins" style="margin-top:12px">${Object.entries(APB).map(([k, [n, e, d]]) => `<button type="button" class="su-bin ${k}" data-px="ap-sort" data-k="${k}" aria-keyshortcuts="${n[0]}"><span aria-hidden="true">${e}</span>${n}<small>${d}</small></button>`).join('')}</div>
      ${L ? `<p class="fb ${L.ok ? 'good' : 'bad'}" style="margin-top:10px"><span>${L.ok ? '✓' : '✗'} Last line was <b>${APB[L.it[1]][0]}</b>: ${E(L.it[2])}</span></p>` : ''}</div>`;
  }

  /* ------------------------------------------------------------------ 6. SIXTY-SECOND STAND ------------------------------------------------------------------ */
  const MN = { phase: 'setup', mode: 'solo', players: [{ n: 'Player 1', s: 0 }, { n: 'Player 2', s: 0 }, { n: 'Player 3', s: 0 }], sp: 0, subject: '', ch: null, why: null, faults: { h: 0, r: 0, d: 0 }, log: [] };
  const WHY = { h: ['Hesitation', '😶'], r: ['Repetition', '🔁'], d: ['Deviation', '↪️'] };
  function mnStart() {
    MN.subject = pick(SUBJECTS.filter(s => s !== MN.subject)); MN.phase = 'play'; MN.ch = null; MN.why = null; MN.faults = { h: 0, r: 0, d: 0 }; MN.log = [];
    tStart('minute', 'mn', 60, mnEnd); SND.whistle();
  }
  function mnEnd() {
    tStop(); SND.whistle();
    if (MN.mode === 'class') { const p = MN.players[MN.sp]; p.s += 2; MN.log.push(`🏁 Final whistle: ${p.n} was speaking and gets +2.`); coins(2, 'Sixty-Second Stand'); }
    else { const f = MN.faults.h + MN.faults.r + MN.faults.d; MN.solo = Math.max(0, 10 - f); coins(MN.solo >= 8 ? 4 : MN.solo >= 5 ? 3 : 2, 'Sixty-Second Stand'); }
    MN.phase = 'over'; rerender('minute');
  }
  function mnRender() {
    if (MN.phase === 'setup') return `<div class="card"><span class="kicker">Game 6 · Sixty-Second Stand</span><h2>Talk for a minute. No hesitation, repetition or deviation.</h2>
      <p>You get a random subject and 60 seconds. Keep talking without stalling (hesitation), repeating key words (repetition) or wandering off topic (deviation). Great training for fluency and for thinking on your feet in an oral presentation.</p>
      <div class="chips" role="group" aria-label="Mode">${[['solo', '🙋 Solo practice'], ['class', '👥 Classroom / peer game']].map(([k, n]) => `<button type="button" class="chip ${MN.mode === k ? 'sel' : ''}" aria-pressed="${MN.mode === k}" data-px="mn-mode" data-k="${k}">${n}</button>`).join('')}</div>
      ${MN.mode === 'class' ? `<p class="hint" style="margin-top:10px">Players (2–6). Others buzz in to challenge. A correct challenge wins a point and the subject; the player speaking at the whistle earns 2.</p>
        <div class="su-players">${MN.players.map((p, i) => `<div class="su-pl"><label class="hint" for="su-mnp${i}">Player ${i + 1}</label><input class="su-in" id="su-mnp${i}" data-su-in="mn.players.${i}.n" value="${E(p.n)}" maxlength="24"></div>`).join('')}</div>
        <div class="row" style="margin-top:8px"><button type="button" class="btn ghost" data-px="mn-add" ${MN.players.length >= 6 ? 'disabled' : ''}>+ Player</button><button type="button" class="btn ghost" data-px="mn-rem" ${MN.players.length <= 2 ? 'disabled' : ''}>− Player</button></div>
        <div class="row"><span class="hint">First speaker:</span><div class="chips">${MN.players.map((p, i) => `<button type="button" class="chip ${MN.sp === i ? 'sel' : ''}" aria-pressed="${MN.sp === i}" data-px="mn-sp" data-i="${i}">${E(p.n)}</button>`).join('')}</div></div>`
        : `<p class="hint" style="margin-top:10px">Solo: tap a fault button each time you slip. You start on 10 points; each fault costs 1.</p>`}
      <div class="row" style="margin-top:12px"><button type="button" class="btn gold" data-px="mn-start">⏱️ Reveal subject & start</button></div></div>`;
    if (MN.phase === 'over') {
      const ranked = MN.players.slice().sort((a, b) => b.s - a.s);
      return `<div class="su-panel"><span class="su-lbl">Final whistle</span><p class="su-big-q">${E(MN.subject)}</p>
        ${MN.mode === 'solo' ? `<p class="su-score">${MN.solo} / 10</p><p>Hesitations ${MN.faults.h} · repetitions ${MN.faults.r} · deviations ${MN.faults.d}</p><p class="hint">${MN.solo >= 8 ? 'Fluent and focused. Try a harder subject next!' : 'Tip: when you feel a stall coming, use a linking phrase (“Another thing about…”) instead of “um”.'}</p>`
          : `<h3>Scoreboard</h3><ol class="su-list">${ranked.map(p => `<li><b>${E(p.n)}</b>: ${p.s} pts</li>`).join('')}</ol>${MN.log.length ? `<details><summary>Round log</summary><ul class="su-list">${MN.log.map(l => `<li>${E(l)}</li>`).join('')}</ul></details>` : ''}`}
        <div class="row" style="margin-top:10px"><button type="button" class="btn gold" data-px="mn-start">Next subject ⏱️</button><button type="button" class="btn ghost" data-px="mn-setup">Settings</button>${MN.mode === 'class' ? `<button type="button" class="btn ghost" data-px="mn-zero">Reset scores</button>` : ''}</div></div>`;
    }
    const sp = MN.players[MN.sp];
    let h = `<div class="su-panel"><span class="su-lbl">Your subject</span><p class="su-big-q">${E(MN.subject)}</p>
      <div class="su-timerwrap">${timerHTML('mn', 60, MN.mode === 'class' ? sp.n : 'keep talking')}<div class="row">${pauseBtn('mn')}<button type="button" class="btn ghost" data-px="mn-stop">🏁 End round</button></div></div>`;
    if (MN.mode === 'solo') {
      h += `<p class="hint" style="text-align:center">Tap when you slip:</p><div class="su-chal" style="justify-content:center">${Object.entries(WHY).map(([k, [n, e]]) => `<button type="button" class="btn ghost" data-px="mn-fault" data-k="${k}">${e} ${n} <b>${MN.faults[k]}</b></button>`).join('')}</div>`;
    } else if (MN.phase === 'play') {
      h += `<div class="row" style="justify-content:center;margin-top:10px"><button type="button" class="su-buzz" data-px="mn-buzz">🔔 CHALLENGE!</button></div>`;
    } else if (MN.phase === 'challenge') {
      h += `<div class="card" style="margin-top:12px;color:var(--ink)"><h3>Challenge! The clock is stopped.</h3>
        <p class="hint">Who challenged?</p><div class="chips">${MN.players.map((p, i) => i === MN.sp ? '' : `<button type="button" class="chip ${MN.ch === i ? 'sel' : ''}" aria-pressed="${MN.ch === i}" data-px="mn-ch" data-i="${i}">${E(p.n)}</button>`).join('')}</div>
        <p class="hint">For what?</p><div class="chips">${Object.entries(WHY).map(([k, [n, e]]) => `<button type="button" class="chip ${MN.why === k ? 'sel' : ''}" aria-pressed="${MN.why === k}" data-px="mn-why" data-k="${k}">${e} ${n}</button>`).join('')}</div>
        <div class="row" style="margin-top:10px"><button type="button" class="btn go" data-px="mn-uphold" ${MN.ch == null || !MN.why ? 'disabled' : ''}>✓ Uphold: challenger +1 and takes over</button><button type="button" class="btn ghost" data-px="mn-over" ${MN.ch == null ? 'disabled' : ''}>✗ Overrule: speaker +1 and continues</button></div></div>`;
    }
    if (MN.mode === 'class') h += `<div class="su-players" style="margin-top:12px">${MN.players.map((p, i) => `<div class="su-pl ${i === MN.sp ? 'on' : ''}" style="color:var(--ink)"><span>${i === MN.sp ? '🎤 ' : ''}${E(p.n)}</span><b class="su-pts">${p.s}</b></div>`).join('')}</div>`;
    return h + `</div>`;
  }

  /* ------------------------------------------------------------------ 7. CLASSROOM DEBATE FLOOR ------------------------------------------------------------------ */
  const CL = { teams: [{ name: 'Proposition', roster: '', score: 0 }, { name: 'Opposition', roster: '', score: 0 }], segs: DEF_SEGS.map(s => ({ label: s[0], team: s[1], mins: s[2] })), cur: 0, big: false, picked: '', used: [[], []], judge: [{}, {}], winner: null, loaded: false };
  function clLoad() {
    if (CL.loaded) return; CL.loaded = true;
    const c = P().cl; if (!c) return;
    try { if (c.t) c.t.forEach((n, i) => { if (CL.teams[i] && n) CL.teams[i].name = String(n).slice(0, 30); }); if (c.m) c.m.forEach((m, i) => { if (CL.segs[i] && m > 0) CL.segs[i].mins = +m; }); } catch (e) { }
  }
  function clPersist() { P().cl = { t: CL.teams.map(t => t.name), m: CL.segs.map(s => s.mins) }; saveP(); }
  function clSecs() { const s = CL.segs[CL.cur]; return Math.max(15, Math.round((s ? s.mins : 2) * 60)); }
  function clStatus() {
    const el = $('#su-poi'); if (!el || TM.key !== 'cl') return;
    const el0 = TM.total - TM.left, prot = el0 < 30000 || (TM.left < 30000);
    const txt = TM.left <= 0 ? '⏰ Overtime: wrap up now' : prot ? '🔒 Protected time: no POIs' : '✋ Points of information welcome';
    if (el.textContent !== txt) { el.textContent = txt; el.className = 'su-status' + (prot ? ' prot' : ''); }
  }
  function clArm(run) {
    const total = clSecs();
    const opt = { overtime: true, onPaint: clStatus, marks: total >= 90 ? [{ at: (total - 30) * 1000, fn: () => { SND.bell(1); announce('Points of information are now open'); } }, { at: 30000, fn: () => { SND.bell(1); announce('Thirty seconds. Protected time.'); } }] : [], onEnd: () => { SND.bell(2); announce('Time is up'); } };
    tStart('floor', 'cl', total, opt.onEnd, opt); if (!run) { TM.run = false; paint(); }
  }
  function clJudgeTotal(i) { return JUDGE.reduce((s, [k]) => s + (Math.max(0, Math.min(10, +CL.judge[i][k] || 0))), 0); }
  function floorRender() {
    clLoad();
    const seg = CL.segs[CL.cur], team = seg ? CL.teams[seg.team] : null;
    if (TM.key !== 'cl' && seg) clArm(false);
    const rosterNames = i => CL.teams[i].roster.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    let h = `<div class="su-panel ${CL.big ? 'su-big' : ''}"><div class="row" style="justify-content:space-between;align-items:center"><span class="su-lbl">Game 7 · Classroom Debate Floor (projector view)</span>
      <div class="row"><button type="button" class="btn ghost" data-px="cl-big" aria-pressed="${CL.big}">${CL.big ? '🔎 Normal size' : '🔍 Big screen'}</button><button type="button" class="btn ghost" data-px="cl-fs">⛶ Full screen</button></div></div>
      <div class="su-teams" style="margin-top:10px">${CL.teams.map((t, i) => `<div class="su-team t${i}" style="color:var(--ink)"><input class="su-in su-teamname" aria-label="Team ${i + 1} name" data-su-in="cl.teams.${i}.name" value="${E(t.name)}" maxlength="30" style="font-weight:800;text-align:center"><span class="su-pts" data-su-tsc="${i}">${t.score}</span><div class="row" style="justify-content:center"><button type="button" class="btn ghost" data-px="cl-sc" data-i="${i}" data-v="-1" aria-label="Minus one point for ${E(t.name)}">−1</button><button type="button" class="btn gold" data-px="cl-sc" data-i="${i}" data-v="1" aria-label="Plus one point for ${E(t.name)}">+1</button></div></div>`).join('')}</div>`;
    if (seg) {
      h += `<p class="su-seglbl" style="margin-top:14px">${E(seg.label.replace('Proposition', CL.teams[0].name).replace('Opposition', CL.teams[1].name))}</p>
        <div class="su-timerwrap">${timerHTML('cl', clSecs(), team ? team.name : '')}<span id="su-poi" class="su-status prot">🔒 Protected time: no POIs</span>
        <div class="row" style="justify-content:center"><button type="button" class="btn gold" data-px="cl-go" data-su-tbtn="cl">${TM.key === 'cl' && TM.run ? '⏸ Pause' : '▶ Start'}</button><button type="button" class="btn ghost" data-px="cl-reset">↺ Reset</button><button type="button" class="btn ghost" data-px="cl-next">⏭ Next speech</button><button type="button" class="btn ghost" data-px="cl-poi">🔔 POI bell</button></div></div>`;
    } else h += `<p class="su-seglbl" style="margin-top:14px">All speeches done: judges, over to you!</p><div class="row" style="justify-content:center"><button type="button" class="btn gold" data-px="cl-restart">↺ Start the format again</button></div>`;
    h += `<div class="su-segs" style="margin-top:12px" role="list" aria-label="Debate running order">${CL.segs.map((s, i) => `<button type="button" role="listitem" class="chip ${i === CL.cur ? 'sel' : ''} ${i < CL.cur ? 'done' : ''}" data-px="cl-seg" data-i="${i}">${i + 1}. ${E(s.label.split(' · ')[0])} · ${E(CL.teams[s.team].name)} (${s.mins}′)</button>`).join('')}</div>
      <p class="hint" style="margin-top:8px">Bells: one ring when protected time ends (30 s in), one ring at 30 s left, two rings at time. The clock keeps counting overtime in red.</p></div>`;
    h += `<div class="grid2"><div class="card"><h3>🎲 Random speaker picker</h3><p class="hint">One name per line. Nobody is picked twice until everyone has spoken.</p>
        <div class="su-teams">${CL.teams.map((t, i) => `<label class="field"><span>${E(t.name)}</span><textarea class="su-ta" rows="4" data-su-in="cl.teams.${i}.roster" placeholder="Names…">${E(t.roster)}</textarea></label>`).join('')}</div>
        <div class="row" style="margin-top:8px"><button type="button" class="btn gold" data-px="cl-pick" data-i="${seg ? seg.team : 0}">Pick from ${E(seg ? CL.teams[seg.team].name : CL.teams[0].name)}</button><button type="button" class="btn ghost" data-px="cl-pick" data-i="-1">Pick from everyone</button></div>
        <p class="su-picked" aria-live="polite" style="color:var(--gold)">${E(CL.picked)}</p></div>
      <div class="card"><h3>⏱️ Format & timings</h3><p class="hint">Minutes per speech. Changes apply when that speech starts or is reset.</p>
        <div style="display:flex;flex-direction:column;gap:6px">${CL.segs.map((s, i) => `<label class="row" style="justify-content:space-between;gap:8px"><span style="flex:1 1 140px">${i + 1}. ${E(s.label)}</span><input class="su-in" type="number" min="0.5" max="15" step="0.5" style="width:5.5em" data-su-in="cl.segs.${i}.mins" data-su-num="1" value="${s.mins}" aria-label="Minutes for ${E(s.label)}"></label>`).join('')}</div>
        <div class="row" style="margin-top:8px"><button type="button" class="btn ghost" data-px="cl-preset" data-k="std">Standard 3/2/2</button><button type="button" class="btn ghost" data-px="cl-preset" data-k="short">Quick 2/1/1</button></div></div></div>`;
    h += `<div class="card"><h3>📋 Judge’s rubric</h3><p class="hint">Score each team 0–10 per criterion. Totals update live.</p>
      <div style="overflow-x:auto"><table class="su-jt"><thead><tr><th scope="col">Criterion</th>${CL.teams.map(t => `<th scope="col">${E(t.name)}</th>`).join('')}</tr></thead><tbody>
      ${JUDGE.map(([k, n]) => `<tr><th scope="row" style="font-weight:600">${E(n)}</th>${[0, 1].map(i => `<td><input type="number" min="0" max="10" inputmode="numeric" data-su-in="cl.judge.${i}.${k}" data-su-num="1" value="${CL.judge[i][k] != null ? CL.judge[i][k] : ''}" aria-label="${E(CL.teams[i].name)}: ${E(n)}"></td>`).join('')}</tr>`).join('')}
      <tr><th scope="row">Total / 50</th>${[0, 1].map(i => `<td><b id="su-jt${i}">${clJudgeTotal(i)}</b></td>`).join('')}</tr></tbody></table></div>
      <div class="row" style="margin-top:10px"><button type="button" class="btn gold" data-px="cl-win">🏆 Declare the winner</button><button type="button" class="btn ghost" data-px="cl-clear">Clear scores</button></div>
      ${CL.winner ? `<p class="fb good" style="font-size:1.15rem" aria-live="polite">${E(CL.winner)}</p>` : ''}</div>`;
    return h;
  }

  /* ------------------------------------------------------------------ COACH'S CORNER ------------------------------------------------------------------ */
  function coachRender() {
    const C = [
      ['🪧 Signposting', 'Signposts tell the audience where you are in your speech, so they never get lost. Judges reward speakers who are easy to follow.', ['Today I will prove three things…', 'My first point is…', 'Moving on to…', 'My opponent claimed… however…', 'To sum up…', 'Therefore, this House must…'], 'Module 3 link: organisation and coherence in speech writing (introduction, body, conclusion).'],
      ['✋ Points of information (POIs)', 'A POI is a short question or comment offered to the speaker from the other team. Stand, say “On that point!” and wait. If accepted, speak for no more than 15 seconds. If you are speaking, accept one or two, but not during protected time (the first and last 30 seconds).', ['“On that point!”', '“Will the speaker take a point?”', '“No thank you, I’ll come to that.”', '“I’ll take one from the gentleman/lady in blue.”'], 'Handling a POI calmly shows confidence and respect for audience and opponents.'],
      ['🛡️ Rebuttal techniques', 'Rebut the argument, never the person. Use the four steps: THEY SAID (name their point) → BUT (your counter-claim) → BECAUSE (reason or evidence) → THEREFORE (why it matters for the motion). Then choose your weapon: deny the facts, minimise the impact, turn it to your side, or outweigh it with a bigger issue.', ['Deny', 'Minimise', 'Turn', 'Outweigh', 'Expose the fallacy'], 'Practise in Rebuttal Rally and Fallacy Finder, then go live in Debate Duel.'],
      ['😮‍💨 Managing nerves', 'Nerves are energy. Steer them. Try box breathing below: in for 4, hold for 4, out for 4, hold for 4. Memorise your first sentence word for word, plant your feet, find three friendly faces, and remember that a pause looks confident even when it feels long.', ['Breathe 4-4-4-4', 'Memorise line one', 'Water, not energy drinks', 'Slow down by 10%'], 'The audience wants you to succeed. Most nerves are invisible to them.'],
      ['🎚️ Register for your audience', 'Register is the level of formality you choose for audience, purpose and context. A debate or oral presentation calls for formal or consultative register: Standard English, no slang, respectful address (“Madam Chair”). Creole can be used deliberately for effect: a quotation, a proverb or a character’s voice, as long as you show it is a choice.', ['Frozen', 'Formal', 'Consultative', 'Casual', 'Intimate'], 'Module 2 and 3 link: register, code-switching and profiling your audience before you speak.'],
      ['🗂️ Paper 3 & oral presentation', 'Plan like a cue card: no more than 10 key points, not a script. Open with a hook, state your purpose, deliver points with evidence, then close with a call to action. Shape your language, examples and appeals (ethos, pathos, logos and kairos) for the stated audience in your Paper 032 brief.', ['Hook', 'Purpose', '3 points + evidence', 'Appeals', 'Call to action'], 'Clear structure, audience awareness and confident delivery are what top-band (Grade One) oral work looks like.']
    ];
    return `<div class="card"><span class="kicker">Coach’s Corner</span><h2>Debating skills for Module 3 and Paper 3</h2><p class="hint">Short, practical coaching. Tap Listen on any card to hear it read aloud.</p></div>
      <div class="su-coach">${C.map(([t, b, ph, link], i) => `<div class="card"><h3>${t}</h3><p>${E(b)}</p><div class="su-phr">${ph.map(x => `<span>${E(x)}</span>`).join('')}</div>${i === 3 ? '<div class="su-breath" aria-hidden="true"></div>' : ''}<p class="hint">${E(link)}</p><div class="row">${A.listenBtn ? A.listenBtn('Listen') : ''}</div></div>`).join('')}</div>`;
  }

  /* ------------------------------------------------------------------ HUB ------------------------------------------------------------------ */
  function hubRender() {
    const p = P();
    const G = [
      ['spin', '🎡', 'Impromptu Spin', 'Solo · 3–4 min', 'Spin a topic wheel, plan with Point → Reason → Example → Close, speak against the clock, then rate yourself or a partner.'],
      ['duel', '⚔️', 'Debate Duel', 'Solo · 10–15 min', `Pick from ${MOTIONS.length} Caribbean motions, build three PEEL arguments and fight off your opponent’s rebuttals.`],
      ['rally', '🏓', 'Rebuttal Rally', 'Solo · speed', `Choose the strongest comeback under time pressure. ${RALLY.length} claims. Best streak: ${p.rally || 0}.`],
      ['fallacy', '🕵️', 'Fallacy Finder', 'Solo · quiz', `Spot straw men, red herrings and slippery slopes in ${FF.length} Caribbean snippets. Best streak: ${p.fallacy || 0}.`],
      ['appeal', '🗂️', 'Appeal Sort', 'Solo · speed', `Race to sort ${APPEALS.length} lines into ethos, pathos and logos, with kairos for bonus points. Best: ${p.appeal || 0}.`],
      ['minute', '⏱️', 'Sixty-Second Stand', 'Solo or class', 'One subject, sixty seconds: no hesitation, repetition or deviation. Buzzer challenges in class mode.'],
      ['floor', '🏛️', 'Classroom Debate Floor', 'Teacher · projector', 'Big timers with bells, POI bell, team scoreboard, random speaker picker and a judge’s rubric.'],
      ['coach', '🧭', 'Coach’s Corner', 'Read · 5 min', 'Signposting, POIs, rebuttal techniques, nerves and register, linked to Module 3 and Paper 3.']
    ];
    return `<div class="su-tiles">${G.map(([k, ic, n, tag, d]) => `<button type="button" class="tile" data-go="speakup" data-tab="${k}"><span class="ticon" aria-hidden="true">${ic}</span><span class="su-tag">${tag}</span><h3>${n}</h3><span class="meta">${E(d)}</span></button>`).join('')}</div>
      <div class="card"><h3>Why play?</h3><p>Module 3 asks you to communicate for different audiences and purposes, to persuade with the rhetorical appeals and to deliver with confidence. These games train each skill in short bursts: thinking on your feet, structuring a point, answering an opponent and choosing the right register.</p></div>`;
  }

  /* ------------------------------------------------------------------ PLUGIN ------------------------------------------------------------------ */
  function render(api, loc) {
    A = api;
    const tab = TABS.some(t => t[0] === loc.tab) ? loc.tab : 'hub';
    if (TM.key && TM.tab !== tab) { tPause(); }
    let body = '';
    if (tab === 'hub') body = hubRender(); else if (tab === 'spin') body = spinRender(); else if (tab === 'duel') body = duelRender(); else if (tab === 'rally') body = rallyRender();
    else if (tab === 'fallacy') body = ffRender(); else if (tab === 'appeal') body = apRender(); else if (tab === 'minute') body = mnRender(); else if (tab === 'floor') body = floorRender(); else if (tab === 'coach') body = coachRender();
    return `<div class="su" data-su-root="${tab}">
      <section class="hero su-hero"><span class="eyebrow">Module 3 · Oral communication · Paper 3</span><h1><span aria-hidden="true">🎤</span> Speak Up Arena</h1><p>Debate and impromptu speaking games. Think on your feet, argue with evidence and own the room.</p></section>
      <nav class="su-nav" aria-label="Speak Up Arena games">${TABS.map(([k, ic, n]) => `<button type="button" class="chip ${k === tab ? 'sel' : ''}" data-go="speakup" data-tab="${k}" ${k === tab ? 'aria-current="page"' : ''}><span aria-hidden="true">${ic}</span>${n}</button>`).join('')}</nav>
      ${body}<p class="su-sr" id="su-live" aria-live="assertive"></p></div>`;
  }
  function mount(api) { A = api; paint(); if (TM.onPaint) TM.onPaint(); }

  function click(action, el, api) {
    A = api; const d = el.dataset, p = P();
    switch (action) {
      case 'tpause': if (TM.run) tPause(); else tResume(); return;
      /* spin */
      case 'sp-pt': SP.prep = +d.v; api.render(); return;
      case 'sp-st': SP.speak = +d.v; api.render(); return;
      case 'sp-live': SP.liveF = !SP.liveF; SP.sr.note = ''; api.render(); return;
      case 'sp-cat': case 'sp-spin': {
        if (SP.phase === 'spinning') return;
        const i = action === 'sp-cat' ? +d.i : rnd(CATS.length), n = CATS.length, center = (i + 0.5) * 360 / n;
        const base = SP.rot - (SP.rot % 360);
        SP.rot = base + (action === 'sp-cat' ? 0 : 360 * 5) + ((360 - center) % 360);
        SP.cat = i; SP.topic = pick(CATS[i].t);
        const finish = () => { SP.phase = 'topic'; SND.ding(); announce('Topic: ' + SP.topic); rerender('spin'); };
        if (action === 'sp-cat' || RM()) { finish(); return; }
        SP.phase = 'spinning'; SND.whoosh();
        const w = $('#su-wheel'); if (w) w.style.transform = `rotate(${SP.rot}deg)`;
        const b = el; b.disabled = true; b.textContent = '🎡 Spinning…';
        setTimeout(finish, 2700); return;
      }
      case 'sp-reroll': { const c = CATS[SP.cat]; SP.topic = pick(c.t.filter(t => t !== SP.topic)); api.render(); return; }
      case 'sp-back': SP.phase = 'wheel'; api.render(); return;
      case 'sp-prep': SP.phase = 'prep'; SP.manualF = 0; SP.sr.count = 0; SP.sr.note = ''; SP.rate = {}; SP.result = null;
        if (SP.rec.url) { try { URL.revokeObjectURL(SP.rec.url); } catch (e) { } SP.rec.url = ''; } SP.rec.note = '';
        SND.ding(); tStart('spin', 'sp-prep', SP.prep, spinGoSpeak); api.render(); return;
      case 'sp-go': tStop(); spinGoSpeak(); return;
      case 'sp-done': spinEndSpeak(); return;
      case 'sp-f': { SP.manualF++; const e2 = $('#su-fman'); if (e2) e2.textContent = SP.manualF; return; }
      case 'sp-rec': recStart(); return;
      case 'sp-recstop': recStop(); return;
      case 'sp-mode': SP.mode = d.k; api.render(); return;
      case 'sp-rate': SP.rate[d.k] = +d.v; el.parentNode.querySelectorAll('.chip').forEach(c => { const on = c === el; c.classList.toggle('sel', on); c.setAttribute('aria-checked', String(on)); }); return;
      case 'sp-score': {
        const miss = RUBRIC.filter(([k]) => !SP.rate[k]);
        if (miss.length) { api.toast('Rate every row first: ' + miss.map(m => m[1]).join(', ')); return; }
        SP.result = spinScore(); SP.phase = 'result'; p.spins = (p.spins || 0) + 1; saveP();
        coins(SP.result.pct >= 75 ? 5 : 3, 'Impromptu speech'); api.render(); return;
      }
      case 'sp-again': SP.phase = 'wheel'; SP.plan = { p: '', r: '', e: '', c: '' }; api.render(); return;
      case 'sp-same': SP.phase = 'topic'; api.render(); return;
      /* duel */
      case 'du-theme': DU.theme = d.k; api.render(); return;
      case 'du-diff': DU.diff = +d.v; api.render(); return;
      case 'du-random': { const list = MOTIONS.map((m, i) => [m, i]).filter(([m]) => (DU.theme === 'all' || m.t === DU.theme) && (!DU.diff || m.d === DU.diff)); const c = pick(list.length ? list : MOTIONS.map((m, i) => [m, i])); DU.mi = c[1]; DU.phase = 'side'; DU.side = null; SND.ding(); api.render(); return; }
      case 'du-motion': DU.mi = +d.i; DU.phase = 'side'; DU.side = null; api.render(); return;
      case 'du-side': DU.side = d.k; api.render(); return;
      case 'du-ai': DU.useAI = d.v === '1'; api.render(); return;
      case 'du-repick': DU.phase = 'pick'; api.render(); return;
      case 'du-build': if (!DU.side) return; DU.phase = 'build'; DU.warn = ''; DU.rounds = []; DU.r = 0; DU.verdict = null; api.render(); return;
      case 'du-back': DU.phase = 'side'; api.render(); return;
      case 'du-clash': {
        const bad = DU.args.findIndex(a => words(a.p).length < 3);
        if (bad >= 0) { DU.warn = `Argument ${bad + 1} needs a Point of at least three words.`; api.render(); return; }
        DU.warn = ''; DU.phase = 'clash'; DU.r = 0; DU.rounds = []; DU.draft = ''; SND.bell(1);
        { const pr = getRebuttal(0); api.render(); pr.then(() => rerender('duel')); } return;
      }
      case 'du-speak': { const R = DU.rounds[DU.r]; if (R) api.speak(R.rebut); return; }
      case 'du-submit': {
        const R = DU.rounds[DU.r]; if (!R) return;
        if (words(DU.draft).length < 5) { DU.warn = 'Write at least one full sentence to rebut.'; api.render(); return; }
        DU.warn = ''; R.counter = DU.draft.trim(); R.sc = scoreCounter(R.counter, R.rebut); DU.draft = '';
        if (R.sc.total >= 14) SND.good(); coins(R.sc.total >= 14 ? 4 : 2, 'Debate clash'); api.render(); return;
      }
      case 'du-next': if (DU.r < 2) { DU.r++; DU.draft = ''; const pr = getRebuttal(DU.r); api.render(); pr.then(() => rerender('duel')); return; } // fallthrough to summary
      // eslint-disable-next-line no-fallthrough
      case 'du-tosum': DU.speech = buildSpeech(); DU.phase = 'summary'; api.render(); return;
      case 'du-read': api.speak(DU.speech); return;
      case 'du-verdict': {
        DU.verdict = duelVerdict(); DU.phase = 'verdict'; p.duels = (p.duels || 0) + 1; saveP();
        SND.bell(DU.verdict.win ? 3 : 1); coins(DU.verdict.win ? 7 : 4, DU.verdict.win ? 'Debate won' : 'Debate completed'); api.render(); return;
      }
      case 'du-new': DU.phase = 'pick'; DU.side = null; DU.args = [blankArg(), blankArg(), blankArg()]; DU.rounds = []; DU.speech = ''; api.render(); return;
      case 'du-swap': DU.side = DU.side === 'prop' ? 'opp' : 'prop'; DU.args = [blankArg(), blankArg(), blankArg()]; DU.rounds = []; DU.speech = ''; DU.phase = 'build'; api.render(); return;
      /* rally */
      case 'ra-secs': RA.secs = +d.v; api.render(); return;
      case 'ra-start': Object.assign(RA, { phase: 'play', order: shuf(RALLY.map((_, i) => i)).slice(0, RA.n), i: 0, streak: 0, best: 0, right: 0 }); rallyStartQ(); api.render(); return;
      case 'ra-pick': {
        if (RA.pick != null) return; const v = +d.v; RA.pick = v; if (TM.key === 'ra') tStop();
        if (v === 0) { RA.right++; RA.streak++; RA.best = Math.max(RA.best, RA.streak); SND.good(); if (RA.streak > (p.rally || 0)) { p.rally = RA.streak; saveP(); } } else { RA.streak = 0; SND.bad(); }
        api.render(); return;
      }
      case 'ra-next': RA.i++; if (RA.i >= RA.n) { RA.phase = 'done'; tStop(); coins(Math.max(1, Math.ceil(RA.right / 2)), 'Rebuttal Rally'); } else rallyStartQ(); api.render(); return;
      /* fallacy */
      case 'ff-start': Object.assign(FQ, { phase: 'play', order: shuf(FF.map((_, i) => i)).slice(0, FQ.n), i: 0, streak: 0, best: 0, right: 0 }); ffStartQ(); api.render(); return;
      case 'ff-pick': {
        if (FQ.pick != null) return; FQ.pick = d.k; const ok = d.k === FF[FQ.order[FQ.i]][1];
        if (ok) { FQ.right++; FQ.streak++; FQ.best = Math.max(FQ.best, FQ.streak); SND.good(); if (FQ.streak > (p.fallacy || 0)) { p.fallacy = FQ.streak; saveP(); } } else { FQ.streak = 0; SND.bad(); }
        api.render(); return;
      }
      case 'ff-next': FQ.i++; if (FQ.i >= FQ.n) { FQ.phase = 'done'; coins(Math.max(1, Math.ceil(FQ.right / 2)), 'Fallacy Finder'); } else ffStartQ(); api.render(); return;
      /* appeal */
      case 'ap-secs': AP.secs = +d.v; api.render(); return;
      case 'ap-start': {
        const kai = shuf(APPEALS.map((a, i) => [a, i]).filter(([a]) => a[1] === 'kairos').map(x => x[1])).slice(0, 3);
        const rest = shuf(APPEALS.map((a, i) => i).filter(i => !kai.includes(i))).slice(0, AP.n - kai.length);
        Object.assign(AP, { phase: 'play', order: shuf(kai.concat(rest)), i: 0, score: 0, right: 0, last: null, miss: [] });
        tStart('appeal', 'ap', AP.secs, apEnd); api.render(); return;
      }
      case 'ap-sort': apSort(d.k); return;
      /* minute */
      case 'mn-mode': MN.mode = d.k; api.render(); return;
      case 'mn-add': if (MN.players.length < 6) MN.players.push({ n: 'Player ' + (MN.players.length + 1), s: 0 }); api.render(); return;
      case 'mn-rem': if (MN.players.length > 2) MN.players.pop(); if (MN.sp >= MN.players.length) MN.sp = 0; api.render(); return;
      case 'mn-sp': MN.sp = +d.i; api.render(); return;
      case 'mn-start': mnStart(); api.render(); return;
      case 'mn-stop': mnEnd(); return;
      case 'mn-setup': MN.phase = 'setup'; tStop(); api.render(); return;
      case 'mn-zero': MN.players.forEach(x => x.s = 0); api.render(); return;
      case 'mn-fault': MN.faults[d.k]++; SND.bad(); api.render(); return;
      case 'mn-buzz': tPause(); SND.buzz(); MN.phase = 'challenge'; MN.ch = null; MN.why = null; api.render(); return;
      case 'mn-ch': MN.ch = +d.i; api.render(); return;
      case 'mn-why': MN.why = d.k; api.render(); return;
      case 'mn-uphold': { if (MN.ch == null || !MN.why) return; const c = MN.players[MN.ch]; c.s++; MN.log.push(`${c.n} challenged ${MN.players[MN.sp].n} for ${WHY[MN.why][0].toLowerCase()}: upheld (+1). ${c.n} takes over.`); MN.sp = MN.ch; MN.phase = 'play'; SND.good(); tResume(); api.render(); return; }
      case 'mn-over': { if (MN.ch == null) return; const s = MN.players[MN.sp]; s.s++; MN.log.push(`${MN.players[MN.ch].n}’s challenge overruled: ${s.n} +1 and continues.`); MN.phase = 'play'; tResume(); api.render(); return; }
      /* floor */
      case 'cl-big': { CL.big = !CL.big; api.render(); const t = document.querySelector('.su-seglbl'); if (CL.big && t && t.scrollIntoView) { try { t.scrollIntoView({ block: 'start', behavior: RM() ? 'auto' : 'smooth' }); } catch (e) { } } const bb = document.querySelector('[data-px="cl-big"]'); if (bb) bb.focus(); return; }
      case 'cl-fs': { const r = document.querySelector('[data-su-root]'); try { if (document.fullscreenElement) document.exitFullscreen(); else if (r && r.requestFullscreen) r.requestFullscreen().catch(() => api.toast('Full screen is not allowed here. Use the Big screen button instead.')); else api.toast('Full screen is not available here. Use the Big screen button instead.'); } catch (e) { api.toast('Full screen is not available here.'); } return; }
      case 'cl-sc': { const t = CL.teams[+d.i]; t.score = Math.max(0, t.score + (+d.v)); const s = document.querySelector(`[data-su-tsc="${d.i}"]`); if (s) s.textContent = t.score; if (+d.v > 0) SND.ding(); return; }
      case 'cl-go': if (TM.key !== 'cl') clArm(true); else if (TM.run) tPause(); else { tResume(); } paint(); return;
      case 'cl-reset': clArm(false); api.render(); return;
      case 'cl-next': CL.cur++; CL.picked = ''; tStop(); if (CL.cur < CL.segs.length) clArm(false); api.render(); return;
      case 'cl-seg': CL.cur = +d.i; tStop(); clArm(false); api.render(); return;
      case 'cl-restart': CL.cur = 0; tStop(); clArm(false); api.render(); return;
      case 'cl-poi': SND.ding(); announce('Point of information'); return;
      case 'cl-preset': { const v = d.k === 'short' ? [2, 2, 1, 1, 1, 1] : [3, 3, 2, 2, 2, 2]; CL.segs.forEach((s, i) => s.mins = v[i]); clPersist(); tStop(); clArm(false); api.render(); return; }
      case 'cl-pick': {
        const i = +d.i, teams = i < 0 ? [0, 1] : [i];
        let pool = []; teams.forEach(t => CL.teams[t].roster.split(/[\n,]+/).map(s => s.trim()).filter(Boolean).forEach(n => { if (!CL.used[t].includes(n)) pool.push([t, n]); }));
        if (!pool.length) { teams.forEach(t => CL.used[t] = []); teams.forEach(t => CL.teams[t].roster.split(/[\n,]+/).map(s => s.trim()).filter(Boolean).forEach(n => pool.push([t, n]))); }
        if (!pool.length) { api.toast('Type some names into the roster first.'); return; }
        const [t, n] = pick(pool); CL.used[t].push(n); CL.picked = `🎤 ${n} (${CL.teams[t].name})`; SND.ding(); api.render(); return;
      }
      case 'cl-win': {
        const a = clJudgeTotal(0), b = clJudgeTotal(1), t = CL.teams;
        CL.winner = a === b ? `It’s a tie at ${a} points each! The chair may award the debate on the strongest rebuttal.` : `🏆 ${a > b ? t[0].name : t[1].name} win the debate, ${Math.max(a, b)} to ${Math.min(a, b)}.`;
        SND.bell(3); coins(3, 'Classroom debate'); api.render(); return;
      }
      case 'cl-clear': CL.judge = [{}, {}]; CL.winner = null; CL.teams.forEach(t => t.score = 0); api.render(); return;
    }
  }

  /* ---------- delegated input + keyboard (attached once) ---------- */
  const ROOTS = { sp: SP, du: DU, cl: CL, mn: MN };
  document.addEventListener('input', e => {
    const el = e.target && e.target.closest ? e.target.closest('[data-su-in]') : null; if (!el) return;
    const path = el.getAttribute('data-su-in').split('.'); let o = ROOTS[path[0]]; if (!o) return;
    for (let i = 1; i < path.length - 1; i++) { o = o[path[i]]; if (o == null) return; }
    const k = path[path.length - 1]; let v = el.value;
    if (el.hasAttribute('data-su-num')) { v = v === '' ? null : Math.max(0, +v); if (path[1] === 'judge' && v != null) v = Math.min(10, v); }
    o[k] = v;
    if (path[0] === 'cl') {
      if (path[1] === 'judge') [0, 1].forEach(i => { const t = document.getElementById('su-jt' + i); if (t) t.textContent = clJudgeTotal(i); });
      if (path[1] === 'segs' && v > 0) { clPersist(); if (+path[2] === CL.cur && TM.key === 'cl' && !TM.run && TM.left === TM.total) { clArm(false); } }
      if (path[1] === 'teams' && k === 'name') clPersist();
    }
    if (path[0] === 'du' && path[1] === 'args') { const box = el.closest('.su-arg'); if (box) { const a = DU.args[+path[2]]; const f = ['p', 'e', 'x', 'l'].map(x => String(a[x]).trim().length > 0); box.querySelectorAll('.su-dots i').forEach((dot, i) => dot.classList.toggle('on', f[i])); } }
  });
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target, tag = t && t.tagName; if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
    const tab = curTab(); if (!tab || !A) return;
    const key = (e.key || '').toLowerCase();
    if (tab === 'appeal' && AP.phase === 'play') { const m = { e: 'ethos', p: 'pathos', l: 'logos', k: 'kairos' }[key]; if (m) { e.preventDefault(); apSort(m); } return; }
    if ((tab === 'rally' && RA.phase === 'play' && RA.pick == null) || (tab === 'fallacy' && FQ.phase === 'play' && FQ.pick == null)) {
      const n = +key; if (n >= 1 && n <= 4) { const b = document.querySelectorAll(tab === 'rally' ? '[data-px="ra-pick"]' : '[data-px="ff-pick"]')[n - 1]; if (b) { e.preventDefault(); b.click(); } }
    }
  });

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: ID,
    title: 'Speak Up Arena',
    tile: { icon: '🎤', meta: 'Debate & impromptu games: topic spinner, debate duels, rebuttal rally, fallacies, appeals, classroom debate timer' },
    render, mount, click
  });
})();
