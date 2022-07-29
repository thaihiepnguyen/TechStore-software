const User = require('../models/user.model')
const bodyParse = require('body-parser');
const express = require('express');
const router = express.Router();


module.exports.getLoginPage = function(req, res) {
	res.render('user/login');
}

module.exports.handleLogin = function(req, res) {
	User.exists(req.body, (err, doc) => {
		if (err) {
			console.log(err)
		}else {
			if (doc) {
				// xác nhận tài khoản
				router.get('/?login=true');
			}
		}
	})
}


module.exports.getSignupPage = function(req, res) {
	res.render('user/signup');
}

module.exports.handleSignup = function(req, res) {
	User.exists(req.body, async (err, doc) => {
		if (err) {
			console.log(err);
		}
		else {
			if (!doc) {
				// chưa tồn tại tài khoản trong database
				const user = await User.create(req.body);
			}else {
				// đã tồn tại tài khoản trong db
				res.render('user/signup');
			}
		}
	})
	// người dùng đăng ký tài khoản. Và lưu req.body vào cơ sở dữ liệu.
}

