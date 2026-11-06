/* Course preview: the banner and the locks. Copied into each /courses/<slug>/preview/ by make-previews.js. Kester Small */
(function () {
  window.COURSE_OPEN_ALL = true; /* the preview section opens in full, with no release dates */
  const mods = window.COURSE_MODULES || [], open = mods.find(m => m.preview);
  const css = `.pv-bar{position:sticky;top:0;z-index:60;display:flex;flex-wrap:wrap;align-items:center;gap:10px;justify-content:center;padding:9px 14px;background:#0B1A46;color:#fff;border-bottom:2px solid #F5C542;font:600 .95rem "Atkinson Hyperlegible",Verdana,sans-serif;text-align:center}
.pv-bar b{color:#F5C542}.pv-bar a{background:#F5C542;color:#0B1A46;border-radius:999px;padding:6px 14px;font-weight:800;text-decoration:none;white-space:nowrap}
.pv-lock{border:2px solid #F5C542;border-radius:16px;padding:22px;text-align:center;background:rgba(11,26,70,.92);color:#F1F4FF;margin:14px 0;display:grid;gap:10px;justify-items:center}
.pv-lock h3{color:#F5C542}.pv-lock-ic{font-size:2.2rem}.pv-lock p{max-width:520px}
.pv-lock-btn{display:inline-block;background:#F5C542;color:#0B1A46!important;border-radius:999px;padding:9px 20px;font-weight:800;text-decoration:none}
.pv-dim{opacity:.55}.pv-gone{display:none!important}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  function bar() {
    if (document.querySelector(".pv-bar")) return;
    const b = document.createElement("div"); b.className = "pv-bar";
    b.innerHTML = `<span>You're trying <b>${open ? open.code + ": " + open.title : "one section"}</b> of this course.</span><a href="../../../index.html#plans" target="_top">Get the full course</a>`;
    document.body.prepend(b);
  }
  /* views that need the full course: the engine draws into #stage, and a lock replaces it */
  const FULL = ["glossary", "games", "paper", "pq", "lab", "xc", "zombie", "zday", "zc", "escape", "lq", "xq", "resources", "toolkit", "shop", "release"];
  function locked(L) {
    if (!L) return false;
    if (FULL.includes(L.v)) return true;
    if ((L.v === "test" || L.v === "paper2") && open && L.m && L.m !== open.id) return true;
    return false;
  }
  let busy = false;
  function check() {
    const api = window.COURSE_API, st = document.getElementById("stage"); if (!api || !st || busy) return;
    if (!locked(api.S && api.S.loc) || st.querySelector(".pv-lock[data-pv]")) return;
    busy = true;
    st.innerHTML = `<div class="stage-in"><div class="pv-lock" data-pv><div class="pv-lock-ic">🔒</div><h3>Part of the full course</h3><p>This preview opens ${open ? "<b>" + open.code + "</b>" : "one section"}. Choose a plan to open every section, the games, past papers, labs, the flipbook and the exam room.</p><p><a class="pv-lock-btn" href="../../../index.html#plans" target="_top">See plans</a></p></div></div>`;
    busy = false;
  }
  function watch() { const st = document.getElementById("stage"); if (!st || st._pv) return; st._pv = true; new MutationObserver(check).observe(st, { childList: true }); check(); }
  document.addEventListener("DOMContentLoaded", () => { bar(); watch(); });
  window.addEventListener("load", () => { bar(); watch(); });
})();
