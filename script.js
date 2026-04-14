(function(){
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=>{
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click', e=>{
      const href = link.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth'});
          nav && nav.classList.remove('is-open');
          navToggle && navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // Modal logic
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  function openModal(src, title, desc){
    if(!modal) return;
    modalImg.src = src;
    modalTitle.textContent = title || '';
    modalDesc.textContent = desc || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    modalImg.removeAttribute('src');
  }

  document.querySelectorAll('.js-open-modal').forEach(img=>{
    img.addEventListener('click', ()=>{
      const full = img.getAttribute('data-full') || img.getAttribute('src');
      const title = img.getAttribute('data-title') || '';
      const desc = img.getAttribute('data-desc') || '';
      openModal(full, title, desc);
    });
  });

  modalClose && modalClose.addEventListener('click', closeModal);
  modalBackdrop && modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeModal();
  });
})();


