import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const SIGNIN = createType('SIGNIN');
export const GET_USER = createType('GET_USER');

// action 생성자 함수
export const signinAction = createAction(SIGNIN);
export const getUserAction = createAction(GET_USER);

// initialState
const initialState = {
  loading: false,
  isAuth: false,
  userInfo: null,
};

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SIGNIN.REQUEST: {
        draft.loading = true;
        break;
      }
      case SIGNIN.SUCCESS: {
        draft.loading = false;
        break;
      }
      case SIGNIN.FAILURE: {
        draft.loading = false;
        break;
      }
      case GET_USER.REQUEST: {
        draft.loading = true;
        break;
      }
      case GET_USER.SUCCESS: {
        draft.loading = false;
        draft.isAuth = true;
        draft.userInfo = action.payload;
        break;
      }
      case GET_USER.FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
};
