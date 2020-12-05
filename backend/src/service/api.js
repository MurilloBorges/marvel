import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com',
  headers: {
    ContentType: 'application/json',
    charset: 'utf-8',
  },
});

export default api;
