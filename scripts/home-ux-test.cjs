const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),http=require('node:http');
const {createRequire}=require('node:module');
const external=createRequire(path.join(os.tmpdir(),'zadoni-commercial-validation/package.json'));
const {chromium}=external('playwright'),AxeBuilder=external('@axe-core/playwright').default;
const root=path.resolve(__dirname,'..'),out=path.join(root,'docs/seo/home-ux-validation');
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');let file=path.resolve(root,'.'+decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;try{
  browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});const context=await browser.newContext();
  const page=await context.newPage(),base='http://127.0.0.1:'+server.address().port,errors=[],results=[];
  page.on('pageerror',e=>errors.push(e.message));fs.mkdirSync(out,{recursive:true});
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:900});await page.goto(base+'/',{waitUntil:'networkidle'});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow '+width);
    const top=await page.locator('.home-action').boundingBox();assert.ok(top.y+top.height<900,'Serviços visíveis na primeira tela '+width);
    assert.equal(await page.locator('h1').count(),1);
    const links=await page.locator('.home-discovery a').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
    for(const route of ['./servicos-digitais/','./diagnostico-presenca-digital/','./ferramentas/matriz-eisenhower/','./ferramentas/gestao-do-tempo/','./cases/zadoni-digital/','./cases/zadoni-presentes/'])assert.ok(links.includes(route),route);
    const axe=await new AxeBuilder({page}).include('.home-header').include('.home-discovery').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],'Acessibilidade '+width);
    if(width<=1100){
      const toggle=page.locator('.home-menu-toggle');await toggle.focus();await page.keyboard.press('Enter');
      assert.equal(await toggle.getAttribute('aria-expanded'),'true');
      const a=page.locator('#primary-nav a').first();assert.ok(await a.isVisible());
      assert.ok(await a.evaluate(el=>{const b=el.getBoundingClientRect();return el.contains(document.elementFromPoint(b.x+b.width/2,b.y+b.height/2));}),'Menu não pode ficar atrás de overlay');
      await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Serviços');
      await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert.ok(await toggle.evaluate(el=>el===document.activeElement));
      await toggle.click();await page.locator('#primary-nav a[href="#home-cases"]').click();assert.equal(await toggle.getAttribute('aria-expanded'),'false');
      await page.goto(base+'/',{waitUntil:'networkidle'});
    }
    // Captura limpa depois de testar a página com o estado inicial de consentimento.
    if(await page.locator('#cookieBanner.show').count())await page.locator('#cookieAccept').click();
    await page.screenshot({path:path.join(out,'home-'+width+'.png')});
    results.push({width,servicesTop:Math.round(top.y),overflow:false,axeViolations:0});
  }
  await page.locator('.home-action').click();await page.waitForURL('**/servicos-digitais/');
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}}),fallback=await nojs.newPage();await fallback.goto(base+'/');assert.ok(await fallback.locator('#primary-nav a').first().isVisible());await nojs.close();
  assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:true,scope:'Header e acessos novos; não certifica seções antigas do curso',results,consoleErrors:errors},null,2));console.log('HOME UX: cinco larguras, menu por teclado, destinos, contraste e acesso sem JavaScript aprovados.');
}finally{await browser?.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
