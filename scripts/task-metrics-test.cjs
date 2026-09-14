const assert = require('node:assert/strict');
const { calculate, interval, shift } = require('../assets/js/task-metrics.js');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
process.env.TZ = 'America/Sao_Paulo';
const anchor = new Date(2026, 8, 14, 12);
const tasks = [
  { id: 'a', title: 'A', category: ' Trabalho ', status: 'pending', createdAt: new Date(2026, 8, 14, 0).toISOString() },
  { id: 'b', title: 'B', category: 'trabalho', status: 'completed', createdAt: new Date(2026, 8, 20, 23, 59).toISOString() },
  { id: 'c', title: 'C', category: '', status: 'paused', createdAt: new Date(2026, 8, 21, 0).toISOString() },
  { id: 'bad', createdAt: '', status: 'pending' }
];
let data = calculate([...tasks, tasks[0]], { anchor });
assert.equal(data.total, 2); assert.equal(data.done, 1); assert.equal(data.invalid, 1); assert.equal(data.groups.length, 1);
assert.equal(data.buckets.length, 7); assert.equal(data.start.getDay(), 1);
assert.equal(calculate(tasks, { anchor, status: 'open' }).total, 1);
assert.equal(calculate(tasks, { anchor, area: 'trabalho' }).total, 2);
for (const period of ['day', 'week', 'month', 'year']) {
  for (const mobile of [false, true]) {
    data = calculate(tasks, { anchor, period, mobile });
    assert.equal(data.buckets.reduce((n, bucket) => n + bucket.value, 0), data.total);
    assert.equal(data.groups.reduce((n, group) => n + group.value, 0), data.total);
  }
}
assert.equal(calculate([], { anchor }).total, 0);
assert.equal(calculate([{ id: 'invalid-day', createdAt: '2026-02-30T12:00:00Z' }], { anchor }).invalid, 1);
assert.equal(calculate(tasks, { anchor, period: 'day', mobile: true }).buckets.length, 6);
assert.equal(calculate([], { anchor: new Date(2024, 1, 10), period: 'month' }).buckets.length, 29);
assert.equal(shift(new Date(2026, 0, 31), 'month', 1).getMonth(), 1);
assert.equal(shift(new Date(2026, 11, 31), 'year', 1).getFullYear(), 2027);
assert.equal(calculate([], { anchor: new Date(2030, 0, 1), period: 'year', now: anchor }).buckets.every(b => b.future), true);
process.env.TZ = 'America/New_York';
const dst = interval(new Date(2026, 2, 8), 'day'); assert.equal((dst.end - dst.start) / 3600000, 23);
assert.equal(calculate([], { anchor: new Date(2026, 2, 8), period: 'day' }).buckets.length, 23);
// SEO metadata and editorial text must remain identical to the committed baseline.
for (const file of ['ferramentas/gestao-do-tempo/index.html', 'ferramentas/matriz-eisenhower/index.html']) {
  const before = execFileSync('git', ['show', `HEAD:${file}`], { encoding: 'utf8' });
  const after = fs.readFileSync(file, 'utf8');
  for (const regex of [/<title>[\s\S]*?<\/title>/g, /<meta\b[^>]*>/g, /<h1\b[^>]*>[\s\S]*?<\/h1>/g, /<link\b[^>]*rel="canonical"[^>]*>/g, /<script type="application\/ld\+json">[\s\S]*?<\/script>/g]) assert.deepEqual(after.match(regex), before.match(regex), file);
  const content = html => html.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  assert.equal(content(after), content(before), `${file}: texto editorial preservado`);
}
console.log('TASK METRICS: filtros, deduplicação, totais, calendário, horário de verão e preservação de SEO/editorial aprovados.');
