import getAllFavResto from '../../global/favorite-api';

function showFavoritePage() {
  document.getElementsByTagName('main')[0].innerHTML =`
  <article id="favoriteContent">
    <h2>Favorites Resto</h2>
    <section id="favorite-page"></section>
  </article>
  <button class="scroll-top-btn">
    <i class="fa-solid fa-angle-up"></i>
  </button>
  `;

  document.querySelector('.scroll-top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  getAllFavResto();
}

export default showFavoritePage;