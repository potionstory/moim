import axios from 'axios';

const api = axios.create();

api.defaults.baseURL = 'https://us-central1-moim-app.cloudfunctions.net/api';

export default api;
