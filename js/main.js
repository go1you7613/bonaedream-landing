(() => {
  const root = document.querySelector('.bnd-wrap');
  if (!root) return;

  const switchCatTab = (button, target) => {
    root.querySelectorAll('.cat-tab').forEach((tab) => tab.classList.remove('active'));
    root.querySelectorAll('.category-tab-panel').forEach((panel) => panel.classList.remove('active'));
    button.classList.add('active');
    const panel = root.querySelector('#bnd-tab-' + target);
    if (panel) panel.classList.add('active');
  };

  root.querySelectorAll('.cat-tab').forEach((button) => {
    button.addEventListener('click', () => switchCatTab(button, button.dataset.tab));
  });

  const toggleFaq = (button) => {
    const item = button.closest('.faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('open');
    root.querySelectorAll('.faq-item.open').forEach((faq) => faq.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  };

  root.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => toggleFaq(button));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  root.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

  root.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const selector = anchor.getAttribute('href');
      if (!selector || selector === '#') {
        event.preventDefault();
        return;
      }
      const target = root.querySelector(selector);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
