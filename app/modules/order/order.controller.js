const Order = require('../order/order.model');
const Product = require('../product/product.model');
const Cart = require('../cart/cart.model');
const config = require('../../config');
const stripe = require('stripe')(config.stripe_secret_key);

const createStripe = async (req, res) => {
    // const userId = req.userId;
    // const returnUrl = `${req.headers.origin}/success`;
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount | 0,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        },
    })
    console.log(paymentIntent);
    return res.status(201).json({
        data: paymentIntent.client_secret
    })


};

const getOrder = async (req, res) => {
    const owner = req.userId;

    try {
        const orders = await Order.find({ userId: owner }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getConfig = async (req, res) => {

    res.status(200).json({ publishableKey: config.stripe_publishable_key });
}

module.exports = { createStripe, getOrder, getConfig };
