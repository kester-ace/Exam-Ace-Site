// Virtual exam room: one endpoint for teachers (create, start, lock, messages, results) and students (join, poll, save, submit).
// The rules live in assets/exam/core.js (the same file runs the demo in the browser).
// Netlify environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, STUDENT_LOGIN_DOMAIN, plus the email settings in netlify/lib/mail.js
// Supabase: run supabase/exam-room.sql once.
const Core = require("../../assets/exam/core.js");
const { json, sb } = require("../lib/user");
const { sendMail } = require("../lib/mail");

const URL_ = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DOMAIN = (process.env.STUDENT_LOGIN_DOMAIN || "students.kestersmall.com").toLowerCase();
const enc = encodeURIComponent;
const one = (rows) => (Array.isArray(rows) && rows[0]) || null;
const ret = { Prefer: "return=representation" };

const db = {
  now: () => Date.now(),
  getRoom: async (id) => /^[0-9a-f-]{36}$/i.test(id) ? one(await sb(`/rest/v1/exam_rooms?id=eq.${id}&select=*`)) : null,
  getRoomByCode: async (code) => one(await sb(`/rest/v1/exam_rooms?code=eq.${enc(code)}&select=*`)),
  listRooms: async (tid) => sb(`/rest/v1/exam_rooms?teacher_id=eq.${tid}&select=*&order=created_at.desc&limit=50`),
  insertRoom: async (r) => one(await sb(`/rest/v1/exam_rooms`, { method: "POST", headers: ret, body: JSON.stringify(r) })),
  updateRoom: async (id, p) => one(await sb(`/rest/v1/exam_rooms?id=eq.${id}`, { method: "PATCH", headers: ret, body: JSON.stringify(p) })),
  deleteRoom: async (id) => sb(`/rest/v1/exam_rooms?id=eq.${id}`, { method: "DELETE" }),
  getSeats: async (rid) => sb(`/rest/v1/exam_seats?room_id=eq.${rid}&select=*&order=seat_no`),
  getSeat: async (id) => /^[0-9a-f-]{36}$/i.test(id) ? one(await sb(`/rest/v1/exam_seats?id=eq.${id}&select=*`)) : null,
  insertSeat: async (s) => one(await sb(`/rest/v1/exam_seats`, { method: "POST", headers: ret, body: JSON.stringify(s) })),
  updateSeat: async (id, p) => one(await sb(`/rest/v1/exam_seats?id=eq.${id}`, { method: "PATCH", headers: ret, body: JSON.stringify(p) })),
  deleteSeat: async (id) => sb(`/rest/v1/exam_seats?id=eq.${id}`, { method: "DELETE" }),
  addMessage: async (m) => one(await sb(`/rest/v1/exam_messages`, { method: "POST", headers: ret, body: JSON.stringify(m) })),
  listMessages: async (rid, after) => sb(`/rest/v1/exam_messages?room_id=eq.${rid}&id=gt.${Number(after) || 0}&select=*&order=id&limit=200`),
  addTurnaway: async (t) => one(await sb(`/rest/v1/exam_turnaways`, { method: "POST", headers: ret, body: JSON.stringify(t) })),
  listTurnaways: async (rid) => sb(`/rest/v1/exam_turnaways?room_id=eq.${rid}&select=*&order=at.desc`),
  updateTurnaway: async (id, p) => sb(`/rest/v1/exam_turnaways?id=eq.${Number(id)}`, { method: "PATCH", body: JSON.stringify(p) }),
  async putAudio(rid, data, mime) {
    const b64 = String(data).replace(/^data:[^,]*,/, "");
    const ext = /mp4|m4a|aac/.test(mime) ? "m4a" : /ogg/.test(mime) ? "ogg" : "webm";
    const path = `${rid}/${Date.now()}.${ext}`;
    await sb(`/storage/v1/object/exam-audio/${path}`, { method: "POST", raw: true, headers: { "Content-Type": mime.split(";")[0], "x-upsert": "true" }, body: Buffer.from(b64, "base64") });
    return path;
  },
  async putFile(path, data, mime) {
    const b64 = String(data).replace(/^data:[^,]*,/, "");
    await sb(`/storage/v1/object/exam-audio/${path}`, { method: "POST", raw: true, headers: { "Content-Type": mime, "x-upsert": "true", "Cache-Control": "no-store" }, body: Buffer.from(b64, "base64") });
    return path;
  },
  async removeFile(path) { await sb(`/storage/v1/object/exam-audio/${path}`, { method: "DELETE", raw: true }); },
  async audioUrl(path) {
    const r = await sb(`/storage/v1/object/sign/exam-audio/${path}`, { method: "POST", body: JSON.stringify({ expiresIn: 4 * 3600 }) });
    return URL_ + "/storage/v1" + (r.signedURL || r.signedUrl);
  },
  mail: (m) => sendMail(m),
  /* student ID records (supabase/identity.sql) */
  async idStatuses(seats) {
    const out = {}, uids = seats.filter(s => s.user_id).map(s => s.user_id), ems = seats.filter(s => !s.user_id && s.email).map(s => s.email.toLowerCase());
    try {
      if (uids.length) (await sb(`/rest/v1/profiles?select=id,id_status&id=in.(${uids.join(",")})`)).forEach(p => seats.filter(s => s.user_id === p.id).forEach(s => out[s.id] = p.id_status || "none"));
      if (ems.length) (await sb(`/rest/v1/profiles?select=contact_email,id_status&contact_email=in.(${ems.map(e => '"' + e.replace(/"/g, "") + '"').join(",")})`)).forEach(p => seats.filter(s => !s.user_id && (s.email || "").toLowerCase() === String(p.contact_email || "").toLowerCase()).forEach(s => out[s.id] = p.id_status || "none"));
    } catch (e) { }
    return out;
  },
  async identity(userId, email) {
    let p = null;
    if (userId) p = one(await sb(`/rest/v1/profiles?id=eq.${userId}&select=full_name,username,id_photo,id_doc,id_type,id_status,id_checked_by`));
    else if (email) p = one(await sb(`/rest/v1/profiles?contact_email=ilike.${enc(email)}&select=full_name,username,id_photo,id_doc,id_type,id_status,id_checked_by`));
    if (!p) return null;
    const sign = async path => { if (!path) return null; try { const r = await sb(`/storage/v1/object/sign/student-ids/${path}`, { method: "POST", body: JSON.stringify({ expiresIn: 600 }) }); return URL_ + "/storage/v1" + (r.signedURL || r.signedUrl); } catch (e) { return null; } };
    return { name: p.full_name || p.username, status: p.id_status || "none", id_type: p.id_type, checked_by: p.id_checked_by, photo: await sign(p.id_photo), doc: await sign(p.id_doc) };
  }
};

async function actorFrom(event) {
  const token = (event.headers.authorization || event.headers.Authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const r = await fetch(URL_ + "/auth/v1/user", { headers: { apikey: KEY, Authorization: "Bearer " + token } });
  if (!r.ok) return null;
  const u = await r.json();
  const p = one(await sb(`/rest/v1/profiles?id=eq.${u.id}&select=full_name,username,contact_email,role`)) || {};
  const real = (e) => e && !String(e).toLowerCase().endsWith("@" + DOMAIN) ? e : null;
  return { id: u.id, role: p.role || "student", name: p.full_name || p.username || "Student", email: real(p.contact_email) || real(u.email) };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Use POST." });
  if (!URL_ || !KEY) return json(500, { error: "The exam room isn't connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify." });
  let body; try { body = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "Bad request." }); }
  try {
    const actor = await actorFrom(event);
    const out = await Core.run(db, actor, String(body.action || ""), body);
    return json(200, out);
  } catch (e) {
    if (e.status) return json(e.status, Object.assign({ error: e.message }, e.extra || {}));
    console.error(e);
    return json(500, { error: "The exam room didn't respond. Try again in a moment." });
  }
};
