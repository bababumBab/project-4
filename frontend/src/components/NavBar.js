import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/auth'

const Navbar = (props) => {
  function handleLogout() {
    Auth.logout()
  }
  return <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <button>
      <Link className="navbar-item" to="/">
        Home
      </Link>
      </button>
      
      <button>
      <Link className="navbar-item" to="/sneakers">
        Sneakers Collection
      </Link>
      </button>
      

    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link className="button is-primary"to="/register" id="primary">
            <strong>Sign up</strong>
          </Link>
          <Link className="button is-light"to="/login">
            Log in
          </Link>
          <Link onClick={handleLogout} className="button is-light"to="/">
            Log out
          </Link>
        </div>
      </div>
    </div>
  </div>
</nav>

  
  

}

export default withRouter(Navbar) 
