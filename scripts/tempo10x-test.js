const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function environment(seed = {}) {
  const values = new Map(Object.entries(seed));
  const localStorage = {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
    clear: () => values.clear()
  };
  const window = { localStorage, crypto: { randomUUID: (() => { let id = 0; return () => `record-${++id}`; })() }, Tempo10X: {} };
  window.window = window;
  const context = vm.createContext({ window, console, Date, Math, Intl, FormData: class {} });
  for (const file of ['storage.js', 'activities.js', 'entries.js', 'timer.js', 'reports.js', 'ui.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/tempo10x', file), 'utf8'), context, { filename: file });
  }
  return window;
}

const window = environment();
const storage = window.Tempo10X.Storage;
const activities = new window.Tempo10X.Activities.ActivityService(storage);
const entries = new window.Tempo10X.Entries.TimeEntryService(storage, activities);
const reports = window.Tempo10X.Reports;

assert.equal(storage.SCHEMA_VERSION, 2, 'schema v2');
const created = activities.create({
  title: 'Preparar relatório', description: 'Reunir dados', category: 'Trabalho', priority: 'alta',
  date: '2026-08-26', startTime: '09:00', endTime: '10:00', plannedMinutes: 60, status: 'pendente', notes: 'Revisar antes de enviar'
});
assert.equal(activities.all().length, 1, 'CREATE/READ');
assert.equal(activities.find(created.id).title, 'Preparar relatório', 'persistência imediata');
const updated = activities.update(created.id, { title: 'Preparar relatório final', status: 'em andamento' });
assert.equal(updated.status, 'em andamento', 'UPDATE');
assert.throws(() => activities.create({ title: 'Data inválida', date: '2026-99-99' }), /data/, 'validação de data');
const second = activities.create({ title: 'Estudar 5S', category: 'Estudo', date: '2026-08-27', priority: 'média', status: 'pendente', plannedMinutes: 30 });

let now = Date.parse('2026-08-26T12:00:00Z');
const timer = new window.Tempo10X.Timer.TimerService(storage, activities, entries, () => now);
timer.start(created.id);
now += 30_000;
assert.equal(timer.elapsed(), 30_000, 'cronômetro por timestamp');
timer.pause();
now += 20_000;
assert.equal(timer.elapsed(), 30_000, 'pausa não acumula tempo');
timer.resume();
now += 15_000;
assert.equal(timer.finish(), 45_000, 'retomada/finalização');
assert.equal(activities.find(created.id).trackedMs, 45_000, 'total compatível na atividade');
assert.equal(entries.all().length, 1, 'sessão individual criada');
assert.equal(entries.all()[0].durationMs, 45_000, 'duração da sessão');

const report = reports.buildReport(activities.all(), entries.all(), { category: 'Trabalho', dateFrom: '2026-08-01', dateTo: '2026-08-31' });
const summary = reports.summarize(report);
assert.equal(summary.plannedMs, 60 * 60000, 'tempo planejado');
assert.equal(summary.trackedMs, 45_000, 'tempo registrado pelas sessões');
assert.equal(summary.completed, 1, 'conclusão');
assert.equal(reports.groupByCategory(report)[0].category, 'Trabalho', 'agrupamento por categoria');
assert.equal(reports.dailyBreakdown(report)[0].trackedMs, 45_000, 'gráfico diário');
assert.equal(reports.weeklyBreakdown(report)[0].sessions, 1, 'consolidado semanal');
const lastSeven = reports.periodRange('last-7', '2026-08-27');
assert.equal(lastSeven.dateFrom, '2026-08-21', 'início do atalho de período');
assert.equal(lastSeven.dateTo, '2026-08-27', 'fim do atalho de período');
const csv = reports.toCsv(report);
assert.ok(csv.includes('Preparar relatório final'), 'CSV contém atividade');
assert.ok(csv.startsWith('\uFEFFData;'), 'CSV compatível com planilhas');

const backup = storage.createBackup();
entries.removeForActivity(second.id);
activities.remove(second.id);
storage.restoreBackup(JSON.parse(JSON.stringify(backup)), window.Tempo10X.Activities.validateActivity, window.Tempo10X.Entries.validateEntry);
assert.equal(activities.all().length, 2, 'backup restaura atividades');
assert.equal(entries.all().length, 1, 'backup restaura sessões');
assert.throws(() => storage.restoreBackup({ schemaVersion: 99, activities: [] }, window.Tempo10X.Activities.validateActivity, window.Tempo10X.Entries.validateEntry), /versão/, 'versão incompatível');

const legacyActivity = { ...created, id: 'legacy-activity', trackedMs: 120000 };
const migratedWindow = environment({
  'tempo10x.schemaVersion': '1',
  'tempo10x.activities': JSON.stringify([legacyActivity])
});
assert.equal(migratedWindow.Tempo10X.Storage.SCHEMA_VERSION, 2, 'migração atualiza schema');
assert.equal(migratedWindow.Tempo10X.Storage.getTimeEntries().length, 1, 'migração preserva total antigo');
assert.equal(migratedWindow.Tempo10X.Storage.getTimeEntries()[0].durationMs, 120000, 'migração mantém duração');

storage.clearAll();
assert.equal(activities.all().length, 0, 'limpeza');
assert.equal(entries.all().length, 0, 'limpeza das sessões');
window.localStorage.setItem(storage.KEYS.activities, '{corrompido');
assert.deepEqual(Array.from(activities.all()), [], 'recuperação de armazenamento corrompido');

const uiSource = fs.readFileSync(path.join(root, 'assets/js/tempo10x/ui.js'), 'utf8');
assert.equal(/\.innerHTML\s*=/.test(uiSource), false, 'dados do usuário não usam innerHTML');

console.log('TEMPO 10X V2 TEST: aprovado — migração, sessões, timer, períodos, KPIs, gráficos, CSV e backup validados.');
