const assert = require('node:assert/strict');
const fs = require('node:fs');
const crypto = require('node:crypto');
const {execFileSync} = require('node:child_process');
const path = require('node:path');
process.chdir(path.resolve(__dirname,'..'));
const {steps,recommend}=require('../assets/js/diagnostic.js');
const base={goal:'google',business:'commerce',city:'canaa',profile:'active',site:'active',readiness:'ready',contact:'whatsapp',urgency:'now'};
for(const [change,expected]of [
  [{profile:'suspended'},'review'],[{profile:'none'},'foundation'],[{profile:'improve'},'optimization'],[{},'growth'],
  [{goal:'ads',budget:'defined'},'acceleration'],[{goal:'ads',budget:'planning'},'unknown'],[{goal:'youtube'},'youtube'],
  [{goal:'mentoria'},'mentoria'],[{goal:'unknown'},'unknown'],[{goal:'automation'},'future'],[{site:'unknown'},'unknown'],
  [{goal:'site',site:'none'},'foundation'],[{goal:'ads',profile:'suspended',budget:'defined'},'review'],
  [{goal:'youtube',profile:'suspended'},'youtube']
]) assert.equal(recommend({...base,...change}).id,expected,JSON.stringify(change));
assert.ok(recommend({...base,city:'remote'}).region);
assert.ok(!steps({goal:'youtube'}).includes('profile'));
assert.ok(!steps({goal:'mentoria'}).includes('budget'));
assert.ok(steps({goal:'ads'}).includes('budget'));
const snapshot=JSON.parse(fs.readFileSync('docs/seo/baseline-zadoni-pre-implementacao-2026-09-22.json','utf8'));
const allowed=new Set(['index.html','portal/index.html','sitemap.xml','scripts/build-portal.js']);
for(const [file,hash]of Object.entries(snapshot.hashes)){
  if(allowed.has(file))continue;
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),hash,'Arquivo histórico alterado: '+file);
}
for(const [file,addition]of [
  ['index.html','              <li><a class="footer-link" href="./servicos-digitais/">Serviços digitais — Zadoni Digital</a></li>\n'],
  ['portal/index.html','<li><a href="../servicos-digitais/">Serviços digitais — Zadoni Digital</a></li>']
]){
  const normalize=s=>s.replace(/\r\n/g,'\n');
  const before=normalize(execFileSync('git',['show',snapshot.commit+':'+file],{encoding:'utf8'}));
  const after=normalize(fs.readFileSync(file,'utf8'));
  if(file === 'index.html') {
    const withoutHomeNavigation = html => html
      .replace(/home-portal\.css\?v=[^" ]+/g, "home-portal.css")
      .replace(/(<a class="(?:footer-whats|social-icon whatsapp|whatsapp-float)" href=")[^"]+"/g, '$1CONTACT"')
      .replace(/<span class="whatsapp-float__label">[^<]+<\/span>/g, '<span class="whatsapp-float__label">CONTACT</span>')
      .replace('    <link rel="stylesheet" href="./assets/css/home-portal.css" />\n','')
      .replace('    <script src="./assets/js/home-portal.js" defer></script>\n','')
      .replace('<body class="home-portal">','<body>')
      .replace(/    <!-- HEADER -->[\s\S]*?    <main>/,'    <main>')
      .replace(/      <!-- HOME DISCOVERY START -->[\s\S]*?      <!-- HOME DISCOVERY END -->\n/,'');
    assert.equal(withoutHomeNavigation(after.replace(addition,'')),withoutHomeNavigation(before),'Home: preservar metadados e todo o conteúdo histórico do curso fora da navegação autorizada');
  } else assert.equal(after.replace(addition,'').replace(/<nav[^>]*data-zadoni-access>[\s\S]*?<\/nav>\n/,''),before,'Só o link comercial é permitido em '+file);
}
const sitemap=fs.readFileSync('sitemap.xml','utf8');
for(const url of snapshot.sitemap)assert.ok(sitemap.includes('<loc>'+url+'</loc>'),'URL histórica removida '+url);
for(const p of snapshot.pages){
  const html=fs.readFileSync(p.file,'utf8');
  assert.ok(html.includes('<title>'+p.title+'</title>'),'Title histórico: '+p.route);
  if(p.canonical)assert.ok(html.includes(p.canonical),'Canonical histórico: '+p.route);
}
const about=fs.readFileSync('sobre/index.html');
assert.deepEqual(fs.readFileSync('scripts/templates/sobre.template'),about,'Fonte do Sobre deve preservar HTML aprovado');
console.log('COMERCIAL: diagnóstico, 34 URLs e arquivos históricos protegidos; home com navegação autorizada e conteúdo do curso preservado.');
