import { QUADRANTS } from './tasks.js';
export function summary(tasks) {
  const counts = Object.fromEntries(Object.keys(QUADRANTS).map(key => [key, tasks.filter(task => task.quadrant === key).length]));
  const active = tasks.filter(task => task.status !== 'completed');
  const ratio = key => active.length ? active.filter(task => task.quadrant === key).length / active.length : 0;
  const insight = !active.length ? 'Sem tarefas em aberto. Cadastre uma próxima ação quando precisar.' : ratio('do') > .5 ? 'Mais da metade das tarefas em aberto está em Fazer agora. Avalie quais atividades importantes poderiam ser planejadas com antecedência.' : ratio('plan') > .5 ? 'Boa parte das tarefas em aberto está sendo planejada com antecedência. Reserve espaço na agenda para executá-las.' : 'Revise prazos, responsabilidades e próximos passos. O quadrante pode mudar conforme o contexto.';
  return { counts, insight, total: tasks.length, pending: tasks.filter(task => task.status === 'pending').length, in_progress: tasks.filter(task => task.status === 'in_progress').length, completed: tasks.filter(task => task.status === 'completed').length };
}
