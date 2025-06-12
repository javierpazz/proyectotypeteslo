import axios from 'axios';
import Cookies from 'js-cookie';


const stutzApi = axios.create({
  // baseURL: "http://127.0.0.101:4000/api/tes"
  baseURL: "http://127.0.0.101:4000"
});

stutzApi.interceptors.request.use(config => {
  const token = Cookies.get('token');

  if (token && config.headers) {
    config.headers['x-token'] = token;
    config.headers['authorization'] = (`Bearer ${token}`);
  }

  return config;
});

export default stutzApi;
