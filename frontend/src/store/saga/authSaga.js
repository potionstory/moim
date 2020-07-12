import { call, put, takeEvery } from 'redux-saga/effects';
import forEach from 'lodash/forEach';
import { SIGN_IN, SIGN_OUT, GET_USER } from '../module/auth';
import { signInAction, signOutAction, getUserAction } from '../module/auth';
import { modalCloseAction } from '../module/global';
import { signin, signout, getUser } from '../api/auth';

function* workSignIn(action) {
  const bodyParams = {};

  forEach(action.payload, (item) => {
    bodyParams[item.name] = item.value;
  });

  const response = yield call(signin, bodyParams);

  if (response.status === 200) {
    yield put(signInAction.SUCCESS());
    yield put(getUserAction.REQUEST());
    yield put(modalCloseAction());
  } else {
    yield put(signInAction.FAILURE());
  }
}

function* workSignOut() {
  const response = yield call(signout);

  if (response) {
    yield put(signOutAction.SUCCESS());
  } else {
    yield put(signOutAction.FAILURE());
  }
}

function* workGetUser() {
  const response = yield call(getUser);
  if (response.status === 200) {
    yield put(getUserAction.SUCCESS(response.data.credentials));
  } else {
    yield put(getUserAction.FAILURE());
  }
}

function* watchSignIn() {
  yield takeEvery(SIGN_IN.REQUEST, workSignIn);
}

function* watchSignOut() {
  yield takeEvery(SIGN_OUT.REQUEST, workSignOut);
}

function* watchGetUser() {
  yield takeEvery(GET_USER.REQUEST, workGetUser);
}

export default [watchSignIn, watchSignOut, watchGetUser];
