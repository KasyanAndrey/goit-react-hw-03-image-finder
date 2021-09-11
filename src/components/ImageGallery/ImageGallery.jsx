import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import PropTypes from 'prop-types';

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

    fetchAPI
      .queryApi(this.props.searchQuery, page)
      .then(response =>
        this.setState({ images: response?.hits, isLoading: true }),
      )
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const { page } = this.state.page;

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
    this.setState({ isLoading: true });

    return fetchAPI
      .queryApi(this.props.searchQuery, this.state.page)
      .then(newImages =>
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
            {images.map(image => (
              <ImageGalleryItem
                key={uuidv4()}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                tags={image.tags}
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

// ImageGallery.propTypes = {
//   searchQuery: PropTypes.array.isRequired,
//   onOpen: PropTypes.func.isRequired,
// };

export default ImageGallery;
// onOpen={this.toggleModal}

/* ({ searchQuery, onOpen }) */

/*  
  showModal: false,
    largeImageURL: null,
  
  */
