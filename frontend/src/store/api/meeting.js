import api from './index';

// get all meeting
export const getAllMeetingAPI = () => api.get('/meetings');

// get one meeting
export const getMeetingAPI = (meetingId) => api.get(`/meeting/${meetingId}`);

// post meeting join
export const postMeetingJoinAPI = (meetingId, bodyParams) =>
  api.put(`/meeting/join/${meetingId}`, bodyParams);

// post meeting exit
export const postMeetingExitAPI = (meetingId, bodyParams) => {
  return api
    .put(`/meeting/exit/${meetingId}`, bodyParams)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
