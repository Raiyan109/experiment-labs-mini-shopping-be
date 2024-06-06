const mongoose = require('mongoose');
const Schema = mongoose.Schema


const productSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },

}, { timestamps: true })



module.exports = mongoose.model('Product', productSchema)