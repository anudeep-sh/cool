import getRoleForOrganization from '../../utils/GetUserRoleInOrganization';
import {
  CREATE_TASK,
  CREATE_SUBTASK,
  VIEW_TASK,
  SET_SELECTED_SUBTASK,
  SET_SELECTED_SECTIONS,
  ADD_ASSIGNEE,
  DELETE_ASSIGNEE,
  SET_TASKS,
  SET_SUBTASKS,
  DELETE_TASK,
  DELETE_SUBTASK,
  EDIT_TASK,
  EDIT_SUBTASK,
  SET_CURRENT_TASK,
  SET_TASK_PROGRESS,
  SET_ASSIGNEE_ID,
  FILE_POST_DATA,
  CHANGE_POST_DATA,
  FETCH_TASK_PROGRESS,
  DELETE_ALL_ASSIGNEES,
} from './Task-Constants';

const role = await getRoleForOrganization();

const initialState = {
  tasks: [],
  currentTask: [],
  subtasks: [],
  selectedSubtask: null,
  selectedSections: [],
  taskAssignees: [],
  role,
  taskProgress: null,
  assigneeId: null,
  subtaskPostData: [],
  fetchTaskProgress: false,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case SET_SUBTASKS:
      return {
        ...state,
        subtasks: action.payload,
      };

    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case CREATE_SUBTASK:
      return {
        ...state,
        subtasks: [...state.subtasks, action.payload],
      };

    case VIEW_TASK:
      return {
        ...state,
        currentTask: { ...action.payload },
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case DELETE_SUBTASK:
      return {
        ...state,
        subtasks: state.subtasks.filter((subtask) => subtask.id !== action.payload.id),
      };

    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...action.payload } : task
        ),
      };

    case EDIT_SUBTASK:
      return {
        ...state,
        subtasks: state.subtasks.map((subtask) =>
          subtask.id === action.payload.id ? { ...action.payload } : subtask
        ),
      };

    case SET_SELECTED_SUBTASK:
      state.selectedSubtask = action.payload;
      return state;
    case SET_SELECTED_SECTIONS:
      state.selectedSections = action.payload;
      break;

    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };

    case SET_TASK_PROGRESS:
      return {
        ...state,
        taskProgress: action.payload,
      };

    case SET_ASSIGNEE_ID:
      return {
        ...state,
        assigneeId: action.payload,
      };

    case FILE_POST_DATA:
      return {
        ...state,
        subtaskPostData: [...state.subtaskPostData, action.payload],
      };

    case CHANGE_POST_DATA:
      return {
        ...state,
        subtaskPostData: state.subtaskPostData.map((item) =>
          item.subtaskId === action.payload.subtaskId ? action.payload : item
        ),
      };

    case ADD_ASSIGNEE:
      if (action.payload?.length > 0) {
        action.payload.map((user) => {
          if (state.taskAssignees.length > 0) {
            let isDuplicate = false;
            state.taskAssignees.map((oldUser) => {
              if (oldUser.identifier === user.identifier) {
                isDuplicate = true;
              }
            });
            if (!isDuplicate) state.taskAssignees.push(user);
          } else {
            state.taskAssignees.push(user);
          }
        });
        return {
          ...state,
          taskAssignees: action.payload,
        };
      } else {
        let isDuplicate = false;
        state.taskAssignees.map((user) => {
          if (user.identifier === action.payload.identifier) {
            isDuplicate = true;
          }
        });
        if (!isDuplicate && !Array.isArray(action.payload))
          state.taskAssignees.push(action.payload);
        return {
          ...state,
          taskAssignees: state.taskAssignees,
        };
      }
    case DELETE_ASSIGNEE:
      return {
        ...state,
        taskAssignees: state.taskAssignees.filter(
          (assignee) => assignee.identifier !== action.payload
        ),
      };
    case DELETE_ALL_ASSIGNEES:
      return {
        ...state,
        taskAssignees: [],
      };
    case FETCH_TASK_PROGRESS:
      return {
        ...state,
        fetchTaskProgress: action.payload,
      };

    default:
      return state;
  }
};
export default TaskReducer;
