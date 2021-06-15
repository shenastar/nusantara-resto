import UrlParser from '../../routes/url-parser';
import TheRestoDbSource from '../../data/restodb-source';
import { createRestoDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <section id="detail" class="content"></section>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await TheRestoDbSource.detailResto(url.id);
    const detailContainer = document.querySelector('#detail');
    detailContainer.innerHTML = createRestoDetailTemplate(detail.restaurant);
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: {
        id: detail.restaurant.id,
        name: detail.restaurant.name,
        city: detail.restaurant.city,
        pictureId: detail.restaurant.pictureId,
        rating: detail.restaurant.rating,
        description: detail.restaurant.description,
      },
    });
  },
};

export default Detail;
