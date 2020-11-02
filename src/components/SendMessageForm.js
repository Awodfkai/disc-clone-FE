import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField'

const SendMessageForm = ({onSend}) => {
  const [message, setMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('onSubmit message: ', message)
    onSend(message);
    setMessage('');
  }

  const onChange = e => {
    setMessage(e.target.value);
  }

  return(
    <form onSubmit={onSubmit}>
      <TextField
        onChange={onChange}
        variant="outlined"
        margin="dense"
        required
        fullWidth
        id="messageForm"
        name="Message Form"
        autoFocus
        value={message}
      />
    </form>
  )
}

export default SendMessageForm;