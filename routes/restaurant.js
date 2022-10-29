const express = require('express')
const router = express.Router()
const Restaurant = require('../models/Restaurant')
const hasRoles = require('../middleware/roles')
const auth = require('../middleware/auth');

//Register a new restaurant
router.post('/', auth, hasRoles(['admin']), async (req, res) => {
    const { name } = req.body;

    const restaurant = await Restaurant.findOne({ name });

    if (restaurant) {
        return res.status(500).send({
            msg: 'The restaurant already exists'
        })
    }

    try {
        const restaurant = await Restaurant(req.body).save();

        if (!restaurant) {
            return res.status(400).send({
                msg: 'Invalid Credentials'
            })
        }

        return res.status(200).send({
            msg: 'Action successful',
            restaurant
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message)
    }

})

//Get all restaurants from the db
router.get('/', async (req, res) => {
    const restaurants = await Restaurant.find({});

    if (!restaurants) {
        return res.send.status(400).send({
            msg: 'No restaurnat found in the db',
        })
    }

    return res.status(201).send(restaurants)

})

//Delete a restaurant 

router.delete('/:id', auth, hasRoles(['admin']), async (req, res) => {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
        return res.status(400).send({
            msg: "No such restaurant found in the db"
        })
    }

    res.status(201).send({
        msg: `Restaurant deleted with name ${restaurant.name}`
    })
})


//Get a single restaurant 
router.get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        return res.status(400).send({
            msg: 'Restaurant details not available'
        })
    }

    res.status(201).send(restaurant)
})

//Update a detail of a restaurant 
router.put('/:id', auth, hasRoles(['admin']), async (req, res) => {

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        return res.status(400).send({
            msg: "The restaurant not found"
        })
    }

    const hell = await Restaurant.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true })

    res.json(hell)

})

module.exports = router;