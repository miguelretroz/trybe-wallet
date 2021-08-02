import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  RiExchangeDollarFill,
  RiEditLine,
  RiDeleteBin2Line,
} from 'react-icons/ri';
import { BsArrowRight } from 'react-icons/bs';

import floatFormat from '../../helpers/floatFormat';
import { removeExpense } from '../../actions';
import Button from '../../components/Button';

class ExpensesTable extends React.Component {
  constructor(props) {
    super(props);

    this.removeExpense = this.removeExpense.bind(this);
  }

  removeExpense({ target: { id } }) {
    const { deleteExpense } = this.props;
    deleteExpense(parseInt(id, 10));
  }

  renderTHead() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  renderButtons(index) {
    const { editExpense } = this.props;
    return (
      <td className="td-buttons">
        <Button
          text={ <RiEditLine id={ index } /> }
          id={ index }
          dataTestId="edit-btn"
          onClick={ editExpense }
        />
        <Button
          text={ <RiDeleteBin2Line id={ index } /> }
          id={ index }
          dataTestId="delete-btn"
          onClick={ this.removeExpense }
        />
      </td>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        {this.renderTHead()}
        <tbody>
          {expenses.map(({
            description,
            tag,
            method,
            value,
            currency,
            exchangeRates,
          }, index) => (
            <tr key={ index }>
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
          ))}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (index) => dispatch(removeExpense(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
