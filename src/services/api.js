import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eufitapi.herokuapp.com',
});

export default api;
