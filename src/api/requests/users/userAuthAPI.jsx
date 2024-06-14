import performRequest from '../../axios';

export const userAuthAPI = {
  signUp: async (body) => {
    return await performRequest(`signup`, 'POST', body);
  },
  signIn: async (body) => {
    return await performRequest(`signin`, 'POST', body);
  },
  verifyUser: async (id) => {
    return await performRequest(`verifyuser/${id}`, 'GET');
  },
  requestPasswordUpdate: async (body) => {
    return await performRequest(`requestupdate`, 'POST', body);
  },
  resetPassword: async (id, body) => {
    return await performRequest(`resetpassword/${id}`, 'POST', body);
  },
};
