import UrlParser from '../../routes/url-parser';
import TheRestoDbSource from '../../data/restodb-source';
import { createRestoDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="detail" class="detail"></div>
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
      detail: {
        id: detail.id,
        title: detail.title,
        overview: detail.overview,
        backdrop_path: detail.backdrop_path,
        vote_average: detail.vote_average,
      },
    });
  },
};

export default Detail;
