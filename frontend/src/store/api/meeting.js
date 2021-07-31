import api from './index';

// get all meeting
export const getAllMeetingAPI = () => api.get('/meetings');

// get one meeting
export const getMeetingAPI = (meetingId) => api.get(`/meeting/${meetingId}`);

// put one meeting
export const putMeetingAPI = (meetingId, bodyParams) => {
  const {
    type,
    title,
    isLock,
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
    thumbImageFile,
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
  formData.append('thumbImageFile', thumbImageFile);

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

// put meeting passnumber(setting)
export const putMeetingPassNumberAPI = (meetingId, bodyParams) => {
  return api
    .put(`/meeting/passnumber/${meetingId}`, bodyParams)
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
