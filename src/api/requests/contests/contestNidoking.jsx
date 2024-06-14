import performRequest from '../../axios';

export const contestNidokingAPI = {
  getAllApplications: async () => {
    return await performRequest(`application`, 'GET');
  },

  createApplication: async (body) => {
    return await performRequest(`application`, 'POST', body);
  },
};
