const User = require('../models/user.model');
const bodyParse = require('body-parser');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const jwt = require('jsonwebtoken');

module.exports.getLoginPage = function(req, res) {
	res.render('user/login');
}

module.exports.handleLogin = async function(req, res) {
	const this_user = {
		username: req.body.username,
		password: req.body.password
	}

	db_user = await User.findOne(this_user)

	if (db_user == null) {
		res.render('user/login.pug', {
			error_login: 'User does not exist'
		});
	} else {
		res.cookie('userId', db_user.username)
		res.redirect('/')
	}
}

module.exports.getSignupPage = function(req, res) {
	res.render('user/signup.pug');
}

module.exports.handleSignup = async function(req, res) {
	const this_user = {
		username: req.body.user,
		email: req.body.email,
		password: req.body.pass,
		avatar: req.file != null ? req.file.path.split('/').slice(1).join('/') : '',
		address: 'None',
		phonenumber: 'None',
	}

	if (await User.findOne(this_user) != null) {
		res.render('user/signup', {
			error_signup: 'User exist'
		});
	}
	
	errors = {
		username: "",
		email: "",
		password: "",
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

	if (this_user.avatar == '') {
		console.log('error')
	}

	if (flag == 1) {
		res.render('user/signup', {
			errors: errors
		})
		return;
	}

	else {
		await User.create(this_user);
		res.redirect('/user/login');
	}
}










