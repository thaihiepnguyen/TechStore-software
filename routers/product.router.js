const express = require('express');
const bodyParse = require('body-parser');
const router = express.Router();
const controller = require('../controllers/product.controller');
const User = require('../models/user.model');
const Product = require('../models/product.model');

router.get('/items', controller.getProductPage);

router.get('/items/search', controller.searchEngine);

router.get('/items/:username', async (req, res) => {
    if (!req.cookies.userId) {
        res.redirect('/user/login');
        return;
    }
    const this_user = {
        username: req.cookies.userId
    };

    db_user = await User.findOne(this_user)
    db_product = await Product.find()
    if (db_user != null) {
        res.render('product/items', {
            user: db_user,
            products: db_product
        })
    }
});


module.exports = router;