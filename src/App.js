import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import { Socket } from 'socket.io-client';

import LogIn from './components/LogIn'
import SendMessageForm from './components/SendMessageForm';
import Sidebar from './components/Sidebar'
import ServerPage from './components/ServerPage'
import { loadToken } from './store/reducers/authentication';

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
  const currentServer = useSelector(state => state.servers.currentServer);
  const joinedServers = useSelector(state => state.servers.joinedServers)
  const dispatch = useDispatch();
  // const socket = props.socket;
  // const onSend = message => {
  //   console.log('sending message')
  //   Socket.emit(currentChannel, {
  //     message
  //   })
  // }
  

  const renderServerView = () => {
    if(currentServer) {
      console.log(currentServer)
      return (  
        <ServerPage socket={props.socket}/>
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
      <Grid container item xs={2}>
        <Sidebar />
      </Grid>
      <Grid container item xs={8}>
        {renderServerView()}
      </Grid>
      <Grid container item xs={2}>
        <div className='test' />
      </Grid>
    </Grid>
  )

}
const mapStateToProps = (state) => {
  return {
    needLogin: (!state.authentication.token || false)

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadToken: () => dispatch(loadToken()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
