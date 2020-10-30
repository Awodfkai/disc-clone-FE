const initialState = {};

const messagesReducer = (state=initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case 'ADD_MESSAGE':
      return state;
    default:
      return state;
  }
}

export default messagesReducer;