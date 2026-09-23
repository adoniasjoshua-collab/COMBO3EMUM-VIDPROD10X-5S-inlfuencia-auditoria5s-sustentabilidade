// Menu de navegação da home: melhoria progressiva, independente do menu antigo do curso.
(() => {
  const toggle = document.querySelector('.home-menu-toggle');
  const nav = document.querySelector('.home-main-nav');
  if (!toggle || !nav) return;
  document.body.setAttribute('data-home-menu-ready', '');
  function close(restoreFocus = false) {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('is-open')) close(true); });
  document.addEventListener('click', event => { if (!event.target.closest('.home-header')) close(); });
  window.matchMedia('(min-width:1101px)').addEventListener('change', () => close());
})();
