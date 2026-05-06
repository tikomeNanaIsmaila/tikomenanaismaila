'use strict';


const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }
});


const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-link');

function setActiveLink() {
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink);


const navbarCollapse = document.getElementById('navbarNav');
const bsCollapse     = new bootstrap.Collapse(navbarCollapse, { toggle: false });

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
      bsCollapse.hide();
    }
  });
});


const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));


const skillSection  = document.getElementById('skills');
const skillFills    = document.querySelectorAll('.skill-fill');
let skillsAnimated  = false;

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillFills.forEach(bar => {
        const target = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.width = target;
          });
        });
      });
    }
  });
}, { threshold: 0.3 });

if (skillSection) skillObserver.observe(skillSection);


const sendBtn = document.getElementById('sendBtn');
const formMsg = document.getElementById('formMsg');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    
    const inputs    = document.querySelectorAll('.form-control-custom');
    let   allFilled = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = '#c0392b';
        input.addEventListener('input', () => {
          input.style.borderColor = '';
        }, { once: true });
      }
    });

    if (!allFilled) return;

    
    sendBtn.disabled    = true;
    sendBtn.textContent = 'Sending…';

    setTimeout(() => {
      sendBtn.textContent = 'Message Sent!';
      formMsg.classList.remove('d-none');
      inputs.forEach(input => (input.value = ''));

      
      setTimeout(() => {
        sendBtn.disabled    = false;
        sendBtn.innerHTML   = 'Send Message <i class="bi bi-arrow-right ms-1"></i>';
        formMsg.classList.add('d-none');
      }, 3000);
    }, 900);
  });
}
