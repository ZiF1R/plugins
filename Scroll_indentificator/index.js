const marker = document.querySelector('.scroll-marker');
const windowHeight = document.body.offsetHeight - window.innerHeight;

window.addEventListener('scroll', () => marker.style.width = `${(window.scrollY * 100) / windowHeight}%`)