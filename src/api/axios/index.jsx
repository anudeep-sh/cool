import axios from 'axios';
import handleError from '../errors';
import { getOrgName } from '../../utils/appendOrgQuery';
const PerformRequest = (url, method, body, params) => {
  const Token = localStorage.getItem('Token');
  const selectedOrganization = getOrgName();
  if (selectedOrganization !== null) {
    if (url.includes('?')) url += '&organization=true';
    else url += '?organization=true';
  }
  const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      organization: selectedOrganization,
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

export default PerformRequest;
