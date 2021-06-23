import CONFIG from './config';

// edit this
const API_ENDPOINT = {
  NOW_PLAYING: `${CONFIG.BASE_URL}movie/now_playing?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  UPCOMING: `${CONFIG.BASE_URL}movie/upcoming?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  LIST_RESTO: `${CONFIG.BASE_URL}list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  REVIEW: `${CONFIG.BASE_URL}review`,
  SEARCH_RESTO: (key) => `${CONFIG.BASE_URL}search?q=${key}`,
};

export default API_ENDPOINT;
