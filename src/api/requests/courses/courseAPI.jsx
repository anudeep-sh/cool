import performRequest from '../../axios';

export const courseAPI = {
  createCourse: async (body) => {
    return await performRequest('course', 'POST', body);
  },

  updateCourse: async (body, id) => {
    return await performRequest(`course/${id}`, 'PATCH', body);
  },

  getSpecificCourse: async (id) => {
    return await performRequest(`course/${id}`, 'GET');
  },

  updateImageAndTrailer: async (body, id) => {
    return await performRequest(`course/links/${id}`, 'PATCH', body);
  },

  updateCourseStatus: async (body, id) => {
    return await performRequest(`updateStatus/${id}`, 'PATCH', body);
  },

  getCoursesByPage: async (pageNumber) => {
    return await performRequest(`courses/${pageNumber}`, 'GET');
  },

  getUserCourses: async (searchValue, status, pageNumber) => {
    let query = '';
    if (searchValue) {
      query += `search=${searchValue}&`;
    }
    if (status) {
      query += `status=${status}`;
    }

    return await performRequest(`v2/user/courses/${pageNumber}?${query}`, 'GET');
  },

  searchCourse: async (searchKeyword) => {
    return await performRequest(`courses/1?search=${searchKeyword}`, 'GET');
  },

  deleteCourse: async (id) => {
    return await performRequest(`course/${id}`, 'DELETE');
  },

  getAllUsers: async () => {
    return await performRequest(`search/user?search=`, 'GET');
  },

  getUsers: async (searchQuery) => {
    return await performRequest(`search/user?search=${searchQuery}`, 'GET');
  },

  assignAccessToUser: async (body) => {
    return await performRequest(`user/access`, 'POST', body);
  },

  getAccessAssignees: async (id) => {
    return await performRequest(`user/access/${id}`, 'GET');
  },

  getCourseUserHasAccessTo: async (id) => {
    return await performRequest(`access/COURSE/0`, 'GET');
  },

  deleteAccessAssignee: async (username, courseId) => {
    return await performRequest(`user/access/${username}/${courseId}`, 'DELETE');
  },
};
