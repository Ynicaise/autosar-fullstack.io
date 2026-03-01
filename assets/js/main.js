/* ============================================================
   autosar-fullstack.dev — Vanilla JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* --- Mobile Nav Toggle ---------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  /* --- Active nav link highlight --------------------------- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\.\.?\/?/, ''))) {
      link.classList.add('active');
    }
  });

  /* --- Smooth scroll for anchor links ---------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Sidebar active section tracking --------------------- */
  const sidebarLinks = document.querySelectorAll('.sidebar-links a[href^="#"]');
  if (sidebarLinks.length > 0) {
    const headings = [];
    sidebarLinks.forEach(link => {
      const id = link.getAttribute('href').slice(1);
      const heading = document.getElementById(id);
      if (heading) headings.push({ el: heading, link });
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            const match = headings.find(h => h.el === entry.target);
            if (match) match.link.classList.add('active');
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    headings.forEach(h => observer.observe(h.el));
  }

  /* --- Copy code blocks ------------------------------------ */
  document.querySelectorAll('pre').forEach(block => {
    const btn = document.createElement('button');
    const lang = () => document.documentElement.lang || 'fr';
    btn.textContent = lang() === 'fr' ? 'Copier' : 'Copy';
    btn.className = 'copy-btn';
    btn.style.cssText =
      'position:absolute;top:8px;right:8px;background:var(--bg-secondary);border:1px solid var(--border);color:var(--text-secondary);font-size:.7rem;padding:2px 8px;border-radius:4px;cursor:pointer;opacity:0;transition:.2s';
    block.style.position = 'relative';
    block.appendChild(btn);

    // Update button text when language changes
    const observer = new MutationObserver(() => {
      if (btn.textContent !== '✓') btn.textContent = lang() === 'fr' ? 'Copier' : 'Copy';
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    block.addEventListener('mouseenter', () => (btn.style.opacity = '1'));
    block.addEventListener('mouseleave', () => (btn.style.opacity = '0'));

    btn.addEventListener('click', () => {
      const code = block.querySelector('code')
        ? block.querySelector('code').textContent
        : block.textContent;
      navigator.clipboard.writeText(code).then(() => {
        const copiedText = lang() === 'fr' ? 'Copié !' : 'Copied!';
        btn.textContent = copiedText;
        setTimeout(() => (btn.textContent = lang() === 'fr' ? 'Copier' : 'Copy'), 1500);
      });
    });
  });
});
