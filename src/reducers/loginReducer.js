import * as types from '../actions';

export default function (state = {}, action) {
  const response = action.response;

  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      let newState = { ...state, "user": action.user };
      return newState;
    case types.LOGIN_USER_ERROR:
      return { ...state, response };
      case types.LOGOUT_USER:
        return { ...state, "user": undefined, "logout": true };
    default:
      return state;
  }
};
