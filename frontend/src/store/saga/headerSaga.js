import { call, select, put, takeEvery } from 'redux-saga/effects';
import { TOGGLE_MODE } from '../module/header';
import { toggleModeAction } from '../module/header';

function* workToggleMode() {
  const { mode } = yield select(({ header }) => header);
  yield put(toggleModeAction.SUCCESS(!mode));
}

function* watchToggleMode() {
  yield takeEvery(TOGGLE_MODE.REQUEST, workToggleMode);
}

export default [watchToggleMode];
