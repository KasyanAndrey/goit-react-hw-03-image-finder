import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Modal from '../Modal';

import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModel = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { id, webformatURL, tags, largeImageURL } = this.props;

    return (
      <>
        <li className={s.ImageGalleryItem} key={id} onClick={this.toggleModel}>
          <img
            className={s.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
          />
        </li>
        {showModal && (
          <Modal onClose={this.toggleModel}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

// ImageGalleryItem.propTypes = {
//   id: PropTypes.number.isRequired,
//   webformatURL: PropTypes.string.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   onOpen: PropTypes.func.isRequired,
// };

export default ImageGalleryItem;
