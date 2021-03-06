import { baseUrl } from '../../config'

const SET_TOKEN = 'SET_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN'
const TOKEN_KEY = 'tokenkey'
const SET_USERNAME = 'SET_USERNAME';

// action creator
export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token,
  }
}

// action creator
export const loseToken = () => {
  return { type: REMOVE_TOKEN }
}

export const setUser = (username) => {
  return {
    type: SET_USERNAME,
    username
  }
}

export const logout = () => {
  return async (dispatch, getState) => {
    const { authentication: { token } } = getState()
    const res = await fetch(`api/user/log-out`, { 
      headers: { Authorization: `Bearer ${token}` }
    })
 
    if (res.ok) {
      localStorage.removeItem(TOKEN_KEY)
      dispatch(loseToken(token))
    }
  }
}

// thunk action creator
export const login = (username, password) => async dispatch => {
  const response = await fetch(`${baseUrl}/user/log-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (response.ok) {
    const { token, user } = await response.json();
    localStorage.setItem(TOKEN_KEY, token.token)
    localStorage.setItem('user_id', user.id)
    dispatch(setToken(token))
    dispatch(setUser(username))
    return false;
  }
  return true;
}

// thunk
export const loadToken = () => {
  return (dispatch) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      dispatch(setToken(token));
    }
  }
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      console.log('setting state token')
      return { ...state, token: action.token, }
    }
    case REMOVE_TOKEN: {
      const newState = { ...state }
      delete newState.token
      return newState
    }
    case SET_USERNAME:
      return { ...state, username: action.username}
    default:
      return state
  }
}