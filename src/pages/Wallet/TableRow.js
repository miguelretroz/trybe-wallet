import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  RiEditLine,
  RiDeleteBin2Line,
  RiExchangeDollarFill,
} from 'react-icons/ri';
import {
  BsArrowRight,
} from 'react-icons/bs';
import Context from '../../helpers/ContextApi';
import floatFormat from '../../helpers/floatFormat';
import { removeExpense } from '../../actions';

class TableRow extends React.Component {
  constructor(props) {
    super(props);

    this.removeExpense = this.removeExpense.bind(this);
  }

  removeExpense({ target: { id } }) {
    const { deleteExpense } = this.props;
    deleteExpense(parseInt(id, 10));
  }

  renderButtons(index) {
    return (
      <Context.Consumer>
        { ({ editExpense }) => (
          <td className="td-buttons">
            <button
              data-testid="edit-btn"
              id={ index }
              onClick={ ({ target }) => editExpense(target) }
              type="button"
            >
              <RiEditLine pointerEvents="none" />
            </button>
            <button
              data-testid="delete-btn"
              id={ index }
              onClick={ this.removeExpense }
              type="button"
            >
              <RiDeleteBin2Line pointerEvents="none" />
            </button>
          </td>
        ) }
      </Context.Consumer>
    );
  }

  render() {
    const {
      currency,
      description,
      exchangeRates,
      index,
      isEditing,
      method,
      tag,
      value,
    } = this.props;
    return (
      <tr className={ (isEditing) ? 'expense-is-editing' : '' } key={ index }>
        <td className="td-description">{ description }</td>
        <td className="td-tag">{ tag }</td>
        <td className="td-method">{ method }</td>
        <td className="td-value">{ value }</td>
        <td className="td-code">{ currency }</td>
        <td className="td-exchange-icon">
          <BsArrowRight />
          <RiExchangeDollarFill className="exchange-icon" />
          <BsArrowRight />
        </td>
        <td
          className="td-currency"
        >
          { exchangeRates[currency].name.split('/')[0] }
        </td>
        <td
          className="td-converted-value"
        >
          { floatFormat((value * exchangeRates[currency].ask)) }
        </td>
        <td
          className="td-exchange-value"
        >
          { floatFormat(exchangeRates[currency].ask) }
        </td>
        <td className="td-real">Real</td>
        { this.renderButtons(index) }
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (index) => dispatch(removeExpense(index)),
});

TableRow.propTypes = {
  currency: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
  isEditing: PropTypes.bool.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(TableRow);
