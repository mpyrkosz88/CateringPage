import * as actionTypes from '../actions/actionTypes';

const initialState = {
  authRole: null,
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    authRole: action.authRole
  }
}

const logOut = (state, action) => {
  return {
    ...state,
    token: null,
    userId: false,
    authRole: null,
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