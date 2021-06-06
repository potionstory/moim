import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const GET_COMMUNITY = createType('GET_COMMUNITY');
export const GET_MEETING = createType('GET_MEETING');
export const RESET_DETAIL = 'RESET_DETAIL';
export const POST_MOIM_JOIN = createType('POST_MOIM_JOIN');
export const POST_MOIM_EXIT = createType('POST_MOIN_EXIT');

// action 생성자 함수
export const getCommunityAction = createAction(GET_COMMUNITY);
export const getMeetingAction = createAction(GET_MEETING);
export const resetDetailAction = () => ({
  type: RESET_DETAIL,
});
export const postMoimJoinAction = createAction(POST_MOIM_JOIN);
export const postMoimExitAction = createAction(POST_MOIM_EXIT);

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
      case RESET_DETAIL: {
        draft.moim = {};
      }
      case POST_MOIM_JOIN.REQUEST: {
        draft.loading = true;
        break;
      }
      case POST_MOIM_JOIN.SUCCESS: {
        draft.moim.memberList = action.payload;
        break;
      }
      case POST_MOIM_JOIN.FAILURE: {
        draft.loading = false;
        break;
      }
      case POST_MOIM_EXIT.REQUEST: {
        draft.loading = true;
        break;
      }
      case POST_MOIM_EXIT.SUCCESS: {
        draft.moim.memberList = action.payload;
        break;
      }
      case POST_MOIM_EXIT.FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
};
