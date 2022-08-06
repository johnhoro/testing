import { put, call } from "redux-saga/effects";

import * as types from "../actions";
import { getQueryData } from "../services/queryDataService";

export function* getQueryDataSaga(payload) {
  try {
    const response = yield call(getQueryData, payload);
    //console.log(response);
    yield put({ type: types.GET_QUERY_DATA_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.GET_QUERY_DATA_ERROR, error });
  }
}
