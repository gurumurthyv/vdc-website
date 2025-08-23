
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
  const track = document.getElementById('projectsTrack');
  const dotsWrap = document.getElementById('projectsDots');
  if(!track) return;
  const getItems = () => track.querySelectorAll('.portfolio-item');
  let autoplayTimer=null, currentIndex=0;

  function itemsPerView(){
    if(window.innerWidth <= 700) return 1;
    if(window.innerWidth <= 1100) return 2;
    return 3;
  }

  function totalSlides(){
    const visible = itemsPerView();
    const visibleItems = [...getItems()].filter(i=>i.style.display!=="none");
    return Math.max(1, Math.ceil(visibleItems.length / visible));
  }

  function goToSlide(idx){
    currentIndex = (idx + totalSlides()) % totalSlides();
    const groupWidth = track.clientWidth; // visible window of carousel
    track.scrollTo({left: currentIndex * groupWidth, behavior:'smooth'});
    updateDots();
  }

  function buildDots(){
    if(!dotsWrap) return; 
    dotsWrap.innerHTML='';
    const count = totalSlides();
    for(let i=0;i<count;i++){
      const b=document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide '+(i+1));
      if(i===currentIndex) b.classList.add('active');
      b.addEventListener('click',()=>{stopAutoplay();goToSlide(i);startAutoplay();});
      dotsWrap.appendChild(b);
    }
  }

  function updateDots(){
    if(!dotsWrap) return;
    const btns=[...dotsWrap.querySelectorAll('button')];
    btns.forEach((b,i)=>{b.classList.toggle('active', i===currentIndex);});
  }

  function startAutoplay(){
    stopAutoplay();
    autoplayTimer = setInterval(()=>{goToSlide(currentIndex+1);}, 5000);
  }
  function stopAutoplay(){ if(autoplayTimer) clearInterval(autoplayTimer); }

  // Rebuild dots & snap after resize/filter
  window.addEventListener('resize', ()=>{buildDots();goToSlide(currentIndex);});

  function applyFilter(filter){
    const items = getItems();
    items.forEach(item => {
      const categories = item.getAttribute('data-category') || '';
      const match = filter === 'all' || categories.includes(filter);
      item.style.display = match ? 'block' : 'none';
    });
    // After filtering, snap scroll back to start
  track.scrollTo({left:0,behavior:'smooth'});
  currentIndex=0;
  buildDots();
  updateDots();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilter(tab.getAttribute('data-tab'));
    });
  });

  // Carousel controls
  const prevBtn = document.querySelector('.proj-prev');
  const nextBtn = document.querySelector('.proj-next');
  function scrollByDir(dir){
    const base = track.clientWidth; // visible width
    track.scrollBy({left: dir * (base * 0.8), behavior:'smooth'});
  }
  if(prevBtn) prevBtn.addEventListener('click', ()=> scrollByDir(-1));
  if(nextBtn) nextBtn.addEventListener('click', ()=> scrollByDir(1));

  // Drag to scroll (desktop)
  let isDown=false,startX,scrollLeft;
  track.addEventListener('mousedown',e=>{isDown=true;track.classList.add('dragging');startX=e.pageX;scrollLeft=track.scrollLeft;});
  window.addEventListener('mouseup',()=>{isDown=false;track.classList.remove('dragging');});
  window.addEventListener('mousemove',e=>{if(!isDown) return; const dx=e.pageX-startX; track.scrollLeft=scrollLeft-dx;});
  // Touch support
  let touchStartX=0,touchScrollLeft=0;
  track.addEventListener('touchstart',e=>{touchStartX=e.touches[0].pageX;touchScrollLeft=track.scrollLeft;});
  track.addEventListener('touchmove',e=>{const dx=e.touches[0].pageX-touchStartX;track.scrollLeft=touchScrollLeft-dx;},{passive:true});

  // Detect manual interaction to pause autoplay temporarily
  ['mousedown','touchstart','wheel','keydown'].forEach(evt=>{
    track.addEventListener(evt,()=>{stopAutoplay();startAutoplay();},{passive:true});
  });

  // Initialize
  buildDots();
  goToSlide(0);
  startAutoplay();
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
