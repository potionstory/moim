import produce from 'immer';

// action type
export const THEME_TOGGLE = 'THEME_TOGGLE';
export const SIGNIN_MODAL_OPEN = 'SIGNIN_MODAL_OPEN';
export const SIGNUP_MODAL_OPEN = 'SIGNUP_MODAL_OPEN';
export const JOIN_MODAL_OPEN = 'JOIN_MODAL_OPEN';
export const EXIT_MODAL_OPEN = 'EXIT_MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

// action 생성자 함수
export const themeToggleAction = () => ({
  type: THEME_TOGGLE,
});
export const signInModalOpenAction = () => ({
  type: SIGNIN_MODAL_OPEN,
});
export const signUpModalOpenAction = () => ({
  type: SIGNUP_MODAL_OPEN,
});
export const joinModalOpenAction = () => ({
  type: JOIN_MODAL_OPEN,
});
export const exitModalOpenAction = () => ({
  type: EXIT_MODAL_OPEN,
});
export const modalCloseAction = () => ({
  type: MODAL_CLOSE,
});

// initialState
const initialState = {
  loading: false,
  theme: false, // true: Light, false: Dark
  modal: {
    isVisible: false,
    name: null,
  },
};

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case THEME_TOGGLE: {
        draft.theme = !draft.theme;
        break;
      }
      case SIGNIN_MODAL_OPEN: {
        draft.modal.isVisible = true;
        draft.modal.name = 'SIGN_IN';
        break;
      }
      case SIGNUP_MODAL_OPEN: {
        draft.modal.isVisible = true;
        draft.modal.name = 'SIGN_UP';
        break;
      }
      case JOIN_MODAL_OPEN: {
        draft.modal.isVisible = true;
        draft.modal.name = 'MOIM_JOIN';
        break;
      }
      case EXIT_MODAL_OPEN: {
        draft.modal.isVisible = true;
        draft.modal.name = 'MOIM_EXIT';
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
