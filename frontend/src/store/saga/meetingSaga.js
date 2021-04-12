import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_ALL_MEETING } from '../module/meeting';
import { getAllMeetingAction } from '../module/meeting';
import { getAllMeetingAPI } from '../api/meeting';

function* workGetAllMeeting() {
  const res = yield call(getAllMeetingAPI);
  
  if (res.status === 200) {
    yield put(getAllMeetingAction.SUCCESS(res.data));
  }
}

function* watchGetAllMeeting() {
  yield takeEvery(GET_ALL_MEETING.REQUEST, workGetAllMeeting);
}

export default [watchGetAllMeeting];
