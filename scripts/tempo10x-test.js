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

const manual = activities.create({ title: 'Reuniao manual', category: 'Familia', date: '2026-08-28', startTime: '09:00', endTime: '12:00', priority: 'alta', status: 'concluída', plannedMinutes: 120 });
let manualTracked = entries.syncManual(manual);
activities.update(manual.id, { trackedMs: manualTracked });
assert.equal(manualTracked, 3 * 60 * 60000, 'intervalo manual calcula o total realizado');
assert.equal(entries.all().filter(entry => entry.activityId === manual.id).length, 1, 'intervalo manual cria uma unica sessao');
assert.equal(entries.all().find(entry => entry.activityId === manual.id).source, 'manual', 'sessao identifica origem manual');
const changedManual = activities.update(manual.id, { endTime: '12:30' });
manualTracked = entries.syncManual(changedManual);
activities.update(manual.id, { trackedMs: manualTracked });
assert.equal(manualTracked, 210 * 60000, 'edicao manual recalcula o total');
assert.equal(entries.all().filter(entry => entry.activityId === manual.id).length, 1, 'edicao manual nao duplica sessao');
const manualReport = reports.buildReport(activities.all(), entries.all(), { category: 'Familia', dateFrom: '2026-08-01', dateTo: '2026-08-31' });
assert.equal(reports.summarize(manualReport).trackedMs, 210 * 60000, 'tempo manual atualiza KPIs e relatorios');
assert.equal(reports.detailedEntries(manualReport)[0].source, 'manual', 'relatorio detalha a origem manual');

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
assert.equal(entries.all().length, 2, 'sessoes manual e automatica criadas');
const timerEntry = entries.all().find(entry => entry.activityId === created.id && entry.source === 'timer');
assert.equal(timerEntry.durationMs, 45_000, 'duração da sessão');
assert.equal(entries.all().filter(entry => entry.activityId === created.id && entry.source === 'manual').length, 0, 'cronometro prevalece sobre intervalo manual');

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
assert.equal(activities.all().length, 3, 'backup restaura atividades');
assert.equal(entries.all().length, 2, 'backup restaura sessões');
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
const toolPage = fs.readFileSync(path.join(root, 'ferramentas/gestao-do-tempo/index.html'), 'utf8');
assert.equal((toolPage.match(/tempo10x\/[a-z]+\.js\?v=20260831-2/g) || []).length, 7, 'modulos usam cache-buster consistente');
assert.equal(/\.innerHTML\s*=/.test(uiSource), false, 'dados do usuário não usam innerHTML');

console.log('TEMPO 10X V2 TEST: aprovado — migração, sessões, timer, períodos, KPIs, gráficos, CSV e backup validados.');
