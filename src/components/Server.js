// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Grid from '@material-ui/core/Grid'
// import MessageList from './components/MessageList';
// import SendMessageForm from './components/SendMessageForm';

// const Server = (props) => {
//   const currentServer = useSelector(state.server.currentServer)
  
//   const renderMessageView = () => {
//     const currentChannel = false;
//     if (currentChannel) {
//       return (
//         <div className='message-view'>
//           <MessageList />
//           {/* <SendMessageForm onSend={onSend} /> */}
//         </div>
//       )
//     }
//   }
//   if (needLogin) {
//     return (
//       <main>
//         <LogIn onChange={setNeedLogin} />
//       </main>
//     )
//   }
//   return (
//     <Grid container spacing={1}>
//       <Grid container item xs={2}>
//         <ChannelNav server={currentServer}/>
//       </Grid>
//       <Grid container item xs={7}>
//         <div className='test' />
//       </Grid>
//       <Grid container item xs={2}>
//         <div className='test' />
//       </Grid>
//     </Grid>
//   )

// }
// export default Server;

