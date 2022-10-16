const mongoose = require('mongoose');
const Restaurant = require('./Restaurant');

const MenuItemsSchema = mongoose.Schema({
    name: String,
    description: String,
    cost: String,
    availabilty: {
        type: Boolean,
        default: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Restaurant
    },
    image: String
})

module.exports = mongoose.model('menuItems', MenuItemsSchema)