const mongoose = require('mongoose');
const User = require('./User.model');

const placeSchema = mongoose.Schema({

    title:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
    },

    type:{
        type: Array,
        required: true,
        
    },

    owner: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
     },
    pricePerDay:{
        type: Number,
        required: true,
    },

    capacity:{
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

    Addresse: {
        required: false,
        city: {
            type: String,
            required: true,
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
