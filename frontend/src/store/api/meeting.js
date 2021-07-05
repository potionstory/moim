import api from './index';

// get all meeting
export const getAllMeetingAPI = () => api.get('/meetings');

// get one meeting
export const getMeetingAPI = (meetingId) => api.get(`/meeting/${meetingId}`);

// put one meeting
export const putMeetingAPI = (meetingId, bodyParams) =>
  api.put(`/meeting/${meetingId}`, bodyParams);

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

// put meeting passnumber
export const putMeetingPassnumberAPI = (meetingId, bodyParams) => {
  return api
    .put(`/meeting/passnumber/${meetingId}`, bodyParams)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
}

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
