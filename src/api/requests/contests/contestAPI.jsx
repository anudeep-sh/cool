import performRequest from '../../axios';

export const contestAPI = {
  getContest: async (id) => {
    return await performRequest(`contest/${id}`, 'GET');
  },
  getContests: async (status, page) => {
    return await performRequest(`contests/${page}?status=${status}`, 'GET');
  },
  getUserContests: async (searchValue, status, pageNumber) => {
    let query = '';
    if (searchValue) {
      query += `search=${searchValue}&`;
    }
    if (status) {
      query += `status=${status}`;
    }

    return await performRequest(`user/contests/${pageNumber}?${query}`, 'GET');
  },
  createContest: async (body) => {
    return await performRequest('contest', 'POST', body);
  },
  editContest: async (id, body) => {
    return await performRequest(`contest/${id}`, 'PATCH', body);
  },
  searchUser: async (id, searchField, page) => {
    return await performRequest(`results/${id}/${page}?search=${searchField}`, 'GET');
  },
  postResults: async (id) => {
    return await performRequest(`results/${id}`, 'POST');
  },
  getUserProblemsScore: async (contestId, userId) => {
    return await performRequest(`result/${contestId}/${userId}`, 'GET');
  },
  getAttemptedContest: async (page) => {
    return await performRequest(`/attempted/contests/${page}`);
  },
};
