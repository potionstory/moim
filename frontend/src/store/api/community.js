import api from './index';

// 모든 커뮤니티 조회
export const getAllCommunityAPI = () => api.get('/communitys');
