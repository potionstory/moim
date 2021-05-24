import api from './index';

// get all meeting
export const getAllMeetingAPI = () => api.get('/meetings');

// get one meeting
export const getMeetingAPI = (meetingId) => api.get(`/meeting/${meetingId}`);

// post meeting join
export const postMeetingJoinAPI = (meetingId, bodyParams) => {
  api.put(`/meeting/join/${meetingId}`, bodyParams);


  // return api
  //   .post('social-signup', formData)
  //   .then((res) => {
  //     setAuthorizationHeader(res.data.token);
  //     return res;
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
};
