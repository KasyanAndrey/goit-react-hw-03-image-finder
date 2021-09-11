import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import PropTypes from 'prop-types';

import LoaderSpiner from '../Loader';
import fetchAPI from '../../services';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';

import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
  };

  componentDidMount() {
    const { page } = this.state;
    const { searchQuery } = this.props;

    fetchAPI
      .queryApi(searchQuery, page)
      .then(response =>
        this.setState({ images: response?.hits, isLoading: true }),
      )
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;

    const prevQuery = prevProps.searchQuery;
    const nextQuery = searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ isLoading: true, images: [] });

      fetchAPI.queryApi(nextQuery, page).then(newImages =>
        this.setState(({ page }) => ({
          images: newImages.hits,
          page: page,
          isLoading: false,
        })),
      );
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleLoadMore = () => {
    const { searchQuery } = this.props;
    const { page } = this.state;

    this.setState({ isLoading: true });

    return fetchAPI.queryApi(searchQuery, page).then(newImages =>
      this.setState(({ images, page }) => ({
        images: [...images, ...newImages.hits],
        page: page + 1,
        isLoading: false,
      })),
    );
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <div className={s.Container}>
        {' '}
        {images && (
          <ul className={s.ImageGallery}>
            {images.map(({ webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={uuidv4()}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </ul>
        )}
        {isLoading && <LoaderSpiner />}
        {images.length > 0 && (
          <LoadMoreButton onClick={this.handleLoadMore}> </LoadMoreButton>
        )}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
};

export default ImageGallery;
