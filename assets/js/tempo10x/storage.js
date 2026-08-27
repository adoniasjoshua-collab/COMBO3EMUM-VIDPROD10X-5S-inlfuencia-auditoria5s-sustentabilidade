(function (global) {
  'use strict';

  const KEYS = Object.freeze({
    activities: 'tempo10x.activities',
    settings: 'tempo10x.settings',
    activeTimer: 'tempo10x.activeTimer',
    schemaVersion: 'tempo10x.schemaVersion'
  });
  const SCHEMA_VERSION = 1;

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

  function ensureVersion() {
    const current = Number(global.localStorage.getItem(KEYS.schemaVersion));
    if (current !== SCHEMA_VERSION) global.localStorage.setItem(KEYS.schemaVersion, String(SCHEMA_VERSION));
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
      app: 'Tempo 10X',
      schemaVersion: SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      activities: getActivities(),
      settings: getSettings(),
      activeTimer: getActiveTimer()
    };
  }

  function validateBackup(data, validateActivity) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('O arquivo não contém um backup válido.');
    if (Number(data.schemaVersion) !== SCHEMA_VERSION) throw new Error('A versão deste backup não é compatível.');
    if (!Array.isArray(data.activities)) throw new Error('A lista de atividades do backup é inválida.');
    const activities = data.activities.map(activity => validateActivity(activity, true));
    const ids = new Set();
    activities.forEach(activity => {
      if (ids.has(activity.id)) throw new Error('O backup contém IDs de atividades duplicados.');
      ids.add(activity.id);
    });
    const settings = data.settings && typeof data.settings === 'object' && !Array.isArray(data.settings) ? data.settings : {};
    const timer = data.activeTimer;
    if (timer !== null && timer !== undefined) {
      if (!timer || typeof timer !== 'object' || !ids.has(String(timer.activityId))) throw new Error('O cronômetro do backup é inválido.');
      if (!['running', 'paused'].includes(timer.state) || !Number.isFinite(Number(timer.accumulatedMs))) throw new Error('O estado do cronômetro é inválido.');
      if (timer.state === 'running' && !Number.isFinite(Number(timer.startedAt))) throw new Error('O timestamp do cronômetro é inválido.');
    }
    return { activities, settings, activeTimer: timer || null };
  }

  function restoreBackup(data, validateActivity) {
    const clean = validateBackup(data, validateActivity);
    setActivities(clean.activities);
    setSettings(clean.settings);
    setActiveTimer(clean.activeTimer);
    return clean;
  }

  function clearAll() {
    Object.values(KEYS).forEach(key => global.localStorage.removeItem(key));
    ensureVersion();
  }

  ensureVersion();
  global.Tempo10X = global.Tempo10X || {};
  global.Tempo10X.Storage = Object.freeze({ KEYS, SCHEMA_VERSION, getActivities, setActivities, getSettings, setSettings, getActiveTimer, setActiveTimer, createBackup, validateBackup, restoreBackup, clearAll });
})(window);
