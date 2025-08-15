
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

// Simple carousel auto-swap
(function(){
  const wrap = document.getElementById('heroCarousel');
  if(!wrap) return;
  const imgs = [...wrap.querySelectorAll('img')];
  let i = 0;
  function show(){
    imgs.forEach((im,idx)=>{
      im.style.display = idx===i ? 'block':'none';
    });
    i = (i+1) % imgs.length;
  }
  if(imgs.length>0){
    show();
    setInterval(show, 3000);
  }
})();
