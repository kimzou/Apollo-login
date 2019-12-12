import React from 'react'
import Login from './components/login.js'
import Home from './components/home.js'

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;


function App() {
  console.log('app');
  
  const { data } = useQuery(IS_LOGGED_IN);
  
  const PrivateRoute = ({ ...rest }) => {

    return data.isLoggedIn ? <Route { ...rest } /> : <Redirect to="/login" />;

  }
  
  const LoginRoute = ({ ...rest }) => {
    
    return !data.isLoggedIn ? <Route { ...rest } /> : <Redirect to="/" />;

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