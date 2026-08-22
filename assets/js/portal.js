(() => {
  const button = document.querySelector('.portal-menu-toggle');
  const nav = document.querySelector('.portal-nav');
  if (button && nav) {
    const close = () => {
      nav.dataset.open = 'false';
      button.setAttribute('aria-expanded', 'false');
    };
    button.addEventListener('click', () => {
      const open = nav.dataset.open !== 'true';
      nav.dataset.open = String(open);
      button.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
})();
