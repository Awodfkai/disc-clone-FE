import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'


const Sidebar = (props) => {
  const dispatch = useDispatch();

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  
  const getServers = () => {
    //fetch servers? where to put
  }
  
  const joinServer = (server) => {
    //dispatch
  }
  
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

        <listItem button>
          <ListItemText>Add Server</ListItemText>
        </listItem>
      </List>
    </div>
  );
}

export default Sidebar