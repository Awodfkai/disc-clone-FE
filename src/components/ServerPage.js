import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid'
// import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import ChannelNav from './ChannelNav'

const ServerPage = (props) => {
  const currentServer = useSelector(state => state.servers.currentServer)
  const currentChannel = useSelector(state => state.channels.currentChannel);

  const renderMessageView = () => {
    if (currentChannel) {
      return (
        <div className='message-view'>
          {/* <MessageList /> */}
          {/* <SendMessageForm onSend={onSend} /> */}
        </div>
      )
    }
  }
  return (
    <Grid container spacing={1}>
      <Grid container item xs={2}>
        <ChannelNav />
      </Grid>
      <Grid container item xs={7}>
        {/* {renderMessageView()} */}
      </Grid>
      <Grid container item xs={2}>
        <div className='test' />
      </Grid>
    </Grid>
  )

}

export default ServerPage

