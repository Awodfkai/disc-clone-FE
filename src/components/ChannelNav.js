import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, ListItemIcon, Divider, Menu, MenuItem, Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'

import { baseUrl } from '../config';
import { createChannel, addChannels, setCurrent } from '../store/reducers/channels'


const ChannelNav = (props) => {
  const [name, setName] = useState('')
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannel = useSelector((state) => state.channels.currentChannel)
  const currentServer = useSelector((state) => state.servers.currentServer)
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  const channelElement = useRef(null);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  const joinChannel = (channel) => {
    props.setCurrent(channel)
  }

  const updateName = e => {
    setName(e.target.value)
  }

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('tokenkey');
        const user_id = localStorage.getItem('user_id')
        const res = await fetch(`${baseUrl}/channel/${currentServer.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const resChannels = await res.json();
        console.log('Channels: ', resChannels)
        dispatch(addChannels(resChannels));
      } catch (e) {
        console.error(e);
      }
    })()
  }, [dispatch, currentServer])

  const onSubmit = e => {
    e.preventDefault();
    const server_id = currentServer.id;
    console.log('adding server...')
    dispatch(createChannel(name, server_id));
  }

  const renderChannels = (channels) => {
    return channels.map((channel) => {
      return (
        <ListItem button ref={channelElement} key={channel.id} onClick={() => joinChannel(channel.id)}>
          <ListItemText primary={channel.name} />
        </ListItem>
      )
    })
  }

  return (
    <div>
      <List component="nav">
        <ListItem divider>
          <ListItemText primary={currentServer.name}/>
        </ListItem>
        
        {renderChannels(channels)}

        <ListItem button {...bindTrigger(popupState)}>
          <ListItemText>Add Channel</ListItemText>
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
                label="Channel Name"
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
    setCurrent: (channel) => dispatch(setCurrent(channel)),
    createChannel: (name, server_id) => dispatch(createChannel(name, server_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ChannelNav
);