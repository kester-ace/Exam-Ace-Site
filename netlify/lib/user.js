// Shared helpers for study-tool functions: check who is signed in, talk to Supabase with the service key.
const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const json = (status, body) => ({ statusCode: status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }, body: JSON.stringify(body) });

async function whoIs(event) {
  if (!URL_ || !KEY) { const e = new Error("Study tools aren't connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Netlify."); e.status = 500; throw e; }
  const token = (event.headers.authorization || event.headers.Authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) { const e = new Error("Sign in again to continue."); e.status = 401; throw e; }
  const r = await fetch(URL_ + "/auth/v1/user", { headers: { apikey: KEY, Authorization: "Bearer " + token } });
  if (!r.ok) { const e = new Error("Your session has ended. Sign in again."); e.status = 401; throw e; }
  return r.json();
}

async function sb(path, opts = {}) {
  const res = await fetch(URL_ + path, { ...opts, headers: { apikey: KEY, Authorization: "Bearer " + KEY, ...(opts.raw ? {} : { "Content-Type": "application/json" }), ...(opts.headers || {}) } });
  if (opts.raw) { if (!res.ok) throw new Error("Storage said " + res.status); return res; }
  const text = await res.text(); let data = null; try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
  if (!res.ok) throw new Error((data && (data.message || data.error)) || res.statusText);
  return data;
}

module.exports = { json, whoIs, sb };
