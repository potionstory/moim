import api from './index';

// 모든 모임 조회
export const getAllMeetingAPI = () => api.get('/meetings');
