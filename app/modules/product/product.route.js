const express = require('express');
const { getProducts, getProduct } = require('../product/product.controller');



const router = express.Router()



// GET all products
router.get('/', getProducts)
router.get('/:id', getProduct)

module.exports = router