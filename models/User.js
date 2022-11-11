// const Joi = require('@hapi/joi');
// const joi = require('@hapi/joi');
// const UserSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().email().lowercase().required().unique(),
//     password: Joi.string().required(),
//     contact: Joi.string(),
//     address: Joi.string(),
//     cartHistory: Joi.array(),
//     cart: Joi.array(),
//     date: Joi.date().default(Date.now),
//     currentTotal: Joi.Number().default(0),
//     roles: Joi.array(String)
// });

// module.exports = {authSchema:UserSchema}

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