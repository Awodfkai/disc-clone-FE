const ADD_MESSAGE = 'ADD_MESSAGE'
const SET_MESSAGES = 'SET_MESSAGES'

const initialState = {

};


export const setMessages = (messages, channel) => {
  return ({
    type: SET_MESSAGES,
    messages,
    channel
  })
}

export const addMessage = (message) => {
  return ({
    type: ADD_MESSAGE,
    message
  })
}


const messagesReducer = (state=initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case ADD_MESSAGE:
      const message = action.message;
      const oldMessages = state[message.channel_id]
        ? state[message.channel_id]
        : [];
      return {
        ...state, [message.channel_id]: [...oldMessages, message]
      }
    case SET_MESSAGES:
      const {messages, channel} = action;
      return {
        ...state,
        [channel]: [...messages]
      }
    default:
      return state;
  }
}

export default messagesReducer;