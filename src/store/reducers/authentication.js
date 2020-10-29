// TODO Contain Redux-related auth handling:
// actions, action types, thunks, reducers
import { baseUrl } from '../../config'

const SET_TOKEN = 'SET_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN'
const TOKEN_KEY = 'tokenkey'

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

export const logout = () => {
  return async (dispatch, getState) => {
    const { authentication: { token } } = getState()
    const res = await fetch(`api/user/log-out`, { 
      headers: { Authorization: `Bearer ${token}` }
    })
 
    if (res.ok) {
      localStorage.removeItem('tokenkey')
      dispatch(loseToken(token))
    }
  }
}

// thunk action creator
export const login = (username, password) => {
  return async dispatch => {
    console.log("login fetch url", `${baseUrl}/user/log-in`)
    const response = await fetch(`${baseUrl}/user/log-in`, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem(TOKEN_KEY, token)
      dispatch(setToken(token))
    }
  }
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
      return { ...state, token: action.token, }
    }
    case REMOVE_TOKEN: {
      const newState = { ...state }
      delete newState.token
      return newState
    }
    default:
      return state
  }
}