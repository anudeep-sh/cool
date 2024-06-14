import PerformRequest from '../../axios';

export const ChatApi = {
  getUsers: async () => {
    return await PerformRequest('chat', 'GET');
  },

  getUserChatDetails: async (userId, pageNumber) => {
    return await PerformRequest(`chat/${userId}/${pageNumber}`, 'GET');
  },

  deleteUserChat: async (userId) => {
    return await PerformRequest(`chat/user/${userId}`, 'DELETE');
  },

  searchUser: async (searchQuery) => {
    return await PerformRequest(`search/user?search=${searchQuery}`, 'GET');
  },

  getGroups: async () => {
    return await PerformRequest('chat/group', 'GET');
  },

  getGroupById: async (id, pageNumber) => {
    return await PerformRequest(`chat/group/${id}/${pageNumber}`, 'GET');
  },

  createGroup: async (data) => {
    return await PerformRequest('chat/group', 'POST', data);
  },

  updateGroupDetails: async (id, data) => {
    return await PerformRequest(`chat/group/${id}`, 'PATCH', data);
  },

  addUserToGroup: async (groupId, userIds) => {
    return await PerformRequest(`chat/group/user/${groupId}`, 'PATCH', { action: 'ADD', userIds });
  },

  removeUserFromGroup: async (groupId, userIds) => {
    return await PerformRequest(`chat/group/user/${groupId}`, 'PATCH', {
      action: 'REMOVE',
      userIds,
    });
  },

  handleGroupDeletion: async (id) => {
    return await PerformRequest(`chat/group/${id}${'?deleteForEveryone=true'}`, 'DELETE');
  },

  handleGroupChatDeletion: async (id) => {
    return await PerformRequest(`chat/group/${id}`, 'DELETE');
  },

  leaveGroup: async (id) => {
    return await PerformRequest(`/chat/group/leave/${id}`, 'DELETE');
  },

  makeAdmin: async (groupId, userId) => {
    return await PerformRequest(`chat/group/role/${groupId}`, 'PATCH', { userId, role: 'ADMIN' });
  },

  makeUser: async (groupId, userId) => {
    return await PerformRequest(`chat/group/role/${groupId}`, 'PATCH', { userId, role: 'USER' });
  },
};
