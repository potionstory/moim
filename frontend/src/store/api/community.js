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
export const putCommunityAPI = (communityId, bodyParams, thumbImageFile) => {
  const {
    type,
    title,
    isLock,
    status,
    description,
    url,
    tags,
    userName,
    mainImage,
  } = bodyParams;

  const formData = new FormData();

  formData.set('type', type);
  formData.set('title', title);
  formData.set('isLock', JSON.stringify(isLock));
  formData.set('status', status);
  formData.set('description', description);
  formData.set('url', url);
  formData.set('tags', JSON.stringify(tags));
  formData.set('userName', userName);
  
  if (thumbImageFile !== null) {
    formData.append('thumbImageFile', JSON.stringify(thumbImageFile));
  } else {
    formData.set('mainImage', mainImage);
  }

  return api.put(`/community/${communityId}`, formData);
}
  
