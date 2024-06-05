const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    cart: [{
        type: mongoose.Types.ObjectId,
        // ref: 'Part',
        // required: true
    }],
    ratings: {
        type: mongoose.Types.ObjectId,
    }
})



module.exports = mongoose.model('User', userSchema)