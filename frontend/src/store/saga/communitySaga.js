import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_ALL_COMMUNITY } from '../module/community';
import { getAllCommunityAction } from '../module/community';
import { getAllCommunityAPI } from '../api/community';

function* workGetAllCommunity() {
  const res = yield call(getAllCommunityAPI);
  if (res.status === 200) {
    yield put(getAllCommunityAction.SUCCESS(res.data));
  }
}

function* watchGetAllCommunity() {
  yield takeEvery(GET_ALL_COMMUNITY.REQUEST, workGetAllCommunity);
}

export default [watchGetAllCommunity];
