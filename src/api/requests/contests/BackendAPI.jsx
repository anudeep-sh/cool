import PerformRequestBackend from '../../axios/BackendIntegration';

export const backendAPI = {
  getAllSchema: async (backendId) => {
    return PerformRequestBackend(`/backend/${backendId}/tables`, 'GET');
  },
  getUserApiDetails: async (backendId) => {
    return PerformRequestBackend(`/available-endpoints/${backendId}`, 'GET');
  },
  getTableData: async (backendId, table) => {
    return PerformRequestBackend(`/schema/${backendId}/${table}`, 'GET');
  },
  getUsersPrimaryKey: async (backendId) => {
    return PerformRequestBackend(`/backend/${backendId}`, 'GET');
  }
};
