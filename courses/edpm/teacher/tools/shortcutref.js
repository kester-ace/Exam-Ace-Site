/* EDPM: Keyboard shortcuts reference, by area — Developed by Kester Small */
(function () {
  const AREAS = [
    { id: 'win', n: 'Windows & general', i: '🪟', rows: [
      ['Copy', 'Ctrl + C'], ['Cut', 'Ctrl + X'], ['Paste', 'Ctrl + V'], ['Undo', 'Ctrl + Z'], ['Redo / repeat', 'Ctrl + Y'], ['Select all', 'Ctrl + A'],
      ['Save', 'Ctrl + S'], ['Save As', 'F12 (Office)'], ['Open', 'Ctrl + O'], ['New document / window', 'Ctrl + N'], ['Print', 'Ctrl + P'], ['Close the document or tab', 'Ctrl + W'],
      ['Find', 'Ctrl + F'], ['Help', 'F1'], ['Rename the selected file', 'F2'], ['Switch between open programs', 'Alt + Tab'], ['Close the active program', 'Alt + F4'],
      ['Show the desktop', 'Windows + D'], ['Lock the computer', 'Windows + L'], ['Open File Explorer', 'Windows + E'], ['Screenshot of part of the screen', 'Windows + Shift + S'],
      ['Open Task Manager', 'Ctrl + Shift + Esc'], ['Delete to the Recycle Bin', 'Delete'], ['Delete permanently (skip the Recycle Bin)', 'Shift + Delete'], ['Cancel / close a dialog box', 'Esc']] },
    { id: 'word', n: 'Word processing', i: '📝', rows: [
      ['Bold', 'Ctrl + B'], ['Italic', 'Ctrl + I'], ['Underline', 'Ctrl + U'], ['Align left', 'Ctrl + L'], ['Centre', 'Ctrl + E'], ['Align right', 'Ctrl + R'], ['Justify', 'Ctrl + J'],
      ['Single line spacing', 'Ctrl + 1'], ['Double line spacing', 'Ctrl + 2'], ['1.5 line spacing', 'Ctrl + 5'], ['Increase font size', 'Ctrl + Shift + >'], ['Decrease font size', 'Ctrl + Shift + <'],
      ['Font dialog box', 'Ctrl + D'], ['Change case (UPPER / lower / Title)', 'Shift + F3'], ['Page break', 'Ctrl + Enter'], ['Column break', 'Ctrl + Shift + Enter'], ['Line break (same paragraph)', 'Shift + Enter'],
      ['Find and Replace', 'Ctrl + H'], ['Go to a page', 'Ctrl + G'], ['Insert hyperlink', 'Ctrl + K'], ['Spelling and grammar check', 'F7'], ['Thesaurus', 'Shift + F7'],
      ['Start of document', 'Ctrl + Home'], ['End of document', 'Ctrl + End'], ['Select one word at a time', 'Ctrl + Shift + →'], ['Indent a paragraph', 'Ctrl + M'], ['Hanging indent', 'Ctrl + T'],
      ['Show / hide formatting marks (¶)', 'Ctrl + Shift + 8'], ['Superscript', 'Ctrl + Shift + ='], ['Subscript', 'Ctrl + ='], ['Copy formatting / paste formatting', 'Ctrl + Shift + C / Ctrl + Shift + V'],
      ['Next cell in a table', 'Tab'], ['Previous cell in a table', 'Shift + Tab'], ['Track Changes on / off', 'Ctrl + Shift + E'], ['Insert today\'s date', 'Alt + Shift + D']] },
    { id: 'excel', n: 'Spreadsheets (Excel)', i: '📊', rows: [
      ['Edit the active cell', 'F2'], ['Make a reference absolute ($A$1)', 'F4 (while editing)'], ['AutoSum', 'Alt + ='], ['Format Cells dialog box', 'Ctrl + 1'], ['Today\'s date', 'Ctrl + ;'], ['Current time', 'Ctrl + Shift + :'],
      ['Fill down', 'Ctrl + D'], ['Fill right', 'Ctrl + R'], ['New line inside a cell', 'Alt + Enter'], ['Show formulas', 'Ctrl + `'], ['Select the whole column', 'Ctrl + Space'], ['Select the whole row', 'Shift + Space'],
      ['Jump to the edge of the data', 'Ctrl + Arrow key'], ['Go to cell A1', 'Ctrl + Home'], ['Insert a new worksheet', 'Shift + F11'], ['Next / previous worksheet', 'Ctrl + Page Down / Ctrl + Page Up'],
      ['Insert a chart of the selected data', 'Alt + F1'], ['Currency format', 'Ctrl + Shift + $'], ['Percentage format', 'Ctrl + Shift + %'], ['Confirm and move down / right', 'Enter / Tab'], ['Create a table', 'Ctrl + T'], ['Apply or remove a filter', 'Ctrl + Shift + L']] },
    { id: 'ppt', n: 'Presentations (PowerPoint)', i: '📽️', rows: [
      ['New slide', 'Ctrl + M'], ['Duplicate slide', 'Ctrl + D'], ['Start slide show from the beginning', 'F5'], ['Start from the current slide', 'Shift + F5'], ['End the slide show', 'Esc'],
      ['Next slide (in a show)', 'N, Space, → or Enter'], ['Previous slide (in a show)', 'P, Backspace or ←'], ['Go to slide number', 'Number + Enter'], ['Black screen / white screen', 'B / W'],
      ['Group objects', 'Ctrl + G'], ['Ungroup objects', 'Ctrl + Shift + G'], ['Centre text', 'Ctrl + E'], ['Insert hyperlink', 'Ctrl + K'], ['Copy / paste formatting', 'Ctrl + Shift + C / Ctrl + Shift + V']] },
    { id: 'access', n: 'Databases (Access)', i: '🗄️', rows: [
      ['Show / hide the Navigation Pane', 'F11'], ['Next field', 'Tab'], ['Previous field', 'Shift + Tab'], ['Today\'s date', 'Ctrl + ;'], ['Current time', 'Ctrl + Shift + :'],
      ['Copy the value from the record above', 'Ctrl + \''], ['New record', 'Ctrl + Plus (+)'], ['Delete the current record', 'Ctrl + Minus (-)'], ['Save the record', 'Shift + Enter'], ['Switch between views (table, query, form)', 'Ctrl + . or Ctrl + ,'], ['Find', 'Ctrl + F']] },
    { id: 'pub', n: 'Publisher & graphics', i: '📰', rows: [
      ['Group objects', 'Ctrl + Shift + G'], ['Ungroup objects', 'Ctrl + Shift + G (again)'], ['Bring forward / send backward', 'Ctrl + ] / Ctrl + ['], ['Nudge an object', 'Arrow key'], ['Fine nudge', 'Alt + Arrow key'],
      ['Copy / paste formatting', 'Ctrl + Shift + C / Ctrl + Shift + V'], ['Insert a new page', 'Ctrl + Shift + N'], ['Zoom to whole page', 'Ctrl + Shift + L'], ['Bold, italic, underline', 'Ctrl + B, I, U'], ['Centre text', 'Ctrl + E']] },
    { id: 'mail', n: 'E-mail & the web', i: '✉️', rows: [
      ['New e-mail message (Outlook)', 'Ctrl + N'], ['Reply', 'Ctrl + R'], ['Reply all', 'Ctrl + Shift + R'], ['Forward', 'Ctrl + F'], ['Send', 'Ctrl + Enter or Alt + S'], ['Check names in the To box', 'Ctrl + K'],
      ['Open a new browser tab', 'Ctrl + T'], ['Reopen the last closed tab', 'Ctrl + Shift + T'], ['Reload the page', 'F5 or Ctrl + R'], ['Go to the address bar', 'Ctrl + L'], ['Bookmark the page', 'Ctrl + D'], ['Find on the page', 'Ctrl + F'], ['Zoom in / out', 'Ctrl + Plus / Ctrl + Minus']] }
  ];
  const keysHTML = s => s.split(/(\s\/\s|\sor\s|,\s)/).map(part => /^(\s\/\s|\sor\s|,\s)$/.test(part) ? `<span class="sk-or">${part.trim()}</span>` : part.split(' + ').map(k => `<kbd>${k.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</kbd>`).join('<span class="sk-plus">+</span>')).join(' ');
  function css() {
    if (document.getElementById('sk-css')) return;
    const st = document.createElement('style'); st.id = 'sk-css';
    st.textContent = `.sk-tbl{width:100%;border-collapse:collapse}.sk-tbl td{padding:9px 8px;border-bottom:1px solid var(--line,#33415a);vertical-align:middle}.sk-tbl td:last-child{text-align:right;white-space:normal}
.sk-tbl kbd{display:inline-block;min-width:1.6em;padding:3px 8px;margin:2px 0;border-radius:7px;border:1px solid rgba(245,197,66,.55);border-bottom-width:3px;background:linear-gradient(#1c2a55,#121c3c);color:#f5d97a;font:600 .82rem ui-monospace,Consolas,monospace;text-align:center}
.sk-plus{margin:0 3px;opacity:.6}.sk-or{margin:0 6px;opacity:.7;font-size:.8rem}
.sk-search{width:100%;max-width:420px;padding:10px 12px;border-radius:10px;border:1px solid var(--line,#33415a);background:var(--raise,rgba(255,255,255,.05));color:inherit;font:inherit}
@media print{body *{visibility:hidden}#sk-print,#sk-print *{visibility:visible}#sk-print{position:absolute;left:0;top:0;width:100%;color:#000;background:#fff}#sk-print kbd{color:#000;background:#fff;border-color:#555}}`;
    document.head.appendChild(st);
  }
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'shortcutref', title: 'Keyboard Shortcuts',
    tile: { icon: '⌨️', meta: 'Every shortcut you need, by area: Windows, Word, Excel, PowerPoint, Access, Publisher, e-mail and web' },
    render(api, loc) {
      css();
      const esc = api.esc, tab = loc.tab || 'win', q = (loc.k || '').toLowerCase();
      const list = q ? AREAS.map(a => ({ ...a, rows: a.rows.filter(r => (r[0] + ' ' + r[1]).toLowerCase().includes(q)) })).filter(a => a.rows.length) : AREAS.filter(a => a.id === tab);
      let h = `<div class="hero"><span class="eyebrow">EDPM · Toolkit</span><h1>Keyboard shortcuts</h1><p>Fast hands earn marks in Paper 02 and the SBA. Pick an area, learn five a week, then race them in <b>Shortcut Sprint</b>.</p>
        <div class="row"><button type="button" class="btn gold" data-go="edpmgames" data-k="shortcuts">Play Shortcut Sprint</button><button type="button" class="btn ghost" data-skprint="1">🖨 Print this list</button></div></div>`;
      h += `<div class="card"><div class="chips" role="tablist" aria-label="Shortcut areas">${AREAS.map(a => `<button type="button" role="tab" class="chip ${!q && tab === a.id ? 'sel' : ''}" aria-selected="${!q && tab === a.id}" data-go="shortcutref" data-tab="${a.id}">${a.i} ${esc(a.n)}</button>`).join('')}</div>
        <div style="margin-top:12px"><input class="sk-search" type="search" id="sk-q" placeholder="Search all shortcuts, e.g. bold, F4, slide" value="${esc(loc.k || '')}" aria-label="Search shortcuts"></div></div>`;
      h += `<div id="sk-print">${list.map(a => `<div class="card"><h3>${a.i} ${esc(a.n)}</h3><div class="tablewrap"><table class="sk-tbl"><tbody>${a.rows.map(r => `<tr><td>${esc(r[0])}</td><td>${keysHTML(r[1])}</td></tr>`).join('')}</tbody></table></div></div>`).join('') || '<div class="card"><p>No shortcut matches that search.</p></div>'}</div>`;
      h += `<p class="hint">Shortcuts shown are for Microsoft Windows and Microsoft 365. On a Mac, use Cmd in place of Ctrl for most of them. A few vary between program versions.</p>`;
      return h;
    },
    mount(api, loc, stage) {
      const inp = stage.querySelector('#sk-q');
      if (inp) { let t; inp.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { api.go({ v: 'shortcutref', tab: loc.tab || 'win', k: inp.value.trim() }); const n = document.getElementById('sk-q'); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } }, 250); }); }
      const pb = stage.querySelector('[data-skprint]'); if (pb) pb.addEventListener('click', () => window.print());
    }
  });
})();
