const express = require('express')
const { requireSignIn } = require('../../middlewares/authMiddleware.js')
const { addToCart, getCart, deleteCart, updateCartItemQuantity } = require('./cart.controller.js')

const router = express.Router()


// Create cart
router.post('/addToCart', requireSignIn, addToCart)

router.get('/', requireSignIn, getCart)

// Delete cart
router.delete('/:id', requireSignIn, deleteCart)

// Update the Quantity of item in cart (Increase / Decrease)
router.put('/:id', requireSignIn, updateCartItemQuantity)

module.exports = router