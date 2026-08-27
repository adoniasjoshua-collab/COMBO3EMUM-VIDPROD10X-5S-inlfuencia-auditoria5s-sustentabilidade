(function (global) {
  'use strict';

  const SOURCES = ['timer', 'manual', 'legacy'];

  function createId() {
    if (global.crypto && typeof global.crypto.randomUUID === 'function') return global.crypto.randomUUID();
    return `entry-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function localDate(timestamp) {
    const date = new Date(Number(timestamp));
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  }

  function validDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return false;
    const date = new Date(`${value}T12:00:00`);
    return !Number.isNaN(date.getTime());
  }

  function validateEntry(input, activityIds, preserveId) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Sessão de tempo inválida.');
    const activityId = String(input.activityId || '');
    if (!activityIds.has(activityId)) throw new Error('A sessão referencia uma atividade inexistente.');
    const durationMs = Math.max(0, Math.round(Number(input.durationMs) || 0));
    if (!durationMs) throw new Error('A sessão deve possuir duração maior que zero.');
    const startedAt = input.startedAt === null || input.startedAt === undefined ? null : String(input.startedAt);
    const endedAt = input.endedAt === null || input.endedAt === undefined ? null : String(input.endedAt);
    if (startedAt && Number.isNaN(Date.parse(startedAt))) throw new Error('O início da sessão é inválido.');
    if (endedAt && Number.isNaN(Date.parse(endedAt))) throw new Error('O término da sessão é inválido.');
    const date = String(input.date || (startedAt ? startedAt.slice(0, 10) : ''));
    if (!validDate(date)) throw new Error('A data da sessão é inválida.');
    const id = preserveId && /^[a-zA-Z0-9_-]{6,100}$/.test(String(input.id || '')) ? String(input.id) : createId();
    return {
      id, activityId, date, startedAt, endedAt, durationMs,
      source: SOURCES.includes(input.source) ? input.source : 'timer',
      createdAt: !Number.isNaN(Date.parse(input.createdAt)) ? input.createdAt : new Date().toISOString()
    };
  }

  class TimeEntryService {
    constructor(storage, activities) {
      this.storage = storage;
      this.activities = activities;
    }

    activityIds() {
      return new Set(this.activities.all().map(activity => activity.id));
    }

    all() {
      const ids = this.activityIds();
      return this.storage.getTimeEntries().filter(entry => ids.has(String(entry.activityId))).map(entry => validateEntry(entry, ids, true));
    }

    create(input) {
      const entries = this.all();
      const entry = validateEntry(input, this.activityIds(), false);
      entries.push(entry);
      this.storage.setTimeEntries(entries);
      return entry;
    }

    createFromTimer(activityId, startedAtMs, endedAtMs, durationMs) {
      return this.create({
        activityId: String(activityId),
        date: localDate(startedAtMs),
        startedAt: new Date(startedAtMs).toISOString(),
        endedAt: new Date(endedAtMs).toISOString(),
        durationMs,
        source: 'timer'
      });
    }

    removeForActivity(activityId) {
      this.storage.setTimeEntries(this.all().filter(entry => entry.activityId !== String(activityId)));
    }
  }

  global.Tempo10X = global.Tempo10X || {};
  global.Tempo10X.Entries = Object.freeze({ SOURCES, localDate, validateEntry, TimeEntryService });
})(window);
