const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');

router.get('/:username', controller.handleUserCart);

router.get('/add/:product', controller.addToCart);

router.get('/delete/:product', controller.deleteCartItem)

module.exports = router;