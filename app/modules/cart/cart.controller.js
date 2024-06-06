const Cart = require('./cart.model')
const User = require('../user/user.model')

// Add to cart
const addToCart = async (req, res) => {
    const { productId, quantity, name, price } = req.body;
    const userId = req.userId
    if (!productId || !quantity || !name || !price) {
        return res.status(400).json({ message: "All product details are required" });
    }

    try {
        let existingCart = await Cart.findOne({ userId })

        if (existingCart) {
            //cart exists for user
            let itemIndex = existingCart.products.findIndex(p => p.productId == productId);

            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = existingCart.products[itemIndex];
                productItem.quantity += quantity; // Increment quantity
                existingCart.products[itemIndex] = productItem;
            } else {
                //product does not exists in cart, add new item
                existingCart.products.push({ productId, quantity, name, price });
            }
            existingCart = await existingCart.save();
            return res.status(201).send(existingCart);
        } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                products: [{ productId, quantity, name, price }]
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports = { addToCart }