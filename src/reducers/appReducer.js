import * as types from '../actions';

export default function (state = {route:  window.location.hash.substring(1)}, action) {

  switch (action.type) {
    case types.APP_NAVIGATE:
      return { ...state, "route": action.route };
    default:
      return state;
  }
};
