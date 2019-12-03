import React, { useEffect, useState } from 'react'
import Login from './components/login.js'
import Home from './components/home.js'

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

function App() {

  const PrivateRoute = ({ ...rest }) => {

    const token = localStorage.getItem('token')
    console.log({token});
    
    return token ?
    <Route {...rest} />
    :
    <Redirect to="/login" />
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;