/* Essay Builder: Put It in Order — the drag-and-drop essay game, listed beside the Essay Builder. Developed by Kester Small */
(function () {
  const PAGE = 'games/essayorder.html', ID = 'essayorder';
  (window.COURSE_PLUGINS = window.COURSE_PLUGINS || []).push({
    view: 'eorder',
    title: 'Essay Builder: Put It in Order',
    tile: { icon: '🧩', meta: 'Drag paragraphs and sentences of model essays into the order an examiner expects. Mistakes are highlighted and explained, with a mini lesson or the notes for each one.' },
    render(api) {
      return `<div class="hero"><span class="eyebrow">Learn Smarter · Essay skills</span><h1>Essay Builder: Put It in Order</h1>
        <p>Rebuild model essays by dragging paragraphs and sentences into the right order. Anything out of place is highlighted and explained, and every check ends with feedback on what went well, what to fix and what to try next.</p></div>
        <div class="card"><h2>Play</h2><p>The game opens in full screen. Choose ✕ Exit game to come back to the course. Your progress is saved on this device; choose ↺ Start over in the game bar to begin again.</p>
        <div class="row"><button type="button" class="btn gold" data-gx="opengame" data-page="${PAGE}" data-id="${ID}" data-autofull="1">🧩 Play full screen</button></div></div>
        <div class="card"><h3>Three levels</h3><ul>
          <li><b>Foundation:</b> put whole paragraphs in order, with labels (introduction, body, conclusion) to help you.</li>
          <li><b>Core:</b> order the sentences inside a paragraph, including Paper 032 justifications (purpose, audience, context).</li>
          <li><b>Challenge:</b> rebuild a whole piece and drop the sentences that do not belong into the bin.</li></ul>
          <p class="hint">Covers Module 1, Module 2, Module 3 and Paper 032. Drag with the mouse or a finger, or use the keyboard (Space, then the arrow keys).</p></div>
        <div class="card"><h3>Also try</h3><div class="row"><button type="button" class="btn ghost" data-go="eb">🧱 Essay Builder (plan and draft step by step)</button></div></div>`;
    },
    mount() {
      try {
        const stage = document.getElementById('stage');
        const af = stage && stage.querySelector('[data-autofull]');
        const act = navigator.userActivation ? navigator.userActivation.isActive : false;
        if (af && act && !document.getElementById('gx-full') && window.openGameFull) setTimeout(() => window.openGameFull(af.dataset.page, af.dataset.id), 60);
      } catch (e) { }
    }
  });
})();
