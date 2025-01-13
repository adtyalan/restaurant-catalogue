import showHomePage from '../views/pages/home-page';
import showFavoritePage from '../views/pages/favorite-page';
import showDetailPage from '../views/pages/detail-page';

const routes = {
  '/': () => showHomePage(), // default page
  '/home': () => showHomePage(),
  '/favorite': () => showFavoritePage(),
  '/detail/:id': (id) => showDetailPage(id),
};

export default routes;