import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import LogIn from './components/LogIn'
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';

import Sidebar from './components/Sidebar'
import { Socket } from 'socket.io-client';

const PrivateRoute = (props) => {
  return (<Route render={() => {
    return (
      props.needLogin === true
        ? <Redirect to='/login' />
        : props.children
    );
  }} />);
}


const App = (props) => {
  const [needLogin, setNeedLogin] = useState(true);
  // const currentChannel = useSelector(state => state.channels.currentChannel);
  // const dispatch = useDispatch();
  // const socket = props.socket;
  // const onSend = message => {
  //   console.log('sending message')
  //   Socket.emit(currentChannel, {
  //     message
  //   })
  // }
  
  const renderMessageView = () => {
    const currentChannel = false;
    if(currentChannel) {
      return (
        <div className='message-view'>
          <MessageList />
          {/* <SendMessageForm onSend={onSend} /> */}
        </div>
      )
    }
  }
  if(needLogin){
    return(
      <main>
        <LogIn onChange={setNeedLogin}/>
      </main>
    )
  }
  return (
    <Grid container spacing={1}>
      <Grid container item xs={1}>
        <Sidebar />
      </Grid>
      <Grid container item xs={2}>
        {/* {renderMessageView()} */}
      </Grid>
      <Grid container item xs={6}>
        <div className='test' />
      </Grid>
      <Grid container item xs={2}>
        <div className='test' />
      </Grid>
    </Grid>
  )

}
export default App;

