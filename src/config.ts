import axios from 'axios';
import authHelper from './authHelper';

let url = '';

switch (process.env.NODE_ENV) {
    case 'development':
        url = `http://localhost:8000/api/v2`;
        break;
    case 'production':
        url = `https://intree-demo.herokuapp.com/api/v2`;
        break;
    default:
        break;
}

const inTreeApi = axios.create({
    baseURL: url,
});

inTreeApi.interceptors.request.use(function (config) {
    const TOKEN = authHelper.get();
    config.headers.Authorization = `Bearer ${TOKEN}`;
    return config;
});

export { inTreeApi };
