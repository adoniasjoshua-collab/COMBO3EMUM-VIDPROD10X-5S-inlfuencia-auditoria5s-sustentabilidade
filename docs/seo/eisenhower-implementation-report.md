# Matriz de Eisenhower 10X — implementação e validação

Data: 2026-09-13. Implementação local concluída, sem commit, push, merge ou deploy.

## Decisão autorizada e SEO

A [inspeção inicial](eisenhower-inspection-report.md) identificou o artigo `/produtividade/matriz-eisenhower/` e o foco secundário de Tempo 10X em “gestão de prioridades”. O usuário aprovou a nova ferramenta com escopo editorial reduzido após o checkpoint.

Foi criada `/ferramentas/matriz-eisenhower/`, com intenção principal **matriz de eisenhower online**. A página contém a aplicação, instruções operacionais, exemplos de preenchimento e FAQ de uso. A explicação aprofundada de quadrantes, urgência e importância continua no artigo existente, para o qual a ferramenta aponta. Não foram criadas seções extensas de “o que é” e “como funciona”, nem um novo guia genérico de gestão de prioridades.

Avaliação local após a revisão: risco residual **baixo a moderado**, reduzido pela separação entre aplicação e artigo. Trata-se de julgamento editorial, não de comprovação por SERP ou Search Console atual. Após publicação autorizada, comparar consultas e páginas para verificar se a nova URL recebe intenção de uso sem deslocar indevidamente o artigo ou Tempo 10X. Nenhuma promessa de ranking ou ausência absoluta de canibalização.

- Title: `Matriz de Eisenhower Online Grátis: Organize suas Prioridades`.
- H1: `Matriz de Eisenhower Online para Organizar Prioridades`.
- Description: `Organize tarefas por urgência e importância com uma Matriz de Eisenhower online gratuita. Planeje, priorize, acompanhe seu progresso e melhore sua gestão do tempo.`
- Canonical próprio: `https://zadonidigital.com.br/ferramentas/matriz-eisenhower/`.
- Idioma pt-BR; robots `index,follow` com as extensões já usadas no portal; Open Graph e Twitter Card.
- JSON-LD: WebPage, WebApplication, Offer gratuito em BRL e BreadcrumbList. Sem avaliações ou números de usuários inventados. FAQ visível sem FAQPage adicional; os três tipos estruturais principais são suficientes para esta versão.
- Breadcrumb: Início → Ferramentas → Matriz de Eisenhower Online.
- Links contextuais verificados para o artigo Eisenhower, gestão do tempo, Tempo 10X, 5S e produtividade e Pomodoro. CTA do curso após a aplicação/conteúdo, usando o destino comercial existente.

## Funcionalidades entregues

- Criar, ler, editar e excluir tarefas, com confirmação para exclusão; título, descrição, quadrante, status, categoria e prazo. IDs e timestamps internos; conclusão registra completedAt, reabertura volta a null.
- Quatro quadrantes na ordem Fazer agora, Planejar, Delegar, Eliminar. Layout vertical abaixo de 768px e 2×2 a partir desse ponto.
- Assistente opcional com importância/urgência e sugestão editável.
- Arraste nativo no desktop; alça com eventos de ponteiro no touch/tablet; campo Mover para em todos os cards, disponível ao teclado. Para destinos fora da tela no touch, o select é o caminho indicado.
- Status pendente, em andamento e concluída; ação direta Concluir/Reabrir e edição detalhada.
- Dashboard de total e status, contagens por quadrante e barras CSS com equivalentes numéricos acessíveis.
- Insight educativo calculado sobre tarefas em aberto: concentração superior a 50% em Fazer agora ou Planejar; mensagem contextual para os demais casos. Barras incluem todas as tarefas, como informado na interface.
- XP, quatro níveis, progresso diário configurável, sequência, conclusões acumuladas e cinco conquistas.
- Exportação/importação JSON validada com confirmação de substituição, limpeza confirmada e impressão/PDF pelo navegador.
- Textos profissionais de treinamento, revisão documental, inspeções e manutenção; orientação explícita para não descartar requisitos legais, emergências ou controles obrigatórios pela matriz pessoal.

## Dados, privacidade e regras

Os dados da aplicação são mantidos apenas em `eisenhower10x.tasks`, `eisenhower10x.settings`, `eisenhower10x.gamification` e `eisenhower10x.schemaVersion`. Nenhuma chave de Tempo 10X ou consentimento é reutilizada. Os textos das tarefas são inseridos por textContent, não como HTML, e não são enviados a servidor pelo código da ferramenta.

Schema v1 possui ponto central de migração. Versões desconhecidas, JSON inválido e conjuntos incompletos não são sobrescritos: a ferramenta informa o problema e abre uma sessão temporária, exportável. Uma falha de gravação tenta restaurar os valores anteriores, mantém o trabalho em memória e exibe aviso persistente. Como localStorage não oferece transação multi-chave, encerramento abrupto ou falha também no rollback não tem garantia de atomicidade; na próxima leitura, a validação rejeita estado incompleto/inconsistente. Não são removidos dados de outras aplicações para liberar quota.

Mudanças em outra aba colocam a aba anterior em modo temporário para evitar sobrescrita silenciosa. Não há colaboração simultânea nem sincronização. Importar numa sessão temporária não promete persistência: o aviso continua até resolver o armazenamento ou limpar explicitamente os dados da matriz.

Limites v1: 1.000 tarefas, título de 160 caracteres, descrição de 1.200, categoria de 60, backup de até 5 MB, histórico de até 10.000 IDs de criação e 10.000 recompensas de conclusão. O limite do histórico impede novas recompensas além desse volume; um backup e reinício explícito podem iniciar outro ciclo. Meta diária entre 1 e 50, padrão 3. Não há penalidade por meta não atingida.

Regras de gamificação, também visíveis na ferramenta:

| Evento | Regra |
|---|---|
| Criação | +1 XP uma vez por ID |
| Primeira conclusão | +5 XP, ou +6 se estiver em Planejar no momento |
| Reabrir, concluir novamente, mover ou importar | Não duplica recompensas |
| Excluir tarefa | Preserva o histórico e XP conquistado |
| Limpar dados | Reinicia tarefas, configurações e gamificação |
| Níveis | Iniciante 0; Organizador 30; Estrategista 100; Mestre das Prioridades 250 XP |
| Sequência | Dias locais consecutivos com primeiras conclusões; mantém a sequência durante o dia seguinte; interrompe após um dia inteiro sem conclusão |
| Conquistas | Primeira tarefa, 5/10 conclusões, melhor sequência de 3 dias e primeira conclusão em Planejar |

O ledger permanece após reabrir/excluir para impedir repetição da recompensa. Portanto, conclusões acumuladas e primeiras conclusões hoje podem diferir do número de tarefas atualmente marcadas como concluídas. A data é a do dispositivo; isso não é um mecanismo competitivo antifraude.

## Arquitetura, UX e performance

HTML estático e CSS isolado na nova página; sete ES modules sem objeto global da aplicação. Scripts type=module têm carregamento diferido nativo; portal.js mantém defer. Nenhum framework, fonte adicional ou biblioteca de gráfico em produção. Sem fetch, serviço de backend ou botão falso de integração.

`integrationTask()` oferece uma cópia validada como ponto futuro de adaptação ao Tempo 10X; não envia dados. A página explica que as bases são separadas.

Controles com altura mínima de 44px, labels, foco visível, status anunciado, confirmação com foco inicial em Cancelar, Escape e ciclo de Tab dentro dos diálogos. Mensagens de erro de formulário e armazenamento são visíveis. Quadrantes têm nomes e números, sem depender só de cor. A alça touch não bloqueia a rolagem do restante do card. O WhatsApp fica após o footer na nova página e tem cor ajustada localmente para contraste, sem alteração do CSS compartilhado.

Orçamento medido sem compressão: JS próprio 26.283 bytes, CSS 8.876 bytes, HTML 21.823 bytes nesta versão. Assets compartilhados são adicionais. Medição local no Chrome sem throttling: CLS inicial **0,0178**, abaixo de 0,1. Isso não substitui Core Web Vitals de campo, rede móvel ou medição em produção. O teste registra o resultado em JSON.

## Arquivos criados

- `ferramentas/matriz-eisenhower/index.html`.
- `assets/css/eisenhower10x.css`.
- `assets/js/eisenhower10x/tasks.js`, `gamification.js`, `storage.js`, `charts.js`, `dragdrop.js`, `ui.js`, `app.js`.
- `scripts/eisenhower10x-test.mjs` e `scripts/eisenhower10x-browser-test.cjs`.
- `docs/seo/eisenhower-inspection-report.md`, este relatório e evidências em `docs/seo/eisenhower-validation/`.

## Arquivos existentes alterados

| Arquivo | Alteração delimitada |
|---|---|
| `ferramentas/index.html` | Card da matriz no grid existente; retirada de Eisenhower da lista de ferramentas futuras |
| `scripts/portal-expansion.js` | Mesmo card e ajuste do roadmap na fonte do hub |
| `sitemap.xml` | Uma única entrada nova, com lastmod 2026-09-13 |
| `scripts/build-portal.js` | Nova URL e data na lista de aplicações independentes do gerador de sitemap |

O gerador completo não foi executado, para não sobrescrever otimizações manuais prévias. A nova aplicação é mantida manualmente, como Tempo 10X; o gerador apenas preserva sua presença no sitemap. Em futuras versões, considerar o cache de 7 dias da hospedagem e versionar também as URLs dos módulos dependentes quando mudarem; o entrypoint e CSS já têm versão na página.

## Validação executada

| Verificação | Resultado |
|---|---|
| `node scripts/eisenhower10x-test.mjs` | Aprovado: dados, datas inválidas, IDs duplicados, estrutura/importação, limites de níveis, virada de mês/ano da sequência, não repetição de XP, quota, JSON corrompido, versão futura e isolamento de chaves |
| `node scripts/eisenhower10x-browser-test.cjs` | Aprovado em Chrome 152.0.7977.83: CRUD, assistente, drag desktop, toque via CDP em tablet, select mobile, refresh, backup/restore, recusa de JSON/versão inválidos, meta, XP, duas abas, quota, corrupção, limpeza, texto semelhante a HTML, impressão e teclado |
| Larguras | 320, 360, 375, 390, 768, 1024 e 1440px; sem overflow horizontal; layout vertical/2×2 e limites do diálogo verificados |
| axe-core | Zero violações detectadas nos recortes WCAG 2 A/AA e 2.1 AA, no mobile, desktop e diálogo |
| `node scripts/seo-audit.js` | 34 URLs, 34 titles únicos, 34 descriptions válidas e 830 links internos; sem erros críticos |
| `node scripts/seo-regression.js` | 19 URLs históricas aprovadas |
| `node scripts/tempo10x-test.js` | Migração, sessões, timer, períodos, KPIs, gráficos, CSV e backup existentes aprovados |
| `node scripts/smoke-test.js` | 34 páginas com HTTP 200 e 404 personalizada aprovada |
| Comparação com HEAD | 37 HTMLs antigos com titles, H1, canonical, description e robots preservados; HTMLs fora do hub integralmente iguais, normalizando CRLF/LF |
| Preservação adicional | Robots, assets globais e redirects iguais ao HEAD; sitemap antigo idêntico após retirar somente a nova entrada |
| Git | `git diff --check` sem erros; revisão de status, diff e diff --stat; sem staging ou publicação |

Capturas do desktop e mobile foram inspecionadas visualmente. Evidências: [resultado JSON](eisenhower-validation/results.json), [recorte de 320px](eisenhower-validation/board-320.png), [recorte de 1440px](eisenhower-validation/board-1440.png) e [exemplo impresso](eisenhower-validation/matrix-print.pdf). Os recortes mostram dados sintéticos de teste, não dados reais de usuários.

### Reproduzir os testes de navegador

Playwright 1.63.0 e axe-core 4.13.0 foram instalados somente numa pasta temporária, sem package.json/node_modules novos no projeto. O script inicia e encerra seu próprio servidor local e Chrome headless.

```powershell
$env:EISENHOWER_TEST_MODULES = "$env:TEMP\eisenhower10x-validation\node_modules"
node scripts/eisenhower10x-browser-test.cjs
```

Em outro ambiente, disponibilizar `playwright` e `@axe-core/playwright` numa pasta de testes e apontar EISENHOWER_TEST_MODULES ao node_modules correspondente. EISENHOWER_BROWSER pode indicar outro executável Chromium; EISENHOWER_TEST_ARTIFACTS muda o diretório de evidências. Para uso local, servir o projeto por HTTP, pois ES modules não devem ser abertos diretamente por file://.

## Limites da conclusão e próximas melhorias

Não foram realizados deploy, consulta ao Search Console atual, teste em Safari/Firefox, teste em dispositivo físico ou auditoria manual com leitor de tela. Axe e testes de teclado não garantem acessibilidade integral. Ausência de regressão refere-se às comparações e suítes descritas, não a todos os comportamentos possíveis em todos os navegadores.

Possíveis versões futuras: contrato explícito de integração com Tempo 10X, migração versionada quando houver schema novo, filtros para bases maiores e revisão de usabilidade em dispositivo físico. A importação é por substituição confirmada, não merge. PNG não foi incluído; impressão/PDF está disponível sem dependência adicional.
