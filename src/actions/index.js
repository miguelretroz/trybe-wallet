import {
  STORE_EMAIL,
  GET_CURRENCIES,
  STORE_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE } from './actionsTypes';

const END_POINT = 'https://economia.awesomeapi.com.br/json/all';

export const storeEmail = (email) => ({
  type: STORE_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch(END_POINT);
  const result = await response.json();
  const currenciesKeys = Object.keys(result);
  const usdtIndex = currenciesKeys.indexOf('USDT');
  // const currenciesData = Object.values(result);
  currenciesKeys.splice(usdtIndex, 1);/* currenciesData
    .filter((_currencies, index) => index !== usdtIndex); */

  dispatch(getCurrencies(currenciesKeys));
};

export const storeExpense = (expense) => ({
  type: STORE_EXPENSE,
  expense,
});

export const fetchExpenseData = (expense) => async (dispatch) => {
  const reponse = await fetch(END_POINT);
  const result = await reponse.json();
  delete result.USDT;
  const expenseUpdated = {
    ...expense,
    exchangeRates: result,
  };
  dispatch(storeExpense(expenseUpdated));
};

export const removeExpense = (expenseIndex) => ({
  type: REMOVE_EXPENSE,
  expenseIndex,
});

export const editExpense = (updatedExpense, expensePosition) => ({
  type: EDIT_EXPENSE,
  updatedExpense,
  expensePosition,
});
