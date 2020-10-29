import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core'


const ChannelNav = (props) => {
  const dispatch = useDispatch();

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const getChannels = () => {
    //fetch channels? where to put
  }

  const joinChannel = (channel) => {
    //dispatch
  }

  const renderChannels = (channels) => {
    return channels.map((channel) => {
      return (
        <ListItem button key={channel.id} onClick={() => joinChannel(channel.id)}>
          <ListItemText primary={channel.name} />
        </ListItem>
      )
    })
  }

  return (
    <div>
      <List component="nav">
        <h4>{props.server}</h4>
        <ListItem button>
          <ListItemText primary="Example Channel" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Example Channel 2" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Example Channel 3" />
        </ListItem>

        <ListItemLink href="#example-channel-4">
          <ListItemText primary="Example Channel 4" />
        </ListItemLink>

        <listItem button>
          <ListItemText>Add Channel</ListItemText>
        </listItem>
      </List>
    </div>
  );
}

export default ChannelNav