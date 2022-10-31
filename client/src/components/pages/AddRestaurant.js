import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addRestaurant } from '../../actions/restaurantActions'
import M from 'materialize-css/dist/js/materialize.min.js';
import { loadUser } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'

const AddRestaurant = ({ addRestaurant, loadUser }) => {
    let history = useHistory()
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line 
    }, [])

    const [restaurant, setRestaurant] = useState({
        name: '',
        contact: '',
        email: '',
        address: '',
        image: '',
        starRating: '',
        description: '',
        type: ''
    })
    const { name, contact, email, address, image, starRating, description, type } = restaurant

    const onChange = e => setRestaurant({ ...restaurant, [e.target.name]: e.target.value })

    const onSubmit = e => {
        console.log(name, contact, email, address, image, starRating, description, type)
        e.preventDefault();
        addRestaurant({ name, contact, email, address, image, starRating, description, type });
        M.toast({ html: ` ${name}, you have successfully been registered ` })
        history.push('/')
    }

    return (
        <div className="form-container">
            <h2>
                <span className="red-text logo">Add Restaurant</span>
            </h2>
            <form onSubmit={onSubmit}>
                <div className="form-group ff">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="contact">Contact</label>
                    <input type="text" name="contact" value={contact} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" name="email" value={email} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={address} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" value={image} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="starRating">Star rating</label>
                    <input type="text" name="starRating" value={starRating} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={description} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="type">Type</label>
                    <input type="text" name="type" value={type} onChange={onChange}></input>
                </div>
                <input type="submit" value="Add Restaurant" className="btn waves-effect waves-light red btn-block" />
            </form>

        </div >
    )
}

AddRestaurant.propTypes = {
    addRestaurant: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}

export default connect(null, { addRestaurant, loadUser })(AddRestaurant)