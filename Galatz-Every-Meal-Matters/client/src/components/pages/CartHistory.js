import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import CartHistItems from "./CartHistItems"
import { loadUser } from "../../actions/userActions"
import "../mystyles.css";

const CartHistory = ({ user: { user, isAuthenticated }, loadUser }) => {
  useEffect(() => {
    if (localStorage.token) {
      loadUser()
    }
  }, [])

  return (
    <div>
      {isAuthenticated === false ? (
        <h1>Who are you? Kindly Login</h1>
      ) : (
          <div>
            <h3>
              {" "}
              <i className="large material-icons">shopping_cart</i>
              {user.name}'s Cart History
          </h3>
          <div class="row">
   
   <div class="card " 
   style = {{backgroundColor:"#090541", paddingTop:"7vh", borderWidth:"0.3vw", borderStyle:"solid", borderColor:"white" }}>

   
   <div class = "row"  >
   <div class="col s12" >
   <div class = "row" float="left" style = {{paddingLeft:"2vw", paddingBottom:"2vh"}}>
   <div class="col s2" >
     <p className = "navlist">Product</p>
   </div>
   <div c class="col s2 navlist" style = {{paddingLeft:"2vw"}}>
    Cost
   </div>
   <div class="col s2 navlist" style = {{paddingLeft:"2vw"}}>
   Quantity
   </div>
   <div class="col s2 navlist" style = {{paddingLeft:"4vw"}}>
   Total
   </div>
</div>
   
    {user &&
      user.cartHistory.map((cart) => (
        <CartHistItems item={cart}/>
      ))}
   
    
     

       </div>
  

   </div>
     
   </div>

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
