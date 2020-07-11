import { call, put, takeEvery } from 'redux-saga/effects';
import forEach from 'lodash/forEach';
import { SIGNIN } from '../module/auth';
import { signinAction } from '../module/auth';
import { modalCloseAction } from '../module/global';
import { signin, getUser } from '../api/auth';

function* workSignin(action) {
  const bodyParams = {};

  forEach(action.payload, (item) => {
    bodyParams[item.name] = item.value;
  });

  const signinResult = yield call(signin, bodyParams);

  if (signinResult.status === 200) {
    const getUserResult = yield call(getUser);
    if (getUserResult.status === 200) {
      yield put(signinAction.SUCCESS(getUserResult.data.credentials));
      yield put(modalCloseAction());
    }
  } else {
    yield put(signinAction.FAILURE());
  }
}

function* watchSignin() {
  yield takeEvery(SIGNIN.REQUEST, workSignin);
}

export default [watchSignin];
