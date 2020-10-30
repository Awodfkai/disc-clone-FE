import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import messages from './reducers/messages';
import channels from './reducers/channels';
import authentication from './reducers/authentication';
import servers from './reducers/servers';

const reducers = combineReducers({
  authentication,
  servers,
})

const configureStore = () => {
  return createStore(
    reducers,
    applyMiddleware(thunk),
  )
}

export default configureStore;