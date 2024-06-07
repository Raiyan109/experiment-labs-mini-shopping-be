const Order = require('./order.model');
const Cart = require('./cart.model');
const config = require('../../config');
const stripe = require('stripe')(config.stripe_secret_key);

const createOrder = async (req, res) => {
    const userId = req.userId;
    const { paymentMethodId } = req.body;

    try {
        // Retrieve user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(cart.total * 100), // Amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true
        });

        // Create a new order
        const newOrder = await Order.create({
            userId,
            products: cart.products,
            total: cart.total,
            paymentIntentId: paymentIntent.id
        });

        // Clear the cart
        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error creating order", error);
        res.status(500).json({ message: "Something went wrong" });
    }
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

module.exports = { createOrder, getOrder };
