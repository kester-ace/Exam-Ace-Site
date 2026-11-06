// Who's online, attendance and course statistics.
// Signed-in pages check in once a minute; sign-out closes the visit; a visit with no check-in for 5 minutes counts as ended at its last check-in.
// Netlify environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, STUDENT_LOGIN_DOMAIN.  Supabase: run supabase/presence.sql once.
const { json, sb } = require("../lib/user");
const URL_ = process.env.SUPABASE_URL, KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DOMAIN = (process.env.STUDENT_LOGIN_DOMAIN || "students.kestersmall.com").toLowerCase();
const TZ = process.env.SITE_TZ || "America/Lower_Princes";
const ONLINE_MS = 3 * 60000, STALE_MS = 5 * 60000;
const ret = { Prefer: "return=representation" };
const one = r => (Array.isArray(r) && r[0]) || null;
const iso = t => new Date(t).toISOString();
const PLACE = /^[a-z0-9-]{2,40}$/;
const dayOf = t => new Date(t).toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD in Sint Maarten time

async function who(event) {
  const token = (event.headers.authorization || event.headers.Authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return null;
  const r = await fetch(URL_ + "/auth/v1/user", { headers: { apikey: KEY, Authorization: "Bearer " + token } });
  if (!r.ok) return null;
  const u = await r.json();
  const p = one(await sb(`/rest/v1/profiles?id=eq.${u.id}&select=full_name,username,contact_email,role`)) || {};
  const real = e => e && !String(e).toLowerCase().endsWith("@" + DOMAIN) ? e : "";
  const parts = String(p.full_name || p.username || "").trim().split(/\s+/);
  return { id: u.id, role: p.role || "student", first: parts[0] || "", last: parts.slice(1).join(" "), email: real(p.contact_email) || real(u.email) };
}
const staff = me => me && (me.role === "teacher" || me.role === "admin");
const outAt = (s, now) => s.ended_at || (now - new Date(s.last_seen) > STALE_MS ? s.last_seen : null);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Use POST." });
  if (!URL_ || !KEY) return json(500, { error: "Statistics aren't connected yet." });
  let b; try { b = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "Bad request." }); }
  const now = Date.now();
  try {
    const me = await who(event);

    /* ---- the landing page: a few numbers for everyone, first names for signed-in people ---- */
    if (b.action === "summary") {
      const rows = await sb(`/rest/v1/sessions?select=user_id,role,first_name,last_name,where_now,last_seen&ended_at=is.null&last_seen=gte.${iso(now - ONLINE_MS)}&order=last_seen.desc&limit=500`);
      const seen = new Map(); rows.forEach(r => { if (!seen.has(r.user_id)) seen.set(r.user_id, r); });
      const L = Array.from(seen.values()), places = {};
      L.forEach(r => { if (r.where_now && r.where_now !== "dashboard") places[r.where_now] = (places[r.where_now] || 0) + 1; });
      const today = await sb(`/rest/v1/activity_minutes?select=user_id&day=eq.${dayOf(now)}&limit=5000`);
      const out = { online: L.length, students: L.filter(r => r.role === "student").length, teachers: L.filter(r => r.role !== "student").length,
        today: new Set(today.map(r => r.user_id)).size, places: Object.entries(places).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([place, n]) => ({ place, n })) };
      if (me) out.people = L.slice(0, 24).map(r => ({ name: (r.first_name || "Someone") + (r.last_name ? " " + r.last_name[0] + "." : ""), role: r.role, where: r.where_now }));
      return json(200, out);
    }

    if (!me) return json(401, { error: "Sign in again to continue." });

    /* ---- a visit starts ---- */
    if (b.action === "start") {
      if (b.sid && /^[0-9a-f-]{36}$/i.test(b.sid)) {
        const s = one(await sb(`/rest/v1/sessions?id=eq.${b.sid}&user_id=eq.${me.id}&select=id,last_seen,ended_at`));
        if (s && !s.ended_at && now - new Date(s.last_seen) < STALE_MS) return json(200, { sid: s.id, resumed: true });
      }
      const where = PLACE.test(b.where || "") ? b.where : "dashboard";
      const s = one(await sb(`/rest/v1/sessions`, { method: "POST", headers: ret, body: JSON.stringify({ user_id: me.id, role: me.role, first_name: me.first, last_name: me.last, email: me.email || null, started_at: iso(now), last_seen: iso(now), where_now: where, device: String(b.device || "").slice(0, 60) }) }));
      return json(200, { sid: s.id });
    }

    /* ---- once a minute while a page is open ---- */
    if (b.action === "beat") {
      if (!/^[0-9a-f-]{36}$/i.test(b.sid || "")) return json(400, { error: "No visit." });
      const s = one(await sb(`/rest/v1/sessions?id=eq.${b.sid}&user_id=eq.${me.id}&select=id,last_seen,ended_at`));
      if (!s || s.ended_at || now - new Date(s.last_seen) >= STALE_MS) return json(409, { restart: true });
      const where = PLACE.test(b.where || "") ? b.where : "dashboard";
      const counts = now - new Date(s.last_seen) >= 55000; /* two tabs open still count one minute */
      await sb(`/rest/v1/sessions?id=eq.${s.id}`, { method: "PATCH", body: JSON.stringify(counts ? { last_seen: iso(now), where_now: where } : { where_now: where }) });
      if (counts) await sb(`/rest/v1/rpc/add_minute`, { method: "POST", body: JSON.stringify({ p_user: me.id, p_day: dayOf(now), p_place: where }) });
      return json(200, { ok: true });
    }

    /* ---- sign-out ---- */
    if (b.action === "end") {
      if (/^[0-9a-f-]{36}$/i.test(b.sid || "")) await sb(`/rest/v1/sessions?id=eq.${b.sid}&user_id=eq.${me.id}&ended_at=is.null`, { method: "PATCH", body: JSON.stringify({ ended_at: iso(now), last_seen: iso(now) }) });
      return json(200, { ok: true });
    }

    /* ---- statistics inside a course ---- */
    if (b.action === "course") {
      const place = PLACE.test(b.course || "") ? b.course : null; if (!place) return json(400, { error: "Which course?" });
      const d30 = dayOf(now - 29 * 86400000), d7 = dayOf(now - 6 * 86400000), today = dayOf(now);
      const online = await sb(`/rest/v1/sessions?select=user_id,role,first_name,last_name,last_seen&ended_at=is.null&where_now=eq.${place}&last_seen=gte.${iso(now - ONLINE_MS)}&limit=300`);
      const onlineIds = new Set(online.map(r => r.user_id));
      if (!staff(me)) {
        const mine = await sb(`/rest/v1/activity_minutes?select=day,minutes&user_id=eq.${me.id}&place=eq.${place}&day=gte.${d30}`);
        const sum = f => mine.filter(f).reduce((a, r) => a + r.minutes, 0);
        return json(200, { role: "student", online: onlineIds.size, me: { today: sum(r => r.day === today), week: sum(r => r.day >= d7), month: sum(() => true), days: mine.filter(r => r.minutes > 0).length, byDay: mine.map(r => ({ day: r.day, minutes: r.minutes })) } });
      }
      const rows = await sb(`/rest/v1/activity_minutes?select=user_id,day,minutes&place=eq.${place}&day=gte.${d30}&limit=20000`);
      const ids = Array.from(new Set(rows.map(r => r.user_id).concat(Array.from(onlineIds))));
      const profs = ids.length ? await sb(`/rest/v1/profiles?select=id,full_name,username,contact_email,role&id=in.(${ids.join(",")})`) : [];
      const P = {}; profs.forEach(p => P[p.id] = p);
      const per = {}; rows.forEach(r => { const x = per[r.user_id] = per[r.user_id] || { today: 0, week: 0, month: 0, days: new Set(), last: "" }; x.month += r.minutes; if (r.day >= d7) x.week += r.minutes; if (r.day === today) x.today += r.minutes; x.days.add(r.day); if (r.day > x.last) x.last = r.day; });
      const isStaff = id => ['teacher', 'admin'].includes((P[id] || {}).role);
      const daily = {}; rows.filter(r => !isStaff(r.user_id)).forEach(r => { const d = daily[r.day] = daily[r.day] || { users: new Set(), minutes: 0 }; d.users.add(r.user_id); d.minutes += r.minutes; });
      const days = []; for (let i = 13; i >= 0; i--) { const d = dayOf(now - i * 86400000); days.push({ day: d, students: daily[d] ? daily[d].users.size : 0, minutes: daily[d] ? daily[d].minutes : 0 }); }
      const name = id => { const p = P[id] || {}; return p.full_name || p.username || "Unknown"; };
      const real = e => e && !String(e).toLowerCase().endsWith("@" + DOMAIN) ? e : "";
      return json(200, { role: "staff", online: online.map(r => ({ name: [r.first_name, r.last_name].filter(Boolean).join(" ") || name(r.user_id), role: r.role })),
        days, people: ids.filter(id => (P[id] || {}).role !== "teacher" && (P[id] || {}).role !== "admin").map(id => { const x = per[id] || { today: 0, week: 0, month: 0, days: new Set(), last: "" };
          return { name: name(id), email: real((P[id] || {}).contact_email), today: x.today, week: x.week, month: x.month, days: x.days.size, last: x.last, online: onlineIds.has(id) }; }).sort((a, b) => b.week - a.week || a.name.localeCompare(b.name)) });
    }

    /* ---- the attendance register ---- */
    if (b.action === "attendance") {
      if (!staff(me)) return json(403, { error: "Only teachers can download the attendance register." });
      const from = /^\d{4}-\d{2}-\d{2}$/.test(b.from || "") ? b.from : dayOf(now), to = /^\d{4}-\d{2}-\d{2}$/.test(b.to || "") ? b.to : from;
      const start = new Date(from + "T00:00:00-04:00").toISOString(), end = new Date(new Date(to + "T00:00:00-04:00").getTime() + 86400000).toISOString();
      const roleQ = b.everyone ? "" : "&role=eq.student";
      const rows = await sb(`/rest/v1/sessions?select=first_name,last_name,email,role,started_at,last_seen,ended_at&started_at=gte.${start}&started_at=lt.${end}${roleQ}&order=started_at&limit=10000`);
      return json(200, { from, to, rows: rows.map(s => { const out = outAt(s, now); return { first: s.first_name || "", last: s.last_name || "", email: s.email || "", role: s.role, in: s.started_at, out: out, still: !out, how: s.ended_at ? "signed out" : out ? "no activity" : "online now", minutes: Math.max(0, Math.round(((out ? new Date(out) : now) - new Date(s.started_at)) / 60000)) }; }) });
    }

    return json(400, { error: "Unknown request." });
  } catch (e) {
    console.error(e);
    return json(500, { error: "Statistics didn't load. Try again in a moment." });
  }
};
