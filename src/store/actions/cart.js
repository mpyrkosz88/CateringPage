import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-path';

export const addToCart = (id) => {
    return dispatch => {
        axios.post('/addToCart/' + id)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: actionTypes.ADD_TO_CART,
                })
            })
            .catch((err) => console.log(err))
    }
}

export const loadCart = () => {
    return dispatch => {
        axios.get('/cart',)
            .then(response => {
                if (response.data) {
                    dispatch({
                        type: actionTypes.LOAD_CART,
                        cart: response.data,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const deleteFromCart = (quantity) => {
    return dispatch => {
        dispatch({
            type: actionTypes.DELETE_FROM_CART,
            quantity: quantity
        })
    }
}

export const clearCart = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLEAR_CART,
        })

    }
}

