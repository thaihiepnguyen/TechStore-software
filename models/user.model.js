const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	avatar: String,
	address: String,
	phonenumber: String,
})

module.exports = mongoose.model("Users", userSchema, 'userschema');

