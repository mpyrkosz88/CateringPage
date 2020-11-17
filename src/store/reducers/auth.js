import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLogin: false,
}

const authSuccess = (state, action) => {
  return {
    ...state,
    isLogin: true,
  }
}

const logOut = (state, action) => {
  return {
    ...state,
    isLogin: false,
  }
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_LOGOUT:
      return logOut(state, action)
    default:
      return state;
  }
}

export default auth