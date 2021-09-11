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
