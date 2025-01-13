import { fetchRestaurants } from '../../global/home-api';
import dataSVG from '../template/reason-component';

function showHomePage() {
  document.getElementsByTagName('main')[0].innerHTML = `
    <article id="hero">
        <h2 class="hidden-header">Header 2</h2>
        <section id="heroContainer" class="heroContainer">
          <h3 class="hidden-header">Header 3</h3>
          <div class="text-container">
            <p class="h1-size-p"><i class="fa-solid fa-bowl-food"></i></p>
            <p class="h2-size-p">Hungry? Open WaregFood!</p>
            <p class="h3-size-p">
              Discover your favorite restaurant from your preferred locations on
              our website. It’s as smooth as using an app. There are countless
              restaurants to try.
            </p>
            <div class="welcome-container">
              <label for="search" class="hidden-header"></label>
              <input
                id="search"
                name="search"
                type="text"
                aria-label="type your search keyword"
              />
              <button>
                <i
                  class="fa-solid fa-magnifying-glass"
                  aria-label="search button"
                ></i>
              </button>
            </div>
          </div>
        </section>
      </article>

      <article id="mainContent" class="skeleton-img-container">
        <h2>Explore Restaurant</h2>
        <section class="cardItem">
          <h3 class="hidden-header">Header 3</h3>
        </section>
      </article>

      <article id="WaregFoodReason">
        <h2>Why use the WaregFood?</h2>
        <section class="cardItemReason">
          <h3 class="hidden-header">Header 3</h3>
        </section>
      </article>
      <button class="scroll-top-btn">
        <i class="fa-solid fa-angle-up"></i>
      </button>`;

  const heroContainer = document.getElementById('heroContainer');
  const heroTemplate = `
    <picture style="display: grid; grid-area: 1 / 1 / 2 / 2; width: 100%;"> 
        <source media="(max-width: 560px)" srcset="./images/heros/hero-image_4-small.jpg">
        <img src='./images/heros/hero-image_4-large.jpg' alt="Hero image" class="heroImage">
    </picture>`;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = heroTemplate.trim();
  heroContainer.prepend(tempDiv.firstElementChild);

  document.querySelector('.scroll-top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  fetchRestaurants();

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
}

export default showHomePage;