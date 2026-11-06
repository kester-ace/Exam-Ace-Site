// Reads a page of handwriting from the notebook's paper and returns it as typed text.
// Netlify → Environment variables: OPENAI_API_KEY (required), HANDWRITING_MODEL (optional, default gpt-4o-mini)
const { json, whoIs } = require("../lib/user");
const MODEL = process.env.HANDWRITING_MODEL || "gpt-4o-mini";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Use POST." });
  if (!process.env.OPENAI_API_KEY) return json(500, { error: "Handwriting to text isn't switched on yet. Ask your teacher to add the key." });
  try { await whoIs(event); } catch (e) { return json(e.status || 500, { error: e.message }); }
  let body = {}; try { body = JSON.parse(event.body || "{}"); } catch (e) { return json(400, { error: "Bad request." }); }
  const image = String(body.image || "");
  if (!/^data:image\/(png|jpeg|webp);base64,/.test(image)) return json(400, { error: "Write something on the paper first." });
  if (image.length > 6 * 1024 * 1024) return json(413, { error: "That page is too big to read at once. Try a smaller area." });

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL, temperature: 0, max_tokens: 1500,
        messages: [
          { role: "system", content: "You transcribe a student's handwritten study notes. Return only the words written, in reading order, keeping line breaks and bullet points. Write diagrams or drawings as [diagram]. If a word is unclear, give your best reading followed by (?). Do not add, explain or correct anything." },
          { role: "user", content: [{ type: "text", text: "Transcribe this handwriting." }, { type: "image_url", image_url: { url: image, detail: "high" } }] }
        ]
      })
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) return json(502, { error: "The handwriting couldn't be read right now. Try again in a minute." });
    const text = String((out.choices && out.choices[0] && out.choices[0].message && out.choices[0].message.content) || "").trim();
    return json(200, { text });
  } catch (e) {
    return json(500, { error: "The handwriting couldn't be read right now. Try again in a minute." });
  }
};
