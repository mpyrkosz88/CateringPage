import * as actionTypes from './actionTypes';
import {loadCart} from './cart'

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('authRole');
    return {
      type: actionTypes.AUTH_LOGOUT
    }
  }


  export const authSuccess = (token, userId, authRole) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      token: token,
      userId: userId,
      authRole: authRole,
    };
  };
  
export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime)
  }
}

export const authCheckState = () => {
  return dispatch => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const authRole = localStorage.getItem('authRole');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  if (!token) {
    dispatch(logout());
  }
    else {
      if(expirationDate < new Date()) {
        dispatch(logout());
      }
      dispatch(authSuccess(token, userId, authRole))
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));
      if (authRole === "User") {
        dispatch(loadCart());
      }
    }
  };
};