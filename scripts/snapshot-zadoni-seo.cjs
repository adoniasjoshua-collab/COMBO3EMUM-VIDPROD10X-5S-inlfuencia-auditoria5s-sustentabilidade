// Inventário local para planejamento. Não altera páginas nem sitemap.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const base = 'https://zadonidigital.com.br';
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const tracked = execFileSync('git', ['ls-files', '-z'], {cwd: root, encoding: 'utf8'}).split('\0').filter(Boolean);
const strip = s => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const attr = (s, n) => (s.match(new RegExp('\\b' + n + '\\s*=\\s*["\x27]([^"\x27]*)["\x27]', 'i')) || [])[1] || '';
const sitemap = [...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const rows = tracked.filter(f => f.endsWith('.html')).map(file => {
  const html = read(file);
  const route = '/' + file.replace(/index\.html$/, '');
  const meta = name => {
    const tag = (html.match(/<meta\b[^>]*>/gi) || []).find(t => attr(t, 'name') === name);
    return tag ? attr(tag, 'content') : '';
  };
  const canonicalTag = (html.match(/<link\b[^>]*>/gi) || []).find(t => attr(t, 'rel') === 'canonical');
  const schemas = []; const schemaErrors = [];
  const visit = o => { if (!o || typeof o !== 'object') return; if (o['@type']) schemas.push(...[].concat(o['@type'])); Object.values(o).forEach(v => { if (Array.isArray(v)) v.forEach(visit); else if (v && typeof v === 'object') visit(v); }); };
  for (const m of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { visit(JSON.parse(m[1])); } catch(e) { schemaErrors.push(e.message); }
  }
  const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m => ({href: attr(m[1], 'href'), text: strip(m[2])}));
  const outgoing = [...new Set(links.flatMap(l => { try { const u = new URL(l.href, base + route); return l.href && u.origin === base ? [u.pathname.replace(/index\.html$/, '')] : []; } catch { return []; } }))];
  return {file, route, title: strip((html.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]||''), description: meta('description'), h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => strip(m[1])), robots: meta('robots'), canonical: canonicalTag ? attr(canonicalTag, 'href') : '', inSitemap: sitemap.includes(base + route), schema: [...new Set(schemas)], schemaErrors, outgoing, ctas: links.filter(l => /wa\.me|hotm\.|mailto:|tel:/.test(l.href)), indexation: 'Não verificada no Search Console'};
});
rows.forEach(r => { r.incoming = rows.filter(s => s.route !== r.route && s.outgoing.includes(r.route)).map(s => s.route); });
const hashes = Object.fromEntries(tracked.filter(f => !f.startsWith('docs/') && !f.endsWith('.md')).map(f => [f, crypto.createHash('sha256').update(fs.readFileSync(path.join(root, f))).digest('hex')]));
const report = {date: '2026-09-22', commit: execFileSync('git', ['rev-parse', 'HEAD'], {cwd:root,encoding:'utf8'}).trim(), scope: 'Arquivos locais; sem confirmação de publicação ou indexação', sitemap, hashes, pages: rows};
const folder = path.join(root, 'docs/seo');
fs.mkdirSync(folder, {recursive: true});
const target = path.join(folder, 'baseline-zadoni-pre-implementacao-2026-09-22.json');
if (fs.existsSync(target)) throw new Error('Baseline já existe. Preserve o original e use outro nome/data para uma nova captura.');
fs.writeFileSync(target, JSON.stringify(report, null, 2) + '\n');
const lines = ['# Inventário de rotas antes da expansão', '', 'Data: 2026-09-22. Origem: HTML local rastreado pelo Git. Indexação real não confirmada. Links únicos por página, incluindo navegação; não equivalem à contagem de ocorrências do auditor existente.', '', 'Intenção inferida do conteúdo e do título, não de pesquisa de demanda. Todas as rotas existentes devem ser preservadas. As páginas utilitárias continuam fora do sitemap.', ''];
for (const r of rows) {
  const intention = r.route === '/' ? 'Venda da Trilha/Combo Produtividade 10X' : r.route.startsWith('/ferramentas/') ? 'Uso/descoberta de ferramentas de produtividade' : r.route.startsWith('/assets/legal/') || r.route === '/404.html' ? 'Utilitária' : r.route === '/sobre/' || r.route === '/politica-editorial/' ? 'Institucional/editorial' : 'Educativa/descoberta: ' + r.title;
  lines.push('## ' + r.route, '', '- Arquivo: `' + r.file + '`', '- Title: ' + r.title, '- Meta description: ' + r.description, '- H1: ' + r.h1.join(' | '), '- Intenção: ' + intention, '- Indexabilidade local: ' + (/noindex/i.test(r.robots) ? 'não indexável (meta noindex)' : 'sem bloqueio de meta robots; depende também da resposta do servidor'), '- Indexação Google: não verificada', '- Sitemap: ' + (r.inSitemap ? 'sim' : 'não'), '- Canonical: ' + (r.canonical || 'ausente'), '- Schema (@type, inclusive entidades aninhadas): ' + r.schema.join(', '), '- CTA: ' + [...new Set(r.ctas.map(c => c.text + ' → ' + c.href))].join('; '), '- Links recebidos: ' + (r.incoming.join(', ') || 'nenhum entre os HTML inventariados'), '- Links enviados (mesmo domínio, inclui âncoras normalizadas): ' + r.outgoing.join(', '), '- Canibalização com nova oferta: baixa por diferença de intenção; não verificada por consultas. Rotas locais de mineração permanecem educativas.', '- Recomendação: preservar URL, intenção, title, H1 e canonical; integração somente contextual.', '');
}
fs.writeFileSync(path.join(folder, 'inventario-zadoni-pre-implementacao.md'), lines.join('\n'));
console.log(`${rows.length} HTML inventariados; ${sitemap.length} URLs no sitemap; ${Object.keys(hashes).length} hashes salvos.`);
