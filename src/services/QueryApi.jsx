const API_KEY = '20167067-fa9a23327fba47dd7ecb29229';
const BASE_URL = 'https://pixabay.com/api/';

function queryApi(searchQuery, page=1) {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => response.json());
}

const api = {
  queryApi,
};

export default api;
