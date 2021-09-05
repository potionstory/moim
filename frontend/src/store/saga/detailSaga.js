import { call, put, takeEvery } from 'redux-saga/effects';
import { forEach } from 'lodash';
import {
  GET_COMMUNITY,
  GET_MEETING,
  PUT_COMMUNITY,
  PUT_MEETING,
  POST_MOIM_JOIN,
  POST_MOIM_EXIT,
  POST_MOIM_PASSNUMBER_CHECK,
  PUT_PAYMENT_CHECK,
  PUT_STAFF_CHECK,
} from '../module/detail';
import {
  getCommunityAction,
  getMeetingAction,
  putCommunityAction,
  putMeetingAction,
  postMoimJoinAction,
  postMoimExitAction,
  postMoimPassNumberCheckAction,
  putPaymentCheckAction,
  putStaffCheckAction,
} from '../module/detail';
import { modalCloseAction } from '../module/global';
import {
  getCommunityAPI,
  putCommunityAPI,
  postCommunityPassNumberAPI,
} from '../api/community';
import {
  getMeetingAPI,
  putMeetingAPI,
  postMeetingJoinAPI,
  postMeetingExitAPI,
  postMeetingPassNumberAPI,
  putPaymentCheckAPI,
  putStaffCheckAPI,
} from '../api/meeting';

function* workGetCommunity(action) {
  const res = yield call(getCommunityAPI, action.payload);

  if (res.status === 200) {
    yield put(getCommunityAction.SUCCESS(res.data));
  }
}

function* workGetMeeting(action) {
  const res = yield call(getMeetingAPI, action.payload);

  if (res.status === 200) {
    yield put(getMeetingAction.SUCCESS(res.data));
  }
}

function* workPutCommunity(action) {
  const { communityId, formData, thumbImageFile } = action.payload;

  const res = yield call(
    putCommunityAPI,
    communityId,
    formData,
    thumbImageFile,
  );

  if (res.status === 200) {
    yield put(putCommunityAction.SUCCESS(res.data));
  } else {
    yield put(putCommunityAction.FAILURE());
  }
}

function* workPutMeeting(action) {
  const { meetingId, formData, thumbImageFile } = action.payload;

  const res = yield call(putMeetingAPI, meetingId, formData, thumbImageFile);

  if (res.status === 200) {
    yield put(putMeetingAction.SUCCESS(res.data));
  } else {
    yield put(putMeetingAction.FAILURE());
  }
}

function* workPostMoimJoin(action) {
  const bodyParams = {};
  const { meetingId, formData, userId, userImage, userAvatar } = action.payload;

  forEach(formData, (item) => {
    bodyParams[item.name] = item.value;
  });

  bodyParams['userId'] = userId;
  bodyParams['userImage'] = userImage;
  bodyParams['userAvatar'] = userAvatar;

  const res = yield call(postMeetingJoinAPI, meetingId, bodyParams);

  if (res.status === 200) {
    yield put(postMoimJoinAction.SUCCESS(res.data));
    yield put(modalCloseAction());
  } else {
    yield put(postMoimJoinAction.FAILURE(res.data));
  }
}

function* workPostMoimExit(action) {
  const bodyParams = {};
  const { meetingId, formData } = action.payload;

  forEach(formData, (item) => {
    bodyParams[item.name] = item.value;
  });

  const res = yield call(postMeetingExitAPI, meetingId, bodyParams);

  if (res.status === 200) {
    yield put(postMoimExitAction.SUCCESS(res.data));
    yield put(modalCloseAction());
  } else {
    yield put(postMoimExitAction.FAILURE());
  }
}

function* workPostMoimPassNumberCheck(action) {
  const { id, category, formData } = action.payload;
  const bodyParams = {};
  let res = null;

  forEach(formData, (item) => {
    bodyParams[item.name] = item.value;
  });

  if (category === 'community') {
    res = yield call(postCommunityPassNumberAPI, id, bodyParams);
  } else if (category === 'meeting') {
    res = yield call(postMeetingPassNumberAPI, id, bodyParams);
  }

  if (res.status === 200) {
    yield put(postMoimPassNumberCheckAction.SUCCESS());
    yield put(modalCloseAction());
  } else {
    yield put(postMoimPassNumberCheckAction.FAILURE());
  }
}

function* workPutPaymentCheck(action) {
  const { meetingId, userId } = action.payload;

  const res = yield call(putPaymentCheckAPI, meetingId, { userId });

  if (res.status === 200) {
    yield put(putPaymentCheckAction.SUCCESS(res.data));
  } else {
    yield put(putPaymentCheckAction.FAILURE());
  }
}

function* workPutStaffCheck(action) {
  const { meetingId, userId } = action.payload;

  const res = yield call(putStaffCheckAPI, meetingId, { userId });

  if (res.status === 200) {
    yield put(putStaffCheckAction.SUCCESS(res.data));
  } else {
    yield put(putStaffCheckAction.FAILURE());
  }
}

function* watchGetCommunity() {
  yield takeEvery(GET_COMMUNITY.REQUEST, workGetCommunity);
}

function* watchGetMeeting() {
  yield takeEvery(GET_MEETING.REQUEST, workGetMeeting);
}

function* watchPutCommunity() {
  yield takeEvery(PUT_COMMUNITY.REQUEST, workPutCommunity);
}

function* watchPutMeeting() {
  yield takeEvery(PUT_MEETING.REQUEST, workPutMeeting);
}

function* watchPostMoimJoin() {
  yield takeEvery(POST_MOIM_JOIN.REQUEST, workPostMoimJoin);
}

function* watchPostMoimExit() {
  yield takeEvery(POST_MOIM_EXIT.REQUEST, workPostMoimExit);
}

function* watchPostMoimPassNumberCheck() {
  yield takeEvery(
    POST_MOIM_PASSNUMBER_CHECK.REQUEST,
    workPostMoimPassNumberCheck,
  );
}

function* watchPutPaymentCheck() {
  yield takeEvery(PUT_PAYMENT_CHECK.REQUEST, workPutPaymentCheck);
}

function* watchPutStaffCheck() {
  yield takeEvery(PUT_STAFF_CHECK.REQUEST, workPutStaffCheck);
}

export default [
  watchGetCommunity,
  watchGetMeeting,
  watchPutCommunity,
  watchPutMeeting,
  watchPostMoimJoin,
  watchPostMoimExit,
  watchPostMoimPassNumberCheck,
  watchPutPaymentCheck,
  watchPutStaffCheck,
];
