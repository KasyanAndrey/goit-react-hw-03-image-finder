const API_KEY = '20167067-fa9a23327fba47dd7ecb29229';
const BASE_URL = 'https://pixabay.com/api/';
const BASE_PAGE = 1;

function queryApi(query) {
  return fetch(
    `${BASE_URL}?q=${query}&page=${BASE_PAGE}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No pictures with title ${query}`));
  });
}

const api = {
  queryApi,
};

export default api;

// const API_KEY = '20167067-fa9a23327fba47dd7ecb29229';
// const BASE_URL = 'https://pixabay.com/api/';

/* https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12
Pixabay API поддерживает пагинацию, по умолчанию параметр page равен 1. 
Пусть в ответе приходит по 12 объектов, установлено в параметре per_page. 
Не забудь что при поиске по новому ключевому слову, необходимо сбрасывать значение page в 1.

В ответе от апи приходит массив объектов, в которых тебе интересны только следущие свойства.

id - уникальный идентификатор
webformatURL - ссылка на маленькое изображение для списка карточек
largeImageURL - ссылка на большое изображение для модального окна */
