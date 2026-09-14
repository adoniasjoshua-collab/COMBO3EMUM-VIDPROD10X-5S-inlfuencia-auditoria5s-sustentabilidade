const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { createRequire } = require('node:module');
const external = createRequire(path.join(process.env.EISENHOWER_TEST_MODULES, '..', 'package.json'));
const { chromium } = external('playwright');
const AxeBuilder = external('@axe-core/playwright').default;
const root = path.resolve(__dirname, '..');
const artifacts = path.join(require('node:os').tmpdir(), 'workspace10x-validation');
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const file = path.resolve(root, '.' + decodeURIComponent(url.pathname), url.pathname.endsWith('/') ? 'index.html' : '');
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.setHeader('Content-Type', ({ '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.svg': 'image/svg+xml' })[path.extname(file)] || 'application/octet-stream');
  res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ executablePath: process.env.EISENHOWER_BROWSER || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
  try {
    fs.mkdirSync(artifacts, { recursive: true });
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    const base = `http://127.0.0.1:${server.address().port}`;
    const view = name => page.locator(`[data-workspace-view="${name}"]`).click();
    await page.goto(base + '/ferramentas/matriz-eisenhower/');
    await page.locator('.eisenhower-app:not([inert])').waitFor();
    assert.equal(await page.locator('[data-workspace-view="tasks"]').getAttribute('aria-pressed'), 'true');
    await page.locator('.workspace-focus').click();
    await page.locator('#eisenhower-add').click();
    await page.locator('[name="title"]').fill('Preparar treinamento');
    await page.locator('[name="quadrant"]').selectOption('plan');
    await page.getByRole('button', { name: 'Salvar tarefa', exact: true }).click();
    await page.locator('#workspace-quadrant').selectOption('do');
    assert.equal(await page.locator('.eisenhower-card:visible').count(), 0);
    await page.locator('#workspace-quadrant').selectOption('plan');
    assert.equal(await page.locator('.eisenhower-card:visible').count(), 1);
    await view('progress'); assert.equal(await page.locator('#eisenhower-goal').isVisible(), true);
    await view('tasks'); assert.equal(await page.locator('#workspace-quadrant').inputValue(), 'plan');
    await view('matrix'); assert.equal(await page.locator('[data-quadrant]:visible').count(), 4);
    await view('tasks');
    await page.screenshot({ path: path.join(artifacts, 'matrix-mobile.png') });
    await page.setViewportSize({ width: 1440, height: 1000 }); await view('matrix');
    await page.screenshot({ path: path.join(artifacts, 'matrix-desktop.png') });
    await page.reload(); assert.equal(await page.locator('.eisenhower-card').count(), 1);
    await page.setViewportSize({ width: 390, height: 844 }); await view('tasks');
    for (const title of ['Revisar documentos', 'Organizar materiais', 'Planejar estudos', 'Preparar reunião', 'Enviar relatório', 'Conferir equipamentos', 'Atualizar agenda']) {
      await page.locator('#eisenhower-add').click(); await page.locator('[name="title"]').fill(title);
      await page.locator('[name="quadrant"]').selectOption('plan');
      await page.getByRole('button', { name: 'Salvar tarefa', exact: true }).click();
    }
    await page.locator('#workspace-quadrant').selectOption('plan');
    const compactHeights = await page.locator('.compact-task').evaluateAll(els => els.map(el => el.getBoundingClientRect().height));
    assert.ok(compactHeights.every(height => height >= 44 && height <= 72), JSON.stringify(compactHeights));
    await page.locator('.compact-title').nth(0).click(); await page.locator('.compact-title').nth(1).click();
    assert.equal(await page.locator('.task-disclosure[open]').count(), 2);
    await page.locator('.compact-collapse').click(); assert.equal(await page.locator('.task-disclosure[open]').count(), 0);
    await page.locator('[data-action="toggle"]').first().click();
    assert.equal(await page.locator('.completed-group[open]').count(), 0);
    assert.equal(await page.locator('.compact-task:visible').count(), 7);
    await page.locator('.completed-group > summary').click();
    await page.locator('.completed-group [data-action="toggle"]').click();
    assert.equal(await page.locator('.completed-group').count(), 0);
    await page.locator('.workspace-focus').click();
    await page.screenshot({ path: path.join(artifacts, 'compact-matrix-mobile.png') });
    const compactAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    assert.deepEqual(compactAxe.violations.map(v => v.id), []);
    await view('progress');
    assert.match(await page.locator('.analytics-summary').textContent(), /8 cadastradas/);
    await page.locator('#analytics-period').selectOption('year');
    await page.getByRole('button', { name: 'Ao longo do tempo', exact: true }).click();
    assert.equal(await page.locator('.analytics-time-bar').count(), 12);
    await page.locator('#analytics-period').selectOption('month');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.getByRole('button', { name: 'Por área', exact: true }).click();
    await page.locator('.analytics-area-bar').click();
    assert.equal(await page.locator('.analytics-drilldown li').count(), 8);
    await page.getByRole('button', { name: 'Voltar aos gráficos', exact: true }).click();
    await page.locator('#analytics-status').selectOption('done');
    assert.match(await page.locator('.analytics-summary').textContent(), /0 cadastradas/);
    await page.locator('#analytics-status').selectOption('');
    const analyticsAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    assert.deepEqual(analyticsAxe.violations.map(v => v.id), []);
    await page.evaluate(() => document.activeElement.blur());
    await page.locator('.task-analytics').screenshot({ path: path.join(artifacts, 'analytics-matrix-mobile.png') });
    await page.getByRole('button', { name: 'Ao longo do tempo', exact: true }).click();
    await page.locator('.task-analytics').screenshot({ path: path.join(artifacts, 'analytics-time-mobile.png') });
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const period of ['day', 'week', 'month', 'year']) {
        await page.locator('#analytics-period').selectOption(period);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `analytics ${period} ${width}`);
      }
    }
    await page.locator('.task-analytics').screenshot({ path: path.join(artifacts, 'analytics-desktop.png') });
    await page.goto(base + '/ferramentas/gestao-do-tempo/');
    await page.locator('[data-workspace-view="activities"]').waitFor();
    await view('create');
    await page.locator('#title').fill('Revisar plano de trabalho');
    await page.locator('#form-submit').click();
    assert.equal(await page.locator('#workspace-activities').isVisible(), true);
    await page.locator('.activity-card .compact-title').click(); await page.getByRole('button', { name: 'Editar', exact: true }).click();
    assert.equal(await page.locator('#workspace-create').isVisible(), true);
    assert.equal(await page.locator('#title').inputValue(), 'Revisar plano de trabalho');
    await page.locator('#title').fill('Revisar plano da equipe');
    await page.locator('#form-submit').click();
    await page.getByRole('button', { name: 'Iniciar cronômetro: Revisar plano da equipe', exact: true }).click();
    assert.equal(await page.locator('#active-timer').isVisible(), true);
    await page.locator('.task-disclosure').evaluate(el => { el.open = true; });
    await page.getByRole('button', { name: 'Pausar cronômetro: Revisar plano da equipe', exact: true }).click();
    assert.equal(await page.locator('.task-disclosure[open]').count(), 1);
    await page.getByRole('button', { name: 'Retomar cronômetro: Revisar plano da equipe', exact: true }).click();
    await page.locator('.compact-collapse').click();
    await view('reports'); assert.equal(await page.locator('#active-timer').isVisible(), true);
    await page.locator('#timer-pause').click(); await page.locator('#timer-resume').click();
    await page.locator('#timer-finish').click();
    await page.reload(); await view('activities');
    assert.match(await page.locator('#activity-list').textContent(), /Revisar plano da equipe/);
    assert.equal(await page.locator('.completed-group').getAttribute('open'), null);
    await page.locator('.completed-group > summary').click();
    await page.locator('.workspace-focus').click();
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const name of ['activities', 'create', 'reports']) {
        await view(name);
        if (name === 'reports') assert.match(await page.locator('.analytics-summary').textContent(), /1 cadastradas/);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name} overflow ${width}`);
        if ([390, 1440].includes(width)) {
          const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          assert.deepEqual(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], `axe ${name} ${width}`);
        }
      }
      await view('activities');
      if ([390, 1440].includes(width)) await page.screenshot({ path: path.join(artifacts, `tempo-${width}.png`) });
    }
    assert.deepEqual(errors, []);
    console.log(`WORKSPACE: navegação, criação, edição, filtros da matriz, persistência, timer, responsividade e axe aprovados. ${artifacts}`);
  } finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; server.close(); });
