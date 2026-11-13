/* ============ PRELOADER ============ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('done');
    document.body.style.overflow = '';
  }, 2400);
});
document.body.style.overflow = 'hidden';

/* ============ YEAR ============ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============ CUSTOM CURSOR ============ */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .filter, .g-item, input, select').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
}

/* ============ HERO SLIDER ============ */
const heroImgs = document.querySelectorAll('.hero-img');
const currentSlideEl = document.getElementById('currentSlide');
const heroProgress = document.getElementById('heroProgress');
let currentHero = 0;
const SLIDE_DURATION = 7000;
let slideStart = Date.now();

function goToHero(index) {
  heroImgs.forEach(img => img.classList.remove('active'));
  heroImgs[index].classList.add('active');
  currentHero = index;
  currentSlideEl.textContent = String(index + 1).padStart(2, '0');
  slideStart = Date.now();
}

function nextHero() {
  goToHero((currentHero + 1) % heroImgs.length);
}

setInterval(nextHero, SLIDE_DURATION);

function updateProgress() {
  const elapsed = Date.now() - slideStart;
  const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
  if (heroProgress) heroProgress.style.height = pct + '%';
  requestAnimationFrame(updateProgress);
}
requestAnimationFrame(updateProgress);

/* ============ MOBILE NAV ============ */
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileToggle.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ============ ACTIVE SIDE NAV ON SCROLL ============ */
const sections = document.querySelectorAll('section[id]');
const sideLinks = document.querySelectorAll('.side-nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      sideLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ============ NAVBAR SCROLL EFFECT ============ */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) toTop.classList.add('show');
  else toTop.classList.remove('show');
});

/* ============ REVEAL ON SCROLL ============ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ============ MENU FILTER ============ */
const filters = document.querySelectorAll('.filter');
const menuRows = document.querySelectorAll('.menu-row');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;

    menuRows.forEach(row => {
      if (cat === 'all' || row.dataset.cat === cat) {
        row.classList.remove('hide');
      } else {
        row.classList.add('hide');
      }
    });
  });
});

/* ============ RESERVATION FORM VALIDATION ============ */
const form = document.getElementById('reserveForm');
const successEl = document.getElementById('rfSuccess');

const validate = {
  rName: v => v.trim().length >= 2 ? '' : 'Please enter your full name',
  rEmail: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email',
  rPhone: v => /^[\d\s+\-()]{8,18}$/.test(v) ? '' : 'Enter a valid phone number',
  rDate: v => {
    if (!v) return 'Please select a date';
    const today = new Date(); today.setHours(0,0,0,0);
    return new Date(v) >= today ? '' : 'Date cannot be in the past';
  },
  rGuests: v => v ? '' : 'Please select guests'
};

function validateField(field) {
  const fn = validate[field.id];
  if (!fn) return true;
  const err = fn(field.value);
  const errEl = field.closest('.rf-group').querySelector('.err');
  if (err) {
    field.classList.add('invalid');
    if (errEl) errEl.textContent = err;
    return false;
  }
  field.classList.remove('invalid');
  if (errEl) errEl.textContent = '';
  return true;
}

form.querySelectorAll('input, select').forEach(field => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.classList.contains('invalid')) validateField(field);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('input[required], select[required]').forEach(f => {
    if (!validateField(f)) ok = false;
  });
  if (ok) {
    successEl.classList.add('show');
    form.reset();
    setTimeout(() => successEl.classList.remove('show'), 6000);
  }
});

/* ============ SMOOTH ANCHOR ============ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
  });
});