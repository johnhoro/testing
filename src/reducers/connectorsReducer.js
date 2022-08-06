import * as types from '../actions';

export default function (state = {}, action) {
  const response = action.response;

  switch (action.type) {
    case types.GET_CONNECTORS_SUCCESS:
      return { ...state, response };
    case types.GET_CONNECTORS_ERROR:
      return { ...state, response };

    case types.ADD_CONNECTOR_SUCCESS:
      return {
        ...state,
        response: [...state.response, action.response]
      }
    case types.ADD_CONNECTOR_ERROR:
      return { ...state, response };
    default:
      return state;
  }
};
