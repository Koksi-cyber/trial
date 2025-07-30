// Handle scroll reveal animations and generate floating triangles
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for revealing sections on scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Once element is visible, stop observing to save resources
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.hidden').forEach(section => {
    revealObserver.observe(section);
  });

  // Generate floating triangles in hero section
  const hero = document.querySelector('.hero');
  const colours = ['#3AA655', '#FB8C00', '#00796B', '#FFCC80', '#A5D6A7'];
  const numTriangles = 18;
  for (let i = 0; i < numTriangles; i++) {
    const tri = document.createElement('div');
    tri.classList.add('triangle');
    tri.style.left = Math.random() * 100 + '%';
    tri.style.animationDuration = (12 + Math.random() * 6) + 's';
    tri.style.animationDelay = (Math.random() * 6) + 's';
    tri.style.opacity = (0.4 + Math.random() * 0.5).toFixed(2);
    tri.style.borderBottomColor = colours[Math.floor(Math.random() * colours.length)];
    hero.appendChild(tri);
  }

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  /* Preloader falling ice */
  const preloader = document.getElementById('preloader');
  const preloaderFall = document.getElementById('preloader-fall');
  if (preloader && preloaderFall) {
    const iceImgs = [
      'assets/ice1.png',
      'assets/ice2.png',
      'assets/ice3.png',
      'assets/ice4.png'
    ];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');
      img.src = iceImgs[Math.floor(Math.random() * iceImgs.length)];
      img.classList.add('falling-ice-pre');
      img.style.left = Math.random() * 100 + '%';
      const duration = 4 + Math.random() * 4;
      img.style.animationDuration = duration + 's';
      img.style.animationDelay = (Math.random() * 3) + 's';
      // random size between 30 and 50 px
      const size = 30 + Math.random() * 20;
      img.style.width = size + 'px';
      img.style.height = size + 'px';
      preloaderFall.appendChild(img);
    }
    // Fade out preloader when window is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 2500);
    });
  }

  /* Interactive cloud: release slow falling ice on hover */
  const cloud = document.getElementById('interactiveCloud');
  let cloudFallStarted = false;
  if (cloud) {
    const iceSources = [
      'assets/ice1.png',
      'assets/ice2.png',
      'assets/ice3.png',
      'assets/ice4.png'
    ];
    function createFallingIce() {
      const img = document.createElement('img');
      img.src = iceSources[Math.floor(Math.random() * iceSources.length)];
      img.classList.add('falling-ice');
      // random left position between 0 and 100% of viewport width
      img.style.left = Math.random() * 100 + 'vw';
      // random duration between 10s and 18s
      const dur = 10 + Math.random() * 8;
      img.style.animationDuration = dur + 's';
      // random size 24-40px
      const s = 24 + Math.random() * 16;
      img.style.width = s + 'px';
      img.style.height = s + 'px';
      document.body.appendChild(img);
      // remove after animation ends to avoid DOM clutter
      setTimeout(() => {
        img.remove();
      }, dur * 1000 + 2000);
    }
    cloud.addEventListener('mouseenter', () => {
      if (cloudFallStarted) return;
      cloudFallStarted = true;
      // generate an initial burst
      for (let i = 0; i < 5; i++) {
        createFallingIce();
      }
      // start interval to continually drop ice
      setInterval(() => {
        createFallingIce();
      }, 1500);
    });
  }

  /* Copy CA button functionality */
  const copyBtn = document.getElementById('copyBtn');
  const contractAddressEl = document.getElementById('contract-address');
  const copyFeedback = document.getElementById('copy-feedback');
  if (copyBtn && contractAddressEl && copyFeedback) {
    copyBtn.addEventListener('click', () => {
      const text = contractAddressEl.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          copyFeedback.classList.add('show');
          setTimeout(() => copyFeedback.classList.remove('show'), 2000);
        });
      }
    });
  }
});