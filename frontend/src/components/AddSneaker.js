import React from 'react'
import axios from 'axios'
// import NavBar from './NavBar'

import auth from '../../lib/auth'
import SneakerForm from './SneakerForm'

class AddSneaker extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        image: '',
        product_code: '',
        collorway: '',
        brand: '',
        model_name: '',
        release: 'gr',
        sneaker_type: 'LIFESTYLE',
        retail_price: '',
        purchase_price: '',
        collection: '',
        date_of_last_use: ''
      },
      errors: {}
    }
  }

  handleChange(sneaker) {
    const { name, value } = sneaker.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(sneaker) {
    sneaker.preventDefault()
    axios
      .post('/api/sneakers/', this.state.data, {
        headers: { Authorization: `Bearer ${auth.getToken()}` }
      })
      .then(() => this.props.history.push('/sneakers/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    const { errors } = this.state
    return (
      <div className="container-m">
        {/* <NavBar /> */}

        <div className="section-m loginPageJ">
          <div className="loginSectionJ">
            <div className="fillJ"></div>
            <div className="contentJ">
              <h1 className="title-g">Add a new Sneaker to your collection</h1>
              <SneakerForm
                handleSubmit={sneaker => this.handleSubmit(sneaker)}
                handleChange={sneaker => this.handleChange(sneaker)}
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddSneaker
