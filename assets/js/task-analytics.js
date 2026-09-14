(() => {
  const matrix = document.querySelector('.eisenhower-app');
  const app = matrix || document.querySelector('.tempo-app');
  const host = document.querySelector(matrix ? '#workspace-progress' : '#workspace-reports');
  if (!host || !window.TaskMetrics) return;
  const make = (tag, text, className) => { const el = document.createElement(tag); if (text != null) el.textContent = text; if (className) el.className = className; return el; };
  const section = make('section', null, 'task-analytics'); section.setAttribute('aria-labelledby', 'task-analytics-title');
  const heading = make('h2', 'Tarefas por área e período'); heading.id = 'task-analytics-title';
  section.append(heading, make('p', `Data de cadastro · ${matrix ? 'Matriz de Eisenhower' : 'Tempo 10X'}. Os filtros abaixo são próprios desta análise.`, 'analytics-note'));
  host.prepend(section);
  const controls = make('div', null, 'analytics-controls'); section.append(controls);
  function select(label, entries) {
    const wrapper = make('label', label), el = make('select');
    entries.forEach(([value, text]) => { const opt = make('option', text); opt.value = value; el.append(opt); });
    wrapper.append(el); controls.append(wrapper); return el;
  }
  const period = select('Período', [['day', 'Dia'], ['week', 'Semana'], ['month', 'Mês'], ['year', 'Ano']]); period.value = 'week'; period.id = 'analytics-period';
  const area = select('Área', [['', 'Todas as áreas']]); area.id = 'analytics-area';
  const status = select('Situação atual', [['', 'Todas'], ['open', 'Abertas'], ['done', 'Concluídas']]); status.id = 'analytics-status';
  const quadrant = matrix ? select('Quadrante', [['', 'Todos'], ['do', 'Fazer agora'], ['plan', 'Planejar'], ['delegate', 'Delegar'], ['eliminate', 'Eliminar']]) : null;
  const navigation = make('div', null, 'analytics-navigation');
  const previous = make('button', '←'), next = make('button', '→'), today = make('button', 'Período atual'), range = make('strong');
  previous.setAttribute('aria-label', 'Período anterior'); next.setAttribute('aria-label', 'Próximo período');
  navigation.append(previous, range, next, today); section.append(navigation);
  const summary = make('p', '', 'analytics-summary'); summary.setAttribute('role', 'status'); section.append(summary);
  const switcher = make('div', null, 'analytics-switch'); switcher.setAttribute('role', 'group'); switcher.setAttribute('aria-label', 'Gráfico exibido no celular');
  const areaTab = make('button', 'Por área'), timeTab = make('button', 'Ao longo do tempo'); switcher.append(areaTab, timeTab); section.append(switcher);
  const charts = make('div', null, 'analytics-charts'); charts.dataset.view = 'area';
  const areaChart = make('section', null, 'analytics-area-chart'), timeChart = make('section', null, 'analytics-time-chart');
  charts.append(areaChart, timeChart); section.append(charts);
  const showView = name => { charts.dataset.view = name; areaTab.setAttribute('aria-pressed', String(name === 'area')); timeTab.setAttribute('aria-pressed', String(name === 'time')); };
  areaTab.addEventListener('click', () => showView('area')); timeTab.addEventListener('click', () => showView('time')); showView('area');
  const detail = make('section', null, 'analytics-drilldown'); detail.hidden = true; section.append(detail);
  const tableDetails = make('details', null, 'analytics-table'); tableDetails.append(make('summary', 'Ver dados em tabela')); const tables = make('div'); tableDetails.append(tables); section.append(tableDetails);
  const note = make('p', '', 'analytics-note'); section.append(note);
  let anchor = new Date(), tasks = app.taskAnalyticsData || [], showAll = false;
  const mobile = matchMedia('(max-width: 767px)');
  const dateFormat = date => date.toLocaleDateString('pt-BR');
  function drill(group) {
    detail.replaceChildren(); detail.hidden = false;
    const title = make('h3', `${group.label} · ${group.value} tarefa(s)`); title.tabIndex = -1;
    const close = make('button', 'Voltar aos gráficos'); close.addEventListener('click', () => { detail.hidden = true; section.querySelector('.analytics-summary').focus(); });
    const list = make('ul'); group.tasks.forEach(task => { const item = make('li'); const row = make('details'); row.append(make('summary', task.title), make('p', `${task.areaLabel} · ${task.done ? 'Concluída' : 'Aberta'} · Cadastro: ${new Date(task.time).toLocaleString('pt-BR')}`)); if (task.description) row.append(make('p', task.description)); item.append(row); list.append(item); });
    detail.append(title, close, list); title.focus(); detail.scrollIntoView({ block: 'nearest' });
  }
  summary.tabIndex = -1;
  function table(title, groups) {
    const table = make('table'); table.append(make('caption', title));
    const head = make('thead'), row = make('tr'); ['Grupo', 'Tarefas'].forEach(text => { const th = make('th', text); th.scope = 'col'; row.append(th); }); head.append(row); table.append(head);
    const body = make('tbody'); groups.forEach(group => { const tr = make('tr'); const label = make('td'); const button = make('button', group.label); button.addEventListener('click', () => drill(group)); label.append(button); tr.append(label, make('td', group.future ? 'Ainda não ocorreu' : String(group.value))); body.append(tr); }); table.append(body); return table;
  }
  function render() {
    const data = TaskMetrics.calculate(tasks, { period: period.value, anchor, area: area.value, status: status.value, quadrant: quadrant?.value || '', mobile: mobile.matches });
    const currentArea = area.value; area.replaceChildren(); [['', 'Todas as áreas'], ...data.areas].forEach(([value, title]) => { const option = make('option', title); option.value = value; area.append(option); });
    area.value = currentArea; if (area.selectedIndex < 0) { area.value = ''; return render(); }
    const lastDay = new Date(data.end); lastDay.setDate(lastDay.getDate() - 1);
    range.textContent = `${dateFormat(data.start)} — ${dateFormat(lastDay)}`;
    summary.textContent = `${data.total} cadastradas · ${data.total - data.done} abertas agora · ${data.done} concluídas agora${status.value ? ' · Situação filtrada' : ''}`;
    detail.hidden = true;
    areaChart.replaceChildren(make('h3', 'Tarefas por área'));
    const groups = showAll || data.groups.length <= 6 ? data.groups : [...data.groups.slice(0, 5), { label: 'Outras', tasks: data.groups.slice(5).flatMap(group => group.tasks), value: data.groups.slice(5).reduce((sum, group) => sum + group.value, 0) }];
    const maxArea = Math.max(1, ...groups.map(group => group.value));
    groups.forEach(group => {
      const button = make('button', null, 'analytics-area-bar'); button.setAttribute('aria-label', `${group.label}: ${group.value} tarefas. Ver tarefas.`);
      const track = make('span', null, 'analytics-track'), fill = make('span', null, 'analytics-fill'); fill.style.width = `${group.value / maxArea * 100}%`; track.append(fill);
      button.append(make('span', group.label), track, make('strong', String(group.value))); button.addEventListener('click', () => drill(group)); areaChart.append(button);
    });
    if (!data.total) areaChart.append(make('p', 'Nenhuma tarefa cadastrada neste intervalo e filtros. Ajuste os filtros ou cadastre uma tarefa.'));
    if (data.groups.length > 6) { const toggle = make('button', showAll ? 'Mostrar principais áreas' : 'Mostrar todas as áreas'); toggle.addEventListener('click', () => { showAll = !showAll; render(); }); areaChart.append(toggle); }
    timeChart.replaceChildren(make('h3', 'Quando foram cadastradas'), make('p', 'Quantidade de tarefas · escala iniciada em zero', 'analytics-note'));
    const plot = make('div', null, 'analytics-time-bars'); const maxTime = Math.max(1, ...data.buckets.map(bucket => bucket.value));
    data.buckets.forEach((bucket, index) => {
      const button = make('button', null, 'analytics-time-bar'); button.setAttribute('aria-label', `${bucket.label}: ${bucket.future ? 'Ainda não ocorreu' : `${bucket.value} tarefas`}`); button.title = button.getAttribute('aria-label');
      const bar = make('span', null, 'analytics-column'); bar.style.height = `${bucket.value / maxTime * 120}px`;
      const label = make('span', data.buckets.length > 12 && index % 5 !== 0 && index !== data.buckets.length - 1 ? '' : bucket.label, 'analytics-tick');
      button.append(make('span', bucket.future ? '—' : String(bucket.value), 'analytics-value'), bar, label); button.disabled = bucket.future; button.addEventListener('click', () => drill(bucket)); plot.append(button);
    });
    timeChart.append(plot);
    tables.replaceChildren(table('Tarefas por área', data.groups), table('Cadastros por intervalo', data.buckets));
    note.textContent = `Baseado nas tarefas atualmente salvas nesta ferramenta e navegador; período pela data de cadastro, no horário local. Concluídas agora não significa concluídas durante o período. Exclusões e alterações de área ou situação podem mudar períodos anteriores.${data.invalid ? ` ${data.invalid} tarefa(s) sem data de cadastro válida ficaram fora da análise temporal.` : ''}`;
  }
  [period, area, status, quadrant].filter(Boolean).forEach(el => el.addEventListener('change', render));
  previous.addEventListener('click', () => { anchor = TaskMetrics.shift(anchor, period.value, -1); render(); });
  next.addEventListener('click', () => { anchor = TaskMetrics.shift(anchor, period.value, 1); render(); });
  today.addEventListener('click', () => { anchor = new Date(); render(); });
  app.addEventListener('tasks:updated', event => { tasks = event.detail; render(); });
  mobile.addEventListener('change', render);
  window.addEventListener('focus', render);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });
  section.querySelectorAll('button').forEach(button => { button.type = 'button'; });
  render();
})();
