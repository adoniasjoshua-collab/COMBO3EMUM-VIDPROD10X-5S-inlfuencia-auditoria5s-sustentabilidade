const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const base = 'https://zadonidigital.com.br/';
const baseline = new Map([
  ['index.html', 'Combo Produtividade 10X — Curso Rápido com Certificação'],
  ['portal/index.html', 'Portal 5S, Produtividade e Gestão Ambiental | Produtividade 10X'],
  ['5s/index.html', 'Programa 5S: Guias Práticos para Vida, Empresas e Obras'],
  ['5s/o-que-e-5s/index.html', 'O que é 5S? Entenda os 5 Sensos e Como Aplicar na Prática'],
  ['5s/programa-5s/index.html', 'Programa 5S: Como Implantar, Acompanhar e Melhorar'],
  ['5s/5s-na-empresa/index.html', '5S na Empresa: Guia Prático para Implantar e Manter'],
  ['5s/5s-na-construcao-civil/index.html', '5S na Construção Civil: Organização e Produtividade na Obra'],
  ['5s/5s-na-vida-pessoal/index.html', '5S na Vida Pessoal: Organize Casa, Arquivos e Rotina'],
  ['produtividade/index.html', 'Produtividade: Foco, Prioridades e Gestão do Tempo'],
  ['produtividade/tecnica-pomodoro/index.html', 'Técnica Pomodoro: Como Usar para Foco e Produtividade'],
  ['produtividade/matriz-eisenhower/index.html', 'Matriz de Eisenhower: Como Priorizar Tarefas na Prática'],
  ['produtividade/gestao-do-tempo/index.html', 'Gestão do Tempo: Como Planejar Prioridades e Rotina'],
  ['produtividade/5s-e-produtividade/index.html', '5S e Produtividade: Como Organização Reduz Desperdícios'],
  ['gestao-ambiental/index.html', 'Gestão Ambiental: Fundamentos e Práticas em Obras'],
  ['gestao-ambiental/gestao-ambiental-na-construcao-civil/index.html', 'Gestão Ambiental na Construção Civil: Guia Prático'],
  ['gestao-ambiental/gestao-de-residuos/index.html', 'Gestão de Resíduos: Etapas, Segregação e Controle'],
  ['gestao-ambiental/educacao-ambiental-em-obras/index.html', 'Educação Ambiental em Obras: Como Engajar Equipes'],
  ['sobre/index.html', 'Sobre Adonias Pereira da Silva | Portal Produtividade 10X'],
  ['ferramentas/gestao-do-tempo/index.html', 'Cronômetro de Tarefas Online Grátis | Tempo 10X']
]);

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const errors = [];
const get = (html, regex) => (html.match(regex) || [])[1] || '';

for (const [file, expectedTitle] of baseline) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) { errors.push(`${file}: URL histórica removida`); continue; }
  const html = fs.readFileSync(absolute, 'utf8');
  const title = get(html, /<title>([^<]+)<\/title>/i);
  const description = get(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const canonical = get(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const slug = file === 'index.html' ? '' : file.replace(/index\.html$/, '');
  const expectedCanonical = base + slug;
  if (title !== expectedTitle) errors.push(`${file}: title histórico alterado`);
  if (!description) errors.push(`${file}: description histórica ausente`);
  if (canonical !== expectedCanonical) errors.push(`${file}: canonical histórico alterado`);
  if (!new RegExp(`<loc>${expectedCanonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/loc>`).test(sitemap)) errors.push(`${file}: URL histórica removida do sitemap`);
}

console.log(`SEO REGRESSION\n✓ ${baseline.size} URLs históricas verificadas`);
if (errors.length) {
  console.error(errors.map(error => `✗ ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('RESULTADO: URLs, titles, canonicals, descriptions e sitemap preservados.');
}
