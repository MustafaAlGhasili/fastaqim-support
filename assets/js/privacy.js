/**
 * ============================================================================
 * Fastaqim (فاستقم) Support Website - Privacy Policy Script
 * ============================================================================
 * Handles bilingual switching (Arabic RTL / English LTR),
 * dynamic Table of Contents (TOC) scroll-spy, and email copying.
 */

const PRIVACY_CONFIG = {
  SUPPORT_EMAIL: 'alghasili.mustafa@gmail.com',
  DEFAULT_LANG: 'ar'
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initPrivacyScrollSpy();
  initCopyButtons();
  initDynamicYear();
  initMobileNav();
});

/**
 * Initializes bilingual language switching between Arabic (RTL) and English (LTR)
 */
function initLanguageSwitcher() {
  const arBtns = document.querySelectorAll('[data-lang-btn="ar"]');
  const enBtns = document.querySelectorAll('[data-lang-btn="en"]');
  const htmlEl = document.documentElement;

  // Determine initial language: URL parameter, hash, saved preference, or default
  const urlParams = new URLSearchParams(window.location.search);
  const paramLang = urlParams.get('lang');
  const hashLang = window.location.hash === '#en' ? 'en' : (window.location.hash === '#ar' ? 'ar' : null);
  const savedLang = localStorage.getItem('fastaqim_privacy_lang');
  
  const activeLang = paramLang || hashLang || savedLang || PRIVACY_CONFIG.DEFAULT_LANG;
  setLanguage(activeLang, false);

  arBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage('ar', true);
    });
  });

  enBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage('en', true);
    });
  });

  function setLanguage(lang, persist = true) {
    const isEnglish = lang === 'en';
    const targetLang = isEnglish ? 'en' : 'ar';
    const targetDir = isEnglish ? 'ltr' : 'rtl';

    htmlEl.setAttribute('lang', targetLang);
    htmlEl.setAttribute('dir', targetDir);

    // Update active button state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang-btn') === targetLang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Update document title
    if (isEnglish) {
      document.title = 'Fastaqim | Privacy Policy (سياسة الخصوصية)';
    } else {
      document.title = 'فاستقم | سياسة الخصوصية (Fastaqim Privacy Policy)';
    }

    if (persist) {
      try {
        localStorage.setItem('fastaqim_privacy_lang', targetLang);
      } catch (_) {}

      // Update URL search param cleanly without reload
      const url = new URL(window.location.href);
      if (targetLang === 'en') {
        url.searchParams.set('lang', 'en');
      } else {
        url.searchParams.delete('lang');
      }
      window.history.replaceState({}, '', url.toString());
    }

    // Refresh scroll spy
    setTimeout(updateActiveTocItem, 100);
  }
}

/**
 * Tracks scrolling position and activates corresponding TOC navigation item
 */
function initPrivacyScrollSpy() {
  window.addEventListener('scroll', throttle(updateActiveTocItem, 80));
  updateActiveTocItem();
}

function updateActiveTocItem() {
  const isEn = document.documentElement.getAttribute('lang') === 'en';
  const prefix = isEn ? 'en-' : 'ar-';
  const links = document.querySelectorAll(`.policy-toc-link[data-toc-lang="${isEn ? 'en' : 'ar'}"]`);
  if (!links.length) return;

  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const headerOffset = 160;

  let currentId = '';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const targetEl = document.querySelector(href);
    if (!targetEl) return;

    const top = targetEl.offsetTop - headerOffset;
    const height = targetEl.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      currentId = href;
    }
  });

  if (!currentId && links.length > 0 && scrollY < 300) {
    currentId = links[0].getAttribute('href');
  }

  links.forEach(link => {
    if (link.getAttribute('href') === currentId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Copy email button handler
 */
function initCopyButtons() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = PRIVACY_CONFIG.SUPPORT_EMAIL;
    const originalText = copyBtn.querySelector('span')?.textContent || '';
    const isEn = document.documentElement.getAttribute('lang') === 'en';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      copyBtn.classList.add('copied');
      const span = copyBtn.querySelector('span');
      if (span) span.textContent = isEn ? 'Copied!' : 'تم النسخ!';

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        if (span) span.textContent = isEn ? 'Copy Email' : 'نسخ البريد';
      }, 2500);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  });
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking any nav link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
    });
  });
}

/**
 * Inserts current year in footer copyright
 */
function initDynamicYear() {
  const yearEls = document.querySelectorAll('#current-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = String(year));
}

/**
 * Simple throttle utility
 */
function throttle(func, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
