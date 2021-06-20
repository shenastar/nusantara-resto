import UrlParser from '../../routes/url-parser';
import TheRestoDbSource from '../../data/restodb-source';
import { createRestoDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import ReviewerInitiator from '../../utils/reviewer-initiator';

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
    // eslint-disable-next-line no-restricted-globals
    const w = screen.width;
    // eslint-disable-next-line no-restricted-globals
    console.log(screen.width);
    detailContainer.innerHTML = createRestoDetailTemplate(detail.restaurant);
    console.log(detail.restaurant.customerReviews);
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
    ReviewerInitiator.init({
      reviewerContainer: document.querySelector('#contentReviews'),
      reviewer: detail.restaurant.customerReviews,
    });
  },
};

export default Detail;
