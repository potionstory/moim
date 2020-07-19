import produce from 'immer';
import { createType, createAction } from './helper';

// action type
export const SOCIAL_SIGN = createType('SOCIAL_SIGN');
export const SOCIAL_SIGN_UP = createType('SOCIAL_SIGN_UP');
export const SOCIAL_SIGN_IN = createType('SOCIAL_SIGN_IN');
export const SIGN_UP = createType('SIGN_UP');
export const SIGN_IN = createType('SIGN_IN');
export const SIGN_OUT = createType('SIGNOUT');
export const GET_USER = createType('GET_USER');

// action 생성자 함수
export const socialSignAction = createAction(SOCIAL_SIGN);
export const socialSignUpAction = createAction(SOCIAL_SIGN_UP);
export const socialSignInAction = createAction(SOCIAL_SIGN_IN);
export const signUpAction = createAction(SIGN_UP);
export const signInAction = createAction(SIGN_IN);
export const signOutAction = createAction(SIGN_OUT);
export const getUserAction = createAction(GET_USER);

// initialState
const initialState = {
  loading: false,
  socialInfo: null,
  isAuth: false,
  userInfo: null,
};

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SOCIAL_SIGN.REQUEST: {
        draft.loading = true;
        break;
      }
      case SOCIAL_SIGN.SUCCESS: {
        draft.loading = false;
        draft.socialInfo = action.payload;
        break;
      }
      case SOCIAL_SIGN.FAILURE: {
        draft.loading = false;
        break;
      }
      case SOCIAL_SIGN_UP.REQUEST: {
        draft.loading = true;
        break;
      }
      case SOCIAL_SIGN_UP.SUCCESS: {
        draft.loading = false;
        draft.socialInfo = null;
        break;
      }
      case SOCIAL_SIGN_UP.FAILURE: {
        draft.loading = false;
        break;
      }
      case SOCIAL_SIGN_IN.REQUEST: {
        draft.loading = true;
        break;
      }
      case SOCIAL_SIGN_IN.SUCCESS: {
        draft.loading = false;
        break;
      }
      case SOCIAL_SIGN_IN.FAILURE: {
        draft.loading = false;
        break;
      }
      case SIGN_UP.REQUEST: {
        draft.loading = true;
        break;
      }
      case SIGN_UP.SUCCESS: {
        draft.loading = false;
        break;
      }
      case SIGN_UP.FAILURE: {
        draft.loading = false;
        break;
      }
      case SIGN_IN.REQUEST: {
        draft.loading = true;
        break;
      }
      case SIGN_IN.SUCCESS: {
        draft.loading = false;
        break;
      }
      case SIGN_IN.FAILURE: {
        draft.loading = false;
        break;
      }
      case SIGN_OUT.REQUEST: {
        draft.loading = true;
        break;
      }
      case SIGN_OUT.SUCCESS: {
        draft.loading = false;
        draft.isAuth = false;
        draft.userInfo = null;
        break;
      }
      case SIGN_OUT.FAILURE: {
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
