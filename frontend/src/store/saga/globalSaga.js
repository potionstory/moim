import { call, select, put, takeEvery } from 'redux-saga/effects';
import { TOGGLE_MODE } from '../module/global';
import { toggleModeAction } from '../module/global';

function* workToggleMode() {
  const { mode } = yield select(({ global }) => global);
  
  yield put(toggleModeAction.SUCCESS(!mode));
}

function* watchToggleMode() {
  yield takeEvery(TOGGLE_MODE.REQUEST, workToggleMode);
}

export default [watchToggleMode];
