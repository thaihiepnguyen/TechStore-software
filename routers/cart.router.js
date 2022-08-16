const express = require('express');
const bodyParse = require('body-parser');
const router = express.Router();
const controller = require('../controllers/product.controller');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Session = require('../models/session.model');

router.get('/:username', async (req, res) => {

    this_session = await Session.findOne({name: req.cookies.userId})

    var products = []
    var total = 0

    if (this_session != null) {
        for (let i = 0; i < this_session.products.length; i++) {
            products.push(await Product.findOne({name: this_session.products[i]}))
        }
    
        for (let i = 0; i < products.length; i++) {
            total += parseInt(products[i].price)
        }
    }
    

    // get users

    if (!req.cookies.userId) {
        res.redirect('/user/login');
        return;
    }
    const this_user = {
        username: req.cookies.userId
    };

    db_user = await User.findOne(this_user)

    res.render('cart/cart.pug', {
        products: products,
        total: total,
        size: products.length,
        user: db_user
    });
})

router.get('/add/:product', async (req, res) => {

    this_session = await Session.findOne({name: req.cookies.userId})

    if (this_session) {
        this_session.products.push(req.params.product)
        this_session.save()
    }
    else {
        var session = new Session;
        session.name = req.cookies.userId;
        session.products.push(req.params.product)
        session.save()
    }

    res.redirect('/product/items/' + req.params.product)
})

module.exports = router;