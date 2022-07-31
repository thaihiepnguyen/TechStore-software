const User = require('../models/user.model')
const bodyParse = require('body-parser');
const express = require('express');
const router = express.Router();


module.exports.getLoginPage = function(req, res) {
	res.render('user/login');
}

module.exports.handleLogin = async function(req, res) {
	const errors = [];

	const check_user = await User.findOne(req.body);
	if (check_user == null) {
		errors.push('User does not exist');
		res.render('user/login', {
			errors: errors
		});
	} else {
		res.redirect('/home/:id');
	}
}


module.exports.getSignupPage = function(req, res) {
	res.render('user/signup');
}

module.exports.handleSignup = async function(req, res) {
	const user = {
		name: req.body.name,
		pass: req.body.pass,
		email: req.body.email
	}

	let flag = 0;
	if (!user.name) {
		res.render('user/signup', {
			error_name: 'Please fill in user name field.'
		});
		flag = 1;
	}
		
	if (!user.pass) {
		res.render('user/signup', {
			error_pass: 'Please fill in user pass field.'
		});
		flag = 1;
	}

	if (!user.email) {
		res.render('user/signup', {
			error_email: 'Please fill in email field.'
		});
		flag = 1;
	}

	if (flag == 1)
		return;
	else {
		const user = await User.create(req.body);
		res.redirect('home')
	}
	// người dùng đăng ký tài khoản. Và lưu req.body vào cơ sở dữ liệu.
}













