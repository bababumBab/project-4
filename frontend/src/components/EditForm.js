import React from 'react'
import 'bulma'
import bulmaCalendar from 'bulma-calendar'
// import 'dayjs'



const calendars = bulmaCalendar.attach('[type="date"]')
calendars.forEach(calendar => {
  calendar.on('date:selected', date => {
    console.log(date)
  })
})


const EditForm = ({ handleSubmit, handleChange, data }) => {
  return <form
    className="form"
    onSubmit={(sneaker) => handleSubmit(sneaker)}
  >
    <div className="field">

      <label className="label">
        Model
      </label>

      <div className="control">
        <input
          value={(data.model_name)}
          onChange={(sneaker) => handleChange(sneaker)}
          type="text"
          name="model_name"
          className="input-g"
        />
      </div>

    </div>

    <div className="field">
      <label className="label">
        Image
      </label>
      <div className="control">
        <input
          value={(data.image)}
          onChange={(sneaker) => handleChange(sneaker)}
          type="text"
          name="image"
          className="input-g"
        />
      </div>
     
    </div>  

    <div className="field">
      <label className="label">
        Brand
      </label>
      <div className="brand">
        <input
          value={(data.brand)}
          onChange={(sneaker) => handleChange(sneaker)}
          type="text"
          name="brand"
          className="input-g"
        />
      </div>
      
    </div>

    <div className="field">
      <label className="label">
        Product Code
      </label>
      <div className="control">
        <input
          value={(data.product_code)}
          onChange={(sneaker) => handleChange(sneaker)}
          type="text"
          name="product_code"
          className="input-g"
        />
      </div>
      
    </div>

    <div className="field">
      <label className="label">
        Collorway
      </label>
      <div className="control">
        <input
          value={(data.collorway)}
          onChange={(sneaker) => handleChange(sneaker)}
          type="text"
          name="collorway"
          className="input-g"
        />
      </div>
      
    </div>


    <div className="field">
      <label className="label">
        Release Type
      </label>
      <div className="select">
        
        <select value={(data.release)} name="release" onChange={(sneaker) => handleChange(sneaker)}>
        <option value="gr">General Release</option>
        <option value="collab">Collaboration</option>
        </select>
        
      </div>
      
    </div>

    <div className="field">
      <label className="label">
        Sneaker Type
      </label>
      <div className="select">
        <select value={(data.sneaker_type)} name="sneaker_type" onChange={(sneaker) => handleChange(sneaker)}>
        <option value="LIFESTYLE">Lifestyle</option>
        <option value="READYTOWEAR">Ready-to-Wear</option>
        <option value="CASUAL">Casual</option>
        <option value="BOOTS">Boots</option>
        <option value="RUNNING">Running</option>
        <option value="OUTDOOR">Outdoor</option>
        <option value="TRAINING">Training</option>
        <option value="FOOTBALL">Football</option>
        <option value="BASKETBALL">Basketball</option>
        <option value="TENNIS">Tennis</option>
        <option value="GOLF">Golf</option>
        <option value="RUGBY">Rugby</option>
        <option value="WEIGHTLIFTING">Weightlifting</option>
        <option value="SKATEBOARDING">Skateboarding</option>
        </select>
        
      </div>
      
    </div>


    <div className="field">
      <label className="label">
        Retail Price
      </label>
      <div className="control">
        <input
          value={(data.retail_price)}
          onChange={(sneaker) => handleChange(sneaker)}
          type="text"
          name="retail_price"
          className="input-g"
        />
      </div>
      
    </div>

    <div className="field">
      <label className="label">
        Purchase Price
      </label>
      <div className="control">
        <input
        value={(data.purchase_price)}
          onChange={(sneaker) => handleChange(sneaker)}
          type="text"
          name="purchase_price"
          className="input-g"
        />
      </div>
    </div>

    <div className="field">
      <label className="label">
        Collection
      </label>
      <div className="control">
        <input
        value={(data.collection)}
          onChange={(sneaker) => handleChange(sneaker)}
          type="text"
          name="collection"
          className="input-g"
        />
      </div>
      
    </div>

    <div className="field">
      <label className="label">
        Date Worn
      </label>
      <div className="control">
        <input
          value={(data.date_of_last_use)}
          onChange={(sneaker) => handleChange(sneaker)}
          id="date_of_last_use"
          type="date"
          name="date_of_last_use"
          className="input"
          data-display-mode="inline" data-is-range="true" data-close-on-select="false" closeonselect="true" position="right">
        </input>
      </div>
    </div>

    <button className="button-G" width="60">
      Save
    </button>
  </form>
}
export default EditForm