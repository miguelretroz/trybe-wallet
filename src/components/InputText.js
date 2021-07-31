import React from 'react';
import PropTypes from 'prop-types';

class InputText extends React.Component {
  render() {
    const { id, label, name, value, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        { label }
        <input
          type="text"
          id={ id }
          data-testid={ `${name}-input` }
          name={ name }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputText;
