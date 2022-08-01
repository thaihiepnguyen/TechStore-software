const User = require('../models/user.model');
const bodyParse = require('body-parser');
const express = require('express');
const router = express.Router();


module.exports.getLoginPage = function(req, res) {
	res.render('user/login');
}

module.exports.handleLogin = async function(req, res) {
	console.log(req.body);
	const check_user = await User.findOne(req.body);
	if (check_user == null) {
		res.render('user/login', {
			error_login: 'User does not exist'
		});
	} else {
		res.redirect('/home/:id');
	}
}


module.exports.getSignupPage = function(req, res) {
	res.render('user/login');
}

module.exports.handleSignup = async function(req, res) {
	const user = {
		name: req.body.name,
		pass: req.body.pass,
		email: req.body.email
	};
	errors = {};

	let flag = 0;
	if (!user.name) {
		errors.username = 'Please fill in user name field.';
		flag = 1;
	}
		
	if (!user.pass) {
		errors.password = 'Please fill in user password field.';
		flag = 1;
	}

	if (!user.email) {
		errors.email = 'Please fill in user email field.';
		flag = 1;
	}

	if (flag == 1) {
		res.render('user/login', {
			errors: errors
		})
		return;
	}
	else {
		await User.create(req.body);
		res.redirect('/');
	}
}













