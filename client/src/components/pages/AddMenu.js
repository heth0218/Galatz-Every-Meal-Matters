import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addMenuItem } from '../../actions/restaurantActions'
import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min.js';
import { loadUser } from '../../actions/userActions'
import { useHistory } from 'react-router-dom'

const AddMenu = ({ addMenuItem, loadUser }) => {
    let history = useHistory()
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    const [menu, setMenu] = useState({
        name: '',
        cost: '',
        image: '',
        description: ''
    })
    const { name, cost, image, description } = menu

    const onChange = e => setMenu({ ...menu, [e.target.name]: e.target.value })

    const onSubmit = e => {
        console.log(name, cost, image, description)
        e.preventDefault();
        const menu = {
            
            name, cost, image, description,restaurant: localStorage.restaurant
        }
        addMenuItem(menu);
        history.push('/restaurant')
        M.toast({ html: ` ${name}, you have successfully been registered ` })
    }
    return (
        <div className="form-container">
            <h2>
                <span className="red-text logo">Add Menu Item</span>
            </h2>
            <form onSubmit={onSubmit}>
                <div className="form-group ff">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="cost">Cost</label>
                    <input type="text" name="cost" value={cost} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" value={image} onChange={onChange}></input>
                </div>
                <div className="form-group ff">
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" value={description} onChange={onChange}></input>
                </div>
                <input type="submit" value="Add Menu" className="btn waves-effect waves-light red btn-block" />
            </form>

        </div >
    )
}

AddMenu.propTypes = {
    addMenuItem: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
}

export default connect(null, { addMenuItem, loadUser })(AddMenu)