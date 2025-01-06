import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import heroImage from '../public/images/heros/hero-image_4.jpg';
import data from '../public/data/DATA.json';
import { fetchRestaurants } from './dicoding-api';
import getAllFavResto from './favorite-page';
import swRegister from './sw-register';
import './loading-component';
import updatePreviousPage from './dicoding-api';
import illustration1 from '../public/images/illustrations/DrawKit-cooking-kitchen-food-vector-illustrations-01.svg';
import illustration2 from '../public/images/illustrations/DrawKit-cooking-kitchen-food-vector-illustrations-02.svg';
import illustration3 from '../public/images/illustrations/DrawKit-cooking-kitchen-food-vector-illustrations-03.svg';

const dataSVG = {
  reasonWhyWaregFood: [
    {
      illustration: illustration1,
      title: 'Using verified data from GMaps.',
    },
    {
      illustration: illustration2,
      title: 'Please offer a variety of options that fit your preferences!',
    },
    {
      illustration: illustration3,
      title: 'No more "Makan dimana? Terserah."',
    },
    {
      illustration: illustration1,
      title: "Discover new foods that you haven't yet tried!",
    },
  ],
};

const restaurant = data.restaurants;

const heroImg = document.createElement('img');
heroImg.src = heroImage;
heroImg.alt = 'Hero Image';
heroImg.classList.add('heroImage');

document.getElementById('heroContainer').prepend(heroImg);

window.addEventListener('load', () => {
  swRegister();
});

window.addEventListener('hashchange', () => {
  updateSkipLink();
  updatePreviousPage();
});

document.addEventListener('DOMContentLoaded', () => {
  updateSkipLink();
  renderRestaurantList(restaurant);
  fetchRestaurants();
  getAllFavResto();
  showDrawer();
});

document.querySelector('.scroll-top-btn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function updateSkipLink() {
  const currentHash = window.location.hash;
  const skipLink = document.getElementById('skip-link');

  switch (currentHash) {
  case '#/home':
    skipLink.href = '#mainContent';
    skipLink.textContent = 'Menuju konten utama';
    break;
  case '#/detail':
    skipLink.href = '#detail-page';
    skipLink.textContent = 'Menuju isi detail';
    break;
  case '#/favorite':
    skipLink.href = '#favoriteContent';
    skipLink.textContent = 'Menuju isi daftar favorit';
    break;
  default:
    skipLink.href = '#mainContent';
    skipLink.textContent = 'Menuju konten utama';
    break;
  }

  skipLink.addEventListener('click', () => {
    // if (window.location.hash === '#mainContent') {
    //   console.log(`Skip link clicked, current hash: ${window.location.hash}`);
    //   window.location.hash = '#home';
    // } else if (window.location.hash === '#detail-page') {
    //   console.log(`Skip link clicked, current hash: ${window.location.hash}`);
    //   window.location.hash = '#detail';
    // } else if (window.location.hash === '#favoriteContent') {
    //   console.log(`Skip link clicked, current hash: ${window.location.hash}`);
    //   window.location.hash = '#favorite';
    // }
    updatePreviousPage();
  });
}

function showDrawer() {
  const drawerToggle = document.getElementById('drawerBtn');
  const drawer = document.getElementById('drawers');

  drawerToggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  const homeBtn = document.getElementById('btn-home');
  homeBtn.addEventListener('click', () => {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('detail-page').style.display = 'none';
    document.getElementById('hero').style.display = 'flex';
    document.getElementById('WaregFoodReason').style.display = 'block';
    document.getElementById('favoriteContent').style.display = 'none';
    document.getElementsByTagName('footer')[0].style.display = 'block';
    document.getElementById('drawers').setAttribute('class', 'off-canvas');
  });
}

function createRestaurantItem(restaurant) {
  const item = document.createElement('div');
  item.setAttribute('tabindex', '0');
  item.classList.add('childCard');

  item.innerHTML = `
      <img src="${restaurant.pictureId}" alt="${restaurant.name}" class="cardImage" alt="Restaurant photo">
      <p class="rating">⭐️ ${restaurant.rating}</p>
      <div class="cardContent">
        <p> ${restaurant.city}</p>
        <h4 class="cardTitle">${restaurant.name}</h4>
      </div>
    `;

  return item;
}

function renderRestaurantList(restaurant) {
  const list = document.querySelector('.cardItem');
  restaurant.forEach((a) => {
    list.appendChild(createRestaurantItem(a));
  });
}

// Code untuk menampilkan SVG di HTML
const list = document.querySelector('.cardItemReason');
dataSVG.reasonWhyWaregFood.forEach((item) => {
  const container = document.createElement('div');
  container.classList.add('childCardReason');

  container.innerHTML = `
  <img src="${item.illustration}" alt="${item.title}" class="cardImageReason">
  <p> ${item.title}</p>
  `;

  list.appendChild(container);
});
