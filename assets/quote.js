/* "Request a quote": a poster-style form for plans priced at or above quoteFrom in config.js,
   and for school licences. Used on the homepage and the shop. Open it with Quote.open({ plan, subject }). */
(function () {
  const C = window.SITE_CONFIG || {};
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ISLANDS = ["Sint Maarten", "Saint-Martin", "Anguilla", "Antigua and Barbuda", "Aruba", "The Bahamas", "Barbados", "Belize", "Bonaire", "British Virgin Islands",
    "Cayman Islands", "Curaçao", "Dominica", "Grenada", "Guyana", "Jamaica", "Montserrat", "Saba", "St. Eustatius", "St. Kitts and Nevis", "St. Lucia",
    "St. Vincent and the Grenadines", "Suriname", "Trinidad and Tobago", "Turks and Caicos Islands", "US Virgin Islands", "Other"];

  const css = `
.qp{border:0;padding:0;background:transparent;color:#F1F4FF;width:min(760px,calc(100vw - 24px));max-height:calc(100vh - 24px)}
.qp::backdrop{background:rgba(3,7,22,.78);backdrop-filter:blur(4px)}
.qp .rim{padding:2px;border-radius:26px;background:var(--bezel,linear-gradient(160deg,#FFF3B0,#F5C542,#A97A0E,#FFD766))}
.qp .sheet{position:relative;border-radius:24px;overflow:hidden;background:#0B1A46;display:grid;grid-template-columns:260px minmax(0,1fr);max-height:calc(100vh - 28px)}
.qp .art{position:relative;padding:30px 24px;background:radial-gradient(320px 220px at 80% 0%,rgba(245,197,66,.32),transparent 70%),linear-gradient(165deg,#122a6b,#0a1638 72%);display:flex;flex-direction:column;gap:14px;border-right:1px solid rgba(245,197,66,.25);overflow:hidden}
.qp .art canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.9}
.qp .art > *:not(canvas){position:relative}
.qp .seal{width:56px;height:56px;border-radius:50%;padding:3px;background:#F5C542;box-shadow:0 0 30px rgba(245,197,66,.45)}
.qp .seal span{display:grid;place-items:center;width:100%;height:100%;border-radius:50%;background:#0B1A46;color:#FFD766;font:800 1.05rem "Bricolage Grotesque",sans-serif}
.qp .art h2{font:800 1.85rem/1.05 "Bricolage Grotesque","Segoe UI",sans-serif;letter-spacing:-.02em;color:#fff}
.qp .art h2 em{font-style:normal;background:linear-gradient(180deg,#FFF3B0,#F5C542 55%,#C99A1C);-webkit-background-clip:text;background-clip:text;color:transparent}
.qp .art p{color:#C9D2F2;font-size:.94rem;line-height:1.55}
.qp .art ul{list-style:none;margin:6px 0 0;padding:0;display:grid;gap:8px;font-size:.88rem;color:#DCE3FF}
.qp .art li{display:grid;grid-template-columns:16px 1fr;gap:8px}
.qp .art li::before{content:"";width:9px;height:9px;margin-top:6px;border-radius:50%;background:#F5C542}
.qp .body{padding:24px 26px 22px;overflow:auto;display:grid;gap:16px;align-content:start;--ink:#F1F4FF;--muted:#AEB9DD;--raise:rgba(255,255,255,.06);--line:rgba(245,197,66,.28)}
.qp .x{position:absolute;top:10px;right:12px;z-index:2;background:none;border:0;color:#C8D0EE;font-size:1.7rem;line-height:1;cursor:pointer;padding:4px 8px;border-radius:8px}
.qp .steps{display:flex;gap:6px;align-items:center}
.qp .steps span{height:6px;flex:1;border-radius:999px;background:rgba(255,255,255,.12)}
.qp .steps span.on{background:#F5C542}
.qp .lbl{font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:#FFD766}
.qp h3{font:800 1.3rem "Bricolage Grotesque","Segoe UI",sans-serif;color:#fff}
.qp .grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.qp .chips{display:flex;flex-wrap:wrap;gap:8px}
.qp .chips label{display:inline-flex;align-items:center;gap:8px;padding:9px 13px;border-radius:12px;border:1.5px solid rgba(245,197,66,.5);background:rgba(255,255,255,.05);cursor:pointer;font-weight:700;font-size:.9rem}
.qp .chips input{accent-color:#F5C542;width:16px;height:16px}
.qp .chips label:has(input:checked){border-color:#F5C542;background:rgba(255,215,102,.16)}
.qp .nav{display:flex;gap:10px;justify-content:space-between;align-items:center;flex-wrap:wrap;padding-top:4px}
.qp .hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.qp .done{display:grid;gap:14px;justify-items:start}
@media (max-width:700px){.qp .sheet{grid-template-columns:1fr}.qp .art{padding:22px 20px;border-right:0;border-bottom:1px solid rgba(245,197,66,.25)}.qp .art ul{display:none}.qp .grid2{grid-template-columns:1fr}}
`;
  let dlg, step = 1, ctx = {};

  function build() {
    const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    dlg = document.createElement("dialog"); dlg.className = "qp"; dlg.setAttribute("aria-labelledby", "qp-title");
    dlg.innerHTML = `<div class="rim"><div class="sheet">
      <button class="x" type="button" data-qclose aria-label="Close">×</button>
      <div class="art"><canvas aria-hidden="true"></canvas>
        <div class="seal"><span>EA</span></div>
        <h2 id="qp-title">Let's build <em>your package</em></h2>
        <p>Tell us who it's for and what you need. We'll send a quote shaped to your school, class or department.</p>
        <ul><li>All six CSEC and CAPE courses available</li><li>Student and teacher editions</li><li>Logins issued for your whole class</li><li>Flipbook textbooks and teacher packs</li></ul>
        <p style="margin-top:auto;font-size:.78rem;color:#AEB9DD">© ${new Date().getFullYear()} Exam Ace Tutorials. All rights reserved.</p>
      </div>
      <form class="body" id="qp-form" novalidate>
        <div class="steps" aria-hidden="true"><span data-s="1"></span><span data-s="2"></span><span data-s="3"></span></div>
        <div class="msg bad" id="qp-err" hidden></div>

        <div data-step="1" style="display:grid;gap:14px">
          <div><p class="lbl">Step 1 of 3</p><h3>Who is the quote for?</h3></div>
          <div class="field"><span style="font-weight:700;font-size:.92rem">I am a</span>
            <div class="chips" role="radiogroup" aria-label="I am a">
              <label><input type="radio" name="qp-who" value="Teacher" checked> Teacher</label>
              <label><input type="radio" name="qp-who" value="Head of department"> Head of department</label>
              <label><input type="radio" name="qp-who" value="School leader"> School leader</label>
              <label><input type="radio" name="qp-who" value="Parent or guardian"> Parent or guardian</label>
              <label><input type="radio" name="qp-who" value="Tutor or centre"> Tutor or centre</label>
            </div></div>
          <div class="grid2">
            <div class="field"><label for="qp-name">Full name</label><input id="qp-name" autocomplete="name"></div>
            <div class="field"><label for="qp-email">Email</label><input id="qp-email" type="email" autocomplete="email"></div>
            <div class="field"><label for="qp-phone">Phone or WhatsApp (optional)</label><input id="qp-phone" type="tel" autocomplete="tel"></div>
            <div class="field"><label for="qp-org">School or organisation</label><input id="qp-org" autocomplete="organization"></div>
          </div>
          <div class="field"><label for="qp-island">Country or island</label><select id="qp-island">${ISLANDS.map(i => `<option>${esc(i)}</option>`).join("")}</select></div>
        </div>

        <div data-step="2" hidden style="display:grid;gap:14px">
          <div><p class="lbl">Step 2 of 3</p><h3>What do you need?</h3></div>
          <div class="field"><span style="font-weight:700;font-size:.92rem">Subjects</span>
            <div class="chips" id="qp-subjects">${(C.courses || []).map(c => `<label><input type="checkbox" value="${esc(c.slug)}"> ${esc(c.level + " " + c.title)}</label>`).join("")}</div></div>
          <div class="grid2">
            <div class="field"><label for="qp-learners">Number of learners</label><select id="qp-learners"><option>1–10</option><option>11–30</option><option>31–60</option><option>61–120</option><option>More than 120</option></select></div>
            <div class="field"><label for="qp-teachers">Teacher logins</label><select id="qp-teachers"><option>1</option><option>2–3</option><option>4–6</option><option>More than 6</option></select></div>
          </div>
          <div class="field"><span style="font-weight:700;font-size:.92rem">Include</span>
            <div class="chips">
              <label><input type="checkbox" id="qp-x-teacher" checked> Teacher editions</label>
              <label><input type="checkbox" id="qp-x-books" checked> Flipbook textbooks</label>
              <label><input type="checkbox" id="qp-x-packs"> Teacher packs and game packs</label>
              <label><input type="checkbox" id="qp-x-sow"> Schemes of work and lesson plans</label>
            </div></div>
        </div>

        <div data-step="3" hidden style="display:grid;gap:14px">
          <div><p class="lbl">Step 3 of 3</p><h3>When and how?</h3></div>
          <div class="grid2">
            <div class="field"><label for="qp-start">Start</label><select id="qp-start"><option>As soon as possible</option><option>Next term</option><option>Next school year (September)</option><option>Not sure yet</option></select></div>
            <div class="field"><label for="qp-bill">Billing</label><select id="qp-bill"><option>Monthly</option><option>Once a year</option><option>Exam year (September to June)</option><option>Open to suggestions</option></select></div>
          </div>
          <div class="field"><label for="qp-msg">Anything else? (optional)</label><textarea id="qp-msg" rows="4" placeholder="For example: two Form 5 EDPM classes sitting in May, and the department wants teacher packs."></textarea></div>
          <div class="hp" aria-hidden="true"><label for="qp-website">Website</label><input id="qp-website" tabindex="-1" autocomplete="off"></div>
        </div>

        <div class="nav">
          <button class="btn ghost" type="button" id="qp-back">Back</button>
          <button class="btn go" type="submit" id="qp-next">Next</button>
        </div>
      </form>
      <div class="body done" id="qp-done" hidden>
        <p class="lbl">Request received</p>
        <h3 id="qp-thanks">Thank you!</h3>
        <p style="color:#C9D2F2;line-height:1.6" id="qp-thanks-p"></p>
        <button class="btn go" type="button" data-qclose>Close</button>
      </div>
    </div></div>`;
    document.body.appendChild(dlg);

    dlg.addEventListener("click", e => { if (e.target.closest("[data-qclose]")) dlg.close(); });
    dlg.querySelector("#qp-back").onclick = () => show(step - 1);
    dlg.querySelector("#qp-form").addEventListener("submit", submit);
    stars(dlg.querySelector(".art canvas"));
  }

  function show(n) {
    step = Math.max(1, Math.min(3, n));
    dlg.querySelectorAll("[data-step]").forEach(s => s.hidden = Number(s.dataset.step) !== step);
    dlg.querySelectorAll(".steps span").forEach(s => s.classList.toggle("on", Number(s.dataset.s) <= step));
    dlg.querySelector("#qp-back").style.visibility = step === 1 ? "hidden" : "visible";
    dlg.querySelector("#qp-next").textContent = step === 3 ? "Send my request" : "Next";
    err();
    const f = dlg.querySelector(`[data-step="${step}"] input:not([type=radio]):not([type=checkbox]), [data-step="${step}"] select`); if (f) setTimeout(() => f.focus(), 30);
  }
  const $ = id => dlg.querySelector("#" + id);
  function err(t) { const e = $("qp-err"); e.textContent = t || ""; e.hidden = !t; }

  async function submit(e) {
    e.preventDefault();
    if (step === 1) {
      if (!$("qp-name").value.trim()) return err("Enter your full name.");
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($("qp-email").value.trim())) return err("Enter an email address so we can send your quote.");
      return show(2);
    }
    if (step === 2) {
      if (!dlg.querySelector("#qp-subjects input:checked")) return err("Choose at least one subject.");
      return show(3);
    }
    if ($("qp-website").value) { dlg.close(); return; } // filled in by a spam robot
    const data = {
      who: (dlg.querySelector('input[name="qp-who"]:checked') || {}).value,
      full_name: $("qp-name").value.trim(), email: $("qp-email").value.trim().toLowerCase(), phone: $("qp-phone").value.trim(),
      organisation: $("qp-org").value.trim(), island: $("qp-island").value,
      subjects: [...dlg.querySelectorAll("#qp-subjects input:checked")].map(i => i.value),
      learners: $("qp-learners").value, teachers: $("qp-teachers").value,
      extras: [["qp-x-teacher", "Teacher editions"], ["qp-x-books", "Flipbook textbooks"], ["qp-x-packs", "Teacher packs and game packs"], ["qp-x-sow", "Schemes of work and lesson plans"]].filter(([id]) => $(id).checked).map(([, t]) => t),
      start: $("qp-start").value, billing: $("qp-bill").value, message: $("qp-msg").value.trim(), plan: ctx.plan || null
    };
    const b = $("qp-next"); b.disabled = true; b.textContent = "Sending…";
    try {
      await Auth.requestQuote(data);
      $("qp-form").hidden = true; $("qp-done").hidden = false;
      $("qp-thanks").textContent = "Thank you, " + data.full_name.split(" ")[0] + "!";
      $("qp-thanks-p").textContent = "Your request is in. Your quote will be emailed to " + data.email + ". For anything urgent, write to " + (C.contactEmail || "us") + ".";
    } catch (x) { err(x.message); }
    finally { b.disabled = false; b.textContent = "Send my request"; }
  }

  function stars(cv) {
    const draw = () => {
      const w = cv.clientWidth, h = cv.clientHeight; if (!w) return;
      const d = Math.min(window.devicePixelRatio || 1, 2); cv.width = w * d; cv.height = h * d;
      const g = cv.getContext("2d"); g.scale(d, d);
      for (let i = 0; i < Math.round(w * h / 1400); i++) {
        const x = Math.random() * w, y = Math.random() * h, r = Math.random() * 1.2 + .3, gold = Math.random() < .12;
        g.globalAlpha = .35 + Math.random() * .6; g.fillStyle = gold ? "#FFD766" : "#FFFFFF";
        g.beginPath(); g.arc(x, y, r, 0, 6.283); g.fill();
      }
    };
    dlg.addEventListener("transitionend", draw); setTimeout(draw, 60);
  }

  window.Quote = {
    open(opts) {
      if (!dlg) build();
      ctx = opts || {};
      $("qp-form").reset(); $("qp-form").hidden = false; $("qp-done").hidden = true;
      if (ctx.subject) { const i = dlg.querySelector(`#qp-subjects input[value="${CSS.escape(ctx.subject)}"]`); if (i) i.checked = true; }
      if (ctx.plan && /teacherA|all/.test(ctx.plan)) dlg.querySelectorAll("#qp-subjects input").forEach(i => i.checked = true);
      if (ctx.school) { const r = dlg.querySelector('input[name="qp-who"][value="School leader"]'); if (r) r.checked = true; }
      dlg.showModal(); show(1);
      setTimeout(() => stars(dlg.querySelector(".art canvas")), 80);
    }
  };
})();
