import { call, put, select, takeEvery } from 'redux-saga/effects';
import { isEmpty, forEach, reduce, assign } from 'lodash';
import {
  SOCIAL_SIGN,
  SOCIAL_SIGN_UP,
  SOCIAL_SIGN_IN,
  SIGN,
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  GET_USER,
} from '../module/auth';
import {
  socialSignAction,
  socialSignUpAction,
  socialSignInAction,
  signAction,
  signUpAction,
  signInAction,
  signOutAction,
  getUserAction,
} from '../module/auth';
import { setIsEditAction } from '../module/detail';
import { modalCloseAction } from '../module/global';
import { auth } from '../../server/firebase.util';
import { getSocialSign } from '../../utils/commonUtil';
import {
  postSocialSignUp,
  postSocialSignIn,
  postSignUp,
  postSignIn,
  signOut,
  getUser,
} from '../api/auth';

function* workSocialSign(action) {
  const { service, userAvatar } = action.payload;

  const bodyParams = yield call(getSocialSign, service);

  if (!isEmpty(bodyParams)) {
    yield put(socialSignAction.SUCCESS({ ...bodyParams, userAvatar }));
  } else {
    yield put(socialSignAction.FAILURE());
  }
}

function* workSocialSignUp(action) {
  const { signInfo } = yield select(({ auth }) => auth);
  const userInfo = reduce(
    action.payload,
    (acc, cur) => assign(acc, { [cur.name]: cur.value }),
    {},
  );

  const bodyParams = { ...signInfo, ...userInfo };

  const user = auth.currentUser;

  if (user !== null) {
    bodyParams.userId = user.uid;
    bodyParams.token = yield user.getIdToken();
  }

  const response = yield call(postSocialSignUp, bodyParams);

  if (response.status === 201) {
    yield put(socialSignUpAction.SUCCESS());
    yield put(getUserAction.REQUEST());
    yield put(modalCloseAction());
  } else {
    yield put(socialSignUpAction.FAILURE());
  }
}

function* workSocialSignIn(action) {
  yield call(getSocialSign, action.payload);

  const token = yield auth.currentUser.getIdToken();

  yield call(postSocialSignIn, token);
  yield put(socialSignInAction.SUCCESS());
  yield put(getUserAction.REQUEST());
  yield put(modalCloseAction());
}

function* workSign(action) {
  const { formData, userAvatar } = action.payload;

  const userInfo = reduce(
    formData,
    (acc, cur) => assign(acc, { [cur.name]: cur.value }),
    {},
  );

  if (!isEmpty(userInfo)) {
    yield put(signAction.SUCCESS({ ...userInfo, userAvatar }));
  } else {
    yield put(signAction.FAILURE());
  }
}

function* workSignUp(action) {
  const { signInfo } = yield select(({ auth }) => auth);

  const userInfo = reduce(
    action.payload,
    (acc, cur) => assign(acc, { [cur.name]: cur.value }),
    {},
  );

  const bodyParams = { ...signInfo, ...userInfo };

  const response = yield call(postSignUp, bodyParams);

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

  const response = yield call(postSignIn, bodyParams);

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
    yield put(setIsEditAction(false));
  } else {
    yield put(signOutAction.FAILURE());
  }
}

function* workGetUser() {
  const response = yield call(getUser);

  if (response.status === 200) {
    yield put(getUserAction.SUCCESS(response.data.credentials));
  } else {
    yield put(signOutAction.REQUEST());
    yield put(getUserAction.FAILURE());
  }
}

function* watchSocialSign() {
  yield takeEvery(SOCIAL_SIGN.REQUEST, workSocialSign);
}

function* watchSocialSignUp() {
  yield takeEvery(SOCIAL_SIGN_UP.REQUEST, workSocialSignUp);
}

function* watchSocialSignIn() {
  yield takeEvery(SOCIAL_SIGN_IN.REQUEST, workSocialSignIn);
}

function* watchSign() {
  yield takeEvery(SIGN.REQUEST, workSign);
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

export default [
  watchSocialSign,
  watchSocialSignUp,
  watchSocialSignIn,
  watchSign,
  watchSignUp,
  watchSignIn,
  watchSignOut,
  watchGetUser,
];
