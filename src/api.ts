import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sagatibamusicapi.zapto.org/api',
});

export default api;
