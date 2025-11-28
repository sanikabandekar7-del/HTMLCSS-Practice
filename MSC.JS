// Basic dynamic data and interactivity
const instruments = [
{name:'Acoustic Guitar', price:'$299', img:'https://picsum.photos/seed/guitar/400/300'},
{name:'Electric Guitar', price:'$499', img:'https://picsum.photos/seed/electric/400/300'},
{name:'Piano', price:'$2500', img:'https://picsum.photos/seed/piano/400/300'},
{name:'Violin', price:'$349', img:'https://picsum.photos/seed/violin/400/300'},
{name:'Drum Set', price:'$799', img:'https://picsum.photos/seed/drum/400/300'},
{name:'Saxophone', price:'$699', img:'https://picsum.photos/seed/sax/400/300'}
];

const classes = [
{type:'Vocal', categories:['Classical','Pop','Jazz']},
{type:'Instruments', categories:['Piano','Guitar','Violin']},
{type:'Production', categories:['DAW Basics','Mixing']}
];

const songTypes = [
{type:'Pop', playlists:['Today's Hits','Top 40','Acoustic Pop']},
{type:'Jazz', playlists:['Smooth Jazz','Jazz Classics','Instrumental Jazz']},
{type:'Classical', playlists:['Baroque Hour','Symphonies','Chamber Music']},
{type:'Rock', playlists:['Classic Rock','Indie Rock','Hard Rock']}
];

// Helpers to render
function el(tag, className){ const e = document.createElement(tag); if(className) e.className = className; return e }

function populateBuy(){
const container = document.getElementById('buy-carousel');
instruments.forEach(i=>{
const card = el('div','card');
const img = document.createElement('img'); img.src = i.img; img.alt = i.name;
const h = el('h4'); h.textContent = i.name;
const p = el('p','price'); p.textContent = i.price;
card.append(img,h,p);
container.appendChild(card);
});
}

function populateClasses(){
const container = document.getElementById('classes-carousel');
classes.forEach(c=>{
const card = el('div','card detail-popup');
const img = document.createElement('img'); img.src = `https://picsum.photos/seed/${c.type}/400/300`; img.alt = c.type;
const h = el('h4'); h.textContent = c.type;
const details = el('div','details');
details.innerHTML = `<strong>Categories</strong><ul>${c.categories.map(x=>`<li>${x}</li>`).join('')}</ul>`;
card.append(img,h,details);
container.appendChild(card);
});
}

function populateSongs(){
const container = document.getElementById('song-types');
songTypes.forEach(s=>{
const card = el('div','card')