import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route, Link, withRouter, Redirect } from 'react-router-dom'
import SecureRoute from '../lib/SecureRoute'

import 'bulma'
import './components/styles/main.scss'


import Navbar from './components/Navbar'

import HomePage from './components/HomePage'
import Register from './components/RegistrationForm'
import Login from './components/LoginForm'
import Collection from './components/Collection'
import AddSneaker from './components/AddSneaker'
import EditSneaker from './components/EditSneaker'


const App = () => {


  return <HashRouter>
      <Navbar/>
      
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Redirect from='/login/:id' to='/sneakers' />
        <Route exact path="/sneakers" component={Collection}/>
        <Route exact path="/add" component={AddSneaker}/>
        <Route exact path="/edit/:id" component={EditSneaker}/>
      </Switch>

  </HashRouter >
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)