const initialState = {};

const messagesReducer = (state=initialState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case 'ADD_MESSAGE':
      const {message} = action;
  }
}

export default messagesReducer;