import CONFIG from './config';

// edit this
const API_ENDPOINT = {
  LIST_RESTO: `${CONFIG.BASE_URL}list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  REVIEW: `${CONFIG.BASE_URL}review`,
  SEARCH_RESTO: (key) => `${CONFIG.BASE_URL}search?q=${key}`,
};

export default API_ENDPOINT;
