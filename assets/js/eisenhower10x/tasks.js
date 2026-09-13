export const QUADRANTS = { do: 'Fazer agora', plan: 'Planejar', delegate: 'Delegar', eliminate: 'Eliminar' };
export const STATUSES = { pending: 'Pendente', in_progress: 'Em andamento', completed: 'Concluída' };
export const MAX_TASKS = 1000;
export const isDay = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
export const isTime = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));
export const isId = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value);
export function text(value, max, required = false) {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error('Texto ausente ou acima do limite permitido.');
  return value.trim();
}
export function validateTask(task) {
  if (!task || !isId(task.id) || !Object.hasOwn(QUADRANTS, task.quadrant) || !Object.hasOwn(STATUSES, task.status)) throw new Error('Tarefa ou classificação inválida.');
  if (!isTime(task.createdAt) || !isTime(task.updatedAt) || (task.dueDate !== '' && !isDay(task.dueDate)) || (task.status === 'completed' ? !isTime(task.completedAt) : task.completedAt !== null)) throw new Error('Data de tarefa inválida.');
  return { id: task.id, title: text(task.title, 160, true), description: text(task.description, 1200), quadrant: task.quadrant, status: task.status, category: text(task.category, 60), dueDate: task.dueDate, createdAt: task.createdAt, updatedAt: task.updatedAt, completedAt: task.completedAt };
}
export function saveTask(tasks, input, now = new Date().toISOString(), id = crypto.randomUUID()) {
  const previous = input.id ? tasks.find(task => task.id === input.id) : null;
  if (input.id && !previous) throw new Error('A tarefa não existe mais.');
  if (!previous && tasks.length >= MAX_TASKS) throw new Error('Limite de 1.000 tarefas. Exporte um backup e remova tarefas antigas.');
  const task = validateTask({ ...input, id: previous?.id || id, createdAt: previous?.createdAt || now, updatedAt: now, completedAt: input.status === 'completed' ? (previous?.completedAt || now) : null });
  return { task, tasks: previous ? tasks.map(item => item.id === task.id ? task : item) : [...tasks, task], created: !previous };
}
export function classify(important, urgent) { return important ? (urgent ? 'do' : 'plan') : (urgent ? 'delegate' : 'eliminate'); }
// A futura integração com Tempo 10X deve consumir uma cópia validada, sem compartilhar chaves de armazenamento.
export function integrationTask(task) { return validateTask(task); }
