// Conteúdo comercial: fonte de verdade das novas páginas. Sem dados de clientes inventados.
const sources = {
  local: ['Classificação local no Google', 'https://support.google.com/business/answer/7091?hl=pt-BR'],
  rules: ['Diretrizes do Perfil da Empresa', 'https://support.google.com/business/answer/3038177?hl=pt-BR'],
  category: ['Categorias de negócios no Google', 'https://support.google.com/business/answer/7249669?hl=pt-BR'],
  reviews: ['Orientações do Google sobre avaliações', 'https://support.google.com/business/answer/3474122?hl=pt-BR'],
  edit: ['Editar informações do Perfil da Empresa', 'https://support.google.com/business/answer/3039617?hl=pt-BR'],
  youtube: ['Desempenho e descoberta no YouTube', 'https://support.google.com/youtube/answer/141805?hl=pt-BR'],
  meta: ['Meta Blueprint: objetivos de campanha e mensuração', 'https://www.facebookblueprint.com/student/path/248574-campaign-objectives-ads-manager']
};
const services = [
  {
    id: 'seo', slug: 'seo-local-canaa-dos-carajas/', label: 'SEO Local',
    title: 'SEO Local em Canaã dos Carajás | Zadoni Digital',
    description: 'Organize site, presença no Google e caminhos de contato com SEO Local em Canaã dos Carajás. Conheça o método da Zadoni Digital e peça um diagnóstico.',
    h1: 'SEO Local para conectar sua empresa a quem procura por ela',
    lead: 'Uma presença local consistente começa com informações claras, páginas úteis e um caminho simples até o atendimento. Vamos identificar o que precisa melhorar no seu negócio em Canaã dos Carajás.',
    short: 'Conecte site, presença local e atendimento com um plano de prioridades.',
    sections: [
      ['Quando faz sentido', '<p>Você atende uma região definida, mas quem pesquisa seus serviços tem dificuldade para entender o que oferece ou como pedir um orçamento? O trabalho começa pelo percurso desse cliente: busca, página ou perfil, contato e resposta da empresa.</p><p>Comércios, gráficas, oficinas, restaurantes e prestadores de serviços têm necessidades diferentes. Por isso, o diagnóstico considera sua oferta, sua área real de atendimento e a capacidade de receber novos contatos.</p>'],
      ['O que será avaliado', '<ul><li>Clareza dos serviços, das páginas e dos contatos.</li><li>Acesso às páginas, navegação no celular e organização técnica do site.</li><li>Coerência entre site e Perfil da Empresa, quando o negócio for elegível.</li><li>Conteúdo que responde às dúvidas antes do orçamento.</li><li>Possibilidades de acompanhar contatos e sua qualidade.</li></ul><p>O plano separa problemas técnicos, conteúdo e rotina comercial. Você recebe prioridades que podem ser discutidas antes de qualquer execução.</p>'],
      ['Site, perfil e anúncios cumprem funções diferentes', '<p>O site apresenta a oferta em profundidade. O Perfil da Empresa reúne informações locais. Os anúncios permitem trabalhar campanhas com investimento de mídia. Esses canais podem se complementar, mas um não corrige automaticamente os problemas do outro.</p><p>Relevância, distância e destaque influenciam os resultados locais do Google. A distância de quem pesquisa não é um controle da agência; não existe garantia de primeira posição.</p>'],
      ['Como acompanhamos o trabalho', '<p>O método Zadoni Local SEO Ops organiza diagnóstico, plano de ação e registro das intervenções. O acompanhamento compara períodos e documenta o que mudou, sem confundir clique com cliente.</p><ol><li>Entender a situação e registrar a base disponível.</li><li>Definir escopo e prioridades na proposta.</li><li>Executar as intervenções combinadas.</li><li>Revisar evidências, contatos e próximos passos.</li></ol><p>Impressões e cliques ajudam a observar a descoberta. Conversas qualificadas, propostas e contratos precisam de confirmação no atendimento. O prazo de acompanhamento é combinado conforme o projeto.</p>']
    ], faq: [['Vocês garantem posição no Google?', 'Não. O trabalho melhora aspectos que podemos avaliar e executar; a classificação depende de vários fatores.'], ['Preciso trocar meu site?', 'Só se houver uma necessidade identificada. A primeira opção é aproveitar o que funciona e preservar as URLs existentes.']], sources: ['local'], related: ['google', 'mentoria']
  },
  {
    id: 'google', slug: 'otimizacao-google-meu-negocio-canaa/', label: 'Perfil da Empresa no Google',
    title: 'Google Meu Negócio em Canaã: otimização | Zadoni Digital',
    description: 'Melhore a apresentação do seu Perfil da Empresa no Google em Canaã. Avaliação de informações, categorias e contato, com orientação da Zadoni Digital.',
    h1: 'Seu Perfil da Empresa precisa representar bem o seu negócio',
    lead: 'Otimize o Google Meu Negócio — hoje Perfil da Empresa no Google — com informações coerentes e uma rotina que caiba no seu atendimento.',
    short: 'Revise informações, categorias e caminhos para o cliente entrar em contato.',
    sections: [
      ['Começar pelo que o cliente encontra', '<p>Um cliente pode chegar ao seu perfil querendo confirmar um horário, encontrar um serviço ou falar com a empresa. A avaliação observa esses caminhos e aponta informações ausentes, divergentes ou pouco claras.</p><p>Antes das mudanças, verificamos o acesso de gestão e a situação do perfil. Não solicitamos sua senha em formulário público. A forma de acesso ao trabalho é combinada por canal apropriado.</p>'],
      ['O que pode entrar no escopo', '<ul><li>Revisão do nome real, categoria, horários e contato.</li><li>Organização dos serviços e produtos que a empresa realmente oferece.</li><li>Seleção de fotos próprias e informações úteis.</li><li>Orientação para avaliações e respostas.</li><li>Revisão de site, área atendida e recursos disponíveis no perfil.</li></ul><p>Cada item depende da situação do negócio e dos recursos disponibilizados pelo Google. O escopo aprovado indica o que será feito e quais informações você precisa fornecer.</p>'],
      ['Cuidado com alterações e promessas', '<p>Endereço, área de atendimento e categorias precisam representar a operação real. Não criamos locais fictícios nem acrescentamos palavras-chave ao nome comercial para tentar ganhar posições. Negócios exclusivamente on-line não devem presumir elegibilidade.</p><p>Se o perfil estiver suspenso ou houver problema de acesso, a prioridade é entender a situação e avaliar a documentação necessária. Uma revisão não garante reativação nem prazo de resposta do Google.</p>'],
      ['Um registro claro do antes e depois', '<p>O trabalho documenta a situação encontrada e as alterações aprovadas. Capturas e métricas só entram em relatórios ou cases quando houver contexto e autorização. Uma mudança de informação é uma entrega; crescimento de contatos é um resultado a verificar.</p><p>Para manter o perfil útil, também alinhamos quem atualiza horários, registra novidades e responde ao público. Essa responsabilidade precisa continuar depois da primeira otimização.</p>']
    ], faq: [['Ter um perfil substitui um site?', 'Depende do seu objetivo. O perfil facilita informações locais; o site permite detalhar oferta, processo e conteúdo.'], ['Vocês compram avaliações?', 'Não. Trabalhamos com orientações para avaliações autênticas, sem compra ou incentivos.']], sources: ['rules', 'category', 'reviews'], related: ['seo', 'meta']
  },
  {
    id: 'meta', slug: 'meta-ads-negocios-locais-canaa/', label: 'Meta Ads',
    title: 'Meta Ads para negócios locais em Canaã | Zadoni Digital',
    description: 'Planeje anúncios para Facebook e Instagram com foco no atendimento local em Canaã. Conheça a gestão de Meta Ads e solicite uma proposta personalizada.',
    h1: 'Anúncios com uma oferta clara e um atendimento preparado',
    lead: 'Gestão de Meta Ads para negócios locais de Canaã dos Carajás: do planejamento da campanha à análise da qualidade dos contatos.',
    short: 'Planeje campanhas, criativos e atendimento para conversar com o público certo.',
    sections: [
      ['Antes de investir em mídia', '<p>O primeiro passo é entender o que será oferecido, para quem e como a empresa responderá. Uma campanha pode trazer interesse, mas o orçamento não corrige uma oferta confusa ou a falta de atendimento.</p><p>Na conversa inicial, avaliamos região atendida, disponibilidade do produto ou serviço, materiais para os anúncios e a rotina de respostas. Se houver uma base que precisa melhorar, isso entra nas prioridades.</p>'],
      ['O que a gestão organiza', '<ul><li>Objetivo de campanha coerente com a ação desejada.</li><li>Planejamento de público e região conforme a operação.</li><li>Propostas de criativos, mensagens e ofertas para aprovação.</li><li>Destino do contato: WhatsApp, formulário ou página, conforme o projeto.</li><li>Acompanhamento do investimento e revisão dos testes.</li></ul><p>Impulsionar uma publicação é uma possibilidade de divulgação. Uma gestão estruturada começa com objetivo, hipótese, medição e rotina de revisão, em vez de avaliar apenas curtidas.</p>'],
      ['Mídia e gestão são custos diferentes', '<p>O investimento de mídia financia a veiculação na plataforma. O honorário remunera o trabalho contratado. A proposta discrimina esses itens e o que está incluído na produção de materiais.</p><p>Não apresentamos uma faixa universal de investimento: o valor precisa ser discutido conforme objetivo, oferta, capacidade e limites do negócio. A decisão de investir é sua, com escopo e custos claros.</p>'],
      ['Medir até onde os dados permitem', '<p>Investimento, alcance, frequência, CTR, CPC e custo por contato ajudam a avaliar a campanha. O atendimento completa a análise: quantas conversas fazem sentido, quantas viram proposta e quantas resultam em venda?</p><p>Um clique no WhatsApp não comprova mensagem enviada. UTMs e eventos precisam de configuração adequada; vendas dependem do registro comercial. Volume de mensagens não é sinônimo de lucro, e não há garantia de vendas.</p>']
    ], faq: [['A verba dos anúncios está incluída no serviço?', 'Mídia e honorários são discriminados na proposta. Nenhum valor é presumido antes da avaliação.'], ['Preciso de site para anunciar?', 'O destino pode variar conforme a campanha. Avaliamos a oferta, o atendimento e a forma de medição antes de escolher.']], sources: ['meta'], related: ['mentoria', 'seo']
  },
  {
    id: 'youtube', slug: 'otimizacao-canal-youtube/', label: 'Otimização de YouTube',
    title: 'Otimização de canal no YouTube | Zadoni Digital',
    description: 'Organize seu canal no YouTube com revisão de títulos, descrições, miniaturas e playlists. Conheça a otimização e solicite uma avaliação da Zadoni Digital.',
    h1: 'Um canal organizado para quem precisa do seu conteúdo',
    lead: 'Otimização de canais do YouTube para negócios e criadores que querem comunicar melhor sua proposta e entender o desempenho dos vídeos.',
    short: 'Organize o canal e alinhe títulos, miniaturas e conteúdo ao seu público.',
    sections: [
      ['O que seu canal precisa comunicar', '<p>Quem encontra um vídeo consegue entender para quem ele foi feito e qual dúvida responde? O trabalho começa pela relação entre público, objetivo do canal e conteúdo disponível.</p><p>Um canal de negócio local pode apresentar serviços, explicar processos e responder perguntas anteriores à contratação. Um criador pode ter outro objetivo. A avaliação considera essa diferença antes de propor mudanças.</p>'],
      ['Escopo de otimização', '<ul><li>Revisão da apresentação e organização do canal.</li><li>Títulos e descrições coerentes com cada vídeo.</li><li>Avaliação de miniaturas e da promessa visual.</li><li>Playlists que ajudem o público a continuar assistindo.</li><li>Análise dos dados disponíveis no YouTube Studio.</li></ul><p>Os vídeos prioritários e o volume de trabalho são definidos na proposta. Gravação, edição e criação de peças não são presumidas: quando necessárias, devem constar do escopo.</p>'],
      ['Promessa do vídeo e experiência de quem assiste', '<p>Títulos e miniaturas precisam representar o conteúdo. Atrair um clique com uma promessa que o vídeo não cumpre prejudica a experiência do público. A otimização não transforma um vídeo desalinhado em uma resposta útil apenas pela descrição.</p><p>A busca do YouTube considera relevância e engajamento. Não prometemos posição, viralização, quantidade de inscritos ou monetização. A referência oficial ajuda a separar práticas de organização de fórmulas sem comprovação.</p>'],
      ['Acompanhamento e próximos conteúdos', '<p>Quando houver acesso autorizado aos dados, observamos impressões, taxa de cliques, retenção e origem das visualizações em contexto. Vídeos com públicos, durações ou períodos diferentes não devem ser comparados como se fossem iguais.</p><p>O resultado da avaliação é uma lista de prioridades: o que ajustar nos materiais existentes e quais dúvidas merecem novos conteúdos. Se você prefere executar com orientação, a mentoria pode ser mais adequada.</p>']
    ], faq: [['Vocês precisam da minha senha?', 'Não compartilhe senhas pelo diagnóstico ou WhatsApp. As permissões necessárias são combinadas de forma apropriada ao serviço.'], ['O serviço garante mais visualizações?', 'Não. Há fatores de conteúdo, público e distribuição fora do controle da otimização.']], sources: ['youtube'], related: ['mentoria', 'seo']
  },
  {
    id: 'mentoria', slug: 'mentoria-seo-trafego-pago/', label: 'Mentoria em SEO e tráfego pago',
    title: 'Mentoria em SEO e tráfego pago | Zadoni Digital',
    description: 'Receba orientação para priorizar SEO e tráfego pago no seu negócio. Conheça a mentoria da Zadoni Digital e converse sobre seus objetivos e dificuldades.',
    h1: 'Clareza para decidir o que fazer no SEO e nos anúncios',
    lead: 'Mentoria para proprietários e equipes que querem entender prioridades, revisar decisões e executar o marketing com mais direção.',
    short: 'Receba orientação para decidir, executar e revisar suas próprias ações.',
    sections: [
      ['Para quem a mentoria faz sentido', '<p>Você quer participar da execução, tem uma pessoa responsável pelo marketing ou precisa organizar dúvidas antes de investir? A mentoria cria um espaço de orientação sobre o seu contexto, com prioridades que façam sentido para o momento do negócio.</p><p>Não é necessário chegar com tudo pronto. É importante trazer um objetivo e disponibilidade para colocar as decisões em prática. Se você procura alguém para executar e gerenciar os canais, avaliamos os serviços de implementação.</p>'],
      ['Temas que podemos avaliar', '<ul><li>Presença local, site e Perfil da Empresa no Google.</li><li>Organização de páginas e conteúdo orientado ao cliente.</li><li>Oferta, atendimento e preparação para anúncios.</li><li>Leitura de métricas e qualidade dos contatos.</li><li>Priorização de atividades e acompanhamento do plano.</li></ul><p>Plataformas, profundidade e materiais necessários são alinhados antes da contratação. Não presumimos que toda ferramenta ou integração esteja incluída.</p>'],
      ['Orientação com responsabilidade de execução definida', '<p>Mentoria é acompanhamento e orientação. Gestão de campanhas, alteração de site, produção de criativos ou implementação de rastreamento só fazem parte quando contratadas separadamente e descritas na proposta.</p><p>Essa distinção evita que o trabalho fique sem responsável: você sabe quais atividades executará, quais informações deve trazer e o que será revisado em conjunto.</p>'],
      ['Como começar', '<ol><li>Descreva seu objetivo e o ponto em que está.</li><li>Alinhe os temas, formato e disponibilidade.</li><li>Receba uma proposta com escopo e condições.</li><li>Trabalhe as prioridades e registre o aprendizado.</li></ol><p>Duração, quantidade de encontros, materiais e preço são combinados conforme a necessidade. Não há pacote ou certificação presumidos. A evolução depende também da execução, dos recursos disponíveis e das condições do mercado.</p>']
    ], faq: [['A mentoria inclui executar as campanhas?', 'Não automaticamente. Orientação e execução são modalidades diferentes, definidas na proposta.'], ['Posso começar sem saber qual canal priorizar?', 'Sim. A conversa inicial pode ajudar a entender o problema antes de escolher o canal, sem prometer resultados.']], sources: [], related: ['meta', 'youtube']
  }
];
module.exports = { services, sources };
