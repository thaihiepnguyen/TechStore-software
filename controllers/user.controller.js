const User = require('../models/user.model')
const bodyParse = require('body-parser');

module.exports.getLoginPage = function(req, res) {
	res.render('user/login');
}

module.exports.handleLogin = function(req, res) {
	console.log(req.body);
	// kiểm tra tài khoản đã tồn tại hay chưa ?


	// kiểm tra tên tài khoản có tồn tại hay không ?

	console.log(req.body.name)
	User.exists({name: req.body.name}, (err, doc) => {
		if (err) {
			console.log(err)
		}else {
			if (doc) {
				console.log('trung ten dang nhap')
			}
		}
	})
}


module.exports.getSignupPage = function(req, res) {
	res.render('signup.pug');
}

module.exports.handleSignup = function(req, res) {
	const user = new User(req.body)
	user.save()
	console.log(user)
	// người dùng đăng ký tài khoản. Và lưu req.body vào cơ sở dữ liệu.
}

