import React, { useState } from 'react';

const SendMessageForm = ({onSend}) => {
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    onSend(message);
    setMessage('');
  }

  const onChange = e => {
    setMessage(e.target.value);
  }

  return(
    <form onSubmit={onSubmit}>
      <input onChange={onChange} type='text' value={message}></input>
    </form>
  )
}

export default SendMessageForm;