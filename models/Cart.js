const mongoose = require('mongoose');
const User = require('./User');
const MenuItem=require('./MenuItems');

const CartItemSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    menuId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:MenuItem
    },
    quantity:Number
})
module.exports = mongoose.model('cartItems', CartItemSchema)