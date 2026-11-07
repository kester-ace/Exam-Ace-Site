/* SimSave kit v1: lets students save what they make in the simulators as real files.
   Word (.docx), Excel (.xlsx), CSV, PDF, JPG, PNG, SVG, HTML and TXT, written in the browser with no server.
   Files go through the course's download route (parent.offerFile) when the simulator runs inside the course,
   or a normal browser download when the page is opened on its own. Developed by Kester Small. */
(function () {
  'use strict';
  if (window.SimSave) return;
  const enc = new TextEncoder();
  const xesc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');

  /* ------------------------------------------------------------ download route */
  function cleanName(n, ext) {
    n = String(n || 'My_work').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '').replace(/[\u00B7\u2013\u2014]/g, '-').replace(/[^\x20-\x7E]/g, '').replace(/[\\/:*?"<>|]+/g, '_').replace(/\s+/g, '_').replace(/_+/g, '_').slice(0, 80) || 'My_work';
    if (ext && !n.toLowerCase().endsWith('.' + ext)) n = n.replace(/\.[a-z0-9]{2,5}$/i, '') + '.' + ext;
    return n;
  }
  async function save(filename, blob) {
    try {
      if (window.parent && window.parent !== window && typeof window.parent.offerFile === 'function') {
        const ok = await window.parent.offerFile(filename, blob);
        toast(ok === false ? 'Save cancelled.' : 'Saved: ' + filename);
        return ok !== false;
      }
    } catch (e) { /* cross-origin parent: fall through */ }
    try {
      const u = URL.createObjectURL(blob), a = document.createElement('a');
      a.href = u; a.download = filename; a.rel = 'noopener'; a.style.display = 'none';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 8000);
      toast('Saved: ' + filename);
      return true;
    } catch (e) { toast('This browser blocked the download.'); return false; }
  }
  let tT = null;
  function toast(msg) {
    let t = document.getElementById('ss-toast');
    if (!t) { t = document.createElement('div'); t.id = 'ss-toast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
    t.textContent = msg; t.className = 'on'; clearTimeout(tT); tT = setTimeout(() => { t.className = ''; }, 2600);
  }

  /* ------------------------------------------------------------ zip (store) */
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(u) { let c = 0xFFFFFFFF; for (let i = 0; i < u.length; i++) c = CRC[(c ^ u[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  const u8 = x => typeof x === 'string' ? enc.encode(x) : x instanceof Uint8Array ? x : new Uint8Array(x);
  function zip(files, mime) {
    const parts = [], cen = []; let off = 0;
    const d = new Date(), dt = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate(), tm = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
    for (const f of files) {
      const name = enc.encode(f.name), data = u8(f.data), crc = crc32(data);
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true); h.setUint16(10, tm, true); h.setUint16(12, dt, true);
      h.setUint32(14, crc, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, name.length, true); h.setUint16(28, 0, true);
      parts.push(new Uint8Array(h.buffer), name, data);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true); c.setUint16(12, tm, true); c.setUint16(14, dt, true);
      c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, name.length, true); c.setUint32(42, off, true);
      cen.push(new Uint8Array(c.buffer), name);
      off += 30 + name.length + data.length;
    }
    const cs = cen.reduce((a, b) => a + b.length, 0), e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cs, true); e.setUint32(16, off, true);
    return new Blob(parts.concat(cen, [new Uint8Array(e.buffer)]), { type: mime || 'application/zip' });
  }

  /* ------------------------------------------------------------ images */
  function dataUrlBytes(url) {
    const m = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(url || ''); if (!m) return null;
    const mime = m[1] || 'application/octet-stream';
    if (m[2]) { const bin = atob(m[3]); const a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return { mime, bytes: a }; }
    return { mime, bytes: enc.encode(decodeURIComponent(m[3])) };
  }
  function loadImg(src) { return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; if (!/^(data|blob):/.test(src)) i.crossOrigin = 'anonymous'; i.src = src; }); }
  function canvasBlob(cv, type, q) { return new Promise((res, rej) => { try { cv.toBlob(b => b ? res(b) : rej(new Error('toBlob failed')), type, q); } catch (e) { rej(e); } }); }
  function flatten(cv, bg) { const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; const x = c.getContext('2d'); x.fillStyle = bg || '#ffffff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(cv, 0, 0); return c; }
  async function toPngBytes(img) { const c = document.createElement('canvas'); c.width = img.naturalWidth || img.width; c.height = img.naturalHeight || img.height; c.getContext('2d').drawImage(img, 0, 0); return new Uint8Array(await (await canvasBlob(c, 'image/png')).arrayBuffer()); }
  async function svgToCanvas(svg, scale, bg) {
    const el = typeof svg === 'string' ? new DOMParser().parseFromString(svg, 'image/svg+xml').documentElement : svg.cloneNode(true);
    if (!el.getAttribute('xmlns')) el.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    let w = parseFloat(el.getAttribute('width')), h = parseFloat(el.getAttribute('height'));
    const vb = (el.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
    if (!(w > 0) || !(h > 0)) { if (svg.getBoundingClientRect && svg.isConnected) { const r = svg.getBoundingClientRect(); w = r.width; h = r.height; } if (!(w > 0) && vb.length === 4) { w = vb[2]; h = vb[3]; } }
    w = w || 800; h = h || 600; el.setAttribute('width', w); el.setAttribute('height', h);
    const s = new XMLSerializer().serializeToString(el);
    const url = URL.createObjectURL(new Blob([s], { type: 'image/svg+xml' }));
    try {
      const img = await loadImg(url); scale = scale || 2;
      const c = document.createElement('canvas'); c.width = Math.round(w * scale); c.height = Math.round(h * scale);
      const x = c.getContext('2d'); if (bg) { x.fillStyle = bg; x.fillRect(0, 0, c.width, c.height); } x.drawImage(img, 0, 0, c.width, c.height); return c;
    } finally { URL.revokeObjectURL(url); }
  }

  /* DOM → canvas: html2canvas (loaded on first use from cdnjs), with an SVG foreignObject fallback */
  let h2cP = null;
  const H2C = ['https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'];
  function loadH2C() {
    if (window.html2canvas) return Promise.resolve(window.html2canvas);
    try { if (window.parent !== window && window.parent.html2canvas) return Promise.resolve(window.parent.html2canvas); } catch (e) { }
    if (!h2cP) h2cP = (async () => {
      for (const src of H2C) {
        try { await new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); if (window.html2canvas) return window.html2canvas; } catch (e) { }
      }
      h2cP = null; throw new Error('The page renderer could not load. Check your internet connection and try again.');
    })();
    return h2cP;
  }
  async function domToCanvas(el, o) {
    o = o || {}; const scale = o.scale || 2;
    const h2c = await loadH2C();
    return h2c(el, { scale, backgroundColor: o.bg === undefined ? '#ffffff' : o.bg, useCORS: true, logging: false, width: o.width, height: o.height, windowWidth: o.windowWidth, scrollX: 0, scrollY: -window.scrollY, ignoreElements: o.ignore || (n => n.classList && n.classList.contains('ss-ignore')) });
  }
  function inlineStyles(src, dst) {
    const cs = getComputedStyle(src); let s = ''; for (let i = 0; i < cs.length; i++) { const p = cs[i]; s += p + ':' + cs.getPropertyValue(p) + ';'; } dst.setAttribute('style', s);
    const a = src.children, b = dst.children; for (let i = 0; i < a.length && i < b.length; i++) inlineStyles(a[i], b[i]);
  }

  /* ------------------------------------------------------------ PDF from page images */
  const PAGE = { Letter: [612, 792], A4: [595.28, 841.89], Legal: [612, 1008], A5: [419.53, 595.28], Tabloid: [792, 1224] };
  async function pdfFromCanvases(canvases, o) {
    o = o || {}; const parts = [], offs = []; let len = 0;
    const push = x => { const b = u8(x); parts.push(b); len += b.length; };
    const obj = (n, body) => { offs[n] = len; push(`${n} 0 obj\n`); if (typeof body === 'string') push(body); else body.forEach(push); push('\nendobj\n'); };
    push('%PDF-1.4\n'); push(new Uint8Array([37, 226, 227, 207, 211, 10]));
    const n = canvases.length, kids = []; let next = 3;
    const pages = [];
    for (let i = 0; i < n; i++) {
      const cv = flatten(canvases[i], '#ffffff');
      const jpg = new Uint8Array(await (await canvasBlob(cv, 'image/jpeg', o.quality || 0.88)).arrayBuffer());
      let pw, ph;
      if (o.fit === 'image' || !o.size) { const dpi = o.dpi || 144; pw = cv.width * 72 / dpi; ph = cv.height * 72 / dpi; }
      else { [pw, ph] = PAGE[o.size] || PAGE.Letter; if (o.landscape || (o.landscape == null && cv.width > cv.height * 1.15)) [pw, ph] = [ph, pw]; }
      const m = o.size && o.fit !== 'image' ? (o.margin == null ? 0 : o.margin) : 0;
      const k = Math.min((pw - 2 * m) / cv.width, (ph - 2 * m) / cv.height);
      const iw = cv.width * k, ih = cv.height * k, ix = (pw - iw) / 2, iy = o.top ? ph - m - ih : (ph - ih) / 2;
      pages.push({ pg: next, ct: next + 1, im: next + 2, jpg, w: cv.width, h: cv.height, pw, ph, iw, ih, ix, iy }); kids.push(`${next} 0 R`); next += 3;
    }
    const info = next;
    obj(1, `<< /Type /Catalog /Pages 2 0 R >>`);
    obj(2, `<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${n} >>`);
    for (const p of pages) {
      obj(p.pg, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${p.pw.toFixed(2)} ${p.ph.toFixed(2)}] /Resources << /XObject << /Im0 ${p.im} 0 R >> >> /Contents ${p.ct} 0 R >>`);
      const cs = `q ${p.iw.toFixed(2)} 0 0 ${p.ih.toFixed(2)} ${p.ix.toFixed(2)} ${p.iy.toFixed(2)} cm /Im0 Do Q`;
      obj(p.ct, `<< /Length ${cs.length} >>\nstream\n${cs}\nendstream`);
      obj(p.im, [`<< /Type /XObject /Subtype /Image /Width ${p.w} /Height ${p.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.jpg.length} >>\nstream\n`, p.jpg, '\nendstream']);
    }
    const t = s => '(' + String(s || '').replace(/[\\()]/g, '\\$&').replace(/[^\x20-\x7E]/g, '') + ')';
    obj(info, `<< /Title ${t(o.title || 'My work')} /Author ${t(o.author || '')} /Producer (SimSave) >>`);
    const xref = len; let x = `xref\n0 ${info + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= info; i++) x += String(offs[i] || 0).padStart(10, '0') + ' 00000 n \n';
    push(x + `trailer\n<< /Size ${info + 1} /Root 1 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF`);
    return new Blob(parts, { type: 'application/pdf' });
  }
  /* Render a long element and slice it into pages, breaking between blocks where possible. */
  async function pdfFromElement(el, o) {
    o = Object.assign({ size: 'Letter', margin: 0, scale: 2 }, o || {});
    const [pw, ph] = PAGE[o.size] || PAGE.Letter; const landscape = !!o.landscape;
    const pageW = landscape ? ph : pw, pageH = landscape ? pw : ph;
    const cv = await domToCanvas(el, { scale: o.scale, bg: '#ffffff' });
    const cssW = cv.width / o.scale, pagePx = cssW * pageH / pageW;
    const top = el.getBoundingClientRect().top;
    const cuts = [];
    if (o.breaks !== false) el.querySelectorAll(o.blockSel || 'p,h1,h2,h3,h4,h5,h6,li,tr,img,figure,blockquote,.ss-block').forEach(b => { const r = b.getBoundingClientRect(); cuts.push(r.bottom - top); });
    cuts.sort((a, b) => a - b);
    const slices = []; let y = 0; const H = cv.height / o.scale;
    while (y < H - 2) {
      let end = Math.min(H, y + pagePx);
      if (end < H) { const c = cuts.filter(v => v > y + pagePx * 0.5 && v <= end).pop(); if (c) end = c; }
      const s = document.createElement('canvas'); s.width = cv.width; s.height = Math.round(pagePx * o.scale);
      const x = s.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, s.width, s.height);
      x.drawImage(cv, 0, Math.round(y * o.scale), cv.width, Math.round((end - y) * o.scale), 0, 0, cv.width, Math.round((end - y) * o.scale));
      slices.push(s); y = end;
    }
    return pdfFromCanvases(slices, { size: o.size, landscape, margin: o.margin, title: o.title, author: o.author, top: true });
  }

  /* ------------------------------------------------------------ DOCX from HTML */
  const NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
  const HL = { yellow: 'yellow', '#ffff00': 'yellow', 'rgb(255, 255, 0)': 'yellow', '#00ff00': 'green', 'rgb(0, 255, 0)': 'green', '#00ffff': 'cyan', 'rgb(0, 255, 255)': 'cyan', '#ff00ff': 'magenta', 'rgb(255, 0, 255)': 'magenta' };
  function hexColor(c) {
    if (!c) return null; c = String(c).trim().toLowerCase(); if (c === 'inherit' || c === 'transparent' || c === 'initial') return null;
    let m = /^#([0-9a-f]{6})$/.exec(c); if (m) return m[1].toUpperCase();
    m = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/.exec(c); if (m) return (m[1] + m[1] + m[2] + m[2] + m[3] + m[3]).toUpperCase();
    m = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/.exec(c); if (m) { if (m[4] != null && +m[4] === 0) return null; return [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('').toUpperCase(); }
    const named = { black: '000000', white: 'FFFFFF', red: 'FF0000', blue: '0000FF', green: '008000', navy: '000080', gray: '808080', grey: '808080', maroon: '800000', purple: '800080', orange: 'FFA500', teal: '008080' };
    return named[c] || null;
  }
  function ptSize(v) { if (!v) return null; const m = /^([\d.]+)(pt|px|em|rem)?$/.exec(String(v).trim()); if (!m) return null; let n = +m[1]; if (m[2] === 'px') n = n * 0.75; else if (m[2] === 'em' || m[2] === 'rem') n = n * 12; return Math.round(n * 2); }
  async function htmlToDocx(input, o) {
    o = o || {};
    const root = typeof input === 'string' ? (() => { const d = document.createElement('div'); d.innerHTML = input; return d; })() : input;
    const media = []; const rels = []; let rid = 10, picId = 1, hasList = false;
    const lists = []; // numIds: 1 bullet, 2 decimal (shared)
    async function imgRun(img) {
      const src = img.getAttribute('src') || ''; let bytes = null, mime = 'image/png';
      try {
        const d = dataUrlBytes(src);
        if (d && /png|jpe?g|gif/.test(d.mime)) { bytes = d.bytes; mime = d.mime; }
        else { const im = await loadImg(src); bytes = await toPngBytes(im); mime = 'image/png'; }
      } catch (e) { try { const im = img.complete && img.naturalWidth ? img : null; if (im) { bytes = await toPngBytes(im); mime = 'image/png'; } } catch (e2) { } }
      if (!bytes) return '';
      const ext = /jpe?g/.test(mime) ? 'jpeg' : /gif/.test(mime) ? 'gif' : 'png';
      const name = `image${media.length + 1}.${ext}`; media.push({ name: 'word/media/' + name, data: bytes, ext });
      const id = 'rId' + (rid++); rels.push(`<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${name}"/>`);
      let w = parseFloat(img.getAttribute('width')) || img.width || img.naturalWidth || 300, h = parseFloat(img.getAttribute('height')) || img.height || img.naturalHeight || 200;
      const sw = parseFloat((img.style && img.style.width) || ''); if (sw > 0 && /px$/.test(img.style.width)) { const r = h / w; w = sw; h = sw * r; }
      const maxW = o.maxImgW || 600; if (w > maxW) { h = h * maxW / w; w = maxW; }
      const cx = Math.round(w * 9525), cy = Math.round(h * 9525), pid = picId++;
      return `<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${pid}" name="Picture ${pid}" descr="${xesc(img.getAttribute('alt') || '')}"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${pid}" name="${name}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${id}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
    }
    function rPr(f) {
      let s = '';
      if (f.font) s += `<w:rFonts w:ascii="${xesc(f.font)}" w:hAnsi="${xesc(f.font)}" w:cs="${xesc(f.font)}"/>`;
      if (f.b) s += '<w:b/>'; if (f.i) s += '<w:i/>'; if (f.caps) s += '<w:caps/>'; if (f.s) s += '<w:strike/>';
      if (f.color) s += `<w:color w:val="${f.color}"/>`; if (f.sz) s += `<w:sz w:val="${f.sz}"/><w:szCs w:val="${f.sz}"/>`;
      if (f.hl) s += `<w:highlight w:val="${f.hl}"/>`;
      if (f.u) s += '<w:u w:val="single"/>';
      if (!f.hl && f.shd) s += `<w:shd w:val="clear" w:color="auto" w:fill="${f.shd}"/>`;
      if (f.va) s += `<w:vertAlign w:val="${f.va}"/>`;
      return s ? `<w:rPr>${s}</w:rPr>` : '';
    }
    function fmtOf(node, f) {
      const g = Object.assign({}, f); const t = node.tagName;
      if (t === 'B' || t === 'STRONG') g.b = true; if (t === 'I' || t === 'EM') g.i = true; if (t === 'U' || t === 'INS') g.u = true;
      if (t === 'S' || t === 'STRIKE' || t === 'DEL') g.s = true; if (t === 'SUB') g.va = 'subscript'; if (t === 'SUP') g.va = 'superscript';
      if (t === 'A') { g.u = true; g.color = g.color || '0563C1'; }
      if (t === 'MARK') g.hl = 'yellow';
      if (t === 'FONT') { const c = hexColor(node.getAttribute('color')); if (c) g.color = c; if (node.getAttribute('face')) g.font = node.getAttribute('face').split(',')[0].replace(/['"]/g, '').trim(); }
      const st = node.style; if (st) {
        if (/bold|[6-9]00/.test(st.fontWeight)) g.b = true; if (st.fontWeight === 'normal' || st.fontWeight === '400') g.b = false;
        if (st.fontStyle === 'italic') g.i = true; const td = st.textDecoration || st.textDecorationLine || '';
        if (/underline/.test(td)) g.u = true; if (/line-through/.test(td)) g.s = true;
        const c = hexColor(st.color); if (c) g.color = c; const z = ptSize(st.fontSize); if (z) g.sz = z;
        if (st.fontFamily) g.font = st.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
        const bg = st.backgroundColor; if (bg) { const h = HL[bg.toLowerCase()]; if (h) g.hl = h; else { const hx = hexColor(bg); if (hx && hx !== 'FFFFFF') g.shd = hx; } }
        if (st.textTransform === 'uppercase') g.caps = true;
        if (st.verticalAlign === 'super') g.va = 'superscript'; if (st.verticalAlign === 'sub') g.va = 'subscript';
      }
      return g;
    }
    async function runs(node, f) {
      let out = '';
      for (const c of node.childNodes) {
        if (c.nodeType === 3) { const t = c.nodeValue.replace(/[\r\n\t]+/g, ' ').replace(/ {2,}/g, ' '); if (t) out += `<w:r>${rPr(f)}<w:t xml:space="preserve">${xesc(t)}</w:t></w:r>`; }
        else if (c.nodeType === 1) {
          const t = c.tagName; if (/^(SCRIPT|STYLE|TEMPLATE|BUTTON)$/.test(t) || (c.classList && c.classList.contains('ss-ignore'))) continue;
          if (getHidden(c)) continue;
          if (t === 'BR') out += '<w:r><w:br/></w:r>';
          else if (t === 'IMG') out += await imgRun(c);
          else if (t === 'svg' || t === 'SVG') { try { const cv = await svgToCanvas(c, 2); const fake = document.createElement('img'); fake.src = cv.toDataURL('image/png'); fake.setAttribute('width', cv.width / 2); fake.setAttribute('height', cv.height / 2); out += await imgRun(fake); } catch (e) { } }
          else if (isBlock(c)) { /* nested block inside inline context: flatten its text */ out += await runs(c, fmtOf(c, f)); }
          else out += await runs(c, fmtOf(c, f));
        }
      }
      return out;
    }
    const BLOCK = /^(P|DIV|H[1-6]|UL|OL|LI|TABLE|BLOCKQUOTE|SECTION|ARTICLE|HEADER|FOOTER|ASIDE|MAIN|FIGURE|FIGCAPTION|PRE|HR|DL|DT|DD|NAV|FORM|FIELDSET|ADDRESS|CENTER)$/;
    const isBlock = n => n.nodeType === 1 && BLOCK.test(n.tagName);
    const getHidden = n => n.hidden || (n.style && n.style.display === 'none');
    function pPr(node, extra) {
      let s = ''; const st = node.style || {};
      const tag = node.tagName; let style = null;
      const ds = node.getAttribute && node.getAttribute('data-style');
      if (/^H[1-6]$/.test(tag)) style = 'Heading' + tag[1];
      if (ds) { const k = ds.replace(/\s+/g, ''); if (/^(Title|Subtitle|Heading[1-6]|Quote|ListParagraph|NoSpacing)$/i.test(k)) style = k.replace(/^title$/i, 'Title').replace(/^subtitle$/i, 'Subtitle'); }
      if (tag === 'BLOCKQUOTE') style = 'Quote';
      if (extra && extra.style) style = extra.style;
      if (style) s += `<w:pStyle w:val="${style}"/>`;
      if (st.pageBreakBefore === 'always' || st.breakBefore === 'page' || (node.classList && node.classList.contains('pagebreak'))) s += '<w:pageBreakBefore/>';
      if (extra && extra.num) s += `<w:numPr><w:ilvl w:val="${extra.num.lvl}"/><w:numId w:val="${extra.num.id}"/></w:numPr>`;
      const lh = parseFloat(st.lineHeight || ''); if (lh > 0 && /^[\d.]+$/.test(st.lineHeight)) s += `<w:spacing w:line="${Math.round(lh * 240)}" w:lineRule="auto"/>`;
      const ml = parseFloat(st.marginLeft || st.paddingLeft || ''); const ti = parseFloat(st.textIndent || '');
      if ((ml > 0 && /px|pt|in|cm/.test(st.marginLeft || st.paddingLeft)) || ti) s += `<w:ind${ml > 0 ? ` w:left="${Math.round(toTw(st.marginLeft || st.paddingLeft))}"` : ''}${ti ? ` w:firstLine="${Math.round(toTw(st.textIndent))}"` : ''}/>`;
      const al = st.textAlign || (node.getAttribute && node.getAttribute('align')) || ''; const map = { center: 'center', right: 'right', justify: 'both', left: 'left' };
      if (map[al]) s += `<w:jc w:val="${map[al]}"/>`;
      return s ? `<w:pPr>${s}</w:pPr>` : '';
    }
    function toTw(v) { const m = /^(-?[\d.]+)(px|pt|in|cm|mm|em)?$/.exec(String(v).trim()); if (!m) return 0; const n = +m[1]; return m[2] === 'pt' ? n * 20 : m[2] === 'in' ? n * 1440 : m[2] === 'cm' ? n * 567 : m[2] === 'mm' ? n * 56.7 : m[2] === 'em' ? n * 240 : n * 15; }
    async function para(node, f, extra) { const r = await runs(node, f); return `<w:p>${pPr(node, extra)}${r}</w:p>`; }
    async function table(tb, f) {
      const rows = [...tb.querySelectorAll(':scope>tr,:scope>thead>tr,:scope>tbody>tr,:scope>tfoot>tr')];
      let cols = 0; rows.forEach(r => { let n = 0; [...r.children].forEach(c => n += +(c.getAttribute('colspan') || 1)); cols = Math.max(cols, n); });
      cols = Math.max(1, cols); const W = o.textWidthTw || 9360, cw = Math.floor(W / cols);
      let x = `<w:tbl><w:tblPr><w:tblW w:w="${W}" w:type="dxa"/><w:tblBorders>${['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(s => `<w:${s} w:val="single" w:sz="4" w:space="0" w:color="808080"/>`).join('')}</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="100" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${('<w:gridCol w:w="' + cw + '"/>').repeat(cols)}</w:tblGrid>`;
      for (const r of rows) {
        x += '<w:tr>';
        for (const c of r.children) {
          if (!/^T[DH]$/.test(c.tagName)) continue; const span = +(c.getAttribute('colspan') || 1);
          const bg = hexColor(c.style && c.style.backgroundColor) || hexColor(c.getAttribute('bgcolor'));
          x += `<w:tc><w:tcPr><w:tcW w:w="${cw * span}" w:type="dxa"/>${span > 1 ? `<w:gridSpan w:val="${span}"/>` : ''}${bg && bg !== 'FFFFFF' ? `<w:shd w:val="clear" w:color="auto" w:fill="${bg}"/>` : ''}</w:tcPr>`;
          const inner = await blocks(c, c.tagName === 'TH' ? Object.assign({}, f, { b: true }) : f);
          x += inner || '<w:p/>'; x += '</w:tc>';
        }
        x += '</w:tr>';
      }
      return x + '</w:tbl><w:p/>';
    }
    async function list(node, f, lvl) {
      hasList = true; const id = node.tagName === 'OL' ? 2 : 1; let x = '';
      for (const li of node.children) {
        if (li.tagName !== 'LI') continue;
        const inline = document.createElement('span'); const subs = [];
        [...li.childNodes].forEach(c => { if (c.nodeType === 1 && (c.tagName === 'UL' || c.tagName === 'OL')) subs.push(c); else inline.appendChild(c.cloneNode(true)); });
        const pchild = inline.children.length === 1 && inline.firstElementChild.tagName === 'P' && !inline.textContent.replace(inline.firstElementChild.textContent, '').trim() ? inline.firstElementChild : inline;
        x += `<w:p><w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="${Math.min(lvl, 8)}"/><w:numId w:val="${id}"/></w:numPr></w:pPr>${await runs(pchild, f)}</w:p>`;
        for (const s of subs) x += await list(s, f, lvl + 1);
      }
      return x;
    }
    async function blocks(node, f) {
      let x = '', buf = null;
      const flush = async () => { if (buf && (buf.textContent.trim() || buf.querySelector('img,svg,br'))) x += `<w:p>${await runs(buf, f)}</w:p>`; buf = null; };
      for (const c of [...node.childNodes]) {
        if (c.nodeType === 1 && ((c.classList && c.classList.contains('ss-ignore')) || /^(SCRIPT|STYLE|TEMPLATE|BUTTON)$/.test(c.tagName) || getHidden(c))) continue;
        if (c.nodeType === 1 && isBlock(c)) {
          await flush(); const t = c.tagName;
          if (t === 'TABLE') x += await table(c, f);
          else if (t === 'UL' || t === 'OL') x += await list(c, f, 0);
          else if (t === 'HR') x += '<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="808080"/></w:pBdr></w:pPr></w:p>';
          else if (t === 'PRE') x += c.textContent.split('\n').map(l => `<w:p><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/></w:rPr><w:t xml:space="preserve">${xesc(l)}</w:t></w:r></w:p>`).join('');
          else if (/^(P|H[1-6]|BLOCKQUOTE|LI|DT|DD|FIGCAPTION|ADDRESS)$/.test(t) || ![...c.children].some(isBlock)) {
            if (t === 'DIV' && (c.classList.contains('pagebreak') || (c.style && (c.style.pageBreakBefore === 'always' || c.style.breakBefore === 'page'))) && !c.textContent.trim()) { x += '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'; continue; }
            x += await para(c, fmtOf(c, f));
          } else { if (c.style && (c.style.pageBreakBefore === 'always' || c.style.breakBefore === 'page')) x += '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'; x += await blocks(c, fmtOf(c, f)); }
        } else { if (c.nodeType === 3 && !c.nodeValue.trim() && !buf) continue; buf = buf || document.createElement('p'); buf.appendChild(c.cloneNode(true)); }
      }
      await flush(); return x;
    }
    const body = (await blocks(root, {})) || '<w:p/>';
    const sz = PAGE[o.size || 'Letter'] || PAGE.Letter; let pw = Math.round(sz[0] * 20), ph = Math.round(sz[1] * 20); if (o.landscape) [pw, ph] = [ph, pw];
    const mg = Math.round((o.marginIn == null ? 1 : o.marginIn) * 1440);
    let hdr = '', ftr = '', hdrRel = '';
    if (o.header) { rels.push('<Relationship Id="rIdH" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>'); hdr = `<w:hdr ${NS}><w:p><w:pPr><w:pStyle w:val="Header"/></w:pPr><w:r><w:t xml:space="preserve">${xesc(o.header)}</w:t></w:r></w:p></w:hdr>`; hdrRel += '<w:headerReference w:type="default" r:id="rIdH"/>'; }
    if (o.footer || o.pageNumbers) { rels.push('<Relationship Id="rIdF" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>'); ftr = `<w:ftr ${NS}><w:p><w:pPr><w:pStyle w:val="Footer"/><w:jc w:val="${o.pageNumbers ? 'center' : 'left'}"/></w:pPr>${o.footer ? `<w:r><w:t xml:space="preserve">${xesc(o.footer)}${o.pageNumbers ? '  ' : ''}</w:t></w:r>` : ''}${o.pageNumbers ? '<w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>1</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r>' : ''}</w:p></w:ftr>`; hdrRel += '<w:footerReference w:type="default" r:id="rIdF"/>'; }
    const doc = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${NS}><w:body>${body}<w:sectPr>${hdrRel}<w:pgSz w:w="${pw}" w:h="${ph}"${o.landscape ? ' w:orient="landscape"' : ''}/><w:pgMar w:top="${mg}" w:right="${mg}" w:bottom="${mg}" w:left="${mg}" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`;
    const font = o.font || 'Calibri';
    const hs = n => `<w:style w:type="paragraph" w:styleId="Heading${n}"><w:name w:val="heading ${n}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="${n < 3 ? 240 : 160}" w:after="80"/><w:outlineLvl w:val="${n - 1}"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri Light" w:hAnsi="Calibri Light"/>${n < 4 ? '' : '<w:i/>'}<w:color w:val="2F5496"/><w:sz w:val="${[0, 32, 26, 24, 22, 22, 22][n]}"/></w:rPr></w:style>`;
    const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${NS}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="${xesc(font)}" w:hAnsi="${xesc(font)}" w:cs="${xesc(font)}" w:eastAsia="${xesc(font)}"/><w:sz w:val="${o.sz || 22}"/><w:szCs w:val="${o.sz || 22}"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="160" w:line="259" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>${[1, 2, 3, 4, 5, 6].map(hs).join('')}<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="80" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri Light" w:hAnsi="Calibri Light"/><w:spacing w:val="-10"/><w:kern w:val="28"/><w:sz w:val="56"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:qFormat/><w:rPr><w:color w:val="5A5A5A"/><w:spacing w:val="15"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Quote"><w:name w:val="Quote"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:ind w:left="864" w:right="864"/><w:jc w:val="center"/></w:pPr><w:rPr><w:i/><w:color w:val="404040"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:ind w:left="720"/><w:contextualSpacing/></w:pPr></w:style><w:style w:type="paragraph" w:styleId="NoSpacing"><w:name w:val="No Spacing"/><w:qFormat/><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:style><w:style w:type="paragraph" w:styleId="Header"><w:name w:val="header"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0"/></w:pPr></w:style><w:style w:type="paragraph" w:styleId="Footer"><w:name w:val="footer"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0"/></w:pPr></w:style><w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style></w:styles>`;
    const lvl = (i, fmt, txt, ind) => `<w:lvl w:ilvl="${i}"><w:start w:val="1"/><w:numFmt w:val="${fmt}"/><w:lvlText w:val="${txt}"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="${720 * (i + 1)}" w:hanging="360"/></w:pPr>${fmt === 'bullet' ? `<w:rPr><w:rFonts w:ascii="${ind}" w:hAnsi="${ind}" w:hint="default"/></w:rPr>` : ''}</w:lvl>`;
    const numbering = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering ${NS}><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => lvl(i, 'bullet', ['\u2022', 'o', '\u25AA'][i % 3], ['Symbol', 'Courier New', 'Wingdings'][i % 3] === 'Symbol' ? 'Calibri' : (i % 3 === 1 ? 'Courier New' : 'Calibri'))).join('')}</w:abstractNum><w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="hybridMultilevel"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => lvl(i, ['decimal', 'lowerLetter', 'lowerRoman'][i % 3], `%${i + 1}.`)).join('')}</w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num><w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num></w:numbering>`;
    const exts = [...new Set(media.map(m => m.ext))];
    const ct = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>${exts.map(e => `<Default Extension="${e}" ContentType="image/${e}"/>`).join('')}<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>${hdr ? '<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' : ''}${ftr ? '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' : ''}<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`;
    const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    const core = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xesc(o.title || '')}</dc:title><dc:creator>${xesc(o.author || '')}</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${now}</dcterms:modified></cp:coreProperties>`;
    const files = [
      { name: '[Content_Types].xml', data: ct },
      { name: '_rels/.rels', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>' },
      { name: 'word/document.xml', data: doc },
      { name: 'word/styles.xml', data: styles },
      { name: 'word/numbering.xml', data: numbering },
      { name: 'word/_rels/document.xml.rels', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>${rels.join('')}</Relationships>` },
      { name: 'docProps/core.xml', data: core }
    ].concat(media.map(m => ({ name: m.name, data: m.data })));
    if (hdr) files.push({ name: 'word/header1.xml', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + hdr });
    if (ftr) files.push({ name: 'word/footer1.xml', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + ftr });
    return zip(files, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  }

  /* ------------------------------------------------------------ XLSX */
  function colName(i) { let s = ''; i++; while (i > 0) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; }
  function xlsx(sheets, o) {
    o = o || {}; if (!Array.isArray(sheets)) sheets = [sheets];
    const files = [], wbS = [], wbR = [], ctO = [];
    sheets.forEach((sh, si) => {
      const rows = sh.rows || []; let x = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">';
      if (sh.freezeHeader) x += '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>';
      const ncol = rows.reduce((a, r) => Math.max(a, r.length), 0);
      const widths = sh.colWidths || Array.from({ length: ncol }, (_, c) => Math.min(60, Math.max(8, ...rows.map(r => String(cellVal(r[c]) == null ? '' : cellVal(r[c])).length + 2))));
      if (ncol) x += '<cols>' + widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('') + '</cols>';
      x += '<sheetData>';
      rows.forEach((r, ri) => {
        x += `<row r="${ri + 1}">`;
        r.forEach((v, ci) => {
          const ref = colName(ci) + (ri + 1); const cell = (v && typeof v === 'object' && !(v instanceof Date)) ? v : { v };
          const bold = cell.b || (sh.headerRow !== false && ri === 0 && o.boldHeader !== false && sh.boldHeader !== false);
          const s = bold ? ' s="1"' : (cell.pct ? ' s="2"' : (cell.money ? ' s="3"' : ''));
          if (cell.f) { x += `<c r="${ref}"${s}><f>${xesc(String(cell.f).replace(/^=/, ''))}</f>${cell.v != null && cell.v !== '' && !isNaN(+cell.v) ? `<v>${+cell.v}</v>` : ''}</c>`; return; }
          const val = cell.v; if (val == null || val === '') return;
          if (typeof val === 'number' && isFinite(val)) x += `<c r="${ref}"${s}><v>${val}</v></c>`;
          else if (typeof val === 'boolean') x += `<c r="${ref}" t="b"${s}><v>${val ? 1 : 0}</v></c>`;
          else if (typeof val === 'string' && /^-?\d+(\.\d+)?$/.test(val.trim()) && !/^0\d/.test(val.trim()) && o.numbers !== false) x += `<c r="${ref}"${s}><v>${+val}</v></c>`;
          else x += `<c r="${ref}" t="inlineStr"${s}><is><t xml:space="preserve">${xesc(val)}</t></is></c>`;
        });
        x += '</row>';
      });
      x += '</sheetData>';
      if (sh.merges && sh.merges.length) x += `<mergeCells count="${sh.merges.length}">${sh.merges.map(m => `<mergeCell ref="${m}"/>`).join('')}</mergeCells>`;
      x += '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/></worksheet>';
      files.push({ name: `xl/worksheets/sheet${si + 1}.xml`, data: x });
      wbS.push(`<sheet name="${xesc(String(sh.name || 'Sheet' + (si + 1)).replace(/[\\/?*\[\]:]/g, ' ').slice(0, 31))}" sheetId="${si + 1}" r:id="rId${si + 1}"/>`);
      wbR.push(`<Relationship Id="rId${si + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${si + 1}.xml"/>`);
      ctO.push(`<Override PartName="/xl/worksheets/sheet${si + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`);
    });
    const n = sheets.length;
    files.unshift(
      { name: '[Content_Types].xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${ctO.join('')}</Types>` },
      { name: '_rels/.rels', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
      { name: 'xl/workbook.xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${wbS.join('')}</sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>` },
      { name: 'xl/_rels/workbook.xml.rels', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${wbR.join('')}<Relationship Id="rId${n + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
      { name: 'xl/styles.xml', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="164" formatCode="&quot;$&quot;#,##0.00"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Calibri"/><family val="2"/></font><font><b/><sz val="11"/><name val="Calibri"/><family val="2"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="10" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>' }
    );
    return zip(files, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }
  function cellVal(v) { return v && typeof v === 'object' && !(v instanceof Date) ? (v.v != null ? v.v : v.f) : v; }
  function csv(rows) { return new Blob(['\uFEFF' + rows.map(r => r.map(v => { v = cellVal(v); v = v == null ? '' : String(v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(',')).join('\r\n')], { type: 'text/csv' }); }
  function tableRows(tb) { return [...tb.querySelectorAll('tr')].map(tr => [...tr.children].filter(c => /^T[DH]$/.test(c.tagName)).map(c => c.innerText.trim())); }

  /* ------------------------------------------------------------ simple files */
  const text = (s, type) => new Blob([s], { type: type || 'text/plain;charset=utf-8' });
  function htmlPage(body, title, css) { return text(`<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${xesc(title || 'My page')}</title>${css ? `\n<style>\n${css}\n</style>` : ''}\n</head>\n<body>\n${body}\n</body>\n</html>\n`, 'text/html;charset=utf-8'); }

  /* ------------------------------------------------------------ the Save a copy dialog */
  const CSS = `#ss-toast{position:fixed;left:50%;bottom:22px;transform:translate(-50%,20px);background:#0b1a46;color:#fff;border:1px solid #f5c542;border-radius:99px;padding:8px 16px;font:600 13px/1.3 system-ui,sans-serif;opacity:0;pointer-events:none;transition:.25s;z-index:2147483647;max-width:90vw}
#ss-toast.on{opacity:1;transform:translate(-50%,0)}
.ss-back{position:fixed;inset:0;background:rgba(5,10,30,.55);z-index:2147483600;display:flex;align-items:center;justify-content:center;padding:16px}
.ss-dlg{background:#fff;color:#1b1b1b;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.35);width:min(440px,100%);max-height:90vh;overflow:auto;font:14px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}
.ss-dlg h2{margin:0;padding:16px 18px 6px;font-size:18px}
.ss-dlg p.ss-sub{margin:0;padding:0 18px 10px;color:#555;font-size:13px}
.ss-dlg label.ss-nm{display:block;padding:0 18px;font-weight:600;font-size:13px}
.ss-dlg input.ss-in{width:100%;box-sizing:border-box;margin:4px 0 10px;padding:8px 10px;border:1px solid #9aa;border-radius:8px;font:inherit}
.ss-fmts{display:grid;gap:8px;padding:0 18px 14px}
.ss-fmt{display:flex;gap:12px;align-items:center;text-align:left;border:2px solid #d6dce8;border-radius:10px;background:#f7f9fd;padding:10px 12px;cursor:pointer;font:inherit;color:inherit}
.ss-fmt:hover,.ss-fmt:focus-visible{border-color:#2b579a;background:#eef3fb;outline:none}
.ss-fmt .ss-ic{flex:0 0 40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font:800 12px system-ui,sans-serif}
.ss-fmt b{display:block}.ss-fmt small{color:#555}
.ss-fmt[aria-busy="true"]{opacity:.6;cursor:progress}
.ss-foot{display:flex;justify-content:flex-end;gap:8px;padding:0 18px 16px}
.ss-foot button{border:1px solid #9aa;background:#fff;border-radius:8px;padding:7px 14px;font:inherit;cursor:pointer}
.ss-btn{display:inline-flex;align-items:center;gap:6px}
@media (max-width:420px){.ss-dlg h2{font-size:16px}}`;
  function ensureCss() { if (document.getElementById('ss-css')) return; const s = document.createElement('style'); s.id = 'ss-css'; s.textContent = CSS; document.head.appendChild(s); }
  const IC = { psd: ['PS', '#001e36'], xmind: ['XM', '#e7522b'], docx: ['W', '#2b579a'], pdf: ['PDF', '#c4302b'], jpg: ['JPG', '#d97706'], png: ['PNG', '#0e7490'], xlsx: ['X', '#217346'], csv: ['CSV', '#4d7c0f'], svg: ['SVG', '#7c3aed'], html: ['</>', '#e34c26'], txt: ['TXT', '#475569'], pptx: ['P', '#b7472a'], zip: ['ZIP', '#57534e'] };
  /* SimSave.dialog({title, name, sub, formats:[{ext, label, note, make: async (name) => Blob}]}) */
  function dialog(o) {
    ensureCss();
    const prevFocus = document.activeElement;
    const back = document.createElement('div'); back.className = 'ss-back ss-ignore';
    const d = document.createElement('div'); d.className = 'ss-dlg'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-labelledby', 'ss-h');
    d.innerHTML = `<h2 id="ss-h">${xesc(o.title || 'Save a copy')}</h2><p class="ss-sub">${xesc(o.sub || 'Choose a format. The file downloads to your device so you can submit or keep it.')}</p><label class="ss-nm" for="ss-name">File name<input class="ss-in" id="ss-name" value="${xesc(String(o.name || 'My_work').replace(/\.[a-z0-9]{2,5}$/i, ''))}"></label><div class="ss-fmts"></div><div class="ss-foot"><button type="button" class="ss-x">Close</button></div>`;
    const list = d.querySelector('.ss-fmts');
    (o.formats || []).forEach(f => {
      const ic = IC[f.ext] || [f.ext.toUpperCase(), '#334155'];
      const b = document.createElement('button'); b.type = 'button'; b.className = 'ss-fmt';
      b.innerHTML = `<span class="ss-ic" style="background:${ic[1]}" aria-hidden="true">${xesc(ic[0])}</span><span><b>${xesc(f.label)}</b><small>${xesc(f.note || '.' + f.ext)}</small></span>`;
      b.onclick = async () => {
        if (b.getAttribute('aria-busy') === 'true') return; b.setAttribute('aria-busy', 'true'); const lbl = b.querySelector('b'), old = lbl.textContent; lbl.textContent = 'Preparing…';
        try { const name = cleanName(d.querySelector('#ss-name').value, f.ext); const blob = await f.make(name); if (blob) { await save(name, blob); close(); } }
        catch (e) { console.warn(e); toast(e && /renderer/.test(e.message) ? e.message : 'Sorry, that file could not be made. Try another format.'); }
        finally { b.removeAttribute('aria-busy'); lbl.textContent = old; }
      };
      list.appendChild(b);
    });
    function close() { back.remove(); document.removeEventListener('keydown', key, true); try { prevFocus && prevFocus.focus && prevFocus.focus(); } catch (e) { } }
    function key(e) { if (e.key === 'Escape') { e.stopPropagation(); close(); } else if (e.key === 'Tab') { const f = [...d.querySelectorAll('input,button')]; const i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } } }
    d.querySelector('.ss-x').onclick = close; back.addEventListener('mousedown', e => { if (e.target === back) close(); });
    document.addEventListener('keydown', key, true);
    back.appendChild(d); document.body.appendChild(back); setTimeout(() => { const b = list.querySelector('button'); (b || d.querySelector('input')).focus(); }, 30);
    return { close };
  }
  /* A ready-made floating "Save a copy" button for simulators without a natural menu slot. */
  function button(onClick, o) {
    ensureCss(); o = o || {};
    const b = document.createElement('button'); b.type = 'button'; b.className = 'ss-btn ss-ignore ' + (o.className || ''); b.innerHTML = o.html || '⬇ Save a copy';
    if (!o.className) b.setAttribute('style', `position:fixed;${o.pos || 'right:12px;bottom:12px'};z-index:2147483000;background:#2b579a;color:#fff;border:0;border-radius:99px;padding:9px 14px;font:700 13px system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.3);cursor:pointer`);
    b.setAttribute('aria-label', o.label || 'Save a copy of your work'); b.onclick = onClick; (o.parent || document.body).appendChild(b); return b;
  }

  /* ------------------------------------------------------------ native formats: Photoshop .psd (layered) and XMind .xmind */
  /* SimSave.psd([{name, canvas, left, top, opacity (0–1), hidden}], width, height) → layered RGB .psd (bottom layer first) */
  function psd(layers, W, H) {
    if (!Array.isArray(layers)) layers = [{ name: 'Layer 1', canvas: layers }];
    W = W || layers[0].canvas.width; H = H || layers[0].canvas.height;
    const out = []; const B = n => { const b = new Uint8Array(n); out.push(b); return new DataView(b.buffer); };
    const str = s => out.push(enc.encode(s));
    const pix = c => c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    // header
    str('8BPS'); let v = B(2); v.setUint16(0, 1); B(6); v = B(2); v.setUint16(0, 4); v = B(8); v.setUint32(0, H); v.setUint32(4, W); v = B(4); v.setUint16(0, 8); v.setUint16(2, 3);
    B(4); B(4); // colour mode data, image resources: empty
    // layer records + channel data
    const recs = [], chans = [];
    layers.forEach(L => {
      const c = L.canvas, w = c.width, h = c.height, t = L.top || 0, l = L.left || 0, d = pix(c), n = w * h;
      const planes = [-1, 0, 1, 2].map(id => { const p = new Uint8Array(n); const off = id === -1 ? 3 : id; for (let i = 0; i < n; i++) p[i] = d[i * 4 + off]; return { id, p }; });
      const nameB = enc.encode(String(L.name || 'Layer').slice(0, 250)); let nlen = 1 + nameB.length; const pad = (4 - nlen % 4) % 4; nlen += pad;
      const extra = 4 + 4 + nlen;
      const r = new DataView(new ArrayBuffer(16 + 2 + 6 * 4 + 12 + 4 + extra)); let o = 0;
      r.setInt32(o, t); r.setInt32(o + 4, l); r.setInt32(o + 8, t + h); r.setInt32(o + 12, l + w); o += 16; r.setUint16(o, 4); o += 2;
      planes.forEach(q => { r.setInt16(o, q.id); r.setUint32(o + 2, 2 + n); o += 6; });
      [56, 66, 73, 77].forEach((x, i) => r.setUint8(o + i, x)); o += 4; [110, 111, 114, 109].forEach((x, i) => r.setUint8(o + i, x)); o += 4;
      r.setUint8(o, Math.round(255 * (L.opacity == null ? 1 : L.opacity))); r.setUint8(o + 1, 0); r.setUint8(o + 2, L.hidden ? 2 : 0); r.setUint8(o + 3, 0); o += 4;
      r.setUint32(o, extra); o += 4; r.setUint32(o, 0); o += 4; r.setUint32(o, 0); o += 4;
      r.setUint8(o, nameB.length); o += 1; nameB.forEach((x, i) => r.setUint8(o + i, x));
      recs.push(new Uint8Array(r.buffer));
      planes.forEach(q => { chans.push(new Uint8Array([0, 0]), q.p); });
    });
    let infoLen = 2 + recs.reduce((a, x) => a + x.length, 0) + chans.reduce((a, x) => a + x.length, 0); const infoPad = infoLen % 2; infoLen += infoPad;
    v = B(4); v.setUint32(0, 4 + infoLen + 4);
    v = B(4); v.setUint32(0, infoLen); v = B(2); v.setInt16(0, -layers.length);
    recs.forEach(x => out.push(x)); chans.forEach(x => out.push(x)); if (infoPad) B(1);
    B(4); // global layer mask info: empty
    // merged composite (raw RGBA planes)
    const comp = document.createElement('canvas'); comp.width = W; comp.height = H; const cx = comp.getContext('2d');
    layers.forEach(L => { if (L.hidden) return; cx.globalAlpha = L.opacity == null ? 1 : L.opacity; cx.drawImage(L.canvas, L.left || 0, L.top || 0); }); cx.globalAlpha = 1;
    const cd = cx.getImageData(0, 0, W, H).data, N = W * H; B(2);
    [0, 1, 2, 3].forEach(k => { const p = new Uint8Array(N); for (let i = 0; i < N; i++) p[i] = cd[i * 4 + k]; out.push(p); });
    return new Blob(out, { type: 'image/vnd.adobe.photoshop' });
  }
  /* SimSave.xmind({title, children:[{title, children:[…], note}]}, sheetTitle) → .xmind that opens in XMind (new and classic) */
  function xmind(root, sheetTitle) {
    let n = 0; const id = () => 'ss' + Date.now().toString(36) + (++n).toString(36);
    const toJ = t => { const o = { id: id(), class: 'topic', title: String(t.title || '') }; if (t.note) o.notes = { plain: { content: String(t.note) } }; if (t.children && t.children.length) o.children = { attached: t.children.map(toJ) }; return o; };
    const rt = toJ(root); rt.structureClass = 'org.xmind.ui.map.unbalanced';
    const sheet = [{ id: id(), class: 'sheet', title: sheetTitle || 'Sheet 1', rootTopic: rt }];
    const toX = t => `<topic id="${id()}"><title>${xesc(t.title || '')}</title>${t.note ? `<notes><plain>${xesc(t.note)}</plain></notes>` : ''}${t.children && t.children.length ? `<children><topics type="attached">${t.children.map(toX).join('')}</topics></children>` : ''}</topic>`;
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><xmap-content xmlns="urn:xmind:xmap:xmlns:content:2.0" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0"><sheet id="${id()}">${toX(root).replace('<topic ', '<topic structure-class="org.xmind.ui.map.unbalanced" ')}<title>${xesc(sheetTitle || 'Sheet 1')}</title></sheet></xmap-content>`;
    return zip([
      { name: 'content.json', data: JSON.stringify(sheet) },
      { name: 'metadata.json', data: JSON.stringify({ creator: { name: 'SimSave', version: '1' } }) },
      { name: 'manifest.json', data: JSON.stringify({ 'file-entries': { 'content.json': {}, 'metadata.json': {}, 'content.xml': {} } }) },
      { name: 'content.xml', data: xml },
      { name: 'META-INF/manifest.xml', data: '<?xml version="1.0" encoding="UTF-8" standalone="no"?><manifest xmlns="urn:xmind:xmap:xmlns:manifest:1.0"><file-entry full-path="content.xml" media-type="text/xml"/><file-entry full-path="META-INF/" media-type=""/><file-entry full-path="META-INF/manifest.xml" media-type="text/xml"/></manifest>' }
    ], 'application/vnd.xmind.workbook');
  }

  /* ------------------------------------------------------------ clean print documents */
  const PRINT_CSS = `.ss-print{all:initial;display:block;box-sizing:border-box;width:760px;padding:40px 48px;background:#fff;color:#111;font:14px/1.5 Calibri,Carlito,"Segoe UI",Arial,sans-serif}
.ss-print *{box-sizing:border-box;max-width:100%}
.ss-print h1{font-size:22px;margin:0 0 8px;color:#0b1a46}.ss-print h2{font-size:18px;margin:16px 0 6px;color:#0b1a46}.ss-print h3,.ss-print h4{font-size:15px;margin:12px 0 4px}
.ss-print p{margin:0 0 8px}.ss-print ul,.ss-print ol{margin:0 0 8px 22px;padding:0}.ss-print li{margin:2px 0}
.ss-print table{border-collapse:collapse;width:100%;margin:6px 0 10px}.ss-print td,.ss-print th{border:1px solid #999;padding:4px 6px;vertical-align:top;text-align:left}
.ss-print blockquote{margin:6px 0 10px;padding:6px 12px;border-left:4px solid #c9d3e6;background:#f5f7fb}
.ss-print img,.ss-print svg{max-width:100%;height:auto}
.ss-print .ss-head{border-bottom:3px solid #0b1a46;margin-bottom:14px;padding-bottom:8px}
.ss-print .ss-meta{width:100%;border-collapse:collapse;margin:6px 0 0}.ss-print .ss-meta td{border:1px solid #c6cfdf;padding:4px 8px;font-size:13px}.ss-print .ss-meta td:nth-child(odd){background:#eef2f9;font-weight:700;width:18%}
.ss-print .ss-ans{border:1px solid #9fb0cf;background:#f7f9fd;border-radius:6px;padding:8px 10px;margin:4px 0 10px;white-space:pre-wrap}
.ss-print .ss-opt{margin:2px 0 2px 8px}.ss-print .ss-opt.sel{font-weight:700}.ss-print .ss-ok{color:#0a7a3a;font-weight:700}.ss-print .ss-no{color:#b42318;font-weight:700}
.ss-print .ss-foot{margin-top:18px;border-top:1px solid #c6cfdf;padding-top:6px;font-size:11px;color:#555}`;
  /* Clean print layout, rendered in an isolated frame so the host page's styles cannot leak in. */
  async function withPrintBox(html, fn) {
    const fr = document.createElement('iframe'); fr.setAttribute('aria-hidden', 'true'); fr.tabIndex = -1; fr.title = 'print';
    fr.style.cssText = 'position:fixed;left:-12000px;top:0;width:840px;height:1400px;border:0;pointer-events:none';
    document.body.appendChild(fr);
    try {
      const d = fr.contentDocument;
      d.open(); d.write('<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#fff}' + PRINT_CSS + '</style></head><body><div class="ss-print">' + html + '</div></body></html>'); d.close();
      const box = d.querySelector('.ss-print');
      await Promise.all([...box.querySelectorAll('img')].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
      try { if (d.fonts && d.fonts.ready) await d.fonts.ready; } catch (e) { }
      return await fn(box);
    } finally { fr.remove(); }
  }
  const pdfFromHTML = (html, o) => withPrintBox(html, box => pdfFromElement(box, Object.assign({ size: 'Letter', margin: 0 }, o || {})));
  /* Submit a piece of finished work: inside a course this opens the course's Save / Submit panel; on its own page it offers PDF and Word. */
  function submit(o) {
    o = o || {};
    try { if (window.parent !== window && window.parent.WorkSubmit && typeof window.parent.WorkSubmit.open === 'function') return window.parent.WorkSubmit.open(o); } catch (e) { }
    const title = o.title || 'My work';
    const head = `<div class="ss-head"><h1>${xesc(title)}</h1><table class="ss-meta"><tr><td>Name</td><td>${xesc(o.name || '')}</td><td>Date</td><td>${xesc(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))}</td></tr>${o.score != null ? `<tr><td>Score</td><td colspan="3">${xesc(o.score)}${o.max != null ? ' / ' + xesc(o.max) : ''}</td></tr>` : ''}</table></div>`;
    const doc = head + (o.html || '');
    return dialog({ title: 'Save or submit your work', name: title, sub: 'Save a copy as a PDF or Word file, then send it to your teacher by email or upload it to your class page.', formats: [
      { ext: 'pdf', label: 'PDF document', note: 'Best for submitting · .pdf', make: () => pdfFromHTML(doc, { title }) },
      { ext: 'docx', label: 'Word document', note: 'Opens in Word or Google Docs · .docx', make: () => withPrintBox(doc, box => htmlToDocx(box, { title })) }
    ] });
  }

  window.SimSave = {
    version: 1, save, toast, cleanName, dialog, button, css: ensureCss,
    zip, docx: htmlToDocx, xlsx, csv, psd, xmind, tableRows, text, htmlPage,
    pdfFromCanvases, pdfFromElement, pdfFromHTML, withPrintBox, submit, domToCanvas, svgToCanvas, canvasBlob, flatten, loadImg,
    jpg: (cv, q) => canvasBlob(flatten(cv, '#ffffff'), 'image/jpeg', q || 0.92),
    png: cv => canvasBlob(cv, 'image/png'),
    svgBlob: svg => text(typeof svg === 'string' ? svg : (svg.getAttribute('xmlns') ? '' : (svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg'), '')) + new XMLSerializer().serializeToString(svg), 'image/svg+xml')
  };
})();
