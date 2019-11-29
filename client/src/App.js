import React from 'react'
import Login from './components/login.js'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" to="/login" exact />
        <Route path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;