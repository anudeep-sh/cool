import performRequest from '../../axios';

export const contestAnnouncementAPI = {
  createAnnouncement: async (id, body) => {
    return await performRequest(`announcements/${id}`, 'POST', body);
  },

  getAnnouncements: async (id) => {
    return await performRequest(`announcements/${id}`, 'GET');
  },
};
