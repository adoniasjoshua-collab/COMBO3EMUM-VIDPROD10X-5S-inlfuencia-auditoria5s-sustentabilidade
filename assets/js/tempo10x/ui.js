(function (global) {
  'use strict';

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function formatDuration(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return [hours, minutes, seconds].map(value => String(value).padStart(2, '0')).join(':');
  }

  function formatHours(ms) {
    const totalMinutes = Math.round(Math.max(0, Number(ms) || 0) / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (!hours) return `${minutes} min`;
    return minutes ? `${hours}h ${minutes}min` : `${hours}h`;
  }

  function formatDate(value) {
    if (!value) return 'Sem data';
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? 'Sem data' : new Intl.DateTimeFormat('pt-BR').format(date);
  }

  function localDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }

  class AppUI {
    constructor(activities, timer, storage) {
      this.activities = activities;
      this.timer = timer;
      this.storage = storage;
      this.reports = global.Tempo10X.Reports;
      this.editingId = null;
      this.tick = null;
      this.form = document.querySelector('#activity-form');
      this.list = document.querySelector('#activity-list');
      this.empty = document.querySelector('#empty-state');
      this.feedback = document.querySelector('#tool-feedback');
      this.search = document.querySelector('#activity-search');
      this.statusFilter = document.querySelector('#status-filter');
      this.priorityFilter = document.querySelector('#priority-filter');
      this.categoryFilter = document.querySelector('#category-filter');
      this.dateFromFilter = document.querySelector('#date-from-filter');
      this.dateToFilter = document.querySelector('#date-to-filter');
      this.count = document.querySelector('#activity-count');
      this.timerPanel = document.querySelector('#active-timer');
      this.timerTitle = document.querySelector('#timer-title');
      this.timerValue = document.querySelector('#timer-value');
      this.pauseButton = document.querySelector('#timer-pause');
      this.resumeButton = document.querySelector('#timer-resume');
      this.finishButton = document.querySelector('#timer-finish');
    }

    init() {
      this.form.addEventListener('submit', event => this.onSubmit(event));
      document.querySelector('#form-cancel').addEventListener('click', () => this.resetForm());
      [this.search, this.statusFilter, this.priorityFilter, this.categoryFilter, this.dateFromFilter, this.dateToFilter].forEach(control => {
        control.addEventListener(control === this.search ? 'input' : 'change', () => this.render());
      });
      document.querySelector('#filters-clear').addEventListener('click', () => this.clearFilters());
      this.pauseButton.addEventListener('click', () => this.run(() => this.timer.pause(), 'Cronômetro pausado.'));
      this.resumeButton.addEventListener('click', () => this.run(() => this.timer.resume(), 'Cronômetro retomado.'));
      this.finishButton.addEventListener('click', () => this.run(() => this.timer.finish(), 'Atividade concluída e tempo registrado.'));
      document.querySelector('#report-export-csv').addEventListener('click', () => this.exportCsv());
      document.querySelector('#report-print').addEventListener('click', () => global.print());
      document.querySelector('#backup-export').addEventListener('click', () => this.exportBackup());
      document.querySelector('#backup-import').addEventListener('change', event => this.importBackup(event));
      document.querySelector('#data-clear').addEventListener('click', () => this.clearData());
      this.resetForm();
      this.render();
      this.tick = global.setInterval(() => this.renderTimer(), 1000);
    }

    announce(message, error) {
      this.feedback.textContent = message;
      this.feedback.classList.toggle('is-error', Boolean(error));
    }

    run(action, success) {
      try {
        action();
        this.announce(success, false);
        this.render();
      } catch (error) {
        this.announce(error.message || 'Não foi possível concluir a ação.', true);
      }
    }

    formData() {
      const data = new FormData(this.form);
      return {
        title: data.get('title'), description: data.get('description'), category: data.get('category'),
        priority: data.get('priority'), date: data.get('date'), startTime: data.get('startTime'),
        endTime: data.get('endTime'), plannedMinutes: data.get('plannedMinutes'), status: data.get('status'), notes: data.get('notes')
      };
    }

    onSubmit(event) {
      event.preventDefault();
      const updating = Boolean(this.editingId);
      this.run(() => {
        if (this.editingId) this.activities.update(this.editingId, this.formData());
        else this.activities.create(this.formData());
        this.resetForm();
      }, updating ? 'Atividade atualizada.' : 'Atividade criada.');
    }

    resetForm() {
      this.form.reset();
      this.form.elements.priority.value = 'média';
      this.form.elements.status.value = 'pendente';
      this.form.elements.date.value = localDate();
      this.editingId = null;
      document.querySelector('#form-title').textContent = 'Nova atividade';
      document.querySelector('#form-submit').textContent = 'Salvar atividade';
      document.querySelector('#form-cancel').hidden = true;
    }

    edit(activity) {
      this.editingId = activity.id;
      Object.entries(activity).forEach(([key, value]) => {
        if (this.form.elements[key]) this.form.elements[key].value = value;
      });
      document.querySelector('#form-title').textContent = 'Editar atividade';
      document.querySelector('#form-submit').textContent = 'Atualizar atividade';
      document.querySelector('#form-cancel').hidden = false;
      this.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.form.elements.title.focus();
    }

    remove(activity) {
      if (!global.confirm(`Excluir a atividade “${activity.title}”?`)) return;
      this.run(() => {
        const active = this.timer.current();
        if (active && active.activityId === activity.id) this.storage.setActiveTimer(null);
        this.activities.remove(activity.id);
      }, 'Atividade excluída.');
    }

    filters() {
      return {
        query: this.search.value, status: this.statusFilter.value, priority: this.priorityFilter.value,
        category: this.categoryFilter.value, dateFrom: this.dateFromFilter.value, dateTo: this.dateToFilter.value
      };
    }

    clearFilters() {
      [this.search, this.statusFilter, this.priorityFilter, this.categoryFilter, this.dateFromFilter, this.dateToFilter].forEach(control => { control.value = ''; });
      this.render();
      this.announce('Filtros removidos.', false);
    }

    refreshCategoryOptions(all) {
      const selected = this.categoryFilter.value;
      const categories = Array.from(new Set(all.map(activity => activity.category).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt-BR'));
      const first = element('option', '', 'Todas as categorias');
      first.value = '';
      this.categoryFilter.replaceChildren(first);
      categories.forEach(category => {
        const option = element('option', '', category);
        option.value = category;
        this.categoryFilter.append(option);
      });
      this.categoryFilter.value = categories.includes(selected) ? selected : '';
    }

    filteredActivities(all) {
      return this.reports.filterActivities(all || this.activities.all(), this.filters()).sort((a, b) => `${a.date || '9999'}${a.startTime || '99:99'}${a.createdAt}`.localeCompare(`${b.date || '9999'}${b.startTime || '99:99'}${b.createdAt}`));
    }

    actionButton(label, className, handler) {
      const button = element('button', className, label);
      button.type = 'button';
      button.addEventListener('click', handler);
      return button;
    }

    card(activity) {
      const card = element('article', 'activity-card');
      card.setAttribute('aria-label', `Atividade: ${activity.title}`);
      const top = element('div', 'activity-card__top');
      const badges = element('div', 'activity-badges');
      badges.append(element('span', `badge priority-${activity.priority}`, activity.priority), element('span', 'badge status-badge', activity.status));
      top.append(element('h3', '', activity.title), badges);
      card.append(top);
      if (activity.description) card.append(element('p', 'activity-description', activity.description));
      const details = element('dl', 'activity-details');
      const values = [
        ['Categoria', activity.category || 'Sem categoria'], ['Data', formatDate(activity.date)],
        ['Horário', activity.startTime || activity.endTime ? `${activity.startTime || '—'}–${activity.endTime || '—'}` : 'Não definido'],
        ['Planejado', activity.plannedMinutes ? `${activity.plannedMinutes} min` : 'Não definido'], ['Registrado', formatDuration(activity.trackedMs || 0)]
      ];
      values.forEach(([label, value]) => {
        const group = element('div');
        group.append(element('dt', '', label), element('dd', '', value));
        details.append(group);
      });
      card.append(details);
      if (activity.notes) card.append(element('p', 'activity-notes', `Observações: ${activity.notes}`));
      const actions = element('div', 'activity-actions');
      const active = this.timer.current();
      if (!active) actions.append(this.actionButton('Iniciar', 'tool-button tool-button--primary', () => this.run(() => this.timer.start(activity.id), 'Cronômetro iniciado.')));
      else if (active.activityId === activity.id) actions.append(element('span', 'active-label', active.state === 'running' ? 'Cronometrando agora' : 'Cronômetro pausado'));
      actions.append(this.actionButton('Editar', 'tool-button tool-button--quiet', () => this.edit(activity)), this.actionButton('Excluir', 'tool-button tool-button--danger', () => this.remove(activity)));
      card.append(actions);
      return card;
    }

    render() {
      const all = this.activities.all();
      this.refreshCategoryOptions(all);
      const filtered = this.filteredActivities(all);
      this.list.replaceChildren(...filtered.map(activity => this.card(activity)));
      this.empty.hidden = filtered.length > 0;
      this.count.textContent = `${filtered.length} ${filtered.length === 1 ? 'atividade' : 'atividades'}`;
      this.renderReports(filtered);
      this.renderTimer();
    }

    renderReports(activities) {
      const summary = this.reports.summarize(activities);
      document.querySelector('#report-activities').textContent = String(summary.count);
      document.querySelector('#report-tracked').textContent = formatHours(summary.trackedMs);
      document.querySelector('#report-planned').textContent = formatHours(summary.plannedMs);
      document.querySelector('#report-completion').textContent = `${Math.round(summary.completionRate)}%`;
      const variance = document.querySelector('#report-variance');
      variance.textContent = `${summary.varianceMs > 0 ? '+' : summary.varianceMs < 0 ? '−' : ''}${formatHours(Math.abs(summary.varianceMs))}`;
      variance.classList.toggle('is-over', summary.varianceMs > 0);

      const categoryBody = document.querySelector('#report-category-body');
      categoryBody.replaceChildren(...this.reports.groupByCategory(activities).map(group => {
        const row = element('tr');
        [group.category, String(group.count), formatHours(group.plannedMs), formatHours(group.trackedMs)].forEach(value => row.append(element('td', '', value)));
        return row;
      }));
      const detailBody = document.querySelector('#report-detail-body');
      detailBody.replaceChildren(...activities.map(activity => {
        const row = element('tr');
        [activity.title, activity.category || 'Sem categoria', formatDate(activity.date), activity.status, `${activity.plannedMinutes || 0} min`, formatHours(activity.trackedMs || 0)].forEach(value => row.append(element('td', '', value)));
        return row;
      }));
      document.querySelector('#report-empty').hidden = activities.length > 0;
    }

    renderTimer() {
      const active = this.timer.current();
      this.timerPanel.hidden = !active;
      if (!active) return;
      const activity = this.activities.find(active.activityId);
      this.timerTitle.textContent = activity ? activity.title : 'Atividade';
      this.timerValue.textContent = formatDuration(this.timer.elapsed(active));
      this.pauseButton.hidden = active.state !== 'running';
      this.resumeButton.hidden = active.state !== 'paused';
    }

    download(content, type, filename) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([content], { type }));
      link.download = filename;
      link.click();
      global.setTimeout(() => URL.revokeObjectURL(link.href), 0);
    }

    exportCsv() {
      const activities = this.filteredActivities(this.activities.all());
      if (!activities.length) return this.announce('Não há atividades no filtro atual para exportar.', true);
      this.download(this.reports.toCsv(activities), 'text/csv;charset=utf-8', `tempo10x-relatorio-${localDate()}.csv`);
      this.announce('Relatório CSV exportado com os filtros atuais.', false);
    }

    exportBackup() {
      this.download(JSON.stringify(this.storage.createBackup(), null, 2), 'application/json', `tempo10x-backup-${localDate()}.json`);
      this.announce('Backup exportado.', false);
    }

    async importBackup(event) {
      const file = event.target.files && event.target.files[0];
      event.target.value = '';
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) return this.announce('O arquivo excede o limite de 2 MB.', true);
      if (!global.confirm('Importar este backup substituirá os dados atuais. Continuar?')) return;
      try {
        const data = JSON.parse(await file.text());
        this.storage.restoreBackup(data, global.Tempo10X.Activities.validateActivity);
        this.resetForm();
        this.render();
        this.announce('Backup importado com sucesso.', false);
      } catch (error) {
        this.announce(error.message || 'Não foi possível importar o arquivo.', true);
      }
    }

    clearData() {
      if (!global.confirm('Apagar todas as atividades e configurações do Tempo 10X neste navegador?')) return;
      this.storage.clearAll();
      this.resetForm();
      this.clearFilters();
      this.announce('Dados locais apagados.', false);
    }
  }

  global.Tempo10X = global.Tempo10X || {};
  global.Tempo10X.UI = Object.freeze({ AppUI, formatDuration, formatHours });
})(window);
