// COMMON UTILITIES
document.getElementById('year').textContent = new Date().getFullYear();

// highlight active nav link based on filename
(function highlightNav(){
  const links = document.querySelectorAll('.nav-link');
  const file = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a=>{
    if(a.getAttribute('href') === file) a.classList.add('active');
    else a.classList.remove('active');
  });
})();

/* ---------- DATA ---------- */
const instruments = [
  {name:'Acoustic Guitar', price:'₹6,500', img:'https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=800&auto=format&fit=crop'},
  {name:'Electric Guitar', price:'₹14,200', img:'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop'},
  {name:'Piano (Digital)', price:'₹45,000', img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'},
  {name:'Violin', price:'₹9,300', img:'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=800&auto=format&fit=crop'},
  {name:'Drum Set', price:'₹22,000', img:'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop'}
];

const classes = [
  {title:'Vocal — Classical', type:'vocal', img:'https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=800&auto=format&fit=crop', hours:'20', price:'₹2,000', categories:['Classical','Opera']},
  {title:'Vocal — Pop', type:'vocal', img:'https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=800&auto=format&fit=crop', hours:'12', price:'Free', categories:['Pop','Indie']},
  {title:'Piano Beginner', type:'instrument', img:'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop', hours:'30', price:'₹4,500', categories:['Beginner','Technique']},
  {title:'Violin — Intermediate', type:'instrument', img:'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=800&auto=format&fit=crop', hours:'25', price:'₹3,200', categories:['Intermediate','Orchestra']}
];

const songTypes = [
  {type:'Pop', img:'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'},
  {type:'Classical', img:'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=800&auto=format&fit=crop'},
  {type:'Jazz', img:'https://images.unsplash.com/photo-1508933694872-55fbbe1f2a06?q=80&w=800&auto=format&fit=crop'},
  {type:'Electronic', img:'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'}
];

const playlists = {
  'Pop': ['Top Pop 2024','Indie Pop Hits','Bollywood Pop Mix'],
  'Classical': ['Beethoven Best','Indian Classical Raag','Relaxing Strings'],
  'Jazz': ['Smooth Jazz','Late Night Jazz'],
  'Electronic': ['EDM Anthems','Chill Electronic']
};

/* ---------- PAGE HELPERS ---------- */
function mkCardHTML(item){
  return `<div class="card">
    <img src="${item.img}" alt="${item.name||item.title||item.type}">
    <h3>${item.name||item.title||item.type}</h3>
    <p>${item.price?item.price:(item.hours?("Hours: "+item.hours):'')}</p>
  </div>`;
}

function populateIfExists(id, items, mapper){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = '';
  items.forEach(i => {
    el.insertAdjacentHTML('beforeend', mapper?mapper(i):mkCardHTML(i));
  });
}

/* populate home carousels */
populateIfExists('instruments-carousel', instruments, i=>mkCardHTML(i));
populateIfExists('classes-carousel', classes, c=>mkCardHTML(c));

/* songs page */
if(document.getElementById('song-types')){
  populateIfExists('song-types', songTypes, s=>`<div class="card" data-type="${s.type}"><img src="${s.img}"><h3>${s.type}</h3></div>`);
  // attach hover/click handlers to show playlists
  document.getElementById('song-types').addEventListener('click', (ev)=>{
    const card = ev.target.closest('.card');
    if(!card) return;
    showPlaylists(card.dataset.type);
  });
  document.getElementById('song-types').addEventListener('mouseover', (ev)=>{
    const card = ev.target.closest('.card');
    if(card) showPlaylists(card.dataset.type);
  });
}

/* playlists display */
function showPlaylists(type){
  const area = document.getElementById('playlists-area');
  if(!area) return;
  area.innerHTML = '';
  const list = playlists[type] || [];
  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'store-item';
    div.innerHTML = `<div class="meta"><h3>${p}</h3><p>Playlist</p></div>`;
    area.appendChild(div);
  });
}

/* store page vertical list */
if(document.getElementById('store-list')){
  const map = instruments.map(i=>`<div class="store-item">
    <img src="${i.img}" alt="${i.name}">
    <div class="meta"><h3>${i.name}</h3><p>${i.price}</p><button class="btn" onclick="alert('Buy demo — ${i.name}')">Buy</button></div>
  </div>`).join('');
  document.getElementById('store-list').innerHTML = map;
}

/* courses page */
if(document.getElementById('course-main-carousel')){
  populateIfExists('course-main-carousel', classes, c=>`<div class="card" data-title="${c.title}"><img src="${c.img}"><h3>${c.title}</h3><p>${c.price}</p></div>`);
  document.getElementById('course-main-carousel').addEventListener('click', (ev)=>{
    const card = ev.target.closest('.card');
    if(!card) return;
    const title = card.dataset.title;
    const course = classes.find(x=>x.title===title);
    if(course) {
      const container = document.getElementById('course-categories');
      container.innerHTML = course.categories.map(cat=>`<div class="store-item"><div class="meta"><h3>${cat}</h3><p>Details: ${course.hours} • ${course.price}</p></div></div>`).join('');
    }
  });
}

/* ---------- SUPPORT FORM HANDLERS ---------- */
function handleRegister(e){
  e.preventDefault();
  const name = document.getElementById('rname').value.trim();
  const email = document.getElementById('remail').value.trim();
  const mobile = document.getElementById('rmobile').value.trim();
  const pass = document.getElementById('rpass').value;
  const cpass = document.getElementById('rcpass').value;
  const msg = document.getElementById('reg-msg');

  const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if(!emailRe.test(email)){ msg.textContent='Please enter a valid email.'; msg.style.color='#ffb3b3'; return false;}
  if(!/^\d{10}$/.test(mobile)){ msg.textContent='Mobile must be 10 digits.'; msg.style.color='#ffb3b3'; return false;}
  if(pass.length < 6){ msg.textContent='Password must be at least 6 characters.'; msg.style.color='#ffb3b3'; return false;}
  if(pass !== cpass){ msg.textContent='Passwords do not match.'; msg.style.color='#ffb3b3'; return false;}

  // demo success (no backend)
  msg.textContent = 'Registration successful (demo).';
  msg.style.color = '#b7ffb3';
  return false;
}

function handleLogin(e){
  e.preventDefault();
  const email = document.getElementById('lemail').value.trim();
  const pass = document.getElementById('lpass').value;
  const msg = document.getElementById('login-msg');

  if(email.length===0 || pass.length===0){ msg.textContent='Enter email and password.'; msg.style.color='#ffb3b3'; return false;}
  // demo login
  msg.textContent = 'Login demo successful (no backend).';
  msg.style.color = '#b7ffb3';
  return false;
}

/* small accessibility: keyboard nav center (if visible) */
const navCenter = document.querySelector('.nav-center');
if(navCenter){
  navCenter.addEventListener('keydown', (ev)=>{
    const focusable = Array.from(navCenter.querySelectorAll('a'));
    const idx = focusable.indexOf(document.activeElement);
    if(ev.key === 'ArrowRight') focusable[(idx+1)%focusable.length].focus();
    if(ev.key === 'ArrowLeft') focusable[(idx-1+focusable.length)%focusable.length].focus();
  });
}
