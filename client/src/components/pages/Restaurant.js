import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getRestaurant } from '../../actions/restaurantActions'
import Preloader from '../layout/Preloader'
import '../../App.css'
import MenuItems from './MenuItems'
import { loadUser } from '../../actions/userActions'

import { Link } from 'react-router-dom'

const Restaurant = ({ getRestaurant, user, restaurant: { current, menu }, loadUser }) => {
    useEffect(() => {
        getRestaurant();
        if (localStorage.token) { loadUser() }
        // eslint-disable-next-line
    }, [])

    return (

        <div classNameName="row m10 ">
            <div>{!current && !menu ? (<Preloader />) : (
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card red lighten-5">
                            <div className="card-image">
                                <img src={current.image} />
                                <span className="card-title">{current.name}</span>
                                <span></span>
                            </div>
                            <div className="card-content">
                                <span><i className="material-icons">email</i>&nbsp;&nbsp;&nbsp;Email:&nbsp;<span>{current.email}</span></span>

                                <br />
                                <span><i className="material-icons">call</i> &nbsp;&nbsp;&nbsp;Contact:&nbsp;{current.contact && (current.contact.map(con => <span>{con}</span>))}
                                </span>
                                <br />
                                <span><i className="material-icons">location_on</i>&nbsp;&nbsp;&nbsp;<span>{current.address}</span></span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {!current.isAvailable ? (<span><span> <a class="btn-floating btn-small waves-effect waves-light red"></a>&nbsp;&nbsp;&nbsp;</span><span>Sorry, We are unavailable</span></span>) : (<span> <a class="btn-floating btn-small waves-effect green accent-3"></a>&nbsp;&nbsp;&nbsp;<span></span><span>We are available at your service</span></span>)}
                                <br />
                                <span><i className="material-icons" >star</i> &nbsp;&nbsp;Rating:&nbsp;{current.starRating}
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                                <h3 className="red-text italic">{current.description}</h3>
                            </div>
                        </div>
                    </div>
                    {user && user.roles[0] === 'admin' && <h6>Add Menu Item&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/addMenu"><i className="material-icons">add</i></Link></h6>
                    }
                    <div class="row">
                        {menu.map(men => <MenuItems men={men} key={men._id} />)}
                    </div>
                </div>
            )
            }
            </div >
        </div >
    )
}
Restaurant.propTypes = {
    restaurant: PropTypes.object.isRequired,
    getRestaurant: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    restaurant: state.restaurant,
    user: state.user.user
})

export default connect(mapStateToProps, { getRestaurant, loadUser })(Restaurant)
