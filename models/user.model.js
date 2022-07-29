const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	pass: String,
})

module.exports = mongoose.model("User", userSchema, 'user');