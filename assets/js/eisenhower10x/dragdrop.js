export function initDragDrop(board, move, announce) {
  let dragged = null, pointer = null;
  const reset = () => { dragged = null; pointer = null; board.querySelectorAll('.is-drop-target').forEach(el => el.classList.remove('is-drop-target')); };
  board.addEventListener('dragstart', event => {
    const handle = event.target.closest('[data-drag]');
    if (!handle) return;
    dragged = handle.dataset.drag;
    event.dataTransfer.setData('text/plain', dragged);
    event.dataTransfer.effectAllowed = 'move';
  });
  board.addEventListener('dragover', event => {
    if (!dragged) return;
    const target = event.target.closest('[data-quadrant]');
    if (target) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }
  });
  board.addEventListener('drop', event => { const quadrant = event.target.closest('[data-quadrant]'); if (dragged && quadrant) { event.preventDefault(); const id = dragged; reset(); move(id, quadrant.dataset.quadrant); } });
  board.addEventListener('dragend', reset);
  // Alça com pointer capture para tablet/touch; o restante do card mantém a rolagem.
  board.addEventListener('pointerdown', event => {
    const handle = event.target.closest('[data-drag]');
    if (!handle || event.pointerType === 'mouse') return;
    pointer = { id: handle.dataset.drag, pointerId: event.pointerId };
    handle.setPointerCapture(event.pointerId);
  });
  board.addEventListener('pointermove', event => {
    if (!pointer) return;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-quadrant]');
    board.querySelectorAll('[data-quadrant]').forEach(el => el.classList.toggle('is-drop-target', el === target));
  });
  board.addEventListener('pointerup', event => { if (!pointer) return; const id = pointer.id, target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-quadrant]'); reset(); if (target) move(id, target.dataset.quadrant); });
  board.addEventListener('pointercancel', () => { if (pointer) reset(); });
  board.addEventListener('keydown', event => { if (event.key === 'Escape') reset(); });
  board.addEventListener('click', event => { if (event.target.closest('[data-drag]')) announce('Você também pode mover a tarefa pelo campo Mover para, no próprio card.'); });
}
