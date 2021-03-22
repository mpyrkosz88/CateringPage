import * as actionTypes from '../actions/actionTypes';

const initialState = {
    history: null,
  }

const loadUserHistory = (state, action) => {
  return {
    ...state,
    history: action.history,
  }
}

const clearUserHistory = (state, action) => {
  return {
    ...state,
    history: null,
  }
}

const history = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.LOAD_USER_HISTORY: 
      return loadUserHistory(state, action)
      case actionTypes.CLEAR_USER_HISTORY: 
      return clearUserHistory(state, action)
      default:
        return state;
    }
  }

export default history