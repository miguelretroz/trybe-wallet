import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiUser } from 'react-icons/fi';
import { RiAddLine } from 'react-icons/ri';
import ExpenseEditForm from './Wallet/ExpenseEditForm';
import ExpenseForm from './Wallet/ExpenseForm';
import ExpensesTable from './Wallet/ExpensesTable';
import { fetchData, getCurrencies, editingExpense } from '../actions';
import Context from '../helpers/ContextApi';

import floatFormat from '../helpers/floatFormat';

import './Wallet/Wallet.css';
import WalletLogo from '../wallet-logo.svg';

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
    const { setEditing } = this.props;
    setEditing(id);
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
    }), () => setTimeout(() => {
      const { setEditing } = this.props;
      setEditing();
      this.setState({ isEditing: false });
    }, delay));
  }

  closeEditForm() {
    const { setEditing } = this.props;
    setEditing();
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
      <Context.Provider
        value={ { editExpense: this.editExpense, closeEditForm: this.closeEditForm } }
      >
        <header className="wallet-header">
          <img alt="wallet-logo" className="wallet-logo" src={ WalletLogo } />
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
        <main className="wallet-main">
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
  expensesTotal: PropTypes.number.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  expensesTotal: state.wallet.expenses
    .reduce((
      accumulator,
      { value, currency, exchangeRates },
    ) => accumulator + (parseFloat(exchangeRates[currency].ask) * value), 0),
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchData(getCurrencies)),
  setEditing: (expensePosition) => dispatch(editingExpense(expensePosition)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
