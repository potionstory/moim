import api from './index';
import { setAuthorizationHeader, deleteAuthorizationHeader } from './util';

// 회원 가입
export const signup = (bodyParams) =>
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
export const signin = (bodyParams) =>
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
export const signout = () => deleteAuthorizationHeader();

// user 정보 가져오기
export const getUser = () => api.get('/user');
