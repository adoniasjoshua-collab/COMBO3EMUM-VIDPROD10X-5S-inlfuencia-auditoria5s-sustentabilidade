const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const base = 'https://zadonidigital.com.br/';
const errors = [];
const warnings = [];
const info = [];

const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const strip = html => html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const get = (html, regex) => (html.match(regex) || [])[1] || '';
const fail = (file, message) => errors.push(`${file}: ${message}`);
const warn = (file, message) => warnings.push(`${file}: ${message}`);

const sitemap = read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const files = urls.map(url => {
  const slug = url.slice(base.length);
  return slug ? `${slug}index.html` : 'index.html';
});
const titles = new Map();
const canonicals = new Set();
const inbound = new Map(files.map(file => [file, 0]));

function resolveInternal(source, href) {
  if (/^(?:https?:|mailto:|tel:|#|javascript:)/i.test(href)) return null;
  const clean = decodeURIComponent(href.split('#')[0].split('?')[0]);
  if (!clean) return null;
  let target = path.resolve(root, path.dirname(source), clean);
  if (clean.endsWith('/')) target = path.join(target, 'index.html');
  else if (!path.extname(target) && fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  return path.relative(root, target).replaceAll('\\', '/');
}

for (const file of files) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) { fail(file, 'URL do sitemap não possui arquivo local'); continue; }
  const html = read(file);
  const title = get(html, /<title>([^<]+)<\/title>/i);
  const description = get(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonical = get(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const robots = get(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
  const h1s = [...html.matchAll(/<h1\b/gi)].length;
  const expectedCanonical = base + (file === 'index.html' ? '' : file.replace(/index\.html$/, ''));
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map(match => match[1]);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
  const words = strip(get(html, /(<main\b[\s\S]*?<\/main>)/i)).split(/\s+/).filter(Boolean).length;

  if (!/^<\!doctype html>/i.test(html.trim())) fail(file, 'doctype ausente');
  if (!/<html\s+lang="pt-BR"/i.test(html)) fail(file, 'lang pt-BR ausente');
  if (!title) fail(file, 'title ausente');
  else if (titles.has(title)) fail(file, `title duplicado com ${titles.get(title)}`);
  else titles.set(title, file);
  if (!description || description.length < 100 || description.length > 180) warn(file, `meta description com ${description.length} caracteres`);
  if (canonical !== expectedCanonical) fail(file, `canonical incorreto: ${canonical}`);
  if (canonicals.has(canonical)) fail(file, 'canonical duplicado');
  canonicals.add(canonical);
  if (!robots.includes('index,follow')) fail(file, 'robots index,follow ausente');
  if (h1s !== 1) fail(file, `esperado 1 H1; encontrado ${h1s}`);
  if (!/property="og:title"/i.test(html) || !/property="og:image"/i.test(html)) fail(file, 'Open Graph incompleto');
  if (!/name="twitter:card"/i.test(html)) fail(file, 'Twitter Card ausente');
  if (!/application\/ld\+json/i.test(html)) fail(file, 'JSON-LD ausente');
  for (const block of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(block[1]); } catch (error) { fail(file, `JSON-LD inválido: ${error.message}`); }
  }
  for (const image of images) {
    if (!/\salt=(?:"[^"]*"|'[^']*')/i.test(image)) fail(file, `imagem sem alt: ${image.slice(0, 90)}`);
  }
  const internal = links.map(href => [href, resolveInternal(file, href)]).filter(([,target]) => target);
  if (internal.length < 3) warn(file, `somente ${internal.length} links internos`);
  for (const [href, target] of internal) {
    const targetAbs = path.join(root, target);
    if (!fs.existsSync(targetAbs)) fail(file, `link quebrado ${href} -> ${target}`);
    const fragment = href.includes('#') ? decodeURIComponent(href.split('#')[1]) : '';
    if (fragment && fs.existsSync(targetAbs)) {
      const targetHtml = fs.readFileSync(targetAbs, 'utf8');
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`(?:id|name)=["']${escaped}["']`, 'i').test(targetHtml)) fail(file, `âncora ausente ${href}`);
    }
    if (inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
  }
  for (const match of html.matchAll(/<(?:img|script|link)\b[^>]*(?:src|href)="([^"]+)"/gi)) {
    const ref = match[1];
    if (/^(?:https?:|data:|#)/i.test(ref)) continue;
    const local = resolveInternal(file, ref);
    if (local && !fs.existsSync(path.join(root, local))) fail(file, `asset local ausente ${ref}`);
  }
  if (file !== 'index.html' && words < 250) warn(file, `conteúdo curto: ${words} palavras no main`);
}

for (const [file, count] of inbound) {
  if (file !== 'index.html' && file !== 'portal/index.html' && count === 0) fail(file, 'página órfã');
}

for (const required of ['robots.txt', 'sitemap.xml', '404.html', 'manifest.webmanifest', 'assets/css/portal.css', 'assets/js/portal.js']) {
  if (!fs.existsSync(path.join(root, required))) fail(required, 'arquivo obrigatório ausente');
}

info.push(`${files.length} URLs auditadas`);
info.push(`${titles.size} títulos únicos`);
info.push(`${[...inbound.values()].reduce((sum, value) => sum + value, 0)} links internos entre URLs indexáveis`);
console.log(`SEO AUDIT\n${info.map(line => `✓ ${line}`).join('\n')}`);
if (warnings.length) console.log(`\nAVISOS (${warnings.length})\n${warnings.map(line => `! ${line}`).join('\n')}`);
if (errors.length) {
  console.error(`\nERROS (${errors.length})\n${errors.map(line => `✗ ${line}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('\nRESULTADO: aprovado sem erros críticos.');
}
