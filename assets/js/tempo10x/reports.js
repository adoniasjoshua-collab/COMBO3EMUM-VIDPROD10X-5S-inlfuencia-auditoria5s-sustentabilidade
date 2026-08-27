(function (global) {
  'use strict';

  function normalize(value) {
    return String(value || '').trim().toLocaleLowerCase('pt-BR');
  }

  function filterActivities(activities, filters) {
    const selected = filters || {};
    const query = normalize(selected.query);
    return activities.filter(activity => {
      const haystack = normalize(`${activity.title} ${activity.description} ${activity.category} ${activity.notes}`);
      if (query && !haystack.includes(query)) return false;
      if (selected.status && activity.status !== selected.status) return false;
      if (selected.priority && activity.priority !== selected.priority) return false;
      if (selected.category && activity.category !== selected.category) return false;
      if (selected.dateFrom && (!activity.date || activity.date < selected.dateFrom)) return false;
      if (selected.dateTo && (!activity.date || activity.date > selected.dateTo)) return false;
      return true;
    });
  }

  function summarize(activities) {
    const summary = activities.reduce((result, activity) => {
      result.plannedMs += Math.max(0, Number(activity.plannedMinutes) || 0) * 60000;
      result.trackedMs += Math.max(0, Number(activity.trackedMs) || 0);
      if (activity.status === 'concluída') result.completed += 1;
      return result;
    }, { count: activities.length, completed: 0, plannedMs: 0, trackedMs: 0 });
    summary.varianceMs = summary.trackedMs - summary.plannedMs;
    summary.completionRate = summary.count ? (summary.completed / summary.count) * 100 : 0;
    return summary;
  }

  function groupByCategory(activities) {
    const groups = new Map();
    activities.forEach(activity => {
      const category = activity.category || 'Sem categoria';
      const group = groups.get(category) || { category, count: 0, completed: 0, plannedMs: 0, trackedMs: 0 };
      group.count += 1;
      group.plannedMs += Math.max(0, Number(activity.plannedMinutes) || 0) * 60000;
      group.trackedMs += Math.max(0, Number(activity.trackedMs) || 0);
      if (activity.status === 'concluída') group.completed += 1;
      groups.set(category, group);
    });
    return Array.from(groups.values()).sort((a, b) => b.trackedMs - a.trackedMs || a.category.localeCompare(b.category, 'pt-BR'));
  }

  function csvCell(value) {
    const clean = String(value === undefined || value === null ? '' : value).replace(/\r?\n/g, ' ');
    return /[";,]/.test(clean) ? `"${clean.replace(/"/g, '""')}"` : clean;
  }

  function toCsv(activities) {
    const headings = ['Atividade', 'Categoria', 'Data', 'Prioridade', 'Status', 'Planejado (min)', 'Registrado (min)', 'Diferença (min)', 'Descrição', 'Observações'];
    const rows = activities.map(activity => {
      const planned = Math.max(0, Number(activity.plannedMinutes) || 0);
      const tracked = Math.round((Math.max(0, Number(activity.trackedMs) || 0) / 60000) * 100) / 100;
      return [activity.title, activity.category || 'Sem categoria', activity.date, activity.priority, activity.status, planned, tracked, Math.round((tracked - planned) * 100) / 100, activity.description, activity.notes];
    });
    return `\uFEFF${[headings, ...rows].map(row => row.map(csvCell).join(';')).join('\r\n')}`;
  }

  global.Tempo10X = global.Tempo10X || {};
  global.Tempo10X.Reports = Object.freeze({ filterActivities, summarize, groupByCategory, toCsv });
})(window);
