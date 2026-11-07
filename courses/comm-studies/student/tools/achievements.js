/* Trophy Room: original emote badges + achievements for the CAPE Communication Studies e-course.
   Mascots: Coin Buddy, Zippy the hummingbird, Shelly the sea turtle, Pelly the pelican, Pan Man the steelpan.
   All art is inline SVG built from small reusable parts. State: S.ach = { <id>: 1, _c: lifetime coins, _s: [showcase emote ids] }. */
(function () {
  'use strict';
  /* ================= SVG parts ================= */
  const O = '#16213e', N = ' stroke="none"';
  const r1 = v => Math.round(v * 10) / 10;
  const C = (x, y, r, f, a) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${a || ''}/>`;
  const E = (x, y, rx, ry, f, a) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"${a || ''}/>`;
  const P = (d, f, a) => `<path d="${d}" fill="${f || 'none'}"${a || ''}/>`;
  const T = (x, y, sz, t, f, a) => `<text x="${x}" y="${y}" font-size="${sz}" font-family="Arial Black,Arial,Helvetica,sans-serif" font-weight="900" text-anchor="middle" fill="${f}" stroke-width="2" paint-order="stroke"${a || ''}>${t}</text>`;
  const HL = (x, y, rx, ry, rot) => E(x, y, rx, ry, '#fff', ` opacity=".6"${N}${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}`);
  const LIMB = (d, col) => P(d, 'none', ' stroke-width="8"') + P(d, 'none', ` stroke="${col}" stroke-width="4"`);
  function star(cx, cy, n, R, r) { let d = ''; for (let i = 0; i < n * 2; i++) { const a = Math.PI * i / n - Math.PI / 2, q = i % 2 ? r : R; d += (i ? 'L' : 'M') + r1(cx + q * Math.cos(a)) + ' ' + r1(cy + q * Math.sin(a)); } return d + 'Z'; }
  const HEART = 'M0 8C-12 0-10-10-4-9-2-9 0-7 0-5 0-7 2-9 4-9 10-10 12 0 0 8Z';

  /* Characters: body art + face anchor [x, y, scale] */
  const CH = {
    coin: { f: [32, 32, 1], b: () => C(32, 35, 23, '#ffc83d') + C(32, 35, 17.5, 'none', ' stroke="#e09b16" stroke-width="2.2"') + P('M15 47A21 21 0 0 0 49 47', 'none', ' stroke="#e09b16" stroke-width="3"' ) + HL(21, 22, 6, 3.2, -35) + C(45, 20, 1.6, '#fff', N) },
    pan: { f: [32, 37, .8], b: () => P('M9 25V47Q32 62 55 47V25Z', '#c3cede') + P('M9 43.5Q32 57.5 55 43.5', 'none', ' stroke="#e94b5a" stroke-width="3.4"') + P('M9 40.5Q32 54.5 55 40.5', 'none', ' stroke="#ffc83d" stroke-width="2"') + E(32, 25, 23, 9, '#eef3fa') + E(24, 24, 6, 3.3, '#d5deeb', ' stroke-width="1.4"') + E(39.5, 23, 5, 3, '#d5deeb', ' stroke-width="1.4"') + E(32, 29, 4, 1.8, '#d5deeb', ' stroke-width="1.4"') + HL(18, 41, 2, 6, 10) },
    bird: { f: [31, 33, .9], b: () => P('M14 46L3 57 11 58 18 50Z', '#2a7fd4') + P('M45 31L62 30 46 37Z', '#2b2f45') + C(28, 36, 19, '#2fc4a0') + E(29, 46, 11, 7, '#c8f5e6', N) + P('M23 18Q24 9 31 11Q27 13 29 18', '#ff4d8d') + P('M11 36Q1 24 12 21Q19 29 18 40Z', '#7b5cff') + HL(21, 25, 5, 2.6, -35) },
    turtle: { f: [32, 24, .78], b: () => E(11, 51, 7, 4, '#8ed36e', ' transform="rotate(30 11 51)"') + E(53, 51, 7, 4, '#8ed36e', ' transform="rotate(-30 53 51)"') + E(32, 44, 23, 15, '#2f9461') + P('M24 38L32 34 40 38V47L32 51 24 47Z', '#47b57a', ' stroke-width="2"') + P('M24 38L13 36M40 38 51 36M24 47 15 53M40 47 49 53', 'none', ' stroke-width="2"') + HL(19, 40, 4, 2, -30) + C(32, 25, 13, '#8ed36e') + HL(26, 18, 3.5, 2, -35) },
    pel: { f: [32, 23, .85], b: () => E(32, 48, 19, 13, '#e4eaf3') + P('M14 46Q21 38 30 46Q24 57 14 52Z', '#c2cde0') + C(32, 26, 15, '#fff') + P('M29 12Q33 3 39 9Q34 9 33 12', '#ffc83d') + P('M26 30Q24 51 33 57Q42 49 38 30Q32 27 26 30Z', '#ffa93a') + P('M32 31Q32 45 33 55', 'none', ' stroke="#d97a12" stroke-width="1.5"') + HL(24, 18, 4, 2.2, -35) }
  };
  /* Eyes (one eye at x) and mouths, drawn in face space */
  const EYE = {
    dot: x => E(x, 0, 2.8, 3.6, O, N) + C(x + 1, -1.3, 1.1, '#fff', N),
    happy: x => P(`M${x - 3.5} 1.5Q${x} -4 ${x + 3.5} 1.5`, 'none', ' stroke-width="2.6"'),
    closed: x => P(`M${x - 3.5} -1Q${x} 3 ${x + 3.5} -1`, 'none', ' stroke-width="2.6"'),
    star: x => P(star(x, 0, 5, 5, 2.2), '#ffe14d', ' stroke-width="1.4"'),
    heart: x => P(HEART, '#ff3d6e', ` stroke-width="3" transform="translate(${x} 0) scale(.45)"`),
    wide: x => C(x, 0, 4.6, '#fff', ' stroke-width="1.8"') + C(x, .5, 1.9, O, N),
    det: x => E(x, .5, 2.6, 3.2, O, N) + C(x + .9, -.6, 1, '#fff', N) + P(x < 0 ? `M${x - 4} -6L${x + 3} -4` : `M${x + 4} -6L${x - 3} -4`, 'none', ' stroke-width="2.4"')
  };
  const SHADES = P('M-12.5-4H-1.5Q-1.5 4-7 4Q-12.5 4-12.5-4ZM1.5-4H12.5Q12.5 4 7 4Q1.5 4 1.5-4Z', '#141a2e', ' stroke-width="2"') + P('M-1.5-3H1.5', 'none', ' stroke-width="2"') + P('M-10-2L-7 1M3.5-2L6.5 1', 'none', ' stroke="#fff" stroke-width="1.3" opacity=".75"');
  const SPECS = C(-7, 0, 5.2, '#bfeaff', ' fill-opacity=".3" stroke-width="2"') + C(7, 0, 5.2, '#bfeaff', ' fill-opacity=".3" stroke-width="2"') + P('M-1.8 0H1.8', 'none', ' stroke-width="2"');
  const MOUTH = {
    smile: P('M-5-1Q0 5 5-1', 'none', ' stroke-width="2.6"'),
    grin: P('M-6-1Q0 10 6-1Z', O, ' stroke-width="1.5"') + P('M-3 4.4Q0 2 3 4.4Q0 6.8-3 4.4Z', '#ff7a8a', N),
    o: E(0, 1, 3, 3.8, O, N),
    kiss: P('M-1.5-3.5Q3-2 0 0Q3 2-1.5 3.5', 'none', ' stroke-width="2.4"'),
    smirk: P('M-5 1Q1 4 5-2', 'none', ' stroke-width="2.6"'),
    cat: P('M-5-1Q-2.5 3 0-.5Q2.5 3 5-1', 'none', ' stroke-width="2.4"'),
    wavy: P('M-6 1L-3-1 0 1 3-1 6 1', 'none', ' stroke-width="2.2"')
  };
  /* Props, centred on 0,0 */
  const PR = {
    crown: P('M-11 6V-6L-5.5-1 0-10 5.5-1 11-6V6Z', '#ffd23f') + C(0, 2, 2, '#ff4d6d', ' stroke-width="1.2"') + C(-6, 3, 1.4, '#2fc4e0', ' stroke-width="1"') + C(6, 3, 1.4, '#2fc4e0', ' stroke-width="1"'),
    flame: P('M0-15C9-6 12 1 9 8 6 14-6 14-9 8-12 1-6-3-3-9-2-4 1-3 0-15Z', '#ff6a2b') + P('M0-4C5 1 6 5 4 8 2 11-3 11-4 8-6 4-2 1 0-4Z', '#ffd23f', N),
    spark: P('M0-7Q1-1 7 0Q1 1 0 7Q-1 1-7 0Q-1-1 0-7Z', '#fff6c2', ' stroke-width="1.4"'),
    hat: P('M-8 7L0-13 8 7Z', '#ff5fa2') + P('M-5 0L4-3M-6.5 4L2.5 1', 'none', ' stroke="#fff" stroke-width="2"') + C(0, -14, 3, '#ffd23f', ' stroke-width="2"'),
    bulb: P('M0-17V-21M-11-11L-14-14M11-11L14-14', 'none', ' stroke="#ffd23f" stroke-width="2.6"') + P('M-3.5 6H3.5V11H-3.5Z', '#9aa6bd', ' stroke-width="2"') + C(0, -3, 9, '#fff27a') + P('M-3 1Q0-5 3 1', 'none', ' stroke="#e0a400" stroke-width="1.6"') + HL(-3.5, -7, 2.5, 1.4, -35),
    heart: P(HEART, '#ff3d6e') + P('M-6-5Q-5-7-3-7', 'none', ' stroke="#fff" stroke-width="1.6" opacity=".8"'),
    book: P('M0-5Q-6-9-13-7V8Q-6 6 0 9Q6 6 13 8V-7Q6-9 0-5Z', '#2e6bd9') + P('M0-4Q-5-7-11-5.5V6Q-5 4.5 0 7Q5 4.5 11 6V-5.5Q5-7 0-4ZM0-4V7', '#fff', ' stroke-width="1.5"') + P('M-8-2H-3M-8 1H-3M3-2H8M3 1H8', 'none', ' stroke="#9aa6bd" stroke-width="1.2"'),
    mag: P('M5 5L13 13', 'none', ' stroke-width="6"') + P('M5 5L13 13', 'none', ' stroke="#a8743c" stroke-width="3"') + C(0, 0, 8, '#bfeaff') + P('M-4-3Q-2-6 1-6', 'none', ' stroke="#fff" stroke-width="1.8"'),
    dhat: P('M-14 3Q0-3 14 3Q0 7-14 3Z', '#8a5a2b') + P('M-9 1Q-9-10 0-10 9-10 9 1Z', '#a8743c') + P('M-9-1Q0-4 9-1', 'none', ' stroke="#5a3a1b" stroke-width="2.5"'),
    mic: P('M10-12L14-15M12-6H17', 'none', ' stroke="#fff" stroke-width="2"') + P('M-2 2L-6 14H-1L2 3Z', '#2b2f45') + C(0, -4, 7, '#c9d3e3') + P('M-5-6H5M-6-2H6M-3-10V2M3-10V2', 'none', ' stroke="#7f8aa3" stroke-width="1"'),
    zzz: T(0, 0, 12, 'Z', '#bfe0ff') + T(8, -8, 9, 'z', '#bfe0ff') + T(14, -15, 7, 'z', '#bfe0ff'),
    brain: P('M-12 4Q-16-4-9-7Q-8-13 0-11Q8-13 9-7Q16-4 12 4Z', '#ff9ec4') + P('M0-10V3M-7-4Q-4-2-6 1M7-4Q4-2 6 1M-11 0Q-8-1-7 1M11 0Q8-1 7 1', 'none', ' stroke="#d45b8c" stroke-width="1.6"'),
    gg: P('M-14-9H14Q17-9 17-6V5Q17 8 14 8H-4L-9 13-8 8H-14Q-17 8-17 5V-6Q-17-9-14-9Z', '#fff') + T(0, 4.5, 12, 'GG', '#2e6bd9', ' stroke="#fff"'),
    check: C(0, 0, 9, '#2fbf71') + P('M-4.5 0L-1.5 3.5 4.5-3.5', 'none', ' stroke="#fff" stroke-width="3"'),
    trophy: P('M-8-7Q-14-7-12-1Q-11 2-7 2M8-7Q14-7 12-1Q11 2 7 2', 'none', ' stroke-width="2.4"') + P('M-8-10H8V-3Q8 6 0 6Q-8 6-8-3Z', '#ffd23f') + P('M-2 6H2V10H-2ZM-7 10H7V14H-7Z', '#e3a21a') + P('M-4-7V-1', 'none', ' stroke="#fff" stroke-width="2" opacity=".8"'),
    cal: P('M-10-6Q-10-9-7-9H7Q10-9 10-6V10H-10Z', '#fff') + P('M-10-3V-6Q-10-9-7-9H7Q10-9 10-6V-3Z', '#ff4d6d') + P('M-5-12V-7M5-12V-7', 'none', ' stroke-width="2.4"') + P('M-5 3L-2 6 4 0', 'none', ' stroke="#2fbf71" stroke-width="2.6"'),
    coins: E(0, 7, 9, 3.5, '#e09b16') + E(0, 3, 9, 3.5, '#ffc83d') + E(0, -1, 9, 3.5, '#ffd23f') + E(0, -5, 9, 3.5, '#ffe27a') + T(0, -2.6, 6, '$', '#e09b16', N),
    bag: P('M-5-6Q-5-13 0-13 5-13 5-6', 'none', ' stroke-width="2.4"') + P('M-9-6H9L11 11H-11Z', '#ff5fa2') + P(star(0, 2.5, 5, 4.5, 2), '#ffd23f', ' stroke-width="1.2"'),
    palm: P('M-1 16Q-4 4 0-6L3-6Q0 4 3 16Z', '#a8743c', ' stroke-width="2"') + P('M1-6Q-8-13-15-5Q-7-8 1-6Q-4-17 7-17Q3-11 1-6Q11-13 17-4Q9-8 1-6Z', '#2fbf71', ' stroke-width="2"') + C(-2, -4, 2, '#8a5a2b', ' stroke-width="1"') + C(3, -4, 2, '#8a5a2b', ' stroke-width="1"'),
    key: C(-7, 0, 6, '#ffd23f') + C(-7, 0, 2.2, O, N) + P('M-1-2H13V2H10V6H7V2H-1Z', '#ffd23f', ' stroke-width="2"'),
    joy: P('M-11 6Q-11 2-7 2H7Q11 2 11 6V7Q11 11 7 11H-7Q-11 11-11 7Z', '#2b2f45') + P('M0 3V-6', 'none', ' stroke-width="3"') + C(0, -8, 5, '#ff4d6d') + C(6, 6.5, 1.8, '#ffd23f', N) + HL(-1.6, -9.6, 1.6, 1, -30),
    qb: P('M-5 7L-10 14-1 10Z', '#fff') + C(0, 0, 10, '#fff') + T(0, 5.5, 15, '?', '#7b5cff', ' stroke="#fff"'),
    moon: P('M3-11A11 11 0 1 0 11 5 9 9 0 0 1 3-11Z', '#ffe27a'),
    sun: P('M0-11V-14M0 11V14M-11 0H-14M11 0H14M-8-8L-10-10M8-8L10-10M-8 8L-10 10M8 8L10 10', 'none', ' stroke="#ff8a00" stroke-width="2.6"') + C(0, 0, 7.5, '#ffb02e'),
    target: C(0, 0, 10, '#fff') + C(0, 0, 6.5, '#ff4d6d', ' stroke-width="1.6"') + C(0, 0, 3, '#fff', ' stroke-width="1.4"') + P('M0 0L12-12M12-12L13-17M12-12L17-13', 'none', ' stroke-width="2.4"'),
    pencil: `<g transform="rotate(-45)">` + P('M-3.5-14H3.5V6H-3.5Z', '#ffd23f') + P('M-3.5-14V-16Q0-20 3.5-16V-14Z', '#ff8fb1') + P('M-3.5 6L0 13 3.5 6Z', '#f2d3a0') + P('M-1.2 10.5L0 13 1.2 10.5Z', O) + '</g>',
    hund: P('M-14-8H14V8H-14Z', '#fff', ' stroke-width="2"') + T(0, 4.5, 12, '100', '#ff3d6e', ' stroke="#fff"') + P('M-10 10H10', 'none', ' stroke="#ff3d6e" stroke-width="2"'),
    phones: P('M-15 3Q-15-18 0-18Q15-18 15 3', 'none', ' stroke-width="6"') + P('M-15 3Q-15-18 0-18Q15-18 15 3', 'none', ' stroke="#7b5cff" stroke-width="2.6"') + P('M-20-2Q-20-5-17-5H-12V9H-17Q-20 9-20 6ZM20-2Q20-5 17-5H12V9H17Q20 9 20 6Z', '#7b5cff'),
    notes: P('M-4 6V-8L6-10V4', 'none', ' stroke-width="2.2"') + E(-6.5, 6, 3, 2.4, O, N) + E(3.5, 4, 3, 2.4, O, N),
    cap: P('M-8 2V7Q0 11 8 7V2L0 5Z', '#2b2f45') + P('M-15-2L0-9 15-2 0 5Z', '#2b2f45') + P('M15-2V7', 'none', ' stroke="#ffd23f" stroke-width="2"') + C(15, 8, 2, '#ffd23f', ' stroke-width="1.2"') + C(0, -2, 1.6, '#ffd23f', N),
    drop: P('M0-6Q5 1 3 4 0 7-3 4-5 1 0-6Z', '#7fd0ff', ' stroke-width="1.6"'),
    medal: P('M-7-14L-2-3H2L7-14H3L0-8-3-14Z', '#2e6bd9', ' stroke-width="1.8"') + C(0, 3, 7, '#ffd23f') + P(star(0, 3, 5, 4, 1.8), '#fff6c2', ' stroke-width="1"'),
    hhat: P('M-13 3Q-13-11 0-11 13-11 13 3Z', '#ffc21a') + P('M-16 3H16V6.5H-16Z', '#ffb000') + P('M0-11V1M-6-9V1M6-9V1', 'none', ' stroke="#e09b16" stroke-width="1.6"'),
    castle: P('M-10 10V-8H-6V-5H-2V-8H2V-5H6V-8H10V10Z', '#c9d3e3') + P('M-3 10V4Q0 1 3 4V10Z', '#7b5cff', ' stroke-width="1.5"') + P('M0-8V-16', 'none', ' stroke-width="1.6"') + P('M0-16L7-14 0-12Z', '#ff4d6d', ' stroke-width="1.2"'),
    lotus: P('M0 6Q-12 2-13-5Q-4-2 0 6ZM0 6Q12 2 13-5Q4-2 0 6Z', '#ffb3d6') + P('M0 6Q-5-3 0-11Q5-3 0 6Z', '#ff8fc4') + P('M-15 7H15', 'none', ' stroke="#6fd3ff" stroke-width="2.4"'),
    rocket: P('M-4 7Q0 18 4 7Z', '#ff8a00') + P('M-6 0L-11 8-6 7ZM6 0L11 8 6 7Z', '#ff4d6d') + P('M0-16Q8-8 6 7H-6Q-8-8 0-16Z', '#fff') + C(0, -4, 3.4, '#2fc4e0', ' stroke-width="2"'),
    shield: P('M0-12L10-8Q11 5 0 12Q-11 5-10-8Z', '#2e6bd9') + P('M0-8.5L6.5-6Q6.5 4 0 8Z', '#5b93ff', N) + P('M-4 0L-1 3 4-3', 'none', ' stroke="#ffd23f" stroke-width="2.8"'),
    glove: C(0, 0, 5, '#fff') + E(-3, -4, 2, 2.6, '#fff', ' stroke-width="2"'),
    speed: P('M0 0H-10M2 6H-12M0 12H-8', 'none', ' stroke="#9fd8ff" stroke-width="2.6"'),
    burst: P(star(0, 0, 12, 31, 21), '#ffd23f', ' stroke-width="2"') + P(star(0, 0, 12, 24, 16), '#ff8a3d', N),
    confetti: '',
    arms: ''
  };
  /* Scene pieces that use absolute coordinates */
  const ABS = {
    confetti: `<g${N}>` + [[8, 8, '#ff5fa2', 25], [52, 6, '#2fc4e0', -20], [4, 30, '#ffd23f', 50], [58, 26, '#7b5cff', 10], [12, 54, '#2fbf71', -30], [55, 50, '#ff8a3d', 35]].map(([x, y, f, r]) => `<rect x="${x}" y="${y}" width="4" height="7" rx="1" fill="${f}" transform="rotate(${r} ${x + 2} ${y + 3})"/>`).join('') + C(20, 6, 1.8, '#ffd23f') + C(46, 60, 1.8, '#ff5fa2') + '</g>',
    flexT: LIMB('M15 40L5 40 6 30', '#8ed36e') + LIMB('M49 40L59 40 58 30', '#8ed36e') + C(9, 38, 4, '#8ed36e', ' stroke-width="2"') + C(55, 38, 4, '#8ed36e', ' stroke-width="2"') + C(6, 27, 4.6, '#8ed36e', ' stroke-width="2.4"') + C(58, 27, 4.6, '#8ed36e', ' stroke-width="2.4"'),
    flameL: `<g transform="translate(9 38) rotate(-90) scale(.8)">` + PR.flame + '</g>'
  };
  const SHADOW = E(32, 60.5, 17, 2.6, '#000', ' opacity=".2"' + N);
  const prop = (k, x, y, s, r) => `<g transform="translate(${x} ${y})${s && s !== 1 ? ` scale(${s})` : ''}${r ? ` rotate(${r})` : ''}">${PR[k]}</g>`;

  /* ================= Emotes ================= */
  /* [id, name, character, eyes, mouth, blush, behind[], front[]] ; prop = [key,x,y,scale,rot] or 'abs:key' ; eyes 'wink' | 'shades' | 'specs:dot' */
  const EM = [
    ['hy', 'Coin Hype', 'coin', 'happy', 'grin', 1, [], ['abs:confetti', ['spark', 9, 14, .9], ['spark', 55, 12, .8]]],
    ['lp', 'Lit Pan', 'pan', 'det', 'grin', 0, [['flame', 32, 12, 1.15]], []],
    ['mb', 'Mind Blown', 'bird', 'wide', 'o', 0, [['burst', 29, 33, .95]], [['spark', 56, 10, .7]]],
    ['sc', 'Shell Cool', 'turtle', 'shades', 'smirk', 0, [], [['spark', 52, 12, .8]]],
    ['cr', 'Coin Royalty', 'coin', 'happy', 'smile', 1, [], [['crown', 32, 9, 1.05], ['spark', 54, 46, .6]]],
    ['ss', 'Starstruck', 'pel', 'star', '', 1, [], [['spark', 10, 14, .8], ['spark', 54, 10, .7], ['spark', 54, 38, .6]]],
    ['bb', 'Brain Wave', 'coin', 'det', 'smirk', 0, [], [['brain', 32, 12, 1.05], ['spark', 54, 8, .6]]],
    ['ck', "Chef's Kiss", 'pan', 'closed', 'kiss', 1, [], [['glove', 42, 50, .9], ['heart', 52, 38, .35], ['spark', 54, 12, .6]]],
    ['tp', 'Turtle Power', 'turtle', 'det', 'grin', 0, ['abs:flexT'], []],
    ['sd', 'Sleepy But Did It', 'pel', 'closed', '', 0, [], [['zzz', 47, 18, 1], ['check', 51, 47, .8]]],
    ['dt', 'Detective Zippy', 'bird', 'det', 'smirk', 0, [], [['dhat', 27, 18, 1.05], ['mag', 47, 50, .95]]],
    ['md', 'Mic Drop', 'coin', 'shades', 'smirk', 0, [], [['mic', 52, 50, .85, 20]]],
    ['bw', 'Shell Reader', 'turtle', 'specs:dot', 'smile', 1, [], [['book', 32, 50, 1.15]]],
    ['zn', 'Island Zen', 'pel', 'closed', '', 1, [], [['lotus', 32, 55, 1], ['spark', 10, 20, .6], ['spark', 54, 20, .6]]],
    ['fm', 'Fete Mode', 'pan', 'happy', 'grin', 1, [], [['hat', 42, 13, .9, 15], 'abs:confetti']],
    ['zm', 'Zoom Zoom', 'bird', 'det', 'grin', 0, ['abs:flameL'], [['rocket', 52, 13, .65, 45]]],
    ['sh', 'Shell Shield', 'turtle', 'det', 'smile', 0, [], [['shield', 50, 46, 1.15]]],
    ['bi', 'Bright Idea', 'coin', 'dot', 'o', 0, [], [['bulb', 51, 15, .8]]],
    ['ln', 'Love Notes', 'pan', 'heart', 'smile', 1, [], [['heart', 9, 13, .5], ['heart', 54, 9, .42], ['notes', 54, 30, .6]]],
    ['gg', 'GG Pelly', 'pel', 'happy', '', 1, [], [['gg', 47, 11, .85]]],
    ['fw', 'Fire Wings', 'bird', 'det', 'grin', 0, [['flame', 18, 16, 1, -25], ['flame', 38, 12, 1.1, 15]], []],
    ['cp', 'Champ Pan', 'pan', 'happy', 'grin', 0, [], [['trophy', 52, 47, .85], ['spark', 10, 12, .7], ['spark', 54, 12, .6]]],
    ['ww', 'Week Warrior', 'turtle', 'det', 'grin', 0, [], [['cal', 51, 15, .85]]],
    ['cc', 'Cha-Ching', 'coin', 'wink', 'grin', 1, [], [['coins', 53, 51, .85], ['spark', 52, 12, .7]]],
    ['sp', 'Shop Hop', 'pel', 'happy', '', 1, [], [['bag', 51, 46, .85]]],
    ['ih', 'Island Hopper', 'turtle', 'happy', 'grin', 1, [['palm', 51, 26, .95], ['sun', 11, 11, .7]], []],
    ['ge', 'Great Escape', 'bird', 'wink', 'grin', 0, [], [['key', 47, 53, .9, -20]]],
    ['aa', 'Arcade Ace', 'pan', 'det', 'grin', 0, [], [['joy', 52, 52, .8]]],
    ['dy', 'Did You Know?', 'coin', 'dot', 'cat', 0, [], [['qb', 51, 12, .85]]],
    ['nl', 'Night Light', 'bird', 'closed', 'smile', 1, [], [['moon', 51, 13, .75], ['spark', 10, 10, .5], ['spark', 58, 30, .45]]],
    ['rs', 'Rise & Shine', 'pel', 'happy', '', 1, [['sun', 52, 14, 1]], []],
    ['gt', 'Bullseye', 'turtle', 'det', 'grin', 0, [], [['target', 51, 15, .85]]],
    ['qb', 'Quill Bill', 'bird', 'dot', 'smile', 1, [], [['pencil', 50, 50, .85]]],
    ['pp', 'Perfect Pan', 'pan', 'star', 'grin', 0, [], [['hund', 32, 9, .9, -8]]],
    ['fb', 'Focus Beats', 'turtle', 'closed', 'smile', 0, [], [['phones', 32, 25, .9], ['notes', 53, 12, .65]]],
    ['gc', 'Cap & Gown', 'coin', 'happy', 'grin', 0, [], [['cap', 31, 12, 1.05, -8]]],
    ['ph', 'Phew!', 'pel', 'wide', '', 0, [], [['drop', 46, 13, 1]]],
    ['mm', 'Medal Mode', 'bird', 'happy', 'grin', 1, [], [['medal', 26, 46, .85]]],
    ['hh', 'Hard Hat Hero', 'pan', 'det', 'smile', 0, [], [['hhat', 32, 15, 1]]],
    ['th', 'Thankful Heart', 'coin', 'closed', 'smile', 1, [], [['heart', 51, 48, .8]]],
    ['mp', 'Memory Palace', 'turtle', 'star', 'grin', 0, [['castle', 51, 29, 1.05]], []]
  ];
  const EMAP = {}; EM.forEach(e => { EMAP[e[0]] = e; });
  const cache = {};
  function part(p) { if (typeof p === 'string') return ABS[p.slice(4)] || ''; return prop(p[0], p[1], p[2], p[3], p[4]); }
  function face(ch, eyes, mouth, blush) {
    const [fx, fy, s] = CH[ch].f; let h = '';
    if (eyes === 'shades') h += SHADES;
    else if (eyes === 'wink') h += EYE.dot(-7) + EYE.happy(7);
    else { const k = eyes.replace('specs:', ''); h += EYE[k](-7) + EYE[k](7); if (eyes.indexOf('specs') === 0) h += SPECS; }
    if (blush) h += E(-11, 5, 3, 1.8, '#ff7aa2', ' opacity=".55"' + N) + E(11, 5, 3, 1.8, '#ff7aa2', ' opacity=".55"' + N);
    if (mouth) h += `<g transform="translate(0 9)">${MOUTH[mouth]}</g>`;
    return `<g transform="translate(${fx} ${fy})${s !== 1 ? ` scale(${s})` : ''}">${h}</g>`;
  }
  function svg(id, label) {
    const e = EMAP[id] || EM[0];
    if (!cache[e[0]]) cache[e[0]] = `<g stroke="${O}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">${SHADOW}${e[6].map(part).join('')}<g stroke-width="3">${CH[e[2]].b()}</g>${face(e[2], e[3], e[4], e[5])}${e[7].map(part).join('')}</g>`;
    return `<svg class="ac-svg" viewBox="0 0 64 64" ${label ? `role="img" aria-label="${label.replace(/"/g, '&quot;')}"` : 'aria-hidden="true"'} focusable="false">${cache[e[0]]}</svg>`;
  }

  /* ================= Achievements ================= */
  const TIER = { b: ['Bronze', 5], s: ['Silver', 10], g: ['Gold', 20], p: ['Platinum', 40] };
  const obj = v => (v && typeof v === 'object') ? v : {};
  const cnt = v => Array.isArray(v) ? v.length : v && typeof v === 'object' ? Object.keys(v).filter(k => v[k]).length : 0;
  const vals = v => Object.values(obj(v)).map(Number).filter(n => !isNaN(n));
  const hasAny = v => Array.isArray(v) ? v.length > 0 : v && typeof v === 'object' ? Object.keys(v).some(k => { const x = v[k]; return Array.isArray(x) ? x.length : x && typeof x === 'object' ? hasAny(x) : !!x && typeof x !== 'string'; }) : false;
  const palace = v => { v = obj(v); return Object.keys(v).some(k => /pal|room|loci|built/i.test(k) && (Array.isArray(v[k]) ? v[k].length : typeof v[k] === 'object' ? hasAny(v[k]) : !!v[k])); };
  const modDone = id => c => { const m = c.M.find(x => x.id === id); return !!(m && m.complete); };
  const L = re => c => c.hit(re);
  /* [id, title, tier, emote, description, condition(ctx)] */
  const ACH = [
    ['fs', 'First Steps', 'b', 'hy', 'Complete your very first screen.', c => c.P.done >= 1],
    ['u1', 'Unit Unlocked', 'b', 'bi', 'Finish every screen in one unit.', c => c.U >= 1],
    ['u5', 'Five Alive', 's', 'tp', 'Finish five whole units.', c => c.U >= 5],
    ['hf', 'Halfway Hero', 's', 'zm', 'Reach 50% of the whole course.', c => c.P.pct >= 50],
    ['m1', 'Module 1 Mastered', 'g', 'dt', 'Complete every unit, the test and the essay in Module 1.', modDone('M1')],
    ['m2', 'Module 2 Mastered', 'g', 'ln', 'Complete every unit, the test and the essay in Module 2.', modDone('M2')],
    ['m3', 'Module 3 Mastered', 'g', 'md', 'Complete every unit, the test and the essay in Module 3.', modDone('M3')],
    ['p3', 'Paper 3 Champion', 'g', 'cp', 'Complete all of the Paper 3 unit.', modDone('P3')],
    ['cq', 'Course Conqueror', 'p', 'gc', 'Reach 100% of the course. Grade One energy!', c => c.P.pct >= 100],
    ['t7', 'Test Ready', 's', 'bb', 'Score 70% or more on a module test.', c => c.tests.some(v => v >= 70)],
    ['tx', 'Perfect Paper', 'g', 'pp', 'Score 100% on a module test.', c => c.tests.some(v => v >= 100)],
    ['ta', 'Test Sweep', 'p', 'mm', 'Pass every module test.', c => c.M.length > 0 && c.M.every(m => m.testPassed)],
    ['e1', 'First Essay', 'b', 'qb', 'Submit your first exam essay.', c => cnt(c.S.p2) >= 1],
    ['ea', 'Essay Machine', 'g', 'fw', 'Submit the exam essay for every module.', c => c.M.length > 0 && c.M.every(m => m.essay)],
    ['pa', 'Paper 01 Starter', 'b', 'ph', 'Submit a Paper 01 practice set.', c => Object.keys(obj(c.S.pscore)).length >= 1],
    ['p8', 'Sharp Shooter', 's', 'gt', 'Score 80% or more on a Paper 01 practice set.', c => vals(c.S.pscore).some(v => v >= 80)],
    ['d3', 'On a Roll', 'b', 'lp', 'Open the daily chest three days in a row.', c => c.ds >= 3],
    ['d7', 'Week Warrior', 's', 'ww', 'Keep a seven-day streak.', c => c.ds >= 7],
    ['dm', 'Monthly Legend', 'p', 'sc', 'Keep a thirty-day streak.', c => c.ds >= 30],
    ['l3', 'Levelling Up', 'b', 'mb', 'Reach Level 3.', c => c.Lv.n >= 3],
    ['l5', 'High Five', 's', 'fm', 'Reach Level 5.', c => c.Lv.n >= 5],
    ['lx', 'Top Ten', 'p', 'ck', 'Reach Level 10.', c => c.Lv.n >= 10],
    ['c1', 'Pocket Change', 'b', 'cc', 'Earn 100 coins in total.', c => c.coins >= 100],
    ['c5', 'Coin Collector', 's', 'cc', 'Earn 500 coins in total.', c => c.coins >= 500],
    ['ck', 'Treasure Chest', 'g', 'cr', 'Earn 1,000 coins in total.', c => c.coins >= 1000],
    ['bu', 'Retail Therapy', 'b', 'sp', 'Buy your first item in the shop.', c => cnt(c.S.owned) >= 1],
    ['pc', 'Player Card Ready', 'b', 'gg', 'Create your player card.', c => !!c.S.profileDone],
    ['ct', 'Island Hopper', 'b', 'ih', 'Visit the Caribbean tour.', c => !!c.S.seenCarib],
    ['z1', 'Survivor', 'b', 'hh', 'Finish your first Rebuilding Council challenge.', c => cnt(c.S.zdone) >= 1],
    ['zc', 'Council Complete', 'p', 'sh', 'Finish every Rebuilding Council challenge.', c => c.Z > 0 && c.Z <= Object.keys(obj(c.S.zdone)).filter(k => c.S.zdone[k]).length],
    ['x1', 'Great Escape', 's', 'ge', 'Escape from your first escape room.', c => cnt(c.S.escBest) >= 1],
    ['xa', 'Escape Artist', 'g', 'ge', 'Escape from every escape room.', c => c.X > 0 && cnt(c.S.escBest) >= c.X],
    ['ar', 'Arcade Ace', 'b', 'aa', 'Win a game in the Mini Arcade.', c => (+obj(c.S.arcade).n || 0) >= 1 || c.hit(/ win$|Climb the Ladder|Top of the ladder/i)],
    ['dk', 'Did You Know?', 'b', 'dy', 'Score in a Did You Know true-or-false quiz.', L(/^True or false/i)],
    ['ps', 'Know Yourself', 'b', 'ss', 'Finish the study personality test.', c => !!obj(c.S.wb).p || c.hit(/^🧭 You are/)],
    ['sl', 'Sleepy But Did It', 'b', 'sd', 'Log a night of sleep.', c => cnt(obj(c.S.wb).sleep) >= 1 || c.hit(/nights logged/i)],
    ['mp', 'Palace Architect', 's', 'mp', 'Build a memory palace.', c => palace(c.S.mlab) || c.hit(/palace/i)],
    ['bg', 'Brain Gym Rat', 'b', 'bb', 'Complete a Brain Gym workout.', c => hasAny(c.S.brain) || c.hit(/brain/i)],
    ['rd', 'Bookworm', 'b', 'bw', 'Finish a book on your reading shelf.', c => cnt(obj(c.S.read).f) >= 1 || c.hit(/^Finished: /)],
    ['wd', 'Word Nerd', 's', 'qb', 'Bank ten words in your word desk.', c => cnt(c.S.words) >= 10],
    ['fc', 'Deep Focus', 'b', 'fb', 'Complete a focus session with music.', L(/Focus session/i)],
    ['zn', 'Zen Mode', 'b', 'zn', 'Take a mindful break in the Rec Room.', L(/Mindful break/i)],
    ['gh', 'Grateful Heart', 'b', 'th', 'Write three gratitude notes.', c => cnt(obj(c.S.rec).grat) >= 3],
    ['eb', 'Early Bird', 'b', 'rs', 'Make progress before 7 a.m.', c => c.live && c.P.done >= 1 && c.hr >= 4 && c.hr < 7],
    ['no', 'Night Owl', 'b', 'nl', 'Make progress after 10 p.m.', c => c.live && c.P.done >= 1 && (c.hr >= 22 || c.hr < 2)],
    ['bh', 'Badge Hunter', 'g', 'mm', 'Unlock 20 achievements.', c => c.n >= 20],
    ['al', 'Completionist', 'p', 'cr', 'Unlock every other achievement.', c => c.n >= ACH.length - 1]
  ].map(a => ({ id: a[0], title: a[1], tier: a[2], em: a[3], desc: a[4], c: a[5] }));
  const META = { bh: 1, al: 1 };

  /* ================= State + unlock engine ================= */
  const A = () => window.COURSE_API || null;
  function st(S) { if (!S.ach || typeof S.ach !== 'object' || Array.isArray(S.ach)) S.ach = {}; const a = S.ach; if (typeof a._c !== 'number' || !isFinite(a._c)) a._c = 0; if (!Array.isArray(a._s)) a._s = []; return a; }
  const unlockedEmotes = a => { const o = {}; ACH.forEach(x => { if (a[x.id]) o[x.em] = 1; }); return o; };
  const hits = []; let busy = false, tmr = 0, lastRun = 0, booted = false;
  function ctx(api, live) {
    const S = api.S, a = st(S), n = ACH.filter(x => a[x.id]).length;
    let P = { all: 0, done: 0, pct: 0 }, Lv = { n: 1 }, M = [];
    try { P = api.progress() || P; } catch (e) { }
    try { Lv = api.level() || Lv; } catch (e) { }
    try { M = api.modules() || []; } catch (e) { }
    const Zd = window.COURSE_ZOMBIE, Zn = Zd && Array.isArray(Zd.days) ? Zd.days.reduce((t, d) => t + ((d && d.challenges) || []).length, 0) : 0;
    const Xr = window.COURSE_ESCAPE, Xn = Xr && Array.isArray(Xr.rooms) ? Xr.rooms.length : 0;
    return { S, P, Lv, M, n, live, U: M.reduce((t, m) => t + (m.units || []).filter(u => u.screens > 0 && u.done >= u.screens).length, 0), tests: vals(S.tests), ds: +S.dayStreak || 0, coins: a._c, Z: Zn, X: Xn, hr: new Date().getHours(), hit: re => hits.some(l => re.test(l)) };
  }
  function check(live) {
    const api = A(); if (!api || busy) return; lastRun = Date.now();
    const S = api.S; if (!S) return; const a = st(S);
    a._c = Math.max(a._c, Math.round(+S.coins || 0));
    let c; try { c = ctx(api, live); } catch (e) { return; }
    const fresh = [];
    const test = x => { if (a[x.id]) return; let ok = false; try { ok = !!x.c(c); } catch (e) { } if (ok) fresh.push(x); };
    ACH.filter(x => !META[x.id]).forEach(test);
    c.n += fresh.length; ACH.filter(x => META[x.id]).forEach(x => { const before = fresh.length; test(x); if (fresh.length > before) c.n++; });
    if (!fresh.length) return;
    fresh.forEach(x => { a[x.id] = 1; });
    const bonus = fresh.reduce((t, x) => t + TIER[x.tier][1], 0);
    busy = true;
    try { api.reward(bonus, '', { noBonus: true }); } catch (e) { }
    try { api.save(); } catch (e) { }
    busy = false;
    hits.length = 0;
    const show = fresh.length > 4 ? fresh.slice(0, 3) : fresh;
    show.forEach(x => queue({ x }));
    if (fresh.length > 4) queue({ more: fresh.length - 3, coins: fresh.slice(3).reduce((t, x) => t + TIER[x.tier][1], 0), em: fresh[3].em });
    try { if (api.S.loc && api.S.loc.v === 'trophies') api.render(); } catch (e) { }
    schedule(false); /* bonus coins may cross a coin milestone: one more (finite) pass */
  }
  function schedule(live) {
    if (busy) return; if (live) schedule.live = true;
    if (tmr) return; /* trailing debounce: at most one check per 300 ms */
    tmr = setTimeout(() => { tmr = 0; const l = !!schedule.live; schedule.live = false; check(l); }, Math.max(300 - (Date.now() - lastRun), 300));
  }
  window.addEventListener('course:save', () => { if (!busy && booted) schedule(true); });
  window.addEventListener('course:reward', ev => {
    const d = (ev && ev.detail) || {}, api = A(); if (!api || !api.S) return;
    const a = st(api.S), n = +d.n; if (n > 0 && isFinite(n)) a._c += Math.round(n);
    if (!busy && d.label) { hits.push(String(d.label)); if (hits.length > 30) hits.shift(); }
    if (!busy && booted) schedule(true);
  });
  function boot(tries) {
    const api = A();
    if (!api || !api.S) { if ((tries || 0) < 50) setTimeout(() => boot((tries || 0) + 1), 100); return; }
    booted = true; dock(); check(false);
  }
  setTimeout(() => boot(0), 0);

  /* ================= Popups ================= */
  const Q = []; let showing = null, dismissT = 0;
  const reduced = () => { try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
  function dock() {
    let d = document.getElementById('ac-dock');
    if (!d && document.body) { d = document.createElement('div'); d.id = 'ac-dock'; d.className = 'ac-dock'; d.setAttribute('aria-live', 'polite'); d.setAttribute('aria-atomic', 'false'); document.body.appendChild(d); }
    return d;
  }
  function queue(item) { Q.push(item); if (!showing) next(); }
  function next() {
    const d = dock(); showing = Q.shift() || null; if (!showing || !d) { showing = null; return; }
    const it = showing, x = it.x, api = A();
    const em = x ? x.em : it.em, tier = x ? TIER[x.tier] : null;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'ac-toast' + (x ? ' t-' + x.tier : ' t-g');
    b.innerHTML = `<span class="ac-tburst" aria-hidden="true"></span><span class="ac-tem">${svg(em)}</span><span class="ac-tx"><span class="ac-tk">${x ? 'Achievement Unlocked · ' + tier[0] : 'Achievements Unlocked'}</span><b>${x ? esc(x.title) : '+' + it.more + ' More Badges'}</b><span class="ac-tc">+${x ? tier[1] : it.coins} coins${x ? ' · ' + esc(EMAP[x.em][1]) + ' emote' : ' · see your Trophy Room'}</span></span>`;
    b.setAttribute('aria-label', (x ? `Achievement unlocked: ${x.title}, ${tier[0]}, plus ${tier[1]} coins.` : `${it.more} more achievements unlocked.`) + ' Select to dismiss.');
    b.addEventListener('click', dismiss);
    d.innerHTML = ''; d.appendChild(b);
    try { api && api.chime('good'); } catch (e) { }
    clearTimeout(dismissT); dismissT = setTimeout(dismiss, 4200);
  }
  function dismiss() {
    clearTimeout(dismissT); const d = dock(), b = d && d.querySelector('.ac-toast');
    if (b && !b.classList.contains('out')) { b.classList.add('out'); setTimeout(() => { if (b.parentNode) b.remove(); showing = null; next(); }, reduced() ? 60 : 260); }
    else if (!b) { showing = null; next(); }
  }
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ================= Reactions (just for fun) ================= */
  let AC = null;
  const FAM = { coin: [660, 990], pan: [523, 784], bird: [880, 1320], turtle: [392, 523], pel: [440, 660] };
  function boop(id) {
    const api = A(); if (api && api.S && api.S.sound === false) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      const f = FAM[(EMAP[id] || EM[0])[2]], t = AC.currentTime;
      (EMAP[id][2] === 'pan' ? [f[0], f[1], f[0] * 1.5] : [f[0], f[1]]).forEach((hz, i) => {
        const o = AC.createOscillator(), g = AC.createGain(), s = t + i * .07; o.type = EMAP[id][2] === 'pan' ? 'sine' : 'triangle';
        o.frequency.setValueAtTime(hz * .8, s); o.frequency.exponentialRampToValueAtTime(hz, s + .05);
        g.gain.setValueAtTime(.0001, s); g.gain.exponentialRampToValueAtTime(.14, s + .015); g.gain.exponentialRampToValueAtTime(.0001, s + .35);
        o.connect(g); g.connect(AC.destination); o.start(s); o.stop(s + .4);
      });
    } catch (e) { }
  }
  function react(id, el) {
    boop(id);
    const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const fx = document.createElement('div'); fx.className = 'ac-fx'; fx.setAttribute('aria-hidden', 'true'); fx.style.left = x + 'px'; fx.style.top = y + 'px';
    let h = `<span class="ac-fxe">${svg(id)}</span>`;
    if (!reduced()) for (let i = 0; i < 10; i++) { const ang = i / 10 * Math.PI * 2, dist = 46 + (i % 3) * 14; h += `<i style="--dx:${Math.round(Math.cos(ang) * dist)}px;--dy:${Math.round(Math.sin(ang) * dist)}px;--c:${['#ffd23f', '#ff5fa2', '#2fc4e0', '#fff6c2', '#7b5cff'][i % 5]}"></i>`; }
    fx.innerHTML = h; document.body.appendChild(fx); setTimeout(() => fx.remove(), 1300);
    const live = document.getElementById('ac-react-live'); if (live) live.textContent = 'You reacted with ' + EMAP[id][1];
  }

  /* ================= Trophy Room ================= */
  let FILTER = 'all', refocus = null;
  const STARTERS = ['hy', 'sc', 'gg', 'lp'];
  window.COURSE_EMOTES = {
    svg: id => svg(id, EMAP[id] ? EMAP[id][1] : ''),
    showcase: () => { const api = A(); if (!api || !api.S) return []; const a = st(api.S), u = unlockedEmotes(a); return a._s.filter(id => u[id] && EMAP[id]).slice(0, 3); },
    list: EM.map(e => ({ id: e[0], name: e[1], mascot: { coin: 'Coin Buddy', pan: 'Pan Man', bird: 'Zippy', turtle: 'Shelly', pel: 'Pelly' }[e[2]] })),
    achievements: ACH.map(x => ({ id: x.id, title: x.title, tier: TIER[x.tier][0], emote: x.em, desc: x.desc }))
  };
  function render(api) {
    const S = api.S, a = st(S), u = unlockedEmotes(a), n = ACH.filter(x => a[x.id]).length, pct = Math.round(n / ACH.length * 100);
    const show = window.COURSE_EMOTES.showcase();
    const tierCount = k => ACH.filter(x => x.tier === k && a[x.id]).length + '/' + ACH.filter(x => x.tier === k).length;
    const F = [['all', 'All'], ['un', 'Unlocked'], ['lk', 'Locked'], ['b', 'Bronze'], ['s', 'Silver'], ['g', 'Gold'], ['p', 'Platinum']];
    const list = ACH.filter(x => FILTER === 'all' || (FILTER === 'un' ? a[x.id] : FILTER === 'lk' ? !a[x.id] : x.tier === FILTER));
    const pick = EM.filter(e => u[e[0]] || STARTERS.includes(e[0]));
    let h = `<section class="hero ac-hero"><span class="eyebrow">Achievements & Emotes</span><h1>Trophy Room</h1><p>Every badge comes with an original emote from the course crew: Coin Buddy, Zippy the hummingbird, Shelly the sea turtle, Pelly the pelican and Pan Man. Unlock them by learning, practising and looking after yourself.</p></section>`;
    h += `<div class="card"><div class="ac-sum"><div class="ac-big">${svg(show[0] || (n ? ACH.find(x => a[x.id]).em : 'hy'))}</div><div class="ac-sumt"><span class="kicker">Your collection</span><h2>${n} of ${ACH.length} Achievements</h2><div class="pbar" role="progressbar" aria-label="Achievements unlocked" aria-valuemin="0" aria-valuemax="${ACH.length}" aria-valuenow="${n}"><i style="width:${pct}%"></i></div><div class="row">${['b', 's', 'g', 'p'].map(k => `<span class="ac-pill t-${k}">${TIER[k][0]} ${tierCount(k)}</span>`).join('')}<span class="ac-pill">${Object.keys(u).length}/${EM.length} emotes</span></div></div></div>
      <div><h3>My Showcase</h3><p class="hint">Pick up to three unlocked emotes to feature on your player card. Tap Feature on any unlocked badge.</p></div>
      <div class="ac-show">${[0, 1, 2].map(i => show[i] ? `<button type="button" class="ac-slot on" data-px="unfeat" data-id="${show[i]}" aria-label="Remove ${esc(EMAP[show[i]][1])} from your showcase"><span class="ac-medal t-g"><span class="ac-em">${svg(show[i])}</span></span><span class="ac-sn">${esc(EMAP[show[i]][1])}</span><span class="ac-x" aria-hidden="true">✕</span></button>` : `<div class="ac-slot"><span class="ac-medal ac-empty"><span aria-hidden="true">+</span></span><span class="ac-sn hint">Empty slot</span></div>`).join('')}</div></div>`;
    h += `<div class="card"><div><h3>Emote Picker</h3><p class="hint">Tap an emote to react. It is just for fun! Unlock more badges to collect more emotes.</p></div><div class="ac-pick" role="group" aria-label="Emotes you can react with">${pick.map(e => `<button type="button" class="ac-pk" data-px="react" data-id="${e[0]}" aria-label="React with ${esc(e[1])}" title="${esc(e[1])}">${svg(e[0])}</button>`).join('')}</div><span id="ac-react-live" class="ac-sr" aria-live="polite"></span></div>`;
    h += `<div class="card"><div class="chips" role="group" aria-label="Filter achievements">${F.map(f => `<button type="button" class="chip${FILTER === f[0] ? ' sel' : ''}" data-px="flt" data-k="${f[0]}" aria-pressed="${FILTER === f[0]}">${f[1]}</button>`).join('')}</div>
      <div class="ac-grid">${list.map(x => {
        const on = !!a[x.id], t = TIER[x.tier], fe = show.includes(x.em);
        return `<div class="ac-card t-${x.tier}${on ? '' : ' lock'}"><span class="ac-medal t-${x.tier}"><span class="ac-em">${svg(x.em)}</span>${on ? '' : '<span class="ac-lk" aria-hidden="true">🔒</span>'}</span><h4>${esc(x.title)}</h4><span class="ac-tier t-${x.tier}">${t[0]} · +${t[1]} coins</span><p class="hint">${on ? '' : '<span class="ac-sr">Locked. </span>'}${esc(x.desc)}</p>${on ? `<span class="ac-en">Emote: ${esc(EMAP[x.em][1])}</span><button type="button" class="btn ghost ac-fb" data-px="feat" data-id="${x.em}" aria-pressed="${fe}">${fe ? '★ Featured' : '☆ Feature'}</button>` : ''}</div>`;
      }).join('') || '<p class="hint">Nothing here yet. Keep going!</p>'}</div></div>`;
    return h;
  }

  const CSS = `
.ac-svg{width:100%;height:100%;display:block;overflow:visible}
.ac-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.ac-sum{display:flex;gap:18px;align-items:center;flex-wrap:wrap}
.ac-big{width:104px;height:104px;flex:none;filter:drop-shadow(0 3px 0 rgba(255,255,255,.85)) drop-shadow(0 -1px 0 rgba(255,255,255,.85)) drop-shadow(0 10px 12px rgba(0,0,0,.45));animation:ac-bob 3.2s ease-in-out infinite}
.ac-sumt{display:flex;flex-direction:column;gap:8px;flex:1;min-width:200px}
.ac-sumt .pbar{width:100%}
.ac-sumt .kicker{align-self:flex-start}
.ac-pill{display:inline-flex;align-items:center;padding:3px 10px;border-radius:99px;border:1px solid var(--line);background:var(--raise);font-weight:700;font-size:.82rem}
.ac-pill.t-b,.ac-tier.t-b{background:linear-gradient(135deg,#f3b27a,#a0522d);color:#2a1206;border-color:#7a3a14}
.ac-pill.t-s,.ac-tier.t-s{background:linear-gradient(135deg,#ffffff,#9aa3b2);color:#1b2233;border-color:#7b8496}
.ac-pill.t-g,.ac-tier.t-g{background:linear-gradient(135deg,#fff1a8,#d49b00);color:#2b1d00;border-color:#9b7000}
.ac-pill.t-p,.ac-tier.t-p{background:linear-gradient(135deg,#e9fbff,#a8e4f4 40%,#cdbcff);color:#141a3a;border-color:#7d8fd6}
.ac-show{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;max-width:460px}
.ac-slot{display:flex;flex-direction:column;align-items:center;gap:6px;background:var(--raise);border:1px dashed var(--line);border-radius:16px;padding:12px 6px;color:inherit;font:inherit;position:relative;min-width:0}
button.ac-slot{border-style:solid;cursor:pointer}
button.ac-slot:hover,button.ac-slot:focus-visible{border-color:var(--gold)}
.ac-slot .ac-x{position:absolute;top:6px;right:8px;font-size:.8rem;opacity:.7}
.ac-sn{font-weight:700;font-size:.85rem;text-align:center;line-height:1.2}
.ac-empty{display:grid!important;place-items:center;font-size:1.6rem;color:var(--muted);background:transparent!important;box-shadow:none!important;border:2px dashed var(--line)}
.ac-empty::before{display:none}
.ac-medal{--r1:#fff1a8;--r2:#d49b00;position:relative;width:84px;height:84px;border-radius:50%;flex:none;display:block;background:radial-gradient(circle at 35% 28%,#2a3f86,#0b1640 70%);box-shadow:0 0 0 5px var(--r2),0 0 0 7px rgba(0,0,0,.25),inset 0 3px 0 rgba(255,255,255,.18),inset 0 -6px 12px rgba(0,0,0,.45),0 10px 18px -6px rgba(0,0,0,.6);transition:transform .35s cubic-bezier(.2,.9,.3,1.3);transform-style:preserve-3d}
.ac-medal::before{content:"";position:absolute;inset:-5px;border-radius:50%;background:conic-gradient(from 210deg,var(--r1),var(--r2),var(--r1),var(--r2),var(--r1));-webkit-mask:radial-gradient(circle,transparent 41px,#000 42px);mask:radial-gradient(circle,transparent 41px,#000 42px)}
.ac-medal::after{content:"";position:absolute;inset:0;border-radius:50%;background:linear-gradient(140deg,rgba(255,255,255,.28),transparent 45%);pointer-events:none}
.ac-medal.t-b{--r1:#f6c08f;--r2:#9c4f22}.ac-medal.t-s{--r1:#ffffff;--r2:#8d97a8}.ac-medal.t-g{--r1:#fff1a8;--r2:#d49b00}.ac-medal.t-p{--r1:#f0fdff;--r2:#9d8cff}
.ac-medal.t-p{box-shadow:0 0 0 5px #8fd8ee,0 0 0 7px rgba(0,0,0,.25),inset 0 3px 0 rgba(255,255,255,.18),inset 0 -6px 12px rgba(0,0,0,.45),0 10px 22px -6px rgba(157,140,255,.7)}
.ac-em{position:absolute;inset:9px;filter:drop-shadow(1.5px 0 0 #fff) drop-shadow(-1.5px 0 0 #fff) drop-shadow(0 1.5px 0 #fff) drop-shadow(0 -1.5px 0 #fff) drop-shadow(0 4px 3px rgba(0,0,0,.5));z-index:1}
.ac-lk{position:absolute;right:-4px;bottom:-4px;z-index:2;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#0b1640;border:2px solid var(--line);font-size:.85rem}
.ac-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(178px,1fr));gap:14px}
.ac-card{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;padding:18px 12px 14px;border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.01)),var(--raise);border:1px solid var(--line);box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 6px 0 -2px rgba(0,0,0,.25),0 16px 26px -18px rgba(0,0,0,.7);min-width:0;perspective:600px}
.ac-card h4{margin-top:4px}
.ac-card .hint{margin:0}
.ac-card:hover .ac-medal,.ac-card:focus-within .ac-medal{transform:rotateY(18deg) rotateX(6deg) scale(1.04)}
.ac-tier{display:inline-block;padding:2px 10px;border-radius:99px;font-weight:800;font-size:.75rem;border:1px solid}
.ac-en{font-size:.8rem;color:var(--muted);font-weight:700}
.ac-fb{margin-top:auto;padding:6px 14px;min-height:40px}
.ac-fb[aria-pressed="true"]{background:var(--soft-gold);border-color:var(--gold)}
.ac-card.lock{background:var(--raise);box-shadow:none;opacity:.86}
.ac-card.lock .ac-medal{box-shadow:0 0 0 5px #4a5370,0 0 0 7px rgba(0,0,0,.25),inset 0 -6px 12px rgba(0,0,0,.45);background:radial-gradient(circle at 35% 28%,#26304f,#0d1430 70%)}
.ac-card.lock .ac-medal::before{background:conic-gradient(#5b6584,#3a4260,#5b6584)}
.ac-card.lock .ac-em{filter:brightness(0) invert(.32);opacity:.75}
.ac-card.lock .ac-tier{filter:grayscale(1);opacity:.75}
.ac-pick{display:flex;flex-wrap:wrap;gap:8px}
.ac-pk{width:56px;height:56px;padding:4px;border-radius:16px;border:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,0)),var(--raise);box-shadow:0 4px 0 -1px rgba(0,0,0,.3);cursor:pointer;transition:transform .15s}
.ac-pk:hover,.ac-pk:focus-visible{transform:translateY(-3px) scale(1.06);border-color:var(--gold)}
.ac-pk:active{transform:scale(.92)}
.ac-pk .ac-svg{filter:drop-shadow(0 2px 2px rgba(0,0,0,.4))}
.ac-fx{position:fixed;z-index:9998;width:0;height:0;pointer-events:none}
.ac-fxe{position:absolute;left:-40px;top:-40px;width:80px;height:80px;animation:ac-rise 1.2s cubic-bezier(.2,.8,.3,1) forwards;filter:drop-shadow(0 6px 8px rgba(0,0,0,.45))}
.ac-fx i{position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:3px;background:var(--c);animation:ac-pop .9s ease-out forwards}
.ac-dock{position:fixed;left:50%;bottom:max(18px,env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:9999;width:min(420px,calc(100vw - 24px));display:flex;justify-content:center;pointer-events:none}
.ac-toast{pointer-events:auto;position:relative;display:flex;align-items:center;gap:14px;width:100%;padding:14px 18px 14px 14px;border-radius:20px;border:2px solid #f5c542;background:linear-gradient(180deg,#1d2f6e,#0a1436);color:#f1f4ff;text-align:left;font:inherit;cursor:pointer;box-shadow:0 0 0 4px rgba(245,197,66,.18),0 18px 40px -10px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.2);animation:ac-in .45s cubic-bezier(.2,.9,.3,1.25);overflow:visible}
.ac-toast:focus-visible{outline:3px solid #fff;outline-offset:3px}
.ac-toast.t-p{border-color:#a8e4f4}
.ac-toast.out{animation:ac-out .25s ease-in forwards}
.ac-tem{position:relative;width:72px;height:72px;flex:none;animation:ac-flip .9s cubic-bezier(.2,.9,.3,1.2) both;filter:drop-shadow(1.5px 0 0 #fff) drop-shadow(-1.5px 0 0 #fff) drop-shadow(0 1.5px 0 #fff) drop-shadow(0 -1.5px 0 #fff) drop-shadow(0 6px 5px rgba(0,0,0,.5))}
.ac-tburst{position:absolute;left:-6px;top:50%;width:120px;height:120px;margin-top:-60px;border-radius:50%;background:repeating-conic-gradient(rgba(255,210,63,.55) 0 10deg,transparent 10deg 30deg);-webkit-mask:radial-gradient(circle,#000 20%,transparent 68%);mask:radial-gradient(circle,#000 20%,transparent 68%);animation:ac-spin 4s linear infinite,ac-burst .7s ease-out both;pointer-events:none}
.ac-tx{display:flex;flex-direction:column;gap:2px;min-width:0;position:relative}
.ac-tk{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;font-weight:800;color:#f5c542}
.ac-tx b{font-family:var(--f-display);font-size:1.15rem;line-height:1.2}
.ac-tc{font-size:.85rem;color:#c9d3f5}
@keyframes ac-in{from{opacity:0;transform:translateY(40px) scale(.9)}to{opacity:1;transform:none}}
@keyframes ac-out{to{opacity:0;transform:translateY(30px) scale(.95)}}
@keyframes ac-flip{0%{transform:perspective(400px) rotateY(180deg) scale(.2);opacity:0}55%{transform:perspective(400px) rotateY(-25deg) scale(1.2);opacity:1}100%{transform:perspective(400px) rotateY(0) scale(1)}}
@keyframes ac-burst{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes ac-spin{to{rotate:360deg}}
@keyframes ac-rise{0%{transform:scale(.4);opacity:0}25%{transform:scale(1.35) rotate(-8deg);opacity:1}60%{transform:translateY(-50px) scale(1.15) rotate(6deg);opacity:1}100%{transform:translateY(-120px) scale(.9);opacity:0}}
@keyframes ac-pop{from{transform:translate(0,0) scale(1);opacity:1}to{transform:translate(var(--dx),var(--dy)) scale(.3) rotate(200deg);opacity:0}}
@keyframes ac-bob{50%{transform:translateY(-5px) rotate(-3deg)}}
@media (max-width:520px){.ac-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.ac-card{padding:14px 8px 12px}.ac-medal{width:72px;height:72px}.ac-medal::before{-webkit-mask:radial-gradient(circle,transparent 35px,#000 36px);mask:radial-gradient(circle,transparent 35px,#000 36px)}.ac-em{inset:7px}.ac-pk{width:50px;height:50px}.ac-big{width:84px;height:84px}.ac-toast{gap:10px;padding:12px 14px 12px 10px}.ac-tem{width:60px;height:60px}}
@media (prefers-reduced-motion:reduce){.ac-big,.ac-tburst,.ac-tem,.ac-fxe,.ac-fx i{animation:none!important}.ac-toast,.ac-toast.out{animation:none!important}.ac-medal{transition:none}.ac-card:hover .ac-medal,.ac-card:focus-within .ac-medal{transform:none}.ac-fxe{opacity:0}}
`;
  const stEl = document.createElement('style'); stEl.textContent = CSS; document.head.appendChild(stEl);

  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'trophies',
    title: 'Trophy Room',
    tile: { icon: '🏆', meta: 'Badges, emotes and your showcase' },
    render(api) { try { return render(api); } catch (e) { return `<div class="card"><h2>Trophy Room</h2><p>Something went wrong: ${esc(e.message)}</p></div>`; } },
    mount(api, loc, stage) {
      if (!booted) boot(0);
      if (refocus) { const el = (stage || document).querySelector(refocus); refocus = null; if (el) try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }
    },
    click(action, el, api) {
      const a = st(api.S), id = el.dataset.id;
      if (action === 'flt') { FILTER = el.dataset.k || 'all'; refocus = `[data-px="flt"][data-k="${FILTER}"]`; api.render(); return; }
      if (action === 'react') { if (EMAP[id]) react(id, el); return; }
      if (action === 'feat' || action === 'unfeat') {
        if (!EMAP[id] || !unlockedEmotes(a)[id]) return;
        const cur = window.COURSE_EMOTES.showcase(), i = cur.indexOf(id);
        if (i >= 0) { cur.splice(i, 1); api.toast(EMAP[id][1] + ' removed from your showcase'); }
        else if (action === 'feat') { if (cur.length >= 3) { api.toast('Your showcase holds three emotes. Remove one first.'); return; } cur.push(id); api.chime('good'); api.toast(EMAP[id][1] + ' added to your showcase'); }
        a._s = cur; api.save();
        refocus = action === 'feat' ? `[data-px="feat"][data-id="${id}"]` : '.ac-show button, .ac-pick button';
        api.render(); return;
      }
    }
  });
})();
