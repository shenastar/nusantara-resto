import FavoriteMovieIdb from '../../data/favoriteresto-idb';
import { createRestoItemTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
    <section class="content">
      <div class="latest">
          <div class="par-heading">
              <span class="sub-heading">Favorite</span>
              <h1 class="latest__label font_h2">Restaurant</h1>
          </div>
          <div class="posts" id="posts"></div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const posts = await FavoriteMovieIdb.getAllResto();
    const postsContainer = document.querySelector('#posts');
    posts.forEach((resto) => {
      postsContainer.innerHTML += createRestoItemTemplate(resto);
    });
  },
};

export default Like;
