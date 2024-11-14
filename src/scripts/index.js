import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import heroImage from '../public/images/heros/hero-image_4.jpg';
import data from '../public/data/DATA.json';

import illustration1 from '../public/images/illustrations/DrawKit-cooking-kitchen-food-vector-illustrations-01.svg';
import illustration2 from '../public/images/illustrations/DrawKit-cooking-kitchen-food-vector-illustrations-02.svg';
import illustration3 from '../public/images/illustrations/DrawKit-cooking-kitchen-food-vector-illustrations-03.svg';

const dataSVG = {
  reasonWhyWaregFood: [
    {
      illustration: illustration1,
      title: "Using GMaps verified data",
    },
    {
      illustration: illustration2,
      title: "Provide many choices that suits you!",
    },
    {
      illustration: illustration3,
      title: "No more \"Makan dimana? Terserah.\"",
    },
    {
      illustration: illustration1,
      title: "Explore food you haven't tried!",
    },
  ],
};

const restaurant = data.restaurants;

const heroImg = document.createElement('img');
heroImg.src = heroImage;
heroImg.alt = 'Hero Image';
heroImg.classList.add('heroImage');
heroImg.setAttribute('alt', 'Hero Image');
const headerSection = document.getElementById('heroContainer');
headerSection.prepend(heroImg);

const drawerToggle = document.getElementById("drawerBtn");
const drawer = document.getElementById("drawers");

drawerToggle.addEventListener("click", () => {
  drawer.classList.toggle("open");
});

document.addEventListener('DOMContentLoaded', () => {
    renderRestaurantList(restaurant);
});

function createRestaurantItem(restaurant) {
    const item = document.createElement('div');
    item.setAttribute("tabindex", "0");
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
};

function renderRestaurantList(restaurant) {
    const list = document.querySelector('.cardItem');
    restaurant.forEach((a) => {
      list.appendChild(createRestaurantItem(a));
    });
}

// Code untuk menampilkan SVG di HTML
const list = document.querySelector('.cardItemReason');
dataSVG.reasonWhyWaregFood.forEach(item => {
  const container = document.createElement('div');
  container.classList.add('childCardReason');
  
  container.innerHTML = `
  <img src="${item.illustration}" alt="${item.title}" class="cardImageReason">
  <p> ${item.title}</p>
  `;

  list.appendChild(container);
});