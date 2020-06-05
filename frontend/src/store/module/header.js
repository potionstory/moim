import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const TOGGLE_MODE = createType('TOGGLE_MODE');

// action 생성자 함수
export const toggleModeAction = createAction(TOGGLE_MODE);

// initialState
const initialState = {
  loading: false,
  mode: false, // true: Light, false: Dark
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
      default:
    }
  });
};
