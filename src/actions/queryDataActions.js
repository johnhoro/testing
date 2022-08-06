import * as types from './index';

export const getQueryDataAction = (dataId, queryData) => {
  return {
    type: types.GET_QUERY_DATA,
    dataId, queryData
  }
};

export const setFilterAction = (filter) => {
  return {
    type: types.SET_DATE_RANGE,
    filter
  }
};

