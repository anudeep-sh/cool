import performRequest from '../../axios';

export const courseUploadAPI = {
  uploadFile: async (id, body) => {
    return await performRequest(`file/${id}`, 'POST', body);
  },

  deleteFile: async (id) => {
    return await performRequest(`file/${id}`, 'DELETE');
  },

  updateFile: async (id, body) => {
    return await performRequest(`file/${id}`, 'PATCH', body);
  },

  uploadVideo: async (id, body) => {
    return await performRequest(`video/${id}`, 'POST', body);
  },

  updateVideo: async (id, body) => {
    return await performRequest(`video/${id}`, 'PATCH', body);
  },

  deleteVideo: async (id) => {
    return await performRequest(`video/${id}`, 'DELETE');
  },

  createSection: async (id, body) => {
    return await performRequest(`section/${id}`, 'POST', body);
  },

  updateSection: async (id, body) => {
    return await performRequest(`section/${id}`, 'PATCH', body);
  },

  deleteSection: async (id) => {
    return await performRequest(`section/${id}`, 'DELETE');
  },
};
