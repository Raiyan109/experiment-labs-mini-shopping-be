const Order = require('../order/order.model');
const Product = require('../product/product.model');
const Cart = require('../cart/cart.model');
const config = require('../../config');
const stripe = require('stripe')(config.stripe_secret_key);

const createOrder = async (req, res) => {
    const userId = req.userId;
    const { amount } = req.body;
    const returnUrl = `${req.headers.origin}/success`;
    console.log(amount);
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
    // return paymentIntent.client_secret
    try {
        // Retrieve user's cart
        // const cart = await Cart.findOne({ userId });
        // if (!cart || cart.products.length === 0) {
        //     return res.status(400).json({ message: "Cart is empty" });
        // }

        const stripePay = async (amount) => {
            console.log(amount);

        }

        // let paymentMethod = await stripe.paymentMethods.create({
        //     type: 'card',
        //     card: {
        //         number: '4242424242424242',
        //         exp_month: 9,
        //         exp_year: 2022,
        //         cvc: '314'
        //     }
        // })

        // Create a payment intent with Stripe
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: Math.round(cart.total * 100), // Amount in cents
        //     currency: 'usd',
        //     payment_method: paymentMethodId,
        //     confirm: true,
        //     return_url: returnUrl,
        // });

        // const session = await stripe.checkout.sessions.create({

        //     line_items: [
        //         {
        //             price: '3232',
        //             quantity: 1,
        //         }
        //     ],
        //     mode: 'payment',
        //     success_url: returnUrl,
        //     cancel_url: 'http://localhost:5173/',
        //     customer_email: 'demo@gmail.com',
        // });

        // Create a new order
        // const newOrder = await Order.create({
        //     userId,
        //     products: cart.products,
        //     total: cart.total,
        //     paymentIntentId: paymentIntent.id
        // });

        // Clear the cart
        // await Cart.findByIdAndDelete(cart._id);

        // res.status(201).json({
        //     order: newOrder,
        //     clientSecret: paymentIntent.client_secret,
        //     paymentIntent: paymentIntent,
        //     url: session.url
        // });
        res.status(201).json({
            success: true,
            data: stripePay
        })
        return stripePay
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

const getConfig = async (req, res) => {

    res.status(200).json({ publishableKey: config.stripe_publishable_key });
}

module.exports = { createOrder, getOrder, getConfig };
