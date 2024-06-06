const Cart = require('./cart.model')
const User = require('../user/user.model')
const Product = require('../product/product.model')

// Add to cart
const addToCart = async (req, res) => {
    const userId = req.userId
    const { productId, quantity } = req.body;


    try {
        console.log("userId:", userId);
        console.log("productId:", productId);

        const cart = await Cart.findOne({ userId });
        const product = await Product.findOne({ _id: productId })
        // const product = await Product.findById(productId)

        if (!product) {
            console.log("Product not found:", productId);
            res.status(404).send({ message: "item not found" });
            return;
        }


        // If cart already exists for user
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId)

            // Check if product exists or not
            if (productIndex > -1) {
                let productItem = cart.products[productIndex]
                productItem.quantity += quantity
                cart.total = cart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price
                }, 0)
                cart.products[productIndex] = productItem
                await cart.save()
                res.status(200).send(cart);
            }
            else {
                // cart.products.push({ productId, name, quantity, price })
                cart.products.push({
                    productId: product._id,
                    name: product.name,
                    quantity: quantity,
                    price: product.price

                })
                cart.total = cart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price
                }, 0)
                await cart.save();
                res.status(200).send(cart);
            }
        }
        else {

            // No cart exists, create new one
            // const newCart = await Cart.create({
            //     userId,
            //     products: [{ _id: productId, name, quantity, price }],
            //     total: quantity * price
            // })
            const newCart = new Cart({
                userId,
                products: [{
                    productId: product._id,
                    name: product.name,
                    quantity: quantity,
                    price: product.price
                }],
                total: product.price * quantity
            });
            await newCart.save();
            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
}

//GET cart
const getCart = async (req, res) => {
    const userId = req.userId

    try {
        const cart = await Cart.findOne({ userId })
        if (cart && cart.products.length > 0) {
            res.status(200).send(cart);
        } else {
            res.send(null);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = { addToCart, getCart }