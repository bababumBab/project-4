import React from 'react'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import About from './About'
// import auth from 'frontend/lib/auth.js'


const HomePage = () => {

  return <div className='hero is-fullheight'>
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">
          Fresh  Sneakers
              </h1>
        <h2 className="subtitle">
          Collect - Rotate
          </h2>
        <h2 className="subtitle">
          Plan Accordingly
          </h2>
          <img id='cover-image' src="https://images.unsplash.com/photo-1496115898806-2b023a9dcb6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1694&q=80" />
      </div>
    </div>
  </div>



}

export default HomePage