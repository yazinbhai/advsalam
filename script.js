/* ==========================================================================
   ABDULSALAM ABDULRAHMAN — INTERACTIVE ENGINE
   High-performance micro-interactions & State Management
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initPortfolioFilters();
  initInquiryForm();
  initMobileMenu();
  initSmoothScroll();
  initFaqAccordion();
});

/* --------------------------------------------------------------------------
   Theme Toggle (Obsidian Dark vs. Ivory Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('abdul_salam_theme') || (prefersDark ? 'dark' : 'dark');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('abdul_salam_theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  if (theme === 'light') {
    toggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    toggleBtn.setAttribute('aria-label', 'Switch to Dark Theme');
  } else {
    toggleBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    toggleBtn.setAttribute('aria-label', 'Switch to Light Theme');
  }
}

/* --------------------------------------------------------------------------
   Header Scroll State
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Portfolio Filter Tabs
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.role-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (filter === 'international' && category.includes('international'))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Advisory Inquiry Form Submission Simulation
   -------------------------------------------------------------------------- */
function initInquiryForm() {
  const form = document.getElementById('advisoryForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('inquiryName').value.trim();
      const email = document.getElementById('inquiryEmail').value.trim();
      const type = document.getElementById('inquiryType').value;
      const message = document.getElementById('inquiryMessage').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Dispatching Briefing...</span>`;

      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (feedback) {
          feedback.style.display = 'block';
          feedback.innerHTML = `<strong>Thank you, ${name}.</strong> Your confidential advisory inquiry regarding <em>${type}</em> has been prepared. You may also directly reach the executive desk at <a href="mailto:aparconceptsusa@gmail.com" style="text-decoration: underline; color: inherit;">aparconceptsusa@gmail.com</a>.`;
        }
      }, 1200);
    });
  }
}

/* --------------------------------------------------------------------------
   Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-menu');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Smooth Scroll Anchor Navigation
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}


/* --------------------------------------------------------------------------
   FAQ Accordion (AI AEO & Snippets)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}
