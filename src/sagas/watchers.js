import { takeLatest, all, takeEvery } from "redux-saga/effects";
import { registerSaga, loginSaga } from "./authenticationSaga";
import { addConnectorSaga, getConnectorsSaga } from "./connectorSaga";

import * as types from "../actions";
import { getQueryDataSaga } from "./queryDataSaga";

export default function* watchAll() {
  yield all([
    takeLatest(types.REGISTER_USER, registerSaga),
    takeLatest(types.LOGIN_USER, loginSaga),
    takeLatest(types.GET_CONNECTORS, getConnectorsSaga),
    takeLatest(types.ADD_CONNECTOR, addConnectorSaga),
    takeEvery(types.GET_QUERY_DATA, getQueryDataSaga),
  ]);
}
