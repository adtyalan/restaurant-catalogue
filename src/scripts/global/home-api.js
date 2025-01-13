import { loading, showLoading, hideLoading } from '../utils/show-loading';
import { removeSkeleton } from '../utils/skeleton-ui';
const BASE_URL = 'https://restaurant-api.dicoding.dev';
import { showDetail } from './detail-api';

// Fungsi untuk mengambil data dari endpoint /list
async function fetchRestaurants() {
  showLoading(loading);
  try {
    const response = await fetch(`${BASE_URL}/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayRestaurants(data.restaurants);
  } catch (error) {
    console.error('Failed to fetch restaurant data:', error);
    alert('Gagal memuat data');
  } finally {
    hideLoading(loading);
    removeSkeleton();
  }
}

function displayRestaurants(restaurants) {
  const container = document.querySelector('.cardItem');
  container.innerHTML = ''; // Bersihkan kontainer

  restaurants.forEach((restaurant) => {
    const restaurantCard = document.createElement('div');
    restaurantCard.classList.add('childCard');

    restaurantCard.innerHTML = `
      <img width="330" data-src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}" class="lazyload skeleton-img-item">
      <h3>${restaurant.name}</h3>
      <p>City: ${restaurant.city}</p>
      <div>
        <p>Rating: ⭐ ${restaurant.rating}</p>
        <a href="#/detail/${restaurant.id}">
          <button class="btn-orange detail-page-class" data-id="${restaurant.id}">Lebih lanjut</button>
        </a>
      </div>
    `;

    container.appendChild(restaurantCard);
  });

  // Tambahkan event listener ke semua tombol setelah elemen dibuat
  const buttons = document.querySelectorAll('.btn-orange');
  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const restaurantId = this.getAttribute('data-id');
      showDetail(restaurantId);
    });
  });
}

export { BASE_URL, fetchRestaurants, displayRestaurants };