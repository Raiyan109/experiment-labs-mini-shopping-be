const express = require('express');
const { requireSignIn } = require('../../middlewares/authMiddleware.js');
const { createOrder, getOrder } = require('./order.controller.js');

const router = express.Router();

router.post('/createOrder', requireSignIn, createOrder);
router.get('/', requireSignIn, getOrder);

module.exports = router;
