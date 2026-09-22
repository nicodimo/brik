// Elenco opere: cambia "src" quando carichi le tue immagini finali in img/,
// e aggiorna titolo/tecnica/nota con i dati reali.
const items = [
  { src: 'img/g1.jpg',  title: 'Senza titolo', medium: 'acquerello su carta', note: "[Nota per l'opera: aggiungere anno e dimensioni.]" },
  { src: 'img/g2.jpg',  title: 'Se finisce il mondo ho una pizza in freezer', medium: 'tecnica mista su carta', note: 'Un titolo trovato dentro il lavoro stesso, tra segno e scrittura.' },
  { src: 'img/g3.jpg',  title: 'Senza titolo', medium: 'tecnica mista su carta', note: "[Nota per l'opera: aggiungere anno e dimensioni.]" },
  { src: 'img/g4.jpg',  title: 'Senza titolo', medium: 'matita e acquerello su carta', note: "[Nota per l'opera: aggiungere anno e dimensioni.]" },
  { src: 'img/g5.jpg',  title: 'Senza titolo', medium: 'acquerello su carta', note: "[Nota per l'opera: aggiungere anno e dimensioni.]" },
  { src: 'img/g6.jpg',  title: 'Senza titolo', medium: 'china su carta', note: "[Nota per l'opera: aggiungere anno e dimensioni.]" },
  { src: 'img/g7.jpg',  title: 'Senza titolo', medium: 'acquerello su carta', note: "[Nota per l'opera: aggiungere anno e dimensioni.]" },
  { src: 'img/g8.jpg',  title: 'Senza titolo', medium: 'acquaforte su carta', note: "[Nota per l'opera: aggiungere anno e dimensioni.]" },
  { src: 'img/g9.jpg',  title: 'Senza titolo', medium: 'acquaforte su carta', note: "[Nota per l'opera: aggiungere anno e dimensioni.]" },
  { src: 'img/g10.jpg', title: "Da questa ci sta un secondo me c'è dell'altro", medium: 'china e acquerello su carta', note: "Un verso scritto a margine, parte integrante del disegno." },
];

const grid = document.getElementById('grid');
items.forEach((it, i) => {
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.innerHTML = `
    <button data-index="${i}" aria-label="Apri ${it.title}">
      <img src="${it.src}" alt="${it.title} — ${it.medium}, opera di Anna Maria Viggiano" loading="lazy">
    </button>
    <div class="tile-cap">${it.title} &middot; ${it.medium}</div>
  `;
  grid.appendChild(tile);
});

// Copertina
const cover = document.getElementById('cover');
const coverBtn = document.getElementById('coverBtn');
const nav = document.getElementById('siteNav');
coverBtn.addEventListener('click', () => {
  cover.classList.add('leaving');
  document.body.classList.remove('locked');
  nav.classList.add('show');
  setTimeout(() => { cover.style.display = 'none'; }, 1150);
});

// Reveal delle opere allo scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
document.querySelectorAll('.tile').forEach(el => io.observe(el));

// Mostra la nav anche se si scorre senza passare dal bottone (es. da tastiera)
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('show');
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbTitle = document.getElementById('lbTitle');
const lbMedium = document.getElementById('lbMedium');
const lbNote = document.getElementById('lbNote');
const lbIndex = document.getElementById('lbIndex');
let current = 0;

function openLb(i) {
  current = (i + items.length) % items.length;
  const it = items[current];
  lbImg.src = it.src;
  lbImg.alt = it.title;
  lbTitle.textContent = it.title;
  lbMedium.textContent = it.medium;
  lbNote.textContent = it.note;
  lbIndex.textContent = (current + 1) + ' / ' + items.length;
  lightbox.classList.add('open');
  document.body.classList.add('locked');
}
function closeLb() {
  lightbox.classList.remove('open');
  document.body.classList.remove('locked');
}

grid.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-index]');
  if (!btn) return;
  openLb(parseInt(btn.dataset.index, 10));
});

document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbPrev').addEventListener('click', () => openLb(current - 1));
document.getElementById('lbNext').addEventListener('click', () => openLb(current + 1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') openLb(current + 1);
  if (e.key === 'ArrowLeft') openLb(current - 1);
});
