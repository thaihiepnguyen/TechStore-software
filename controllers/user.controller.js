const User = require('../models/user.model');

module.exports.getLoginPage = function(req, res) {
	res.render('user/login');
}

module.exports.handleLogin = async function(req, res) {
	const this_user = {
		username: req.body.username,
		password: req.body.password
	}

	const db_user = await User.findOne(this_user)

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
	res.render('user/signup');
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
	
	let errors = {
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
		console.log('error');
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

module.exports.getUserProfile = async function(req, res) {
    let this_user = await User.findOne({username: req.cookies.userId});

    res.render('user/profile.pug', {
        user: this_user
    });
}

module.exports.editUserProfile = async function(req, res) {
	const edit_info = {
		password: req.body.password,
		phonenumber: req.body.phonenumber,
		address: req.body.address,
		email: req.body.email,
	}

	let this_user = await User.findOne({username: req.cookies.userId});

	for (const variable in edit_info) {
		if (edit_info[variable] != '') {
			this_user[variable] = edit_info[variable];
		}
	}

	this_user.save();
	res.render('user/profile.pug', {
		user: this_user
	});
}

module.exports.getLogout = function(req, res) {
	res.clearCookie('userId');
	res.redirect('/');
}





