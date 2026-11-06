// Course gate: runs on Netlify before any file under /courses/ is served.
// Only signed-in people whose plan includes that course get through.
// Folder layout:  /courses/<slug>/student/...   and   /courses/<slug>/teacher/...
// Netlify environment variables: SUPABASE_URL, SUPABASE_ANON_KEY

const SB = Netlify.env.get("SUPABASE_URL");
const ANON = Netlify.env.get("SUPABASE_ANON_KEY");
const cache = new Map(); // token → { at, uid, admin, ents }  (kept for 2 minutes)

async function who(token) {
  const hit = cache.get(token);
  if (hit && Date.now() - hit.at < 120000) return hit;
  const h = { apikey: ANON, Authorization: "Bearer " + token };
  const u = await fetch(SB + "/auth/v1/user", { headers: h });
  if (!u.ok) return null;
  const user = await u.json();
  const [p, e] = await Promise.all([
    fetch(`${SB}/rest/v1/profiles?select=role&id=eq.${user.id}`, { headers: h }).then(r => r.json()),
    fetch(`${SB}/rest/v1/entitlements?select=course_slug,edition,expires_at,books&user_id=eq.${user.id}`, { headers: h }).then(r => r.json())
  ]);
  const rec = { at: Date.now(), uid: user.id, admin: Array.isArray(p) && p[0] && p[0].role === "admin", ents: Array.isArray(e) ? e : [] };
  if (cache.size > 500) cache.clear();
  cache.set(token, rec);
  return rec;
}

export default async (request, context) => {
  const url = new URL(request.url);
  /* "Try a section": the preview folder holds one section only, so anyone may open it */
  if (/^\/courses\/[a-z0-9-]+\/preview(\/|$)/.test(url.pathname)) return context.next();
  const m = url.pathname.match(/^\/courses\/([a-z0-9-]+)\/(student|teacher)(\/|$)/);
  const toSignIn = () => Response.redirect(new URL(`/?signin=1&next=${encodeURIComponent(url.pathname)}`, url), 302);
  if (!m) return Response.redirect(new URL("/dashboard.html", url), 302);
  if (!SB || !ANON) return new Response("Course access isn't set up yet.", { status: 503 });

  const token = context.cookies.get("ks-access");
  if (!token) return toSignIn();

  let me;
  try { me = await who(token); } catch (e) { return new Response("Sign-in service unavailable. Please try again shortly.", { status: 503 }); }
  if (!me) return toSignIn();

  const [, slug, edition] = m;
  const now = Date.now();
  const mine = me.ents.filter(e =>
    (e.course_slug === slug || e.course_slug === "all") &&
    (!e.expires_at || new Date(e.expires_at).getTime() > now) &&
    (edition === "student" || e.edition === "teacher"));
  const allowed = me.admin || mine.length > 0;

  if (!allowed) return Response.redirect(new URL(`/dashboard.html?locked=${slug}`, url), 302);

  /* The flipbook textbook comes with Subject Plus and above. Without it the course
     simply doesn't receive the flipbook script, so its Flipbook button never appears. */
  if (/\/tools\/flipbook\.js$/.test(url.pathname) && !me.admin && !mine.some(e => e.books !== false)) {
    return new Response("/* The flipbook textbook isn't included in this plan. */", {
      status: 200, headers: { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "private, no-store" } });
  }

  const res = await context.next();
  const out = new Response(res.body, res);
  out.headers.set("Cache-Control", "private, no-store");
  return out;
};

export const config = { path: "/courses/*" };
