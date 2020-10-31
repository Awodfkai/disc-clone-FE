import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import ChannelNav from './ChannelNav'

const ServerPage = (props) => {
  const currentServer = useSelector((state) => state.server.currentServer)
  
  const renderMessageView = () => {
    const currentChannel = false;
    if (currentChannel) {
      return (
        <div className='message-view'>
          <MessageList />
          {/* <SendMessageForm onSend={onSend} /> */}
        </div>
      )
    }
  }
  return (
    <Grid container spacing={1}>
      <Grid container item xs={2}>
        <ChannelNav server={currentServer}/>
      </Grid>
      <Grid container item xs={7}>
        <div className='test' />
      </Grid>
      <Grid container item xs={2}>
        <div className='test' />
      </Grid>
    </Grid>
  )

}
const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServerPage)

