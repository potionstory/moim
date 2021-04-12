import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const GET_COMMUNITY = createType('GET_COMMUNITY');
export const GET_MEETING = createType('GET_MEETING');

// action 생성자 함수
export const getCommunityAction = createAction(GET_COMMUNITY);
export const getMeetingAction = createAction(GET_MEETING);

// initialState
const initialState = {
  loading: false,
  moim: {},
};

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_COMMUNITY.REQUEST: {
        draft.loading = true;
        break;
      }
      case GET_COMMUNITY.SUCCESS: {
        draft.moim = action.payload;
        break;
      }
      case GET_COMMUNITY.FAILURE: {
        draft.loading = false;
        break;
      }
      case GET_MEETING.REQUEST: {
        draft.loading = true;
        break;
      }
      case GET_MEETING.SUCCESS: {
        draft.moim = action.payload;
        break;
      }
      case GET_MEETING.FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
};
