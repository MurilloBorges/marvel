import axios from 'axios';
import { getToken } from './authentication';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  const configuration = config;
  const token = getToken();
  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
