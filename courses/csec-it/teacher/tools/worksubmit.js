/* Work Submit: "Save as PDF", "Word" and "Submit" for every completed activity, quiz, essay, paper and test in the course,
   and the Save / Submit panel that games and simulators open with SimSave.submit(). Needs tools/simsave.js.
   Submit makes a PDF of just that piece of work (name, class, course, date, the task, the answers and the score),
   saves it, then offers email, Google Classroom or Microsoft Teams. Developed by Kester Small. */
(function () {
  'use strict';
  if (window.WorkSubmit) return;
  const LS = { get(k) { try { return localStorage.getItem('ws.' + k) || ''; } catch (e) { return ''; } }, set(k, v) { try { localStorage.setItem('ws.' + k, v); } catch (e) { } } };
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const S = () => { try { return (window.COURSE_API && window.COURSE_API.S) || {}; } catch (e) { return {}; } };
  function courseName() {
    const base = String(document.title || 'Course').split(' · ')[0].trim();
    const MAP = { 'EDPM': 'CSEC Electronic Document Preparation and Management', 'Digital Media Unit 1': 'CAPE Digital Media Unit 1', 'Digital Media Unit 2': 'CAPE Digital Media Unit 2', 'Information Technology Unit 1': 'CAPE Information Technology Unit 1' };
    return MAP[base] || base;
  }
  const edition = () => S().teacher ? "Teacher's Version" : "Student's Version";
  const today = () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  /* ---------- clean, printable copy of the current work ---------- */
  const DROP = '.foot,footer,[data-act="reset"],.ws-row,.crumbs,.nav,.tools,.tool,.ws-bar,.saved-note,audio,video,iframe,script,style,noscript,.ss-ignore,.lvdial,.dial-pill,.listen,[data-act="listen"],[hidden],.sr-only,.visually-hidden,.timer,.toast';
  function snapshot(root) {
    const clone = root.cloneNode(true);
    const src = [...root.querySelectorAll('textarea,input,select')], dst = [...clone.querySelectorAll('textarea,input,select')];
    src.forEach((o, i) => {
      const c = dst[i]; if (!c) return; let rep = null;
      if (o.tagName === 'TEXTAREA') { rep = document.createElement('div'); rep.className = 'ss-ans'; rep.textContent = o.value.trim() || '(no answer written)'; }
      else if (o.tagName === 'SELECT') { rep = document.createElement('b'); rep.textContent = o.selectedOptions && o.selectedOptions[0] ? o.selectedOptions[0].text : ''; }
      else if (/^(checkbox|radio)$/.test(o.type)) { rep = document.createElement('span'); rep.textContent = o.checked ? '☑ ' : '☐ '; }
      else if (/^(hidden|button|submit|reset|file|range|color|image)$/.test(o.type)) rep = null;
      else { rep = document.createElement('b'); rep.className = 'ss-inl'; rep.textContent = o.value || '____'; }
      if (rep) c.replaceWith(rep); else c.remove();
    });
    clone.querySelectorAll('[contenteditable="true"]').forEach(e => { e.removeAttribute('contenteditable'); e.classList.add('ss-ans'); });
    clone.querySelectorAll(DROP).forEach(e => e.remove());
    clone.querySelectorAll('details').forEach(d => { d.setAttribute('open', ''); const s = d.querySelector(':scope>summary'); if (s) { const p = document.createElement('p'); p.innerHTML = '<b>' + esc(s.textContent.trim()) + '</b>'; s.replaceWith(p); } });
    clone.querySelectorAll('button').forEach(b => {
      const cls = (b.className || '') + ' ' + (b.getAttribute('aria-pressed') === 'true' ? 'sel' : '');
      if (b.hasAttribute('data-go') || /\b(btn|linkbtn|tool|close|x)\b/.test(b.className || '') || !b.textContent.trim()) { b.remove(); return; }
      const p = document.createElement('div'); p.className = 'ss-opt' + (/\b(sel|on|picked|chosen|active)\b/.test(cls) ? ' sel' : '');
      const mark = /\b(right|correct|ok|good)\b/.test(cls) ? ' <span class="ss-ok">✓ correct</span>' : /\b(wrong|bad|no|incorrect)\b/.test(cls) ? ' <span class="ss-no">✗</span>' : '';
      const kids = [...b.children]; const lead = kids.length > 1 && kids[0].textContent.trim().length <= 2 ? kids[0].textContent.trim() + '. ' + kids.slice(1).map(k => k.textContent).join(' ') : b.textContent;
      p.innerHTML = (/\bsel\b|\bon\b|picked|chosen|active/.test(cls) ? '● ' : '○ ') + esc(lead.replace(/\s+/g, ' ').trim()) + mark;
      b.replaceWith(p);
    });
    clone.querySelectorAll('.fb').forEach(f => { f.classList.contains('good') ? f.classList.add('ss-okbox') : f.classList.contains('bad') ? f.classList.add('ss-nobox') : 0; });
    const keepCls = /^(ss-[a-z0-9-]+)$/;
    clone.querySelectorAll('*').forEach(e => {
      [...e.attributes].forEach(a => {
        const n = a.name;
        if (n === 'class') { const k = [...e.classList].filter(c => keepCls.test(c)); if (k.length) e.setAttribute('class', k.join(' ')); else e.removeAttribute('class'); }
        else if (!/^(src|alt|href|colspan|rowspan|width|height|viewbox|xmlns|d|fill|stroke|stroke-width|x|y|x1|y1|x2|y2|cx|cy|r|rx|ry|points|transform|font-size|text-anchor|open|style)$/i.test(n)) e.removeAttribute(n);
        else if (n === 'style' && e.namespaceURI !== 'http://www.w3.org/2000/svg') e.removeAttribute('style');
      });
    });
    return clone.innerHTML;
  }
  const EXTRA_CSS = '.ss-print .ss-okbox{border-left:4px solid #0a7a3a;background:#effaf3;padding:6px 10px;margin:6px 0}.ss-print .ss-nobox{border-left:4px solid #b42318;background:#fdf1f0;padding:6px 10px;margin:6px 0}.ss-print .ss-inl{border-bottom:1px solid #7a8ab0;padding:0 4px}';
  function headHTML(o) {
    const rows = [['Name', o.name || ''], ['Class', o.cls || ''], ['Course', o.course || courseName()], ['Date', today()]];
    if (o.score != null && o.score !== '') rows.push(['Score', o.score + (o.max != null && o.max !== '' ? ' / ' + o.max : '') + (o.pct != null ? ` (${o.pct}%)` : '')]);
    let t = '<table class="ss-meta">'; for (let i = 0; i < rows.length; i += 2) t += `<tr><td>${esc(rows[i][0])}</td><td>${esc(rows[i][1])}</td>${rows[i + 1] ? `<td>${esc(rows[i + 1][0])}</td><td>${esc(rows[i + 1][1])}</td>` : '<td></td><td></td>'}</tr>`; t += '</table>';
    return `<style>${EXTRA_CSS}</style><div class="ss-head"><h1>${esc(o.title || 'My work')}</h1>${t}</div>`;
  }
  const footHTML = () => `<p class="ss-foot">${esc(courseName())} · ${esc(edition())} · Kester Small</p>`;

  /* ---------- the panel ---------- */
  let CSSDONE = false;
  function css() {
    if (CSSDONE) return; CSSDONE = true;
    const s = document.createElement('style');
    s.textContent = `.ws-bar{display:inline-flex;flex-wrap:wrap;gap:6px;align-items:center}
.ws-bar .btn{white-space:nowrap}
.ws-row{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;justify-content:space-between;margin:10px 0;padding:8px 12px;border-radius:12px;border:1px dashed var(--line,#99a)}
.ws-row>span{font-weight:700}
.ws-who{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 18px 6px}.ws-who label{font-weight:600;font-size:13px}.ws-who input{width:100%;box-sizing:border-box;margin-top:3px;padding:7px 9px;border:1px solid #9aa;border-radius:8px;font:inherit}
.ws-send{display:grid;gap:8px;padding:4px 18px 16px}.ws-send a,.ws-send button{display:flex;gap:10px;align-items:center;text-decoration:none;color:#1b1b1b;border:2px solid #d6dce8;border-radius:10px;background:#f7f9fd;padding:9px 12px;font:inherit;cursor:pointer;text-align:left}
.ws-send a:hover,.ws-send button:hover,.ws-send a:focus-visible,.ws-send button:focus-visible{border-color:#2b579a;background:#eef3fb;outline:none}
.ws-send .ic{flex:0 0 34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:12px}
.ws-note{padding:0 18px 6px;font-size:13px;color:#333}.ws-note b{color:#0a7a3a}
@media (max-width:420px){.ws-who{grid-template-columns:1fr}}`;
    document.head.appendChild(s);
  }
  function panel(o) {
    const SS = window.SimSave; if (!SS) { alert('Saving is not available on this page.'); return; }
    /* a game playing in browser full screen would hide this panel (and the download prompt): leave full screen first; the player's ⛶ button puts it back */
    try { const fe = document.fullscreenElement || document.webkitFullscreenElement; if (fe) { const r = (document.exitFullscreen || document.webkitExitFullscreen).call(document); if (r && r.catch) r.catch(() => { }); } } catch (e) { }
    css();
    const S0 = S(); const name0 = o.name || S0.name || LS.get('name'), cls0 = LS.get('class');
    const title = o.title || 'My work';
    const docHTML = (nm, cl) => headHTML(Object.assign({}, o, { name: nm, cls: cl })) + (o.html || '') + footHTML();
    const fname = (nm, ext) => SS.cleanName((nm ? nm.split(/\s+/)[0] + '_' : '') + title, ext);
    let dlg = null;
    const make = {
      pdf: (nm, cl) => SS.pdfFromHTML(docHTML(nm, cl), { title, author: nm }),
      docx: (nm, cl) => SS.withPrintBox(docHTML(nm, cl), box => SS.docx(box, { title, author: nm, footer: courseName(), pageNumbers: true }))
    };
    const back = document.createElement('div'); back.className = 'ss-back ss-ignore';
    const d = document.createElement('div'); d.className = 'ss-dlg'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-labelledby', 'ws-h');
    d.innerHTML = `<h2 id="ws-h">${o.mode === 'submit' ? 'Submit your work' : 'Save your work'}</h2><p class="ss-sub">${esc(title)}</p>
      <div class="ws-who"><label>Your name<input id="ws-name" autocomplete="name" value="${esc(name0)}"></label><label>Class<input id="ws-class" value="${esc(cls0)}" placeholder="e.g. 5B or L6"></label></div>
      <div class="ss-fmts"></div><div class="ws-after" hidden></div><div class="ss-foot"><button type="button" class="ss-x">Close</button></div>`;
    const fm = d.querySelector('.ss-fmts'), after = d.querySelector('.ws-after');
    const who = () => { const nm = d.querySelector('#ws-name').value.trim(), cl = d.querySelector('#ws-class').value.trim(); LS.set('name', nm); LS.set('class', cl); return [nm, cl]; };
    const btn = (ext, label, note, fn) => { const ic = { pdf: ['PDF', '#c4302b'], docx: ['W', '#2b579a'], send: ['📤', '#0a7a3a'] }[ext]; const b = document.createElement('button'); b.type = 'button'; b.className = 'ss-fmt'; b.innerHTML = `<span class="ss-ic" style="background:${ic[1]}" aria-hidden="true">${ic[0]}</span><span><b>${esc(label)}</b><small>${esc(note)}</small></span>`; b.onclick = async () => { if (b.getAttribute('aria-busy') === 'true') return; b.setAttribute('aria-busy', 'true'); const L = b.querySelector('b'), old = L.textContent; L.textContent = 'Preparing…'; try { await fn(); } catch (e) { console.warn(e); SS.toast(e && /renderer/.test(e.message) ? e.message : 'Sorry, that file could not be made. Please try again.'); } finally { b.removeAttribute('aria-busy'); L.textContent = old; } }; fm.appendChild(b); return b; };
    btn('send', 'Submit to my teacher', 'Saves a PDF of this work, then helps you send it', async () => {
      const [nm, cl] = who(); if (!nm) { SS.toast('Type your name first so your teacher knows whose work it is.'); d.querySelector('#ws-name').focus(); return; }
      const fn = fname(nm, 'pdf'); const blob = await make.pdf(nm, cl);
      let shared = false;
      try { const file = new File([blob], fn, { type: 'application/pdf' }); if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title, text: `${title} · ${nm}${cl ? ' · ' + cl : ''}` }); shared = true; } } catch (e) { if (e && e.name === 'AbortError') return; }
      if (!shared) await SS.save(fn, blob);
      showSend(nm, cl, fn, shared);
    });
    btn('pdf', 'Save as PDF', 'A copy to keep, print or upload · .pdf', async () => { const [nm, cl] = who(); await SS.save(fname(nm, 'pdf'), await make.pdf(nm, cl)); });
    btn('docx', 'Download as Word', 'Opens in Word or Google Docs · .docx', async () => { const [nm, cl] = who(); await SS.save(fname(nm, 'docx'), await make.docx(nm, cl)); });
    function showSend(nm, cl, fn, shared) {
      const em = LS.get('temail');
      const subj = `Submission: ${title} – ${nm}${cl ? ' (' + cl + ')' : ''}`;
      const body = `Good day,\n\nPlease find my work attached: ${fn}\n\nCourse: ${courseName()}\nTask: ${title}\nDate: ${today()}\n\nThank you,\n${nm}`;
      after.hidden = false;
      after.innerHTML = `<p class="ws-note">${shared ? '<b>✓ Shared.</b> ' : `<b>✓ Saved:</b> ${esc(fn)}. `}${shared ? 'If you still need to hand it in, use one of these:' : 'Now send it to your teacher. Attach the file you just saved:'}</p>
        <div class="ws-who" style="grid-template-columns:1fr"><label>Teacher's email (optional)<input id="ws-temail" type="email" value="${esc(em)}" placeholder="teacher@school.edu"></label></div>
        <div class="ws-send"><a id="ws-mail" target="_blank" rel="noopener"><span class="ic" style="background:#c4302b" aria-hidden="true">✉</span><span><b>Email it</b><br><small>Opens your email with the subject filled in. Attach ${esc(fn)}.</small></span></a>
        <a href="https://classroom.google.com/" target="_blank" rel="noopener"><span class="ic" style="background:#1e8e3e" aria-hidden="true">GC</span><span><b>Google Classroom</b><br><small>Open the assignment, choose Add or create ▸ File, then Hand in.</small></span></a>
        <a href="https://teams.microsoft.com/" target="_blank" rel="noopener"><span class="ic" style="background:#5059c9" aria-hidden="true">T</span><span><b>Microsoft Teams</b><br><small>Open Assignments, choose Add work ▸ Upload from this device, then Turn in.</small></span></a></div>`;
      const mail = after.querySelector('#ws-mail'), te = after.querySelector('#ws-temail');
      const upd = () => { LS.set('temail', te.value.trim()); mail.href = `mailto:${encodeURIComponent(te.value.trim())}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`; };
      te.addEventListener('input', upd); upd();
      mail.addEventListener('click', () => { SS.toast('Remember to attach ' + fn + ' before you press Send.'); });
      try { after.scrollIntoView({ block: 'nearest' }); } catch (e) { }
    }
    const prevFocus = document.activeElement;
    function close() { back.remove(); document.removeEventListener('keydown', key, true); try { prevFocus && prevFocus.focus && prevFocus.focus(); } catch (e) { } }
    function key(e) { if (e.key === 'Escape') { e.stopPropagation(); close(); } else if (e.key === 'Tab') { const f = [...d.querySelectorAll('input,button,a[href]')].filter(x => x.offsetParent !== null); const i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } } }
    d.querySelector('.ss-x').onclick = close; back.addEventListener('mousedown', e => { if (e.target === back) close(); });
    document.addEventListener('keydown', key, true);
    if (SS.css) SS.css();
    back.appendChild(d); document.body.appendChild(back);
    setTimeout(() => { const t = o.mode === 'submit' ? fm.querySelector('button') : fm.querySelectorAll('button')[1]; (d.querySelector('#ws-name').value ? t : d.querySelector('#ws-name')).focus(); }, 30);
    dlg = { close }; return dlg;
  }

  /* ---------- toolbar buttons on completed work (rendered by the course engine) ---------- */
  function workFrom(btn) {
    const stage = document.querySelector('#stage .stage-in') || document.getElementById('stage') || document.body;
    const bar = btn.closest('.ws-bar');
    const ds = bar ? bar.dataset : {};
    const h1 = stage.querySelector('h1,h2');
    const title = ds.title || (h1 ? h1.textContent.trim() : document.title);
    return { title, score: ds.score, max: ds.max, pct: ds.pct, html: snapshot(stage) };
  }
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-ws]'); if (!b) return;
    e.preventDefault(); const w = workFrom(b); w.mode = b.dataset.ws === 'submit' ? 'submit' : 'save';
    panel(w);
  });

  /* games and simulators call this (through SimSave.submit) */
  window.WorkSubmit = { open: o => panel(Object.assign({ mode: 'submit' }, o || {})), snapshot, panel };
})();
