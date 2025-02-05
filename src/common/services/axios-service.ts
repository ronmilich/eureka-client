import axios from 'axios';

export const configureAxios = () => {
  axios.defaults.baseURL = 'http://localhost:3000/api/v1';
  axios.defaults.withCredentials = true;
};
