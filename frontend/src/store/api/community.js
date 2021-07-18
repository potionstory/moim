import api from './index';

// get all community
export const getAllCommunityAPI = () => api.get('/communitys');

// get one community
export const getCommunityAPI = (communityId) =>
  api.get(`/community/${communityId}`);

// post community passnumber(check)
export const postCommunityPassNumberAPI = (communityId, bodyParams) => {
  return api
    .post(`/community/passnumber/${communityId}`, bodyParams)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

// put community passnumber(setting)
export const putCommunityPassNumberAPI = (communityId, bodyParams) => {
  return api
    .put(`/community/passnumber/${communityId}`, bodyParams)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

// put one community
export const putCommunityAPI = (communityId, bodyParams) =>
  api.put(`/community/${communityId}`, bodyParams);
