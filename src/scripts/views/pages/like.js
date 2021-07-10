/* eslint-disable no-new */
import FavoriteRestoIdb from '../../data/favoriteresto-idb';
import FavoriteRestoSearchView from './liked-resto/search-view';
import FavoriteRestoShowPresenter from './liked-resto/show-presenter';
import FavoriteRestoSearchPresenter from './liked-resto/search-presenter';

const view = new FavoriteRestoSearchView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestoShowPresenter({ view, favoriteResto: FavoriteRestoIdb });
    new FavoriteRestoSearchPresenter({ view, favoriteResto: FavoriteRestoIdb });
  },
};

export default Like;
