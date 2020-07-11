import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const TOGGLE_MODE = createType('TOGGLE_MODE');
export const SIGNIN_MODAL_OPEN = 'SIGNIN_MODAL_OPEN';
export const SIGNUP_MODAL_OPEN = 'SIGNUP_MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

// action 생성자 함수
export const toggleModeAction = createAction(TOGGLE_MODE);
export const signInModalOpenAction = () => ({
  type: SIGNIN_MODAL_OPEN,
});
export const signUpModalOpenAction = () => ({
  type: SIGNUP_MODAL_OPEN,
});
export const modalCloseAction = () => ({
  type: MODAL_CLOSE,
});

// initialState
const initialState = {
  loading: false,
  mode: true, // true: Light, false: Dark
  modal: {
    isVisible: false,
    name: null,
  },
};

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TOGGLE_MODE.REQUEST: {
        draft.loading = true;
        break;
      }
      case TOGGLE_MODE.SUCCESS: {
        draft.mode = action.payload;
        break;
      }
      case TOGGLE_MODE.FAILURE: {
        draft.loading = false;
        break;
      }
      case SIGNIN_MODAL_OPEN: {
        draft.modal.isVisible = true;
        draft.modal.name = 'SIGNIN';
        break;
      }
      case SIGNUP_MODAL_OPEN: {
        draft.modal.isVisible = true;
        draft.modal.name = 'SIGNUP';
        break;
      }
      case MODAL_CLOSE: {
        draft.modal.isVisible = false;
        draft.modal.name = null;
        break;
      }
      default:
    }
  });
};
