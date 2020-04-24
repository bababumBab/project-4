import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import auth from '../../lib/auth'

class Collection extends React.Component {

  constructor() {
    super()
    this.state = {
      sneakers: [],
      modalActive: false,
      singleSneaker: {
        description: {}
      }
    }
  }

  getSneakers() {
    axios.get('/api/sneakers/', {
      headers: { Authorization: `Bearer ${auth.getToken()}` }
    })
      .then(response => {
        this.setState({ sneakers: response.data })
        console.log(response.data)
      })
  }

  handleClick(sneaker) {
    
    axios.get(`/api/sneakers/${sneaker.id}`)
      .then(response => {
        this.setState({ data: response.data, description: response.data.description })
        this.setState({ singleSneaker: response.data })
        this.toggleModal()
      })
  }

  handleDelete(e, sneaker) {
    e.preventDefault()
    axios.delete(`/api/sneakers/${sneaker.id}/`,{
      headers: { Authorization: `Bearer ${auth.getToken()}` }
    })
      .then(response => {
        this.getSneakers()
      })
  }

  sortShoesByDate() {
    const direction = this.state.sorted 
    let newDirection = 'desc'
     if (direction == 'desc') {
      newDirection = 'asc'
    } 
    const sorted = this.state.sneakers.slice().sort((a, b) => {
      const da = new Date(a.date_of_last_use)
      const db = new Date(b.date_of_last_use)
      if (newDirection == 'desc') {
        return db - da
      } else {
        return da - db
      }
    })

    this.setState({ sneakers: sorted, sorted: newDirection })
  }

  // totalCollectionValue(a, b) {
  // }

  componentDidMount() {

    this.getSneakers()
  }
  
  render() {

    return (
      <>
        <div>
          <Link className="button-G" to="/add">
          Add a new Sneaker to your Collection
          </Link>
        </div>
        <div className="column is-1-desktop"></div>
        <div>
          {/* <div className="collection-counter">
          <div className="base-filters">
            <label> Collection Value <br /> </label>
          </div> */}
          <div className="base-filters">
            <button className="button-A"  onClick={() => this.sortShoesByDate()}> Sort your shoes by date </button>
          </div>
        </div>
        
        <div className="columns is-multiline" >
          {this.state.sneakers.map((sneaker, i) => {
            if (i < 100) {
              return (
                <div className="column">
                  <div className="card">
                    <div className="data-columns-container" onClick={() => this.handleClick(sneaker)}>

                          <header className="card-header">
                          <p id='model_name' style={{ color: '#d49677' }}> {sneaker.model_name} </p>
                          </header>  
                      
                          <div className="card-content">
                            <img src={sneaker.image} />
                            
                            <h1 id='brand' style={{ color: '#d49677' }}> {sneaker.brand} </h1>
                            <h3 id='product_code' style={{ color: '#d49677' }}>Product Code {sneaker.product_code} </h3>
                            <h2 id='release' style={{ color: '#d49677' }}> Release Type {sneaker.release} </h2>
                            <h2 id='sneaker_type' style={{ color: '#d49677' }}> Sneaker Type {sneaker.sneaker_type} </h2>
                            <h3 id='date_added' style={{ color: '#d49677' }}> Date added: {sneaker.date_added} </h3>
                            <h2 id='retail_price' style={{ color: '#d49677' }}> Retail Price: £{sneaker.retail_price} </h2>
                            <h2 id='purchase_price' style={{ color: '#d49677' }}> Purchase Price: £{sneaker.purchase_price} </h2>
                            <h2 id='collection' style={{ color: '#d49677' }}> {sneaker.collection} </h2>
                            <h2 id='date_of_last_use' style={{ color: '#d49677' }}>Last use: {sneaker.date_of_last_use} </h2>
                          </div>  
                          <footer className="card-footer">
                          <a href={'#/edit/' + sneaker.id} className="card-footer-item">Edit</a>
                          <a href='#'  className="card-footer-item" onClick={(e) => this.handleDelete(e, sneaker)}>Delete</a>
                          </footer>
                    </div>
                  </div>
                </div>
              )
            }
          })}

        </div>
       
        {/* {this.state.modalActive ? <SingleSneaker
          symbol={this.state.singleCoin.symbol}
          name={this.state.singleCoin.name}
          id={this.state.singleCoin.id}
          description={this.state.singleCoin.description}
          toggleModal={() => this.toggleModal()} /> : null} */}
      </>

    )
  }
}

export default Collection
