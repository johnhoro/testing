import * as types from '../actions';
import { addDays, lightFormat, startOfMonth, endOfMonth } from 'date-fns';

export default function (state = {
  response: {},
  filter: {
    text_search: '',
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
    whereClause:{},
    // startDate: new Date("2021-10-01"),
    // endDate: new Date("2021-10-31")
  }
}, action) {

  switch (action.type) {
    case types.GET_QUERY_DATA_SUCCESS:
      let newResponse = Object.assign({}, state.response, action.response)
      return { ...state, response: newResponse };
    case types.GET_QUERY_DATA_ERROR:
      return { ...state, response: action.response };
    case types.SET_DATE_RANGE:
      return { ...state, filter: action.filter, response: {} }
    default:
      return state;
  }
};
