document.getElementById('year').textContent=new Date().getFullYear();
const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.07});
document.querySelectorAll('.reveal').forEach(e=>o.observe(e));