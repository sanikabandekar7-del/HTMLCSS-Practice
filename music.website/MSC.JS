// MSC.JS — populates carousels, handles forms and playlists
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Data ---------- */
/* keep your image paths as they are (img/...) */
const instruments = [
  {name:'Acoustic Guitar', price:'₹6,500', img:'img/acoustic guitar.png'},
  {name:'Electric Guitar', price:'₹14,200', img:'img/electric guitar.jpg'},
  {name:'Piano (Digital)', price:'₹45,000', img:'img/piano.png'},
  {name:'Violin', price:'₹9,300', img:'img/violin class.png'},
  {name:'Drum Set', price:'₹22,000', img:'img/drum set.png'}
];

const classes = [
  {title:'Vocal — Classical', type:'vocal', img:'img/vocal classical.jpg', hours:'20', price:'₹2,000', categories:['Classical','Opera']},
  {title:'Vocal — Pop', type:'vocal', img:'img/pop.webp', hours:'12', price:'Free', categories:['Pop','Indie']},
  {title:'Piano', type:'instrument', img:'img/piano.png', hours:'30', price:'₹4,500', categories:['Beginner','Technique']},
  {title:'Violin', type:'instrument', img:'img/violin class.png', hours:'25', price:'₹3,200', categories:['Intermediate','Orchestra']},
  {title:'Guitar', type:'instrument', img:'img/acoustic guitar.png', hours:'25', price:'₹3,000', categories:['Acoustic','Electric']}
];

const homeSongCats = [
  {type:'Pop', img:'img/pop.webp', playlists:['Top Pop 2024','Indie Pop Hits','Bollywood Pop Mix']},
  {type:'Classical', img:'img/vocal classical.jpg', playlists:['Beethoven Best','Indian Raag','Relaxing Strings']},
  {type:'Jazz', img:'img/jazz.webp', playlists:['Smooth Jazz','Night Jazz']},
  {type:'Electronic', img:'img/electronic music.webp', playlists:['EDM Anthems','Chill Electronic']}
];

/* ---------- Helpers ---------- */
function mkCardHTML(item){
  // supports instruments, classes, song categories
  return `<div class="card" ${item.playlists?`data-type="${item.type||item.type}" onclick="showHomePlaylists('${item.type}')"`:''}>
    <img src="${item.img}" alt="${item.name||item.title||item.type}">
    <h3>${item.name||item.title||item.type}</h3>
    <p>${item.price?item.price:(item.hours?("Hours: "+item.hours):'')}</p>
  </div>`;
}

function populateIfExists(id, items, mapper){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = '';
  items.forEach(i => el.insertAdjacentHTML('beforeend', mapper?mapper(i):mkCardHTML(i)));
}

/* ---------- Populate home carousels ---------- */
populateIfExists('instruments-carousel', instruments, i=>mkCardHTML(i));
populateIfExists('classes-carousel', classes, c=>mkCardHTML(c));
populateIfExists('home-songs-carousel', homeSongCats, c=>mkCardHTML(c));

/* ---------- Home playlists display ---------- */
function showHomePlaylists(type){
  const box = document.getElementById("home-playlists");
  if(!box) return;
  box.innerHTML = '';
  const cat = homeSongCats.find(c=>c.type===type);
  if(!cat) return;
  cat.playlists.forEach(p=>{
    box.insertAdjacentHTML('beforeend', `<div class="store-item"><div class="meta"><h3>${p}</h3><p>Playlist</p></div></div>`);
  });
  // scroll into view smoothly
  box.scrollIntoView({behavior:'smooth', block:'start'});
}

/* ---------- Store vertical list ---------- */
if(document.getElementById('store-list')){
  const map = instruments.map(i=>`<div class="store-item"><img src="${i.img}" alt="${i.name}"><div class="meta"><h3>${i.name}</h3><p>${i.price}</p><button class="btn-primary" onclick="alert('Buy demo — ${i.name}')">Buy</button></div></div>`).join('');
  document.getElementById('store-list').innerHTML = map;
}

/* ---------- Courses categories click ---------- */
if(document.getElementById('course-main-carousel')){
  populateIfExists('course-main-carousel', classes, c=>`<div class="card" data-title="${c.title}"><img src="${c.img}"><h3>${c.title}</h3><p>${c.price}</p></div>`);
  document.getElementById('course-main-carousel').addEventListener('click', (ev)=>{
    const card = ev.target.closest('.card');
    if(!card) return;
    const title = card.dataset.title;
    const course = classes.find(x=>x.title===title);
    if(course){
      const container = document.getElementById('course-categories');
      container.innerHTML = course.categories.map(cat=>`<div class="store-item"><div class="meta"><h3>${cat}</h3><p>Details: ${course.hours} • ${course.price}</p></div></div>`).join('');
    }
  });
}

/* ---------- Simple form validation handlers ---------- */
function handleRegister(e){
  e.preventDefault && e.preventDefault();
  const name = document.getElementById('rname')?.value?.trim();
  const email = document.getElementById('remail')?.value?.trim();
  const mobile = document.getElementById('rmobile')?.value?.trim();
  const pass = document.getElementById('rpass')?.value;
  const cpass = document.getElementById('rcpass')?.value;
  const msgEl = document.getElementById('reg-msg');

  const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if(!name){ msgEl.textContent='Enter your name'; msgEl.style.color='#ffb3b3'; return false;}
  if(!emailRe.test(email)){ msgEl.textContent='Please enter a valid email.'; msgEl.style.color='#ffb3b3'; return false;}
  if(!/^\d{10}$/.test(mobile)){ msgEl.textContent='Mobile must be 10 digits.'; msgEl.style.color='#ffb3b3'; return false;}
  if(pass.length < 6){ msgEl.textContent='Password must be at least 6 characters.'; msgEl.style.color='#ffb3b3'; return false;}
  if(pass !== cpass){ msgEl.textContent='Passwords do not match.'; msgEl.style.color='#ffb3b3'; return false;}

  msgEl.textContent = 'Registration successful (demo).';
  msgEl.style.color = '#b7ffb3';
  return false;
}

function handleLogin(e){
  e && e.preventDefault && e.preventDefault();
  const name = document.getElementById('lname')?.value?.trim();
  const email = document.getElementById('lemail')?.value?.trim();
  const pass = document.getElementById('lpass')?.value;
  const msgEl = document.getElementById('login-msg');

  if(!name){ msgEl.textContent = 'Enter your name'; msgEl.style.color='#ffb3b3'; return false; }
  if(!email || !pass){ msgEl.textContent = 'Fill all fields'; msgEl.style.color='#ffb3b3'; return false;}
  msgEl.textContent = 'Login successful (demo).';
  msgEl.style.color = '#b7ffb3';
  return false;
}

/* highlight active nav */
(function highlightNav(){ const links = document.querySelectorAll('.nav-link'); const file = window.location.pathname.split('/').pop(); links.forEach(a=>{ if(a.getAttribute('href')===file) a.classList.add('active'); else a.classList.remove('active'); }); })();




function enableFormEnterNavigation(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();  // stop form reload

                // If NOT last input → go to next
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    // Last input → submit
                    validateAndSubmit(formId);
                }
            }
        });
    });
}

function validateAndSubmit(formId) {
    const form = document.getElementById(formId);

    const name = form.querySelector("[name='name']")?.value.trim();
    const email = form.querySelector("[name='email']")?.value.trim();
    const phone = form.querySelector("[name='phone']")?.value.trim();
    const password = form.querySelector("[name='password']")?.value.trim();
    const confirm = form.querySelector("[name='confirm']")?.value.trim();

    // Email regex validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone validation (10 digits)
    const phonePattern = /^[0-9]{10}$/;

    // REGISTER FORM VALIDATION
    if (formId === "registerForm") {
        if (!name || !email || !phone || !password || !confirm) {
            alert("Please fill all fields.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Enter a valid email.");
            return;
        }

        if (!phonePattern.test(phone)) {
            alert("Phone number must be 10 digits.");
            return;
        }

        if (password !== confirm) {
            alert("Passwords do not match.");
            return;
        }

        alert("Registration Successful!");
    }

    // LOGIN FORM VALIDATION
    if (formId === "loginForm") {
        if (!name || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Enter a valid email.");
            return;
        }

        alert("Login Successful!");
    }
}

// Enable navigation for both forms (if they exist on the page)
window.onload = function () {
    if (document.getElementById("registerForm")) {
        enableFormEnterNavigation("registerForm");
    }
    if (document.getElementById("loginForm")) {
        enableFormEnterNavigation("loginForm");
    }
};
