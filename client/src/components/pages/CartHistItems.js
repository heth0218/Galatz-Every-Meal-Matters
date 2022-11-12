import React from 'react'
import PropTypes from 'prop-types'
import "../mystyles.css";

const CartHistItems = ({ item }) => {
    // let { } = item
    // console.log(item)
    // cart=JSON.parse(cart)

    // console.log(name)
    return (
        <div>
             <div className="column" float="left" width="100%">

{/* <div class="col s6 m6"> */}
<div class = "row" >
        <div class="col s9">
        
{item.map(element=>(
<div class="card  " style = {{backgroundColor:"white", borderWidth:"0.3vw", borderStyle:"solid",borderColor:"#e63143", marginTop:"2vh"}}>
    
    <div class="card-content" >
        <div class = "row" >
        <div class="col s3">
        
        <span><h5 className = "hist_value1" >{element.orderName}</h5></span>
        
            
                        </div>
        <div class="col s3">
        <span><h5 className = "value1" >{element.menuCost}</h5></span>

        </div>
        <div class="col s3" >
        <h5 className = "value1" style={{paddingLeft:"2vw"}}>{element.orderQuantity}</h5>

        </div>
        <div class = "col s3">
        
        <h5 className = "value1" style={{paddingLeft:"2vw"}}>{element.orderQuantity* element.menuCost}</h5>


        </div>
        </div>
        
        </div>  
                              
    </div>
                        ))}

    </div>
    <div class="col s3" 
      style = {{backgroundColor:"#dc3545", marginTop:"1vh", borderRadius: "10px", height:"100%", paddingTop:"10%"}}>
        {/* {cart==null ? (
        ""
      ) : (
          cart.map((cartItem) => (
           <div>
    
           </div>
          ))
        )} */}
      
      {item&&item.length!=0&&<div><p className = "value">DATE: </p>    
      <h3 className = "hist_total">{item[0].orderDate}</h3></div>}
      
      
      <br />
      {item&&item.length!=0&&
      
      <div class = "row"  >
      <div class="col s4" style = {{paddingTop:"2vh"}}>
<p className = "value">GRAND </p><br />
<p className = "value">Total: </p>
</div>
<div class="col s8" >
<h3 className = "total">$ {item[0].orderCost} </h3>
</div>
</div>
}
     
      <br />
      <br />
      
      {/* {cart==null? (
        ""
      ) : (
          cart.map((cartItem) => (
           <div>
         
         
           </div>
          ))
        )} */}
      <br />
      </div>
    
      
       
    
{/* </div> */}
<br />

</div>
</div>
        </div>
    )
}

CartHistItems.propTypes = {
    item: PropTypes.object.isRequired,
}

export default CartHistItems;
