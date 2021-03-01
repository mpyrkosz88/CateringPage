import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-path';

export const addToCart = (id) => {
    return dispatch => {
        axios.post('/addToCart/' + id)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: actionTypes.ADD_TO_CART,
                    id: id,
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

export const deleteFromCart = (id) => {
    return dispatch => {
        axios.delete('/cart-delete/'+ id)
        .then((response) => {
            console.log(response.data);
            dispatch({
                type: actionTypes.DELETE_FROM_CART,
                id: id,
            })
        })
        .catch(err => {console.log(err)});

    }
}


export const clearCart = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLEAR_CART,
        })

    }
}

export const loadProducts = () => {
    return dispatch => {
        axios.get('/menu',)
            .then(response => {
                if (response.data) {
                    dispatch({
                        type: actionTypes.LOAD_PRODUCTS,
                        products: response.data,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const addProduct = (data) => {
    console.log(data);
    // return dispatch => {
    //     axios.get('/menu',)
    //         .then(response => {
    //             if (response.data) {
    //                 dispatch({
    //                     type: actionTypes.LOAD_PRODUCTS,
    //                     products: response.data,
    //                 })
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }
}