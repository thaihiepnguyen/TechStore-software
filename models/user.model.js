const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	avatar: String,
})

<<<<<<< HEAD
module.exports = mongoose.model("User", userSchema, 'user');
=======
module.exports = mongoose.model("Users", userSchema, 'userschema');
>>>>>>> nguyen_thai_hiep
