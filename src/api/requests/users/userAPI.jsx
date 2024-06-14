import performRequest from '../../axios';

export const userAPI = {
  getUserInfo: async () => {
    return await performRequest(`user`, 'GET');
  },
  uploadUserInfo: async (body) => {
    return await performRequest(`user`, 'PATCH', body);
  },
  uploadUserResume: async (body) => {
    return await performRequest(`user/resume`, 'PATCH', body);
  },
  uploadUserImage: async (body) => {
    return await performRequest(`user/image`, 'PATCH', body);
  },
};
