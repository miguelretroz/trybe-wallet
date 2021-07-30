import React from 'react';

import InputNumber from '../../components/InputNumber';
import InputText from '../../components/InputText';
import Select from '../../components/Select';

import payMethods from './payMethodsData';
import expenseTags from './tagsData';

class ExpenseForm extends React.Component {
  render() {
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
          options={ [{ value: '', text: 'empty' }] }
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

export default ExpenseForm;
