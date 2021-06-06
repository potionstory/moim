import { call, put, takeEvery } from 'redux-saga/effects';
import forEach from 'lodash/forEach';
import {
  GET_COMMUNITY,
  GET_MEETING,
  POST_MOIM_JOIN,
  POST_MOIM_EXIT,
} from '../module/detail';
import {
  getCommunityAction,
  getMeetingAction,
  postMoimJoinAction,
  postMoimExitAction,
} from '../module/detail';
import { modalCloseAction } from '../module/global';
import { getCommunityAPI } from '../api/community';
import {
  getMeetingAPI,
  postMeetingJoinAPI,
  postMeetingExitAPI,
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

function* watchGetCommunity() {
  yield takeEvery(GET_COMMUNITY.REQUEST, workGetCommunity);
}

function* watchGetMeeting() {
  yield takeEvery(GET_MEETING.REQUEST, workGetMeeting);
}

function* watchPostMoimJoin() {
  yield takeEvery(POST_MOIM_JOIN.REQUEST, workPostMoimJoin);
}

function* watchPostMoimExit() {
  yield takeEvery(POST_MOIM_EXIT.REQUEST, workPostMoimExit);
}

export default [
  watchGetCommunity,
  watchGetMeeting,
  watchPostMoimJoin,
  watchPostMoimExit,
];
