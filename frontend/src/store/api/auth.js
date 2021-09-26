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
  const {
    email,
    userName,
    userImageUrl,
    userAvatar,
    userId,
    token,
    userImageFile,
  } = bodyParams;

  const formData = new FormData();

  formData.set('email', email);
  formData.set('userName', userName);
  formData.set('userImageUrl', userImageUrl);
  formData.set('userAvatar', JSON.stringify(userAvatar));
  formData.set('userId', userId);
  formData.set('token', token);
  formData.append('userImageFile', userImageFile);

  return api
    .post('social-signup', formData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

// 소셜 회원 로그인
export const postSocialSignIn = (token) => setAuthorizationHeader(token);

// 회원 가입
export const postSignUp = (bodyParams) => {
  const {
    email,
    password,
    confirmPassword,
    userName,
    userAvatar,
    userImageFile,
  } = bodyParams;

  const formData = new FormData();

  formData.set('email', email);
  formData.set('password', password);
  formData.set('confirmPassword', confirmPassword);
  formData.set('userName', userName);
  formData.set('userAvatar', JSON.stringify(userAvatar));
  formData.append('userImageFile', userImageFile);

  return api
    .post('/signup', formData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      return res;
    })
    .catch((err) => {
      return err.response;
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
export const getUser = () =>
  api
    .get('/user')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
