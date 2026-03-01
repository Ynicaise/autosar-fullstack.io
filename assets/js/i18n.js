/* ============================================================
   autosar-fullstack.dev — Internationalization (FR / EN)
   French is the default language.
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'autosar-lang';
  const DEFAULT_LANG = 'fr';
  const SUPPORTED = ['fr', 'en'];

  /** Get stored language or default */
  function getSavedLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) { /* localStorage may be unavailable */ }
    return DEFAULT_LANG;
  }

  /** Apply language to the document */
  function applyLang(lang) {
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}

    // Update all toggle buttons
    document.querySelectorAll('.lang-switch').forEach(btn => {
      const frLabel = btn.querySelector('.lang-label-fr');
      const enLabel = btn.querySelector('.lang-label-en');
      if (frLabel) frLabel.classList.toggle('active', lang === 'fr');
      if (enLabel) enLabel.classList.toggle('active', lang === 'en');
    });
  }

  /** Toggle between FR and EN */
  function toggleLang() {
    const current = document.documentElement.lang || DEFAULT_LANG;
    const next = current === 'fr' ? 'en' : 'fr';
    applyLang(next);
  }

  /* --- Initialise on DOM ready ----------------------------- */

  // Set lang ASAP (before DOMContentLoaded) to avoid FOUC
  document.documentElement.lang = getSavedLang();

  document.addEventListener('DOMContentLoaded', function () {
    // Apply to toggle buttons
    applyLang(getSavedLang());

    // Bind click handler on all .lang-switch buttons
    document.querySelectorAll('.lang-switch').forEach(function (btn) {
      btn.addEventListener('click', toggleLang);
    });
  });
})();
