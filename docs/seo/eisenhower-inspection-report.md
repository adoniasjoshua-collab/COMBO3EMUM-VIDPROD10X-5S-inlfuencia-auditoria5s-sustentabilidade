# Inspeção — Matriz de Eisenhower 10X

Atualização após o checkpoint: o usuário autorizou a implementação com o escopo editorial reduzido (“sim vamos implementar a ferramenta”). O registro abaixo documenta a inspeção anterior à autorização. A decisão aplicada, os arquivos e as validações finais estão em [eisenhower-implementation-report.md](eisenhower-implementation-report.md).

Data: 2026-09-13. Etapas concluídas: inspeção e decisão. Implementação interrompida por risco médio, conforme seção 6 do pedido: “Se houver risco médio/alto: PARAR e relatar”. Checkpoint apresentado na conversa antes de criar este documento. Nenhum arquivo de aplicação foi alterado.

## Evidência e limites

Inspeção local do repositório, sem consulta ao Search Console atual ou validação de resultados de busca ao vivo. A classificação é uma avaliação de sobreposição de conteúdo e intenção, não comprovação de perda de ranking. Os sinais históricos de consultas são os documentados em `docs/seo/search-console-action-plan.md`, atualizado em 2026-09-02; não são métricas atuais.

Executados `git status`, `git branch`, `git log --oneline -15` e `git diff`. Branch `seo/portal-educacao-v1`, HEAD `4996fb4`, árvore inicialmente limpa, sincronizada com a referência local de origin. Nenhum fetch realizado. Histórico inclui `cbbffd5` (guia Eisenhower) e otimização recente das páginas prioritárias.

Busca pelos termos Eisenhower, prioridade, prioridades, urgente, importante, gestão do tempo, gestão de prioridades, produtividade, cronômetro e tarefas em HTML, scripts e documentação. Termos genéricos aparecem também em navegação, rodapés e páginas setoriais; isso isoladamente não caracteriza concorrência.

## Arquitetura e padrões encontrados

- Portal estático com `index.html` por diretório. Clusters: `5s/`, `produtividade/`, `gestao-ambiental/`, `mineracao/`, `carreira-mineracao/`; entrada educativa `portal/` e landing comercial na raiz.
- `assets/css/portal.css`: identidade verde, variáveis próprias, cards, breadcrumbs, sumário, autor, CTA, navegação responsiva, skip link e foco visível. CSS contém seletores globais; CSS novo deve ficar isolado.
- `assets/js/portal.js`: IIFE para menu, Escape e ano do rodapé. Tempo 10X usa scripts clássicos separados, carregados com defer e versionamento de cache, sob `window.Tempo10X`; não são ES modules. Serviços de atividades, registros, timer, relatórios, armazenamento e UI em `assets/js/tempo10x/`.
- `scripts/build-portal.js` e `scripts/portal-expansion.js` contêm fontes de páginas geradas. Regenerar todo o portal seria arriscado diante das otimizações manuais recentes. Uma futura edição no hub precisa ter correspondência na fonte, sem regeneração indiscriminada.
- Metadados das páginas relacionadas: português brasileiro, title e description próprios, canonical absoluto com barra final, robots indexável, Open Graph/Twitter. Artigos usam Article e BreadcrumbList; hubs CollectionPage; Tempo 10X WebPage, WebApplication, Offer, FAQPage e BreadcrumbList.
- Menu e footer apontam para os clusters, ferramentas, autor e Trilha 10X. CTAs comerciais existentes usam `https://hotm.io/trilha10x`. Há contato flutuante de WhatsApp a considerar no layout mobile.
- Landing usa `style.css` e `script.js` e tem banner de cookies com aceite registrado em `cookieConsent`. Não foram encontrados identificadores comuns de GA/GTM no conjunto de arquivos pesquisado; isso não exclui instrumentação da hospedagem ou serviços externos. Não prometer ausência absoluta de transmissão.
- `robots.txt` permite rastreamento e referencia sitemap. Sitemap tem 33 URLs. `.htaccess` já consolida HTTPS/host e index.html; preservar regras existentes.
- Nenhum AGENTS.md encontrado na busca do projeto. README descreve o scaffold comercial inicial e não documenta toda a arquitetura atual.

## Páginas relacionadas

URLs abaixo usam a origem `https://zadonidigital.com.br`.

| URL | Title atual | H1 atual | Intenção / keywords aparentes | Risco com a proposta e recomendação |
|---|---|---|---|---|
| `/produtividade/matriz-eisenhower/` | Matriz de Eisenhower: Como Priorizar Tarefas na Prática | Matriz de Eisenhower: transforme tarefas em decisões | Editorial: matriz de Eisenhower, priorizar tarefas, urgente/importante, quadrantes | Médio: conteúdo explicativo e FAQ propostos repetem o guia. Preservar referência conceitual e apontar para ela na futura aplicação. |
| `/ferramentas/gestao-do-tempo/` | Cronômetro de Tarefas Online Grátis \| Tempo 10X | Cronômetro de tarefas online e gestão do tempo | Ferramenta: cronômetro, tarefas, controle de tempo, gestão de prioridades | Médio: possui seções “Como definir prioridades” e “Gestão de prioridades”; consulta documentada no plano SEO recente. Preservar foco em medir execução. |
| `/produtividade/gestao-do-tempo/` | Gestão do Tempo: Como Planejar Prioridades e Rotina | Gestão do tempo para uma rotina possível | Editorial: gestão do tempo, planejamento, prioridades | Médio para conteúdo genérico amplo. Usar link contextual, sem criar outro guia geral. |
| `/ferramentas/` | Ferramentas Gratuitas de Produtividade, 5S e Gestão | Ferramentas gratuitas para transformar orientação em ação | Hub de aplicações gratuitas | Baixo: prevê Eisenhower no roadmap, mas oferece apenas Tempo 10X. Card somente após aplicação funcional. |
| `/produtividade/` | Produtividade: Foco, Prioridades e Gestão do Tempo | Produtividade com foco no que importa | Hub educativo | Baixo: distribui links para Eisenhower, Pomodoro e gestão do tempo. Preservar. |
| `/produtividade/tecnica-pomodoro/` | Técnica Pomodoro: Como Usar para Foco e Produtividade | Técnica Pomodoro: como usar ciclos de foco | Editorial: execução em ciclos de foco | Baixo: complementar à classificação de tarefas. |
| `/produtividade/5s-e-produtividade/` | 5S e Produtividade: Como Organização Reduz Desperdícios | 5S e produtividade: organização a serviço do trabalho | Editorial: organização do ambiente e redução de perdas | Baixo: link contextual, sem duplicar explicação. |

Artigo Eisenhower já cobre: urgente versus importante, quatro quadrantes, preenchimento, destino das tarefas, agenda, limites e revisão semanal. A estrutura sugerida para a nova página reproduziria parte importante desses tópicos.

## Decisão e checkpoint

1. Existe editorial específico sobre Eisenhower? **Sim**, `/produtividade/matriz-eisenhower/`.
2. Existe ferramenta equivalente? **Não foi encontrada matriz interativa**. Tempo 10X é adjacente, com tarefas, prioridades e tempo, mas não equivale aos quatro quadrantes.
3. Existe página atacando gestão de prioridades? **Sim**, Tempo 10X explicitamente; o guia de gestão do tempo também tem essa consulta documentada.
4. Existe risco de sobreposição? **Médio no escopo integral solicitado**, pela combinação de keywords secundárias amplas e conteúdo editorial repetido. A existência do artigo, sozinha, não impediria uma ferramenta.
5. Melhor solução recomendada: **A, nova ferramenta, condicionada a escopo editorial reduzido e diferenciado**. B/C misturariam funções ou exigiriam alterar a página editorial preservada pelo pedido.

URL proposta: `/ferramentas/matriz-eisenhower/`. Intenção principal: **matriz de eisenhower online**; secundárias centradas em usar a matriz grátis, classificar e mover tarefas. Não disputar “gestão de prioridades” como alvo autônomo. Explicações breves serviriam ao uso; aprofundamento ficaria no artigo. O risco residual dessa revisão precisa ser reavaliado antes de implementar; não foi declarado automaticamente baixo.

Title e H1 propostos pelo usuário são compatíveis com o formato técnico local, mas não foram aplicados. Canonical próprio, robots indexável, WebPage, WebApplication com preço zero e BreadcrumbList são compatíveis com Tempo 10X. FAQPage só acompanharia FAQ visível, sem alegação de resultado enriquecido garantido.

### Arquivos previstos se o escopo revisado for autorizado

- Criar `ferramentas/matriz-eisenhower/index.html`, `assets/css/eisenhower10x.css` e módulos em `assets/js/eisenhower10x/`: app, storage, tasks, gamification, dragdrop, charts e ui; testes específicos e `docs/seo/eisenhower-implementation-report.md`.
- Editar pontualmente `ferramentas/index.html`, sua definição em `scripts/portal-expansion.js` e adicionar somente a nova URL em `sitemap.xml`. Ajustar a menção ao roadmap apenas para não apresentar uma ferramenta disponível como futura.
- Preservar artigos, metadados antigos, landing comercial, Tempo 10X, CSS/JS compartilhados, robots, regras de host/redirect e outras entradas do sitemap.
- Separar os quatro namespaces `eisenhower10x.*` dos dados do Tempo 10X; não oferecer transferência sem contrato de integração real.
- Riscos técnicos a testar posteriormente: quota/JSON inválido/versão futura de armazenamento, importação destrutiva, XP repetido ao reabrir tarefas, mudança de data e streak, teclado e alternativa ao arrastar, sobreposição do WhatsApp, largura de 320px e regeneração das páginas.

## Verificação desta etapa

- `node scripts/seo-audit.js`: aprovado; 33 URLs, 33 titles únicos, 33 descriptions válidas, 805 links internos entre URLs indexáveis; sem erros críticos.
- `node scripts/seo-regression.js`: aprovado; 19 URLs históricas verificadas quanto a URL, title, canonical, description e sitemap.
- Nenhum teste de CRUD, mobile, XP ou armazenamento da nova ferramenta foi executado: ela não foi criada.
- Apenas este relatório foi criado após o checkpoint. Nenhuma URL, title, H1, canonical, robots, sitemap ou página existente foi alterada. Não houve commit, push, merge ou deploy.

## Próxima decisão

Revisar o escopo editorial para privilegiar a aplicação e conservar os conceitos no artigo. A interrupção decorre da condição expressa do usuário; não de exigência de skill ou revisão automática de aprovação. O relatório de implementação será produzido quando houver implementação, sem antecipar conclusão ou alegar zero regressão funcional sem testes.
