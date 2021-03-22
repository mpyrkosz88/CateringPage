import * as actionTypes from './actionTypes';
import axios from '../../utils/axios-path';

export const loadUserHistory = () => {
    return dispatch => {
        axios.get('/get-orders-history')
            .then(response => {
                if (response.data) {
                    dispatch({
                        type: actionTypes.LOAD_USER_HISTORY,
                        history: response.data,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export const clearUserHistory = () => {
    return dispatch => {
        dispatch({type:actionTypes.CLEAR_USER_HISTORY})
    }
}


