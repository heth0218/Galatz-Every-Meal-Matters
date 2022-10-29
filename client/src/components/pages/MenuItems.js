import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addMenu } from '../../actions/cartActions'
import { deleteMenu } from '../../actions/restaurantActions'
import M from 'materialize-css/dist/js/materialize.min.js';

const MenuItems = ({ user, men, addMenu, isAuthenticated, deleteMenu }) => {

    const [quantity, setQuantity] = useState("")
    const { _id, name, description, cost, availability, image } = men

    const onChange = e => setQuantity(e.target.value)

    const addItem = () => {
        if (!isAuthenticated) {
            M.toast({ html: 'Please login to galatz' })
        }
        else {
            addMenu({ quantity,
            menuId:_id
            })
            M.toast({ html: `${quantity} of ${name} added to your cart` })
        }

    }

    const deleteMen = () => {
        deleteMenu(_id)
        M.toast({ html: `Menu Item deleted` })
    }



    return (
        <div className="column" float="left" width="50%">
            <div class="col s6 m6">
                <div class="card">
                    <div class="card-image">
                        <img width='100%' height="300vw" src={image} />
                        <span class="card-title">{name}</span>
                        <a class="btn-floating halfway-fab waves-effect waves-light red" onClick={addItem}><i class="material-icons">add_shopping_cart</i></a>
                    </div>
                    <div class="card-content">
                        <h6>{description}</h6>
                        <span><h7>cost :</h7><h5>{cost}$</h5></span>
                        <h6> Quantity:<input type="number" min='0' name="quantity" value={quantity} onChange={onChange}></input></h6>
                    </div>
                    <div>
                        {user && user.roles[0] === 'admin' && <a href="#!" className="secondary-content" onClick={deleteMen}>
                            Delete:&nbsp;&nbsp;&nbsp;&nbsp; <i className="material-icons red-text">delete</i>
                        </a>}
                    </div>
                    <br />

                </div>
            </div>

        </div>
    )
}

MenuItems.propTypes = {
    menu: PropTypes.object.isRequired,
    addMenu: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    deleteMenu: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
})
export default connect(mapStateToProps, { addMenu, deleteMenu })(MenuItems)
