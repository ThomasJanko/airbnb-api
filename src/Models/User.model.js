const mongoose = require('mongoose');
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
    // hash: String,
    // salt: String,

    isAdmin:{
        type: Boolean,
        default: false,
    }
});
     

module.exports = mongoose.model('User', userSchema)