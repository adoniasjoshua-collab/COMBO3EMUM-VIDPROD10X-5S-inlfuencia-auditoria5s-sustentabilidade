# Matriz de Eisenhower 10X — alinhamento com sinais do Search Console

Data: 2026-09-13. Auditoria local, diagnóstico apresentado antes das alterações e ajustes pontuais concluídos. Sem commit, push, merge ou deploy.

## Escopo e qualidade da evidência

Fonte quantitativa: números fornecidos pelo usuário no pedido desta auditoria. Não houve acesso direto ao Search Console nem verificação de publicação/indexação da ferramenta. Os dados não informam período, propriedade, filtros, dispositivo, país, distribuição por página ou janela anterior. Cliques não mencionados são **não informados**, não zero. A expansão do universo de consultas foi relatada pelo usuário, mas não foi quantificada.

Esses sinais permitem orientar relevância temática; não comprovam crescimento estatístico, demanda total, oportunidade de tráfego estimável ou canibalização. Não se atribuem as 13 impressões de “gestão de prioridades” à nova matriz. O histórico local `search-console-action-plan.md` já relacionava essa consulta a Tempo 10X e ao guia de gestão do tempo; suas posições históricas não foram tratadas como atuais.

### Dados fornecidos

| Consulta | Impressões | Cliques informados | Interpretação para esta ferramenta |
|---|---:|---:|---|
| produtividade na mineração | 19 | 1 | Contexto profissional; não mudar o alvo principal para mineração |
| gestão de resíduos | 75 | Não informados | Pertence ao cluster ambiental |
| gestao de residuos | 24 | Não informados | Variante informada separadamente; não somar como volume de mercado |
| cronometro de tarefas | 16 | Não informados | Preservar destino especializado Tempo 10X |
| nr-22 segurança mineração | 16 | Não informados | Pertence ao cluster de segurança/mineração |
| continuidade operacional mineração | 15 | Não informados | Pertence à produtividade setorial |
| gestão de prioridades | 13 | Não informados | Apoio contextual à decisão por quadrantes, sem repetir artificialmente |
| como aumentar produtividade na mineração | 12 | Não informados | Contexto setorial; não criar seção competitiva na aplicação |
| nr 22 | 6 | Não informados | Preservar pilar NR-22 |
| 5 sensos 5s | 5 | Não informados | Preservar conteúdo conceitual de 5S |

## Inspeção e diagnóstico antes de editar

Executados `git status`, `git branch`, `git log --oneline -15` e `git diff`. Branch `seo/portal-educacao-v1`; HEAD `4996fb4`. A implementação anterior estava no workspace, ainda sem commit: alterações no hub de ferramentas, geradores e sitemap, além da nova aplicação, testes e relatórios. Essas mudanças preexistentes foram conservadas.

Foi registrado em memória um inventário de hashes de 118 arquivos para distinguir as alterações desta auditoria das mudanças anteriores. Foram inspecionados HTML, CSS e módulos da aplicação, páginas relacionadas, metadados, schemas, navegação, sitemap, robots, relatórios e fontes geradoras. Não foi encontrado AGENTS.md no projeto.

Busca em HTML por Eisenhower, prioridade, prioridades, gestão de prioridades, gestão do tempo, organizar tarefas, tarefas e produtividade. Muitos resultados vêm de navegação ou rodapé; não são prova de concorrência de intenção. Após o ajuste, há 38 HTMLs no projeto: 12 mencionam Eisenhower, 13 mencionam prioridades e 2 contêm a expressão exata “gestão de prioridades” (Tempo 10X e a nova matriz).

Diagnóstico apresentado ao usuário:

- Principal atual: **matriz de eisenhower online**, bem estabelecida.
- Secundárias: prioridades, urgência/importância, planejamento, organização de tarefas e gestão do tempo, com cobertura semântica sem exigir todas as variantes exatas.
- Intenção: usar a aplicação imediatamente; o conteúdo educativo apoia o uso e fica depois da ferramenta.
- Lacuna: “gestão de prioridades” não aparecia na meta nem na introdução.
- Excesso: nenhum stuffing evidente; não havia razão para ampliar headings e FAQ conceitual.
- Canibalização: **BAIXA** na intenção específica de ferramenta online; **MÉDIA** na consulta ampla compartilhada “gestão de prioridades”. Isso exige monitoramento por consulta/página, não retirada de conteúdo existente.
- Decisão: manter title, H1, headings, FAQ, links de saída e schemas; ajustar meta e primeira frase; adicionar somente um link contextual no hub de produtividade e na fonte correspondente.

## Auditoria dos elementos e keywords

“Texto atual” nesta tabela registra o estado **anterior aos ajustes**. A versão final dos dois textos alterados aparece na seção de implementação.

| Elemento | Texto atual | Keyword alvo | Status | Ação sugerida |
|---|---|---|---|---|
| Title | Matriz de Eisenhower Online Grátis: Organize suas Prioridades | matriz de eisenhower online; grátis | MANTER | 61 caracteres, claro e distinto do artigo. Não inserir outra expressão no title |
| Meta description | Organize tarefas por urgência e importância com uma Matriz de Eisenhower online gratuita. Planeje, priorize, acompanhe seu progresso e melhore sua gestão do tempo. | principal + urgência/importância + gestão de prioridades | AJUSTAR | Trocar apenas a segunda frase para explicitar o apoio à gestão de prioridades |
| H1 | Matriz de Eisenhower Online para Organizar Prioridades | matriz de eisenhower online | MANTER | Único H1, estático e orientado ao uso |
| Primeiro parágrafo | A Matriz de Eisenhower organiza tarefas por urgência e importância. Comece agora: escolha o que fazer, planejar, delegar ou eliminar e transforme cada prioridade em uma próxima ação. | gestão de prioridades; organizar tarefas | AJUSTAR | Incorporar o termo de apoio na primeira frase, sem acrescentar bloco |
| Aviso de privacidade | Suas tarefas e configurações ficam salvas localmente neste navegador e dispositivo. Faça backups para guardar uma cópia ou transferir os dados; não há sincronização automática. | Nenhuma keyword necessária | MANTER | Informação operacional útil, sem promessa de sincronização |
| H2 da aplicação | Matriz de Eisenhower 10X | Nome do produto | MANTER | Identidade própria, sem repetição de todos os termos secundários |
| H2 de ajuda | Como usar esta Matriz de Eisenhower online | uso da matriz online | MANTER | Instrução da aplicação, sem duplicar guia conceitual |
| H2 de exemplos | Experimente com uma tarefa do seu trabalho | planejamento de tarefas; uso profissional | MANTER | Exemplos concretos; não converter em headings para NR-22 ou mineração |
| H2 de execução | Da prioridade para a execução | gestão do tempo; complementaridade | MANTER | Seção encaminha ao guia e ao Tempo 10X |
| H2 de FAQ | Perguntas sobre o uso da ferramenta | dúvidas operacionais | MANTER | Coerente com intenção da aplicação |
| H2 de CTA | Quer aprofundar sua gestão do tempo, organização e produtividade? | Curso, intenção comercial secundária | MANTER | Depois do conteúdo de uso |
| H2 de diálogos | Nova tarefa; Confirmar alteração | Nenhuma keyword necessária | MANTER | Títulos funcionais, não blocos editoriais |
| H3 dos quadrantes | 1. Fazer agora; 2. Planejar; 3. Delegar; 4. Eliminar | matriz urgente/importante | MANTER | Nomes de ações mais úteis que variações artificiais de keywords |
| Texto Fazer agora | Importante e urgente · defina a próxima ação. | urgência e importância | MANTER | Orientação breve |
| Texto Planejar | Importante, sem urgência · reserve uma data. | planejamento | MANTER | Diferencia tarefa importante de prazo imediato |
| Texto Delegar | Urgente, de menor importância para seu objetivo · combine responsável e prazo. | decisão de delegar | MANTER | Responsabilidade e acompanhamento explícitos |
| Texto Eliminar | Sem urgência ou contribuição clara · avalie reduzir ou remover. | reduzir tarefas sem contribuição | MANTER | Conteúdo de ajuda preserva ressalva sobre obrigações e controles críticos |
| H3 do gráfico | Distribuição por quadrante | resumo visual | MANTER | Labels numéricos explicam o gráfico; sem heading artificial de XP |
| Labels do formulário | Título da tarefa; Descrição; Categoria; Prazo; Quadrante; Status | organização de tarefas | MANTER | Nomes naturais com labels associados |
| Assistente | Não sabe onde colocar? Esta tarefa é importante? Esta tarefa é urgente? Aplicar sugestão | tomada de decisão | MANTER | Perguntas claras e sugestão editável |
| Ações nos cards | Mover para; Concluir/Reabrir; Editar; Excluir | uso da aplicação | MANTER | Não inserir keywords em cada botão |
| Gamificação | Iniciante; XP; Primeiras conclusões hoje; Sequência atual; Sua meta diária; Conquistas e regras de XP | UX, não alvo SEO | MANTER | Labels explicam contagens e regras; sem headings promocionais |
| FAQ 1 | Como preencher a matriz pela primeira vez? | como usar; organizar tarefas por prioridade | MANTER | Resposta explica criar, classificar e salvar, e aponta ao guia para conceitos |
| FAQ 2 | Posso usar a matriz diariamente? | matriz todos os dias | MANTER | Resposta operacional sobre revisão e meta |
| FAQ 3 | Ela funciona para equipes? | uso em equipe | MANTER | Limites reais de colaboração, impressão e backup |
| FAQ 4 | Como combinar a matriz com Pomodoro e gestão do tempo? | Eisenhower e Pomodoro; gestão do tempo | MANTER | Explica decidir versus executar e encaminha ao artigo |
| FAQ 5 | Por que reabrir e concluir não aumenta meu XP? | Dúvida específica do produto | MANTER | Conteúdo próprio, útil e não duplicado pelo artigo |
| FAQ 6 | Onde ficam meus dados e como recuperá-los? | persistência e backup | MANTER | Explica comportamento real, inclusive modo temporário |
| CTA principal de uso | + Nova tarefa | usar ferramenta | MANTER | Ação imediata, anterior ao CTA comercial no conteúdo principal |
| CTA de curso | Conheça o Curso de 5S e Produtividade | formação complementar | MANTER | Uma oferta contextual no conteúdo; links comerciais globais já existentes não foram multiplicados |
| Links de saída | guia prático da Matriz de Eisenhower; gestão do tempo; cronômetro de tarefas Tempo 10X; 5S e produtividade; Técnica Pomodoro | Destinos complementares | MANTER | Âncoras variadas, sem substituir todas por “gestão de prioridades” |
| Breadcrumb | Início → Ferramentas → Matriz de Eisenhower Online | classificação da página como ferramenta | MANTER | HTML e JSON-LD consistentes |
| Alt text | Ícone WhatsApp: alt vazio e aria-hidden=true, link com aria-label | Nenhuma keyword necessária | MANTER | Imagem decorativa; não inserir keywords no alt |
| Open Graph/Twitter | Títulos da matriz online e descrições de uso gratuito, tarefas e progresso | principal e benefício | MANTER | Coerentes; não precisam repetir literalmente a meta de busca |
| Schema | WebPage; WebApplication “Matriz de Eisenhower 10X”; BreadcrumbList; Offer 0 BRL | aplicação de produtividade | MANTER | Nenhuma review/rating/contagem inventada |
| Link de entrada em produtividade | Ausente para a aplicação; os links de Eisenhower existentes apontam ao artigo | matriz de eisenhower online gratuita | ADICIONAR | Um único link contextual, mantendo os links conceituais existentes |

Cobertura semântica: “matriz de prioridades”, “matriz urgente importante”, “como priorizar tarefas” e “produtividade pessoal” não precisam aparecer como fórmulas exatas. A interface e a ajuda cobrem seus conceitos. Não se adicionou H2 “O que é gestão de prioridades?” nem FAQ conceitual redundante apenas para conter a expressão. A única ocorrência visível final de “gestão de prioridades” fica na introdução; a segunda ocorrência no HTML é a meta.

## Search Console Signal Mapping

O mapa abaixo é uma atribuição editorial recomendada, não uma atribuição das impressões fornecidas a URLs verificadas nesta sessão.

| Sinal/tema | Destino e papel | Limite de escopo |
|---|---|---|
| gestão de prioridades | Matriz Eisenhower para aplicar a classificação por quadrantes; guia existente para conceitos e agenda | Termo secundário compartilhado. Preservar conteúdo de Tempo 10X e verificar consulta × página antes de qualquer redistribuição |
| cronometro de tarefas | `/ferramentas/gestao-do-tempo/` — Tempo 10X | A matriz apenas oferece link para medir a execução; não acrescentar cronômetro ou disputar essa keyword em title/H1 |
| produtividade | `/produtividade/` — hub do cluster | Tema contextual; não há contagem desta consulta genérica nos números fornecidos |
| gestão do tempo | `/produtividade/gestao-do-tempo/` para aprender; Tempo 10X para registrar tempo | A matriz ajuda a decidir antes de executar, sem novo guia genérico |
| organização de tarefas / planejamento de tarefas | Matriz como aplicação; guias para aprofundamento | Relação semântica inferida, sem métricas fornecidas para essas expressões |
| NR-22, resíduos e produtividade na mineração | Páginas setoriais existentes | Não direcionar esses sinais para a matriz; mineração/construção ficam apenas como contexto profissional |

## Canibalização e páginas relacionadas

| URL | Title / H1 atuais | Intenção | Risco com a matriz e conduta |
|---|---|---|---|
| `/produtividade/matriz-eisenhower/` | Matriz de Eisenhower: Como Priorizar Tarefas na Prática / Matriz de Eisenhower: transforme tarefas em decisões | Aprender critérios e método | BAIXO para “online”; MÉDIO na consulta genérica Eisenhower. Preservar artigo e link de aprofundamento |
| `/ferramentas/gestao-do-tempo/` | Cronômetro de Tarefas Online Grátis — Tempo 10X / Cronômetro de tarefas online e gestão do tempo | Cronometrar e acompanhar execução | BAIXO para cronômetro enquanto a matriz só classifica; MÉDIO para gestão de prioridades. Nenhuma edição nesta página |
| `/produtividade/gestao-do-tempo/` | Gestão do Tempo: Como Planejar Prioridades e Rotina / Gestão do tempo para uma rotina possível | Planejamento e agenda | MÉDIO na consulta ampla de prioridades; baixo na intenção específica da matriz. Preservar |
| `/produtividade/` | Produtividade: Foco, Prioridades e Gestão do Tempo / Produtividade com foco no que importa | Navegar pelo cluster | BAIXO. Adicionado um link prático; title/H1/meta preservados |
| `/ferramentas/` | Ferramentas Gratuitas de Produtividade, 5S e Gestão / Ferramentas gratuitas para transformar orientação em ação | Encontrar ferramentas | BAIXO. Card existente já suficiente; não adicionar outro link redundante |
| `/produtividade/5s-e-produtividade/` | 5S e Produtividade: Como Organização Reduz Desperdícios / 5S e produtividade: organização a serviço do trabalho | Ambiente e redução de perdas | BAIXO. Link da matriz para o artigo é suficiente nesta rodada |

O separador do title real de Tempo 10X é `|`; a tabela usa travessão apenas para não quebrar a célula Markdown. As descrições também diferenciam aprender critérios, organizar tarefas e cronometrar; a nova meta permanece única. Não foram encontrados titles idênticos ou descrições duplicadas na auditoria técnica. A repetição de entidades entre páginas do cluster é esperada; não se confundiu isso com canibalização comprovada.

Não se adicionaram links em todas as páginas candidatas. O hub de ferramentas já aponta à aplicação; o hub de produtividade oferece um segundo percurso relevante. Os guias e Tempo 10X permanecem intactos, incluindo links para o artigo. A fonte do hub foi atualizada sem executar o gerador completo.

## Ajustes realizados

1. **Meta da matriz:** `Organize tarefas por urgência e importância com uma Matriz de Eisenhower online gratuita. Melhore sua gestão de prioridades, planejamento e produtividade.` São 154 caracteres. Mantém ferramenta, gratuidade, urgência/importância e benefício.
2. **Introdução da matriz:** `A Matriz de Eisenhower ajuda na gestão de prioridades ao organizar tarefas por urgência e importância. Comece agora: escolha o que fazer, planejar, delegar ou eliminar e transforme cada prioridade em uma próxima ação.` Permanecem duas frases; o bloco de privacidade continua separado.
3. **Hub de produtividade:** após a orientação sobre agenda e ciclos de foco, incluído: `Para organizar suas tarefas nos quatro quadrantes, use a Matriz de Eisenhower online gratuita.` Apenas o nome da ferramenta é link para `/ferramentas/matriz-eisenhower/`. Mesmo trecho na definição do hub em `scripts/build-portal.js`.

Arquivos de produto alterados **nesta rodada**: `ferramentas/matriz-eisenhower/index.html`, `produtividade/index.html` e `scripts/build-portal.js`. Documento novo: este relatório. Nenhum arquivo foi removido. Relatórios anteriores registram o estado da implementação anterior; esta auditoria registra a meta atualizada.

## SEO técnico, performance e mobile

- Title, meta, H1, introdução, instruções, exemplos, FAQ e links estão no HTML estático. O conteúdo educativo não depende da execução de JavaScript; os dados pessoais e cards são renderizados localmente pela aplicação.
- A aplicação aparece após duas passagens curtas de apresentação/privacidade. O dashboard precede a matriz; a ajuda e o CTA contextual vêm depois. Não foi acrescentado conteúdo que empurre a ferramenta para baixo.
- Scripts da aplicação são ES modules, com execução diferida nativa; portal.js usa defer. Nenhum JavaScript, CSS, framework, biblioteca, fonte ou imagem nova nesta rodada.
- CSS da aplicação é isolado; controles têm mínimo de 44px. Quatro quadrantes verticais em celular e 2×2 a partir de 768px. Select permite mover sem depender de arrastar.
- Ícone SVG com dimensões explícitas e lazy loading; imagem social é metadado, não hero pesado. Não há imagem de conteúdo exigindo otimização adicional.
- Canonical próprio, robots indexável e lang pt-BR corretos. Sitemap já continha exatamente a URL da aplicação: não foi modificado nesta auditoria.
- WebApplication mantém name `Matriz de Eisenhower 10X`, applicationCategory `ProductivityApplication`, operatingSystem `Web`, Offer com price 0 e priceCurrency BRL. BreadcrumbList corresponde ao caminho visível. Nenhuma alteração no schema necessária; FAQ continua visível sem FAQPage adicional.
- Medição local atual em Chrome 152.0.7977.83: CLS inicial **0,0177836516**. É uma medição de laboratório sem throttling, não Core Web Vitals de campo.

## Validação após os ajustes

| Checagem | Resultado |
|---|---|
| `node scripts/seo-audit.js` | Aprovado: 34 URLs, 34 titles únicos, 34 descriptions válidas, 831 links internos, sem erros críticos |
| `node scripts/seo-regression.js` | Aprovado: 19 URLs históricas com metadados e presença no sitemap preservados |
| `node --check scripts/build-portal.js` | Sintaxe aprovada; gerador não executado |
| Suíte `eisenhower10x-browser-test.cjs` | Aprovada novamente: CRUD, assistente, arraste desktop/touch, select, refresh, backup/restore, XP, meta diária, confirmação, corrupção, quota, duas abas, teclado e impressão |
| Responsividade | 320, 360, 375, 390, 768, 1024 e 1440px; sem overflow horizontal; quadrantes e diálogo nas dimensões esperadas |
| Acessibilidade automatizada | Zero violações axe nos recortes WCAG 2 A/AA e 2.1 AA, no mobile, desktop e diálogo; sem exceções JavaScript |
| Inventário anterior à auditoria | Apenas os três arquivos de produto declarados diferem entre os 118 arquivos inventariados; nenhuma remoção |
| Metadados dos HTMLs | Nos 38 HTMLs presentes, title, H1, canonical e robots preservados; única meta description alterada é a da matriz |
| Preservação | Sitemap, robots, páginas setoriais, landing, Tempo 10X, CSS/JS da aplicação e assets globais intactos em relação ao início desta rodada |
| Revisão Git | `git status`, `git diff --stat`, `git diff` e `git diff --check`; sem staging, commit ou publicação |

As evidências desta execução ficam em `%TEMP%/eisenhower10x-seo-alignment-artifacts/`, incluindo results.json, capturas e PDF. Para reproduzir, usar as dependências temporárias e o procedimento documentados em [eisenhower-implementation-report.md](eisenhower-implementation-report.md), definindo EISENHOWER_TEST_ARTIFACTS para um diretório próprio. Os testes de navegador cobrem Chrome com emulação mobile/touch; não são validação em dispositivo físico, Safari/Firefox ou leitor de tela.

## Monitoramento futuro

Após publicação explicitamente autorizada e confirmação de rastreamento/indexação, registrar a data inicial e exportar consulta × página × data. Comparar períodos equivalentes, por exemplo 28 dias versus os 28 anteriores, com a mesma propriedade, tipo de busca e filtros. Registrar impressões, cliques, CTR e posição média, segmentando dispositivo quando houver amostra. Não usar mudanças de um único clique como prova de ganho ou perda.

Consultas a acompanhar:

- matriz de eisenhower;
- matriz de eisenhower online;
- matriz eisenhower grátis;
- matriz de prioridades;
- matriz de prioridades online;
- gestão de prioridades;
- organizar tarefas por prioridade;
- urgente importante;
- como priorizar tarefas;
- cronometro de tarefas, incluindo a variante com acento na análise do mesmo tema.

Verificar separadamente a nova aplicação, o artigo Eisenhower, Tempo 10X e o guia de gestão do tempo. Para “online/grátis”, observar se a aplicação passa a atender a intenção de uso. Para termos conceituais, observar a estabilidade do artigo. Para “cronometro de tarefas”, verificar se Tempo 10X continua como destino adequado. Para “gestão de prioridades”, não exigir exclusividade de uma URL: confrontar a intenção, alternância de páginas e desempenho conjunto.

Investigar possível canibalização se houver alternância persistente entre páginas com a mesma intenção acompanhada de piora consistente, controlando período e filtros. Só então considerar ajustes adicionais em âncoras ou escopo editorial. Não consolidar URLs, trocar canonicals, reescrever titles ou remover conteúdo com base apenas nessas impressões pequenas.

Resultado desta rodada: intenção de aplicação preservada; termo de apoio presente sem stuffing; integração editorial com o cluster fortalecida por um link; Tempo 10X e páginas existentes mantêm seus papéis. Ganho de tráfego permanece uma hipótese a medir após publicação, não um resultado já obtido.
