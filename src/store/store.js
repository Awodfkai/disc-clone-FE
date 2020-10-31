import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import messages from './reducers/messages';
import channels from './reducers/channels';
import authentication from './reducers/authentication';
import servers from './reducers/servers';

const composeEnhancers = composeWithDevTools({ trace: true })
const reducers = combineReducers({
  authentication,
  servers,
})

const configureStore = () => {
  return createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
}

export default configureStore;