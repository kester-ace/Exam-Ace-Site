// Student ID checks: each student's photo and ID document, kept private.
// Students add or replace their own; teachers and administrators view them and mark them verified.
// Netlify environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.  Supabase: run supabase/identity.sql once.
const { json, whoIs, sb } = require("../lib/user");
const URL_ = process.env.SUPABASE_URL;
const one = r => (Array.isArray(r) && r[0]) || null;
const TYPES = ["School ID", "Passport", "National ID card", "Driver's licence", "Other"];

async function signed(path) {
  if (!path) return null;
  try { const r = await sb(`/storage/v1/object/sign/student-ids/${path}`, { method: "POST", body: JSON.stringify({ expiresIn: 600 }) }); return URL_ + "/storage/v1" + (r.signedURL || r.signedUrl); } catch (e) { return null; }
}
async function record(id) {
  const p = one(await sb(`/rest/v1/profiles?id=eq.${id}&select=id,full_name,username,contact_email,role,id_photo,id_doc,id_type,id_status,id_checked_at,id_checked_by,id_note`));
  if (!p) return null;
  return { user: p.id, name: p.full_name || p.username, email: p.contact_email, role: p.role, status: p.id_status || "none", id_type: p.id_type, checked_at: p.id_checked_at, checked_by: p.id_checked_by, note: p.id_note,
    photo: await signed(p.id_photo), doc: await signed(p.id_doc) };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Use POST." });
  let user; try { user = await whoIs(event); } catch (e) { return json(e.status || 500, { error: e.message }); }
  let b = {}; try { b = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "Bad request." }); }
  try {
    const me = one(await sb(`/rest/v1/profiles?id=eq.${user.id}&select=role,full_name`)) || {};
    const staff = me.role === "teacher" || me.role === "admin";

    if (b.action === "mine") return json(200, await record(user.id));

    if (b.action === "upload") {
      const kind = b.kind === "doc" ? "doc" : "photo", img = String(b.image || "");
      if (!/^data:image\/(jpeg|png|webp);base64,/.test(img)) return json(400, { error: "Choose a photo (JPG or PNG)." });
      if (img.length > 7 * 1024 * 1024) return json(413, { error: "That picture is too large. Try a smaller one." });
      const mime = img.slice(5, img.indexOf(";")), path = `${user.id}/${kind === "doc" ? "id" : "photo"}.${mime.split("/")[1].replace("jpeg", "jpg")}`;
      await sb(`/storage/v1/object/student-ids/${path}`, { method: "POST", raw: true, headers: { "Content-Type": mime, "x-upsert": "true" }, body: Buffer.from(img.replace(/^data:[^,]*,/, ""), "base64") });
      const patch = kind === "doc" ? { id_doc: path, id_type: TYPES.includes(b.id_type) ? b.id_type : "Other" } : { id_photo: path };
      patch.id_status = "submitted"; patch.id_checked_at = null; patch.id_checked_by = null; patch.id_note = null;
      await sb(`/rest/v1/profiles?id=eq.${user.id}`, { method: "PATCH", body: JSON.stringify(patch) });
      return json(200, await record(user.id));
    }

    if (!staff) return json(403, { error: "Only teachers can see student ID records." });

    if (b.action === "view") { if (!/^[0-9a-f-]{36}$/i.test(b.user || "")) return json(400, { error: "Which student?" }); const r = await record(b.user); return r ? json(200, r) : json(404, { error: "That student wasn't found." }); }
    if (b.action === "find") { /* match an invite-code guest to a record by email */
      const em = String(b.email || "").trim().toLowerCase(); if (!em) return json(200, null);
      const p = one(await sb(`/rest/v1/profiles?contact_email=ilike.${encodeURIComponent(em)}&select=id`)); return json(200, p ? await record(p.id) : null);
    }
    if (b.action === "verify") {
      if (!/^[0-9a-f-]{36}$/i.test(b.user || "")) return json(400, { error: "Which student?" });
      const status = b.status === "verified" ? "verified" : b.status === "rejected" ? "rejected" : null; if (!status) return json(400, { error: "Choose verified or not verified." });
      await sb(`/rest/v1/profiles?id=eq.${b.user}`, { method: "PATCH", body: JSON.stringify({ id_status: status, id_checked_at: new Date().toISOString(), id_checked_by: me.full_name || "Teacher", id_note: String(b.note || "").slice(0, 300) || null }) });
      return json(200, await record(b.user));
    }
    if (b.action === "list") {
      const st = ["submitted", "verified", "rejected", "none"].includes(b.status) ? b.status : "submitted";
      const rows = await sb(`/rest/v1/profiles?select=id,full_name,username,contact_email,id_status,id_type,id_checked_at&role=eq.student&id_status=eq.${st}&order=full_name&limit=300`);
      return json(200, { rows: rows.map(p => ({ user: p.id, name: p.full_name || p.username, email: p.contact_email, status: p.id_status, id_type: p.id_type, checked_at: p.id_checked_at })) });
    }
    return json(400, { error: "Unknown request." });
  } catch (e) { console.error(e); return json(500, { error: "The ID records didn't respond. Try again in a moment." }); }
};
