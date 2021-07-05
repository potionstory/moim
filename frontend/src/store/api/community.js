import api from './index';

// get all community
export const getAllCommunityAPI = () => api.get('/communitys');

// get one community
export const getCommunityAPI = (communityId) =>
  api.get(`/community/${communityId}`);

// put meeting passnumber
export const putCommunityPassnumberAPI = (communityId, bodyParams) => {
  return api
    .put(`/community/passnumber/${communityId}`, bodyParams)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
}

// put one community
export const putCommunityAPI = (communityId, bodyParams) => api.put(`/community/${communityId}`, bodyParams);
