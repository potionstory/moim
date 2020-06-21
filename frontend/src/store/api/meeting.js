import api from './api';

// 모든 모임 조회
export const getAllMeetingAPI = () => api.get('/meetings');
