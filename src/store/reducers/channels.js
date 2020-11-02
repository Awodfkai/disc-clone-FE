import { baseUrl } from '../../config'

const initialState = {
  channels: [],
  joinedChannels: [],
  currentChannel: null,
}

const ADD_JOINED_CHANNEL = 'ADD_JOINED_CHANNEL';
const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
const ADD_CHANNELS = 'ADD_CHANNELS';

export const addChannels = (channels) => {
  return {
    type: ADD_CHANNELS,
    channels
  }
}

export const addJoinedChannel = (channel) => {
  return {
    type: ADD_JOINED_CHANNEL,
    channel
  }
}

export const createChannel = (name, server_id) => async dispatch => {
  const token = localStorage.getItem('tokenkey');
  const response = await fetch(`${baseUrl}/channel/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ name, server_id }),
  })
  if (response.ok) {

    const res = await fetch(`${baseUrl}/channel/${server_id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const resChannels = await res.json();
    dispatch(addChannels(resChannels))
  }
}

export const setCurrentChannel = (channel) => {
  console.log('creating setcurrentchannel action')
  return {
    type: SET_CURRENT_CHANNEL,
    channel
  }
}

const channelsReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_CHANNELS:
      console.log('adding channels...')
      return { ...state, channels: action.channels }
    case SET_CURRENT_CHANNEL:
      console.log('setting current channel...')
      return { ...state, currentChannel: action.channel };
    case ADD_JOINED_CHANNEL:
      return { ...state, joinedChannels: [...state.joinedChannels, action.channel] };
    default:
      return state;
  }
}

export default channelsReducer