import CONFIG from '../../globals/config';
import 'lit';
import './info-section';
import './menus-food';
import './menus-drink';
import './review-section';
// import 'notyf/notyf.min.css';

const createRestoDetailTemplate = (resto) => {
  let foods = JSON.stringify(resto.menus.foods);
  let drinks = JSON.stringify(resto.menus.drinks);
  let info = JSON.stringify(resto);
  return `
    <div class="latest">
      <div class="par-heading">
        <span class="sub-heading">${resto.city}</span>
        <h1 class="latest__label font_h2">${resto.name}</h1>
        <div class="divider"></div>
      </div>
    </div>
    <div class="detail">
      <img class="detail__poster" src="${CONFIG.S_IMAGE + resto.pictureId}" alt="${resto.name}" />
      <info-section resto='${info}'></info-section>
      <div class="detail__description">
        <h3>Description</h3>
        <p>${resto.description}</p>
      </div>
    </div>
    <div class="latest">
      <div class="par-heading">
          <span class="menu_heading">~ Menu ~</span>
      </div>
    </div>
    <div class="menu">
        <menus-food foods='${foods}'></menus-food>
        <menus-drink drinks='${drinks}'></menus-drink>
    </div>
    <div class="latest">
        <div class="par-heading">
            <span class="sub-heading">Reviews</span>
            <h1 class="latest__label font_h2">Customer</h1>
        </div>
    </div>
    <review-section></review-section>
  `;
};

const createRestoItemTemplate = (resto) => {
  const rating = resto.rating.toFixed(1);
  return `
    <article class="post-item">
        <img class="post-item__thumbnail" src="${CONFIG.S_IMAGE + resto.pictureId}"
            alt="gambar-${resto.name}">
        <div class="post-item__content">
            <p class="post-item__date">${resto.city}</p>
            <div class="post-item__head">
                <p class="post-item__date">${resto.city}</p>
                <h1 class="post-item__title"><a href="${`/#/detail/${resto.id}`}">${resto.name}</a></h1>
            </div>
            <div class="post-item__rating">
                <span class="material-icons rating-icon">star_rate</span>
                <p class="rating-text">${rating}</p>
            </div>
            <p class="post-item__description">${resto.description}</p>
        </div>
    </article>
  `;
};

const createErrorPageTemplate = (message) => `
  <section class="content">
      <div class="error">
          <div class="par-heading">
              <h1 class="latest__label font_h2">${message}</h1>
          </div>
      </div>
  </section>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fas fa-heart" aria-hidden="true"></i>
  </button>
`;

const createReviewerTemplate = (reviewer) => `
  <div class="reviews_content mySlides">
    <div class="reviews_customer">
        <div class="reviews_data">
            <h4>${reviewer.name}</h4>
            <p>${reviewer.date}</p>
        </div>
        <div class="reviews_circle">
            <span class="reviews_initial">${reviewer.name[0].toUpperCase()}</span>
        </div>
    </div>
    <div class="divider"></div>
    <div class="reviews_des">
        <p>"${reviewer.review}"</p>
    </div>
  </div>
`;

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createReviewerTemplate,
  createErrorPageTemplate,
};
