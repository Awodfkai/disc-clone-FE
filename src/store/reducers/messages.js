const initialState = {};
const ADD_MESSAGE = 'ADD_MESSAGE'
const SET_MESSAGES = 'SET_MESSAGES'

export const setMessages = (messages, channel) => {
  return ({
    type: SET_MESSAGES,
    messages,
    channel
  })
}

const messagesReducer = (state=initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case ADD_MESSAGE:
      const { message } = action;
      const oldMessages = state[message.ChannelId]
        ? state[message.ChannelId]
        : [];
      return {
        ...state, [message.ChannelId]: [...oldMessages, message]
      }
    case SET_MESSAGES:
      const {messages, channel} = action;
      return {
        ...state,
        [channel.id]: [...messages]
      }
    default:
      return state;
  }
}

export default messagesReducer;