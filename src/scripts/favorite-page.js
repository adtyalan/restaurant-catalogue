import FavoriteRestoIdb from './favorite-resto-idb';
const { getAllResto } = FavoriteRestoIdb;
import { showDetail } from './dicoding-api';
import updatePreviousPage from './dicoding-api';

async function getAllFavResto() {
  const button = document.getElementById('btn-fav');
  button.addEventListener('click', () => {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('detail-page').style.display = 'none';
    document.getElementById('hero').style.display = 'none';
    document.getElementById('WaregFoodReason').style.display = 'none';
    document.getElementById('favoriteContent').style.display = 'block';
    document.getElementsByTagName('footer')[0].style.display = 'none';
    document.getElementById('drawers').setAttribute('class', 'off-canvas');
  });

  try {
    getAllResto().then((restaurants) => {
      displayFavRestaurants(restaurants);
    });
  } catch (error) {
    console.error('Failed to fetch restaurant data:', error);
    alert('Gagal memuat data');
  }
}

function displayFavRestaurants(restaurants) {
  const container = document.getElementById('favorite-page');
  container.setAttribute('class', 'cardItem');
  container.innerHTML = ''; // Bersihkan kontainer

  if (restaurants.length === 0) {
    container.setAttribute('style', 'grid-template-columns: 1fr;');
    container.innerHTML = `
      <div class="no-fav">
        <span class="h1-size-p"><i class="fa-solid fa-mug-hot"></i></span>
        <p>Your favs resto will appear here</p>
      </div>
    `;
    return;
  }

  restaurants.forEach((restaurant) => {
    const restaurantCard = document.createElement('div');
    restaurantCard.classList.add('childCard');

    restaurantCard.innerHTML = `
      <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}">
      <h3>${restaurant.name}</h3>
      <p>City: ${restaurant.city}</p>
      <div>
        <p>Rating: ⭐ ${restaurant.rating}</p>
        <button class="btn-orange" data-id="${restaurant.id}">Lebih lanjut</button>
      </div>
    `;

    container.appendChild(restaurantCard);
  });
  // Tambahkan event listener ke semua tombol setelah elemen dibuat
  const buttons = document.querySelectorAll('.btn-orange');
  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      updatePreviousPage();
      console.log(`actualPreviousPage yg tersimpan yaitu ${window.location.hash}`);
      window.location.hash = '#/detail'; // Set hash ke detail
      const restaurantId = this.getAttribute('data-id');
      showDetail(restaurantId);
    });
  });
}

export default getAllFavResto;