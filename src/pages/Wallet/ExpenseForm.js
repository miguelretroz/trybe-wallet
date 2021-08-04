import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../../components/Input';
import Select from '../../components/Select';

import payMethods from './payMethodsData';
import expenseTags from './tagsData';
import { fetchData, storeExpense } from '../../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { saveExpense } = this.props;
    saveExpense(storeExpense, this.state);
  }

  handleChange({ target }) {
    const { name, value, type } = target;
    const testedValue = (type === 'number' && value <= 0) ? 0 : value;
    this.setState({
      [name]: testedValue,
    });
  }

  renderSelects() {
    const { currencies } = this.props;
    const { currency, method, tag } = this.state;
    return (
      <>
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
      </>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <Input
          type="number"
          id="expenseValue"
          label="Valor"
          name="value"
          value={ `${value}` }
          onChange={ this.handleChange }
        />
        <Input
          type="text"
          id="expenseDescribe"
          label="Descrição"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        { this.renderSelects() }
        <button type="submit">
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (action, state) => dispatch(fetchData(action, state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
