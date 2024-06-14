import performRequest from '../../axios';

export const contestProblemAPI = {
  createProblem: async (id, body) => {
    return await performRequest(`problem/${id}`, 'POST', body);
  },

  editProblem: async (id, body) => {
    return await performRequest(`problem/${id}`, 'PATCH', body);
  },

  getProblem: async (id) => {
    return await performRequest(`problem/${id}`, 'GET');
  },

  submitSolution: async (id, body) => {
    return await performRequest(`problem/${id}/submission`, 'POST', body);
  },

  getSubmissions: async (id) => {
    return await performRequest(`problem/submissions/${id}`, 'GET');
  },
  getSubmissionsToScore: async (id, pageNo) => {
    return await performRequest(`problem/submissions/${id}/${pageNo}`, 'GET');
  },
  updateScore: async (body) => {
    return await performRequest('/score', 'PATCH', body);
  },
};
