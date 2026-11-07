/* Copy protection for course text: the lesson text, keys and stimuli cannot be selected, copied, cut or dragged out.
   Students can still type, select and copy inside their own answer boxes and editors (inputs, text areas and editable areas),
   and drag-and-drop activities keep working. Developed by Kester Small. */
(function () {
  'use strict';
  if (window.__nocopy) return; window.__nocopy = true;
  const OK = 'input,textarea,select,[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"],.allow-copy';
  const editable = n => { try { if (n && n.nodeType === 3) n = n.parentElement; return !!(n && n.closest && n.closest(OK)); } catch (e) { return false; } };
  const css = document.createElement('style'); css.id = 'nocopy-css';
  css.textContent = 'html,body{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-touch-callout:none}' +
    'input,textarea,select,[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"],[contenteditable="true"] *,.allow-copy,.allow-copy *{-webkit-user-select:text;-moz-user-select:text;user-select:text;-webkit-touch-callout:default}' +
    'img,svg,canvas{-webkit-user-drag:none;user-drag:none}';
  (document.head || document.documentElement).appendChild(css);
  const selInEditable = () => { const s = window.getSelection && window.getSelection(); if (!s || !s.rangeCount) return true; return editable(s.anchorNode) && editable(s.focusNode); };
  ['copy', 'cut'].forEach(t => document.addEventListener(t, e => { if (!(editable(e.target) && selInEditable())) e.preventDefault(); }, true));
  document.addEventListener('selectstart', e => { if (!editable(e.target)) e.preventDefault(); }, true);
  document.addEventListener('contextmenu', e => { if (!editable(e.target)) e.preventDefault(); }, true);
  document.addEventListener('dragstart', e => { const t = e.target; if (editable(t)) return; if (t && t.nodeType === 1 && t.closest && t.closest('[draggable="true"]')) return; e.preventDefault(); }, true);
  document.addEventListener('keydown', e => {
    if (!(e.ctrlKey || e.metaKey)) return; const k = (e.key || '').toLowerCase();
    if ((k === 'c' || k === 'x' || k === 'a') && !editable(e.target)) e.preventDefault();
    if (k === 'u') e.preventDefault();
  }, true);
})();
