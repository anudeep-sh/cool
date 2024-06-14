import axios from 'axios';
import handleError from '../errors';

const PerformRequestBackend = (url, method, body, params) => {
  const Token = localStorage.getItem('Token');
  const api = axios.create({
    baseURL: process.env.REACT_APP_SCHEMA_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      organization: null,
      Authorization: `bearer ${Token}`,
    },
  });

  return new Promise((resolve, reject) => {
    api
      .request({ method: method, url: url, data: body, params: params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        handleError(error, reject);
      });
  });
};

export default PerformRequestBackend;
