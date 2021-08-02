import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseEditForm from './Wallet/ExpenseEditForm';
import ExpenseForm from './Wallet/ExpenseForm';
import ExpensesTable from './Wallet/ExpensesTable';
import { fetchData, getCurrencies } from '../actions';

import floatFormat from '../helpers/floatFormat';

import './Wallet/Wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editIndex: 0,
      isEditing: false,
    };

    this.editExpense = this.editExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;

    fetchCurrencies();
  }

  editExpense({ target: { id } }) {
    this.setState((prevState) => ({
      editIndex: id,
      isEditing: !prevState.isEditing,
    }));
  }

  render() {
    const { isEditing, editIndex } = this.state;
    const { userEmail, expensesTotal } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            { `Email: ${userEmail}` }
          </span>
          <div className="expense-total">
            <span>
              {'Despesa Total: '}
              <span data-testid="total-field">{floatFormat(expensesTotal)}</span>
            </span>
            <span data-testid="header-currency-field">
              BRL
            </span>
          </div>
        </header>
        <main>
          { isEditing ? <ExpenseEditForm editIndex={ editIndex } /> : <ExpenseForm /> }
          <ExpensesTable editExpense={ this.editExpense } />
        </main>
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  expensesTotal: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expensesTotal: state.wallet.expenses
    .reduce((
      accumulator,
      { value, currency, exchangeRates },
    ) => accumulator + (parseFloat(exchangeRates[currency].ask) * value), 0),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchData(getCurrencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
