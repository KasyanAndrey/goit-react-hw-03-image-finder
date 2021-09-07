import React from 'react';
import s from './ImageGalleryItem.module.css'

function ImageGalleryItem({ images }) {
  return (
    <>
      {images.map(({ id, webformatURL, tags }) => (
        <li className={s.ImageGalleryItem} key={id}>
          <img
            src={webformatURL}
            alt={tags}
            className={s.ImageGalleryItemImage}
          />
        </li>
      ))}
    </>
  );
}

export default ImageGalleryItem;

/* Компонент элемента списка с изображением. Создает DOM-элемент следующей структуры.

<li className="ImageGalleryItem">
  <img src="" alt="" className="ImageGalleryItem-image" />
</li> */