document.getElementById('year').textContent=new Date().getFullYear();
const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.07});
document.querySelectorAll('.reveal').forEach(e=>o.observe(e));

// Highlight the nav item for the section currently in view.
const sectionLinks = [...document.querySelectorAll('.nav nav a[href^="#"]')];
const trackedSections = sectionLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function setActiveNav(id) {
  sectionLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

sectionLinks.forEach(link => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    setActiveNav(id);
  });
});

const navSpy = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveNav(visible.target.id);
}, {
  rootMargin: '-68px 0px -52% 0px',
  threshold: [0.05, 0.2, 0.45, 0.7]
});

trackedSections.forEach(section => navSpy.observe(section));

// Set the correct state on initial load / direct hash links.
if (location.hash && document.querySelector(location.hash)) {
  setActiveNav(location.hash.slice(1));
}
