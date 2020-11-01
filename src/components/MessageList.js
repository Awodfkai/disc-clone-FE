import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import { baseUrl } from '../config';
import { setMessages } from '../store/reducers/messages'

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

  useEffect(() => {
    if(!currentChannel){
      return;
    }
    (async () => {
      try {
        const token = localStorage.getItem('tokenkey');
        const res = await fetch(`${baseUrl}/channel/${currentChannel}/messages`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if(!res.ok){
          throw new Error("Response not okay");
        }
        const messages = await res.json();
        console.log('messages: ', messages)
        dispatch(setMessages(messages, currentChannel));
      } catch (e) {
        console.error(e);
      }
    })()
  }, [currentChannel, dispatch])
  
  if(!currentChannel){
    return null;
  }
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