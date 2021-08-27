import UrlParser from '../../routes/url-parser';
import TheRestoDbSource from '../../data/restodb-source';
import { createRestoDetailTemplate, createErrorPageTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import ReviewerInitiator from '../../utils/reviewer-initiator';
import NewReviewer from '../../utils/new-reviewer';
import FavoriteRestoIdb from '../../data/favoriteresto-idb';

const Detail = {
  async render() {
    return `
    <main id="mainContent">
      <section id="detail" class="content"></section>
      <div id="likeButtonContainer"></div>
    </main>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const detail = await TheRestoDbSource.detailResto(url.id);
      if (detail.error) {
        throw detail.message;
      } else {
        const detailContainer = document.querySelector('#detail');
        detailContainer.innerHTML = createRestoDetailTemplate(detail.restaurant);
        LikeButtonInitiator.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          favoriteResto: FavoriteRestoIdb,
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
          nextButton: document.querySelector('.fa-angle-right'),
          prevButton: document.querySelector('.fa-angle-left'),
          indexSlide: document.querySelector('#indexSlide'),
        });
        NewReviewer.init({
          id: detail.restaurant.id,
          button: document.querySelector('#btnReview'),
        });
      }
    } catch (err) {
      document.querySelector('#mainContent').innerHTML = createErrorPageTemplate(err);
    } finally {
      document.querySelector('.back').style.display = 'none';
    }
  },
};

export default Detail;
