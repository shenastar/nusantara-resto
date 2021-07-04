import UrlParser from '../../routes/url-parser';
import RestoDbSource from '../../data/restodb-source';
import { createRestoItemTemplate, createErrorPageTemplate } from '../templates/template-creator';

const Search = {
  async render() {
    return `
    <main id="mainContent">
      <section class="content">
          <div class="latest">
              <div class="par-heading">
                  <span class="sub-heading">Explore</span>
                  <h1 class="latest__label font_h2">Restaurant</h1>
              </div>
              <div class="posts" id="posts"></div>
          </div>
      </section>
    </main>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const posts = await RestoDbSource.searchResto(url.key);
      const postsContainer = document.querySelector('#posts');
      const newId = (url.id[0].toUpperCase() + url.id.substring(1)).replace(/%20/g, ' ');
      const newKey = (url.key[0].toUpperCase() + url.key.substring(1)).replace(/%20/g, ' ');
      document.querySelector('.sub-heading').innerHTML = newId;
      document.querySelector('.latest__label').innerHTML = newKey;
      if (posts.error) {
        throw posts.message;
      } else {
        posts.restaurants.forEach((resto) => {
          postsContainer.innerHTML += createRestoItemTemplate(resto);
        });
      }
    } catch (err) {
      document.querySelector('#mainContent').innerHTML = createErrorPageTemplate(err);
    } finally {
      document.querySelector('.back').style.display = 'none';
    }
  },
};

export default Search;
