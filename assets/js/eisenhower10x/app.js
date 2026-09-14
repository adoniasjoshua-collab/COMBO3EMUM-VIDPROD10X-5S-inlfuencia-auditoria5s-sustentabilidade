import { Store, KEYS, validateState } from './storage.js';
import { saveTask, classify, QUADRANTS } from './tasks.js';
import { reward, localDay } from './gamification.js';
import { render, announce } from './ui.js?v=20260914-3';
import { initDragDrop } from './dragdrop.js';
import { formatDateBR, parseDateBR, initDateInput } from './dates.js';

const app = document.querySelector('.eisenhower-app');
let browserStorage;
try { browserStorage = window.localStorage; } catch { /* Store.load oferece sessão temporária. */ }
const store = new Store(browserStorage);
let state = store.load(), lastDay = localDay(), pendingImport = null, pendingConfirm = null, returnFocus = null;
const form = document.querySelector('#eisenhower-task-form'), editor = document.querySelector('#eisenhower-editor'), confirmation = document.querySelector('#eisenhower-confirm');
const field = name => form.elements.namedItem(name);
initDateInput(field('dueDate'), document.querySelector('#eisenhower-date-picker'), document.querySelector('#eisenhower-date-button'));
function refresh() { render(state, store); }
function commit(next, message) { state = store.save(next); refresh(); announce(message); }
function safe(action) { try { action(); } catch (error) { announce(error.message || 'Não foi possível concluir a operação.'); } }
function openEditor(task = null, quadrant = 'do') {
  returnFocus = document.activeElement;
  form.reset();
  document.querySelector('#eisenhower-editor-title').textContent = task ? 'Editar tarefa' : 'Nova tarefa';
  document.querySelector('#eisenhower-form-error').textContent = '';
  document.querySelector('#eisenhower-assistant').open = false;
  document.querySelector('#eisenhower-assistant-feedback').textContent = '';
  for (const name of ['id', 'title', 'description', 'category']) field(name).value = task?.[name] || '';
  field('dueDate').value = formatDateBR(task?.dueDate || '');
  field('dueDate').removeAttribute('aria-invalid');
  field('quadrant').value = task?.quadrant || quadrant;
  field('status').value = task?.status || 'pending';
  editor.showModal(); field('title').focus();
}
function ask(message, callback) {
  returnFocus = document.activeElement; pendingConfirm = callback;
  document.querySelector('#eisenhower-confirm-text').textContent = message;
  confirmation.showModal(); document.querySelector('#eisenhower-confirm-cancel').focus();
}
function closeDialog(dialog) { dialog.close(); }
for (const dialog of [editor, confirmation]) dialog.addEventListener('close', () => { pendingConfirm = null; pendingImport = null; if (returnFocus?.isConnected) returnFocus.focus(); else document.querySelector('#eisenhower-add').focus(); });
for (const dialog of [editor, confirmation]) dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('button, input:not([type="hidden"]), select, textarea, summary, [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
  const first = controls[0], last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
document.querySelector('#eisenhower-confirm-cancel').addEventListener('click', () => closeDialog(confirmation));
document.querySelector('#eisenhower-confirm-ok').addEventListener('click', () => { const action = pendingConfirm; if (action) safe(action); closeDialog(confirmation); });
document.querySelector('#eisenhower-editor-cancel').addEventListener('click', () => closeDialog(editor));
document.querySelector('#eisenhower-add').addEventListener('click', () => openEditor());
document.querySelectorAll('[data-add-quadrant]').forEach(button => button.addEventListener('click', () => openEditor(null, button.dataset.addQuadrant)));
form.addEventListener('submit', event => {
  event.preventDefault();
  try {
    const input = Object.fromEntries(new FormData(form));
    try { input.dueDate = parseDateBR(input.dueDate); }
    catch (error) { field('dueDate').setAttribute('aria-invalid', 'true'); field('dueDate').focus(); throw error; }
    const result = saveTask(state.tasks, input);
    const next = { ...state, tasks: result.tasks, gamification: reward(state.gamification, result.task) };
    commit(next, result.created ? 'Tarefa criada. +1 XP pela criação.' : 'Tarefa atualizada.'); closeDialog(editor);
  } catch (error) { document.querySelector('#eisenhower-form-error').textContent = error.message; }
});
document.querySelector('#eisenhower-classify').addEventListener('click', () => {
  const important = field('important').value, urgent = field('urgent').value;
  const feedback = document.querySelector('#eisenhower-assistant-feedback');
  if (!important || !urgent) { feedback.textContent = 'Responda às duas perguntas para classificar.'; return; }
  field('quadrant').value = classify(important === 'yes', urgent === 'yes'); feedback.textContent = `Sugestão aplicada: ${QUADRANTS[field('quadrant').value]}. Você pode ajustar o quadrante.`;
});
function updateTask(id, changes) {
  const task = state.tasks.find(item => item.id === id);
  if (!task) throw new Error('A tarefa não existe mais.');
  const result = saveTask(state.tasks, { ...task, ...changes });
  commit({ ...state, tasks: result.tasks, gamification: reward(state.gamification, result.task) }, 'Tarefa atualizada.');
}
const board = document.querySelector('#eisenhower-board');
board.addEventListener('click', event => {
  const button = event.target.closest('[data-action]'); if (!button) return;
  const task = state.tasks.find(item => item.id === button.dataset.id); if (!task) return;
  if (button.dataset.action === 'edit') openEditor(task);
  if (button.dataset.action === 'toggle') safe(() => updateTask(task.id, { status: task.status === 'completed' ? 'pending' : 'completed' }));
  if (button.dataset.action === 'delete') ask(`Excluir “${task.title}”? A tarefa será removida. O XP já conquistado permanece.`, () => commit({ ...state, tasks: state.tasks.filter(item => item.id !== task.id) }, 'Tarefa excluída.'));
});
const move = (id, quadrant) => safe(() => { updateTask(id, { quadrant }); announce(`Tarefa movida para ${QUADRANTS[quadrant]}.`); });
board.addEventListener('change', event => { if (event.target.dataset.move) move(event.target.dataset.move, event.target.value); });
initDragDrop(board, move, announce);
const goal = document.querySelector('#eisenhower-goal'); goal.value = state.settings.dailyGoal;
goal.addEventListener('change', () => safe(() => { const value = Number(goal.value); if (!Number.isInteger(value) || value < 1 || value > 50) { goal.value = state.settings.dailyGoal; throw new Error('Escolha uma meta entre 1 e 50.'); } commit({ ...state, settings: { dailyGoal: value } }, 'Meta diária atualizada.'); }));
document.querySelector('#eisenhower-export').addEventListener('click', () => safe(() => {
  const url = URL.createObjectURL(new Blob([JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' }));
  const link = document.createElement('a'); link.href = url; link.download = `eisenhower10x-${localDay()}.json`; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); announce('Backup JSON preparado para download.');
}));
const importFile = document.querySelector('#eisenhower-import-file');
document.querySelector('#eisenhower-import').addEventListener('click', () => importFile.click());
importFile.addEventListener('change', async () => {
  const file = importFile.files[0]; if (!file) return;
  try {
    if (file.size > 5 * 1024 * 1024) throw new Error('O backup deve ter no máximo 5 MB.');
    const validated = validateState(JSON.parse(await file.text())); pendingImport = validated;
    ask(`Importar ${validated.tasks.length} tarefa(s)? Isso substituirá as tarefas, configurações e XP desta sessão. Exporte seus dados atuais antes de confirmar.`, () => { if (pendingImport) { commit(pendingImport, 'Backup importado.'); goal.value = state.settings.dailyGoal; } });
  } catch (error) { announce(error instanceof SyntaxError ? 'JSON inválido. Os dados atuais foram mantidos.' : error.message); }
  finally { importFile.value = ''; }
});
document.querySelector('#eisenhower-clear').addEventListener('click', () => ask('Limpar todas as tarefas, configurações e conquistas da Matriz de Eisenhower neste navegador? Esta ação não pode ser desfeita. Exporte um backup antes de continuar.', () => { state = store.clear(); goal.value = state.settings.dailyGoal; refresh(); announce(store.message || 'Dados da matriz removidos.'); }));
document.querySelector('#eisenhower-print').addEventListener('click', () => window.print());
// A outra aba pode ter mudanças não refletidas no editor; impedir sobrescrita silenciosa.
window.addEventListener('storage', event => { if (event.key === null || KEYS.includes(event.key)) { store.sessionOnly = true; store.message = 'Os dados mudaram em outra aba. Esta aba está em modo temporário para evitar sobrescrita. Exporte alterações não salvas e recarregue para ler a versão local.'; refresh(); } });
function dayCheck() { if (lastDay !== localDay()) { lastDay = localDay(); refresh(); } }
document.addEventListener('visibilitychange', dayCheck); window.addEventListener('focus', dayCheck); setInterval(dayCheck, 30000);
refresh(); app.removeAttribute('inert'); document.querySelector('#eisenhower-loading').hidden = true;
