import {
  ADD_USER_DATA,
  SELECT_ITEM_FROM_SIDEBAR,
  SET_ALERT_DATA,
} from "./User-Constants";

const initialState = {
  userData: {},
  text: "",
  type: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return {
        ...state,
        userData: { ...state.userData, userData: action.payload },
      };
    case SET_ALERT_DATA:
      return {
        ...state,
        text: action.payload?.text,
        type: action.payload?.type,
      };

    default:
      return state;
  }
};

export default UserReducer;
