const mongoose = require('mongoose');
const User = require('./User.model');
const Place = require('./Place.model');

const reservationSchema = mongoose.Schema({

    title:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
    },

    place:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Place',
        required: true,
    },

    owner: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
     },
    
     nbOfNights: {
        type: Number,
        required: true
     },

     totalPrice: {
        type: Number,
        required: true
     },
     dates: {
        type: String,
        required: true
     }
    
});
     

module.exports = mongoose.model('Reservation', reservationSchema)
