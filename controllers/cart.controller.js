const Product = require('../models/product.model');
const User = require('../models/user.model');
const Session = require('../models/session.model');


module.exports.handleUserCart = async function(req, res) {

    const this_session = await Session.findOne({name: req.cookies.userId});

    var products = [];
    var total = 0;

    if (this_session != null) {
        for (let i = 0; i < this_session.products.length; i++) {
            let db_product = await Product.findOne({name: this_session.products[i]});
            if (db_product != null) {
                products.push(db_product);
            }
        }
    
        for (let i = 0; i < products.length; i++) {
            if (products[i] != null) {
                total += parseInt(products[i].price);
            }
        }
    }

    var object = {};

    for (let i = 0; i < products.length; i++) {
        if (products[i].name in object) {
            object[products[i].name]++;
        }
        else {
            object[products[i].name] = 1;
        }
    }
    

    var display_product = [];

    for (const property in object) {
        var temp = await Product.findOne({name: property})
        var object_temp = {
            name: '',
            price: '',
            image: '',
            count: '',
        }
        object_temp.name = temp.name;
        object_temp.price = temp.price;
        object_temp.image = temp.image;
        object_temp.count = object[property];
        display_product.push(object_temp);
    }

    if (!req.cookies.userId) {
        res.redirect('/user/login');
        return;
    }
    const this_user = {
        username: req.cookies.userId
    };

    db_user = await User.findOne(this_user);

    res.render('cart/cart.pug', {
        products: display_product,
        total: total,
        size: display_product.length,
        user: db_user
    });
}

module.exports.addToCart = async function(req, res) {
    const this_session = await Session.findOne({name: req.cookies.userId});

    if (this_session) {
        this_session.products.push(req.params.product)
        this_session.save()
    }
    else {
        var session = new Session;
        session.name = req.cookies.userId;
        session.products.push(req.params.product);
        session.save();
    }

    res.redirect('/product/items/' + req.params.product);
}

module.exports.deleteCartItem = async function(req, res) {
    const this_session = await Session.findOne({name: req.cookies.userId});
    if (this_session) {
        this_session.products = this_session.products.filter( (ele) => {
            return ele != req.params.product;
        })
        this_session.save();
    }

    res.redirect('/cart/' + req.cookies.userId);
}

module.exports.checkoutCart = async function(req, res) {
    const username = req.cookies.userId;

    const payment = {
        Bank_name: req.body.payment,
        Account_number: req.body.stk,
        Address: req.body.address,
    };

    await Session.deleteOne({name: req.cookies.userId});

    console.log(username, payment);

    res.redirect('/')
}










