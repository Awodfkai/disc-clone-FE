import React, {useEffect, useState, useRef} from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Menu, MenuItem, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'

import { baseUrl } from '../config';
import { createServer, addServers, setCurrent } from '../store/reducers/servers'

const ADD_JOINED_SERVER = 'ADD_JOINED_SERVER';
const SET_CURRENT_SERVER = 'SET_CURRENT_CHANNEL'; 
const ADD_SERVER = 'ADD_SERVER';

const Sidebar = (props) => {
  const [name, setName] = useState('')
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers.servers);
  const currentServer = useSelector((state) => state.servers.currentServer)
  const popupState = usePopupState({variant:'popover', popupId:'demoMenu'})
  const serverElement = useRef(null);


  useEffect(() => {
    (async () => {
      try{
        const token = localStorage.getItem('tokenkey');
        const user_id = localStorage.getItem('user_id')
        const res = await fetch(`${baseUrl}/serverMembers/${user_id}`, {
          headers: { 'Authorization': `Bearer ${token}`}
        })
        const resServers = await res.json();
        console.log('servers: ',resServers)
        dispatch(addServers(resServers));
        console.log('store servers: ', servers)
      }catch(e){
        console.error(e);
      }
    })()
  }, [dispatch])

  const updateName = e => {
    setName(e.target.value)
  }

  //creates server
  const onSubmit = e => {
    e.preventDefault();
    console.log('adding server...')
    const user_id = localStorage.getItem('user_id')
    props.createServer(name, user_id)
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  
  const getServers = () => {
    //fetch servers? where to put
  }
  
  //set currentServer to server clicked on
  const setCurrentServer = (server) => {
    console.log('setCurrentServer')
    console.log(server)
    dispatch(setCurrent(server))
  }
  //renders fetched servers
  const renderServers = (servers) => {
    if(servers){
      return servers.map( (server) => {
        return (
          <ListItem ref={serverElement} button key={server.id} onClick = {() => setCurrentServer(server)}>
            <ListItemText primary={server.name}/>
          </ListItem>
        )
      })
    }
    return (
    <ListItem>
      <ListItemText primary={'no servers found'}/>
    </ListItem>
    )
  }

  return (
    <div>
      <List component="nav">
        {renderServers(servers)}

        <ListItem button {...bindTrigger(popupState)}>
          <ListItemText>Add Server</ListItemText>
        </ListItem>
        <Menu {...bindMenu(popupState)}>
          <MenuItem>
            <form onSubmit={onSubmit}>
              <TextField
                onChange={updateName}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Server Name"
                name="Name"
                autoFocus
              />
            </form>
          </MenuItem>
        </Menu>
      </List>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.authentication.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrent: (server) => dispatch(setCurrent(server)),
    createServer: (name, user_id) => dispatch(createServer(name, user_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Sidebar
);