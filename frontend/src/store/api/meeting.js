import api from './index';

// get all meeting
export const getAllMeetingAPI = () => api.get('/meetings');

// post meeting create
export const postMeetingAPI = (bodyParams) => {
  const {
    type,
    title,
    isLock,
    passNumber,
    status,
    description,
    payInfo,
    tags,
    startDate,
    endDate,
    location,
    memberSetting,
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
  formData.set('payInfo', JSON.stringify(payInfo));
  formData.set('tags', JSON.stringify(tags));
  formData.set('startDate', JSON.stringify(startDate));
  formData.set('endDate', JSON.stringify(endDate));
  formData.set('location', JSON.stringify(location));
  formData.set('memberSetting', JSON.stringify(memberSetting));
  formData.set('userId', userId);
  formData.set('userImage', userImage);
  formData.set('userAvatar', JSON.stringify(userAvatar));
  formData.set('userName', userName);
  formData.append('mainImageFile', mainImageFile);

  // passNumber
  if (passNumber.join("").length === 6) {
    formData.set('passNumber', passNumber.join(""));
  }

  return api
    .post(`/meeting`, formData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

// get one meeting
export const getMeetingAPI = (meetingId) => api.get(`/meeting/${meetingId}`);

// put one meeting
export const putMeetingAPI = (meetingId, bodyParams, thumbImageFile) => {
  const {
    type,
    title,
    isLock,
    passNumber,
    status,
    payInfo,
    description,
    startDate,
    endDate,
    location,
    memberSetting,
    memberList,
    waiter,
    tags,
    userName,
    mainImage,
  } = bodyParams;

  const formData = new FormData();

  formData.set('type', type);
  formData.set('title', title);
  formData.set('isLock', JSON.stringify(isLock));
  formData.set('status', status);
  formData.set('payInfo', JSON.stringify(payInfo));
  formData.set('description', description);
  formData.set('startDate', JSON.stringify(startDate));
  formData.set('endDate', JSON.stringify(endDate));
  formData.set('location', JSON.stringify(location));
  formData.set('memberSetting', JSON.stringify(memberSetting));
  formData.set('memberList', JSON.stringify(memberList));
  formData.set('waiter', JSON.stringify(waiter));
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

  return api.put(`/meeting/${meetingId}`, formData);
};

// post meeting join
export const postMeetingJoinAPI = (meetingId, bodyParams) =>
  api.put(`/meeting/${meetingId}/join`, bodyParams);

// post meeting exit
export const postMeetingExitAPI = (meetingId, bodyParams) => {
  return api
    .put(`/meeting/${meetingId}/exit`, bodyParams)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

// post meeting passnumber(check)
export const postMeetingPassNumberAPI = (meetingId, bodyParams) => {
  return api
    .post(`/meeting/passnumber/${meetingId}`, bodyParams)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

// put payment check
export const putPaymentCheckAPI = (meetingId, bodyParams) => {
  return api
    .put(`/meeting/paymentCheck/${meetingId}`, bodyParams)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

//put staff cehck
export const putStaffCheckAPI = (meetingId, bodyParams) => {
  return api
    .put(`/meeting/staffCheck/${meetingId}`, bodyParams)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
