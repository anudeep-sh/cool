import {
  ADD_ITEM_IN_FILTER,
  REMOVE_ITEM_FROM_FILTER,
} from "./FilterChipData-Constants";

const initialState = {
  filterItems: [],
};
const ReducerFilterChip = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_IN_FILTER:
      return {
        ...state,
        filterItems: [...state.filterItems, action.payload],
      };
    case REMOVE_ITEM_FROM_FILTER:
      return {
        ...state,
        filterItems: state.filterItems.filter((item)=> item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default ReducerFilterChip;
