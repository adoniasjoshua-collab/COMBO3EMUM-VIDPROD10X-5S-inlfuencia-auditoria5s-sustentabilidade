# Mapa master — expansão comercial Zadoni Digital

Data: 22/09/2026. Proposta de implementação, não páginas já criadas. Rotas propostas não colidem com diretórios existentes na inspeção local.

## Arquitetura e preservação

Manter home comercial do curso e `/portal/` educacional. Criar `/servicos-digitais/` como hub comercial adicional. Integrar por link discreto em `/portal/` e, quando implementado, ponto de navegação apropriado na home/rodapé, sem substituir menus, CTAs do curso ou conteúdo histórico. Aplicar a menor alteração compartilhada possível, com revisão do diff.

Hierarquia comercial: hub → serviços → diagnóstico; hub/serviços → cases reais; artigos → serviço relacionado → diagnóstico. WhatsApp direto disponível sem obrigar a responder o filtro. Menu comercial inicialmente usa hub, serviços e diagnóstico; cases/conteúdos só recebem links publicados e existentes. Contato pode apontar para seção do hub, sem página vazia.

## Mapa de páginas comerciais

Termos são hipóteses editoriais, não pesquisa validada de volume. Página-mãe de todos os serviços e cases: `/servicos-digitais/`. Público: pequenos negócios, inicialmente de Canaã dos Carajás. Status de todas as rotas: planejamento.

| Rota proposta | Palavra-chave principal e secundárias | Intenção / funil / público específico | CTA e links obrigatórios | Conteúdo e prioridade |
|---|---|---|---|---|
| `/servicos-digitais/` | serviços digitais em Canaã; marketing local | descoberta comercial / consideração / empresários locais | diagnóstico, todos os serviços publicados, cases disponíveis e sobre | oferta, método, sites, responsável e contato; P1 |
| `/seo-local-canaa-dos-carajas/` | SEO Local em Canaã dos Carajás; consultoria SEO local | contratação / decisão / negócios que dependem de busca local | hub, Perfil da Empresa, diagnóstico, case aplicável | escopo amplo site + presença local, processo e limites; P1 |
| `/otimizacao-google-meu-negocio-canaa/` | otimização Google Meu Negócio Canaã; Perfil da Empresa | contratação específica / decisão / donos de perfis | hub, SEO Local, diagnóstico | categorias, dados, fotos, avaliações, elegibilidade e problemas; P1 |
| `/meta-ads-negocios-locais-canaa/` | gestão Meta Ads Canaã; anúncios Facebook e Instagram | contratação de execução / decisão / empresas com oferta e atendimento | hub, mentoria, diagnóstico | gestão, criativos, rastreamento, mídia separada do honorário; P1 |
| `/otimizacao-canal-youtube/` | otimização de canal YouTube; SEO para YouTube | contratação de execução / decisão / negócios e criadores | hub, mentoria, diagnóstico | organização, playlists, títulos, descrições, miniaturas, análise; delimitar produção de vídeo; P1 |
| `/mentoria-seo-trafego-pago/` | mentoria SEO e tráfego pago; orientação marketing digital | contratação de orientação / decisão / proprietários e equipes | hub, SEO Local, Meta Ads, diagnóstico | acompanhamento e orientação; separar de execução; duração/preço só confirmados; P1 |
| `/diagnostico-presenca-digital/` | diagnóstico presença digital; avaliação inicial | conversão / decisão / interessados nos serviços | hub, serviço recomendado e WhatsApp | filtro acessível, resultado preliminar, política de privacidade; P1 |
| `/cases/zadoni-presentes/` | Zadoni Presentes; case presença digital | prova / consideração / interessados na aplicação prática | hub, serviços efetivamente aplicados, diagnóstico | negócio próprio, contexto e ações comprovadas; P1 condicionado às evidências |
| `/cases/digital-grafica-canaa/` | case gráfica Canaã; marketing para gráfica | prova / consideração / negócios locais | hub, serviços comprovados, diagnóstico | relação, autorização e fatos ainda não comprovados; condicionado, sem publicação automática |

YouTube e mentoria são ofertas atuais conforme complemento do usuário, sem expansão automática para páginas por cidade. Serviço de sites fica em seção identificável do hub neste lote; automação permanece interesse futuro, sem apresentar produto disponível não confirmado.

## Mapa editorial — lote 2

Página-mãe de navegação: seção de conteúdos de `/servicos-digitais/`. Público: proprietários e equipes de negócios locais. Funil: descoberta/consideração. CTA: diagnóstico, com link ao serviço indicado. Cada artigo deve voltar ao hub, indicar autor/revisão e fontes oficiais. Status: planejado, P2. Criar diretório `/marketing-local/` para os artigos não exige criar um hub vazio nesse caminho.

| Rota proposta | Palavra-chave / termos secundários | Intenção principal | Serviço relacionado e conteúdo necessário |
|---|---|---|---|
| `/marketing-local/melhorar-presenca-google-maps/` | melhorar presença Google Maps; empresa no mapa | aprender melhorias práticas | SEO Local; checklist, limitações, exemplos comprovados |
| `/marketing-local/erros-google-meu-negocio/` | erros Google Meu Negócio; perfil incompleto | identificar problemas | Perfil da Empresa; erros e correções com fontes |
| `/marketing-local/categoria-principal-perfil-google/` | categoria principal Perfil da Empresa; categoria Google | escolher categoria adequada | Perfil da Empresa; processo de escolha e validação |
| `/marketing-local/site-ou-whatsapp-perfil-google/` | site ou WhatsApp no Perfil da Empresa | entender destinos e funções | Perfil da Empresa + seção sites; verificar recursos/políticas oficiais vigentes |
| `/marketing-local/avaliacoes-negocios-locais/` | avaliações Google; reputação local | solicitar e responder avaliações adequadamente | Perfil da Empresa; processo sem manipulação |
| `/marketing-local/quando-anunciar-meta-ads/` | quando anunciar Meta Ads; medir anúncios locais | avaliar prontidão e métricas | Meta Ads; orçamento, oferta, atendimento e mensuração |

Distribuição percentual do prompt é orientação futura, não requisito matemático desses seis artigos. Não produzir artigos de YouTube/mentoria só para preencher categorias. SEO Local cobre estratégia ampla; página do Perfil cobre execução específica; artigos respondem dúvidas e não repetem páginas comerciais. Mentoria vende orientação; gestão vende execução. Canibalização é risco a acompanhar por consultas reais, não conclusão baseada só em termos parecidos.

## Diagnóstico: contrato funcional proposto

Sem backend neste MVP. Regras determinísticas, sem IA externa ou score fictício. Perguntas progressivas, labels, foco no título da etapa, erros associados ao campo, voltar sem perda e opção “não sei”. Dados apenas em memória enquanto a página está aberta; não persistir respostas livres no localStorage.

Objetivo (incluindo YouTube e mentoria) → tipo/cidade → situação pertinente ao objetivo → dificuldade/urgência opcionais → resultado. Só perguntar investimento a interessados em anúncios. Para YouTube perguntar existência/objetivo do canal; para mentoria experiência e tipo de orientação. Não pedir nome/telefone obrigatoriamente para mostrar o resultado; contato voluntário ocorre no WhatsApp. Nenhum dado do formulário em URL.

Precedência proposta:

1. Perfil suspenso/problema de acesso: rota especial “avaliar situação do perfil”; não recomendar acelerar anúncios como solução para suspensão.
2. Objetivo explícito YouTube ou mentoria: encaminhar ao serviço correspondente, com resultado específico, sem encaixe forçado nas quatro categorias locais.
3. Dados insuficientes/“não sei”: avaliação inicial, sem afirmar prontidão.
4. Ausência de base necessária ao objetivo: Fundação local.
5. Base existente com problemas declarados: Otimização.
6. Base, oferta e capacidade de atendimento declaradas, interesse orgânico: Crescimento.
7. Interesse em anúncios com oferta/atendimento e medição a validar: candidato à Aceleração, condicionado a auditoria; não assumir prontidão apenas por ter site.

Cidade fora de Canaã: avaliação de atendimento, sem anunciar presença ou escritório naquela cidade. Automação: interesse a avaliar, sem promessa de oferta atual. Resultado nunca garante posição, leads ou vendas.

Mensagem do link WhatsApp contém apenas texto genérico e identificador estático do serviço; resumo sem dados de contato pode ser copiado pelo usuário e enviado voluntariamente na conversa. Abrir WhatsApp não significa enviar mensagem. Oferecer copiar contato quando o aplicativo não abrir. Testar acentos, teclado, leitores de tela, botão voltar, respostas desconhecidas e todas as ramificações. Revisão comercial das regras antes de publicar.

## Plano de execução e critérios

1. **Lote 0 concluído:** inventário, baseline, riscos, mapa e plano de mensuração. Nenhuma página nova implementada.
2. **Lote técnico preparatório:** reconciliar `/sobre/` com gerador, manter HTML atual; proteger 34 URLs com baseline; criar mecanismo adicional de geração/sitemap que preserve entradas históricas; testar numa cópia isolada.
3. **Lote 1:** hub, cinco páginas de serviço e diagnóstico. Integrar navegação mínima, mensagens WhatsApp próprias, privacidade e eventos. Case próprio somente com material comprovado; gráfica pode continuar pendente sem bloquear os serviços.
4. **Lote 2:** seis artigos e links contextuais. Manter fontes primárias, autoria e datas de revisão verdadeiras.
5. **Lote 3:** observar eventos e dados comerciais, melhorar conteúdo e fluxo. Expansão regional permanece posterior e separada.

Antes de publicar: build isolado reproduzível, zero mudanças editoriais históricas não previstas, sitemap com antigas + novas publicáveis, canonicals próprios, links/âncoras válidos, 404 real, JSON-LD coerente, responsividade em 320/375/768/1440px, teclado e foco, contraste e labels revisados visando WCAG 2.2 AA. Medir performance com método documentado, comparar páginas antigas antes/depois e não confundir laboratório com Core Web Vitals de campo.

Hospedagem precisa ser confirmada. Prévia deve ter acesso restrito ou controle de indexação apropriado; conferir remoção de bloqueios da produção e canonicals corretos. Preparar cópia da versão publicada e reversão compatível com a hospedagem. Publicar é uma etapa separada da preparação atual. Após publicação, verificar HTTP, redirects, robots, sitemap e fluxos reais; guardar evidência.

## Acompanhamento 30/60/90 dias

- 30 dias: validar descoberta/indexação, erros de rastreamento, funcionamento do contato e origem registrada. Comparar também clusters antigos.
- 60 dias: revisar dúvidas reais, abandono do diagnóstico e qualidade dos contatos; ajustar conteúdo com evidência suficiente.
- 90 dias: atualizar cases com período e fonte; avaliar continuidade, página própria de sites e expansão conforme capacidade. Não atribuir resultados a uma única ação sem evidência.

Dados úteis ainda necessários: hospedagem/publicação, Search Console atual por página e consulta (com período/filtros), canais oficiais e material da Zadoni Presentes, evidências/autorização da gráfica, escopo efetivo das mentorias/YouTube e plataforma de mensuração desejada. Essas lacunas bloqueiam apenas as partes dependentes.
