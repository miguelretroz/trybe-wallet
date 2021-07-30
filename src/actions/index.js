import { STORE_EMAIL, GET_CURRENCIES } from './actionsTypes';

export const storeEmail = (email) => ({
  type: STORE_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const result = await response.json();
  const usdtIndex = Object.keys(result).indexOf('USDT');
  const currenciesData = Object.values(result);
  const currenciesFiltered = currenciesData
    .filter((_currencies, index) => index !== usdtIndex);

  dispatch(getCurrencies(currenciesFiltered));
};
