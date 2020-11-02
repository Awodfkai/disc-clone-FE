import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { Menu, MenuItem } from '@material-ui/core'
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import ChannelNav from './ChannelNav'
import { addMessage } from '../store/reducers/messages'
import { addJoinedChannel } from '../store/reducers/channels';
import { baseUrl } from '../config';

const ServerPage = ({socket}) => {
  const [newUser, setNewUser] = useState('')
  const currentServer = useSelector(state => state.servers.currentServer)
  const currentChannel = useSelector(state => state.channels.currentChannel);
  const joinedChannels = useSelector(state => state.channels.joinedChannels)
  const username = useSelector(state => state.authentication.username)
  const dispatch = useDispatch()
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

  const updateNewUser = (e) => {
    setNewUser(e.target.value);
  }

  const onSubmit = async e => {
    e.preventDefault();
    try{
      console.log(newUser)
      const res = await fetch(`${baseUrl}/serverMembers/server/${currentServer.id}/user/${newUser}`, {
        method: 'POST'
      })
    }catch(e){
      console.error(e);
    }
  }

  useEffect(() => {
    if(currentChannel){
      console.log(`Joining ${currentChannel}`)
      socket.emit('join', currentChannel);
    }
  }, [currentChannel, socket])

  useEffect(() => {
    if(!currentChannel) return;

    if(joinedChannels.includes(currentChannel)){
      return;
    }

    socket.on(currentChannel, ( newMessage ) => {
      debugger
      console.log('socket.on message value in ServerPage.js: ', newMessage)
      dispatch(addMessage( newMessage ))
    });
    dispatch(addJoinedChannel(currentChannel))
  },[currentChannel, dispatch, joinedChannels, socket])

  const onSend = message => {
    console.log(`Sending message ${message} to ${currentChannel}`)
    socket.emit(currentChannel, {
      message,
      username
    })
  }

  const renderMessageView = () => {
    if (currentChannel) {
      return (
        <>
          <MessageList />
          <SendMessageForm onSend={onSend} />
        </>
      )
    }
  }


  return (
    <Grid container spacing={5}>
      <Grid container item xs={3} sm={2} alignItems={'stretch'}>
        <ChannelNav />
      </Grid>
      <Grid container item xs={6} sm={8} direction={'column'} justify={'space-between'} alignItems={'stretch'}>
        {renderMessageView()}
      </Grid>
      <Grid container item xs={3} sm={2} >
        <Button {...bindTrigger(popupState)}>
          Invite User
        </Button>
        <Menu {...bindMenu(popupState)}>
          <MenuItem>
            <form onSubmit={onSubmit}>
              <TextField
                onChange={updateNewUser}
                variant="outlined"
                margin="normal"
                required
                id="name"
                label="Username"
                name="Name"
                autoFocus
              />
            </form>
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )

}

export default ServerPage

