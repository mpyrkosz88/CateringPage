import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cartData: null,
  }

const cart = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.LOAD_CART: 
      return {
        ...state,
        cartData: action.cart
      }
      case actionTypes.DELETE_FROM_CART: 
      return {
        ...state,
        cartData: state.cartData.filter(el => el._id !== action.productId)
      }
      default:
        return state;
    }
  }

export default cart