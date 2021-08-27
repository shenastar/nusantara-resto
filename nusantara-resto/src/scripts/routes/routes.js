import Home from '../views/pages/home';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';
import Search from '../views/pages/search';

const routes = {
  '/': Home, // default page
  '/detail/:id': Detail,
  '/like': Like,
  '/search/:id/:key': Search,
};

export default routes;
