// Combo Produtividade 10X — Base Script
// - Pure JavaScript only
// - DOMContentLoaded bootstrapping
// - Placeholder functions for future features

document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Content updated: Combo Produtividade 10X loaded successfully.');
    console.log('Header + Hero Section loaded successfully.');
    console.log('Courses section loaded successfully.');
    console.log('Methodology section (AI voice description) loaded successfully.');
    console.log('Testimonials section loaded successfully.');
    console.log('Offer section initialized successfully.');

    // Preload critical assets (fallback for browsers not supporting link rel=preload)
    preloadCriticalAssets();

    // Set dynamic year in footer, if element exists
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

    // Initialize section behaviors (placeholders)
    initHeroSection();
    handleNavScroll();
    initMobileMenu();
    initCtaSmoothScroll();
    setupAnimations();
    initCoursesSection();
    initTestimonialsSection();
    enhanceTestimonialsAvatars();
    initOfferSection();
    initQuizSection();
    initAIAssistant();
    enhanceMethodology();
    initWhatsappHint();
    initCookieBanner();

    // Validate and log all links for debugging
    validateLinks();
  } catch (err) {
    // Ensure no unhandled errors break the page in early scaffolding
    console.error('Initialization error (scaffold):', err);
  }
});

function initHeroSection() {
  // Placeholder: attach hero-specific interactions
  // Example: could lazy-load assets or cycle headlines later
}

function handleNavScroll() {
  // Header background toggles after scrolling 80px
  const header = document.querySelector('.navbar');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function setupAnimations() {
  // Global intersection observer to reveal elements on scroll
  const toReveal = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || !toReveal.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  toReveal.forEach((el) => io.observe(el));
}

// Quiz: placeholder logic and hooks
function initQuizSection() {
  // Quizzes são apresentados ao longo das aulas. Nenhum disparador interativo na landing page.
  console.log('Quizzes: serão indicados durante as aulas para consolidar o conhecimento.');
}

// AI Assistant: placeholder trigger
function initAIAssistant() {
  const askBtn = document.querySelector('[data-action="ask-ai"]');
  if (askBtn) {
    askBtn.addEventListener('click', triggerAIAssistant);
  }
}

function triggerAIAssistant() {
  // Placeholder: open a modal or side panel to interact with AI
  console.log('Assistente de IA acionado: pronto para responder dúvidas.');
}

// Preload critical images for better LCP
function preloadCriticalAssets() {
  const urls = [
    './assets/images/hero-bg.svg',
    './assets/images/logo10x.png',
  ];
  urls.forEach((url) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const burger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  const backdrop = document.querySelector('.menu-backdrop');
  if (!burger || !nav) return;
  const closeMenu = () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };
  const toggleMenu = () => {
    const isOpen = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('menu-open', isOpen);
  };
  burger.addEventListener('click', toggleMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  // Close on nav link click (mobile)
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  // Close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}

// Smooth scroll specifically for CTA buttons
function initCtaSmoothScroll() {
  const anchors = document.querySelectorAll('.cta-btn, .nav-links a, .cta-button');
  if (!anchors.length) return;
  anchors.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// Courses-specific hooks (reserved for future behaviors)
function initCoursesSection() {
  const section = document.getElementById('cursos');
  if (!section) return;
  // Additional behaviors could go here (e.g., lazy-loading icons)
}

// Offer: countdown timer (48h from load) with glow near the end
function initOfferSection() {
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;
  // Set 48h countdown from page load
  const endTime = Date.now() + 48 * 60 * 60 * 1000;
  const countdown = setInterval(() => {
    const now = Date.now();
    const distance = endTime - now;
    if (distance <= 0) {
      clearInterval(countdown);
      timerEl.textContent = 'Oferta encerrada!';
      timerEl.classList.remove('ending');
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timerEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (distance <= 5000) timerEl.classList.add('ending'); else timerEl.classList.remove('ending');
  }, 1000);
}

// Add fallback avatars for testimonials
function enhanceTestimonialsAvatars() {
  const profiles = document.querySelectorAll('.testimonial-card .profile');
  profiles.forEach((img) => {
    // graceful fallback to default avatar if final image fails
    img.addEventListener('error', () => {
      img.onerror = null;
      img.src = './assets/img/avatar-default.svg';
    }, { once: true });

    // try to swap to a real photo if present in assets/testimonials
    const slug = img.getAttribute('data-photo');
    if (!slug) return;
    const candidates = [
      `./assets/testimonials/${slug}.jpg`,
      `./assets/testimonials/${slug}.jpeg`,
      `./assets/testimonials/${slug}.png`,
    ];
    for (const url of candidates) {
      const test = new Image();
      test.onload = () => { img.src = url; };
      test.onerror = () => {};
      test.src = url;
    }
  });
}

// Enhance methodology section into labeled blocks
function enhanceMethodology() {
  const section = document.querySelector('#metodologia .method-content');
  if (!section) return;
  const title = section.querySelector('h2');
  if (!title) return;
  const blocks = [
    { icon: '🎥', title: 'Aulas rápidas', text: 'Vídeo aulas curtas de 5 a 10 minutos, leves e diretas ao ponto, com exemplos práticos.' },
    { icon: '🤖', title: 'Voz de IA', text: 'Narração dinâmica com Inteligência Artificial, facilitando aprendizado visual e auditivo.' },
    { icon: '⏱️', title: 'Resultados rápidos', text: 'Quizzes curtos, exercícios guiados e acesso vitalício para ganhar ritmo e consolidar o conhecimento.' },
  ];
  blocks.forEach(({ icon, title: t, text }) => {
    const wrap = document.createElement('div');
    wrap.className = 'method-block';
    const h3 = document.createElement('h3');
    h3.textContent = `${icon} ${t}`;
    const p = document.createElement('p');
    p.textContent = text;
    wrap.appendChild(h3);
    wrap.appendChild(p);
    section.appendChild(wrap);
  });
}

// Link validation for debugging and QA
function validateLinks() {
  const links = document.querySelectorAll('a');
  let missing = 0;
  links.forEach((link) => {
    const text = (link.textContent || link.getAttribute('aria-label') || '').trim();
    const href = link.getAttribute('href');
    if (!href || href.trim() === '') {
      console.warn(`Missing href on link: ${text}`);
      missing++;
    } else {
      console.log(`✅ Verified: ${text} → ${link.href}`);
    }
  });
  if (missing > 0) {
    alert(`Atenção: ${missing} link(s) sem href encontrado(s).`);
  } else {
    console.log('🔗 All CTA links validated successfully.');
  }
}

// Testimonials carousel
function initTestimonialsSection() {
  const carousel = document.querySelector('.testimonials-carousel');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const dots = Array.from(document.querySelectorAll('.carousel-dots .dot'));
  if (!carousel) return;

  let stride = 350; // default fallback stride
  const slides = Array.from(carousel.querySelectorAll('.testimonial-card'));
  if (slides.length > 1) {
    stride = slides[1].offsetLeft - slides[0].offsetLeft;
  } else if (slides.length === 1) {
    stride = slides[0].getBoundingClientRect().width;
  }

  let autoTimer = setInterval(() => autoScroll(1), 5000);

  function autoScroll(direction = 1) {
    carousel.scrollBy({ left: stride * direction, behavior: 'smooth' });
    updateDotsOnScrollDebounced();
  }

  function pauseAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
  function resumeAuto() { if (!autoTimer) { autoTimer = setInterval(() => autoScroll(1), 5000); } }

  function scrollToIndex(index) {
    if (index < 0 || index >= slides.length) return;
    const left = slides[index].offsetLeft - carousel.offsetLeft;
    carousel.scrollTo({ left, behavior: 'smooth' });
  }

  function currentIndex() {
    let idx = 0; let minDelta = Infinity; const scrollLeft = carousel.scrollLeft;
    slides.forEach((s, i) => { const delta = Math.abs(s.offsetLeft - scrollLeft); if (delta < minDelta) { minDelta = delta; idx = i; } });
    return idx;
  }

  function updateDots(index) {
    dots.forEach((d, i) => {
      const active = i === index;
      d.setAttribute('aria-selected', active ? 'true' : 'false');
      d.tabIndex = active ? 0 : -1;
    });
  }

  let dotDebounce;
  function updateDotsOnScrollDebounced() {
    clearTimeout(dotDebounce);
    dotDebounce = setTimeout(() => updateDots(currentIndex()), 200);
  }

  // Events
  if (prevBtn) prevBtn.addEventListener('click', () => { pauseAuto(); autoScroll(-1); resumeAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { pauseAuto(); autoScroll(1); resumeAuto(); });
  if (dots.length) dots.forEach((d, i) => d.addEventListener('click', () => { pauseAuto(); scrollToIndex(i); updateDots(i); resumeAuto(); }));

  carousel.addEventListener('mouseenter', pauseAuto);
  carousel.addEventListener('mouseleave', resumeAuto);
  carousel.addEventListener('scroll', updateDotsOnScrollDebounced, { passive: true });

  // Keyboard accessibility for arrows
  [prevBtn, nextBtn].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  // Initialize dots based on starting position
  updateDots(currentIndex());
}

// Show WhatsApp helper tooltip briefly on load (once per session)
function initWhatsappHint() {
  try {
    if (sessionStorage.getItem('whatsTipShown')) return;
    const tip = document.getElementById('whatsTip');
    if (!tip) return;
    tip.classList.add('show');
    setTimeout(() => { tip.classList.remove('show'); sessionStorage.setItem('whatsTipShown', '1'); }, 4500);
  } catch (_) {}
}
// Cookie consent banner (simple accept)
function initCookieBanner() {
  try {
    const banner = document.getElementById('cookieBanner');
    const accept = document.getElementById('cookieAccept');
    if (!banner || !accept) return;
    const key = 'cookieConsent';
    const hasConsent = localStorage.getItem(key) === 'accepted';
    if (!hasConsent) {
      // slight delay to avoid competing with initial animations
      setTimeout(() => banner.classList.add('show'), 600);
    }
    const agree = () => { localStorage.setItem(key, 'accepted'); banner.classList.remove('show'); };
    accept.addEventListener('click', agree);
    accept.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); agree(); } });
  } catch (_) {}
}
