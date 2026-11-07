/* Exam dates and the Study Planner: a timetable built from the student's own answers,
   editable, with slots that can be locked and the rest regenerated. Kester Small */
(function () {
  'use strict';
  const E = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const $ = s => document.querySelector(s);
  const X = window.COURSE_EXAMS || { subject: '', level: '', papers: [], notes: [] };

  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const BLOCKS = [['early', 'Early morning', '06:00'], ['morning', 'Morning', '09:00'], ['afternoon', 'Afternoon', '15:00'], ['evening', 'Evening', '18:00'], ['night', 'Late evening', '20:00']];
  const LENGTHS = [30, 45, 60, 90];

  const d2 = n => (n < 10 ? '0' : '') + n;
  const iso = d => d.getFullYear() + '-' + d2(d.getMonth() + 1) + '-' + d2(d.getDate());
  const fromIso = s => { const p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12, 0, 0); };
  const today = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0); };
  const addDays = (d, n) => { const x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; };
  const pretty = d => DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()];
  const daysBetween = (a, b) => Math.round((b.getTime() - a.getTime()) / 86400000);

  function P(api) {
    const S = api.S;
    if (!S.plan || typeof S.plan !== 'object') S.plan = {};
    const p = S.plan;
    if (!p.q || typeof p.q !== 'object') p.q = {};
    if (!Array.isArray(p.slots)) p.slots = [];
    if (!Array.isArray(p.asg)) p.asg = [];
    return p;
  }

  /* ---------- the course's own sections ---------- */
  function sections() {
    const out = [];
    try {
      (window.COURSE_MODULES || []).forEach(m => {
        (m.units || []).forEach((u, i) => out.push({ id: m.id + ':' + i, m: m.title || m.code || '', t: u.title || ('Unit ' + (i + 1)) }));
      });
    } catch (e) { }
    return out;
  }

  const CAT = window.COURSE_EXAM_CATALOG || null;
  const baseName = v => String(v || '').replace(/\s*\(Unit \d\)\s*$/, '').trim();
  /* the Teacher's Version talks about "the student"; the Student's Version talks to the student */
  const teach = () => !!window.COURSE_TEACHER_EDITION;

  /* shared planner bridge */
  const EPD = window.EXAM_PLANNER_DATA || null;
  const epNorm = v => String(v || '').toLowerCase().replace(/[()&,:]/g, ' ').replace(/\band\b/g, ' ').replace(/\s+/g, ' ').trim();
  function epCourseId() {
    if (!EPD) return '';
    const want = epNorm(X.subject), lv = String(X.level || '').toUpperCase();
    const lists = lv && EPD[lv] ? [[lv, EPD[lv]]] : [['CAPE', EPD.CAPE || []], ['CSEC', EPD.CSEC || []]];
    for (const [L, arr] of lists) { const hit = arr.find(x => epNorm(x.s) === want); if (hit) return L + '|' + hit.s; }
    return '';
  }
  const epIds = api => { const s = api && api.S && api.S.examPlanner; return s && Array.isArray(s.subs) ? s.subs : []; };
  const epNames = api => { const own = epCourseId(); return epIds(api).filter(id => id !== own).map(id => id.split('|').slice(1).join('|')); };
  function epPapers(api) {
    const out = [], own = epCourseId(), st = (api && api.S && api.S.examPlanner) || {};
    epIds(api).forEach(id => {
      if (id === own) return;
      const L = id.split('|')[0], nm = id.split('|').slice(1).join('|');
      const row = ((EPD && EPD[L]) || []).find(x => x.s === nm);
      (row ? row.p : []).forEach(q => { if (q.d && q.st) out.push({ subject: nm, name: q.n, date: q.d, session: q.se, start: q.st, length: q.l, online: q.o }); });
    });
    (st.own || []).forEach(q => { if (q && q.d && q.id !== own && epIds(api).indexOf(q.id) >= 0) out.push({ subject: q.id.split('|').slice(1).join('|'), name: q.n, date: q.d, session: q.se, start: q.st, length: q.l }); });
    return out;
  }
  function epMount(api) {
    const el = document.getElementById('ep-mount');
    if (!el || el.dataset.on || !window.ExamPlanner) return;
    el.dataset.on = '1';
    window.ExamPlanner.mount(el, {
      course: epCourseId(), edition: teach() ? 'teacher' : 'student',
      store: { load: () => api.S.examPlanner, save: s => { api.S.examPlanner = s; api.save(); } }
    });
  }
  const fmtD = di => { const d = fromIso(di); return DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()].slice(0, 3); };

  /* this course's own papers, plus the papers of any subject the teacher has ticked */
  function papersFor(api) {
    const own = (X.papers || []).map(x => Object.assign({ subject: X.subject }, x));
    if (EPD) { const sn = {}; return own.concat(epPapers(api)).filter(x => { const k = x.subject + '|' + x.name + '|' + x.date; if (sn[k]) return false; sn[k] = 1; return true; }); }
    if (!CAT) return own;
    const chosen = (P(api).subs || []);
    const extra = [];
    chosen.forEach(name => {
      const row = (CAT.subjects || []).find(x => x.s === name);
      if (!row) return;
      (row.p || []).forEach(q => {
        if (!q.d) return;
        extra.push({
          subject: row.s, name: q.n, date: q.d, session: q.se, start: q.st,
          length: q.l, online: q.o, span: q.sp
        });
      });
    });
    const seen = {};
    return own.concat(extra).filter(x => {
      const k = x.subject + '|' + x.name + '|' + x.date;
      if (seen[k]) return false;
      seen[k] = 1; return true;
    });
  }

  let LET = null;   /* which letter of the subject list is open */

  /* every paper the chosen subjects sit, earliest first */
  function ttRows(api, names) {
    const out = (X.papers || []).map(x => Object.assign({ subject: X.subject }, x));
    (names || []).forEach(name => {
      const row = ((CAT && CAT.subjects) || []).find(x => x.s === name);
      if (!row) return;
      (row.p || []).forEach(q => {
        if (!q.d) return;
        out.push({ subject: row.s, name: q.n, date: q.d, session: q.se, start: q.st, length: q.l, online: q.o });
      });
    });
    const seen = {};
    return out.filter(x => {
      if (!x.date) return false;
      const k = x.subject + '|' + x.name + '|' + x.date;
      if (seen[k]) return false;
      seen[k] = 1; return true;
    }).sort((a, b) => (a.date + (a.start || '')) < (b.date + (b.start || '')) ? -1 : 1);
  }

  /* ---------- downloads: a real PDF, a calendar file and a spreadsheet, all built here ---------- */
  function dlFile(name, blob) {
    try {
      const u = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = u; a.download = name; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(u), 8000);
      return true;
    } catch (e) { return false; }
  }

  const ASCII = s => String(s == null ? '' : s)
    .replace(/[–—]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
    .replace(/·/g, '-').replace(/[^\x20-\x7e]/g, '').replace(/\s+/g, ' ').trim();
  const pdfEsc = s => ASCII(s).replace(/[\\()]/g, c => '\\' + c);
  const fitTo = (s, w, size) => {
    const max = Math.max(1, Math.floor(w / (size * 0.5)));
    const t = ASCII(s);
    return t.length > max ? t.slice(0, Math.max(1, max - 1)) + '.' : t;
  };

  /* a small PDF writer: a title page run of simple tables, Helvetica only */
  function pdfBlob(doc) {
    const land = !!doc.land, W = land ? 842 : 595, H = land ? 595 : 842, M = 36;
    const cols = doc.cols || [], rows = doc.rows || [];
    const rowH = 15, headTop = H - M, bodyTop = headTop - 74, bottom = M + 26;
    const perPage = Math.max(4, Math.floor((bodyTop - bottom) / rowH));
    const pages = [];
    for (let i = 0; i < Math.max(1, Math.ceil(rows.length / perPage)); i++) pages.push(rows.slice(i * perPage, (i + 1) * perPage));

    const streams = pages.map((pr, pi) => {
      let c = '';
      const txt = (x, y, s, size, bold) => { c += `BT /${bold ? 'F2' : 'F1'} ${size} Tf ${x} ${y} Td (${pdfEsc(s)}) Tj ET\n`; };
      const line = (x1, y1, x2, y2, w) => { c += `${w || 0.6} w ${x1} ${y1} m ${x2} ${y2} l S\n`; };
      if (pi === 0) {
        txt(M, headTop - 16, doc.title || '', 17, true);
        if (doc.sub) txt(M, headTop - 34, doc.sub, 10, false);
        if (doc.note) txt(M, headTop - 48, doc.note, 8.5, false);
      } else {
        txt(M, headTop - 16, (doc.title || '') + ' (continued)', 13, true);
      }
      let y = bodyTop + 14, x = M;
      cols.forEach(col => { txt(x + 2, y, col.h, 8.5, true); x += col.w; });
      line(M, y - 4, W - M, y - 4, 1);
      y -= rowH;
      pr.forEach(r => {
        let cx = M;
        cols.forEach((col, k) => { txt(cx + 2, y, fitTo(r[k], col.w - 4, 9), 9, false); cx += col.w; });
        line(M, y - 4, W - M, y - 4, 0.25);
        y -= rowH;
      });
      txt(M, M, (doc.foot || '') + '   Page ' + (pi + 1) + ' of ' + pages.length, 8, false);
      return c;
    });

    const objs = [];
    const kids = pages.map((p, i) => (4 + i * 2) + ' 0 R').join(' ');
    objs.push('<< /Type /Catalog /Pages 2 0 R >>');
    objs.push(`<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`);
    objs.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    streams.forEach(st => {
      objs.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 ${3 + pages.length * 2 + 1} 0 R >> >> /Contents ${objs.length + 2} 0 R >>`);
      objs.push(`<< /Length ${st.length} >>\nstream\n${st}endstream`);
    });
    objs.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');

    let out = '%PDF-1.4\n', offs = [];
    objs.forEach((o, i) => { offs.push(out.length); out += (i + 1) + ' 0 obj\n' + o + '\nendobj\n'; });
    const xref = out.length;
    out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
    offs.forEach(o => { out += ('0000000000' + o).slice(-10) + ' 00000 n \n'; });
    out += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return new Blob([out], { type: 'application/pdf' });
  }

  function csvBlob(head, rows) {
    const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const body = [head.map(q).join(',')].concat(rows.map(r => r.map(q).join(','))).join('\r\n');
    return new Blob(['﻿' + body], { type: 'text/csv;charset=utf-8' });
  }

  const mins = v => {
    const s = String(v || ''), h = /(\d+)\s*hr/.exec(s), m = /(\d+)\s*min/.exec(s);
    const n = (h ? +h[1] * 60 : 0) + (m ? +m[1] : 0);
    return n || 90;
  };
  function icsBlob(rows, title) {
    const st = s => String(s || '').replace(/[,;\\]/g, c => '\\' + c).replace(/\n/g, ' ');
    const pad = n => (n < 10 ? '0' : '') + n;
    const stamp = d => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
    let L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Exam timetable//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:' + st(title)];
    rows.forEach((r, i) => {
      const p = String(r.date).split('-'), hm = String(r.start || '09:00').split(':');
      const s = new Date(+p[0], +p[1] - 1, +p[2], +hm[0] || 9, +hm[1] || 0, 0);
      const e = new Date(s.getTime() + mins(r.length) * 60000);
      L = L.concat(['BEGIN:VEVENT', 'UID:exam-' + i + '-' + r.date + '@course', 'DTSTAMP:' + stamp(new Date()),
        'DTSTART:' + stamp(s), 'DTEND:' + stamp(e),
        'SUMMARY:' + st((r.subject || '') + ' - ' + (r.name || '')),
        'DESCRIPTION:' + st((r.session || '') + ' session, ' + (r.length || '') + (r.online ? ', online only' : '')),
        'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Exam tomorrow', 'END:VALARM', 'END:VEVENT']);
    });
    L.push('END:VCALENDAR');
    return new Blob([L.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  }

  const slug = s => ASCII(s).replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'timetable';

  /* ---------- the student's own exam timetable: list, week, month or year ---------- */
  let TTM = null;   /* {y,m} the month on show */
  let TTW = null;   /* the Monday of the week on show */

  const shortSub = v => String(v || '').replace(/\s*\(Unit (\d)\)\s*/, ' U$1').trim();

  function cdBadge(di) {
    const left = daysBetween(today(), fromIso(di));
    if (left > 0) return `<span class="pl-cd">${left}d</span>`;
    if (left === 0) return `<span class="pl-cd now">today</span>`;
    return '';
  }
  function exChip(r, cd) {
    const t = shortSub(r.subject) + ' — ' + (r.name || '') + (r.start ? ', ' + r.start : '') + (r.length ? ', ' + r.length : '');
    return `<span class="pl-ex" title="${E(t)}"><b>${E(shortSub(r.subject))}</b> ${E(r.name || '')}${r.start ? ' <i>' + E(r.start) + '</i>' : ''}${cd ? cdBadge(r.date) : ''}</span>`;
  }
  const dayCell = (d, byD, cd, t0) => {
    if (!d) return '<td class="pl-dc off"></td>';
    const di = iso(d), ex = byD[di] || [];
    return `<td class="pl-dc${di === t0 ? ' now' : ''}${ex.length ? ' hit' : ''}">
      <span class="dn">${d.getDate()}</span>${ex.map(r => exChip(r, cd)).join('')}</td>`;
  };

  function ttWeekHTML(byD, cd) {
    const mon = TTW, t0 = iso(today()), days = [];
    for (let i = 0; i < 7; i++) days.push(addDays(mon, i));
    const lab = pretty(days[0]) + ' – ' + pretty(days[6]) + ' ' + days[6].getFullYear();
    return `${navHTML(lab)}<div class="pl-cal pl-scroll" id="pl-cal" tabindex="0" aria-label="Exam week. Scrolls sideways and up and down."><table class="pl-grid pl-wk">
      <thead><tr>${days.map(d => `<th class="pl-h${iso(d) === t0 ? ' now' : ''}">${E(DAYS[d.getDay()])}<br><span class="dnum">${d.getDate()} ${E(MONTHS[d.getMonth()].slice(0, 3))}</span></th>`).join('')}</tr></thead>
      <tbody><tr>${days.map(d => dayCell(d, byD, cd, t0)).join('')}</tr></tbody></table></div>`;
  }

  function ttMonthHTML(byD, cd) {
    const y = TTM.y, m = TTM.m, t0 = iso(today());
    const first = new Date(y, m, 1, 12), pad = (first.getDay() + 6) % 7, n = new Date(y, m + 1, 0).getDate();
    const cells = [];
    for (let k = 0; k < pad; k++) cells.push(null);
    for (let d = 1; d <= n; d++) cells.push(new Date(y, m, d, 12));
    while (cells.length % 7) cells.push(null);
    let body = '';
    for (let k = 0; k < cells.length; k += 7) body += '<tr>' + cells.slice(k, k + 7).map(d => dayCell(d, byD, cd, t0)).join('') + '</tr>';
    return `${navHTML(MONTHS[m] + ' ' + y)}<div class="pl-cal pl-scroll" id="pl-cal" tabindex="0" aria-label="Exam month. Scrolls sideways and up and down."><table class="pl-grid pl-mth">
      <thead><tr>${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => `<th class="pl-h">${d}</th>`).join('')}</tr></thead>
      <tbody>${body}</tbody></table></div>`;
  }

  function ttYearHTML(byD, cd) {
    const y = TTM.y, t0 = iso(today());
    const minis = MONTHS.map((nm, m) => {
      const first = new Date(y, m, 1, 12), pad = (first.getDay() + 6) % 7, n = new Date(y, m + 1, 0).getDate();
      let cnt = 0, cells = '';
      for (let k = 0; k < pad; k++) cells += '<td></td>';
      for (let d = 1; d <= n; d++) {
        const di = iso(new Date(y, m, d, 12)), ex = byD[di] || [];
        if (ex.length) cnt += ex.length;
        const tip = ex.map(r => shortSub(r.subject) + ' ' + (r.name || '')).join(', ');
        cells += `<td class="${ex.length ? 'hit' : ''}${di === t0 ? ' now' : ''}"${tip ? ` title="${E(tip)}"` : ''}>${d}</td>`;
        if ((pad + d) % 7 === 0) cells += '</tr><tr>';
      }
      return `<div class="pl-mini${cnt ? ' has' : ''}">
        <button type="button" class="pl-minih" data-px="ttmon" data-v="${y}-${m}">${E(nm.slice(0, 3))}${cnt ? ` <span class="pl-dot">${cnt}</span>` : ''}</button>
        <table><tbody><tr>${cells}</tr></tbody></table></div>`;
    }).join('');
    return `${navHTML(String(y))}<div class="pl-year">${minis}</div>
      <p class="hint">Tap a month to open it. ${cd ? 'Days to go show in the week and month views.' : ''}</p>`;
  }

  function navHTML(lab) {
    return `<div class="row pl-nav"><button type="button" class="chip" data-px="ttnav" data-v="-1" aria-label="Back">‹</button>
      <b class="pl-navl">${E(lab)}</b>
      <button type="button" class="chip" data-px="ttnav" data-v="1" aria-label="Forward">›</button>
      <button type="button" class="chip" data-px="ttnav" data-v="0">Today</button></div>`;
  }

  function ttListHTML(rows, cd) {
    const t0 = today();
    const body = rows.map(x => {
      const d = fromIso(x.date), left = daysBetween(t0, d);
      const when = left > 0 ? left + ' day' + (left === 1 ? '' : 's') + ' to go' : (left === 0 ? 'Today' : 'Past');
      return `<tr${left < 0 ? ' class="pl-past"' : ''}><td><b>${E(pretty(d))}</b><br><span class="hint">${d.getFullYear()}</span></td>
        <td>${E(x.subject || '')}</td><td>${E(x.name || '')}${x.online ? ' <span class="pill">online only</span>' : ''}</td>
        <td>${E(x.session || '')}</td><td>${E(x.start || '')}</td><td>${E(x.length || '')}</td>
        ${cd ? `<td>${left >= 0 ? `<b>${E(when)}</b>` : `<span class="hint">${E(when)}</span>`}</td>` : ''}</tr>`;
    }).join('');
    return `<div class="pl-cal pl-scroll" id="pl-cal" tabindex="0" aria-label="Exam list. Scrolls sideways and up and down."><table class="tbl" style="min-width:760px"><thead><tr><th>Date</th><th>Subject</th><th>Paper</th><th>Session</th><th>Starts</th><th>Time allowed</th>${cd ? '<th>Days to go</th>' : ''}</tr></thead><tbody>${body}</tbody></table></div>`;
  }

  /* the student's own exam timetable, drawn from the official one */
  function myTTHTML(api) {
    const p = P(api), tt = p.tt;
    if (!tt) return '';
    const lock = !!tt.lock, t0 = today();
    const rows = ttRows(api, tt.subs || []);
    const cd = tt.cd === 0 ? 0 : 1;
    const view = ['list', 'week', 'month', 'year'].indexOf(tt.view) >= 0 ? tt.view : 'month';
    const byD = {};
    rows.forEach(r => (byD[r.date] = byD[r.date] || []).push(r));
    const anchor = rows.length ? fromIso(rows[0].date) : t0;
    if (!TTM) TTM = { y: anchor.getFullYear(), m: anchor.getMonth() };
    if (!TTW) TTW = mondayOf(anchor);

    const vb = (k, n) => `<button type="button" class="chip ${view === k ? 'sel' : ''}" data-px="ttview" data-v="${k}" aria-pressed="${view === k}">${n}</button>`;
    const grid = view === 'list' ? ttListHTML(rows, cd)
      : view === 'week' ? ttWeekHTML(byD, cd)
        : view === 'month' ? ttMonthHTML(byD, cd) : ttYearHTML(byD, cd);

    return `<div class="card pl-mytt${lock ? ' locked' : ''}" id="pl-mytt">
      <h2>✅ ${teach() ? 'The personal exam timetable' : 'Your exam timetable'}${lock ? ' <span class="pill">🔒 locked</span>' : ''}</h2>
      <p>Every paper these ${(tt.subs || []).length + 1} subjects sit in May–June 2027, laid out as a calendar.</p>
      <p class="hint">Generated ${E(pretty(fromIso(tt.at || iso(t0))))}. ${lock ? 'Locked, so the subject list cannot be changed by accident.' : 'Not locked yet — lock it once the subjects are right.'} Always check it against the copy the school hands out.</p>
      <div class="chips" role="tablist" aria-label="How to show the timetable">${vb('list', '📋 List')}${vb('week', '📆 Week')}${vb('month', '🗓️ Month')}${vb('year', '📅 Year')}
        <button type="button" class="chip ${cd ? 'sel' : ''}" data-px="ttcd" aria-pressed="${!!cd}">⏳ Days to go ${cd ? 'on' : 'off'}</button></div>
      ${rows.length ? grid + (view === 'year' ? '' : '<p class="hint pl-scrollhint">Scroll sideways and up or down to see all of it: swipe, use the scroll bars, or drag it with the mouse.</p>') : '<p class="hint">No dated papers for these subjects.</p>'}
      <div class="row" style="margin-top:10px">
        <button type="button" class="btn ${lock ? 'ghost' : 'gold'}" data-px="ttlock">${lock ? '🔓 Unlock it' : '🔒 Lock it in place'}</button>
        ${lock ? '' : `<button type="button" class="btn ghost" data-px="ttgen">♻️ Generate it again</button>`}
        <button type="button" class="btn ghost" data-px="ttdl" data-v="pdf">⬇️ Download as PDF</button>
        <button type="button" class="btn ghost" data-px="ttdl" data-v="ics">📅 Add to a calendar</button>
        <button type="button" class="btn ghost" data-px="ttdl" data-v="csv">📈 Spreadsheet</button>
        <button type="button" class="btn ghost" data-px="ttprint">🖨️ Print it</button>
        <button type="button" class="btn ghost" data-go="examplan" data-tab="setup">🗓️ Build a study plan around it</button>
      </div></div>`;
  }

  function subjectsHTML(api) {
    if (!CAT) return '';
    const p = P(api), chosen = p.subs || [], lock = !!(p.tt && p.tt.lock);
    const groups = {};
    (CAT.subjects || []).forEach(x => {
      const b = baseName(x.s);
      (groups[b] = groups[b] || []).push(x);
    });
    const names = Object.keys(groups).sort();
    const letters = {};
    names.forEach(b => {
      const c = (b[0] || '#').toUpperCase();
      (letters[/[A-Z]/.test(c) ? c : '#'] = letters[/[A-Z]/.test(c) ? c : '#'] || []).push(b);
    });
    const picksIn = L => letters[L].reduce((a, b) => a + groups[b].filter(x => chosen.indexOf(x.s) >= 0).length, 0);

    const rowFor = b => {
      const opts = groups[b].map(x => {
        const unit = /\(Unit (\d)\)/.exec(x.s);
        const label = unit ? 'Unit ' + unit[1] : 'Whole subject';
        const on = chosen.indexOf(x.s) >= 0;
        if (lock) return `<span class="chip ${on ? 'sel' : ''}" aria-disabled="true">${on ? '✓ ' : ''}${E(label)}</span>`;
        return `<button type="button" class="chip ${on ? 'sel' : ''}" data-px="sub" data-v="${E(x.s)}" aria-pressed="${on}">${on ? '✓ ' : ''}${E(label)}</button>`;
      }).join('');
      const picked = groups[b].filter(x => chosen.indexOf(x.s) >= 0).length;
      return `<tr><td><b>${E(b)}</b>${picked ? ` <span class="pill">${picked}</span>` : ''}</td><td><div class="chips">${opts}</div></td></tr>`;
    };

    const keys = Object.keys(letters).sort();
    const open = LET && letters[LET] ? LET : null;
    const strip = keys.map(L => {
      const n = picksIn(L);
      return `<button type="button" class="pl-letb${open === L ? ' on' : ''}${n ? ' has' : ''}" data-px="let" data-v="${E(L)}"
        aria-pressed="${open === L}" title="${letters[L].length} subject${letters[L].length === 1 ? '' : 's'}${n ? ', ' + n + ' chosen' : ''}">${E(L)}${n ? `<span class="pl-dot">${n}</span>` : ''}</button>`;
    }).join('');
    const secs = keys.map(L =>
      `<div class="pl-lsec" data-l="${E(L)}" data-on="${open === L ? '1' : '0'}"${open === L ? '' : ' style="display:none"'}>
        <h3 class="pl-lh">${E(L)} <span class="hint">· ${letters[L].length} subject${letters[L].length === 1 ? '' : 's'}</span></h3>
        <table class="tbl"><tbody>${letters[L].map(rowFor).join('')}</tbody></table></div>`).join('');

    const filter = `(function(v,root){v=v.toLowerCase();
      root.querySelectorAll('.pl-lsec').forEach(function(sec){var any=false;
        sec.querySelectorAll('tbody tr').forEach(function(r){var hit=!v||r.textContent.toLowerCase().indexOf(v)>=0;r.style.display=hit?'':'none';if(hit)any=true});
        sec.style.display=v?(any?'':'none'):(sec.dataset.on==='1'?'':'none')});
      root.parentNode.querySelectorAll('.pl-letb').forEach(function(b){b.classList.toggle('dim',!!v)});
      var hint=document.getElementById('pl-pickhint'); if(hint) hint.style.display=v?'none':'';
    })(this.value,document.getElementById('pl-subs'))`.replace(/\s*\n\s*/g, '');

    const T = teach();
    return `<div class="card"><h2>${T ? 'Subjects this student is sitting' : 'Your subjects'}</h2>
      <p>${T ? 'Tick the subjects and the right unit, then generate the personal exam timetable. The papers also show on the study board, so a revision plan can be built around every exam, not just this one.'
        : 'Choose every subject you are sitting, from the full CXC list, and the right unit. Then generate your own exam timetable. Each subject and each of its papers also becomes a tile on your study board, so you can plan revision for every exam, not just this one.'}</p>
      <p class="hint">${E(CAT.level)} subjects, from the official CXC May–June 2027 timetable below. ${chosen.length ? chosen.length + ' selected.' : 'None selected yet.'}</p>
      ${lock ? `<p class="pl-needsubs">🔒 ${T ? 'The personal timetable is locked, so the subjects are fixed.' : 'Your exam timetable is locked, so your subjects are fixed.'} Unlock it below to change them.</p>` : ''}
      <div class="row"><input id="pl-sq" class="search" placeholder="Filter the list" style="max-width:18em" oninput="${E(filter)}">
      ${chosen.length && !lock ? `<button type="button" class="btn ghost" data-px="subsclear">Clear all</button>` : ''}</div>
      <div class="pl-lstrip" role="tablist" aria-label="Subjects by letter">${strip}</div>
      <div id="pl-subs">${secs}</div>
      ${open ? '' : `<p class="hint" id="pl-pickhint">Pick a letter above, or type in the box, to see the subjects.</p>`}
      ${lock ? '' : `<div class="row" style="margin-top:10px"><button type="button" class="btn gold"${chosen.length ? '' : ' disabled aria-disabled="true"'} data-px="ttgen">🗒️ ${p.tt ? 'Generate the exam timetable again' : (T ? 'Generate the exam timetable' : 'Generate my exam timetable')}</button>${chosen.length ? '' : '<span class="hint">Tick at least one subject first.</span>'}</div>`}
      </div>${myTTHTML(api)}${ttHTML()}`;
  }

  /* the timetable itself, shown page by page inside the course */
  let TTP = 1;
  let TZ = 100;   /* how far the timetable pages are zoomed in */
  function ttHTML() {
    const n = +X.pages || 0, dir = X.imgdir || '';
    if (!n || !dir) return '';
    const key = +X.keypage || 0;
    const src = k => dir + 'pg-' + (k < 10 ? '0' : '') + k + '.jpg';
    let pages = '';
    for (let k = 1; k <= n; k++) {
      pages += `<figure class="ttfig" id="tt-p${k}"><img class="ttpage" src="${E(src(k))}" loading="lazy" alt="CXC ${E(X.level)} timetable, page ${k}"><figcaption class="hint">Page ${k} of ${n}</figcaption></figure>`;
    }
    return `<div class="card pl-tt"><h2>2027 Exam Timetable</h2>
      <p>The official CXC timetable for the May\u2013June 2027 sitting, as published for ${E(X.level)}. Scroll to read all ${n} pages.</p>
      <div class="row">
        ${key ? `<button type="button" class="btn ghost" data-px="ttjump" data-v="${key}">Jump to the subject list</button>` : ''}
        <button type="button" class="btn ghost" data-px="ttjump" data-v="1">Back to the top</button>
        <button type="button" class="chip" data-px="ttzoom" data-v="-25" aria-label="Zoom out">\u2212</button>
        <span class="pill" id="tt-z">100%</span>
        <button type="button" class="chip" data-px="ttzoom" data-v="25" aria-label="Zoom in">+</button>
        <button type="button" class="btn gold" data-px="ttfull">\u26f6 Full screen</button>
        <button type="button" class="btn ghost" data-px="ttpdf">\u2b07\ufe0f Download the PDF</button>
        <button type="button" class="btn ghost" data-px="ttprint">\ud83d\udda8\ufe0f Print</button>
      </div>
      <div class="tt-scroll" id="tt-scroll" tabindex="0" aria-label="The timetable, ${n} pages, scrolls up, down and across" style="--tz:${TZ}%">${pages}</div>
      <p class="hint">${E(X.source || '')}</p></div>`;
  }

  /* full screen, inside the course: an overlay the viewer can page through */
  function ttFull(api) {
    const n = +X.pages || 0, dir = X.imgdir || '';
    if (!n || !dir) return;
    const src = k => dir + 'pg-' + (k < 10 ? '0' : '') + k + '.jpg';
    const key = +X.keypage || 0;
    let el = document.getElementById('tt-full');
    if (el) el.remove();
    let pages = '';
    for (let k = 1; k <= n; k++) {
      pages += `<figure class="ttfig" id="ttf-p${k}"><img src="${src(k)}" loading="lazy" alt="CXC timetable, page ${k}"><figcaption>Page ${k} of ${n}</figcaption></figure>`;
    }
    el = document.createElement('div');
    el.id = 'tt-full';
    el.innerHTML = `<div class="tt-bar">
        <b class="tt-n">2027 Exam Timetable \u00b7 ${n} pages</b>
        ${key ? `<button type="button" class="btn ghost" data-ttf="key">Subject list</button>` : ''}
        <button type="button" class="btn ghost" data-ttf="top">Top</button>
        <span style="flex:1"></span>
        <button type="button" class="btn ghost" data-ttf="pdf">\u2b07\ufe0f PDF</button>
        <button type="button" class="btn gold" data-ttf="close">\u2715 Close</button>
      </div><div class="tt-wrap" id="tt-wrap">${pages}</div>`;
    document.body.appendChild(el);
    const wrap = el.querySelector('#tt-wrap');
    const goto = k => { const t = el.querySelector('#ttf-p' + k); if (t) t.scrollIntoView({ block: 'start' }); };
    const shut = () => {
      try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) { }
      el.remove();
      document.removeEventListener('keydown', keys);
    };
    function keys(e) { if (e.key === 'Escape') { e.preventDefault(); shut(); } }
    el.addEventListener('click', e => {
      const b = e.target.closest('[data-ttf]'); if (!b) return;
      const k = b.dataset.ttf;
      if (k === 'close') shut();
      else if (k === 'key') goto(key || 1);
      else if (k === 'top') goto(1);
      else if (k === 'pdf') ttPdf();
    });
    document.addEventListener('keydown', keys);
    try { if (el.requestFullscreen) el.requestFullscreen(); } catch (e) { }
    setTimeout(() => { if (wrap) wrap.focus && wrap.focus(); }, 60);
  }
  function ttPdf(api) {
    if (!X.pdf) return;
    const name = (X.level || 'CXC') + '_Timetable_May-June_2027.pdf';
    const plain = () => {
      const a = document.createElement('a');
      a.href = X.pdf; a.download = name; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.remove();
    };
    /* fetch it first so the file saves with its proper name, and fall back if that is blocked */
    try {
      fetch(X.pdf).then(r => r.ok ? r.blob() : null).then(b => {
        if (b) { if (!dlFile(name, b)) plain(); } else plain();
        if (api && api.toast) api.toast('Timetable PDF saved');
      }).catch(plain);
    } catch (e) { plain(); }
  }

  /* ---------- exam dates ---------- */
  function examsHTML(api) {
    const t0 = today();
    const rows = papersFor(api).slice().filter(x => x.date).sort((a, b) => a.date < b.date ? -1 : 1).map(p => {
      const d = fromIso(p.date), left = daysBetween(t0, d);
      const when = left > 0 ? left + ' day' + (left === 1 ? '' : 's') + ' to go' : (left === 0 ? 'Today' : 'Past');
      return `<tr><td><b>${E(p.subject && p.subject !== X.subject ? p.subject + ' \u00b7 ' : '')}${E(p.name)}</b>${p.online ? ' <span class="pill">online only</span>' : ''}</td><td>${E(pretty(d))} ${d.getFullYear()}</td><td>${E(p.session)} &middot; ${E(p.start)}</td><td>${E(p.length)}</td><td>${left >= 0 ? `<b>${E(when)}</b>` : `<span class="hint">${E(when)}</span>`}</td></tr>`;
    }).join('');
    const notes = (X.notes || []).map(n => `<li>${E(n)}</li>`).join('');
    return ttHTML() + `<div class="card"><h2>${E(X.subject)} \u2014 your papers</h2>
      <p class="hint">Taken from that timetable. Always check it against the copy your school gives you.</p>
      <div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Paper</th><th>Date</th><th>Session</th><th>Time allowed</th><th>Countdown</th></tr></thead><tbody>${rows}</tbody></table></div>
      ${notes ? `<h3>Worth knowing</h3><ul>${notes}</ul>` : ''}
      <div class="row" style="margin-top:10px"><button type="button" class="btn gold" data-go="examplan" data-tab="setup">🗓️ Build a study plan around these dates</button>${(EPD || CAT) ? `<button type="button" class="btn ghost" data-go="examplan" data-tab="subs">📚 Add other subjects</button>` : ''}</div></div>`;
  }

  /* ---------- the questions ---------- */
  function quizHTML(api) {
    const p = P(api), q = p.q, secs = sections();
    const chk = (name, val, on, label) => `<label class="opt"><input type="checkbox" data-px="tog" data-k="${name}" data-v="${E(val)}"${on ? ' checked' : ''}> ${E(label)}</label>`;
    const strong = q.strong || [], weak = q.weak || [], days = q.days || [1, 3, 5];
    return `<div class="card"><h2>Set up your plan</h2>
      <p>Answer these and I will build a timetable around your exams.</p>
      <h3>1. Which parts do you feel strongest in?</h3>
      <div class="optgrid">${secs.map(s => chk('strong', s.id, strong.indexOf(s.id) >= 0, s.t)).join('')}</div>
      <h3>2. Which parts worry you most?</h3>
      <p class="hint">These get the most time.</p>
      <div class="optgrid">${secs.map(s => chk('weak', s.id, weak.indexOf(s.id) >= 0, s.t)).join('')}</div>
      <h3>3. When do you work best?</h3>
      <div class="optgrid">${BLOCKS.map(b => `<label class="opt"><input type="radio" name="plblock" data-px="block" data-v="${b[0]}"${(q.block || 'afternoon') === b[0] ? ' checked' : ''}> ${E(b[1])} <span class="hint">(from ${b[2]})</span></label>`).join('')}</div>
      <h3>4. Which days can you study?</h3>
      <div class="optgrid">${[1, 2, 3, 4, 5, 6, 0].map(i => chk('days', String(i), days.indexOf(i) >= 0 || days.indexOf(String(i)) >= 0, ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i])).join('')}</div>
      <h3>5. How long is one good session?</h3>
      <div class="optgrid">${LENGTHS.map(n => `<label class="opt"><input type="radio" name="pllen" data-px="len" data-v="${n}"${(+q.len || 45) === n ? ' checked' : ''}> ${n} minutes</label>`).join('')}</div>
      <h3>6. How many sessions a week?</h3>
      <div class="row"><input type="number" id="pl-per" min="2" max="14" value="${+q.per || 4}" style="width:5em"> <span class="hint">2 to 14</span></div>
      <div class="row" style="margin-top:12px"><button type="button" class="btn gold" data-px="make">✨ Build my timetable</button></div></div>`;
  }

  /* ---------- building the timetable ---------- */
  function weightedTopics(api) {
    const p = P(api), secs = sections(), strong = p.q.strong || [], weak = p.q.weak || [];
    const bag = [];
    secs.forEach(s => {
      let n = 2;
      if (weak.indexOf(s.id) >= 0) n = 4;
      else if (strong.indexOf(s.id) >= 0) n = 1;
      for (let i = 0; i < n; i++) bag.push(s);
    });
    const out = bag.length ? bag : secs.slice();
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = out[i]; out[i] = out[j]; out[j] = t; }
    return out;
  }

  let LASTAPI = null;
  function lastExam() {
    const src = LASTAPI ? papersFor(LASTAPI) : (X.papers || []);
    const ds = src.map(p => p.date).filter(Boolean).sort();
    return ds.length ? fromIso(ds[ds.length - 1]) : addDays(today(), 84);
  }

  function build(api, keepLocked) {
    LASTAPI = api;
    const p = P(api), q = p.q;
    const len = +q.len || 45, per = Math.max(2, Math.min(14, +q.per || 4));
    let days = (q.days || [1, 3, 5]).map(Number);
    if (!days.length) days = [1, 3, 5];
    const block = BLOCKS.find(b => b[0] === (q.block || 'afternoon')) || BLOCKS[2];
    const locked = keepLocked ? p.slots.filter(s => s.lock) : [];
    const lockKey = {};
    locked.forEach(s => { lockKey[s.d + '|' + s.t] = true; });

    const bag = weightedTopics(api);
    const out = locked.slice();
    const start = today(), end = lastExam();
    const papers = papersFor(api).slice().filter(x => x.date).sort((a, b) => a.date < b.date ? -1 : 1);
    let bi = Math.floor(Math.random() * Math.max(1, bag.length));
    let week = 0, placed = 0;

    for (let d = new Date(start.getTime()); d <= end && placed < 400; d = addDays(d, 1)) {
      if (days.indexOf(d.getDay()) < 0) continue;
      const di = iso(d);
      if (papers.some(x => x.date === di)) continue;              /* exam day: no study slot */
      const perDay = per / days.length >= 2 ? 2 : 1;
      for (let k = 0; k < perDay; k++) {
        const hh = String(+block[2].slice(0, 2) + k * (len >= 60 ? 2 : 1));
        const t = d2(+hh > 23 ? 23 : +hh) + ':' + block[2].slice(3);
        if (lockKey[di + '|' + t]) continue;
        const near = papers.find(x => { const pd = fromIso(x.date); const gap = daysBetween(d, pd); return gap >= 0 && gap <= 10; });
        let topic, kind;
        const due = (p.asg || []).find(a => { const ad = fromIso(a.due); const gap = daysBetween(d, ad); return gap >= 0 && gap <= 6; });
        if (due) { topic = 'Assignment: ' + due.title; kind = 'asg'; }
        else if (near) { topic = near.name + ' — past paper practice'; kind = 'paper'; }
        else { const s = bag[bi % bag.length]; bi++; topic = s.t; kind = 'study'; }
        out.push({ d: di, t: t, mins: len, topic: topic, kind: kind, lock: 0 });
        placed++;
      }
      week++;
    }
    out.sort((a, b) => (a.d + a.t) < (b.d + b.t) ? -1 : 1);
    p.slots = out;
    api.save();
  }

  /* ---------- the plan on screen ---------- */
  /* ---------- the board: tiles dropped onto a week of days and times ---------- */
  const KIND = { study: '📘', subj: '📚', paper: '📝', asg: '📎', exam: '❗', rest: '🌿' };
  const HOURS = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  let ARM = null;   /* a tile picked up from the tray */
  let MOVE = null;  /* an existing session being moved */
  let WEEK = 0;     /* which week the board is showing */

  const mondayOf = d => addDays(d, -((d.getDay() + 6) % 7));
  function weekStart(api) {
    const base = mondayOf(today());
    return addDays(base, WEEK * 7);
  }
  let PAP = null;
  function examAt(di, t) {
    return (PAP || []).find(x => x.date === di && x.start === t) || null;
  }

  function trayHTML(api) {
    const secs = sections(), p = P(api), T = teach(), t0 = today();
    const papers = papersFor(api).slice().filter(x => x.date).sort((a, b) => (a.date + (a.start || '')) < (b.date + (b.start || '')) ? -1 : 1);
    /* a tile; papers show their own name, date and time instead of the minutes */
    const tile = (kind, topic, mins, note, label, meta, badge) =>
      `<button type="button" class="pl-tile ${kind}${ARM && ARM.topic === topic && ARM.kind === kind ? ' armed' : ''}"
        data-px="tile" data-kind="${kind}" data-topic="${E(topic)}" data-mins="${mins}" title="Drag onto the board, or tap it and then tap a slot">
        <span class="k" aria-hidden="true">${KIND[kind] || ''}</span><span class="t">${E(label || topic)}</span><span class="m">${meta ? E(meta) : mins + ' min' + (note ? ' · ' + E(note) : '')}</span>${badge || ''}</button>`;
    const asgTiles = (p.asg || []).map(a => tile('asg', 'Assignment: ' + a.title, 60, 'due ' + pretty(fromIso(a.due)))).join('');
    const slen = +((p.q && p.q.len) || 45);
    const subjNames = [X.subject].concat(EPD ? epNames(api) : (p.subs || []));
    const subjTiles = subjNames.map(nm => tile('subj', nm, slen, 'revision')).join('');

    /* every paper of every chosen subject, grouped by subject, each tile carrying its date */
    const bySub = {};
    papers.forEach(x => { const s = x.subject || X.subject; (bySub[s] = bySub[s] || []).push(x); });
    const paperTile = x => {
      const sub = shortSub(x.subject || X.subject), left = daysBetween(t0, fromIso(x.date));
      const dd = fromIso(x.date), topic = x.name + ' practice: ' + sub + ' (exam ' + dd.getDate() + ' ' + MONTHS[dd.getMonth()].slice(0, 3) + ')';
      const meta = fmtD(x.date) + ' ' + fromIso(x.date).getFullYear() + (x.start ? ', ' + x.start : '') + (x.length ? ' · ' + x.length : '') + (x.online ? ' · online' : '');
      return tile('paper', topic, 60, '', x.name, meta, `<span class="pl-cd${left === 0 ? ' now' : ''}">${left > 0 ? left + ' days' : left === 0 ? 'today' : 'sat'}</span>`);
    };
    const paperGroups = subjNames.filter(s => bySub[s]).map(s =>
      `<div class="pl-pg"><h4 class="pl-pgh">${E(s)} <span class="pl-c">${bySub[s].length} paper${bySub[s].length === 1 ? '' : 's'}</span></h4>
        <div class="pl-tray">${bySub[s].map(paperTile).join('')}</div></div>`).join('');

    /* add any subject from the full CXC list without leaving the board */
    const lockedTT = !!(p.tt && p.tt.lock);
    const addFilter = `(function(v,box){v=v.trim().toLowerCase();box.style.display=v?'':'none';var n=0;
      box.querySelectorAll('.chip').forEach(function(c){var hit=!!v&&c.textContent.toLowerCase().indexOf(v)>=0;c.style.display=hit?'':'none';if(hit)n++});
      var none=document.getElementById('pl-addnone');if(none)none.style.display=(v&&!n)?'':'none'})(this.value,document.getElementById('pl-addl'))`.replace(/\s*\n\s*/g, '');
    const others = CAT ? (CAT.subjects || []).map(x => x.s).filter(s => (p.subs || []).indexOf(s) < 0) : [];
    const addBox = EPD ? `<div class="pl-add"><button type="button" class="btn ghost" data-go="examplan" data-tab="subs">📚 ${T ? 'Add or change the student’s subjects' : 'Add or change your subjects'}</button></div>` : !CAT ? '' : lockedTT
      ? `<p class="hint" style="margin:0 12px 10px">🔒 ${T ? 'The exam timetable is locked, so the subjects are fixed.' : 'Your exam timetable is locked, so your subjects are fixed.'} Unlock it on the Subjects tab to add more.</p>`
      : `<div class="pl-add"><label for="pl-addq"><b>${T ? 'Add a subject the student is sitting' : 'Add another subject you are sitting'}</b> <span class="hint">· all ${E(CAT.level)} subjects</span></label>
          <div class="row"><input id="pl-addq" class="search" placeholder="Type a subject, e.g. Biology" autocomplete="off" style="max-width:20em" oninput="${E(addFilter)}">
          <button type="button" class="btn ghost" data-go="examplan" data-tab="subs">Browse the full list</button></div>
          <div class="chips pl-addl" id="pl-addl" style="display:none">${others.map(s => `<button type="button" class="chip" data-px="sub" data-from="tray" data-v="${E(s)}">+ ${E(s)}</button>`).join('')}</div>
          <p class="hint" id="pl-addnone" style="display:none">No subject matches that.</p></div>`;

    const topLet = {};
    secs.forEach(x => {
      const c = (String(x.t).trim()[0] || '#').toUpperCase();
      const L = /[A-Z]/.test(c) ? c : '#';
      (topLet[L] = topLet[L] || []).push(x);
    });
    const topicAcc = Object.keys(topLet).sort().map(L =>
      `<details class="pl-acc pl-let"><summary>${E(L)} <span class="pl-c">${topLet[L].length}</span></summary>
        <div class="pl-tray">${topLet[L].map(x => tile('study', x.t, slen)).join('')}</div></details>`).join('');
    const none = EPD ? !epNames(api).length : (CAT && !(p.subs || []).length);
    const nSubs = subjNames.length, nPap = papers.length, nTop = secs.length;
    return `<div class="card pl-traycard"><h2>Tiles</h2>
      <p class="hint">${ARM ? 'Now tap a free slot on the board — or drag the tile onto it.' : 'Drag a tile onto the board. On a phone or tablet, hold your finger on the tile for a moment, then drag. You can also tap a tile and then tap a slot.'}</p>
      ${ARM ? `<div class="row"><button type="button" class="btn ghost" data-px="unarm">✕ Put the tile back</button></div>` : ''}
      <div class="pl-traybody pl-scroll" id="pl-tray">
      ${none ? `<p class="pl-needsubs">${T ? 'Only this course’s papers are listed here. To plan around a student’s other subjects, add them below.' : 'Only this course’s papers are here so far. Add your other subjects below to get a tile for each one and for every paper date.'}</p>` : ''}
      <details class="pl-acc" open><summary>📚 Subjects <span class="pl-c">${nSubs}</span></summary>
        ${addBox}
        ${nSubs > 4 ? `<div class="row" style="margin:0 12px 6px"><input class="search" placeholder="Filter these tiles" style="max-width:16em" oninput="(function(v,box){v=v.toLowerCase();box.querySelectorAll('.pl-tile').forEach(function(t){t.style.display=(!v||t.textContent.toLowerCase().indexOf(v)>=0)?'':'none'})})(this.value,this.closest('details').querySelector('.pl-tray'))"></div>` : ''}
        <div class="pl-tray">${subjTiles}</div></details>
      <details class="pl-acc" open><summary>📝 Papers and their dates <span class="pl-c">${nPap}</span></summary>
        <p class="hint">Every paper of every subject above, with its exam date. Drop one on the board to plan a practice session for it.</p>
        ${paperGroups || '<p class="hint">No papers listed.</p>'}</details>
      ${asgTiles ? `<details class="pl-acc"><summary>📎 Assignments <span class="pl-c">${(p.asg || []).length}</span></summary><div class="pl-tray">${asgTiles}</div></details>` : ''}
      <details class="pl-acc"><summary>📘 Study topics <span class="pl-c">${nTop}</span></summary>
        <p class="hint">Pick a topic from this course to study in a slot. They are grouped by first letter.</p>
        ${nTop > 6 ? `<div class="row" style="margin:0 12px 6px"><input class="search" placeholder="Filter topics" style="max-width:16em" oninput="(function(v,box){v=v.toLowerCase();box.querySelectorAll('details.pl-let').forEach(function(d){var any=false;d.querySelectorAll('.pl-tile').forEach(function(t){var hit=!v||t.textContent.toLowerCase().indexOf(v)>=0;t.style.display=hit?'':'none';if(hit)any=true});d.style.display=any?'':'none';if(v)d.open=any})})(this.value,this.closest('details'))"></div>` : ''}
        ${topicAcc || '<p class="hint">No topics found.</p>'}</details></div></div>`;
  }

  const spanOf = p => [1, 2, 4].indexOf(+p.span) >= 0 ? +p.span : 1;
  function boardHTML(api) {
    PAP = papersFor(api);
    const p = P(api), span = spanOf(p), mon = weekStart(api), t0 = iso(today());
    const days = []; for (let i = 0; i < 7 * span; i++) days.push(addDays(mon, i));
    const end = days[days.length - 1];
    const byCell = {};
    p.slots.forEach((s, i) => { (byCell[s.d + '|' + s.t] = byCell[s.d + '|' + s.t] || []).push({ s: s, i: i }); });
    /* an exam fills the hour it starts in and the hours it runs into */
    const exStart = {}, exBusy = {};
    (PAP || []).forEach(x => {
      if (!x.date || !x.start) return;
      const h0 = +String(x.start).slice(0, 2), n = Math.max(1, Math.ceil(mins(x.length) / 60));
      const k = x.date + '|' + d2(h0) + ':00';
      (exStart[k] = exStart[k] || []).push(x);
      for (let j = 1; j < n; j++) { const kb = x.date + '|' + d2(h0 + j) + ':00'; if (!exStart[kb]) exBusy[kb] = x; }
    });

    const head = '<tr><th class="pl-h pl-corner"></th>' + days.map(d => {
      const di = iso(d), ex = (PAP || []).filter(x => x.date === di);
      return `<th class="pl-h${di === t0 ? ' now' : ''}${d.getDay() === 1 ? ' wk0' : ''}">${E(DAYS[d.getDay()])}<br><span class="dnum">${d.getDate()} ${E(MONTHS[d.getMonth()].slice(0, 3))}</span>${ex.length ? `<br><span class="pl-exday">${ex.length === 1 ? 'exam' : ex.length + ' exams'}</span>` : ''}</th>`;
    }).join('') + '</tr>';

    const rows = HOURS.map(t => {
      const cells = days.map(d => {
        const di = iso(d), key = di + '|' + t, wk = d.getDay() === 1 ? ' wk0' : '';
        const ex = exStart[key];
        if (ex) return `<td class="pl-cell pl-exam${wk}" data-d="${di}" data-t="${t}">${ex.map(x => `<div class="pl-chip exam"><b>${E(x.name)}</b><span>${E(shortSub(x.subject || X.subject))}</span><span>${E(x.start || '')}${x.length ? ' · ' + E(x.length) : ''}</span></div>`).join('')}</td>`;
        if (exBusy[key]) return `<td class="pl-cell pl-busy${wk}" data-d="${di}" data-t="${t}"><span>${E(shortSub(exBusy[key].subject || X.subject))} exam</span></td>`;
        const here = byCell[key] || [];
        const chips = here.map(r => `<div class="pl-chip ${r.s.kind}${r.s.lock ? ' lk' : ''}${MOVE === r.i ? ' moving' : ''}" data-px="pick" data-i="${r.i}" title="${E(r.s.topic)}. ${r.s.lock ? 'Locked — tap to unlock' : 'Drag to move it, or tap it and then tap a slot'}">
            <span class="pl-ct"><span aria-hidden="true">${KIND[r.s.kind] || ''}</span><span class="pl-acts"><button type="button" class="pl-x" data-px="lock" data-i="${r.i}" title="${r.s.lock ? 'Unlock' : 'Lock'}">${r.s.lock ? '🔒' : '🔓'}</button><button type="button" class="pl-x" data-px="drop" data-i="${r.i}" title="Remove">✕</button></span></span>
            <b>${E(r.s.topic)}</b>
          </div>`).join('');
        const drop = (ARM || MOVE !== null) ? ' can' : '';
        return `<td class="pl-cell${drop}${di < t0 ? ' past' : ''}${wk}" data-px="cell" data-d="${di}" data-t="${t}">${chips}</td>`;
      }).join('');
      return `<tr><th class="pl-t">${E(t)}</th>${cells}</tr>`;
    }).join('');

    const nLock = p.slots.filter(x => x.lock).length;
    const sb = (v, s, l) => `<button type="button" class="chip pl-sa" data-px="scr" data-v="${v}" aria-label="${l}" title="${l}">${s}</button>`;
    return `<div class="card"><h2>Your study board</h2>
      <p class="hint">${E(pretty(mon))} to ${E(pretty(end))} ${end.getFullYear()}. ${nLock ? nLock + ' session' + (nLock === 1 ? '' : 's') + ' locked.' : 'Lock a session to keep it when you regenerate.'}</p>
      <div class="row"><button type="button" class="btn ${MAX ? 'gold' : 'ghost'}" data-px="max" data-v="${MAX ? '0' : '1'}">${MAX ? '✕ Exit full screen' : '⛶ Maximise the board'}</button>
      <span class="pl-seg" role="group" aria-label="How much to show">${[1, 2, 4].map(n => `<button type="button" class="chip ${span === n ? 'sel' : ''}" data-px="span" data-v="${n}" aria-pressed="${span === n}">${n} week${n > 1 ? 's' : ''}</button>`).join('')}</span>
      <button type="button" class="btn ghost" data-px="wk" data-v="-1">‹ Earlier</button>
      <button type="button" class="btn ghost" data-px="wk" data-v="0">This week</button>
      <button type="button" class="btn ghost" data-px="wk" data-v="1">Later ›</button>
      <button type="button" class="btn ghost" data-px="wkexam">Jump to the next exam</button></div>
      <div class="row pl-sbar"><span class="hint">Scroll the board: swipe it, use the scroll bars, drag it with the mouse, or</span>${sb('l', '◀', 'Scroll left')}${sb('r', '▶', 'Scroll right')}${sb('u', '▲', 'Scroll up')}${sb('d', '▼', 'Scroll down')}</div>
      <div class="pl-board pl-scroll" id="pl-board" tabindex="0" aria-label="Study board. Scrolls sideways through the days and up and down through the times."><table class="pl-grid" style="min-width:${70 + days.length * 132}px"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
      <div class="row" style="margin-top:10px"><button type="button" class="btn gold" data-px="regen">↺ Regenerate the open sessions</button>
      <button type="button" class="btn ghost" data-px="lockall">🔒 Lock all</button>
      <button type="button" class="btn ghost" data-px="unlockall">🔓 Unlock all</button>
      <button type="button" class="btn ghost" data-px="pldl" data-v="pdf">⬇️ Download as PDF</button>
      <button type="button" class="btn ghost" data-px="pldl" data-v="csv">📈 Spreadsheet</button>
      <button type="button" class="btn ghost" data-px="list">📄 List for printing</button>
      <button type="button" class="btn ghost" data-px="clear">Clear the board</button></div></div>`;
  }

  function listHTML(api) {
    const p = P(api), t0 = iso(today());
    if (!p.slots.length) return `<div class="card"><h2>Your timetable</h2><p>Nothing on the board yet.</p></div>`;
    const rows = p.slots.slice().sort((a, b) => (a.d + a.t) < (b.d + b.t) ? -1 : 1).map(s =>
      `<tr class="${s.d < t0 ? 'pl-past' : ''}"><td>${E(pretty(fromIso(s.d)))}</td><td>${E(s.t)}</td><td>${E(String(s.mins))} min</td><td>${KIND[s.kind] || ''} ${E(s.topic)}</td><td>${s.lock ? '🔒' : ''}</td></tr>`).join('');
    return `<div class="card"><h2>Your timetable</h2>
      <div class="row"><button type="button" class="btn ghost" data-px="board">← Back to the board</button><button type="button" class="btn ghost" data-px="print">🖨️ Print</button></div>
      <div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Day</th><th>Time</th><th>Length</th><th>What</th><th></th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }

  let MAX = false;
  function planHTML(api) {
    const p = P(api);
    if (p.view === 'list') return listHTML(api);
    return `<div id="pl-max"${MAX ? ' class="on"' : ''}>${boardHTML(api) + trayHTML(api)}</div>`;
  }
  function setMax(api, on) {
    MAX = !!on;
    api.render();
    setTimeout(() => {
      const el = document.getElementById('pl-max');
      try {
        if (MAX && el && el.requestFullscreen) el.requestFullscreen();
        else if (!MAX && document.fullscreenElement) document.exitFullscreen();
      } catch (e) { }
    }, 30);
  }
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && MAX) {
      MAX = false;
      const api = window.__PLAPI;
      if (api && api.render) api.render();
    }
  });

  /* ---------- assignments ---------- */
  function asgHTML(api) {
    const p = P(api);
    const rows = p.asg.map((a, i) => `<tr><td>${E(a.title)}</td><td>${E(a.subject || '')}</td><td>${E(pretty(fromIso(a.due)))}</td><td><button type="button" class="chip" data-px="asgdrop" data-i="${i}">✕</button></td></tr>`).join('');
    return `<div class="card"><h2>Assignments and deadlines</h2>
      <p class="hint">Add what is due. Work sessions appear in the week before each deadline.</p>
      ${p.asg.length ? `<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>What</th><th>Subject</th><th>Due</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : '<p>Nothing added yet.</p>'}
      <h3>Add one</h3>
      <div class="row"><input id="pl-at" class="search" maxlength="80" placeholder="What is due"><input id="pl-as" class="search" maxlength="40" placeholder="Subject" style="max-width:12em"><input id="pl-ad" type="date" class="search" style="max-width:12em"><button type="button" class="btn gold" data-px="asgadd">Add</button></div></div>`;
  }

  const CSS = `<style>
    .tbl{width:100%;border-collapse:collapse;font-size:.94rem}
    .tbl th,.tbl td{text-align:left;padding:7px 9px;border-bottom:1px solid var(--line);vertical-align:middle}
    .tbl th{font:800 .8rem var(--f-display);color:var(--gold);letter-spacing:.03em}
    .pl-past td{opacity:.5}
    #pl-max.on{position:fixed;inset:0;z-index:9998;background:var(--bg);overflow:auto;padding:10px}
    #pl-max.on .pl-board{max-height:calc(100vh - 200px)}
    #pl-max.on .pl-cell{height:54px}
    .pl-acc{border:1px solid var(--line);border-radius:12px;margin:8px 0;background:var(--surface)}
    .pl-acc>summary{cursor:pointer;padding:9px 12px;font:800 .92rem var(--f-display);list-style:none;display:flex;align-items:center;gap:8px}
    .pl-acc>summary::-webkit-details-marker{display:none}
    .pl-acc>summary::before{content:'\\25b8';display:inline-block;transition:transform .15s;color:var(--gold)}
    .pl-acc[open]>summary::before{transform:rotate(90deg)}
    .pl-acc>.pl-tray,.pl-acc>table,.pl-acc>.hint{margin:0 12px 12px}
    .pl-acc .pl-c{font-weight:600;font-size:.78rem;color:var(--muted)}
    .pl-let>summary{font-size:1rem}
    .pl-needsubs{margin:6px 0;font-size:.9rem}
    .pl-tray{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 14px}
    .pl-tile{display:flex;flex-direction:column;align-items:flex-start;gap:1px;text-align:left;cursor:grab;padding:8px 11px;border-radius:12px;border:1px solid var(--line);background:var(--raise);color:inherit;font:inherit;max-width:16em;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
    .pl-tile .pl-cd{margin:3px 0 0}
    .pl-tile .t{font-weight:800;font-size:.9rem;line-height:1.2}
    .pl-tile .m{font-size:.74rem;color:var(--muted)}
    .pl-tile .k{font-size:.95rem}
    .pl-tile.armed{outline:3px solid var(--gold);background:var(--soft-ok, var(--raise))}
    .pl-tile.paper{border-color:var(--gold)}
    .pl-board{overflow:auto;max-height:min(68vh,720px);border:1px solid var(--line);border-radius:12px;margin-top:8px;position:relative;cursor:grab}
    .pl-board.pan,.pl-cal.pan{cursor:grabbing}
    .pl-grid{border-collapse:collapse;width:100%;min-width:720px;font-size:.84rem}
    .pl-grid th,.pl-grid td{border:1px solid var(--line);vertical-align:top}
    .pl-h{position:sticky;top:0;z-index:2;background:linear-gradient(var(--surface),var(--surface)),var(--bg);padding:6px 4px;text-align:center;font:800 .8rem var(--f-display);box-shadow:0 1px 0 var(--line)}
    .pl-h.now{color:var(--gold)}
    .pl-h .dnum{font-weight:600;font-size:.72rem;color:var(--muted)}
    .pl-exday{font-size:.68rem;color:var(--gold);font-weight:800}
    .pl-t{position:sticky;left:0;z-index:1;background:linear-gradient(var(--surface),var(--surface)),var(--bg);padding:4px 7px;white-space:nowrap;font-weight:700;color:var(--muted);box-shadow:1px 0 0 var(--line)}
    .pl-h.pl-corner{left:0;z-index:4}
    .pl-h.wk0,.pl-cell.wk0{border-left:2px solid var(--gold)}
    .pl-cell{height:52px;min-width:124px;width:132px;padding:3px}
    .pl-busy{background:repeating-linear-gradient(135deg,rgba(245,197,66,.16) 0 6px,transparent 6px 12px);font-size:.68rem;color:var(--muted);text-align:center;vertical-align:middle}
    .pl-cell.past{background:rgba(127,127,127,.12)}
    .pl-cell.can{outline:1px dashed var(--gold);outline-offset:-3px;cursor:pointer}
    .pl-cell.over{background:var(--soft-ok, rgba(46,160,67,.18))}
    .pl-chip{display:flex;flex-direction:column;align-items:stretch;gap:1px;background:var(--raise);border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:8px;padding:4px 6px;margin-bottom:3px;cursor:grab;line-height:1.2;touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
    .pl-chip b{font-size:.78rem;font-weight:700;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}
    .pl-chip.lk{border-left-color:var(--ok, #2ea043)}
    .pl-chip.moving{outline:2px solid var(--gold)}
    .pl-chip.exam{background:var(--gold);color:var(--on-gold);border-color:var(--gold-deep);cursor:default;flex-direction:column;gap:0}
    .pl-chip.exam span{font-size:.7rem}
    .pl-acts{display:flex;gap:2px;flex:0 0 auto}
    .pl-ct{display:flex;align-items:center;justify-content:space-between;gap:4px;font-size:.8rem;line-height:1}
    .pl-x{border:0;background:transparent;color:inherit;font-size:.78rem;cursor:pointer;padding:0 1px;line-height:1}
    @media print{.pl-board,.pl-tray,.row{display:none!important}}
    #tt-full{position:fixed;inset:0;z-index:9999;background:#0b0f16;display:flex;flex-direction:column}
    #tt-full .tt-bar{display:flex;gap:8px;align-items:center;padding:8px 10px;background:var(--surface);border-bottom:1px solid var(--line);flex-wrap:wrap}
    #tt-full .tt-n{font-weight:800;font-size:.86rem}
    #tt-full .tt-wrap{flex:1;overflow:auto;padding:10px;scroll-behavior:smooth}
    #tt-full .ttfig{max-width:1000px;margin:0 auto 12px}
    #tt-full img{display:block;width:100%;height:auto;background:#fff;border-radius:6px}
    #tt-full figcaption{text-align:center;color:#9aa6b8;font-size:.78rem;padding-top:4px}
    .tt-scroll{max-height:76vh;overflow:auto;margin-top:10px;border:1px solid var(--line);border-radius:12px;background:var(--raise);padding:8px;scroll-behavior:smooth}
    .ttfig{margin:0 0 10px}
    .ttfig:last-child{margin-bottom:0}
    .ttpage{display:block;width:var(--tz,100%);min-width:100%;max-width:none;height:auto;border:1px solid var(--line);border-radius:8px;background:#fff}
    .ttfig figcaption{text-align:center;padding:3px 0 0}
    @media print{.pl-tt .row{display:none!important}.tt-scroll{max-height:none;overflow:visible;border:0;padding:0}.ttpage{border:0;page-break-after:always}}
    .pl-lstrip{display:flex;flex-wrap:wrap;gap:5px;margin:10px 0}
    .pl-letb{min-width:2.2em;padding:5px 8px;border-radius:9px;border:1px solid var(--line);background:var(--raise);color:inherit;font:800 .88rem var(--f-display);cursor:pointer;position:relative}
    .pl-letb.has{border-color:var(--gold)}
    .pl-letb.on{background:var(--gold);color:var(--on-gold);border-color:var(--gold)}
    .pl-letb.dim{opacity:.4}
    .pl-dot{font-size:.66rem;font-weight:800;margin-left:3px;vertical-align:super}
    .pl-lh{margin:10px 0 4px;font-size:.95rem}
    .pl-mytt .pl-nav{align-items:center;gap:6px;margin:8px 0}
    .pl-navl{font:800 1rem var(--f-display)}
    .pl-cal{overflow:auto;max-height:min(64vh,680px);border:1px solid var(--line);border-radius:12px;margin-top:6px;background:var(--raise);cursor:grab}
    .pl-mth{min-width:900px}
    .pl-wk{min-width:1050px}
    .pl-dc{height:108px;min-width:124px;padding:3px 4px;vertical-align:top}
    .pl-wk .pl-dc{height:230px}
    .pl-dc.off{background:rgba(127,127,127,.07)}
    .pl-dc.hit{background:var(--surface)}
    .pl-dc.now{outline:2px solid var(--gold);outline-offset:-2px}
    .pl-dc .dn{display:block;font-weight:800;font-size:.76rem;color:var(--muted);margin-bottom:2px}
    .pl-ex{display:block;background:var(--gold);color:var(--on-gold);border-radius:7px;padding:2px 5px;margin-bottom:3px;font-size:.7rem;line-height:1.25}
    .pl-ex b{font-weight:800}
    .pl-ex i{font-style:normal;opacity:.85}
    .pl-cd{display:inline-block;margin-left:4px;background:rgba(0,0,0,.22);border-radius:99px;padding:0 5px;font-weight:800;font-size:.64rem}
    .pl-cd.now{background:#b3261e;color:#fff}
    .pl-year{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:8px;margin-top:6px}
    .pl-mini{border:1px solid var(--line);border-radius:10px;padding:6px;background:var(--raise);opacity:.55}
    .pl-mini.has{opacity:1;border-color:var(--gold)}
    .pl-minih{width:100%;border:0;background:transparent;color:inherit;font:800 .82rem var(--f-display);cursor:pointer;padding:0 0 3px;text-align:left}
    .pl-mini table{width:100%;border-collapse:collapse;font-size:.6rem}
    .pl-mini td{text-align:center;padding:1px 0;color:var(--muted)}
    .pl-mini td.hit{background:var(--gold);color:var(--on-gold);font-weight:800;border-radius:3px}
    .pl-mini td.now{outline:1px solid var(--gold)}
    @media print{.pl-cal{max-height:none;overflow:visible;border:0}.pl-mytt .chips{display:none!important}}
    .optgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:6px;margin:8px 0}
    .opt{display:flex;gap:8px;align-items:center;background:var(--raise);border:1px solid var(--line);border-radius:10px;padding:7px 10px;cursor:pointer}
    .pill{font-size:.72rem;font-weight:800;background:var(--raise);border:1px solid var(--line);border-radius:99px;padding:2px 8px}
    @media print{.row,.chip,summary{display:none!important}details{display:block!important}}
    .pl-scroll{scrollbar-width:auto;scrollbar-color:var(--gold) rgba(127,127,127,.15)}
    .pl-scroll::-webkit-scrollbar{width:13px;height:13px}
    .pl-scroll::-webkit-scrollbar-thumb{background:var(--gold);border-radius:9px;border:3px solid transparent;background-clip:padding-box}
    .pl-scroll::-webkit-scrollbar-track{background:rgba(127,127,127,.12)}
    .pl-scroll::-webkit-scrollbar-corner{background:transparent}
    .pl-scroll:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
    .pl-seg{display:inline-flex;gap:4px;flex-wrap:wrap}
    .pl-sbar{align-items:center;gap:6px;margin-top:6px}
    .pl-sbar .hint{margin:0}
    .pl-sa{min-width:2.4em;justify-content:center}
    .pl-pg{margin:0 12px 8px}
    .pl-pgh{margin:8px 0 2px;font-size:.9rem}
    .pl-pg .pl-tray{margin:4px 0 8px}
    .pl-add{margin:0 12px 10px;padding:8px 10px;border:1px dashed var(--line);border-radius:10px}
    .pl-add .row{margin-top:6px}
    .pl-addl{margin-top:8px;max-height:230px;overflow:auto}
    .pl-src{opacity:.45}
    .pl-traybody{max-height:min(60vh,620px);overflow:auto;padding-right:4px;margin-top:6px;border-top:1px solid var(--line)}
    #pl-max.on .pl-traybody{max-height:none;overflow:visible}
    .pl-ghost{position:fixed;z-index:10000;pointer-events:none;transform:translate(-50%,-125%);max-width:15em;padding:7px 11px;border-radius:12px;background:var(--gold);color:var(--on-gold);font:800 .82rem var(--f-display);box-shadow:0 10px 26px rgba(0,0,0,.45);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    body.pl-dragging,body.pl-dragging *{cursor:grabbing!important}
    .pl-scrollhint{margin-top:4px}
    @media (min-width:1100px){#pl-max.on{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:12px;align-items:start}#pl-max.on>.pl-traycard{max-height:calc(100vh - 20px);overflow:auto;position:sticky;top:0}}
  </style>`;

  function render(api, loc) {
    const tab = (loc && loc.tab) || 'exams';
    const t = (k, n) => `<button type="button" class="chip ${tab === k ? 'sel' : ''}" role="tab" aria-selected="${tab === k}" data-go="examplan" data-tab="${k}">${n}</button>`;
    let h = CSS + `<section class="hero"><span class="eyebrow">Exams &amp; planning</span><h1>Exam dates and Study Planner</h1>
      <p>Your papers, and a timetable built around them.</p></section>
      <div class="chips" role="tablist" style="margin-bottom:10px">${t('exams', '🗓️ Exam dates')}${EPD ? t('subs', '📚 Subjects & timetables') : (CAT ? t('subs', '📚 Subjects') : '')}${t('setup', '⚙️ Set up')}${t('plan', '📅 My board')}${t('asg', '📎 Assignments')}</div>`;
    if (tab === 'exams') h += examsHTML(api);
    else if (tab === 'subs') h += EPD ? '<div id="ep-mount" style="margin-top:4px"></div>' : subjectsHTML(api);
    else if (tab === 'setup') h += quizHTML(api);
    else if (tab === 'asg') h += asgHTML(api);
    else h += planHTML(api);
    return h;
  }

  document.addEventListener('change', e => {
    const el = e.target;
    if (!el || !el.dataset || el.dataset.px !== 'topic') return;
    const api = window.__PLAPI || window.COURSE_API; if (!api) return;
    const p = P(api), i = +el.dataset.i;
    if (p.slots[i]) { p.slots[i].topic = el.value; api.save(); }
  });
  /* ---------- dragging: mouse, pen and finger (hold a moment, then drag); tapping still works everywhere ---------- */
  const SC = {};            /* where each scrolling timetable was left, so a redraw does not jump back to the start */
  let PEND = null;          /* a day and time to bring into view after the next redraw */
  let NOCLICK = 0;          /* swallow the click that follows a drag or a pan */
  let DRAG = null, PAN = null;
  document.addEventListener('scroll', e => {
    const el = e.target;
    if (el && el.id && (el.id === 'pl-board' || el.id === 'pl-cal' || el.id === 'pl-tray')) SC[el.id] = [el.scrollLeft, el.scrollTop];
  }, true);
  function restoreScroll() {
    ['pl-board', 'pl-cal', 'pl-tray'].forEach(id => {
      const el = document.getElementById(id), v = SC[id];
      if (el && v) { el.scrollLeft = v[0]; el.scrollTop = v[1]; }
    });
    if (PEND) {
      const bd = document.getElementById('pl-board'), want = PEND; PEND = null;
      const c = bd && (bd.querySelector(`td[data-d="${want.d}"][data-t="${want.t}"]`) || bd.querySelector(`td[data-d="${want.d}"]`));
      if (bd && c) { bd.scrollLeft = Math.max(0, c.offsetLeft - 80); bd.scrollTop = Math.max(0, c.offsetTop - 60); SC['pl-board'] = [bd.scrollLeft, bd.scrollTop]; }
    }
  }
  window.addEventListener('click', e => { if (Date.now() < NOCLICK) { e.stopPropagation(); e.preventDefault(); } }, true);

  function dragLabel(el) {
    const b = el.querySelector('.t') || el.querySelector('b') || el;
    return (b.textContent || '').replace(/\s+/g, ' ').trim();
  }
  function cellAt(x, y) {
    const g = DRAG && DRAG.ghost; if (g) g.style.display = 'none';
    const t = document.elementFromPoint(x, y);
    if (g) g.style.display = '';
    return t && t.closest ? t.closest('[data-px="cell"]') : null;
  }
  function track(x, y) {
    const d = DRAG; if (!d || !d.ghost) return;
    d.ghost.style.left = x + 'px'; d.ghost.style.top = y + 'px';
    const c = cellAt(x, y);
    if (c !== d.over) { if (d.over) d.over.classList.remove('over'); d.over = c; if (c) c.classList.add('over'); }
  }
  function beginDrag() {
    const d = DRAG; if (!d || d.started) return;
    d.started = true; clearTimeout(d.timer);
    try { if (d.touch && navigator.vibrate) navigator.vibrate(15); } catch (x) { }
    const g = document.createElement('div');
    g.className = 'pl-ghost'; g.textContent = dragLabel(d.el);
    document.body.appendChild(g); d.ghost = g;
    document.body.classList.add('pl-dragging'); d.el.classList.add('pl-src');
    track(d.x, d.y);
    let last = performance.now();
    const step = now => {
      if (!DRAG || !DRAG.started) return;
      const dt = Math.min(0.1, Math.max(0, ((now || performance.now()) - last) / 1000)); last = now || performance.now();
      const x = DRAG.x, y = DRAG.y, E2 = 48;
      const sp = dist => Math.round((360 + Math.max(0, E2 - dist) * 30) * dt);   /* pixels this frame: faster the nearer the edge */
      const bd = document.getElementById('pl-board');
      if (bd) {
        const r = bd.getBoundingClientRect();
        if (y > r.top - 10 && y < r.bottom + 10) {
          if (x < r.left + E2 && x > r.left - 30) bd.scrollLeft -= sp(x - r.left); else if (x > r.right - E2 && x < r.right + 30) bd.scrollLeft += sp(r.right - x);
        }
        if (x > r.left && x < r.right) {
          if (y < r.top + E2 && y > r.top - 10) bd.scrollTop -= sp(y - r.top); else if (y > r.bottom - E2 && y < r.bottom + 10) bd.scrollTop += sp(r.bottom - y);
        }
      }
      const mx = document.getElementById('pl-max'), page = (mx && mx.classList.contains('on')) ? mx : (document.scrollingElement || document.documentElement);
      DRAG.hold = (y < 70 || y > window.innerHeight - 70) ? (DRAG.hold || 0) + dt : 0;   /* and faster the longer it is held there */
      const pv = Math.round(Math.min(2600, 700 + DRAG.hold * 1400) * dt);
      if (y < 70) page.scrollTop -= pv; else if (y > window.innerHeight - 70) page.scrollTop += pv;
      track(x, y);
      DRAG.raf = requestAnimationFrame(step);
    };
    d.raf = requestAnimationFrame(step);
  }
  function endDrag(dropIt) {
    const d = DRAG; DRAG = null; if (!d) return;
    clearTimeout(d.timer); if (d.raf) cancelAnimationFrame(d.raf);
    if (!d.started) return;
    NOCLICK = Date.now() + 450;
    if (d.ghost) d.ghost.remove();
    document.body.classList.remove('pl-dragging'); d.el.classList.remove('pl-src');
    if (d.over) d.over.classList.remove('over');
    const api = window.__PLAPI, c = dropIt ? d.over : null;
    if (!api || !c) return;
    const p = P(api), di = c.dataset.d, t = c.dataset.t;
    if (d.chip) {
      const i = +d.el.dataset.i;
      if (p.slots[i] && !p.slots[i].lock) { p.slots[i].d = di; p.slots[i].t = t; p.slots.sort((a, b) => (a.d + a.t) < (b.d + b.t) ? -1 : 1); }
      MOVE = null; ARM = null; api.save(); api.render(); if (api.toast) api.toast('Moved');
    } else {
      const k = d.el.dataset;
      p.slots.push({ d: di, t: t, mins: +k.mins || 45, topic: k.topic, kind: k.kind, lock: 0 });
      p.slots.sort((a, b) => (a.d + a.t) < (b.d + b.t) ? -1 : 1);
      ARM = null; MOVE = null; api.save(); api.render(); if (api.toast) api.toast('Added to the board');
    }
  }
  document.addEventListener('pointerdown', e => {
    if (e.button !== 0 || DRAG) return;
    const tgt = e.target;
    if (!tgt || !tgt.closest) return;
    const el = tgt.closest('.pl-tile[data-px="tile"], .pl-chip[data-px="pick"]');
    if (el && !tgt.closest('.pl-x')) {
      const api = window.__PLAPI; if (!api) return;
      const chip = el.classList.contains('pl-chip');
      if (chip) { const s = P(api).slots[+el.dataset.i]; if (!s || s.lock) return; }
      DRAG = { el: el, chip: chip, x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY, touch: e.pointerType !== 'mouse', started: false, over: null };
      if (DRAG.touch) DRAG.timer = setTimeout(beginDrag, 260);
      return;
    }
    /* grab the board or the exam calendar with the mouse to scroll it */
    if (e.pointerType !== 'mouse') return;
    const sc = tgt.closest('#pl-board, #pl-cal');
    if (!sc || tgt.closest('button, a, input, select, textarea, .pl-chip')) return;
    PAN = { el: sc, x: e.clientX, y: e.clientY, l: sc.scrollLeft, t: sc.scrollTop, moved: false };
  });
  document.addEventListener('pointermove', e => {
    if (DRAG) {
      DRAG.x = e.clientX; DRAG.y = e.clientY;
      const dist = Math.hypot(e.clientX - DRAG.x0, e.clientY - DRAG.y0);
      if (!DRAG.started) {
        if (DRAG.touch) { if (dist > 10) { clearTimeout(DRAG.timer); DRAG = null; } }   /* the finger moved first: that is a scroll */
        else if (dist > 5) beginDrag();
        return;
      }
      e.preventDefault(); track(e.clientX, e.clientY);
      return;
    }
    if (PAN) {
      const dx = e.clientX - PAN.x, dy = e.clientY - PAN.y;
      if (!PAN.moved && Math.hypot(dx, dy) > 4) { PAN.moved = true; PAN.el.classList.add('pan'); }
      if (PAN.moved) { PAN.el.scrollLeft = PAN.l - dx; PAN.el.scrollTop = PAN.t - dy; e.preventDefault(); }
    }
  }, { passive: false });
  document.addEventListener('pointerup', () => {
    if (DRAG) { endDrag(true); return; }
    if (PAN) { if (PAN.moved) NOCLICK = Date.now() + 300; PAN.el.classList.remove('pan'); PAN = null; }
  });
  document.addEventListener('pointercancel', () => {
    if (DRAG) endDrag(false);
    if (PAN) { PAN.el.classList.remove('pan'); PAN = null; }
  });
  /* while a finger is dragging a tile, the page must not scroll under it */
  document.addEventListener('touchmove', e => { if (DRAG && DRAG.started) e.preventDefault(); }, { passive: false });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && DRAG && DRAG.started) endDrag(false); });

  window.COURSE_PLUGINS = window.COURSE_PLUGINS || [];
  window.COURSE_PLUGINS.push({
    view: 'examplan', title: 'Exam dates & Study Planner',
    tile: { icon: '🗓️', meta: 'Your exam dates, and a study timetable you can lock, edit and rebuild.' },
    render: render,
    click(a, el, api) {
      const p = P(api), d = el.dataset;
      if (a === 'tog') {
        const k = d.k, v = d.v;
        const arr = (p.q[k] = p.q[k] || []).map(x => (k === 'days' ? Number(x) : x));
        const val = k === 'days' ? Number(v) : v;
        const at = arr.indexOf(val);
        if (at >= 0) arr.splice(at, 1); else arr.push(val);
        p.q[k] = arr; api.save(); return;
      }
      if (a === 'block') { p.q.block = d.v; api.save(); return; }
      if (a === 'len') { p.q.len = +d.v; api.save(); return; }
      if (a === 'make' || a === 'regen') {
        const per = $('#pl-per'); if (per) p.q.per = +per.value || 4;
        build(api, a === 'regen');
        p.view = ''; ARM = null; MOVE = null; api.go({ v: 'examplan', tab: 'plan' });
        if (api.toast) api.toast(a === 'regen' ? 'Open sessions rebuilt' : 'Timetable ready');
        return;
      }
      if (a === 'ttfull') { ttFull(api); return; }
      if (a === 'ttpdf') { ttPdf(api); return; }
      if (a === 'max') { setMax(api, d.v === '1'); return; }
      if (a === 'ttjump') {
        const t = document.getElementById('tt-p' + (+d.v || 1));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (a === 'ttprint') { window.print(); return; }
      if (a === 'let') { LET = (LET === d.v) ? null : d.v; api.render(); return; }
      if (a === 'ttgen') {
        if (p.tt && p.tt.lock) { if (api.toast) api.toast('Unlock it first'); return; }
        const keep = p.tt || {};
        p.tt = { at: iso(today()), lock: 0, subs: (p.subs || []).slice(), view: keep.view || 'month', cd: keep.cd === 0 ? 0 : 1 };
        TTM = null; TTW = null;
        api.save(); api.render();
        const el = document.getElementById('pl-mytt');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (api.toast) api.toast('Exam timetable ready');
        return;
      }
      if (a === 'ttlock') {
        if (!p.tt) return;
        p.tt.lock = p.tt.lock ? 0 : 1; api.save(); api.render();
        if (api.toast) api.toast(p.tt.lock ? 'Locked in place' : 'Unlocked \u2014 the subjects can be changed again');
        return;
      }
      if (a === 'ttdl') {
        if (!p.tt) return;
        const rows = ttRows(api, p.tt.subs || []);
        if (!rows.length) { if (api.toast) api.toast('Nothing to download yet'); return; }
        const t0 = today(), who = (X.level || 'CXC') + ' exam timetable';
        const base = slug(who + ' May June 2027');
        if (d.v === 'ics') {
          const ok1 = dlFile(base + '.ics', icsBlob(rows, who));
          if (api.toast) api.toast(ok1 ? 'Calendar file saved — open it to add the exams' : 'The browser blocked that download');
          return;
        }
        const head = ['Date', 'Day', 'Subject', 'Paper', 'Session', 'Starts', 'Time allowed', 'Days to go'];
        const body = rows.map(r => {
          const dd = fromIso(r.date), left = daysBetween(t0, dd);
          return [r.date, DAYS[dd.getDay()], r.subject || '', r.name || '', r.session || '', r.start || '', r.length || '', left >= 0 ? left : 'past'];
        });
        if (d.v === 'csv') {
          const ok2 = dlFile(base + '.csv', csvBlob(head, body));
          if (api.toast) api.toast(ok2 ? 'Spreadsheet saved' : 'The browser blocked that download');
          return;
        }
        const ok = dlFile(base + '.pdf', pdfBlob({
          title: 'Exam timetable — May/June 2027',
          sub: ((p.tt.subs || []).length + 1) + ' subjects, ' + rows.length + ' papers.' + (p.tt.lock ? ' Locked.' : ''),
          note: 'Taken from the official CXC timetable. Always check it against the copy your school gives you.',
          foot: 'Prepared ' + pretty(t0) + ' ' + t0.getFullYear() + '.',
          cols: [{ h: 'Date', w: 72 }, { h: 'Day', w: 28 }, { h: 'Subject', w: 186 }, { h: 'Paper', w: 60 }, { h: 'Session', w: 52 }, { h: 'Starts', w: 36 }, { h: 'Allowed', w: 58 }, { h: 'To go', w: 30 }],
          rows: body.map(r => { const dd = fromIso(r[0]); return [dd.getDate() + ' ' + MONTHS[dd.getMonth()] + ' ' + dd.getFullYear(), r[1], r[2], r[3], r[4], r[5], r[6], r[7] === 'past' ? '-' : r[7] + 'd']; })
        }));
        if (api.toast) api.toast(ok ? 'PDF saved' : 'The browser blocked that download');
        return;
      }
      if (a === 'pldl') {
        if (!p.slots.length) { if (api.toast) api.toast('Nothing on the board yet'); return; }
        const t0 = today();
        const head = ['Date', 'Day', 'Time', 'What', 'Minutes', 'Locked'];
        const body = p.slots.slice().sort((x, y) => (x.d + x.t) < (y.d + y.t) ? -1 : 1).map(x => {
          const dd = fromIso(x.d);
          const pre = x.kind === 'paper' ? 'Exam paper: ' : x.kind === 'subj' ? 'Revision: ' : x.kind === 'rest' ? 'Break: ' : '';
          return [x.d, DAYS[dd.getDay()], x.t, pre + (x.topic || ''), x.mins || 45, x.lock ? 'yes' : ''];
        });
        if (d.v === 'csv') {
          const ok3 = dlFile('study_timetable.csv', csvBlob(head, body));
          if (api.toast) api.toast(ok3 ? 'Spreadsheet saved' : 'The browser blocked that download');
          return;
        }
        const ok = dlFile('study_timetable.pdf', pdfBlob({
          land: true,
          title: 'Study timetable',
          sub: body.length + ' sessions' + (X.subject ? ' — built around ' + X.subject : ''),
          note: 'Locked sessions stay put when the plan is rebuilt.',
          foot: 'Prepared ' + pretty(t0) + ' ' + t0.getFullYear() + '.',
          cols: [{ h: 'Date', w: 96 }, { h: 'Day', w: 40 }, { h: 'Time', w: 50 }, { h: 'What', w: 434 }, { h: 'Minutes', w: 60 }, { h: 'Locked', w: 50 }],
          rows: body.map(r => { const dd = fromIso(r[0]); return [dd.getDate() + ' ' + MONTHS[dd.getMonth()] + ' ' + dd.getFullYear(), r[1], r[2], r[3], r[4], r[5]]; })
        }));
        if (api.toast) api.toast(ok ? 'PDF saved' : 'The browser blocked that download');
        return;
      }
      if (a === 'ttview') { if (!p.tt) return; p.tt.view = d.v; api.save(); api.render(); return; }
      if (a === 'ttcd') { if (!p.tt) return; p.tt.cd = (p.tt.cd === 0) ? 1 : 0; api.save(); api.render(); return; }
      if (a === 'ttmon') {
        const q = String(d.v).split('-');
        TTM = { y: +q[0], m: +q[1] };
        if (p.tt) { p.tt.view = 'month'; api.save(); }
        api.render(); return;
      }
      if (a === 'ttnav') {
        const v = +d.v, view = (p.tt && p.tt.view) || 'month';
        if (v === 0) {
          const n = today();
          TTM = { y: n.getFullYear(), m: n.getMonth() }; TTW = mondayOf(n);
        } else if (view === 'week') { TTW = addDays(TTW || mondayOf(today()), 7 * v); }
        else if (view === 'year') { TTM = { y: (TTM ? TTM.y : today().getFullYear()) + v, m: TTM ? TTM.m : 0 }; }
        else {
          const cur = TTM || { y: today().getFullYear(), m: today().getMonth() };
          const nx = new Date(cur.y, cur.m + v, 1, 12);
          TTM = { y: nx.getFullYear(), m: nx.getMonth() };
        }
        api.render(); return;
      }
      if (a === 'ttzoom') {
        TZ = Math.max(100, Math.min(300, TZ + (+d.v || 0)));
        const sc = document.getElementById('tt-scroll'); if (sc) sc.style.setProperty('--tz', TZ + '%');
        const lb = document.getElementById('tt-z'); if (lb) lb.textContent = TZ + '%';
        return;
      }
      if (a === 'sub') {
        if (p.tt && p.tt.lock) { if (api.toast) api.toast('The timetable is locked \u2014 unlock it to change subjects'); return; }
        const v = d.v, arr = (p.subs = p.subs || []);
        const at = arr.indexOf(v);
        if (at >= 0) arr.splice(at, 1); else arr.push(v);
        arr.sort();
        api.save(); api.render();
        if (d.from === 'tray' && at < 0 && api.toast) api.toast(v + ' added — its papers are now tiles');
        return;
      }
      if (a === 'subsclear') {
        if (p.tt && p.tt.lock) { if (api.toast) api.toast('The timetable is locked \u2014 unlock it first'); return; }
        p.subs = []; api.save(); api.render(); return;
      }
      if (a === 'tile') {
        ARM = { kind: d.kind, topic: d.topic, mins: +d.mins || 45 };
        MOVE = null; api.render(); return;
      }
      if (a === 'unarm') { ARM = null; MOVE = null; api.render(); return; }
      if (a === 'pick') {
        const i = +d.i;
        if (!p.slots[i]) return;
        if (p.slots[i].lock) { p.slots[i].lock = 0; api.save(); api.render(); return; }
        MOVE = (MOVE === i) ? null : i; ARM = null; api.render(); return;
      }
      if (a === 'cell') {
        const di = d.d, t = d.t;
        if (MOVE !== null && p.slots[MOVE]) {
          p.slots[MOVE].d = di; p.slots[MOVE].t = t; MOVE = null; api.save(); api.render();
          if (api.toast) api.toast('Moved');
          return;
        }
        if (ARM) {
          p.slots.push({ d: di, t: t, mins: ARM.mins, topic: ARM.topic, kind: ARM.kind, lock: 0 });
          p.slots.sort((x, y) => (x.d + x.t) < (y.d + y.t) ? -1 : 1);
          ARM = null; api.save(); api.render();
          if (api.toast) api.toast('Added to the board');
          return;
        }
        return;
      }
      if (a === 'wk') { WEEK = (+d.v === 0) ? 0 : WEEK + (+d.v) * spanOf(p); delete SC['pl-board']; api.render(); return; }
      if (a === 'span') { p.span = +d.v || 1; api.save(); delete SC['pl-board']; api.render(); return; }
      if (a === 'scr') {
        const bd = document.getElementById('pl-board'); if (!bd) return;
        const v = d.v;
        bd.scrollBy({ left: v === 'l' ? -396 : v === 'r' ? 396 : 0, top: v === 'u' ? -208 : v === 'd' ? 208 : 0, behavior: 'smooth' });
        return;
      }
      if (a === 'wkexam') {
        const t0 = iso(today());
        const all = papersFor(api).filter(x => x.date).sort((x, y) => (x.date + (x.start || '')) < (y.date + (y.start || '')) ? -1 : 1);
        const nx = all.find(x => x.date >= t0) || all[0];
        if (!nx) { if (api.toast) api.toast('No exam dates to show'); return; }
        WEEK = Math.round(daysBetween(mondayOf(today()), mondayOf(fromIso(nx.date))) / 7);
        PEND = { d: nx.date, t: (nx.start ? String(nx.start).slice(0, 2) + ':00' : '09:00') };
        delete SC['pl-board'];
        api.render();
        if (api.toast) api.toast(shortSub(nx.subject || X.subject) + ' ' + nx.name + ' — ' + pretty(fromIso(nx.date)));
        return;
      }
      if (a === 'list') { p.view = 'list'; api.save(); api.render(); return; }
      if (a === 'board') { p.view = ''; api.save(); api.render(); return; }
      if (a === 'lock') { const i = +d.i; if (p.slots[i]) { p.slots[i].lock = p.slots[i].lock ? 0 : 1; api.save(); api.render(); } return; }
      if (a === 'lockall') { p.slots.forEach(s => s.lock = 1); api.save(); api.render(); return; }
      if (a === 'unlockall') { p.slots.forEach(s => s.lock = 0); api.save(); api.render(); return; }
      if (a === 'drop') { const i = +d.i; p.slots.splice(i, 1); api.save(); api.render(); return; }
      if (a === 'clear') { p.slots = []; api.save(); api.render(); return; }
      if (a === 'print') { window.print(); return; }
      if (a === 'asgadd') {
        const t = $('#pl-at'), sub = $('#pl-as'), dd = $('#pl-ad');
        const title = t ? t.value.trim() : '', due = dd ? dd.value : '';
        if (!title || !due) { if (api.toast) api.toast('Add what is due and the date'); return; }
        p.asg.push({ title: title.slice(0, 80), subject: (sub ? sub.value.trim() : '').slice(0, 40), due: due });
        p.asg.sort((x, y) => x.due < y.due ? -1 : 1);
        api.save(); api.render();
        if (api.toast) api.toast('Added');
        return;
      }
      if (a === 'asgdrop') { p.asg.splice(+d.i, 1); api.save(); api.render(); return; }
    },
    mount(api) { window.__PLAPI = api; restoreScroll(); try { epMount(api); } catch (e) { } }
  });
})();
