import axios from 'axios';

export default axios;

export const initAxios = (accessToken) => {
  axios.defaults.baseURL = 'https://api.fitbit.com/1/user/-/';
  axios.defaults.headers = {Authorization: `Bearer ${accessToken}`};
  console.log('[Axios] Configured');
};
