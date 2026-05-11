   // ── Mobile menu ──
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('active');
      toggle.classList.toggle('open', isActive);
      toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // ── Smooth scroll for ALL anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();

        // Close mobile menu if open
        navLinks.classList.remove('active');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');

        const navHeight = document.querySelector('header').offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });

    // ── Active nav link highlight on scroll ──
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
      const scrollY = window.scrollY + 100;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          allNavLinks.forEach(a => a.classList.remove('active-link'));
          const active = document.querySelector(`.nav-links a[href="#${id}"]`);
          if (active) active.classList.add('active-link');
        }
      });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ── Scroll-triggered fade-in animations ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .skill-item, .about-left, .about-right, .hero-left, .hero-right')
      .forEach(el => observer.observe(el));