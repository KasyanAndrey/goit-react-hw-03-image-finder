import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import s from './ImageGallery.module.css';

import Searchbar from '../Searchbar';
import imagesApi from '../../services';
import LoaderSpiner from '../Loader';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';

class ImageGallery extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleFormSubmit = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imagesApi
      .fetchImages(options)
      .then(images => {
        if (images.length === 0) {
          this.setState({ error: true });
          toast.error('Please enter a more correct request!');

          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

    return (
      <div className={s.Container}>
        <Searchbar onSubmit={this.handleFormSubmit} />
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
        {shouldRenderLoadMoreButton && (
          <LoadMoreButton onClick={this.fetchImages}></LoadMoreButton>
        )}
        <ToastContainer autoClose={3000} />
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
