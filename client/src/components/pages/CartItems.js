import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteItem } from '../../actions/cartActions'

const CartItems = ({ cart, deleteItem }) => {
    const {_id, menuId, quantity} = cart
    const deleteIt = () => {
        deleteItem({_id})
    }
    return (
        <div>
            <div className="column" float="left" width="50%">

                <div class="col s6 m6">
                    <div class="card red lighten-5">
                        <h3>{menuId.name}</h3>
                        <div class="card-content">
                            <span><h5>cost:&nbsp;&nbsp;{menuId.cost}&nbsp;&nbsp;$/item</h5></span>
                            <h5> Quantity:&nbsp;&nbsp;{quantity}</h5>
                            <a class="waves-effect waves-light btn-large teal lighten-2" onClick={deleteIt}>Delete&nbsp;&nbsp;&nbsp;&nbsp;<i className="material-icons">delete</i></a>
                        </div>
                    </div>
                </div>
                <br />

            </div>
        </div>
    )
}

CartItems.propTypes = {
    cart: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
}

export default connect(null, { deleteItem })(CartItems)
