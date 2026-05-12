/* =========================================================
   Sada T-Shirts — script.js
   - Mobile menu toggle
   - Smooth scroll for in-page links
   - Scroll reveal animations
   - Auto footer year
   - Header shadow on scroll
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Footer year ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Product carousel: reset to first card on load ---------- */
    var productGrid = document.querySelector('.product-grid');
    if (productGrid) {
      productGrid.scrollLeft = 0;
    }

    /* ---------- Mobile menu ---------- */
    var menuToggle = document.getElementById('menuToggle');
    var nav = document.getElementById('primaryNav');

    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close menu when a nav link is tapped (mobile)
      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          if (nav.classList.contains('is-open')) {
            nav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });

      // Close menu if window resizes back up to desktop
      window.addEventListener('resize', function () {
        if (window.innerWidth > 820 && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* ---------- Smooth scroll w/ header offset ---------- */
    var header = document.getElementById('siteHeader');

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (!targetId || targetId === '#' || targetId.length < 2) return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        var offset = header ? header.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset + 1;

        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    /* ---------- Scroll reveal ---------- */
    var revealTargets = document.querySelectorAll(
      '.section-head, .product-card, .about-image, .about-copy, .color-card, .where-inner, .contact-head, .contact-block, .hero-copy, .hero-image'
    );

    revealTargets.forEach(function (el, i) {
      el.classList.add('reveal');
      // small staggered delay for grid items
      if (el.classList.contains('product-card') || el.classList.contains('color-card') || el.classList.contains('contact-block')) {
        el.style.transitionDelay = (i % 8) * 60 + 'ms';
      }
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      // fallback: just show everything
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- Header subtle shadow on scroll ---------- */
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 4) {
          header.style.boxShadow = '0 1px 0 rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.04)';
        } else {
          header.style.boxShadow = 'none';
        }
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  });
})();
