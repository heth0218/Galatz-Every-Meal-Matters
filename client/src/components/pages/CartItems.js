import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteItem } from '../../actions/cartActions'
import logo from '../../../../client/src/yelp_logo.png'
import { loadUser } from '../../actions/userActions';

const CartItems = ({ cart,loadUser, deleteItem }) => {
    const {_id, menuId, quantity} = cart
    const deleteIt = () => {
        loadUser();

        deleteItem({_id})
    }

    function validateText(str)
    {
        var tarea = str;
        if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
            return true
        }
        return false
    }

    return (
        <div>
            <div className="column" float="left" width="100%">

                {/* <div class="col s6 m6"> */}
                    <div class="card  " style = {{backgroundColor:"white", borderWidth:"0.3vw", borderStyle:"solid",borderColor:"#e63143", marginTop:"2vh"}}>
                      
                        <div class="card-content" >
                        <div class = "row" >
                        <div class="col s3">
                        {menuId.image&&(validateText(menuId.image)?<img src={menuId.image} alt="" class="responsive-img"  style = {{height:"12vh", width:"10vw"}}/>:
                        <img src={logo} alt="" class="responsive-img"  style = {{height:"12vh", width:"10vw"}}/>)}
                        
                            
                                        </div>
                        <div class="col s3">
                        <span><h5 className = "value1" >{menuId.cost}</h5></span>

                        </div>
                        <div class="col s3" >
                        <h5 className = "value1" style={{paddingLeft:"2vw"}}>{quantity}</h5>

                        </div>
                        <div class = "col s3">
                        <button className="btn2 success" onClick={deleteIt}>
      <div class = "row" style = {{paddingTop:"2vh", paddingRight:"1vw"}}  >
      <div class="col s8" style = {{paddingTop:"2vh"}}>
      
      DELETE 
      
      </div>
      <div class="col s4" >
        <i className="material-icons">delete</i>
        </div>
      
      
      </div>
      </button>
                       

                        </div>
                        </div>
                        <p className = "name1">{menuId.name}</p>
                        </div>
                    </div>
                {/* </div> */}
                <br />

            </div>
        </div>
    )
}

CartItems.propTypes = {
    cart: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired,
}

export default connect(null, { deleteItem, loadUser })(CartItems)