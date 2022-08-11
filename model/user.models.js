const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
	user: String,
	email: String,
	pass: String,
	pass2: String,
})

module.exports = mongoose.model("Users", userSchema, 'User');