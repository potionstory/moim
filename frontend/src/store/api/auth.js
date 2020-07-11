import api from './api';
import { setAuthorizationHeader } from './util';

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

// user 정보 가져오기
export const getUser = () => api.get('/user');
