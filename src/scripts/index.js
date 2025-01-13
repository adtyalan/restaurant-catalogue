import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import swRegister from './utils/sw-register';
import './views/template/loading-component';
import router from './routes/url-parser';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

window.addEventListener('load', () => {
  router();
  swRegister();
});

window.addEventListener('hashchange', () => {
  updateSkipLink();
  router();
});

document.addEventListener('DOMContentLoaded', () => {
  updateSkipLink();
  showDrawer();
});

function updateSkipLink() {
  const currentHash = window.location.hash;
  const skipLink = document.getElementById('skip-link');

  skipLink.addEventListener('click', () => {
    skipLink.blur(); // Menghapus focus dari elemen 'skip-link'
    document.body.focus(); // Alternatif: Pindahkan focus ke elemen lain, contohnya body
  });

  if (currentHash.match(/^#\/detail\/[\w-]+$/)) {
    // Jika URL cocok dengan pola #/detail/:id
    skipLink.href = '#/resto-detail';
    skipLink.textContent = 'Menuju isi detail';
  } else {
    switch (currentHash) {
    case '#/home':
      skipLink.href = '#/mainContent';
      skipLink.textContent = 'Menuju konten utama';
      break;
    case '#/favorite':
      skipLink.href = '#/favoriteContent';
      skipLink.textContent = 'Menuju isi daftar favorit';
      break;
    default:
      skipLink.href = '#mainContent';
      skipLink.textContent = 'Menuju konten utama';
      break;
    }
  }
}


function showDrawer() {
  const drawerToggle = document.getElementById('drawerBtn');
  const drawer = document.getElementById('drawers');

  drawerToggle.addEventListener('click', () => {
    if (!drawer.classList.contains('open')) {
      drawer.classList.add('open');
    } else {
      drawer.classList.remove('open');
    }
  });
}

const drawer = document.getElementById('drawers');
const favBtn = document.getElementById('btn-fav');
const homeBtn = document.getElementById('btn-home');
homeBtn.addEventListener('click', () => {
  drawer.classList.remove('open');
});
favBtn.addEventListener('click', () => {
  drawer.classList.remove('open');
});