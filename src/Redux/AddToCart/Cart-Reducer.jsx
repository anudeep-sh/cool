import { ADD_ITEM, EMPTY_CART, REMOVE_ITEM } from './Cart-Constants';

const initialState = {
  cartItems: [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
export default CartReducer;
