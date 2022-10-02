const express = require('express');
const bodyParse = require('body-parser');
const router = express.Router();
const controller = require('../controllers/product.controller');
const User = require('../models/user.model');
const Product = require('../models/product.model');

router.get('/items', controller.getProductPage);

router.get('/items/search', controller.searchEngine);

router.get('/items/:username', controller.getProductItem);

router.get('/items/sort', controller.sortEngine);


module.exports = router;
