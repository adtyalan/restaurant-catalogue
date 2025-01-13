import FavoriteRestoIdb from '../../data/favorite-resto-idb';
const { getResto, putResto, deleteResto } = FavoriteRestoIdb;

function likeButtonTemplate() {
  document
    .getElementById('btn-fav-resto')
    .addEventListener('click', async (event) => {
      const restaurantId = event.target.getAttribute('data-id'); // Gunakan `event.target` daripada `this`

      const restaurant = await getResto(restaurantId);
      if (!restaurant) {
      // Add restaurant to favorites
        await putResto(restaurantId);
        console.log(`Restaurant ${restaurantId} added to favorites.`);
        event.target.innerHTML =
        `<button id="btn-fav-resto" data-id="${restaurantId}"><i class="fa-regular fa-heart"></i></button>`;
      } else {
      // Remove restaurant from favorites
        await deleteResto(restaurantId);
        console.log(`Restaurant ${restaurantId} removed from favorites.`);
        event.target.innerHTML =
        `<button id="btn-fav-resto" data-id="${restaurantId}"><i class="fa-solid fa-heart"></i></button>`;
      }
    });
};

export default likeButtonTemplate;
