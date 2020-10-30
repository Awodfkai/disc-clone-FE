import { baseUrl } from '../../config'

const ADD_JOINED_SERVER = 'ADD_JOINED_SERVER';
const SET_CURRENT_SERVER = 'SET_CURRENT_CHANNEL';
const ADD_SERVER = 'ADD_SERVER';

const initialState = {
  servers: [],
  joinedServers: []
}

export const addServer = (server) => {
  return {
    type: ADD_SERVER,
    server
  }
}

export const createServer = (name, user_id) => async dispatch => {
  const response = await fetch(`${baseUrl}/server/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, user_id }),
  })
  if (response.ok) {
    const { server } = await response.json();
    dispatch(addServer(server))
  }
}

const serversReducer = (state=initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case ADD_SERVER:
      return { ...state, servers: action.servers}
    case SET_CURRENT_SERVER:
      return {...state, currentServer: action.server };
    case ADD_JOINED_SERVER:
      return { ...state, joinedServers: action.server };
    default:
      return state;
  }
}
export default serversReducer;