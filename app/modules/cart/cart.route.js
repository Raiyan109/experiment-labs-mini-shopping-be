const express = require('express')
const { requireSignIn } = require('../../middlewares/authMiddleware.js')
const { addToCart } = require('./cart.controller.js')

const router = express.Router()


// Create cart
router.post('/addToCart', requireSignIn, addToCart)

module.exports = router