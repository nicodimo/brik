const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.frame, .note, .portrait').forEach(el => io.observe(el));
