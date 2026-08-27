const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function environment() {
  const values = new Map();
  const localStorage = {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
    clear: () => values.clear()
  };
  const window = { localStorage, crypto: { randomUUID: (() => { let id = 0; return () => `activity-${++id}`; })() }, Tempo10X: {} };
  window.window = window;
  const context = vm.createContext({ window, console, Date, Math, Intl, FormData: class {} });
  for (const file of ['storage.js', 'activities.js', 'timer.js', 'reports.js', 'ui.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/tempo10x', file), 'utf8'), context, { filename: file });
  }
  return window;
}

const window = environment();
const storage = window.Tempo10X.Storage;
const service = new window.Tempo10X.Activities.ActivityService(storage);

const created = service.create({
  title: 'Preparar relatório', description: 'Reunir dados', category: 'Trabalho', priority: 'alta',
  date: '2026-08-26', startTime: '09:00', endTime: '10:00', plannedMinutes: 60, status: 'pendente', notes: 'Revisar antes de enviar'
});
assert.equal(service.all().length, 1, 'CREATE/READ');
assert.equal(service.find(created.id).title, 'Preparar relatório', 'persistência imediata');

const updated = service.update(created.id, { title: 'Preparar relatório final', status: 'em andamento' });
assert.equal(updated.status, 'em andamento', 'UPDATE');
assert.equal(new window.Tempo10X.Activities.ActivityService(storage).find(created.id).title, 'Preparar relatório final', 'reload/persistência');
assert.throws(() => service.create({ title: 'Data inválida', date: '2026-99-99' }), /data/, 'validação de data');

const second = service.create({ title: 'Estudar 5S', category: 'Estudo', priority: 'média', status: 'pendente' });
const ui = Object.create(window.Tempo10X.UI.AppUI.prototype);
ui.activities = service;
ui.search = { value: 'relatório' };
ui.statusFilter = { value: '' };
ui.priorityFilter = { value: 'alta' };
ui.categoryFilter = { value: '' };
ui.dateFromFilter = { value: '' };
ui.dateToFilter = { value: '' };
ui.reports = window.Tempo10X.Reports;
assert.deepEqual(Array.from(ui.filteredActivities(), item => item.id), [created.id], 'busca e filtros');

const reports = window.Tempo10X.Reports;
const periodResult = reports.filterActivities(service.all(), { category: 'Trabalho', dateFrom: '2026-08-01', dateTo: '2026-08-31' });
assert.deepEqual(Array.from(periodResult, item => item.id), [created.id], 'filtros de categoria e período');
const initialSummary = reports.summarize(periodResult);
assert.equal(initialSummary.plannedMs, 60 * 60000, 'tempo planejado no relatório');
assert.equal(initialSummary.trackedMs, 0, 'tempo registrado inicial');

let now = 1_000_000;
const timer = new window.Tempo10X.Timer.TimerService(storage, service, () => now);
timer.start(created.id);
now += 30_000;
assert.equal(timer.elapsed(), 30_000, 'cronômetro por timestamp');
timer.pause();
now += 20_000;
assert.equal(timer.elapsed(), 30_000, 'pausa');
timer.resume();
now += 15_000;
assert.equal(timer.finish(), 45_000, 'retomada/finalização');
assert.equal(service.find(created.id).trackedMs, 45_000, 'tempo consolidado');
assert.equal(service.find(created.id).status, 'concluída', 'conclusão');
const finalSummary = reports.summarize(service.all());
assert.equal(finalSummary.trackedMs, 45_000, 'tempo consolidado no relatório');
assert.equal(finalSummary.completed, 1, 'atividades concluídas no relatório');
assert.equal(reports.groupByCategory(service.all())[0].category, 'Trabalho', 'agrupamento por categoria');
const csv = reports.toCsv(service.all());
assert.ok(csv.includes('Preparar relatório final'), 'CSV contém atividade');
assert.ok(csv.startsWith('\uFEFFAtividade;'), 'CSV compatível com planilhas');

const backup = storage.createBackup();
service.remove(second.id);
assert.equal(service.all().length, 1, 'DELETE');
storage.restoreBackup(JSON.parse(JSON.stringify(backup)), window.Tempo10X.Activities.validateActivity);
assert.equal(service.all().length, 2, 'exportação/importação');

assert.throws(() => storage.restoreBackup({ schemaVersion: 99, activities: [] }, window.Tempo10X.Activities.validateActivity), /versão/, 'validação do backup');
storage.clearAll();
assert.equal(service.all().length, 0, 'limpeza');
window.localStorage.setItem(storage.KEYS.activities, '{corrompido');
assert.deepEqual(Array.from(service.all()), [], 'recuperação de armazenamento corrompido');

const uiSource = fs.readFileSync(path.join(root, 'assets/js/tempo10x/ui.js'), 'utf8');
assert.equal(/\.innerHTML\s*=/.test(uiSource), false, 'dados do usuário não usam innerHTML');

console.log('TEMPO 10X TEST: aprovado — CRUD, persistência, timer, filtros, relatórios, CSV, backup e recuperação validados.');
