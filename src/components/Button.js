import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { id, text, dataTestId, onClick } = this.props;
    return (
      <button
        type="button"
        id={ id }
        data-testid={ dataTestId }
        onClick={ onClick }
      >
        { text }
      </button>
    );
  }
}

Button.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
