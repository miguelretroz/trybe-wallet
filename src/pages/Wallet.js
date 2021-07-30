import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpenseForm from './Wallet/ExpenseForm';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;

    getCurrencies();
  }

  render() {
    const { total } = this.state;
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            { `Email: ${userEmail}` }
          </span>
          <span data-testid="total-field">
            { `Despesa Total: ${total}` }
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
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
