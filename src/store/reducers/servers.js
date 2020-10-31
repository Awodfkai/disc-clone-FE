import { baseUrl } from '../../config'

const ADD_JOINED_SERVER = 'ADD_JOINED_SERVER';
const SET_CURRENT_SERVER = 'SET_CURRENT_CHANNEL';
const ADD_SERVERS = 'ADD_SERVERS';

const initialState = {
  servers: [],
  joinedServers: []
}

export const addServers = (servers) => {
  return {
    type: ADD_SERVERS,
    servers
  }
}

export const createServer = (name, user_id) => async dispatch => {
  const token = localStorage.getItem('tokenkey');
  console.log('local storage token: ', token);
  const response = await fetch(`${baseUrl}/server/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${token}` },
    body: JSON.stringify({ name, user_id }),
  })
  if (response.ok) {
    const server = await response.json();
    
    const res = await fetch(`${baseUrl}/serverMembers/${user_id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const resServers = await res.json();
    
    
    dispatch(addServers(resServers))
  }
}

export const setCurrent = (server) => async dispatch => {
  console.log('creating setcurrentserver action')
  return {
    type: SET_CURRENT_SERVER,
    server
  }
}



const serversReducer = (state=initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case ADD_SERVERS:
      console.log('adding servers...')
      return { ...state, servers: action.servers}
    case SET_CURRENT_SERVER:
      console.log('setting current server to ' + action.server)
      return {...state, currentServer: action.server };
    case ADD_JOINED_SERVER:
      return { ...state, joinedServers: action.server };
    default:
      return state;
  }
}
export default serversReducer;