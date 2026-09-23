(function (global) {
  'use strict';
  const fields = {
    goal: ['Qual é o principal objetivo?', [['google','Aparecer melhor no Google'],['profile','Melhorar o Perfil da Empresa'],['site','Criar ou melhorar o site'],['ads','Anunciar no Facebook ou Instagram'],['youtube','Organizar meu canal no YouTube'],['mentoria','Receber mentoria em SEO e tráfego pago'],['automation','Avaliar automação de atendimento'],['unknown','Ainda não sei por onde começar']]],
    business: ['Qual é o tipo de negócio?', [['commerce','Comércio ou loja'],['services','Prestação de serviços'],['food','Alimentação ou delivery'],['industry','Indústria, construção ou fornecimento'],['creator','Criação de conteúdo'],['other','Outro tipo de negócio']]],
    city: ['Onde você atende?', [['canaa','Canaã dos Carajás'],['region','Outra cidade da região'],['remote','Atendimento on-line ou outra região']]],
    profile: ['Como está o Perfil da Empresa no Google?', [['active','Ativo e com informações atualizadas'],['improve','Existe, mas precisa melhorar'],['suspended','Suspenso ou com problema de acesso'],['none','Ainda não tenho'],['unknown','Não sei']]],
    site: ['Como está o seu site?', [['active','Existe e apresenta bem o negócio'],['improve','Existe, mas precisa melhorar'],['none','Ainda não tenho'],['unknown','Não sei avaliar']]],
    channel: ['Como está o seu canal no YouTube?', [['active','Publico e quero otimizar o canal'],['improve','Tenho um canal, mas está desorganizado'],['none','Quero estruturar o primeiro canal']]],
    experience: ['Qual orientação você procura?', [['start','Entender por onde começar'],['execute','Organizar um plano para executar'],['review','Revisar ações e métricas que já acompanho']]],
    ads: ['Você já anuncia?', [['yes','Já anuncio e quero revisar'],['no','Quero começar'],['unknown','Já houve anúncios, mas não acompanho']]],
    budget: ['O investimento de mídia já está definido?', [['defined','Tenho um limite mensal para avaliar na conversa'],['planning','Preciso planejar o investimento'],['unknown','Ainda não sei quanto posso investir']]],
    readiness: ['Oferta e atendimento estão organizados?', [['ready','Sim, sei o que oferecer e consigo responder aos contatos'],['improve','Ainda preciso organizar oferta ou atendimento'],['unknown','Preciso de ajuda para avaliar']]],
    contact: ['Como chegam os contatos hoje?', [['whatsapp','Principalmente WhatsApp'],['social','Redes sociais'],['phone','Telefone ou presencialmente'],['site','Pelo site'],['unknown','Ainda não acompanho']]],
    urgency: ['Quando você pretende trabalhar nisso?', [['now','Quero avaliar os próximos passos agora'],['planning','Estou planejando para mais adiante'],['research','Estou apenas pesquisando']]]
  };
  const routes = {seo:'seo-local-canaa-dos-carajas/',google:'otimizacao-google-meu-negocio-canaa/',meta:'meta-ads-negocios-locais-canaa/',youtube:'otimizacao-canal-youtube/',mentoria:'mentoria-seo-trafego-pago/',sites:'servicos-digitais/#sites',hub:'servicos-digitais/'};
  function steps(a) {
    const result = ['goal','business','city'];
    if (a.goal === 'youtube') result.push('channel');
    else if (a.goal === 'mentoria') result.push('experience');
    else if (a.goal !== 'automation') {
      result.push('profile','site');
      if (a.goal === 'ads') result.push('ads','budget');
      result.push('readiness');
    }
    return result.concat('contact','urgency');
  }
  function recommend(a) {
    let r;
    if (a.profile === 'suspended' && steps(a).includes('profile')) r = ['review','Avaliar a situação do perfil','O primeiro passo é entender o problema de acesso ou suspensão. Não altere informações para tentar contornar a situação. A avaliação não garante reativação.','google'];
    else if (a.goal === 'youtube') r = ['youtube','Organização do canal no YouTube','Seu objetivo pede uma avaliação do canal, do público e dos vídeos. A otimização começa pelo conteúdo disponível e pelas prioridades do projeto.','youtube'];
    else if (a.goal === 'mentoria') r = ['mentoria','Orientação por mentoria','Uma conversa de orientação pode ajudar a definir prioridades e responsabilidades. Formato, temas e encontros precisam ser combinados antes da contratação.','mentoria'];
    else if (a.goal === 'automation') r = ['future','Avaliar a necessidade de atendimento','Vamos entender o processo antes de escolher uma automação. Essa possibilidade depende de avaliação e não representa uma oferta de implementação já definida.','hub'];
    else if (a.goal === 'unknown' || a.profile === 'unknown' || a.site === 'unknown' || a.readiness === 'unknown') r = ['unknown','Avaliação inicial','Há informações que precisam ser conferidas antes de recomendar uma implementação. O próximo passo é entender a situação real do negócio.','hub'];
    else if ((a.goal === 'site' && a.site === 'none') || ((a.goal === 'google' || a.goal === 'profile') && a.profile === 'none') || (a.site === 'none' && a.profile === 'none')) r = ['foundation','Fundação local','Organize os canais básicos necessários ao seu objetivo. A necessidade e a elegibilidade de cada canal serão avaliadas antes de criar contas ou páginas. ',a.goal === 'site' ? 'sites' : 'seo'];
    else if (a.profile === 'improve' || a.site === 'improve' || a.readiness === 'improve') r = ['optimization','Otimização','Há pontos da presença digital ou do atendimento a revisar. Corrigir essas dificuldades pode ser mais adequado antes de ampliar a divulgação.',a.goal==='site'?'sites':a.goal==='profile'?'google':'seo'];
    else if (a.goal === 'ads' && a.readiness === 'ready' && a.budget === 'defined') r = ['acceleration','Avaliar aceleração com Meta Ads','Você declarou oferta, atendimento e limite de mídia definidos. Isso permite avaliar uma campanha; rastreamento, materiais e viabilidade ainda precisam ser conferidos.','meta'];
    else if (a.goal === 'ads') r = ['unknown','Planejar antes de anunciar','Defina o investimento, a oferta e a forma de acompanhar os contatos antes de iniciar a campanha. Uma conversa pode ajudar a organizar essa decisão.','meta'];
    else r = ['growth','Crescimento com prioridades','A base declarada permite discutir conteúdo e aquisição. Precisamos confirmar como os canais funcionam e quais ações combinam com seu objetivo.',a.goal==='site'?'sites':a.goal==='profile'?'google':'seo'];
    return {id:r[0],title:r[1],description:r[2],service:r[3],route:routes[r[3]],region:a.city !== 'canaa' ? 'O atendimento à sua região será avaliado na conversa. Não estamos indicando uma unidade local.' : ''};
  }
  const api = {fields,steps,recommend};
  if (typeof module !== 'undefined' && module.exports) module.exports=api;
  if (!global.document) return;
  const host=document.getElementById('zd-diagnostic');
  if (!host) return;
  const answers={}; let index=0,started=false,completed=false;
  const emit=(name,extra)=>global.ZadoniEvents?.emit(name,extra);
  const element=(tag,attrs={},text='')=>{const node=document.createElement(tag);for(const [key,value]of Object.entries(attrs))node.setAttribute(key,value);if(text)node.textContent=text;return node;};
  function render(focus=true) {
    const list=steps(answers), key=list[index], [question,options]=fields[key];
    host.replaceChildren();
    const form=element('form',{'novalidate':''});
    form.append(element('div',{'class':'zd-step-meta'},`Etapa ${index+1} de ${list.length}`));
    const progress=element('progress',{max:list.length,value:index,'aria-label':'Progresso do diagnóstico'});form.append(progress);
    const fieldset=element('fieldset'),legend=element('legend',{tabindex:'-1'},question),choices=element('div',{'class':'zd-options'});
    fieldset.append(legend);
    for(const [value,label]of options){const wrapper=element('label',{'class':'zd-choice'});const input=element('input',{type:'radio',name:key,value,required:'','aria-describedby':'zd-error'});input.checked=answers[key]===value;wrapper.append(input,element('span',{},label));choices.append(wrapper);}
    fieldset.append(choices);form.append(fieldset);
    const error=element('p',{id:'zd-error','class':'zd-error','aria-live':'polite'});form.append(error);
    const controls=element('div',{'class':'zd-actions'});
    if(index){const back=element('button',{type:'button','class':'zd-button zd-button--outline'},'Voltar');back.addEventListener('click',()=>{index--;render();});controls.append(back);}
    controls.append(element('button',{type:'submit','class':'zd-button'},index===list.length-1?'Ver minha orientação':'Continuar'));
    form.append(controls);host.append(form);
    form.addEventListener('change',()=>{error.textContent='';if(!started){started=true;emit('diagnostic_start');}});
    form.addEventListener('submit',event=>{event.preventDefault();const selected=form.querySelector('input:checked');if(!selected){error.textContent='Escolha uma opção para continuar.';form.querySelector('input').focus();return;}
      const old=answers[key];answers[key]=selected.value;
      // Trocar objetivo descarta respostas de ramos antigos, inclusive uma suspensão anterior.
      if(key==='goal'&&old&&old!==answers[key]) for(const k of Object.keys(answers)) if(k!=='goal') delete answers[k];
      if(!started){started=true;emit('diagnostic_start');}
      if(index===steps(answers).length-1)showResult();else{index++;render();}
    });
    if(focus)legend.focus();
  }
  function showResult() {
    const result=recommend(answers);
    if(!completed){completed=true;emit('diagnostic_complete',{recommendation_id:result.id});}
    host.replaceChildren();const box=element('section',{'class':'zd-result','aria-labelledby':'zd-result-title'});
    const title=element('h3',{id:'zd-result-title',tabindex:'-1'},result.title);box.append(element('p',{'class':'zd-eyebrow'},'Sua orientação preliminar'),title,element('p',{},result.description));
    if(result.region)box.append(element('p',{},result.region));
    box.append(element('p',{},'Esta orientação usa apenas suas respostas e não substitui uma auditoria. Não há garantia de posições, contatos ou vendas.'));
    const service=element('a',{href:'../'+result.route,'data-event':'recommendation_click','data-recommendation':result.id},'Conhecer o serviço indicado →');box.append(service);
    const summary=['Diagnóstico inicial — Zadoni Digital',...steps(answers).map(key=>`${fields[key][0]} ${fields[key][1].find(([v])=>v===answers[key])?.[1]||'Não informado'}`),'Orientação: '+result.title,'Resultado preliminar; depende de avaliação.'].join('\n');
    box.append(element('label',{for:'zd-summary'},'Seu resumo, para copiar se quiser'));
    const area=element('textarea',{id:'zd-summary',readonly:'',rows:'9'});area.value=summary;box.append(area);
    const status=element('p',{'role':'status','class':'zd-small'});
    const controls=element('div',{'class':'zd-actions'}),copy=element('button',{type:'button','class':'zd-button zd-button--outline'},'Copiar resumo');
    copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary);status.textContent='Resumo copiado. Você decide se deseja enviá-lo na conversa.';}catch{area.focus();area.select();status.textContent='Selecione e copie o texto do resumo manualmente.';}});
    const whatsapp=element('a',{'class':'zd-button',href:'https://wa.me/5594992993138?text='+encodeURIComponent('Olá, Adonias! Concluí o diagnóstico inicial da Zadoni Digital e gostaria de conversar sobre os serviços.'),target:'_blank',rel:'noopener noreferrer','data-event':'whatsapp_click','data-placement':'result'},'Conversar no WhatsApp');
    controls.append(copy,whatsapp);box.append(controls,status,element('p',{'class':'zd-small'},'O link abre uma mensagem genérica. O resumo não é enviado automaticamente. Se o aplicativo não abrir, adicione o contato +55 94 99299-3138.'));
    const restart=element('button',{type:'button','class':'zd-button zd-button--outline'},'Refazer diagnóstico');restart.addEventListener('click',()=>{for(const k of Object.keys(answers))delete answers[k];index=0;started=false;completed=false;render();});box.append(restart);host.append(box);title.focus();
  }
  render(false);
})(typeof window==='undefined'?globalThis:window);
