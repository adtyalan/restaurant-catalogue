import FavoriteRestoIdb from './favorite-resto-idb';
const { getResto, putResto, deleteResto } = FavoriteRestoIdb;

function likeButtonTemplate() {
  document
    .getElementById('btn-fav-resto')
    .addEventListener('click', function () {
      const restaurantId = this.getAttribute('data-id');

      getResto(restaurantId).then((restaurant) => {
        if (!restaurant) {
          // Add restaurant to favorites
          putResto(restaurantId).then(() => {
            console.log(`Restaurant ${restaurantId} added to favorites.`);
            this.innerHTML =
              '<button id="btn-fav-resto" data-id="${restaurant.id}"><i class="fa-regular fa-heart"></i></button>';
          });
        } else {
          // Remove restaurant from favorites
          deleteResto(restaurantId).then(() => {
            console.log(`Restaurant ${restaurantId} removed from favorites.`);
            this.innerHTML =
              '<button id="btn-fav-resto" data-id="${restaurant.id}"><i class="fa-solid fa-heart"></i></button>';
          });
        }
      });
    });
}

export default likeButtonTemplate;
