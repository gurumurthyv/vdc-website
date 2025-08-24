
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
function handleSubmit(e){
  if(e) e.preventDefault();
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const subjectEl = document.getElementById('subject');
  const messageEl = document.getElementById('message');
  const honeypot = document.getElementById('website');
  const msg = document.getElementById('formMsg');
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const subject = subjectEl.value.trim();
  const message = messageEl.value.trim();

  // Basic validation
  if(honeypot && honeypot.value){
    // Bot likely; silently ignore
    msg.textContent = 'Submission ignored.';
    return false;
  }
  if(!name || !email || !subject || !message){
    msg.textContent = 'Please fill out all fields.';
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    msg.textContent = 'Enter a valid email.';
    emailEl.focus();
    return false;
  }

  // Store locally (simple front-end only persistence)
  try {
    const stored = JSON.parse(localStorage.getItem('contactSubmissions')||'[]');
    stored.push({name,email,subject,message,date:new Date().toISOString()});
    localStorage.setItem('contactSubmissions', JSON.stringify(stored));
  } catch(err){
    console.warn('Local storage unavailable', err);
  }

  // Provide a mailto link fallback (opens user email client)
  const mailto = `mailto:info@verticaldistrict.com?subject=${encodeURIComponent('[Website] '+subject)}&body=${encodeURIComponent('Name: '+name+'%0AEmail: '+email+'%0A%0A'+message)}`;
  msg.innerHTML = 'Message stored locally. <a href="'+mailto+'">Click to send via email client</a>.';
  msg.style.color = 'var(--accent)';

  // Reset form (optional)
  nameEl.value='';emailEl.value='';subjectEl.value='';messageEl.value='';
  return false;
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
