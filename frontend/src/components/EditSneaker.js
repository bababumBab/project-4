import React from 'react'
import axios from 'axios'
// import NavBar from './NavBar'

import auth from '../../lib/auth'
import EditForm from './EditForm'

class EditSneaker extends React.Component {
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
  componentDidMount() {
    const id = this.props.match.params.id
    axios
      .get(`/api/sneakers/${id}`, {
        headers: { Authorization: `Bearer ${auth.getToken()}` }
      })
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.error(err))
  }
  handleChange(sneaker) {
    const { name, value } = sneaker.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(sneaker) {
    const id = this.props.match.params.id
    sneaker.preventDefault()
    axios
      .put(`/api/sneakers/${id}/`, this.state.data, {
        headers: { Authorization: `Bearer ${auth.getToken()}` }
      })
      .then(() => this.props.history.push('/sneakers/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    
    return (
      <div className="container-m">
        {/* <NavBar /> */}

        <div className="section-m loginPageJ">
          <div className="loginSectionJ">
            <div className="fillJ"></div>
            <div className="contentJ">
              <h1 className="title-g">Edit the Sneaker in your collection</h1>
              <EditForm
                handleSubmit={sneaker => this.handleSubmit(sneaker)}
                handleChange={sneaker => this.handleChange(sneaker)}
                data={this.state.data}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditSneaker
