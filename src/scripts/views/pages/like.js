import FavoriteMovieIdb from '../../data/favoriteresto-idb';
import { createRestoItemTemplate, createErrorPageTemplate } from '../templates/template-creator';

const Like = {
  async render() {
    return `
    <main id="mainContent">
        <section class="content">
            <div class="latest">
                <div class="par-heading">
                    <span class="sub-heading">Favorite</span>
                    <h1 class="latest__label font_h2">Restaurant</h1>
                </div>
                <div class="posts" id="posts"></div>
            </div>
        </section>
    </main>
    `;
  },

  async afterRender() {
    const posts = await FavoriteMovieIdb.getAllResto();
    const postsContainer = document.querySelector('#posts');
    if (posts.length === 0) {
      document.querySelector('#contentHome').innerHTML = createErrorPageTemplate('Favorite Kosong');
      document.querySelector('.back').style.display = 'none';
    } else {
      posts.forEach((resto) => {
        postsContainer.innerHTML += createRestoItemTemplate(resto);
      });
      document.querySelector('.back').style.display = 'none';
    }
  },
};

export default Like;
