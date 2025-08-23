
// Theme toggle with localStorage + prefers-color-scheme
(function(){
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const htmlEl = document.documentElement;
  function applyTheme(mode){
    htmlEl.setAttribute('data-theme', mode);
    const btn = document.querySelector('.theme-toggle');
    if(btn){ btn.textContent = mode === 'dark' ? '🌙' : '☀️'; }
  }
  // Default to light theme
  applyTheme(saved || 'light');
  const btn = document.querySelector('.theme-toggle');
  if(btn){
    btn.addEventListener('click', ()=>{
      const current = htmlEl.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }
})();

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle) {
  navToggle.addEventListener('click', ()=> nav.classList.toggle('open'));
}

// Contact form (static demo)
function handleSubmit(){
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const msg = document.getElementById('formMsg');
  if(!name || !email || !subject || !message){
    msg.textContent = 'Please fill out all fields.';
    return;
  }
  // Demo-only: imitate success
  msg.textContent = 'Thanks! Your message has been recorded locally (demo only).';
  console.log({name,email,subject,message});
}
window.handleSubmit = handleSubmit;

// Simple carousel fade
(function(){
  const wrap = document.getElementById('heroCarousel');
  if(!wrap) return;
  const imgs = [...wrap.querySelectorAll('img')];
  if (imgs.length === 0) return;
  imgs.forEach((im,i)=>{ im.style.opacity = i===0 ? 1 : 0; });
  let i = 0;
  function show(){
    imgs.forEach((im,idx)=>{
      im.style.opacity = idx===i ? 1 : 0;
      im.style.pointerEvents = idx===i ? 'auto':'none';
    });
    i = (i+1) % imgs.length;
  }
  setInterval(show, 4000);
})();

// Portfolio filtering
(function(){
  const tabs = document.querySelectorAll('.tab-btn');
  const items = document.querySelectorAll('.portfolio-item');
  
  if(!tabs.length || !items.length) return;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      const filter = tab.getAttribute('data-tab');
      
      items.forEach(item => {
        if(filter === 'all') {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
          const categories = item.getAttribute('data-category');
          if(categories && categories.includes(filter)) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-in-out';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });
})();

// Smooth scroll for navigation links
(function(){
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile nav if open
        const nav = document.querySelector('.nav');
        if(nav) nav.classList.remove('open');
      }
    });
  });
})();
