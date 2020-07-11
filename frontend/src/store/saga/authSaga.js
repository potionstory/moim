import { call, put, takeEvery } from 'redux-saga/effects';
import forEach from 'lodash/forEach';
import { SIGNIN, GET_USER } from '../module/auth';
import { signinAction, getUserAction } from '../module/auth';
import { modalCloseAction } from '../module/global';
import { signin, getUser } from '../api/auth';

function* workSignin(action) {
  const bodyParams = {};

  forEach(action.payload, (item) => {
    bodyParams[item.name] = item.value;
  });

  const response = yield call(signin, bodyParams);
  console.log(
    '%c 🥑 response: ',
    'font-size:20px;background-color: #3F7CFF;color:#fff;',
    response,
  );

  if (response.status === 200) {
    yield put(signinAction.SUCCESS());
    yield put(getUserAction.REQUEST());
    yield put(modalCloseAction());
  } else {
    yield put(signinAction.FAILURE());
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

function* watchSignin() {
  yield takeEvery(SIGNIN.REQUEST, workSignin);
}

function* watchGetUser() {
  yield takeEvery(GET_USER.REQUEST, workGetUser);
}

export default [watchSignin, watchGetUser];
