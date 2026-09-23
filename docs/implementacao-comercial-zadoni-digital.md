# Implementação da expansão comercial — Zadoni Digital

Data: 22/09/2026. Implementação local autorizada após auditoria. Sem commit, push ou publicação.

## Resultado

15 páginas novas: hub de serviços, cinco serviços (SEO Local, Perfil da Empresa, Meta Ads, YouTube, mentoria), diagnóstico, seis guias e cases Zadoni Presentes e Zadoni Digital. Sites aparece como oferta no hub. As 34 URLs anteriores continuam no sitemap, totalizando 49. A home permanece dedicada à Trilha/Combo 10X e os clusters educativos mantêm suas intenções.

Zadoni Presentes tem página própria em `/cases/zadoni-presentes/`, ligada ao hub e às páginas de SEO Local e Perfil da Empresa. Fonte: relato fornecido pelo proprietário nesta conversa. O conteúdo explicita a relação de propriedade e atribui as intervenções ao relato de Adonias Joshua. Registra site, páginas por produto/ocasião, SEO técnico, Search Console, WhatsApp, GBP, correção de inconsistências e duplicidade, conteúdo e experiência mobile.

O título evita classificar como sucesso mensurado sem dados. A evolução estrutural é apresentada como relatada; não há aumento de tráfego, cobertura de indexação, contatos ou vendas tratado como comprovado. O case continua em desenvolvimento quanto à documentação das métricas. Após o envio de uma captura pelo proprietário, o site `https://zadonipresentes.com.br/` foi consultado e capturado diretamente no navegador. Datas de intervenções e exportações comparáveis ainda não foram fornecidas. Case da gráfica permanece pendente; não foram criados resultados, endereços ou avaliações presumidos.

Imagem do site: `assets/images/zadoni-presentes-site.jpg`, captura real em 22/09/2026, viewport de 1360 × 840px, JPEG com 152.835 bytes. Incluída na home, no card do hub e na página do case, com dimensões explícitas, carregamento lazy e exibição proporcional. O case inclui link ao site oficial e data da captura. A imagem documenta a interface observada; não comprova crescimento de tráfego ou conversões. Não foi gerada nem retocada por IA.

O case `/cases/zadoni-digital/` apresenta o próprio portal, com links para Tempo 10X, Matriz de Eisenhower, guia educativo e clusters existentes. Fontes: relato fornecido pelo usuário, arquivos e testes locais, e histórico `docs/seo/eisenhower-search-console-alignment.md`. O crescimento de impressões, consultas e cliques é atribuído ao relato de Adonias; o histórico não fornece janelas comparáveis para quantificá-lo. Nenhuma posição histórica foi apresentada como atual. O novo case recebe links do hub, de SEO Local e de mentoria, sem alterar as ferramentas ou os artigos antigos.

Imagem do Tempo 10X: `assets/images/tempo10x-interface.jpg`, captura real do endereço público `/ferramentas/gestao-do-tempo/`, em 22/09/2026, 1360 × 840px. A captura usa contexto novo de navegador, modo aplicativo e formulário “Nova atividade” vazio. Nenhuma atividade foi salva ou dado pessoal incluído. Imagem adicionada ao destaque da ferramenta na home e ao case Zadoni Digital, com legenda própria, link para a ferramenta, dimensões explícitas e carregamento lazy. O template agora utiliza legendas e destinos específicos de cada case. A aplicação e seus dados não foram modificados.

## Fontes de verdade e comandos

Foto de produto da Zadoni Presentes: `assets/images/zadoni-presentes-cesta.webp`, original obtido de `https://zadonipresentes.com.br/assets/optimized/products/responsive/cesta-cafe-da-manha-especial-720-720.webp`. Imagem de 720 × 720px e 65.424 bytes, sem pessoas identificáveis, sem retoque ou geração por IA. Incluída no card do case no hub comercial e junto à seção de produtos do case, preservando a captura do site na home e no início do case. A foto demonstra o produto apresentado pela loja, não resultados de marketing. Carregamento lazy, dimensões explícitas e exibição verificada em celular e desktop.

Imagem da Matriz de Eisenhower: `assets/images/matriz-eisenhower-interface.jpg`, captura real de `https://zadonidigital.com.br/ferramentas/matriz-eisenhower/`, em 22/09/2026, viewport de 1360 × 840px. Contexto novo de navegador, modo aplicativo, quatro quadrantes vazios e nenhuma tarefa criada. Incluída no acesso à ferramenta na home e na seção correspondente do case Zadoni Digital. Dimensões explícitas, carregamento lazy e legenda; aplicação e arquivos históricos preservados. Exibição conferida em 320 e 1440px.

- `scripts/commercial-content.cjs`: conteúdo das páginas de serviços e referências.
- `scripts/commercial-articles.cjs`: seis guias originais e referências oficiais.
- `scripts/commercial-cases.cjs`: relatos dos projetos próprios Zadoni Presentes e Zadoni Digital, limites das evidências e links relacionados.
- `scripts/build-commercial.cjs`: template comercial, hub, diagnóstico, geração e integração do sitemap.
- `scripts/templates/sobre.template`: cópia integral do HTML aprovado de `/sobre/`; fonte preservada usada pelo gerador antigo.
- `assets/css/commercial.css`: estilos escopados à nova seção, aproveitando tokens/estilos do portal.
- `assets/js/diagnostic.js`: perguntas, regras determinísticas, resultado e resumo.
- `assets/js/commercial-events.js`: adaptador com campos permitidos, sem destino remoto ou consentimento automático.

Gerar apenas a seção comercial: `node scripts/build-commercial.cjs`.

Gerar o portal completo: `node scripts/build-portal.js`. Esse comando usa a fonte aprovada do Sobre e chama o gerador comercial ao final, mantendo as novas rotas no sitemap. A geração é testada duas vezes numa cópia isolada e comparada byte a byte ao projeto.

Não editar diretamente os HTML comerciais gerados; alterar os arquivos de conteúdo/template e gerar novamente. O snapshot anterior à implementação é imutável.

## Alterações no conteúdo existente

- `index.html`: link de rodapé e, após revisão UX autorizada, cabeçalho e bloco inicial com acesso aos serviços, ferramentas, conteúdos, cases e curso. Ver `revisao-ux-home-zadoni-digital.md`.
- `portal/index.html`: um link na seção de transparência do rodapé.
- `sitemap.xml`: adição das 15 URLs, sem modificar entradas históricas.
- `scripts/build-portal.js`: geração do Sobre a partir da fonte aprovada e chamada do gerador comercial.
- Nenhum CSS/JS histórico, ferramenta, URL antiga, title, H1, canonical, checkout ou mensagem de WhatsApp do curso foi substituído.

`commercial-test.cjs` verifica hashes dos arquivos antigos fora da lista explícita. No portal, permite apenas o link de rodapé; na home, permite a navegação e o bloco inicial autorizados na revisão UX, comparando todo o restante com o commit anterior. Também confere URLs e a fonte do Sobre. Isso complementa o teste antigo, que protegia somente 19 URLs e não detectava a regressão editorial do Sobre.

## Diagnóstico

Perguntas condicionais para YouTube, mentoria, anúncios e interesse futuro em automação. O fluxo não solicita nome, telefone, e-mail ou texto livre e não armazena respostas em cookies, localStorage ou sessionStorage. A informação existe em memória enquanto a página está aberta. A escolha de outra rota descarta respostas de um ramo anterior.

Precedência para perfil suspenso quando a pergunta se aplica; caminhos próprios para YouTube e mentoria; categorias de fundação, otimização, crescimento e possível aceleração, sempre preliminares. Cidade fora de Canaã produz aviso de avaliação de atendimento, não afirma presença regional.

Resultado com resumo selecionável/copiável, serviço recomendado e WhatsApp com mensagem genérica. Respostas não entram em URLs, eventos ou logs. O usuário pode compartilhar o resumo voluntariamente. Sem JavaScript, continua disponível um link de contato direto.

## Mensuração e privacidade

O adaptador está desligado: não há GA, GTM, Pixel, endpoint, fila ou envio externo. `configure` recebe uma função de destino e `setConsent(true)` deve ser chamado somente por integração que obtenha a escolha pertinente. Sem ambos, eventos são descartados. Não há atribuição persistente de UTM nesta versão; parâmetros da URL não são propagados, armazenados ou enviados.

Lista permitida de eventos e parâmetros cobre início/conclusão, cliques e visualização comercial. Não há evento de lead enviado, conversa efetiva, proposta ou venda. Essas ações não podem ser inferidas de um clique. Explicação do fluxo está na seção de privacidade do diagnóstico; a política histórica de cursos não foi reescrita nem apresentada como certificação jurídica do novo serviço.

## Verificações

Resultado após inclusão dos dois cases: auditoria SEO aprovada para 49 URLs, 49 titles e 49 descriptions únicos, 1.112 ocorrências de links internos. Smoke local aprovado para as 49 rotas e 404. Proteção de arquivos históricos aprovada. Geração completa executada duas vezes em cópia isolada, sem diferenças nos arquivos gerados ou históricos. Testes de Tempo 10X, métricas e Eisenhower foram aprovados na implementação anterior; seus arquivos permanecem intactos.

Teste de navegador aprovado: 60 combinações de página/largura, zero violações detectadas pelo axe nas regras executadas, nove caminhos do diagnóstico e fluxo por teclado; sem erros de JavaScript ou requisições externas nas páginas comerciais. Resultado estruturado: [commercial-validation/results.json](seo/commercial-validation/results.json). Corrigido contraste do botão WhatsApp na seção comercial durante a validação. Fallback de contato permanece HTML visível até a inicialização do diagnóstico, inclusive se o script falhar.

Executar no workspace:

```text
node scripts/commercial-test.cjs
node scripts/commercial-build-test.cjs
node scripts/seo-regression.js
node scripts/seo-audit.js
node scripts/smoke-test.js
node scripts/tempo10x-test.js
node scripts/task-metrics-test.cjs
node scripts/eisenhower10x-test.mjs
node scripts/commercial-browser-test.cjs
```

Dependências de teste de navegador ficam fora do projeto: Playwright e axe em `%TEMP%/zadoni-commercial-validation/node_modules`. O teste permite informar `ZADONI_TEST_MODULES` e `ZADONI_BROWSER`; usa Chrome em modo headless. Nenhuma biblioteca foi adicionada ao site. Capturas e resultado ficam em `%TEMP%/zadoni-commercial-results`.

Cobertura: 15 páginas em 320, 375, 768 e 1440px; H1, overflow, regras axe WCAG A/AA; ramificações completas do diagnóstico; interação por teclado, foco, erros e reinício; ausência de armazenamento e de requisições externas; eventos sem duplicação; proteção de payload e comportamento sem consentimento; contato sem JavaScript.

As verificações automáticas não certificam acessibilidade integral ou Core Web Vitals de campo. Não foram validados envio real de WhatsApp, indexação, ranking, cabeçalhos/redirects na hospedagem ou funcionamento de uma conta de Analytics inexistente no projeto.

## Referências editoriais consultadas

Google: classificação local (7091), diretrizes de representação (3038177), categorias (7249669), avaliações (3474122), edição do perfil (3039617). YouTube: desempenho e descoberta (141805). Meta Blueprint: objetivos de campanha e mensuração. Links completos estão junto aos conteúdos correspondentes. A página inicial de geração de leads da Meta redirecionou para login; não foi usada como prova de opções específicas de plataforma.

Os guias distinguem recomendações de organização da Zadoni Digital das orientações oficiais. Não há volume de busca estimado, resultados comerciais inventados ou datas históricas de publicação simuladas. Data exibida refere-se à revisão do conteúdo.

## Pendências para publicar

1. Revisar apresentação e escopo comercial com o proprietário. Valores, duração de mentoria, quantidade de vídeos e pacotes não foram inventados.
2. Complementar o relato já recebido da Zadoni Presentes com URL oficial, datas e evidências de métricas; receber relação/autorização da gráfica, se aplicável.
3. Confirmar hospedagem e processo de publicação/reversão: README menciona GitHub Pages, mas o projeto também usa `.htaccess`.
4. Revisar integração de analytics/privacidade quando houver conta e destino definidos; funcionamento comercial não depende dela.
5. Conferir site publicado, redirects, canonicals, robots e sitemap antes/depois; obter dados atuais do Search Console para comparação dos clusters antigos e novos.

Para reversão futura, guardar uma cópia da versão efetivamente publicada antes do deploy. Não usar reset destrutivo para desfazer o trabalho: restaurar somente arquivos do lote a partir da cópia validada. Nenhuma publicação está incluída nesta execução.
