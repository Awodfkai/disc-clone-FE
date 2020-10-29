import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'

import Sidebar from './components/Sidebar'

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
  // const socket = props.socket;
  
  const renderMessageView = () => {
    if(currentChannel) {
      return (
        <div className='message-view'>
          <MessageList />
          <SendMessageForm onSend={onSend} />
        </div>
      )
    }
  }

  return (
    <Grid container spacing={1}>
      <Grid container item xs={1}>
        <Sidebar />
      </Grid>
      <Grid container item xs={2}>
        <div className='test' />
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

