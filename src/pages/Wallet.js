import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiUser } from 'react-icons/fi';
import { RiAddLine } from 'react-icons/ri';
import ExpenseEditForm from './Wallet/ExpenseEditForm';
import ExpenseForm from './Wallet/ExpenseForm';
import ExpensesTable from './Wallet/ExpensesTable';
import { fetchData, getCurrencies } from '../actions';
import Context from '../helpers/ContextApi';

import floatFormat from '../helpers/floatFormat';

import './Wallet/Wallet.css';

const showForms = 'show-forms';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.editExpense = this.editExpense.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.closeEditForm = this.closeEditForm.bind(this);

    this.state = {
      editIndex: 0,
      isEditing: false,
      isShowForms: 'hide-forms',
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;

    fetchCurrencies();
  }

  editExpense({ id }) {
    this.setState((prevState) => ({
      editIndex: id,
      isEditing: !prevState.isEditing,
      isShowForms: showForms,
    }));
  }

  toggleForm() {
    const delay = 350;
    this.setState((prevState) => ({
      isShowForms: (prevState.isShowForms === showForms) ? 'hide-forms' : showForms,
    }), () => setTimeout(() => this.setState({ isEditing: false }), delay));
  }

  closeEditForm() {
    this.setState({
      isEditing: false,
    });
  }

  renderForms() {
    const { isEditing, editIndex } = this.state;
    if (isEditing) {
      return (
        <ExpenseEditForm editIndex={ editIndex } closeEditForm={ this.closeEditForm } />
      );
    }
    return <ExpenseForm />;
  }

  render() {
    const { isShowForms } = this.state;
    const { userEmail, expensesTotal } = this.props;
    return (
      <Context.Provider value={ { editExpense: this.editExpense } }>
        <header className="wallet-header">
          <div className="wallet-email-field" data-testid="email-field">
            <FiUser className="wallet-email-icon" />
            <span className="wallet-email">{userEmail}</span>
          </div>
          <div className="wallet-total-expenses">
            <span>
              {'Despesa Total: '}
              <span data-testid="total-field">{floatFormat(expensesTotal)}</span>
            </span>
            <span data-testid="header-currency-field">
              BRL
            </span>
          </div>
          <button
            className="wallet-header-btn-add"
            onClick={ this.toggleForm }
            type="button"
          >
            <RiAddLine pointerEvents="none" />
          </button>
        </header>
        <main>
          <div className={ `wallet-forms ${isShowForms}` }>
            { this.renderForms() }
          </div>
          <ExpensesTable editExpense={ this.editExpense } />
        </main>
      </Context.Provider>
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
