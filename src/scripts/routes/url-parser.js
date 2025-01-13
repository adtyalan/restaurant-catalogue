import routes from './routes-spa';

function router() {
  const hash = window.location.hash || '#/';

  // Daftar hash yang tidak perlu disimpan atau diarahkan
  const ignoredRoutes = ['#/favoriteContent', '#/mainContent', '#/resto-detail'];

  if (!ignoredRoutes.includes(hash)) {
    // Simpan rute saat ini sebagai `prevRoute` sebelum berpindah rute, jika bukan rute yang diabaikan
    const currentRoute = sessionStorage.getItem('currentRoute') || '#/home';
    sessionStorage.setItem('prevRoute', currentRoute);
    sessionStorage.setItem('currentRoute', hash);
  }

  const matchedRoute = Object.keys(routes).find((route) => {
    if (route.includes(':')) {
      const baseRoute = route.split('/:')[0];
      return hash.startsWith(`#${baseRoute}`);
    }
    return `#${route}` === hash;
  });

  if (matchedRoute) {
    if (matchedRoute.includes(':')) {
      const paramValue = hash.split('/')[2]; routes[matchedRoute](paramValue); // Panggil fungsi dengan parameter
    } else {
      routes[matchedRoute](); // Panggil fungsi tanpa parameter
    }
  } else if (!ignoredRoutes.includes(hash)) {
    routes['/'](); // Default ke Home jika tidak cocok
  }
}

export default router;