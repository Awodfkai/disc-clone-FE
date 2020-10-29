import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'

import Sidebar from './components/Sidebar'

const PrivateRoute = (props) => {
  return (<Route render={() => {
    return (
      props.needLogin === true
        ? <Redirect to='/login' />
        : props.children
    );
  }} />);
}

function App(props) {

  return (
    <Grid container spacing={1}>
      <Grid container item xs={1}>
        <Sidebar />
      </Grid>
      <Grid container item xs={2}>
        <div id='test' />
      </Grid>
      <Grid container item xs={6}>
        <div id='test' />
      </Grid>
      <Grid container item xs={2}>
        <div id='test' />
      </Grid>
    </Grid>
  )

}
export default App;

