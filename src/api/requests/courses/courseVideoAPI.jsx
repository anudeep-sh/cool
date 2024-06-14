import performRequest from '../../axios';

export const courseVideoAPI = {
  getUserProgress: async (id) => {
    return await performRequest(`progress/${id}`, 'GET');
  },

  updateUserProgress: async (id, body) => {
    return await performRequest(`progress/${id}`, 'PATCH', body);
  },

  addReviews: async (id, body) => {
    return await performRequest(`rating/${id}`, 'POST', body);
  },

  getReviews: async (id, page) => {
    return await performRequest(`rating/${id}/${page}`, 'GET');
  },

  handleLikesAndDislikes: async (id, text) => {
    return await performRequest(`review/${id}/${text}`, 'POST');
  },
  getVideoIntervals: async () => {
    return await performRequest('intervals', 'GET');
  },
};
