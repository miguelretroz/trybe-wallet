import { STORE_EMAIL } from '../actions/actionsTypes';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case STORE_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
