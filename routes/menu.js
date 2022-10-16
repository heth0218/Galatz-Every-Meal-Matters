const express = require('express');
const MenuItems = require('../models/MenuItems');
const router = express.Router();
const hasRoles = require('../middleware/roles')
const auth = require('../middleware/auth');

//Add a menu Item
router.post('/', auth, hasRoles(['admin']), async (req, res) => {
    const menuItem = await MenuItems(req.body).save();
    console.log(menuItem);
    res.status(200).send({
        msg: 'New item created',
        menuItem
    })
})

//Get menu item according to the restaurant 
router.get('/:id', async (req, res) => {
    const menus = await MenuItems.find({ restaurant: req.params.id });
    res.status(200).send({
        menus
    })

})

//Update a menu Item
router.put('/:id', auth, hasRoles(['admin']), async (req, res) => {
    const menu = await MenuItems.findByIdAndUpdate(req.params.id,
        { $set: req.body },
        { new: true }
    )
    res.status(201).send({
        msg: 'Updated Item is here',
        menu
    })
})

//Delete a menu item
router.delete('/:id', auth, hasRoles(['admin']), async (req, res) => {
    const menu = await MenuItems.findByIdAndDelete(req.params.id);
    res.status(201).send({
        msg: 'Menu item successfully deleted',
        menu
    })
})

module.exports = router