import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import auth from '../../lib/auth'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        password: ''
      },
      error: ''
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(event) {
    event.preventDefault()
    axios
      .post('/api/login', this.state.data)
      .then(res => {
        const token = res.data.token
        auth.setToken(token)
        this.props.history.push('/sneakers')
      })
  }

  render() {

    return (
      <div className="container-m">
        <div className="section-m loginPageJ">
          <div className="loginSectionJ">
            <div className="fillJ"></div>
            <div className="contentJ">
              <h1 className="title-m">Login</h1>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event)}
              >
                <div className="fieldJ">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      onChange={event => this.handleChange(event)}
                      type="text"
                      name="username"
                      className="input"
                    />
                  </div>
                </div>
                <div className="fieldJ">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      onChange={event => this.handleChange(event)}
                      type="password"
                      name="password"
                      className="input"
                    />
                  </div>
                </div>
                <button className="buttonJ" type="submit">
                  Login
                </button>
              </form>
            </div>
            <div className="fillJ"></div>
          </div>
          <div className="wrapRegisterJ">
            <div className="fillJ"></div>
            <div className="registerSectionJ">
              <div className="fillJ"></div>
              <div className="toRegJ">
                <h3>
                  Do not have an account? <Link to="/register"> Sign up </Link>
                  instead!
                </h3>
              </div>
              <div className="fillJ"></div>
            </div>
            <div className="fillJ"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
