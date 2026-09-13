import { isDay, isId } from './tasks.js';
export const LEVELS = [{ name: 'Iniciante', xp: 0 }, { name: 'Organizador', xp: 30 }, { name: 'Estrategista', xp: 100 }, { name: 'Mestre das Prioridades', xp: 250 }];
export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function previousDay(day) { const date = new Date(`${day}T12:00:00`); date.setDate(date.getDate() - 1); return localDay(date); }
export function validateGame(game) {
  if (!game || !Array.isArray(game.created) || !Array.isArray(game.completed) || game.created.length > 10000 || game.completed.length > 10000 || !game.created.every(isId) || new Set(game.created).size !== game.created.length) throw new Error('Histórico de XP inválido.');
  const created = new Set(game.created);
  if (new Set(game.completed.map(item => item?.id)).size !== game.completed.length || !game.completed.every(item => item && created.has(item.id) && isDay(item.day) && [5, 6].includes(item.xp))) throw new Error('Histórico de conclusões inválido.');
  return { created: [...game.created], completed: game.completed.map(({ id, day, xp }) => ({ id, day, xp })) };
}
export function reward(game, task, day = localDay()) {
  const next = validateGame(game);
  if (!next.created.includes(task.id)) next.created.push(task.id);
  if (task.status === 'completed' && !next.completed.some(item => item.id === task.id)) next.completed.push({ id: task.id, day, xp: task.quadrant === 'plan' ? 6 : 5 });
  return validateGame(next);
}
export function progress(game, day = localDay()) {
  const xp = game.created.length + game.completed.reduce((sum, item) => sum + item.xp, 0);
  const days = new Set(game.completed.map(item => item.day));
  let cursor = days.has(day) ? day : previousDay(day), streak = 0, best = 0;
  while (days.has(cursor)) { streak++; cursor = previousDay(cursor); }
  let run = 0, last = null;
  for (const value of [...days].sort()) { run = last === previousDay(value) ? run + 1 : 1; best = Math.max(best, run); last = value; }
  const index = LEVELS.findLastIndex(level => xp >= level.xp), level = LEVELS[index], next = LEVELS[index + 1];
  return { xp, level: level.name, percent: next ? Math.round((xp - level.xp) / (next.xp - level.xp) * 100) : 100, next: next?.xp, today: game.completed.filter(item => item.day === day).length, streak, achievements: [ ['Primeira tarefa', game.created.length > 0], ['5 tarefas concluídas', game.completed.length >= 5], ['10 tarefas concluídas', game.completed.length >= 10], ['3 dias de sequência', best >= 3], ['Planejador', game.completed.some(item => item.xp === 6)] ] };
}
