import api from './index';
import { isNull } from 'lodash';

// get all community
export const getAllCommunityAPI = () => api.get('/communitys');

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
    userAvatar,
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
  formData.set('userAvatar', JSON.stringify(userAvatar));
  formData.set('userName', userName);
  formData.append('mainImageFile', mainImageFile);

  // passNumber
  if (passNumber.join('').length === 6) {
    formData.set('passNumber', passNumber.join(''));
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

// put one community
export const putCommunityAPI = (communityId, bodyParams, thumbImageFile) => {
  if (isNull(thumbImageFile)) {
    return api.put(`/community/${communityId}`, bodyParams);
  } else {
    const formData = new FormData();
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
    } = bodyParams;

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
    }

    // passNumber
    if (passNumber.join('').length === 6) {
      formData.set('passNumber', passNumber.join(''));
    }

    return api.put(`/community/thumb/${communityId}`, formData);
  }
};
