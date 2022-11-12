import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getRestaurant } from '../../actions/restaurantActions'
import Preloader from '../layout/Preloader'
// import '../../App.css'
import MenuItems from './MenuItems'
import { loadUser } from '../../actions/userActions'
import logo from '../../../../client/src/yelp_logo.png'
import { Link } from 'react-router-dom'


const Restaurant = ({ getRestaurant, user, restaurant: { current, menu }, loadUser }) => {
    useEffect(() => {
        getRestaurant();
        console.log(current, menu);
        if (localStorage.token) { loadUser() }
        // eslint-disable-next-line
    }, [])

    function validateText(str)
    {
        var tarea = str;
        if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
            return true
        }
        return false
    }

    return (

        <div classNameName="row m10 ">
            <div>{!current && !menu ? (<Preloader />) : (
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card red lighten-5">
                            {current[0].image&&validateText(current[0].image)?(<div className="card-image">
                                <img style={{height:"70vh", width:"100%"}} src={current[0].image} />
                                <span className="card-title logo" style={{color: "black"}}>{current[0].name}</span>
                                <span></span>
                            </div>):
                            (<div className="card-image value1">
                            <img width="100%" height="400vw" src={logo} />
                            <span className="card-title logo">{current[0].name}</span>
                            <span></span>
                        </div>)
                            }
                            <div className="card-content">
                                <span className='ff'><i className="material-icons">email</i>&nbsp;&nbsp;&nbsp;Email:&nbsp;<span>{current[0].email}</span></span>

                                <br />
                                {/* <span className='ff'><i className="material-icons">call</i> &nbsp;&nbsp;&nbsp;Contact:&nbsp;{current[0].contact && (current[0].contact.map(con => <span>{con}</span>))}
                                </span> */}
                                <br />
                                <span className='ff'><i className="material-icons">location_on</i>&nbsp;&nbsp;&nbsp;<span>{current[0].address}</span></span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {!current[0].isAvailable ? (<span><span> <a class="ff btn-floating btn-small waves-effect waves-light red"></a>&nbsp;&nbsp;&nbsp;</span><span>Sorry, We are unavailable</span></span>) : (<span> <a class="ff btn-floating btn-small waves-effect green accent-3"></a>&nbsp;&nbsp;&nbsp;<span></span><span className='ff'>We are available at your service</span></span>)}
                                <br />
                                <span className='ff'><i className="material-icons" >star</i> &nbsp;&nbsp;Rating:&nbsp;{current[0].starRating}
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                                <h3 className="red-text italic ff">{current[0].description}</h3>
                            </div>
                        </div>
                    </div>
                    {user && user.roles === 'admin' && <h6 className='ff'>Add Menu Item&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/addMenu"><i className="material-icons">add</i></Link></h6>
                    }
                    <div class="row">
                        {menu.map(men => <MenuItems men={men} key={men.menuItemsId} />)}
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
