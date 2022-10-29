import React from 'react'
import PropTypes from 'prop-types'

const CartHistItems = ({ item }) => {
    let { cart, finalTotal} = item

    cart=JSON.parse(cart)

    // console.log(name)
    return (
        <div>
            <div className="column" float="left" width="50%">
                
                {/* <div class="col s6 m6">
                    <div class="card red lighten-5">
                        <h3>{name}</h3>
                        <div class="card-content">
                            <span><h5>cost:&nbsp;&nbsp;{cost}&nbsp;&nbsp;$/item</h5></span>
                            <h5> Quantity:&nbsp;&nbsp;{quantity}</h5>
                        </div>
                    </div>
                </div>
                <br /> */}
            </div>
        </div>
    )
}

CartHistItems.propTypes = {
    item: PropTypes.object.isRequired,
}

export default CartHistItems;
