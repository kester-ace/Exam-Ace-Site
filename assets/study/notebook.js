/* My Notebook: note taking and note making by course and topic, infinite paper, voice notes, read-aloud.
   Notebook.mount(el, { courses:[{slug,title,level}], course, topic }) */
(function () {
  'use strict';
  if (window.Notebook) return;
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var KINDS = {
    taking: { name: 'Note taking', hint: 'Cornell notes: record what you read or hear, then question and summarise it.',
      fields: [['cues', 'Cue questions and key words', 'Questions this section answers, key terms…', 5], ['notes', 'Notes', 'What the lesson, text or speaker says…', 10], ['summary', 'Summary', 'Two or three sentences in your own words…', 4]] },
    making: { name: 'Note making', hint: 'Process what you learned: rework it in your own words and connect it.',
      fields: [['idea', 'Key idea', 'The main point…', 3], ['own', 'In my own words', 'Explain it as you would to a friend…', 6], ['example', 'Example', 'A real or Caribbean example…', 4], ['links', 'Links to other topics', 'Where else does this connect?', 3], ['questions', 'Questions I still have', 'What to ask or look up…', 3]] },
    free: { name: 'Blank page', hint: 'Anything goes.', fields: [['text', 'Notes', 'Write anything…', 14]] }
  };
  var CSS = [
    '.nb{display:grid;grid-template-columns:280px minmax(0,1fr);gap:16px;color:var(--ink,#F1F4FF);font-family:var(--f-body,"Atkinson Hyperlegible",Verdana,sans-serif)}',
    '@media (max-width:860px){.nb{grid-template-columns:1fr}}',
    '.nb-side,.nb-main{background:var(--surface,#0E1B44);border:1px solid var(--line,rgba(245,197,66,.25));border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:12px;min-width:0}',
    '.nb h3{margin:0;font:800 1.08rem var(--f-display,"Bricolage Grotesque","Segoe UI",sans-serif)}',
    '.nb-lbl{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--muted,#AEB9DD)}',
    '.nb input,.nb select,.nb textarea{font:inherit;color:var(--ink,#F1F4FF);background:var(--raise,rgba(255,255,255,.06));border:1.5px solid var(--field-line,rgba(245,197,66,.5));border-radius:10px;padding:9px 11px;width:100%;box-sizing:border-box;-webkit-user-select:text;user-select:text}',
    '.nb textarea{resize:vertical;line-height:1.55}',
    '.nb input:focus,.nb select:focus,.nb textarea:focus{outline:3px solid var(--gold,#F5C542);outline-offset:1px}',
    '.nb-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1.5px solid var(--field-line,rgba(245,197,66,.5));background:transparent;color:var(--ink,#F1F4FF);border-radius:10px;padding:8px 12px;font:700 .86rem var(--f-body,system-ui,sans-serif);cursor:pointer;white-space:nowrap}',
    '.nb-btn.go{background:var(--blue,#F5C542);color:var(--on-blue,#0A1433);border-color:var(--blue,#F5C542)}',
    '.nb-btn.rec{background:#C0392B;border-color:#C0392B;color:#fff}',
    '.nb-btn:disabled{opacity:.5;cursor:not-allowed}.nb-btn:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:2px}',
    '.nb-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}',
    '.nb-list{display:flex;flex-direction:column;gap:4px;max-height:58vh;overflow:auto}',
    '.nb-topic{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--gold,#FFD766);margin:10px 4px 2px}',
    '.nb-item{all:unset;box-sizing:border-box;display:flex;flex-direction:column;gap:2px;padding:9px 10px;border-radius:10px;cursor:pointer;border:1px solid transparent}',
    '.nb-item:hover{background:var(--raise,rgba(255,255,255,.06))}.nb-item[aria-current=true]{border-color:var(--gold,#F5C542);background:color-mix(in srgb,var(--gold,#F5C542) 8%,transparent)}',
    '.nb-item b{font-size:.92rem}.nb-item span{font-size:.76rem;color:var(--muted,#AEB9DD)}',
    '.nb-item:focus-visible{outline:3px solid var(--gold,#F5C542)}',
    '.nb-kinds{display:inline-flex;padding:4px;border-radius:12px;background:var(--raise,rgba(255,255,255,.06));border:1px solid var(--line,rgba(245,197,66,.25));flex-wrap:wrap}',
    '.nb-kinds button{border:0;background:none;color:var(--muted,#AEB9DD);font:700 .85rem var(--f-body,system-ui,sans-serif);padding:8px 12px;border-radius:9px;cursor:pointer}',
    '.nb-kinds button[aria-pressed=true]{background:var(--blue,#F5C542);color:var(--on-blue,#0A1433)}',
    '.nb-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,2fr);gap:10px}',
    '.nb-grid .full{grid-column:1/-1}@media (max-width:620px){.nb-grid{grid-template-columns:1fr}}',
    '.nb-field{display:flex;flex-direction:column;gap:5px}.nb-field label{font-weight:700;font-size:.86rem}',
    '.nb-sec{border-top:1px dashed var(--line,rgba(245,197,66,.3));padding-top:12px;display:flex;flex-direction:column;gap:10px}',
    '.nb-sec > summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:8px;font:800 1rem var(--f-display,"Bricolage Grotesque",sans-serif)}',
    '.nb-sec > summary::-webkit-details-marker{display:none}.nb-sec > summary .ch{margin-left:auto;color:var(--gold,#F5C542);transition:transform .2s}.nb-sec[open] > summary .ch{transform:rotate(180deg)}',
    '.nb-voice{display:flex;flex-direction:column;gap:8px}',
    '.nb-clip{border:1px solid var(--line,rgba(245,197,66,.25));border-radius:12px;padding:10px;display:flex;flex-direction:column;gap:8px;background:var(--raise,rgba(255,255,255,.04))}',
    '.nb-clip audio{width:100%;height:36px}',
    '.nb-player{display:flex;align-items:center;gap:10px;flex-wrap:wrap}',
    '.nb-player .nb-pp{min-width:96px;font-weight:800}',
    '.nb .nb-player input[type=range]{flex:1;min-width:140px;width:auto;height:24px;padding:0;border:0;background:transparent;accent-color:var(--gold,#F5C542)}',
    '.nb-time{font-variant-numeric:tabular-nums;font-size:.85rem;color:var(--muted,#AEB9DD);min-width:88px;text-align:right}',
    '.nb-draft{border:2px solid var(--gold,#F5C542);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:10px;background:var(--raise,rgba(255,255,255,.05))}',
    '.nb-draft h4{margin:0;font:800 .98rem var(--f-display,"Bricolage Grotesque",sans-serif)}',
    '.nb-clip input.nb-name{font-weight:700;background:transparent;border:1px solid transparent;border-radius:8px;padding:3px 6px;color:inherit;font-size:.95rem;min-width:0;flex:1}',
    '.nb-clip input.nb-name:hover,.nb-clip input.nb-name:focus{border-color:var(--line,rgba(245,197,66,.4))}',
    '.nb-field .nb-lab{display:flex;align-items:center;justify-content:space-between;gap:8px}',
    '.nb-mic{border:1.5px solid var(--field-line,rgba(245,197,66,.5));background:transparent;color:var(--ink,#F1F4FF);border-radius:999px;padding:3px 10px;font:700 .78rem var(--f-body,system-ui,sans-serif);cursor:pointer;white-space:nowrap}',
    '.nb-mic[aria-pressed=true]{background:#C0392B;border-color:#C0392B;color:#fff}',
    '.nb-mic:focus-visible{outline:3px solid var(--gold,#F5C542);outline-offset:2px}',
    '.nb-dict{font-size:.82rem;color:var(--muted,#AEB9DD);min-height:1.1em}',
    '.nb-rectime{font-variant-numeric:tabular-nums;font-weight:800}',
    '.nb-live{min-height:42px;padding:8px 10px;border-radius:10px;background:var(--raise,rgba(255,255,255,.06));color:var(--muted,#AEB9DD);font-size:.9rem}',
    '.nb-status{font-size:.8rem;color:var(--muted,#AEB9DD)}.nb-err{color:var(--bad,#FF7A6B);font-size:.86rem}',
    '.nb-dot{width:10px;height:10px;border-radius:50%;background:#FF5A4F;display:inline-block;animation:nbp 1s infinite}@keyframes nbp{50%{opacity:.25}}',
    '.nb-empty{color:var(--muted,#AEB9DD);font-size:.9rem;padding:10px 4px}'
  ].join('\n');
  function css() { if (document.getElementById('nb-css')) return; var s = document.createElement('style'); s.id = 'nb-css'; s.textContent = CSS; document.head.appendChild(s); }

  function mount(host, opts) {
    css(); opts = opts || {};
    var courses = opts.courses || [];
    var store, notes = [], note = null, paper = null, saveT = null, filter = opts.course || '';
    var root = document.createElement('div'); root.className = 'nb';
    root.innerHTML =
      '<aside class="nb-side">' +
        '<div class="nb-row" style="justify-content:space-between"><h3>My notes</h3><button type="button" class="nb-btn go" data-a="new">New note</button></div>' +
        '<label class="nb-lbl" for="nb-course">Course</label><select id="nb-course"><option value="">All courses</option>' + courses.map(function (c) { return '<option value="' + esc(c.slug) + '">' + esc((c.level ? c.level + ' ' : '') + c.title) + '</option>'; }).join('') + '<option value="other">Other</option></select>' +
        '<input id="nb-search" type="search" placeholder="Search notes" aria-label="Search notes">' +
        '<div class="nb-list" id="nb-list"></div><p class="nb-status" id="nb-where"></p>' +
      '</aside>' +
      '<section class="nb-main" id="nb-main"><p class="nb-empty">Choose a note on the left, or start a new one.</p></section>';
    host.appendChild(root);
    var $ = function (s) { return root.querySelector(s); };
    if (filter) $('#nb-course').value = filter;

    function courseName(slug) { var c = courses.find(function (x) { return x.slug === slug; }); return c ? (c.level ? c.level + ' ' : '') + c.title : (slug === 'other' || !slug ? 'Other' : slug); }
    function renderList() {
      var q = $('#nb-search').value.trim().toLowerCase();
      var list = notes.filter(function (n) { return (!filter || n.course_slug === filter) && (!q || (n.title + ' ' + n.topic).toLowerCase().indexOf(q) >= 0); });
      if (!list.length) { $('#nb-list').innerHTML = '<p class="nb-empty">' + (notes.length ? 'No notes match.' : 'No notes yet. Click New note to start.') + '</p>'; return; }
      var groups = {}; list.forEach(function (n) { var k = (filter ? '' : courseName(n.course_slug) + ' · ') + (n.topic || 'General'); (groups[k] = groups[k] || []).push(n); });
      $('#nb-list').innerHTML = Object.keys(groups).sort().map(function (k) {
        return '<div class="nb-topic">' + esc(k) + '</div>' + groups[k].map(function (n) {
          return '<button type="button" class="nb-item" data-id="' + esc(n.id) + '" aria-current="' + (note && note.id === n.id) + '"><b>' + esc(n.title || 'Untitled note') + '</b><span>' + esc(KINDS[n.kind] ? KINDS[n.kind].name : 'Notes') + ' · ' + new Date(n.updated_at).toLocaleDateString([], { day: 'numeric', month: 'short' }) + '</span></button>';
        }).join('');
      }).join('');
    }
    async function load() {
      try { store = await NotebookStore.open(); notes = await store.listNotes(); $('#nb-where').textContent = store.mode === 'account' ? 'Saved to your Exam Ace account.' : 'Saved on this device.'; renderList(); }
      catch (e) { $('#nb-list').innerHTML = '<p class="nb-err">' + esc(e.message) + '</p>'; }
      if (opts.topic || opts.newNote) newNote();
    }

    function newNote() {
      note = { id: null, course_slug: filter || opts.course || (courses[0] && courses[0].slug) || 'other', topic: opts.topic || '', kind: 'taking', title: '', body: {}, sketch: {} };
      openEditor();
    }
    async function openNote(id) { try { note = await store.getNote(id); openEditor(); renderList(); } catch (e) { flash(e.message, true); } }

    function openEditor() {
      if (paper) { paper.destroy(); paper = null; }
      var topics = Array.from(new Set(notes.filter(function (n) { return n.course_slug === note.course_slug; }).map(function (n) { return n.topic; }).filter(Boolean)));
      $('#nb-main').innerHTML =
        '<div class="nb-row"><input id="nb-title" placeholder="Note title" aria-label="Note title" style="flex:1;min-width:200px;font-weight:700;font-size:1.05rem" value="' + esc(note.title) + '"><span class="nb-status" id="nb-saved"></span></div>' +
        '<div class="nb-row"><div class="nb-field" style="flex:1;min-width:180px"><label for="nb-ncourse">Course</label><select id="nb-ncourse">' + courses.map(function (c) { return '<option value="' + esc(c.slug) + '">' + esc((c.level ? c.level + ' ' : '') + c.title) + '</option>'; }).join('') + '<option value="other">Other</option></select></div>' +
          '<div class="nb-field" style="flex:1;min-width:180px"><label for="nb-topic">Topic</label><input id="nb-topic" list="nb-topics" placeholder="e.g. Module 1 · Sampling methods" value="' + esc(note.topic) + '"><datalist id="nb-topics">' + topics.map(function (t) { return '<option value="' + esc(t) + '">'; }).join('') + '</datalist></div></div>' +
        '<div class="nb-row" style="justify-content:space-between"><div class="nb-kinds" role="group" aria-label="Kind of notes">' + Object.keys(KINDS).map(function (k) { return '<button type="button" data-kind="' + k + '" aria-pressed="' + (note.kind === k) + '">' + KINDS[k].name + '</button>'; }).join('') + '</div>' +
          '<div class="nb-row"><button type="button" class="nb-btn" data-a="speak">Read aloud</button><select id="nb-rep" aria-label="Repeat" style="width:auto"><option value="1">Once</option><option value="2">×2</option><option value="3">×3</option><option value="5">×5</option><option value="0">Loop</option></select><select id="nb-rate" aria-label="Speed" style="width:auto"><option value=".8">Slow</option><option value="1" selected>Normal</option><option value="1.2">Fast</option></select></div></div>' +
        '<p class="nb-status" id="nb-kindhint"></p><div class="nb-grid" id="nb-fields"></div>' +
        '<details class="nb-sec" open><summary>Paper <span class="nb-status" style="font-weight:400">write, sketch or work it out by hand</span><span class="ch" aria-hidden="true">⌄</span></summary><div id="nb-paper"></div></details>' +
        '<details class="nb-sec" open><summary>Voice notes <span class="nb-status" style="font-weight:400">record, replay on repeat, turn into text</span><span class="ch" aria-hidden="true">⌄</span></summary><div class="nb-voice" id="nb-voice"></div></details>' +
        '<div class="nb-row" style="justify-content:space-between;border-top:1px dashed var(--line,rgba(245,197,66,.3));padding-top:12px"><span class="nb-status" id="nb-msg" role="status"></span><button type="button" class="nb-btn" data-a="delete">Delete note</button></div>';
      $('#nb-ncourse').value = note.course_slug || 'other';
      renderFields();
      paper = Paper.mount($('#nb-paper'), { data: note.sketch, onChange: function (d) { note.sketch = d; queueSave(); },
        extraButtons: '<span class="sep"></span><button type="button" class="pp-b" data-ink2text="1" title="Turn your handwriting into typed text">Handwriting → text</button>' });
      $('#nb-paper').addEventListener('click', function (e) { if (e.target.closest('[data-ink2text]')) inkToText(e.target.closest('[data-ink2text]')); });
      renderVoice();
      ['nb-title', 'nb-topic'].forEach(function (id) { $('#' + id).addEventListener('input', function () { note.title = $('#nb-title').value; note.topic = $('#nb-topic').value.trim(); queueSave(); }); });
      $('#nb-ncourse').addEventListener('change', function (e) { note.course_slug = e.target.value; queueSave(); });
    }
    function renderFields() {
      var k = KINDS[note.kind] || KINDS.taking; note.body = note.body || {};
      $('#nb-kindhint').textContent = k.hint;
      $('#nb-fields').innerHTML = k.fields.map(function (f, i) {
        var cls = note.kind === 'taking' ? (f[0] === 'cues' ? '' : f[0] === 'notes' ? '' : 'full') : 'full';
        return '<div class="nb-field ' + cls + '"><div class="nb-lab"><label for="nb-f-' + f[0] + '">' + f[1] + '</label>' + (DSR ? '<button type="button" class="nb-mic" data-a="dictate" data-f="' + f[0] + '" aria-pressed="false" title="Speak and your words are typed here">🎤 Speak to type</button>' : '') + '</div><div class="nb-dict" id="nb-d-' + f[0] + '" aria-live="polite"></div><textarea id="nb-f-' + f[0] + '" data-f="' + f[0] + '" rows="' + f[3] + '" placeholder="' + esc(f[2]) + '">' + esc(note.body[f[0]] || '') + '</textarea></div>';
      }).join('');
      stopDictation();
      root.querySelectorAll('#nb-fields textarea').forEach(function (t) { t.addEventListener('input', function () { note.body[t.dataset.f] = t.value; queueSave(); }); });
      root.querySelectorAll('[data-kind]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.kind === note.kind)); });
    }

    /* ---------- speech to text: speak and the words are typed into the box ---------- */
    var DSR = window.SpeechRecognition || window.webkitSpeechRecognition, dict = null;
    function srLang() { var l = (navigator.language || 'en-US'); return /^en/i.test(l) ? l : 'en-US'; }
    function tidy(t) { t = t.replace(/\s+/g, ' ').trim(); return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; }
    function insertAtCursor(ta, text) {
      var a = ta.selectionStart != null ? ta.selectionStart : ta.value.length, b = ta.selectionEnd != null ? ta.selectionEnd : a;
      var before = ta.value.slice(0, a), after = ta.value.slice(b);
      var sep = before && !/[\s\n]$/.test(before) ? (/[.!?]$/.test(before.trim()) ? ' ' : ' ') : '';
      if (/[.!?]\s*$/.test(before) || !before.trim()) text = tidy(text);
      ta.value = before + sep + text + after; var pos = (before + sep + text).length; ta.setSelectionRange(pos, pos);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }
    function stopDictation() {
      if (!dict) return; var d = dict; dict = null; try { d.r.stop(); } catch (e) {}
      if (d.btn) { d.btn.setAttribute('aria-pressed', 'false'); d.btn.textContent = '🎤 Speak to type'; }
      if (d.out) d.out.textContent = '';
    }
    function startDictation(btn) {
      var f = btn.dataset.f, ta = $('#nb-f-' + f), out = $('#nb-d-' + f);
      if (dict && dict.f === f) { stopDictation(); return; } stopDictation();
      if (rec) { flash('Stop the voice recording first, then use Speak to type.', true); return; }
      var r = new DSR(); r.continuous = true; r.interimResults = true; r.lang = srLang();
      dict = { r: r, f: f, btn: btn, out: out };
      btn.setAttribute('aria-pressed', 'true'); btn.textContent = '■ Stop'; out.textContent = 'Listening… speak now.'; ta.focus();
      r.onresult = function (e) {
        var tmp = '';
        for (var i = e.resultIndex; i < e.results.length; i++) { var t = e.results[i][0].transcript; if (e.results[i].isFinal) insertAtCursor(ta, t.trim()); else tmp += t; }
        out.textContent = tmp ? '… ' + tmp : 'Listening…';
      };
      r.onerror = function (e) { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { flash('Allow the microphone for this page, then press Speak to type again.', true); stopDictation(); } else if (e.error === 'network') { flash('Speak to type needs the internet in this browser.', true); stopDictation(); } };
      r.onend = function () { if (dict && dict.r === r) { try { r.start(); } catch (x) { stopDictation(); } } };
      try { r.start(); } catch (x) { stopDictation(); }
    }

    /* turn a saved recording into text on this device: play it aloud and listen (Chrome and Edge) */
    function listenTranscribe(url, onText) {
      return new Promise(function (resolve, reject) {
        if (!DSR) return reject(new Error('Turning a recording into text on this device needs Chrome or Edge. You can type it in the box instead.'));
        var a = new Audio(url), r = new DSR(), text = '', done = false;
        r.continuous = true; r.interimResults = true; r.lang = srLang();
        function finish() { if (done) return; done = true; try { r.stop(); } catch (e) {} a.pause(); setTimeout(function () { resolve(tidy(text)); }, 400); }
        r.onresult = function (e) { var fin = '', tmp = ''; for (var i = 0; i < e.results.length; i++) { (e.results[i].isFinal ? (fin += e.results[i][0].transcript + ' ') : (tmp += e.results[i][0].transcript)); } text = fin; onText && onText(tidy(fin + tmp)); };
        r.onerror = function (e) { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { done = true; a.pause(); reject(new Error('Allow the microphone so the recording can be heard and turned into text.')); } };
        r.onend = function () { if (!done) { try { r.start(); } catch (e) {} } };
        a.onended = function () { setTimeout(finish, 1200); };
        a.onerror = function () { done = true; try { r.stop(); } catch (e) {} reject(new Error('The recording could not play.')); };
        try { r.start(); } catch (e) {}
        setTimeout(function () { a.play().catch(function () { done = true; try { r.stop(); } catch (e) {} reject(new Error('Press play once, then try Turn into text again.')); }); }, 500);
      });
    }
    async function transcribeClip(v, url, ta, btn) {
      btn.disabled = true; var lbl = btn.textContent; btn.textContent = 'Turning into text…';
      try {
        var t = '';
        if (store.mode === 'account') { try { t = await store.transcribe(v); } catch (x) { t = ''; if (!DSR) throw x; } }
        if (!t) { flash('Playing the recording to turn it into text. Turn your volume up and keep the room quiet.'); t = await listenTranscribe(url, function (p) { ta.value = p; }); }
        if (!t) throw new Error('No words were heard. Turn the volume up and try again, or type it in the box.');
        ta.value = t; ta.dispatchEvent(new Event('change')); flash('Done. Check the text over.');
      } catch (x) { flash(x.message, true); }
      btn.disabled = false; btn.textContent = lbl;
    }

    /* ---------- saving ---------- */
    function queueSave() { $('#nb-saved') && ($('#nb-saved').textContent = 'Saving…'); clearTimeout(saveT); saveT = setTimeout(save, 800); }
    async function save() {
      try {
        var saved = await store.saveNote(note); note.id = saved.id; note.updated_at = saved.updated_at;
        var i = notes.findIndex(function (n) { return n.id === note.id; }); var row = { id: note.id, course_slug: note.course_slug, topic: note.topic, kind: note.kind, title: note.title, updated_at: note.updated_at };
        if (i >= 0) notes[i] = row; else notes.unshift(row);
        renderList(); $('#nb-saved') && ($('#nb-saved').textContent = 'Saved');
      } catch (e) { $('#nb-saved') && ($('#nb-saved').textContent = ''); flash(e.message, true); }
    }
    async function ensureSaved() { if (!note.id) { clearTimeout(saveT); await save(); } return note.id; }
    function flash(t, bad) { var m = $('#nb-msg'); if (!m) return; m.textContent = t; m.className = bad ? 'nb-err' : 'nb-status'; clearTimeout(m._t); m._t = setTimeout(function () { m.textContent = ''; }, 6000); }

    /* ---------- read aloud, with repeats ---------- */
    var speaking = false;
    function speakText() {
      var k = KINDS[note.kind] || KINDS.taking;
      return [note.title].concat(k.fields.map(function (f) { var v = (note.body[f[0]] || '').trim(); return v ? f[1] + '. ' + v : ''; })).filter(Boolean).join('. \n');
    }
    function speak(btn) {
      if (!('speechSynthesis' in window)) { flash('Read-aloud isn\'t available in this browser.', true); return; }
      if (speaking) { speaking = false; speechSynthesis.cancel(); btn.textContent = 'Read aloud'; return; }
      var text = speakText(); if (!text.trim()) { flash('Write something first, then press Read aloud.', true); return; }
      var reps = Number($('#nb-rep').value), rate = Number($('#nb-rate').value), n = 0;
      speaking = true; btn.textContent = 'Stop reading';
      (function next() {
        if (!speaking) return;
        if (reps && n >= reps) { speaking = false; btn.textContent = 'Read aloud'; return; }
        n++; var u = new SpeechSynthesisUtterance(text); u.rate = rate; u.lang = 'en';
        var v = speechSynthesis.getVoices().find(function (x) { return /en[-_](GB|JM|TT|US)/i.test(x.lang); }); if (v) u.voice = v;
        u.onend = function () { setTimeout(next, 900); }; u.onerror = function () { speaking = false; btn.textContent = 'Read aloud'; };
        speechSynthesis.speak(u);
      })();
    }

    /* ---------- handwriting → text ---------- */
    async function inkToText(btn) {
      if (paper.isEmpty()) { flash('Write on the paper first.', true); return; }
      btn.disabled = true; var old = btn.textContent; btn.textContent = 'Reading…';
      try {
        var text = await store.handwriting(paper.toPng(true), paper.strokes());
        if (!text.trim()) { flash('No writing could be read. Try writing a little larger.', true); return; }
        var field = note.kind === 'taking' ? 'notes' : note.kind === 'making' ? 'own' : 'text';
        note.body[field] = (note.body[field] ? note.body[field].replace(/\s+$/, '') + '\n\n' : '') + text.trim();
        renderFields(); queueSave(); flash('Added your handwriting as text. Check it over.');
      } catch (e) { flash(e.message, true); }
      finally { btn.disabled = false; btn.textContent = old; }
    }

    /* ---------- voice notes ---------- */
    var rec = null, recStream = null, chunks = [], recog = null, liveText = '', clips = [], urls = [];
    var recPaused = false, recMs = 0, recTick = null, recLast = 0, draft = null;
    function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
    function extFor(type) { type = type || ''; return /mp4|m4a|aac/.test(type) ? 'm4a' : /mpeg|mp3/.test(type) ? 'mp3' : /wav/.test(type) ? 'wav' : /ogg/.test(type) ? 'ogg' : 'webm'; }
    function safeName(n) { return (n || 'Voice note').replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim().slice(0, 80) || 'Voice note'; }
    async function saveBlob(blob, name) {
      var SS = window.SimSave || (function () { try { return window.parent.SimSave; } catch (e) { return null; } })();
      if (SS && SS.save) { try { await SS.save(name, blob); return; } catch (e) {} }
      var u = URL.createObjectURL(blob), a = document.createElement('a'); a.href = u; a.download = name; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
    }
    async function downloadClip(v, url) {
      try {
        var blob = v.blob; if (!blob) { var r = await fetch(url); if (!r.ok) throw new Error(); blob = await r.blob(); }
        await saveBlob(blob, safeName(v.name) + '.' + extFor(blob.type || v.mime)); flash('Download started.');
      } catch (e) { flash('That recording could not be downloaded. Check your connection and try again.', true); }
    }
    /* a play / pause player wired to an <audio> element inside host */
    function player(host) {
      var a = host.querySelector('audio'), pp = host.querySelector('.nb-pp'), bar = host.querySelector('input[type=range]'), tm = host.querySelector('.nb-time'), seeking = false;
      function dur() { return isFinite(a.duration) ? a.duration : 0; }
      function paint() { pp.textContent = a.paused ? '▶ Play' : '❚❚ Pause'; pp.setAttribute('aria-label', a.paused ? 'Play' : 'Pause'); tm.textContent = fmt(a.currentTime) + ' / ' + (dur() ? fmt(dur()) : '–:––'); if (!seeking) bar.value = dur() ? Math.round(a.currentTime / dur() * 1000) : 0; }
      /* webm from MediaRecorder often reports Infinity until it is scanned once */
      a.addEventListener('loadedmetadata', function () { if (a.duration === Infinity) { a.currentTime = 1e7; a.addEventListener('timeupdate', function f() { a.removeEventListener('timeupdate', f); a.currentTime = 0; paint(); }); } paint(); });
      ['play', 'pause', 'timeupdate', 'ended', 'durationchange'].forEach(function (ev) { a.addEventListener(ev, paint); });
      pp.addEventListener('click', function () { if (a.paused) { a.play().catch(function () { flash('The recording could not play here.', true); }); } else a.pause(); });
      bar.addEventListener('input', function () { seeking = true; if (dur()) tm.textContent = fmt(bar.value / 1000 * dur()) + ' / ' + fmt(dur()); });
      bar.addEventListener('change', function () { if (dur()) a.currentTime = bar.value / 1000 * dur(); seeking = false; });
      paint(); return a;
    }
    var PLAYER = '<div class="nb-player"><button type="button" class="nb-btn nb-pp">▶ Play</button><input type="range" min="0" max="1000" value="0" aria-label="Position in the recording"><span class="nb-time">0:00 / –:––</span></div>';
    function stopAllAudio(except) { root.querySelectorAll('audio').forEach(function (x) { if (x !== except && !x.paused) x.pause(); }); }

    async function renderVoice() {
      var canRec = !!(navigator.mediaDevices && window.MediaRecorder);
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      $('#nb-voice').innerHTML =
        '<div class="nb-row" id="nb-recrow"><button type="button" class="nb-btn rec" data-a="rec"' + (canRec ? '' : ' disabled') + '>● Record</button>' +
        '<button type="button" class="nb-btn" data-a="recpause" hidden>❚❚ Pause</button>' +
        '<span class="nb-rectime" id="nb-rectime" hidden>0:00</span>' +
        '<label class="nb-btn" style="cursor:pointer">Upload audio<input type="file" accept="audio/*" data-a="upload" hidden></label>' +
        '<span class="nb-status" id="nb-recstat">' + (canRec ? (SR ? 'Your words appear as text while you speak.' : 'Recording works here; live text needs Chrome or Edge.') : 'Recording isn\'t available here. You can still upload a recording.') + '</span></div>' +
        '<div class="nb-live" id="nb-livebox" hidden></div><div id="nb-draft"></div><div id="nb-clips" class="nb-voice"></div>';
      urls.forEach(function (u) { if (u.startsWith('blob:')) URL.revokeObjectURL(u); }); urls = [];
      renderDraft();
      if (!note.id) { $('#nb-clips').innerHTML = '<p class="nb-status">Recordings are kept with this note.</p>'; return; }
      try { clips = await store.listVoice(note.id); } catch (e) { flash(e.message, true); clips = []; }
      $('#nb-clips').innerHTML = clips.length ? '' : '<p class="nb-status">No saved recordings yet.</p>';
      for (var i = 0; i < clips.length; i++) {
        var v = clips[i], url = ''; try { url = await store.voiceUrl(v); urls.push(url); } catch (e) {}
        var d = document.createElement('div'); d.className = 'nb-clip'; d.dataset.id = v.id;
        d.innerHTML = '<div class="nb-row" style="justify-content:space-between;flex-wrap:nowrap"><input class="nb-name" data-name value="' + esc(v.name || 'Voice note') + '" aria-label="Name of this recording"><span class="nb-status" style="white-space:nowrap">' + (v.source === 'uploaded' ? 'Uploaded' : 'Recorded') + ' · ' + new Date(v.created_at).toLocaleDateString([], { day: 'numeric', month: 'short' }) + '</span></div>' +
          '<audio preload="metadata" src="' + esc(url) + '"></audio>' + PLAYER +
          '<div class="nb-row"><label class="nb-status">Play <select data-rep style="width:auto;padding:4px 6px"><option value="1">once</option><option value="3">3 times</option><option value="5">5 times</option><option value="0">on loop</option></select></label>' +
          '<label class="nb-status">Speed <select data-speed style="width:auto;padding:4px 6px"><option value=".75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option></select></label>' +
          '<button type="button" class="nb-btn" data-a="play">Play with repeats</button><button type="button" class="nb-btn" data-a="dlclip">⬇ Download</button></div>' +
          '<label class="nb-status" for="tr-' + esc(v.id) + '">Text of this recording</label><textarea id="tr-' + esc(v.id) + '" data-tr rows="3" placeholder="Press Turn into text, or type it yourself.">' + esc(v.transcript || '') + '</textarea>' +
          '<div class="nb-row"><button type="button" class="nb-btn" data-a="transcribe">Turn into text</button>' +
          '<button type="button" class="nb-btn" data-a="addtr">Add text to my notes</button><button type="button" class="nb-btn" data-a="delclip">Delete</button></div>';
        $('#nb-clips').appendChild(d);
        (function (v, d, url) {
          d.querySelector('[data-tr]').addEventListener('change', function (e) { store.updateVoice(v, { transcript: e.target.value }).catch(function (x) { flash(x.message, true); }); v.transcript = e.target.value; });
          d.querySelector('[data-name]').addEventListener('change', function (e) { var n = e.target.value.trim() || 'Voice note'; e.target.value = n; v.name = n; store.updateVoice(v, { name: n }).then(function () { flash('Name saved.'); }).catch(function (x) { flash(x.message, true); }); });
          var a = player(d); a.addEventListener('play', function () { stopAllAudio(a); });
          d.querySelector('[data-speed]').addEventListener('change', function (e) { a.playbackRate = Number(e.target.value); });
          d._url = url;
        })(v, d, url);
      }
    }

    /* the recording you just made: listen back, then save, download or record again */
    function renderDraft() {
      var box = $('#nb-draft'); if (!box) return;
      if (!draft) { box.innerHTML = ''; return; }
      box.innerHTML = '<div class="nb-draft"><h4>Listen back before you save</h4>' +
        '<input class="nb-name" data-dname value="' + esc(draft.name) + '" aria-label="Name for this recording" style="border-color:var(--line,rgba(245,197,66,.4))">' +
        '<audio preload="metadata" src="' + esc(draft.url) + '"></audio>' + PLAYER +
        '<label class="nb-status" for="nb-dtext">Text of this recording</label><textarea id="nb-dtext" rows="3" placeholder="Press Turn into text, or type it yourself.">' + esc(draft.transcript || '') + '</textarea>' +
        '<div class="nb-row"><button type="button" class="nb-btn go" data-a="dsave">✓ Save to this note</button>' +
        '<button type="button" class="nb-btn" data-a="dtranscribe">Turn into text</button><button type="button" class="nb-btn" data-a="ddl">⬇ Download</button><button type="button" class="nb-btn" data-a="ddiscard">Discard</button></div></div>';
      var a = player(box); a.addEventListener('play', function () { stopAllAudio(a); });
      box.querySelector('[data-dname]').addEventListener('input', function (e) { draft.name = e.target.value; });
      box.querySelector('#nb-dtext').addEventListener('input', function (e) { draft.transcript = e.target.value; });
    }
    async function transcribeDraft(btn, ta) {
      btn.disabled = true; var lbl = btn.textContent; btn.textContent = 'Turning into text…';
      try { flash('Playing the recording to turn it into text. Turn your volume up and keep the room quiet.'); var t = await listenTranscribe(draft.url, function (p) { ta.value = p; }); if (!t) throw new Error('No words were heard. Turn the volume up and try again, or type it in the box.'); ta.value = t; draft.transcript = t; flash('Done. Check the text over, then save.'); }
      catch (x) { flash(x.message, true); }
      btn.disabled = false; btn.textContent = lbl;
    }
    function clearDraft() { if (draft && draft.url) URL.revokeObjectURL(draft.url); draft = null; renderDraft(); }
    async function saveDraft(btn) {
      if (!draft) return; btn.disabled = true; btn.textContent = 'Saving…';
      try { await ensureSaved(); await store.addVoice(note.id, draft.blob, { name: (draft.name || '').trim() || 'Voice note', source: 'recorded', transcript: (draft.transcript || '').trim() }); clearDraft(); flash('Recording saved to this note.'); renderVoice(); }
      catch (e) { flash(e.message, true); btn.disabled = false; btn.textContent = '✓ Save to this note'; }
    }

    function recUI(state) {
      var r = $('[data-a=rec]'), p = $('[data-a=recpause]'), t = $('#nb-rectime'), s = $('#nb-recstat'); if (!r) return;
      if (state === 'idle') { r.innerHTML = '● Record'; p.hidden = true; t.hidden = true; s.hidden = false; return; }
      r.innerHTML = '■ Stop'; p.hidden = false; t.hidden = false; s.hidden = true;
      p.innerHTML = state === 'paused' ? '● Resume' : '❚❚ Pause';
      t.innerHTML = (state === 'paused' ? 'Paused · ' : '<span class="nb-dot" aria-hidden="true"></span> ') + fmt(recMs / 1000);
    }
    function tick() { if (!recPaused) { var n = Date.now(); recMs += n - recLast; recLast = n; } recUI(recPaused ? 'paused' : 'rec'); }
    function startRecog() {
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition, box = $('#nb-livebox'); if (!SR) return;
      var base = liveText;
      recog = new SR(); recog.continuous = true; recog.interimResults = true; recog.lang = 'en-US';
      box.hidden = false; box.textContent = base || 'Listening…';
      recog.onresult = function (e) { var fin = '', tmp = ''; for (var i = 0; i < e.results.length; i++) { (e.results[i].isFinal ? (fin += e.results[i][0].transcript + ' ') : (tmp += e.results[i][0].transcript)); } liveText = base + fin; box.textContent = (liveText + tmp) || 'Listening…'; };
      recog.onend = function () { if (rec && rec.state === 'recording' && recog) { base = liveText; try { recog.start(); } catch (e) {} } };
      try { recog.start(); } catch (e) {}
    }
    function stopRecog() { var r = recog; recog = null; if (r) try { r.stop(); } catch (e) {} }
    async function startRec() {
      stopDictation(); if (draft) clearDraft();
      try {
        recStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        var type = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'].find(function (t) { return MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t); }) || '';
        rec = new MediaRecorder(recStream, type ? { mimeType: type } : undefined); chunks = []; liveText = '';
        rec.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); };
        rec.onstop = function () {
          var mt = (rec && rec.mimeType) || type || 'audio/webm';
          if (recStream) recStream.getTracks().forEach(function (t) { t.stop(); }); recStream = null;
          var blob = new Blob(chunks, { type: mt.split(';')[0] }); rec = null;
          if (!blob.size) { flash('Nothing was recorded. Try again.', true); return; }
          draft = { blob: blob, url: URL.createObjectURL(blob), transcript: tidy(liveText), name: 'Voice note ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
          renderDraft(); flash('Recording stopped. Listen back, then save or download it.');
        };
        rec.start(1000);
        recPaused = false; recMs = 0; recLast = Date.now(); clearInterval(recTick); recTick = setInterval(tick, 250); recUI('rec');
        startRecog();
      } catch (e) { rec = null; flash(/denied|NotAllowed/i.test(e.name + e.message) ? 'Allow the microphone for this page, then press Record again.' : 'Recording didn\'t start: ' + e.message, true); }
    }
    function pauseRec() {
      if (!rec || !rec.pause) return;
      if (rec.state === 'recording') { rec.pause(); recPaused = true; tick(); stopRecog(); var bx = $('#nb-livebox'); if (bx) bx.textContent = (liveText || '') + ' (paused)'; }
      else if (rec.state === 'paused') { rec.resume(); recPaused = false; recLast = Date.now(); startRecog(); }
      recUI(recPaused ? 'paused' : 'rec');
    }
    function stopRec() {
      clearInterval(recTick); recTick = null; stopRecog();
      if (rec && rec.state !== 'inactive') rec.stop();
      recPaused = false; recUI('idle'); var box = $('#nb-livebox'); if (box) box.hidden = true;
    }
    async function upload(file) {
      if (!file) return; if (!/^audio\//.test(file.type) && !/\.(mp3|m4a|wav|ogg|webm|aac)$/i.test(file.name)) { flash('Choose an audio file (mp3, m4a, wav, ogg or webm).', true); return; }
      if (file.size > 25 * 1024 * 1024) { flash('That recording is over 25 MB. Upload a shorter one.', true); return; }
      try { await ensureSaved(); flash('Uploading…'); await store.addVoice(note.id, file, { name: file.name.replace(/\.[^.]+$/, ''), source: 'uploaded', transcript: '' }); flash('Recording added.'); renderVoice(); }
      catch (e) { flash(e.message, true); }
    }
    function playRepeats(clipEl) {
      var a = clipEl.querySelector('audio'), reps = Number(clipEl.querySelector('[data-rep]').value), n = 1;
      a.loop = reps === 0; a.currentTime = 0; a.playbackRate = Number(clipEl.querySelector('[data-speed]').value);
      a.onended = function () { if (reps && n < reps) { n++; setTimeout(function () { a.currentTime = 0; a.play(); }, 700); } };
      a.play().catch(function () { flash('Press play on the recording to start it.', true); });
    }

    /* ---------- clicks ---------- */
    root.addEventListener('click', async function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.id) return openNote(b.dataset.id);
      if (b.dataset.kind) { note.kind = b.dataset.kind; renderFields(); queueSave(); return; }
      var a = b.dataset.a, clip = b.closest('.nb-clip'), v = clip && clips.find(function (x) { return x.id === clip.dataset.id; });
      if (a === 'new') newNote();
      if (a === 'speak') speak(b);
      if (a === 'rec') { rec ? stopRec() : startRec(); }
      if (a === 'recpause') pauseRec();
      if (a === 'dsave') saveDraft(b);
      if (a === 'ddl' && draft) { saveBlob(draft.blob, safeName(draft.name) + '.' + extFor(draft.blob.type)).then(function () { flash('Download started.'); }); }
      if (a === 'ddiscard') { if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Discard for good?'; return; } clearDraft(); flash('Recording discarded.'); }
      if (a === 'dlclip' && v) downloadClip(v, clip._url);
      if (a === 'play' && clip) playRepeats(clip);
      if (a === 'transcribe' && v) transcribeClip(v, clip._url, clip.querySelector('[data-tr]'), b);
      if (a === 'dictate') startDictation(b);
      if (a === 'dtranscribe' && draft) { var dta = $('#nb-dtext'); transcribeDraft(b, dta); }
      if (a === 'addtr' && v) { var t2 = clip.querySelector('[data-tr]').value.trim(); if (!t2) { flash('There\'s no text for this recording yet.', true); return; } var f = note.kind === 'taking' ? 'notes' : note.kind === 'making' ? 'own' : 'text'; note.body[f] = (note.body[f] ? note.body[f].replace(/\s+$/, '') + '\n\n' : '') + t2; renderFields(); queueSave(); flash('Added to your notes.'); }
      if (a === 'delclip' && v) { if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Delete for good?'; return; } try { await store.deleteVoice(v); renderVoice(); } catch (x) { flash(x.message, true); } }
      if (a === 'delete') {
        if (!note.id) { note = null; $('#nb-main').innerHTML = '<p class="nb-empty">Choose a note on the left, or start a new one.</p>'; return; }
        if (b.dataset.sure !== '1') { b.dataset.sure = '1'; b.textContent = 'Delete this note and its recordings?'; return; }
        try { await store.deleteNote(note.id); notes = notes.filter(function (n) { return n.id !== note.id; }); note = null; if (paper) { paper.destroy(); paper = null; } $('#nb-main').innerHTML = '<p class="nb-empty">Note deleted.</p>'; renderList(); } catch (x) { flash(x.message, true); }
      }
    });
    root.addEventListener('change', function (e) { if (e.target.dataset && e.target.dataset.a === 'upload') { upload(e.target.files[0]); e.target.value = ''; } });
    $('#nb-course').addEventListener('change', function (e) { filter = e.target.value; renderList(); });
    $('#nb-search').addEventListener('input', renderList);

    load();
    return { el: root, newNote: function (o) { if (o) { if (o.course) note && (note.course_slug = o.course); opts.topic = o.topic || opts.topic; } newNote(); } };
  }
  window.Notebook = { mount: mount, KINDS: KINDS };
})();
