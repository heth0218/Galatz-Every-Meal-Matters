import React from 'react'
import { Link } from 'react-router-dom'

const CartBtns = () => {
    return (
        <div className="fixed-action-btn">
            <a href="#cart-modal" className="btn-floating btn-large blue darken-2 modal-trigger">
                <i className="large material-icons">shopping_cart</i>
            </a>
            <ul>
                <li>
                    <Link to="/cart">
                        <a href="#current-cart-modal" className="btn-floating btn-large green modal-trigger">
                            <i className="material-icons">shopping_basket</i>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link to='/cartHistory'>
                        <a href="#cart-history-modal" className="btn-floating btn-large red modal-trigger">
                            <i className="material-icons">shop_two</i>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default CartBtns;