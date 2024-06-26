const express = require('express');
const { requireSignIn } = require('../../middlewares/authMiddleware.js');
const { createStripe, getOrder, getConfig } = require('./order.controller.js');

const router = express.Router();

router.post('/createStripe', createStripe);
router.get('/', requireSignIn, getOrder);
router.get('/config', getConfig);

module.exports = router;
