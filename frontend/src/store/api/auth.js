import api from './index';
import { setAuthorizationHeader, deleteAuthorizationHeader } from './util';

// 소셜 회원 가입
export const socialSignUp = (bodyParams) =>
  api
    .post('social-signup', bodyParams)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });

// 소셜 회원 로그인
export const socialSignIn = (token) => setAuthorizationHeader(token);

// 회원 가입
export const signUp = (bodyParams) =>
  api
    .post('/signup', bodyParams)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });

// 회원 로그인
export const signIn = (bodyParams) =>
  api
    .post('/signin', bodyParams)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });

// 회원 로그아웃
export const signOut = () => deleteAuthorizationHeader();

// user 정보 가져오기
export const getUser = () => api.get('/user');
