import api from './index';

// get all community
export const getAllCommunityAPI = () => api.get('/communitys');

// get one community
export const getCommunityAPI = (communityId) =>
  api.get(`/community/${communityId}`);

// post community create
export const postCommunityAPI = (bodyParams) => {
  const {
    type,
    title,
    isLock,
    passNumber,
    status,
    description,
    url,
    tags,
    userId,
    userImage,
    userName,
    mainImageFile,
  } = bodyParams;

  const formData = new FormData();

  formData.set('type', type);
  formData.set('title', title);
  formData.set('isLock', JSON.stringify(isLock));
  formData.set('status', status);
  formData.set('description', description);
  formData.set('url', url);
  formData.set('tags', JSON.stringify(tags));
  formData.set('userId', userId);
  formData.set('userImage', userImage);
  formData.set('userName', userName);
  formData.append('mainImageFile', mainImageFile);

  // passNumber
  if (passNumber.join("").length === 6) {
    formData.set('passNumber', passNumber.join(""));
  }

  return api
    .post(`/community`, formData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

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

// put one community
export const putCommunityAPI = (communityId, bodyParams, thumbImageFile) => {
  const {
    type,
    title,
    isLock,
    passNumber,
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

  // thumbImage
  if (thumbImageFile !== null) {
    formData.append('thumbImageFile', thumbImageFile);
  } else {
    formData.set('mainImage', mainImage);
  }

  // passNumber
  if (passNumber.join("").length === 6) {
    formData.set('passNumber', passNumber.join(""));
  }

  return api.put(`/community/${communityId}`, formData);
};
