import performRequest from '../axios';

export const contactSupportAPI = {
  contactSupport: async (body) => {
    let res = await performRequest('contactSupport', 'POST', body);
    return res;
  },
  contactSales: async (body) => {
    let res = await performRequest('contactSales', 'POST', body);
    return res;
  },
};
