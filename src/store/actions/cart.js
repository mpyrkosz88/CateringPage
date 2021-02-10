import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-path';


export const initCartData = (cartData) => {
    return {
        type: actionTypes.LOAD_CART,
        cart: cartData,
    }
}

export const deleteFromCart = (id) => {
    return {
        type: actionTypes.DELETE_FROM_CART,
        productId: id
    }
}

export const loadCart = () => {
    return dispatch => {
        axios.get('/cart', )
        .then(response => {
            if (response.data){
            dispatch(initCartData(response.data))
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export const deleteProduct = (id) => {
    return dispatch => {
        axios.delete('/cart-delete/'+ id)
        .then((response) => {
            dispatch(deleteFromCart(id))
        })
        .catch(err => {console.log(err)});
    }
}