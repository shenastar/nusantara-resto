import RestoDbSource from '../../data/restodb-source';
import { createRestoItemTemplate, createErrorPageTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="hero">
        <div class="hero__inner">
          <h1 class="hero__title font_h1">Nusantara Resto</h1>
          <p class="hero__tagline">Temukan restoran kesukaanmu di seluruh Nusantara</p>
        </div>
    </div>
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
      const posts = await RestoDbSource.listResto();
      const postsContainer = document.querySelector('#posts');
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

export default Home;
