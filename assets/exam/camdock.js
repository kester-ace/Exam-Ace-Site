/* Camera and microphone in the exam room. Both start OFF. Kester Small
   Camera: the student turns it on (the teacher can ask). A still of the picture, with the student's background choice
   (none, blur or a picture) already applied, goes to the teacher every few seconds. Nothing is recorded as video.
   Microphone: the student turns it on to record a short voice message that only the teacher hears.
   CamDock.mount({ sendImage(dataUrl), camOff(), sendVoice(dataUrl, mime, secs), toast(text) })
   CamDock.request(on)   the teacher's request to turn the camera on
   CamDock.stop()        hand-in: everything off */
(function () {
  if (window.CamDock) return;
  const CSS = `.cd{position:fixed;left:calc(10px + env(safe-area-inset-left,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:90;width:min(300px,calc(100vw - 20px));background:#0B1A46;color:#F1F4FF;border:2px solid #F5C542;border-radius:16px;box-shadow:0 18px 40px -16px rgba(0,0,0,.8);font:14px/1.4 "Atkinson Hyperlegible",Verdana,sans-serif}
.cd[hidden]{display:none!important}
.cd-h{display:flex;align-items:center;gap:8px;padding:8px 10px;cursor:pointer;user-select:none}
.cd-h b{flex:1;font-family:"Bricolage Grotesque","Segoe UI",sans-serif}
.cd-dot{width:10px;height:10px;border-radius:50%;background:#4A5568}.cd-dot.on{background:#4FD18B}.cd-dot.rec{background:#FF7A6B;animation:cdp 1s infinite}
@keyframes cdp{50%{opacity:.3}}
.cd-b{padding:0 10px 10px;display:grid;gap:8px}
.cd.min .cd-b{display:none}
.cd-v{position:relative;aspect-ratio:4/3;border-radius:10px;overflow:hidden;background:#060D26;display:grid;place-items:center;color:#AEB9DD;font-size:.85rem;text-align:center}
.cd-v canvas{width:100%;height:100%;object-fit:cover;transform:scaleX(-1);display:block}
.cd-row{display:flex;gap:6px;flex-wrap:wrap}
.cd button{border:2px solid #F5C542;background:transparent;color:#fff;border-radius:999px;padding:6px 11px;font:700 .82rem system-ui,sans-serif;cursor:pointer}
.cd button[aria-pressed="true"]{background:#F5C542;color:#0A1433}
.cd button:focus-visible,.cd select:focus-visible{outline:3px solid #FFD766;outline-offset:2px}
.cd select{width:100%;background:#0B1A46!important;color:#F1F4FF!important;border:1.5px solid rgba(245,197,66,.6);border-radius:10px;padding:6px 8px;font:inherit}
.cd-note{font-size:.78rem;color:#C9D2F2}
.cd-ask{position:fixed;left:50%;top:calc(12px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:95;background:#0B1A46;border:2px solid #F5C542;border-radius:14px;padding:10px 14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;max-width:calc(100vw - 20px);color:#fff;box-shadow:0 18px 40px -16px rgba(0,0,0,.8)}
.cd-ask[hidden]{display:none!important}
.cd-ask button{border:2px solid #F5C542;background:#F5C542;color:#0A1433;border-radius:999px;padding:6px 12px;font:700 .85rem system-ui,sans-serif;cursor:pointer}
.cd-ask button.g{background:transparent;color:#fff}`;
  let el, ask, O = {}, stream = null, video = null, out = null, octx = null, raf = 0, snapT = 0, bg = 'none', seg = null, segLoading = null, segFailed = false, mask = null, maskCv = null, person = null, lastTs = 0, bgImg = {};
  let mic = null, rec = null, chunks = [], recStart = 0, recT = 0, asked = false, dismissed = false;
  const $ = s => el.querySelector(s);

  /* backgrounds painted here, nothing to download */
  function paintBg(id, w, h) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
    if (id === 'beach') { const sky = x.createLinearGradient(0, 0, 0, h * .6); sky.addColorStop(0, '#3E8EDE'); sky.addColorStop(1, '#BFE3FF'); x.fillStyle = sky; x.fillRect(0, 0, w, h); x.fillStyle = '#2F7A4A'; x.beginPath(); x.moveTo(0, h * .6); for (let i = 0; i <= w; i += 20) x.lineTo(i, h * .5 - Math.sin(i / 70) * 18); x.lineTo(w, h * .6); x.fill(); const sea = x.createLinearGradient(0, h * .58, 0, h); sea.addColorStop(0, '#1FA3B8'); sea.addColorStop(1, '#0E6E8C'); x.fillStyle = sea; x.fillRect(0, h * .58, w, h * .22); x.fillStyle = '#F2DDA4'; x.fillRect(0, h * .8, w, h * .2); }
    else if (id === 'study') { x.fillStyle = '#2A3878'; x.fillRect(0, 0, w, h); x.fillStyle = '#0B1A46'; x.fillRect(0, h * .72, w, h * .28); x.fillStyle = '#F5C542'; x.fillRect(0, h * .7, w, 4); for (let i = 0; i < 5; i++) { x.fillStyle = ['#C53030', '#2F855A', '#B7791F', '#2B6CB0', '#6B46C1'][i]; x.fillRect(w * .08 + i * 26, h * .3, 20, h * .2); } x.fillStyle = '#6B4428'; x.fillRect(w * .06, h * .5, 150, 8); }
    else { const g = x.createRadialGradient(w * .7, h * .2, 10, w * .5, h * .5, w); g.addColorStop(0, '#173175'); g.addColorStop(1, '#0B1A46'); x.fillStyle = g; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(245,197,66,.85)'; x.font = `800 ${Math.round(h / 12)}px "Bricolage Grotesque",sans-serif`; x.fillText('Exam Ace', w * .06, h * .14); }
    return c;
  }

  function build() {
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    el = document.createElement('section'); el.className = 'cd min'; el.hidden = true; el.setAttribute('aria-label', 'Camera and microphone');
    el.innerHTML = `<div class="cd-h" role="button" tabindex="0" aria-expanded="false"><span class="cd-dot" id="cd-dot" aria-hidden="true"></span><b>Camera &amp; mic</b><span class="cd-note" id="cd-sum">both off</span><span aria-hidden="true">▴</span></div>
      <div class="cd-b">
        <div class="cd-v" id="cd-v">Your camera is off.</div>
        <div class="cd-row"><button type="button" id="cd-cam" aria-pressed="false">📷 Camera: off</button><button type="button" id="cd-mic" aria-pressed="false">🎤 Mic: off</button></div>
        <label class="cd-note" for="cd-bg">Background</label>
        <select id="cd-bg"><option value="none">No change</option><option value="blur">Blur my background</option><option value="beach">Beach picture</option><option value="study">Study room picture</option><option value="navy">Exam Ace navy</option></select>
        <p class="cd-note" id="cd-n">Your teacher sees a still from your camera every few seconds. Nothing is recorded as video. Your mic only sends the voice messages you choose to send.</p>
      </div>`;
    document.body.appendChild(el);
    ask = document.createElement('div'); ask.className = 'cd-ask'; ask.hidden = true; ask.setAttribute('role', 'alert');
    ask.innerHTML = `<span>📷 Your teacher asks you to turn on your camera.</span><button type="button" data-a="on">Turn on my camera</button><button type="button" class="g" data-a="later">Not now</button>`;
    document.body.appendChild(ask);
    const head = el.querySelector('.cd-h'); const tog = () => { el.classList.toggle('min'); head.setAttribute('aria-expanded', String(!el.classList.contains('min'))); };
    head.onclick = tog; head.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } };
    $('#cd-cam').onclick = () => stream ? camOff(true) : camOn();
    $('#cd-mic').onclick = () => rec ? stopRec() : startRec();
    $('#cd-bg').onchange = e => setBg(e.target.value);
    ask.onclick = e => { const b = e.target.closest('[data-a]'); if (!b) return; ask.hidden = true; if (b.dataset.a === 'on') { el.classList.remove('min'); camOn(); } else dismissed = true; };
  }
  function summary() {
    const c = !!stream, m = !!rec; $('#cd-sum').textContent = (c ? 'camera on' : 'camera off') + ' · ' + (m ? 'recording' : 'mic off');
    $('#cd-dot').className = 'cd-dot' + (m ? ' rec' : c ? ' on' : '');
    $('#cd-cam').textContent = c ? '📷 Camera: on' : '📷 Camera: off'; $('#cd-cam').setAttribute('aria-pressed', String(c));
  }

  /* ---------- camera ---------- */
  async function camOn() {
    if (stream) return;
    try { stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' }, audio: false }); }
    catch (e) { O.toast && O.toast('The camera is blocked or not available. Allow camera access in your browser, then try again.'); return; }
    video = document.createElement('video'); video.muted = true; video.playsInline = true; video.srcObject = stream; await video.play().catch(() => { });
    out = document.createElement('canvas'); out.width = 640; out.height = 480; octx = out.getContext('2d');
    $('#cd-v').innerHTML = ''; $('#cd-v').appendChild(out);
    ask.hidden = true; summary();
    if (bg === 'blur' || bg === 'beach' || bg === 'study' || bg === 'navy') loadSeg();
    loop(); clearInterval(snapT); snapT = setInterval(snap, 6000); setTimeout(snap, 1200);
  }
  function camOff(tell) {
    cancelAnimationFrame(raf); clearInterval(snapT);
    if (stream) stream.getTracks().forEach(t => t.stop()); stream = null; video = null;
    $('#cd-v').textContent = 'Your camera is off.'; summary();
    if (tell && O.camOff) O.camOff();
    if (asked && !dismissed) ask.hidden = false;
  }
  function snap() {
    if (!out || !stream) return;
    const s = document.createElement('canvas'); s.width = 320; s.height = 240; const x = s.getContext('2d');
    x.translate(320, 0); x.scale(-1, 1); x.drawImage(out, 0, 0, 320, 240); /* the teacher sees it the way the student sees themself */
    try { O.sendImage && O.sendImage(s.toDataURL('image/jpeg', 0.6)); } catch (e) { }
  }
  function setBg(v) { bg = v; if (v !== 'none' && stream) loadSeg(); }
  /* background effects: a person-finding model that runs on this device; the picture never leaves it unprocessed */
  function loadSeg() {
    if (seg || segLoading || segFailed) return segLoading;
    const V = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14';
    $('#cd-n').textContent = 'Getting the background effect ready…';
    segLoading = import(V + '/vision_bundle.mjs').then(async m => {
      const files = await m.FilesetResolver.forVisionTasks(V + '/wasm');
      seg = await m.ImageSegmenter.createFromOptions(files, { baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite', delegate: 'GPU' }, runningMode: 'VIDEO', outputCategoryMask: false, outputConfidenceMasks: true });
      $('#cd-n').textContent = 'Background effect on. Your teacher sees a still from your camera every few seconds. Nothing is recorded as video.';
    }).catch(() => { segFailed = true; $('#cd-n').textContent = 'Background effects aren\'t available on this device, so your camera shows your real background. Choose No change, or turn the camera off.'; });
    return segLoading;
  }
  function loop() {
    raf = requestAnimationFrame(loop);
    if (!video || video.readyState < 2) return;
    const W = out.width, H = out.height, now = performance.now();
    if (bg === 'none' || !seg) {
      if (bg !== 'none' && segFailed) { octx.drawImage(video, 0, 0, W, H); return; }
      if (bg === 'blur' && !seg) { octx.filter = 'blur(14px)'; octx.drawImage(video, 0, 0, W, H); octx.filter = 'none'; return; } /* until the model is ready, hide everything */
      if (bg !== 'none' && !seg) { octx.drawImage(bgImg[bg] = bgImg[bg] || paintBg(bg, W, H), 0, 0); return; }
      octx.drawImage(video, 0, 0, W, H); return;
    }
    if (now - lastTs > 60) { lastTs = now; try { seg.segmentForVideo(video, now, r => { const m = r.confidenceMasks && r.confidenceMasks[0]; if (!m) return; const f = m.getAsFloat32Array(), mw = m.width, mh = m.height;
      if (!maskCv || maskCv.width !== mw) { maskCv = document.createElement('canvas'); maskCv.width = mw; maskCv.height = mh; }
      const mx = maskCv.getContext('2d'), id = mx.createImageData(mw, mh); for (let i = 0; i < f.length; i++) { const a = f[i]; id.data[i * 4 + 3] = a > 0.65 ? 255 : a < 0.35 ? 0 : (a - 0.35) / 0.3 * 255; } mx.putImageData(id, 0, 0); m.close && m.close(); }); } catch (e) { } }
    if (!maskCv) { octx.filter = 'blur(14px)'; octx.drawImage(video, 0, 0, W, H); octx.filter = 'none'; return; }
    if (bg === 'blur') { octx.filter = 'blur(14px)'; octx.drawImage(video, 0, 0, W, H); octx.filter = 'none'; } else octx.drawImage(bgImg[bg] = bgImg[bg] || paintBg(bg, W, H), 0, 0);
    if (!person) { person = document.createElement('canvas'); } person.width = W; person.height = H; const px = person.getContext('2d');
    px.drawImage(video, 0, 0, W, H); px.globalCompositeOperation = 'destination-in'; px.filter = 'blur(2px)'; px.drawImage(maskCv, 0, 0, W, H); px.filter = 'none'; px.globalCompositeOperation = 'source-over';
    octx.drawImage(person, 0, 0);
  }

  /* ---------- microphone: a voice message to the teacher ---------- */
  async function startRec() {
    if (!window.MediaRecorder) { O.toast && O.toast('This browser can\'t record sound. Try Chrome, Edge or Safari.'); return; }
    try { mic = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (e) { O.toast && O.toast('The microphone is blocked or not available. Allow microphone access, then try again.'); return; }
    chunks = []; rec = new MediaRecorder(mic); rec.ondataavailable = e => e.data.size && chunks.push(e.data);
    rec.onstop = () => { mic.getTracks().forEach(t => t.stop()); mic = null; const r = rec; rec = null; summary(); review(r.mimeType || 'audio/webm'); };
    rec.start(); recStart = Date.now(); summary();
    $('#cd-mic').textContent = '■ Stop (0:00)'; $('#cd-mic').setAttribute('aria-pressed', 'true');
    clearInterval(recT); recT = setInterval(() => { const s = Math.floor((Date.now() - recStart) / 1000); $('#cd-mic').textContent = '■ Stop (' + Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') + ')'; if (s >= 60) stopRec(); }, 250);
  }
  function stopRec() { clearInterval(recT); if (rec && rec.state !== 'inactive') rec.stop(); $('#cd-mic').textContent = '🎤 Mic: off'; $('#cd-mic').setAttribute('aria-pressed', 'false'); }
  function review(mime) {
    const blob = new Blob(chunks, { type: mime }), url = URL.createObjectURL(blob), secs = Math.round((Date.now() - recStart) / 1000);
    const box = document.createElement('div'); box.className = 'cd-row'; box.id = 'cd-rev';
    box.innerHTML = `<audio controls src="${url}" style="width:100%"></audio><button type="button" data-r="send" aria-pressed="true">Send to my teacher</button><button type="button" data-r="drop">Discard</button>`;
    const old = $('#cd-rev'); if (old) old.remove(); $('#cd-n').before(box); el.classList.remove('min');
    box.onclick = e => { const b = e.target.closest('[data-r]'); if (!b) return;
      if (b.dataset.r === 'drop') { box.remove(); return; }
      b.disabled = true; const f = new FileReader(); f.onload = () => { Promise.resolve(O.sendVoice && O.sendVoice(f.result, blob.type, secs)).then(() => { box.remove(); O.toast && O.toast('Sent. Only your teacher hears it.'); }, err => { b.disabled = false; O.toast && O.toast(err.message || 'It didn\'t send. Try again.'); }); }; f.readAsDataURL(blob); };
  }

  window.CamDock = {
    mount(o) { O = o || {}; if (!el) build(); el.hidden = false; summary(); },
    request(on) { if (!el) return; asked = !!on; if (!on) { ask.hidden = true; dismissed = false; return; } if (!stream && !dismissed) ask.hidden = false; },
    stop() { if (!el) return; if (rec) stopRec(); camOff(true); el.hidden = true; ask.hidden = true; },
    get camOn() { return !!stream; }
  };
})();
