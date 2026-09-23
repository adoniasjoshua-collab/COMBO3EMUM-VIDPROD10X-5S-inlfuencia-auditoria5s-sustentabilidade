# Plano de mensuração — expansão comercial

Data: 22/09/2026. Planejamento; nenhuma tag, integração ou coleta adicionada.

## Situação atual e implementação proposta

Não foi localizado código GA/GTM/Meta Pixel nos HTML/JS pesquisados. Confirmar eventual injeção pela hospedagem antes de adicionar tags. Não inventar IDs, contas ou backend. Implementar eventos essenciais no Lote 1; análises e otimizações ficam no Lote 3.

Preparar adaptador único de eventos, com destino desligado até configurar ferramenta e escolhas de privacidade. Validar localmente com coletor de teste em memória; ausência de ferramenta remota significa ausência de relatórios agregados. Nenhuma promessa de mensurar vendas automaticamente.

## Contrato de eventos

Parâmetros comuns permitidos: `page_path` sem query/hash, `service_id` enumerado, `placement` enumerado. Não enviar URL completa de WhatsApp ou texto do formulário. Sem nome, telefone, e-mail, empresa, cidade livre, dificuldade, mensagem, resumo ou identificador pessoal.

| Evento | Condição e unicidade | Parâmetros adicionais | Destino | Validação / KPI |
|---|---|---|---|---|
| `service_view` | uma vez por carregamento de página comercial | nenhum | adaptador; ferramenta a confirmar | recarregar/navegar; visualizações comerciais, não usuários únicos |
| `diagnostic_start` | primeira resposta, uma vez por tentativa | `flow_version` | mesmo destino | voltar etapa não repete; inícios |
| `diagnostic_complete` | resultado calculado, uma vez por tentativa | `recommendation_id`, `flow_version` | mesmo destino | completar, voltar, repetir botão; conclusões |
| `recommendation_click` | ativação do link de serviço recomendado | `recommendation_id` | mesmo destino | mouse/teclado; interesse no serviço |
| `whatsapp_click` | ativação do link, um evento por ação | `placement` | mesmo destino | não duplicar handlers; cliques, não conversas |
| `phone_click` / `email_click` | ativação de link tel/mailto, se disponível | `placement` | mesmo destino | teclado/mouse; intenção de contato |
| `lead_submit_success` | somente confirmação real de backend futuro | esquema futuro mínimo | não ativo no MVP | não disparar no clique WhatsApp nem na conclusão do diagnóstico |

Cliques repetidos deliberados podem gerar novos eventos; uma mesma ativação não pode disparar por handlers duplicados. Reiniciar diagnóstico cria nova tentativa em memória. Não desabilitar recurso comercial quando o usuário recusa analytics.

## Origem e campanhas

Tratar `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` como valores não confiáveis. Não transmitir valores arbitrários que possam conter dados pessoais. Usar convenção controlada/allowlist para campanhas próprias, limites de tamanho e descarte de valores desconhecidos. Não propagar parâmetros para todos os links internos, canonicals ou sitemap. Retenção entre páginas depende da solução e da escolha de privacidade; na versão sem persistência, declarar perda possível de atribuição. Não persistir primeiro/último contato sem definir regras e retenção.

Identificação estática de origem no texto genérico do WhatsApp pode distinguir serviço; não prova origem de campanha nem mensagem enviada. Não registrar o conteúdo dessa URL em analytics.

## Indicadores e limites

| Indicador | Definição | Fonte real necessária |
|---|---|---|
| Conclusão do diagnóstico | tentativas concluídas / iniciadas no mesmo período | eventos, com duplicação controlada |
| Clique WhatsApp | quantidade de ativações | site; não equivale a contato recebido |
| Conversas iniciadas | contatos efetivamente recebidos | registro manual/CRM/integração autorizada |
| Lead qualificado | conversa com necessidade aderente, região atendida e interesse real de contratação | avaliação humana; resultado do filtro não basta |
| Reuniões, propostas, contratos | etapas confirmadas, deduplicadas por oportunidade | registro comercial |
| Taxa de fechamento | contratos / propostas de uma mesma coorte e janela definida | registro comercial com datas |
| Custo por lead | gasto de mídia / leads atribuídos pela regra documentada | plataforma de anúncios + registro comercial |
| Receita recorrente | valor contratado recorrente, sem somar propostas ou serviços pontuais | informação confirmada pelo responsável |

Não definir metas numéricas sem baseline. Uma planilha/CRM futuro pode registrar data, serviço, origem declarada e estágio; dados de contato ficam separados do analytics, com acesso e retenção definidos. Não criar esse armazenamento sem necessidade operacional acordada.

## Comparação de SEO

Exportar Search Console antes de publicar: páginas e consultas, cliques, impressões, CTR e posição com período, país, dispositivo e tipo de pesquisa. Guardar exportação original; não inferir demanda a partir de posição isolada. Comparar janelas equivalentes e sazonalidade quando houver histórico. Separar novas páginas dos clusters antigos para não ocultar perdas na soma total. Sem acesso, registrar “não verificado”, nunca zero.

## Aceite

Testar origem permitida e desconhecida, recusa de medição, ausência de destino, mouse/teclado, voltar/reiniciar, abertura cancelada do WhatsApp e bloqueio de popup. Inspecionar payloads e rede com dados fictícios para comprovar ausência de informações pessoais e de disparos duplicados. Confirmar ferramenta remota recebendo dados somente quando configurada. Implementação não pode impedir uso do site ou apagar armazenamento das ferramentas existentes.
