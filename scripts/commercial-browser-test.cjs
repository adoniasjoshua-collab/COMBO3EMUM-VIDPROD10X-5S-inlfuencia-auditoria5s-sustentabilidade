const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {createRequire}=require('node:module');
const modules=process.env.ZADONI_TEST_MODULES||path.join(require('node:os').tmpdir(),'zadoni-commercial-validation/node_modules');
const external=createRequire(path.join(modules,'../package.json'));
const {chromium}=external('playwright');
const AxeBuilder=external('@axe-core/playwright').default;
const {pages}=require('./build-commercial.cjs');
const {steps,fields}=require('../assets/js/diagnostic.js');
const root=path.resolve(__dirname,'..');
const artifacts=path.join(require('node:os').tmpdir(),'zadoni-commercial-results');
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+pathname,pathname.endsWith('/')?'index.html':'');
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream');
  res.end(fs.readFileSync(file));
});
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  let browser;
  try{
    browser=await chromium.launch({executablePath:process.env.ZADONI_BROWSER||'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
    const base='http://127.0.0.1:'+server.address().port;
    const context=await browser.newContext();
    const page=await context.newPage();const errors=[],requests=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('request',r=>{if(!r.url().startsWith(base))requests.push(r.url());});
    fs.mkdirSync(artifacts,{recursive:true});
    const results=[];
    for(const width of [320,375,768,1440]){
      await page.setViewportSize({width,height:1000});
      for(const p of pages){
        await page.goto(base+'/'+p.slug);
        assert.equal(await page.locator('h1').count(),1);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${p.slug} @ ${width}`);
        const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
        assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],`Acessibilidade ${p.slug} @ ${width}`);
        results.push({route:p.slug,width,axeViolations:0});
      }
      await page.goto(base+'/servicos-digitais/');
      await page.screenshot({path:path.join(artifacts,'hub-'+width+'.png'),fullPage:true});
    }
    await page.goto(base+'/diagnostico-presenca-digital/');
    await page.getByRole('button',{name:'Continuar',exact:true}).click();
    assert.equal(await page.locator('#zd-error').textContent(),'Escolha uma opção para continuar.');
    await page.evaluate(()=>{window.testEvents=[];ZadoniEvents.configure((name,payload)=>testEvents.push({name,payload}));});
    await page.evaluate(()=>ZadoniEvents.emit('whatsapp_click',{email:'secret@example.com'}));
    assert.equal(await page.evaluate(()=>testEvents.length),0,'Sem consentimento não envia');
    await page.evaluate(()=>ZadoniEvents.setConsent(true));
    const scenarios=[
      {goal:'google',profile:'suspended',expected:'Avaliar a situação do perfil'},
      {goal:'ads',budget:'defined',expected:'Avaliar aceleração com Meta Ads'},
      {goal:'youtube',channel:'active',expected:'Organização do canal no YouTube'},
      {goal:'mentoria',experience:'start',expected:'Orientação por mentoria'},
      {goal:'google',profile:'none',expected:'Fundação local'},
      {goal:'automation',expected:'Avaliar a necessidade de atendimento'},
      {goal:'google',profile:'improve',expected:'Otimização'},
      {goal:'unknown',expected:'Avaliação inicial'},
      {goal:'google',expected:'Crescimento com prioridades'}
    ];
    for(const scenario of scenarios){
      const answers={business:'commerce',city:'canaa',profile:'active',site:'active',readiness:'ready',contact:'whatsapp',urgency:'now',ads:'no',...scenario};
      for(const key of steps(answers)){
        const value=answers[key]||fields[key][1][0][0];
        await page.locator(`input[name="${key}"][value="${value}"]`).check();
        await page.locator('form button[type="submit"]').click();
      }
      assert.equal(await page.locator('#zd-result-title').textContent(),scenario.expected);
      assert.equal(await page.evaluate(()=>document.activeElement.id),'zd-result-title');
      const wa=await page.locator('.zd-result a[data-event="whatsapp_click"]').getAttribute('href');
      assert.ok(!decodeURIComponent(wa).includes('canaa'));
      assert.ok(!decodeURIComponent(wa).includes('suspended'));
      const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      assert.deepEqual(axe.violations.map(v=>v.id),[]);
      await page.getByRole('button',{name:'Refazer diagnóstico'}).click();
    }
    const events=await page.evaluate(()=>testEvents);
    assert.equal(events.filter(e=>e.name==='diagnostic_start').length,scenarios.length);
    assert.equal(events.filter(e=>e.name==='diagnostic_complete').length,scenarios.length);
    for(const event of events)assert.ok(Object.keys(event.payload).every(k=>['page_path','service_id','flow_version','recommendation_id','placement'].includes(k)));
    await page.evaluate(()=>ZadoniEvents.emit('whatsapp_click',{placement:'hero',email:'secret@example.com',message:'private',recommendation_id:'<script>'}));
    assert.ok(!JSON.stringify(await page.evaluate(()=>testEvents)).includes('secret'));
    assert.ok(!JSON.stringify(await page.evaluate(()=>testEvents)).includes('<script>'));
    assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
    // Voltar mantém as respostas; mudar de objetivo elimina o ramo antigo.
    await page.locator('input[value="google"]').check();await page.locator('button[type="submit"]').click();
    await page.getByRole('button',{name:'Voltar',exact:true}).click();
    assert.equal(await page.locator('input[value="google"]').isChecked(),true);
    await page.locator('input[value="youtube"]').check();await page.locator('button[type="submit"]').click();
    await page.reload();
    assert.equal(await page.locator('input:checked').count(),0);
    // Fluxo completo por teclado.
    const keyboardAnswers={goal:'youtube',business:'commerce',city:'canaa',channel:'active',contact:'whatsapp',urgency:'now'};
    for(const key of steps(keyboardAnswers)){
      await page.locator(`input[name="${key}"][value="${keyboardAnswers[key]}"]`).focus();
      await page.keyboard.press('Space');await page.keyboard.press('Tab');
      if(await page.evaluate(()=>document.activeElement.type!=='submit'))await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(()=>document.activeElement.type),'submit');
      await page.keyboard.press('Enter');
    }
    // A navegação explícita por teclado deve alcançar o resultado.
    assert.ok(await page.locator('#zd-result-title').count());
    await page.screenshot({path:path.join(artifacts,'diagnostic-result.png'),fullPage:true});
    const nojs=await browser.newContext({javaScriptEnabled:false});const fallback=await nojs.newPage();
    await fallback.goto(base+'/diagnostico-presenca-digital/');
    assert.ok(await fallback.getByText('Ative o JavaScript para usar as perguntas.').isVisible());
    await nojs.close();
    assert.deepEqual(errors,[]);assert.deepEqual(requests,[],'Páginas comerciais não carregam terceiros');
    fs.writeFileSync(path.join(artifacts,'results.json'),JSON.stringify({passed:true,results,scenarios:scenarios.length,consoleErrors:errors,externalRequests:requests},null,2));
    console.log('BROWSER COMERCIAL: responsividade, axe, diagnóstico, teclado, eventos, privacidade e fallback aprovados. Evidências: '+artifacts);
  }finally{await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
