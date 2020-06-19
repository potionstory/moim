import { all, fork } from 'redux-saga/effects';
import headerSaga from './headerSaga';
import communitySaga from './communitySaga';
import meetingSaga from './meetingSaga';

const sagas = [...headerSaga, ...communitySaga, ...meetingSaga];

export default function* rootSaga() {
  yield all(sagas.map((saga) => fork(saga)));
}
