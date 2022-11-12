const express = require('express');
const User = require('../models/User')
const router = express.Router();
const auth = require('../middleware/auth');
const Cart=require('../models/Cart')
const Menu=require('../models/MenuItems')
const util = require('util');
var connection = require('../database.js') // to establish a connection with sql


//Add a item to cart
// router.post('/', auth, async (req, res) => {
//     await User.findByIdAndUpdate(res.locals.user._id,
//         { $push: { "cart": req.body } }
//     )
//     const user = await User.findOne({ _id: res.locals.user._id })
//     console.log(user);
//     res.status(201).send(user)
// })

router.post('/', auth, async(req, res)=>{
    try {
        const query = util.promisify(connection.query).bind(connection);
        let payloadUser ={ 
            cartName: req.body.cartName,
            cartCost: req.body.cartCost,
            restaurantId : req.body.restaurantId,
            user:res.locals.user.userId,
            menuId:req.body.menuId, 
            quantity:req.body.quantity
            }
        console.log("payload: ",payloadUser)
        var valuesInsert = [[payloadUser.cartName, payloadUser.cartCost, payloadUser.restaurantId, payloadUser.quantity, payloadUser.user, payloadUser.menuId]]
        var insertQuery = "INSERT INTO cartItems(cartName, cartCost, restaurantId, quantity, userId, menuId) VALUES ?";
        connection.query(insertQuery, [valuesInsert], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result);

          });

        // let cart=await Cart.create({
        //     user:res.locals.user._id,
        //     menuId:req.body.menuId, 
        //     quantity:req.body.quantity
        // })
        // // console.log(cart)
        // if(!cart._id)return res.status(500).send({
        //     "msg":"Some error occured"
        // })

        // let menuItem =await Menu.findById(req.body.menuId);

        // console.log(menuItem);

        // let user=await User.findById(res.locals.user._id);

        //  user=await User.findByIdAndUpdate(res.locals.user._id,{
        //     $set:{"currentTotal":user.currentTotal+menuItem.cost*req.body.quantity}
        // })

        return res.status(200).send({
            cart:insertQuery
        })

    } catch (error) {
        res.status(500).send({
            msg:"Some unexpected error occured"
        })
    }
})

//Get all items from the cart
// router.get('/', auth, async (req, res) => {
//     const user = await User.findById(res.locals.user._id);
//     const cartItems = user.cart;
//     if (!cartItems) {
//         return res.status(400).send({
//             msg: "No Item found in cart"
//         })
//     }

//     console.log(cartItems);
//     res.status(201).send({
//         cartItems
//     })
// })

router.get('/',auth, async(req, res)=>{
    try {
        //let cart=await Cart.find({user: res.locals.user._id}).populate('menuId')
        const query = util.promisify(connection.query).bind(connection);
        const sql = await query("SELECT * FROM cartItems WHERE userId ='" + res.locals.user.userId + "'")
        res.send(sql)
    } catch (error) {
        res.status(201).send({
            success:false
        })
    }
})

//Delete an item in the cart
// router.delete('/delete', auth, async (req, res) => {
//     console.log(res.locals.user)
//     const item = req.body;
//     const user = await User.findByIdAndUpdate(res.locals.user._id, { $pull: { "cart": req.body } });
//     const user1 = await User.findById(res.locals.user._id);
//     console.log(user1);
//     res.status(201).send({
//         msg: 'Item removed',
//         user1
//     })
// })

router.delete('/delete/:id', auth, async(req, res)=>{
    try {

        const query = util.promisify(connection.query).bind(connection);
        const sql = await query("DELETE FROM cartItems WHERE cartId = '" + req.params.id + "'")
        console.log("Number of records deleted: " + sql.affectedRows);

        res.status(201).send({
            msg:"Successfully deleted the item"  
        })
        //let cartItem=await Cart.findByIdAndDelete(req.params.id);
        //if(!cartItem)return res.status(404).send({msg:"Item not found"})
        //let menuItem=await Menu.findById(cartItem.menuId);
        //let user=await User.findById(res.locals.user._id);
        // let updatedUser=await User.findByIdAndUpdate(res.locals.user._id,{
        //     $set:{"currentTotal":user.currentTotal-menuItem.cost*cartItem.quantity}
        // })

        //     console.log(updatedUser)
        // res.send({
        //     msg:"Successfully deleted the item",
        //     response:true
        // })
           
    } catch (error) {
        console.log(error);
        res.status(404).send({
            msg:'Error occurred'  
        })
        
    }
})

//Buy the cart items
// router.get('/buy', auth, async (req, res) => {
//     const user = await User.findById(res.locals.user._id)
//     const user1 = await User.findByIdAndUpdate(res.locals.user._id,
//         { $set: { "cart": [] }, $push: { "cartHistory": user.cart } })
//     const finalUser = await User.findById(res.locals.user._id);
//     console.log(finalUser);
//     res.status(201).send({
//         msg: 'Purchase successfull',
//         finalUser
//     })
// })

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
  

router.get('/buy', auth, async(req,res)=>{
    try {
        //let cart=await Cart.find({user: res.locals.user._id}).populate('menuId')
        //let user=await User.findById(res.locals.user._id);
        //res.status(200).send(cart)

            const query = util.promisify(connection.query).bind(connection);
            // getting all items from user's cart
            const sql = await query("SELECT * FROM cartItems WHERE userId ='" + res.locals.user.userId + "'")
            // calculating the total cost of items in user's cart
            const sql2 = await query("SELECT SUM(quantity*cartCost) as TOTAL FROM cartItems WHERE userId='" + res.locals.user.userId + "'")
            
            // calculating total quantity of all items in the cart
            var totalQuantity = 0
            sql.forEach(function (item, index) {
                totalQuantity = totalQuantity + item.quantity;
            })

            let date=formatDate(new Date());
            console.log(date)
            date=date.toString()
            // moving items from cart to user's order history, one row at a time
            sql.forEach(function (item, index) {
                var valuesInsert = [[item.cartName, item.userId, item.restaurantId, item.quantity, sql2[0].TOTAL, date]]
                var insertQuery = "INSERT INTO orderHistory(orderName, userId, restaurantId, orderQuantity, orderCost, orderDate) VALUES ?";
                connection.query(insertQuery, [valuesInsert], function (err, result) {
                    if (err) throw err;
                    console.log("Number of records inserted: " + result.affectedRows);
                  }); 
                
              });

            // removing user's items from the cart
            const sql3 = await query("DELETE FROM cartItems WHERE userId='" + res.locals.user.userId + "'")
            
            res.send(sql)

        // // cart=JSON.stringify(cart);
        // // console.log(cart)
        // // for each javascript


        // let data={
        //     cart, 
        //     finalTotal:user.currentTotal, 
        //     date:new Date().toDateString()
        // }

        // data.cart.forEach( async item => {
        //    await  CartHistory.create({
        //         name:item.menuId.name, 
        //         user:res.locals.user._id,
        //         menu:item.menuId._id, 
        //         quantity:item.quantity, 
        //         cost:item.menuId.cost, 
        //         finalTotal:user.currentTotal
        //     })
        // });

        // console.log(data)
        // res.send(data)
        // // user=await User.findByIdAndUpdate(res.locals.user._id,{
        // //     $push:{"cartHistory":data}, 
        // //     $set:{"currentTotal":0}
        // // })
        // // let deletedCart=await Cart.remove({user:res.locals.user._id})
        // res.send({success:true, user})

    } catch (error) {
        res.status(201).send({
            success:false,  
            error
        }) 
    }
})

router.get('/orderHistory', auth, async(req,res)=>{
    try {

        const query = util.promisify(connection.query).bind(connection);
        const oHistory = await query("SELECT orderId, orderName, userId, o.restaurantId,orderDate, orderQuantity, orderCost, m.cost as menuCost  FROM orderHistory o JOIN menuItems m ON(o.orderName=m.name) WHERE userId ='" + res.locals.user.userId + "' order by orderDate desc")
        // res.send(oHistory)
        console.log(oHistory)
        const dates = await query("SELECT DISTINCT(orderDate) FROM orderHistory WHERE userId ='" + res.locals.user.userId + "' order by orderDate desc")

        let final=[]
        dates.forEach(date=>{
            // console.log(date.orderDate)
            let temp=[]
            oHistory.forEach(o=>{
                console.log(o.orderDate, date.orderDate)
                if(date.orderDate===o.orderDate){
                    temp.push(o);
                }
            })
            final.push(temp);
        })
        // console.log(final)
        res.send(final);
        // console.log(sql)
        
//         // let user=await User.find({user:res.locals.user._id})
// let x=await CartHistory.aggregate({$match:{user:res.locals.user._id}},{$group:{
//     _id:{date:"$date"}
// }})
// console.log(x)
//         // return res.send({cart:user.cartHistory});
        

    } catch (error) {
        res.status(201).send({
            success:false,  
            error
        }) 
    }
})

module.exports = router