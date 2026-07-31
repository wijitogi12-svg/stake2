(function () {
  const nav = document.querySelector('[data-nav-links]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const backTop = document.querySelector('[data-back-top]');
  const faqButtons = document.querySelectorAll('[data-faq-button]');
  const newsletterForms = document.querySelectorAll('[data-newsletter-form]');
  const navHeight = () => {
    const siteNav = document.querySelector('.site-nav');
    return siteNav ? Math.round(siteNav.getBoundingClientRect().height + 18) : 96;
  };

  const closeMenu = () => {
    if (nav) nav.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      closeMenu();
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight();
      window.history.pushState(null, '', href);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  if (window.location.hash) {
    window.setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight();
      window.scrollTo({ top, behavior: 'smooth' });
    }, 120);
  }

  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const answer = button.parentElement.querySelector('[data-faq-answer]');
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.hidden = expanded;
      const symbol = button.querySelector('[data-faq-symbol]');
      if (symbol) symbol.textContent = expanded ? '+' : '−';
    });
  });

  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const message = form.parentElement.querySelector('[data-newsletter-message]');
      if (!message || !input) return;
      if (!input.value.trim()) {
        message.textContent = 'Please add an email so Everstakes can schedule your digest.';
        return;
      }
      message.textContent = 'Thanks — the weekly staking digest is queued for ' + input.value.trim() + '.';
      form.reset();
    });
  });

  const markActiveLinks = () => {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-links] a, footer a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href === current || href === './' + current) {
        link.setAttribute('aria-current', 'page');
      }
    });
  };
  markActiveLinks();

  const onScroll = () => {
    if (!backTop) return;
    backTop.classList.toggle('visible', window.scrollY > 360);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const yearNode = document.querySelector('[data-current-year]');
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  document.addEventListener('click', (event) => {
    if (!nav || !toggle) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });
})();
