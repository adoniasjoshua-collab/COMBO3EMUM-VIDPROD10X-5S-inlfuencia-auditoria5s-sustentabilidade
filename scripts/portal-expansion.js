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
    file: 'mineracao/nr-22/index.html', slug: 'mineracao/nr-22/', cluster: 'mineracao', kind: 'article', verifiedAuthor: true, published: '2026-08-27', updated: '2026-09-02',
    title: 'NR-22: Segurança e Saúde Ocupacional na Mineração',
    description: 'Entenda o objetivo, campo de aplicação, responsabilidades, riscos, máquinas, poeiras, emergências e treinamento previstos na NR-22.',
    h1: 'NR-22: Segurança e Saúde Ocupacional na Mineração',
    lead: 'Guia educativo baseado na página oficial do MTE, revisada em 2026. Consulte sempre o texto vigente antes de decidir ou implantar controles.',
    breadcrumb: [['Mineração', 'mineracao/'], ['NR-22', 'mineracao/nr-22/']],
    sections: [
      ['O que é a NR-22', () => `<p>A NR-22 é uma Norma Regulamentadora setorial dedicada à segurança e à saúde no trabalho na mineração. Segundo o <a href="${nr22}" target="_blank" rel="noopener noreferrer">Ministério do Trabalho e Emprego</a>, seu objetivo é compatibilizar o planejamento e o desenvolvimento da atividade minerária com a busca permanente da segurança e saúde dos trabalhadores.</p><p>A redação aprovada em 2024 fortaleceu o gerenciamento de riscos. O MTE informa ajustes posteriores e alterações de 2026 relacionadas, entre outros pontos, a calor, barragens e poeiras minerais. Por ser matéria dinâmica, este resumo não substitui o texto oficial.</p>`],
      ['Quem deve cumprir a NR-22', () => `<p>O campo de aplicação oficial abrange organizações que realizam mineração subterrânea ou a céu aberto, inclusive garimpos abrangidos por Permissão de Lavra Garimpeira, beneficiamento mineral instalado nas áreas de mineração e pesquisa mineral. Aplicabilidade concreta e interfaces com contratadas devem ser avaliadas no contexto da organização.</p>`],
      ['Segurança na mineração', r => `<p>A prevenção precisa acompanhar tarefa, ambiente, equipamentos, pessoas e mudanças do processo. Operações podem envolver veículos, energia, instabilidade de maciços, quedas, eletricidade, explosivos, incêndio, ruído, vibração e fatores ergonômicos. Aprofunde a abordagem em <a href="${r}mineracao/seguranca-na-mineracao/">segurança na mineração</a>.</p>`],
      ['Gestão de riscos', r => `<p>A norma articula a prevenção com o gerenciamento de riscos ocupacionais. Identificar um perigo é apenas o começo: é preciso avaliar exposição e risco, definir medidas, acompanhar sua implementação e revisar controles diante de mudanças, incidentes ou evidências de ineficácia. Consulte a <a href="${nr1}" target="_blank" rel="noopener noreferrer">NR-1 oficial</a> e o guia de <a href="${r}mineracao/riscos-na-mineracao/">riscos na mineração</a>.</p>`],
      ['Poeiras minerais', () => `<p>O controle de poeiras deve privilegiar prevenção na fonte e medidas coletivas, acompanhado de avaliação de exposição e vigilância da saúde conforme os requisitos aplicáveis. Não copie limites de resumos: consulte a versão vigente da norma e seus anexos.</p>`],
      ['Calor e saúde ocupacional', () => `<p>Calor, hidratação, organização do trabalho e aclimatação exigem avaliação técnica das condições reais. Medidas devem considerar a exposição, a atividade e os requisitos vigentes, sem reduzir o controle a uma recomendação genérica.</p>`],
      ['Máquinas, equipamentos e circulação', () => `<p>Vias, bancadas, bordas, iluminação, tráfego e condições dos equipamentos precisam ser considerados em conjunto. Separar fluxos quando aplicável, controlar acessos, manter comunicação clara e verificar mudanças são práticas de prevenção; parâmetros devem vir da norma, do projeto e dos procedimentos autorizados.</p>`],
      ['Sinalização das áreas de trabalho', () => `<p>A sinalização deve comunicar condições, restrições e rotas de modo legível e coerente com o ambiente. Ela complementa barreiras, planejamento e controle de acesso; não corrige sozinha um perigo sem controle ou uma circulação mal projetada.</p>`],
      ['Emergências', () => `<p>O planejamento de emergências deve refletir cenários plausíveis, meios de comunicação, responsabilidades, rotas, recursos e exercícios. Os critérios precisam ser específicos para a operação e compatíveis com os planos e autoridades envolvidos.</p>`],
      ['Treinamentos', () => `<p>A capacitação precisa corresponder à função, aos riscos e às mudanças do trabalho, conforme a norma e a organização. Lista de presença não demonstra sozinha compreensão ou capacidade de resposta, e este guia educativo não substitui treinamento obrigatório.</p>`],
      ['Responsabilidades', () => `<p>A NR-22 define responsabilidades para a organização e para os trabalhadores e prevê supervisão técnica nas condições estabelecidas. Papéis, autoridade para interromper condições de grave e iminente risco e canais de comunicação precisam estar refletidos nos procedimentos aplicáveis.</p>`],
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
    file: 'mineracao/5s-na-mineracao/index.html', slug: 'mineracao/5s-na-mineracao/', cluster: 'mineracao', kind: 'article', verifiedAuthor: true, published: '2026-08-27', updated: '2026-09-02',
    title: '5S na Mineração: Segurança, Organização e Produtividade',
    description: 'Aprenda como aplicar os cinco sensos em oficinas, almoxarifados, frentes, depósitos e áreas administrativas da mineração.',
    h1: '5S na Mineração: Como Melhorar Segurança, Organização e Produtividade',
    lead: 'Na mineração, o 5S organiza o ambiente e torna anomalias mais visíveis para reduzir desperdícios e apoiar segurança, produtividade e melhoria contínua — sem substituir controles técnicos.',
    breadcrumb: [['Mineração', 'mineracao/'], ['5S na mineração', 'mineracao/5s-na-mineracao/']],
    sections: [
      ['O que é 5S na mineração?', r => `<p>5S na mineração é a aplicação dos sensos de utilização, organização, limpeza, padronização e disciplina em minas, oficinas, almoxarifados, frentes de serviço, canteiros e áreas de apoio. O ponto de partida é um problema observável, como busca demorada, excesso de materiais, identificação confusa ou fonte recorrente de sujeira. Veja primeiro <a href="${r}5s/o-que-e-5s/">o que é 5S e quais são os cinco sensos</a>.</p>`],
      ['Como aplicar os cinco sensos em áreas operacionais', () => `<h3>Seiri — Utilização</h3><p>Separe necessário, eventual, excedente, danificado e não conforme. Materiais, peças, produtos químicos e resíduos não devem ser descartados ou movidos sem autorização. Áreas de quarentena precisam de identificação, prazo e responsável.</p><h3>Seiton — Organização</h3><p>Defina locais considerando frequência de uso, peso, ergonomia, compatibilidade, proteção e rota de movimentação. A identificação visual deve seguir os padrões existentes da operação.</p><h3>Seiso — Limpeza</h3><p>Use a limpeza para perceber vazamentos, desgaste, fixações, acúmulo de pó e embalagens danificadas. Trate a fonte da sujeira e defina o que corrigir, isolar ou comunicar.</p><h3>Seiketsu — Padronização</h3><p>Registre a condição esperada com critérios simples, responsáveis e frequências. Fotografias autorizadas, mapas de localização e limites visuais podem apoiar a rotina.</p><h3>Shitsuke — Disciplina</h3><p>Mantenha o padrão com recursos, treinamento, exemplo da liderança e retorno sobre desvios. Disciplina não deve ser confundida com punição ou aparência preparada apenas para auditoria.</p>`],
      ['5S em oficinas', () => `<p>Em uma oficina, o 5S pode organizar ferramentas, componentes, lubrificantes, áreas de peças não conformes e pontos de descarte. O arranjo deve respeitar circulação, ergonomia, bloqueios, proteção contra contaminação e procedimentos de manutenção.</p>`],
      ['5S em almoxarifados', () => `<p>No almoxarifado, endereçamento, identificação, validade, compatibilidade e critérios de reposição reduzem buscas e movimentações desnecessárias. Itens sem condição de uso precisam de fluxo definido para não retornarem ao estoque disponível.</p>`],
      ['5S na manutenção', () => `<p>Na manutenção, organização e limpeza ajudam a enxergar anomalias e preparar recursos antes da intervenção. O método não autoriza retirar proteções, abreviar bloqueios ou substituir inspeções e liberações previstas no trabalho.</p>`],
      ['5S em frentes de serviço e canteiros', () => `<p>Frentes móveis e canteiros mudam com o avanço da operação. Por isso, o padrão deve prever movimentação de recursos, acessos, resíduos, sinalização e responsabilidades na entrega da área, sem copiar um layout fixo que deixou de representar o campo.</p>`],
      ['5S e segurança do trabalho', r => `<p>Uma área legível facilita perceber obstruções, vazamentos, materiais fora de lugar e mudanças de condição. Ainda assim, 5S não substitui análise de risco, engenharia, capacitação ou requisitos da <a href="${r}mineracao/nr-22/">NR-22</a>. Um bom resultado de auditoria nunca compensa um risco relevante.</p>`],
      ['5S e produtividade', r => `<p>Organização reduz tempo de busca, movimentação desnecessária, falta de materiais e retrabalho. Esse efeito deve ser avaliado junto com segurança, qualidade e continuidade operacional. A conexão completa está no guia de <a href="${r}mineracao/produtividade-na-mineracao/">produtividade na mineração</a>.</p>`],
      ['Erros comuns na implantação', () => `<ul class="practice-list"><li>Tratar 5S como mutirão de limpeza ou concurso de aparência.</li><li>Descartar ou mover materiais sem critérios e autorizações.</li><li>Criar etiquetas e cores paralelas aos padrões da operação.</li><li>Auditar sem tratar causas, recursos e ações pendentes.</li><li>Copiar o mesmo padrão para ambientes com fluxos e riscos diferentes.</li></ul>`],
      ['Checklist básico de 5S na mineração', () => `<ul class="practice-list"><li>Há critérios claros para itens necessários, excedentes e não conformes?</li><li>Locais e identificações correspondem ao fluxo e aos riscos?</li><li>A limpeza ajuda a detectar e comunicar anomalias?</li><li>O padrão define condição, frequência e responsável?</li><li>Desvios geram ações acompanhadas até a verificação de eficácia?</li></ul><p>O checklist orienta observação; não substitui inspeções, permissões ou documentos obrigatórios.</p>`]
    ],
    related: [['O que é 5S', '5s/o-que-e-5s/'], ['5S na empresa', '5s/5s-na-empresa/'], ['Produtividade na mineração', 'mineracao/produtividade-na-mineracao/'], ['NR-22', 'mineracao/nr-22/']]
  },
  {
    file: 'mineracao/produtividade-na-mineracao/index.html', slug: 'mineracao/produtividade-na-mineracao/', cluster: 'mineracao', kind: 'article', verifiedAuthor: true, published: '2026-08-27', updated: '2026-09-02',
    title: 'Produtividade na Mineração com Segurança e Confiabilidade',
    description: 'Entenda produtividade na mineração por fluxo, confiabilidade, planejamento, qualidade, segurança, meio ambiente e melhoria contínua.',
    h1: 'Produtividade na Mineração: Como Melhorar Eficiência sem Comprometer a Segurança',
    lead: 'Produtividade na mineração combina redução de desperdícios, padronização, planejamento, segurança e continuidade operacional — não significa apenas fazer mais rápido.',
    breadcrumb: [['Mineração', 'mineracao/'], ['Produtividade na mineração', 'mineracao/produtividade-na-mineracao/']],
    sections: [
      ['O que é produtividade na mineração', () => `<p>É a capacidade de entregar o resultado planejado com uso responsável de pessoas, equipamentos, materiais, energia e tempo. O desempenho depende do sistema: disponibilidade, qualidade, sequenciamento, manutenção, suprimentos, competência e condições do ambiente. Acelerar uma etapa pode criar fila, retrabalho ou risco em outra.</p>`],
      ['Como aumentar a produtividade na mineração', () => `<p>Comece por uma perda observável, confirme sua causa com quem executa o trabalho e escolha uma mudança pequena, segura e mensurável. Compare o efeito no fluxo completo e nos indicadores de segurança, qualidade e meio ambiente antes de padronizar. Ganho local que transfere espera ou risco não é melhoria sustentável.</p>`],
      ['Continuidade operacional na mineração', () => `<p>Continuidade operacional é a capacidade de manter ou recuperar o fluxo dentro de condições planejadas. Ela depende de riscos conhecidos, recursos críticos, comunicação, redundâncias justificadas e resposta a mudanças. Paradas não planejadas devem gerar análise e aprendizagem, sem incentivar a operação fora de limites seguros.</p>`],
      ['Redução de desperdícios', () => `<p>Espera, transporte desnecessário, estoque inadequado, busca por recursos, consumo acima do previsto e capacidade ociosa são sinais para investigar. Classifique perdas com dados do processo e priorize aquelas que afetam o fluxo, em vez de cortar recursos sem entender sua função.</p>`],
      ['Retrabalho e qualidade', () => `<p>Correções repetidas consomem capacidade e podem esconder falhas de informação, especificação, execução ou verificação. Registre onde o retrabalho surge, sua causa confirmada e as consequências. Qualidade na origem reduz interrupções e evita que a mesma entrega atravesse o processo mais de uma vez.</p>`],
      ['Planejamento operacional', () => `<p>Uma atividade pronta tem escopo, pessoas competentes, recursos, acesso, autorização e informação. Confirmar pré-requisitos antes do deslocamento reduz espera e improviso. Mudanças de condição precisam acionar replanejamento, e não pressão para cumprir uma premissa que deixou de existir.</p>`],
      ['5S na operação mineral', r => `<p>O <a href="${r}mineracao/5s-na-mineracao/">5S na mineração</a> reduz atritos de localização, excesso e condição, além de tornar anomalias mais visíveis. A organização deve acompanhar o fluxo e os riscos da área, não apenas sua aparência.</p>`],
      ['Segurança e produtividade', r => `<p>Segurança é condição de produtividade, não obstáculo. Incidentes, exposições e improvisos interrompem o fluxo e geram consequências humanas e operacionais. Planejamento e metas devem permanecer coerentes com os controles de <a href="${r}mineracao/seguranca-na-mineracao/">segurança na mineração</a>.</p>`],
      ['Manutenção e confiabilidade', () => `<p>Falhas repetidas, intervenções emergenciais e indisponibilidade de componentes reduzem a previsibilidade. Combine histórico, criticidade, condição do ativo e capacidade de execução para planejar manutenção. O indicador deve diferenciar parada planejada, falha, espera por recurso e restrição operacional.</p>`],
      ['Gestão do tempo e das prioridades', r => `<p>A <a href="${r}produtividade/gestao-do-tempo/">gestão do tempo</a> ajuda a explicitar prioridades, capacidade, dependências e margem para imprevistos. Para atividades administrativas e de estudo, o <a href="${r}ferramentas/gestao-do-tempo/">cronômetro de tarefas Tempo 10X</a> permite comparar tempo planejado e registrado.</p>`],
      ['Melhoria contínua', () => `<ol><li>Defina o problema e a condição atual.</li><li>Observe o fluxo com as pessoas.</li><li>Escolha uma causa verificável.</li><li>Teste uma mudança pequena e segura.</li><li>Meça efeitos e consequências.</li><li>Padronize somente o que funcionou.</li><li>Revise e compartilhe a aprendizagem.</li></ol>`],
      ['Indicadores de produtividade', () => `<p>Volume, prazo, utilização e disponibilidade precisam conviver com qualidade, retrabalho, manutenção, ações de risco, incidentes, desvios ambientais e continuidade operacional. Cada indicador deve ter definição, fonte, unidade, frequência, responsável e decisão associada. Metas isoladas podem incentivar comportamento indesejado.</p>`]
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
    file: 'carreira-mineracao/como-trabalhar-na-mineracao/index.html', slug: 'carreira-mineracao/como-trabalhar-na-mineracao/', cluster: 'mineracao', kind: 'article', verifiedAuthor: true, published: '2026-08-27', updated: '2026-09-02',
    title: 'Como Trabalhar na Mineração: Formação e Preparação',
    description: 'Veja como mapear profissões, escolher formação, preparar currículo, buscar vagas oficiais e evitar promessas falsas de emprego na mineração.',
    h1: 'Como trabalhar na mineração: um roteiro responsável',
    lead: 'Entrar no setor depende de função, formação, experiência, localização e processo seletivo — não existe curso ou fórmula que garanta contratação.',
    breadcrumb: [['Carreira na mineração', 'carreira-mineracao/'], ['Como trabalhar na mineração', 'carreira-mineracao/como-trabalhar-na-mineracao/']],
    sections: [
      ['Quais profissões existem na mineração', () => `<p>A cadeia mineral reúne funções de operação, manutenção, geologia, processos minerais, laboratório, planejamento, tecnologia, construção, logística, suprimentos e apoio. Há também carreiras de segurança do trabalho e meio ambiente. Cada vaga tem requisitos próprios; trabalhar em mineradora não corresponde a uma única formação.</p>`],
      ['Quais cursos ajudam a trabalhar na mineração', () => `<p>Compare cursos técnicos no <a href="${cnct}" target="_blank" rel="noopener noreferrer">CNCT do MEC</a> e graduações no cadastro e-MEC. Observe instituição, modalidade, prática, carga horária, perfil de conclusão e atribuições profissionais. Cursos livres podem complementar conhecimentos, mas não garantem emprego nem criam habilitação regulamentada.</p>`],
      ['Segurança do trabalho na mineração', r => `<p>Profissionais de segurança apoiam a identificação de perigos, o planejamento de controles, a orientação e o acompanhamento das atividades dentro de suas atribuições. Candidatos de qualquer área se beneficiam de uma base sobre <a href="${r}mineracao/seguranca-na-mineracao/">segurança na mineração</a>, sem confundir leitura introdutória com capacitação obrigatória.</p>`],
      ['Meio ambiente na mineração', r => `<p>Equipes ambientais podem atuar com controles, inspeções, resíduos, água, monitoramento, licenciamento e registros, conforme o cargo e a organização. O guia de <a href="${r}mineracao/gestao-ambiental-na-mineracao/">gestão ambiental na mineração</a> apresenta uma visão do ciclo sem inventar requisitos de empregadores.</p>`],
      ['NR-22 e preparação profissional', r => `<p>A <a href="${r}mineracao/nr-22/">NR-22</a> é uma referência setorial importante. Estudar seu objetivo, campo de aplicação e linguagem ajuda a compreender o contexto, mas não substitui treinamentos, autorizações e procedimentos definidos para cada função.</p>`],
      ['5S no ambiente de trabalho', r => `<p>Conhecimentos de <a href="${r}mineracao/5s-na-mineracao/">5S na mineração</a> ajudam a discutir organização, percepção de anomalias e manutenção de padrões em oficinas, almoxarifados e frentes. O método complementa, mas não substitui, controles de segurança e meio ambiente.</p>`],
      ['Produtividade e comportamento profissional', r => `<p>Confiabilidade, comunicação, pontualidade, qualidade dos registros e respeito aos limites do trabalho são evidências mais úteis do que dizer apenas “sou produtivo”. Entenda por que <a href="${r}mineracao/produtividade-na-mineracao/">produtividade na mineração</a> depende de planejamento, segurança e continuidade operacional.</p>`],
      ['Como montar um currículo para mineração', () => `<p>Use um título profissional coerente, resumo curto, experiências com contexto e resultado, formação verificável e ferramentas realmente dominadas. Adapte o currículo aos requisitos publicados, revise contato e datas e não inclua documentos sensíveis na primeira abordagem.</p>`],
      ['Como se preparar para processos seletivos', r => `<ol><li>Escolha duas ou três funções-alvo.</li><li>Leia vagas reais em canais oficiais e liste requisitos recorrentes.</li><li>Compare suas evidências e lacunas sem inventar experiência.</li><li>Prepare exemplos de situações, ações e resultados.</li><li>Pesquise a organização e confirme local, etapa e contato.</li><li>Registre candidaturas e revise o plano mensalmente.</li></ol><p>Para oportunidades em Canaã dos Carajás e Parauapebas, consulte os <a href="${r}mineracao/canaa-dos-carajas/">guias</a> <a href="${r}mineracao/parauapebas/">regionais</a> e canais oficiais. Nunca pague por promessa de vaga. O <a href="${sine}" target="_blank" rel="noopener noreferrer">Sine/Emprega Brasil</a> também é um canal público de consulta.</p>`]
    ],
    related: [['Carreira na mineração', 'carreira-mineracao/'], ['NR-22', 'mineracao/nr-22/'], ['Canaã dos Carajás', 'mineracao/canaa-dos-carajas/'], ['Parauapebas', 'mineracao/parauapebas/']]
  }
];
