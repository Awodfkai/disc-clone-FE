import React, {useEffect, useState, useRef} from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Menu, MenuItem, Paper, ListItemIcon, Divider, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
// import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'

import { baseUrl } from '../config';
import { createServer, addServers, setCurrent } from '../store/reducers/servers'

const useStyles = makeStyles({
  root: {
    background: 'lightgrey',
  },
  
});

const Sidebar = (props) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers.servers);
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
  
  //set currentServer to server clicked on
  const setCurrentServer = (server) => {
    console.log('setCurrentServer');
    console.log(server);
    dispatch(setCurrent(server));
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
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
    <div className={classes.root}>
      <List component="nav" height="100%" bgcolor="grey.300">
        <ListItem divider>
          <ListItemText primary={'Servers'} />
        </ListItem>

        {renderServers(servers)}

        <ListItem button {...bindTrigger(popupState)}>
          <ListItemText>Add Server</ListItemText>
        </ListItem>
        <Menu
          {...bindMenu(popupState)}

        >
          <MenuItem>
            <form onSubmit={onSubmit}>
              <TextField
                onChange={updateName}
                variant="outlined"
                margin="normal"
                required
                id="name"
                label="Server Name"
                name="Name"
                autoFocus
                anchorOrigin={{horizontal:'left', vertical:'bottom'}}
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