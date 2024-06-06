const express = require('express')
const { requireSignIn } = require('../../middlewares/authMiddleware.js')
const { addToCart, getCart } = require('./cart.controller.js')

const router = express.Router()


// Create cart
router.post('/addToCart', requireSignIn, addToCart)

router.get('/', requireSignIn, getCart)

module.exports = router