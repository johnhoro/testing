import { put, call } from 'redux-saga/effects';
import { addConnector, getConnectors } from '../services/connectorService';

import * as types from '../actions'

export function* addConnectorSaga(payload) {
  // try {
  //   const response = yield call(addConnector, payload);
  //   yield [
  //     put({ type: types.ADD_CONNECTOR_SUCCESS, response })
  //   ];
  // } catch(error) {
  //   yield put({ type: types.ADD_CONNECTOR_ERROR, error });
  // }
}

export function* getConnectorsSaga(payload) {
  // try {
  //   const response = yield call(getConnectors, payload);
  //   yield put({ type: types.GET_CONNECTORS_SUCCESS, response });
  // } catch(error) {
  //   yield put({ type: types.GET_CONNECTORS_ERROR, error })
  // }
}