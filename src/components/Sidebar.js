import React, {useEffect} from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Menu, MenuItem } from '@material-ui/core'
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'

import { baseUrl } from '../config';
import { createServer } from '../store/reducers/servers'
import { createStore } from "redux";

const ADD_JOINED_SERVER = 'ADD_JOINED_SERVER';
const SET_CURRENT_SERVER = 'SET_CURRENT_CHANNEL';
const ADD_SERVER = 'ADD_SERVER';

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers.servers);
  const currentServer = useSelector((state) => state.servers.currentServer)

  // useEffect(() => {
  //   (async () => {
  //     try{
  //       cosnt res = await fetch(`${baseUrl}/serverMembers/`)
  //     }
  //   })
  // })

  //creates server
  const onSubmit = e => {
    e.preventDefault();
    console.log('adding server...')
    const user_id = localStorage.getItem('user_id')
    props.createServer(e.target.value, user_id)
  }

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  
  const getServers = () => {
    //fetch servers? where to put
  }
  
  //set currentServer to server clicked on
  const joinServer = (server) => {
    dispatch()
  }
  //renders fetched servers
  const renderServers = (servers) => {
    return servers.map( (server) => {
      return (
        <ListItem button key={server.id} onClick = {() => joinServer(server.id)}>
          <ListItemText primary={server.name}/>
        </ListItem>
      )
    })
  }

  return (
    <div>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <div>Hello</div>
          </ListItemIcon>
          <ListItemText primary="Example Server" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <div>world</div>
          </ListItemIcon>
          <ListItemText primary="Example Server 2" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Example Server 3" />
        </ListItem>

        <ListItemLink href="#example-server-4">
          <ListItemText primary="Example Server 4" />
        </ListItemLink>

        <ListItem button>
          <ListItemText>Add Server</ListItemText>
        </ListItem>
        <Menu {...bindMenu(popupState)}>
          <MenuItem input onSubmit={onSubmit} />
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
    createServer: (name, user_id) => dispatch(createServer(name, user_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Sidebar
);