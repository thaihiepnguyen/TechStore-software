const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const User = require('./models/user.model');
const userRouter = require('./routers/user.router');

mongoose.connect('mongodb://127.0.0.1:27017/test');

var Scheme = mongoose.Schema;

var userData = new Scheme({
	title: String,
	content: String,
	author: String,
});

var UserData = mongoose.model('UserData', userData, 'user');

async function run() {
	const user = await User.create({ name: 'hiep', pass: 'dasddq'});
	console.log(user);
}
run()

const user = new User ({name: 'Kyle' , pass: 'dshajdhasjd'});

user.save().then(() => {
	console.log(user);
})


const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/user', userRouter);

app.get('/', (req, res) => {
	res.render('home.pug');
})


app.listen(PORT, () => {
	// khởi chạy server.
	console.log(`Server running on ${PORT}`);
}) 

