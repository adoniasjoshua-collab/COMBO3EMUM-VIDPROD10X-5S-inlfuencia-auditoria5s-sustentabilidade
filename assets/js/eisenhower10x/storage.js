import { validateTask, MAX_TASKS } from './tasks.js';
import { validateGame } from './gamification.js';
export const VERSION = 1;
export const KEYS = ['tasks', 'settings', 'gamification', 'schemaVersion'].map(key => `eisenhower10x.${key}`);
export const emptyState = () => ({ schemaVersion: VERSION, tasks: [], settings: { dailyGoal: 3 }, gamification: { created: [], completed: [] } });
export function validateState(value) {
  if (!value || value.schemaVersion !== VERSION) throw new Error('Versão de backup incompatível. Os dados atuais foram mantidos.');
  if (!Array.isArray(value.tasks) || value.tasks.length > MAX_TASKS) throw new Error('Lista de tarefas inválida ou acima de 1.000 itens.');
  const tasks = value.tasks.map(validateTask);
  if (new Set(tasks.map(task => task.id)).size !== tasks.length) throw new Error('O backup tem IDs duplicados.');
  const goal = value.settings?.dailyGoal;
  if (!Number.isInteger(goal) || goal < 1 || goal > 50) throw new Error('Meta diária inválida.');
  const gamification = validateGame(value.gamification);
  const created = new Set(gamification.created), completed = new Set(gamification.completed.map(item => item.id));
  if (tasks.some(task => !created.has(task.id) || (task.status === 'completed' && !completed.has(task.id)))) throw new Error('Tarefas e histórico de XP inconsistentes.');
  return { schemaVersion: VERSION, tasks, settings: { dailyGoal: goal }, gamification };
}
// Ponto único para migrações futuras. Versões desconhecidas nunca são sobrescritas.
export function migrate(state) { return validateState(state); }
export class Store {
  constructor(storage) { this.storage = storage; this.sessionOnly = false; this.message = ''; }
  load() {
    try {
      const raw = KEYS.map(key => this.storage.getItem(key));
      if (raw.every(value => value === null)) return emptyState();
      if (raw.some(value => value === null)) throw new Error('Armazenamento incompleto.');
      return migrate({ tasks: JSON.parse(raw[0]), settings: JSON.parse(raw[1]), gamification: JSON.parse(raw[2]), schemaVersion: JSON.parse(raw[3]) });
    } catch {
      this.sessionOnly = true;
      this.message = 'Não foi possível ler os dados locais. Os dados originais foram preservados. Esta sessão é temporária: exporte seu trabalho antes de sair.';
      return emptyState();
    }
  }
  save(value) {
    const state = validateState(value);
    if (this.sessionOnly) return state;
    let before;
    try {
      before = KEYS.map(key => this.storage.getItem(key));
      [state.tasks, state.settings, state.gamification, VERSION].forEach((item, index) => this.storage.setItem(KEYS[index], JSON.stringify(item)));
    } catch {
      if (before) { try { KEYS.forEach((key, index) => before[index] === null ? this.storage.removeItem(key) : this.storage.setItem(key, before[index])); } catch { /* Não apagar dados para liberar quota. */ } }
      this.sessionOnly = true;
      this.message = 'O navegador não conseguiu salvar. Continue nesta sessão e exporte um backup antes de sair; as alterações podem não persistir.';
    }
    return state;
  }
  clear() {
    try { KEYS.forEach(key => this.storage.removeItem(key)); this.sessionOnly = false; this.message = ''; }
    catch { this.sessionOnly = true; this.message = 'Não foi possível limpar o armazenamento do navegador. Apenas a sessão foi reiniciada.'; }
    return emptyState();
  }
}
