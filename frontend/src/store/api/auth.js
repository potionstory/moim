import api from './index';
import { setAuthorizationHeader, deleteAuthorizationHeader } from './util';

export const firebaseToken = (user) => {
  return api
    .post('firebase-token', user)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

// 소셜 회원 가입
export const postSocialSignUp = (bodyParams) => {
  const formData = new FormData();

  formData.set('email', bodyParams.email);
  formData.set('userName', bodyParams.userName);
  formData.set('userImageUrl', bodyParams.userImageUrl);
  formData.set('userAvatar', JSON.stringify(bodyParams.userAvatar));
  formData.set('userId', bodyParams.userId);
  formData.set('token', bodyParams.token);
  formData.append('userImageFile', bodyParams.userImageFile);

  return api
    .post('social-signup', formData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

// 소셜 회원 로그인
export const postSocialSignIn = (token) => setAuthorizationHeader(token);

// 회원 가입
export const postSignUp = (bodyParams) => {
  const formData = new FormData();

  formData.set('email', bodyParams.email);
  formData.set('password', bodyParams.password);
  formData.set('confirmPassword', bodyParams.confirmPassword);
  formData.set('userName', bodyParams.userName);
  formData.set('userAvatar', JSON.stringify(bodyParams.userAvatar));
  formData.append('userImageFile', bodyParams.userImageFile);

  return api
    .post('/signup', formData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};

// 회원 로그인
export const postSignIn = (bodyParams) =>
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
