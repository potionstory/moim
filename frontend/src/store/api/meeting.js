import api from './api';

// 모든 커뮤니티 조회
export const getAllMeetingAPI = () => api.get('/communitys');
