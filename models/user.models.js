const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
	user: String,
	email: String,
	pass: String,
	pass2: String,
	payment: Object
})

module.exports = mongoose.model("Users", userSchema, 'User');