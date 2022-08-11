const User = require('../model/user.models');
const bodyParse = require('body-parser');
const express = require('express');
const router = express.Router();


module.exports.getLoginPage = function(req, res) {
	res.render('user/login');
}

module.exports.handleLogin = async function(req, res) {
	console.log(req.body)
	const check_user = await User.findOne(req.body);
	if (check_user == null) {
		res.render('user/login', {
			error_login: 'User does not exist'
		});
	} else {
		res.redirect('/');
	}
}


module.exports.getSignupPage = function(req, res) {
	res.render('user/signup');
}

module.exports.handleSignup = async function(req, res) {
	console.log(req.body)
	errors = {
		username: "",
		password: "",
		email: "",
		pass: "",
	};

	let flag = 0;
	if (!req.body.user) {
		errors.username = 'Please fill in user name field.';
		flag = 1;
	}
		
	if (!req.body.pass) {
		errors.password = 'Please fill in user password field.';
		flag = 1;
	}

	if (!req.body.email) {
		errors.email = 'Please fill in user email field.';
		flag = 1;
	}

	if (req.body.pass != req.body.pass2) {
		errors.pass = 'Please input again password.';
		flag = 1;
	}

	if (flag == 1) {
		res.render('user/signup', {
			errors: errors
		})
		return;
	}
	else {
		await User.create(req.body);
		res.redirect('/user/login');
	}
}
