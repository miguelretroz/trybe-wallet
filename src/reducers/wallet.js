import { GET_CURRENCIES, STORE_EXPENSE } from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case STORE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.expense, id: state.expenses.length }],
    };
  default:
    return state;
  }
}
