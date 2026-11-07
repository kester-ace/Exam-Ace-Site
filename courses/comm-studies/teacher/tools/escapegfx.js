/* Escape-room graphics: original inline-SVG room scenes, doors, inventory items and the styles
   for the point-and-click escape rooms. Pure data/strings: engine.js owns all behaviour.
   No network assets: everything here is drawn with SVG/CSS. */
(function () {
  'use strict';
  /* ---------- tiny SVG helpers ---------- */
  const f2 = n => Math.round(n * 10) / 10;
  const poly = (pts, fill, extra) => `<polygon points="${pts.map(p => f2(p[0]) + ',' + f2(p[1])).join(' ')}" fill="${fill}" ${extra || ''}/>`;
  const rect = (x, y, w, h, fill, extra) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra || ''}/>`;
  const line = (x1, y1, x2, y2, st, sw, extra) => `<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${st}" stroke-width="${sw}" ${extra || ''}/>`;
  const txt = (x, y, s, size, fill, extra) => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-family="Georgia,'Times New Roman',serif" ${extra || ''}>${s}</text>`;
  function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  /* Map (u,t) in 0..1 onto a quad given by its four corners: tl, tr, br, bl (bilinear) */
  function onQuad(q) {
    return (u, t) => {
      const tx = q[0][0] + (q[1][0] - q[0][0]) * u, ty = q[0][1] + (q[1][1] - q[0][1]) * u;
      const bx = q[3][0] + (q[2][0] - q[3][0]) * u, by = q[3][1] + (q[2][1] - q[3][1]) * u;
      return [tx + (bx - tx) * t, ty + (by - ty) * t];
    };
  }
  const qpoly = (M, u0, u1, t0, t1, fill, extra) => poly([M(u0, t0), M(u1, t0), M(u1, t1), M(u0, t1)], fill, extra);

  /* Room shell: one-point perspective box. Back wall 230..770 x 90..430 */
  const BW = { x0: 230, x1: 770, y0: 90, y1: 430 };
  function shell(c) {
    let h = '';
    h += poly([[0, 0], [1000, 0], [770, 90], [230, 90]], c.ceil);
    h += poly([[0, 0], [230, 90], [230, 430], [0, 600]], c.left);
    h += poly([[1000, 0], [770, 90], [770, 430], [1000, 600]], c.right);
    h += rect(230, 90, 540, 340, c.back);
    h += poly([[0, 600], [230, 430], [770, 430], [1000, 600]], c.floor);
    // edges
    h += `<g stroke="rgba(0,0,0,.35)" stroke-width="2" fill="none"><path d="M230 90V430H770V90"/><path d="M0 0L230 90M1000 0L770 90M0 600L230 430M1000 600L770 430"/></g>`;
    return h;
  }
  function floorPlanks(col, n) {
    let h = `<g stroke="${col}" stroke-width="1.5" opacity=".55">`;
    for (let i = 0; i <= n; i++) { const xb = 230 + i * 540 / n; h += line(xb, 430, 500 + (xb - 500) * 2.6, 600 + 0, col, 1.5); }
    [455, 490, 540].forEach(y => { const k = (y - 430) / 170; h += line(230 - 230 * k, y, 770 + 230 * k, y, col, 1); });
    return h + '</g>';
  }
  const LEFT = onQuad([[0, 0], [230, 90], [230, 430], [0, 600]]);
  const RIGHT = onQuad([[770, 90], [1000, 0], [1000, 600], [770, 430]]);
  // spot on a side wall where u runs along the wall (0 = far edge for RIGHT starts at back), t = height
  const glow = (id, c1, c2) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>`;
  const lin = (id, a, b, v) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

  function chainLinks(x1, y1, x2, y2, col, n, rx) {
    let h = ''; const ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    for (let i = 0; i <= n; i++) { const x = x1 + (x2 - x1) * i / n, y = y1 + (y2 - y1) * i / n; h += `<ellipse cx="${f2(x)}" cy="${f2(y)}" rx="${rx}" ry="${rx * 0.55}" fill="none" stroke="${col}" stroke-width="${rx * 0.38}" transform="rotate(${f2(ang + (i % 2 ? 90 : 0))} ${f2(x)} ${f2(y)})"/>`; }
    return h;
  }
  function fan(cx, cy, col) {
    let b = '';
    for (let i = 0; i < 4; i++) b += `<ellipse cx="0" cy="-46" rx="11" ry="44" fill="${col}" transform="rotate(${i * 90})"/>`;
    return `<g>${line(cx, 0, cx, cy - 6, '#2b1a10', 4)}<g transform="translate(${cx} ${cy}) scale(1 .26)"><g class="eg-spin">${b}</g></g><ellipse cx="${cx}" cy="${cy}" rx="16" ry="7" fill="#C9A24A"/><ellipse cx="${cx}" cy="${cy + 6}" rx="9" ry="5" fill="#F4E3B0" opacity=".9"/></g>`;
  }
  function books(M, u0, u1, t0, t1, seed, pal, labelCol) {
    const r = rng(seed); let h = '', u = u0;
    while (u < u1 - 0.02) {
      const w = 0.035 + r() * 0.04, top = t0 + (t1 - t0) * (0.08 + r() * 0.25), c = pal[Math.floor(r() * pal.length)];
      const end = Math.min(u + w, u1);
      if (r() < 0.18) { // archive box with a label
        const bw = Math.min(0.13, u1 - u); h += qpoly(M, u, u + bw, t0 + (t1 - t0) * 0.22, t1, '#B98E55', 'stroke="#6b4a24" stroke-width="1"');
        h += qpoly(M, u + bw * 0.2, u + bw * 0.8, t0 + (t1 - t0) * 0.42, t0 + (t1 - t0) * 0.66, labelCol);
        u += bw + 0.008; continue;
      }
      h += qpoly(M, u, end, top, t1, c, 'stroke="rgba(0,0,0,.35)" stroke-width=".8"');
      h += qpoly(M, u + (end - u) * 0.15, end - (end - u) * 0.15, top + (t1 - top) * 0.15, top + (t1 - top) * 0.22, 'rgba(255,215,120,.7)');
      u = end + 0.004;
    }
    return h;
  }

  /* ============ LIBRARY: colonial-era Caribbean archive ============ */
  function sceneLibrary() {
    let h = `<defs>${lin('lw', '#EFE3C8', '#CDB78A', 1)}${lin('ls', '#DCC9A0', '#B59C6C', 0)}${lin('lsr', '#B59C6C', '#DCC9A0', 0)}${lin('lf', '#7A4A2A', '#2E170B', 1)}${lin('lc', '#4F321D', '#2C1A0E', 1)}
      ${lin('lm', '#86432A', '#4A1F10', 1)}${lin('lsky', '#9EDDF0', '#E8F6F8', 1)}${lin('lsea', '#2FB3C8', '#0F6F8C', 1)}${lin('lir', '#3A3F47', '#15181d', 1)}${lin('lbr', '#F2D27A', '#A87A22', 1)}
      ${glow('lsun', 'rgba(255,236,170,.75)', 'rgba(255,236,170,0)')}${glow('llamp', 'rgba(255,200,90,.85)', 'rgba(255,200,90,0)')}</defs>`;
    h += shell({ ceil: 'url(#lc)', left: 'url(#ls)', right: 'url(#lsr)', back: 'url(#lw)', floor: 'url(#lf)' });
    h += floorPlanks('#1d0d05', 12);
    // ceiling beams
    [22, 48, 72].forEach(y => { const k = y / 90; h += poly([[230 * k - 6, y - 5], [1000 - 230 * k + 6, y - 5], [1000 - 230 * k + 6, y + 5], [230 * k - 6, y + 5]], '#2A170B'); });
    // wainscot
    h += rect(230, 352, 540, 78, 'url(#lm)'); for (let i = 0; i < 6; i++) h += rect(240 + i * 88, 362, 76, 58, 'none', 'stroke="rgba(255,210,150,.25)" stroke-width="2" rx="3"');
    h += qpoly(LEFT, 0, 1, 0.78, 1, 'url(#lm)'); h += qpoly(RIGHT, 0, 1, 0.78, 1, 'url(#lm)');
    // wall map of the island (lib2)
    h += rect(250, 114, 162, 134, '#5A2C17', 'rx="4"') + rect(258, 122, 146, 118, '#EBD9A8');
    h += `<path d="M282 190c6-22 26-36 44-30 10-14 30-16 40-4 14-2 26 8 22 22-2 14-14 18-10 30-6 12-24 12-34 6-12 8-30 6-38-4-14 2-26-8-24-20z" fill="#C9B07A" stroke="#7A5A2A" stroke-width="2"/>`;
    h += `<ellipse cx="318" cy="196" rx="14" ry="7" fill="#7FC4C9" opacity=".8"/><circle cx="360" cy="178" r="3" fill="#B0412A"/>`;
    for (let i = 0; i < 9; i++) h += `<circle cx="${290 + i * 11}" cy="${222 + (i % 3) * 2}" r="2.2" fill="#8A6A1F"/>`;
    h += `<g transform="translate(386 140)" fill="#7A5A2A"><path d="M0-12L3 0 0 12-3 0Z"/><path d="M-12 0L0-3 12 0 0 3Z" opacity=".7"/></g>` + txt(266, 136, 'ISLAND CHART · 1790', 9, '#5A3A1A', 'letter-spacing="1"');
    // poetry poster + wall safe (lib5)
    h += rect(612, 112, 122, 160, '#1B3A7A', 'rx="3"') + rect(618, 118, 110, 148, '#F4EBD3') + rect(618, 118, 110, 34, '#C8312E');
    h += txt(628, 141, 'POETRY SLAM', 13, '#FFF3D6', 'font-weight="700"') + txt(628, 172, 'Emancipation', 11, '#1B3A7A') + txt(628, 186, 'Day · 1 July', 11, '#1B3A7A');
    for (let i = 0; i < 5; i++) h += rect(628, 198 + i * 12, 70 + (i * 13) % 25, 4, '#8A7A60');
    h += `<circle cx="712" cy="248" r="10" fill="#E7B21E"/>`;
    h += rect(640, 284, 66, 56, '#3E434B', 'rx="4"') + `<circle cx="673" cy="312" r="18" fill="#22262c" stroke="url(#lbr)" stroke-width="4"/><circle cx="673" cy="312" r="6" fill="url(#lbr)"/>`;
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; h += line(673 + Math.cos(a) * 12, 312 + Math.sin(a) * 12, 673 + Math.cos(a) * 16, 312 + Math.sin(a) * 16, '#F2D27A', 1.4); }
    // two-column scroll hanging over the door (lib4)
    h += line(448, 104, 552, 104, '#5A2C17', 5, 'stroke-linecap="round"') + rect(460, 106, 80, 70, '#EBD9A8', 'stroke="#8a6a3a"') + `<ellipse cx="500" cy="178" rx="44" ry="6" fill="#D7C089" stroke="#8a6a3a"/>`;
    for (let i = 0; i < 6; i++) h += rect(467, 116 + i * 9, 28, 3, '#7a6a55') + rect(505, 116 + i * 9, 28, 3, '#7a6a55');
    h += line(500, 112, 500, 170, '#B0412A', 1.5);
    // iron door with chain + padlock (exit)
    h += `<path d="M426 430V250Q500 172 574 250V430Z" fill="#8C8170"/><path d="M440 430V254Q500 192 560 254V430Z" fill="url(#lir)"/>`;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) h += `<circle cx="${456 + c * 29}" cy="${262 + r * 28}" r="3" fill="#6B7380"/>`;
    h += line(500, 220, 500, 430, '#0a0c10', 2);
    h += chainLinks(446, 262, 554, 404, '#9AA3AE', 14, 7) + chainLinks(554, 262, 446, 404, '#B6BFC9', 14, 7);
    h += `<path d="M488 318v-10a12 12 0 0124 0v10" fill="none" stroke="#C9CED6" stroke-width="5"/>` + rect(482, 316, 36, 34, 'url(#lbr)', 'rx="6"') + `<circle cx="500" cy="333" r="4" fill="#5a3a10"/>`;
    // left wall shelf (lib1): perspective shelf on the left wall
    const S = onQuad([[24, 112], [206, 150], [206, 448], [24, 566]]);
    h += poly([S(0, 0), S(1, 0), S(1, 1), S(0, 1)], '#4A2010');
    h += poly([S(1, 0), [222, 146], [222, 455], S(1, 1)], '#2E1208');
    const pal = ['#7B1E1E', '#1E4B7B', '#2F6B3A', '#8A5A1E', '#5A2A6A', '#B88B3A', '#2A2A2A', '#9E3B2A'];
    for (let r = 0; r < 5; r++) {
      const t0 = 0.03 + r * 0.195, t1 = t0 + 0.17;
      h += books(S, 0.05, 0.95, t0, t1, 11 + r * 7, pal, '#F4EBD3');
      h += qpoly(S, 0, 1, t1, t1 + 0.025, '#7A3B22');
    }
    h += qpoly(S, 0, 0.05, 0, 1, '#5E2A15') + qpoly(S, 0.95, 1, 0, 1, '#5E2A15');
    // right wall: louvred windows with sea view
    [[0.08, 0.42], [0.56, 0.9]].forEach(([u0, u1]) => {
      h += qpoly(RIGHT, u0 - 0.02, u1 + 0.02, 0.2, 0.62, '#5A2C17');
      h += qpoly(RIGHT, u0, u1, 0.22, 0.48, 'url(#lsky)') + qpoly(RIGHT, u0, u1, 0.48, 0.6, 'url(#lsea)');
      h += poly([RIGHT(u0, 0.475), RIGHT(u1, 0.475), RIGHT(u1, 0.49), RIGHT(u0, 0.49)], 'rgba(255,255,255,.6)');
      for (let k = 0; k < 9; k++) { const t = 0.23 + k * 0.042; h += poly([RIGHT(u0, t), RIGHT(u0 + (u1 - u0) * 0.5, t + 0.012), RIGHT(u0 + (u1 - u0) * 0.5, t + 0.024), RIGHT(u0, t + 0.012)], 'rgba(122,74,40,.92)'); }
      h += poly([RIGHT((u0 + u1) / 2, 0.22), RIGHT((u0 + u1) / 2 + 0.01, 0.22), RIGHT((u0 + u1) / 2 + 0.01, 0.6), RIGHT((u0 + u1) / 2, 0.6)], '#5A2C17');
    });
    h += `<ellipse cx="860" cy="250" rx="150" ry="130" fill="url(#lsun)"/>`;
    // ceiling fan
    h += fan(500, 46, '#6E3E22');
    // side table with brass balance scale (lib6)
    h += poly([[778, 452], [930, 452], [950, 476], [760, 476]], '#6B3420') + rect(770, 476, 8, 54, '#3E1C10') + rect(930, 476, 8, 54, '#3E1C10') + rect(850, 476, 8, 44, '#3E1C10');
    h += rect(846, 380, 6, 72, 'url(#lbr)') + poly([[830, 452], [868, 452], [862, 444], [836, 444]], 'url(#lbr)');
    h += `<g transform="rotate(-7 849 384)">${rect(796, 381, 106, 5, 'url(#lbr)', 'rx="2"')}${line(800, 384, 786, 424, '#A87A22', 1.4)}${line(800, 384, 814, 424, '#A87A22', 1.4)}${line(898, 384, 884, 418, '#A87A22', 1.4)}${line(898, 384, 912, 418, '#A87A22', 1.4)}<path d="M780 424h40a20 8 0 01-40 0z" fill="url(#lbr)"/><path d="M878 418h40a20 8 0 01-40 0z" fill="url(#lbr)"/></g><circle cx="849" cy="380" r="5" fill="#F2D27A"/>`;
    h += rect(892, 402, 18, 12, '#6E6E6E', 'rx="2"');
    // foreground desk with diary (lib3), magnifying glass, lamp, scroll (lib4)
    h += `<ellipse cx="455" cy="455" rx="120" ry="60" fill="url(#llamp)" opacity=".6"/>`;
    h += poly([[290, 470], [690, 470], [742, 532], [238, 532]], '#7A3B22') + poly([[238, 532], [742, 532], [742, 600], [238, 600]], '#4A1F10');
    h += rect(266, 546, 120, 40, '#5E2A15', 'rx="3"') + rect(594, 546, 120, 40, '#5E2A15', 'rx="3"') + `<circle cx="326" cy="566" r="5" fill="url(#lbr)"/><circle cx="654" cy="566" r="5" fill="url(#lbr)"/>`;
    h += poly([[318, 480], [372, 476], [380, 512], [314, 518]], '#F4EBD3', 'stroke="#8a6a3a"') + poly([[372, 476], [426, 482], [436, 516], [380, 512]], '#EDE0C0', 'stroke="#8a6a3a"');
    for (let i = 0; i < 5; i++) { h += line(324, 488 + i * 5.5, 368, 486 + i * 5.5, '#7a6a55', 1) + line(384, 487 + i * 5.5, 426, 490 + i * 5.5, '#7a6a55', 1); }
    h += `<path d="M300 520l40-4 2 8-40 4z" fill="#5A1E1E"/>`;
    h += `<circle cx="452" cy="500" r="13" fill="rgba(200,235,255,.35)" stroke="url(#lbr)" stroke-width="4"/>` + line(461, 509, 478, 526, '#4A1F10', 6, 'stroke-linecap="round"');
    h += rect(480, 450, 18, 30, '#F2D27A', 'rx="3"') + `<ellipse cx="489" cy="446" rx="11" ry="14" fill="rgba(255,240,200,.75)"/><path d="M486 448q3-9 6 0q-3 4-6 0" fill="#FF9B2E"/>`;
    // reading-room computer (lib2)
    h += rect(536, 414, 92, 66, '#E3DCC6', 'rx="7" stroke="#9A9078"') + rect(545, 422, 74, 48, '#0B2A1E', 'rx="4"') + `<circle cx="582" cy="446" r="30" fill="rgba(80,255,170,.12)"/>`;
    for (let i = 0; i < 5; i++) h += rect(551, 428 + i * 8, 26 + (i * 19) % 36, 3, '#6CFFB0', 'opacity=".85"');
    h += rect(568, 480, 28, 8, '#C9C1A8') + poly([[528, 492], [636, 492], [646, 512], [518, 512]], '#D8D0B8', 'stroke="#9A9078"');
    for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) h += rect(530 + c * 10.6 - r * 2, 496 + r * 5, 8, 3.5, '#A89F86', 'rx="1"');
    h += `<path d="M650 486l26-34" stroke="#F4EBD3" stroke-width="3"/><ellipse cx="650" cy="490" rx="9" ry="5" fill="#1a1a1a"/>`;
    return h;
  }

  /* ============ CREOLE CODE: rum-shop backroom radio corner ============ */
  function sceneCreole() {
    let h = `<defs>${lin('cw', '#36C2B2', '#1F8C86', 1)}${lin('cl', '#F0C24A', '#D99A2B', 0)}${lin('cr', '#E26D5A', '#F08A6A', 0)}${lin('cf', '#8C5A3A', '#3E2416', 1)}${lin('cz', '#9AA4AE', '#5F6B76', 1)}
      ${lin('cst', '#C9D0D8', '#6E7884', 1)}${lin('cbr', '#F2D27A', '#A87A22', 1)}${glow('cb', 'rgba(255,240,180,.9)', 'rgba(255,240,180,0)')}${lin('cj', '#FF5E7E', '#7A2BB8', 1)}</defs>`;
    h += shell({ ceil: 'url(#cz)', left: 'url(#cl)', right: 'url(#cr)', back: 'url(#cw)', floor: 'url(#cf)' });
    // zinc ceiling ridges
    for (let i = 0; i <= 20; i++) { const xb = 230 + i * 27; h += line(xb, 90, 500 + (xb - 500) * 4.3, 0, 'rgba(0,0,0,.18)', 2); }
    // floor tiles (checker)
    for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) if ((r + c) % 2) {
      const ty0 = 430 + [0, 30, 70, 120, 170][r], ty1 = 430 + [0, 30, 70, 120, 170][r + 1], k0 = (ty0 - 430) / 170, k1 = (ty1 - 430) / 170;
      const X = (c, k) => (230 - 230 * k) + c * (540 + 460 * k) / 10;
      h += poly([[X(c, k0), ty0], [X(c + 1, k0), ty0], [X(c + 1, k1), ty1], [X(c, k1), ty1]], 'rgba(255,240,220,.16)');
    }
    // planks on back wall
    for (let x = 248; x < 770; x += 26) h += line(x, 90, x, 430, 'rgba(0,0,0,.12)', 2);
    // bunting
    let bp = 'M232 108Q500 150 768 108'; h += `<path d="${bp}" stroke="#333" fill="none"/>`;
    const bc = ['#F2665C', '#F7C948', '#3D7DD8', '#FFFFFF', '#8E44AD'];
    for (let i = 0; i < 15; i++) { const x = 250 + i * 35, y = 108 + 42 * (1 - Math.pow((x - 500) / 268, 2)) * 0.95; h += poly([[x - 10, y - 2], [x + 10, y - 2], [x, y + 18]], bc[i % 5]); }
    // hanging bulb
    h += line(380, 0, 380, 60, '#222', 2) + `<circle cx="380" cy="72" r="70" fill="url(#cb)" opacity=".55"/><circle cx="380" cy="68" r="9" fill="#FFF6C8"/>`;
    // chalkboard (cre1)
    h += rect(248, 140, 176, 122, '#7A4A2A', 'rx="4"') + rect(256, 148, 160, 106, '#24473A');
    h += `<g stroke="#EDEFE8" stroke-width="2" opacity=".9" fill="none"><path d="M292 244V160M326 244V160"/><path d="M292 232h34M292 210h34M292 188h34M292 166h34"/></g>`;
    h += txt(336, 170, 'ACROLECT', 10, '#EDEFE8') + txt(336, 205, 'mesolect', 10, '#EDEFE8', 'opacity=".8"') + txt(336, 240, 'BASILECT', 10, '#EDEFE8') + rect(262, 250, 26, 5, '#EDEFE8');
    // vault door in the back office wall (exit)
    h += rect(478, 182, 214, 214, '#55606B', 'rx="10"') + `<circle cx="585" cy="289" r="98" fill="url(#cst)" stroke="#3A424C" stroke-width="6"/><circle cx="585" cy="289" r="78" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="3"/>`;
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; h += `<circle cx="${f2(585 + Math.cos(a) * 88)}" cy="${f2(289 + Math.sin(a) * 88)}" r="4" fill="#3A424C"/>`; }
    for (let i = 0; i < 3; i++) h += `<rect x="580" y="229" width="10" height="120" rx="5" fill="#C9A24A" transform="rotate(${i * 60} 585 289)"/>`;
    h += `<circle cx="585" cy="289" r="26" fill="#22262c" stroke="url(#cbr)" stroke-width="4"/><circle cx="585" cy="289" r="7" fill="url(#cbr)"/>` + poly([[585, 258], [580, 250], [590, 250]], '#E33');
    h += rect(670, 200, 10, 30, '#2a2f36', 'rx="3"') + rect(670, 350, 10, 30, '#2a2f36', 'rx="3"');
    // interview outfit on a stand (cre4)
    h += rect(724, 150, 6, 270, '#4A2E1C') + `<ellipse cx="727" cy="424" rx="26" ry="6" fill="#3A2416"/>` + `<path d="M706 176q21-14 42 0" stroke="#4A2E1C" stroke-width="4" fill="none"/>`;
    h += `<path d="M700 180l27-6 27 6 6 70h-66z" fill="#F7F7F2" stroke="#ccc"/><path d="M727 176l-6 10 6 60 6-60z" fill="#C8312E"/><path d="M700 180l-10 46 12 2M754 180l10 46-12 2" fill="#F7F7F2" stroke="#ccc"/>`;
    h += `<path d="M704 252h46l4 90h-22l-5-60-5 60h-22z" fill="#1B2A4A"/>`;
    // posters on the left wall (cre3)
    h += qpoly(LEFT, 0.18, 0.52, 0.17, 0.48, '#FF6B5A') + qpoly(LEFT, 0.21, 0.49, 0.2, 0.3, '#2B2B6B');
    h += qpoly(LEFT, 0.21, 0.49, 0.33, 0.37, '#FFF4D6') + qpoly(LEFT, 0.21, 0.42, 0.4, 0.43, '#FFF4D6');
    h += qpoly(LEFT, 0.6, 0.88, 0.2, 0.46, '#F7F2E2') + qpoly(LEFT, 0.62, 0.86, 0.23, 0.29, '#1E6B5A') + qpoly(LEFT, 0.62, 0.84, 0.33, 0.35, '#555') + qpoly(LEFT, 0.62, 0.8, 0.38, 0.4, '#555');
    h += `<g font-family="Arial,sans-serif" font-weight="800" fill="#FFF4D6"><text x="52" y="128" font-size="13" transform="rotate(20 52 128) skewY(0)">WE GO FETE!</text></g>`;
    h += `<g font-family="Arial,sans-serif" font-weight="700" fill="#F7F2E2"><text x="150" y="138" font-size="9" transform="rotate(21 150 138)">DANCE TONIGHT</text></g>`;
    // crates and lockers (cre2), front left
    const crate = (x, y, w, hh, d, lab) => {
      let s = poly([[x, y], [x + w, y], [x + w, y + hh], [x, y + hh]], '#B07A44', 'stroke="#6B4524" stroke-width="2"');
      s += poly([[x, y], [x + d, y - d * 0.6], [x + w + d, y - d * 0.6], [x + w, y]], '#C99258', 'stroke="#6B4524" stroke-width="2"');
      s += poly([[x + w, y], [x + w + d, y - d * 0.6], [x + w + d, y + hh - d * 0.6], [x + w, y + hh]], '#8A5A30', 'stroke="#6B4524" stroke-width="2"');
      for (let i = 1; i < 3; i++) s += line(x, y + hh * i / 3, x + w, y + hh * i / 3, '#6B4524', 2);
      if (lab) s += txt(x + 10, y + hh / 2 + 5, lab, 13, '#3A2010', 'font-family="Arial,sans-serif" font-weight="800"');
      return s;
    };
    h += crate(26, 470, 110, 96, 28, 'SORREL') + crate(140, 490, 84, 76, 22, 'MAUBY') + crate(46, 386, 92, 84, 24, 'GINGER');
    h += `<path d="M120 506v-8a8 8 0 0116 0v8" fill="none" stroke="#C9CED6" stroke-width="4"/>` + rect(115, 504, 26, 22, 'url(#cbr)', 'rx="4"');
    // counter with phone + radio (cre5)
    h += poly([[470, 470], [770, 470], [790, 500], [450, 500]], '#C8312E') + rect(450, 500, 340, 96, '#8E2420');
    for (let i = 0; i < 6; i++) h += rect(462 + i * 55, 512, 44, 72, 'none', 'stroke="rgba(255,255,255,.18)" stroke-width="2" rx="3"');
    h += rect(490, 438, 80, 38, '#1A1A1A', 'rx="6"') + `<path d="M492 440q38-26 76 0" stroke="#111" stroke-width="10" fill="none" stroke-linecap="round"/>`;
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) h += rect(508 + c * 16, 446 + r * 9, 12, 6, '#DDD', 'rx="1.5"');
    h += rect(600, 430, 120, 44, '#E9D7B0', 'rx="8"') + `<circle cx="625" cy="452" r="14" fill="#6B4524"/><circle cx="625" cy="452" r="9" fill="#3A2416"/>` + rect(648, 440, 60, 14, '#FFF7D6', 'rx="2"') + line(660, 440, 660, 454, '#C8312E', 2) + `<line x1="700" y1="430" x2="726" y2="392" stroke="#666" stroke-width="2"/>`;
    // jukebox on the right wall (cre6)
    h += `<path d="M836 520V300q0-90 70-96q70 6 70 96v220z" fill="url(#cj)" stroke="#2A0A3A" stroke-width="4"/>`;
    h += `<path d="M856 330q0-70 50-74q50 4 50 74z" fill="#FFF2A8" opacity=".85"/>`;
    for (let i = 0; i < 7; i++) h += `<circle cx="${850 + i * 19}" cy="${300 - Math.sin(i / 6 * Math.PI) * 80}" r="4" fill="${['#FF5E7E', '#F7C948', '#5EF0FF'][i % 3]}" class="eg-blink" style="animation-delay:${i * .2}s"/>`;
    h += rect(856, 344, 100, 50, '#2A0A3A', 'rx="4"');
    for (let i = 0; i < 4; i++) h += rect(862, 350 + i * 11, 88, 7, '#F7C948', 'opacity=".75" rx="1"');
    h += rect(862, 410, 88, 70, '#3A1050', 'rx="6"'); for (let i = 0; i < 6; i++) h += line(868, 418 + i * 10, 944, 418 + i * 10, '#FF5E7E', 2);
    h += `<g transform="rotate(-8 920 380)">${rect(904, 360, 34, 28, '#FFF', 'stroke="#ccc"')}${rect(907, 363, 28, 18, '#9A7A5A')}</g>`;
    return h;
  }

  /* ============ SIGNAL LOST: hurricane-season radio/lighthouse control room ============ */
  function sceneSignal() {
    let h = `<defs>${lin('sw', '#1E2D52', '#101A33', 1)}${lin('sl', '#16223F', '#0C1428', 0)}${lin('sr', '#0C1428', '#1A2748', 0)}${lin('sf', '#2A3550', '#0A0F1E', 1)}${lin('sc', '#0B1226', '#151F3A', 1)}
      ${lin('ssky', '#0A1530', '#33476E', 1)}${lin('ssea', '#1E3A5A', '#0A1A2E', 1)}${lin('smet', '#8C96A6', '#3A4252', 1)}${glow('sbeam', 'rgba(255,240,180,.55)', 'rgba(255,240,180,0)')}${glow('scrt', 'rgba(60,255,170,.35)', 'rgba(60,255,170,0)')}</defs>`;
    h += shell({ ceil: 'url(#sc)', left: 'url(#sl)', right: 'url(#sr)', back: 'url(#sw)', floor: 'url(#sf)' });
    h += floorPlanks('rgba(120,140,190,.35)', 9);
    // acoustic panels on back wall
    for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) h += rect(240 + c * 59, 100 + r * 70, 52, 60, 'rgba(255,255,255,.035)', 'rx="4"');
    // storm window (lighthouse) on back wall left
    h += rect(246, 112, 208, 192, '#2A3550', 'rx="6"');
    h += `<svg x="254" y="120" width="192" height="176" viewBox="0 0 192 176"><rect width="192" height="176" fill="url(#ssky)"/><path d="M0 120q24-10 48 0t48 0 48 0 48 0V176H0z" fill="url(#ssea)"/>
      <path d="M0 132q24-8 48 0t48 0 48 0 48 0" stroke="rgba(255,255,255,.35)" fill="none"/>
      <path d="M140 120l6-46h8l6 46z" fill="#E8E8E8"/><rect x="144" y="66" width="12" height="10" fill="#FFE38A"/><path d="M146 92h8M145 104h10" stroke="#C8312E" stroke-width="5"/>
      <g class="eg-beam"><path d="M150 71L-40 40L-40 100Z" fill="url(#sbeam)"/></g>
      <path class="eg-flash" d="M40 0l-14 40h14l-18 46 36-56h-16l12-30z" fill="#F7F3C8"/>
      <g stroke="rgba(190,210,255,.45)" stroke-width="1.5" class="eg-rain">${Array.from({ length: 26 }, (_, i) => `<line x1="${(i * 37) % 200}" y1="${(i * 53) % 150}" x2="${(i * 37) % 200 - 8}" y2="${(i * 53) % 150 + 18}"/>`).join('')}</g></svg>`;
    h += line(350, 112, 350, 304, '#2A3550', 6) + line(246, 208, 454, 208, '#2A3550', 6);
    // frequency chart
    h += rect(466, 118, 82, 92, '#F2F0E6', 'rx="2"') + rect(466, 118, 82, 14, '#C8312E');
    h += txt(471, 129, 'FREQ CHART', 8, '#FFF', 'font-family="Arial,sans-serif" font-weight="700"');
    for (let i = 0; i < 6; i++) h += line(472, 144 + i * 11, 542, 144 + i * 11, '#B9BFCC', 1) + rect(472, 140 + i * 11, 18 + (i * 17) % 40, 3, '#1E3A7A');
    // ON AIR sign + steel door with keypad (exit)
    h += rect(586, 160, 98, 30, '#3A0A0A', 'rx="6"') + `<rect x="590" y="164" width="90" height="22" rx="4" fill="#FF3B3B" class="eg-onair"/>` + txt(605, 181, 'ON AIR', 15, '#FFF', 'font-family="Arial,sans-serif" font-weight="800"');
    h += rect(572, 204, 126, 226, '#3A4252') + rect(580, 212, 110, 218, 'url(#smet)');
    h += `<circle cx="635" cy="262" r="20" fill="#0E1A33" stroke="#D0D6E0" stroke-width="5"/>` + rect(596, 320, 78, 6, '#5A6474') + rect(596, 380, 78, 6, '#5A6474') + rect(672, 330, 12, 26, '#20242c', 'rx="3"');
    h += rect(706, 286, 40, 60, '#1A1E26', 'rx="5"') + rect(711, 291, 30, 10, '#6CFFB0', 'opacity=".85"');
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) h += rect(712 + c * 10, 306 + r * 9, 7, 6, '#C9CED6', 'rx="1"');
    h += `<circle cx="740" cy="296" r="2.5" fill="#FF3B3B" class="eg-blink"/>`;
    // transmitter rack on the left wall (sig1)
    const RK = onQuad([[18, 70], [200, 128], [200, 468], [18, 548]]);
    h += poly([RK(0, 0), RK(1, 0), RK(1, 1), RK(0, 1)], '#232C40', 'stroke="#0a0f1e" stroke-width="3"');
    h += poly([RK(1, 0), [222, 124], [222, 474], RK(1, 1)], '#121a2c');
    for (let r = 0; r < 6; r++) { const t = 0.05 + r * 0.155; h += qpoly(RK, 0.06, 0.94, t, t + 0.13, '#2F3A55', 'stroke="#0a0f1e"'); }
    // VU meters (top two panels)
    [[0.1, 0.45], [0.55, 0.9]].forEach(([u0, u1], i) => {
      h += qpoly(RK, u0, u1, 0.07, 0.17, '#F6E7B0');
      const c = RK((u0 + u1) / 2, 0.165), tip = RK((u0 + u1) / 2 + 0.08, 0.09);
      h += `<g class="eg-needle" style="transform-origin:${f2(c[0])}px ${f2(c[1])}px;animation-delay:${i * .37}s">${line(c[0], c[1], tip[0], tip[1], '#B0212A', 2)}</g>`;
    });
    // dials
    for (let i = 0; i < 3; i++) { const c = RK(0.2 + i * 0.3, 0.28); h += `<circle cx="${f2(c[0])}" cy="${f2(c[1])}" r="${12 - i * 1.5}" fill="#11151d" stroke="#B9C2D0" stroke-width="2"/>` + line(c[0], c[1], c[0] + 6, c[1] - 7, '#FFD766', 2); }
    for (let i = 0; i < 8; i++) { const c = RK(0.12 + i * 0.11, 0.43); h += `<circle cx="${f2(c[0])}" cy="${f2(c[1])}" r="3.5" fill="${['#3CFF8A', '#FFD23C', '#FF4B4B'][i % 3]}" class="eg-blink" style="animation-delay:${i * .23}s"/>`; }
    for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { const a = RK(0.12 + i * 0.14, 0.56 + r * 0.155), b = RK(0.12 + i * 0.14, 0.66 + r * 0.155); h += line(a[0], a[1], b[0], b[1], '#8C96A6', 4, 'stroke-linecap="round"'); }
    // notice board on the right wall (sig5)
    h += qpoly(RIGHT, 0.12, 0.88, 0.1, 0.36, '#B7864A', 'stroke="#5A3A1A" stroke-width="4"');
    [[0.18, 0.4, 0.14, 0.27, '#FFF'], [0.46, 0.62, 0.13, 0.24, '#FFE38A'], [0.66, 0.84, 0.16, 0.32, '#BFE3FF'], [0.3, 0.5, 0.26, 0.34, '#FFD0D0']].forEach(([a, b, c, d, col]) => { h += qpoly(RIGHT, a, b, c, d, col); const p = RIGHT((a + b) / 2, c + 0.01); h += `<circle cx="${f2(p[0])}" cy="${f2(p[1])}" r="3" fill="#C8312E"/>`; });
    const o1 = RIGHT(0.29, 0.17), o2 = RIGHT(0.22, 0.23), o3 = RIGHT(0.36, 0.23); h += line(o1[0], o1[1], o2[0], o2[1], '#555', 1.5) + line(o1[0], o1[1], o3[0], o3[1], '#555', 1.5);
    // switchboard / patch cabinet on the right wall (sig3)
    h += qpoly(RIGHT, 0.14, 0.86, 0.44, 0.84, '#4A3424', 'stroke="#22160c" stroke-width="3"');
    h += qpoly(RIGHT, 0.2, 0.8, 0.48, 0.66, '#151A24');
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { const p = RIGHT(0.26 + c * 0.095, 0.51 + r * 0.055); h += `<circle cx="${f2(p[0])}" cy="${f2(p[1])}" r="4" fill="#C9CED6"/>`; }
    const cb = [['#FF4B4B', 0.26, 0.51, 0.45, 0.62], ['#FFD23C', 0.45, 0.51, 0.74, 0.62], ['#3CA0FF', 0.36, 0.56, 0.64, 0.51]];
    cb.forEach(([col, a, b, c, d]) => { const p = RIGHT(a, b), q = RIGHT(c, d); h += `<path d="M${f2(p[0])} ${f2(p[1])}Q${f2((p[0] + q[0]) / 2)} ${f2(Math.max(p[1], q[1]) + 40)} ${f2(q[0])} ${f2(q[1])}" stroke="${col}" stroke-width="4" fill="none"/>`; });
    const pl = RIGHT(0.5, 0.72); h += `<path d="M${f2(pl[0] - 10)} ${f2(pl[1])}v-8a10 10 0 0120 0v8" fill="none" stroke="#C9CED6" stroke-width="4"/>` + rect(f2(pl[0] - 15), f2(pl[1] - 2), 30, 26, '#E7B21E', 'rx="5"');
    // desk
    h += poly([[262, 476], [740, 476], [790, 540], [212, 540]], '#3A4560') + poly([[212, 540], [790, 540], [790, 600], [212, 600]], '#232C40');
    h += line(212, 540, 790, 540, '#6E7C99', 2);
    // teletype (sig2)
    h += poly([[262, 446], [384, 446], [394, 490], [252, 490]], '#6F7E5A') + rect(272, 430, 102, 18, '#4F5B40', 'rx="3"');
    h += `<path d="M290 430q4-40 18-52h44q-10 16-8 52z" fill="#FBFBF2" stroke="#ccc"/>`;
    for (let i = 0; i < 5; i++) h += line(302, 392 + i * 7, 344 - (i % 2) * 8, 392 + i * 7, '#556', 1.2);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 7; c++) h += `<circle cx="${276 + c * 16 + r * 6}" cy="${464 + r * 12}" r="4" fill="#1B1F27"/>`;
    // mixing console + mic + headphones + script (sig4)
    h += poly([[410, 470], [596, 470], [606, 520], [400, 520]], '#151A24', 'stroke="#55607A"');
    for (let i = 0; i < 8; i++) { h += rect(418 + i * 22, 480, 3, 30, '#333B4E') + rect(412 + i * 22, 484 + (i * 7) % 18, 15, 7, ['#FFD766', '#D0D6E0', '#FF5B5B'][i % 3], 'rx="2"'); }
    h += `<path d="M470 470L452 408l40-26" stroke="#8C96A6" stroke-width="4" fill="none"/><rect x="482" y="366" width="22" height="34" rx="11" fill="#2A2F3A" stroke="#8C96A6" stroke-width="2" transform="rotate(30 493 383)"/>`;
    h += `<path d="M548 470q0-30 26-30t26 30" stroke="#1B1F27" stroke-width="5" fill="none"/>` + rect(540, 462, 14, 16, '#C8312E', 'rx="5"') + rect(594, 462, 14, 16, '#C8312E', 'rx="5"');
    h += poly([[414, 446], [460, 440], [466, 466], [418, 470]], '#F4F1E4');
    // radar monitor (sig6)
    h += rect(618, 362, 124, 98, '#1B1F27', 'rx="8"') + rect(628, 372, 104, 72, '#041510') + rect(672, 460, 16, 16, '#1B1F27');
    h += `<circle cx="680" cy="408" r="32" fill="url(#scrt)"/><circle cx="680" cy="408" r="30" fill="none" stroke="#2FCB8A" stroke-width="1"/><circle cx="680" cy="408" r="18" fill="none" stroke="#2FCB8A" stroke-width="1"/>`;
    h += `<path d="M664 396q14-14 30 0q8 16-8 22q-10 4-14-4" fill="none" stroke="#FFD23C" stroke-width="5" opacity=".8"/><path d="M670 402q8-8 18 0" fill="none" stroke="#FF4B4B" stroke-width="4"/>`;
    h += `<g class="eg-sweep" style="transform-origin:680px 408px">${line(680, 408, 680, 378, '#7CFFC4', 2)}</g>`;
    h += txt(632, 384, '● REC', 8, '#FF4B4B', 'font-family="Arial,sans-serif"');
    // drip of rain on the window sill shadow + ceiling lamp
    h += `<ellipse cx="500" cy="12" rx="60" ry="8" fill="#2E3A5A"/><ellipse cx="500" cy="16" rx="50" ry="5" fill="#FFE7A8" opacity=".55"/>`;
    return h;
  }

  /* hotspots: x,y,w,h in the 1000x600 scene. `spot` keys are referenced by escape.js puzzles */
  const SPOTS = {
    library: {
      shelf: { x: 22, y: 112, w: 200, h: 450, label: 'Heritage collection shelf' },
      map: { x: 246, y: 110, w: 170, h: 142, label: 'Island chart' },
      diary: { x: 300, y: 466, w: 140, h: 60, label: 'Returned book' },
      scroll: { x: 446, y: 96, w: 108, h: 90, label: 'Two-column scroll' },
      computer: { x: 516, y: 408, w: 134, h: 108, label: 'Reading-room computer' },
      poster: { x: 606, y: 108, w: 134, h: 236, label: 'Poetry poster and wall safe' },
      scale: { x: 776, y: 368, w: 156, h: 108, label: 'Brass balance scale' },
      door: { x: 430, y: 196, w: 140, h: 234, label: 'Chained iron door' }
    },
    creole: {
      chalk: { x: 244, y: 136, w: 184, h: 130, label: 'Chalkboard' },
      crates: { x: 24, y: 360, w: 210, h: 210, label: 'Padlocked crates' },
      posters: { x: 30, y: 60, w: 180, h: 200, label: 'Posters' },
      outfit: { x: 688, y: 150, w: 80, h: 200, label: 'Interview outfit' },
      phone: { x: 470, y: 420, w: 260, h: 70, label: 'Phone and radio' },
      jukebox: { x: 832, y: 202, w: 150, h: 320, label: 'Jukebox' },
      door: { x: 486, y: 190, w: 198, h: 198, label: 'Vault door' }
    },
    signal: {
      rack: { x: 16, y: 70, w: 200, h: 470, label: 'Transmitter rack' },
      teletype: { x: 250, y: 380, w: 148, h: 110, label: 'News teletype' },
      switchboard: { x: 800, y: 270, w: 182, h: 250, label: 'Padlocked switchboard' },
      console: { x: 404, y: 432, w: 206, h: 92, label: 'Mixing desk and ad script' },
      notice: { x: 800, y: 50, w: 182, h: 190, label: 'Notice board' },
      radar: { x: 614, y: 358, w: 132, h: 106, label: 'Radar and video monitor' },
      door: { x: 570, y: 196, w: 182, h: 236, label: 'Keypad-locked station door' }
    }
  };
  const SCENES = { library: sceneLibrary, creole: sceneCreole, signal: sceneSignal };
  const cache = {};
  function scene(id) { if (!SCENES[id]) return ''; if (!cache[id]) cache[id] = `<svg class="eg-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">${SCENES[id]()}</svg>`; return cache[id]; }

  /* ---------- inventory items ---------- */
  const ITEMS = {
    tag: { name: 'Brass key tag', svg: `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="18" cy="18" r="11" fill="none" stroke="#E7B21E" stroke-width="6"/><circle cx="18" cy="18" r="11" fill="none" stroke="#8A5A10" stroke-width="1" opacity=".6"/><path d="M25 25l24 24" stroke="#E7B21E" stroke-width="6" stroke-linecap="round"/><path d="M41 41l-6 6M47 47l-5 5" stroke="#E7B21E" stroke-width="5" stroke-linecap="round"/><path d="M8 30q-4 14 6 22" stroke="#7A3B22" stroke-width="1.5" fill="none"/></svg>` },
    cap: { name: 'Bottle cap', svg: `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 4l5 6 7-3 2 7 8 0-1 8 7 3-4 7 4 7-7 3 1 8-8 0-2 7-7-3-5 6-5-6-7 3-2-7-8 0 1-8-7-3 4-7-4-7 7-3-1-8 8 0 2-7 7 3z" fill="#F2665C" stroke="#8E2420" stroke-width="2"/><circle cx="32" cy="32" r="16" fill="#FFF4D6"/></svg>` },
    tube: { name: 'Valve fuse', svg: `<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="22" y="44" width="20" height="14" rx="3" fill="#8C96A6" stroke="#3A4252" stroke-width="2"/><path d="M20 44V22a12 12 0 0124 0v22z" fill="rgba(170,230,255,.55)" stroke="#BFE3FF" stroke-width="2"/><path d="M26 40v-14h12v14" fill="none" stroke="#FFB23C" stroke-width="2"/></svg>` }
  };
  const ROOMITEM = { library: 'tag', creole: 'cap', signal: 'tube' };
  const BEYOND = {
    library: () => { let h = `<defs>${lin('bl1', '#FFB866', '#FF7A59', 1)}${lin('bl2', '#2FB3C8', '#156F8C', 1)}</defs><rect width="400" height="400" fill="url(#bl1)"/><circle cx="200" cy="190" r="46" fill="#FFE9A8"/><rect y="200" width="400" height="40" fill="url(#bl2)"/>`;
      const B = [[0, 120, 90, '#F7C948'], [86, 150, 80, '#36C2B2'], [250, 140, 70, '#F2665C'], [316, 110, 84, '#FFF4D6']];
      B.forEach(([x, y, w, c]) => { h += rect(x, y, w, 400 - y, c) + poly([[x - 6, y], [x + w / 2, y - 26], [x + w + 6, y]], '#8E2420'); for (let r = 0; r < 3; r++) for (let k = 0; k < 2; k++) h += rect(x + 12 + k * (w / 2), y + 22 + r * 62, w / 2 - 24, 36, '#5A2C17', 'opacity=".75"'); h += rect(x, y + 92, w, 6, '#FFF') + line(x, y + 110, x + w, y + 110, '#FFF', 2); });
      h += poly([[170, 400], [230, 400], [214, 240], [186, 240]], '#B9A27A') + `<g stroke="#5A3A1A" stroke-width="7" fill="none"><path d="M236 400q8-90-4-170"/></g><g fill="#2F6B3A">${[0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="232" cy="232" rx="46" ry="9" transform="rotate(${a} 232 232) translate(36 0)"/>`).join('')}</g>`;
      return h + line(150, 400, 150, 270, '#222', 4) + `<circle cx="150" cy="266" r="8" fill="#FFF3B0"/>`; },
    creole: () => { let h = `<defs>${lin('bc1', '#D9DEE5', '#7E8794', 1)}${glow('bc2', 'rgba(255,230,140,.95)', 'rgba(255,230,140,0)')}</defs><rect width="400" height="400" fill="url(#bc1)"/>`;
      for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) h += rect(8 + c * 49, 10 + r * 40, 44, 34, '#B9C2CC', 'rx="3" stroke="#6E7884"') + `<circle cx="${30 + c * 49}" cy="${27 + r * 40}" r="3" fill="#C9A24A"/>`;
      h += `<circle cx="200" cy="300" r="120" fill="url(#bc2)"/>` + rect(60, 330, 280, 14, '#6E7884') + `<ellipse cx="200" cy="330" rx="62" ry="12" fill="#A8231E"/>` + rect(138, 268, 124, 62, '#C8312E') + `<ellipse cx="200" cy="268" rx="62" ry="12" fill="#E2463E"/>` + rect(150, 284, 100, 30, '#FFF4D6', 'rx="4"');
      return h + txt(172, 305, 'SORREL', 14, '#8E2420', 'font-weight="800"'); },
    signal: () => { let h = `<defs>${lin('bs1', '#FFD9A8', '#9CC9E8', 1)}${lin('bs2', '#2F7FA8', '#123A5A', 1)}</defs><rect width="400" height="400" fill="url(#bs1)"/>`;
      ['#FF6B6B', '#FFB23C', '#FFE45C', '#5ED67D', '#4BA3FF', '#8E6BFF'].forEach((c, i) => { h += `<path d="M20 230A180 180 0 0 1 380 230" stroke="${c}" stroke-width="7" fill="none" opacity=".6" transform="translate(0 ${i * 7})"/>`; });
      h += `<circle cx="300" cy="200" r="30" fill="#FFF1C8"/><rect y="230" width="400" height="170" fill="url(#bs2)"/><path d="M0 240q60-40 120-6t110-20 170 16v30H0z" fill="#2F6B3A"/>`;
      h += `<path d="M84 300l10-110h20l10 110z" fill="#F4F4F4"/><path d="M90 230h30M88 262h34" stroke="#C8312E" stroke-width="10"/><rect x="92" y="176" width="24" height="16" fill="#FFE38A"/><path d="M60 310h88l-12-12H72z" fill="#55606B"/>`;
      return h + Array.from({ length: 6 }, (_, i) => `<path d="M${i * 70} ${330 + (i % 2) * 18}q18-6 36 0" stroke="rgba(255,255,255,.5)" fill="none" stroke-width="2"/>`).join(''); }
  };

  /* ---------- styles ---------- */
  const CSS = `
.eg-room{--eg-a:#FFD766;--eg-glow:rgba(255,215,102,.75);--eg-panel:#0B1433;position:relative;gap:14px}
.eg-r-library{--eg-a:#F2C462;--eg-panel:#2A160C;--eg-glow:rgba(255,206,110,.85)}
.eg-r-creole{--eg-a:#FFD23C;--eg-panel:#123C3A;--eg-glow:rgba(255,226,90,.9)}
.eg-r-signal{--eg-a:#6CFFB0;--eg-panel:#0A1226;--eg-glow:rgba(108,255,176,.85)}
.eg-room .eg-head{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;justify-content:space-between}
.eg-room .eg-head b{color:var(--eg-a)}
.eg-room .eg-tokens{display:inline-flex;gap:6px;align-items:center;font-size:.9rem;color:#C9D2F0}
.eg-scene{position:relative;width:100%;aspect-ratio:5/3;border-radius:16px;overflow:hidden;background:#000;box-shadow:inset 0 0 0 2px rgba(255,255,255,.08),0 18px 40px rgba(0,0,0,.45);isolation:isolate}
.eg-scene .eg-svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.eg-scene::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(120% 90% at 50% 45%,transparent 55%,rgba(0,0,0,.55));z-index:1}
.eg-scene.dim .eg-svg{filter:brightness(.55) saturate(.8)}
.eg-hot{position:absolute;z-index:2;min-width:40px;min-height:40px;border-radius:14px;border:2px solid transparent;background:transparent;padding:0;cursor:pointer;color:#fff}
.eg-hot:hover,.eg-hot:focus-visible{background:rgba(255,255,255,.08);border-color:var(--eg-a);outline:none;box-shadow:0 0 0 3px rgba(0,0,0,.4),0 0 22px var(--eg-glow)}
.eg-hot.live::before{content:"";position:absolute;inset:-4px;border-radius:16px;border:3px solid var(--eg-a);box-shadow:0 0 18px var(--eg-glow),inset 0 0 18px var(--eg-glow);animation:egPulse 1.6s ease-in-out infinite}
.eg-hot.locked{cursor:not-allowed}
.eg-hot .eg-tag{position:absolute;left:50%;top:-6px;transform:translate(-50%,-100%);white-space:nowrap;background:rgba(6,10,24,.88);color:#fff;border:1px solid var(--eg-a);border-radius:99px;padding:3px 10px;font-size:.78rem;font-weight:700;pointer-events:none;opacity:0;transition:opacity .15s}
.eg-hot.live .eg-tag,.eg-hot:hover .eg-tag,.eg-hot:focus-visible .eg-tag{opacity:1}
.eg-hot.eg-l .eg-tag{left:0;transform:translate(0,-100%)}.eg-hot.eg-r .eg-tag{left:auto;right:0;transform:translate(0,-100%)}
.eg-hot.eg-top.eg-l .eg-tag{transform:translate(0,100%)}.eg-hot.eg-top.eg-r .eg-tag{transform:translate(0,100%)}
.eg-hot.eg-top .eg-tag{top:auto;bottom:-6px;transform:translate(-50%,100%)}
.eg-hot .eg-badge{position:absolute;right:-6px;top:-6px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-size:.85rem;font-weight:900;box-shadow:0 2px 6px rgba(0,0,0,.5)}
.eg-hot.done .eg-badge{background:#2BD47D;color:#05301A;border:2px solid #E9FFF2}
.eg-hot.locked .eg-badge{background:rgba(20,26,44,.75);color:#C9D2F0;border:1px solid rgba(255,255,255,.35);width:20px;height:20px;font-size:.6rem;right:4px;top:4px;opacity:.8}
.eg-hot.door.live::before{border-style:dashed}
.eg-status{display:flex;align-items:center;gap:10px;flex-wrap:wrap;color:#DDE4FF}
.eg-status .eg-arrow{display:inline-block;animation:egNudge 1.2s ease-in-out infinite}
/* inventory */
.eg-inv{display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:10px;border-radius:14px;background:linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.25));border:1px solid rgba(255,255,255,.1);box-shadow:inset 0 2px 10px rgba(0,0,0,.6)}
.eg-inv .eg-invl{font-weight:800;color:var(--eg-a);margin-right:4px;font-size:.85rem;letter-spacing:.04em}
.eg-slot{position:relative;width:54px;height:62px;border-radius:12px;background:rgba(255,255,255,.04);border:2px dashed rgba(255,255,255,.18);display:grid;place-items:center;color:rgba(255,255,255,.3);font-weight:800}
.eg-slot.got{border:2px solid var(--eg-a);background:radial-gradient(circle at 50% 35%,rgba(255,255,255,.18),rgba(0,0,0,.2));box-shadow:0 0 12px var(--eg-glow)}
.eg-slot svg{width:40px;height:40px;position:absolute;top:4px;left:50%;transform:translateX(-50%)}
.eg-slot .eg-dg{position:absolute;bottom:3px;right:4px;min-width:22px;height:22px;border-radius:7px;background:#0A1433;color:#FFE38A;font:900 .95rem var(--f-display);display:grid;place-items:center;border:1px solid var(--eg-a)}
.eg-slot.new{animation:egPop .7s cubic-bezier(.2,1.6,.4,1) both}
.eg-slot .eg-n{position:absolute;top:-8px;left:-6px;width:18px;height:18px;border-radius:50%;background:#1A2246;color:#C9D2F0;font-size:.65rem;display:grid;place-items:center;border:1px solid rgba(255,255,255,.25)}
/* close-up puzzle */
.eg-close{display:grid;grid-template-columns:minmax(0,1fr);gap:14px;animation:egZoom .35s ease-out both}
.eg-close .eg-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:space-between}
.eg-close h2{color:#F1F4FF}
.eg-room h2[tabindex="-1"]:focus{outline:none}
.eg-room>*{min-width:0}
.eg-close .q{font-weight:700;color:#FFE9A8;margin:0}
.eg-prop{position:relative;max-width:720px;width:100%;margin:6px auto 4px;padding:22px 24px;line-height:1.55;box-shadow:0 16px 30px rgba(0,0,0,.5);transform:rotate(-.6deg)}
.eg-prop p{margin:.35em 0}.eg-prop ul,.eg-prop ol{margin:.35em 0;padding-left:1.4em}.eg-prop li{margin:.2em 0}.eg-prop blockquote{margin:.4em 0;padding-left:.8em;border-left:3px solid currentColor}
.eg-prop .eg-pl{display:block;font-size:.72rem;letter-spacing:.14em;font-weight:800;opacity:.75;margin-bottom:6px;text-transform:uppercase}
.eg-p-note,.eg-p-torn,.eg-p-scroll,.eg-p-letter{color:#2B1B0C;font-family:Georgia,"Times New Roman",serif;background:radial-gradient(circle at 20% 15%,rgba(255,255,255,.55),transparent 40%),radial-gradient(circle at 85% 90%,rgba(140,90,30,.28),transparent 45%),linear-gradient(180deg,#F5E7C4,#E6D0A0)}
.eg-p-note::before{content:"";position:absolute;top:-12px;left:50%;width:110px;height:26px;transform:translateX(-50%) rotate(-3deg);background:rgba(240,230,180,.75);box-shadow:0 2px 3px rgba(0,0,0,.2)}
.eg-p-torn{clip-path:polygon(0 0,100% 0,100% 94%,96% 100%,90% 95%,83% 99%,76% 94%,68% 100%,60% 95%,52% 99%,44% 94%,36% 100%,28% 95%,20% 99%,12% 94%,5% 99%,0 95%)}
.eg-p-scroll{border-radius:6px;border-top:14px solid #C9A86A;border-bottom:14px solid #C9A86A;box-shadow:0 16px 30px rgba(0,0,0,.5),inset 0 10px 10px -8px rgba(0,0,0,.35),inset 0 -10px 10px -8px rgba(0,0,0,.35)}
.eg-p-ledger{color:#1E1A12;font-family:Georgia,serif;background:radial-gradient(circle at 85% 90%,rgba(140,90,30,.15),transparent 50%),linear-gradient(180deg,#FBF6E6,#F1E7CC);border-left:28px solid #8A2A1E;box-shadow:0 16px 30px rgba(0,0,0,.5),inset 3px 0 0 #E7B21E}
.eg-p-news{color:#151515;font-family:Georgia,serif;background:linear-gradient(180deg,#EFEDE6,#DCD8CC);border-top:6px double #333}
.eg-p-poster{color:#13224A;background:linear-gradient(180deg,#FFF6DD,#FFE6B0);border:10px solid #1B3A7A;outline:4px solid #C8312E;outline-offset:-16px;transform:rotate(.6deg)}
.eg-p-chalk{color:#F2F5EE;font-family:"Segoe Print","Bradley Hand","Comic Sans MS",cursive;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.06),transparent 50%),#24473A;border:14px solid #7A4A2A;border-radius:6px;box-shadow:0 16px 30px rgba(0,0,0,.5),inset 0 0 30px rgba(0,0,0,.45)}
.eg-p-chalk strong{color:#FFF3A8}
.eg-p-screen{color:#9DFFCB;font-family:"Cascadia Mono",Consolas,"Courier New",monospace;background:radial-gradient(130% 100% at 50% 50%,#0B2A1E,#03110B);border:14px solid #22272F;border-radius:22px;box-shadow:0 16px 30px rgba(0,0,0,.5),inset 0 0 40px rgba(0,0,0,.8);text-shadow:0 0 6px rgba(110,255,180,.45)}
.eg-p-screen strong{color:#E9FFF2}
.eg-p-board{color:#1E1A12;background:#FFFDF2;border:16px solid #B7864A;box-shadow:0 16px 30px rgba(0,0,0,.5),inset 0 0 0 1px #ddd}
.eg-p-board::before{content:"";position:absolute;top:8px;left:50%;width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#FF8A8A,#B0212A);box-shadow:0 2px 3px rgba(0,0,0,.4)}
.eg-p-teletype{color:#1E1E1E;font-family:"Courier New",monospace;background:repeating-linear-gradient(180deg,#FBFBF2 0 22px,#F0F0E2 22px 44px);border-left:14px dotted #C9CCB8;border-right:14px dotted #C9CCB8}
.eg-p-transcript,.eg-p-teletype,.eg-p-screen{font-size:.95em}
.eg-p-transcript{color:#1E1E1E;font-family:"Courier New",monospace;background:#FFFEF7;border-top:30px solid #C8312E;box-shadow:0 16px 30px rgba(0,0,0,.5)}
.eg-p-photo{color:#2B1B0C;background:#FFF;padding:22px 22px 30px;border:1px solid #ccc;transform:rotate(1deg)}
.eg-p-switch{color:#F1F4FF;background:linear-gradient(180deg,#2A2018,#1A140E);border:12px solid #4A3424;border-radius:10px}
.eg-p-switch strong{color:#FFD766}
/* choice: drawers */
.eg-drawers{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:12px;perspective:900px}
.eg-drawer{position:relative;display:flex;gap:12px;align-items:flex-start;text-align:left;padding:16px 14px 14px 14px;border-radius:10px;border:0;cursor:pointer;color:#2B1B0C;font:inherit;line-height:1.4;background:linear-gradient(180deg,#F7EBCB,#E8D3A2);box-shadow:0 0 0 6px var(--eg-wood,#6B3420),0 8px 0 6px var(--eg-wood2,#3E1C10),0 14px 18px 6px rgba(0,0,0,.45);transition:transform .2s,box-shadow .2s;margin:6px}
.eg-r-creole .eg-drawer{--eg-wood:#C8312E;--eg-wood2:#7A1A16}
.eg-r-signal .eg-drawer{--eg-wood:#3A4252;--eg-wood2:#1A1E26;background:linear-gradient(180deg,#EEF2F8,#CFD7E4);color:#121826}
.eg-drawer .eg-knob{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font:900 1rem var(--f-display);color:#2B1B0C;background:radial-gradient(circle at 35% 30%,#FFF1B8,#C9961E 60%,#7A5410);box-shadow:0 3px 0 rgba(0,0,0,.35)}
.eg-drawer:hover{transform:translateY(-3px)}
.eg-drawer:focus-visible{outline:3px solid #fff;outline-offset:8px}
.eg-drawer.sel{transform:translateY(-6px) scale(1.02);box-shadow:0 0 0 6px var(--eg-a),0 8px 0 6px var(--eg-wood2,#3E1C10),0 0 30px 10px var(--eg-glow)}
.eg-drawer.sel::after{content:"";position:absolute;top:-14px;right:18px;width:14px;height:34px;border:3px solid #9AA3AE;border-radius:8px;border-bottom-color:transparent}
.eg-drawer.right{box-shadow:0 0 0 6px #2BD47D,0 8px 0 6px #0D5A32,0 0 30px 10px rgba(43,212,125,.5)}
/* order: shelf slots */
.eg-shelf{display:grid;gap:10px;padding:16px 14px 22px;border-radius:12px;background:linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.15));border:1px solid rgba(255,255,255,.1);position:relative}
.eg-shelf::after{content:"";position:absolute;left:8px;right:8px;bottom:6px;height:10px;border-radius:4px;background:linear-gradient(180deg,#8A5A30,#4A2E16);box-shadow:0 4px 8px rgba(0,0,0,.5)}
.eg-r-signal .eg-shelf::after{background:linear-gradient(180deg,#6E7884,#2A2F36)}
.eg-socket{display:flex;align-items:stretch;gap:10px;min-height:52px}
.eg-socket .eg-sn{flex:none;width:40px;border-radius:10px;display:grid;place-items:center;font:900 1.1rem var(--f-display);color:#0A1433;background:radial-gradient(circle at 40% 35%,#FFF1B8,var(--eg-a));box-shadow:inset 0 -3px 0 rgba(0,0,0,.25)}
.eg-r-signal .eg-socket .eg-sn{border-radius:50%;width:40px;height:40px;align-self:center;background:radial-gradient(circle,#0A0F1E 30%,#C9CED6 32%,#6E7884 70%)!important;color:transparent}
.eg-socket .eg-empty{flex:1;border:2px dashed rgba(255,255,255,.25);border-radius:12px;display:flex;align-items:center;padding:0 12px;color:rgba(255,255,255,.45);font-size:.9rem}
.eg-tile{flex:1;display:flex;align-items:center;gap:10px;text-align:left;padding:10px 14px;border-radius:12px;border:0;cursor:pointer;font:inherit;line-height:1.35;color:#2B1B0C;background:linear-gradient(180deg,#FFF6DA,#EAD6A6);box-shadow:0 4px 0 #9C7A40,0 8px 14px rgba(0,0,0,.35);transition:transform .12s}
.eg-r-signal .eg-tile{background:linear-gradient(180deg,#E9F1FF,#BFD0EA);color:#0A1226;box-shadow:0 4px 0 #56607A,0 8px 14px rgba(0,0,0,.35)}
.eg-r-creole .eg-tile{background:linear-gradient(180deg,#FFF4D6,#FFD9A0);box-shadow:0 4px 0 #C8312E,0 8px 14px rgba(0,0,0,.35)}
.eg-tile:hover{transform:translateY(-2px)}
.eg-tile:focus-visible{outline:3px solid #fff;outline-offset:3px}
.eg-tile.placed{animation:egDrop .28s ease-out both}
.eg-tile .eg-x{margin-left:auto;font-weight:900;opacity:.55}
.eg-pool{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}
.eg-pool .eg-tile{transform:rotate(var(--r,0deg))}
.eg-cable{width:16px;height:16px;border-radius:50%;flex:none;background:var(--c,#FF4B4B);box-shadow:0 0 0 3px rgba(0,0,0,.25)}
/* word: typewriter */
.eg-tw{max-width:640px;margin:0 auto;width:100%}
.eg-twpaper{position:relative;margin:0 clamp(12px,5%,34px);background:linear-gradient(180deg,#FFFDF4,#F3EEDC);border-radius:4px 4px 0 0;padding:16px 18px 10px;box-shadow:0 -4px 14px rgba(0,0,0,.3)}
.eg-twpaper label{display:block;font-size:.8rem;color:#6A5A3A;font-weight:700;margin-bottom:4px}
.eg-twpaper input{width:100%;box-sizing:border-box;border:0;border-bottom:2px solid #B9AC8A;background:transparent;font:700 1.35rem "Courier New",Courier,monospace;color:#1A1A1A;padding:6px 2px;outline:none;caret-color:#C8312E}
.eg-twpaper input:focus{border-bottom-color:#C8312E}
.eg-twbody{background:linear-gradient(180deg,#2B3A30,#16201A);border-radius:18px 18px 24px 24px;padding:18px 12px 16px;box-shadow:inset 0 2px 0 rgba(255,255,255,.15),0 14px 26px rgba(0,0,0,.55)}
.eg-r-creole .eg-twbody{background:linear-gradient(180deg,#C8312E,#7A1A16)}
.eg-r-signal .eg-twbody{background:linear-gradient(180deg,#3A4252,#1A1E26)}
.eg-twbody::before{content:"";display:block;height:12px;margin:-8px 10px 12px;border-radius:8px;background:linear-gradient(180deg,#C9CED6,#6E7884)}
.eg-twrow{display:flex;justify-content:center;gap:clamp(3px,1vw,6px);margin:5px 0}
.eg-twk{flex:0 1 44px;min-width:0;aspect-ratio:1;border-radius:50%;border:3px solid #C9CED6;background:radial-gradient(circle at 40% 35%,#3A3A3A,#0E0E0E);color:#F4F1E4;font:800 clamp(.7rem,2.6vw,1rem) "Courier New",monospace;cursor:pointer;box-shadow:0 4px 0 #000;padding:0;display:grid;place-items:center}
.eg-twk:active,.eg-twk.hit{transform:translateY(3px);box-shadow:0 1px 0 #000}
.eg-twk:focus-visible{outline:3px solid var(--eg-a);outline-offset:2px}
.eg-twk.wide{flex:0 0 auto;aspect-ratio:auto;height:40px;border-radius:22px;padding:0 14px;min-width:84px}
.eg-twk.space{flex:0 1 280px;aspect-ratio:auto;height:40px;border-radius:22px}
/* ===== LOCKS ===== */
.eg-mech{display:grid;justify-items:center;gap:12px;position:relative}
.eg-mech .eg-tip{color:#DDE4FF;font-size:.92rem;text-align:center;margin:0}
.eg-ctl{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.eg-ctl .btn,.eg-ctl .tool{min-width:44px}
/* chained cabinet + padlock */
.eg-chained{position:relative;width:min(100%,460px);padding:44px 10px 30px;border-radius:14px;background:linear-gradient(90deg,#5A2C17 0 49.6%,#2A1208 49.6% 50.4%,#5A2C17 50.4%);box-shadow:inset 0 0 0 8px #3E1C10,inset 0 0 40px rgba(0,0,0,.5),0 16px 30px rgba(0,0,0,.5);display:grid;place-items:center;overflow:hidden}
.eg-r-signal .eg-chained{background:linear-gradient(90deg,#4A5262 0 49.6%,#1A1E26 49.6% 50.4%,#4A5262 50.4%);box-shadow:inset 0 0 0 8px #2A2F36,inset 0 0 40px rgba(0,0,0,.5),0 16px 30px rgba(0,0,0,.5)}
.eg-r-creole .eg-chained{background:linear-gradient(90deg,#B07A44 0 49.6%,#6B4524 49.6% 50.4%,#B07A44 50.4%);box-shadow:inset 0 0 0 8px #6B4524,inset 0 0 40px rgba(0,0,0,.35),0 16px 30px rgba(0,0,0,.5)}
.eg-chain{position:absolute;left:-10%;right:-10%;top:50%;height:22px;margin-top:-11px;background:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='22'%3E%3Cellipse cx='9' cy='11' rx='8' ry='6.5' fill='none' stroke='%23596270' stroke-width='5'/%3E%3Cellipse cx='9' cy='11' rx='8' ry='6.5' fill='none' stroke='%23C9D0D8' stroke-width='3'/%3E%3Crect x='14' y='8' width='16' height='6' rx='3' fill='%23A9B2BE' stroke='%23596270' stroke-width='1.5'/%3E%3C/svg%3E\") 0 0/30px 22px repeat-x;filter:drop-shadow(0 3px 2px rgba(0,0,0,.6));pointer-events:none}
.eg-chain.a{transform:rotate(14deg)}.eg-chain.b{transform:rotate(-14deg)}
.eg-padlock{position:relative;z-index:2;display:grid;justify-items:center}
.eg-shackle{width:56%;max-width:170px;height:70px;border:16px solid #C9CED6;border-bottom:0;border-radius:90px 90px 0 0;margin-bottom:-6px;background:transparent;box-shadow:inset 0 4px 6px rgba(255,255,255,.4);border-color:#D6DBE2 #8E97A4 #8E97A4 #D6DBE2;position:relative;z-index:0}
.eg-plbody{position:relative;z-index:1;padding:14px 14px 12px;border-radius:18px;background:linear-gradient(160deg,#FFE7A0 0%,#E7B21E 30%,#A87A10 70%,#7A5410 100%);box-shadow:inset 0 3px 0 rgba(255,255,255,.6),inset 0 -6px 0 rgba(0,0,0,.25),0 14px 22px rgba(0,0,0,.55);display:grid;justify-items:center;gap:8px}
.eg-plbody .eg-brand{font:900 .7rem var(--f-display);letter-spacing:.3em;color:#5A3A08;text-shadow:0 1px 0 rgba(255,255,255,.4)}
.eg-wheels{display:flex;gap:6px;padding:8px;border-radius:10px;background:linear-gradient(180deg,#2A1A06,#4A300A 50%,#2A1A06);box-shadow:inset 0 3px 8px rgba(0,0,0,.8)}
.eg-wh{display:grid;justify-items:center;gap:3px}
.eg-whb{width:38px;height:24px;border-radius:8px;border:0;background:linear-gradient(180deg,#F7E3A6,#B9861A);color:#3A2406;font-size:.7rem;cursor:pointer;padding:0;box-shadow:0 2px 0 rgba(0,0,0,.35)}
.eg-whb:active{transform:translateY(1px)}
.eg-wheel{width:38px;height:78px;border-radius:7px;overflow:hidden;cursor:ns-resize;outline:none;display:grid;grid-template-rows:1fr 1.25fr 1fr;align-items:center;text-align:center;font:900 1.35rem var(--f-display);color:#1A1A1A;background:linear-gradient(180deg,#6E7884 0%,#D9DEE5 22%,#FFFFFF 50%,#D9DEE5 78%,#6E7884 100%);box-shadow:inset 0 0 0 2px rgba(0,0,0,.35);touch-action:none;user-select:none}
.eg-wheel span{display:block;line-height:1}
.eg-wheel .pv,.eg-wheel .nx{font-size:.9rem;opacity:.45;transform:scaleY(.7)}
.eg-wheel .cu{position:relative}
.eg-wheel:focus-visible{box-shadow:inset 0 0 0 2px rgba(0,0,0,.35),0 0 0 3px #fff,0 0 0 6px var(--eg-a)}
.eg-wheel.up .cu,.eg-wheel.up .pv,.eg-wheel.up .nx{animation:egRollUp .16s ease-out}
.eg-wheel.dn .cu,.eg-wheel.dn .pv,.eg-wheel.dn .nx{animation:egRollDn .16s ease-out}
.eg-wheels::after{content:"";position:absolute}
.eg-mech.open .eg-shackle{animation:egShackle .45s ease-out both}
.eg-mech.open .eg-padlock{animation:egDrop2 .9s .5s cubic-bezier(.5,0,.8,.4) both}
.eg-mech.open .eg-chain.a{animation:egSlideA .8s .9s ease-in both}
.eg-mech.open .eg-chain.b{animation:egSlideB .8s .9s ease-in both}
.eg-mech.open .eg-chained{animation:egCabOpen .6s 1.5s ease-out both}
.eg-mech.bad .eg-padlock,.eg-mech.bad .eg-vault,.eg-mech.bad .eg-keypad{animation:egShake .45s}
/* vault */
.eg-vault{position:relative;width:min(100%,330px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#EEF1F5,#A9B2BE 45%,#5F6976 80%,#3A424C);box-shadow:0 0 0 10px #4A535E,0 0 0 14px #2A3038,0 22px 36px rgba(0,0,0,.6),inset 0 0 0 3px rgba(255,255,255,.35);transform-origin:left center;transform-style:preserve-3d}
.eg-vault .eg-bolts i{position:absolute;width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff,#6E7884);box-shadow:0 1px 2px rgba(0,0,0,.5)}
.eg-spokes{position:absolute;inset:8%;border-radius:50%}
.eg-spokes i{position:absolute;left:50%;top:0;bottom:0;width:7%;margin-left:-3.5%;border-radius:12px;background:linear-gradient(90deg,#8A6410,#F2D27A 40%,#A87A10);box-shadow:0 2px 4px rgba(0,0,0,.5)}
.eg-spokes i::before,.eg-spokes i::after{content:"";position:absolute;left:50%;width:180%;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle at 35% 35%,#FFF1B8,#A87A10)}
.eg-spokes i::before{top:-4%}.eg-spokes i::after{bottom:-4%}
.eg-dialwrap{position:absolute;inset:24%;border-radius:50%}
.eg-dial{position:absolute;inset:0;border-radius:50%;cursor:grab;touch-action:none;outline:none;transition:transform .12s ease-out;background:radial-gradient(circle,#2A2F36 0 30%,#15181D 31% 60%,#0E1014 61%);box-shadow:0 0 0 5px #C9A24A,0 6px 12px rgba(0,0,0,.6),inset 0 0 12px rgba(0,0,0,.8)}
.eg-dial:active{cursor:grabbing}
.eg-dial:focus-visible{box-shadow:0 0 0 5px #C9A24A,0 0 0 9px #fff,0 0 0 12px var(--eg-a)}
.eg-dial svg{position:absolute;inset:0;width:100%;height:100%}
.eg-dial .eg-knurl{position:absolute;inset:34%;border-radius:50%;background:repeating-conic-gradient(#D9B85A 0 6deg,#7A5A10 6deg 12deg);box-shadow:inset 0 0 0 4px #F2D27A,0 2px 6px rgba(0,0,0,.6)}
.eg-ind{position:absolute;left:50%;top:calc(24% - 18px);width:0;height:0;margin-left:-9px;border-left:9px solid transparent;border-right:9px solid transparent;border-top:16px solid #FF3B3B;filter:drop-shadow(0 2px 2px rgba(0,0,0,.6));z-index:3}
.eg-vread{position:absolute;left:50%;top:6%;transform:translateX(-50%);background:#0A0F1E;color:#FFE38A;font:900 1.1rem var(--f-display);min-width:42px;padding:2px 8px;border-radius:8px;text-align:center;box-shadow:inset 0 2px 4px rgba(0,0,0,.8),0 0 0 2px #C9A24A;z-index:3}
.eg-tumblers{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.eg-tumblers span{width:42px;height:50px;border-radius:10px;display:grid;place-items:center;background:rgba(0,0,0,.45);border:2px solid rgba(255,255,255,.18);color:#FFE38A;font:900 1.2rem var(--f-display);position:relative}
.eg-tumblers span small{position:absolute;top:-9px;font-size:.62rem;background:#1A2246;border-radius:6px;padding:0 4px;color:#C9D2F0;font-weight:800}
.eg-tumblers span.set{border-color:var(--eg-a);box-shadow:0 0 10px var(--eg-glow)}
.eg-tumblers span.cur{border-style:dashed;border-color:#fff}
.eg-mech.open .eg-spokes{animation:egSpin 1s ease-in-out both}
.eg-mech.open .eg-dial{animation:egSpin .8s ease-in-out reverse both}
.eg-mech.open .eg-vault{animation:egVaultOpen 1.4s .9s cubic-bezier(.3,.1,.3,1) both}
.eg-vaultbay{position:relative;perspective:900px;overflow:hidden;display:grid;place-items:center;padding:16px;border-radius:24px;width:min(100%,380px)}
.eg-vaultbay::before{content:"";position:absolute;inset:16px;margin:auto;width:min(100% - 32px,330px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#FFF6C8,#E7B21E 50%,#5A3A08);box-shadow:inset 0 0 40px rgba(0,0,0,.6)}
.eg-vaultbay.hole::before{display:none}
.eg-vhole{position:absolute;inset:0;margin:auto;width:min(100% - 32px,330px);aspect-ratio:1;border-radius:50%;overflow:hidden;box-shadow:inset 0 0 0 10px #2A3038,inset 0 0 40px rgba(0,0,0,.7)}
.eg-vhole svg{border-radius:50%}
.eg-reveal{position:absolute;left:50%;top:50%;width:110px;height:110px;margin:-55px 0 0 -55px;opacity:0;z-index:1;filter:drop-shadow(0 8px 14px rgba(0,0,0,.6))}
.eg-reveal svg{width:100%;height:100%}
.eg-mech.open .eg-reveal{animation:egItem .9s 1.6s cubic-bezier(.2,1.6,.4,1) both}
.eg-vaultbay .eg-reveal{z-index:0}
/* keypad */
.eg-keypad{position:relative;width:min(100%,260px);padding:16px;border-radius:18px;background:linear-gradient(160deg,#58616F,#2A2F36);box-shadow:inset 0 2px 0 rgba(255,255,255,.25),inset 0 -4px 0 rgba(0,0,0,.35),0 16px 26px rgba(0,0,0,.6);display:grid;gap:12px}
.eg-keypad .eg-screws i{position:absolute;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#E9EDF2,#6E7884)}
.eg-kp-top{display:flex;gap:10px;align-items:center}
.eg-led{width:16px;height:16px;flex:none;border-radius:50%;background:radial-gradient(circle at 35% 35%,#FF9A9A,#B0101A);box-shadow:0 0 10px rgba(255,60,60,.8)}
.eg-mech.open .eg-led{background:radial-gradient(circle at 35% 35%,#B8FFD6,#0E9A4A);box-shadow:0 0 14px rgba(60,255,140,.9)}
.eg-mech.bad .eg-led{animation:egLed .15s 4 alternate}
.eg-lcd{flex:1;height:44px;border-radius:8px;background:linear-gradient(180deg,#9BC59A,#7FAE7D);box-shadow:inset 0 3px 8px rgba(0,0,0,.45);font:800 1.35rem "Courier New",monospace;color:#13281A;letter-spacing:.18em;display:flex;align-items:center;justify-content:center;overflow:hidden;white-space:nowrap}
.eg-mech.bad .eg-lcd{background:linear-gradient(180deg,#E9A4A4,#C77);color:#4A0A0A}
.eg-mech.open .eg-lcd{background:linear-gradient(180deg,#B8FFD6,#7FE0A8)}
.eg-keys{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
.eg-key{height:50px;border-radius:12px;border:0;cursor:pointer;font:900 1.25rem var(--f-display);color:#1A1E26;background:linear-gradient(180deg,#F4F6F9,#C3CAD4);box-shadow:0 4px 0 #6E7884,0 6px 10px rgba(0,0,0,.4);padding:0}
.eg-key:active,.eg-key.hit{transform:translateY(3px);box-shadow:0 1px 0 #6E7884}
.eg-key:focus-visible{outline:3px solid var(--eg-a);outline-offset:2px}
.eg-key.fn{font-size:.85rem;background:linear-gradient(180deg,#FFE7A0,#E7B21E)}
.eg-keys .eg-key.ent:nth-child(3n+1){grid-column:span 3}.eg-keys .eg-key.ent:nth-child(3n+2){grid-column:span 2}
.eg-key.ent{font-size:.85rem;background:linear-gradient(180deg,#8CF7B8,#2BB866);color:#05301A}
.eg-bolt{position:absolute;right:-46px;top:50%;width:60px;height:18px;margin-top:-9px;border-radius:4px;background:linear-gradient(180deg,#E9EDF2,#6E7884);box-shadow:0 2px 4px rgba(0,0,0,.6);z-index:-1}
.eg-mech.open .eg-bolt{animation:egBolt .5s .2s ease-in both}
/* found item */
.eg-found{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;padding:14px;border-radius:16px;background:radial-gradient(circle at 10% 50%,rgba(255,226,120,.25),transparent 50%),rgba(0,0,0,.35);border:2px solid var(--eg-a);box-shadow:0 0 26px var(--eg-glow)}
.eg-found .eg-item{position:relative;width:86px;height:96px;animation:egItem .9s cubic-bezier(.2,1.6,.4,1) .3s both}
.eg-found .eg-item svg{width:86px;height:86px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.5))}
.eg-found .eg-item .eg-dg{position:absolute;right:0;bottom:0;width:36px;height:36px;border-radius:10px;background:#0A1433;color:#FFE38A;display:grid;place-items:center;font:900 1.4rem var(--f-display);border:2px solid var(--eg-a)}
.eg-found .fb{margin:0}
.eg-found>div:last-child{min-width:0}
@media (max-width:520px){.eg-found{grid-template-columns:1fr;justify-items:center;text-align:center}}
/* final door */
.eg-final{display:grid;gap:14px}
.eg-clue{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;border-radius:12px;color:#2B1B0C;background:linear-gradient(180deg,#F5E7C4,#E6D0A0);font-family:Georgia,serif;box-shadow:0 8px 16px rgba(0,0,0,.4);transform:rotate(-.4deg)}
.eg-r-signal .eg-clue{background:linear-gradient(180deg,#FFFDF2,#EDE8D2)}
.eg-doorway{position:relative;width:min(100%,560px);margin:0 auto;border-radius:16px 16px 6px 6px;padding:18px 18px 0;background:linear-gradient(180deg,#6B6152,#4A4236);box-shadow:inset 0 0 0 6px rgba(0,0,0,.25),0 20px 40px rgba(0,0,0,.6);perspective:1100px;overflow:hidden}
.eg-r-creole .eg-doorway{background:linear-gradient(180deg,#36C2B2,#1F8C86)}
.eg-r-signal .eg-doorway{background:linear-gradient(180deg,#2A3550,#151F3A)}
.eg-beyond{position:absolute;inset:18px 18px 0;border-radius:10px 10px 0 0;overflow:hidden;background:linear-gradient(180deg,#FFE9A8 0%,#FFC46B 40%,#F28E4A 70%,#7A3B22 100%)}
.eg-r-creole .eg-beyond{background:linear-gradient(180deg,#BFF3FF,#7FD3E6 45%,#F7C948 75%,#C8312E)}
.eg-r-signal .eg-beyond{background:linear-gradient(180deg,#FFD9A8,#F7A86B 35%,#6FA6C9 60%,#1E3A5A)}
.eg-beyond::before{content:"";position:absolute;inset:-40%;background:repeating-conic-gradient(from 0deg at 50% 60%,rgba(255,255,255,.35) 0 6deg,transparent 6deg 18deg);opacity:0}
.eg-leaf{position:relative;transform-origin:left center;transform-style:preserve-3d;min-height:420px;display:grid;place-items:center;padding:24px 10px;border-radius:10px 10px 0 0;background:linear-gradient(90deg,#3A3F47,#20242B);box-shadow:inset 0 0 0 6px #15181d,inset 0 0 50px rgba(0,0,0,.6)}
.eg-leaf.iron{background:radial-gradient(circle,#6B7380 0 3px,transparent 3.5px) 0 0/56px 56px,linear-gradient(90deg,#3A3F47,#20242B)}
.eg-leaf.steel{background:linear-gradient(180deg,transparent 0 30%,rgba(0,0,0,.25) 30% 31%,transparent 31% 70%,rgba(0,0,0,.25) 70% 71%,transparent 71%),linear-gradient(90deg,#8C96A6,#5A6474)}
.eg-leaf .eg-chained{animation:none!important;background:none;box-shadow:none;width:100%;padding:70px 0 40px;overflow:visible}
.eg-leaf.wall{background:repeating-linear-gradient(90deg,transparent 0 30px,rgba(0,0,0,.1) 30px 32px),linear-gradient(180deg,#36C2B2,#1F8C86);box-shadow:none}
.eg-leaf.steel{padding-top:118px;align-items:end}
.eg-leaf .eg-porthole{position:absolute;top:30px;left:50%;width:70px;height:70px;margin-left:-35px;border-radius:50%;background:radial-gradient(circle,#2A4A6A,#0A1A2E);box-shadow:0 0 0 7px #D0D6E0,inset 0 0 10px #000}
.eg-leaf .eg-handle{position:absolute;right:20px;top:50%;width:16px;height:70px;margin-top:-35px;border-radius:8px;background:linear-gradient(90deg,#E9EDF2,#6E7884)}
.eg-doorway.opening .eg-leaf{animation:egSwing 1.6s 1.8s cubic-bezier(.35,.05,.25,1) both}
.eg-doorway.opening.vault .eg-leaf{animation:none}
.eg-doorway.opening .eg-beyond::before{animation:egRays 2.4s 2.4s ease-out both}
.eg-doorway.opening::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(60% 70% at 50% 60%,rgba(255,240,190,.85),transparent 70%);animation:egFlood 1.6s 2.6s ease-out both}
.eg-kpside{position:absolute;right:0;top:0;bottom:0;width:0}
.eg-finale{animation:egFadeUp .7s 3.2s ease-out both}
.eg-final .eg-escaped{color:#FFE38A}
/* intro */
.eg-intro .eg-scene{max-height:300px;aspect-ratio:auto;height:clamp(180px,40vw,300px)}
.eg-intro .eg-scene .eg-svg{filter:brightness(.6)}
/* ambient scene animation */
.eg-spin{animation:egSpin 2.4s linear infinite}
.eg-blink{animation:egBlink 1.4s ease-in-out infinite}
.eg-needle{animation:egNeedle 1.1s ease-in-out infinite alternate;transform-box:view-box}
.eg-sweep{animation:egSpin 3s linear infinite;transform-box:view-box}
.eg-beam{transform-origin:150px 71px;animation:egBeam 5s ease-in-out infinite alternate}
.eg-flash{opacity:0;animation:egFlash 7s 2s infinite}
.eg-rain{animation:egRain .6s linear infinite}
.eg-onair{animation:egBlink 2s ease-in-out infinite}
@keyframes egPulse{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:1;transform:scale(1.03)}}
@keyframes egNudge{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
@keyframes egPop{0%{transform:scale(.2) rotate(-20deg);opacity:0}100%{transform:none;opacity:1}}
@keyframes egZoom{from{transform:scale(.96);opacity:0}to{transform:none;opacity:1}}
@keyframes egRollUp{from{transform:translateY(40%)}to{transform:none}}
@keyframes egRollDn{from{transform:translateY(-40%)}to{transform:none}}
@keyframes egShackle{0%{transform:none}60%{transform:translateY(-26px)}100%{transform:translateY(-22px) rotate(-8deg)}}
@keyframes egDrop2{0%{transform:none}25%{transform:rotate(-12deg)}100%{transform:translateY(420px) rotate(38deg);opacity:0}}
@keyframes egSlideA{to{transform:rotate(14deg) translateX(-120%);opacity:0}}
@keyframes egSlideB{to{transform:rotate(-14deg) translateX(120%);opacity:0}}
@keyframes egCabOpen{to{background:radial-gradient(circle at 50% 55%,#FFE9A8,#C98A3A 35%,#3E1C10 75%)}}
@keyframes egShake{0%,100%{transform:none}20%{transform:translateX(-10px) rotate(-2deg)}40%{transform:translateX(9px) rotate(2deg)}60%{transform:translateX(-6px)}80%{transform:translateX(4px)}}
@keyframes egSpin{to{transform:rotate(360deg)}}
@keyframes egVaultOpen{0%{transform:none}100%{transform:perspective(900px) rotateY(-78deg)}}
@keyframes egLed{from{opacity:1}to{opacity:.25}}
@keyframes egBolt{to{transform:translateX(-46px)}}
@keyframes egItem{0%{transform:translateY(30px) scale(.3) rotate(-30deg);opacity:0}100%{transform:none;opacity:1}}
@keyframes egDrop{from{transform:translateY(-10px);opacity:.3}to{transform:none;opacity:1}}
@keyframes egSwing{0%{transform:none}12%{transform:rotateY(-4deg)}100%{transform:rotateY(-82deg)}}
@keyframes egRays{from{opacity:0;transform:rotate(0)}to{opacity:1;transform:rotate(25deg)}}
@keyframes egFlood{from{opacity:0}to{opacity:1}}
@keyframes egFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes egBlink{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes egNeedle{from{transform:rotate(-28deg)}to{transform:rotate(22deg)}}
@keyframes egBeam{from{transform:rotate(-14deg)}to{transform:rotate(16deg)}}
@keyframes egFlash{0%,90%,100%{opacity:0}92%,96%{opacity:1}94%{opacity:.2}}
@keyframes egRain{from{transform:translate(0,-18px)}to{transform:translate(-4px,0)}}
@media (max-width:600px){
  .eg-hot.locked .eg-badge{display:none}
  .eg-hot .eg-badge{width:20px;height:20px;font-size:.7rem;right:-4px;top:-4px}
  .eg-inv{gap:6px;padding:8px}.eg-inv .eg-invl{width:100%;margin:0 0 2px}
  .eg-status .btn{width:100%}
  .eg-hot .eg-tag{font-size:.68rem;padding:2px 7px}
  .eg-prop{padding:16px 14px}
  .eg-slot{width:40px;height:50px;border-radius:10px}.eg-slot svg{width:28px;height:28px;top:3px}.eg-slot .eg-dg{min-width:19px;height:19px;font-size:.8rem;bottom:2px;right:2px}
  .eg-leaf{min-height:360px}
  .eg-wheel{width:34px}.eg-whb{width:34px}
  .eg-wheels{gap:4px;padding:6px}
}
@media (prefers-reduced-motion:reduce){
  .eg-room *,.eg-room *::before,.eg-room *::after{animation-duration:.01ms!important;animation-delay:0s!important;animation-iteration-count:1!important;transition:none!important}
  .eg-spin,.eg-blink,.eg-needle,.eg-sweep,.eg-beam,.eg-rain,.eg-onair,.eg-hot.live::before,.eg-status .eg-arrow{animation:none!important}
  .eg-flash{display:none}
}`;
  try { const st = document.createElement('style'); st.id = 'escapegfx-css'; st.textContent = CSS; document.head.appendChild(st); } catch (e) { }

  window.ESCAPE_GFX = {
    scene, spots: id => SPOTS[id] || {}, beyond: id => BEYOND[id] ? `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%">${BEYOND[id]()}</svg>` : '', item: kind => ITEMS[kind] || ITEMS.tag, roomItem: id => ROOMITEM[id] || 'tag',
    // dial face for the vault: chars around the ring, ticks between
    dialFace(chars) {
      const n = chars.length, step = 360 / n; let s = '<svg viewBox="-100 -100 200 200" aria-hidden="true">';
      for (let i = 0; i < n * 5; i++) { const a = (i * step / 5 - 90) * Math.PI / 180, big = i % 5 === 0, r1 = big ? 78 : 84; s += `<line x1="${f2(Math.cos(a) * r1)}" y1="${f2(Math.sin(a) * r1)}" x2="${f2(Math.cos(a) * 92)}" y2="${f2(Math.sin(a) * 92)}" stroke="${big ? '#F4F1E4' : '#9AA3AE'}" stroke-width="${big ? 2.6 : 1.2}"/>`; }
      chars.forEach((c, i) => { const a = (i * step - 90) * Math.PI / 180; s += `<text x="${f2(Math.cos(a) * 64)}" y="${f2(Math.sin(a) * 64 + 6)}" text-anchor="middle" font-size="${n > 12 ? 13 : 18}" font-weight="800" fill="#FFE38A" font-family="Arial,sans-serif" transform="rotate(${f2(i * step)} ${f2(Math.cos(a) * 64)} ${f2(Math.sin(a) * 64)})">${c}</text>`; });
      return s + '</svg>';
    }
  };
})();
