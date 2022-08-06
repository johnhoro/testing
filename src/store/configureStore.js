import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
import { createLogger } from "redux-logger";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const getMiddleware = () => {
    if (false && process.env.NODE_ENV !== "debug") {
      return applyMiddleware(sagaMiddleware);
    } else {
      return applyMiddleware(sagaMiddleware, createLogger());
    }
  };
  return {
    ...createStore(rootReducer, composeWithDevTools(getMiddleware())),
    runSaga: sagaMiddleware.run(rootSaga),
  };
};

export default configureStore;
