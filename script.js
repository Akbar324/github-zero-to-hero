/* ============================================
   GLASS PORTFOLIO — MAIN JS
   ============================================ */

// ── Nav scroll effect ──
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(5, 10, 24, 0.85)'
    : 'rgba(5, 10, 24, 0.6)';
});

// ── Mobile nav toggle ──
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));
}

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => observer.observe(el));

// ── Active nav link (for same-page anchors) ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href*="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').includes(current)) a.classList.add('active');
  });
});

// ── Typed cursor effect for hero ──
function typeWriter(element, texts, speed = 80, pause = 2000) {
  if (!element) return;
  let textIndex = 0, charIndex = 0, deleting = false;
  function tick() {
    const current = texts[textIndex];
    if (!deleting) {
      element.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pause);
        return;
      }
    } else {
      element.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

const typedEl = document.querySelector('.typed-text');
if (typedEl) {
  typeWriter(typedEl, ['DevOps Engineer', 'Docker Enthusiast', 'CI/CD Builder', 'Cloud Architect', 'Full-Stack Dev']);
}

// ── Parallax on hero orbs ──
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll('.bg-orb').forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ── Form submission feedback ──
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      contactForm.reset();
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// ── Skill bars animate on scroll ──
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.width;
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ── Current year for footer ──
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());