/* =========================================================================
   BUB — Hon. Blessing Ufedojo Benyeogor
   Site interactions
   ========================================================================= */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Navbar scroll state ---------- */
  const navbar = document.querySelector('.bub-navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 10) navbar.classList.add('is-scrolled');
      else navbar.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 2. Active nav link highlight based on current page ---------- */
  (function highlightActiveNav() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (!href || href.startsWith('#')) return;
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* ---------- 3. Smooth anchor scrolling (with navbar offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (document.querySelector('.bub-navbar')?.offsetHeight || 80) + 10;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      // close mobile menu if open
      const collapse = document.querySelector('.navbar-collapse.show');
      if (collapse && window.bootstrap) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }
    });
  });

  /* ---------- 4. Reveal-on-scroll ---------- */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ---------- 5. Counter animation ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const animate = (el) => {
      const target = parseInt(el.dataset.counter, 10);
      if (isNaN(target)) return;
      if (prefersReducedMotion) { el.textContent = target.toLocaleString(); return; }
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(target * eased);
        el.textContent = val.toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { animate(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(c => cio.observe(c));
    } else {
      counters.forEach(animate);
    }
  }

  /* ---------- 6. Gallery filter + modal ---------- */
  document.querySelectorAll('[data-gallery]').forEach(grid => {
    // Items are direct descendants carrying data-cat, OR .gallery-item inside the grid.
    const items = grid.querySelectorAll('[data-cat]');
    // Buttons live near the grid or anywhere on the page with a matching scope.
    const scope = grid.dataset.gallery || 'default';
    const buttons = document.querySelectorAll(
      `[data-gallery-filter][data-gallery-scope="${scope}"], [data-gallery-filter]:not([data-gallery-scope])`
    );

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.galleryFilter;
        // Only toggle active state on siblings in the same toolbar
        const toolbar = btn.closest('.gallery-filters, [role="toolbar"], .d-flex');
        if (toolbar) toolbar.querySelectorAll('[data-gallery-filter]').forEach(b => b.classList.remove('active'));
        else buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        items.forEach(item => {
          const cats = (item.dataset.cat || '').split(/\s+/);
          const show = filter === 'all' || cats.includes(filter);
          item.style.display = show ? '' : 'none';
        });
      });
    });

    // Modal viewer — only wires onto true .gallery-item image tiles
    const modalEl = document.getElementById('galleryModal');
    if (modalEl && window.bootstrap) {
      const modal = new bootstrap.Modal(modalEl);
      const modalImg = modalEl.querySelector('[data-modal-img]');
      const modalCap = modalEl.querySelector('[data-modal-caption]');
      grid.querySelectorAll('.gallery-item[data-cat]').forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        const open = () => {
          const src = item.dataset.full || item.querySelector('img')?.src;
          const alt = item.dataset.caption || item.querySelector('img')?.alt || '';
          if (modalImg) {
            if (src) { modalImg.src = src; modalImg.hidden = false; }
            else { modalImg.hidden = true; }
            modalImg.alt = alt;
          }
          if (modalCap) modalCap.textContent = alt;
          modal.show();
        };
        item.addEventListener('click', open);
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
      });
    }
  });

  /* ---------- 7. Form validation ---------- */
  document.querySelectorAll('[data-bub-form]').forEach(form => {
    const statusEl = form.querySelector('.form-status');
    const setStatus = (type, msg) => {
      if (!statusEl) return;
      statusEl.className = 'form-status visible ' + type;
      statusEl.textContent = msg;
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        setStatus('error', 'Please check the highlighted fields and try again.');
        return;
      }
      // No backend integration configured — informational response only.
      setStatus('info', 'Thank you. Live submission requires an approved backend integration (see README). Your details were not sent anywhere.');
      form.classList.remove('was-validated');
    });

    // Live phone/email hints
    const phone = form.querySelector('input[type="tel"]');
    if (phone) {
      phone.addEventListener('input', () => {
        phone.value = phone.value.replace(/[^0-9+\-\s()]/g, '');
      });
    }
  });

  /* ---------- 8. Current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 9. Testimonial carousel auto-advance (optional) ---------- */
  const tcar = document.querySelector('#testimonialCarousel');
  if (tcar && window.bootstrap && !prefersReducedMotion) {
    new bootstrap.Carousel(tcar, { interval: 7000, pause: 'hover', ride: 'carousel' });
  }
})();
