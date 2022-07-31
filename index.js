const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const User = require('./models/user.model');
const userRouter = require('./routers/user.router');

mongoose.connect('mongodb://127.0.0.1:27017/test');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/user', userRouter);


app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home.pug');
})


app.listen(PORT, () => {
	// khởi chạy server.
	console.log(`Server running on ${PORT}`);
})

