import FavoriteRestoIdb from '../data/favorite-resto-idb';
const { getResto, putResto, deleteResto } = FavoriteRestoIdb;
import { loading, showLoading, hideLoading } from '../utils/show-loading';
import { BASE_URL } from './home-api.js';

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
          } else {
            // Remove restaurant from favorites
            deleteResto(data.restaurant.id).then(() => {
              console.log(
                `Restaurant ${data.restaurant.name} removed from favorites.`
              );
              this.innerHTML =
                '<button id="btn-fav-resto" class="bg-primary"><i class="fa-regular fa-heart"></i></button>';
            });
          }
        });
      });
    window.scrollTo({ top: 0, behavior: 'instant' });
  } catch (error) {
    console.error('Failed to fetch restaurant detail:', error);
    alert('Gagal memuat detail restoran');
  } finally {
    hideLoading(loading);
  }
}

function renderDetail(restaurant) {
  document.getElementsByTagName('main')[0].innerHTML = `
    <article>
      <section id="resto-detail"></section>
    </article>
    <button class="scroll-top-btn">
      <i class="fa-solid fa-angle-up"></i>
    </button>`;

  document.querySelector('.scroll-top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const detailContainer = document.getElementById('resto-detail');

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
    <div class="img-center-only">
    <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}"></div>
    <p><strong>Address:</strong> ${restaurant.address}</p>
    <p><strong>City:</strong> ${restaurant.city}</p>
    <p><strong>Deskripsi:</strong>
    ${restaurant.description.substring(
    0,
    1000)}...</p>
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

  document.getElementById('btn-back-list').addEventListener('click', () => {
    const prevRoute = sessionStorage.getItem('prevRoute') || '#/home';
    window.location.hash = prevRoute; // Navigasi ke rute sebelumnya
  });

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
}

export { showDetail, renderDetail };