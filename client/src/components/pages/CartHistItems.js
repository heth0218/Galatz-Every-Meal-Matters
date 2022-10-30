import React from 'react'
import PropTypes from 'prop-types'

const CartHistItems = ({ item }) => {
    let { cart, finalTotal, date} = item

    cart=JSON.parse(cart)

    // console.log(name)
    return (
        <div>
            <div className="column" float="left" width="50%">
                
                <div class="col s6 m6">
                    <div class="card red lighten-5">
                        {cart.map(element=>(
                            <div>
                                {element.menuId.name}  {element.quantity} {element.menuId.cost} Final cost: {element.quantity* element.menuId.cost}
                            </div>
                        ))}
                        
                        <div class="card-content">
                            <span><h5>Grand Total:&nbsp;&nbsp;{finalTotal}&nbsp;&nbsp;$</h5></span>
                            <h5> Date of purchase:&nbsp;&nbsp;{date}</h5>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </div>
    )
}

CartHistItems.propTypes = {
    item: PropTypes.object.isRequired,
}

export default CartHistItems;
