const mongoose = require('mongoose');
const Schema = mongoose.Schema


const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            productId: Number,
            quantity: Number,
            name: String,
            price: Number
        }
    ],
}, { timestamps: true })



module.exports = mongoose.model('Cart', cartSchema)