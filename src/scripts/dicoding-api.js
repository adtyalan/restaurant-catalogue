import FavoriteRestoIdb from './favorite-resto-idb';
const { getResto, putResto, deleteResto } = FavoriteRestoIdb;
import getAllFavResto from './favorite-page';
// Base URL untuk API
const BASE_URL = 'https://restaurant-api.dicoding.dev';

const previousPage = '#/home'; // Default halaman asal adalah home
let actualPreviousPage = previousPage; // Simpan hash halaman asal
// Fungsi untuk mengupdate actualPreviousPage
function updatePreviousPage() {
  if (window.location.hash !== '#/detail' && window.location.hash !== '#detail-page') {
    actualPreviousPage = window.location.hash;
  }
}

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
  }
}

function displayRestaurants(restaurants) {
  const container = document.querySelector('.cardItem');
  container.innerHTML = ''; // Bersihkan kontainer

  restaurants.forEach((restaurant) => {
    const restaurantCard = document.createElement('div');
    restaurantCard.classList.add('childCard');

    restaurantCard.innerHTML = `
      <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}">
      <h3>${restaurant.name}</h3>
      <p>City: ${restaurant.city}</p>
      <div>
        <p>Rating: ⭐ ${restaurant.rating}</p>
        <button class="btn-orange detail-page-class" data-id="${restaurant.id}">Lebih lanjut</button>
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

async function showDetail(id) {
  showLoading(loading);
  try {
    const response = await fetch(`${BASE_URL}/detail/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    renderDetail(data.restaurant);

    // Periksa apakah restoran sudah ada di favorit
    const isFavorite = await getResto(data.restaurant.id);
    const favButton = document.getElementById('btn-fav-resto');
    if (isFavorite) {
      favButton.innerHTML = '<i class="fa-solid fa-heart"></i>'; // Solid heart
    } else {
      favButton.innerHTML = '<i class="fa-regular fa-heart"></i>'; // Outline heart
    }

    document
      .getElementById('btn-fav-resto')
      .addEventListener('click', function () {
        getResto(`${data.restaurant.id}`).then((restaurant) => {
          if (!restaurant) {
            // Add restaurant to favorites
            console.log(data.restaurant);
            putResto(data.restaurant).then(() => {
              console.log(
                `Restaurant ${data.restaurant.name} added to favorites.`
              );
              this.innerHTML =
                '<button id="btn-fav-resto" class="bg-primary"><i class="fa-solid fa-heart"></i></button>';
            });
            getAllFavResto();
          } else {
            // Remove restaurant from favorites
            deleteResto(data.restaurant.id).then(() => {
              console.log(
                `Restaurant ${data.restaurant.name} removed from favorites.`
              );
              this.innerHTML =
                '<button id="btn-fav-resto" class="bg-primary"><i class="fa-regular fa-heart"></i></button>';
            });
            getAllFavResto();
          }
        });
      });

    // Tampilkan halaman detail, sembunyikan halaman list
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('detail-page').style.display = 'flex';
    document.getElementById('hero').style.display = 'none';
    document.getElementById('WaregFoodReason').style.display = 'none';
    document.getElementById('favoriteContent').style.display = 'none';
    document.getElementsByTagName('footer')[0].style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'instant' });
  } catch (error) {
    console.error('Failed to fetch restaurant detail:', error);
    alert('Gagal memuat detail restoran');
  } finally {
    hideLoading(loading);
  }
}

function renderDetail(restaurant) {
  const detailContainer = document.getElementById('detail-page');

  let foodsHtml = '';
  restaurant.menus.foods.forEach((food) => {
    foodsHtml += `<div class="foods"><p>${food.name}</p></div>`;
  });

  let drinksHtml = '';
  restaurant.menus.drinks.forEach((drink) => {
    drinksHtml += `<div class="drinks"><p>${drink.name}</p></div>`;
  });

  let reviewsHtml = '';
  restaurant.customerReviews.forEach((review) => {
    reviewsHtml += ` <div class="review">
    <p><strong>${review.name}</strong> (${review.date}):</p>
    <p>${review.review}</p>
    </div> `;
  });

  detailContainer.innerHTML = `
    <div class="detail-header">
    <button id="btn-back-list"><i class="fa-solid fa-arrow-left"></i></button>
    <h2>Detail Restaurant</h2>
    <button id="btn-fav-resto">
    <i class="fa-regular fa-heart"></i>
    </button>
    </div>
    <h3>${restaurant.name}</h3>
    <div class="img-center-only"><img src="https://restaurant-api.dicoding.dev/images/medium/${
  restaurant.pictureId
}" alt="${restaurant.name}"></div>
    <p><strong>Address:</strong> ${restaurant.address}</p>
    <p><strong>City:</strong> ${restaurant.city}</p>
    <p><strong>Deskripsi:</strong> ${restaurant.description.substring(
    0,
    1000
  )}...</p>
    <p><center class="center-text-only"><strong>Menu Makanan:</strong></center> ${foodsHtml}</p>
    <p><center class="center-text-only"><strong>Menu Minuman:</strong></center> ${drinksHtml}</p>
    <p><center class="center-text-only"><strong>Customer Reviews:</strong></center> ${reviewsHtml}</p>
    <form id="add-review-form" class="form-add-review">
    <h3>Add review</h3>
      <div class="form-add-review">
        <label for="name-review">Enter your name: </label>
        <input type="text" name="name-review" id="name-review" required />
      </div>
      <div class="form-add-review">
        <label for="add-review">Enter your review: </label>
        <textarea name="add-review" id="add-review" required></textarea>
      </div>
      <div class="form-add-review">
        <input type="submit" value="Add comment" />
      </div>
    </form>
  `;

  document
    .getElementById('add-review-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
      const id = restaurant.id;
      const name = document.getElementById('name-review').value;
      const review = document.getElementById('add-review').value;
      const reviewData = { id: id, name: name, review: review };

      try {
        const response = await fetch(
          'https://restaurant-api.dicoding.dev/review',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Review submitted successfully:', result);
        alert('Review submitted successfully!');
      } catch (error) {
        console.error('Failed to submit review:', error);
        alert('Failed to submit review');
      }
    });

  document.getElementById('btn-back-list').addEventListener('click', () => {
    document.getElementById('detail-page').style.display = 'none';

    if (actualPreviousPage === '#/home') {
      document.getElementById('mainContent').style.display = 'block';
      document.getElementById('hero').style.display = 'flex';
      document.getElementById('WaregFoodReason').style.display = 'block';
      document.getElementsByTagName('footer')[0].style.display = 'block';
      window.location.hash = '#/home';
    } else if (actualPreviousPage === '#/favorite') {
      document.getElementById('favoriteContent').style.display = 'block';
      window.location.hash = '#/favorite';
      // Sembunyikan elemen lain jika perlu
    }
  });
}

const loading = document.getElementsByTagName('loading-bar')[0];

function showLoading(loading) {
  loading.style.display = 'flex';
}

function hideLoading(loading) {
  loading.style.display = 'none';
}

export { fetchRestaurants, displayRestaurants, showDetail, renderDetail };
export default updatePreviousPage;