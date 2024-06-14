import performRequest from '../../axios';

export const bugAPI = {
  reportBug: async (body) => {
    return await performRequest(`reportbug`, 'POST', body);
  },
};
