import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const getServers = () => {

}

const renderServers = () => {

}

const Sidebar = (props) => {
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
      </List>
    </div>
  );
}

export default Sidebar