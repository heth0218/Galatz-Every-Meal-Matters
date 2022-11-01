const express = require('express');
const User = require('../models/User')
const router = express.Router();
const auth = require('../middleware/auth');
const Cart=require('../models/Cart')
const Menu=require('../models/MenuItems')

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
        let cart=await Cart.create({
            user:res.locals.user._id,
            menuId:req.body.menuId, 
            quantity:req.body.quantity
        })
        // console.log(cart)
        if(!cart._id)return res.status(500).send({
            "msg":"Some error occured"
        })

        let menuItem =await Menu.findById(req.body.menuId);

        console.log(menuItem);

        let user=await User.findById(res.locals.user._id);

         user=await User.findByIdAndUpdate(res.locals.user._id,{
            $set:{"currentTotal":user.currentTotal+menuItem.cost*req.body.quantity}
        })

        return res.status(200).send({
            success:true,
            cart
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
        let cart=await Cart.find({user: res.locals.user._id}).populate('menuId')

        console.log(cart)
        res.status(200).send(cart)
    } catch (error) {
        res.status(201).send({
            success:false,  
            error
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
        let cartItem=await Cart.findByIdAndDelete(req.params.id);
        console.log(cartItem);

        if(!cartItem)return res.status(404).send({msg:"Item not found"})

        let menuItem=await Menu.findById(cartItem.menuId);
        console.log(menuItem)

        let user=await User.findById(res.locals.user._id);

        let updatedUser=await User.findByIdAndUpdate(res.locals.user._id,{
            $set:{"currentTotal":user.currentTotal-menuItem.cost*cartItem.quantity}
        })

            console.log(updatedUser)
        res.send({
            msg:"Successfully deleted the item",
            response:true
        })

    } catch (error) {
        res.status(201).send({
            success:false,  
            error
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

router.get('/buy', auth, async(req,res)=>{
    try {
        let cart=await Cart.find({user: res.locals.user._id}).populate('menuId')
        let user=await User.findById(res.locals.user._id);

        cart=JSON.stringify(cart);
        // console.log(cart)


        let data={
            cart, 
            finalTotal:user.currentTotal, 
            date:new Date().toDateString()
        }

        console.log(data)
        user=await User.findByIdAndUpdate(res.locals.user._id,{
            $push:{"cartHistory":data}, 
            $set:{"currentTotal":0}
        })

        let deletedCart=await Cart.remove({user:res.locals.user._id})
        res.send({success:true, user})

    } catch (error) {
        res.status(201).send({
            success:false,  
            error
        }) 
    }
})

router.get('/orderHistory', auth, async(req,res)=>{
    try {
        
        let user=await User.findById(res.locals.user._id)

        return res.send({cart:user.cartHistory});
        

    } catch (error) {
        res.status(201).send({
            success:false,  
            error
        }) 
    }
})

module.exports = router