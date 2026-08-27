const updated = '2026-08-27';
const nr22 = 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-22-nr-22';
const nr1 = 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadoras/normas-regulamentadoras-vigentes/nr-1';
const anmData = 'https://www.gov.br/anm/pt-br/acesso-a-informacao/dados-abertos/bases-de-dados/bases-de-dados/';
const ibgeCanaa = 'https://www.ibge.gov.br/cidades-e-estados/pa/canaa-dos-carajas.html';
const ibgeParauapebas = 'https://www.ibge.gov.br/cidades-e-estados/pa/parauapebas.html';
const cnct = 'https://cnct.mec.gov.br/';
const sine = 'https://www.gov.br/pt-br/servicos/buscar-emprego-no-sistema-nacional-de-emprego-sine';

module.exports = [
  {
    file: 'politica-editorial/index.html', slug: 'politica-editorial/', cluster: 'sobre', kind: 'article', updated,
    title: 'Política Editorial | Portal 5S, Mineração e Produtividade',
    description: 'Conheça os critérios de pesquisa, redação, fontes, revisão, correções e transparência usados nos conteúdos do Portal 5S e Produtividade.',
    h1: 'Política editorial e compromisso com o leitor',
    lead: 'Esta política explica como experiência prática, fontes públicas e revisão são combinadas para produzir conteúdo educativo responsável.',
    breadcrumb: [['Política editorial', 'politica-editorial/']],
    sections: [
      ['Finalidade do portal', () => `<p>O portal publica conteúdo educativo sobre mineração, segurança e saúde no trabalho, gestão ambiental, 5S, produtividade, gestão do tempo e carreira. O objetivo é facilitar a compreensão de conceitos e apoiar perguntas melhores no trabalho real. O conteúdo não substitui avaliação de risco, responsável técnico, procedimentos da organização, licença, norma vigente ou orientação de autoridade competente.</p><p>Artigos informativos respondem à dúvida principal antes de apresentar ferramentas ou cursos. Não publicamos páginas vazias apenas para repetir palavras-chave ou capturar localidades.</p>`],
      ['Fontes e hierarquia de evidências', () => `<p>Em assuntos legais e normativos, priorizamos páginas e documentos oficiais do Governo Federal, Ministério do Trabalho e Emprego, Agência Nacional de Mineração, IBAMA, MMA, órgãos estaduais e municípios. Normas técnicas protegidas são citadas sem reprodução extensa. Experiência profissional pode orientar exemplos, mas não é apresentada como requisito legal.</p><p>Dados regionais devem informar fonte e data. Conteúdo de terceiros é resumido com atribuição e link; materiais internos, procedimentos restritos e informações confidenciais não são publicados.</p>`],
      ['Redação, revisão e atualizações', () => `<p>Cada página parte de uma intenção própria, recebe título e descrição exclusivos, links contextuais e data de atualização. Mudanças relevantes em normas ou fontes oficiais motivam revisão prioritária. Ajustes de clareza, acessibilidade e navegação podem ocorrer sem mudar a conclusão técnica.</p><p>A data exibida informa a revisão editorial da página, não garante que toda fonte externa permaneça inalterada. Por isso, páginas regulatórias direcionam o leitor à fonte oficial vigente.</p>`],
      ['Correções e contato', () => `<p>Erros factuais, links quebrados e ambiguidades podem ser comunicados por e-mail ou pelo botão de WhatsApp disponível na página. A correção considera a fonte primária, o impacto para o leitor e a necessidade de atualizar páginas relacionadas. Alterações materiais devem ser registradas no histórico SEO e editorial do projeto.</p>`],
      ['Transparência comercial', () => `<p>O portal divulga a Trilha 10X e outras soluções do autor. CTAs são identificáveis e não condicionam o acesso à resposta educativa. Não publicamos avaliações, certificações, vínculos institucionais ou resultados profissionais que não possam ser sustentados.</p>`]
    ],
    related: [['Sobre o autor', 'sobre/'], ['Portal educacional', 'portal/'], ['Atualizações', 'atualizacoes/']]
  },
  {
    file: 'ferramentas/index.html', slug: 'ferramentas/', cluster: 'ferramentas', kind: 'hub', updated,
    title: 'Ferramentas Gratuitas de Produtividade, 5S e Gestão',
    description: 'Acesse ferramentas gratuitas para gestão do tempo e acompanhe o roadmap de recursos práticos para produtividade, 5S e gestão ambiental.',
    h1: 'Ferramentas gratuitas para transformar orientação em ação',
    lead: 'Recursos leves, acessíveis e sem cadastro para planejar, registrar e revisar o trabalho diretamente no navegador.',
    breadcrumb: [['Ferramentas', 'ferramentas/']],
    sections: [
      ['Ferramenta disponível', r => `<div class="card-grid"><a class="topic-card" href="${r}ferramentas/gestao-do-tempo/"><span class="topic-card__label">Disponível agora</span><h3>Tempo 10X</h3><p>Cadastre tarefas, use o cronômetro em tempo real, filtre períodos, acompanhe gráficos e exporte relatórios.</p></a></div><p>O Tempo 10X salva os dados no armazenamento local do navegador. Ele não exige conta e não sincroniza automaticamente entre dispositivos; o backup JSON permite transferência manual.</p>`],
      ['Critérios para novas ferramentas', () => `<p>Uma nova ferramenta só entra no portal quando resolve um fluxo completo, funciona em celular e teclado, explica limites de uso e possui validação automatizada. O roadmap considera Pomodoro, Matriz de Eisenhower, checklist 5S, diagnóstico 5S, checklist ambiental e 5W2H. Essas URLs não serão publicadas antes de haver utilidade real.</p>`],
      ['Privacidade e responsabilidade', () => `<p>Ferramentas baseadas em armazenamento local mantêm os registros no navegador, salvo quando o usuário decide exportá-los. Limpar dados do navegador pode apagar informações. Checklists futuros serão educativos e não substituirão inspeções, permissões, análises de risco ou documentos técnicos exigidos.</p>`],
      ['Aprenda antes de medir', r => `<p>Indicadores ganham valor quando representam decisões claras. Antes de cronometrar tudo, veja os princípios de <a href="${r}produtividade/gestao-do-tempo/">gestão do tempo</a>, organize prioridades com a <a href="${r}produtividade/matriz-eisenhower/">Matriz de Eisenhower</a> e use <a href="${r}5s/">5S</a> para reduzir atritos no ambiente.</p>`]
    ],
    related: [['Tempo 10X', 'ferramentas/gestao-do-tempo/'], ['Gestão do tempo', 'produtividade/gestao-do-tempo/'], ['Programa 5S', '5s/']]
  },
  {
    file: 'atualizacoes/index.html', slug: 'atualizacoes/', cluster: 'portal', kind: 'hub', updated,
    title: 'Atualizações sobre Mineração, NR e Gestão Ambiental',
    description: 'Acompanhe revisões técnicas e editoriais sobre mineração, segurança, normas regulamentadoras, meio ambiente, 5S e produtividade.',
    h1: 'Atualizações técnicas e editoriais do portal',
    lead: 'Um ponto de acompanhamento para mudanças confirmadas em fontes oficiais e revisões relevantes nos guias do portal.',
    breadcrumb: [['Atualizações', 'atualizacoes/']],
    sections: [
      ['Revisões mais recentes', r => `<div class="card-grid"><a class="topic-card" href="${r}mineracao/nr-22/"><span class="topic-card__label">Revisado em agosto de 2026</span><h3>NR-22 e segurança na mineração</h3><p>Página baseada na versão oficial indicada pelo MTE, incluindo as alterações divulgadas em 2026.</p></a><a class="topic-card" href="${r}ferramentas/gestao-do-tempo/"><span class="topic-card__label">Atualizado em agosto de 2026</span><h3>Tempo 10X</h3><p>Cronômetro persistente, sessões, filtros periódicos, gráficos e relatórios.</p></a></div>`],
      ['Como uma atualização é publicada', () => `<p>Uma nota só é incluída quando existe fonte identificável, data e impacto útil para o leitor. O portal não transforma rumores ou postagens sem confirmação em notícia. Para normas, a página oficial do órgão responsável prevalece sobre resumos e comentários.</p>`],
      ['O que acompanhar', () => `<ul class="practice-list"><li>Alterações em Normas Regulamentadoras e materiais orientativos do MTE.</li><li>Dados, resoluções e serviços publicados pela ANM.</li><li>Requisitos ambientais divulgados por órgãos competentes.</li><li>Revisões de conteúdos, ferramentas e links oficiais.</li></ul><p>Uma atualização não substitui a leitura do ato oficial nem define sozinha a aplicabilidade em uma organização.</p>`]
    ],
    related: [['NR-22', 'mineracao/nr-22/'], ['Mineração', 'mineracao/'], ['Política editorial', 'politica-editorial/']]
  },
  {
    file: 'mineracao/index.html', slug: 'mineracao/', cluster: 'mineracao', kind: 'hub', updated,
    title: 'Mineração: Segurança, Meio Ambiente, 5S e Produtividade',
    description: 'Guias educativos sobre mineração, NR-22, segurança, riscos, gestão ambiental, 5S, produtividade e contexto profissional em Carajás.',
    h1: 'Mineração: conhecimento aplicado à segurança, ambiente e produção',
    lead: 'Um cluster educativo para compreender riscos, organização do trabalho, responsabilidades e melhoria contínua sem substituir controles técnicos.',
    breadcrumb: [['Mineração', 'mineracao/']],
    sections: [
      ['Comece pelos fundamentos de segurança', r => `<div class="card-grid card-grid--3"><a class="topic-card" href="${r}mineracao/nr-22/"><span class="topic-card__label">Norma setorial</span><h3>NR-22</h3><p>Campo de aplicação, responsabilidades, riscos, capacitação e emergências.</p></a><a class="topic-card" href="${r}mineracao/seguranca-na-mineracao/"><h3>Segurança na mineração</h3><p>Planejamento, controles, comunicação e aprendizagem operacional.</p></a><a class="topic-card" href="${r}mineracao/riscos-na-mineracao/"><h3>Riscos na mineração</h3><p>Como reconhecer perigos sem reduzir a análise a uma lista genérica.</p></a></div>`],
      ['Organização e desempenho responsável', r => `<div class="card-grid card-grid--3"><a class="topic-card" href="${r}mineracao/5s-na-mineracao/"><h3>5S na mineração</h3><p>Oficinas, almoxarifados, frentes, áreas administrativas e ambientais.</p></a><a class="topic-card" href="${r}mineracao/produtividade-na-mineracao/"><h3>Produtividade na mineração</h3><p>Fluxo, confiabilidade, planejamento e melhoria contínua com segurança.</p></a><a class="topic-card" href="${r}mineracao/gestao-ambiental-na-mineracao/"><h3>Gestão ambiental</h3><p>Aspectos, controles, monitoramento, resíduos e fechamento.</p></a></div>`],
      ['Carajás e desenvolvimento regional', r => `<p>O contexto mineral de <a href="${r}mineracao/canaa-dos-carajas/">Canaã dos Carajás</a> e <a href="${r}mineracao/parauapebas/">Parauapebas</a> exige conteúdo local baseado em fontes públicas, sem sugerir vínculo com empresas ou órgãos. As páginas regionais orientam onde consultar dados e como pensar qualificação, segurança e meio ambiente.</p>`],
      ['Limites deste conteúdo', () => `<p>Os guias não divulgam procedimentos internos, parâmetros operacionais, mapas restritos ou informações de emergência de empreendimentos. Condições de campo devem ser avaliadas pela organização e por profissionais habilitados. Em caso de divergência, prevalecem a legislação vigente, o procedimento autorizado e a orientação do responsável técnico.</p>`]
    ],
    related: [['NR-22', 'mineracao/nr-22/'], ['Carreira na mineração', 'carreira-mineracao/'], ['Ferramentas', 'ferramentas/']]
  },
  {
    file: 'mineracao/nr-22/index.html', slug: 'mineracao/nr-22/', cluster: 'mineracao', kind: 'article', updated,
    title: 'NR-22: Segurança e Saúde Ocupacional na Mineração',
    description: 'Entenda o objetivo, campo de aplicação, responsabilidades, riscos, máquinas, poeiras, emergências e treinamento previstos na NR-22.',
    h1: 'NR-22: Segurança e Saúde Ocupacional na Mineração',
    lead: 'Guia educativo baseado na página oficial do MTE, revisada em 2026. Consulte sempre o texto vigente antes de decidir ou implantar controles.',
    breadcrumb: [['Mineração', 'mineracao/'], ['NR-22', 'mineracao/nr-22/']],
    sections: [
      ['O que é a NR-22', () => `<p>A NR-22 é uma Norma Regulamentadora setorial dedicada à segurança e à saúde no trabalho na mineração. Segundo o <a href="${nr22}" target="_blank" rel="noopener noreferrer">Ministério do Trabalho e Emprego</a>, seu objetivo é compatibilizar o planejamento e o desenvolvimento da atividade minerária com a busca permanente da segurança e saúde dos trabalhadores.</p><p>A redação aprovada em 2024 fortaleceu o gerenciamento de riscos. O MTE informa ajustes posteriores e alterações de 2026 relacionadas, entre outros pontos, a calor, barragens e poeiras minerais. Por ser matéria dinâmica, este resumo não substitui o texto oficial.</p>`],
      ['Quem precisa cumprir e onde se aplica', () => `<p>O campo de aplicação oficial abrange organizações que realizam mineração subterrânea ou a céu aberto, inclusive garimpos abrangidos por Permissão de Lavra Garimpeira, beneficiamento mineral instalado nas áreas de mineração e pesquisa mineral. Aplicabilidade concreta, interfaces com contratadas e responsabilidades devem ser avaliadas no contexto da organização.</p>`],
      ['Responsabilidades e gerenciamento de riscos', () => `<p>A norma atribui responsabilidades à organização e aos trabalhadores, exige supervisão técnica nas condições definidas e articula a prevenção com o gerenciamento de riscos ocupacionais. Identificar um perigo é apenas o começo: é preciso avaliar exposição e risco, definir medidas, acompanhar sua implementação e revisar controles diante de mudanças, incidentes ou evidências de ineficácia.</p><p>A <a href="${nr1}" target="_blank" rel="noopener noreferrer">NR-1 oficial</a> deve ser consultada para o marco geral de GRO e PGR.</p>`],
      ['Principais grupos de risco', r => `<p>Operações podem envolver energia de máquinas, veículos e equipamentos móveis, instabilidade de maciços, quedas, eletricidade, explosivos, incêndio, poeiras minerais, ruído, vibração, calor, produtos químicos e fatores ergonômicos. O conjunto real depende do processo, local, turno, clima, manutenção e interação entre atividades.</p><p>Veja uma abordagem educativa em <a href="${r}mineracao/riscos-na-mineracao/">riscos na mineração</a>. Uma lista genérica não substitui inventário, avaliação e controles específicos.</p>`],
      ['Mina a céu aberto, máquinas e circulação', () => `<p>Vias, bancadas, bordas, sinalização, iluminação, tráfego e condições dos equipamentos precisam ser considerados em conjunto. Separar fluxos quando aplicável, controlar acessos, manter comunicação clara e verificar mudanças de condição são práticas de prevenção; parâmetros e critérios devem vir da norma, do projeto e dos procedimentos autorizados.</p>`],
      ['Poeiras minerais, calor e saúde', () => `<p>Controle de poeiras deve privilegiar prevenção na fonte e medidas coletivas, acompanhado de avaliação de exposição e vigilância da saúde conforme requisitos aplicáveis. Calor, hidratação, organização do trabalho e aclimatação exigem avaliação técnica. Não use valores copiados de resumos: consulte a versão vigente e os anexos oficiais.</p>`],
      ['Emergências e treinamento', () => `<p>O planejamento de emergências deve refletir cenários plausíveis, meios de comunicação, responsabilidades, rotas, recursos e exercícios. Capacitação precisa corresponder à função, aos riscos e às mudanças do trabalho. Lista de presença não demonstra sozinha compreensão ou capacidade de resposta.</p>`],
      ['Atualizações recentes e fonte oficial', () => `<p>A página do MTE registra a nova redação aprovada pela Portaria MTE nº 225/2024 e ajustes posteriores, incluindo as Portarias MTE nº 105/2026 e nº 261/2026. Como prazos e textos podem mudar, verifique a <a href="${nr22}" target="_blank" rel="noopener noreferrer">página oficial da NR-22</a> e o documento consolidado antes de aplicar qualquer requisito.</p>`],
      ['Perguntas frequentes', () => `<h3>A NR-22 vale apenas para minas subterrâneas?</h3><p>Não. O campo oficial também inclui mineração a céu aberto, atividades garimpeiras abrangidas, beneficiamento nas áreas indicadas e pesquisa mineral.</p><h3>Este guia serve como treinamento obrigatório?</h3><p>Não. É conteúdo introdutório e não substitui capacitação definida pela norma e pela organização.</p><h3>5S substitui controles da NR-22?</h3><p>Não. Organização pode apoiar a prevenção, mas não substitui engenharia, gerenciamento de riscos ou controles legais.</p>`]
    ],
    related: [['Segurança na mineração', 'mineracao/seguranca-na-mineracao/'], ['Riscos na mineração', 'mineracao/riscos-na-mineracao/'], ['5S na mineração', 'mineracao/5s-na-mineracao/']]
  },
  {
    file: 'mineracao/seguranca-na-mineracao/index.html', slug: 'mineracao/seguranca-na-mineracao/', cluster: 'mineracao', kind: 'article', updated,
    title: 'Segurança na Mineração: Riscos, Controles e Cultura',
    description: 'Entenda como planejamento, hierarquia de controles, liderança, comunicação e aprendizagem apoiam a segurança do trabalho na mineração.',
    h1: 'Segurança na mineração: do planejamento ao trabalho real',
    lead: 'Segurança sustentável conecta projeto, gestão de riscos, condição do campo, competência e direito de interromper atividades inseguras.',
    breadcrumb: [['Mineração', 'mineracao/'], ['Segurança na mineração', 'mineracao/seguranca-na-mineracao/']],
    sections: [
      ['Por que a mineração exige abordagem sistêmica', () => `<p>Mineração combina pessoas, equipamentos de grande porte, energia, geologia, clima, manutenção e mudanças de frente. Um controle isolado pode falhar quando interfaces não são compreendidas. Planejamento precisa considerar tarefa normal, condições anormais, simultaneidade, contratadas e consequências possíveis.</p>`],
      ['Comece pelo perigo e pela exposição', r => `<p>O perigo é uma fonte com potencial de dano; o risco depende também da exposição e da possibilidade de ocorrência. Observe a atividade real, converse com quem executa, considere histórico e mudanças. O guia de <a href="${r}mineracao/riscos-na-mineracao/">riscos na mineração</a> organiza perguntas sem fornecer uma matriz universal.</p>`],
      ['Aplique a hierarquia de controles', () => `<p>Eliminar o perigo ou substituí-lo deve ser considerado antes de depender apenas de comportamento. Controles de engenharia, segregação, automação, barreiras e soluções administrativas precisam ser escolhidos conforme viabilidade técnica e risco. Equipamento de proteção individual compõe o sistema, mas não corrige sozinho uma fonte descontrolada.</p>`],
      ['Planejamento, autorização e mudança', () => `<p>Escopo, condições de liberação, recursos, comunicação e critérios de parada devem estar claros antes do início. Mudanças de equipamento, equipe, método, frente, clima ou interferência podem invalidar premissas. Quando a condição não corresponde ao planejado, o trabalho precisa ser reavaliado conforme os procedimentos aplicáveis.</p>`],
      ['Liderança e aprendizagem', () => `<p>Uma cultura forte permite relatar condições sem medo, trata causas organizacionais e dá retorno às equipes. Indicadores de ações, verificações e eficácia complementam estatísticas de acidentes. Reconhecer um alerta antecipado cria mais valor que esconder um desvio para proteger uma meta.</p>`],
      ['Referências essenciais', r => `<p>Consulte a <a href="${nr22}" target="_blank" rel="noopener noreferrer">NR-22 no MTE</a> e a documentação da organização. Organização visual por <a href="${r}mineracao/5s-na-mineracao/">5S na mineração</a> pode facilitar percepção de anomalias, mas permanece subordinada aos controles técnicos.</p>`]
    ],
    related: [['NR-22', 'mineracao/nr-22/'], ['Riscos na mineração', 'mineracao/riscos-na-mineracao/'], ['Produtividade na mineração', 'mineracao/produtividade-na-mineracao/']]
  },
  {
    file: 'mineracao/riscos-na-mineracao/index.html', slug: 'mineracao/riscos-na-mineracao/', cluster: 'mineracao', kind: 'article', updated,
    title: 'Riscos na Mineração: Como Reconhecer e Controlar',
    description: 'Conheça grupos de perigos na mineração e um roteiro educativo para identificar exposições, interfaces, mudanças e medidas de prevenção.',
    h1: 'Riscos na mineração: reconhecer, avaliar, controlar e revisar',
    lead: 'Uma lista de perigos ajuda a iniciar a conversa, mas a avaliação precisa observar a operação, as pessoas e as condições reais.',
    breadcrumb: [['Mineração', 'mineracao/'], ['Riscos na mineração', 'mineracao/riscos-na-mineracao/']],
    sections: [
      ['Risco não é apenas uma categoria', () => `<p>Classificar um agente como físico, químico, biológico, ergonômico ou de acidente pode organizar o inventário, mas não descreve sozinho a exposição. É necessário entender fonte, trajetória, pessoas expostas, frequência, duração, severidade, controles existentes e situações fora da rotina.</p>`],
      ['Perigos mecânicos e de mobilidade', () => `<p>Veículos, máquinas, partes móveis, içamentos, transportadores, ferramentas, energia acumulada e interação homem-máquina exigem barreiras coerentes. Visibilidade, ponto cego, via, velocidade, comunicação, manutenção e isolamento podem se combinar. A avaliação deve incluir partida inesperada e intervenções de limpeza ou manutenção.</p>`],
      ['Geotecnia, quedas e ambiente físico', () => `<p>Taludes, bancadas, escavações, maciços, pisos, bordas, acesso e chuva alteram condições. Poeiras, ruído, vibração, calor e iluminação demandam avaliação própria. Sinais de mudança devem ter canal de comunicação e critério de resposta definido por profissionais competentes.</p>`],
      ['Produtos, explosivos e incêndio', () => `<p>Combustíveis, reagentes, lubrificantes, gases, explosivos e materiais incompatíveis exigem identificação, armazenamento, manuseio e resposta compatíveis. Fichas, sinalização e treinamento apoiam o controle, mas não substituem projeto, ventilação, segregação ou requisitos específicos.</p>`],
      ['Fatores humanos e organizacionais', () => `<p>Pressão de tempo, fadiga, comunicação incompleta, supervisão, interfaces de turno e desenho da tarefa influenciam a capacidade de controlar riscos. O objetivo não é culpar a pessoa: é entender por que o sistema tornou o erro possível e como fortalecer defesas.</p>`],
      ['Roteiro de análise', r => `<ol><li>Defina tarefa, local e condições.</li><li>Observe fontes, energias e pessoas expostas.</li><li>Considere rotina, anormalidade, manutenção e emergência.</li><li>Verifique controles existentes e possibilidade de falha.</li><li>Priorize medidas segundo risco e hierarquia de controles.</li><li>Defina responsáveis, prazos e verificação de eficácia.</li><li>Revise após mudanças ou aprendizagem.</li></ol><p>Use a <a href="${nr1}" target="_blank" rel="noopener noreferrer">NR-1</a> e a <a href="${nr22}" target="_blank" rel="noopener noreferrer">NR-22</a> oficiais como referências normativas.</p>`]
    ],
    related: [['Segurança na mineração', 'mineracao/seguranca-na-mineracao/'], ['NR-22', 'mineracao/nr-22/'], ['5S na mineração', 'mineracao/5s-na-mineracao/']]
  },
  {
    file: 'mineracao/5s-na-mineracao/index.html', slug: 'mineracao/5s-na-mineracao/', cluster: 'mineracao', kind: 'article', updated,
    title: '5S na Mineração: Segurança, Organização e Produtividade',
    description: 'Aprenda como aplicar os cinco sensos em oficinas, almoxarifados, frentes, depósitos e áreas administrativas da mineração.',
    h1: 'Como aplicar o 5S na mineração',
    lead: 'O 5S torna excessos, fluxos, condições e padrões mais visíveis, apoiando a melhoria sem substituir controles de segurança ou meio ambiente.',
    breadcrumb: [['Mineração', 'mineracao/'], ['5S na mineração', 'mineracao/5s-na-mineracao/']],
    sections: [
      ['Onde o 5S pode apoiar', () => `<p>Oficinas, almoxarifados, frentes de serviço, depósitos, áreas ambientais, escritórios e pontos de apoio têm fluxos distintos. A aplicação começa por um problema concreto: busca demorada, excesso, identificação confusa, fonte recorrente de sujeira ou dificuldade de manter condição segura.</p>`],
      ['Seiri: utilização com decisão responsável', () => `<p>Separe necessário, eventual, excedente, danificado e não conforme. Materiais, peças, químicos e resíduos não devem ser descartados ou movidos sem autorização. Área de quarentena precisa ter identificação, prazo e responsável para não virar acúmulo permanente.</p>`],
      ['Seiton: organização conforme fluxo e risco', () => `<p>Defina locais considerando frequência, peso, ergonomia, compatibilidade, proteção e rota de movimentação. Identificação visual deve conversar com padrões existentes. Cores ou etiquetas paralelas podem criar conflito se forem implantadas sem governança.</p>`],
      ['Seiso: limpeza como inspeção', () => `<p>Limpar permite perceber vazamentos, desgaste, fixações, acúmulo de pó e embalagens danificadas. A equipe deve saber o que pode corrigir, o que precisa isolar e a quem comunicar. Remover o sinal sem tratar a fonte mascara o problema.</p>`],
      ['Seiketsu e Shitsuke: padrão e disciplina', () => `<p>Condição esperada, método, frequência e responsabilidade precisam ser simples. Disciplina depende de recurso, treinamento, exemplo e retorno. Auditorias devem produzir ações e aprendizagem; uma nota alta não pode compensar um desvio de risco relevante.</p>`],
      ['Aplicação por ambiente', r => `<ul class="practice-list"><li><strong>Oficina:</strong> ferramentas, componentes, resíduos e fontes de contaminação.</li><li><strong>Almoxarifado:</strong> endereçamento, estoque, validade e segregação.</li><li><strong>Frente:</strong> recursos móveis e padrão ajustado à mudança da operação.</li><li><strong>Área ambiental:</strong> recipientes, kits, identificação e registros.</li><li><strong>Escritório:</strong> documentos, versões, acessos e arquivos digitais.</li></ul><p>Revise os fundamentos em <a href="${r}5s/o-que-e-5s/">o que é 5S</a> e conecte a prática à <a href="${r}mineracao/seguranca-na-mineracao/">segurança na mineração</a>.</p>`]
    ],
    related: [['O que é 5S', '5s/o-que-e-5s/'], ['Segurança na mineração', 'mineracao/seguranca-na-mineracao/'], ['Produtividade na mineração', 'mineracao/produtividade-na-mineracao/']]
  },
  {
    file: 'mineracao/produtividade-na-mineracao/index.html', slug: 'mineracao/produtividade-na-mineracao/', cluster: 'mineracao', kind: 'article', updated,
    title: 'Produtividade na Mineração com Segurança e Confiabilidade',
    description: 'Entenda produtividade na mineração por fluxo, confiabilidade, planejamento, qualidade, segurança, meio ambiente e melhoria contínua.',
    h1: 'Produtividade na mineração sem atalhos inseguros',
    lead: 'Produzir melhor significa entregar valor com estabilidade, qualidade e controle — não apenas acelerar uma etapa isolada.',
    breadcrumb: [['Mineração', 'mineracao/'], ['Produtividade na mineração', 'mineracao/produtividade-na-mineracao/']],
    sections: [
      ['Produtividade é sistêmica', () => `<p>O resultado depende de disponibilidade, utilização responsável, qualidade, sequenciamento, manutenção, suprimentos, competência e condições do ambiente. Otimizar uma etapa pode criar fila, retrabalho ou risco em outra. Por isso, indicadores devem ser lidos junto às restrições e consequências.</p>`],
      ['Planejamento e prontidão', () => `<p>Uma atividade pronta tem escopo, pessoas competentes, recurso, acesso, autorização e informação. Confirmar pré-requisitos antes do deslocamento reduz espera e improviso. Mudanças precisam acionar replanejamento, não pressão para cumprir uma premissa que deixou de existir.</p>`],
      ['Confiabilidade e perdas', () => `<p>Paradas recorrentes, falhas de comunicação, materiais indisponíveis, retrabalho e busca por itens revelam perdas. Classificar a causa e verificar recorrência ajuda a priorizar. A meta é fortalecer o processo, não transferir culpa para a última pessoa da cadeia.</p>`],
      ['5S e gestão do tempo', r => `<p>O <a href="${r}mineracao/5s-na-mineracao/">5S na mineração</a> reduz atritos de localização e condição. A <a href="${r}produtividade/gestao-do-tempo/">gestão do tempo</a> ajuda a explicitar prioridades, capacidade e margem. Nenhum método autoriza eliminar etapas de segurança ou controle ambiental.</p>`],
      ['Indicadores equilibrados', () => `<p>Volume, prazo e disponibilidade precisam conviver com qualidade, ações de risco, manutenção, incidentes, desvios ambientais e aprendizagem. Metas isoladas podem incentivar comportamento indesejado. O indicador deve ter definição, fonte, frequência, responsável e decisão associada.</p>`],
      ['Ciclo de melhoria', () => `<ol><li>Defina problema e condição atual.</li><li>Observe o fluxo com as pessoas.</li><li>Escolha uma causa verificável.</li><li>Teste mudança pequena e segura.</li><li>Meça efeito e consequências.</li><li>Padronize somente o que funcionou.</li><li>Revise e compartilhe aprendizagem.</li></ol>`]
    ],
    related: [['5S na mineração', 'mineracao/5s-na-mineracao/'], ['Segurança na mineração', 'mineracao/seguranca-na-mineracao/'], ['Tempo 10X', 'ferramentas/gestao-do-tempo/']]
  },
  {
    file: 'mineracao/gestao-ambiental-na-mineracao/index.html', slug: 'mineracao/gestao-ambiental-na-mineracao/', cluster: 'mineracao', kind: 'article', updated,
    title: 'Gestão Ambiental na Mineração: Aspectos e Controles',
    description: 'Entenda aspectos, impactos, controles, monitoramento, resíduos, água, biodiversidade e fechamento na gestão ambiental da mineração.',
    h1: 'Gestão ambiental na mineração: planejar, controlar e monitorar',
    lead: 'A gestão ambiental conecta licenciamento, operação, monitoramento, resposta a desvios e planejamento do fechamento ao longo do ciclo mineral.',
    breadcrumb: [['Mineração', 'mineracao/'], ['Gestão ambiental na mineração', 'mineracao/gestao-ambiental-na-mineracao/']],
    sections: [
      ['Aspectos, impactos e requisitos', () => `<p>Movimentação de solo e rocha, supressão, captação, efluentes, emissões, ruído, resíduos e uso de produtos podem interagir com água, solo, ar, biodiversidade e comunidades. A significância depende do contexto e deve considerar requisitos legais, licenças e compromissos aplicáveis.</p>`],
      ['Controles operacionais', () => `<p>Contenção, drenagem, controle de erosão, segregação, manutenção, inspeção, resposta a derramamento e sinalização são exemplos amplos. O controle correto depende do projeto e não deve ser improvisado a partir de uma lista da internet. Responsáveis, critérios, frequência e evidência precisam estar definidos.</p>`],
      ['Monitoramento e aprendizagem', () => `<p>Monitorar não é apenas coletar dado: é comparar com critério, avaliar tendência e decidir. Anomalias, reclamações, incidentes e mudanças de processo devem alimentar revisão de controles. Indicadores precisam informar fonte, unidade, periodicidade e limite de interpretação.</p>`],
      ['Resíduos, produtos e água', r => `<p>Prevenção da geração vem antes da segregação e destinação. Produtos precisam de identificação, compatibilidade e resposta coerente. Água deve ser gerida considerando captação, drenagem, qualidade, lançamento e contingência. Aprofunde o fluxo geral em <a href="${r}gestao-ambiental/gestao-de-residuos/">gestão de resíduos</a>.</p>`],
      ['Fechamento e dados públicos', () => `<p>A ANM descreve o Plano de Fechamento de Mina como planejamento da desativação das estruturas considerando aspectos ambientais e socioculturais. Dados de processos, produção, CFEM, SIGMINE e barragens podem ser consultados nas <a href="${anmData}" target="_blank" rel="noopener noreferrer">bases oficiais da ANM</a>. Eles exigem leitura de metadados e não substituem estudos locais.</p>`],
      ['Educação e participação', () => `<p>Treinamento deve conectar o requisito à tarefa e aos recursos disponíveis. Pessoas precisam saber reconhecer uma condição, proteger-se, comunicar e responder dentro de sua atribuição. Comunidades e partes interessadas demandam canais compatíveis com o processo de licenciamento e a governança do empreendimento.</p>`]
    ],
    related: [['Gestão ambiental', 'gestao-ambiental/'], ['Riscos na mineração', 'mineracao/riscos-na-mineracao/'], ['5S na mineração', 'mineracao/5s-na-mineracao/']]
  },
  {
    file: 'mineracao/canaa-dos-carajas/index.html', slug: 'mineracao/canaa-dos-carajas/', cluster: 'mineracao', kind: 'article', updated,
    title: 'Mineração em Canaã dos Carajás: Carreira, SSMA e Dados',
    description: 'Contexto educativo sobre mineração em Canaã dos Carajás, qualificação, segurança, meio ambiente e consulta a fontes públicas oficiais.',
    h1: 'Mineração em Canaã dos Carajás: contexto e preparação profissional',
    lead: 'Uma leitura regional baseada em fontes públicas, sem vínculo com mineradoras e sem promessa de emprego ou contratação.',
    breadcrumb: [['Mineração', 'mineracao/'], ['Canaã dos Carajás', 'mineracao/canaa-dos-carajas/']],
    sections: [
      ['Contexto regional', () => `<p>Canaã dos Carajás integra a região mineral do sudeste paraense. Seu crescimento e as atividades associadas à mineração criam demandas diversas em operação, manutenção, construção, segurança, meio ambiente, logística, serviços e administração. Isso não significa que toda oportunidade esteja disponível nem que uma formação garanta contratação.</p><p>Dados demográficos e territoriais devem ser conferidos no <a href="${ibgeCanaa}" target="_blank" rel="noopener noreferrer">IBGE Cidades</a>.</p>`],
      ['Como consultar a atividade mineral', () => `<p>A <a href="${anmData}" target="_blank" rel="noopener noreferrer">ANM disponibiliza bases abertas</a> sobre processos minerários, produção, CFEM, SIGMINE e barragens. Como os dados podem ser declaratórios, atualizados em frequências diferentes ou exigir interpretação espacial, consulte os metadados e evite conclusões sobre empresa ou empreendimento a partir de uma única tabela.</p>`],
      ['Segurança e meio ambiente', r => `<p>Quem trabalha ou busca trabalhar no setor precisa compreender que regras e treinamentos variam conforme função e risco. Comece pela visão geral da <a href="${r}mineracao/nr-22/">NR-22</a>, aprofunde <a href="${r}mineracao/seguranca-na-mineracao/">segurança na mineração</a> e conecte a rotina à <a href="${r}mineracao/gestao-ambiental-na-mineracao/">gestão ambiental</a>.</p>`],
      ['Qualificação responsável', r => `<p>Compare cursos reconhecidos, requisitos de entrada, carga horária, prática e campo de atuação. O <a href="${cnct}" target="_blank" rel="noopener noreferrer">Catálogo Nacional de Cursos Técnicos do MEC</a> ajuda a conferir perfis formais. Veja também o guia sobre <a href="${r}carreira-mineracao/como-trabalhar-na-mineracao/">como trabalhar na mineração</a>.</p>`],
      ['Fontes locais e cuidado com fraudes', () => `<p>Para serviços públicos, licenciamento e legislação municipal, utilize portais oficiais e confirme domínio, data e órgão responsável. Desconfie de cobrança por vaga, promessa de contratação ou solicitação de dados sensíveis fora de canais verificáveis. Este portal não representa empresa, prefeitura, ANM ou instituição de ensino.</p>`]
    ],
    related: [['Carreira na mineração', 'carreira-mineracao/'], ['NR-22', 'mineracao/nr-22/'], ['Parauapebas', 'mineracao/parauapebas/']]
  },
  {
    file: 'mineracao/parauapebas/index.html', slug: 'mineracao/parauapebas/', cluster: 'mineracao', kind: 'article', updated,
    title: 'Mineração em Parauapebas: Carreira, Segurança e Ambiente',
    description: 'Guia regional sobre mineração em Parauapebas, preparação profissional, NR-22, segurança, meio ambiente e fontes públicas oficiais.',
    h1: 'Mineração em Parauapebas: contexto, segurança e carreira',
    lead: 'Conteúdo regional educativo para orientar pesquisas e preparação, sem vínculo institucional ou promessa de vaga.',
    breadcrumb: [['Mineração', 'mineracao/'], ['Parauapebas', 'mineracao/parauapebas/']],
    sections: [
      ['O contexto de Parauapebas', () => `<p>Parauapebas está ligado historicamente ao desenvolvimento mineral de Carajás e reúne atividades operacionais, industriais, de construção e serviços. Segundo o <a href="${ibgeParauapebas}" target="_blank" rel="noopener noreferrer">IBGE Cidades</a>, o município tinha 267.836 habitantes no Censo 2022; dados posteriores devem ser lidos com o ano de referência indicado pela fonte.</p>`],
      ['Dados minerais sem suposições', () => `<p>Processos, produção e arrecadação podem ser investigados nas <a href="${anmData}" target="_blank" rel="noopener noreferrer">bases de dados da ANM</a>. A existência de processo ou arrecadação não comprova vaga, contratação, condição operacional ou impacto específico. Use a base adequada, confira a atualização e complemente a análise com fontes locais oficiais.</p>`],
      ['NR-22 e preparação para o trabalho', r => `<p>A <a href="${r}mineracao/nr-22/">NR-22</a> é referência setorial, mas treinamentos e autorizações dependem da atividade. Uma pessoa candidata pode estudar conceitos de risco, comunicação, 5S e meio ambiente, porém não deve executar tarefa para a qual não esteja qualificada, autorizada e orientada.</p>`],
      ['Meio ambiente e território', r => `<p>Mineração interage com água, solo, biodiversidade, uso do território, infraestrutura e comunidades. A gestão depende de estudos, licenças, monitoramentos e participação institucional. Leia os fundamentos de <a href="${r}mineracao/gestao-ambiental-na-mineracao/">gestão ambiental na mineração</a> sem atribuir conclusões genéricas a um empreendimento local.</p>`],
      ['Busca de oportunidades com segurança', r => `<p>Consulte canais oficiais de empregadores e o <a href="${sine}" target="_blank" rel="noopener noreferrer">serviço Sine</a>. Nunca pague por promessa de vaga. Organize currículo, documentos e evidências de formação, e adapte a candidatura aos requisitos publicados. O roteiro completo está em <a href="${r}carreira-mineracao/como-trabalhar-na-mineracao/">como trabalhar na mineração</a>.</p>`]
    ],
    related: [['Como trabalhar na mineração', 'carreira-mineracao/como-trabalhar-na-mineracao/'], ['Segurança na mineração', 'mineracao/seguranca-na-mineracao/'], ['Canaã dos Carajás', 'mineracao/canaa-dos-carajas/']]
  },
  {
    file: 'carreira-mineracao/index.html', slug: 'carreira-mineracao/', cluster: 'mineracao', kind: 'hub', updated,
    title: 'Carreira na Mineração: Profissões, Cursos e Preparação',
    description: 'Entenda caminhos de carreira na mineração, áreas profissionais, formação, segurança, currículo e pesquisa responsável de oportunidades.',
    h1: 'Carreira na mineração: construa preparação, não promessa',
    lead: 'Um ponto de partida para mapear funções, comparar formações e apresentar evidências profissionais com responsabilidade.',
    breadcrumb: [['Carreira na mineração', 'carreira-mineracao/']],
    sections: [
      ['Por onde começar', r => `<div class="card-grid"><a class="topic-card" href="${r}carreira-mineracao/como-trabalhar-na-mineracao/"><span class="topic-card__label">Guia essencial</span><h3>Como trabalhar na mineração</h3><p>Mapeie funções, lacunas, formação, currículo, canais oficiais e segurança contra fraudes.</p></a><a class="topic-card" href="${r}mineracao/nr-22/"><span class="topic-card__label">Contexto de segurança</span><h3>Entenda a NR-22</h3><p>Conheça o alcance da norma sem confundir leitura introdutória com capacitação obrigatória.</p></a></div>`],
      ['Áreas profissionais', () => `<p>Operação, manutenção, geologia, mineração, beneficiamento, segurança, meio ambiente, laboratório, planejamento, tecnologia, suprimentos, logística, construção e administração podem participar da cadeia. Cada função tem requisitos próprios; “trabalhar em mineração” não corresponde a uma única formação.</p>`],
      ['Formação e reconhecimento', () => `<p>Compare o perfil profissional e o campo de atuação no <a href="${cnct}" target="_blank" rel="noopener noreferrer">Catálogo Nacional de Cursos Técnicos do MEC</a>. Para graduação, consulte o e-MEC. Curso livre pode desenvolver conhecimento complementar, mas não substitui habilitação técnica, registro ou capacitação obrigatória quando exigidos.</p>`],
      ['Carajás sem atalhos', r => `<p>As páginas sobre <a href="${r}mineracao/canaa-dos-carajas/">Canaã dos Carajás</a> e <a href="${r}mineracao/parauapebas/">Parauapebas</a> organizam fontes regionais. Elas não representam empresas, não anunciam vagas e não prometem colocação.</p>`]
    ],
    related: [['Como trabalhar na mineração', 'carreira-mineracao/como-trabalhar-na-mineracao/'], ['Mineração', 'mineracao/'], ['Produtividade na mineração', 'mineracao/produtividade-na-mineracao/']]
  },
  {
    file: 'carreira-mineracao/como-trabalhar-na-mineracao/index.html', slug: 'carreira-mineracao/como-trabalhar-na-mineracao/', cluster: 'mineracao', kind: 'article', updated,
    title: 'Como Trabalhar na Mineração: Formação e Preparação',
    description: 'Veja como mapear profissões, escolher formação, preparar currículo, buscar vagas oficiais e evitar promessas falsas de emprego na mineração.',
    h1: 'Como trabalhar na mineração: um roteiro responsável',
    lead: 'Entrar no setor depende de função, formação, experiência, localização e processo seletivo — não existe curso ou fórmula que garanta contratação.',
    breadcrumb: [['Carreira na mineração', 'carreira-mineracao/'], ['Como trabalhar na mineração', 'carreira-mineracao/como-trabalhar-na-mineracao/']],
    sections: [
      ['Escolha uma família de funções', () => `<p>Comece por atividades compatíveis com sua formação e interesse: operação, manutenção, processos minerais, segurança, meio ambiente, laboratório, planejamento, tecnologia, construção, logística ou apoio. Leia descrições reais de vagas para identificar requisitos recorrentes sem copiar uma lista como verdade universal.</p>`],
      ['Compare formação e atribuições', () => `<p>Consulte o <a href="${cnct}" target="_blank" rel="noopener noreferrer">CNCT do MEC</a> para cursos técnicos e o cadastro e-MEC para graduação. Verifique instituição, modalidade, prática, carga horária, perfil de conclusão e requisitos profissionais. Certificados livres complementam o currículo, mas não criam atribuições regulamentadas.</p>`],
      ['Desenvolva base de SSMA', r => `<p>Compreender risco, comunicação, organização e responsabilidade ambiental ajuda em diferentes funções. Estude a visão geral da <a href="${r}mineracao/nr-22/">NR-22</a>, <a href="${r}mineracao/5s-na-mineracao/">5S na mineração</a> e <a href="${r}mineracao/gestao-ambiental-na-mineracao/">gestão ambiental</a>. Essa leitura não substitui treinamentos exigidos pelo empregador.</p>`],
      ['Prepare currículo com evidências', () => `<p>Use título profissional coerente, resumo curto, experiências com contexto e resultado, formação verificável e ferramentas realmente dominadas. Evite competências genéricas sem exemplo. Revise ortografia, contato e datas; não inclua documento sensível na primeira abordagem.</p>`],
      ['Pesquise canais oficiais', () => `<p>Consulte páginas de carreira dos empregadores, prestadoras identificadas e o <a href="${sine}" target="_blank" rel="noopener noreferrer">Sine/Emprega Brasil</a>. Confirme domínio, remetente e processo antes de enviar dados. O Governo Federal informa que vagas do Sine podem ser consultadas pelo Portal Emprega Brasil, Carteira de Trabalho Digital ou postos da rede.</p>`],
      ['Evite golpes e falsas garantias', () => `<ul class="practice-list"><li>Não pague taxa para garantir entrevista ou contratação.</li><li>Desconfie de urgência artificial e promessa sem processo seletivo.</li><li>Não envie senha, código bancário ou documento completo sem necessidade verificada.</li><li>Confirme a vaga em canal oficial independente da mensagem recebida.</li></ul>`],
      ['Crie um plano de preparação', r => `<ol><li>Escolha duas ou três funções-alvo.</li><li>Liste requisitos observados em fontes confiáveis.</li><li>Compare suas evidências e lacunas.</li><li>Priorize formação reconhecida e prática segura.</li><li>Adapte currículo e registre candidaturas.</li><li>Revise resultados mensalmente.</li></ol><p>Use o <a href="${r}ferramentas/gestao-do-tempo/">Tempo 10X</a> para planejar estudos e candidaturas sem transformar quantidade de envios em único indicador.</p>`]
    ],
    related: [['Carreira na mineração', 'carreira-mineracao/'], ['NR-22', 'mineracao/nr-22/'], ['Canaã dos Carajás', 'mineracao/canaa-dos-carajas/'], ['Parauapebas', 'mineracao/parauapebas/']]
  }
];
