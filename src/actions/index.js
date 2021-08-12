import {
  STORE_EMAIL,
  GET_CURRENCIES,
  STORE_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  EDITING_EXPENSE,
} from './actionsTypes';

const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

export const storeEmail = (email) => ({
  type: STORE_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const fetchData = (action, expenseData) => async (dispatch) => {
  const response = await fetch(END_POINT);
  const result = await response.json();
  delete result.USDT;
  dispatch(action(result, expenseData));
};

export const storeExpense = (apiData, expenseData) => ({
  type: STORE_EXPENSE,
  expenseData,
  apiData,
});

export const removeExpense = (expenseIndex) => ({
  type: REMOVE_EXPENSE,
  expenseIndex,
});

export const editExpense = (updatedExpense, expensePosition) => ({
  type: EDIT_EXPENSE,
  updatedExpense,
  expensePosition,
});

export const editingExpense = (expensePosition) => ({
  type: EDITING_EXPENSE,
  expensePosition: Number(expensePosition),
});
