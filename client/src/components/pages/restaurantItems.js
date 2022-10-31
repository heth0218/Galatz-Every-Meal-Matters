import React from 'react'
import PropTypes from 'prop-types'

import { setRestaurant, deleteRestaurant } from '../../actions/restaurantActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import logo from '../../../../client/src/yelp_logo.png'

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

    function validateText(str)
    {
        var tarea = str;
        if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
            return true
        }
        return false
    }

    return (
        <div className="col s12 m9">
            <div className="card horizontal  red lighten-5">
            {image&&(validateText(image)?<div className="card-image">
                    <img style = {{height:"30vh", width:"18vw"}} src={image} />
                </div>:
                <div className="card-image">
                    <img style = {{height:"30vh", width:"18vw"}}src={logo} />
                </div>)
                }
                <div className="card-stacked">
                    <div className="card-content">
                        <h5 className="red-text name1">{name}</h5>
                        <span class="value2"><i className="material-icons">email</i>&nbsp;&nbsp;Email:&nbsp;<span>{email}</span></span>
                        <br />
                        {/* <span><i className="material-icons">call</i> &nbsp;&nbsp;Contact:&nbsp;{contact && (contact.map(con => <span>{con}</span>))}
                        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                        <span class="value2"><i className="material-icons" >star</i> &nbsp;&nbsp;Rating:&nbsp;{starRating} Star
                        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {!isAvailable ? (<label class="value2">
                            <input id="indeterminate-checkbox" disabled="disabled" type="checkbox" />
                            <span>Unavailable</span>
                        </label>) : (<label class="value2">
                            <input type="checkbox" class="filled-in" checked="checked" />
                            <span>Available</span>
                        </label>)}
                    </div>
                    <div className="card-action">
                        {/* <a onClick={getARestaurant}>Go To Restaurant</a> */}
                        <h5 className='navlist' onClick={getARestaurant}><Link to="/restaurant">Go To Restaurant</Link></h5>
                    </div>
                    {user && user.roles[0] === 'admin' && <a href="#!" className="secondary-content name2" onClick={deleteRest}>
                        Delete this restaurant:&nbsp;&nbsp;&nbsp;&nbsp; <i className="material-icons red-text">delete</i>
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