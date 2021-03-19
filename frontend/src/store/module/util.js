import produce from 'immer';
import { util } from '../../lib/const';

// action type
const FILTER_CHECK = 'FILTER_CHECK';
const SORT_CHECK = 'SORT_CHECK';
const UTIL_RESET = 'UTIL_RESET';

// action 생성자 함수
export const filterCheck = (payload) => ({
  type: FILTER_CHECK,
  payload,
});

export const sortCheck = (payload) => ({
  type: SORT_CHECK,
  payload,
});

export const utilReset = (payload) => ({
  type: UTIL_RESET,
  payload,
});

const initialState = util;

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case FILTER_CHECK: {
        const { utilTitle, tabIndex, filterIndex, itemIndex } = action.payload;

        draft[utilTitle][tabIndex][filterIndex][itemIndex].isChecked = !draft[utilTitle][tabIndex][filterIndex][itemIndex].isChecked;
        break;
      }
      case SORT_CHECK: {
        const { utilTitle, filterIndex, itemIndex } = action.payload;

        draft[utilTitle][filterIndex][itemIndex].isChecked = !draft[utilTitle][filterIndex][itemIndex].isChecked;
        break;
      }
      case UTIL_RESET: {
        const { utilTitle } = action.payload;

        draft[utilTitle] = initialState[utilTitle];
        break;
      }
      default:
    }
  });
}