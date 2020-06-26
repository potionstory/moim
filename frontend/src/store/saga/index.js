import { all, fork } from 'redux-saga/effects';
import globalSaga from './globalSaga';
import communitySaga from './communitySaga';
import meetingSaga from './meetingSaga';

const sagas = [...globalSaga, ...communitySaga, ...meetingSaga];

export default function* rootSaga() {
  yield all(sagas.map((saga) => fork(saga)));
}
