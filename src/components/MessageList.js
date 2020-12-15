import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import { baseUrl } from '../config';
import { setMessages } from '../store/reducers/messages'
import { useState } from 'react';

const MessageList = () => {
  // const [currentChannelName, setCurrentChannelName] = useState('')
  const currentChannel = useSelector(state => state.channels.currentChannel)
  const messages = useSelector(state => state.messages[currentChannel]);
  const dispatch = useDispatch();
  const messageElement = useRef(null);

  // const setName = (name) => {
  //   setCurrentChannelName(name)
  // }

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

  // useEffect(() => {
  //   if(!currentChannel) return;
  //   (async () => {
  //     try {
  //       const nameJson = await fetch(`${baseUrl}/channel/${currentChannel}/name`);
  //       if (!nameJson.ok) {
  //         throw new Error("name Response not okay");
  //       }
  //       const name = await nameJson.json();
  //       setName(name);
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   })()
  // }, [currentChannel])
  
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
        <li key={message.id} ref={messageElement}>
          <div style={{display: "flex", flexDirection:'row', alignItems:'center', paddingBottom:'0px'}}>
            <h4 style={{paddingRight:'5px'}}>
             {message.username}
            </h4>
            <span>{date}</span>
          </div>
          <p style={{marginTop:'-5px'}}>{message.message}</p>
        </li>
      )
    })
  }
  return (
    <>
      <h3>
        Placeholder
      </h3>
      <ul>
        {renderMessages(messages)}
      </ul>
    </>
  )
}

export default MessageList;