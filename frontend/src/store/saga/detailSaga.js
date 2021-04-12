import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_COMMUNITY, GET_MEETING } from '../module/detail';
import { getCommunityAction, getMeetingAction } from '../module/detail';
import { getCommunityAPI } from '../api/community';
import { getMeetingAPI } from '../api/meeting';

function* workGetCommunity(action) {
  const res = yield call(getCommunityAPI, action.payload);

  if (res.status === 200) {
    yield put(getCommunityAction.SUCCESS(res.data));
  }
}

function* watchGetCommunity() {
  yield takeEvery(GET_COMMUNITY.REQUEST, workGetCommunity);
}

function* workGetMeeting(action) {
  const res = yield call(getMeetingAPI, action.payload);

  if (res.status === 200) {
    yield put(getMeetingAction.SUCCESS(res.data));
  }
}

function* watchGetMeeting() {
  yield takeEvery(GET_MEETING.REQUEST, workGetMeeting);
}

export default [watchGetCommunity, watchGetMeeting];
