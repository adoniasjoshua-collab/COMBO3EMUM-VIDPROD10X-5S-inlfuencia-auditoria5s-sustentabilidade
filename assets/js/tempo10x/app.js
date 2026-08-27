(function (global) {
  'use strict';

  function start() {
    try {
      const storage = global.Tempo10X.Storage;
      const activities = new global.Tempo10X.Activities.ActivityService(storage);
      const timer = new global.Tempo10X.Timer.TimerService(storage, activities);
      const ui = new global.Tempo10X.UI.AppUI(activities, timer, storage);
      ui.init();
      global.Tempo10X.app = Object.freeze({ storage, activities, timer, ui });
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
