import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { loadUser } from "../../actions/userActions"
import { getCart, buyCart } from "../../actions/cartActions"
import Preloader from "../layout/Preloader"
import CartItems from "./CartItems"
import M from "materialize-css/dist/js/materialize.min.js"
import "../mystyles.css";
import { useHistory } from 'react-router-dom'

const Cart = ({
  cartItems,
  getCart,
  user,
  isAuthenticated,
  buyCart,
  loadUser,
}) => {

  let history = useHistory();

  useEffect(() => {
    getCart()
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, [])

  const buyCarty = () => {
    buyCart()
  
    M.toast({ html: `You have successfully bought the Cart Items` })
  }


  let gotoHome=()=>{
    history.push('/')
  }

  return (
    <div className = "cart-page">
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
          <div class="row">
   
      <div class="card " 
      style = {{backgroundColor:"#090541", paddingTop:"7vh", borderWidth:"0.3vw", borderStyle:"solid", borderColor:"white" }}>
  
      
      <div class = "row"  >
      <div class="col s9" >
      <div class = "row" float="left" style = {{paddingLeft:"2vw", paddingBottom:"2vh"}}>
      <div class="col s3" >
        <p className = "navlist">Product</p>
      </div>
      <div c class="col s3 navlist">
       Cost
      </div>
      <div class="col s3 navlist">
      Quantity
      </div>
      <div class="col s3 navlist">
      Delete
      </div>
</div>
      {cartItems==null || isAuthenticated === false ? (
        <Preloader />
      ) : (
          cartItems.map((cartItem) => (
            <CartItems cart={cartItem} key={cartItem._id} />
          ))
        )}
       
        

          </div>
      <div class="col s3" 
      style = {{backgroundColor:"#dc3545", marginTop:"1vh", borderRadius: "10px", height:"100%", paddingTop:"10%"}}>
        {cartItems==null || isAuthenticated === false ? (
        ""
      ) : (
          cartItems.map((cartItem) => (
           <div>
            <br />
           <br />
           <br />
           </div>
          ))
        )}
      {user&&(user == null ? "" : 
            <div class = "row"  >
            <div class="col s4" style = {{paddingTop:"2vh"}} >
      <p className = "value">Cart </p><br />
      <p className = "value">Total: </p>
      </div>
      <div class="col s8" >
      <h3 className = "total">{user.currentTotal}</h3>
      </div>
      </div>)
      }
      <br />
      {cartItems&&cartItems.length!=0&&
      <button className="btn3 success2" onClick={buyCarty}>
      <div class = "row" style = {{paddingTop:"30%"}}  >
      <div class="col s10" >
      
      CHECKOUT 
      
      </div>
      <div class="col s2" >
        <i className="material-icons" >chevron_right</i>
        </div>
      
      
      </div>
      </button>

}
     
      <br />
      <br />
      <button className="btn3 success2" onClick={gotoHome} >
      <div class = "row" style = {{paddingTop:"30%"}}  >
      <div class="col s10" >
      
      BACK TO ORDERING
      
      </div>
      <br />
      <div class="col s2" >
        <i className="material-icons" >chevron_left</i>
        </div>
      
      
      </div>
      </button>
      {cartItems==null || isAuthenticated === false ? (
        ""
      ) : (
          cartItems.map((cartItem) => (
           <div>
           <br />
           <br />
           <br />
           </div>
          ))
        )}
      <br />
      </div>

      </div>
        
      </div>
  
  </div>
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
