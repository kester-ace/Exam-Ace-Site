/* Builds the "Try a section" preview of every course: /courses/<slug>/preview/
   Run after you change a course:   node tools-build/make-previews.js
   The preview holds ONE section of the student edition. Every other section and unit is
   shipped as a title-only card, so nothing else of the course leaves the server.
   Kester Small */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..", "courses");

/* which section each course lets people try (units: how many of its units; 0 = all) */
const PREVIEW = {
  "edpm":            { module: "S1", units: 0 },
  "csec-it":         { module: "S1", units: 0 },
  "comm-studies":    { module: "M1", units: 2 },
  "digital-media-1": { module: "M1", units: 2 },
  "digital-media-2": { module: "M1", units: 2 },
  "cape-it-1":       { module: "M1", units: 2 }
};
/* the only course files the preview loads (everything else stays behind the course gate) */
const KEEP = ["content/figs.js", "content/caribbean.js", "content/territories.js", "tools/polish.js", "tools/nocopy.js", "tools/figures.js", "engine.js"];

const lockCard = (what, title) => `<div class="pv-lock"><div class="pv-lock-ic">🔒</div><h3>${title}</h3><p>${what} is part of the full course. Choose a plan to open every section, the games, past papers, the flipbook and the exam room.</p><p><a class="pv-lock-btn" href="../../../index.html#plans" target="_top">See plans</a></p></div>`;

function load(dir, files) {
  const sb = { window: {} }; vm.createContext(sb);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), sb, { filename: f });
  return sb.window.COURSE_MODULES || [];
}

for (const slug of Object.keys(PREVIEW)) {
  const src = path.join(ROOT, slug, "student"), out = path.join(ROOT, slug, "preview"), P = PREVIEW[slug];
  if (!fs.existsSync(src)) { console.log("skip", slug); continue; }
  const html = fs.readFileSync(path.join(src, "index.html"), "utf8");
  const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"[^>]*><\/script>/g)].map(m => m[1]);
  const modFiles = scripts.filter(s => /^content\/(s|m)\d+\.js$|^content\/p3\.js$/.test(s));
  const mods = load(src, modFiles);

  const outMods = mods.map(m => {
    if (m.id === P.module) {
      const n = P.units || m.units.length;
      return Object.assign({}, m, { preview: true, units: m.units.map((u, i) => i < n ? u : lockedUnit(u)) });
    }
    return {
      id: m.id, code: m.code, title: "🔒 " + m.title, locked: true,
      overview: m.overview + lockCard("This " + (/^S/.test(m.id) ? "section" : "module"), "Unlock " + m.code),
      objectives: m.objectives || [], glossary: [],
      units: m.units.map(lockedUnit),
      test: { title: m.code + " test", pass: 70, items: [] },
      paper2: { type: "learn", title: "Paper 02 practice", html: lockCard("Paper 02 practice", "Paper 02 practice") }
    };
  });
  function lockedUnit(u) { return { id: u.id + "-x", title: "🔒 " + u.title, locked: true, objectives: u.objectives || [], videos: [], screens: [{ type: "learn", title: "Part of the full course", html: lockCard("This unit", "Unlock this unit") }] }; }

  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(path.join(out, "content"), { recursive: true }); fs.mkdirSync(path.join(out, "tools"), { recursive: true });
  for (const k of KEEP) if (fs.existsSync(path.join(src, k))) fs.copyFileSync(path.join(src, k), path.join(out, k));
  /* figures: only the open units' ones */
  const openIds = new Set(); outMods.forEach(m => m.units.forEach(u => { if (!u.locked) openIds.add(u.id); }));
  if (fs.existsSync(path.join(src, "content/figs.js"))) {
    const sb = { window: {} }; vm.createContext(sb); vm.runInContext(fs.readFileSync(path.join(src, "content/figs.js"), "utf8"), sb);
    const F = sb.window.COURSE_FIGS || {}, keep = {};
    Object.keys(F).forEach(k => { if (openIds.has(k)) keep[k] = F[k]; });
    fs.writeFileSync(path.join(out, "content/figs.js"), "window.COURSE_FIGS = " + JSON.stringify(keep) + ";\n");
  }
  const body = "/* Course preview: one section. Kester Small */\n" + outMods.map(m => "(window.COURSE_MODULES = window.COURSE_MODULES || []).push(" + JSON.stringify(m) + ");").join("\n");
  fs.writeFileSync(path.join(out, "content", "preview.js"), body);
  fs.copyFileSync(path.join(__dirname, "preview-lock.js"), path.join(out, "tools", "preview.js"));

  /* pictures and sounds the previewed units point to (slides/…, img/…, audio/…) */
  const refs = new Set([...(body + (fs.existsSync(path.join(out, "content/figs.js")) ? fs.readFileSync(path.join(out, "content/figs.js"), "utf8") : "")).matchAll(/["'=]((?:slides|img|audio|res)\/[^"'\\?#\s)]+)/g)].map(m => m[1]));
  let copied = 0;
  const ud = path.join(src, "img/units"); if (fs.existsSync(ud)) fs.readdirSync(ud).filter(f => openIds.has(f.replace(/\.[a-z]+$/i, ""))).forEach(f => refs.add("img/units/" + f));
  for (const r of refs) { const f = path.join(src, r); if (fs.existsSync(f) && fs.statSync(f).isFile()) { fs.mkdirSync(path.dirname(path.join(out, r)), { recursive: true }); fs.copyFileSync(f, path.join(out, r)); copied++; } }
  for (const a of ["audio"]) { const d = path.join(src, a); if (fs.existsSync(d)) for (const f of fs.readdirSync(d).filter(f => /^(click|success|alert|reward)\w*\.mp3$/.test(f))) { fs.mkdirSync(path.join(out, a), { recursive: true }); fs.copyFileSync(path.join(d, f), path.join(out, a, f)); } }

  /* the page: same look, only the kept scripts */
  const keepSet = new Set(KEEP.concat(modFiles.slice(0, 1)));
  let page = html.replace(/<script[^>]*src="([^"]+)"[^>]*><\/script>\s*/g, (all, s) => {
    if (s === modFiles[0]) return '<script src="content/preview.js"></script>\n';
    if (s === "engine.js") return '<script src="tools/preview.js"></script>\n' + all;
    return keepSet.has(s) && fs.existsSync(path.join(out, s)) ? all : "";
  });
  page = page.replace(/<title>([^<]*)<\/title>/, "<title>$1 · Preview</title>");
  fs.writeFileSync(path.join(out, "index.html"), page);
  const size = (function du(d) { return fs.readdirSync(d).reduce((a, f) => { const p = path.join(d, f), st = fs.statSync(p); return a + (st.isDirectory() ? du(p) : st.size); }, 0); })(out);
  console.log(slug.padEnd(16), P.module, (P.units || "all") + " units", copied + " media files", (size / 1048576).toFixed(1) + " MB");
}
