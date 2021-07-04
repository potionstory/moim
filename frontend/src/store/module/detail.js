import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const GET_COMMUNITY = createType('GET_COMMUNITY');
export const GET_MEETING = createType('GET_MEETING');
export const PUT_COMMUNITY = createType('PUT_COMMUNITY');
export const PUT_MEETING = createType('PUT_MEETING');
export const POST_MOIM_JOIN = createType('POST_MOIM_JOIN');
export const POST_MOIM_EXIT = createType('POST_MOIN_EXIT');
export const PUT_PAYMENT_CHECK = createType('PUT_PAYMENT_CHECK');
export const PUT_STAFF_CHECK = createType('PUT_STAFF_CHECK');
export const SET_IS_EDIT = 'SET_IS_EDIT';
export const RESET_DETAIL = 'RESET_DETAIL';

// action 생성자 함수
export const getCommunityAction = createAction(GET_COMMUNITY);
export const getMeetingAction = createAction(GET_MEETING);
export const putCommunityAction = createAction(PUT_COMMUNITY);
export const putMeetingAction = createAction(PUT_MEETING);
export const postMoimJoinAction = createAction(POST_MOIM_JOIN);
export const postMoimExitAction = createAction(POST_MOIM_EXIT);
export const putPaymentCheckAction = createAction(PUT_PAYMENT_CHECK);
export const putStaffCheckAction = createAction(PUT_STAFF_CHECK);
export const setIsEditAction = (payload) => ({
  type: SET_IS_EDIT,
  payload,
});
export const resetDetailAction = () => ({
  type: RESET_DETAIL,
});

// initialState
const initialState = {
  loading: false,
  moim: {},
  isEdit: false,
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
        draft.isEdit = false;
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
        draft.isEdit = false;
        break;
      }
      case GET_MEETING.FAILURE: {
        draft.loading = false;
        break;
      }
      case PUT_COMMUNITY.REQUEST: {
        draft.loading = true;
        break;
      }
      case PUT_COMMUNITY.SUCCESS: {
        draft.moim = action.payload;
        draft.isEdit = false;
        break;
      }
      case PUT_COMMUNITY.FAILURE: {
        draft.loading = false;
        break;
      }
      case PUT_MEETING.REQUEST: {
        draft.loading = true;
        break;
      }
      case PUT_MEETING.SUCCESS: {
        draft.moim = action.payload;
        draft.isEdit = false;
        break;
      }
      case PUT_MEETING.FAILURE: {
        draft.loading = false;
        break;
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
      case PUT_PAYMENT_CHECK.REQUEST: {
        draft.loading = true;
        break;
      }
      case PUT_PAYMENT_CHECK.SUCCESS: {
        draft.moim.memberList = action.payload;
        break;
      }
      case PUT_PAYMENT_CHECK.FAILURE: {
        draft.loading = false;
        break;
      }
      case PUT_STAFF_CHECK.REQUEST: {
        draft.loading = true;
        break;
      }
      case PUT_STAFF_CHECK.SUCCESS: {
        draft.moim.memberList = action.payload;
        break;
      }
      case PUT_STAFF_CHECK.FAILURE: {
        draft.loading = false;
        break;
      }
      case SET_IS_EDIT: {
        draft.isEdit = action.payload;
        break;
      }
      case RESET_DETAIL: {
        draft.moim = {};
        break;
      }
      default:
    }
  });
};
