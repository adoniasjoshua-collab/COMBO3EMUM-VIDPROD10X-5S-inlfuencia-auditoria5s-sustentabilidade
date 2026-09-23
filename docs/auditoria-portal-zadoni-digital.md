# Auditoria pré-implementação — Portal Zadoni Digital

Data: 22/09/2026. Escopo: inspeção e preparação; sem implementação de páginas, commit, push ou deploy.

## Objetivo autorizado

Complementar o portal com serviços de SEO Local, Perfil da Empresa no Google, sites, Meta Ads, otimização de canais do YouTube e mentoria em SEO e tráfego pago. Incluir Zadoni Presentes como negócio próprio do criador, conforme informação do proprietário nesta conversa. Preservar o patrimônio editorial, comercial e técnico existente. Não substituir a home pela página de agência.

## Evidência e limites

- Branch: `seo/portal-educacao-v1`; commit inicial: `241acf1313bca1ff9761f41e685b4337a339d706`. Árvore de trabalho limpa no início.
- Nenhum `AGENTS.md` encontrado na listagem do projeto. Nenhuma dependência instalada.
- Inventário completo dos 38 HTML, incluindo 34 URLs de sitemap e quatro utilitários: [inventário por rota](seo/inventario-zadoni-pre-implementacao.md).
- Snapshot com title, description, H1, robots, canonical, schemas, CTAs, links recebidos/enviados e 108 hashes: [baseline JSON](seo/baseline-zadoni-pre-implementacao-2026-09-22.json).
- Repositório contém sinais históricos informados pelo usuário em `docs/seo/search-console-action-plan.md` e `docs/seo/eisenhower-search-console-alignment.md`. Não são dados atuais, exportação completa ou prova de posições preservadas hoje.
- Tentativas de acesso público à home, `/portal/` e sitemap pela ferramenta web falharam. Isso não prova que o site esteja indisponível. Produção, cabeçalhos, redirecionamentos reais e indexação permanecem não verificados.
- Inspeção estática e testes locais não certificam Core Web Vitals de campo, acessibilidade integral, qualidade editorial de todas as afirmações ou ausência de regressão futura de ranking.

## Arquitetura encontrada

Site estático HTML/CSS/JavaScript, sem `package.json`, framework, CMS ou backend identificado. Rotas em diretórios com `index.html`. Origem canônica: `https://zadonidigital.com.br/`.

- `/`: landing comercial Combo/Trilha Produtividade 10X, checkout Hotmart e WhatsApp.
- `/portal/`: hub educacional.
- Clusters existentes: `/5s/`, `/produtividade/`, `/gestao-ambiental/`, `/mineracao/`, `/carreira-mineracao/`.
- `/ferramentas/`: Tempo 10X e Matriz de Eisenhower, com módulos próprios e persistência local. Preservar também chaves de armazenamento, backups e funcionamento.
- `/sobre/`, `/politica-editorial/`, `/atualizacoes/`: confiança, autoria e histórico.
- `404.html` e três páginas `assets/legal/`: noindex e fora do sitemap.
- `assets/css/portal.css`: tokens existentes, tipografia de sistema, cores verdes, largura máxima, foco visível e estilos reutilizáveis. Home usa `style.css` e `script.js`; ferramentas têm CSS/JS próprios.
- `assets/js/portal.js`: menu com estado acessível, Escape e ano; não é camada de analytics.
- Imagens locais com versões menores de avatar e depoimentos; home usa Google Fonts e vídeo sob interação. Dimensões/otimização recebem verificações no auditor existente, sem medição de velocidade nesta rodada.

## SEO e integrações

34 URLs no sitemap, titles e descriptions únicos segundo auditor local. Canonicals de produção, metadados sociais, JSON-LD e breadcrumbs já existem. `robots.txt` permite rastreamento e aponta para o sitemap.

`.htaccess` configura 301 de HTTP/www para HTTPS sem www e de `index.html` para diretório, além da 404. README menciona GitHub Pages, onde esse arquivo não define redirecionamentos. Confirmar hospedagem real antes de qualquer publicação; não remover as regras existentes por essa divergência documental.

WhatsApp existente: `5594992993138`. E-mail encontrado: `adonias.joshua@gmail.com`. Preservar destinos; confirmar que o mesmo atendimento receberá novos serviços antes da publicação. Mensagens atuais falam de curso/portal e não devem ser trocadas globalmente por oferta de agência.

Busca estática nos HTML/JS não encontrou implementação de GA/gtag, GTM, Meta Pixel ou formulário HTML. Isso não exclui injeção na hospedagem. Não assumir uma conta de Analytics ou acesso ao Search Console. O aviso de cookies da home registra aceite simples em localStorage; não é, por si só, controle granular de trackers. Política atual identifica Combo Produtividade 10X/Adonias Silva: revisar cobertura dos novos fluxos antes de coletar dados.

## Risco confirmado: gerador diverge do HTML atual

`scripts/build-portal.js` escreve 31 páginas, sitemap e robots. Executado exclusivamente em cópia temporária, gerou diferenças em `sobre/index.html`. O HTML atual contém apresentação como Adonias Joshua e seções revisadas; o gerador pode substituir essa versão. Os testes de regressão e auditoria continuaram passando na cópia, demonstrando que não protegem todo o conteúdo editorial.

Antes de usar o gerador para a expansão: reconciliar a fonte de `/sobre/` com o HTML aprovado ou excluir explicitamente essa página da geração, documentando a fonte de verdade. Validar diff completo e hashes. Adicionar as novas URLs ao mecanismo de sitemap para que uma geração futura não as remova. Não executar o gerador diretamente sobre o portal sem esse controle.

## Preservação obrigatória

1. Preservar as 34 URLs, seus titles, H1, canonicals, intenção e conteúdo existente. Exceções somente específicas e justificadas; nenhuma migração é necessária para esta proposta.
2. Preservar links úteis, checkout, mensagens comerciais do curso e ferramentas. Adicionar links contextuais sem substituir o menu educacional inteiro.
3. Manter `/mineracao/canaa-dos-carajas/` e `/mineracao/parauapebas/` como conteúdo de mineração, sem convertê-los em páginas de serviços digitais.
4. Manter entidades e IDs existentes de autoria. O portal já usa Adonias Pereira da Silva nos metadados e Adonias Joshua no texto; definir apresentação comercial consistente sem substituir silenciosamente o autor histórico.
5. Usar CSS/JS comerciais separados e escopados, reutilizando tokens. Evitar regras globais que afetem home e ferramentas.
6. Comparar baseline antes/depois; mudanças autorizadas de navegação alteram hash, mas não autorizam mudanças editoriais adicionais.

## Riscos e dependências comerciais

| Item | Tratamento antes da publicação |
|---|---|
| Zadoni Presentes | Propriedade informada pelo usuário; faltam URL/canais oficiais, ações executadas, datas, imagens e métricas. Publicar só fatos confirmados; declarar negócio próprio. |
| Case Digital Gráfica | Previsto no prompt, mas sem evidências no repositório. Não inventar vínculo, resultados ou autorização. Não bloquear páginas independentes por isso. |
| YouTube e mentoria | Agora fazem parte da oferta por instrução do usuário. Definir escopo, entregáveis, modalidade e limites; não inventar pacotes/preços ou prometer resultados. |
| Tráfego pago | Meta Ads consta do prompt; Google Ads não está confirmado como serviço de execução. Mentoria pode mencionar tráfego pago sem inventar plataformas atendidas. |
| Sites | Serviço prioritário sem rota no prompt inicial; inicialmente seção do hub com diagnóstico, página própria em lote posterior se houver material. |
| Local SEO Ops | Tratar como método descrito, não como software existente nem autorização para construir plataforma. |
| Diagnóstico | Regras, perguntas condicionais e privacidade especificadas no plano; resultado preliminar sem score inventado. |
| Dados pessoais | Não colocar respostas livres, nome ou telefone em URL, analytics ou logs. Mensagem WhatsApp genérica; resumo copiável manualmente. |
| Indexação/ranking | Solicitar exportações atuais do Search Console para comparar desempenho; ausência não impede preparar páginas em ambiente local. |

## Testes executados

Ambiente Node v24.14.1. Todos os comandos abaixo concluíram com sucesso:

| Comando | Resultado |
|---|---|
| `node scripts/seo-regression.js` | 19 URLs históricas protegidas pelo teste existente |
| `node scripts/seo-audit.js` | 34 URLs, 34 títulos únicos, 34 descrições únicas, 837 ocorrências de links internos; sem erros críticos |
| `node scripts/smoke-test.js` | 34 rotas com HTTP 200 e 404 personalizada, em servidor local |
| `node scripts/tempo10x-test.js` | Migração, sessões, timer, relatórios e persistência |
| `node scripts/task-metrics-test.cjs` | Filtros, totais, datas e preservação editorial |
| `node scripts/eisenhower10x-test.mjs` | Tarefas, backup, armazenamento e regras |
| `node scripts/snapshot-zadoni-seo.cjs` | 38 HTML inventariados e baseline salvo |
| Gerador + auditoria/regressão em cópia isolada | Geração passa; divergência de `/sobre/` confirmada |

Não executados nesta rodada: suíte de navegador dependente de Playwright/axe externos, medição de performance, validação em ferramentas externas de schema, teste real de envio WhatsApp, cabeçalhos de produção e Search Console. Não houve alteração de interface que justificasse instalar dependências nesta etapa. Validação sintática de JSON-LD não equivale à elegibilidade de rich results.

## Decisão de preparação

Expansão viável como seção adicional. Plano e rotas estão em `mapa-master-clusters-zadoni-digital.md`; mensuração em `plano-mensuracao-zadoni-digital.md`. O primeiro trabalho técnico de implementação deve corrigir o risco de geração em ambiente isolado e ampliar a proteção das 19 URLs históricas para as 34 atuais. Publicação depende de validar hospedagem, conteúdo comercial e testes da implementação.
