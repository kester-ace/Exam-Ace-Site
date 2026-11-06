/* Virtual exam room: the rules, shared by the Netlify function (live site) and the browser (demo mode).
   Kester Small

   A teacher opens a room with a pool of questions. Students join with their login or the room's invite code,
   pick a seat, wait, then each gets their own paper: a random draw from the pool (avoiding the questions the
   students on either side and in front/behind have), in random order, with the options shuffled.
   The room stops letting people in once the late window has passed (20 minutes after the start by default)
   or when the teacher locks it. Anyone turned away sees why on screen and gets the same reason by email,
   and the teacher is told too.

   The storage layer is passed in (`db`), so the same rules run against Supabase or this browser.
   db: getRoom(id) getRoomByCode(code) listRooms(teacherId) insertRoom(r) updateRoom(id, patch) deleteRoom(id)
       getSeats(roomId) getSeat(id) insertSeat(s) updateSeat(id, patch) deleteSeat(id)
       addMessage(m) listMessages(roomId, afterId)
       addTurnaway(t) listTurnaways(roomId) updateTurnaway(id, patch)
       putAudio(roomId, base64, mime) → path      audioUrl(path) → url
       mail({ to, subject, eyebrow, title, intro, rows, footer })  (may throw; never blocks the room)
       now() → ms */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.ExamCore = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const MAX_POOL = 600, MAX_WRITTEN = 30, MAX_SEATS = 60, MAX_TEXT = 2000;

  function fail(status, message, extra) { const e = new Error(message); e.status = status; if (extra) e.extra = extra; throw e; }
  function rnd(n) {
    const c = (typeof crypto !== "undefined" && crypto.getRandomValues) ? crypto : (typeof require === "function" ? require("crypto").webcrypto : null);
    if (c) { const a = new Uint32Array(1); c.getRandomValues(a); return a[0] % n; }
    return Math.floor(Math.random() * n);
  }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function makeCode() { let s = ""; for (let i = 0; i < 6; i++) s += CODE_CHARS[rnd(CODE_CHARS.length)]; return s; }
  function makeSecret() { let s = ""; for (let i = 0; i < 32; i++) s += "abcdefghijklmnopqrstuvwxyz0123456789"[rnd(36)]; return s; }
  const str = (v, n) => String(v == null ? "" : v).trim().slice(0, n || 200);
  const iso = ms => new Date(ms).toISOString();
  const ms = s => (s ? new Date(s).getTime() : 0);
  const normEmail = e => str(e, 200).toLowerCase();
  const okEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function clock(t, tz) {
    try { return new Date(t).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz || "America/Lower_Princes" }); }
    catch (e) { return new Date(t).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }); }
  }

  /* options that point at other options ("Both A and B", "All of the above") keep their place */
  const FIXED = /\b(all|none|both|neither)\b.*\b(above|of these|a and|b and|a, b|options)\b|^\s*(a|b|c|d)\s+(and|or)\s+(a|b|c|d)\b|\b[ABCD] (and|or) [ABCD]\b/i;
  function optionOrder(opts) {
    const idx = opts.map((_, i) => i);
    if (opts.some(o => FIXED.test(String(o)))) return idx;
    return shuffle(idx);
  }

  /* ---------- the room's state at this moment ---------- */
  function cutoff(room) { return room.started_at ? ms(room.started_at) + (Number(room.late_min) || 0) * 60000 : 0; }
  function endsAt(room) { return room.started_at ? ms(room.started_at) + ((Number(room.duration_min) || 0) + (Number(room.extra_min) || 0)) * 60000 : 0; }
  const graceMs = room => (room.grace_min == null ? 15 : Math.max(0, Number(room.grace_min))) * 60000;
  /* this student's own end: the room's end, or later if the teacher gave them extra time or reopened their paper */
  function seatEnds(room, s) { return Math.max(endsAt(room), s && s.until ? ms(s.until) : 0); }
  /* papers hand themselves in when the grace period after time up runs out */
  function dueIn(room, s, now) { return room.duration_min ? seatEnds(room, s) + graceMs(room) - now : Infinity; }
  function phase(room, now) {
    if (room.status === "ended") return "ended";
    if (room.status === "live") return (room.duration_min && now >= endsAt(room)) ? "over" : "live";
    return "waiting";
  }
  /* why a NEW person may not come in right now ("" = they may) */
  function entryBlock(room, now) {
    const ph = phase(room, now);
    if (ph === "ended" || ph === "over") return "ended";
    if (room.locked) return "locked";
    if (ph === "waiting" && room.scheduled_at && now < ms(room.scheduled_at) - (Number(room.open_before) || 15) * 60000) return "early";
    if (ph === "live" && room.auto_lock !== false && Number(room.late_min) > 0 && now > cutoff(room)) return "late";
    return "";
  }
  function reasonText(reason, room) {
    const t = room.started_at ? clock(ms(room.started_at)) : "";
    const c = room.started_at ? clock(cutoff(room)) : "";
    if (reason === "late") return `Entry to this test closed at ${c}, ${room.late_min} minutes after it started at ${t}. Students who arrive after the first ${room.late_min} minutes can't be let in, so that everyone sits the test under the same conditions. Speak to your teacher about what happens next.`;
    if (reason === "locked") return "Your teacher has locked this exam room, so no one else can come in. Speak to your teacher about what happens next.";
    if (reason === "early") return `This test starts at ${clock(ms(room.scheduled_at))} on ${new Date(ms(room.scheduled_at)).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}. The room opens ${Number(room.open_before) || 15} minutes before that. Come back then with the same code.`;
    if (reason === "ended") return "This test has finished, so the exam room is closed. Speak to your teacher if you missed it.";
    return "You can't come into this exam room right now.";
  }
  const REASON_TITLE = { late: "Entry closed: you arrived after the first {n} minutes", locked: "The exam room is locked", ended: "This test has finished", early: "This exam room isn't open yet" };
  const MODES = { proctored: "Proctored: a live invigilator must be present", bot: "Bot-monitored: runs on its own, with automatic checks", unmonitored: "Unmonitored: runs on its own" };
  const INVIG_MS = 90000;
  const invigHere = (r, now) => !!(r.invig_seen && now - ms(r.invig_seen) < INVIG_MS);
  /* a proctored test pauses while no invigilator is watching */
  const paused = (r, now) => r.mode === "proctored" && r.status === "live" && phase(r, now) === "live" && !invigHere(r, now);
  /* scheduled tests start themselves (a proctored one only if the invigilator is there) */
  async function tick(db, r, now) {
    if (r.status === "waiting" && r.scheduled_at && now >= ms(r.scheduled_at) && (r.mode !== "proctored" || invigHere(r, now))) {
      r = await db.updateRoom(r.id, { status: "live", started_at: iso(Math.max(ms(r.scheduled_at), now - 60000)), cam_request: r.mode === "bot" ? true : !!r.cam_request });
      await db.addMessage({ room_id: r.id, kind: "system", body: "The test has started. Good luck!", created_at: iso(now) });
    }
    /* the exam bot's report when time is up */
    if (r.mode !== "proctored" && !r.reported && r.status === "live" && phase(r, now) === "over" && now > endsAt(r) + graceMs(r)) {
      r = await db.updateRoom(r.id, { reported: true });
      try { await botReport(db, r); } catch (e) { }
    }
    return r;
  }
  async function botReport(db, r) {
    if (!r.teacher_email || !okEmail(r.teacher_email)) return;
    const seats = await db.getSeats(r.id), flagged = seats.filter(s => (s.flags && s.flags.leaves) || s.blocked);
    const rows = [["Test", esc(r.title)], ["Seated", String(seats.length)], ["Handed in", String(seats.filter(s => s.status === "submitted").length)], ["Flagged", flagged.length ? flagged.map(s => esc(s.name) + " · left the page " + ((s.flags && s.flags.leaves) || 0) + " time(s)" + (s.blocked ? " · stopped by the exam bot" : "")).join("<br>") : "No one"]];
    await db.mail({ to: r.teacher_email, subject: `Exam report: ${r.title}`, eyebrow: "Exam room report", title: `${r.title} has finished`, intro: `This ${r.mode === "bot" ? "bot-monitored" : "unmonitored"} test ran on its own. Open the exam room console for every student's answers and marks.`, rows, footer: "You're receiving this because you set up this exam room." });
  }

  /* ---------- papers ---------- */
  function neighbours(seatNo, cols) {
    const out = [seatNo - 1, seatNo + 1, seatNo - cols, seatNo + cols];
    if (seatNo % cols === 1) out[0] = -1; /* first in a row has no left neighbour */
    if (seatNo % cols === 0) out[1] = -1;
    return out.filter(n => n > 0);
  }
  function drawPaper(room, seatNo, seats) {
    const pool = room.pool || [], n = Math.min(Number(room.per_student) || pool.length, pool.length);
    const near = new Set(neighbours(seatNo, Number(room.cols) || 6));
    const used = new Set(); seats.filter(s => near.has(s.seat_no) && s.paper).forEach(s => s.paper.mcq.forEach(q => used.add(q.qid)));
    /* how often each question is already out in the room: spread the pool evenly */
    const count = {}; seats.forEach(s => s.paper && s.paper.mcq.forEach(q => { count[q.qid] = (count[q.qid] || 0) + 1; }));
    const ranked = shuffle(pool).sort((a, b) => (used.has(a.id) - used.has(b.id)) || ((count[a.id] || 0) - (count[b.id] || 0)));
    const pick = shuffle(ranked.slice(0, n));
    return {
      mcq: pick.map(q => ({ qid: q.id, order: optionOrder(q.options || []) })),
      written: shuffle((room.written || []).map(w => w.id))
    };
  }
  function paperView(room, seat, course) {
    if (!seat.paper) return null;
    const P = {}; (room.pool || []).forEach(q => { P[q.id] = q; });
    const W = {}; (room.written || []).forEach(q => { W[q.id] = q; });
    const imgPath = p => (!p ? null : /^(https?:|data:|\/)/.test(p) ? p : "/courses/" + (course || room.course_slug) + "/student/" + p.replace(/^\.?\//, ""));
    return {
      mcq: seat.paper.mcq.map((x, i) => { const q = P[x.qid] || { stem: "(question missing)", options: [] }; return { qid: x.qid, n: i + 1, stem: q.stem, img: imgPath(q.img), options: x.order.map(k => q.options[k]) }; }),
      written: seat.paper.written.map((id, i) => { const q = W[id] || { stem: "(question missing)" }; return { qid: id, n: seat.paper.mcq.length + i + 1, stem: q.stem, marks: q.marks || null }; })
    };
  }
  function mark(room, seat) {
    const P = {}; (room.pool || []).forEach(q => { P[q.id] = q; });
    const a = seat.answers || {}; let score = 0;
    (seat.paper ? seat.paper.mcq : []).forEach(x => { const pos = a[x.qid]; const q = P[x.qid]; if (q && Number.isInteger(pos) && x.order[pos] === q.answer) score++; });
    return { score, total: seat.paper ? seat.paper.mcq.length : 0 };
  }

  /* ---------- who is acting ---------- */
  function mustTeach(actor) { if (!actor || !actor.id) fail(401, "Sign in to run an exam room."); if (actor.role !== "teacher" && actor.role !== "admin") fail(403, "Only teachers can run an exam room."); }
  async function ownRoom(db, actor, id) {
    mustTeach(actor);
    const r = await db.getRoom(str(id, 64)); if (!r) fail(404, "That exam room wasn't found.");
    /* the teacher who made it, any teacher acting as proctor (with the room's link), or the administrator */
    return r;
  }
  async function ownSeat(db, id, secret) {
    const s = await db.getSeat(str(id, 64)); if (!s || !secret || s.secret !== String(secret)) fail(404, "Your seat wasn't found. Join the room again with the code.");
    const r = await db.getRoom(s.room_id); if (!r) fail(404, "That exam room has been closed.");
    return { s, r };
  }

  /* ---------- emails (never block the room) ---------- */
  async function tellTurnedAway(db, room, who, reason) {
    const now = db.now(), title = (REASON_TITLE[reason] || "You couldn't enter the exam room").replace("{n}", room.late_min);
    const rows = [["Test", esc(room.title)], ["Teacher", esc(room.teacher_name || "")], ["You tried to enter at", esc(clock(now))]];
    if (room.started_at) rows.push(["Test started at", esc(clock(ms(room.started_at)))]);
    if (reason === "late") rows.push(["Entry closed at", esc(clock(cutoff(room)))]);
    const sent = { student: false, teacher: false };
    if (who.email && okEmail(who.email)) {
      try { await db.mail({ to: who.email, subject: `${room.title}: ${title}`, eyebrow: "Exam room", title, intro: esc(reasonText(reason, room)), rows,
        footer: "You're receiving this because you tried to enter an Exam Ace Tutorials exam room." }); sent.student = true; } catch (e) { }
    }
    if (room.teacher_email && okEmail(room.teacher_email)) {
      try { await db.mail({ to: room.teacher_email, subject: `Turned away from ${room.title}: ${who.name || who.email || "a student"}`, eyebrow: "Exam room",
        title: `${who.name || "A student"} was turned away`, intro: `They tried to enter after the room had closed to new entries. ${sent.student ? "They have been emailed the reason." : "They have no email address on file, so they only saw the message on screen."} You can let them in from the exam room console.`,
        rows: [["Student", esc(who.name || "—")], ["Email", esc(who.email || "none on file")], ["Reason", esc(title)], ["Tried at", esc(clock(now))]],
        footer: "You're receiving this because you're running this exam room." }); sent.teacher = true; } catch (e) { }
    }
    return sent;
  }

  /* ================= teacher ================= */
  function cleanPool(pool) {
    const seen = new Set(), out = [];
    (Array.isArray(pool) ? pool : []).slice(0, MAX_POOL).forEach((q, i) => {
      const options = (Array.isArray(q.options) ? q.options : []).map(o => str(o, 600)).filter(Boolean).slice(0, 8);
      const answer = Number(q.answer);
      if (!q.stem || options.length < 2 || !Number.isInteger(answer) || answer < 0 || answer >= options.length) return;
      let id = str(q.id || "q" + (i + 1), 80).replace(/[^\w.-]/g, "-"); while (seen.has(id)) id += "x"; seen.add(id);
      out.push({ id, stem: str(q.stem, MAX_TEXT * 2), img: q.img ? str(q.img, 300) : null, options, answer, explain: q.explain ? str(q.explain, MAX_TEXT) : null, set: q.set ? str(q.set, 80) : null, module: q.module ? str(q.module, 80) : null });
    });
    return out;
  }
  function cleanWritten(w) {
    return (Array.isArray(w) ? w : []).slice(0, MAX_WRITTEN).map((q, i) => ({ id: "w" + (i + 1), stem: str(q.stem, MAX_TEXT * 2), marks: Math.max(0, Math.min(100, Number(q.marks) || 0)) || null })).filter(q => q.stem);
  }
  const ROOM_FIELDS = ["title", "course_slug", "instructions", "per_student", "duration_min", "late_min", "auto_lock", "cols", "seats_n", "show_score"];
  function roomSettings(b) {
    const o = {};
    if ("title" in b) o.title = str(b.title, 120) || "Test";
    if ("course_slug" in b) o.course_slug = str(b.course_slug, 40).replace(/[^a-z0-9-]/g, "") || null;
    if ("instructions" in b) o.instructions = str(b.instructions, MAX_TEXT);
    if ("per_student" in b) o.per_student = Math.max(1, Math.min(200, Number(b.per_student) || 20));
    if ("duration_min" in b) o.duration_min = Math.max(0, Math.min(600, Number(b.duration_min) || 0));
    if ("late_min" in b) o.late_min = Math.max(0, Math.min(240, Number(b.late_min) === 0 ? 0 : (Number(b.late_min) || 20)));
    if ("auto_lock" in b) o.auto_lock = b.auto_lock !== false;
    if ("cols" in b) o.cols = Math.max(2, Math.min(10, Number(b.cols) || 6));
    if ("seats_n" in b) o.seats_n = Math.max(1, Math.min(MAX_SEATS, Number(b.seats_n) || 30));
    if ("show_score" in b) o.show_score = !!b.show_score;
    if ("mode" in b) o.mode = MODES[b.mode] ? b.mode : "proctored";
    if ("scheduled_at" in b) { const t = b.scheduled_at ? Date.parse(b.scheduled_at) : NaN; o.scheduled_at = isNaN(t) ? null : iso(t); }
    if ("open_before" in b) o.open_before = Math.max(0, Math.min(240, Number(b.open_before) || 15));
    if ("max_leaves" in b) o.max_leaves = Math.max(0, Math.min(50, Number(b.max_leaves) || 0));
    if ("grace_min" in b) o.grace_min = Math.max(0, Math.min(60, Number(b.grace_min) === 0 ? 0 : (Number(b.grace_min) || 15)));
    return o;
  }

  const T = {
    async create(db, actor, b) {
      mustTeach(actor);
      const pool = cleanPool(b.pool), written = cleanWritten(b.written);
      if (!pool.length && !written.length) fail(400, "Add some questions first: choose sets from the course bank or type your own.");
      let code = makeCode(); for (let i = 0; i < 5 && await db.getRoomByCode(code); i++) code = makeCode();
      const room = Object.assign({ title: "Test", per_student: 20, duration_min: 60, late_min: 20, auto_lock: true, cols: 6, seats_n: 30, show_score: false, instructions: "", mode: "proctored", scheduled_at: null, open_before: 15, max_leaves: 3, grace_min: 15 }, roomSettings(b), {
        code, teacher_id: actor.id, teacher_name: str(actor.name, 120), teacher_email: normEmail(actor.email) || null,
        status: "waiting", locked: false, pool, written, admitted: [], extra_min: 0, started_at: null, ended_at: null, created_at: iso(db.now()), invig_seen: null, reported: false
      });
      if (room.per_student > pool.length) room.per_student = pool.length || 0;
      return { room: summary(await db.insertRoom(room)) };
    },
    async list(db, actor) { mustTeach(actor); return { rooms: (await db.listRooms(actor.id)).map(summary) }; },
    async state(db, actor, b) {
      let r = await ownRoom(db, actor, b.room); const now = db.now();
      /* this console is the live invigilator: time lost while no one was watching a proctored test is given back */
      const patch = { invig_seen: iso(now) };
      if (r.mode === "proctored" && r.status === "live" && r.invig_seen && now - ms(r.invig_seen) >= INVIG_MS && ms(r.invig_seen) < endsAt(r)) { const lost = Math.ceil((now - ms(r.invig_seen)) / 60000); patch.extra_min = (Number(r.extra_min) || 0) + lost; await db.addMessage({ room_id: r.id, kind: "system", body: `The invigilator is back. ${lost} minute${lost > 1 ? "s were" : " was"} added for the pause.`, created_at: iso(now) }); }
      if (b.watch !== false) r = await db.updateRoom(r.id, patch);
      r = await tick(db, r, now);
      const [seats, turned, msgs] = await Promise.all([db.getSeats(r.id), db.listTurnaways(r.id), db.listMessages(r.id, 0)]);
      const alerts = [];
      seats.forEach(s => ((s.flags && s.flags.log) || []).forEach(ev => { if (ev.type === "left" || ev.type === "fullscreen") alerts.push({ key: s.id + "|" + ev.t + "|" + ev.d, seat: s.id, seat_no: s.seat_no, name: s.name, at: ev.t, what: /full ?screen/i.test(ev.d || "") || ev.type === "fullscreen" ? "left full screen" : "left the test page or opened another tab" }); }));
      const fromStudents = msgs.filter(m => m.kind === "student");
      for (const m of fromStudents) { const s = seats.find(x => x.id === m.seat_id); alerts.push({ key: "m" + m.id, seat: m.seat_id, seat_no: s ? s.seat_no : null, name: s ? s.name : "A student", at: m.created_at, what: m.audio ? "sent you a voice message" : (m.body || "needs you"), audio: m.audio ? await db.audioUrl(m.audio).catch(() => null) : null }); }
      alerts.sort((a, b) => String(b.at).localeCompare(String(a.at)));
      const camOut = async s => { const c = s.cam; if (!c || !c.on || !c.img) return { on: !!(c && c.on) }; let url = null; try { url = await db.audioUrl(c.img); } catch (e) { } return { on: true, at: c.at, url }; };
      const cams = await Promise.all(seats.map(camOut));
      let ids = {}; try { ids = db.idStatuses ? await db.idStatuses(seats) : {}; } catch (e) { }
      return {
        room: summary(r, now), now, alerts: alerts.slice(0, 80),
        seats: seats.map((s, i) => { const m = mark(r, s); return { id: s.id, seat_no: s.seat_no, name: s.name, email: s.email, status: s.status, joined_at: s.joined_at, last_seen: s.last_seen, submitted_at: s.submitted_at, cam: cams[i], record: ids[s.id] || "norecord", idcheck: s.idcheck || null,
          answered: Object.keys(s.answers || {}).filter(k => s.answers[k] !== "" && s.answers[k] != null).length, questions: s.paper ? s.paper.mcq.length + s.paper.written.length : 0,
          leaves: (s.flags && s.flags.leaves) || 0, late: (s.flags && s.flags.late) || 0, until: s.until || null, auto: !!s.auto, hand_in_at: r.duration_min && r.started_at ? iso(seatEnds(r, s) + graceMs(r)) : null, blocked: !!s.blocked, score: m.score, total: m.total, marks: s.marks || {} }; }).sort((a, b) => a.seat_no - b.seat_no),
        turned: turned.map(t => ({ id: t.id, name: t.name, email: t.email, reason: t.reason, at: t.at, emailed: t.emailed, admitted: (r.admitted || []).includes(t.key) })),
        messages: await Promise.all(msgs.filter(m => m.kind !== "student").map(m => msgOut(db, m)))
      };
    },
    async script(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); const s = await db.getSeat(str(b.seat, 64));
      if (!s || s.room_id !== r.id) fail(404, "That student wasn't found in this room.");
      const P = {}; (r.pool || []).forEach(q => { P[q.id] = q; });
      const W = {}; (r.written || []).forEach(q => { W[q.id] = q; });
      const a = s.answers || {};
      let cam = null; if (s.cam && s.cam.on && s.cam.img) { try { cam = { url: await db.audioUrl(s.cam.img), at: s.cam.at }; } catch (e) { } }
      let record = null; try { record = db.identity ? await db.identity(s.user_id, s.email) : null; } catch (e) { }
      return { name: s.name, seat_no: s.seat_no, email: s.email, guest: !s.user_id, record, idcheck: s.idcheck || null, score: mark(r, s), marks: s.marks || {}, cam,
        mcq: (s.paper ? s.paper.mcq : []).map((x, i) => { const q = P[x.qid] || { options: [] }; const pos = a[x.qid]; const chose = Number.isInteger(pos) ? x.order[pos] : null;
          return { n: i + 1, stem: q.stem, options: q.options, answer: q.answer, chose, right: chose === q.answer }; }),
        written: (s.paper ? s.paper.written : []).map(id => ({ qid: id, stem: (W[id] || {}).stem, marks: (W[id] || {}).marks, text: a[id] || "" })) };
    },
    async update(db, actor, b) {
      const r = await ownRoom(db, actor, b.room);
      const patch = roomSettings(b);
      if (r.status !== "waiting") ["per_student", "course_slug"].forEach(k => delete patch[k]);
      return { room: summary(await db.updateRoom(r.id, patch), db.now()) };
    },
    async start(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); if (r.status !== "waiting") fail(400, "This test has already started.");
      const now = db.now();
      const out = await db.updateRoom(r.id, { status: "live", started_at: iso(now), invig_seen: iso(now), cam_request: r.mode === "bot" ? true : !!r.cam_request });
      await db.addMessage({ room_id: r.id, kind: "system", body: "The test has started. Good luck!", created_at: iso(now) });
      return { room: summary(out, now) };
    },
    async lock(db, actor, b) { const r = await ownRoom(db, actor, b.room); return { room: summary(await db.updateRoom(r.id, { locked: !!b.locked }), db.now()) }; },
    async extend(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); const add = Math.max(-60, Math.min(240, Number(b.minutes) || 5));
      if (r.status === "ended") fail(409, "This test has finished. Use Reopen the test to give more time.");
      if (b.seat) { /* extra time for one student */
        const s = await db.getSeat(str(b.seat, 64)); if (!s || s.room_id !== r.id) fail(404, "That student wasn't found in this room.");
        const now = db.now(), base = Math.max(seatEnds(r, s), now);
        const patch = { until: iso(base + add * 60000) }; if (s.status === "submitted") Object.assign(patch, { status: "seated", submitted_at: null, auto: false });
        await db.updateSeat(s.id, patch); return { ok: true, until: patch.until };
      }
      const out = await db.updateRoom(r.id, { extra_min: Math.max(0, (Number(r.extra_min) || 0) + add) });
      await db.addMessage({ room_id: r.id, kind: "system", body: add > 0 ? `Your teacher has added ${add} minutes.` : `Your teacher has taken away ${-add} minutes.`, created_at: iso(db.now()) });
      return { room: summary(out, db.now()) };
    },
    /* reopen a finished test (everyone, or one student) with their saved answers */
    async reopen(db, actor, b) {
      const r = await ownRoom(db, actor, b.room), now = db.now(), mins = Math.max(1, Math.min(240, Number(b.minutes) || 10));
      const until = now + mins * 60000;
      if (b.seat) {
        const s = await db.getSeat(str(b.seat, 64)); if (!s || s.room_id !== r.id) fail(404, "That student wasn't found in this room.");
        if (r.status === "ended") await db.updateRoom(r.id, { status: "live", ended_at: null });
        await db.updateSeat(s.id, { status: "seated", submitted_at: null, auto: false, blocked: false, until: iso(until) });
        return { ok: true };
      }
      if (r.status === "waiting") fail(409, "This test hasn't started yet.");
      /* the whole room: move the end to now + minutes */
      const need = Math.ceil((until - endsAt(r)) / 60000), patch = { status: "live", ended_at: null, reported: false };
      if (need > 0) patch.extra_min = (Number(r.extra_min) || 0) + need;
      const out = await db.updateRoom(r.id, patch);
      const seats = await db.getSeats(r.id); let n = 0;
      for (const s of seats) if (s.status === "submitted" && (b.everyone || s.auto)) { await db.updateSeat(s.id, { status: "seated", submitted_at: null, auto: false }); n++; }
      await db.addMessage({ room_id: r.id, kind: "system", body: `Your teacher has reopened the test for ${mins} more minutes. Your saved answers are back on your paper.`, created_at: iso(now) });
      return { room: summary(out, now), reopened: n };
    },
    async end(db, actor, b) {
      const r = await ownRoom(db, actor, b.room), now = db.now();
      const seats = await db.getSeats(r.id);
      for (const s of seats) if (s.status === "seated") { const m = mark(r, s); await db.updateSeat(s.id, { status: "submitted", submitted_at: iso(now), score: m.score, total: m.total, auto: true }); }
      await db.addMessage({ room_id: r.id, kind: "system", body: "Time is up. Your answers have been handed in.", created_at: iso(now) });
      return { room: summary(await db.updateRoom(r.id, { status: "ended", ended_at: iso(now) }), now) };
    },
    async say(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); const body = str(b.text, MAX_TEXT); if (!body) fail(400, "Type a message first.");
      return { message: await msgOut(db, await db.addMessage({ room_id: r.id, kind: "text", body, created_at: iso(db.now()) })) };
    },
    async voice(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); const data = String(b.audio || "");
      if (!data) fail(400, "Nothing was recorded.");
      if (data.length > 6 * 1024 * 1024) fail(413, "That recording is too long. Keep voice messages under two minutes.");
      const mime = /^audio\/[\w.+-]+(;[\w=.-]+)?$/.test(String(b.mime || "")) ? b.mime : "audio/webm";
      const path = await db.putAudio(r.id, data, mime);
      return { message: await msgOut(db, await db.addMessage({ room_id: r.id, kind: "audio", body: str(b.text, 300), audio: path, secs: Math.round(Number(b.secs) || 0), created_at: iso(db.now()) })) };
    },
    async admit(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); const t = (await db.listTurnaways(r.id)).find(x => String(x.id) === String(b.turnaway));
      if (!t) fail(404, "That student wasn't found in the turned-away list.");
      const admitted = Array.from(new Set((r.admitted || []).concat(t.key)));
      await db.updateRoom(r.id, { admitted });
      if (t.email && okEmail(t.email)) { try { await db.mail({ to: t.email, subject: `${r.title}: you can come in now`, eyebrow: "Exam room", title: "Your teacher has let you in",
        intro: `Go back to the exam room and join again with the same ${t.user_id ? "login" : "name and email"}. Your room code is <b>${esc(r.code)}</b>.`, rows: [["Test", esc(r.title)]],
        footer: "You're receiving this because you tried to enter an Exam Ace Tutorials exam room." }); } catch (e) { } }
      return { ok: true };
    },
    async remove(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); const s = await db.getSeat(str(b.seat, 64));
      if (!s || s.room_id !== r.id) fail(404, "That student wasn't found in this room.");
      await db.deleteSeat(s.id); return { ok: true };
    },
    async marks(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); const s = await db.getSeat(str(b.seat, 64));
      if (!s || s.room_id !== r.id) fail(404, "That student wasn't found in this room.");
      const marks = {}; Object.entries(b.marks || {}).forEach(([k, v]) => { if (/^w\d+$/.test(k) && v !== "" && v != null) marks[k] = Math.max(0, Math.min(100, Number(v) || 0)); });
      await db.updateSeat(s.id, { marks }); return { ok: true };
    },
    /* the teacher's exam-day check: the person on camera matches the photo on record (or not) */
    async idcheck(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); const s = await db.getSeat(str(b.seat, 64));
      if (!s || s.room_id !== r.id) fail(404, "That student wasn't found in this room.");
      const st = b.status === "match" ? "match" : b.status === "mismatch" ? "mismatch" : null;
      await db.updateSeat(s.id, { idcheck: st ? { status: st, at: iso(db.now()), by: str(actor.name, 120) } : null });
      return { ok: true };
    },
    async unblock(db, actor, b) {
      const r = await ownRoom(db, actor, b.room); const s = await db.getSeat(str(b.seat, 64));
      if (!s || s.room_id !== r.id) fail(404, "That student wasn't found in this room.");
      await db.updateSeat(s.id, { blocked: false, flags: Object.assign({}, s.flags || {}, { allowance: ((s.flags && s.flags.leaves) || 0) }) });
      return { ok: true };
    },
    async camreq(db, actor, b) {
      const r = await ownRoom(db, actor, b.room), on = !!b.on;
      await db.updateRoom(r.id, { cam_request: on });
      await db.addMessage({ room_id: r.id, kind: "system", body: on ? "Your teacher has asked everyone to turn on their camera. Your microphone stays off unless you turn it on." : "Your teacher no longer needs your camera. You can turn it off.", created_at: iso(db.now()) });
      return { ok: true };
    },
    async remove_room(db, actor, b) { const r = await ownRoom(db, actor, b.room); await db.deleteRoom(r.id); return { ok: true }; }
  };
  function summary(r, now) {
    now = now || Date.now();
    return { id: r.id, code: r.code, title: r.title, course_slug: r.course_slug, instructions: r.instructions, status: r.status, phase: phase(r, now),
      per_student: r.per_student, pool_n: (r.pool || []).length, written_n: (r.written || []).length, duration_min: r.duration_min, extra_min: r.extra_min || 0,
      late_min: r.late_min, auto_lock: r.auto_lock !== false, locked: !!r.locked, cols: r.cols, seats_n: r.seats_n, show_score: !!r.show_score,
      started_at: r.started_at, ends_at: r.started_at && r.duration_min ? iso(endsAt(r)) : null, cutoff_at: r.started_at && r.late_min ? iso(cutoff(r)) : null,
      entry: entryBlock(r, now) || "open", cam_request: !!r.cam_request, mode: r.mode || "proctored", mode_text: MODES[r.mode || "proctored"], scheduled_at: r.scheduled_at || null, open_before: r.open_before, max_leaves: r.max_leaves, paused: paused(r, now), invig_here: invigHere(r, now), grace_min: graceMs(r) / 60000, created_at: r.created_at, ended_at: r.ended_at, teacher_name: r.teacher_name };
  }
  async function msgOut(db, m) {
    const o = { id: m.id, kind: m.kind, body: m.body, secs: m.secs || 0, at: m.created_at };
    if (m.audio) { try { o.audio = await db.audioUrl(m.audio); } catch (e) { o.audio = null; } }
    return o;
  }

  /* ================= students ================= */
  const S = {
    /* step 1: check the code and see the seats (nothing is saved yet) */
    async look(db, actor, b) {
      let room = await db.getRoomByCode(str(b.code, 12).toUpperCase()); if (!room) fail(404, "That room code wasn't found. Check it with your teacher.");
      const now = db.now(); room = await tick(db, room, now); const seats = await db.getSeats(room.id);
      const mine = actor && actor.id ? seats.find(s => s.user_id === actor.id) : null;
      return { room: publicRoom(room, now), taken: seats.map(s => s.seat_no), mine: mine ? { id: mine.id, seat_no: mine.seat_no } : null };
    },
    /* step 2: take a seat (or be turned away) */
    async join(db, actor, b) {
      let room = await db.getRoomByCode(str(b.code, 12).toUpperCase()); if (!room) fail(404, "That room code wasn't found. Check it with your teacher.");
      const now = db.now(); room = await tick(db, room, now);
      let who;
      if (actor && actor.id) who = { user_id: actor.id, name: str(actor.name, 120) || "Student", email: normEmail(actor.email) || null };
      else {
        const name = str(b.name, 120), email = normEmail(b.email);
        if (!name) fail(400, "Type your full name.");
        if (!okEmail(email)) fail(400, "Type your email address, so your teacher can reach you.");
        who = { user_id: null, name, email };
      }
      const key = who.user_id || ("e:" + who.email);
      const seats = await db.getSeats(room.id);
      /* coming back to a seat you already have (lost connection, new tab): always allowed */
      const back = seats.find(s => (who.user_id && s.user_id === who.user_id) || (!who.user_id && !s.user_id && s.email === who.email));
      if (back) {
        /* a guest proves it's them with the seat key their browser kept; on a new device the teacher frees the old seat */
        if (who.user_id || back.secret === String(b.secret || "")) return { seat: { id: back.id, secret: back.secret, seat_no: back.seat_no }, room: publicRoom(room, now), back: true };
        fail(409, `${back.name} (${who.email}) is already in seat ${back.seat_no} on another device. If that's you, ask your teacher to remove the old seat, then join again.`);
      }
      const block = (room.admitted || []).includes(key) ? "" : entryBlock(room, now);
      if (block === "early") fail(403, reasonText(block, room), { denied: block, title: REASON_TITLE.early, emailed: false, email: who.email, room: publicRoom(room, now) });
      if (block) {
        const prior = (await db.listTurnaways(room.id)).find(t => t.key === key && t.reason === block);
        let sent = { student: !!(prior && prior.emailed) };
        if (!prior) {
          const t = await db.addTurnaway({ room_id: room.id, key, user_id: who.user_id, name: who.name, email: who.email, reason: block, at: iso(now), emailed: false });
          sent = await tellTurnedAway(db, room, who, block);
          await db.updateTurnaway(t.id, { emailed: sent.student });
        }
        fail(403, reasonText(block, room), { denied: block, title: (REASON_TITLE[block] || "").replace("{n}", room.late_min), emailed: sent.student, email: who.email, room: publicRoom(room, now) });
      }
      const max = Number(room.seats_n) || 30, taken = new Set(seats.map(s => s.seat_no));
      if (taken.size >= max) fail(409, "Every seat in this room is taken. Tell your teacher.");
      let want = Number(b.seat_no);
      if (!Number.isInteger(want) || want < 1 || want > max || taken.has(want)) {
        if (Number.isInteger(want) && taken.has(want)) fail(409, `Seat ${want} has just been taken. Choose another seat.`, { taken: Array.from(taken) });
        want = 1; while (taken.has(want)) want++;
      }
      const seat = { room_id: room.id, user_id: who.user_id, name: who.name, email: who.email, seat_no: want, secret: makeSecret(), status: "seated", answers: {}, flags: { leaves: 0, log: [] }, marks: {},
        paper: room.status === "waiting" ? null : drawPaper(room, want, seats), joined_at: iso(now), last_seen: iso(now) };
      let saved;
      try { saved = await db.insertSeat(seat); }
      catch (e) { fail(409, `Seat ${want} has just been taken. Choose another seat.`, { taken: Array.from(taken).concat(want) }); }
      return { seat: { id: saved.id, secret: saved.secret, seat_no: saved.seat_no }, room: publicRoom(room, now) };
    },
    /* every few seconds: the clock, the teacher's messages, the paper once the test starts */
    async poll(db, actor, b) {
      let { s, r } = await ownSeat(db, b.seat, b.secret); const now = db.now();
      r = await tick(db, r, now);
      const ph = phase(r, now);
      /* papers are dealt when the test starts, so the waiting room never sees questions */
      if (!s.paper && (ph === "live" || ph === "over") && s.status === "seated") {
        const seats = await db.getSeats(r.id);
        s = await db.updateSeat(s.id, { paper: drawPaper(r, s.seat_no, seats.filter(x => x.id !== s.id)) });
      }
      if (s.status === "seated" && (ph === "ended" || (r.status === "live" && dueIn(r, s, now) <= 0))) { const m = mark(r, s); s = await db.updateSeat(s.id, { status: "submitted", submitted_at: iso(now), score: m.score, total: m.total, auto: true }); }
      else await db.updateSeat(s.id, { last_seen: iso(now) });
      const msgs = await db.listMessages(r.id, Number(b.since) || 0);
      const out = { room: publicRoom(r, now), now, seat_no: s.seat_no, name: s.name, status: s.status, cam_on: !!(s.cam && s.cam.on), messages: await Promise.all(msgs.filter(m => m.kind !== "student").map(m => msgOut(db, m))) };
      if (b.hall) out.taken = (await db.getSeats(r.id)).map(x => x.seat_no); /* the 3D hall shows which desks are filled (numbers only, no names) */
      out.blocked = !!s.blocked;
      if (r.duration_min && r.started_at) { out.my_ends_at = iso(seatEnds(r, s)); out.hand_in_at = iso(seatEnds(r, s) + graceMs(r)); out.grace_min = graceMs(r) / 60000; }
      if (s.status === "submitted") { out.submitted_at = s.submitted_at; if (r.show_score) out.score = mark(r, s); }
      else if (paused(r, now) || s.blocked) { /* no paper while the test is paused or this seat is stopped */ }
      else if (s.paper && !b.have_paper) { out.paper = paperView(r, s); out.answers = s.answers || {}; }
      return out;
    },
    async save(db, actor, b) {
      let { s, r } = await ownSeat(db, b.seat, b.secret); const now = db.now();
      if (s.status !== "seated") fail(409, "Your answers have already been handed in.");
      const ph = phase(r, now);
      if (ph === "waiting") fail(409, "The test hasn't started yet.");
      if (ph === "ended" || dueIn(r, s, now) <= -5000) fail(409, "Your answers have been handed in.");
      const late = r.duration_min && now > seatEnds(r, s);
      if (s.blocked) fail(409, "Your test has been stopped. Speak to your teacher.");
      const ids = new Set(s.paper ? s.paper.mcq.map(x => x.qid) : []), wids = new Set(s.paper ? s.paper.written : []);
      const answers = Object.assign({}, s.answers || {});
      Object.entries(b.answers || {}).forEach(([k, v]) => {
        if (ids.has(k)) { const n = Number(v); if (v === null || v === "") delete answers[k]; else if (Number.isInteger(n) && n >= 0 && n < 8) answers[k] = n; }
        else if (wids.has(k)) answers[k] = str(v, 20000);
      });
      const flags = Object.assign({ leaves: 0, log: [] }, s.flags || {});
      if (late && Object.keys(b.answers || {}).length) flags.late = (Number(flags.late) || 0) + 1; /* answers changed after time was up (in the grace period) */
      (Array.isArray(b.events) ? b.events : []).slice(0, 20).forEach(ev => { const type = str(ev && ev.type, 30); if (!type) return; if (type === "left") flags.leaves++; flags.log = (flags.log || []).concat({ t: iso(now), type, d: str(ev.d, 80) }).slice(-100); });
      const patch = { answers, flags, last_seen: iso(now) };
      /* the exam bot: too many times away from the test stops the paper until the teacher lets them carry on */
      const limit = Number(r.max_leaves) || 0, over = flags.leaves - (Number(flags.allowance) || 0);
      if (r.mode === "bot" && limit > 0 && over >= limit && !s.blocked) {
        patch.blocked = true;
        await db.addMessage({ room_id: r.id, kind: "student", seat_id: s.id, body: "stopped by the exam bot", created_at: iso(now) });
        if (r.teacher_email && okEmail(r.teacher_email)) { try { await db.mail({ to: r.teacher_email, subject: `Exam bot stopped ${s.name}'s test: ${r.title}`, eyebrow: "Exam room", title: `${s.name}'s test has been stopped`, intro: `They left the test ${flags.leaves} times (the limit is ${limit}). Their answers so far are saved. You can let them carry on from the exam room console.`, rows: [["Test", esc(r.title)], ["Seat", String(s.seat_no)]], footer: "You're receiving this because you set up this exam room." }); } catch (e) { } }
      }
      await db.updateSeat(s.id, patch);
      return { ok: true, saved: iso(now), blocked: !!patch.blocked };
    },
    /* a still from the student's camera every few seconds (their background choice already applied), or camera off */
    async cam(db, actor, b) {
      const { s, r } = await ownSeat(db, b.seat, b.secret); const now = db.now();
      if (b.off) { if (s.cam && s.cam.img) { try { await db.removeFile(s.cam.img); } catch (e) { } } await db.updateSeat(s.id, { cam: { on: false, at: iso(now) } }); return { ok: true }; }
      const img = String(b.image || ""); if (!/^data:image\/jpeg;base64,/.test(img) || img.length > 400000) fail(400, "That camera picture couldn't be sent.");
      const path = await db.putFile("cam/" + r.id + "/" + s.id + ".jpg", img, "image/jpeg");
      await db.updateSeat(s.id, { cam: { on: true, at: iso(now), img: path }, last_seen: iso(now) });
      return { ok: true };
    },
    /* the student's microphone: a short voice message to the teacher only */
    async speak(db, actor, b) {
      const { s, r } = await ownSeat(db, b.seat, b.secret); const data = String(b.audio || "");
      if (!data) fail(400, "Nothing was recorded."); if (data.length > 3 * 1024 * 1024) fail(413, "Keep your message under a minute.");
      const mime = /^audio\/[\w.+-]+(;[\w=.-]+)?$/.test(String(b.mime || "")) ? b.mime : "audio/webm";
      const path = await db.putAudio(r.id, data, mime);
      await db.addMessage({ room_id: r.id, kind: "student", seat_id: s.id, body: "", audio: path, secs: Math.round(Number(b.secs) || 0), created_at: iso(db.now()) });
      return { ok: true };
    },
    async submit(db, actor, b) {
      if (b.answers || b.events) { try { await S.save(db, actor, b); } catch (e) { if (e.status !== 409) throw e; } }
      const { s, r } = await ownSeat(db, b.seat, b.secret); const now = db.now();
      if (s.status === "submitted") return { ok: true, already: true, score: r.show_score ? mark(r, s) : undefined };
      const m = mark(r, s);
      await db.updateSeat(s.id, { status: "submitted", submitted_at: iso(now), score: m.score, total: m.total });
      return { ok: true, score: r.show_score ? m : undefined };
    }
  };
  function publicRoom(r, now) {
    return { code: r.code, title: r.title, teacher_name: r.teacher_name, instructions: r.instructions, status: r.status, phase: phase(r, now),
      duration_min: r.duration_min, started_at: r.started_at, ends_at: r.started_at && r.duration_min ? iso(endsAt(r)) : null,
      cutoff_at: r.started_at && r.late_min && r.auto_lock !== false ? iso(cutoff(r)) : null, late_min: r.late_min, locked: !!r.locked, entry: entryBlock(r, now) || "open", cam_request: !!r.cam_request,
      mode: r.mode || "proctored", scheduled_at: r.scheduled_at || null, open_before: r.open_before, paused: paused(r, now), max_leaves: r.mode === "bot" ? r.max_leaves : null,
      cols: r.cols, seats_n: r.seats_n, per_student: r.per_student, written_n: (r.written || []).length };
  }

  /* one entry point: run(db, actor, action, body) */
  const TEACHER = { create: T.create, list: T.list, state: T.state, script: T.script, update: T.update, start: T.start, lock: T.lock, extend: T.extend, end: T.end, say: T.say, voice: T.voice, admit: T.admit, remove: T.remove, marks: T.marks, camreq: T.camreq, idcheck: T.idcheck, unblock: T.unblock, reopen: T.reopen, remove_room: T.remove_room };
  const STUDENT = { look: S.look, join: S.join, poll: S.poll, save: S.save, submit: S.submit, cam: S.cam, speak: S.speak };
  async function run(db, actor, action, body) {
    const fn = TEACHER[action] || STUDENT[action];
    if (!fn) fail(400, "Unknown request.");
    return fn(db, actor, body || {});
  }
  return { run, MODES, reasonText, phase, entryBlock, shuffle, makeCode, _drawPaper: drawPaper, _mark: mark, _neighbours: neighbours, ROOM_FIELDS };
});
