import { ADD_EDIT_COURSE, REMOVE_EDITABLE_COURSE } from "./EditCourse-Constants";

const initialState = {
  editAbleCourse: [],
};

const EditCourse = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDIT_COURSE:
      return {
        state,
        editAbleCourse: action.payload,
      };
      case REMOVE_EDITABLE_COURSE:
        return{
          ...state,
          editAbleCourse: state.editAbleCourse.filter((item)=> item.id !== action.payload),
        }
    default:
      return state;
  }
};

export default EditCourse;
