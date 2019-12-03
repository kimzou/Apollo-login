import React, { useEffect, useState } from 'react'
import Login from './components/login.js'
import Home from './components/home.js'

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

function App() {

  // const [token, setToken] = useState(null);

  // console.log('token : ', localStorage.getItem('token'))

  // useEffect(() => {
  //   let local = localStorage.getItem('token');
  //   (local && local !== "undefined") ?
  //     setToken(jwt_decode(local))
  //   :
  //     console.log('Token : ', localStorage.getItem('token'))
  // }, []);
  
  const PrivateRoute = ({ ...rest }) => {

    const token = localStorage.getItem('token')
    console.log({token});
    
    return token ?
    <Route {...rest}/>
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