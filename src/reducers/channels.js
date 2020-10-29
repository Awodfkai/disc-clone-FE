const initialState = {
  channels: [],
  joinedChannels: [],
}

const channelsReducer = (state=initialState, action) => {
  switch(action.type){
    case 'ADD_CHANNELS':
      return { ...state, channels: action.channels}
  }
}

export default channelsReducer;