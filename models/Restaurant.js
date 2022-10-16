const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: [String],
    isAvailable: {
        type: Boolean,
        default: true
    },
    timings: {
        start: String,
        end: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    starRating: {
        type: String,
        required: false
    },
    type: {
        type: String
    },
    image: String
    // menuItems: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: MenuItems
    // }
})

module.exports = mongoose.model('restaurant', RestaurantSchema)