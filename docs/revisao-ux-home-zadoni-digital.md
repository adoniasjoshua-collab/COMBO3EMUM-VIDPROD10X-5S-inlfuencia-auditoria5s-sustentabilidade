# Revisão UX da home — Zadoni Digital

Data: 22/09/2026. Inspeção local e melhoria implementada após o pedido de análise e a continuidade autorizada pelo usuário. Sem publicação.

## Diagnóstico observado

A raiz apresentava uma landing page do Combo Produtividade 10X: marca, primeira tela, menu e CTAs concentrados no curso. Essa organização não ajudava um visitante interessado em SEO, sites, YouTube ou mentoria a reconhecer que havia serviços no mesmo portal.

O único link para serviços estava no rodapé, em cerca de 8.064px no desktop de 1440px e 11.897px no celular de 390px, nas capturas locais com viewport de 900px de altura. A localização variava conforme largura e renderização, mas o problema era consistente: acesso distante do início e sem destaque.

O item “Ferramenta grátis” levava apenas ao Tempo 10X. A Matriz de Eisenhower não tinha entrada equivalente. “Contato” apontava para `#cta`, uma seção de compra do curso. Os cases não tinham acesso direto. O menu móvel era encoberto pelo backdrop, cuja camada estava acima do cabeçalho; a navegação aparecia escurecida e desfocada. Havia contornos de scaffold e um aviso flutuante de WhatsApp competindo com o conteúdo.

Essas são observações de estrutura e interface, não resultados de pesquisa com usuários ou prova de perda de conversão.

## Estrutura implementada

1. Identificação “Zadoni Digital — Conhecimento e soluções digitais” no cabeçalho.
2. Menu: Serviços, Ferramentas, Conteúdos, Cases, Trilha 10X, Contato e Diagnóstico.
3. Abertura com contexto da marca, CTA para serviços e acesso ao diagnóstico.
4. Quatro caminhos por necessidade: negócio, rotina, aprendizado e formação.
5. Links diretos para SEO Local, Perfil da Empresa, sites, Meta Ads, YouTube e mentoria.
6. Entradas equivalentes para Tempo 10X e Matriz de Eisenhower.
7. Links para os cases Zadoni Presentes e Portal Zadoni Digital, identificados como projetos próprios.
8. Transição explícita para a apresentação histórica do curso, mantida integralmente abaixo.

“Contato” agora chega à seção comercial de contato. “Ferramentas” abre o hub completo. O menu móvel usa um disclosure sem backdrop: abrir/fechar, Escape com retorno de foco, fechamento após selecionar link e links disponíveis sem JavaScript. Foram removidos visualmente os contornos de scaffold e o tooltip automático, preservando o botão e o destino de WhatsApp existentes.

## Preservação e limite da mudança

Home híbrida nesta etapa: uma entrada geral de navegação antes da landing histórica. URL, canonical, title, description, H1, schemas, conteúdo do curso, checkout e âncoras antigas continuam iguais. A abertura nova usa H2; a hierarquia histórica do curso não foi reescrita.

Essa decisão melhora descoberta e acesso sem redefinir imediatamente a intenção SEO da raiz. O título de busca continua identificando o curso. Uma futura conversão integral da raiz em home institucional — com novo H1, metadados e eventual página própria do curso — é outra decisão editorial, a fundamentar com dados por URL no Search Console e plano de migração se houver mudança de endereço. Preservar metadados não garante ranking; não houve aferição de desempenho de busca nesta rodada.

O restante da longa página do curso permanece com sua identidade e conteúdo existentes. Recursos legados, como o botão de assistente com comportamento de placeholder e o aviso de cookies, não foram reimplementados nesta revisão de acessos. A medição comercial continua sem destino remoto configurado.

## Arquivos e validação

- `index.html`: cabeçalho e bloco de descoberta; oferta histórica preservada.
- `assets/css/home-portal.css`: estilos exclusivos da entrada da home e correções de navegação.
- `assets/js/home-portal.js`: comportamento do menu independente do script histórico.
- `scripts/commercial-test.cjs`: comparação com baseline, permitindo apenas os blocos de navegação autorizados e preservando o restante do HTML histórico.
- `scripts/home-ux-test.cjs`: teste em navegador da nova entrada.

Testes aprovados: preservação das 34 URLs anteriores; auditoria das 49 URLs atuais, titles/descriptions únicos e links internos; HTTP local e 404; geração completa idempotente em cópia isolada; `git diff --check`.

Navegador: 320, 390, 768, 1024 e 1440px; sem rolagem horizontal; acesso a serviços na primeira tela; menu por teclado, Escape e destino de links; fallback sem JavaScript; zero erros de JavaScript e zero violações axe nas áreas novas testadas. Isso não equivale a certificação integral da página antiga, teste manual com leitor de tela ou medição de Core Web Vitals.

Resultados e capturas: [home-ux-validation/results.json](seo/home-ux-validation/results.json), [desktop](seo/home-ux-validation/home-1440.png) e [celular](seo/home-ux-validation/home-390.png).

## Foto fornecida pelo responsável

Adicionada a foto enviada pelo usuário (`FOTO PARA CURRICULUM.jpeg`) à apresentação de Adonias na entrada da home e no hub de serviços. Arquivo local: `assets/images/adonias-joshua-apresentacao.jpeg`, 1086 × 1448px, 159.293 bytes. Cópia integral do original, sem geração ou retoque. O tamanho já permite uso leve nesta seção secundária; carregamento lazy, decodificação assíncrona e dimensões explícitas reservam o espaço da imagem. Exibição proporcional, sem recortar o rosto ou alterar o uniforme. As imagens históricas e os metadados sociais permanecem intactos.
