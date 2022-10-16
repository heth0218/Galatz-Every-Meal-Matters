import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import CartHistItems from "./CartHistItems"
import { loadUser } from "../../actions/userActions"

const CartHistory = ({ user: { user, isAuthenticated }, loadUser }) => {
  useEffect(() => {
    if (localStorage.token) {
      loadUser()
    }
  }, [])

  return (
    <div>
      {isAuthenticated === false ? (
        <h1>Who are you ?</h1>
      ) : (
          <div>
            <h3>
              {" "}
              <i className="large material-icons">shopping_cart</i>
              {user.name}'s Cart History
          </h3>
            <div>
              {user &&
                user.cartHistory.map((cart) => (
                  <CartHistItems item={cart} key={cart._id} />
                ))}
            </div>
          </div>
        )}
    </div>
  )
}

CartHistory.propTypes = {
  user: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, { loadUser })(CartHistory)
