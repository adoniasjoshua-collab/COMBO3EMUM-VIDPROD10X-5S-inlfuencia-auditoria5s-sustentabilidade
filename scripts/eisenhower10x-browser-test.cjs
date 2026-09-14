// Dependências apenas de teste: EISENHOWER_TEST_MODULES aponta para node_modules com playwright e @axe-core/playwright.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { createRequire } = require('node:module');
const dependencyRoot = process.env.EISENHOWER_TEST_MODULES;
if (!dependencyRoot) throw new Error('Defina EISENHOWER_TEST_MODULES para as dependências externas de teste.');
const external = createRequire(path.join(dependencyRoot, '..', 'package.json'));
const { chromium } = external('playwright');
const AxeBuilder = external('@axe-core/playwright').default;
const root = path.resolve(__dirname, '..');
const artifacts = process.env.EISENHOWER_TEST_ARTIFACTS || path.join(require('node:os').tmpdir(), 'eisenhower10x-validation-artifacts');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }); res.end(fs.readFileSync(file));
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/ferramentas/matriz-eisenhower/`;
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.EISENHOWER_BROWSER || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'en-US', timezoneId: 'America/Sao_Paulo', acceptDownloads: true });
    const page = await context.newPage(), errors = [];
    await page.addInitScript(() => {
      window.eisenhowerTestCLS = 0;
      new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.eisenhowerTestCLS += entry.value; }).observe({ type: 'layout-shift', buffered: true });
    });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url); await page.locator('.eisenhower-app:not([inert])').waitFor();
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const initialCLS = await page.evaluate(() => window.eisenhowerTestCLS);
    assert.ok(initialCLS <= .1, `CLS inicial local: ${initialCLS}`);
    const reveal = async selector => {
      const target = page.locator(selector).first();
      await target.evaluate(el => { for (let p = el.parentElement; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true; });
      return target;
    };
    const read = async selector => (await page.locator(selector).textContent()).trim();
    const view = async name => page.locator(`[data-workspace-view="${name}"]`).click();
    const add = async (title, quadrant = 'plan') => { await view('matrix'); await page.locator('#eisenhower-add').click(); await page.locator('[name="title"]').fill(title); await page.locator('[name="quadrant"]').selectOption(quadrant); await page.locator('#eisenhower-task-form .workspace-extra summary').click(); await page.locator('textarea[name="description"]').fill('Revisar material e combinar a próxima ação.'); await page.locator('[name="category"]').fill('Trabalho'); await page.locator('[name="dueDate"]').fill('30/09/2026'); await page.getByRole('button', { name: 'Salvar tarefa', exact: true }).click(); };
    await add('Preparar treinamento');
    assert.equal(await read('#eisenhower-xp'), '1 XP');
    // Formato brasileiro mesmo quando o navegador usa en-US; armazenamento continua ISO.
    await (await reveal('[data-action="edit"]')).click();
    assert.equal(await page.locator('[name="dueDate"]').inputValue(), '30/09/2026');
    await page.locator('[name="dueDate"]').fill('31/02/2026');
    await page.getByRole('button', { name: 'Salvar tarefa', exact: true }).click();
    assert.equal(await page.locator('#eisenhower-editor').evaluate(el => el.open), true);
    assert.match(await read('#eisenhower-form-error'), /dd\/mm\/aaaa/);
    await page.locator('#eisenhower-date-button').click(); await page.keyboard.press('Escape');
    assert.equal(await page.locator('#eisenhower-editor').evaluate(el => el.open), true, 'Escape fecha calendário antes do formulário');
    await page.locator('#eisenhower-date-picker').evaluate(el => { el.value = '2026-09-13'; el.dispatchEvent(new Event('change', { bubbles: true })); });
    assert.equal(await page.locator('[name="dueDate"]').inputValue(), '13/09/2026');
    await page.getByRole('button', { name: 'Salvar tarefa', exact: true }).click();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('eisenhower10x.tasks'))[0].dueDate), '2026-09-13');
    await (await reveal('[data-action="edit"]')).click(); await page.locator('[name="title"]').fill('Preparar treinamento da equipe'); await page.locator('[name="status"]').selectOption('in_progress'); await page.getByRole('button', { name: 'Salvar tarefa', exact: true }).click(); assert.equal(await read('[data-stat="in_progress"]'), '1');
    await (await reveal('[data-action="toggle"]')).click(); assert.equal(await read('#eisenhower-xp'), '7 XP');
    await (await reveal('[data-action="toggle"]')).click(); await (await reveal('[data-action="toggle"]')).click(); assert.equal(await read('#eisenhower-xp'), '7 XP');
    await page.reload(); await page.locator('.eisenhower-card').waitFor({ state: 'attached' }); assert.equal(await read('#eisenhower-xp'), '7 XP');
    await (await reveal('[data-move]')).selectOption('do'); assert.equal(await page.locator('#eisenhower-list-do .eisenhower-card').count(), 1);
    await (await reveal('[data-drag]')).dragTo(page.locator('[data-quadrant="delegate"] h3')); assert.equal(await page.locator('#eisenhower-list-delegate .eisenhower-card').count(), 1);
    await page.locator('#eisenhower-add').click(); await page.locator('[name="title"]').fill('Tarefa classificada'); await page.locator('#eisenhower-assistant summary').click(); await page.locator('[name="important"]').selectOption('yes'); await page.locator('[name="urgent"]').selectOption('no'); await page.locator('#eisenhower-classify').click(); assert.equal(await page.locator('[name="quadrant"]').inputValue(), 'plan'); await page.getByRole('button', { name: 'Salvar tarefa', exact: true }).click();
    await view('progress'); await page.locator('#eisenhower-goal').fill('5'); await page.locator('#eisenhower-goal').press('Tab'); assert.equal(await read('#eisenhower-today'), '1 / 5');
    const downloadPromise = page.waitForEvent('download'); await page.locator('#eisenhower-export').click(); const download = await downloadPromise; const backupPath = await download.path(); const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8')); assert.equal(backup.tasks.length, 2); await view('matrix');
    await (await reveal('[data-action="delete"]')).click(); await page.locator('#eisenhower-confirm-cancel').click(); assert.equal(await page.locator('.eisenhower-card').count(), 2);
    await (await reveal('[data-action="delete"]')).click(); await page.locator('#eisenhower-confirm-ok').click(); assert.equal(await page.locator('.eisenhower-card').count(), 1);
    await page.locator('#eisenhower-import-file').setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{broken') }); await page.waitForFunction(() => document.querySelector('#eisenhower-feedback').textContent.includes('JSON inválido')); assert.equal(await page.locator('.eisenhower-card').count(), 1);
    await page.locator('#eisenhower-import-file').setInputFiles(backupPath); await page.locator('#eisenhower-confirm-ok').click(); assert.equal(await page.locator('.eisenhower-card').count(), 2); assert.equal(await read('#eisenhower-xp'), '8 XP');
    await page.reload(); await page.locator('.eisenhower-card').first().waitFor({ state: 'attached' }); assert.equal(await page.locator('#eisenhower-goal').inputValue(), '5');
    await add('<img src=x onerror=alert(1)>', 'eliminate'); assert.equal(await page.locator('.eisenhower-card img').count(), 0);
    await (await reveal('#eisenhower-list-eliminate [data-action="edit"]')).click(); await page.locator('[name="title"]').fill('Avaliar relatório duplicado'); await page.getByRole('button', { name: 'Salvar tarefa', exact: true }).click();
    await add('Revisar o plano de ação', 'do');
    fs.mkdirSync(artifacts, { recursive: true });
    for (const width of [320, 360, 375, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow em ${width}`);
      const boxes = await page.locator('.eisenhower-quadrant').evaluateAll(nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width }; }));
      assert.equal(boxes[0].y === boxes[1].y, width >= 768, `layout em ${width}`);
      await page.locator('#eisenhower-add').click(); assert.ok(await page.evaluate(() => { const r = document.querySelector('#eisenhower-editor').getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; }));
      await page.keyboard.press('Escape'); assert.equal(await page.locator('#eisenhower-editor').evaluate(el => el.open), false);
      assert.equal(await page.evaluate(() => document.activeElement.id), 'eisenhower-add');
      if ([320, 1440].includes(width)) {
        await page.evaluate(() => { document.activeElement.blur(); document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
        await page.screenshot({ path: path.join(artifacts, `matrix-${width}.png`), fullPage: true });
        await page.locator('#eisenhower-board').scrollIntoViewIfNeeded();
        await page.screenshot({ path: path.join(artifacts, `board-${width}.png`) });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 }); await (await reveal('#eisenhower-list-do [data-move]')).selectOption('plan');
    const mobileAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze(); assert.deepEqual(mobileAxe.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })), [], 'axe mobile');
    await page.locator('#eisenhower-add').click();
    const dialogAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze(); assert.deepEqual(dialogAxe.violations.map(item => item.id), [], 'axe diálogo');
    for (let i = 0; i < 20; i++) { await page.keyboard.press('Tab'); assert.ok(await page.evaluate(() => document.querySelector('#eisenhower-editor').contains(document.activeElement)), 'foco contido no diálogo'); }
    await page.keyboard.press('Escape');
    await page.setViewportSize({ width: 1440, height: 1000 });
    const desktopAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze(); assert.deepEqual(desktopAxe.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) })), []);
    await page.emulateMedia({ media: 'print' }); assert.equal(await page.locator('#eisenhower-add').isVisible(), false); assert.equal(await page.locator('.eisenhower-card').first().isVisible(), true); await page.pdf({ path: path.join(artifacts, 'matrix-print.pdf'), format: 'A4', printBackground: true }); await page.emulateMedia({ media: 'screen' });
    await view('progress'); await page.locator('#eisenhower-clear').click(); await page.locator('#eisenhower-confirm-cancel').click(); assert.equal(await page.locator('.eisenhower-card').count(), 4);
    await page.evaluate(() => localStorage.setItem('tempo10x.test-sentinel', 'keep'));
    await view('progress'); await page.locator('#eisenhower-clear').click(); await page.locator('#eisenhower-confirm-ok').click(); assert.equal(await page.locator('.eisenhower-card').count(), 0); assert.equal(await read('#eisenhower-xp'), '0 XP'); assert.equal(await page.evaluate(() => localStorage.getItem('tempo10x.test-sentinel')), 'keep');
    await page.evaluate(() => { localStorage.setItem('eisenhower10x.tasks', '{broken'); }); await page.reload(); await page.locator('.eisenhower-app:not([inert])').waitFor(); assert.equal(await page.locator('#eisenhower-storage-warning').isVisible(), true); await add('Sessão temporária'); assert.equal(await page.evaluate(() => localStorage.getItem('eisenhower10x.tasks')), '{broken');
    // Backup de versão futura deve ser recusado sem abrir confirmação ou alterar a sessão.
    await page.locator('#eisenhower-import-file').setInputFiles({ name: 'future.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify({ ...backup, schemaVersion: 99 })) });
    await page.waitForFunction(() => document.querySelector('#eisenhower-feedback').textContent.includes('Versão'));
    assert.equal(await page.locator('.eisenhower-card').count(), 1);
    assert.equal(await page.locator('#eisenhower-confirm').evaluate(el => el.open), false);
    // Duas abas: a aba anterior fica temporária e não sobrescreve a nova versão.
    await view('progress'); await page.locator('#eisenhower-clear').click(); await page.locator('#eisenhower-confirm-ok').click();
    const secondTab = await context.newPage(); await secondTab.goto(url); await secondTab.locator('.eisenhower-app:not([inert])').waitFor();
    await secondTab.evaluate(() => localStorage.setItem('eisenhower10x.schemaVersion', '99'));
    await page.waitForFunction(() => document.querySelector('#eisenhower-storage-warning').textContent.includes('outra aba'));
    await add('Não sobrescrever outra aba'); assert.equal(await page.evaluate(() => localStorage.getItem('eisenhower10x.schemaVersion')), '99');
    await secondTab.close();
    // Quota no browser: a tarefa permanece visível/exportável e o aviso persiste.
    await view('progress'); await page.locator('#eisenhower-clear').click(); await page.locator('#eisenhower-confirm-ok').click();
    await page.evaluate(() => { Storage.prototype.setItem = function () { throw new DOMException('quota', 'QuotaExceededError'); }; });
    await add('Backup necessário'); assert.equal(await page.locator('.eisenhower-card').count(), 1); assert.match(await read('#eisenhower-storage-warning'), /não conseguiu salvar/);
    // Pointer touch real via CDP no Chrome: mover pela alça entre quadrantes em tablet.
    const touchContext = await browser.newContext({ viewport: { width: 1024, height: 1000 }, hasTouch: true, isMobile: true });
    const tablet = await touchContext.newPage(); await tablet.goto(url); await tablet.locator('.eisenhower-app:not([inert])').waitFor();
    await tablet.locator('#eisenhower-add').click(); await tablet.locator('[name="title"]').fill('Movimento no tablet'); await tablet.getByRole('button', { name: 'Salvar tarefa', exact: true }).click();
    await tablet.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('#eisenhower-board').scrollIntoView(); window.scrollBy(0, -100); });
    await tablet.locator('.compact-title').click();
    const handle = await tablet.locator('[data-drag]').boundingBox(), destination = await tablet.locator('[data-quadrant="plan"] h3').boundingBox();
    const cdp = await touchContext.newCDPSession(tablet);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: handle.x + 20, y: handle.y + 20 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: destination.x + 20, y: destination.y + 20 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    assert.equal(await tablet.locator('#eisenhower-list-plan .eisenhower-card').count(), 1, 'arraste touch'); await touchContext.close();
    assert.deepEqual(errors, [], 'sem exceções no navegador');
    fs.writeFileSync(path.join(artifacts, 'results.json'), JSON.stringify({ browser: browser.version(), widths: [320,360,375,390,768,1024,1440], axeViolations: 0, initialCLS, browserErrors: errors, passed: true }, null, 2));
    console.log(`BROWSER: CRUD, assistente, drag, select, refresh, backup, restore, XP, meta, exclusão, corrupção, teclado, axe, 7 larguras e impressão aprovados. Evidências: ${artifacts}`);
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
