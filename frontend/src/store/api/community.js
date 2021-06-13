import api from './index';

// get all community
export const getAllCommunityAPI = () => api.get('/communitys');

// get one community
export const getCommunityAPI = (communityId) =>
  api.get(`/community/${communityId}`);

// put one community
export const putCommunityAPI = (communityId, bodyParams) => {
  console.log(
    '%c 🍧 bodyParams: ',
    'font-size:20px;background-color: #E41A6A;color:#fff;',
    bodyParams,
  );
  return api.put(`/community/${communityId}`, bodyParams);
};
