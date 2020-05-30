import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const GET_ALL_COMMUNITY = createType('GET_ALL_COMMUNITY');

// action 생성자 함수
export const getAllCommunityAction = createAction(GET_ALL_COMMUNITY);

// initialState
const initialState = {
  loading: false,
  list: [],
};

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case GET_ALL_COMMUNITY.REQUEST: {
        draft.loading = true;
        break;
      }
      case GET_ALL_COMMUNITY.SUCCESS: {
        draft.list = action.payload;
        break;
      }
      case GET_ALL_COMMUNITY.FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
};
