
import data from '../../public/data/DATA.json';
const restaurant = data.restaurants;

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

export default renderRestaurantList;
renderRestaurantList(restaurant);