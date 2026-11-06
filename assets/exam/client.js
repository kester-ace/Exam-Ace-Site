/* Exam room client: talks to the exam-room function on the live site, or runs the same rules in this browser in demo mode.
   Kester Small */
(function () {
  const LIVE = !!(window.Auth && Auth.live);
  const DEMO_KEY = "ea-exam-demo";

  /* ---------- demo storage (this browser only; open the teacher and student pages in two tabs) ---------- */
  /* this browser's storage, or (where a preview blocks it) memory shared with the page this one is shown inside */
  const MEM = (() => { try { return window.top.document && window.top; } catch (e) { return window; } })();
  let lsOK = true; try { localStorage.setItem("ea-exam-test", "1"); localStorage.removeItem("ea-exam-test"); } catch (e) { lsOK = false; }
  const load = () => { try { if (lsOK) return JSON.parse(localStorage.getItem(DEMO_KEY)) || null; } catch (e) { } try { return MEM.__eaExamDemo ? JSON.parse(MEM.__eaExamDemo) : null; } catch (e) { return null; } };
  const st = () => load() || { rooms: [], seats: [], msgs: [], turn: [], outbox: [], n: 0 };
  const put = (d) => { const j = JSON.stringify(d); if (lsOK) { try { localStorage.setItem(DEMO_KEY, j); return; } catch (e) { lsOK = false; } } try { MEM.__eaExamDemo = j; } catch (e) { window.__eaExamDemo = j; } };
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "x" + Date.now().toString(36) + Math.random().toString(36).slice(2));
  const copy = (o) => (o ? JSON.parse(JSON.stringify(o)) : null);
  function edit(fn) { const d = st(); const out = fn(d); put(d); return copy(out); }
  const LocalDB = {
    now: () => Date.now(),
    getRoom: async (id) => copy(st().rooms.find(r => r.id === id)),
    getRoomByCode: async (c) => copy(st().rooms.find(r => r.code === c)),
    listRooms: async (t) => copy(st().rooms.filter(r => r.teacher_id === t).sort((a, b) => b.created_at.localeCompare(a.created_at))),
    insertRoom: async (r) => edit(d => { r.id = uid(); d.rooms.push(r); return r; }),
    updateRoom: async (id, p) => edit(d => Object.assign(d.rooms.find(r => r.id === id), p)),
    deleteRoom: async (id) => edit(d => { d.rooms = d.rooms.filter(r => r.id !== id); d.seats = d.seats.filter(s => s.room_id !== id); d.msgs = d.msgs.filter(m => m.room_id !== id); d.turn = d.turn.filter(t => t.room_id !== id); }),
    getSeats: async (rid) => copy(st().seats.filter(s => s.room_id === rid)),
    getSeat: async (id) => copy(st().seats.find(s => s.id === id)),
    insertSeat: async (s) => edit(d => { if (d.seats.some(x => x.room_id === s.room_id && x.seat_no === s.seat_no)) throw new Error("taken"); s.id = uid(); d.seats.push(s); return s; }),
    updateSeat: async (id, p) => edit(d => Object.assign(d.seats.find(s => s.id === id), p)),
    deleteSeat: async (id) => edit(d => { d.seats = d.seats.filter(s => s.id !== id); }),
    addMessage: async (m) => edit(d => { m.id = ++d.n; d.msgs.push(m); return m; }),
    listMessages: async (rid, after) => copy(st().msgs.filter(m => m.room_id === rid && m.id > after)),
    addTurnaway: async (t) => edit(d => { t.id = ++d.n; d.turn.push(t); return t; }),
    listTurnaways: async (rid) => copy(st().turn.filter(t => t.room_id === rid).sort((a, b) => b.at.localeCompare(a.at))),
    updateTurnaway: async (id, p) => edit(d => Object.assign(d.turn.find(t => t.id === id), p)),
    putAudio: async (rid, data, mime) => (String(data).startsWith("data:") ? data : "data:" + mime + ";base64," + data),
    audioUrl: async (p) => p,
    putFile: async (path, data) => data,
    idStatuses: async (seats) => { const d = (() => { try { return JSON.parse(localStorage.getItem("ks-demo-db")) || { users: [] }; } catch (e) { return { users: [] }; } })(), out = {};
      seats.forEach(s => { const u = d.users.find(x => (s.user_id && x.id === s.user_id) || (!s.user_id && s.email && [(x.contact_email || "").toLowerCase(), (x.email || "").toLowerCase()].includes(s.email.toLowerCase()))); if (u) out[s.id] = u.id_status || "none"; }); return out; },
    identity: async (userId, email) => { const d = (() => { try { return JSON.parse(localStorage.getItem("ks-demo-db")) || { users: [] }; } catch (e) { return { users: [] }; } })();
      const u = d.users.find(x => (userId && x.id === userId) || (!userId && email && [(x.contact_email || "").toLowerCase(), (x.email || "").toLowerCase()].includes(email.toLowerCase())));
      return u ? { name: u.full_name || u.username, status: u.id_status || "none", id_type: u.id_type || null, checked_by: u.id_checked_by || null, photo: u.id_photo || null, doc: u.id_doc || null } : null; },
    removeFile: async () => { },
    mail: async (m) => { edit(d => { d.outbox.unshift({ to: m.to, subject: m.subject, at: new Date().toISOString() }); d.outbox = d.outbox.slice(0, 50); }); try { window.dispatchEvent(new CustomEvent("exam-demo-mail", { detail: m })); } catch (e) { } }
  };

  let forced = null;
  async function actor() {
    if (forced) return forced;
    if (!window.Auth) return null;
    const me = await Auth.current(); if (!me) return null;
    const p = me.profile || {};
    const dom = "@" + ((window.SITE_CONFIG || {}).studentLoginDomain || "students.local");
    const em = p.contact_email || me.user.email || "";
    return { id: me.user.id, role: p.role || "student", name: p.full_name || p.username || "Student", email: em.endsWith(dom) ? null : em };
  }

  /* call(action, body, { guest }) — guest: don't send the login (invite-code entry) */
  async function call(action, body, opt) {
    opt = opt || {};
    if (!LIVE) {
      try { return await ExamCore.run(LocalDB, opt.guest ? null : await actor(), action, Object.assign({}, body)); }
      catch (e) { const err = new Error(e.message); err.status = e.status || 500; err.data = e.extra || {}; throw err; }
    }
    const headers = { "Content-Type": "application/json" };
    if (!opt.guest) { const t = await Auth.token(); if (t) headers.Authorization = "Bearer " + t; }
    let res;
    try { res = await fetch("/.netlify/functions/exam-room", { method: "POST", headers, body: JSON.stringify(Object.assign({ action }, body)) }); }
    catch (e) { const err = new Error("You're offline. Your answers are kept on this device and will be sent when you're back online."); err.status = 0; err.offline = true; throw err; }
    const out = await res.json().catch(() => ({}));
    if (!res.ok) { const err = new Error(out.error || "The exam room didn't respond. Try again in a moment."); err.status = res.status; err.data = out; throw err; }
    return out;
  }
  window.ExamAPI = { live: LIVE, call, actor, demoTeacher() { forced = { id: "u-teacher", role: "teacher", name: "Demo Teacher", email: null }; return forced; }, demoOutbox: () => st().outbox, demoClear: () => { try { localStorage.removeItem(DEMO_KEY); } catch (e) { } } };
})();
