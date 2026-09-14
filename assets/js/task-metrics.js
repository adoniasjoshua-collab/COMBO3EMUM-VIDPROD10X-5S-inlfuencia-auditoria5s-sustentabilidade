/* Calendar-based, read-only metrics shared by the two independent tools. */
(function (root) {
  const day = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  function interval(anchor, period) {
    const start = day(anchor), end = day(anchor);
    if (period === 'week') start.setDate(start.getDate() - (start.getDay() + 6) % 7);
    if (period === 'month') start.setDate(1);
    if (period === 'year') { start.setMonth(0, 1); }
    end.setTime(start.getTime());
    if (period === 'year') end.setFullYear(end.getFullYear() + 1);
    else if (period === 'month') end.setMonth(end.getMonth() + 1);
    else end.setDate(end.getDate() + (period === 'week' ? 7 : 1));
    return { start, end };
  }
  function shift(anchor, period, direction) {
    const date = interval(anchor, period).start;
    if (period === 'year') date.setFullYear(date.getFullYear() + direction);
    else if (period === 'month') date.setMonth(date.getMonth() + direction);
    else date.setDate(date.getDate() + direction * (period === 'week' ? 7 : 1));
    return date;
  }
  const areaKey = value => (String(value || '').trim().replace(/\s+/g, ' ') || 'Sem área').toLocaleLowerCase('pt-BR');
  function calculate(tasks, options = {}) {
    const { period = 'week', anchor = new Date(), area = '', status = '', quadrant = '', mobile = false, now = new Date() } = options;
    const { start, end } = interval(anchor, period), seen = new Set(), areas = new Map();
    const rows = tasks.filter(task => { if (!task.id || seen.has(task.id)) return false; seen.add(task.id); return true; }).map(task => {
      const label = String(task.category || '').trim().replace(/\s+/g, ' ') || 'Sem área';
      const key = areaKey(label); if (!areas.has(key)) areas.set(key, label);
      const prefix = typeof task.createdAt === 'string' ? task.createdAt.slice(0, 10) : '';
      const calendarDay = /^\d{4}-\d{2}-\d{2}$/.test(prefix) ? new Date(`${prefix}T00:00:00Z`) : new Date(NaN);
      const validDay = Number.isFinite(calendarDay.getTime()) && calendarDay.toISOString().slice(0, 10) === prefix;
      const time = validDay && task.createdAt[10] === 'T' ? Date.parse(task.createdAt) : NaN;
      return { ...task, areaKey: key, areaLabel: areas.get(key), time, done: ['completed', 'concluída'].includes(task.status) };
    });
    const filtered = rows.filter(row => (!area || row.areaKey === area) && (!status || (status === 'done' ? row.done : !row.done)) && (!quadrant || row.quadrant === quadrant));
    const invalid = filtered.filter(row => !Number.isFinite(row.time)).length;
    const selected = filtered.filter(row => row.time >= start.getTime() && row.time < end.getTime());
    const buckets = [];
    let cursor = new Date(start);
    while (cursor < end) {
      const next = new Date(cursor);
      if (period === 'day') next.setHours(next.getHours() + (mobile ? 4 : 1));
      else if (period === 'year') next.setMonth(next.getMonth() + 1);
      else next.setDate(next.getDate() + 1);
      const stop = new Date(Math.min(next.getTime(), end.getTime()));
      const label = period === 'day' ? `${String(cursor.getHours()).padStart(2, '0')}h–${stop.getTime() === end.getTime() ? '24' : String(stop.getHours()).padStart(2, '0')}h` : period === 'year' ? cursor.toLocaleDateString('pt-BR', { month: 'short' }) : cursor.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      const tasks = selected.filter(row => row.time >= cursor.getTime() && row.time < stop.getTime());
      buckets.push({ label, tasks, value: tasks.length, future: cursor > now && tasks.length === 0 });
      cursor = stop;
    }
    const groups = [...new Set(selected.map(row => row.areaKey))].map(key => {
      const tasks = selected.filter(row => row.areaKey === key); return { label: areas.get(key), tasks, value: tasks.length };
    }).sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, 'pt-BR'));
    return { start, end, areas: [...areas].sort((a, b) => a[1].localeCompare(b[1], 'pt-BR')), selected, groups, buckets, invalid, total: selected.length, done: selected.filter(row => row.done).length };
  }
  const api = { interval, shift, calculate, areaKey };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TaskMetrics = api;
})(globalThis);
