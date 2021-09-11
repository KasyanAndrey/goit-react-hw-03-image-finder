import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ onClick }) {
  return (
    <button type="button" onClick={() => onClick()} className={s.Button}>
      <span className={s.ButtonName}>Load more</span>
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;

/* При нажатии на кнопку Load more должна догружаться следующая порция изображений и 
рендериться вместе с предыдущими. 
После загрузки и рендера новой партии изображений страница должна плавно скролиться. 
Для скрола используй следующий код.

window.scrollTo({
  top: document.documentElement.scrollHeight,
  behavior: 'smooth',
});

Кнопка должна рендерится только тогда, когда есть какие-то загруженные изобаржения. 
Если массив изображений пуст, кнопка не рендерится. */
