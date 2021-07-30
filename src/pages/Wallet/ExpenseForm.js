import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InputNumber from '../../components/InputNumber';
import InputText from '../../components/InputText';
import Select from '../../components/Select';

import payMethods from './payMethodsData';
import expenseTags from './tagsData';

class ExpenseForm extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <InputNumber
          id="expenseValue"
          label="Valor"
        />
        <InputText
          id="expenseDescribe"
          label="Descrição"
        />
        <Select
          id="expenseCurrency"
          label="Moeda"
          options={ currencies
            .map((currencie) => ({ value: currencie, text: currencie })) }
        />
        <Select
          id="paymentMethod"
          label="Método de pagamento"
          options={ payMethods }
        />
        <Select
          id="expenseTag"
          label="Tag"
          options={ expenseTags }
        />
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(ExpenseForm);
