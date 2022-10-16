import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { loadUser } from "../../actions/userActions"
import { getCart, buyCart } from "../../actions/cartActions"
import Preloader from "../layout/Preloader"
import CartItems from "./CartItems"
import M from "materialize-css/dist/js/materialize.min.js"

const Cart = ({
  cartItems,
  getCart,
  user,
  isAuthenticated,
  buyCart,
  loadUser,
}) => {
  useEffect(() => {
    getCart()
    if (localStorage.token) {
      loadUser()
    }
    // eslint-disable-next-line
  }, [])

  const buyCarty = () => {
    buyCart()
    M.toast({ html: `You have successfully bought the Cart Items` })
  }

  return (
    <div>
      {user === null ? (
        <h3>
          {" "}
          <i className="large material-icons">shopping_cart</i> Cart
        </h3>
      ) : (
          <h3>
            {" "}
            <i className="large material-icons">shopping_cart</i>
            {user.name}'s Cart
          </h3>
        )}

      {cartItems === null || isAuthenticated === false ? (
        <Preloader />
      ) : (
          cartItems.map((cartItem) => (
            <CartItems cart={cartItem} key={cartItem._id} />
          ))
        )}

      <h3>Lets Add Some to the Cart</h3>
      <a
        class="waves-effect waves-light btn-large red accent-2"
        onClick={buyCarty}
      >
        Buy&nbsp;&nbsp;&nbsp;&nbsp;
        <i className="material-icons">chevron_right</i>
      </a>
      <br />
      <br />
      <br />
    </div>
  )
}

Cart.propTypes = {
  getCart: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
})

export default connect(mapStateToProps, { getCart, buyCart, loadUser })(Cart)
