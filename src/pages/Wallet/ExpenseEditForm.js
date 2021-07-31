import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputNumber from '../../components/InputNumber';
import InputText from '../../components/InputText';
import Select from '../../components/Select';

import payMethods from './payMethodsData';
import expenseTags from './tagsData';
import { editExpense } from '../../actions';

class ExpenseEditForm extends React.Component {
  constructor(props) {
    super(props);
    const { expenses, editIndex } = props;
    const { value, description, currency, method, tag } = expenses[editIndex];
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { updateExpense, editIndex } = this.props;
    updateExpense(this.state, parseInt(editIndex, 10));
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form onSubmit={ this.handleSubmit }>
        <InputNumber
          id="expenseValue"
          label="Valor"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <InputText
          id="expenseDescribe"
          label="Descrição"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <Select
          id="expenseCurrency"
          label="Moeda"
          options={ currencies
            .map((currencie) => ({ value: currencie, text: currencie })) }
          name="currency"
          valueSelected={ currency }
          onChange={ this.handleChange }
        />
        <Select
          id="paymentMethod"
          label="Método de pagamento"
          options={ payMethods }
          name="method"
          valueSelected={ method }
          onChange={ this.handleChange }
        />
        <Select
          id="expenseTag"
          label="Tag"
          options={ expenseTags }
          name="tag"
          valueSelected={ tag }
          onChange={ this.handleChange }
        />
        <button type="submit">
          Editar despesa
        </button>
      </form>
    );
  }
}

ExpenseEditForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editIndex: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpense: (updatedExpense, expensePosition) => {
    dispatch(editExpense(updatedExpense, expensePosition));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseEditForm);
