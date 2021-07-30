import React from 'react';
import PropTypes from 'prop-types';

class InputNumber extends React.Component {
  render() {
    const { id, label, name, value, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        { label }
        <input
          type="number"
          id={ id }
          name={ name }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

InputNumber.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputNumber;
