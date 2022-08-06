import { fork } from "redux-saga/effects";
import watchAll from "./watchers";

export default function* startForman() {
  yield fork(watchAll);
}
