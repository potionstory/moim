import { call, put, takeEvery } from 'redux-saga/effects';
import forEach from 'lodash/forEach';
import { SIGN_UP, SIGN_IN, SIGN_OUT, GET_USER } from '../module/auth';
import {
  signUpAction,
  signInAction,
  signOutAction,
  getUserAction,
} from '../module/auth';
import { modalCloseAction } from '../module/global';
import { signUp, signIn, signOut, getUser } from '../api/auth';

function* workSignUp(action) {
  const bodyParams = {};

  forEach(action.payload, (item) => {
    bodyParams[item.name] = item.value;
  });

  const response = yield call(signUp, bodyParams);

  if (response.status === 201) {
    yield put(signUpAction.SUCCESS());
    yield put(getUserAction.REQUEST());
    yield put(modalCloseAction());
  } else {
    yield put(signUpAction.FAILURE());
  }
}

function* workSignIn(action) {
  const bodyParams = {};

  forEach(action.payload, (item) => {
    bodyParams[item.name] = item.value;
  });

  const response = yield call(signIn, bodyParams);

  if (response.status === 200) {
    yield put(signInAction.SUCCESS());
    yield put(getUserAction.REQUEST());
    yield put(modalCloseAction());
  } else {
    yield put(signInAction.FAILURE());
  }
}

function* workSignOut() {
  const response = yield call(signOut);

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

function* watchSignUp() {
  yield takeEvery(SIGN_UP.REQUEST, workSignUp);
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

export default [watchSignUp, watchSignIn, watchSignOut, watchGetUser];
