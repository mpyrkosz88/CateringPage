import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cart_quantity: null,
  }

const loadCart = (state, action) => {
  let cart_quantity = 0;
  action.cart.forEach(el => {
    cart_quantity += el.quantity
  })
  return {
    ...state,
    cart_quantity: cart_quantity,
  }
}

const addToCart = (state, action) => {
  return {
    ...state,
    cart_quantity: state.cart_quantity + 1
  }
}

const deleteFromCart = (state, action) => {
  return {
    ...state,
    cart_quantity: state.cart_quantity - action.quantity,
  }
}

const clearCart = (state, action) => {
  return {
    ...state,
    cart_quantity: 0,
  }
}


const cart = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.LOAD_CART: 
      return loadCart(state, action)
      case actionTypes.ADD_TO_CART: 
      return addToCart(state, action)
      case actionTypes.DELETE_FROM_CART: 
      return deleteFromCart(state, action)
      case actionTypes.CLEAR_CART: 
      return clearCart(state, action)
      default:
        return state;
    }
  }

export default cart