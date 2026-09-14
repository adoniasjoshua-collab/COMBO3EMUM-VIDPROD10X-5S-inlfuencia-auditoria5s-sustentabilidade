import { QUADRANTS, STATUSES } from './tasks.js';
import { progress } from './gamification.js';
import { summary } from './charts.js';
function node(tag, content, className) { const el = document.createElement(tag); if (content !== undefined) el.textContent = content; if (className) el.className = className; return el; }
export function announce(message) { const el = document.querySelector('#eisenhower-feedback'); el.textContent = ''; requestAnimationFrame(() => { el.textContent = message; }); }
function action(label, actionName, task) { const el = node('button', label); el.type = 'button'; el.dataset.action = actionName; el.dataset.id = task.id; el.setAttribute('aria-label', `${label}: ${task.title}`); el.dataset.focus = `${task.id}-${actionName}`; return el; }
function card(task) {
  const item = node('article', undefined, 'eisenhower-card'); item.dataset.taskId = task.id;
  item.classList.add('compact-task');
  const quick = action(task.status === 'completed' ? 'Reabrir' : 'Concluir', 'toggle', task);
  quick.classList.add('compact-quick'); quick.textContent = task.status === 'completed' ? '✓' : '○';
  item.append(quick);
  const disclosure = node('details', undefined, 'task-disclosure'); disclosure.dataset.disclosure = task.id;
  const top = node('summary', undefined, 'compact-title'); top.dataset.focus = `${task.id}-summary`;
  const title = node('h4', task.title); title.id = `task-${task.id}`; item.setAttribute('aria-labelledby', title.id);
  const handle = node('button', '⠿'); handle.type = 'button'; handle.draggable = true; handle.dataset.drag = task.id; handle.dataset.focus = `${task.id}-drag`; handle.className = 'eisenhower-drag'; handle.setAttribute('aria-label', `Arrastar ${task.title}; alternativa no campo Mover para`);
  top.append(title); disclosure.append(top); item.append(disclosure);
  const body = node('div', undefined, 'compact-body'); disclosure.append(body);
  body.append(node('p', STATUSES[task.status], `eisenhower-status eisenhower-status--${task.status}`));
  if (task.description) body.append(node('p', task.description, 'eisenhower-description'));
  if (task.category || task.dueDate) { const date = task.dueDate ? task.dueDate.split('-').reverse().join('/') : ''; body.append(node('p', [task.category, date && `Prazo: ${date}`].filter(Boolean).join(' · '), 'eisenhower-meta')); }
  const label = node('label', 'Mover para'); const select = node('select'); select.dataset.move = task.id; select.dataset.focus = `${task.id}-move`; select.setAttribute('aria-label', `Mover para: ${task.title}`);
  for (const [value, name] of Object.entries(QUADRANTS)) { const option = node('option', name); option.value = value; option.selected = task.quadrant === value; select.append(option); }
  label.append(select); body.append(label);
  const actions = node('div', undefined, 'eisenhower-actions'); actions.append(handle, action('Editar', 'edit', task), action('Excluir', 'delete', task)); body.append(actions);
  return item;
}
export function render(state, store) {
  const app = document.querySelector('.eisenhower-app');
  app.taskAnalyticsData = state.tasks;
  app.dispatchEvent(new CustomEvent('tasks:updated', { detail: state.tasks }));
  const active = document.activeElement?.dataset.focus;
  const open = new Set([...document.querySelectorAll('[data-disclosure][open]')].map(el => el.dataset.disclosure));
  for (const key of Object.keys(QUADRANTS)) {
    const list = document.querySelector(`#eisenhower-list-${key}`), tasks = state.tasks.filter(task => task.quadrant === key);
    const pending = tasks.filter(task => task.status !== 'completed'), completed = tasks.filter(task => task.status === 'completed');
    const children = pending.map(card);
    if (completed.length) {
      const group = node('details', undefined, 'completed-group'); group.dataset.disclosure = `completed-${key}`;
      const heading = node('summary', `Concluídas (${completed.length})`); heading.dataset.focus = `completed-${key}`;
      group.append(heading, ...completed.map(card)); children.push(group);
    }
    list.replaceChildren(...(children.length ? children : [node('p', 'Nenhuma tarefa neste quadrante.', 'eisenhower-empty')]));
    document.querySelector(`#eisenhower-count-${key}`).textContent = tasks.length;
  }
  const data = summary(state.tasks);
  for (const key of ['total', 'pending', 'in_progress', 'completed']) document.querySelector(`[data-stat="${key}"]`).textContent = data[key];
  for (const key of Object.keys(QUADRANTS)) { document.querySelector(`[data-bar="${key}"]`).style.width = `${data.total ? data.counts[key] / data.total * 100 : 0}%`; document.querySelector(`[data-bar-count="${key}"]`).textContent = `${data.counts[key]} ${data.counts[key] === 1 ? 'tarefa' : 'tarefas'}`; }
  document.querySelector('#eisenhower-insight').textContent = data.insight;
  const game = progress(state.gamification);
  document.querySelector('#eisenhower-level').textContent = game.level;
  document.querySelector('#eisenhower-xp').textContent = `${game.xp} XP`;
  document.querySelector('#eisenhower-level-progress').value = game.percent;
  document.querySelector('#eisenhower-next-level').textContent = game.next ? `${game.next - game.xp} XP para o próximo nível` : 'Último nível alcançado. Continue no seu ritmo.';
  document.querySelector('#eisenhower-today').textContent = `${game.today} / ${state.settings.dailyGoal}`;
  document.querySelector('#eisenhower-daily-progress').value = Math.min(game.today / state.settings.dailyGoal * 100, 100);
  document.querySelector('#eisenhower-streak').textContent = `${game.streak} ${game.streak === 1 ? 'dia' : 'dias'}`;
  document.querySelector('#eisenhower-lifetime').textContent = state.gamification.completed.length;
  document.querySelector('#eisenhower-achievements').replaceChildren(...game.achievements.map(([title, unlocked]) => node('li', `${unlocked ? '✓' : '○'} ${title}${unlocked ? ' — conquistada' : ' — a alcançar'}`, unlocked ? 'is-unlocked' : '')));
  const warning = document.querySelector('#eisenhower-storage-warning'); warning.hidden = !store.message; warning.textContent = store.message;
  document.querySelectorAll('[data-disclosure]').forEach(el => { el.open = open.has(el.dataset.disclosure); });
  if (active) {
    const target = document.querySelector(`[data-focus="${CSS.escape(active)}"]`);
    const group = target?.closest('.completed-group:not([open])');
    (group?.querySelector('summary') || target)?.focus();
  }
}
