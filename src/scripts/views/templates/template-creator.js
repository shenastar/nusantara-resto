import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (resto) => {
  console.log(resto);
  let foods;
  let drinks;
  let categories;

  foods = '';
  drinks = '';
  categories = '';

  resto.menus.foods.forEach((food) => {
    foods += `<div><a href="">${food.name}</a></div>`;
  });
  resto.menus.drinks.forEach((drink) => {
    drinks += `<div><a href="">${drink.name}</a></div>`;
  });
  resto.categories.forEach((categorie) => {
    categories += `<a class="detail__categories" href="">${categorie.name}</a>`;
  });

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
      <div class="detail__info">
        <h4>City</h4>
        <p>${resto.city}</p>
        <h4>Adress</h4>
        <p>${resto.address}</p>
        <h4>Rating</h4>
        <p>${resto.rating}</p>
        <h4>Categories</h4>
        <div class="categories__margin">${categories}</div>
      </div>
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
        <div class="menu_content">
            <div class="par-heading">
                <span class="menu_subhead">Makanan</span>
            </div>
            <div class="menu_list">${foods}</div>
        </div>
        <div class="menu_content">
            <div class="par-heading">
                <span class="menu_subhead">Minuman</span>
            </div>
            <div class="menu_list">${drinks}</div>
        </div>
    </div>
    <div class="latest">
        <div class="par-heading">
            <span class="sub-heading">Reviews</span>
            <h1 class="latest__label font_h2">Customer</h1>
        </div>
    </div>
    <div class="reviews" id="contentReviews"></div>
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

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
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
            <span class="reviews_initial">${reviewer.name[0]}</span>
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
};
