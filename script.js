/* ===================================
   PORTFOLIO — PREMIUM JAVASCRIPT
   =================================== */

'use strict';

// -------- DOM READY --------
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticles();
  initTypewriter();
  initScrollAnimations();
  initSkillBars();
  initSkillFilter();
  initProjectFilter();
  initCounters();
  initScrollProgress();
  initBackToTop();
  initSmoothScroll();
  initContactForm();
});

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ===== PARTICLE CANVAS ===== */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animFrame;
  let mouse = { x: null, y: null };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '77, 166, 255' : '168, 85, 247';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Mouse repulsion
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.x += dx / dist * 1.5;
          this.y += dy / dist * 1.5;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Create particles
  const count = Math.min(80, Math.floor(window.innerWidth / 16));
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(77, 166, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    animFrame = requestAnimationFrame(animate);
  }
  animate();
}

/* ===== TYPEWRITER ===== */
function initTypewriter() {
  const el = document.getElementById('roleText');
  if (!el) return;

  const roles = [
    'AI Engineer',
    'Full Stack Developer',
    'Browser Automation Expert',
    'MERN Stack Specialist',
    'B.Tech IT Student',
    'Building Intelligent Digital Solutions'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let isPause = false;

  function type() {
    const currentRole = roles[roleIdx];
    if (isPause) {
      setTimeout(type, 1000);
      isPause = false;
      return;
    }
    if (!isDeleting) {
      el.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentRole.length) {
        isPause = true;
        isDeleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 60);
    } else {
      el.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, 35);
    }
  }
  setTimeout(type, 1200);
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('aos-visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}

/* ===== SKILL BARS ===== */
function initSkillBars() {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.skill-bar');
        bars.forEach((bar, idx) => {
          const level = bar.getAttribute('data-level');
          setTimeout(() => {
            bar.style.width = level + '%';
          }, idx * 120);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillObserver.observe(skillsSection);
}

/* ===== SKILL FILTER ===== */
function initSkillFilter() {
  const catBtns = document.querySelectorAll('.skill-cat-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-cat');

      skillCards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.classList.add('hidden');
        }
      });

      // Re-animate skill bars
      setTimeout(() => {
        skillCards.forEach(card => {
          if (!card.classList.contains('hidden')) {
            const bar = card.querySelector('.skill-bar');
            if (bar) {
              bar.style.width = '0%';
              setTimeout(() => {
                bar.style.width = bar.getAttribute('data-level') + '%';
              }, 100);
            }
          }
        });
      }, 100);
    });
  });
}

/* ===== PROJECT FILTER ===== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-filter') === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ===== COUNTERS ===== */
function initCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.achievement-counter');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, 0, target, 2000);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const achSection = document.getElementById('achievements');
  if (achSection) counterObserver.observe(achSection);
}

function animateCounter(el, start, end, duration) {
  const range = end - start;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const value = Math.floor(start + range * eased);
    el.textContent = value + (end >= 10 ? '+' : '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = end + (end >= 10 ? '+' : '');
  }

  requestAnimationFrame(step);
}

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ===== SCROLL PROGRESS ===== */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    bar.style.width = progress + '%';
  });
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  // Handled by handleFormSubmit in HTML
}

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const btnText = btn.querySelector('.btn-submit-text');
  const successMsg = document.getElementById('formSuccess');
  const form = document.getElementById('contactForm');

  // Simulate sending
  btnText.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    btnText.textContent = 'Send Message';
    successMsg.classList.add('visible');
    setTimeout(() => successMsg.classList.remove('visible'), 4000);
  }, 1500);
}

/* ===== RESUME DOWNLOAD ===== */
function downloadResume() {
  // Create a simple placeholder resume download
  const link = document.createElement('a');
  link.href = 'assets/docs/resume.pdf';
  link.download = 'Elakiya_Resume.pdf';
  link.click();
}

/* ===== PROFILE IMAGE FALLBACK ===== */
window.addEventListener('load', () => {
  const img = document.getElementById('aboutPhoto');
  if (img) {
    img.addEventListener('error', () => {
      // Replace with a styled SVG avatar
      const parent = img.parentElement;
      const avatar = document.createElement('div');
      avatar.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(77,166,255,0.2), rgba(168,85,247,0.2));
        font-size: 6rem;
        color: rgba(77,166,255,0.6);
        font-family: var(--font-primary);
      `;
      avatar.innerHTML = '<i class="fas fa-user-astronaut"></i>';
      img.replaceWith(avatar);
    });
  }
});

/* ===== MICRO-INTERACTIONS ===== */
// Add ripple effect to buttons
document.querySelectorAll('.btn-primary, .btn-submit, .btn-download-nav').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position: absolute;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: translate(-50%, -50%);
      left: ${e.clientX - rect.left}px;
      top: ${e.clientY - rect.top}px;
      animation: ripple 0.6s ease-out forwards;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

/* ===== CARD TILT EFFECT ===== */
document.querySelectorAll('.achievement-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});

/* ===== GLOW CURSOR EFFECT ===== */
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(77,166,255,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
