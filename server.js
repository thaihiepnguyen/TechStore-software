const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Router = require("./controllers/user.controllers.js")
const User = require('./model/user.models')
const PORT = 3000

const userRouter = require("./routers/user.routers.js")
const Users = require('./model/user.models')
mongoose.connect('mongodb://127.0.0.1:27017/test');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

<<<<<<< HEAD
const app = express()
app.use(Router)
app.use('/',express.static(path.join(__dirname, 'view')))
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'view/signup.html'));
});

app.use(bodyParser.json())
app.use(express.json())

app.listen(PORT, ()=> {
    
  console.log('Server is up at 3000')
=======


const app = express();

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home.pug');
})

app.get('/product', (req, res) => {
  res.render('product.pug')
})

app.get('/cart', (req, res) => {
  res.render('cart.pug')
})

app.get('/checkout', (req, res) => {
  res.render('checkout.pug')
})

app.use('/user', userRouter);
const PORT = 2000;

app.listen(PORT, ()=> {
    console.log(`Server is up at ${PORT}`)
});