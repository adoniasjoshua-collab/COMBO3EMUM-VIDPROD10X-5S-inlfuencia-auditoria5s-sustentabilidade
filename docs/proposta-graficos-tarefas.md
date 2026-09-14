# Proposta — tarefas por área e período

Data: 14/09/2026. Proposta de UX e definição de indicadores; sem implementação na aplicação e sem leitura dos dados pessoais salvos no navegador.

Atualização: primeira etapa implementada localmente após autorização, conforme registro abaixo. A descrição inicial acima documenta o momento da proposta.

## Objetivo e decisão

Permitir descobrir onde se concentram as tarefas e como o volume cadastrado varia com o tempo. Recomenda-se iniciar com dois gráficos de barras dentro de Progresso (Matriz) e Relatórios (Tempo 10X), preservando a lista compacta como área principal de execução.

Premissa: “área” significa a categoria já existente, como Trabalho, Estudo e Pessoal. Quadrante é outra dimensão; não deve receber o mesmo nome. As ferramentas continuam com bases independentes, selecionando uma origem de cada vez e sem somar tarefas potencialmente duplicadas entre elas.

## Versão inicial recomendada

Controles: Dia / Semana / Mês / Ano, setas para período anterior/seguinte, intervalo por extenso, área e situação atual. Padrão: semana atual, todas as áreas, todas as situações. Na matriz, quadrante como filtro adicional recolhido.

Três indicadores, todos sobre a mesma população de tarefas criadas no intervalo:

| Indicador | Definição |
|---|---|
| Cadastradas | IDs distintos ainda presentes, com createdAt no intervalo |
| Abertas agora | Subconjunto anterior cujo status atual não é concluída |
| Concluídas agora | Subconjunto anterior cujo status atual é concluída |

As duas últimas contagens somam a primeira. Em andamento e pausada pertencem a abertas. “Concluídas agora” não significa “concluídas durante o período”. Quando houver filtro de status, informar o filtro aplicado no cabeçalho para explicar o recorte. Não exibir taxa de produtividade, metas ou comparações percentuais nesta primeira versão.

Gráfico 1: **Tarefas por área**, barras horizontais, eixo a partir de zero, valores inteiros e nomes visíveis. Contar os mesmos IDs dos indicadores; ordenar por quantidade decrescente, desempate alfabético. Exibir até cinco áreas e “Outras” com opção de abrir todas; nunca omitir silenciosamente o restante. Categoria vazia vira “Sem área”. Normalizar espaços e diferenças de maiúsculas para agregação, preservando nomes de exibição. Sinônimos não são fundidos automaticamente.

Gráfico 2: **Quando as tarefas foram cadastradas**, barras verticais. A seleção de período determina o agrupamento:

| Período | Barras |
|---|---|
| Dia | Horas do dia; no celular, seis blocos de quatro horas com intervalo explícito |
| Semana | Sete dias, segunda a domingo |
| Mês | Uma barra por dia; rótulos espaçados para caber na tela |
| Ano | Doze meses, janeiro a dezembro |

Usar limites de calendário local, início inclusivo e fim exclusivo. Não assumir que todo dia tem 24 horas ao calcular intervalos. Meses variáveis e anos bissextos devem ser tratados. Mudanças de fuso do dispositivo podem redistribuir timestamps; informar uso do horário local. Dias futuros do período atual recebem indicação “Ainda não ocorreu”, não evidência de desempenho zero.

## Interação e apresentação

- Desktop: dois gráficos lado a lado, quando houver largura suficiente; indicadores em uma faixa compacta.
- Mobile: seletor “Por área / Ao longo do tempo”, mostrando um gráfico por vez, sem novo painel alto acima das tarefas.
- Selecionar uma barra abre a lista compacta correspondente dentro do relatório, mantendo o período e com retorno claro. Seleções não alteram dados.
- Total e unidade sempre visíveis; barras começam em zero. Cor verde para volume e destaque da seleção, sem depender de cor para interpretação.
- Valores acessíveis por toque e teclado; não depender de hover. “Ver dados em tabela” resolve também a seleção de dias muito estreitos no gráfico mensal.
- Nenhum dado: mensagem explicativa e ação para cadastrar/ajustar filtros. Datas inválidas ou ausentes: excluir somente da série temporal e informar quantidade não classificada; nunca inventar uma data.
- O gráfico deve atualizar após criar, editar, concluir, reabrir, excluir ou importar. Respeitar movimento reduzido.
- Não usar ranking competitivo ou afirmar que muitas tarefas significam melhor resultado.

## Limites dos dados e evolução

A versão inicial é uma análise do cadastro atual: exclusões removem tarefas dos gráficos e alterações de categoria/status podem mudar recortes antigos. Exibir a nota “Baseado nas tarefas atualmente salvas neste navegador; período pela data de cadastro”. Não apresentar essa visão como histórico imutável de produção.

A Matriz possui createdAt, completedAt, dueDate e category. Reabrir limpa completedAt; concluir novamente registra outra data. Seu histórico de gamificação preserva primeira conclusão por ID/dia, mas não guarda categoria histórica. Ele não deve ser tratado como série de conclusões por área.

Tempo 10X possui createdAt, updatedAt, date e category; não possui completedAt na atividade. A data planejada, updatedAt e o fim de uma sessão de cronômetro não substituem automaticamente a data de conclusão da tarefa.

Segunda etapa: implementar registro versionado de primeira conclusão por tarefa, com data/hora e área no evento. Concluir, reabrir e concluir novamente não incrementa essa contagem mais de uma vez por ID. Isso exige distinguir “Primeiras conclusões” de “Concluídas agora”; o primeiro indicador pode permanecer após reabertura. Guardar fatos históricos após exclusão deve ser explicitado na UX, no backup e na limpeza dos dados. Não reconstruir datas históricas que não existem; informar o início de cobertura e quantificar registros antigos sem data conhecida.

Só então oferecer modo “Concluídas no período” comparável nas duas ferramentas. Quantidade de tarefas e tempo registrado permanecem medidas separadas, com unidades e filtros próprios. “Horas” pode ser um modo futuro do Tempo 10X, aproveitando os relatórios já existentes, sem misturar as escalas.

## Aceitação proposta

1. Soma das barras de áreas e de tempo igual ao total cadastrado para o mesmo recorte e cobertura válida; “Outras” participa da soma.
2. Abertas + concluídas igual ao total, sem contar uma tarefa várias vezes por suas sessões de cronômetro.
3. Limites de dia/semana/mês/ano, datas sem horário, ano bissexto e fuso cobertos por testes.
4. Vazio, uma tarefa, muitas áreas e datas inválidas tratados explicitamente.
5. Criar/importar/excluir e trocar filtros refletem os valores sem alterar os dados.
6. Uso em 320px, teclado, leitor de tela e impressão legível, com alternativa tabular.
7. Não migrar nem integrar as bases na primeira etapa.

## Fontes locais inspecionadas

- assets/js/eisenhower10x/tasks.js: campos, validação, criação e transições de conclusão.
- assets/js/eisenhower10x/gamification.js: ledger de primeira conclusão sem categoria histórica.
- assets/js/eisenhower10x/charts.js: distribuição atual por quadrante e status.
- assets/js/tempo10x/activities.js: campos, datas e atualização das atividades.
- Histórico desta conversa: priorização de baixa rolagem, detalhes recolhidos e separação entre execução e análise.

Não foram obtidas contagens reais de usuários. A proposta define comportamento futuro; não constitui diagnóstico quantitativo do uso atual.

## Implementação e validação — primeira etapa

- Gráficos adicionados em Progresso da Matriz e Relatórios do Tempo 10X. Filtros próprios explicitamente separados dos filtros de horas existentes; contagem por cadastro e situação atual.
- Área, período, situação e quadrante (Matriz); navegação anterior/seguinte e retorno ao período atual; alternância mobile e apresentação conjunta no desktop.
- Barras selecionáveis revelam lista de tarefas com detalhes expansíveis; tabela alternativa com todos os valores e acesso às mesmas tarefas. Mais de seis áreas são resumidas em cinco principais mais Outras, com opção de mostrar todas.
- Dados recebidos diretamente da renderização de cada aplicação, incluindo a sessão temporária da Matriz. Não há leitura paralela de localStorage, alteração de schema ou integração entre bases.
- Novos assets: task-metrics.js (cálculos), task-analytics.js (interface), task-analytics.css (estilos isolados). Referências de scripts/CSS versionadas em 20260914-3.
- `node scripts/task-metrics-test.cjs`: deduplicação, filtros, soma das barras, limites de semana/mês/ano, calendário bissexto, horário de verão, datas inválidas e preservação de SEO/editorial aprovados.
- Comparação automática dos dois HTMLs com HEAD: title, todos os meta tags, H1, canonical e JSON-LD idênticos; texto editorial também idêntico. URLs, robots e sitemap não alterados.
- Browser workspace: contagens, filtros, seleção de barras, lista correspondente, vazio, visualizações e quatro períodos em 320/1440px aprovados. Axe sem violações no recorte verificado da Matriz mobile e nas três visualizações do Tempo 10X em 390/1440px. Sem overflow horizontal nos testes.
- Suíte completa de navegador da Matriz, testes das regras das duas ferramentas, SEO (34 páginas, 837 links internos), regressão de 19 URLs e smoke aprovados.
- Capturas `analytics-matrix-mobile.png`, `analytics-time-mobile.png`, `analytics-desktop.png` em `%TEMP%/workspace10x-validation` inspecionadas. Dados sintéticos usados exclusivamente para testes.

Entrega local, sem deploy. Histórico de conclusões por data permanece como segunda etapa; não é simulado usando a data de cadastro. Dispositivos físicos e outros navegadores não foram testados.
