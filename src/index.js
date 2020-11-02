import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/store'
import { noApiUrl } from './config'


const socket = io.connect(noApiUrl);

socket.on('error', (err) => {
  console.error(err);
})

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App socket={socket} height='100%'/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
