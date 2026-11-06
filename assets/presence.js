/* Who's online and the attendance register: signed-in pages check in once a minute.
   Kester Small */
(function () {
  if (window.Presence) return;
  const LIVE = !!(window.Auth && Auth.live);
  const KEY = "ea-presence-sid", DEMO = "ea-presence-demo";
  const ls = { get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }, del(k) { try { localStorage.removeItem(k); } catch (e) { } } };

  function where() {
    const p = location.pathname, h = decodeURIComponent(location.hash.slice(1)).replace(/-teacher$/, "");
    const m = p.match(/\/courses\/([a-z0-9-]+)\//); if (m) return m[1];
    if (/courses\.html$/.test(p)) return /^[a-z0-9-]{2,40}$/.test(h) ? h : "hub";
    if (/exam(-teacher)?\.html$/.test(p)) return "exam";
    if (/dashboard\.html$/.test(p)) return "dashboard";
    return "home";
  }
  async function call(action, body) {
    const t = await Auth.token();
    const r = await fetch("/.netlify/functions/presence", { method: "POST", headers: Object.assign({ "Content-Type": "application/json" }, t ? { Authorization: "Bearer " + t } : {}), body: JSON.stringify(Object.assign({ action }, body || {})), keepalive: action === "end" });
    const out = await r.json().catch(() => ({})); if (!r.ok) { const e = new Error(out.error || "Statistics didn't load."); e.status = r.status; e.data = out; throw e; } return out;
  }

  /* ---------- demo mode: this browser only ---------- */
  const D = () => ls.get(DEMO) || { sessions: [], minutes: {} };
  const dayOf = t => new Date(t).toLocaleDateString("en-CA");
  async function demoMe() { const me = await Auth.current(); if (!me) return null; const p = me.profile || {}; const w = String(p.full_name || p.username || "").split(/\s+/); return { id: me.user.id, role: p.role || "student", first: w[0] || "", last: w.slice(1).join(" "), email: [p.contact_email, me.user.email].find(e => e && !e.endsWith("@" + ((window.SITE_CONFIG || {}).studentLoginDomain || "students.local"))) || "" }; }
  const demo = {
    async start(b) { const me = await demoMe(); if (!me) return {}; const d = D(); const s = d.sessions.find(x => x.id === b.sid && !x.ended_at && Date.now() - new Date(x.last_seen) < 300000); if (s) return { sid: s.id, resumed: true };
      const id = "d" + Date.now().toString(36); d.sessions.push({ id, user_id: me.id, role: me.role, first_name: me.first, last_name: me.last, email: me.email, started_at: new Date().toISOString(), last_seen: new Date().toISOString(), ended_at: null, where_now: b.where }); ls.set(DEMO, d); return { sid: id }; },
    async beat(b) { const d = D(), s = d.sessions.find(x => x.id === b.sid); if (!s || s.ended_at) { const e = new Error("restart"); e.data = { restart: true }; throw e; }
      if (Date.now() - new Date(s.last_seen) >= 55000) { s.last_seen = new Date().toISOString(); const k = s.user_id + "|" + dayOf(Date.now()) + "|" + b.where; d.minutes[k] = (d.minutes[k] || 0) + 1; } s.where_now = b.where; ls.set(DEMO, d); return { ok: true }; },
    async end(b) { const d = D(), s = d.sessions.find(x => x.id === b.sid); if (s) { s.ended_at = s.last_seen = new Date().toISOString(); ls.set(DEMO, d); } return { ok: true }; },
    async summary() { const d = D(), on = d.sessions.filter(s => !s.ended_at && Date.now() - new Date(s.last_seen) < 180000); const me = await Auth.current().catch(() => null);
      return { online: on.length, students: on.filter(s => s.role === "student").length, teachers: on.filter(s => s.role !== "student").length, today: new Set(Object.keys(d.minutes).filter(k => k.split("|")[1] === dayOf(Date.now())).map(k => k.split("|")[0])).size, places: [], people: me ? on.map(s => ({ name: s.first_name + (s.last_name ? " " + s.last_name[0] + "." : ""), role: s.role, where: s.where_now })) : undefined }; },
    async attendance(b) { const d = D(); return { from: b.from, to: b.to, rows: d.sessions.filter(s => { const day = dayOf(s.started_at); return day >= b.from && day <= b.to && (b.everyone || s.role === "student"); }).map(s => { const stale = Date.now() - new Date(s.last_seen) > 300000; const out = s.ended_at || (stale ? s.last_seen : null); return { first: s.first_name, last: s.last_name, email: s.email, role: s.role, in: s.started_at, out, still: !out, how: s.ended_at ? "signed out" : out ? "no activity" : "online now", minutes: Math.round(((out ? new Date(out) : Date.now()) - new Date(s.started_at)) / 60000) }; }) }; }
  };
  const run = (a, b) => LIVE ? call(a, b) : demo[a](b || {});

  let sid = null, timer = 0, busy = false;
  async function start() {
    if (busy) return; busy = true;
    try { const me = await Auth.current(); if (!me) return; const r = await run("start", { sid: ls.get(KEY), where: where(), device: /Mobi|Android/i.test(navigator.userAgent) ? "phone" : "computer" }); if (r.sid) { sid = r.sid; ls.set(KEY, sid); } }
    catch (e) { } finally { busy = false; }
    clearInterval(timer); timer = setInterval(beat, 60000);
  }
  async function beat() {
    if (!sid || document.hidden) return;
    try { await run("beat", { sid, where: where() }); } catch (e) { if (e.data && e.data.restart) { ls.del(KEY); sid = null; start(); } }
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && sid) beat(); });
  window.addEventListener("hashchange", () => { if (sid) setTimeout(beat, 300); });

  /* sign-out closes the visit */
  if (window.Auth && Auth.signOut && !Auth.__presence) {
    const so = Auth.signOut.bind(Auth); Auth.__presence = true;
    Auth.signOut = async function () { try { if (sid) await run("end", { sid }); } catch (e) { } ls.del(KEY); sid = null; clearInterval(timer); return so(); };
  }

  window.Presence = { start, summary: () => run("summary"), attendance: (b) => run("attendance", b), course: (slug) => run("course", { course: slug }), where };
  if (!/[?&]embed=/.test(location.search)) start();
})();
