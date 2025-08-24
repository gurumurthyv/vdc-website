
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

// Portfolio filtering (static grid version)
(function(){
  const tabs = document.querySelectorAll('.tab-btn');
  const grid = document.getElementById('projectsGrid');
  if(!grid) return; // no projects section
  const items = Array.from(grid.querySelectorAll('.portfolio-item'));
  const toggleBtn = document.getElementById('showMoreBtn');
  const MAX_INITIAL = 6;
  let expanded = false;

  function visibleByFilter(filter){
    return items.filter(item => {
      const cats = (item.getAttribute('data-category')||'').split(/[,\s]+/);
      return filter === 'all' || cats.includes(filter);
    });
  }

  function render(filter){
    const filtered = visibleByFilter(filter);
    // Hide all first
    items.forEach(i=> i.style.display='none');
    if(!expanded){
      filtered.slice(0, MAX_INITIAL).forEach(i=> i.style.display='block');
    } else {
      filtered.forEach(i=> i.style.display='block');
    }
    // Toggle button state
    if(toggleBtn){
      if(filtered.length <= MAX_INITIAL){
        toggleBtn.style.display='none';
      } else {
        toggleBtn.style.display='inline-block';
        toggleBtn.textContent = expanded ? 'Show Less' : 'Show More';
      }
    }
  }

  let currentFilter = 'all';

  if(toggleBtn){
    toggleBtn.addEventListener('click', ()=>{
      expanded = !expanded;
      render(currentFilter);
      if(!expanded){
        grid.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=> t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-tab');
      expanded = false; // reset to collapsed when changing filter
      render(currentFilter);
    });
  });

  // Initial render
  render(currentFilter);
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
