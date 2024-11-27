import axios from 'axios';
import Cookies from 'js-cookie';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables()


const stutzApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: configurar interceptores
stutzApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        // 'x-token': localStorage.getItem('token')
        'x-token': Cookies.get('token')
        // 'x-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NGE3ZThkMGYzMjdjZTFjZDA2NDEyNjYiLCJlbWFpbCI6ImZlcm5hbmRvQGdvb2dsZS5jb20iLCJpYXQiOjE2ODk5NzU1NDYsImV4cCI6MTY4OTk4Mjc0Nn0.ERGR_v_6-3ZPvWSxMPgRV7bR0RW_lZGpL6blvzHqYXI"
    }

    return config;
})


export default stutzApi;



