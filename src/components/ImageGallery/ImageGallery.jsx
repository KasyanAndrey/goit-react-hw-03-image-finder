import React from 'react';
import s from './ImageGallery.module.css'

const ImageGallery = (props) => (
  <ul className={s.ImageGallery}></ul>
);

export default ImageGallery;

/* Список карточек изображений. Создает DOM-элемент следующей структуры.

<ul className="ImageGallery">
  <!-- Набор <li> с изображениями -->
</ul> */