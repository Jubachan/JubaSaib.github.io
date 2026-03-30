/* ===================================================
   JUBA SAIB PORTFOLIO — JS AMÉLIORÉ
   Features: Curseur, Typer, Particules, Filtres,
             Reveal au scroll, Form validation,
             Navbar active, Progress bar, Back to top
=================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== CURSEUR PERSONNALISÉ =====
  const cursorDot  = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hovered state sur éléments interactifs
  const hoverTargets = document.querySelectorAll('a, button, .btn, .js_show_btn, .filter-btn, .skill-card, .project-card, .contact-link, .social-pill, .hobby-card, .skill-pill-item, .lang-item');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
  });

  // Cacher curseur hors fenêtre
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });


  // ===== SCROLL PROGRESS BAR =====
  const scrollBar = document.getElementById('scrollProgress');
  function updateScrollBar() {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    const pct      = total > 0 ? (scrolled / total) * 100 : 0;
    scrollBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateScrollBar, { passive: true });


  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  // ===== MENU MOBILE =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('open');
    });
  });


  // ===== NAVBAR SECTION ACTIVE =====
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  function setActiveNav() {
    const scrollY = window.scrollY + 100;
    let current   = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) current = sec.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-section') === current);
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();


  // ===== TEXTE TYPÉ HERO =====
  const typedEl = document.getElementById('typedText');
  const phrases = [
    'Étudiant en Licence 2 Informatique',
    'Développeur Web Passionné',
    'Créateur de Jeux Vidéo',
    'Futur Ingénieur Informatique',
  ];
  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let typingTimeout;

  function typeWriter() {
    const current = phrases[phraseIdx];
    if (deleting) {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typingTimeout = setTimeout(typeWriter, 500);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting      = true;
        typingTimeout = setTimeout(typeWriter, 2200);
        return;
      }
    }
    typingTimeout = setTimeout(typeWriter, deleting ? 40 : 70);
  }

  if (typedEl) setTimeout(typeWriter, 800);


  // ===== CANVAS PARTICULES HERO =====
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx   = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r  = Math.random() * 1.8 + 0.5;
        this.a  = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,201,163,${this.a})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = Array.from({ length: 60 }, () => new Particle());
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,201,163,${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth   = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(animateParticles);
    }

    // Arrêter animation quand hors viewport pour économiser ressources
    const heroSection = document.getElementById('accueil');
    const heroObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateParticles();
      } else {
        cancelAnimationFrame(animId);
      }
    });
    heroObserver.observe(heroSection);

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    }, { passive: true });

    resizeCanvas();
    initParticles();
    animateParticles();
  }


  // ===== REVEAL AU SCROLL (INTERSECTION OBSERVER) =====
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Réactiver le curseur hover après révélation
        entry.target.querySelectorAll('a, button').forEach(el => {
          el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
          el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
        });
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  // ===== ONGLETS "À PROPOS" =====
  const aboutBtns   = document.querySelectorAll('#a-propos .js_show_btn');
  const aboutPanels = {
    about_presentation_p : document.getElementById('about_presentation_p'),
    about_languages_p    : document.getElementById('about_languages_p'),
    about_softskills_p   : document.getElementById('about_softskills_p'),
    about_hobbies_p      : document.getElementById('about_hobbies_p'),
  };

  function switchAboutPanel(targetId) {
    Object.values(aboutPanels).forEach(p => p && p.classList.add('hidden'));
    if (aboutPanels[targetId]) aboutPanels[targetId].classList.remove('hidden');
    aboutBtns.forEach(btn => {
      btn.classList.toggle('selected_btn', btn.getAttribute('data-nw-id-target') === targetId);
    });
    // Animer barres de langue si onglet "langues"
    if (targetId === 'about_languages_p') animateLangBars();
  }

  aboutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchAboutPanel(btn.getAttribute('data-nw-id-target'));
    });
  });

  function animateLangBars() {
    const fills = document.querySelectorAll('.lang-fill');
    fills.forEach(fill => {
      const targetWidth = fill.style.width;
      fill.style.width = '0';
      requestAnimationFrame(() => {
        setTimeout(() => { fill.style.width = targetWidth; }, 50);
      });
    });
  }


  // ===== FILTRES PORTFOLIO =====
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;

        if (show) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity    = '1';
              card.style.transform  = 'translateY(0)';
            }, 50);
          });
        } else {
          card.style.transition = 'opacity 0.3s ease';
          card.style.opacity    = '0';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });


  // ===== FORMULAIRE DE CONTACT =====
  const contactForm = document.getElementById('contactForm');
  const charCount   = document.getElementById('charCount');
  const msgField    = document.getElementById('message');

  // Compteur de caractères
  if (msgField && charCount) {
    msgField.addEventListener('input', () => {
      const len = msgField.value.length;
      charCount.textContent = `${len} / 500`;
      charCount.style.color = len > 450 ? '#FF6B6B' : 'rgba(255,242,220,0.4)';
      if (len > 500) msgField.value = msgField.value.slice(0, 500);
    });
  }

  // Validation champ
  function validateField(id, errorId, condition, msg) {
    const field = document.getElementById(id);
    const err   = document.getElementById(errorId);
    if (!field || !err) return true;
    if (condition(field.value)) {
      field.classList.remove('error');
      err.textContent = '';
      return true;
    } else {
      field.classList.add('error');
      err.textContent = msg;
      return false;
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameOk = validateField(
        'name', 'nameError',
        v => v.trim().length >= 2,
        'Le nom doit contenir au moins 2 caractères.'
      );
      const emailOk = validateField(
        'email', 'emailError',
        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        'Adresse email invalide.'
      );
      const msgOk = validateField(
        'message', 'messageError',
        v => v.trim().length >= 10,
        'Le message doit contenir au moins 10 caractères.'
      );

      if (!nameOk || !emailOk || !msgOk) return;

      // ===== ENVOI RÉEL VIA EMAILJS =====
      const submitBtn   = document.getElementById('submitBtn');
      const btnText     = submitBtn.querySelector('.btn-text');
      const btnLoading  = submitBtn.querySelector('.btn-loading');
      const formSuccess = document.getElementById('formSuccess');

      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      submitBtn.disabled = true;

      emailjs.init('3iBYLDB4BPA2N3Axz');

      const templateParams = {
        name    : document.getElementById('name').value,
        email   : document.getElementById('email').value,
        subject : document.getElementById('subject').value || '(Sans sujet)',
        message : document.getElementById('message').value,
      };

      emailjs.send('service_6rxc1io', 'template_qlsyuok', templateParams)
        .then(() => {
          btnText.classList.remove('hidden');
          btnLoading.classList.add('hidden');
          submitBtn.disabled = false;
          formSuccess.classList.remove('hidden');
          contactForm.reset();
          charCount.textContent = '0 / 500';
          setTimeout(() => formSuccess.classList.add('hidden'), 5000);
        })
        .catch((error) => {
          console.error('Erreur EmailJS :', error);
          btnText.classList.remove('hidden');
          btnLoading.classList.add('hidden');
          submitBtn.disabled = false;
          alert("Une erreur s'est produite lors de l'envoi. Réessaie ou contacte-moi directement par email.");
        });
    });

    // Valider en temps réel
    ['name', 'email', 'message'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('blur', () => {
        if (id === 'name')    validateField('name', 'nameError', v => v.trim().length >= 2, 'Le nom doit contenir au moins 2 caractères.');
        if (id === 'email')   validateField('email', 'emailError', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Adresse email invalide.');
        if (id === 'message') validateField('message', 'messageError', v => v.trim().length >= 10, 'Le message doit contenir au moins 10 caractères.');
      });
    });
  }


  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top     : target.offsetTop - offset,
        behavior: 'smooth',
      });
    });
  });


  // ===== HIGHLIGHT SKILL CARDS AU HOVER =====
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 16;
      const y    = ((e.clientY - rect.top ) / rect.height - 0.5) * 16;
      card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });

});