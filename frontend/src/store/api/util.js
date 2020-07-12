import api from './index';

export const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  api.defaults.headers.common['Authorization'] = FBIdToken;
};

export const deleteAuthorizationHeader = () => {
  try {
    localStorage.removeItem('FBIdToken');
    delete api.defaults.headers.common['Authorization'];
    return true;
  } catch (e) {
    console.error(e);
  }
};
