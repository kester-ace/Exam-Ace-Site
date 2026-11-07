/* Flipbook: read every set of notes in this course as a page-turning book, inside the course only.
   Nothing here can be downloaded, printed or saved. View id: books. Kester Small. */
(function () {
  const CSS = `.bk-sec{margin-top:14px}.bk-sec>h2{margin:0 0 4px;font-size:1.15rem}.bk-sec>p.hint{margin:0 0 6px}
.bk-list{margin:8px 0 0;padding-left:1.2em;display:flex;flex-direction:column;gap:4px}`;
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'books',
    title: 'Flipbook',
    tile: { icon: '📖', meta: 'Read the whole course as a page-turning book.' },
    render(api) {
      const T = api.S.teacher;
      return `<section class="hero"><span class="eyebrow">Read anywhere in the course</span><h1>Flipbook</h1><p>Every set of notes in this course, including the Essay Writing Workshop, as a page-turning book you read right here.</p></section>
<div class="card bk-sec" id="bk-read"><h2>📖 Read the flipbook</h2><p class="hint">Opens full screen. Turn pages with the arrows, swipe or the arrow keys; use Contents to jump to any unit and Search to find any term.${T ? ' In the Teacher’s Version the flipbook includes your instructor’s notes, answers and teaching tips.' : ''}</p>
<ul class="bk-list hint"><li>All four modules and the Essay Writing Workshop</li><li>Contents, Search and colour photos</li><li>The flipbook is read inside the course and cannot be downloaded or printed</li></ul>
<div class="row" style="margin-top:10px"><button type="button" class="btn gold" data-px="open" data-pv="books">📖 Open the flipbook</button></div></div>`;
    },
    click(action, el, api) {
      if (action === 'open') { if (window.COURSE_FLIPBOOK) window.COURSE_FLIPBOOK.open(); else api.toast('The flipbook is still loading. Try again in a moment.'); }
    }
  });
})();
