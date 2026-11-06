/* Sign-in, accounts and course access.
   With Supabase keys in config.js it talks to your database.
   Without them it runs in demo mode (accounts kept in this browser only). */
(function () {
  const C = window.SITE_CONFIG || {};
  const LIVE = !!(C.supabaseUrl && C.supabaseAnonKey);
  const SB_SRC = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";
  let sb = null, readyP = null;

  /* ---------- small helpers ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  function toEmail(id) {
    id = String(id || "").trim().toLowerCase();
    return id.includes("@") ? id : id + "@" + (C.studentLoginDomain || "students.local");
  }
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = () => rej(new Error("Could not reach the sign-in service. Check your internet connection and try again.")); document.head.appendChild(s); });
  }
  /* The course gate on Netlify reads this cookie to decide who may open /courses/ */
  function setGateCookie(session) {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    if (session && session.access_token) {
      document.cookie = "ks-access=" + session.access_token + "; Path=/; Max-Age=" + (session.expires_in || 3600) + "; SameSite=Lax" + secure;
    } else {
      document.cookie = "ks-access=; Path=/; Max-Age=0; SameSite=Lax" + secure;
    }
  }
  function passwordProblem(pw) {
    if (!pw || pw.length < 8) return "Use at least 8 characters.";
    if (!/[0-9]/.test(pw)) return "Include at least one number.";
    if (!/[A-Za-z]/.test(pw)) return "Include at least one letter.";
    return "";
  }
  function tempPassword() {
    const words = ["Star", "Coral", "Palm", "Wave", "Comet", "Reef", "Sun", "Orbit", "Isle", "Bay"];
    const a = new Uint32Array(2); (crypto || window.msCrypto).getRandomValues(a);
    return words[a[0] % words.length] + "-" + (1000 + (a[1] % 9000)) + "-" + words[(a[0] >> 8) % words.length].toLowerCase();
  }

  /* ---------- demo database (this browser only) ---------- */
  const DEMO_KEY = "ks-demo-db";
  function demoDb() {
    let db = store.get(DEMO_KEY, null);
    if (!db) {
      db = {
        users: [
          { id: "u-admin", email: toEmail("kester"), password: "Admin2026!", full_name: "Kester Small", username: "kester", role: "admin", must_change_password: false },
          { id: "u-student", email: toEmail("demo.student"), password: "Welcome2026!", full_name: "Demo Student", username: "demo.student", role: "student", must_change_password: true },
          { id: "u-teacher", email: toEmail("demo.teacher"), password: "Teacher2026!", full_name: "Demo Teacher", username: "demo.teacher", role: "teacher", must_change_password: false }
        ],
        entitlements: [
          { user_id: "u-student", course_slug: "comm-studies", edition: "student", source: "school" },
          { user_id: "u-student", course_slug: "digital-media-1", edition: "student", source: "school" },
          { user_id: "u-teacher", course_slug: "all", edition: "teacher", source: "manual" }
        ],
        logs: [],
        requests: [
          { id: 1, user_id: "u-student", course_slug: "edpm", subject_text: "", note: "Example request: sitting EDPM in May.", status: "pending", created_at: new Date().toISOString() }
        ]
      };
      store.set(DEMO_KEY, db);
    }
    return db;
  }
  const demoSave = (db) => store.set(DEMO_KEY, db);
  const demoSession = () => store.get("ks-demo-session", null);

  /* ---------- public API ---------- */
  const Auth = {
    live: LIVE,
    passwordProblem, tempPassword, toEmail,

    ready() {
      if (readyP) return readyP;
      readyP = (async () => {
        if (!LIVE) return;
        if (!window.supabase) await loadScript(SB_SRC);
        sb = window.supabase.createClient(C.supabaseUrl, C.supabaseAnonKey, { auth: { persistSession: true, autoRefreshToken: true } });
        const { data } = await sb.auth.getSession();
        setGateCookie(data.session);
        sb.auth.onAuthStateChange((_e, session) => setGateCookie(session));
      })();
      return readyP;
    },

    /* Returns { user, profile, courses: [{slug, edition}] } or null */
    async current() {
      await Auth.ready();
      if (!LIVE) {
        const s = demoSession(); if (!s) return null;
        const db = demoDb(); const u = db.users.find(x => x.id === s.id); if (!u) return null;
        return { user: { id: u.id, email: u.email }, profile: u, courses: db.entitlements.filter(e => e.user_id === u.id) };
      }
      const { data: { session } } = await sb.auth.getSession();
      if (!session) return null;
      const uid = session.user.id;
      const [{ data: profile }, { data: ents }] = await Promise.all([
        sb.from("profiles").select("*").eq("id", uid).single(),
        sb.from("entitlements").select("course_slug, edition, source, expires_at, books").eq("user_id", uid)
      ]);
      const now = Date.now();
      const courses = (ents || []).filter(e => !e.expires_at || new Date(e.expires_at).getTime() > now);
      return { user: session.user, profile: profile || {}, courses, token: session.access_token };
    },

    async signIn(id, password) {
      await Auth.ready();
      const email = toEmail(id);
      if (!LIVE) {
        const db = demoDb(); const u = db.users.find(x => x.email === email && x.password === password);
        if (!u) throw new Error("That username or password doesn't match. Check the spelling, or ask your teacher to reset it.");
        store.set("ks-demo-session", { id: u.id });
        Auth.log("sign_in");
        return { mustChange: !!u.must_change_password };
      }
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw new Error(/invalid/i.test(error.message) ? "That username or password doesn't match. Check the spelling, or ask your teacher to reset it." : error.message);
      setGateCookie(data.session);
      Auth.log("sign_in");
      const { data: p } = await sb.from("profiles").select("must_change_password").eq("id", data.user.id).single();
      return { mustChange: !!(p && p.must_change_password) };
    },

    async register({ full_name, email, password, plan }) {
      await Auth.ready();
      const problem = passwordProblem(password); if (problem) throw new Error(problem);
      if (!LIVE) {
        const db = demoDb(); email = toEmail(email);
        if (db.users.some(u => u.email === email)) throw new Error("An account with that email already exists. Sign in instead.");
        const u = { id: "u-" + Date.now(), email, password, full_name, username: email.split("@")[0], role: "student", must_change_password: false, plan };
        db.users.push(u); demoSave(db); store.set("ks-demo-session", { id: u.id });
        return { needsConfirm: false };
      }
      const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name, plan, role: "student" } } });
      if (error) throw new Error(error.message);
      if (data.session) setGateCookie(data.session);
      return { needsConfirm: !data.session };
    },

    async changePassword(newPassword) {
      await Auth.ready();
      const problem = passwordProblem(newPassword); if (problem) throw new Error(problem);
      if (!LIVE) {
        const s = demoSession(); const db = demoDb(); const u = db.users.find(x => x.id === s.id);
        if (u.password === newPassword) throw new Error("Choose a password different from the one your teacher gave you.");
        u.password = newPassword; u.must_change_password = false; demoSave(db); Auth.log("password_changed"); return;
      }
      const { error } = await sb.auth.updateUser({ password: newPassword });
      if (error) throw new Error(/different/i.test(error.message) ? "Choose a password different from the one your teacher gave you." : error.message);
      await sb.rpc("clear_must_change_password");
      Auth.log("password_changed");
    },

    async signOut() {
      await Auth.ready();
      Auth.log("sign_out");
      if (!LIVE) { store.del("ks-demo-session"); return; }
      await sb.auth.signOut(); setGateCookie(null);
    },

    async log(event, detail) {
      try {
        if (!LIVE) { const s = demoSession(); if (!s) return; const db = demoDb(); db.logs.unshift({ user_id: s.id, event, detail: detail || {}, created_at: new Date().toISOString() }); db.logs = db.logs.slice(0, 300); demoSave(db); return; }
        const { data: { session } } = await sb.auth.getSession(); if (!session) return;
        await sb.from("activity_log").insert({ user_id: session.user.id, event, detail: detail || {} });
      } catch (e) {}
    },

    /* ---------- shop: cart and orders ---------- */
    cart: {
      get() { return store.get("ks-cart", []); },
      count() { return store.get("ks-cart", []).length; },
      total() { return store.get("ks-cart", []).reduce((t, l) => t + (Number(l.price) || 0), 0); },
      add(line) { const c = store.get("ks-cart", []); line.key = "l" + Date.now() + Math.random().toString(36).slice(2, 6);
        let replaced = false;
        if (line.kind === "plan") { for (let i = c.length - 1; i >= 0; i--) if (c[i].kind === "plan" && !!c[i].teacher === !!line.teacher) { c.splice(i, 1); replaced = true; } } /* one plan of each type */
        if (line.kind === "book" && c.some(l => l.kind === "book" && l.slug === line.slug && l.format === line.format)) return false;
        c.push(line); store.set("ks-cart", c); window.dispatchEvent(new Event("cartchange")); return replaced ? "replaced" : true; },
      remove(key) { store.set("ks-cart", store.get("ks-cart", []).filter(l => l.key !== key)); window.dispatchEvent(new Event("cartchange")); },
      clear() { store.del("ks-cart"); window.dispatchEvent(new Event("cartchange")); }
    },

    /* Saves the cart as an order waiting for payment. Payhip's confirmation later marks it paid. */
    async createOrder(lines) {
      await Auth.ready();
      const me = await Auth.current(); if (!me) throw new Error("Sign in first so your purchase is added to your account.");
      const email = (me.profile && me.profile.contact_email) || me.user.email;
      const amount = lines.reduce((t, l) => t + (Number(l.price) || 0), 0);
      if (!LIVE) {
        const db = demoDb(); db.orders = db.orders || [];
        const o = { id: Date.now(), invoice_number: "INV-" + new Date().getFullYear() + "-" + (1001 + db.orders.length), user_id: me.user.id, buyer_email: email, lines, amount_usd: amount, status: "pending", created_at: new Date().toISOString() };
        db.orders.unshift(o); demoSave(db); return o;
      }
      const { data, error } = await sb.from("orders").insert({ user_id: me.user.id, buyer_email: email, lines, amount_usd: amount, status: "pending" }).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    async myOrders() {
      await Auth.ready();
      if (!LIVE) { const s = demoSession(); return ((demoDb().orders) || []).filter(o => s && o.user_id === s.id); }
      const { data } = await sb.from("orders").select("id,invoice_number,lines,amount_usd,status,created_at,paid_at").order("created_at", { ascending: false }).limit(20);
      return data || [];
    },
    /* Demo only: pretend Payhip confirmed payment for one line */
    demoPay(orderId, lineKey) {
      const db = demoDb(); const o = (db.orders || []).find(x => x.id === orderId); if (!o) return;
      const line = o.lines.find(l => l.key === lineKey); if (!line || line.paid) return;
      line.paid = true; grantLine(db, o.user_id, line, o.id);
      if (o.lines.every(l => l.paid)) { o.status = "paid"; o.paid_at = new Date().toISOString(); }
      demoSave(db);
    },

    /* ---------- for the notebook: the database client and the sign-in token ---------- */
    async client() { await Auth.ready(); return LIVE ? sb : null; },
    async token() { await Auth.ready(); if (!LIVE) return null; const { data: { session } } = await sb.auth.getSession(); return session ? session.access_token : null; },

    /* ---------- quote requests (open to visitors who aren't signed in) ---------- */
    async requestQuote(q) {
      await Auth.ready();
      if (!LIVE) { const db = demoDb(); db.quotes = db.quotes || []; db.quotes.unshift({ id: Date.now(), ...q, status: "new", created_at: new Date().toISOString() }); demoSave(db); return; }
      const { error } = await sb.from("quote_requests").insert({ ...q, status: "new" });
      if (error) throw new Error("Your request couldn't be sent. Check your connection and try again, or email " + (C.contactEmail || "us") + ".");
    },

    /* ---------- subject requests ---------- */
    async requestCourse({ course_slug, subject_text, note }) {
      await Auth.ready();
      course_slug = course_slug || null; subject_text = String(subject_text || "").trim(); note = String(note || "").trim();
      if (!course_slug && !subject_text) throw new Error("Choose a course, or type the subject you'd like added.");
      if (!LIVE) {
        const s = demoSession(); const db = demoDb(); db.requests = db.requests || [];
        if (course_slug && db.requests.some(r => r.user_id === s.id && r.course_slug === course_slug && r.status === "pending")) throw new Error("You've already asked for this course. You'll see it here once it's approved.");
        db.requests.unshift({ id: Date.now(), user_id: s.id, course_slug, subject_text, note, status: "pending", created_at: new Date().toISOString() });
        demoSave(db); Auth.log("requested_subject", { slug: course_slug || subject_text }); return;
      }
      const { data: { session } } = await sb.auth.getSession();
      const { data: dup } = await sb.from("course_requests").select("id").eq("user_id", session.user.id).eq("status", "pending").eq("course_slug", course_slug || "-");
      if (course_slug && dup && dup.length) throw new Error("You've already asked for this course. You'll see it here once it's approved.");
      const { error } = await sb.from("course_requests").insert({ user_id: session.user.id, course_slug, subject_text: subject_text || null, note: note || null });
      if (error) throw new Error(error.message);
      Auth.log("requested_subject", { slug: course_slug || subject_text });
    },
    async myRequests() {
      await Auth.ready();
      if (!LIVE) { const s = demoSession(); return ((demoDb().requests) || []).filter(r => r.user_id === s.id); }
      const { data } = await sb.from("course_requests").select("id,course_slug,subject_text,note,status,created_at").order("created_at", { ascending: false }).limit(20);
      return data || [];
    },

    /* ---------- admin: credentialing (runs through a secure Netlify function) ---------- */
    async admin(action, payload) {
      await Auth.ready();
      if (!LIVE) return demoAdmin(action, payload);
      const { data: { session } } = await sb.auth.getSession();
      const res = await fetch("/.netlify/functions/admin-users", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + (session ? session.access_token : "") },
        body: JSON.stringify({ action, ...payload })
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || "The account service did not respond. Try again in a minute.");
      return out;
    }
  };

  /* What a paid cart line gives the buyer (the Payhip webhook does the same on the server) */
  function examYearEnd() { const d = new Date(); const y = d.getMonth() >= 6 ? d.getFullYear() + 1 : d.getFullYear(); return new Date(Date.UTC(y, 6, 1)).toISOString(); }
  function grantLine(db, userId, line, orderId) {
    if (line.kind !== "plan") return; /* books are files Payhip delivers */
    const slugs = line.slugs && line.slugs.length ? line.slugs : ["all"];
    const edition = line.teacher ? "teacher" : "student";
    slugs.forEach(slug => {
      db.entitlements = db.entitlements.filter(e => !(e.user_id === userId && e.course_slug === slug && e.edition === edition));
      db.entitlements.push({ user_id: userId, course_slug: slug, edition, source: "payhip", books: !!line.books, order_id: orderId, expires_at: line.billing === "year" ? examYearEnd() : null });
    });
  }

  function demoAdmin(action, p) {
    const db = demoDb();
    if (action === "list") {
      return { users: db.users.map(u => ({ id: u.id, full_name: u.full_name, username: u.username, email: u.contact_email || u.email, role: u.role, must_change_password: u.must_change_password,
        courses: db.entitlements.filter(e => e.user_id === u.id) })), logs: db.logs.slice(0, 50),
        quotes: (db.quotes || []).slice(0, 60),
        orders: (db.orders || []).slice(0, 60).map(o => { const u = db.users.find(x => x.id === o.user_id) || {}; return { ...o, full_name: u.full_name, username: u.username }; }),
        requests: (db.requests || []).map(r => { const u = db.users.find(x => x.id === r.user_id) || {}; return { ...r, full_name: u.full_name, username: u.username, role: u.role }; }) };
    }
    if (action === "decide") {
      const r = (db.requests || []).find(x => x.id === p.id); if (!r) throw new Error("Request not found.");
      r.status = p.approve ? "approved" : "declined"; r.decided_at = new Date().toISOString();
      if (p.approve && r.course_slug) { const u = db.users.find(x => x.id === r.user_id) || {}; const edition = u.role === "student" ? "student" : "teacher";
        if (!db.entitlements.some(e => e.user_id === r.user_id && e.course_slug === r.course_slug && e.edition === edition)) db.entitlements.push({ user_id: r.user_id, course_slug: r.course_slug, edition, source: "manual" }); }
      demoSave(db); return { ok: true };
    }
    if (action === "create") {
      const created = [];
      for (const r of p.accounts) {
        const email = toEmail(r.username);
        if (db.users.some(u => u.email === email)) { created.push({ ...r, error: "Already exists" }); continue; }
        const pw = tempPassword(); const id = "u-" + Math.random().toString(36).slice(2, 9);
        db.users.push({ id, email, contact_email: r.email || "", school: r.school || "", password: pw, full_name: r.full_name, username: r.username || email.split("@")[0], role: r.role || "student", must_change_password: true });
        (r.courses || []).forEach(c => db.entitlements.push({ user_id: id, course_slug: c, edition: r.edition || "student", source: r.source || "school", books: r.books !== false }));
        created.push({ ...r, email: r.email || "", temp_password: pw, invited: r.email ? (p.sendInvites ? "demo" : "not requested") : "no email" });
      }
      demoSave(db); return { created };
    }
    if (action === "quote_status") {
      const q = (db.quotes || []).find(x => x.id === p.id); if (!q) throw new Error("Request not found.");
      q.status = p.status; demoSave(db); return { ok: true };
    }
    if (action === "invite") {
      const u = db.users.find(x => x.id === p.user_id); if (!u) throw new Error("Account not found.");
      if (!u.contact_email) throw new Error("This account has no email address. Use Reset password and give them the new one.");
      u.password = tempPassword(); u.must_change_password = true; demoSave(db); return { sent: u.contact_email, demo: true };
    }
    if (action === "reset") {
      const u = db.users.find(x => x.id === p.user_id); if (!u) throw new Error("Account not found.");
      u.password = tempPassword(); u.must_change_password = true; demoSave(db); return { temp_password: u.password };
    }
    if (action === "grant") {
      (p.courses || []).forEach(c => { if (!db.entitlements.some(e => e.user_id === p.user_id && e.course_slug === c && e.edition === (p.edition || "student")))
        db.entitlements.push({ user_id: p.user_id, course_slug: c, edition: p.edition || "student", source: p.source || "manual", books: p.books !== false }); });
      demoSave(db); return { ok: true };
    }
    if (action === "revoke") {
      db.entitlements = db.entitlements.filter(e => !(e.user_id === p.user_id && e.course_slug === p.course_slug)); demoSave(db); return { ok: true };
    }
    throw new Error("Unknown action.");
  }

  /* ---------- shared page behaviour: skins, starfield, no-copy ---------- */
  const SKINS = [["navy", "#0B1A46"], ["space", "#1A0E3D"], ["sea", "#064452"], ["carnival", "#4A0B4F"], ["emerald", "#0A3B29"], ["daylight", "#EEF1F8"]];
  function applySkin(s) { if (s) document.documentElement.setAttribute("data-skin", s); else document.documentElement.removeAttribute("data-skin"); }
  applySkin(store.get("ks-skin", null));
  Auth.skins = SKINS;
  Auth.setSkin = (s) => { store.set("ks-skin", s); applySkin(s); window.dispatchEvent(new Event("skinchange")); };
  Auth.skin = () => store.get("ks-skin", null);

  document.addEventListener("contextmenu", (e) => { if (!e.target.closest("input,textarea,.selectable")) e.preventDefault(); });
  document.addEventListener("copy", (e) => { if (!e.target.closest || !e.target.closest("input,textarea,.selectable")) { const sel = String(window.getSelection()); if (sel && !document.activeElement.matches("input,textarea")) e.preventDefault(); } });

  Auth.starfield = function (canvas) {
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d"); let stars = [], w = 0, h = 0, dpr = 1;
    const still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    function color() { return getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() || "#fff"; }
    let col = color();
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2); w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round((w * h) / 5200);
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + .25, p: Math.random() * 6.28, s: Math.random() * .02 + .004, g: Math.random() < .07 }));
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = col;
      for (const st of stars) {
        const a = still ? .7 : .35 + .65 * Math.abs(Math.sin(st.p + t * st.s * .06));
        ctx.globalAlpha = a * (st.g ? 1 : .8); ctx.beginPath(); ctx.arc(st.x, st.y, st.g ? st.r + .6 : st.r, 0, 6.283); ctx.fill();
        if (st.g) { ctx.globalAlpha = a * .25; ctx.fillRect(st.x - 5, st.y - .4, 10, .8); ctx.fillRect(st.x - .4, st.y - 5, .8, 10); }
      }
      ctx.globalAlpha = 1; if (!still) requestAnimationFrame(draw);
    }
    size(); window.addEventListener("resize", size); window.addEventListener("skinchange", () => { col = color(); if (still) draw(0); });
    requestAnimationFrame(draw);
  };

  Auth.mountSkinPicker = function (el) {
    if (!el) return;
    el.innerHTML = SKINS.map(([k, c]) => `<button type="button" data-skin="${k}" style="background:${c}" aria-label="${k} theme" title="${k[0].toUpperCase() + k.slice(1)}"></button>`).join("");
    const mark = () => { const cur = Auth.skin() || "navy"; el.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.skin === cur))); };
    el.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { Auth.setSkin(b.dataset.skin); mark(); } });
    mark();
  };

  /* A "Shop" link with the number of items in the cart; put <a data-cartlink> anywhere */
  Auth.mountCartLinks = function () {
    const paint = () => document.querySelectorAll("[data-cartlink]").forEach(a => {
      const n = Auth.cart.count();
      a.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg><span>${a.dataset.label || "Shop"}</span>` +
        (n ? `<span class="cart-n" aria-label="${n} in cart">${n}</span>` : "");
    });
    paint(); window.addEventListener("cartchange", paint); window.addEventListener("storage", paint);
  };

  window.Auth = Auth;
})();
