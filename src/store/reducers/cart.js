import { addProduct } from '../actions';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: null,
    cart: null,
    cart_quantity: null,
  }

const loadProducts = (state, action) => {
  return {
    ...state,
    products: action.products,
  }
}

const loadCart = (state, action) => {
  let cart_quantity = 0;
  action.cart.forEach(el => {
    cart_quantity += el.quantity
  })
  return {
    ...state,
    cart: action.cart,
    cart_quantity: cart_quantity,
  }
}

const addToCart = (state, action) => {
  const productId = action.id
  const cartItemIndex = state.cart.findIndex(cp => {
    return cp.itemId._id.toString() === productId.toString();
  });
  const addedProduct = state.products.filter(item => {
    return item._id.toString() === productId.toString();
  })

  let newQuantity = 1;
  const updatedCartItems = [...state.cart];

  if (cartItemIndex >= 0) {
    newQuantity = state.cart[cartItemIndex].quantity + 1;
    updatedCartItems[cartItemIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      _id: productId,
      itemId: {
        _id:productId,
        name: addedProduct[0].name,
        price:addedProduct[0].price,
      },
      quantity: newQuantity
    });
  }

  return {
    ...state,
    cart: updatedCartItems,
    cart_quantity: state.cart_quantity + 1
  }
}

const deleteFromCart = (state, action) => {
  const productId = action.id
  const quantity = state.cart.find(({itemId:{_id}}) => _id === productId).quantity
  const updatedCartItems = state.cart.filter(item => {
    return item.itemId._id.toString() !== productId.toString();
  });

  return {
    ...state,
    cart: updatedCartItems,
    cart_quantity: state.cart_quantity - quantity,
  }
}

const clearCart = (state, action) => {
  return {
    ...state,
    cart: [],
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
      case actionTypes.LOAD_PRODUCTS: 
      return loadProducts(state, action)
      default:
        return state;
    }
  }

export default cart