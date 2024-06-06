const Cart = require('./cart.model')
const User = require('../user/user.model')

// Add to cart
const addToCart = async (req, res) => {
    const { productId, quantity, name, price } = req.body;
    console.log(req.userId);
    // const userId = await User.findById()

    try {
        const cart = await Cart.create({
            userId: req.userId,
            products: [{ productId, quantity, name, price }]
        })
        return res.status(200).json({ cart })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { addToCart }