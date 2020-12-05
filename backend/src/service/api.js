import axios from 'axios';
import moment from 'moment';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com',
  headers: {
    ContentType: 'application/json',
    charset: 'utf-8',
    Date: moment().format("llll"),
  },
});

export default api;
