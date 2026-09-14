/* Presentation only: existing applications retain ownership of tasks and storage. */
(() => {
  const matrix = document.querySelector('.eisenhower-app');
  const app = matrix || document.querySelector('.tempo-app');
  if (!app) return;
  const make = (tag, className, text) => {
    const el = document.createElement(tag); el.className = className;
    if (text) el.textContent = text;
    return el;
  };
  document.body.classList.add('workspace-site');
  app.classList.add('workspace');
  const header = make('header', 'workspace-header');
  const brand = make('div', 'workspace-brand', matrix ? 'Prioridades 10X' : 'Tempo 10X');
  const subtitle = make('small', '', matrix ? 'Uma próxima ação de cada vez.' : 'Dê atenção ao que você está fazendo.');
  brand.append(subtitle);
  const focus = make('button', 'workspace-focus', 'Modo aplicativo'); focus.type = 'button'; focus.setAttribute('aria-pressed', 'false');
  focus.addEventListener('click', () => {
    const active = document.body.classList.toggle('workspace-focused');
    focus.setAttribute('aria-pressed', String(active)); focus.textContent = active ? 'Voltar ao portal' : 'Modo aplicativo';
    app.scrollIntoView({ block: 'start' });
  });
  header.append(brand, focus); app.prepend(header);
  const nav = make('nav', 'workspace-nav'); nav.setAttribute('aria-label', 'Visualizações da ferramenta');
  header.after(nav);
  const panels = [];
  let current;
  function panel(id, title) {
    const el = make('section', 'workspace-panel'); el.id = `workspace-${id}`; el.setAttribute('aria-label', title);
    app.append(el); panels.push(el); return el;
  }
  function button(id, title, action) {
    const btn = make('button', '', title); btn.type = 'button'; btn.dataset.workspaceView = id;
    btn.addEventListener('click', () => { select(id); app.scrollIntoView({ block: 'start' }); }); nav.append(btn);
    return { btn, action };
  }
  const views = [];
  function select(id) {
    current = id;
    views.forEach(view => { const active = view.btn.dataset.workspaceView === id; view.btn.setAttribute('aria-pressed', String(active)); if (active) view.action(); });
  }
  function show(target) { panels.forEach(el => { el.hidden = el !== target; }); }
  if (matrix) {
    const work = panel('tasks', 'Suas tarefas');
    const progress = panel('progress', 'Seu progresso e backups');
    const board = app.querySelector('#eisenhower-board');
    work.append(app.querySelector('.eisenhower-toolbar'));
    const filter = make('label', 'workspace-filter', 'Quadrante');
    const selectQuadrant = make('select', ''); selectQuadrant.id = 'workspace-quadrant';
    [['all', 'Todos os quadrantes'], ['do', 'Fazer agora'], ['plan', 'Planejar'], ['delegate', 'Delegar'], ['eliminate', 'Eliminar']].forEach(([value, title]) => { const option = make('option', '', title); option.value = value; selectQuadrant.append(option); });
    filter.append(selectQuadrant); work.append(filter, board);
    function filterBoard() { board.querySelectorAll('[data-quadrant]').forEach(el => { el.hidden = selectQuadrant.value !== 'all' && el.dataset.quadrant !== selectQuadrant.value; }); }
    selectQuadrant.addEventListener('change', filterBoard);
    ['.eisenhower-dashboard', '.eisenhower-progress-panel', ':scope > details', '.eisenhower-analysis', '.eisenhower-backup'].forEach(selector => { const el = app.querySelector(selector); if (el) progress.append(el); });
    views.push(button('tasks', 'Tarefas', () => { show(work); board.classList.add('workspace-list'); filter.hidden = false; filterBoard(); }));
    views.push(button('matrix', 'Matriz', () => { show(work); board.classList.remove('workspace-list'); filter.hidden = true; board.querySelectorAll('[data-quadrant]').forEach(el => { el.hidden = false; }); }));
    views.push(button('progress', 'Progresso', () => show(progress)));
    // Keep the full form available while making optional details a deliberate choice.
    const form = document.querySelector('#eisenhower-task-form');
    const extra = make('details', 'workspace-extra'); extra.append(make('summary', '', 'Descrição, categoria e prazo'));
    const description = form.querySelector('textarea').closest('label');
    description.before(extra); extra.append(description, form.querySelector('.eisenhower-form-grid'));
    document.querySelector('#eisenhower-editor').addEventListener('close', () => { extra.open = false; });
    app.addEventListener('click', event => { if (event.target.closest('[data-action="edit"]')) extra.open = true; });
    views.forEach(view => view.btn.setAttribute('aria-controls', view.btn.dataset.workspaceView === 'progress' ? progress.id : work.id));
    select(matchMedia('(min-width: 768px)').matches ? 'matrix' : 'tasks');
  } else {
    const activities = panel('activities', 'Suas atividades');
    const reports = panel('reports', 'Relatórios e backups');
    const create = panel('create', 'Criar ou editar atividade');
    const grid = app.querySelector('.tool-grid');
    create.append(grid.querySelector('.tool-panel')); activities.append(grid.querySelector('.activities-panel')); grid.remove();
    reports.append(app.querySelector('#relatorios'), app.querySelector('.data-panel'));
    reports.querySelectorAll('.table-scroll').forEach(el => {
      el.tabIndex = 0; el.setAttribute('role', 'region');
      el.setAttribute('aria-label', el.closest('section')?.querySelector('h3')?.textContent || 'Tabela do relatório');
    });
    const filters = activities.querySelector('.activity-filters');
    const filterDetails = make('details', 'workspace-extra'); filterDetails.append(make('summary', '', 'Buscar e filtrar atividades e relatórios'));
    activities.before(filterDetails); filterDetails.append(filters);
    views.push(button('activities', 'Atividades', () => { show(activities); filterDetails.hidden = false; }));
    views.push(button('create', 'Nova atividade', () => { show(create); filterDetails.hidden = true; }));
    views.push(button('reports', 'Relatórios', () => { show(reports); filterDetails.hidden = false; }));
    views.forEach((view, i) => view.btn.setAttribute('aria-controls', [activities, create, reports][i].id));
    // Reveal the existing editor before its own click handler fills and focuses it.
    activities.addEventListener('click', event => { if (event.target.closest('button')?.textContent.trim() === 'Editar') select('create'); }, true);
    const form = app.querySelector('#activity-form');
    const extra = make('details', 'workspace-extra field--wide'); extra.append(make('summary', '', 'Mais detalhes da atividade'));
    form.querySelector('.form-actions').before(extra);
    ['description', 'category', 'priority', 'startTime', 'endTime', 'status', 'notes'].forEach(id => extra.append(form.querySelector(`#${id}`).closest('.field')));
    activities.addEventListener('click', event => { if (event.target.closest('button')?.textContent.trim() === 'Editar') extra.open = true; }, true);
    form.addEventListener('submit', () => { queueMicrotask(() => { if (!form.querySelector('#title').value) { extra.open = false; select('activities'); } }); });
    app.querySelector('#form-cancel').addEventListener('click', () => select('activities'));
    document.querySelectorAll('a[href="#activity-form"]').forEach(link => link.addEventListener('click', () => select('create')));
    select('activities');
  }
  const collapse = make('button', 'compact-collapse', 'Recolher todas'); collapse.type = 'button';
  const taskArea = app.querySelector(matrix ? '#workspace-tasks' : '#workspace-activities');
  taskArea.prepend(collapse);
  collapse.addEventListener('click', () => taskArea.querySelectorAll('[data-disclosure]').forEach(el => { el.open = false; }));
  let printView, printOpen;
  window.addEventListener('beforeprint', () => {
    printView = current; printOpen = new Set([...app.querySelectorAll('[data-disclosure][open]')].map(el => el.dataset.disclosure));
    panels.forEach(el => { el.hidden = false; }); app.querySelectorAll('[data-quadrant]').forEach(el => { el.hidden = false; });
    app.querySelectorAll('[data-disclosure]').forEach(el => { el.open = true; });
  });
  window.addEventListener('afterprint', () => {
    if (printView) select(printView);
    if (printOpen) app.querySelectorAll('[data-disclosure]').forEach(el => { el.open = printOpen.has(el.dataset.disclosure); });
  });
})();
