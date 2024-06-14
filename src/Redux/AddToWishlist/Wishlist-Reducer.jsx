import { ADD_ITEM_IN_WISHLIST, REMOVE_ITEM_FROM_WISHLIST } from "./Wishlist-Constants";

const initialState = {
  wishlistItems: [],
};
const WishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_IN_WISHLIST:
      return {
        ...state,
        wishlistItems:[...state.wishlistItems,action.payload]
      };
      case REMOVE_ITEM_FROM_WISHLIST:
        return{
          ...state,
          wishlistItems: state.wishlistItems.filter((item)=> item.id !== action.payload)
        }

    default:
      return state;
  }
};

export default WishlistReducer;
