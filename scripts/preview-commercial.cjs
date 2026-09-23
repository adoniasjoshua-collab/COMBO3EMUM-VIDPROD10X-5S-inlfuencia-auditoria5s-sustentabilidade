// Prévia local somente leitura; não publica nem reproduz regras da hospedagem.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json'};
const server = http.createServer((req, res) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end(); return; }
  let file = path.resolve(root, '.' + pathname);
  const relative = path.relative(root, file).replaceAll('\\', '/');
  if (!file.startsWith(root + path.sep) && file !== root || relative.split('/').some(s => s.startsWith('.')) || /^(scripts|docs)(\/|$)/.test(relative)) { res.writeHead(404); res.end(); return; }
  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(302, {Location:pathname + '/'}); res.end(); return; }
      file = path.join(file, 'index.html');
    }
    const mime = types[path.extname(file).toLowerCase()];
    if (!mime || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
      res.end(req.method === 'HEAD' ? '' : fs.readFileSync(path.join(root, '404.html'))); return;
    }
    res.writeHead(200, {'Content-Type':mime});
    res.end(req.method === 'HEAD' ? '' : fs.readFileSync(file));
  } catch { res.writeHead(500); res.end('Falha ao ler o arquivo da prévia.'); }
});
server.listen(0, '127.0.0.1', () => console.log(`Prévia local: http://127.0.0.1:${server.address().port}/servicos-digitais/`));
