import * as actionTypes from './actionTypes';

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
      type: actionTypes.AUTH_LOGOUT
    }
  }

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
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
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  if (!token) {
    dispatch(logout());
  }
    else {
      if(expirationDate < new Date()) {
        dispatch(logout());
      }
      dispatch(authSuccess(token, userId))
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));
    }
  };
};