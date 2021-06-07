import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (resto) => `
  <h2 class="detail__title">${resto.name}</h2>
  <img class="detail__poster" src="${CONFIG.S_IMAGE + resto.pictureId}" alt="${resto.name}" />
  <div class="detail__info">
  <h3>Information</h3>
    <h4>City</h4>
    <p>${resto.city}</p>
    <h4>Adress</h4>
    <p>${resto.address}</p>
    <h4>Rating</h4>
    <p>${resto.rating}</p>
  </div>
  <div class="detail__overview">
    <h3>Description</h3>
    <p>${resto.description}</p>
  </div>
`;

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
                <h1 class="post-item__title post-head__main"><a href="${`/#/detail/${resto.id}`}">${resto.name}</a></h1>
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

export {
  createRestoItemTemplate,
  createRestoDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
