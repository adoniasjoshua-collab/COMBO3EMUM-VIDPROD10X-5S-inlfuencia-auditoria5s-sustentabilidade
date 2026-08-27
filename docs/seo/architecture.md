# Arquitetura SEO do portal

Atualizado em 27 de agosto de 2026.

## Snapshot preservado

O commit `e49864f` é o baseline anterior à expansão. Ele continha 19 URLs indexáveis: Home comercial, Portal, seis páginas de 5S, cinco de produtividade, quatro de gestão ambiental, Sobre e Tempo 10X. Nenhuma dessas URLs, titles, H1 ou canonicals foi removida ou alterada pela expansão.

## Arquitetura encontrada

- Site estático em HTML, CSS e JavaScript vanilla.
- `scripts/build-portal.js` gera páginas editoriais, sitemap e robots.
- `scripts/portal-expansion.js` isola os novos clusters do conteúdo histórico.
- `scripts/seo-audit.js` valida metadados, schema, links, assets, órfãs, sitemap e WhatsApp.
- Home comercial permanece na raiz; conteúdo educativo começa em `/portal/`.
- Canonical de produção preservado em `https://zadonidigital.com.br/`.

## Clusters

| Cluster | Hub | Função |
|---|---|---|
| Portal | `/portal/` | Descoberta e distribuição de autoridade |
| Mineração e SSMA | `/mineracao/` | NR-22, segurança, riscos, 5S, produtividade e ambiente |
| Carreira | `/carreira-mineracao/` | Formação, preparação e busca segura de oportunidades |
| 5S | `/5s/` | Fundamentos e aplicações |
| Produtividade | `/produtividade/` | Foco, prioridades e gestão do tempo |
| Gestão ambiental | `/gestao-ambiental/` | Obras, resíduos e educação |
| Ferramentas | `/ferramentas/` | Aplicações gratuitas funcionais |
| Atualizações | `/atualizacoes/` | Revisões confirmadas e freshness responsável |
| Confiança | `/sobre/` e `/politica-editorial/` | Autor, método, fontes e transparência |

## Modelo para 50–200 páginas

Uma URL nova deve possuir intenção própria, conteúdo suficiente, parent hub, breadcrumbs, três links relacionados, fonte primária quando necessário e entrada no gerador. Slugs permanecem estáveis. Páginas regulatórias recebem revisão prioritária; ferramentas só são indexadas quando o fluxo principal funciona.

## Riscos controlados

- Landing comercial isolada de mudanças editoriais.
- Novos conteúdos em módulo separado para reduzir regressão.
- Sem páginas de município em série: apenas Canaã e Parauapebas, com contexto e fontes próprios.
- Sem páginas superficiais para cada palavra-chave.
- Sem `FAQPage`, avaliações ou vínculos institucionais inventados.

