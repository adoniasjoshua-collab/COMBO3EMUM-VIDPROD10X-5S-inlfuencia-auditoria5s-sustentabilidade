(function (global) {
  'use strict';

  class TimerService {
    constructor(storage, activities, entries, now) {
      this.storage = storage;
      this.activities = activities;
      this.entries = entries;
      this.now = now || (() => Date.now());
    }

    current() {
      const timer = this.storage.getActiveTimer();
      if (!timer) return null;
      if (!this.activities.find(String(timer.activityId))) {
        this.storage.setActiveTimer(null);
        return null;
      }
      return timer;
    }

    elapsed(timer) {
      const current = timer || this.current();
      if (!current) return 0;
      const base = Math.max(0, Number(current.accumulatedMs) || 0);
      return current.state === 'running' ? base + Math.max(0, this.now() - Number(current.startedAt)) : base;
    }

    start(activityId) {
      const id = String(activityId);
      if (!this.activities.find(id)) throw new Error('Atividade não encontrada.');
      const active = this.current();
      if (active && active.activityId !== id) throw new Error('Finalize o cronômetro ativo antes de iniciar outro.');
      if (active && active.state === 'running') return active;
      const timestamp = this.now();
      const timer = active || { activityId: id, accumulatedMs: 0, sessionStartedAt: timestamp };
      timer.state = 'running';
      timer.startedAt = timestamp;
      if (!Number.isFinite(Number(timer.sessionStartedAt))) timer.sessionStartedAt = timestamp;
      this.storage.setActiveTimer(timer);
      this.activities.update(id, { status: 'em andamento' });
      return timer;
    }

    pause() {
      const timer = this.current();
      if (!timer || timer.state !== 'running') throw new Error('Não há cronômetro em execução.');
      timer.accumulatedMs = this.elapsed(timer);
      timer.startedAt = null;
      timer.state = 'paused';
      this.storage.setActiveTimer(timer);
      this.activities.update(timer.activityId, { status: 'pausada' });
      return timer;
    }

    resume() {
      const timer = this.current();
      if (!timer || timer.state !== 'paused') throw new Error('Não há cronômetro pausado.');
      timer.state = 'running';
      timer.startedAt = this.now();
      this.storage.setActiveTimer(timer);
      this.activities.update(timer.activityId, { status: 'em andamento' });
      return timer;
    }

    finish() {
      const timer = this.current();
      if (!timer) throw new Error('Não há cronômetro ativo.');
      const endedAt = this.now();
      const elapsed = this.elapsed(timer);
      const activity = this.activities.find(timer.activityId);
      if (elapsed > 0) this.entries.createFromTimer(timer.activityId, Number(timer.sessionStartedAt) || endedAt - elapsed, endedAt, elapsed);
      const trackedMs = this.entries.syncManual(activity);
      this.activities.update(timer.activityId, { trackedMs, status: 'concluída' });
      this.storage.setActiveTimer(null);
      return elapsed;
    }
  }

  global.Tempo10X = global.Tempo10X || {};
  global.Tempo10X.Timer = Object.freeze({ TimerService });
})(window);
