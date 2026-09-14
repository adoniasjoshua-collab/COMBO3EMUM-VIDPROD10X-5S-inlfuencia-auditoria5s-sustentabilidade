# Experiência das ferramentas 10X — 14/09/2026

Implementação local da direção aprovada: simplicidade inspirada no Todoist, prioridades no TickTick e controle de tempo no Clockify. Referências públicas: https://www.todoist.com/, https://ticktick.com/ e https://clockify.me/mobile-time-tracking.

## Entrega

- Navegação inferior no celular e lateral a partir de 1120px. Em telas intermediárias, navegação horizontal.
- Matriz: lista inicial no celular, matriz inicial no desktop, alternância manual e filtro por quadrante. Progresso, XP, análise e backups têm uma visualização separada.
- Tempo 10X: atividades, criação/edição e relatórios separados; filtros compartilhados continuam afetando atividades e relatórios. Cronômetro ativo permanece acessível nas três visualizações.
- Formulários com campos secundários recolhidos; edição expõe os detalhes existentes. Diálogo da matriz ancorado à parte inferior no celular.
- Cartões do Tempo 10X destacam tempo registrado e ações; planejamento detalhado fica em uma seção expansível.
- Modo aplicativo opcional, com retorno ao portal. A escolha dura a visita atual. Não é instalação PWA nem sincronização entre dispositivos.
- Código de apresentação compartilhado, sem mudanças nas chaves, schemas ou regras de armazenamento das aplicações. As bases continuam independentes.
- Assets novos versionados; versão dos scripts e CSS de Tempo 10X atualizada para evitar cache antigo.

## Validação

- Suíte existente de navegador da matriz aprovada: CRUD, datas, arraste desktop/touch, backups, XP, armazenamento, teclado, impressão e sete larguras. O roteiro foi atualizado para abrir as novas visualizações e os campos opcionais.
- Nova suíte `scripts/workspace-browser-test.cjs`: navegação e filtro da matriz, criação/edição de atividade, persistência após recarga, iniciar/pausar/retomar/finalizar cronômetro, acesso ao timer em relatórios e ausência de exceções.
- Tempo 10X verificado em 320, 390, 768, 1024 e 1440px sem overflow horizontal; axe WCAG 2 A/AA e 2.1 AA sem violações nas três visualizações em 390 e 1440px. Tabelas roláveis receberam acesso por teclado.
- Testes de regras da matriz e Tempo 10X aprovados. SEO: 34 páginas, 837 links internos; regressão de 19 URLs históricas; smoke de 34 páginas e 404 aprovados.
- Capturas de desktop e celular inspecionadas visualmente. São dados sintéticos de teste.

Reprodução no ambiente atual:

```powershell
$env:EISENHOWER_TEST_MODULES = "$env:TEMP\eisenhower10x-validation\node_modules"
node scripts/eisenhower10x-browser-test.cjs
node scripts/workspace-browser-test.cjs
node scripts/tempo10x-test.js
```

Os testes de navegador usam Playwright, axe e Chrome externos ao projeto. Evidências em `%TEMP%\workspace10x-validation` e `%TEMP%\eisenhower10x-validation-artifacts`.

Não houve deploy, teste em aparelho físico, Safari/Firefox ou pesquisa com usuários. A validação automatizada não comprova aumento de retenção nem acessibilidade integral. As pendências da inspeção anterior sobre datas de publicação regionais e cache global do portal não fazem parte desta alteração de UX.

## Revisão: tarefas compactas expansíveis

Após aprovação do usuário, os cartões passaram a linhas com título, ação rápida e expansão nativa por teclado/toque. Descrição complementar, categoria, prazo, planejamento, mover, editar e excluir aparecem ao expandir. Na matriz, a ação rápida conclui/reabre; no Tempo 10X, inicia/pausa/retoma. Um cronômetro ativo impede iniciar outro e continua acessível no painel persistente.

A lista usa uma coluna também no desktop. Concluídas ficam em grupos recolhidos com contagem (por quadrante na matriz), podendo ser abertas e recuperadas. A ordem relativa existente foi preservada; o agrupamento de concluídas é a única redistribuição automática adicional. Expansões independentes sobrevivem à atualização da interface durante a visita. “Recolher todas” fecha os grupos e os detalhes. Impressão abre os detalhes e restaura a expansão anterior depois.

Validação adicional: oito tarefas na matriz mobile com altura recolhida entre 44 e 72px na asserção automatizada, duas expansões simultâneas, recolhimento global, conclusão/reabertura e persistência da expansão durante pausa/retomada. Captura inspecionada em `compact-matrix-mobile.png` na pasta temporária de evidências. Suítes completas da matriz e workspace, regras das duas aplicações, SEO e smoke aprovados novamente. Novas URLs de assets usam versão `20260914-2`, incluindo o módulo dependente de interface da matriz.
