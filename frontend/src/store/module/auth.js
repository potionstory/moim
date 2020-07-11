import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const SIGNIN = createType('SIGNIN');

// action 생성자 함수
export const signinAction = createAction(SIGNIN);

// initialState
const initialState = {
  loading: false,
  isSignin: false,
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
        draft.userInfo = action.payload;
        break;
      }
      case SIGNIN.FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
};
