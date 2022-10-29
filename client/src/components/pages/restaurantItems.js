import React from 'react'
import PropTypes from 'prop-types'

import { setRestaurant, deleteRestaurant } from '../../actions/restaurantActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import M from 'materialize-css/dist/js/materialize.min.js';

const restaurantItems = ({ user, restaurant, setRestaurant, deleteRestaurant }) => {
    const { _id, name, contact, email, starRating, image, isAvailable } = restaurant

    const getARestaurant = () => {
        setRestaurant(_id);
    }

    const deleteRest = () => {
        deleteRestaurant(_id)
        M.toast({ html: `${name} is successfully deleted ` })
    }

    return (
        <div className="col s12 m9">
            <div className="card horizontal  red lighten-5">
                <div className="card-image">
                    <img width="200" height="200" src={image} />
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <h5 className="red-text">{name}</h5>
                        <span><i className="material-icons">email</i>&nbsp;&nbsp;Email:&nbsp;<span>{email}</span></span>
                        <br />
                        {/* <span><i className="material-icons">call</i> &nbsp;&nbsp;Contact:&nbsp;{contact && (contact.map(con => <span>{con}</span>))}
                        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                        <span><i className="material-icons" >star</i> &nbsp;&nbsp;Rating:&nbsp;{starRating}
                        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {!isAvailable ? (<label>
                            <input id="indeterminate-checkbox" disabled="disabled" type="checkbox" />
                            <span>Unavailable</span>
                        </label>) : (<label>
                            <input type="checkbox" class="filled-in" checked="checked" />
                            <span>Available</span>
                        </label>)}
                    </div>
                    <div className="card-action">
                        {/* <a onClick={getARestaurant}>Go To Restaurant</a> */}
                        <h5 onClick={getARestaurant}><Link to="/restaurant">Go To Restaurant</Link></h5>
                    </div>
                    {user && user.roles[0] === 'admin' && <a href="#!" className="secondary-content" onClick={deleteRest}>
                        Delete:&nbsp;&nbsp;&nbsp;&nbsp; <i className="material-icons red-text">delete</i>
                    </a>}

                </div>
            </div>
        </div >

    )
}

restaurantItems.propTypes = {
    restaurant: PropTypes.object.isRequired,
    setRestaurant: PropTypes.func.isRequired,
    deleteRestaurant: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({

    user: state.user.user
}
)
export default connect(mapStateToProps, { setRestaurant, deleteRestaurant })(restaurantItems)