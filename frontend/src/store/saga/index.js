import { all, fork } from 'redux-saga/effects';
import map from 'lodash/map';
import globalSaga from './globalSaga';
import authSaga from './authSaga';
import communitySaga from './communitySaga';
import meetingSaga from './meetingSaga';

const sagas = [...globalSaga, ...authSaga, ...communitySaga, ...meetingSaga];

export default function* rootSaga() {
  yield all(map(sagas, (saga) => fork(saga)));
}
