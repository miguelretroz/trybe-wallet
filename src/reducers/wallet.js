import {
  GET_CURRENCIES,
  REMOVE_EXPENSE,
  STORE_EXPENSE,
  EDIT_EXPENSE,
  EDITING_EXPENSE,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const isEditingChecker = (
  state,
  { expensePosition },
) => state.expenses.map((expense, index) => ({
  ...expense,
  isEditing: (index === expensePosition),
}));

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  case STORE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.expenseData,
          exchangeRates: action.apiData,
          id: state.expenses.length,
          isEditing: false,
        },
      ],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((_expense, index) => index !== action.expenseIndex),
    };
  case EDITING_EXPENSE:
    return {
      ...state,
      expenses: isEditingChecker(state, action),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense, index) => {
        if (index === action.expensePosition) {
          return {
            ...expense,
            ...action.updatedExpense,
            isEditing: false,
          };
        }
        return expense;
      }),
    };
  default:
    return state;
  }
}
