import { all, fork } from 'redux-saga/effects';
import headerSaga from './headerSaga';
import communitySaga from './communitySaga';

const sagas = [...headerSaga, ...communitySaga];

export default function* rootSaga() {
  yield all(sagas.map((saga) => fork(saga)));
}
