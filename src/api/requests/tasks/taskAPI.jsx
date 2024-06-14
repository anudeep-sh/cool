import performRequest from '../../axios';

export const TaskAPI = {
  createTask: async (body) => {
    return await performRequest('task', 'POST', body);
  },
  getCreatedTasks: async (pageNum) => {
    return await performRequest(`user/task/${pageNum}`, 'GET');
  },
  getAssignedTasks: async (pageNum) => {
    return await performRequest(`assigned/task`, 'GET');
  },
  editTask: async (body, id) => {
    return await performRequest(`task/${id}`, 'PATCH', body);
  },
  deleteTask: async (id) => {
    return await performRequest(`task/${id}`, 'DELETE');
  },

  getTaskData: async (id, getAllUsersProgress = false, queryParams = {}) => {
    const {
      sort = 'desc',
      sortBy = 'progress',
      filterByProgressAbove,
      filterByProgressBelow,
      search,
      submission
    } = queryParams;

    let queryString = `task/${id}?progress=${getAllUsersProgress}`;

    queryString += `&sort=${sort}&sortBy=${sortBy}`;

    if (filterByProgressAbove !== undefined) {
      queryString += `&above=${filterByProgressAbove}`;
    }

    if (filterByProgressBelow !== undefined) {
      queryString += `&below=${filterByProgressBelow}`;
    }
    if (search) {
      queryString += `&search=${search}`;
    }
    if (submission) {
      queryString += `&submission=${submission}`;
    }
    return await performRequest(queryString, 'GET');
  },
  getSubTaskData: async (id) => {
    return await performRequest(`subtask/${id}`, 'GET');
  },
  createSubTask: async (body, taskId) => {
    return await performRequest(`subtask/${taskId}`, 'POST', body);
  },
  editSubTask: async (body, id) => {
    return await performRequest(`subtask/${id}`, 'PATCH', body);
  },
  deleteSubTask: async (id) => {
    return await performRequest(`subtask/${id}`, 'DELETE');
  },
  getAllUsers: async (input) => {
    return await performRequest(`task/search/user?search=${input}`, 'GET');
  },
  getAllContests: async () => {
    return await performRequest(`task/search/contest?search=`, 'GET');
  },
  getCourseSections: async (id) => {
    return await performRequest(`task/course/section/${id}`, 'GET');
  },
  getAllCourses: async () => {
    return await performRequest(`task/search/course?search=`, 'GET');
  },
  getTaskAssignees: async (id) => {
    return await performRequest(`assignee/task/${id}`, 'GET');
  },
  getTaskProgress: async (taskId, userId) => {
    return await performRequest(`task/progress/${taskId}/${userId}`, 'GET');
  },
  assignTask:async (body) => {
    return await performRequest(`task/assign`,'POST',body)
  },
  assignTaskToUser: async (body, id) => {
    return await performRequest(`task/assign/${id}`, 'POST', body);
  },
  submitSubtask: async (id, body) => {
    return await performRequest(`subtask/${id}/submission`, 'POST', body);
  },
  createAssigneesList: async (body) => {
    return await performRequest(`assignees/list`, 'POST', body);
  },
  getAssigneesList:async()=>{
    return await performRequest(`assignees/list`,'GET')
  }
};
