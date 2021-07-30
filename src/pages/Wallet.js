import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './Wallet/ExpenseForm';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;

    getCurrencies();
  }

  render() {
    const { userEmail, expensesTotal } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            { `Email: ${userEmail}` }
          </span>
          <span>
            {'Despesa Total: '}
            <span data-testid="total-field">{expensesTotal}</span>
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <main>
          <ExpenseForm />
        </main>
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
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
  getCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
