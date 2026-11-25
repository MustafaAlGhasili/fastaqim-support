/**
 * ============================================================================
 * Fastaqim (فاستقم) Support Website - Application Script
 * ============================================================================
 * 
 * IMPORTANT CONFIGURATION:
 * Official support email: support.fastaqim@gmail.com
 */

const CONFIG = {
  // Support email configured for Fastaqim
  SUPPORT_EMAIL: 'support.fastaqim@gmail.com',

  // Bug report email subject
  BUG_REPORT_SUBJECT: '[فاستقم] إبلاغ عن مشكلة فنية',

  // Bug report email template body
  BUG_REPORT_TEMPLATE: `السلام عليكم ورحمة الله وبركاته،

أود الإبلاغ عن مشكلة في تطبيق فاستقم:

1. نوع الجهاز (Device Model): 
   [مثال: iPhone 15 Pro / iPad Air]

2. إصدار نظام التشغيل (OS Version): 
   [مثال: iOS 17.5 / iOS 18]

3. إصدار تطبيق فاستقم (App Version): 
   [مثال: 1.1.0]

4. وصف المشكلة بالتفصيل (Issue Description): 
   [اكتب هنا ما الذي حدث بالتحديد]

5. خطوات إعادة ظهور المشكلة (Steps to Reproduce): 
   1. 
   2. 
   3. 

6. ملاحظات إضافية أو صور توضيحية:
   [يمكنك إرفاق لقطة شاشة أو فيديو يوضح المشكلة]

شكراً لكم.`
};

document.addEventListener('DOMContentLoaded', () => {
  initSupportEmail();
  initFAQAccordion();
  initFAQSearch();
  initBugReportHelpers();
  initMobileNav();
  initDynamicYear();
  initBackToTop();
  initScrollSpy();
});

/**
 * Ensures centralized support email is wired up across all mailto links and text elements
 */
function initSupportEmail() {
  // Find all elements designated for displaying the email
  const emailDisplayElements = document.querySelectorAll('[data-support-email]');
  emailDisplayElements.forEach((el) => {
    el.textContent = CONFIG.SUPPORT_EMAIL;
  });

  // Find all email mailto links
  const emailLinks = document.querySelectorAll('a[href^="mailto:support.fastaqim@gmail.com"]');
  emailLinks.forEach((link) => {
    link.href = `mailto:${CONFIG.SUPPORT_EMAIL}`;
  });

  // Wire up copy email button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard(CONFIG.SUPPORT_EMAIL, 'تم نسخ البريد الإلكتروني بنجاح');
      copyEmailBtn.classList.add('copied');
      const originalText = copyEmailBtn.innerHTML;
      copyEmailBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>تم النسخ</span>
      `;
      setTimeout(() => {
        copyEmailBtn.classList.remove('copied');
        copyEmailBtn.innerHTML = originalText;
      }, 2500);
    });
  }
}

/**
 * FAQ Accordion setup with accessibility and smooth transitions
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Optional: Close other open accordion items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          const otherBtn = otherItem.querySelector('.faq-question-btn');
          const otherPanel = otherItem.querySelector('.faq-answer-panel');
          if (otherBtn && otherPanel) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherItem.classList.remove('active');
            otherPanel.style.maxHeight = null;
          }
        }
      });

      // Toggle current item
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        item.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });

    // Keyboard navigation (Arrow keys up/down)
    btn.addEventListener('keydown', (e) => {
      const buttons = Array.from(document.querySelectorAll('.faq-question-btn'));
      const index = buttons.indexOf(btn);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = buttons[index + 1] || buttons[0];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = buttons[index - 1] || buttons[buttons.length - 1];
        prev.focus();
      }
    });
  });
}

/**
 * Instant Search/Filter in FAQ list
 */
function initFAQSearch() {
  const searchInput = document.getElementById('faq-search-input');
  const faqItems = document.querySelectorAll('.faq-item');
  const emptyState = document.getElementById('faq-empty-state');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    let visibleCount = 0;

    faqItems.forEach((item) => {
      const questionText = item.querySelector('.faq-question-text')?.textContent.toLowerCase() || '';
      const answerText = item.querySelector('.faq-answer-inner')?.textContent.toLowerCase() || '';

      if (!query || questionText.includes(query) || answerText.includes(query)) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
        // Collapse hidden items
        const btn = item.querySelector('.faq-question-btn');
        const panel = item.querySelector('.faq-answer-panel');
        if (btn && panel) {
          btn.setAttribute('aria-expanded', 'false');
          item.classList.remove('active');
          panel.style.maxHeight = null;
        }
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}

/**
 * Bug reporting template helpers:
 * 1. Open pre-filled email in client
 * 2. Copy template text to clipboard
 */
function initBugReportHelpers() {
  const openEmailBtn = document.getElementById('open-bug-email-btn');
  const copyTemplateBtn = document.getElementById('copy-bug-template-btn');

  if (openEmailBtn) {
    openEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const mailtoUrl = `mailto:${CONFIG.SUPPORT_EMAIL}?subject=${encodeURIComponent(CONFIG.BUG_REPORT_SUBJECT)}&body=${encodeURIComponent(CONFIG.BUG_REPORT_TEMPLATE)}`;
      window.location.href = mailtoUrl;
    });
  }

  if (copyTemplateBtn) {
    copyTemplateBtn.addEventListener('click', () => {
      copyToClipboard(CONFIG.BUG_REPORT_TEMPLATE, 'تم نسخ نموذج الإبلاغ عن مشكلة بنجاح');
      copyTemplateBtn.classList.add('copied');
      const originalText = copyTemplateBtn.innerHTML;
      copyTemplateBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>تم نسخ النموذج!</span>
      `;
      setTimeout(() => {
        copyTemplateBtn.classList.remove('copied');
        copyTemplateBtn.innerHTML = originalText;
      }, 2500);
    });
  }
}

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'فتح القائمة الرئيسية');
    } else {
      navMenu.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'إغلاق القائمة الرئيسية');
    }
  });

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Sets current year in footer dynamically
 */
function initDynamicYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Back to top button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * ScrollSpy to highlight active navigation link and header shadow
 */
function initScrollSpy() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header scrolled state
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Active section detection
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * Generic Clipboard Copy Helper with Toast Notification
 */
function copyToClipboard(text, successMsg = 'تم النسخ بنجاح') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(successMsg))
      .catch(() => fallbackCopyText(text, successMsg));
  } else {
    fallbackCopyText(text, successMsg);
  }
}

function fallbackCopyText(text, successMsg) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) {
      showToast(successMsg);
    }
  } catch (err) {
    console.warn('Fallback copy failed: ', err);
  }
}

/**
 * Global Toast Notification
 */
let toastTimeout = null;
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;color:#81C784">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
