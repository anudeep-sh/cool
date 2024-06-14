import performRequest from '../../axios';
import GetValidatedTokenData from '../../../utils/helper';
import { getOrgDomain } from '../../../organization';

const BASE_PARAMS = { applicationId: process.env.REACT_APP_APPLICATION_ID };
const data = GetValidatedTokenData();
const token = localStorage.getItem('Token');

export const imageAPI = {
  getAllImages: async () => {
    const domain = getOrgDomain();
    let params = { ...BASE_PARAMS };
    if (domain) {
      params = { ...params, organizationDomain: domain };
    }
    return await performRequest('images', 'GET', null, params);
  },

  getImageByName: async (name) => {
    const params = { ...BASE_PARAMS };
    return await performRequest(`images/${name}`, 'GET', null, params);
  },

  addImage: async (imageData) => {
    const params = { ...BASE_PARAMS };
    if (data.organizationId) params.organizationId = data.organizationId;

    return await performRequest('images', 'POST', imageData, params);
  },

  editImage: async (name, newUrl) => {
    const params = { ...BASE_PARAMS };
    if (data.organizationId) params.organizationId = data.organizationId;

    return await performRequest(`images/${name}`, 'PATCH', { url: newUrl }, params);
  },

  deleteImage: async (name) => {
    const params = { ...BASE_PARAMS };
    if (data.organizationId) params.organizationId = data.organizationId;

    return await performRequest(`images/${name}`, 'DELETE', null, params);
  },
};
