const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Product = require('./models/product.model');
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
const cartRouter = require('./routers/cart.router');

mongoose.connect('mongodb://127.0.0.1:27017/test');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);


// để sử dụng statis css file
app.use(express.static('public'));

app.get('/', async (req, res) => {
	if (!req.cookies.userId) {
		res.render('home.pug');
	}
	else {
		const this_user = {
			username: req.cookies.userId
		}
		db_user = await User.findOne(this_user)

		res.render('home.pug', {
			user: db_user
		})
	}
});

app.get('/deleteCookie', (req, res) => {
	res.clearCookie('userId');
	res.redirect('/');
})

app.get('/sort', async (req, res) => {

	const products = await Product.find();
	const user = await User.findOne({ 'username': req.cookies.userId });

	for (let i = 0; i < products.length; i++) {
		for (let j = 0; j < products.length; j++) {
			if (parseInt(products[i].price) < parseInt(products[j].price)) {
				let temp = products[i];
				products[i] = products[j];
				products[j] = temp;
			}
		}
	}

	res.render('product/items.pug',
		{
			products: products,
			user: user
		});
})


app.listen(PORT, () => {

	console.log(`Server running on ${PORT}`);
})



