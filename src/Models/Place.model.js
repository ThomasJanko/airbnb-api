const mongoose = require('mongoose');
const UserModel = require('./User.model');

const placeSchema = mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        maxLength: 50,
    },

    type:{
        type: String,
        required: true,
        
    },

    owner:{
        // type: UserModel,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: true,

    },

    pricePerDay:{
        type: Number,
        required: false,
    },

    capcity:{
        type: Number,
        required: false,
    },

    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },

    Addresse: {
        required: false,
        city: {
            type: String,
            required: false,
        },
        street: {
            required: false,
            zipCode: {
                type: Number,
            },
            gps: {
                lat: {

                },
                long:{

                }
            }
        }
    }
    
});
     

module.exports = mongoose.model('Place', placeSchema)