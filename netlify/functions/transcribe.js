// Turns an uploaded voice note into text for the student who owns it.
// Netlify → Environment variables: OPENAI_API_KEY (required), TRANSCRIBE_MODEL (optional, default whisper-1)
const { json, whoIs, sb } = require("../lib/user");
const MODEL = process.env.TRANSCRIBE_MODEL || "whisper-1";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Use POST." });
  if (!process.env.OPENAI_API_KEY) return json(500, { error: "Transcribing isn't switched on yet. Ask your teacher to add the transcription key." });
  let user; try { user = await whoIs(event); } catch (e) { return json(e.status || 500, { error: e.message }); }
  let body = {}; try { body = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "Bad request." }); }
  const id = String(body.voice_id || "");
  if (!/^[0-9a-f-]{36}$/i.test(id)) return json(400, { error: "That recording wasn't found." });

  try {
    // only the owner's own recording, and only from their own folder
    const rows = await sb(`/rest/v1/voice_notes?select=id,path,name,user_id&id=eq.${id}&user_id=eq.${user.id}`);
    if (!rows.length || !rows[0].path.startsWith(user.id + "/")) return json(404, { error: "That recording wasn't found." });
    const v = rows[0];
    const file = await sb("/storage/v1/object/voice-notes/" + v.path.split("/").map(encodeURIComponent).join("/"), { raw: true });
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length > 25 * 1024 * 1024) return json(413, { error: "That recording is over 25 MB. Split it into shorter parts." });

    const ext = (v.path.split(".").pop() || "webm").toLowerCase();
    const form = new FormData();
    form.append("file", new Blob([buf], { type: file.headers.get("content-type") || "audio/" + ext }), "voice." + ext);
    form.append("model", MODEL);
    form.append("response_format", "json");
    const r = await fetch("https://api.openai.com/v1/audio/transcriptions", { method: "POST", headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY }, body: form });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) return json(502, { error: "The recording couldn't be turned into text right now. Try again in a minute." });
    const text = String(out.text || "").trim();

    await sb(`/rest/v1/voice_notes?id=eq.${id}`, { method: "PATCH", body: JSON.stringify({ transcript: text }) });
    return json(200, { text });
  } catch (e) {
    return json(500, { error: "The recording couldn't be turned into text right now. Try again in a minute." });
  }
};
