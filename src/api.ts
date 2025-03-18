import axios from 'axios';

const api = axios.create({
  baseURL: 'http://18.229.132.107:5001/api',
});

export default api;
