import { createAction, handleActions } from 'redux-actions';

// action type
const GET_COMMUNITY = 'community/GET_ONLINE';

// action 생성자 함수
export const getCommunity = createAction(GET_COMMUNITY);

// initialState
const initialState = {
  list: [],
};

const community = handleActions(
  {
    [GET_COMMUNITY]: (state, action) => {
      return {
        list: [1, 2, 3],
      };
    },
  },
  initialState,
);

export default community;
