const mongoose = require('mongoose');
const PlaceModel = require('./Place.model');
const ReservationModel = require('./Reservation.model');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        maxLength: 50,
    },

    lastName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        maxLength: 50,
    },

    email:{
        type: String,
        required: true,
        unique: true,

    },

    password:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 100,
    },
  

    isAdmin:{
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ["CUSTOMER", "OWNER"],
        default: "CUSTOMER",
    },
    avatar: {
        type: String,
        required: false,

    },
    places: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref:"Place"
        }
      ],
      reservations: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Reservation"
    }
      ]
});
     

module.exports = mongoose.model('User', userSchema)
