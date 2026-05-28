(function() {
  // ---------- MOBILE MENU TOGGLE ----------
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    function toggleMenu() {
      const expanded = navLinks.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', expanded);
    }
    menuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Update URL without causing jump (optional)
        history.pushState(null, null, targetId);
      }
    });
  });

  // ---------- FORM VALIDATION & SUBMIT ----------
  const form = document.getElementById('contactForm');
  const feedbackDiv = document.getElementById('formFeedback');

  if (form && feedbackDiv) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        feedbackDiv.textContent = '❌ Please fill in all fields.';
        feedbackDiv.style.color = '#b05143';
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        feedbackDiv.textContent = '❌ Enter a valid email address.';
        feedbackDiv.style.color = '#b05143';
        return;
      }
      // Success simulation
      feedbackDiv.style.color = '#5F7F9E';
      feedbackDiv.innerHTML = '✓ Thanks ' + name + '! Your message has been received. We’ll respond soon.';
      form.reset();
      setTimeout(() => {
        feedbackDiv.textContent = '';
      }, 5000);
    });
  }

  // ---------- BACK TO TOP BUTTON ----------
  const goTopBtn = document.getElementById('goTopBtn');
  if (goTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        goTopBtn.style.display = 'flex';
      } else {
        goTopBtn.style.display = 'none';
      }
    });
    goTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---------- RESPONSIVE: Close mobile menu on window resize (if desktop) ----------
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && navLinks && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
})();