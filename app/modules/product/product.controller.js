const Products = require('../product/product.model')
const mongoose = require('mongoose')

// Get all parts
const getProducts = async (req, res) => {
    try {
        const products = await Products.find()

        if (!products) {
            return res.status(404).json('No such products')
        }
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get a single product
const getProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json('No such product')
    }
    const product = await Products.findById(id)

    if (!product) {
        return res.status(404).json('No such product')
    }
    res.status(200).json(product)
}


module.exports = { getProducts, getProduct }