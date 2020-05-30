import { all, fork } from 'redux-saga/effects';
import communitySaga from './communitySaga';

const sagas = [...communitySaga];

export default function* rootSaga() {
  yield all(sagas.map((saga) => fork(saga)));
}
