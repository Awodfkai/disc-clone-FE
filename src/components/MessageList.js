import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

const MessageList = () => {
  const currentChannel = useSelector(state => state.channels.currentChannel)
  const messages = useSelector(state => state.messages[currentChannel]);
  const dispatch = useDispatch();
  const messageElement = useRef(null);

  useEffect(() => {
    if(messageElement.current){
      messageElement.current.scrollIntoView();
    }
  })

  if(!currentChannel){
    return;
  }
  // (async () => {
  //   try {
  //     //fetch messages
  //   }catch(e){
  //     console.error(e);
  //   }
  // },[currentChannel, dispatch]);

  // if(!currentChannel){
  //   return null;
  // }

  const renderMessages = messages => {
    if(!messages){
      return null;
    }
    return messages.map(message => {
      const date = moment(message.createdAt).format('hh:mm:ss');
      return(
        <li ref={messageElement} key={message.id}>
          <h4>
            Test name
            <span>{date}</span>
          </h4>
          <p>{message.message}</p>
        </li>
      )
    })
  }
  return (
    <ul>
      {renderMessages(messages)}
    </ul>
  )
}

export default MessageList;