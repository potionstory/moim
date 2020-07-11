import api from './api';

export const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  api.defaults.headers.common['Authorization'] = FBIdToken;
};
