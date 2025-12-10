import axios from 'axios';
import Cookies from 'js-cookie';


const stutzApi = axios.create({
  // baseURL: "http://127.0.0.101:4000/api/tes"
  // baseURL: "http://127.0.0.101:4000" ip localhost
/// esta era
baseURL: "http://127.0.0.101:4000"
// baseURL: "https://jpz-stutz.onrender.com"
/// esta era

  // baseURL: "http://192.168.0.101:4000"
  // baseURL: "http://192.168.1.99:4000" ipfija mia cuarto
  // baseURL: "http://192.168.0.100:4000" ipfija mia ofi
  // baseURL: "http://192.168.100.150:4000" ipfija pia
  // baseURL: "http://192.168.100.150:4000"
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
