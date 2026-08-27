(function (global) {
  'use strict';

  function normalize(value) {
    return String(value || '').trim().toLocaleLowerCase('pt-BR');
  }

  function isoLocal(date) {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  }

  function addDays(date, amount) {
    const result = new Date(`${date}T12:00:00`);
    result.setDate(result.getDate() + amount);
    return isoLocal(result);
  }

  function startOfWeek(date) {
    const value = new Date(`${date}T12:00:00`);
    const offset = (value.getDay() + 6) % 7;
    value.setDate(value.getDate() - offset);
    return isoLocal(value);
  }

  function periodRange(period, todayValue) {
    const today = todayValue || isoLocal(new Date());
    const current = new Date(`${today}T12:00:00`);
    if (period === 'today') return { dateFrom: today, dateTo: today };
    if (period === 'yesterday') { const yesterday = addDays(today, -1); return { dateFrom: yesterday, dateTo: yesterday }; }
    if (period === 'this-week') return { dateFrom: startOfWeek(today), dateTo: today };
    if (period === 'last-week') { const end = addDays(startOfWeek(today), -1); return { dateFrom: addDays(end, -6), dateTo: end }; }
    if (period === 'last-7') return { dateFrom: addDays(today, -6), dateTo: today };
    if (period === 'last-30') return { dateFrom: addDays(today, -29), dateTo: today };
    if (period === 'this-month') return { dateFrom: `${today.slice(0, 7)}-01`, dateTo: today };
    if (period === 'last-month') {
      const first = new Date(current.getFullYear(), current.getMonth() - 1, 1);
      const last = new Date(current.getFullYear(), current.getMonth(), 0);
      return { dateFrom: isoLocal(first), dateTo: isoLocal(last) };
    }
    return { dateFrom: '', dateTo: '' };
  }

  function matchesActivity(activity, selected) {
    const query = normalize(selected.query);
    const haystack = normalize(`${activity.title} ${activity.description} ${activity.category} ${activity.notes}`);
    if (query && !haystack.includes(query)) return false;
    if (selected.status && activity.status !== selected.status) return false;
    if (selected.priority && activity.priority !== selected.priority) return false;
    if (selected.category && activity.category !== selected.category) return false;
    return true;
  }

  function inPeriod(date, selected) {
    if (selected.dateFrom && (!date || date < selected.dateFrom)) return false;
    if (selected.dateTo && (!date || date > selected.dateTo)) return false;
    return true;
  }

  function buildReport(activities, entries, filters) {
    const selected = filters || {};
    const matching = activities.filter(activity => matchesActivity(activity, selected));
    const matchingIds = new Set(matching.map(activity => activity.id));
    const filteredEntries = entries.filter(entry => matchingIds.has(entry.activityId) && inPeriod(entry.date, selected));
    const entryActivityIds = new Set(filteredEntries.map(entry => entry.activityId));
    const scheduledActivities = matching.filter(activity => inPeriod(activity.date, selected));
    const filteredActivities = matching.filter(activity => inPeriod(activity.date, selected) || entryActivityIds.has(activity.id));
    const activityMap = new Map(activities.map(activity => [activity.id, activity]));
    return { activities: filteredActivities, scheduledActivities, entries: filteredEntries, activityMap, filters: selected };
  }

  function summarize(report) {
    const plannedMs = report.scheduledActivities.reduce((sum, activity) => sum + Math.max(0, Number(activity.plannedMinutes) || 0) * 60000, 0);
    const trackedMs = report.entries.reduce((sum, entry) => sum + Math.max(0, Number(entry.durationMs) || 0), 0);
    const completed = report.activities.filter(activity => activity.status === 'concluída').length;
    const activeDays = new Set(report.entries.map(entry => entry.date)).size;
    return {
      count: report.activities.length, completed, plannedMs, trackedMs,
      varianceMs: trackedMs - plannedMs,
      completionRate: report.activities.length ? (completed / report.activities.length) * 100 : 0,
      averageDailyMs: activeDays ? trackedMs / activeDays : 0,
      activeDays
    };
  }

  function groupByCategory(report) {
    const groups = new Map();
    report.activities.forEach(activity => {
      const category = activity.category || 'Sem categoria';
      const group = groups.get(category) || { category, count: 0, completed: 0, plannedMs: 0, trackedMs: 0 };
      group.count += 1;
      if (activity.status === 'concluída') group.completed += 1;
      groups.set(category, group);
    });
    report.scheduledActivities.forEach(activity => {
      const category = activity.category || 'Sem categoria';
      const group = groups.get(category) || { category, count: 0, completed: 0, plannedMs: 0, trackedMs: 0 };
      group.plannedMs += Math.max(0, Number(activity.plannedMinutes) || 0) * 60000;
      groups.set(category, group);
    });
    report.entries.forEach(entry => {
      const activity = report.activityMap.get(entry.activityId);
      const category = activity && activity.category ? activity.category : 'Sem categoria';
      const group = groups.get(category) || { category, count: 0, completed: 0, plannedMs: 0, trackedMs: 0 };
      group.trackedMs += Math.max(0, Number(entry.durationMs) || 0);
      groups.set(category, group);
    });
    return Array.from(groups.values()).sort((a, b) => b.trackedMs - a.trackedMs || a.category.localeCompare(b.category, 'pt-BR'));
  }

  function dailyBreakdown(report) {
    const days = new Map();
    function day(date) {
      const current = days.get(date) || { date, plannedMs: 0, trackedMs: 0, sessions: 0 };
      days.set(date, current);
      return current;
    }
    report.scheduledActivities.forEach(activity => { if (activity.date) day(activity.date).plannedMs += Math.max(0, Number(activity.plannedMinutes) || 0) * 60000; });
    report.entries.forEach(entry => { const current = day(entry.date); current.trackedMs += Math.max(0, Number(entry.durationMs) || 0); current.sessions += 1; });
    return Array.from(days.values()).sort((a, b) => a.date.localeCompare(b.date)).slice(-14);
  }

  function statusBreakdown(report) {
    const statuses = ['pendente', 'em andamento', 'pausada', 'concluída'];
    return statuses.map(status => ({ status, count: report.activities.filter(activity => activity.status === status).length }));
  }

  function weeklyBreakdown(report) {
    const weeks = new Map();
    function week(date) {
      const start = startOfWeek(date);
      const current = weeks.get(start) || { weekStart: start, plannedMs: 0, trackedMs: 0, sessions: 0 };
      weeks.set(start, current);
      return current;
    }
    report.scheduledActivities.forEach(activity => { if (activity.date) week(activity.date).plannedMs += Math.max(0, Number(activity.plannedMinutes) || 0) * 60000; });
    report.entries.forEach(entry => { const current = week(entry.date); current.trackedMs += Math.max(0, Number(entry.durationMs) || 0); current.sessions += 1; });
    return Array.from(weeks.values()).sort((a, b) => b.weekStart.localeCompare(a.weekStart));
  }

  function detailedEntries(report) {
    return report.entries.map(entry => ({ ...entry, activity: report.activityMap.get(entry.activityId) || null })).sort((a, b) => `${b.date}${b.startedAt || ''}`.localeCompare(`${a.date}${a.startedAt || ''}`));
  }

  function csvCell(value) {
    const clean = String(value === undefined || value === null ? '' : value).replace(/\r?\n/g, ' ');
    return /[";,]/.test(clean) ? `"${clean.replace(/"/g, '""')}"` : clean;
  }

  function toCsv(report) {
    const headings = ['Data', 'Atividade', 'Categoria', 'Prioridade', 'Status', 'Início', 'Término', 'Duração (min)', 'Origem'];
    const rows = detailedEntries(report).map(entry => {
      const activity = entry.activity || {};
      return [entry.date, activity.title || 'Atividade removida', activity.category || 'Sem categoria', activity.priority || '', activity.status || '', entry.startedAt || '', entry.endedAt || '', Math.round((entry.durationMs / 60000) * 100) / 100, entry.source];
    });
    return `\uFEFF${[headings, ...rows].map(row => row.map(csvCell).join(';')).join('\r\n')}`;
  }

  global.Tempo10X = global.Tempo10X || {};
  global.Tempo10X.Reports = Object.freeze({ periodRange, buildReport, summarize, groupByCategory, dailyBreakdown, statusBreakdown, weeklyBreakdown, detailedEntries, toCsv });
})(window);
