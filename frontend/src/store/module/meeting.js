import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const GET_ALL_MEETING = createType('GET_ALL_MEETING');

// action 생성자 함수
export const getAllMeetingAction = createAction(GET_ALL_MEETING);

// initialState
const initialState = {
  loading: false,
  list: [],
};

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_ALL_MEETING.REQUEST: {
        draft.loading = true;
        break;
      }
      case GET_ALL_MEETING.SUCCESS: {
        draft.list = action.payload;
        break;
      }
      case GET_ALL_MEETING.FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
};
