(function (global) {
  'use strict';

  const KEYS = Object.freeze({
    activities: 'tempo10x.activities',
    timeEntries: 'tempo10x.timeEntries',
    settings: 'tempo10x.settings',
    activeTimer: 'tempo10x.activeTimer',
    schemaVersion: 'tempo10x.schemaVersion'
  });
  const SCHEMA_VERSION = 2;

  function parse(key, fallback) {
    try {
      const value = global.localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      global.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_) {
      return false;
    }
  }

  function entryId(activityId) {
    return `legacy-${String(activityId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 80)}`;
  }

  function legacyEntries(activities) {
    return activities.filter(activity => Number(activity.trackedMs) > 0).map(activity => ({
      id: entryId(activity.id),
      activityId: String(activity.id),
      date: activity.date || String(activity.updatedAt || activity.createdAt || '').slice(0, 10),
      startedAt: null,
      endedAt: null,
      durationMs: Math.max(0, Math.round(Number(activity.trackedMs) || 0)),
      source: 'legacy',
      createdAt: activity.updatedAt || activity.createdAt || new Date().toISOString()
    }));
  }

  function ensureVersion() {
    const current = Number(global.localStorage.getItem(KEYS.schemaVersion)) || 1;
    if (current >= SCHEMA_VERSION) return;
    const activities = parse(KEYS.activities, []);
    const entries = parse(KEYS.timeEntries, []);
    if ((!Array.isArray(entries) || !entries.length) && Array.isArray(activities)) {
      if (!write(KEYS.timeEntries, legacyEntries(activities))) throw new Error('Não foi possível migrar o histórico de tempo neste navegador.');
    }
    global.localStorage.setItem(KEYS.schemaVersion, String(SCHEMA_VERSION));
  }

  function getActivities() {
    ensureVersion();
    const activities = parse(KEYS.activities, []);
    return Array.isArray(activities) ? activities : [];
  }

  function setActivities(activities) {
    if (!Array.isArray(activities)) throw new TypeError('A lista de atividades deve ser um array.');
    ensureVersion();
    if (!write(KEYS.activities, activities)) throw new Error('Não foi possível salvar os dados neste navegador.');
  }

  function getTimeEntries() {
    ensureVersion();
    const entries = parse(KEYS.timeEntries, []);
    return Array.isArray(entries) ? entries : [];
  }

  function setTimeEntries(entries) {
    if (!Array.isArray(entries)) throw new TypeError('A lista de sessões deve ser um array.');
    ensureVersion();
    if (!write(KEYS.timeEntries, entries)) throw new Error('Não foi possível salvar o histórico de tempo.');
  }

  function getSettings() {
    const settings = parse(KEYS.settings, {});
    return settings && typeof settings === 'object' && !Array.isArray(settings) ? settings : {};
  }

  function setSettings(settings) {
    if (!settings || typeof settings !== 'object' || Array.isArray(settings)) throw new TypeError('Configurações inválidas.');
    if (!write(KEYS.settings, settings)) throw new Error('Não foi possível salvar as configurações.');
  }

  function getActiveTimer() {
    const timer = parse(KEYS.activeTimer, null);
    return timer && typeof timer === 'object' && !Array.isArray(timer) ? timer : null;
  }

  function setActiveTimer(timer) {
    if (timer === null) {
      global.localStorage.removeItem(KEYS.activeTimer);
      return;
    }
    if (!timer || typeof timer !== 'object' || Array.isArray(timer)) throw new TypeError('Cronômetro inválido.');
    if (!write(KEYS.activeTimer, timer)) throw new Error('Não foi possível salvar o cronômetro.');
  }

  function createBackup() {
    return {
      app: 'Tempo 10X', schemaVersion: SCHEMA_VERSION, exportedAt: new Date().toISOString(),
      activities: getActivities(), timeEntries: getTimeEntries(), settings: getSettings(), activeTimer: getActiveTimer()
    };
  }

  function validateTimer(timer, ids) {
    if (timer === null || timer === undefined) return null;
    if (!timer || typeof timer !== 'object' || !ids.has(String(timer.activityId))) throw new Error('O cronômetro do backup é inválido.');
    if (!['running', 'paused'].includes(timer.state) || !Number.isFinite(Number(timer.accumulatedMs))) throw new Error('O estado do cronômetro é inválido.');
    if (timer.state === 'running' && !Number.isFinite(Number(timer.startedAt))) throw new Error('O timestamp do cronômetro é inválido.');
    return timer;
  }

  function validateBackup(data, validateActivity, validateEntry) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('O arquivo não contém um backup válido.');
    const version = Number(data.schemaVersion);
    if (![1, SCHEMA_VERSION].includes(version)) throw new Error('A versão deste backup não é compatível.');
    if (!Array.isArray(data.activities)) throw new Error('A lista de atividades do backup é inválida.');
    const activities = data.activities.map(activity => validateActivity(activity, true));
    const ids = new Set();
    activities.forEach(activity => {
      if (ids.has(activity.id)) throw new Error('O backup contém IDs de atividades duplicados.');
      ids.add(activity.id);
    });
    const rawEntries = version === 1 ? legacyEntries(activities) : data.timeEntries;
    if (!Array.isArray(rawEntries)) throw new Error('O histórico de sessões do backup é inválido.');
    const entries = rawEntries.map(entry => validateEntry(entry, ids, true));
    const entryIds = new Set();
    entries.forEach(entry => {
      if (entryIds.has(entry.id)) throw new Error('O backup contém IDs de sessões duplicados.');
      entryIds.add(entry.id);
    });
    const settings = data.settings && typeof data.settings === 'object' && !Array.isArray(data.settings) ? data.settings : {};
    return { activities, timeEntries: entries, settings, activeTimer: validateTimer(data.activeTimer, ids) };
  }

  function restoreBackup(data, validateActivity, validateEntry) {
    const clean = validateBackup(data, validateActivity, validateEntry);
    setActivities(clean.activities);
    setTimeEntries(clean.timeEntries);
    setSettings(clean.settings);
    setActiveTimer(clean.activeTimer);
    return clean;
  }

  function clearAll() {
    Object.values(KEYS).forEach(key => global.localStorage.removeItem(key));
    global.localStorage.setItem(KEYS.schemaVersion, String(SCHEMA_VERSION));
  }

  ensureVersion();
  global.Tempo10X = global.Tempo10X || {};
  global.Tempo10X.Storage = Object.freeze({ KEYS, SCHEMA_VERSION, getActivities, setActivities, getTimeEntries, setTimeEntries, getSettings, setSettings, getActiveTimer, setActiveTimer, createBackup, validateBackup, restoreBackup, clearAll });
})(window);
