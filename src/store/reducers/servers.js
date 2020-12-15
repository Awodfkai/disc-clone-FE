import { baseUrl } from '../../config'

const SET_CURRENT_SERVER = 'SET_CURRENT_SERVER';
const ADD_SERVERS = 'ADD_SERVERS';

const initialState = {
  servers: [],
  currentServer: null
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
  const response = await fetch(`${baseUrl}/serverMembers/server/create`, {
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

export const setCurrent = (server) => {
  return {
    type: SET_CURRENT_SERVER,
    server
  }
}



const serversReducer = (state=initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case ADD_SERVERS:
      return { ...state, servers: action.servers}
    case SET_CURRENT_SERVER:
      return {...state, currentServer: action.server };
    default:
      return state;
  }
}
export default serversReducer;