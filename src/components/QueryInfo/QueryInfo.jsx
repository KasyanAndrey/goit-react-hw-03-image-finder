import React, { Component } from 'react';
// import fetchQuery from '../../services/servicesApi';
import QueryErrorView from './QueryErrorView';
import ImageGallery from '../ImageGallery';
import QueryPending from '../Loader';

class QueryInfo extends Component {
  state = {
    images: null,
    apiKey: '20167067-fa9a23327fba47dd7ecb29229',
    url: 'https://pixabay.com/api/',
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(
          `${this.state.url}?q=${nextQuery}&page=${this.state.page}&key=${this.state.apiKey}&image_type=photo&orientation=horizontal&per_page=12`,
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }

            return Promise.reject(
              new Error(`No pictures with title ${nextQuery}`),
            );
          })
          .then(data => data.hits)
          .then(images => this.setState({ images, status: 'resolved' }))
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 1000);
    }
  }

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return <QueryPending />;
    }

    if (status === 'rejected') {
      return <QueryErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return <ImageGallery images={images} />;
    }
  }
}

export default QueryInfo;

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

// ===============================================================
/* render() {
    const { images, loading, error } = this.state;
    return (
      <div>
        {error && <h2>{error.message}</h2>}
        {loading && <div>Loading...</div>}
        {images && (
          <ul>
            {images.map(({ id, webformatURL, tags }) => {
              return (
                <li key={id}>
                  <img src={webformatURL} alt={tags} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  } */
