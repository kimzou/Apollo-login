import React from 'react'
import Login from './components/login.js'
import Home from './components/home.js'

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'

function App() {

  const PrivateRoute = ({ ...rest }) => {

    const cookie = Cookies.get('token');

    return cookie ?
    <Route {...rest} />
    :
    <Redirect to="/login" />
  }
  
  const LoginRoute = ({ ...rest }) => {
    
    return !Cookies.get('token') ?
    <Route {...rest} />
    :
    <Redirect to="/" />
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" component={Home} exact />
        <LoginRoute path="/login" component={Login} exact />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;