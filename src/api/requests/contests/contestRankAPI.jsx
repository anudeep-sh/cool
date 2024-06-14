import performRequest from '../../axios';

export const contestRankAPI = {
  getContestRanks: async (id, page) => {
    return await performRequest(`results/${id}/${page}`, 'GET');
  },

  getGlobalRanks: async (page) => {
    return await performRequest(`globalrankings/DEV/${page}`);
  },
  getOrgRanks: async (page) => {
    return await performRequest(`organization/ranks/${page}`);
  },
  getOrgRanksSearch: async (page, search) => {
    return await performRequest(`organization/ranks/${page}?search=${search}`);
  },
};
