import performRequest from '../../axios';

export const courseReviewAPI = {
  addReviews: async (id, body) => {
    return await performRequest(`rating/${id}`, 'POST', body);
  },

  getReviews: async (id, page) => {
    return await performRequest(`rating/${id}/${page}`, 'GET');
  },

  updateReviews: async (id, body) => {
    return await performRequest(`review/${id}`, 'PATCH', body);
  },

  handleLikesAndDislikes: async (id, text, body) => {
    return await performRequest(`review/${id}/${text}`, 'POST', body);
  },

  addReviewReport: async (id, body) => {
    return await performRequest(`review/${id}/REPORT`, 'POST', body);
  },
  deleteReview: async (id, body) => {
    return await performRequest(`review/${id}`, 'DELETE', body);
  },
};
