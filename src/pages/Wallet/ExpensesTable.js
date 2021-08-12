import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableRow from './TableRow';

class ExpensesTable extends React.Component {
  renderTHead() {
    return (
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
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        {this.renderTHead()}
        <tbody>
          {expenses.map((expense, index) => (
            <TableRow
              { ...expense }
              index={ index }
              key={ index }
            />
          ))}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
