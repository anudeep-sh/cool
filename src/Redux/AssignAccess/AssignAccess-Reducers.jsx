import {ADD_ACCESS_USER, REMOVE_ACCESS_USER} from './AssignAccess-Constants.jsx';

const initialState = {
    accessUsersMapping: {}
};

function AssignAccessReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ACCESS_USER:
            return {
                ...state,
                accessUsersMapping: {
                    ...state.accessUsersMapping,
                    [action.payload.courseId]: 
                    [...(state.accessUsersMapping[action.payload.courseId] || []), action.payload.user]
                }
            };
        case REMOVE_ACCESS_USER:
            return {
                ...state,
                accessUsersMapping: {
                    ...state.accessUsersMapping,
                    [action.payload.courseId]: 
                    state.accessUsersMapping[action.payload.courseId].filter(user => user.username !== action.payload.username)
                }
            };
        default:
            return state;
    }
}

export default AssignAccessReducer;