import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  renderButtons(index) {
    const { editExpense } = this.props;
    return (
      <td>
        <Button
          text="Editar"
          id={ index }
          dataTestId="edit-btn"
          onClick={ editExpense }
        />
        <Button
          text="Deletar"
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
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ exchangeRates[currency].name.split('/')[0] }</td>
              <td>{ floatFormat((value * exchangeRates[currency].ask)) }</td>
              <td>{ floatFormat(exchangeRates[currency].ask) }</td>
              <td>Real</td>
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (index) => dispatch(removeExpense(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
