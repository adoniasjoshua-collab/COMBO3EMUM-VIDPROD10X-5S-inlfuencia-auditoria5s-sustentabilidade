(function (global) {
  'use strict';

  const PRIORITIES = ['baixa', 'média', 'alta', 'urgente'];
  const STATUSES = ['pendente', 'em andamento', 'pausada', 'concluída'];
  const LIMITS = { title: 120, description: 500, category: 60, notes: 1000 };

  function text(value, max) {
    return String(value || '').trim().slice(0, max);
  }

  function validDate(value) {
    if (value === '') return true;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return false;
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
    return date.getUTCFullYear() === Number(match[1]) && date.getUTCMonth() === Number(match[2]) - 1 && date.getUTCDate() === Number(match[3]);
  }

  function validTime(value) {
    return value === '' || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
  }

  function createId() {
    if (global.crypto && typeof global.crypto.randomUUID === 'function') return global.crypto.randomUUID();
    return `t10x-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function validateActivity(input, preserveId) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Atividade inválida.');
    const title = text(input.title, LIMITS.title);
    if (!title) throw new Error('Informe o título da atividade.');
    const priority = PRIORITIES.includes(input.priority) ? input.priority : 'média';
    const status = STATUSES.includes(input.status) ? input.status : 'pendente';
    const date = text(input.date, 10);
    const startTime = text(input.startTime, 5);
    const endTime = text(input.endTime, 5);
    if (!validDate(date)) throw new Error('A data informada é inválida.');
    if (!validTime(startTime) || !validTime(endTime)) throw new Error('O horário informado é inválido.');
    const plannedMinutes = Math.max(0, Math.min(10080, Math.round(Number(input.plannedMinutes) || 0)));
    const trackedMs = Math.max(0, Math.round(Number(input.trackedMs) || 0));
    const now = new Date().toISOString();
    const id = preserveId && /^[a-zA-Z0-9_-]{6,100}$/.test(String(input.id || '')) ? String(input.id) : createId();
    return {
      id,
      title,
      description: text(input.description, LIMITS.description),
      category: text(input.category, LIMITS.category),
      priority,
      date,
      startTime,
      endTime,
      plannedMinutes,
      status,
      notes: text(input.notes, LIMITS.notes),
      trackedMs,
      createdAt: preserveId && !Number.isNaN(Date.parse(input.createdAt)) ? input.createdAt : now,
      updatedAt: preserveId && !Number.isNaN(Date.parse(input.updatedAt)) ? input.updatedAt : now
    };
  }

  class ActivityService {
    constructor(storage) {
      this.storage = storage;
    }

    all() {
      return this.storage.getActivities().map(activity => validateActivity(activity, true));
    }

    find(id) {
      return this.all().find(activity => activity.id === id) || null;
    }

    create(input) {
      const activities = this.all();
      const activity = validateActivity(input, false);
      activities.push(activity);
      this.storage.setActivities(activities);
      return activity;
    }

    update(id, changes) {
      const activities = this.all();
      const index = activities.findIndex(activity => activity.id === id);
      if (index < 0) throw new Error('Atividade não encontrada.');
      const activity = validateActivity({ ...activities[index], ...changes, id, updatedAt: new Date().toISOString() }, true);
      activity.updatedAt = new Date().toISOString();
      activities[index] = activity;
      this.storage.setActivities(activities);
      return activity;
    }

    remove(id) {
      const activities = this.all();
      const filtered = activities.filter(activity => activity.id !== id);
      if (filtered.length === activities.length) throw new Error('Atividade não encontrada.');
      this.storage.setActivities(filtered);
    }
  }

  global.Tempo10X = global.Tempo10X || {};
  global.Tempo10X.Activities = Object.freeze({ PRIORITIES, STATUSES, LIMITS, validateActivity, ActivityService });
})(window);
