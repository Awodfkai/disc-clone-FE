import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/store'
import { noApiUrl } from './config'


const socket = io.connect('http://localhost:3000');

socket.on('error', (err) => {
  console.error(err);
})

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App socket={socket}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
