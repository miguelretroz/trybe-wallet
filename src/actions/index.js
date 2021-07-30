import { STORE_EMAIL } from './actionsTypes';

export const storeEmail = (email) => ({
  type: STORE_EMAIL,
  email,
});
