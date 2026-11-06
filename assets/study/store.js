/* My Notebook: where notes, sketches and voice notes are kept.
   Signed in on the live site → the student's Exam Ace account (database + private audio storage).
   Demo or offline → this device (IndexedDB). Same functions either way. */
(function () {
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : "n" + Date.now().toString(36) + Math.random().toString(36).slice(2));

  /* ---------- this device ---------- */
  function idb() {
    return new Promise((res, rej) => {
      const r = indexedDB.open("ea-notebook", 2);
      r.onupgradeneeded = () => { const d = r.result;
        if (!d.objectStoreNames.contains("notes")) d.createObjectStore("notes", { keyPath: "id" });
        if (!d.objectStoreNames.contains("voice")) { const v = d.createObjectStore("voice", { keyPath: "id" }); v.createIndex("note", "note_id"); }
        if (!d.objectStoreNames.contains("palaces")) d.createObjectStore("palaces", { keyPath: "id" }); };
      r.onsuccess = () => res(r.result); r.onerror = () => rej(new Error("This browser can't save notes on the device. Try another browser, or sign in to save to your account."));
    });
  }
  const tx = async (store, mode, fn) => { const d = await idb(); return new Promise((res, rej) => { const t = d.transaction(store, mode); const s = t.objectStore(store); const out = fn(s); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error); }); };
  const all = (store) => tx(store, "readonly", s => s.getAll());

  const Local = {
    mode: "device",
    async listNotes() { return (await all("notes")).map(({ id, course_slug, topic, kind, title, updated_at }) => ({ id, course_slug, topic, kind, title, updated_at })).sort((a, b) => b.updated_at.localeCompare(a.updated_at)); },
    async getNote(id) { return tx("notes", "readonly", s => s.get(id)); },
    async saveNote(n) { n.updated_at = new Date().toISOString(); if (!n.id) { n.id = uid(); n.created_at = n.updated_at; } await tx("notes", "readwrite", s => s.put(n)); return n; },
    async deleteNote(id) { const v = await this.listVoice(id); await tx("voice", "readwrite", s => v.forEach(x => s.delete(x.id))); await tx("notes", "readwrite", s => s.delete(id)); },
    async listVoice(noteId) { return (await all("voice")).filter(v => v.note_id === noteId).sort((a, b) => a.created_at.localeCompare(b.created_at)).map(v => ({ ...v })); },
    async addVoice(noteId, blob, meta) { const v = { id: uid(), note_id: noteId, blob, created_at: new Date().toISOString(), ...meta }; await tx("voice", "readwrite", s => s.put(v)); return v; },
    async updateVoice(v, patch) { const cur = await tx("voice", "readonly", s => s.get(v.id)); Object.assign(cur, patch); await tx("voice", "readwrite", s => s.put(cur)); return cur; },
    async deleteVoice(v) { await tx("voice", "readwrite", s => s.delete(v.id)); },
    async voiceUrl(v) { return URL.createObjectURL(v.blob); },
    async transcribe() { throw new Error("Transcribing uploaded recordings works on the live Exam Ace site, once you're signed in."); },
    async handwriting(png, strokes) { const t = await localInk(strokes); if (t != null) return t; throw new Error("Converting handwriting works on the live Exam Ace site, once you're signed in."); },
    async listPalaces() { return (await all("palaces")).sort((a, b) => b.updated_at.localeCompare(a.updated_at)); },
    async savePalace(p) { p.updated_at = new Date().toISOString(); if (!p.id) p.id = uid(); await tx("palaces", "readwrite", s => s.put(p)); return p; },
    async deletePalace(id) { await tx("palaces", "readwrite", s => s.delete(id)); }
  };

  /* Some devices (for example Chromebooks) can read handwriting themselves, at no cost */
  async function localInk(strokes) {
    try {
      if (!navigator.createHandwritingRecognizer || !strokes || !strokes.length) return null;
      const rec = await navigator.createHandwritingRecognizer({ languages: ["en"] });
      const drawing = rec.startDrawing({ recognitionType: "text" });
      strokes.forEach(s => { if (s.t === "hl") return; const st = new HandwritingStroke(); for (let i = 0; i < s.p.length; i += 2) st.addPoint({ x: s.p[i], y: s.p[i + 1], t: i * 8 }); drawing.addStroke(st); });
      const res = await drawing.getPrediction(); drawing.clear(); rec.finish();
      return res && res[0] ? res[0].text : null;
    } catch (e) { return null; }
  }

  /* ---------- the student's account ---------- */
  function Live(sb, getToken) {
    const BUCKET = "voice-notes";
    const me = async () => { const { data: { session } } = await sb.auth.getSession(); if (!session) throw new Error("Sign in again to save your notes."); return session.user.id; };
    const fail = (e, what) => { if (e) throw new Error(what + " Check your connection and try again."); };
    const post = async (fn, body) => {
      const r = await fetch("/.netlify/functions/" + fn, { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + (await getToken()) }, body: JSON.stringify(body) });
      const out = await r.json().catch(() => ({})); if (!r.ok) throw new Error(out.error || "That didn't work. Try again in a minute."); return out;
    };
    return {
      mode: "account",
      async listNotes() { const { data, error } = await sb.from("notes").select("id,course_slug,topic,kind,title,updated_at").order("updated_at", { ascending: false }); fail(error, "Your notes didn't load."); return data || []; },
      async getNote(id) { const { data, error } = await sb.from("notes").select("*").eq("id", id).single(); fail(error, "That note didn't open."); return data; },
      async saveNote(n) {
        const row = { course_slug: n.course_slug, topic: n.topic, kind: n.kind, title: n.title, body: n.body || {}, sketch: n.sketch || [] };
        if (n.id) { const { data, error } = await sb.from("notes").update({ ...row, updated_at: new Date().toISOString() }).eq("id", n.id).select().single(); fail(error, "Your note didn't save."); return data; }
        const { data, error } = await sb.from("notes").insert(row).select().single(); fail(error, "Your note didn't save."); return data;
      },
      async deleteNote(id) { const v = await this.listVoice(id); if (v.length) await sb.storage.from(BUCKET).remove(v.map(x => x.path)); const { error } = await sb.from("notes").delete().eq("id", id); fail(error, "That note wasn't deleted."); },
      async listVoice(noteId) { const { data, error } = await sb.from("voice_notes").select("*").eq("note_id", noteId).order("created_at"); fail(error, "Voice notes didn't load."); return data || []; },
      async addVoice(noteId, blob, meta) {
        const id = me && (await me()); const ext = (blob.type.includes("mp4") || blob.type.includes("m4a")) ? "m4a" : blob.type.includes("mpeg") ? "mp3" : blob.type.includes("wav") ? "wav" : blob.type.includes("ogg") ? "ogg" : "webm";
        const path = `${id}/${noteId}/${uid()}.${ext}`;
        const up = await sb.storage.from(BUCKET).upload(path, blob, { contentType: blob.type || "audio/webm" }); fail(up.error, "The recording didn't upload.");
        const { data, error } = await sb.from("voice_notes").insert({ note_id: noteId, path, ...meta }).select().single(); fail(error, "The recording didn't save."); return data;
      },
      async updateVoice(v, patch) { const { data, error } = await sb.from("voice_notes").update(patch).eq("id", v.id).select().single(); fail(error, "That change didn't save."); return data; },
      async deleteVoice(v) { await sb.storage.from(BUCKET).remove([v.path]); const { error } = await sb.from("voice_notes").delete().eq("id", v.id); fail(error, "The recording wasn't deleted."); },
      async voiceUrl(v) { const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(v.path, 3600); fail(error, "The recording didn't load."); return data.signedUrl; },
      async transcribe(v) { const out = await post("transcribe", { voice_id: v.id }); return out.text || ""; },
      async handwriting(pngDataUrl, strokes) { const t = await localInk(strokes); if (t != null) return t; const out = await post("handwriting", { image: pngDataUrl }); return out.text || ""; },
      async listPalaces() { const { data, error } = await sb.from("palaces").select("*").order("updated_at", { ascending: false }); fail(error, "Your memory palaces didn't load."); return (data || []).map(r => ({ ...r.data, id: r.id, updated_at: r.updated_at })); },
      async savePalace(p) {
        const row = { course_slug: p.course_slug || null, name: p.name, data: p };
        if (p.id && !String(p.id).startsWith("tmp")) { const { data, error } = await sb.from("palaces").update({ ...row, updated_at: new Date().toISOString() }).eq("id", p.id).select().single(); fail(error, "Your palace didn't save."); return { ...data.data, id: data.id, updated_at: data.updated_at }; }
        const { data, error } = await sb.from("palaces").insert(row).select().single(); fail(error, "Your palace didn't save."); return { ...data.data, id: data.id, updated_at: data.updated_at };
      },
      async deletePalace(id) { const { error } = await sb.from("palaces").delete().eq("id", id); fail(error, "That palace wasn't deleted."); }
    };
  }

  window.NotebookStore = {
    async open() {
      /* a course opened from the hub borrows the hub's sign-in, so notes made inside a course
         land in the same account; a course opened on its own saves on this device */
      let A = window.Auth;
      if (!A || !A.client) { try { if (window.parent !== window && window.parent.Auth) A = window.parent.Auth; } catch (e) { A = null; } }
      if (!A || !A.client) return Local;
      try {
        const sb = await A.client();
        if (sb) { const { data: { session } } = await sb.auth.getSession(); if (session) return Live(sb, () => A.token()); }
      } catch (e) {}
      return Local;
    }
  };
})();
