import { call, put, takeEvery } from 'redux-saga/effects';
import forEach from 'lodash/forEach';
import {
  GET_COMMUNITY,
  GET_MEETING,
  PUT_COMMUNITY,
  PUT_MEETING,
  POST_MOIM_JOIN,
  POST_MOIM_EXIT,
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
  putPaymentCheckAction,
  putStaffCheckAction,
} from '../module/detail';
import { modalCloseAction } from '../module/global';
import { getCommunityAPI, putCommunityAPI } from '../api/community';
import {
  getMeetingAPI,
  putMeetingAPI,
  postMeetingJoinAPI,
  postMeetingExitAPI,
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
  const { communityId, formData } = action.payload;

  const res = yield call(putCommunityAPI, communityId, formData);

  if (res.status === 200) {
    yield put(putCommunityAction.SUCCESS(res.data));
  }
}

function* workPutMeeting(action) {
  const { meetingId, formData } = action.payload;

  const res = yield call(putMeetingAPI, meetingId, formData);

  if (res.status === 200) {
    yield put(putMeetingAction.SUCCESS(res.data));
  }
}

function* workPostMoimJoin(action) {
  const bodyParams = {};
  const { meetingId, formData } = action.payload;

  forEach(formData, (item) => {
    bodyParams[item.name] = item.value;
  });

  const res = yield call(postMeetingJoinAPI, meetingId, bodyParams);

  if (res.status === 200) {
    yield put(postMoimJoinAction.SUCCESS(res.data));
    yield put(modalCloseAction());
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
    yield put(postMoimExitAction.FAILURE(res));
  }
}

function* workPutPaymentCheck(action) {
  const { meetingId, memberList } = action.payload;

  // forEach(formData, (item) => {
  //   bodyParams[item.name] = item.value;
  // });

  const res = yield call(putPaymentCheckAPI, meetingId, memberList);
  console.log('workPutPaymentCheck: ', res);
}

function* workPutStaffCheck(action) {
  const bodyParams = {};
  const { meetingId, formData } = action.payload;

  forEach(formData, (item) => {
    bodyParams[item.name] = item.value;
  });

  const res = yield call(putStaffCheckAPI, meetingId, bodyParams);
  console.log('workPutStaffCheck: ', res);
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
  watchPutPaymentCheck,
  watchPutStaffCheck,
];
