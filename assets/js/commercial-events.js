/* Eventos sanitizados. Destino desativado até integração e consentimento explícitos. */
(() => {
  'use strict';
  const names = new Set(['service_view', 'diagnostic_start', 'diagnostic_complete', 'recommendation_click', 'whatsapp_click', 'phone_click', 'email_click']);
  const services = new Set(['hub', 'diagnostic', 'seo', 'google', 'meta', 'youtube', 'mentoria', 'sites']);
  const placements = new Set(['hero', 'sites', 'contact', 'final', 'floating', 'result']);
  const recommendations = new Set(['review', 'youtube', 'mentoria', 'unknown', 'foundation', 'optimization', 'growth', 'acceleration', 'future']);
  let consent = false;
  let sink = null;
  function emit(name, fields = {}) {
    if (!names.has(name)) return;
    const page = location.pathname.replace(/index\.html$/, '');
    const payload = { page_path: page, service_id: services.has(document.body.dataset.service) ? document.body.dataset.service : 'hub' };
    if (placements.has(fields.placement)) payload.placement = fields.placement;
    if (recommendations.has(fields.recommendation_id)) payload.recommendation_id = fields.recommendation_id;
    if (name.startsWith('diagnostic_')) payload.flow_version = '1';
    // Sem fila, localStorage, URL completa, referrer, respostas ou envio retroativo.
    if (consent && typeof sink === 'function') { try { sink(name, Object.freeze(payload)); } catch (_) { /* Analytics não interrompe o contato. */ } }
  }
  window.ZadoniEvents = Object.freeze({ emit, configure(fn) { sink = typeof fn === 'function' ? fn : null; }, setConsent(value) { consent = value === true; } });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-event]');
    if (link) emit(link.dataset.event, {placement:link.dataset.placement, recommendation_id:link.dataset.recommendation});
  });
  if (document.body.dataset.kind !== 'article' && document.body.dataset.service !== 'diagnostic') emit('service_view');
})();
