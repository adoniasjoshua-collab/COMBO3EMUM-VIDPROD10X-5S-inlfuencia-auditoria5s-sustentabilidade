(function (global) {
  'use strict';

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function formatDuration(ms) {
    const total = Math.max(0, Math.floor((Number(ms) || 0) / 1000));
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

  function formatShortDate(value) {
    if (!value) return '—';
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(date);
  }

  function formatTime(value) {
    if (!value) return '—';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(date);
  }

  function localDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }

  class AppUI {
    constructor(activities, entries, timer, storage) {
      this.activities = activities;
      this.entries = entries;
      this.timer = timer;
      this.storage = storage;
      this.reports = global.Tempo10X.Reports;
      this.editingId = null;
      this.tick = null;
      this.reportView = 'summary';
      this.form = document.querySelector('#activity-form');
      this.list = document.querySelector('#activity-list');
      this.empty = document.querySelector('#empty-state');
      this.feedback = document.querySelector('#tool-feedback');
      this.search = document.querySelector('#activity-search');
      this.statusFilter = document.querySelector('#status-filter');
      this.priorityFilter = document.querySelector('#priority-filter');
      this.categoryFilter = document.querySelector('#category-filter');
      this.periodFilter = document.querySelector('#period-filter');
      this.dateFromFilter = document.querySelector('#date-from-filter');
      this.dateToFilter = document.querySelector('#date-to-filter');
      this.count = document.querySelector('#activity-count');
      this.timerPanel = document.querySelector('#active-timer');
      this.timerTitle = document.querySelector('#timer-title');
      this.timerValue = document.querySelector('#timer-value');
      this.timerProgress = document.querySelector('#timer-progress');
      this.timerProgressLabel = document.querySelector('#timer-progress-label');
      this.timerBudgetLabel = document.querySelector('#timer-budget-label');
      this.pauseButton = document.querySelector('#timer-pause');
      this.resumeButton = document.querySelector('#timer-resume');
      this.finishButton = document.querySelector('#timer-finish');
    }

    init() {
      this.form.addEventListener('submit', event => this.onSubmit(event));
      document.querySelector('#form-cancel').addEventListener('click', () => this.resetForm());
      [this.search, this.statusFilter, this.priorityFilter, this.categoryFilter].forEach(control => {
        control.addEventListener(control === this.search ? 'input' : 'change', () => this.render());
      });
      this.periodFilter.addEventListener('change', () => this.applyPeriod());
      this.dateFromFilter.addEventListener('change', () => this.onCustomDate('from'));
      this.dateToFilter.addEventListener('change', () => this.onCustomDate('to'));
      document.querySelector('#filters-clear').addEventListener('click', () => this.clearFilters());
      document.querySelectorAll('[data-report-view]').forEach(button => button.addEventListener('click', () => this.activateReportView(button.dataset.reportView)));
      this.pauseButton.addEventListener('click', () => this.run(() => this.timer.pause(), 'Cronômetro pausado.'));
      this.resumeButton.addEventListener('click', () => this.run(() => this.timer.resume(), 'Cronômetro retomado.'));
      this.finishButton.addEventListener('click', () => this.run(() => this.timer.finish(), 'Sessão registrada e atividade concluída.'));
      document.querySelector('#report-export-csv').addEventListener('click', () => this.exportCsv());
      document.querySelector('#report-print').addEventListener('click', () => global.print());
      document.querySelector('#backup-export').addEventListener('click', () => this.exportBackup());
      document.querySelector('#backup-import').addEventListener('change', event => this.importBackup(event));
      document.querySelector('#data-clear').addEventListener('click', () => this.clearData());
      global.addEventListener('storage', event => { if (event.key && event.key.startsWith('tempo10x.')) this.render(); });
      this.resetForm();
      this.periodFilter.value = 'this-week';
      this.applyPeriod(false);
      this.activateReportView('summary');
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
      Object.entries(activity).forEach(([key, value]) => { if (this.form.elements[key]) this.form.elements[key].value = value; });
      document.querySelector('#form-title').textContent = 'Editar atividade';
      document.querySelector('#form-submit').textContent = 'Atualizar atividade';
      document.querySelector('#form-cancel').hidden = false;
      this.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.form.elements.title.focus();
    }

    remove(activity) {
      if (!global.confirm(`Excluir a atividade “${activity.title}” e todas as suas sessões de tempo?`)) return;
      this.run(() => {
        const active = this.timer.current();
        if (active && active.activityId === activity.id) this.storage.setActiveTimer(null);
        this.entries.removeForActivity(activity.id);
        this.activities.remove(activity.id);
      }, 'Atividade e sessões excluídas.');
    }

    filters() {
      return {
        query: this.search.value, status: this.statusFilter.value, priority: this.priorityFilter.value,
        category: this.categoryFilter.value, dateFrom: this.dateFromFilter.value, dateTo: this.dateToFilter.value
      };
    }

    applyPeriod(renderAfter = true) {
      const range = this.reports.periodRange(this.periodFilter.value, localDate());
      if (this.periodFilter.value !== 'custom') {
        this.dateFromFilter.value = range.dateFrom;
        this.dateToFilter.value = range.dateTo;
      }
      if (renderAfter) this.render();
    }

    onCustomDate(changed) {
      this.periodFilter.value = 'custom';
      if (this.dateFromFilter.value && this.dateToFilter.value && this.dateFromFilter.value > this.dateToFilter.value) {
        if (changed === 'from') this.dateToFilter.value = this.dateFromFilter.value;
        else this.dateFromFilter.value = this.dateToFilter.value;
      }
      this.render();
    }

    clearFilters() {
      [this.search, this.statusFilter, this.priorityFilter, this.categoryFilter].forEach(control => { control.value = ''; });
      this.periodFilter.value = 'this-week';
      this.applyPeriod(false);
      this.render();
      this.announce('Filtros redefinidos para esta semana.', false);
    }

    refreshCategoryOptions(all) {
      const selected = this.categoryFilter.value;
      const categories = Array.from(new Set(all.map(activity => activity.category).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt-BR'));
      const first = element('option', '', 'Todas as categorias');
      first.value = '';
      this.categoryFilter.replaceChildren(first);
      categories.forEach(category => { const option = element('option', '', category); option.value = category; this.categoryFilter.append(option); });
      this.categoryFilter.value = categories.includes(selected) ? selected : '';
    }

    reportData() {
      return this.reports.buildReport(this.activities.all(), this.entries.all(), this.filters());
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
      const active = this.timer.current();
      const liveMs = active && active.activityId === activity.id ? this.timer.elapsed(active) : 0;
      const values = [
        ['Categoria', activity.category || 'Sem categoria'], ['Data', formatDate(activity.date)],
        ['Horário', activity.startTime || activity.endTime ? `${activity.startTime || '—'}–${activity.endTime || '—'}` : 'Não definido'],
        ['Planejado', activity.plannedMinutes ? `${activity.plannedMinutes} min` : 'Não definido'], ['Registrado', formatDuration((activity.trackedMs || 0) + liveMs)]
      ];
      values.forEach(([label, value]) => { const group = element('div'); group.append(element('dt', '', label), element('dd', '', value)); details.append(group); });
      card.append(details);
      if (activity.notes) card.append(element('p', 'activity-notes', `Observações: ${activity.notes}`));
      const actions = element('div', 'activity-actions');
      if (!active) actions.append(this.actionButton('Iniciar cronômetro', 'tool-button tool-button--primary', () => this.run(() => this.timer.start(activity.id), 'Cronômetro iniciado.')));
      else if (active.activityId === activity.id) actions.append(element('span', 'active-label', active.state === 'running' ? 'Cronometrando agora' : 'Cronômetro pausado'));
      actions.append(this.actionButton('Editar', 'tool-button tool-button--quiet', () => this.edit(activity)), this.actionButton('Excluir', 'tool-button tool-button--danger', () => this.remove(activity)));
      card.append(actions);
      return card;
    }

    render() {
      const all = this.activities.all();
      this.refreshCategoryOptions(all);
      const report = this.reports.buildReport(all, this.entries.all(), this.filters());
      const activities = report.activities.sort((a, b) => `${a.date || '9999'}${a.startTime || '99:99'}${a.createdAt}`.localeCompare(`${b.date || '9999'}${b.startTime || '99:99'}${b.createdAt}`));
      this.list.replaceChildren(...activities.map(activity => this.card(activity)));
      this.empty.hidden = activities.length > 0;
      this.count.textContent = `${activities.length} ${activities.length === 1 ? 'atividade' : 'atividades'}`;
      this.renderReports(report);
      this.renderTimer();
    }

    activateReportView(view) {
      this.reportView = view;
      document.querySelectorAll('[data-report-view]').forEach(button => {
        const active = button.dataset.reportView === view;
        button.setAttribute('aria-selected', String(active));
        button.tabIndex = active ? 0 : -1;
      });
      document.querySelectorAll('[data-report-panel]').forEach(panel => { panel.hidden = panel.dataset.reportPanel !== view; });
    }

    renderReports(report) {
      const summary = this.reports.summarize(report);
      document.querySelector('#report-activities').textContent = String(summary.count);
      document.querySelector('#report-tracked').textContent = formatHours(summary.trackedMs);
      document.querySelector('#report-planned').textContent = formatHours(summary.plannedMs);
      document.querySelector('#report-average').textContent = formatHours(summary.averageDailyMs);
      document.querySelector('#report-completion').textContent = `${Math.round(summary.completionRate)}%`;
      const variance = document.querySelector('#report-variance');
      variance.textContent = `${summary.varianceMs > 0 ? '+' : summary.varianceMs < 0 ? '−' : ''}${formatHours(Math.abs(summary.varianceMs))}`;
      variance.classList.toggle('is-over', summary.varianceMs > 0);
      document.querySelector('#report-period-label').textContent = this.periodFilter.options[this.periodFilter.selectedIndex].textContent;
      this.renderDailyChart(report);
      this.renderCategoryChart(report);
      this.renderStatusChart(report);
      this.renderCategoryTable(report);
      this.renderEntryTable(report);
      this.renderWeeklyTable(report);
      document.querySelector('#report-empty').hidden = report.activities.length > 0 || report.entries.length > 0;
    }

    renderDailyChart(report) {
      const rows = this.reports.dailyBreakdown(report);
      const chart = document.querySelector('#daily-chart');
      chart.replaceChildren();
      const max = Math.max(1, ...rows.flatMap(row => [row.plannedMs, row.trackedMs]));
      rows.forEach(row => {
        const group = element('div', 'daily-chart__group');
        const bars = element('div', 'daily-chart__bars');
        [['Planejado', row.plannedMs, 'is-planned'], ['Registrado', row.trackedMs, 'is-tracked']].forEach(([label, value, className]) => {
          const bar = element('span', `daily-chart__bar ${className}`);
          bar.style.height = value ? `${Math.max(3, (value / max) * 100)}%` : '0';
          bar.title = `${label}: ${formatHours(value)}`;
          bars.append(bar);
        });
        group.append(bars, element('span', 'daily-chart__label', formatShortDate(row.date)));
        chart.append(group);
      });
      chart.setAttribute('aria-label', rows.length ? `Comparação diária de tempo planejado e registrado em ${rows.length} dias` : 'Sem dados diários no período');
      document.querySelector('#daily-chart-empty').hidden = rows.length > 0;
    }

    renderCategoryChart(report) {
      const rows = this.reports.groupByCategory(report);
      const chart = document.querySelector('#category-chart');
      chart.replaceChildren();
      const max = Math.max(1, ...rows.map(row => row.trackedMs));
      rows.forEach(row => {
        const item = element('div', 'category-bar');
        const label = element('div', 'category-bar__label');
        label.append(element('span', '', row.category), element('strong', '', formatHours(row.trackedMs)));
        const track = element('div', 'category-bar__track');
        const fill = element('span', 'category-bar__fill');
        fill.style.width = row.trackedMs ? `${Math.max(2, (row.trackedMs / max) * 100)}%` : '0';
        track.append(fill);
        item.append(label, track);
        chart.append(item);
      });
      document.querySelector('#category-chart-empty').hidden = rows.length > 0;
    }

    renderStatusChart(report) {
      const rows = this.reports.statusBreakdown(report);
      const total = rows.reduce((sum, row) => sum + row.count, 0);
      const colors = ['#7a8b82', '#2877a8', '#d48a12', '#116b45'];
      let cursor = 0;
      const stops = rows.map((row, index) => {
        const start = cursor;
        cursor += total ? (row.count / total) * 100 : 0;
        return `${colors[index]} ${start}% ${cursor}%`;
      });
      const donut = document.querySelector('#status-donut');
      donut.style.background = total ? `conic-gradient(${stops.join(',')})` : '#edf2ef';
      donut.setAttribute('aria-label', total ? `Distribuição de ${total} atividades por status` : 'Sem atividades no período');
      const legend = document.querySelector('#status-legend');
      legend.replaceChildren(...rows.map((row, index) => {
        const item = element('li');
        const swatch = element('span', 'status-swatch');
        swatch.style.background = colors[index];
        item.append(swatch, element('span', '', `${row.status}: ${row.count}`));
        return item;
      }));
    }

    renderCategoryTable(report) {
      const body = document.querySelector('#report-category-body');
      body.replaceChildren(...this.reports.groupByCategory(report).map(group => {
        const row = element('tr');
        [group.category, String(group.count), formatHours(group.plannedMs), formatHours(group.trackedMs)].forEach(value => row.append(element('td', '', value)));
        return row;
      }));
    }

    renderEntryTable(report) {
      const body = document.querySelector('#report-detail-body');
      body.replaceChildren(...this.reports.detailedEntries(report).map(entry => {
        const activity = entry.activity || {};
        const row = element('tr');
        [formatDate(entry.date), activity.title || 'Atividade removida', activity.category || 'Sem categoria', formatTime(entry.startedAt), formatTime(entry.endedAt), formatHours(entry.durationMs), entry.source === 'legacy' ? 'Histórico migrado' : 'Cronômetro'].forEach(value => row.append(element('td', '', value)));
        return row;
      }));
    }

    renderWeeklyTable(report) {
      const body = document.querySelector('#report-weekly-body');
      body.replaceChildren(...this.reports.weeklyBreakdown(report).map(week => {
        const row = element('tr');
        const variance = week.trackedMs - week.plannedMs;
        [`${formatDate(week.weekStart)}`, String(week.sessions), formatHours(week.plannedMs), formatHours(week.trackedMs), `${variance > 0 ? '+' : variance < 0 ? '−' : ''}${formatHours(Math.abs(variance))}`].forEach(value => row.append(element('td', '', value)));
        return row;
      }));
    }

    renderTimer() {
      const active = this.timer.current();
      this.timerPanel.hidden = !active;
      document.body.classList.toggle('has-active-timer', Boolean(active));
      if (!active) return;
      const activity = this.activities.find(active.activityId);
      const elapsed = this.timer.elapsed(active);
      this.timerTitle.textContent = activity ? activity.title : 'Atividade';
      this.timerValue.textContent = formatDuration(elapsed);
      this.pauseButton.hidden = active.state !== 'running';
      this.resumeButton.hidden = active.state !== 'paused';
      const plannedMs = activity ? Math.max(0, Number(activity.plannedMinutes) || 0) * 60000 : 0;
      const ratio = plannedMs ? (elapsed / plannedMs) * 100 : 0;
      this.timerProgress.value = Math.min(100, ratio);
      this.timerProgress.className = `timer-progress${ratio >= 100 ? ' is-over' : ratio >= 80 ? ' is-warning' : ''}`;
      if (!plannedMs) {
        this.timerProgress.hidden = true;
        this.timerProgressLabel.textContent = 'Sem duração planejada';
        this.timerBudgetLabel.textContent = 'O tempo será registrado normalmente.';
      } else {
        this.timerProgress.hidden = false;
        this.timerProgressLabel.textContent = `${Math.round(ratio)}% do tempo planejado`;
        this.timerBudgetLabel.textContent = elapsed > plannedMs ? `Excedido em ${formatDuration(elapsed - plannedMs)}` : `Restam ${formatDuration(plannedMs - elapsed)}`;
      }
    }

    download(content, type, filename) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([content], { type }));
      link.download = filename;
      link.click();
      global.setTimeout(() => URL.revokeObjectURL(link.href), 0);
    }

    exportCsv() {
      const report = this.reportData();
      if (!report.entries.length) return this.announce('Não há sessões no filtro atual para exportar.', true);
      this.download(this.reports.toCsv(report), 'text/csv;charset=utf-8', `tempo10x-sessoes-${localDate()}.csv`);
      this.announce('Relatório detalhado CSV exportado com os filtros atuais.', false);
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
        this.storage.restoreBackup(data, global.Tempo10X.Activities.validateActivity, global.Tempo10X.Entries.validateEntry);
        this.resetForm();
        this.render();
        this.announce('Backup importado com sucesso.', false);
      } catch (error) {
        this.announce(error.message || 'Não foi possível importar o arquivo.', true);
      }
    }

    clearData() {
      if (!global.confirm('Apagar todas as atividades, sessões e configurações do Tempo 10X neste navegador?')) return;
      this.storage.clearAll();
      this.resetForm();
      this.clearFilters();
      this.announce('Dados locais apagados.', false);
    }
  }

  global.Tempo10X = global.Tempo10X || {};
  global.Tempo10X.UI = Object.freeze({ AppUI, formatDuration, formatHours });
})(window);
