const express = require('express');
const User = require('../models/User')
const router = express.Router();
const auth = require('../middleware/auth');


//Add a item to cart
router.post('/', auth, async (req, res) => {
    await User.findByIdAndUpdate(res.locals.user._id,
        { $push: { "cart": req.body } }
    )
    const user = await User.findOne({ _id: res.locals.user._id })
    console.log(user);
    res.status(201).send(user)
})

//Get all items from the cart
router.get('/', auth, async (req, res) => {
    const user = await User.findById(res.locals.user._id);
    const cartItems = user.cart;
    if (!cartItems) {
        return res.status(400).send({
            msg: "No Item found in cart"
        })
    }

    console.log(cartItems);
    res.status(201).send({
        cartItems
    })
})

//Delete an item in the cart
router.delete('/delete', auth, async (req, res) => {
    console.log(res.locals.user)
    const item = req.body;
    const user = await User.findByIdAndUpdate(res.locals.user._id, { $pull: { "cart": req.body } });
    const user1 = await User.findById(res.locals.user._id);
    console.log(user1);
    res.status(201).send({
        msg: 'Item removed',
        user1
    })
})

//Buy the cart items
router.get('/buy', auth, async (req, res) => {
    const user = await User.findById(res.locals.user._id)
    const user1 = await User.findByIdAndUpdate(res.locals.user._id,
        { $set: { "cart": [] }, $push: { "cartHistory": user.cart } })
    const finalUser = await User.findById(res.locals.user._id);
    console.log(finalUser);
    res.status(201).send({
        msg: 'Purchase successfull',
        finalUser
    })
})

module.exports = router