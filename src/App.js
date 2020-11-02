import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid'

import LogIn from './components/LogIn'
import Sidebar from './components/Sidebar'
import ServerPage from './components/ServerPage'
import { loadToken } from './store/reducers/authentication';

// const PrivateRoute = (props) => {
//   return (<Route render={() => {
//     return (
//       props.needLogin === true
//         ? <Redirect to='/login' />
//         : props.children
//     );
//   }} />);
// }

const App = (props) => {
  const [needLogin, setNeedLogin] = useState(true);
  const currentServer = useSelector(state => state.servers.currentServer);
  
  const renderServerView = () => {
    if(currentServer) {
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
    <Grid container spacing={1} height='100%'>
      <Grid container item xs={3} sm={2} alignItems={'stretch'} height='100%'>
        <Sidebar height='100%' />
      </Grid>
      <Grid container item xs={9} sm={10}>
        {renderServerView()}
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
