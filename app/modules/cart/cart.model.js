const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productId: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
