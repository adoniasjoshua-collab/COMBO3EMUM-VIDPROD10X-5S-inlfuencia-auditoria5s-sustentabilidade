(function (global) {
  'use strict';

  function start() {
    try {
      const storage = global.Tempo10X.Storage;
      const activities = new global.Tempo10X.Activities.ActivityService(storage);
      const entries = new global.Tempo10X.Entries.TimeEntryService(storage, activities);
      activities.all().forEach(activity => {
        const trackedMs = entries.syncManual(activity);
        if (trackedMs !== activity.trackedMs) activities.update(activity.id, { trackedMs });
      });
      const timer = new global.Tempo10X.Timer.TimerService(storage, activities, entries);
      const ui = new global.Tempo10X.UI.AppUI(activities, entries, timer, storage);
      ui.init();
      global.Tempo10X.app = Object.freeze({ storage, activities, entries, timer, ui });
    } catch (error) {
      const feedback = document.querySelector('#tool-feedback');
      if (feedback) {
        feedback.textContent = 'Não foi possível iniciar o Tempo 10X neste navegador.';
        feedback.classList.add('is-error');
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})(window);
