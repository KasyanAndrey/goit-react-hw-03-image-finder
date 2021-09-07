import React from 'react';
import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ images }) {
  return (
    <ul className={s.ImageGallery}>
      <ImageGalleryItem images={images} />
    </ul>
  );
}



export default ImageGallery;

/* Список карточек изображений. Создает DOM-элемент следующей структуры.

<ul className="ImageGallery">
  <!-- Набор <li> с изображениями -->
</ul> */