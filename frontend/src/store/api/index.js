import axios from 'axios';

const api = axios.create();

//api.defaults.baseURL = 'https://us-central1-moim-app.cloudfunctions.net/api';
api.defaults.baseURL = 'http://localhost:5000/moim-app/us-central1/api';

export default api;
