const Product = require('../models/product.model');
const User = require('../models/user.model');
const bodyParse = require('body-parser');
const express = require('express');
const router = express.Router();

module.exports.getProductPage = async function(req, res) {
	var products = await Product.find()
	res.render('product/items.pug',
	{
		products: products
	});
}

module.exports.searchEngine = async function(req, res) {
	const q = req.query.q;

	const products = await Product.find();

	const matchedProducts = products.filter(function(product) {
		return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});

	if (!req.cookies.userId) {
		res.render('product/items.pug',
		{
			products: matchedProducts
		});
	} else {
		const this_user = {
			username: req.cookies.userId
		}

		const users = await User.findOne(this_user);
		console.log(users)
		res.render('product/items.pug',
		{
			products: matchedProducts,
			user: users,
		});
	}

}







