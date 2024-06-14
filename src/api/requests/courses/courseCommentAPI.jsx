import performRequest from '../../axios';

export const courseCommentAPI = {
  getComments: async (id, page) => {
    return await performRequest(`comment/${id}/${page}`, 'GET');
  },

  addComment: async (id, body) => {
    return await performRequest(`comment/${id}`, 'POST', body);
  },

  editComment: async (id, body) => {
    return await performRequest(`comment/${id}`, 'PATCH', body);
  },

  deleteComment: async (id) => {
    return await performRequest(`comment/${id}`, 'DELETE');
  },

  getReply: async (id, page, commentId) => {
    return await performRequest(`comment/${id}/${page}?commentId=${commentId}`, 'GET');
  },
};
