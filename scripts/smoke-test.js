const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const remoteBase = 'https://zadonidigital.com.br/';
const slugs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1].slice(remoteBase.length));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.webmanifest':'application/manifest+json'};

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  let target = path.join(root, pathname);
  if (pathname.endsWith('/')) target = path.join(target, 'index.html');
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    response.writeHead(404, {'content-type':'text/html; charset=utf-8'});
    response.end(fs.readFileSync(path.join(root, '404.html')));
    return;
  }
  response.writeHead(200, {'content-type': mime[path.extname(target)] || 'application/octet-stream'});
  response.end(fs.readFileSync(target));
});

server.listen(0, '127.0.0.1', async () => {
  const {port} = server.address();
  const failures = [];
  for (const slug of slugs) {
    const response = await fetch(`http://127.0.0.1:${port}/${slug}`);
    const text = await response.text();
    if (response.status !== 200) failures.push(`${slug || '/'} retornou ${response.status}`);
    if (!text.toLowerCase().includes('<!doctype html>')) failures.push(`${slug || '/'} não retornou HTML`);
  }
  const missing = await fetch(`http://127.0.0.1:${port}/pagina-inexistente/`);
  if (missing.status !== 404 || !(await missing.text()).includes('Conteúdo não encontrado')) failures.push('404 personalizada falhou');
  server.close();
  if (failures.length) {
    console.error(`SMOKE TEST: reprovado\n${failures.join('\n')}`);
    process.exitCode = 1;
  } else {
    console.log(`SMOKE TEST: aprovado — ${slugs.length} páginas com HTTP 200 e 404 personalizada validada.`);
  }
});
