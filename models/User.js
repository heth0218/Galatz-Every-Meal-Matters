const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: String,
    address: String,
    roles: [String],
    cartHistory: [],
    cart: [],
    // cart: [
    //     {
    //         item: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: menu
    //         },
    //         quantity: String
    //     }
    // ],
    date: {
        type: Date,
        default: Date.now
    }, 
    currentTotal:{
        type:Number, 
        default:0
    }

});

module.exports = mongoose.model('user', UserSchema)