import { call, put, takeEvery } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import {
  SOCIAL_SIGN,
  SOCIAL_SIGN_UP,
  SOCIAL_SIGN_IN,
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  GET_USER,
} from '../module/auth';
import {
  socialSignAction,
  socialSignUpAction,
  socialSignInAction,
  signUpAction,
  signInAction,
  signOutAction,
  getUserAction,
} from '../module/auth';
import { modalCloseAction } from '../module/global';
import { auth, signInWithGoogle } from '../../server/firebase.util';
import {
  socialSignUp,
  socialSignIn,
  signUp,
  signIn,
  signOut,
  getUser,
} from '../api/auth';

function* workSocialSign() {
  const bodyParams = {};

  yield signInWithGoogle().then((res) => {
    const user = res.user;
    if (user !== null) {
      bodyParams.email = user.email;
      bodyParams.userImageUrl = user.photoURL;
    }
  });

  if (!isEmpty(bodyParams)) {
    yield put(socialSignAction.SUCCESS(bodyParams));
  } else {
    yield put(socialSignAction.FAILURE());
  }
}

function* workSocialSignUp() {
  const bodyParams = {};

  yield signInWithGoogle().then((res) => {
    const user = res.user;
    if (user !== null) {
      bodyParams.userId = user.uid;
      bodyParams.email = user.email;
      bodyParams.userImageUrl = user.photoURL;
      bodyParams.userName = user.displayName;
    }
  });

  const token = yield auth.currentUser.getIdToken();
  bodyParams.token = token;

  const response = yield call(socialSignUp, bodyParams);

  if (response.status === 201) {
    yield put(socialSignUpAction.SUCCESS());
    yield put(getUserAction.REQUEST());
    yield put(modalCloseAction());
  } else {
    yield put(socialSignUpAction.FAILURE());
  }
}

function* workSocialSignIn() {
  yield signInWithGoogle();

  const token = yield auth.currentUser.getIdToken();

  yield call(socialSignIn, token);
  yield put(socialSignInAction.SUCCESS());
  yield put(getUserAction.REQUEST());
  yield put(modalCloseAction());
}

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

function* watchSocialSign() {
  yield takeEvery(SOCIAL_SIGN.REQUEST, workSocialSign);
}

function* watchSocialSignUp() {
  yield takeEvery(SOCIAL_SIGN_UP.REQUEST, workSocialSignUp);
}

function* watchSocialSignIn() {
  yield takeEvery(SOCIAL_SIGN_IN.REQUEST, workSocialSignIn);
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
  watchSignUp,
  watchSignIn,
  watchSignOut,
  watchGetUser,
];
