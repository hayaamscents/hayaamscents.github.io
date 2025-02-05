// Wait for the entire page to load before executing our scripts.
window.addEventListener('load', () => {
  // Remove URL fragment if it exists.
  if (window.location.hash) {
    // Remove the hash from the URL without reloading the page.
    history.replaceState(null, null, window.location.href.split('#')[0]);
  }

  // Fade out the loading screen.
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.opacity = '0';
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 500);

  // Trigger fade-in for elements that are in view on load.
  revealOnScroll();
});

// Intersection Observer for scroll animations.
const observerOptions = {
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with the 'fade-in' class.
document.querySelectorAll('.fade-in').forEach(elem => {
  observer.observe(elem);
});

// Fallback function to add in-view if IntersectionObserver is not supported.
function revealOnScroll() {
  const fadeIns = document.querySelectorAll('.fade-in');
  fadeIns.forEach(elem => {
    if (elem.getBoundingClientRect().top < window.innerHeight) {
      elem.classList.add('in-view');
    }
  });
}
