
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
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  const btn = document.querySelector('.theme-toggle');
  if(btn){
    btn.addEventListener('click', ()=>{
      const current = htmlEl.getAttribute('data-theme') || 'dark';
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
  setInterval(show, 3000);
})();
