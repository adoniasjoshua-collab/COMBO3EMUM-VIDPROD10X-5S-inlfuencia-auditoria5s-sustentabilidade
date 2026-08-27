const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const base = 'https://zadonidigital.com.br/';
const checkout = 'https://hotm.io/trilha10x';
const updated = '2026-08-22';
const author = 'Adonias Pereira da Silva';

const pages = [
  {
    file: 'portal/index.html', slug: 'portal/', cluster: 'portal', kind: 'hub',
    title: 'Portal 5S, Produtividade e Gestão Ambiental | Produtividade 10X',
    description: 'Conteúdo prático e responsável sobre 5S, produtividade, gestão do tempo e gestão ambiental aplicado ao trabalho, às obras e à vida.',
    h1: 'Conhecimento prático para organizar, produzir e melhorar',
    lead: 'Um portal educacional para transformar conceitos de 5S, produtividade e gestão ambiental em decisões, rotinas e melhorias que cabem no trabalho real.',
    breadcrumb: [['Portal educacional', 'portal/']],
    sections: [
      ['Escolha por onde começar', r => `<div class="card-grid card-grid--3"><a class="topic-card" href="${r}mineracao/"><span class="topic-card__label">Mineração e SSMA</span><h3>Mineração</h3><p>NR-22, segurança, riscos, 5S, produtividade e gestão ambiental.</p></a><a class="topic-card" href="${r}carreira-mineracao/"><span class="topic-card__label">Preparação profissional</span><h3>Carreira na mineração</h3><p>Formação, currículo, canais oficiais e contexto de Carajás sem promessas.</p></a><a class="topic-card" href="${r}ferramentas/"><span class="topic-card__label">Recursos gratuitos</span><h3>Ferramentas</h3><p>Cronômetro, filtros, gráficos e relatórios no navegador com o Tempo 10X.</p></a><a class="topic-card" href="${r}5s/"><span class="topic-card__label">Organização</span><h3>Programa 5S</h3><p>Entenda os cinco sensos e aplique-os em empresas, obras e na rotina pessoal.</p></a><a class="topic-card" href="${r}produtividade/"><span class="topic-card__label">Execução</span><h3>Produtividade</h3><p>Defina prioridades, proteja o foco e organize o tempo com técnicas adaptáveis.</p></a><a class="topic-card" href="${r}gestao-ambiental/"><span class="topic-card__label">Responsabilidade</span><h3>Gestão ambiental</h3><p>Conheça controles, práticas e responsabilidades aplicáveis a obras e operações.</p></a></div>`],
      ['Da leitura para a prática', r => `<p>Os conteúdos são conectados por uma lógica simples: compreender o fundamento, observar o ambiente, testar uma prática pequena e criar um padrão sustentável. Você pode começar pelo guia sobre <a href="${r}5s/o-que-e-5s/">o que é 5S</a>, organizar prioridades com a <a href="${r}produtividade/matriz-eisenhower/">Matriz de Eisenhower</a> ou entender os pilares da <a href="${r}gestao-ambiental/gestao-ambiental-na-construcao-civil/">gestão ambiental na construção civil</a>.</p><div class="callout"><p><strong>Princípio editorial:</strong> produtividade não deve atropelar segurança, qualidade ou requisitos ambientais. Os três temas se fortalecem quando são aplicados em conjunto.</p></div>`],
      ['Conteúdo baseado em experiência e fontes públicas', () => `<p>Os guias combinam experiência prática em projetos de construção, mineração, gestão ambiental, 5S e soluções digitais com referências públicas quando o assunto depende de norma ou legislação. O objetivo é educar e apoiar boas decisões, sem substituir avaliação técnica, procedimentos do empregador ou orientação jurídica.</p>`]
      ,['Como usar este portal', r => `<p>Se você está começando, leia um guia essencial e escolha uma aplicação pequena para testar. Quem lidera equipes pode avançar dos fundamentos para implantação e acompanhamento. Profissionais de obras podem conectar <a href="${r}5s/5s-na-construcao-civil/">organização do canteiro</a>, <a href="${r}gestao-ambiental/gestao-de-residuos/">gestão de resíduos</a> e educação ambiental. Ao final de cada página, os conteúdos relacionados formam uma trilha sem exigir leitura linear.</p><p>Registre dúvidas, resultados e condições que não funcionaram. O portal oferece referências para raciocinar; a adaptação precisa considerar pessoas, riscos, recursos e requisitos do seu contexto.</p>`]
    ],
    related: [['O que é 5S', '5s/o-que-e-5s/'], ['Técnica Pomodoro', 'produtividade/tecnica-pomodoro/'], ['Gestão ambiental em obras', 'gestao-ambiental/gestao-ambiental-na-construcao-civil/']]
  },
  {
    file: '5s/index.html', slug: '5s/', cluster: '5s', kind: 'hub', title: 'Programa 5S: Guias Práticos para Vida, Empresas e Obras',
    description: 'Aprenda os cinco sensos do Programa 5S e veja como aplicar utilização, organização, limpeza, padronização e disciplina em diferentes contextos.',
    h1: 'Programa 5S: organização que sustenta a melhoria', lead: 'O 5S vai além da limpeza. Ele ajuda a remover excessos, tornar o trabalho visual, perceber anomalias, padronizar rotinas e manter disciplina.',
    breadcrumb: [['5S', '5s/']],
    sections: [
      ['Entenda a metodologia', r => `<div class="card-grid"><a class="topic-card" href="${r}5s/o-que-e-5s/"><span class="topic-card__label">Guia essencial</span><h3>O que é 5S?</h3><p>Conheça Seiri, Seiton, Seiso, Seiketsu e Shitsuke com exemplos objetivos.</p></a><a class="topic-card" href="${r}5s/programa-5s/"><span class="topic-card__label">Implantação</span><h3>Como estruturar um Programa 5S</h3><p>Do diagnóstico inicial à rotina de acompanhamento e melhoria contínua.</p></a></div>`],
      ['Aplique em diferentes ambientes', r => `<div class="card-grid card-grid--3"><a class="topic-card" href="${r}5s/5s-na-empresa/"><h3>5S na empresa</h3><p>Mobilização, área-piloto, padrões e acompanhamento.</p></a><a class="topic-card" href="${r}5s/5s-na-construcao-civil/"><h3>5S na construção</h3><p>Organização de frentes, materiais, ferramentas e resíduos.</p></a><a class="topic-card" href="${r}5s/5s-na-vida-pessoal/"><h3>5S na vida pessoal</h3><p>Casa, documentos, arquivos digitais e hábitos.</p></a></div>`],
      ['O que o 5S pode melhorar', r => `<p>Quando há participação e constância, o método reduz tempo perdido em buscas, excesso de materiais, desorganização visual e recorrência de problemas simples. Ele também cria uma base para segurança, qualidade e produtividade, mas não substitui controles técnicos específicos. Veja como essa relação funciona no guia de <a href="${r}produtividade/5s-e-produtividade/">5S e produtividade</a>.</p>`]
      ,['Por onde começar', r => `<p>Para compreender a linguagem e evitar que o programa seja reduzido a limpeza, comece por <a href="${r}5s/o-que-e-5s/">o que é 5S</a>. Se você precisa conduzir uma iniciativa, avance para o <a href="${r}5s/programa-5s/">roteiro de implantação</a>. Depois escolha o contexto mais próximo da sua realidade e teste o ciclo completo em uma área pequena.</p><p>Uma primeira aplicação deve deixar três coisas claras: qual problema será reduzido, como ficará a condição esperada e quem ajudará a mantê-la. Fotografias autorizadas, tempo de busca, recorrência de desvios e ações concluídas podem apoiar a comparação. Evite começar com dezenas de indicadores ou um ranking entre áreas.</p>`]
    ], related: [['Programa 5S passo a passo', '5s/programa-5s/'], ['5S na empresa', '5s/5s-na-empresa/'], ['5S e produtividade', 'produtividade/5s-e-produtividade/']]
  },
  {
    file: '5s/o-que-e-5s/index.html', slug: '5s/o-que-e-5s/', cluster: '5s', kind: 'article',
    title: 'O que é 5S? Entenda os 5 Sensos e Como Aplicar na Prática', description: 'Entenda o que é 5S, a origem do método, os cinco sensos, benefícios, exemplos e como aplicar o Programa 5S no trabalho e na vida.',
    h1: 'O que é 5S e como aplicar os cinco sensos na prática', lead: '5S é um método de organização e melhoria contínua baseado em cinco sensos japoneses. Sua força está em transformar observação, ordem e disciplina em hábitos de trabalho.',
    breadcrumb: [['5S', '5s/'], ['O que é 5S', '5s/o-que-e-5s/']],
    sections: [
      ['O que significa 5S?', () => `<p>O nome reúne as iniciais de cinco palavras japonesas: <strong>Seiri, Seiton, Seiso, Seiketsu e Shitsuke</strong>. Em português, elas são normalmente tratadas como sensos de utilização, organização, limpeza, padronização ou saúde e disciplina. Não são cinco campanhas isoladas: formam uma sequência para retirar excessos, organizar o necessário, cuidar do ambiente, definir padrões e sustentar o comportamento.</p><p>O método ganhou espaço em programas de qualidade por ser simples de entender e visível no cotidiano. Ainda assim, aplicar 5S não significa apenas arrumar uma área para uma fotografia. O resultado aparece quando as causas da desordem são tratadas e os padrões continuam funcionando depois da mobilização inicial.</p>`],
      ['De onde surgiu o Programa 5S?', () => `<p>O 5S é associado à reconstrução e ao desenvolvimento industrial japonês no período posterior à Segunda Guerra Mundial. Suas práticas se difundiram junto a abordagens de qualidade, organização do trabalho e redução de desperdícios. No Brasil, o método passou a ser adotado por empresas e instituições em diferentes setores.</p><div class="callout"><p>A história ajuda a compreender o contexto, mas o valor do 5S está na aplicação: observar o processo real, envolver as pessoas e escolher padrões compatíveis com o ambiente.</p></div>`],
      ['Quais são os cinco sensos?', () => `<h3>Seiri — utilização</h3><p>Separar o necessário do desnecessário. A pergunta central é: este item, material, documento ou etapa é necessário para o trabalho? O destino do excesso deve ser definido com responsabilidade, sem descarte improvisado.</p><h3>Seiton — organização</h3><p>Definir lugar, identificação e critério de reposição para o que ficou. Um bom arranjo reduz deslocamentos, buscas e dúvidas, respeitando ergonomia, segurança e frequência de uso.</p><h3>Seiso — limpeza</h3><p>Limpar e inspecionar ao mesmo tempo. Sujeira recorrente, vazamentos, peças soltas e resíduos fora do padrão podem revelar causas que precisam de correção.</p><h3>Seiketsu — padronização e saúde</h3><p>Consolidar condições adequadas por meio de padrões visuais, rotinas, responsáveis e frequências. O padrão deve ser claro e possível de cumprir.</p><h3>Shitsuke — disciplina</h3><p>Manter o combinado, acompanhar desvios e melhorar o padrão quando necessário. Disciplina não é punição: é consistência, exemplo da liderança e aprendizagem.</p>`],
      ['Quais são os benefícios do 5S?', () => `<ul class="practice-list"><li>Menos tempo procurando ferramentas, materiais e informações.</li><li>Melhor aproveitamento de espaços e menor acúmulo.</li><li>Percepção mais rápida de anomalias e desvios.</li><li>Ambientes mais legíveis para quem executa e supervisiona.</li><li>Base mais estável para qualidade, segurança e produtividade.</li><li>Rotinas e responsabilidades mais claras.</li></ul><p>Os ganhos variam conforme o ponto de partida, a participação da equipe e a capacidade de manter os padrões. Por isso, evite prometer percentuais universais.</p>`],
      ['Como aplicar o 5S no trabalho?', r => `<ol><li>Escolha uma área e registre a situação inicial.</li><li>Explique o propósito e ouça quem executa o trabalho.</li><li>Classifique itens e defina destinos autorizados.</li><li>Organize conforme fluxo, frequência e risco.</li><li>Limpe enquanto identifica causas de sujeira e desordem.</li><li>Crie padrões simples, visuais e verificáveis.</li><li>Acompanhe poucos indicadores e ajuste a rotina.</li></ol><p>Para uma implantação mais estruturada, consulte o guia do <a href="${r}5s/programa-5s/">Programa 5S</a> e o roteiro de <a href="${r}5s/5s-na-empresa/">5S na empresa</a>.</p>`],
      ['Como aplicar o 5S em obras e na vida pessoal?', r => `<p>Em obras, o método pode apoiar a organização de acessos, ferramentas, estoques, baias, áreas de vivência e frentes de serviço. A aplicação precisa respeitar requisitos legais, procedimentos de segurança e controles ambientais. Veja exemplos em <a href="${r}5s/5s-na-construcao-civil/">5S na construção civil</a>.</p><p>Na vida pessoal, o mesmo raciocínio vale para roupas, documentos, arquivos digitais, compromissos e rotinas. O objetivo não é uma estética perfeita, mas tornar escolhas e manutenção mais fáceis. Aprofunde em <a href="${r}5s/5s-na-vida-pessoal/">5S na vida pessoal</a>.</p>`],
      ['Qual é a relação entre 5S e produtividade?', r => `<p>Organização reduz interrupções e desperdícios, enquanto padrões diminuem decisões repetitivas. Isso libera atenção para o trabalho importante. Porém, uma área bonita com processo ruim continua improdutiva; o 5S deve apoiar o fluxo e não virar burocracia. Leia o guia completo sobre <a href="${r}produtividade/5s-e-produtividade/">5S e produtividade</a>.</p>`],
      ['Erros comuns na implantação', () => `<ul><li>Tratar 5S como mutirão anual de limpeza.</li><li>Descartar materiais sem autorização ou critério.</li><li>Criar padrões sem ouvir os usuários da área.</li><li>Usar auditoria apenas para apontar culpados.</li><li>Focar na nota e ignorar causas e ações.</li><li>Exigir disciplina sem recursos, tempo ou exemplo da liderança.</li></ul>`],
      ['Perguntas frequentes', () => `<h3>5S serve somente para empresas?</h3><p>Não. Pode ser adaptado a residências, estudos, arquivos digitais e rotinas pessoais.</p><h3>5S é apenas limpeza?</h3><p>Não. Limpeza é um dos sensos. Utilização, organização, padronização e disciplina são igualmente essenciais.</p><h3>É necessário aplicar tudo de uma vez?</h3><p>Não. Uma área-piloto pequena permite aprender, demonstrar valor e ajustar o método antes de ampliar.</p>`]
    ], related: [['Programa 5S', '5s/programa-5s/'], ['5S na empresa', '5s/5s-na-empresa/'], ['5S na construção civil', '5s/5s-na-construcao-civil/'], ['5S e produtividade', 'produtividade/5s-e-produtividade/']]
  },
  {
    file: '5s/programa-5s/index.html', slug: '5s/programa-5s/', cluster: '5s', kind: 'article', title: 'Programa 5S: Como Implantar, Acompanhar e Melhorar',
    description: 'Veja como implantar um Programa 5S com diagnóstico, área-piloto, plano de ação, padrões, auditorias educativas e melhoria contínua.', h1: 'Como implantar um Programa 5S que continue funcionando',
    lead: 'Um Programa 5S sustentável combina propósito claro, participação, ações simples, padrões visuais e acompanhamento que gera aprendizagem — não apenas notas.', breadcrumb: [['5S', '5s/'], ['Programa 5S', '5s/programa-5s/']],
    sections: [
      ['Antes de começar: defina o problema', () => `<p>O programa deve responder a necessidades reais: excesso de materiais, demora para localizar itens, áreas obstruídas, falhas de identificação, fontes recorrentes de sujeira ou dificuldade de manter padrões. Registre exemplos e estabeleça um escopo inicial. Sem esse diagnóstico, a campanha pode produzir esforço visível sem melhorar o processo.</p>`],
      ['Forme a base do programa', () => `<p>Defina patrocinador, coordenação, representantes das áreas e responsabilidades. Explique o que será observado, como as pessoas poderão contribuir e como decisões de descarte ou movimentação serão aprovadas. Treinamentos curtos, exemplos da própria área e comunicação respeitosa funcionam melhor que uma apresentação genérica.</p>`],
      ['Comece por uma área-piloto', () => `<p>Escolha um local relevante, com liderança disponível e limites claros. Fotografe apenas quando permitido, registre tempo de busca, volumes acumulados ou desvios recorrentes e execute os cinco sensos. O piloto serve para testar etiquetas, fluxos, formulários e frequência de verificação antes de expandir.</p>`],
      ['Execute os cinco sensos', () => `<ol><li><strong>Utilização:</strong> separar e dar destino autorizado ao excesso.</li><li><strong>Organização:</strong> posicionar o necessário conforme uso, fluxo e risco.</li><li><strong>Limpeza:</strong> inspecionar e tratar fontes, não apenas sintomas.</li><li><strong>Padronização:</strong> registrar condições esperadas e responsáveis.</li><li><strong>Disciplina:</strong> acompanhar, reconhecer avanços e corrigir desvios.</li></ol>`],
      ['Use auditorias como ferramenta educativa', r => `<p>Uma verificação útil produz evidências, responsáveis e prazos. A nota pode ajudar a acompanhar tendência, mas não deve esconder problemas relevantes nem virar competição artificial. Combine perguntas objetivas com espaço para observações e priorize ações por risco e impacto. Para adaptar a abordagem ao ambiente corporativo, leia <a href="${r}5s/5s-na-empresa/">5S na empresa</a>.</p>`],
      ['Indicadores simples para acompanhar', () => `<div class="table-wrap"><table><thead><tr><th>Indicador</th><th>O que mostra</th><th>Cuidado</th></tr></thead><tbody><tr><td>Ações concluídas no prazo</td><td>Capacidade de tratar desvios</td><td>Não encerrar sem verificar eficácia</td></tr><tr><td>Tempo para localizar itens</td><td>Qualidade da organização</td><td>Testar com usuários reais</td></tr><tr><td>Recorrência de desvios</td><td>Força do padrão</td><td>Investigar causas</td></tr></tbody></table></div>`],
      ['Como manter o programa vivo', r => `<p>Integre o 5S às rotinas que já existem, reduza formulários, revise padrões desatualizados e mostre resultados concretos. Lideranças precisam cuidar do próprio ambiente e remover impedimentos. A conexão com <a href="${r}produtividade/5s-e-produtividade/">produtividade</a> deve ser demonstrada por menos busca, retrabalho e interrupção — não por slogans.</p>`]
    ], related: [['O que é 5S', '5s/o-que-e-5s/'], ['5S na empresa', '5s/5s-na-empresa/'], ['5S na construção civil', '5s/5s-na-construcao-civil/']]
  },
  {
    file: '5s/5s-na-empresa/index.html', slug: '5s/5s-na-empresa/', cluster: '5s', kind: 'article', title: '5S na Empresa: Guia Prático para Implantar e Manter',
    description: 'Aprenda como aplicar 5S na empresa com diagnóstico, participação, organização, limpeza, padrões, auditorias e melhoria contínua.', h1: '5S na empresa: da mobilização à rotina',
    lead: 'Nas empresas, o 5S funciona melhor quando resolve obstáculos do trabalho e envolve quem usa cada área. O objetivo é criar condições fáceis de entender e manter.', breadcrumb: [['5S', '5s/'], ['5S na empresa', '5s/5s-na-empresa/']],
    sections: [
      ['Onde o 5S gera valor', () => `<p>Almoxarifados, oficinas, escritórios, arquivos digitais, áreas operacionais e estoques podem ganhar legibilidade com o método. Os sinais mais comuns são busca demorada, itens sem identificação, excesso de materiais, versões duplicadas de documentos e limpeza que não elimina a fonte do problema.</p>`],
      ['Faça um diagnóstico com a equipe', () => `<p>Caminhe pelo processo com quem executa o trabalho. Pergunte o que é difícil de localizar, quais itens nunca são usados, onde surgem erros e quais padrões são confusos. Registre a condição inicial com métricas simples e evidências autorizadas. O diagnóstico deve orientar o plano, não servir para expor pessoas.</p>`],
      ['Adapte os cinco sensos ao processo', () => `<ul class="practice-list"><li>Defina critérios para itens necessários, ocasionais, obsoletos e não conformes.</li><li>Organize por fluxo, frequência de uso, ergonomia e segurança.</li><li>Transforme a limpeza em inspeção de anomalias.</li><li>Use cores, etiquetas e limites somente quando tiverem significado claro.</li><li>Defina responsáveis por áreas e sistemas, não apenas por tarefas de limpeza.</li></ul>`],
      ['Crie padrões que as pessoas consigam seguir', () => `<p>Um padrão deve indicar condição esperada, método, frequência e responsável. Fotografias de referência, mapas de localização e listas curtas podem ajudar. Evite excesso de cartazes, códigos de cor concorrentes ou documentos que não chegam ao ponto de uso.</p>`],
      ['Acompanhe sem transformar em punição', r => `<p>Auditorias periódicas devem reconhecer melhorias, registrar desvios relevantes e gerar ações. Compare a evolução da própria área antes de criar rankings. Se a mesma falha retorna, investigue recursos, treinamento, fluxo ou padrão. O guia de <a href="${r}5s/programa-5s/">implantação do Programa 5S</a> detalha essa governança.</p>`],
      ['Conecte com produtividade, segurança e ambiente', r => `<p>O 5S pode facilitar a percepção de vazamentos, obstruções e resíduos fora do lugar, mas não substitui análise de risco nem controles legais. Combine organização com planejamento do trabalho, <a href="${r}produtividade/gestao-do-tempo/">gestão do tempo</a> e os requisitos técnicos da atividade.</p>`]
    ], related: [['Programa 5S', '5s/programa-5s/'], ['O que é 5S', '5s/o-que-e-5s/'], ['5S e produtividade', 'produtividade/5s-e-produtividade/']]
  },
  {
    file: '5s/5s-na-construcao-civil/index.html', slug: '5s/5s-na-construcao-civil/', cluster: '5s', kind: 'article', title: '5S na Construção Civil: Organização e Produtividade na Obra',
    description: 'Veja como aplicar 5S na construção civil para organizar materiais, ferramentas, frentes de trabalho e resíduos com responsabilidade.', h1: '5S na construção civil: organização aplicada ao canteiro',
    lead: 'No canteiro, organização precisa acompanhar o avanço da obra. O 5S ajuda a tornar materiais, acessos, ferramentas, resíduos e responsabilidades mais visíveis.', breadcrumb: [['5S', '5s/'], ['5S na construção civil', '5s/5s-na-construcao-civil/']],
    sections: [
      ['Por que aplicar 5S em obras?', () => `<p>Frentes mudam, equipes se deslocam e materiais entram e saem com frequência. Sem critérios, surgem estoques dispersos, deslocamentos desnecessários, perdas, obstruções e descarte inadequado. O 5S oferece uma rotina de leitura do ambiente e manutenção das condições planejadas.</p>`],
      ['Seiri: retire excessos com controle', () => `<p>Separe sobras aproveitáveis, materiais aguardando devolução, itens danificados e resíduos. Nenhum descarte deve ocorrer sem autorização e classificação. Áreas de quarentena claramente identificadas evitam que itens sem decisão retornem ao fluxo normal.</p>`],
      ['Seiton: organize pelo fluxo da obra', () => `<p>Posicione ferramentas e materiais considerando frequência, peso, proteção contra intempéries, ergonomia, movimentação e risco. Identifique baias e quantidades máximas. O arranjo deve ser revisto quando a etapa construtiva mudar.</p>`],
      ['Seiso: limpe e encontre causas', () => `<p>A limpeza pode revelar vazamentos, embalagens danificadas, geração de poeira e resíduos fora do local. Registre a fonte, trate o desvio e defina medidas preventivas. Limpar repetidamente sem corrigir a origem apenas transfere o problema.</p>`],
      ['Seiketsu e Shitsuke: padrão e manutenção', () => `<p>Use rotas de inspeção, mapas simples, identificação resistente e responsabilidades por turno ou frente. Verifique se o padrão continua adequado. Disciplina depende de recursos, recipientes, espaço, treinamento e exemplo da liderança.</p>`],
      ['Integração com segurança e gestão ambiental', r => `<div class="callout"><p><strong>Importante:</strong> o 5S não substitui requisitos legais, projeto do canteiro, análise de risco, sinalização ou procedimentos da empresa.</p></div><p>Integre o programa à <a href="${r}gestao-ambiental/gestao-ambiental-na-construcao-civil/">gestão ambiental na construção</a>, à <a href="${r}gestao-ambiental/gestao-de-residuos/">gestão de resíduos</a> e ao planejamento das atividades.</p>`],
      ['Checklist de observação', () => `<ul><li>Acessos e equipamentos de emergência permanecem desobstruídos?</li><li>Materiais estão identificados, protegidos e dentro dos limites?</li><li>Ferramentas retornam a locais definidos?</li><li>Resíduos estão segregados e recipientes identificados?</li><li>Há fontes recorrentes de sujeira, perda ou vazamento?</li><li>O padrão foi atualizado para a etapa atual da obra?</li></ul>`]
    ], related: [['5S na empresa', '5s/5s-na-empresa/'], ['Gestão ambiental em obras', 'gestao-ambiental/gestao-ambiental-na-construcao-civil/'], ['Gestão de resíduos', 'gestao-ambiental/gestao-de-residuos/']]
  },
  {
    file: '5s/5s-na-vida-pessoal/index.html', slug: '5s/5s-na-vida-pessoal/', cluster: '5s', kind: 'article', title: '5S na Vida Pessoal: Organize Casa, Arquivos e Rotina',
    description: 'Use os cinco sensos para organizar objetos, documentos, arquivos digitais e hábitos sem buscar perfeição ou descartar por impulso.', h1: 'Como aplicar 5S na vida pessoal',
    lead: 'O método 5S pode reduzir atrito na rotina: menos coisas sem função, lugares mais claros, arquivos fáceis de achar e hábitos simples de manutenção.', breadcrumb: [['5S', '5s/'], ['5S na vida pessoal', '5s/5s-na-vida-pessoal/']],
    sections: [
      ['Comece por um espaço pequeno', () => `<p>Escolha uma gaveta, pasta digital, mesa ou categoria de documentos. Um escopo pequeno permite terminar o ciclo e testar critérios. Fotografar a condição inicial pode ajudar, desde que não exponha informações pessoais.</p>`],
      ['Utilização sem descarte impulsivo', () => `<p>Separe o que é usado, o que precisa de decisão e o que pode seguir para doação, reciclagem ou descarte adequado. Documentos, medicamentos, eletrônicos e produtos químicos domésticos podem exigir destino específico. Crie uma caixa temporária com data-limite para decisões difíceis.</p>`],
      ['Organização para reduzir escolhas', () => `<p>Guarde itens perto do ponto de uso e defina nomes previsíveis para pastas e arquivos. A melhor organização não é a mais bonita, mas a que permite localizar e devolver cada coisa com pouco esforço. Evite sistemas complexos que dependem de memória.</p>`],
      ['Limpeza como cuidado e inspeção', () => `<p>Enquanto limpa, observe umidade, cabos danificados, alimentos vencidos e equipamentos que precisam de manutenção. Corrija a causa possível e encaminhe o que exigir um profissional. No ambiente digital, elimine duplicatas com cuidado e mantenha cópias de segurança.</p>`],
      ['Padronização e disciplina sem rigidez', () => `<p>Defina uma rotina curta semanal e uma revisão mensal. Use lembretes ou uma lista de três a cinco pontos. Se o sistema exige reorganização constante, simplifique o padrão. Disciplina sustentável deve caber na vida real.</p>`],
      ['Conecte organização a prioridades', r => `<p>Um ambiente legível ajuda, mas não decide o que é importante. Combine o 5S com a <a href="${r}produtividade/matriz-eisenhower/">Matriz de Eisenhower</a> e a <a href="${r}produtividade/gestao-do-tempo/">gestão do tempo</a> para alinhar espaço, agenda e objetivos.</p>`]
    ], related: [['O que é 5S', '5s/o-que-e-5s/'], ['Gestão do tempo', 'produtividade/gestao-do-tempo/'], ['Matriz de Eisenhower', 'produtividade/matriz-eisenhower/']]
  },
  {
    file: 'produtividade/index.html', slug: 'produtividade/', cluster: 'produtividade', kind: 'hub', title: 'Produtividade: Foco, Prioridades e Gestão do Tempo',
    description: 'Guias práticos de produtividade, Técnica Pomodoro, Matriz de Eisenhower, gestão do tempo e organização com 5S.', h1: 'Produtividade com foco no que importa',
    lead: 'Produzir melhor não é ocupar cada minuto. É escolher prioridades, reduzir desperdícios, proteger atenção e construir um ritmo sustentável.', breadcrumb: [['Produtividade', 'produtividade/']],
    sections: [
      ['Ferramentas para decidir e executar', r => `<div class="card-grid card-grid--3"><a class="topic-card" href="${r}produtividade/matriz-eisenhower/"><span class="topic-card__label">Decidir</span><h3>Matriz de Eisenhower</h3><p>Separe urgência de importância e dê um destino às tarefas.</p></a><a class="topic-card" href="${r}produtividade/tecnica-pomodoro/"><span class="topic-card__label">Executar</span><h3>Técnica Pomodoro</h3><p>Use ciclos de foco e pausas adaptados ao tipo de trabalho.</p></a><a class="topic-card" href="${r}produtividade/gestao-do-tempo/"><span class="topic-card__label">Planejar</span><h3>Gestão do tempo</h3><p>Transforme prioridades em agenda com margem para imprevistos.</p></a></div>`],
      ['Organização também é produtividade', r => `<p>Interrupções não vêm apenas do celular. Procurar materiais, lidar com versões duplicadas e decidir repetidamente onde guardar informações consome atenção. O guia sobre <a href="${r}produtividade/5s-e-produtividade/">5S e produtividade</a> mostra como o ambiente e os padrões apoiam a execução.</p>`],
      ['Nenhuma técnica é universal', () => `<p>Trabalho criativo, atividades operacionais, estudo e liderança exigem ritmos diferentes. Teste uma ferramenta por vez, observe resultados e adapte. Técnicas de produtividade nunca devem substituir pausas necessárias, requisitos de segurança ou cuidado com a saúde.</p>`]
      ,['Uma sequência simples para testar', r => `<p>Comece registrando compromissos e tarefas por alguns dias. Em seguida, use a <a href="${r}produtividade/matriz-eisenhower/">Matriz de Eisenhower</a> para decidir o que fazer, planejar, delegar ou reduzir. Reserve na agenda um bloco realista para uma prioridade e experimente ciclos de foco se o tipo de trabalho permitir.</p><p>Na revisão, avalie entrega, qualidade, energia e interrupções — não apenas quantidade de tarefas. Se o plano falhou, ajuste capacidade, ambiente ou tamanho da tarefa. Produtividade sustentável melhora resultados sem esconder sobrecarga nem transferir risco.</p>`]
    ], related: [['Técnica Pomodoro', 'produtividade/tecnica-pomodoro/'], ['Matriz de Eisenhower', 'produtividade/matriz-eisenhower/'], ['5S e produtividade', 'produtividade/5s-e-produtividade/']]
  },
  {
    file: 'produtividade/tecnica-pomodoro/index.html', slug: 'produtividade/tecnica-pomodoro/', cluster: 'produtividade', kind: 'article', title: 'Técnica Pomodoro: Como Usar para Foco e Produtividade',
    description: 'Aprenda como funciona a Técnica Pomodoro, como adaptar ciclos de foco e pausas e como combinar execução com prioridades.', h1: 'Técnica Pomodoro: como usar ciclos de foco',
    lead: 'A Técnica Pomodoro alterna períodos de atenção concentrada e pausas. Ela ajuda a começar, tornar o progresso visível e reduzir a dispersão.', breadcrumb: [['Produtividade', 'produtividade/'], ['Técnica Pomodoro', 'produtividade/tecnica-pomodoro/']],
    sections: [
      ['Como a Técnica Pomodoro funciona', () => `<ol><li>Escolha uma tarefa específica e possível de iniciar.</li><li>Defina um período de foco — o formato clássico usa 25 minutos.</li><li>Retire distrações previsíveis e trabalhe somente na tarefa.</li><li>Registre interrupções sem persegui-las imediatamente.</li><li>Faça uma pausa curta; depois de alguns ciclos, uma pausa maior.</li></ol>`],
      ['É obrigatório usar 25 minutos?', () => `<p>Não. Vinte e cinco minutos é um ponto de partida, não uma regra universal. Escrita profunda pode funcionar melhor com 40 ou 50 minutos; uma tarefa evitada pode começar com 10. O ciclo precisa respeitar complexidade, energia e contexto.</p>`],
      ['Prepare o ciclo antes de ligar o cronômetro', () => `<p>Escreva o resultado esperado, abra os materiais necessários e feche abas que não ajudam. Uma tarefa como “fazer relatório” é ampla; “revisar a introdução e listar três evidências” oferece um alvo observável. A preparação reduz o risco de gastar o bloco decidindo o que fazer.</p>`],
      ['Como lidar com interrupções', () => `<p>Se a interrupção puder esperar, anote-a e volte ao foco. Se for urgente de verdade, encerre o ciclo e reinicie depois. Em ambientes com atendimento, liderança ou operação, combine janelas de disponibilidade e nunca ignore alertas críticos em nome do cronômetro.</p>`],
      ['Pomodoro e prioridades', r => `<p>O método ajuda a executar, mas não escolhe a tarefa certa. Antes do ciclo, use a <a href="${r}produtividade/matriz-eisenhower/">Matriz de Eisenhower</a> ou outro critério de prioridade. Reserve blocos na agenda seguindo o guia de <a href="${r}produtividade/gestao-do-tempo/">gestão do tempo</a>.</p>`],
      ['Erros comuns', () => `<ul><li>Usar o cronômetro para trabalhar sem pausas reais.</li><li>Escolher uma tarefa vaga ou grande demais.</li><li>Contar ciclos como produtividade, sem avaliar resultado.</li><li>Interromper o foco para responder cada notificação.</li><li>Aplicar a técnica em atividade que exige vigilância contínua.</li></ul>`],
      ['Um teste simples de sete dias', () => `<p>Escolha um tipo de tarefa, use dois ou três ciclos por dia e registre duração, interrupções e resultado. Ao final da semana, ajuste o tamanho do bloco e a pausa. O melhor formato é o que melhora execução sem gerar fadiga desnecessária.</p>`]
    ], related: [['Matriz de Eisenhower', 'produtividade/matriz-eisenhower/'], ['Gestão do tempo', 'produtividade/gestao-do-tempo/'], ['5S e produtividade', 'produtividade/5s-e-produtividade/']]
  },
  {
    file: 'produtividade/matriz-eisenhower/index.html', slug: 'produtividade/matriz-eisenhower/', cluster: 'produtividade', kind: 'article', title: 'Matriz de Eisenhower: Como Priorizar Tarefas na Prática',
    description: 'Aprenda a usar a Matriz de Eisenhower para separar tarefas urgentes e importantes, decidir ações e revisar prioridades.', h1: 'Matriz de Eisenhower: transforme tarefas em decisões',
    lead: 'A matriz organiza demandas em quatro quadrantes segundo urgência e importância. Seu valor não está no desenho, mas nas decisões que vêm depois.', breadcrumb: [['Produtividade', 'produtividade/'], ['Matriz de Eisenhower', 'produtividade/matriz-eisenhower/']],
    sections: [
      ['Urgente não é igual a importante', () => `<p>Urgência está ligada ao tempo disponível e às consequências de esperar. Importância está ligada a objetivos, responsabilidades, riscos e valor. Uma mensagem pode parecer urgente sem contribuir para o resultado; uma manutenção preventiva pode ser importante antes de virar emergência.</p>`],
      ['Os quatro quadrantes', () => `<div class="table-wrap"><table><thead><tr><th></th><th>Urgente</th><th>Não urgente</th></tr></thead><tbody><tr><th>Importante</th><td><strong>Fazer:</strong> crises reais, prazos críticos e incidentes.</td><td><strong>Planejar:</strong> prevenção, estratégia, aprendizagem e projetos.</td></tr><tr><th>Não importante</th><td><strong>Delegar ou limitar:</strong> interrupções e demandas que outra pessoa pode resolver.</td><td><strong>Eliminar ou reduzir:</strong> hábitos e tarefas sem contribuição clara.</td></tr></tbody></table></div>`],
      ['Como preencher sem se enganar', () => `<p>Liste tarefas concretas e use critérios. Pergunte: qual consequência ocorre se isto esperar? A demanda está ligada a uma responsabilidade real? Existe prazo externo? Sou a pessoa certa para executar? Evite colocar tudo no primeiro quadrante apenas porque está atrasado.</p>`],
      ['Dê um destino a cada quadrante', () => `<ul><li><strong>Fazer:</strong> escolha ordem e limite o trabalho simultâneo.</li><li><strong>Planejar:</strong> reserve data e duração na agenda.</li><li><strong>Delegar:</strong> defina resultado, responsável, prazo e acompanhamento.</li><li><strong>Eliminar:</strong> remova, recuse ou reduza conscientemente.</li></ul>`],
      ['Use a matriz com a agenda', r => `<p>Uma matriz sem calendário vira apenas uma lista colorida. Transfira tarefas importantes e não urgentes para blocos protegidos. O guia de <a href="${r}produtividade/gestao-do-tempo/">gestão do tempo</a> ajuda a reservar capacidade e margem para imprevistos. Para executar um bloco, teste a <a href="${r}produtividade/tecnica-pomodoro/">Técnica Pomodoro</a>.</p>`],
      ['Limitações e cuidados', () => `<p>A avaliação é contextual e pode mudar com novas informações. Em equipes, prioridades dependem de acordos e responsabilidades. Demandas de segurança, emergência e conformidade devem seguir protocolos aplicáveis, não uma matriz pessoal.</p>`],
      ['Revisão semanal', () => `<p>Reavalie itens que continuam urgentes, tarefas delegadas e ações importantes que nunca chegam à agenda. Se o primeiro quadrante está sempre lotado, procure causas: planejamento insuficiente, dependências, excesso de compromissos ou critérios pouco claros.</p>`]
    ], related: [['Gestão do tempo', 'produtividade/gestao-do-tempo/'], ['Técnica Pomodoro', 'produtividade/tecnica-pomodoro/'], ['5S na vida pessoal', '5s/5s-na-vida-pessoal/']]
  },
  {
    file: 'produtividade/gestao-do-tempo/index.html', slug: 'produtividade/gestao-do-tempo/', cluster: 'produtividade', kind: 'article', title: 'Gestão do Tempo: Como Planejar Prioridades e Rotina',
    description: 'Aprenda gestão do tempo com prioridades, blocos de agenda, margem para imprevistos, revisão semanal e práticas sustentáveis.', h1: 'Gestão do tempo para uma rotina possível',
    lead: 'O tempo não aumenta, mas compromissos podem ser escolhidos, organizados e renegociados. Boa gestão combina prioridade, capacidade e revisão.', breadcrumb: [['Produtividade', 'produtividade/'], ['Gestão do tempo', 'produtividade/gestao-do-tempo/']],
    sections: [
      ['Comece pela realidade da semana', () => `<p>Antes de criar a agenda ideal, observe compromissos fixos, deslocamentos, energia disponível e tarefas que já consomem tempo. Durante alguns dias, registre blocos de atividade sem buscar precisão perfeita. O objetivo é encontrar padrões e diferenças entre o planejado e o real.</p>`],
      ['Defina poucas prioridades', r => `<p>Escolha de uma a três entregas relevantes para o dia e conecte-as a objetivos maiores. A <a href="${r}produtividade/matriz-eisenhower/">Matriz de Eisenhower</a> ajuda a separar urgência de importância, mas a decisão final precisa considerar prazos, riscos e responsabilidades.</p>`],
      ['Transforme intenção em blocos', () => `<p>Reserve períodos para tarefas que exigem concentração, reuniões, atividades administrativas e pausas. Inclua tempo de preparação e fechamento. Blocos não precisam preencher a agenda inteira; uma ocupação de 100% ignora imprevistos e transições.</p>`],
      ['Proteja o foco de forma realista', r => `<p>Agrupe tarefas semelhantes, silencie notificações quando for seguro e prepare materiais antes de começar. A <a href="${r}produtividade/tecnica-pomodoro/">Técnica Pomodoro</a> pode criar ritmo, mas deve ser adaptada ao trabalho e interrompida diante de situações críticas.</p>`],
      ['Crie margem e critérios para interrupções', () => `<p>Defina janelas para respostas, canais para urgências reais e blocos livres. Quando algo novo chegar, pergunte o que será adiado ou removido. Aceitar uma tarefa sem revisar capacidade transforma a agenda em promessa impossível.</p>`],
      ['Faça uma revisão diária e semanal', () => `<ul class="practice-list"><li>O que foi concluído e por quê?</li><li>O que ficou pendente e qual é o próximo passo?</li><li>Quais interrupções se repetiram?</li><li>Que compromisso pode ser eliminado, delegado ou renegociado?</li><li>Quanto espaço a próxima semana precisa reservar?</li></ul>`],
      ['Organize também o ambiente', r => `<p>Tempo se perde quando materiais, informações e versões não são encontrados. Use os princípios de <a href="${r}produtividade/5s-e-produtividade/">5S e produtividade</a> para reduzir atrito físico e digital.</p><p>Para transformar o planejamento em execução mensurável, use o <a href="${r}ferramentas/gestao-do-tempo/">cronômetro de tarefas online do Tempo 10X</a> e compare horas planejadas e registradas.</p>`]
    ], related: [['Matriz de Eisenhower', 'produtividade/matriz-eisenhower/'], ['Técnica Pomodoro', 'produtividade/tecnica-pomodoro/'], ['5S e produtividade', 'produtividade/5s-e-produtividade/']]
  },
  {
    file: 'produtividade/5s-e-produtividade/index.html', slug: 'produtividade/5s-e-produtividade/', cluster: 'produtividade', kind: 'article', title: '5S e Produtividade: Como Organização Reduz Desperdícios',
    description: 'Entenda como 5S e produtividade se conectam por meio de menos buscas, excessos, interrupções, anomalias e decisões repetitivas.', h1: '5S e produtividade: organização a serviço do trabalho',
    lead: 'O 5S melhora produtividade quando reduz desperdícios reais e torna o processo mais previsível. A meta não é organizar por aparência, mas facilitar a execução.', breadcrumb: [['Produtividade', 'produtividade/'], ['5S e produtividade', 'produtividade/5s-e-produtividade/']],
    sections: [
      ['Onde a produtividade se perde', () => `<p>Buscar ferramentas, abrir arquivos errados, mover materiais várias vezes, interromper tarefas para resolver falta de identificação e refazer limpeza são perdas comuns. Como aparecem em minutos dispersos, podem passar despercebidas. Observar o fluxo ajuda a transformar incômodo em problema tratável.</p>`],
      ['Como cada senso contribui', () => `<ul class="practice-list"><li><strong>Seiri:</strong> reduz excesso e decisões sobre itens sem utilidade.</li><li><strong>Seiton:</strong> encurta buscas e movimentações.</li><li><strong>Seiso:</strong> revela fontes de falha e anomalias.</li><li><strong>Seiketsu:</strong> reduz variação e dúvidas repetidas.</li><li><strong>Shitsuke:</strong> mantém ganhos e estimula melhoria.</li></ul>`],
      ['Organização visual e fluxo', () => `<p>Limites, nomes, quantidades e locais definidos tornam desvios visíveis. Mas um sistema visual só ajuda quando os códigos são consistentes e conhecidos. Excesso de etiquetas e cores pode criar ruído. Comece com a informação necessária para tomar uma decisão no ponto de uso.</p>`],
      ['Meça o que mudou no trabalho', () => `<p>Em vez de medir apenas nota de auditoria, observe tempo de busca, distância percorrida, recorrência de falta, itens vencidos, retrabalho e cumprimento de ações. Compare antes e depois em condições semelhantes e evite atribuir todo resultado ao 5S quando outras mudanças ocorreram.</p>`],
      ['Combine ambiente, prioridade e foco', r => `<p>Um local organizado não resolve prioridades conflitantes. Use a <a href="${r}produtividade/matriz-eisenhower/">Matriz de Eisenhower</a> para decidir, a <a href="${r}produtividade/tecnica-pomodoro/">Técnica Pomodoro</a> para executar quando apropriado e o 5S para manter recursos e informações acessíveis.</p>`],
      ['Evite produtividade tóxica', () => `<p>Eliminar desperdício não significa eliminar pausas, pressionar ritmos inseguros ou ocupar toda a capacidade. Segurança, qualidade, saúde e responsabilidade ambiental são guardrails. Se uma melhoria transfere carga ou risco para outra pessoa, o sistema precisa ser revisto.</p>`]
    ], related: [['O que é 5S', '5s/o-que-e-5s/'], ['Gestão do tempo', 'produtividade/gestao-do-tempo/'], ['5S na empresa', '5s/5s-na-empresa/']]
  },
  {
    file: 'gestao-ambiental/index.html', slug: 'gestao-ambiental/', cluster: 'gestao-ambiental', kind: 'hub', title: 'Gestão Ambiental: Fundamentos e Práticas em Obras',
    description: 'Conteúdos educativos sobre gestão ambiental, construção civil, resíduos, educação ambiental e prevenção de impactos.', h1: 'Gestão ambiental aplicada ao trabalho real',
    lead: 'Gestão ambiental conecta planejamento, requisitos, controles operacionais, registros e participação das pessoas para prevenir e reduzir impactos.', breadcrumb: [['Gestão ambiental', 'gestao-ambiental/']],
    sections: [
      ['Guias principais', r => `<div class="card-grid card-grid--3"><a class="topic-card" href="${r}gestao-ambiental/gestao-ambiental-na-construcao-civil/"><span class="topic-card__label">Obras</span><h3>Gestão ambiental na construção</h3><p>Planejamento, controles, inspeções e acompanhamento no canteiro.</p></a><a class="topic-card" href="${r}gestao-ambiental/gestao-de-residuos/"><span class="topic-card__label">Materiais</span><h3>Gestão de resíduos</h3><p>Prevenção, segregação, armazenamento e destinação documentada.</p></a><a class="topic-card" href="${r}gestao-ambiental/educacao-ambiental-em-obras/"><span class="topic-card__label">Pessoas</span><h3>Educação ambiental em obras</h3><p>Comunicação prática, diálogo e verificação de aprendizagem.</p></a></div>`],
      ['Uma disciplina de gestão, não uma ação isolada', () => `<p>Boas práticas ambientais começam antes da execução: identificar aspectos, entender requisitos aplicáveis, definir controles e preparar recursos. Durante o trabalho, inspeções e registros ajudam a verificar eficácia. Desvios devem gerar correção e aprendizagem, não apenas documentação.</p>`],
      ['Responsabilidade técnica e legal', () => `<div class="callout"><p>Este portal tem finalidade educativa. Requisitos legais, condicionantes, licenças, normas e procedimentos devem ser verificados para a atividade, localidade e data. Em caso de dúvida, consulte profissionais habilitados e órgãos competentes.</p></div>`]
      ,['O ciclo da gestão ambiental', r => `<p>Uma gestão consistente percorre etapas conectadas: identificar aspectos e requisitos, avaliar riscos e impactos, planejar controles, preparar recursos, orientar equipes, acompanhar o campo e corrigir desvios. Indicadores e registros servem para verificar eficácia e apoiar decisões, não para substituir observação.</p><p>Em obras, esse ciclo precisa acompanhar cada fase. Mobilização, terraplenagem, estruturas, acabamento e desmobilização geram condições diferentes. Comece pelo guia de <a href="${r}gestao-ambiental/gestao-ambiental-na-construcao-civil/">gestão ambiental na construção</a> e aprofunde os fluxos que exigem maior controle.</p>`]
    ], related: [['Gestão ambiental em obras', 'gestao-ambiental/gestao-ambiental-na-construcao-civil/'], ['Gestão de resíduos', 'gestao-ambiental/gestao-de-residuos/'], ['Educação ambiental em obras', 'gestao-ambiental/educacao-ambiental-em-obras/']]
  },
  {
    file: 'gestao-ambiental/gestao-ambiental-na-construcao-civil/index.html', slug: 'gestao-ambiental/gestao-ambiental-na-construcao-civil/', cluster: 'gestao-ambiental', kind: 'article', title: 'Gestão Ambiental na Construção Civil: Guia Prático',
    description: 'Entenda como planejar controles ambientais em obras para resíduos, água, poeira, ruído, produtos químicos, solo e comunicação.', h1: 'Gestão ambiental na construção civil: do planejamento ao controle',
    lead: 'Uma obra ambientalmente responsável identifica impactos antes da atividade, define controles proporcionais ao risco e verifica se eles funcionam no campo.', breadcrumb: [['Gestão ambiental', 'gestao-ambiental/'], ['Gestão ambiental na construção civil', 'gestao-ambiental/gestao-ambiental-na-construcao-civil/']],
    sections: [
      ['Comece pelos aspectos e impactos', () => `<p>Consumo de água e energia, geração de resíduos, emissões de poeira, ruído, movimentação de solo, uso de produtos químicos e interferência em drenagem são exemplos de aspectos que podem gerar impactos. A avaliação precisa considerar fase da obra, localização, sensibilidade do entorno, frequência, magnitude e controles existentes.</p>`],
      ['Mapeie requisitos aplicáveis', () => `<p>Licenças, autorizações, condicionantes, leis, normas técnicas, contratos e procedimentos podem estabelecer obrigações diferentes. Mantenha uma lista atualizada com responsável, evidência e frequência de verificação. Quando houver dúvida de interpretação, busque suporte técnico ou jurídico qualificado.</p>`],
      ['Planeje os controles antes da mobilização', () => `<ul class="practice-list"><li>Defina áreas de armazenamento e segregação de resíduos.</li><li>Proteja solo, drenagem e corpos d'água.</li><li>Planeje contenção e resposta a derramamentos.</li><li>Estabeleça medidas para poeira, lama, ruído e efluentes.</li><li>Prepare sinalização, kits, recipientes e registros.</li><li>Comunique responsabilidades a contratadas e equipes.</li></ul>`],
      ['Gestão de resíduos e materiais', r => `<p>Priorize prevenção e redução. Depois, separe resíduos compatíveis, identifique recipientes, evite mistura e mantenha rastreabilidade até a destinação. O guia de <a href="${r}gestao-ambiental/gestao-de-residuos/">gestão de resíduos</a> detalha o fluxo e os pontos de controle.</p>`],
      ['Produtos químicos e resposta a emergências', () => `<p>Mantenha inventário, identificação, informações de segurança acessíveis e armazenamento compatível. Planeje contenção secundária e resposta conforme os perigos do produto. Pessoas envolvidas precisam saber reconhecer o evento, proteger-se e acionar o fluxo correto. Não improvise neutralização ou descarte.</p>`],
      ['Inspeções que verificam eficácia', () => `<p>Uma inspeção deve observar condição de campo, evidência, causa provável, risco, responsável e prazo. Fotografias só devem ser usadas quando autorizadas. Após a correção, verifique se a ação funcionou e se o problema pode ocorrer em outra frente.</p>`],
      ['Educação ambiental conectada à tarefa', r => `<p>Diálogos curtos no local de trabalho, demonstrações e retorno sobre desvios ajudam a transformar regra em prática. Veja como estruturar <a href="${r}gestao-ambiental/educacao-ambiental-em-obras/">educação ambiental em obras</a> e conecte a organização do canteiro ao <a href="${r}5s/5s-na-construcao-civil/">Programa 5S</a>.</p>`]
    ], related: [['Gestão de resíduos', 'gestao-ambiental/gestao-de-residuos/'], ['Educação ambiental em obras', 'gestao-ambiental/educacao-ambiental-em-obras/'], ['5S na construção civil', '5s/5s-na-construcao-civil/']]
  },
  {
    file: 'gestao-ambiental/gestao-de-residuos/index.html', slug: 'gestao-ambiental/gestao-de-residuos/', cluster: 'gestao-ambiental', kind: 'article', title: 'Gestão de Resíduos: Etapas, Segregação e Controle',
    description: 'Aprenda as etapas da gestão de resíduos: prevenção, classificação, segregação, armazenamento, transporte, destinação e rastreabilidade.', h1: 'Gestão de resíduos: do planejamento à destinação',
    lead: 'Gerenciar resíduos é controlar todo o fluxo: evitar geração, identificar, separar, acondicionar, armazenar, transportar, destinar e comprovar.', breadcrumb: [['Gestão ambiental', 'gestao-ambiental/'], ['Gestão de resíduos', 'gestao-ambiental/gestao-de-residuos/']],
    sections: [
      ['A melhor gestão começa antes do resíduo', () => `<p>Planejamento de compras, dimensionamento, armazenamento adequado e reaproveitamento tecnicamente permitido podem evitar perdas. A prevenção costuma ser mais eficiente que administrar grandes volumes depois. Metas devem considerar o tipo de atividade e dados confiáveis.</p>`],
      ['Identifique e classifique corretamente', () => `<p>A classificação orienta acondicionamento, compatibilidade, transporte e destinação. Use critérios legais e técnicos vigentes e informações do processo. Aparência ou cor do recipiente, sozinhas, não determinam a classificação. Em caso de incerteza, isole e busque avaliação competente.</p>`],
      ['Segregue no ponto de geração', () => `<p>Misturar resíduos pode inviabilizar reciclagem, aumentar risco e elevar custo. Disponibilize recipientes compatíveis, próximos ao uso e claramente identificados. Treine as pessoas com exemplos reais e verifique se cores e nomes são compreendidos no local.</p>`],
      ['Acondicione e armazene com segurança', () => `<ul class="practice-list"><li>Use recipientes íntegros e compatíveis com o conteúdo.</li><li>Proteja contra chuva, vento, vazamento e acesso indevido.</li><li>Separe materiais incompatíveis e respeite limites.</li><li>Mantenha identificação legível e área organizada.</li><li>Planeje inspeção, limpeza e resposta a incidentes.</li></ul>`],
      ['Transporte, destinação e rastreabilidade', () => `<p>Verifique autorizações e documentos exigidos para transportadores e destinos. Registre tipo, quantidade, origem, data e comprovantes. A responsabilidade não termina quando o caminhão sai da obra; a rastreabilidade permite demonstrar o fluxo e investigar divergências.</p>`],
      ['Indicadores úteis', () => `<p>Acompanhe geração por atividade ou unidade relevante, taxa de desvio de aterro quando os dados permitirem, contaminação de recicláveis, recorrência de segregação incorreta e pendências documentais. Declare limitações de balança, estimativa e período para não criar falsa precisão.</p>`],
      ['Integração com 5S e educação ambiental', r => `<p>O <a href="${r}5s/5s-na-construcao-civil/">5S na construção</a> ajuda a manter áreas legíveis, enquanto a <a href="${r}gestao-ambiental/educacao-ambiental-em-obras/">educação ambiental</a> conecta o padrão à decisão cotidiana. O plano de resíduos continua sendo o documento técnico que define responsabilidades e controles aplicáveis.</p>`]
    ], related: [['Gestão ambiental em obras', 'gestao-ambiental/gestao-ambiental-na-construcao-civil/'], ['Educação ambiental em obras', 'gestao-ambiental/educacao-ambiental-em-obras/'], ['5S na construção civil', '5s/5s-na-construcao-civil/']]
  },
  {
    file: 'gestao-ambiental/educacao-ambiental-em-obras/index.html', slug: 'gestao-ambiental/educacao-ambiental-em-obras/', cluster: 'gestao-ambiental', kind: 'article', title: 'Educação Ambiental em Obras: Como Engajar Equipes',
    description: 'Veja como planejar educação ambiental em obras com temas ligados às tarefas, comunicação acessível, prática e verificação de aprendizagem.', h1: 'Educação ambiental em obras que chega à prática',
    lead: 'Uma boa ação educativa conecta o requisito ao trabalho do dia, usa linguagem acessível e verifica se a equipe sabe como agir.', breadcrumb: [['Gestão ambiental', 'gestao-ambiental/'], ['Educação ambiental em obras', 'gestao-ambiental/educacao-ambiental-em-obras/']],
    sections: [
      ['Parta dos riscos e tarefas reais', () => `<p>Escolha temas a partir dos aspectos ambientais, desvios observados, mudanças de atividade e dúvidas das equipes. Segregação de resíduos, contenção de derramamentos, proteção de drenagem e uso responsável de recursos ganham sentido quando apresentados no local e momento adequados.</p>`],
      ['Combine formatos', () => `<p>Integração, diálogo diário, demonstração, sinalização, campanha e retorno de inspeção cumprem papéis diferentes. Um cartaz pode lembrar; uma demonstração ensina a executar; uma conversa permite verificar entendimento. Evite depender apenas de longas apresentações.</p>`],
      ['Use comunicação acessível', () => `<p>Prefira frases diretas, imagens fiéis ao local e exemplos conhecidos. Considere idioma, alfabetização, ruído, turno e acessibilidade. Siglas e termos técnicos devem ser explicados. Peça que participantes mostrem ou expliquem o que fariam, em vez de perguntar apenas se entenderam.</p>`],
      ['Transforme desvio em aprendizagem', () => `<p>Ao encontrar um problema, trate o risco imediato e investigue por que ocorreu. Falta de recipiente, identificação ruim, rota distante ou orientação contraditória não se resolvem apenas com cobrança. Compartilhe a melhoria sem expor indivíduos.</p>`],
      ['Registre o necessário e avalie eficácia', () => `<p>Registros podem incluir tema, data, público, responsável e evidência compatível com as regras do projeto. Avalie eficácia por observação de comportamento, redução de recorrência e qualidade das decisões. Presença em treinamento, sozinha, não comprova aprendizagem.</p>`],
      ['Conecte educação e controles', r => `<p>A comunicação deve refletir o plano e os recursos disponíveis. Aprofunde os controles no guia de <a href="${r}gestao-ambiental/gestao-ambiental-na-construcao-civil/">gestão ambiental na construção</a> e use a <a href="${r}gestao-ambiental/gestao-de-residuos/">gestão de resíduos</a> como exemplo de fluxo que depende de decisão no ponto de geração.</p>`]
    ], related: [['Gestão ambiental em obras', 'gestao-ambiental/gestao-ambiental-na-construcao-civil/'], ['Gestão de resíduos', 'gestao-ambiental/gestao-de-residuos/'], ['5S na construção civil', '5s/5s-na-construcao-civil/']]
  },
  {
    file: 'sobre/index.html', slug: 'sobre/', cluster: 'sobre', kind: 'about', title: 'Sobre Adonias Pereira da Silva | Portal Produtividade 10X',
    description: 'Conheça Adonias Pereira da Silva, a experiência prática por trás do portal e os princípios de produção e revisão dos conteúdos.', h1: 'Quem é Adonias Pereira da Silva',
    lead: 'Técnico em Meio Ambiente e autor de conteúdos sobre 5S, produtividade, gestão ambiental e tecnologia aplicada.', breadcrumb: [['Sobre', 'sobre/']],
    sections: [
      ['Experiência prática', () => `<p>Adonias Pereira da Silva atua com experiência prática em grandes projetos de construção e mineração. Essa vivência orienta conteúdos voltados a desafios concretos: organização de ambientes, comunicação com equipes, prevenção de impactos, disciplina operacional e criação de rotinas que possam ser mantidas.</p><p>As informações publicadas aqui não incluem procedimentos internos ou dados confidenciais de empresas. Exemplos são generalizados e apresentados com finalidade educativa.</p>`],
      ['Áreas de atuação e estudo', () => `<ul class="practice-list"><li>Programa 5S e organização aplicada.</li><li>Gestão ambiental em construção e mineração.</li><li>Educação ambiental e gestão de resíduos.</li><li>Produtividade, foco e gestão do tempo.</li><li>Tecnologia, desenvolvimento web e automação.</li></ul>`],
      ['Objetivo editorial', r => `<p>O portal foi criado para oferecer explicações claras, exemplos práticos e caminhos de aplicação. Os conteúdos conectam <a href="${r}5s/">5S</a>, <a href="${r}produtividade/">produtividade</a> e <a href="${r}gestao-ambiental/">gestão ambiental</a> sem transformar técnicas em soluções universais.</p>`],
      ['Como os conteúdos são produzidos', () => `<p>Cada guia começa pela intenção de busca do leitor e por perguntas que aparecem no trabalho real. A experiência prática ajuda a escolher exemplos e alertas. Quando um tema depende de legislação, norma ou definição institucional, devem ser priorizadas fontes públicas e atuais. O texto diferencia orientação educativa de requisito aplicável.</p>`],
      ['Atualização e revisão', () => `<p>As páginas exibem data de atualização e são revisadas para melhorar clareza, corrigir links e acompanhar mudanças relevantes. Conteúdos ambientais podem ficar desatualizados quando leis, licenças ou normas mudam; por isso, o leitor deve confirmar requisitos vigentes antes de tomar decisões técnicas.</p>`],
      ['Transparência', () => `<p>O portal conduz leitores ao curso Produtividade 10X. Essa finalidade comercial não altera o compromisso de responder completamente às perguntas abordadas nos artigos. O conteúdo educativo permanece acessível sem compra.</p>`]
    ], related: [['Portal educacional', 'portal/'], ['Programa 5S', '5s/'], ['Gestão ambiental', 'gestao-ambiental/']]
  }
];

// Novos clusters vivem em um módulo separado para manter a expansão editorial
// independente das páginas históricas e reduzir o risco de regressão.
pages.push(...require('./portal-expansion.js'));

function rootPrefix(file) {
  return '../'.repeat(file.split('/').length - 1);
}

function esc(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function idFor(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function header(r, cluster) {
  const nav = [
    ['portal', 'Início', 'portal/'], ['mineracao', 'Mineração', 'mineracao/'], ['5s', '5S', '5s/'],
    ['produtividade', 'Produtividade', 'produtividade/'], ['gestao-ambiental', 'Meio Ambiente', 'gestao-ambiental/'],
    ['ferramentas', 'Ferramentas', 'ferramentas/'], ['sobre', 'Sobre', 'sobre/']
  ];
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a><header class="portal-header"><div class="portal-shell portal-header__inner"><a class="portal-brand" href="${r}portal/" aria-label="Portal 5S e Produtividade — início"><span class="portal-brand__mark" aria-hidden="true">5S</span><span class="portal-brand__text">Portal 5S e Produtividade<small>Conhecimento aplicado</small></span></a><button class="portal-menu-toggle" type="button" aria-label="Abrir menu" aria-controls="portal-nav" aria-expanded="false">☰</button><nav class="portal-nav" id="portal-nav" data-open="false" aria-label="Navegação principal"><ul>${nav.map(([key,label,url]) => `<li><a href="${r}${url}"${key === cluster ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}<li><a class="nav-cta" href="${checkout}" target="_blank" rel="noopener noreferrer">Conheça a Trilha 10X</a></li></ul></nav></div></header>`;
}

function breadcrumb(page, r) {
  const items = [['Início', 'portal/'], ...page.breadcrumb];
  return `<nav class="breadcrumb portal-shell" aria-label="Navegação estrutural"><ol>${items.map(([label,url], i) => `<li>${i === items.length - 1 ? `<span aria-current="page">${label}</span>` : `<a href="${r}${url}">${label}</a>`}</li>`).join('')}</ol></nav>`;
}

function schemas(page) {
  const pageUpdated = page.updated || updated;
  const crumbs = [['Início', 'portal/'], ...page.breadcrumb].map(([name,url], index) => ({'@type':'ListItem', position:index + 1, name, item:base + url}));
  const primary = page.kind === 'article' ? {
    '@type':'Article', headline:page.h1, description:page.description, author:{'@id':base+'sobre/#person'},
    datePublished:pageUpdated, dateModified:pageUpdated, mainEntityOfPage:{'@type':'WebPage','@id':base+page.slug}, isPartOf:{'@id':base+'#website'}, image:base+'assets/images/adonias-profile-400.jpg', inLanguage:'pt-BR'
  } : page.kind === 'about' ? {
    '@type':'ProfilePage', mainEntity:{'@id':base+'sobre/#person'}, isPartOf:{'@id':base+'#website'}, dateModified:pageUpdated, inLanguage:'pt-BR'
  } : {
    '@type':'CollectionPage', name:page.h1, description:page.description, url:base+page.slug, isPartOf:{'@id':base+'#website'}, dateModified:pageUpdated, inLanguage:'pt-BR'
  };
  const graph = [primary, {'@type':'BreadcrumbList', itemListElement:crumbs}];
  if (page.slug === 'portal/') graph.push(
    {'@type':'WebSite', '@id':base+'#website', name:'Produtividade 10X', alternateName:'Portal 5S e Produtividade', url:base, inLanguage:'pt-BR', publisher:{'@id':base+'sobre/#person'}},
    {'@type':'Person', '@id':base+'sobre/#person', name:author, jobTitle:'Técnico em Meio Ambiente', url:base+'sobre/', image:base+'assets/images/adonias-profile-400.jpg'}
  );
  if (page.kind === 'about') graph.push({'@type':'Person', '@id':base+'sobre/#person', name:author, jobTitle:'Técnico em Meio Ambiente', url:base+'sobre/', image:base+'assets/images/adonias-profile-400.jpg'});
  return JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<', '\\u003c');
}

function footer(r) {
  return `<footer class="portal-footer"><div class="portal-shell"><div class="portal-footer__grid"><div><h2>Portal 5S e Produtividade</h2><p>Conteúdo educacional sobre mineração, segurança, organização, produtividade e gestão ambiental.</p></div><div><h3>Conteúdos</h3><ul><li><a href="${r}mineracao/">Mineração e SSMA</a></li><li><a href="${r}carreira-mineracao/">Carreira na mineração</a></li><li><a href="${r}ferramentas/">Ferramentas gratuitas</a></li><li><a href="${r}5s/">5S</a></li><li><a href="${r}produtividade/">Produtividade</a></li><li><a href="${r}gestao-ambiental/">Gestão Ambiental</a></li></ul></div><div><h3>Transparência</h3><ul><li><a href="${r}sobre/">Sobre o autor</a></li><li><a href="${r}politica-editorial/">Política editorial</a></li><li><a href="mailto:adonias.joshua@gmail.com">Contato</a></li><li><a href="${checkout}" target="_blank" rel="noopener noreferrer">Conheça a Trilha 10X</a></li></ul></div></div><div class="portal-footer__bottom">Conteúdo revisado periodicamente · © <span data-year>2026</span> Adonias Pereira da Silva.</div></div></footer>`;
}

function whatsappContact(r) {
  return `<a class="whatsapp-contact" href="https://wa.me/5594992993138?text=Ol%C3%A1%2C%20Adonias!%20Vim%20do%20Portal%205S%20e%20Produtividade%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida." target="_blank" rel="noopener noreferrer" aria-label="Falar diretamente com Adonias pelo WhatsApp"><img src="${r}assets/icons/whatsapp.svg" width="26" height="26" loading="lazy" alt="" aria-hidden="true"><span class="whatsapp-contact__label">Fale com o autor</span></a>`;
}

function render(page) {
  const r = rootPrefix(page.file);
  const pageUpdated = page.updated || updated;
  const sectionHtml = page.sections.map(([title,body]) => `<section aria-labelledby="${idFor(title)}"><h2 id="${idFor(title)}">${title}</h2>${body(r)}</section>`).join('');
  const toc = `<aside class="toc" aria-label="Sumário"><strong>Neste conteúdo</strong><ol>${page.sections.map(([title]) => `<li><a href="#${idFor(title)}">${title}</a></li>`).join('')}</ol></aside>`;
  const related = `<section class="related-posts" aria-labelledby="relacionados"><h2 id="relacionados">Continue aprendendo</h2><ul class="related-links">${page.related.map(([label,url]) => `<li><a href="${r}${url}">${label} →</a></li>`).join('')}</ul></section>`;
  const authorBox = `<aside class="author-box" aria-label="Sobre o autor"><img src="${r}assets/images/adonias-profile-200.jpg" srcset="${r}assets/images/adonias-profile-400.jpg 2x" width="72" height="72" loading="lazy" decoding="async" alt="Adonias Pereira da Silva"><div><h2>Conteúdo por ${author}</h2><p>Técnico em Meio Ambiente, com atuação prática em grandes projetos de construção e mineração. Conteúdo sobre 5S, produtividade, meio ambiente e tecnologia aplicada. <a href="${r}sobre/">Conheça o autor e a política editorial</a>.</p></div></aside>`;
  const cta = `<aside class="cta-course" aria-labelledby="cta-curso"><h2 id="cta-curso">Conhecer os conceitos não basta quando a rotina continua travada</h2><p>Sem um método, foco, práticas ambientais e comunicação acabam separados. A Trilha 10X conecta os três temas em aulas diretas para ajudar você a transformar conhecimento em ação.</p><a class="button" href="${checkout}" target="_blank" rel="noopener noreferrer">Quero acessar a Trilha 10X por R$ 97</a></aside>`;
  const heroPanel = page.kind === 'hub' ? `<div class="hero-panel"><strong>Aprenda no seu ritmo</strong><p>Guias conectados, exemplos práticos e links para aprofundar cada tema.</p></div>` : '';
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${base}${page.slug}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:type" content="${page.kind === 'article' ? 'article' : 'website'}">
  <meta property="og:url" content="${base}${page.slug}">
  <meta property="og:image" content="${base}assets/images/adonias-profile-400.jpg">
  <meta property="og:locale" content="pt_BR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${base}assets/images/adonias-profile-400.jpg">
  <meta name="author" content="${author}">
  <link rel="icon" href="${r}assets/icons/5s.svg" type="image/svg+xml">
  <link rel="manifest" href="${r}manifest.webmanifest">
  <link rel="stylesheet" href="${r}assets/css/portal.css">
  <script type="application/ld+json">${schemas(page)}</script>
</head>
<body>
${header(r, page.cluster)}
${breadcrumb(page, r)}
<main id="conteudo">
  <header class="${page.kind === 'hub' ? 'portal-hero' : 'article-header'}"><div class="portal-shell${page.kind === 'hub' ? ' portal-hero__inner' : ''}"><div><p class="eyebrow">${page.kind === 'hub' ? 'Portal educacional' : 'Guia prático'}</p><h1>${page.h1}</h1><p class="${page.kind === 'hub' ? 'portal-hero__lead' : 'article-header__lead'}">${page.lead}</p>${page.kind === 'hub' ? `<div class="hero-actions">${page.cluster === 'portal' ? `<a class="button button--primary" href="${r}ferramentas/gestao-do-tempo/">Usar ferramenta grátis</a>` : ''}<a class="button ${page.cluster === 'portal' ? 'button--secondary' : 'button--primary'}" href="#${idFor(page.sections[0][0])}">Explorar conteúdos</a><a class="button button--secondary" href="${checkout}" target="_blank" rel="noopener noreferrer">Conheça a Trilha 10X</a></div>` : `<div class="article-meta"><span>Por ${author}</span><time datetime="${pageUpdated}">Atualizado em ${new Intl.DateTimeFormat('pt-BR', {dateStyle:'long', timeZone:'UTC'}).format(new Date(pageUpdated + 'T12:00:00Z'))}</time><span>Leitura educativa</span></div>`}</div>${heroPanel}</div></header>
  <div class="portal-shell article-layout">${toc}<article class="article">${sectionHtml}${cta}${authorBox}${related}</article></div>
</main>
${footer(r)}
${whatsappContact(r)}
<script src="${r}assets/js/portal.js" defer></script>
</body>
</html>
`;
}

for (const page of pages) {
  const target = path.join(root, ...page.file.split('/'));
  fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.writeFileSync(target, render(page), 'utf8');
}

const sitemapUrls = ['', ...pages.map(page => page.slug), 'ferramentas/gestao-do-tempo/'];
const pageBySlug = new Map(pages.map(page => [page.slug, page]));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(slug => `  <url><loc>${base}${slug}</loc><lastmod>${slug === 'ferramentas/gestao-do-tempo/' ? '2026-08-27' : (pageBySlug.get(slug)?.updated || updated)}</lastmod></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`, 'utf8');

console.log(`Portal gerado: ${pages.length} páginas e ${sitemapUrls.length} URLs no sitemap.`);
