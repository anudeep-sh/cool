import performRequest from '../../axios';

export const organizationAPI = {
  addOrganization: async (body) => {
    return await performRequest('organization', 'POST', body);
  },
  getOrganizations: async () => {
    return await performRequest('organizations', 'GET');
  },
  getOrganizationById: async (id) => {
    return await performRequest(`organization`, 'GET');
  },
  searchOrganization: async (search) => {
    return await performRequest(`organization?domain=${search}`, 'GET');
  },
  searchOrganizationByName: async (search) => {
    return await performRequest(`organizations/${search}`, 'GET');
  },
  searchOrganizationByCode: async (code) => {
    return await performRequest(`organizations/org?code=${code}`, 'GET');
  },
  searchViewOrganizationByName: async (name) => {
    return await performRequest(`/public/organization/${name}`, 'GET');
  },
  getSuggestedOrganizations: async () => {
    return await performRequest(`organizations/suggested`, 'GET');
  },
  requestToJoinOrganization: async (id) => {
    return await performRequest(`request/join/${id}`, 'POST');
  },
  migrateOrganizationToPublic: async (id) => {
    return await performRequest(`migrateToPublic/${id}`, 'POST');
  },
  migrateToOrganization: async (id) => {
    return await performRequest(`migrateToOrganization/${id}`, 'POST');
  },
  verifyOrganization: async (domain) => {
    return await performRequest(`organization/verify/${domain}`, 'GET');
  },
  changeOrganizationStatus: async (id, body) => {
    return await performRequest(`organization/status/${id}`, 'PATCH', body);
  },
  editOrganizationDetails: async (id, body) => {
    return await performRequest(`organization/${id}`, 'PATCH', body);
  },
  migrateByEmails: async (id, body) => {
    return await performRequest(`migrateByEmails/${id}`, 'POST', body);
  },
  getInvite: async (inviteId) => {
    return await performRequest(`invite/${inviteId}`, 'GET');
  },

  getInvitesSentByOrganization: async () => {
    return await performRequest(`/invites/organization`, 'GET');
  },
  getInvitesRecievedByUser: async () => {
    return await performRequest(`/invites/user`, 'GET');
  },

  getRequestsRecievedByOrganization: async () => {
    return await performRequest(`/requests/organization`, 'GET');
  },
  getRequestsRecievedByUser: async () => {
    return await performRequest(`/requests/user`, 'GET');
  },
  inviteAction: async (inviteId, action) => {
    return await performRequest(`/invite/${inviteId}`, 'PATCH', { action });
  },
  inviteViaEmail: async (body) => {
    return await performRequest(`/invite`, 'POST', body);
  },
  requestAction: async (requestId, action) => {
    return await performRequest(`/request/join/${requestId}`, 'PATCH', { action });
  },
  getMembersList: async () => {
    return await performRequest(`/members`, 'GET');
  },
  updateRole: async (username, role) => {
    return await performRequest(`/role/${username}`, 'PATCH', { role });
  },
  removeMember: async (username) => {
    return await performRequest(`/member/${username}`, 'DELETE');
  },
  getConsumptionDetails: async () => {
    return await performRequest(`/consumption`, 'GET');
  },
  getNotifications: async () => {
    return await performRequest(`/notifications`, 'GET');
  },
  markNotificationsAsRead: async () => {
    return await performRequest(`/notifications`, 'PATCH');
  },
  updateOragnizationDetails: async (body, id) => {
    return await performRequest(`/organization/${id}`, 'PATCH', body);
  },
  removeOrganization: async (id) => {
    return await performRequest(`/organization/${id}`, 'DELETE');
  },
  getOrgRole: async (org) => {
    return await performRequest(`/organization/role/${org}`, 'GET');
  },
  getOrgTransaction: async (pageNo, search) => {
    let searchQuery = '';
    if (search) {
      searchQuery = `?search=${search}`;
    }
    return await performRequest(`/transactions/${pageNo}${searchQuery}`, 'GET');
  },
  leaveOrg: async () => {
    return await performRequest(`/organization/leave`, 'PATCH');
  },
};
